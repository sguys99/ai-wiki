---
title: "03-09. Pi-0.6 - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
source: jo-2026-pi-0-6-vla-primer.md
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
    caption: "강화학습의 기본 루프 — agent/policy가 action을 내보내고 environment가 observation과 reward를 돌려준다. 저자가 직접 그린 도식이다"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/jo-2026-pi-0-6-vla-primer/fig02.png
    raw: raw/articles/jo-2026-pi-0-6-vla-primer-figures/fig02.png
    caption: "policy extraction 방식 비교 (논문 Figure 11 캡처)"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/jo-2026-pi-0-6-vla-primer/fig03.png
    raw: raw/articles/jo-2026-pi-0-6-vla-primer-figures/fig03.png
    caption: "π*0.6 VLA와 value function 연결 구조 (논문 Figure 3 캡처)"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/jo-2026-pi-0-6-vla-primer/fig04.png
    raw: raw/articles/jo-2026-pi-0-6-vla-primer-figures/fig04.png
    caption: "throughput 비교 (논문 Figure 7 캡처)"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/jo-2026-pi-0-6-vla-primer/fig05.png
    raw: raw/articles/jo-2026-pi-0-6-vla-primer-figures/fig05.png
    caption: "success rate 비교 (논문 Figure 8 캡처)"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/jo-2026-pi-0-6-vla-primer/fig06.png
    raw: raw/articles/jo-2026-pi-0-6-vla-primer-figures/fig06.png
    caption: "반복 횟수에 따른 개선 (논문 Figure 9·10 캡처)"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/jo-2026-pi-0-6-vla-primer/page-full.png
    raw: raw/articles/jo-2026-pi-0-6-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

## 요약 (Summary)

"모두의 로보틱스 — VLA 입문" 시리즈의 아홉 번째 글이다. [[physical-ai/amin-2025-pistar06-a-vla-that-learns|π*0.6 논문]]을 처음 펼치는 사람이 독자다. 강화학습 기초부터 RECAP 수식 유도까지 한국어로 풀어 쓴다.

π 계열 논문 중 강화학습을 VLA 학습에 쓴 첫 연구. 이 글은 π*0.6을 첫 문장부터 그렇게 소개한다. π 계열 안에 이 모델을 놓는 방식이 눈에 띄는 대목이다. RECAP이 π 모델의 강점인 이질적 데이터 활용과 2단계 학습 과정에 특히 잘 맞았다고도 덧붙인다.

예비 지식만 전체의 3분의 1이다. 논문이 Section III에 압축해 둔 강화학습 정의를 풀어 놓는다. 거기서 value function과 advantage를 지나 regularized RL까지 올라간 다음에야 RECAP이 나온다. 논문을 바로 펼쳤다가 걸리는 대목을 미리 치워 주는 구성이다.

## 예비 지식 절 (Prerequisites)

![[assets/jo-2026-pi-0-6-vla-primer/fig01.png]]
*강화학습의 기본 루프 — agent/policy가 action을 내보내고 environment가 observation과 reward를 돌려준다 (조인령 2026, 자작 도식)*

observation은 로봇 카메라에 찍힌 탁자 위 컵, action은 팔을 3cm 앞으로 뻗는 동작이다. agent·observation·action·policy·reward를 도식 하나에 모아 놓고, 기호마다 이런 로봇 맥락의 예시를 단다. 여기서 return과 목적함수 J(π)를 정의한다.

"내가 지금 잘하고 있나". value function과 advantage를 이 질문을 재는 두 지표로 소개한다. value function은 현재 상황의 기대 총점이다. advantage는 특정 action의 비교 우위를 가리킨다. A>0이면 평균보다 좋은 action, A<0이면 나쁜 action이다.

왜 규제가 필요한지는 regularized RL 절이 로봇 맥락으로 따진다. 점수만 노리면 엉뚱하거나 위험한 행동이 나올 수 있다. 로봇 쪽에는 이미 사람이 조종해 모은 검증된 데이터가 있다. 그 reference policy에서 너무 벗어나지 말라는 KL divergence 항을 목적함수에 더한다.

## 수식 유도를 생략하지 않는다 (The Derivation)

이 글은 논문 식 (2)의 유도를 한 단계씩 다 보여 준다. 출발점은 이론적 최적 policy를 π̂(a|o) ∝ π_ref(a|o)·p(I|A(o,a))^β 로 정의하는 대목이다. 개선 확률에 베이즈 정리를 적용하면 여기서 p(I|A) ∝ π_ref(a|I,o,ℓ)/π_ref(a|o,ℓ)가 나온다.

이 결과를 원식에 대입하면 π̂(a|o,ℓ) ∝ π_ref(a|o,ℓ)·(π_ref(a|I,o,ℓ)/π_ref(a|o,ℓ))^β 가 된다. 여기에 β=1을 넣으면 π_ref(a|o,ℓ)끼리 약분되어 식이 π̂(a|o,ℓ) = π_ref(a|I,o,ℓ)로 줄어든다. 저자는 이 지점을 "수학적 트릭"이라 부른다. 식이 단순해지고 나니 policy가 성공 지표 I를 조건으로 받는 형태로 깔끔하게 바뀌더라는 흐름으로 서술한다.

이진 지표를 왜 그렇게 설계했는지도 논문보다 직설적으로 밝힌다. advantage가 임계값을 넘으면 I=1, 못 넘으면 I=0이다. 이렇게 둘로 가르는 것이 로봇의 과격한 움직임을 막는 장치라고 읽는다. 사람의 조작·개입 데이터에는 무조건 I=1을 준다. 로봇이 실수한 데이터에는 I=0 꼬리표를 달아 함께 학습시킨다. 저자는 그것을 오답 노트로 쓴다고 비유한다.

## 아키텍처 서술 (Architecture)

π0.6은 π0.5 구조를 대부분 이어받는다고 정리한다. 손을 댄 곳으로는 backbone VLM을 Gemma 3 4B로 올린 것과 action expert를 860M 파라미터로 키운 것을 꼽는다. 그 덕에 50Hz 제어가 가능해졌다고 적는다. Knowledge Insulation을 두고는 연속 동작 학습이 모델의 언어·시각 지식을 훼손하지 않도록 stop-gradient를 거는 기법이라고 풀이한다.

π*0.6이 여기에 더하는 것은 advantage conditioning 하나뿐이다. 입력에 "Advantage: positive" 또는 "Advantage: negative"라는 텍스트 지표를 달아 준다. 실행 시에는 positive 쪽을 강제해 성공 확률이 높은 동작만 고르게 한다. 그래서 로봇이 미션 인식 → subtask 계획 → advantage 확인 → action 생성 순으로 흐르는 구조가 된다고 정리한다.

학습은 pre-training, SFT, post-training & RL이 도는 3단계 루프다. SFT 단계에서는 지표를 항상 positive로 고정한다. 그 이유를 "이것이 정답이다"라는 가이드로 삼기 위해서라고 풀이한다. 논문은 "약간 더 나은 결과가 나와서"라고만 적었으니 여기에 해석을 붙인 셈이다.

성공하면 0점, 남은 단계마다 −1점, 실패 시에는 큰 감점이다. value function 라벨링도 별도 절로 다루는데, 그 sparse reward 설계가 로봇을 빠르고 효율적으로 움직이게 만든다고 본다.

## 결과 서술 (Results)

논문 Figure 7·8·9·10을 그대로 캡처해 온다. π0.5 대비 π0.6이 크게 앞선다. 거기에 RECAP까지 적용하면 가장 좋은 성적이 나온다. 시간당 성공 횟수에서 향상 폭이 특히 크다. 정확도는 모든 과제에서 우수했다고 적는다.

반복 학습의 효과도 함께 짚는다. iteration을 늘려 갈수록 시간당 성공 횟수와 성공률이 나란히 오르는 그래프를 두고 "이것이 강화학습의 진정한 효과"라고 마무리한다.

개별 수치는 옮기지 않는다. 그래프 캡처와 방향성 서술로 대신하는 편이라 수치가 필요하면 논문 페이지를 본다. 논문의 한계 절도 건너뛴다. 마지막 "Ⅵ. 정리" 절은 제목만 있고 본문이 비어 있는 상태로 들어왔다.

## 이 저장소 안에서의 위치 (Position in This Wiki)

[[physical-ai/jo-2026-rt-1-vla-primer|RT-1]] → [[physical-ai/jo-2026-rt-2-vla-primer|RT-2]] → [[physical-ai/jo-2026-act-vla-primer|ACT]] → [[physical-ai/jo-2026-openvla-vla-primer|OpenVLA]]로 이어져 온 시리즈의 연장이다. 앞 네 편은 VLA 아키텍처가 어떻게 바뀌어 왔는지를 따라갔다. 이번 편에서 축이 학습 방법으로 넘어간다. 시리즈에서 강화학습이 본격적으로 등장하는 것도 이 글이 처음이다.

서술 방식도 여기서 한 번 바뀐다. 앞선 편들은 모델 구조 도식 위주였다. 이 글에서는 수식 유도의 비중이 크다. RECAP의 핵심이 아키텍처가 아니라 목적함수에 있어서다. 논문 페이지와 나란히 읽으면 역할 분담도 분명해진다. 왜 그 식이 필요한지는 이쪽이 맡는다. 수치와 ablation은 논문 페이지가 담는다. 강화학습 배경 없이 π*0.6에 접근한다면 이 글을 먼저 보는 쪽이 빠르다.

옮겨 온 도식은 저자 자작인 강화학습 루프 하나뿐이다. fig02~fig06은 논문 figure를 영문 캡션째로 캡처한 것이라 원본 크롭 쪽이 더 깨끗하다. 그 크롭은 논문 페이지에 이미 올려 두었다.

## 관련 페이지 (Related Pages)

- [[physical-ai/amin-2025-pistar06-a-vla-that-learns]] — 원 논문. 수치·ablation·평가 기준은 그쪽에 있다
- [[physical-ai/physical-intelligence-2025-a-vla-that-learns-from]] — 공식 블로그. 배치 규모와 영상이 여기에 있다
- [[physical-ai/jo-2026-openvla-vla-primer]] — 같은 시리즈 03-06편
- [[physical-ai/jo-2026-act-vla-primer]] — 같은 시리즈 03-05편
- [[physical-ai/jo-2026-rt-2-vla-primer]] — 같은 시리즈 03-04편
- [[physical-ai/jo-2026-rt-1-vla-primer]] — 같은 시리즈 03-03편
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]] — 본문이 반복 언급하는 직전 모델
- [[overviews/glossary-physical-ai]] — 이 글의 "어드밴티지 조건화" 같은 표기를 wiki canonical로 옮길 때 참조
- [[overviews/physical-ai-overview]] — 도메인 허브
