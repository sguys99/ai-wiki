---
title: "REA: 무엇이든 리버스 엔지니어링하라"
type: article
year: 2026
category: agents
raw_path: raw/articles/park-2026-rea-reverse-engineer-anything.md
raw_filename: "park-2026-rea-reverse-engineer-anything.md"
source_collection: external
author: "박재홍"
url: "https://wikidocs.net/blog/@jaehong/33128/"
publisher: "박재홍의 실리콘밸리 (wikidocs.net)"
tags: [mcp, reverse-engineering, agent-tools, security]
figures:
  - id: fig01
    file: assets/park-2026-rea-reverse-engineer-anything/fig01.png
    raw: raw/articles/park-2026-rea-reverse-engineer-anything-figures/fig01.png
    caption: "REA 대표 이미지. 왼쪽에 Reverse Engineer Anything 로고, 오른쪽에 디스어셈블 결과와 디컴파일한 check_auth 함수, 헥스 덤프, 에이전트 워크플로 5단계가 보인다"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/park-2026-rea-reverse-engineer-anything/page-full.png
    raw: raw/articles/park-2026-rea-reverse-engineer-anything-figures/page-full.png
    caption: "블로그 글 전체 페이지 스크린샷 (상단 6000px)"
    strategy: screenshot
    curated: false
  - id: fig03
    file: assets/park-2026-rea-reverse-engineer-anything/crop01.png
    raw: raw/articles/park-2026-rea-reverse-engineer-anything-figures/crop01.png
    caption: "블로그 본문의 대표 이미지 영역을 잘라 낸 크롭"
    strategy: crop
    curated: false
  - id: repo-fig01
    file: assets/park-2026-rea-reverse-engineer-anything/repo-fig01.png
    raw: https://raw.githubusercontent.com/morluto/rea/main/docs/assets/rea-hopper-analysis.png
    caption: "Hopper에서 /usr/bin/true를 분석하는 화면. 아래 콘솔에 11단계 분석 패스가 끝난 뒤 REA의 bootstrap.py 스크립트를 실행한 기록이 보인다"
    strategy: manual
    curated: true
  - id: repo-fig02
    file: assets/park-2026-rea-reverse-engineer-anything/repo-fig02.png
    raw: https://raw.githubusercontent.com/morluto/rea/main/website/public/assets/figures/rea-investigation-flow.svg
    caption: "REA 조사 흐름. 질문, REA의 검사와 추적(로컬 분석 어댑터 사용), 근거 읽기, 에이전트의 설명과 구현과 테스트 4단계와 후속 질문 순환을 보인다 (SVG를 PNG로 변환)"
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

박재홍의 실리콘밸리 블로그가 오픈소스 MCP 서버 REA를 한국어로 소개한 해설 글이다. REA가 AI 코딩 에이전트에게 리버스 엔지니어링 도구를 연결해 소스 코드 없이 다른 앱의 기능을 분석하고 비슷한 기능을 구현하게 한다는 점, 결론마다 근거와 한계를 붙이는 결과 형식, 분석 대상 표, 사례 세 가지, 데이터와 법적 책임 문제를 정리한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | REA: 무엇이든 리버스 엔지니어링하라 |
| 저자 | 박재홍 (박재홍의 실리콘밸리) |
| 매체 | wikidocs.net 블로그 |
| 연도 | 2026 |
| 원본 프로젝트 | morluto/rea (GitHub), 대응 sources는 `sources/morluto-rea.md` |
| 원문 구성 | 핵심요약, MCP 서버 소개, 설치와 사용, 분석 대상, 사례 세 가지, 데이터와 법적 책임, 실리콘밸리 영어, 핵심통찰 |
| 글에 적힌 스타 수 | 8만 개 이상 (수집 시점 GitHub API 값은 205,652개로, 글 작성 이후 크게 늘었다) |

## 2. 주요 기여 (Key Contributions)

- REA를 "AI 에이전트가 리버스 엔지니어링 도구를 직접 불러 쓰게 해주는 MCP 서버"로 정의하고, 리버스 엔지니어링, MCP, 에이전트 세 개념을 처음 읽는 독자 기준으로 풀이한다.
- 원저장소 README의 설치 절차, 분석 대상 표, 쇼케이스를 한국어로 옮기면서 각 항목의 의미(ELF, EVM, pwntools, ASAR 등)를 덧붙여 설명한다.
- REA가 도구 하나를 붙이는 기존 MCP 서버(GhidraMCP, ida-pro-mcp)와 달리 분석 대상을 기준으로 여러 도구를 묶었다는 점을 차별점으로 짚는다.
- 원문에 없는 분석으로 두 가지 위험을 제기한다. 분석 결과가 모델 제공사로 넘어가는 데이터 문제와, 에이전트 하나가 분석과 구현을 모두 하면 클린룸 설계(clean-room design)의 분리가 사라지는 법적 문제다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 REA의 정의와 쓰임새

- REA는 "Reverse Engineer Anything"의 약자다. 리버스 엔지니어링은 완성된 프로그램을 거꾸로 분석해 소스 코드 없이 동작 원리를 알아내는 일이다.
- 프로젝트 소개 문구는 "마음에 드는 기능을 봤다면, 그 기능이 어떻게 동작하는지 바이너리 수준까지 이해하라"이다.
- 사용 흐름: 개발자가 에이전트에게 다른 앱의 기능을 REA로 조사하라고 지시한다. 에이전트는 소스 코드 없이 앱을 검사해 동작을 설명하고 근거를 보여준 뒤, 개발자 프로젝트에 비슷한 기능을 구현하고 테스트한다.

### 3.2 분석 순환

에이전트가 MCP로 REA를 호출해 대상을 검사하고 관련 코드를 추적하면, REA가 발견 내용을 근거와 함께 돌려준다. 에이전트는 결과를 보고 추가 질문, 동작 설명, 구현 코드 작성과 테스트 중 하나를 이어 간다. 터미널 CLI 명령도 같은 분석 흐름을 따른다.

결과 형식의 원칙은 README 문장 "Analysis runs locally, and results include the evidence and limitations behind each conclusion."이다. 글은 기계어를 거꾸로 풀어낸 코드가 원본 소스와 같지 않아 그것만 보고 내린 설명은 틀릴 수 있으므로, 결론마다 근거와 한계를 붙여 개발자가 직접 확인하게 하는 설계라고 해석한다.

### 3.3 설치와 사용

| 단계 | 명령 또는 조건 |
|---|---|
| 런타임 요구 | Node.js 22.x(22.19 이상), 24.x(24.11 이상), 26 이상 중 하나와 npm |
| 설치 | `npx rea-agents setup` 실행 후 연결할 에이전트를 고르고 설정 변경을 승인 |
| 설치 결과 | MCP 서버 등록, 분석 절차를 담은 작업 지침(스킬) 설치, 기존 설정 백업. 설치 후 에이전트 재시작 필요 |
| 지원 에이전트 | Claude Code, Codex, Cursor, Gemini CLI, Grok Build 등. 로컬 MCP 서버를 지원하면 수동 등록 가능 |
| 스킬만 설치 | skills.sh에서 가능하지만 MCP 서버는 등록되지 않아 원문은 setup으로 함께 설치하라고 권한다 |
| CLI 분석 예시 | `npx -y rea-agents@latest analyze-javascript-application /absolute/path/to/app --json` |
| 전역 설치 | `npm install --global rea-agents` 후 `rea --help` |
| 업데이트 | 전역 설치는 `rea update` (Bun은 1.2.17 이상), npx 사용자는 `npx rea-agents@latest setup` |

- 실행 파일을 깊이 분석하려면 디스어셈블러 겸 디컴파일러 하나가 필요하다. REA는 Hopper, Ghidra, IDA를 쓰고 이를 분석 엔진(provider)이라고 부른다.
- Ghidra와 IDA는 이미 설치된 것을 쓰고, Hopper는 사용자가 승인하면 설치 과정에서 함께 설치한다. Hopper는 필요할 때 REA가 직접 실행하며, macOS 첫 실행에서는 데모 모드와 라이선스 활성화 중 하나를 고르는 창이 뜰 수 있다.
- 자바스크립트 정적 분석과 .NET 분석은 분석 엔진 없이 동작한다.
- 에이전트 요청 예시: "Understand how search works in the Notes app, show me the evidence, and build a similar feature for my project." Notes와 search 자리에 분석할 앱과 기능을 넣는다.
- 자바스크립트/일렉트론 CLI 분석 대상은 압축을 푼 앱 디렉터리나 ASAR 파일이다. ASAR는 일렉트론 앱의 소스 파일을 하나로 묶은 아카이브다. 결과에는 모듈과 import 관계가 근거와 함께 담기고, 렌더러 프로세스와 메인 프로세스의 경계도 표시된다.
- 버그를 만나면 먼저 업데이트하고 같은 작업을 다시 해 본 뒤, 남으면 REA 버전, 대상 종류, 재현 절차, 오류 출력을 담아 이슈를 연다.

### 3.4 분석 대상 표 (글이 옮긴 14종)

| 대상 | REA가 돌려주는 것 | 필요한 것 |
|---|---|---|
| 네이티브 바이너리 | 의사 코드, 어셈블리, 문자열, 심볼, 호출과 참조 | Hopper, Ghidra, IDA 중 하나 |
| 오프라인 ELF 구조 | 섹션, 세그먼트, 원래 심볼과 재배치 정보, 정적 보안 완화 기법 후보 | 리눅스 x64, 사용자가 준비한 pwntools |
| EVM 바이트코드 | 함수 디스패치 셀렉터, 바이트 오프셋, 추정 인자, 상태 변경 여부 | 리눅스 x64, 로컬 raw/hex 파일 |
| 기록된 리눅스 크래시 | 코어 파일 노트 원문, 모든 스레드의 레지스터와 시그널, 메모리 매핑 후보(선택) | 리눅스 x64, pwntools, GDB/pwndbg(선택) |
| 자바스크립트/일렉트론 | 모듈, import, 소스맵, 라우트, IPC, 네이티브 애드온 관계 | Node.js, npm |
| 웹사이트 | 페이지 구조, 스크립트, 네트워크 관찰 결과, 요청한 스크린샷 | 크롬 계열 브라우저 |
| 저장된 네트워크 캡처 | 요청, 응답, 노출된 페이로드, 소스 위치 | HAR 파일, mitmproxy 캡처는 리눅스의 mitmdump |
| .NET 어셈블리 | 메타데이터, CIL 명령어, 선언된 네이티브 의존성, 빌드 간 비교 | 없음 (정적 분석만) |
| 안드로이드 APK | 매니페스트 선언, 클래스, 디컴파일한 메서드, 참조 | 헤드리스 JADX, 전체 JDK |
| 안드로이드 기기 | 기기, 패키지, 프로세스, 로그, 덤프, 화면 캡처, 파일 전송 | 사용자가 준비한 adb |
| JEB 프로젝트 | 프로젝트 단위, 산출물 다이제스트, 타입과 메서드 의사 코드 | MCP 지원 JEB 클라이언트, REA_JEB_MCP_URL |
| 안드로이드 리소스 | 디코딩한 매니페스트, 문자열 테이블, 로캘, 버전 정보 | Apktool |
| 펌웨어 | 영역, 추출 결과, 네이티브 분석으로 넘길 대상 | 리눅스의 Binwalk, Unblob |
| 패키지와 리소스 | 파일 목록, 다이제스트, plist, 애플 번들 구조 | 따로 적힌 도구 없음 |
| 프로세스 동작 | 터미널 출력, 입력 상호작용, 종료와 파일 시스템 관찰, 실행 간 비교 | 네이티브 PTY가 있는 리눅스, macOS |

(글은 README 표를 옮기면서 Go 바이너리, Rust 바이너리, WASM, SQLite, Flutter, 패킷 캡처, 패킷 요약, 로직 신호 기록 행을 생략했다. 전체 목록은 `sources/morluto-rea.md`에 있다.)

- ELF 구조, EVM 바이트코드, 리눅스 크래시 분석은 보안 연구자를 위한 기능이다. ELF는 리눅스 실행 파일 형식이고, EVM 바이트코드는 이더리움 스마트 컨트랙트가 실제로 실행되는 코드이며, pwntools는 보안 연구와 해킹 대회에서 쓰는 파이썬 도구 모음이다.
- 안드로이드는 네 가지 경로다. APK는 JADX로 디컴파일하고, 연결 기기는 adb로 다루며, 리소스는 Apktool로 디코딩하고, 상용 도구 JEB 프로젝트도 불러온다.
- 정적 분석은 파일만 읽고 앱을 실행하지 않는다 (자바스크립트, .NET). 런타임 캡처는 대상을 실제로 실행하거나 조작하며 사용자 계정 권한으로 동작하므로 기능마다 시스템 영향이 가이드에 적혀 있다.
- Windows에서 Ghidra를 분석 엔진으로 쓰는 것은 실험 단계다. Ghidra는 16비트 DOS 프로그램도 분석한다. 큰 바이너리는 `REA_GHIDRA_STARTUP_TIMEOUT_MS` 환경 변수로 시작 제한 시간을 늘린다.

### 3.5 기존 MCP 서버와의 차이

MCP가 2024년 말 공개된 뒤 GhidraMCP, ida-pro-mcp처럼 분석 도구 하나를 에이전트에 붙이는 MCP 서버가 여럿 나왔다. REA는 분석 대상을 기준으로 여러 도구를 하나의 MCP 서버로 묶었다는 점이 다르다. 에이전트는 대상이 무엇이든 같은 서버를 부르면 된다. 대신 필요한 도구와 운영체제가 대상마다 갈린다. ELF, EVM, 크래시 분석은 리눅스 x64에서만, 펌웨어 추출은 리눅스에서만 동작하고, pwntools, adb, Apktool, JEB처럼 사용자가 직접 갖춰야 하는 도구도 많다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

글은 원저장소의 쇼케이스 세 가지를 사례로 옮긴다.

| 사례 | 대상 | 분석 내용 | 검증 |
|---|---|---|---|
| DX볼(DX-Ball) | 벽돌 깨기 게임 | 소리 함수 호출에서 위치 값을 좌우 스피커 배분 값(pan)으로 바꾸는 보조 함수까지 추적, 불완전한 의사 코드를 C로 재작성 | 원본 x86 코드와 비교한 3,205개 경우를 모두 통과, 컴파일 결과가 원본 함수 63바이트와 일치 |
| 노션(Notion) | 일렉트론 데스크톱 앱 | 렌더러의 클립보드 API를 찾아 프리로드와 IPC를 거쳐 메인 프로세스까지 추적, 서식이 담긴 클립보드 형식 확인 | 별도 대조 수치 없음 |
| TH04 (동방환상향) | NEC PC-98용 슈팅 게임 | 16비트 명령어에서 탄환 고리의 각도 계산 두 가지(고정 각도, 플레이어 조준) 복원 | 복원한 C++를 당시 컴파일러 출력과 비교 |

- DX볼 사례는 동작뿐 아니라 기계어까지 원본과 같다는 뜻이다. DX볼과 TH04 사례 모두 복원 코드 저장소가 공개돼 있다.
- 글은 두 게임 사례가 복원 결과를 원본과 대조한 이유를 의사 코드만으로는 정확한 복원을 보장할 수 없기 때문이라고 설명한다.
- 프로젝트는 사용자에게 흥미로운 분석 사례를 대상, 질문, REA가 도운 방식, 발견 내용을 담아 이슈나 풀 리퀘스트로 공유해 달라고 요청한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **데이터 경로**: REA는 대상 앱을 업로드하지 않고 로컬에서 분석하지만, 분석 결과는 에이전트에게 전달되고 모델 제공사의 데이터 정책을 따른다. 사내 기밀 바이너리라면 결과에 담긴 코드 조각과 문자열이 모델 제공사로 넘어간다는 점을 검토해야 한다.
- **법적 책임**: 프로젝트는 REA가 합법적인 리버스 엔지니어링 연구, 분석, 재구성을 위한 도구라고 밝히고, 허가 취득과 법 준수 책임을 사용자에게 둔다. 불법적이거나 허가받지 않은 사용은 지지하지 않는다고 명시한다.
- **사칭 토큰**: 프로젝트는 암호화폐나 토큰을 발행하거나 보증한 적이 없으며 REA 이름을 쓰는 토큰은 무관하다고 따로 밝힌다. 글은 이 고지를 사칭 토큰이 실제로 유통되고 있다는 신호로 읽는다.
- **도구와 플랫폼 제약**: 깊은 분석에는 Hopper, Ghidra, IDA 중 하나가 필요하고, 크래시 분석 등 여러 기능이 리눅스 x64 전용이다.
- **핵심통찰의 문제 제기**: REA는 전문 도구에 익숙한 사람의 일이던 리버스 엔지니어링을 에이전트에게 던지는 질문 한 줄로 바꾼다. 진입 장벽이 낮아진 만큼 무엇을 분석하고 무엇을 만들어도 되는지는 개발자 개인의 판단이 된다. 남의 앱을 분석해 비슷한 기능을 만드는 일은 소프트웨어 사용권 계약(EULA)의 역공학 금지 조항과 충돌할 수 있다. 업계는 분석하는 사람과 구현하는 사람을 나누는 클린룸 설계로 이 위험을 줄여 왔는데, 에이전트 하나가 분석과 구현을 모두 하면 이 구분이 사라진다. 따라서 실무 투입 전에 대상 앱의 사용권 계약과 분석 결과의 외부 전송에 관한 회사 정책을 확인해야 한다고 결론짓는다.
- 라이선스는 MIT다. 보안 취약점은 SECURITY.md 절차로 신고하고 기여 방법은 CONTRIBUTING.md에 있다.

## 6. 관련 연구 (Related Work)

- GhidraMCP, ida-pro-mcp: 단일 분석 도구를 에이전트에 붙이는 MCP 서버로, 글이 REA와 대비한 사례다.
- Hopper, Ghidra, IDA, JEB, JADX, Apktool, Binwalk, Unblob, pwntools: REA가 감싸는 외부 분석 도구다.
- 클린룸 설계: 분석과 구현을 다른 사람이 맡아 저작권 침해 위험을 줄이는 업계 관행이다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| 리버스 엔지니어링 | 완성된 프로그램을 거꾸로 분석해 소스 코드 없이 동작 원리를 알아내는 일 (역공학) |
| 분석 엔진 (provider) | REA가 네이티브 분석에 쓰는 디스어셈블러 겸 디컴파일러. Hopper, Ghidra, IDA |
| 의사 코드 (pseudocode) | 디컴파일러가 기계어를 C 비슷한 모양으로 되돌린 코드. 원본 소스와 같지 않다 |
| 정적 분석 / 런타임 캡처 | 파일만 읽는 분석과, 대상을 실제로 실행하거나 조작하며 관찰하는 분석 |
| ASAR | 일렉트론 앱의 소스 파일을 하나로 묶은 아카이브 파일 |
| 보안 완화 기법 (mitigation) | 실행 파일에 걸린, 공격을 어렵게 만드는 보호 장치 |
| 클린룸 설계 (clean-room design) | 분석하는 사람과 구현하는 사람을 나눠 법적 위험을 줄이는 개발 방식 |

글 끝의 "실리콘밸리 영어" 절은 README 문장 세 개를 해설한다. down to the binary level(가장 밑바닥 단위까지 빠짐없이), worked example(풀이 과정을 처음부터 끝까지 보여주는 예제), not affiliated with(공식 관계가 없다, 면책 고지의 단골 표현이며 endorsed by와 짝을 이룬다).

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | REA 대표 이미지 (로고, 디스어셈블, 디컴파일, 헥스 덤프, 에이전트 워크플로) | fetched | ★ wiki 권장 (overview) |
| fig02 | 블로그 전체 페이지 스크린샷 | screenshot | (아카이브용) |
| fig03 | 대표 이미지 영역 크롭 | crop | (fig01과 중복) |
| repo-fig01 | 저장소 README의 Hopper 분석 화면 (`sources/morluto-rea.md`의 fig01) | manual | ★ wiki 권장 (사용 화면) |
| repo-fig02 | 저장소 README의 조사 흐름도 (`sources/morluto-rea.md`의 fig02) | manual | ★ wiki 권장 (architecture) |
