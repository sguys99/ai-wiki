---
title: "03-15. Gemini Robotics 1.0 - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer.md
raw_filename: "jo-2026-gemini-robotics-1-0-vla-primer.md"
source_collection: external
author: "조인령"
url: "https://wikidocs.net/366381"
publisher: "wikidocs.net"
fetched_at: "2026-09-17T21:18:43+0900"
extractor_tier: "chrome"
tags: [physical-ai, vla, manipulation, spatial-reasoning]
figures:
  - id: fig01
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig01.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig01.png
    caption: "Gemini Robotics 계열 전체 개요. Gemini 2.0에 embodied reasoning과 로봇 action 데이터를 더한 robotics 전용 학습으로 Gemini Robotics-ER와 Gemini Robotics를 만들고, 그 위에 dexterous task, 새 embodiment, advanced reasoning 세 방향의 adaptation을 둔다 (원 논문 Figure 1)"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig02.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig02.png
    caption: "Gemini Robotics의 구조와 입출력. 현재 장면 이미지 여러 장과 proprioception, 텍스트 지시문을 multimodal prompt로 받아 cloud backbone과 로봇 온보드의 local action decoder가 action chunk를 낸다 (원 논문 Figure 14)"
    strategy: fetched
    curated: true
  - id: fig03
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig03.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig03.png
    caption: "복잡한 환경에서의 dexterous manipulation 예시 4종. 위에서부터 안경 케이스 열기, 곡물 붓기, 서류 폴더 풀기, 헤드폰 줄 감기 (원 논문 Figure 15)"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig04.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig04.png
    caption: "Gemini 2.0 Flash의 2D detection과 2D pointing 예시. 물체 범주, 공간 서술, affordance 기반 detection(위)과 자연어 질의로 점을 찍는 pointing(아래) (원 논문 Figure 6과 7)"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig05.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig05.png
    caption: "시작점과 끝점을 먼저 예측한 뒤 그 사이를 잇는 2D trajectory prediction 예시 (원 논문 Figure 8)"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig06.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig06.png
    caption: "Gemini Robotics-ER의 top-down grasp prediction 예시. 2D pointing을 확장해 자연어로 지정한 물체 부위의 grasp point와 angle을 예측한다 (원 논문 Figure 9)"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig07.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig07.png
    caption: "zero-shot control에 쓰는 perception과 control API, 에이전트식 오케스트레이션 구조. tool library의 ER 능력과 robot API 문서를 initial context로 받아 계획과 코드를 출력하고 실행 결과와 로봇 이미지를 다시 받는다 (원 논문 Figure 12)"
    strategy: fetched
    curated: true
  - id: fig08
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig08.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig08.png
    caption: "데이터셋에서 고른 20개 과제의 out-of-the-box 성공률. Gemini Robotics(파랑)가 π0 re-implement(노랑)와 multi-task diffusion(초록) baseline을 대부분 과제에서 앞선다 (원 논문 Figure 16)"
    strategy: fetched
    curated: true
  - id: fig09
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig09.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig09.png
    caption: "학습 때 본 물체의 사무실 장면(왼쪽)과 처음 보는 물체의 주방 장면(가운데)에서 세밀한 언어 지시문을 따르는 실험. Pick 0.94, Pick-Place 0.80으로 0.30 이하인 baseline을 크게 앞선다 (원 논문 Figure 17)"
    strategy: fetched
    curated: false
  - id: fig10
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig10.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig10.png
    caption: "일반화 벤치마크의 세 가지 변형 예시. 시각(distractor, 배경, 조명), 지시문(오타, 다른 언어, 바꿔 말하기, 서술 상세도), action(초기 위치, 새 물체 instance) (원 논문 Figure 18, 19, 20)"
    strategy: fetched
    curated: false
  - id: fig11
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig11.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig11.png
    caption: "일반화 성능 세부 비교(progress 점수). 지시문, 시각, action 세 항목 모두 Gemini Robotics가 앞서고, baseline이 0에 가까운 새 언어 조건에서도 0.68을 낸다 (원 논문 Figure 21)"
    strategy: fetched
    curated: true
  - id: fig12
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig12.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig12.png
    caption: "ALOHA에서 수행한 long-horizon dexterous 과제 6종. 종이접기 여우, 도시락 싸기, 철자 보드게임, 카드 게임, 집게로 샐러드에 완두콩 넣기, 샐러드에 견과류 넣기 (원 논문 Figure 22)"
    strategy: fetched
    curated: false
  - id: fig13
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig13.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig13.png
    caption: "reasoning-enhanced 버전과 기본 Gemini Robotics의 성공률 비교(위)와 내부 chain-of-thought에 쓰인 예측 trajectory 시각화(아래). 1-step reasoning, semantics, 공간 이해 세 묶음 모두 reasoning-enhanced 쪽이 높다 (원 논문 Figure 24와 25)"
    strategy: fetched
    curated: true
  - id: fig14
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig14.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig14.png
    caption: "8개 신규 과제의 시연 데이터 수에 따른 fine-tuning 성공률 곡선. 캡션은 최대 100개 시연 데이터로 8개 중 7개에서 70% 이상, 2개에서 100%를 달성했다고 적는다 (원 논문 Figure 26)"
    strategy: fetched
    curated: true
  - id: fig15
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig15.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig15.png
    caption: "다른 로봇으로의 fine-tuning 예시. 위는 Apollo humanoid가 도시락 가방을 싸는 장면, 아래는 bi-arm 산업용 로봇이 도르래에 고무 밴드를 거는 장면 (원 논문 Figure 27)"
    strategy: fetched
    curated: false
  - id: fig16
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/page-full.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

## 한 줄 요약 (One-line Summary)

Gemini Robotics 1.0을 처음 보는 사람을 위한 한국어 입문 해설이다. "모두의 로보틱스 - VLA 입문" 시리즈 03-15편으로, Google DeepMind가 Gemini 2.0 위에 만든 두 모델을 구분하는 데서 출발한다. 장면을 이해하고 추론하는 Gemini Robotics-ER, 그리고 그 이해를 action chunk로 바꾸는 Gemini Robotics다. 이어서 cloud backbone과 local action decoder를 나눈 구조, 세 종류의 일반화 평가, fine-tuning으로 확장한 네 가지 추가 실험, 네 가지 한계를 순서대로 짚는다.

## 1. 자료 정보 (Document Information)

- 저자: 조인령 (WikiDocs "모두의 로보틱스 - VLA 입문" 시리즈. 책의 지은이는 조인령, 한승수, 서동현, 홍권호, 장찬희 5인이고 편별 저자 표기는 따로 없다)
- URL: https://wikidocs.net/366381
- 형식: 온라인 강의 챕터 (03-15편)
- 성격: Gemini Robotics 논문(Gemini Robotics Team, arXiv 2025)과 DeepMind 공식 블로그 두 출처를 한국어로 옮긴 해설. action chunk를 설명하는 자리에서 앞 편 03-05 ACT와 03-07 Pi-0을 링크로 건다.
- 구성: Ⅰ 모델 등장 배경, Ⅱ 배경지식, Ⅲ 모델 구조, Ⅳ 결과, Ⅴ 한계점, Ⅵ 정리, 참고문헌의 여섯 장이다.

그림 15장은 전부 원 논문 도식을 그대로 캡처한 것이다. 저자가 직접 그린 도식이나 빨간 테두리를 덧그린 주석판은 없고, 캡처 안에 논문 캡션이 함께 들어 있어 그림마다 원 논문 Figure 번호를 확인할 수 있다. 본문이 인용하는 수치 대부분은 이 캡션과 차트에서 나온다.

본문과 캡처된 캡션 사이에 수치가 어긋나는 곳이 한 군데 있다. task adaptation 실험에서 본문은 "8개 중 7개 task에서 50% 이상"이라 적지만, 함께 실린 원 논문 Figure 26 캡션은 "7 out of 8 tasks에서 70% 이상, 2개 task에서 100%"로 적혀 있다. 4절에서 다시 다룬다.

## 2. 주요 기여 (Key Contributions)

해설이 잡은 요점은 다섯 가지다.

첫째, Gemini Robotics 1.0을 이해하는 출발점으로 두 모델의 역할 분담을 세운다. Gemini Robotics-ER는 행동하기 전에 장면을 이해하고 추론하는 모델이고, Gemini Robotics는 그 이해를 실제 로봇 action으로 바꾸는 VLA 모델이다. 해설은 ER를 로봇의 "눈과 머리"에 비유하고, 두 모델을 함께 보면 Gemini Robotics 1.0은 단순한 VLA가 아니라 이해와 행동을 연결하는 embodied AI 시스템에 가깝다고 결론짓는다.

둘째, Gemini Robotics 1.0의 세 가지 목표를 Generality, Interactivity, Dexterity로 정리한다. 하나의 정해진 작업이 아니라 다양한 물체와 환경, 지시문(instruction)에 대응하는 것, 상황이나 지시문이 바뀌면 다시 반응하는 것, 안경 케이스를 열거나 천을 접고 헤드폰 줄을 감는 정교한 조작을 해내는 것이다.

셋째, 구조를 cloud backbone과 local action decoder로 나눠 설명하고, 입력(장면 이미지와 자연어 지시문), 출력(action chunk), 학습 데이터(ALOHA 2 fleet의 12개월 teleoperation 데이터와 non-action 데이터)를 차례로 푼다.

넷째, 결과를 세 가지 질문(다양한 dexterous manipulation 수행, 세밀한 지시문 추종, 세 종류 일반화)과 네 가지 추가 실험(long-horizon dexterity, reasoning-enhanced 버전, 빠른 task adaptation, 새 embodiment adaptation)으로 구분한다.

다섯째, 한계를 cloud 기반 구조와 계산 비용, long-horizon 과제의 specialization 필요성, 불완전한 multi-embodiment 일반화, 별도로 다뤄야 할 안전성의 네 가지로 정리한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 두 모델의 역할 분담

Gemini Robotics-ER에서 ER은 Embodied Reasoning을 뜻한다. embodied reasoning은 몸을 가진 존재로서 물리 세계를 이해하고 추론하는 능력을 가리키며, 해설은 "몸을 가진 존재의 추론"이라는 직역을 붙인다. 일반 VLM은 이미지를 보고 "컵이 있다", "테이블 위에 바나나가 있다"라고 말할 수 있지만, 로봇에게 필요한 이해는 컵이 어디에 있는지, 어느 부분을 잡아야 하는지, 주변에 장애물은 없는지, 손을 어떤 경로로 움직일지, 그 행동이 안전한지, 다음 행동은 무엇인지에 답하는 수준이어야 한다. 즉 단순한 이미지 설명이 아니라 행동으로 이어질 수 있는 공간적, 물리적 이해다.

논문은 Gemini Robotics-ER가 object detection, pointing, trajectory prediction, grasp prediction, multi-view correspondence, 3D bounding box prediction 같은 로봇 관련 능력을 갖도록 Gemini 2.0의 embodied reasoning 능력을 확장한다고 설명한다. 장면을 보고 어디를 봐야 하는지 판단하고, 어디를 잡아야 하는지 추론하고, 어떤 행동이 가능한지 생각하는 역할이다.

Gemini Robotics는 이미지를 보고 자연어 지시문을 이해한 뒤 로봇이 실행할 수 있는 action을 출력한다. 다른 VLA 모델도 action을 토큰처럼 다루며 VLM과 로봇 action을 연결했지만, 해설은 Gemini Robotics가 더 직접적으로 로봇 제어를 목표로 한다고 본다. 논문은 이 모델을 Gemini에서 파생되어 robot action을 직접 예측하도록 fine-tuning된 모델로 설명하며, 현재 장면 이미지들과 task 지시문을 입력받아 action chunk를 출력한다. 논문은 또 Gemini Robotics가 Gemini Robotics-ER 위에 구축된다고 설명하므로, ER 모델은 보조 모델이 아니라 행동 능력을 뒷받침하는 기반이다.

### Gemini Robotics의 구조

구조는 두 부분으로 나뉜다. cloud에서 동작하는 Gemini Robotics backbone과 로봇 내부 컴퓨터에서 동작하는 local action decoder다.

backbone은 장면 이미지와 자연어 지시문을 입력받아 로봇이 해야 할 행동을 결정하는 핵심 역할을 맡는다. 대형 VLM을 그대로 로봇에 연결하면 연산량이 많아 추론에 시간이 걸리고 특수 하드웨어가 필요할 수 있으며, 로봇은 실제 세계에서 움직이고 있으므로 모델이 늦게 답하면 이미 상황이 바뀌어 있을 수 있다. 그래서 논문은 대형 모델의 추론 지연을 줄이기 위해 backbone을 최적화하고 로봇 내부의 local action decoder와 결합했다고 설명한다. 해설은 둘을 "지금 무엇을 해야 하는지 이해하는 두뇌"와 "그 판단을 실제 로봇 움직임으로 바꾸는 신경계"에 비유한다.

입력은 현재 장면을 보여주는 이미지들과 사용자의 자연어 지시문이다. 해설이 드는 지시문 예시는 "open the eyeglasses case", "pour pulses", "unfasten file folder", "wrap headphone wire"다. 안경 케이스를 열려면 케이스의 방향과 여는 부분을 이해해야 하고, 곡물을 부으려면 용기를 잡고 기울이는 동작이 필요하며, 헤드폰 줄을 감으려면 형태가 변하는 물체를 다뤄야 하므로 단순 pick-and-place보다 훨씬 어렵다. 원 논문 Figure 15가 이 네 과제의 실행 장면이다.

출력은 action chunk다. action chunk는 앞으로 아주 짧은 시간 동안 실행할 action 여러 개를 한 묶음으로 낸 것이며, 해설은 앞 편 ACT와 Pi-0 설명을 가리키며 이 방식이 로봇을 더 부드럽게 움직이고 추론 지연에도 더 안정적으로 반응하게 한다고 적는다. 한 순간의 action만 내보내면 매 순간 아주 빠르게 예측해야 하고 추론이 조금만 늦어도 움직임이 끊길 수 있기 때문이다. 로봇은 action chunk를 실행하면서 계속 장면을 관찰하고, 상황이 바뀌면 새 action chunk를 출력한다. 해설은 이를 closed-loop control에 가깝다고 정리하는데, closed-loop는 한 번 세운 계획을 끝까지 실행하는 대신 현재 장면을 보고 행동한 뒤 다시 보고 수정하는 제어 방식이다. DeepMind 공식 블로그도 주변 변화나 지시문 변화를 감지해 행동을 조정하고, 물체가 미끄러지거나 누군가 물건을 옮겨도 다시 계획해 계속 수행한다고 설명한다.

학습 데이터는 ALOHA 2 로봇 fleet으로 12개월 동안 수집한 대규모 teleoperation robot action dataset이다. teleoperation은 사람이 원격 장치로 로봇을 직접 조종해 움직임을 기록하는 데이터 수집 방식이다. 논문은 이 데이터가 수천 시간의 실제 전문가 시연 데이터(demonstration)로 구성되고 다양한 task, object, difficulty, episode horizon, dexterity requirement를 포함한다고 설명한다. 학습에는 robot action 데이터뿐 아니라 web document, code, image, audio, video, embodied reasoning, visual question answering 데이터 같은 non-action 데이터도 함께 쓰였다. 해설은 이 점을 Gemini Robotics의 성격으로 강조한다. 실제 움직임은 robot action 데이터에서 배우지만, 장면 이해와 지시문 해석, 새 상황 일반화에는 Gemini 기반 멀티모달 지식이 함께 쓰인다는 것이다. 그래서 로봇 데이터만을 중심으로 한 policy도 아니고 VLM 출력 공간에 action 토큰을 연결한 초기 VLA도 아닌, 로봇 조작을 직접 수행하도록 설계된 Gemini 기반 VLA라고 본다.

### Gemini Robotics-ER의 능력

해설이 드는 대표 능력은 2D object detection, 2D pointing, 2D trajectory prediction, top-down grasp prediction, multi-view correspondence, 3D bounding box detection의 여섯 가지다. object detection은 물체의 위치를 찾는 능력, pointing은 물체나 물체의 특정 부분을 점으로 가리키는 능력, trajectory prediction은 어떤 경로로 움직일지 예측하는 능력, grasp prediction은 어디를 잡으면 좋을지 판단하는 능력, 3D bounding box detection은 물체를 2D 평면이 아니라 3차원 공간의 크기와 위치로 추정하는 능력이다. 논문은 Gemini 2.0과 Gemini Robotics-ER가 open-vocabulary language query로 물체와 공간 개념을 다룬다고 설명하며, "컵"만이 아니라 "잡기 좋은 위치", "비어 있는 공간", "오른쪽에 있는 물체" 같은 표현도 처리한다.

grasp prediction은 Gemini Robotics-ER에서 새로 도입된 기능이다. 컵의 몸통을 잡을지 손잡이를 잡을지, 바나나의 가운데를 잡을지 끝을 잡을지에 따라 task 성공 여부와 이후 움직임이 달라지므로, 무엇을 잡을지만큼 어디를 잡을지가 중요하다. ER는 Gemini 2.0의 pointing 능력을 확장해 top-down grasp pose를 예측하며, 물체의 특정 부분을 자연어로 지정해 grasp를 예측할 수 있다.

ER는 직접 action chunk를 출력하지는 않지만 code generation과 robot API를 통해 로봇 제어에 연결된다. 논문은 Gemini 2.0과 Gemini Robotics-ER가 perception, state estimation, spatial reasoning, planning, control 단계를 하나의 모델 안에서 수행할 수 있다고 설명하며, robot API를 제공하면 모델이 코드를 생성해 로봇을 움직이는 zero-shot control이 가능하다. 실험에서 ER는 기존 Gemini 2.0 Flash보다 로봇 제어 관련 추론 과제에서 더 나은 모습을 보였다. 다만 이 방식은 action chunk를 직접 출력하는 VLA 방식과 다르며, 복잡하고 정교한 조작에는 end-to-end action 모델인 Gemini Robotics가 필요하다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 기본 실험

첫 번째는 다양한 dexterous manipulation 수행이다. dexterous manipulation은 물체를 집어 옮기는 수준을 넘어 열고 접고 감는 것처럼 손끝의 정교한 조작이 필요한 과제를 뜻한다. Gemini Robotics는 short-horizon dexterous task에서 baseline보다 높은 성능을 보였다. 캡처된 원 논문 Figure 16은 데이터셋에서 고른 20개 과제를 π0 re-implement와 multi-task diffusion 두 baseline과 비교한다. 논문은 "fold pink cloth", "wrap the wire around the headphone" 같은 deformable object manipulation에서 강점을 보였고 baseline은 어려움을 겪었다고 설명하며, "open pink folder", "insert red block", "wrap the wire around the headphone" 같은 어려운 작업에서는 Gemini Robotics만 non-zero success를 보였다고 적는다. 천, 줄, 폴더는 잡는 위치와 힘에 따라 형태가 변하므로 물체 중심 좌표로 이동해 집는 방식만으로는 해결하기 어렵다.

두 번째는 자연어 지시문 추종이다. 논문은 25개의 지시문을 다섯 개 장면에서 평가했고, 여기에는 학습 장면뿐 아니라 unseen object와 unseen receptacle이 포함된 새 장면도 들어 있다. 지시문은 "clean the table" 같은 추상적 지시가 아니라 "Place the blue clip to the right of the yellow sticky notes"처럼 세밀한 공간 관계를 요구한다. "blue clip"은 색상과 물체 종류를, "to the right of the yellow sticky notes"는 물체 간 공간 관계를, "bottom compartment of the caddy"는 물체의 부분 구조와 위치 표현을 함께 이해해야 한다. 캡처된 Figure 17의 수치는 Pick에서 Gemini Robotics 0.94 대 baseline 0.30과 0.28, Pick-Place에서 0.80 대 0.10과 0.09다. 논문은 PaliGemma 기반 re-implement baseline이 학습 중 본 물체에는 접근할 수 있었지만 "top black container", "blue clip" 같은 서술적 언어 속성과 unseen object 조건에서는 어려움을 겪었다고 설명한다.

세 번째는 세 종류의 일반화다.

| 일반화 종류 | 바뀌는 조건 | 평가 내용 |
|---|---|---|
| 시각 일반화 (visual generalization) | 배경, 조명, distractor, texture | 장면이 달라져도 같은 행동을 수행하는가 |
| 지시문 일반화 (instruction generalization) | 바꿔 말하기(paraphrase), 오타, 다른 언어, 구체성 차이 | 표현이 달라져도 지시문을 이해하는가 |
| action 일반화 (action generalization) | 물체의 초기 위치, 물체 instance의 크기와 형태와 물리적 특성 | 배운 움직임을 새 조건에 맞게 조정하는가 |

평가는 학습 분포 안의 과제와 세 가지 일반화 조건을 나눠 구성된다. 논문은 Gemini Robotics가 세 종류의 variation을 baseline보다 더 효과적으로 처리했고, baseline이 catastrophic failure를 보이는 조건에서도 non-zero performance를 보였다고 설명한다. 캡처된 Figure 21은 progress 점수로 세 항목을 비교하는데, 분포 밖 평균은 지시문 0.65 대 0.32와 0.34, 시각 0.75 대 0.36과 0.34, action 0.60 대 0.11과 0.26이다. 새 언어 조건에서는 0.68 대 0.04와 0.12, 새 물체 instance 조건에서는 0.39 대 0.04와 0.21로 격차가 가장 크다.

### 추가 실험

해설은 추가 실험 넷을 "기본 모델이 어디까지 할 수 있고 추가 fine-tuning으로 어디로 확장되는지"를 보이는 것으로 읽고, Gemini Robotics 1.5와 연결되는 전 단계로 본다.

long-horizon dexterity에서는 fine-tuning을 거친 Gemini Robotics가 origami fox 만들기, lunch-box packing, spelling board game, card game, 집게로 샐러드에 재료 넣기 같은 long-horizon dexterous task를 수행한다. 해설은 도시락 싸기를 빵을 봉투에 넣고, 봉투를 잠그고, 에너지바를 넣고, 포도를 용기에 담고, 뚜껑을 닫고, 가방을 지퍼로 잠그는 여러 단계로 풀어 설명한다. 이 결과는 out-of-the-box generalist 모델로만 쓰이는 것이 아니라 특정 고난도 작업에 추가 fine-tuning해 specialized skill을 얻을 수 있음을 보이지만, 동시에 기본 generalist 모델이 모든 long-horizon 과제를 바로 해결한 것은 아니라는 한계도 드러낸다.

reasoning-enhanced 버전은 embodied reasoning을 action 예측과 더 강하게 연결한 것이다. 논문은 one-step reasoning, semantic generalization, spatial understanding이 필요한 실제 로봇 과제로 평가한다. "put the Japanese fish delicacy in the lunch-box"는 Japanese fish delicacy가 sushi라는 것을 이해하고 여러 물체 중 sushi를 찾아야 하고, "pack the smallest coke soda in the lunch-box"는 크기 비교와 공간 이해가 필요하다. 논문은 reasoning-enhanced 버전이 이런 out-of-distribution 상황에서 vanilla Gemini Robotics보다 높은 성공률을 보였다고 설명한다. 캡처된 Figure 24의 수치는 다음과 같다.

| 묶음 | 과제 | reasoning-enhanced | 기본 |
|---|---|---|---|
| 1-step reasoning | Matching Pile | 0.79 | 0.29 |
| 1-step reasoning | Same Color | 0.60 | 0.27 |
| 1-step reasoning | Correct Item | 0.50 | 0.20 |
| semantics | Full Bowl | 0.80 | 0.50 |
| semantics | Find Sushi | 0.73 | 0.45 |
| spatial understanding | Bottom Left | 1.00 | 0.80 |
| spatial understanding | Top Left | 1.00 | 0.40 |
| spatial understanding | Smallest Soda | 0.40 | 0.30 |

Figure 25는 reasoning-enhanced 모델의 내부 chain-of-thought에 쓰인 예측 trajectory를 왼팔(빨강)과 오른팔(파랑)에 대해 다음 1초 분량으로 시각화한 것이다. 해설은 이 흐름이 Gemini Robotics 1.5의 Thinking VLA로 이어진다고 적는다.

빠른 task adaptation에서는 long-horizon 과제에서 뽑은 8개 sub-task를 대상으로 시연 데이터 수를 바꿔 가며 fine-tuning 효과를 본다. 해설 본문은 8개 중 7개 task에서 최대 100개 시연 데이터만으로 50% 이상의 성공률을 달성했다고 적고, 과제 복잡도에 따라 이 양이 대략 15분에서 1시간 정도의 시연에 해당한다고 설명한다. 반면 함께 실린 원 논문 Figure 26 캡션은 8개 중 7개에서 70% 이상, 2개에서 100%라고 적는다. 곡선을 보면 Put container in lunch-box, Zip lunch-box, Pour lettuce, Salad dressing은 100개 시연 데이터에서 Gemini Robotics가 0.8 이상이고, Seal container와 Origami first fold는 baseline이 0에 가까운 반면 Gemini Robotics만 0.4에서 0.7 사이로 올라간다.

새 embodiment adaptation에서는 ALOHA 2로 학습된 모델을 Bi-arm Franka robot과 Apptronik의 humanoid Apollo에 fine-tuning한다. 논문은 새로운 form factor, action, observation을 가진 로봇에도 fine-tuning으로 적응할 수 있고, 그 뒤에도 visual disturbance, initial condition perturbation, object shape variation 같은 일반화 평가에서 single-task diffusion baseline보다 나은 결과를 보였다고 설명한다. 해설은 핵심이 "zero-shot으로 모든 로봇을 바로 제어한다"가 아니라 fine-tuning을 통해 새 로봇으로 적응할 수 있다는 점이며, 이 차이를 정확히 이해해야 한다고 강조한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

해설이 정리한 한계는 네 가지다.

- cloud 기반 구조와 계산 비용. cloud backbone과 local action decoder를 함께 쓰는 구조는 대형 Gemini 모델의 이해 능력을 활용할 수 있지만 네트워크, 추론 인프라, latency, 비용 문제가 생길 수 있다. 논문은 latency를 줄이기 위해 distillation한 backbone과 local decoder를 쓰지만, 완전히 가벼운 on-device robot policy라고 보기는 어렵다.
- 고난도 long-horizon 과제의 specialization. origami fox와 lunch-box packing은 추가 fine-tuning으로 specialization한 결과이므로, 매우 정교하고 긴 작업에는 여전히 고품질 task-specific 데이터와 fine-tuning이 필요하다. 로봇 데이터 수집 비용 문제가 그대로 남아 있다는 뜻이다.
- 불완전한 multi-embodiment 일반화. 1.0 단계에서는 새 로봇에 대해 fine-tuning이 필요하다. 논문도 future work에서 더 적은 데이터로 새 robot type에 적응하고 궁극적으로 zero-shot cross-embodiment transfer를 달성하는 것을 목표로 든다.
- 안전성. 잘못된 로봇 행동은 물건을 깨뜨리거나 사람에게 위험을 줄 수 있다. 논문은 semantic action safety를 중요한 문제로 다루며, 장난감을 뜨거운 난로 위에 놓지 않고, 알레르기가 있는 사람에게 땅콩을 주지 않고, 칼이 사람을 향하지 않게 하는 안전 판단이 필요하다는 예를 든다. ASIMOV dataset과 constitutional AI 방법으로 이 문제를 평가하고 개선하려 했다. 해설은 로봇이 더 똑똑해졌다는 것과 실제 생활 공간에 안전하게 배포할 수 있다는 것은 같은 말이 아니라고 적는다.

해설 자체에도 빈 자리가 있다. backbone과 local action decoder 사이에서 무엇이 오가는지, decoder의 구조와 크기, action chunk 길이, control frequency, 모델 파라미터 규모는 나오지 않는다. multi-view correspondence는 능력 목록에만 등장하고 설명이 없다. ER의 zero-shot control 실험은 "Gemini 2.0 Flash보다 나았다"는 문장뿐이고 수치가 없다. ASIMOV dataset과 constitutional AI 방법의 내용도 이름만 언급된다.

## 6. 관련 연구 (Related Work)

- Gemini Robotics 논문(Gemini Robotics Team, arXiv 2025)과 DeepMind 공식 블로그: 이 해설의 두 참고문헌. 그림 15장이 모두 논문에서 왔다.
- ACT(03-05)와 Pi-0(03-07): action chunk 개념을 설명하는 자리에서 앞 편으로 링크된다. 해설은 action chunk를 "앞으로 아주 짧은 시간 동안 이렇게 움직여라"에 가까운 행동 덩어리라고 앞 편에서 설명했다고 적는다.
- π0 re-implement와 multi-task diffusion: 기본 실험의 두 baseline. 지시문 추종 실험에서는 PaliGemma 기반 re-implement로 언급된다.
- Gemini Robotics 1.5의 Thinking VLA: reasoning-enhanced 버전이 이어지는 후속 모델로 언급되며, 추가 실험 전체를 1.5의 전 단계로 읽는다.
- ASIMOV dataset과 constitutional AI: semantic action safety를 평가하고 개선하는 데 쓰였다고 언급된다.
- ALOHA 2, Bi-arm Franka, Apptronik Apollo: 학습에 쓰인 로봇과 embodiment adaptation 대상 로봇.

## 7. 용어집 (Glossary)

- Gemini Robotics-ER: Gemini 2.0의 embodied reasoning 능력을 로봇용으로 확장한 모델. object detection, pointing, trajectory prediction, grasp prediction, multi-view correspondence, 3D bounding box detection을 다루며, action chunk를 직접 내지 않고 code generation과 robot API로 zero-shot control에 연결된다.
- Gemini Robotics: Gemini에서 파생되어 robot action을 직접 예측하도록 fine-tuning된 VLA 모델. 장면 이미지들과 지시문을 받아 action chunk를 출력하며 Gemini Robotics-ER 위에 구축된다.
- cloud backbone과 local action decoder: Gemini Robotics를 이루는 두 부분. backbone은 cloud에서 장면과 지시문을 이해해 행동을 결정하고, local action decoder는 로봇 내부 컴퓨터에서 그 판단을 실제 움직임으로 바꾼다.
- Generality, Interactivity, Dexterity: 해설이 정리한 Gemini Robotics 1.0의 세 가지 목표. 다양한 물체와 환경과 지시문 대응, 상황 변화에 대한 재반응, 정교한 조작이다.
- top-down grasp prediction: Gemini Robotics-ER에서 새로 도입된 기능. 2D pointing을 확장해 자연어로 지정한 물체 부위의 grasp pose를 위에서 내려다본 시점으로 예측한다.
- reasoning-enhanced Gemini Robotics: embodied reasoning을 action 예측과 더 강하게 연결하도록 re-label된 action 데이터로 fine-tuning한 버전. one-step reasoning, semantic generalization, spatial understanding 과제에서 기본 모델보다 높은 성공률을 낸다.
- semantic action safety: 물리적 충돌과 별개로 행동의 의미 수준에서 판단해야 하는 안전. 장난감을 난로 위에 놓지 않는 것, 알레르기 환자에게 땅콩을 주지 않는 것이 예다.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | Gemini Robotics 계열 전체 개요 (원 논문 Figure 1) | fetched | ★ wiki 권장 (architecture) |
| fig02 | cloud backbone과 local action decoder 구조와 입출력 (Figure 14) | fetched | ★ wiki 권장 (architecture) |
| fig03 | dexterous manipulation 예시 4종 실행 장면 (Figure 15) | fetched | (선택) |
| fig04 | Gemini 2.0 Flash의 2D detection과 pointing 예시 (Figure 6과 7) | fetched | (선택) |
| fig05 | 2D trajectory prediction 예시 (Figure 8) | fetched | (선택) |
| fig06 | ER의 top-down grasp prediction 예시 (Figure 9) | fetched | (선택) |
| fig07 | zero-shot control용 API와 오케스트레이션 구조 (Figure 12) | fetched | ★ wiki 권장 (method) |
| fig08 | 20개 과제 out-of-the-box 성공률 (Figure 16) | fetched | ★ wiki 권장 (result) |
| fig09 | 세밀한 지시문 추종 실험 장면과 성공률 (Figure 17) | fetched | (선택) |
| fig10 | 일반화 벤치마크의 세 가지 변형 예시 (Figure 18, 19, 20) | fetched | (선택) |
| fig11 | 세 종류 일반화 progress 점수 비교 (Figure 21) | fetched | ★ wiki 권장 (result) |
| fig12 | long-horizon dexterous 과제 6종 (Figure 22) | fetched | (선택) |
| fig13 | reasoning-enhanced 성공률 비교와 trajectory 시각화 (Figure 24와 25) | fetched | ★ wiki 권장 (result) |
| fig14 | 8개 신규 과제의 시연 데이터 수별 성공률 (Figure 26) | fetched | ★ wiki 권장 (result) |
| fig15 | Apollo humanoid와 bi-arm 로봇으로의 fine-tuning 예시 (Figure 27) | fetched | (선택) |
| fig16 | 전체 페이지 스크린샷 | screenshot | (아카이브) |
