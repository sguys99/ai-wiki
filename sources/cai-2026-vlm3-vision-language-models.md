---
title: "VLM3: Vision Language Models Are Native 3D Learners"
type: paper
year: 2026
category: llms
raw_path: raw/papers/cai-2026-vlm3-vision-language-models.pdf
raw_filename: "cai-2026-vlm3-vision-language-models.pdf"
source_collection: external
authors: "Zhipeng Cai, Zhuang Liu, Yunyang Xiong, Zechun Liu, Vikas Chandra, Yangyang Shi"
arxiv_id: "2605.30561"
tags: [vlm, 3d-understanding, depth-estimation, object-level-3d, pixel-correspondence, camera-pose, qwen3-vl, sft, data-mixture, meta, princeton, depthlm]
figures:
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/cai-2026-vlm3-vision-language-models/fig02.png
    raw: raw/papers/cai-2026-vlm3-vision-language-models-figures/fig02.png
    caption: "VLM3 개요도. 추가 모듈을 붙이는 object-level 방법, marker를 렌더링하는 DepthLM, 구조 변경과 marker 없이 focal length 통일과 텍스트 좌표만 쓰는 VLM3를 나란히 비교한다"
    page: 4
    bbox_norm: [0.0789, 0.0158, 0.9083, 0.3158]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/cai-2026-vlm3-vision-language-models/fig03.png
    raw: raw/papers/cai-2026-vlm3-vision-language-models-figures/fig03.png
    caption: "네 task의 출력 시각화. depth 점군, object-level 질의응답, pixel correspondence 매칭 선, camera pose 렌더링을 실내와 실외 장면에서 보여준다"
    page: 9
    bbox_norm: [0.1066, 0.0733, 0.9035, 0.5255]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/cai-2026-vlm3-vision-language-models/tab01.png
    raw: raw/papers/cai-2026-vlm3-vision-language-models-figures/tab01.png
    caption: "VLM 비교표 크롭. 캡션 문장이 위에 섞여 들어갔고 metric depth와 object-level 정성 평가 상단만 담겨 하단 sub-table은 잘렸다"
    page: 7
    bbox_norm: [0.106, 0.1152, 0.8961, 0.4991]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/cai-2026-vlm3-vision-language-models/tab02.png
    raw: raw/papers/cai-2026-vlm3-vision-language-models-figures/tab02.png
    caption: "expert vision model 비교표 크롭. metric depth 5개 데이터셋 부분만 담겼고 VLM3 행과 하단 sub-table은 잘렸다"
    page: 8
    bbox_norm: [0.2253, 0.158, 0.7675, 0.329]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/cai-2026-vlm3-vision-language-models/tab03.png
    raw: raw/papers/cai-2026-vlm3-vision-language-models-figures/tab03.png
    caption: "분석 표. pixel reference 방식, 데이터 mixture 가중 방식, 모델 크기와 데이터 크기에 따른 δ1 비교"
    page: 10
    bbox_norm: [0.1103, 0.1272, 0.8897, 0.2218]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/cai-2026-vlm3-vision-language-models/tab04.png
    raw: raw/papers/cai-2026-vlm3-vision-language-models-figures/tab04.png
    caption: "task별 hyper-parameter. learning rate, batch size, 학습 sample 수"
    page: 15
    bbox_norm: [0.111, 0.1838, 0.889, 0.2719]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/cai-2026-vlm3-vision-language-models/tab05.png
    raw: raw/papers/cai-2026-vlm3-vision-language-models-figures/tab05.png
    caption: "학습 데이터 통계. depth 추정 8개 데이터셋의 이미지 수와 mixture weight, pixel correspondence와 camera pose 14개 데이터셋의 image pair 수"
    page: 15
    bbox_norm: [0.1107, 0.3076, 0.8893, 0.8054]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

Meta와 Princeton University의 연구진이 표준 VLM인 Qwen3-VL-4B에 focal length 통일, 텍스트 기반 픽셀 참조, 데이터 mixture와 scaling 세 가지만 적용한 SFT로 metric depth 추정, object-level 3D 이해, pixel correspondence 추정, camera pose 추정 네 가지 3D task를 학습시켜, 구조 변경이나 regression loss 없이도 expert vision model에 필적하는 정확도를 얻을 수 있음을 보인 논문이다. depth δ1 평균은 DepthLM-7B의 0.838에서 0.904로 오르고, pixel correspondence의 EPE는 base VLM 대비 약 10분의 1로 줄며, camera pose의 AUC30은 5.4%에서 94.0%로 오른다.

## 1. 자료 정보 (Document Information)

- 제목: VLM3: Vision Language Models Are Native 3D Learners
- 저자: Zhipeng Cai (Meta, Project Lead), Zhuang Liu (Princeton University), Yunyang Xiong, Zechun Liu, Vikas Chandra, Yangyang Shi (Meta)
- 발행: 논문 표기 일자 2026년 6월 1일. arXiv:2605.30561v1 [cs.CV], 2026년 5월 28일 등록
- 코드: https://github.com/facebookresearch/VLM3
- 분량: 본문 10페이지와 참고문헌 4페이지, 부록 2페이지의 총 16페이지
- 게재 학회: 자료에 표기가 없다 (arXiv preprint)
- 선행 연구: 같은 1저자의 DepthLM (Cai et al., 2025, arXiv:2509.25413). 표준 VLM이 pixel-level metric depth를 expert vision model에 필적하는 정확도로 학습할 수 있음을 처음 보인 논문이며, VLM3는 depth 하나였던 task를 넷으로 넓히고 visual prompting을 텍스트 기반 픽셀 참조로 대체한 후속작이다

## 2. 주요 기여 (Key Contributions)

1. "VLM은 native 3D learner"라는 명제의 입증. 구조 변경, 큰 모델, 무거운 데이터 증강, regression을 포함한 복잡한 손실 등 expert vision model의 기반을 이루는 설계가 3D 학습의 필요조건이 아님을 네 task에서 보인다.
2. VLM3 방법의 제안. focal length 통일, 텍스트 기반 픽셀 참조, 데이터 mixture와 scaling이라는 세 요소만으로 표준 VLM(Qwen3-VL-4B)을 텍스트 기반 SFT로 학습시킨다. 저자는 이를 "가장 단순한 설계의 scalable한 방법"이라고 부른다.
3. 텍스트 기반 픽셀 참조의 발견. DepthLM은 VLM이 텍스트 좌표를 이해하지 못한다고 결론지었지만, 픽셀 공간을 가로세로 모두 [0, 2000) 범위로 정규화하면 visual prompting과 같은 정확도(δ1 0.853 대 0.849)가 나온다. 이미지 한 장에 질문 여러 개를 packing할 수 있어 학습 효율이 크게 오른다.
4. 데이터 mixture가 모델 크기보다 중요하다는 관찰. 같은 데이터에서 4B 모델(0.904)이 8B(0.880)와 32B(0.873)보다 정확하고, 균일 가중(0.842)과 데이터셋 크기 가중(0.884), VLM3 가중(0.904)의 차이가 크다.
5. regression formulation 불필요성의 확인. camera pose처럼 복잡한 출력도 yaw, pitch, roll 숫자를 텍스트로 next-token prediction하면 expert model 수준(AUC30 94.0% 대 DA3-Giant 94.7%)에 이른다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 전체 구조

VLM3는 입력 이미지(task에 따라 한 장 또는 여러 장)를 focal length가 1000픽셀이 되도록 resize한 뒤, 픽셀이나 object 영역을 [0, 2000)로 정규화한 정수 좌표 텍스트로 가리키고, 표준 텍스트 SFT로 학습한다. 별도 언급이 없으면 base VLM은 Qwen3-VL-4B다. 구조, 손실, 데이터 증강은 바꾸지 않는다.

### 3.2 세 가지 핵심 요소

| 요소 | 내용 | 해결하는 문제 |
|---|---|---|
| focal length 통일 | 입력 이미지를 focal length 1000픽셀로 resize한다. intrinsics가 없는 이미지는 pre-training된 단일 이미지 calibration 모델(AnyCalib, Tirado-Garín and Civera 2025)로 추정한다 | camera ambiguity. 구조 변경 없이 혼합 데이터 학습이 가능해진다 |
| 텍스트 기반 픽셀 참조 | 좌표를 [0, 2000)로 정규화한 정수로 프롬프트에 직접 적는다 | DepthLM의 marker 렌더링을 없앤다. 이미지 한 장에 질문 여러 개를 packing할 수 있고, 출력에도 좌표가 필요한 task를 같은 방식으로 다룬다 |
| 데이터 mixture와 scaling | 크기가 다른 데이터셋을 섞을 때 데이터셋 크기 기반 가중을 기본선으로 두고 작은 데이터셋의 가중을 더 낮춘다 | 수십억 파라미터 VLM이 작은 데이터셋에 과적합하는 문제. 균일 가중으로 데이터만 늘리면 성능이 정체하거나 떨어진다 |

focal length 통일은 DepthLM과 같은 방식이다. object-level 3D 이해 실험은 학습과 평가 데이터 모두 인터넷의 in-the-wild 이미지라 calibration 모델로 intrinsics를 추정했고, 저자는 이 방식이 실제로 잘 동작했다고 적는다.

텍스트 기반 픽셀 참조의 근거는 프롬프트 형식에 있다. DepthLM은 "Given this image of size (width = w, height = h), how far is the pixel at (x, y) from the camera?"라는 프롬프트로 실험해 VLM이 텍스트 좌표를 이해하지 못한다고 결론지었다. VLM3는 VLM 기반 object detection(Visual-RFT, Liu et al. 2025)에서 착안해 "How far is the pixel at (x, y) from the camera? Both x and y are normalized to between [0, 2000)."로 바꿨고, 정규화만으로 visual prompting과 같은 정확도를 얻었다. DepthLM은 marker를 그린 이미지를 픽셀마다 따로 넣어야 했기 때문에 약 1,600만 장의 이미지에 장당 2픽셀만 학습했다. VLM3는 depth에서 sample당 10개의 labeled pixel을 추가 연산 없이 학습한다.

데이터 mixture에 관해 저자는 camera ambiguity와 픽셀 참조 문제만 풀리면 데이터를 늘리는 것으로 충분하다고 본다. DepthLM은 대부분의 데이터셋에 균일 가중을 썼지만, VLM3는 데이터셋 크기 기반 가중을 여러 task에 통하는 합리적인 기본선으로 두고, 추가 tuning의 여지가 크다고 적는다.

### 3.3 task별 구성과 프롬프트

| task | 입력 | 참조 방식 | 출력 |
|---|---|---|---|
| metric depth 추정 | 이미지 1장 | 정규화 픽셀 좌표 (x, y) | "x meters" |
| object-level 3D 이해 | 이미지 1장 | bounding box (xMin, yMin, xMax, yMax) 텍스트 | SpatialRGPT 형식의 정성, 정량 답 |
| pixel correspondence 추정 | 이미지 2장 | 첫 이미지의 픽셀 (x1, y1) | 둘째 이미지의 픽셀 (x2, y2) |
| camera pose 추정 | 이미지 2장 | 없음 | translation distance, translation direction, rotation 세 질문 |

metric depth는 DepthLM을 따르되 세 가지를 바꿨다. 텍스트 참조로 이미지 한 장의 labeled pixel 10개를 QA 10개로 packing하고, 실외 street view 내부 이미지 1,000만 장을 더해 학습 이미지를 1,600만 장에서 2,600만 장으로 늘렸으며, 부록 A의 비균일 가중을 적용했다.

object-level 3D 이해는 SpatialRGPT와 같은 데이터로 학습하고 평가한다. SpatialRGPT가 object region mask를 위해 추가 인코더를 붙인 것과 달리, VLM3는 bounding box 좌표 텍스트만 쓰고 나머지 프롬프트는 원래 형식을 그대로 따른다.

pixel correspondence는 왼쪽 이미지의 query 픽셀에 대응하는 오른쪽 이미지의 픽셀을 찾는 task다. LLM으로 무작위 생성한 프롬프트 템플릿 5개를 쓰며 모델은 프롬프트 형식에 민감하지 않았다. 예시 프롬프트는 "Given these two images, what pixel in the second image corresponds to pixel (x1, y1) in the first image? Report the answer as (x2, y2)."이고 답은 "The corresponding pixel is (x, y)"다. 이 task는 metric scale 이해가 필요 없어 focal length 통일이 경험적으로 필요하지 않았지만, 적용해도 성능이 떨어지지 않았다.

camera pose는 이미지 2장에서 세 가지를 묻는다. translation distance는 미터 단위 숫자, translation direction은 첫 카메라 좌표계(X = right, Y = down, Z = forward)의 단위 벡터, rotation은 yaw, pitch, roll 순서로 intrinsic하게 적용하는 세 각도다. 각 요소가 별개의 질문이고 학습과 평가 모두 한 sample에 세 질문을 packing한다. 저자는 pose 추정을 multi-step 방식(correspondence 추정 후 최적화, Schonberger and Frahm 2016)이나 보조 task와 결합한 복잡한 regression 손실(VGGT, DA3) 대신 next-token prediction만으로 SOTA 수준에 이른 것을 가장 놀라운 결과로 꼽는다.

### 3.4 학습 규모와 hyper-parameter

| task | 학습 sample | 연산 | learning rate | batch size |
|---|---|---|---|---|
| metric depth | 3,200만 개 (sample당 10픽셀, labeled pixel 3억 2,000만 개) | GPU 32장, 3일 | 5.5e-5 | 1344 |
| object-level 3D | 100만 장 | GPU 32장, 3시간 | 3.5e-4 | 640 |
| pixel correspondence | 8,000만 개 (sample당 10픽셀) | GPU 64장, 7일 | 2e-5 | 2816 |
| camera pose | 1,000만 개 | GPU 32장, 4일 | 5e-5 | 448 |

DepthLM은 더 작은 3B 모델을 labeled pixel 10분의 1로 학습하는 데 H100 GPU 128장과 2일이 들었다. 모든 학습에 linear warmup(warmup 비율 0.1)을 둔 cosine learning rate schedule, Transformers 라이브러리 기본 설정의 AdamW, FSDP hybrid shard, gradient clipping 0.02, gradient checkpointing, bfloat16, Flash Attention 2를 쓴다.

### 3.5 학습 데이터

depth 추정 데이터셋(부록 Table 5, 총 약 2,600만 장):

| 데이터셋 | 이미지 수 | mixture weight |
|---|---|---|
| Argoverse2 | 100만 장 | 0.21 |
| Waymo | 70만 장 | 0.04 |
| NuScenes | 20만 장 | 0.01 |
| ScanNet++ | 100만 장 | 0.01 |
| Taskonomy | 400만 장 | 0.51 |
| HM3D | 900만 장 | 0.78 |
| Matterport3D | 19만 장 | 0.006 |
| 내부 street view 데이터 | 1,000만 장 | 1.0 |

pixel correspondence와 camera pose는 같은 데이터와 가중을 쓴다. 가중은 image pair 수와 같다(총 990만 쌍): BlendedMVS 45만, DynamicReplica 100만, SAIL-VOS 3D 35만, ScanNet++ 100만, MPSD 1만 3천, RealEstate10K 88만, DL3DV-10K 260만, MegaDepth 19만, Aria Synthetic Environment 200만, GTA-SFM 9만, TartanAir V2 85만, UnrealStereo4K 27만, MVS-Synth 19만, Spring 2만. image pair는 MapAnything(Keetha et al. 2025)과 비슷하게 covisibility 25% 초과 조건으로 무작위 추출하고, ScanNet++는 30개 scene을 평가용으로 떼어 둔다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 평가 방식

- metric depth: DepthLM을 따라 VLM 비교에 9개, expert 비교에 5개 데이터셋을 쓴다고 본문은 적지만 Table 1의 열은 8개다. 지표는 δ1(높을수록 좋음)
- object-level 3D: SpatialRGPT-Bench의 정성(Acc)과 정량(Acc와 AbsRel) 평가
- pixel correspondence: UFM의 데이터셋(ETH3D, DTU, TA-WB)과 EPE 지표. EPE는 target 이미지 영역에서 예측이 빗나간 픽셀 수다. expert와 직접 비교하려고 EPE 범위를 UFM과 같게 재조정하고, 데이터셋당 8,192개 sample로 expert 모델도 같은 데이터에서 다시 평가했다
- camera pose: ETH3D와 ScanNet++에서 AUC30 지표

### 4.2 metric depth 추정

Table 1 (VLM 비교, δ1):

| 모델 | Argoverse2 | DDAD | NuScenes | ETH3D | ScanNet++ | sunRGBD | iBims1 | NYUv2 | 평균 |
|---|---|---|---|---|---|---|---|---|---|
| Qwen2.5-VL-72B | 0.119 | 0.140 | 0.186 | 0.220 | 0.272 | 0.276 | 0.212 | 0.324 | 0.219 |
| Qwen3-VL-4B | 0.004 | 0.073 | 0.070 | 0.071 | 0.147 | 0.176 | 0.080 | 0.158 | 0.101 |
| Qwen3-VL-32B | 0.017 | 0.099 | 0.029 | 0.167 | 0.373 | 0.463 | 0.122 | 0.393 | 0.208 |
| Gemini-2.5-Pro | 0.280 | 0.252 | 0.365 | 0.328 | 0.380 | 0.270 | 0.466 | 0.394 | 0.342 |
| GPT-5 | 0.218 | 0.302 | 0.382 | 0.313 | 0.428 | 0.471 | 0.307 | 0.540 | 0.370 |
| SpaceLLaVA-13B | 0.100 | 0.067 | 0.083 | 0.090 | 0.269 | 0.233 | 0.208 | 0.178 | 0.154 |
| SpatialRGPT-8B | 0.055 | 0.046 | 0.100 | 0.220 | 0.346 | 0.369 | 0.240 | 0.265 | 0.205 |
| Seed1.5-VL | 0.040 | 0.074 | 0.028 | 0.309 | 0.593 | 0.689 | 0.627 | 0.841 | 0.400 |
| DepthLM-3B | 0.808 | 0.724 | 0.870 | 0.745 | 0.838 | 0.850 | 0.890 | 0.868 | 0.824 |
| DepthLM-7B | 0.833 | 0.747 | 0.865 | 0.718 | 0.850 | 0.859 | 0.920 | 0.915 | 0.838 |
| VLM3-4B | 0.896 | 0.818 | 0.970 | 0.810 | 0.976 | 0.867 | 0.960 | 0.935 | 0.904 |

Table 2 (expert vision model 비교, δ1):

| 모델 | DDAD | NuScenes | ETH3D | sunRGBD | iBims1 |
|---|---|---|---|---|---|
| ZoeDepth | 0.272 | 0.283 | 0.350 | 0.867 | 0.580 |
| DepthAnything | - | 0.354 | 0.093 | 0.850 | 0.714 |
| DepthAnythingV2 | - | 0.171 | 0.363 | 0.724 | - |
| Metric3D | - | 0.723 | 0.456 | 0.154 | 0.797 |
| UniDepth | 0.858 | 0.846 | 0.185 | 0.943 | 0.157 |
| Depth Pro | 0.299 | 0.566 | 0.397 | 0.831 | 0.823 |
| Metric3Dv2 | - | 0.841 | 0.900 | 0.812 | 0.684 |
| UniDepthV2 | 0.882 | 0.870 | 0.852 | 0.964 | 0.945 |
| MoGe-2 | 0.856 | - | 0.908 | - | 0.924 |
| VLM3-4B | 0.818 | 0.970 | 0.810 | 0.867 | 0.960 |

VLM3는 DepthLM-7B를 모든 데이터셋에서 앞서며 평균을 0.838에서 0.904로 올렸고 모델 크기는 절반 가까이 작다. expert와 비교하면 NuScenes와 iBims1에서 새 SOTA를 냈고 DDAD, ETH3D, sunRGBD는 UniDepthV2나 MoGe-2가 더 높다.

### 4.3 object-level 3D 이해 (SpatialRGPT-Bench)

정성 평가 Acc:

| 모델 | Below/Above | Left/Right | Big/Small | Tall/Short | Wide/Thin | Behind/Front | 전체 |
|---|---|---|---|---|---|---|---|
| Qwen3-VL-4B | 63.33 | 85.71 | 85.85 | 70.54 | 83.65 | 60.91 | 75.00 |
| Qwen3-VL-32B | 72.50 | 83.81 | 82.08 | 68.75 | 87.5 | 67.27 | 76.98 |
| SpatialRGPT-8B | 99.17 | 99.04 | 79.24 | 89.28 | 83.65 | 87.27 | 89.80 |
| VLM3-4B | 97.84 | 99.37 | 90.78 | 90.82 | 92.86 | 75.54 | 91.35 |

정량 평가 Acc / AbsRel:

| 모델 | Direct Distance | Horizontal Distance | Vertical Distance | Width | Height | Direction | 전체 |
|---|---|---|---|---|---|---|---|
| Qwen3-VL-4B | 18.24 / 51.94 | 18.03 / 80.64 | 14.15 / 160.62 | 3.76 / 552.54 | 12.78 / 874.07 | 0.0 / 180.0° | 11.16 / 343.96 |
| Qwen3-VL-32B | 22.30 / 97.14 | 17.21 / 67.60 | 22.64 / 44.93 | 0.00 / 582.34 | 2.26 / 647.74 | 0.0 / 180.0° | 10.73 / 287.95 |
| SpatialRGPT-8B | 35.1 / 0.35 | 59.0 / 0.27 | 53.8 / 0.27 | 51.9 / 0.31 | 54.9 / 0.63 | 95.3 / 17.1° | 58.33 / 0.37 |
| VLM3-4B | 34.09 / 0.37 | 53.38 / 0.29 | 58.41 / 0.27 | 44.11 / 0.39 | 65.64 / 0.41 | 95.42 / 10.5° | 58.51 / 0.35 |

VLM3-4B는 전체 정성 91.35, 정량 58.51 / 0.35로 SpatialRGPT-8B(89.80, 58.33 / 0.37)를 앞서면서 base 모델 구조를 유지하고 크기도 작다. 다만 세부 항목에서는 Behind/Front(75.54 대 87.27), Direct Distance, Horizontal Distance, Width에서 SpatialRGPT-8B가 더 높다.

### 4.4 pixel correspondence (EPE, 낮을수록 좋음)

| 모델 | ETH3D | DTU | TA-WB | 평균 |
|---|---|---|---|---|
| Qwen3-VL-4B | 179.80 | 89.64 | 190.40 | 153.28 |
| Qwen3-VL-32B | 196.53 | 88.76 | 195.53 | 160.27 |
| DKM | 30.83 | 30.15 | 61.80 | 41.30 |
| RoMa | 10.01 | 11.84 | 43.79 | 21.88 |
| UFM | 3.83 | 7.28 | 12.56 | 7.89 |
| VLM3-4B | 15.18 | 10.71 | 20.21 | 15.37 |

base VLM 대비 EPE가 한 자릿수 단위로 줄었고 DKM과 RoMa보다 낮다. UFM(7.89)에는 미치지 못하며 저자는 추가 scaling과 mixture tuning으로 개선할 수 있다고 본다.

### 4.5 camera pose (AUC30, 높을수록 좋음)

| 모델 | ETH3D | ScanNet++ | 평균 |
|---|---|---|---|
| Qwen3-VL-4B | 10.0 | 0.7 | 5.4 |
| Qwen3-VL-32B | 11.7 | 3.9 | 7.8 |
| DUSt3R | 27.3 | 33.9 | 30.6 |
| MapAnything | 77.4 | 84.1 | 80.8 |
| VGGT | 80.8 | 95.1 | 88.0 |
| DA3-Giant | 91.2 | 98.1 | 94.7 |
| VLM3-4B | 93.3 | 94.7 | 94.0 |

VLM3는 VGGT와 MapAnything을 앞서고 DA3-Giant와 비슷하다(94.0 대 94.7). ETH3D에서는 VLM3가 가장 높고 ScanNet++에서는 DA3-Giant와 VGGT가 더 높다.

### 4.6 시각화 관찰

Figure 3은 네 task의 출력을 보여준다. depth는 DepthLM처럼 이미지의 여러 픽셀에 질문해 dense 점군을 만드는데, 픽셀마다 독립으로 묻든 한 이미지에 질문을 packing하든 성능이 비슷했다. 독립 질의는 미리 계산한 visual token과 공통 텍스트 prefix를 공유하는 효율적 구현이 가능하다. 텍스트 supervision으로 배운 depth는 expert 모델에서 흔한 두 object 사이의 flying point가 없었고, 저자는 그 이유를 VLM3와 DepthLM의 inductive bias가 최소인 데서 찾는다. object-level에서는 front/behind 같은 공간 관계와 metric scale 속성을, pixel correspondence에서는 실내외 모두에서 안정적인 대응을, camera pose에서는 회전과 이동 방향뿐 아니라 metric scale 이동 거리까지 예측했다.

### 4.7 분석 (Table 3, depth δ1)

| 실험 | 조건 | δ1 |
|---|---|---|
| 픽셀 참조 (800만 sample, QA 1개) | visual prompting | 0.849 |
| 픽셀 참조 (800만 sample, QA 1개) | 텍스트 기반 | 0.853 |
| 데이터 mixture (3,200만 sample, QA 10개) | 균일 가중 | 0.842 |
| 데이터 mixture (3,200만 sample, QA 10개) | 데이터셋 크기 가중 | 0.884 |
| 데이터 mixture (3,200만 sample, QA 10개) | VLM3 가중 | 0.904 |
| 모델과 데이터 크기 | 32B, 3,200만 sample, QA 10개 | 0.873 |
| 모델과 데이터 크기 | 8B, 3,200만 sample, QA 10개 | 0.880 |
| 모델과 데이터 크기 | 4B, 6,400만 sample, QA 10개 | 0.880 |
| 모델과 데이터 크기 | 4B, 3,200만 sample, QA 10개 | 0.904 |

- 픽셀 참조: 같은 데이터와 모델에서 visual prompting과 텍스트 기반 참조의 정확도가 같다.
- 데이터 mixture: 균일 가중은 DepthLM 기본값을 따르고 새 데이터셋도 같은 가중을 준다(Matterport3D만 DepthLM 기본값 0.1). 균일 가중 3,200만 sample은 label이 40분의 1인 800만 sample(텍스트 기반 0.853)보다 낮아, 재가중 없는 scaling은 성능을 올리지 못한다. 데이터셋 크기 가중은 0.884, 작은 데이터셋의 가중을 더 낮춘 VLM3 가중은 0.904다.
- 모델 크기: 모델을 키우면 정확도가 오히려 떨어진다. 저자는 현재 데이터 크기가 큰 모델에는 부족해 과적합한다고 추정하고, 4B를 6,400만 sample로 늘려도 정확도가 떨어지는 것으로 이를 뒷받침한다. 2,600만 장 수준에서는 모델 scaling보다 데이터 scaling이 훨씬 중요하다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자가 명시한 것:

1. pixel correspondence는 UFM(EPE 7.89)에 뒤진다(15.37). 추가 scaling과 더 세심한 mixture tuning으로 개선할 수 있다고 본다.
2. 데이터셋 크기 가중은 기본선이고 추가 tuning의 개선 여지가 크다. VLM3 가중은 작은 데이터셋의 가중을 낮춘 것이며 자동화된 절차는 기술하지 않는다.
3. 현재 데이터 규모(2,600만 장)에서는 4B 모델도 조금 더 길게 학습하면 과적합한다. 큰 모델의 낮은 정확도는 데이터 부족 때문이라고 추정한다.

자료에 기술이 없어 확인할 수 없는 것:

- 프롬프트 형식 민감도의 정량 분석. pixel correspondence에 템플릿 5개를 썼고 "민감하지 않다"고만 적는다.
- Qwen3-VL 외 다른 base VLM에서의 재현 여부. 모델 크기 비교는 Qwen3-VL 계열 안에서만 이뤄졌다.
- 내부 street view 데이터 1,000만 장의 출처와 공개 여부.

자료 내적 모순:

- 본문 4절은 depth VLM 비교에 데이터셋 9개를 쓴다고 적지만 Table 1의 데이터셋 열은 8개다.
- Table 5의 MegaDepth 행 인용이 Matterport3D 논문(Chang et al., 2017)을 가리킨다.

## 6. 관련 연구 (Related Work)

- DepthLM (Cai et al., 2025): VLM3의 직계 선행작. visual prompting으로 metric depth만 다뤘다.
- expert vision model의 task-specific 설계: pre-training된 vision 인코더(CroCo, DINOv2) 위에 DPT, FPN, Gaussian Process, self-attention과 linear layer 같은 여러 디코더를 결합하고, MSE, L1, certainty, regression by classification, clipped L2 등 여러 손실의 가중을 튜닝한다. UniDepthV2와 VGGT는 random resizing, cropping, translation 같은 기하 증강과 brightness, gamma, saturation, hue shift 같은 광도 증강을 함께 쓴다.
- 3D 이해 VLM: SpatialVLM(Chen et al., CVPR 2024)은 expert 출력을 텍스트 프롬프트로 바꿔 학습하는 coarse-grained object-level 방법이다. SpatialRGPT(Cheng et al., NeurIPS 2024)는 정성과 정량 문제를 분리하고 object 참조용 추가 인코더로 이름 없이 object를 가리킨다. SpatialBot(Cai et al., 2024), VLM-3R(Fan et al., 2025)은 task와 입력 다양성을 넓혔지만 추가 구조가 필요하다. Multi-SpatialMLLM(Xu et al., 2025), Seed1.5-VL(Guo et al., 2025), DepthLM이 fine-grained 3D 이해를 다루기 시작했다.
- 비교 대상 expert 모델: depth의 UniDepthV2(Piccinelli et al., 2025)와 MoGe-2(Wang et al., 2025b), correspondence의 DKM(Edstedt et al., 2023), RoMa(Edstedt et al., 2024), UFM(Zhang et al., 2025), pose의 DUSt3R, MapAnything, VGGT(Wang et al., 2025a), DA3-Giant(Lin et al., 2025).
- base VLM 계보: LLaVA(Liu et al., NeurIPS 2023), Qwen2.5-VL과 Qwen3-VL(Bai et al., 2025).
- Visual-RFT(Liu et al., ICCV 2025): VLM 기반 object detection에서 정규화 좌표를 쓴 선행 사례로, 텍스트 기반 픽셀 참조의 착안점이다.

## 7. 용어집 (Glossary)

- VLM3: 이 논문이 제안한 방법의 이름. 표준 VLM에 세 요소만 적용해 3D task를 학습시킨다.
- expert vision model: 특정 3D task를 위해 설계된 전용 비전 모델. 여러 디코더와 손실, 무거운 데이터 증강을 쓴다.
- metric depth 추정: query 픽셀과 카메라 사이의 실제 거리를 미터 단위로 추정하는 task.
- δ1: depth 정확도 지표로 높을수록 좋다. 논문은 정의를 기술하지 않는다.
- object-level 3D 이해: SpatialRGPT-Bench 형식으로 두 object의 공간 관계(정성)와 거리나 크기(정량)를 묻는 task.
- pixel correspondence 추정: 왼쪽 이미지의 query 픽셀에 대응하는 오른쪽 이미지의 픽셀을 찾는 multi-view task.
- EPE: target 이미지 영역에서 예측이 빗나간 픽셀 수로 표현한 오차. 낮을수록 좋다.
- camera pose 추정: 두 viewpoint 사이의 translation distance, translation direction, rotation을 추정하는 multi-view task.
- AUC30: pose 추정 지표(Lin et al., 2025)로 높을수록 좋다. 논문은 정의를 기술하지 않는다.
- camera ambiguity: 논문이 DepthLM을 인용하며 focal length 통일로 해결한다고 적는 문제. 정의는 기술하지 않는다.
- visual prompting: 입력 이미지 위에 marker를 렌더링해 픽셀을 가리키는 DepthLM의 참조 방식.
- 텍스트 기반 픽셀 참조: 픽셀 좌표를 [0, 2000)로 정규화한 정수 텍스트로 프롬프트에 적는 VLM3의 참조 방식.
- focal length 통일: 입력 이미지의 focal length가 1000픽셀이 되도록 resize하는 전처리.
- packing: 같은 이미지에 대한 질문 여러 개를 한 sample에 넣어 이미지를 중복하지 않고 학습하거나 추론하는 방법.
- regression formulation: 연속값을 regression 손실로 직접 학습하는 expert 모델의 표준 정식화. VLM3는 숫자 텍스트의 next-token prediction으로 대체한다.
- in-the-wild 이미지: 출처를 모르고 camera intrinsics가 없는 이미지. calibration 모델로 intrinsics를 추정한다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig02 | 4 | VLM3 개요도. 추가 모듈을 붙이는 object-level 방법, marker를 렌더링하는 DepthLM, 구조 변경과 marker 없이 focal length 통일과 텍스트 좌표만 쓰는 VLM3를 나란히 비교한다 | caption-region | ★ wiki 권장 (method) |
| fig03 | 9 | 네 task의 출력 시각화. depth 점군, object-level 질의응답, pixel correspondence 매칭 선, camera pose 렌더링을 실내와 실외 장면에서 보여준다 | caption-region | ★ wiki 권장 (result) |
| tab01 | 7 | VLM 비교표 크롭. 캡션 문장이 위에 섞여 들어갔고 metric depth와 object-level 정성 평가 상단만 담겨 하단 sub-table은 잘렸다 | table-region | (선택 안 함, 크롭 결함. 본문 마크다운 표로 대체) |
| tab02 | 8 | expert vision model 비교표 크롭. metric depth 5개 데이터셋 부분만 담겼고 VLM3 행과 하단 sub-table은 잘렸다 | table-region | (선택 안 함, 크롭 결함. 본문 마크다운 표로 대체) |
| tab03 | 10 | 분석 표. pixel reference 방식, 데이터 mixture 가중 방식, 모델 크기와 데이터 크기에 따른 δ1 비교 | table-region | (선택 안 함, 본문 마크다운 표로 대체) |
| tab04 | 15 | task별 hyper-parameter. learning rate, batch size, 학습 sample 수 | table-region | (선택 안 함, 본문 마크다운 표로 대체) |
| tab05 | 15 | 학습 데이터 통계. depth 추정 8개 데이터셋의 이미지 수와 mixture weight, pixel correspondence와 camera pose 14개 데이터셋의 image pair 수 | table-region | (선택 안 함, 본문 마크다운 표로 대체) |

Figure 1(2페이지, 네 task의 대표 결과와 수치를 한 장에 모은 개요 그림)은 `figures.json` 매니페스트에 검출되지 않아 크롭이 없다. Figure 1의 depth 수치는 NuScenes, ETH3D, SUNRGBD, iBims1 4개 데이터셋 평균이라 Table 1의 8개 평균과 다르다.
