# 05. 외부 라이브러리 사용 여부와 후보

작성일 2026-11-17. `docs/graph-design-plan.md` 9절 Phase 2의 "외부 라이브러리 사용 여부와 후보 확정" 항목이다. 근거는 확정 시안 F(`docs/graph-mockups/f-atlas-orbit.html`), 시안 E(`e-celestial.html`), npm 레지스트리 조회와 tarball 실측이다. 웹 검색은 쓰지 않았다.

## 1. 결정 요약

| 대상 | 결정 |
|---|---|
| 본 페이지 `/graph/` 성도 배치 | d3-force 3.0.0을 쓰되 **브라우저가 아니라 빌드(Node)에서 돌린다**. 좌표를 `graph.json` 에 싣고(필드는 03 3.2절 `xy`) 런타임 라이브러리는 0개다 |
| d3-force 와 의존 모듈 | `site/package.json` `devDependencies` 에 정확한 버전으로 고정한다 (d3-force 3.0.0, d3-dispatch 3.0.1, d3-quadtree 3.0.1, d3-timer 3.0.1). `static/` 에는 복사하지 않는다 |
| B 궤도 배치, 전환, 줌과 팬, 핀치, 히트 테스트, 검색 | 시안 F처럼 직접 구현한다. d3-zoom 등 추가 라이브러리는 들이지 않는다 |
| E 천구 실험 페이지 | 경로 `/graph/3d/`. three 0.169.0 의 `build/three.module.min.js` 한 파일을 npm 에서 받아 `dist/static/vendor/three/` 에 복사하고 그 페이지에서만 ES module 로 싣는다. 3D 배치도 빌드에서 미리 계산한다. Phase 5 마지막 항목으로 둔다 |
| 대안 (런타임 로드) | 사용자가 빌드 사전 계산을 거부하면 4절 B의 절차로 d3 UMD 네 파일을 `dist/static/vendor/d3/` 에 두고 `<script defer>` 로 싣는다. 절차는 미리 확정해 둔다 |

## 2. 본 페이지 배치: 세 안 비교

시안 F는 d3-force 를 애니메이션에 쓰지 않는다. `forceSimulation(...).stop()` 뒤에 `tick()` 을 360번 동기로 돌려 성도 좌표(home)를 한 번 만들고, 이후 그리기와 B 궤도 전환은 모두 자체 코드다. 쓰는 API는 `forceSimulation`, `forceManyBody`, `forceLink`, `forceX`, `forceY`, `forceCollide` 여섯 개뿐이다. 초기 위치는 자체 LCG(seed 7)로 정하고, d3-force 3 의 jiggle 도 내장 LCG를 쓰므로 결과가 결정적이다. 따라서 같은 계산을 빌드에서 해도 화면은 같다.

실측 (Apple M5, Node 24.18.0, 시안 데이터 344노드 2,600엣지, 시안 F의 배치 코드를 그대로 옮긴 스크래치 스크립트):

| 항목 | 값 |
|---|---|
| 360 tick 소요 (가로 화면 닻 / 세로 화면 닻) | 305ms / 286ms (ESM `src/`), 498ms (UMD min 을 `vm` 에서 실행) |
| 두 번 실행한 좌표 일치 | 일치 (비트 단위) |
| ESM `src/` 와 UMD `dist/*.min.js` 결과 일치 | 일치 (비트 단위) |
| 좌표 필드 크기 (소수 1자리, 두 배치 합. 채택하지 않은 형태) | 원본 9,718B, gzip 3,725B |
| 좌표 필드 크기 (정수, 가로 한 벌 `xy`. 03 채택) | 전체 파일에 더한 증가분 원본 +5,355B, gzip +2,468B (03 1.1절) |
| 현재 `dist/graph.json` (2026-11-14 빌드) | 원본 482,615B, gzip 41,072B |

| 안 | 내용 | 브라우저 전송량 (gzip) | 첫 화면 전 주 스레드 | 오프라인과 실패 | 비용과 위험 |
|---|---|---|---|---|---|
| A. 런타임 d3-force | UMD 네 파일을 `static/` 에 두고 시안 F 그대로 브라우저에서 360 tick | +약 7.0KB (스크립트 4개, 요청 4건) | 데스크톱 약 300ms (4절 시안 A 관찰과 같은 크기). 휴대폰은 미확인이나 더 길다 | 스크립트 하나라도 실패하면 텍스트 목록 대체 | 시안 그대로라 구현이 가장 쉽다. 브라우저 엔진마다 `Math.cos` 결과가 다르면 배치가 미세하게 달라질 수 있다 (미확인) |
| B. 직접 구현 force | Barnes-Hut many-body, link, collide 를 자체 코드로 | 직접 짠 코드만큼 (약 200 ~ 300줄 추정) | A와 비슷하거나 느림 | 대체 조건은 A와 같음 | 검증된 라이브러리를 다시 만드는 일이다. 시안 F의 배치를 재현하려면 d3 내부 동작(속도 감쇠, alpha 감소)까지 맞춰야 한다. 이득이 없다 |
| **C. 빌드 사전 계산 (채택)** | `build.mjs` 가 d3-force 로 좌표를 계산해 `graph.json` 노드에 싣는다 | +약 2.5KB (정수 좌표 한 벌, 03 1.1절), 추가 요청 0건 | 0ms (좌표를 읽기만 한다) | 라이브러리 로드 실패라는 경우 자체가 없다. `graph.json` 실패만 남는다 | 빌드가 약 0.3초 늘어난다 (04 1.1절). 배치 파라미터를 바꾸면 다시 빌드해야 한다 |

C를 택하는 이유는 세 가지다. 휴대폰에서 가장 무거운 첫 화면 비용(배치 계산)이 사라진다. 런타임 의존이 0이라 3절의 "스크립트 실패 시 텍스트 목록" 조건이 단순해진다. 좌표가 빌드마다 같아 브라우저 사이 차이도 생기지 않는다.

C에서 지켜야 할 것:

- 시안 F는 `innerWidth < innerHeight * 0.8` 이면 닻 좌표를 전치해 세로 화면용 배치를 따로 만든다. 사이트는 가로 배치 한 벌만 굽고 세로 화면에서 런타임에 x, y를 맞바꾼다 (04 3.4절, 03 4.1절). 회전 때의 처리도 04 3.4절을 따른다.
- 좌표는 정수로 반올림해 `xy: [x, y]` 에 싣는다 (03 3.2절). 정수 반올림 뒤에도 world 겹친 쌍이 0이다 (04 1.6절, 03 1절). 처음 이 문서는 소수 1자리와 두 벌(`xy`, `xyp`)을 적었으나 03에서 04 안으로 정했다.
- 배치 파라미터(닻, SUB 오프셋, 힘 세기, tick 수)는 "배치 알고리즘 결정" 항목의 몫이다. 이 문서는 어디서 돌리는지만 정한다.

## 3. 패키지 실측

`npm view` 와 `npm pack` 으로 받은 tarball 을 스크래치 디렉토리에서 풀어 쟀다. gzip 은 `gzip -9` 결과다.

| 패키지 | 고정 버전 | 게시일 | `dist/*.min.js` UMD | 원본 | gzip | 전역 | 라이선스 | 로드 순서 (안 A일 때) |
|---|---|---|---|---|---|---|---|---|
| d3-dispatch | 3.0.1 | 2021-06-05 | 있음 (`d3-dispatch.min.js`) | 1,901B | 932B | `window.d3` 에 병합 | ISC | 1 |
| d3-quadtree | 3.0.1 | 2021-06-05 | 있음 (`d3-quadtree.min.js`) | 5,279B | 2,130B | `window.d3` 에 병합 | ISC | 2 |
| d3-timer | 3.0.1 | 2021-06-05 | 있음 (`d3-timer.min.js`) | 1,947B | 973B | `window.d3` 에 병합 | ISC | 3 |
| d3-force | 3.0.0 | 2021-06-05 | 있음 (`d3-force.min.js`) | 8,300B | 3,007B | `window.d3` 에 병합 | ISC | 4 |
| 합계 (d3) | | | | 17,427B | 7,042B | | | |
| three | 0.169.0 | 2024-09-26 | 없음. ES module `build/three.module.min.js` (import 없는 단일 파일) | 687,458B | 169,752B | 없음 (`import * as THREE`) | MIT | E 실험 페이지 전용 |

- d3 네 패키지의 UMD 는 `(globalThis || self).d3 = t.d3 || {}` 형태로 같은 `d3` 객체에 이어 붙인다. d3-force UMD 는 `d3.quadtree`, `d3.dispatch`, `d3.timer` 를 전역에서 찾으므로 d3-force 가 마지막이어야 한다. 앞의 셋끼리는 서로 의존하지 않는다.
- 패키지의 `exports` 에 `"umd": "./dist/<name>.min.js"` 가 선언돼 있다. 빌드는 `require.resolve` 가 아니라 `node_modules/<pkg>/dist/<file>` 경로를 직접 조합하므로(폰트, KaTeX 와 같은 방식) `exports` 제한에 걸리지 않는다.
- 빌드(Node)에서는 d3-force 3.0.0 의 `src/index.js` (ESM, `"type": "module"`) 를 `import { forceSimulation, ... } from 'd3-force'` 로 쓴다. `site/package.json` 도 `"type": "module"` 이라 그대로 맞는다.

### 최신 버전을 쓰지 않는 이유

2026-11-03 에 d3-force 3.0.1, d3-dispatch/d3-quadtree/d3-timer 3.0.2 가 5년 만에 새로 게시됐다 (게시자 `GitHubActions`, 메인테이너는 이전과 같은 mbostock, recifs). d3-force 3.0.0 과 3.0.1 의 `package.json` 차이는 빌드 도구 교체(rollup 4, vitest)와 `dist/*.mjs` 추가뿐이고 `src/` 가 tarball 에서 빠졌다. 기능 차이는 확인하지 못했고 얻을 것도 없다. 게시 2주 남짓이라 시안 F가 검증한 3.0.0 계열에 머문다.

d3-force 의 의존 범위는 `"1 - 3"` 이라 범위 지정(`^`)으로 두면 3.0.2 가 들어온다. 네 패키지를 모두 최상위 `devDependencies` 에 정확한 버전으로 적으면 npm 이 그 버전 하나로 합친다. 스크래치에서 `npm install --save-exact d3-force@3.0.0 d3-dispatch@3.0.1 d3-quadtree@3.0.1 d3-timer@3.0.1` 을 돌려 lockfile 에 네 패키지가 각각 한 벌만 잡히는 것을 확인했다.

three 의 최신은 0.187.0 (2026-10-30) 이다. 시안 E가 0.169.0 으로 검증됐으므로 그대로 고정한다.

## 4. 빌드 반영 절차

### A. 채택안 (빌드 사전 계산)

1. `site/package.json` `devDependencies` 에 추가한다. 다른 항목은 `^` 를 쓰지만 이 넷은 위 이유로 정확한 버전이다.

   ```json
   "d3-dispatch": "3.0.1",
   "d3-force": "3.0.0",
   "d3-quadtree": "3.0.1",
   "d3-timer": "3.0.1"
   ```

   d3-force 만 import 하지만 의존 셋을 함께 적어야 버전이 고정된다. 빌드 전용이므로 `dependencies` 가 아니라 `devDependencies` 다 (폰트와 pagefind 와 같은 자리).

2. 새 파일 `site/lib/graph-layout.mjs` 에 `layoutAtlas(graph)` 를 둔다. 시안 F 443 ~ 495행의 닻 지정, 초기 위치, 힘 설정, 360 tick 을 옮기고 (변경점은 04 2절) 가로 배치 한 벌을 계산해 각 노드의 정수 `xy: [x, y]` 를 만든다 (03 3.2절). 이 계산에 필요한 `degree`, `category`, `tags`, 이웃 목록은 Phase 3 에서 `graph.json` 에 들어가는 값으로 충분하다.

3. `site/build.mjs` 3단계 `const graph = buildGraph(pages, resolveLink);` 바로 다음, `graph.json` 을 쓰기 전에 `layoutAtlas(graph)` 를 부른다. 소요 시간을 `[build] graph layout NNNms` 로 한 줄 찍는다.

4. `graphPage` 의 스크립트는 지금과 같다: `scripts: ['/static/js/graph-core.js', '/static/js/graph-explorer.js']`. 둘 다 `layout()` 이 `<script src defer>` 로 문서 순서대로 싣는다. vendor 스크립트는 없다.

5. 텍스트 목록 대체로 떨어지는 조건. 서버는 `main.graph` 를 `data-view="list"` 로 내보내고 탐색기가 성공해야 `map` 으로 바꾸므로 (01 2.3절), 아래 어느 경우든 카테고리별 목록만 남는다.
   - 스크립트가 꺼져 있거나 `graph-core.js`, `graph-explorer.js` 로드 실패
   - `graph.json` fetch 실패, JSON 파싱 실패
   - `version` 이 2가 아니거나 노드 중 하나라도 `xy` 가 없음 (스키마 불일치. 콘솔 경고 한 줄, 03 5.3절)
   - 캔버스 2D context 를 얻지 못함
   - 초기화 중 예외 (시안 F처럼 `try { main() } catch` 로 감싼다)

6. 홈 히어로 `constellation.js` 는 `graph.json` 의 새 노드 필드를 무시한다 (03 5.1절에서 코드로 확인). 다만 03이 엣지를 `links` 인덱스 배열로 바꾸므로 히어로의 엣지 루프와 `graph-core.js` `buildAdjacency` 를 Phase 3에서 함께 고친다 (03 5.2절, 미결 D1).

### B. 대안 (런타임 로드, 채택하지 않음)

사용자가 C를 거부할 때만 쓴다.

1. 위 1과 같이 네 패키지를 정확한 버전으로 넣는다 (`devDependencies`, 폰트와 같은 자리).
2. `build.mjs` `copyStatic()` 에 (D) 절을 더해 아래를 복사한다. 없으면 기존 WARN 형식으로 경고한다.

   | 원본 (`site/node_modules/`) | 사본 (`dist/static/vendor/d3/`) |
   |---|---|
   | `d3-dispatch/dist/d3-dispatch.min.js` | `d3-dispatch.min.js` |
   | `d3-quadtree/dist/d3-quadtree.min.js` | `d3-quadtree.min.js` |
   | `d3-timer/dist/d3-timer.min.js` | `d3-timer.min.js` |
   | `d3-force/dist/d3-force.min.js` | `d3-force.min.js` |
   | 각 패키지의 `LICENSE` | `LICENSE-d3-dispatch.txt` 등 네 개 |

3. `graphPage` 의 `scripts` 순서: `/static/vendor/d3/d3-dispatch.min.js`, `/static/vendor/d3/d3-quadtree.min.js`, `/static/vendor/d3/d3-timer.min.js`, `/static/vendor/d3/d3-force.min.js`, `/static/js/graph-core.js`, `/static/js/graph-explorer.js`. `defer` 스크립트는 문서 순서대로 실행되므로 의존 순서가 지켜진다. `href()` 가 `BASE=/ai-wiki` 를 붙인다.
4. 대체 조건은 A의 5에 "`window.d3 && d3.forceSimulation` 이 없음"을 더한다 (시안 F 399행과 같은 검사).

### 라이선스 고지

| 경우 | 의무 | 방법 |
|---|---|---|
| 채택안 C | d3 코드가 사이트에 배포되지 않는다. 빌드가 만든 좌표만 나간다 | 고지 의무 없음. `site/package.json` 과 lockfile 에 출처가 남는다 |
| 대안 B | ISC 는 사본에 저작권 표시와 허가 문구를 요구한다 | min 파일 첫 줄 배너(`// https://d3js.org/d3-force/ v3.0.0 Copyright 2010-2021 Mike Bostock`)는 허가 문구가 없으므로 `LICENSE-*.txt` 네 개를 함께 복사한다 |
| three (E 실험) | MIT 는 사본에 저작권 표시와 허가 문구를 요구한다 | `three.module.min.js` 머리의 `@license` 주석을 지우지 않고, `LICENSE` 를 `dist/static/vendor/three/LICENSE.txt` 로 함께 복사한다 |

## 5. 줌, 팬, 히트 테스트, 검색

추가 라이브러리는 필요 없다. 시안 F가 모두 직접 구현했고 69항목 교차 엔진 검증을 통과했다.

| 기능 | 시안 F의 구현 | 라이브러리 판단 |
|---|---|---|
| 줌 | `wheel` 리스너 (`passive: false`), 지수 배율, 커서 기준 `camFor`, k 0.20 ~ 6.00 | d3-zoom 불필요. d3-zoom 은 d3-selection, d3-transition 등을 끌고 와 의존이 늘어난다 |
| 팬과 핀치 | Pointer Events (`pointerdown/move/up/cancel`), 두 포인터 거리로 핀치 | 직접 구현 유지 |
| 카메라 비행, 전환 | 자체 `ease`, `easeIO`, `requestAnimationFrame` | d3-ease, d3-timer 불필요 |
| 히트 테스트 | 344노드 선형 탐색 `hitTest`, 화면 좌표 거리에서 반지름을 뺀 값 | d3-quadtree 불필요. 노드가 수천 개로 늘면 그때 재검토 (현재 344개) |
| 검색 | 제목과 stem 의 `indexOf` 부분 일치 | 퍼지 검색 라이브러리 불필요 |

## 6. E 천구 실험 페이지

시안 E는 3D force 라이브러리를 쓰지 않는다. `three` 하나만 import 하고 (addons 없음), 배치는 자체 O(N²) 코드 320회 반복(약 630ms 동기)이다. 그래서 들일 것은 three 한 파일이다.

| 항목 | 결정 |
|---|---|
| 경로 | `/graph/3d/` (`dist/graph/3d/index.html`). 본 페이지의 진입점은 목록 판 머리 링크와 데스크톱 도구 묶음 끝 "3D" 링크 두 곳이다 (06 6절, 01 5.6절. 01이 그래프 페이지 자체 상단 바를 없앴다) |
| 패키지 | `three` `0.169.0` 정확한 버전, `devDependencies` (폰트와 같은 자리. 런타임 코드지만 빌드가 `static/` 으로 복사하는 자산이라는 점이 폰트와 같다) |
| 복사 | `node_modules/three/build/three.module.min.js` → `dist/static/vendor/three/three.module.min.js`, `node_modules/three/LICENSE` → `dist/static/vendor/three/LICENSE.txt` |
| 크기 | 687,458B, gzip 169,752B. 본 페이지 전체 전송량보다 크다 |
| 로드 방식 | 실험 페이지 본문 끝에 `<script type="module" src="${href('/static/js/graph-3d.js')}"></script>` 를 둔다. `graph-3d.js` 는 `import * as THREE from '../vendor/three/three.module.min.js'` 로 모듈 파일 기준 상대 경로를 쓴다. importmap 이 필요 없고 `BASE` 에 무관하다. module 스크립트는 기본이 지연 실행이라 `defer` 원칙과 어긋나지 않는다. 사이트 전체에서 module 스크립트는 이 페이지 하나다 |
| 본 페이지 격리 | `/graph/` 와 다른 페이지는 three 를 참조하지 않는다. `layout()` 공통 머리에 넣지 않고 `graph3dPage` 본문에만 태그를 둔다. `<link rel="modulepreload">` 도 본 페이지에 두지 않는다 |
| 3D 배치 | 시안 E의 배치 코드도 빌드에서 돌려 `dist/graph/3d/layout.json` (`graph.json` 의 `nodes` 배열 순서와 같은 순서의 `xyz` 평면 배열, 형태는 03 6.2절) 로 따로 낸다. 본 `graph.json` 을 무겁게 하지 않고, 실험 페이지의 630ms 막힘이 사라진다. 이 계산은 라이브러리가 필요 없다 |
| 대체 | 본 페이지와 같이 텍스트 목록이 기본이고, 모듈 로드, WebGL context, `layout.json` fetch 가 모두 성공해야 캔버스를 드러낸다. 시안 E에 이미 `.cel-fallback` 이 있다 |
| 넣을 단계 | Phase 5 마지막 항목. Phase 5 네 기능처럼 본체와 독립이고, 본 페이지(Phase 4)가 끝난 뒤 공용 팔레트와 `graph-core.js` 를 그대로 쓸 수 있다. 검증은 Phase 6 에 "`/graph/` 가 three 를 요청하지 않음" 한 줄을 더한다 |

## 7. 미결 사항

사용자가 정할 것만 적는다.

1. **배치를 빌드에서 계산하는가 (2절 C), 브라우저에서 계산하는가 (2절 A)**. 추천은 C다. C는 휴대폰 첫 화면 비용과 런타임 의존을 없앤다. A는 시안 F 코드를 그대로 옮길 수 있어 Phase 4 초기 작업이 조금 쉽고, 배치 파라미터를 브라우저에서 바로 바꿔 볼 수 있다.
2. **E 실험 페이지를 Phase 5 에 넣는가, Phase 7 뒤로 미루는가**. 추천은 Phase 5 마지막 항목이다. 미루면 three 의존과 170KB 자산이 이번 작업에서 아예 빠진다.
3. **three 버전**. 추천은 시안 E가 검증한 0.169.0 고정이다. 최신 0.187.0 으로 올리면 시안 E 셰이더와 `ColorManagement` 동작을 다시 확인해야 한다.

## 8. 개선 제안

- 네 d3 패키지와 three 를 정확한 버전으로 고정하는 이유(2026-11-03 재게시)를 `site/package.json` 옆 주석으로는 남길 수 없으므로 `build.mjs` 의 `graph-layout` 호출부 한 줄 주석으로 남긴다.
- `graph-layout.mjs` 에 자체 점검을 하나 둔다: 모든 노드에 유한한 정수 `xy` 가 있고 두 노드가 겹치지 않는지. Phase 3 의 `graph.mjs` 자체 점검에 합친다 (03 7절 V10, V11).
- 빌드 사전 계산을 택하면 Phase 5 페이지별 미니 그래프도 같은 좌표를 재사용하거나 1-hop 방사형 배치를 자체 코드로 그릴 수 있어 라이브러리가 필요 없다.
- 배치 결과가 결정적이므로 Phase 6 에 "빌드 두 번의 `graph.json` 좌표가 같다" 검사를 넣으면 배치 회귀를 값싸게 잡는다.

## 9. 확인하지 못한 것

- 휴대폰 CPU에서의 360 tick 소요 시간. 데스크톱 Node 305ms, 시안 A 관찰 약 300ms 만 있다.
- 브라우저 엔진 사이 배치 좌표 차이. `Math.cos`, `Math.sin` 의 마지막 자리 차이로 생길 수 있다는 추정이며 측정하지 않았다. 채택안 C에서는 문제가 되지 않는다.
- d3-force 3.0.1 과 3.0.0 의 동작 차이. 3.0.1 tarball 에 `src/` 가 없어 소스 비교를 하지 않았다.
- 좌표 필드를 붙인 뒤 실제 `graph.json` 전체의 gzip 증가분. 좌표 필드 단독 gzip 3,725B 만 쟀다. (03 1.1절이 채택 형태로 스크래치에서 쟀다: gzip +2,468B. 사이트 빌드 산출물로는 Phase 3에서 잰다)
- 시안 E 배치 코드를 Node 로 옮겼을 때의 소요 시간과 `layout.json` 크기.

## 개정 기록

| 날짜 | 고친 곳 | 내용 |
|---|---|---|
| 2026-11-17 | 1절, 2절, 4절 A-2, 8절, 9절 | 좌표를 03 4.1절 결정(04 안)에 맞췄다. 두 벌 `xy`, `xyp` 소수 1자리를 가로 한 벌 정수 `xy` 와 런타임 전치로 바꾸고 크기와 빌드 시간을 고쳤다 |
| 2026-11-17 | 4절 A-5 | 목록 대체 조건을 `.graph-explorer hidden` 대신 01 2.3절 `data-view="list"` 방식과 03 `version` 검사로 고쳤다 |
| 2026-11-17 | 4절 A-6 | 홈 히어로 영향: 새 노드 필드는 무시되지만 `links` 때문에 두 함수를 고친다 (03 5.2절) |
| 2026-11-17 | 6절 | 3D 진입점을 "본 페이지 상단" 에서 06 6절의 두 곳으로. `layout.json` 노드 순서를 `graph.json` `nodes` 배열 순서로 확정 (03 6.2절) |
