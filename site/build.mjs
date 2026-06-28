// ai-wiki → GitHub Pages 빌드 엔트리.
// Phase 0: 스켈레톤 — 콘텐츠 로드 → 그래프 빌드 → 렌더 → dist 출력 파이프라인의 뼈대만 동작 확인.
// 이후 Phase에서 lib/content·markdown·graph·templates·nav 모듈을 채워 넣는다.

import { rm, mkdir, writeFile, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { BASE, SITE } from './lib/config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..'); // 저장소 루트 (wiki/, index.md 등 콘텐츠 소스)
const DIST = resolve(ROOT, 'dist');

async function main() {
  console.log(`[build] BASE='${BASE || '(local)'}'  ROOT=${ROOT}`);

  // 1) dist 초기화
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  // 2) (Phase 1+) 콘텐츠 로드 · 그래프 · 렌더 — 현재는 스켈레톤 플레이스홀더
  //    const sections = await loadContent(ROOT);
  //    const graph = buildGraph(sections);
  //    renderHome / renderWiki / renderAbout ...

  // 3) wiki/assets → dist/assets 복사 (figure 임베드용). 존재할 때만.
  const assetsSrc = resolve(ROOT, 'wiki', 'assets');
  if (existsSync(assetsSrc)) {
    await cp(assetsSrc, resolve(DIST, 'assets'), { recursive: true });
    console.log('[build] copied wiki/assets → dist/assets');
  }

  // 4) 빌드 검증용 플레이스홀더 홈 + graph.json
  await writeFile(resolve(DIST, 'graph.json'), JSON.stringify({ nodes: [], edges: [] }, null, 2));
  await writeFile(resolve(DIST, 'index.html'), placeholderHome());

  console.log('[build] wrote dist/index.html + dist/graph.json (skeleton)');
  console.log('[build] done.');
}

function placeholderHome() {
  return `<!doctype html>
<html lang="${SITE.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${SITE.title} — build skeleton</title>
<base href="${BASE}/">
</head>
<body>
<main style="font-family:system-ui;max-width:42rem;margin:4rem auto;padding:0 1rem;">
<h1>${SITE.title}</h1>
<p>Phase 0 빌드 스켈레톤이 정상 동작합니다. (BASE='${BASE || '(local)'}')</p>
<p>${SITE.description}</p>
</main>
</body>
</html>
`;
}

main().catch((err) => {
  console.error('[build] FAILED:', err);
  process.exit(1);
});
