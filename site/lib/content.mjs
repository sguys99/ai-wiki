// content.mjs — Phase 1 콘텐츠 파이프라인의 진실원천 로더.
//
// 역할:
//   1) wiki/**/*.md 를 글롭하여 frontmatter(메타 진실원천)를 파싱한다.
//   2) index.md 카탈로그(카테고리 멤버십 + 한 줄 설명 + 정렬 순서)를 머지한다.
//   3) 카테고리별로 그룹핑된 정렬 섹션 모델 + 페이지 레지스트리 + 링크 resolver 를 돌려준다.
//
// 원문 보존 원칙: wiki/**, index.md 는 읽기 전용. 여기서는 절대 수정하지 않는다.

import { readFile, readdir } from 'node:fs/promises';
import { join, basename, relative, sep } from 'node:path';
import matter from 'gray-matter';
import { href, SITE, RECENT_DAYS } from './config.mjs';
import { slugify } from './markdown.mjs';
import { domainOf } from './domains.mjs';

// index.md 카탈로그 한 줄 정규식.
//   - [[category/stem|display]] — 설명 ... (YYYY, type)
// display(`|...`)는 옵션. 설명에 내부 괄호가 있어도 말미 `(YYYY, type)`에 그리디 앵커로 안정 매칭.
const CATALOG_RE =
  /^- \[\[([^/\]]+)\/([^|\]]+?)(?:\|([^\]]*))?\]\]\s*—\s*(.+)\s*\((\d{4}),\s*([^)]+)\)\s*$/;

// `## Label (slug)` 카테고리 헤더.
const SECTION_RE = /^##\s+(.+?)\s+\(([a-z0-9-]+)\)\s*$/;

// ── wiki 페이지 로드 ──────────────────────────────────────────────────────────

async function loadWikiPages(root) {
  const wikiDir = join(root, 'wiki');
  const dirents = await readdir(wikiDir, { recursive: true, withFileTypes: true });
  const pages = new Map(); // id("category/stem") → page
  const byStem = new Map(); // stem → page (bare [[stem]] 해석용)
  const warnings = [];

  for (const d of dirents) {
    if (!d.isFile() || !d.name.endsWith('.md')) continue;
    const full = join(d.parentPath, d.name);
    const rel = relative(wikiDir, full);
    const segs = rel.split(sep);
    if (segs[0] === 'assets') continue; // 큐레이션 이미지 디렉토리는 페이지가 아님

    const category = segs[0];
    const stem = basename(d.name, '.md');
    const id = `${category}/${stem}`;
    const fileRaw = await readFile(full, 'utf8');
    const { data: fm, content: body } = matter(fileRaw);

    if (fm.category && fm.category !== category) {
      warnings.push(
        `frontmatter category '${fm.category}' ≠ 디렉토리 '${category}' (${rel}) — 디렉토리 기준 라우팅`
      );
    }

    const page = {
      id,
      stem,
      category,
      relPath: rel,
      url: href(`/${category}/${stem}/`),
      frontmatter: fm,
      body,
      title: fm.title || stem,
      type: fm.type || null,
      year: fm.year ?? null,
      tags: Array.isArray(fm.tags) ? fm.tags : [],
      authors: fm.authors || fm.author || fm.org || null,
      sourceUrl: fm.url || null,
      source: fm.source || null,
      rawPath: fm.raw_path || null,
      figures: Array.isArray(fm.figures) ? fm.figures : [],
      // 학습 경로 선언(overview 페이지 옵션). 원본은 여기서 보관만 하고,
      // 실제 해석은 카탈로그 머지가 끝난 뒤 resolveStudyPaths() 가 studyPath 에 채운다.
      studyPathRaw: Array.isArray(fm.study_path) ? fm.study_path : [],
      studyPath: [],
      // 카탈로그 머지에서 채움:
      display: fm.title || stem,
      desc: null,
      order: Number.MAX_SAFE_INTEGER,
      inCatalog: false,
    };

    pages.set(id, page);
    if (byStem.has(stem)) {
      warnings.push(`중복 stem '${stem}' — bare [[${stem}]] 해석이 모호함`);
    } else {
      byStem.set(stem, page);
    }
  }

  return { pages, byStem, warnings };
}

// ── index.md 카탈로그 파싱 ────────────────────────────────────────────────────

async function loadCatalog(root) {
  const text = await readFile(join(root, 'index.md'), 'utf8');
  const lines = text.split('\n');
  const sections = []; // { label, slug, desc, entries: [...] }
  let current = null;
  const descBuf = [];

  const flushDesc = () => {
    if (current && current.desc == null && descBuf.length) {
      current.desc = descBuf.join(' ').trim();
    }
    descBuf.length = 0;
  };

  for (const line of lines) {
    const sec = line.match(SECTION_RE);
    if (sec) {
      flushDesc();
      current = { label: sec[1].trim(), slug: sec[2], desc: null, entries: [] };
      sections.push(current);
      continue;
    }
    if (!current) continue;

    const ent = line.match(CATALOG_RE);
    if (ent) {
      flushDesc();
      current.entries.push({
        category: ent[1],
        stem: ent[2].trim(),
        display: (ent[3] || '').trim() || null,
        desc: ent[4].trim(),
        year: Number(ent[5]),
        type: ent[6].trim(),
      });
      continue;
    }
    // 헤더와 첫 카탈로그 항목 사이의 산문 → 섹션 설명
    if (current.entries.length === 0 && line.trim() && !line.startsWith('#')) {
      descBuf.push(line.trim());
    }
  }
  flushDesc();
  return sections;
}

// ── 태그 인덱스 ───────────────────────────────────────────────────────────────
//
// 전 페이지의 frontmatter `tags:` 를 모아 태그 → 페이지 맵을 만든다. 키는 markdown.mjs 의
// slugify 로 낸 슬러그다(같은 규칙을 헤딩 앵커와 공유).
//
// 표기 흔들림 흡수: 슬러그가 같은 변형(RAG / rag)은 한 태그로 합친다. 태그 정규화 자체는
// 이번 범위가 아니라서 graph-rag / graphrag 처럼 슬러그가 다른 중복은 그대로 남는다.
// 합쳐진 원 표기는 variants 에 남겨 추적 가능하게 두고, 대표 표기는 최다 빈도 →
// 동률이면 코드포인트 순으로 고른다.
//
// 도메인 판정은 다수결이다. 그 태그를 단 페이지의 절반을 넘는 쪽이 physical 이면 physical,
// 아니면 core. 한 페이지만 걸쳐도 physical 로 넘기면 benchmark 처럼 양쪽이 같이 쓰는
// 일반 태그가 core 클라우드에서 사라진다.
export function buildTagIndex(pages) {
  const bySlug = new Map();

  for (const page of pages.values()) {
    for (const rawTag of page.tags) {
      const label = String(rawTag).trim();
      if (!label) continue;
      const slug = slugify(label);
      if (!slug) continue;
      let entry = bySlug.get(slug);
      if (!entry) {
        entry = {
          slug,
          label,
          url: href(`/tags/${slug}/`),
          variants: new Map(), // 원 표기 → 등장 횟수
          pages: [],
        };
        bySlug.set(slug, entry);
      }
      entry.variants.set(label, (entry.variants.get(label) || 0) + 1);
      if (!entry.pages.some((p) => p.id === page.id)) entry.pages.push(page);
    }
  }

  const collisions = [];
  for (const entry of bySlug.values()) {
    const variants = [...entry.variants.entries()].sort(
      (a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0)
    );
    entry.label = variants[0][0];
    entry.variantLabels = variants.map(([v]) => v);
    if (variants.length > 1) {
      collisions.push({ slug: entry.slug, label: entry.label, variants: entry.variantLabels });
    }
    entry.count = entry.pages.length;

    const physical = entry.pages.filter((p) => domainOf(p.category) === 'physical').length;
    entry.domain = physical * 2 > entry.pages.length ? 'physical' : 'core';

    entry.pages.sort(
      (a, b) =>
        Date.parse(b.added) - Date.parse(a.added) ||
        (a.display || a.title).localeCompare(b.display || b.title, 'ko')
    );
  }

  // 빈도 내림차순 → 동률은 표기순. 태그 클라우드와 태그 페이지가 같은 순서를 쓴다.
  const tags = [...bySlug.values()].sort(
    (a, b) => b.count - a.count || a.label.localeCompare(b.label, 'ko')
  );

  return { tags, bySlug, collisions };
}

// 페이지 하나의 태그를 태그 인덱스 엔트리로 바꾼다(슬러그 병합 반영, 원 순서 유지).
// 같은 페이지가 표기만 다른 두 변형을 달고 있으면 한 번만 남는다.
export function tagsOf(page, tagIndex) {
  const out = [];
  const seen = new Set();
  for (const rawTag of page.tags || []) {
    const slug = slugify(String(rawTag).trim());
    if (!slug || seen.has(slug)) continue;
    const entry = tagIndex.bySlug.get(slug);
    if (!entry) continue;
    seen.add(slug);
    out.push(entry);
  }
  return out;
}

// ── 학습 경로 (study_path) ────────────────────────────────────────────────────
//
// overview 페이지 frontmatter 의 study_path 를 해석한다.
//
//   study_path:
//     - id: physical-ai/{stem}
//       note: "왜 여기서 읽는지 한 줄"
//       prereq: ["llms/{stem}"]      # 옵션 (문자열 하나도 허용)
//
// 각 id 는 위키링크와 같은 resolve() 로 푼다. 다만 링크와 달리 앵커·카테고리·GitHub source
// 처럼 페이지가 아닌 대상은 단계가 될 수 없어서 r.id 가 있는 경우(=그래프 노드=위키 페이지)만
// 해석된 것으로 본다. 깨진 참조는 렌더를 막지 않고 미해석 표기 + 빌드 콘솔 리포트로 남긴다
// (기존 broken-link 리포트와 같은 방식 — 빌드는 실패시키지 않는다).

// 단계 표기 정규화. 문자열 하나만 적은 축약형도 받는다.
function normalizeStep(raw) {
  if (typeof raw === 'string') return { id: raw.trim(), note: '', prereq: [] };
  if (!raw || typeof raw !== 'object') return null;
  const id = String(raw.id ?? '').trim();
  if (!id) return null;
  const prereqRaw = raw.prereq == null ? [] : Array.isArray(raw.prereq) ? raw.prereq : [raw.prereq];
  return {
    id,
    note: raw.note == null ? '' : String(raw.note).trim(),
    prereq: prereqRaw.map((p) => String(p).trim()).filter(Boolean),
  };
}

export function resolveStudyPaths(pages, resolve) {
  const broken = []; // { id, targets:[...] } — 선언 페이지별
  let stepCount = 0;
  let pageCount = 0;

  const refOf = (ref) => {
    const r = resolve(ref);
    const target = r.ok && r.id ? pages.get(r.id) : null;
    if (!target) return { ref, ok: false, id: null, url: null, title: ref };
    return {
      ref,
      ok: true,
      id: target.id,
      url: target.url,
      title: target.display || target.title,
      category: target.category,
    };
  };

  for (const page of pages.values()) {
    if (!page.studyPathRaw.length) continue;
    const missing = [];
    const steps = [];
    page.studyPathRaw.forEach((raw) => {
      const step = normalizeStep(raw);
      if (!step) return;
      const target = refOf(step.id);
      if (!target.ok) missing.push(step.id);
      const prereq = step.prereq.map(refOf);
      for (const p of prereq) if (!p.ok) missing.push(p.ref);
      steps.push({ n: steps.length + 1, note: step.note, ...target, prereq });
    });
    if (!steps.length) continue;
    page.studyPath = steps;
    pageCount++;
    stepCount += steps.length;
    if (missing.length) broken.push({ id: page.id, targets: missing });
  }

  return { pageCount, stepCount, broken };
}

// ── 머지 ─────────────────────────────────────────────────────────────────────

export async function loadContent(root, addedDates = new Map()) {
  const { pages, byStem, warnings } = await loadWikiPages(root);
  const catalog = await loadCatalog(root);

  // git 추가일 부착: relPath("category/stem.md") → 저장소기준("wiki/category/stem.md")로 조회.
  // 미추적/이력없음(로컬 신규 등)은 now 폴백 → 최상단에 뜬다.
  const nowMs = Date.now();
  const nowISO = new Date(nowMs).toISOString();
  const newCutoffMs = RECENT_DAYS * 86400000;
  for (const page of pages.values()) {
    const key = 'wiki/' + page.relPath.split(sep).join('/');
    page.added = addedDates.get(key) || nowISO;
    page.isNew = nowMs - Date.parse(page.added) <= newCutoffMs;
  }

  const missingFile = []; // 카탈로그엔 있으나 wiki 파일 없음
  const sections = [];

  for (const sec of catalog) {
    const secPages = [];
    sec.entries.forEach((entry, idx) => {
      const id = `${entry.category}/${entry.stem}`;
      const page = pages.get(id);
      if (!page) {
        missingFile.push(`${id} (index.md '${sec.label}' 섹션)`);
        return;
      }
      page.display = entry.display || page.title;
      page.desc = entry.desc;
      page.order = idx;
      page.inCatalog = true;
      page.catalogYear = entry.year;
      page.catalogType = entry.type;
      secPages.push(page);
    });
    // 최신 추가일 우선, 동률(같은 커밋)은 카탈로그 순서 유지 → 주제 클러스터링 보존.
    secPages.sort((a, b) => Date.parse(b.added) - Date.parse(a.added) || a.order - b.order);
    sections.push({
      label: sec.label,
      slug: sec.slug,
      desc: sec.desc,
      pages: secPages,
      empty: secPages.length === 0,
      // index.md 에 선언은 됐는데 아직 페이지가 0개인 카테고리.
      // 홈에서 밴드를 걸러내지 않고 "자료 없음" 안내로 렌더하는 신호다
      // (신규 카테고리가 첫 자료를 받기 전까지의 상태).
      declaredEmpty: secPages.length === 0,
    });
  }

  // 카탈로그에 없는 wiki 페이지 (index.md 누락) → 보고용
  const missingFromIndex = [];
  for (const page of pages.values()) {
    if (!page.inCatalog) missingFromIndex.push(page.id);
  }

  // 알려진 카테고리(slug→label): index.md 섹션 + wiki 디렉토리에서 수집.
  const categories = new Map();
  for (const sec of sections) categories.set(sec.slug, sec.label);
  for (const page of pages.values())
    if (!categories.has(page.category)) categories.set(page.category, page.category);

  // 학습 경로는 카탈로그 머지 뒤에 푼다 — 단계 제목이 카탈로그 display 를 따르기 때문.
  const resolveLink = makeResolver(pages, byStem, categories);
  const studyPaths = resolveStudyPaths(pages, resolveLink);

  return {
    pages,
    byStem,
    sections,
    categories,
    tagIndex: buildTagIndex(pages),
    resolve: resolveLink,
    studyPaths,
    warnings,
    missingFile,
    missingFromIndex,
  };
}

// ── 링크 resolver ─────────────────────────────────────────────────────────────
//
// Obsidian 위키링크 문법을 사이트 URL로 해석한다. markdown.mjs(렌더)와 graph.mjs(인접)가 공유.
// 반환 { ok, id, url, display }. id 는 그래프 노드(=페이지)일 때만 채워진다 — 앵커/카테고리/
// 외부 source 링크는 ok:true 이지만 id:null 이라 그래프 엣지를 만들지 않는다.
//
// 지원 형태:
//   [[category/stem|display]] / [[category/stem]]            → 페이지
//   [[stem]]                                                  → stem 으로 페이지 해석
//   [[category/wrongbut/stem]]  (경로 미스 → 고유 stem 폴백)  → 페이지
//   [[category/stem#heading]] / [[#heading]]                  → 페이지(또는 같은 페이지)#앵커
//   [[category]] / [[category/]]                              → 홈의 카테고리 밴드 앵커
//   [[sources/stem|…]] / [[../../sources/stem|…]]             → GitHub 의 source 원문(.md)
export function makeResolver(pages, byStem, categories = new Map()) {
  const ghSource = (stem) =>
    `https://github.com/${SITE.repo}/blob/main/sources/${stem}.md`;

  return function resolve(target) {
    const raw = String(target).trim();
    const pipe = raw.indexOf('|');
    const linkPart = (pipe >= 0 ? raw.slice(0, pipe) : raw).trim();
    const displayPart = pipe >= 0 ? raw.slice(pipe + 1).trim() : '';

    // 앵커(#heading) 분리
    const hash = linkPart.indexOf('#');
    const pathPart = (hash >= 0 ? linkPart.slice(0, hash) : linkPart).trim();
    const anchor = hash >= 0 ? linkPart.slice(hash + 1).trim() : '';
    const anchorFrag = anchor ? `#${slugify(anchor)}` : '';

    // 같은 페이지 앵커: [[#heading]]
    if (!pathPart && anchor) {
      return { ok: true, id: null, url: anchorFrag, display: displayPart || anchor };
    }

    // 선행 ./ ../ 제거 후 세그먼트
    const clean = pathPart.replace(/^(\.\.?\/)+/, '');
    const trailingSlash = /\/\s*$/.test(pathPart);
    const segs = clean.split('/').filter(Boolean);

    // sources/ 참조 → 사이트 미발행. GitHub 원문(.md)로 연결(깨진 링크 아님).
    if (segs[0] === 'sources') {
      const stem = segs[segs.length - 1] || '';
      return { ok: true, id: null, url: ghSource(stem), display: displayPart || stem, external: true };
    }

    // 페이지 해석: category/stem → 정확 매치, 실패 시 고유 stem 폴백
    let page = null;
    if (segs.length >= 2) {
      page = pages.get(`${segs[0]}/${segs[1]}`) || byStem.get(segs[1]) || null;
    } else if (segs.length === 1 && !trailingSlash) {
      page = byStem.get(segs[0]) || null;
    }

    if (page) {
      return {
        ok: true,
        id: page.id,
        url: page.url + anchorFrag,
        title: page.title,
        display: displayPart || (anchor ? anchor : page.title),
      };
    }

    // 카테고리 링크: [[evaluations]] / [[applications/]] → 홈의 카테고리 밴드 앵커
    if (segs.length === 1 && categories.has(segs[0])) {
      return {
        ok: true,
        id: null,
        url: `${href('/')}#${segs[0]}`,
        display: displayPart || categories.get(segs[0]),
      };
    }

    return { ok: false, id: null, url: null, display: displayPart || linkPart };
  };
}
