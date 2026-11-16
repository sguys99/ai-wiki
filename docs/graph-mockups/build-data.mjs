// build-data.mjs: 시안용 그래프 스냅샷을 shared/graph-data.js 로 만든다.
//
//   실행: node docs/graph-mockups/build-data.mjs   (저장소 루트에서, site/node_modules 설치 필요)
//
// 사이트 빌드(site/build.mjs 3절)와 같은 loadContent + buildGraph 를 그대로 쓰고,
// 노드에 year, type, tags 를 wiki frontmatter 에서 덧붙인다 (계획서 Phase 3 선행분).
// file:// 에서는 JSON fetch 가 막히므로 window.GRAPH_DATA 대입문으로 쓴다.
// site/ 아래는 읽기만 한다.

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import assert from 'node:assert/strict';
import { loadContent } from '../../site/lib/content.mjs';
import { buildGraph } from '../../site/lib/graph.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '../..');

const { pages, resolve: resolveLink } = await loadContent(ROOT);
const graph = buildGraph(pages, resolveLink);

const nodes = graph.nodes.map((n) => {
  const p = pages.get(n.id);
  const year = Number.parseInt(p.year, 10);
  return { ...n, year: Number.isFinite(year) ? year : null, type: p.type, tags: p.tags };
});

// 자체 점검: 규모와 엣지 해석
const ids = new Set(nodes.map((n) => n.id));
assert.ok(nodes.length > 300, `노드 ${nodes.length}개 (300 초과 기대)`);
for (const e of graph.edges)
  assert.ok(ids.has(e.source) && ids.has(e.target), `해석 안 되는 엣지 ${e.source} -> ${e.target}`);

const data = { generated: new Date().toISOString(), nodes, edges: graph.edges };
const out = join(HERE, 'shared', 'graph-data.js');
await writeFile(
  out,
  `// 생성 파일. 직접 고치지 말고 build-data.mjs 를 다시 돌린다.\nwindow.GRAPH_DATA = ${JSON.stringify(data)};\n`
);

const count = (key) =>
  Object.entries(nodes.reduce((m, n) => ((m[n[key] ?? 'null'] = (m[n[key] ?? 'null'] || 0) + 1), m), {}))
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => `${k} ${v}`)
    .join(', ');
const years = nodes.map((n) => n.year).filter((y) => y != null);
console.log(`nodes ${nodes.length}, edges ${graph.edges.length}, unresolved links ${graph.unresolved.length}`);
console.log(`category: ${count('category')}`);
console.log(`type: ${count('type')}`);
console.log(`year: ${years.length}/${nodes.length} nodes, ${Math.min(...years)}-${Math.max(...years)}`);
console.log(`year dist: ${count('year')}`);
console.log(`max degree: ${nodes.map((n) => n.degree).sort((a, b) => b - a).slice(0, 5).join(', ')}`);
console.log(`wrote ${out}`);
