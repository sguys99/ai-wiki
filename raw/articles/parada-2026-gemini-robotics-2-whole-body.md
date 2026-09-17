---
title: "제미나이 로보틱스 2: 로봇에 전신 지능을 구현하다"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/parada-2026-gemini-robotics-2-whole-body.md
raw_filename: "parada-2026-gemini-robotics-2-whole-body.md"
source_collection: external
author: "Carolina Parada"
url: "https://blog.google/intl/ko-kr/company-news/technology/gemini-robotics-2/"
publisher: "blog.google"
publication_date: "2026-07-30"
fetched_at: "2026-09-17T21:24:20+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/parada-2026-gemini-robotics-2-whole-body/fig01.webp
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/fig01.webp
    caption: ""
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/parada-2026-gemini-robotics-2-whole-body/fig02.webp
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/fig02.webp
    caption: ""
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/parada-2026-gemini-robotics-2-whole-body/fig03.webp
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/fig03.webp
    caption: ""
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/parada-2026-gemini-robotics-2-whole-body/page-full.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig05
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop01.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop01.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig06
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop02.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop02.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig07
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop03.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop03.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig08
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop04.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop04.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig09
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop05.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop05.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig10
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop06.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop06.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig11
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop07.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop07.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig12
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop08.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop08.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig13
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop09.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop09.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig14
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop10.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop10.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig15
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop11.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop11.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig16
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop12.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop12.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

# 제미나이 로보틱스 2: 로봇에 전신 지능을 구현하다

2026년 7월 30일

|

?lit$222422372$읽는데 15 분 소요

 Share Dropdown Menu 

- [x.com](https://twitter.com/intent/tweet?text=%EC%A0%9C%EB%AF%B8%EB%82%98%EC%9D%B4%20%EB%A1%9C%EB%B3%B4%ED%8B%B1%EC%8A%A4%202%3A%20%EB%A1%9C%EB%B4%87%EC%97%90%20%EC%A0%84%EC%8B%A0%20%EC%A7%80%EB%8A%A5%EC%9D%84%20%EA%B5%AC%ED%98%84%ED%95%98%EB%8B%A4%20%40google&url=https://blog.google/intl/ko-kr/company-news/technology/gemini-robotics-2/)
- [페이스북](https://www.facebook.com/sharer/sharer.php?caption=%EC%A0%9C%EB%AF%B8%EB%82%98%EC%9D%B4%20%EB%A1%9C%EB%B3%B4%ED%8B%B1%EC%8A%A4%202%3A%20%EB%A1%9C%EB%B4%87%EC%97%90%20%EC%A0%84%EC%8B%A0%20%EC%A7%80%EB%8A%A5%EC%9D%84%20%EA%B5%AC%ED%98%84%ED%95%98%EB%8B%A4&u=https://blog.google/intl/ko-kr/company-news/technology/gemini-robotics-2/)
- [링크드인](https://www.linkedin.com/shareArticle?mini=true&url=https://blog.google/intl/ko-kr/company-news/technology/gemini-robotics-2/&title=%EC%A0%9C%EB%AF%B8%EB%82%98%EC%9D%B4%20%EB%A1%9C%EB%B3%B4%ED%8B%B1%EC%8A%A4%202%3A%20%EB%A1%9C%EB%B4%87%EC%97%90%20%EC%A0%84%EC%8B%A0%20%EC%A7%80%EB%8A%A5%EC%9D%84%20%EA%B5%AC%ED%98%84%ED%95%98%EB%8B%A4)
- [이메일](mailto:?subject=%EC%A0%9C%EB%AF%B8%EB%82%98%EC%9D%B4%20%EB%A1%9C%EB%B3%B4%ED%8B%B1%EC%8A%A4%202%3A%20%EB%A1%9C%EB%B4%87%EC%97%90%20%EC%A0%84%EC%8B%A0%20%EC%A7%80%EB%8A%A5%EC%9D%84%20%EA%B5%AC%ED%98%84%ED%95%98%EB%8B%A4&body=구글코리아 블로그에서 게시글 보기%0A%0A%EC%A0%9C%EB%AF%B8%EB%82%98%EC%9D%B4%20%EB%A1%9C%EB%B3%B4%ED%8B%B1%EC%8A%A4%202%3A%20%EB%A1%9C%EB%B4%87%EC%97%90%20%EC%A0%84%EC%8B%A0%20%EC%A7%80%EB%8A%A5%EC%9D%84%20%EA%B5%AC%ED%98%84%ED%95%98%EB%8B%A4%0A%0A발끝부터 손끝까지 — 구글은 복잡한 과제를 폭넓게 수행할 수 있도록 로봇에 지능적인 전신 제어(whole-body control)와 정밀한 조작 능력, 그리고 협업 능력을 학습시키고 있습니다.%0A%0Ahttps://blog.google/intl/ko-kr/company-news/technology/gemini-robotics-2/)
- 

 발끝부터 손끝까지 — 구글은 복잡한 과제를 폭넓게 수행할 수 있도록 로봇에 지능적인 전신 제어(whole-body control)와 정밀한 조작 능력, 그리고 협업 능력을 학습시키고 있습니다. 

---

캐롤리나 파라다(Carolina Parada)

Senior Director, Robotics, Google DeepMind

 Share Dropdown Menu 

- [x.com](https://twitter.com/intent/tweet?text=%EC%A0%9C%EB%AF%B8%EB%82%98%EC%9D%B4%20%EB%A1%9C%EB%B3%B4%ED%8B%B1%EC%8A%A4%202%3A%20%EB%A1%9C%EB%B4%87%EC%97%90%20%EC%A0%84%EC%8B%A0%20%EC%A7%80%EB%8A%A5%EC%9D%84%20%EA%B5%AC%ED%98%84%ED%95%98%EB%8B%A4%20%40google&url=https://blog.google/intl/ko-kr/company-news/technology/gemini-robotics-2/)
- [페이스북](https://www.facebook.com/sharer/sharer.php?caption=%EC%A0%9C%EB%AF%B8%EB%82%98%EC%9D%B4%20%EB%A1%9C%EB%B3%B4%ED%8B%B1%EC%8A%A4%202%3A%20%EB%A1%9C%EB%B4%87%EC%97%90%20%EC%A0%84%EC%8B%A0%20%EC%A7%80%EB%8A%A5%EC%9D%84%20%EA%B5%AC%ED%98%84%ED%95%98%EB%8B%A4&u=https://blog.google/intl/ko-kr/company-news/technology/gemini-robotics-2/)
- [링크드인](https://www.linkedin.com/shareArticle?mini=true&url=https://blog.google/intl/ko-kr/company-news/technology/gemini-robotics-2/&title=%EC%A0%9C%EB%AF%B8%EB%82%98%EC%9D%B4%20%EB%A1%9C%EB%B3%B4%ED%8B%B1%EC%8A%A4%202%3A%20%EB%A1%9C%EB%B4%87%EC%97%90%20%EC%A0%84%EC%8B%A0%20%EC%A7%80%EB%8A%A5%EC%9D%84%20%EA%B5%AC%ED%98%84%ED%95%98%EB%8B%A4)
- [이메일](mailto:?subject=%EC%A0%9C%EB%AF%B8%EB%82%98%EC%9D%B4%20%EB%A1%9C%EB%B3%B4%ED%8B%B1%EC%8A%A4%202%3A%20%EB%A1%9C%EB%B4%87%EC%97%90%20%EC%A0%84%EC%8B%A0%20%EC%A7%80%EB%8A%A5%EC%9D%84%20%EA%B5%AC%ED%98%84%ED%95%98%EB%8B%A4&body=구글코리아 블로그에서 게시글 보기%0A%0A%EC%A0%9C%EB%AF%B8%EB%82%98%EC%9D%B4%20%EB%A1%9C%EB%B3%B4%ED%8B%B1%EC%8A%A4%202%3A%20%EB%A1%9C%EB%B4%87%EC%97%90%20%EC%A0%84%EC%8B%A0%20%EC%A7%80%EB%8A%A5%EC%9D%84%20%EA%B5%AC%ED%98%84%ED%95%98%EB%8B%A4%0A%0A발끝부터 손끝까지 — 구글은 복잡한 과제를 폭넓게 수행할 수 있도록 로봇에 지능적인 전신 제어(whole-body control)와 정밀한 조작 능력, 그리고 협업 능력을 학습시키고 있습니다.%0A%0Ahttps://blog.google/intl/ko-kr/company-news/technology/gemini-robotics-2/)
- 

---

article text

지난 수십 년 동안 구글은 로봇이 자연스럽게 우리의 일상에 스며들어 사람을 돕는 세상을 꿈꿔왔습니다. 그리고 이제, 그 비전이 현실에 한층 더 가까워졌습니다.

현재 대부분의 로봇은 제한적이고 반복적인 작업을 수행하도록 사전에 프로그래밍되거나 원격으로 조종됩니다. 스스로 학습하거나 예측하기 어려운 환경에 유연하게 적응하는 능력이 부족하기 때문입니다. 또한 하나의 로봇이 습득한 기술을 다른 형태의 로봇에 적용하는 일도 매우 어렵습니다. 다양한 형태와 크기의 로봇이 복잡한 과제를 대규모로 수행하려면, 안전하게 작업을 완수할 수 있도록 스스로 판단하고 행동하며 주변과 상호작용할 수 있는 능력을 갖춘 AI 모델이 필요합니다.

구글은 [제미나이 로보틱스(Gemini Robotics)](https://deepmind.google/models/gemini-robotics/)를 통해 제미나이의 멀티모달 이해 능력이 현실 세계에서 실제 행동으로 이어질 수 있음을 선보인 바 있습니다. 그리고 오늘, 환경에 적응하는 차세대 로봇을 구현하는 핵심 지능 모델인 ‘제미나이 로보틱스 2(Gemini Robotics 2)’를 소개합니다. 첫걸음을 내딛는 이번 비약적인 발전을 통해 지능형 전신 제어, 고도화된 정교한 손놀림, 그리고 다중 로봇 협업이 가능해질 전망입니다.

제미나이 로보틱스 2는 로봇이 모든 움직임을 지능적으로 계획하여 더욱 다양한 작업을 수행할 수 있게 합니다. 예를 들어, 휴머노이드 로봇은 걷고, 앉고, 몸을 굽히거나 뻗고, 물체를 조작해 어질러진 방을 정리할 수 있습니다. 또한 다른 로봇과 협력해 작업을 더 빠르게 완료할 수도 있습니다. 이러한 신체 지능은 기기 자체(온디바이스)에서 로컬로 실행할 수 있으며, 단 몇 시간 만에 전혀 새로운 형태의 로봇에도 완벽히 적응합니다.

구글은 다음과 같은 세 가지 고성능 모델을 통해 이러한 기능을 구현하고 있습니다:

- 제미나이 로보틱스 2(Gemini Robotics 2): 시각 및 언어 입력을 모터 제어 신호로 변환해 로봇이 행동할 수 있도록 하는 구글의 가장 진보된 시각-언어-행동(VLA, Vision-Language-Action) 모델입니다. 이 모델은 발끝부터 손끝까지 휴머노이드 전신은 물론, 기타 양팔 로봇도 제어할 수 있습니다. 또한 양손과 그리퍼(gripper) 모두에서 한층 더 진화한 정교한 조작 능력을 선보입니다
- 제미나이 로보틱스 ER 2(Gemini Robotics ER 2): 구글의 가장 뛰어난 체화 추론(ER, Embodied Reasoning) 모델입니다. 에이전트 역할을 수행하는 시각-언어 모델(VLM, Vision-Language Model)로, 로봇이 사람과 소통하고 물리적 환경을 이해하며 몇 분 동안 지속되는 다단계 작업을 계획할 수 있도록 지원합니다. 또한 여러 로봇이 하나의 팀으로 협력해 작업을 수행하는 기능도 새롭게 도입되었습니다.
- 제미나이 로보틱스 온-디바이스 2(Gemini Robotics On-Device 2): 로봇 기기에서 로컬로 실행되도록 최적화된 가장 효율적인 VLA 모델입니다. 이 모델은 단 몇 시간 분량의 데이터만으로 완전히 새로운 로봇 형태에 빠르게 적응할 수 있습니다.

?lit$222422372$

?lit$222422372$

?lit$222422372$?lit$222422372$

?lit$222422372$

?lit$222422372$

?lit$222422372$

?lit$222422372$

![제미나이 로보틱스 2가 동일한 모델 체크포인트를 사용해 샤파웨이브(SharpaWave) 손을 장착한 앱트로닉 아폴로 2(Apptronik Apollo 2), 인스파이어(Inspire) 손을 장착한 아폴로 2, 로보티크 그리퍼(Robotiq gripper)를 장착한 프랑카 듀오(Franka Duo) 등 세 가지 서로 다른 형태의 로봇에서 다양한 전신 제어 및 정밀 조작을 수행한 결과, 각 막대 그래프는 동일한 기술 범주에 속한 여러 작업의 평균 성공률을 나타냅니다. 다지형(multi-finger) 손가락 작업의 경우에는 작업별 성능을 별도로 표시했습니다. 제미나이 로보틱스 2는 전신 제어 작업과 그리퍼 기반의 정밀 조작 작업에서는 높은 성공률을 달성했지만, 다지형 손가락을 활용한 정교한 조작은 여전히 해결해야 할 도전 과제로 남아 있습니다.](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-robotics-2__general-whole-.width-100.format-webp.webp)

?lit$222422372$?lit$222422372$?

?lit$222422372$

?lit$222422372$

?lit$222422372$

제미나이 로보틱스 2가 동일한 모델 체크포인트를 사용해 샤파웨이브(SharpaWave) 손을 장착한 앱트로닉 아폴로 2(Apptronik Apollo 2), 인스파이어(Inspire) 손을 장착한 아폴로 2, 로보티크 그리퍼(Robotiq gripper)를 장착한 프랑카 듀오(Franka Duo) 등 세 가지 서로 다른 형태의 로봇에서 다양한 전신 제어 및 정밀 조작을 수행한 결과, 각 막대 그래프는 동일한 기술 범주에 속한 여러 작업의 평균 성공률을 나타냅니다. 다지형(multi-finger) 손가락 작업의 경우에는 작업별 성능을 별도로 표시했습니다. 제미나이 로보틱스 2는 전신 제어 작업과 그리퍼 기반의 정밀 조작 작업에서는 높은 성공률을 달성했지만, 다지형 손가락을 활용한 정교한 조작은 여전히 해결해야 할 도전 과제로 남아 있습니다.

?lit$222422372$?

?

?lit$222422372$?lit$222422372$

?lit$222422372$

?lit$222422372$

?lit$222422372$

?lit$222422372$

![제미나이 로보틱스 2가 동일한 모델 체크포인트를 사용해 샤파웨이브(SharpaWave) 손을 장착한 앱트로닉 아폴로 2(Apptronik Apollo 2), 인스파이어(Inspire) 손을 장착한 아폴로 2, 로보티크 그리퍼(Robotiq gripper)를 장착한 프랑카 듀오(Franka Duo) 등 세 가지 서로 다른 형태의 로봇에서 다양한 전신 제어 및 정밀 조작을 수행한 결과, 각 막대 그래프는 동일한 기술 범주에 속한 여러 작업의 평균 성공률을 나타냅니다. 다지형(multi-finger) 손가락 작업의 경우에는 작업별 성능을 별도로 표시했습니다. 제미나이 로보틱스 2는 전신 제어 작업과 그리퍼 기반의 정밀 조작 작업에서는 높은 성공률을 달성했지만, 다지형 손가락을 활용한 정교한 조작은 여전히 해결해야 할 도전 과제로 남아 있습니다.](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-robotics-2__multi-finger-d.width-100.format-webp.webp)

?lit$222422372$?lit$222422372$?

?lit$222422372$?

?lit$222422372$?lit$222422372$

?lit$222422372$

?lit$222422372$

?lit$222422372$

?lit$222422372$

![제미나이 로보틱스 2가 동일한 모델 체크포인트를 사용해 샤파웨이브(SharpaWave) 손을 장착한 앱트로닉 아폴로 2(Apptronik Apollo 2), 인스파이어(Inspire) 손을 장착한 아폴로 2, 로보티크 그리퍼(Robotiq gripper)를 장착한 프랑카 듀오(Franka Duo) 등 세 가지 서로 다른 형태의 로봇에서 다양한 전신 제어 및 정밀 조작을 수행한 결과, 각 막대 그래프는 동일한 기술 범주에 속한 여러 작업의 평균 성공률을 나타냅니다. 다지형(multi-finger) 손가락 작업의 경우에는 작업별 성능을 별도로 표시했습니다. 제미나이 로보틱스 2는 전신 제어 작업과 그리퍼 기반의 정밀 조작 작업에서는 높은 성공률을 달성했지만, 다지형 손가락을 활용한 정교한 조작은 여전히 해결해야 할 도전 과제로 남아 있습니다.](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-robotics-2__gripper-dexter.width-100.format-webp.webp)

?lit$222422372$?lit$222422372$?

?lit$222422372$?

?lit$222422372$

추론 모델인 제미나이 로보틱스 ER 2는 현재 [구글 AI 스튜디오(Google AI Studio)](https://aistudio-preprod.corp.google.com/prompts/new_chat?model=gemini-robotics-er-2-preview) 및 [제미나이 엔터프라이즈 에이전트 플랫폼(Gemini Enterprise Agent Platform)](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/gemini-robotics-er-2-preview-info)의 프라이빗 프리뷰를 통해 이용하실 수 있습니다. VLA 및 온-디바이스 모델은 얼리 액세스 파트너에게 제공됩니다[(→신청하기)](https://docs.google.com/forms/d/1sM5GqcVMWv-KmKY3TOMpVtQ-lDFeAftQ-d9xQn92jCE/viewform?ts=67cef986&edit_requested=true). 이 모델들을 하드웨어에 적용하는 방법은 [개발자 블로그](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-robotics-er-2/)에서 확인해 보세요.

### 움직이는 휴머노이드: 전신 작업 수행

세상은 사람의 움직임에 맞춰 설계되어 있습니다. 우리는 좁고 복잡한 공간에서 팔을 뻗고, 몸을 굽히며, 균형을 유지해야 합니다. 이전 모델이 탁자 위 작업을 수행하기 위해 휴머노이드의 상체만을 제어했다면, 제미나이 로보틱스 2는 피지컬 AI(Physical AI)의 범위를 전신 움직임까지 확장했습니다.

이번에 처음으로 제미나이 로보틱스 2는 휴머노이드의 전신을 제어해 이용자의 지시를 지능적인 전신 움직임으로 구현할 수 있게 되었습니다. 예를 들어 [앱트로닉의 아폴로 2](https://apptronik.com/apollo/apollo-2) 휴머노이드 로봇에게 “물뿌리개를 맨 아래 선반의 초록색 통에 넣어 줘”라고 지시하면 아폴로 2는 이를 이해한 뒤 탁자로 이동해 물뿌리개를 집어들고, 선반까지 걸어가 지정된 위치에 정확히 놓아둡니다. 물론 로봇의 이동 속도는 앞으로 더 개선해야 할 부분이 남아 있지만, 이번 발전은 전신 움직임이 필요한 복잡한 현실 세계의 작업을 수행하기 위한 중요한 진전입니다.

?lit$222422372$

### 손과 그리퍼로 구현하는 정밀한 조작 능력

로봇이 가정과 사업장에서 실질적으로 활용되기 위해서는 정밀한 조작 능력이 필수적입니다. 제미나이 로보틱스 2는 손과 그리퍼 등 다양한 말단 장치(end effector)를 정교하게 제어해 로봇의 활용 범위를 한층 넓혀줍니다.

이제 제미나이 로보틱스 2 모델은 아폴로 2 로봇에 장착된 샤파웨이브 5지 22 자유도 손(five-fingered, 22 degree-of-freedom SharpaWave hand)을 제어해 매듭을 묶거나 지퍼백을 잠그는 등 섬세한 작업을 수행할 수 있습니다. 또한 [프랑카 F3 듀오](https://franka.de/fr3-duo)에 장착된 표준 2지 평행 그리퍼(two-fingered parallel grippers)를 제어해 촘촘한 포장 작업과 같은 복잡하고 정밀한 작업도 수행할 수 있습니다.구글은 인간 수준의 정밀한 조작 능력을 구현하기 위해 정밀도와 속도를 지속적으로 향상시키고 있습니다.

?lit$222422372$

### 에이전트 추론과 다중 로봇 협업으로 더욱 고도화된 작업 수행

현실 세계의 대부분의 작업은 여러 단계를 거쳐 오랜 시간 동안 수행됩니다. 이러한 복잡한 작업을 처리하기 위해 체화 추론 모델인 제미나이 로보틱스 ER 2는 로봇의 상위 의사결정 역할을 수행하며, 이용자의 지시를 이해하고 사람과 소통합니다. 또한 주변 환경을 관찰해 작업을 완료하는 데 필요한 단계를 계획하고, VLA 모델과 협력해 각 동작을 수행하며, 작업이 완료될 때까지 진행 상황을 지속적으로 추적합니다. 이러한 구조를 통해 로봇은 복잡한 다단계 작업을 수행하고, 중간 단계에서 문제가 발생하면 스스로 수정하며, 새로운 환경과 목표에도 유연하게 대응할 수 있습니다.

이번 업데이트를 통해 로봇은 수분에 걸쳐 수백 번의 의사결정이 필요한 긴 작업도 더욱 안정적으로 수행할 수 있게 되었습니다. 제미나이 로보틱스 ER 2는 이제 작업의 시작과 끝을 이해하고 핵심 사건이 발생하는 순간도 정확하게 인식할 수 있어 작업 진행 상황을 더욱 효과적으로 파악합니다.

또한 다중 로봇 협업 기능도 새롭게 선보입니다. 이를 통해 서로 다른 유형의 로봇이 서로 소통하며 협력해, 하나의 로봇만으로는 수행하기 어려운 복잡한 워크플로우도 함께 처리할 수 있습니다.

?lit$222422372$

### 어떤 로봇에도 빠르게 적응하는 온디바이스 모델

많은 로봇 애플리케이션은 네트워크 지연이나 인터넷 연결 없이도 작동해야 합니다. 제미나이 로보틱스 온디바이스 2는 이러한 환경을 고려해 개발된 모델로, 로봇 기기에서 직접 실행되도록 최적화된 구글의 가장 효율적인 VLA 모델입니다 .

이 모델은 기본적으로 다양한 형태를 지원하며, [제미나이 로보틱스 1.5](https://deepmind.google/blog/gemini-robotics-15-brings-ai-agents-into-the-physical-world/)의 고도화된 '동작 이전(motion transfer)' 기술을 계승했습니다. 이제 일반적으로 200개 미만의 예시와 단 몇 시간의 학습만으로 새로운 양팔 로봇 형태에 빠르게 적응할 수 있습니다. 아래에서 볼 수 있듯이 덱스메이트(Dexmate), SO101, 트로센(Trossen) 등 형태와 센서 구성, 자유도가 크게 다른 로봇에서도 다양한 작업을 안정적으로 수행합니다 .

?lit$222422372$?lit$222422372$

?lit$222422372$?lit$222422372$

?lit$222422372$Sorry, your browser doesn't support embedded videos, but don't worry, you can [download it](https://storage.googleapis.com/gweb-uniblog-publish-prod/original_videos/gdm_robotics_six-grid_270726.webm) and watch it with your favorite video player!?lit$222422372$

?lit$222422372$?lit$222422372$???

??lit$222422372$

?lit$222422372$

?lit$222422372$?lit$222422372$

(상단 왼쪽) 책장에 책을 꽂는 덱스메이트, (상단 중앙) 체스판 위 말을 옮기는 트로센, (상단 오른쪽) CAPTCHA를 풀기 위해 마우스를 클릭하는 덱스메이트, (하단 왼쪽) 커피잔을 다루는 트로센, (하단 중앙) 식기세척기에 그릇을 넣는 덱스메이트, (하단 오른쪽) 전자 부품을 분류하는 SO101

?lit$222422372$?

?lit$222422372$?

### 안전하고 책임감 있는 로보틱스를 위한 노력

안전은 구글 로봇 연구를 이루는 핵심 원칙입니다. 로봇의 물리적 역량이 더욱 발전함에 따라 구글은 엔드-투-엔드(end-to-end) 안전성과 AI 정렬(alignment)을 확보하기 위해 지속적으로 노력하고 있습니다. 이를 위해 매 모델 출시마다 기존의 물리적 안전치와 강력한 AI 안전 프레임워크를 결합한 다층적인 접근 방식을 적용해 왔습니다.

제미나이 로보틱스 2는 특히 현실 세계의 불확실한 환경을 탐색하고 사람과 안전하게 협업할 수 있도록 로봇 안전 기술을 한층 발전시켰습니다.

또한 구글은 에이전트 안전 오케스트레이션(agentic safety orchestration)과 불확실성 해소 능력을 평가하기 위한 새로운 벤치마크인 [아시모프- 에이전틱(ASIMOV-Agentic](https://huggingface.co/datasets/google/asimov_agentic/blob/main/README.md))을 선보입니다. 예를 들어, 체화된 추론 에이전트가 VLA의 안전하지 않은 툴 호출(tool calls)을 거부하는 능력을 측정합니다. 또한 작업 수행 가능 여부를 예측하고 확신이 없을 경우 사람의 개입을 선제적으로 요청하는 능력도 함께 평가합니다.

향상된 체화 추론 능력을 갖춘 제미나이 로보틱스 ER 2는 안전 제약 준수와 사람 근접성(human proximity) 벤치마크에서 지금까지 구글이 개발한 로봇 모델 가운데 가장 뛰어난 안전성을 제공합니다. 사람의 접근을 더욱 정확하게 감지하고, 필요한 경우 안전 관련 툴을 실행하며, 사람이 지나치게 가까이 접근하면 로봇을 안전하게 정지시킬 수 있습니다. 이는 사람과 로봇이 함께 작업하기 위한 협업 안전 표준에서 중요한 요구사항입니다. 자세한 내용은 [제미나이 로보틱스 2: 안전 기술 보고서(Gemini Robotics 2: Safety Technical Report)](https://storage.googleapis.com/deepmind-media/gemini-robotics/Gemini-Robotics-2-Safety.pdf)에서 확인하실 수 있습니다.

### 범용 피지컬 AI를 향한 여정

제미나이 로보틱스 2는 물리적 세계에서 인공일반지능(AGI, Artificial General Intelligence)을 구현하기 위한 중요한 이정표입니다. 로봇의 진정한 잠재력을 실현하기 위해서는 단일 작업 자동화를 넘어 범용 지능(general-purpose intelligence)으로 나아가야 합니다. 구글은 이러한 핵심 지능을 구축함으로써, 물리적 세계에서도 AI가 사람과 함께 협력하며 복잡한 문제를 해결할 수 있는 미래를 만들어가고자 합니다.

### 제미나이 로보틱스 2 알아보기

- [구글 AI 스튜디오에서 체험하기](https://aistudio-preprod.corp.google.com/prompts/new_chat?model=gemini-robotics-er-2-preview)
- [제미나이 로보틱스 ER 2 모델 카드](https://deepmind.google/models/model-cards/gemini-robotics-er-2/)
- [제미나이 로보틱스 온디바이스 2 모델 카드](https://deepmind.google/models/model-cards/gemini-robotics-on-device-2/)
- [개발자 블로그에서 자세히 알아보기](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-robotics-er-2/)
- [트러스티드 테스터 프로그램(Trusted Tester Program) 신청하기](https://docs.google.com/forms/d/1sM5GqcVMWv-KmKY3TOMpVtQ-lDFeAftQ-d9xQn92jCE/viewform?ts=67cef986&edit_requested=true)
- [제미나이 엔터프라이즈 에이전트 플랫폼에서 체험하기](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/gemini-robotics-er-2-preview-info)

관련 키워드:
