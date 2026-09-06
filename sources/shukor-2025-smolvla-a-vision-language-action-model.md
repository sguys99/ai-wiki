---
title: "SmolVLA: A vision-language-action model for affordable and efficient robotics"
type: paper
year: 2025
category: physical-ai
raw_path: raw/papers/shukor-2025-smolvla-a-vision-language-action-model.pdf
raw_filename: "shukor-2025-smolvla-a-vision-language-action-model.pdf"
source_collection: external
authors: "Mustafa Shukor, Dana Aubakirova, Francesco Capuano, Remi Cadene (core) 외 Pepijn Kooijmans, Steven Palma, Adil Zouitine, Michel Aractingi, Caroline Pascal, Martino Russi, Andres Marafioti, Simon Alibert, Matthieu Cord, Thomas Wolf (Hugging Face, Sorbonne University, valeo.ai, ENS Paris-Saclay, 총 14인)"
arxiv_id: "2506.01844"
tags: [physical-ai, vla, manipulation, edge-inference]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/fig01.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/fig01.png
    caption: "SmolVLA 전체 구조. community dataset으로 pre-training해 저가 로봇에 배포한다. VLM의 뒤쪽 L-N개 layer를 잘라내고(가위 아이콘) 남은 layer가 지시문, RGB 이미지, sensorimotor state를 임베딩한다. 합쳐진 토큰이 cross-attention과 self-attention을 번갈아 쌓은 action expert로 들어가 action chunk를 낸다"
    page: 1
    bbox_norm: [0.1102, 0.5274, 0.9098, 0.8756]
    strategy: manual
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/fig02.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/fig02.png
    caption: "asynchronous inference 스택. RobotClient가 observation을 PolicyServer로 보내고 action chunk를 돌려받는다. 큐를 다 쓰기 전에 다음 예측을 걸어 대기 구간을 없앤다. PolicyServer는 GPU가 달린 원격 서버여도 된다"
    page: 6
    bbox_norm: [0.1194, 0.0615, 0.8806, 0.3608]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/fig03.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/fig03.png
    caption: "임계값 g에 따른 action queue 길이 변화. (A) joint-space 유사도 필터를 끈 경우, (B) 켠 경우. g=0은 큐가 비는 구간이 생기고 g=1은 매 스텝 추론한다"
    page: 7
    bbox_norm: [0.0817, 0.0529, 0.9447, 0.2611]
    strategy: caption-region
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/fig04.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/fig04.png
    caption: "실제 로봇 과제 4종의 시작 프레임과 종료 프레임. (A) SO100의 pickplace, stacking, sorting은 top과 wrist 카메라를 쓰고 (B) SO101의 pickplace는 top과 side 카메라를 쓴다"
    page: 9
    bbox_norm: [0.0796, 0.0628, 0.915, 0.3422]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/fig05.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/fig05.png
    caption: "sync 추론과 async 추론 비교. (a) 성공률은 비슷하고, (b) 완료 시간은 13.75초에서 9.70초로 줄고, (c) 60초 안에 처리한 큐브는 9개에서 19개로 늘어난다"
    page: 12
    bbox_norm: [0.0652, 0.2424, 0.9248, 0.3696]
    strategy: manual
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab01.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab01.png
    caption: "community dataset 통계. 481개 데이터셋, 2만 2,900 episode, 1,060만 프레임"
    page: 5
    bbox_norm: [0.5783, 0.4214, 0.9162, 0.4764]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab02.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab02.png
    caption: "LIBERO와 Meta-World 시뮬레이션 성공률. SmolVLA 0.45B가 LIBERO 87.3%로 π0 3.3B(86.0%)와 OpenVLA 7B(76.5%)를 앞선다"
    page: 11
    bbox_norm: [0.1445, 0.0608, 0.8555, 0.4149]
    strategy: table-region
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab03.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab03.png
    caption: "SO100 실제 로봇 벤치마크. SmolVLA 0.45B가 평균 78.3%로 π0 3.5B(61.7%)와 단일 과제 학습 ACT(48.3%)를 앞선다"
    page: 11
    bbox_norm: [0.0952, 0.4844, 0.5548, 0.6226]
    strategy: manual
    curated: true
  - id: tab04
    label: Table 4
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab04.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab04.png
    caption: "SO101 Pick-Place-Lego 성공률. 학습 분포 안에서 90%, 벗어난 위치에서 50%다. pre-training에 SO101 데이터는 들어 있지 않다"
    page: 11
    bbox_norm: [0.5722, 0.5042, 0.8974, 0.5983]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab05.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab05.png
    caption: "pre-training과 multi-task 학습의 효과. 단일 과제 40%, multi-task 51.7%, community dataset pre-training을 더하면 78.3%"
    page: 12
    bbox_norm: [0.2211, 0.0609, 0.7789, 0.2078]
    strategy: table-region
    curated: true
  - id: tab06
    label: Table 6
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab06.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab06.png
    caption: "cross-attention과 self-attention 비교. 번갈아 쌓은 CA+SA가 85.5%로 CA 단독(79.0%)과 SA 단독(74.5%)을 앞선다"
    page: 13
    bbox_norm: [0.1002, 0.0474, 0.4698, 0.1826]
    strategy: manual
    curated: true
  - id: tab07
    label: Table 7
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab07.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab07.png
    caption: "action 토큰끼리의 attention mask. causal 74.5%가 bidirectional 67.5%보다 낫다"
    page: 13
    bbox_norm: [0.5517, 0.0685, 0.8768, 0.1686]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab08.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab08.png
    caption: "layer skipping 비교. 500M VLM의 앞 N개 layer만 쓰는 방식이 256M 작은 VLM(75.8%)이나 한 layer 걸러 쓰기(75.5%)보다 낫다"
    page: 13
    bbox_norm: [0.1002, 0.2084, 0.4698, 0.4076]
    strategy: manual
    curated: true
  - id: tab09
    label: Table 9
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab09.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab09.png
    caption: "action expert의 hidden size. VLM 대비 ×1.00이 82.3%로 가장 높고 ×0.75가 77.5%, ×0.25는 73.8%로 떨어진다"
    page: 13
    bbox_norm: [0.5514, 0.2417, 0.8771, 0.3859]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab10.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab10.png
    caption: "학습 목표 비교. flow matching 80.25%가 L1 regression 75.25%를 앞선다"
    page: 14
    bbox_norm: [0.0852, 0.0474, 0.4998, 0.1876]
    strategy: manual
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab11.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab11.png
    caption: "state를 넣는 위치. VLM 쪽(prefix) 80.3%이 action expert 쪽(suffix) 73.3%보다 낫다"
    page: 14
    bbox_norm: [0.5507, 0.0608, 0.8777, 0.1894]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab12.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab12.png
    caption: "action chunk 크기 n. n=10에서 84.0%로 가장 높고 n=1은 50.0%, n=100은 74.5%로 떨어진다"
    page: 14
    bbox_norm: [0.1252, 0.2324, 0.4698, 0.4176]
    strategy: manual
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab13.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab13.png
    caption: "observation을 새로 받기 전 실행하는 action 수. 10스텝이 82.8%로 가장 높고 50스텝까지 늘리면 51.8%로 크게 하락한다"
    page: 14
    bbox_norm: [0.5712, 0.2551, 0.8573, 0.4]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

SmolVLA는 Hugging Face가 낸 450M짜리 VLA다. 커뮤니티가 올린 481개 데이터셋 2만 2,900 episode만으로 pre-training하고 GPU 한 장에서 학습해, LIBERO 87.3%와 SO100 실제 로봇 78.3%로 7배 큰 π0를 앞선다. 추론과 실행을 분리한 asynchronous inference 스택을 함께 내놓아 같은 과제를 30% 빨리 끝낸다.

## 1. 자료 정보 (Document Information)

- **제목**: SmolVLA: A vision-language-action model for affordable and efficient robotics
- **저자**: Mustafa Shukor, Dana Aubakirova, Francesco Capuano, Remi Cadene이 core team이고 Andres Marafioti, Thomas Wolf 등 14인. Hugging Face가 주축이며 Sorbonne University, valeo.ai, ENS Paris-Saclay가 함께한다. Remi Cadene은 LeRobot 라이브러리의 저자다
- **발표**: arXiv 2506.01844v1 (2025-06-02), cs.LG
- **분량**: 24페이지, Figure 5개 + Table 13개
- **한 줄 성격**: π0가 세운 "VLM backbone + flow matching action expert" 구도를 그대로 가져오되, 모델을 7분의 1로 줄이고 학습 데이터를 자체 수집분에서 커뮤니티 공개분으로 갈아 끼운 저비용 VLA. 여기에 추론 지연을 감추는 실행 스택이 별도 기여로 붙는다

## 2. 주요 기여 (Key Contributions)

VLA 연구는 규모로 밀어붙이는 쪽으로 굳어져 왔다. OpenVLA가 7B, π0가 3.3B, GR00T N1이 그보다 크다. 학습에 쓰는 데이터도 연구실이나 기업이 직접 모은 것이라 밖에서 재현하기 어렵다. 저자들은 이 둘을 동시에 문제 삼는다. 큰 모델은 소비자용 GPU에 올라가지 않고, 비공개 데이터에 기댄 레시피는 커뮤니티가 이어받을 수 없다.

SmolVLA의 첫 축은 구조를 깎는 일이다. SmolVLM-2를 backbone으로 쓰되 language decoder의 뒤쪽 절반을 아예 버리고, 이미지 tiling을 끄고 pixel shuffle로 프레임당 visual 토큰을 64개로 묶는다. action expert의 hidden size도 VLM의 0.75배로 줄인다. 그 결과가 450M 파라미터이고 그중 약 100M이 action expert다. π0와 비교하면 학습이 40% 빠르고 메모리는 6분의 1을 쓴다.

두 번째 축은 데이터다. Hugging Face에 올라온 커뮤니티 데이터셋 481개를 embodiment 종류, episode 수, 품질, 프레임 커버리지로 걸러 2만 2,900 episode, 1,060만 프레임을 모았다. OpenVLA가 쓴 약 100만 trajectory와 비교하면 한 자릿수 이상 작은 규모다. 다만 이 데이터는 그냥 쓸 수 있는 상태가 아니었다. 과제 설명이 `task desc` 같은 자리표시자이거나 `Hold`처럼 뜻이 안 통하는 경우가 많아 Qwen2.5-VL-3B-Instruct로 다시 붙였고, 카메라 이름이 제각각이라 top, wrist, side 순으로 손수 매핑해 `OBS_IMAGE_1`부터 번호를 다시 매겼다.

세 번째 축은 실행 방식이다. 보통의 VLA는 action chunk를 다 쓴 뒤에야 다음 observation을 넘긴다. 그동안 로봇은 멈춰 있다. SmolVLA는 chunk 예측과 chunk 소비를 RobotClient와 PolicyServer로 갈라 두고, 큐가 바닥나기 전에 다음 추론을 미리 건다. 이 스택은 SmolVLA에 묶이지 않고 chunk를 내놓는 어떤 policy에도 붙는다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### backbone을 절반만 쓴다

VLM 자리에는 SmolVLM-2가 들어간다. SigLIP이 시각 특징을 뽑고 SmolLM2가 language decoder를 맡는 구성이다. 문서 읽기와 OCR 위주로 pre-training된 모델인데, 저자들도 이 점이 로봇 상황에 최적인지는 확인되지 않았다고 한계 절에서 인정한다.

여기서 층을 두 방향으로 줄인다. 하나는 깊이다. 마지막 층 대신 앞에서부터 N번째 층까지의 특징만 action expert에 넘기고 나머지 L−N개 층은 학습 전에 버린다. N=L/2가 속도와 성능의 균형점이었고, 실제 모델은 language decoder의 앞 16개 층만 쓴다. 이렇게 하면 VLM과 action expert의 연산량이 함께 절반이 된다.

다른 하나는 토큰 수다. SmolVLM-2는 원래 이미지를 여러 조각으로 잘라 처리하는 tiling으로 학습됐는데, 추론 속도를 위해 tiling을 끄고 전체 이미지 한 장만 넣는다. 거기에 pixel shuffle을 걸어 프레임당 visual 토큰을 64개로 고정한다. pixel shuffle은 인접 픽셀을 채널 축으로 접어 공간 해상도를 낮추는 연산이다. sensorimotor state는 선형 층 하나로 토큰 한 개에 눌러 담아 언어 토큰과 같은 차원으로 맞춘다.

### action expert와 flow matching

action expert는 flow matching으로 학습하는 Transformer다. flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다. 목표는 다음과 같다.

```
L_τ(θ) = E[ ‖ v_θ(A_τ^t, o_t) − u(A_τ^t | A_t) ‖² ]
A_τ^t = τ·A_t + (1−τ)·ε,   ε ~ N(0, I),   u = ε − A_t
```

`o_t`는 N번째 층에서 뽑은 VLM 특징이고 `A_t`는 시점 t부터 n스텝치 action chunk다. τ는 π0와 같이 Beta 분포에서 뽑는다. 추론에서는 flow 스텝을 10회로 고정한다.

π0와 갈리는 지점은 VLM과 action expert를 잇는 방식이다. π0는 self-attention만, GR00T N1은 cross-attention만 쓴다. SmolVLA는 블록마다 둘 중 하나를 넣어 번갈아 쌓는다. cross-attention 블록에서는 action 토큰이 VLM의 key와 value를 참조하고, self-attention 블록에서는 action 토큰끼리 본다. self-attention에는 causal mask를 씌워 chunk 안의 미래 action을 미리 못 보게 막는다. 실제 로봇에서 self-attention이 chunk를 매끄럽게 만드는 효과가 특히 잘 드러났다고 적었다.

### asynchronous inference

여기가 논문의 두 번째 몸통이다. chunk 하나를 통째로 실행한 뒤 다음 observation을 보내는 방식을 저자들은 synchronous inference라 부른다. 연산은 n스텝에 한 번만 쓰지만 그 사이 로봇은 open-loop로 움직이고, 추론이 도는 동안에는 아예 멈춘다.

async 쪽은 큐 잔량을 기준으로 실행된다. 남은 action 수가 `|A_t|/n < g`로 떨어지면 새 observation을 찍어 PolicyServer로 보내고, 그 응답이 오면 겹치는 구간을 합쳐 큐를 갱신한다. 서버 왕복 시간을 `E[ℓ_S]`, 제어 주기를 Δt(30fps면 33ms)라 하면 `g ≥ E[ℓ_S]/(Δt·n)`을 만족하는 한 큐가 비지 않는다.

g 값이 만드는 세 가지 상태를 논문이 나눠 설명한다. g=0이면 큐를 다 비우고 나서 요청하니 왕복 시간만큼 로봇이 논다. g=1이면 매 스텝 observation을 보내므로 반응은 가장 빠르지만 제어 틱마다 forward pass가 한 번씩 필요해 저사양 하드웨어에서는 감당이 안 된다. 실제로 쓴 값은 0.7이다.

한 가지 부작용이 있어 필터를 하나 더 뒀다. 큐가 계속 채워지면 거의 같은 observation을 반복해서 보내게 되고 로봇이 제자리에서 버벅인다. 그래서 joint-space 거리가 임계값 ε 아래인 observation은 중복으로 보고 버린다. 다만 큐가 완전히 비면 유사도와 무관하게 가장 최근 observation을 처리한다.

### 학습 설정

pre-training은 200,000 스텝, 전역 배치 256으로 돈다. 100스텝 warmup 뒤 cosine 스케줄로 1e-4에서 2.5e-6까지 내리고 AdamW(β1=0.9, β2=0.95)를 쓴다. 이미지는 VLM 입력 크기에 맞춰 512×512로 리사이즈한다. chunk 크기 n은 50이다. bfloat16과 `torch.compile()`을 쓰고 시퀀스 길이와 배치 크기를 고정하기 위해 배치에 안 맞는 잔여 프레임은 버린다. 배치를 키우려고 GPU 4장을 썼지만 모델이 작아 한 장으로도 학습된다. 프로젝트 전체가 쓴 연산은 약 30,000 GPU hours다.

학습 대상은 action expert뿐이고 VLM은 얼려 둔다. 시뮬레이션 fine-tuning은 100,000 스텝에 배치 64, 실제 로봇은 200,000 스텝이다. 저자들은 실제로는 훨씬 적은 스텝으로도 성능이 크게 떨어지지 않는다고 덧붙인다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 시뮬레이션

LIBERO에서 SmolVLA 0.45B가 평균 87.3이다. π0 3.3B가 86.0, OpenVLA 7B가 76.5, Octo가 75.1, Diffusion Policy가 72.4다. 여기서 눈여겨볼 항목은 VLA Pt. 열이다. π0와 OpenVLA는 로봇 데이터로 pre-training한 가중치에서 출발하는데 SmolVLA는 VLM에서만 초기화한다. 그 조건에서 로봇 데이터 pre-training 없는 π0(Paligemma-3B) 71.8을 크게 앞서고 로봇 pre-training을 거친 π0와 대등하다.

Meta-World는 격차가 더 벌어진다. SmolVLA 0.45B가 57.3%, π0 3.5B가 47.9%, TinyVLA가 31.6%, Diffusion Policy가 10.5%다. 모델을 2.25B로 키우면 LIBERO 88.75%와 Meta-World 68.24%까지 오르고, 0.24B로 줄여도 LIBERO 82.75%를 낸다.

### 실제 로봇

SO100 세 과제를 multi-task로 학습한 결과가 평균 78.3이다. π0 3.5B가 61.7, 과제별로 따로 학습한 ACT가 48.3이다. 과제별로 보면 Pick-Place는 π0가 100으로 앞서지만 Stacking에서 40 대 90, Sorting에서 45 대 70으로 뒤집힌다.

SO101 Pick-Place-Lego는 일반화를 보는 실험이다. pre-training 데이터에 SO101이 아예 없는 상태에서 학습 분포 안 90, 벗어난 위치 50을 기록해 ACT의 70/40을 앞선다.

pre-training의 기여는 Table 5가 따로 보여준다. 단일 과제 학습이 40, multi-task가 51.7, 여기에 community dataset pre-training을 얹으면 78.3이 된다. 데이터가 23K episode 규모인데도 pre-training이 26.6포인트를 만든 셈이다.

### async 추론

성공률은 sync 78.3, async 73.3으로 async가 오히려 낮다. Sorting 한 과제가 70에서 50으로 떨어진 게 원인이고, Pick-Place는 75에서 80으로 올랐다. 저자들은 하이퍼파라미터를 Pick-Place에 맞춰 잡고 나머지 과제에 그대로 썼다고 밝힌다.

속도 쪽 차이는 뚜렷하다. Pick-Place 완료 시간이 평균 13.75초에서 9.70초로 줄어 약 30% 빠르다. 60초를 주고 처리한 큐브 수를 세면 9개 대 19개로 두 배 넘게 벌어진다. 물체 위치가 바뀌거나 외부에서 방해가 들어올 때 반응이 낫다는 정성 관찰도 함께 적혀 있다.

### ablation

LIBERO에서 돌린 ablation이 설계 선택을 하나씩 검증한다.

| 항목 | 결과 |
|---|---|
| VLM↔expert 연결 | CA+SA 85.5 > CA 79.0 > SA 74.5 |
| action 토큰 mask | causal 74.5 > bidirectional 67.5 |
| VLM 층 | 앞 32개 80.3 > 24개 79.5 > 16개 78.5 > 8개 75.0. 한 층 걸러 쓰기 75.5, 256M VLM 75.8 |
| expert hidden size | ×1.00 82.3 > ×0.50 80.3 > ×0.75 77.5 > ×0.25 73.8 |
| 학습 목표 | flow matching 80.25 > L1 regression 75.25 |
| state 위치 | VLM 쪽(prefix) 80.3 > expert 쪽(suffix) 73.3 |
| chunk 크기 n | 10에서 84.0, 50에서 80.3, 1에서 50.0, 100에서 74.5 |
| observation 갱신 주기 | 10스텝 82.8 > 1스텝 80.3 > 30스텝 70.8 > 50스텝 51.8 |

층 잘라내기 결과가 특히 실용적이다. 500M VLM에서 뒤쪽 층을 버리는 편이 처음부터 256M짜리 작은 VLM을 쓰는 것보다 낫고, 한 층 걸러 쓰는 방식보다도 낫다. expert 폭 실험은 단조롭지 않아서 ×0.50이 ×0.75보다 높게 나오는데, 최종 모델은 ×0.75를 택했다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자들이 직접 꼽은 것이 일곱 가지다. pre-training 데이터가 SO100 한 종류에서만 나와 cross-embodiment 폭이 없다는 점이 첫째다. SO101로 fine-tuning이 되는 것은 보였지만 여러 embodiment를 섞어야 새 플랫폼 일반화가 제대로 될 것이라고 본다.

데이터 규모도 약 23K trajectory에 그쳐 OpenVLA의 100만 대와 비교가 안 된다. 모델 크기 역시 0.5B 아래에 묶여 있어서, 접근성을 지키면서 어디까지 키울 수 있는지가 열린 문제로 남는다.

backbone 선택은 앞서 적은 대로 문서 읽기와 OCR 중심으로 학습된 VLM이라 로봇 상호작용에 맞는지 검증되지 않았다. 로봇 데이터와 멀티모달 데이터를 함께 학습하는 방향, 계층적 policy나 다단계 planning으로 long-horizon 과제를 다루는 방향도 미해결로 남긴다. 마지막으로 현재 방식이 imitation learning 일변도라 강화학습을 붙이면 특히 긴 과제에서 이득이 있을 것이라고 본다.

여기에 논문이 명시하지 않은 지점 하나를 덧붙이면, async 모드에서 Sorting 성공률이 70에서 50으로 떨어진 사실이다. 임계값 g와 유사도 임계값 ε을 과제마다 다시 잡아야 하는지에 대한 분석은 없다.

## 6. 관련 연구 (Related Work)

계보로 보면 직계는 π0다. VLM backbone에 flow matching action expert를 붙이는 구도, action chunk를 내놓는 출력 형식, τ를 Beta 분포에서 뽑는 세부까지 그대로 따른다. 갈리는 곳은 두 전문가를 잇는 attention 방식과 규모다.

action chunking 자체는 ACT에서 왔다. ACT는 CVAE 기반 80M policy로 이 논문에서 실제 로봇 baseline으로 쓰인다. 이산 action 토큰 계열로는 RT-2와 OpenVLA가 배경에 있고, 저자들은 토큰화가 연속 제어에 걸리는 제약을 π0와 DexVLA가 diffusion 계열 디코더로 풀었다고 정리한다. cross-attention만으로 두 전문가를 잇는 선택지는 GR00T N1에서 가져와 비교군으로 삼는다.

효율 쪽 선행은 TinyVLA다. 1B 미만 모델을 scratch에서 학습했는데 로봇 데이터 대규모 pre-training이 없어 일반화가 약했다고 지적한다. SmolVLA는 같은 크기대에서 pre-training을 넣어 이 지점을 메운다.

## 7. 용어집 (Glossary)

- **SmolVLA**: 이 논문이 내놓은 450M VLA. 0.24B, 0.45B, 2.25B 세 크기가 실험에 나오고 기본 모델은 0.45B다.
- **SmolVLM-2**: backbone으로 쓴 Hugging Face의 소형 VLM. SigLIP vision encoder와 SmolLM2 language decoder로 이뤄진다.
- **community dataset**: 개인 실무자들이 저가 로봇으로 직접 모아 Hugging Face에 공개한 데이터셋. 표준 프로토콜을 따르는 학술 데이터셋과 달리 embodiment, 제어 방식, 카메라 시점, 과제가 제각각이다.
- **asynchronous inference**: chunk 예측과 chunk 실행을 RobotClient와 PolicyServer로 분리해 병렬로 진행하는 실행 방식. 큐 잔량이 임계값 g 아래로 떨어지면 다음 추론을 건다.
- **pixel shuffle**: 인접 픽셀을 채널 축으로 접어 공간 해상도를 낮추는 연산. 프레임당 visual 토큰을 64개로 묶는 데 쓴다.
- **layer skipping**: language decoder의 뒤쪽 L−N개 층을 학습 전에 버리고 앞 N개 층의 특징만 쓰는 방식. 여기서는 N=L/2.
- **SO-100 / SO-101**: LeRobot 생태계의 3D 프린팅 6자유도 저가 로봇 팔. SO-101은 조립이 빠르고 모터가 달라 정밀 과제에 낫다.
- **LeRobot**: 이 연구의 학습과 배포 코드가 올라가 있는 PyTorch 기반 실세계 로보틱스 프레임워크.

도메인 공통 용어(policy, action chunking, flow matching, imitation learning 등)는 [[overviews/glossary-physical-ai]]와 [[overviews/glossary-llms]]를 따른다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | SmolVLA 전체 구조 (VLM 절단 + action expert) | manual | ★ wiki 권장 (architecture) |
| fig02 | 6 | asynchronous inference 스택 | caption-region | ★ wiki 권장 (method) |
| fig03 | 7 | 임계값 g에 따른 action queue 길이 변화 | caption-region | (확인 필요, 본문 설명으로 대체 가능) |
| fig04 | 9 | 실제 로봇 과제 4종 시작과 종료 프레임 | caption-region | ★ wiki 권장 (setup) |
| fig05 | 12 | sync 대 async 성능, 시간, throughput | manual | ★ wiki 권장 (result) |
| tab01 | 5 | community dataset 통계 481/22.9K/10.6M | table-region | (본문 수치로 충분) |
| tab02 | 11 | LIBERO와 Meta-World 성공률 | table-region | ★ wiki 권장 (result) |
| tab03 | 11 | SO100 실제 로봇 성공률 | table-region | ★ wiki 권장 (result) |
| tab04 | 11 | SO101 in/out-of-distribution | table-region | (확인 필요) |
| tab05 | 12 | pre-training과 multi-task 효과 | table-region | ★ wiki 권장 (result) |
| tab06 | 13 | CA vs SA vs CA+SA | manual | ★ wiki 권장 (ablation) |
| tab07 | 13 | bidirectional vs causal | table-region | (본문 표로 충분) |
| tab08 | 13 | VLM 층 잘라내기 | manual | ★ wiki 권장 (ablation) |
| tab09 | 13 | expert hidden size | table-region | (본문 표로 충분) |
| tab10 | 14 | flow matching vs regression | manual | (본문 표로 충분) |
| tab11 | 14 | state prefix vs suffix | table-region | (본문 표로 충분) |
| tab12 | 14 | action chunk 크기 | manual | (본문 표로 충분) |
| tab13 | 14 | observation 갱신 주기 | table-region | (본문 표로 충분) |
