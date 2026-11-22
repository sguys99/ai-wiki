---
title: "[Physical AI Seminar] C03-S02: DiT + FAST"
type: video
year: 2026
category: physical-ai
raw_path: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast.md
raw_filename: "dsba-2026-physical-ai-seminar-c03-s02-dit-fast.md"
source_collection: external
channel: "서울대학교 산업공학과 DSBA 연구실"
presenter: "이준기 박사과정"
url: "https://www.youtube.com/watch?v=8HOsWoiHzvo"
curriculum_url: "https://uye01.github.io/physical-ai-curriculum-2026/#c03-s02"
upload_date: "2026-11-16"
duration: "PT37M57S"
tags: [physical-ai, vla, robot-learning]
figures:
  - id: slide03
    label: Slide 3
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide03.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide03.png
    timestamp: "00:52"
    strategy: keyframe
    caption: "노이즈 수준을 높이는 과정과 원래 더한 노이즈를 맞히는 학습"
    curated: false
  - id: slide04
    label: Slide 4
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide04.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide04.png
    timestamp: "01:25"
    strategy: keyframe
    caption: "생성 중인 값에서의 속도 벡터와 노이즈 분포에서 데이터 분포로 가는 경로"
    curated: true
  - id: slide08
    label: Slide 8
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide08.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide08.png
    timestamp: "04:36"
    strategy: keyframe
    caption: "조건을 준 노이즈 예측과 조건을 뺀 예측을 조합하는 식"
    curated: false
  - id: slide09
    label: Slide 9
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide09.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide09.png
    timestamp: "05:44"
    strategy: keyframe
    caption: "이미지를 압축한 뒤 latent에서 노이즈를 제거하는 구조"
    curated: false
  - id: slide10
    label: Slide 10
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide10.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide10.png
    timestamp: "06:26"
    strategy: keyframe
    caption: "공간 격자를 패치로 나누고 순서가 있는 토큰열로 펼치는 과정"
    curated: true
  - id: slide15
    label: Slide 15
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide15.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide15.png
    timestamp: "10:35"
    strategy: keyframe
    caption: "조건별 배율을 잔차 경로에 곱하는 adaLN-Zero 블록"
    curated: true
  - id: slide16
    label: Slide 16
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide16.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide16.png
    timestamp: "11:28"
    strategy: keyframe
    caption: "DiT 네 크기의 블록 수, 내부 차원, attention head 수"
    curated: false
  - id: slide17
    label: Slide 17
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide17.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide17.png
    timestamp: "12:21"
    strategy: keyframe
    caption: "마지막 토큰열을 공간 격자로 되돌리고 노이즈와 공분산을 분리하는 출력부"
    curated: false
  - id: slide19
    label: Slide 19
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide19.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide19.png
    timestamp: "14:06"
    strategy: keyframe
    caption: "네 조건 주입 방식의 학습 스텝별 FID 비교"
    curated: true
  - id: slide21
    label: Slide 21
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide21.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide21.png
    timestamp: "16:15"
    strategy: keyframe
    caption: "모델 크기와 패치 크기를 각각 고정했을 때의 학습 곡선"
    curated: false
  - id: slide22
    label: Slide 22
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide22.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide22.png
    timestamp: "16:55"
    strategy: keyframe
    caption: "DiT 12개 구성의 순전파 연산량과 FID 사이의 상관계수 −0.93"
    curated: true
  - id: slide23
    label: Slide 23
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide23.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide23.png
    timestamp: "17:35"
    strategy: keyframe
    caption: "누적 학습 연산량이 같을 때 DiT 구성별 FID 차이"
    curated: false
  - id: slide24
    label: Slide 24
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide24.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide24.png
    timestamp: "18:27"
    strategy: keyframe
    caption: "ImageNet 두 해상도에서 guidance 강도에 따른 생성 품질과 다양성"
    curated: true
  - id: slide26
    label: Slide 26
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide26.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide26.png
    timestamp: "19:48"
    strategy: keyframe
    caption: "개별 시점의 구간 토큰화에서 control frequency별 과제 점수 변화"
    curated: false
  - id: slide28
    label: Slide 28
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide28.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide28.png
    timestamp: "22:37"
    strategy: keyframe
    caption: "동일한 곡선에서 샘플 수를 늘렸을 때 두 토큰화 방식의 예측 차이"
    curated: true
  - id: slide30
    label: Slide 30
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide30.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide30.png
    timestamp: "25:25"
    strategy: keyframe
    caption: "분위수 정규화부터 정수 계수 병합까지의 FAST 처리 순서"
    curated: false
  - id: slide31
    label: Slide 31
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide31.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide31.png
    timestamp: "26:47"
    strategy: keyframe
    caption: "두 시계열의 주파수 계수를 양자화하고 열 순서로 펼쳐 압축한 예"
    curated: true
  - id: slide33
    label: Slide 33
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide33.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide33.png
    timestamp: "29:18"
    strategy: keyframe
    caption: "로봇별 분포와 제어 주기가 다른 데이터를 1초 명령 묶음으로 다루는 FAST+"
    curated: false
  - id: slide34
    label: Slide 34
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide34.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide34.png
    timestamp: "30:15"
    strategy: keyframe
    caption: "시뮬레이션과 실제 로봇 과제의 평가 요구 사항 및 control frequency"
    curated: false
  - id: slide35
    label: Slide 35
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide35.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide35.png
    timestamp: "30:44"
    strategy: keyframe
    caption: "복원 오차를 맞춘 네 데이터셋의 1초당 평균 토큰 수와 압축 배율"
    curated: true
  - id: slide36
    label: Slide 36
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide36.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide36.png
    timestamp: "31:38"
    strategy: keyframe
    caption: "같은 모델에서 네 토큰화 방식으로 학습한 과제별 성공률과 진행률"
    curated: true
  - id: slide37
    label: Slide 37
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide37.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide37.png
    timestamp: "33:00"
    strategy: keyframe
    caption: "새 로봇을 포함한 FAST+의 압축률과 데이터셋별 FAST와의 수행 성능 비교"
    curated: false
  - id: slide38
    label: Slide 38
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide38.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide38.png
    timestamp: "33:47"
    strategy: keyframe
    caption: "OpenVLA에 FAST를 적용한 결과와 BPE를 제외한 결과"
    curated: true
  - id: slide39
    label: Slide 39
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide39.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide39.png
    timestamp: "35:05"
    strategy: keyframe
    caption: "개별 과제에서 π₀-FAST와 flow matching 기반 π₀의 학습량별 비교"
    curated: true
  - id: slide40
    label: Slide 40
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-c03-s02-dit-fast/slide40.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-c03-s02-dit-fast-figures/slide40.png
    timestamp: "35:56"
    strategy: keyframe
    caption: "동일한 데이터 혼합으로 학습한 범용 모델의 과제별 진행률"
    curated: true
---

## 한 줄 요약 (One-line Summary)

DiT는 이미지 생성에 쓰는 신경망의 구조와 연산량을, FAST는 로봇의 연속 제어 명령을 토큰으로 바꾸는 방식을 실험한다. 각각 구조와 출력 표현을 바꾸면 같은 학습 목표에서도 결과가 달라진다.

## 1. 자료 정보 (Document Information)

서울대학교 산업공학과 DSBA 연구실 이준기 박사과정이 2026년 11월 16일 발표한 37분 57초 강의다. 위키 시리즈의 세 번째 영상이며 커리큘럼에서는 C03-S02에 해당한다. [세미나](https://www.youtube.com/watch?v=8HOsWoiHzvo) / [커리큘럼](https://uye01.github.io/physical-ai-curriculum-2026/#c03-s02)

| 구간 | 주제 |
|---|---|
| 00:00부터 | diffusion과 flow matching의 학습 신호 |
| 약 02:00부터 | DiT의 latent 패치, 조건 주입, 연산량과 ImageNet 실험 |
| 약 19:00부터 | FAST의 동기, 곡선 예측 실험, 압축 절차 |
| 약 29:00부터 | FAST+, 압축률, 로봇 평가와 학습 비용 |
| 약 36:40부터 | 학습 목표, 네트워크, 신호 표현의 구분 |

## 2. 주요 기여 (Key Contributions)

- DiT는 diffusion에 쓰던 U-Net을 Transformer로 교체하고 조건 주입 방법 4종을 비교했다. 패치 크기를 바꿔 파라미터 수가 비슷한 상태에서도 연산량을 조절했다.
- FAST는 로봇이 출력하는 제어 명령인 action을 1초 단위로 묶는다. 여러 시점에 반복되는 정보를 제거해 다음 토큰을 맞히는 학습에서 움직임의 변화를 더 잘 포착하게 했다.
- RT-1과 RT-2가 사용한 시점별 구간 표현과 비교할 때, 토큰 수와 정밀한 과제의 수행 결과를 함께 볼 수 있다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

DiT는 미리 학습한 VAE를 고정하고 그 압축 표현인 latent를 패치로 나눈다. 노이즈 수준과 이미지 클래스를 블록에 전달하는 방법은 입력에 조건 토큰을 붙이는 방식, cross-attention, adaLN, adaLN-Zero다. 마지막 방식은 잔차 경로의 기여를 0에서 시작한다. 출력 토큰을 공간 격자로 되돌려 노이즈와 대각 공분산을 예측한다.

FAST는 각 차원의 학습 데이터 1%, 99% 분위수를 −1, 1에 대응시키고 시간 방향으로 이산 코사인 변환(DCT)을 적용한다. 계수를 일정 배율로 확대해 반올림한 뒤 모든 차원의 저주파 계수부터 나열한다. BPE는 자주 붙어 나오는 정수들을 더 짧은 토큰열로 병합한다. FAST+는 여러 로봇의 명령 묶음 약 100만 개로 학습한 어휘를 고정한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

| 실험 | 비교 조건 | 결과 |
|---|---|---|
| DiT 스케일링 | 모델 크기 4종, 패치 크기 3종, 40만 학습 스텝 | 순전파 연산량과 FID의 상관계수 −0.93 |
| DiT-XL/2 | 클래스 조건, guidance 1.5 | ImageNet 256×256 FID 2.27, 512×512 FID 3.04 |
| 곡선 예측 | 같은 점 4개를 지나는 곡선을 25~800개 시점으로 샘플링 | 800개에서 개별 구간 방식은 첫 값을 반복했고 DCT 표현은 곡선을 따라갔다 |
| 1초 평균 토큰 수 | 비슷한 복원 오차, 개별 구간 방식과 FAST 순서 | BridgeV2 35→20개, DROID 105→29개, Table Bussing 140→28개, Shirt Fold 700→53개 |
| 로봇 실험 | π₀ 계열의 같은 backbone에서 토큰화만 교체 | 빠른 제어가 필요한 과제에서 FAST와 FAST+가 개별 구간 방식보다 높은 점수를 기록했다 |
| 대규모 혼합 데이터 | π₀와 π₀-FAST | 평균 과제 진행률이 비슷한 수준에 이르는 데 π₀-FAST가 사용한 GPU 학습 시간은 약 5분의 1이었다 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

DiT의 FID는 이미지 분포 간 거리를 재므로 로봇 과제 성공률로 해석할 수 없다. FAST의 양자화에는 복원 오차가 있으며 학습 시간 절감과 실행 중 추론 지연도 구분해야 한다. 토큰을 순서대로 생성하는 π₀-FAST는 한 묶음의 명령을 함께 갱신하는 π₀보다 추론이 느리다. FAST+의 일부 학습 데이터와 평가 데이터에는 겹침이 있다.

## 6. 관련 연구 (Related Work)

- [[physical-ai/dsba-2026-physical-ai-seminar-ch1-quick-tour|세미나 1편]]은 제어 주기, 명령 표현, 여러 시점을 묶는 방법을 소개한다.
- [[physical-ai/dsba-2026-physical-ai-seminar-c02-s01-rt-1-rt-2|세미나 2편]]은 한 시점의 명령을 차원별 구간 토큰으로 예측하는 기준을 제공한다.
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model|π₀]]는 FAST 실험에서 연속 출력과 이산 출력을 비교하는 기준 모델이다.

## 7. 용어집 (Glossary)

| 용어 | 강의에서의 의미 |
|---|---|
| DiT-XL/2 | XL 크기의 Transformer가 한 변 2칸인 latent 패치를 처리하는 DiT 구성 |
| adaLN-Zero | 조건에 따라 정규화 출력을 조절하고 잔차 경로를 0으로 초기화하는 블록 |
| DCT | 시간에 따른 값을 여러 주파수의 코사인 계수로 표현하는 변환 |
| FAST | 로봇 명령 묶음을 주파수 계수와 BPE로 압축하는 토큰화 방법 |
| FAST+ | 여러 로봇에서 학습한 공통 어휘를 재사용하는 FAST 토크나이저 |

## 8. 그림 후보 (Figure Candidates)

| id | 영상 시각 | 캡션 | 추출 방식 | 수록 |
|---|---|---|---|---|
| slide03 | 00:52 | 노이즈 수준을 높이는 과정과 원래 더한 노이즈를 맞히는 학습 | keyframe | 원본 보관 |
| slide04 | 01:25 | 생성 중인 값에서의 속도 벡터와 노이즈 분포에서 데이터 분포로 가는 경로 | keyframe | 위키 본문 |
| slide08 | 04:36 | 조건을 준 노이즈 예측과 조건을 뺀 예측을 조합하는 식 | keyframe | 원본 보관 |
| slide09 | 05:44 | 이미지를 압축한 뒤 latent에서 노이즈를 제거하는 구조 | keyframe | 원본 보관 |
| slide10 | 06:26 | 공간 격자를 패치로 나누고 순서가 있는 토큰열로 펼치는 과정 | keyframe | 위키 본문 |
| slide15 | 10:35 | 조건별 배율을 잔차 경로에 곱하는 adaLN-Zero 블록 | keyframe | 위키 본문 |
| slide16 | 11:28 | DiT 네 크기의 블록 수, 내부 차원, attention head 수 | keyframe | 원본 보관 |
| slide17 | 12:21 | 마지막 토큰열을 공간 격자로 되돌리고 노이즈와 공분산을 분리하는 출력부 | keyframe | 원본 보관 |
| slide19 | 14:06 | 네 조건 주입 방식의 학습 스텝별 FID 비교 | keyframe | 위키 본문 |
| slide21 | 16:15 | 모델 크기와 패치 크기를 각각 고정했을 때의 학습 곡선 | keyframe | 원본 보관 |
| slide22 | 16:55 | DiT 12개 구성의 순전파 연산량과 FID 사이의 상관계수 −0.93 | keyframe | 위키 본문 |
| slide23 | 17:35 | 누적 학습 연산량이 같을 때 DiT 구성별 FID 차이 | keyframe | 원본 보관 |
| slide24 | 18:27 | ImageNet 두 해상도에서 guidance 강도에 따른 생성 품질과 다양성 | keyframe | 위키 본문 |
| slide26 | 19:48 | 개별 시점의 구간 토큰화에서 control frequency별 과제 점수 변화 | keyframe | 원본 보관 |
| slide28 | 22:37 | 동일한 곡선에서 샘플 수를 늘렸을 때 두 토큰화 방식의 예측 차이 | keyframe | 위키 본문 |
| slide30 | 25:25 | 분위수 정규화부터 정수 계수 병합까지의 FAST 처리 순서 | keyframe | 원본 보관 |
| slide31 | 26:47 | 두 시계열의 주파수 계수를 양자화하고 열 순서로 펼쳐 압축한 예 | keyframe | 위키 본문 |
| slide33 | 29:18 | 로봇별 분포와 제어 주기가 다른 데이터를 1초 명령 묶음으로 다루는 FAST+ | keyframe | 원본 보관 |
| slide34 | 30:15 | 시뮬레이션과 실제 로봇 과제의 평가 요구 사항 및 control frequency | keyframe | 원본 보관 |
| slide35 | 30:44 | 복원 오차를 맞춘 네 데이터셋의 1초당 평균 토큰 수와 압축 배율 | keyframe | 위키 본문 |
| slide36 | 31:38 | 같은 모델에서 네 토큰화 방식으로 학습한 과제별 성공률과 진행률 | keyframe | 위키 본문 |
| slide37 | 33:00 | 새 로봇을 포함한 FAST+의 압축률과 데이터셋별 FAST와의 수행 성능 비교 | keyframe | 원본 보관 |
| slide38 | 33:47 | OpenVLA에 FAST를 적용한 결과와 BPE를 제외한 결과 | keyframe | 위키 본문 |
| slide39 | 35:05 | 개별 과제에서 π₀-FAST와 flow matching 기반 π₀의 학습량별 비교 | keyframe | 위키 본문 |
| slide40 | 35:56 | 동일한 데이터 혼합으로 학습한 범용 모델의 과제별 진행률 | keyframe | 위키 본문 |
