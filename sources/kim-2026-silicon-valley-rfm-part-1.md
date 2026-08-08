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

## 한 줄 요약 (One-line Summary)

실리콘밸리 RFM(Robot Foundation Model) 스타트업들이 Pre-training부터 데이터 제작·평가까지 학습 전 과정을 직접 끌어안는 구조상의 이유와 휴머노이드 쪽에서 두드러지는 Full-stack 전략을 현지 업계 시각으로 정리한 연재 1편.

## 1. 자료 정보 (Document Information)

- 저자: Kyungyul Kim, Jiyoon Kim
- 발행: 2026-04-22, LinkedIn Pulse (한국어)
- 유형: 업계 동향 분석 연재의 1편 (Introduction), 약 4,300자
- 후속: 2편 "VLM & VLA란 무엇이며…"가 2026-08-07에 발행된 것이 페이지 하단에서 확인된다. 아직 수집하지 않았다.

## 2. 주요 기여 (Key Contributions)

논문이 아니라 업계 구조 해설이므로 기여는 기술이 아니라 관찰과 해석에 있다.

- LLM에서 VLM으로, 다시 로봇 동작(Action)까지 출력하는 VLA로 모델이 확장돼 온 흐름을 배경으로 깐다. 그 위에서 VLA와 World Model을 통합하는 World Action Model 연구가 실리콘밸리에서 활발하다고 전한다.
- RFM(VLA) 기업들의 실제 작동 방식을 PoC 중심으로 그린다. 산업 파트너와의 PoC로 데이터와 경험을 쌓고 거기서 얻은 레퍼런스를 투자 유치의 근거로 쓴다. 기술 비전을 먼저 제시하고 구현이 뒤따라가는 이 패턴을 현지에서는 "selling the roadmap" 혹은 "fake it till you make it"이라 부른다.
- 학습 전 과정을 내재화하는 배경을 노하우 보호, 오픈소스 기반 개발, 데이터 확보의 구조적 어려움 세 갈래로 짚는다 (상세는 3절).
- 이 협업에서 생기는 비대칭을 경고한다. 학습 노하우는 RFM 기업에만 쌓인다. 데이터와 환경을 내준 파트너 기업은 RFM 기업의 모델만 고도화시켜 줄 뿐 자기 역량을 축적하지 못한다.
- 하드웨어까지 직접 만드는 Full-stack 전략이 휴머노이드 분야에서 특히 강하다는 점과 그 이유를 다룬다.
- 기술의 실체와 마케팅으로 제시된 비전 사이 간극을 외부에서 판별하기 어렵다. 그래서 VC 투자 생태계에 정보 비대칭이 크게 작용한다는 진단으로 맺는다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

기술 아키텍처를 다루는 글이 아니라서 이 절은 글의 논리 구조를 정리한다. 전개는 등장 배경(LLM → VLM → VLA, World Action Model) → PoC 중심의 작동 방식 → 학습 내재화의 배경 → Full-stack 전략 → 정리 순이다.

학습 내재화의 세 배경:

- **노하우 보호** — 로드맵상 기술 스택과 실제 구현 사이에는 격차가 있다. RFM을 만들고 활용하는 방법, 특히 데이터를 어떤 비율로 섞는지 자체가 노하우라 유출을 꺼린다.
- **오픈소스 기반 개발** — 많은 경우 PaliGemma·LLaMA·SigLIP·Qwen·OpenVLA 같은 오픈소스 모델 위에 기술을 쌓는 방식이라 공개되면 로봇과 자체 제작 데이터만 있으면 생각보다 쉽게 재현될 수 있는 영역이다. 그래서 Open 진영과 Closed 진영이 공존하되 후자가 희소성을 이용한 기술 마케팅에서 유리한 위치를 잡는 구조가 만들어진다.
- **데이터 확보의 구조적 어려움** — LLM은 웹 서비스로 사용자 데이터를 자연스럽게 모으며 pre-training과 post-training을 반복할 수 있었다. 반면 VLA는 실제 산업 환경에서 로봇 하드웨어로 직접 취득한 데이터와 성공/실패 케이스가 있어야 의미 있는 로봇 지능이 된다. RFM 기업은 로봇이 적용될 산업 환경을 갖고 있지 않으므로 환경을 제공하는 기업과 PoC를 진행하며 그 과정에서 데이터를 직접 만들고 특정 Task에 맞는 모델을 학습·검증한다.

Full-stack 전략의 근거는 두 가지다. 하나는 Controller 표준화 문제다. 로봇마다 하드웨어 기업이 제공하는 Controller(SDK)를 RFM 모델에 맞게 커스터마이징해야 하는데 이를 표준화할 방법이 없다. 다른 하나는 부품 수급이다. 아시아권 조달과 모듈 단위 수급 후 미국 조립으로 다각화하면서 자사 모델에 최적화된 전용 Robot H/W SDK를 직접 개발한다. 저자들은 이 접근을 "RFM 학습에만 집중할 수 있는 환경"을 만들기 위한 전략으로 해석한다. 하드웨어 공급·SDK·학습 파이프라인·배포 인프라를 전부 내부화해 연구·개발 과정의 예외 변수를 줄이는 것이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크는 없다. 기억할 만한 결론은 이렇다.

- RFM 분야는 기술 스택·학습 노하우·하드웨어·데이터·배포 인프라가 맞물려 움직이는 복합 영역이다. 그래서 기술의 실체와 제시된 비전 사이 간극을 외부에서 판별하기 어렵다.
- AI 연구·개발 실무자조차 각 Physical AI 기업이 가진 기술의 본질과 성숙도를 가늠하기 어려운 영역이 있다. VC 투자 생태계에서는 정보 비대칭이 더 크게 작용한다.
- 파트너십 형태로 데이터와 환경만 제공하는 기업은 역량이 쌓이지 않는다 — Enterprise가 Robot Intelligence 영역에서 R&D와 오퍼링이 가능한지 판단하려면 기술의 실체를 구조적으로 이해해야 한다는 것이 연재의 출발 문제의식이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 연재 1편이라 VLM·VLA의 기술 개념 설명은 다음 편으로 미룬다. 2편이 이미 발행돼 있어 후속 수집 후보다.
- 기업 실명이나 구체 사례·수치가 없다. 관찰의 근거는 저자들의 현지 경험이다.
- "selling the roadmap" 같은 진단은 업계 전반의 경향 서술이라 개별 기업 평가에 그대로 옮겨 쓰기는 어렵다.

## 6. 관련 연구 (Related Work)

글이 직접 거명하는 오픈소스 기반 모델은 PaliGemma, LLaMA, SigLIP, Qwen, OpenVLA다. wiki 보유 자료와는 이렇게 이어진다.

- RT-2 — 글이 배경으로 깐 "VLM을 Action까지 확장한 VLA"라는 범주를 세운 논문
- GR00T N1 — 휴머노이드 RFM의 실제 사례. 데이터 확보 문제를 data pyramid로 푸는 접근이 이 글의 "데이터 확보의 구조적 어려움" 절과 맞물린다
- VLA bimanual survey (Sa 2026) — VLA 계보와 아키텍처 지형의 기술 측 레퍼런스
- World model 서베이 2종 (Li 2025, Hou 2026) — 글이 언급한 World Action Model 흐름의 학술 맥락
- 엥지유니버스 영상 — 같은 시기 VLA 연구사를 논문 축으로 훑는 자료라 이 글의 산업 축과 상보적

## 7. 용어집 (Glossary)

- **RFM (Robot Foundation Model)**: 로봇 제어를 위한 foundation model. 이 글에서는 VLA 기반 로봇 지능 모델을 만드는 기업군을 "RFM(VLA) 기업"으로 통칭한다.
- **VLA (Vision Language Action)**: 카메라 이미지와 자연어 명령을 입력받아 로봇 동작을 직접 출력하도록 VLM을 확장한 모델.
- **World Action Model**: VLA와 물리 환경을 생성하는 World Model을 통합하는 연구 방향. 글 기준으로 실리콘밸리에서 연구·개발이 활발하다.
- **PoC (Proof of Concept)**: 산업 파트너 환경에서의 검증 프로젝트. RFM 기업에게는 데이터 제작과 레퍼런스 확보의 통로다.
- **selling the roadmap**: 완성되지 않은 기술 비전을 선판매하고 구현이 뒤따라가는 실리콘밸리 마케팅 패턴. "fake it till you make it"과 같은 뜻으로 쓰였다.
- **Full-stack 전략**: 모델뿐 아니라 로봇 하드웨어·SDK·학습 파이프라인·배포 인프라까지 내부화하는 접근.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 기사 전체 페이지 스크린샷 | screenshot | (아카이브 전용) |
| fig02 | 커버 이미지 영역 크롭 — 로그인 모달에 가려짐 | crop | 부적합 |

기술 도식이 없는 기사다. 본문 이미지는 "PHYSICAL AI" 타이포그래피 커버 아트 하나뿐이다. 크롭본은 LinkedIn 로그인 모달에 가려져 있다. wiki에 임베드할 후보가 없어 figures는 전수 아카이브 기록으로만 남긴다.
