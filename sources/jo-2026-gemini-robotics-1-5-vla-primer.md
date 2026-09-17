---
title: "03-16. Gemini Robotics 1.5 - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/jo-2026-gemini-robotics-1-5-vla-primer.md
raw_filename: "jo-2026-gemini-robotics-1-5-vla-primer.md"
source_collection: external
author: "조인령"
url: "https://wikidocs.net/366382"
publisher: "wikidocs.net"
fetched_at: "2026-09-17T21:25:03+0900"
extractor_tier: "chrome"
tags: [physical-ai, vla, robot-learning, humanoid]
figures:
  - id: fig01
    file: assets/jo-2026-gemini-robotics-1-5-vla-primer/fig01.png
    raw: raw/articles/jo-2026-gemini-robotics-1-5-vla-primer-figures/fig01.png
    caption: "Gemini Robotics 1.5 모델 가족 개요. 위쪽 Gemini Robotics-ER 1.5는 음성과 텍스트와 이미지를 받아 thinking trace를 거쳐 pointing과 trajectory 예측 같은 텍스트를 내고 검색과 코드 실행 도구를 부르며, 아래쪽 Gemini Robotics 1.5는 proprioception과 이미지와 지시문을 받아 thinking trace를 거쳐 ALOHA 2, Bi-arm Franka, Apptronik Apollo의 action을 낸다 (원 논문 Figure 1)"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/jo-2026-gemini-robotics-1-5-vla-primer/fig02.png
    raw: raw/articles/jo-2026-gemini-robotics-1-5-vla-primer-figures/fig02.png
    caption: "generality(x축)와 embodied reasoning 점수(y축) 산점도. GR-ER 1.5 Thinking On이 가장 높고 Gemini 2.5 Pro, GPT-5, Gemini 2.5 Flash, GPT-5-mini, 이전 GR-ER이 아래에 있다 (원 논문 Figure 8)"
    strategy: fetched
    curated: true
  - id: fig03
    file: assets/jo-2026-gemini-robotics-1-5-vla-primer/fig03.png
    raw: raw/articles/jo-2026-gemini-robotics-1-5-vla-primer-figures/fig03.png
    caption: "checkpoint 하나로 ALOHA, Bi-arm Franka, Apollo humanoid가 여러 과제를 수행하는 사진 모음 (원 논문 Figure 2)"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/jo-2026-gemini-robotics-1-5-vla-primer/fig04.png
    raw: raw/articles/jo-2026-gemini-robotics-1-5-vla-primer-figures/fig04.png
    caption: "세 로봇에서 in-distribution과 네 일반화 항목의 progress score를 GR 1.5, Gemini Robotics, Gemini Robotics On-Device로 비교한 막대 그래프 (원 논문 Figure 3)"
    strategy: fetched
    curated: true
  - id: fig05
    file: assets/jo-2026-gemini-robotics-1-5-vla-primer/fig05.png
    raw: raw/articles/jo-2026-gemini-robotics-1-5-vla-primer-figures/fig05.png
    caption: "데이터와 학습 레시피 ablation. GR 1.5, Motion Transfer 없는 multi-embodiment 학습, Motion Transfer 없는 single-embodiment 학습을 세 로봇에서 비교한다 (원 논문 Figure 4)"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/jo-2026-gemini-robotics-1-5-vla-primer/fig06.png
    raw: raw/articles/jo-2026-gemini-robotics-1-5-vla-primer-figures/fig06.png
    caption: "cross-embodiment 벤치마크. 왼쪽은 다른 로봇으로만 수집된 과제의 progress score와 성공률, 오른쪽은 Franka에서 ALOHA로 옮긴 테이프 떼기, ALOHA에서 Franka로 옮긴 정리함 닫기, ALOHA에서 Apollo로 옮긴 옷장 문 열기 사례 (원 논문 Figure 5)"
    strategy: fetched
    curated: true
  - id: fig07
    file: assets/jo-2026-gemini-robotics-1-5-vla-primer/fig07.png
    raw: raw/articles/jo-2026-gemini-robotics-1-5-vla-primer-figures/fig07.png
    caption: "multi-step 벤치마크에서 thinking을 켠 경우와 끈 경우의 progress score. ALOHA 0.55 대 0.26, Bi-arm Franka 0.60 대 0.55, humanoid 0.67 대 0.51 (원 논문 Figure 6)"
    strategy: fetched
    curated: true
  - id: fig08
    file: assets/jo-2026-gemini-robotics-1-5-vla-primer/fig08.png
    raw: raw/articles/jo-2026-gemini-robotics-1-5-vla-primer-figures/fig08.png
    caption: "Apollo humanoid가 물건을 흰 가방에 넣는 Thinking VLA rollout. 각 장면 위에 thinking trace가 겹쳐 있고 implicit success detection과 error recovery 구간이 표시돼 있다 (원 논문 Figure 7)"
    strategy: fetched
    curated: false
  - id: fig09
    file: assets/jo-2026-gemini-robotics-1-5-vla-primer/fig09.png
    raw: raw/articles/jo-2026-gemini-robotics-1-5-vla-primer-figures/fig09.png
    caption: "ALOHA(위)와 Bi-arm Franka(아래) long-horizon 과제 8개에서 GR-ER 1.5와 GR 1.5 agent, Gemini 2.5 Flash와 GR 1.5 agent, GR 1.5 Thinking on의 progress score 비교 (원 논문 Figure 17)"
    strategy: fetched
    curated: true
  - id: fig10
    file: assets/jo-2026-gemini-robotics-1-5-vla-primer/page-full.png
    raw: raw/articles/jo-2026-gemini-robotics-1-5-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷 (상단 6,000px)"
    strategy: screenshot
    curated: false
---

## 한 줄 요약 (One-line Summary)

Gemini Robotics 1.5를 처음 보는 사람을 위한 한국어 입문 해설이다. "모두의 로보틱스 - VLA 입문" 시리즈 03-16편으로, 1.0이 남긴 세 과제(multi-step planning, 로봇 간 일반화, 행동 전 사고 구조)에서 출발해 orchestrator, Thinking VLA, Motion Transfer 세 개념을 먼저 세우고, Gemini Robotics-ER 1.5와 Gemini Robotics 1.5의 분업 구조, 다섯 가지 결과, 세 가지 한계를 순서대로 짚는다.

## 1. 자료 정보 (Document Information)

- 저자: 조인령 (WikiDocs "모두의 로보틱스 - VLA 입문" 시리즈. 앞 편 03-15와 같은 저자 표기)
- URL: https://wikidocs.net/366382
- 형식: 온라인 강의 챕터 (03-16편). 앞 편 03-15 Gemini Robotics 1.0을 전제로 한다
- 출처: Gemini Robotics 1.5 기술 보고서(Gemini Robotics Team, arXiv 2025)와 DeepMind 공식 블로그 "Gemini Robotics 1.5 brings AI agents into the physical world"(2025)를 참고문헌으로 든다. 본문은 그 외에 "공식 모델 페이지"의 설명도 세 번 인용한다
- 구성: Ⅰ 모델 등장 배경, Ⅱ 배경지식, Ⅲ 모델 구조, Ⅳ 결과, Ⅴ 한계점, Ⅵ 정리, 참고문헌의 여섯 장
- 분량: 본문 약 9,400자, 그림 9장

그림 9장은 전부 원 논문 도식을 캡션째 캡처한 것이다. 저자가 그린 도식은 없고 캡처 안의 논문 캡션으로 원 논문 Figure 번호를 확인할 수 있다. 본문은 수치를 거의 인용하지 않으며, 일반화 절에서 "숫자 자체보다 일반화의 범위가 중요하다"고 명시한다. 따라서 progress score 같은 구체적 수치는 이 해설이 아니라 캡처된 차트와 원 논문 페이지에서 확인해야 한다.

## 2. 주요 기여 (Key Contributions)

해설이 잡은 요점은 다섯 가지다.

첫째, Gemini Robotics 1.0이 남긴 과제를 세 가지로 정리해 1.5의 등장 이유로 삼는다. 복잡한 작업을 여러 단계로 나눠 계획하는 능력의 제한, 서로 다른 로봇 몸체에 대한 불충분한 일반화, 행동 전에 "무엇을 먼저 해야 하는지" 생각하는 구조의 부재다.

둘째, 1.5의 변화를 Thinking VLA, Motion Transfer, Agentic Framework 세 가지로 요약한다. 로봇이 바로 행동을 출력하지 않고 자연어로 상황과 목표를 정리한 뒤 행동하는 것, 서로 다른 로봇의 데이터를 함께 학습해 동작을 옮기는 것, ER 1.5가 상위 계획과 진행 판단을 맡고 1.5가 각 단계를 실행하는 구조다.

셋째, 배경지식으로 orchestrator, Thinking VLA, Motion Transfer 세 개념을 일상 예시("책상을 정리해줘", "옷을 색깔별로 분류해", "물체를 집는다")로 풀이한다.

넷째, 구조를 이해와 계획을 맡는 ER 1.5와 행동을 생성하는 1.5로 나누고, 두 모델이 함께 작동하는 방식을 분리수거 예시로 설명한다.

다섯째, 결과를 세 질문(여러 로봇에서 한 모델이 작동하는가, thinking이 multi-step 과제에 도움이 되는가, ER과 VLA를 함께 쓰면 긴 작업을 더 잘 수행하는가)으로 묶고, 한계를 안전성, embodiment 차이, 시스템 복잡성 세 가지로 정리한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 1.0이 남긴 세 과제와 1.5의 세 변화

해설은 앞 편에서 본 Gemini Robotics 1.0을 "Gemini의 멀티모달 이해 능력을 실제 로봇 행동으로 연결한 모델"로 요약한 뒤, 남은 과제를 셋으로 든다.

| 1.0의 과제 | 해설의 설명 |
|---|---|
| multi-step planning | 단순 조작은 잘 하지만 가방을 싸거나 책상을 정리하는 것처럼 긴 순서가 필요한 작업에서는 상위 계획과 진행 상태 판단이 중요하다 |
| 로봇 몸체 간 일반화 | 다른 로봇으로 fine-tuning하는 가능성은 보였지만, 로봇마다 팔 길이, 관절 구조, 그리퍼, 카메라 위치가 달라 한 로봇에서 배운 skill을 다른 로봇으로 옮기기는 여전히 어려웠다 |
| 행동 전 사고 구조 | 복잡한 작업에서는 바로 action을 출력하는 것보다 작업을 작은 단계로 나누고 현재 상황에 맞게 다음 행동을 정하는 과정이 중요하다 |

이에 대응하는 1.5의 변화가 Thinking VLA, Motion Transfer, Agentic Framework다. 해설은 1.0이 시각과 언어 이해를 로봇 행동으로 연결한 모델이었다면, 1.5는 생각하고 계획하고 여러 로봇 몸체에 걸쳐 행동하는 로봇 에이전트를 목표로 한 모델이라고 규정한다.

### 배경지식 세 가지

**orchestrator**는 전체 작업 흐름을 관리하는 역할이다. "책상을 정리해줘"라는 명령은 바로 팔의 움직임으로 바꾸기 어렵다. 먼저 책상 위에 무엇이 있는지 확인하고, 어떤 물건을 어디로 옮길지 정하고, 작업이 끝났는지도 판단해야 한다. Gemini Robotics-ER 1.5가 이 역할을 맡아 "상위 관리자"처럼 사용자의 목표를 이해하고 작업을 단계로 나눈 뒤 각 단계가 잘 끝났는지 확인한다. 해설은 공식 블로그가 ER 1.5를 high-level brain처럼 로봇의 활동을 조율하는 모델로 설명하며, 물리 환경에서 계획과 논리적 판단을 수행하고 필요하면 Google Search 같은 도구도 호출한다고 옮긴다.

**Thinking VLA**는 행동 전에 생각하는 VLA다. 기존 VLA는 이미지와 지시문(instruction)을 받아 바로 action을 출력하지만, 1.5는 행동을 내기 전에 자연어 기반 thinking trace를 생성한다. "옷을 색깔별로 분류해"라는 지시문이 들어오면 모델은 먼저 흰 옷은 흰 바구니에, 다른 색 옷은 검은 바구니에 넣어야 한다는 기준을 정리하고, 그다음 옷 하나를 집어 알맞은 위치로 옮기는 행동을 실행한다. 해설은 이 과정이 단순한 설명문이 아니라 복잡한 작업을 더 작은 실행 단위로 나누고 다음 행동을 더 안정적으로 선택하게 돕는 장치라고 강조한다. DeepMind의 설명으로는 action 이전에 자연어 추론을 생성해 복잡한 multi-step 과제를 더 잘 분해하고 수행할 수 있다.

**Motion Transfer**는 로봇마다 다른 몸 구조 문제를 푸는 방법이다. ALOHA처럼 양팔이 고정된 로봇, Franka처럼 연구실에서 많이 쓰는 로봇팔, Apollo처럼 사람 형태에 가까운 humanoid는 팔 길이, 관절 구조, 카메라 위치, 그리퍼 형태가 서로 다르다. 핵심은 로봇마다 다른 몸 구조를 그대로 외우는 것이 아니라 여러 로봇 데이터 안에서 공통된 동작의 의미를 학습하는 것이다. "물체를 집는다", "상자 안에 넣는다", "문을 연다" 같은 동작은 로봇마다 실행 방식은 다르지만 작업의 목적은 비슷하다. 해설은 논문이 heterogeneous, multi-embodiment 로봇 데이터에서 학습하도록 Motion Transfer mechanism을 도입했다고 옮긴다.

### 모델 구조

구조는 두 단계다. 먼저 Gemini Robotics-ER 1.5가 사용자의 목표와 현재 장면을 이해하고 계획을 세우고, 그다음 Gemini Robotics 1.5가 각 단계를 실제 로봇 행동으로 바꾼다.

| 모델 | 종류 | 역할 | 해설의 예시 |
|---|---|---|---|
| Gemini Robotics-ER 1.5 | VLM | 직접 저수준 action을 내기보다 물리 세계를 이해하고 작업을 계획한다. 필요하면 외부 도구를 쓰고, 전체 작업을 여러 단계로 나누며, 진행 상태를 판단한다 | "내 위치 기준으로 이 물건들을 재활용, 음식물 쓰레기, 일반 쓰레기로 분류해줘"라는 지시에는 지역별 분리수거 규칙 찾기, 장면 속 물체 파악, 각 물건을 넣을 통 결정이 필요하다 |
| Gemini Robotics 1.5 | VLA | ER 1.5가 나눈 각 단계를 실제 로봇 행동으로 바꾼다 | ER이 "빨간 옷을 집어서 검은 바구니에 넣어라"라는 단계 지시를 만들면 현재 장면을 보고 팔과 손을 어떻게 움직일지 결정한다 |

해설은 DeepMind가 ER 1.5를 spatial understanding, task planning, progress estimation 같은 embodied reasoning에 특화된 모델로 설명한다고 옮기고, 공식 모델 페이지가 1.5를 시각 정보와 지시문을 motor command로 바꾸는 VLA로 소개하며 입력은 text와 image, 출력은 text와 action으로 정리한다고 적는다.

두 모델이 함께 작동하는 이유는 복잡한 작업 전체를 VLA 하나가 바로 해결하기 어렵기 때문이다. 작업이 길어질수록 무엇을 먼저 해야 하는지, 지금 어디까지 완료했는지, 실패했을 때 어떻게 복구할지가 중요해진다. 그래서 1.5는 두 역할을 나눈다.

- Gemini Robotics-ER 1.5: 장면 이해, 계획, tool use, 진행 상태 판단
- Gemini Robotics 1.5: 각 단계의 실제 로봇 행동 생성

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

해설은 실험을 세 질문으로 묶는다. 여러 로봇에서 같은 모델이 잘 작동하는가, thinking이 실제로 multi-step 과제에 도움이 되는가, ER 모델과 VLA 모델을 함께 사용했을 때 긴 작업을 더 잘 수행하는가다. 본문은 다섯 절로 답하며 각 절에 원 논문 도식을 캡처해 붙인다.

| 절 | 요지 | 캡처된 원 논문 도식 |
|---|---|---|
| 여러 로봇에서의 일반화 | ALOHA, Bi-arm Franka, Apollo humanoid는 action space와 관절 구조와 센서 위치가 모두 다르다. 기존에는 로봇마다 별도 데이터와 모델 조정이 필요한 경우가 많았지만, 1.5는 여러 embodiment의 데이터를 함께 학습해 하나의 모델이 여러 로봇을 다루는 방향을 보여준다 | Figure 2 (세 로봇 과제 사진) |
| 일반화 성능 | 학습한 작업의 반복이 아니라 새로운 지시, 새로운 행동 조건, 새로운 시각 조건, 새로운 작업 조합에 대해 평가한다. 해설은 숫자 자체보다 일반화의 범위가 중요하다고 보며, 공식 모델 페이지가 이전 모델들보다 여러 일반화 범주에서 일관되게 더 좋다고 설명한다고 옮긴다 | Figure 3 (일반화 항목별 progress score) |
| Motion Transfer의 효과 | 특정 작업이 ALOHA 데이터에만 있어도 다른 로봇이 그 작업을 수행할 수 있다면 단순 암기가 아니라 embodiment 사이의 공통 동작 개념을 학습했다는 뜻이다. 로봇 학습을 "각 로봇마다 따로 배우는 방식"에서 "여러 로봇의 경험을 공유하는 방식"으로 바꾸려는 시도다 | Figure 4 (ablation), Figure 5 (cross-embodiment 벤치마크) |
| thinking이 행동을 돕는가 | 작업이 길어질수록 현재 목표를 잊거나 다음 행동을 잘못 고를 가능성이 커진다. thinking trace는 현재 상황을 해석하고 다음에 수행할 짧은 목표를 정한 뒤 그것을 행동으로 바꾸게 해 이 문제를 줄인다. 공식 블로그는 긴 작업을 더 단순한 짧은 segment로 나눠 새 작업과 환경 변화에 더 robust해진다고 설명한다 | Figure 6 (thinking 유무 progress score), Figure 7 (humanoid rollout) |
| agentic system | 단순 pick-and-place는 VLA만으로 충분할 수 있지만 긴 작업에는 계획, 기억, tool use, 성공 여부 판단이 필요하다. 가방 싸기에서는 무엇을 넣을지 정하고 이미 넣은 물건과 아직 넣지 않은 물건을 구분해야 하며, 분리수거에서는 규칙을 찾아보고 각 물체를 기준에 맞춰야 한다. DeepMind는 두 모델을 함께 쓸 때 더 긴 작업과 다양한 환경에 일반화하는 능력이 증가한다고 설명한다 | Figure 17 (long-horizon 평가) |

해설은 결과의 핵심을 "1.5가 단순히 더 좋은 VLA 모델이 아니라는 점"으로 잡는다. 로봇이 계획하고, 행동하고, 결과를 확인하고, 다시 다음 행동을 정하는 구조로 확장됐다는 데 의미를 둔다.

캡처된 차트의 수치는 본문에 옮겨져 있지 않다. 참고로 Figure 6 캡처에는 thinking을 켠 경우와 끈 경우의 progress score가 ALOHA 0.55 대 0.26, Bi-arm Franka 0.60 대 0.55, humanoid 0.67 대 0.51로 적혀 있고, Figure 5 캡처에는 cross-embodiment 벤치마크에서 GR 1.5의 progress score가 ALOHA 0.66, Bi-arm Franka 0.65, humanoid 0.63으로 적혀 있다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

해설은 1.5가 중요한 진전이지만 완성형 범용 로봇은 아니라고 보고 세 가지 한계를 든다.

| 한계 | 설명 |
|---|---|
| 실제 배포와 안전성 | 로봇은 물리 세계에서 움직이므로 잘못된 행동은 단순한 오답이 아니라 실제 위험으로 이어질 수 있다. DeepMind는 semantic reasoning, respectful dialogue, onboard collision avoidance 같은 다층 safety approach를 쓴다고 설명한다 |
| embodiment 차이 | Motion Transfer가 모든 embodiment 차이를 완전히 해결하지는 않는다. 몸체, 센서, 그리퍼, 관절 구조가 크게 달라지면 여전히 성능 차이가 생길 수 있다 |
| agentic system의 복잡성 | 상위 계획이 틀리면 실행 모델이 잘 움직여도 실패하고, 반대로 계획이 맞아도 실제 조작이 실패하면 전체 작업은 완료되지 않는다 |

해설이 다루지 않는 항목도 있다. 원 논문의 GR-ER 1.5 벤치마크 수치(15종 학술 벤치마크, pointing, success detection), thinking 토큰 예산 스케일링, ASIMOV-2.0 안전 벤치마크와 Auto-Red-Teaming, 학습 데이터와 평가 방법(A/B/n 테스트, 시뮬레이션)은 본문에 없다. dexterity가 이전 세대 수준에 머문다는 논문 스스로의 한계도 언급되지 않는다.

## 6. 관련 연구 (Related Work)

- **Gemini Robotics 1.5 기술 보고서 (Gemini Robotics Team, arXiv 2025)**: 참고문헌 첫 줄. 해설의 구조와 그림 9장이 모두 이 보고서에서 왔다.
- **DeepMind 블로그 "Gemini Robotics 1.5 brings AI agents into the physical world" (2025)**: 참고문헌 둘째 줄. high-level brain, Google Search tool call, 긴 작업의 segment 분할, 다층 safety approach 설명의 출처다.
- **공식 모델 페이지**: 1.5의 입력과 출력 정리, 여러 robot form 적응, 일반화 범주에서의 우위 서술의 출처로 세 번 인용된다.
- **앞 편 03-15 Gemini Robotics 1.0**: 이 편이 출발점으로 삼는 이전 세대 해설.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| orchestrator | 전체 작업 흐름을 관리하는 역할. 사용자의 목표를 이해하고 작업을 단계로 나눈 뒤 각 단계의 완료를 확인한다. ER 1.5가 맡는다 |
| Thinking VLA | 행동을 내기 전에 자연어 thinking trace를 생성하는 VLA. 복잡한 작업을 작은 실행 단위로 나누는 장치 |
| thinking trace | 모델이 "지금 무엇을 해야 하는지"를 자연어로 짧게 정리한 기록 |
| Motion Transfer | 여러 로봇 데이터에서 공통된 동작의 의미를 학습해 한 로봇의 skill을 다른 로봇으로 옮기는 방법 |
| Agentic Framework | ER 1.5가 상위 계획과 진행 판단을, 1.5가 각 단계의 실행을 맡는 두 모델 결합 구조 |
| embodiment | 로봇의 몸 구조. 팔 길이, 관절 구조, 그리퍼, 카메라 위치가 이에 속한다 |
| high-level brain | 공식 블로그가 ER 1.5를 설명한 비유. 로봇의 활동을 조율하는 상위 두뇌 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 모델 가족 개요 (원 논문 Figure 1) | fetched | ★ wiki 권장 (architecture) |
| fig02 | generality와 embodied reasoning 산점도 (원 논문 Figure 8) | fetched | ★ wiki 권장 (result) |
| fig03 | 세 로봇 과제 사진 (원 논문 Figure 2) | fetched | (선택) |
| fig04 | 일반화 항목별 progress score (원 논문 Figure 3) | fetched | ★ wiki 권장 (result) |
| fig05 | Motion Transfer ablation (원 논문 Figure 4) | fetched | (선택, 논문 페이지에 있음) |
| fig06 | cross-embodiment 벤치마크 (원 논문 Figure 5) | fetched | ★ wiki 권장 (result) |
| fig07 | thinking 유무 progress score (원 논문 Figure 6) | fetched | ★ wiki 권장 (result) |
| fig08 | humanoid Thinking VLA rollout (원 논문 Figure 7) | fetched | (선택, 논문 페이지에 있음) |
| fig09 | long-horizon 평가 (원 논문 Figure 17) | fetched | ★ wiki 권장 (result) |
| fig10 | 전체 페이지 스크린샷 | screenshot | (아카이브) |
