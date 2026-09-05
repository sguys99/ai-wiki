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

## 요약 (Summary)

NVIDIA Research의 Eagle VLM 계열 공식 저장소다. 네 세대가 한 저장소 안에 디렉터리로 나뉘어 들어 있다. 인코더를 여럿 붙여 설계 공간을 훑은 1세대 Eagle, post-training 데이터 전략에 무게를 옮긴 Eagle 2, long-context로 간 Eagle 2.5, 그리고 2026년에 추가된 grounding 모델 LocateAnything이다.

이 저장소가 physical-ai 쪽에서 자주 언급되는 이유는 GR00T 때문이다. README가 Eagle 2 → GR00T N1, Eagle 2.5 → GR00T N1.5, native resolution 변형 Eagle → GR00T N1.6의 backbone 채택을 날짜와 함께 기록한다. Nemotron VLM·NeMo Retriever·Cosmos도 같은 목록에 있다. 연구용 코드 공개를 넘어 NVIDIA 제품군의 VLM 공급처 역할을 저장소가 스스로 명시하는 셈이다.

## 계열 구성 (The Eagle Family)

| 모델 | 초점 | 요약 | 발표 |
|---|---|---|---|
| Eagle | mixture-of-encoders | vision 중심 VLM의 설계 공간 탐색 | ICLR 2025 Spotlight |
| Eagle 2 | 이미지 이해 | frontier VLM을 위한 post-training 데이터 전략 | arXiv:2501.14818 |
| Eagle 2.5 | 이미지 + 영상 | long-context 멀티모달 이해의 프레임워크와 데이터 전략 | NeurIPS 2025 |
| LocateAnything | grounding · detection · pointing | Parallel Box Decoding 기반 vision-language grounding | ECCV 2026 |

1세대의 mixture-of-encoders는 이름 그대로다. Eagle-X5-34B-Plus는 CLIP·ConvNeXt·EVA·Pix2Struct·SAM 다섯 인코더의 출력을 함께 LLM에 넣는다. 2세대부터는 인코더를 SigLIP 한 계열로 정리하고 데이터 쪽으로 초점을 옮겼다.

## GR00T backbone 계보 (VLA Backbone Lineage)

| 시점 | 내용 |
|---|---|
| 2025/03 | Eagle 2가 GR00T N1의 VLM backbone(System 2)으로 채택 |
| 2025/06 | Eagle 2.5가 GR00T N1.5의 VLM backbone으로 채택 |
| 2025/12 | native resolution 변형 Eagle이 GR00T N1.6의 VLM backbone으로 채택 |

채택이 곧 가중치 재사용은 아니다. [[physical-ai/nvidia-2025-gr00t-n1-5-an-improved-open|N1.5]]는 Eagle 2.5에서 출발해 grounding과 물리 이해 쪽으로 다시 튜닝한 VLM을 얼린 채 썼다.

이름이 겹치는 지점도 짚어 둘 필요가 있다. [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation|GR00T N1]] 논문이 말하는 Eagle-2는 SmolLM2와 SigLIP-2에서 fine-tuning한 소형 변형이고, 이 저장소의 model zoo가 배포하는 Eagle2-1B/2B/9B는 Qwen2.5 기반이다. 같은 이름이 붙은 다른 조합이므로 backbone을 특정할 때 계보를 확인해야 한다.

계보는 N1.7에서 끊긴다. [[physical-ai/nvidia-isaac-gr00t|Isaac-GR00T]] 저장소 기준으로 N1.7의 VLM backbone은 `nvidia/Cosmos-Reason2-2B`다. Eagle이 GR00T를 떠받친 구간은 N1부터 N1.6까지다.

## Model Zoo

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

Eagle2.5-8B의 vision encoder 표기가 논문과 다르다. [[llms/chen-2025-eagle-25-boosting-long-context-post-training|기술 보고서]] Figure 2는 SigLIP-so400M으로 적는데 이 표는 SigLIP2를 가리킨다. 배포 체크포인트를 기준으로 삼는다면 이 표 쪽이 맞다.

## LocateAnything

2026년에 들어온 grounding 계열이다. 문서 이해·GUI grounding·고밀도 object detection·OCR을 하나의 VLM으로 처리한다. 속도의 핵심은 Parallel Box Decoding이다. 좌표를 양자화해 토큰으로 하나씩 생성하는 기존 방식 대신 box 하나를 한 번의 forward pass에서 통째로 예측한다.

2026/06 업데이트로 순수 FlashAttention 런타임 batch inference가 들어와 Hopper·Blackwell이 아닌 A100·RTX 4090에서도 돌릴 수 있고, LoRA 기반 visual prompt fine-tuning 스크립트도 함께 공개됐다. 별도 계열인 LocateAnything3D는 Chain-of-Sight를 쓰는 vision-language 3D detection으로 CVPR 2026에 실린다. README의 데모는 시부야 교차로 zero-shot 초고밀도 보행자 검출이다.

## 라이선스와 실무 제약 (License & Gotchas)

- 코드는 Apache-2.0이지만 가중치는 CC BY-NC 4.0 또는 NVIDIA License의 research preview다. 상업적 사용이 막혀 있다.
- Eagle 2·2.5의 학습 데이터는 공개되지 않는다. 저장소가 주는 것은 코드와 가중치이고, 데이터는 기술 보고서의 목록으로만 확인된다.
- 한 저장소에 네 세대가 섞여 있어 경로로 세대를 구분해야 한다. `Eagle/`이 1·2세대, `Eagle2_5/`가 2.5, `Embodied/`가 LocateAnything이다.
- README는 GR00T N1.7 이후를 다루지 않는다. backbone 교체는 GR00T 쪽 저장소에서만 확인된다.
- 코드베이스는 LLaVA·LLaVA-HR·InternVL 구성 요소를 수정해 통합했고, 평가는 LMMs-Eval·VLMEvalKit 파생본을 쓴다. 모델은 Qwen 기반으로 개선했다고 명시한다.

## 관련 페이지 (Related Pages)

- [[llms/chen-2025-eagle-25-boosting-long-context-post-training]] — 이 저장소가 배포하는 Eagle 2.5의 기술 보고서
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — Eagle-2를 System 2로 쓴 VLA
- [[physical-ai/nvidia-2025-gr00t-n1-5-an-improved-open]] — Eagle 2.5를 backbone으로 쓴 세대의 GEAR Lab 발표 글
- [[physical-ai/nvidia-isaac-gr00t]] — N1.7에서 backbone이 Cosmos-Reason2-2B로 바뀐 후속 저장소
- [[physical-ai/nvidia-2025-cosmos-world-foundation-model-platform]] — README가 Eagle의 적용처로 함께 꼽는 world foundation model 플랫폼
- [[physical-ai/cui-2025-openhelix-a-short-survey-empirical]] — VLM을 System 2로 쓰는 dual-system VLA의 설계 공간 정리

## 외부 참조 (External References)

- 저장소: <https://github.com/NVlabs/EAGLE>
- 프로젝트 페이지: <https://nvlabs.github.io/Eagle/>
- 모델 컬렉션: <https://huggingface.co/collections/nvidia/eagle>
