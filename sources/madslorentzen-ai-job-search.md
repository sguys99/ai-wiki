---
title: "MadsLorentzen/ai-job-search"
type: repo
year: 2026
category: agents
raw_path: raw/repos/madslorentzen-ai-job-search.md
raw_filename: "madslorentzen-ai-job-search.md"
source_collection: external
org: "MadsLorentzen"
repo: "ai-job-search"
url: "https://github.com/MadsLorentzen/ai-job-search"
license: "MIT"
tags: [claude-code, agent-workflow, drafter-reviewer, job-search, cv-generation, latex, skills, subagent]
---

## 한 줄 요약 (One-line Summary)

`MadsLorentzen/ai-job-search`는 Claude Code 위에 지은 구직 지원 프레임워크다. `/setup`으로 프로필을 채우면 `/scrape`가 여러 구직 포털에서 공고를 모으고, `/apply`가 drafter-reviewer 2단계 에이전트 구조로 LaTeX CV와 커버레터를 작성한 뒤 PDF를 직접 컴파일해 레이아웃과 ATS 파싱까지 검증한다.

## 1. 자료 정보 (Document Information)

- **저장소**: `MadsLorentzen/ai-job-search` (https://github.com/MadsLorentzen/ai-job-search)
- **라이선스**: MIT
- **태그라인**: "The job search that runs on your machine." 전 과정을 사용자 로컬 머신에서 실행하는 것이 이 저장소의 전제다.
- **저자**: Mads Lorentzen. 지구물리학(geophysics) 전공자로, 2025년 말 자신의 자리가 없어진 뒤 이 프레임워크를 만들어 자신의 구직에 매주 사용했다. 대화한 모든 고용주에게 이 도구를 쓴다는 사실을 밝혔고, 감점 요인이 되기보다 기술적 대화를 여는 계기가 되는 경우가 많았다고 적는다.
- **저자의 실사용 결과**: 맞춤 지원 69건, 1차 면접 20건, 계약 성사 1건을 거쳐 2026년 6월 AI 엔지니어로 입사했다. 지원 funnel 전체는 저자의 LinkedIn 글에 있다고 안내한다.
- **소속 관계 고지**: README는 이 프로젝트가 Anthropic과 제휴, 승인, 후원, 유지보수 관계가 없는 독립 오픈소스 프로젝트임을 명시한다. Anthropic과 Claude Code는 이 워크플로가 쓰는 도구 체인을 설명하기 위해서만 언급한다. 연계된 암호화폐, 토큰, 유료 후원 프로그램이 없으며 그렇게 주장하는 것은 사기로 취급하라고 경고한다.

### 커맨드 구성

| 구분 | 커맨드 | 개수 |
|---|---|---|
| 코어 워크플로 | `/setup`, `/scrape`, `/apply` | 3 |
| 확장 | `/interview`, `/outcome`, `/notion-sync`, `/rank`, `/expand`, `/upskill`, `/html-report`, `/add-template`, `/add-portal` | 9 |
| 초기화 | `/reset` | 1 |

### 요구 환경

| 항목 | 조건 | 비고 |
|---|---|---|
| Claude Code | CLI 필요 | 다른 에이전트 도구(Codex, Antigravity, Gemini CLI)를 쓰면 `AGENTS.md`에서 시작한다. 포털 검색 스킬은 그대로 동작하고, 전체 워크플로 이식은 커뮤니티 fork가 다룬다 |
| Python | 3.10 이상 | |
| Bun | 필요 | 구직 검색 CLI 도구 실행용 |
| LaTeX 배포판 | `lualatex`와 `xelatex` 포함 | TeX Live, MacTeX, TinyTeX, MiKTeX. CV는 lualatex로 컴파일한다. 최신 MiKTeX에서 pdflatex는 `fontawesome5` 폰트 확장 오류로 실패하는 경우가 잦기 때문이다. 커버레터는 `cover.cls`가 `fontspec`을 요구해 xelatex로 컴파일한다 |
| `pdftotext` (poppler) | 선택 | `/apply`의 ATS 파싱 검사에 쓴다. 없으면 시각적 키워드 검토로 degrade하며 워크플로는 계속 진행된다 |

미니멀 TeX 배포판(TinyTeX, BasicTeX)을 쓰면 `SETUP.md`가 안내하는 추가 패키지를 설치해야 한다.

## 2. 주요 기여 (Key Contributions)

- 언어와 국가에 독립적인 코어 워크플로. 자기 프로필링, fit 평가, drafter-reviewer 지원 파이프라인은 언어와 국가에 무관하게 동작하도록 설계했다. 구직 포털 검색 스킬만 덴마크 시장(Jobindex, Jobnet, Akademikernes Jobbank 등)에 맞춰져 있으며, `/add-portal` 커맨드가 다른 나라 포털로 교체하는 패턴을 제공한다.
- drafter-reviewer 2단계 에이전트 구조. 초안 작성 에이전트가 CV와 커버레터를 쓰면, 새 컨텍스트로 스폰된 두 번째 Claude 에이전트가 회사를 리서치하고 초안을 비평한다. 그 피드백으로 초안 작성 에이전트가 다시 수정한다. 단일 패스가 흔히 남기는 키워드 누락, 약한 프레이밍, 일반적인 표현을 이 구조가 걸러낸다.
- PDF 컴파일과 시각 검사 루프. 대다수 LaTeX 이력서 템플릿은 `.tex` 단계에서는 문제가 없어 보여도 PDF에서 깨진다. 직함이 다음 페이지로 넘어가거나, 커버레터가 2페이지로 밀리거나, 불릿 폰트가 조용히 본문 폰트로 대체된다. `/apply`는 매 지원마다 PDF를 컴파일하고 시각 검사한 뒤 `\needspace`, `\enlargethispage`, 리스트 항목용 폰트 매칭 wrapper 같은 표적 수정을 적용한다.
- PDF 텍스트 레이어 기준 ATS 검증. ATS는 렌더링된 페이지가 아니라 PDF에 내장된 텍스트를 읽는다. LaTeX는 텍스트가 깨져 추출되는 PDF를 조용히 만들어낼 수 있다. 이메일 자리에 아이콘 글리프가 들어가거나, 다단 레이아웃에서 줄이 뒤섞이는 식이다. `/apply`는 `pdftotext`로 컴파일된 CV의 텍스트 레이어를 추출해 연락처가 리터럴 텍스트로 있는지, 글리프가 깨지지 않았는지, 읽기 순서가 온전한지 확인하고, 파서가 실제로 보는 텍스트를 기준으로 공고 키워드 커버리지를 점수화한다.
- honesty rule. 프로필이 실제로 뒷받침하는 키워드만 추가하고, 뒷받침되지 않는 키워드는 격차로 남겨 둔다. CV와 커버레터의 모든 주장은 실제 프로필과 대조해 검증하며, 시스템은 스킬이나 경력을 지어내지 않는다.
- 연관성 가중 CV 컷팅. CV가 2페이지를 넘기면 가장 오래된 절부터 기계적으로 자르지 않는다. 후보 줄마다 (a) 대상 공고와의 연관성, (b) 문서 내 고유성, (c) 커버레터가 그 줄에 의존하는지를 점수화해 총점이 가장 낮은 줄부터 제거한다. 공고 키워드에 맞는 오래된 경력의 불릿이, 키워드에 맞지 않는 최근 경력의 불릿보다 먼저 살아남는다.
- 커리어 가이던스의 코드화. 구조화된 평가 기준, 미래 지향적 커버레터 프레이밍, 선택적 연봉 벤치마킹을 워크플로에 담았다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 코어 워크플로

전체 흐름은 `/setup`에서 `/scrape`를 거쳐 `/apply`로 이어진다.

`/setup`은 온보딩 경로 세 가지를 자동 감지해 제시한다.

| 경로 | 입력 | 특징 |
|---|---|---|
| documents 폴더 | `documents/` 하위의 CV PDF, LinkedIn export, 졸업장, 추천서, 과거 지원 기록 | idempotent라서 자료를 추가하며 재실행해도 안전하다. 폴더 구조는 `documents/README.md`가 안내한다 |
| CV 붙여넣기 | 채팅에 붙여넣은 CV 한 장 | 단일 문서로 프로필을 구성한다 |
| 인터뷰 | 대화형 질문 응답 | 문서 없이 처음부터 채운다 |

프로필을 다 채운 뒤 검색 설정만 다시 잡으려면 `/setup --section search`를 쓴다. 목표 직무, 검색할 스킬, 지역, 사용할 포털을 다시 정하는 인터뷰만 실행하며, 프로필로 미루어 고려하지 않았을 법한 직무 유형도 제안한다.

`/scrape`는 여러 구직 포털을 검색해 프로필에 맞는 공고를 찾고, 중복을 제거한 뒤 fit 순으로 정렬해 보여준다. 결과가 눈으로 훑기 어려울 만큼 많으면 `/rank`가 먼저 개입한다.

`/apply`는 URL을 받는다. 자동 접근을 차단하는 포털이라 URL을 가져올 수 없으면 공고 본문 전체를 붙여넣는 방식도 지원한다.

### 3.2 `/apply`의 8단계

| 단계 | 내용 |
|---|---|
| 1 | 공고 파싱 (URL 또는 텍스트) |
| 2 | 프로필 대비 fit 평가 (스킬, 경력, 조직문화, 위치, 커리어 정합성 다섯 항목) |
| 3 | LaTeX로 맞춤 CV와 커버레터 초안 작성 |
| 4 | 리뷰어 에이전트 스폰, 회사 리서치와 초안 비평 |
| 5 | 리뷰어 피드백 반영 수정 |
| 6 | 두 PDF 컴파일과 시각 검사 (CV는 lualatex, 커버레터는 xelatex). CV가 정확히 2페이지이고 직함이 페이지 끝에 고아로 남지 않을 때까지, 커버레터가 정확히 1페이지이고 서명이 보이며 폰트가 일관될 때까지 LaTeX를 반복 수정 |
| 7 | CV의 ATS 검사. `pdftotext`로 텍스트 레이어를 추출해 파싱 결과를 검증하고 키워드 커버리지를 점수화 |
| 8 | 검증 체크리스트와 함께 최종 산출물 제시 |

토큰 효율을 위해 리뷰어 에이전트는 초안을 다시 읽지 않고 인라인으로 전달받으며, 검증 체크리스트는 두 에이전트가 중복 실행하지 않고 워크플로 끝에서 한 번만 실행한다. README는 새로 추가된 컴파일과 검사 단계가 그 절감분의 일부를 PDF 렌더링과 레이아웃 반복에 다시 쓴다고 밝히며, 깨진 PDF가 사용자에게 도달하는 일을 실제로 줄이는 대가로 종단 간 토큰 비용의 일부를 지불하는 교환이라고 설명한다.

### 3.3 확장 커맨드

| 커맨드 | 하는 일 | 세부 |
|---|---|---|
| `/rank` | `/scrape`와 `/apply` 사이를 잇는다 | 새로 스크랩된 공고 전부를 fit 프레임워크로 배치 스코어링한다. 병렬 에이전트가 각 공고를 가져와 다섯 평가 항목을 채점하고, 공고별 강점과 격차를 솔직하게 붙인 순위 shortlist를 낸다. deal-breaker는 거부권을 갖고, 마감이 임박한 공고에는 긴급 표시를, 이미 마감된 공고에는 만료 표시를 붙인다. 번호를 고르면 `/apply`로 넘어간다 |
| `/interview` | 추적 중인 지원 건의 예정된 면접을 준비한다 | 지원 아카이브(실제 공고 원문, 면접관이 읽은 CV와 커버레터, 이전 라운드에서 기록한 피드백)로 단계별 준비팩을 만든다. 회사와 면접관은 verify-before-use 규칙으로 리서치하고, 예상 질문을 STAR 예시에 매핑하며, `07-interview-prep.md`의 롤플레이 프로토콜로 모의 면접을 제안한다. 격차에는 솔직한 bridge 답변을 주고 경험을 지어내지 않는다 |
| `/outcome` | 지원 결과를 기록한다 | 면접 단계, 오퍼, 불합격, 무응답을 남긴다. 제출한 CV와 커버레터, 공고 텍스트를 `documents/applications/<company>_<role>/`에 아카이브하고, `/setup` Path A가 파싱하는 형식으로 `outcome.md`를 유지하며 tracker를 갱신한다. 지원 건 몇 개가 결론이 나면 실제로 면접까지 간 사례를 기준으로 fit 프레임워크를 보정하도록 `/setup`으로 되돌려 보낸다 |
| `/notion-sync` | 파이프라인의 단방향 읽기 전용 뷰를 발행한다 | 공식 Notion MCP 서버(OAuth, API 키 불필요)로 Notion 데이터베이스에 순위가 매겨진 공고 한 건당 한 행, 추적 중인 모든 지원 건을 쓰고, 행마다 write-once 브리핑 페이지를 붙인다. 저장소 파일이 system of record로 남아 역방향 동기화는 없고, 문서는 파일명만 동기화한다. `/html-report`가 책상에서 재생성하는 심층 오프라인 대시보드라면, `/notion-sync`는 Notion이 실행되는 어디서나 볼 수 있는 실시간 요약 뷰다 |
| `/expand` | 프로필을 보강한다 | 프로필에 이미 링크된 공개 소스(GitHub 저장소, 포트폴리오 사이트, Kaggle, Google Scholar)를 스캔하고 명시된 강의와 자격증의 syllabus를 조회한다. 발견된 역량은 출처 태그를 달아 프로필에 추가한다. `/setup` 직후에 실행하면 문서만으로는 드러나지 않는 스킬을 끌어올린다 |
| `/upskill` | 스킬 격차를 분석한다 | 프로필과 추적 중인 공고 사이의 격차를 분석한다. `/upskill <URL>`로 단일 공고만 대상으로 삼을 수도 있다. 우선순위가 매겨진 격차 히트맵과 함께, 웹에서 검색한 학습 자료와 소요 시간 추정을 담은 학습 계획을 낸다 |
| `/html-report` | 오프라인 대시보드를 만든다 | `job_search_tracker.csv`와 지원 아카이브에서 self-contained HTML 대시보드를 생성한다. 통계 카드, 상태와 섹터와 채널과 funnel 차트(인라인 SVG, 외부 의존성 없음), 필터 가능한 지원 테이블로 구성된다. 브라우저에서 바로 열리며 완전히 오프라인으로 동작한다 |
| `/add-template` | 커스텀 LaTeX 템플릿을 등록한다 | `.tex` 파일과 `.cls`, `.sty`, 번들 폰트를 받아 컴파일 엔진, 폰트와 그 위치, 지켜야 할 스타일 규칙, 페이지 상한을 인터뷰로 확보한다. `templates/` 아래에 저장하고 필수 테스트 컴파일을 실행한 뒤 `/apply`에 연결한다. 템플릿은 개인 정보 대신 `[PLACEHOLDER]` 토큰으로 저장하므로 commit과 공유가 안전하다. `--list`, `--use <name>`, `--use default` 플래그를 지원한다 |
| `/add-portal` | 신규 구직 포털 스킬을 생성한다 | 포털의 검색 URL 패턴, 결과 페이지 구조, robots.txt와 접근 규칙을 조사하고, 기존 스킬과 같은 구조와 커맨드와 출력 계약으로 CLI 스킬을 스캐폴딩한 뒤 실제 쿼리를 실행해보고 등록한다. 인증 장벽이 있는 포털은 거절하고, 제약이 강한 약관의 포털은 생성된 스킬에 개인 사용 전용 경고를 눈에 띄게 넣는다 |
| `/reset` | 프로필 데이터를 초기화한다 | `/reset profile`은 스킬 파일을 지우되 프레임워크 규칙은 보존하고, `/reset documents`는 `documents/` 폴더의 파일을 삭제하며, `/reset all`은 둘 다 수행한다. 삭제 대상을 먼저 보여주고 `RESET`을 타이핑해야 진행한다 |

### 3.4 저장소 구조

| 경로 | 역할 |
|---|---|
| `CLAUDE.md` | 후보자 프로필 본문과 워크플로 규칙 |
| `.claude/commands/` | 11개 커맨드 정의 (`apply`, `setup`, `expand`, `add-template`, `add-portal`, `rank`, `outcome`, `interview`, `html-report`, `notion-sync`, `reset`) |
| `.claude/skills/job-application-assistant/` | 코어 지원 스킬. `SKILL.md`와 번호가 붙은 7개 지침 파일 |
| `.claude/skills/job-scraper/` | 구직 검색 오케스트레이션 |
| `.claude/skills/upskill/` | `/upskill`의 스킬 격차 분석과 학습 계획 |
| `.claude/settings.json` | Claude Code 권한 설정 (공유, 범위 한정) |
| `.agents/skills/` | 구직 포털 CLI 도구 6종 |
| `cv/main_example.tex` | moderncv 기반 LaTeX CV 템플릿 (banking 스타일) |
| `cover_letters/` | 커스텀 `cover.cls`, 예시 커버레터, Lato와 Raleway 폰트를 담은 `OpenFonts/` |
| `templates/` | `/add-template`으로 등록한 커스텀 템플릿 |
| `documents/` | `/setup` Path A와 `/expand`가 읽는 커리어 원자료 (`cv/`, `linkedin/`, `diplomas/`, `references/`, `applications/`) |
| `tools/` | `convert_salary_excel.py`, `lint_skills.py`, `security_guards.py`, 연봉 도구 안내 |
| `salary_lookup.py` | 연봉 벤치마킹 도구 |
| `job_search_tracker.csv` | 지원 추적 스프레드시트 |
| `.github/workflows/ci.yml` | CI 정의 |

`job-application-assistant` 스킬의 7개 지침 파일은 `01-candidate-profile.md`(학력, 경력, 스킬), `02-behavioral-profile.md`(PI, DISC 등 성향 평가), `03-writing-style.md`(톤, 구조, 권장과 금지), `04-job-evaluation.md`(fit 채점 프레임워크), `05-cv-templates.md`(LaTeX CV 구조와 맞춤 규칙), `06-cover-letter-templates.md`, `07-interview-prep.md`(STAR 예시와 면접 프레임워크)다.

`/setup` 없이 파일을 직접 편집하려는 사용자를 위한 대응표도 README가 제공한다.

| 파일 | 편집할 내용 |
|---|---|
| `CLAUDE.md` | 전체 프로필 (이름, 학력, 경력, 스킬, 목표) |
| `01-candidate-profile.md` | CV 데이터의 구조화 버전 |
| `02-behavioral-profile.md` | 성향 평가 또는 자가 평가 |
| `04-job-evaluation.md` | 스킬 매칭 영역, 커리어 목표, 동기 필터 |
| `05-cv-templates.md` | 직무 유형별 프로필 서술 템플릿 |
| `07-interview-prep.md` | 실제 경험에서 뽑은 STAR 예시 |
| `search-queries.md` | 보유 스킬과 지역에 맞춘 구직 검색 쿼리 |

### 3.5 구직 포털 스킬

`.agents/skills/` 아래에 CLI 스킬 6종이 들어 있다. 설치는 각 스킬의 `cli/` 디렉토리에서 `bun install`을 실행한다. `linkedin-search`와 `freehire-search`는 런타임 의존성이 없어 설치가 선택 사항이며, `bun install`은 TypeScript 개발용 타입만 가져온다.

| 스킬 | 대상 | 성격 |
|---|---|---|
| `jobbank-search` | Akademikernes Jobbank (덴마크) | HTML 스크래핑 방식 데모 |
| `jobdanmark-search` | Jobdanmark.dk (덴마크) | 동일 |
| `jobindex-search` | Jobindex.dk (덴마크) | 동일 |
| `jobnet-search` | Jobnet.dk (덴마크 정부 포털) | 동일 |
| `linkedin-search` | LinkedIn 공개 `jobs-guest` 엔드포인트 | 국가 무관, 분야 무관, 런타임 의존성 0. 검색 위치를 명시적 플래그로 받아 어느 시장에서도 바로 동작한다(`-l "Berlin, Germany"`, `-l "Remote"` 등). 자동화 접근이 LinkedIn 이용약관 위반이라 개인 사용 전용이며 저볼륨을 전제로 한다 |
| `freehire-search` | freehire.dev 집계 서비스의 공개 REST API | 기술 직군 중심(소프트웨어, 데이터, 엔지니어링, DevOps, 원격), `--region`, `--country`, `--remote` 패싯 플래그로 다중 시장 지원, 런타임 의존성 0. HTML을 긁는 덴마크 포털과 달리 결과가 스킬, 연차, 카테고리로 구조화되어 돌아온다. 백엔드는 MIT 라이선스이며 자체 호스팅이 가능해 `FREEHIRE_API_URL`을 자기 인스턴스로 돌릴 수 있다 |

### 3.6 보안 모델

구직 포털 공고는 신뢰할 수 없는 입력으로 다룬다. 워크플로는 공고 본문에 삽입된 지시를 따르지 않고, 본문 안의 링크도 fetch하지 않는다. 다만 이 방어는 지시 수준이지 샌드박스가 아니다. 그래서 낯선 구직 게시판에서는 가져온 내용과 작성된 결과를 전송 전에 사람이 검토하라고 권한다. 세부는 `SECURITY.md`가 다룬다.

CI의 `tools/security_guards.py`는 권한 allowlist, gitignore 규칙, manifest를 검사한다.

### 3.7 연봉 벤치마킹

연봉 도구는 사용자가 직접 제공하는 데이터로 동작한다. 노조 통계, Glassdoor export, 개인 조사 등 어떤 자료든 형식만 맞추면 된다. 형식과 설정은 `tools/README_SALARY_TOOL.md`가 안내한다. 연봉 데이터가 없으면 해당 단계는 그대로 건너뛴다.

### 3.8 산출 품질을 좌우하는 요인

README는 산출물 품질의 가장 큰 단일 변수를 프로필의 상세도로 지목한다. 얇은 프로필은 일반적인 지원서를 만들고, 상세한 프로필이라야 실제로 맞춤화된 결과가 나온다.

- **직무 기술**: 직함만 나열하지 않고 각 자리에서 실제로 한 일을 쓴다. 구체적 프로젝트, 사용한 도구, 책임 범위, 측정 가능한 성과를 담을수록 시스템이 경력을 다른 직무에 맞게 재구성할 여지가 커진다.
- **맥락 속 스킬**: "Python"이나 "프로젝트 관리"처럼 나열하지 않고 어디에 어떻게 적용했는지 쓴다. "scikit-learn으로 고객 이탈 예측 ML 파이프라인을 구축했다"가 "Python, 머신러닝"보다 훨씬 많은 재료를 준다.
- **온보딩 경로는 모두 유효**: `documents/` 폴더, CV 붙여넣기, 인터뷰 중 무엇을 쓰든 원리는 같다. 입력이 풍부할수록 산출이 날카로워진다.

구직 방식으로는 두 가지 모드를 지원한다. 목표를 이미 아는 explicit targeting에서는 시스템이 fit을 기준으로 우선순위를 다듬는다. latent opportunity discovery에서는 직함이 아니라 실제로 한 일 전체를 분석해 고려하지 않았던 커리어 경로를 제시한다. 예상 밖 산업으로 이어지는 전이 가능한 스킬, 즐겼거나 잘했던 일의 패턴, 도메인 전문성과 신기술이 결합된 신생 직무 등이 그 대상이다. 이 모드를 살리려면 `/setup` 단계에서 경력만이 아니라 무엇이 활력을 주었고 무엇이 소모적이었으며 무엇을 더 하고 싶은지까지 서술해야 한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 저장소는 벤치마크 수치 대신 저자 본인의 실사용 결과를 근거로 든다. 맞춤 지원 69건, 1차 면접 20건, 계약 성사 1건이며 저자는 2026년 6월 AI 엔지니어로 입사했다.

CI(`.github/workflows/ci.yml`)는 세 가지를 실행한다.

| 검사 | 대상 |
|---|---|
| LaTeX smoke 컴파일 | `cv/main_example.tex`, `cover_letters/cover_example.tex` |
| 스킬 lint | `tools/lint_skills.py`가 스킬, 커맨드, `settings.json` 검사 |
| CLI 타입체크 | `.agents/skills/` 아래 CLI 도구 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

| 한계 | 내용 |
|---|---|
| 덴마크 특화 포털 스킬 | 코어 워크플로는 언어와 국가에 무관하지만 기본 제공 포털 4개는 덴마크 시장 전용이다. 다른 나라 사용자는 `/add-portal`로 직접 스킬을 만들거나 `linkedin-search`와 `freehire-search`로 시작해야 한다 |
| LaTeX 의존 | CV와 커버레터가 LaTeX 기반이라 lualatex와 xelatex를 갖춘 배포판 설치가 필수다. 미니멀 TeX 배포판은 추가 패키지 설치가 필요하다 |
| 에이전틱 방어의 수준 | prompt injection 방어가 지시 수준에 머물러 완전한 샌드박스가 아니다. 낯선 포털에서는 사람이 결과를 검토해야 한다 |
| LinkedIn 스킬의 약관 리스크 | `linkedin-search`는 자동화 접근이 LinkedIn 이용약관에 어긋나 개인 사용과 저볼륨 사용을 전제로만 제공한다 |
| 인증 장벽 포털 미지원 | `/add-portal`은 인증이 필요한 포털을 거절한다 |
| PDF 검증 단계의 토큰 비용 | 컴파일과 검사 루프가 반복 렌더링을 요구해, 토큰 절감을 위해 설계한 다른 부분의 절감분 일부를 다시 소비한다 |

## 6. 관련 연구 (Related Work)

- **CLI 스킬 출처**: README의 감사 표기는 구직 검색 CLI 스킬의 출처로 Mikkel Krogholm과 그의 skills 저장소(https://github.com/mikkelkrogsholm/skills)를 명시한다.
- **Notion 연동**: 공식 Notion MCP 서버(OAuth, API 키 불필요)를 통해 `/notion-sync`가 읽기 전용 뷰를 발행한다.
- **freehire 백엔드**: MIT 라이선스로 자체 호스팅이 가능한 freehire.dev(https://github.com/strelov1/freehire)를 기반으로 한다.
- **다른 에이전트 도구**: Codex, Antigravity, Gemini CLI 사용자를 위한 `AGENTS.md`와 커뮤니티 fork 논의 스레드를 안내한다.
- 이 wiki 내 **관련 페이지**는 wiki 페이지의 해당 절을 참고한다.

## 7. 용어집 (Glossary)

- **drafter-reviewer workflow**: 초안 작성 에이전트와, 별도 컨텍스트로 스폰되어 비평만 담당하는 리뷰어 에이전트를 분리한 2단계 구조. 한 에이전트가 쓰고 검토까지 하는 단일 패스보다 키워드 누락과 일반적인 표현을 더 잘 잡는다.
- **ATS (Applicant Tracking System)**: 채용 담당자가 이력서를 자동 파싱하고 필터링하는 시스템. PDF의 렌더링된 페이지가 아니라 내장 텍스트 레이어를 읽으므로, 텍스트 추출이 깨지면 사람 눈에는 온전한 CV도 ATS에서 걸러진다.
- **fit evaluation**: 스킬, 경력, 조직문화, 위치, 커리어 정합성 다섯 항목으로 공고와 프로필의 적합도를 점수화하는 프레임워크. `/rank`와 `/apply`가 이 프레임워크를 공유한다.
- **relevance-weighted cutting**: CV가 페이지 상한을 넘길 때 항목을 기계적 순서가 아니라 연관성, 고유성, 커버레터 의존도 점수로 정렬해 잘라내는 방식.
- **honesty rule**: 프로필이 뒷받침하지 않는 키워드는 CV에 채워 넣지 않고 격차로 남겨 두는 원칙. ATS 키워드 매칭과 사실성 사이의 교환을 사실성 쪽으로 고정한다.
- **verify-before-use**: `/interview`가 회사와 면접관 정보를 리서치할 때 적용하는 규칙. 확인되지 않은 정보를 준비팩에 넣지 않는다.
- **system of record**: 어떤 데이터의 정본이 어디에 있는지를 지정하는 개념. `/notion-sync`에서는 저장소 파일이 system of record이고 Notion은 읽기 전용 사본이다.
