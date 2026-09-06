---
title: "Wall-X: Building General-Purpose Robots Based on Embodied Foundation Model"
type: repo
year: 2025
category: physical-ai
source: x-square-robot-wall-x.md
raw_path: raw/repos/x-square-robot-wall-x.md
raw_filename: "x-square-robot-wall-x.md"
source_collection: external
org: "X-Square-Robot"
repo: "wall-x"
url: "https://github.com/X-Square-Robot/wall-x"
license: "Apache-2.0"
fetched_at: "2026-08-28T08:50:00+0900"
tags: [physical-ai, vla, robot-learning, edge-inference, manipulation]
---

## 요약

Wall-X는 X Square Robot이 공개한 WALL 계열 embodied foundation model의 학습과 추론 코드 저장소다. 라이선스는 Apache-2.0이고 수집 시점 star는 1,240개다.

저장소가 한 묶음으로 제공하는 범위는 다섯 가지다. LeRobot 기반 데이터 준비, 모델 설정 파일, flow matching과 FAST 두 가지 action 브랜치, 공개 서빙과 평가 도구, 그리고 설치 시점에 컴파일되는 CUDA 연산자 소스다. 즉 공개 체크포인트를 내려받아 fine-tuning하고 서버로 띄워 평가하기까지의 경로가 한 저장소 안에 들어 있다.

논문 저장소가 아니라 배포용 코드 저장소라는 점이 이 자료의 성격을 결정한다. 따라서 논문이 한 문단으로 지나간 배포 쪽 결정이 여기서는 설치 명령과 실행 스크립트의 형태로 드러난다. 반면 성능 수치는 하나도 실려 있지 않다.

## 배경

이 저장소는 논문 한 편에 대응하는 코드가 아니라 WALL 계열 모델 전체의 코드 창구다. README의 News 절이 그 이력을 발표 순서대로 보여 준다.

| 시점 | 발표 | 내용 |
|---|---|---|
| 2025년 9월 | WALL-OSS 논문 (arXiv 2509.11766) | 대규모 멀티모달 pre-training으로 embodiment를 이해하는 vision-language 능력, 언어와 action의 연결, 안정적인 manipulation 능력을 함께 얻은 end-to-end embodied foundation model |
| 2026년 5월 | Wall-OSS-0.5 기술 보고서 (arXiv 2605.30877v2) | 실제 로봇 manipulation에 바로 배포하고 downstream 적응까지 겨냥한 공개 모델. gradient-bridged pretraining을 내세운다 |
| 2026년 5월 | WALL-WM (arXiv 2606.01955) | 미래 영상 상상과 action 예측을 의미적 사건 경계에서 결합하는 world action model |
| 2026년 6월 | Wall-X 1.1.0 | Wall-OSS-0.5를 지원하도록 학습과 추론 스택을 갱신한 저장소 버전. 공개 서빙과 평가 런타임, DMuon 학습 지원, 설치 시점 CUDA 연산자 빌드가 이때 들어왔다 |

저장소가 스스로 밝히는 목표는 연속적이고 정밀한 물리 상호작용 데이터를 모델 안에 압축해 담는 것이다. 모델의 결정과 몸이 겪는 경험 사이에 직접적인 피드백 루프를 만들어, 세계가 어떻게 움직이는지뿐 아니라 그 안에서 어떻게 행동해야 하는지까지 아는 지능을 지향한다고 적는다.

News가 언급하는 WALL-WM은 이 wiki에 아직 자료가 없다. 나머지 두 논문은 각각 별도 페이지로 정리되어 있다.

## 공개 모델

배포 체크포인트는 Hugging Face `x-square-robot` 조직에 네 개가 올라와 있다.

| 체크포인트 | Hugging Face 경로 | 대응 자료 |
|---|---|---|
| WALL-OSS-0.5 | `x-square-robot/wall-oss-0.5` | 2026년 5월 기술 보고서가 다루는 최신 모델. 1.1.0 업데이트가 지원 대상으로 삼는다 |
| WALL-OSS-FLOW-0.1 | `x-square-robot/wall-oss-flow-0.1` | flow matching 브랜치 계열의 초기 공개본 |
| WALL-OSS-FLOW | `x-square-robot/wall-oss-flow` | flow matching 브랜치 계열 |
| WALL-OSS-FAST | `x-square-robot/wall-oss-fast` | FAST 브랜치 계열 |

README는 action 브랜치가 flow matching과 FAST 두 가지라는 사실만 밝히고 체크포인트별 대응을 따로 설명하지 않는다. 다만 체크포인트 이름이 두 브랜치 구분을 그대로 따르고 있다. flow matching은 noise에서 목표 분포로 가는 연속 변환의 속도장을 학습하는 생성 기법이다.

## 핵심 개념

policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. 이 저장소가 학습시키고 서버로 띄워 평가하는 대상이 policy다.

action chunk는 policy가 한 번에 출력하는 여러 timestep 분량의 action 묶음이다. WebSocket 서버의 기본 응답이 이 묶음을 가공 없이 그대로 돌려주는 형태다.

open-loop 실행은 한 번 계산한 action 묶음을 중간 피드백 없이 끝까지 내보내는 방식이다. 반면 closed-loop 제어는 매 timestep 새 observation을 받아 action을 다시 정한다. 저장소는 두 방식을 각각 다른 스크립트로 제공하며, open-loop 쪽은 실제 로봇 없이도 실행할 수 있다.

proprioception은 관절 각도 같은 로봇 자신의 상태 감각 입력이다. 추론 예제가 attention mask, 데이터셋 스펙과 함께 준비하는 입력이 proprioception이다.

embodiment는 로봇의 물리적 형상과 그에 딸린 제어 API 구성을 뜻한다. 학습 설정이 로봇 자유도를 설정 항목으로 받는 구조는 서로 다른 embodiment를 같은 코드로 학습시키려는 전제에서 나온다.

## 환경 구성과 설치

전제로 삼는 환경은 README 상단 배지와 설치 절차에 함께 명시되어 있다.

| 항목 | 요구 사항 |
|---|---|
| 운영체제 | Ubuntu 22.04 |
| Python | 3.10 (conda 환경 이름 `wallx`) |
| CUDA | 12.x |
| 프레임워크 | PyTorch |
| attention 커널 | flash-attn 2.8.3 |
| 데이터 계층 | LeRobot |

설치는 여섯 단계이고 순서와 옵션이 모두 의미를 갖는다.

| 순서 | 명령 | 이유 |
|---|---|---|
| 1 | `conda create --name wallx python=3.10` | 격리된 Python 3.10 환경을 만든다 |
| 2 | `pip install -r requirements.txt` | 의존성 버전을 고정한다. 병렬 빌드에 쓰는 `ninja`도 여기에 포함된다 |
| 3 | `MAX_JOBS=4 pip install flash-attn==2.8.3 --no-build-isolation` | 설치 직전에 `FLASH_ATTN_CUDA_ARCHS`를 GPU의 compute capability 값으로 설정해 넘긴다 |
| 4 | `pip install "dmuon @ git+https://github.com/X-Square-Robot/dmuon.git"` | 기본 학습 설정이 DMuon을 사용한다 |
| 5 | LeRobot을 clone한 뒤 `pip install --no-deps -e .` | `--no-deps`가 있어야 LeRobot의 의존성이 2단계에서 고정한 버전을 덮어쓰지 않는다 |
| 6 | `MAX_JOBS=8 pip install --no-build-isolation -e .` | Wall-X 본체를 설치한다. 이 단계에서 CUDA 연산자가 컴파일된다 |

`--no-build-isolation`과 `MAX_JOBS`가 반복해서 등장하는 이유는 설치가 곧 컴파일이기 때문이다. 내보낸 CUDA 연산자 소스는 `wall_x/model/core/ops/csrc/`에 들어 있고, `setup.py`가 이를 PyTorch `CUDAExtension`으로 빌드한다.

두 옵션의 역할은 서로 다르다. `--no-build-isolation`은 빌드가 임시 격리 환경 대신 현재 환경에 이미 설치된 torch를 쓰게 만든다. `MAX_JOBS`는 동시에 실행할 컴파일 작업 수를 제한하는 값으로, README는 flash-attn에 4, Wall-X 본체에 8을 예시로 제시한다.

설치 시점에 GPU가 필요하다는 점도 3단계에서 드러난다. `FLASH_ATTN_CUDA_ARCHS`를 채우려면 `torch.cuda.get_device_capability()`를 읽어야 하므로, 빌드하는 기기에 CUDA GPU가 붙어 있어야 하고 커널은 그 GPU의 compute capability에 맞춰 만들어진다.

## 학습

학습은 진입점 하나와 설정 파일 하나로 정리된다. pre-training을 마친 체크포인트를 내려받고 `workspace/example/lerobot/qwen2_5_lerobot_template.yml`을 복사해 예시 경로를 실제 경로로 바꾼 뒤 다음을 실행한다.

```bash
python -m wall_x.trainer.fsdp_trainer.train_fsdp --config <path/to/config.yml>
```

모듈 경로와 템플릿 이름이 구현 선택을 그대로 노출한다. `fsdp_trainer`는 학습이 FSDP 방식의 분산 학습을 전제한다는 뜻이고, 템플릿 이름의 `qwen2_5`는 backbone이 Qwen2.5 계열임을 나타낸다.

설정 파일이 담는 항목은 다섯 가지다.

- 학습 스크립트 설정
- GPU 구성
- 모델과 데이터 경로
- 로봇 자유도(DOF) 설정
- 학습 하이퍼파라미터

값의 의미는 최상위 README가 아니라 `workspace/README.md`가 설명한다. Wall-OSS-0.5의 fine-tuning, 정규화, LIBERO 평가, open-loop WebSocket 평가 절차도 모두 그 문서로 넘긴다. 최상위 README는 명령의 형태만 제시하는 역할에 그친다.

## 추론과 평가

저장소가 제공하는 실행 도구는 네 개이고, 각각 확인하려는 대상이 다르다.

| 스크립트 | 역할 | 주요 인자 |
|---|---|---|
| `scripts/fake_inference.py` | 최소 예제. 체크포인트를 적재해 한 번 추론하고 출력 형태와 수치 안정성을 확인한다 | `--checkpoint-path` |
| `scripts/run_libero.sh` | LIBERO 시뮬레이터에서 closed-loop 평가를 수행한다 | 체크포인트 경로 |
| `scripts/run_serving.sh` | WebSocket 서버를 띄운다 | `--checkpoint-path`, `--train-config-path`, `--port` |
| `scripts/draw_openloop_plot.py` | 실행 중인 서버의 예측과 LeRobot 정답을 비교해 그림으로 그린다 | `--uri`, `--dataset-root`, `--train-config`, `--episode-indices` |

공개 보조 스크립트는 모두 `scripts/` 아래에 있고, README의 예시는 `python scripts/fake_inference.py`처럼 저장소 최상위에서 실행하는 형태를 쓴다.

### 최소 추론 예제

`scripts/fake_inference.py`가 보여 주는 절차는 네 단계다.

- `Qwen2_5_VLMoEForAction.from_pretrained()`로 모델을 적재한다. 클래스 이름에 mixture-of-experts 구조와 action head가 함께 드러나 있다. mixture-of-experts는 입력마다 일부 전문 모듈만 활성화하는 구조다.
- proprioception 입력, attention mask, 데이터셋 스펙을 준비한다.
- bfloat16 정밀도의 `validate` 모드로 추론을 한 번 실행한다.
- 출력 shape과 수치 안정성을 확인한다.

이름 그대로 합성 입력을 쓰는 예제이므로 실제 로봇이나 수집한 데이터셋이 없어도 실행된다. 따라서 설치와 체크포인트 적재가 정상인지 확인하는 첫 관문 역할을 한다.

### 시뮬레이터 평가

closed-loop 평가는 `bash scripts/run_libero.sh <체크포인트 경로>` 한 줄로 실행한다. LIBERO 시뮬레이터 설치는 선택 사항이며 설치 방법은 `scripts/README.md`에 있다.

### WebSocket 서빙

서버는 체크포인트 경로, 학습 설정 경로, 포트를 인자로 받아 띄운다.

```bash
bash scripts/run_serving.sh \
  --checkpoint-path <path/to/checkpoint> \
  --train-config-path <path/to/config.yml> \
  --port 32195
```

래퍼에는 기본 체크포인트 경로가 없으므로 `--checkpoint-path`를 항상 넘겨야 한다. 기본값은 모델이 출력한 action chunk를 가공 없이 그대로 반환하는 것이고, 이 형태가 open-loop 평가에 맞는다. 로봇이 바로 소비하는 직렬화 형식을 기대하는 클라이언트라면 `--serialize-actions`를 붙인다.

### open-loop 비교

서버가 떠 있는 상태에서 예측과 정답을 겹쳐 그리는 스크립트가 따로 있다.

```bash
python scripts/draw_openloop_plot.py \
  --uri ws://127.0.0.1:32195 \
  --dataset-root <path/to/lerobot_dataset> \
  --train-config <path/to/config.yml> \
  --episode-indices 0,1,2
```

`--port 32195`로 띄운 서버에 `--uri ws://127.0.0.1:32195`로 접속하는 구성이므로 두 값은 서로 맞춰야 한다. `--episode-indices 0,1,2`는 LeRobot 데이터셋의 0번, 1번, 2번 episode를 비교 대상으로 고른다는 뜻이다. 즉 실제 로봇을 움직이지 않고도 policy 출력이 정답 trajectory와 얼마나 닮았는지 눈으로 확인할 수 있다.

## 라이선스와 인용

라이선스는 Apache-2.0이다. 저장소가 인용을 요청하는 문헌은 WALL-OSS 논문(Zhai 2025, arXiv 2509.11766) 한 편이며 BibTeX 항목이 README 하단에 실려 있다. 커뮤니티 창구는 README 마지막의 WeChat QR 코드 이미지다.

## 한계

README에 성능 수치가 하나도 없다. 벤치마크 결과는 WALL-OSS 논문과 Wall-OSS-0.5 기술 보고서가 담당하고 이 저장소는 재현 경로만 제공한다. LIBERO 실행 스크립트가 들어 있으므로 시뮬레이터 성적은 직접 실행해 확인하는 구조다.

설정 문서가 세 곳으로 흩어져 있다. 최상위 README는 명령의 형태만 보여 주고, 로봇 자유도 설정과 정규화 절차는 `workspace/README.md`에, LIBERO 설치는 `scripts/README.md`에 있다. 따라서 최상위 README만으로는 학습을 끝까지 수행할 수 없다.

LeRobot을 `--no-deps`로 설치하라는 지시는 두 패키지의 의존성이 실제로 충돌한다는 뜻이기도 하다. 그러므로 LeRobot 쪽을 갱신하면 버전 조합을 다시 맞춰야 할 수 있다.

설치가 곧 CUDA 컴파일이라 CUDA 12.x에 맞는 컴파일러가 없으면 설치 단계에서 실패한다. 빌드가 가벼운 작업이 아니라는 점은 `MAX_JOBS`로 병렬도를 조절하라는 안내가 붙어 있는 데서 드러난다.

체크포인트 선택 기준도 README에 없다. 네 개 중 어느 것을 받아야 하는지 판단하려면 논문과 기술 보고서 쪽 자료를 함께 봐야 한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Wall-X | 저장소 이름이자 Python 패키지 이름. 모델 이름 WALL-OSS와 구분된다 |
| `Qwen2_5_VLMoEForAction` | 체크포인트를 적재하는 모델 클래스. Qwen2.5-VL backbone에 mixture-of-experts와 action head를 결합했음을 이름에 담았다 |
| DMuon | 기본 학습 설정이 요구하는 별도 패키지. Muon optimizer를 분산 학습에서 쓰기 위한 런타임으로 별도 저장소에서 설치한다 |
| open-loop 평가 | 로봇을 실제로 움직이지 않고 데이터셋의 정답 action과 모델 예측만 비교하는 평가 방식 |
| `--serialize-actions` | 서빙 래퍼가 원시 action chunk 대신 로봇이 바로 소비하는 형태로 직렬화해 반환하게 만드는 플래그 |
| `--no-build-isolation` | 빌드가 임시 격리 환경 대신 현재 환경의 torch를 쓰게 하는 pip 옵션. flash-attn과 Wall-X 설치 양쪽에 필요하다 |

## 관련 페이지

- [[physical-ai/zhai-2025-igniting-vlms-toward-the-embodied]]: README의 인용 블록이 가리키는 WALL-OSS 원 논문. 저장소 초기 코드의 근거다.
- [[physical-ai/x-square-robot-2026-wall-oss-05-technical-report]]: 1.1.0 업데이트가 지원 대상으로 삼는 Wall-OSS-0.5의 기술 보고서. 모델 아키텍처 세부와 벤치마크 수치는 그 페이지가 다룬다.
- [[physical-ai/x2robot-2025-wall-oss-project-page]]: 같은 모델의 공식 프로젝트 페이지.
- [[physical-ai/jo-2026-wall-oss-vla-primer]]: WALL-OSS를 다룬 한국어 해설.
- [[physical-ai/huggingface-lerobot]]: 이 저장소가 데이터셋 형식과 로더를 그대로 가져다 쓰는 데이터 계층.
- [[physical-ai/physical-intelligence-openpi]]: π 계열의 대응 저장소. 같은 위치에 있는 오픈소스 VLA 스택으로 비교할 만하다.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
