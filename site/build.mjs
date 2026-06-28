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
import { BASE, SITE, href } from './lib/config.mjs';
import { loadContent } from './lib/content.mjs';
import { buildGraph } from './lib/graph.mjs';
import { renderMarkdown, escapeHtml } from './lib/markdown.mjs';

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

  // 4) wiki/assets → dist/assets 복사 (figure 임베드 src)
  const assetsSrc = resolve(ROOT, 'wiki', 'assets');
  if (existsSync(assetsSrc)) {
    await cp(assetsSrc, join(DIST, 'assets'), { recursive: true });
    console.log('[build] copied wiki/assets → dist/assets');
  }

  // 4.5) 사이트 크롬(css/js/img) + self-host 폰트 → dist/static
  //      dist/assets(=wiki figure 전용)와 분리해 경로 충돌 방지.
  await copyStatic();

  // 5) 전 페이지 렌더 + 깨진 링크 수집 (INTERIM 레이아웃)
  const brokenByPage = []; // { id, targets:[...] }
  let rendered = 0;
  for (const page of pages.values()) {
    const { html, toc, broken } = renderMarkdown(page.body, { resolve: resolveLink, hrefFn: href });
    if (broken.length) brokenByPage.push({ id: page.id, targets: broken });
    const outDir = join(DIST, page.category, page.stem);
    await mkdir(outDir, { recursive: true });
    await writeFile(join(outDir, 'index.html'), interimPage(page, html, toc, graph.degree));
    rendered++;
  }
  console.log(`[render] pages rendered: ${rendered}`);

  // 6) 홈(카탈로그 인덱스) — INTERIM
  await writeFile(join(DIST, 'index.html'), interimHome(sections, graph.degree));

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

// ── INTERIM 레이아웃 (Phase 2~4가 templates.mjs로 대체) ─────────────────────────

// FOUC 방지: CSS 적용 전 동기 실행으로 초기 테마를 확정한다.
const FOUC_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(!t)t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

function shell(title, bodyHtml) {
  return `<!doctype html>
<html lang="${SITE.lang}" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)} · ${escapeHtml(SITE.title)}</title>
<script>${FOUC_SCRIPT}</script>
<link rel="stylesheet" href="${href('/static/fonts/pretendard/pretendard-dynamic-subset.css')}">
<link rel="stylesheet" href="${href('/static/css/styles.css')}">
</head>
<body>
<header class="topbar">
<button type="button" class="theme-toggle" data-theme-toggle aria-label="테마 전환" aria-pressed="false">☀</button>
</header>
<main class="shell">
<p class="interim">⚙ INTERIM 레이아웃 (Phase 1 콘텐츠 파이프라인 검증용). Constellation 디자인 시스템(토큰·폰트·light/dark)은 Phase 2 적용됨 — 컴포넌트 레이아웃(헤더·카드·constellation)은 Phase 3~4.</p>
${bodyHtml}
<hr>
<p class="eyebrow"><a href="${href('/')}">← ${escapeHtml(SITE.title)} 홈</a></p>
</main>
<script src="${href('/static/js/theme.js')}" defer></script>
</body>
</html>
`;
}

function interimPage(page, html, toc, degree) {
  const deg = degree.get(page.id) || 0;
  const meta = [page.catalogType || page.type, page.year].filter(Boolean).join(' · ');
  const tocHtml = toc.length
    ? `<nav class="eyebrow">TOC: ${toc
        .map((t) => `<a href="#${t.id}">${escapeHtml(t.text)}</a>`)
        .join(' · ')}</nav>`
    : '';
  return shell(
    page.title,
    `<p class="eyebrow">${escapeHtml(page.category)} · ${escapeHtml(meta)} · ↳ ${deg} links</p>
<h1>${escapeHtml(page.title)}</h1>
${tocHtml}
<hr>
${html}`
  );
}

function interimHome(sections, degree) {
  const blocks = sections
    .filter((s) => s.pages.length)
    .map((s) => {
      const items = s.pages
        .map((p) => {
          const deg = degree.get(p.id) || 0;
          return `<li><a href="${href(`/${p.category}/${p.stem}/`)}">${escapeHtml(
            p.display
          )}</a> <span class="eyebrow">↳ ${deg}</span><br><span class="eyebrow">${escapeHtml(
            p.desc || ''
          )}</span></li>`;
        })
        .join('\n');
      return `<section><h2>${escapeHtml(s.label)} <span class="eyebrow">(${s.pages.length})</span></h2>
<p class="eyebrow">${escapeHtml(s.desc || '')}</p>
<ul>${items}</ul></section>`;
    })
    .join('\n');
  return shell(
    SITE.title,
    `<p class="eyebrow">${escapeHtml(SITE.description)}</p>
<h1>${escapeHtml(SITE.title)}</h1>
${blocks}`
  );
}

main().catch((err) => {
  console.error('[build] FAILED:', err);
  process.exit(1);
});
