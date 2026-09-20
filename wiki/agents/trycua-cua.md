---
title: "Cua: Give AI agents computers they can use"
type: repo
year: 2026
category: agents
source: trycua-cua.md
raw_path: raw/repos/trycua-cua.md
raw_filename: "trycua-cua.md"
source_collection: external
org: "trycua"
repo: "cua"
url: "https://github.com/trycua/cua"
license: "MIT"
tags: [computer-use, desktop-automation, mcp, sandbox, virtualization, benchmark, agent-loop, tool-use, safety, small-model]
---

## 요약

Cua는 에이전트에게 조작할 컴퓨터를 제공하는 MIT 라이선스 오픈소스 스택이다. 네이티브 데스크톱 앱을 조작하는 드라이버, 격리된 클라우드 데스크톱, Apple Silicon 로컬 VM, 컴퓨터 사용에 특화된 소형 모델, 평가 벤치마크 다섯 구성 요소를 한 저장소에 모았다.

이 저장소의 분업 원칙은 명확하다. 에이전트와 모델은 사용자가 가져오고, Cua는 컴퓨터와 조작 도구를 담당한다. 따라서 Cua는 또 하나의 에이전트 프레임워크가 아니라, 기존 에이전트가 붙어서 쓰는 실행 환경 계층에 해당한다.

2025년 1월 공개 이후 GitHub star 약 2만 5천 개를 모았고, Rust, Swift, Python, TypeScript가 섞인 다중 언어 저장소다.

## 배경

컴퓨터 사용 에이전트를 실제로 굴리려면 모델 바깥에 네 가지가 필요하다. 조작 대상이 될 격리된 컴퓨터, 그 컴퓨터의 앱을 실제로 조작할 수단, 무엇을 해도 되는지 정하는 권한 경계, 그리고 잘 했는지 채점할 방법이다.

기존 오픈소스는 이 네 가지가 서로 다른 프로젝트에 흩어져 있었다. 벤치마크는 벤치마크대로, 브라우저 자동화는 자동화대로, VM 관리는 인프라 도구대로 따로 발전했고, 이들을 잇는 접착 코드는 매번 사용자가 다시 작성해야 했다.

Cua는 이 네 층을 한 저장소에서 함께 제공하는 쪽을 택했다. 각 구성 요소는 `libs/` 아래 독립 디렉토리로 나뉘어 따로 설치하고 쓸 수 있으며, 서로 결합할 때만 선택적 의존이 생긴다.

저장소는 자신이 겨냥하는 대상을 Computer-Use 2.0이라 부른다. 화면 좌표를 클릭하는 작업에 한정하지 않고, 하나의 task 안에서 코드, API, 그래픽 인터페이스 사이를 오가는 에이전트를 가정한다는 뜻이다. 이 정의가 설계 전반을 결정한다. 스크린샷 기반 조작만 지원했다면 드라이버 하나로 충분했겠지만, 코드와 API 경로까지 같은 task에 들어오므로 샌드박스, 권한 모델, 채점기가 함께 필요해진다.

## 핵심 개념

**MCP는 에이전트 경계이고 SDK는 애플리케이션 경계다.** MCP는 모델이 외부 도구와 데이터 원천에 표준화된 방식으로 접근하게 하는 프로토콜이다. Cua는 MCP를 stdio로 말하는 실행 파일 하나를 에이전트가 붙는 유일한 지점으로 삼고, 언어별 SDK는 직접 코드를 작성하는 애플리케이션용으로 분리한다. 이 분리 덕분에 에이전트 쪽은 언어에 구애받지 않고, 언어 패키지는 MCP facade를 중복 구현하지 않아도 된다.

**샌드박스는 실행 위치이고 드라이버는 조작 수단이다.** 샌드박스는 에이전트가 실행하는 코드와 명령을 호스트와 격리된 환경 안에 가두는 실행 공간이다. Cua에서 샌드박스는 로컬 VM(Lume)이나 클라우드 데스크톱(Fleet)으로 구현되고, 그 안의 앱을 실제로 누르고 입력하는 일은 별도의 드라이버가 맡는다.

**background delivery는 포커스를 빼앗지 않는 입력 전달이다.** 앱과 플랫폼이 지원하는 범위에서 사용자의 포인터를 움직이거나 창 포커스를 가져가지 않고 조작한다. 사용자가 같은 기기를 쓰는 동안 에이전트가 뒤에서 일할 수 있다는 뜻이며, 지원 범위는 플랫폼마다 다르다.

**permission mode는 프로세스 시작 시점에 고정되는 권한 범위다.** 실행 중에 승인 대화상자를 띄워 권한을 넓히는 방식이 아니라, 런타임을 소유한 프로세스가 시작할 때 범위를 정하고 바꾸려면 재시작해야 한다.

**snapshot-bound element token은 특정 창 snapshot에 묶여서만 유효한 요소 참조다.** 화면이 바뀌면 그 토큰은 무효가 되므로, 모델이 낡은 화면 인식을 근거로 엉뚱한 요소를 누르는 경로가 구조적으로 막힌다.

## 구성 요소 개요

| 구성 요소 | 디렉토리 | 역할 | 대표 진입점 |
|---|---|---|---|
| Cua Driver | `libs/cua-driver` | macOS, Windows, Linux 네이티브 앱과 브라우저 조작 | `cua-driver mcp` |
| Cua Fleets | `libs/fleet` | 격리된 클라우드 데스크톱 풀과 Sandbox SDK | run.cua.ai |
| Lume | `libs/lume` | Apple Silicon 위 로컬 macOS, Linux VM 관리 | `lume create` |
| CUA-S1 | `libs/cua-s1` | 컴퓨터 사용 결정에 특화된 소형 모델 연구 | `cua_s1` |
| Cua Bench | `libs/cua-bench` | 과제 생성, 에이전트 평가, trajectory 내보내기 | `cua-bench` |

## 방법

### Cua Driver

Cua Driver는 에이전트가 네이티브 앱과 브라우저를 조사하고 조작하게 하는 드라이버다. 세 운영체제를 모두 지원하며 설치는 셸 스크립트 한 줄로 끝난다.

```sh
/bin/bash -c "$(curl -fsSL https://cua.ai/driver/install.sh)"
```

#### 통합 표면

드라이버에 접근하는 경로가 둘로 나뉜다. 어느 쪽을 쓸지는 붙는 주체가 에이전트인지 애플리케이션인지로 갈린다.

| 표면 | 대상 | 진입점 |
|---|---|---|
| 에이전트 경계 | MCP를 말하는 에이전트, 셸 기반 자동화 | `cua-driver mcp`, `cua-driver call` |
| 애플리케이션 SDK | 직접 코드를 작성하는 애플리케이션 | Python `cua_driver`, TypeScript `@trycua/cua-driver` |

두 언어 패키지는 UniFFI로 생성된 바인딩을 통해 같은 in-process 네이티브 런타임을 호출한다. 즉 Python과 TypeScript가 각자 다른 구현을 갖는 것이 아니라 같은 Rust 런타임을 얇게 감싼다. 애플리케이션이 직접 쓸 때는 데몬을 띄울 필요도 없다.

안정 네이티브 경계는 `rust/include/cua_driver_abi.h`에 선언된 C ABI다. 이 헤더는 Rust의 `#[repr(C)]` export에서 생성되며, CI가 같은 생성 명령을 `--check`로 실행해 구현과 배포 헤더가 어긋나는 것을 막는다. UniFFI가 따로 만드는 FFI scaffolding은 구현 세부이고 안정 공개 계약이 아니다.

언어 패키지에 MCP facade를 두지 않는 결정은 문서에 명시적으로 적혀 있다. `/sdk`, `/mcp`, `/native` 같은 public suffix도 두지 않는다. MCP는 실행 파일 하나가 런타임 중립 경계로 구현하고, 생성된 클라이언트를 import할 필요 없이 에이전트가 직접 붙는다.

#### 권한 모드

권한 모드는 세 단계이며, 기본값은 프롬프트 없이 동작한다.

| 모드 | 범위 | 활성화 방법 |
|---|---|---|
| `standard` | 일반 자동화용 기본값. 승인 프롬프트가 없다 | 기본값 |
| `bounded` | 검토를 마친 매니페스트에 적힌 도구와 리소스만 허용 | 매니페스트 지정 |
| `unrestricted` | 제한 없음 | `--dangerously-bypass-approvals` 필요 |

모드는 런타임을 소유한 프로세스에 속한다. `cua-driver serve`는 플래그로 받고, `cua-driver mcp`와 임베딩 호스트는 `CUA_DRIVER_PERMISSION_MODE`, `CUA_DRIVER_CAPABILITY_MANIFEST_FILE`, `CUA_DRIVER_CAPABILITY_MANIFEST_APPROVED` 환경변수로 받는다. 데몬을 띄우기 전에 정해야 하고, 실행 중인 데몬의 모드를 바꾸려면 재시작해야 한다.

이미 로그인된 Chromium 프로필에 붙는 동작은 권한 모드와 별개로 한 번 더 명시해야 한다.

```bash
cua-driver mcp --grant existing-profile
```

임베딩 애플리케이션은 이 대신 `DriverAuthorizationHost`를 제공할 수 있고, bounded 런타임은 매니페스트에 `kind: existing_profile`을 선언할 수 있다. 드라이버 자신은 승인 모달이나 배너를 그리지 않는다. 사용자에게 무엇을 물을지는 드라이버를 품은 호스트가 정한다는 뜻이다.

#### macOS 프로세스 정체성

macOS는 Accessibility와 Screen Recording 권한을 실행 파일 경로가 아니라 책임 앱 정체성에 귀속시킨다. 이 제약 때문에 지원되는 실행 방식이 세 가지로 한정된다.

| 방식 | 실행 | 특징 |
|---|---|---|
| Standalone | `open -n -g -a CuaDriver --args serve` | `CuaDriver.app`에 권한을 부여하고 그 데몬을 띄운다. 설치된 CLI가 이 데몬을 자동으로 경유할 수 있다 |
| Explicit direct MCP | `cua-driver mcp --direct` | MCP 프로세스가 런타임을 직접 소유한다. macOS에서는 호출 호스트의 TCC 귀속을 쓰며, 인증된 host adapter 없이는 AppKit 커서 오버레이를 제공하지 않는다 |
| Embedded | `EmbeddedCuaDriverHost` | 권한을 가진 macOS 앱이 사설 데몬을 띄우고 SDK와 MCP 접속 정보를 함께 돌려준다. 데몬이 앱의 책임 사슬 안에 남아 권한을 상속한다 |

`CuaDriver.app` 밖에서 embedded 모드 없이 `cua-driver serve`를 직접 띄우는 구성은 지원하지 않는다. TCC 귀속에 쓸 안정된 번들 정체성이 없기 때문이다. 같은 이유로 게이트웨이나 터미널 같은 무관한 헬퍼가 앱을 대신해 데몬을 띄워서도 안 되고, 임의의 바이너리 경로에 권한을 부여해서도 안 된다.

#### Claude Code 호환 모드

표준 등록은 다른 MCP 서버와 같다.

```bash
claude mcp add --transport stdio cua-driver -- cua-driver mcp
```

Claude Code의 vision 기반 컴퓨터 사용 흐름이 드라이버가 찍은 창 스크린샷에 grounding하게 하려면 호환 모드를 별도 이름으로 등록한다. grounding은 모델 출력을 외부 근거에 붙들어 매는 것을 말한다.

```bash
claude mcp add --transport stdio cua-computer-use -- cua-driver mcp --claude-code-computer-use-compat
```

이 모드는 나머지 도구를 그대로 두고 `screenshot`만 바꾼다. `pid`와 `window_id`를 필수로 요구하고 해당 창만 캡처한다. CLI 스크린샷도 계속 동작하지만, Claude Code가 이미지 grounding 신호로 쓰는 `mcp__cua-computer-use__screenshot` 도구 이름을 노출하지 않아 같은 흐름을 타지 못한다.

#### Computer History 미리보기

macOS nightly 빌드는 드라이버로 수행한 action의 암호화된 기록을 선택적으로 남긴다. 엄격한 메타데이터 허용 목록만 저장하고, 기록은 로컬에 머물며, 권한으로 통제되는 `history_status`와 `history_query` 도구를 읽기 전용으로 노출한다.

저장하지 않는 항목이 명시적으로 길게 나열돼 있다. 스크린샷, 입력한 텍스트, 클립보드 내용, raw 인자와 결과, accessibility tree, 경로, 창 제목, URL은 모두 제외 대상이다. 에이전트가 이전 세션의 맥락을 복원하되 민감 데이터는 읽지 못하게 하는 절충이다.

#### 스킬 배포와 라이선스 경계

정본 스킬 소스는 `rust/Skills/cua-driver`이고 ClawHub에 `@cua/driver` 단일 크로스 플랫폼 스킬로 발행된다. 스킬은 특정 작업 절차를 담아 에이전트에 결합하는 지침 패키지다. 번들에는 세 운영체제 문서가 함께 들어가며, `cua-driver skills install`로 직접 설치하면 `--all-platforms`를 주지 않는 한 호스트 OS 문서만 남는다.

라이선스 경계가 여기서 갈린다. 저장소 본체는 MIT를 유지하지만 ClawHub로 발행되는 스킬 사본은 MIT-0으로 배포된다. 발행 전에 번들된 모든 파일을 MIT-0으로 배포할 권리가 있는지 내부 기록을 남겨야 한다.

발행 워크플로에는 네 가지 조건이 걸려 있다.

- `main` 브랜치에서 수동 dispatch할 것
- 입력한 version이 `rust/Cargo.toml`과 `rust/Skills/cua-driver/SKILL.md`의 version과 모두 일치할 것
- 워크플로 폼에서 MIT-0 권리 확인에 체크할 것
- 발행자용 `CLAWHUB_TOKEN` Actions 시크릿이 설정돼 있을 것

발행 후에는 해당 version을 inspect하고 scan한 뒤 빈 작업 디렉토리에 설치해 세 플랫폼 문서가 모두 있는지, `cua-driver doctor`가 통과하는지, 읽기 전용 `list_apps` 호출이 되는지 확인한다. 릴리스에 결함이 있으면 마지막 정상 내용을 새 패치 version으로 발행한다. 교체본이 생기기 전에 현재 최신 version을 삭제하지 않는다는 규칙을 함께 적어 둔다.

### Cua Fleets와 Sandbox SDK

Fleet은 샌드박스 용량을 유지하는 클라우드 데스크톱 풀이다. 사용자 코드가 풀에서 데스크톱 하나를 claim하고, Sandbox SDK로 그 안에서 명령을 실행하거나 스크린샷을 찍거나 앱을 조작한다.

첫 결과물로 제시하는 흐름은 짧다. Linux 데스크톱을 provision하고 `uname -a`를 실행한 뒤 스크린샷을 저장하고 클라우드 리소스를 삭제한다. 튜토리얼이 자격 증명과 의존성뿐 아니라 정리 단계까지 다루는 이유는 비용 때문이다. 풀은 claim이 끝난 뒤에도 유료 용량을 유지할 수 있어서, 정리하지 않으면 과금이 계속된다.

로컬 샌드박스와 클라우드 Fleet은 같은 Sandbox SDK를 공유한다. 다만 자격 증명, 이미지, 운영 방식, 런타임 요구사항이 서로 달라서, 저장소는 어느 환경을 고를지 판단하라고 별도의 runtime support 레퍼런스를 둔다.

### Lume

Lume은 Apple Virtualization.Framework로 Apple Silicon 위에 macOS와 Linux VM을 만들고 관리하는 CLI다. Apple 복원 이미지에서 새 macOS VM을 만드는 흐름이 두 명령으로 끝난다.

```bash
lume create macos-tahoe --ipsw ~/Downloads/macos-tahoe.ipsw --unattended tahoe
lume run macos-tahoe
```

`--unattended`가 가리키는 내장 preset이 핵심이다. `sequoia`와 `tahoe` 두 preset은 GUI 자동화 없이 설치된 게스트를 설정한다. `lume` 사용자를 만들고 SSH를 켜고 자동 로그인을 설정하며 절전과 화면 잠금을 끈다. 기본 SSH 자격 증명은 `lume` / `lume`이다.

VM 설정을 화면 조작으로 자동화하지 않고 preset으로 처리한다는 점이 중요하다. 에이전트가 쓸 환경을 만드는 단계까지 에이전트에 의존하면 실패 지점이 하나 늘어나기 때문이다. 다만 검증 상태는 preset마다 다르다. Tahoe는 로컬 IPSW에서 종단 검증을 마쳤고, Sequoia는 첫 디스플레이 부팅에서 Setup Assistant의 Accessibility 단계가 뜰 수 있다고 이슈 번호와 함께 알려 둔다.

선택적 의존은 하나뿐이다. `lume sip` 명령이 macOS 복구 모드를 VNC로 제어하기 위해 `vncdotool`을 쓰며, SIP를 켜고 끌 일이 없으면 설치하지 않아도 된다.

텔레메트리는 기본으로 켜져 있고 가명 처리된 설치, 릴리스, 명령, API 이벤트 메타데이터를 기록한다. 텔레메트리는 실행 중인 시스템이 자동으로 내보내는 관측 데이터를 말한다. 프롬프트, VM과 이미지 이름, 파일 경로, 명령 인자, VM 내용은 수집하지 않는다.

```bash
lume config telemetry status
lume config telemetry disable
```

`LUME_TELEMETRY_ENABLED`가 현재 프로세스에 한해 저장된 설정을 덮어쓴다. 일반 제거는 설정과 가명 설치 ID를 남겨 재설치를 복귀로 인식하고, `uninstall.sh --purge`는 ID, 마커, 설정, 캐시, VM을 모두 지운다.

### CUA-S1

CUA-S1은 컴퓨터 사용에 특화된 소형 System 1 모델 계열이다. 저장소는 "System 1"을 모델 아키텍처 분류가 아니라 빠르고 범위가 한정된 결정을 가리키는 공학적 비유로 쓴다고 못 박는다. 범용 에이전트의 planning과 추론을 대체하지 않는다는 뜻이다. planning은 목표를 하위 단계로 쪼개 실행 순서를 정하는 과정이다.

첫 연구 프로필은 폼(form)에 집중한다. 응답을 토큰 단위로 생성하는 대신, 구조화된 인터페이스 요소와 문서 값에서 결정을 점수화한다. 어떤 필드에 어떤 값이 들어가야 하는지, 어떤 요소는 건드리지 말아야 하는지를 고르는 작업이 여기 해당한다. action의 순서는 애플리케이션 코드가 정하고, 선택적 Cua Driver 연동이 명시적 action 경계 안에서 실행을 담당한다.

#### 공개 범위와 라이선스

첫 체크포인트는 `cua-s1-form-v0`이며 상태는 프로필 정의 완료, 가중치 미배포다.

| 항목 | 공개 여부 |
|---|---|
| 모델 코드, 합성 데이터 생성, 학습, 평가 코드 | GitHub에 MIT로 공개 |
| 모델 가중치, 데이터셋 | Hugging Face에 별도 배포 |
| 체크포인트 성능 수치 | 없음 |

소스 라이선스가 향후 공식 가중치, 데이터셋, 호스팅 서비스, 상표에는 적용되지 않는다고 명시한다. 향후 체크포인트는 연구와 평가는 허용하되 상업적 production 사용에는 별도 계약을 요구할 수 있다고 미리 알린다.

Python 배포 이름은 `cua-s1`, import 이름은 `cua_s1`이다. 체크포인트를 읽으려면 로컬 `safetensors` 파일과 대응하는 JSON 설정이 필요하며, pickle 기반 PyTorch 체크포인트는 거부한다. pickle 역직렬화가 임의 코드 실행 경로가 되기 때문에 포맷 자체를 막은 것이다.

#### 안전 경계

planning과 실행을 분리하는 것이 설계의 뼈대다. 계획을 세우는 일과 실제로 화면을 바꾸는 일이 서로 다른 opt-in 뒤에 놓인다.

| 통제 | 내용 |
|---|---|
| 기본값 | dry run. `execute`와 `submit`은 각각 독립적인 opt-in이다 |
| 대상 창 | 모호하지 않은 대상 창 하나를 요구한다 |
| 요소 참조 | snapshot에 묶인 요소 토큰만 쓴다 |
| 변경 후 | 각 변경마다 창을 다시 관측한다 |
| PDF 접근 | 설정된 허용 루트로 제한한다. 설정이 없으면 현재 작업 디렉토리를 쓴다 |
| submit 범위 | 정규화된 라벨이 정확히 `Submit`이나 `Submit Form`인 고신뢰 `Button` 또는 `AXButton` 최대 하나만 허용한다 |

submit 제한이 특히 좁다. 그 외의 클릭 결정은 생략되므로, 모델이 "확인" 버튼처럼 생긴 다른 요소를 눌러 되돌릴 수 없는 결과를 만드는 경로가 막힌다. 두 실행 플래그를 켜기 전에 dry run 계획을 먼저 검토하라고 권고한다.

문서는 PDF 허용 루트의 기본값도 경고한다. 설정하지 않으면 현재 작업 디렉토리 전체가 열리므로, production에서는 최소 권한 전용 디렉토리를 지정해야 한다.

#### 선택적 MCP 서버

`cua-s1-mcp` 명령은 설정을 마친 모델 서비스가 아니라 고급 통합 표면이다. stdio transport를 쓰고 호스트 설정을 요구한다.

| 환경변수 | 역할 |
|---|---|
| `CUA_S1_PLANNER_FACTORY` | `module:attribute` 형식으로 신뢰하는 Python 코드를 지정한다 |
| `CUA_S1_ALLOWED_PDF_ROOTS` | 서버가 읽을 수 있는 디렉토리 목록. 미설정 시 현재 작업 디렉토리 |
| `CUA_S1_DRIVER_BINARY` | 드라이버 실행 파일 경로를 덮어쓴다 |
| `CUA_S1_DRIVER_TRANSPORT` | 드라이버 transport를 덮어쓴다 |
| `CUA_S1_SESSION` | 드라이버 세션을 덮어쓴다 |

`CUA_S1_PLANNER_FACTORY`에는 경고가 붙는다. 팩토리를 import하면 서버 프로세스 권한으로 코드가 실행되므로 신뢰할 수 없는 모듈을 가리켜서는 안 된다.

연결된 Cua Driver는 정확한 창 snapshot, snapshot에 묶인 요소 토큰, 확인된 action 효과를 제공해야 한다. 이식 가능한 Cua Driver 계약이 현재 `set_value`를 노출하지 않으므로, 연결된 런타임이 토큰 기반 값 변경을 명시적으로 광고하지 않으면 fill 실행은 실패로 닫힌다. 변경 없이 planning만 하는 경로는 그대로 쓸 수 있다.

MCP tool call 결과와 stdio 로그는 민감 정보로 다루라고 안내한다. PDF에서 추출한 값, 폼 라벨, 창 메타데이터, 입력할 값이 그대로 담길 수 있기 때문이다.

### Cua Bench

Cua Bench는 검증 가능한 크로스 플랫폼 환경에서 컴퓨터 사용 에이전트를 평가하는 프레임워크다. 설치는 `uv tool install 'cua-bench[browser]'`이고 `browser` extra가 Playwright를 함께 설치한다.

첫 결과물은 VM이나 Docker, 모델 API 키 없이 진행하는 시뮬레이션 과제다. 작은 task를 만들고 그 reference 해법을 실행한 뒤 채점기가 reward `1.0`을 보고하는지 확인한다. 진입 장벽을 낮추려는 선택이며, 같은 시뮬레이션 provider가 저장소 자체 테스트에도 쓰인다.

핵심 인터페이스는 gym 형태의 네 함수다. `make()`로 환경을 만들고, `reset()`으로 초기화하고, `step()`으로 action을 넣고, `evaluate()`로 채점한다. 그 위에 HTTP worker 서버(`/reset`, `/step`), worker 관리자, 벤치마크 실행기가 얹힌다.

테스트 구성은 무엇을 어느 수준에서 검증하는지 표로 정리돼 있다.

| 테스트 모듈 | 검증 대상 | 방식 |
|---|---|---|
| `test_gym_interface.py` | `make()`, `reset()`, `step()`, `evaluate()` | 종단 테스트, 실제 시뮬레이션 환경 |
| `test_worker_client.py` | worker 서버용 HTTP 클라이언트 | `requests.post`를 mock한 서버 |
| `test_worker_server.py` | FastAPI 엔드포인트와 action 직렬화 | 단위 테스트 |
| `test_run_benchmark.py` | `run_benchmark()`, `run_single_task()`, `run_interactive()` | 종단 테스트, 실제 시뮬레이션 환경 |
| `test_worker_manager.py` | worker와 dataloader 학습 루프 | 종단 테스트, 실제 worker와 환경에 mock 모델 |
| `test_actions.py` | action 문자열 파싱 `repr_to_action()` | 단위 테스트 |

테스트 철학도 함께 적혀 있다. 시뮬레이션 provider가 테스트에 쓸 만큼 빠르기 때문에 종단 테스트를 기본으로 삼고, 클라이언트 로직만 떼어 볼 때는 HTTP 응답을 mock한다. 학습 루프 테스트는 실제 ML 모델 없이 단순 action을 돌려주는 mock 모델을 써서 dataloader 경로만 검증한다.

인프라 처리량은 별도 스크립트로 측정한다.

```bash
uv run python -m cua_bench.scripts.benchmark_workers --num_workers 16 --num_steps 10
```

`--num_workers`(기본 16개), `--num_steps`(기본 10회), `--task_path` 세 플래그를 받고, 평균 reset 시간, 평균 step 시간, 평균 finish 시간, 초당 step 처리량을 출력한다.

## 결과

저장소는 모델 성능 수치를 제시하지 않는다. CUA-S1 README가 소스 전용 릴리스라서 어떤 체크포인트 성능 주장도 성립하지 않는다고 직접 밝힌다. 따라서 이 자료에서 확인할 수 있는 정량 지표는 채택 규모와 인프라 측정 항목에 한정된다.

| 지표 | 값 |
|---|---|
| GitHub star | 약 2만 5천 개 |
| fork | 약 1,700개 |
| 공개 이후 기간 | 2025년 1월부터 약 20개월 |
| Cua Bench 기본 worker 수 | 16개 |
| Cua Bench 검증 기준 | 채점기 reward `1.0` |

Cua Bench가 출력하는 인프라 지표는 평균 reset 시간, 평균 step 시간, 평균 finish 시간, 초당 step 처리량 네 가지다. 모두 사용자 하드웨어에서 측정하는 값이고 저장소가 비교용 기준값을 공개하지는 않는다.

CUA-S1의 오프라인 평가 지표는 성공과 실패를 둘로 나누지 않고 여섯 가지를 구분한다. 정확도, 기권, coverage, 잘못된 action, 잘못된 대상, 기권했어야 하는데 action을 취한 경우다. 마지막 항목을 따로 세는 것이 이 프로젝트의 관점을 보여 준다. 확신이 없을 때 아무것도 하지 않는 것이 옳은 행동이라면, 그 규칙을 어긴 사례는 단순 오답과 구분해서 재야 한다.

합성 학습, 검증, 테스트 분할은 폼 signature 기준으로 분리한다. 같은 폼 구조가 학습과 테스트에 함께 들어가 점수를 부풀리는 것을 막기 위해서다. 향후 체크포인트 릴리스에는 손대지 않은 holdout, artifact 해시, 정확한 환경 정보, 독립적으로 재현 가능한 결과를 추가해야 한다고 스스로 조건을 건다.

Cua Driver의 동작 검증은 수치가 아니라 문서 체계로 관리된다. `docs/test-matrix.md`가 단위 테스트와 정본 harness 종단 테스트를 대응시키고, `docs/action-support.md`가 플랫폼별 실제 동작을 경험적으로 기록하는 대장 역할을 한다. 플랫폼마다 되는 것과 안 되는 것이 다르다는 현실을 숨기지 않고 표로 남긴 방식이다.

## 한계

- **CUA-S1 가중치 미배포.** 소스만 공개돼 있어 실제 모델 품질을 검증할 방법이 없다. 체크포인트 릴리스 시 넣겠다고 한 holdout, artifact 해시, 환경 정보, 재현 가능한 결과가 아직 이행 전이다.
- **결과 이전 가능성에 대한 경고.** 애플리케이션, 운영체제, 언어, 레이아웃, accessibility 설정, task 분포가 바뀌면 결과가 그대로 옮겨간다고 가정하지 말라고 명시한다.
- **`set_value` 부재로 인한 기능 제약.** 이식 가능한 Cua Driver 계약이 값 변경 도구를 노출하지 않아 CUA-S1의 fill 실행은 기본적으로 닫혀 있다. planning은 되지만 실행은 런타임이 별도 기능을 광고해야 열린다.
- **macOS 권한 모델의 제약.** TCC 귀속 때문에 지원되는 실행 방식이 세 가지로 한정되고, 임의 바이너리 경로에 권한을 주는 구성은 production에서 쓸 수 없다.
- **Sequoia preset의 미완성.** 첫 디스플레이 부팅에서 Setup Assistant의 Accessibility 단계가 남아 unattended 설치가 완전하지 않다.
- **Fleet 비용 누수 가능성.** 풀이 claim 종료 후에도 유료 용량을 유지할 수 있어 정리 절차를 따르지 않으면 과금이 계속된다.
- **민감 정보 노출 표면.** MCP tool call 결과와 stdio 로그에 PDF 추출 값과 폼 라벨이 담길 수 있어 로그 취급이 별도 문제가 된다.
- **background delivery의 플랫폼 의존.** 포커스를 빼앗지 않는 조작은 앱과 플랫폼이 지원할 때만 성립하며, 경계는 별도 platform support 문서에 정리돼 있다.
- **Computer History의 미리보기 상태.** nightly macOS 빌드에서만 제공되고 NVIDIA OpenShell 연동은 이후 단계 계획으로 남아 있다.

명시된 향후 방향은 세 가지다. CUA-S1 체크포인트의 정식 릴리스와 그에 필요한 재현성 요건 충족, Computer History의 단계적 정식화, Linux 데스크톱 세션 검증 확대다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Computer-Use 2.0 | 에이전트가 한 task 안에서 코드, API, 그래픽 인터페이스 사이를 오가며 일하는 컴퓨터 사용 방식 |
| Fleet | 샌드박스 용량을 유지하는 클라우드 데스크톱 풀. 사용자 코드가 풀에서 데스크톱 하나를 claim한다 |
| background delivery | 사용자의 포인터를 움직이거나 창 포커스를 가져가지 않고 앱에 입력을 전달하는 방식 |
| permission mode | 드라이버 런타임의 권한 범위를 프로세스 시작 시점에 고정하는 설정. standard, bounded, unrestricted |
| snapshot-bound element token | 특정 창 snapshot에 묶여서만 유효한 인터페이스 요소 참조. 화면이 바뀌면 무효가 된다 |
| dry run | 계획만 만들고 실제 변경은 하지 않는 실행 모드. CUA-S1 런타임의 기본값 |
| abstention | 모델이 확신이 없을 때 action을 내지 않고 기권하는 것. CUA-S1 평가의 독립 지표 |
| TCC 귀속 | macOS가 Accessibility와 Screen Recording 권한을 실행 파일 경로가 아니라 책임 앱 정체성에 연결하는 방식 |

## 관련 페이지

- [[evaluations/xie-2024-osworld-benchmarking-multimodal-agents-for]]: 실제 운영체제 환경에서 컴퓨터 사용 에이전트를 실행 기반으로 채점하는 벤치마크. Cua Bench가 겨냥하는 검증 가능한 평가와 같은 문제를 다룬다
- [[evaluations/xlang-ai-osworld]]: 같은 벤치마크의 구현 저장소
- [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]]: 검증 가능한 학습 환경을 규모 있게 만드는 연구. Cua Bench의 trajectory 내보내기와 목적이 겹친다
- [[agents/xlangai-cua-gym-dataset]]: 같은 계열의 데이터셋
- [[agents/browser-use-browser-use]]: 브라우저를 Chrome DevTools Protocol로 조작하는 라이브러리. Cua가 브라우저를 포함한 데스크톱 전체를 대상으로 삼는 것과 범위가 대비된다
- [[agents/stablyai-orca]]: 컴퓨터 사용 에이전트 계열의 다른 구현
