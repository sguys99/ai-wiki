---
title: "State of Vision-Language-Action (VLA) Research at ICLR 2026"
type: article
year: 2025
category: physical-ai
raw_path: raw/articles/reuss-2025-state-of-vision-language-action.md
raw_filename: "reuss-2025-state-of-vision-language-action.md"
source_collection: external
author: "Moritz Reuss"
url: "https://mbreuss.github.io/blog_post_iclr_26_vla.html"
publisher: "mbreuss.github.io"
publication_date: "2025-10-10"
fetched_at: "2026-09-17T21:30:08+0900"
extractor_tier: "chrome"
tags: [physical-ai, vla, benchmark, robot-learning]
figures:
  - id: fig01
    file: assets/reuss-2025-state-of-vision-language-action/fig01.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/fig01.png
    caption: "글 머리 콜라주. RoboArena 무한, FASTer 토크나이저, X-VLA, dVLA, RoboCasa365 도식을 모아 놓은 표지 이미지 (1297×733)"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/reuss-2025-state-of-vision-language-action/fig02.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/fig02.png
    caption: "VLA 판정 flowchart. pre-training된 VLM 또는 언어 조건부 video model을 포함하고 action을 예측하면 VLA, 아니면 VLM이나 video model로 분류한다 (1860×887)"
    strategy: fetched
    curated: true
  - id: fig03
    file: assets/reuss-2025-state-of-vision-language-action/fig03.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/fig03.png
    caption: "LBM 판정 flowchart. 언어 조건부이든 다른 goal 조건부이든 대규모 로봇 데이터로 pre-training했으면 LBM, 아니면 언어 조건부, goal 조건부, 단일 과제 policy로 분류한다 (1909×992)"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/reuss-2025-state-of-vision-language-action/fig04.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/fig04.png
    caption: "VLA 시뮬레이션 벤치마크 네 종의 장면. 왼쪽부터 CALVIN, LIBERO, SIMPLER Google Robot, SIMPLER Bridge (1276×397)"
    strategy: fetched
    curated: true
  - id: fig05
    file: assets/reuss-2025-state-of-vision-language-action/fig05.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/fig05.png
    caption: "action 생성 방식 비교. 연속 diffusion, autoregressive(순차), BERT와 discrete diffusion(병렬)을 나란히 놓고 discrete diffusion은 불확실한 토큰을 다시 마스킹해 반복 정제한다 (Discrete Diffusion VLA 논문 도식, 2100×520)"
    strategy: fetched
    curated: true
  - id: fig06
    file: assets/reuss-2025-state-of-vision-language-action/fig06.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/fig06.png
    caption: "FASTer 토크나이저 구조. 왼쪽은 single-arm, bimanual, whole-body action을 patch로 묶는 action patchifier, 오른쪽은 Transformer 인코더, RVQ, 디코더와 DCT 기반 주파수 영역 L1 손실과 시간 영역 L1 손실로 이루어진 action tokenization 파이프라인 (787×282)"
    strategy: fetched
    curated: true
  - id: fig07
    file: assets/reuss-2025-state-of-vision-language-action/fig07.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/fig07.png
    caption: "Disentangled Robot Learning의 pre-training 패러다임. 사람 영상과 로봇 영상으로 forward dynamics model과 Inverse Dynamics Model을 따로 pre-training한 뒤 coupled fine-tuning으로 결합해 observation에서 action을 낸다 (1946×1206)"
    strategy: fetched
    curated: true
  - id: fig08
    file: assets/reuss-2025-state-of-vision-language-action/fig08.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/fig08.png
    caption: "RoboArena 무한 벤치마크 개요. DROID, Bridge V2, RH20T 데이터셋과 사용자 촬영 영상을 real2sim으로 옮겨 대규모 시뮬레이션 환경을 만들고, VLM 점수 기반 자동 평가와 사람 선호 기반 pairwise 평가로 policy 순위를 낸다 (2128×924)"
    strategy: fetched
    curated: true
  - id: fig09
    file: assets/reuss-2025-state-of-vision-language-action/fig09.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/fig09.png
    caption: "X-VLA가 정리한 action space 처리 방식 네 가지. (a) 데이터셋별 action projection, (b) HPT식 projection, (c) 로봇 설명 language prompt, (d) 데이터셋 ID로 고르는 soft prompt (2648×694)"
    strategy: fetched
    curated: true
  - id: fig10
    file: assets/reuss-2025-state-of-vision-language-action/fig10.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/fig10.png
    caption: "closed-weight SOTA VLA(π0.5, Gemini Robotics)와 fully open-source VLA(RDT-1B, OpenVLA, SmolVLA, EO-1 등)의 논문 도식을 모아 놓은 콜라주 (1930×857)"
    strategy: fetched
    curated: false
  - id: fig11
    file: assets/reuss-2025-state-of-vision-language-action/fig11.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/fig11.png
    caption: "RoboArena policy 리더보드 (2025-10-10 기준, 오픈소스 policy만 표시). paligemma_fast_specialist_droid 1874점부터 paligemma_binning_droid 755점까지 6개 항목 가운데 Physical Intelligence 계열이 아닌 모델은 dam(988점) 하나다 (1033×480)"
    strategy: fetched
    curated: true
  - id: fig12
    file: assets/reuss-2025-state-of-vision-language-action/page-full.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/page-full.png
    caption: "전체 페이지 스크린샷 (상단 6,000px, 원본 13,109px)"
    strategy: screenshot
    curated: false
  - id: fig13
    file: assets/reuss-2025-state-of-vision-language-action/crop01.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/crop01.png
    caption: "글 머리 콜라주 크롭 (fig01 중복)"
    strategy: crop
    curated: false
  - id: fig14
    file: assets/reuss-2025-state-of-vision-language-action/crop02.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/crop02.png
    caption: "VLA 판정 flowchart 크롭 (fig02 중복)"
    strategy: crop
    curated: false
  - id: fig15
    file: assets/reuss-2025-state-of-vision-language-action/crop03.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/crop03.png
    caption: "LBM 판정 flowchart 크롭 (fig03 중복)"
    strategy: crop
    curated: false
  - id: fig16
    file: assets/reuss-2025-state-of-vision-language-action/crop04.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/crop04.png
    caption: "시뮬레이션 벤치마크 장면 크롭 (fig04 중복)"
    strategy: crop
    curated: false
  - id: fig17
    file: assets/reuss-2025-state-of-vision-language-action/crop05.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/crop05.png
    caption: "discrete diffusion 비교 도식 크롭 (fig05 중복)"
    strategy: crop
    curated: false
  - id: fig18
    file: assets/reuss-2025-state-of-vision-language-action/crop06.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/crop06.png
    caption: "FASTer 토크나이저 도식 크롭 (fig06 중복)"
    strategy: crop
    curated: false
  - id: fig19
    file: assets/reuss-2025-state-of-vision-language-action/crop07.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/crop07.png
    caption: "Disentangled Robot Learning 도식 크롭 (fig07 중복)"
    strategy: crop
    curated: false
  - id: fig20
    file: assets/reuss-2025-state-of-vision-language-action/crop08.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/crop08.png
    caption: "RoboArena 무한 개요 크롭 (fig08 중복)"
    strategy: crop
    curated: false
  - id: fig21
    file: assets/reuss-2025-state-of-vision-language-action/crop09.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/crop09.png
    caption: "X-VLA action space 처리 방식 크롭 (fig09 중복)"
    strategy: crop
    curated: false
  - id: fig22
    file: assets/reuss-2025-state-of-vision-language-action/crop10.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/crop10.png
    caption: "closed-weight 대 open-source VLA 콜라주 크롭 (fig10 중복)"
    strategy: crop
    curated: false
  - id: fig23
    file: assets/reuss-2025-state-of-vision-language-action/crop11.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/crop11.png
    caption: "RoboArena 리더보드 크롭 (fig11 중복)"
    strategy: crop
    curated: false
  - id: fig24
    file: assets/reuss-2025-state-of-vision-language-action/crop12.png
    raw: raw/articles/reuss-2025-state-of-vision-language-action-figures/crop12.png
    caption: "ICLR VLA 투고 수 성장 막대 차트 (본문 인라인 SVG를 별도 캡처). 2024년 1편, 2025년 9편, 2026년 164편이고 2027년은 1,000편 이상으로 점선 표시했다 (640×512)"
    strategy: crop
    curated: true
---

## 한 줄 요약 (One-line Summary)

FLOWER VLA와 BEAST 토크나이저의 저자 Moritz Reuss가 ICLR 2026 공개 투고작 가운데 "Vision-Language-Action" 키워드 164편을 훑어 정리한 현황 글이다. VLA의 정의(인터넷 규모 vision-language pre-training이 기준), 투고 수 성장, LIBERO와 CALVIN과 SIMPLER 결과를 읽는 실무 기준, 9가지 연구 흐름과 대표 논문 26편, 그리고 시뮬레이션 리더보드가 감추는 frontier lab과 학계 사이의 zero-shot 격차를 다룬다.

## 1. 자료 정보 (Document Information)

- 저자: Moritz Reuss. 글 안에서 본인의 VLA인 FLOWER와 "우리 BEAST 논문"을 언급하고, 시뮬레이션 벤치마크로 아이디어를 검증하는 박사과정 연구자 가운데 한 명으로 자신을 소개한다.
- 발행: 2025년 10월 (페이지 메타데이터 기준 2025-10-10), 개인 블로그
- URL: https://mbreuss.github.io/blog_post_iclr_26_vla.html
- 성격: ICLR은 매년 가을 마감 몇 주 뒤 익명 투고작 전부를 공개한다. 다른 상위 ML 학회의 6개월 지연 없이 진행 중인 연구를 실시간으로 볼 수 있는 창이다. 저자는 이 창을 이용해 VLA 키워드 투고작을 훑고 개인적인 선별과 의견을 정리했다. 저자 스스로 "개인 선별이며 빠뜨린 우수 논문이 있을 수 있다"고 밝힌다.
- 인용 키: `reuss2025state-vla-iclr26` (BibTeX는 원문 말미)

## 2. 주요 기여 (Key Contributions)

- VLA를 "인터넷 규모 vision-language 데이터로 pre-training한 backbone을 제어 명령 생성으로 이어 학습한 모델"로 정의하고, 판정 flowchart(Figure 1)와 LBM 판정 flowchart(Figure 2)를 함께 제시한다.
- OpenReview 키워드 검색으로 ICLR 2024년 1편, 2025년 9편, 2026년 164편이라는 성장 수치를 제시한다. 1년 사이 18배다.
- LIBERO, CALVIN, SIMPLER, RLBench 결과를 읽는 실무 기준(어느 수치부터 SOTA 범위인지)을 수치로 제시한다.
- 투고작을 9가지 흐름으로 묶고 흐름마다 대표 논문을 TL;DR과 함께 소개한다. 총 26편이다.
- 시뮬레이션 리더보드가 감추는 frontier lab과 학계의 zero-shot 격차를 논증한다. 원인 6가지, 반론 1가지, 처방 2가지를 제시한다.
- 데이터 품질과 in-context learning을 현재 VLA 연구에서 과소 대표된 두 문제로 지목한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### VLA의 정의

VLA의 정의에는 공동체 합의가 없다. 최근 서베이 논문(arXiv 2510.07077)은 "시각 observation과 자연어 지시문(instruction)을 필수 입력으로 받고 추가 센서 모달리티를 받을 수 있으며 제어 명령을 직접 생성해 로봇 action을 내는 시스템"으로 넓게 정의한다. 저자는 이 정의가 타당하지만 다른 multimodal policy와 구분하는 결정적 특징, 즉 어떤 형태로든 vision-language 데이터에 대한 인터넷 규모 pre-training을 빠뜨렸다고 본다.

저자의 정의는 다음과 같다. VLA는 대규모 vision-language 데이터로 학습한 pre-training된 backbone을 쓰고, 이어서 제어 명령을 생성하도록 학습한 모델이다. 제어 명령은 로봇 관절, end-effector pose, 자동차 조향각, latent action, 가상 에이전트의 마우스와 키보드 명령 어느 것이든 된다. pre-training된 video 생성 모델을 backbone으로 쓰는 Video-Action Policy도 포함한다. 인터넷 규모 pre-training이 없으면 VLA가 아니라 multimodal policy로 부른다.

경계가 흐린 경우는 CLIP-text나 T5 같은 pre-training된 텍스트 인코더와 DINOv2나 SigLIP-Vision 같은 별도로 pre-training된 vision 인코더를 조합한 모델이다. 저자는 vision-language 결합 pre-training이 없다는 이유로 이들을 multimodal policy로 분류한다. Figure 1의 flowchart는 이 기준을 그대로 옮긴 것이다. pre-training된 VLM을 포함하고 로봇 action을 예측하면 VLA, 예측하지 않으면 VLM이다. VLM이 없더라도 pre-training된 언어 조건부 video model을 포함하고 action을 예측하면 VLA, 아니면 video model이다.

이 구분이 중요한 이유는 인터넷 규모 pre-training이 이론상 VLA의 moat, 즉 더 강한 지시문 따르기와 과제와 환경을 넘나드는 일반화를 주기 때문이다. 다만 저자는 현실이 약속과 다르다고 적는다. 현재 VLA 대부분은 여전히 zero-shot 일반화와 복잡한 과제에 약해서 "덜 멍청한 multimodal policy"라는 표현이 더 어울리며, 범용 로봇 두뇌라고 부르기는 이르다.

### LBM과의 관계

Large Behavior Model(LBM)은 Toyota Research Institute(TRI)의 논문(arXiv 2507.05331)이 쓴 용어다. LBM은 대규모 멀티태스크 로봇 시연 데이터(demonstration)로 학습한 policy이며 인터넷 규모 vision-language pre-training이나 VLM backbone을 요구하지 않는다. 대규모 로봇 데이터로 학습한 모든 VLA는 LBM이지만 모든 LBM이 VLA는 아니다. 두 용어를 합치면 로봇 foundation policy 전체를 덮는다. Figure 2의 flowchart는 언어 조건부인지, 다른 goal 조건부인지, 대규모 로봇 데이터로 pre-training했는지를 물어 LBM, 언어 조건부 policy, goal 조건부 policy, 단일 과제 policy로 나눈다.

### 투고 수의 성장

OpenReview에서 "Vision-Language-Action" 키워드로 검색한 ICLR 투고 수는 다음과 같다.

| ICLR | 투고 수 |
|---|---|
| 2024 | 거절된 투고 1편 |
| 2025 | 채택 6편, 거절 3편 |
| 2026 | 164편 (전년 대비 18배) |

저자는 Vision 같은 다른 분야에서 로봇 학습으로 들어오는 사람이 많아졌다고 해석한다. 본문은 ICLR 2027에 2,100편 이상이 투고될 것으로 추정하면서도 분야가 성숙하면 성장률이 안정될 것이라고 본다. 본문에 삽입된 SVG 차트는 2027년을 "1000+?"로 표시해 본문 수치와 차이가 있다.

### 벤치마크 결과 해석 가이드

이 글이 언급한 논문의 90%는 LIBERO, SIMPLER, CALVIN 가운데 하나로 평가한다. 대부분의 논문이 이 시뮬레이션 벤치마크에서 서로만 비교하므로 어느 모델이 가장 좋다고 단정할 수 없다.

LIBERO는 사실상 풀렸다. 99% 대 98% 비교는 의미가 없고, 경쟁력 있는 결과를 내는 데 VLA나 대규모 pre-training이 필요하지도 않다. 이 글에 나오는 discrete diffusion policy 네 편은 모두 LIBERO의 네 버전(Goal, Spatial, Long, Object) 평균 95~98%를 낸다. LIBERO는 원래 lifelong learning 벤치마크로 설계됐지만, 결과를 보고하는 모델의 99%는 전체 데이터셋으로 한 번에 학습하고 continual learning을 하지 않는다.

| 벤치마크 | 버전 | 기준 |
|---|---|---|
| LIBERO | Spatial, Goal, Object | 95% 초과가 기본 기대치 |
| LIBERO | Long | 90~95% 필요 |
| LIBERO | 공통 | 90% 미만은 고정 카메라 전용이나 few-shot 설정에서만 허용 |
| CALVIN | ABC (A, B, C로 학습해 D에서 평가) | 4 초과가 표준, 4.5 초과가 SOTA 범위. 미학습 setup 일반화를 재므로 가장 중요 |
| CALVIN | D (D로 학습해 D에서 평가) | 3.75가 표준, 4 초과가 매우 좋음. fine-tuning 능력을 잰다 |
| CALVIN | ABCD (A, B, C, D로 학습해 D에서 평가) | 4.5 초과부터 의미 있음. 더 다양한 데이터에서 얼마나 이득을 보는지 잰다 |
| SIMPLER | Bridge | 논문마다 40%에서 99%까지 퍼져 있어 논문 간 비교가 어렵다 |
| SIMPLER | Google Robot | 현재 SOTA 모델은 70~80% 성공률 |

제대로 튜닝한 Diffusion Policy만으로도 LIBERO 기준에 도달할 수 있지만, 가장 많이 인용되는 Diffusion Policy baseline 수치는 그보다 낮다. CALVIN은 FLOWER 같은 현재 SOTA 모델이 거의 포화시켰다.

RLBench는 가장 인기 있는 3D policy 벤치마크인데 VLA 벤치마크로도 쓰임이 늘고 있다. 그러나 모든 VLA가 3DDA 같은 3D SOTA 방법에 크게 뒤지며, 대부분의 VLA 논문은 관련 3D baseline 전부와 비교하기를 피한다. 실제 로봇 결과는 많을수록 좋다. 70억 개 이상 파라미터를 가진 모델이 벤치마크에 과적합하기 쉬워서 시뮬레이션만으로는 신뢰하기 어렵다.

### 9가지 연구 흐름

저자는 VLA 키워드 투고작 대부분을 훑어 9가지 흐름을 뽑았다. 흐름끼리 겹침이 크다. 예를 들어 discrete diffusion과 embodied reasoning을 결합하거나 효율적인 구조와 새 토크나이저를 결합한 논문이 있다.

#### 1. discrete diffusion VLA

텍스트(MDLM)와 VLM(LLaDA-V)에서 discrete diffusion이 성공하면서 VLA로 들어왔다. discrete diffusion을 쓰는 이유는 병렬 생성이다. autoregressive 모델과 달리 시퀀스를 병렬로 만들 수 있어 이산 action 토큰 생성에 유리하다. policy를 100번 실행하는 대신 몇 번의 forward pass로 긴 action 시퀀스를 만든다. ECoT와 결합하면 subgoal과 추론을 action과 함께 병렬로 생성할 수 있어, autoregressive VLM 때문에 매우 느렸던 기존 ECoT의 가장 큰 한계를 다룬다. discrete diffusion VLM의 종류가 매우 적어서, 현재 시도는 autoregressive VLM을 discrete diffusion으로 fine-tuning하거나 LLaDA-V를 backbone으로 쓰는 두 가지다. LIBERO와 SIMPLER에서 좋은 결과를 낸 동시 발표 논문이 4편이다.

| 논문 | 요지 |
|---|---|
| Discrete Diffusion VLA | OpenVLA에 discrete diffusion action 예측을 적용해 이산 action 토큰을 action chunk 단위로 빠르게 생성한다. 추론용 adaptive decoding도 제안한다. LIBERO와 SIMPLER에서 강한 결과 |
| dVLA | discrete diffusion의 빠른 병렬 샘플링을 살려 미래 프레임, 텍스트, action을 함께 생성한다. ECoT와 discrete diffusion을 잘 결합한 사례. LIBERO와 실제 로봇 실험 |
| DIVA | 또 다른 discrete diffusion VLA로, 추론 중 토큰 치환 방법에 초점을 둔다 |
| Unified Diffusion VLA | block-wise causal masking으로 미래 프레임과 이산 action을 함께 생성한다. CALVIN, LIBERO, SIMPLER 결과가 좋다 |

#### 2. 추론 VLA와 ECoT

추론은 복잡한 과제와 분포 밖 상황에 약한 VLA의 일반화와 성능을 끌어올릴 유력한 수단이다. LLM의 chain-of-thought prompting 성공에 영향을 받아, action 생성을 중간 시각 추론과 텍스트 추론 단계와 잇는 것이 핵심 아이디어다. 추론 흔적은 해석 가능해서 디버깅에도 쓰인다.

첫 ECoT 논문(CoRL 2024) 이후 공간적으로 grounding된 추론과 action 예측을 결합하는 연구가 늘었다. subtask, 과제 관련 물체의 bounding box, 2D motion trajectory를 함께 예측하면 VLM이 embodied 과제에 더 나은 표현을 배우고 일반화 벤치마크 성능이 오른다. ECoT 학습 분석 연구는 이 목표가 VLM의 정적 pre-training과 로봇 과제 사이의 표현 격차를 메운다고 본다. 한계는 VLA의 autoregressive 성질과 늘어난 토큰 수 때문에 학습과 추론이 느려진다는 점이다.

grounding된 추론을 VLA에 어떻게 구현할지는 열린 문제다. MolmoAct는 depth 예측 같은 추가 모달리티를 탐색했다. 큰 병목은 다양한 학습 데이터의 부족이다. 많은 ECoT 연구가 여전히 같은 BRIDGE와 LIBERO 라벨 데이터셋에 의존하며, DROID 같은 대규모 데이터에 라벨을 붙이는 일은 어렵다.

| 논문 | 요지 |
|---|---|
| Actions as Language | VLM을 이산 action 토큰으로 직접 fine-tuning하면 catastrophic forgetting이 생긴다. 대신 로봇 데이터셋에 subtask, 텍스트로 쓴 action, "왼쪽으로 이동" 같은 중간 motion planning을 다시 라벨링한다. VLM의 도메인 격차를 메우면서 pre-training의 VQA 벤치마크 성능을 잃지 않으며, 저렴한 LoRA fine-tuning만으로 강한 action 예측을 얻는다 |
| InstructVLA | 2단계 Vision-Language-Action Instruction Tuning 파이프라인. (1) action expert와 latent action 인터페이스를 pre-training하고, (2) MoE로 확장한 VLM을 instruction tuning해 텍스트 추론과 latent action 생성을 오간다. action expert로 멀티모달 추론과 action 생성을 분리해 catastrophic forgetting을 피하고, 지시문 따르기를 재는 instructed SIMPLER 벤치마크를 도입한다 |
| Embodied-R1 | embodied reasoning용 pointing VLM. Qwen2.5-VL을 새 데이터셋 Embodied-Points-200K(20만 개)로 2단계 Reinforced Fine-Tuning(RFT) 커리큘럼 학습한다. embodiment에 무관한 중간 표현으로 REG(지칭 물체 가리키기), RRG(관계로 정의된 위치 가리키기), OFG(손잡이 같은 기능 부위 가리키기), VTG(visual trace로 점 시퀀스 출력)를 쓴다. embodied 벤치마크와 pointing 벤치마크에서 강하고, 중간 waypoint를 내는 planner로 SIMPLER에 잘 일반화된다 |
| Hybrid Training | ECoT pre-training을 think, act, follow 여러 subtask로 분해해 성능 이득을 유지하면서 빠른 추론을 가능하게 한다. ECoT co-training이 action 예측에 더 나은 표현을 만든다는 비슷한 발견 |

#### 3. 새로운 토크나이저

로봇은 관절 각도와 그리퍼 상태 같은 고주파 연속 제어값으로 명령한다. 반면 VLM은 이산 토큰에서 가장 잘 동작한다. VLM을 연속 action 회귀로 단순 fine-tuning하면 성능이 낮고 catastrophic forgetting이 자주 생기는데, 새 목표가 pre-training된 표현과 어긋나기 때문이다.

action 토크나이저의 핵심은 연속 action 시퀀스를 VLM이 예측할 수 있는 압축된 이산 토큰으로 바꾸되 정확도와 매끄러움을 유지하고 연산과 통합 비용을 최소화하는 것이다. 이상적인 토크나이저는 빠르고, 긴 action chunk에 대해 높은 압축률을 내고, 매끄러운 long-horizon 출력을 만들고, 기존 VLM 구조를 바꾸지 않고 붙는다.

이전 연구는 이산 binning(RT-1)과 VQ-VAE codebook을 썼지만 정밀도가 거칠거나 긴 시퀀스 효율이 낮았다. FAST는 VLA 예측에 맞춘 action chunk 토크나이저를 도입해 이산 토큰이 더 복잡한 diffusion이나 flow expert를 대신할 수 있음을 보였다. ICLR에 투고된 새 토크나이저는 세 가지를 결합한다.

- 더 높은 압축을 위한 Residual Vector Quantization(RVQ, SoundStream 계열)
- 매끄러운 긴 trajectory를 위한 spline 기반 파라미터화(BEAST 토크나이저에서 착안)
- 저주파의 물리적으로 그럴듯한 움직임으로 편향시키는 DCT식 목표(FAST 방식)

| 논문 | 요지 |
|---|---|
| FASTer | RVQ에 DCT 기반 주파수 L1 손실과 시간 영역 L1 손실을 결합한 학습형 이산 action 토크나이저. action 토큰을 시간 방향과 묶인 action 차원 방향(base 이동, 팔 관절 등)으로 patch화한다. FAST보다 압축률이 높고 SIMPLER와 LIBERO 결과가 강하다 |
| OmniSAT | BEAST의 B-spline 아이디어로 연속 action chunk를 압축 표현한다. 2단계 인코딩이다. 먼저 embodiment마다 다른 action chunk 길이를 정규화된 고정 길이 표현으로 맞추고, B-spline 기반 인코더로 압축한 뒤 VQ-VAE로 이산 토큰을 얻는다. LIBERO와 SIMPLER에서 FAST와 BEAST 모두를 앞선다 |

#### 4. 효율적인 VLA

제한된 연산 환경에서 큰 VLA를 학습하고 실행하는 어려움 때문에 효율적인 VLA는 늘 관심사이며, 연산 자원이 적은 연구실도 VLA 연구에 참여하게 해 준다. 접근은 두 범주다. 더 작은 VLA나 더 나은 토크나이저로 학습과 모델을 효율화하는 쪽과, 더 나은 양자화나 distillation으로 추론을 효율화하는 쪽이다.

| 논문 | 요지 |
|---|---|
| HyperVLA | hypernetwork가 지시문과 초기 이미지를 조건으로 작은 과제별 policy를 생성한다. 실행 중에는 큰 VLA 대신 생성된 소형 policy만 활성화해 추론 비용을 크게 줄이면서 성능을 유지한다 |
| AutoQVLA | OpenVLA의 양자화를 분석하고, 원래 VRAM의 30%만으로 성능을 유지하는 개선된 양자화 방법을 제안한다 |

#### 5. VLA를 위한 강화학습

VLA를 실제 환경 성공률 70~80%에서 99%로 끌어올리는 fine-tuning은 여전히 열린 문제다. RL fine-tuning이 이 격차를 닫으리라는 기대가 크지만, 여러 시도에도 표준으로 자리 잡은 방법은 아직 없다.

| 논문 | 요지 |
|---|---|
| Self-Improving VLA via Residual RL | 고정한 VLA와 작은 residual policy로 데이터를 더 모은다. residual 개입으로 복구 행동이 담긴 고품질 데이터를 얻고, 마지막에 VLA를 SFT로 fine-tuning한다. LIBERO 99% |
| Progressive Stage-Aware RL | 로봇 과제를 Reach, Grasp, Transport, Place의 의미 단계로 나누고 trajectory 전체가 아닌 단계마다 reward를 준다. 단계 수준에서 동작하는 오프라인 선호 학습 STA-TPO와 온라인 강화학습 STA-PPO를 쓴다. SIMPLER Bridge 98% |

#### 6. VLA와 영상 예측

video 생성 모델은 시간 dynamics와 물리적 상호작용의 풍부한 표현을 배우므로 로봇 제어에 유용한 사전 지식을 줄 수 있다. ICLR 2024의 GR-1 논문이 video 기반 policy의 가능성을 보인 뒤 관심이 늘었다. 이 policy는 두 범주다. (1) 이미지나 video 생성으로 pre-training했을 수도 있는 VLM에서 시작해 미래 프레임과 action 예측으로 학습을 이어가는 쪽, (2) video foundation model에서 시작해 action도 생성하도록 고치는 쪽이다.

SOTA video foundation model 대부분이 diffusion이나 flow 기반이라 이 policy는 추론 속도가 느리다. 그럼에도 video 생성과 그것이 요구하는 물리 이해와 언어 grounding이 로봇 학습에 가치 있는 사전 지식을 준다는 결과가 나온다. VLM에서 출발하는 VLA에 비해 훨씬 덜 인기 있으며, Wan 같은 SOTA video 모델의 fine-tuning 연산 비용이 VLM 기반 VLA fine-tuning보다 커서 진전이 더디다.

| 논문 | 요지 |
|---|---|
| Disentangled Robot Learning | forward dynamics model과 Inverse Dynamics Model을 따로 pre-training하고, 2단계에서 둘을 다시 결합해 policy를 coupled fine-tuning한다. CALVIN 결과가 좋고 SIMPLER는 무난하다 |
| Unified VLA (UniVLA) | vision, 언어, action을 이산 토큰(VQ 이미지 토큰과 FAST/DCT action 토큰)의 단일 interleaved 스트림으로 모델링해 85억 개 파라미터 autoregressive VLA 하나를 학습한다. VLM을 VLA로 바꾸는 2단계 학습이다. 먼저 텍스트와 이미지로 미래 프레임을 예측하도록 post-training하고, 다음에 vision과 action 토큰 예측으로 fine-tuning한다. VLM 표현을 로봇 과제에 맞추는 post-training 단계를 강조한다. CALVIN, LIBERO, SimplerEnv-Bridge에서 강하다 |
| Cosmos Policy | NVIDIA의 Cosmos video foundation model을 action 예측으로 fine-tuning한다. 핵심은 미래 action chunk나 value function 추정치 같은 추가 모달리티를 latent 토큰 시퀀스에 주입하는 것이다. LIBERO 결과가 좋고 실제 로봇에서 π0.5와 비교했다 |

#### 7. 평가와 벤치마크

현재 VLA 벤치마크는 포화 상태이고 벤치마크 수가 적으며 논문 대부분이 소수 baseline과만 비교하므로 어느 모델이 실제로 나은지 판단하기 어렵다. 새 벤치마크를 도입해 이 격차를 메우려는 투고가 여럿 있고, real2sim world model로 생성 환경에서 policy를 시험하는 아이디어도 있다. 저자는 이 아이디어들이 아직 실제 대안으로 쓸 수준은 아니라고 보면서도 앞으로 진전을 기대하는 흥미로운 영역으로 꼽는다.

| 논문 | 요지 |
|---|---|
| RoboArena 무한 | RoboArena와 비슷한 rating 체계를 가진 real2sim 벤치마크 프레임워크. 물리 엔진, real2sim 변환, 사람 피드백으로 환경 구축과 평가를 자동화한다. 여러 foundation model과 미분 가능 렌더링으로 real2sim 파이프라인을 구성하고 VLM 기반 task progress 점수를 쓴다 |
| RoboCasa365 | 기존 RoboCasa 시뮬레이션과 벤치마크를 2천 개 이상 주방 장면의 365개 과제와 2천 시간 이상 teleoperation 데이터로 확장했다. 과제 구성과 데이터 규모가 좋지만 baseline policy를 3개만 시험했다 |
| WorldGym | action 조건부 video 생성 모델(world model)을 로봇 policy 평가 환경으로 쓴다. policy를 생성된 세계에서 rollout하고 VLM이 reward를 매긴다 |

#### 8. cross-action-space 학습

긍정적 전이를 얻기 어려워서 대부분의 VLA는 여전히 다양한 action space에 대한 pre-training을 피한다. 그래서 개선 여지가 큰 영역이다. action 라벨이 붙은 사람 1인칭 영상으로 VLA를 pre-training하려는 관심도 커지고 있으며, 올해 공개된 EgoDex 같은 데이터셋이 이 방향의 연구를 가능하게 한다. 투고작은 이질적인 action space를 다루는 VLA 구조 세부에 집중하거나, 이미지 공간의 motion 같은 추가 추상화로 전이를 개선한다. DeepMind의 Gemini Robotics 1.5는 공개되지 않은 motion transfer 기법으로 action space 사이의 zero-shot 과제 전이에 성공했다고 밝혔는데, 저자는 이것이 데이터와 모델 규모 문제일 수도 있다고 본다.

| 논문 | 요지 |
|---|---|
| X-VLA | 데이터셋마다 soft-prompt 토큰을 두어 cross-action-space 학습을 다룬다. soft-prompt 토큰은 VLA의 학습 가능한 readout 토큰이다. LIBERO, CALVIN, SIMPLER, RoboTwin, VLABench 결과가 모두 매우 좋고 scaling 분석도 유익하다 |
| XR-1 | 시각 dynamics와 로봇 motion을 공유 codebook의 dual-branch VQ-VAE로 함께 부호화하는 이산 latent 표현 Unified Vision-Motion Codes(UVMC)를 도입한다. 사람과 로봇 시연 데이터의 co-pre-training이 개선된다. 실제 로봇에서 GR00T N1.5와 π0에 대해 좋은 결과 |
| HiMoE-VLA | π 계열 action expert를 계층적 mixture-of-experts Transformer로 바꿔 새 embodiment에 더 잘 적응한다. 표준 블록 사이에 Action-Space MoE와 Heterogeneity Balancing MoE 두 종류의 MoE 블록을 삽입해 서로 다른 action space를 다룬다. 여러 실험에서 π0를 앞선다 |

#### 9. 그 밖의 주목 논문

위 범주에 딱 들어맞지 않지만 언급할 가치가 있는 논문이 있다. VLM backbone 선택부터 policy에 메모리 모듈을 넣는 것까지 다양하다. 저자는 특히 메모리에 관심이 있다. VLA 대부분은 현재 이미지만 인코딩하고 이전 timestep을 무시하는데, 이는 많은 과제에서 큰 한계다.

긴 이력을 VLA에 그대로 넣으면 역효과가 자주 난다. 모델이 시연자 고유의 trajectory에 과적합하고, rollout 중에는 같은 상태 시퀀스를 거의 만나지 않아 성능이 크게 하락한다. 반면 과거 컨텍스트를 기억하는 대신 집계하고 압축하는 메모리 모듈은 유망해 보이며, 분포 변화에 더 견고하면서 long-horizon 제어에 필요한 시간 단서를 유지할 것으로 기대한다.

또 하나 주목할 연구는 테스트 시점에 여러 policy를 합성해 성능을 올리는 문제다. energy 기반 정식화 덕에 score를 합해 여러 모델을 결합할 수 있으므로 diffusion과 flow 기반 VLA가 필요하다. 학습 없이 성능을 올리는 유망한 방향이다.

| 논문 | 요지 |
|---|---|
| HAMLET | moment 토큰으로 이전 timestep의 시간 정보를 담는 plug-and-play 메모리 모듈. 토큰을 시간에 따라 집계해 이력 조건부 예측을 가능하게 한다 |
| Compose Your Policies | flow나 diffusion 기반 VLA policy를 테스트 시점에 합성해 개별 policy보다 성능을 올린다. convex 최적화와 테스트 시점 탐색으로 여러 policy의 score를 합성한다 |
| VLM4VLA | 많은 VLM을 VLA backbone으로 비교했고, downstream 성능이 표준 벤치마크의 VLM 성능과 상관이 없음을 발견했다. 저자의 경험과 일치한다. 다만 벤치마크 설정에 한정되고 실제 로봇 결과는 없다 |

### frontier lab과 학계의 격차

논문상으로는 격차가 작아 보인다. LIBERO와 CALVIN 같은 시뮬레이션 설정에서 오픈소스 VLA가 π0.5 같은 인기 frontier baseline을 앞선다. 실제로는 논문이 거의 평가하지 않는 지점, 즉 pre-training 이후의 zero-shot open-world 동작에서 더 큰 격차가 드러난다. 글 작성 2주 전 CoRL에서 Gemini Robotics VLA 데모는 임의의 물체와 바꿔 말한 언어로 다양한 새 과제를 시도했다. 저자의 FLOWER는 모든 CALVIN 벤치마크에서 SOTA지만 그 수준의 zero-shot 견고성에는 전혀 미치지 못한다. 시뮬레이션 벤치마크는 이 차이를 감추며 현재 시뮬레이션 설정은 이 목표에 최적화되어 있지 않다.

이 격차는 VLA만의 문제가 아니라 LLM과 VLM도 같다. VLA에서는 학습 레시피, 데이터, 코드, 가중치를 모두 공개한 fully open-weight 모델이 Gemini Robotics와 π0.5 같은 closed-weight 모델에 zero-shot 과제에서 크게 뒤진다. EO-1에서 격차가 닫히는 유망한 신호가 보이지만 저자가 직접 시험하지는 않았다. open-weight VLA가 쓸모없다는 뜻은 아니며 연구에 매우 유용하고 많은 시나리오에서 강하다. 다만 공동체가 앞으로 다뤄야 할 중요한 문제라고 저자는 강조한다.

저자가 논문, 동료와의 논의, 개인 경험에서 본 격차의 원인은 다음과 같다.

| 원인 | 내용 |
|---|---|
| 벤치마크 포화가 실제 진전을 가린다 | 점수가 상한 근처에 몰리면 0.5%p 개선은 실제 개선의 증거가 아니다 |
| 고품질 데이터 격차 | 공개된 오픈소스 데이터는 다양성과 규모가 제한적이어서 더 일반적인 모델 학습을 제약한다 |
| 고품질 데이터에 대한 이해 부족 | 규모만이 아니라 고품질 시연 데이터가 무엇인지 이해하는 지식 자체가 부족하다 |
| 평가 범위가 좁다 | 논문 대부분이 시뮬레이션만 보고하거나 작은 로컬 fine-tuning 설정만 보고한다. 자유 형식 zero-shot 언어 따르기와 미학습 물체나 방은 매우 드물다. 다만 적절한 대규모 평가는 기업만 할 수 있다 |
| 운영상 제약 | 연구 그룹은 빠른 반복에 필요한 크고 다양한 실제 로봇 시험을 실행할 인력과 시간이 없다. frontier lab은 인력, 자금, 로봇 fleet 규모가 다르다. 그래서 저자를 포함한 많은 박사과정 연구자가 시뮬레이션 벤치마크로 아이디어를 시험한다 |
| 동료 심사 인센티브 부재 | 주요 학회 심사자는 표준 시뮬레이션에서 open-weight이지만 학습 과정은 비공개인 VLA와의 정면 비교와 강한 로컬 fine-tuning 수치를 기대한다. 논문 채택에는 좋지만 open-world 성능과의 상관은 약하다 |

반론으로는 연구 발견이 성능 이득과 같지 않다는 점을 든다. 이 글에서 다룬 많은 논문은 공동체와 연구에 유용한 일반적 발견을 담고 있으며 zero-shot 성능은 VLA 성능의 한 측면일 뿐이다.

Figure 10의 RoboArena 리더보드에서 zero-shot 과제에 경쟁력이 있는 Physical Intelligence 계열이 아닌 모델은 하나뿐이다. 연산과 인력 예산을 크게 늘리지 않고 격차를 줄이는 방안으로 저자는 두 가지를 든다.

- 공개 zero-shot 공정 벤치마크 사용. 독립 운영자가 pre-training 이후 일반화를 시험하는 RoboArena 같은 설정에서 진전을 추적한다. 현재 Physical Intelligence 계열이 아닌 모델은 거의 없고 크게 뒤진다. 다만 상위 policy의 학습 코드는 Physical Intelligence가 openpi 코드베이스로 모두 공개했다. ManipulationNet도 새로운 시도다.
- 더 나은 pre-training 레시피. X-VLA처럼 pre-training 설계 결정을 전부 ablation해 성능 영향을 이해한 논문은 매우 드물다. 전체 pre-training 레시피와 실패한 아이디어까지 공유하는 논문이 더 필요하다.

저자는 시뮬레이션과 로컬 fine-tuning이 쓸모없다고 보지 않으며 로봇 학습의 많은 부분에 매우 중요하다고 명시한다. 다만 VLA의 핵심 논거인 어수선한 새 환경에서의 견고한 zero-shot 동작을 재는 대리 지표로는 부적절하다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 글은 서베이라 저자 실험은 없다. 본문이 제시한 수치를 모으면 다음과 같다.

| 항목 | 수치 |
|---|---|
| ICLR VLA 키워드 투고 | 2024년 1편, 2025년 9편, 2026년 164편 (18배) |
| ICLR 2027 투고 추정 | 본문 2,100편 이상, 차트 1,000편 이상 |
| 글이 다룬 논문의 평가 벤치마크 | 90%가 LIBERO, SIMPLER, CALVIN 중 하나 |
| discrete diffusion VLA 4편의 LIBERO 평균 | 95~98% |
| LIBERO 결과 보고 모델 중 continual learning을 하는 비율 | 약 1% (99%가 전체 데이터셋 학습) |
| SIMPLER Bridge 성공률 분포 | 40%에서 99% |
| SIMPLER Google Robot SOTA | 70~80% |
| 실제 로봇 VLA 성공률과 목표 | 70~80%에서 99%로 올리는 것이 RL fine-tuning의 목표 |
| Residual RL 논문 LIBERO | 99% |
| Stage-Aware RL 논문 SIMPLER Bridge | 98% |
| AutoQVLA VRAM | 원래의 30% |
| UniVLA 모델 크기 | 85억 개 파라미터 |
| Embodied-Points-200K | 20만 개 |
| RoboCasa365 | 365개 과제, 2천 개 이상 주방 장면, 2천 시간 이상 teleoperation 데이터, baseline 3개 |
| RoboArena 리더보드(2025-10-10, 오픈소스만) | 1위 paligemma_fast_specialist_droid 1874점, 2위 paligemma_fast_droid 1790점, 3위 paligemma_vq_droid 1785점, 4위 paligemma_diffusion_droid 1609점, 5위 dam 988점, 6위 paligemma_binning_droid 755점 |

리더보드 스크린샷에서 Physical Intelligence 계열(paligemma 접두어)이 아닌 항목은 5위 dam 하나다. 본문의 "경쟁력에 가까운 non-Pi 모델은 하나뿐"이라는 서술과 일치한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자가 명시한 한계는 다음과 같다.

- 개인 선별이다. 저자 본인의 관심에 따른 논문 선택이며 빠뜨린 우수 연구가 있을 수 있다.
- 논문 대부분이 시뮬레이션에서만 평가하고 소수 baseline과만 비교하므로 어느 모델이 가장 좋은지 이 글로는 단정할 수 없다.
- EO-1 같은 일부 모델은 저자가 직접 시험하지 않았다.
- 성장 추정치는 저자 추정이며 본문(2,100편 이상)과 차트(1,000편 이상)가 다르다.

저자가 VLA 연구에서 과소 대표됐다고 짚은 두 문제는 다음과 같다.

- 데이터 품질. VLA 성능에 결정적인데도 데이터 수집과 큐레이션을 다룬 ICLR 2026 투고는 놀랄 만큼 적다. OXE가 대부분 저품질 데이터라는 점은 공공연한 비밀인데도 imitation learning에서 데이터 품질을 정량화할 좋은 방법이 없다. 데이터 중심 연구는 어렵지만 고품질 데이터셋 큐레이션 방법은 VLA 연구의 가장 중요한 미해결 문제 가운데 하나다.
- in-context learning. LLM과 VLM에서의 성공을 고려하면 VLA 연구가 더 있을 것으로 기대했지만 거의 없었다. 언어만으로는 복잡한 물리 과제에 제한된 컨텍스트를 주며, in-context learning이 더 나은 prompting과 zero-shot 과제 일반화의 열쇠일 수 있다. 몇몇 좋은 시도가 있었지만 복잡한 manipulation 과제에 필요한 풍부한 컨텍스트 정보를 담는 구현 방법은 아직 불분명하다.

저자는 이런 격차에도 분야가 빠르게 성장하고 진화할 것으로 낙관한다. 투고 급증과 discrete diffusion, embodied reasoning 같은 유망한 방향으로의 수렴은 VLA 연구가 빠르게 성숙하고 있음을 시사하며, 데이터 품질과 컨텍스트 학습 문제를 풀수록 로봇이 동작해야 하는 어수선한 비정형 환경에서 진정으로 일반화하는 VLA에 가까워질 것이라고 본다.

## 6. 관련 연구 (Related Work)

- FLOWER (Reuss 2025): 저자의 VLA. 모든 CALVIN 벤치마크에서 SOTA지만 frontier 모델의 zero-shot 견고성에는 못 미친다고 본문이 밝힌다.
- BEAST (2025): 저자 그룹의 B-spline 기반 action 토크나이저. OmniSAT이 이 아이디어를 잇는다.
- FAST (Pertsch 2025): action chunk 토크나이저. FASTer와 OmniSAT의 비교 대상이고 UniVLA가 action 토큰에 쓴다.
- ECoT (CoRL 2024)와 ECoT 학습 분석 (2025): 추론 VLA 흐름의 출발점.
- MolmoAct (2025): depth 예측을 추론에 더한 사례.
- GR-1 (ICLR 2024): video 기반 policy 흐름의 출발점.
- Gemini Robotics 1.5 (DeepMind 2025): motion transfer로 action space 사이 zero-shot 전이. CoRL 데모가 frontier 격차 논증의 근거다.
- π0와 π0.5 (Physical Intelligence): closed-weight frontier baseline. openpi 코드베이스로 학습 코드는 공개됐다.
- EO-1 (2025): open-weight 쪽에서 격차가 닫히는 신호로 언급된다.
- LBM (TRI 2025): Large Behavior Model 정의의 출처.
- VLA 서베이 (arXiv 2510.07077): 저자가 비교 대상으로 삼은 넓은 VLA 정의의 출처.
- RoboArena, ManipulationNet: 공개 zero-shot 공정 벤치마크로 권장한 두 설정.
- EgoDex (2025): action 라벨이 있는 사람 1인칭 영상 데이터셋.
- MDLM, LLaDA-V: discrete diffusion의 텍스트와 VLM 선행 사례.
- SoundStream: RVQ의 출처.
- RLBench, 3DDA: 3D policy 벤치마크와 3D SOTA 방법.
- LIBERO, SIMPLER, CALVIN: 벤치마크 해석 가이드의 대상.

## 7. 용어집 (Glossary)

- multimodal policy: 인터넷 규모 vision-language pre-training 없이 시각과 언어 입력을 받는 policy를 저자가 VLA와 구분해 부르는 이름. 별도로 pre-training된 텍스트 인코더와 vision 인코더를 조합한 모델도 여기 넣는다.
- LBM (Large Behavior Model): TRI가 정의한 용어. 대규모 멀티태스크 로봇 시연 데이터로 학습한 policy이며 VLM backbone을 요구하지 않는다. 대규모 로봇 데이터로 학습한 VLA는 모두 LBM이다.
- Video-Action Policy: pre-training된 video 생성 모델을 backbone으로 쓰는 policy. 저자 정의에서 VLA에 포함된다.
- ECoT (Embodied Chain-of-Thought): subtask, bounding box, 2D motion trajectory 같은 중간 추론을 action 앞에 생성하게 하는 학습 방식. autoregressive VLM에서는 토큰이 늘어 느리다.
- discrete diffusion: 마스킹된 이산 토큰을 병렬로 채우고 불확실한 토큰을 다시 마스킹해 반복 정제하는 생성 방식. action 토큰을 몇 번의 forward pass로 만든다.
- RVQ (Residual Vector Quantization): 잔차를 여러 단계 codebook으로 순차 양자화해 압축률을 높이는 방식. SoundStream 계열이며 FASTer가 쓴다.
- soft prompt (X-VLA): 데이터셋 ID로 고르는 학습 가능한 readout 토큰. action space가 다른 데이터셋을 한 VLA로 학습하는 장치.
- UVMC (Unified Vision-Motion Codes): XR-1이 시각 dynamics와 로봇 motion을 공유 codebook의 dual-branch VQ-VAE로 함께 부호화한 이산 latent 표현.
- moment 토큰 (HAMLET): 이전 timestep의 시간 정보를 담아 메모리 모듈이 집계하는 토큰.
- residual RL: 고정한 VLA 위에 작은 residual policy를 두고 개입으로 복구 데이터를 모으는 방식.
- hypernetwork (HyperVLA): 지시문과 초기 이미지를 조건으로 다른 소형 policy의 가중치를 생성하는 신경망.
- real2sim: 실제 로봇 데이터나 사용자 촬영 영상에서 시뮬레이션 환경을 자동 구성하는 변환. RoboArena 무한이 벤치마크 생성에 쓴다.
- frontier gap: 시뮬레이션 리더보드에는 안 보이고 zero-shot open-world 동작에서 드러나는 closed-weight frontier 모델과 open-weight 학계 모델의 성능 격차.

## 8. 그림 후보 (Figure Candidates)

원문 도식 11장을 원본 다운로드로 모두 확보했고(fig01~fig11), 전체 페이지 스크린샷 1장(fig12)과 figure 요소 크롭 11장(fig13~fig23)이 함께 있다. 크롭은 원본과 같은 그림이라 중복으로 표시했다. 본문의 성장 차트는 인라인 SVG라 이미지 다운로드에 잡히지 않아 요소 캡처로 따로 저장했다(fig24).

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 글 머리 콜라주 | fetched | (선택) |
| fig02 | VLA 판정 flowchart | fetched | ★ wiki 권장 (개념) |
| fig03 | LBM 판정 flowchart | fetched | ★ wiki 권장 (개념) |
| fig04 | 시뮬레이션 벤치마크 네 종 장면 | fetched | ★ wiki 권장 (벤치마크) |
| fig05 | discrete diffusion과 autoregressive, BERT 비교 | fetched | ★ wiki 권장 (method) |
| fig06 | FASTer 토크나이저 구조 | fetched | ★ wiki 권장 (method) |
| fig07 | Disentangled Robot Learning pre-training 패러다임 | fetched | ★ wiki 권장 (method) |
| fig08 | RoboArena 무한 개요 | fetched | ★ wiki 권장 (벤치마크) |
| fig09 | X-VLA action space 처리 방식 네 가지 | fetched | ★ wiki 권장 (method) |
| fig10 | closed-weight 대 open-source VLA 콜라주 | fetched | (선택) |
| fig11 | RoboArena 리더보드 | fetched | ★ wiki 권장 (result) |
| fig12 | 전체 페이지 스크린샷 | screenshot | (참고용) |
| fig13 | 글 머리 콜라주 크롭 | crop | (fig01 중복) |
| fig14 | VLA 판정 flowchart 크롭 | crop | (fig02 중복) |
| fig15 | LBM 판정 flowchart 크롭 | crop | (fig03 중복) |
| fig16 | 시뮬레이션 벤치마크 장면 크롭 | crop | (fig04 중복) |
| fig17 | discrete diffusion 비교 크롭 | crop | (fig05 중복) |
| fig18 | FASTer 도식 크롭 | crop | (fig06 중복) |
| fig19 | Disentangled Robot Learning 크롭 | crop | (fig07 중복) |
| fig20 | RoboArena 무한 개요 크롭 | crop | (fig08 중복) |
| fig21 | X-VLA 도식 크롭 | crop | (fig09 중복) |
| fig22 | VLA 콜라주 크롭 | crop | (fig10 중복) |
| fig23 | RoboArena 리더보드 크롭 | crop | (fig11 중복) |
| fig24 | ICLR VLA 투고 수 성장 차트 (SVG 캡처) | crop | ★ wiki 권장 (result) |
