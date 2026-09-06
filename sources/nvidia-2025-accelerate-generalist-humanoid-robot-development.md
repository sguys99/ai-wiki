---
title: "Accelerate Generalist Humanoid Robot Development with NVIDIA Isaac GR00T N1"
type: article
year: 2025
category: physical-ai
raw_path: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development.md
raw_filename: "nvidia-2025-accelerate-generalist-humanoid-robot-development.md"
source_collection: external
author: "Kalyan Meher Vadrevu, Oyindamola Omotuyi"
url: "https://developer.nvidia.com/blog/accelerate-generalist-humanoid-robot-development-with-nvidia-isaac-gr00t-n1/"
publisher: "NVIDIA Technical Blog"
publication_date: "2025-03-18"
tags: [physical-ai, vla, humanoid, manipulation]
figures:
  - id: fig01
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/fig01.gif
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/fig01.gif
    caption: "대표 이미지. 창고에서 humanoid 두 대가 양팔로 물체를 다룬다 (GIF 9MB)"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/fig02.gif
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/fig02.gif
    caption: "Figure 1. 주방에서 용과를 도마에서 접시로 옮기는 조작 데모 (GIF 10MB)"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/fig03.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/fig03.png
    caption: "Figure 2. GR00T N1 구조. 센서 토큰과 텍스트 토큰이 VLM(System 2)과 Diffusion Transformer(System 1)를 거쳐 action 토큰이 된다"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/page-full.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/page-full.png
    caption: "전체 페이지 스크린샷 (상단 6000px)"
    strategy: screenshot
    curated: false
  - id: fig05
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/crop01.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/crop01.png
    caption: "대표 이미지 크롭. 우상단에 쿠키 배너 일부가 걸쳤다"
    strategy: crop
    curated: false
  - id: fig06
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/crop02.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/crop02.png
    caption: "Video 1 유튜브 임베드. 쿠키 배너에 가렸다"
    strategy: crop
    curated: false
  - id: fig07
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/crop03.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/crop03.png
    caption: "Figure 1 조작 데모 정지 이미지와 원문 캡션. 10MB GIF를 대신할 경량 PNG"
    strategy: crop
    curated: true
  - id: fig08
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/crop04.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/crop04.png
    caption: "Figure 1 조작 데모 정지 이미지 (캡션 없는 버전)"
    strategy: crop
    curated: false
  - id: fig09
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/crop05.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/crop05.png
    caption: "Video 2 유튜브 임베드. 쿠키 배너에 가렸다"
    strategy: crop
    curated: false
  - id: fig10
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/crop06.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/crop06.png
    caption: "Figure 2 구조 도식과 캡션. 상단이 쿠키 배너에 가렸다"
    strategy: crop
    curated: false
  - id: fig11
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/crop07.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/crop07.png
    caption: "Figure 2 구조 도식 (캡션 없는 버전). 상단이 쿠키 배너에 가렸다"
    strategy: crop
    curated: false
  - id: fig12
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/crop08.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/crop08.png
    caption: "Table 1. RoboCasa, DexMG, GR-1 시뮬레이션 벤치마크 평균 성공률"
    strategy: crop
    curated: true
  - id: fig13
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/crop09.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/crop09.png
    caption: "Table 2. GR-1 실제 기기 과제 성공률, 학습 데이터 10%"
    strategy: crop
    curated: true
  - id: fig14
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/crop10.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/crop10.png
    caption: "Table 3. GR-1 실제 기기 과제 성공률, 전체 데이터"
    strategy: crop
    curated: true
---

## 한 줄 요약 (One-line Summary)

GR00T N1 논문을 개발자 진입 경로로 다시 쓴 NVIDIA 공식 공지. dual-system 구조와 데이터 전략을 요약한 뒤 GR00T-N1-2B 체크포인트를 어디서 받아 어떤 GPU에서 post-training과 추론을 돌리는지, 데이터 준비부터 평가까지 다섯 단계가 무엇인지를 적었다.

## 1. 자료 정보 (Document Information)

NVIDIA Technical Blog에 2025년 3월 18일 올라온 글이다. 저자는 제품 마케팅 매니저 Kalyan Meher Vadrevu와 테크니컬 마케팅 엔지니어 Oyindamola Omotuyi다. 연구 논문이 아니라 GTC 2025 발표에 맞춘 릴리스 공지에 가깝다.

기술 정본은 같은 날 공개된 논문 GR00T N1: An Open Foundation Model for Generalist Humanoid Robots(arXiv 2503.14734)다. 이 wiki에는 [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]으로 이미 들어와 있다. 블로그 쪽은 그 논문의 결과를 요약한 뒤 배포 채널과 하드웨어 요구사항을 덧붙였다.

본문 앞부분에는 NVIDIA Nemotron이 생성한 AI 요약 블록이 붙어 있다. 사람이 쓴 본문과 내용이 겹치고 원문에도 "요약이 불완전할 수 있다"는 고지가 달려 있다.

## 2. 주요 기여 (Key Contributions)

새로운 연구 기여는 없다. 논문에 없고 이 글에만 있는 값은 배포와 운영 쪽이다.

GR00T-N1-2B는 Hugging Face에서 받을 수 있다. 샘플 데이터셋과 PyTorch fine-tuning 스크립트는 `NVIDIA/Isaac-GR00T` GitHub repo에 있다고 명시한다. 학습에 쓴 데이터 일부는 Hugging Face의 NVIDIA physical AI dataset 컬렉션으로 공개했다. 이 repo는 이후 N1.7까지 이어져 [[physical-ai/nvidia-isaac-gr00t]]로 별도 정리돼 있다.

post-training 최소 구성은 RTX A6000 한 장 또는 GeForce RTX 4090 한 장이다. 더 큰 작업에는 DGX Spark나 DGX H100을 권한다. 추론은 RTX A6000 또는 Jetson AGX Orin에서 실행된다. GPU 사양이 이만큼 구체적으로 적힌 NVIDIA 자료는 많지 않다.

embodiment는 로봇의 물리적 형상과 그에 딸린 제어 API 구성을 가리킨다. 이 글은 검증된 embodiment도 이름으로 밝힌다. 하나의 가중치로 Fourier GR-1과 1X Neo에서 조작 동작을 낸다고 적었다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### dual-system 구성

GR00T N1은 사람의 인지를 본뜬 두 계층으로 나뉜다. System 2는 NVIDIA-Eagle에 SmolLM-1.7B를 결합한 VLM으로 이미지와 언어 지시를 해석해 무엇을 할지 계획한다. System 1은 Diffusion Transformer가 맡아 그 계획을 연속적인 제어 명령으로 바꾼다. 두 계층은 느슨하게 이어붙인 게 아니라 post-training 단계에서 함께 최적화된다.

블로그는 backbone을 "NVIDIA-Eagle with SmolLM-1.7B"라고만 적었다. 논문은 SmolLM2와 SigLIP-2에서 fine-tuning한 Eagle-2로 명시해 표기가 서로 조금 다르다. 세부는 논문 쪽을 따른다.

### data pyramid 전략

학습 데이터를 양이 많고 embodiment 특수성이 낮은 순서로 3층에 쌓는다. 맨 아래에는 인터넷 규모 웹 데이터와 사람 영상이 깔린다. 사람과 물체가 상호작용하는 패턴, 과제의 의미 구조를 여기서 얻지만 로봇에 줄 모터 제어 신호가 없다. 중간층은 Omniverse가 만든 합성 데이터다. GPU 가속 덕에 실시간으로 무한히 뽑을 수 있다. 대신 sim2real 간극이 남는다. sim2real은 시뮬레이션에서 학습한 policy를 실제 기기로 옮기는 문제를 말한다. 꼭대기는 사람이 로봇을 원격으로 움직여 시연을 만드는 teleoperation으로 모은 실제 로봇 데이터다. 비싸고 느린 대신 이 층이 간극을 실제로 메운다.

아래 두 층은 라벨이 없다. 이걸 학습에 넣는 수단으로 latent action training을 언급한다. 감독 신호 없이 대규모 사람 영상에서 배우게 하는 기법이라고만 적고 구현은 논문으로 넘긴다.

### 합성 데이터의 기여

이 전략을 Isaac GR00T Blueprint로 실행했을 때의 수치가 이 글에서 가장 자주 인용된다. 11시간 만에 synthetic trajectory 750,000개 이상을 만들었다. 사람 시연으로 환산하면 6,500시간, 쉬지 않고 9개월에 해당한다. 이 합성 데이터를 실제 데이터와 합치자 실제 데이터만 썼을 때보다 성능이 40% 올랐다.

논문 쪽은 pre-training과 post-training을 합쳐 780,000개로 적는다. 블로그가 "over 750K"로 내림한 것이라 서로 어긋난 값은 아니다. 인용할 때는 논문 숫자를 쓰는 편이 낫다.

### 다섯 단계 실무 절차

먼저 로봇 시연 데이터를 영상, 상태, action 세 쌍으로 묶어 GR00T 데이터셋 형식으로 만든다. 이 형식은 Hugging Face LeRobot과 호환된다. 검증 스크립트로 형식을 확인한 뒤 PyTorch 스크립트로 pre-training된 GR00T N1을 자기 데이터에 fine-tuning한다. 추론 스크립트는 로봇 컨트롤러나 시뮬레이션 환경에 붙여 실행한다. 과제 성공률은 평가 스크립트가 잰다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

논문과 같은 표를 싣는다. 시뮬레이션 벤치마크는 세 종이다. 기존 연구의 오픈소스 둘에 실제 탁상 조작 과제를 본뜬 신규 스위트 하나를 더했다. 과제당 시연은 100개다.

| 모델 | RoboCasa | DexMG | GR-1 | 평균 |
|---|---|---|---|---|
| BC Transformer | 26.3% | 53.9% | 16.1% | 26.4% |
| Diffusion Policy | 25.6% | 56.1% | 32.7% | 33.4% |
| Isaac GR00T N1 2B | 32.1% | 66.5% | 50.0% | 45.0% |

실제 기기 평가는 GR-1 humanoid의 탁상 조작 과제 네 묶음이다. 학습 데이터를 10%만 줬을 때 차이가 가장 크다.

| 모델 | Pick-and-Place | Articulated | Industrial | Coordination | 평균 |
|---|---|---|---|---|---|
| Diffusion Policy (10%) | 3.0% | 14.3% | 6.7% | 27.5% | 10.2% |
| Isaac GR00T N1 2B (10%) | 35.0% | 62.0% | 31.0% | 50.0% | 42.6% |

| 모델 | Pick-and-Place | Articulated | Industrial | Coordination | 평균 |
|---|---|---|---|---|---|
| Diffusion Policy (전체) | 36.0% | 38.6% | 61.0% | 62.5% | 46.4% |
| Isaac GR00T N1 2B (전체) | 82.0% | 70.9% | 70.0% | 82.5% | 76.8% |

데이터 10%만 쓴 GR00T N1의 42.6%가 전체 데이터를 쓴 Diffusion Policy의 46.4%에 4%p 이내로 붙는다. 저자들은 이 구간에서 동작이 더 매끄럽고 grasping, 곧 물체를 안정적으로 쥐는 동작의 정확도가 눈에 띄게 낫다고 적었다. 언어 지시를 따르는 정확도도 baseline보다 높다고 덧붙인다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

실험 설정과 ablation이 없어 표에 적힌 숫자의 조건을 이 글만으로는 확인할 수 없다. 가장 많이 인용되는 "합성 데이터로 40% 향상"도 어느 과제, 어느 데이터 비율에서 잰 값인지 밝히지 않는다.

GR00T N1을 쓰겠다면 이 글은 진입점으로만 쓰고 수치와 방법은 논문에서 확인하는 게 맞다. 마케팅 목적의 글이라 baseline을 왜 그렇게 골랐는지, 어디서 실패했는지도 다루지 않는다.

## 6. 관련 연구 (Related Work)

이 글이 직접 가리키는 자료는 GR00T N1 논문, `NVIDIA/Isaac-GR00T` repo, Hugging Face의 GR00T-N1-2B 체크포인트와 physical AI dataset 컬렉션이다. 데이터 생성 쪽은 합성 모션을 만드는 파이프라인을 다룬 앞선 NVIDIA 블로그 글을 가리킨다. 시뮬레이션 환경으로는 Isaac Sim과 Isaac Lab을 참조한다.

wiki 안에서는 논문 페이지가 정본이다. dual-system 구조를 다른 각도에서 다루는 자료로는 [[physical-ai/cui-2025-openhelix-a-short-survey-empirical]]과 [[physical-ai/kim-2026-silicon-valley-rfm-part-2]]가 있다. 데이터 형식을 실제로 다루려면 [[physical-ai/huggingface-lerobot]]이 함께 필요하다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Isaac GR00T Blueprint | 합성 조작 데이터를 대량 생성하는 NVIDIA의 참조 워크플로. 11시간에 trajectory 750,000개 이상을 뽑은 근거 |
| NVIDIA-Eagle | System 2가 쓰는 NVIDIA의 VLM 계열. 이 글은 SmolLM-1.7B를 결합했다고만 적었다. 논문은 Eagle-2로 명시한다 |
| SimReady | Isaac Sim에서 물리 속성이 붙은 채로 바로 쓸 수 있게 준비된 3D 에셋 |
| Fourier GR-1 / 1X Neo | GR00T N1이 하나의 가중치로 동작을 낸 humanoid 두 종. 실제 기기 벤치마크는 GR-1로 잰다 |
| Jetson AGX Orin | 추론 배포 대상으로 지목된 엣지 모듈. 학습이 아니라 실행용이다 |
| DGX Spark | 대규모 post-training 권장 구성으로 함께 언급된 데스크사이드 시스템 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig03 | Figure 2 구조 도식 (원본 PNG, 배너 없음) | fetched | ★ wiki 권장 (architecture) |
| fig07 | Figure 1 조작 데모 정지 이미지 + 캡션 | crop | ★ wiki 권장 (demo, GIF 대체) |
| fig12 | Table 1 시뮬레이션 벤치마크 | crop | ★ wiki 권장 (result) |
| fig13 | Table 2 실제 기기 10% 데이터 | crop | ★ wiki 권장 (result) |
| fig14 | Table 3 실제 기기 전체 데이터 | crop | ★ wiki 권장 (result) |
| fig02 | Figure 1 조작 데모 원본 GIF | fetched | (선택, 10MB라 Obsidian에서 무겁다) |
| fig01 | 대표 이미지 GIF | fetched | (선택, 9MB) |
| fig08 | 조작 데모 정지 이미지, 캡션 없음 | crop | (fig07과 중복) |
| fig04, fig05, fig06, fig09, fig10, fig11 | 전체 스크린샷, 유튜브 임베드, 쿠키 배너에 가린 도식 | screenshot / crop | 제외 |

본문의 표 세 개는 텍스트로도 남아 있어 fig12~fig14는 시각 확인용이다. 논문 페이지가 이미 같은 수치를 표로 실었으니 중복이 부담이면 fig03과 fig07만 가져가도 된다.
