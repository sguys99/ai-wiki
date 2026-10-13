---
title: "REA: Reverse Engineer Anything"
type: repo
year: 2026
category: agents
raw_path: raw/repos/morluto-rea.md
raw_filename: "morluto-rea.md"
source_collection: external
org: "morluto"
repo: "rea"
url: "https://github.com/morluto/rea"
license: "MIT"
tags: [mcp, reverse-engineering, agent-tools, security]
figures:
  - id: fig01
    label: "REA in Hopper"
    kind: figure
    file: assets/park-2026-rea-reverse-engineer-anything/repo-fig01.png
    raw: https://raw.githubusercontent.com/morluto/rea/main/docs/assets/rea-hopper-analysis.png
    caption: "Hopper에서 /usr/bin/true를 분석하는 화면. 아래 콘솔에 11단계 분석 패스가 끝난 뒤 REA의 bootstrap.py 스크립트를 실행한 기록이 보인다"
    strategy: manual
    curated: true
  - id: fig02
    label: "REA investigation flow"
    kind: figure
    file: assets/park-2026-rea-reverse-engineer-anything/repo-fig02.png
    raw: https://raw.githubusercontent.com/morluto/rea/main/website/public/assets/figures/rea-investigation-flow.svg
    caption: "REA 조사 흐름. 질문, REA의 검사와 추적(로컬 분석 어댑터 사용), 근거 읽기, 에이전트의 설명과 구현과 테스트 4단계와 후속 질문 순환을 보인다 (SVG를 PNG로 변환)"
    strategy: manual
    curated: true
  - id: fig03
    label: "REA showcases"
    kind: figure
    file: assets/park-2026-rea-reverse-engineer-anything/repo-fig03.png
    raw: https://raw.githubusercontent.com/morluto/rea/main/docs/assets/rea-showcases.png
    caption: "쇼케이스 3종 일러스트. DX-Ball 사운드 팬, Notion 클립보드 브리지, TH04 탄환 고리"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

REA(Reverse Engineer Anything)는 네이티브 바이너리, 자바스크립트와 일렉트론 앱, .NET 어셈블리, 안드로이드 앱, 웹사이트, 펌웨어 등 23종 대상을 하나의 MCP 서버와 CLI로 분석하게 해주는 TypeScript 오픈소스 도구다. 결과는 결론마다 근거(Evidence)와 한계, 미지 항목을 담은 Evidence 레코드로 돌아오며, 번들 스킬이 에이전트에게 관찰, 추론, 미지를 구분해 보고하는 조사 절차를 지시한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저장소 | morluto/rea |
| 설명 | Reverse engineer anything with agents, from app behavior down to native binaries. |
| 부제 | One MCP for reverse engineering across binaries, applications, and runtime behavior. |
| 언어 | TypeScript (파일 3,613개 중 src/ 1,805개) |
| 라이선스 | MIT (상용 분석 도구와 서드파티 자료는 각자의 라이선스 유지) |
| 생성일 | 2026-04-14 |
| 최신 릴리스 | rea-agents-6.4.0 (2026-10-11) |
| 배포 | npm 패키지 `rea-agents`, 웹사이트 rea.tools, skills.sh 스킬 |
| 스타 | 수집 시점 205,652개. README는 18만 개 돌파 감사 문구를 싣고 있다 |
| 수집 범위 | README 전문, DISCLAIMER.md 전문, 번들 스킬 SKILL.md(version 41) 전문, references/evidence-workflows.md 전문 |
| 대응 해설 | `sources/park-2026-rea-reverse-engineer-anything.md` |

README 상단은 공식 배포처를 morluto/rea, rea.tools, rea-agents npm 패키지 셋으로 못 박고, 비슷한 저장소 이름이나 복사된 README가 다운로드의 공식성을 보장하지 않는다고 경고한다.

## 2. 주요 기여 (Key Contributions)

- 분석 대상별로 흩어진 리버스 엔지니어링 도구(Hopper, Ghidra, IDA, JADX, Apktool, pwntools, TShark, Binwalk 등)를 하나의 MCP 서버 뒤로 통합했다. CLI도 같은 워크플로를 쓴다.
- 결과를 Evidence 레코드라는 고정 형식으로 반환한다. 각 레코드는 `evidence_id`, `normalized_result`, 권한(authority), 한계, coverage, 잔여 미지 항목을 보존한다.
- `npx rea-agents setup` 한 줄로 MCP 등록, 매칭 스킬 설치, 기존 설정 백업을 처리하고 15개 이상 에이전트 클라이언트를 지원한다.
- 번들 스킬이 "대상 먼저 분류 → 요약 먼저 → 질문 체크리스트와 finding ledger → 관찰과 추론과 미지 구분" 절차를 에이전트에게 지시한다.
- 재구성 검증 도구(`verify_reconstruction`)와 비교 도구군을 제공해, 복원 코드를 원본과 대조하는 쇼케이스(DX-Ball 3,205개 경우, 63바이트 일치)를 뒷받침한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 조사 흐름

에이전트가 MCP로 REA를 호출해 대상을 검사하고 관련 코드를 추적하면, REA가 근거와 함께 결과를 돌려준다. 에이전트는 이를 바탕으로 후속 질문, 동작 설명, 구현 작성과 테스트를 이어 간다. README 그림은 이를 4단계로 그린다.

1. Ask: 에이전트와 로컬 대상(앱, 바이너리, 브라우저)
2. Inspect & trace: REA (CLI / MCP), 아래에 로컬 분석 어댑터
3. Read the evidence: 코드, 참조, 미지 항목
4. Use what you learn: 에이전트가 설명, 구현, 테스트. 4단계에서 2단계로 후속 질문이 되돌아간다.

### 3.2 설치와 설정

- 요구 사항: Node.js 22.x(22.19 이상), 24.x(24.11 이상), 26 이상과 npm.
- `npx rea-agents setup`: 에이전트를 고르고 제안된 변경을 검토해 승인한다. MCP 서버와 워크플로 지침을 추가하고 기존 설정을 백업한다. 이후 에이전트를 재시작한다.
- 지원 클라이언트(스킬 기준 ID): `claude_code`, `claude_desktop`, `codex`, `cursor`, `gemini_cli`, `windsurf`, `devin`, `opencode`, `antigravity`, `copilot_cli`, `commandcode`, `vscode`, `grok_build`, `omp`, `grok_bot`. `grok_bot`은 로컬 파일 등록이 없다.
- 네이티브 분석은 기존 Hopper, Ghidra, IDA를 쓰며 setup이 승인 후 Hopper를 선택 설치할 수 있다. 정적 자바스크립트 분석에는 엔진이 필요 없다. 오프라인 네이티브 검사용으로 GNU objdump와 Rizin도 사용자가 공급하면 지원한다 (REA가 설치하거나 업데이트하지 않는다).
- 큰 바이너리는 `REA_GHIDRA_STARTUP_TIMEOUT_MS` 또는 `REA_HOPPER_STARTUP_TIMEOUT_MS`로 시작 제한 시간을 늘린다.
- 업데이트: 전역 설치는 `rea update`(Bun은 1.2.17 이상), npx 사용자는 `npx rea-agents@latest setup`. 일회성 명령은 `npx rea-agents@latest <명령>` 또는 `bunx rea-agents@latest`.
- setup은 Node.js, npm, Homebrew, Java, Ghidra, IDA, JADX, Binwalk, Unblob을 설치하거나 업그레이드하지 않는다.

### 3.3 분석 대상 (README 표 23행)

| 대상 | 반환 | 요구 사항 |
|---|---|---|
| Native binaries | 의사 코드, 어셈블리, 문자열, 심볼, 호출과 참조 | Hopper, Ghidra, IDA |
| Offline ELF layout | 섹션, 세그먼트, 원래 심볼과 재배치, 정적 mitigation 후보 | 리눅스 x64의 사용자 공급 pwntools |
| Go binaries | 내장 컴파일러 버전, 모듈, replace, 빌드 설정 | 내장 정적 ELF/PE/thin Mach-O 검사, Go 설치 불필요 |
| Rust binaries | cargo-auditable crate 이름, 버전, 소스, 의존 edge | 내장 정적 검사 |
| WASM artifact | 검증, 섹션, import/export WAT, 디코딩한 WAT | 사용자 공급 WABT 1.0.42 |
| EVM bytecode | 디스패치 셀렉터, 바이트 오프셋, 추정 인자, mutability | 리눅스 x64의 로컬 raw/hex |
| SQLite databases | 테이블, 컬럼, 인덱스, 뷰, 트리거, 선택 행 | 로컬 DB/WAL 스냅숏, Node.js 24.15 이상 또는 26 이상 |
| Recorded Linux crashes | 노트 원문, 모든 스레드 레지스터와 시그널, 선택적 매핑 후보 | pwntools(리눅스 x64), 선택 GDB/pwndbg |
| JavaScript / Electron | 모듈, import, 소스맵, 라우트, IPC, 네이티브 애드온 관계 | Node.js, npm |
| Websites | 페이지 구조, 스크립트, 네트워크 관찰, 요청 스크린샷 | Chrome 계열 브라우저 |
| Saved network captures | 요청, 응답, 노출 페이로드, 소스 위치 | HAR 또는 Fiddler Everywhere SAZ, 리눅스 mitmdump |
| .NET assemblies | 메타데이터, CIL, 네이티브 의존성, 빌드 비교 | 없음 (정적 분석만) |
| Android APKs | 매니페스트, 클래스, 디컴파일 메서드, 참조 | 헤드리스 JADX와 전체 JDK (리눅스, macOS, Windows x64) |
| Android devices | 기기, 패키지, 프로세스, 로그, 덤프, 화면 캡처, 파일 전송 | 사용자 공급 adb |
| JEB projects | 프로젝트 단위, 산출물 다이제스트, 타입과 메서드 의사 코드 | MCP를 제공하는 JEB 클라이언트, REA_JEB_MCP_URL |
| Android resources | 디코딩 매니페스트, 문자열 테이블, 로캘, 버전 | 사용자 공급 Apktool |
| Flutter apps | Dart 스냅숏 해시, ABI별 라이브러리 다이제스트, 엔진 빌드 출처 | 없음 (정적 APK 파싱) |
| Firmware | 영역, 추출 결과, 네이티브 분석 handoff | 리눅스의 Binwalk / Unblob |
| Recorded packets | 선택 필드, 반복 값, 필터, decode-as 규칙 | 리눅스 TShark 4.x와 prlimit |
| Packet summaries | 엔드포인트, DNS, TLS SNI, 프로토콜 분포, HTTP 요청 | tshark와 capinfos (리눅스 검증) |
| Recorded logic signals | 디코더 주석, 샘플 범위, 진단 | 리눅스 sigrok-cli 0.7.2와 prlimit |
| Packages and resources | 파일 목록, 다이제스트, plist, 애플 번들 구조, 추출 리소스 | 별도 도구 없음 |
| Process behavior | 터미널 출력, 상호작용, 종료와 파일 시스템 관찰, 실행 비교 | 네이티브 PTY가 있는 리눅스, macOS |

정적 자바스크립트와 .NET 검사는 앱을 실행하지 않는다. 런타임 캡처는 사용자 권한으로 대상을 실행하거나 조작하며, 각 가이드가 그 영향을 기술한다.

### 3.4 번들 스킬 (reverse-engineer-anything, version 41)

스킬 description은 "shipped-artifact 또는 요청된 runtime 근거로 기능 설명, 버전 비교, 디컴파일, 재구성 안내"이며, 완전한 소스 저장소의 일반 아키텍처 분석에는 REA를 쓰지 말라고 명시한다.

**연결 절차**

- 스킬 설치는 지침만 공급하고 MCP 서버 등록, 엔진 설치, 실행 중 에이전트에 도구 추가를 하지 않는다.
- 도구가 이미 보이면 진단 없이 바로 대상으로 간다. 도구가 없으면 `doctor --client <id> --json`으로 진단하고, 원인을 구분한다. 등록 누락은 설정 복구, 등록은 맞는데 세션에 도구가 없으면 재시작, 엔진 누락은 그 엔진이 필요한 작업에만 영향이 있다.
- 설정 복구는 `setup --dry-run --json`으로 읽기 전용 계획을 먼저 보여 승인을 받은 뒤 `--yes`로 적용한다. Hopper 설치(`--install-hopper`)는 별도 승인이 있을 때만 붙인다.
- MCP 없이 CLI 대안으로 `analyze-javascript-application`을 쓸 수 있지만, 이는 MCP 설정을 증명하지 않는다.

**대상별 첫 도구 라우팅 (발췌)**

| 대상 | 첫 도구 |
|---|---|
| ASAR 또는 추출한 JS/Electron 트리 | `analyze_javascript_application` |
| ZIP/APK/IPA/MSIX/DMG 멤버 목록 | `open_binary`, 필요 시 `inspect_artifact` |
| Android APK 코드 | `inspect_android_package` |
| 관리 코드 PE/CLI | `inspect_managed_artifact` |
| 펌웨어 | `inspect_firmware_regions`, 추출 요청 시 `extract_firmware` |
| 열린 브라우저 페이지 / Electron 런타임 | `list_browser_targets` / `list_electron_targets` |
| HAR/SAZ/mitmproxy/qlog 캡처 | `inspect_web_network_capture` |
| 패킷 캡처 | `inspect_packet_fields`, `inspect_packet_capture`, `inspect_pcap_capture` |
| 로직 신호 | `inspect_signal_decoders`, `decode_signal_recording` |
| WASM / EVM / Go / Rust / SQLite | `inspect_wasm_artifact` / `inspect_evm_interface` / `inspect_go_binary` / `inspect_rust_binary` / `inspect_sqlite_database` |
| 리눅스 ELF 레이아웃 / ELF 코어 | `inspect_binary_layout` / `inspect_recorded_crash` |
| PE 리소스 | `inspect_pe_resources` |
| 네이티브 실행 파일과 라이브러리 | `open_binary` 후 분석 도구, 필요 시 `binary_overview` |

- 사용자가 이름이나 경로 없이 "내 앱"이라고만 하면 artifact를 찾기 전에 어떤 앱인지 묻는다. 예시 앱을 사용자 대신 고르지 않는다.
- IDA는 `provider_id: "ida"`로 원본 바이너리를 열고 `.idb`/`.i64`를 넘기지 않는다. mrexodia/ida-pro-mcp를 재사용한다.

**요약 우선 원칙**

- 기본 결과의 인라인 Evidence와 그래프 맥락에서 시작한다. 크기가 크거나 모르는 자바스크립트 앱과 ELF는 `"detail": "summary"`로 부르고 `parent_evidence_id`를 `inspect_analysis_view`로 페이지 단위로 본다.
- 같은 분석이나 거부된 호출을 입력 변화 없이 반복하지 않는다.
- 전송 한도 초과(`resource_constraint`, `details.resource: "transport"`)가 나면 같은 세션의 Evidence 참조로 요약 뷰를 보거나 `export_evidence_bundle`로 파일에 쓴다. 클라이언트가 결과를 잘라 보여 준 미리보기는 불완전한 것으로 보고 정본 JSON으로 파싱하지 않는다.
- 모든 결론은 관찰(observation), 추론(inference), 미지(unknown)를 구분하고 Evidence ID를 인용한다. 정적 분석이 실행을 관찰했다고 암시하지 않는다.
- REA 자체는 호출별 승인 플래그를 요구하지 않지만, 에이전트 클라이언트가 독립적으로 승인을 요구할 수 있다.

**넓은 조사 계획 7단계**

1. 요청을 질문 체크리스트와 질문별 필요 근거로 바꾼다.
2. 현재 세션, artifact 정체, 저장된 분석 DB, 북마크, 이전 근거를 확인하고 재사용한다.
3. 가장 작은 overview에서 시작해 질문마다 진입점부터 데이터와 상태 변화를 거쳐 결과까지 따라간다.
4. 질문에 영향을 주는 패키지 리소스와 설정을 코드와 함께 본다. 파일 이름이나 문자열만으로 동작을 추정하지 않는다.
5. 결론을 그 결론이 요구하는 근거 유형으로 확인한다. 정적 근거로 답할 수 없을 때만 런타임 관찰을 쓴다.
6. 독립 질문은 병렬 작업자에게 나눠 맡긴다.
7. 결론마다 Evidence ID, 신뢰도와 근거 유형, 탐색 경계, 남은 미지를 연결한 finding ledger를 유지한다.

끝내기 전 체크리스트로 돌아가 질문마다 answered, partially answered, unresolved를 표시한다. 질문이 열려 있는데 넓은 조사를 완료라고 서술하지 않는다. 열린 네이티브 세션은 `close_binary`로 닫는다.

### 3.5 Evidence와 비교, 검증 워크플로

- Evidence 생성 도구는 MCP `structuredContent`와 CLI JSON에 완전한 레코드를 직접 반환한다. 연산 데이터는 `normalized_result`, 안정 참조는 `evidence_id`.
- `record_unknown`과 `update_unknown`으로 미해결 질문과 필요한 권한이나 환경을 세션 레지스트리에 기록한다. 해소는 자격 있는 관찰 근거로만 검증된다.
- 동등성이나 부재를 주장하려면 완전하고 호환되는 페이지 집합으로 비교한다.

| 도구 | 비교 대상과 주의점 |
|---|---|
| `compare_artifacts` | 인벤토리 페이지를 경로, 내용, 메타데이터, 그래프 관계로 비교 |
| `compare_functions` | 명시한 함수 Evidence끼리 비교. 바이너리 전체 퍼지 매칭이 아니다 |
| `compare_bundles` | 번들 멤버십과 미지 이력 비교 |
| `find_changed_behavior` | 기존 비교를 결합. 정적 차이는 인과 증거가 아니라 후보 |
| `build_call_path` | 한 artifact와 분석 엔진의 함수 dossier가 필요. 경계가 불완전하면 부재는 미지 |
| `correlate_static_and_runtime` | 명시적 매핑 사용. 일치 패턴은 가설이지 인과가 아니다 |
| `verify_reconstruction` | 유한한 타입 명세를 평가. 통과는 선언한 비교 가능 주장만 덮고 전역 동등성을 뜻하지 않는다 |

- 프로세스 캡처는 opt-in 행동 근거이며 보안 샌드박스가 아니다. 제한 시간에 걸린 대상이 최종 보고를 써야 하면 `finalization_ms`를 지정한다. REA는 SIGTERM을 보내고 관찰을 계속하다가 구간 끝까지 종료하지 않으면 SIGKILL을 한 번 보낸다.
- HAR Evidence에 `api-surface` 뷰를 적용하면 관찰된 요청을 메서드, origin, 경로 템플릿으로 묶는다. 형식 일치는 handler 정체나 스키마가 아니라 추론이며, 요청은 재전송하지 않는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README 쇼케이스 세 건이 결과에 해당한다.

| 쇼케이스 | 내용 | 검증 |
|---|---|---|
| DX-Ball | 사운드 호출에서 위치→팬 보조 함수로 따라가 명령어를 검사하고, 불완전한 의사 코드를 C로 재작성 | 원본 x86 3,205개 경우 통과, 컴파일 함수 63바이트 전부 재현. 복원 저장소 N0zoM1z0/dx-ball |
| Notion | 렌더러의 클립보드 API를 찾아 preload와 IPC를 거쳐 메인 프로세스까지 추적, rich clipboard 형식 검사 | 사례 글 |
| TH04 | PC-98 게임의 16비트 명령어에서 고정 각도와 조준 각도 탄환 고리 계산 복원 | 재구성한 C++를 당시 컴파일러 출력과 비교. 복원 저장소 N0zoM1z0/th04 |

FAQ 요약:

- 로컬 MCP 서버를 지원하는 모든 에이전트가 쓸 수 있다.
- 깊은 네이티브 분석은 Hopper, Ghidra, IDA 중 하나를 쓴다. Hopper는 필요할 때 REA가 시작하며, macOS 첫 실행 대화상자는 첫 작업 전에 같은 사용자 세션에서 처리해 둬야 한다.
- REA가 돌려주는 코드는 네이티브의 경우 의사 코드와 어셈블리, 자바스크립트의 경우 모듈과 관계다. 구현은 에이전트가 이 결과로 작성하고 테스트한다.
- REA는 대상을 로컬에서 분석하고 업로드하지 않는다. 에이전트가 받은 도구 결과는 모델 provider의 데이터 정책을 따른다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

**DISCLAIMER.md의 책임 있는 사용 범위**

- 허용 용도: 보안 연구, 악성코드와 사고 분석, 취약점 연구와 조율된 공개, CTF와 교육, 상호운용성, 소프트웨어 보존, 소유하거나 허가받은 소프트웨어의 디버깅과 감사.
- 지원하지 않는 용도: DRM, 라이선스 검사, 안티 치트 등 기술적 보호 조치 우회, 게임 치트 개발과 온라인 서비스 변조, 허가받지 않은 시스템의 인증, 봇 방지, 접근 제어 우회, 독점 소프트웨어 복제와 보호된 코드와 자산 재현, AI 모델 제공사의 사용 정책과 안전 조치 회피, AI 계정이나 API 접근 재판매와 공유. 이런 요청은 이슈에서 응답 없이 닫히고 커뮤니티에서 제외될 수 있다.
- 공개된 소프트웨어, 파일 소유, 디버깅 엔드포인트 접근만으로 모든 작업 권한이 성립하지 않는다. artifact 검사 허가가 실행, 가로채기, 기기 변경, 타인 시스템과의 상호작용 허가를 뜻하지 않는다.
- 로컬 동작이 허가를 성립시키거나, 실행한 대상과 서드파티 도구에 외부 영향이 없음을 보장하지 않는다.
- 디컴파일, 재구성, 휴리스틱, AI 보조 분석은 불완전하거나 틀릴 수 있다. 소스 비슷한 출력이나 보고서를 얻어도 원본 프로그램이나 생성물에 대한 권리가 생기지 않는다.
- IDA Pro와 Hex-Rays, Hopper, JEB 같은 상용 도구는 합법적으로 취득해야 하며 REA는 라이선스, 키, 활성화 권리를 제공하지 않는다. 크랙, 도난 키, 무단 키 공유, 라이선스 제한 우회는 허가되지 않는다.
- 이 입장은 과거 릴리스와 커밋, npm 패키지, 별도 배포 스킬, 재배포본 등 모든 버전과 채널에 적용된다. 감사 목록의 언급(국가안보국과 상용 도구 벤더 포함)은 제휴나 보증을 뜻하지 않는다.

**기술적 제약**

- ELF, EVM, 크래시, 패킷, 신호 분석 등 다수 기능이 리눅스(x64) 전용이다. Windows Ghidra는 실험 단계다.
- 많은 도구(pwntools, adb, Apktool, JEB, TShark, sigrok-cli, WABT)를 사용자가 직접 공급해야 한다.
- 정적 차이와 패턴 일치는 후보와 가설이며, 페이지 소진은 네트워크나 소스의 완전성을 증명하지 않는다.
- 스킬이 저장소 main 기준이라 구버전 npm 릴리스에 없는 기능을 기술할 수 있다. 실제 연결된 서버의 도구 목록을 따르라고 지시한다.

## 6. 관련 연구 (Related Work)

- mrexodia/ida-pro-mcp: REA의 IDA 연동이 설치와 등록을 재사용하는 IDA용 MCP 서버.
- Hopper, Ghidra, IDA, GNU objdump, Rizin: 네이티브 분석 엔진.
- JADX, Apktool, JEB: 안드로이드 분석 도구.
- Binwalk, Unblob, TShark, sigrok-cli, WABT, pwntools, pwndbg, mitmproxy, Fiddler Everywhere: 대상별 외부 도구.
- skills.sh: REA 스킬을 단독 배포하는 스킬 레지스트리.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Evidence 레코드 | REA 도구가 반환하는 결과 단위. `evidence_id`, `normalized_result`, 한계, coverage, 미지 항목을 담는다 |
| 분석 엔진 (provider) | 네이티브 분석을 맡는 Hopper, Ghidra, IDA 등 외부 디스어셈블러와 디컴파일러 |
| finding ledger | 결론마다 Evidence ID, 근거 유형, 탐색 경계, 남은 미지를 연결해 두는 조사 기록 |
| unknown registry | `record_unknown`으로 미해결 질문과 필요한 권한을 적어 두는 세션 레지스트리 |
| summary-first | 큰 대상을 요약 뷰로 먼저 받고 retained parent Evidence에서 필요한 페이지만 여는 원칙 |
| `verify_reconstruction` | 복원 코드를 유한한 타입 명세로 원본과 대조하는 검증 도구 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | Hopper에서 REA 브리지가 bootstrap.py를 실행한 분석 화면 | manual | ★ wiki 권장 (사용 화면) |
| fig02 | REA 조사 흐름 4단계와 후속 질문 순환 | manual | ★ wiki 권장 (architecture) |
| fig03 | 쇼케이스 3종 일러스트 | manual | (정보량 적음) |
