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

### Phase 5 — 전체 그래프 페이지

- [ ] `constellation.js`에서 그래프 그리기 공통 로직 분리
- [ ] `site/assets/js/graph-explorer.js` 작성 (도메인 색·degree 크기·호버 이웃 강조·클릭 이동)
- [ ] `templates.mjs`에 `graphPage()` + `build.mjs`에서 `dist/graph/index.html` 렌더
- [ ] 카테고리 칩 필터 + 해시 동기화 (`filter.js` 패턴)
- [ ] 헤더 네비에 진입점 추가
- [ ] 모바일에서의 동작·성능 확인

### Phase 6 — 학습 경로

- [ ] `content.mjs`: `study_path` 파싱 + `resolve()`로 각 단계 검증, 깨진 참조는 빌드 콘솔 리포트
- [ ] `templates.mjs`: `studyPathSection()` 렌더 (번호 단계 · 한 줄 이유 · 선수 지식 링크)
- [ ] `styles.css`에 스텝 컴포넌트 스타일
- [ ] `wiki/overviews/physical-ai-overview.md` 작성 — 학습 로드맵 겸 MOC 허브. frontmatter `study_path` + 본문 `## 학습 경로` wikilink 목록 병기
- [ ] `index.md` overviews 섹션에 엔트리 추가

### Phase 7 — 디자인 문서 개정과 검증

- [ ] `DESIGN.md` v3.0 — frontmatter `colors`에 도메인 토큰 추가, `components`에 태그 페이지·그래프 페이지·스텝 컴포넌트 추가
- [ ] `DESIGN.md`의 "The Signal Principle"을 "도메인당 강조색 1개, 전역 크롬은 아쿠아 고정"으로 개정하고 Don'ts의 두 번째 강조색 금지 항목을 개정 이유와 함께 갱신
- [ ] `DESIGN.md` Known Gaps 갱신
- [ ] 전체 빌드·프리뷰 검증 (아래 검증 절차)

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
