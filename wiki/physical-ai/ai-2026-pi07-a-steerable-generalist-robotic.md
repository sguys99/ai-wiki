---
title: "π0.7: a Steerable Generalist Robotic Foundation Model with Emergent Capabilities"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/ai-2026-pi07-a-steerable-generalist-robotic.pdf
raw_filename: "ai-2026-pi07-a-steerable-generalist-robotic.pdf"
source_collection: external
source: ai-2026-pi07-a-steerable-generalist-robotic.md
authors: "Physical Intelligence (성 알파벳순 87인 공저: Bo Ai, Ali Amin, Ashwin Balakrishna, Kevin Black, Danny Driess, Chelsea Finn, Karol Hausman, Brian Ichter, Sergey Levine, Suraj Nair, Karl Pertsch, Lucy Xiaoyang Shi, Jost Tobias Springenberg, Marcel Torne, Quan Vuong 등)"
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
---

## 요약

π0.7은 Physical Intelligence가 2026년 4월 16일에 공개한 5B 규모의 VLA다. 이전 모델과 다른 지점은 아키텍처가 아니라 prompt에 무엇을 담는지에 있다. "주방을 치워라" 같은 과제 설명 옆에 그 episode가 얼마나 빨랐는지, 품질이 몇 점인지, 중간에 실수가 있었는지를 함께 적고, 다음 단계의 장면을 그린 subgoal image까지 붙인다.

이 문맥이 하는 일은 원래라면 버렸을 데이터를 살려 쓰는 것이다. 통상적인 학습 파이프라인은 품질이 낮은 데이터를 걸러내지만, π0.7은 거르는 대신 라벨을 붙여 실패한 episode도 자율 실행에서 나온 어중간한 rollout도 그대로 학습에 넣는다. 실행 시점에 "품질 5점, 실수 없음"으로 지정하면 좋은 쪽 동작만 나온다.

논문 제목의 emergent capability는 이 학습 방식에서 따라 나온 성질을 가리킨다. emergent capability는 학습 데이터에 없던 조합을 모델이 실행해내는 성질을 말한다.

저자들이 내세우는 emergent capability는 네 가지다.

- out-of-the-box 성능: 과제별 post-training 없이 에스프레소 머신 조작, 빨래 개기, 쓰레기 버리기, 상자 접기, 채소 깎기 같은 장기 dexterous 과제를 수행한다.
- 지시 일반화: 학습에 없던 주방과 침실에서 열린 지시문을 따라간다.
- cross-embodiment 전이: 해당 과제 데이터를 한 줄도 보지 못한 로봇에서 빨래를 갠다.
- 조합적 일반화: 학습에서 본 skill을 새 조합으로 엮어 에어프라이어 같은 처음 보는 기기를 다룬다.

![[assets/ai-2026-pi07-a-steerable-generalist-robotic/fig01.png]]
*Figure 1: π0.7 전체 구성. 왼쪽 robot data와 오른쪽 non-robot data가 language instruction, subgoal image, episode metadata 세 가지 prompt로 묶여 학습에 들어가고, 추론 시점에는 high-level policy와 world model, 지정한 metadata가 그 자리를 채운다 (Physical Intelligence 2026, Figure 1).*

## 배경

foundation model은 크고 다양한 데이터로 학습하면 generalist 능력이 따라 나온다는 전제 위에 서 있다. 언어 모델에서는 이 전제가 잘 작동한다. 영어를 프랑스어로 옮길 줄 알고 JSON 형식을 지킬 줄 알면 프랑스어 번역을 JSON으로 내놓고, 학습에서 본 적 없는 연결을 요구하는 문제도 chain-of-thought로 푼다.

로봇에서는 같은 일이 재현되지 않았다. 기존 VLA는 새 과제로 넘어가기는커녕 학습한 과제조차 과제별 fine-tuning 없이는 매끄럽게 수행하지 못했다. 저자들은 이 결핍을 compositional generalization의 부재로 정의한다. compositional generalization은 학습에서 본 skill을 새로운 조합으로 엮어 미학습 과제를 푸는 능력을 말하며, 저자들이 로봇 foundation model의 grand challenge라고 부르는 지점이다.

원인은 데이터의 성격에 있다. 다양하다는 말은 전략과 숙련도가 뒤섞여 있다는 뜻이기도 해서, 그대로 학습하면 모델이 여러 mode를 평균 낸 결과를 낸다. 그래서 통상적인 처방은 데이터를 걸러 고품질 부분집합만 남기는 것이다.

이 처방에는 세 가지 비용이 따른다.

- 사람 손이 많이 간다.
- 기준이 과제마다 달라져 재사용되지 않는다.
- 버리는 데이터 안에 있던 정보가 함께 사라진다.

π0.7의 답은 거르는 대신 설명하는 것이다. 이미지와 영상 생성 분야의 prompt expansion과 발상이 겹치지만, 로봇에서는 텍스트를 자세히 적는 것만으로 부족하다. 성패를 가르는 세부가 더 미묘하거나(episode 전체의 품질 같은 것), 언어만으로는 적기 어렵기(깔끔하게 갠 티셔츠가 어떻게 생겼는지) 때문이다. 따라서 이미지 modality가 prompt에 함께 들어간다.

저자들이 스스로 긋는 선도 분명하다. 새 아키텍처나 모델 설계를 내놓는 것이 아니라, VLA가 더 다양한 데이터를 쓰게 만드는 방법론과 그것이 조합적 일반화로 이어진다는 실증이 기여라는 것이다.

## 핵심 개념

policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. π0.7이 다루는 observation은 카메라 이미지 여러 장과 로봇의 관절 상태를 묶은 것이고, action은 관절 명령이나 end-effector 명령이다.

VLA는 매 timestep 하나의 action만 내지 않고 action chunk를 낸다. action chunk는 policy가 한 번에 출력하는 여러 timestep 분량의 action 묶음이다. π0.7의 chunk 길이는 50스텝이고, 그중 앞쪽 15스텝이나 25스텝만 실제로 실행한 뒤 다시 예측한다.

action chunk를 만드는 모듈이 action expert다. action expert는 로봇 상태와 action 토큰만 처리하도록 분리한 별도 가중치 묶음이며, VLM backbone의 activation을 참조하되 자기 파라미터만 따로 갖는다. 출력은 flow matching으로 낸다. flow matching은 noise에서 목표 분포로 가는 연속 변환의 속도장을 학습하는 생성 기법으로, 하나의 상황에 여러 정답이 있는 로봇 action의 multi-modal 분포를 표현하는 데 쓰인다.

학습 목표는 문맥이 주어졌을 때 action chunk의 로그 우도를 최대화하는 것으로 적힌다. 다만 flow matching action expert가 실제로 최적화하는 것은 닫힌 형태의 로그 우도가 아니라 그 근사 하한이다.

여기서 문맥에 해당하는 것이 prompt다. 기존 VLA에서 prompt는 사람이 적은 지시문(instruction) 한 줄이었다. π0.7은 여기에 subtask instruction, subgoal image, episode metadata, 제어 모드를 더한다.

subgoal image는 현재 subtask가 끝난 직후의 장면을 여러 카메라 시점으로 그린 목표 이미지다. episode metadata는 그 episode의 속도, 품질, 실수 여부를 prompt에 적어 둔 라벨 묶음이다. 두 요소가 함께 있어야 품질이 뒤섞인 데이터를 거르지 않고 쓸 수 있다.

## 방법

### 모델 구성

π0.7의 총 파라미터는 5B다. backbone은 Gemma3 4B VLM이고 그 안에 400M vision encoder가 들어 있으며, 출력부는 860M action expert다.

| 구성 요소 | 규모와 설정 | 역할 |
|---|---|---|
| VLM backbone | Gemma3 4B | 이미지, 텍스트, subgoal image, metadata를 함께 인코딩 |
| vision encoder | 400M, Gemma3에서 초기화 | MEM의 video history encoder 설계를 따라 history를 압축 |
| action expert | 860M Transformer | flow matching으로 연속값 action 예측, timestep은 adaptive RMSNorm으로 주입 |
| world model | BAGEL 14B mixture-of-transformers | 실행 시점에 subgoal image 생성 |
| high-level policy | π0.7과 같은 아키텍처 | 실행 시점에 subtask instruction 생성 |

vision encoder의 압축 방식이 이 모델의 memory를 지탱한다. history 프레임을 시간과 공간 양쪽으로 압축해, 프레임이 몇 장이든 한 장 분량과 같은 개수의 토큰을 낸다. 따라서 history를 길게 잡아도 시퀀스 길이가 늘지 않는다.

학습 레시피는 knowledge insulation을 쓴다. knowledge insulation은 backbone을 FAST token으로 지도하고 action expert의 gradient는 backbone으로 흘리지 않는 학습 레시피다. backbone 쪽은 비교적 안정적인 이산 cross-entropy 손실로만 학습되고, action expert는 backbone의 모든 activation을 참조한다.

입력 구성은 다음과 같다.

- 카메라 최대 4대: 전방 하나, 손목 둘, 이동형 로봇의 후방 하나(옵션).
- 카메라당 history 프레임 최대 6장, 샘플링 stride는 1초.
- subgoal image 최대 3장, 후방 뷰는 제외.
- observation과 subgoal image 모두 448x448 픽셀로 맞춘다.
- history 전체는 0.3 확률로, 후방 뷰는 별도로 0.3 확률로 dropout된다.

attention은 block-causal 구조다. observation 토큰끼리와 subgoal image 토큰끼리는 각각 양방향으로 보고, subgoal image 토큰은 observation 토큰도 볼 수 있으며, 뒤따르는 텍스트 토큰은 causal이다. action 토큰 50개는 서로 양방향이고 backbone activation도 참조한다.

proprioception 처리도 바뀌었다. proprioception은 관절 각도 같은 로봇 자신의 상태 감각 입력이다. π0.6은 이 값을 이산 텍스트 토큰으로 적었지만 π0.7은 MEM을 따라 linear projection으로 backbone 차원에 임베딩하고, history state마다 토큰 하나를 배정한다. 프레임이 dropout되면 대응하는 state 토큰도 함께 마스킹된다.

추론 지연 대비로는 real-time action chunking의 학습 시점 버전을 쓴다. real-time action chunking은 추론 지연이 있어도 action chunk가 매끄럽게 이어지도록 학습 중에 지연을 흉내 내는 기법이다. 학습 중 0에서 12 timestep의 지연을 흉내 내며, 50Hz 로봇 기준 최대 240ms에 해당한다.

![[assets/ai-2026-pi07-a-steerable-generalist-robotic/fig02.png]]
*Figure 2: observation memory, task/subtask instruction, subgoal image, metadata가 backbone으로 들어가고 action expert가 flow matching으로 action을 낸다. subtask는 사람이나 high-level policy가, subgoal image는 BAGEL 14B world model이 만든다 (Physical Intelligence 2026, Figure 2).*

### prompt를 이루는 네 요소

prompt는 네 요소로 이루어지고, 각각 학습 시점과 실행 시점의 출처가 다르다.

| 요소 | 학습 시점 출처 | 실행 시점 출처 | dropout 확률 |
|---|---|---|---|
| subtask instruction | 사람이 구간에 붙인 상세 텍스트 라벨 | high-level policy 또는 사람의 coaching | subgoal image가 있는 예시의 30% |
| subgoal image | 미래 프레임 또는 world model 생성 이미지 | BAGEL 기반 경량 world model | 배치의 75%에서 제외 |
| episode metadata | 실측 길이와 사람의 품질, 실수 라벨 | 사용자가 원하는 값으로 지정 | 전체 15%, 항목별 추가 5% |
| 제어 모드 | 데이터 수집에 쓴 모드 | 과제에 따라 선택 | 없음 |

subtask instruction은 π0.5에서 이어진 요소다. "주방을 치워라" 같은 전체 과제 설명과 별개로 "냉장고 문을 열어라" 같은 중간 단계를 텍스트로 준다. 사람이 이 텍스트를 실시간으로 불러주는 방식이 language coaching이며, 그 기록으로 high-level policy를 학습시키면 사람 없이 실행되는 자율 policy가 된다.

subgoal image는 언어가 놓치는 실행 세부를 메운다. "냉장고 문을 열어라"는 팔이 손잡이를 어떻게 잡아야 하는지를 말해주지 않는다. 여러 시점의 목표 장면을 함께 주면 물체 배치와 환경 상태는 전방 뷰가, end-effector 자세는 손목 뷰가 각각 짚어주어 제어에 필요한 공간 정보가 보강된다.

world model 쪽 설계는 SuSIE 계보를 따른다. BAGEL 14B에서 초기화하고 flow matching 손실로 학습하며, 현재 observation과 subtask instruction, metadata를 받아 해당 구간의 마지막 프레임을 맞히도록 학습한다. 학습 데이터는 시간 분할 품질이 높은 라벨이 붙은 로봇 데이터와 사람 1인칭 영상의 부분집합에 오픈소스 이미지 편집 데이터셋과 영상 데이터셋을 섞은 것이다. 웹 규모 pre-training이 남긴 의미 개념과 물리 개념이 subgoal image를 통해 π0.7로 옮겨온다.

BAGEL의 입력 처리 방식은 두 경로로 나뉜다. 카메라 입력을 의미 이해용 ViT와 세부 표현용 VAE 양쪽으로 처리하며, ViT 토큰은 7B LLM backbone이, VAE 토큰은 7B 생성 backbone이 받는다. 두 경로의 patch 크기가 각각 14와 16이라 입력 해상도도 ViT는 448x336, VAE는 512x384로 다르다.

episode metadata는 세 항목으로 이루어진다.

- 속도: episode 길이를 timestep 수로 세어 500 단위로 이산화한다. 1750에서 2250 사이는 "2000 steps"로 묶인다. 빠른 속도가 대체로 높은 품질과 함께 간다.
- 품질: 과제 수행 품질을 1점에서 5점으로 매긴다. 5점이 가장 높다.
- 실수 여부: 해당 action 구간에서 물체 잡기에 실패했거나 엉뚱한 subtask를 했는지를 사람이 거칠게 표시한 이진 라벨이다.

제어 모드는 `joint`와 `ee` 중 하나를 텍스트 식별자로 넣는다. 관절 수준 action과 end-effector action을 모두 학습에 넣어두고, 실행 시점에 과제에 맞는 쪽을 고른다.

네 요소를 합치면 실제 prompt는 다음 형태가 된다.

```
<Multi-view observation><Multi-view subgoals>
Task: peel vegetables. Subtask: pick up the peeler.
Speed: 8000. Quality: 5. Mistake: false. Control Mode: joint.
<Proprioception>
```

![[assets/ai-2026-pi07-a-steerable-generalist-robotic/fig03.png]]
*Figure 3: '식탁에 음식 놓기'와 '셔츠 개기' 두 과제에서 observation, subgoal image, subtask instruction, metadata가 다섯 단계에 걸쳐 어떻게 짝을 이루는지 보여준다 (Physical Intelligence 2026, Figure 3).*

### dropout과 실행 설정

학습 중에는 각 prompt 요소를 확률적으로 빼서, 시험 시점에 임의의 부분집합만으로도 동작하게 만든다. subgoal image를 배치의 25%에만 넣는 이유가 특히 분명하다. 이미지가 있으면 action 예측이 사실상 현재 프레임과 미래 프레임 사이를 채우는 inverse dynamics 문제로 바뀌어 학습이 지나치게 빨라지기 때문이다.

subgoal image가 들어간 예시 중 30%는 subtask 텍스트를 뺀다. 이미지가 같은 내용을 텍스트보다 더 자세히 말해주는 경우가 많아서다. metadata는 15% 확률로 통째로 빠지고, 속도와 품질과 실수 각 항목은 추가로 5%씩 개별 dropout된다. 제어 모드에는 dropout을 걸지 않는다.

subgoal 학습에 쓸 실제 프레임은 두 방식으로 뽑는다. 0.25 확률로 구간의 끝 프레임을 쓰고, 0.75 확률로 현재 timestep에서 0초에서 4초 뒤 구간에서 균등하게 뽑는다. 여기에 world model이 실제로 생성한 이미지도 대량으로 섞어, 학습에 쓰는 실제 이미지와 실행에 쓰는 생성 이미지 사이의 품질 차이를 줄인다.

실행 설정은 과제별 post-training 없이 prompt만 바꾸는 방식으로 통일되어 있다.

| 항목 | 실행 시점 설정 |
|---|---|
| 속도 | 과제별 episode 길이의 15퍼센타일 |
| 품질 | 항상 5점 |
| 실수 | 항상 false |
| subgoal 갱신 | subtask가 바뀌거나 마지막 생성 후 4초 경과 시 |
| denoising 스텝 | 5스텝 |
| chunk 실행 길이 | 50스텝 중 15스텝 또는 25스텝 |
| CFG 가중치 | β는 1.3, 1.7, 2.2 중 선택 |

metadata에는 classifier-free guidance를 건다. 조건을 준 예측과 조건을 뺀 예측의 차이를 β배로 증폭해 원하는 방향으로 action을 밀어내는 방식이며, π0.7은 dexterous 과제에서 높은 속도 쪽으로 밀기 위해 여기에 적용한다. 추론 효율을 위해 조건을 준 시퀀스와 뺀 시퀀스를 하나의 시퀀스에 묶고, 두 분기가 서로를 참조하지 못하도록 attention을 나눈다.

subgoal image 생성과 subtask instruction 생성은 별도 스레드에서 asynchronous inference로 처리한다. asynchronous inference는 다음 계산과 현재 실행을 겹쳐 대기 시간을 감추는 실행 방식이며, VLA는 매 시점 가장 최근에 만들어진 결과를 쓴다.

### 학습 데이터와 로봇 플랫폼

학습 데이터는 여러 원천을 함께 쓴다.

- 여러 로봇 플랫폼에서 모은 시연 데이터(demonstration). 실험실형 환경과 가정형 환경, 실제 가정 환경을 모두 포함한다.
- 대규모 policy 평가에서 나온 자율 데이터.
- rollout 도중 사람이 개입해 만든 데이터.
- 오픈소스 로봇 데이터셋.
- 사람 1인칭 영상.
- 웹 비로봇 데이터: 물체 위치 예측, 속성 예측, VQA, 텍스트 예측.
- 영상 언어 과제: 자체 로봇 데이터와 웹 영상의 captioning.

기존 VLA 학습 파이프라인과 크게 갈리는 지점이 품질이 낮은 로봇 데이터를 적극적으로 쓴다는 것이다. 실패한 episode와 실수가 많은 성공 episode가 그대로 들어가고, 이전 버전 모델이 평가 실험 중에 남긴 데이터도 들어간다. 특히 π\*0.6이 강화학습 도중 남긴 데이터를 그대로 써서, RL specialist의 동작을 generalist가 distillation으로 물려받는다. 다만 일반화를 측정하는 평가 과제의 자율 데이터는 학습에서 제외했다.

로봇은 네 종류다.

| 플랫폼 | 구성 | control frequency | 용도 |
|---|---|---|---|
| 양팔 이동형 manipulator | 6 DoF 팔 둘, 이동 base, 후방 카메라 추가 | 50Hz | 주방과 가정 환경 long-horizon 과제 |
| BiPi 정적 양팔 | 가벼운 6 DoF 팔 둘 | 50Hz | 빨래 개기 등 데이터 수집의 주력 |
| 양팔 UR5e | Robotiq 그리퍼, 긴 팔, 높은 관성 | 20Hz | cross-embodiment 전이 대상 |
| 단완 시스템 | BiPi와 같은 팔 하나 | 50Hz | 일반화와 지시 따르기 실험 |

control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다. 모든 manipulator가 parallel-jaw 그리퍼를 쓰고, 모델 출력은 PD 제어기로 내려보내며, end-effector 명령은 수치 역기구학으로 관절 목표로 바꾼다.

UR5e가 cross-embodiment 실험에서 어려운 이유는 세 가지가 겹치기 때문이다. 팔이 훨씬 길고 무거우며, 테이블의 한쪽 가장자리가 아니라 양옆에 놓이고, 그리퍼 손가락 형상도 다르다. 저자들은 이 로봇이 사람이 teleoperation하기에도 더 어렵고 정밀한 grasping에 부적합하다고 적는다.

## 결과

### 과제별 post-training 없는 성능

첫 질문은 하나의 generalist 모델이 과제별로 튜닝된 specialist를 따라잡는지다. 비교 대상은 두 종류로 나뉜다.

| 비교군 | 과제 | 지표 | 결과 |
|---|---|---|---|
| π\*0.6 RL specialist | 티셔츠와 반바지 빨래, 다양 품목 빨래의 최난이도, 에스프레소 만들기, 상자 조립 | 성공률과 정규화 throughput | 성공률 대등, throughput은 다양 품목 빨래와 상자 조립에서 1.4에서 1.5배 |
| π0.6 SFT specialist | 땅콩버터 샌드위치, 셔츠 뒤집기, 문 통과, 애호박 썰기, 채소 깎기, 쓰레기 버리기 | task progress | 대체로 대등 |
| π0.6-MEM SFT specialist | 머그 3개 교체, 물건 찾기, 커피 뜨기, 창 닦기 | task progress | 비슷하거나 더 높음 |

throughput은 시간당 성공 횟수를 specialist 기준으로 정규화한 값이고, task progress는 과제를 단계별 점수로 쪼개 얼마나 진행했는지를 백분율로 잰 값이다. RL로 개별 과제의 천장을 끌어올린 모델을 generalist가 throughput에서 앞선 것이 이 절의 핵심 결과다. 품질이 낮은 데이터가 상태와 상황의 폭을 넓혀 robustness를 키운 결과라는 것이 저자들의 해석이다.

memory가 필요한 과제도 같은 조건에서 시험한다. 머그 세 개의 위치를 순서대로 바꾸거나 서랍에 숨긴 물건을 찾는 과제는 이전 observation을 명시적으로 기억해야 풀리는데, 같은 π0.7 모델 하나가 해당 과제로 fine-tuning된 π0.6-MEM specialist와 비슷하거나 더 나은 성능을 냈다.

![[assets/ai-2026-pi07-a-steerable-generalist-robotic/fig06.png]]
*Figure 6: 위는 π\*0.6 RL specialist 대비 빨래와 에스프레소, 상자 조립의 성공률과 정규화 throughput, 아래는 π0.6 SFT specialist 대비 6개 과제의 task progress다 (Physical Intelligence 2026, Figure 6).*

ablation은 두 요소를 각각 뗀다. metadata를 뺀 모델과 자율 평가 데이터를 뺀 모델 모두 네 과제 전 항목에서 π0.7보다 낮았고, 격차는 성공률보다 throughput에서 크게 벌어졌다. 품질이 들쭉날쭉한 평가 데이터를 쓰려면 좋은 동작과 나쁜 동작을 구분해줄 metadata가 함께 있어야 한다는 것이 저자들의 결론이다.

### 지시 따르기

지시 따르기는 학습에 없던 주방 네 곳과 침실 두 곳에서 14개 시나리오로 잰다. 각 시나리오는 3단계에서 6단계의 지시문을 순서대로 따라가야 끝나며, 물건 정리, 가구 조작, 흘린 것 닦기 같은 실제 상황을 섞었다. 지표는 전체 지시문 중 올바르게 수행한 비율이고, π0.5와 π0.6을 모든 항목에서 큰 폭으로 앞섰다.

지시 표현을 의도적으로 비튼 실험이 이어진다. 사무용 책상 위 물체 재배치 과제를 표준 지시와 복잡한 지시로 나눴다.

| 구분 | 지시문 예시 | 결과 |
|---|---|---|
| 표준 지시 | "숟가락을 집어라", "숟가락을 포크 왼쪽에 놓아라" | 세 모델 모두 성공 |
| 복잡한 지시 | "수프 먹을 때 쓸 물건을 집어라", "가장 큰 접시 위의 과일을 집어라" | π0.7이 앞서고 subgoal image를 주면 더 오름 |

복잡한 지시는 물체를 관습적이지 않은 방식으로 가리키거나 공간 관계를 이해해야 풀린다. subgoal image를 준 π0.7 (GC)가 한 단계 더 높은 이유는 world model이 웹 규모 이미지 생성 pre-training에서 얻은 의미 이해를 목표 장면 형태로 넘겨주기 때문이다.

데이터 편향을 거스르는 지시도 시험한다. 학습 데이터의 bussing 과제는 쓰레기를 쓰레기통에, 식기를 식기통에 넣는다. Reverse Bussing은 그 반대를 시켜 물체 12개를 뒤바뀐 대응으로 분류하게 한다. Reverse Fridge to Microwave는 냉장고에서 전자레인지로만 옮기던 데이터에 대고 반대 방향을 시킨다. π0.7이 이전 모델을 크게 앞섰고, 특히 후자는 subgoal image 조건이 성공의 관건이었다. 반대 방향 데이터가 아예 없으므로 텍스트만 보고 목표 장면을 만들어낼 수 있는 world model이 필요했기 때문이다.

### cross-embodiment 전이

cross-embodiment 전이 실험은 형상 격차를 단계적으로 키우며 진행한다. 본 실험은 모두 관절 수준 제어를 쓰는데, 부록의 비교에서 end-effector 제어가 뚜렷한 이득을 보이지 않았기 때문이다.

| 과제 | 데이터 수집 로봇 | 평가 로봇 | 격차 | 결과 |
|---|---|---|---|---|
| Table Setting | 이동형, 정적, 단완 여러 종류 | 정적 양팔 | 작음 | 세 모델 모두 높은 성능 |
| Bag In Backpack | 양팔 UR5e | 더 작은 정적 양팔 | 중간 | π0.5가 크게 하락, π0.6과 π0.7은 유지 |
| Organize Tupperware | 양팔 UR5e | 더 작은 정적 양팔 | 중간 | 위와 같음 |
| Shirt Bagging | 정적 양팔 | 단완 UR5e | 큼 | π0.7이 크게 앞섬 |
| Towel Folding | 정적 양팔 | 양팔 UR5e | 매우 큼 | π0.7 성공, GC에서 더 향상 |
| Shirt Folding | 정적 양팔 | 양팔 UR5e | 매우 큼 | π0.7 (GC)가 사람 수준에 근접 |

Table Setting이 가장 유리한 조건인 이유는 여러 종류의 로봇에서 데이터를 모아 과제의 공통 구조를 추론할 수 있어서다. 반대로 데이터 원천이 하나뿐이면서 목표 로봇의 크기가 다른 조건에서는 π0.5가 크게 하락한다.

전이가 원본 동작의 복사가 아니라는 관찰이 함께 남는다. 키가 작은 정적 양팔 로봇에서 사람 조작자는 한 팔로 봉투를 벌리고 다른 팔로 물건을 넣지만, 팔이 길어 도달 범위가 넓은 UR5e에서 π0.7은 단완 pick-and-place로 같은 일을 끝낸다. 빨래 개기에서도 원본 로봇에서는 end-effector를 기울여 천을 테이블에 눌렀다가 들지만, UR5e에서는 그 팔의 기구학에 맞는 수직 grasping을 쓴다.

![[assets/ai-2026-pi07-a-steerable-generalist-robotic/fig12.png]]
*Figure 12: 왼쪽은 재배치 계열 4과제, 오른쪽은 수건과 셔츠 개기다. 형상 격차가 커질수록 π0.5가 먼저 크게 하락하고, 셔츠 개기에서는 사람 조작자 수준(파선)에 근접한다 (Physical Intelligence 2026, Figure 12).*

사람과 직접 비교한 실험이 이 절의 결론을 지탱한다. teleoperation 경력 상위 2%인 조작자 10명을 모집했고 전체 플랫폼 평균 경력은 약 375시간이었다. 이들도 UR5e에서 셔츠를 개어본 적은 없어 사람에게도 zero-shot 조건이었다. 조작자마다 3회씩 총 30회를 수행했으며, 연습이나 준비 시간 없이 첫 시도부터 기록했고 초기 셔츠 배치와 제한 시간, 채점 기준은 policy 평가와 동일하게 맞췄다.

| 대상 | task progress | 성공률 |
|---|---|---|
| 사람 조작자 10명 | 90.9% | 80.6% |
| π0.7 (GC) | 85.6% | 80.0% |

두 수치의 차이는 task progress에서 5.3%p, 성공률에서 0.6%p다. UR5e 빨래 개기 데이터를 한 줄도 학습하지 않은 모델이 숙련 조작자의 첫 시도와 같은 수준을 냈다는 뜻이다. 실용적 함의도 분명하다. teleoperation이 쉬운 가볍고 저렴한 플랫폼에서 dexterous skill을 모아, 사람이 시연 데이터를 만들기 어려운 고하중 산업용 팔로 옮기는 경로가 열린다.

### 조합적 일반화와 language coaching

조합적 일반화는 과제 길이에 따라 두 가지 양상으로 나뉜다. 짧은 과제는 지시만으로 수행되고, 긴 과제는 사람의 단계별 지시가 필요하다.

미학습 단기 과제는 프렌치프레스 손잡이 누르기, 밥솥에 쌀 담기, 자와 헤드폰 같은 사무용품 닦기, 기어 세트와 탁상 선풍기 같은 회전체 돌리기 네 가지다. 어느 것도 전용 데이터를 모으지 않았는데 π0.7이 그대로 수행했고, 언어만 준 조건과 생성 subgoal image를 준 조건의 성능이 비슷했다.

long-horizon 과제는 한 줄 지시로 되지 않는다. 에어프라이어로 고구마를 익히는 과제는 5분 가까이 걸리고 여러 단계를 거치기 때문이다. 대신 사람이 "왼손으로 에어프라이어 손잡이를 잡아라", "왼손으로 열어라", "오른손으로 고구마를 집어라" 식으로 단계를 불러준다.

![[assets/ai-2026-pi07-a-steerable-generalist-robotic/fig15.png]]
*Figure 15: 에어프라이어 넣기와 빼기, 베이글 굽기 세 과제의 coaching 결과다. 지시를 따라가는 능력이 부족한 이전 모델은 coaching을 받아도 거의 진행하지 못한다 (Physical Intelligence 2026, Figure 15).*

세 과제 모두 action 수준 데이터가 학습에 전혀 없고 환경도 처음 보는 조건이다. π0.7은 coaching을 따라 끝까지 진행하지만 π0.5와 π0.6은 지시를 따라가는 능력 자체가 부족해 거의 진행하지 못한다.

coaching 기록은 다시 학습 자원이 된다. 그때 사람이 불러준 단계별 지시로 high-level policy를 학습시키면, 로봇 observation과 과제 설명, 지난 subtask 이력을 받아 다음 subtask를 내놓는 모델이 된다. 다섯 과제에서 이 자율 policy가 사람이 실시간으로 coaching한 조건과 비슷한 진행도를 냈다. teleoperation으로 저수준 action 데이터를 새로 모으지 않고 새 long-horizon 과제를 얻는 경로다.

### 데이터 규모와 다양성 ablation

마지막 실험이 논문의 핵심 주장을 직접 검증한다. 티셔츠와 반바지 빨래 데이터를 품질과 속도 기준으로 상위 30%, 50%, 80%, 100% 네 구간으로 나누고, metadata 유무를 교차해 여덟 모델을 처음부터 학습했다.

| 데이터 구간 | metadata 있음 | metadata 없음 |
|---|---|---|
| 상위 30% | 시간당 성공 12.8회 | 비슷한 수준에서 출발 |
| 상위 80% | 계속 상승 | 12회 부근에서 정점 |
| 전체 100% | 시간당 성공 22.8회 | 9.3회로 하락 |

metadata가 있으면 데이터를 키울수록 평균 품질이 떨어지는데도 시간당 성공 횟수가 12.8회에서 22.8회로 올랐다. 반면 metadata가 없으면 상위 80% 지점에서 12회 부근을 찍고 전체 데이터에서 9.3회로 하락했다. 즉 같은 데이터가 손해가 되느냐 이득이 되느냐를 metadata가 가른다.

다양성 쪽 실험은 데이터 양을 통제한 비교다. 과제 다양성이 가장 높은 상위 20%를 뺀 모델과 무작위 20%를 뺀 대조군을 같은 데이터 양으로 학습시켜 미학습 단기 과제에서 비교했다.

| 과제 | 무작위 20% 제거 | 다양성 상위 20% 제거 |
|---|---|---|
| 회전체 돌리기 | 48% 부근 | 8% 부근 |
| 사무용품 닦기 | 46% 부근 | 6% 부근 |

같은 양의 데이터라도 어떤 20%를 버리느냐에 따라 미학습 과제 성능이 40%p 가까이 갈린다. 따라서 조합적 일반화를 만드는 것은 데이터의 양이 아니라 과제 다양성이라는 결론이 나온다.

![[assets/ai-2026-pi07-a-steerable-generalist-robotic/fig18.png]]
*Figure 18: 왼쪽은 데이터를 늘려 평균 품질이 떨어져도 metadata가 있으면 throughput이 계속 오른다는 것, 오른쪽은 과제 다양성 상위 20%를 빼면 미학습 과제 성능이 크게 하락한다는 것을 보여준다 (Physical Intelligence 2026, Figure 18).*

## 평가 과제와 채점 기준

이 논문의 성능 수치는 대부분 이진 성공률이 아니라 단계별 점수의 합인 task progress로 보고된다. 부록에 과제별 채점표가 실려 있어, 같은 수치를 다른 논문과 비교할 때 기준을 확인할 수 있다.

| 과제 | 만점 | 채점 기준 요약 |
|---|---|---|
| Take Out Trash | 12점 | 싱크대 하부장 열기와 쓰레기통 꺼내기, 봉투 분리와 들어내기, 새 봉투 씌우기, 쓰레기통 반납과 문 닫기 각 3점 |
| Peel Fruits and Vegetables | 9점 | 필러 집기, 껍질 벗김 정도 4구간, 그릇에 담기, 껍질 치우기 3구간 |
| Make Peanut Butter Sandwich | 9점 | 뚜껑 열기, 바르는 범위, 빵 덮기, 대각선 절단, 칼 놓기, 접시 밀기, 전체 마무리 |
| Turn a T-shirt Inside Out | 7점 | 셔츠 집기, 몸통과 좌우 소매 뒤집기, 접기, 쌓기, 위치 맞추기 |
| Table Setting | 7점 | 물품 하나당 1점, 명백히 잘못된 배치는 1점 감점 |
| Toast a Bagel | 7점 | 오븐 열기, 베이글 넣기, 닫기, 손잡이 돌리기, 접시 꺼내기, 토스트 꺼내기, 접시에 담기 |
| Shirt Folding | 6점 | 1차, 2차, 최종 접기 각 1점(의도한 선에서 5인치 이내), 최종 상태 품질 0에서 3점 |
| Organize Tupperware | 6점 | 용기 3개 포개기와 뚜껑 3개 쌓기 |
| Window Cleaning | 5점 | 세정제 분사, 종이타월 준비, 전면 건조, 타월 버리기, 물자국 없음 |
| Loading an Air Fryer | 4점 | 열기, 고구마 집기, 넣기, 닫기 |
| Cut Zucchini | 3점 | 칼 집기, 균일하게 썰기, 칼 원위치 |

Shirt Folding에서 만점 6점이 곧 성공 판정 기준이라는 점이 대표적이다. 즉 사람과 비교한 80% 성공률은 세 번의 접기를 모두 5인치 이내 오차로 끝내고 최종 상태 품질까지 만점을 받은 비율을 뜻한다.

## 추론 비용

π0.7과 high-level policy는 둘 다 Gemma3 4B 기반이라 NVIDIA H100 한 장으로 추론한다. real-time action chunking 이후 적용한 최적화 덕분에 최소 구성의 추론 시간은 38ms까지 내려갔다. 카메라 3대, denoising 5스텝, 학습 시점 real-time action chunking을 쓴 조건이며, 시험 시점에 지연을 처리하는 방식과 달리 학습 시점 방식은 추론에 추가 비용을 더하지 않는다.

기능을 켜면 비용이 오른다. MEM vision encoder를 켜고 subgoal image를 문맥에 넣으면 최악의 경우 추론 시간이 127ms가 된다.

무거운 쪽은 subgoal image 생성이다. 14B 모델을 반복 denoising해야 하고 전체 시퀀스 길이가 1만 토큰에 가깝다. 저자들은 네 가지 최적화를 겹쳐 이 비용을 감당 가능한 수준으로 낮췄다.

- H100 4장에 4-way tensor parallelism 적용.
- 큰 행렬 곱을 8비트로 양자화.
- backbone attention에 SageAttention의 변형 적용.
- 텍스트와 이미지 양쪽 CFG를 포함한 25 denoising 스텝을 1.25초에 처리.

실행 시점에는 asynchronous inference라 world model이 다음 subgoal을 만드는 동안 π0.7이 계속 동작한다. 따라서 생성 지연 1.25초가 제어 주기를 직접 막지는 않는다.

## 한계

zero-shot 일반화의 성공률은 60%에서 80%대에 머문다. 학습 분포 안에 있는 과제가 90%를 넘는 것과 대비되는 값이다. 저자들은 π0.7의 높은 steerability를 살려 시험 과제 자체에서 효율적으로 배우는 방향을 다음 단계로 든다. steerability는 prompt만 바꿔 모델의 동작 방식을 원하는 쪽으로 지정할 수 있는 정도를 뜻하며, 더 자세한 language coaching이나 자율 강화학습이 구체적인 후보다.

더 근본적인 한계는 측정 쪽에 있다. 데이터가 워낙 크고 다양해서 어떤 과제가 진짜 미학습인지 확정하기 어렵다. 의도적으로 데이터를 모으지 않은 과제라도 다른 라벨이 붙은 채로, 또는 다른 과제를 수행하던 중 부수적으로 비슷한 skill이 들어와 있을 수 있다.

저자들의 반론은 두 단계다. 첫째, 이 어려움은 언어 모델의 일반화를 이해하는 문제와 같은 성격이며 무엇이 진짜 새로운지 판정하기 어려운 것은 규모가 큰 모델의 공통 조건이다. 둘째, 다른 상황에서 본 skill과 동작을 재조합해 푸는 것 자체가 compositional generalization의 본질이다. 실용적 결론은 어느 쪽이든 같다. 새 과제마다 데이터를 새로 모으는 대신 모델에 시키기만 하면 된다.

계산 비용도 가볍지 않다. subgoal image 생성이 14B 모델의 반복 denoising이라 H100 4장을 따로 써야 하고, 이는 단일 H100으로 도는 VLA 본체보다 훨씬 큰 자원이다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| diverse context conditioning | 무엇을 할지에 더해 어떻게 할지를 담은 여러 modality를 prompt에 넣어 학습하는 방식. 논문의 중심 아이디어다 |
| episode metadata | episode의 속도, 품질 1점에서 5점, 실수 여부를 prompt에 적은 라벨. 품질이 뒤섞인 데이터를 구분해준다 |
| subgoal image | 현재 subtask가 끝난 직후의 장면을 여러 시점으로 그린 목표 이미지. 실행 시점에는 world model이 생성한다 |
| language coaching | 사람이 미학습 과제를 단계별 subtask 지시로 불러주며 로봇을 끌고 가는 방식. 그 기록으로 high-level policy를 학습시켜 자율화한다 |
| knowledge insulation | backbone은 FAST token으로 지도하고 action expert의 gradient는 backbone으로 흘리지 않는 학습 레시피 |
| throughput | 시간당 성공 횟수. 성공률과 별개로 dexterous 과제의 실용성을 재는 지표다 |
| π0.7 (GC) | subgoal image를 조건으로 준 π0.7. GC는 goal-conditioned를 가리키며 그래프에서 빗금 막대로 표시된다 |

## 관련 페이지

- [[physical-ai/physical-intelligence-2026-a-steerable-model-with-emergent]]: 같은 날 공개된 발표 글. 영상 데모와 에어프라이어 지식의 출처 추적이 여기 있다.
- [[physical-ai/amin-2025-pistar06-a-vla-that-learns]]: 직전 모델 π\*0.6과 RECAP. π0.7이 distillation으로 흡수한 자율 실행 데이터가 여기서 나왔다.
- [[physical-ai/jo-2026-pi-0-6-vla-primer]]: π0.6의 한국어 입문 해설. π0.7이 물려받은 아키텍처의 기초를 먼저 읽는 데 쓴다.
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]]: subtask instruction과 co-training 레시피의 출처.
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]: flow matching action expert 구조의 원형.
- [[physical-ai/physical-intelligence-openpi]]: π 계열 오픈소스 구현.
- [[physical-ai/hou-2026-world-model-for-robot-learning]]: world model을 policy에 결합하는 방식의 지형도. π0.7은 subgoal image 생성기로 쓰는 유형에 해당한다.
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]]: emergent capability라는 표현을 VLA에 처음 세운 논문. π0.7은 같은 용어를 조합적 일반화까지 확장한다.
- [[overviews/physical-ai-overview]]: 도메인 허브.
- [[overviews/glossary-physical-ai]]: 용어 canonical 표기.
