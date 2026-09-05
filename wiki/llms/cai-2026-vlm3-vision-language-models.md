---
title: "VLM3: Vision Language Models Are Native 3D Learners"
type: paper
year: 2026
category: llms
raw_path: raw/papers/cai-2026-vlm3-vision-language-models.pdf
raw_filename: "cai-2026-vlm3-vision-language-models.pdf"
source_collection: external
source: cai-2026-vlm3-vision-language-models.md
authors: "Zhipeng Cai, Zhuang Liu, Yunyang Xiong, Zechun Liu, Vikas Chandra, Yangyang Shi"
arxiv_id: "2605.30561"
tags: [vlm, vision-language-model, 3d-understanding, depth-estimation, pixel-correspondence, camera-pose, qwen3-vl, meta, princeton, native-3d, depthlm]
---

## 요약 (Summary)

Meta·Princeton의 Zhipeng Cai 팀이 **"VLMs are native 3D learners"**를 4개 fine-grained 3D task로 입증한 논문이다. 표준 Qwen3-VL-4B에 ① **focal length 통일(1000 px resize)**, ② **text-based pixel reference([0, 2000) 정규화)**, ③ **데이터 mixture·scaling** — 단 3가지 요소만 적용하고 architecture·loss는 그대로 두는데도, metric depth(δ1 평균 **0.84 → 0.904**, UnidepthV2 매칭), object-level 3D(SpatialRGPT-8B 능가, encoder 제거), pixel correspondence(**EPE 10× 감소**, DKM·RoMa 능가), camera pose(**AUC@30° 5% → 94%**, VGGT 능가, DA3-Giant 매칭)에서 SOTA를 낸다.

핵심 주장은 expert vision model의 거의 모든 task-specific 설계(extra encoder·multi-decoder·heavy augmentation·**regression loss 자체까지**)가 fine-grained 3D learning에 불필요하다는 것이다. yaw·pitch·roll 숫자를 next-token-predict 하는 단순 SFT가 expert model 수준에 도달한다는 결과는 *"regression formulation은 3D vision의 foundation"이라는 통념을 정면 반박*한다.

## 주요 기여 (Key Contributions)

1. **3개 핵심 ingredient의 충분성 입증** — focal-length 통일 + text-based pixel reference + data mixture만으로 표준 VLM(architecture·loss·augmentation 변경 0)이 4개 다양한 3D task에서 SOTA에 도달함을 large-scale ablation으로 증명. [[llms/cai-2026-vlm3-vision-language-models#3.1 핵심 ingredient 3가지]]에서 각 ingredient의 역할 정리.
2. **Text-based pixel reference 발견** — DepthLM(이 논문의 선행 작업)은 "VLM은 텍스트 좌표를 못 이해한다"고 결론지었지만, **pixel 공간을 [0, 2000)로 정규화하면 visual prompting과 동등 정확도(δ1 0.853 vs 0.849)**가 나온다는 것을 발견. 한 이미지에 multiple QA packing이 가능해져 학습 효율 비약 향상(DepthLM 16M images × 2 px → VLM3 26M × 10 px = **10× scaling**).
3. **Regression loss 불필요성** — camera pose 같은 복잡한 6-DoF 출력도 yaw/pitch/roll 숫자를 그대로 text로 next-token-predict 하면 충분(AUC30 94.0%, DA3-Giant 94.7%와 동등). "regression이 foundation"이라는 30년 통념을 정면 반박.
4. **데이터 mixture가 model size보다 중요** — 4B(0.904) > 8B(0.880) > 32B(0.873). 4B + 64M samples는 0.880으로 overfit. **26M images 수준에서는 model scaling보다 mixture tuning이 우선**.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 핵심 ingredient 3가지

| Ingredient | 무엇을 | 왜 필요한가 |
|---|---|---|
| Focal-length 통일 | 입력 이미지를 focal length 1000 px가 되도록 resize | camera ambiguity(같은 픽셀이라도 카메라마다 의미 다름) 해결, mix-data 학습 가능 |
| Text-based pixel reference | 좌표를 [0, 2000) 정수로 텍스트에 직접 표기 | DepthLM의 marker rendering 폐기 → multi-QA packing 가능, pixel correspondence 같은 출력-좌표 task도 동일 방식으로 처리 |
| 데이터 mixture·scaling | dataset-size 가중 + tuning | 작은 데이터셋 overfit 방지, uniform 0.842 → tuned 0.904 |

카메라 intrinsics가 없는 in-the-wild 이미지는 **pre-trained single image calibration model** (Tirado-Garín & Civera, 2025)로 추정 후 resize.

### 3.2 4개 task 모두 동일 패턴

base: **Qwen3-VL-4B + 표준 SFT(next-token prediction)**. architecture/loss/augmentation 변경 없음.

- **Metric depth**: `"How far is the pixel at (x, y) from the camera? Both x and y are normalized to between [0, 2000)."` → `"x meters"`
- **Object-level 3D**: bbox `(xMin, yMin, xMax, yMax)`를 텍스트로 표기, SpatialRGPT 데이터 그대로
- **Pixel correspondence**: `"What pixel in the second image corresponds to (x1, y1) in the first?"` → `"(x2, y2)"`
- **Camera pose**: translation distance(meters) / direction(unit vector x,y,z) / rotation(yaw-pitch-roll) **3개 sub-question을 한 sample에 packing**

### 3.3 학습 규모

| Task | Data | Compute |
|---|---|---|
| Depth | 32M × 10 QA = 320M labeled pixels | 32 H100 × 3 days |
| Object 3D | 1M images | 32 GPUs × 3 hours |
| Pixel correspondence | 80M × 10 QA | 64 GPUs × 7 days |
| Camera pose | 10M samples | 32 GPUs × 4 days |

DepthLM(128 H100 × 2 days, 1/10 픽셀) 대비 text-based packing 덕분에 **컴퓨트 효율 대폭 향상**.

## 결과 (Results)

### Metric Depth (δ1 ↑, 8 데이터셋 평균)

| Model | Avg δ1 |
|---|---|
| GPT-5 | 0.370 |
| Gemini-2.5-Pro | 0.342 |
| Qwen3-VL-32b | 0.208 |
| DepthLM-7B (선행 SOTA) | 0.838 |
| **VLM3-4B** | **0.904** |
| UnidepthV2 (expert) | 0.882~ |
| MoGe-2 (expert) | 0.856~ |

NuScenes 0.970·iBims1 0.960에서 **신규 SOTA**.

### Pixel Correspondence (EPE ↓, 평균)

| Model | EPE |
|---|---|
| Qwen3-VL-32b | 160.27 |
| DKM | 41.30 |
| RoMa | 21.88 |
| **VLM3-4B** | **15.37** |
| UFM (SOTA expert) | 7.89 |

Baseline 대비 **10× 감소**, DKM·RoMa 능가, UFM에는 여전히 격차.

### Camera Pose (AUC@30° ↑)

| Model | Avg |
|---|---|
| Qwen3-VL-4b | 5.4 |
| VGGT | 88.0 |
| DA3-Giant | 94.7 |
| **VLM3-4B** | **94.0** |

baseline **5% → 94%**, VGGT 능가, DA3-Giant와 동등.

### Object-level 3D (SpatialRGPT-Bench)

| Model | Qualitative Acc | Quantitative Acc / AbsRel |
|---|---|---|
| SpatialRGPT-8B (with extra encoders) | 89.80 | 58.33 / 0.37 |
| **VLM3-4B (no extra encoders)** | **91.35** | **58.51 / 0.35** |

### Ablation 핵심

- **Pixel reference**: visual prompting 0.849 vs **text-based 0.853** (사실상 동일)
- **Data mixture**: uniform 0.842 < dataset-size 0.884 < **VLM3 weight 0.904**
- **Model size**: 4B(0.904) > 8B(0.880) > 32B(0.873) — 26M 데이터로는 4B이 sweet spot

## 한계 (Limitations)

- Pixel correspondence는 UFM 대비 EPE 15.37 vs 7.89로 격차 잔존, 추가 scaling 필요.
- 데이터 mixture tuning이 manual, 자동화 미제.
- Open-source VLM(Qwen3-VL)에 한정, proprietary 모델에는 검증 안 됨.
- 4B 모델이 26M images에서 이미 overfit → 더 큰 모델은 더 큰 데이터가 전제.

## 관련 페이지 (Related Pages)

- [[llms/shumailov-2024-ununlearning-unlearning-is-not-sufficient]] — VLM3와 직접 관련은 없으나 같은 LLMs 카테고리. ICL 같은 단순 기제가 모델 capability(여기서는 unlearning 우회)를 결정한다는 공통 관점.
- [[applications/dnotitia-akb]] — 별개 영역이지만 *"core stays small, flexibility via extension"* 철학이 VLM3의 *"minimal design, scalable data"* 와 같은 결.

## 외부 참조

- arXiv: https://arxiv.org/abs/2605.30561
- Code: https://github.com/facebookresearch/VLM3
- 선행 작업: **DepthLM** (Cai et al., arXiv:2509.25413, 2025) — wiki 미수록
