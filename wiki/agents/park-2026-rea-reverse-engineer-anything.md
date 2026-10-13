---
title: "REA: 무엇이든 리버스 엔지니어링하라"
type: article
year: 2026
category: agents
source: park-2026-rea-reverse-engineer-anything.md
sources:
  - park-2026-rea-reverse-engineer-anything.md
  - morluto-rea.md
raw_path: raw/articles/park-2026-rea-reverse-engineer-anything.md
raw_filename: "park-2026-rea-reverse-engineer-anything.md"
source_collection: external
author: "박재홍"
url: "https://wikidocs.net/blog/@jaehong/33128/"
publisher: "박재홍의 실리콘밸리 (wikidocs.net)"
repo_url: "https://github.com/morluto/rea"
license: "MIT"
tags: [mcp, reverse-engineering, agent-tools, security]
figures:
  - id: fig01
    file: assets/park-2026-rea-reverse-engineer-anything/fig01.png
    raw: raw/articles/park-2026-rea-reverse-engineer-anything-figures/fig01.png
    caption: "REA 대표 이미지. 왼쪽에 Reverse Engineer Anything 로고, 오른쪽에 디스어셈블 결과와 디컴파일한 check_auth 함수, 헥스 덤프, 에이전트 워크플로 5단계가 보인다"
    strategy: fetched
    curated: true
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

## 요약

REA(Reverse Engineer Anything)는 AI 코딩 에이전트가 소스 코드 없이 다른 앱의 기능을 분석하고 그 결과로 비슷한 기능을 구현하게 해주는 오픈소스 도구다. 네이티브 바이너리, 자바스크립트와 일렉트론 앱, .NET 어셈블리, 안드로이드 앱, 웹사이트, 펌웨어, 네트워크 캡처 등 23종 대상을 하나의 MCP 서버와 CLI로 다룬다. 저장소는 morluto/rea이고 npm 패키지 이름은 `rea-agents`이며 라이선스는 MIT다.

이 페이지는 두 자료를 합쳐 정리한다. 하나는 박재홍의 실리콘밸리 블로그가 REA를 한국어로 해설한 글이고 다른 하나는 원저장소의 README, DISCLAIMER.md, 번들 스킬 문서다. 해설 글은 개념 풀이와 위험 분석을, 저장소 문서는 분석 대상 전체 목록과 에이전트 조사 절차를 담당한다.

REA의 설계 원칙은 README 한 문장에 담겨 있다. "Analysis runs locally, and results include the evidence and limitations behind each conclusion." 즉 분석은 사용자 컴퓨터에서 실행되고 결과에는 결론마다 그 결론을 뒷받침하는 근거와 한계가 함께 붙는다. 이 원칙이 결과 형식(Evidence 레코드), 에이전트 지침(관찰, 추론, 미지 구분), 검증 도구(`verify_reconstruction`)까지 일관되게 이어진다.

![[assets/park-2026-rea-reverse-engineer-anything/fig01.png]]
*Figure 1: REA 대표 이미지. 디스어셈블, 디컴파일, 헥스 덤프, 에이전트 워크플로를 한 화면에 모았다 (박재홍 2026)*

## 배경

리버스 엔지니어링은 완성된 프로그램을 거꾸로 분석해 소스 코드 없이 동작 원리를 알아내는 일이다. 전통적으로 Hopper, Ghidra, IDA 같은 디스어셈블러와 디컴파일러를 손에 익힌 전문가의 영역이었다. 대상이 바뀌면 도구도 바뀐다. 안드로이드 앱은 JADX와 Apktool, 펌웨어는 Binwalk, 네트워크 캡처는 TShark, 리눅스 크래시는 pwntools와 GDB를 쓴다.

MCP가 2024년 말 공개된 뒤, 분석 도구 하나를 에이전트에 연결하는 MCP 서버가 여럿 나왔다. 해설 글이 드는 예는 Ghidra용 GhidraMCP와 IDA용 ida-pro-mcp다. 이 방식은 도구마다 서버가 따로 있어, 에이전트는 대상 종류에 맞는 서버를 골라 연결해야 했다.

REA는 이 문제를 분석 대상 기준의 통합으로 접근한다. 대상이 무엇이든 에이전트는 같은 MCP 서버를 부르고 REA가 대상에 맞는 외부 도구를 골라 실행한다. 프로젝트 소개 문구는 쓰임새를 이렇게 요약한다. "See a feature you like. Understand how it works, down to the binary level." 마음에 드는 기능을 봤다면, 그 기능이 어떻게 동작하는지 바이너리 수준까지 이해하라는 뜻이다.

REA의 인기는 빠르게 커졌다. 해설 글은 작성 시점 GitHub 스타가 8만 개를 넘겼다고 적었고 README는 18만 개 돌파를 감사하는 문구를 싣고 있으며 수집 시점(2026-10-14) GitHub API 값은 205,652개다. 저장소 생성일은 2026-04-14이고 최신 릴리스는 rea-agents-6.4.0(2026-10-11)이다.

## 핵심 개념

MCP는 모델이 외부 도구와 데이터 원천에 표준화된 방식으로 접근하게 하는 프로토콜이다. REA는 이 MCP 서버 형태로 에이전트에 등록되며 에이전트는 REA가 제공하는 도구 목록에서 필요한 분석 도구를 직접 호출한다.

스킬은 특정 작업 절차를 담아 에이전트에 결합하는 지침 패키지다. REA는 `reverse-engineer-anything`이라는 스킬을 함께 배포한다. MCP 서버가 "무엇을 할 수 있는가"를 제공한다면, 스킬은 "어떤 순서로 조사하고 어떻게 보고하는가"를 지시한다.

분석 엔진(provider)은 REA가 네이티브 바이너리 분석에 쓰는 외부 디스어셈블러 겸 디컴파일러를 가리키는 REA 고유의 이름이다. Hopper, Ghidra, IDA가 여기에 해당하며 오프라인 검사용으로 GNU objdump와 Rizin도 지원한다. 디스어셈블러는 기계어를 어셈블리어로, 디컴파일러는 기계어를 C 비슷한 코드로 되돌린다.

의사 코드(pseudocode)는 디컴파일러가 기계어를 C 비슷한 모양으로 되돌린 코드다. 의사 코드는 원본 소스와 같지 않다. 변수 이름, 구조, 일부 연산이 사라지거나 바뀌기 때문에, 의사 코드만 보고 내린 결론은 그럴듯해도 틀릴 수 있다. REA가 근거와 한계를 강조하는 이유가 여기에 있다.

Evidence 레코드는 REA 도구가 반환하는 결과 단위다. 각 레코드는 안정 참조인 `evidence_id`, 연산 결과인 `normalized_result`, 권한(authority), 한계, coverage, 남은 미지 항목을 담는다. 에이전트는 결론을 서술할 때 이 Evidence ID를 인용한다.

정적 분석(static analysis)은 파일만 읽고 대상을 실행하지 않는 분석이다. 런타임 캡처는 대상을 실제로 실행하거나 조작하며 관찰하는 분석이고 사용자 계정 권한으로 실행된다. 두 방식은 위험의 크기가 달라서, REA는 런타임 기능마다 시스템에 미치는 영향을 가이드에 따로 적는다.

## 방법

### 조사 흐름

REA의 분석은 에이전트와 REA가 주고받는 순환으로 진행된다. 에이전트가 MCP로 REA를 호출해 대상을 검사하고 관련 코드를 추적하면, REA는 발견한 내용을 근거와 함께 돌려준다. 에이전트는 결과를 보고 추가로 질문하거나, 동작을 설명하거나, 구현 코드를 쓰고 테스트한다. 터미널의 CLI 명령도 같은 워크플로를 따른다.

![[assets/park-2026-rea-reverse-engineer-anything/repo-fig02.png]]
*Figure 2: REA 조사 흐름 4단계와 후속 질문 순환 (morluto/rea README)*

| 단계 | 이름 | 주체 | 내용 |
|---|---|---|---|
| 1 | Ask | 에이전트 | 로컬 대상(앱, 바이너리, 브라우저)에 대해 질문한다 |
| 2 | Inspect & trace | REA (CLI / MCP) | 로컬 분석 어댑터로 대상을 검사하고 추적한다 |
| 3 | Read the evidence | 에이전트 | 코드, 참조, 미지 항목으로 구성된 결과를 읽는다 |
| 4 | Use what you learn | 에이전트 | 동작을 설명하고 구현하고 테스트한다 |

4단계에서 2단계로 되돌아가는 화살표가 후속 질문이다. 즉 에이전트는 한 번의 분석으로 끝내지 않고 결과에 남은 빈틈을 다음 질문으로 만들어 다시 REA를 호출한다.

### 설치와 연결

설치는 명령 하나로 끝난다. Node.js 22.x(22.19 이상), 24.x(24.11 이상), 26 이상 중 하나와 npm이 있으면 다음을 실행한다.

```bash
npx rea-agents setup
```

명령을 실행하면 연결할 에이전트를 고르고 제안된 설정 변경을 검토해 승인한다. setup은 세 가지를 처리한다.

- REA의 MCP 서버를 에이전트 설정에 등록한다.
- 분석 절차를 담은 스킬을 설치한다.
- 기존 설정 파일을 백업한다.

설치가 끝나면 에이전트를 다시 시작해야 도구가 세션에 나타난다. README가 직접 지원을 명시한 에이전트는 Claude Code, Codex, Cursor, Gemini CLI, Grok Build 등이고 스킬 문서는 클라이언트 ID 15개를 나열한다.

| 구분 | 클라이언트 ID |
|---|---|
| Anthropic 계열 | `claude_code`, `claude_desktop` |
| 코딩 에이전트 | `codex`, `cursor`, `gemini_cli`, `windsurf`, `devin`, `opencode`, `antigravity`, `copilot_cli`, `commandcode`, `omp` |
| 편집기 | `vscode` |
| Grok 계열 | `grok_build`, `grok_bot` (로컬 파일 등록 없음) |

로컬 MCP 서버를 지원하는 에이전트라면 목록에 없어도 MCP 서버를 수동 등록해 쓸 수 있다. skills.sh에서 REA 스킬만 따로 설치할 수도 있지만 스킬만 설치하면 MCP 서버가 등록되지 않는다. 따라서 해설 글과 README 모두 `npx rea-agents setup`으로 둘을 함께 설치하라고 권한다.

### 분석 엔진 준비

실행 파일을 깊이 분석하려면 분석 엔진이 하나 필요하다. 엔진마다 준비 방식이 다르다.

| 분석 엔진 | 준비 방식 | 비고 |
|---|---|---|
| Hopper | 사용자가 승인하면 setup이 설치 | 필요할 때 REA가 직접 실행. macOS 첫 실행에서 데모 모드와 라이선스 활성화 중 하나를 고르는 창이 뜰 수 있다 |
| Ghidra | 이미 설치된 것을 사용 | Windows 지원은 실험 단계. 16비트 DOS 프로그램도 분석 |
| IDA | 이미 설치된 것을 사용 | mrexodia/ida-pro-mcp의 설치와 등록을 재사용 |
| GNU objdump, Rizin | 사용자가 공급 | 오프라인 네이티브 검사용. REA가 설치하거나 업데이트하지 않는다 |

Hopper의 macOS 첫 실행 대화상자는 첫 CLI나 MCP 작업 전에 같은 사용자 세션에서 처리해 둬야 한다. 큰 바이너리를 열다가 시간이 부족하면 `REA_GHIDRA_STARTUP_TIMEOUT_MS` 또는 `REA_HOPPER_STARTUP_TIMEOUT_MS` 환경 변수로 시작 제한 시간을 늘린다.

자바스크립트 정적 분석과 .NET 분석은 분석 엔진 없이 동작한다. 반면 setup은 Node.js, npm, Homebrew, Java, Ghidra, IDA, JADX, Binwalk, Unblob을 설치하거나 업그레이드하지 않는다. 즉 REA가 대신 갖춰 주는 외부 도구는 Hopper 하나뿐이다.

![[assets/park-2026-rea-reverse-engineer-anything/repo-fig01.png]]
*Figure 3: Hopper에서 REA 분석 브리지가 bootstrap.py를 실행한 화면 (morluto/rea README)*

### 사용 방법

설치 후에는 에이전트에게 평소처럼 말로 지시한다. README와 해설 글이 함께 드는 예시는 다음과 같다.

```text
Understand how search works in the Notes app, show me the evidence, and build a
similar feature for my project.
```

Notes 앱의 검색이 어떻게 동작하는지 파악하고 근거를 보여주고 내 프로젝트에 비슷한 기능을 만들어 달라는 요청이다. Notes 자리에는 분석할 앱을, search 자리에는 알고 싶은 기능을 쓴다.

에이전트 없이 터미널에서 직접 분석할 수도 있다. 다음 명령은 압축을 푼 자바스크립트/일렉트론 앱 디렉터리나 ASAR 파일을 분석한다. ASAR는 일렉트론 앱의 소스 파일을 하나로 묶은 아카이브 파일이다.

```bash
npx -y rea-agents@latest analyze-javascript-application /absolute/path/to/app --json
```

결과에는 모듈과 import 관계가 근거와 함께 담기고 화면을 그리는 렌더러 프로세스와 운영체제에 접근하는 메인 프로세스의 경계도 표시된다. Windows에서는 경로를 `"D:/apps/example"`처럼 쓴다.

| 용도 | 명령 |
|---|---|
| 전역 설치 | `npm install --global rea-agents` 후 `rea --help` |
| 전역 설치본 업데이트 | `rea update` (Bun은 1.2.17 이상) |
| npx 사용자의 에이전트 설정 갱신 | `npx rea-agents@latest setup` |
| 일회성 명령 | `npx rea-agents@latest <명령>`, Bun은 `bunx rea-agents@latest <명령>` |

네이티브 분석 명령을 CLI로 쓰려면 먼저 분석 엔진을 설정해야 하며 엔진 선택, 분석 스냅숏, 스크립트 작성은 저장소의 CLI 가이드(docs/cli.md)가 다룬다. REA는 빠르게 바뀌고 릴리스마다 버그 수정이 잦아, README는 늘 최신 버전을 유지하라고 권한다. 버그를 만나면 먼저 업데이트한 뒤 같은 작업을 다시 해 보고 문제가 남으면 REA 버전, 대상 종류, 재현 절차, 오류 출력을 담아 이슈를 연다.

### 분석 대상

REA는 대상 종류마다 다른 분석 도구를 하나의 MCP 서버로 묶었다. README 표는 23종을 나열하며 해설 글은 그중 15종을 옮겼다. 아래 표는 README 전체 목록을 성격별로 묶어 정리한 것이다.

**네이티브 코드와 실행 파일**

| 대상 | REA가 돌려주는 것 | 필요한 것 |
|---|---|---|
| 네이티브 바이너리 | 의사 코드, 어셈블리, 문자열, 심볼, 호출과 참조 | Hopper, Ghidra, IDA 중 하나 |
| 오프라인 ELF 구조 | 섹션, 세그먼트, 원래 심볼과 재배치 정보, 정적 보안 완화 기법 후보 | 리눅스 x64, 사용자가 준비한 pwntools |
| Go 바이너리 | 내장 컴파일러 버전, 모듈, replace, 빌드 설정 | 내장 정적 검사 (Go 설치 불필요) |
| Rust 바이너리 | cargo-auditable crate 이름, 버전, 소스, 의존 관계 | 내장 정적 검사 |
| WASM | 검증, 섹션, import/export WAT, 디코딩한 WAT | 사용자가 준비한 WABT 1.0.42 |
| EVM 바이트코드 | 함수 디스패치 셀렉터, 바이트 오프셋, 추정 인자, 상태 변경 여부 | 리눅스 x64, 로컬 raw/hex 파일 |
| 기록된 리눅스 크래시 | 코어 파일 노트 원문, 모든 스레드의 레지스터와 시그널, 메모리 매핑 후보(선택) | 리눅스 x64, pwntools, GDB/pwndbg(선택) |
| .NET 어셈블리 | 메타데이터, CIL 명령어, 선언된 네이티브 의존성, 빌드 간 비교 | 없음 (정적 분석만) |

**앱과 웹**

| 대상 | REA가 돌려주는 것 | 필요한 것 |
|---|---|---|
| 자바스크립트/일렉트론 | 모듈, import, 소스맵, 라우트, IPC, 네이티브 애드온 관계 | Node.js, npm |
| 웹사이트 | 페이지 구조, 스크립트, 네트워크 관찰 결과, 요청한 스크린샷 | 크롬 계열 브라우저 |
| 저장된 네트워크 캡처 | 요청, 응답, 노출된 페이로드, 소스 위치 | HAR 또는 Fiddler SAZ, 리눅스의 mitmdump |
| SQLite 데이터베이스 | 테이블, 컬럼, 인덱스, 뷰, 트리거, 선택한 행 | 로컬 DB/WAL 스냅숏, Node.js 24.15 이상 또는 26 이상 |
| 패키지와 리소스 | 파일 목록, 다이제스트, plist, 애플 번들 구조, 추출한 리소스 | 별도 도구 없음 |
| 프로세스 동작 | 터미널 출력, 입력 상호작용, 종료와 파일 시스템 관찰, 실행 간 비교 | 네이티브 PTY가 있는 리눅스, macOS |

**모바일**

| 대상 | REA가 돌려주는 것 | 필요한 것 |
|---|---|---|
| 안드로이드 APK | 매니페스트 선언, 클래스, 디컴파일한 메서드, 참조 | 헤드리스 JADX, 전체 JDK |
| 안드로이드 기기 | 기기, 패키지, 프로세스, 로그, 덤프, 화면 캡처, 파일 전송 | 사용자가 준비한 adb (에뮬레이터나 실제 기기) |
| JEB 프로젝트 | 프로젝트 단위, 산출물 다이제스트, 타입과 메서드 의사 코드 | MCP를 제공하는 JEB 클라이언트, `REA_JEB_MCP_URL` |
| 안드로이드 리소스 | 디코딩한 매니페스트, 문자열 테이블, 로캘, 버전 정보 | 사용자가 준비한 Apktool |
| Flutter 앱 | Dart 스냅숏 해시, ABI별 라이브러리 다이제스트, 엔진 빌드 출처 | 없음 (정적 APK 파싱) |

**하드웨어와 네트워크 기록**

| 대상 | REA가 돌려주는 것 | 필요한 것 |
|---|---|---|
| 펌웨어 | 영역, 추출 결과, 네이티브 분석으로 넘길 대상 | 리눅스의 Binwalk, Unblob |
| 기록된 패킷 | 선택 필드, 반복 값, 필터, decode-as 규칙 | 리눅스 TShark 4.x와 prlimit |
| 패킷 요약 | 엔드포인트, DNS, TLS SNI, 프로토콜 분포, HTTP 요청 | tshark와 capinfos |
| 기록된 로직 신호 | 디코더 주석, 샘플 범위, 진단 | 리눅스 sigrok-cli 0.7.2와 prlimit |

표에서 ELF 구조, EVM 바이트코드, 리눅스 크래시 분석은 보안 연구자를 위한 기능이다. ELF는 리눅스 실행 파일 형식이고 EVM(이더리움 가상 머신) 바이트코드는 이더리움 스마트 컨트랙트가 실제로 실행되는 코드다. pwntools는 보안 연구와 해킹 대회에서 널리 쓰는 파이썬 도구 모음이고 보안 완화 기법(mitigation)은 실행 파일에 걸린, 공격을 어렵게 만드는 보호 장치다. 해설 글은 REA가 일반 개발자를 앞세우지만 이 기능들은 보안 분석 쪽에 가깝다고 평가한다.

안드로이드 쪽은 네 가지 경로로 나뉜다. APK는 JADX로 디컴파일하고 연결한 기기는 adb로 다루며 앱 리소스는 Apktool로 디코딩하고 상용 도구 JEB를 쓰고 있다면 JEB 프로젝트도 불러온다.

REA가 대상을 하나의 서버로 묶은 대가는 환경 요구의 분산이다. ELF, EVM, 크래시, 패킷, 신호 분석은 리눅스(x64)에서만, 펌웨어 추출은 리눅스에서만 동작한다. pwntools, adb, Apktool, JEB, TShark, sigrok-cli, WABT처럼 사용자가 직접 갖춰야 하는 도구도 많다. 즉 에이전트가 부르는 서버는 하나지만 실제로 쓸 수 있는 기능 범위는 사용자 환경이 정한다.

### 번들 스킬의 조사 절차

`reverse-engineer-anything` 스킬(version 41)은 REA를 언제 쓰고 어떤 순서로 조사할지를 에이전트에게 지시한다. 스킬 description은 "출시된 artifact나 요청된 런타임 근거로 기능 설명, 버전 비교, 디컴파일, 재구성 안내"를 범위로 잡고 완전한 소스 저장소의 일반 아키텍처 분석에는 REA를 쓰지 말라고 명시한다. artifact는 여기서 배포된 실행 파일, 패키지, 아카이브처럼 소스가 아닌 산출 단위를 가리킨다.

**필요할 때만 연결한다.** 도구가 이미 세션에 보이면 진단 없이 바로 대상으로 간다. 도구가 없거나 엔진이 없을 때만 원인을 구분해 복구한다.

| 관찰된 상황 | 원인 | 처리 |
|---|---|---|
| 등록 누락, 손상, 오래됨 | 설정 문제 | `setup --dry-run --json`으로 읽기 전용 계획을 보이고 승인 후 `setup --yes`로 적용 |
| 등록은 맞는데 세션에 도구가 없음 | 연결 문제 | 에이전트 재시작 또는 재연결 |
| 분석 엔진 없음 | 엔진 문제 | 그 엔진이 필요한 작업에만 영향. 정적 자바스크립트는 영향 없음 |
| 클라이언트가 호출을 차단 | 클라이언트 정책 | 복구 가이드를 따르고 같은 setup을 반복하지 않음 |

진단에는 `npx -y rea-agents@latest doctor --client <id> --json`을 쓴다. Hopper 설치 옵션(`--install-hopper`)은 별도 승인이 있을 때만 붙인다. MCP가 없을 때 CLI의 `analyze-javascript-application`을 대안으로 쓸 수 있지만 이것이 MCP 설정을 증명하지는 않는다.

**대상을 먼저 분류한다.** 첫 도구는 사용자가 준 대상의 종류로 정한다.

| 대상 | 첫 도구 |
|---|---|
| ASAR 또는 추출한 JS/Electron 트리 | `analyze_javascript_application` |
| ZIP/APK/IPA/MSIX/DMG 멤버 목록 | `open_binary`, 필요 시 `inspect_artifact` |
| Android APK 코드 | `inspect_android_package` |
| 관리 코드 PE/CLI | `inspect_managed_artifact` |
| 펌웨어 | `inspect_firmware_regions`, 추출 요청 시 `extract_firmware` |
| 열린 브라우저 페이지 / Electron 런타임 | `list_browser_targets` / `list_electron_targets` |
| HAR/SAZ/mitmproxy/qlog 캡처 | `inspect_web_network_capture` |
| 리눅스 ELF 레이아웃 / ELF 코어 | `inspect_binary_layout` / `inspect_recorded_crash` |
| 네이티브 실행 파일과 라이브러리 | `open_binary` 후 분석 도구, 필요 시 `binary_overview` |

사용자가 이름이나 경로 없이 "내 앱"이라고만 하면 artifact를 찾기 전에 어떤 앱인지 묻는다. 관련 없는 보고서의 경로나 근처 테스트 픽스처가 대상을 정하지 않으며 예시 앱을 사용자 대신 고르지 않는다. IDA는 `provider_id: "ida"`로 원본 바이너리를 열고 `.idb`나 `.i64` 데이터베이스를 넘기지 않는다.

**요약부터 본다.** 크기가 크거나 모르는 자바스크립트 앱과 ELF는 `"detail": "summary"`로 호출하고 반환된 `parent_evidence_id`를 `inspect_analysis_view`로 페이지 단위로 연다. 같은 분석이나 거부된 호출을 입력 변화 없이 반복하지 않는다. 전송 한도를 넘었다는 오류(`resource_constraint`)가 나면 같은 세션의 Evidence 참조로 작은 뷰를 보거나 `export_evidence_bundle`로 파일에 쓴다. 클라이언트가 결과를 잘라 보여 준 미리보기는 불완전한 것으로 보고 정본 JSON으로 파싱하지 않는다.

**결론을 세 가지로 구분한다.** 모든 결론은 관찰(observation), 추론(inference), 미지(unknown)를 구분하고 Evidence ID를 인용한다. 한계와 불완전한 coverage를 보존하고 정적 분석이 실행을 관찰했다고 암시하지 않는다. REA 자체는 호출별 승인 플래그를 요구하지 않지만 에이전트 클라이언트가 독립적으로 승인을 요구할 수 있다.

**넓은 조사는 7단계로 계획한다.** 여러 기능이나 하위 시스템에 걸친 요청은 다음 순서를 따른다.

1. 요청을 질문 체크리스트와 질문별 필요 근거로 바꾼다.
2. 현재 세션, artifact 정체, 저장된 분석 DB, 북마크, 이전 근거를 확인하고 재사용한다.
3. 가장 작은 overview에서 시작해, 질문마다 진입점부터 데이터와 상태 변화를 거쳐 결과까지 따라간다.
4. 질문에 영향을 주는 패키지 리소스와 설정을 코드와 함께 본다. 파일 이름, 문자열, 배치만으로 동작을 추정하지 않는다.
5. 결론을 그 결론이 요구하는 근거 유형으로 확인한다. 정적 근거로 답할 수 없을 때만 런타임 관찰을 쓴다.
6. 서로 독립인 질문은 병렬 작업자에게 범위를 나눠 맡긴다.
7. 결론마다 Evidence ID, 신뢰도와 근거 유형, 탐색 경계, 남은 미지를 연결한 finding ledger를 유지한다.

끝내기 전에는 체크리스트로 돌아가 질문마다 answered, partially answered, unresolved를 표시한다. 필요한 질문이 열려 있는데 넓은 조사를 완료라고 서술하지 않는다. 구현을 요청받았다면 일반 코딩 도구로 작성하되 관찰한 동작과 설계 선택을 구분하고 열린 네이티브 세션은 `close_binary`로 닫는다.

### Evidence와 검증 도구

REA의 Evidence 생성 도구는 MCP `structuredContent`와 CLI JSON에 완전한 레코드를 직접 반환한다. 미해결 질문은 `record_unknown`으로 세션 레지스트리에 기록하고 해소에 필요한 권한이나 환경, 지지하거나 반박하는 Evidence ID를 함께 적는다. 해소는 자격 있는 관찰 근거로만 검증된다.

비교 도구는 동등성이나 부재를 주장할 때 쓰며 각 도구가 증명하지 않는 범위가 명시돼 있다.

| 도구 | 비교 대상 | 증명하지 않는 것 |
|---|---|---|
| `compare_artifacts` | 인벤토리 페이지의 경로, 내용, 메타데이터, 그래프 관계 | 불완전한 페이지 집합에서의 부재 |
| `compare_functions` | 명시한 함수 Evidence끼리 | 바이너리 전체의 퍼지 매칭 |
| `compare_bundles` | 번들 멤버십과 미지 이력 | |
| `find_changed_behavior` | 기존 비교의 결합 | 정적 차이의 인과 (후보일 뿐) |
| `build_call_path` | 한 artifact와 엔진의 함수 dossier | 경계가 불완전할 때의 부재 (미지로 남음) |
| `correlate_static_and_runtime` | 명시적 매핑 | 패턴 일치의 인과 (가설일 뿐) |
| `verify_reconstruction` | 유한한 타입 명세 | 전역 동등성 (선언한 주장만 덮음) |

프로세스 캡처는 opt-in 행동 근거이며 보안 샌드박스가 아니다. 제한 시간에 걸린 대상이 최종 보고를 써야 하면 `finalization_ms`를 지정하는데, REA는 SIGTERM을 보내 관찰을 계속하다가 구간 끝까지 종료하지 않으면 SIGKILL을 한 번 보낸다. HAR Evidence에 `api-surface` 뷰를 적용하면 관찰된 요청을 메서드, origin, 경로 템플릿으로 묶어 보여 주지만 이는 handler 정체나 서버 스키마가 아니라 추론이며 요청을 재전송하지 않는다.

이 설계 전체는 해설 글의 해석과 일치한다. 의사 코드는 원본 소스와 같지 않으므로, REA는 결론의 근거와 경계를 항상 결과에 남겨 개발자가 직접 확인하고 어디까지 믿을지 정하게 한다.

## 결과

README는 쇼케이스 세 건을 공개하며 해설 글도 이를 사례로 옮긴다. 두 건은 옛 게임의 계산 함수를 복원해 원본과 대조했고 한 건은 일렉트론 앱의 처리 경로를 추적했다.

| 사례 | 대상 | 분석 내용 | 검증 |
|---|---|---|---|
| DX볼(DX-Ball) | 벽돌 깨기 게임 (x86) | 소리 함수 호출에서 위치 값을 좌우 스피커 배분 값(pan)으로 바꾸는 보조 함수까지 추적, 불완전한 의사 코드를 C로 재작성 | 원본 x86 코드와 비교한 3,205개 경우 전부 통과, 컴파일 결과가 원본 함수 63바이트와 일치 |
| 노션(Notion) | 일렉트론 데스크톱 앱 | 렌더러의 클립보드 API를 찾아 프리로드와 IPC를 거쳐 메인 프로세스까지 추적, 서식이 담긴 클립보드 형식 확인 | 사례 글 (대조 수치 없음) |
| TH04 (동방환상향) | NEC PC-98용 슈팅 게임 (16비트) | 탄환을 고리 모양으로 뿌리는 각도 계산 두 가지(고정 각도, 플레이어 조준) 복원 | 복원한 C++를 당시 컴파일러 출력과 비교 |

DX볼 사례의 의미는 동작이 같은 수준을 넘어 기계어까지 원본과 같다는 데 있다. 3,205개 입력에서 결과가 일치했고 다시 쓴 C 코드를 컴파일하면 원본 함수를 이루는 63바이트가 하나도 다르지 않게 나온다. 복원 코드는 N0zoM1z0/dx-ball 저장소로 공개돼 있다.

노션 사례는 일렉트론 앱의 구조를 따라간다. 일렉트론 앱은 화면을 그리는 렌더러 프로세스와 운영체제 기능에 접근하는 메인 프로세스로 나뉘고 프리로드 스크립트가 둘 사이를 잇고 두 프로세스는 IPC(프로세스 간 통신)로 메시지를 주고받는다. 분석은 렌더러의 클립보드 API, 프리로드, IPC, 메인 프로세스 순으로 호출을 따라간 뒤 서식이 담긴 클립보드 데이터 형식을 살폈다.

TH04는 동방 프로젝트의 네 번째 작품인 동방환상향이다. 분석은 원본 게임의 16비트 명령어에서 각도 계산을 복원했고 복원 코드는 N0zoM1z0/th04 저장소로 공개돼 있다.

두 게임 사례가 모두 원본 대조를 거친 것은 의사 코드만으로는 정확한 복원을 보장할 수 없기 때문이다. 해설 글은 이를 "기계어를 거꾸로 풀어낸 의사 코드가 불완전해도, 원본과 결과를 대조하면 원래 함수를 정확히 복원할 수 있다"로 요약한다. 저장소의 `verify_reconstruction` 도구가 바로 이 대조를 유한한 명세로 수행하는 장치다. 프로젝트는 사용자에게 흥미로운 분석 사례를 대상, 질문, REA가 도운 방식, 발견 내용을 담아 이슈나 풀 리퀘스트로 공유해 달라고 요청한다.

## 한계

### 데이터 경로

REA는 대상 앱을 업로드하지 않고 사용자 컴퓨터에서 분석한다. 그러나 분석 결과는 에이전트에게 전달되고 에이전트를 실행하는 모델 제공사는 자체 데이터 정책을 따른다. 따라서 사내 기밀 바이너리를 분석하면 결과에 담긴 코드 조각과 문자열이 모델 제공사로 넘어간다. DISCLAIMER.md도 로컬 동작이 허가를 성립시키지 않으며 실행한 대상과 서드파티 도구에 외부 영향이 없음을 보장하지 않는다고 적는다.

### 법적 책임과 허용 범위

프로젝트는 REA를 합법적인 연구, 교육, 상호운용성, 소프트웨어 보존, 소유하거나 허가받은 소프트웨어 분석을 위한 도구로 규정하고 허가 취득과 법 준수 책임을 사용자에게 둔다. DISCLAIMER.md가 나열한 허용 용도와 지원하지 않는 용도는 다음과 같다.

| 구분 | 내용 |
|---|---|
| 허용 용도 | 보안 연구, 악성코드와 사고 분석, 취약점 연구와 조율된 공개, CTF와 교육, 상호운용성, 소프트웨어 보존, 소유하거나 허가받은 소프트웨어의 디버깅과 감사 |
| 지원하지 않는 용도 | DRM, 라이선스 검사, 안티 치트 등 기술적 보호 조치 우회 |
| | 게임 치트 개발, 온라인 서비스 변조 |
| | 허가받지 않은 시스템의 인증, 봇 방지, 접근 제어 우회 |
| | 독점 소프트웨어 복제, 보호된 코드와 자산 재현 |
| | AI 모델 제공사의 사용 정책과 안전 조치 회피 |
| | AI 계정이나 API 접근의 재판매와 공유 |

지원하지 않는 용도의 요청은 이슈와 토론에서 응답 없이 닫히고 커뮤니티에서 제외될 수 있다. 또한 공개된 소프트웨어, 파일 소유, 디버깅 엔드포인트 접근만으로 모든 작업 권한이 성립하지 않으며 artifact 검사 허가가 실행, 가로채기, 기기 변경, 타인 시스템과의 상호작용 허가를 뜻하지 않는다. 디컴파일이나 재구성 결과를 얻어도 원본 프로그램이나 생성물에 대한 권리가 생기지 않는다.

상용 도구는 별도로 합법 취득해야 한다. IDA Pro와 Hex-Rays 디컴파일러, Hopper, JEB는 각 라이선스에 따라 써야 하며 REA는 라이선스, 키, 활성화 권리를 제공하지 않는다. 크랙, 도난 키, 무단 키 공유, 라이선스 제한 우회는 허가되지 않는다. 이 입장은 과거 릴리스와 커밋, npm 패키지, 별도 배포 스킬, 재배포본 등 모든 버전과 채널에 적용된다.

### 사칭 배포물

README 상단은 공식 배포처를 morluto/rea, rea.tools, rea-agents npm 패키지 셋으로 한정하고 비슷한 저장소 이름이나 복사된 README가 다운로드의 공식성을 보장하지 않는다고 경고한다. 또한 프로젝트는 암호화폐나 토큰을 발행하거나 보증한 적이 없으며 REA 이름을 쓰는 토큰은 프로젝트와 관계가 없다고 밝힌다. 해설 글은 이런 고지가 따로 있다는 사실을 REA 이름을 내건 토큰이 실제로 유통되고 있다는 신호로 읽는다.

### 기술적 제약

- 깊은 네이티브 분석에는 Hopper, Ghidra, IDA 중 하나가 필요하고 Windows Ghidra는 실험 단계다.
- ELF, EVM, 크래시, 패킷, 신호 분석과 펌웨어 추출은 리눅스(대부분 x64) 전용이다.
- 다수 외부 도구를 사용자가 직접 공급해야 하고 REA setup은 Hopper 외에는 설치하지 않는다.
- 정적 차이와 패턴 일치는 후보와 가설이며 페이지 소진은 네트워크나 소스의 완전성을 증명하지 않는다.
- 스킬이 저장소 main 기준으로 작성돼 구버전 npm 릴리스에 없는 기능을 기술할 수 있다. 스킬은 실제 연결된 서버의 도구 목록과 입력 스키마를 따르라고 지시한다.

### 클린룸 설계의 소멸

해설 글의 핵심통찰은 원문에 없는 위험을 제기한다. REA는 전문 도구에 익숙한 사람의 일이던 리버스 엔지니어링을 에이전트에게 던지는 질문 한 줄로 바꾼다. 진입 장벽이 낮아진 만큼, 무엇을 분석하고 그 결과로 무엇을 만들어도 되는지에 대한 판단은 개발자 개인의 몫이 된다.

남의 앱을 분석해 비슷한 기능을 만드는 일은 소프트웨어 사용권 계약(EULA)의 역공학 금지 조항과 충돌할 수 있다. 업계는 이 위험을 줄이려고 분석하는 사람과 구현하는 사람을 나누는 클린룸 설계(clean-room design)를 써 왔다. 그런데 에이전트 하나가 분석과 구현을 모두 하면 이 구분이 사라진다.

따라서 해설 글은 REA를 실무에 쓰기 전에 두 가지를 확인하라고 권한다. 하나는 대상 앱의 사용권 계약이고 다른 하나는 분석 결과가 모델 제공사로 넘어가도 되는지에 대한 회사 정책이다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| 리버스 엔지니어링 | 완성된 프로그램을 거꾸로 분석해 소스 코드 없이 동작 원리를 알아내는 일 (역공학) |
| 분석 엔진 (provider) | REA가 네이티브 분석에 쓰는 디스어셈블러 겸 디컴파일러. Hopper, Ghidra, IDA |
| 의사 코드 (pseudocode) | 디컴파일러가 기계어를 C 비슷한 모양으로 되돌린 코드. 원본 소스와 같지 않다 |
| Evidence 레코드 | REA 결과 단위. `evidence_id`, `normalized_result`, 한계, coverage, 미지 항목을 담는다 |
| finding ledger | 결론마다 Evidence ID, 근거 유형, 탐색 경계, 남은 미지를 연결한 조사 기록 |
| 클린룸 설계 (clean-room design) | 분석하는 사람과 구현하는 사람을 나눠 저작권 위험을 줄이는 개발 방식 |

## 관련 페이지

- [[agents/rodrigues-2026-mcp-server-architecture-patterns]]: MCP 서버 설계 패턴. REA는 도구 단위가 아니라 분석 대상 단위로 여러 도구를 묶은 MCP 서버 사례다
- [[agents/agentskills-io-2026-agent-skills-overview]]: 스킬 형식의 개요. REA는 MCP 서버와 짝을 이루는 조사 절차 스킬을 함께 배포한다
- [[agents/osmani-2026-agent-skills]]: 에이전트 스킬 구성 요소 정리. 스킬이 tool call 순서와 보고 형식을 지시하는 방식을 비교할 수 있다
- [[agents/browser-use-browser-use]]: 에이전트용 브라우저 자동화 도구. REA의 웹사이트 분석과 런타임 관찰 기능과 겹치는 영역이 있다
- [[agents/trycua-cua]]: 컴퓨터 사용 에이전트 인프라. 에이전트가 로컬 앱을 직접 다루는 다른 접근이다
