// graph-3d.js — /graph/3d/ 3D 실험 페이지 (정본 docs/graph-spec/06-extra-features.md 6절, 05-libraries.md 6절).
//
// 보기 전용이다: 회전, 확대, 호버 라벨, 누르면 작은 카드, 좌하단 카테고리 강조. 검색, 필터, 궤도, 경로는 넣지 않는다.
// 배치는 빌드가 계산한 graph/3d/layout.json 을 그대로 쓴다 (시안 E 의 630ms 동기 배치가 없다).
// 무대 색은 main.g3d 의 CSS 토큰을 읽는다. .g3d 가 늘 dark 토큰을 받으므로 사이트 테마가 바뀌어도 무대는 그대로다 (R5).
// three 는 모듈 파일 기준 상대 경로라 importmap 이 없고 BASE 와 무관하다. 두 JSON 과 함께 병렬로 받는다.
let THREE; // WebGL 이 없으면 three 를 내려받지 않도록 동적 import 한다

const main = document.getElementById('main');
const stage = document.getElementById('g3d-stage');
const fail = (why) => {
  main.dataset.state = 'failed';
  console.warn('[graph-3d]', why);
};

const hasWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) {
    return false;
  }
};
const fetchJson = (url) => fetch(url).then((r) => (r.ok ? r.json() : Promise.reject(new Error(url + ' ' + r.status))));

try {
  if (!hasWebGL()) throw new Error('WebGL 없음');
  const [mod, graph, lay] = await Promise.all([
    import('../vendor/three/three.module.min.js'),
    fetchJson(stage.dataset.graph),
    fetchJson(stage.dataset.layout),
  ]);
  THREE = mod;
  if (lay.n !== graph.nodes.length || lay.xyz.length !== 3 * lay.n) throw new Error('layout.json 노드 수 불일치');
  start(graph, lay);
} catch (e) {
  fail(e);
}

function start(graph, lay) {
  THREE.ColorManagement.enabled = false; // 셰이더가 토큰 hex 를 그대로 내도록 sRGB 변환을 끈다
  const nodes = graph.nodes;
  const N = nodes.length;
  const P = Float32Array.from(lay.xyz);
  const edges = [];
  const nbrs = nodes.map(() => new Set());
  for (let k = 0; k < graph.links.length; k += 2) {
    const a = graph.links[k], b = graph.links[k + 1];
    if (nbrs[a].has(b)) continue; // 양방향 링크는 선 하나로
    nbrs[a].add(b);
    nbrs[b].add(a);
    edges.push([a, b]);
  }
  const E = edges.length;
  const base = stage.dataset.base;
  const graph2d = stage.dataset.graph2d;
  const reduceMq = matchMedia('(prefers-reduced-motion: reduce)');
  let reduce = reduceMq.matches;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const trunc = (s) => (s.length > 28 ? s.slice(0, 27) + '…' : s);
  const radiusPx = (deg) => Math.min(20, 2 + 1.6 * Math.sqrt(deg));
  const catName = {};
  stage.querySelectorAll('.graph-legend-item').forEach((b) => (catName[b.dataset.cat] = b.querySelector('.graph-legend-name').textContent));

  // ── 토큰 ──
  const cs = getComputedStyle(main);
  const tok = (n, f) => cs.getPropertyValue(n).trim() || f;
  const catColor = {};
  for (const c of Object.keys(catName).concat(['etc'])) catColor[c] = new THREE.Color(tok('--cat-' + c, '#7d8ba6'));
  const colorOf = (i) => catColor[nodes[i].category] || catColor.etc;
  const bgColor = new THREE.Color(tok('--graph-bg', '#070b14'));
  const dimAlpha = parseFloat(tok('--graph-dim-alpha', '0.14')) || 0.14;

  // ── 렌더러 ──
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) {
    fail(e);
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0); // 바탕은 main.g3d 의 CSS 그라데이션
  const canvas = renderer.domElement;
  canvas.setAttribute('role', 'img');
  canvas.tabIndex = -1; // 카드를 닫을 때 초점을 받는다
  canvas.setAttribute('aria-label', `wiki 페이지 ${N}개와 연결 ${E}개를 3D 공간에 놓은 그래프`);
  stage.prepend(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 1, 6000);

  const radii = [];
  for (let i = 0; i < N; i++) radii.push(Math.hypot(P[i * 3], P[i * 3 + 1], P[i * 3 + 2]));
  radii.sort((a, b) => a - b);
  const sceneR = radii[Math.floor(N * 0.97)] || 150;

  // ── 노드: 같은 정점 버퍼를 두 번 그린다. 빛번짐은 additive, 구슬은 깊이 순 정렬 + normal blending ──
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(P, 3));
  const aColor = new Float32Array(N * 3), aSize = new Float32Array(N), aAlpha = new Float32Array(N),
    aShape = new Float32Array(N), aRing = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    colorOf(i).toArray(aColor, i * 3);
    aSize[i] = radiusPx(nodes[i].degree);
    aShape[i] = nodes[i].category === 'overviews' ? 1 : nodes[i].category === 'etc' ? 2 : 0;
  }
  geo.setAttribute('aColor', new THREE.BufferAttribute(aColor, 3));
  geo.setAttribute('aSize', new THREE.BufferAttribute(aSize, 1));
  geo.setAttribute('aAlpha', new THREE.BufferAttribute(aAlpha, 1));
  geo.setAttribute('aShape', new THREE.BufferAttribute(aShape, 1));
  geo.setAttribute('aRing', new THREE.BufferAttribute(aRing, 1));
  const order = new Uint16Array(N).map((_, i) => i);
  geo.setIndex(new THREE.BufferAttribute(order, 1));

  const shared = { uNear: { value: 0 }, uFar: { value: 1 }, uPx: { value: 1 }, uRef: { value: 1 }, uScale: { value: 1 }, uBg: { value: bgColor } };
  const vert = (glow) => `
    attribute vec3 aColor; attribute float aSize, aAlpha, aShape, aRing;
    uniform float uPx, uRef, uNear, uFar, uScale;
    varying vec3 vColor; varying float vAlpha, vFog, vShape, vRing, vR, vSpan;
    void main() {
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      float depth = -mv.z;
      vR = aSize * uScale * clamp(pow(uRef / max(depth, 1.0), 0.5), 0.55, 2.2);
      vFog = clamp((depth - uNear) / (uFar - uNear), 0.0, 1.0);
      vColor = aColor; vAlpha = aAlpha; vShape = aShape; vRing = aRing;
      float hs = ${glow ? 'vR * 3.4 + 3.0' : 'vR + 8.0'}; // half 는 GLSL 예약어
      vSpan = hs / vR;
      gl_PointSize = hs * 2.0 * uPx;
      gl_Position = projectionMatrix * mv;
    }`;
  const glowMat = new THREE.ShaderMaterial({
    uniforms: shared,
    vertexShader: vert(true),
    fragmentShader: `
      varying vec3 vColor; varying float vAlpha, vFog, vShape, vRing, vR, vSpan;
      void main() {
        float d = length(gl_PointCoord - 0.5) * 2.0 * vSpan;
        float g = exp(-d * d * 0.32) * (0.30 + 0.45 * smoothstep(3.0, 16.0, vR)) + (vRing > 0.5 ? exp(-d * d * 0.18) * 0.35 : 0.0);
        float a = g * vAlpha * (1.0 - 0.8 * vFog);
        if (a < 0.003) discard;
        gl_FragColor = vec4(vColor, a);
      }`,
    transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const orbMat = new THREE.ShaderMaterial({
    uniforms: shared,
    vertexShader: vert(false),
    fragmentShader: `
      uniform vec3 uBg;
      varying vec3 vColor; varying float vAlpha, vFog, vShape, vRing, vR, vSpan;
      float band(float d, float a, float b, float aa) { return smoothstep(a - aa, a + aa, d) * (1.0 - smoothstep(b - aa, b + aa, d)); }
      void main() {
        vec2 pc = (gl_PointCoord - 0.5) * 2.0 * vSpan;
        float d = length(pc);
        float px = 1.0 / vR, aa = 0.7 * px;
        float core = 1.0 - smoothstep(1.0 - aa, 1.0 + aa, d);
        bool hollow = vShape > 1.5;
        if (hollow) core *= smoothstep(1.0 - 1.7 * px - aa, 1.0 - 1.7 * px + aa, d);
        float ring = vShape > 0.5 && vShape < 1.5 ? band(d, 1.0 + 2.5 * px, 1.0 + 4.0 * px, aa) : 0.0;
        float sel = vRing > 0.5 ? band(d, 1.0 + 4.0 * px, 1.0 + (vRing > 1.5 ? 6.5 : 5.5) * px, aa) : 0.0;
        // 구슬: 왼쪽 위 빛, 반사광 한 점, 가장자리 빛
        float z = sqrt(max(0.0, 1.0 - d * d));
        vec3 n = vec3(pc.x, -pc.y, z);
        vec3 L = normalize(vec3(-0.5, 0.6, 0.65));
        float lam = max(dot(n, L), 0.0);
        float spec = pow(max(dot(reflect(-L, n), vec3(0.0, 0.0, 1.0)), 0.0), 26.0);
        float rim = pow(1.0 - z, 2.5);
        vec3 orb = hollow ? vColor : vColor * (0.38 + 0.72 * lam) + vec3(spec * 0.6) + vColor * rim * 0.4;
        float shell = max(ring, sel);
        vec3 col = mix(mix(vColor, vec3(1.0), 0.3), orb, core);
        col = mix(col, uBg, vFog * 0.5);
        float a = max(core, shell) * vAlpha * (1.0 - 0.55 * vFog);
        if (a < 0.004) discard;
        gl_FragColor = vec4(col, a);
      }`,
    transparent: true, depthTest: false, depthWrite: false,
  });
  const glowPts = new THREE.Points(geo, glowMat);
  const orbPts = new THREE.Points(geo, orbMat);
  glowPts.frustumCulled = orbPts.frustumCulled = false;
  glowPts.renderOrder = 2;
  orbPts.renderOrder = 3;
  scene.add(glowPts, orbPts);

  // ── 엣지: LineSegments 하나. 양 끝 노드 색으로 옅게, 깊이로 흐린다 ──
  const lineMat = (fogK) => new THREE.ShaderMaterial({
    uniforms: shared,
    vertexShader: `
      attribute vec3 aColor; attribute float aAlpha;
      uniform float uNear, uFar;
      varying vec3 vColor; varying float vAlpha;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        float fog = clamp((-mv.z - uNear) / (uFar - uNear), 0.0, 1.0);
        vColor = aColor; vAlpha = aAlpha * (1.0 - ${fogK.toFixed(2)} * fog);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `varying vec3 vColor; varying float vAlpha; void main() { gl_FragColor = vec4(vColor, vAlpha); }`,
    transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const ePos = new Float32Array(E * 6), eColor = new Float32Array(E * 6), eAlpha = new Float32Array(E * 2);
  edges.forEach(([a, b], k) => {
    for (let c = 0; c < 3; c++) {
      ePos[k * 6 + c] = P[a * 3 + c];
      ePos[k * 6 + 3 + c] = P[b * 3 + c];
    }
  });
  const edgeGeo = new THREE.BufferGeometry();
  edgeGeo.setAttribute('position', new THREE.BufferAttribute(ePos, 3));
  edgeGeo.setAttribute('aColor', new THREE.BufferAttribute(eColor, 3));
  edgeGeo.setAttribute('aAlpha', new THREE.BufferAttribute(eAlpha, 1));
  const lines = new THREE.LineSegments(edgeGeo, lineMat(0.85));
  lines.frustumCulled = false;
  lines.renderOrder = 1;
  scene.add(lines);

  // ── 천구의 고리(적도, 23.4도 황도, 15도 눈금)와 먼 별 먼지. 그래프와 함께 돈다 ──
  const ringR = sceneR * 1.1;
  const rp = [];
  const circle = (tilt) => {
    const ax = new THREE.Vector3(1, 0, 0);
    for (let k = 0; k < 192; k++)
      for (const t of [k, k + 1]) {
        const a = (t / 192) * Math.PI * 2;
        const v = new THREE.Vector3(Math.cos(a) * ringR, 0, Math.sin(a) * ringR).applyAxisAngle(ax, tilt);
        rp.push(v.x, v.y, v.z);
      }
  };
  circle(0);
  circle((23.4 * Math.PI) / 180);
  for (let k = 0; k < 24; k++) {
    const a = (k / 24) * Math.PI * 2, len = k % 6 === 0 ? 0.06 : 0.03;
    rp.push(Math.cos(a) * ringR, 0, Math.sin(a) * ringR, Math.cos(a) * ringR * (1 + len), 0, Math.sin(a) * ringR * (1 + len));
  }
  const ringGeo = new THREE.BufferGeometry();
  ringGeo.setAttribute('position', new THREE.Float32BufferAttribute(rp, 3));
  const ringCol = new THREE.Color(tok('--graph-edge', '#9fb4e0'));
  const rc = new Float32Array(rp.length);
  for (let k = 0; k < rc.length; k += 3) ringCol.toArray(rc, k);
  ringGeo.setAttribute('aColor', new THREE.BufferAttribute(rc, 3));
  ringGeo.setAttribute('aAlpha', new THREE.BufferAttribute(new Float32Array(rp.length / 3).fill(0.13), 1));
  const rings = new THREE.LineSegments(ringGeo, lineMat(0.75));
  rings.frustumCulled = false;
  scene.add(rings);

  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const dust = new Float32Array(900 * 3);
  for (let k = 0; k < 900; k++) {
    const u = rnd() * 2 - 1, th = rnd() * Math.PI * 2, r = sceneR * (2.4 + rnd() * 2.2), s = Math.sqrt(1 - u * u);
    dust[k * 3] = r * s * Math.cos(th);
    dust[k * 3 + 1] = r * u;
    dust[k * 3 + 2] = r * s * Math.sin(th);
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dust, 3));
  const dustMat = new THREE.PointsMaterial({
    color: new THREE.Color(tok('--graph-dust', '#d4e2ff')), size: 1.4, sizeAttenuation: false,
    transparent: true, opacity: 0.32, depthTest: false, depthWrite: false,
  });
  const dustPts = new THREE.Points(dustGeo, dustMat);
  dustPts.frustumCulled = false;
  dustPts.renderOrder = 0;
  scene.add(dustPts);

  // ── 상태 ──
  let sel = -1, hover = -1, filterCat = null;
  const emCur = new Float32Array(N), emTgt = new Float32Array(N).fill(1);
  const edCur = new Float32Array(E), edTgt = new Float32Array(E);
  const t0 = performance.now();
  let reveal = reduce ? 1 : 0;
  let dirty = true, targetsChanged = true;
  const edgeBase = 0.085, edgeHi = 0.7;

  function recolorEdges() {
    const focus = sel >= 0 ? sel : hover;
    edges.forEach(([a, b], k) => {
      const ca = colorOf(a), cb = colorOf(b);
      if (focus >= 0 && (a === focus || b === focus)) {
        const c = colorOf(a === focus ? b : a);
        c.toArray(eColor, k * 6);
        c.toArray(eColor, k * 6 + 3);
      } else {
        ca.toArray(eColor, k * 6);
        cb.toArray(eColor, k * 6 + 3);
      }
    });
    edgeGeo.attributes.aColor.needsUpdate = true;
  }

  function computeTargets(snap) {
    const focusSet = sel >= 0 ? nbrs[sel] : null;
    for (let i = 0; i < N; i++) {
      let v = 1;
      if (focusSet) v = i === sel || focusSet.has(i) ? 1 : dimAlpha; // 선택이 범례 강조보다 앞선다
      else if (filterCat && nodes[i].category !== filterCat) v = dimAlpha;
      emTgt[i] = v;
      aRing[i] = i === sel ? 2 : i === hover ? 1 : 0;
    }
    geo.attributes.aRing.needsUpdate = true;
    const focus = sel >= 0 ? sel : hover;
    edges.forEach(([a, b], k) => {
      let v = edgeBase;
      if (focus >= 0) v = a === focus || b === focus ? edgeHi : 0.02;
      else if (filterCat) v = nodes[a].category === filterCat && nodes[b].category === filterCat ? edgeBase * 2 : 0.012;
      edTgt[k] = v;
    });
    if (snap || reduce) {
      emCur.set(emTgt);
      edCur.set(edTgt);
    }
    dirty = targetsChanged = true;
    labelsStale = true;
  }

  // ── 카메라: 원점 둘레 구면 좌표 ──
  const cam = { theta: 0.6, phi: 1.2, dist: 400, target: new THREE.Vector3() };
  let fitDist = 400, viewW = 1, viewH = 1, headerH = 0, sizeScale = 1;
  let anim = null;
  let idleUntil = 0, dragging = false;
  const header = document.querySelector('.site-header');

  function resize() {
    const r = stage.getBoundingClientRect();
    viewW = Math.max(1, r.width);
    viewH = Math.max(1, r.height);
    headerH = header ? header.offsetHeight : 0;
    main.style.setProperty('--graph-header-h', headerH + 'px');
    renderer.setSize(viewW, viewH);
    camera.aspect = viewW / viewH;
    // 헤더 아래 보이는 영역의 가운데에 구를 둔다. 아래 범례 한 줄 몫도 뺀다
    const availH = Math.max(120, viewH - headerH - (viewW <= 640 ? 64 : 24));
    const vf = (camera.fov * Math.PI) / 180;
    const vHalf = Math.atan(Math.tan(vf / 2) * (availH / viewH));
    const hHalf = Math.atan(Math.tan(vf / 2) * camera.aspect * ((viewW - 24) / viewW));
    // 휴대폰 세로는 폭이 좁아 고리까지 넣으면 구가 작아진다. 노드 구만 맞추고 고리는 살짝 잘려도 둔다
    fitDist = ((viewW <= 640 ? sceneR * 1.02 : ringR * 1.04)) / Math.sin(Math.min(vHalf, hHalf));
    shared.uPx.value = renderer.getPixelRatio();
    sizeScale = Math.min(1, Math.max(0.6, Math.min(viewW, viewH) / 800));
    shared.uScale.value = sizeScale;
    dustMat.size = 1.4 * renderer.getPixelRatio();
    dirty = labelsStale = true;
  }
  const clampDist = (d) => Math.min(fitDist * 2.5, Math.max(fitDist * 0.16, d));
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  function flyTo(target, dist) {
    if (reduce) {
      cam.target.copy(target);
      cam.dist = dist;
      dirty = true;
      return;
    }
    anim = { from: { target: cam.target.clone(), dist: cam.dist }, to: { target: target.clone(), dist }, t0: performance.now(), dur: 520 };
  }

  let lastNow = performance.now();
  function updateCamera(now) {
    const dt = Math.min(64, now - lastNow);
    lastNow = now;
    if (anim) {
      const t = Math.min(1, (now - anim.t0) / anim.dur), e = easeOut(t);
      cam.target.lerpVectors(anim.from.target, anim.to.target, e);
      cam.dist = anim.from.dist + (anim.to.dist - anim.from.dist) * e;
      if (t >= 1) anim = null;
      dirty = true;
    }
    if (!reduce && !dragging && sel < 0 && now > idleUntil) {
      cam.theta += 0.00011 * dt; // 한 바퀴 약 95초
      dirty = true;
    }
    const s = Math.sin(cam.phi);
    camera.position.set(
      cam.target.x + cam.dist * s * Math.sin(cam.theta),
      cam.target.y + cam.dist * Math.cos(cam.phi),
      cam.target.z + cam.dist * s * Math.cos(cam.theta)
    );
    camera.lookAt(cam.target);
    camera.setViewOffset(viewW, viewH, 0, -(headerH - (viewW <= 640 ? 40 : 0)) / 2, viewW, viewH);
    camera.updateMatrixWorld();
    shared.uNear.value = cam.dist - ringR * 0.6;
    shared.uFar.value = cam.dist + ringR * 0.95;
    shared.uRef.value = fitDist;
  }

  // ── 화면 투영: 라벨, 피킹, 깊이 정렬이 함께 쓴다 ──
  const sx = new Float32Array(N), sy = new Float32Array(N), sd = new Float32Array(N), sr = new Float32Array(N), sf = new Float32Array(N);
  const tmp = new THREE.Vector3();
  const idx = Array.from(order);
  function project() {
    const near = shared.uNear.value, far = shared.uFar.value;
    for (let i = 0; i < N; i++) {
      tmp.set(P[i * 3], P[i * 3 + 1], P[i * 3 + 2]).applyMatrix4(camera.matrixWorldInverse);
      const depth = -tmp.z;
      sd[i] = depth;
      sf[i] = Math.min(1, Math.max(0, (depth - near) / (far - near)));
      sr[i] = aSize[i] * sizeScale * Math.min(2.2, Math.max(0.55, Math.sqrt(fitDist / Math.max(depth, 1))));
      tmp.applyMatrix4(camera.projectionMatrix);
      sx[i] = (tmp.x * 0.5 + 0.5) * viewW;
      sy[i] = (-tmp.y * 0.5 + 0.5) * viewH;
    }
    idx.sort((a, b) => sd[b] - sd[a]); // 구슬은 먼 것부터 그린다
    order.set(idx);
    geo.index.needsUpdate = true;
  }

  // ── 라벨. 깜박임을 막는 세 가지: 고르기는 250ms마다(또는 상태가 바뀔 때만), 이미 보이는 라벨에 가산점,
  //    노드마다 고정 요소라 글자가 다른 노드로 옮겨 가지 않고 나타남과 사라짐은 CSS opacity 전환이다 ──
  const labelHost = stage.querySelector('.g3d-labels');
  const measure = document.createElement('canvas').getContext('2d');
  const fontDisplay = tok('--font-display', 'sans-serif');
  const labelEls = new Map();
  let shown = new Map(); // i → { left: bool, w, h }
  let labelsStale = true, labelsAt = 0;
  const widthCache = new Map();
  function widthOf(i, size, weight) {
    const key = i * 100 + size;
    if (!widthCache.has(key)) {
      measure.font = `${weight} ${size}px ${fontDisplay}`;
      widthCache.set(key, measure.measureText(trunc(nodes[i].title)).width);
    }
    return widthCache.get(key);
  }
  const labelClass = (i) => {
    const d = nodes[i].degree;
    return i === sel || i === hover ? 'is-focus' : d >= 50 ? 'is-hub' : d >= 15 ? 'is-mid' : '';
  };
  function pickLabels() {
    const k = fitDist / cam.dist;
    const minDeg = k < 0.8 ? 60 : k < 1.4 ? 28 : k < 2.2 ? 12 : 0;
    const cap = viewW <= 640 ? 12 : 36;
    const focusSet = sel >= 0 ? nbrs[sel] : null;
    const card = cardEl.hidden ? null : cardEl.getBoundingClientRect();
    const sRect = stage.getBoundingClientRect();
    const cand = [];
    for (let i = 0; i < N; i++) {
      if (sd[i] < 1 || sx[i] < 0 || sx[i] > viewW || sy[i] < headerH + 8 || sy[i] > viewH - 8) continue;
      let pr = -1;
      if (i === sel) pr = 1e6;
      else if (i === hover) pr = 1e5;
      else if (focusSet) {
        if (focusSet.has(i)) pr = 1e3 + nodes[i].degree * (1 - sf[i] * 0.6);
      } else if (nodes[i].degree >= minDeg && (!filterCat || nodes[i].category === filterCat)) pr = nodes[i].degree * (1 - sf[i] * 0.75);
      if (pr < 0) continue;
      if (shown.has(i)) pr *= 1.6; // 가산점: 이미 보이는 라벨은 쉽게 밀려나지 않는다
      cand.push([pr, i]);
    }
    cand.sort((a, b) => b[0] - a[0]);
    const placed = [];
    if (card) placed.push([card.left - sRect.left - 4, card.top - sRect.top - 4, card.right - sRect.left + 4, card.bottom - sRect.top + 4]);
    const next = new Map();
    for (const [pr, i] of cand) {
      if (next.size >= cap) break;
      const cls = labelClass(i);
      const size = cls === 'is-focus' || cls === 'is-hub' ? 13 : cls === 'is-mid' ? 12 : 11;
      const w = widthOf(i, size, size === 13 ? 700 : 500) + 4, h = size + 4;
      const left = sx[i] + sr[i] + 4 + w > viewW - 4;
      const x = left ? sx[i] - sr[i] - 4 - w : sx[i] + sr[i] + 4, y = sy[i] - h / 2;
      const box = [x - 2, y - 2, x + w + 2, y + h + 2];
      const forced = pr >= 1e5;
      if (!forced && placed.some((b) => box[0] < b[2] && box[2] > b[0] && box[1] < b[3] && box[3] > b[1])) continue;
      placed.push(box);
      next.set(i, { left, w, h, cls });
    }
    for (const i of shown.keys()) if (!next.has(i)) labelEls.get(i).style.opacity = '0';
    shown = next;
    labelsStale = false;
  }
  function drawLabels(now) {
    if (labelsStale || now - labelsAt > 250) {
      pickLabels();
      labelsAt = now;
    }
    for (const [i, L] of shown) {
      let el = labelEls.get(i);
      if (!el) {
        el = document.createElement('div');
        el.className = 'g3d-label';
        el.textContent = trunc(nodes[i].title);
        labelHost.appendChild(el);
        labelEls.set(i, el);
      }
      const cls = 'g3d-label' + (L.cls ? ' ' + L.cls : '');
      if (el.className !== cls) el.className = cls;
      const x = L.left ? sx[i] - sr[i] - 4 - L.w : sx[i] + sr[i] + 4;
      el.style.transform = `translate(${x.toFixed(1)}px, ${(sy[i] - L.h / 2).toFixed(1)}px)`;
      const op = (L.cls === 'is-focus' ? 1 : 1 - sf[i] * 0.7) * Math.min(1, emCur[i] + 0.15) * reveal;
      el.style.opacity = op.toFixed(2);
    }
  }

  // ── 프레임 ──
  let lastFrame = performance.now(), firstFrame = 0;
  const frameLog = [];
  function frame(now) {
    const dt = Math.min(64, now - lastFrame);
    lastFrame = now;
    let moving = targetsChanged;
    targetsChanged = false;
    if (reveal < 1) {
      reveal = reduce ? 1 : Math.min(1, (now - t0) / 700);
      moving = true;
    }
    const step = reduce ? 1 : Math.min(1, dt / 140);
    for (let i = 0; i < N; i++) {
      const d = emTgt[i] - emCur[i];
      if (Math.abs(d) > 0.002) {
        emCur[i] += d * step;
        moving = true;
      } else emCur[i] = emTgt[i];
      aAlpha[i] = emCur[i] * reveal;
    }
    const er = Math.max(0, reveal * 1.6 - 0.6);
    for (let k = 0; k < E; k++) {
      const d = edTgt[k] - edCur[k];
      if (Math.abs(d) > 0.001) {
        edCur[k] += d * step;
        moving = true;
      } else edCur[k] = edTgt[k];
      eAlpha[k * 2] = eAlpha[k * 2 + 1] = edCur[k] * er;
    }
    if (moving) {
      geo.attributes.aAlpha.needsUpdate = edgeGeo.attributes.aAlpha.needsUpdate = true;
      dirty = true;
    }
    updateCamera(now);
    if (dirty) {
      project();
      renderer.render(scene, camera);
      drawLabels(now);
      dirty = false;
      if (!firstFrame) {
        firstFrame = now;
        main.dataset.state = 'ready';
      }
      if (frameLog.length < 600) frameLog.push(now);
    }
    requestAnimationFrame(frame);
  }

  // ── 카드와 툴팁 ──
  const cardEl = stage.querySelector('.g3d-card');
  const tip = stage.querySelector('.g3d-tip');
  const pageUrl = (n) => base + n.id + '/';
  function select(i) {
    sel = i;
    hover = -1;
    tip.hidden = true;
    if (i < 0) {
      if (cardEl.contains(document.activeElement)) canvas.focus({ preventScroll: true });
      cardEl.hidden = true;
      recolorEdges();
      computeTargets();
      flyTo(new THREE.Vector3(), fitDist);
      idleUntil = performance.now() + 4000;
      return;
    }
    const n = nodes[i];
    cardEl.querySelector('.g3d-card-cat').dataset.cat = n.category;
    cardEl.querySelector('.g3d-card-catname').textContent = catName[n.category] || n.category;
    cardEl.querySelector('.g3d-card-title').textContent = n.title;
    cardEl.querySelector('.g3d-card-meta').textContent = [n.year, n.type, `연결 ${nbrs[i].size}`].filter(Boolean).join('  ');
    cardEl.querySelector('.g3d-open').href = pageUrl(n);
    cardEl.querySelector('.g3d-2d').href = graph2d + '#node=' + n.id.split('/').map(encodeURIComponent).join('/'); // 02 8.4절 encId 와 같은 결과
    cardEl.hidden = false;
    recolorEdges();
    computeTargets();
    // 이웃이 다 들어오는 거리로 다가간다
    const p = new THREE.Vector3(P[i * 3], P[i * 3 + 1], P[i * 3 + 2]);
    let spread = 0;
    nbrs[i].forEach((j) => (spread = Math.max(spread, Math.hypot(P[j * 3] - p.x, P[j * 3 + 1] - p.y, P[j * 3 + 2] - p.z))));
    const vf = (camera.fov * Math.PI) / 180;
    flyTo(p, Math.min(fitDist * 0.85, Math.max(fitDist * 0.32, (spread * 1.05) / Math.sin(vf / 2))));
  }
  cardEl.querySelector('.g3d-card-close').addEventListener('click', () => select(-1));
  function showTip(i, x, y) {
    if (i < 0) {
      tip.hidden = true;
      return;
    }
    const n = nodes[i];
    tip.innerHTML = `<div class="graph-tip-title">${esc(n.title)}</div><div class="graph-tip-meta" data-cat="${esc(n.category)}"><span class="graph-swatch" aria-hidden="true"></span>${esc(catName[n.category] || n.category)}<span>연결 ${nbrs[i].size}</span></div>`;
    tip.hidden = false;
    const w = tip.offsetWidth, h = tip.offsetHeight;
    tip.style.transform = `translate(${x + 14 + w > viewW ? x - 14 - w : x + 14}px, ${y + 14 + h > viewH ? y - 14 - h : y + 14}px)`;
  }

  // ── 범례: 카테고리 하나 강조 (켜고 끄기만) ──
  const legendItems = stage.querySelectorAll('.graph-legend-item');
  stage.querySelector('.g3d-legend').addEventListener('click', (e) => {
    const b = e.target.closest('.graph-legend-item');
    if (!b) return;
    filterCat = filterCat === b.dataset.cat ? null : b.dataset.cat;
    legendItems.forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.cat === filterCat)));
    computeTargets();
  });

  // ── 피킹. 시안 E 는 맞은 것 가운데 가장 앞쪽을 골라 큰 노드 위의 작은 점이 잡혔다.
  //    여기서는 구슬 안에 든 것 가운데 화면 반지름이 가장 큰 것, 없으면 여유 안에서 가장자리가 가장 가까운 것 ──
  function hitTest(x, y, touch) {
    const slop = touch ? 16 : 5;
    let direct = -1, directR = -1, near = -1, nearGap = Infinity;
    for (let i = 0; i < N; i++) {
      if (sd[i] < 1) continue;
      const d = Math.hypot(sx[i] - x, sy[i] - y), r = Math.max(sr[i], 3);
      if (d <= r + 1.5) {
        if (r > directR) {
          direct = i;
          directR = r;
        }
      } else if (d <= r + slop && d - r < nearGap) {
        near = i;
        nearGap = d - r;
      }
    }
    return direct >= 0 ? direct : near;
  }

  // ── 포인터: 한 손가락 회전, 두 손가락 핀치, 탭 선택 ──
  const ptrs = new Map();
  let downAt = null, pinch0 = 0, dist0 = 0;
  const local = (e) => {
    const r = stage.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };
  canvas.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    canvas.setPointerCapture(e.pointerId);
    ptrs.set(e.pointerId, local(e));
    anim = null;
    idleUntil = Infinity;
    if (ptrs.size === 1) downAt = { p: local(e), t: performance.now(), moved: 0 };
    if (ptrs.size === 2) {
      const [a, b] = [...ptrs.values()];
      pinch0 = Math.hypot(a[0] - b[0], a[1] - b[1]);
      dist0 = cam.dist;
      downAt = null;
    }
  });
  canvas.addEventListener('pointermove', (e) => {
    const p = local(e);
    if (!ptrs.has(e.pointerId)) {
      if (e.pointerType !== 'mouse') return;
      const h = hitTest(p[0], p[1], false);
      if (h !== hover) {
        hover = h;
        if (sel < 0) recolorEdges();
        computeTargets();
      }
      stage.classList.toggle('is-over', h >= 0);
      showTip(h, p[0], p[1]);
      return;
    }
    const prev = ptrs.get(e.pointerId);
    ptrs.set(e.pointerId, p);
    if (ptrs.size === 1) {
      const dx = p[0] - prev[0], dy = p[1] - prev[1];
      if (downAt) downAt.moved += Math.abs(dx) + Math.abs(dy);
      if (!downAt || downAt.moved > 6) {
        dragging = true;
        stage.classList.add('is-dragging');
        cam.theta -= dx * 0.006;
        cam.phi = Math.min(Math.PI - 0.05, Math.max(0.05, cam.phi - dy * 0.006));
        tip.hidden = true;
        dirty = true;
      }
    } else if (ptrs.size === 2) {
      const [a, b] = [...ptrs.values()];
      cam.dist = clampDist((dist0 * pinch0) / Math.max(1, Math.hypot(a[0] - b[0], a[1] - b[1])));
      dirty = labelsStale = true;
    }
  });
  function endPtr(e) {
    if (!ptrs.has(e.pointerId)) return;
    ptrs.delete(e.pointerId);
    if (e.type === 'pointerup' && downAt && ptrs.size === 0 && downAt.moved <= 6 && performance.now() - downAt.t < 600) {
      const p = local(e), h = hitTest(p[0], p[1], e.pointerType !== 'mouse');
      if (h >= 0) select(h);
      else if (sel >= 0) select(-1);
    }
    if (ptrs.size === 0) {
      downAt = null;
      dragging = false;
      stage.classList.remove('is-dragging');
      idleUntil = performance.now() + 6000; // 손을 떼고 6초 뒤 다시 천천히 돈다
    }
  }
  canvas.addEventListener('pointerup', endPtr);
  canvas.addEventListener('pointercancel', endPtr);
  canvas.addEventListener('pointerleave', (e) => {
    if (e.pointerType !== 'mouse' || ptrs.size) return;
    hover = -1;
    if (sel < 0) recolorEdges();
    computeTargets();
    tip.hidden = true;
    stage.classList.remove('is-over');
  });
  canvas.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      anim = null;
      idleUntil = performance.now() + 6000;
      cam.dist = clampDist(cam.dist * Math.exp(e.deltaY * 0.0012));
      dirty = labelsStale = true;
    },
    { passive: false }
  );
  // iOS Safari 의 페이지 핀치 확대를 무대에서 막는다 (2D 와 같다)
  stage.addEventListener('gesturestart', (e) => e.preventDefault());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sel >= 0) select(-1);
  });
  reduceMq.addEventListener?.('change', () => {
    reduce = reduceMq.matches;
    if (reduce) anim = null;
  });

  new ResizeObserver(resize).observe(stage);
  resize();
  cam.dist = fitDist;
  recolorEdges();
  computeTargets(true);
  // 검증 스크립트용 (scratchpad/3d). 화면 좌표와 첫 프레임 시각을 읽는다
  window.__g3d = { nodes, sx, sy, sr, sd, cam, frameLog, get firstFrame() { return firstFrame; }, get sel() { return sel; }, hitTest, select };
  requestAnimationFrame(frame);
  document.fonts?.ready.then(() => {
    widthCache.clear();
    labelsStale = dirty = true;
  });
}
