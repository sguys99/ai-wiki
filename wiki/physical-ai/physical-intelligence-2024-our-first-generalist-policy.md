---
title: "π0: Our First Generalist Policy"
type: article
year: 2024
category: physical-ai
source: physical-intelligence-2024-our-first-generalist-policy.md
raw_path: raw/articles/physical-intelligence-2024-our-first-generalist-policy.md
raw_filename: "physical-intelligence-2024-our-first-generalist-policy.md"
source_collection: external
author: "Physical Intelligence"
url: "https://www.pi.website/blog/pi0"
publisher: "Physical Intelligence Blog"
publication_date: "2024-10-31"
tags: [physical-ai, vla, manipulation, robot-learning]
---

## 요약

π0 논문과 같은 날 공개된 Physical Intelligence의 공식 발표 글이다. 수식과 실험 표를 걷어내고 π0가 무엇이며 왜 필요한지를 회사의 언어로 설명하면서, 논문 PDF 링크와 무편집 데모 영상, zero-shot 평가의 과제별 정규화 점수를 함께 싣는다.

이 글의 가치는 논문 요약본이라는 데 있지 않다. Physical Intelligence가 π0를 무엇으로 규정하는지가 여기에 드러난다. 제목의 "our first generalist policy"와 본문의 "artificial physical intelligence를 향한 첫걸음"이라는 표현이 그 규정이며, 사용자가 LLM 챗봇에 요청하듯 로봇에 아무 과제나 말로 시킬 수 있는 상태가 회사가 내건 장기 목표다.

아키텍처와 학습 절차, 전체 실험은 [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model|논문 페이지]]가 담당한다. 이 페이지는 발표 맥락, 회사가 강조한 메시지, post-training으로 특화한 시연 과제, 그리고 블로그가 공개한 수치에 집중한다. 페이지의 시각 자료가 대부분 동영상과 인터랙티브 차트여서 정지 이미지로 남지 않았으므로 도식은 임베드하지 않았고, 구조 그림이 필요하면 논문 페이지의 Figure 1과 Figure 3을 참고한다.

## 배경

### 특화 로봇과 데이터 병목

블로그는 Moravec's paradox를 문제 설정의 출발점으로 인용한다. 체스를 이기거나 신약을 찾는 일은 AI에게 "쉬운" 문제인 반면, 셔츠를 개거나 식탁을 치우는 일은 지금까지 고안된 가장 어려운 공학 문제에 속한다는 것이다. 따라서 사람이 가진 신체적 다재다능함을 AI가 갖추려면 시스템을 embodied 형태로 만들어야 한다는 논리로 이어진다.

오늘의 로봇은 좁은 전문가라고 규정한다. 산업용 로봇은 미리 짜인 환경에서 반복 동작을 하도록 프로그램되며, 조립 라인의 같은 지점에 같은 용접을 반복하거나 같은 물건을 같은 상자에 떨어뜨린다. 이런 단순한 동작조차 상당한 수작업 엔지니어링을 요구하고, 가정처럼 정돈되지 않은 환경에서의 복잡한 행동은 사실상 불가능하다.

AI가 이 상황을 바꿀 수 있다는 것이 블로그의 주장이다. 로봇이 사용자의 지시문(instruction)을 따라 배우게 되면 새 동작을 프로그래밍하는 일이 원하는 바를 말하는 일로 대체되고, 환경에 맞춘 조정은 로봇이 스스로 해낸다.

문제는 데이터다. 언어 모델과 그 밖의 foundation model은 웹에서 데이터를 대규모로 수집해 사용 가능한 문서의 상당 부분을 활용하지만, 로봇에는 그런 저장고가 없다. 따라서 로봇에 새 skill을 가르치려면 그 로봇과 그 응용에 한정된 대량의 데이터를 매번 새로 모아야 한다.

### generalist policy라는 처방

블로그가 내놓는 해법은 하나의 generalist policy를 학습하는 것이다. 여러 skill을 수행하고 여러 로봇을 제어하는 단일 모델이 있다면, 로봇마다 응용마다 필요한 데이터가 소량으로 줄어들기 때문이다.

근거로 두 가지를 든다. 첫째는 사람의 학습 방식으로, 사람이 새 skill을 빨리 익히는 것은 평생 축적한 경험을 끌어다 쓰기 때문이다. 둘째는 언어 모델의 선례이며, 언어 모델은 다양하고 범용적인 pre-training을 바탕으로 하위 전문 과제를 더 잘 풀었기에 특화된 언어 처리 시스템을 대체했다. pre-training은 대규모 일반 데이터로 모델의 기반 능력을 먼저 학습하는 단계를 말한다.

같은 방식으로 generalist robot policy가 physical intelligence의 foundation model 역할을 하리라는 것이 블로그의 전망이다. π0는 그 방향의 첫 프로토타입이며, 대규모 multi-task 데이터 수집과 새 네트워크 구조를 결합해 당시까지 가장 유능하고 정교한 generalist robot policy를 만들었다고 자평한다. 개발 기간은 8개월이었다고 밝힌다.

## 핵심 개념

policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. 블로그가 말하는 generalist policy는 과제마다 모델을 따로 두지 않고 하나의 policy로 여러 로봇과 여러 과제를 수행하는 모델이다.

artificial physical intelligence는 Physical Intelligence가 내건 장기 목표를 가리키는 이름이다. 사용자가 챗봇에 질문하듯 로봇에 아무 과제나 말로 시킬 수 있는 상태를 뜻하며, π0는 그 목표를 향한 첫 단계로 소개된다.

VLM은 vision-language model의 약어로, 웹의 텍스트와 이미지를 함께 모델링하도록 학습된 모델이다. 블로그는 널리 쓰이는 예로 GPT-4V와 Gemini를 들고, π0는 그보다 작은 파라미터 30억 개 규모의 VLM에서 출발했다고 밝힌다.

flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다. 블로그는 이를 "diffusion model의 변형"이라는 한 문장으로만 정의하고 세부는 논문에 미룬다.

post-training은 pre-training을 마친 모델을 고품질 데이터로 다시 학습시켜 특정 과제에 특화시키는 단계다. 블로그는 이 구분을 LLM 개발 절차에 그대로 빗대어, pre-training이 물리 세계에 관한 지식을 가르치고 fine-tuning이 특정 과제를 잘 수행하도록 이끈다고 설명한다.

## 방법

### 학습 입력 세 가지

π0의 학습 mixture는 성격이 다른 세 입력으로 구성된다.

| 입력 | 내용 |
|---|---|
| Open X-Embodiment 데이터셋 | 여러 기관이 공개한 로봇 조작 데이터 모음 |
| 인터넷 규모 pre-training | VLM이 웹의 텍스트와 이미지에서 확보한 의미 지식 |
| π dataset | Physical Intelligence가 여러 dexterous 로봇에서 직접 수집한 데이터 |

블로그는 이 조합을 당시 기준 최대 규모의 로봇 상호작용 데이터셋이라고 소개한다. 각 과제가 다양한 motion primitive와 여러 물체, 여러 장면을 포함하도록 구성했다는 설명도 덧붙인다. primitive는 로봇 API가 노출하는 최소 실행 단위를 가리킨다.

### 데이터셋 과제 선정 원칙

수집 과제는 특정 응용을 풀기 위해 고른 것이 아니다. 모델에 물리적 상호작용에 대한 일반적 이해를 심는 것이 선정 기준이며, 블로그는 이를 physical intelligence의 초기 토대라고 표현한다. 목록은 다음과 같다.

- 그릇 치우기
- 봉투에 물건 담기
- 옷 개기
- 케이블 정리
- 상자 조립
- 전원 플러그 꽂기
- 포장 용기에 음식 담기
- 쓰레기 줍고 버리기

### 인터넷 규모 의미 지식의 상속

π0가 여러 로봇 데이터만으로 학습하지 않는 이유를 블로그는 명확히 밝힌다. pre-training된 VLM에서 출발하면 인터넷 규모 학습에서 얻은 의미 지식과 시각 이해가 그대로 넘어오기 때문이다. π0는 파라미터 30억 개 규모의 비교적 작은 VLM을 실시간 정교 제어에 맞게 개조했다고만 적고, 그 모델이 PaliGemma라는 사실은 논문에만 나온다.

VLM을 그대로 쓸 수 없는 이유도 함께 제시한다. VLM은 웹의 의미 지식을 잘 옮겨 오지만 출력이 이산 언어 토큰뿐인 반면, dexterous manipulation은 초당 최대 50회의 모터 명령을 요구한다. 즉 1초에 50번 새 제어 명령을 내보내야 하므로 토큰 단위 언어 출력으로는 감당되지 않는다.

그래서 pre-trained VLM에 flow matching으로 연속 action 출력을 결합했다는 것이 블로그가 밝힌 핵심 설계다. VLM을 선택한 이유와 그것을 고쳐 쓴 이유를 나란히 적은 이 대목이 발표 글에서 가장 정보 밀도가 높다.

### 세 가지 사용 방식

블로그의 모델 도해는 학습을 마친 π0를 쓰는 방법을 세 가지로 나눈다.

| 사용 방식 | 설명 | 블로그가 든 예 |
|---|---|---|
| zero-shot 실행 | pre-training 분포 안의 과제를 추가 학습 없이 지시문만으로 수행 | 식탁 치우기 |
| 어려운 과제 specialized post-training | 고품질 데이터로 특화해 고난도 과제를 수행 | 가정용 건조기 비우기, 셔츠 여러 장 개기 |
| 미학습 과제 efficient post-training | 적은 데이터로 학습에 없던 과제까지 확장 | 물건을 서랍에 넣기 |

출력 쪽 과제로는 빨래 개기, 옷 개기, 커피 내리기, 장바구니 담기, 식탁 치우기, 팝콘 봉지 열기가 예시로 걸려 있다.

### post-training으로 특화한 시연 과제

블로그는 세 과제를 골라 무엇이 어려운지를 구체적으로 설명한다.

| 과제 | 로봇 구성 | 요구 능력 |
|---|---|---|
| 빨래 개기 | mobile robot 또는 고정형 양팔 | 엉킨 빨래 더미를 펴고 개어 가지런히 쌓기 |
| 식탁 치우기 | 고정형 양팔 | 그릇과 수저와 컵은 그릇통으로, 쓰레기는 쓰레기통으로 분류 |
| 상자 조립 | 양팔 | 납작한 골판지를 세워 옆면을 접고 덮개를 안으로 밀어 넣기 |

빨래 개기가 어려운 이유는 동작 재생으로 풀리지 않기 때문이다. 탁자에 평평하게 놓인 티셔츠 한 장은 미리 짜 둔 동작을 반복하는 것만으로 개킬 수 있지만, 엉킨 빨래 더미는 구겨지는 방식이 매번 달라 같은 동작을 되풀이하는 것으로는 부족하다. 블로그는 이 수준의 복잡도로 이 과제를 수행한 선행 로봇 시스템이 없다고 밝힌다.

식탁 치우기에서는 가르치지 않은 행동이 나왔다고 보고한다. 접시를 하나씩 옮기는 대신 여러 장을 겹쳐 한 번에 통에 담거나, 접시 위의 쓰레기를 쓰레기통에 털어낸 뒤 접시를 그릇통에 넣는 식이다. 블로그는 이런 emergent strategy를 크고 다양한 데이터로 학습한 결과로 해석하며, 사람이 여러 방식으로 방해해도 로봇이 회복한다는 관찰도 같은 근거로 든다.

상자 조립은 진행 상황을 보며 조정하는 능력을 요구한다. 접기와 밀어 넣기가 예상 못 한 방식으로 실패할 수 있어 매 단계 결과를 확인해야 하고, 반쯤 접힌 상자가 벌어지지 않도록 두 팔과 탁자를 함께 써서 받쳐야 한다.

## 결과

### 비교 대상 모델

블로그가 baseline으로 삼은 모델은 학계에서 제안된 로봇 foundation model 둘과 자사의 축소 버전 하나다.

| 모델 | 파라미터 | action 출력 방식 |
|---|---|---|
| π0 | 출발점 VLM 파라미터 30억 개 | flow matching으로 연속 action 생성 |
| π0-small | 4억 7천만 개 | VLM pre-training을 쓰지 않는 축소 버전 |
| OpenVLA | 70억 개 | 이산화된 action 토큰 |
| Octo | 9,300만 개 | diffusion 출력 |

### 과제별 정규화 점수

논문 Figure 7이 막대그래프만 싣는 반면 블로그는 같은 결과를 숫자로 적어 둔다. 완전 성공에 1.0을 주고 부분 수행에는 부분 점수를 주는 정규화 점수이며, 예를 들어 물체의 절반을 치우면 0.5가 된다.

| 과제 (로봇) | π0 | π0-small | OpenVLA | OpenVLA (UR5e only) | Octo |
|---|---|---|---|---|---|
| Bussing Easy (UR5e) | 0.971 | 0.443 | 0 | 0.343 | 0.043 |
| Bussing Hard (UR5e) | 0.875 | 0.333 | 0 | 0 | 0 |
| Shirt Folding (Bi-ARX) | 1.000 | 0.500 | 0 | 0 | 0 |
| Grocery Bagging (UR5e) | 0.786 | 0.271 | 0 | 0 | 0 |
| Toast out of Toaster (Bi-Trossen) | 0.750 | 0 | 0 | 0 | 0 |

이 표에서 π0는 다섯 과제 모두에서 가장 높은 점수를 낸다. 블로그는 OpenVLA와 Octo가 0을 넘긴 과제가 가장 쉬운 Bussing Easy 하나뿐이라고 적는데, 그 값을 낸 OpenVLA는 UR5e 데이터로만 fine-tune한 변형(0.343)이고 기본 OpenVLA는 다섯 과제 모두 0이다.

두 번째로 높은 모델은 π0-small이다. 블로그는 전체 크기 아키텍처에 VLM pre-training을 결합한 쪽이 2배가 넘는 성능 개선을 보였다고 해석하며, 이 비교를 VLM 상속의 효과를 보여주는 근거로 제시한다.

### 평가 과제의 난이도

블로그는 이 점수를 학계 벤치마크와 같은 기준으로 읽지 말라고 따로 짚는다. OpenVLA 평가에 쓰인 과제는 "가지를 냄비에 넣어라" 같은 단일 단계 행동인 반면, π0의 가장 쉬운 bussing조차 여러 물체를 쓰레기통과 그릇통으로 분류하는 일이기 때문이다.

더 어려운 과제는 다음 세 가지를 함께 요구한다.

- 여러 단계로 이어지는 진행
- 옷이나 봉투처럼 형태가 변하는 물체의 조작
- 현재 환경 배치에 따라 여러 전략 중 하나를 고르는 판단

### 무편집 데모와 공개 영상

빨래 개기 영상은 post-training 결과를 담았으며 편집하지 않았다고 밝힌다. 건조기에서 옷을 꺼내 탁자로 옮기고 개어 쌓는 전 과정을 하나의 policy가 완전 자율로 수행한다.

평가 영상은 성공과 실패 사례를 함께 공개한다. 직접 프롬프팅 실험과 fine-tuning 평가 모두에 대해 아래 과제의 영상이 실려 있다.

- 달걀을 계란판에 담기
- 장바구니 담기
- 토스터에서 토스트 꺼내기
- 수건 개기
- 그릇 쌓기
- 밀폐 용기를 전자레인지에 넣기
- 물건을 서랍에 넣기
- 셔츠 개기
- 반바지 개기
- 종이 타월을 거치대에 걸기
- 포장 용기에 음식 담기

## 향후 방향

블로그는 generalist robot policy가 아직 초기 단계이며 갈 길이 멀다고 명시한다. 로봇 foundation model 연구의 남은 전선으로는 네 가지를 꼽는다.

| 연구 전선 | 내용 |
|---|---|
| long-horizon reasoning과 planning | 여러 단계에 걸친 과제를 스스로 계획하고 추론하는 능력 |
| 자율적 self-improvement | 사람의 시연 없이 경험만으로 성능을 끌어올리는 학습 |
| robustness | 환경과 물체가 바뀌어도 성능을 유지하는 안정성 |
| safety | 실제 환경에서 사람과 함께 동작할 때의 안전성 |

이 목록은 이후 π 계열의 전개를 예고한 셈이다. [[physical-ai/sa-2026-vision-language-action-models-for|VLA 서베이]]가 정리한 계보와 맞춰 읽으면 π0.5가 계층 구조와 데이터 구성을, π*0.6이 자율 경험 학습을 각각 이어받았음을 확인할 수 있다.

기술과 데이터만으로는 충분하지 않다는 입장도 함께 밝힌다. 로보틱스 커뮤니티 전체의 협업이 필요하다고 보며, teleoperation과 자율 주행용 하드웨어 설계를 다듬고 파트너의 데이터를 pre-trained 모델에 합치는 협업이 이미 여러 기업과 연구실에서 진행 중이라고 전한다. teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다.

## 한계

블로그 자체가 밝힌 한계는 generalist robot policy의 미성숙이다. 위의 네 전선이 그대로 미해결 과제 목록에 해당하며, 블로그는 이후 1년 안에 모든 방향에서 큰 진전이 있으리라 전망한다.

자료로서의 한계도 분명하다. 이 글은 대중 공개용 발표문이라 다음 정보가 빠져 있다.

- 아키텍처 세부. VLM의 이름과 action expert의 구성, attention mask 설계가 모두 논문에만 있다.
- 학습 레시피. pre-training mixture의 가중치와 post-training 데이터 규모를 적지 않는다.
- ablation. 어떤 설계 요소가 성능에 얼마나 기여했는지를 다루지 않는다.
- flow matching의 수식. "diffusion model의 변형"이라는 한 줄 정의에서 멈춘다.

로봇 대수 표기도 논문과 어긋난다. 블로그 본문은 자체 수집 데이터가 서로 다른 로봇 8종에서 나왔다고 쓰지만, 같은 페이지의 플랫폼 목록에 이름이 오른 것은 UR5e, Bimanual UR5e, Franka, Bimanual Trossen, Bimanual ARX, Mobile Trossen, Mobile Fibocom 일곱이다. 논문이 적은 수도 7종 robot configuration인데, Bimanual ARX와 Bimanual AgileX를 운동학적 유사성 때문에 한 부류로 묶은 결과다.

## 논문 페이지와의 역할 분담

한 모델을 다루는 자료가 이 저장소에 셋 있다. 발표 블로그인 이 페이지, 논문 페이지, 그리고 레퍼런스 구현 페이지가 각각 다른 각도를 맡는다.

| 자료 | 담당 |
|---|---|
| 이 페이지 (블로그) | 발표 맥락, 회사의 목표 규정, 시연 과제 설명, 과제별 정규화 점수 |
| [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]] | 아키텍처, 학습 레시피, 전체 실험과 ablation |
| [[physical-ai/physical-intelligence-openpi]] | 공개 구현, checkpoint, fine-tuning 파이프라인 |

수치를 인용할 때는 이 페이지가 유용하다. zero-shot 표의 소수점 값이 블로그에만 적혀 있기 때문이다. 반대로 구조와 학습 절차가 필요하면 논문 페이지로 넘어가야 한다. π0가 무엇이고 왜 필요한지를 짧게 파악하려는 독자에게는 이 페이지가 먼저 읽을 입구에 해당한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| artificial physical intelligence | Physical Intelligence가 내건 장기 목표. 사용자가 챗봇에 요청하듯 로봇에 아무 과제나 말로 시킬 수 있는 상태를 가리킨다 |
| generalist policy | 과제마다 모델을 따로 두지 않고 하나의 policy로 여러 로봇과 여러 과제를 수행하는 모델 |
| Moravec's paradox | 사람에게 쉬운 감각과 운동 과제가 AI에는 어렵고 그 반대도 성립한다는 관찰. 블로그가 문제 설정의 출발점으로 인용한다 |
| flow matching | noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법. 블로그는 diffusion model의 변형이라고만 설명한다 |
| emergent strategy | 명시적으로 가르치지 않았는데 대규모 다양 데이터 학습에서 나타난 전략. 접시를 겹쳐 담기와 접시 위 쓰레기 털어내기가 예다 |
| post-training | pre-training을 마친 모델을 고품질 데이터로 다시 학습시켜 특정 과제에 특화시키는 단계 |

## 관련 페이지

- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]: 같은 날 공개된 원 논문. 아키텍처와 학습 레시피, 전체 실험이 여기 있다
- [[physical-ai/physical-intelligence-2025-a-vla-with-open-world]]: 반년 뒤 같은 자리에 올라온 π0.5 발표문. 강조점이 action 표현에서 학습 데이터 구성으로 옮겨 간다
- [[physical-ai/physical-intelligence-2025-a-vla-that-learns-from]]: 자율 경험과 강화학습을 더한 π\*0.6 발표문. 이 글이 꼽은 self-improvement 전선의 후속이다
- [[physical-ai/physical-intelligence-2026-a-steerable-model-with-emergent]]: 같은 계열의 최신 발표문. steerability와 emergent capability를 다룬다
- [[physical-ai/physical-intelligence-openpi]]: 같은 팀의 공개 구현. 블로그가 예고한 후속 모델까지 담겨 있다
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]]: 블로그가 직접 링크한 비교 대상. 이산화된 action 토큰을 쓰는 직전 세대 오픈소스 VLA다
- [[physical-ai/sa-2026-vision-language-action-models-for]]: 블로그가 향후 방향으로 꼽은 항목들이 실제로 어떻게 전개됐는지 보여 주는 서베이
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브
