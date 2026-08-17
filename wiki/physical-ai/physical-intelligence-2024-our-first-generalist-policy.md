---
title: "π0: Our First Generalist Policy"
type: article
year: 2024
category: physical-ai
source: physical-intelligence-2024-our-first-generalist-policy.md
raw_path: /home/sguys99/project/ai-wiki/raw/articles/physical-intelligence-2024-our-first-generalist-policy.md
raw_filename: "physical-intelligence-2024-our-first-generalist-policy.md"
source_collection: external
author: "Physical Intelligence"
url: "https://www.pi.website/blog/pi0"
publisher: "Physical Intelligence Blog"
publication_date: "2024-10-31"
tags: [physical-ai, vla, manipulation, robot-learning]
figures:
  - id: fig01
    file: assets/physical-intelligence-2024-our-first-generalist-policy/fig01.png
    raw: raw/articles/physical-intelligence-2024-our-first-generalist-policy-figures/fig01.png
    caption: "본문에 삽입된 로봇 일러스트 (262×322)"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/physical-intelligence-2024-our-first-generalist-policy/page-full.png
    raw: raw/articles/physical-intelligence-2024-our-first-generalist-policy-figures/page-full.png
    caption: "블로그 전체 페이지 스크린샷 (상단 6000px)"
    strategy: screenshot
    curated: false
---

## 요약 (Summary)

π0 논문과 같은 날 올라온 Physical Intelligence의 공식 블로그 발표문이다. 수식을 걷어내고 같은 내용을 설명하면서 논문에 없는 것도 두 가지 덧붙인다. zero-shot 평가의 과제별 raw 점수와 무편집 데모 영상이다.

논문 요약본이어서 읽는 글은 아니다. 이 회사가 π0를 무엇으로 규정하는지가 여기 드러난다. 제목의 "our first generalist policy"부터가 그렇다. 본문은 π0를 artificial physical intelligence를 향한 첫걸음으로 부른다. 사용자가 LLM 챗봇에 요청하듯 로봇에 아무 과제나 말로 시킬 수 있는 상태가 그들이 말하는 목표다.

페이지의 시각 자료가 대부분 동영상과 인터랙티브 차트다. 정지 이미지로 남지 않아 도식은 wiki에 임베드하지 않았다. 구조 그림이 필요하면 [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model|논문 페이지]]의 Figure 1·3을 보면 된다.

## 논문에 없는 것 (What the Paper Doesn't Have)

### 과제별 raw 점수

논문 Figure 7은 막대그래프뿐이지만 블로그에는 숫자가 그대로 적혀 있다. 부분 성공에 부분 점수를 주는 정규화 점수다.

| 과제 (로봇) | π0 | π0-small | OpenVLA | OpenVLA (UR5e only) | Octo |
|---|---|---|---|---|---|
| Shirt Folding (Bi-ARX) | 1.000 | 0.500 | 0 | 0 | 0 |
| Bussing Easy (UR5e) | 0.971 | 0.443 | 0 | 0.343 | 0.043 |
| Bussing Hard (UR5e) | 0.875 | 0.333 | 0 | 0 | 0 |
| Grocery Bagging (UR5e) | 0.786 | 0.271 | 0 | 0 | 0 |
| Toast out of Toaster (Bi-Trossen) | 0.750 | 0 | 0 | 0 | 0 |

블로그는 OpenVLA와 Octo가 0을 넘긴 과제가 가장 쉬운 Bussing Easy 하나뿐이라고 쓴다. 표에서 그 값을 낸 OpenVLA는 UR5e 데이터로만 fine-tune한 쪽(0.343)이고 기본 OpenVLA는 다섯 과제 모두 0이다. 2위인 π0-small과 비교해도 전체 아키텍처에 VLM pre-training을 얹은 쪽이 2배 넘게 앞선다.

OpenVLA 평가 과제는 "가지를 냄비에 넣어라" 같은 단일 단계 행동이다. π0의 가장 쉬운 bussing조차 여러 물체를 쓰레기통과 그릇통으로 분류하는 일이다. 어려운 쪽은 다단계 진행과 변형 물체 조작, 상황에 따른 전략 선택까지 요구한다. π0의 평가 과제가 학계 관행보다 훨씬 어렵다는 점을 블로그가 따로 짚는다.

### emergent strategy

식탁 치우기에서 가르치지 않은 행동이 나왔다고 보고한다. 접시를 하나씩 옮기는 대신 여러 장을 겹쳐 한 번에 담거나, 접시 위 쓰레기를 털어내고 나서 통에 넣는 식이다. 다양한 데이터로 학습한 덕에 사람이 여러 방식으로 방해해도 회복한다는 관찰도 덧붙인다. 논문에서는 지나가듯 다루는 내용이다.

### 무편집 데모

빨래 개기 영상은 건조기에서 옷을 꺼내 탁자로 옮기고 개어 쌓는 전 과정을 담았다. 하나의 policy가 완전 자율로 수행한다. 편집은 하지 않았다고 한다. 상자 조립은 접기와 끼우기가 예상 못 한 방식으로 실패할 수 있다. 진행 상황을 보며 조정해야 한다. 반쯤 접힌 상자가 벌어지지 않도록 두 팔과 탁자로 받쳐야 한다는 설명도 붙는다.

## 동기와 설명 방식 (Framing)

동기 서술이 논문보다 직설적이다. Moravec's paradox를 끌어온다. 체스를 이기거나 신약을 찾는 일은 AI에게 "쉬운" 문제다. 반면 셔츠를 개거나 식탁을 치우는 일은 지금껏 고안된 가장 어려운 공학 문제에 속한다고 말한다. 그래서 필요한 것이 embodied 시스템이라는 논리다.

GPT-4V나 Gemini 같은 VLM은 웹의 텍스트와 이미지를 모델링하도록 학습돼 의미 지식을 잘 옮겨 온다. 다만 출력이 이산 언어 토큰뿐이다. dexterous manipulation에는 초당 50회까지 모터 명령을 내보내야 한다. 그래서 pre-trained VLM에 flow matching으로 연속 action 출력을 붙였다. VLM을 쓰는 이유를 정리한 이 대목이 블로그의 핵심이다. flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다. 블로그는 이를 "diffusion model의 변형"이라고 한 줄로 정의하고 넘어간다.

파라미터 30억짜리 비교적 작은 VLM을 실시간 제어에 맞게 개조했다고만 밝히고 PaliGemma라는 이름은 꺼내지 않는다. 이런 식으로 구현 세부를 논문에 미루는 대목이 여럿이다.

그릇 치우기, 봉투에 물건 담기, 옷 개기, 케이블 정리, 상자 조립, 플러그 꽂기, 포장 용기에 음식 담기, 쓰레기 버리기가 데이터셋 목록이다. 특정 응용을 풀려고 모은 데이터가 아니라고 선정 원칙을 밝힌다. 물리적 상호작용을 모델에 두루 이해시키는 것이 목표다.

블로그는 자체 수집 데이터가 "8종의 서로 다른 로봇"에서 나왔다고 쓴다. 논문의 표기는 7종 robot configuration이다. 숫자가 하나 어긋난다. Bimanual ARX와 Bimanual AgileX를 논문이 운동학적 유사성 때문에 한 부류로 묶은 결과다.

## 향후 방향 (Where They Go Next)

generalist robot policy가 아직 초기 단계라고 명시하면서 남은 연구 전선으로 넷을 꼽는다. long-horizon reasoning과 planning, 자율적 self-improvement, robustness, safety다. 이 목록은 이후 π0.5와 π*0.6의 전개를 예고한 셈이다. [[physical-ai/sa-2026-vision-language-action-models-for|VLA 서베이]]가 정리한 계보와 맞춰 읽으면 실제로 그 순서대로 진행됐음을 볼 수 있다.

블로그는 기술과 데이터만으로는 안 되고 로보틱스 커뮤니티 전체의 협업이 필요하다는 입장이다. teleoperation과 자율 주행용 하드웨어 설계를 다듬고 파트너 데이터를 pre-trained 모델에 합치는 협업이 이미 진행 중이라고 한다. teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다.

## 이 저장소 안에서의 위치 (Position in This Wiki)

논문·블로그·구현 세 자료가 한 모델을 각각 다른 각도에서 다룬다. 이 페이지는 그중 가장 얕고 빠른 입구다. π0가 무엇이고 왜 필요한지 15분 안에 잡고 싶을 때 여기서 시작해 논문으로 넘어가면 된다.

수치를 인용할 때는 이 페이지가 논문보다 낫다. zero-shot 표의 소수점 값이 여기에만 있어서다. 반대로 아키텍처·학습 절차·ablation은 전부 논문 쪽에 있다.

## 관련 페이지 (Related Pages)

- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]] — 같은 내용의 논문. 아키텍처·학습 레시피·전체 실험이 여기 있다
- [[physical-ai/physical-intelligence-2025-a-vla-with-open-world]] — 반년 뒤 같은 자리에 올라온 π0.5 발표문. 강조점이 action 표현에서 학습 데이터 구성으로 옮겨 간다
- [[physical-ai/physical-intelligence-openpi]] — 같은 팀의 공개 구현. 블로그가 예고한 후속 모델(π0.5)까지 담겨 있다
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]] — 블로그가 직접 링크한 비교 대상 중 하나
- [[physical-ai/sa-2026-vision-language-action-models-for]] — 블로그가 향후 방향으로 꼽은 항목들이 실제로 어떻게 전개됐는지 보여 주는 서베이
- [[overviews/physical-ai-overview]] — 도메인 허브
