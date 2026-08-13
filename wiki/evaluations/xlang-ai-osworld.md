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
tags: [computer-use-agents, gui-agents, benchmark, desktop-env, osworld-verified, virtual-machine, execution-based-evaluation]
---

## 요약 (Summary)

OSWorld 논문의 공식 구현체다. `desktop_env` 파이썬 패키지 하나로 VMware·VirtualBox·Docker·AWS·Modal·Daytona 중 아무 백엔드에서나 가상 머신을 띄우고 369개 task를 채점까지 돌릴 수 있다. 2025-07-28 공개된 OSWorld-Verified는 채점 결함을 고치고 병렬화로 평가 시간을 1시간 안으로 줄였다.

## 저장소 정보 (Repository Information)

- **저장소**: <https://github.com/xlang-ai/OSWorld> (Apache-2.0)
- **PyPI**: `desktop-env` — 벤치마크 task 없이 환경만 설치하려면 `pip install desktop-env`
- **문서**: <https://timothyxxx.github.io/OSWorld/> · 프로젝트 <https://os-world.github.io/>
- **데이터 뷰어**: <https://os-world.github.io/explorer.html> · task 정의는 repo의 `evaluation_examples/`
- **논문**: [[evaluations/xie-2024-osworld-benchmarking-multimodal-agents-for]] (arXiv 2404.07972)
- **파이썬**: 3.10 이상

## 무엇을 제공하나 (What It Provides)

논문이 실험한 환경을 다른 사람이 그대로 재현하려면 가상 머신 이미지, 초기 상태 설정, 채점 스크립트, baseline agent 구현까지 한 벌로 있어야 한다. 이 repo가 그 한 벌이다.

환경만 따로 설치할 수 있게 `desktop_env`가 PyPI에 올라가 있다. 벤치마크 task와 환경 코드가 분리돼 있어서 자기 task를 정의해 쓰는 것도 된다. 가상화 계층도 처음에는 VMware에 묶여 있었다. 2024-06-15 리팩터링이 이 계층을 떼어낸 뒤로는 `provider_name` 인자만 바꿔 VMware·VirtualBox·Docker(KVM)·AWS·Modal·Daytona로 옮겨간다.

2025-07-28에는 OSWorld-Verified가 공개됐다. 커뮤니티가 보고한 채점 문제를 고치고 AWS 지원을 강화한 개정판이다. 병렬화로 평가 시간을 1시간 안으로 줄였다. README에 따르면 신호가 더 유효해졌다. 최신 버전을 돌린다면 예전 숫자가 아니라 새 벤치마크 결과와 비교해야 한다.

- **논문 baseline 실행 스크립트.** `run.py`(단일 스레드, deprecated)와 `scripts/python/run_multienv.py`(병렬)로 논문의 네 가지 입력 설정을 재현한다. 결과는 screenshot·action·영상 녹화까지 `result_dir`에 쌓인다.
- **`show_result.py`.** 도메인별 성공률, Office·Daily·Professional 카테고리 통계, 전체 성공률을 뽑는다. `--detailed`를 붙이면 도메인마다 `score/total` 형식으로 보여준다.
- **`manual_examine.py`.** 채점 스크립트가 의도대로 동작하는지 특정 task를 사람이 직접 확인할 때 쓴다.
- **VM 시크릿 주입.** `--vm_secret_mount`로 호스트의 자격 증명을 시작 시점에 넣는다. VM 이미지에 굽지 말라는 게 권고 사항이다.

## 사용법 (Usage)

### provider 선택

베어메탈이나 노트북이면 VMware Workstation Pro를 쓰고 `vmrun` 명령을 설정한다. Apple Silicon은 VMware Fusion이다. 설치가 끝나면 setup 스크립트가 필요한 VM 이미지를 알아서 내려받는다. VirtualBox도 되지만 병렬 실행과 Apple Silicon의 macOS는 잘 지원되지 않는다.

가상화된 서버 위라면 Docker 쪽이다. KVM 지원을 확인하려면 리눅스에서 `egrep -c '(vmx|svm)' /proc/cpuinfo`를 돌려 0보다 큰지 본다. macOS 호스트는 보통 KVM을 지원하지 않으므로 VMware를 권한다. 실험이 비정상 종료되면 컨테이너가 남아 성능이 떨어지니 `docker stop $(docker ps -q) && docker rm $(docker ps -a -q)`로 치우라는 주의가 붙어 있다.

Modal은 VM Sandbox로 돌린다. Daytona는 샌드박스 자체를 데스크톱으로 쓰기 때문에 호스트 KVM이나 Docker qcow2 흐름이 필요 없다. AWS는 Host-Client 구조로 대규모 병렬 평가를 하고 학습 인프라로도 쓸 수 있다.

### 최소 실행

```bash
python quickstart.py
python quickstart.py --provider_name vmware --path_to_vm "path/to/your/vm.vmx"
```

환경을 만들고 setup을 끝낸 뒤 action을 실행하는 로그가 지나간다. 마지막에 화면 우클릭이 성공하면 준비가 끝났다.

### baseline 재현

GPT-4o 순수 screenshot 설정 예시다. `OPENAI_API_KEY`를 넣는다. OpenAI 호환 엔드포인트를 쓰려면 `OPENAI_BASE_URL`도 넣는다.

```bash
python scripts/python/run_multienv.py \
    --provider_name docker \
    --headless \
    --observation_type screenshot \
    --model gpt-4o \
    --sleep_after_execution 3 \
    --max_steps 15 \
    --num_envs 10 \
    --client_password password
```

`--max_steps 15`와 `--observation_type`이 논문 설정과 직결된다. `--observation_type`은 a11y tree, screenshot, 두 가지 조합, SoM 중 하나를 고르는 인자다.

### 설정을 빠뜨리면 점수가 깎인다

일부 task는 Google 계정과 OAuth 2.0 설정을 요구하고 일부는 프록시 설정이 있어야 제대로 돈다. README 맨 앞 경고 블록에 적힌 두 가지다. 프록시 설정은 웹사이트가 접속 위치를 얼마나 방어적으로 보는지에 달려 있다. 이 설정이 없으면 해당 task가 정상 실행되지 못하고 그대로 낮은 점수로 잡힌다. 벤치마크 숫자를 비교할 때 환경 설정 차이가 섞여 들어가는 경로다.

## 성능·운영 (Performance and Operations)

repo 자체는 성능 수치를 주장하지 않는다. 논문의 숫자는 [[evaluations/xie-2024-osworld-benchmarking-multimodal-agents-for]]에 있고 최신 모델 결과는 프로젝트 웹사이트의 리더보드에서 갱신된다. README가 강조하는 건 버전 정합성이다 — OSWorld-Verified 이후 채점이 달라졌으므로 예전 논문 표와 새 실행 결과를 나란히 놓으면 안 된다.

369개 task를 한 VM에서 순차로 돌리면 하루 단위가 걸리는 작업이다. AWS 병렬 평가로는 전체 평가를 1시간 안에 끝낼 수 있다. 성능과 직결되는 운영 수치는 이 병렬화 쪽이다.

## 한계 (Limitations)

VirtualBox는 병렬 실행과 Apple Silicon macOS 지원이 약하고 macOS 호스트는 KVM을 못 쓴다. Docker provider는 비정상 종료 시 컨테이너가 남아 시간이 갈수록 성능을 떨어뜨린다. provider마다 이런 기능 격차가 있다.

- **Windows task 활성화.** 저작권 때문에 43개 Windows task는 사용자가 직접 활성화해야 쓸 수 있다.
- **점수에 섞이는 환경 설정.** Google 계정과 프록시 설정 여부가 결과를 바꾼다. agent 능력과는 무관한 변수다.
- **초기 상태 파일 의존.** 초기 상태 설정에 쓰이는 파일을 모아 둔 배포본이 따로 있다. 별도 Google Drive 링크로 받는다(2025-05-01). 원 출처에서 파일을 못 받으면 재현이 막힌다.

## 이 wiki에서의 위치 (Context)

README의 "You might also be interested" 절에 같은 xlang-ai 계열 작업이 모여 있다. 이 wiki 안에서 직접 이어지는 건 [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]]다. CUA-Gym은 OSWorld를 평가 대상으로 삼아 OSWorld-Verified 72.6%를 보고한다. 벤치마크가 나온 뒤 2년 사이 12.24%에서 그 수준까지 올라왔다. 그 2년의 변화를 이 두 자료가 나눠 담고 있다.

## 용어 (Terms)

- **`desktop_env`**: 환경 쪽 파이썬 패키지 이름. `DesktopEnv` 클래스에 `provider_name`·`os_type`을 넘겨 가상 머신을 붙인다.
- **provider**: 가상 머신을 실제로 띄우는 백엔드 추상화. `vmware`·`virtualbox`·`docker`·`aws`·`modal`·`daytona`.
- **OSWorld-Verified**: 2025-07-28 개정판. 채점 결함 수정 + AWS 병렬화. 이전 버전 점수와 직접 비교하면 안 된다.
- **`--observation_type`**: 논문의 입력 설정을 고르는 인자. `screenshot`·`a11y_tree`·`screenshot_a11y_tree`·`som`.
- **`--vm_secret_mount`**: 호스트 파일을 VM 경로로 주입하는 인자. 자격 증명을 이미지에 굽지 않으려고 쓴다.

## 관련 페이지 (Related Pages)

- [[evaluations/xie-2024-osworld-benchmarking-multimodal-agents-for]] — 이 repo가 구현하는 원논문. 벤치마크 설계와 2024년 baseline 성적
- [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]] — 같은 xlang-ai 계열. OSWorld-Verified를 평가 대상으로 삼는다
