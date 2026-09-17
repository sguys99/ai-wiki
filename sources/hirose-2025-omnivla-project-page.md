---
title: "OmniVLA: An Omni-Modal Vision-Language-Action Model for Robot Navigation"
type: article
year: 2025
category: physical-ai
raw_path: raw/articles/hirose-2025-omnivla-project-page.md
raw_filename: "hirose-2025-omnivla-project-page.md"
source_collection: external
author: "Noriaki Hirose, Catherine Glossop, Dhruv Shah, Sergey Levine"
url: "https://omnivla-nav.github.io/"
publisher: "omnivla-nav.github.io (UC Berkeley 프로젝트 페이지)"
fetched_at: "2026-09-17T21:32:44+0900"
extractor_tier: "chrome"
tags: [physical-ai, vla, mobile-robot, robot-dataset]
figures:
  - id: fig01
    file: assets/hirose-2025-omnivla-project-page/fig01.png
    raw: raw/articles/hirose-2025-omnivla-project-page-figures/fig01.png
    caption: "OmniVLA 구조도. 현재 이미지와 goal 이미지는 각각 SigLIP + DINOv2를 거치고, 2D goal pose는 projection 층을, 언어 프롬프트는 토크나이저를 거쳐 Llama 2 7B에 들어간다. goal 이미지와 pose와 언어 토큰은 attention 마스크로 무작위 마스킹되며, 0으로 채운 N개 자리 토큰의 출력이 action head를 통해 N step의 action이 된다"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/hirose-2025-omnivla-project-page/fig02.png
    raw: raw/articles/hirose-2025-omnivla-project-page-figures/fig02.png
    caption: "학습 데이터셋 표. GNM mixture, LeLaN mixture, Frodobots-2K, BDD-V 네 묶음의 플랫폼과 최고 속도, 사용 시간, action 라벨 종류와 주기, 지원 모달리티(언어, pose, egocentric 이미지, 위성), 환경이 정리되어 있다"
    strategy: fetched
    curated: true
  - id: fig03
    file: assets/hirose-2025-omnivla-project-page/page-full.png
    raw: raw/articles/hirose-2025-omnivla-project-page-figures/page-full.png
    caption: "프로젝트 페이지 전체 스크린샷. 상단 6,000픽셀까지 담겼다"
    strategy: screenshot
    curated: false
---

## 한 줄 요약 (One-line Summary)

OmniVLA 논문(arXiv 2509.19480, ICRA 2026)의 공식 프로젝트 페이지로, OpenVLA를 기반으로 2D goal pose, egocentric goal 이미지, 자연어 지시문(instruction) 세 모달리티와 그 조합으로 goal을 지정하는 navigation policy를 소개하고, 9,500시간 규모의 학습 데이터 구성과 6종의 실제 로봇 배포 영상을 정리한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | OmniVLA: An Omni-Modal Vision-Language-Action Model for Robot Navigation |
| 저자 | Noriaki Hirose (UC Berkeley, Toyota Motor North America), Catherine Glossop (UC Berkeley), Dhruv Shah (Princeton University), Sergey Levine (UC Berkeley) |
| 발표 | IEEE International Conference on Robotics and Automation (ICRA) 2026 |
| URL | https://omnivla-nav.github.io/ |
| 대응 논문 | arXiv 2509.19480 (2025년 9월). 논문 PDF는 아직 wiki에 없다 |
| 코드와 가중치 | https://github.com/NHirose/OmniVLA, Hugging Face `NHirose/omnivla-original` |
| 영상 | YouTube 발표 영상 (youtu.be/h9NgUQSJPQU) |
| 구성 | Abstract, Approach (Motivation, OmniVLA, Dataset), Experiments 6개 절, BibTeX |
| 템플릿 | nerfies 계열. 결과 절은 영상 carousel이라 정지 이미지는 구조도와 데이터셋 표 2장뿐이다 |

페이지 상단의 "More Research" 메뉴는 같은 그룹의 navigation 연구 계보를 나열한다: DVMPC, ExAug, ViNT, SACSoN, LeLaN, "Learning to Drive Anywhere with Model-Based Reannotation"(MBRA).

이름이 같은 다른 자료로 Jie 외(Country Garden Services, 2026)의 manipulation용 "OmniVLA-RL"이 있다. 저자와 문제 설정이 전혀 다른 별개 연구이며 wiki에서는 `jie-2026-omnivla-rl-a-vision-language-action-model-with`가 별도 페이지다.

## 2. 주요 기여 (Key Contributions)

페이지가 초록과 본문에서 밝히는 기여는 다음과 같다.

1. **omni-modal goal conditioning 학습 틀.** 대부분의 navigation policy가 한 가지 모달리티로만 학습되는 것과 달리, 2D pose, egocentric 이미지, 자연어 세 가지와 그 조합을 무작위 모달리티 융합(randomized modality fusion) 전략으로 함께 학습한다. 사용 가능한 데이터셋 풀이 넓어지고 policy가 기하, 의미, 시각 표현을 더 풍부하게 배운다.
2. **고용량 VLA backbone.** OpenVLA를 기반 모델로 써 VLM backbone의 인터넷 규모 지식과 cross-embodiment 로봇 데이터 fine-tuning에서 배운 표현을 활용한다. 학습에 없던 언어 지시문을 따르고 완전히 새로운 모달리티에도 적응한다고 밝힌다.
3. **모달리티 불균형 대응.** 학습 시 modality dropout, 추론 시 modality masking으로 policy가 주어진 모든 goal 모달리티에 attention하고 모든 데이터셋에서 cross-modal goal 표현을 배우게 한다.
4. **성능 주장.** unseen 환경 일반화, 희소 모달리티에 대한 견고성, 새로운 자연어 지시문 추종에서 모달리티별 specialist 기준선을 앞선다. 새 모달리티와 과제로 fine-tuning하는 유연한 foundation을 제공한다고 주장한다. 구체 수치는 페이지에 없고 논문에 있다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 동기

사람은 언어 지시, 공간 좌표, 시각 참조 같은 서로 다른 goal 지정을 유연하게 해석하고 조합해 목적지에 간다. 반면 기존 로봇 navigation policy는 한 모달리티로만 학습되어 여러 형태의 goal 지정이 자연스럽고 상호 보완적인 실세계 상황에 적응하기 어렵다. OmniVLA는 세 모달리티를 동시에 배우게 해 과제의 기하, 시각, 의미 정보를 더 풍부하게 이해하는 navigation foundation model을 목표로 한다. 사용자 관점에서는 목표 pose를 주면서 "어떻게" 갈지를 언어로 덧붙이는 식으로 여러 모달리티를 함께 쓸 수 있다.

### 3.2 모델 구조 (fig01)

| 입력 | 인코더 | 비고 |
|---|---|---|
| 현재 이미지 | SigLIP + DINOv2 | 항상 주어지는 토큰 |
| goal 이미지 | SigLIP + DINOv2 | attention 마스크로 무작위 마스킹 대상 |
| 2D goal pose | projection 층 | 무작위 마스킹 대상 |
| 언어 프롬프트 | 토크나이저 | 무작위 마스킹 대상 |
| N step 자리 토큰 | 0으로 채움 | 출력이 action head를 거쳐 N step의 action이 된다 |

backbone은 Llama 2 7B이며, 이는 OpenVLA의 구성(Llama 2 7B + SigLIP/DINOv2 융합 시각 인코더)을 그대로 이어받은 것이다. 구조도에는 goal 이미지, pose, 언어의 세 goal 토큰 묶음이 "randomly masked tokens by attention mask"로 표시되어 있다. 즉 학습 중 modality dropout이 attention 마스크로 구현되고, 추론 시 없는 모달리티도 같은 방식으로 가린다.

### 3.3 데이터셋 (fig02)

학습 코퍼스는 10개 플랫폼에서 모은 9,500시간이며 사람이 수집한 데이터도 포함한다. 페이지 표의 네 묶음은 다음과 같다.

| 데이터셋 | 플랫폼 | 최고 속도 | 사용 시간 | action 라벨 | 주기 | 모달리티 | 환경 |
|---|---|---|---|---|---|---|---|
| GNM mixture | 6개 플랫폼 | 0.5~5.0 m/s | 62.0시간 | raw | 3.0 Hz | pose, egocentric 이미지 | off-road, 사무실, 인도 |
| LeLaN mixture | 3개 플랫폼 | 0.5~1.0 m/s | 128.7시간 | NoMaD 합성 | 3.0 Hz | 언어, pose (모두 합성 표시) | 사무실, 가정, 인도 |
| Frodobots-2K | ERZ | 1.0 m/s | 700시간 | MBRA 합성 | 3.0 Hz | pose, egocentric 이미지, 위성 | 인도 |
| BDD-V | 승용차 | 20.0 m/s | 8,680시간 | MBRA 계열 재주석 | 1.0 Hz | pose, egocentric 이미지 | 도로 |

- **GNM mixture**는 GO Stanford4, HuRoN(SACSoN), RECON, SCAND, CoryHall, TartanDrive, Seattle 7개 공개 데이터셋의 혼합이다.
- **LeLaN mixture**는 로봇 데이터와 비로봇 데이터를 함께 써 언어 조건 navigation policy를 배운 선행 연구의 산출물로, 목표 물체를 향한 counterfactual action을 모델 기반으로 생성하고 VLM 추론으로 언어 프롬프트를 붙인 것이다. OmniVLA는 GO Stanford2, GO Stanford4, HuRoN, HumanWalking, YouTube 영상에 대해 공개된 합성 action 명령과 언어 프롬프트를 쓴다. HumanWalking과 YouTube 데이터는 LeLaN 프로젝트 페이지에서 제공된다.
- **Frodobots-2K**는 대규모 수집이라 노이즈가 많아 MBRA로 생성한 합성 action을 쓴다.
- **BDD-V**는 자율주행 차량 데이터라 소형 로봇과 embodiment 격차가 커서 기존 재주석 방법을 쓸 수 없다. 그래서 재주석 모델을 따로 학습해 합리적인 합성 action을 만들고 MBRA와 비슷한 방식으로 학습에 쓴다.
- 마지막으로 새로운 언어 도메인 적응력을 평가하기 위해 CAST 데이터셋으로 OmniVLA를 fine-tuning한다.

표의 사용 시간을 합하면 약 9,571시간으로 본문의 "9,500시간"과 일치하며, BDD-V가 전체의 약 91%를 차지한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

페이지의 결과 절은 모두 실제 로봇 배포 영상이며 수치 표는 없다. 여섯 가지 실험 설정을 정리한다.

| 실험 | 로봇 | 설정 | 페이지의 주장 |
|---|---|---|---|
| 언어 조건 navigation (out-of-distribution 프롬프트) | FrodoBots, ERZ | 학습 프롬프트는 "move toward X" 형태인데, 이동 방법과 목표 위치를 함께 지시하는 학습 외 프롬프트를 준다 | 학습 분포 밖 지시문을 따른다 |
| 언어 조건 navigation (in-distribution 프롬프트) | FrodoBots, ERZ | 학습 분포 안 프롬프트 | 출발점과 목표 물체 사이의 장애물과 충돌하지 않는다 |
| 언어 조건 navigation (cross-embodiment) | Unitree GO1 사족보행, Vizbot (Roomba 기반 프로토타입) | 실내외, 서로 다른 카메라 | 가장 어려운 언어 조건 과제에서도 goal에 도달한다 |
| 멀티모달 조건 navigation (언어 + 2D pose) | (명시 없음) | 10개 환경에서 2D goal pose("어디로")와 행동 언어 지시("어떻게")를 함께 지정 | 여러 goal 신호를 동시에 따른다 |
| 2D goal pose 조건 navigation | (명시 없음) | 출발점에서 25~100 m 떨어진 목표. 로봇 위치와 목표 위치는 GPS로 추정 | 장거리 pose 조건 navigation |
| egocentric goal 이미지 조건 navigation | (명시 없음) | 주로 실내. 3 m 이내 goal 이미지를 따라가며 topological memory로 더 먼 목표에 도달 | ViNT, ExAug, NoMaD와 같은 방식의 이미지 조건 navigation |

egocentric goal 이미지 실험의 절차는 페이지에 구체적으로 적혀 있다. teleoperation으로 로봇을 움직이며 1 Hz 고정 프레임 레이트로 이미지 observation을 기록해 goal loop를 만든다. 배포 시에는 초기 observation에서 출발해 topological memory에서 가장 가까운 노드를 계속 찾고, 매 timestep 다음 노드의 이미지를 goal 이미지로 넣어 다음 action을 계산한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

페이지는 한계 절을 두지 않는다. 자료 특성상 다음을 유의한다.

- 정량 결과(성공률, 기준선 비교)는 페이지에 없고 논문에 있다. wiki에 논문 PDF가 들어오기 전까지 "specialist 기준선을 앞선다"는 주장은 수치 없이 인용해야 한다.
- 결과 절의 영상 carousel은 raw 마크다운에서 빈 목록으로만 남았다. 영상 내용은 이 sources에 반영되어 있지 않다.
- 데이터의 91%가 BDD-V 차량 영상이고 action은 합성 라벨이다. 재주석 모델의 품질이 최종 policy에 미치는 영향은 페이지에서 다루지 않는다.
- 멀티모달 실험과 pose 실험, 이미지 실험에 쓴 로봇 기종은 페이지에 명시되지 않았다.

## 6. 관련 연구 (Related Work)

| 자료 | 관계 |
|---|---|
| OpenVLA (Kim 외 2024) | 기반 모델. Llama 2 7B와 SigLIP + DINOv2 구성을 이어받는다 |
| GNM, ViNT, NoMaD | 같은 그룹의 이미지 조건 navigation foundation model 계보. OmniVLA의 egocentric 이미지 모달리티와 topological memory 사용법이 여기서 온다 |
| LeLaN | in-the-wild 영상으로 언어 조건 navigation policy를 배운 선행 연구. 합성 action과 언어 프롬프트를 제공한다 |
| MBRA (Learning to Drive Anywhere with Model-Based Reannotation) | Frodobots-2K와 BDD-V의 합성 action 라벨을 만드는 재주석 방법 |
| SACSoN, ExAug, DVMPC | "More Research"에 나열된 같은 그룹의 navigation 연구 |
| CAST | 새 언어 도메인 fine-tuning 평가에 쓴 데이터셋 |

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| omni-modal goal conditioning | 2D pose, egocentric goal 이미지, 자연어와 그 조합 중 어느 것으로든 goal을 지정할 수 있게 하나의 policy를 학습하는 방식 |
| randomized modality fusion | 학습 배치마다 goal 모달리티 조합을 무작위로 골라 함께 학습하는 전략. 구조도에서는 attention 마스크로 구현된다 |
| modality dropout / modality masking | 학습 시 일부 goal 모달리티를 무작위로 빼는 것과 추론 시 없는 모달리티를 가리는 것. 모달리티 불균형과 희소성 대응 수단 |
| topological memory | 1 Hz로 기록한 observation 이미지를 노드로 잇는 그래프. 3 m 이내 goal 이미지 조건 policy로 더 먼 목표에 도달하게 한다 |
| MBRA | 모델 기반 재주석으로 노이즈가 많거나 embodiment가 다른 주행 데이터에 합성 action을 붙이는 방법 |
| ERZ | Frodobots-2K를 수집한 소형 배달 로봇 플랫폼. 언어 조건 실험에도 쓰였다 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | "OmniVLA 구조도: Llama 2 7B 위의 세 goal 모달리티와 마스킹" | fetched | ★ wiki 권장 (architecture) |
| fig02 | "학습 데이터셋 표: 네 묶음의 플랫폼, 시간, 라벨, 모달리티" | fetched | ★ wiki 권장 (data) |
| fig03 | "프로젝트 페이지 전체 스크린샷" | screenshot | (선택) |
