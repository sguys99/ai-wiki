# AI Wiki → GitHub Pages 웹사이트 (사양과 이력)

`ai-wiki`(Karpathy LLM Wiki 패턴 기반 개인 AI 지식 베이스)를 **저장소 자체의 GitHub Pages**로
배포해 웹·모바일에서 `index.md` 카탈로그를 둘러보고 개별 wiki 페이지를 읽게 한다.
원본 콘텐츠(`wiki/`, `sources/`, `raw/`, `index.md`)는 **단일 소스로 유지하며 읽기 전용**이고,
빌드 산출물만 새로 만든다.

이 문서는 두 층이다. 앞의 **현행 사양**은 지금 배포되는 사이트의 스냅샷이고, 뒤의
**착수 시점 결정 · 아키텍처 · Phase 이력**은 그 사이트가 만들어진 경위다. 이력의 수치는
그 시점의 기록이므로 고치지 않는다.

정본의 위치는 셋으로 갈린다. 시각 설계는 `DESIGN.md`(v3.0), 콘텐츠 규칙은 `CLAUDE.md`,
수집·작성 명령은 `.claude/skills/`의 세 스킬이다. 이 문서는 그 셋을 다시 설명하지 않는다.

**배포 URL**: `https://sguys99.github.io/ai-wiki/`

---

## 현행 사양 (2026-09-27 측정)

### 규모

카운트는 이 절에만 둔다. 다른 절과 이력 메모의 숫자는 그 시점 기록이다.

| 항목 | 값 | 확인 방법 |
|---|---|---|
| wiki 페이지 | 293 | 빌드 콘솔 `[content] wiki pages` |
| 카탈로그 항목 | 293 (섹션 8) | 빌드 콘솔 `[content] catalog entries` |
| 카테고리 분포 | physical-ai 127 · agents 72 · applications 35 · database 26 · llms 13 · overviews 13 · evaluations 5 · etc 2 | 빌드 콘솔 `[content] sections` |
| 태그 | 916 (page-tag 링크 2,242 · 병합 slug 4) | 빌드 콘솔 `[tags]` |
| 학습 경로 | 선언 페이지 8 · 단계 64 · 미해석 0 | 빌드 콘솔 `[study]` |
| 그래프 | 노드 293 · 엣지 2,222 | 빌드 콘솔 `[graph]` |
| 태그 페이지 | 916 (+ `/tags/` 인덱스) | 빌드 콘솔 `[render]` |
| wiki 자산 | 162 디렉토리 · 888 이미지 | `find wiki/assets -type f` |

```bash
cd site && npm run build        # 위 지표 전부를 콘솔에 찍는다
```

### 기술 스택과 명령

프레임워크 없는 커스텀 Node 빌드다. Node 24, 런타임 의존성은 `marked` · `gray-matter` ·
`katex` · `marked-katex-extension` 넷이고, `pagefind` · `serve` · 폰트 패키지 3종이 devDependency다.

| 명령 | 동작 |
|---|---|
| `npm run build` | `dist/` 생성 (BASE 없음, 로컬용) |
| `npm run build:strict` | `STRICT=1` — 카탈로그 가드 위반 시 빌드 실패 |
| `npm run build:deploy` | `STRICT=1 BASE=/ai-wiki` + `pagefind` 인덱싱 (Actions가 쓴다) |
| `npm run preview` | 빌드 + pagefind + `serve ../dist -l 4173` |

### 라우트

| 경로 | 내용 |
|---|---|
| `/` | 홈 — 히어로 constellation, 카테고리 필터바, 카드 밴드 |
| `/{category}/{stem}/` | wiki 페이지 293개 |
| `/tags/` · `/tags/{slug}/` | 태그 인덱스와 태그별 목록 |
| `/graph/` | 전체 그래프 탐색기 |
| `/about/` | 프로젝트 소개 |
| `/graph.json` · `/pagefind/` | 그래프 데이터, 검색 인덱스 |

### lib 모듈

| 모듈 | 역할 |
|---|---|
| `content.mjs` | wiki frontmatter 글롭 + `index.md` 카탈로그 머지, 태그 인덱스, `study_path` 해석, 링크 리졸버 |
| `markdown.mjs` | `marked` 설정, `[[wikilink]]`·`![[embed]]` 재작성, heading id와 TOC 추출, KaTeX, `spliceStudyPath` |
| `graph.mjs` | `[[…]]` 인접 파싱 → nodes/edges/degree (노드에 `domain` 필드) |
| `nav.mjs` | `prevNext`와 `neighborhood` 두 함수뿐이다. 카테고리 그룹핑은 `content.mjs`, TOC 추출은 `markdown.mjs` 소관 |
| `templates.mjs` | `layout` / `home` / `wiki` / `about` / `tagIndex` / `tag` / `graphPage` / `studyPathSection` |
| `config.mjs` | `BASE` · `STRICT` · `href` · `absUrl` · `RECENT_DAYS`(14) |
| `about.mjs` | About 본문. **자동 추출이 아니라 수기 한글(해요체)** 이다 |
| `dates.mjs` | git 최초 커밋일(rename 승계) → 홈 정렬과 NEW 뱃지 |
| `domains.mjs` | 카테고리 → `core`/`physical` 도메인 맵. 미등록 카테고리는 `core` |

### 카탈로그 계약

`index.md` 한 줄 문법은 `- [[category/stem|표시 이름]]: 한 줄 설명 (YYYY, type)` 하나다.

- 구분자 정본은 `]]: `다. 레거시 `]] — `도 파싱은 되지만 `legacy-separator` issue로 표시된다.
- 파싱은 head + tail 2단이다. 머리는 링크와 구분자, 꼬리는 말미 `(YYYY, type)`에 앵커한다. 표시 이름은 lazy 매치라 `]`를 포함할 수 있다.
- `STRICT=1`에서 빌드를 **실패시키는 조건은 둘**이다. ① 절 안 `- [[` 줄이 머리 문법과 안 맞아 카드에서 빠지는 경우 ② 어떤 섹션의 카드가 0개인데 `wiki/{slug}/`에는 페이지가 있는 경우. 그 밖(꼬리 누락, 레거시 구분자, 미등재 페이지, 깨진 study_path 참조)은 경고만 하고 통과한다.
- 소비자가 셋이다. `index.md` 머리의 문법 선언 · `site/lib/content.mjs` · `scripts/lint_index.py`. 문법을 바꾸면 셋을 함께 고치고 `npm run build:strict`로 절별 카드 수를 확인한다.

### 기능

- **홈**: 히어로 constellation(ambient drift, reduced-motion 시 정지), 카드 hover 시 그래프 이웃 강조, sticky 카테고리 필터바, 밴드 top-6 접기와 `+ 더 보기`, 전 카테고리 통합 "최근 추가" 밴드와 NEW 뱃지(14일), 빈 카테고리는 "준비 중" 밴드.
- **wiki 페이지**: 리딩 컬럼 72ch, 데스크톱 우측 TOC rail(scrollspy)과 모바일 접이식 `<details>`, 상단 진행바, figure 임베드와 캡션, 관련 페이지 방사형 SVG + 텍스트 목록, 같은 카테고리 이전/다음, 원문(`raw_path`)·`sources`·이 페이지 `.md` GitHub 링크.
- **탐색**: `/tags/` 태그 클라우드(도메인별, 4단계 크기), `/graph/` force-directed 탐색기, Pagefind 모달(`Cmd/Ctrl+K`·`/`)에 category·tag 패싯 필터.
- **학습 경로**: overview의 `study_path` frontmatter를 번호 단계 컴포넌트로 렌더한다. `spliceStudyPath`는 `## 학습 경로` 절 안의 **첫 번호 목록 블록만** 교체하므로 도입 문단·다른 트랙·꼬리 문단은 그대로 남는다. 단계 수가 frontmatter와 다르면 `[study] WARN`만 찍고 빌드는 통과한다.
- **수식**: KaTeX 빌드타임 렌더 + self-host. `nonStandard` 옵션의 부작용을 막기 위해 코드 밖의 `$`+숫자를 통화로 보고 보호한다.
- **테마**: 다크 기본 + `data-theme` 라이트 오버라이드, FOUC 방지 인라인 스크립트, `prefers-reduced-motion` 전역 존중.

### 디자인 시스템

정본은 `DESIGN.md` v3.0이다. 핵심만 옮기면, 강조색은 단일 aqua가 아니라 **core(aqua) / physical(amber) 2도메인**이고,
`--signal` 토큰을 `[data-domain]` 스코프가 재지정해 링크·hover·필터칩·진행바·태그·그래프가 함께 물든다.
헤더·푸터·검색 모달 같은 전역 크롬은 도메인과 무관하게 aqua로 고정한다.

### 배포, 그리고 문서와 배포의 관계

`.github/workflows/deploy.yml` 하나가 전부다. `push(main)` + paths 필터(`wiki/**` · `index.md` ·
`README.md` · `CLAUDE.md` · `site/**` · workflow 자체)와 `workflow_dispatch`로 돌고,
checkout은 **`fetch-depth: 0`**(dates.mjs가 git 이력을 읽는다) → `npm ci` → `build:deploy` → Pages 배포다.

여기서 한 가지를 구분해야 한다. `README.md`와 `CLAUDE.md`는 **빌드 입력이 아니다.** About 본문은
`site/lib/about.mjs`에 수기로 들어 있어서 두 문서를 고쳐도 산출물은 바뀌지 않는다. 다만 paths 필터에
들어 있어 두 파일을 커밋하면 재배포가 돈다. 그래서 문서만 고친 커밋에서 배포가 실패한다면 원인은
대기 중이던 콘텐츠 문제다 — 푸시 전 `npm run build:strict` 한 번이 그 오진을 막는다.
`temp-docs/**`는 필터에 없어 배포를 트리거하지 않는다.

---

## 착수 시점 결정 (2026-06)

아래 표는 작업을 시작할 때의 결정이다. 현행과 달라진 두 행에는 주석을 달았다.

| 항목 | 결정 |
|---|---|
| 배포 | GitHub Pages (프로젝트 페이지, repo `sguys99/ai-wiki`, base path `/ai-wiki/`) |
| 기술 스택 | 커스텀 Node 빌드 (ESM + `marked` + `gray-matter`), 프레임워크 없음 |
| 콘텐츠 소스 | `wiki/**/*.md` + `index.md`를 빌드 시 직접 읽음 (복제 X, 단일 소스 유지) |
| 디자인 방향 | **Constellation (지식 그래프)** — frontend-design 신규 도출 |
| 한글 폰트 | **Pretendard** (필수, self-host) |
| 부가 기능 | 전체 검색(Pagefind) · 라이트/다크 토글 · 위키 내 TOC(scrollspy) · 교차링크/관련 페이지 |
| About | README/CLAUDE.md 기반 자동 생성 — **현행은 `site/lib/about.mjs` 수기 한글 본문** |
| 반응형 | 웹/모바일 동시 (1→2→3 col, 모바일 햄버거·접이식 TOC) |
| 콘텐츠 규모 | 당시 `wiki/` 45개 페이지 · 카테고리 7개 — **현행은 "현행 사양" 절 참조** |

**환경**: Node v24.13 · npm 11.6, 기존 웹 빌드 도구 전무(blank slate), Pretendard 미존재.

---

## 아키텍처

### 디렉터리

```
site/
  build.mjs              # 엔트리: 콘텐츠 로드 → 그래프/태그 빌드 → 렌더 → dist 출력
  lib/
    content.mjs          # 콘텐츠 로더 + 카탈로그 머지 + 태그 인덱스 + study_path + 링크 리졸버
    markdown.mjs         # marked 설정, wikilink/embed 재작성, heading id·TOC, KaTeX, study_path splice
    graph.mjs            # [[wikilinks]] 인접 파싱 → graph.json (nodes/edges/degree/domain)
    nav.mjs              # prevNext + neighborhood
    templates.mjs        # layout / home / wiki / about / tagIndex / tag / graphPage
    config.mjs           # BASE · STRICT · href · absUrl · 사이트 상수
    about.mjs            # About 본문 (수기 한글)
    dates.mjs            # git 최초 커밋일 → 정렬·NEW 뱃지
    domains.mjs          # 카테고리 → core/physical 도메인
  assets/
    css/styles.css       # @layer tokens/base/components/utilities
    js/constellation.js  # 히어로 그래프 + 카드 hover 이웃 강조
    js/graph-core.js     # force 배치 공용 코어
    js/graph-explorer.js # /graph/ 탐색기
    js/filter.js         # 홈 카테고리 필터바 + 밴드 접기
    js/search.js         # Pagefind 모달 + 패싯
    js/reader.js         # 진행바 + TOC scrollspy
    js/nav.js            # 모바일 햄버거 + 접이식 TOC
    js/theme.js          # 테마 토글 + localStorage
    img/                 # favicon.svg · og.png · og.svg
    fonts/               # 실제 woff2는 node_modules → dist/static/fonts 복사
  package.json
dist/                    # 빌드 산출물 (gitignore, Actions가 배포)
.github/workflows/deploy.yml
```

### 데이터 모델 (`content.mjs`)

- `wiki/**/*.md` glob → `gray-matter`로 frontmatter 추출이 **메타 진실원천**(title, type, year, category, tags, authors/url/org, source, figures).
- `index.md`는 카테고리 멤버십 + **한 줄 설명** + 정렬 출처로 머지한다(stem 기준). 항목 문법과 파싱 규칙은 위 "카탈로그 계약" 절이 정본이다.
- 카테고리 헤더(`## Database (database)` …)로 그룹을 만든다. 빈 카테고리는 "준비 중" 밴드로 렌더한다.
- 홈 정렬과 NEW 뱃지는 `dates.mjs`가 읽는 git 최초 커밋일을 쓴다. 그래서 Actions checkout이 `fetch-depth: 0`이어야 한다.

### 렌더링 (`markdown.mjs`)

- `gray-matter`로 frontmatter를 떼고 본문만 `marked`에 넘긴다.
- **`[[category/stem|display]]`** → `<a href="{BASE}/{category}/{stem}/">display</a>`. bare `[[category/stem]]`은 페이지 title을, `[[stem]]`은 stem→page 맵을 쓴다. `[[page#heading]]`·`[[#heading]]` 앵커, `[[category]]`→홈 밴드 앵커, `[[sources/…]]`→GitHub 원문도 해석한다. 미해석 링크는 muted span + 빌드 경고.
- **`![[assets/{stem}/figNN.png]]`** + 다음 줄 `*Figure …*` → `<figure><img …><figcaption>…</figcaption></figure>`.
- `wiki/assets/**` → `dist/assets/**` 복사. 모든 h2/h3에 안정 `id`(scrollspy·앵커).
- **수식**: `marked-katex-extension`으로 빌드타임 렌더하고 `katex.min.css`와 폰트를 `dist/static/katex/`에 self-host한다. 통화 표기(`$0.97`)가 수식으로 잡히지 않도록 코드 밖의 `$`+숫자를 먼저 보호한다.

### 그래프 (`graph.mjs`)

- 모든 wiki 페이지 본문에서 `[[…]]`를 추출해 인접 리스트를 만들고 `dist/graph.json`(`{nodes:[{id,title,category,domain,degree}], edges:[{source,target}]}`)으로 쓴다.
- 홈 히어로 · 페이지별 neighborhood · `/graph/` 탐색기가 이 JSON을 함께 소비한다. degree는 카드의 `↳ N links` 표기에도 쓴다.

### 라우팅 / base path

- 출력은 clean URL이다. 홈 `dist/index.html`, wiki `dist/{category}/{stem}/index.html`, 나머지도 같은 규칙을 따른다.
- `BASE` 상수로 로컬(`''`)과 배포(`/ai-wiki/`)를 분기해 모든 링크·에셋·폰트·Pagefind·graph.json 경로에 적용한다.

---
## 단계별 작업 계획 (체크리스트)

> 아래 체크리스트와 결과 메모의 수치(45 · 58페이지, sources 57 등)는 **그 시점 기록**이다.
> 고치지 않고 그대로 둔다. 현행 수치는 위 "현행 사양" 절을 본다.
> 이후에 해소된 항목에는 `→ 해소` 꼬리표만 덧붙였다.

### Phase 0 — 셋업 & 기반
- [x] `site/` + `package.json`(ESM, `build`/`preview` 스크립트)
- [x] 의존성: `marked`, `gray-matter`, `pagefind`(devDep), 정적 서버(`serve`)
- [x] `.gitignore`에 `dist/`, `site/node_modules/` 추가
- [x] `BASE` 환경 분기(로컬/배포) 구조 (`site/lib/config.mjs`)
- [x] 빈 `build.mjs` 스켈레톤 → `dist/` 출력 파이프라인 동작 확인

### Phase 1 — 콘텐츠 파이프라인
- [x] `lib/content.mjs`: wiki frontmatter glob + index.md 카탈로그 머지 → 정렬된 섹션 모델
- [x] 카테고리 그룹핑 + slug/url 생성 (+ `resolve()` 링크 리졸버, `categories` 맵)
- [x] `lib/markdown.mjs`: frontmatter 제거 + `marked` 렌더 + `[[wikilink]]`/`![[embed]]` 재작성 + heading id (+ TOC 추출, 코드펜스/인라인코드 보호)
- [x] `lib/graph.mjs`: `[[…]]` 인접 파싱 → `graph.json` + degree (무방향 고유이웃)
- [x] 58개 페이지 전부 누락·깨진 링크 0 콘솔 리포트 확인 (계획서의 45는 구버전 수치 — 현재 wiki 58개)

> **Phase 1 결과 메모**
> - 리졸버는 Obsidian 문법 전부 처리: `[[cat/stem|disp]]` · 베어 `[[stem]]` · 교차카테고리 고유 stem 폴백 · `[[page#heading]]`/`[[#heading]]` 앵커(heading id와 동일 슬러그) · `[[category]]`→홈 밴드 앵커 · `[[sources/…]]`/`[[../../sources/…]]`→GitHub 원문(.md).
> - `lib/nav.mjs`(prev/next + neighborhood) 선작성 — Phase 4·5에서 소비.
> - 페이지 HTML은 **INTERIM 셸**(파이프라인 검증용). Phase 2~4에서 `lib/templates.mjs`(Constellation)로 교체.
> - ⚠️ **콘텐츠 측 발견**(읽기전용, 미수정): `index.md` 카탈로그에 누락된 wiki 2건 — `database/lumer-2025-rethinking-retrieval-from-traditional-retrieval`, `database/sguys99-langchain-study-vectorless-rag`. 빌드는 자동 포함하지만 카탈로그 설명/정렬이 없음 → 추후 `index.md` 보강 권장. **→ 해소**(두 건 모두 등재, 미등재 페이지 0건).

### Phase 2 — 디자인 시스템 (CSS 토큰 · 폰트 · light/dark)
- [x] Pretendard + Space Grotesk + JetBrains Mono woff2 self-host
- [x] `styles.css` 토큰: 컬러(light/dark), 타입스케일, 간격, 반경, hairline
- [x] 본문 타이포(헤딩/문단/목록/표/인용/코드/링크/figure) — 한글 가독 line-height ~1.7
- [x] 다크모드: `prefers-color-scheme` + `[data-theme]` + FOUC 방지 인라인 스크립트
- [x] `js/theme.js` 토글 + localStorage

> **Phase 2 결과 메모**
> - **폰트 수급**: npm devDep(`pretendard` · `@fontsource/space-grotesk` · `@fontsource/jetbrains-mono`) → `build.mjs`의 `copyStatic()`이 `node_modules`→`dist/static/fonts`로 복사. git 추적은 `site/assets/css·js` + `package.json`(+lock)만.
> - **Pretendard**: variable dynamic-subset 채택 — 패키지 실경로 `pretendard/dist/web/variable/{pretendardvariable-dynamic-subset.css, woff2-dynamic-subset/}`(92개 woff2, unicode-range). 패밀리명은 `'Pretendard Variable'`. CSS 내부 url이 `./woff2-dynamic-subset/…` 상대경로라 BASE 무관.
> - **에셋 라우팅**: 사이트 크롬은 `dist/static/`(css·js·img·fonts) — `dist/assets/`(wiki figure 전용)와 분리. HTML `<link>`/`<script>`만 `href()` 경유, CSS `url()`은 전부 상대.
> - **다크모드**: `<html data-theme="dark">` 기본 + head 인라인 FOUC 스크립트(localStorage → prefers-color-scheme). `theme.js`가 토글·localStorage 저장·미선택 시 OS 추종. `@media (prefers-reduced-motion)` 트랜지션 무력화.
> - **styles.css 구조**: `@layer tokens, base, components, utilities` — Phase 3/4가 `components`에 헤더·카드·constellation append 예정(현재 `components`엔 placeholder `.topbar`/`.theme-toggle`/`.shell`만). INTERIM 셸은 인라인 `<style>` 제거 후 토큰 클래스 사용.
> - **검증**: `npm run build` 깨진 링크 0(58페이지) · `dist/static` 전 에셋 200(HTTP 스모크) · `BASE=/ai-wiki` 빌드 시 `/ai-wiki/static/…` 정상.
> - ⚠️ 미해결(범위 밖): Phase 1 메모의 index.md 카탈로그 누락 2건 여전(`database/lumer-2025-…`, `database/sguys99-langchain-study-vectorless-rag`) — 빌드 자동 포함되나 카탈로그 설명 없음. **→ 해소**(Phase 7 이후 등재).

### Phase 3 — 홈(랜딩)
- [x] sticky frosted 헤더(워드마크 + 검색 + About + 테마토글)
- [x] **히어로 constellation**(`js/constellation.js`, graph.json 소비, ambient drift, reduced-motion 정지)
- [x] 카테고리 밴드 + 카드 그리드(type·year 모노 태그, 설명 clamp, `↳ N links`, tag chip)
- [x] 카드 hover 시 연결 카드 하이라이트
- [x] 푸터(repo·owner·license·Karpathy 패턴 + GitHub)
- [x] 홈 반응형(히어로 스택, 카드 1열) 확인

> **Phase 3 결과 메모**
> - **`lib/templates.mjs` 신설**: 공유 `layout()`(head/FOUC/헤더/푸터/skip-link/스크립트) + `home()`(히어로→밴드→카드) + `header()`/`footer()`/`card()` 파셜 + `wikiInterim()`(위키도 공유 셸 사용). `build.mjs`의 인라인 `shell`/`interimPage`/`interimHome` 제거 → 템플릿으로 이관.
> - **히어로 constellation**: `js/constellation.js`가 캔버스에 `data-graph` URL(BASE 적용)로 graph.json fetch → golden-angle 결정적 배치 + bounded ambient drift, degree로 노드 크기, 색은 CSS 토큰(`--signal`/`--faint`/`--signal-dim`) 런타임 read라 light/dark 추종. `prefers-reduced-motion` 시 정지 1프레임. 히어로 뒤 ambient(opacity .55 + radial mask, `pointer-events:none`).
> - **카드 hover 하이라이트**: 빌드 시 무방향 adjacency를 카드 `data-links`에 직렬화 → 같은 `constellation.js`가 hover 시 연결 카드 `.is-linked`/나머지 dim(`body.cards-focusing`). fetch 불필요(서버 임베드).
> - **카드/밴드**: `card-grid` 1→2→3열(`640/1024px`), 카드 `TYPE·YEAR` 모노 태그 + 제목 + 설명 `line-clamp:3` + `↳ N` + tag chip(최대 2). 밴드 헤더 `이름 + count + desc`, `id={slug}`로 `[[category]]` 앵커와 호환.
> - **헤더/푸터**: sticky frosted(`backdrop-filter`), 워드마크 `ai·wiki`(Space Grotesk). **검색은 placeholder 버튼**(Pagefind=Phase 5, `data-search-trigger`만), **About는 임시로 GitHub README 링크**(About 페이지=Phase 6). 푸터는 repo·owner·Karpathy gist 링크(LICENSE 파일 없음 → 라이선스 표기 생략).
> - **검증**: 빌드 깨진 링크 0(58페이지) · 홈/constellation.js/graph.json/위키 HTTP 200 · `BASE=/ai-wiki` 시 워드마크·카드·canvas `data-graph`·스크립트 전부 `/ai-wiki/...` 정상. stats=pages 58·links 333·categories 7.
> - ⚠️ 육안 확인 권장(헤드리스 미확인): 캔버스 drift 애니메이션 · 카드 hover 연결 강조 · light/dark 양쪽 대비. ⚠️ 밴드 카드 수는 카탈로그(56) 기준 — index.md 누락 2건은 카드 미표시(그래프·stats엔 58 포함). **→ 해소**.

### Phase 4 — 위키(절) 페이지
- [x] 공통 레이아웃(헤더/푸터 공유) + 리딩 컬럼(~72ch)
- [x] 데스크톱 우측 TOC rail(h2/h3 scrollspy) + 상단 진행바(`js/reader.js`)
- [x] 페이지 헤더(카테고리 eyebrow + 제목 + 메타: authors/year/arxiv·url)
- [x] figure 임베드(`<figure>` + 캡션) + 표/인용/코드 에디토리얼 스타일
- [x] 58개 페이지 생성·내부 링크 정상 동작 확인 (계획서의 45는 구버전 수치)

> **Phase 4 결과 메모**
> - **`templates.mjs`에 `wiki()` 신설**: 공유 `layout()` 재사용 → 진행바 + `wiki-grid`(리딩 컬럼 + 우측 TOC rail) + 페이지 헤더 + 에디토리얼 본문. `build.mjs`가 INTERIM `wikiInterim()` 대신 `wiki(page, html, toc, {degree, categoryLabel})` 호출로 전환.
> - **페이지 헤더**: eyebrow = `카테고리 링크(홈 #밴드 앵커) · TYPE · YEAR`(mono). 제목(Pretendard 3xl). 메타 = `저자(authors/author/org) · 단일 참조 링크 · ↳ N links`. 참조 링크는 `referenceLink()`가 **arxiv_id > doi > url(hostname ↗)** 우선순위로 1개만 노출(원문·source 링크 전체는 Phase 5).
> - **리딩 컬럼**: `.wiki-article max-width:var(--measure)=72ch`, `min-width:0`로 grid 셀에서 긴 표/코드가 컬럼 밀지 않음. 넓은 표는 `display:block; overflow-x:auto`로 가로 스크롤.
> - **TOC rail**: `markdown.mjs`가 이미 추출하던 `toc[{depth,id,text}]`(h2/h3, 한글 보존 slug + dedup) 소비. ≥1080px에서 `position:sticky` 15rem rail, 그 미만은 `display:none`(모바일 접이식은 Phase 6). 전 페이지 TOC ≥5개라 rail 항상 표시.
> - **`js/reader.js` 신설**: (1) 진행바 = `scrollTop/scrollable` → `.reading-bar>i` `scaleX`. (2) scrollspy = 헤더 아래 120px 라인 막 지난 마지막 h2/h3을 현재 절로 `.is-active`. rAF 코얼레싱, 레이아웃 보조라 reduced-motion 무관 동작.
> - **figure**: `markdown.mjs`의 기존 `![[assets/{stem}/figNN.png]]`→`<figure class="fig">` 변환을 위키 본문에서 그대로 사용(중앙 정렬 + figcaption). 9개 페이지 figure 임베드 확인(cemri 6장 등).
> - **검증**: 빌드 깨진 링크 0(58페이지) · 위키/reader.js/figure/graph.json HTTP 200 · `BASE=/ai-wiki` 시 헤더 링크·`#밴드` 앵커·figure src·reader.js 전부 `/ai-wiki/...` 정상. repo 페이지(autorag) `org→authors`·`url→github ↗`, paper 페이지(cemri) `arXiv:2503.13657` 노출 확인.
> - ⚠️ 육안 확인 권장(헤드리스 미확인): 진행바 채움 · TOC scrollspy `.is-active` 추종 · sticky rail 스크롤 · light/dark 본문 대비. ⚠️ 모바일 TOC는 현재 숨김(접이식 = Phase 6).

### Phase 5 — 부가 기능
- [x] **교차링크**: `[[wikilink]]` → 클릭 가능 내부 링크(완료 확인) + 미해석 경고 0
- [x] **관련 페이지 그래프**: 페이지 하단 neighborhood 그래프(직접 링크 노드) + 텍스트 목록
- [x] **이전/다음**: 같은 카테고리 내 index 순서 기반 카드
- [x] **원문/소스 링크**: frontmatter `raw_path`/`source`로 GitHub 원문 + sources 링크
- [x] **전체 검색**: 빌드 후 `pagefind`로 `dist` 인덱싱 + 검색 UI(모달) 연동, 결과→페이지 이동 확인

> **Phase 5 결과 메모**
> - **`templates.mjs`에 `wikiFoot()` 신설**: 위키 본문 하단에 `<footer class="wiki-foot">`(grid-column 1, 리딩 컬럼 폭) → ① 관련 페이지(neighborhood) ② 원문·소스 ③ 이전/다음 3단. `build.mjs`가 페이지별 `neighbors`(무방향 직접 이웃, degree 내림차순)·`prev/next`(`nav.mjs#prevNext`, 같은 카테고리 카탈로그 순서)를 계산해 `wiki()`에 주입.
> - **관련 페이지 그래프**: 빌드 시 **결정적 방사형 SVG**(중심=현재 페이지 signal 노드 + 이웃 노드/엣지, 노드 크기 ∝ degree, 색은 CSS 토큰이라 light/dark 추종). 각 이웃 노드는 `<a>`+`<title>` 툴팁으로 클릭 이동. 그래프는 시각 에코, **라벨 텍스트 목록**(제목·TYPE·YEAR·↳N)이 실제 내비게이션 — 이웃 수와 무관하게 안정. 이웃 0이면 "직접 연결된 페이지가 없습니다"(현재 0-이웃 페이지 없음).
> - **원문·소스 링크**: `원문(PDF/MD ↗)` = `raw_path`에서 `raw/…` 부분만 잘라 GitHub blob URL로 변환(⚠️ `raw_path`가 기기별 절대경로 `/Users/kmyu/…`·`/home/sguys99/…` 혼재라 정규식 `(raw\/.+)$`로 추출) · `요약 source ↗`(`sources/{source}`) · `이 페이지 .md ↗`(`wiki/{relPath}`). raw/sources 모두 git 추적(145·57개) 확인.
> - **전체 검색(Pagefind)**: `js/search.js` 신설 — 헤더 ⌕ 버튼·**Cmd/Ctrl+K**·`/`로 모달 open, Esc close. Pagefind 번들을 `data-pagefind`(BASE 적용 경로)로 **동적 import** → 160ms 디바운스 검색, ↑/↓·Enter·클릭 이동, `<mark>` 하이라이트. **base path 보정**: Pagefind url은 파일경로 기준(`/cat/stem/`)이라 배포 시 BASE를 수동 접두(로컬 ''·배포 `/ai-wiki`). 인덱스 부재(단독 `npm run build`) 시 안내 메시지로 graceful degrade.
> - **인덱싱 범위**: 위키 `<article>`에만 `data-pagefind-body`(+ 제목 `data-pagefind-meta="title"`) → Pagefind가 **위키 58개 페이지만** 인덱싱(홈 카드그리드·About 제외, 노이즈 차단). `pagefind --site ../dist` → 58 pages·21,706 words.
> - **검증**: 빌드 깨진 링크 0(58) · `pagefind` 58페이지 인덱싱 · HTTP 200(홈·`/pagefind/pagefind.js`·`search.js`·위키·graph.json) · `BASE=/ai-wiki` 시 검색트리거·search.js·이웃 href 전부 `/ai-wiki/…`, raw/source는 GitHub 절대URL 무영향 · 비카탈로그 페이지는 prevnext만 생략(관련·소스는 정상) · `node --check` 통과.
> - ⚠️ 육안 확인 권장(헤드리스 미확인): 검색 모달 실제 검색·결과 이동(브라우저 WASM 필요) · neighborhood SVG 노드 hover·light/dark · 이전/다음 카드 hover. ⚠️ 검색은 `npm run preview`/배포(Actions)에서 pagefind가 도는 환경에서만 동작 — 단독 `npm run build`엔 인덱스 없음(의도).

### Phase 6 — About · 반응형 · 접근성 마무리
- [x] **About 페이지**: README.md/CLAUDE.md에서 철학·THE FOUR RULES·3-tier 추출 렌더
- [x] 모바일 햄버거 내비 + 접이식 TOC
- [x] 브레이크포인트(모바일/태블릿/데스크톱) 점검
- [x] light/dark 양쪽 명도 대비·이미지·코드블록·constellation 점검
- [x] 접근성: 시맨틱 랜드마크, skip link, 포커스 스타일, aria(토글/내비), 키보드 내비
- [x] 메타/SEO: title·description·OG·favicon, `lang="ko"`

> **Phase 6 결과 메모**
> - **About 페이지**(`lib/about.mjs` 신설 + `templates.mjs#about()` + `build.mjs` 6.5단계): README/CLAUDE.md에서 추출한 *개요·THE FOUR RULES·3-tier 파이프라인·분류·둘러보기*를 한글 markdown으로 작성 → 위키와 **같은 렌더 경로**(`renderMarkdown` + resolver)로 렌더해 `[[database]]`등 카테고리 위키링크가 홈 밴드 앵커(`/#database`)로 해석됨. 리딩 컬럼(.prose) + 페이지 헤더(eyebrow "프로젝트 소개" + lede), TOC rail·관련 그래프·이전/다음은 없음. `dist/about/index.html` 라우트. (Rule #1 위반 아님 — 로컬 문서 읽기.)
> - **헤더 모바일화**(`templates.mjs#header()`): About 링크를 GitHub README → **내부 `/about/`** 로 교체. 모바일(≤560px)은 아이콘 행(⌕ 검색 · ☀ 테마 · ☰ 햄버거) + 햄버거가 여는 `#site-menu` 시트(홈·About·GitHub). 검색·테마는 항상 노출, 인라인 About은 모바일에서 시트로 이동. `js/nav.js` 신설 — 햄버거 토글(aria-expanded 동기화) + Esc/바깥클릭/링크클릭/데스크톱 리사이즈 시 닫기.
> - **접이식 TOC**(`templates.mjs#wiki()`): TOC 항목을 rail/모바일 공유로 추출 → 데스크톱(≥1080px)은 기존 sticky rail(scrollspy), 그 미만은 리딩 컬럼 위 네이티브 `<details class="wiki-toc-m">`(JS 불필요, nav.js가 링크 클릭 시 접기). 561–1079px(태블릿)은 인라인 nav + 접이식 TOC 조합.
> - **메타/SEO**(`templates.mjs#layout()` + `config.mjs#absUrl()`): 페이지별 `path`로 canonical·og:url 절대 URL 생성(BASE 반영 → 배포 시 `/ai-wiki/` 접두). OG(`og:type/site_name/title/description/url/image`) + Twitter `summary_large_image` + `<link rel=icon>`. `lang="ko"`는 기존 유지. **favicon.svg**(Constellation 모티프) + **og.svg**(1200×630 워드마크+노드그래프) 신설(`assets/img/`).
> - **반응형/대비/접근성**: 브레이크포인트 모바일(≤560 햄버거)·태블릿(561–1079 인라인+접이식TOC)·데스크톱(≥1080 rail) 일관. 햄버거 바·시트·모바일 TOC는 모두 CSS 토큰 사용(light/dark 추종), constellation은 런타임 토큰 read로 기존부터 양 테마 대응. a11y: skip-link·`<main id=main>`·`<nav aria-label>`·테마토글 `aria-pressed`·햄버거 `aria-expanded`/`aria-controls`·`hamburger-bars aria-hidden`·`:focus-visible`·Esc 키 처리 전부 확인. 모션은 기존 `prefers-reduced-motion` 전역 무력화에 포함.
> - **검증**: 빌드 깨진 링크 0(58) · about 페이지 렌더 · HTTP 200(홈·`/about/`·favicon.svg·og.svg·nav.js·theme.js·css·graph.json·위키) · `BASE=/ai-wiki` 시 favicon·og:image·canonical·`/about/`·nav.js 전부 `/ai-wiki/...` 정상 · CSS brace balanced · pagefind 여전히 **위키 58개만** 인덱싱(about은 `data-pagefind-body` 없어 검색 노이즈 제외) · `node --check` 전 파일 통과.
> - ⚠️ 육안 확인 권장(헤드리스 브라우저 미가용): 햄버거 시트 열림/X 전환·바깥클릭 닫기 · 모바일 `<details>` 목차 펼침 · light/dark 양쪽 about/카드/코드블록 대비 · 360/768/1280px 레이아웃.
> - ⚠️ **Known Gap**: `og:image`가 SVG라 일부 SNS(Twitter/Facebook 등)는 미리보기 이미지를 렌더하지 않을 수 있음(파비콘 SVG는 모던 브라우저 지원). 필요 시 PNG OG 이미지로 후속 교체. **→ 해소**(og.png, Phase 8-8). ⚠️ About 본문이 나열하는 빈 카테고리(`evaluations`·`etc`) 앵커는 홈에 밴드가 없어 클릭 시 홈 최상단으로 안착(깨진 링크 아님, 자료 추가 시 자동 해소). **→ 해소**(두 카테고리 모두 자료 보유, 빈 카테고리는 "준비 중" 밴드로 렌더).

### Phase 7 — 배포 & 검수
- [x] `.github/workflows/deploy.yml`: push(main) → node setup → `npm ci` → build → pagefind → Pages 아티팩트 업로드/배포
- [ ] (⚠️ 사용자 직접) Settings → Pages 소스를 **GitHub Actions**로 설정
- [ ] (⚠️ 최초 배포 후) base path 적용 링크/에셋/폰트/graph.json/Pagefind가 배포 환경에서 정상인지 확인
- [x] 로컬 `npm run build && preview`로 전 페이지·검색·테마·반응형·constellation 최종 점검
- [x] `README.md`에 사이트 링크 추가

> **Phase 7 결과 메모**
> - **`.github/workflows/deploy.yml` 신설**: `push(main)`(paths 필터: `wiki/**`·`index.md`·`README.md`·`CLAUDE.md`·`site/**`·workflow 자체) + `workflow_dispatch` 트리거. 권한 `contents:read`/`pages:write`/`id-token:write`, `concurrency: pages`(cancel-in-progress=false). **build 잡**: checkout → setup-node@v4(node 24 + npm 캐시, `cache-dependency-path: site/package-lock.json`) → `npm ci`(working-directory `site`) → `npm run build:deploy`(=`BASE=/ai-wiki node build.mjs && pagefind --site ../dist`) → configure-pages@v5 → upload-pages-artifact@v3(`path: dist`). **deploy 잡**: `needs: build` + deploy-pages@v4(`environment: github-pages`). 표준 GitHub Pages Actions 플로우.
> - **로컬 최종 점검**: `build:deploy`(BASE=/ai-wiki) 깨진 링크 0(58페이지)·pagefind 58페이지/21,706단어 인덱싱 확인. 로컬(BASE='') 빌드+pagefind 후 `serve ../dist` HTTP 스모크 — 홈·`/about/`·`graph.json`·`/pagefind/pagefind.js`·`static/{css,js×5,img/favicon.svg}`·각 카테고리 대표 위키 페이지(database·applications·agents·llms·overviews) **전부 200**. 58개 위키 라우트 생성 확인.
> - **README**: 제목 아래 사이트 링크 배너 추가(`sguys99.github.io/ai-wiki/` + `site/`·workflow 링크).
> - **남은 2건은 사용자/배포 후 작업**: (1) GitHub **Settings → Pages → Source = "GitHub Actions"** 1회 설정 필요(이게 없으면 deploy 잡이 실패). (2) 최초 배포 성공 후 실제 `/ai-wiki/` 환경에서 base path·폰트·검색·graph.json 로드 육안 확인.
> - ⚠️ 헤드리스 환경이라 브라우저 육안 검증(검색 WASM·constellation 모션·테마·반응형)은 여전히 미확인 — `npm run preview` 로컬 브라우저 권장.

### Phase 8 — 탐색 · 도메인 · 학습 경로 (2026-07 ~ 2026-09)

Phase 7로 배포가 끝난 뒤, 콘텐츠가 45편에서 수백 편으로 불면서 필요해진 것들이다.
카드 그리드만으로는 자료를 찾을 수 없게 된 시점이 기준이었다.

- [x] 8-1 **태그 인덱스** — `/tags/` 클라우드 + `/tags/{slug}/` 상세. `tagsOf`로 frontmatter 태그를 모으고 slug 충돌은 대표 표기로 병합해 콘솔에 리포트한다(`rag` ← `RAG`, `swe-bench` ← `SWE-bench` 등). Pagefind의 `tag:` 패싯과 같은 라벨을 쓴다.
- [x] 8-2 **그래프 탐색기** — `/graph/` force-directed 전체 그래프. 배치 계산은 로드 시 1회만 하고 단위 좌표로 캐시한다. `graph-core.js`를 히어로와 공유한다.
- [x] 8-3 **홈 탐색 개선** — sticky 카테고리 필터바, 밴드 top-6 접기와 `+ 더 보기`, 전 카테고리 통합 "최근 추가" 밴드, NEW 뱃지(`RECENT_DAYS=14`). 기준 날짜는 `dates.mjs`가 읽는 git 최초 커밋일이고 rename을 승계한다 → Actions checkout에 `fetch-depth: 0`이 필요하다.
- [x] 8-4 **2도메인 강조색** — `domains.mjs`의 카테고리→도메인 맵, `graph.json` 노드의 `domain` 필드, `[data-domain]` 토큰 오버라이드. 태그의 도메인은 보유 페이지 다수결로 정한다. 전역 크롬은 aqua 고정. 시각 정본은 `DESIGN.md` v3.0으로 이관했다.
- [x] 8-5 **학습 경로** — overview frontmatter `study_path` 스키마, `resolveStudyPaths` + `studyPathSection()` + `spliceStudyPath()`. 본문 `## 학습 경로`와 frontmatter에 같은 순서를 이중 기재하고(사람은 본문, 기계는 frontmatter), splice는 절 안 **첫 번호 목록만** 교체한다(다중 트랙 페이지에서 목록이 두 번 렌더되던 버그 수정 — 커밋 `cab7a02`). 단계 수 불일치는 `[study] WARN` 비차단.
- [x] 8-6 **KaTeX** — 빌드타임 렌더 + self-host. `nonStandard` 옵션이 통화 표기를 수식으로 잡는 부작용을 `protectCurrency()`로 막았다(커밋 `759a67b`).
- [x] 8-7 **카탈로그 계약 강화** — 구분자를 `]]: `로 확정하고 head/tail 2단 파서로 바꿨다. 이 전환에서 옛 단일 정규식이 전량 미스해 홈 카드가 254개 중 12개만 남은 사고가 있었고, 그래서 `build:strict` 가드(파싱 불가 항목 · 카드 0개 절)와 작성 시점 검사 `scripts/lint_index.py`를 함께 붙였다.
- [x] 8-8 **메타 · About** — `og:image`를 `og.png`(1200×630)로 교체(커밋 `91f3b16`). `about.mjs` 본문을 해요체 수기 한글로 두고 8카테고리·7유형을 반영했다.

> **Phase 8 후속 과제 (미체크)**
> - [ ] `site/build.mjs` 상단 주석이 아직 "Phase 1 … 페이지 HTML 레이아웃은 아직 INTERIM"이다. 코드 주석도 문서와 같은 종류로 낡아 있어 정리가 필요하다.
> - [ ] constellation과 `/graph/`의 노드가 293개를 넘었다. 현재는 배치 1회 계산으로 버티지만 성능 관찰이 필요하고, 넘치면 카테고리별 서브그래프로 쪼갠다.
> - [ ] 태그 slug 병합의 대표 표기 판정이 수동이다(`GRPO` vs `grpo`). 규칙화 여지가 있다.
> - [ ] Phase 7에서 이월된 2건(Pages 소스 설정 확인, 배포 후 base path 육안 검증)이 그대로 남아 있다.

---

## 검증 방법 (Verification)

수치를 문서에 박지 않고 명령 출력으로 확인한다.

1. **빌드 가드**: `cd site && npm run build:strict` — 카탈로그 파싱 불가 항목이나 카드 0개 절이 있으면 실패한다. 콘솔이 `[content]`·`[tags]`·`[study]`·`[graph]`·`[links]` 지표를 찍는다. `[links] unresolved wikilinks: 0`과 `[study] 미해석 참조: 0`을 확인한다.
2. **작성 시점 검사**: `python3 scripts/lint_index.py --all` — 빌드 가드와 같은 문법을 저장 시점에 잡는다. `python3 scripts/lint_links.py --all`로 위키링크·임베드도 함께 본다.
3. **로컬 미리보기**: `npm run preview` (BASE='', pagefind 포함)
   - 홈: constellation 렌더, 카테고리 필터바, 밴드 접기, 최근 추가와 NEW 뱃지, 카드 hover 이웃 강조
   - wiki: 본문·figure·TOC scrollspy·진행바·관련 페이지 그래프·이전/다음·원문 링크
   - 탐색: `/tags/`, `/graph/`, 검색 모달(`Cmd/Ctrl+K`)과 category·tag 패싯
   - 테마: light/dark 토글 + 새로고침 유지(FOUC 없음), physical-ai 페이지에서 amber로 전환되는지
   - 모바일 폭(≤560px): 햄버거, 1열, 접이식 TOC
4. **배포 확인**: Actions 성공 후 `https://sguys99.github.io/ai-wiki/`에서 base path 하 에셋·폰트·검색·graph.json 로드를 확인한다.

---

## 원문 보존 원칙

- `wiki/**`, `sources/**`, `raw/**`, `index.md`는 빌드 **입력**이다. 사이트 작업이 이 파일들을 고치지 않는다.
- `README.md`·`CLAUDE.md`는 빌드 입력이 **아니다**(About 본문은 `about.mjs` 수기). 다만 deploy.yml paths 필터에 있어 커밋하면 재배포가 돈다.
- 사이트 작업의 산출물은 `site/`, `dist/`, `.github/`, 이 문서, 그리고 `.gitignore`·`README.md`의 링크 추가로 한정한다.

---

## Known Gaps (의도적 보류)

- constellation과 `/graph/`의 노드 수가 계속 는다. 배치 계산을 1회로 줄여 버티고 있으나 상한을 정해 두지 않았다.
- 태그 slug 병합의 대표 표기를 사람이 고른다. `[tags] merged` 리포트를 보고 판단한다.
- `study_path`의 미해석 참조와 단계 수 불일치는 **비차단 경고**다. 콘솔을 보지 않으면 조용히 누락된다.
- 헤드리스 환경이라 브라우저 육안 검증(검색 WASM · constellation 모션 · 테마 대비 · 반응형)은 상시 미확인이다. `npm run preview`로 사람이 본다.
- Pages 소스 설정과 최초 배포 후 base path 검증 2건은 저장소 설정 사항으로 이월돼 있다(Phase 7).
