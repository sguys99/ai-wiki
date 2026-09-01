---
title: "Helix: A Vision-Language-Action Model for Generalist Humanoid Control"
type: article
year: 2025
category: physical-ai
source: figure-ai-2025-helix-a-vision-language-action.md
raw_path: raw/articles/figure-ai-2025-helix-a-vision-language-action.md
raw_filename: "figure-ai-2025-helix-a-vision-language-action.md"
source_collection: external
author: "Figure AI"
url: "https://www.figure.ai/news/helix"
publisher: "Figure AI News"
publication_date: "2025-02-20"
tags: [physical-ai, vla, humanoid, manipulation]
figures:
  - id: fig01
    file: assets/figure-ai-2025-helix-a-vision-language-action/fig01.webp
    raw: raw/articles/figure-ai-2025-helix-a-vision-language-action-figures/fig01.webp
    caption: "Figure 1 — 새 기술을 얻는 세 방식의 스케일링 곡선 (PhD 시간 · 수집 데이터 · Helix의 언어 지정)"
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
    caption: "Figure 1 크롭 (원문 캡션 포함, 966px 저해상도 — fig01과 중복)"
    strategy: crop
    curated: false
  - id: fig04
    file: assets/figure-ai-2025-helix-a-vision-language-action/crop02.png
    raw: raw/articles/figure-ai-2025-helix-a-vision-language-action-figures/crop02.png
    caption: "Figure 1 크롭 (캡션 없음 — fig01과 중복)"
    strategy: crop
    curated: false
  - id: fig05
    file: assets/figure-ai-2025-helix-a-vision-language-action/crop03.png
    raw: raw/articles/figure-ai-2025-helix-a-vision-language-action-figures/crop03.png
    caption: "Video 2 자리 (재생 전 검은 화면 — 캡션만 남음)"
    strategy: crop
    curated: false
  - id: fig06
    file: assets/figure-ai-2025-helix-a-vision-language-action/crop04.png
    raw: raw/articles/figure-ai-2025-helix-a-vision-language-action-figures/crop04.png
    caption: "Video 3 첫 프레임 — Figure 로봇 두 대가 냉장고에 장을 넣는 장면"
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

## 요약 (Summary)

Figure AI가 2025년 2월에 공개한 휴머노이드 상체 제어용 VLA다. 손목·손가락·몸통·머리를 포함한 상체 전체를 자연어 명령으로 몰고, 두 대의 로봇에서 같은 가중치로 동시에 돌며, 과제별 fine-tuning 없이 한 벌의 가중치로 물건 집기부터 냉장고 조작까지 처리한다고 주장한다.

논문이 아니라 회사 블로그 발표문이다. 대응하는 arXiv 공개가 붙어 있지 않고 성공률 표도, 기존 VLA와의 벤치마크 대조도, ablation도 없다. 그래서 이 페이지는 결과 검증보다 설계 선택을 읽는 자료로 다룬다. 무엇을 분리했고 무엇을 하나로 묶었는지가 이 글의 내용이다.

같은 dual-system 분업이 한 달 뒤 [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation|GR00T N1]]에서 논문 형태로 나온다. 두 자료를 나란히 두면 2025년 상반기 휴머노이드 VLA가 어디로 수렴하고 있었는지가 보인다.

## 스케일링 방식을 바꾼다는 주장 (The Scaling Argument)

글이 문제로 잡는 것은 성능이 아니라 새 동작을 얻는 비용이다. 지금까지 로봇에 동작 하나를 가르치려면 박사급 인력의 수작업 프로그래밍 몇 시간이 들거나 demonstration 수천 건이 필요했다. demonstration은 사람이 만들어준 모범 실행 데이터를 말한다. 가정이라는 문제 공간의 크기를 생각하면 둘 다 감당이 안 되는 방식이다.

![[assets/figure-ai-2025-helix-a-vision-language-action/fig01.webp]]
*Figure 1: 새 기술을 얻는 세 방식의 스케일링 곡선. 전통적 방식은 PhD 시간에, imitation learning은 수집 데이터에 비례하고, Helix는 프로그래밍도 demonstration도 없이 언어로 지정한다 (Figure AI 2025)*

Helix가 팔려는 것은 이 곡선의 교체다. VLM이 웹에서 얻은 상식을 로봇 제어로 바로 옮길 수 있다면, 수백 건의 demonstration이 필요하던 새 기술을 말 한마디로 지정할 수 있다는 논리다.

## System 1 / System 2

이 글의 핵심 설계는 속도와 일반성을 서로 다른 모듈에 맡긴 것이다. VLM backbone은 범용이지만 느리고, 로봇 visuomotor policy는 빠르지만 좁다. visuomotor policy는 이미지를 직접 받아 모터 명령을 내는 policy를 말한다. Helix는 이 둘을 각자의 시간 척도에 두고 latent 벡터 하나로만 잇는다.

![[assets/9bow-2025-helix-generalist-humanoid-vla/fig02.jpeg]]
*Helix 구조도: 카메라 이미지와 텍스트 명령, 관절 각도·손가락 위치가 System 2(7B pretrained VLM, GPU 2)로 들어가고, 7-9Hz로 갱신되는 latent 벡터가 System 1(80M Transformer, GPU 1)로 건네져 200Hz 제어가 나온다. 원문 페이지에서는 이 도식이 iframe 안에 있어 수집되지 않았고, [[physical-ai/9bow-2025-helix-generalist-humanoid-vla|9bow의 한국어 소개]]에 실린 사본이다*

control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다. S2가 7–9Hz, S1이 200Hz로 돈다.

S2는 인터넷 규모로 pre-training된 7B 오픈웨이트 VLM이다. 단안 카메라 이미지와 로봇 상태를 vision-language 임베딩 공간으로 투영해 받고, 자연어 명령과 합쳐 과제에 필요한 의미 정보를 연속값 latent 벡터 하나로 압축한다. 로봇 상태는 손목 pose와 손가락 위치다. 모델 이름은 밝히지 않는다.

S1은 80M 규모의 cross-attention 인코더-디코더 Transformer다. 시각 처리는 시뮬레이션에서만 pre-training한 fully convolutional 다중 스케일 backbone이 맡는다. S2가 넘긴 latent를 S1의 토큰 공간으로 투영해 S1 자신의 시각 특징과 시퀀스 차원에서 이어 붙이는 방식으로 과제 조건이 걸린다. 출력은 손목 pose 목표, 손가락 굽힘과 벌림, 몸통과 머리 방향 목표다.

여기에 "과제 완료 비율"이라는 합성 차원을 action에 하나 더 붙였다. Helix가 자기 종료 조건을 스스로 예측하므로 학습된 동작 여러 개를 이어 붙이기 쉬워진다.

분리의 실익을 글은 네 가지로 정리한다. 단일 과제 behavioral cloning policy 수준의 속도를 내면서 처음 보는 물체로 zero-shot 일반화한다는 것, 고차원 action space에 연속값을 직접 내보내 기존 VLA의 action 토큰화를 피한다는 것, S2가 오픈소스 VLM이고 S1이 평범한 Transformer라 구조가 단순하다는 것, 그리고 공통 observation 공간이나 action 표현을 억지로 맞출 필요 없이 두 모듈을 따로 개선할 수 있다는 것이다.

## 데이터와 학습 (Data and Training)

teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다. 여러 로봇과 여러 조작자에게서 이렇게 모은 약 500시간이 학습 데이터 전부다. 자연어와 짝지으려고 auto-labeling VLM에 로봇 카메라 영상을 잘라 넣고 "이 영상 속 동작을 시키려면 어떤 지시를 내렸겠는가"를 물어 지시문을 사후에 붙였다. 학습 중 다룬 물건은 평가에서 전부 뺐다고 밝힌다.

학습은 원본 픽셀과 텍스트에서 연속 action으로 가는 경로를 표준 회귀 손실 하나로 end-to-end로 한다. S1을 조건 짓는 latent 벡터를 통해 S1에서 S2로 그래디언트가 역전파되므로 두 모듈이 함께 최적화된다. 학습 단계는 하나뿐이고 별도의 action head나 과제별 fine-tuning 단계가 없다.

눈에 띄는 세부는 시간 오프셋이다. 학습 시점에 S1과 S2의 입력 사이에 간격을 넣는데, 이 값을 배포 환경의 추론 지연 차이에 맞춰 잡았다. 실시간 제어 조건을 학습 분포 안에 미리 넣어 두는 방식이다.

배포도 같은 모양이다. 로봇마다 저전력 임베디드 GPU 두 장을 싣고 S2와 S1을 각각 전용 GPU에 올린다. S2는 비동기 백그라운드 프로세스로 최신 observation과 명령을 소비하며 공유 메모리의 latent 벡터를 계속 갱신하고, S1은 별도의 실시간 프로세스로 200Hz 루프를 유지하며 최신 observation과 가장 최근 latent를 함께 받는다. 두 모듈의 속도 차이가 자연히 S1 쪽에 더 촘촘한 observation 해상도를 준다.

## 결과 (Results)

숫자로 나오는 것은 200Hz로 35-DoF action space를 조율한다는 한 줄뿐이다. 나머지는 영상과 정성 서술이다.

![[assets/figure-ai-2025-helix-a-vision-language-action/crop04.png]]
*Video 3 첫 프레임: 로봇 두 대가 냉장고에 장을 넣는다. 상체 전체 제어가 실제로 무엇을 뜻하는지 보여주는 장면 (Figure AI 2025)*

상체 전체 제어에서 어려운 지점으로 머리와 몸통을 짚는다. 둘이 움직이면 로봇이 닿는 범위와 보는 범위가 동시에 바뀌어 되먹임이 생기고, 이것이 역사적으로 불안정성의 원인이었다는 설명이다. 시연에서는 손을 머리로 따라보면서 몸통으로 팔 뻗기 자세를 잡고 그동안 손가락 제어를 유지한다.

다중 로봇 협업은 Figure 로봇 두 대가 처음 보는 식료품을 함께 정리하는 zero-shot 시나리오다. 두 로봇이 같은 가중치로 돌고 로봇별 학습이나 역할 지정이 없다. 조율은 "쿠키 봉지를 오른쪽 로봇에게 건네라", "왼쪽 로봇에게서 쿠키 봉지를 받아 열린 서랍에 넣어라" 같은 자연어 지시로 이뤄진다.

"pick up anything"은 창발 능력으로 보고된다. "Pick up the [X]" 한 마디로 유리 제품·장난감·공구·의류를 포함해 어질러진 환경의 새 물건 수천 개를 다뤘다고 한다. 대표 사례가 선인장이다. "사막에 있는 물건을 집어라"라고 하면 장난감 선인장이 그 추상적 개념에 맞는다는 것을 알아보고, 더 가까운 쪽 손을 골라 잡는 데 필요한 모터 명령까지 낸다.

## 이 글이 말하지 않는 것 (What's Missing)

블로그가 밝히는 한계는 초기 결과라는 것과 1,000배로 키워보고 싶다는 것 정도다. 인용도 없다. 이름을 대는 선행 연구가 하나도 없고 "prior VLA approaches" 같은 범주로만 지칭한다.

검증에 필요한 정보가 여럿 비어 있다. 성공률·시행 횟수·비교 대상이 없어 "처음 보는 물건 수천 개"의 신뢰도를 가늠할 수 없다. S2로 쓴 7B 오픈웨이트 VLM의 이름, 시뮬레이션에서 했다는 S1 시각 backbone의 pre-training 세부, 임베디드 GPU의 정체, 500시간 데이터의 과제 구성이 모두 빠져 있다. "기존 VLA 데이터셋의 5% 미만"이라고 할 때 그 데이터셋이 무엇인지도 특정하지 않는다.

배치 실적 쪽 숫자는 나중에 다른 자료에서 나온다. [[physical-ai/sa-2026-vision-language-action-models-for|Chef Robotics의 bimanual manipulation 서베이]]가 BMW 라인의 Figure 02/Helix 배치를 1,250시간 이상, 부품 9만 개, 차량 3만 대로 기록하며 가장 VLA-native한 산업 배치로 분류한다. 동시에 배치 규모가 가장 큰 시스템일수록 VLA 성격이 옅다는 반비례도 함께 짚는다.

## 관련 페이지 (Related Pages)

- [[physical-ai/9bow-2025-helix-generalist-humanoid-vla]] — 같은 발표의 한국어 소개. 원문에서 못 건진 S1/S2 구조도가 여기에 있다
- [[physical-ai/cui-2025-openhelix-a-short-survey-empirical]] — Helix를 오픈소스로 재현하려는 dual-system VLA 서베이 겸 모델. System 1이 실시간 perception 입력을 직접 받는지를 dual-system 판정 기준으로 삼는데, S1이 이미지를 직접 받는 Helix는 이 기준을 통과하고 π0·GR00T N1은 빠진다. 마지막 절이 Helix 완전 재현까지 남은 일 다섯 항목으로 닫힌다
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — 한 달 뒤 공개된 NVIDIA의 dual-system VLA. Eagle-2 VLM 10Hz에 flow-matching DiT 120Hz로, 같은 분업을 논문과 오픈 가중치로 낸 쪽이다
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]] — Helix가 피했다고 말하는 action 토큰화 계열의 원형
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]] — 같은 토큰화 계열의 오픈소스 구현
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]] — 연속 action 출력이라는 같은 선택을 flow matching으로 푼 쪽
- [[physical-ai/sa-2026-vision-language-action-models-for]] — Figure 02/Helix의 BMW 배치 실적을 기록한 서베이
- [[overviews/glossary-physical-ai]] — 이 페이지의 전문 용어 canonical 표기
