---
title: "xlang-ai/OSWorld"
type: repo
year: 2024
category: evaluations
raw_path: raw/repos/xlang-ai-osworld.md
raw_filename: "xlang-ai-osworld.md"
source_collection: external
source: xlang-ai-osworld.md
org: "xlang-ai"
repo: "OSWorld"
url: "https://github.com/xlang-ai/OSWorld"
license: "Apache-2.0"
tags: [computer-use-agents, benchmark, desktop-env, osworld-verified, virtual-machine, parallel-evaluation]
---

## 요약

xlang-ai/OSWorld는 OSWorld 논문의 저자 조직이 논문과 함께 공개한 환경과 벤치마크 저장소다. README의 2024-04-11 항목이 "논문, 환경과 벤치마크, 프로젝트 페이지를 공개했다"고 적고, 인용 블록은 논문 저자 17명을 그대로 적는다. README는 이 저장소에 공식 구현체 같은 별도 지위를 부여하지 않으며, "official"이라는 표현은 결과가 게시되는 웹사이트에만 쓴다.

저장소의 중심은 `desktop_env` 파이썬 패키지다. 이 패키지가 가상 머신을 띄우는 provider 계층을 추상화하고, 그 위에서 `run.py`와 `scripts/python/run_multienv.py`가 논문의 baseline agent를 실행하며, `show_result.py`가 결과를 집계한다. README가 설치 절을 둔 provider는 VMware/VirtualBox, Docker, Modal, Daytona, AWS다.

2025-07-28에 공개된 OSWorld-Verified는 커뮤니티가 보고한 문제를 수정하고 AWS 지원을 확대한 개정판이다. AWS 병렬 평가는 실행 시간을 1시간 이내로 줄일 수 있다. README는 최신 버전을 실행한 결과를 이전 결과가 아니라 새 벤치마크 결과와 비교하라고 안내한다.

## 핵심 개념

computer-use agent는 화면을 보고 마우스와 키보드로 컴퓨터를 직접 조작하는 agent를 말한다. README는 이 표현을 후속 프로젝트 OSWorld-MCP의 소개 문장에서 쓰며, 이 저장소는 그런 agent를 실제 OS가 실행되는 가상 머신 안에서 평가하는 도구다.

provider는 가상 머신을 실제로 띄우는 백엔드를 가리키는 이 저장소의 용어다. 2024-06-15 리팩터링으로 VMware 통합이 환경 코드에서 분리된 뒤, 사용자는 `provider_name` 인자 하나로 백엔드를 고른다. README에 이름이 등장하는 provider는 `vmware`, `virtualbox`, `docker`, `modal`, `daytona`, `aws` 여섯이다.

headless는 화면 출력 없이 가상 머신을 실행하는 모드다. README의 baseline 실행, 수동 검사, Modal과 Daytona 예시는 `--headless`를 지정하고, 기본 `quickstart.py` 예시 두 개만 지정하지 않는다.

KVM은 리눅스 커널의 가상화 기능이다. Docker provider는 컨테이너 안에서 가상 머신을 다시 띄우는 구조라서 호스트가 KVM을 지원해야 성능이 나온다. README는 KVM 확인 명령과 macOS 호스트의 제약을 함께 적는다.

trajectory는 agent 세션 하나의 실행 기록 전체를 뜻한다. README의 공개 평가 절은 신뢰할 수 있는 기관이 agent 구현 대신 모니터링 데이터와 trajectory를 공유해도 된다고 적는다.

## 저장소 구성

### 헤더 링크와 배지

README 상단은 배너 이미지, 링크 7개, 배지 5개로 시작한다. 배너와 배지는 도식이 아니므로 이 페이지에는 figure를 두지 않는다.

| 링크 | 대상 |
|---|---|
| Website | <https://os-world.github.io/> |
| Paper | arXiv 2404.07972 |
| Doc | <https://timothyxxx.github.io/OSWorld/> |
| Data | 저장소의 `evaluation_examples/` 디렉터리 |
| Data Viewer | <https://os-world.github.io/explorer.html> |
| Discord | 초대 링크 |
| Cache | Google Drive 파일. 2025-05-01 갱신 항목의 초기 상태 파일 배포본과 같은 파일이다 |

| 배지 | 의미 |
|---|---|
| PRs Welcome | 외부 기여를 받는다 |
| last-commit | 마지막 커밋 시점 |
| License Apache 2.0 | 라이선스 배지. 본문에 조항 문장은 없다 |
| PyPI `desktop-env` | 환경 패키지의 배포 버전 |
| pepy 다운로드 | PyPI 다운로드 수 |

### 갱신 연표

README의 Updates 절은 다섯 항목이다. 시간순으로 읽으면 VMware 전용 환경이 다중 provider 환경으로 바뀌고, 이어서 벤치마크 자체가 개정되는 흐름이다.

| 날짜 | 내용 |
|---|---|
| 2024-04-11 | 논문, 환경과 벤치마크, 프로젝트 페이지 공개 |
| 2024-06-15 | 환경 코드를 리팩터링해 VMware 통합을 분리. VirtualBox, AWS, Azure 등 다른 플랫폼 지원 착수 |
| 2024-10-22 | 가상화 플랫폼 위에서 가상 머신을 호스팅하는 Docker 지원 추가 |
| 2025-05-01 | 초기 상태 설정에 필요한 파일을 미리 내려받은 배포본을 Google Drive로 제공 |
| 2025-07-28 | OSWorld-Verified 공개. 커뮤니티 보고 문제 수정, AWS 지원 확대, 벤치마크 신호 개선. 새 모델 결과를 웹사이트에 갱신 |

2024-06-15 항목이 언급한 Azure는 README 본문에 설치 절이 없다. 따라서 이 페이지는 Azure를 provider 목록에 넣지 않는다.

### 인용 정보

README의 인용 블록은 `@misc{OSWorld}` 형식이다. 제목은 "OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments", 저자 17명, 2024년, `eprint 2404.07972`, `primaryClass cs.AI`다. 원논문 페이지는 [[evaluations/xie-2024-osworld-benchmarking-multimodal-agents-for]]다.

## 설치

### provider 선택 기준

README는 호스트가 가상화되어 있는지를 첫 번째 기준으로 삼는다. 가상화되지 않은 데스크톱, 노트북, 베어메탈은 VMware/VirtualBox 경로이고, AWS, Azure, k8s 같은 가상화 플랫폼 위라면 Docker 경로다. 클라우드 샌드박스 서비스인 Modal과 Daytona는 별도 절이 있고, 대규모 병렬 평가는 AWS 절이 담당한다.

| provider | 대상 호스트 | 요구 사항 | README의 특기 사항 |
|---|---|---|---|
| `vmware` | 가상화되지 않은 데스크톱, 노트북, 베어메탈 | VMware Workstation Pro와 `vmrun` 설정. Apple Silicon은 VMware Fusion | setup 스크립트가 필요한 가상 머신을 자동으로 내려받아 구성한다 |
| `virtualbox` | VMware Pro 사용이 어려운 경우 | VirtualBox | 병렬 실행과 Apple Silicon macOS는 잘 지원되지 않을 수 있다 |
| `docker` | 베어메탈이 아닌 서버, 또는 VMware/VirtualBox를 피하고 싶은 경우 | KVM 지원 권장, Docker Desktop 또는 Docker Engine | `DesktopEnv` 초기화 시 `provider_name: docker`, `os_type: Ubuntu` 또는 `Windows` |
| `modal` | Modal VM Sandbox | `modal>=1.5.0` SDK, `modal setup` 인증 | 디스크 이미지를 Modal에 스테이징한 뒤 실행한다 |
| `daytona` | Daytona 샌드박스 | `daytona` SDK, API 키, 스냅샷 이름 | 샌드박스 자체가 데스크톱 역할을 하므로 호스트 KVM이나 Docker qcow2 흐름이 필요 없다 |
| `aws` | 클라우드 병렬 평가 | `SETUP_GUIDELINE.md`와 `AWS_GUIDELINE.md` 참고 | Host-Client 구조로 대규모 병렬 평가. 학습 인프라로도 쓸 수 있다고 적는다 |

"Others" 절은 추가 provider 지원을 준비 중이라고만 적는다. 즉 README 시점의 provider는 위 여섯이 전부다.

### VMware와 VirtualBox

VMware 경로는 두 단계다. 첫 단계는 파이썬 의존성 설치이고, 두 번째 단계는 가상화 소프트웨어 설치와 확인이다.

| 단계 | 작업 | 명령과 조건 |
|---|---|---|
| 1 | 저장소 clone과 의존성 설치 | `git clone https://github.com/xlang-ai/OSWorld`, `pip install -r requirements.txt`. Conda 권장, 파이썬 3.10 이상 |
| 1 (대안) | 벤치마크 task 없이 환경만 설치 | `pip install desktop-env` |
| 2 | VMware Workstation Pro 설치와 `vmrun` 설정 | Apple Silicon은 VMware Fusion. 안내는 `desktop_env/providers/vmware/INSTALL_VMWARE.md` |
| 2 (확인) | 설치와 환경 변수 확인 | `vmrun -T ws list`가 현재 실행 중인 가상 머신 목록을 출력하면 성공 |

두 단계가 끝나면 setup 스크립트가 필요한 가상 머신을 자동으로 내려받아 환경을 구성한다. 즉 사용자가 VM 이미지를 직접 구하지 않아도 된다.

VirtualBox는 VMware Pro 사용에 문제가 있을 때의 대안이다. 다만 README는 병렬 실행과 Apple Silicon macOS 같은 기능이 잘 지원되지 않을 수 있다고 적는다.

### Docker

Docker 경로는 KVM 확인, Docker 설치, `DesktopEnv` 인자 지정, 정리 순서로 진행한다.

| 단계 | 작업 | 내용 |
|---|---|---|
| KVM 확인 | 호스트의 가상화 지원 검사 | 리눅스에서 `egrep -c '(vmx|svm)' /proc/cpuinfo`. 반환값이 0보다 크면 KVM 지원 |
| Docker 설치 | GUI 유무에 따라 선택 | GUI가 있으면 Docker Desktop(Linux 또는 Windows), 없으면 Docker Engine |
| 인자 지정 | `DesktopEnv` 초기화 | `provider_name: docker`, `os_type: Ubuntu` 또는 `Windows` |
| 정리 | 비정상 종료 후 잔여 컨테이너 제거 | `docker stop $(docker ps -q) && docker rm $(docker ps -a -q)` |

macOS 호스트는 일반적으로 KVM을 지원하지 않는다. 따라서 README는 macOS에서 OSWorld를 실행하려면 VMware를 쓰라고 권한다. 정리 단계가 필요한 이유는 인터럽트 신호 등으로 실험이 비정상 종료되면 컨테이너가 남아 시간이 지나면서 시스템 성능에 영향을 줄 수 있기 때문이다.

### Modal과 Daytona

두 provider는 모두 클라우드 샌드박스 위에서 OSWorld를 실행하지만 구조가 다르다. Modal은 VM Sandbox에 OSWorld 디스크 이미지를 올리는 방식이고, Daytona는 샌드박스 자체를 데스크톱으로 쓰는 방식이다.

| 항목 | Modal | Daytona |
|---|---|---|
| SDK 설치 | `pip install 'modal>=1.5.0'` | `pip install daytona` |
| 인증 | `modal setup` | `DAYTONA_API_KEY` 환경 변수 |
| 사전 준비 | `python -m desktop_env.providers.modal.setup --os Ubuntu`로 디스크 이미지 스테이징 | `DAYTONA_OSWORLD_SNAPSHOT=osworld-ubuntu-v1` 스냅샷 이름 지정 |
| 실행 | `python quickstart.py --provider_name modal --headless true` | `python quickstart.py --provider_name daytona --headless True` |
| 호스트 요구 | 자료에 없음 | 호스트 KVM과 Docker qcow2 흐름 불필요 |
| 세부 가이드 | `desktop_env/providers/modal/MODAL_GUIDELINE.md` | `desktop_env/providers/daytona/DAYTONA_GUIDELINE.md` (스냅샷 빌드, smoke test, 포트 포워딩, tier 제한) |

### AWS

AWS 절은 명령 대신 구조와 효과를 적는다. Host-Client 구조로 OSWorld task를 대규모로 병렬 평가하며, 병렬화로 평가 시간을 1시간 이내로 줄일 수 있고 학습 인프라로도 쓸 수 있다. 설정 절차는 `SETUP_GUIDELINE.md`와 `desktop_env/providers/aws/AWS_GUIDELINE.md`에 있다. README 본문에는 AWS 인스턴스 종류나 비용 같은 세부가 없다.

## 실행

### 최소 실행

`quickstart.py`가 환경과의 최소 상호작용 예시다. 실행하면 환경 생성, setup 완료, action 실행 로그가 이어지고, 마지막에 화면 우클릭이 성공하면 준비가 끝난 것이다.

| 명령 | 뜻 |
|---|---|
| `python quickstart.py` | 기본 설정으로 실행 |
| `python quickstart.py --provider_name vmware --path_to_vm "path/to/your/vm.vmx"` | provider와 VM 경로 지정 |
| `python quickstart.py --provider_name modal --headless true` | Modal 샌드박스에서 실행 |
| `python quickstart.py --provider_name daytona --headless True` | Daytona 샌드박스에서 실행 |

### baseline 재현

README는 논문의 baseline agent를 GPT-4o 순수 screenshot 설정으로 실행하는 예시를 든다. 실행 전에 환경 변수를 설정한다.

| 환경 변수 | 필수 여부 | 뜻 |
|---|---|---|
| `OPENAI_API_KEY` | 필수 | OpenAI API 키 |
| `OPENAI_BASE_URL` | 선택 | OpenAI 호환 엔드포인트. 기본값 `https://api.openai.com` |

실행 스크립트는 두 가지다. `run.py`는 단일 스레드 실행이며 README가 deprecated로 표기한다. `scripts/python/run_multienv.py`는 병렬 실행이며 `--num_envs`로 동시에 띄울 환경 수를 정한다.

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

`--observation_type`의 값으로 README가 보여주는 것은 `screenshot`뿐이다. 논문이 다룬 다른 observation 설정은 README에 나열되어 있지 않으므로 원논문 페이지를 참고해야 한다.

task가 호스트 측 자격 증명이나 비밀 값을 VM 안에서 필요로 하면 `--vm_secret_mount`로 시작 시점에 주입한다. README 예시는 `--vm_secret_mount /path/to/google-sa.json:/opt/osworld/secrets/google-sa.json`이다. 비밀 값을 VM 이미지에 포함시키지 말라는 것이 README의 안내다.

실행 결과는 agent의 task 수행 과정을 담은 screenshot, action, 영상 녹화이며 `./results` 또는 `--result_dir`로 지정한 디렉터리에 저장된다.

### 실행 전 설정 요구사항

Experiments 절 앞의 경고 블록은 세 항목이다. 이 설정은 agent의 능력과 무관하게 점수를 바꾸므로, 결과를 비교하기 전에 확인해야 한다.

| 항목 | 내용 | 안내 위치 |
|---|---|---|
| Google 계정 task | 일부 task가 Google 계정 접근과 OAuth 2.0 설정을 요구한다 | `SETUP_GUIDELINE.md` "Google Account Setup" |
| 프록시 설정 | 일부 task는 네트워크 위치에 대한 웹사이트 방어 강도에 따라 프록시가 필요하다 | `SETUP_GUIDELINE.md` "Proxy Configuration" |
| 설정 누락의 영향 | 설정이 없으면 해당 task가 정상 실행되지 않아 평가 점수가 낮아진다 | 경고 블록 |

### 결과 집계

`show_result.py`는 저장된 결과 디렉터리를 읽어 집계한다. 인자 없이 실행하면 기본 파라미터를 쓰고, `--action_space pyautogui --model gpt-4o --observation_type screenshot --result_dir ./results`처럼 지정할 수도 있다.

| 출력 | 내용 |
|---|---|
| 도메인별 성공률 | 앱 도메인 단위 성공률 |
| 카테고리 통계 | Office, Daily, Professional 세 카테고리 |
| 전체 성공률과 총점 | 벤치마크 전체 |
| `--detailed` | 도메인마다 `score/total` 형식의 압축 표시 |

README는 도메인 목록 자체를 적지 않는다. 카테고리 이름 세 개만 `show_result.py` 출력 설명에 나온다.

### 수동 task 검사

`scripts/python/manual_examine.py`는 특정 벤치마크 task를 사람이 직접 실행하며 검증하는 도구다. 채점 스크립트나 task 정의에 의심이 갈 때 쓴다.

| 인자 | README 예시 값 |
|---|---|
| `--headless` | 지정 |
| `--observation_type` | `screenshot` |
| `--result_dir` | `./results_human_examine` |
| `--test_all_meta_path` | `evaluation_examples/test_all.json` |
| `--domain` | `libreoffice_impress` |
| `--example_id` | `a669ef01-ded5-4099-9ea9-25e99b569840` |
| `--max_steps` | 3 |

이 도구의 용도는 네 가지다. task를 환경 안에서 수동 실행하고, task 정확성과 평가 지표를 확인하고, 실행 과정을 screenshot과 영상으로 기록하고, 문제가 있는 특정 task를 조사한다. 도메인별 예시 task ID는 `scripts/bash/run_manual_examine.sh`에 있다.

## 평가 경로

README는 자기 agent를 평가하는 경로를 로컬과 공개 두 가지로 나눈다. 로컬 평가는 사용자가 직접 실행하고, 공개 평가는 저자 측이 실행해 verified leaderboard에 올린다.

| 항목 | 로컬 평가 | 공개 평가 |
|---|---|---|
| 실행 주체 | 사용자 | 저자 측 (현재 maintainer 2인) |
| 사전 읽기 | agent 인터페이스(`mm_agents/README.md`), 환경 인터페이스(`desktop_env/README.md`) | `SETUP_GUIDELINE.md` "Public Evaluation Platform" |
| 작업 | agent 인터페이스를 구현하고 `run.py`(단일 스레드) 또는 `scripts/python/run_multienv.py`, `run_multienv_xxx.py`(병렬)에 import | 회의 예약, 구현 업로드, report 제출 |
| 결과 | 로컬 `result_dir` | verified leaderboard 게시 |

### 공개 평가 요건

공개 평가는 결과의 신뢰성을 저자 측이 담보하는 대신 구현 공개를 요구한다.

| 요건 | 내용 |
|---|---|
| 회의 예약 | maintainer 2인과 회의를 잡고 저자 측에서 agent 코드를 실행해 결과를 보고받는다 |
| 구현 공개 | OSWorld 프레임워크 아래 agent 구현을 업로드하고 공개를 허용한다. 모델 API는 비공개로 둘 수 있다 |
| report 제출 | 동작 원리를 대중이 이해할 수 있는 report를 함께 낸다 |
| 신뢰 기관 대안 | 신뢰할 수 있는 기관이면 모니터링 데이터와 trajectory 공유로 대신할 수 있다 |

## 운영 정보

### 가상 머신 자격 증명

FAQ 첫 항목은 가상 머신 계정이다. 로컬 provider와 클라우드 provider의 기본값이 다르다.

| provider | 계정 | 비밀번호 | 이유 |
|---|---|---|---|
| `vmware`, `virtualbox`, `docker` | `user` | `password` | 로컬 기본값 |
| `aws` 등 클라우드 | 자료에 없음 | `osworld-public-evaluation` | 약한 비밀번호로 인한 공격 방지 |

비밀번호를 바꾸면 `client_password` 변수를 `DesktopEnv`와 Agent(지원하는 경우)에 전달해야 한다. 이 비밀번호가 필요한 이유는 두 가지다. 프록시 설정 같은 기능이 sudo 권한을 얻으려면 클라이언트 VM 비밀번호가 필요하고, 일부 task는 agent가 sudo 권한을 얻어야 완료할 수 있다.

### Google 계정과 프록시

FAQ의 나머지 두 항목은 모두 `SETUP_GUIDELINE.md`로 안내한다. 프록시 항목은 GFW 뒤에 있거나 봇으로 식별되어 점수가 깎이는 상황을 예로 들며, DataImpulse 기반 사전 구성 방안을 "Proxy for specific tasks (recommended)" 절에서 제공한다고 적는다.

| `SETUP_GUIDELINE.md` 절 | 다루는 내용 |
|---|---|
| 1. Google Account Setup | Google 계정과 Google Drive 자격 증명 |
| 2. Proxy Configuration | VM 프록시 설정 |
| 2.3 Proxy for specific tasks (recommended) | DataImpulse 기반 사전 구성 |
| 3. Public Evaluation Platform | 공개 평가 절차 |

## OSWorld-Verified

OSWorld-Verified는 2025-07-28에 공개된 벤치마크 개정판이다. README의 갱신 항목과 감사 절이 변경 내용과 참여자를 적는다.

| 변경 | README의 서술 |
|---|---|
| 문제 수정 | 커뮤니티가 보고한 여러 문제를 수정했다 |
| AWS 지원 확대 | 병렬화로 평가 시간을 1시간 이내로 줄일 수 있다 |
| 신호 개선 | 벤치마크 신호를 더 유효하게 만들었다 |
| 결과 갱신 | 최신 버전으로 새 모델 결과를 실행해 웹사이트에 갱신했다 |
| 비교 지침 | 최신 버전을 실행했다면 새 벤치마크 결과와 비교해야 한다 |

세부 보고는 xlang.ai 블로그의 report로 연결된다. README 본문은 어떤 task가 어떻게 바뀌었는지 적지 않으므로, "문제 수정"의 구체 내용은 이 저장소 README만으로 확인할 수 없다.

감사 절은 피드백과 수정에 참여한 기관 7곳을 적는다.

| 기관 | README 표기 |
|---|---|
| MoonShot AI | Kimi로도 표기 |
| Human Data | hud.so |
| OpenAI | |
| ByteDance Seed TARS | |
| Anthropic | |
| Simular | |
| HKU Data Intelligence Lab | |

학생 참여자는 수정에 11인, 재평가 실행에 4인이다. 재평가 4인 가운데 2인(Mengqi Yuan, Zilong Zhou)은 수정에도 참여했다.

## 결과와 버전 정합성

README는 성능 수치를 싣지 않는다. 논문 시점의 수치는 [[evaluations/xie-2024-osworld-benchmarking-multimodal-agents-for]]에 있고, OSWorld-Verified 이후의 새 모델 결과는 프로젝트 웹사이트에 갱신된다.

이 저장소가 결과 해석에 주는 지침은 버전 정합성이다. OSWorld-Verified가 벤치마크 신호를 바꿨으므로, 최신 버전으로 얻은 자기 결과는 이전 버전 시점의 표가 아니라 새 벤치마크 결과와 비교해야 한다. 같은 이유로 다른 자료가 인용하는 OSWorld 점수는 어느 버전에서 나온 값인지 확인할 필요가 있다.

운영 측면의 수치는 AWS 병렬 평가의 1시간 이내 실행 시간 하나다. 단일 환경 실행 시간이나 task 수는 README에 없다.

## 한계

README가 명시한 제약과 자료에 기술이 없어 확인할 수 없는 사항을 나눠 적는다.

| 구분 | 항목 | 내용 |
|---|---|---|
| 명시 | VirtualBox 기능 격차 | 병렬 실행과 Apple Silicon macOS가 잘 지원되지 않을 수 있다 |
| 명시 | macOS 호스트 | 일반적으로 KVM을 지원하지 않아 Docker provider 대신 VMware를 써야 한다 |
| 명시 | Docker 잔여 컨테이너 | 비정상 종료 시 컨테이너가 남아 시간이 지나면서 성능에 영향을 줄 수 있다 |
| 명시 | 설정 의존 점수 | Google 계정, OAuth 2.0, 프록시 설정이 없으면 일부 task가 실패해 점수가 낮아진다 |
| 명시 | 버전 간 비교 불가 | OSWorld-Verified 이후 결과는 이전 결과와 직접 비교할 수 없다 |
| 명시 | 단일 스레드 deprecated | `run.py`는 deprecated이며 병렬 스크립트가 권장 경로다 |
| 확인 불가 | 라이선스 | Apache 2.0 배지만 있고 본문 조항이 없다. 저장소의 LICENSE 파일을 직접 확인할 것 |
| 확인 불가 | 벤치마크 규모 | task 수, 도메인 목록, Windows task 활성화 절차가 README에 없다 |
| 확인 불가 | observation 설정 | `--observation_type`의 전체 값이 README에 없다 |
| 확인 불가 | Azure | 2024-06-15 갱신이 언급했으나 설치 절이 없다 |
| 확인 불가 | AWS 세부 | 인스턴스 종류, 비용, Host-Client 구조의 내부는 별도 가이드 문서에 있다 |

README 내부의 불일치는 한 건이다. `run.py`를 deprecated로 표기하면서 Local Evaluation 절은 여전히 단일 스레드 경로로 `run.py`에 agent를 import하라고 안내한다. 두 서술이 같은 문서 안에 공존하므로, 단일 스레드 경로가 실제로 동작하는지는 저장소 코드를 확인해야 한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| `desktop_env` | 환경 쪽 파이썬 패키지. PyPI 이름은 `desktop-env`이며 `DesktopEnv` 클래스에 `provider_name`과 `os_type`을 넘겨 가상 머신을 연결한다 |
| provider | 가상 머신을 실제로 띄우는 백엔드. `vmware`, `virtualbox`, `docker`, `modal`, `daytona`, `aws` 여섯이 README에 등장한다 |
| OSWorld-Verified | 2025-07-28 개정판. 커뮤니티 보고 문제 수정, AWS 병렬 평가, 벤치마크 신호 개선. 이전 버전 결과와 직접 비교하지 않는다 |
| verified leaderboard | 저자 측이 agent 코드를 직접 실행해 검증한 결과만 올리는 공개 순위표 |
| `--vm_secret_mount` | 호스트 파일을 VM 경로로 주입하는 인자. 자격 증명을 이미지에 포함시키지 않기 위한 수단 |
| `client_password` | 클라이언트 VM의 비밀번호 변수. sudo 권한이 필요한 프록시 설정과 일부 task에 쓰인다 |

## 관련 페이지

- [[evaluations/xie-2024-osworld-benchmarking-multimodal-agents-for]]: 이 저장소가 구현하는 원논문. 벤치마크 설계, task 규모, observation 설정, 2024년 baseline 결과는 그 페이지에 있다
- [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]]: OSWorld-Verified를 주 평가 벤치마크로 쓰는 논문. 이 페이지의 버전 정합성 지침이 그 결과를 읽을 때 전제가 된다
- [[agents/xlang-ai-cua-gym]]: 같은 xlang-ai 조직의 학습 환경 저장소. task 번들이 OSWorld 평가기 계약을 따르므로 이 저장소의 실행 흐름과 이어진다
- [[agents/browser-use-browsercode]]: 브라우저 agent 저장소. OSWorld를 외부 벤치마크 후보로 언급하며, 실제로 재려면 이 저장소의 provider와 실행 스크립트가 출발점이다
