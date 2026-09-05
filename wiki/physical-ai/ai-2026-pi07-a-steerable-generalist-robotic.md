---
title: "π0.7: a Steerable Generalist Robotic Foundation Model with Emergent Capabilities"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic.pdf
raw_filename: "ai-2026-pi07-a-steerable-generalist-robotic.pdf"
source_collection: external
source: ai-2026-pi07-a-steerable-generalist-robotic.md
authors: "Physical Intelligence (성 알파벳순 87인 공저 — Bo Ai·Ali Amin·Ashwin Balakrishna·Kevin Black·Danny Driess·Chelsea Finn·Karol Hausman·Brian Ichter·Sergey Levine·Suraj Nair·Karl Pertsch·Lucy Xiaoyang Shi·Jost Tobias Springenberg·Marcel Torne·Quan Vuong 등)"
url: "https://www.pi.website/blog/pi07"
tags: [physical-ai, vla, world-model, manipulation]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig01.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig01.png
    caption: "π0.7 전체 구성 — 왼쪽 robot data(demonstration·autonomous)와 오른쪽 non-robot data(웹 멀티모달·사람 1인칭 영상)가 language instruction·subgoal image·episode metadata 세 갈래 prompt로 묶여 학습에 들어가고, 추론 때는 high-level policy·world model·desired metadata가 그 자리를 채운다"
    page: 1
    bbox_norm: [0.0702, 0.3049, 0.9298, 0.7252]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig02.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig02.png
    caption: "아키텍처 — SigLIP 400M + Gemma 4B backbone이 observation memory·task/subtask instruction·subgoal image·metadata를 받고 860M action expert가 flow matching으로 action을 낸다. subtask는 사람이나 high-level policy가, subgoal image는 BAGEL 14B world model이 만든다"
    page: 4
    bbox_norm: [0.0668, 0.0606, 0.9298, 0.3991]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig03.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig03.png
    caption: "prompt 구성 예시 — '식탁에 음식 놓기'와 '셔츠 개기' 두 과제에서 observation·subgoal image·subtask instruction·metadata가 5단계에 걸쳐 어떻게 짝을 이루는지 보여준다"
    page: 6
    bbox_norm: [0.1752, 0.0606, 0.8248, 0.4441]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig04.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig04.png
    caption: "실험에 쓴 로봇 — 양팔 이동형 manipulator, 정적 양팔 BiPi, cross-embodiment 실험용 양팔 UR5e"
    page: 7
    bbox_norm: [0.4644, 0.5870, 1.0000, 0.7988]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig05.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig05.png
    caption: "장기 과제 평가 예시 — 'take out the trash'처럼 한 줄 지시로 끝까지 가는 과제와, 학습 데이터에 없어 단계별 지시로 coaching해야 하는 'toasting a bagel'"
    page: 8
    bbox_norm: [0.0800, 0.0000, 0.9357, 0.2706]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig06.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig06.png
    caption: "out-of-the-box 성능 — 위는 π*0.6 RL specialist 대비 빨래·에스프레소·상자 조립의 성공률과 정규화 throughput, 아래는 π0.6 SFT specialist 대비 6개 과제의 task progress"
    page: 9
    bbox_norm: [0.0702, 0.0606, 0.9298, 0.5163]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig07.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig07.png
    caption: "prompt 구성과 평가 데이터 ablation — metadata를 뺀 모델과 자율 평가 데이터를 뺀 모델 모두 π0.7보다 낮고 격차는 throughput에서 가장 크다"
    page: 9
    bbox_norm: [0.0702, 0.5710, 0.9298, 0.7587]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig08.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig08.png
    caption: "memory가 필요한 과제 — 머그 3개 교체·물건 찾기·커피 뜨기·창 닦기에서 fine-tuning 없이 π0.6-MEM SFT specialist와 비슷하거나 더 낫다"
    page: 10
    bbox_norm: [0.0702, 0.0606, 0.5000, 0.1646]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig09.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig09.png
    caption: "미학습 환경에서의 지시 따르기 — 처음 보는 주방 4곳·침실 2곳의 14개 시나리오에서 3~6단계 지시를 얼마나 따라갔는지"
    page: 11
    bbox_norm: [0.0702, 0.0606, 0.9298, 0.2763]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig10.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig10.png
    caption: "복잡한 지시 표현 — 표준 지시에서는 세 모델이 비슷하지만 '수프 먹을 때 쓰는 물건'처럼 우회 표현이 들어가면 π0.7이 앞서고 subgoal image를 주면 더 올라간다"
    page: 11
    bbox_norm: [0.0483, 0.2805, 0.5000, 0.4753]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig11.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig11.png
    caption: "데이터 편향 깨기 — 학습 데이터와 반대로 지시한 Reverse Bussing·Reverse Fridge to Microwave. 후자는 subgoal image 조건이 성공의 관건이다"
    page: 11
    bbox_norm: [0.0702, 0.5742, 0.5524, 0.7069]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig12.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig12.png
    caption: "cross-embodiment 전이 — 왼쪽은 재배치 계열 4과제, 오른쪽은 수건·셔츠 개기. 형상 격차가 커질수록 π0.5가 먼저 무너지고 셔츠 개기에서는 사람 조작자 수준(파선)에 근접한다"
    page: 12
    bbox_norm: [0.0638, 0.0606, 0.9468, 0.3301]
    strategy: caption-region
    curated: true
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig13.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig13.png
    caption: "전이 과정에서 나타난 전략 변화 — 목표 로봇의 팔 길이와 배치에 맞춰 쥐는 방식 자체를 바꾼다"
    page: 12
    bbox_norm: [0.0702, 0.4570, 0.5129, 0.6730]
    strategy: caption-region
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig14.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig14.png
    caption: "language coaching 예시 — 에어프라이어에 고구마를 넣는 미학습 과제를 다섯 마디 지시로 단계별로 끌고 간다"
    page: 13
    bbox_norm: [0.0404, 0.0553, 0.9298, 0.1783]
    strategy: caption-region
    curated: false
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig15.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig15.png
    caption: "장기 과제 coaching 결과 — 에어프라이어 넣기·빼기와 베이글 굽기. 지시를 따라가는 능력이 없는 이전 모델은 거의 진행하지 못한다"
    page: 13
    bbox_norm: [0.0652, 0.2224, 0.5018, 0.4346]
    strategy: manual
    curated: true
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig16.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig16.png
    caption: "coaching 데이터로 만든 자율 policy — 사람이 실시간으로 불러주던 지시를 high-level policy가 대신하며 5개 과제에서 coaching과 비슷한 진행도를 낸다"
    page: 13
    bbox_norm: [0.0702, 0.5024, 0.5000, 0.6485]
    strategy: caption-region
    curated: false
  - id: fig17
    label: Figure 17
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig17.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig17.png
    caption: "미학습 단기 과제 — 프렌치프레스 누르기·밥솥에 쌀 담기·사무용품 닦기·회전체 돌리기를 전용 데이터 없이 수행한다"
    page: 13
    bbox_norm: [0.4932, 0.2204, 0.9328, 0.3716]
    strategy: manual
    curated: false
  - id: fig18
    label: Figure 18
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig18.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig18.png
    caption: "데이터 규모·다양성 ablation — 왼쪽은 데이터를 늘려 평균 품질이 떨어져도 metadata가 있으면 throughput이 계속 오른다는 것, 오른쪽은 과제 다양성 상위 20%를 빼면 미학습 과제 성능이 무너진다는 것"
    page: 14
    bbox_norm: [0.0702, 0.0606, 0.9298, 0.2401]
    strategy: caption-region
    curated: true
  - id: fig19
    label: Figure 19
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig19.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig19.png
    caption: "VLA와 world model의 attention mask — image goal 유무, metadata CFG 추론, goal generator의 학습·추론 분기"
    page: 22
    bbox_norm: [0.4997, 0.0604, 0.9300, 0.3615]
    strategy: caption-region
    curated: false
  - id: fig20
    label: Figure 20
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig20.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig20.png
    caption: "joint 제어와 end-effector 제어 비교 — cross-embodiment 과제 전반에서 두 제어 모드의 차이가 뚜렷하지 않다"
    page: 23
    bbox_norm: [0.1402, 0.0544, 0.8498, 0.2386]
    strategy: manual
    curated: false
  - id: fig21
    label: Figure 21
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig21.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig21.png
    caption: "사람 대조군 10인의 teleoperation 경력 — 목표 로봇인 양팔 UR5e 경험은 거의 없고 전체 경력은 평균 375시간이다"
    page: 23
    bbox_norm: [0.0682, 0.2684, 0.4448, 0.4656]
    strategy: manual
    curated: false
  - id: fig22
    label: Figure 22
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig22.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig22.png
    caption: "셔츠 개기에서 π0.7 (GC)과 사람 조작자 비교 — task progress 85.6% 대 90.9%, 성공률 80% 대 80.6%"
    page: 23
    bbox_norm: [0.0682, 0.5234, 0.4448, 0.6676]
    strategy: manual
    curated: false
---

## 요약 (Summary)

π0.7은 Physical Intelligence가 2026년 4월에 공개한 5B VLA다. 앞선 모델들과 갈리는 지점은 아키텍처가 아니라 prompt에 무엇을 넣느냐다. "주방을 치워라" 같은 과제 설명 옆에 이 episode가 얼마나 빨랐는지, 품질이 몇 점인지, 실수가 있었는지를 적고, 다음 단계의 장면을 그린 subgoal image까지 붙인다. subgoal image는 현재 subtask가 끝난 직후의 모습을 여러 카메라 시점으로 그린 목표 이미지를 말한다.

이 문맥이 하는 일은 데이터를 살리는 것이다. 로봇 데이터는 전략과 숙련도가 뒤섞여 있어 그대로 학습하면 모델이 여러 mode를 평균 내버린다. 그래서 보통은 걸러 쓴다. π0.7은 거르는 대신 라벨을 붙여, 실패한 episode도 자율 실행에서 나온 어중간한 rollout도 그대로 넣는다. 실행할 때 "품질 5, 실수 없음"으로 지정하면 좋은 쪽 동작만 나온다.

결과로 나온 성질들이 논문 제목의 emergent capabilities다. 과제별 fine-tuning 없이 specialist 수준의 dexterity를 내고, 처음 보는 주방에서 열린 지시를 따라가며, 해당 과제 데이터가 한 줄도 없는 로봇에서 빨래를 갠다. 마지막이 조합적 일반화다 — 배운 skill을 새 조합으로 엮어 에어프라이어처럼 처음 보는 기기를 다룬다.

## 주요 기여 (Key Contributions)

foundation model은 크고 다양한 데이터에서 generalist 능력이 나온다는 전제 위에 있다. 언어 모델에서는 잘 작동한다. 영어를 프랑스어로 옮길 줄 알고 JSON을 뽑을 줄 알면 프랑스어 번역을 JSON으로 내놓는다. 로봇에서는 그러지 못했다. 기존 VLA는 새 과제로 넘어가기는커녕 학습한 과제조차 과제별 fine-tuning 없이는 매끄럽지 않았다.

논문의 답은 데이터를 거르지 말고 설명하라는 것이다. 이미지·영상 생성 쪽의 prompt expansion과 발상이 겹치지만, 로봇에서는 언어만으로 적기 어려운 것 — 깔끔하게 갠 티셔츠가 어떻게 생겼는지 같은 것 — 이 있어 이미지 modality가 함께 들어간다.

저자들이 스스로 긋는 선이 분명하다. 새 아키텍처를 내놓는 것이 아니라, VLA가 더 다양한 데이터를 쓰게 만드는 방법론과 그것이 조합적 일반화로 이어진다는 실증이 기여라는 것이다.

## 방법론 및 아키텍처 (Methodology and Architecture)

![[assets/ai-2026-pi07-a-steerable-generalist-robotic/fig01.png]]
*Figure 1: 왼쪽 robot data(demonstration·autonomous)와 오른쪽 non-robot data(웹 멀티모달·사람 1인칭 영상)가 language instruction·subgoal image·episode metadata 세 갈래 prompt로 묶여 학습에 들어간다. 추론 시점에는 high-level policy·world model·desired metadata가 그 자리를 채운다 (Physical Intelligence 2026, Fig. 1)*

총 5B다. backbone은 Gemma3 4B VLM(400M vision encoder 포함), 출력부는 860M action expert다. action expert는 로봇 상태와 action 토큰만 처리하도록 분리한 별도 가중치 묶음을 말한다. flow matching으로 연속값을 예측하고 action 토큰 50개가 chunk 50스텝에 대응한다. vision encoder는 MEM의 video history encoder 설계를 따라 history 프레임을 시간·공간으로 압축해, 프레임이 몇 장이든 고정된 토큰 수를 낸다.

학습에는 knowledge insulation을 쓴다. backbone은 FAST token으로 지도하고, action expert가 backbone activation을 참조하되 gradient는 backbone으로 흘리지 않는 구성이다. 추론 지연 대비로는 real-time action chunking의 학습 시점 버전을 써서 0~12 timestep 지연을 학습 중에 흉내 낸다. 50Hz 로봇 기준 최대 240ms다.

![[assets/ai-2026-pi07-a-steerable-generalist-robotic/fig02.png]]
*Figure 2: observation memory·task/subtask instruction·subgoal image·metadata가 backbone으로 들어가고 action expert가 flow matching으로 action을 낸다. subtask는 사람이나 high-level policy가, subgoal image는 BAGEL 14B world model이 만든다 (Physical Intelligence 2026, Fig. 2)*

카메라는 최대 4대(전방·손목 둘·이동형의 후방)이고 각각 history 6장까지, stride 1초다. subgoal image는 최대 3장이며 전부 448x448로 맞춘다. attention은 block-causal이라 observation 토큰끼리와 subgoal image 토큰끼리는 양방향, goal image 토큰은 observation도 보고, 뒤따르는 텍스트는 causal이다. proprioception은 π0.6의 이산 텍스트 토큰 대신 linear projection으로 임베딩한다.

### prompt를 이루는 네 갈래

subtask instruction은 π0.5에서 이어진다. "주방을 치워라"와 별개로 "냉장고 문을 열어라"를 준다. 실행 시점에는 high-level policy가 내놓거나 사람이 부르는데, 사람이 부르면 그게 language coaching이다.

subgoal image는 언어가 놓치는 실행 세부를 메운다. "냉장고 문을 열어라"는 손잡이를 어떻게 잡아야 하는지 말해주지 않는다. 여러 view를 주면 물체 배치는 전방 뷰가, end-effector 자세는 손목 뷰가 짚는다. 실행 시점의 생성은 BAGEL 14B에서 초기화한 경량 world model이 맡는다. 웹 규모 이미지 편집·생성 데이터로 pre-training된 덕에 로봇 데이터에 없는 개념이 subgoal 형태로 넘어온다.

episode metadata는 셋이다. 속도는 episode 길이를 500 timestep 단위로 이산화하고, 품질은 1~5점, 실수 여부는 구간별 사람 라벨이다. 여기에 `joint`/`ee` 제어 모드 식별자가 붙는다.

![[assets/ai-2026-pi07-a-steerable-generalist-robotic/fig03.png]]
*Figure 3: '식탁에 음식 놓기'와 '셔츠 개기' 두 과제에서 observation·subgoal image·subtask instruction·metadata가 5단계에 걸쳐 어떻게 짝을 이루는지 (Physical Intelligence 2026, Fig. 3)*

학습 중에는 각 요소를 확률적으로 뺀다. subgoal image는 배치의 25%에만 넣는데, 이미지가 있으면 action 예측이 사실상 inverse dynamics 문제가 되어 학습이 지나치게 빨라지기 때문이다. 이미지가 든 예시 중 30%는 subtask 텍스트를 뺀다. metadata는 15% 확률로 통째로, 각 항목은 추가로 5%씩 빠진다. 제어 모드에는 dropout이 없다.

실행할 때 속도는 과제별 episode 길이의 15퍼센타일, 품질은 5, 실수는 false로 고정한다. subgoal은 subtask가 바뀌거나 4초가 지나면 갱신하며 생성은 별도 스레드에서 비동기로 돈다. denoising 5스텝으로 만든 50스텝 chunk 중 15~25스텝을 실행한다. metadata에는 classifier-free guidance를 걸어 원하는 속도로 밀 수 있고 β는 1.3·1.7·2.2를 쓴다.

### 데이터와 로봇

demonstration, policy 평가에서 나온 자율 데이터, rollout 중 사람 개입, 오픈소스 로봇 데이터셋, 사람 1인칭 영상, 웹 비로봇 데이터가 함께 들어간다. π*0.6이 강화학습 도중 남긴 데이터도 그대로 써서 RL specialist의 동작을 generalist가 distillation으로 물려받는다. 다만 일반화를 재는 평가 과제의 자율 데이터는 학습에서 뺐다.

로봇은 양팔 이동형 manipulator, 정적 양팔 BiPi, 양팔 UR5e(Robotiq 그리퍼), BiPi와 같은 팔의 단완 시스템 넷이다. UR5e는 20Hz, 나머지는 50Hz다. cross-embodiment 실험에서 UR5e가 어려운 이유는 팔이 훨씬 길고 무거우며 테이블 양옆에 놓이고 그리퍼 형상도 달라서다.

## 결과 (Results)

![[assets/ai-2026-pi07-a-steerable-generalist-robotic/fig06.png]]
*Figure 6: 위는 π\*0.6 RL specialist 대비 빨래·에스프레소·상자 조립의 성공률과 정규화 throughput, 아래는 π0.6 SFT specialist 대비 6개 과제의 task progress (Physical Intelligence 2026, Fig. 6)*

과제별 post-training 없이 specialist를 따라잡는지가 첫 질문이다. π*0.6 RL specialist와 붙인 네 과제에서 성공률은 대등하고, 정규화 throughput은 다양 품목 빨래와 상자 조립에서 1.4~1.5배로 앞선다. throughput은 시간당 성공 횟수를 specialist 기준으로 정규화한 값이다. π0.6 SFT specialist와 붙인 여섯 과제(땅콩버터 샌드위치·셔츠 뒤집기·문 통과·애호박 썰기·채소 깎기·쓰레기 버리기)도 비슷하게 나온다. metadata를 빼거나 자율 평가 데이터를 뺀 ablation은 전 항목에서 뒤지며 격차는 throughput에서 가장 크다.

지시 따르기는 처음 보는 주방 네 곳과 침실 두 곳, 14개 시나리오에서 잰다. 각 시나리오가 3~6단계 지시를 순서대로 요구하고, π0.5·π0.6을 큰 폭으로 앞선다. "수프 먹을 때 쓸 물건을 집어라"처럼 우회하는 표현이나 "가장 큰 접시 위의 과일"처럼 공간 관계를 따지는 표현에서 격차가 벌어지고, subgoal image를 주면 한 단계 더 오른다. 학습 데이터와 반대로 시키는 과제(쓰레기를 식기통에, 식기를 쓰레기통에)도 π0.7만 해내는데, 냉장고↔전자레인지를 뒤집는 쪽은 subgoal image 없이는 성공하지 못한다.

![[assets/ai-2026-pi07-a-steerable-generalist-robotic/fig12.png]]
*Figure 12: 왼쪽은 재배치 계열 4과제, 오른쪽은 수건·셔츠 개기. 형상 격차가 커질수록 π0.5가 먼저 무너지고 셔츠 개기에서는 사람 조작자 수준(파선)에 근접한다 (Physical Intelligence 2026, Fig. 12)*

cross-embodiment 전이는 격차를 단계적으로 키우며 본다. 여러 로봇에서 모은 Table Setting은 세 모델이 다 하고, 데이터 원천이 하나뿐인 Bag In Backpack·Organize Tupperware에서 π0.5가 무너지며, 정적 양팔에서 단완 UR5e로 넘기는 Shirt Bagging에서 π0.7이 크게 앞선다. 전이가 동작 복사가 아니라는 관찰이 함께 붙는다. 키 작은 양팔 로봇은 한 팔로 봉투를 벌리고 다른 팔로 넣지만 팔이 긴 UR5e는 단완 pick-and-place로 끝내고, 빨래 개기에서도 원본 로봇의 기울인 grasping 대신 UR5e에서는 수직으로 쥔다.

사람과 직접 붙인 결과가 이 절의 핵심이다. teleoperation 경력 상위 2%인 조작자 10명(평균 375시간)도 UR5e에서 셔츠를 개어본 적은 없어 사람에게도 zero-shot 조건이었다. 사람은 task progress 90.9%·성공률 80.6%, π0.7은 85.6%·80%였다.

![[assets/ai-2026-pi07-a-steerable-generalist-robotic/fig15.png]]
*Figure 15: 에어프라이어 넣기·빼기와 베이글 굽기. 지시를 따라가는 능력이 부족한 이전 모델은 coaching을 받아도 거의 진행하지 못한다 (Physical Intelligence 2026, Fig. 15)*

조합적 일반화는 두 갈래로 나뉜다. 짧은 과제는 그냥 된다 — 프렌치프레스 손잡이 누르기, 밥솥에 쌀 담기, 자와 헤드폰 닦기, 기어 세트와 탁상 선풍기 돌리기 모두 전용 데이터가 없다. 5분쯤 걸리는 장기 과제는 한 줄 지시로 안 되고, 대신 사람이 "왼손으로 에어프라이어 손잡이를 잡아라" 식으로 단계를 불러준다. 그 coaching 기록으로 high-level policy를 학습시키면 사람 없이 돌아가는 자율 policy가 되고, 다섯 과제에서 coaching과 비슷한 진행도를 낸다. teleoperation 데이터를 새로 모으지 않고 새 장기 과제를 얻는 경로다.

![[assets/ai-2026-pi07-a-steerable-generalist-robotic/fig18.png]]
*Figure 18: 왼쪽은 데이터를 늘려 평균 품질이 떨어져도 metadata가 있으면 throughput이 계속 오른다는 것, 오른쪽은 과제 다양성 상위 20%를 빼면 미학습 과제 성능이 무너진다는 것 (Physical Intelligence 2026, Fig. 18)*

마지막 실험이 논문의 주장을 지탱한다. 빨래 데이터를 품질·속도 기준 상위 30·50·80·100%로 나눠 metadata 유무를 교차한 여덟 모델을 학습했다. metadata가 있으면 데이터를 키울수록 평균 품질이 떨어지는데도 시간당 성공이 12.8에서 22.8로 오르고, 없으면 80% 지점에서 12 근처를 찍고 100%에서 9.3으로 내려간다. 같은 데이터가 손해가 되느냐 이득이 되느냐를 metadata가 가른다. 다양성 쪽에서는 과제 다양성 상위 20%를 뺀 모델이 무작위 20%를 뺀 대조군보다 크게 낮다 — 회전체 돌리기 48%→8%, 사무용품 닦기 46%→6% 수준이다.

## 한계 (Limitations)

zero-shot 일반화 성공률은 60~80%대로, 학습 분포 안 과제의 90% 초과와 대비된다. 저자들은 π0.7의 steerability를 살려 시험 과제 자체에서 배우는 방향 — 더 자세한 language coaching이나 자율 강화학습 — 을 다음 단계로 든다.

더 근본적인 문제는 측정 쪽이다. 데이터가 워낙 크고 다양해서 어떤 과제가 진짜 미학습인지 확정하기 어렵다. 의도적으로 모으지 않은 과제라도 다른 라벨로, 또는 다른 과제를 하다 부수적으로 비슷한 skill이 들어와 있을 수 있다. 저자들은 이게 언어 모델 일반화를 이해하는 문제와 같은 성격이며 재조합해 푸는 것 자체가 compositional generalization이라고 반론한다. 실용적 결론은 어느 쪽이든 같다는 것이다.

계산 비용도 가볍지 않다. subgoal 생성은 14B 모델의 반복 denoising이라, H100 4장에 4-way tensor parallelism을 걸고 큰 행렬 곱을 8비트로 양자화하며 SageAttention 변형을 써서 25 denoising 스텝을 1.25초로 맞췄다. 실행 시점에는 비동기라 최악의 추론 시간이 127ms다.

## 관련 페이지 (Related Pages)

- [[physical-ai/physical-intelligence-2026-a-steerable-model-with-emergent]] — 같은 날 공개된 발표 글. 영상 데모와 에어프라이어 지식의 출처 추적이 여기 있다
- [[physical-ai/amin-2025-pistar06-a-vla-that-learns]] — 직전 모델 π\*0.6과 RECAP. π0.7이 distillation으로 흡수한 experience가 여기서 나왔다
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]] — subtask instruction과 co-training 레시피의 출처
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]] — flow matching action expert 구조의 원형
- [[physical-ai/physical-intelligence-openpi]] — π 계열 오픈소스 구현
- [[physical-ai/hou-2026-world-model-for-robot-learning]] — world model을 policy에 붙이는 방식의 지형도. π0.7은 subgoal image 생성기로 쓴다
- [[overviews/physical-ai-overview]] — 도메인 허브
- [[overviews/glossary-physical-ai]] — 용어 canonical 표기
