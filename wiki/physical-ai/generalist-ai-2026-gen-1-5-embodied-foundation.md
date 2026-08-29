---
title: "GEN-1.5: Embodied Foundation Models are One-Shot Learners"
type: article
year: 2026
category: physical-ai
source: generalist-ai-2026-gen-1-5-embodied-foundation.md
raw_path: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation.md
raw_filename: "generalist-ai-2026-gen-1-5-embodied-foundation.md"
source_collection: external
author: "Generalist AI"
url: "https://generalistai.com/blog/gen-1.5"
publisher: "Generalist AI Blog"
tags: [physical-ai, vla, robot-learning, imitation-learning, manipulation]
figures:
  - id: fig03
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop01.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop01.png
    caption: "Figure 1. 언어 모델의 one-shot 프롬프트와 embodied 모델의 physical prompt 대비"
    strategy: crop
    curated: true
  - id: fig04
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop02.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop02.png
    caption: "physical prompt(좌)와 model rollout(우) 나란히 보기 — 유리병 뚜껑 돌려 열기"
    strategy: crop
    curated: true
  - id: fig05
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop03.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop03.png
    caption: "Figure 2. 10개 과제별 성공률 — 10 gradient step 대 in-context learning"
    strategy: crop
    curated: true
  - id: fig06
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop04.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop04.png
    caption: "Figure 3. 8개월 pre-training 곡선 — 3단계에 걸친 next action prediction error 감소"
    strategy: crop
    curated: true
  - id: fig13
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop11.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop11.png
    caption: "바나나를 즉석 브러시로 사용해 블록을 그릇에 쓸어 넣는 rollout"
    strategy: crop
    curated: true
  - id: fig19
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop17.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop17.png
    caption: "블록 하나만 담도록 fine-tuning했는데 색·종류별로 분류하는 rollout"
    strategy: crop
    curated: true
  - id: fig20
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop18.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop18.png
    caption: "유리병으로 학습한 뚜껑 열기가 병·컵·용기로 확장되는 rollout 4종"
    strategy: crop
    curated: true
---

## 요약 (Summary)

Generalist AI가 2026년 8월에 공개한 로봇 foundation model GEN-1.5는 3~12초짜리 시연 하나를 context window에 넣는 것만으로 새 조작 과제를 해낸다. 가중치를 건드리지 않고 평균 59%다. gradient descent를 10스텝 태우면 83%까지 올라간다.

성공률 자체는 이 발표의 요점이 아니다. 이 능력을 겨냥해 설계한 장치가 하나도 없다. in-context learning을 유도하는 구조 변경, meta-learning 루프, 즉흥성을 장려하는 보조 목적함수 어느 것도 넣지 않았는데 8개월 넘게 이어진 pre-training에서 그냥 나타났다.

GEN-1.5는 video를 30초 분량 기억으로 받고 다른 센서 신호, 언어, proprioception을 함께 넣는 대형 멀티모달 모델이다. proprioception은 관절 각도 같은 로봇 자신의 상태 감각 입력을 말한다. 출력은 100Hz action trajectory다. GEN-0에서 scaling law를 확인하고 GEN-1에서 post-training으로 99%+ 성공률에 도달한 계보의 세 번째 모델이다.

## physical prompting

핵심 개념은 physical prompt다. 언어 예시 대신 센서 데이터와 action trajectory가 붙은 sensorimotor 예시를 context window에 넣어 과제를 지시한다. 사람이 손에 쥐는 그리퍼 한 쌍으로 기록한 데이터를 써도 되고 로봇 자신의 rollout을 넣어도 된다. 프롬프트가 들어가면 학습 단계 없이 곧바로 수행한다.

![[assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop01.png]]
*Figure 1: 언어 모델의 one-shot 프롬프트와 embodied 모델의 physical prompt 대비 (Generalist AI 2026, Figure 1)*

30초 context window의 앞부분을 physical prompt가 차지하고 나머지는 실시간 observation으로 채워진다. pre-training은 데이터 엔진에서 뽑은 연속 구간을 무작위로 샘플링해 진행했고, 예시를 context에 미리 넣어 두는 별도 장치가 없었다. 그런데 physical prompt는 학습 중 한 번도 본 적 없는 시간 불연속 점프를 만든다. 그래도 작동한다.

![[assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop02.png]]
*physical prompt(좌)와 그로부터 나온 model rollout(우) — 유리병 뚜껑 돌려 열기 (Generalist AI 2026)*

프롬프트는 조합도 된다. 서로 다른 과제의 시연 두 개를 함께 넣으면 모델이 둘을 하나의 연속 행동으로 이어 붙인다. 두 시연 어디에도 없던 다시 쥐기나 자세 교정 같은 중간 동작을 스스로 만들어 낸다. 저자들은 여기서 physical prompt engineering이라는 방향을 제시한다. 복합 과제를 통째로 시연하는 대신 짧고 재사용 가능한 프롬프트 라이브러리를 조합해 긴 행동을 짜는 방식이다.

전이 범위도 넓다. 시뮬레이터에서 기록한 시연을 프롬프트로 넣으면 실기기가 그 과제를 수행하는데, pre-training 데이터에 시뮬레이션이 한 조각도 들어 있지 않다. 사람이 로봇 카메라 앞에서 맨손으로 시연하면 로봇이 곧바로 따라 하는 사례도 보고한다.

## pre-training이 길어지면서 줄어든 적응 비용

GEN-1.5의 pre-training은 GEN-1 발표와 병행해 시작해 8개월 넘게 끊지 않고 돌았다. 데이터 흡수량, 연산 대비 효율, 구조·알고리즘을 손댈 때마다 나오는 계단식 개선이 계속 좋아져서 멈출 이유가 없었다고 저자들은 설명한다.

![[assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop04.png]]
*Figure 3: 3개 학습 단계를 거치며 내려간 next action prediction error (Generalist AI 2026, Figure 3)*

이 곡선이 내려가는 동안 새 과제 적응에 필요한 gradient step 수가 수백에서 수십으로, 다시 1스텝으로 줄었다. 그 끝에서 스텝을 아예 0으로 놓아 본 것이 이번 in-context 결과다.

저자들은 few-step 적응을 test-time training이라 부른다. 10스텝을 태워도 held-out 과제에서 가중치가 0.15% 미만으로 변한다. 새 표현을 만든다기보다 이미 있는 지식을 조금 재배치하는 데 가깝다는 뜻이다. 하이퍼파라미터는 pre-training과 비슷한 값을 그대로 썼고 적응 전용 튜닝은 하지 않았다.

왜 이런 능력이 나오는지는 가설로만 남긴다. 언어 모델의 in-context learning과 연결된다고 알려진 burstiness와 Zipf 분포 구조가 물리 observation·action 분포에도 있을 수 있다는 가설이 하나다. 물리 작업에 자연히 반복 주기가 있어 모델이 그 패턴을 감지해 이어 나가는 법을 배웠을 수 있다는 가설도 함께 든다.

## 결과 (Results)

10개 과제에서 잰 성공률이다. in-context는 12초 시연 하나, gradient step 조건은 과제당 5분 데이터(시연 약 50개)를 썼다.

![[assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop03.png]]
*Figure 2: 과제별 성공률 — 10 gradient step(파랑) 대 in-context learning(초록) (Generalist AI 2026, Figure 2)*

| 과제 | 10 gradient step | in-context |
|---|---|---|
| Retrieve money from purse | 83.3% | 60.7% |
| Fold and crease paper | 69.3% | 50.0% |
| Twist lid off glass jar | 94.5% | 60.0% |
| Stack two small cups | 75.0% | 67.0% |
| Sweep trash with brush | 99.0% | 37.3% |
| Open book cover | 82.7% | 54.7% |
| Brush cube into bowl | 71.2% | 60.8% |
| Flip phone upside down | 81.0% | 78.0% |
| Unzip pencil pouch | 86.0% | 55.5% |
| Remove vacuum pad | 86.0% | 64.0% |
| **평균** | **83%** (±9%) | **59%** (±10%) |

일부 과제에서는 같은 시연 데이터로 1~5스텝 학습한 것보다 in-context 쪽이 더 좋았다. 극단적인 1스텝 조건에서는 데이터 1분으로 held-out 과제 66.5%가 나왔고, 배치 크기와 학습률을 키우면 더 올라갔다.

## 즉흥과 일반화 (Improvisation and Generalization)

정량 지표보다 인상적인 것은 fine-tuning된 모델이 시연 범위를 벗어나는 방식이다.

브러시로 블록을 그릇에 쓸어 넣도록 5분치 사람 시연으로 fine-tuning한 모델에 바나나를 쥐어 주면 바나나를 브러시처럼 쓴다. 쓰레받기를 주면 전략을 아예 바꿔서 블록을 떠올려 그릇에 쏟는다. fine-tuning 데이터에도, 저자들이 아는 한 pre-training 데이터에도 쓰레받기를 이렇게 쓰는 장면은 없다. 언어 안내도 주지 않았다. 가장 비슷한 pre-training 사례는 1,891,392개 장면에 대한 언어 기반 최근접 이웃 검색으로 찾았는데 과제와 닮은 구석이 거의 없었다.

![[assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop11.png]]
*바나나를 즉석 브러시로 사용해 블록을 그릇에 쓸어 넣는 rollout (Generalist AI 2026)*

다른 사례도 비슷한 성격이다. 그릇을 덮은 종이를 치우고 과제를 마친 뒤 종이를 다시 덮는다. 손끝에 낀 레고 조각을 반대 손으로 떼어낸다. 한 손 시연만 봤는데 양손으로 뚜껑을 돌린다. 블록 하나 담기만 배웠는데 색이나 종류별로 분류한다.

![[assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop17.png]]
*블록 하나만 담도록 fine-tuning했는데 색·종류별로 분류하기 시작하는 rollout (Generalist AI 2026)*

물체 일반화도 함께 보고한다. 유리병 뚜껑 열기로 10스텝 fine-tuning한 모델은 처음 보는 병, 테이크아웃 컵, 밀폐 용기로도 확장된다. 어디를 양손으로 잡을지, 손목을 어떻게 돌려야 각 뚜껑이 열리는지를 물체마다 다르게 풀어야 하는 문제다.

![[assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop18.png]]
*유리병으로 학습한 뚜껑 열기가 병·컵·용기로 확장되는 rollout (Generalist AI 2026)*

이 즉흥성은 fine-tuning gradient step 수가 줄수록 더 자주, 더 정교하게 나타난다고 저자들은 관찰한다. 적게 손댄 모델일수록 pre-training 사전 지식에 가까이 머물러 시연에서 벗어난 상황에 끌어 쓸 수 있는 행동 레퍼토리가 넓기 때문이라고 추정한다.

## 한계 (Limitations)

과제가 단순하고 short-horizon이며 성공률도 높지 않다. in-context로 익힌 기술은 fine-tuning한 모델보다 깨지기 쉽다. 다만 교란을 어느 정도 견디고 실수에서 회복하기도 한다. 능력이 왜 생겼는지도 짚어내지 못한다. 여기까지가 저자들이 먼저 밝히는 한계다.

블로그라는 형식에서 오는 한계는 별개로 크다. 모델 크기, 데이터 엔진의 규모와 구성, 로봇 하드웨어 사양, 평가 프로토콜이 공개되지 않는다. 시행 횟수나 초기 조건 분포, 성공 판정 기준을 알 수 없어 표의 수치를 다른 VLA와 같은 축에서 견주기 어렵다. baseline 비교도 없다. π0·OpenVLA 같은 공개 모델과의 상대 위치는 이 자료만으로 판단할 수 없다.

## 관련 페이지 (Related Pages)

- [[physical-ai/physical-intelligence-2025-a-vla-with-open-world]] — π0.5. co-training 레시피로 open-world 일반화를 노린 같은 세대의 접근
- [[physical-ai/amin-2025-pistar06-a-vla-that-learns]] — π*0.6. 실패에서 배우는 RL 기반 개선으로, GEN-1.5의 "적게 손대기"와 대비되는 방향
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]] — flow matching 기반 action 출력의 기준선
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]] — 공개 가중치 VLA. GEN-1.5가 공개하지 않는 것들을 비교해 볼 대상
- [[physical-ai/xu-2025-an-anatomy-of-vision-language-action-models]] — VLA 구조 분류. GEN-1.5가 어느 축에 놓이는지 가늠할 틀
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — 또 다른 로봇 foundation model 계보
- [[overviews/physical-ai-overview]] — 도메인 허브
- [[overviews/glossary-physical-ai]] — 용어 canonical 표기
