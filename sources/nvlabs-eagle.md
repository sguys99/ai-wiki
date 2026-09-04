---
title: "Eagle: Frontier Vision-Language Models with Data-Centric Strategies"
type: repo
year: 2026
category: llms
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/repos/nvlabs-eagle.md
raw_filename: "nvlabs-eagle.md"
source_collection: external
org: "NVlabs"
repo: "EAGLE"
url: "https://github.com/NVlabs/EAGLE"
license: "Apache-2.0 (code) / CC BY-NC 4.0 또는 NVIDIA License (model weights, research preview)"
tags: [vlm, eagle, nvidia, long-context, grounding, mixture-of-encoders, vla-backbone, groot, model-zoo]
figures:
  - id: fig01
    label: Eagle 로고
    kind: figure
    file: assets/nvlabs-eagle/fig01.png
    raw: https://github.com/NVlabs/EAGLE/blob/main/Eagle/assets/Eagle.png
    caption: "README 상단 로고 (장식용)"
    strategy: manual
    curated: false
  - id: fig02
    label: Document & General VQA
    kind: figure
    file: assets/nvlabs-eagle/fig02.png
    raw: https://github.com/NVlabs/EAGLE/blob/main/Eagle2_5/assets/Population.png
    caption: "미국 주별 인구 증감 그래프에 대한 Eagle 2.5의 문서 VQA 예시"
    strategy: manual
    curated: false
  - id: fig03
    label: LocateAnything3D
    kind: figure
    file: assets/nvlabs-eagle/fig03.png
    raw: https://github.com/NVlabs/EAGLE/blob/main/Embodied/assets/images/LocateAnything3D.png
    caption: "LocateAnything3D의 in-the-wild 3D object detection 예시"
    strategy: manual
    curated: false
  - id: fig04
    label: Smart City & Metropolis
    kind: figure
    file: assets/nvlabs-eagle/fig04.png
    raw: https://github.com/NVlabs/EAGLE/blob/main/Embodied/assets/images/Smart_City.png
    caption: "시부야 교차로의 zero-shot 초고밀도 보행자 검출 예시"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

NVIDIA Research가 mixture-of-encoders(Eagle) → post-training 데이터 전략(Eagle 2) → long-context(Eagle 2.5) → grounding(LocateAnything)으로 이어 온 VLM 계열의 공식 저장소. 논문 코드와 model zoo를 담는 동시에, Nemotron VLM·NeMo Retriever·Isaac GR00T·Cosmos 같은 NVIDIA 주력 제품의 VLM backbone 공급처 역할을 명시한다.

## 1. 자료 정보 (Document Information)

- **저장소**: <https://github.com/NVlabs/EAGLE> (NVlabs/EAGLE)
- **라이선스**: 코드 Apache-2.0. 가중치는 CC BY-NC 4.0 또는 NVIDIA License의 research preview로 비상업적 용도 한정
- **수집 범위**: 루트 `README.md` 전문 (2026-09-04 기준)
- **프로젝트 페이지**: <https://nvlabs.github.io/Eagle/> · 모델 컬렉션 <https://huggingface.co/collections/nvidia/eagle>
- **wiki 내 짝 자료**: [[chen-2025-eagle-25-boosting-long-context-post-training]] — 이 저장소의 Eagle 2.5 기술 보고서

## 2. 주요 기여 (Key Contributions)

1. **한 계열의 네 세대를 한 저장소에 묶었다.** Eagle(ICLR 2025 Spotlight), Eagle 2(arXiv:2501.14818), Eagle 2.5(NeurIPS 2025), LocateAnything(ECCV 2026)의 코드·문서·가중치가 하위 디렉터리로 나뉘어 함께 배포된다.
2. **NVIDIA 제품군의 VLM backbone 공급처임을 명문화했다.** README는 Eagle이 연구 산출물에 그치지 않고 Llama-Nemotron Nano VLM, Nemotron VLM(V2 Nano VL·V3 Nano Omni), NeMo Retriever(Llama Nemoretriever Colembed), Isaac GR00T N1·N1.5·N1.6, Cosmos를 떠받치는 R&D 플랫폼이라고 적는다.
3. **GR00T 채택 이력을 날짜 단위로 남겼다.** 아래 3.2가 이 wiki의 GR00T 페이지들과 맞물리는 지점이다.
4. **LocateAnything과 Parallel Box Decoding.** bounding box를 한 번의 forward pass에서 통째로 예측해, 좌표를 토큰으로 하나씩 뱉는 quantized coordinate decoding보다 처리량을 크게 올린 grounding 모델을 2026년에 추가했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 계열의 성격 구분

README의 모델 표가 네 세대의 초점을 한 줄씩 정리한다.

| 모델 | 초점 | 요약 |
|---|---|---|
| Eagle | mixture-of-encoders | vision 중심 VLM의 설계 공간 탐색 |
| Eagle 2 | 이미지 이해 SOTA | frontier VLM을 위한 post-training 데이터 전략 |
| Eagle 2.5 | 이미지 + 영상 SOTA | long-context 멀티모달 이해의 프레임워크와 데이터 전략 |
| LocateAnything | grounding · detection · pointing | Parallel Box Decoding으로 빠르고 정확한 vision-language grounding |

1세대 Eagle의 mixture-of-encoders는 이름 그대로 인코더를 여럿 붙이는 설계다. model zoo의 Eagle-X5-34B-Plus는 CLIP·ConvNeXt·EVA·Pix2Struct·SAM 다섯 개를 함께 쓴다. 2세대부터는 인코더를 SigLIP 한 계열로 정리하고 데이터 전략 쪽에 무게를 옮겼다.

### 3.2 GR00T와의 연결

이 저장소가 physical-ai 쪽에서 중요한 이유는 VLA의 backbone 공급 이력에 있다. README `Updates` 절이 시점을 명시한다.

| 시점 | 내용 |
|---|---|
| 2025/03 | Eagle 2가 GR00T N1의 VLM backbone(System 2)으로 채택 |
| 2025/06 | Eagle 2.5가 GR00T N1.5의 VLM backbone으로 채택 |
| 2025/12 | native resolution 변형 Eagle이 GR00T N1.6의 VLM backbone으로 채택 |

이 wiki가 이미 보유한 [[nvidia-2025-gr00t-n1-an-open-foundation]]은 System 2를 "SmolLM2와 SigLIP-2에서 fine-tuning한 Eagle-2"로 적는다. 여기서 갈래가 하나 갈린다. GR00T 쪽 Eagle-2는 SmolLM2 기반 소형 변형이고, 이 저장소 model zoo가 배포하는 Eagle2-1B/2B/9B는 Qwen2.5 기반이다. 같은 이름이 붙은 다른 조합이므로 backbone을 특정할 때는 어느 쪽 계보인지 확인해야 한다.

계보는 N1.7에서 끊긴다. [[nvidia-isaac-gr00t]] 저장소 기준 N1.7의 VLM backbone은 `nvidia/Cosmos-Reason2-2B`로 바뀌었다. Eagle이 GR00T의 backbone이었던 구간은 N1부터 N1.6까지다.

### 3.3 Model Zoo

| 세대 | 모델 | 공개일 | LLM backbone | Vision encoder | Max length |
|---|---|---|---|---|---|
| LocateAnything | LocateAnything-3B | 2026.05.26 | Qwen2.5-3B-Instruct | MoonViT-SO-400M | 25K |
| Eagle 2.5 | Eagle2.5-8B | 2025.04.16 | Qwen2.5-7B-Instruct | SigLIP2-so400m-patch16-512 | 128K |
| Eagle 2 | Eagle2-1B | 2025.01.11 | Qwen2.5-0.5B-Instruct | SigLIP | 16K |
| Eagle 2 | Eagle2-2B | 2025.01.11 | Qwen2.5-1.5B-Instruct | SigLIP | 16K |
| Eagle 2 | Eagle2-9B | 2025.01.11 | Qwen2.5-7B-Instruct | SigLIP + ConvNeXt | 16K |
| Eagle | Eagle-X4-8B-Plus | 2024.09.16 | Llama-3-8B-Instruct | CLIP + ConvNeXt + EVA + Pix2Struct | — |
| Eagle | Eagle-X4-13B-Plus | 2024.09.16 | vicuna-13b-v1.5 | CLIP + ConvNeXt + EVA + Pix2Struct | — |
| Eagle | Eagle-X5-34B-Plus | 2024.09.16 | Yi-34B | CLIP + ConvNeXt + EVA + Pix2Struct + SAM | — |
| Eagle | Eagle-X5-7B / 13B / 13B-Chat | 2024.09.16 | vicuna-7b/13b-v1.5 | CLIP + ConvNeXt + EVA + Pix2Struct + SAM | — |

Eagle2.5-8B의 vision encoder 표기가 논문과 다르다. 논문 Figure 2는 SigLIP-so400M으로 적는데 이 표는 SigLIP2를 가리킨다. 배포 체크포인트 기준으로는 이 표를 따르는 것이 맞다.

### 3.4 LocateAnything

2026년에 추가된 grounding 계열이다. 문서 이해·GUI grounding·고밀도 object detection·OCR을 하나의 VLM으로 처리한다. 속도의 핵심은 Parallel Box Decoding이다. 좌표를 양자화해 토큰으로 하나씩 생성하는 방식 대신 box 하나를 한 번의 forward pass에서 통째로 예측한다.

2026/06 업데이트로 순수 FlashAttention 런타임 batch inference가 들어와 Hopper·Blackwell이 아닌 A100·RTX 4090에서도 돌아가고, LoRA 기반 visual prompt fine-tuning 스크립트가 함께 공개됐다. 별도 계열인 LocateAnything3D는 Chain-of-Sight를 쓰는 vision-language 3D detection으로 CVPR 2026에 실린다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README는 수치 표를 싣지 않고 정성 데모로 능력을 보인다.

- **긴 영상 captioning**: 사용자가 영상을 구간으로 나눠 제목과 상세 caption을 시작 초와 함께 달라고 요청하면, Eagle 2.5가 1.05초·5.99초·517.10초·614.53초·698.69초·738.62초 구간을 잡아 각각 단락 단위 설명을 낸다.
- **문서·일반 VQA**: 미국 주별 인구 증감 그래프를 읽고 푸에르토리코 인구가 10년간 약 365,000명, 약 12% 줄었다고 답한다.
- **3D perception**: LocateAnything3D의 in-the-wild 3D object detection 예시.
- **Smart City**: 시부야 교차로에서 zero-shot 초고밀도 보행자 검출.

정량 수치는 각 기술 보고서 쪽에 있다. Eagle 2.5의 벤치마크는 [[chen-2025-eagle-25-boosting-long-context-post-training]]에 정리해 뒀다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 가중치가 research preview라 상업적 사용이 막혀 있다. 코드만 Apache-2.0이고 모델은 CC BY-NC 4.0 또는 NVIDIA License다.
- Eagle 2와 Eagle 2.5의 학습 데이터는 공개되지 않는다. 저장소가 배포하는 것은 코드와 가중치이고, 데이터는 보고서의 목록으로만 확인된다.
- 1세대 Eagle과 2세대 이후의 문서가 한 저장소 안에서 디렉터리로만 나뉘어 있어, 어느 세대의 코드를 보는지 경로로 구분해야 한다(`Eagle/`, `Eagle2_5/`, `Embodied/`).
- README가 GR00T N1.7 이후는 다루지 않는다. backbone 교체 사실은 GR00T 쪽 저장소에서만 확인된다.

## 6. 관련 연구 (Related Work)

코드베이스는 LLaVA·LLaVA-HR·InternVL의 구성 요소를 수정해 통합했고, 평가는 LMMs-Eval과 VLMEvalKit 파생본을 쓴다. 데이터 쪽으로는 Cambrian, LLaVA-OneVision, The Cauldron의 오픈소싱에 감사를 표한다. 모델은 Qwen을 기반으로 개선했다고 명시한다.

- [[chen-2025-eagle-25-boosting-long-context-post-training]] — 이 저장소의 Eagle 2.5 기술 보고서
- [[nvidia-2025-gr00t-n1-an-open-foundation]] — Eagle-2를 System 2로 쓴 VLA
- [[nvidia-isaac-gr00t]] — N1.7에서 backbone이 Cosmos-Reason2-2B로 바뀐 후속 저장소
- [[nvidia-2025-cosmos-world-foundation-model-platform]] — README가 Eagle의 적용처로 함께 꼽는 world foundation model 플랫폼

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| mixture-of-encoders | 서로 다른 vision encoder 여러 개의 출력을 함께 LLM에 넣는 1세대 Eagle의 설계 |
| LocateAnything | Eagle 기반 grounding·detection·pointing 모델. ECCV 2026 |
| Parallel Box Decoding (PBD) | bounding box를 좌표 토큰으로 순차 생성하지 않고 한 번의 forward pass에서 통째로 예측하는 디코딩 |
| Chain-of-Sight | LocateAnything3D가 쓰는 3D detection 추론 방식. CVPR 2026 |
| native resolution 변형 | 이미지를 고정 해상도로 맞추지 않고 원본 해상도 그대로 처리하는 Eagle 변형. GR00T N1.6의 backbone |
| research preview | 연구·비상업 용도로만 쓰도록 제한된 가중치 배포 형태 |

## 8. 그림 후보 (Figure Candidates)

repo 유형이라 이미지를 자동으로 내려받지 않는다. 아래는 README에 걸린 이미지의 원본 위치이며, 필요할 때 사용자가 직접 저장한다.

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | Eagle 로고 | manual | (장식용 — 불필요) |
| fig02 | 인구 그래프 문서 VQA 예시 | manual | (확인 필요) |
| fig03 | LocateAnything3D의 3D object detection | manual | (확인 필요) |
| fig04 | 시부야 교차로 보행자 검출 | manual | (확인 필요) |
