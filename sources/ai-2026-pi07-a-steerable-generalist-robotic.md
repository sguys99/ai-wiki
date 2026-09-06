---
title: "π0.7: a Steerable Generalist Robotic Foundation Model with Emergent Capabilities"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic.pdf
raw_filename: "ai-2026-pi07-a-steerable-generalist-robotic.pdf"
source_collection: external
authors: "Physical Intelligence (성 알파벳순 87인 공저 — Bo Ai·Ali Amin·Ashwin Balakrishna·Kevin Black·Danny Driess·Chelsea Finn·Karol Hausman·Brian Ichter·Sergey Levine·Suraj Nair·Karl Pertsch·Lucy Xiaoyang Shi·Jost Tobias Springenberg·Marcel Torne·Quan Vuong 등)"
url: "https://www.pi.website/blog/pi07"
tags: [physical-ai, vla, world-model, manipulation]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig01.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig01.png
    caption: "π0.7 전체 구성. 왼쪽 robot data(시연 데이터와 자율 데이터)와 오른쪽 non-robot data(웹 멀티모달 데이터, 사람 1인칭 영상)가 language instruction, subgoal image, episode metadata 세 가지 prompt로 묶여 학습에 들어가고, 추론 때는 high-level policy와 world model, 지정한 metadata가 그 자리를 채운다"
    page: 1
    bbox_norm: [0.0702, 0.3049, 0.9298, 0.7252]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig02.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig02.png
    caption: "아키텍처. SigLIP 400M vision encoder와 Gemma 4B backbone이 observation memory, task/subtask instruction, subgoal image, metadata를 받고 860M action expert가 flow matching으로 action을 낸다. subtask는 사람이나 high-level policy가, subgoal image는 BAGEL 14B world model이 만든다"
    page: 4
    bbox_norm: [0.0668, 0.0606, 0.9298, 0.3991]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig03.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig03.png
    caption: "prompt 구성 예시. '식탁에 음식 놓기'와 '셔츠 개기' 두 과제에서 observation, subgoal image, subtask instruction, metadata가 다섯 단계에 걸쳐 어떻게 짝을 이루는지 보여준다"
    page: 6
    bbox_norm: [0.1752, 0.0606, 0.8248, 0.4441]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig04.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig04.png
    caption: "실험에 쓴 로봇. 양팔 이동형 manipulator, 정적 양팔 BiPi, cross-embodiment 실험용 양팔 UR5e"
    page: 7
    bbox_norm: [0.4644, 0.5870, 1.0000, 0.7988]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig05.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig05.png
    caption: "long-horizon 과제 평가 예시. 'take out the trash'처럼 한 줄 지시문으로 끝까지 가는 과제와, 학습 데이터에 없어 단계별 지시문으로 coaching해야 하는 'toasting a bagel'"
    page: 8
    bbox_norm: [0.0800, 0.0000, 0.9357, 0.2706]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig06.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig06.png
    caption: "out-of-the-box 성능. 위는 π*0.6 RL specialist 대비 빨래, 에스프레소, 상자 조립의 성공률과 정규화 throughput이고, 아래는 π0.6 SFT specialist 대비 6개 과제의 task progress다"
    page: 9
    bbox_norm: [0.0702, 0.0606, 0.9298, 0.5163]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig07.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig07.png
    caption: "prompt 구성과 평가 데이터 ablation. metadata를 뺀 모델과 자율 평가 데이터를 뺀 모델 모두 π0.7보다 낮고, 격차는 throughput에서 가장 크다"
    page: 9
    bbox_norm: [0.0702, 0.5710, 0.9298, 0.7587]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig08.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig08.png
    caption: "memory가 필요한 과제. 머그 3개 교체, 물건 찾기, 커피 뜨기, 창 닦기에서 fine-tuning 없이 π0.6-MEM SFT specialist와 비슷하거나 더 낫다"
    page: 10
    bbox_norm: [0.0702, 0.0606, 0.5000, 0.1646]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig09.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig09.png
    caption: "미학습 환경에서의 지시 따르기. 처음 보는 주방 4곳과 침실 2곳의 14개 시나리오에서 3~6단계 지시문을 얼마나 따라갔는지 보여준다"
    page: 11
    bbox_norm: [0.0702, 0.0606, 0.9298, 0.2763]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig10.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig10.png
    caption: "복잡한 지시 표현. 표준 지시문에서는 세 모델이 비슷하지만 '수프 먹을 때 쓰는 물건'처럼 우회 표현이 들어가면 π0.7이 앞서고, subgoal image를 주면 더 올라간다"
    page: 11
    bbox_norm: [0.0483, 0.2805, 0.5000, 0.4753]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig11.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig11.png
    caption: "데이터 편향 깨기. 학습 데이터와 반대로 지시한 Reverse Bussing과 Reverse Fridge to Microwave. 후자는 subgoal image 조건이 성공의 관건이다"
    page: 11
    bbox_norm: [0.0702, 0.5742, 0.5524, 0.7069]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig12.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig12.png
    caption: "cross-embodiment 전이. 왼쪽은 재배치 계열 4과제, 오른쪽은 수건과 셔츠 개기다. 형상 격차가 커질수록 π0.5가 먼저 크게 하락하고, 셔츠 개기에서는 사람 조작자 수준(파선)에 근접한다"
    page: 12
    bbox_norm: [0.0638, 0.0606, 0.9468, 0.3301]
    strategy: caption-region
    curated: true
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig13.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig13.png
    caption: "전이 과정에서 나타난 전략 변화. 목표 로봇의 팔 길이와 배치에 맞춰 쥐는 방식 자체를 바꾼다"
    page: 12
    bbox_norm: [0.0702, 0.4570, 0.5129, 0.6730]
    strategy: caption-region
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig14.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig14.png
    caption: "language coaching 예시. 에어프라이어에 고구마를 넣는 미학습 과제를 다섯 마디 지시문으로 단계별로 이끈다"
    page: 13
    bbox_norm: [0.0404, 0.0553, 0.9298, 0.1783]
    strategy: caption-region
    curated: false
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig15.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig15.png
    caption: "long-horizon 과제 coaching 결과. 에어프라이어 넣기와 빼기, 베이글 굽기 세 과제에서 지시를 따라가는 능력이 부족한 이전 모델은 거의 진행하지 못한다"
    page: 13
    bbox_norm: [0.0652, 0.2224, 0.5018, 0.4346]
    strategy: manual
    curated: true
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig16.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig16.png
    caption: "coaching 데이터로 만든 자율 policy. 사람이 실시간으로 불러주던 지시문을 high-level policy가 대신하며, 5개 과제에서 coaching과 비슷한 task progress를 낸다"
    page: 13
    bbox_norm: [0.0702, 0.5024, 0.5000, 0.6485]
    strategy: caption-region
    curated: false
  - id: fig17
    label: Figure 17
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig17.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig17.png
    caption: "미학습 단기 과제. 프렌치프레스 누르기, 밥솥에 쌀 담기, 사무용품 닦기, 회전체 돌리기를 전용 데이터 없이 수행한다"
    page: 13
    bbox_norm: [0.4932, 0.2204, 0.9328, 0.3716]
    strategy: manual
    curated: false
  - id: fig18
    label: Figure 18
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig18.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig18.png
    caption: "데이터 규모와 다양성 ablation. 왼쪽은 데이터를 늘려 평균 품질이 떨어져도 metadata가 있으면 throughput이 계속 오른다는 것, 오른쪽은 과제 다양성 상위 20%를 빼면 미학습 과제 성능이 크게 하락한다는 것을 보여준다"
    page: 14
    bbox_norm: [0.0702, 0.0606, 0.9298, 0.2401]
    strategy: caption-region
    curated: true
  - id: fig19
    label: Figure 19
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig19.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig19.png
    caption: "VLA와 world model의 attention mask. image goal 유무, metadata CFG 추론, goal generator의 학습 분기와 추론 분기"
    page: 22
    bbox_norm: [0.4997, 0.0604, 0.9300, 0.3615]
    strategy: caption-region
    curated: false
  - id: fig20
    label: Figure 20
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig20.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig20.png
    caption: "joint 제어와 end-effector 제어 비교. cross-embodiment 과제 전반에서 두 제어 모드의 차이가 뚜렷하지 않다"
    page: 23
    bbox_norm: [0.1402, 0.0544, 0.8498, 0.2386]
    strategy: manual
    curated: false
  - id: fig21
    label: Figure 21
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig21.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig21.png
    caption: "사람 대조군 10인의 teleoperation 경력. 목표 로봇인 양팔 UR5e 경험은 거의 없고 전체 경력은 평균 375시간이다"
    page: 23
    bbox_norm: [0.0682, 0.2684, 0.4448, 0.4656]
    strategy: manual
    curated: false
  - id: fig22
    label: Figure 22
    kind: figure
    file: assets/ai-2026-pi07-a-steerable-generalist-robotic/fig22.png
    raw: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic-figures/fig22.png
    caption: "셔츠 개기에서 π0.7 (GC)과 사람 조작자 비교. task progress 85.6% 대 90.9%, 성공률 80% 대 80.6%"
    page: 23
    bbox_norm: [0.0682, 0.5234, 0.4448, 0.6676]
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

prompt에 "무엇을 할지"만이 아니라 "어떻게 할지"까지 담아 품질이 뒤섞인 대규모 데이터를 거르지 않고 학습에 넣은 5B VLA가 π0.7이다. specialist 수준의 dexterity를 fine-tuning 없이 내면서 cross-embodiment 전이와 조합적 일반화의 초기 징후를 보인다.

## 1. 자료 정보 (Document Information)

- 제목: π0.7: a Steerable Generalist Robotic Foundation Model with Emergent Capabilities
- 저자: Physical Intelligence 소속 87인 공저 (성 알파벳순 나열, Bo Ai가 첫 이름)
- 공개: 2026년 4월 16일, 블로그와 PDF 동시 공개 (arXiv 번호 없음)
- 분량: 25페이지 (본문 15페이지 + 참고문헌 + Appendix A~F)
- 프로젝트 페이지: https://www.pi.website/pi07
- 원본: `raw/papers/ai-2026-pi07-a-steerable-generalist-robotic.pdf`

읽기는 "pi zero point seven"이다. π0.6 VLA에 MEM의 memory 구조를 결합하고 prompt를 넓힌 후속 모델이다. 별표가 붙은 π*0.6이 강화학습으로 개별 과제의 천장을 끌어올린 방향이었다면, π0.7은 그렇게 만들어진 데이터까지 포함해 잡다한 것을 하나의 generalist policy로 되돌리는 방향이다. generalist policy는 과제별 fine-tuning 없이 한 모델로 여러 downstream 과제를 푸는 policy를 말한다.

## 2. 주요 기여 (Key Contributions)

foundation model은 크고 다양한 데이터로 학습하면 generalist 능력이 따라온다는 전제 위에 서 있다. 언어 모델에서는 이게 잘 작동한다. 영어를 프랑스어로 옮길 줄 알고 JSON을 뽑을 줄 알면 프랑스어 번역을 JSON으로 내놓는다. 로봇에서는 재현되지 않았다. 기존 VLA는 새 과제로 넘어가기는커녕 학습한 과제조차 과제별 fine-tuning 없이는 매끄럽게 해내지 못했다.

논문이 짚는 원인은 데이터의 성격이다. 다양하다는 말은 전략과 숙련도가 뒤섞여 있다는 뜻이기도 하다. 그대로 학습하면 모델이 서로 다른 mode를 평균 내 어중간한 동작을 낸다. 그래서 실무에서는 데이터를 걸러 쓴다. 손이 많이 가고 과제마다 기준이 달라지며 버리는 정보도 많다.

π0.7은 거르는 대신 라벨을 붙인다. episode마다 무엇을 했는지에 더해 얼마나 빨랐는지, 품질이 몇 점인지, 중간에 실수가 있었는지를 prompt에 적는다. 여기에 subtask 텍스트와 subgoal image, 제어 모드가 붙어 문맥이 넓어진다. 이미지와 영상 생성 쪽의 prompt expansion과 발상이 겹치는데, 로봇에서는 언어만으로 적기 어려운 것(깔끔하게 갠 티셔츠가 어떻게 생겼는지 같은 것)이 있어 이미지 modality가 함께 들어간다는 점이 다르다.

이렇게 학습한 결과로 저자들이 내세우는 능력은 넷이다. 과제별 post-training 없이 에스프레소 머신 조작이나 빨래 개기 같은 장기 dexterous 과제를 해내는 out-of-the-box 성능, 처음 보는 환경에서 열린 지시를 따라가는 언어 일반화, 해당 과제 데이터를 한 번도 본 적 없는 로봇에서 바로 동작하는 cross-embodiment 전이, 그리고 학습에서 본 skill을 새 조합으로 엮어 미학습 과제를 푸는 조합적 일반화다. 조합적 일반화는 compositional generalization의 번역어로, 저자들이 로봇 foundation model의 grand challenge라고 부르는 지점이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 모델 구성

총 5B 파라미터다. backbone은 Gemma3 4B VLM이고 그 안에 400M vision encoder가 들어 있다. vision encoder는 MEM의 video history encoder 설계를 따라 history 프레임을 시간과 공간으로 압축해, 프레임이 몇 장이든 고정된 개수의 토큰을 낸다. 출력부는 860M action expert다. action expert는 로봇 상태와 action 토큰만 처리하도록 분리한 별도 가중치 묶음을 말한다. flow matching으로 연속값 action을 예측하며, timestep 정보는 adaptive RMSNorm으로 주입한다. action 토큰은 50개로 고정되어 chunk 50스텝에 대응한다.

학습 레시피는 knowledge insulation을 쓴다. backbone은 FAST token으로 지도하고, action expert가 backbone activation을 참조하되 gradient는 backbone으로 흘리지 않는 구성이다. backbone 쪽은 비교적 안정적인 이산 cross-entropy 손실로만 학습된다.

입력은 카메라 최대 4대다. 전방, 손목 둘, 이동형 로봇의 후방이 옵션으로 붙는다. 각 카메라마다 history 프레임을 최대 6장 받고 stride는 1초다. subgoal image는 최대 3장이며 후방 뷰는 뺀다. observation과 subgoal image 모두 448x448로 맞춘다. history 전체는 0.3 확률로, 후방 뷰도 0.3 확률로 dropout된다.

attention은 block-causal이다. observation 토큰끼리, subgoal image 토큰끼리는 각각 양방향으로 보고, goal image 토큰은 observation도 볼 수 있다. 뒤따르는 텍스트 토큰은 causal이다. proprioception은 π0.6의 이산 텍스트 토큰 방식 대신 linear projection으로 backbone 차원에 임베딩하며, history state마다 토큰 하나를 차지한다. 프레임이 dropout되면 대응하는 state 토큰도 마스킹된다.

추론 지연에 대비해 real-time action chunking의 학습 시점 버전을 쓴다. 0~12 timestep의 지연을 학습 중에 흉내 내는데, 50Hz 로봇 기준 최대 240ms에 해당한다.

### prompt를 이루는 네 가지

subtask instruction은 π0.5에서 이어진 요소다. "주방을 치워라" 같은 전체 과제 설명과 별개로 "냉장고 문을 열어라" 같은 중간 단계를 텍스트로 준다. 실행 시점에는 학습된 high-level policy가 내놓거나 사람이 직접 불러준다. 사람이 부르는 쪽이 language coaching이 된다.

subgoal image는 언어가 놓치는 실행 세부를 메운다. "냉장고 문을 열어라"는 팔이 손잡이를 어떻게 잡아야 하는지를 말해주지 않는다. 여러 view의 목표 장면을 함께 주면 물체 배치는 전방 뷰가, end-effector 자세는 손목 뷰가 각각 짚어준다. 실행 시점에는 경량 world model이 만든다. 이 world model은 BAGEL 14B mixture-of-transformers에서 초기화하고 flow matching 손실로 학습하며, 현재 observation과 subtask instruction, metadata를 받는다. SuSIE와 같은 계보다. 웹 규모 이미지 편집과 생성 데이터로 pre-training된 덕에 로봇 데이터에 없는 개념도 subgoal 이미지 형태로 π0.7에 옮겨온다.

episode metadata는 세 항목이다. 전체 속도는 episode 길이를 timestep 수로 세어 500 단위로 이산화한다(1750~2250은 "2000 steps"로 묶인다). 전체 품질은 1~5점이다. 실수 여부는 해당 action 구간에서 물체 잡기에 실패했거나 엉뚱한 subtask를 했는지를 사람이 거칠게 표시한 이진 라벨이다.

제어 모드는 `joint`와 `ee` 중 하나를 텍스트 식별자로 넣는다.

### dropout과 실행 설정

학습 중에는 각 prompt 요소를 확률적으로 빼서, 시험 시점에 아무 부분집합이나 쓸 수 있게 만든다. subgoal image는 배치의 25%에만 넣는다. 이미지가 있으면 action 예측이 사실상 inverse dynamics 문제로 바뀌어 학습이 지나치게 빨라지기 때문이다. 이미지가 들어간 예시 중 30%는 subtask 텍스트를 뺀다. 이미지가 텍스트보다 더 자세히 같은 내용을 말해주는 경우가 많아서다. metadata는 15% 확률로 통째로 빠지고, 속도와 품질과 실수 각 항목은 추가로 5%씩 빠진다. 제어 모드에는 dropout을 걸지 않는다.

subgoal 학습에 쓸 실제 프레임은 0.25 확률로 segment 끝 프레임을, 0.75 확률로 0~4초 뒤 구간에서 균등하게 뽑는다. 여기에 world model이 실제로 생성한 이미지도 섞어 학습과 실행 사이의 이미지 품질 차이를 줄인다.

실행할 때는 제어 모드와 metadata를 항상 넣는다. 속도는 과제별 episode 길이의 15퍼센타일, 품질은 5, 실수는 false로 고정한다. subgoal image는 subtask가 바뀌거나 마지막 생성으로부터 4초가 지나면 갱신하며, 생성은 별도 스레드에서 asynchronous inference로 처리된다. denoising 5스텝으로 50스텝 chunk를 만든 뒤 그중 15~25스텝을 실행한다. metadata에는 classifier-free guidance를 걸어 원하는 속도 쪽으로 action을 밀 수 있고, 가중치 β는 1.3, 1.7, 2.2를 쓴다.

### 데이터와 로봇

학습 데이터에는 여러 플랫폼에서 모은 시연 데이터(demonstration), policy 평가 과정에서 나온 자율 데이터, rollout 중 사람이 끼어들어 만든 개입 데이터, 오픈소스 로봇 데이터셋, 사람 1인칭 영상, 웹 비로봇 데이터(물체 위치와 속성 예측, VQA, 텍스트, 영상 captioning)가 들어간다. π*0.6이 강화학습 도중 남긴 데이터도 그대로 쓴다. RL specialist의 동작을 generalist가 distillation으로 물려받는 셈이다. 다만 일반화를 측정하는 평가 과제의 자율 데이터는 학습에서 뺐다.

로봇은 네 종류다. 6 DoF 팔 둘을 단 양팔 이동형 manipulator, 가벼운 6 DoF 양팔 정적 플랫폼 BiPi, Robotiq 그리퍼를 단 양팔 UR5e, 그리고 BiPi와 같은 팔을 쓰는 단완 시스템이다. 전부 parallel-jaw 그리퍼다. UR5e는 20Hz, 나머지는 50Hz로 동작한다. 카메라는 전방 하나에 팔마다 손목 카메라가 붙고 이동형에는 후방이 추가된다. 모델 출력은 PD 제어기로 내려보내며, end-effector 명령은 수치 역기구학으로 관절 목표로 바꾼다. cross-embodiment 실험에서 UR5e가 어려운 이유는 팔이 훨씬 길고 무거우며 테이블 가장자리가 아니라 양옆에 놓이고 그리퍼 손가락 형상도 달라서다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### fine-tuning 없이 specialist를 따라잡는가

π*0.6 RL specialist와 붙인 네 과제는 티셔츠와 반바지 빨래, 품목이 다양한 빨래의 최난이도 항목, 에스프레소 만들기, 상자 조립이다. 성공률은 대등하고, 정규화 throughput은 다양 품목 빨래와 상자 조립에서 1.4~1.5배로 오히려 앞선다. throughput은 시간당 성공 횟수를 specialist 기준으로 정규화한 값이다. π0.6 SFT specialist와 붙인 여섯 과제(땅콩버터 샌드위치, 셔츠 뒤집기, 문 통과, 애호박 썰기, 채소 깎기, 쓰레기 버리기)에서도 task progress가 비슷하게 나온다.

ablation은 두 요소를 각각 뗀다. metadata를 뺀 모델과 자율 평가 데이터를 뺀 모델 모두 전 항목에서 π0.7보다 낮고, 격차는 throughput에서 가장 크다. 품질이 들쭉날쭉한 평가 데이터를 쓰려면 그것을 구분해줄 metadata가 함께 있어야 한다는 것이 저자들의 해석이다.

memory가 필요한 과제도 시험한다. 머그 세 개 위치 바꾸기, 물건 찾기, 커피 뜨기, 창 닦기에서 해당 과제로 fine-tuning된 π0.6-MEM specialist와 비슷하거나 더 낫다.

### 지시를 얼마나 따라가는가

처음 보는 주방 네 곳과 침실 두 곳에서 14개 시나리오를 수행한다. 각 시나리오는 3~6단계 지시를 순서대로 따라가야 끝난다. 물건 정리, 가구 조작, 흘린 것 닦기 같은 실제 상황을 섞었고, π0.5와 π0.6을 큰 폭으로 앞선다.

지시 표현을 일부러 비틀어 본 실험도 있다. "숟가락을 집어라" 같은 표준 지시는 세 모델이 다 하지만, "수프 먹을 때 쓸 물건을 집어라"나 "가장 큰 접시 위의 과일을 집어라"처럼 우회하거나 공간 관계를 따져야 하는 지시에서 갈린다. subgoal image를 함께 주면 여기서 한 단계 더 오른다.

데이터 편향을 거스르는 지시도 시험한다. 학습 데이터의 bussing 과제는 쓰레기를 쓰레기통에, 식기를 식기통에 넣는다. Reverse Bussing은 그 반대를 시킨다. Reverse Fridge to Microwave는 냉장고에서 전자레인지로만 옮기던 데이터에 대고 반대 방향을 시킨다. π0.7이 이전 모델을 크게 앞서고, 특히 후자는 subgoal image 조건이 성공의 관건이다. world model이 웹 규모 이미지 생성 pre-training을 살려 텍스트만 보고도 목표 장면을 만들어내기 때문이다.

### 다른 로봇으로 건너가는가

재배치 계열부터 본다. Table Setting은 이동형, 정적, 단완 등 여러 로봇에서 데이터를 모아 정적 양팔에서 시험하는데, 세 모델이 다 잘한다. 데이터 원천이 하나뿐이고 목표 로봇이 더 작은 Bag In Backpack과 Organize Tupperware에서는 π0.5가 크게 하락하고 π0.6과 π0.7은 성능을 유지한다. 격차를 더 벌린 Shirt Bagging은 정적 양팔에서 모은 데이터를 단완 UR5e에서 시험하는데, 여기서 π0.7이 크게 앞선다.

전이가 원본 동작의 복사가 아니라는 점이 관찰로 남는다. 키가 작은 양팔 로봇은 한 팔로 봉투를 벌리고 다른 팔로 넣지만, 팔이 긴 UR5e는 단완 pick-and-place로 같은 일을 끝낸다. 빨래 개기에서도 원본 로봇에서는 end-effector를 기울여 천을 테이블에 눌렀다가 들지만, UR5e에서는 그 팔의 기구학에 맞는 수직 grasping을 쓴다.

사람과 직접 붙인 결과가 이 절의 하이라이트다. teleoperation 경력 상위 2%인 조작자 10명(전체 평균 375시간)을 모집했는데, 이들도 UR5e에서 셔츠를 개어본 적은 없어 사람에게도 zero-shot 조건이다. 사람은 task progress 90.9%, 성공률 80.6%였고 π0.7은 85.6%와 80%였다.

### 새 과제를 조합해 푸는가

미학습 단기 과제는 그대로 된다. 프렌치프레스 손잡이 누르기, 밥솥에 쌀 담기, 자와 헤드폰 같은 사무용품 닦기, 기어 세트와 탁상 선풍기 돌리기 모두 전용 데이터 없이 수행한다.

long-horizon 과제는 한 줄 지시로 안 된다. 에어프라이어로 고구마를 익히는 일은 5분 가까이 걸리고 여러 단계를 거친다. 대신 사람이 단계별로 말을 붙여 끌고 간다. "왼손으로 에어프라이어 손잡이를 잡아라", "왼손으로 열어라", "오른손으로 고구마를 집어라" 식이다. 에어프라이어 넣기와 빼기, 베이글 굽기 세 과제에서 π0.7은 coaching을 따라 끝까지 가지만, 지시를 따라가는 능력이 부족한 이전 모델은 거의 진행하지 못한다.

coaching 기록은 재활용된다. 그때 사람이 불러준 단계별 지시로 high-level policy를 학습시키면 사람 없이 돌아가는 자율 policy가 된다. 다섯 과제에서 coaching과 비슷한 진행도를 낸다. 저수준 action 데이터를 teleoperation으로 새로 모으지 않고 새 long-horizon 과제를 얻는 경로다.

### 데이터를 키우면 좋아지는가

빨래(티셔츠와 반바지) 데이터를 품질과 속도 기준으로 상위 30%, 50%, 80%, 100% 네 구간으로 나누고, metadata 유무를 교차해 여덟 모델을 처음부터 학습했다. metadata가 있으면 데이터를 키울수록 평균 품질이 떨어지는데도 시간당 성공 횟수가 12.8회에서 22.8회로 오른다. 없으면 80% 지점에서 12회 근처를 찍고 100%에서 9.3회로 내려간다. 걸러내지 않은 데이터가 손해가 되느냐 이득이 되느냐를 metadata가 가른다는 뜻이다.

다양성 쪽 실험은 과제 다양성 상위 20%를 뺀 모델과 무작위 20%를 뺀 대조군을 비교한다. 데이터 양은 같다. 미학습 단기 과제에서 다양성을 뺀 쪽이 크게 낮다. 회전체 돌리기는 48% 부근에서 8% 부근으로, 사무용품 닦기는 46% 부근에서 6% 부근으로 떨어진다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

zero-shot 일반화의 성공률은 60~80%대다. 학습 분포 안에 있는 과제가 90%를 넘는 것과 대비된다. 저자들은 π0.7의 높은 steerability를 살려 시험 과제 자체에서 효율적으로 배우는 방향(더 자세한 language coaching이나 자율 강화학습)을 다음 단계로 든다.

더 근본적인 한계는 측정 쪽에 있다. 데이터가 워낙 크고 다양해서 어떤 과제가 진짜 "미학습"인지 확정하기 어렵다. 의도적으로 데이터를 모으지 않은 과제라도 다른 라벨로, 또는 다른 과제를 수행하다 부수적으로 비슷한 skill이 들어와 있을 수 있다. 저자들은 이게 언어 모델의 일반화를 이해하는 문제와 같은 성격이라고 보며, 새 조합으로 재구성해 푸는 것 자체가 compositional generalization의 본질이라고 반론한다. 실용적으로도 결론은 같다. 과제마다 데이터를 새로 모으는 대신 시키기만 하면 된다.

계산 비용은 부록에 남아 있다. subgoal 생성이 14B 모델의 반복 denoising이라 무겁다. H100 4장에 4-way tensor parallelism을 걸고 큰 행렬 곱을 8비트로 양자화하며 SageAttention 변형을 backbone attention에 써서, 총 시퀀스 길이 1만 토큰 가까운 생성을 25 denoising 스텝에 1.25초로 맞췄다. 실행 시점에는 비동기라 π0.7이 계속 움직이는 동안 다음 subgoal이 만들어지고, 최악의 경우 추론 시간은 127ms다.

## 6. 관련 연구 (Related Work)

generalist manipulation policy 계보에서 π0.7의 위치는 명확하다. 처음부터 학습하는 계열, VLM으로 초기화하는 계열, 영상 생성 모델로 초기화하는 계열이 있는데 π0.7은 두 번째다. VLA의 구성요소로 따로 연구되던 memory, 장기 계획을 위한 계층 구조, goal image 조건화를 한 모델에 모았다고 밝히며, π0.6-MEM 아키텍처 위에 올렸다.

데이터 원천 쪽에서는 웹 데이터(RT-2), 사람 1인칭 영상, 자율 로봇 경험을 pre-training에 넣은 선행 연구들을 모두 끌어온다. goal image 조건화는 SuSIE와 CoT-VLA 등 이미 두터운 계보가 있고, world model 초기화도 SuSIE를 따른다.

저자들이 선을 긋는 지점은 기여의 성격이다. 새 아키텍처나 모델 설계를 내놓는 것이 아니라, VLA가 더 다양한 데이터를 쓰게 만드는 방법론과 그것이 조합적 일반화로 이어진다는 실증이 기여라고 말한다. 빨래 개기 같은 dexterous skill의 zero-shot cross-embodiment 전이와 에어프라이어 조작 같은 새 물체 상호작용은 선행 연구의 정량 개선을 넘어선다는 주장이다.

## 7. 용어집 (Glossary)

이 자료 고유의 용어만 적는다. policy, observation, action, flow matching 등 도메인 공통 용어는 [[overviews/glossary-physical-ai]]를 따른다.

| 용어 | 뜻 |
|---|---|
| π0.7 | Physical Intelligence의 5B VLA. π0.6과 MEM 위에 다중 modality 문맥 조건화를 결합했다 |
| diverse context conditioning | 무엇을 할지에 더해 어떻게 할지를 담은 여러 modality를 prompt에 넣어 학습하는 방식. 논문의 중심 아이디어 |
| episode metadata | episode의 속도(길이), 품질(1~5), 실수 여부를 prompt에 적은 라벨. 품질이 뒤섞인 데이터를 구분하는 장치 |
| subgoal image | 현재 subtask가 끝난 직후의 장면을 여러 view로 그린 목표 이미지. 실행 시점에는 world model이 생성한다 |
| language coaching | 사람이 미학습 과제를 단계별 subtask 지시로 불러주며 로봇을 끌고 가는 방식. 그 기록으로 high-level policy를 학습시켜 자율화한다 |
| compositional generalization | 학습에서 본 skill을 새로운 조합으로 엮어 미학습 과제를 푸는 능력. 논문이 grand challenge로 부르는 목표 |
| knowledge insulation (KI) | backbone은 FAST token으로 지도하고 action expert의 gradient는 backbone으로 흘리지 않는 학습 레시피 |
| real-time action chunking (RTC) | 추론 지연이 있어도 action chunk가 매끄럽게 이어지도록 학습 중 0~12 timestep 지연을 흉내 내는 기법 |
| classifier-free guidance (CFG) | 조건을 준 예측과 뺀 예측의 차이를 증폭해 원하는 방향으로 미는 샘플링 기법. π0.7은 metadata에 건다 |
| MEM | π0.6에 붙는 multi-scale embodied memory. history 프레임을 압축해 고정 토큰으로 만드는 encoder를 제공한다 |
| BiPi | Physical Intelligence의 가벼운 6 DoF 양팔 정적 플랫폼. 데이터 상당수가 이 계열 팔에서 나온다 |
| π0.7 (GC) | subgoal image를 조건으로 준 π0.7. GC는 goal-conditioned를 가리키며 그래프의 빗금 막대로 표시된다 |
| throughput | 시간당 성공 횟수. 성공률과 별개로 dexterous 과제의 실용성을 재는 지표다 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | π0.7 전체 구성. 데이터 원천, prompt 세 가지, 학습과 추론 대응 | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 4 | 아키텍처. backbone, action expert, high-level policy, world model | caption-region | ★ wiki 권장 (architecture) |
| fig03 | 6 | prompt 구성 예시 두 과제 (식탁 차리기와 셔츠 개기) | caption-region | ★ wiki 권장 (method) |
| fig04 | 7 | 실험에 쓴 로봇 세 종류 | caption-region | (확인 필요) |
| fig05 | 8 | long-horizon 과제 평가 예시 (쓰레기 버리기와 베이글 굽기) | caption-region | (확인 필요) |
| fig06 | 9 | out-of-the-box 성능. RL/SFT specialist 대비 | caption-region | ★ wiki 권장 (result) |
| fig07 | 9 | metadata와 평가 데이터 ablation | caption-region | (선택) |
| fig08 | 10 | memory 과제 성능 | caption-region | (선택) |
| fig09 | 11 | 미학습 환경 지시 따르기 | caption-region | ★ wiki 권장 (result) |
| fig10 | 11 | 복잡한 지시 표현 | caption-region | (선택) |
| fig11 | 11 | 데이터 편향 깨기 | caption-region | (선택) |
| fig12 | 12 | cross-embodiment 전이. 재배치와 빨래 개기 | caption-region | ★ wiki 권장 (result) |
| fig13 | 12 | 전이 과정의 전략 변화 | caption-region | (선택) |
| fig14 | 13 | language coaching 예시 (에어프라이어) | caption-region | (선택) |
| fig15 | 13 | long-horizon 과제 coaching 결과 | manual (재크롭) | ★ wiki 권장 (result) |
| fig16 | 13 | coaching 데이터로 만든 자율 policy | caption-region | (선택) |
| fig17 | 13 | 미학습 단기 과제 | manual (재크롭) | (선택) |
| fig18 | 14 | 데이터 규모와 다양성 ablation | caption-region | ★ wiki 권장 (result) |
| fig19 | 22 | VLA와 world model의 attention mask | caption-region | (선택) |
| fig20 | 23 | joint 대 end-effector 제어 비교 | manual (재크롭) | (선택) |
| fig21 | 23 | 사람 대조군 10인의 teleoperation 경력 | manual (재크롭) | (선택) |
| fig22 | 23 | 셔츠 개기에서 π0.7 (GC) 대 사람 | manual (재크롭) | (선택) |

`fig15`, `fig17`, `fig20`, `fig21`, `fig22`는 자동 검출이 위쪽 도식까지 함께 삼켜 `--bbox`로 다시 잘랐다.
