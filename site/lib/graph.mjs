// graph.mjs — 모든 wiki 페이지 본문의 [[…]] 인접을 파싱해 그래프 모델을 만든다.
//
// buildGraph() 반환값(메모리): { nodes, edges: [{ source, target }], unresolved, degree }
//   빌드 안의 인접 맵, 통계, nav.mjs 가 edges 객체 배열을 그대로 쓴다.
//
// 산출 graph.json (version 2, 정본 docs/graph-spec/03-schema.md), toGraphJson() 이 만든다:
//   { version: 2, recentSince, recentMode, recentDays,
//     nodes: [{ id, stem, title, category, domain, degree, year, type, tags, added, xy }],
//     links: [s0, t0, s1, t1, …] }
//   - id = "category/stem" (페이지 라우트와 동일)
//   - domain = domains.mjs 의 domainOf(category). 브라우저 스크립트는 번들러 없이 실려
//     domains.mjs 를 import 할 수 없으므로 매핑을 여기서 한 번 풀어 실어 보낸다.
//   - degree = 무방향 인접(고유 이웃) 수
//   - year 정수|null, type 문자열|null, tags frontmatter 순서 그대로, added "YYYY-MM-DD" (git 최초 추가일)
//   - xy = 가로 배치 정수 좌표 [x, y]. 배치(graph-layout.mjs)가 주어질 때만 싣는다
//   - links = 방향 엣지를 nodes 배열 인덱스 쌍으로 이어 붙인 평면 배열 (buildGraph 엣지 순서)
//   - recentSince = 최근 집합 경계 날짜 (브라우저는 node.added >= recentSince), recentInfo() 참고
//   - 소비자: 홈 히어로 constellation + graph-core.js, 그래프 탐색기(/graph/)
//
// checkGraphJson() 은 쓰인 graph.json 의 불변식 V1 ~ V16 을 점검한다 (03 7절, `node lib/graph.mjs --check FILE`).
//
// 코드펜스/인라인코드 안의 [[…]] 예시는 extractWikiTargets가 제외한다.

import { extractWikiTargets } from './markdown.mjs';
import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { domainOf, CATEGORY_DOMAIN } from './domains.mjs';
import { RECENT_COUNT, RECENT_DAYS } from './config.mjs';
import { CATALOG_TYPES } from './content.mjs';
import { ANCHOR, radius } from './graph-layout.mjs';

export function buildGraph(pages, resolve) {
  const nodes = [];
  for (const page of pages.values()) {
    nodes.push({
      id: page.id,
      stem: page.stem,
      title: page.title,
      category: page.category,
      domain: domainOf(page.category),
      degree: 0,
    });
  }

  const edges = [];
  const seenEdge = new Set(); // "source->target" 중복 제거(방향성)
  const adj = new Map(); // id → Set(이웃 id) — 무방향 degree용
  const unresolved = []; // { from, target }

  const link = (a, b) => {
    if (!adj.has(a)) adj.set(a, new Set());
    if (!adj.has(b)) adj.set(b, new Set());
    adj.get(a).add(b);
    adj.get(b).add(a);
  };

  for (const page of pages.values()) {
    for (const target of extractWikiTargets(page.body)) {
      const r = resolve(target);
      if (!r.ok || !r.id) {
        unresolved.push({ from: page.id, target });
        continue;
      }
      if (r.id === page.id) continue; // 자기참조 무시
      const key = `${page.id}->${r.id}`;
      if (!seenEdge.has(key)) {
        seenEdge.add(key);
        edges.push({ source: page.id, target: r.id });
      }
      link(page.id, r.id);
    }
  }

  const degree = new Map();
  for (const n of nodes) {
    n.degree = adj.get(n.id)?.size || 0;
    degree.set(n.id, n.degree);
  }

  return { nodes, edges, unresolved, degree };
}

// 최근 집합 (03 3.4절). page.isNew 는 content.mjs 가 홈 NEW 뱃지와 같은 기준으로 매긴다.
// 반환 { recentSince, recentMode, recentDays, count } (count 는 날짜 비교로 판정되는 노드 수, 로그용).
export function recentInfo(pages) {
  const all = [...pages.values()].sort((a, b) => Date.parse(b.added) - Date.parse(a.added));
  const inDays = all.filter((p) => p.isNew);
  const recentMode = inDays.length >= RECENT_COUNT ? 'days' : 'count';
  const edge = recentMode === 'days' ? inDays[inDays.length - 1] : all[Math.min(RECENT_COUNT, all.length) - 1];
  let recentSince = edge ? edge.added.slice(0, 10) : null;
  const count = recentSince ? all.filter((p) => p.added.slice(0, 10) >= recentSince).length : 0;
  if (count > all.length / 2) recentSince = null; // git 이력 없는 빌드 가드 (06 9.1절)
  return { recentSince, recentMode, recentDays: RECENT_DAYS, count };
}

// 약한 연결 리포트 (06 3절). 들어옴 0 (overviews 제외) ∪ degree 3 이하. 두 조건에 다 걸리면 첫 묶음에만 둔다.
// 행마다 링크 후보 3개 (06 12.2 E4): 태그가 가장 많이 겹치고 아직 어느 방향으로도 잇지 않은 페이지.
// 같은 점수는 같은 카테고리, degree 큰 순, id 순. graph.json 에는 싣지 않는다 (서버가 목록 판에 렌더).
export function weakLinks(graph, pages) {
  const inDeg = new Map(), outDeg = new Map(), nb = new Map();
  const bump = (m, k) => m.set(k, (m.get(k) || 0) + 1);
  const addNb = (a, b) => (nb.get(a) || nb.set(a, new Set()).get(a)).add(b);
  for (const e of graph.edges) {
    bump(outDeg, e.source); bump(inDeg, e.target);
    addNb(e.source, e.target); addNb(e.target, e.source);
  }
  const title = (id) => { const p = pages.get(id); return p.display || p.title; };
  const suggest = (n) => {
    const mine = new Set(pages.get(n.id).tags || []), linked = nb.get(n.id) || new Set();
    if (!mine.size) return [];
    return graph.nodes
      .filter((m) => m.id !== n.id && !linked.has(m.id))
      .map((m) => ({ m, score: (pages.get(m.id).tags || []).filter((t) => mine.has(t)).length }))
      .filter((c) => c.score > 0)
      .sort((a, b) => b.score - a.score || (b.m.category === n.category) - (a.m.category === n.category) ||
        b.m.degree - a.m.degree || (a.m.id < b.m.id ? -1 : 1))
      .slice(0, 3)
      .map(({ m, score }) => ({ id: m.id, url: pages.get(m.id).url, title: title(m.id), category: m.category, shared: score }));
  };
  const item = (n) => ({
    id: n.id, url: pages.get(n.id).url, title: title(n.id), category: n.category,
    degree: n.degree, inDeg: inDeg.get(n.id) || 0, outDeg: outDeg.get(n.id) || 0, suggest: suggest(n),
  });
  const order = (a, b) => a.degree - b.degree || a.title.localeCompare(b.title, 'ko');
  const noInbound = graph.nodes.filter((n) => n.category !== 'overviews' && !inDeg.get(n.id)).map(item).sort(order);
  const first = new Set(noInbound.map((w) => w.id));
  const lowDegree = graph.nodes.filter((n) => n.degree <= 3 && !first.has(n.id)).map(item).sort(order);
  return { noInbound, lowDegree };
}

// graph.json 객체 (03 3절). 필드 순서가 곧 직렬화 순서다. layout 은 Map(id → [x, y]) 또는 생략.
export function toGraphJson(graph, pages, layout, recent) {
  const index = new Map(graph.nodes.map((n, i) => [n.id, i]));
  const nodes = graph.nodes.map((n) => {
    const p = pages.get(n.id);
    const year = Number.parseInt(p.year, 10);
    const node = {
      ...n,
      year: Number.isNaN(year) ? null : year,
      type: p.type,
      tags: p.tags,
      added: p.added.slice(0, 10),
    };
    if (layout) node.xy = layout.get(n.id);
    return node;
  });
  const links = [];
  for (const e of graph.edges) links.push(index.get(e.source), index.get(e.target));
  const { recentSince, recentMode, recentDays } = recent;
  return { version: 2, recentSince, recentMode, recentDays, nodes, links };
}

// graph.json 자체 점검 (03 7절 V1 ~ V16). text 는 graph.json 문자열 (V16 바이트 때문).
// pageCount, edgeCount 는 빌드 메모리 값이고 없으면 V2 등호와 V8 을 건너뛴다.
// paths.json (03 6.1절, 06 4.6절). 학습 경로를 카탈로그 순서로 싣는다. 미해석 단계는 빼되 원래 번호 n 을 지키고,
// prereq 는 같은 경로 단계 번호로 바꾼다. 경로 밖 prereq 는 빼고 warnings 에 남긴다. 단계가 하나도 없는 경로는 싣지 않는다
export function toPathsJson(pages) {
  const warnings = [];
  const paths = [...pages.values()]
    .filter((p) => p.studyPath.some((s) => s.ok))
    .sort((a, b) => a.order - b.order || (a.id < b.id ? -1 : 1))
    .map((p) => {
      const nOf = new Map(p.studyPath.filter((s) => s.ok).map((s) => [s.id, s.n]));
      const steps = p.studyPath.filter((s) => s.ok).map((s) => ({
        n: s.n,
        id: s.id,
        note: s.note,
        prereq: s.prereq.flatMap((q) => {
          if (q.ok && nOf.has(q.id)) return [nOf.get(q.id)];
          warnings.push(`${p.id} ${s.n}단계 prereq ${q.ref} 가 경로 밖`);
          return [];
        }),
      }));
      return { id: p.id, title: p.display || p.title, steps };
    });
  return { json: { version: 1, paths }, warnings };
}

// paths, layout3d 는 부속 파일 객체이고 없으면 V14, V15 를 건너뛴다.
// 반환 { problems (STRICT 실패), warnings, stats (V16 로그 한 줄) }.
export function checkGraphJson(text, { pageCount, edgeCount, paths, layout3d } = {}) {
  const problems = [];
  const warnings = [];
  const isInt = Number.isInteger;
  const DATE = /^\d{4}-\d{2}-\d{2}$/;
  const ex = (x) => x?.id ?? JSON.stringify(x);
  const each = (out, v, msg, list, ok) => {
    const bad = list.filter((x) => !ok(x));
    if (bad.length) out.push(`${v} ${msg} ${bad.length}개 (예: ${ex(bad[0])})`);
    return !bad.length;
  };
  let g;
  try {
    g = JSON.parse(text);
  } catch (e) {
    return { problems: [`V1 JSON 파싱 실패: ${e.message}`], warnings, stats: '' };
  }
  if (g?.version !== 2 || !Array.isArray(g.nodes) || !Array.isArray(g.links))
    return { problems: ['V1 version 2 와 nodes, links 배열이 아님'], warnings, stats: '' };
  const { nodes, links } = g;
  const N = nodes.length;

  if (N < 300 || (pageCount != null && N !== pageCount)) problems.push(`V2 노드 ${N}개 (페이지 ${pageCount ?? '?'}, 300 미만 비정상)`);
  const KEYS = ['id', 'stem', 'title', 'category', 'domain', 'degree', 'year', 'type', 'tags', 'added', 'xy'];
  const str = (x) => typeof x === 'string';
  const shaped = each(problems, 'V4', '필드 누락 또는 형 불일치', nodes, (n) =>
    n && KEYS.every((k) => k in n) && str(n.id) && str(n.stem) && str(n.title) && n.title !== '' && str(n.category) &&
    n.domain === domainOf(n.category) && isInt(n.degree) && n.degree >= 0 && (n.year === null || isInt(n.year)) &&
    (n.type === null || str(n.type)) && Array.isArray(n.tags) && n.tags.every(str) && str(n.added) && Array.isArray(n.xy));
  if (!shaped) return { problems, warnings, stats: '' }; // 아래 검사는 노드 형을 전제한다
  const ids = new Map(nodes.map((n, i) => [n.id, i]));
  if (ids.size !== N) problems.push(`V3 id 중복 ${N - ids.size}건`);
  each(problems, 'V3', 'id ≠ category/stem', nodes, (n) => n.id === `${n.category}/${n.stem}`);
  each(warnings, 'V3', 'id 에 [a-z0-9/-] 밖 문자', nodes, (n) => /^[a-z0-9/-]+$/.test(n.id));
  each(problems, 'V5', 'category 또는 type 이 목록 밖', nodes, (n) => n.category in CATEGORY_DOMAIN && (n.type === null || CATALOG_TYPES.has(n.type)));
  each(warnings, 'V5', 'year 또는 type 이 null', nodes, (n) => n.year !== null && n.type !== null);
  each(problems, 'V6', 'added 가 YYYY-MM-DD 아님', nodes, (n) => DATE.test(n.added));

  const pairs = [];
  for (let i = 0; i + 1 < links.length; i += 2) pairs.push([links[i], links[i + 1]]);
  const seen = new Set(pairs.map(String));
  const linksOk =
    links.length % 2 === 0 &&
    each(problems, 'V7', '링크 쌍이 범위 밖이거나 자기참조', pairs, ([s, t]) => isInt(s) && isInt(t) && s >= 0 && t >= 0 && s < N && t < N && s !== t);
  if (links.length % 2) problems.push(`V7 links 길이 ${links.length} 홀수`);
  if (seen.size !== pairs.length) problems.push(`V7 중복 링크 쌍 ${pairs.length - seen.size}건`);
  if (edgeCount != null && pairs.length !== edgeCount) problems.push(`V8 링크 쌍 ${pairs.length} ≠ 엣지 ${edgeCount}`);
  const nb = nodes.map(() => new Set());
  const ins = new Array(N).fill(0);
  const outs = new Array(N).fill(0);
  if (linksOk) {
    for (const [s, t] of pairs) {
      nb[s].add(t);
      nb[t].add(s);
      outs[s]++;
      ins[t]++;
    }
    each(problems, 'V9', 'degree 가 links 로 센 이웃 수와 다름', nodes, (n) => n.degree === nb[ids.get(n.id)].size);
  }

  if (each(problems, 'V10', 'xy 가 정수 두 개 아님', nodes, (n) => n.xy.length === 2 && n.xy.every(isInt))) {
    const xs = nodes.map((n) => n.xy[0]);
    const width = Math.max(...xs) - Math.min(...xs);
    if (width < 600 || width > 3000) problems.push(`V10 외곽 가로 ${width} world (600 ~ 3,000 밖)`);
    let overlap = 0;
    for (let i = 0; i < N; i++)
      for (let j = i + 1; j < N; j++) {
        const [a, b] = [nodes[i], nodes[j]];
        if (Math.hypot(a.xy[0] - b.xy[0], a.xy[1] - b.xy[1]) < radius(a.degree) + radius(b.degree)) overlap++;
      }
    if (overlap) problems.push(`V11 world 에서 겹친 노드 쌍 ${overlap}개`);
  }

  const { recentSince, recentMode } = g;
  if (!['days', 'count'].includes(recentMode)) problems.push(`V12 recentMode ${recentMode}`);
  if (recentSince === null) warnings.push('V12 recentSince null (git 이력 없음?)');
  else {
    const c = DATE.test(recentSince) ? nodes.filter((n) => n.added >= recentSince).length : -1;
    if (c < 1 || c > N / 2) problems.push(`V12 recentSince ${recentSince} 판정 노드 ${c}/${N} (1 ~ 50%)`);
  }
  for (const c of new Set(nodes.map((n) => n.category)))
    if (!(c in ANCHOR)) warnings.push(`V13 앵커 표에 없는 카테고리 ${c} (graph-layout.mjs ANCHOR 에 추가)`);

  if (paths) {
    if (paths.version !== 1 || !Array.isArray(paths.paths)) problems.push(`V14 paths.json version ${paths.version}, paths 배열 아님`);
    for (const p of paths.paths || []) {
      const steps = p.steps || [];
      const ns = new Set(steps.map((s) => s.n));
      const ok = ids.has(p.id) && steps.length > 0 && ns.size === steps.length &&
        steps.every((s) => isInt(s.n) && s.n >= 1 && ids.has(s.id) && (s.prereq || []).every((q) => ns.has(q) && q < s.n));
      if (!ok) problems.push(`V14 paths.json 경로 ${p.id} 의 id, n, prereq 불일치`);
    }
  }
  if (layout3d) {
    const { n, xyz } = layout3d;
    if (n !== N || xyz?.length !== 3 * N || !xyz.every(isInt)) problems.push(`V15 layout.json n ${n}, xyz ${xyz?.length} (노드 ${N}, 정수)`);
  }

  const isolated = nodes.filter((n) => n.degree === 0).length;
  const stats = `고립 ${isolated}  ·  들어옴 0 ${ins.filter((x) => !x).length}  ·  나감 0 ${outs.filter((x) => !x).length}  ·  graph.json ${Buffer.byteLength(text)}B (gzip ${gzipSync(text, { level: 9 }).length}B)`;
  return { problems, warnings, stats };
}

// ── self-check: `node lib/graph.mjs --check ../dist/graph.json [--paths ../dist/graph/paths.json] [--layout3d ../dist/graph/3d/layout.json]` ──
if (process.argv[1]?.endsWith('graph.mjs') && process.argv.includes('--check')) {
  const arg = (k) => (process.argv.includes(k) ? process.argv[process.argv.indexOf(k) + 1] : null);
  const file = arg('--check'), pathsFile = arg('--paths'), layoutFile = arg('--layout3d');
  const paths = pathsFile ? JSON.parse(readFileSync(pathsFile, 'utf8')) : undefined;
  const layout3d = layoutFile ? JSON.parse(readFileSync(layoutFile, 'utf8')) : undefined;
  const { problems, warnings, stats } = checkGraphJson(readFileSync(file, 'utf8'), { paths, layout3d });
  for (const w of warnings) console.log(`WARN ${w}`);
  for (const p of problems) console.log(`FAIL ${p}`);
  console.log(`graph.json check ${problems.length ? 'FAIL' : '✓'}  ·  ${stats}`);
  if (problems.length) process.exit(1);
}
