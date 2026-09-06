---
title: "Helix: A Vision-Language-Action Model for Generalist Humanoid Control"
type: article
year: 2025
category: physical-ai
raw_path: raw/articles/figure-ai-2025-helix-a-vision-language-action.md
raw_filename: "figure-ai-2025-helix-a-vision-language-action.md"
source_collection: external
author: "Figure AI"
url: "https://www.figure.ai/news/helix"
publisher: "Figure AI News"
publication_date: "2025-02-20"
fetched_at: "2026-08-31T09:03:00+0900"
extractor_tier: "chrome"
tags: [physical-ai, vla, humanoid, manipulation]
figures:
  - id: fig01
    file: assets/figure-ai-2025-helix-a-vision-language-action/fig01.webp
    raw: raw/articles/figure-ai-2025-helix-a-vision-language-action-figures/fig01.webp
    caption: "Figure 1. 새 기술을 얻는 세 방식의 스케일링 곡선 (PhD 시간, 수집 데이터, Helix의 언어 지정)"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/figure-ai-2025-helix-a-vision-language-action/page-full.png
    raw: raw/articles/figure-ai-2025-helix-a-vision-language-action-figures/page-full.png
    caption: "블로그 전체 페이지 스크린샷 (상단 6000px 절단, 원본 13267px)"
    strategy: screenshot
    curated: false
  - id: fig03
    file: assets/figure-ai-2025-helix-a-vision-language-action/crop01.png
    raw: raw/articles/figure-ai-2025-helix-a-vision-language-action-figures/crop01.png
    caption: "Figure 1 크롭 (원문 캡션 포함, 966px 저해상도, fig01과 중복)"
    strategy: crop
    curated: false
  - id: fig04
    file: assets/figure-ai-2025-helix-a-vision-language-action/crop02.png
    raw: raw/articles/figure-ai-2025-helix-a-vision-language-action-figures/crop02.png
    caption: "Figure 1 크롭 (캡션 없음, fig01과 중복)"
    strategy: crop
    curated: false
  - id: fig05
    file: assets/figure-ai-2025-helix-a-vision-language-action/crop03.png
    raw: raw/articles/figure-ai-2025-helix-a-vision-language-action-figures/crop03.png
    caption: "Video 2 자리 (재생 전 검은 화면, 캡션만 남음)"
    strategy: crop
    curated: false
  - id: fig06
    file: assets/figure-ai-2025-helix-a-vision-language-action/crop04.png
    raw: raw/articles/figure-ai-2025-helix-a-vision-language-action-figures/crop04.png
    caption: "Video 3 첫 프레임. Figure 로봇 두 대가 냉장고에 장을 넣는 장면"
    strategy: crop
    curated: true
  - id: fig07
    file: assets/figure-ai-2025-helix-a-vision-language-action/crop05.png
    raw: raw/articles/figure-ai-2025-helix-a-vision-language-action-figures/crop05.png
    caption: "Video 4 자리 (재생 전 검은 화면)"
    strategy: crop
    curated: false
  - id: fig08
    file: assets/figure-ai-2025-helix-a-vision-language-action/crop06.png
    raw: raw/articles/figure-ai-2025-helix-a-vision-language-action-figures/crop06.png
    caption: "Video 5 자리 (재생 전 검은 화면)"
    strategy: crop
    curated: false
---

## 한 줄 요약 (One-line Summary)

Figure AI가 자사 humanoid의 상체 전체를 자연어로 몰기 위해 만든 VLA의 공식 발표문이다. 인터넷 데이터로 pre-training된 7B VLM이 7–9Hz로 장면과 명령을 해석하고 80M Transformer가 200Hz로 모터 명령을 내는 두 모듈 구조를, 과제별 fine-tuning 없이 하나의 가중치 묶음으로 end-to-end 학습했다.

## 1. 자료 정보 (Document Information)

- **제목**: Helix: A Vision-Language-Action Model for Generalist Humanoid Control
- **저자**: Figure AI (개별 저자 표기 없음)
- **발행**: 2025-02-20, https://www.figure.ai/news/helix
- **성격**: 회사 블로그 발표문. 같은 시점에 대응하는 논문이나 기술 보고서가 나오지 않았고, arXiv 링크도 붙어 있지 않다. 수치와 구조 설명은 이 글의 서술이 전부다
- **수집 메모**: 본문 15,381자, chrome tier로 취득. 페이지의 시연이 전부 동영상(Video 1~6)이라 정지 이미지 후보는 Figure 1 하나뿐이다. 본문에서 가장 중요한 System 1 / System 2 구조도는 iframe 안에 들어 있어 `<img>` 수집에 잡히지 않았고, 같은 도식을 [[9bow-2025-helix-generalist-humanoid-vla]] 쪽에서 확보했다

## 2. 주요 기여 (Key Contributions)

글은 Helix를 "a series of firsts"로 소개하고 다섯 항목을 든다. 상체 전체를 고빈도 연속 제어로 다룬 첫 VLA라는 것, 두 대의 로봇에서 동시에 실행되며 처음 보는 물건으로 long-horizon 과제를 함께 푼 첫 VLA라는 것, 자연어 명령만으로 처음 보는 소형 가정용품 수천 개를 집을 수 있다는 것, 물건 집고 놓기와 서랍과 냉장고 조작과 로봇 간 인계를 과제별 fine-tuning 없이 하나의 가중치 묶음으로 처리한다는 것, 그리고 저전력 임베디드 GPU에서 전부 온보드로 실행되어 상용 배치가 가능한 첫 VLA라는 것이다.

주장의 핵심은 스케일링 방식 자체를 바꿨다는 데 있다. 지금까지 로봇에 새 동작 하나를 가르치려면 박사급 인력의 수작업 프로그래밍 몇 시간이나 수천 건의 시연 데이터(demonstration)가 필요했고, 가정이라는 문제 공간에 비하면 둘 다 비용이 감당되지 않는다. Helix는 새 기술의 획득을 학습이 아니라 대화로 옮긴다. Figure 1의 세 곡선이 이 대비를 그대로 그린다.

정량 비교는 없다. 성공률 표도, 기존 VLA와의 벤치마크 대조도, ablation도 이 글에는 실리지 않았다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 데이터

teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다. 여러 로봇과 여러 조작자에게서 이렇게 모은 약 500시간 분량이 학습 데이터의 전부다. 자연어와 짝지으려고 auto-labeling VLM에 로봇 카메라 영상을 잘라 넣고 "이 영상 속 동작을 시키려면 어떤 지시를 내렸겠는가"를 물어 사후적으로 지시문을 붙였다. 학습 중 다룬 물건은 평가에서 전부 뺐다고 밝힌다.

### 구조

두 모듈이 서로 다른 시간 척도에서 실행된다.

S2는 인터넷 규모 데이터로 pre-training된 7B 오픈웨이트 VLM이다. 단안 카메라 이미지와 로봇 상태를 vision-language 임베딩 공간으로 투영해 받고, 여기에 자연어 명령을 더해 과제에 필요한 의미 정보를 연속값 latent 벡터 하나로 압축한다. 로봇 상태는 손목 pose와 손가락 위치로 구성된다.

S1은 80M 규모의 cross-attention 인코더-디코더 Transformer다. 시각 처리는 시뮬레이션에서만 pre-training한 fully convolutional 다중 스케일 backbone이 맡는다. S2가 넘긴 latent 벡터를 S1의 토큰 공간으로 투영해 S1 자신의 시각 특징과 시퀀스 차원에서 이어 붙이는 방식으로 과제 조건을 건다. S1은 S2와 같은 이미지와 상태를 받지만 더 높은 빈도로 처리한다.

control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다. S2가 7–9Hz, S1이 200Hz다. S1의 출력은 손목 pose 목표, 손가락 굽힘과 벌림, 몸통과 머리 방향 목표를 포함한다. 여기에 "과제 완료 비율"이라는 합성 action 차원을 하나 덧붙여 Helix가 자기 종료 조건을 스스로 예측하게 했고, 덕분에 학습된 동작 여러 개를 이어 붙이기 쉬워졌다고 설명한다.

글이 내세우는 설계 이점은 넷이다. 단일 과제 behavioral cloning policy만큼 빠르면서 처음 보는 물체 수천 개로 zero-shot 일반화한다는 점, 고차원 action space에 연속 제어를 직접 내보내 기존 VLA의 복잡한 action tokenization을 피한다는 점, S2는 오픈소스 VLM이고 S1은 평범한 Transformer라 구조가 단순하다는 점, 그리고 둘을 분리한 덕에 공통 observation 공간이나 action 표현을 찾을 필요 없이 각각 따로 개선할 수 있다는 점이다.

### 학습

원본 픽셀과 텍스트 명령에서 연속 action으로 가는 경로를 표준 회귀 손실 하나로 end-to-end 학습한다. S1을 조건 짓는 latent 벡터를 통해 S1에서 S2로 그래디언트가 역전파되므로 두 모듈이 함께 최적화된다. 학습 단계는 하나뿐이고 별도의 action head나 과제별 fine-tuning 단계가 없다.

학습 시점에 S1과 S2의 입력 사이에 시간 오프셋을 넣는다. 배포 환경에서 두 모듈의 추론 지연 차이만큼을 맞춰 둔 값이라, 실시간 제어 조건이 학습에도 반영된다.

### 추론

로봇마다 저전력 임베디드 GPU 두 장을 싣고 S2와 S1을 각각 전용 GPU에 올린다. S2는 비동기 백그라운드 프로세스로 돌면서 최신 observation과 자연어 명령을 소비해 공유 메모리의 latent 벡터를 계속 갱신한다. S1은 별도의 실시간 프로세스로 200Hz 제어 루프를 유지하며 최신 observation과 가장 최근의 S2 latent를 함께 받는다. 두 모듈의 속도 차이가 자연히 S1 쪽에 더 촘촘한 observation 해상도를 주고, 이 구성이 학습에서 넣은 시간 오프셋과 같은 모양이라 학습-추론 분포 간극이 줄어든다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

숫자로 제시되는 결과는 사실상 하나, 200Hz로 35-DoF action space를 조율한다는 것뿐이다. 나머지는 영상과 정성 서술이다.

상체 전체 제어에서 어려운 지점을 머리와 몸통으로 짚는다. 둘이 움직이면 로봇이 닿을 수 있는 범위와 볼 수 있는 범위가 동시에 바뀌어 되먹임이 생기고, 역사적으로 이것이 불안정성의 원인이었다는 설명이다. Video 3에서는 손을 머리로 따라보면서 몸통으로 팔 뻗기 자세를 잡고 그러는 동안 손가락 제어를 유지한다.

다중 로봇 협업은 두 대의 Figure 로봇이 처음 보는 식료품을 함께 정리하는 zero-shot 시나리오다. 두 로봇이 같은 가중치로 실행되고 로봇별 학습이나 역할 지정이 없다. 협조는 "쿠키 봉지를 오른쪽 로봇에게 건네라", "왼쪽 로봇에게서 쿠키 봉지를 받아 열린 서랍에 넣어라" 같은 자연어 지시로 이뤄진다.

"pick up anything"은 emergent capability로 보고된다. "Pick up the [X]" 한 마디로 유리 제품과 장난감과 공구와 의류를 포함해 어질러진 환경의 새 물건 수천 개를 다뤘다고 한다. 인상적인 사례로 "사막에 있는 물건을 집어라"를 든다. Helix가 장난감 선인장이 그 추상적 개념에 맞는다는 것을 알아보고, 더 가까운 쪽 손을 고른 뒤 잡는 데 필요한 모터 명령을 낸다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

글이 스스로 밝히는 한계는 짧다. 초기 결과라는 것, 가능한 것의 표면만 확인했다고 보는 것, 그리고 Helix를 1,000배 이상으로 키웠을 때 무슨 일이 벌어질지 궁금하다는 것이다.

자료로서의 빈틈이 더 크다. 성공률과 시행 횟수와 비교 대상이 없어 "처음 보는 물건 수천 개"가 어느 정도 신뢰도인지 알 수 없다. S2로 쓴 7B 오픈웨이트 VLM의 이름을 밝히지 않고, 시뮬레이션에서 했다는 S1 시각 backbone의 pre-training 세부도 없다. 저전력 임베디드 GPU가 무엇인지, 500시간 데이터의 과제 구성이 어떻게 되는지도 나오지 않는다. 비교로 언급하는 "기존 VLA 데이터셋의 5% 미만"에서 그 데이터셋이 무엇인지도 특정하지 않는다.

## 6. 관련 연구 (Related Work)

인용이 없다. 이름을 대는 선행 연구가 하나도 없고, "prior VLA approaches", "conventional robot imitation learning" 같은 범주로만 지칭한다. 비교 위치를 잡으려면 wiki 안의 다른 페이지를 봐야 한다.

action tokenization을 쓰는 쪽으로 언급되는 계열은 [[brohan-2023-rt-2-vision-language-action-models-transfer-web]]과 [[kim-2024-openvla-an-open-source-vision-language-action-model]]이다. 연속 제어를 붙인 쪽으로는 [[black-2024-pi0-a-vision-language-action-flow-model]]이 flow matching을 쓴다. 같은 dual-system 분업을 한 달 뒤 논문 형태로 공개한 것이 [[nvidia-2025-gr00t-n1-an-open-foundation]]이며, GR00T N1은 Eagle-2 VLM 10Hz에 flow-matching DiT 120Hz다.

## 7. 용어집 (Glossary)

도메인 공통 용어는 [[glossary-physical-ai]]에 위임하고 이 자료 고유의 표현만 적는다.

- **System 1 / System 2**: Kahneman의 이중 과정 은유를 그대로 쓴 모듈 이름. S2는 느리게 생각하는 의미 추론, S1은 빠르게 반응하는 visuomotor policy를 맡는다. 이 글에서 S1과 S2는 항상 이 두 모듈을 가리킨다.
- **hindsight instruction**: 이미 수집된 영상을 보고 "이 동작을 시키려면 어떤 지시를 내렸을까"를 되물어 사후에 붙인 자연어 지시문. auto-labeling VLM이 생성한다.
- **percentage task completion**: S1의 action 벡터에 덧붙인 합성 차원. 과제가 얼마나 진행됐는지를 출력해 Helix가 스스로 종료 시점을 판단하게 한다.
- **latent 통신**: S2가 압축한 연속값 벡터 하나를 공유 메모리에 두고 S1이 읽어 가는 방식. 두 모듈 사이의 유일한 인터페이스이자 그래디언트가 흐르는 통로다.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | Figure 1. 세 방식의 스케일링 곡선 (3840×2161 원본) | fetched | ★ wiki 권장 (핵심 주장 도식) |
| fig02 | 전체 페이지 스크린샷 | screenshot | (아카이브용) |
| fig03 | Figure 1 크롭 + 원문 캡션 (966px) | crop | (fig01과 중복) |
| fig04 | Figure 1 크롭, 캡션 없음 (926px) | crop | (fig01과 중복) |
| fig05 | Video 2 자리 (검은 화면) | crop | (제외) |
| fig06 | Video 3 첫 프레임, 로봇 두 대의 냉장고 정리 | crop | ○ 선택 가능 (하드웨어와 과제 감각) |
| fig07 | Video 4 자리 (검은 화면) | crop | (제외) |
| fig08 | Video 5 자리 (검은 화면) | crop | (제외) |

이 페이지의 핵심 도식인 System 1 / System 2 구조도는 iframe 안에 있어 수집되지 않았다. 같은 도식을 [[9bow-2025-helix-generalist-humanoid-vla]]의 fig02로 확보했으므로 wiki 본문에서는 9bow 페이지의 사본을 참조한다.
