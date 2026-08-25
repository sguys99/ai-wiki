---
title: "SmolVLA: A vision-language-action model for affordable and efficient robotics"
type: paper
year: 2025
category: physical-ai
source: shukor-2025-smolvla-a-vision-language-action-model.md
raw_path: /home/sguys99/project/ai-wiki/raw/papers/shukor-2025-smolvla-a-vision-language-action-model.pdf
raw_filename: "shukor-2025-smolvla-a-vision-language-action-model.pdf"
source_collection: external
authors: "Mustafa Shukor·Dana Aubakirova·Francesco Capuano·Remi Cadene (core) 외 Pepijn Kooijmans·Steven Palma·Adil Zouitine·Michel Aractingi·Caroline Pascal·Martino Russi·Andres Marafioti·Simon Alibert·Matthieu Cord·Thomas Wolf (Hugging Face·Sorbonne University·valeo.ai·ENS Paris-Saclay, 총 14인)"
arxiv_id: "2506.01844"
tags: [physical-ai, vla, manipulation, edge-inference]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/fig01.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/fig01.png
    caption: "SmolVLA 전체 구조 — community dataset으로 pre-training해 저가 로봇에 배포한다. VLM의 뒤쪽 L−N개 층을 잘라내고(가위 아이콘) 남은 층이 언어 지시·RGB 이미지·sensorimotor state를 임베딩한다. 합쳐진 토큰이 cross-attention과 self-attention을 번갈아 쌓은 action expert로 들어가 action chunk를 낸다"
    page: 1
    bbox_norm: [0.1102, 0.5274, 0.9098, 0.8756]
    strategy: manual
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/fig02.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/fig02.png
    caption: "asynchronous inference 스택 — RobotClient가 observation을 PolicyServer로 보내고 action chunk를 돌려받는다. 큐를 다 쓰기 전에 다음 예측을 걸어 대기 구간을 없앤다. PolicyServer는 GPU가 달린 원격 서버여도 된다"
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
    caption: "실기기 과제 4종의 시작·종료 프레임. (A) SO100의 pickplace·stacking·sorting은 top과 wrist 카메라, (B) SO101의 pickplace는 top과 side 카메라를 쓴다"
    page: 9
    bbox_norm: [0.0796, 0.0628, 0.915, 0.3422]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/fig05.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/fig05.png
    caption: "sync와 async 추론 비교 — (a) 성공률은 비슷하고, (b) 완료 시간은 13.75초에서 9.70초로 줄고, (c) 60초 안에 처리한 큐브는 9개에서 19개로 는다"
    page: 12
    bbox_norm: [0.0652, 0.2424, 0.9248, 0.3696]
    strategy: manual
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab01.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab01.png
    caption: "community dataset 통계 — 481개 데이터셋·22.9K episode·10.6M 프레임"
    page: 5
    bbox_norm: [0.5783, 0.4214, 0.9162, 0.4764]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab02.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab02.png
    caption: "LIBERO·Meta-World 시뮬레이션 성공률 — SmolVLA 0.45B가 LIBERO 87.3으로 π0 3.3B(86.0)와 OpenVLA 7B(76.5)를 앞선다"
    page: 11
    bbox_norm: [0.1445, 0.0608, 0.8555, 0.4149]
    strategy: table-region
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab03.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab03.png
    caption: "SO100 실기기 벤치마크 — SmolVLA 0.45B 평균 78.3으로 π0 3.5B(61.7)와 단일 과제 학습 ACT(48.3)를 앞선다"
    page: 11
    bbox_norm: [0.0952, 0.4844, 0.5548, 0.6226]
    strategy: manual
    curated: true
  - id: tab04
    label: Table 4
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab04.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab04.png
    caption: "SO101 Pick-Place-Lego 성공률 — 학습 분포 안에서 90, 벗어난 위치에서 50. pre-training에 SO101 데이터는 들어 있지 않다"
    page: 11
    bbox_norm: [0.5722, 0.5042, 0.8974, 0.5983]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab05.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab05.png
    caption: "pre-training과 multi-task 학습의 효과 — 단일 과제 40, multi-task 51.7, community dataset pre-training을 더하면 78.3"
    page: 12
    bbox_norm: [0.2211, 0.0609, 0.7789, 0.2078]
    strategy: table-region
    curated: true
  - id: tab06
    label: Table 6
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab06.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab06.png
    caption: "cross-attention과 self-attention 비교 — 번갈아 쌓은 CA+SA가 85.5로 CA 단독(79.0)과 SA 단독(74.5)을 앞선다"
    page: 13
    bbox_norm: [0.1002, 0.0474, 0.4698, 0.1826]
    strategy: manual
    curated: true
  - id: tab07
    label: Table 7
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab07.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab07.png
    caption: "action 토큰끼리의 attention mask — causal 74.5가 bidirectional 67.5보다 낫다"
    page: 13
    bbox_norm: [0.5517, 0.0685, 0.8768, 0.1686]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab08.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab08.png
    caption: "VLM 층 잘라내기 — 500M VLM의 앞 N개 층만 쓰는 편(N=32에서 80.3)이 256M짜리 작은 VLM(75.8)이나 한 층 걸러 쓰기(75.5)보다 낫다"
    page: 13
    bbox_norm: [0.1002, 0.2084, 0.4698, 0.4076]
    strategy: manual
    curated: true
  - id: tab09
    label: Table 9
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab09.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab09.png
    caption: "action expert의 hidden size — VLM 대비 ×1.00이 82.3으로 가장 높고 ×0.75가 77.5, ×0.25는 73.8로 떨어진다"
    page: 13
    bbox_norm: [0.5514, 0.2417, 0.8771, 0.3859]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab10.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab10.png
    caption: "학습 목표 비교 — flow matching 80.25가 L1 regression 75.25를 앞선다"
    page: 14
    bbox_norm: [0.0852, 0.0474, 0.4998, 0.1876]
    strategy: manual
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab11.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab11.png
    caption: "state를 넣는 위치 — VLM 쪽(prefix) 80.3이 action expert 쪽(suffix) 73.3보다 낫다"
    page: 14
    bbox_norm: [0.5507, 0.0608, 0.8777, 0.1894]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab12.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab12.png
    caption: "action chunk 크기 n — 10에서 84.0으로 최고, n=1은 50.0, n=100은 74.5로 떨어진다"
    page: 14
    bbox_norm: [0.1252, 0.2324, 0.4698, 0.4176]
    strategy: manual
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab13.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab13.png
    caption: "observation을 새로 받기 전 실행하는 action 수 — 10스텝 82.8이 최고이고 50스텝까지 밀면 51.8로 무너진다"
    page: 14
    bbox_norm: [0.5712, 0.2551, 0.8573, 0.4]
    strategy: table-region
    curated: false
---

## 요약 (Summary)

SmolVLA는 Hugging Face가 2025년 6월에 낸 450M짜리 VLA다. π0가 세운 "VLM backbone에 flow matching action expert를 붙인다"는 구도를 그대로 쓰되 모델을 7분의 1로 줄이고, 학습 데이터를 기업 자체 수집분에서 커뮤니티가 Hugging Face에 올린 공개분으로 갈아 끼웠다. GPU 한 장에서 학습되고 CPU에서도 돌아간다.

성적은 크기에 비해 좋다. LIBERO 평균 87.3으로 3.3B π0(86.0)와 7B OpenVLA(76.5)를 앞서고, SO100 실기기 세 과제에서 78.3으로 π0의 61.7을 크게 웃돈다. 여기에 추론과 실행을 분리하는 asynchronous inference 스택이 두 번째 기여로 붙어 같은 과제를 30% 빨리 끝낸다.

![[assets/shukor-2025-smolvla-a-vision-language-action-model/fig01.png]]
*Figure 1: SmolVLA 전체 구조. community dataset으로 pre-training해 저가 로봇에 배포한다. VLM의 뒤쪽 L−N개 층을 잘라내고(가위 아이콘) 남은 층이 언어 지시·RGB 이미지·sensorimotor state를 임베딩하며, 그 토큰이 cross-attention과 self-attention을 번갈아 쌓은 action expert로 들어가 action chunk를 낸다 (Shukor 2025, p.1)*

## 주요 기여 (Key Contributions)

VLA는 규모로 밀어붙이는 쪽으로 굳어져 왔다. OpenVLA가 7B, π0가 3.3B다. 학습 데이터도 연구실이나 기업이 직접 모은 것이라 밖에서 재현하기 어렵다. 저자들은 둘 다 문제 삼는다. 큰 모델은 소비자용 GPU에 올라가지 않고, 비공개 데이터에 기댄 레시피는 커뮤니티가 이어받을 수 없다.

구조 쪽에서는 네 군데를 깎았다. SmolVLM-2를 backbone으로 쓰되 language decoder의 뒤쪽 절반을 버리고, 이미지 tiling을 꺼서 프레임당 visual 토큰을 64개로 묶고, action expert의 hidden size를 VLM의 0.75배로 줄이고, 두 전문가를 잇는 self-attention 일부를 더 가벼운 cross-attention으로 바꿨다. 결과가 450M이고 그중 약 100M이 action expert다. π0 대비 학습이 40% 빠르고 메모리는 6분의 1을 쓴다.

데이터 쪽 기여는 규모가 아니라 출처에 있다. Hugging Face의 커뮤니티 데이터셋 481개를 embodiment·episode 수·품질·프레임 커버리지로 걸러 22.9K episode, 10.6M 프레임을 모았다. OpenVLA가 쓴 약 100만 trajectory와 비교하면 한 자릿수 이상 작다. 그대로 쓸 수 있는 상태도 아니었다. 과제 설명이 `task desc` 같은 자리표시자거나 `Hold`처럼 뜻이 안 통해 Qwen2.5-VL-3B-Instruct로 다시 붙였고, 카메라 이름이 제각각이라 top·wrist·side 순으로 손수 매핑해 `OBS_IMAGE_1`부터 번호를 다시 매겼다.

세 번째는 실행 방식이다. 보통의 VLA는 action chunk를 다 쓴 뒤에야 다음 observation을 넘기고, 그 사이 로봇은 멈춰 있다. SmolVLA는 예측과 소비를 RobotClient·PolicyServer로 갈라 두고 큐가 바닥나기 전에 다음 추론을 건다. 이 스택은 SmolVLA에 묶이지 않고 chunk를 내놓는 어떤 policy에도 붙는다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### backbone을 절반만 쓴다

VLM 자리에는 SmolVLM-2가 들어간다. SigLIP이 시각 특징을 뽑고 SmolLM2가 language decoder를 맡는다. 문서 읽기와 OCR 위주로 pre-training된 모델인데, 저자들도 이게 로봇 상황에 최적인지는 확인되지 않았다고 한계 절에서 인정한다.

층을 두 방향으로 줄인다. 깊이 쪽은 마지막 층 대신 앞에서부터 N번째 층까지의 특징만 action expert에 넘기고 나머지 L−N개 층을 학습 전에 버리는 방식이다. N=L/2가 균형점이었고 실제 모델은 language decoder의 앞 16개 층만 쓴다. 토큰 수 쪽은 tiling을 끄고 전체 이미지 한 장에 pixel shuffle을 걸어 프레임당 64개로 고정한다. pixel shuffle은 인접 픽셀을 채널 축으로 접어 공간 해상도를 낮추는 연산이다. sensorimotor state는 선형 층 하나로 토큰 한 개에 눌러 담는다.

### action expert와 두 attention의 교대 배치

action expert는 flow matching으로 학습하는 Transformer다. flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다. `A_τ^t = τ·A_t + (1−τ)·ε`로 노이즈를 섞은 action을 만들고 네트워크가 `u = ε − A_t`를 맞히게 한다. τ는 π0와 같이 Beta 분포에서 뽑고 추론에서는 flow 스텝을 10회로 고정한다. action chunking은 미래 여러 스텝의 action을 한 묶음으로 예측하는 방식인데, 여기서는 n=50이다.

π0와 갈리는 지점이 VLM과 action expert를 잇는 방식이다. π0는 self-attention만, GR00T N1은 cross-attention만 쓴다. SmolVLA는 블록마다 둘 중 하나를 넣어 번갈아 쌓는다. cross-attention 블록에서 action 토큰이 VLM의 key·value를 참조하고, self-attention 블록에서 action 토큰끼리 본다. self-attention에는 causal mask를 씌워 chunk 안의 미래 action을 미리 못 보게 막는다. 실기기에서 self-attention이 chunk를 매끄럽게 만드는 효과가 특히 잘 드러났다고 적었다.

### asynchronous inference

논문의 두 번째 몸통이다. chunk 하나를 통째로 실행한 뒤 다음 observation을 보내는 방식을 저자들은 synchronous inference라 부른다. 연산은 n스텝에 한 번만 쓰지만 그 사이 로봇은 open-loop로 움직이고 추론이 도는 동안에는 아예 멈춘다.

![[assets/shukor-2025-smolvla-a-vision-language-action-model/fig02.png]]
*Figure 2: asynchronous inference 스택. RobotClient가 observation을 PolicyServer로 보내고 action chunk를 돌려받으며, 큐를 다 쓰기 전에 다음 예측을 걸어 대기 구간을 없앤다. PolicyServer는 GPU가 달린 원격 서버여도 된다 (Shukor 2025, p.6)*

async 쪽은 큐 잔량으로 돌아간다. 남은 action 수가 `|A_t|/n < g`로 떨어지면 새 observation을 찍어 PolicyServer로 보내고, 응답이 오면 겹치는 구간을 합쳐 큐를 갱신한다. 서버 왕복 시간을 `E[ℓ_S]`, 제어 주기를 Δt(30fps면 33ms)라 하면 `g ≥ E[ℓ_S]/(Δt·n)`인 한 큐가 비지 않는다.

g가 만드는 세 상태를 논문이 나눠 설명한다. g=0이면 큐를 다 비우고 요청하니 왕복 시간만큼 로봇이 논다. g=1이면 매 스텝 observation을 보내 반응은 가장 빠르지만 제어 틱마다 forward pass가 필요해 저사양 하드웨어에서 감당이 안 된다. 실제로 쓴 값은 0.7이다.

부작용이 하나 있어 필터를 더 뒀다. 큐가 계속 채워지면 거의 같은 observation을 반복해 보내게 되고 로봇이 제자리에서 버벅인다. 그래서 joint-space 거리가 임계값 아래인 observation은 중복으로 보고 버린다. 큐가 완전히 비면 유사도와 무관하게 가장 최근 것을 처리한다.

### 학습 설정

pre-training은 200,000 스텝, 전역 배치 256이다. 100스텝 warmup 뒤 cosine 스케줄로 1e-4에서 2.5e-6까지 내리고 AdamW(β1=0.9, β2=0.95)를 쓴다. 이미지는 512×512로 리사이즈하고 bfloat16과 `torch.compile()`을 건다. 학습 대상은 action expert뿐이고 VLM은 얼려 둔다. 배치를 키우려고 GPU 4장을 썼지만 한 장으로도 학습되며, 프로젝트 전체가 약 30,000 GPU hours를 썼다.

## 결과 (Results)

### 시뮬레이션과 실기기

![[assets/shukor-2025-smolvla-a-vision-language-action-model/tab02.png]]
*Table 2: LIBERO·Meta-World 성공률. SmolVLA 0.45B가 LIBERO 87.3으로 π0 3.3B(86.0)와 OpenVLA 7B(76.5)를 앞선다 (Shukor 2025, p.11)*

여기서 눈여겨볼 항목은 VLA Pt. 열이다. π0와 OpenVLA는 로봇 데이터로 pre-training한 가중치에서 출발하는데 SmolVLA는 VLM에서만 초기화한다. 같은 조건인 π0(Paligemma-3B)의 71.8을 크게 앞서고, 로봇 pre-training을 거친 π0와 대등하다. Meta-World는 격차가 더 벌어져 57.3 대 47.9다. 모델을 2.25B로 키우면 LIBERO 88.75·Meta-World 68.24까지 오르고, 0.24B로 줄여도 LIBERO 82.75를 낸다.

![[assets/shukor-2025-smolvla-a-vision-language-action-model/fig04.png]]
*Figure 4: 실기기 과제 4종의 시작·종료 프레임. (A) SO100의 pickplace·stacking·sorting은 top과 wrist 카메라, (B) SO101의 pickplace는 top과 side 카메라를 쓴다 (Shukor 2025, p.9)*

![[assets/shukor-2025-smolvla-a-vision-language-action-model/tab03.png]]
*Table 3: SO100 실기기 벤치마크. SmolVLA 0.45B 평균 78.3으로 π0 3.5B(61.7)와 과제별로 따로 학습한 ACT(48.3)를 앞선다 (Shukor 2025, p.11)*

과제별로 뜯어보면 단순하지 않다. Pick-Place는 π0가 100으로 앞서고, Stacking에서 40 대 90, Sorting에서 45 대 70으로 뒤집힌다. SO101 Pick-Place-Lego는 pre-training 데이터에 SO101이 아예 없는 상태에서 학습 분포 안 90, 벗어난 위치 50을 기록해 ACT의 70/40을 앞선다.

![[assets/shukor-2025-smolvla-a-vision-language-action-model/tab05.png]]
*Table 5: pre-training과 multi-task 학습의 효과. 단일 과제 40, multi-task 51.7, community dataset pre-training을 더하면 78.3 (Shukor 2025, p.12)*

23K episode짜리 작은 데이터인데도 pre-training이 26.6포인트를 만든다. 이 논문에서 가장 실무적인 수치다.

### async 추론의 값

![[assets/shukor-2025-smolvla-a-vision-language-action-model/fig05.png]]
*Figure 5: sync와 async 추론 비교. (a) 성공률은 비슷하고 (b) 완료 시간은 13.75초에서 9.70초로 줄며 (c) 60초 안에 처리한 큐브는 9개에서 19개로 는다 (Shukor 2025, p.12)*

성공률은 sync 78.3, async 73.3으로 async가 오히려 낮다. Sorting 한 과제가 70에서 50으로 떨어진 게 원인이고 Pick-Place는 75에서 80으로 올랐다. 저자들은 하이퍼파라미터를 Pick-Place에 맞춰 잡고 나머지 과제에 그대로 썼다고 밝힌다. 속도 차이는 뚜렷해서 완료 시간이 약 30% 줄고 고정 시간 처리량은 두 배 넘게 벌어진다.

### ablation

![[assets/shukor-2025-smolvla-a-vision-language-action-model/tab06.png]]
*Table 6: cross-attention과 self-attention 비교. 번갈아 쌓은 CA+SA가 85.5로 CA 단독(79.0)과 SA 단독(74.5)을 앞선다 (Shukor 2025, p.13)*

![[assets/shukor-2025-smolvla-a-vision-language-action-model/tab08.png]]
*Table 8: VLM 층 잘라내기. 500M VLM의 앞 N개 층만 쓰는 편(N=32에서 80.3)이 256M짜리 작은 VLM(75.8)이나 한 층 걸러 쓰기(75.5)보다 낫다 (Shukor 2025, p.13)*

층 잘라내기 결과가 특히 쓸모 있다. 같은 예산이면 작은 모델을 통째로 쓰는 것보다 큰 모델의 앞부분만 쓰는 편이 낫다는 뜻이다. 나머지 ablation은 LIBERO 기준으로 다음과 같다.

| 항목 | 결과 |
|---|---|
| action 토큰 mask | causal 74.5 > bidirectional 67.5 |
| expert hidden size | ×1.00 82.3 > ×0.50 80.3 > ×0.75 77.5 > ×0.25 73.8 |
| 학습 목표 | flow matching 80.25 > L1 regression 75.25 |
| state 위치 | VLM 쪽(prefix) 80.3 > expert 쪽(suffix) 73.3 |
| chunk 크기 n | 10에서 84.0, 50에서 80.3, 1에서 50.0, 100에서 74.5 |
| observation 갱신 주기 | 10스텝 82.8 > 1스텝 80.3 > 30스텝 70.8 > 50스텝 51.8 |

expert 폭은 단조롭지 않아서 ×0.50이 ×0.75보다 높게 나오는데도 최종 모델은 ×0.75를 택했다. chunk 크기는 10이 최고인데 실제 모델은 50을 쓴다. 두 경우 모두 논문이 이유를 따로 밝히지 않는다.

## 한계 (Limitations)

pre-training 데이터가 SO100 한 종류에서만 나와 cross-embodiment 폭이 없다. SO101 fine-tuning이 되는 것은 보였지만 여러 embodiment를 섞어야 새 플랫폼 일반화가 제대로 될 것이라고 저자들은 본다. 데이터 규모도 약 23K trajectory에 그쳐 OpenVLA의 100만 대와 비교가 안 되고, 모델도 0.5B 아래에 묶여 있다.

backbone은 문서·OCR 중심으로 학습된 VLM이라 로봇 상호작용에 맞는지 검증되지 않았다. 로봇 데이터와 멀티모달 데이터를 함께 학습하는 방향, 계층적 policy로 장기 과제를 다루는 방향, imitation learning 일변도에서 벗어나 강화학습을 붙이는 방향이 향후 과제로 남는다. imitation learning은 시연 데이터를 흉내 내 policy를 학습하는 방법이다.

논문이 짚지 않은 지점도 하나 있다. async 모드에서 Sorting 성공률이 70에서 50으로 떨어졌는데, 임계값 g와 유사도 임계값을 과제마다 다시 잡아야 하는지에 대한 분석이 없다.

## 관련 페이지 (Related Pages)

- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]] — 직계 조상. VLM backbone + flow matching action expert 구도와 Beta 분포 τ 샘플링까지 그대로 따르며, 이 논문의 주 baseline이다
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]] — π0 계열의 다음 세대. SmolVLA가 규모를 줄이는 쪽으로 갔다면 이쪽은 데이터 폭을 넓히는 쪽으로 갔다
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]] — 7B 오픈소스 VLA. 이산 action 토큰 방식이며 데이터 규모(약 100만 trajectory) 대비의 기준점이다
- [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation]] — ACT. action chunking의 출처이자 실기기 baseline(80M CVAE policy)
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — cross-attention만으로 두 전문가를 잇는 선택지. SmolVLA의 교대 배치가 비교 대상으로 삼는다
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]] — VLM을 fine-tuning해 VLA를 만드는 레시피의 출발점
- [[llms/lipman-2022-flow-matching-for-generative-modeling]] — action expert 학습 목표인 flow matching의 원 논문
- [[physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics]] — VLA full-stack 서베이. action head를 flow matching으로 두는 계열의 위치를 확인할 때
- [[physical-ai/xu-2025-an-anatomy-of-vision-language-action-models]] — VLA 해부 서베이. 실시간 실행과 효율 관련 도전 과제 절이 이 논문의 async 기여와 맞물린다
