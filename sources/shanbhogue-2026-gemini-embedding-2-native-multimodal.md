---
title: "Gemini Embedding 2: A Native Multimodal Embedding Model from Gemini"
type: paper
year: 2026
category: database
raw_path: raw/papers/shanbhogue-2026-gemini-embedding-2-native-multimodal.pdf
raw_filename: "shanbhogue-2026-gemini-embedding-2-native-multimodal.pdf"
source_collection: external
authors: "Madhuri Shanbhogue, Zhe Li, Shanfeng Zhang, Gustavo Hernández Ábrego, Shih-Cheng Huang, Aashi Jain 외 (Gemini Embedding Team, Google)"
arxiv_id: "2605.27295"
venue: "arXiv preprint 2605.27295v1 [cs.CV], 2026-05-26"
url: "https://arxiv.org/abs/2605.27295"
tags: [embedding, multimodal, gemini, mteb, retrieval, rag, contrastive-learning, matryoshka, paper]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/shanbhogue-2026-gemini-embedding-2-native-multimodal/fig01.png
    raw: raw/papers/shanbhogue-2026-gemini-embedding-2-native-multimodal-figures/fig01.png
    caption: "텍스트, 이미지, 비디오, 오디오를 하나의 vector space로 보내는 전체 흐름"
    page: 2
    bbox_norm: [0.0893, 0.055, 0.9059, 0.3612]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/shanbhogue-2026-gemini-embedding-2-native-multimodal/fig02.png
    raw: raw/papers/shanbhogue-2026-gemini-embedding-2-native-multimodal-figures/fig02.png
    caption: "7개 retrieval 과제에서 경쟁 모델 3종과 비교한 레이더 차트"
    page: 3
    bbox_norm: [0.154, 0.0939, 0.846, 0.5829]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/shanbhogue-2026-gemini-embedding-2-native-multimodal/fig03.png
    raw: raw/papers/shanbhogue-2026-gemini-embedding-2-native-multimodal-figures/fig03.png
    caption: "PFT 체크포인트와 FT 체크포인트의 10개 과제 성능 막대 비교"
    page: 12
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3059]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/shanbhogue-2026-gemini-embedding-2-native-multimodal/tab01.png
    raw: raw/papers/shanbhogue-2026-gemini-embedding-2-native-multimodal-figures/tab01.png
    caption: "unimodal, cross-modal, multimodal retrieval 벤치마크 종합 비교표"
    page: 7
    bbox_norm: [0.0947, 0.0708, 0.9053, 0.4831]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/shanbhogue-2026-gemini-embedding-2-native-multimodal/tab02.png
    raw: raw/papers/shanbhogue-2026-gemini-embedding-2-native-multimodal-figures/tab02.png
    caption: "MTEB Multilingual, MTEB Code v1, CoIR 텍스트 벤치마크 비교표"
    page: 8
    bbox_norm: [0.0947, 0.0708, 0.9053, 0.3907]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/shanbhogue-2026-gemini-embedding-2-native-multimodal/tab03.png
    raw: raw/papers/shanbhogue-2026-gemini-embedding-2-native-multimodal-figures/tab03.png
    caption: "MSEB passage retrieval split에서 ASR 경유와 native audio 직접 입력 비교표"
    page: 9
    bbox_norm: [0.0941, 0.0708, 0.9082, 0.8455]
    strategy: table-region
    low_confidence: true
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/shanbhogue-2026-gemini-embedding-2-native-multimodal/tab04.png
    raw: raw/papers/shanbhogue-2026-gemini-embedding-2-native-multimodal-figures/tab04.png
    caption: "미생물, 미술, 천문, 요리 4개 특화 도메인의 이미지에서 텍스트 retrieval 비교표"
    page: 10
    bbox_norm: [0.0947, 0.0708, 0.9053, 0.3185]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/shanbhogue-2026-gemini-embedding-2-native-multimodal/tab05.png
    raw: raw/papers/shanbhogue-2026-gemini-embedding-2-native-multimodal-figures/tab05.png
    caption: "합성 데이터 유무에 따른 MTEB Code v1 3개 과제 ablation 표"
    page: 11
    bbox_norm: [0.0947, 0.0708, 0.9053, 0.1792]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/shanbhogue-2026-gemini-embedding-2-native-multimodal/tab06.png
    raw: raw/papers/shanbhogue-2026-gemini-embedding-2-native-multimodal-figures/tab06.png
    caption: "in-domain 비디오 데이터 추가와 model soup의 비디오 지표 변화표"
    page: 12
    bbox_norm: [0.0991, 0.3337, 0.9033, 0.5163]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/shanbhogue-2026-gemini-embedding-2-native-multimodal/tab07.png
    raw: raw/papers/shanbhogue-2026-gemini-embedding-2-native-multimodal-figures/tab07.png
    caption: "MTEB Multilingual 132개 개별 과제의 전체 점수표"
    page: 18
    bbox_norm: [0.2239, 0.1323, 0.7733, 0.7292]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/shanbhogue-2026-gemini-embedding-2-native-multimodal/tab08.png
    raw: raw/papers/shanbhogue-2026-gemini-embedding-2-native-multimodal-figures/tab08.png
    caption: "MTEB Code 12개 개별 과제의 전체 점수표"
    page: 19
    bbox_norm: [0.3016, 0.3676, 0.6984, 0.6045]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

Gemini Embedding 2는 Gemini를 backbone으로 초기화한 native multimodal embedding model로, 텍스트, 이미지, 비디오, 오디오와 이들이 뒤섞인 interleaved 입력까지 하나의 vector space에 매핑한다. CLIP과 ALIGN 계열의 late-fusion dual-tower가 갖는 mixed-modality 처리 한계를 MLLM 단일 backbone으로 대체하며, causal attention을 bidirectional attention으로 바꾸고 mean pooling과 랜덤 초기화 linear projection을 붙여 임베딩을 만든다. NCE 손실에 MRL을 결합해 3,072차원 임베딩 하나로 768차원과 1,536차원을 함께 지원하고, PFT에서 FT를 거쳐 model soup으로 마무리하는 다단계 레시피를 쓴다. MSCOCO Text에서 Image R@1 62.9, Vatex NDCG@10 68.8, MTEB Multilingual 69.9, MTEB Code v1 84.0을 기록했고, native audio 입력이 ASR 경유 대비 평균 mrr@10을 70.40에서 73.99로 올렸다.

## 1. 자료 정보 (Document Information)

- **제목**: Gemini Embedding 2: A Native Multimodal Embedding Model from Gemini
- **저자 표기**: 저자 줄의 소속은 "Gemini Embedding Team, Google"이다. 저작권 표시 줄은 "©2026 Google DeepMind. All rights reserved"로 되어 있어 두 표기가 함께 등장한다.
- **기여자 수**: Contributions 절(p.20) 기준 Core Contributors 83명과 Leadership 6명, 합계 89명이다. 이 중 6명이 equal contribution(별표) 표시를 달았다.
- **발표**: arXiv:2605.27295v1 [cs.CV], 2026-05-26 접수. 본문 첫 줄의 문서 날짜는 2026-5-27로 적혀 있어 하루 차이가 난다. 총 21페이지.
- **PDF 경로**: `raw/papers/shanbhogue-2026-gemini-embedding-2-native-multimodal.pdf`
- **선행 모델**: Gemini Embedding [18] (Jinhyuk Lee 외, 2025, arXiv:2503.07891). 텍스트 전용 버전이다.
- **backbone 출처**: 참고문헌 [5]는 Gemini 2.5 기술 보고서(arXiv:2507.06261)다. 다만 본문은 어떤 Gemini 변형을 몇 개 파라미터로 썼는지 밝히지 않는다.

## 2. 주요 기여 (Key Contributions)

1. **late-fusion dual-tower 구조에서 벗어난 native multimodal embedding**. CLIP [1], ALIGN [2], SigLIP 2 [3], CoCa [4]는 modality별 인코더를 따로 두고 paired 데이터로 정렬한다. 저자들은 이 방식이 unimodal과 cross-modal 성능은 좋지만 mixed-modality 입력을 다루기 어렵고 modality 사이 상호작용을 쓰지 못한다고 지적한다. Gemini Embedding 2는 MLLM 하나로 이 문제를 우회한다.
2. **bidirectional attention 적응**. Gemini에서 초기화한 Transformer의 causal 제약을 풀고 bidirectional attention으로 fine-tuning한다. 이후 mean pooling과 랜덤 초기화 linear projection으로 목표 차원을 맞춘다.
3. **multi-task이면서 multi-stage인 학습 레시피**. PFT, FT, model soup의 3단계이며 Gecko [15]와 Gemini Embedding [18]에서 이어받았다.
4. **NCE 손실과 MRL의 결합**. in-batch negative와 선택적 hard negative를 쓰는 NCE에 Matryoshka Representation Learning [25]을 겹쳐, 한 번의 학습으로 여러 prefix 차원을 동시에 최적화한다.
5. **task string augmentation**. 텍스트 전용 과제에서 "question answering"이나 "fact checking" 같은 task string을 query 앞에 붙이되 학습 중 무작위로 떼어내, task string이 없는 입력에도 견디게 한다.
6. **native audio가 ASR 경유를 능가함을 실증**. MSEB retrieval split에서 평균 mrr@10이 70.40에서 73.99로 올랐고, cross-lingual 구간의 상승폭(+5.01)이 intra-lingual(+2.00)보다 컸다.
7. **특화 도메인 zero-shot 강건성**. 미생물(MicroVQA), 미술(ArtCap), 천문(AstroLLaVA), 요리(Recipe1M) 4개 도메인 전부에서 CLIP, ALIGN, SigLIP 2, TIPS, Voyage-3.5-multimodal을 앞선다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 모델 아키텍처 (Model Architecture)

backbone은 상위 모듈이 올라타는 특징 추출 본체를 뜻하며, 여기서는 Gemini 파라미터로 초기화한 Transformer M이 그 역할을 한다. 저자들은 Gemini에서 초기화하는 이 단계 자체를 임베딩 모델의 pre-training으로 본다고 명시한다.

modality마다 raw 포맷을 토큰 시퀀스로 바꾸는 절차가 다른데, Gemini Embedding 2는 그 변환을 Gemini에 맡긴다. 그래서 Gemini가 원래 지원하는 포맷의 이미지, 비디오, 오디오를 그대로 입력할 수 있다.

파이프라인은 다음과 같다.

1. 토큰화 후 길이 L의 입력 시퀀스 T를 얻는다.
2. bidirectional attention Transformer M이 T를 처리해 토큰 임베딩 시퀀스 T_embed = M(T)를 만든다. 차원은 L × d_M이다.
3. pooler P가 시퀀스 방향으로 평균을 내 P_embed를 만든다. 저자들은 선행 연구 [23]이 단순 pooling도 모델 적응에 충분함을 보였다는 근거로 mean pooling을 택했다.
4. 랜덤 초기화 linear projection f가 목표 차원 d로 축소한다. 최종 임베딩 E = f(P_embed)다.

출력 차원 d는 3,072이고, MRL 지원은 768차원과 1,536차원에 맞춰 최적화되어 있다.

### 3.2 학습 목적함수 (Training Objective)

손실은 in-batch negative를 쓰는 noise-contrastive estimation(NCE) [24]이다. 학습 예제는 query q_i, positive target p_i^+, 그리고 선택적으로 hard negative target p_i^-로 구성된다. hard negative는 모델이 헷갈리기 쉬운 오답을 뜻하고, in-batch negative는 같은 배치 안 다른 예제의 positive를 자동으로 오답으로 삼는 기법이다.

- query 임베딩은 q_i = f(mean_pool(M(t ⊕ q_i)))로, task string t를 query 앞에 이어 붙인 뒤 계산한다.
- target 임베딩은 p_i^± = f(mean_pool(M(p_i^±)))다.
- 배치 크기 B에 대해 손실은 positive의 유사도를 분자에, positive와 hard negative와 in-batch negative의 유사도 합을 분모에 두는 log-softmax 형태다.
- 유사도는 cosine similarity sim(x, y) = xᵀy / (‖x‖‖y‖)이고 temperature τ로 나눈다. τ의 구체적 값은 논문에 없다.
- mask(i, j)는 q_i = q_j이거나 p_i^+ = p_j^+이면 0, 아니면 1이다. 레이블 수가 적은 classification 과제에서 같은 target이 오답으로 잡히는 것을 막는 장치다.
- hard negative가 없는 과제에서는 분모의 두 번째 항이 빠진다.

MRL은 이 손실을 임베딩 차원의 k개 겹치는 부분 차원에 각각 적용하는 방식이다. 앞 768차원에 하나, 앞 1,536차원에 하나 하는 식으로 손실을 쌓아 여러 차원을 한 번에 학습시킨다. 덕분에 다운스트림에서 차원을 잘라 써도 품질이 유지된다.

### 3.3 학습 레시피 (Recipe)

| 단계 | 사용 데이터 | 배치 구성 | 목적과 특징 |
|---|---|---|---|
| PFT (Pre-Fine-Tuning) | 이미지, 텍스트, 코드 | 큰 배치, 배치 하나에 과제 하나 | 자기회귀 생성에서 인코딩으로 파라미터를 적응시킨다. 잡음이 섞인 query-target 쌍을 대량으로 쓰되, 큰 배치로 그래디언트를 안정시켜 잡음 영향을 줄인다 |
| FT (Fine-Tuning) | 텍스트, 코드, 문서, 이미지, 오디오, 비디오 | 과제별로 배치 크기를 따로 조정, 배치 하나에 과제 하나 | 전부는 아니지만 상당수 과제가 query, target, hard negative 삼중항을 포함한다. single-modality 배치와 cross-modality 배치를 함께 학습해 modality 사이 정렬을 만든다 |
| Model Soup | 개별 FT 실행의 체크포인트들 | 해당 없음 | 파라미터를 평균해 일반화를 얻는다. 같은 실행 안의 체크포인트 평균 [26], 다른 실행 사이의 평균 [27], 여러 가중 평균 조합을 실험했다 |

저자들은 modality 전체의 성능 균형이 multi-task 설정의 sampling rate와 배치 크기 같은 하이퍼파라미터에 민감했다고 명시한다. 각 과제의 sampling rate는 경험적으로 정했다.

### 3.4 native audio와 ASR cascade 비교 설계 (Native Audio vs ASR Cascade)

MSEB(Massive Sound Embedding Benchmark) [41]의 retrieval split에서 두 구성을 나란히 두고 비교한다. 과제는 음성 query를 받아 대규모 텍스트 문서 코퍼스에서 관련 정보를 찾는 것이다.

1. **Gemini Embedding 2 + ASR**: raw audio를 ASR로 전사한 뒤 그 텍스트를 인코딩하는 cascade 방식이다.
2. **Gemini Embedding 2 + native audio**: 중간 전사 없이 raw audio를 직접 처리하는 제안 방식이다.

주 평가 지표는 mrr@10이고, 같은 언어 안에서 검색하는 PassageInLang과 언어를 넘나드는 PassageCrossLang 두 구간으로 나눈다.

저자들이 제시하는 가설은 cascade의 구조적 결함이 오류 전파라는 것이다. ASR이 모호한 오디오를 잘못 해석해 하나의 텍스트로 확정해 버리면 다운스트림 retrieval은 완전히 다른 query를 받게 된다. 논문은 "recognize speech"와 "wreck a nice beach"를 예로 든다. native 방식은 그런 hard textual decision을 강요하지 않아 prosody, intonation, 강세 같은 음향 단서를 임베딩에 남긴다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 multimodal retrieval (Table 1)

비교 대상은 Voyage-3.5-multimodal [36], Amazon Nova MME [20], 그리고 Google의 이전 모델 multimodalembedding@001 [37]이다. GUIEC는 20만 장 인덱스에서 instance 단위로 검색하는 과제이고, 비디오는 1 FPS로 최대 32 프레임까지 임베딩한다.

| 과제 묶음 | 데이터셋 | 지표 | Gemini Embedding 2 | Nova MME | Voyage-3.5-mm | legacy |
|---|---|---|---|---|---|---|
| Image to Image | GUIEC | R@1 | **79.4** | 68.6 | 69.4 | 69.5 |
| Image to Image | ImageNet | R@1 | **83.6** | 미보고 | 미보고 | 71.8 |
| Text to Image | Mean | R@1 | **80.5** | 71.6 | 75.8 | 69.5 |
| Text to Image | MSCOCO | R@1 | **62.9** | 57.2 | 58.1 | 53.1 |
| Text to Image | Flickr30k | R@1 | 89.1 | 81.6 | **89.9** | 81.4 |
| Text to Image | DOCCI | R@1 | **93.4** | 84.0 | 83.8 | 미보고 |
| Text to Image | TextCaps | R@1 | **89.6** | 76.0 | 79.4 | 74.0 |
| Image to Text | Mean | R@1 | **91.2** | 81.6 | 85.9 | 83.4 |
| Image to Text | MSCOCO | R@1 | **78.8** | 68.3 | 74.5 | 68.2 |
| Image to Text | Flickr30k | R@1 | **97.4** | 87.5 | 94.5 | 94.0 |
| Image to Text | DOCCI | R@1 | **91.3** | 76.5 | 77.4 | 미보고 |
| Image to Text | TextCaps | R@1 | **97.4** | 88.9 | 88.6 | 88.1 |
| Text to Video | Mean | NDCG@10 | **63.1** | 54.0 | 49.9 | 49.2 |
| Text to Video | Vatex | NDCG@10 | **68.8** | 60.3 | 55.2 | 54.9 |
| Text to Video | MSR-VTT | NDCG@10 | **68.0** | 67.0 | 63.0 | 57.9 |
| Text to Video | YouCook2 | NDCG@10 | **52.5** | 34.7 | 31.4 | 34.9 |
| Image+Text to Text | EncyclopedicVQA | R@20 | **71.5** | 미보고 | 58.6 | 미보고 |
| Document | ViDoRe V2 | NDCG@10 | 64.9 | 60.6 | **65.5** | 28.9 |
| 종합 | Overall | 혼합 | **77.2** | 68.2 | 70.0 | 64.1 |
| 지원 modality | | | V/A/I/T | V/A/I/T | V/I/T | I/T |

- Gemini Embedding 2가 지지 않은 항목은 두 개다. Text to Image의 Flickr30k(89.1 대 Voyage-3.5-multimodal 89.9)와 ViDoRe V2(64.9 대 65.5)에서 Voyage-3.5-multimodal이 앞선다.
- Vatex, MSR-VTT, YouCook2의 in-domain 학습 split을 쓰지 않았는데도 세 비디오 과제 모두에서 가장 높다.
- 긴 캡션 벤치마크인 DOCCI와 TextCaps에서 격차가 특히 크다. Text to Image DOCCI는 두 번째로 높은 Nova MME(84.0)를 9.4%p 앞선다.
- ViDoRe V2는 페이지 단위 시각 구조와 레이아웃, 삽입 텍스트 이해를 요구하는 과제다. 저자들은 이 비교에서 Video/Audio/Image/Text 전체 modality를 지원하는 모델이 Amazon Nova MME와 자사 모델 둘뿐이라는 점을 함께 짚는다.

### 4.2 MMTEB, MTEB Code, CoIR (Table 2)

MMTEB [7]은 250개 넘는 언어와 10가지 과제 유형(Bitext Mining, Classification, Clustering, Instruction Retrieval, Multilabel Classification, Pair Classification, Reranking, Retrieval, STS, Summarization)을 담는다. MTEB Code v1은 15개 프로그래밍 언어의 코드 retrieval 과제 12개, CoIR [40]은 9개 언어의 과제 10개로 구성된다.

| 벤치마크 | 항목 | Gemini Embedding 2 | Nova MME | Gemini Embedding (텍스트 전용) | voyage-3.5 / voyage-code-3 |
|---|---|---|---|---|---|
| MTEB Multilingual | Mean (Task) | **69.9** | 63.8 | 68.4 | 58.5 |
| MTEB Multilingual | Mean (Type) | **61.2** | 미보고 | 59.6 | 51.9 |
| MTEB Multilingual | Bitext Mining | **85.4** | 미보고 | 79.3 | 60.5 |
| MTEB Multilingual | Classification | **73.1** | 미보고 | 71.8 | 58.5 |
| MTEB Multilingual | Clustering | **55.3** | 미보고 | 54.6 | 45.9 |
| MTEB Multilingual | Inst. Retrieval | 2.9 | 미보고 | 5.2 | **6.5** |
| MTEB Multilingual | Multilabel Class. | **32.2** | 미보고 | 29.2 | 21.7 |
| MTEB Multilingual | Pair Class. | 83.2 | 미보고 | **83.6** | 76.0 |
| MTEB Multilingual | Reranking | **69.0** | 미보고 | 65.7 | 64.2 |
| MTEB Multilingual | Retrieval | **70.0** | 미보고 | 67.7 | 64.0 |
| MTEB Multilingual | STS | 79.4 | 미보고 | 79.4 | 70.0 |
| MTEB Code v1 | Mean | **84.0** | 미보고 | 76.0 | 미보고 |
| CoIR | Mean | **82.3** | 미보고 | 73.9 | 78.5 |
| 지원 modality | | V/A/I/T | V/A/I/T | T | T |

- multimodal로 확장했는데도 텍스트 전용 성능이 떨어지지 않았다. 본문은 이전 텍스트 전용 모델의 Mean (Task) 68.32를 69.9가 넘어섰다고 적는다. 표에는 같은 값이 68.4로 반올림되어 있다.
- 9개 과제 유형 중 Gemini Embedding 2가 1위가 아닌 항목이 세 개다. Instruction Retrieval은 2.9로 세 모델 가운데 가장 낮고, Pair Classification은 83.2로 이전 텍스트 전용 모델(83.6)에 뒤지며, STS는 79.4로 동률이다.
- CoIR에서는 코드 특화 모델 voyage-code-3(78.5)를 82.3으로 앞선다. MTEB Code v1의 voyage-code-3 값은 논문에 보고되지 않았으므로(‡ 표시), 이 벤치마크에서의 직접 비교는 성립하지 않는다.

### 4.3 MSEB 오디오 retrieval (Table 3)

| 구성 | 평균 mrr@10 | Passage In-Lang | Passage Cross-Lang |
|---|---|---|---|
| Gemini Embedding 2 + ASR | 70.40 | 73.58 | 67.55 |
| Gemini Embedding 2 + native audio | **73.99** | **75.58** | **72.56** |
| 차이 | +3.59 | +2.00 | +5.01 |

cross-lingual 구간의 상승폭이 더 크다는 것이 핵심 관찰이다. 저자들은 modality에 구애받지 않는 latent space가 원 오디오의 발화 언어와 무관하게 의미 특징을 정렬하며, 중간 ASR 전사기가 강제하는 음소 경계 너머로 일반화한다는 근거로 해석한다.

### 4.4 특화 도메인 zero-shot (Table 4, R@5, 이미지에서 텍스트)

MicroVQA [42]는 현미경과 바이오사이언스, ArtCap [43]은 회화, AstroLLaVA [44]는 천문, Recipe1M [45]는 요리 도메인이다. Recipe1M은 재료(Ingredients)와 조리법(Instructions) 두 가지 검색으로 나뉜다.

| 모델 | 변형 | MicroVQA | ArtCap | AstroLLaVA | Recipe1M Ingredients | Recipe1M Instructions |
|---|---|---|---|---|---|---|
| CLIP | Base Patch32 | 34.1 | 34.1 | 21.2 | 64.6 | 61.1 |
| CLIP | Large Patch14 | 44.4 | 49.4 | 28.8 | 76.5 | 74.6 |
| CLIP | Large Patch14-336 | 46.7 | 52.2 | 31.6 | 76.0 | 75.6 |
| ALIGN | Base | 48.1 | 49.2 | 18.4 | 70.3 | 70.8 |
| SigLIP 2 | Base Patch16-256 | 23.0 | 16.3 | 6.3 | 69.8 | 70.7 |
| SigLIP 2 | Large Patch16-384 | 27.4 | 7.3 | 11.0 | 78.7 | 78.3 |
| SigLIP 2 | Giant Patch16-384 | 33.3 | 8.4 | 13.2 | 81.2 | 80.4 |
| TIPS | Base Patch14 | 14.8 | 59.3 | 6.9 | 60.7 | 59.3 |
| TIPS | Large Patch14 | 21.5 | 59.9 | 8.9 | 61.3 | 63.0 |
| TIPS | Giant Patch14 | 20.0 | 65.2 | 10.1 | 66.0 | 65.6 |
| Voyage-3.5-multimodal | 해당 없음 | 53.3 | 48.7 | 30.3 | 미보고 | 미보고 |
| **Gemini Embedding 2** | 해당 없음 | **79.3** | **67.7** | **64.4** | **90.2** | **92.1** |

- 천문에서 64.4로 baseline 성능을 사실상 두 배로 올렸고, 미생물에서는 79.3으로 48% 넘게 앞선다.
- Recipe1M에서 재료 90.2와 조리법 92.1로 90선을 넘었고, 두 번째로 높은 SigLIP2-Giant(81.2와 80.4)를 크게 앞선다.
- 저자들이 강조하는 것은 절대 점수보다 도메인 사이 일관성이다. TIPS-G14는 ArtCap에서 65.2로 좋지만 MicroVQA에서 20.0으로 내려가고, SigLIP 2 계열은 Recipe1M에서 81.2까지 올라가지만 ArtCap에서 8.4까지 내려간다. Gemini Embedding 2에는 이런 도메인 의존적 진폭이 나타나지 않는다.

### 4.5 ablation

#### 4.5.1 합성 데이터의 효과 (Table 5)

MTEB Code v1의 3개 과제만 골라 본 ablation이다. 표 캡션은 이 ablation 모델들이 souping을 제외한 구성이라고 명시한다.

| 모델 | Average | CodeFeedbackMT | CodeFeedbackST | SyntheticText2SQL |
|---|---|---|---|---|
| Gemini Embedding (이전 텍스트 전용) | 70.5 | 56.3 | 85.3 | 70.0 |
| Gemini Embedding 2, 합성 데이터 없음 | 73.0 | 57.9 | 85.5 | 75.7 |
| Gemini Embedding 2, 합성 데이터 사용 | **86.3 (+15.8)** | **92.3** | **88.6** | **78.1** |

- 표에 붙은 +15.8은 합성 데이터 단독 효과가 아니라 이전 텍스트 전용 모델(70.5) 대비 총 상승폭이다. 본문도 "이전 Gemini Embedding 모델 대비 평균 +15.81"이라고 적는다.
- 합성 데이터만의 기여로 좁히면 73.0에서 86.3으로 13.3점이다.
- 합성 데이터를 넣기 전 단계(73.0)만으로도 이전 텍스트 전용 모델(70.5)을 넘는다는 점을 저자들이 별도로 짚는다.
- 상승폭이 가장 큰 과제는 CodeFeedbackMT [47]로, 57.9에서 92.3으로 34.4점 올랐다.

#### 4.5.2 PFT와 FT 비교 (Figure 3)

10개 과제에서 PFT 체크포인트와 최종 FT 체크포인트를 비교한다.

| 과제 | 지표 | PFT | FT | 차이 |
|---|---|---|---|---|
| ImageNet | I2I R@1 | 83.5 | 83.6 | +0.1 |
| MSCOCO | I2T R@1 | 78.2 | 78.8 | +0.6 |
| MSCOCO | T2I R@1 | 62.9 | 62.9 | 0.0 |
| Flickr30k | I2T R@1 | 97.3 | 97.4 | +0.1 |
| Flickr30k | T2I R@1 | 89.0 | 89.1 | +0.1 |
| DOCCI | I2T R@1 | 88.9 | 91.2 | +2.3 |
| DOCCI | T2I R@1 | 91.4 | 93.1 | +1.7 |
| Vatex | T2V NDCG@10 | 61.5 | 69.2 | +7.7 |
| MSR-VTT | T2V NDCG@10 | 63.3 | 68.2 | +4.9 |
| YouCook2 | T2V NDCG@10 | 34.7 | 55.9 | +21.2 |

이미지 과제의 개선은 일관되지만 폭이 작고, 큰 개선은 비디오 평가에 몰려 있다. FT 단계에서 비디오 학습 데이터가 추가로 들어가기 때문이라고 저자들이 설명한다.

#### 4.5.3 in-domain 비디오 데이터와 model soup (Table 6)

fine-tuning 혼합에 in-domain 데이터를 넣고 추가 데이터를 1 epoch 학습한 결과다. 수천 스텝과 O(k) 규모의 데이터만으로도 목표 과제 지표가 크게 움직인다.

| 구성 | MSR-VTT | Δ | YouCook2 | Δ | Vatex | Δ |
|---|---|---|---|---|---|---|
| baseline Gemini Embedding 2 | 68.2 | 기준 | 55.9 | 기준 | 69.2 | 기준 |
| + MSR-VTT 데이터 (FTmix-m) | 75.0 | +6.8 | 56.1 | +0.2 | 71.7 | +2.5 |
| + MSR-VTT와 Vatex 데이터 (FTmix-mv) | 76.1 | +7.9 | 55.3 | -0.6 | 79.5 | +10.3 |
| soup 2:1 (w_base=2, w_ft=1) | 71.7 | +3.5 | 56.1 | +0.2 | 74.5 | +5.3 |
| soup 1:1 (w_base=1, w_ft=1) | 73.7 | +5.5 | 56.8 | +0.9 | 76.8 | +7.6 |

- in-domain 데이터를 좁게 넣으면 목표 과제는 오르지만 out-of-domain인 YouCook2가 55.9에서 55.3으로 0.6%p 내려간다.
- 새로 fine-tuning한 가중치가 원래 baseline과 souping으로 잘 섞인다. 1:1 soup은 세 과제 전부에서 baseline을 넘어서며, YouCook2도 56.8로 baseline보다 0.9%p 높다.
- 저자들의 해석은 단순 가중치 보간이 과제 특화 지식과 원 모델의 강건성을 함께 유지한다는 것이다.

### 4.6 전체 결과표 (Table 7, Table 8)

부록 §8은 개별 과제 점수를 전부 공개한다. MTEB Multilingual은 132개 과제, MTEB Code는 12개 과제다.

| 구분 | 상위 과제 | 하위 과제 |
|---|---|---|
| MTEB Multilingual (132개) | IndicGenBenchFloresBitextMining 99.22, HagridRetrieval 99.19, BUCC.v2 99.09, IN22GenBitextMining 98.43, NepaliNewsClassification 97.98 | Robust04InstructionRetrieval -0.44, News21InstructionRetrieval 2.64, MultiEURLEXMultilabelClassification 4.70, Core17InstructionRetrieval 6.44, TempReasonL1 7.77, SpartQA 8.74 |
| MTEB Code (12개) | AppsRetrieval 98.60, StackOverflowQA 97.89, CodeSearchNetCCRetrieval 96.25, CodeTransOceanContest 93.19 | CodeTransOceanDL 33.72, CosQA 52.05, SyntheticText2SQL 78.11 |

- Instruction Retrieval 유형의 평균 2.9는 Robust04(-0.44), News21(2.64), Core17(6.44) 세 과제의 평균이다. 지시문을 반영해 순위를 바꾸라는 과제 유형에서 임베딩 단독으로는 거의 신호를 내지 못한다.
- 한국어 과제는 편차가 크다. KorSarcasmClassification은 64.39지만 KorHateSpeechMLClassification은 26.39다.
- MTEB Code 12개 과제 점수의 산술 평균은 83.96으로 본문의 84.0과 일치한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5.1 저자가 명시한 한계

논문에 Limitations 절이 없다. §6 Future Work와 §7 Conclusion만 있으며, 한계에 해당하는 언급은 본문에 흩어져 있다.

- multi-task 설정의 sampling rate와 배치 크기에 modality 균형이 민감하다(§3.3).
- in-domain 데이터를 좁게 추가하면 out-of-domain 과제가 소폭 내려간다(§5.4).

### 5.2 저자 제시 향후 방향 (§6)

1. 검색 시스템의 ranking 같은 신호를 임베딩 학습에 흡수한다.
2. agentic RAG를 겨냥해 다운스트림 RAG 파이프라인과 함께 임베딩을 end-to-end로 fine-tuning한다.
3. interleaved multimodal 응용에 맞는 새 평가 프레임워크를 학계에 요청한다.

### 5.3 자료에서 확인되는 공백

- 모델 크기, 학습 연산량, 학습 데이터 규모, 사용한 Gemini 변형, temperature τ, 배치 크기, sampling rate 실제 값이 모두 비공개다. 외부 재현이 불가능하다.
- ViDoRe V2에서 Voyage-3.5-multimodal에 0.6점 뒤지는데, 저자들은 이 항목의 원인을 분석하지 않는다.
- Instruction Retrieval 유형의 낮은 점수(2.9)와 이전 텍스트 전용 모델 대비 하락(5.2에서 2.9)에 대한 설명이 없다.
- MTEB Code v1과 CoIR에서 Amazon Nova MME 값이 보고되지 않아 멀티모달 모델 사이의 코드 retrieval 비교가 성립하지 않는다.

### 5.4 자료 내적 모순

- **YouCook2 값 불일치**: Table 1은 Gemini Embedding 2의 YouCook2 NDCG@10을 52.5로, Figure 3의 FT 막대와 Table 6의 baseline 행은 같은 지표를 55.9로 적는다. Vatex(68.8 대 69.2), MSR-VTT(68.0 대 68.2), DOCCI I2T(91.3 대 91.2), DOCCI T2I(93.4 대 93.1)에서도 소폭 어긋난다. Table 1이 souping을 포함한 최종 모델일 가능성이 있으나 논문은 그 구분을 밝히지 않는다.
- **Table 5의 souping 표기 충돌**: 캡션은 ablation 모델이 souping을 제외한다고 적지만, 합성 데이터 사용 행의 세 값(92.3, 88.6, 78.1)은 최종 모델 전체 결과인 Table 8의 값(92.30, 88.59, 78.11)과 일치한다.
- **MMTEB 과제 유형 수 불일치**: §4.2 본문은 10개 유형을 나열하지만 Table 2에는 9개 행만 있고 Summarization이 빠져 있다.
- **참고문헌 중복**: MSR-VTT가 [10]과 [39] 두 항목으로 중복 등재되어 있고, 본문 §4.1은 [39]를, Table 1과 §1은 [10]을 인용한다. GUIEC도 Table 1은 [28](Google 블로그), §4.1은 [38](Kaggle 대회 페이지)로 갈린다.
- **문서 날짜**: 첫 줄 문서 날짜는 2026-5-27, arXiv 등록 표시는 2026-05-26이다.
- **이전 모델 점수 표기**: 본문은 68.32, Table 2는 68.4로 적는다. 반올림 차이로 보이나 표기가 통일되어 있지 않다.

## 6. 관련 연구 (Related Work)

### 6.1 텍스트 임베딩 계보

- **인코더 전용 구조**: BERT [11], RoBERTa [12].
- **instruction-tuned 표현**: BGE 계열 [13], E5 [14]. task별 prefix로 semantic search, clustering, classification을 한 모델에 통합했다.
- **distillation**: Gecko [15]. 대형 LLM 교사를 활용한 2단계 distillation으로 경량 retriever를 학습한다.
- **디코더 전용 범용 임베더**: NV-Embed [16]. instruction-tuned contrastive 학습과 비검색 합성 데이터의 적극적 통합으로 MMTEB 리더보드 [17]에서 강세를 보였다.
- **선행 Gemini Embedding** [18]: 본 모델의 텍스트 전용 버전. 합성 데이터 활용과 Gemini pre-training 덕분의 다국어 일반화가 핵심이었다.

### 6.2 multimodal 임베더 계보

- **dual-tower contrastive**: CLIP [1], ALIGN [2]. 단순한 이미지-텍스트 쌍에 대한 좁은 contrastive 목적함수에 묶여 있었다.
- **통합 의미 공간**: SigLIP 2 [3], CoCa [4], Amazon Nova MME [20]. 텍스트, 코드, 이미지, 구조화 문서, 오디오, 비디오를 하나의 연속 의미 공간에 두려는 흐름이다.
- **추천 특화**: SAIL-Embedding [19]. content-aware progressive training으로 sequence-to-item 예측 같은 산업 추천 환경에 매핑한다.

### 6.3 bidirectional attention 적응

- **MoCa** [21]: modality-aware continual pre-training. interleaved 텍스트와 이미지 입력을 복원하는 목적함수로 causal backbone 위에 bidirectional 문맥 인식을 강제한다.
- **MM-Embed** [22]: modality-aware hard negative mining으로 텍스트 사이 유사도만 과대평가하는 modality 편향을 완화한다.

### 6.4 기업 문서 응용

타일 기반 vision 인코더 혼합으로 복잡한 PDF, 차트, 표를 임베딩하는 접근이다. 저자들은 이 방식이 chunking 전략 같은 파이프라인 구성 요소에 RAG 품질을 종속시킨다고 지적한다.

논문은 위 세 흐름(다단계 distillation, LLM backbone 적응, 기업 응용)이 그동안 따로 다뤄졌다고 보고, Gemini Embedding 2가 이를 하나의 모델로 통합한다고 주장한다.

## 7. 용어집 (Glossary)

| 용어 | 정의 |
|---|---|
| **native multimodal embedding** | modality별 인코더 없이 단일 backbone이 모든 modality와 그 조합을 직접 임베딩하는 방식. |
| **late-fusion (dual-tower)** | CLIP과 ALIGN처럼 modality별 인코더가 따로 임베딩한 뒤 contrastive 손실로 정렬하는 방식. mixed-modality 입력 처리가 약하다. |
| **interleaved 입력** | 이미지, 텍스트, 비디오가 하나의 시퀀스 안에 섞여 들어오는 입력 형태. 비디오의 특정 장면을 시각과 텍스트 단서를 함께 써서 찾는 검색이 이 형태다. |
| **MRL (Matryoshka Representation Learning)** | 임베딩 벡터의 앞부분 부분 차원들을 동시에 학습 가능한 표현으로 만드는 기법. 다운스트림에서 차원을 잘라 써도 품질이 유지된다. |
| **NCE (Noise-Contrastive Estimation)** | positive와 negative를 구분하도록 학습하는 contrastive 손실 계열. |
| **in-batch negative** | 같은 배치 안 다른 예제의 positive를 자동으로 negative로 삼는 기법. |
| **hard negative** | 모델이 헷갈리기 쉬운 어려운 negative. 학습 신호를 강하게 만든다. |
| **PFT (Pre-Fine-Tuning)** | 자기회귀 생성에서 인코딩으로 파라미터를 적응시키는 1차 학습 단계. 잡음 섞인 대량 데이터와 큰 배치를 쓴다. |
| **model soup** | 여러 fine-tuning 체크포인트의 가중치를 평균해 일반화를 얻는 기법. |
| **task string augmentation** | "question answering" 같은 task string을 query 앞에 붙이고 학습 중 무작위로 떼어내는 기법. |
| **ASR cascade** | 오디오를 ASR로 텍스트로 바꾼 뒤 텍스트를 임베딩하는 파이프라인. 오류 전파가 약점이다. |
| **MMTEB / MTEB Multilingual** | Massive Multilingual Text Embedding Benchmark. 250개 넘는 언어, 10가지 과제 유형, 부록 기준 132개 개별 과제. |
| **MTEB Code v1** | 15개 프로그래밍 언어의 코드 retrieval 과제 12개. |
| **CoIR** | Code Information Retrieval 벤치마크. 9개 언어의 과제 10개. |
| **MSEB** | Massive Sound Embedding Benchmark. 본 논문은 passage retrieval split만 쓴다. |
| **PassageInLang / PassageCrossLang** | MSEB retrieval split의 두 구간. 각각 같은 언어 안 검색과 언어를 넘나드는 검색이다. |
| **GUIEC** | Google Universal Embedding Challenge. 20만 장 인덱스에서 instance 단위로 검색한다. |
| **ViDoRe V2** | 페이지 단위 시각 구조와 레이아웃, 삽입 텍스트 이해를 요구하는 문서 retrieval 벤치마크. |
| **EncyclopedicVQA** | 이미지와 질문을 함께 임베딩해 정답을 검색하는 형태의 VQA retrieval. |
| **mrr@10 / NDCG@10 / R@K** | 각각 상위 10개 안 정답의 역순위 평균, 상위 10개의 순위 품질, 상위 K개에 정답이 포함될 확률. |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | 텍스트, 이미지, 비디오, 오디오를 하나의 vector space로 보내는 전체 흐름 | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 3 | 7개 retrieval 과제에서 경쟁 모델 3종과 비교한 레이더 차트 | caption-region | ★ wiki 권장 (result) |
| fig03 | 12 | PFT 체크포인트와 FT 체크포인트의 10개 과제 성능 막대 비교 | caption-region | ★ wiki 권장 (ablation) |
| tab01 | 7 | unimodal, cross-modal, multimodal retrieval 벤치마크 종합 비교표 | table-region | 본문 마크다운 표로 이관 |
| tab02 | 8 | MTEB Multilingual, MTEB Code v1, CoIR 텍스트 벤치마크 비교표 | table-region | 본문 마크다운 표로 이관 |
| tab03 | 9 | MSEB passage retrieval split에서 ASR 경유와 native audio 직접 입력 비교표 | table-region | 크롭 결함, 본문 마크다운 표로 이관 |
| tab04 | 10 | 미생물, 미술, 천문, 요리 4개 특화 도메인의 이미지에서 텍스트 retrieval 비교표 | table-region | 본문 마크다운 표로 이관 |
| tab05 | 11 | 합성 데이터 유무에 따른 MTEB Code v1 3개 과제 ablation 표 | table-region | 본문 마크다운 표로 이관 |
| tab06 | 12 | in-domain 비디오 데이터 추가와 model soup의 비디오 지표 변화표 | table-region | 본문 마크다운 표로 이관 |
| tab07 | 18 | MTEB Multilingual 132개 개별 과제의 전체 점수표 | table-region | 본문에 상하위 발췌만 |
| tab08 | 19 | MTEB Code 12개 개별 과제의 전체 점수표 | table-region | 본문 마크다운 표로 이관 |

크롭 상태 확인 결과는 다음과 같다.

- **fig01, fig02, fig03**: 도식 전체가 온전히 잡혔다. fig01은 위쪽에 페이지 머리글 일부가 함께 들어왔지만 도식은 가려지지 않는다.
- **tab01, tab02, tab04, tab05, tab06, tab07, tab08**: 표 본문이 온전하다. tab01, tab02, tab04, tab05는 위쪽에 페이지 머리글이 절반쯤 잘려 들어왔으나 표 자체에는 영향이 없다.
- **tab03**: 크롭 결함이다. 페이지 면적의 63%를 잡으면서 §4.3 본문 문단들을 대부분 담았고, 정작 Table 3은 크롭 맨 아래에 걸쳐 캡션과 아래쪽 괘선이 잘려 나갔다. `curated: false`로 두고 수치는 §4.3의 마크다운 표로 옮겼다.
