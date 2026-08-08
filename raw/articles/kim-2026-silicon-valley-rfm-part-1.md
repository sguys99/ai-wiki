---
title: "[실리콘밸리 RFM 기술 및 현황] - 1편: RFM의 등장 배경과 실리콘밸리의 Robot Intelligence 스타트업의 현황"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/kim-2026-silicon-valley-rfm-part-1.md
raw_filename: "kim-2026-silicon-valley-rfm-part-1.md"
source_collection: external
author: "Kyungyul Kim, Jiyoon Kim"
url: "https://www.linkedin.com/pulse/%EC%8B%A4%EB%A6%AC%EC%BD%98%EB%B0%B8%EB%A6%AC-rfm-%EA%B8%B0%EC%88%A0-%EB%B0%8F-%ED%98%84%ED%99%A9-1%ED%8E%B8-rfm%EC%9D%98-%EB%93%B1%EC%9E%A5-%EB%B0%B0%EA%B2%BD%EA%B3%BC-%EC%8B%A4%EB%A6%AC%EC%BD%98%EB%B0%B8%EB%A6%AC%EC%9D%98-robot-intelligence-kim-765oc/"
publisher: "LinkedIn"
fetched_at: "2026-08-08T16:10:47+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/kim-2026-silicon-valley-rfm-part-1/page-full.png
    raw: raw/articles/kim-2026-silicon-valley-rfm-part-1-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig02
    file: assets/kim-2026-silicon-valley-rfm-part-1/crop01.png
    raw: raw/articles/kim-2026-silicon-valley-rfm-part-1-figures/crop01.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

![[실리콘밸리 RFM 기술 및 현황] - 1편: RFM의 등장 배경과 실리콘밸리의 Robot Intelligence 스타트업의 현황](https://media.licdn.com/dms/image/v2/D5612AQEXuETLBHzlJA/article-cover_image-shrink_720_1280/B56Z2yx4pQKwAI-/0/1776820923180?e=2147483647&v=beta&t=QG70c427-DbRVuXl1vVbq8uZyv8t-cBUuc2Oco9Myws)

작성자: [KYUNGYUL KIM](https://www.linkedin.com/in/kyungyul-kim-9530aa123?trk=article-ssr-frontend-pulse_little-mention) , [Jiyoon Kim](https://www.linkedin.com/in/jiyoon-june-kim-aa8354196/en?trk=article-ssr-frontend-pulse_little-mention)

🤖 [실리콘밸리 RFM 기술 및 현황] 1편

Introduction: RFM의 등장 배경과 실리콘밸리의 Robot Intelligence 스타트업의 현황

━━━━━━━━━━━━━━━━━━━━

OpenAI의 GPT, Anthropic Claude, Google Gemini로 대표되는 LLM(Large Language Model)은 텍스트 중심의 자연어 처리를 주도해왔다면, 이후 이미지와 비디오 같은 시각 데이터까지 함께 이해하고 답변을 생성할 수 있도록 모델이 VLM(Vision Language Model)으로 확장 되었습니다.

최근들어, Physical AI의 주목에 따라 로봇이 사람의 지능과 같이 의도한대로 동작하기 위해서, 로봇의 카메라 이미지(Vision)와 자연어 명령(Language)을 입력받아 로봇의 동작(Action)을 직접 출력하도록 하여 로봇을 움직이게 하고자 VLM(Vision Language Model)을 기반으로 로봇의 Action까지 생성할 수 있도록 확장한 VLA(Vision Language Action) 모델이 제안되고 있습니다. 또한, 최근의 실리콘밸리에서의 움직임으로는 VLA와 다양한 형태의 데이터를 기반으로 물리적 환경을 만들어 낼 수 있는 World Model과 통합이 되는 World Action Model의 연구/개발이 활발하게 진행되고 있습니다.

━━━━━━━━━━━━━━━━━━━━

▌RFM 기업들의 현재 작동 방식

현재 실리콘밸리의 RFM(VLA) 기업들은 모델의 성능과 로봇 Action Task를 점진적으로 확장하기 위해 Pre-training, Post-training, 데이터 제작 및 평가의 전 과정을 직접 수행하고 있습니다. 동시에 다양한 산업 파트너와의 PoC를 통해 데이터와 경험을 축적하며, 상황에 따라 유상 계약 또는 레퍼런스 확보 목적의 협업 형태로 진행됩니다. 이러한 PoC는 실리콘밸리에서 흔히 "selling the roadmap" 혹은 "fake it till you make it"이라 불리는 패턴의 마케팅으로 앞서 제시한 기술 비전과 실제 구현 사이의 간극을 사후적으로 채워나가는 과정의 전형적인 모습이기도 합니다. 그리고 그 과정에서 확보한 레퍼런스는 투자사로부터 투자금을 유치하기 위한 강력한 증거로 활용됩니다.

💡 참고 실리콘밸리에서는 이러한 구조를 "selling the roadmap"(완성되지 않은 기술 비전을 선판매한다는 의미) 혹은 "fake it till you make it"(일단 해낼 수 있다고 선언한 뒤 뒤따라가며 채워 넣는다는 의미)이라 부르기도 합니다.

━━━━━━━━━━━━━━━━━━━━

▌RFM 기업들이 학습 영역을 전부 직접 수행하는 배경

그렇다면, RFM 기업들이 학습의 영역에서 Pre-training, Post-training을 전 영역을 직접 하는 배경으로는 다음과 같습니다.

1️⃣ 로드맵상 제시된 기술 스택과 실제 구현 사이에는 격차가 존재하며, RFM(VLA)을 만들고 활용하는 방법에 대한 핵심 노하우 유출에 대한 우려와 데이터를 어떤 비율로 섞어야 하는지 자체가 노하우이기 때문입니다.

2️⃣ 많은 경우 오픈소스 모델(PaliGemma, LLaMA, SigLIP, Qwen, OpenVLA 등)을 활용하면서 그 위에 기술을 쌓아가는 방식으로 개발이 진행되고 있습니다.

그렇기에, 공개가 된다면 로봇과 로봇을 기반으로 직접 제작한 데이터를 중심으로 남들이 생각보다 쉽게 만들 수도 있는 영역일 수도 있습니다. 또는 핵심 차별화 요소이기에 그 기술을 보호하기 위함일 수도 있습니다.

Robot Intelligence 분야는 초기 진입장벽이 높고 학습 데이터·노하우의 희소성이 크기 때문에, 실제 업계에서는 Open 진영과 Closed 진영이 공존하되 후자가 희소성을 통한 기술 마케팅 측면에서 유리한 포지션을 취할 수 있는 구조가 형성됩니다.

3️⃣ 데이터 확보의 본질적 어려움.

LLM은 웹 서비스를 통해 사용자 데이터를 자연스럽게 수집하며 pre-training과 post-training을 반복할 수 있었지만, VLA는 사정이 다릅니다. 인터넷의 비디오 데이터로 기본 동작의 scale-up은 가능하지만, 실제 산업 환경에서 로봇 하드웨어로 직접 취득한 데이터와 성공/실패 케이스가 있어야 비로소 의미 있는 로봇 지능이 됩니다. 그러나 RFM 기업들은 로봇이 적용될 산업 환경 자체를 보유하고 있지 않기 때문에, 데이터 확보가 구조적으로 어렵습니다. 그래서 데이터를 만들 수 있는 환경을 제공하는 기업들과 PoC를 진행하면서, 그 과정에서 직접 데이터를 제작하고 pre-training과 post-training을 반복하여 특정 Task에 fit한 모델을 만들고 검증하는 방식을 취하고 있는 것으로 파악됩니다.

⚠️ 이 구조가 의미하는 바는 명확합니다.

RFM 기업이 학습의 전 과정을 직접 수행하는 방식으로 협업이 이루어지면, RFM 학습 노하우는 오직 RFM 기업에게만 축적되고, 파트너/협업 관계의 기업은 자신의 데이터와 환경을 제공하면서도 결국 RFM 기업의 모델만 고도화시켜주는 형태가 되기 쉽습니다. 파트너/협업 관계의 기업은 역량 축적이 될 수 없습니다.

━━━━━━━━━━━━━━━━━━━━

▌Full-stack 전략: 휴머노이드 분야에서 특히 강한 흐름

또한, 일부 RFM 기업들은 하드웨어까지 직접 제작하는 Full-stack 전략을 취하고 있으며, 특히 휴머노이드 분야에서 이 경향이 강합니다.

▸ 다양한 Robot에서 검증 되어야 하지만, 다양한 로봇을 확보 하기도 어렵고, 확보된 로봇마다 Controller(로봇 하드웨어 기업이 제공하는 SDK)를 RFM모델에 맞게 커스터마이징해야 하는데, 이 부분에 대하여 표준화를 할 수 없기 때문입니다.

▸ Robot 부품 수급 전략도 다각화하고 있습니다. 아시아권에서 다수의 부품을 조달하면서 공급망 다변화를 병행하고, 경우에 따라서는 완성도가 높은 모듈 단위 부품을 다양한 경로로 수급한 뒤 미국에서 조립하는 방식을 택하기도 합니다. 그리고 이렇게 확보한 하드웨어에 자사 RFM 모델을 최적화할 수 있도록 전용 Robot H/W SDK를 직접 개발하고 있습니다.

이러한 Full-stack 접근은 결국 "RFM 학습에만 집중할 수 있는 환경"을 만들기 위한 전략입니다. 하드웨어 공급, SDK, 학습 파이프라인, 배포 인프라를 모두 내부화함으로써 RFM 연구·개발 과정의 예외 변수를 최소화하고, RFM 중심의 비즈니스 모델을 견고하게 유지할 수 있기 때문입니다.

━━━━━━━━━━━━━━━━━━━━

▌정리

이처럼 RFM 분야는 기술 스택·학습 노하우·하드웨어·데이터·배포 인프라가 모두 맞물려 움직이는 복합 영역이며, 기술의 실체와 마케팅으로 제시된 기술 비전 사이의 간극을 외부에서 명확히 판별하기 쉽지 않습니다.

이는 AI 연구·개발 실무자조차도 각 Physical AI 기업의 기술적 본질과 성숙도를 정확히 가늠하기 어려운 영역이 존재함을 의미하며, 기술·시장·사업성을 종합적으로 판단해야 하는 VC 투자 생태계 전반에서도 정보 비대칭이 상대적으로 크게 작용할 수 있는 구조입니다. 따라서 이 분야에 대한 전략적 판단에는 기술의 실체를 구조적으로 이해하려는 접근이 필수적입니다.

그렇다면, Enterprise 입장에서 Physical AI 영역의 Robot Intelligence 기술 영역은 R&D를 할 수 있고 오퍼링을 할 수 있는지 판단하기 위해서, 다음 연재부터는 기술적 개념 설명을 하도록 하겠습니다.

━━━━━━━━━━━━━━━━━━━━

#PhysicalAI #RobotFoundationModel #VLA #실리콘밸리 #RobotIntelligence
