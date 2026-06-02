---
title: "VLM3: Vision Language Models Are Native 3D Learners"
type: paper
year: 2026
category: llms
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/cai-2026-vlm3-vision-language-models.pdf
raw_filename: "cai-2026-vlm3-vision-language-models.pdf"
source_collection: external
authors: "Zhipeng Cai, Zhuang Liu, Yunyang Xiong, Zechun Liu, Vikas Chandra, Yangyang Shi"
arxiv_id: "2605.30561"
tags: [vlm, vision-language-model, 3d-understanding, depth-estimation, pixel-correspondence, camera-pose, qwen3-vl, meta, princeton, native-3d, depthlm]
---

## 한 줄 요약 (One-line Summary)

표준 VLM(Qwen3-VL-4B)에 ① **focal length 통일**(image resize로 1000px), ② **text-based pixel reference**(좌표를 [0, 2000) 정규화 텍스트로 직접 표기), ③ **데이터 mixture·scaling**만 적용하면 architecture 변경·heavy augmentation·regression loss 없이도 metric depth(δ1 0.84→0.9)·object-level 3D·pixel correspondence(EPE 10× 감소)·camera pose(AUC30 5%→94%) 4개 fine-grained 3D task에서 expert vision model(UnidepthV2, RoMa, DA3-Giant 등)과 동등·우위 정확도를 달성한다는 Meta·Princeton의 입증 논문.

## 1. 자료 정보 (Document Information)

- **제목**: VLM3: Vision Language Models Are Native 3D Learners
- **저자**: Zhipeng Cai (Project Lead, Meta), Zhuang Liu (Princeton), Yunyang Xiong, Zechun Liu, Vikas Chandra, Yangyang Shi (Meta)
- **소속**: Meta + Princeton University
- **발행**: 2026년 6월 1일, arXiv:2605.30561v1 [cs.CV] (28 May 2026)
- **코드**: https://github.com/facebookresearch/VLM3
- **유형**: Empirical research paper (16 페이지, ~12,000 단어)
- **선행 연구**: 동일 1저자의 **DepthLM** (Cai et al., arXiv:2509.25413, 2025) — 표준 VLM이 metric depth를 학습할 수 있음을 처음 보인 논문. VLM3는 이를 4개 task로 확장하면서 **visual prompting(marker rendering) → text-based pixel reference**로 단순화·확장한다.

## 2. 주요 기여 (Key Contributions)

1. **"VLMs are native 3D learners" 명제 입증**: regression loss·extra encoder·heavy augmentation·multi-decoder 등 expert vision model 설계의 **거의 모든 task-specific 요소가 fine-grained 3D learning에 불필요**함을 4개 task·다수 데이터셋에서 ablation으로 보인다.
2. **VLM3 method**: 단 3가지 ingredient(focal-length 통일 + text-based pixel reference [0, 2000) 정규화 + 데이터 mixture/scaling)만으로 표준 Qwen3-VL-4B + SFT(next-token prediction) 학습이 SOTA를 낸다.
3. **Text-based pixel reference의 발견**: DepthLM은 "VLM은 text 좌표를 이해 못한다"고 결론지었지만, **pixel 공간을 [0, 2000)로 정규화하면 visual prompting과 동등 정확도(δ1 0.853 vs 0.849)**가 나오며, 이로 인해 한 이미지에 multiple QA를 packing할 수 있어 scalability가 비약적으로 향상(DepthLM 16M images × 2 px → VLM3 26M images × 10 px).
4. **데이터 mixture가 model size보다 중요**: 4B 모델이 32B·8B 모델을 능가하고(δ1 0.904 vs 0.873/0.880), uniform weight(0.842)·dataset-size weight(0.884)·VLM3 tuned weight(0.904)의 비교에서 weighting이 결정적임을 보인다. 26M images 수준에서는 **4B도 overfit하기 시작**하므로 model scaling보다 data mixture tuning이 우선.
5. **Regression formulation 불필요성**: camera pose 같은 복잡 출력도 yaw/pitch/roll 숫자를 그대로 text로 next-token-predict 하면 expert model(VGGT, DA3-Giant) 수준에 도달 — "regression loss가 3D vision의 foundation"이라는 통념을 정면 반박.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 핵심 ingredient 3가지

**(1) Focal-length 통일** — 입력 이미지의 focal length가 1000 px이 되도록 resize. 이는 camera ambiguity(같은 픽셀이라도 카메라 내참수에 따라 실제 3D 의미가 달라지는 문제)를 architecture 변경 없이 해결한다. 카메라 intrinsics가 없는 in-the-wild 이미지는 **pre-trained single image calibration model**(Tirado-Garín & Civera, 2025)로 추정.

**(2) Text-based pixel/region reference (정규화)** — DepthLM의 marker rendering(시각적으로 점·박스를 그려 넣음)을 폐기하고, pixel 좌표를 [0, 2000) 정규화한 정수로 직접 prompt에 텍스트로 표기. 핵심 prompt 예시:
- "How far is the pixel at (x, y) from the camera? Both x and y are normalized to between [0, 2000)."

이 변화로 한 이미지에 여러 QA를 packing할 수 있어 학습 효율이 비약적으로 향상되고, **출력에도 좌표가 필요한 task**(pixel correspondence)까지 동일한 방식으로 처리 가능.

**(3) 데이터 mixture와 scaling** — 데이터셋 크기가 다양한 26M 이미지를 학습할 때, uniform weight는 작은 데이터셋이 overfit되어 오히려 성능이 떨어진다. **dataset-size 기반 weighting**이 reasonable baseline(δ1 0.884)이고, 추가 tuning으로 0.904까지 향상.

### 3.2 4개 task의 prompt 설계

| Task | 입력 | 출력 prompt 예시 |
|---|---|---|
| Metric depth | single image | "How far is the pixel at (x, y) from the camera? ..." → "x meters" |
| Object-level 3D | single image + bbox `(xMin, yMin, xMax, yMax)` 텍스트 | SpatialRGPT-Bench 형식의 qualitative/quantitative answer |
| Pixel correspondence | image pair | "What pixel in the second image corresponds to (x1, y1) in the first?" → "(x2, y2)" |
| Camera pose | image pair | translation distance (meters) / direction (unit vector) / rotation (yaw-pitch-roll) 3개 sub-question을 한 sample에 packing |

전 task 공통: **Qwen3-VL-4B base + 표준 SFT(next-token prediction), architecture/loss 변경 없음**.

### 3.3 학습 규모

| Task | 학습 데이터 | GPU·시간 |
|---|---|---|
| Depth | 32M samples × 10 QA = 320M labeled pixels | 32 H100 × 3 days |
| Object-level | 1M images (SpatialRGPT 동일) | 32 GPUs × 3 hours |
| Pixel correspondence | 80M samples × 10 QA | 64 GPUs × 7 days |
| Camera pose | 10M samples | 32 GPUs × 4 days |

DepthLM(128 H100 × 2 days, 1/10 labeled pixels)과 비교해 **컴퓨트 효율이 크게 향상**(text-based packing 덕분).

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 Metric Depth Estimation (δ1 ↑, 높을수록 좋음)

| Model | Argo2 | DDAD | NuScenes | ETH3D | ScanNet++ | sunRGBD | iBims1 | NYUv2 | **Avg** |
|---|---|---|---|---|---|---|---|---|---|
| Qwen3-VL-32b | 0.017 | 0.099 | 0.029 | 0.167 | 0.373 | 0.463 | 0.122 | 0.393 | 0.208 |
| GPT-5 | 0.218 | 0.302 | 0.382 | 0.313 | 0.428 | 0.471 | 0.307 | 0.540 | 0.370 |
| DepthLM-7B | 0.833 | 0.747 | 0.865 | 0.718 | 0.850 | 0.859 | 0.920 | 0.915 | 0.838 |
| **VLM3-4B** | **0.896** | **0.818** | **0.970** | **0.810** | **0.976** | **0.867** | **0.960** | **0.935** | **0.904** |

UnidepthV2(0.882/0.870/0.852/0.964/0.945) 등 **expert vision model과 동등하거나 NuScenes·iBims1에서 신규 SOTA**.

### 4.2 Object-level 3D (SpatialRGPT-Bench)

- **Qualitative**: VLM3-4B 91.35 vs SpatialRGPT-8B 89.80
- **Quantitative**: 58.51 / AbsRel 0.35 vs SpatialRGPT-8B 58.33 / 0.37
- 작은 모델로 추가 encoder 없이 우위.

### 4.3 Pixel Correspondence (EPE ↓, 낮을수록 좋음)

| Model | ETH3D | DTU | TA-WB | Avg |
|---|---|---|---|---|
| Qwen3-VL-32b (baseline) | 196.53 | 88.76 | 195.53 | 160.27 |
| DKM | 30.83 | 30.15 | 61.80 | 41.30 |
| RoMa | 10.01 | 11.84 | 43.79 | 21.88 |
| UFM (SOTA expert) | 3.83 | 7.28 | 12.56 | 7.89 |
| **VLM3-4B** | 15.18 | 10.71 | 20.21 | **15.37** |

Baseline VLM 대비 **10× 감소**, DKM·RoMa 능가, UFM에는 여전히 뒤짐(추가 scaling 여지).

### 4.4 Camera Pose (AUC@30° ↑)

| Model | ETH3D | ScanNet++ | Avg |
|---|---|---|---|
| Qwen3-VL-4b (baseline) | 10.0 | 0.7 | 5.4 |
| VGGT | 80.8 | 95.1 | 88.0 |
| DA3-Giant | 91.2 | 98.1 | 94.7 |
| **VLM3-4B** | **93.3** | 94.7 | **94.0** |

Baseline 5% → 94%, VGGT 능가, DA3-Giant와 동등.

### 4.5 Ablation 핵심

- **Pixel reference**: visual prompting 0.849 vs text-based 0.853 → 사실상 동일
- **Data mixture**: uniform 0.842 < dataset-size 0.884 < VLM3 weight 0.904
- **Model size**: 4B(0.904) > 8B(0.880) > 32B(0.873), 4B + 64M samples(0.880) → 이미 overfit 시작

## 5. 한계와 향후 과제 (Limitations and Future Work)

1. **Pixel correspondence는 UFM(7.89) 대비 EPE 15.37로 여전히 격차** — 저자는 추가 scaling과 mixture tuning으로 좁힐 수 있다고 추정하지만 실증은 미제.
2. **데이터 mixture tuning은 여전히 manual** — "dataset-size weighting이 reasonable baseline, 추가 tuning으로 +2점" 수준이지만 자동화 방법은 제시 안 함.
3. **현재 데이터 규모(26M images)에서는 4B이 sweet spot** — 그 이상 model scaling은 더 큰 데이터를 요구하며, 저자도 데이터 부족이 bottleneck임을 인정.
4. **단일 prompt 패밀리에 대한 sensitivity 분석 부족** — pose estimation은 5개 random prompt template로 학습, "not sensitive" 주장이지만 정량 분석은 없음.
5. **Open-source 모델(Qwen3-VL)에 한정** — proprietary VLM(GPT-5, Gemini-2.5-Pro)에 동일 방법 적용 시 효과는 unknown.

## 6. 관련 연구 (Related Work)

- **DepthLM** (Cai et al., 2025, arXiv:2509.25413) — VLM3의 직계 선행작. visual prompting으로 metric depth만 다룸. VLM3는 task 4개로 확장 + text-based reference로 simplification.
- **SpatialRGPT** (Cheng et al., NeurIPS 2024) — object-level 3D를 위해 region mask encoder 추가. VLM3-4B가 8B 모델을 능가하면서 encoder 제거.
- **SpatialVLM** (Chen et al., CVPR 2024) — expert 모델 출력을 text prompt로 변환해 학습. coarse-grained.
- **Expert vision models**: UnidepthV2 (Piccinelli et al., 2025) for depth, RoMa/DKM (Edstedt et al., 2023/2024) for correspondence, VGGT (Wang et al., 2025) & DA3-Giant (Lin et al., 2025) for camera pose.
- **Visual instruction tuning**: LLaVA (Liu et al., NeurIPS 2023), Qwen2.5-VL/Qwen3-VL (Bai et al., 2025) — base VLM 계보.
- **Visual-RFT** (Liu et al., ICCV 2025) — VLM-based object detection에서 normalized coordinate를 사용한 선행 사례, VLM3의 text-based pixel reference 영감원.

## 7. 용어집 (Glossary)

- **VLM (Vision Language Model)**: 이미지·텍스트를 모두 입력받아 텍스트를 생성하는 generalist 모델 (LLaVA, Qwen-VL, GPT-4V 등).
- **Metric depth estimation**: 픽셀과 카메라 사이의 실제 거리(meter)를 추정. relative depth와 달리 절대 스케일 필요.
- **δ1 (delta-1)**: 예측 depth와 GT의 비율이 [1/1.25, 1.25] 이내인 픽셀 비율. depth 정확도 표준 metric.
- **Pixel correspondence**: 두 이미지에서 같은 3D 점에 해당하는 픽셀 쌍을 찾는 task. SfM·SLAM의 기초.
- **EPE (End-Point Error)**: 예측 픽셀 좌표와 GT 좌표의 평균 유클리드 거리(pixel).
- **Camera pose estimation**: 두 카메라 viewpoint 사이의 6-DoF 변환(translation + rotation) 추정.
- **AUC@30°**: pose 오차가 30° 이내인 sample의 cumulative AUC. pose estimation 표준 metric.
- **Camera ambiguity**: 같은 이미지 픽셀이라도 카메라 focal length·sensor에 따라 실제 3D 의미가 달라지는 문제. focal-length 통일이 해결책.
- **Visual prompting (marker rendering)**: 입력 이미지 위에 점·박스 등을 직접 렌더링하여 VLM에 reference를 전달하는 방식. DepthLM에서 사용.
- **Text-based pixel reference**: 픽셀 좌표를 텍스트로 직접 prompt에 표기하는 방식. VLM3의 핵심 ingredient.
- **Focal-length unification**: 모든 입력 이미지의 focal length가 동일하도록(예: 1000 px) resize하는 전처리.
- **Regression formulation**: 연속값을 직접 회귀(MSE/L1 loss)로 학습하는 expert vision의 표준 방식. VLM3는 이를 next-token prediction(text)으로 대체.
- **SFT (Supervised Fine-Tuning)**: 입력-출력 쌍에 대한 표준 지도 학습.
- **Packing (in training)**: 한 입력 sample에 여러 QA를 함께 넣어 학습 효율을 높이는 기법.
- **In-the-wild image**: 통제되지 않은 실제 환경에서 촬영된 이미지. 카메라 intrinsics 미지인 경우가 많음.
