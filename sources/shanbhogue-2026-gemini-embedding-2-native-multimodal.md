---
title: "Gemini Embedding 2: A Native Multimodal Embedding Model from Gemini"
type: paper
year: 2026
category: database
raw_path: raw/papers/shanbhogue-2026-gemini-embedding-2-native-multimodal.pdf
raw_filename: "shanbhogue-2026-gemini-embedding-2-native-multimodal.pdf"
source_collection: external
authors: "Madhuri Shanbhogue, Zhe Li, Shanfeng Zhang, Gustavo Hernández Ábrego, Shih-Cheng Huang, Aashi Jain, et al. (Gemini Embedding Team, Google DeepMind)"
arxiv_id: "2605.27295"
venue: "arXiv preprint (Google DeepMind, 2026-05-26)"
url: "https://arxiv.org/abs/2605.27295"
tags: [embedding, multimodal, gemini, mteb, retrieval, rag, contrastive-learning, matryoshka, paper]
---

## 한 줄 요약 (One-line Summary)

**Gemini Embedding 2**는 Gemini를 backbone으로 초기화한 **native multimodal embedding model**로, 텍스트·이미지·비디오·오디오와 그 interleaved 조합까지 단일 vector space(최대 3,072차원)에 매핑한다. CLIP/ALIGN 같은 late-fusion dual-tower의 한계를 극복하기 위해 MLLM을 contrastive 학습으로 적응시키며, multi-task·multi-stage 학습(PFT → FT → model soup)과 MRL(Matryoshka) loss로 768/1,536/3,072 차원을 동시에 지원한다. MTEB Multilingual 69.9 · MTEB Code 84.0 · MSCOCO T→I R@1 62.9 · Vatex T→V NDCG@10 68.8를 기록하며, 특히 **native audio embedding이 ASR cascade 대비 +3.59 mrr@10**(cross-lingual에서 +5.01), 천문·미생물·요리 등 specialized domain에서 zero-shot SOTA를 달성.

## 1. 자료 정보 (Document Information)

- **제목**: Gemini Embedding 2: A Native Multimodal Embedding Model from Gemini
- **저자**: Gemini Embedding Team, Google DeepMind (Madhuri Shanbhogue, Zhe Li, Shanfeng Zhang, Gustavo Hernández Ábrego, Shih-Cheng Huang, Aashi Jain 등 60+명; equal contribution 6명)
- **발표**: arXiv:2605.27295v1 [cs.CV], 2026-05-26 (총 21페이지)
- **PDF 경로**: `raw/papers/shanbhogue-2026-gemini-embedding-2-native-multimodal.pdf`
- **선행 모델**: Gemini Embedding (Lee et al., 2025, arXiv:2503.07891) — text-only 버전

## 2. 주요 기여 (Key Contributions)

1. **Native multimodal embedding (late-fusion 탈피)**: CLIP·ALIGN·SigLIP 2·CoCa 같은 dual-tower 모델들이 modality-specific encoder를 따로 두고 paired data로 정렬했던 것을, Gemini MLLM 한 백본으로 처리. **interleaved 입력**(예: "이 비디오에서 X 장면 찾아줘" + 이미지 + 텍스트)을 native하게 임베딩.
2. **Bidirectional attention adaptation**: causal Gemini를 bidirectional attention transformer로 fine-tune. mean pooling + 랜덤 초기화 linear projection으로 출력 차원 조정.
3. **Multi-task · multi-stage 학습 레시피**:
   - **PFT (Pre-Fine-Tuning)**: image/text/code 위주, large batch, noisy query-target 쌍으로 generation → encoding 적응.
   - **FT (Fine-Tuning)**: text/code/document/image/audio/video 전 modality, query-target-hard negative triplet, task-별 batch size 튜닝.
   - **Model Soup**: 여러 fine-tuning checkpoint를 weighted averaging해 generalization 확보.
4. **NCE loss + Matryoshka Representation Learning (MRL)**: in-batch negatives + cosine similarity + temperature τ. MRL로 single training run에서 768·1,536·3,072 차원을 동시에 최적화 → 다운스트림에서 dimension 절약 가능.
5. **Native audio가 ASR cascade를 능가함을 실증**: 별도 ASR 거치지 않고 raw audio를 직접 embedding하면 retrieval 품질이 일관되게 상승 (PassageInLang +2.00, PassageCrossLang **+5.01**).
6. **Specialized domain zero-shot 강건성**: 천문(AstroLLaVA)·미생물(MicroVQA)·요리(Recipe1M)·미술(ArtCap) 4개 도메인에서 CLIP·ALIGN·SigLIP 2·TIPS 대비 압도적 SOTA.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 Model Architecture

- **Backbone**: Gemini로 초기화한 transformer M. Causal mask를 제거하고 bidirectional attention으로 fine-tune. Gemini가 원래 지원하는 raw image/video/audio 포맷을 그대로 입력 → tokenize.
- **Pipeline**: 입력 토큰 시퀀스 T (길이 L) → M(T) ∈ ℝ^{L×d_M} → **mean pooling** P → 랜덤 초기화 linear projection f → 최종 embedding E ∈ ℝ^d.
- **출력 차원**: d=3,072가 기본. MRL로 768·1,536 차원도 동시 지원.

### 3.2 Training Objective (NCE + MRL)

- **Loss**: noise-contrastive estimation with in-batch negatives. query q_i, positive target p_i^+, optional hard negative p_i^- 삼중항.
  - L = (1/B) Σ_i [-log( exp(sim(q_i, p_i^+)/τ) / (exp(sim(q_i, p_i^+)/τ) + exp(sim(q_i, p_i^-)/τ) + Σ_j mask(i,j)·exp(sim(q_i, p_j^+)/τ)) )]
  - mask(i,j) = 0 if q_i=q_j or p_i^+=p_j^+ (classification task 처리).
- **Task string augmentation**: text-only task에서 "question answering", "fact checking" 같은 task prefix t를 query에 prepend. 학습 중 **random drop**해서 task string 없이도 robust하게 동작하도록.
- **MRL**: 하나의 임베딩을 k개의 overlapping sub-dimension(예: 첫 768, 첫 1,536, 첫 3,072)으로 자르고 각각에 위 loss를 적용 → 다중 차원 동시 최적화.

### 3.3 Training Recipe (Multi-Stage)

| 단계 | 데이터 | 특징 |
|---|---|---|
| **PFT** | image, text, code (noisy query–target 쌍) | large batch로 gradient 안정화, single-task per batch sampling |
| **FT** | text, code, document, image, audio, video (대부분 hard negative 포함 triplet) | task별 batch size 튜닝, single-modality batch + cross-modality batch 혼합, sampling rate empirical |
| **Model Soup** | 여러 FT checkpoint | same-run / different-run / weighted averaging 등 다양한 조합 실험 |

multi-task의 sampling rate · batch size가 modality 균형에 매우 민감한 하이퍼파라미터로 확인됨.

### 3.4 Native Audio vs ASR Cascade

MSEB(Massive Sound Embedding Benchmark) retrieval split에서 두 셋업 비교:
1. **Gemini Embedding 2 + ASR**: raw audio → ASR → 텍스트 embedding (cascade).
2. **Gemini Embedding 2 + Native Audio**: raw audio 직접 embedding (이 논문 방식).

Native 방식이 acoustic ambiguity(prosody·intonation·강세)를 "hard textual decision"으로 잃지 않고 보존해서 cross-lingual에서 특히 큰 격차를 만든다는 게 가설. 결과(§4)가 이를 실증.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 Multimodal Retrieval (Table 1)

vs Voyage-3.5-multimodal · Amazon Nova MME · multimodalembedding@001.

| Task | Metric | Gemini Emb 2 | Nova MME | Voyage-3.5-mm | Google Legacy |
|---|---|---|---|---|---|
| Image→Image (GUIEC) | R@1 | **79.4** | 68.6 | 69.4 | 69.5 |
| Image→Image (ImageNet) | R@1 | **83.6** | – | – | 71.8 |
| Text→Image (Mean) | R@1 | **80.5** | 71.6 | 75.8 | 69.5 |
| · MSCOCO | R@1 | **62.9** | 57.2 | 58.1 | 53.1 |
| · Flickr30k | R@1 | – | 81.6 | **89.9** | 81.4 (89.1) |
| · DOCCI | R@1 | **93.4** | 84.0 | 83.8 | – |
| · TextCaps | R@1 | **89.6** | 76.0 | 79.4 | 74.0 |
| Image→Text (Mean) | R@1 | **91.2** | 81.6 | 85.9 | 83.4 |
| · MSCOCO | R@1 | **78.8** | 68.3 | 74.5 | 68.2 |
| · Flickr30k | R@1 | **97.4** | 87.5 | 94.5 | 94.0 |
| · DOCCI | R@1 | **91.3** | 76.5 | 77.4 | – |
| · TextCaps | R@1 | **97.4** | 88.9 | 88.6 | 88.1 |
| Text→Video (Mean) | NDCG@10 | **63.1** | 54.0 | 49.9 | 49.2 |
| · Vatex | NDCG@10 | **68.8** | 60.3 | 55.2 | 54.9 |
| · MSR-VTT | NDCG@10 | **68.0** | 67.0 | 63.0 | 57.9 |
| · YouCook2 | NDCG@10 | **52.5** | 34.7 | 31.4 | 34.9 |
| Image+Text→Text (EncycVQA) | R@20 | **71.5** | – | 58.6 | – |
| Document (ViDoRe V2) | NDCG@10 | 64.9 | 60.6 | **65.5** | 28.9 |
| **Overall** | – | **77.2** | 68.2 | 70.0 | 64.1 |

- 비디오 학습 split을 in-domain으로 쓰지 않았음에도 Vatex/MSR-VTT/YouCook2에서 zero-shot SOTA.
- ViDoRe V2 문서 retrieval에서만 Voyage-3.5-multimodal(65.5)에 살짝 뒤짐(64.9).

### 4.2 MMTEB / MTEB Code / CoIR (Table 2)

| Benchmark | Gemini Emb 2 | Nova MME | Gemini Embedding (이전 text-only) | voyage-3.5 / code-3 |
|---|---|---|---|---|
| MTEB Multilingual Mean (Task) | **69.9** | 63.8 | 68.4 | 58.5 |
| MTEB Multilingual Mean (Type) | **61.2** | – | 59.6 | 51.9 |
| · Bitext Mining | **85.4** | – | 79.3 | 60.5 |
| · Classification | **73.1** | – | 71.8 | 58.5 |
| · Clustering | **55.3** | – | 54.6 | 45.9 |
| · STS | **79.4** | – | 79.4 | 70.0 |
| MTEB Code v1 Mean | **84.0** | – | 76.0 | – |
| CoIR Mean | **82.3** | – | 73.9 | 78.5 |

- **multimodal로 확장했음에도 text-only 성능이 상승** (이전 Gemini Embedding 68.32 → 69.9).
- **MTEB Code v1**에서 도메인 특화 voyage-code-3(78.5)를 압도하는 84.0.

### 4.3 MSEB Audio Retrieval (Table 3)

| Setup | Avg mrr@10 | PassageInLang | PassageCrossLang |
|---|---|---|---|
| Gemini Emb 2 + ASR | 70.40 | 73.58 | 67.55 |
| Gemini Emb 2 + Native Audio | **73.99** | **75.58** (+2.00) | **72.56** (**+5.01**) |

cross-lingual에서 격차가 더 큰 것이 핵심 관찰. modality-agnostic latent space가 ASR phonetic 경계를 넘어 semantic alignment를 보존한다는 근거.

### 4.4 Specialized Domain Zero-shot (Table 4, R@5 I→T)

| Model | MicroVQA | ArtCap | AstroLLaVA | Recipe1M Ingred. | Recipe1M Instr. |
|---|---|---|---|---|---|
| CLIP Large/14-336 | 46.7 | 52.2 | 31.6 | 76.0 | 75.6 |
| ALIGN Base | 48.1 | 49.2 | 18.4 | 70.3 | 70.8 |
| SigLIP 2 Giant/16-384 | 33.3 | 8.4 | 13.2 | 81.2 | 80.4 |
| TIPS Giant/14 | 20.0 | 65.2 | 10.1 | 66.0 | 65.6 |
| Voyage-3.5-multimodal | 53.3 | 48.7 | 30.3 | – | – |
| **Gemini Embedding 2** | **79.3** | **67.7** | **64.4** | **90.2** | **92.1** |

- 천문(AstroLLaVA)에서 baseline 대비 거의 **2배**, 미생물에서 **+48% margin**.
- TIPS/SigLIP 2가 도메인마다 큰 진폭을 보이는 반면 Gemini Embedding 2는 모든 도메인에서 일관 SOTA.

### 4.5 Ablations

- **Synthetic data 효과 (Table 5)**: Gemini로 합성한 데이터를 MTEB Code task에 추가하면 평균 +15.81점 향상. CodeFeedbackMT는 56.3 → 92.3 (+36.0).
- **PFT vs FT (Figure 3)**: 이미지 task에서 PFT만으로도 거의 FT 수준 (예: ImageNet 83.5 → 83.6), but 비디오에서는 FT가 결정적 (MSR-VTT 63.3 → 68.2, YouCook2 34.7 → 55.9).
- **In-domain video data + Model Soup (Table 6)**:
  - FTmix-mv (MSR-VTT + Vatex 추가): MSR-VTT 76.1(+7.9), Vatex 79.5(+10.3), **YouCook2 55.3(-0.6)** ← out-of-domain 소폭 저하.
  - Model Soup (base 1× + ft 1×): MSR-VTT 73.7(+5.5), Vatex 76.8(+7.6), **YouCook2 56.8(+0.9)** ← 모든 task에서 baseline 상회. 단순 weight 보간이 task-specific gain과 robustness를 동시 회복.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **저자가 명시한 한계**는 사실상 없음 (Limitations 섹션 부재). Future Work만 별도 §6에 존재.
- **저자 제시 향후 방향 (§6)**:
  1. 검색 시스템의 **ranking signal**을 임베딩 학습에 흡수.
  2. **End-to-end agentic RAG**용 임베딩 fine-tuning (다운스트림 RAG 파이프라인과 함께 학습).
  3. interleaved multimodal에 맞는 **새로운 평가 벤치마크** 커뮤니티에 요청.
- **재현·검증 측면의 함의**(이 요약 작성자 관찰): 모델 크기·학습 비용·Gemini 의존성 모두 비공개라 외부 reproduce 불가. ViDoRe V2에서 Voyage-3.5-multimodal에 소폭 뒤지는 점은 visual-document 특화 처리 부재 가능성을 시사.

## 6. 관련 연구 (Related Work)

### 텍스트 임베딩 계보
- **Encoder-only**: BERT [11], RoBERTa [12].
- **LLM 기반 instruction-tuned**: BGE M3 [13], E5 [14].
- **LLM distillation**: Gecko [15] (lightweight retriever via two-step distillation).
- **Decoder-only generalist embedder**: NV-Embed [16] (MMTEB 강세, synthetic+contrastive).
- **선행 Gemini Embedding** [18]: 본 모델의 text-only 버전. Gemini 백본의 multilingual generalization과 synthetic data 활용이 핵심.

### Multimodal 임베딩 계보
- **Dual-tower contrastive**: CLIP [1], ALIGN [2] — image-text pair만 사용 → mixed modality 처리 약점.
- **Unified semantic space**: SigLIP 2 [3], CoCa [4], Amazon Nova MME [20] — 텍스트·코드·이미지·문서·오디오·비디오 통합 시도.
- **Recommendation 특화**: SAIL-Embedding [19] (content-aware progressive training, sequence-to-item prediction).

### Bidirectional attention 적응
- **MoCa** [21]: modality-aware continual pre-training으로 causal LLM 위에 bidirectional context 부여.
- **MM-Embed** [22]: modality-aware hard negative mining으로 text-to-text 편향 완화.

### Enterprise visual-document RAG
- 타일 기반 vision encoder mixture로 PDF·차트·테이블 처리 (chunking strategy 의존).

본 논문은 이 세 축(distillation, backbone adaptation, enterprise visual-doc)을 **하나의 모델**로 통합한다고 주장.

## 7. 용어집 (Glossary)

| 용어 | 정의 |
|---|---|
| **Native multimodal embedding** | modality별 인코더 없이 단일 backbone이 모든 modality와 그 조합을 직접 임베딩하는 방식 (vs late-fusion). |
| **Late-fusion (dual-tower)** | CLIP·ALIGN처럼 modality-specific encoder가 따로 임베딩한 뒤 contrastive loss로 정렬하는 방식. |
| **MLLM** | Multimodal Large Language Model. Gemini, GPT-4o 등. |
| **MRL (Matryoshka Representation Learning)** | 하나의 임베딩 벡터의 prefix sub-dimension들을 동시에 학습 가능한 표현으로 만드는 기법. 다운스트림에서 차원 truncate해도 품질 유지. |
| **NCE (Noise-Contrastive Estimation)** | positive와 noise(negative) 분포를 구분하도록 학습하는 contrastive loss 계열. |
| **In-batch negative** | mini-batch 내 다른 example의 positive를 자동으로 negative로 사용하는 기법. |
| **Hard negative** | 모델이 헷갈리기 쉬운 어려운 negative. 학습 효율 ↑. |
| **PFT (Pre-Fine-Tuning)** | generation → encoding 적응을 위한 1차 학습. noisy 대량 데이터 + large batch. |
| **Model Soup** | 여러 fine-tuning checkpoint의 weight를 averaging해 generalization 확보. |
| **Task string augmentation** | "question answering" 같은 task prefix를 query에 붙이고 학습 중 random drop. |
| **MMTEB / MTEB Multilingual** | Massive Multilingual Text Embedding Benchmark. 250+ 언어, 10개 task type. |
| **MTEB Code v1** | 12개 code retrieval task, 15개 프로그래밍 언어. |
| **CoIR** | Code Information Retrieval benchmark. 10개 task, 9개 언어. |
| **MSEB** | Massive Sound Embedding Benchmark. 본 논문은 retrieval split만 사용. |
| **MSCOCO / Flickr30k / DOCCI / TextCaps** | 대표 이미지-텍스트 retrieval 벤치마크. DOCCI/TextCaps는 long-caption 특화. |
| **Vatex / MSR-VTT / YouCook2** | text-to-video retrieval 벤치마크. 본 모델은 1 FPS, 최대 32 frame embedding. |
| **GUIEC** | Google Universal Embedding Challenge. instance-level image retrieval (200K index). |
| **ViDoRe V2** | visual-document retrieval benchmark (PDF·차트·테이블 페이지). |
| **EncyclopedicVQA** | image+question → answer 검색 형태의 VQA retrieval. |
| **ASR cascade** | 오디오 → ASR로 텍스트 변환 → 텍스트 임베딩의 파이프라인. error propagation 약점. |
| **PassageInLang / PassageCrossLang** | MSEB retrieval split. 각각 same-language / cross-lingual 검색. |
| **mrr@10** | Mean Reciprocal Rank at 10. retrieval 평가 지표. |
| **NDCG@10** | Normalized Discounted Cumulative Gain at 10. ranking 품질 지표. |
| **Recall@K (R@K)** | top-K 검색 결과에 정답이 포함될 확률. |
