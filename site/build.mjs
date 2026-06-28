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
import { BASE, href } from './lib/config.mjs';
import { loadContent } from './lib/content.mjs';
import { buildGraph } from './lib/graph.mjs';
import { renderMarkdown } from './lib/markdown.mjs';
import { home, wikiInterim } from './lib/templates.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..'); // 저장소 루트 (wiki/, index.md 등 콘텐츠 소스)
const DIST = resolve(ROOT, 'dist');

async function main() {
  console.log(`[build] BASE='${BASE || '(local)'}'  ROOT=${ROOT}`);

  // 1) dist 초기화
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  // 2) 콘텐츠 로드 (wiki frontmatter + index.md 카탈로그 머지)
  const content = await loadContent(ROOT);
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

  // 5) 전 페이지 렌더 + 깨진 링크 수집 (위키 본문은 공유 셸 + INTERIM 본문)
  const brokenByPage = []; // { id, targets:[...] }
  let rendered = 0;
  for (const page of pages.values()) {
    const { html, toc, broken } = renderMarkdown(page.body, { resolve: resolveLink, hrefFn: href });
    if (broken.length) brokenByPage.push({ id: page.id, targets: broken });
    const outDir = join(DIST, page.category, page.stem);
    await mkdir(outDir, { recursive: true });
    await writeFile(join(outDir, 'index.html'), wikiInterim(page, html, toc, graph.degree));
    rendered++;
  }
  console.log(`[render] pages rendered: ${rendered}`);

  // 6) 홈(랜딩) — Constellation 히어로 + 카테고리 밴드 + 카드 그리드
  const stats = {
    pages: graph.nodes.length,
    links: graph.edges.length,
    categories: sections.filter((s) => s.pages.length).length,
  };
  await writeFile(
    join(DIST, 'index.html'),
    home({ sections, degree: graph.degree, adjacency, stats, graphHref: href('/graph.json') })
  );

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

  console.log('[build] copied site chrome + fonts → dist/static');
}

main().catch((err) => {
  console.error('[build] FAILED:', err);
  process.exit(1);
});
