---
title: "xlang-ai/OSWorld"
type: repo
year: 2024
category: evaluations
raw_path: raw/repos/xlang-ai-osworld.md
raw_filename: "xlang-ai-osworld.md"
source_collection: external
org: "xlang-ai"
repo: "OSWorld"
url: "https://github.com/xlang-ai/OSWorld"
license: "Apache-2.0"
tags: [computer-use-agents, benchmark, desktop-env, osworld-verified, virtual-machine, parallel-evaluation]
---

## 한 줄 요약 (One-line Summary)

OSWorld 논문의 저자 조직인 xlang-ai가 논문과 함께 공개한 환경과 벤치마크 저장소다. `desktop_env` 파이썬 패키지가 VMware, VirtualBox, Docker, Modal, Daytona, AWS 여섯 provider 위에서 가상 머신을 띄우고, `run.py`와 `run_multienv.py`가 논문의 baseline agent를 실행해 `show_result.py`로 집계한다. 2025-07-28의 OSWorld-Verified는 커뮤니티가 보고한 문제를 수정하고 AWS 병렬 평가로 실행 시간을 1시간 안으로 줄인 개정판이며, README는 이 버전의 결과를 이전 결과와 직접 비교하지 말라고 안내한다.

## 1. 자료 정보 (Document Information)

- **저장소**: <https://github.com/xlang-ai/OSWorld>
- **라이선스**: README에는 Apache 2.0 배지만 있고 본문 조항은 없다. 현재 raw로는 검증 불가.
- **PyPI**: `desktop-env`. 벤치마크 task 없이 환경만 설치하려면 `pip install desktop-env`
- **파이썬**: 3.10 이상
- **헤더 링크 7개**: Website(<https://os-world.github.io/>), Paper(arXiv 2404.07972), Doc(<https://timothyxxx.github.io/OSWorld/>), Data(repo의 `evaluation_examples/`), Data Viewer(<https://os-world.github.io/explorer.html>), Discord, Cache(Google Drive)
- **배지 5개**: PRs Welcome, last-commit, License Apache 2.0, PyPI `desktop-env` 버전, pepy 다운로드
- **논문**: [[evaluations/xie-2024-osworld-benchmarking-multimodal-agents-for]]. README 인용 블록은 저자 17명, `eprint 2404.07972`, `primaryClass cs.AI`, 2024년으로 적는다.
- **현재 maintainer**: 2인 (README에 이메일 기재)

README의 갱신 연표는 다섯 항목이다.

| 날짜 | 내용 |
|---|---|
| 2024-04-11 | 논문, 환경과 벤치마크, 프로젝트 페이지 공개 |
| 2024-06-15 | 환경 코드를 리팩터링해 VMware 통합을 분리. VirtualBox, AWS, Azure 등 다른 플랫폼 지원 착수 |
| 2024-10-22 | 가상화 플랫폼 위에서 가상 머신을 호스팅하는 Docker 지원 추가 |
| 2025-05-01 | 초기 상태 설정에 필요한 파일을 미리 내려받은 배포본을 Google Drive로 제공 (헤더의 Cache 링크와 같은 파일) |
| 2025-07-28 | OSWorld-Verified 공개. 커뮤니티 보고 문제 수정, AWS 지원 확대(병렬화로 평가 시간 1시간 이내), 벤치마크 신호 개선. 새 모델 결과를 웹사이트에 갱신 |

## 2. 주요 기여 (Key Contributions)

이 저장소는 논문이 실험한 환경을 재현하는 데 필요한 요소를 한 묶음으로 제공한다. 환경 패키지, provider 계층, baseline 실행 스크립트, 결과 집계 스크립트, 수동 검사 도구, 공개 평가 절차가 README에 기술되어 있다.

- **환경 패키지 분리.** `desktop-env`가 PyPI에 올라가 있어 벤치마크 task 없이 환경만 설치할 수 있다.
- **provider 계층.** 2024-06-15 리팩터링으로 VMware 통합이 분리된 뒤 `provider_name` 인자로 백엔드를 고른다. README가 설치 절을 둔 provider는 VMware/VirtualBox, Docker, Modal, Daytona, AWS다. "Others" 절은 추가 지원을 준비 중이라고만 적는다.
- **baseline 실행 스크립트.** `run.py`(단일 스레드, deprecated)와 `scripts/python/run_multienv.py`(병렬)가 논문의 GPT-4o 순수 screenshot 설정을 예시로 실행한다. 결과는 screenshot, action, 영상 녹화까지 `result_dir`에 저장된다.
- **결과 집계.** `show_result.py`가 도메인별 성공률, Office, Daily, Professional 카테고리 통계, 전체 성공률과 총점을 출력한다. `--detailed`는 도메인마다 `score/total` 형식으로 보여준다.
- **수동 검사.** `scripts/python/manual_examine.py`로 특정 task를 사람이 직접 실행하며 task 정확성과 평가 지표를 확인한다.
- **시크릿 주입.** `--vm_secret_mount`가 호스트 파일을 VM 경로로 주입한다. 자격 증명을 VM 이미지에 포함시키지 말고 시작 시점에 넣으라는 안내다.
- **공개 평가 절차.** verified leaderboard에 오르려면 maintainer와 회의를 잡고 agent 코드를 저자 측에서 실행하게 한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 provider 계층과 설치 경로

README는 호스트 환경에 따라 provider를 나눈다. 가상화되지 않은 데스크톱, 노트북, 베어메탈은 VMware/VirtualBox, 가상화된 서버는 Docker, 클라우드 샌드박스는 Modal과 Daytona, 대규모 병렬 평가는 AWS다.

| provider | 대상 호스트 | 요구 사항 | README의 특기 사항 |
|---|---|---|---|
| `vmware` | 가상화되지 않은 데스크톱, 노트북, 베어메탈 | VMware Workstation Pro와 `vmrun` 설정. Apple Silicon은 VMware Fusion | setup 스크립트가 필요한 가상 머신을 자동으로 내려받아 구성한다 |
| `virtualbox` | VMware Pro 사용이 어려운 경우 | VirtualBox | 병렬 실행과 Apple Silicon macOS는 잘 지원되지 않을 수 있다 |
| `docker` | 베어메탈이 아닌 서버, 또는 VMware/VirtualBox를 피하고 싶은 경우 | KVM 지원 권장, Docker Desktop 또는 Docker Engine | `DesktopEnv` 초기화 시 `provider_name: docker`, `os_type: Ubuntu` 또는 `Windows` |
| `modal` | Modal VM Sandbox | `pip install 'modal>=1.5.0'`, `modal setup` | `python -m desktop_env.providers.modal.setup --os Ubuntu`로 디스크 이미지를 스테이징 |
| `daytona` | Daytona 샌드박스 | `pip install daytona`, `DAYTONA_API_KEY`, `DAYTONA_OSWORLD_SNAPSHOT=osworld-ubuntu-v1` | 샌드박스 자체가 데스크톱 역할을 하므로 호스트 KVM이나 Docker qcow2 흐름이 필요 없다 |
| `aws` | 클라우드 병렬 평가 | `SETUP_GUIDELINE.md`와 `AWS_GUIDELINE.md` 참고 | Host-Client 구조로 대규모 병렬 평가. 학습 인프라로도 쓸 수 있다고 적는다 |

VMware 경로의 설치는 두 단계다. 저장소를 clone해 `requirements.txt`를 설치하고(Conda 권장, 파이썬 3.10 이상), VMware Workstation Pro를 설치해 `vmrun -T ws list`로 확인한다. 설치 안내는 `desktop_env/providers/vmware/INSTALL_VMWARE.md`에 있다.

Docker 경로는 KVM 확인이 먼저다. 리눅스에서 `egrep -c '(vmx|svm)' /proc/cpuinfo`의 반환값이 0보다 크면 KVM을 지원한다. macOS 호스트는 일반적으로 KVM을 지원하지 않으므로 VMware를 권한다. 실험이 비정상 종료되면 잔여 컨테이너가 남아 시간이 지나면서 성능에 영향을 줄 수 있으므로 `docker stop $(docker ps -q) && docker rm $(docker ps -a -q)`로 정리한다.

Modal과 Daytona의 세부는 각각 `desktop_env/providers/modal/MODAL_GUIDELINE.md`와 `desktop_env/providers/daytona/DAYTONA_GUIDELINE.md`에 있다. Daytona 가이드는 스냅샷 빌드, smoke test, 포트 포워딩, tier 제한을 다룬다.

### 3.2 최소 실행과 baseline 재현

`quickstart.py`가 최소 예시다. 기본 설정으로 `python quickstart.py`를 실행하거나 `--provider_name vmware --path_to_vm "path/to/your/vm.vmx"`로 provider와 VM 경로를 지정한다. 환경 생성, setup 완료, action 실행 로그가 이어지고 마지막에 화면 우클릭이 성공하면 준비가 끝난 것이다. Modal은 `--provider_name modal --headless true`, Daytona는 `--provider_name daytona --headless True`로 같은 스크립트를 실행한다.

논문 baseline은 GPT-4o 순수 screenshot 설정을 예시로 실행한다. `OPENAI_API_KEY`가 필수이고 OpenAI 호환 엔드포인트를 쓰려면 `OPENAI_BASE_URL`을 추가로 설정한다(기본값 `https://api.openai.com`).

| 인자 | `run.py` (단일 스레드, deprecated) | `run_multienv.py` (병렬) |
|---|---|---|
| `--provider_name` | `vmware` | `docker` |
| `--path_to_vm` | `Ubuntu/Ubuntu.vmx` | 없음 |
| `--headless` | 지정 | 지정 |
| `--observation_type` | `screenshot` | `screenshot` |
| `--model` | `gpt-4o` | `gpt-4o` |
| `--sleep_after_execution` | 3 | 3 |
| `--max_steps` | 15 | 15 |
| `--num_envs` | 없음 | 10 |
| `--result_dir` | `./results` | 없음 (기본 `./results`) |
| `--client_password` | `password` | `password` |

README는 `--observation_type`의 값으로 `screenshot`만 예시한다. 다른 값은 README에 나열되어 있지 않다. task가 호스트 측 자격 증명을 필요로 하면 `--vm_secret_mount /path/to/google-sa.json:/opt/osworld/secrets/google-sa.json`처럼 시작 시점에 주입한다.

### 3.3 결과 집계와 수동 검사

`show_result.py`는 인자 없이 실행하거나 `--action_space pyautogui --model gpt-4o --observation_type screenshot --result_dir ./results`로 지정한다. 출력은 네 가지다.

- 도메인별 성공률
- 카테고리 수준 통계 (Office, Daily, Professional)
- 전체 성공률과 총점
- `--detailed` 지정 시 도메인마다 `score/total` 형식

`manual_examine.py`의 README 예시는 `--headless --observation_type screenshot --result_dir ./results_human_examine --test_all_meta_path evaluation_examples/test_all.json --domain libreoffice_impress --example_id a669ef01-ded5-4099-9ea9-25e99b569840 --max_steps 3`이다. 이 도구로 task를 수동 실행하고, task 정확성과 평가 지표를 확인하고, 실행 과정을 screenshot과 영상으로 기록하고, 문제가 있는 task를 조사한다. 도메인별 예시 task ID는 `scripts/bash/run_manual_examine.sh`에 있다.

### 3.4 평가 경로

로컬 평가는 agent 인터페이스(`mm_agents/README.md`)와 환경 인터페이스(`desktop_env/README.md`)를 읽고 agent 인터페이스를 구현한 뒤, 단일 스레드는 `run.py`, 병렬은 `scripts/python/run_multienv.py` 또는 `run_multienv_xxx.py`에 import해 실행한다.

공개 평가는 결과를 verified leaderboard에 올리는 경로다. 요건은 세 가지다.

| 요건 | 내용 |
|---|---|
| 회의 예약 | 현재 maintainer 2인과 회의를 잡고 저자 측에서 agent 코드를 실행해 결과를 보고받는다 |
| 구현 공개 | OSWorld 프레임워크 아래 agent 구현을 업로드하고 공개를 허용한다 (모델 API는 비공개 가능). 동작을 설명하는 report를 함께 낸다 |
| 신뢰 기관 대안 | 신뢰할 수 있는 기관이면 모니터링 데이터와 trajectory를 공유하는 것으로 대신할 수 있다 |

절차는 `SETUP_GUIDELINE.md`의 "Public Evaluation Platform" 절을 따른다.

### 3.5 실행 전 설정 요구사항

README의 경고 블록은 세 항목이다. 일부 task는 Google 계정과 OAuth 2.0 설정을 요구하고, 일부 task는 네트워크 위치에 대한 웹사이트 방어 강도에 따라 프록시 설정이 필요하며, 이 설정이 없으면 해당 task가 정상 실행되지 않아 평가 점수가 낮아진다. 설정 안내는 `SETUP_GUIDELINE.md`의 "Google Account Setup"과 "Proxy Configuration" 절이고, 프록시는 DataImpulse 기반 사전 구성 방안이 "Proxy for specific tasks (recommended)" 절에 있다.

가상 머신 자격 증명은 provider에 따라 다르다.

| provider | 계정 | 비밀번호 |
|---|---|---|
| `vmware`, `virtualbox`, `docker` | `user` | `password` |
| `aws` 등 클라우드 | (README 미기재) | `osworld-public-evaluation` (약한 비밀번호 공격 방지 목적) |

비밀번호를 바꾸면 `client_password` 변수를 `DesktopEnv`와 Agent(지원 시)에 전달해야 한다. 프록시 설정 같은 기능은 sudo 권한을 얻기 위해 클라이언트 VM 비밀번호가 필요하고, 일부 task는 agent가 sudo 권한을 얻어야 완료할 수 있다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README는 성능 수치를 싣지 않는다. 논문 수치는 [[evaluations/xie-2024-osworld-benchmarking-multimodal-agents-for]]에 있고, OSWorld-Verified 이후의 새 모델 결과는 프로젝트 웹사이트에 갱신된다고 적는다.

README가 결과와 관련해 명시하는 사항은 두 가지다. 첫째, 최신 버전을 실행했다면 자신의 결과를 새 벤치마크 결과와 비교해야 한다. 둘째, AWS 병렬 평가는 평가 시간을 1시간 이내로 줄일 수 있고 학습 인프라로도 쓸 수 있다.

OSWorld-Verified 감사 절은 피드백과 수정에 참여한 기관 7곳(MoonShot AI, Human Data, OpenAI, ByteDance Seed TARS, Anthropic, Simular, HKU Data Intelligence Lab), 수정에 참여한 학생 11인, 재평가 실행에 참여한 학생 4인을 적는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

README가 명시한 제약은 다음과 같다.

- VirtualBox는 병렬 실행과 Apple Silicon macOS 지원이 약할 수 있다.
- macOS 호스트는 일반적으로 KVM을 지원하지 않아 Docker provider 대신 VMware를 써야 한다.
- Docker provider는 비정상 종료 시 잔여 컨테이너가 성능에 영향을 줄 수 있다.
- Google 계정, OAuth 2.0, 프록시 설정이 없으면 일부 task가 실패해 점수가 낮아진다.
- OSWorld-Verified 이후의 결과는 이전 버전 결과와 직접 비교할 수 없다.
- 단일 스레드 `run.py`는 deprecated다.

자료에 기술이 없어 확인할 수 없는 사항도 있다. README는 task 수, 도메인 목록, `--observation_type`의 전체 값, Windows task 활성화 절차를 적지 않는다. 라이선스는 배지만 있어 본문 조항으로 검증할 수 없다. 2024-06-15 갱신이 언급한 Azure는 설치 절이 없다. "Others" 절은 추가 provider 지원을 준비 중이라고만 적는다.

README 내부의 불일치는 한 건이다. `run.py`를 "deprecated"로 표기하면서 Local Evaluation 절은 여전히 단일 스레드 경로로 `run.py`를 안내한다.

## 6. 관련 연구 (Related Work)

README의 "You might also be interested" 절에는 OSWorld-MCP 하나만 있다. computer-use agent의 MCP tool 호출을 벤치마크하는 후속 작업이다. 이 wiki 안에서는 원논문 [[evaluations/xie-2024-osworld-benchmarking-multimodal-agents-for]], OSWorld-Verified를 주 평가 벤치마크로 쓰는 [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]]와 그 저장소 [[agents/xlang-ai-cua-gym]], OSWorld를 외부 벤치마크 후보로 언급하는 [[agents/browser-use-browsercode]]가 이어진다.

## 7. 용어집 (Glossary)

- **`desktop_env`**: 환경 쪽 파이썬 패키지. PyPI 이름은 `desktop-env`. `DesktopEnv` 클래스에 `provider_name`과 `os_type`을 넘겨 가상 머신을 연결한다.
- **provider**: 가상 머신을 실제로 띄우는 백엔드. README에 등장하는 이름은 `vmware`, `virtualbox`, `docker`, `modal`, `daytona`, `aws` 여섯이다.
- **OSWorld-Verified**: 2025-07-28 개정판. 커뮤니티 보고 문제 수정, AWS 병렬 평가, 벤치마크 신호 개선. 이전 버전 결과와 직접 비교하지 않는다.
- **verified leaderboard**: 저자 측이 agent 코드를 직접 실행해 검증한 결과만 올리는 공개 순위표.
- **`--vm_secret_mount`**: 호스트 파일을 VM 경로로 주입하는 인자. 자격 증명을 이미지에 포함시키지 않기 위한 수단.
- **`client_password`**: 클라이언트 VM의 비밀번호 변수. sudo 권한이 필요한 프록시 설정과 일부 task에 쓰인다.
- **Host-Client 구조**: AWS provider의 대규모 병렬 평가 구조. 세부는 `AWS_GUIDELINE.md`에 있다.
