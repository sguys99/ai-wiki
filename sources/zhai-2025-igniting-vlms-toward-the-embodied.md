---
title: "Igniting VLMs toward the Embodied Space"
type: paper
year: 2025
category: physical-ai
raw_path: raw/papers/zhai-2025-igniting-vlms-toward-the-embodied.pdf
raw_filename: "zhai-2025-igniting-vlms-toward-the-embodied.pdf"
source_collection: external
authors: "Andy Zhai·Brae Liu·Bruno Fang·Chalse Cai·Ellie Ma·Ethan Yin·Hao Wang·Hugo Zhou·James Wang·Lights Shi·Lucy Liang 외 (X Square Robot, 총 20인)"
arxiv_id: "2509.11766"
url: "https://arxiv.org/abs/2509.11766"
tags: [physical-ai, vla, manipulation, robot-learning, mobile-robot]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/zhai-2025-igniting-vlms-toward-the-embodied/fig01.png
    raw: raw/papers/zhai-2025-igniting-vlms-toward-the-embodied-figures/fig01.png
    caption: "VLM과 WALL-OSS를 대비한 두 장면. 겹친 카드 더미를 세어 가리키라는 요구에 VLM은 불가능하다고 답하고 WALL-OSS는 좌표 리스트와 53이라는 수를 낸다. 오른쪽 막대는 LLM의 언어 prior와 VLM의 vision-language prior가 embodiment 영역을 얼마나 덮지 못하는지를 표시한다"
    page: 2
    bbox_norm: [0.106, 0.072, 0.8939, 0.2904]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/zhai-2025-igniting-vlms-toward-the-embodied/fig02.png
    raw: raw/papers/zhai-2025-igniting-vlms-toward-the-embodied-figures/fig02.png
    caption: "VLM을 action으로 옮기는 세 가지 설계. (a) 통합형은 SA와 FFN을 통째로 공유하고, (b) 분리형은 action 쪽 SA와 FFN을 따로 두며, (c) WALL-OSS는 SA만 공유하고 FFN만 VL용과 action용으로 나눈다"
    page: 4
    bbox_norm: [0.1828, 0.073, 0.817, 0.2188]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/zhai-2025-igniting-vlms-toward-the-embodied/fig03.png
    raw: raw/papers/zhai-2025-igniting-vlms-toward-the-embodied-figures/fig03.png
    caption: "WALL-OSS 구조. 하나의 Self-Attention 위에 Vision-Language FFN과 Action FFN을 두고, LM Head로 CoT 문장과 subtask와 이산 action 토큰을, Flow Head로 연속 action 20스텝을 낸다. FAST 토큰은 Inspiration 단계에서만, 노이즈 입력은 Integration 단계에서만 쓰인다"
    page: 4
    bbox_norm: [0.1438, 0.5633, 0.8562, 0.8491]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/zhai-2025-igniting-vlms-toward-the-embodied/fig04.png
    raw: raw/papers/zhai-2025-igniting-vlms-toward-the-embodied-figures/fig04.png
    caption: "학습과 추론 파이프라인. 위는 base VLM pre-training에서 Inspiration, Integration Phase 1, Phase 2로 이어지는 학습 순서, 아래는 추론 시 instruction에서 CoT와 subtask를 거치거나 건너뛰고 곧장 action으로 갈 수 있음을 화살표로 표시한다"
    page: 5
    bbox_norm: [0.1828, 0.1705, 0.8172, 0.3468]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/zhai-2025-igniting-vlms-toward-the-embodied/fig05.png
    raw: raw/papers/zhai-2025-igniting-vlms-toward-the-embodied-figures/fig05.png
    caption: "학습 corpus 구성. 자체 수집 action 57.5%, open-source action 33.1%, 멀티모달 VQA 9.4%. 가운데는 각 원천의 예시 프레임, 오른쪽 위는 바퀴형 양팔 로봇과 humanoid 하드웨어"
    page: 7
    bbox_norm: [0.111, 0.072, 0.9608, 0.3808]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/zhai-2025-igniting-vlms-toward-the-embodied/fig06.png
    raw: raw/papers/zhai-2025-igniting-vlms-toward-the-embodied-figures/fig06.png
    caption: "fine-tuning 평가 과제 일람. 위쪽은 단일 지시 과제 네 개, 아래쪽은 set-table, tidy-bedroom, block-spell이다. 각 스텝 프레임에 모델이 낸 Instruction, Subtask, Thought 문장이 붙어 Uni-CoT 출력이 실제로 어떤 모습인지 보여 준다"
    page: 9
    bbox_norm: [0.106, 0.1288, 0.8939, 0.8081]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/zhai-2025-igniting-vlms-toward-the-embodied/fig07.png
    raw: raw/papers/zhai-2025-igniting-vlms-toward-the-embodied-figures/fig07.png
    caption: "전 과제 task progress 비교. 왼쪽 in-distribution 6과제 평균은 wall-oss 77%, π0 65%, dp 38%이고 오른쪽 out-of-distribution 4과제 평균은 75%, 62%, 15%다"
    page: 11
    bbox_norm: [0.111, 0.6711, 0.8836, 0.8772]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/zhai-2025-igniting-vlms-toward-the-embodied/tab01.png
    raw: raw/papers/zhai-2025-igniting-vlms-toward-the-embodied-figures/tab01.png
    caption: "corpus에 쓴 open-source 데이터셋 목록. action 계열 24종과 image-text 계열 12종"
    page: 8
    bbox_norm: [0.1103, 0.0703, 0.8897, 0.1874]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/zhai-2025-igniting-vlms-toward-the-embodied/tab02.png
    raw: raw/papers/zhai-2025-igniting-vlms-toward-the-embodied-figures/tab02.png
    caption: "Embodied VQA 벤치마크. Object Grounding 46.1%에서 91.6%, Scene Captioning 57.7%에서 87.6%, Action Planning 59.8%에서 69.0%로 오른다"
    page: 11
    bbox_norm: [0.2552, 0.073, 0.7448, 0.1309]
    strategy: table-region
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/zhai-2025-igniting-vlms-toward-the-embodied/tab03.png
    raw: raw/papers/zhai-2025-igniting-vlms-toward-the-embodied-figures/tab03.png
    caption: "block-spell 과제의 지시 이행 정확도. 글자 블록 87%/26%/9%, 숫자 블록 95%/80%/35% 순으로 co-training 설정과 action only 설정과 π0가 나뉜다"
    page: 14
    bbox_norm: [0.3161, 0.0735, 0.6839, 0.157]
    strategy: table-region
    curated: true
---

## 한 줄 요약 (One-line Summary)

VLM을 로봇으로 옮길 때 생기는 세 가지 어긋남을 Self-Attention은 공유하고 FFN만 가르는 구조와 두 단계 학습으로 메운 4B급 embodied foundation model이다. X Square Robot이 가중치와 학습 코드를 함께 공개했다.

## 1. 자료 정보 (Document Information)

- 제목: Igniting VLMs toward the Embodied Space
- 저자: Andy Zhai 외 20인 (X Square Robot). Project Lead는 Lucy Liang, 교신은 Hao Wang
- 발표: arXiv 2509.11766, 2025년 9월 8일
- 코드: https://github.com/X-Square-Robot/wall-x → [[physical-ai/x-square-robot-wall-x]]
- 프로젝트 페이지: https://x2robot.com/en/research/68bc2cde8497d7f238dde690 → [[physical-ai/x2robot-2025-wall-oss-project-page]]
- 원본: `raw/papers/zhai-2025-igniting-vlms-toward-the-embodied.pdf` (18쪽)

모델 이름이 자료마다 조금씩 다르다. 논문 본문과 Figure 3은 WALL-OSS를 쓰고, Figure 2의 설계 비교에서만 WALL-A로 적었다. 공개 저장소 이름은 wall-x이고 배포된 체크포인트는 wall-oss-flow와 wall-oss-fast다. 이 페이지는 논문 본문 표기를 따라 WALL-OSS로 적는다.

## 2. 주요 기여 (Key Contributions)

논문이 문제를 세 개의 gap으로 갈라 놓은 게 출발점이다. 모달리티와 데이터 규모의 gap은 웹에 널린 텍스트와 이미지와 달리 action이 3D 공간과 시간 위에서 연속이고 정렬된 데이터가 희소하다는 데서 온다. pre-training 분포의 gap은 embodied 장면이 1인칭 시점, 어안 왜곡, 자기 가림으로 가득해 인터넷 이미지와 통계가 다르다는 데서 온다. 학습 목표의 gap은 VLM이 이산 시퀀스 위의 next-token prediction으로 학습되는 반면 action trajectory는 diffusion이나 flow matching 같은 조건부 생성 목표에 더 어울린다는 데서 온다. flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다.

여기에 맞춰 세 가지를 내놓는다. mixture-of-experts로 FFN만 가르되 Self-Attention은 공유하는 tightly coupled 구조, 이산 action prior를 먼저 심고 연속 제어로 넘어가는 두 단계 커리큘럼, 그리고 지시부터 연속 action까지를 하나의 미분 가능한 사슬로 묶는 Uni-CoT다.

pre-training된 VLM 능력을 지키려고 가중치를 얼리는 knowledge insulation 계열과는 반대 방향을 택했다. 논문은 느슨하게 결합된 설계가 semantics와 제어의 결합을 약하게 만들고, 애초에 VLM 자체가 embodied 영역에서 부실하기 때문에 VL prior 밖의 action을 시킬 때 성능이 무너진다고 본다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 세 가지 설계 중 어느 쪽인가

Figure 2가 VLA 구조를 셋으로 갈라 놓는다. 통합형은 원래 VLM을 그대로 늘려 action까지 next-token prediction으로 처리한다. RT-2와 OpenVLA가 여기 속하는데, action 감독이 VLM 가중치 분포를 크게 흔들어 지시 이행과 일반화가 크게 하락하는 weight drift가 생긴다. 분리형은 action 예측용 브랜치를 따로 두고 VLM에서 정보만 끌어다 쓴다. π0가 그렇다. 분리형은 vision과 language가 action 생성의 보조 신호로 밀려나 지시 이행이 약해진다.

WALL-OSS는 Self-Attention 하나를 공유한 채 FFN만 Vision-Language FFN과 Action FFN으로 가른다. 학습 과제에 따라 다른 FFN이 활성화되므로 파라미터는 분리되지만 cross-modal 문맥은 attention 층에서 계속 섞인다.

backbone은 Qwen2.5-VL-3B다. 입력은 1인칭 카메라와 팔에 달린 카메라의 영상, 그리고 텍스트 지시다. 출력은 학습 단계에 따라 달라지는데 LM Head는 CoT 문장과 subtask와 이산 action 토큰을 내고 Flow Head는 연속 action을 낸다. subtask는 high-level 추론이 텍스트로 내놓는 중간 단계 명령이다.

### Inspiration 단계

VLM의 원래 FFN을 그대로 쓰면서 embodied VQA를 얹어 로봇 환경에서의 공간 추론을 키운다. 동시에 이산 action 목표를 넣는데, 여기서 쓰는 압축 방식이 π0-FAST의 FAST tokenizer다. FAST tokenizer는 action chunk를 압축해 이산 토큰으로 적는 방식으로, DCT로 저주파 성분만 남기고 양자화한 뒤 BPE로 자주 나오는 패턴을 묶는다.

손실은 VQA 항과 이산 action 항의 가중합이며 둘 다 cross-entropy다. 이 단계를 지나면 모델은 거친 수준의 action 감각과 CoT 능력을 갖는다. 논문 표현으로는 "coarse, semantically grounded action awareness"다.

### Integration 단계

이산 action 예측을 flow matching 기반 연속 action 모델링으로 갈아 끼우고, 다시 두 phase로 나눈다. Phase 1은 VLM을 얼린 채 Action FFN 아래의 flow head만 학습해 velocity field를 회귀한다. Phase 2는 VLM을 풀어 함께 최적화한다.

라우팅은 학습되는 softmax router나 top-k router가 아니라 static router다. action 계열 feature는 Action FFN으로, vision-language feature는 Vision-Language FFN으로 고정 경로를 탄다. 노이즈 스케줄은 ρ가 0에 가까운 구간, 즉 노이즈가 많은 초기 구간을 더 자주 뽑도록 Beta 분포로 편향시킨다.

### Uni-CoT

CoT를 LLM의 텍스트 추론에 한정하지 않고 instruction → reasoning → subtask plan → 연속 action으로 이어지는 사슬 전체로 넓힌 게 Uni-CoT다. SayCan이나 Code-as-Policies처럼 planner와 controller를 나눈 파이프라인, Hi Robot이나 GR00T N1 같은 계층 구조와 대비된다. 그런 설계는 모듈 사이 인터페이스가 미분 불가능해 오차가 단계마다 쌓인다.

학습은 path-drop objective를 쓴다. 중간 추론 c를 조건으로 주기도 하고 빼기도 하면서 학습하므로, 추론 시점에 과제 난이도에 따라 CoT를 부를지 말지를 모델이 정한다. 끝난 subtask의 action을 내보내면서 다음 추론을 이어가는 비동기 제어도 여기서 나온다.

### 데이터

corpus는 1만 시간을 넘고 세 가지로 구성된다. 자체 수집 action 데이터가 57.5%로 가장 크고, open-source action 데이터가 33.1%, 멀티모달 VQA가 9.4%다. 자체 수집분은 탁상형 팔, 이동식 스탠드, 바퀴형 양팔, 바퀴형 humanoid에서 주방 청소, 옷 정리, 이동 집기, 조립을 담았다. 여러 모델을 붙인 파이프라인으로 단계별 주석을 달고 사람이 표본 검수해 trajectory 위에 곧바로 CoT 감독을 결합했다.

open-source 쪽은 DROID, BC-Z, BRIDGE 등 24종을 합치는데, 좌표계와 단위(위치는 미터, 각도는 라디안), 자유도 템플릿, 카메라 내외부 파라미터와 타임스탬프, control frequency를 모두 한 규격으로 맞춘다. control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다.

VQA는 두 가지다. 일반 VQA는 CapsFusion, Cambrian, COCO 같은 공개 데이터로 vision-language 능력을 지키는 정규화 역할만 하고 action head를 직접 건드리지 않는다. embodied VQA는 자체 trajectory에서 자동 생성하며 `<box>[x1,y1,x2,y2]</box>`와 `<point>[x,y]</point>` 같은 통일 형식으로 좌표 정답을 준다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

평가는 세 항목으로 나뉜다. embodied 장면 이해, long-horizon 과제의 계획과 실행, action 정확도와 강건성이다. 실제 기기 평가는 개발에 참여하지 않은 제3자가 모델 버전을 모르는 상태에서 채점하는 blind 프로토콜로 진행했다.

Embodied VQA 벤치마크에서 backbone인 Qwen2.5-VL-3B 대비 Object Grounding 46.1% → 91.6%, Scene Captioning 57.7% → 87.6%, Action Planning 59.8% → 69.0%다. backbone은 로봇 팔에 시선을 뺏겨 위치 지정을 놓치거나 장면과 무관한 환각을 내는 반면, WALL-OSS는 팔의 조작 동작까지 짚어 서술한다.

zero-shot 집기-놓기에서는 pre-training 때 본 물체 지시에 task progress 평균 85%, 처음 보는 물체에는 61%다. 실패 대부분은 지시를 잘못 알아들어서가 아니라 낯선 물체의 grasping과 배치 자세가 조금씩 어긋나서 생긴다.

action 정확도 실험은 갈라지는 지점을 잘 보여준다. 시연이 넉넉한 collect-waste 1,000개에서는 WALL-OSS와 π0 모두 성공률 100%이고 pre-training 없이 학습한 Diffusion Policy는 80%다. 시연이 500개로 줄고 과제가 어려워지는 pick-place-cup에서는 앞의 둘이 90%대를 지키는 사이 Diffusion Policy가 20% 아래로 떨어진다. 새 환경에서 collect-waste를 시키면 Diffusion Policy는 80%에서 0%가 되고 나머지 둘은 80%대를 지킨다.

long-horizon 과제는 subtask 생성이 성패를 갈랐다. set-table과 tidy-bedroom은 pre-training 데이터에 없고 단계가 다섯 개를 넘으며 실행 시간이 각각 3분과 5분을 넘는다. fine-tuning 데이터 중 subtask 라벨이 붙은 비율은 1%뿐인데도 모델은 쓸 만한 subtask 문장을 만들어낸다. 베이스라인은 subtask 안내가 없어 같은 자리에 수저를 반복해서 놓거나 시야 밖으로 나간 옷가지를 찾지 못한 채 효과 없는 동작을 반복한다.

추론 과제인 block-spell에서는 baseline이 flat 설정에서 거의 0에 수렴해, GPT-4가 subtask를 실시간으로 불러 주는 설정으로만 비교했다. 그렇게 붙여도 WALL-OSS가 in-distribution과 out-of-distribution 모두에서 앞선다. 논문은 GPT-4가 옳은 subtask를 뽑아내더라도 시점이 늦고 가려진 1인칭 시야 같은 상황에 맞춰 주지 못하며, 상위 계획과 하위 실행 모듈이 끊겨 있어 지시 이행이 떨어진다고 본다.

멀티모달 co-training의 효과는 Table 3에 몰려 있다. 글자 블록을 집으라는 정밀한 지시에서 co-training 설정 87%, action만 학습한 설정 26%, 같은 조건의 π0 9%다. 숫자 블록에서는 95%, 80%, 35%다. co-training은 성격이 다른 여러 데이터 원천을 하나의 학습 mixture에 함께 넣는 방식을 말한다.

전 과제 평균으로는 in-distribution 6과제에서 wall-oss 77%, π0 65%, Diffusion Policy 38%이고 out-of-distribution 4과제에서 75%, 62%, 15%다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문이 스스로 인정하는 대목이 하나 있다. 정밀 manipulation은 여전히 π0가 낫다는 것이다. WALL-OSS의 우위는 embodied 환경의 grounding과 추론, 그리고 OOD 일반화 쪽에 몰려 있다.

3D 데이터 희소성도 그대로 남는다. 3D-VLA나 PointVLA처럼 3D 시각을 2D와 action 사이의 다리로 쓰려는 시도가 있지만 3D 데이터 자체를 구하기 어렵고, VGGT나 π3 같은 3D 기반 모델도 정밀 action 예측에 필요한 정확도에 못 미친다고 적는다.

계획 능력이 전체 학습 프레임의 1%에 해당하는 CoT와 subtask 감독에 의존한다는 점도 한계로 남는다. 실행 시간이 3~5분을 넘고 공간 복잡도가 높은 과제에서는 이 얇은 감독만으로 안정적인 계획을 유지하기 어렵다.

향후 방향으로는 미래 프레임 예측 같은 중간 표현이나 3D 같은 중간 모달리티를 끼워 VL → A 매핑의 난이도를 낮추는 경로와, 끝까지 end-to-end로 가는 경로를 둘 다 열어 둔다. 영상과 3D는 텍스트-action 쌍보다 action과의 상관이 높아 감독 신호의 희소함을 덜어 주지만 3D 데이터는 여전히 부족하고, 대규모 영상 예측은 사람이 실제로 쓰지 않는 세부까지 예측하게 만드는 중복 감독을 낳는다고 본다.

## 6. 관련 연구 (Related Work)

- π0 ([[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]): 분리형 설계의 대표. 이 논문의 주된 비교 대상이자 정밀 manipulation에서 여전히 앞서는 baseline
- π0.5 ([[physical-ai/black-2025-pi05-a-vision-language-action-model-with]]): subtask를 먼저 내놓고 그 문장을 조건으로 action을 내는 구조. WALL-OSS의 Uni-CoT와 목적이 겹치되 단일 모델 안에서 미분 가능하게 묶는지가 갈린다
- RT-2 ([[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]])와 OpenVLA ([[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]]): Figure 2의 통합형 설계. weight drift 문제의 근거로 인용된다
- Diffusion Policy: pre-training 없이 밑바닥부터 학습하는 baseline. 데이터가 줄거나 환경이 바뀔 때 크게 하락하는 대조군 역할
- Flow Matching ([[llms/lipman-2022-flow-matching-for-generative-modeling]]): Integration 단계 연속 action 생성의 토대
- Open X-Embodiment ([[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x]]): open-source action 데이터 통합의 선례
- Wall-OSS-0.5 ([[physical-ai/x-square-robot-2026-wall-oss-05-technical-report]]): 같은 팀의 후속. 두 단계 커리큘럼을 단일 단계 co-training으로 바꾸고 FAST tokenizer를 학습형 RVQ tokenizer로 교체한다

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| WALL-OSS | X Square Robot이 공개한 embodied foundation model. Qwen2.5-VL-3B backbone 위에 Action FFN을 얹었다 |
| Uni-CoT (Unified Cross-Level CoT) | instruction → reasoning → subtask → 연속 action을 하나의 미분 가능한 사슬로 묶은 학습과 추론 형식 |
| Inspiration 단계 | embodied VQA와 이산 action 토큰으로 VLM에 거친 action 감각을 심는 첫 pre-training 단계 |
| Integration 단계 | flow matching으로 연속 action을 학습하는 두 번째 단계. VLM을 얼리는 Phase 1과 함께 푸는 Phase 2로 나뉜다 |
| static router | 학습으로 정하지 않고 토큰 종류에 따라 고정 경로로 FFN을 배정하는 라우팅 |
| DAM / CAM | Discrete Action Modeling / Continuous Action Modeling. Figure 2의 설계 비교에서 출력 형태를 가리키는 약어 |
| weight drift | action 감독이 VLM 원래 가중치 분포를 흔들어 vision-language 능력이 퇴화하는 현상 |
| task progress | 성공과 실패의 이분법 대신 과제를 어디까지 진행했는지를 0~100으로 매기는 척도 |
| path-drop objective | 중간 추론 c를 조건에 넣기도 하고 빼기도 하며 학습해, 추론 시 CoT 사용 여부를 모델이 고르게 하는 목표 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | VLM과 WALL-OSS 대비 두 장면 + embodiment 영역 커버리지 막대 | caption-region | ★ wiki 권장 (motivation) |
| fig02 | 4 | 통합형, 분리형, WALL-OSS 세 설계 비교 | caption-region | ★ wiki 권장 (architecture) |
| fig03 | 4 | WALL-OSS 전체 구조 (SA 공유 + FFN 분리 + 두 head) | caption-region | ★ wiki 권장 (architecture) |
| fig04 | 5 | 학습과 추론 파이프라인 4단계 | caption-region | ★ wiki 권장 (method) |
| fig05 | 7 | 학습 corpus 세 원천 구성비와 하드웨어 | caption-region | ★ wiki 권장 (data) |
| fig06 | 9 | 평가 과제 7종과 각 스텝의 CoT와 subtask 문장 | caption-region | ★ wiki 권장 (method 예시) |
| fig07 | 11 | ID와 OOD task progress 비교 막대 | caption-region | ★ wiki 권장 (result) |
| tab01 | 8 | open-source 데이터셋 목록 | table-region | (선택. 목록이라 본문 서술로 충분) |
| tab02 | 11 | Embodied VQA 벤치마크 3항목 | table-region | ★ wiki 권장 (result) |
| tab03 | 14 | block-spell 지시 이행 정확도 3열 비교 | table-region | ★ wiki 권장 (result) |

검출 10건은 논문의 실제 Figure 7개와 Table 3개에 정확히 맞고, 오버레이에서 모든 크롭이 도식 영역만 감쌌다. `column-band`와 `page-region` 폴백으로 내려간 항목은 없다.
