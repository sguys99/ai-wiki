---
title: "03-09. Pi-0.6 - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/jo-2026-pi-0-6-vla-primer.md
raw_filename: "jo-2026-pi-0-6-vla-primer.md"
source_collection: external
author: "조인령"
url: "https://wikidocs.net/366375"
publisher: "wikidocs.net"
fetched_at: "2026-08-25T09:44:20+0900"
extractor_tier: "chrome"
tags: [physical-ai, vla, rl-control, robot-learning]
figures:
  - id: fig01
    file: assets/jo-2026-pi-0-6-vla-primer/fig01.png
    raw: raw/articles/jo-2026-pi-0-6-vla-primer-figures/fig01.png
    caption: "강화학습의 기본 루프. agent/policy가 action을 내보내고 environment가 observation과 reward를 돌려준다. 저자가 직접 그린 도식이다"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/jo-2026-pi-0-6-vla-primer/fig02.png
    raw: raw/articles/jo-2026-pi-0-6-vla-primer-figures/fig02.png
    caption: "policy extraction 방식 비교 (논문 Figure 11 캡처). AWR과 PPO 대비 advantage conditioning의 throughput과 성공률"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/jo-2026-pi-0-6-vla-primer/fig03.png
    raw: raw/articles/jo-2026-pi-0-6-vla-primer-figures/fig03.png
    caption: "π*0.6 VLA와 value function 연결 구조 (논문 Figure 3 캡처, 영문 캡션 포함)"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/jo-2026-pi-0-6-vla-primer/fig04.png
    raw: raw/articles/jo-2026-pi-0-6-vla-primer-figures/fig04.png
    caption: "throughput 비교 (논문 Figure 7 캡처, 영문 캡션 포함)"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/jo-2026-pi-0-6-vla-primer/fig05.png
    raw: raw/articles/jo-2026-pi-0-6-vla-primer-figures/fig05.png
    caption: "success rate 비교 (논문 Figure 8 캡처, 영문 캡션 포함)"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/jo-2026-pi-0-6-vla-primer/fig06.png
    raw: raw/articles/jo-2026-pi-0-6-vla-primer-figures/fig06.png
    caption: "반복 횟수에 따른 개선 (논문 Figure 9와 10 캡처, 영문 캡션 포함)"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/jo-2026-pi-0-6-vla-primer/page-full.png
    raw: raw/articles/jo-2026-pi-0-6-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

## 한 줄 요약 (One-line Summary)

"모두의 로보틱스 - VLA 입문" 시리즈의 아홉 번째 글이다. RECAP의 수식 전개를 강화학습 기초부터 차근차근 따라가며 π*0.6을 한국어로 해설한다.

## 1. 자료 정보 (Document Information)

- 제목: 03-09. Pi-0.6 - 모두의 로보틱스 - VLA 입문
- 저자: 조인령
- 게시: wikidocs.net/366375
- 원본: `raw/articles/jo-2026-pi-0-6-vla-primer.md`
- 시리즈: [[physical-ai/jo-2026-rt-1-vla-primer]], [[physical-ai/jo-2026-rt-2-vla-primer]], [[physical-ai/jo-2026-act-vla-primer]], [[physical-ai/jo-2026-openvla-vla-primer]]와 같은 연재의 03장

구성은 원 논문을 따라간다. 같은 시리즈의 다른 글들과 같은 방식이다. 다만 수식이 나오는 대목마다 왜 그 식이 필요한지를 먼저 설명한다. 도식은 대부분 논문 figure를 캡처해 붙인다.

## 2. 주요 기여 (Key Contributions)

π 계열 논문 중 강화학습을 VLA 학습에 쓴 첫 연구. 이 글은 π*0.6을 첫 문장부터 그렇게 소개한다. π 계열 안에 이 모델을 놓는 방식이 눈에 띄는 대목이다. RECAP이 π 모델의 강점인 이질적 데이터 활용과 2단계 학습 과정에 특히 잘 맞았다고도 덧붙인다.

예비 지식 절만 전체의 3분의 1이다. 강화학습을 모르는 독자를 겨냥한 대목이다. agent, observation, action, policy, reward에서 출발해 return과 목적함수를 정의한다. 거기서 value function과 advantage를 지나 regularized RL까지 올라간 다음에야 RECAP이 나온다. 논문이 Section III에 압축해 둔 내용을 풀어 쓴 셈이다.

수식 유도도 건너뛰지 않는다. 베이즈 정리를 적용하면 π̂(a|o,ℓ) ∝ π_ref(a|o,ℓ)×(π_ref(a|I,o,ℓ)/π_ref(a|o,ℓ))^β 가 나온다. 여기에 β=1을 넣으면 분모와 분자가 약분되어 π̂(a|o,ℓ) = π_ref(a|I,o,ℓ)로 줄어든다. 그 단계를 하나씩 보여 준다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 예비 지식

observation은 로봇 카메라에 찍힌 탁자 위 컵, action은 팔을 3cm 앞으로 뻗는 동작이다. 예비 지식 절은 이런 식으로 기호마다 로봇 맥락의 예시를 붙인다. 강화학습의 기본 루프 자체는 agent/policy와 environment가 action과 observation, reward를 주고받는 그림 하나로 정리한다.

"내가 지금 잘하고 있나". value function과 advantage를 이 질문을 재는 두 지표로 소개한다. value function은 현재 상황의 기대 총점이다. advantage는 특정 action의 비교 우위를 가리킨다. A>0이면 평균보다 좋은 action, A<0이면 나쁜 action이다.

regularized RL 절은 왜 규제가 필요한지를 로봇 맥락으로 검토한다. 점수만 노리면 엉뚱하거나 위험한 행동이 나올 수 있다. 로봇에는 이미 사람이 조종해 모은 검증된 데이터가 있다. 그 reference policy에서 너무 벗어나지 말라는 KL divergence 항을 목적함수에 더한다.

### RECAP 3단계

RECAP의 세 단계는 데이터 수집, value function 학습, advantage conditioned training이다. 사람이 직접 조작한 데이터에서는 뒤의 두 단계만 실행한다. 그다음 로봇이 자율로 모은 데이터를 더해 세 단계를 처음부터 반복한다. 이 순서까지 적어 둔다.

논문의 수식 (1)은 distributional value function 절이 받아 푼다. 가치를 스칼라로 회귀하지 않는다. 201개 bin의 확률 분포로 예측한 뒤 cross entropy를 최소화한다. 추론 시에는 bin 값과 확률의 가중합으로 연속값을 되살린다. on-policy Monte Carlo 방식이 정통 off-policy Q-function보다 이론적으로 덜 최적이라는 논문의 자평도 그대로 옮긴다.

다양한 데이터셋에서 작동할 것, 대형 VLA에 붙일 만큼 확장될 것, 나쁜 표본까지 쓸 것. policy extraction 절은 필요 조건을 이렇게 셋 세워 놓고 기존 방법이 왜 그 조건을 못 채우는지 하나씩 짚는다. AWR 계열은 flow matching에 적용하기 수학적으로 복잡하거나 나쁜 데이터를 버리는 필터링에 가깝다고 본다.

이진 지표 설계의 의도도 논문보다 직설적으로 적는다. advantage가 임계값 ε_ℓ를 넘으면 I=1, 못 넘으면 I=0이다. 이렇게 둘로 가르는 것이 로봇의 과격한 움직임을 막는 장치라고 읽는다. 사람의 조작과 개입 데이터에는 무조건 I=1을 준다. 로봇이 실수한 데이터에는 I=0 꼬리표를 달아 함께 학습시킨다. 저자는 그것을 오답 노트로 쓴다고 비유한다.

### π0.6과 π*0.6 아키텍처

π0.6은 π0.5 구조를 대부분 이어받는다고 정리한다. 손을 댄 곳으로는 backbone VLM을 Gemma 3 4B로 올린 것과 action expert를 860M 파라미터로 키운 것을 꼽는다. 그 덕에 50Hz 제어가 가능해졌다고 적는다. Knowledge Insulation을 두고는 연속 동작 학습이 모델의 언어 지식과 시각 지식을 훼손하지 않도록 stop-gradient를 거는 기법이라고 풀이한다.

π*0.6이 여기에 더하는 것은 advantage conditioning 하나뿐이다. 입력에 "Advantage: positive" 또는 "Advantage: negative"라는 텍스트 지표를 달아 준다. 실행 시에는 positive 쪽을 강제해 성공 확률이 높은 동작만 고르게 한다. 그래서 로봇이 미션 인식 → subtask 계획 → advantage 확인 → action 생성 순으로 흐르는 구조가 된다고 정리한다.

학습 과정은 pre-training, SFT, post-training & RL이 반복되는 3단계 루프다. SFT 단계에서는 지표를 항상 positive로 고정한다. "이것이 정답이다"라는 가이드로 삼기 위해서라고 풀이한다.

성공하면 0점, 남은 단계마다 −1점, 실패 시에는 큰 감점이다. value function 라벨링 방식도 별도 절로 다루는데, 그 sparse reward 설계가 로봇을 빠르고 효율적으로 움직이게 만든다고 본다. value function 자체는 Gemma 3 기반 670M 모델을 쓴다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

결과 절은 논문 Figure 7, 8, 9, 10을 캡처해 온다. π0.5 대비 π0.6이 크게 앞선다. 거기에 RECAP까지 적용하면 가장 좋은 성적이 나온다. 시간당 성공 횟수에서 향상 폭이 특히 크다. 정확도는 모든 과제에서 우수했다고 적는다.

반복 학습의 효과도 함께 짚는다. iteration을 0회에서 늘려 갈수록 시간당 성공 횟수와 성공률이 함께 오르는 그래프를 두고, "이것이 강화학습의 진정한 효과"라고 마무리한다.

원 논문의 수치는 하나씩 옮기지 않고 그래프 캡처와 방향성 서술로 대신한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문의 한계 절은 다루지 않는다. 사람 손이 드는 라벨링, 개입과 리셋, 단순한 탐색, on-policy value 추정이 거기 들어 있다. 해설 글의 범위를 방법론과 결과까지로 잡은 탓이다. 마지막 "Ⅵ. 정리" 절은 두 문단짜리 결론으로, π0.6이 VLM 변형이던 기존 π 계열과 달리 강화학습을 적용한 첫 모델이라는 점과, 강화학습을 학습 방법에 그치지 않고 데이터 수집 자동화에 쓴 점을 성과로 꼽는다.

## 6. 관련 연구 (Related Work)

관련 연구 역할은 시리즈의 앞 글들이 맡는다. 03장이 ACT, OpenVLA, RT-1, RT-2를 차례로 다뤄 왔고 이 글이 그 흐름의 아홉 번째다. π0.5는 π0.6의 직전 모델이라 본문이 반복해서 언급하지만 별도 링크는 걸려 있지 않다.

## 7. 용어집 (Glossary)

- **advantage conditioning**: 이 글은 이 기법을 한글 음차 표기로 옮겨 적었다. wiki 본문에서는 용어집 canonical에 따라 원어로 쓴다.
- **오답 노트**: 실패 데이터에 I=0을 붙여 학습에 함께 넣는 방식을 저자가 설명한 비유.
- **Pi-0.6 / Pi-0.6\***: 이 글의 표기법. 별표 위치가 논문(π*0.6)과 달리 뒤에 붙는 경우가 섞여 있다.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 강화학습 기본 루프 (저자 자작 도식) | fetched | ★ wiki 권장 (저자 고유 도식) |
| fig02 | policy extraction 비교 (논문 Fig 11 캡처) | fetched | (중복, 논문 쪽 fig11 사용 권장) |
| fig03 | π*0.6과 value function 구조 (논문 Fig 3 캡처) | fetched | (중복, 논문 쪽 fig03 사용 권장) |
| fig04 | throughput (논문 Fig 7 캡처) | fetched | (중복, 논문 쪽 fig07 사용 권장) |
| fig05 | success rate (논문 Fig 8 캡처) | fetched | (중복, 논문 쪽 fig08 사용 권장) |
| fig06 | 반복 개선 (논문 Fig 9와 10 캡처) | fetched | (중복, 논문 쪽 fig09와 fig10 사용 권장) |
| fig07 | 전체 페이지 스크린샷 | screenshot | (선택) |

fig02~fig06은 논문 figure를 영문 캡션째로 캡처한 것이라 원본 크롭이 더 깨끗하다. 저자가 직접 그린 fig01이 이 글에만 있는 도식이다.
