---
title: "Wall-X — Building General-Purpose Robots Based on Embodied Foundation Model"
type: repo
year: 2025
category: physical-ai
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

## 한 줄 요약 (One-line Summary)

WALL 계열 embodied foundation model의 학습·추론 코드를 담은 X Square Robot의 공개 저장소다. LeRobot 데이터 준비, flow matching과 FAST 두 갈래 action 브랜치, WebSocket 서빙과 LIBERO 평가까지 배포에 필요한 것을 한 묶음으로 낸다.

## 1. 자료 정보 (Document Information)

- 저장소: https://github.com/X-Square-Robot/wall-x
- 조직: X-Square-Robot · 라이선스 Apache-2.0
- 생성 2025년 9월 4일 · 최종 push 2026년 8월 18일 · star 1,240 (수집 시점)
- 원본: `raw/repos/x-square-robot-wall-x.md` (README 전문)
- 배포 체크포인트: Hugging Face `x-square-robot` 조직의 wall-oss-0.5 · wall-oss-flow-0.1 · wall-oss-flow · wall-oss-fast

README의 News 절이 이 저장소의 이력을 그대로 보여 준다. 2025년 9월 WALL-OSS 논문, 2026년 5월 Wall-OSS-0.5와 WALL-WM, 2026년 6월 Wall-X 1.1.0 순이다. 하나의 저장소가 논문 세 편의 코드를 계속 이어받는 구조다.

## 2. 주요 기여 (Key Contributions)

논문이 아니라 실행 코드다. 그래서 논문에서 한 문단으로 지나간 배포 쪽 결정이 여기서는 명령어로 드러난다.

LeRobot을 데이터 계층으로 삼는다. 저장소는 LeRobot을 `--no-deps`로 설치하라고 지시하는데, 그래야 LeRobot의 의존성 버전이 `requirements.txt`가 고정한 버전을 덮어쓰지 않는다.

CUDA 연산자 소스를 저장소에 포함해 설치 시점에 빌드한다. `wall_x/model/core/ops/csrc/`에 소스가 들어 있고 `setup.py`가 PyTorch CUDAExtension으로 컴파일한다. Wall-OSS-0.5 기술 보고서가 말하는 융합 커널이 이 경로에 해당한다.

DMuon을 별도 패키지로 분리해 공개한다. 기본 학습 설정이 이걸 쓰므로 `pip install "dmuon @ git+https://github.com/X-Square-Robot/dmuon.git"`가 설치 절차에 포함된다.

WebSocket 서빙과 개방 루프 평가 도구를 함께 낸다. 서버를 띄우고 LeRobot ground truth와 예측을 비교해 그림으로 뽑는 스크립트까지 있어서, 실기기 없이도 policy 출력의 형태를 확인할 수 있다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 환경

Python 3.10 conda 환경에 PyTorch, flash-attn 2.8.3, CUDA 12.x, Ubuntu 22.04를 전제한다. flash-attn은 GPU compute capability를 읽어 `FLASH_ATTN_CUDA_ARCHS`로 넘긴 뒤 `--no-build-isolation`으로 빌드한다. Wall-X 자체도 `--no-build-isolation`으로 설치해야 이미 깔린 torch를 빌드가 쓸 수 있다.

### 학습

진입점은 `wall_x.trainer.fsdp_trainer.train_fsdp`이고 설정은 YAML 하나로 받는다. `workspace/example/lerobot/qwen2_5_lerobot_template.yml`을 복사해 경로만 바꾸는 방식이다. 템플릿 이름에 qwen2_5가 박혀 있어 backbone이 Qwen2.5-VL 계열임이 파일명에서 드러난다.

설정 항목으로는 GPU 구성, 모델·데이터 경로, 로봇 자유도, 학습 하이퍼파라미터가 있다고 적는다. 자유도를 설정으로 받는다는 게 cross-embodiment 학습을 전제한 구조다. embodiment는 로봇의 물리적 형상과 그에 딸린 제어 API 구성을 뜻한다.

Wall-OSS-0.5의 fine-tuning, 정규화, LIBERO 평가, 개방 루프 WebSocket 평가는 모두 `workspace/README.md`로 미룬다. 이 README에는 절차가 없다.

### 추론과 서빙

가장 작은 예제는 `scripts/fake_inference.py`다. `Qwen2_5_VLMoEForAction.from_pretrained()`로 모델을 올리고, proprioception 입력과 attention mask와 데이터셋 스펙을 준비해 bf16 `validate` 모드로 한 번 돌린 뒤 출력 shape과 수치 안정성을 확인한다. proprioception은 관절 각도 같은 로봇 자신의 상태 감각 입력이다. 클래스 이름 `VLMoEForAction`이 mixture-of-experts 구조를 그대로 담고 있다.

시뮬레이터 평가는 `bash scripts/run_libero.sh <체크포인트>`로 돈다. LIBERO 설치는 선택이다.

서빙은 `scripts/run_serving.sh`에 체크포인트 경로, 학습 설정 경로, 포트를 넘겨 띄운다. 기본값은 모델이 낸 action chunk를 가공 없이 돌려주는 동작이라 개방 루프 평가에 맞고, 로봇이 바로 먹을 수 있는 형태가 필요하면 `--serialize-actions`를 붙인다. 래퍼에 기본 체크포인트 경로가 없다는 점도 명시돼 있다.

개방 루프 비교는 `scripts/draw_openloop_plot.py`가 맡는다. 실행 중인 WebSocket 서버에 붙어 LeRobot 데이터셋의 정답과 예측을 episode 단위로 견준다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README에 성능 수치가 없다. 벤치마크는 논문 두 편이 담당하고 이 저장소는 재현 경로만 낸다. LIBERO 실행 스크립트가 들어 있으므로 시뮬레이터 성적은 직접 돌려 확인하는 구조다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

설정 문서가 `workspace/README.md`와 `scripts/README.md`로 흩어져 있어 이 README만으로는 학습을 끝까지 굴릴 수 없다. 특히 로봇 자유도 설정과 정규화 절차가 그쪽에 있다.

LeRobot을 `--no-deps`로 깔라는 지시는 두 패키지의 의존성이 실제로 충돌한다는 뜻이기도 하다. LeRobot이 올라가면 다시 맞춰야 할 수 있다.

CUDA 연산자를 설치 시점에 빌드하므로 CUDA 12.x와 맞는 컴파일러가 없으면 설치가 실패한다. `MAX_JOBS`로 병렬도를 조절하라는 안내가 붙어 있는 것도 이 빌드가 무겁기 때문이다.

## 6. 관련 연구 (Related Work)

- WALL-OSS 논문 ([[physical-ai/zhai-2025-igniting-vlms-toward-the-embodied]]) — README의 인용 블록이 가리키는 논문. 저장소 초기 코드의 근거
- Wall-OSS-0.5 ([[physical-ai/x-square-robot-2026-wall-oss-05-technical-report]]) — 1.1.0 업데이트가 지원 대상으로 삼는 모델. DMuon 학습과 서빙 런타임이 이때 들어왔다
- LeRobot ([[physical-ai/huggingface-lerobot]]) — 데이터셋 형식과 로더를 그대로 가져다 쓴다
- openpi ([[physical-ai/physical-intelligence-openpi]]) — π 계열의 대응 저장소. 같은 위치에 있는 오픈소스 VLA 스택으로 비교해 볼 만하다
- 한국어 해설 ([[physical-ai/jo-2026-wall-oss-vla-primer]]) · 프로젝트 페이지 ([[physical-ai/x2robot-2025-wall-oss-project-page]]) — 같은 모델을 다루는 다른 자료

README의 News가 언급하는 WALL-WM(arXiv 2606.01955)은 미래 영상 상상과 action 예측을 의미적 사건 경계에서 묶는 world action model인데, 이 wiki에는 아직 자료가 없다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Wall-X | 저장소 이름이자 패키지 이름. 모델 이름 WALL-OSS와 구분된다 |
| `Qwen2_5_VLMoEForAction` | 체크포인트를 올리는 모델 클래스. Qwen2.5-VL backbone에 mixture-of-experts와 action head를 얹었음을 이름에 담았다 |
| DMuon | Muon optimizer를 하이브리드 병렬 학습에서 쓰기 위한 분산 런타임. 별도 저장소로 배포된다 |
| open-loop 평가 | 로봇을 실제로 움직이지 않고 데이터셋의 정답 action과 모델 예측만 견주는 평가 방식 |
| `--serialize-actions` | 서빙 래퍼가 원시 action chunk 대신 로봇이 바로 먹는 형태로 직렬화해 돌려주게 하는 플래그 |

## 8. 그림 후보 (Figure Candidates)

README에 도식이 없다. 상단 배지 이미지와 WeChat 커뮤니티 QR 코드(`assets/QRcode_community.jpg`)뿐이라 wiki에 임베드할 그림이 없다. 저장소 규약대로 별도 `-figures/` 디렉터리도 만들지 않았다.
