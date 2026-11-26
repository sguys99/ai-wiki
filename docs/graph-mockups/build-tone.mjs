// build-tone.mjs: Phase 7 색상과 톤 시안(g-*.html)이 쓰는 사이트 스냅샷을 shared/tone/ 에 만든다.
//
//   실행: (cd site && npm run build) 뒤 저장소 루트에서 node docs/graph-mockups/build-tone.mjs [빌드 폴더]
//         빌드 폴더를 주지 않으면 dist/ 를 읽는다. dist/ 에는 쓰지 않는다.
//
// 시안 G, H, I 는 지금 판(F)과 배치와 동작이 같아야 하므로 사이트가 실제로 내보낸 그래프 페이지 마크업,
// styles.css, graph-core.js, graph-explorer.js 를 그대로 가져온다. 탐색기에는 그리기 갈래 몇 곳에만
// 토큰 훅을 덧댄다 (PATCHES). 훅은 CSS 토큰을 읽고 토큰이 없으면 지금 판과 똑같이 그린다.
// 사이트 코드가 바뀌어 덧댈 자리를 못 찾으면 멈춘다.

import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import assert from 'node:assert/strict';

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(process.argv[2] || resolve(HERE, '../../dist'));
const OUT = join(HERE, 'shared', 'tone');
const ORBIT_NODE = 'agents/cemri-2025-why-do-multi-agent-llm-systems'; // 이웃 21개, 카테고리 6개
const MINI_PAGE = 'overviews/glossary-agents'; // 이웃 13개, 카테고리 6개

const read = (p) => readFile(join(SRC, p), 'utf8');
const between = (html, start, end) => {
  const i = html.indexOf(start), j = html.indexOf(end, i);
  assert.ok(i >= 0 && j > i, `구간을 찾지 못함: ${start}`);
  return html.slice(i, j + end.length);
};

// ── 탐색기 토큰 훅. [찾을 글, 바꿀 글] 이고 찾을 글은 정확히 한 번 나와야 한다 ──
const PATCHES = [
  // 새 토큰: 노드 질감, 광택 세기, 렌즈 반짝임, 안개 알파, 엣지 굵기, 모노크롬 모드와 무채색 세 단계
  ['      var cat = {};\n',
   '      var cat = {}, num = function (v, d) { var x = parseFloat(v); return isFinite(x) ? x : d; };\n'],
  ["        lens: g('--graph-lens'), hairline: g('--hairline'), signal: g('--signal'), text: g('--text'), muted: g('--muted'),\n",
   "        lens: g('--graph-lens'), hairline: g('--hairline'), signal: g('--signal'), text: g('--text'), muted: g('--muted'),\n" +
   "        nodeStyle: g('--graph-node-style') || 'orb', sheen: num(g('--graph-node-sheen'), 1), glint: num(g('--graph-glint'), 1) > 0,\n" +
   "        hazeAlpha: num(g('--graph-haze-alpha'), NaN), edgeW: num(g('--graph-edge-width'), 0.7), ring: g('--graph-ring'),\n" +
   "        nameAlpha: num(g('--graph-name-alpha'), NaN), nameMix: num(g('--graph-name-mix'), 0),\n" +
   "        mono: num(g('--graph-mono'), 0) > 0, monoCol: { _m1: g('--graph-mono-1'), _m2: g('--graph-mono-2'), _m3: g('--graph-mono-3') },\n"],
  ['spec = function (a) { return rgba(WHITE, a); };', 'spec = function (a) { return rgba(WHITE, a * T.sheen); };'],
  ['      cats.forEach(function (id) {\n        var col = rgbOf(T.cat[id]),',
   "      cats.concat(T.mono ? ['_m1', '_m2', '_m3'] : []).forEach(function (id) {\n        var css = T.cat[id] || T.monoCol[id], col = rgbOf(css),"],
  ["        if (id === 'etc') { // 유리 고리",
   "        if (T.nodeStyle === 'matte') matteCore(g, col, o, id); else {\n        if (id === 'etc') { // 유리 고리"],
  ['g.fillStyle = sp; g.beginPath(); g.ellipse(hx, hy, SR * 0.36, SR * 0.28, -0.6, 0, TAU); g.fill();\n',
   'g.fillStyle = sp; g.beginPath(); g.ellipse(hx, hy, SR * 0.36, SR * 0.28, -0.6, 0, TAU); g.fill();\n        }\n'],
  ['sprites[id] = { core: core, halo: halo, aura: aura, css: T.cat[id] };', 'sprites[id] = { core: core, halo: halo, aura: aura, css: css };'],
  ['    function buildSprites() {',
   "    // [tone] 무광 노드: 단색 원 위에 무대색 테를 얇게 둘러 겹친 노드를 떼어 놓는다. etc 는 같은 색 빈 고리\n" +
   "    function matteCore(g, col, o, id) {\n" +
   "      if (id === 'etc') { g.lineWidth = SR * 0.3; g.strokeStyle = rgba(col, 1); g.beginPath(); g.arc(o, o, SR * 0.84, 0, TAU); g.stroke(); return; }\n" +
   "      g.fillStyle = rgba(col, 1); g.beginPath(); g.arc(o, o, SR, 0, TAU); g.fill();\n" +
   "      g.lineWidth = SR * 0.12; g.strokeStyle = rgba(rgbOf(T.ring), 0.55); g.beginPath(); g.arc(o, o, SR * 0.94, 0, TAU); g.stroke();\n" +
   "    }\n" +
   "    // [tone] 모노크롬 모드에서 색을 켜는 노드: 궤도 구성원, 호버 이웃, 필터와 범례 결과, 경로 단계, 검색 결과\n" +
   "    function colorOn(n) {\n" +
   "      var h = hovered || cursor;\n" +
   "      return (mode === 'orbit' && n.role >= 0) || !!(h && (n === h || h.nb.has(n))) || !!((fActive || legendHover) && lit[n.i]) ||\n" +
   "        !!(pathOn && stepOf.has(n)) || searchHits.has(n);\n" +
   "    }\n" +
   '    function buildSprites() {'],
  ['t.fillStyle = T.cat[c]; t.fillRect(0, 0, w, h);', 't.fillStyle = T.mono ? T.monoCol._m2 : T.cat[c]; t.fillRect(0, 0, w, h);'],
  ['o.globalAlpha = dark ? 0.3 : 0.13;', 'o.globalAlpha = isFinite(T.hazeAlpha) ? T.hazeAlpha : dark ? 0.3 : 0.13;'],
  ['        ctx.lineWidth = 0.7;\n', '        ctx.lineWidth = T.edgeW;\n'],
  ['ctx.strokeStyle = same ? T.cat[key] : T.edge;', 'ctx.strokeStyle = same && !T.mono ? T.cat[key] : T.edge;'],
  ['ctx.strokeStyle = sm ? T.cat[se.s.category] : T.edge;', 'ctx.strokeStyle = sm && !T.mono ? T.cat[se.s.category] : T.edge;'],
  ['          ctx.strokeStyle = g; ctx.beginPath(); ctx.moveTo(hs.x, hs.y); ctx.lineTo(ms.x, ms.y); ctx.stroke();',
   '          ctx.strokeStyle = T.mono ? T.signal : g; ctx.beginPath(); ctx.moveTo(hs.x, hs.y); ctx.lineTo(ms.x, ms.y); ctx.stroke();'],
  ['        var sp = sprites[n.category];\n',
   "        var sp = T.mono && !colorOn(n) ? sprites[n.degree >= 30 ? '_m3' : n.degree >= 8 ? '_m2' : '_m1'] : sprites[n.category];\n"],
  ['if (dark && (n.role === 0 || (n.degree >= 50', 'if (T.glint && dark && (n.role === 0 || (n.degree >= 50'],
  ['ctx.strokeStyle = T.cat[p.id]; ctx.lineWidth = 0.8;', 'ctx.strokeStyle = T.mono ? T.labelMuted : T.cat[p.id]; ctx.lineWidth = 0.8;'],
  ['ctx.globalAlpha = fa * (dark ? 0.7 : 0.8);', 'ctx.globalAlpha = fa * (isFinite(T.nameAlpha) ? T.nameAlpha : dark ? 0.7 : 0.8);'],
  // 성운 이름 글자색: 카테고리 색을 라벨색 쪽으로 --graph-name-mix 만큼 섞어 AA 를 맞춘다 (모노크롬은 흐린 라벨색)
  ['        ctx.fillStyle = T.cat[p.id];\n        ctx.fillText(p.name, p.x, p.y);',
   '        ctx.fillStyle = T.mono ? T.labelMuted : T.nameMix ? rgba(mixc(rgbOf(T.cat[p.id]), rgbOf(T.label), T.nameMix), 1) : T.cat[p.id];\n        ctx.fillText(p.name, p.x, p.y);'],
];

function patch(src) {
  for (const [from, to] of PATCHES) {
    const n = src.split(from).length - 1;
    assert.equal(n, 1, `탐색기 덧댈 자리 ${n}곳 (1곳이어야 한다): ${from.trim().slice(0, 70)}`);
    src = src.replace(from, () => to);
  }
  return `// 생성 파일 (build-tone.mjs). 사이트 graph-explorer.js 에 [tone] 토큰 훅을 덧댄 사본이다.\n${src}`;
}

await mkdir(join(OUT, 'css'), { recursive: true });
await mkdir(join(OUT, 'fonts'), { recursive: true });

const graphText = await read('graph.json');
const graph = JSON.parse(graphText);
assert.equal(graph.version, 2, 'graph.json v2 가 아니다');
const ids = graph.nodes.map((n) => n.id);
assert.ok(ids.includes(ORBIT_NODE) && ids.includes(MINI_PAGE), '궤도 노드나 미니 그래프 페이지가 그래프에 없다');
const paths = JSON.parse(await read('graph/paths.json'));

const graphHtml = await read('graph/index.html');
const miniHtml = await read(`${MINI_PAGE}/index.html`);
const snap = {
  built: new Date().toISOString(),
  stats: { nodes: graph.nodes.length, links: graph.links.length / 2 },
  orbitNode: ORBIT_NODE,
  graph,
  paths,
  header: between(graphHtml, '<header class="site-header">', '</header>'),
  graphMain: between(graphHtml, '<main id="main" class="graph"', '</main>'),
  mini: {
    title: between(miniHtml, '<h1 class="wiki-title"', '</h1>'),
    foot: between(miniHtml, '<footer class="wiki-foot">', '</footer>'),
  },
};
assert.ok(snap.graphMain.includes('class="graph-canvas"') && snap.mini.foot.includes('class="neigh"'), '마크업 추출 실패');
await writeFile(join(OUT, 'snapshot.js'), `// 생성 파일. build-tone.mjs 를 다시 돌린다.\nwindow.TONE_SNAPSHOT = ${JSON.stringify(snap)};\n`);

await copyFile(join(SRC, 'static/css/styles.css'), join(OUT, 'css/styles.css'));
for (const f of ['space-grotesk-latin-500-normal', 'space-grotesk-latin-700-normal', 'jetbrains-mono-latin-400-normal', 'jetbrains-mono-latin-500-normal'])
  await copyFile(join(SRC, `static/fonts/${f}.woff2`), join(OUT, `fonts/${f}.woff2`));
for (const f of ['graph-core.js', 'reader.js']) await copyFile(join(SRC, 'static/js', f), join(OUT, f));
await writeFile(join(OUT, 'graph-explorer-tone.js'), patch(await read('static/js/graph-explorer.js')));

console.log(`nodes ${snap.stats.nodes}, links ${snap.stats.links}, patches ${PATCHES.length}, from ${SRC}`);
