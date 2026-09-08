---
title: "Eagle: Frontier Vision-Language Models with Data-Centric Strategies"
type: repo
year: 2026
category: llms
raw_path: raw/repos/nvlabs-eagle.md
raw_filename: "nvlabs-eagle.md"
source_collection: external
source: nvlabs-eagle.md
org: "NVlabs"
repo: "EAGLE"
url: "https://github.com/NVlabs/EAGLE"
license: "Apache-2.0 (code) / CC BY-NC 4.0 또는 NVIDIA License (model weights, research preview)"
tags: [vlm, eagle, nvidia, long-context, grounding, mixture-of-encoders, vla-backbone, groot, model-zoo]
---

## 요약

NVlabs/EAGLE은 NVIDIA Research의 Eagle VLM 계열을 한 곳에 모은 공식 저장소다. VLM은 이미지와 텍스트를 함께 입력받아 텍스트를 생성하는 vision-language model의 약어다. 저장소에는 네 모델 계열이 들어 있다. vision encoder를 여럿 결합해 설계 공간을 탐색한 1세대 Eagle, post-training 데이터 전략에 집중한 Eagle 2, long-context 멀티모달 이해로 확장한 Eagle 2.5, 그리고 2026년에 추가된 grounding 모델 LocateAnything이다.

이 저장소는 연구 코드 공개를 넘어 NVIDIA 제품군의 VLM backbone 공급처 역할을 한다. README는 Eagle이 Llama-Nemotron Nano VLM, Nemotron VLMs, NeMo Retriever, Isaac GR00T, Cosmos를 지원하는 R&D 플랫폼이라고 명시한다. 특히 GR00T N1(2025/03), N1.5(2025/06), N1.6(2025/12)의 backbone 채택 시점을 월 단위로 기록하고 있어, 이 wiki의 physical-ai 페이지들이 VLA의 System 2 계보를 확인할 때 참조하는 자료다.

README에는 벤치마크 수치가 없다. 대신 15개 항목의 업데이트 연표, 11개 모델의 model zoo, 5편의 citation, 라이선스 조항, 정성 데모 6개가 있다. 이 페이지는 그 내용을 표로 옮기고, GR00T 쪽 페이지와 어긋나는 지점을 정리한다.

## 배경

Eagle 계열은 2024년 8월 1세대 공개 이후 약 2년 동안 네 모델 계열을 발표했다. 각 세대는 별도의 기술 보고서와 발표처를 가지며, 보고서 PDF와 코드가 저장소 하위 디렉터리에 나뉘어 들어 있다. 따라서 저장소 루트 README는 개별 모델의 설명서라기보다 계열 전체의 안내 페이지에 가깝다. 이 wiki에서 Eagle 2.5의 방법과 실험은 [[llms/chen-2025-eagle-25-boosting-long-context-post-training]]이 다루고, 이 페이지는 계열의 구성과 채택 이력과 배포 현황을 맡는다.

README가 Eagle을 정의하는 문장은 "general-purpose multimodal understanding, long-context reasoning, embodied applications에 걸쳐 data-centric 전략을 탐구하는 frontier VLM 계열"이다. 세 영역은 family 표의 Eagle 2(이미지 이해), Eagle 2.5(long-context), LocateAnything(`Embodied/` 디렉터리)과 대응해 읽을 수 있다. data-centric이라는 표현이 학습 데이터의 구성과 post-training 전략에 무게를 둔다는 점은 Eagle 2와 Eagle 2.5의 보고서 제목이 각각 "Post-Training Data Strategies"와 "Long-Context Post-Training"을 내세우는 데서 드러난다.

수집 범위는 루트 README 전문이다. 하위 디렉터리의 README와 기술 보고서 PDF는 수집하지 않았으므로 코드 구조나 학습 레시피는 이 페이지의 근거 범위 밖이다.

## 핵심 개념

VLM backbone은 상위 모듈이 올라타는 pre-training된 vision-language 본체를 뜻한다. [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]에 따르면 GR00T는 VLM이 장면과 지시를 해석한 임베딩을 받아 action을 생성하는 구조이고, [[physical-ai/jo-2026-groot-n1-5-vla-primer]]는 N1.5의 backbone 교체를 인식 병목에 대한 대응으로 설명한다. README는 GR00T N1에서 Eagle 2가 맡은 이 역할을 "System-2"라고 부른다.

mixture-of-encoders는 서로 다른 vision encoder 여러 개를 함께 쓰는 설계다. 1세대 Eagle의 보고서 제목이 "Exploring The Design Space for Multimodal LLMs with Mixture of Encoders"이고, model zoo의 Eagle-X4 모델은 인코더 4개, Eagle-X5 모델은 5개를 쓴다. README는 인코더 조합만 적고 결합 방식은 보고서로 넘긴다.

grounding은 모델 출력을 외부 근거나 물리 세계에 붙들어 매는 것이다. LocateAnything 문맥에서는 텍스트 지시에 해당하는 이미지 영역을 bounding box나 point로 찾아내는 과제를 가리키며, README는 detection과 pointing을 함께 묶어 "generalist grounding"이라고 부른다.

Parallel Box Decoding은 LocateAnything의 디코딩 방식이다. README는 bounding box 하나를 한 번의 forward pass에서 원자적으로 예측해 Quantized Coordinate Decoding보다 처리량이 크게 높다고 적는다. 비교 대상의 동작 방식은 README가 이름 외에 설명하지 않는다.

Max Length는 model zoo 표의 열 이름이다. README는 열의 뜻을 정의하지 않지만 통상 모델이 한 번에 받아들일 수 있는 토큰 길이 한도를 가리킨다. Eagle 2의 16K는 토큰 약 1만 6천 개, Eagle 2.5의 128K는 약 12만 8천 개 수준이다. 긴 영상과 여러 페이지 문서를 다루려면 이 한도가 커야 하므로, Eagle 2.5의 128K는 long-context 세대라는 정체성을 숫자로 보여준다.

research preview는 연구와 비상업 용도로만 쓰도록 제한한 가중치 배포 형태다. README는 코드와 가중치의 라이선스를 분리해 코드는 Apache 2.0으로, 가중치는 이 형태로 배포한다.

## 계열 구성

### 네 구성원

README "The Eagle VLM Family" 표는 네 구성원의 초점을 한 줄씩 적는다.

| 모델 | Features | Summary | 발표처 |
|---|---|---|---|
| Eagle | VLMs with mixture-of-encoders | Exploring the design space for vision-centric VLMs | ICLR 2025 Spotlight |
| Eagle 2 | Frontier VLM with SOTA image understanding | Exploring the post-training data strategies for frontier VLMs | arXiv 2501.14818 |
| Eagle 2.5 | Frontier VLM with SOTA image & video understanding | Framework & data strategy for long-context multimodal understanding | NeurIPS 2025 |
| LocateAnything | Generalist grounding, detection and pointing | Fast & high quality vision-language grounding with Parallel Box Decoding | ECCV 2026 |

세대가 올라갈수록 초점이 옮겨 간다. 1세대는 vision encoder 조합이라는 구조 문제를 다뤘고, Eagle 2는 post-training 데이터를 어떻게 구성하는지로, Eagle 2.5는 그 데이터 전략을 영상을 포함한 long-context 입력으로 넓히는 문제로 옮겼다. LocateAnything은 README가 "based on Eagle"이라고 적은 파생 모델로, 이 계열을 바탕으로 localization 과제에 특화했다.

### 디렉터리와 문서 위치

코드와 문서는 세 디렉터리에 나뉘고 가중치는 HuggingFace에 있다.

| 자료 | 위치 |
|---|---|
| Eagle, Eagle 2 코드와 README | `Eagle/README.md` |
| Eagle 기술 보고서 | `Eagle/Eagle.pdf` |
| Eagle 2 기술 보고서 | `Eagle2_5/Eagle2.pdf` (arXiv 2501.14818) |
| Eagle 2.5 코드, onboarding 문서, 기술 보고서 | `Eagle2_5/`, `Eagle2_5/document/0.onboarding.md`, `Eagle2_5/Eagle2.5.pdf` (arXiv 2504.15271) |
| LocateAnything 코드와 README | `Embodied/`, `Embodied/README.md` |
| LocateAnything 보고서 | research.nvidia.com/labs/lpr/locate-anything/LocateAnything.pdf |
| 모델 컬렉션과 데모 | huggingface.co/collections/nvidia/eagle, huggingface.co/spaces/nvidia/LocateAnything |
| 프로젝트 페이지 | nvlabs.github.io/Eagle |

Eagle과 Eagle 2는 family 표에서 같은 `Eagle/README.md`로 연결되지만 Eagle 2 보고서 PDF는 `Eagle2_5/` 아래에 있다. 즉 디렉터리 이름이 세대 구분과 정확히 일치하지는 않으므로, 어느 세대의 코드를 보는지는 README 링크를 따라 확인해야 한다.

### 발표 이력

README Citation 절은 다섯 편을 적는다. 저자 수는 bibtex의 author 필드를 센 값이다.

| 제목 | 발표처 | 저자 수 | 1저자 |
|---|---|---|---|
| Eagle: Exploring The Design Space for Multimodal LLMs with Mixture of Encoders | ICLR 2025 | 15명 | Min Shi |
| Eagle 2: Building Post-Training Data Strategies from Scratch for Frontier Vision-Language Models | arXiv 2501.14818 (2025) | 27명 | Zhiqi Li |
| Eagle 2.5: Boosting Long-Context Post-Training for Frontier Vision-Language Models | NeurIPS 2025 | 17명 | Guo Chen |
| LocateAnything: Fast and High-Quality Vision-Language Grounding with Parallel Box Decoding | ECCV 2026 | 13명 | Shihao Wang |
| LocateAnything3D: Vision-Language 3D Detection with Chain-of-Sight | CVPR 2026 | 10명 | Yunze Man |

다섯 편 모두 Zhiding Yu가 저자에 들어 있고, Eagle 세 편은 Guilin Liu와 Jan Kautz와 Andrew Tao와 Bryan Catanzaro가 공통이다. Eagle 2만 학회 발표처 없이 arXiv 번호로 인용된다.

## 업데이트 연표

### 시간순 정리

README "Updates" 절은 15개 항목을 최신순으로 적는다. 아래는 시간순으로 다시 배열한 것이다.

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

### 세 종류의 항목

15개 항목은 성격에 따라 세 종류로 나뉜다.

| 종류 | 항목 수 | 해당 항목 |
|---|---|---|
| 연구 발표 (학회 채택, 보고서) | 4 | Eagle ICLR 채택, Eagle 2.5 보고서, Eagle 2.5 NeurIPS 채택, LocateAnything ECCV 채택 |
| 모델과 코드 공개 | 6 | Eagle 공개, Eagle 2.5 모델, Eagle 2.5 코드, LocateAnything 공개, batch inference, visual prompt fine-tuning 스크립트 |
| 보고서와 모델 동시 공개 | 1 | Eagle 2 (2025/01) |
| 외부 채택과 지원 | 4 | GR00T N1, N1.5, N1.6 채택, Torch-TRT 지원 |

Eagle 2.5는 보고서(2025/04), 모델(2025/07), 코드(2025/10)가 석 달 간격으로 따로 공개됐다. 반면 Eagle 2는 보고서와 모델이 같은 달(2025/01)에 나왔다. GR00T 채택 항목 세 건에는 README가 GTC 영상이나 GEAR Lab tech blog 링크를 붙여 세부를 외부로 넘긴다.

## NVIDIA 제품군과의 관계

### 채택처

README는 "including but not limited to"라는 단서를 달고 다섯 제품 계열을 적는다.

| 제품 계열 | README가 적은 세부 항목 | 영역 |
|---|---|---|
| Llama-Nemotron Nano VLM | HuggingFace 블로그 링크 | enterprise intelligence |
| Nemotron VLMs | V2 Nano VL (arXiv 2511.03929), V3 Nano Omni (arXiv 2604.24954) | enterprise intelligence |
| NeMo Retriever | Llama Nemoretriever Colembed (arXiv 2507.05513) | enterprise intelligence |
| NVIDIA Isaac GR00T | N1 (developer blog, tech report arXiv 2503.14734), N1.5 (GEAR Lab blog), N1.6 (developer blog) | Physical AI |
| Cosmos | 제품 페이지 링크 | Physical AI |

영역 열은 README가 "enterprise intelligence and Physical AI"라고 적은 두 범주에 맞춰 이 페이지가 나눈 것이다. README는 각 제품이 Eagle을 어떻게 썼는지는 적지 않고 링크만 둔다. 따라서 Nemotron이나 NeMo Retriever 쪽의 채택 내용은 이 wiki에 자료가 없어 확인할 수 없다.

### GR00T backbone 채택 이력

README가 명시한 채택 시점은 세 건이다.

| 시점 | GR00T 버전 | backbone | README가 붙인 링크 |
|---|---|---|---|
| 2025/03 | N1 | Eagle 2 ("VLM backbone (System-2)") | GTC 발표 영상, white paper arXiv 2503.14734 |
| 2025/06 | N1.5 | Eagle 2.5 | GEAR Lab tech blog |
| 2025/12 | N1.6 | Eagle의 native resolution 변형 | GEAR Lab tech blog, HF 컬렉션 gr00t-n16 |

채택이 곧 가중치 재사용은 아니다. [[physical-ai/nvidia-2025-gr00t-n1-5-an-improved-open]]에 따르면 N1.5의 VLM은 Eagle 2.5에서 출발해 grounding과 물리 이해를 겨냥해 다시 튜닝한 모델이며, pre-training과 fine-tuning 양쪽에서 고정된 채 쓰인다. 즉 README의 "adopted"는 출발점이 Eagle이라는 뜻이고, 실제 GR00T에 들어간 가중치는 model zoo가 배포하는 체크포인트와 같지 않다.

### N1.7의 교체

README는 GR00T N1.7을 언급하지 않는다. 그 뒤는 [[physical-ai/nvidia-isaac-gr00t]]의 raw README가 적는다.

| GR00T 버전 | VLM backbone | 근거 |
|---|---|---|
| N1.6 | 저장소에 포함된(vendored) Eagle `nvidia/Eagle-Block2A-2B-v2` | Isaac-GR00T README |
| N1.7 | `nvidia/Cosmos-Reason2-2B` (Qwen3-VL 계열) | Isaac-GR00T README |

따라서 Eagle이 GR00T의 backbone으로 쓰인 구간은 N1부터 N1.6까지 세 세대다. N1.6의 backbone 이름 `Eagle-Block2A-2B-v2`는 이 저장소 model zoo에 없는 체크포인트이며, README가 말한 native resolution 변형이 그것에 해당하는지는 두 자료 어디에도 명시돼 있지 않다.

### 이름 충돌

Eagle 2라는 이름이 두 가지 다른 구성을 가리킨다.

| 자료 | Eagle 2의 LLM | Eagle 2의 vision encoder |
|---|---|---|
| [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] (GR00T N1 논문) | SmolLM2 | SigLIP-2 |
| 이 저장소 model zoo (Eagle2-1B, 2B, 9B) | Qwen2.5-0.5B/1.5B/7B-Instruct | SigLIP (9B는 ConvNext 추가) |

GR00T N1 논문이 말하는 Eagle-2는 SmolLM2와 SigLIP-2에서 fine-tuning한 소형 모델이고, 저장소가 배포하는 Eagle2 계열은 Qwen2.5 기반이다. 같은 이름이 다른 LLM 조합을 가리키므로 backbone을 특정할 때는 어느 계보인지 확인해야 한다. [[physical-ai/nvidia-2025-accelerate-generalist-humanoid-robot-development]]는 N1 발표 블로그가 backbone을 "NVIDIA-Eagle with SmolLM-1.7B"라고만 적었다고 기록하는데, 이 표기 역시 저장소 model zoo에는 없다.

## Model Zoo 구성

README는 계열별로 네 개의 표를 두고 모두 11개 모델을 나열한다. 아래 네 표는 README 표를 그대로 옮긴 것이다.

### LocateAnything 모델

| Model Name | Date | LLM Backbone | Vision Encoder | Max Length | Download |
|---|---|---|---|---|---|
| LocateAnything-3B | 2026.05.26 | Qwen2.5-3B-Instruct | MoonViT-SO-400M | 25K | HF `nvidia/LocateAnything-3B` |

### Eagle 2.5 모델

| Model Name | Date | LLM Backbone | Vision Encoder | Max Length | Download |
|---|---|---|---|---|---|
| Eagle2.5-8B | 2025.04.16 | Qwen2.5-7B-Instruct | SigLIP2 (링크: `google/siglip2-so400m-patch16-512`) | 128K | HF `nvidia/Eagle2.5-8B` |

Eagle2.5-8B의 인코더 표기는 논문과 어긋난다. [[llms/chen-2025-eagle-25-boosting-long-context-post-training]]은 논문 Figure 2가 SigLIP-so400M으로 적는다고 기록하는데, 저장소 표는 SigLIP2를 가리킨다. 배포 체크포인트를 기준으로 삼는다면 저장소 표를 따르는 것이 맞다.

### Eagle 2 모델

| Model Name | Date | LLM Backbone | Vision Encoder | Max Length | Download |
|---|---|---|---|---|---|
| Eagle2-1B | 2025.01.11 | Qwen2.5-0.5B-Instruct | SigLIP | 16K | HF `nvidia/Eagle2-1B` |
| Eagle2-2B | 2025.01.11 | Qwen2.5-1.5B-Instruct | SigLIP | 16K | HF `nvidia/Eagle2-2B` |
| Eagle2-9B | 2025.01.11 | Qwen2.5-7B-Instruct | SigLIP + ConvNext | 16K | HF `nvidia/Eagle2-9B` |

세 행의 SigLIP 링크는 SigLIP 체크포인트가 아니라 `google/paligemma-3b-pt-448` 페이지를 가리킨다. 9B의 ConvNext 링크는 1세대와 같은 `laion/CLIP-convnext_xxlarge-laion2B-s34B-b82K-augreg-soup`다.

### Eagle 모델

1세대 표에는 Max Length 열이 없다.

| Model Name | Date | LLM Backbone | Vision Encoder | Download |
|---|---|---|---|---|
| Eagle-X4-8B-Plus | 2024.09.16 | Llama-3-8B-Instruct | CLIP + ConvNeXt + EVA + Pix2Str | HF `NVEagle/Eagle-X4-8B-Plus` |
| Eagle-X4-13B-Plus | 2024.09.16 | vicuna-13b-v1.5 | CLIP + ConvNeXt + EVA + Pix2Str | HF `NVEagle/Eagle-X4-13B-Plus` |
| Eagle-X5-34B-Plus | 2024.09.16 | Yi-34B | CLIP + ConvNeXt + EVA + Pix2Str + SAM | HF `NVEagle/Eagle-X5-34B-Plus` |
| Eagle-X5-7B | 2024.09.16 | vicuna-7b-v1.5 | CLIP + ConvNeXt + EVA + Pix2Str + SAM | HF `NVEagle/Eagle-X5-7B` |
| Eagle-X5-13B | 2024.09.16 | vicuna-13b-v1.5 | CLIP + ConvNeXt + EVA + Pix2Str + SAM | HF `NVEagle/Eagle-X5-13B` |
| Eagle-X5-13B-Chat | 2024.09.16 | vicuna-13b-v1.5 | CLIP + ConvNeXt + EVA + Pix2Str + SAM | HF `NVEagle/Eagle-X5-13B-Chat` |

X4와 X5의 차이는 SAM 인코더의 유무다. 여섯 모델이 모두 같은 날짜(2024.09.16)를 달고 있고, LLM은 Llama-3-8B-Instruct, vicuna-7b/13b-v1.5, Yi-34B로 다양하다. 1세대 인코더 링크는 다음과 같다.

| 인코더 | 링크 대상 |
|---|---|
| CLIP | `openai/clip-vit-large-patch14-336` |
| ConvNeXt | `laion/CLIP-convnext_xxlarge-laion2B-s34B-b82K-augreg-soup` |
| EVA | `Yuxin-CV/EVA-02`의 `eva02_L_coco_det_sys_o365.pth` |
| Pix2Str | `google/pix2struct-large` |
| SAM | `facebook/sam-vit-large` |

### 세대별 구성 변화

네 표를 나란히 놓으면 계열의 설계 변화가 드러난다.

| 항목 | Eagle (2024) | Eagle 2 (2025.01) | Eagle 2.5 (2025.04) | LocateAnything (2026.05) |
|---|---|---|---|---|
| 모델 수 | 6 | 3 | 1 | 1 |
| LLM | Llama-3, vicuna, Yi | Qwen2.5-Instruct (0.5B, 1.5B, 7B) | Qwen2.5-7B-Instruct | Qwen2.5-3B-Instruct |
| vision encoder | CLIP, ConvNeXt, EVA, Pix2Str, SAM 중 4~5개 | SigLIP (9B는 ConvNext 추가) | SigLIP2 | MoonViT-SO-400M |
| Max Length | 열 없음 | 16K | 128K | 25K |
| HF 계정 | NVEagle | nvidia | nvidia | nvidia |

인코더는 1세대의 4~5개 조합에서 Eagle 2 이후 한두 개로 줄었다. 다만 Eagle2-9B가 ConvNext를 함께 쓰므로 "Eagle 2부터 인코더 하나"라고 단정할 수는 없다. LLM은 Eagle 2 이후 전부 Qwen2.5-Instruct 계열로 통일됐고, README License 절도 "Eagle models are improved using Qwen"이라고 적는다. Max Length는 Eagle 2의 16K에서 Eagle 2.5의 128K로 8배 늘었고 LocateAnything은 25K다. README는 이 차이의 이유를 적지 않는다. 배포 계정은 1세대가 `NVEagle`, 이후가 `nvidia`다.

## LocateAnything 계열

### 통합 localization

LocateAnything은 2026년 5월에 추가된 grounding 모델이다. README "Features and Capabilities" 절의 첫 데모 "Dense Object Detection"은 문서 이해, GUI grounding, 고밀도 object detection, OCR 같은 여러 localization 과제를 하나의 VLM 안에서 수행하는 모습을 영상으로 보인다. 과제마다 별도 모델을 두지 않고 하나의 VLM으로 처리하므로 "generalist"라는 수식이 붙는다.

### Parallel Box Decoding

두 번째 데모 "Fast Decoding Speed"는 Parallel Box Decoding과 Quantized Coordinate Decoding의 속도를 비교하는 영상이다. README 설명은 한 문장이다. PBD는 bounding box 하나를 한 번의 forward pass에서 원자적으로 예측하므로 처리량이 크게 높다. 비교 대상의 동작은 이름 외에 설명이 없으므로, 두 방식의 구체적 차이는 ECCV 2026 논문 쪽에서 확인해야 한다.

### 2026년 6월 추가 기능

공개 한 달 뒤 세 항목이 더해졌다.

| 항목 | 내용 | 위치 |
|---|---|---|
| batch inference | 순수 FlashAttention 런타임. A100, RTX 4090 등 Hopper와 Blackwell이 아닌 GPU에서도 효율적으로 추론 | `Embodied/` |
| visual prompt fine-tuning | LoRA fine-tuning 스크립트 | `Embodied/shell/locate-anything-lora-visual-prompt.sh` |
| ECCV 2026 채택 | 논문 채택 소식 | Updates 절 |

README는 batch inference 항목에서 A100과 RTX 4090을 Hopper와 Blackwell이 아닌 GPU의 예로 들 뿐, 이전 구현의 요구 사양은 적지 않는다. LoRA는 저랭크 행렬만 학습해 fine-tuning 비용을 줄이는 기법이다. visual prompt fine-tuning에 대해서는 스크립트 경로만 있고 방법의 설명은 없다.

### LocateAnything3D

LocateAnything3D는 README에 두 번 등장한다. "3D Perception & Spatial Intelligence" 데모 이미지의 캡션 "Examples of 3D object detection in the wild by LocateAnything3D"와, CVPR 2026 citation "LocateAnything3D: Vision-Language 3D Detection with Chain-of-Sight"다. model zoo 항목과 Get Started 문서 링크는 없으므로, 배포 여부와 구조는 README로 확인할 수 없다.

## 데모

### 여섯 데모

README는 벤치마크 수치 없이 세 절에 걸친 정성 데모 6개로 능력을 보인다.

| 절 | 데모 | 형식 | 내용 |
|---|---|---|---|
| Generalist Grounding & Understanding | Dense Object Detection | 영상 | 문서, GUI, 고밀도 검출, OCR을 한 VLM으로 처리 |
| Generalist Grounding & Understanding | Fast Decoding Speed | 영상 | PBD와 Quantized Coordinate Decoding 비교 |
| Long-Context Multimodal Understanding & Reasoning | VLM Captioning | 텍스트 | 영상을 구간으로 나눠 제목, 상세 caption, 시작 초 출력 |
| Applications across Virtual and Physical Worlds | Document & General VQA | 이미지 | 미국 주별 인구 증감 그래프 질의응답 |
| Applications across Virtual and Physical Worlds | 3D Perception & Spatial Intelligence | 이미지 | LocateAnything3D의 in-the-wild 3D object detection |
| Applications across Virtual and Physical Worlds | Smart City & Metropolis | 이미지 | 도쿄 시부야 교차로의 zero-shot 초고밀도 보행자 검출 |

세 절의 이름이 계열의 세 응용 영역과 대응한다. 첫 절은 LocateAnything, 둘째 절은 long-context 세대, 셋째 절은 문서 VQA와 3D 인식과 도시 규모 검출을 묶어 "virtual and physical worlds"라는 이름으로 적용 폭을 보인다.

데모의 출처 모델은 일부만 확인된다. Dense Object Detection은 캡션이 LocateAnything을 명시하고, 3D 데모는 LocateAnything3D를 명시한다. 반면 VLM Captioning은 캡션에 모델명이 없고, 문서 VQA 이미지는 경로가 `Eagle2_5/assets`, 보행자 검출 이미지는 경로가 `Embodied/assets`일 뿐 캡션에 모델명이 없다.

### 영상 captioning 출력

captioning 데모의 사용자 프롬프트는 "Analyze the video and divide it into distinct sections. For each section, create a title using a few words or phrases, and a detailed caption describing the content of the section, and indicate when it begins in seconds"다. 출력은 여섯 구간이며, 각 구간에 시작 초와 제목과 단락 길이의 상세 caption이 붙는다.

| 시작(초) | 제목 | caption 요지 |
|---|---|---|
| 1.05 | Introduction | 산 정상의 갑옷 입은 전사, 조각된 거대한 돌 위로 오르는 장면, 흰 로브의 현자 등장 |
| 5.99 | Explaining game genre | 숲과 산을 오르는 캐릭터, 군대와의 전투, 석상과의 대결, 설원에서의 결투 |
| 517.10 | Discussing controls | 빙판에서의 지팡이 결투, 왕관 쓴 인물의 주술 의식, 신수를 탄 흰 로브 전사 |
| 614.53 | Talking about story & characters | 숲과 산, 검은 소용돌이 바위를 만지는 Wukong, 한자 자막(Wukong, Peng Lao Dang) |
| 698.69 | Describing visuals & sound | 바다에 잠긴 석조물, 황혼의 숲, 폭포, 조각이 새겨진 돌 |
| 738.62 | Closing | 백발 노인이 바위를 만져 빛나게 함, 계곡으로 내려가며 동료들과 합류 |

구간 제목은 게임 소개 영상의 서사 단위(장르 설명, 조작 설명, 이야기와 캐릭터, 비주얼과 사운드)를 따르고, caption은 화면에 보이는 인물과 배경과 동작을 서술한다. 마지막 구간이 738초 즉 12분을 넘는 시점에서 시작하므로 이 데모는 10분 이상의 영상을 한 번에 입력받아 구간을 나눈 사례다. README는 입력 프레임 수나 처리 시간은 적지 않는다.

### 문서 VQA

질문은 "Based on this graph, how did the population of Puerto Rico change over the last decade?"다. 답변은 그래프가 2010년부터 2020년까지 미국 각 주의 인구 변화를 보여주고, 대부분의 주가 증가했으며 두 곳만 감소했고, 푸에르토리코가 그 둘 중 하나로 약 36만 5천 명(약 12%) 줄었다고 설명한다. 즉 모델이 그래프의 기간을 읽고, 감소한 항목을 골라내고, 절대 수치와 비율을 함께 제시한다.

## 라이선스와 이용 조건

README "License/Terms of Use" 절은 다섯 항목이다.

| 항목 | 내용 |
|---|---|
| 코드 | Apache 2.0 (`LICENSE` 파일). 일부 코드는 재사용된 것이라 원래 라이선스가 적용되며, 수정한 파일에는 출처 표기와 라이선스 헤더가 붙어 있다 |
| 가중치 | CC BY-NC 4.0 또는 NVIDIA License (`Eagle2_5/LICENSE_MODEL`). 모델은 비상업 용도의 research preview다 |
| 기반 모델 | "Eagle models are improved using Qwen" |
| 기여 | `CONTRIBUTING.md` 참조 |
| 준수 의무 | 데이터셋과 가중치 사용이 관련 법규를 준수하는지 사용자가 확인해야 한다 |

코드와 가중치의 라이선스가 분리돼 있으므로, 코드를 가져다 쓰는 것과 배포된 체크포인트를 제품에 쓰는 것은 조건이 다르다. 가중치를 상업적으로 쓰려면 README 조항만으로는 불가하다. 상단 배지는 Model License를 NVIDIA License 하나로만 표시하지만 본문은 CC BY-NC 4.0과 NVIDIA License 둘 중 하나라고 적으므로, 어느 체크포인트가 어느 라이선스인지는 HuggingFace 모델 카드에서 따로 확인해야 한다.

## 코드 계보와 감사

README Acknowledgement 절은 네 항목이다.

| 구분 | 대상 | README 설명 |
|---|---|---|
| 코드베이스 | LLaVA, LLaVA-HR, InternVL | 수정한 구성 요소를 통합했다 |
| 평가 | LMMs-Eval, VLMEvalKit | 파생본을 평가에 쓴다 |
| 데이터 | Cambrian, LLaVA-One-Vision, The Cauldron 등 | 데이터 오픈소싱에 감사 |
| 배포 | NVIDIA TSE Team (Chen Fu, Yuchao Jin, Le An, Josh Park) | TensorRT 최적화와 edge 배포 |

코드 계보가 LLaVA 계열이라는 점은 [[llms/chen-2025-eagle-25-boosting-long-context-post-training]]이 적은 Eagle 2.5의 구조(vision encoder, MLP projection, LLM)와 맞물린다. 평가 도구가 LMMs-Eval과 VLMEvalKit 파생본이라는 점은 기술 보고서의 벤치마크 수치를 재현할 때 참고할 정보다. TSE Team 항목은 Eagle의 TensorRT 최적화와 edge 배포를, Updates는 Eagle 2의 Torch-TRT 지원을 적는다. 두 항목은 배포 경로가 TensorRT 계열임을 보여준다.

## 한계

### 저자가 명시한 제약

- 가중치는 research preview로 비상업 용도에 한정된다.
- 코드 일부는 재사용된 것이어서 원래 라이선스가 적용된다.
- 데이터셋과 가중치의 사용이 관련 법규를 준수하는지 사용자가 확인해야 한다.

### README로 확인할 수 없는 것

- 벤치마크 수치가 없다. 정량 비교는 각 기술 보고서에 의존해야 하며, Eagle 2.5는 [[llms/chen-2025-eagle-25-boosting-long-context-post-training]]에 정리돼 있다.
- 학습 데이터의 공개 여부와 구성은 README에 없다.
- native resolution 변형의 구조와 학습 세부는 GEAR Lab tech blog 링크로만 넘긴다.
- GR00T N1.7 이후의 backbone 교체는 README에 없다. [[physical-ai/nvidia-isaac-gr00t]]가 근거다.
- Nemotron, NeMo Retriever, Cosmos에서 Eagle을 어떻게 썼는지는 링크만 있고 설명이 없다.
- 하위 디렉터리 README와 기술 보고서 PDF는 수집 범위 밖이라 코드 구조와 학습 레시피는 확인할 수 없다.
- 라이선스 조항은 README 본문에 실재하므로 검증됐지만, 체크포인트별로 CC BY-NC 4.0과 NVIDIA License 중 어느 쪽인지는 README로 알 수 없다.

### README 안의 표기 불일치

같은 README 안에서 값이 어긋나는 지점이 네 곳 있다. 삭제하지 않고 기록해 둔다.

| 항목 | 표기 A | 표기 B |
|---|---|---|
| 모델 라이선스 | 상단 배지: NVIDIA License | 본문 License 절: CC BY-NC 4.0 또는 NVIDIA License |
| Eagle 2.5 공개 시점 | Model zoo Date: 2025.04.16 | Updates: 2025/07 모델 공개 (보고서는 2025/04) |
| Eagle 공개 시점 | Model zoo Date: 2024.09.16 | Updates: 2024/08 공개 |
| LocateAnything citation | bibtex key: `wang2025locateanything`, `man2025locateanything3d` | `year` 필드: 2026 |

README가 Date 열의 뜻을 정의하지 않으므로 어느 쪽이 공개일인지 단정할 수 없다. 이 밖에 Eagle 2 행의 SigLIP 링크가 `google/paligemma-3b-pt-448` 페이지를 가리키는 점도 표기 오류인지 의도인지 README만으로는 판단할 수 없다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| mixture-of-encoders | 서로 다른 vision encoder 여러 개를 함께 쓰는 1세대 Eagle의 설계. X4 모델은 4개, X5 모델은 5개의 인코더를 쓴다 |
| Parallel Box Decoding (PBD) | bounding box 하나를 한 번의 forward pass에서 원자적으로 예측하는 LocateAnything의 디코딩. README는 Quantized Coordinate Decoding보다 처리량이 크게 높다고 적는다 |
| LocateAnything | Eagle 기반의 generalist grounding, detection, pointing 모델. 2026/05 공개, ECCV 2026 채택 |
| native resolution 변형 | GR00T N1.6의 backbone으로 채택된 Eagle 변형. README는 세부를 GEAR Lab tech blog로 넘긴다 |
| System-2 | README가 GR00T N1에서 Eagle 2가 맡은 역할을 부르는 이름. 장면과 지시를 해석하는 VLM 쪽 모듈이다 |
| research preview | 연구와 비상업 용도로만 쓰도록 제한한 가중치 배포 형태 |

## 관련 페이지

- [[llms/chen-2025-eagle-25-boosting-long-context-post-training]]: 이 저장소가 배포하는 Eagle 2.5의 기술 보고서. 벤치마크 수치와 학습 레시피는 그 페이지가 다룬다.
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: Eagle-2를 System 2로 쓴 VLA. 그 논문의 Eagle-2는 SmolLM2와 SigLIP-2 기반이라 이 저장소의 Eagle2 계열과 구성이 다르다.
- [[physical-ai/nvidia-2025-gr00t-n1-5-an-improved-open]]: Eagle 2.5에서 출발해 다시 튜닝한 VLM을 고정한 채 쓴 세대의 GEAR Lab 발표 글.
- [[physical-ai/jo-2026-groot-n1-5-vla-primer]]: N1.5의 한국어 해설. backbone 교체를 N1의 인식 병목에 대한 대응으로 설명한다.
- [[physical-ai/nvidia-isaac-gr00t]]: N1.7 배포 저장소. N1.6의 `Eagle-Block2A-2B-v2`에서 N1.7의 Cosmos-Reason2-2B로 backbone이 바뀐 근거다.
- [[physical-ai/nvidia-2025-accelerate-generalist-humanoid-robot-development]]: N1 발표 블로그. backbone을 "NVIDIA-Eagle with SmolLM-1.7B"로 적어 논문과 표기가 다른 사례다.
- [[physical-ai/nvidia-2025-cosmos-world-foundation-model-platform]]: README가 Eagle의 적용처로 함께 꼽는 world foundation model 플랫폼.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리 지도. Eagle 계열을 인접 카테고리 페이지로 잇는다.
