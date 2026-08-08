---
title: "[실리콘밸리 RFM 기술 및 현황] - 1편: RFM의 등장 배경과 실리콘밸리의 Robot Intelligence 스타트업의 현황"
type: article
year: 2026
category: physical-ai
source: kim-2026-silicon-valley-rfm-part-1.md
raw_path: raw/articles/kim-2026-silicon-valley-rfm-part-1.md
raw_filename: "kim-2026-silicon-valley-rfm-part-1.md"
source_collection: external
author: "Kyungyul Kim, Jiyoon Kim"
url: "https://www.linkedin.com/pulse/%EC%8B%A4%EB%A6%AC%EC%BD%98%EB%B0%B8%EB%A6%AC-rfm-%EA%B8%B0%EC%88%A0-%EB%B0%8F-%ED%98%84%ED%99%A9-1%ED%8E%B8-rfm%EC%9D%98-%EB%93%B1%EC%9E%A5-%EB%B0%B0%EA%B2%BD%EA%B3%BC-%EC%8B%A4%EB%A6%AC%EC%BD%98%EB%B0%B8%EB%A6%AC%EC%9D%98-robot-intelligence-kim-765oc/"
publisher: "LinkedIn"
tags: [physical-ai, vla, robot-learning, humanoid]
figures:
  - id: fig01
    file: assets/kim-2026-silicon-valley-rfm-part-1/page-full.png
    raw: raw/articles/kim-2026-silicon-valley-rfm-part-1-figures/page-full.png
    caption: "기사 전체 페이지 스크린샷 (아카이브용)"
    strategy: screenshot
    curated: false
  - id: fig02
    file: assets/kim-2026-silicon-valley-rfm-part-1/crop01.png
    raw: raw/articles/kim-2026-silicon-valley-rfm-part-1-figures/crop01.png
    caption: "커버 이미지 영역 크롭 — LinkedIn 로그인 모달에 가려져 임베드 부적합"
    strategy: crop
    curated: false
---

## 요약 (Summary)

실리콘밸리 RFM(Robot Foundation Model) 스타트업들이 왜 Pre-training부터 데이터 제작·평가까지 학습 전 과정을 직접 수행하는지, 왜 휴머노이드 쪽에서 하드웨어까지 내부화하는 Full-stack 전략이 강한지를 현지 업계 시각으로 정리한 LinkedIn 연재 1편이다 (Kyungyul Kim·Jiyoon Kim, 2026-04-22). 이 저장소의 physical-ai 자료 대부분이 논문·기술 문서인 것과 달리, 이 글은 같은 VLA 지형을 사업 구조와 투자 생태계 쪽에서 본다.

배경 서사는 간단하다. LLM이 VLM으로, VLM이 로봇 동작(Action)까지 출력하는 VLA로 확장됐다. 여기에 물리 환경을 생성하는 World Model을 통합하는 World Action Model 연구가 이어지고 있다.

## RFM 기업들의 작동 방식 (How RFM Startups Operate)

현재 RFM(VLA) 기업들은 모델 성능과 로봇 Action Task를 넓히기 위해 Pre-training·Post-training·데이터 제작·평가를 전부 직접 수행한다. 산업 파트너와의 PoC로 데이터와 경험도 쌓는다. PoC는 유상 계약일 수도 있고 레퍼런스 확보가 목적일 수도 있다. 여기서 얻은 레퍼런스가 투자 유치의 근거가 된다. 기술 비전을 먼저 제시하고 구현이 뒤따라가는 이 패턴을 현지에서는 "selling the roadmap" 혹은 "fake it till you make it"이라 부른다.

학습을 내재화하는 배경으로 글은 세 가지를 든다.

- 로드맵과 실제 구현 사이에 격차가 있고 데이터를 어떤 비율로 섞는지 자체가 노하우라 유출을 꺼린다.
- 개발이 대부분 PaliGemma·LLaMA·SigLIP·Qwen·OpenVLA 같은 오픈소스 모델 위에 쌓는 방식이라 공개되면 로봇과 자체 데이터만으로 생각보다 쉽게 재현될 수 있다. Open 진영과 Closed 진영이 공존하되 후자가 희소성 기반 기술 마케팅에서 유리해지는 구조다.
- LLM은 웹 서비스로 데이터가 자연스럽게 모이지만 VLA는 실제 산업 환경에서 로봇 하드웨어로 취득한 데이터와 성공/실패 케이스가 있어야 한다. RFM 기업은 그 산업 환경이 없어서 환경을 제공하는 기업과 PoC를 하며 데이터를 직접 만들고 특정 Task에 맞는 모델을 학습·검증한다.

저자들이 경고하는 지점이 여기다. 이런 협업에서 학습 노하우는 RFM 기업에만 쌓이고 데이터와 환경을 내준 파트너 기업은 상대 모델만 고도화시켜 줄 뿐 자기 역량을 축적하지 못한다.

## Full-stack 전략 (Full-stack Strategy)

일부 RFM 기업은 하드웨어까지 직접 제작한다. 이 경향은 휴머노이드 분야에서 특히 강하다. 로봇마다 하드웨어 기업의 Controller(SDK)를 RFM 모델에 맞게 커스터마이징해야 하는데 표준화가 안 된다. 부품은 아시아권에서 조달하고 모듈 단위로 받은 뒤 미국에서 조립하는 식으로 공급을 다각화한다. 여기에 자사 모델에 맞춘 전용 Robot H/W SDK도 직접 개발한다. 저자들은 이를 하드웨어 공급·SDK·학습 파이프라인·배포 인프라를 전부 내부화해 "RFM 학습에만 집중할 수 있는 환경"을 만드는 전략으로 해석한다.

## 이 자료의 쓰임과 한계 (Usage Notes)

RFM 분야는 기술 스택·학습 노하우·하드웨어·데이터·배포 인프라가 맞물린 복합 영역이다. 그래서 기술의 실체와 마케팅 비전 사이 간극을 외부에서 판별하기 어렵고 VC 투자 생태계에서는 정보 비대칭이 더 크게 작용한다고 저자들은 결론짓는다. 논문들이 말하지 않는 PoC 관행·데이터 접근권·파트너십 비대칭을 짚어 주는 것이 이 글의 쓰임새다.

다만 기업 실명이나 수치가 없는 경험 기반 관찰이라 개별 기업 평가에 그대로 옮겨 쓰기는 어렵다. 기술 개념 설명은 2편으로 미뤄져 있는데 2편(VLM & VLA 개념)이 2026-08-07에 발행된 것이 확인돼 후속 수집 후보다. 기술 도식이 없는 기사라 임베드한 그림은 없다.

## 관련 페이지 (Related Pages)

- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]] — 이 글이 배경으로 깐 VLA 범주를 세운 논문
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — 휴머노이드 RFM의 실제 사례. 데이터 확보 문제를 data pyramid로 푸는 접근이 이 글의 "데이터 확보의 구조적 어려움"과 맞물린다
- [[physical-ai/sa-2026-vision-language-action-models-for]] — VLA 아키텍처 지형의 기술 측 레퍼런스. 이 글의 산업 측 서술과 상보적
- [[physical-ai/li-2025-a-comprehensive-survey-on-world]] — 글이 언급한 World Action Model 흐름의 학술 맥락
- [[physical-ai/engiuniverse-2025-14-key-physical-ai-papers]] — 같은 VLA 연구사를 논문 축으로 훑는 한국어 자료
- [[overviews/physical-ai-overview]] — physical-ai 카테고리 허브
