// ai-wiki → GitHub Pages 빌드 엔트리.
//
// Phase 1: 콘텐츠 파이프라인 가동 — 콘텐츠 로드 → 그래프 빌드 → 전 페이지 렌더 →
//          dist 출력 + 깨진 링크/누락 콘솔 리포트.
//
// 페이지 HTML 레이아웃은 아직 INTERIM(임시) — Phase 2~4에서 lib/templates.mjs(Constellation
// 디자인 시스템)로 대체한다. 여기서는 파이프라인이 실제로 동작하는지(라우트 200·링크 해석·
// 그래프 산출)를 검증할 수 있는 최소 셸만 둔다.

import { rm, mkdir, writeFile, cp, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { BASE, href, RECENT_COUNT } from './lib/config.mjs';
import { loadContent, tagsOf } from './lib/content.mjs';
import { addedDates } from './lib/dates.mjs';
import { buildGraph } from './lib/graph.mjs';
import { renderMarkdown } from './lib/markdown.mjs';
import { home, wiki, about, tagIndex, tag, graphPage } from './lib/templates.mjs';
import { domainOf } from './lib/domains.mjs';
import { prevNext } from './lib/nav.mjs';
import { aboutMarkdown, ABOUT_INTRO } from './lib/about.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..'); // 저장소 루트 (wiki/, index.md 등 콘텐츠 소스)
const DIST = resolve(ROOT, 'dist');

async function main() {
  console.log(`[build] BASE='${BASE || '(local)'}'  ROOT=${ROOT}`);

  // 1) dist 초기화
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  // 2) 콘텐츠 로드 (wiki frontmatter + index.md 카탈로그 머지 + git 추가일 정렬)
  const content = await loadContent(ROOT, addedDates(ROOT));
  const { pages, sections, resolve: resolveLink } = content;
  const totalPages = pages.size;
  const totalEntries = sections.reduce((n, s) => n + s.pages.length, 0);
  console.log(
    `[content] wiki pages: ${totalPages}  ·  catalog entries: ${totalEntries}  ·  sections: ${sections.length}`
  );
  for (const w of content.warnings) console.log(`[content] WARN ${w}`);
  if (content.missingFile.length)
    console.log(
      `[content] WARN 카탈로그에 있으나 wiki 파일 없음 (${content.missingFile.length}): ${content.missingFile.join(', ')}`
    );
  if (content.missingFromIndex.length)
    console.log(
      `[content] WARN index.md 카탈로그에 없는 페이지 (${content.missingFromIndex.length}): ${content.missingFromIndex.join(', ')}`
    );

  // 2.5) 태그 인덱스 — 전 페이지 tags: → slug 기준 태그→페이지 맵.
  //      슬러그가 겹치는 표기 변형은 한 태그로 합치고 그 내역을 콘솔에 남긴다.
  const tagIdx = content.tagIndex;
  const tagPageLinks = tagIdx.tags.reduce((n, t) => n + t.count, 0);
  console.log(
    `[tags] tags: ${tagIdx.tags.length}  ·  page-tag links: ${tagPageLinks}  ·  merged slugs: ${tagIdx.collisions.length}`
  );
  for (const c of tagIdx.collisions)
    console.log(`[tags]   merged '${c.slug}' ← ${c.variants.join(' , ')} (대표 표기 '${c.label}')`);
  const tagsFor = (page) => tagsOf(page, tagIdx);

  // 3) 그래프 빌드 → graph.json
  const graph = buildGraph(pages, resolveLink);
  await writeFile(
    join(DIST, 'graph.json'),
    JSON.stringify({ nodes: graph.nodes, edges: graph.edges }, null, 2)
  );
  console.log(`[graph] nodes: ${graph.nodes.length}  ·  edges: ${graph.edges.length}`);

  // 3.5) 무방향 인접 맵 (id → [이웃 id]) — 카드 hover 하이라이트 data 속성용
  const adjacency = new Map();
  const addAdj = (a, b) => {
    if (!adjacency.has(a)) adjacency.set(a, new Set());
    adjacency.get(a).add(b);
  };
  for (const e of graph.edges) {
    addAdj(e.source, e.target);
    addAdj(e.target, e.source);
  }
  for (const [id, set] of adjacency) adjacency.set(id, [...set]);

  // 4) wiki/assets → dist/assets 복사 (figure 임베드 src)
  const assetsSrc = resolve(ROOT, 'wiki', 'assets');
  if (existsSync(assetsSrc)) {
    await cp(assetsSrc, join(DIST, 'assets'), { recursive: true });
    console.log('[build] copied wiki/assets → dist/assets');
  }

  // 4.5) 사이트 크롬(css/js/img) + self-host 폰트 → dist/static
  //      dist/assets(=wiki figure 전용)와 분리해 경로 충돌 방지.
  await copyStatic();

  // 5) 전 페이지 렌더 + 깨진 링크 수집 (Constellation 위키 레이아웃: 리딩 컬럼 + TOC rail)
  //    + Phase 5: 관련 페이지(neighborhood) · 같은 카테고리 이전/다음.
  const sectionBySlug = new Map(sections.map((s) => [s.slug, s]));
  const brokenByPage = []; // { id, targets:[...] }
  let rendered = 0;
  for (const page of pages.values()) {
    const { html, toc, broken } = renderMarkdown(page.body, { resolve: resolveLink, hrefFn: href });
    if (broken.length) brokenByPage.push({ id: page.id, targets: broken });

    // 관련 페이지: 무방향 직접 이웃 → degree 내림차순(동률은 제목순). 그래프 노드=위키 페이지.
    const neighbors = (adjacency.get(page.id) || [])
      .map((nid) => pages.get(nid))
      .filter(Boolean)
      .map((p) => ({
        id: p.id,
        url: p.url,
        title: p.display || p.title,
        category: p.category,
        degree: graph.degree.get(p.id) || 0,
        type: p.catalogType || p.type || '',
        year: p.catalogYear || p.year || '',
      }))
      .sort((a, b) => b.degree - a.degree || a.title.localeCompare(b.title, 'ko'));

    // 같은 카테고리(카탈로그 순서) 이전/다음.
    const { prev, next } = prevNext(sectionBySlug.get(page.category), page.id);

    const outDir = join(DIST, page.category, page.stem);
    await mkdir(outDir, { recursive: true });
    await writeFile(
      join(outDir, 'index.html'),
      wiki(page, html, toc, {
        degree: graph.degree,
        categoryLabel: content.categories.get(page.category),
        neighbors,
        prev,
        next,
        tags: tagsFor(page),
      })
    );
    rendered++;
  }
  console.log(`[render] pages rendered: ${rendered}`);

  // 6) 홈(랜딩) — Constellation 히어로 + 카테고리 밴드 + 카드 그리드
  // pages/links 는 실제 콘텐츠 집계(그래프 기준)라 빈 카테고리가 끼어들 여지가 없다.
  // categories 는 홈에 실제로 보이는 밴드 수와 맞춘다 — 선언만 된 빈 카테고리도 밴드로 나가므로 포함.
  const stats = {
    pages: graph.nodes.length,
    links: graph.edges.length,
    categories: sections.filter((s) => s.pages.length || s.declaredEmpty).length,
  };
  // 전 카테고리 통합 "최근 추가" 밴드 (홈 전용 — prevNext/라우팅 미포함).
  const recentPages = [...pages.values()]
    .sort((a, b) => Date.parse(b.added) - Date.parse(a.added) || a.title.localeCompare(b.title, 'ko'))
    .slice(0, RECENT_COUNT);
  const recent = { label: '최근 추가', slug: 'recent', desc: null, pages: recentPages };

  await writeFile(
    join(DIST, 'index.html'),
    home({
      sections,
      recent,
      degree: graph.degree,
      adjacency,
      stats,
      graphHref: href('/graph.json'),
      tagsFor,
    })
  );

  // 6.2) 태그 인덱스 + 태그별 페이지.
  await mkdir(join(DIST, 'tags'), { recursive: true });
  await writeFile(
    join(DIST, 'tags', 'index.html'),
    tagIndex({ tags: tagIdx.tags, totalPages: totalPages })
  );
  for (const entry of tagIdx.tags) {
    const outDir = join(DIST, 'tags', entry.slug);
    await mkdir(outDir, { recursive: true });
    await writeFile(
      join(outDir, 'index.html'),
      tag(entry, { degree: graph.degree, adjacency, tagsFor })
    );
  }
  console.log(`[render] tag pages rendered: ${tagIdx.tags.length} (+ /tags/ index)`);

  // 6.7) 전체 그래프 (/graph/) — 캔버스 탐색기 + 카테고리별 노드 목록(캔버스의 텍스트 판본).
  //      목록은 그래프 노드에서 만든다. index.md 카탈로그가 아니라 실제 wiki 페이지가 기준이라
  //      카탈로그 드리프트가 있어도 그래프와 목록이 어긋나지 않는다.
  const graphGroups = [];
  const nodesByCategory = new Map();
  for (const node of graph.nodes) {
    if (!nodesByCategory.has(node.category)) nodesByCategory.set(node.category, []);
    const page = pages.get(node.id);
    nodesByCategory.get(node.category).push({
      id: node.id,
      url: page ? page.url : href(`/${node.id}/`),
      title: (page && (page.display || page.title)) || node.title,
      degree: node.degree,
    });
  }
  // 카테고리 순서는 index.md 섹션 순서를 따르고, 거기에 없는 카테고리는 뒤에 붙인다.
  const catOrder = [
    ...sections.map((s) => s.slug),
    ...[...nodesByCategory.keys()].filter((c) => !sectionBySlug.has(c)),
  ];
  for (const slug of catOrder) {
    const list = nodesByCategory.get(slug);
    if (!list || !list.length) continue;
    list.sort((a, b) => b.degree - a.degree || a.title.localeCompare(b.title, 'ko'));
    graphGroups.push({
      slug,
      label: content.categories.get(slug) || slug,
      domain: domainOf(slug),
      nodes: list,
    });
  }
  await mkdir(join(DIST, 'graph'), { recursive: true });
  await writeFile(
    join(DIST, 'graph', 'index.html'),
    graphPage({
      groups: graphGroups,
      stats: { nodes: graph.nodes.length, edges: graph.edges.length },
      graphHref: href('/graph.json'),
      base: href('/'),
    })
  );
  console.log(`[render] graph page rendered: ${graphGroups.length} category groups`);

  // 6.5) About — README/CLAUDE.md 철학·THE FOUR RULES·3-tier 파이프라인.
  //      위키 본문과 같은 렌더 경로(renderMarkdown) → [[category]] 위키링크가 홈 밴드 앵커로 해석.
  const aboutRender = renderMarkdown(aboutMarkdown(href), { resolve: resolveLink, hrefFn: href });
  if (aboutRender.broken.length)
    console.log(`[about] WARN unresolved links: ${aboutRender.broken.join(' | ')}`);
  await mkdir(join(DIST, 'about'), { recursive: true });
  await writeFile(join(DIST, 'about', 'index.html'), about(aboutRender.html, ABOUT_INTRO));
  console.log('[render] about page rendered');

  // 7) 깨진 링크 리포트
  const brokenTotal = brokenByPage.reduce((n, b) => n + b.targets.length, 0);
  if (brokenTotal === 0) {
    console.log('[links] unresolved wikilinks: 0  ✓');
  } else {
    console.log(`[links] unresolved wikilinks: ${brokenTotal} (in ${brokenByPage.length} pages)`);
    for (const b of brokenByPage) console.log(`[links]   ${b.id}: ${b.targets.join(' | ')}`);
  }

  console.log('[build] done.');
}

// ── 정적 에셋 복사: 사이트 크롬 + self-host 폰트 → dist/static ──────────────────

const SITE_ASSETS = resolve(__dirname, 'assets'); // site/assets/{css,js,img}
const NODE_MODULES = resolve(__dirname, 'node_modules');

// node_modules 의 Pretendard variable dynamic-subset 위치 (버전 무관 보존 구조).
const PRETENDARD_DIR = join(NODE_MODULES, 'pretendard', 'dist', 'web', 'variable');
const PRETENDARD_CSS = join(PRETENDARD_DIR, 'pretendardvariable-dynamic-subset.css');
const PRETENDARD_SUBSET = join(PRETENDARD_DIR, 'woff2-dynamic-subset');

// Latin self-host 대상 (latin subset woff2만, 필요한 weight만).
const LATIN_FONTS = [
  ['@fontsource/space-grotesk', 'space-grotesk-latin-500-normal.woff2'],
  ['@fontsource/space-grotesk', 'space-grotesk-latin-700-normal.woff2'],
  ['@fontsource/jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff2'],
  ['@fontsource/jetbrains-mono', 'jetbrains-mono-latin-500-normal.woff2'],
];

async function copyStatic() {
  const staticDir = join(DIST, 'static');

  // (B) 사이트 크롬: site/assets/{css,js,img} → dist/static/{css,js,img}
  for (const sub of ['css', 'js', 'img']) {
    const src = join(SITE_ASSETS, sub);
    if (existsSync(src)) await cp(src, join(staticDir, sub), { recursive: true });
  }

  // (A) Pretendard dynamic-subset: CSS + woff2 디렉토리 (상대 url 구조 보존)
  const pretendardOut = join(staticDir, 'fonts', 'pretendard');
  if (existsSync(PRETENDARD_CSS) && existsSync(PRETENDARD_SUBSET)) {
    await mkdir(pretendardOut, { recursive: true });
    await copyFile(PRETENDARD_CSS, join(pretendardOut, 'pretendard-dynamic-subset.css'));
    await cp(PRETENDARD_SUBSET, join(pretendardOut, 'woff2-dynamic-subset'), {
      recursive: true,
    });
  } else {
    console.log('[build] WARN Pretendard subset 미발견 — `npm install` 확인 필요');
  }

  // (A) Latin woff2 → dist/static/fonts/
  const fontsOut = join(staticDir, 'fonts');
  await mkdir(fontsOut, { recursive: true });
  for (const [pkg, file] of LATIN_FONTS) {
    const src = join(NODE_MODULES, pkg, 'files', file);
    if (existsSync(src)) await copyFile(src, join(fontsOut, file));
    else console.log(`[build] WARN Latin 폰트 미발견: ${file}`);
  }

  // (C) KaTeX CSS + woff2 폰트 → dist/static/katex (CSS가 fonts/KaTeX_* 를 상대참조 → 구조 유지)
  const katexDist = join(NODE_MODULES, 'katex', 'dist');
  const katexOut = join(staticDir, 'katex');
  if (existsSync(join(katexDist, 'katex.min.css')) && existsSync(join(katexDist, 'fonts'))) {
    await mkdir(katexOut, { recursive: true });
    await copyFile(join(katexDist, 'katex.min.css'), join(katexOut, 'katex.min.css'));
    await cp(join(katexDist, 'fonts'), join(katexOut, 'fonts'), { recursive: true });
  } else {
    console.log('[build] WARN KaTeX 자산 미발견 — `npm install` 확인 필요');
  }

  console.log('[build] copied site chrome + fonts → dist/static');
}

main().catch((err) => {
  console.error('[build] FAILED:', err);
  process.exit(1);
});
