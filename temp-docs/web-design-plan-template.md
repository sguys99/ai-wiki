# 웹 전자책 사이트 구축 계획 — The Startup CTO's Handbook (한국어)

`ko/` 디렉터리의 한국어 번역(29개 절, 모두 `humanized` 완료)을 **GitHub Pages에 배포되는
세련된 웹 전자책**으로 만든다. 히어로 소개 · 카드형 목차 · 절별 읽기 페이지 · 전체 검색 ·
라이트/다크 모드를 갖추고, 웹/모바일을 동시에 고려한다.

---

## 확정된 결정 사항

| 항목 | 결정 |
|---|---|
| 기술 스택 | 커스텀 빌드 스크립트 (Node ESM + `marked` + `gray-matter`), 프레임워크 없음 |
| 콘텐츠 소스 | `ko/**/*.md` 를 빌드 시 직접 읽음 (복제 X, 단일 소스 유지) |
| 순서/목차 | `ko/SUMMARY.md` 표 + 각 파일 frontmatter `order` 기준 |
| 디자인 톤 | 에디토리얼 / 매거진 (세리프 디스플레이 + Pretendard 본문) |
| 폰트 | 본문 **Pretendard**(필수), 제목/히어로에 세리프 디스플레이 병용 |
| 테마 | 라이트/다크 (시스템 연동 + 토글, localStorage 저장, FOUC 방지) |
| 반응형 | 웹/모바일 동시 (모바일 햄버거 내비·접이식 TOC) |
| 부가 기능 | 전체 검색(Pagefind) · 읽기 진행 표시 · 이전/다음 내비 · 원문 링크 |
| 배포 | GitHub Actions → GitHub Pages (프로젝트 페이지, base path `/Startup-CTO-Handbook/`) |

배포 URL(예상): `https://sguys99.github.io/Startup-CTO-Handbook/`

---

## 아키텍처

### 디렉터리 (신규)
```
site/
  build.mjs              # 빌드 엔트리: 콘텐츠 로드 → 렌더 → dist 출력
  lib/
    content.mjs          # SUMMARY/frontmatter 파싱 → 정렬된 섹션 모델
    markdown.mjs         # marked 설정, 내부 .md 링크 재작성, heading id 부여
    templates.mjs        # layout / home / section HTML 템플릿
    nav.mjs              # 챕터 그룹핑, 이전·다음, 사이드 TOC 데이터
  assets/
    css/styles.css       # 디자인 토큰 + 에디토리얼 레이아웃 + 라이트/다크
    js/theme.js          # 테마 토글(헤드 인라인 + 본 스크립트)
    js/reader.js         # 스크롤 진행바 + 스크롤스파이 TOC + 모바일 내비
    js/search.js         # Pagefind UI 초기화
    fonts/ img/          # Pretendard/세리프 woff2(또는 CDN), 표지·OG 이미지
  package.json
dist/                    # 빌드 산출물 (gitignore, Actions가 배포)
.github/workflows/deploy.yml
web-design-plan.md       # 이 작업 계획 (체크리스트)
```

### 데이터 모델 (content.mjs)
- `SUMMARY.md` 표를 파싱(또는 `ko/**/*.md` glob + frontmatter)해 섹션 배열 생성:
  `{ order, path, title, title_en, chapter, source_lines, status, slug, url }`.
- `order` 오름차순 정렬. 챕터 그룹(서론 / 비즈니스 프로세스 / 사람과 문화 / 기술 팀 관리 /
  기술 아키텍처 / 맺음말·참고문헌·용어집·소개)으로 묶음.

### 렌더링 (markdown.mjs)
- `gray-matter`로 frontmatter 분리 → 본문만 `marked`로 HTML 변환.
- 내부 `*.md` 링크를 사이트 라우트(`.../url`)로 재작성, base path 접두.
- 모든 `h2/h3`에 안정적 `id` 부여(스크롤스파이·앵커용).
- 코드블록 경량 하이라이트(선택), 표/인용/목록은 에디토리얼 스타일 클래스 적용.

### 라우팅 / base path
- 출력 경로는 `ko/` 구조를 유지(예: `01-introduction/index.html`).
- `BASE` 상수로 로컬 미리보기(`''`)와 배포(`/Startup-CTO-Handbook/`)를 분기 →
  모든 링크·에셋·검색 인덱스 경로에 적용.

---

## 디자인 방향 (에디토리얼 / 매거진)

- **타이포**: 본문 Pretendard, 제목·히어로·챕터 번호에 세리프 디스플레이(한글 세리프 +
  영문 세리프 병용). 큰 제목, 넓은 자간 대비, 본문 가독 폭 ~70ch.
- **레이아웃**: 잡지식 위계 — 큰 챕터 넘버럴, 섹션 라벨(스몰캡스), 가는 구분선, 넉넉한 여백,
  카드형 목차(챕터별 그룹 + 하위 절 리스트), 비대칭 히어로.
- **컬러 토큰**: CSS 변수로 라이트/다크 팔레트 + 단일 강조색. 잉크/페이퍼 대비 중심,
  강조는 절제.
- **모션**: 히어로 staggered 로드, 카드 hover, 진행바 등 고임팩트 위주(과한 마이크로 X).
- **배경/디테일**: 미세 노이즈/그레인 또는 종이 질감, 드롭캡(챕터 도입), 장식 구분선.

---

## 단계별 작업 계획 (체크리스트)

### Phase 0 — 프로젝트 셋업 & 기반
- [x] `site/` 디렉터리와 `package.json` 생성 (ESM, `build`/`preview` 스크립트)
- [x] 의존성 설치: `marked`, `gray-matter`, `pagefind`(devDep), 정적 서버(`serve` 등)
- [x] `.gitignore`에 `dist/`, `node_modules/` 추가
- [x] `BASE` 환경 분기(로컬/배포) 구조 잡기
- [x] 빈 `build.mjs` 스켈레톤 + `dist/` 출력 파이프라인 동작 확인

### Phase 1 — 콘텐츠 파이프라인
- [x] `lib/content.mjs`: `SUMMARY.md`/frontmatter 파싱 → 정렬된 섹션 모델
- [x] 챕터 그룹핑 + slug/url 생성 로직
- [x] `lib/markdown.mjs`: frontmatter 제거 + `marked` 렌더 + 내부 링크 재작성
- [x] heading `id` 부여 및 본문 HTML 추출(검색·TOC용) 검증
- [x] 29개 절 전부 누락 없이 변환되는지 콘솔 리포트로 확인

### Phase 2 — 디자인 시스템 (CSS 토큰 · 폰트 · 라이트/다크)
- [x] Pretendard + 세리프 디스플레이 폰트 로드(self-host woff2 또는 CDN)
- [x] `styles.css` 디자인 토큰: 색상(라이트/다크), 타입스케일, 간격, 반경, 그림자
- [x] 본문 타이포그래피(제목/문단/목록/표/인용/코드/링크) 에디토리얼 스타일
- [x] 다크모드: `prefers-color-scheme` + `html[data-theme]` + FOUC 방지 인라인 스크립트
- [x] `js/theme.js` 토글 버튼 + localStorage 저장

### Phase 3 — 홈(랜딩) 페이지
- [x] 상단 헤더(책 이름 + GitHub 링크 + 테마 토글, 스티키)
- [x] 히어로: 표지 이미지(`published_files/cover.png`) + 제목/부제/저자 + 소개 + CTA(읽기 시작·GitHub)
- [x] 카드형 목차: 챕터별 카드(챕터 넘버럴) + 하위 절 링크 리스트
- [x] 푸터: 라이선스·원저자·원문/저장소 링크, 번역 정보
- [x] 홈 반응형(히어로 스택, 카드 1열) 확인

### Phase 4 — 본문(절) 읽기 페이지
- [x] 공통 레이아웃(헤더/푸터 공유) + 본문 렌더 영역
- [x] 데스크톱 우측 사이드 TOC(현재 절 내 h2/h3, 스크롤스파이)
- [x] 절 제목 영역(챕터 라벨 + 제목 + 영문 제목) 매거진 스타일
- [x] 본문 폭/리듬/드롭캡 등 에디토리얼 디테일 적용
- [x] 모든 절 페이지 생성·링크 정상 동작 확인

### Phase 5 — 부가 기능
- [x] **읽기 진행 표시**: 상단 스크롤 진행바 + 사이드 TOC 활성 항목 하이라이트(`js/reader.js`)
- [x] **이전/다음 내비**: 절 하단에 SUMMARY 순서 기반 이전·다음 카드
- [x] **원문 링크**: frontmatter `source_lines`로 GitHub 원문(`StartupCTOHandbook.md#Lx-Ly`) 링크
- [x] **전체 검색**: 빌드 후 `pagefind`로 `dist` 인덱싱 + 검색 UI(모달/박스) 연동
- [x] 검색 결과에서 해당 절로 이동 동작 확인

### Phase 6 — 반응형 · 다크모드 마무리 · 접근성
- [x] 모바일 햄버거 내비 + 접이식 목차/TOC
- [x] 브레이크포인트별(모바일/태블릿/데스크톱) 레이아웃 점검
- [x] 라이트/다크 양쪽에서 명도 대비·이미지·코드블록 점검
- [x] 접근성: 시맨틱 랜드마크, skip link, 포커스 스타일, aria(토글/내비), 키보드 내비
- [x] 메타/SEO: title·description·OG 이미지·favicon, `lang="ko"`

### Phase 7 — 배포 & 검수
- [x] `.github/workflows/deploy.yml`: push(main) → node setup → `npm ci` → build → pagefind → Pages 아티팩트 업로드/배포
- [ ] 저장소 Settings → Pages 소스를 **GitHub Actions**로 설정(⚠️ 사용자 직접 작업 필요)
- [ ] base path 적용된 링크/에셋이 배포 환경에서 정상인지 확인(최초 배포 후)
- [x] 로컬 `npm run build && preview`로 전 페이지·검색·테마·반응형 최종 점검
- [x] `README.ko.md`/`README.md`에 전자책 사이트 링크 추가

---

## 검증 방법 (Verification)

1. **로컬 빌드**: `cd site && npm install && npm run build` → `dist/` 생성, 콘솔에 29개 절
   변환 리포트 출력, 오류 0.
2. **로컬 미리보기**: `npm run preview`(정적 서버, BASE='') →
   - 홈: 히어로/표지/카드 목차/푸터 표시, CTA·GitHub 링크 동작
   - 절 페이지: 본문 렌더, 사이드 TOC 스크롤스파이, 진행바, 이전/다음, 원문 링크
   - 검색: 키워드로 절 검색·이동
   - 테마 토글 라이트/다크 전환 + 새로고침 유지(FOUC 없음)
   - 모바일 폭(≤480px)에서 햄버거 내비·1열 레이아웃
3. **링크/콘텐츠 무결성**: 29개 절 + 홈 라우트 전부 200, 내부 링크 깨짐 0,
   원문 라인 앵커가 실제 원문 위치와 일치.
4. **배포 확인**: Actions 성공 후 `https://sguys99.github.io/Startup-CTO-Handbook/`에서
   동일 동작(특히 base path 하의 에셋·검색 인덱스 로드) 확인.

## 원문 보존 원칙
- `StartupCTOHandbook.md`, `ko/**/*.md`는 **읽기 전용**(빌드 입력). 콘텐츠 수정 없음.
- 모든 신규 산출물은 `site/`, `dist/`, `.github/`, 루트 `web-design-plan.md`에 한정.
