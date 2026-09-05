---
title: "Igniting VLMs toward the Embodied Space"
type: paper
year: 2025
category: physical-ai
source: zhai-2025-igniting-vlms-toward-the-embodied.md
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
    caption: "VLM과 WALL-OSS의 대비 두 장면 — 겹친 카드 더미를 세어 가리키라는 요구에 VLM은 불가능하다고 답하고 WALL-OSS는 좌표 리스트와 53이라는 수를 낸다. 오른쪽 막대는 LLM의 언어 prior와 VLM의 vision-language prior가 embodiment 영역을 얼마나 못 덮는지를 표시한다"
    page: 2
    bbox_norm: [0.106, 0.072, 0.8939, 0.2904]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/zhai-2025-igniting-vlms-toward-the-embodied/fig02.png
    raw: raw/papers/zhai-2025-igniting-vlms-toward-the-embodied-figures/fig02.png
    caption: "VLM을 action으로 옮기는 세 가지 설계 — (a) 통합형은 SA와 FFN을 통째로 공유하고, (b) 분리형은 action 쪽 SA·FFN을 따로 두며, (c) WALL-OSS는 SA만 공유하고 FFN만 VL용과 action용으로 가른다"
    page: 4
    bbox_norm: [0.1828, 0.073, 0.817, 0.2188]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/zhai-2025-igniting-vlms-toward-the-embodied/fig03.png
    raw: raw/papers/zhai-2025-igniting-vlms-toward-the-embodied-figures/fig03.png
    caption: "WALL-OSS 구조 — 하나의 Self-Attention 위에 Vision-Language FFN과 Action FFN을 얹고, LM Head로 CoT·subtask·이산 action 토큰을, Flow Head로 연속 action 20스텝을 낸다. FAST 토큰은 Inspiration 단계에서만, 노이즈 입력은 Integration 단계에서만 쓰인다"
    page: 4
    bbox_norm: [0.1438, 0.5633, 0.8562, 0.8491]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/zhai-2025-igniting-vlms-toward-the-embodied/fig04.png
    raw: raw/papers/zhai-2025-igniting-vlms-toward-the-embodied-figures/fig04.png
    caption: "학습과 추론 파이프라인 — 위는 base VLM pre-training → Inspiration → Integration Phase 1 → Phase 2로 이어지는 학습 순서, 아래는 추론 시 instruction에서 CoT·subtask를 거치거나 건너뛰고 곧장 action으로 갈 수 있음을 화살표로 표시한다"
    page: 5
    bbox_norm: [0.1828, 0.1705, 0.8172, 0.3468]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/zhai-2025-igniting-vlms-toward-the-embodied/fig05.png
    raw: raw/papers/zhai-2025-igniting-vlms-toward-the-embodied-figures/fig05.png
    caption: "학습 corpus 구성 — 자체 수집 action 57.5%, open-source action 33.1%, 멀티모달 VQA 9.4%. 가운데는 각 원천의 예시 프레임, 오른쪽 위는 바퀴형 양팔 로봇과 휴머노이드 하드웨어"
    page: 7
    bbox_norm: [0.111, 0.072, 0.9608, 0.3808]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/zhai-2025-igniting-vlms-toward-the-embodied/fig06.png
    raw: raw/papers/zhai-2025-igniting-vlms-toward-the-embodied-figures/fig06.png
    caption: "fine-tuning 평가 과제 일람 — 위쪽 단일 지시 과제 네 개, 아래쪽 set-table·tidy-bedroom·block-spell. 각 스텝 프레임에 모델이 낸 <Instruction>·<Subtask>·<Thought> 문장이 붙어 Uni-CoT 출력이 실제로 어떤 모습인지 보여 준다"
    page: 9
    bbox_norm: [0.106, 0.1288, 0.8939, 0.8081]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/zhai-2025-igniting-vlms-toward-the-embodied/fig07.png
    raw: raw/papers/zhai-2025-igniting-vlms-toward-the-embodied-figures/fig07.png
    caption: "전 과제 task progress 비교 — 왼쪽 in-distribution 6과제 평균은 wall-oss 77%·π0 65%·dp 38%, 오른쪽 out-of-distribution 4과제 평균은 75%·62%·15%다"
    page: 11
    bbox_norm: [0.111, 0.6711, 0.8836, 0.8772]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/zhai-2025-igniting-vlms-toward-the-embodied/tab01.png
    raw: raw/papers/zhai-2025-igniting-vlms-toward-the-embodied-figures/tab01.png
    caption: "corpus에 쓴 open-source 데이터셋 목록 — action 계열 24종과 image-text 계열 12종"
    page: 8
    bbox_norm: [0.1103, 0.0703, 0.8897, 0.1874]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/zhai-2025-igniting-vlms-toward-the-embodied/tab02.png
    raw: raw/papers/zhai-2025-igniting-vlms-toward-the-embodied-figures/tab02.png
    caption: "Embodied VQA 벤치마크 — Object Grounding 46.1%→91.6%, Scene Captioning 57.7%→87.6%, Action Planning 59.8%→69.0%"
    page: 11
    bbox_norm: [0.2552, 0.073, 0.7448, 0.1309]
    strategy: table-region
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/zhai-2025-igniting-vlms-toward-the-embodied/tab03.png
    raw: raw/papers/zhai-2025-igniting-vlms-toward-the-embodied-figures/tab03.png
    caption: "block-spell 과제의 지시 이행 정확도 — 글자 블록 87%/26%/9%, 숫자 블록 95%/80%/35% 순으로 co-training·action only·π0가 갈린다"
    page: 14
    bbox_norm: [0.3161, 0.0735, 0.6839, 0.157]
    strategy: table-region
    curated: true
---

## 요약 (Summary)

WALL-OSS는 X Square Robot이 2025년 9월에 공개한 embodied foundation model이다. Qwen2.5-VL-3B를 backbone으로 삼되, VLM을 로봇으로 옮길 때 생기는 어긋남을 구조와 커리큘럼 양쪽에서 메운다.

문제 설정이 명확하다. 웹에는 텍스트와 이미지가 넘치지만 정렬된 vision-language-action 데이터는 희소하고, embodied 장면은 1인칭 시점과 자기 가림 탓에 인터넷 이미지와 통계가 다르며, VLM의 next-token prediction과 action trajectory의 연속 생성은 학습 목표부터 어긋난다. trajectory는 observation과 action이 시간순으로 이어진 실행 기록이다.

해법은 Self-Attention 하나를 공유한 채 FFN만 Vision-Language FFN과 Action FFN으로 가르는 구조, 이산 action prior를 먼저 심고 연속 제어로 넘어가는 두 단계 커리큘럼, 그리고 지시부터 연속 action까지를 하나의 미분 가능한 사슬로 묶는 Uni-CoT다.

![[assets/zhai-2025-igniting-vlms-toward-the-embodied/fig01.png]]
*Figure 1: 겹친 카드를 세어 가리키라는 요구에 VLM은 불가능하다고 답하고 WALL-OSS는 좌표 리스트와 53이라는 수를 낸다. 오른쪽 막대는 LLM의 언어 prior와 VLM의 vision-language prior가 embodiment 영역을 얼마나 못 덮는지를 표시한다 (Zhai 2025, p.2)*

## 주요 기여 (Key Contributions)

논문이 세 개의 gap을 세우고 각각에 대응하는 설계를 붙인다. 모달리티 gap에는 Uni-CoT를, pre-training 분포 gap에는 embodied VQA와 이산 action prior를, 학습 목표 gap에는 mixture-of-experts 구조와 단계별 커리큘럼을 대응시킨다.

pre-training된 VLM 능력을 지키려고 가중치를 얼리는 knowledge insulation 계열과 방향이 반대다. 논문은 느슨하게 결합된 설계가 semantics와 제어의 결합을 약하게 만들고, VLM 자체가 embodied 영역에서 부실하기 때문에 VL prior 밖의 action을 시킬 때 성능이 무너진다고 본다.

학습 코드와 체크포인트를 함께 공개한 것도 기여로 든다. embodied 범용 foundation model이 아직 드물다는 게 이유다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 세 가지 설계 중 어느 쪽인가

통합형은 원래 VLM을 그대로 늘려 action까지 next-token prediction으로 처리한다. RT-2와 OpenVLA가 여기 속하는데, action 감독이 VLM 가중치 분포를 흔들어 지시 이행과 일반화가 무너지는 weight drift가 생긴다. 분리형은 action 예측용 브랜치를 따로 두고 VLM에서 정보만 끌어다 쓰는 π0 방식이다. 이쪽은 vision과 language가 action 생성의 보조 신호로 밀려나 지시 이행이 약해진다.

![[assets/zhai-2025-igniting-vlms-toward-the-embodied/fig02.png]]
*Figure 2: (a) 통합형은 SA와 FFN을 통째로 공유하고, (b) 분리형은 action 쪽 SA·FFN을 따로 두며, (c) WALL-OSS는 SA만 공유하고 FFN만 VL용과 action용으로 가른다 (Zhai 2025, p.4)*

WALL-OSS는 파라미터를 FFN 수준에서만 나눈다. 학습 과제에 따라 다른 FFN이 활성화되지만 cross-modal 문맥은 attention 층에서 계속 섞인다.

![[assets/zhai-2025-igniting-vlms-toward-the-embodied/fig03.png]]
*Figure 3: 하나의 Self-Attention 위에 Vision-Language FFN과 Action FFN을 얹고, LM Head로 CoT·subtask·이산 action 토큰을, Flow Head로 연속 action 20스텝을 낸다 (Zhai 2025, p.4)*

입력은 1인칭 카메라와 팔에 달린 카메라의 영상, 그리고 텍스트 지시다. subtask는 high-level 추론이 텍스트로 내놓는 중간 단계 명령이다.

### 두 단계 커리큘럼

Inspiration 단계는 VLM의 원래 FFN을 그대로 쓰면서 embodied VQA로 공간 추론을 키우고, 동시에 이산 action 목표를 얹는다. 압축에는 π0-FAST의 FAST tokenizer를 쓴다. FAST tokenizer는 action chunk를 압축해 이산 토큰으로 적는 방식으로, DCT로 저주파 성분만 남기고 양자화한 뒤 BPE로 자주 나오는 패턴을 묶는다. 손실은 VQA 항과 이산 action 항의 가중합이며 둘 다 cross-entropy다.

Integration 단계는 이산 예측을 flow matching으로 갈아 끼운다. flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다. Phase 1에서 VLM을 얼린 채 flow head만 학습하고 Phase 2에서 함께 최적화한다. 라우팅은 학습되는 router가 아니라 static router라, action 계열 feature는 Action FFN으로 vision-language feature는 Vision-Language FFN으로 고정 경로를 탄다. 노이즈 스케줄은 노이즈가 많은 초기 구간을 더 자주 뽑도록 Beta 분포로 편향시킨다.

![[assets/zhai-2025-igniting-vlms-toward-the-embodied/fig04.png]]
*Figure 4: 위는 base VLM pre-training → Inspiration → Integration Phase 1 → Phase 2로 이어지는 학습 순서, 아래는 추론 시 CoT·subtask를 거치거나 건너뛰고 곧장 action으로 갈 수 있음을 표시한다 (Zhai 2025, p.5)*

### Uni-CoT

CoT를 텍스트 추론에 한정하지 않고 instruction → reasoning → subtask plan → 연속 action으로 이어지는 사슬 전체로 넓힌다. SayCan이나 Code-as-Policies처럼 planner와 controller를 나눈 파이프라인, Hi Robot이나 GR00T N1 같은 계층 구조는 모듈 사이 인터페이스가 미분 불가능해 오차가 단계마다 쌓인다는 게 대비되는 지점이다.

학습은 path-drop objective를 쓴다. 중간 추론 c를 조건으로 주기도 하고 빼기도 하면서 학습하므로, 추론 시점에 과제 난이도에 따라 CoT를 부를지 말지를 모델이 정한다. 끝난 subtask의 action을 내보내면서 다음 추론을 이어가는 비동기 제어도 여기서 나온다.

![[assets/zhai-2025-igniting-vlms-toward-the-embodied/fig06.png]]
*Figure 6: 평가 과제 7종. 각 스텝 프레임에 모델이 낸 `<Instruction>`·`<Subtask>`·`<Thought>` 문장이 붙어 Uni-CoT 출력이 실제로 어떤 모습인지 보여 준다 (Zhai 2025, p.9)*

### 데이터

corpus는 10,000시간을 넘고 세 갈래다. 자체 수집 action 데이터 57.5%, open-source action 데이터 33.1%, 멀티모달 VQA 9.4%다. 자체 수집분은 탁상형 팔, 이동식 스탠드, 바퀴형 양팔, 바퀴형 휴머노이드에서 주방 청소·옷 정리·이동 집기·조립을 담았고, 여러 모델을 붙인 파이프라인으로 단계별 주석을 달아 trajectory 위에 곧바로 CoT 감독을 얹었다.

open-source 쪽은 DROID·BC-Z·BRIDGE 등 24종인데, 좌표계와 단위, 자유도 템플릿, 카메라 파라미터와 타임스탬프, control frequency를 한 규격으로 맞춘다. control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다.

VQA는 일반 VQA와 embodied VQA로 갈린다. 앞쪽은 vision-language 능력을 지키는 정규화 역할만 하고 action head를 직접 건드리지 않는다. 뒤쪽은 자체 trajectory에서 자동 생성하며 `<box>[x1,y1,x2,y2]</box>`·`<point>[x,y]</point>` 같은 통일 형식으로 좌표 정답을 준다.

![[assets/zhai-2025-igniting-vlms-toward-the-embodied/fig05.png]]
*Figure 5: 학습 corpus 세 원천의 구성비와 각 원천의 예시 프레임, 오른쪽 위는 바퀴형 양팔 로봇과 휴머노이드 하드웨어 (Zhai 2025, p.7)*

## 결과 (Results)

실기기 평가는 개발에 참여하지 않은 제3자가 모델 버전을 모르는 상태에서 채점하는 blind 프로토콜로 돌렸다.

backbone인 Qwen2.5-VL-3B 대비 embodied 장면 이해가 크게 오른다. backbone은 로봇 팔에 시선을 뺏겨 위치 지정을 놓치거나 장면과 무관한 환각을 내는 반면, WALL-OSS는 팔의 조작 동작까지 짚어 서술한다.

![[assets/zhai-2025-igniting-vlms-toward-the-embodied/tab02.png]]
*Table 2: Embodied VQA 벤치마크 — Object Grounding 46.1% → 91.6%, Scene Captioning 57.7% → 87.6%, Action Planning 59.8% → 69.0% (Zhai 2025, p.11)*

zero-shot 집기-놓기에서는 pre-training 때 본 물체 지시에 task progress 평균 85%, 처음 보는 물체에 61%다. 실패 대부분은 지시를 잘못 알아들어서가 아니라 낯선 물체의 grasping과 배치 자세가 조금씩 어긋나서 생긴다.

pre-training의 효과가 갈리는 지점이 뚜렷하다. 시연이 넉넉한 collect-waste 1,000개에서는 WALL-OSS와 π0 모두 성공률 100%이고 Diffusion Policy는 80%다. 시연이 500개로 줄고 과제가 어려워지는 pick-place-cup에서는 앞의 둘이 90%대를 지키는 사이 Diffusion Policy가 20% 아래로 떨어진다. 새 환경에서 collect-waste를 시키면 Diffusion Policy는 80%에서 0%가 되고 나머지 둘은 80%대를 지킨다.

![[assets/zhai-2025-igniting-vlms-toward-the-embodied/fig07.png]]
*Figure 7: 전 과제 task progress — 왼쪽 in-distribution 6과제 평균은 wall-oss 77%·π0 65%·dp 38%, 오른쪽 out-of-distribution 4과제 평균은 75%·62%·15% (Zhai 2025, p.11)*

장기 과제는 subtask 생성이 갈랐다. set-table과 tidy-bedroom은 pre-training 데이터에 없고 단계가 다섯을 넘으며 실행 시간이 각각 3분·5분을 넘는다. fine-tuning 데이터 중 subtask 라벨이 붙은 비율은 1%뿐인데도 모델은 쓸 만한 subtask 문장을 만들어낸다. 베이스라인은 subtask 안내가 없어 같은 자리에 수저를 반복해 놓거나 시야 밖으로 나간 옷가지를 찾지 못하고 헛돈다.

추론 과제인 block-spell에서는 baseline이 flat 설정에서 거의 0에 수렴해, GPT-4가 subtask를 실시간으로 불러 주는 설정으로만 비교했다. 그렇게 붙여도 WALL-OSS가 앞선다. GPT-4가 옳은 subtask를 뽑아내더라도 시점이 늦고 가려진 1인칭 시야 같은 상황에 맞춰 주지 못하며, 상위 계획과 하위 실행 모듈이 끊겨 있다는 게 논문의 진단이다.

멀티모달 co-training의 효과는 정밀 지시에서 가장 크게 드러난다. co-training은 성격이 다른 여러 데이터 원천을 하나의 학습 mixture에 함께 넣는 방식이다.

![[assets/zhai-2025-igniting-vlms-toward-the-embodied/tab03.png]]
*Table 3: block-spell 지시 이행 정확도 — 글자 블록은 co-training 87%·action only 26%·π0 9%, 숫자 블록은 95%·80%·35% (Zhai 2025, p.14)*

## 한계 (Limitations)

정밀 manipulation은 여전히 π0가 낫다고 논문이 스스로 적는다. WALL-OSS의 우위는 embodied 환경의 grounding과 추론, 그리고 OOD 일반화 쪽에 몰려 있다.

3D 데이터 희소성도 그대로다. 3D-VLA나 PointVLA처럼 3D 시각을 다리로 쓰려는 시도가 있지만 데이터를 구하기 어렵고, VGGT나 π3 같은 3D 기반 모델도 정밀 action 예측에 필요한 정확도에 못 미친다.

계획 능력이 전체 학습 프레임의 1%짜리 CoT·subtask 감독에 얹혀 있다는 점도 남는다. 실행 시간이 3~5분을 넘고 공간 복잡도가 높은 과제에서는 이 얇은 감독이 버티지 못한다.

## 관련 페이지 (Related Pages)

- [[physical-ai/x-square-robot-2026-wall-oss-05-technical-report]] — 같은 팀의 후속. 두 단계 커리큘럼이 단일 단계 co-training으로 합쳐지고 FAST tokenizer가 학습형 RVQ tokenizer로 바뀐다
- [[physical-ai/x-square-robot-wall-x]] — 학습·추론 코드 저장소. README의 인용 블록이 이 논문을 가리킨다
- [[physical-ai/x2robot-2025-wall-oss-project-page]] — 공식 프로젝트 페이지. 같은 도식을 쓰되 평가 과제를 영상으로 보여 준다
- [[physical-ai/jo-2026-wall-oss-vla-primer]] — 이 논문을 수식 단위로 푼 한국어 해설
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]] — 분리형 설계의 대표이자 주된 비교 대상
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]] — subtask를 먼저 뱉고 그 문장을 조건으로 action을 내는 구조. Uni-CoT와 목적이 겹친다
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]] · [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]] — 통합형 설계. weight drift 문제의 근거로 인용된다
- [[llms/lipman-2022-flow-matching-for-generative-modeling]] — Integration 단계 연속 action 생성의 토대
- [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x]] — open-source action 데이터 통합의 선례
- [[overviews/physical-ai-overview]] — 도메인 허브
