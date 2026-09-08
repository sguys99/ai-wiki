---
title: "Eagle: Frontier Vision-Language Models with Data-Centric Strategies"
type: repo
year: 2026
category: llms
raw_path: raw/repos/nvlabs-eagle.md
raw_filename: "nvlabs-eagle.md"
source_collection: external
org: "NVlabs"
repo: "EAGLE"
url: "https://github.com/NVlabs/EAGLE"
license: "Apache-2.0 (code) / CC BY-NC 4.0 또는 NVIDIA License (model weights, research preview)"
tags: [vlm, eagle, nvidia, long-context, grounding, mixture-of-encoders, vla-backbone, groot, model-zoo]
figures:
  - id: fig01
    label: Eagle
    kind: figure
    file: assets/nvlabs-eagle/fig01.png
    raw: https://raw.githubusercontent.com/NVlabs/EAGLE/main/Eagle/assets/Eagle.png
    caption: "README 상단의 Eagle 로고 (장식용)"
    strategy: manual
    curated: false
  - id: fig02
    label: Document & General VQA
    kind: figure
    file: assets/nvlabs-eagle/fig02.png
    raw: https://raw.githubusercontent.com/NVlabs/EAGLE/main/Eagle2_5/assets/Population.png
    caption: "미국 주별 인구 증감 그래프를 읽는 문서 VQA 예시 (이미지 경로는 Eagle2_5/assets)"
    strategy: manual
    curated: false
  - id: fig03
    label: 3D Perception & Spatial Intelligence
    kind: figure
    file: assets/nvlabs-eagle/fig03.png
    raw: https://raw.githubusercontent.com/NVlabs/EAGLE/main/Embodied/assets/images/LocateAnything3D.png
    caption: "LocateAnything3D의 in-the-wild 3D object detection 예시"
    strategy: manual
    curated: false
  - id: fig04
    label: Smart City & Metropolis
    kind: figure
    file: assets/nvlabs-eagle/fig04.png
    raw: https://raw.githubusercontent.com/NVlabs/EAGLE/main/Embodied/assets/images/Smart_City.png
    caption: "도쿄 시부야 교차로의 zero-shot 초고밀도 보행자 검출 예시"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

NVIDIA Research가 Eagle, Eagle 2, Eagle 2.5, LocateAnything 네 모델 계열의 코드와 문서와 model zoo를 한 곳에 모은 공식 저장소다. README는 이 계열이 Nemotron VLM, NeMo Retriever, Isaac GR00T, Cosmos 같은 NVIDIA 제품군을 지원하는 R&D 플랫폼이라고 적고, GR00T N1부터 N1.6까지의 VLM backbone 채택 시점을 월 단위로 기록한다.

## 1. 자료 정보 (Document Information)

- 저장소: <https://github.com/NVlabs/EAGLE> (org NVlabs, repo EAGLE)
- 수집 범위: 루트 `README.md` 전문 (2026-09-04 수집). 하위 디렉터리의 README와 기술 보고서 PDF는 수집하지 않았다.
- 라이선스: README 본문 "License/Terms of Use" 절에 조항이 실재한다. 코드는 Apache 2.0, 학습된 가중치는 CC BY-NC 4.0 또는 NVIDIA License이며, 모델은 비상업 용도의 research preview다.
- wiki 안의 짝 자료: [[llms/chen-2025-eagle-25-boosting-long-context-post-training]] (이 저장소가 배포하는 Eagle 2.5의 기술 보고서)

README 상단이 링크한 문서와 배포 위치는 다음과 같다.

| 자료 | 위치 |
|---|---|
| Eagle 기술 보고서 | `Eagle/Eagle.pdf` (저장소 내) |
| Eagle 2 기술 보고서 | `Eagle2_5/Eagle2.pdf` (저장소 내), arXiv 2501.14818 |
| Eagle 2.5 기술 보고서 | `Eagle2_5/Eagle2.5.pdf` (저장소 내), arXiv 2504.15271 |
| LocateAnything 보고서 | research.nvidia.com/labs/lpr/locate-anything/LocateAnything.pdf |
| 모델 컬렉션 | huggingface.co/collections/nvidia/eagle |
| LocateAnything 데모 | huggingface.co/spaces/nvidia/LocateAnything |
| 프로젝트 페이지 | nvlabs.github.io/Eagle |
| Get Started 문서 | `Embodied/README.md`, `Eagle2_5/document/0.onboarding.md`, `Eagle/README.md` |

## 2. 주요 기여 (Key Contributions)

1. 네 모델 계열을 한 저장소에 묶었다. Eagle(ICLR 2025 Spotlight), Eagle 2(arXiv 2501.14818), Eagle 2.5(NeurIPS 2025), LocateAnything(ECCV 2026)의 코드와 문서가 `Eagle/`, `Eagle2_5/`, `Embodied/` 세 디렉터리에 나뉘어 있고, 가중치는 HuggingFace에서 배포된다.
2. NVIDIA 제품군의 VLM backbone 공급처임을 명문화했다. README는 Eagle이 멀티모달 foundation model 연구를 넘어 enterprise intelligence와 Physical AI에 걸친 NVIDIA 주력 프로젝트를 지원하는 R&D 플랫폼이라고 적고, Llama-Nemotron Nano VLM, Nemotron VLMs(V2 Nano VL, V3 Nano Omni), NeMo Retriever(Llama Nemoretriever Colembed), Isaac GR00T(N1, N1.5, N1.6), Cosmos를 예로 든다.
3. GR00T 채택 이력을 월 단위로 남겼다. 2025/03 Eagle 2가 N1의 backbone(System-2), 2025/06 Eagle 2.5가 N1.5의 backbone, 2025/12 native resolution 변형이 N1.6의 backbone으로 채택됐다.
4. 2026년에 grounding 모델 LocateAnything과 Parallel Box Decoding을 추가했다. README는 이 방식이 bounding box 하나를 한 번의 forward pass에서 원자적으로 예측해 처리량을 크게 높인다고 적는다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 계열 구성

README는 Eagle을 "general-purpose multimodal understanding, long-context reasoning, embodied applications에 걸쳐 data-centric 전략을 탐구하는 frontier VLM 계열"로 정의한다. "The Eagle VLM Family" 표는 네 구성원의 초점을 한 줄씩 적는다.

| 모델 | Features | Summary | 링크 대상 |
|---|---|---|---|
| LocateAnything | Generalist grounding, detection and pointing | Fast & high quality vision-language grounding with Parallel Box Decoding | `Embodied/` |
| Eagle 2.5 | Frontier VLM with SOTA image & video understanding | Framework & data strategy for long-context multimodal understanding | `Eagle2_5/` |
| Eagle 2 | Frontier VLM with SOTA image understanding | Exploring the post-training data strategies for frontier VLMs | `Eagle/README.md` |
| Eagle | VLMs with mixture-of-encoders | Exploring the design space for vision-centric VLMs | `Eagle/README.md` |

Eagle과 Eagle 2는 같은 `Eagle/README.md`로 연결되지만, Eagle 2 기술 보고서 PDF는 `Eagle2_5/Eagle2.pdf`에 있다.

### 3.2 업데이트 연표

README "Updates" 절은 15개 항목을 최신순으로 적는다. 아래는 시간순이다.

| 시점 | 내용 |
|---|---|
| 2024/08 | Eagle 공개 |
| 2025/01 | Eagle이 ICLR 2025 Spotlight로 채택 |
| 2025/01 | Eagle 2 기술 보고서(arXiv 2501.14818)와 모델 공개 |
| 2025/03 | Eagle 2가 GR00T-N1의 VLM backbone(System-2)으로 채택. GTC 발표 영상과 white paper(arXiv 2503.14734) 링크 |
| 2025/04 | Eagle 2.5 기술 보고서(arXiv 2504.15271) 공개 |
| 2025/06 | Eagle 2.5가 GR00T-N1.5의 VLM backbone으로 채택. GEAR Lab tech blog 링크 |
| 2025/07 | Eagle 2.5 모델 공개 (HF `nvidia/Eagle2.5-8B`) |
| 2025/09 | Eagle 2가 Torch-TRT(pytorch/TensorRT의 `tools/llm`)에서 지원 |
| 2025/09 | Eagle 2.5가 NeurIPS 2025에 채택 |
| 2025/10 | Eagle 2.5 소스 코드 공개 (`Eagle2_5/`) |
| 2025/12 | Eagle의 native resolution 변형이 GR00T-N1.6의 VLM backbone으로 채택. GEAR Lab tech blog 링크 |
| 2026/05 | LocateAnything 공개 (`Embodied/`). Eagle 기반 generalist vision-language grounding 모델 |
| 2026/06 | LocateAnything batch inference 지원. 순수 FlashAttention 런타임으로 A100, RTX 4090 등 Hopper와 Blackwell이 아닌 GPU에서도 효율적으로 추론 |
| 2026/06 | LocateAnything용 visual prompt fine-tuning 스크립트 공개 (`Embodied/shell/locate-anything-lora-visual-prompt.sh`, LoRA fine-tuning) |
| 2026/06 | LocateAnything이 ECCV 2026에 채택 |

### 3.3 NVIDIA 제품군 채택처

README는 "including but not limited to"라는 단서를 달고 다섯 제품 계열을 적는다.

| 제품 계열 | README가 적은 세부 항목 |
|---|---|
| Llama-Nemotron Nano VLM | HuggingFace 블로그 링크 |
| Nemotron VLMs | V2 Nano VL (arXiv 2511.03929), V3 Nano Omni (arXiv 2604.24954) |
| NeMo Retriever | Llama Nemoretriever Colembed (arXiv 2507.05513) |
| NVIDIA Isaac GR00T | N1 (developer blog, tech report arXiv 2503.14734), N1.5 (GEAR Lab blog), N1.6 (developer blog) |
| Cosmos | 제품 페이지 링크 |

### 3.4 GR00T backbone 채택 이력

README가 명시한 채택 시점은 세 건이다.

| 시점 | GR00T 버전 | backbone |
|---|---|---|
| 2025/03 | N1 | Eagle 2 (README 표현은 "VLM backbone (System-2)") |
| 2025/06 | N1.5 | Eagle 2.5 |
| 2025/12 | N1.6 | Eagle의 native resolution 변형 |

README는 N1.7을 언급하지 않는다. 이 wiki의 다른 자료가 그 뒤를 잇는다.

- [[physical-ai/nvidia-isaac-gr00t]]의 raw README는 N1.6의 backbone을 저장소에 포함된(vendored) Eagle `nvidia/Eagle-Block2A-2B-v2`로, N1.7의 backbone을 Qwen3-VL 계열 `nvidia/Cosmos-Reason2-2B`로 적는다. 즉 Eagle이 GR00T의 backbone으로 쓰인 구간은 N1부터 N1.6까지다.
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]은 N1의 Eagle-2를 SmolLM2 LLM과 SigLIP-2 이미지 인코더에서 fine-tuning한 모델로 적는다. 반면 이 저장소 model zoo의 Eagle2-1B, 2B, 9B는 Qwen2.5-Instruct 기반이다. 같은 이름이 다른 LLM 조합을 가리키므로 backbone을 특정할 때 계보를 확인해야 한다.
- [[physical-ai/nvidia-2025-gr00t-n1-5-an-improved-open]]은 N1.5의 VLM이 Eagle 2.5에서 출발해 grounding과 물리 이해를 겨냥해 다시 튜닝한 모델이며 학습 중 고정된다고 적는다. 따라서 README의 "adopted"는 가중치를 그대로 재사용했다는 뜻이 아니다.

### 3.5 Model Zoo

README는 계열별로 네 개의 표를 두고 모두 11개 모델을 나열한다. 아래는 README 표를 그대로 옮긴 것이다.

LocateAnything 모델:

| Model Name | Date | LLM Backbone | Vision Encoder | Max Length | Download |
|---|---|---|---|---|---|
| LocateAnything-3B | 2026.05.26 | Qwen2.5-3B-Instruct | MoonViT-SO-400M | 25K | HF `nvidia/LocateAnything-3B` |

Eagle 2.5 모델:

| Model Name | Date | LLM Backbone | Vision Encoder | Max Length | Download |
|---|---|---|---|---|---|
| Eagle2.5-8B | 2025.04.16 | Qwen2.5-7B-Instruct | SigLIP2 (링크: `google/siglip2-so400m-patch16-512`) | 128K | HF `nvidia/Eagle2.5-8B` |

Eagle 2 모델:

| Model Name | Date | LLM Backbone | Vision Encoder | Max Length | Download |
|---|---|---|---|---|---|
| Eagle2-1B | 2025.01.11 | Qwen2.5-0.5B-Instruct | SigLIP | 16K | HF `nvidia/Eagle2-1B` |
| Eagle2-2B | 2025.01.11 | Qwen2.5-1.5B-Instruct | SigLIP | 16K | HF `nvidia/Eagle2-2B` |
| Eagle2-9B | 2025.01.11 | Qwen2.5-7B-Instruct | SigLIP + ConvNext | 16K | HF `nvidia/Eagle2-9B` |

Eagle 모델 (Max Length 열 없음):

| Model Name | Date | LLM Backbone | Vision Encoder | Download |
|---|---|---|---|---|
| Eagle-X4-8B-Plus | 2024.09.16 | Llama-3-8B-Instruct | CLIP + ConvNeXt + EVA + Pix2Str | HF `NVEagle/Eagle-X4-8B-Plus` |
| Eagle-X4-13B-Plus | 2024.09.16 | vicuna-13b-v1.5 | CLIP + ConvNeXt + EVA + Pix2Str | HF `NVEagle/Eagle-X4-13B-Plus` |
| Eagle-X5-34B-Plus | 2024.09.16 | Yi-34B | CLIP + ConvNeXt + EVA + Pix2Str + SAM | HF `NVEagle/Eagle-X5-34B-Plus` |
| Eagle-X5-7B | 2024.09.16 | vicuna-7b-v1.5 | CLIP + ConvNeXt + EVA + Pix2Str + SAM | HF `NVEagle/Eagle-X5-7B` |
| Eagle-X5-13B | 2024.09.16 | vicuna-13b-v1.5 | CLIP + ConvNeXt + EVA + Pix2Str + SAM | HF `NVEagle/Eagle-X5-13B` |
| Eagle-X5-13B-Chat | 2024.09.16 | vicuna-13b-v1.5 | CLIP + ConvNeXt + EVA + Pix2Str + SAM | HF `NVEagle/Eagle-X5-13B-Chat` |

네 표에서 확인되는 구성은 다음과 같다.

- 1세대 Eagle은 X4 모델이 인코더 4개, X5 모델이 5개를 쓴다. 인코더 링크는 CLIP `openai/clip-vit-large-patch14-336`, ConvNeXt `laion/CLIP-convnext_xxlarge-laion2B-s34B-b82K-augreg-soup`, EVA `Yuxin-CV/EVA-02`의 `eva02_L_coco_det_sys_o365.pth`, Pix2Str `google/pix2struct-large`, SAM `facebook/sam-vit-large`다.
- Eagle 2부터 LLM은 전부 Qwen2.5-Instruct 계열이다. 1세대는 Llama-3-8B-Instruct, vicuna-7b/13b-v1.5, Yi-34B를 썼다.
- Eagle 2의 1B와 2B는 SigLIP만, 9B는 SigLIP과 ConvNext를 함께 쓴다. 이 행들의 SigLIP 링크는 `google/paligemma-3b-pt-448` 페이지를 가리킨다.
- Eagle 2.5의 인코더 표기는 SigLIP2다. [[llms/chen-2025-eagle-25-boosting-long-context-post-training]]은 논문 Figure 2가 SigLIP-so400M으로 적는다고 기록하므로 표기가 어긋난다. 배포 체크포인트 기준으로는 저장소 표를 따른다.
- Max Length는 Eagle 2 16K, Eagle 2.5 128K, LocateAnything 25K다. 1세대는 열 자체가 없다.
- 배포 계정은 1세대가 `NVEagle`, Eagle 2 이후가 `nvidia`다.

### 3.6 LocateAnything

README "Features and Capabilities" 절의 첫 부분이 LocateAnything의 능력을 두 영상으로 보인다.

- Dense Object Detection: LocateAnything은 문서 이해, GUI grounding, 고밀도 object detection, OCR 같은 여러 localization 과제를 하나의 VLM 안에서 수행한다.
- Fast Decoding Speed: Parallel Box Decoding(PBD)과 Quantized Coordinate Decoding의 비교 영상이다. PBD는 bounding box 하나를 한 번의 forward pass에서 원자적으로 예측해 처리량을 크게 높인다. README는 비교 대상인 Quantized Coordinate Decoding의 동작 방식을 이름 외에 설명하지 않는다.

2026/06 업데이트로 순수 FlashAttention 런타임의 batch inference와 LoRA 기반 visual prompt fine-tuning 스크립트가 추가됐다. LocateAnything3D는 3D object detection 예시 이미지와 citation(CVPR 2026, "Vision-Language 3D Detection with Chain-of-Sight")으로만 등장하며, model zoo 항목과 Get Started 문서 링크는 없다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README에는 벤치마크 수치 표가 없다. 능력은 세 절에 걸친 정성 데모 6개로 보인다.

| 절 | 데모 | 형식 | 내용 |
|---|---|---|---|
| Generalist Grounding & Understanding | Dense Object Detection | 영상 | 문서, GUI, 고밀도 검출, OCR을 한 VLM으로 처리 |
| Generalist Grounding & Understanding | Fast Decoding Speed | 영상 | PBD와 Quantized Coordinate Decoding 비교 |
| Long-Context Multimodal Understanding & Reasoning | VLM Captioning | 텍스트 | 영상을 구간으로 나눠 제목, 상세 caption, 시작 초 출력. README는 모델명을 적지 않는다 |
| Applications across Virtual and Physical Worlds | Document & General VQA | 이미지 | 미국 주별 인구 증감 그래프 질의응답 (이미지 경로 `Eagle2_5/assets`) |
| Applications across Virtual and Physical Worlds | 3D Perception & Spatial Intelligence | 이미지 | LocateAnything3D의 in-the-wild 3D object detection |
| Applications across Virtual and Physical Worlds | Smart City & Metropolis | 이미지 | 도쿄 시부야 교차로의 zero-shot 초고밀도 보행자 검출 |

영상 captioning 데모의 사용자 프롬프트는 "Analyze the video and divide it into distinct sections. For each section, create a title using a few words or phrases, and a detailed caption describing the content of the section, and indicate when it begins in seconds"다. 출력은 여섯 구간이다.

| 시작(초) | 제목 | caption 요지 |
|---|---|---|
| 1.05 | Introduction | 산 정상의 갑옷 입은 전사, 조각된 거대한 돌 위로 오르는 장면, 흰 로브의 현자 등장 |
| 5.99 | Explaining game genre | 숲과 산을 오르는 캐릭터, 군대와의 전투, 석상과의 대결, 설원에서의 결투 |
| 517.10 | Discussing controls | 빙판에서의 지팡이 결투, 왕관 쓴 인물의 주술 의식, 신수를 탄 흰 로브 전사 |
| 614.53 | Talking about story & characters | 숲과 산, 검은 소용돌이 바위를 만지는 Wukong, 한자 자막(Wukong, Peng Lao Dang) |
| 698.69 | Describing visuals & sound | 바다에 잠긴 석조물, 황혼의 숲, 폭포, 조각이 새겨진 돌 |
| 738.62 | Closing | 백발 노인이 바위를 만져 빛나게 함, 계곡으로 내려가며 동료들과 합류 |

문서 VQA 데모의 질문은 "Based on this graph, how did the population of Puerto Rico change over the last decade?"다. 답변은 그래프가 2010년부터 2020년까지 미국 각 주의 인구 변화를 보여주고, 대부분의 주가 증가했으며 두 곳만 감소했고, 푸에르토리코가 그 둘 중 하나로 약 36만 5천 명(약 12%) 줄었다고 설명한다.

정량 수치는 각 기술 보고서에 있다. Eagle 2.5의 벤치마크는 [[llms/chen-2025-eagle-25-boosting-long-context-post-training]]에 정리돼 있다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자가 README에 명시한 제약:

- 가중치는 research preview로 비상업 용도에 한정된다. 코드 일부는 재사용된 것이어서 원래 라이선스가 적용되며, 수정한 파일에는 출처 표기와 라이선스 헤더가 붙어 있다.
- 데이터셋과 가중치의 사용이 관련 법규를 준수하는지 사용자가 확인해야 한다고 적는다.

README에 기술이 없어 확인할 수 없는 것:

- 벤치마크 수치가 없다. 정량 비교는 기술 보고서에 의존해야 한다.
- 학습 데이터의 공개 여부와 구성은 README에 없다.
- native resolution 변형의 구조와 학습 세부는 GEAR Lab tech blog 링크로만 넘긴다.
- GR00T N1.7 이후의 backbone 교체는 README에 없다. [[physical-ai/nvidia-isaac-gr00t]]가 근거다.
- 하위 디렉터리 README와 기술 보고서 PDF는 수집 범위 밖이라 코드 구조와 학습 레시피는 확인할 수 없다.

README 안에서 표기가 어긋나는 지점:

- 상단 Model License 배지는 NVIDIA License만 적지만, 본문 License 절은 CC BY-NC 4.0 또는 NVIDIA License라고 적는다. raw frontmatter의 `license` 값은 배지 쪽을 따랐다.
- Model zoo의 Date 열과 Updates의 공개 시점이 다르다. Eagle 2.5는 표가 2025.04.16, Updates가 2025/07 모델 공개이고, Eagle은 표가 2024.09.16, Updates가 2024/08 공개다.
- Eagle 2 행의 SigLIP 링크가 SigLIP 체크포인트가 아니라 `google/paligemma-3b-pt-448` 페이지를 가리킨다.
- LocateAnything과 LocateAnything3D의 bibtex key는 `wang2025locateanything`, `man2025locateanything3d`인데 `year` 필드는 2026이다.

## 6. 관련 연구 (Related Work)

README Citation 절의 다섯 항목:

| bibtex key | 제목 | 발표처 | 저자 수 | 1저자 |
|---|---|---|---|---|
| shi2025eagle | Eagle: Exploring The Design Space for Multimodal LLMs with Mixture of Encoders | ICLR 2025 | 15 | Min Shi |
| li2025eagle2 | Eagle 2: Building Post-Training Data Strategies from Scratch for Frontier Vision-Language Models | arXiv 2501.14818 (2025) | 27 | Zhiqi Li |
| chen2025eagle2.5 | Eagle 2.5: Boosting Long-Context Post-Training for Frontier Vision-Language Models | NeurIPS 2025 | 17 | Guo Chen |
| wang2025locateanything | LocateAnything: Fast and High-Quality Vision-Language Grounding with Parallel Box Decoding | ECCV 2026 | 13 | Shihao Wang |
| man2025locateanything3d | LocateAnything3D: Vision-Language 3D Detection with Chain-of-Sight | CVPR 2026 | 10 | Yunze Man |

README Acknowledgement 절의 네 항목:

| 구분 | 대상 | README 설명 |
|---|---|---|
| 코드베이스 | LLaVA, LLaVA-HR, InternVL | 수정한 구성 요소를 통합했다 |
| 평가 | LMMs-Eval, VLMEvalKit | 파생본을 평가에 쓴다 |
| 데이터 | Cambrian, LLaVA-One-Vision, The Cauldron 등 | 데이터 오픈소싱에 감사 |
| 배포 | NVIDIA TSE Team (Chen Fu, Yuchao Jin, Le An, Josh Park) | TensorRT 최적화와 edge 배포 |

License 절은 "Eagle models are improved using Qwen"이라고 적는다.

wiki 안의 관련 자료:

- [[llms/chen-2025-eagle-25-boosting-long-context-post-training]]: 이 저장소의 Eagle 2.5 기술 보고서
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: Eagle-2를 System 2로 쓴 VLA
- [[physical-ai/nvidia-2025-gr00t-n1-5-an-improved-open]]: Eagle 2.5를 backbone으로 쓴 세대
- [[physical-ai/nvidia-isaac-gr00t]]: N1.7에서 backbone이 Cosmos-Reason2-2B로 바뀐 후속 저장소
- [[physical-ai/nvidia-2025-cosmos-world-foundation-model-platform]]: README가 Eagle의 적용처로 함께 꼽는 world foundation model 플랫폼

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| mixture-of-encoders | 서로 다른 vision encoder 여러 개를 함께 쓰는 1세대 Eagle의 설계. README 표는 X4 모델에 4개, X5 모델에 5개의 인코더를 적는다 |
| LocateAnything | Eagle 기반의 generalist grounding, detection, pointing 모델. ECCV 2026 |
| Parallel Box Decoding (PBD) | bounding box 하나를 한 번의 forward pass에서 원자적으로 예측하는 디코딩. README는 Quantized Coordinate Decoding보다 처리량이 크게 높다고 적는다 |
| LocateAnything3D | Chain-of-Sight를 쓰는 vision-language 3D detection 모델. CVPR 2026. README에는 예시 이미지와 citation만 있다 |
| native resolution 변형 | GR00T N1.6의 backbone으로 채택된 Eagle 변형. README는 세부를 GEAR Lab tech blog로 넘긴다 |
| research preview | 연구와 비상업 용도로만 쓰도록 제한한 가중치 배포 형태 |
| System-2 | README가 GR00T N1에서 Eagle 2가 맡은 역할을 부르는 이름. 장면과 지시를 해석하는 VLM 쪽 모듈이다 |

## 8. 그림 후보 (Figure Candidates)

repo 유형이라 이미지를 자동으로 내려받지 않는다. README는 이미지를 상대 경로(`./Eagle2_5/assets/Population.png` 등)로 참조하므로 `raw:`는 CLAUDE.md Repos 규약에 따라 `https://raw.githubusercontent.com/NVlabs/EAGLE/main/{path}` 형식으로 적었다. 로컬 사본은 없어 네 항목 모두 `curated: false`이며, 웹 fetch 없이 경로만 기록한다. README에는 이 밖에 user-attachments 영상 두 편(Dense Object Detection, Fast Decoding Speed)과 captioning 데모 영상 한 편이 있는데, 정지 이미지가 아니라 후보에 넣지 않았다.

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | README 상단의 Eagle 로고 (장식용) | manual | (장식용, 불필요) |
| fig02 | 미국 주별 인구 증감 그래프를 읽는 문서 VQA 예시 (이미지 경로는 Eagle2_5/assets) | manual | (확인 필요) |
| fig03 | LocateAnything3D의 in-the-wild 3D object detection 예시 | manual | (확인 필요) |
| fig04 | 도쿄 시부야 교차로의 zero-shot 초고밀도 보행자 검출 예시 | manual | (확인 필요) |
