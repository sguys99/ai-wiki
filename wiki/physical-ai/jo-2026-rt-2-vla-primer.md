---
title: "03-04. RT-2 - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
source: jo-2026-rt-2-vla-primer.md
raw_path: raw/articles/jo-2026-rt-2-vla-primer.md
raw_filename: "jo-2026-rt-2-vla-primer.md"
source_collection: external
author: "조인령"
url: "https://wikidocs.net/366370"
publisher: "WikiDocs"
tags: [physical-ai, vla, robot-learning, manipulation]
figures:
  - id: fig01
    file: assets/jo-2026-rt-2-vla-primer/fig01.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig01.png
    caption: "RT-2 개요 — 인터넷 규모 VQA와 로봇 데이터를 한 모델에서 co-fine-tune하고 action을 텍스트 토큰으로 출력한 뒤 de-tokenize해 closed-loop 제어에 쓴다 (paper Figure 1)"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/jo-2026-rt-2-vla-primer/fig02.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig02.png
    caption: "일반화 평가 시나리오 — unseen object·background·environment가 각각 무엇을 뜻하는지 예시로 보여준다 (paper Figure 3)"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/jo-2026-rt-2-vla-primer/fig03.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig03.png
    caption: "seen·unseen 전반 성능 막대그래프 — RT-2 두 종(PaLM-E-12B·PaLI-X-55B)이 unseen 축에서 RT-1·MOO·VC-1·R3M을 크게 앞선다 (paper Figure 4)"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/jo-2026-rt-2-vla-primer/fig04.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig04.png
    caption: "Language-Table 결과 — RT-2-PaLI-3B 90±10으로 RT-1 74±13·LAVA 77±4을 상회 (paper Table 1)"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/jo-2026-rt-2-vla-primer/fig05.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig05.png
    caption: "emergent capability 예시 15종 — symbol understanding(move coke can to X)·reasoning(sum of two plus one)·human recognition(Taylor Swift) (paper Figure 2)"
    strategy: fetched
    curated: true
  - id: fig06
    file: assets/jo-2026-rt-2-vla-primer/fig06.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig06.png
    caption: "정량 결과 — (a) emergent skill에서 RT-2 대 baseline (b) 모델 크기·학습 방식(scratch·fine-tuned·co-fine-tuned) ablation (paper Figure 6)"
    strategy: fetched
    curated: true
  - id: fig07
    file: assets/jo-2026-rt-2-vla-primer/fig07.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig07.png
    caption: "chain-of-thought rollout — action 앞에 자연어 Plan을 먼저 생성한다 (paper Figure 7)"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/jo-2026-rt-2-vla-primer/fig08.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig08.png
    caption: "emergent capability 정성 예시 (paper Figure 8)"
    strategy: fetched
    curated: false
  - id: fig09
    file: assets/jo-2026-rt-2-vla-primer/fig09.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig09.png
    caption: "emergent capability 정량 결과표 (paper Table 3)"
    strategy: fetched
    curated: false
  - id: fig10
    file: assets/jo-2026-rt-2-vla-primer/page-full.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷 (아카이브용)"
    strategy: screenshot
    curated: false
---

## 요약 (Summary)

RT-2(Brohan 2023) 논문을 처음 읽는 사람을 위한 한국어 입문 해설이다. "모두의 로보틱스 - VLA 입문" 시리즈 03-04편으로, 앞 편인 [[physical-ai/jo-2026-rt-1-vla-primer]]에서 RT-1을 다룬 뒤 그 후속인 RT-2로 넘어온다. RT-2의 발상은 한 문장으로 줄이면 "action도 언어처럼 본다"는 것이다. 로봇 action을 텍스트 토큰으로 적어 기존 vision-language model을 새 파라미터 없이 그대로 policy로 확장한다. 원 논문 자체는 이미 [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]]로 wiki에 들어와 있어 이 페이지는 그 논문을 처음 읽기 전 몸풀기로 쓰는 편이 맞다.

![[assets/jo-2026-rt-2-vla-primer/fig01.png]]
*Figure 1: RT-2 개요. 인터넷 규모 vision-language 데이터와 로봇 데이터를 한 모델에서 함께 학습하고, 출력한 action token을 de-tokenize해 실제 로봇 제어에 쓴다 (조인령 2026, Figure 1).*

## 방법론 및 아키텍처 (Methodology and Architecture)

RT-2는 PaLI-X와 PaLM-E를 backbone으로 삼고 이미지·텍스트를 처리하던 출력 공간에 로봇 action을 끼워 넣는다. backbone은 RT-2가 재사용하는 기반 VLM을 말하는데 어느 쪽을 쓰느냐에 따라 action을 토큰에 붙이는 방식이 갈린다. PaLI-X는 tokenizer가 이미 1000 이하 정수 토큰을 갖고 있어 action bin 값(128, 91 등)을 바로 대응시킬 수 있다. 반면 PaLM-E에는 그런 정수 토큰 체계가 없어 거의 안 쓰던 토큰 256개를 골라 "이제부터 action 전용"이라고 역할을 새로 준다. 실험 규모는 RT-2-PaLI-X가 5B·55B, RT-2-PaLM-E가 12B다.

학습의 축은 co-fine-tuning이다. co-fine-tuning은 로봇 trajectory 데이터와 웹 vision-language 데이터를 한 배치에 섞어 함께 fine-tuning하는 레시피를 말한다. pre-training된 VLM을 로봇 데이터만으로 fine-tuning하면 기존에 배운 시각·시맨틱 표현이 약해지는데 두 데이터를 함께 유지하면 그 표현을 덜 잊는다. 실제로 robot-only fine-tuning보다 co-fine-tuning이 더 나은 일반화를 보였다. 배치에서 robot data의 비중을 높여 RT-2-PaLI-X는 약 50%, RT-2-PaLM-E는 약 66%로 맞췄다.

추론 때는 task에 따라 낼 수 있는 토큰을 제한한다. 로봇 제어에서는 action token만 생성하고 일반 vision-language task에서는 자연어 전체를 생성하게 해 실행 불가능한 출력을 막는다. 55B 같은 대형 모델을 실제 제어에 연결하려고 RT-2는 클라우드 기반 추론을 쓰며 로봇은 네트워크로 action을 받아 움직인다. control frequency는 로봇이 1초에 몇 번 새 action을 갱신하는지를 뜻하는데 55B는 약 1–3Hz, 5B는 약 5Hz로 동작한다.

## 결과 (Results)

실험은 약 6,000회의 평가 trajectory를 7DoF 모바일 매니퓰레이터 환경에서 돌린다. baseline은 순수 로봇 policy인 RT-1, representation learning을 붙인 VC-1·R3M, VLM을 보조 perception 모듈로 쓰는 MOO다. RT-2만 VLM 자체가 직접 action token을 생성한다.

일반화는 seen task·unseen object·unseen background·unseen environment 네 축으로 나눠 본다. seen에서는 RT-1과 큰 차이가 없지만 unseen에서 격차가 크게 벌어져 RT-2는 novel object·background·environment에서 RT-1·MOO 대비 약 2배, 다른 baseline 대비 최대 6배까지 오른다.

![[assets/jo-2026-rt-2-vla-primer/fig03.png]]
*Figure 4: seen·unseen 전반 성능. seen task에서는 RT-1과 비슷하지만 unseen object·background·environment로 갈수록 RT-2 두 종이 크게 앞선다 (조인령 2026, Figure 4).*

RT-2의 진짜 변화는 emergent capability다. emergent capability는 로봇 데모에 없던 개념 이해가 action 선택에 개입하기 시작한 능력을 말한다. 새 동작을 만들어내는 게 아니라 웹에서 배운 개념으로 이미 배운 동작을 새 기준에 맞춰 꺼내 쓴다. 논문은 이를 세 범주로 정리한다. 장면 속 문자 X를 찾아 그 위로 캔을 옮기는 symbol understanding("move coke can to X"), "sum of two plus one"을 3으로 해석하는 reasoning, 여러 사람 중 목표 인물을 구분하는 human recognition("Taylor Swift")이다. 세 작업 모두 로봇 데모에는 없지만 RT-2는 baseline보다 높은 성공률을 낸다.

![[assets/jo-2026-rt-2-vla-primer/fig05.png]]
*Figure 2: emergent capability 예시. reasoning·symbol understanding·human recognition을 요구하는 실세계 지시 15종으로, 대부분 로봇 데모에 직접 포함되지 않은 상황이다 (조인령 2026, Figure 2).*

큰 모델이라도 scratch로 학습하면 잘 안 된다. 성능을 좌우하는 요소는 구조 자체보다 pre-training과 co-fine-tuning 조합이다. 로봇 데이터만의 fine-tuning보다 co-fine-tuning이 더 잘 일반화하고 모델이 클수록 성능이 오른다.

![[assets/jo-2026-rt-2-vla-primer/fig06.png]]
*Figure 6: (a) emergent skill에서 RT-2가 baseline을 크게 웃돌고, (b) 크기·학습 방식 ablation에서 co-fine-tuned가 fine-tuned·scratch를 앞서며 큰 모델일수록 유리하다 (조인령 2026, Figure 6).*

다른 환경인 Language-Table에서도 RT-2-PaLI-3B가 90±10으로 RT-1 74±13·LAVA 77±4을 앞선다. 웹 pre-training 기반 표현이 특정 환경에 갇히지 않는다는 뜻이다. action 앞에 자연어 "Plan"을 먼저 생성하는 chain-of-thought 변형도 실험하는데 정량 비교보다는 정성 결과지만 더 복잡한 지시를 다루는 데 도움이 될 수 있다고 본다.

## 한계 (Limitations)

가장 큰 한계는 physical skill 자체가 확장되지 않는다는 데 있다. 웹 pre-training이 시맨틱·시각 일반화를 높여주긴 해도 로봇이 실제로 낼 수 있는 동작은 여전히 로봇 데이터의 skill 분포에 묶여 있다. RT-2는 action을 더 잘 "선택"하게 만들 뿐 새 action을 "생성"하지는 못한다. 저자들은 데이터셋이 skill 축에서 다양하지 못한 탓으로 보고 사람 비디오 같은 새 데이터 수집을 제안한다.

계산 비용과 실시간성도 제약이다. 최대 55B 모델을 클라우드(multi-TPU)로 서빙해 원리적으로는 동작하지만 비용이 크고 control frequency가 1–3Hz 수준이라 빠른 제어가 필요한 곳에서는 병목이 된다. 해법으로 quantization·distillation·경량화·저렴한 하드웨어 실행을 든다. 마지막으로 이 접근은 fine-tuning 가능한 대형 VLM을 전제하는데 당시 이런 모델이 proprietary하거나 제한적으로만 열려 있어 재현·확장이 어려웠다. 저자들은 더 많은 open-source 모델과 fine-tuning API 개방을 요청한다.

그래서 RT-2는 완성형 시스템이라기보다 방향을 보여준 연구에 가깝다. RT-1이 generalist policy의 가능성을 열었다면 RT-2는 그다음 단계인 VLA 흐름의 출발점을 만들었고 이후 OpenVLA와 더 넓은 Physical AI 연구의 토대가 된다.

## 관련 페이지 (Related Pages)

- [[physical-ai/jo-2026-rt-1-vla-primer]] — 같은 "모두의 로보틱스 - VLA 입문" 시리즈 바로 앞 편(03-03). RT-1의 기초 개념과 아키텍처를 먼저 익히고 이 페이지로 오는 순서를 권한다.
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]] — 이 페이지가 해설하는 원 논문. 정보량과 정확도는 원 논문 페이지가 더 크므로 입문으로 감을 잡은 뒤 원 논문 페이지로 넘어가는 편이 좋다.
- [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]] — RT-2가 데이터와 256 bin action 이산화를 그대로 물려받은 직접 전신 논문.
- [[overviews/physical-ai-overview]] — physical-ai 카테고리의 분류 뼈대·학습 경로 허브.
