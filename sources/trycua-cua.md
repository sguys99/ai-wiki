---
title: "Cua: Give AI agents computers they can use"
type: repo
year: 2026
category: agents
raw_path: raw/repos/trycua-cua.md
raw_filename: "trycua-cua.md"
source_collection: external
org: "trycua"
repo: "cua"
url: "https://github.com/trycua/cua"
license: "MIT"
tags: [computer-use, desktop-automation, mcp, sandbox, virtualization, benchmark, agent-loop, tool-use, safety, small-model]
---

## 한 줄 요약 (One-line Summary)

Cua는 에이전트에게 조작할 컴퓨터를 제공하는 MIT 라이선스 오픈소스 스택으로, 네이티브 데스크톱 앱을 조작하는 드라이버, 격리된 클라우드 데스크톱, Apple Silicon 로컬 VM, 컴퓨터 사용 전용 소형 모델, 평가 벤치마크 다섯 구성 요소를 한 저장소에 모았다.

## 1. 자료 정보 (Document Information)

| 항목 | 값 |
|---|---|
| 저장소 | [trycua/cua](https://github.com/trycua/cua) |
| 설명 | Scale computer-use 2.0 with open-source drivers, cross-OS fleets, and benchmarks for training, evaluation, and data generation |
| 라이선스 | MIT (일부 서드파티 구성 요소는 별도 라이선스) |
| 최초 공개 | 2025년 1월 |
| 규모 | GitHub star 약 2만 5천 개, fork 약 1,700개 (2026년 9월 기준) |
| 주요 언어 | Rust, Swift, Python, TypeScript |
| 수집 범위 | 루트 README와 `libs/cua-driver`, `libs/cua-s1`, `libs/cua-bench`, `libs/lume` 네 하위 README |
| 문서 사이트 | https://cua.ai/docs |

저장소는 다섯 개의 제품 단위를 `libs/` 아래 별도 디렉토리로 나눠 둔다. 각 단위는 독립적으로 설치하고 쓸 수 있으며, 서로 결합할 때만 선택적 의존이 생긴다.

| 구성 요소 | 디렉토리 | 역할 |
|---|---|---|
| Cua Driver | `libs/cua-driver` | macOS, Windows, Linux 네이티브 앱과 브라우저를 조작하는 드라이버 |
| Cua Fleets | `libs/fleet` | 격리된 클라우드 데스크톱 풀과 Sandbox SDK |
| Lume | `libs/lume` | Apple Virtualization.Framework 기반 로컬 macOS, Linux VM 관리 |
| CUA-S1 | `libs/cua-s1` | 컴퓨터 사용 결정에 특화된 소형 모델 연구 프로젝트 |
| Cua Bench | `libs/cua-bench` | 컴퓨터 사용 과제 생성, 에이전트 평가, trajectory 내보내기 |

## 2. 주요 기여 (Key Contributions)

- **컴퓨터 사용 스택의 수직 통합.** 모델, 실행 환경, 조작 도구, 평가를 각각 별도 프로젝트로 두는 대신 한 저장소에서 다섯 층을 함께 제공한다. 에이전트와 모델은 사용자가 가져오고(bring your own agent and model), Cua는 컴퓨터와 조작 도구를 담당한다는 분업을 명시한다.
- **Computer-Use 2.0 관점.** 저장소는 컴퓨터 사용을 화면 좌표 클릭에 한정하지 않고, 하나의 task 안에서 코드, API, 그래픽 인터페이스 사이를 오가는 에이전트로 정의한다.
- **런타임 중립 통합 경계.** Cua Driver는 MCP를 stdio로 말하는 실행 파일 하나를 에이전트 경계로 삼는다. 언어별 SDK는 클라이언트 애플리케이션용이며 MCP facade를 포함하지 않는다.
- **포커스를 빼앗지 않는 조작.** 앱과 플랫폼이 지원하는 범위에서 background delivery를 써서 사용자의 포인터를 움직이거나 창 포커스를 가져가지 않고 조작한다.
- **명시적 권한 경계.** 드라이버는 standard, bounded, unrestricted 세 권한 모드를 두고 모드를 프로세스 시작 시점에 고정한다. CUA-S1 런타임은 dry run을 기본값으로 두고 execute와 submit을 각각 별도 opt-in으로 분리한다.
- **소형 특화 모델 연구 라인.** 범용 에이전트를 키우는 대신, 필드에 어떤 값이 들어가야 하는지 같은 한정된 결정만 빠르게 내리는 소형 모델 계열을 연구 대상으로 삼는다.
- **검증 가능한 평가와 데이터 생성 루프.** Cua Bench는 gym 형태의 인터페이스와 자동 채점기를 제공하고, 실행 결과를 학습용 trajectory로 내보낸다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 Cua Driver

Cua Driver는 에이전트가 네이티브 앱과 브라우저를 조사하고 조작하게 하는 드라이버다. macOS, Windows, Linux를 지원하며 설치는 셸 스크립트 한 줄이다.

통합 표면이 두 갈림으로 나뉜다.

| 표면 | 대상 | 진입점 |
|---|---|---|
| 에이전트 경계 | MCP를 말하는 에이전트, 셸 기반 자동화 | `cua-driver mcp`, `cua-driver call` |
| 애플리케이션 SDK | 직접 코드를 작성하는 애플리케이션 | Python `cua_driver`, TypeScript `@trycua/cua-driver` |

두 언어 패키지는 UniFFI로 생성된 바인딩을 통해 같은 in-process 네이티브 런타임을 호출한다. 안전한 Rust SDK와 생성 바인딩은 버전이 붙은 C ABI 위에 얹히며, 애플리케이션이 직접 쓸 때는 데몬이 필요하지 않다. 안정 네이티브 경계는 `rust/include/cua_driver_abi.h`에 선언되고, 이 헤더는 Rust `#[repr(C)]` export에서 생성된다. CI가 같은 명령을 `--check`로 실행해 구현과 배포 헤더가 어긋나지 못하게 한다.

언어 패키지는 클라이언트 애플리케이션용이며 MCP facade를 포함하지 않는다. `/sdk`, `/mcp`, `/native` 같은 public suffix도 두지 않는다. MCP는 `cua-driver` 실행 파일이 런타임 중립 에이전트 경계로 구현한다.

**권한 모드.** `standard`는 프롬프트 없이 동작하는 일반 자동화용 기본값이다. `bounded`는 검토를 마친 매니페스트에 적힌 도구와 리소스만 허용한다. `unrestricted`는 `--dangerously-bypass-approvals` 플래그를 요구한다. 모드는 런타임을 소유한 프로세스에 속하며 시작 시점에 고정된다. `cua-driver serve`는 플래그를 받고, `cua-driver mcp`와 임베딩 호스트는 `CUA_DRIVER_PERMISSION_MODE`, `CUA_DRIVER_CAPABILITY_MANIFEST_FILE`, `CUA_DRIVER_CAPABILITY_MANIFEST_APPROVED` 환경변수를 쓴다. 실행 중인 데몬의 모드를 바꾸려면 재시작해야 한다.

이미 로그인된 Chromium 프로필에 붙는 동작은 별도로 명시해야 한다. CLI에서는 `cua-driver mcp --grant existing-profile`을 쓰고, 임베딩 애플리케이션은 `DriverAuthorizationHost`를 제공하거나 bounded 런타임 매니페스트에 `kind: existing_profile`을 선언한다. 드라이버 자신은 승인 모달이나 배너를 그리지 않는다.

**macOS 프로세스 정체성.** macOS는 Accessibility와 Screen Recording 권한을 실행 파일 경로가 아니라 책임 앱 정체성에 귀속시킨다. 저장소는 이 때문에 세 가지 실행 방식만 지원한다.

| 방식 | 실행 | 특징 |
|---|---|---|
| Standalone | `open -n -g -a CuaDriver --args serve` | `CuaDriver.app`에 권한을 부여하고 그 데몬을 띄운다. CLI가 이 데몬을 경유할 수 있다 |
| Explicit direct MCP | `cua-driver mcp --direct` | MCP 프로세스가 런타임을 직접 소유한다. macOS에서는 호출 호스트의 TCC 귀속을 쓰고 AppKit 커서 오버레이는 제공하지 않는다 |
| Embedded | `EmbeddedCuaDriverHost` | 권한을 가진 macOS 앱이 사설 데몬을 띄우고 SDK와 MCP 접속 정보를 함께 돌려준다. 데몬이 앱의 책임 사슬 안에 남아 권한을 상속한다 |

`CuaDriver.app` 밖에서 embedded 모드 없이 `cua-driver serve`를 직접 띄우는 방식은 지원하지 않는다. TCC 귀속에 쓸 안정된 번들 정체성이 없기 때문이다. 게이트웨이나 터미널 같은 무관한 헬퍼가 앱을 대신해 데몬을 띄워서도 안 된다.

**Claude Code 호환 모드.** 표준 등록은 `claude mcp add --transport stdio cua-driver -- cua-driver mcp`다. Claude Code의 vision 기반 컴퓨터 사용 흐름이 창 스크린샷에 grounding하게 하려면 `--claude-code-computer-use-compat` 플래그로 별도 등록한다. 이 모드는 나머지 도구를 그대로 두고 `screenshot`만 바꾸는데, `pid`와 `window_id`를 요구하고 해당 창만 캡처한다. CLI 스크린샷도 동작하지만 Claude Code가 이미지 grounding 신호로 쓰는 `mcp__cua-computer-use__screenshot` 도구 이름을 노출하지 않는다.

**Computer History 미리보기.** macOS nightly 빌드는 드라이버로 수행한 action의 암호화된 기록을 선택적으로 남긴다. 엄격한 메타데이터 허용 목록만 저장하고 로컬에 머물며, 권한으로 통제되는 `history_status`와 `history_query` 도구를 읽기 전용으로 노출한다. 스크린샷, 입력한 텍스트, 클립보드 내용, raw 인자와 결과, accessibility tree, 경로, 창 제목, URL은 저장하지 않는다.

**스킬 배포.** 정본 스킬 소스는 `rust/Skills/cua-driver`이고 ClawHub에 `@cua/driver` 단일 크로스 플랫폼 스킬로 발행된다. 번들에는 macOS, Windows, Linux 문서가 함께 들어가며, `cua-driver skills install`로 직접 설치하면 `--all-platforms`를 주지 않는 한 호스트 OS 문서만 남는다. 라이선스 경계가 갈리는데, 저장소는 MIT를 유지하고 ClawHub로 발행되는 스킬 사본은 MIT-0으로 배포된다. 발행 워크플로는 `main`에서 수동 dispatch해야 하고, `rust/Cargo.toml`과 `SKILL.md`의 version이 일치해야 하며, MIT-0 권리 확인과 `CLAWHUB_TOKEN` 시크릿을 요구한다.

### 3.2 Cua Fleets와 Sandbox SDK

Fleet은 샌드박스 용량을 유지하는 클라우드 데스크톱 풀이다. 사용자 코드가 풀에서 데스크톱 하나를 claim하고, Sandbox SDK로 그 안에서 명령을 실행하거나 스크린샷을 찍거나 앱을 조작한다.

로컬 샌드박스와 클라우드 Fleet은 같은 Sandbox SDK를 공유하지만 자격 증명, 이미지, 운영 방식, 런타임 요구사항이 다르다. 저장소는 어느 환경을 고를지 판단하라고 별도의 runtime support 레퍼런스를 둔다. 풀이 claim 종료 후에도 유료 용량을 유지할 수 있으므로 튜토리얼의 정리 단계를 따르라고 명시한다.

첫 결과물로 제시하는 흐름은 Linux 데스크톱을 provision하고 `uname -a`를 실행한 뒤 스크린샷을 저장하고 클라우드 리소스를 삭제하는 것이다.

### 3.3 Lume

Lume은 Apple Virtualization.Framework로 Apple Silicon 위에 macOS와 Linux VM을 만들고 관리하는 CLI다.

```bash
lume create macos-tahoe --ipsw ~/Downloads/macos-tahoe.ipsw --unattended tahoe
lume run macos-tahoe
```

내장 preset `sequoia`와 `tahoe`는 GUI 자동화 없이 게스트를 설정한다. `lume` 사용자를 만들고 SSH를 켜고 자동 로그인을 설정하며 절전과 화면 잠금을 끈다. 기본 SSH 자격 증명은 `lume` / `lume`이다. Tahoe는 로컬 IPSW에서 종단 검증을 마쳤고, Sequoia는 첫 디스플레이 부팅에서 Setup Assistant의 Accessibility 단계가 뜰 수 있다고 이슈 번호와 함께 알려 둔다.

`lume sip` 명령만 `vncdotool`에 의존한다. SIP를 켜거나 끌 일이 없으면 설치하지 않아도 된다.

텔레메트리는 기본으로 켜져 있고 가명 처리된 설치, 릴리스, 명령, API 이벤트 메타데이터를 기록한다. 프롬프트, VM과 이미지 이름, 파일 경로, 명령 인자, VM 내용은 수집하지 않는다. `lume config telemetry` 하위 명령으로 상태 확인, 해제, 재설정이 가능하고 `LUME_TELEMETRY_ENABLED`가 현재 프로세스의 설정을 덮어쓴다. 일반 제거는 설정과 가명 설치 ID를 남겨 재설치를 복귀로 인식하며, `uninstall.sh --purge`가 ID, 마커, 설정, 캐시, VM을 모두 지운다.

### 3.4 CUA-S1

CUA-S1은 컴퓨터 사용에 특화된 소형 System 1 모델 계열이다. 저장소는 "System 1"을 모델 아키텍처 분류가 아니라 빠르고 범위가 한정된 결정을 가리키는 공학적 비유로 쓴다고 못 박는다. 범용 에이전트의 planning과 추론을 대체하지 않는다.

첫 연구 프로필은 폼(form)에 집중한다. 응답을 토큰 단위로 생성하는 대신 구조화된 인터페이스 요소와 문서 값에서 결정을 점수화한다. action의 순서는 애플리케이션 코드가 정하고, 선택적 Cua Driver 연동이 명시적 action 경계 안에서 실행을 담당한다.

첫 체크포인트는 `cua-s1-form-v0`이며 상태는 "프로필 정의됨, 가중치 미배포"다. GitHub 구성 요소는 소스만 담은 초기 연구 릴리스로, 모델 코드, 합성 데이터 생성, 학습, 평가 코드를 포함하고 가중치와 데이터셋은 Hugging Face에 따로 둔다. 소스는 MIT지만 그 라이선스가 향후 공식 가중치, 데이터셋, 호스팅 서비스, 상표에는 적용되지 않는다고 명시한다. 향후 체크포인트는 연구와 평가는 허용하되 상업적 production 사용에는 별도 계약을 요구할 수 있다.

Python 배포 이름은 `cua-s1`, import 이름은 `cua_s1`이다. 체크포인트를 읽으려면 로컬 `safetensors` 파일과 대응하는 JSON 설정이 필요하고, pickle 기반 PyTorch 체크포인트는 거부한다.

**안전 경계.** planning과 실행을 분리하는 것이 설계의 뼈대다.

| 통제 | 내용 |
|---|---|
| 기본값 | dry run. `execute`와 `submit`은 각각 독립적인 opt-in이다 |
| 대상 창 | 모호하지 않은 대상 창 하나를 요구한다 |
| 요소 참조 | snapshot에 묶인 요소 토큰만 쓴다 |
| 변경 후 | 각 변경마다 창을 다시 관측한다 |
| PDF 접근 | 설정된 허용 루트로 제한한다. 설정이 없으면 현재 작업 디렉토리를 쓴다 |
| submit 범위 | 정규화된 라벨이 정확히 `Submit`이나 `Submit Form`인 고신뢰 `Button` 또는 `AXButton` 최대 하나만 허용한다 |

**선택적 MCP 서버.** `cua-s1-mcp` 명령은 설정을 마친 모델 서비스가 아니라 고급 통합 표면이다. stdio transport를 쓰고 호스트 설정 세 가지를 요구한다. `CUA_S1_PLANNER_FACTORY`는 `module:attribute` 형식으로 신뢰하는 Python 코드를 지정하는데, 팩토리를 import하면 서버 프로세스 권한으로 코드가 실행되므로 신뢰할 수 없는 모듈을 가리키면 안 된다. `CUA_S1_ALLOWED_PDF_ROOTS`는 서버가 읽을 수 있는 디렉토리 목록이고, `CUA_S1_DRIVER_BINARY`와 `CUA_S1_DRIVER_TRANSPORT`, `CUA_S1_SESSION`은 드라이버 실행 파일과 transport, 세션을 덮어쓴다.

연결된 Cua Driver는 정확한 창 snapshot, snapshot에 묶인 요소 토큰, 확인된 action 효과를 제공해야 한다. 이식 가능한 Cua Driver 계약이 현재 `set_value`를 노출하지 않으므로, 연결된 런타임이 토큰 기반 값 변경을 명시적으로 광고하지 않으면 fill 실행은 실패로 닫힌다. 변경 없이 planning만 하는 경로는 그대로 쓸 수 있다. MCP tool call 결과와 stdio 로그는 PDF에서 추출한 값, 폼 라벨, 창 메타데이터, 입력할 값을 담을 수 있으므로 민감 정보로 다루라고 안내한다.

### 3.5 Cua Bench

Cua Bench는 검증 가능한 크로스 플랫폼 환경에서 컴퓨터 사용 에이전트를 평가하는 프레임워크다. 설치는 `uv tool install 'cua-bench[browser]'`이고 `browser` extra가 Playwright를 함께 설치한다.

첫 결과물은 VM이나 Docker, 모델 API 키 없이 진행하는 시뮬레이션 과제다. 작은 task를 만들고 그 reference 해법을 실행한 뒤 채점기가 reward `1.0`을 보고하는지 확인한다.

핵심 인터페이스는 gym 형태의 `make()`, `reset()`, `step()`, `evaluate()` 네 함수다. 그 위에 HTTP worker 서버(`/reset`, `/step`), worker 관리자, 벤치마크 실행기가 얹힌다.

| 테스트 모듈 | 검증 대상 | 방식 |
|---|---|---|
| `test_gym_interface.py` | `make()`, `reset()`, `step()`, `evaluate()` | 종단 테스트, 실제 시뮬레이션 환경 |
| `test_worker_client.py` | worker 서버용 HTTP 클라이언트 | `requests.post`를 mock한 서버 |
| `test_worker_server.py` | FastAPI 엔드포인트와 action 직렬화 | 단위 테스트 |
| `test_run_benchmark.py` | `run_benchmark()`, `run_single_task()`, `run_interactive()` | 종단 테스트, 실제 시뮬레이션 환경 |
| `test_worker_manager.py` | worker와 dataloader 학습 루프 | 종단 테스트, 실제 worker와 환경에 mock 모델 |
| `test_actions.py` | action 문자열 파싱 `repr_to_action()` | 단위 테스트 |

시뮬레이션 provider는 Playwright 기반이며 테스트에 쓸 만큼 빠르다는 것이 종단 테스트를 기본으로 삼은 근거다. 학습 루프 테스트는 실제 ML 모델 없이 단순 action을 돌려주는 mock 모델을 쓴다.

인프라 처리량은 별도 스크립트로 측정한다.

```bash
uv run python -m cua_bench.scripts.benchmark_workers --num_workers 16 --num_steps 10
```

`--num_workers`(기본 16), `--num_steps`(기본 10), `--task_path` 세 플래그를 받고, 평균 reset 시간, 평균 step 시간, 평균 finish 시간, 초당 step 처리량을 출력한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

저장소는 모델 성능 수치를 제시하지 않는다. CUA-S1 README는 소스 전용 릴리스라서 어떤 체크포인트 성능 주장도 성립하지 않는다고 명시한다. 따라서 이 자료에서 확인할 수 있는 정량 지표는 채택 규모와 인프라 측정 항목에 한정된다.

| 지표 | 값 |
|---|---|
| GitHub star | 약 2만 5천 개 |
| fork | 약 1,700개 |
| 공개 이후 기간 | 2025년 1월부터 약 20개월 |
| Cua Bench 기본 worker 수 | 16개 |
| Cua Bench 검증 기준 | 채점기 reward `1.0` |

Cua Bench가 출력하는 인프라 지표는 평균 reset 시간, 평균 step 시간, 평균 finish 시간, 초당 step 처리량 네 가지다. 이 수치는 사용자 하드웨어에서 측정하는 값이고 저장소가 기준값을 공개하지는 않는다.

CUA-S1의 오프라인 평가 지표는 정확도, 기권(abstention), coverage, 잘못된 action, 잘못된 대상, 기권했어야 하는데 action을 취한 경우를 구분한다. 합성 학습, 검증, 테스트 분할은 폼 signature 기준으로 분리한다. 향후 체크포인트 릴리스에는 손대지 않은 holdout, artifact 해시, 정확한 환경 정보, 독립적으로 재현 가능한 결과를 추가해야 한다고 스스로 조건을 건다.

Cua Driver의 동작 검증은 수치가 아니라 문서 체계로 관리된다. `docs/test-matrix.md`가 단위 테스트와 정본 harness 종단 테스트를 대응시키고, `docs/action-support.md`가 플랫폼별 실제 동작을 경험적으로 기록하는 대장 역할을 한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **CUA-S1 가중치 미배포.** 소스만 공개돼 있어 실제 모델 품질을 검증할 방법이 없다. 체크포인트 릴리스 시 명시하겠다고 한 항목(holdout, artifact 해시, 환경 정보, 재현 가능한 결과)이 아직 이행 전이다.
- **결과 이전 가능성에 대한 경고.** 애플리케이션, 운영체제, 언어, 레이아웃, accessibility 설정, task 분포가 바뀌면 결과가 그대로 옮겨간다고 가정하지 말라고 명시한다.
- **`set_value` 부재로 인한 기능 제약.** 이식 가능한 Cua Driver 계약이 값 변경 도구를 노출하지 않아 CUA-S1의 fill 실행은 기본적으로 닫혀 있다.
- **macOS 권한 모델의 제약.** TCC 귀속 때문에 지원되는 실행 방식이 세 가지로 한정되고, 임의 바이너리 경로에 권한을 주는 구성은 production에서 쓰면 안 된다.
- **Sequoia preset의 미완성.** 첫 디스플레이 부팅에서 Setup Assistant의 Accessibility 단계가 남아 unattended 설치가 완전하지 않다.
- **Fleet 비용 누수 가능성.** 풀이 claim 종료 후에도 유료 용량을 유지할 수 있어 정리 절차를 따르지 않으면 비용이 계속 발생한다.
- **민감 정보 노출 표면.** MCP tool call 결과와 stdio 로그에 PDF 추출 값과 폼 라벨이 담길 수 있어 로그 취급이 별도 문제가 된다.
- **background delivery의 플랫폼 의존.** 포커스를 빼앗지 않는 조작은 앱과 플랫폼이 지원할 때만 성립하며 경계는 별도 platform support 문서에 있다.
- **Computer History의 미리보기 상태.** nightly macOS 빌드에서만 제공되고 NVIDIA OpenShell 연동은 이후 단계 계획으로 남아 있다.

향후 과제로 명시된 방향은 CUA-S1 체크포인트의 정식 릴리스와 그에 필요한 재현성 요건 충족, Computer History의 단계적 정식화, Linux 데스크톱 세션 검증 확대다.

## 6. 관련 연구 (Related Work)

- **OSWorld** ([[evaluations/xie-2024-osworld-benchmarking-multimodal-agents-for]], [[evaluations/xlang-ai-osworld]]): 실제 운영체제 환경에서 컴퓨터 사용 에이전트를 실행 기반으로 채점하는 벤치마크. Cua Bench가 겨냥하는 검증 가능한 평가와 같은 문제를 다룬다.
- **cua-gym** ([[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]], [[agents/xlangai-cua-gym-dataset]]): 검증 가능한 학습 환경을 규모 있게 만드는 연구. Cua Bench의 trajectory 내보내기와 목적이 겹친다.
- **Browser Use** ([[agents/browser-use-browser-use]]): 브라우저를 Chrome DevTools Protocol로 조작하는 라이브러리. Cua가 브라우저를 포함한 데스크톱 전체를 대상으로 삼는 것과 범위가 대비된다.
- **Orca** ([[agents/stablyai-orca]]): 컴퓨터 사용 에이전트 계열의 다른 구현.
- **OmniParser** (Microsoft, CC-BY-4.0): 화면 요소 파싱 구성 요소로, 선택적 `cua-agent[omni]` extra에 포함된다.
- **Kasm** (MIT): 컨테이너 기반 데스크톱 스트리밍 구성 요소로 `libs/kasm`에 포함된다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Computer-Use 2.0 | Cua가 제시하는 관점으로, 에이전트가 한 task 안에서 코드, API, 그래픽 인터페이스 사이를 오가며 일하는 컴퓨터 사용 방식 |
| Fleet | 샌드박스 용량을 유지하는 클라우드 데스크톱 풀. 사용자 코드가 풀에서 데스크톱 하나를 claim한다 |
| background delivery | 사용자의 포인터를 움직이거나 창 포커스를 가져가지 않고 앱에 입력을 전달하는 방식 |
| permission mode | 드라이버 런타임의 권한 범위를 프로세스 시작 시점에 고정하는 설정. standard, bounded, unrestricted 세 값 |
| capability manifest | bounded 모드에서 허용할 도구와 리소스를 미리 적어 둔 매니페스트 |
| System 1 (CUA-S1) | 빠르고 범위가 한정된 결정을 가리키는 공학적 비유. 모델 아키텍처 분류가 아니다 |
| snapshot-bound element token | 특정 창 snapshot에 묶여서만 유효한 인터페이스 요소 참조. 화면이 바뀌면 무효가 된다 |
| dry run | 계획만 만들고 실제 변경은 하지 않는 실행 모드. CUA-S1 런타임의 기본값 |
| abstention | 모델이 확신이 없을 때 action을 내지 않고 기권하는 것. CUA-S1 평가의 독립 지표 |
| unattended preset | GUI 자동화 없이 게스트 OS 초기 설정을 마치는 Lume 내장 구성. `sequoia`와 `tahoe` |
| TCC 귀속 | macOS가 Accessibility와 Screen Recording 권한을 실행 파일 경로가 아니라 책임 앱 정체성에 연결하는 방식 |
