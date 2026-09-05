---
title: "03-04. RT-2 - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
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
    caption: "RT-2 개요. 인터넷 규모 VQA와 로봇 데이터를 한 모델에서 co-fine-tune하고 action을 텍스트 토큰으로 출력한 뒤 de-tokenize해 closed-loop 제어에 쓴다 (paper Figure 1)"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/jo-2026-rt-2-vla-primer/fig02.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig02.png
    caption: "일반화 평가 시나리오. unseen object와 background, environment가 각각 무엇을 뜻하는지 예시로 보여준다 (paper Figure 3)"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/jo-2026-rt-2-vla-primer/fig03.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig03.png
    caption: "seen과 unseen 전반 성능 막대그래프. RT-2 두 종(PaLM-E-12B, PaLI-X-55B)이 unseen 항목에서 RT-1과 MOO, VC-1, R3M을 크게 앞선다 (paper Figure 4)"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/jo-2026-rt-2-vla-primer/fig04.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig04.png
    caption: "Language-Table 결과. RT-2-PaLI-3B 90±10으로 RT-1 74±13과 LAVA 77±4을 상회 (paper Table 1)"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/jo-2026-rt-2-vla-primer/fig05.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig05.png
    caption: "emergent capability 예시 15종. symbol understanding(move coke can to X), reasoning(sum of two plus one), human recognition(Taylor Swift) (paper Figure 2)"
    strategy: fetched
    curated: true
  - id: fig06
    file: assets/jo-2026-rt-2-vla-primer/fig06.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig06.png
    caption: "정량 결과. (a) emergent skill에서 RT-2 대 baseline (b) 모델 크기와 학습 방식(scratch, fine-tuned, co-fine-tuned) ablation (paper Figure 6)"
    strategy: fetched
    curated: true
  - id: fig07
    file: assets/jo-2026-rt-2-vla-primer/fig07.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig07.png
    caption: "chain-of-thought rollout. action 앞에 자연어 Plan을 먼저 생성한다 (paper Figure 7)"
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

## 한 줄 요약 (One-line Summary)

RT-2(Brohan 2023) 논문을 처음 읽는 사람을 위한 한국어 입문 해설이다. "모두의 로보틱스 - VLA 입문" 시리즈 03-04편으로, RT-2가 로봇 action을 언어처럼 다뤄 웹에서 배운 vision-language 지식을 실제 제어로 잇는 방식을 배경과 구조, 결과, 한계 순으로 짚는다.

## 1. 자료 정보 (Document Information)

- 저자: 조인령 (WikiDocs "모두의 로보틱스 - VLA 입문" 시리즈)
- URL: https://wikidocs.net/366370
- 형식: 온라인 강의 챕터 (03-04편, 바로 앞 03-03편이 RT-1)
- 성격: 원 논문 "RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control"(arXiv 2307.15818)의 한국어 입문 해설. 원 논문은 이미 wiki에 `brohan-2023-rt-2-vision-language-action-models-transfer-web`로 들어와 있어 이 페이지는 그 논문을 처음 읽기 전 진입로에 가깝다.

## 2. 주요 기여 (Key Contributions)

이 해설이 전달하는 RT-2의 핵심은 네 가지다.

- action을 언어처럼 본다. 로봇 action을 텍스트 토큰으로 적어 기존 VLM의 토큰 예측 틀을 그대로 둔 채 출력 표현만 바꾼다.
- 기존 VLM(PaLI-X와 PaLM-E)을 backbone으로 재사용한다. 새 아키텍처를 발명하는 대신 이미 강한 vision-language model을 로봇 제어까지 확장한다.
- co-fine-tuning이 핵심 레시피다. 로봇 데이터만으로 fine-tuning하지 않고 웹 vision-language 데이터를 배치에 계속 섞어 pre-training에서 얻은 개념을 잊지 않게 한다.
- emergent capability가 나타난다. 로봇 데모에 없던 기호 이해와 수리/다국어 추론, 인물 인식이 웹 pre-training에서 전이돼 action 선택에 반영된다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

RT-2는 PaLI-X와 PaLM-E를 backbone으로 삼고 이미지와 텍스트를 처리하던 출력 공간에 로봇 action을 삽입한다. backbone마다 action을 토큰에 붙이는 방식이 다르다. PaLI-X는 tokenizer가 이미 1000 이하 정수 토큰을 갖고 있어 action bin 값(128, 91 등)을 바로 대응시킬 수 있고 PaLM-E는 그런 정수 토큰 체계가 없어 거의 안 쓰던 토큰 256개를 골라 action 전용으로 역할을 새로 준다. 실험 규모는 RT-2-PaLI-X가 5B와 55B, RT-2-PaLM-E가 12B다.

학습의 핵심 요소는 co-fine-tuning이다. co-fine-tuning은 로봇 trajectory 데이터와 웹 vision-language 데이터를 한 배치에 섞어 함께 학습하는 레시피를 말한다. pre-training된 VLM을 로봇 데이터만으로 fine-tuning하면 기존 시각 표현과 시맨틱 표현이 약해지는데 두 데이터를 함께 유지하면 그 표현을 덜 잊는다. 배치에서 robot data의 비중을 높여 RT-2-PaLI-X는 약 50%, RT-2-PaLM-E는 약 66%로 맞췄다.

추론 때는 task에 따라 낼 수 있는 토큰을 제한한다. 로봇 제어에서는 action token만, 일반 vision-language task에서는 자연어 전체를 생성하게 해 실행 불가능한 출력을 막는다. 55B 같은 대형 모델을 실제 제어에 연결하려고 클라우드 기반 추론을 쓰며 로봇은 네트워크로 action을 받아 움직인다. control frequency는 로봇이 1초에 몇 번 새 action을 갱신하는지를 뜻한다. 55B는 약 1–3Hz, 5B는 약 5Hz다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

실험은 약 6,000회의 평가 trajectory를 7DoF 모바일 매니퓰레이터 환경에서 실행한다. baseline은 순수 로봇 policy인 RT-1, representation learning을 붙인 VC-1과 R3M, VLM을 보조 perception 모듈로 쓰는 MOO다. RT-2만 VLM 자체가 직접 action token을 생성한다.

일반화는 seen task, unseen object, unseen background, unseen environment 네 항목으로 나눠 본다. seen에서는 RT-1과 큰 차이가 없지만 unseen에서 격차가 크게 벌어진다. RT-2는 novel object와 background, environment에서 RT-1과 MOO 대비 약 2배, 다른 baseline 대비 최대 6배까지 오른다. 다른 환경인 Language-Table에서도 RT-2-PaLI-3B가 90±10으로 RT-1 74±13과 LAVA 77±4을 앞선다. 웹 pre-training 기반 표현이 특정 환경에 갇히지 않는다는 뜻이다.

RT-2의 진짜 변화는 emergent capability다. 웹에서 배운 개념이 action 선택에 개입하기 시작한 것으로, symbol understanding("move coke can to X"의 문자 X 찾기), reasoning("sum of two plus one"을 3으로 해석), human recognition("Taylor Swift" 식별) 세 범주로 정리된다. 이 작업들은 로봇 데모에 없었지만 RT-2는 baseline보다 높은 성공률을 낸다. 핵심은 새 동작을 배우는 게 아니라 이미 배운 동작을 더 넓은 개념과 연결해 꺼내 쓰는 데 있다.

성능을 좌우하는 요소는 구조 자체보다 pre-training과 co-fine-tuning 조합이다. 큰 모델을 scratch로 학습하면 잘 안 되고 로봇 데이터만의 fine-tuning보다 co-fine-tuning이 더 잘 일반화하며 모델이 클수록 성능이 오른다. action 앞에 자연어 "Plan"을 먼저 생성하는 chain-of-thought 변형도 실험하는데 정량 비교보다는 정성 결과지만 더 복잡한 지시를 다루는 데 도움이 될 수 있다고 본다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

가장 큰 한계는 physical skill 자체가 확장되지 않는다는 데 있다. 웹 pre-training은 시맨틱 일반화와 시각 일반화를 높여주지만 로봇이 실제로 낼 수 있는 동작은 여전히 로봇 데이터의 skill 분포에 묶여 있다. RT-2는 action을 더 잘 "선택"하게 만들 뿐 새 action을 "생성"하지는 못한다. 저자들은 데이터셋이 skill 측면에서 충분히 다양하지 않은 탓으로 보고 사람 비디오 같은 새 데이터 수집을 제안한다.

계산 비용과 실시간성도 제약이다. 최대 55B 모델을 클라우드(multi-TPU)로 서빙해 원리적으로는 동작하지만 비용이 크고 control frequency가 1–3Hz 수준이라 빠른 제어가 필요한 환경에서는 병목이 된다. 해법으로 quantization과 distillation, 경량화, 저렴한 하드웨어 실행을 든다. 마지막으로 fine-tuning 가능한 대형 VLM이 필요한데 당시 이런 모델이 proprietary하거나 제한적으로만 열려 있어 재현과 확장이 어려웠다. 저자들은 더 많은 open-source 모델과 fine-tuning API 개방을 요청한다.

## 6. 관련 연구 (Related Work)

- RT-1(Brohan 2022): 직접 전신. RT-2는 RT-1의 로봇 데이터와 256 bin action 이산화를 그대로 물려받고 backbone만 대형 VLM으로 키웠다.
- PaLI-X와 PaLM-E: RT-2의 backbone. RT-2 성능은 이 VLM들의 표현력에 크게 기댄다.
- SayCan과 MOO 등 이전 로봇 학습 접근과 대비되며 이후 OpenVLA와 더 넓은 Physical AI 흐름의 토대가 된다.

## 7. 용어집 (Glossary)

- RT-2: 로봇 action을 텍스트 토큰으로 표현해 기존 VLM을 policy로 확장한 vision-language-action model. RT-1의 후속.
- co-fine-tuning: 로봇 데이터와 웹 vision-language 데이터를 한 배치에 섞어 함께 fine-tuning하는 레시피. pre-training 개념 유지가 목적.
- emergent capability: 로봇 데모에 없던 기호 이해와 추론, 인물 인식이 웹 pre-training에서 전이돼 action 선택에 반영되는 능력. 새 동작 생성이 아니라 기존 동작의 새로운 배치를 뜻한다.
- action token: 로봇 action을 이산 bin으로 나눠 텍스트 토큰처럼 적은 표현.
- backbone: RT-2가 재사용하는 기반 VLM(PaLI-X와 PaLM-E).

## 8. 그림 후보 (Figure Candidates)

| id | label | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | Figure 1 | RT-2 개요, co-fine-tune과 action 토큰화, de-tokenize closed-loop | fetched | ★ wiki 권장 (architecture) |
| fig02 | Figure 3 | 일반화 평가 시나리오(unseen object/background/environment) | fetched | (확인 필요) |
| fig03 | Figure 4 | seen과 unseen 전반 성능 막대그래프 | fetched | ★ wiki 권장 (result) |
| fig04 | Table 1 | Language-Table 결과(90±10) | fetched | (확인 필요) |
| fig05 | Figure 2 | emergent capability 예시 15종 | fetched | ★ wiki 권장 (emergent) |
| fig06 | Figure 6 | emergent skill 비교 + 크기와 학습 방식 ablation | fetched | ★ wiki 권장 (result/ablation) |
| fig07 | Figure 7 | chain-of-thought rollout(Plan+Action) | fetched | (선택) |
| fig08 | Figure 8 | emergent capability 정성 예시 | fetched | (선택) |
| fig09 | Table 3 | emergent capability 정량 결과표 | fetched | (선택) |
| fig10 | (없음) | 전체 페이지 스크린샷 | screenshot | (아카이브) |
