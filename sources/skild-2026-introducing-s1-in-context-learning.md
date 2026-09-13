---
title: "Introducing S1: In-Context Learning for Robotics"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/skild-2026-introducing-s1-in-context-learning.md
raw_filename: "skild-2026-introducing-s1-in-context-learning.md"
source_collection: external
author: "Skild AI"
url: "https://www.skild.ai/blogs/s1"
publisher: "Skild AI Blog"
fetched_at: "2026-09-14T08:27:34+0900"
extractor_tier: "chrome"
tags: [physical-ai, vla, robot-learning, imitation-learning, manipulation]
figures:
  - id: fig01
    file: assets/skild-2026-introducing-s1-in-context-learning/fig01.jpg
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/fig01.jpg
    caption: "video prompt를 만드는 세 가지 방식: 손잡이형 그리퍼 기록(왼쪽), VR 헤드셋 기반 원격조작(가운데), 양팔 teleoperation 리그로 만드는 조리 시연(오른쪽)"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/skild-2026-introducing-s1-in-context-learning/fig02.jpg
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/fig02.jpg
    caption: "LocoFormer 소개 헤더 이미지(배너용 썸네일)"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/skild-2026-introducing-s1-in-context-learning/fig03.jpg
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/fig03.jpg
    caption: "LocoFormer가 실내에서 adapting 중인 사족보행 로봇"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/skild-2026-introducing-s1-in-context-learning/fig04.jpg
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/fig04.jpg
    caption: "LocoFormer가 실외 카페테리아 의자 사이를 걷는 사진"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/skild-2026-introducing-s1-in-context-learning/fig05.jpg
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/fig05.jpg
    caption: "LocoFormer 계열 바퀴형 로봇이 고르지 않은 지형에 적응하는 사진"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/skild-2026-introducing-s1-in-context-learning/fig06.jpg
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/fig06.jpg
    caption: "LocoFormer 계열 휴머노이드 로봇 사진"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/skild-2026-introducing-s1-in-context-learning/fig07.png
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/fig07.png
    caption: "Introducing S1 타이틀 배너: plant potting 과제 수행 중인 S1의 그리퍼 클로즈업"
    strategy: fetched
    curated: true
  - id: fig08
    file: assets/skild-2026-introducing-s1-in-context-learning/page-full.png
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/page-full.png
    caption: "전체 페이지 스크린샷 (상단 6,000px)"
    strategy: screenshot
    curated: false
  - id: fig09
    file: assets/skild-2026-introducing-s1-in-context-learning/crop01.png
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/crop01.png
    caption: "Fig. 1 컨벤셔널 robot learning 파이프라인 도식 (영상/캔버스 미렌더, 캡션만 남음)"
    strategy: crop
    low_confidence: true
    curated: false
  - id: fig10
    file: assets/skild-2026-introducing-s1-in-context-learning/crop02.png
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/crop02.png
    caption: "Fig. 2 video prompt가 context window에 들어가는 과정 도식 (영상 미렌더)"
    strategy: crop
    low_confidence: true
    curated: false
  - id: fig11
    file: assets/skild-2026-introducing-s1-in-context-learning/crop03.png
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/crop03.png
    caption: "Fig. 3 데이터 소스별 3축 트레이드오프 표 (헤더만 렌더, 값 없음)"
    strategy: crop
    low_confidence: true
    curated: false
  - id: fig12
    file: assets/skild-2026-introducing-s1-in-context-learning/crop04.png
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/crop04.png
    caption: "S1의 seen 과제 autonomous rollout 예시 (실험실 파이펫 정리, 색상별 블록 분류 등)"
    strategy: crop
    curated: true
  - id: fig13
    file: assets/skild-2026-introducing-s1-in-context-learning/crop05.png
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/crop05.png
    caption: "장기 unseen 과제 데모: pancake flipping autonomous rollout(위)과 그 근거가 된 단일 video prompt(중간), 하단은 4개 unseen 과제 탭"
    strategy: crop
    curated: true
  - id: fig14
    file: assets/skild-2026-introducing-s1-in-context-learning/crop06.png
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/crop06.png
    caption: "Fig. 4 pre-training 규모 대비 성공률 스케일링 차트 (축만 렌더, 데이터 포인트 없음)"
    strategy: crop
    low_confidence: true
    curated: false
  - id: fig15
    file: assets/skild-2026-introducing-s1-in-context-learning/crop07.png
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/crop07.png
    caption: "perturbation 강건성 예시: 물체 위치를 옮기거나 교체해도 과제를 완수하는 autonomous rollout 2종"
    strategy: crop
    curated: true
  - id: fig16
    file: assets/skild-2026-introducing-s1-in-context-learning/crop08.png
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/crop08.png
    caption: "skateboard 바퀴 조립 중 실수에서 회복하는 autonomous rollout"
    strategy: crop
    curated: true
  - id: fig17
    file: assets/skild-2026-introducing-s1-in-context-learning/crop09.png
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/crop09.png
    caption: "common-sense 행동 절의 시연 영상 2종: 컵으로 대체하는 시연(왼쪽)과 유리컵에 주스를 채우는 teleoperation 시연(오른쪽)"
    strategy: crop
    curated: true
  - id: fig18
    file: assets/skild-2026-introducing-s1-in-context-learning/crop10.png
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/crop10.png
    caption: "demonstration correction 절의 sub-optimal teleop 시연 2편 (검은 화면에 텍스트만 남음)"
    strategy: crop
    curated: false
  - id: fig19
    file: assets/skild-2026-introducing-s1-in-context-learning/crop11.png
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/crop11.png
    caption: "Fig. 5 training 조건 이탈 대비 성공률 차트 (축만 렌더, 데이터 없음)"
    strategy: crop
    low_confidence: true
    curated: false
  - id: fig20
    file: assets/skild-2026-introducing-s1-in-context-learning/crop12.png
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/crop12.png
    caption: "Fig. 6 in-context 시연 이탈 대비 성공률 차트 (축만 렌더, 데이터 없음)"
    strategy: crop
    low_confidence: true
    curated: false
  - id: fig21
    file: assets/skild-2026-introducing-s1-in-context-learning/crop13.png
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/crop13.png
    caption: "Fig. 7 post-training 시연 수 대비 성공률 차트 (축만 렌더, 데이터 없음)"
    strategy: crop
    low_confidence: true
    curated: false
  - id: fig22
    file: assets/skild-2026-introducing-s1-in-context-learning/crop14.png
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/crop14.png
    caption: "LocoFormer 헤더와 마일스톤 타임라인 위젯 (3장 그리드 버전)"
    strategy: crop
    curated: false
  - id: fig23
    file: assets/skild-2026-introducing-s1-in-context-learning/crop15.png
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/crop15.png
    caption: "adapting 중인 사족보행 로봇 단독 사진"
    strategy: crop
    curated: false
  - id: fig24
    file: assets/skild-2026-introducing-s1-in-context-learning/crop16.png
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/crop16.png
    caption: "실외 카페테리아에서 걷는 사족보행 로봇 단독 사진"
    strategy: crop
    curated: false
  - id: fig25
    file: assets/skild-2026-introducing-s1-in-context-learning/crop17.png
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/crop17.png
    caption: "고르지 않은 지형에 적응하는 바퀴형 로봇 단독 사진"
    strategy: crop
    curated: false
  - id: fig26
    file: assets/skild-2026-introducing-s1-in-context-learning/crop18.png
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/crop18.png
    caption: "휴머노이드 로봇 단독 사진"
    strategy: crop
    curated: false
  - id: fig27
    file: assets/skild-2026-introducing-s1-in-context-learning/crop19.png
    raw: raw/articles/skild-2026-introducing-s1-in-context-learning-figures/crop19.png
    caption: "Fig. 8 네 단계 마일스톤을 대표하는 이종 embodiment 사진 4장 (사족보행, 실외 보행, 바퀴형, 휴머노이드)"
    strategy: crop
    curated: true
---

## 한 줄 요약 (One-line Summary)

Skild AI의 로봇 foundation model S1은 최대 10분 길이의 unseen long-horizon 과제를 단 하나의 video 시연만으로 수행한다. in-context learning 방식은 pre-training 데이터가 늘어날수록 language-conditioned VLA보다 훨씬 가파르게 좋아진다는 scaling law를 제시한다.

## 1. 자료 정보 (Document Information)

Skild AI가 2026년 8월 18일 자사 블로그에 공개한 모델 발표 글이다. 회사 이름으로 발표됐고, 13분 분량의 읽을거리에 5:14짜리 인트로 영상이 딸려 있다. 저자들은 이 글이 시리즈의 첫 편이라고 밝히며, S1의 학습 방법 자체는 후속 글에서 다룰 예정이라고 예고한다. 이번 글의 초점은 S1의 in-context learning 능력을 분석하는 데 있다.

S1은 NVIDIA AI infrastructure 위에서 학습됐다고 명시된다. 참고문헌은 6편으로, GPT-3(Brown 2020), BERT(Devlin 2019), Generalist AI의 GEN-1.5(2026), Jiang 등의 RoboTTT(2026), 자사의 LocoFormer(Liu 2025), FACTR 2(Oh 2026)를 인용한다.

## 2. 주요 기여 (Key Contributions)

로봇 foundation model 가운데 처음으로 10분 길이의 unseen long-horizon 과제에서 in-context learning(ICL)에 성공했다고 주장한다. 저자들은 ICL 난이도를 두 기준으로 나눠 본다. 하나는 과제가 pre-training 분포 안에 있는지(seen, in-distribution) 아니면 완전히 새로운지(unseen, out-of-distribution)이고, 다른 하나는 과제가 5~25초짜리 짧고 원자적인 동작인지 아니면 새 skill을 조합해야 하는 long-horizon 과제인지다. long-horizon은 여러 단계를 이어야 끝나는 긴 과제를 말한다.

Skild는 concurrent work인 Generalist AI의 GEN-1.5와 Jiang 등의 RoboTTT가 대부분 short-horizon이거나 이미 pre-training 분포 안에 있는 과제만 다룬다고 짚으며, S1이 이 두 한계를 동시에 넘어선 첫 사례라고 자리매김한다.

핵심 기여는 다음과 같다.

- 데이터 소스 3종(teleoperation, UMI, egocentric video, simulation)을 조합하는 data engine으로 pre-training 데이터를 확보한다.
- ICL scaling law 실험에서, pre-training 데이터를 1,000시간에서 10만 시간까지 늘렸을 때 unseen 과제 성공률이 language-conditioned VLA의 9%에서 ICL의 66%로 벌어진다.
- perturbation 강건성, 실수 회복, common-sense 판단, 시연 데이터(demonstration) 보정 같은 emergent property를 관찰한다.
- L1에서 L5까지 다섯 단계로 분포 이탈을 정량화해 ICL과 VLA의 강건성을 직접 비교한다.
- 시연 데이터 하나가 post-training 시연 데이터 약 380개와 맞먹는다는 시연 데이터 효율성(demonstration efficiency) 추정치를 제시한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

S1의 학습 레시피는 개념적으로 단순하다고 설명한다. episodic 데이터로 pre-training하되, 과제를 오직 in-context 시연 데이터(demonstration)로만 지정한다. 시연 데이터(demonstration)는 사람이 만들어준 모범 실행 데이터를 말하며, 이 글에서는 사람 또는 로봇이 과제를 수행하는 짧은 영상 하나(video prompt)로 주어진다. 시연 데이터가 다른 장면, 다른 시점, 다른 embodiment에서 온 것일 수 있으므로 policy는 시연자의 의도와 물체 사이의 대응 관계, 과제 진행 정도를 암묵적으로 학습해야 다음 action을 예측할 수 있다.

meta-learning 관점에서는 pre-training이 policy에게 "시연에서 배우는 법"을 가르치는 outer loop이고, 추론 시점의 시연 데이터가 가중치를 바꾸지 않은 채 동작을 결정하는 inner loop다. 결과로 나오는 것은 익숙한 동작을 새로운 배치에서도 해내고 처음 보는 동작까지 ICL로 수행하는 단일 policy다. 이 글에 등장하는 모든 예시가 fine-tuning이나 post-training 없이 같은 가중치로 만들어졌다.

### 두 종류의 in-context learning 과제

- out-of-distribution skill 학습: 로봇 데이터는 여전히 희소하고 비싸서 중요한 과제 다수가 pre-training 분포 밖에 있다. 그래서 out-of-distribution ICL이 범용 policy에 필수적이다. 저자들은 ICL pre-training이 만드는 풍부한 video context가 시연에서 action으로 가는 암묵적 매핑을 만들어 새 행동의 test-time 학습을 가능하게 한다고 설명한다.
- long-horizon 과제 조합: 10분짜리 과제를 시연 데이터만으로 실행하려면 새로운 manipulation primitive 시퀀스를 이어 붙이고, 진행 상황을 추적하고, 실수에서 회복하는 능력이 함께 필요하다. primitive는 로봇 API가 노출하는 최소 실행 단위를 가리킨다. 이 능력들은 짧은 과제에서는 제대로 검증되지 않는다.

### Data Engine

로봇 데이터에서 최적인 단일 소스는 없다는 것이 출발점이다. 세 가지 기준에서 모든 주요 데이터 소스가 서로 다른 트레이드오프를 갖는다.

- hardware proximity: 데이터가 배포 하드웨어와 얼마나 닮았는지.
- diversity: 데이터가 담는 과제와 장면과 행동의 다양성.
- scalability: 데이터를 더 모으는 비용.

| 데이터 소스 | hardware proximity | diversity | scalability |
|---|---|---|---|
| Robot teleop | 높음 | 낮음 | 낮음 |
| UMI | 중간 | 중간 | 중간 |
| Egocentric video | 낮음 | 높음 | 높음 |
| Simulation | 중간 | 낮음 | 높음 |

teleoperation은 로봇에 가장 가깝지만 확장성이 가장 나쁘고, egocentric video는 확장성이 가장 좋지만 로봇과의 domain gap이 가장 크다. 어느 하나도 세 기준 모두에서 이기지 못하므로 한 소스에 거는 것은 근시안적이라고 주장하며, Skild는 네 소스를 모두 사내에서 함께 확장하고 있다고 밝힌다.

### ICL scaling law 실험 설계

pre-training 데이터 풀의 일부를 걸러낸 subset으로 통제 실험을 진행했다. ICL policy와 language-conditioned VLA policy를 1,000시간부터 10만 시간까지 같은 데이터, 같은 아키텍처(prompt embedding 부분만 다름), 같은 연산량으로 학습시켰다. 평가는 pre-training 분포 안 과제 벤치마크와 unseen 과제 벤치마크 두 세트로 진행했고, 과제는 모두 4~8분짜리 long-horizon이다. 평가 지표는 전체 과제에 대한 cumulative per-step success rate의 평균이다. 모든 단계를 누적으로 채점하기 위해 rollout 중 실패에서 사람이 개입해 복구시켰는데, 이 개입은 주로 VLA baseline에 쓰였다. VLA baseline은 개입이 없으면 긴 unseen 과제를 한 번도 끝까지 완수하지 못해 점수가 0이 되기 때문이다.

### 분포 이탈 정량화(L1~L5) 프로토콜

분포 이탈은 두 기준으로 나눠 측정했다.

첫 번째 기준은 배포 조건이 pre-training 조건에서 얼마나 벗어났는지다. 좁은 데이터 분포를 갖는 알려진 과제 하나를 골라 다섯 단계로 이탈을 키웠다.

둘째 기준은 배포 장면이 in-context 시연 데이터 자체에서 얼마나 벗어났는지이며, 이때는 pre-training 조건을 고정한 채 시연 데이터와 배포 장면 사이의 거리만 바꿨다.

| 단계 | 뜻 |
|---|---|
| L1 | pre-training 또는 시연 데이터와 같은 물체, 같은 배치 |
| L2 | 모든 물체를 15cm, 30도 무작위로 이동 |
| L3 | 모든 물체를 30cm, 45도 무작위로 이동 |
| L4 | 같은 affordance를 가진 다른 물체로 교체, 약 15cm 수직 이동 추가 |
| L5 | 로봇 action의 절반을 반대쪽 팔로 실행해야 하도록 배치 |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### Seen 과제

1,000시간 pre-training 시점에서는 language-conditioned policy가 53%, ICL이 43%로 language 쪽이 앞섰다. task 지정이 언어 토큰으로 압축되는 VLA와 달리, ICL 모델은 고차원 조건화 데이터 소량에 과적합하기 쉽다는 것이 저자들의 해석이다. 그러나 pre-training을 확장하면 S1의 ICL이 96%까지 올라가 VLA를 앞지른다. 이는 seen 과제에서도 ICL이 언어보다 유리할 수 있다는 신호로 제시된다. 저자들은 이 역전의 원인을 언어의 모호함에서 찾는다. 언어 지시문은 여러 가지 유효한 실행 방식을 허용하지만, 시연 데이터는 실행 방식을 하나로 명확히 지정한다.

### Unseen 과제

pre-training 데이터를 늘렸을 때 두 방식의 격차가 극적으로 벌어진다. language prompting은 완만하게 늘어 10만 시간 시점에 9%에 그친다. 같은 데이터 규모에서 ICL은 66%에 도달한다. 격차가 데이터가 늘수록 지수적으로 벌어진다는 점을 저자들은 ICL scaling law에 대한 낙관적 신호로 꼽는다. 이 현상의 원인으로 두 가지를 든다.

- 새로운 skill: pancake 뒤집기처럼 새로운 동작 primitive는 언어가 행동에 근거를 대기 어려운 지점이다. ICL은 대신 새 행동으로도 전이되는 폭넓은 시각적 대응 관계에 의존한다.
- compositional generalization: 언어는 알려진 primitive를 새로운 방식으로 엮는 지시를 내리기에 너무 성기다. 모델이 한 번도 요청받은 적 없는 조합에는 짧은 지시문이 아예 존재하지 않을 수 있다. 반면 시연 데이터는 그 조합을 그대로 보여준다.

### 분포 이탈에 대한 강건성

첫 번째 기준(training 조건 대비 이탈)에서, L5 교란을 주면 language-prompted VLA가 ICL policy보다 최대 3배 더 크게 성능이 떨어진다. VLA는 물체 위치의 작은 변화에는 강하지만, 새로운 물체가 들어오거나 배치가 새로운 실행 계획을 요구하면 일반화에 실패한다. ICL policy는 배포 조건에 맞는 실행 계획을 그대로 시연 데이터로 받을 수 있어 이 상황에 더 잘 대응한다.

두 번째 기준(시연 데이터 대비 이탈)에서는, ICL이 물체 배치가 어긋나거나 물체가 교체된 상황(L4)까지는 강건하다가, 시연 데이터가 완전히 다른 실행 계획을 요구하는 L5(반대쪽 팔 사용)에 이르러서야 성능이 크게 떨어진다.

### 시연 데이터 효율성

unseen 과제에서 ICL과 language prompting의 격차를 post-training 시연 데이터 개수로 환산했다. VLA policy를 1개에서 2,000개까지의 teleoperation 시연 데이터로 post-training하고, ICL policy는 post-training 없이 단일 시연 데이터 성공률을 수평 기준선으로 놓고 비교했다.

시연 데이터 하나를 context에 넣는 것은 (측정한 지점 사이를 보간해 추정한 결과로) post-training 시연 데이터 약 380개와 맞먹는다. 4~10분짜리 long-horizon 시연 데이터 380개를 모으려면 teleoperation 50~100시간이 필요하다. 해당 과제로 한 번도 post-training되지 않은 ICL policy가 시연 데이터 하나로 66% 성공률을 낸다. post-training은 결국 이를 넘어서 2,000개 시연 데이터로 86% 성공률에 도달하지만, ICL pre-training이나 ICL post-training을 더 확장하면 이 격차가 줄어들 것으로 저자들은 기대한다. seen 과제에서는 이미 ICL이 약 96% 정확도에 도달한다는 점을 다시 짚는다.

### 정성적 사례: emergent property

- perturbation 강건성: 로봇이 접근하는 동안 물체를 밀어내거나 바꿔치기하고 조명을 바꿔도, 시연 데이터에는 없던 교란인데도 S1은 과제를 완수했다.
- 실수 회복: S1이 실패하면 무작정 진행하는 대신 다시 시도하는 경우가 많다. skateboard 바퀴 조립 같은 unseen 과제에서도 이런 복구 행동이 별도 데이터 수집 없이 관찰됐다.
- common-sense 판단: 시연 데이터는 물뿌리개로 화분에 물을 주지만 실제로는 컵밖에 없는 상황에서 S1은 컵을 대신 쓴다. 다른 예시에서는 시연 데이터가 유리컵에 주스를 채우지만 컵이 이미 거의 차 있으면 S1이 남은 만큼만 채우고 멈춘다.
- 시연 데이터 보정: 시연 데이터 자체에 실수가 섞여 있어도 S1이 이를 개선해 수행하는 사례가 있다. 한 시연 데이터에서는 시연자가 달걀을 일찍 놓쳐 어지럽히지만, S1은 같은 단계를 통제된 동작으로 수행한다. 저자들은 S1이 시연 데이터를 그대로 재현할 trajectory가 아니라 목표 명세로 다루는 것이라고 해석한다.

### plant potting 과제 타임라인

teleoperation과 task별 fine-tuning을 거치는 기존 방식과 달리, S1에게 새 과제를 가르치는 데는 몇 분이면 충분하다는 사례로 plant potting 과제의 실제 타임라인을 제시한다.

| 시각 | 사건 |
|---|---|
| 오후 8:54 | 흙, 화분, 물뿌리개, 식물이 사무실에 도착 |
| 오후 9:16 | 장면 세팅 완료, 녹화 시작 |
| 오후 9:22 | 사람의 egocentric video 시연 데이터 1개 녹화 완료 |
| 오후 9:27 | S1이 하드웨어에서 자율 실행 시작 |

시연 데이터가 만들어진 시점부터 자율 실행까지 걸린 시간은 11분이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

이 글은 논문이 아니라 자사 블로그 발표이며, 모델 크기와 아키텍처, 정확한 데이터 규모, 로봇 하드웨어 사양은 공개하지 않는다. 저자들은 학습 방법 자체를 다음 글에서 다루겠다고 예고하지만, 이번 글만으로는 재현이나 독립 검증이 불가능하다.

정량 결과(Fig. 4~7)는 모두 성공률 대 pre-training 규모, 성공률 대 분포 이탈, 성공률 대 시연 데이터 개수를 그린 라인 차트로 제시되지만, 이번 수집에서 캡처한 정지 이미지에는 축과 범례만 남고 실제 데이터 포인트나 선이 렌더링되지 않았다. 스크롤에 반응해 그려지는 JS 차트를 헤드리스 브라우저가 애니메이션 재생 전에 캡처했기 때문으로 보인다. 같은 문제가 [[physical-ai/generalist-ai-2026-gen-1-5-embodied-foundation]] 수집 때도 있었던 반복 패턴이라, 본문에 인용된 수치(43%, 53%, 96%, 9%, 66% 등)로 대체해 서술했다. 원문 페이지를 직접 열어 차트를 확인하는 편이 정확하다.

평가 프로토콜의 세부(시행 횟수, 초기 조건 분포, 성공 판정 기준, 통계적 분산)도 공개되지 않는다. VLA baseline의 정확한 아키텍처도 "prompt embedding 부분만 다르다"는 서술 외에는 알 수 없다. 380개라는 시연 데이터 효율성(demonstration efficiency) 수치 자체도 "측정한 지점 사이를 보간해 추정한" 값이라고 저자들이 명시한다.

concurrent work인 GEN-1.5와 RoboTTT를 "short-horizon이거나 in-distribution에 머문다"고 요약하는 비교도, 자사 결과와 나란히 실린 자사 주도 서술이라는 점을 감안해서 읽을 필요가 있다. S1은 이미 상용 파트너와 함께 배포 중이라고 밝히는데, 이는 발표의 상업적 동기가 있다는 뜻이기도 하다.

## 6. 관련 연구 (Related Work)

저자들은 언어 모델링의 역사를 청사진으로 삼는다. BERT(Devlin 2019) 같은 초기 Transformer는 언어 이해에는 효과적이었지만 새 응용마다 추가 데이터 수집과 fine-tuning이 필요했다. BERT에서 ChatGPT로 넘어가는 결정적 전환은 in-context learning, 즉 prompting이라는 새로운 학습 패러다임의 등장이었고, 이것이 GPT-1, GPT-2 같은 연구용 프로토타입과 오늘날의 frontier 언어 모델을 가르는 기준이라고 설명한다. 이 전환의 근거로 GPT-3(Brown 2020)의 few-shot learning을 든다.

로봇공학은 아직 "BERT 시대"에 머물러 있다는 것이 출발 전제다. 새 과제마다 시간 단위 데이터 수집과 specialist policy fine-tuning이 필요한 현재 관행을 지적하면서, post-training 데이터가 충분히 크고 과제를 촘촘히 덮으면 pre-training 없이 처음부터 학습한 policy도 post-training된 foundation model의 최고 성능과 맞먹는다는 FACTR 2(Oh 2026)의 결과를 인용한다. 이로부터 저자들은 pre-training의 존재 의의가 in-context learning을 가능하게 하는 데 있다고 주장한다.

자사 이전 연구인 LocoFormer(Liu 2025, arXiv:2509.23745)를 직접적인 전신으로 놓는다. LocoFormer는 locomotion에서 살아있는 경험을 prompt에 누적해 적응하는 in-context learner였고, CoRL 2025 Best Paper Award Finalist였다. S1은 이 접근을 manipulation으로 옮긴 결과이며, 저자들은 6개월 전 short-horizon 과제에서 첫 성공 신호를 봤고 이후 데이터와 학습 레시피를 반복 개선해 long-horizon 능력을 얻었다고 밝힌다. 역사적 마일스톤은 2025년 9월(LocoFormer), 2026년 2월(첫 in-domain ICL 결과), 2026년 5월(S1이 처음 pancake를 뒤집음), 2026년 8월(S1 공개) 네 단계로 제시된다.

concurrent work로는 Generalist AI의 GEN-1.5([[physical-ai/generalist-ai-2026-gen-1-5-embodied-foundation]], physical prompt 기반 one-shot learning)와 Jiang 등의 RoboTTT(2026, arXiv:2607.15275)를 든다. 두 연구 모두 manipulation에서 비슷한 아이디어를 시도했지만 short-horizon이거나 pre-training 분포 안 과제, 또는 둘 다에 머문다는 것이 Skild의 평가다.

## 7. 용어집 (Glossary)

| 용어 | 설명 |
|---|---|
| S1 | Skild AI의 manipulation 로봇 foundation model. video 시연 데이터 하나로 seen, unseen 과제를 fine-tuning 없이 수행한다 |
| video prompt | task를 지정하기 위해 context window 앞부분에 넣는 짧은 영상 형태의 시연 데이터. 사람 또는 로봇이 과제를 수행하는 장면을 담는다 |
| LocoFormer | Skild AI가 2025년 발표한 locomotion용 in-context learner. 살아있는 경험을 prompt에 누적해 새 embodiment와 환경에 적응한다. CoRL 2025 Best Paper Award Finalist |
| data engine | hardware proximity, diversity, scalability 세 기준의 트레이드오프를 고려해 teleoperation, UMI, egocentric video, simulation 데이터를 함께 확장하는 Skild의 데이터 전략 |
| ICL scaling law | pre-training 데이터 규모를 1,000시간에서 10만 시간까지 늘리며 ICL과 language-conditioned VLA의 성공률을 비교한 통제 실험과 그 결과 |
| 시연 데이터 보정(demonstration correction) | S1이 시연 데이터에 담긴 실수나 비효율을 그대로 재현하지 않고 개선해 수행하는 현상. 시연 데이터를 trajectory가 아니라 목표 명세로 다룬다는 해석의 근거다 |

## 8. 그림 후보 (Figure Candidates)

원문이 영상 중심이고 정량 차트가 스크롤 트리거 애니메이션이라, 정지 이미지로 의미가 온전히 남는 후보가 제한적이다. "영상 미렌더"는 헤드리스 브라우저가 재생 전 프레임만 캡처한 항목이고, "데이터 없음"은 차트 축과 범례만 렌더되고 실제 값이 그려지지 않은 항목이다.

| id | 원본 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | fig01.jpg | video prompt를 만드는 세 가지 방식(그리퍼/VR/양팔 teleop) | fetched | ★ wiki 권장 (method) |
| fig02 | fig02.jpg | LocoFormer 헤더 썸네일 | fetched | (선택) |
| fig03 | fig03.jpg | LocoFormer adapting 사족보행 로봇 | fetched | (선택) |
| fig04 | fig04.jpg | LocoFormer 실외 보행 | fetched | (선택) |
| fig05 | fig05.jpg | LocoFormer 바퀴형 로봇 지형 적응 | fetched | (선택) |
| fig06 | fig06.jpg | LocoFormer humanoid | fetched | (선택) |
| fig07 | fig07.png | Introducing S1 타이틀 배너 | fetched | ★ wiki 권장 (hero) |
| fig08 | page-full.png | 전체 페이지 스크린샷 | screenshot | (아카이브용) |
| fig09 | crop01.png | Fig. 1 conventional 파이프라인 도식 | crop | (확인 필요, 영상 미렌더) |
| fig10 | crop02.png | Fig. 2 context window 도식 | crop | (확인 필요, 영상 미렌더) |
| fig11 | crop03.png | Fig. 3 데이터 소스 3축 표 | crop | (확인 필요, 값 없음) |
| fig12 | crop04.png | seen 과제 autonomous rollout | crop | ★ wiki 권장 (result) |
| fig13 | crop05.png | unseen long-horizon 과제 + video prompt + 과제 탭 | crop | ★ wiki 권장 (result) |
| fig14 | crop06.png | Fig. 4 pre-training 규모 대비 성공률 | crop | (확인 필요, 데이터 없음) |
| fig15 | crop07.png | perturbation 강건성 rollout 2종 | crop | ★ wiki 권장 (emergent) |
| fig16 | crop08.png | skateboard 바퀴 조립 실수 회복 | crop | ★ wiki 권장 (emergent) |
| fig17 | crop09.png | common-sense 판단 시연 데이터 2종 | crop | ★ wiki 권장 (emergent) |
| fig18 | crop10.png | sub-optimal teleop 시연 2편 | crop | (선택, 검은 화면) |
| fig19 | crop11.png | Fig. 5 training 조건 이탈 대비 성공률 | crop | (확인 필요, 데이터 없음) |
| fig20 | crop12.png | Fig. 6 시연 데이터 이탈 대비 성공률 | crop | (확인 필요, 데이터 없음) |
| fig21 | crop13.png | Fig. 7 post-training 시연 수 대비 성공률 | crop | (확인 필요, 데이터 없음) |
| fig22 | crop14.png | LocoFormer 헤더 + 마일스톤 위젯(3장) | crop | (선택) |
| fig23 | crop15.png | adapting 사족보행 로봇 단독 | crop | (선택) |
| fig24 | crop16.png | 실외 보행 사족보행 로봇 단독 | crop | (선택) |
| fig25 | crop17.png | 바퀴형 로봇 지형 적응 단독 | crop | (선택) |
| fig26 | crop18.png | humanoid 단독 | crop | (선택) |
| fig27 | crop19.png | Fig. 8 네 단계 마일스톤 이종 embodiment 4장 | crop | ★ wiki 권장 (history) |
