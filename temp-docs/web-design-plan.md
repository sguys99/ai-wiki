# AI Wiki → GitHub Pages 웹사이트 상세 설계 계획

`ai-wiki`(Karpathy LLM Wiki 패턴 기반 개인 AI 지식 베이스)를 **저장소 자체의 GitHub Pages**로
배포해 웹·모바일에서 `index.md` 카탈로그를 둘러보고 개별 wiki 페이지를 읽을 수 있게 한다.
디자인 방향은 **Constellation(지식 그래프)**, 한글 폰트는 **Pretendard**, 전체 검색·라이트/다크·
TOC·교차링크를 갖추며 웹/모바일을 동시에 고려한다.

원본 콘텐츠(`wiki/`, `sources/`, `raw/`, `index.md`)는 **단일 소스로 유지하며 읽기 전용**,
빌드 산출물만 새로 만든다.

---

## 확정된 결정 사항

| 항목 | 결정 |
|---|---|
| 배포 | GitHub Pages (프로젝트 페이지, repo `sguys99/ai-wiki`, base path `/ai-wiki/`) |
| 기술 스택 | 커스텀 Node 빌드 (ESM + `marked` + `gray-matter`), 프레임워크 없음 |
| 콘텐츠 소스 | `wiki/**/*.md` + `index.md`를 빌드 시 직접 읽음 (복제 X, 단일 소스 유지) |
| 디자인 방향 | **Constellation (지식 그래프)** — frontend-design 신규 도출 |
| 한글 폰트 | **Pretendard** (필수, self-host) |
| 부가 기능 | 전체 검색(Pagefind) · 라이트/다크 토글 · 위키 내 TOC(scrollspy) · 교차링크/관련 페이지 |
| About | README/CLAUDE.md 기반 자동 생성 |
| 반응형 | 웹/모바일 동시 (1→2→3 col, 모바일 햄버거·접이식 TOC) |

**배포 URL(예상)**: `https://sguys99.github.io/ai-wiki/`

**환경**: Node v24.13 · npm 11.6 사용 가능, 기존 웹 빌드 도구 전무(blank slate), Pretendard 미존재.
**콘텐츠 규모**: `wiki/` 45개 페이지 (database 21 · applications 13 · agents 7 · llms 2 · overviews 2, evaluations·etc 비어있음).

---

## 디자인 시스템 — Constellation

> **시그니처 (단 하나의 기억점)**: 이 위키가 실제로 **그래프**라는 사실을 화면에 드러낸다.
> `[[wikilinks]]`로 만든 **실제 인접 그래프**를 (1) 홈 히어로의 ambient node-constellation,
> (2) 각 카드의 ref-count(`↳ N`), (3) 각 wiki 페이지 하단의 "관련 페이지 neighborhood 그래프"로 표현한다.
> 장식이 아니라 *복리로 쌓이는 교차참조*라는 본질을 그대로 시각화한다.
> 대담함은 이 한 곳에만 쓰고 주변은 절제한다.
>
> AI 디자인의 흔한 3대 디폴트(크림+세리프+테라코타 / 흑배경+형광 / 브로드시트 신문)는 의도적으로 회피했다.

### 폰트 (3-role, self-host woff2)

- **Display (Latin·숫자 전용)**: **Space Grotesk** — 워드마크 `ai-wiki`, 큰 카운트("45"), eyebrow 라벨, constellation 노드 라벨.
- **Body & 한글 헤딩**: **Pretendard** (400/600/700) — 한글 제목·본문·영문 인라인 기술용어. 한글 헤딩은 Pretendard 600/700 + `tracking-tight`.
  - ⚠️ 한글·Latin 혼합 seam 방지: 한글이 포함된 헤딩은 **전부 Pretendard**로 렌더(혼합 X). Space Grotesk는 순수 Latin/숫자 표면에만 적용.
- **Mono (유틸)**: **JetBrains Mono** — taxonomy 태그(`PAPER·2024`), arxiv id, ref-count, 코드블록, footer 메타.

### 컬러 토큰 (dark-first, light pair) — CSS 변수

| 토큰 | Dark (기본) | Light |
|---|---|---|
| `--bg` | `#0B0E14` (deep space ink) | `#F7F8FA` |
| `--surface` (카드) | `#141923` | `#FFFFFF` |
| `--surface-2` (elevated) | `#1B2230` | `#F1F3F7` |
| `--text` | `#E6E9EF` | `#161A22` |
| `--muted` | `#8A93A3` | `#5C6473` |
| `--faint` | `#5A6373` | `#9AA2B0` |
| `--hairline` | `#232A38` | `#E3E7EE` |
| `--signal` (단일 강조) | `#5EEAD4` (luminous aqua) | `#0FB89B` |
| `--signal-dim` (edge/glow) | `rgba(94,234,212,.25)` | `rgba(15,184,155,.18)` |

- **강조는 단 하나(aqua signal)** — active 노드·엣지·링크 hover·focus ring에만. 브랜드 보조색·그라데이션 없음.
- 자료 type 구분은 색이 아니라 **모노 라벨**로(색 노이즈 회피). "trending/recent"도 별도 색 대신 signal의 가중치로 표현.

### 레이아웃 & app shell

- **Header (sticky, frosted)**: 좌 워드마크 `ai-wiki`(Space Grotesk) / 우 [검색] [About] [테마토글 ◐]. 모바일은 아이콘 행 + 햄버거.
- **Home**: 히어로 constellation → 카테고리 밴드(헤더 `이름 + count` eyebrow) → 카드 그리드 `grid-cols-1 sm:2 lg:3`, gap-4.
- **Card**: 상단 mono 태그(`TYPE·YEAR`) → 제목(Pretendard 600) → 한 줄 설명(`line-clamp-3`) → 하단 `↳ N links` + tag chip. hover 시 테두리→signal + 연결 카드 하이라이트.
- **Wiki page**: 가운데 리딩 컬럼(~72ch) + 데스크톱 우측 TOC rail(h2/h3 scrollspy) + 상단 진행바. 헤더(카테고리 eyebrow + 제목 + 메타). 본문(figure 임베드 + 캡션). 하단 "관련 페이지" neighborhood 그래프 + 이전/다음(같은 카테고리) + 원문(`raw`)·`source` 링크.
- **About**: README/CLAUDE.md에서 추출(프로젝트 철학·THE FOUR RULES·3-tier 파이프라인).
- **Footer**: repo·owner·license·"built on Karpathy LLM Wiki pattern" + GitHub 링크.

### 모션 (절제, `prefers-reduced-motion` 존중)

- 히어로 constellation: 노드 ambient drift + 엣지 fade-in (reduced-motion 시 정지 이미지).
- 카드 hover: 테두리/글로우 transition + 연결 카드 강조. 그 외 마이크로 모션 최소.

---

## 아키텍처

### 디렉터리 (신규 — 모두 `site/`·`dist/`·`.github/` 내부)

```
site/
  build.mjs              # 엔트리: 콘텐츠 로드 → 그래프 빌드 → 렌더 → dist 출력
  lib/
    content.mjs          # wiki/**/*.md frontmatter glob + index.md 카탈로그 머지 → 섹션 모델
    graph.mjs            # [[wikilinks]] 인접 파싱 → graph.json (nodes/edges/degree)
    markdown.mjs         # marked 설정: [[wikilink]]→<a>, ![[embed]]→<figure>, heading id
    templates.mjs        # layout / home / wiki / about HTML 템플릿(tagged template)
    nav.mjs              # 카테고리 그룹핑, 이전/다음, TOC 추출
  assets/
    css/styles.css       # Constellation 토큰 + 레이아웃 + light/dark
    js/constellation.js  # 히어로 그래프 + 페이지별 neighborhood (canvas/SVG)
    js/theme.js          # 테마 토글 + localStorage + FOUC 인라인
    js/reader.js         # 진행바 + TOC scrollspy + 모바일 내비
    js/search.js         # Pagefind UI 초기화
    fonts/               # Pretendard / Space Grotesk / JetBrains Mono woff2
    img/                 # og 이미지, favicon
  package.json
dist/                    # 빌드 산출물 (gitignore, Actions가 배포)
.github/workflows/deploy.yml
temp-docs/web-design-plan.md  # 이 작업 계획 (체크리스트)
```

### 데이터 모델 (`content.mjs`)

- `wiki/**/*.md` glob → `gray-matter`로 frontmatter 추출이 **메타 진실원천**(title, type, year, category, tags, authors/url/org, source, figures).
- `index.md`는 카테고리 멤버십 + **한 줄 설명** + 정렬 출처로 머지(stem 기준). 카탈로그 항목 정규식:
  `- \[\[([^/\]]+)/([^|\]]+)\|?([^\]]*)\]\]\s*—\s*([\s\S]+?)\s*\((\d{4}),\s*([^)]+)\)\s*$` (말미 `(YYYY, type)`에 앵커).
- 카테고리 헤더(`## Database (database)` …)로 그룹. 빈 카테고리(evaluations·etc)는 렌더 생략 또는 "준비 중" 표시.

### 렌더링 (`markdown.mjs`)

- `gray-matter`로 frontmatter 분리 → 본문만 `marked`.
- **`[[category/stem|display]]`** → `<a href="{BASE}/{category}/{stem}/">display</a>`. bare `[[category/stem]]` → 페이지 title 사용. `[[stem]]`(카테고리 생략) → stem→page 맵으로 해석. 미해석 링크 → muted span + 빌드 로그 경고.
- **`![[assets/{stem}/figNN.png]]`** + 다음 줄 `*Figure …*` → `<figure><img …><figcaption>…</figcaption></figure>`로 래핑.
- `wiki/assets/**` → `dist/assets/**` 복사.
- 모든 h2/h3에 안정 `id`(scrollspy·앵커).
- **수식**: 콘텐츠는 unicode + `_` 첨자(LaTeX `$…$` 아님) → KaTeX 미도입(plain text). `$` 수식 등장 시 추후 추가(Known Gap).

### 그래프 (`graph.mjs`)

- 모든 wiki 페이지 본문에서 `[[…]]` 추출 → 방향성 인접 리스트 → `dist/graph.json`(`{nodes:[{id,title,category,degree}], edges:[{source,target}]}`).
- 홈 히어로 + 페이지별 neighborhood가 이 JSON을 소비. degree로 카드의 `↳ N links` 표기.

### 라우팅 / base path

- 출력: 홈 `dist/index.html`, wiki `dist/{category}/{stem}/index.html`, about `dist/about/index.html` (clean URL).
- `BASE` 상수로 로컬(`''`)·배포(`/ai-wiki/`) 분기 → 모든 링크·에셋·폰트·Pagefind·graph.json 경로에 적용.

---

## 단계별 작업 계획 (체크리스트)

### Phase 0 — 셋업 & 기반
- [x] `site/` + `package.json`(ESM, `build`/`preview` 스크립트)
- [x] 의존성: `marked`, `gray-matter`, `pagefind`(devDep), 정적 서버(`serve`)
- [x] `.gitignore`에 `dist/`, `site/node_modules/` 추가
- [x] `BASE` 환경 분기(로컬/배포) 구조 (`site/lib/config.mjs`)
- [x] 빈 `build.mjs` 스켈레톤 → `dist/` 출력 파이프라인 동작 확인

### Phase 1 — 콘텐츠 파이프라인
- [ ] `lib/content.mjs`: wiki frontmatter glob + index.md 카탈로그 머지 → 정렬된 섹션 모델
- [ ] 카테고리 그룹핑 + slug/url 생성
- [ ] `lib/markdown.mjs`: frontmatter 제거 + `marked` 렌더 + `[[wikilink]]`/`![[embed]]` 재작성 + heading id
- [ ] `lib/graph.mjs`: `[[…]]` 인접 파싱 → `graph.json` + degree
- [ ] 45개 페이지 전부 누락·깨진 링크 0 콘솔 리포트 확인

### Phase 2 — 디자인 시스템 (CSS 토큰 · 폰트 · light/dark)
- [ ] Pretendard + Space Grotesk + JetBrains Mono woff2 self-host
- [ ] `styles.css` 토큰: 컬러(light/dark), 타입스케일, 간격, 반경, hairline
- [ ] 본문 타이포(헤딩/문단/목록/표/인용/코드/링크/figure) — 한글 가독 line-height ~1.7
- [ ] 다크모드: `prefers-color-scheme` + `[data-theme]` + FOUC 방지 인라인 스크립트
- [ ] `js/theme.js` 토글 + localStorage

### Phase 3 — 홈(랜딩)
- [ ] sticky frosted 헤더(워드마크 + 검색 + About + 테마토글)
- [ ] **히어로 constellation**(`js/constellation.js`, graph.json 소비, ambient drift, reduced-motion 정지)
- [ ] 카테고리 밴드 + 카드 그리드(type·year 모노 태그, 설명 clamp, `↳ N links`, tag chip)
- [ ] 카드 hover 시 연결 카드 하이라이트
- [ ] 푸터(repo·owner·license·Karpathy 패턴 + GitHub)
- [ ] 홈 반응형(히어로 스택, 카드 1열) 확인

### Phase 4 — 위키(절) 페이지
- [ ] 공통 레이아웃(헤더/푸터 공유) + 리딩 컬럼(~72ch)
- [ ] 데스크톱 우측 TOC rail(h2/h3 scrollspy) + 상단 진행바(`js/reader.js`)
- [ ] 페이지 헤더(카테고리 eyebrow + 제목 + 메타: authors/year/arxiv·url)
- [ ] figure 임베드(`<figure>` + 캡션) + 표/인용/코드 에디토리얼 스타일
- [ ] 45개 페이지 생성·내부 링크 정상 동작 확인

### Phase 5 — 부가 기능
- [ ] **교차링크**: `[[wikilink]]` → 클릭 가능 내부 링크(완료 확인) + 미해석 경고 0
- [ ] **관련 페이지 그래프**: 페이지 하단 neighborhood 그래프(직접 링크 노드) + 텍스트 목록
- [ ] **이전/다음**: 같은 카테고리 내 index 순서 기반 카드
- [ ] **원문/소스 링크**: frontmatter `raw_path`/`source`로 GitHub 원문 + sources 링크
- [ ] **전체 검색**: 빌드 후 `pagefind`로 `dist` 인덱싱 + 검색 UI(모달) 연동, 결과→페이지 이동 확인

### Phase 6 — About · 반응형 · 접근성 마무리
- [ ] **About 페이지**: README.md/CLAUDE.md에서 철학·THE FOUR RULES·3-tier 추출 렌더
- [ ] 모바일 햄버거 내비 + 접이식 TOC
- [ ] 브레이크포인트(모바일/태블릿/데스크톱) 점검
- [ ] light/dark 양쪽 명도 대비·이미지·코드블록·constellation 점검
- [ ] 접근성: 시맨틱 랜드마크, skip link, 포커스 스타일, aria(토글/내비), 키보드 내비
- [ ] 메타/SEO: title·description·OG·favicon, `lang="ko"`

### Phase 7 — 배포 & 검수
- [ ] `.github/workflows/deploy.yml`: push(main) → node setup → `npm ci` → build → pagefind → Pages 아티팩트 업로드/배포
- [ ] (⚠️ 사용자 직접) Settings → Pages 소스를 **GitHub Actions**로 설정
- [ ] base path 적용 링크/에셋/폰트/graph.json/Pagefind가 배포 환경에서 정상인지 확인(최초 배포 후)
- [ ] 로컬 `npm run build && preview`로 전 페이지·검색·테마·반응형·constellation 최종 점검
- [ ] `README.md`에 사이트 링크 추가

---

## 검증 방법 (Verification)

1. **로컬 빌드**: `cd site && npm install && npm run build` → `dist/` 생성, 콘솔에 45개 페이지 변환 + 그래프 노드/엣지 수 + 깨진 링크 0 리포트.
2. **로컬 미리보기**(`npm run preview`, BASE=''):
   - 홈: constellation 렌더, 카테고리 카드, hover 연결 강조, CTA·GitHub·About 동작
   - 위키: 본문·figure·TOC scrollspy·진행바·관련 그래프·이전/다음·원문 링크
   - 검색: 키워드로 페이지 검색·이동
   - 테마 토글 light/dark + 새로고침 유지(FOUC 없음)
   - 모바일 폭(≤480px) 햄버거·1열·접이식 TOC
3. **무결성**: 45개 + 홈 + About 라우트 200, 내부 `[[link]]` 깨짐 0, figure 경로 정상.
4. **배포 확인**: Actions 성공 후 `https://sguys99.github.io/ai-wiki/`에서 base path 하 에셋·폰트·검색·graph.json 로드 확인.

---

## 원문 보존 원칙

- `wiki/**`, `sources/**`, `raw/**`, `index.md`, `CLAUDE.md`, `README.md`는 **읽기 전용**(빌드 입력). 콘텐츠 수정 없음.
- 신규 산출물은 `site/`, `dist/`, `.github/`, `temp-docs/web-design-plan.md`, 그리고 `.gitignore`·`README.md` 링크 추가에 한정.

---

## Known Gaps (의도적 보류)

- LaTeX `$…$` 수식 미렌더(현 콘텐츠는 unicode/첨자). 등장 시 KaTeX 추가.
- 빈 카테고리(evaluations·etc)는 자료 추가 전까지 비표시 또는 "준비 중".
- constellation 그래프는 노드 수 증가(현 45) 시 성능 고려 — 초기엔 전체, 추후 카테고리별 서브그래프로 분할 가능.
