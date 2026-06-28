// ai-wiki → GitHub Pages 빌드 엔트리.
//
// Phase 1: 콘텐츠 파이프라인 가동 — 콘텐츠 로드 → 그래프 빌드 → 전 페이지 렌더 →
//          dist 출력 + 깨진 링크/누락 콘솔 리포트.
//
// 페이지 HTML 레이아웃은 아직 INTERIM(임시) — Phase 2~4에서 lib/templates.mjs(Constellation
// 디자인 시스템)로 대체한다. 여기서는 파이프라인이 실제로 동작하는지(라우트 200·링크 해석·
// 그래프 산출)를 검증할 수 있는 최소 셸만 둔다.

import { rm, mkdir, writeFile, cp } from 'node:fs/promises';
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

// ── INTERIM 레이아웃 (Phase 2~4가 templates.mjs로 대체) ─────────────────────────

function shell(title, bodyHtml) {
  return `<!doctype html>
<html lang="${SITE.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)} · ${escapeHtml(SITE.title)}</title>
<style>
  body{font-family:system-ui,-apple-system,"Apple SD Gothic Neo","Noto Sans KR",sans-serif;
       max-width:46rem;margin:0 auto;padding:2rem 1rem;line-height:1.7;color:#1b1f27}
  a{color:#0b7}.wikilink-missing{color:#b94a48;border-bottom:1px dotted #b94a48}
  figure{margin:1.5rem 0}figure img{max-width:100%;height:auto;border:1px solid #e3e7ee;border-radius:6px}
  figcaption{font-size:.85rem;color:#5c6473;margin-top:.4rem}
  pre{background:#f1f3f7;padding:1rem;overflow:auto;border-radius:6px}
  code{background:#f1f3f7;padding:.1em .3em;border-radius:3px}
  pre code{background:none;padding:0}
  table{border-collapse:collapse}th,td{border:1px solid #e3e7ee;padding:.4rem .6rem}
  .eyebrow{font-size:.8rem;color:#5c6473;text-transform:uppercase;letter-spacing:.05em}
  .interim{background:#fff7e6;border:1px solid #ffd591;padding:.5rem .8rem;border-radius:6px;font-size:.8rem;color:#8a5a00}
</style>
</head>
<body>
<p class="interim">⚙ INTERIM 레이아웃 (Phase 1 콘텐츠 파이프라인 검증용). Constellation 디자인은 Phase 2~4에서 적용.</p>
${bodyHtml}
<hr>
<p class="eyebrow"><a href="${href('/')}">← ${escapeHtml(SITE.title)} 홈</a></p>
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
