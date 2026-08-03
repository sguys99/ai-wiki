# AI Wiki — Physical AI 도입 및 사이트 업그레이드 계획

지금 wiki에 쌓인 121개 페이지는 전부 LLM 소프트웨어 쪽이다. RAG, 에이전트 하네스, 평가 프레임워크. `robot`·`embodied`·`VLA`·`sim2real` 키워드로 `wiki/`와 `sources/`를 전수 조사했지만 실제 physical AI 자료는 0건이었다. 히트한 것들은 "구체화"의 체화, NYT 기자 이름 Isaac, BRIGHT 벤치마크의 Robotics 스플릿 같은 오탐이다. 유일하게 인접한 페이지가 `wiki/llms/cai-2026-vlm3-vision-language-models.md` 하나다.

physical AI를 본격적으로 공부하면 이 저장소는 성격이 다른 두 도메인을 담게 된다. 카테고리를 한 줄 추가하는 것으로는 부족하고 분류 규칙·태그 어휘·사이트의 시각 체계가 두 도메인을 구분할 수 있어야 한다. 목표는 셋이다. 자료가 들어오기 전에 분류 뼈대를 세워 두는 것, 홈에서 두 도메인이 눈으로 구분되게 하는 것, 자료가 늘었을 때 길을 찾을 네비게이션(태그·그래프·학습 경로)을 미리 깔아 두는 것.

원본 콘텐츠는 단일 소스로 유지하며 사이트는 읽기 전용 렌더러라는 원칙은 그대로다.

---

## 사전 조사에서 확인한 사실

- 카테고리는 사이트 코드에 하드코딩돼 있지 않다. `index.md`의 `## Label (slug)` 헤더가 유일한 등록처이고(`site/lib/content.mjs:23`의 `SECTION_RE`), 홈 밴드 순서도 파일 순서 그대로다(`content.mjs:156`).
- 슬러그 정규식이 `[a-z0-9-]+`이라 `physical-ai`는 파서 수정 없이 통과한다.
- 사이트 코드에서 카테고리 목록을 문자로 적어 둔 곳은 `site/lib/about.mjs:67` 한 줄뿐이다.
- 페이지가 0개인 섹션은 홈·필터·통계에서 통째로 걸러진다(`site/lib/templates.mjs:162`, `site/build.mjs:130`).
- 밴드에 `id="{slug}"`와 `data-band="{slug}"`가 이미 붙어 있어(`templates.mjs:203`) 도메인 스타일 훅으로 바로 쓸 수 있다.
- `DESIGN.md`가 "두 번째 강조색을 넣지 말 것 — 아쿠아가 강조 체계 전부"를 금지 항목으로 적어 뒀다. 도메인 색 분리는 이 문서를 고쳐야 정당해진다.
- 태그가 655종 쌓였는데 카드에 앞의 2개만 칩으로 나오고 인덱스도 필터도 없다(`templates.mjs:139-142`).
- 기존 드리프트: `wiki/database/`의 `lumer-2025-rethinking-retrieval-from-traditional-retrieval`, `sguys99-langchain-study-vectorless-rag` 2건이 `index.md`에 빠져 있다.

---

## 확정된 결정 사항

| 항목 | 결정 |
|---|---|
| 분류 구조 | 단일 `physical-ai` 카테고리 + 통제된 태그로 세분화. 하위 폴더·사전 분할 없음 |
| 분할 트리거 | `wiki/physical-ai/`가 40페이지를 넘으면 분할 재검토 (CLAUDE.md에 명시) |
| 시딩 | 실제 자료 ingest로 채운다. 그전까지는 `.gitkeep` + 홈에 "준비 중" 밴드 |
| index.md 위치 | `## LLMs (llms)` 바로 다음, `## Agents (agents)` 앞 |
| 디자인 방향 | 도메인 2색. 아쿠아 유지, physical 도메인만 `[data-domain]` 스코프로 `--signal` 오버라이드 |
| 추가 기능 | 태그 인덱스·필터 / 학습 경로(Study Path) / 전체 그래프 페이지 |
| raw 유형 | 신규 추가 없음. 시뮬레이터·데이터셋은 `repos`, 코스는 `lectures`로 흡수 |
| 미채택 | index.md 드리프트 CI 강제(경고 유지), 전면 리디자인, 하위 폴더 중첩 |

**작업 제약**: 커밋·푸시는 명시적 지시를 받고 한다. 새로 쓰는 한글 산문(`index.md` 설명문, wiki 본문, CLAUDE.md 추가분)은 `humanize-korean`을 거친다.

---

## 설계

### 1. 분류 체계 — 한 카테고리, 태그로 나눈다

`wiki/physical-ai/` 하나만 만들고 세부 주제는 태그로 가른다. 지금 자료가 0개라 경계를 미리 그으면 오분류만 생긴다. 태그는 나중에 폴더로 승격하기 쉬운 형태라 되돌릴 여지도 남는다.

**통제 어휘 (canonical tags)** — 모든 physical-ai 페이지는 도메인 루트 태그 `physical-ai`를 달고, 아래에서 1~3개를 고른다.

```
vla · world-model · robot-learning · imitation-learning · rl-control
manipulation · locomotion · humanoid · mobile-robot · autonomous-driving · drone
sim2real · simulator · 3d-perception · spatial-reasoning · slam · teleoperation
robot-dataset · benchmark · edge-inference · hardware · safety
```

기존 태그 풀에 `graph-rag`/`graphrag`처럼 표기가 갈린 사례가 있으니 이 목록은 한 가지 표기만 허용한다. 목록은 CLAUDE.md에 표로 넣고, 새 태그를 쓸 때는 목록에 먼저 추가한다.

**분류 판단 규칙** — CLAUDE.md의 "방법 기준 분류" 원칙을 physical AI에 맞게 구체화한다.

> 방법의 핵심에 물리 세계와의 상호작용(센서 입력, 액추에이터 출력, 시뮬레이터, 실체 로봇·차량)이 있으면 `physical-ai`. 물리 도메인을 소재로 쓰지만 방법이 순수 언어·검색이면 원래 카테고리를 유지한다.
>
> - RT-2, OpenVLA, Diffusion Policy → `physical-ai`
> - 로봇 매뉴얼 RAG의 검색 성능 평가 → `evaluations`
> - 순수 VLM 아키텍처 논문(VLM3 등) → `llms` 유지, physical-ai 허브에서 상호 링크

### 2. 도메인 2색 — 토큰 오버라이드 하나로 끝낸다

기존 컴포넌트가 전부 `--signal` 토큰을 읽고 있어서 토큰만 스코프별로 바꾸면 카드 보더·호버·칩·캔버스 노드까지 자동으로 따라온다. 새 CSS 컴포넌트를 만들 필요가 없다.

```
core 도메인     database · llms · agents · evaluations · applications · etc · overviews  → aqua (현행)
physical 도메인  physical-ai                                                             → amber (신규)
```

- 신규 모듈 `site/lib/domains.mjs`에 `CATEGORY_DOMAIN` 맵과 `domainOf(category)`를 둔다. 기본값 `'core'`. 카테고리→도메인 매핑을 한 군데로 모은다.
- `site/assets/css/styles.css`의 `@layer tokens`에 `--signal-physical`·`--signal-physical-dim`을 다크·라이트 각각 추가하고 `[data-domain='physical'] { --signal: var(--signal-physical); --signal-dim: var(--signal-physical-dim); }` 한 블록을 둔다.
- 색 후보는 다크 `#F0A868`, 라이트 `#A85B12`. 실제 값은 대비비 측정 후 확정한다(본문 텍스트 4.5:1, UI 보더 3:1).
- 적용 지점은 홈 밴드(`templates.mjs:203`), wiki 페이지 셸(`layout()`에 `page.category` 기반 속성 전달), 홈 필터 칩.
- 헤더·푸터·검색 모달 같은 전역 크롬은 아쿠아를 유지한다. 도메인 색은 콘텐츠 영역에만 써서 "지금 어느 도메인을 보고 있는지"를 알리는 신호로만 남긴다.
- `site/assets/js/constellation.js:15-18`이 `getComputedStyle`로 토큰을 읽는다. `graph.json` 노드에 이미 `category`가 있으므로 두 토큰을 모두 읽어 노드 색을 도메인별로 칠하게 확장한다.

### 3. 빈 카테고리 "준비 중" 상태

자료 0개로 시작하므로 밴드가 홈에서 사라진다. `index.md`에 섹션이 선언돼 있으면 페이지가 없어도 밴드를 렌더하되 카드 그리드 대신 한 줄 안내를 보여준다. `templates.mjs:162`와 `build.mjs:130`의 `filter(s => s.pages.length)`가 "선언됐지만 비어 있음"을 통과시키게 바꾸고, 홈 통계의 페이지 수에서는 뺀다.

`about.mjs:67`의 `[[physical-ai]]` 링크도 이 처리가 있어야 해석된다. 없으면 빌드에 `[about] WARN unresolved links`가 뜬다.

### 4. 태그 인덱스·필터

- 빌드에서 전 페이지 `tags:`를 모아 태그→페이지 맵을 만든다. `slugify`는 `site/lib/markdown.mjs`에 이미 있으니 재사용한다.
- 산출물은 `dist/tags/index.html`(빈도순 태그 클라우드, 도메인별 그룹)과 `dist/tags/{slug}/index.html`(해당 태그 페이지 목록, 기존 `card()` 재사용).
- 카드의 태그 칩과 wiki 페이지 메타의 태그를 태그 페이지로 링크한다. 지금은 링크 없는 장식이다.
- 검색 패싯: wiki 아티클에 `data-pagefind-filter="category"`·`data-pagefind-filter="tag"`를 붙이고 `site/assets/js/search.js`의 결과 위에 카테고리 필터 줄을 추가한다.
- 표시 상한은 카드 칩 2개를 그대로 두고, wiki 페이지 하단에 전체 태그를 노출한다.

### 5. 전체 그래프 페이지

`dist/graph.json`이 이미 나오고 있어 렌더러만 추가하면 된다.

- `dist/graph/index.html` + `site/assets/js/graph-explorer.js`. 헤더 네비에 진입점을 넣는다.
- 노드 색은 도메인 토큰, 크기는 degree. 카테고리 칩 필터는 `site/assets/js/filter.js`의 해시 동기화 패턴을 따른다.
- 클릭하면 해당 wiki 페이지로 이동하고 호버하면 이웃을 강조한다. 히어로 캔버스 로직에서 공통 부분을 뽑아 쓴다.
- 노드 121개에 앞으로의 증가를 더해도 캔버스 2D로 충분하다. 라이브러리를 새로 넣지 않는다(현재 사이트는 무의존 바닐라).

### 6. 학습 경로 (Study Path)

overview 페이지에 읽는 순서를 선언하고 사이트가 단계 UI로 렌더한다. 마크다운 관례보다 frontmatter가 링크 검증에 유리하다.

```yaml
study_path:
  - id: physical-ai/{stem}
    note: "왜 여기서 읽는지 한 줄"
    prereq: ["llms/{stem}"]      # 옵션
```

- `site/lib/content.mjs`에서 파싱하고 기존 `resolve()`로 각 `id`를 해석한다. 깨진 참조는 빌드 콘솔에 리포트한다(기존 broken-link 리포트와 같은 방식, 빌드 실패는 아님).
- `templates.mjs`에 `studyPathSection()`을 추가해 번호가 붙은 단계 목록으로 렌더한다. 단계마다 제목·한 줄 이유·선수 지식 링크.
- Obsidian에서는 frontmatter라 본문에 안 보인다. 그래서 wiki 본문에도 같은 순서를 `## 학습 경로` 섹션의 wikilink 목록으로 한 번 더 쓴다. 사람이 읽는 쪽이 본문, 기계가 읽는 쪽이 frontmatter다.

---

## 단계별 작업 계획 (체크리스트)

### Phase 0 — 기준선 ✅ 완료 (2026-08-03)

- [x] 이 문서를 `temp-docs/upgrade-plan.md`에 기록
- [x] `cd site && npm ci && npm run build` — 현재 콘솔 경고(카테고리 불일치·미인덱스·깨진 링크)를 기준선으로 캡처
- [x] `node lib/dates.mjs --check` 통과 확인
- [x] `npm run preview`로 현재 화면 상태 확인 (다크·라이트 각각) — 헤드리스라 HTTP 200 + 테마 토큰 정적 확인으로 대체, 육안 확인은 사람 몫으로 남김

#### 기준선 기록 (Phase 1~7 비교 기준)

빌드 콘솔 전문:

```
[build] BASE='(local)'  ROOT=/Users/kmyu/Desktop/project/ai-wiki
[content] wiki pages: 121  ·  catalog entries: 119  ·  sections: 7
[content] WARN index.md 카탈로그에 없는 페이지 (2): database/lumer-2025-rethinking-retrieval-from-traditional-retrieval, database/sguys99-langchain-study-vectorless-rag
[graph] nodes: 121  ·  edges: 626
[build] copied wiki/assets → dist/assets
[build] copied site chrome + fonts → dist/static
[render] pages rendered: 121
[render] about page rendered
[links] unresolved wikilinks: 0  ✓
[build] done.
```

| 경고 종류 | 기준선 |
|---|---|
| 카테고리 불일치 (`content.mjs:47-51`) | 0건 |
| 중복 stem (`content.mjs:79`) | 0건 |
| 카탈로그에 있으나 파일 없음 (`build.mjs:45`) | 0건 |
| index.md 미인덱스 (`build.mjs:49`) | **2건** — `database/lumer-2025-rethinking-retrieval-from-traditional-retrieval`, `database/sguys99-langchain-study-vectorless-rag` |
| `[about] WARN unresolved links` | 0건 |
| `[links] unresolved wikilinks` | 0건 |
| 폰트/KaTeX 자산 미발견 | 0건 |

통계: wiki 페이지 121 · 카탈로그 119 · 섹션 7 · 그래프 노드 121/엣지 626 · dist HTML 123개(46 MB) · 태그 distinct **701종**(계획서 본문의 655는 낡은 값) / 총 1,308회.

카테고리별 파일 수: agents 49 · applications 31 · database 25 · overviews 9 · llms 3 · etc 2 · evaluations 2.

`node lib/dates.mjs --check` → `dates.mjs self-check ✓` (exit 0).

preview(4173): `/` 200 · `/about/` 200 · `/graph.json` 200 · `/pagefind/pagefind.js` 200 · 개별 wiki 페이지 200. Pagefind는 121페이지·34,084단어를 인덱싱했고 **filters 0 · sorts 0** — Phase 4의 `data-pagefind-filter` 도입 전 기준선이다.

CSS 토큰 현황: 다크 `--signal: #5eead4` / 라이트 `--signal: #0fb89b`, `--signal` 참조 40여 곳. `--signal-physical` 계열과 `[data-domain]` 셀렉터는 아직 없음(Phase 2 신설 대상).

`about.mjs`의 분류 목록은 아직 `[[physical-ai]]`를 포함하지 않아 unresolved 0이다. Phase 3의 빈 카테고리 처리 없이 링크만 추가하면 경고가 뜬다는 계획서 예측이 코드상 확인됐다.

사람 확인이 남은 항목: 다크·라이트 육안 확인, 앰버 대비비 실측 최종 판단, 640/1024/1080px 브레이크포인트 레이아웃.

### Phase 1 — 분류 체계 확장 ✅ 완료 (2026-08-03)

- [x] `wiki/physical-ai/.gitkeep` 생성 (`wiki/etc/`·`wiki/evaluations/` 선례를 따름)
- [x] `index.md`: `## LLMs (llms)` 섹션 다음에 `## Physical AI (physical-ai)` + 설명 한 줄 추가. 엔트리는 아직 없음
- [x] `CLAUDE.md` 저장소 구조 트리에 `physical-ai/` 추가
- [x] `CLAUDE.md` 카테고리 표에 physical-ai 행 추가
- [x] `CLAUDE.md` frontmatter enum에 `physical-ai` 추가 + 누락돼 있던 `overviews` 같이 보강
- [x] `CLAUDE.md`에 physical-ai 판단 규칙 문단 추가 (설계 1절)
- [x] `CLAUDE.md`에 통제 태그 어휘 표 + 40페이지 분할 트리거 추가
- [x] `CLAUDE.md`에 `study_path` frontmatter 키 스키마 문서화
- [x] `README.md` 구조 트리 · enum · 커스터마이징 표 · 부트스트랩 프롬프트 4개소 갱신
- [x] 신규 한글 산문에 `humanize-korean` 적용
- [x] 기존 드리프트 정리: `wiki/database/` 미인덱스 2건을 `index.md`에 추가

#### 실행 기록

`index.md`의 Physical AI 섹션은 LLMs와 Agents 사이에 들어갔고 엔트리는 비어 있다. `content.mjs`의 `SECTION_RE`가 `## Physical AI (physical-ai)` 헤더를 그대로 파싱해 sections가 8로 늘었다.

통제 태그 어휘는 계획서의 22개 태그를 그대로 옮기되 학습·제어 방법 / 플랫폼·응용 / 환경·인식 / 자원·운영 네 묶음의 표로 정리했다. 나열만 하는 것보다 새 자료를 분류할 때 고르기 쉽다.

드리프트 2건은 database 섹션의 PageIndex·vectorless 클러스터 안에 넣었다. 두 자료 모두 그 계보에 속한다 — `sguys99-langchain-study-vectorless-rag`는 PageIndex 없이 직접 만든 구현이고, `lumer-2025-...`는 vectorless 서사에 대한 금융 도메인 반례다.

humanize-korean은 strict 5인 파이프라인 대신 monolith fast path로 돌렸다. 대상 산문이 1,392자뿐이고 직전 subagent가 세션 한도로 중단된 상태라 호출 비용을 줄이는 쪽을 택했다. 결과는 변경률 4.7% · 등급 A · 자체검증 6/6. 실제 수정은 네 곳이다. 카탈로그 엔트리의 좌향 관형구를 두 문장으로 풀었고, 판단 규칙의 대시 삽입구를 괄호로 바꿔 주어와 주격조사가 갈라지던 걸 붙였고, "분할 트리거:" 라벨이 뒤 문장과 겹쳐 지웠고, `study_path` 설명의 `-고,` 연결을 문장 분리로 바꿨다. 수치·고유명사·YAML key·경로는 등장 횟수까지 대조해 전부 보존했다.

#### 빌드 검증 (기준선 대비)

```
[content] wiki pages: 121  ·  catalog entries: 121  ·  sections: 8
[graph] nodes: 121  ·  edges: 626
[render] pages rendered: 121
[links] unresolved wikilinks: 0  ✓
[build] done.
```

`dates.mjs self-check ✓`.

| 항목 | 기준선 | Phase 1 후 |
|---|---|---|
| catalog entries | 119 | **121** |
| sections | 7 | **8** |
| index.md 미인덱스 WARN | 2건 | **0건** |
| 카테고리 불일치 / 중복 stem / 카탈로그 고아 | 0 | 0 |
| about unresolved / unresolved wikilinks | 0 | 0 |

페이지 0개인 physical-ai 섹션은 새 경고를 만들지 않았다. 현재는 홈에서 밴드가 걸러져 보이지 않으며, 이걸 "준비 중" 상태로 바꾸는 건 Phase 3의 몫이다.

### Phase 2 — 도메인 2색 ✅ 완료 (2026-08-03)

- [x] `site/lib/domains.mjs` 신설 — `CATEGORY_DOMAIN` 맵 + `domainOf(category)`, 기본 `'core'`
- [x] `styles.css` `@layer tokens`에 `--signal-physical`·`--signal-physical-dim` 다크/라이트 추가
- [x] `[data-domain='physical']` 오버라이드 블록 추가
- [x] `templates.mjs`: 홈 밴드 `<section class="band">`에 `data-domain` 부여
- [x] `templates.mjs`: `layout()`/`wiki()`에서 `page.category` → `data-domain`을 콘텐츠 셸에 부여
- [x] `templates.mjs`: 홈 필터 칩에 도메인 속성 부여
- [x] `constellation.js`: 두 signal 토큰을 읽어 `node.category` 기준으로 노드 색 분기
- [x] 다크·라이트 각각 대비비 측정 후 최종 색값 확정

#### 실행 기록

`site/lib/domains.mjs`(28줄)가 카테고리→도메인 매핑의 단일 소스다. `DOMAINS`·`CATEGORY_DOMAIN`·`DEFAULT_DOMAIN`·`domainOf()`를 export하고 미등록 카테고리는 `core`로 떨어진다.

`styles.css`는 토큰 4개와 오버라이드 한 블록만 늘었다. 다크 `--signal-physical: #f0a868` / `--signal-physical-dim: rgba(240,168,104,0.25)`, 라이트 `#a85b12` / `rgba(168,91,18,0.18)`. 새 컴포넌트는 만들지 않았다 — 기존 컴포넌트가 전부 `--signal`을 읽으므로 카드 보더·호버·칩이 자동으로 따라온다.

`templates.mjs`는 `layout()`에 `domain` 옵션을 받아 `<main id="main">`에 속성을 건다. 헤더·푸터·검색 모달이 `<main>` 바깥이라 전역 크롬의 아쿠아 유지가 구조로 보장된다. 홈 밴드와 카테고리 필터 칩에도 같은 속성을 붙였고, 도메인이 없는 전체·최근 칩은 뺐다.

`constellation.js`는 브라우저에 번들러 없이 그대로 실려 `domains.mjs`를 import할 수 없다. `PHYSICAL_CATEGORIES` 로컬 배열을 두고 단일 소스가 `domains.mjs`임을 주석에 적었다. 노드 색은 core가 종전대로 허브만 아쿠아·나머지 faint인데, physical은 초기 degree가 낮아 같은 규칙을 쓰면 도메인 색이 아예 안 보인다. 그래서 physical은 항상 앰버로 칠하되 허브가 아니면 `globalAlpha 0.55`를 준다.

#### 대비비 측정

계획서 후보값을 그대로 확정했다. 조정 없이 전 조합에서 4.5:1을 넘겼다. WCAG 2.x 상대휘도 공식을 노드 스크립트로 직접 계산했고 배경은 `styles.css`의 실제 토큰 값이다.

| 테마 | 전경 | 배경 | 대비비 | 4.5:1 | 3:1 |
|---|---|---|---|---|---|
| dark | `#f0a868` | `--bg #0b0e14` | 9.66 | PASS | PASS |
| dark | `#f0a868` | `--surface #141923` (카드) | 8.81 | PASS | PASS |
| dark | `#f0a868` | `--surface-2 #1b2230` (칩) | 7.97 | PASS | PASS |
| dark | `--bg #0b0e14` on `#f0a868` | signal 배경 (활성 칩·NEW 뱃지) | 9.66 | PASS | PASS |
| light | `#a85b12` | `--bg #f7f8fa` | 4.74 | PASS | PASS |
| light | `#a85b12` | `--surface #ffffff` (카드) | 5.04 | PASS | PASS |
| light | `#a85b12` | `--surface-2 #f1f3f7` (칩) | 4.53 | PASS | PASS |
| light | `--bg #f7f8fa` on `#a85b12` | signal 배경 | 4.74 | PASS | PASS |

`-dim` 토큰은 반투명 오버레이(엣지·글로우·selection·blockquote 좌측선)라 단독 대비 기준 대상이 아니다. 합성 후 대비는 다크 1.64~1.70 · 라이트 1.26~1.28로 기존 아쿠아 dim과 같은 수준이다. 실제 UI 보더인 `.card:hover`·`.filter-chip.is-active`는 `--signal`을 직접 쓰므로 위 표의 통과값이 적용된다.

측정 중 기존 문제가 하나 드러났다. 현행 라이트 아쿠아 `#0fb89b`는 세 배경 모두에서 2.26~2.52라 4.5:1은 물론 3:1도 못 넘긴다. 앰버가 아쿠아보다 접근성이 좋은 셈이다. Phase 2 범위 밖이라 손대지 않았고 Phase 7의 `DESIGN.md` Known Gaps에 올린다.

#### 빌드 검증 (Phase 1 대비)

```
[content] wiki pages: 121  ·  catalog entries: 121  ·  sections: 8
[graph] nodes: 121  ·  edges: 626
[render] pages rendered: 121
[links] unresolved wikilinks: 0  ✓
[build] done.
```

`dates.mjs self-check ✓`. 모든 수치가 Phase 1과 동일하고 경고는 하나도 늘지 않았다.

`dist/` grep 검증: 홈 밴드 8개·필터 칩 7개·wiki 페이지 121개 전부 `data-domain="core"`가 찍혔다. 홈과 About의 `<main>`은 도메인 중립이라 속성이 없다. physical-ai는 페이지가 0개라 홈에서 밴드·칩이 걸러져 `data-domain="physical"`이 실제 산출물에 나오지 않는다(Phase 3에서 해결). 대신 가짜 physical-ai 섹션·페이지를 렌더해 코드 경로를 직접 확인했고 세 지점 모두 정상이다.

```
밴드   : <section class="band" id="physical-ai" data-band="physical-ai" data-domain="physical" ...>
필터칩 : <a class="filter-chip" href="#physical-ai" data-filter="physical-ai" data-domain="physical" ...>
wiki셸 : <main id="main" class="wiki" data-domain="physical">
```

`BASE=/ai-wiki` 빌드도 경고 0이고 자산 경로가 `/ai-wiki/static/...`, `data-graph="/ai-wiki/graph.json"`으로 정상 접두된다. 확인 후 기본 빌드로 되돌렸다.

#### 남은 사람 확인 항목

- `npm run preview` 다크·라이트 육안 확인. 라이트 앰버가 4.53~5.04로 통과선에 가까워 실제 화면 느낌을 봐야 한다
- physical-ai 페이지가 생긴 뒤 히어로 캔버스에서 앰버 노드가 구분돼 보이는지, `globalAlpha 0.55`가 적절한지
- 활성 필터 칩(`color: var(--bg)` on 앰버 배경)이 physical 도메인에서 읽히는지
- physical wiki 페이지에서 헤더·푸터·검색 모달이 아쿠아를 유지하는지
- `constellation.js`의 `PHYSICAL_CATEGORIES`가 `domains.mjs`와 이중 관리다. Phase 5에서 `graph.json` 노드에 `domain` 필드를 넣어 한쪽으로 합치는 걸 검토한다

### Phase 3 — 빈 카테고리 준비 중 상태 ✅ 완료 (2026-08-03)

- [x] `content.mjs`: `index.md`에 선언됐지만 페이지 0개인 섹션을 `declaredEmpty` 플래그로 표시
- [x] `templates.mjs:162` / `build.mjs:130`의 `filter(s => s.pages.length)` 조정
- [x] 밴드 빈 상태 마크업 + `styles.css`에 최소 스타일
- [x] 홈 통계·필터 칩 카운트에서 빈 카테고리가 빠지는지 확인
- [x] `site/lib/about.mjs:67` 분류 목록에 `[[physical-ai]]` 추가 후 unresolved 경고가 사라지는지 확인

#### 실행 기록

`content.mjs`의 `loadContent()`가 섹션 객체를 만들 때 `declaredEmpty: secPages.length === 0`을 붙인다. 섹션 선언 자체가 `index.md` 헤더에서만 나오므로 이 플래그는 "선언됐지만 페이지 0개"와 정확히 같은 뜻이다. 기존 `empty` 필드는 그대로 뒀다.

플래그는 `build.mjs`가 받은 `content.sections`에서 두 갈래로 흐른다. 하나는 `stats.categories` 집계이고 다른 하나는 `home()`으로 넘어가 `templates.mjs`의 `visible` 필터를 통과한 뒤 `bandSection()`에 닿는다. `bandSection()`은 플래그를 다시 읽지 않고 `!s.pages.length`로 판정한다 — 통합 "최근 추가" 밴드처럼 `declaredEmpty`가 없는 합성 섹션도 같은 함수를 타기 때문이다. 플래그는 밴드를 렌더할지를 정하고 렌더 형태는 페이지 수가 정한다.

빈 밴드는 카드 그리드와 "+ 더 보기"를 빼고 `.band-empty-note` 한 줄만 남긴다. `data-band`는 유지해 `filter.js`가 칩 클릭으로 이 밴드를 열 수 있게 했다. CSS는 `.band-empty-note` 한 블록이고 점선 보더에 `--signal-dim`을 써서 physical 밴드에서는 앰버로 나온다.

`about.mjs`의 분류 목록에 `[[physical-ai]]`를 llms 다음에 넣었다. `index.md` 순서와 같다. `content.mjs`의 `categories` 맵이 페이지 유무와 무관하게 `index.md` 섹션 전부를 담기 때문에 Phase 3 없이 링크만 넣어도 경고는 안 났을 것이다. 다만 그 경우 앵커 대상 밴드가 없어 클릭이 무의미했다. 이제 앵커가 실제로 렌더된다.

안내 문구는 `templates.mjs` 상단 `BAND_EMPTY_NOTE` 상수 한 곳에 뒀다.

> 아직 등록된 자료가 없습니다. 분류와 태그 체계를 먼저 세워 둔 자리라 자료를 정리하는 대로 카드가 채워집니다.

카테고리 이름은 넣지 않았다. 바로 위 `band-desc`가 `index.md` 섹션 설명문을 그대로 출력하므로 무엇이 들어올지는 이미 나와 있고, 안내문은 왜 비었는지와 언제 채워지는지만 말한다. 60자짜리 한 문장이라 humanize-korean 파이프라인 대신 CLAUDE.md의 문체 가이드로 직접 점검했다 — 연결어미 뒤 쉼표·기계적 병렬·명사 볼드·문두 접속사 모두 해당 없고 어휘도 평이하다. Phase 1이 1,392자에 strict 대신 monolith를 쓴 것과 같은 비례 판단이다.

#### 홈 통계·칩 카운트 처리

'전체' 칩의 121은 `visible.reduce((n, s) => n + s.pages.length, 0)`이라 빈 섹션이 0을 더해 값이 안 바뀐다. hero의 `pages`는 `graph.nodes.length`라 섹션 집계와 무관하고 `links`도 마찬가지다. 계획서의 "홈 통계의 페이지 수에서는 뺀다"는 이 두 지점에서 코드 변경 없이 이미 만족된다.

판단이 필요했던 건 `categories` 하나다. 이건 페이지 수가 아니라 카테고리 수를 세는 별개 통계이고 홈에서 실제로 보이는 밴드 수와 대응한다. physical-ai 밴드가 눈에 보이는데 통계가 7이라고 하면 화면과 어긋나므로 8로 맞췄다. 계획서가 조정 대상으로 지목한 `build.mjs:130`이 바로 이 줄이다. 필터 칩의 physical-ai 카운트는 `0`으로 표시된다. 칩을 감추면 그 카테고리로 갈 수단이 없어지고 0이라는 숫자 자체가 비어 있다는 정보라서 그대로 뒀다.

#### 빌드 검증 (Phase 2 대비)

```
[content] wiki pages: 121  ·  catalog entries: 121  ·  sections: 8
[graph] nodes: 121  ·  edges: 626
[render] pages rendered: 121
[links] unresolved wikilinks: 0  ✓
[build] done.
```

`dates.mjs self-check ✓`.

| 항목 | Phase 2 | Phase 3 |
|---|---|---|
| wiki pages / catalog entries / sections | 121 / 121 / 8 | 121 / 121 / 8 |
| graph nodes / edges | 121 / 626 | 121 / 626 |
| pages rendered | 121 | 121 |
| unresolved wikilinks | 0 | 0 |
| `[about] WARN unresolved links` | 0 | 0 (`[[physical-ai]]` 추가 후에도 미발생) |
| 카테고리 불일치 / 중복 stem / 카탈로그 고아 / index.md 미인덱스 | 0 | 0 |
| 홈 hero `pages` | 121 | 121 |
| 홈 hero `categories` | 7 | **8** |
| 홈 밴드 수 | 8 | **9** (recent 1 + core 7 + physical 1) |

`dist/index.html` grep — 밴드가 LLMs 다음·Agents 앞으로 `index.md` 순서 그대로 들어갔고 `data-domain="physical"`이 붙어 Phase 2의 앰버 오버라이드를 받는다.

```html
<section class="band band-empty" id="physical-ai" data-band="physical-ai" data-domain="physical" ...>
  ...<span class="band-count">0</span>
  <p class="band-desc">VLA, world model, robot learning, sim2real 등 물리 세계와 상호작용하는 방법.</p>
  <p class="band-empty-note">아직 등록된 자료가 없습니다. ...</p>
</section>
```

`band-empty-note` 1개 · `band-more` 버튼 8개(빈 밴드에는 없음). 필터 칩은 `<a class="filter-chip" href="#physical-ai" data-filter="physical-ai" data-domain="physical">Physical AI<span class="filter-count">0</span></a>`. `dist/about/index.html`은 `<a class="wikilink" href="/#physical-ai">Physical AI</a>`로 해석됐고 `BASE=/ai-wiki`에서는 `/ai-wiki/#physical-ai`로 접두된다.

`filter.js` 경로도 읽어서 확인했다. `bands`가 `.band[data-band]`로 잡혀 빈 밴드도 포함되는데, `grid: null` → `cards: []`, `moreBtn: null`이 되고 `collapse()`·`expand()`가 둘 다 `if (b.moreBtn)` 가드를 가져 예외가 없다. `#physical-ai` 직접 진입과 About 링크 진입 모두 필터를 활성화하고, JS 없이도 앵커 점프로 동작한다.

#### 남은 사람 확인 항목

- 다크·라이트 각각 빈 밴드 육안 확인. 점선 보더가 `--signal-dim`이라 라이트 테마는 알파 0.18이라 실제로 보이는지 봐야 한다. 너무 흐리면 `--hairline`으로 바꾸거나 알파를 올린다
- `band-count`의 `0`이 앰버로 찍히는데, 이게 Phase 2 이후 physical 도메인 색이 산출물에 처음 나타나는 지점이다
- 640 / 1024px에서 안내 박스 세로 여백(`--space-6` 상하)이 카드 그리드 자리와 비교해 허전하지 않은지
- 필터 칩에서 Physical AI를 눌렀을 때 sticky 필터바 아래 안내 한 줄만 남는 화면. Phase 8에서 첫 자료가 들어오면 카드 그리드로 자동 전환된다

### Phase 4 — 태그 인덱스·필터 ✅ 완료 (2026-08-03)

- [x] `content.mjs`: 태그→페이지 인덱스 생성 (`slugify` 재사용)
- [x] `templates.mjs`: `tagIndex()`·`tag()` 추가 (본문 목록은 기존 `card()` 재사용)
- [x] `build.mjs`: `dist/tags/index.html` + `dist/tags/{slug}/index.html` 렌더
- [x] 카드 칩·wiki 페이지 태그를 태그 페이지로 링크
- [x] wiki 아티클에 `data-pagefind-filter` 부여
- [x] `search.js`에 카테고리 패싯 필터 UI 추가
- [x] 헤더 또는 푸터에 태그 인덱스 진입점 추가

#### 실행 기록

신규 파일 없이 5개를 고쳤다. `content.mjs`에 `buildTagIndex(pages)`·`tagsOf(page, tagIndex)`를 넣고 `loadContent()` 반환에 `tagIndex`를 실었다. `slugify`는 `markdown.mjs`에서 import했고 새로 만들지 않았다. `templates.mjs`에 `tagIndex()`·`tag()`·`tagCloud()`·`tagSize()`를 추가했다. `build.mjs`는 `[tags]` 콘솔 리포트와 두 종류의 태그 페이지 렌더를 맡는다. `search.js`에 카테고리 패싯 UI, `styles.css`에 카드 stretched link·칩 링크 상태·태그 인덱스·클라우드·태그 상세·위키 태그 목록·검색 패싯 스타일이 들어갔다.

기존 토큰만 썼고 Phase 2의 `[data-domain]` 오버라이드와 충돌하지 않는다. 태그 그룹 `<section>`과 태그 상세 `<main>`이 `data-domain`을 들고 있어 physical 태그는 자동으로 앰버가 된다.

자료구조는 이렇다.

```
{ tags: [entry…빈도 desc], bySlug: Map(slug→entry), collisions: [...] }
entry = { slug, label, url, variants:Map(원표기→횟수), variantLabels, pages, count, domain }
```

`count`는 페이지 수이고 페이지 안에서 중복된 태그는 1회로 센다. distinct 703 raw → 700 slug, page-tag 링크 1,314.

**도메인 그룹은 다수결로 판정한다.** 그 태그를 단 페이지 중 physical이 절반을 넘으면 `physical`, 아니면 `core`(동률 포함). "하나라도 physical이면 physical" 규칙을 안 쓴 이유는 `benchmark`처럼 양쪽이 같이 쓰는 일반 태그가 크로스오버 한 건만으로 core 클라우드에서 사라지기 때문이다. `vla`·`sim2real` 같은 physical 전용 태그는 어느 규칙에서도 physical로 간다. 지금은 physical-ai 페이지가 0개라 렌더되는 그룹이 Core 하나뿐이고 빈 그룹은 렌더하지 않는다.

#### 슬러그 충돌 — 3건 병합

대표 표기는 최다 빈도, 동률이면 코드포인트 순으로 고른다. 버려진 표기도 `variantLabels`에 남아 태그 상세 페이지에 "표기 변형을 한 태그로 묶었습니다 — `A` · `B`"로 노출된다.

| slug | 병합된 표기 | 대표 |
|---|---|---|
| `rag` | rag(26) · RAG(2) | `rag` |
| `swe-bench` | SWE-bench(1) · swe-bench(1) | `SWE-bench` |
| `skillsbench` | SkillsBench(1) · skillsbench(1) | `SkillsBench` |

계획서 Known Gaps대로 `graph-rag`/`graphrag`처럼 슬러그가 아예 다른 중복은 손대지 않았다.

#### 카드 구조 변경

`card()`가 `<a>`에서 `<div>` + 제목 stretched link 구조로 바뀌었다. 앵커 중첩이 금지라 카드 안의 태그 칩을 실제 링크로 만들려면 이 구조가 필요했다. `.card-link::after`가 `inset: 0`으로 카드 전면을 덮어 클릭 영역이 되고, 칩은 `position: relative; z-index: 1`로 그 위에 올라가 자기 링크로 클릭을 받는다. 호버·포커스는 `:focus-visible` 대신 `:focus-within`으로 바뀌었다. `filter.js`의 접기와 `constellation.js`의 이웃 하이라이트는 셀렉터가 `.card`라 코드상 영향이 없다.

#### Pagefind filters 0 → 2

`category`(7값: Agents 49 · Applications 31 · Database 25 · Overviews 9 · LLMs 3 · Etc 2 · Evaluations 2)와 `tag`(700값)가 잡힌다. 인덱스 페이지 수·단어 수는 121 / 34,084 그대로다 — `data-pagefind-body`는 wiki 아티클에만 유지했다.

`search.js` 패싯은 모달을 열 때 `pagefind.filters()`를 1회 호출해 `전체` + 카테고리 칩을 렌더한다. 칩을 누르면 `search(q, { filters: { category: [값] } })`로 재검색하고, 칩 숫자는 응답의 `totalFilters.category`로 갱신하며 0인 칩은 `disabled`가 된다. 검색어 없이 패싯만 있으면 `search(null, …)` filter-only 모드로 그 카테고리를 나열한다. 이때 Pagefind가 `totalFilters`를 전부 0으로 돌려주는 걸 실측으로 확인해서, 그 경우엔 인덱스 전체 수로 대체했다. 안 그러면 다른 칩이 전부 비활성이 된다. 모달을 닫았다 열면 패싯은 `전체`로 초기화된다.

`category:Physical AI`처럼 공백이 있는 값도 Pagefind가 정상 색인·조회하는 걸 합성 사이트로 미리 확인했다(Phase 8 대비). 새 런타임 의존성은 없다.

#### 빌드 검증 (Phase 3 대비)

```
[content] wiki pages: 121  ·  catalog entries: 121  ·  sections: 8
[tags] tags: 700  ·  page-tag links: 1314  ·  merged slugs: 3
[tags]   merged 'rag' ← rag , RAG (대표 표기 'rag')
[tags]   merged 'swe-bench' ← SWE-bench , swe-bench (대표 표기 'SWE-bench')
[tags]   merged 'skillsbench' ← SkillsBench , skillsbench (대표 표기 'SkillsBench')
[graph] nodes: 121  ·  edges: 626
[render] pages rendered: 121
[render] tag pages rendered: 700 (+ /tags/ index)
[links] unresolved wikilinks: 0  ✓
[build] done.
```

`dates.mjs self-check ✓`. `[tags]` 3줄은 신규 정보성 로그이고 경고는 하나도 늘지 않았다.

| 항목 | Phase 3 | Phase 4 |
|---|---|---|
| wiki pages / catalog / sections | 121 / 121 / 8 | 121 / 121 / 8 |
| graph nodes / edges | 121 / 626 | 121 / 626 |
| pages rendered | 121 | 121 |
| 태그 페이지 | — | **700 (+ 인덱스 1)** |
| unresolved wikilinks / `[about] WARN` | 0 / 0 | 0 / 0 |
| 카테고리 불일치 / 중복 stem / 카탈로그 고아 / 미인덱스 | 0 | 0 |
| 홈 hero pages / categories · 밴드 수 | 121 / 8 · 9 | 121 / 8 · 9 |
| dist HTML | 123 | **824** (52 MB) |
| Pagefind filters / sorts | 0 / 0 | **2 / 0** |
| Pagefind pages / words | 121 / 34,084 | 121 / 34,084 |

클라우드 크기 단계는 size4(≥10회) 8개 · size3(≥5) 40 · size2(≥2) 158 · size1 494다.

오케스트레이터 재검증: `dist` HTML 824개 · `dist/tags` 701개 디렉터리. 홈 카드가 `<div class="card">` + `<a class="card-link">` 구조이고 칩이 `<a class="chip" href="/tags/{slug}/">`로 나간다. wiki 페이지에 `data-pagefind-filter="category:Agents"`와 태그별 `tag:{slug}` 속성이 붙고 하단 `<nav class="wiki-tags" aria-label="이 페이지의 태그">`가 전체 태그를 노출한다. 태그 인덱스는 `<section class="tag-group" data-domain="core">` 한 그룹이다. `BASE=/ai-wiki` 빌드에서 `/ai-wiki/tags/{slug}/`와 헤더 `/ai-wiki/tags/`가 정상 접두되고, 확인 후 기본 빌드로 되돌렸다.

프리뷰 200 확인: `/` `/tags/` `/tags/rag/` `/tags/claude-code/` `/tags/swe-bench/` `/tags/skillsbench/` `/about/` `/pagefind/pagefind.js` `/pagefind/pagefind-entry.json`. 왕복도 확인했다 — `/tags/pgvector/` 카드 → `/applications/dnotitia-akb/` → 그 페이지 하단 `pgvector` 칩 → 다시 태그 페이지.

#### 신규 한글 UI 문구

| 위치 | 문구 |
|---|---|
| 헤더 nav / 모바일 시트 | `태그` |
| `/tags/` eyebrow · h1 | `태그 인덱스` · `태그` |
| `/tags/` lede | `위키 페이지 frontmatter 의 태그를 모았습니다. 글자 크기는 쓰인 횟수이고 대소문자만 다른 표기는 한 항목으로 합쳤습니다.` |
| `/tags/` 통계 | `태그 {n}개 · 페이지 {m}개` |
| Core 그룹 desc | `LLM 소프트웨어 쪽 카테고리에서 쓴 태그입니다.` |
| Physical 그룹 desc | `물리 세계와 상호작용하는 방법을 다룬 페이지의 태그입니다.` |
| 태그 상세 | `태그 인덱스`(링크) · `페이지 {n}개` · `표기 변형을 한 태그로 묶었습니다 — {A} · {B}` |
| 위키 태그 라벨 | `태그` |
| 검색 패싯 | `전체` · `{n}개 결과 · {카테고리}` · `결과 없음` |
| aria-label | `카테고리 필터` · `이 페이지의 태그` |

총 300자 미만이라 Phase 1·3과 같은 비례 판단으로 humanize-korean 파이프라인은 돌리지 않고 CLAUDE.md 문체 가이드로 직접 점검했다. 연결어미 뒤 쉼표·기계적 병렬·명사 볼드·콜론 부제·문두 접속사 모두 해당 없다.

#### 남은 사람 확인 항목

- **카드 구조 변경이 가장 큰 회귀 위험이다.** 다크·라이트에서 카드 전체 클릭, 호버 시 보더·`translateY(-2px)`, 키보드 Tab 포커스, 칩만 눌렀을 때 카드가 아니라 태그 페이지로 가는지 확인
- 700개 태그 클라우드의 실제 스크롤 길이. 크기 1단계가 494개라 하단이 길다. 빈도 하한을 두고 접을지 판단
- ⌘K 검색에서 패싯 줄이 모달 높이(`max-height:70vh`)를 얼마나 잡아먹는지, 640px 이하에서 칩 7개가 몇 줄로 감기는지
- 561~700px 구간 헤더. nav 버튼이 하나 늘어 검색+⌘K 배지와 같이 놓였을 때 워드마크와 붙지 않는지
- `.tag-cloud-item[data-size='4']`가 `--signal`이라 physical 그룹에서 앰버로 나온다. Phase 8 이후 확인 대상
- 태그 페이지의 `.card` 도메인 스코프는 태그 그룹 도메인을 따른다. core 태그 페이지에 physical 페이지 카드가 섞이면 카드가 아쿠아로 나온다. 의도한 동작이지만 자료가 들어온 뒤 어색한지 봐야 한다

### Phase 5 — 전체 그래프 페이지 ✅ 완료 (2026-08-03)

- [x] `constellation.js`에서 그래프 그리기 공통 로직 분리
- [x] `site/assets/js/graph-explorer.js` 작성 (도메인 색·degree 크기·호버 이웃 강조·클릭 이동)
- [x] `templates.mjs`에 `graphPage()` + `build.mjs`에서 `dist/graph/index.html` 렌더
- [x] 카테고리 칩 필터 + 해시 동기화 (`filter.js` 패턴)
- [x] 헤더 네비에 진입점 추가
- [x] 모바일에서의 동작·성능 확인

#### 실행 기록

변경 파일 7개다. 신규 2개(`site/assets/js/graph-core.js` 147줄, `site/assets/js/graph-explorer.js` 456줄)에 기존 5개 수정. 새 런타임 의존성은 없다.

`site/lib/graph.mjs`가 `domainOf()`를 import해 노드마다 `domain` 필드를 싣는다. Phase 2가 남긴 이중 관리를 여기서 정리했다. `constellation.js`의 `PHYSICAL_CATEGORIES` 로컬 배열은 지웠고 두 렌더러 모두 `node.domain`을 읽는다. 브라우저 스크립트가 번들러 없이 실려 `domains.mjs`를 import할 수 없다는 제약은 그대로인데, 매핑을 빌드에서 한 번 풀어 JSON에 실어 보내면 JS 쪽에 카테고리 목록이 남지 않는다. 이제 `domains.mjs`에 카테고리를 한 줄 추가하면 그래프 색이 자동으로 따라온다.

`graph-core.js`가 두 캔버스 화면의 공통 부품이다. `token`·`palette`(getComputedStyle 한 번으로 색 9개)·`isPhysical`·`nodeColor`·`reduceMotion`·`fitCanvas`(DPR 상한 2)·`onResize`(ResizeObserver 우선, 없으면 window resize, 둘 다 120ms 디바운스)·`onThemeChange`(MutationObserver로 `data-theme` 감시)·`fetchGraph`·`buildAdjacency`를 `window.GraphCore`로 노출한다. defer 스크립트가 문서 순서를 지키므로 `scripts` 배열에서 앞에 두는 것만으로 순서가 보장된다. `constellation.js`는 이 부품을 쓰면서 44줄이 줄었고, 부수 효과로 프레임마다 돌던 `getComputedStyle` 4회가 1회가 됐다. reduced-motion 정지 프레임에도 테마 재렌더가 붙었다 — 애니메이션 경로는 매 프레임 색을 다시 읽어 저절로 따라오지만 정지 프레임은 그렇지 않았다.

`graph-explorer.js`의 배치는 Fruchterman-Reingold를 로드 시 한 번만 300회 돌리고 결과를 단위 좌표로 남긴다. 초기 위치가 골든앵글 나선이라 결정적이다 — 새로고침해도 같은 그림이 나온다. 애니메이션으로 수렴 과정을 보여주는 안을 버린 이유는 모바일 배터리와 상호작용 지연 때문이다. 정지 화면이면 호버·필터·리사이즈·테마 변경 때만 rAF 한 번씩 그린다. 실측 배치 시간은 121노드·626엣지에 13ms다. 리사이즈는 단위 좌표를 픽셀로 다시 매핑할 뿐 배치를 재계산하지 않고, 호버는 미리 만든 인접 리스트와 재사용 `Uint8Array` 플래그를 읽는다. 엣지 626개는 배경/강조 두 묶음으로 나눠 각각 path 하나에 모아 `stroke()` 두 번으로 끝낸다.

정규화는 축별로 [0,1]로 늘렸다. 균등 축척으로 종횡비를 지키면 가로로 긴 캔버스의 양옆이 통째로 빈다. 배치가 거의 원형이라 늘려도 타원이 될 뿐이고 화면을 훨씬 잘 쓴다.

터치 처리는 포인터 종류로 갈랐다. `(hover: hover) and (pointer: fine)`이면 클릭 한 번에 이동하고, 아니면 첫 탭이 선택이고 같은 노드를 다시 탭하면 이동한다. 선택된 노드는 상태줄에 실제 `<a>`로 뜨므로 두 번 탭을 모르는 사용자도 링크를 눌러 갈 수 있다. `pointermove`는 `pointerType === 'touch'`면 즉시 반환해 터치에서 유령 호버가 생기지 않는다. 캔버스에는 `touch-action: manipulation`을 걸어 탭이 더블탭 확대로 먹히지 않게 했다.

접근성은 캔버스 옆이 아니라 아래에 두는 쪽을 골랐다. `<canvas role="img" aria-label>` 하나로는 121개 페이지 목록을 대신할 수 없어서, 카테고리별 링크 목록을 서버 렌더로 항상 내보내고 JS는 그 목록을 필터에 맞춰 접기만 한다. 칩도 `<a href="#{slug}">`라 JS 없이 해당 카테고리 목록으로 점프한다. 탐색기 블록은 `hidden`으로 나가고 스크립트가 그리기 직전에 연다 — Phase 3의 `+ 더 보기` 버튼과 같은 방식이고, 스크립트가 없거나 `graph.json`을 못 받으면 빈 상자가 남지 않는다. 처음엔 `<figure>`/`<figcaption>`을 썼는데 `figcaption`에 `role="status"`를 얹는 게 ARIA-in-HTML상 애매해 `<div>`/`<p>`로 바꿨다.

목록은 `index.md` 카탈로그가 아니라 그래프 노드에서 만든다. 카탈로그 드리프트가 생겨도 캔버스와 목록이 어긋나지 않는다. 카테고리 순서만 `index.md` 섹션 순서를 따르고 거기 없는 카테고리는 뒤에 붙는다.

필터는 `filter.js`의 해시 동기화를 그대로 가져왔다. 칩 클릭 → `preventDefault` → `apply()` → `history.replaceState`, `hashchange` 구독, 초기 상태는 해시에서 읽는다. 다만 밴드를 숨기는 홈과 달리 여기서는 캔버스 노드를 지우지 않고 죽인다(알파 0.1, faint 색) — 걸러낸 카테고리가 전체 구조 안 어디에 있었는지가 그래프에서는 정보다. 히트 테스트에서는 빠진다.

CSS는 `@layer components` 블록 하나(117줄)를 새로 열었고 셸은 `.tags-page`와 공유한다. 색은 전부 기존 토큰이라 `[data-domain='physical']` 오버라이드가 그룹 섹션·칩에 그대로 걸린다. 헤더 네비와 모바일 시트에 `그래프`를 추가하고 `.nav-graph`를 ≤560px 숨김 목록에 넣었다.

#### 빌드 검증 (Phase 4 대비)

```
[build] BASE='(local)'  ROOT=/Users/kmyu/Desktop/project/ai-wiki
[content] wiki pages: 121  ·  catalog entries: 121  ·  sections: 8
[tags] tags: 700  ·  page-tag links: 1314  ·  merged slugs: 3
[tags]   merged 'rag' ← rag , RAG (대표 표기 'rag')
[tags]   merged 'swe-bench' ← SWE-bench , swe-bench (대표 표기 'SWE-bench')
[tags]   merged 'skillsbench' ← SkillsBench , skillsbench (대표 표기 'SkillsBench')
[graph] nodes: 121  ·  edges: 626
[build] copied wiki/assets → dist/assets
[build] copied site chrome + fonts → dist/static
[render] pages rendered: 121
[render] tag pages rendered: 700 (+ /tags/ index)
[render] graph page rendered: 7 category groups
[render] about page rendered
[links] unresolved wikilinks: 0  ✓
[build] done.
```

`dates.mjs self-check ✓`. `[render] graph page rendered` 한 줄이 늘었고 정보성 로그다. 경고는 하나도 늘지 않았다.

| 항목 | Phase 4 | Phase 5 |
|---|---|---|
| wiki pages / catalog / sections | 121 / 121 / 8 | 121 / 121 / 8 |
| graph nodes / edges | 121 / 626 | 121 / 626 |
| pages rendered | 121 | 121 |
| 태그 페이지 | 700 (+ 인덱스 1) | 700 (+ 인덱스 1) |
| unresolved wikilinks / `[about] WARN` | 0 / 0 | 0 / 0 |
| 카테고리 불일치 / 중복 stem / 카탈로그 고아 / 미인덱스 | 0 | 0 |
| dist HTML | 824 | **825** (52 MB) |
| Pagefind pages / words / filters / sorts | 121 / 34,084 / 2 / 0 | 121 / 34,084 / 2 / 0 |

프리뷰(4173) 200 확인: `/` `/graph/` `/graph.json` `/tags/` `/tags/rag/` `/about/` `/agents/lee-hoyeon-2026-harness-engineering/` `/static/js/graph-core.js` `/static/js/graph-explorer.js`. 확인 후 서버 종료.

`BASE=/ai-wiki` 빌드에서 `data-graph="/ai-wiki/graph.json"` · `data-base="/ai-wiki/"` · 헤더 `href="/ai-wiki/graph/"` · 노드 링크 `/ai-wiki/agents/...`가 모두 접두되고 `/ai-wiki/` 링크가 그래프 페이지에 134개 나온다. 확인 후 기본 빌드로 되돌렸고 `data-base="/"`로 복귀한 것까지 확인했다.

헤드리스 보완 검증 두 가지를 직접 돌렸다. 하나는 `layout()`/`normalize()`를 소스에서 뽑아 실제 `graph.json`으로 실행한 배치 품질 측정이고, 다른 하나는 최소 DOM 스텁 위에서 `graph-core.js` + `graph-explorer.js`를 통째로 실행한 동작 확인이다.

| 측정 | 결과 |
|---|---|
| 배치 시간 | 13ms (121노드 · 626엣지 · 300 iteration) |
| 데스크톱 1100×560 겹친 노드 쌍 | 2 / 7,260 (최소 간격 −1.3px) |
| 모바일 360×330 겹친 노드 쌍 | 18 / 7,260 (최소 간격 −4.4px) |
| 엣지 길이 중앙값 | 데스크톱 94px · 모바일 37px |
| 10×10 격자 점유 | 58 / 100 셀 |
| 초기 draw | 노드 121개 arc/fill · 엣지 stroke 1회 |
| 호버 히트 테스트 | 1,020×490 스윕에서 205개 지점이 노드를 잡음 |
| 노드 클릭 | `(30,192) → /agents/llmsresearch-paperbanana/` |
| 카테고리 칩 | `agents` 적용 시 그룹 1개만 노출 · `aria-pressed=true` |
| `explorer.hidden` | 그리기 직전 `false`로 전환 |

physical 도메인 경로는 Phase 2 선례대로 임시 페이지를 만들어 확인하고 지웠다. `graph.json` 노드에 `domain: 'physical'`이 실리고, 그래프 페이지 그룹 `<section ... data-domain="physical">`과 칩 `data-domain="physical"`이 붙는다. 확인 후 삭제해 `wiki/physical-ai/`는 `.gitkeep`만 남았다.

오케스트레이터 재검증: `npm run build` 콘솔이 위와 동일하고 `dates.mjs self-check ✓`. `dist` HTML 825개, `dist/graph/index.html`(31 KB)에 `data-graph="/graph.json"` · `data-base="/"` · `role="img"` · 필터 칩 7개 · `graph-core.js`/`graph-explorer.js` 참조가 각각 1회씩 나온다. 홈 헤더와 모바일 시트 양쪽에 `href="/graph/">그래프` 진입점이 들어갔다.

#### 신규 한글 UI 문구

| 위치 | 문구 |
|---|---|
| 헤더 nav / 모바일 시트 | `그래프` |
| eyebrow · h1 | `지식 그래프` · `그래프` |
| lede | `페이지 사이의 위키링크를 점과 선으로 그렸습니다. 점 크기는 연결 수이고 색은 도메인입니다.` |
| 통계 | `노드 {n}개 · 연결 {m}개` |
| 상태줄 기본값 | `노드를 가리키면 이웃이 강조됩니다. 누르면 해당 페이지로 이동합니다.` |
| 목록 제목 · 설명 | `카테고리별 목록` · `그래프와 같은 내용을 카테고리별로 정리했습니다. 스크립트가 없어도 이 목록으로 모든 페이지에 갈 수 있습니다.` |
| aria-label | `카테고리 필터` · `위키 페이지 {n}개와 연결 {m}개를 점과 선으로 그린 그래프` |

합쳐 240자 남짓이라 Phase 3·4와 같은 비례 판단으로 humanize-korean 파이프라인은 돌리지 않고 CLAUDE.md 문체 가이드로 항목별 점검했다. 연결어미 뒤 쉼표 — 해당 없음. 기계적 병렬 — `점 크기는 A이고 색은 B` 한 쌍뿐이고 반복 틀이 아니다. 명사 볼드 — 없음. 콜론 부제 헤딩 — 없음. 문두 접속사 — 없음. 어휘는 초안의 "닿을 수 있습니다"를 "갈 수 있습니다"로 바꾼 것 외에는 전부 평이한 기술 문서 어휘다.

#### 남은 사람 확인 항목

- **배치 육안 확인이 최우선이다.** 겹침·엣지 길이는 수치로 봤지만 클러스터가 실제로 읽히는지, FR 상수(`k`·`TEMP 0.16`·`GRAV 2.0`·300 iteration)를 조정할지는 화면을 봐야 안다
- 모바일 360px에서 겹친 쌍 18개. 답답하면 노드 반경 스케일 하한 `0.72`를 낮추거나 캔버스 높이 `clamp(18rem, 52vh, 26rem)`을 올린다
- 축별 정규화로 인한 가로 늘어남. 1440px 같은 넓은 화면에서 타원이 과하게 퍼져 보이는지
- 캔버스 라벨(호버 시 뜨는 제목 상자)이 다크·라이트 양쪽에서 읽히는지, 긴 제목 클리핑이 자연스러운지
- 헤더에 nav 버튼이 하나 더 늘었다. **561~700px 구간에서 워드마크와 붙지 않는지 확인이 필요하다** — Phase 4가 남긴 같은 항목이 이번에 더 빡빡해졌다
- 터치 두 번 탭 규칙이 발견 가능한지. 안내 문구에 넣지 않고 상태줄 링크로 대신했는데 실제로 충분한지
- 그래프 페이지에서 physical 노드가 앰버로 구분돼 보이는지(Phase 8 이후). 지금은 노드가 0개다
- 도메인 범례를 안 넣었다. physical 자료가 들어온 뒤 색만으로 충분한지 판단
- reduced-motion 사용자에게는 원래 정지 화면이라 차이가 없다. 다만 첫 렌더 13ms 동안의 빈 화면이 눈에 띄는지

### Phase 6 — 학습 경로 ✅ 완료 (2026-08-03)

- [x] `content.mjs`: `study_path` 파싱 + `resolve()`로 각 단계 검증, 깨진 참조는 빌드 콘솔 리포트
- [x] `templates.mjs`: `studyPathSection()` 렌더 (번호 단계 · 한 줄 이유 · 선수 지식 링크)
- [x] `styles.css`에 스텝 컴포넌트 스타일
- [x] `wiki/overviews/physical-ai-overview.md` 작성 — 학습 로드맵 겸 MOC 허브. frontmatter `study_path` + 본문 `## 학습 경로` wikilink 목록 병기
- [x] `index.md` overviews 섹션에 엔트리 추가

#### 실행 기록

변경 파일 6개에 신규 위키 페이지 1개다. 새 런타임 의존성은 없다.

`content.mjs`는 페이지 모델에 `studyPathRaw`(frontmatter 원본)와 `studyPath`(해석 결과)를 더하고, `resolveStudyPaths(pages, resolve)`를 새로 export한다. 해석은 카탈로그 머지가 끝난 뒤에 돈다 — 단계 제목이 `page.display`, 즉 `index.md`의 표시명을 따르기 때문이다. 위키링크와 같은 `resolve()`를 쓰되 `r.id`가 있는 경우, 그러니까 실제 위키 페이지인 경우만 해석된 것으로 본다. 앵커·카테고리 밴드·GitHub source 링크는 `ok: true`지만 페이지가 아니라 학습 단계가 될 수 없다. `id`만 적은 문자열 축약형과 `prereq`에 문자열 하나만 적은 형태도 받는다.

`markdown.mjs`에 `spliceStudyPath()`를 넣고 `renderMarkdown`에 `studyPath` 옵션을 추가했다. **본문·컴포넌트 중복은 "헤딩은 남기고 목록만 교체"로 풀었다.** 사이트가 둘 다 출력하면 같은 내용이 두 번 나오는데, 섹션을 통째로 걷어내면 목차 항목과 `#학습-경로` 앵커가 사라지고 컴포넌트가 본문 어디에 놓일지도 잃는다. `## 학습 경로` 헤딩 줄은 그대로 두고 그 아래부터 다음 헤딩 직전까지를 컴포넌트 HTML로 갈아끼우면 목차·앵커·본문 위치가 전부 유지된다. 헤딩이 없으면 본문 끝에 붙여 frontmatter만 쓴 페이지도 컴포넌트가 나온다. 삽입은 `transformFigures`·`protectCurrency` 뒤에 해서 주입한 HTML이 그 변환을 다시 타지 않는다. 코드펜스 안의 `## 학습 경로` 예시는 건드리지 않는다. 다만 그 섹션에 목록 말고 산문을 적으면 사이트에서는 안 보인다 — 이번 페이지는 그 문단을 헤딩 위로 올려 뒀다.

두 군데서 걸렸다가 고쳤다. 헤딩 정규식을 `/^##\s+학습\s*경로\b/`로 썼는데 `\b`가 ASCII `\w` 기준이라 한글 뒤에서 경계를 못 잡아 매칭이 통째로 실패했다(컴포넌트가 본문 끝에 붙었다). `(?:\s|$)`로 바꿨다. 그리고 컴포넌트 HTML에 들여쓰기와 빈 줄이 있어 marked가 HTML 블록을 빈 줄에서 끊고 나머지 4칸 들여쓴 줄을 코드블록으로 잡았다. 지금은 줄 앞 공백도 빈 줄도 없이 낸다.

`templates.mjs`의 `studyPathSection(steps)`는 헤딩 없이 `<ol class="study-path">`만 만든다. 번호는 `<span class="study-n">`으로 직접 찍고(`list-style: none`이라 마커가 없다) 제목·한 줄 이유·선수 지식 링크가 그 아래 붙는다. `prereq`가 없으면 그 문단 자체를 안 낸다. 해석 실패한 참조는 링크 대신 `.wikilink-missing`으로 두는데 깨진 위키링크와 같은 처리다. `markdown.mjs`가 `templates.mjs`를 import하면 순환이라 HTML 문자열을 옵션으로 넘기는 방향으로 뒀다.

`build.mjs`는 `[study]` 리포트 한 줄과 `studyPathSection(page.studyPath)` 전달을 맡는다. 리포트는 선언 페이지가 하나도 없으면 아예 안 찍는다.

`styles.css`는 `@layer components` 블록 하나(95줄)를 새로 열었다. 색은 전부 기존 토큰이라 `[data-domain='physical']` 오버라이드가 그대로 걸린다 — physical 카테고리 페이지가 학습 경로를 선언하면 번호 원과 링크 호버가 앰버로 나온다. base 레이어의 `ul, ol`·`li` 규칙은 레이어 순서상 components가 이긴다.

**study_path 구성은 계획서가 권장한 (A)를 골랐다.** 실재하는 인접 페이지 둘로 2단계를 깔았고, 2단계에 1단계를 `prereq`로 걸어 선수 지식 렌더 경로까지 실제 산출물에서 검증했다. 후보를 다시 훑어 `wiki/llms/cai-2026-vlm3-vision-language-models`(VLM3, 3D 인식) 외에 `wiki/agents/zou-2026-task-focused-memorization-multimodal-agents`(TaskMem, 1인칭 스트림 기억)를 찾았다. 계획서 3행의 전수 조사 결과대로 실제 physical AI 자료는 여전히 0건이고, 이 둘도 물리 상호작용을 다루지 않는다. 그래서 본문과 frontmatter 양쪽에서 "로봇 논문이 아니라 인접 자료"임을 명시했고 `## 이 페이지의 한계`에 같은 내용을 한 번 더 적었다. `robot`·`embodied`·`VLA`·`sim2real` 재검색 히트 3건은 전부 오탐이었다(BRIGHT 벤치마크의 Robotics 스플릿, 표 컬럼명, `robots.txt`).

**overview frontmatter는 기존 9개 페이지의 관례를 그대로 따랐다.** 전수 확인 결과 `wiki/overviews/`의 어느 페이지도 `raw_path`·`raw_filename`을 쓰지 않는다 — 합성 페이지라 대응하는 raw 원본이 없어서다. 공통 키 중 `title`·`type: overview`·`year`·`category: overviews`·`source_collection`·`tags`만 채우고, 합성한 source가 있으면 `sources:` 목록을 더한다. 이 페이지도 같은 형태로 `source_collection: synthesis` + `sources:` 2건을 썼다. `content.mjs`는 `raw_path` 없음을 null로 받고 `sourcesSection()`이 해당 링크만 건너뛴다.

`index.md`는 Overviews 섹션 맨 끝에 한 줄 추가했다. 태그는 통제 어휘에서 `physical-ai`·`vla`·`world-model`·`robot-learning`·`sim2real`을 골랐고 `roadmap`·`overview`·`synthesis`를 더했다. 이 페이지 카테고리가 `overviews`라 태그 인덱스의 도메인 다수결에서는 Core 그룹으로 간다.

##### 한글 산문 처리

본문이 4,134자라 `humanize-korean`을 실제로 호출했다. `register: wiki` → **strict 5인 파이프라인**으로 라우팅됐다(run_id 2026-08-03-002). Phase 1이 1,392자에 monolith fast path를, Phase 3~5가 300자 미만이라 문체 가이드 직접 점검을 택한 것과 같은 비례 판단이다.

| 항목 | 값 |
|---|---|
| 변경률 | **6.63%** (Levenshtein 274 / 4,134자) · 1차 7.28% → 2차 부분 롤백 후 |
| 등급 | **A** (S1 잔존 0 · 과윤문 시그널 0) |
| 원문 밀도 | ai_tell_density 4.18% · severity_weighted_score 9.0 |
| 탐지 → 해소 | 11건(S1 5 · S2 6) → 11건 전부 |
| 지표 | C-11 연결어미 뒤 쉼표 8→0 · 본문 볼드 6→0 · `~라는 점에서` 1→0 · 정의형 문단 진입 8→3 |

wiki 밴드(20~35%)는 하회했다. `naturalness-reviewer`가 저윤문이 아니라 **저탐지**로 판정했다(confidence high) — 초안을 CLAUDE.md 문체 가이드대로 썼더니 A(번역투)·D(상투구)·E(리듬) 카테고리가 0건이고 탐지 11건 중 9건이 C(구조) 한 축에 몰렸다. S1 5건은 전부 쉼표 1자 삭제라 산술적으로 밴드를 채울 수 없다. 밴드를 채우려고 멀쩡한 문장을 건드리는 게 register=wiki가 막으려는 실패 모드라 "사유 있는 N/A"로 기록했다. 문체 가이드를 생성 시점에 적용하면 후속 humanize 부담이 준다는 CLAUDE.md의 전제가 수치로 확인된 셈이다.

검증 2인은 각각 다른 걸 잡았다. `content-fidelity-auditor`는 **conditional_pass** — 영문·숫자 토큰 다중집합 완전 일치, wikilink·백틱·헤딩·표·목록 기호·빈 줄 위치 전부 무변화, 저장소 유무 판정과 분류 판정 4건은 byte-identical이었다. 다만 `처리하는 경로를 보여준다는 점에서` → `처리하니`가 VLM3의 기여를 "경로 제시"에서 "실제 수행"으로 올렸다고 롤백을 지시했다. THE FOUR RULES가 걸린 문서라 층위 상승도 내용 변경으로 봤다. `naturalness-reviewer`는 **B / rollback_and_rewrite(partial)** — 문학체 어휘 드리프트와 신규 비유는 0건이지만, '앞으로 채울 자리' 불릿 6개의 구분자가 4:2로 갈렸고(`term — 설명`은 AI 티가 아니라 glossary 관용 형식) 종결을 다르게 만들려는 필러가 하나 들어갔다고 지적했다. 2차는 이 3줄만 고쳤고 나머지 10건은 재작업을 금지했다.

frontmatter `note:` 두 값은 윤문 결과와 본문 목록 문장이 그대로 일치해 손대지 않았다. 본문 `## 학습 경로` 목록과 frontmatter `study_path`의 순서도 같다.

UI 문구는 `선수` 하나(2자)뿐이라 문체 가이드 직접 점검으로 갈음했다. 연결어미 뒤 쉼표 — 해당 없음. 기계적 병렬 — 없음. 명사 볼드 — 없음. 콜론 부제 — 없음. 문두 접속사 — 없음. 어휘 — `prerequisite`의 일반 기술 문서 표기다.

#### 빌드 검증 (Phase 5 대비)

```
[build] BASE='(local)'  ROOT=/Users/kmyu/Desktop/project/ai-wiki
[content] wiki pages: 122  ·  catalog entries: 122  ·  sections: 8
[tags] tags: 706  ·  page-tag links: 1322  ·  merged slugs: 3
[tags]   merged 'rag' ← rag , RAG (대표 표기 'rag')
[tags]   merged 'swe-bench' ← SWE-bench , swe-bench (대표 표기 'SWE-bench')
[tags]   merged 'skillsbench' ← SkillsBench , skillsbench (대표 표기 'SkillsBench')
[study] study_path 선언 페이지: 1  ·  단계: 2  ·  미해석 참조: 0  ✓
[graph] nodes: 122  ·  edges: 628
[build] copied wiki/assets → dist/assets
[build] copied site chrome + fonts → dist/static
[render] pages rendered: 122
[render] tag pages rendered: 706 (+ /tags/ index)
[render] graph page rendered: 7 category groups
[render] about page rendered
[links] unresolved wikilinks: 0  ✓
[build] done.
```

`dates.mjs self-check ✓`. `[study]` 한 줄이 늘었고 정보성 로그다. **경고는 하나도 늘지 않았다.**

| 항목 | Phase 5 | Phase 6 | 변화 이유 |
|---|---|---|---|
| wiki pages / catalog / sections | 121 / 121 / 8 | **122 / 122 / 8** | overview 1개 추가 + `index.md` 엔트리 |
| graph nodes / edges | 121 / 626 | **122 / 628** | 새 노드 1개, VLM3·TaskMem 링크 2개 |
| pages rendered | 121 | **122** | 위와 동일 |
| 태그 | 700 / 1,314 links | **706 / 1,322 links** | 신규 6종(`physical-ai`·`vla`·`world-model`·`robot-learning`·`sim2real`·`roadmap`) |
| 태그 페이지 | 700 (+ 인덱스) | **706 (+ 인덱스)** | 위와 동일 |
| dist HTML | 825 | **832** (52 MB) | 위키 1 + 태그 6 |
| Pagefind pages / words | 121 / 34,084 | **122 / 34,274** | 새 페이지 본문 |
| Pagefind filters / sorts | 2 / 0 | 2 / 0 | 변화 없음 |
| unresolved wikilinks / `[about] WARN` | 0 / 0 | 0 / 0 | — |
| 카테고리 불일치 / 중복 stem / 카탈로그 고아 / 미인덱스 | 0 | 0 | — |
| merged slugs | 3 | 3 | 신규 태그 충돌 없음 |

`dist/overviews/physical-ai-overview/index.html` 마크업:

```html
<h2 id="학습-경로">학습 경로</h2>
<ol class="study-path">
<li class="study-step"><span class="study-n">1</span><a class="study-link" href="/llms/cai-...">VLM3 (Native 3D Learners)</a><p class="study-note">…</p></li>
<li class="study-step"><span class="study-n">2</span><a class="study-link" href="/agents/zou-...">TaskMem (Task-Focused Memorization)</a><p class="study-note">…</p><p class="study-prereq"><span class="study-prereq-label">선수</span><a class="study-prereq-link" href="/llms/cai-...">VLM3 (Native 3D Learners)</a></p></li>
</ol>
```

헤딩이 남아 목차 rail·모바일 `<details>` 양쪽에 `href="#학습-경로"`가 들어갔다. 본문 목록의 wikilink 2개는 사이트에서 사라졌고(남은 wikilink 5개 = 표 2 + 관련 페이지 3) `.md` 원문에는 그대로라 Obsidian은 목록으로 읽는다. 그래프 엣지는 `page.body` 기준이라 splice와 무관하게 2개가 만들어졌다. `class="study-path"`가 붙은 산출물은 이 한 페이지뿐이라 study_path 없는 121개는 마크업이 그대로다.

**깨진 참조 테스트** — `study_path` 맨 앞에 `physical-ai/rt-2-does-not-exist`(+ `prereq: physical-ai/also-missing`)를 일부러 넣고 빌드했다.

```
[study] study_path 선언 페이지: 1  ·  단계: 3  ·  미해석 참조: 2
[study]   WARN overviews/physical-ai-overview: physical-ai/rt-2-does-not-exist | physical-ai/also-missing
[render] pages rendered: 122
[links] unresolved wikilinks: 0  ✓
```

빌드는 성공(exit 0)했고 나머지 단계는 정상 렌더됐다. 깨진 단계는 `<span class="study-link wikilink-missing" title="미해석 학습 경로 참조">physical-ai/rt-2-does-not-exist</span>`로 나가고 prereq도 같은 처리다. 확인 후 백업에서 되돌려 `미해석 참조: 0 ✓`로 복귀한 것까지 확인했다.

`BASE=/ai-wiki` 빌드에서 `href="/ai-wiki/llms/cai-.../"`·`href="/ai-wiki/agents/zou-.../"`로 단계 링크와 선수 링크가 모두 접두된다. 경고 0. 확인 후 기본 빌드로 되돌렸다.

프리뷰(4173) 200 확인: `/` `/overviews/physical-ai-overview/` `/graph/` `/tags/` `/about/` `/tags/physical-ai/` `/tags/vla/`. Pagefind는 122페이지·34,274단어·filters 2를 인덱싱했다. 확인 후 서버 종료.

오케스트레이터 재검증: 빌드 콘솔이 위와 동일하고 `dates.mjs self-check ✓`. `dist` HTML 832개, `dist/overviews/physical-ai-overview/index.html`에 `class="study-step"` 2개. 인용된 두 페이지(`wiki/llms/cai-2026-vlm3-vision-language-models.md`·`wiki/agents/zou-2026-task-focused-memorization-multimodal-agents.md`)가 실재함을 파일 존재로 확인했다 — THE FOUR RULES상 저장소에 없는 자료를 인용하지 않았다. `_workspace/`(humanize 산출물)는 `.gitignore:7`에 이미 걸려 있어 커밋에 들어가지 않는다.

#### 남은 사람 확인 항목

- **스텝 컴포넌트 육안 확인이 최우선이다.** 다크·라이트에서 번호 원(`--surface` 배경 + `--signal-dim` 보더)이 본문 리딩 컬럼 왼쪽 여백(`--space-12`)에 제대로 앉는지, 위아래 hairline이 `.prose`의 다른 요소와 충돌하지 않는지
- 640px 이하에서 번호 원이 1.6rem으로 줄고 들여쓰기가 `--space-8`로 좁아진다. 제목이 두 줄로 감길 때 번호와 첫 줄 baseline이 어긋나 보이는지
- `.study-prereq`가 flex라 선수 페이지가 3개 이상이면 라벨과 링크가 여러 줄로 감긴다. 지금은 1개뿐이라 실측이 안 됐다
- physical 도메인 페이지가 학습 경로를 선언했을 때 번호 원과 링크 호버가 앰버로 나오는지. 지금 이 페이지는 `overviews`라 아쿠아다(Phase 8 이후 확인 대상)
- `## 학습 경로` 섹션에 목록 말고 산문을 적으면 사이트에서 통째로 사라진다. 지금은 그 문단을 헤딩 위로 올려 뒀지만, 앞으로 이 관례를 CLAUDE.md에 한 줄 적을지 판단이 필요하다
- 학습 경로 단계 제목이 `index.md`의 표시명을 따라간다. 카탈로그 표시명이 짧게 정리돼 있으면 단계 목록이 읽기 좋지만, 표시명이 없는 페이지는 frontmatter `title` 전문이 그대로 나온다
- overview 본문의 `## 이 페이지의 한계`가 "지금은 자료가 없다"를 세 곳(요약·현황 표·한계)에서 반복한다. 자료가 들어오면 중복을 줄일 지점이다
- 태그 6종이 새로 생겼는데 전부 페이지 1개짜리다. `/tags/vla/` 같은 페이지가 이 로드맵 하나만 담는 게 어색하지 않은지 — 자료가 들어오기 전 씨앗으로 둔 판단이다

### Phase 7 — 디자인 문서 개정과 검증 ✅ 완료 (2026-08-03)

- [x] `DESIGN.md` v3.0 — frontmatter `colors`에 도메인 토큰 추가, `components`에 태그 페이지·그래프 페이지·스텝 컴포넌트 추가
- [x] `DESIGN.md`의 "The Signal Principle"을 "도메인당 강조색 1개, 전역 크롬은 아쿠아 고정"으로 개정하고 Don'ts의 두 번째 강조색 금지 항목을 개정 이유와 함께 갱신
- [x] `DESIGN.md` Known Gaps 갱신
- [x] 전체 빌드·프리뷰 검증 (아래 검증 절차)

#### 실행 기록

변경 파일은 `DESIGN.md` 하나다(+178 / −28). 코드는 건드리지 않았다.

문서 언어부터 확인했다. `DESIGN.md`는 영문 문서이고 한글은 식별자(`## 학습 경로`·`태그`·`그래프`·`원문 · 소스`) 34자뿐이다. 그래서 신규 산문도 영문으로 썼고 `humanize-korean`은 대상이 아니다 — 한글 산문 1,000자 기준은 애초에 적용되지 않는다.

frontmatter는 `version: 2.0 → 3.0`, `updated: 2026-08-03` 신설, `description` 전면 재작성이다. `colors`에 `signal-physical`·`signal-physical-dim`을 다크·라이트 4개 키로 넣었고, 카테고리 목록·기제·단일 소스를 담은 `domains:` 블록을 새로 뒀다. `components`는 16개 → 26개다. 신규 10개는 `band-empty`·`search-facets`·`tags-page`·`tag-cloud`·`tag-detail`·`wiki-tags`·`graph-explorer`·`graph-status`·`graph-list`·`study-path`이고, 값은 전부 `styles.css`·`templates.mjs`에서 실제로 읽은 것이다(캔버스 높이 `clamp(22rem,60vh,40rem)`, 태그 클라우드 4단계 임계값 `1/≥2/≥5/≥10`, `.study-n` 2rem→1.6rem 등). 기존 `site-header`·`home-filter` note도 실제 마크업에 맞춰 고쳤다 — 헤더에 `태그`·`그래프`가 늘었고 필터 칩이 `data-domain`을 든다.

**Signal Principle 개정의 논리.** "강조색은 아쿠아 하나"를 "도메인당 강조색 하나"로 바꾸되, 화면 어느 지점에서도 강조색이 하나라는 성질은 유지된다는 점을 논지의 축으로 삼았다. 바뀐 건 강조색의 개수가 아니라 *어느 색인지를 스코프가 정한다*는 부분이다. 문서에 세 가지를 근거로 적었다. 기제는 토큰 재지정 한 블록이고 컴포넌트는 `var(--signal)`만 읽는다는 것, 스코프가 붙는 지점을 표로 열거한 것(`<main>` / 밴드 / 필터 칩 / 태그 그룹 / 그래프 그룹, 그리고 헤더·푸터·검색 모달은 **절대 안 붙음**), 크롬 제외가 관례가 아니라 구조라는 것 — `layout()`에서 헤더·푸터가 `<main>`의 형제라 도메인 스코프가 닿을 수 없다.

**Don'ts는 지우지 않고 이력을 남겼다.** 첫 항목이 v2.0까지 절대 금지였음을 인용하고, 그 금지가 막으려던 실패 모드(상태색→카테고리색→브랜드색이 쌓여 강조가 무의미해지는 표류)를 적은 뒤, 무엇이 바뀌어 예외가 생겼는지를 썼다 — 저장소가 두 주제를 담게 됐고 앰버는 그 사실 하나만 인코딩한다. 이어서 새 금지선 4개를 별도 항목으로 세웠다. 세 번째 강조색 금지 / 한 도메인에 두 번째 색 금지, 전역 크롬 착색 금지, 컴포넌트가 `--signal-physical`을 직접 읽는 것 금지(캔버스 스크립트만 예외 — cascade가 안 되므로), 색 판정용 카테고리 목록 하드코딩 금지(Phase 5가 지운 중복). Iteration Guide에도 항목 3을 새로 넣어 도메인 추가 시 손댈 두 지점을 못박았다.

Known Gaps는 4개 묶음으로 재편했다. Accessibility / Structure and scale / Token hygiene / **Resolved in v3.0**이다. 마지막 묶음에 캔버스 카테고리 목록 이중 관리(Phase 5 해소)와 태그가 장식이었던 문제(Phase 4 해소)를 취소선으로 남겼다.

라이트 아쿠아 미달은 Phase 2 수치를 그대로 옮기되 직접 재계산해 대조했다 — `#0fb89b`는 bg 2.37 · surface 2.52 · surface-2 2.26으로 4.5:1도 3:1도 못 넘는다. 신규 앰버가 전 조합 통과(다크 7.97~9.66 · 라이트 4.53~5.04)라 "새로 넣은 색이 접근성이 좋고 기존 색이 아니다"라는 구도를 문서에 명시했다. 손대지 않은 이유(주 강조색 재선정은 도메인 추가의 부수 효과일 수 없다)와 수정 시 필요한 값도 적었는데, **초안에 쓴 `#0a8f78`이 실제로는 3.63~4.03이라 4.5:1을 못 넘긴다는 걸 검산에서 잡아 `#0d7a68`(4.72~5.25)로 고쳤다.** 문서가 통과 못 하는 값을 해법으로 제시할 뻔했다.

Phase 4~6의 미해결 항목 중 디자인 관점에서 살아 있는 것은 Known Gaps로 승격했다 — 706개 태그 클라우드 길이(70%가 1회짜리), 카드 stretched-link 구조 변경의 회귀 위험, 561~700px 헤더 밀집(v3.0에서 버튼 2개 증가), 그래프 도메인 범례 부재, `## 학습 경로`에 산문을 쓰면 사이트에서 사라지는 제약, 그리고 기존 계획서 Known Gaps에 있던 이미지 `width`/`height` 누락(CLS).

**"Pending Visual Review" 절을 새로 뒀다.** 이 세션이 헤드리스라 판정할 수 없는 10개 항목을 "open, not passed"로 명시했다. 통과했다고 적지 않았다.

##### 부수 수정 1건 (기존 결함)

`DESIGN.md` frontmatter가 js-yaml로 파싱되지 않았다. `description`이 따옴표 없는 plain scalar인데 본문에 `role: Space Grotesk`처럼 콜론+공백이 들어 있어서다. `git show HEAD:DESIGN.md`로 대조해 **v2.0에서도 이미 깨져 있던 기존 결함**임을 확인했다. 빌드가 이 파일을 읽지 않아(`site/lib`·`build.mjs`·워크플로 전수 grep에서 `DESIGN` 참조 0건) 무해했지만, 이번에 기계가 읽을 만한 `domains:` 구조를 넣었으므로 `description` 값을 큰따옴표로 감쌌다. 값 문자열은 한 글자도 안 바뀌었고(내부에 `"`·`\` 없음을 assert로 확인) 이후 `gray-matter`로 정상 파싱된다.

#### 전체 검증

```
[build] BASE='(local)'  ROOT=/Users/kmyu/Desktop/project/ai-wiki
[content] wiki pages: 122  ·  catalog entries: 122  ·  sections: 8
[tags] tags: 706  ·  page-tag links: 1322  ·  merged slugs: 3
[tags]   merged 'rag' ← rag , RAG (대표 표기 'rag')
[tags]   merged 'swe-bench' ← SWE-bench , swe-bench (대표 표기 'SWE-bench')
[tags]   merged 'skillsbench' ← SkillsBench , skillsbench (대표 표기 'SkillsBench')
[study] study_path 선언 페이지: 1  ·  단계: 2  ·  미해석 참조: 0  ✓
[graph] nodes: 122  ·  edges: 628
[build] copied wiki/assets → dist/assets
[build] copied site chrome + fonts → dist/static
[render] pages rendered: 122
[render] tag pages rendered: 706 (+ /tags/ index)
[render] graph page rendered: 7 category groups
[render] about page rendered
[links] unresolved wikilinks: 0  ✓
[build] done.
```

`dates.mjs self-check ✓`.

| 항목 | Phase 6 | Phase 7 |
|---|---|---|
| wiki pages / catalog / sections | 122 / 122 / 8 | 122 / 122 / 8 |
| graph nodes / edges | 122 / 628 | 122 / 628 |
| pages rendered | 122 | 122 |
| 태그 / page-tag links / merged | 706 / 1,322 / 3 | 706 / 1,322 / 3 |
| 태그 페이지 | 706 (+ 인덱스) | 706 (+ 인덱스) |
| study_path 페이지 / 단계 / 미해석 | 1 / 2 / 0 | 1 / 2 / 0 |
| dist HTML | 832 | 832 |
| unresolved wikilinks / `[about] WARN` | 0 / 0 | 0 / 0 |
| 카테고리 불일치 / 중복 stem / 카탈로그 고아 / 미인덱스 | 0 | 0 |
| Pagefind pages / words / filters / sorts | 122 / 34,274 / 2 / 0 | 122 / 34,274 / 2 / 0 |

**전 수치 동일. 경고 신규 0건.** 문서만 고쳤으니 그래야 맞다.

`BASE=/ai-wiki` 빌드도 경고 0이고 `data-graph="/ai-wiki/graph.json"` · `data-base="/ai-wiki/"` · 헤더 `/ai-wiki/tags/`·`/ai-wiki/graph/` · `src="/ai-wiki/static/js/graph-core.js"`·`graph-explorer.js` · 학습 경로 단계 링크 `/ai-wiki/llms/...`·`/ai-wiki/agents/...`가 모두 접두된다. 홈·그래프·태그 인덱스에서 미접두 잔여 0건. 확인 후 기본 빌드로 되돌렸다.

프리뷰(4173) 200 확인 16경로: `/` `/about/` `/graph/` `/graph.json` `/tags/` `/tags/rag/` `/tags/vla/` `/tags/physical-ai/` `/tags/swe-bench/` `/overviews/physical-ai-overview/` `/agents/lee-hoyeon-2026-harness-engineering/` `/llms/cai-2026-vlm3-vision-language-models/` `/pagefind/pagefind.js` `/pagefind/pagefind-entry.json` `/static/js/graph-core.js` `/static/js/graph-explorer.js`. 확인 후 서버 종료.

오케스트레이터 재검증: 빌드 콘솔과 `dates.mjs self-check ✓`가 위와 동일하다. `gray-matter`로 `DESIGN.md` frontmatter를 실제 파싱해 `version: 3` · `updated: 2026-08-03` · colors 22키(`signal-physical` 계열 포함) · `domains:` 블록 존재 · components 26개를 확인했다. Don'ts 첫 항목에 v2.0 금지 원문 인용과 개정 이유가 남아 있고 새 금지선 4개가 뒤따른다. `git status`는 `M DESIGN.md` 한 줄이다.

##### 계획서 "프리뷰에서 확인할 것" 9개 항목별 판정

| # | 항목 | 판정 | 근거 |
|---|---|---|---|
| 1 | 홈 3번째 밴드 = Physical AI · 앰버 · 준비 중 | **정적 확인** (색은 육안) | 밴드 순서가 recent → database → llms → **physical-ai** → agents…로 `index.md` 순서 그대로다(카테고리 밴드 기준 3번째, 렌더 섹션 기준 4번째). 마크업 `<section class="band band-empty" id="physical-ai" data-band="physical-ai" data-domain="physical">`에 `band-empty-note` 1건 |
| 2 | 필터 칩 physical-ai 클릭 · `#physical-ai` 해시 진입 | **정적 확인** (동작은 육안) | 칩 `<a class="filter-chip" href="#physical-ai" data-filter="physical-ai" data-domain="physical" role="button" aria-pressed="false">` 존재, 앵커 대상 밴드 실재. JS 없이도 앵커 점프가 성립 |
| 3 | 히어로 캔버스 physical 노드 색 | **확인 불가 — 자료 대기** | physical-ai 페이지 0개라 `graph.json`에 `domain:'physical'` 노드가 없다. dist 전체에서 `data-domain="physical"`이 나오는 파일은 `index.html`(빈 밴드+칩) 하나뿐. Phase 8 이후 항목 |
| 4 | wiki → 태그 칩 → 태그 페이지 → 카드 → 원 페이지 왕복 | **정적 확인 (완전)** | `applications/dnotitia-akb`가 `/tags/{slug}/` 링크를 하단 `nav.wiki-tags`로 내보내고, `/tags/pgvector/`가 `class="card-link" href="/applications/dnotitia-akb/"`로 되돌아온다 |
| 5 | `/tags/` `/graph/` 직접 접근 + BASE 빌드 경로 | **정적 확인 (완전)** | 위 200 목록 + BASE 접두 검증. `/graph/`에 `role="img"` · 필터 칩 8개(전체+7) · `graph-group` 7개 |
| 6 | ⌘K 카테고리 패싯이 결과를 줄이는지 | **부분 정적** (실제 축소는 육안) | Pagefind가 filters 2를 인덱싱하고 `dist/pagefind/filter/`에 인덱스 파일 2개가 나온다. `data-pagefind-filter="category:*"` 페이지 수가 Agents 49 · Applications 31 · Database 25 · Overviews 10 · LLMs 3 · Etc 2 · Evaluations 2 = **122**로 전 페이지를 겹침 없이 분할한다. `search.js`에 `pagefind.filters()`·`facet-chip`·`totalFilters` 참조 9건 |
| 7 | 다크·라이트 토글 · 두 테마 앰버 대비비 | **대비비 정적 재계산 / 토글은 육안** | WCAG 2.x 상대휘도로 직접 재계산: 앰버 다크 9.66/8.81/7.97 · 라이트 4.74/5.04/4.53 전부 통과, 아쿠아 라이트 2.37/2.52/2.26 미달(Known Gaps 등재) |
| 8 | 640 / 1024 / 1080px 브레이크포인트 | **육안 필요** | CSS 미디어쿼리 존재는 확인했으나 레이아웃 판정은 렌더링 필요 |
| 9 | About 분류 목록의 physical-ai 링크 | **정적 확인 (완전)** | `dist/about/index.html`에 `<a class="wikilink" href="/#physical-ai">Physical AI</a>`, BASE 빌드에서 `/ai-wiki/#physical-ai`로 접두 |

##### `deploy.yml` 경로 트리거 확인 (계획서 530행 검증)

파일을 열어 확인했다. `on.push.paths`는 `wiki/**` · `index.md` · `README.md` · `CLAUDE.md` · `site/**` · `.github/workflows/deploy.yml` 6개다. 계획서가 주장한 `wiki/**`·`index.md`·`site/**`는 실제로 들어 있고 워크플로 수정은 불필요하다.

다만 **Phase 7 변경만으로는 배포가 트리거되지 않는다.** `DESIGN.md`도 `temp-docs/**`도 목록에 없다. 이건 의도된 동작이다(주석이 "문서 전용 변경은 무시"라고 적고 있다). Phase 5·6 푸시에서 `site/**`·`wiki/**`·`index.md`가 이미 나갔으므로 사이트 배포는 그때 걸렸다. Phase 7 커밋 이후 재배포가 필요하면 `workflow_dispatch`로 수동 실행한다.

#### 남은 사람 확인 항목 (Phase 2~7 누적)

전부 `DESIGN.md`의 "Pending Visual Review" 절에 영문으로도 남겼다.

**최우선 — 회귀 위험 순**

- **카드 stretched-link 구조 변경**(Phase 4). 다크·라이트에서 카드 전체 클릭, 호버 보더 + `translateY(-2px)`, 키보드 Tab 포커스(`:focus-visible` → `:focus-within` 전환), 칩만 눌렀을 때 카드가 아니라 태그 페이지로 가는지
- **그래프 배치 육안 확인**(Phase 5). 클러스터가 읽히는지, FR 상수(`k`·`TEMP 0.16`·`GRAV 2.0`·300 iteration) 조정 필요 여부
- **스텝 컴포넌트 육안 확인**(Phase 6). 번호 원이 리딩 컬럼 왼쪽 여백에 앉는 위치, 위아래 hairline이 `.prose` 다른 요소와 충돌하는지

**레이아웃·브레이크포인트**

- 561~700px 헤더 밀집. Phase 4에서 태그 버튼, Phase 5에서 그래프 버튼이 늘어 워드마크와 붙는지 — ≤560px 붕괴 임계값을 올려야 할 수 있다
- 640 / 1024 / 1080px에서 태그 인덱스·태그 상세·그래프 페이지·스텝 레이아웃
- 640px 이하 스텝: 번호 원 1.6rem, 들여쓰기 `--space-8`. 제목이 두 줄로 감길 때 baseline 어긋남
- 빈 밴드 안내 박스 세로 여백(`--space-6` 상하)이 카드 그리드 자리와 비교해 허전한지
- ⌘K 패싯 줄이 모달 `max-height:70vh`를 얼마나 먹는지, 640px 이하에서 칩 7개가 몇 줄로 감기는지
- 모바일 360px 그래프 겹침 18쌍. 노드 반경 하한 `0.72`나 캔버스 높이 `clamp(18rem,52vh,26rem)` 조정 여부
- 축별 정규화로 1440px 같은 넓은 화면에서 타원이 과하게 퍼지는지

**색·대비**

- 다크·라이트 육안 확인 전반. 라이트 앰버가 4.53~5.04로 통과선에 가깝다
- 빈 밴드 점선 보더가 `--signal-dim`(라이트 알파 0.18)이라 실제로 보이는지
- 캔버스 호버 라벨이 다크·라이트 양쪽에서 읽히는지, 긴 제목 클리핑
- **라이트 아쿠아 `#0fb89b` 미달을 고칠지 여부.** 고친다면 `#0d7a68` 수준까지 어둡게 가야 하고 활성 칩 채움색까지 같이 어두워진다 — 사이트 인상이 바뀌는 결정

**콘텐츠 대기 (Phase 8 이후)**

- 히어로 캔버스에서 앰버 노드가 구분되는지, `globalAlpha 0.55`가 적절한지
- 활성 필터 칩(`color: var(--bg)` on 앰버)이 physical 도메인에서 읽히는지
- physical wiki 페이지에서 헤더·푸터·검색 모달이 아쿠아를 유지하는지
- `.tag-cloud-item[data-size='4']`가 physical 그룹에서 앰버로 나오는지
- core 태그 페이지에 physical 페이지 카드가 섞였을 때 카드가 아쿠아로 나오는 게 어색한지
- physical 페이지가 학습 경로를 선언했을 때 번호 원·링크 호버가 앰버로 나오는지
- 그래프 도메인 범례를 넣을지 — 색만으로 충분한지
- 새로 생긴 태그 6종이 전부 페이지 1개짜리다. `/tags/vla/`가 로드맵 하나만 담는 게 어색하지 않은지

**정책 판단**

- `## 학습 경로` 섹션에 산문을 쓰면 사이트에서 사라진다. 이 관례를 `CLAUDE.md`에 적을지
- 706개 태그 클라우드에 빈도 하한을 두고 접을지
- 학습 경로 단계 제목이 `index.md` 표시명을 따르는데, 표시명 없는 페이지는 frontmatter `title` 전문이 그대로 나온다
- `.study-prereq`가 flex라 선수 페이지 3개 이상이면 여러 줄로 감긴다 — 미실측
- 터치 두 번 탭 규칙이 상태줄 링크만으로 발견 가능한지
- overview 본문의 `## 이 페이지의 한계`가 "자료 없음"을 세 곳에서 반복한다

### Phase 8 — 첫 physical-ai 자료 적재

- [ ] 첫 자료(논문 PDF·repo·강의) 확보
- [ ] CLAUDE.md의 6-step 파이프라인대로 ingest — raw → Step 2.5 도식 추출 → sources → 큐레이션 확인 → wiki
- [ ] `index.md` physical-ai 섹션에 엔트리 추가 → 준비 중 밴드가 카드 그리드로 전환되는지 확인
- [ ] overview 허브의 `study_path`에 편입

---

## 검증 방법 (Verification)

```bash
cd site
npm run build                      # 콘솔: 카테고리 불일치 0, unresolved 링크가 Phase 0 기준선 대비 늘지 않음
node lib/dates.mjs --check         # 날짜 파서 자체 점검
npm run preview                    # http://localhost:4173 (pagefind 인덱스 포함)
```

프리뷰에서 확인할 것:

- 홈 3번째 밴드가 `Physical AI`이고 앰버 색이며, 자료 적재 전에는 준비 중 상태로 나온다
- 필터 칩에서 physical-ai를 눌렀을 때, 그리고 `#physical-ai` 해시로 직접 들어갔을 때의 동작
- 히어로 캔버스에서 physical 노드가 다른 색으로 보인다 (자료 적재 후)
- 아무 wiki 페이지 → 태그 칩 클릭 → 태그 페이지 → 카드에서 다시 원 페이지로 왕복
- `/tags/`, `/graph/` 직접 접근, 그리고 `BASE=/ai-wiki`로 빌드했을 때 경로가 깨지지 않는지
- ⌘K 검색에서 카테고리 패싯이 결과를 실제로 줄이는지
- 다크·라이트 토글, 두 테마에서 앰버 대비비
- 640 / 1024 / 1080px 브레이크포인트에서 신규 페이지 레이아웃
- About 페이지 분류 목록에 physical-ai가 있고 링크가 살아 있는지

배포는 `main` 푸시 시 `.github/workflows/deploy.yml`이 자동으로 처리한다. 경로 트리거에 `wiki/**`·`index.md`·`site/**`가 이미 들어 있어 워크플로 수정은 필요 없다.

---

## 원문 보존 원칙

- 원본 자료(`raw/`)는 불변, `sources/`·`wiki/`가 단일 소스, 사이트는 읽기 전용 렌더러다. 이 방향을 뒤집지 않는다.
- 사이트에 새 런타임 의존성을 넣지 않는다. 바닐라 JS + 4개 빌드 의존성 구성을 유지한다.
- The Four Rules는 그대로다. 사용자가 자료 수집을 명시적으로 지시한 경우 외에 웹을 조회하지 않는다.
- 새로 쓰는 한글 산문은 `humanize-korean`을 거친다.

---

## Known Gaps (의도적 보류)

- **index.md 드리프트 CI 강제** — 이번엔 빌드 경고로만 둔다. Phase 1에서 기존 누락 2건은 손으로 채운다.
- ⚠️ **이미지 `width`/`height`** — `markdown.mjs`의 `transformFigures()`가 치수를 안 넣어 도식 많은 페이지에 레이아웃 이동(CLS)이 있다. 이번 범위 밖.
- **태그 정규화** — `graph-rag`/`graphrag` 같은 기존 중복은 그대로 둔다. 통제 어휘는 physical-ai에만 적용한다.
- **홈·About 페이지 검색 미인덱스** — `data-pagefind-body`가 wiki 아티클에만 있다. 유지.
- **하위 폴더 중첩** — physical-ai가 40페이지를 넘기 전까지 검토하지 않는다.
