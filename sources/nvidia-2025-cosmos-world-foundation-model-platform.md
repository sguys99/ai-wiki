---
title: "Cosmos World Foundation Model Platform for Physical AI"
type: paper
year: 2025
category: physical-ai
raw_path: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform.pdf
raw_filename: "nvidia-2025-cosmos-world-foundation-model-platform.pdf"
source_collection: external
authors: "NVIDIA"
arxiv_id: "2501.03575"
tags: [physical-ai, world-model, simulator, autonomous-driving]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig01.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig01.png
    caption: "pre-trained WFM과 post-trained WFM의 생성 예시 모음. diffusion과 autoregressive, camera control, manipulation, 자율주행 (Figure 1, p.2)"
    page: 2
    bbox_norm: [0.0947, 0.1089, 0.9053, 0.8078]
    strategy: caption-region
    curated: false
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig02.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig02.png
    caption: "pre-training으로 generalist WFM을 만들고 소량 커스텀 데이터로 post-training해 특정 Physical AI 환경에 특화시키는 2단 구도 (Figure 2, p.3)"
    page: 3
    bbox_norm: [0.0986, 0.0939, 0.9013, 0.4155]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig03.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig03.png
    caption: "WFM의 정의. 과거 observation x(0:t)와 현재 perturbation c(t)로 다음 상태를 예측한다 (Figure 3, p.4)"
    page: 4
    bbox_norm: [0.2491, 0.3934, 0.75, 0.475]
    strategy: caption-region
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig04.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig04.png
    caption: "Cosmos 플랫폼 5개 구성요소, 곧 Video Curator, Tokenizer, pre-trained WFM, post-training 샘플, Guardrail (Figure 4, p.5)"
    page: 5
    bbox_norm: [0.0986, 0.2266, 0.9013, 0.3638]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig05.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig05.png
    caption: "Video Curator 5단계, 곧 split에서 filtering, annotation, 클립 DB, dedup을 거쳐 sharding까지 (Figure 5, p.6)"
    page: 6
    bbox_norm: [0.0986, 0.3739, 0.9013, 0.5111]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig06.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig06.png
    caption: "video tokenization 파이프라인. 인코더가 영상을 토큰으로 압축하고 디코더가 복원한다 (Figure 6, p.11)"
    page: 11
    bbox_norm: [0.0986, 0.4869, 0.9013, 0.6241]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig07.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig07.png
    caption: "continuous 토큰과 discrete 토큰의 차이. 왼쪽은 C차원 임베딩, 오른쪽은 양자화된 정수 인덱스 (Figure 7, p.12)"
    page: 12
    bbox_norm: [0.2037, 0.0974, 0.7618, 0.2942]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig08.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig08.png
    caption: "시공간 압축률 대비 복원 품질(PSNR). Cosmos Tokenizer가 높은 압축에서도 품질 우위 (Figure 8, p.13)"
    page: 13
    bbox_norm: [0.0983, 0.0939, 0.9017, 0.3319]
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig09.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig09.png
    caption: "Cosmos Tokenizer 아키텍처. temporal causality와 wavelet 기반 인코더-디코더 (Figure 9, p.14)"
    page: 14
    bbox_norm: [0.0951, 0.2342, 0.9061, 0.473]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig10.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig10.png
    caption: "TokenBench 예시 영상. egocentric, 주행, robot manipulation, 웹 영상 (Figure 10, p.15)"
    page: 15
    bbox_norm: [0.0947, 0.2165, 0.9053, 0.5457]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig11.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig11.png
    caption: "diffusion WFM(Cosmos-Predict1) 아키텍처. CV8x8x8 토크나이저 latent에 노이즈를 주고 3D patchify 후 self/cross-attention 블록을 N회 반복한다 (Figure 11, p.20)"
    page: 20
    bbox_norm: [0.0947, 0.1733, 0.9053, 0.4981]
    strategy: caption-region
    curated: true
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig12.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig12.png
    caption: "Cosmos-Predict1-7B/14B-Text2World 생성 결과 비교 (Figure 12, p.25)"
    page: 25
    bbox_norm: [0.0952, 0.1978, 0.9029, 0.4176]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig13.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig13.png
    caption: "Cosmos-Predict1-7B/14B-Video2World 생성 결과. 앞 9프레임 조건 (Figure 13, p.26)"
    page: 26
    bbox_norm: [0.0952, 0.107, 0.9029, 0.5247]
    strategy: caption-region
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig14.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig14.png
    caption: "autoregressive WFM(Cosmos-Predict1-Video2World) 아키텍처. DV8x16x16 discrete 토큰에 T5 cross-attention을 결합한 Llama3 계열 구조 (Figure 14, p.28)"
    page: 28
    bbox_norm: [0.1144, 0.0939, 0.8856, 0.3978]
    strategy: caption-region
    curated: true
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig15.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig15.png
    caption: "diffusion decoder 학습. 같은 영상을 discrete와 continuous 두 토크나이저로 이중 토큰화한다 (Figure 15, p.33)"
    page: 33
    bbox_norm: [0.0986, 0.0939, 0.9013, 0.3233]
    strategy: caption-region
    curated: false
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig16.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig16.png
    caption: "diffusion decoder 추론. autoregressive 모델의 출력 토큰을 denoiser 조건으로 넣는다 (Figure 16, p.33)"
    page: 33
    bbox_norm: [0.0986, 0.3714, 0.9013, 0.6008]
    strategy: caption-region
    curated: false
  - id: fig17
    label: Figure 17
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig17.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig17.png
    caption: "Cosmos autoregressive WFM 생성 결과. 상단 4B/12B, 하단 Video2World (Figure 17, p.34)"
    page: 34
    bbox_norm: [0.0952, 0.0932, 0.9029, 0.5359]
    strategy: caption-region
    curated: false
  - id: fig18
    label: Figure 18
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig18.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig18.png
    caption: "diffusion decoder 적용 전후 비교. 하단이 보정된 영상 (Figure 18, p.35)"
    page: 35
    bbox_norm: [0.0971, 0.0932, 0.9029, 0.3228]
    strategy: caption-region
    curated: false
  - id: fig19
    label: Figure 19
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig19.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig19.png
    caption: "autoregressive WFM 실패 사례. 물체(빨간 표시)가 아래에서 갑자기 나타난다 (Figure 19, p.35)"
    page: 35
    bbox_norm: [0.0971, 0.4073, 0.8983, 0.5332]
    strategy: caption-region
    curated: false
  - id: fig20
    label: Figure 20
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig20.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig20.png
    caption: "physics 시나리오 rollout 비교. 각 그룹 위가 시뮬레이션 정답, 아래가 WFM 예측 (Figure 20, p.38)"
    page: 38
    bbox_norm: [0.0958, 0.2152, 0.9027, 0.7136]
    strategy: caption-region
    curated: false
  - id: fig21
    label: Figure 21
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig21.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig21.png
    caption: "camera control 정성 비교. Cosmos와 CamCo의 입력 trajectory와 재추정 trajectory (Figure 21, p.42)"
    page: 42
    bbox_norm: [0.0643, 0.0853, 0.904, 0.7954]
    strategy: caption-region
    curated: false
  - id: fig22
    label: Figure 22
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig22.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig22.png
    caption: "joystick 형태의 camera 입력(전진, 후진, 좌회전, 우회전)에 따른 생성 결과 (Figure 22, p.44)"
    page: 44
    bbox_norm: [0.0947, 0.0989, 0.9052, 0.8331]
    strategy: caption-region
    curated: false
  - id: fig23
    label: Figure 23
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig23.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig23.png
    caption: "같은 입력 이미지와 camera 조건에서 seed만 바꿔 서로 다른 미래를 생성한 결과 (Figure 23, p.45)"
    page: 45
    bbox_norm: [0.1004, 0.0939, 0.8995, 0.8086]
    strategy: caption-region
    curated: false
  - id: fig24
    label: Figure 24
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig24.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig24.png
    caption: "지시문 기반 영상 예측 사람 평가. 네 기준에서 VideoLDM-Instruction 대비 선호도 (Figure 24, p.46)"
    page: 46
    bbox_norm: [0.0934, 0.5116, 0.9078, 0.7883]
    strategy: caption-region
    curated: false
  - id: fig25
    label: Figure 25
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig25.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig25.png
    caption: "Cosmos-1X 데이터셋에서의 지시문 기반 영상 예측 샘플 (Figure 25, p.47)"
    page: 47
    bbox_norm: [0.0963, 0.0933, 0.905, 0.3339]
    strategy: caption-region
    curated: false
  - id: fig26
    label: Figure 26
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig26.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig26.png
    caption: "Bridge 데이터셋에서의 action 기반 다음 프레임 예측 샘플 (Figure 26, p.47)"
    page: 47
    bbox_norm: [0.0952, 0.4027, 0.9039, 0.569]
    strategy: caption-region
    curated: false
  - id: fig27
    label: Figure 27
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig27.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig27.png
    caption: "MultiView 모델이 만든 6개 카메라 뷰 텍스트 조건 생성 결과 (Figure 27, p.50)"
    page: 50
    bbox_norm: [0.0954, 0.0939, 0.9045, 0.5712]
    strategy: caption-region
    curated: false
  - id: fig28
    label: Figure 28
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig28.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig28.png
    caption: "MultiView 모델의 일반화. 학습 분포 밖 장면(얼음 성, 강 위 주행)에서도 6뷰 유지 (Figure 28, p.51)"
    page: 51
    bbox_norm: [0.0954, 0.0939, 0.9045, 0.5428]
    strategy: caption-region
    curated: false
  - id: fig29
    label: Figure 29
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig29.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig29.png
    caption: "trajectory 조건 multi-view 생성. 좌측 입력 trajectory를 따라간다 (Figure 29, p.53)"
    page: 53
    bbox_norm: [0.0949, 0.0933, 0.9071, 0.5068]
    strategy: caption-region
    curated: false
  - id: fig30
    label: Figure 30
    kind: figure
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/fig30.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/fig30.png
    caption: "Cosmos Guardrail 구성. pre-Guard는 키워드 차단과 Aegis, post-Guard는 영상 안전 분류기와 얼굴 블러 (Figure 30, p.54)"
    page: 54
    bbox_norm: [0.0986, 0.0939, 0.9013, 0.2311]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab01.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab01.png
    caption: "shot 분할 알고리즘 비교. PySceneDetect, Panda70M, TransNetV2, AutoShot (Table 1, p.8)"
    page: 8
    bbox_norm: [0.0949, 0.1097, 0.9051, 0.3233]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab02.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab02.png
    caption: "소프트웨어 설정별 transcoding 성능 (Table 2, p.8)"
    page: 8
    bbox_norm: [0.0947, 0.7763, 0.9053, 0.9285]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab03.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab03.png
    caption: "H100 1장에서의 VILA 캡셔닝 추론 처리량 비교 (Table 3, p.10)"
    page: 10
    bbox_norm: [0.0939, 0.379, 0.9081, 0.9285]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab04.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab04.png
    caption: "visual tokenizer 기능 비교. causal, image, video, joint, discrete, continuous (Table 4, p.12)"
    page: 12
    bbox_norm: [0.0939, 0.4683, 0.9081, 0.9285]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab05.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab05.png
    caption: "continuous video 토크나이저 평가 (DAVIS와 TokenBench) (Table 5, p.16)"
    page: 16
    bbox_norm: [0.0947, 0.1097, 0.9069, 0.265]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab06.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab06.png
    caption: "discrete video 토크나이저 평가 (DAVIS와 TokenBench) (Table 6, p.16)"
    page: 16
    bbox_norm: [0.0933, 0.2832, 0.9086, 0.9285]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab07.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab07.png
    caption: "continuous image 토크나이저 평가 (Table 7, p.17)"
    page: 17
    bbox_norm: [0.0947, 0.1097, 0.9197, 0.239]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab08.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab08.png
    caption: "discrete image 토크나이저 평가 (Table 8, p.17)"
    page: 17
    bbox_norm: [0.0947, 0.2678, 0.9115, 0.4231]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab09.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab09.png
    caption: "토크나이저 런타임 성능. 파라미터 수와 이미지 또는 프레임당 인코딩과 디코딩 시간 (Table 9, p.17)"
    page: 17
    bbox_norm: [0.0933, 0.4406, 0.9076, 0.9285]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab10.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab10.png
    caption: "Cosmos WFM 모델 지도. diffusion 4종과 autoregressive 4종, 각 계열의 토크나이저와 enhancer (Table 10, p.18)"
    page: 18
    bbox_norm: [0.094, 0.5251, 0.9081, 0.9285]
    strategy: table-region
    curated: true
  - id: tab11
    label: Table 11
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab11.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab11.png
    caption: "diffusion 계열 Cosmos-Predict1 모델 설정값 (Table 11, p.21)"
    page: 21
    bbox_norm: [0.0939, 0.4675, 0.9081, 0.9285]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab12.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab12.png
    caption: "점진적 학습 단계와 각 단계 사양 (Table 12, p.22)"
    page: 22
    bbox_norm: [0.0933, 0.4103, 0.9081, 0.9285]
    strategy: table-region
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab13.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab13.png
    caption: "Cosmos-Diffusion Transformer의 FLOPs와 활성값 메모리 (Table 13, p.24)"
    page: 24
    bbox_norm: [0.0953, 0.1086, 0.9047, 0.1772]
    strategy: table-region
    curated: false
  - id: tab14
    label: Table 14
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab14.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab14.png
    caption: "autoregressive 계열 Cosmos-Predict1 모델 설정값 (Table 14, p.30)"
    page: 30
    bbox_norm: [0.0939, 0.296, 0.9057, 0.9285]
    strategy: table-region
    curated: false
  - id: tab15
    label: Table 15
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab15.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab15.png
    caption: "Medusa head 개수가 토큰 처리량과 forward pass 수에 미치는 영향 (Table 15, p.31)"
    page: 31
    bbox_norm: [0.0939, 0.4408, 0.9056, 0.9285]
    strategy: table-region
    curated: false
  - id: tab16
    label: Table 16
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab16.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab16.png
    caption: "autoregressive 모델 성능 분석 (640x1024 테스트 영상) (Table 16, p.32)"
    page: 32
    bbox_norm: [0.0947, 0.1204, 0.8891, 0.3339]
    strategy: table-region
    curated: false
  - id: tab17
    label: Table 17
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab17.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab17.png
    caption: "저해상도 적응을 적용한 Cosmos-Predict1-4B 디코딩 처리량 (Table 17, p.32)"
    page: 32
    bbox_norm: [0.0933, 0.4425, 0.9081, 0.9285]
    strategy: table-region
    curated: false
  - id: tab18
    label: Table 18
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab18.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab18.png
    caption: "autoregressive 모델 실패율. image 조건과 9프레임 video 조건 비교 (Table 18, p.36)"
    page: 36
    bbox_norm: [0.0939, 0.1204, 0.9081, 0.9285]
    strategy: table-region
    curated: false
  - id: tab19
    label: Table 19
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab19.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab19.png
    caption: "3D 일관성 평가. Sampson error, pose 추정 성공률, novel view 합성 품질 (Table 19, p.37)"
    page: 37
    bbox_norm: [0.0939, 0.1097, 0.9076, 0.9285]
    strategy: table-region
    curated: true
  - id: tab20
    label: Table 20
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab20.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab20.png
    caption: "physics alignment 결과. 픽셀, feature, 객체 수준 지표로 본 미래 예측 정확도 (Table 20, p.39)"
    page: 39
    bbox_norm: [0.0939, 0.1488, 0.908, 0.9285]
    strategy: table-region
    curated: true
  - id: tab21
    label: Table 21
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab21.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab21.png
    caption: "Sec 6에서 다루는 post-trained WFM 목록과 각 모델의 조건 입력 (Table 21, p.40)"
    page: 40
    bbox_norm: [0.0939, 0.4279, 0.908, 0.9285]
    strategy: table-region
    curated: false
  - id: tab22
    label: Table 22
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab22.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab22.png
    caption: "camera control post-training 정량 비교. CamCo 대비 pose 성공률, 회전과 이동 오차, FID와 FVD (Table 22, p.43)"
    page: 43
    bbox_norm: [0.0939, 0.1097, 0.9081, 0.9285]
    strategy: table-region
    curated: true
  - id: tab23
    label: Table 23
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab23.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab23.png
    caption: "Bridge 데이터셋 action 기반 다음 프레임 예측 평가 (Table 23, p.48)"
    page: 48
    bbox_norm: [0.0939, 0.2528, 0.9081, 0.9285]
    strategy: table-region
    curated: false
  - id: tab24
    label: Table 24
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab24.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab24.png
    caption: "multi-view 주행 영상 생성 평가. FID와 FVD, multi-view 일관성(TSE와 CSE) (Table 24, p.52)"
    page: 52
    bbox_norm: [0.112, 0.1204, 0.8834, 0.284]
    strategy: table-region
    curated: false
  - id: tab25
    label: Table 25
    kind: table
    file: assets/nvidia-2025-cosmos-world-foundation-model-platform/tab25.png
    raw: raw/papers/nvidia-2025-cosmos-world-foundation-model-platform-figures/tab25.png
    caption: "multi-view 주행 영상의 trajectory 일관성 평가 (TAE와 TFE) (Table 25, p.52)"
    page: 52
    bbox_norm: [0.0936, 0.3251, 0.908, 0.9285]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

NVIDIA가 Physical AI 개발자에게 world model을 통째로 넘겨주려고 만든 플랫폼 논문이다. 2천만 시간 분량 영상을 거르는 curation 파이프라인, video 토크나이저, diffusion과 autoregressive 두 계열의 pre-trained 모델 8종, 세 가지 post-training 사례, 안전 장치까지가 한 묶음이고 가중치는 NVIDIA Open Model License로 공개했다.

## 1. 자료 정보 (Document Information)

- 제목: Cosmos World Foundation Model Platform for Physical AI
- 저자: NVIDIA (기여자 명단은 부록 A). arXiv 2501.03575, v3 기준 2025년 7월 9일, 75페이지
- 공개: NVIDIA Cosmos / Cosmos-Predict1. 모델 가중치는 NVIDIA Open Model License
- 학습 자원: H100 10,000장으로 3개월. 논문에 보고된 모든 WFM이 이 클러스터에서 나왔다
- 부속 자산: TokenBench(토크나이저 평가용 영상 세트), ShotBench(shot 분할 평가용)

world model은 환경의 동역학을 학습해 미래를 예측하는 모델이다. 이 논문은 앞에 foundation을 붙여 WFM이라 부르는데, 특정 로봇이 아니라 여러 downstream 환경으로 fine-tuning될 것을 전제로 한 범용 world model이라는 뜻이다. Physical AI는 센서로 세상을 보고 액추에이터로 세상을 바꾸는 AI 시스템을 가리키며, 논문은 이 분야가 데이터 확장에서 막혀 있다는 진단에서 출발한다. 실제 행동을 섞어 데이터를 모아야 하는데 그 행동이 기기와 환경을 망가뜨릴 수 있어서다.

## 2. 주요 기여 (Key Contributions)

pre-training과 post-training을 나눈 구도가 이 논문의 뼈대다. 대규모 다양한 영상으로 generalist WFM을 먼저 만들고, 목표 환경에서 모은 훨씬 작은 "prompt-영상" 쌍으로 특화 모델을 얻는다. prompt 자리에는 텍스트뿐 아니라 action 명령이나 trajectory가 들어갈 수 있다.

나머지 기여는 그 구도를 실제로 돌아가게 만드는 부품들이다.

- 2천만 시간 raw 영상에서 약 1억 개 클립을 뽑는 curation 파이프라인. Ray 기반 스트리밍 오케스트레이션과 GPU의 NVDEC 하드웨어 디코더를 함께 쓴다
- Cosmos Tokenizer: causal 구조의 continuous와 discrete 토크나이저 제품군. 이미지와 영상을 하나의 네트워크로 처리한다
- diffusion 계열 4종과 autoregressive 계열 4종의 pre-trained WFM, 여기에 prompt upsampler와 diffusion decoder를 각각 붙였다
- post-training 사례 셋: camera control로 3D 공간을 이동하기, robot manipulation, 자율주행용 6뷰 동시 생성
- Guardrail: 입력을 막는 pre-Guard와 출력을 막는 post-Guard. red team이 프롬프트-영상 쌍 1만 건 이상을 검증했다
- 평가 도구: 다중 뷰 기하로 3D 일관성을 재는 방식과, 시뮬레이터로 정답 영상을 만들어 물리 준수를 재는 physics alignment 벤치마크

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 문제 설정

WFM은 과거 영상 x(0:t)와 현재 perturbation c(t)를 받아 다음 상태 x(t+1)을 내놓는 함수다. perturbation은 Physical AI가 취한 action일 수도, 무작위 perturbation일 수도, 그 perturbation을 적은 텍스트일 수도 있다. 이 추상화 덕에 텍스트 조건 생성과 action 조건 생성이 같은 틀에 들어간다.

### 데이터 curation

raw 데이터는 720p부터 4k까지 약 2천만 시간이다. 자체 보유분과 공개 인터넷 영상을 섞었고 카테고리 비율은 자연 현상 20%, 손동작과 물체 조작 16%, 공간 인지와 내비게이션 16%, 주행 11%, 사람의 움직임 10%, 1인칭 시점 8%, 역동적 카메라 8%, 합성 렌더링 4%, 기타 7%다.

파이프라인은 다섯 단계다. split은 shot 전환 기준으로 잘라 2초 미만은 버리고 60초 초과는 다시 쪼갠다. 분할 알고리즘 비교에서 학습 기반인 TransNetV2와 AutoShot이 색 히스토그램 임계값 방식(PySceneDetect)이나 Panda70M보다 확실히 앞섰다. filtering은 움직임, 화질, 오버레이 텍스트, 영상 유형 네 항목으로 거른다. annotation은 VLM이 256프레임마다 캡션을 붙인다. 그 뒤 클립 DB에 넣고 의미 기준 중복 제거를 거쳐 해상도와 종횡비별로 sharding한다. 결과는 pre-training용 약 1억 개 클립, fine-tuning용 약 1천만 개 클립이다.

### 토크나이저

토크나이저는 영상을 압축된 토큰으로 바꾸고 다시 복원하는 인코더-디코더다. Cosmos Tokenizer는 wavelet 공간에서 동작하고 시간 방향으로 causal이라 현재 프레임 계산에 미래 프레임을 쓰지 않는다. 이 설계에는 두 가지 이점이 붙는다. 단일 프레임을 넣으면 그대로 이미지 토크나이저가 되므로 이미지와 영상을 함께 학습시킬 수 있고, 인과 순서로 동작하는 Physical AI 시스템과 성격이 맞는다.

두 종류를 만들었다. continuous 쪽은 C차원 임베딩을 내놓고 diffusion 모델이 쓴다(CV8×8×8-720p). discrete 쪽은 FSQ로 6차원 latent를 (8, 8, 8, 5, 5, 5) 레벨로 양자화해 어휘 크기 64,000의 정수 인덱스를 만들고 autoregressive 모델이 쓴다(DV8×16×16-720p). DAVIS 영상에서 기존 최고 대비 PSNR이 4dB 올랐고 최대 12배 빠르며, A100 80GB 한 장에서 1080p 8초 또는 720p 10초를 메모리 초과 없이 한 번에 인코딩한다.

### diffusion 계열 WFM

latent diffusion이고 학습 목표는 EDM의 denoising score matching이다. 노이즈 레벨별 손실을 다중 과제 학습으로 보고, 불확실성 함수 u(σ)를 MLP로 두어 모델이 자신 없어 하는 레벨의 기여를 낮춘다. 네트워크는 DiT를 영상용으로 고친 것으로, latent를 (1, 2, 2) 큐브 단위로 3D patchify한 뒤 self-attention → cross-attention → MLP 블록을 N회 반복하고 adaptive layer norm의 scale과 shift와 gate로 timestep을 주입한다. 위치 정보는 FPS를 반영한 3D RoPE와 학습되는 절대 위치 임베딩을 함께 쓰고, 텍스트는 T5 인코더 출력이 cross-attention으로 들어간다. Text2World를 먼저 학습하고 영상 입력을 추가로 받도록 fine-tuning해 Video2World를 얻는다.

학습용 텍스트 prompt는 VLM이 만든 캡션이라 사람이 쓰는 문장과 분포가 다르다. 이 간극을 메우려고 Mistral-NeMo-12B-Instruct 기반의 prompt upsampler를 따로 두어 사람 prompt를 모델이 선호하는 형태로 바꾼다.

### autoregressive 계열 WFM

Llama3 스타일 GPT를 영상 토큰 예측용으로 처음부터 학습시킨 모델이라 언어 이해 능력은 없다. 텍스트를 쓰려면 T5-XXL 임베딩을 self-attention 층마다 붙인 cross-attention으로 넣는다. 학습 안정성 장치가 둘 붙는데, QKNorm은 query와 key를 정규화한 뒤 학습되는 γ로 스케일해 softmax 포화를 막고, z-loss는 logit 제곱합에 λ=3×10^-4를 곱해 더한다. 저자들은 노드 수를 크게 늘릴 때 z-loss가 그래디언트 norm 유지에 결정적이었다고 적었다.

학습은 3단계다. 1단계는 첫 프레임만 주고 16프레임을 예측하는 17프레임 문맥, 1.1단계는 시간축 RoPE에 YaRN 확장을 걸어 34프레임으로 늘린 것, 2단계는 cross-attention을 새로 초기화해 텍스트 조건을 넣는 단계다. 해상도는 640×1024 고정이고, 끝에 LLM 관행을 따라 고품질 데이터로 학습률을 0까지 선형 감쇠시키는 cooling-down을 3만 회 반복한다. 12B 모델은 파라미터와 그래디언트와 옵티마이저 상태만 약 192GB라 H100 한 장에 안 들어가므로 tensor parallelism과 sequence parallelism으로 쪼갠다. 추론 쪽은 KV 캐시와 torch.compile에 더해 Medusa 방식의 추측 디코딩을 결합했다.

discrete 토크나이저의 압축률이 높다 보니 왜곡이 생긴다. 이를 보정하려고 7B Text2World를 fine-tuning해 DV8×16×16 토큰을 CV8×8×8 공간으로 옮기는 diffusion decoder를 만들었다.

### Guardrail

pre-Guard는 텍스트 쪽이다. WordNet 표제어 추출을 거친 뒤 블록리스트와 대조하는 키워드 차단이 1차이고, Aegis-AI-Content-Safety-LlamaGuard의 defensive 버전이 2차다. post-Guard는 영상 쪽으로, 프레임마다 SigLIP 임베딩을 뽑아 MLP 분류기에 넣고 한 프레임이라도 unsafe면 영상 전체를 막는다. 이어 RetinaFace로 20×20 픽셀보다 큰 얼굴 영역을 픽셀화한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 3D 일관성

RealEstate10K 테스트셋에서 뽑은 정적 장면 500개로 쟀다. 생성 영상은 3D 세계의 2D 투영이므로, 에피폴라 기하 제약이 얼마나 지켜지는지(Sampson error, 카메라 pose 추정 성공률)와 held-out 뷰를 합성했을 때의 품질을 본다.

| 모델 | Sampson error ↓ | pose 추정 성공률 ↑ | PSNR ↑ |
|---|---|---|---|
| VideoLDM | 0.841 | 4.4% | 26.23 |
| Cosmos-Predict1-7B-Text2World | 0.355 | 62.6% | 33.02 |
| Cosmos-Predict1-7B-Video2World | 0.473 | 68.4% | 30.66 |
| 실제 영상(참조) | 0.431 | 56.4% | 35.38 |

pose 추정 성공률은 실제 영상 수치를 넘어선다. 저자들은 이를 화질 개선과 3D 일관성 개선이 함께 반영된 결과로 본다.

### physics alignment

PhysX와 Isaac Sim으로 자유낙하, 경사면, U자 슬로프, 안정 적층, 불안정 적층, 도미노, 시소, 자이로스코프 여덟 시나리오를 만들고, 카메라 4각도로 1080p 100프레임 영상 800개를 렌더해 정답으로 삼았다. 가장 좋은 값은 Cosmos-Predict1-7B-Video2World에 prompt와 9프레임을 준 경우로 PSNR 21.06, 평균 IoU 0.592다. 14B로 키워도 IoU 0.598로 사실상 제자리이고, autoregressive 계열은 IoU 0.48 근처에 몰려 있다. 저자들은 화질은 나아졌지만 물리 준수는 모든 변종이 똑같이 고전한다고 정리하며, 물체가 갑자기 나타나거나 사라지는 문제, 형태 변형, 중력 위반 같은 실패 유형을 나열했다.

### post-training 세 사례

camera control은 DL3DV-10K에 GLOMAP으로 pose를 붙여 학습했고 Plücker 좌표를 latent에 이어 붙이는 방식으로 조건을 준다. CamCo와 비교하면 pose 추정 성공률 43.0% → 82.0%, 회전 오차 8.277° → 1.646°, 이동 오차 0.185 → 0.038, FID 57.49 → 14.30, FVD 433.24 → 120.49로 전 항목이 개선됐다. 학습은 DL3DV-10K, 평가는 RealEstate10K라 분포가 다른데도 그렇다.

robot manipulation은 두 가지다. 지시문(instruction) 조건 영상 예측은 1X의 휴머노이드 EVE가 찍은 200시간 자체 데이터(Cosmos-1X)를 썼고, 평가자 10명이 23개 episode를 놓고 비교한 결과 전체 선호도가 78.3% 대 13.0%로 VideoLDM-Instruction을 앞섰다. action 조건 다음 프레임 예측은 Bridge 데이터셋 episode 2만 개를 쓰고 action을 그리퍼 좌표계 7차원으로 받는다. FVD가 IRASim-Action 593에서 7B 모델 190으로 떨어졌다.

자율주행은 NVIDIA 내부 RDS 데이터셋을 썼다. 6개 카메라로 찍은 20초 클립 약 360만 개, 시간으로 약 2만 시간이고 차량 밀도, 날씨, 조도, 속도, 도로 유형 같은 속성 태그로 분포를 맞춰 뽑았다. 6뷰를 동시에 생성하도록 고친 결과 FID 60.84 → 32.16, FVD 884.46 → 210.23이고, 뷰 내부 시간 일관성(TSE)은 1.24 → 0.68로 실제 영상 0.69에 붙었다. 뷰 사이 일관성(CSE)은 6.48 → 2.11로 실제 영상 1.71에는 아직 못 미친다. trajectory 조건을 추가하면 TSE 0.59, CSE 2.02로 조금 더 좋아진다.

### autoregressive 계열의 실패율

image 한 장만 주면 4B가 15%, 5B-Video2World가 7%, 12B가 2%로 크기를 키울수록 눈에 띄게 준다. 9프레임 영상을 주면 모든 모델이 0~2%로 떨어진다. 조건을 넉넉히 주는 쪽이 파라미터를 늘리는 쪽보다 싸게 먹히는 구간이 있다는 뜻이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자들은 결론에서 현재 모델이 물리 세계의 믿을 만한 시뮬레이터에 못 미친다고 못 박는다. 구체적으로는 물체가 유지되지 않는 문제, 접촉이 많은 상황의 dynamics 부정확, 지시문 따르기의 불일치를 들고, 생성 영상의 사실감이 중력, 빛 상호작용, 유체 같은 기본 물리 원칙 준수로 이어지지는 않는다고 적었다.

평가 자체도 미해결로 남겼다. 물리적 충실도를 사람이 채점할 기준을 세우기 어렵고 개인차가 크며, 그 점수가 downstream Physical AI 과제 지표와 같은 방향으로 움직인다는 보장도 없다. 대안으로는 멀티모달 LLM 기반 자동 평가자와 기존 물리 시뮬레이터를 쓴 재현 가능한 평가를 제시한다.

읽을 때 주의할 대목이 하나 더 있다. 2.1절이 WFM의 쓰임새로 policy 평가, policy 초기화, policy 학습, planning과 model-predictive control, 합성 데이터 생성을 열거하지만 저자들은 이 논문에 그에 대한 실증 결과가 없다고 직접 밝힌다. 이 목록은 주장이 아니라 계획으로 읽어야 한다.

두 계열 비교에서는 지금까지 diffusion이 생성 품질에서 앞선다고 정리한다. camera pose, end-effector 위치, 차량 trajectory 같은 다양한 조건을 붙이기 쉽고 6뷰 같은 새 출력 형식으로도 확장된다는 이유다. 다만 autoregressive 쪽에는 LLM 가중치를 물려받아 사전 지식을 상속받는 길과 causal attention용 추론 최적화 기법을 그대로 쓰는 길이 남아 있어, 두 가능성이 실현되면 우열이 달라질 수 있다고 본다.

## 6. 관련 연구 (Related Work)

world model 개념은 Ha와 Schmidhuber의 2018년 연구에서 왔고, 이후 흐름은 backbone 기준으로 갈린다. 초기 계열과 Dreamer 계보는 오토인코더로 얻은 latent 공간에서 순환 신경망으로 상태 변화를 모델링했다. 최근에는 world model을 시각 공간의 조건부 생성 모델로 보는 쪽이 늘었고, 그 안에서 다시 autoregressive(Genie 등)와 diffusion(GameNGen 등)으로 나뉜다. 이 논문은 두 가지를 모두 만들어 같은 평가에 올렸다는 점이 다르다.

영상 생성 쪽으로는 Sora, Gen-3, Kling, Dream Machine 같은 최근 모델을 배경으로 두고, 비교 실험에서는 VideoLDM을 기준선으로 쓴다. 토크나이저는 FSQ와 causal 구조 선행 연구를 이어받았다. post-training 비교 대상은 camera control의 CamCo, action 조건 예측의 IRASim이다.

## 7. 용어집 (Glossary)

| 용어 | 설명 |
|---|---|
| WFM (world foundation model) | 여러 downstream Physical AI 환경으로 fine-tuning될 것을 전제로 만든 범용 world model. 이 논문의 중심 개념 |
| Text2World / Video2World | 텍스트만 받아 영상을 만드는 모드와, 과거 영상 + 텍스트를 받아 미래를 잇는 모드 |
| CV8×8×8 / DV8×16×16 | 토크나이저 이름 규칙. C/D는 continuous와 discrete, V는 video, 숫자는 시간×높이×너비 압축률 |
| FSQ (Finite-Scalar-Quantization) | 각 latent 차원을 정해진 레벨 수로 반올림해 양자화하는 방식. Cosmos는 (8, 8, 8, 5, 5, 5)로 어휘 64,000을 만든다 |
| prompt upsampler | 사람이 쓴 짧은 prompt를 학습 캡션 분포에 맞게 늘려주는 별도 LLM |
| diffusion decoder | discrete 토큰의 압축 왜곡을 continuous 공간으로 옮겨 보정하는 후처리 모델 |
| physics alignment | 시뮬레이터로 만든 물리적으로 옳은 영상을 정답 삼아 생성 영상의 물리 준수를 재는 이 논문의 평가 방식 |
| TokenBench / ShotBench | 각각 토크나이저 평가용 영상 세트와 shot 분할 알고리즘 평가용 벤치마크. 둘 다 NVlabs로 공개 |
| Cosmos-1X / RDS | post-training용 자체 데이터. 앞은 1X 휴머노이드 EVE의 200시간 1인칭 영상, 뒤는 6뷰 주행 클립 약 360만 개 |
| pre-Guard / post-Guard | 입력 텍스트를 막는 단계와 출력 영상을 막는 단계 |
| TSE / CSE | multi-view 생성 평가 지표. 뷰 하나의 시간 방향 Sampson error와 뷰 사이 Sampson error |
| TAE / TFE | multi-view 주행 영상에서 trajectory 일치도를 재는 지표 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | pre-trained WFM과 post-trained WFM의 생성 예시 모음. diffusion과 autoregressive, camera control, manipulation, 자율주행 | caption-region | (아카이브) |
| fig02 | 3 | pre-training으로 generalist WFM을 만들고 소량 커스텀 데이터로 post-training해 특정 Physical AI 환경에 특화시키는 2단 구도 | caption-region | ★ wiki 권장 (개념, pre/post-training 구도) |
| fig03 | 4 | WFM의 정의. 과거 observation x(0:t)와 현재 perturbation c(t)로 다음 상태를 예측한다 | caption-region | (아카이브) |
| fig04 | 5 | Cosmos 플랫폼 5개 구성요소, 곧 Video Curator, Tokenizer, pre-trained WFM, post-training 샘플, Guardrail | caption-region | ★ wiki 권장 (개념, 플랫폼 구성) |
| fig05 | 6 | Video Curator 5단계, 곧 split에서 filtering, annotation, 클립 DB, dedup을 거쳐 sharding까지 | caption-region | ★ wiki 권장 (method, curation 5단계) |
| fig06 | 11 | video tokenization 파이프라인. 인코더가 영상을 토큰으로 압축하고 디코더가 복원한다 | caption-region | (아카이브) |
| fig07 | 12 | continuous 토큰과 discrete 토큰의 차이. 왼쪽은 C차원 임베딩, 오른쪽은 양자화된 정수 인덱스 | caption-region | (아카이브) |
| fig08 | 13 | 시공간 압축률 대비 복원 품질(PSNR). Cosmos Tokenizer가 높은 압축에서도 품질 우위 | caption-region | ★ wiki 권장 (result, 압축 대 품질) |
| fig09 | 14 | Cosmos Tokenizer 아키텍처. temporal causality와 wavelet 기반 인코더-디코더 | caption-region | (아카이브) |
| fig10 | 15 | TokenBench 예시 영상. egocentric, 주행, robot manipulation, 웹 영상 | caption-region | (아카이브) |
| fig11 | 20 | diffusion WFM(Cosmos-Predict1) 아키텍처. CV8x8x8 토크나이저 latent에 노이즈를 주고 3D patchify 후 self/cross-attention 블록을 N회 반복한다 | caption-region | ★ wiki 권장 (architecture, diffusion) |
| fig12 | 25 | Cosmos-Predict1-7B/14B-Text2World 생성 결과 비교 | caption-region | (아카이브) |
| fig13 | 26 | Cosmos-Predict1-7B/14B-Video2World 생성 결과. 앞 9프레임 조건 | caption-region | (아카이브) |
| fig14 | 28 | autoregressive WFM(Cosmos-Predict1-Video2World) 아키텍처. DV8x16x16 discrete 토큰에 T5 cross-attention을 결합한 Llama3 계열 구조 | caption-region | ★ wiki 권장 (architecture, autoregressive) |
| fig15 | 33 | diffusion decoder 학습. 같은 영상을 discrete와 continuous 두 토크나이저로 이중 토큰화한다 | caption-region | (아카이브) |
| fig16 | 33 | diffusion decoder 추론. autoregressive 모델의 출력 토큰을 denoiser 조건으로 넣는다 | caption-region | (아카이브) |
| fig17 | 34 | Cosmos autoregressive WFM 생성 결과. 상단 4B/12B, 하단 Video2World | caption-region | (아카이브) |
| fig18 | 35 | diffusion decoder 적용 전후 비교. 하단이 보정된 영상 | caption-region | (아카이브) |
| fig19 | 35 | autoregressive WFM 실패 사례. 물체(빨간 표시)가 아래에서 갑자기 나타난다 | caption-region | (아카이브) |
| fig20 | 38 | physics 시나리오 rollout 비교. 각 그룹 위가 시뮬레이션 정답, 아래가 WFM 예측 | caption-region | (아카이브) |
| fig21 | 42 | camera control 정성 비교. Cosmos와 CamCo의 입력 trajectory와 재추정 trajectory | caption-region | (아카이브) |
| fig22 | 44 | joystick 형태의 camera 입력(전진, 후진, 좌회전, 우회전)에 따른 생성 결과 | caption-region | (아카이브) |
| fig23 | 45 | 같은 입력 이미지와 camera 조건에서 seed만 바꿔 서로 다른 미래를 생성한 결과 | caption-region | (아카이브) |
| fig24 | 46 | 지시문 기반 영상 예측 사람 평가. 네 기준에서 VideoLDM-Instruction 대비 선호도 | caption-region | (아카이브) |
| fig25 | 47 | Cosmos-1X 데이터셋에서의 지시문 기반 영상 예측 샘플 | caption-region | (아카이브) |
| fig26 | 47 | Bridge 데이터셋에서의 action 기반 다음 프레임 예측 샘플 | caption-region | (아카이브) |
| fig27 | 50 | MultiView 모델이 만든 6개 카메라 뷰 텍스트 조건 생성 결과 | caption-region | (아카이브) |
| fig28 | 51 | MultiView 모델의 일반화. 학습 분포 밖 장면(얼음 성, 강 위 주행)에서도 6뷰 유지 | caption-region | (아카이브) |
| fig29 | 53 | trajectory 조건 multi-view 생성. 좌측 입력 trajectory를 따라간다 | caption-region | (아카이브) |
| fig30 | 54 | Cosmos Guardrail 구성. pre-Guard는 키워드 차단과 Aegis, post-Guard는 영상 안전 분류기와 얼굴 블러 | caption-region | ★ wiki 권장 (method, Guardrail) |
| tab01 | 8 | shot 분할 알고리즘 비교. PySceneDetect, Panda70M, TransNetV2, AutoShot | table-region | (아카이브) |
| tab02 | 8 | 소프트웨어 설정별 transcoding 성능 | table-region | (아카이브) |
| tab03 | 10 | H100 1장에서의 VILA 캡셔닝 추론 처리량 비교 | table-region | (아카이브) |
| tab04 | 12 | visual tokenizer 기능 비교. causal, image, video, joint, discrete, continuous | table-region | (아카이브) |
| tab05 | 16 | continuous video 토크나이저 평가 (DAVIS와 TokenBench) | table-region | (아카이브) |
| tab06 | 16 | discrete video 토크나이저 평가 (DAVIS와 TokenBench) | table-region | (아카이브) |
| tab07 | 17 | continuous image 토크나이저 평가 | table-region | (아카이브) |
| tab08 | 17 | discrete image 토크나이저 평가 | table-region | (아카이브) |
| tab09 | 17 | 토크나이저 런타임 성능. 파라미터 수와 이미지 또는 프레임당 인코딩과 디코딩 시간 | table-region | (아카이브) |
| tab10 | 18 | Cosmos WFM 모델 지도. diffusion 4종과 autoregressive 4종, 각 계열의 토크나이저와 enhancer | table-region | ★ wiki 권장 (개념, 모델 지도) |
| tab11 | 21 | diffusion 계열 Cosmos-Predict1 모델 설정값 | table-region | (아카이브) |
| tab12 | 22 | 점진적 학습 단계와 각 단계 사양 | table-region | (아카이브) |
| tab13 | 24 | Cosmos-Diffusion Transformer의 FLOPs와 활성값 메모리 | table-region | (아카이브) |
| tab14 | 30 | autoregressive 계열 Cosmos-Predict1 모델 설정값 | table-region | (아카이브) |
| tab15 | 31 | Medusa head 개수가 토큰 처리량과 forward pass 수에 미치는 영향 | table-region | (아카이브) |
| tab16 | 32 | autoregressive 모델 성능 분석 (640x1024 테스트 영상) | table-region | (아카이브) |
| tab17 | 32 | 저해상도 적응을 적용한 Cosmos-Predict1-4B 디코딩 처리량 | table-region | (아카이브) |
| tab18 | 36 | autoregressive 모델 실패율. image 조건과 9프레임 video 조건 비교 | table-region | (아카이브) |
| tab19 | 37 | 3D 일관성 평가. Sampson error, pose 추정 성공률, novel view 합성 품질 | table-region | ★ wiki 권장 (result, 3D 일관성) |
| tab20 | 39 | physics alignment 결과. 픽셀, feature, 객체 수준 지표로 본 미래 예측 정확도 | table-region | ★ wiki 권장 (result, physics alignment) |
| tab21 | 40 | Sec 6에서 다루는 post-trained WFM 목록과 각 모델의 조건 입력 | table-region | (아카이브) |
| tab22 | 43 | camera control post-training 정량 비교. CamCo 대비 pose 성공률, 회전과 이동 오차, FID와 FVD | table-region | ★ wiki 권장 (result, camera control) |
| tab23 | 48 | Bridge 데이터셋 action 기반 다음 프레임 예측 평가 | table-region | (아카이브) |
| tab24 | 52 | multi-view 주행 영상 생성 평가. FID와 FVD, multi-view 일관성(TSE와 CSE) | table-region | (아카이브) |
| tab25 | 52 | multi-view 주행 영상의 trajectory 일관성 평가 (TAE와 TFE) | table-region | (아카이브) |

검출 55건 전부 `caption-region` 또는 `table-region`이고 `low_confidence` 표시가 하나도 없다. 크롭을 눈으로 확인한 결과 fig02, fig04, fig05, fig11, fig14, fig30, tab10 모두 도식 영역만 정확히 잘렸다.
