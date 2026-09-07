---
title: "HiVLA: A Visual-Grounded-Centric Hierarchical Embodied Manipulation System (프로젝트 페이지)"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/yang-2026-hivla-project-page.md
raw_filename: "yang-2026-hivla-project-page.md"
source_collection: external
author: "Tianshuo Yang 외"
url: "https://tianshuoy.github.io/HiVLA-page/"
publisher: "tianshuoy.github.io"
tags: [physical-ai, vla, manipulation, robot-learning]
figures:
  - id: fig01
    file: assets/yang-2026-hivla-project-page/fig01.jpg
    raw: raw/articles/yang-2026-hivla-project-page-figures/fig01.jpg
    caption: "티저 도식. 왼쪽은 지시문과 1920×1080 원본 이미지를 VLM이 받아 384×384 크롭 두 장을 만들고 DiT action expert가 action 시퀀스를 내는 구성이고, 오른쪽은 RoboTwin 9개 과제 레이더 차트와 전체 평균 막대 그래프다 (6846×1654)"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/yang-2026-hivla-project-page/fig02.png
    raw: raw/articles/yang-2026-hivla-project-page-figures/fig02.png
    caption: "파이프라인 도식. VLM이 subtask 문장과 bounding box를 내고, DiT 블록이 self-attention 뒤에 global 이미지, local 이미지, 언어를 차례로 받는 cross-attention 세 층을 통과시킨다 (2881×1051)"
    strategy: fetched
    curated: true
  - id: fig03
    file: assets/yang-2026-hivla-project-page/page-full.png
    raw: raw/articles/yang-2026-hivla-project-page-figures/page-full.png
    caption: "프로젝트 페이지 전체 스크린샷"
    strategy: screenshot
    curated: false
---

## 한 줄 요약 (One-line Summary)

HiVLA 논문의 공식 프로젝트 페이지로, 초록과 파이프라인 도식과 RoboTwin 9개 과제 성공률 표만 싣는 짧은 소개 페이지이며 코드는 공개 예정 상태다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | HiVLA: A Visual-Grounded-Centric Hierarchical Embodied Manipulation System |
| 저자 | Tianshuo Yang과 Guanyu Chen 공동 1저자 외 9인 |
| 소속 | HKU, Shanghai AI Lab, SJTU, CUHK |
| URL | https://tianshuoy.github.io/HiVLA-page/ |
| 논문 링크 | arXiv 2604.14125 |
| 코드 | 공개 예정 (Coming Soon) |
| 구성 | 저자 정보, 티저 도식, 초록, 파이프라인 도식, 결과 표, BibTeX |
| 수집 tier | chrome (jina는 403) |

## 2. 주요 기여 (Key Contributions)

프로젝트 페이지가 전달하는 내용은 논문 초록과 대표 도식 두 장, 그리고 시뮬레이션 결과 표 하나다. 페이지 고유의 새 정보는 없고 논문의 핵심만 추린 형태다.

1. **티저 도식.** 지시문과 1920×1080 원본 이미지가 VLM으로 들어가고, VLM이 만든 384×384 크롭 두 장이 DiT action expert로 전달되어 action 시퀀스가 나오는 흐름을 한 장에 담았다. 오른쪽에는 RoboTwin 9개 과제 레이더 차트와 π0, H-RDT, Ours w/o Skill, Ours의 전체 평균 막대 그래프가 붙어 있다.
2. **파이프라인 도식.** VLM이 subtask와 bounding box를 내는 (a) 부분과, DiT 블록 안에서 global 이미지, local 이미지, 언어 순으로 cross-attention이 이어지는 (b) 부분으로 나뉜다. 논문 Figure 2와 같은 그림이며 웹용 원본이라 해상도가 더 높다.
3. **결과 표.** RoboTwin 시뮬레이터 9개 과제 성공률을 Easy 4개와 Hard 5개로 나눠 싣는다. 논문 Table 1과 같은 수치다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

페이지의 방법 설명은 초록과 파이프라인 캡션 두 곳에 압축돼 있다.

### 3.1 초록이 말하는 구조

end-to-end VLA를 좁은 제어 데이터로 fine-tuning하면 기반 VLM에서 물려받은 추론 능력이 손상된다는 문제 제기로 시작한다. HiVLA는 상위 의미 계획과 하위 모터 제어를 명시적으로 분리해 이 절충을 푼다.

상위에서는 VLM planner가 과제 분해와 visual grounding을 수행해 구조화된 계획을 만든다. 계획은 subtask 지시문 하나와 정확한 대상 bounding box 하나로 구성된다. 하위에서는 flow matching 기반 DiT action expert가 그 계획을 물리 action으로 옮기며, 여기에 cascaded cross-attention이 들어간다.

### 3.2 파이프라인 캡션이 말하는 조건 주입

캡션은 DiT 블록이 잡음 섞인 action latent를 세 조건에 순차로 조건화한다고 적는다. global 시각 문맥, 위치 정보를 담은 국소 특징, 언어 토큰 순서다. bounding box는 고해상도 대상 크롭을 뽑는 데 쓰인다.

분리 구조의 이점으로는 두 가지를 든다. VLM의 zero-shot 추론 능력이 보존되고, 두 구성 요소를 각각 독립적으로 개선할 수 있다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

페이지가 싣는 유일한 수치는 RoboTwin 시뮬레이터 결과 표다.

| 구분 | 과제 | π0 | π0.5 | StarVLA | H-RDT | Ours w/o Skill | Ours |
|---|---|---|---|---|---|---|---|
| Easy | Click Bell | 45% | 65% | 71% | 88% | 95% | 94% |
| Easy | Click Clock | 53% | 66% | 83% | 93% | 97% | 97% |
| Easy | Press Stapler | 60% | 69% | 63% | 89% | 98% | 97% |
| Easy | Lift Pot | 59% | 21% | 18% | 92% | 96% | 96% |
| Easy | 평균 | 54.3% | 55.3% | 58.8% | 90.5% | 96.5% | 96.0% |
| Hard | Place Shoe | 75% | 68% | 61% | 88% | 94% | 95% |
| Hard | Move Stapler | 15% | 17% | 15% | 34% | 42% | 60% |
| Hard | Stamp Seal | 61% | 42% | 25% | 43% | 68% | 76% |
| Hard | Stack 3 Blocks | 1% | 1% | 16% | 20% | 26% | 37% |
| Hard | Click 3 Bells | 41% | 54% | 66% | 88% | 92% | 98% |
| Hard | 평균 | 38.6% | 36.4% | 36.6% | 54.6% | 64.4% | 73.2% |
| 전체 | 평균 | 45.6% | 44.8% | 46.4% | 70.6% | 78.7% | 83.3% |

표 아래 설명은 HiVLA가 long-horizon 과제와 시각적으로 까다로운 과제에서 특히 앞선다고 적고, 최고 성적은 굵게 두 번째는 밑줄로 표시했다고 밝힌다. 웹 표에서는 서식이 제거되어 굵기와 밑줄 구분이 남아 있지 않다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

페이지는 한계를 다루지 않는다. 자료 자체의 제약은 다음과 같다.

- 실제 로봇 결과, robustness 실험, ablation, VLM planner 평가가 모두 빠져 있다. 논문 본문에만 있다.
- 시연 영상이 없다. 페이지에 embed된 video 요소가 하나도 없어 정지 이미지 두 장이 시각 자료의 전부다.
- 코드 링크가 자기 페이지로 되돌아오는 자리표시자 상태다.
- 발행 날짜 표기가 없다.

## 6. 관련 연구 (Related Work)

페이지는 관련 연구를 따로 정리하지 않고 결과 표의 비교 대상 이름만 노출한다. π0, π0.5, StarVLA, H-RDT 네 가지다. 이들의 배치와 계보는 논문 본문이 다룬다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| visual-grounded-centric | VLM이 낸 bounding box와 그로부터 잘라낸 고해상도 크롭을 상위와 하위를 잇는 주 인터페이스로 삼는 설계 관점 |
| cascaded cross-attention | DiT 블록 하나 안에서 global 이미지, 국소 이미지, 언어를 각각 별도의 cross-attention 층으로 순서대로 주입하는 구조 |
| Ours w/o Skill | subtask 문장 대신 전체 지시문을 그대로 조건으로 준 ablation 변형 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 티저 도식 (시스템 개요와 성공률 차트) | fetched | ★ wiki 권장 (architecture, result) |
| fig02 | 파이프라인 도식 (VLM 계획과 DiT 블록) | fetched | ★ wiki 권장 (method) |
| fig03 | 페이지 전체 스크린샷 | screenshot | (아카이브용) |
