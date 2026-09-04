---
title: "GR00T N1.5"
type: article
year: 2025
category: physical-ai
raw_path: raw/articles/nvidia-2025-gr00t-n1-5-an-improved-open.md
raw_filename: "nvidia-2025-gr00t-n1-5-an-improved-open.md"
source_collection: external
author: "NVIDIA GEAR Lab"
url: "https://research.nvidia.com/labs/gear/gr00t-n1_5/"
publisher: "NVIDIA Research (GEAR Lab)"
tags: [physical-ai, vla, humanoid, manipulation]
figures:
  - id: fig01
    file: assets/nvidia-2025-gr00t-n1-5-an-improved-open/fig01.svg
    raw: raw/articles/nvidia-2025-gr00t-n1-5-an-improved-open-figures/fig01.svg
    caption: "GR00T N1.5 구조도 — Eagle-2 VLM과 state·noised action을 함께 처리하는 DiT 블록"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/nvidia-2025-gr00t-n1-5-an-improved-open/fig02.png
    raw: raw/articles/nvidia-2025-gr00t-n1-5-an-improved-open-figures/fig02.png
    caption: "GEAR GR-1 grounding 테스트셋의 주석 예시 — 지시 표현마다 박스가 달려 있다"
    strategy: fetched
    curated: true
  - id: fig03
    file: assets/nvidia-2025-gr00t-n1-5-an-improved-open/fig03.png
    raw: raw/articles/nvidia-2025-gr00t-n1-5-an-improved-open-figures/fig03.png
    caption: "모델 출력 예시 — \"green vegetable held in right hand\" 한 건에 박스를 찍었다"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/nvidia-2025-gr00t-n1-5-an-improved-open/fig04.png
    raw: raw/articles/nvidia-2025-gr00t-n1-5-an-improved-open-figures/fig04.png
    caption: "일반화 평가에 쓴 미학습 물체 10종"
    strategy: fetched
    curated: true
  - id: fig05
    file: assets/nvidia-2025-gr00t-n1-5-an-improved-open/fig05.jpg
    raw: raw/articles/nvidia-2025-gr00t-n1-5-an-improved-open-figures/fig05.jpg
    caption: "Unitree G1 실험 장면 — 과일 4종 중 2택 설정"
    strategy: fetched
    curated: true
  - id: fig06
    file: assets/nvidia-2025-gr00t-n1-5-an-improved-open/fig06.jpg
    raw: raw/articles/nvidia-2025-gr00t-n1-5-an-improved-open-figures/fig06.jpg
    caption: "Unitree G1 실험 장면 — 미학습 물체 5종 중 2택 설정"
    strategy: fetched
    curated: true
  - id: fig07
    file: assets/nvidia-2025-gr00t-n1-5-an-improved-open/page-full.png
    raw: raw/articles/nvidia-2025-gr00t-n1-5-an-improved-open-figures/page-full.png
    caption: "전체 페이지 스크린샷 (상단 6000px)"
    strategy: screenshot
    curated: false
  - id: fig08
    file: assets/nvidia-2025-gr00t-n1-5-an-improved-open/crop01.png
    raw: raw/articles/nvidia-2025-gr00t-n1-5-an-improved-open-figures/crop01.png
    caption: "구조도 크롭 — 상단이 쿠키 배너에 가렸다"
    strategy: crop
    curated: false
  - id: fig09
    file: assets/nvidia-2025-gr00t-n1-5-an-improved-open/crop02.png
    raw: raw/articles/nvidia-2025-gr00t-n1-5-an-improved-open-figures/crop02.png
    caption: "grounding 주석 예시 크롭 — 배너 겹침"
    strategy: crop
    curated: false
  - id: fig10
    file: assets/nvidia-2025-gr00t-n1-5-an-improved-open/crop03.png
    raw: raw/articles/nvidia-2025-gr00t-n1-5-an-improved-open-figures/crop03.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig11
    file: assets/nvidia-2025-gr00t-n1-5-an-improved-open/crop04.png
    raw: raw/articles/nvidia-2025-gr00t-n1-5-an-improved-open-figures/crop04.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig12
    file: assets/nvidia-2025-gr00t-n1-5-an-improved-open/crop05.png
    raw: raw/articles/nvidia-2025-gr00t-n1-5-an-improved-open-figures/crop05.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig13
    file: assets/nvidia-2025-gr00t-n1-5-an-improved-open/fig13.svg
    raw: raw/articles/nvidia-2025-gr00t-n1-5-an-improved-open-figures/fig13.svg
    caption: "pre-training 데이터 구성 — Real GR-1·OpenXE·Sim GR-1이 각 27.3%, DreamGen과 AgiBot-Beta가 각 9.1%"
    strategy: fetched
    curated: true
---

## 한 줄 요약 (One-line Summary)

GR00T N1을 이어받은 N1.5의 GEAR Lab 프로젝트 페이지. N1.5가 바꾼 곳은 네 군데다. VLM을 얼리고 adapter를 손본 구조, Eagle 2.5에서 다시 튜닝한 grounding, flow matching에 얹은 FLARE 손실, DreamGen이 만든 합성 trajectory. 이 넷이 language following과 미학습 물체 일반화를 어디까지 끌어올렸는지 벤치마크 수치로 정리했다.

## 1. 자료 정보 (Document Information)

NVIDIA Research GEAR Lab의 프로젝트 페이지다. 논문 형식이 아니라 결과 요약과 영상 데모를 늘어놓은 릴리스 노트에 가깝다. 저자는 알파벳순으로 나열돼 있고 Johan Bjorck, Linxi "Jim" Fan, Dieter Fox, Jan Kautz, Yuke Zhu 등 GR00T N1 논문과 겹치는 이름이 많다. 페이지에 발행일 표기가 없어 이 wiki에서는 GR00T N1과 같은 2025년으로 잡았다.

기술 계보의 출발점은 [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]이다. 이 글은 그 논문의 구조를 전제로 깔고 무엇을 바꿨는지만 적는다. 따라서 dual-system 구성이나 데이터 피라미드 같은 기본 설계를 모르면 논문 페이지를 먼저 읽는 편이 낫다.

감사의 글에 "testing GR00T N1.6"이 적혀 있다. 이 페이지가 쓰인 시점에 이미 다음 버전이 사내에서 돌고 있었던 것으로 보인다.

본문의 수치 표는 HTML 표라서 텍스트로 추출하면 열이 붙어 나온다(예: `Qwen2.5VL3B35.585.2`). 아래 3·4절에서 원문 배치를 보고 다시 표로 옮겼다.

## 2. 주요 기여 (Key Contributions)

새로운 모델 계열을 세우는 글이 아니다. N1의 구조를 그대로 두고 네 군데를 손봐 성능을 올린 upgrade 릴리스다.

구조 쪽에서는 VLM을 pre-training과 fine-tuning 양쪽에서 얼렸고 vision encoder와 LLM을 잇는 adapter를 단순화하면서 layer normalization을 넣었다. VLM 자체도 Eagle 2.5에서 출발해 grounding과 물리 이해 쪽으로 다시 튜닝했다. 학습 목표에는 flow matching 손실 외에 FLARE를 더했다. DreamGen이 생성한 neural trajectory도 pre-training 데이터에 섞여 들어간다.

수치로 보면 실기기 GR-1에서 지시를 따르는 비율이 46.6%에서 93.3%로, Unitree G1 post-training 성공률이 44.0%에서 98.8%로 올랐다. 저자들은 모델을 곧 오픈소스로 공개하겠다고 밝혔다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 그대로 둔 뼈대

N1과 마찬가지로 NVIDIA Eagle VLM이 텍스트와 시각 observation을 인코딩한다. 여기서 나온 vision-language 임베딩을 DiT가 cross-attention으로 참조한다. DiT는 로봇의 상태와 noise가 섞인 action을 함께 처리한다. observation은 매 timestep에 policy가 받는 센서 입력이다. flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법으로, 여기서는 연속적인 제어 명령을 뽑는 데 쓰인다.

### 바꾼 두 곳

먼저 VLM을 얼렸다. N1은 학습 중에 VLM 가중치도 함께 움직였지만 N1.5는 pre-training과 fine-tuning 모두에서 고정한다. 나머지 하나는 adapter다. vision encoder와 LLM 사이를 잇는 MLP를 단순화하고 LLM에 들어가는 시각 토큰과 텍스트 토큰 임베딩 양쪽에 layer normalization을 걸었다.

저자들은 이 둘만으로 language following과 일반화가 크게 좋아졌다고 적는다. 다만 어느 쪽이 얼마나 기여했는지 가르는 ablation은 없다.

### grounding 강화

grounding은 언어 표현을 이미지 속 실제 물체나 영역에 붙이는 능력을 뜻한다. "오른손에 든 초록 채소" 같은 지시 표현을 받아 해당 박스를 찍어내는 일이다. N1.5의 VLM은 Eagle 2.5를 출발점으로 삼아 이 능력과 물리 이해를 겨냥해 다시 튜닝했다.

Eagle은 GR00T의 VLM backbone을 대 온 계열이다. 저장소 기록은 Eagle 2가 N1, Eagle 2.5가 N1.5, native resolution 변형이 N1.6을 받쳤고 N1.7에서 Cosmos-Reason2-2B로 교체되며 계보가 끊긴다고 적는다. 기술 내용은 [[llms/chen-2025-eagle-25-boosting-long-context-post-training]]에, 채택 이력과 model zoo는 [[llms/nvlabs-eagle]]에 있다.

평가는 공개 벤치마크 RefCOCOg와 내부 GEAR GR-1 grounding 데이터셋 두 곳에서 했다. 비교 대상은 비슷한 규모의 오픈소스 모델 Qwen2.5-VL-3B다.

| 모델 | 크기 | GR-1 grounding IoU ↑ | RefCOCOg-val IoU ↑ |
|---|---|---|---|
| Qwen2.5-VL | 3B | 35.5 | 85.2 |
| GR00T N1.5 VLM | 2.1B | 40.4 | 89.6 |

파라미터가 3B에서 2.1B로 줄었는데 두 지표 모두 앞선다.

### FLARE — policy 학습과 world modeling을 함께

flow matching 손실에 Future LAtent Representation Alignment를 더했다. GEAR의 별도 프로젝트에서 온 기법이다. 미래 프레임을 직접 생성해 맞히는 대신, 미래 임베딩을 타깃으로 두고 모델 표현을 거기에 맞춘다. 픽셀을 거치지 않기 때문에 action 라벨이 없는 사람 영상도 학습에 넣을 수 있다.

이 wiki에서 같은 계열의 latent 공간 world modeling을 정리한 자료로는 [[physical-ai/hou-2026-world-model-for-robot-learning]]이 있다.

### 학습 설정

H100 1,000장에서 250K step을 돌렸고 global batch는 16,384다. optimizer는 AdamW, learning rate는 cosine schedule에 warmup ratio 0.05를 썼다. FLARE 손실 계수는 pre-training과 post-training 모두 0.2다.

pre-training mixture는 다섯 갈래다. 내부에서 모은 실기기 GR-1 데이터, OpenXE, 시뮬레이션 GR-1(DexMG), DreamGen이 생성한 neural trajectory, 그리고 AgiBot-Beta. 비율은 앞의 세 갈래가 각 27.3%, 뒤의 둘이 각 9.1%다. 즉 실기기·공개 데이터셋·시뮬레이션이 8할을 이루고 합성·외부 데이터가 나머지를 채운다.

OpenXE는 페이지에 표기만 있고 풀이가 없다. 문맥상 Open X-Embodiment를 가리키는 것으로 보이지만 원문이 확인해 주지 않으므로 인용할 때는 표기 그대로 두는 편이 안전하다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 구조 변경의 검증

구조를 고르기 위해 pre-training 없이 scratch부터 학습한 policy를 언어 지시가 필요한 시뮬레이션 벤치마크 둘에서 비교했다. Language Table과 언어가 들어가는 Sim GR-1 과제 다섯 묶음이다.

| 벤치마크 | GR00T N1 (scratch) | GR00T N1.5 (scratch) |
|---|---|---|
| Language Table | 52.8% | 93.2% |
| Sim GR-1 Language | 36.4% | 54.4% |

Language Table에서 40%p 넘게 벌어진다. pre-training 없이도 차이가 나므로 구조 자체의 효과로 읽을 수 있다.

### 데이터가 적을 때의 post-training

N1의 평가 규약을 그대로 따라 데이터가 부족한 상황을 재현했다. Sim GR-1은 pre-training mixture에 같은 embodiment의 다른 과제가 들어 있어 0-shot 측정도 가능하다. embodiment는 로봇의 물리적 형상과 그에 딸린 제어 API 구성을 가리킨다.

| 시뮬레이션 벤치마크 | GR00T N1 | GR00T N1.5 |
|---|---|---|
| RoboCasa, 과제당 demo 30개 | 17.4 | 47.5 |
| Sim GR-1, 0-shot | 39.6 | 43.9 |
| Sim GR-1, 과제당 demo 30개 | 43.2 | 47.4 |

RoboCasa에서 세 배 가까이 뛴다. 데이터가 극히 적은 구간일수록 차이가 커진다는 게 저자들의 요약이다.

### 실기기 GR-1의 지시 따르기

탁자에 과일 두 개를 놓고 그중 하나를 접시에 올리라고 시킨다. 목표 과일이 왼손 쪽에 가까울지 오른손 쪽에 가까울지는 50% 확률로 정해진다.

| 설정 | GR00T N1 | GR00T N1.5 |
|---|---|---|
| language following rate | 46.6% | 93.3% |
| 전체 성공률 | 43.3% | 83.0% |

두 모델 모두 과일 하나를 접시에 올리는 동작 자체는 꾸준히 해낸다. 갈리는 지점은 지시한 쪽을 골랐는지다. N1의 46.6%는 사실상 동전 던지기에 가깝다.

### 미학습 물체로의 일반화

pre-training에서 본 적 없는 물체 10종으로 pick-and-place를 시켰다.

| 설정 | GR00T N1 | GR00T N1.5 |
|---|---|---|
| 0-shot | 0% | 15.0% |
| 사람 영상 co-training 후 FLARE post-training | — | 55.0% |

N1은 0-shot에서 아무것도 못 한다. 아래 행은 사람 시점 영상에 미학습 물체를 담아 함께 학습시킨 조건이다. N1은 이 학습 자체가 불가능해 비교값이 없다.

### DreamGen이 만든 신규 동사

teleoperation으로 모으지 않은 새 동사 12종을 DreamGen 파이프라인으로 합성해 pre-training에 넣었다. 성공률은 N1.5가 38.3%, N1이 13.1%다.

원문은 여기에 단서를 단다. teleoperation 데이터가 없다는 뜻에서만 zero-shot이지 DreamGen trajectory로는 명시적으로 학습했다. 동사와 환경 양쪽의 완전한 zero-shot 일반화는 향후 과제로 남겼다.

### Unitree G1 post-training

GR-1이 아닌 다른 embodiment에서도 확인했다. Unitree G1으로 teleoperation episode 1,000개를 모아 post-training했다. 장면 구성은 GR-1 실험과 같이 목표 물체 하나와 방해 물체 하나를 놓는 방식이다.

| 설정 | 성공률 |
|---|---|
| GR00T N1, demo 1K — 과일 4종 중 2택 | 44.0% |
| GR00T N1.5, demo 1K — 과일 4종 중 2택 | 98.8% |
| GR00T N1.5, demo 1K — 미학습 물체 5종 중 2택 | 84.2% |

과일은 GR-1 pre-training 코퍼스에 있던 물체다. 세 번째 행은 그 코퍼스에 없던 물체 5종으로 바꾼 조건이라 embodiment와 물체가 동시에 바뀌는데도 84.2%가 나온다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

프로젝트 페이지라 ablation이 없다. 구조 변경 두 가지, FLARE, DreamGen 데이터가 각각 얼마나 기여했는지 이 글만으로는 분리하지 못한다. "improved grounding, FLARE, DreamGen 덕"이라는 discussion의 귀속은 저자의 해석이지 측정 결과가 아니다. 수치에도 시행 횟수나 편차가 붙어 있지 않다. 실기기 성공률은 시행 수가 적으면 몇 회 차이로 몇 %p가 움직이는데 그 정보를 원문이 주지 않는다.

과일이나 물체를 집어 접시에 올린다. 실기기 과제는 대부분 이 pick-and-place 계열이다. language following을 재기에는 깔끔한 설계지만 과제 다양성은 좁다.

완전한 zero-shot 동사·환경 일반화는 원문이 직접 남긴 과제다. 미학습 물체 55.0%는 N1과 비교할 수 없는 조건이라 FLARE의 co-training 효과가 얼마나 큰지 절대 기준이 없다.

## 6. 관련 연구 (Related Work)

이 글이 직접 가리키는 외부 자료는 NVlabs의 Eagle VLM repo, GEAR의 FLARE·DreamGen 프로젝트 페이지, 그리고 Language Table 벤치마크다. 데이터 쪽으로는 OpenXE와 AgiBot-Beta, 평가 쪽으로는 RefCOCOg와 RoboCasa를 참조한다.

wiki 안에서는 [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]이 정본이다. 같은 계보의 한글 해설로는 [[physical-ai/jo-2026-groot-n1-vla-primer]]가 있다. 실제로 돌리는 쪽은 [[physical-ai/nvidia-isaac-gr00t]]와 [[physical-ai/nvidia-2025-accelerate-generalist-humanoid-robot-development]]가 다룬다. FLARE가 속한 latent world modeling 흐름은 [[physical-ai/hou-2026-world-model-for-robot-learning]]에, DreamGen이 바탕으로 삼은 영상 생성 기술은 [[physical-ai/nvidia-2025-cosmos-world-foundation-model-platform]]에 정리돼 있다. pre-training mixture의 OpenXE와 이어지는 공개 데이터셋은 [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x]]다. VLM backbone 쪽은 [[llms/chen-2025-eagle-25-boosting-long-context-post-training]]과 [[llms/nvlabs-eagle]] 두 페이지가 맡는다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| FLARE | Future LAtent Representation Alignment. 미래 프레임을 생성해 맞히는 대신 미래 임베딩을 타깃으로 삼아 모델 표현을 맞추는 보조 손실. action 라벨 없는 사람 영상 학습을 가능하게 한다 |
| DreamGen | 영상 생성으로 로봇 학습 데이터를 만드는 GEAR 파이프라인. 4단계로 구성되며 N1.5 pre-training의 9.1%를 채운다 |
| neural trajectory | DreamGen이 생성한 합성 trajectory. 실제 teleoperation으로 모은 것이 아니라 모델이 만들어낸 실행 기록이다 |
| DexMG | 시뮬레이션으로 만든 GR-1 데이터의 별칭. pre-training mixture에서 "Sim GR-1"로 표기된다 |
| AgiBot-Beta | pre-training mixture에 9.1% 들어간 외부 로봇 데이터셋 |
| OpenXE | mixture의 27.3%를 차지하는 데이터 출처. 원문에 풀이가 없다 |
| Eagle 2.5 | N1.5 VLM의 출발점이 된 NVIDIA의 VLM. N1은 Eagle-2를 썼다. 다만 같은 Eagle-2 이름이 N1 논문에서는 SmolLM2·SigLIP-2 소형 변형을, model zoo에서는 Qwen2.5 기반 배포판을 가리키므로 backbone을 특정할 때 계보를 확인해야 한다 |
| GEAR GR-1 grounding dataset | 지시 표현이 달린 내부 grounding 평가셋. 공개 벤치마크 RefCOCOg와 함께 쓴다 |
| language following rate | 지시한 물체를 실제로 골랐는지만 재는 지표. 과제 성공 여부와 따로 집계한다 |
| Language Table | 언어 지시를 따르는 능력을 재는 시뮬레이션 벤치마크. 구조 검증에 scratch 학습으로 썼다 |
| RoboCasa | 데이터가 적은 post-training 성능을 재는 시뮬레이션 벤치마크 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | GR00T N1.5 구조도 (원본 SVG, 배너 없음) | fetched | ★ wiki 권장 (architecture) |
| fig13 | pre-training 데이터 구성 원형 차트 | fetched | ★ wiki 권장 (data) |
| fig02 | GEAR GR-1 grounding 테스트셋 주석 예시 | fetched | ★ wiki 권장 (method) |
| fig03 | grounding 모델 출력 예시 | fetched | ★ wiki 권장 (method, fig02와 한 쌍) |
| fig04 | 미학습 물체 10종 | fetched | ★ wiki 권장 (evaluation) |
| fig05 | Unitree G1 — 과일 4종 중 2택 장면 | fetched | (선택 — 실험 설정 보조) |
| fig06 | Unitree G1 — 미학습 물체 5종 중 2택 장면 | fetched | (선택 — 실험 설정 보조) |
| fig07 | 전체 페이지 스크린샷 | screenshot | 제외 (아카이브용) |
| fig08 · fig09 · fig10 · fig11 · fig12 | 페이지 크롭 — 쿠키 배너가 겹쳤고 해상도가 원본보다 낮다 | crop | 제외 |

fig01과 fig13은 원문이 SVG로 제공한 벡터라 크롭본보다 훨씬 선명하다. 크롭 다섯 장은 원본 이미지가 이미 다 확보돼 쓸 자리가 없다.

`train_data_mix.svg`는 스크립트가 놓쳐 fig13으로 따로 받아 매니페스트에 등재했다.
