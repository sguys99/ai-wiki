---
title: "Open X-Embodiment: Robotic Learning Datasets and RT-X Models"
type: article
year: 2023
category: physical-ai
raw_path: raw/articles/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x.md
raw_filename: "open-x-embodiment-2023-robotic-learning-datasets-and-rt-x.md"
source_collection: external
author: "Open X-Embodiment Collaboration"
url: "https://robotics-transformer-x.github.io/"
publisher: "robotics-transformer-x.github.io"
fetched_at: "2026-08-15T21:56:11+0900"
extractor_tier: "chrome"
tags: [physical-ai, robot-dataset, vla, robot-learning]
figures:
  - id: fig01
    file: assets/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x/fig01.png
    raw: raw/articles/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x-figures/fig01.png
    caption: "참여 기관 로고 배너"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x/fig02.png
    raw: raw/articles/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x-figures/fig02.png
    caption: "Open X-Embodiment 데이터셋 한 장 요약. episode 100만 건, scene 311종, 연구실 34개, 기관 21개, embodiment 22종, skill 527종, 데이터셋 60종이며 좌우로 QT-Opt, ALOHA, Bridge, RT-1 등 편입 데이터셋 샘플"
    strategy: fetched
    curated: true
  - id: fig03
    file: assets/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x/fig03.png
    raw: raw/articles/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x-figures/fig03.png
    caption: "데이터 분포 분석. (a) embodiment별 데이터셋 수, (b) scene 수, (c) trajectory 수, (d) 빈출 skill, (e) 빈출 객체 범주"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x/fig04.png
    raw: raw/articles/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x-figures/fig04.png
    caption: "RT-1-X와 RT-2-X 구조 비교. 위는 FiLM EfficientNet과 Transformer, 아래는 ViT와 LLM과 de-tokenizer. 오른쪽은 embodiment마다 다른 출력 형식과 control frequency(10Hz, 3Hz, 5Hz)"
    strategy: fetched
    curated: true
  - id: fig05
    file: assets/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x/fig05.png
    raw: raw/articles/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x-figures/fig05.png
    caption: "소규모 데이터셋 5종에서 Original Method, RT-1, RT-1-X 성공률 비교. 평균 41%, 44%, 63%"
    strategy: fetched
    curated: true
  - id: fig06
    file: assets/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x/fig06.png
    raw: raw/articles/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x-figures/fig06.png
    caption: "RT-2-X emergent skill 평가 과제 구성. (a) 절대 방향 이동, (b) 객체 기준 상대 이동, (c) 전치사에 따른 동작 변화"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x/fig07.png
    raw: raw/articles/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x-figures/fig07.png
    caption: "emergent skill 평가 성공률. RT-2 약 27%, RT-2-X 약 76%"
    strategy: fetched
    curated: true
  - id: fig08
    file: assets/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x/page-full.png
    raw: raw/articles/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x-figures/page-full.png
    caption: "프로젝트 페이지 전체 캡처"
    strategy: screenshot
    curated: false
---

## 한 줄 요약 (One-line Summary)

21개 기관 34개 연구실이 각자 모아둔 로봇 데이터 60종을 하나의 형식으로 합쳐 22개 embodiment와 100만 개 이상의 trajectory 규모의 공개 데이터셋을 만들었다. 그 데이터로 RT-1과 RT-2를 다시 학습시킨 RT-1-X와 RT-2-X가 원래 데이터셋 전용 모델보다 잘한다는 것을 보인 프로젝트 페이지다.

## 1. 자료 정보 (Document Information)

- URL: https://robotics-transformer-x.github.io/
- 저자: Open X-Embodiment Collaboration (알파벳 순 공동 저자, Google DeepMind와 34개 연구실)
- 페이지에 발행일 표기는 없다. 상단 링크의 arXiv ID가 2310.08864이므로 year는 2023으로 잡았다
- 추출 tier: `chrome` (jina는 403). 본문 27,246자 중 상당 부분이 공동 저자 목록이다. 실제 서술은 abstract와 네 개 섹션이다
- 페이지에서 갈 수 있는 곳: 논문(arXiv 2310.08864), DeepMind 블로그 포스트, 코드(`google-deepmind/open_x_embodiment`), 편입 데이터셋 목록 스프레드시트, RT-2-X API 신청 폼, 데이터셋 기여 신청 폼
- 데모 영상 중심 페이지라 정지 이미지는 7장뿐이다. 나머지 시각 자료는 `<video>` 태그라 수집되지 않았다

## 2. 주요 기여 (Key Contributions)

문제의식이 abstract 첫머리에 그대로 나와 있다. NLP와 컴퓨터 비전에서는 범용 pre-trained backbone 하나를 여러 응용의 출발점으로 쓰는 통합이 일어났다. 로보틱스는 여전히 응용마다, 로봇마다, 환경마다 따로 모델을 학습한다. 그 통합이 로보틱스에서도 가능한지 확인하려면 표준 형식으로 모인 데이터와 그 위에서 구동되는 모델이 먼저 있어야 한다.

내놓은 것은 표준 형식으로 통일한 Open X-Embodiment 데이터셋, 그 데이터 혼합으로 학습한 RT-X 모델, 여러 로봇에 걸친 policy가 실제로 이득을 낸다는 실험 결과 세 가지다. embodiment는 로봇의 물리적 형상과 그에 딸린 제어 API 구성을 뜻한다. 이 프로젝트의 핵심 주장은 서로 다른 embodiment의 데이터가 섞여도 성능이 깎이기는커녕 서로를 끌어올린다는 positive transfer다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

세계 34개 연구실의 데이터셋 60종을 풀링해 22개 embodiment와 100만 개 이상의 실제 기기 trajectory를 담았다. 새로 수집한 게 아니라 이미 존재하던 것을 모은 결과다. 로봇 구성은 단일 팔부터 양팔, 4족 보행 로봇까지 걸쳐 있다. 페이지의 요약 도식을 보면 episode 100만 건, scene 311종, skill 527종, 속성 1,798개, 객체 5,228개, 공간 관계 23,486종이다. 분포 분석을 보면 scene 다양성은 embodiment 사이에 비교적 고르게 퍼져 있지만 trajectory 수는 xArm과 Google Robot과 Kuka iiwa 몇 종에 몰려 있고 skill 쪽은 picking과 moving이 압도적이다.

두 모델 계열을 그대로 가져와 이 데이터 혼합으로 다시 학습한다. RT-1은 로봇 제어용으로 설계된 Transformer 구조이고 RT-2는 action을 자연어 토큰으로 출력하도록 co-fine-tuning한 대형 vision-language model이다. co-fine-tuning은 로봇 데이터만 쓰지 않고 웹 데이터를 배치에 계속 섞는 레시피를 말한다. 데이터 혼합으로 학습한 쪽에 -X를 붙여 각각 RT-1-X, RT-2-X로 부른다.

서로 다른 로봇을 한 모델에 태우려면 출력 규격을 맞춰야 한다. 두 모델 모두 그리퍼 기준 좌표계에서 action을 내놓는다. 형식은 x, y, z, roll, pitch, yaw와 그리퍼 개폐로 이루어진 7차원 벡터 또는 그 변화율이다. 어떤 로봇이 쓰지 않는 차원은 학습 시 0으로 채운다. embodiment마다 control frequency가 다른 것은 그대로 둔다. control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다. 페이지 도식에는 10Hz, 3Hz, 5Hz 세 가지가 예시로 나온다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

여섯 개 대학 연구실(UC Berkeley RAIL과 AUTOLab, University of Freiburg AiS, NYU CILVR, Stanford IRIS, USC CLVR)의 실제 기기에서 RT-1-X를 실행했다. 데이터가 적은 영역에서 한 평가다. 비교 대상은 해당 데이터셋을 만든 팀이 직접 최적화한 모델(Original Method)과 그 데이터만으로 학습한 RT-1이다. 평균 성공률은 Original Method 41%, RT-1 44%, RT-1-X 63%다. 페이지에 따르면 소규모 데이터 영역에서 50% 개선이다.

과제별로 보면 결과가 균일하지 않다. 성공률(%)을 Original Method, RT-1, RT-1-X 순으로 적으면 Kitchen Manipulation 43→48→63, Cable Routing 24→18→56, NYU Door Opening 53→65→80, Task-Agnostic Play 33→68→72로 RT-1-X가 앞서지만, Autolab UR5는 Original Method 53%에 RT-1-X 45%로 오히려 뒤진다. 데이터 혼합의 이득이 모든 과제에서 균일하지는 않다.

RT-2-X는 emergent skill 쪽에서 평가했다. emergent skill은 개별 데이터셋에는 없던 과제, 특히 공간 관계 이해가 필요한 지시를 가리킨다. 성공률은 RT-2 약 27%에서 RT-2-X 약 76%로 3배 차이가 났다. 정성적으로는 "put apple **on** cloth"와 "move apple **near** cloth"처럼 전치사만 바꾼 지시에서 로봇의 저수준 동작이 달라졌다. 절대 방향("counter의 우측 상단으로")과 객체 기준 상대 위치("coke와 cup 사이로") 양쪽에서 공간 이해를 보였다. 55B 규모의 RT-2-X가 대학 연구실 환경에서 학습에 없던 과제를 수행한 사례로 소개된다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

페이지 자체는 한계를 따로 적지 않았다. 자료를 읽으며 확인되는 것만 남긴다. Autolab UR5 결과처럼 cross-embodiment 학습이 항상 이득은 아니다. trajectory 분포가 몇몇 embodiment에 쏠려 있어 데이터 균형 문제도 남는다. RT-2-X는 55B 규모라 접근 경로가 API 신청 폼으로 제한된다. 데이터셋도 기여 신청 폼으로 계속 늘려가는 진행형 프로젝트다.

자료 형식의 한계도 있다. 실험 조건, 평가 프로토콜, ablation은 이 페이지에 없다. 세부는 arXiv 2310.08864 논문을 봐야 한다.

## 6. 관련 연구 (Related Work)

RT-1과 RT-2가 직접적인 전신이다. 이 wiki에는 두 논문이 각각 [[brohan-2022-rt-1-robotics-transformer-for-real-world]], [[brohan-2023-rt-2-vision-language-action-models-transfer-web]]으로 정리돼 있고 한글 해설로 [[jo-2026-rt-1-vla-primer]]와 [[jo-2026-rt-2-vla-primer]]가 있다. 데이터셋 안에는 ALOHA([[zhao-2023-learning-fine-grained-bimanual-manipulation]])와 Bridge, QT-Opt 등이 편입돼 있다. 이후 흐름으로는 이 데이터셋을 학습에 쓴 OpenVLA([[kim-2024-openvla-an-open-source-vision-language-action-model]])와 GR00T N1([[nvidia-2025-gr00t-n1-an-open-foundation]])이 이 wiki에 있다.

## 7. 용어집 (Glossary)

- **Open X-Embodiment (OXE)**: 34개 연구실 데이터셋 60종을 표준 형식으로 합친 공개된 실제 기기 로봇 데이터셋
- **RT-X**: OXE 데이터 혼합으로 학습한 모델 계열. RT-1 기반이 RT-1-X, RT-2 기반이 RT-2-X
- **positive transfer**: 다른 로봇과 다른 과제의 데이터를 섞었을 때 성능이 떨어지지 않고 오히려 오르는 현상
- **X-robot policy**: 여러 embodiment에서 공통으로 쓰이도록 학습한 policy를 페이지가 부르는 이름
- **Original Method**: 각 데이터셋 제작 팀이 자기 데이터에 맞춰 최적화해 둔 모델. RT-1-X 비교의 기준선
- **emergent skill**: 개별 데이터셋에는 없던 과제. 여기서는 공간 관계와 전치사 이해가 필요한 지시를 가리킨다

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 참여 기관 로고 배너 | fetched | (제외) |
| fig02 | 데이터셋 한 장 요약 (episode 100만 건, embodiment 22종, skill 527종, 데이터셋 60종) | fetched | ★ wiki 권장 (overview) |
| fig03 | 데이터 분포 분석 5종 (embodiment, scene, trajectory, skill, 객체) | fetched | (확인 필요, 분포 편중 서술의 근거) |
| fig04 | RT-1-X / RT-2-X 구조와 embodiment별 출력과 control frequency | fetched | ★ wiki 권장 (method) |
| fig05 | 소규모 데이터셋 5종 성공률 비교 (평균 41%, 44%, 63%) | fetched | ★ wiki 권장 (result) |
| fig06 | emergent skill 평가 과제 구성 (절대, 상대, 전치사) | fetched | (확인 필요) |
| fig07 | RT-2 vs RT-2-X emergent skill 성공률 (27% vs 76%) | fetched | ★ wiki 권장 (result) |
| fig08 | 프로젝트 페이지 전체 캡처 | screenshot | (제외) |
