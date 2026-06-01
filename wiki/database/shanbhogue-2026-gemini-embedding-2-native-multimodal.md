---
title: "Gemini Embedding 2: A Native Multimodal Embedding Model from Gemini"
type: paper
year: 2026
category: database
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/shanbhogue-2026-gemini-embedding-2-native-multimodal.pdf
raw_filename: "shanbhogue-2026-gemini-embedding-2-native-multimodal.pdf"
source: shanbhogue-2026-gemini-embedding-2-native-multimodal.md
source_collection: external
authors: "Gemini Embedding Team, Google DeepMind"
arxiv_id: "2605.27295"
url: "https://arxiv.org/abs/2605.27295"
tags: [embedding, multimodal, gemini, mteb, retrieval, rag, contrastive-learning, matryoshka, paper]
---

## 요약 (Summary)

**Gemini Embedding 2**는 Gemini를 backbone으로 초기화한 **native multimodal embedding model**이다. CLIP/ALIGN처럼 modality-specific encoder를 따로 두지 않고, MLLM 한 백본이 텍스트·이미지·비디오·오디오와 그 **interleaved 조합**을 단일 vector space(최대 3,072차원)에 직접 매핑한다.

핵심은 세 가지: (1) **bidirectional attention 적응** + mean pooling + 랜덤 초기화 linear projection으로 임베딩 차원 조정, (2) **NCE loss + MRL(Matryoshka)** 로 768/1,536/3,072 차원 동시 최적화, (3) **PFT → FT → Model Soup** 다단계 학습으로 modality 균형. 그 결과 MTEB Multilingual 69.9 · MTEB Code 84.0 · MSCOCO T→I R@1 62.9 · Vatex T→V NDCG@10 68.8를 기록하며 multimodal SOTA를 점유한다.

특히 두 가지 발견이 강하다:
- **Native audio가 ASR cascade를 일관 능가** (MSEB avg mrr@10 73.99 vs 70.40, cross-lingual에서 +5.01). raw audio의 prosody·intonation을 "hard textual decision"으로 잃지 않고 보존한 결과로 해석됨.
- **Specialized domain zero-shot이 robust**. 천문(AstroLLaVA 64.4 vs CLIP-Large/14-336의 31.6)·미생물(MicroVQA 79.3 vs 46.7)·요리(Recipe1M Instr. 92.1 vs SigLIP 2-Giant 80.4) 등에서 압도적 격차. TIPS/SigLIP 2가 도메인마다 진폭이 큰 반면 본 모델은 모든 도메인에서 일관 SOTA.

## 주요 기여 (Key Contributions)

1. **Late-fusion dual-tower 탈피**. CLIP·ALIGN·SigLIP 2·CoCa의 modality-specific encoder + paired contrastive 패러다임을, MLLM 단일 백본의 native multimodal로 대체. mixed-modality 입력 처리 한계 해결.
2. **Bidirectional attention adaptation**. causal Gemini를 bidirectional attention transformer로 fine-tune하고 mean pooling + linear projection으로 임베딩 생성. (MoCa [21]·MM-Embed [22]와 같은 흐름의 후속 작업.)
3. **NCE + MRL multi-loss**. cosine similarity 기반 in-batch negative + (옵션) hard negative + temperature τ. MRL로 한 학습 run에서 prefix sub-dimension(768/1,536/3,072)을 동시 최적화.
4. **Task string augmentation**. text-only task에서 task prefix("question answering" 등)를 query에 prepend, 학습 중 random drop 해서 task string 없이도 강건.
5. **PFT → FT → Model Soup**. (a) PFT: image/text/code, large batch, generation→encoding 적응. (b) FT: 전 modality, triplet, task별 batch size 튜닝. (c) Soup: 여러 FT checkpoint weight averaging.
6. **Synthetic data 효과 실증**. Gemini로 합성한 코드 retrieval 데이터 추가로 MTEB Code task 평균 **+15.81점** (CodeFeedbackMT 56.3 → 92.3).
7. **Native audio embedding이 ASR cascade를 능가**. MSEB PassageCrossLang에서 **+5.01 mrr@10** 격차로, ASR 중간 단계가 acoustic ambiguity를 잃는 구조적 약점을 우회.

## 방법론 및 아키텍처 (Methodology and Architecture)

```
입력 (text/image/video/audio 또는 interleaved)
   │
   ▼  (Gemini-native tokenization, raw 포맷 직접 처리)
토큰 시퀀스 T ∈ ℝ^L
   │
   ▼  M: Gemini로 초기화 + bidirectional attention fine-tune
M(T) ∈ ℝ^{L×d_M}
   │
   ▼  mean pooling (sequence axis)
P_embed ∈ ℝ^{d_M}
   │
   ▼  랜덤 초기화 linear projection f
E ∈ ℝ^d  (d = 3,072 기본; MRL로 768·1,536 동시 지원)
```

**Loss**: NCE with in-batch negatives + optional hard negative.

```
L = (1/B) Σ_i -log[ exp(sim(q_i, p_i⁺)/τ) / (
        exp(sim(q_i, p_i⁺)/τ)
      + exp(sim(q_i, p_i⁻)/τ)         ← hard negative (있을 때)
      + Σ_j mask(i,j)·exp(sim(q_i, p_j⁺)/τ)    ← in-batch negatives
    )]
```

- `sim(x,y) = x^T y / (‖x‖·‖y‖)` (cosine).
- `mask(i,j) = 0` if `q_i = q_j` or `p_i⁺ = p_j⁺` (classification task에서 target 중복 회피).
- MRL: 위 loss를 k개 prefix sub-dimension에 각각 적용 → multi-loss 합.

**학습 단계 비교**:

| 단계 | 데이터 | batch | sampling | 비고 |
|---|---|---|---|---|
| PFT | image, text, code (noisy q–t) | large | single-task per batch | gradient 안정화 |
| FT | text, code, document, image, audio, video (대부분 triplet) | task별 튜닝 | single-task per batch | single-modality + cross-modality 혼합 |
| Soup | 여러 FT checkpoint | – | – | weighted averaging |

multi-task sampling rate / batch size가 modality 균형에 매우 민감 — 저자 직접 언급.

## 결과 (Results)

### Multimodal Retrieval — vs Voyage-3.5-mm · Nova MME · Google legacy

- **Overall mean 77.2** (vs Nova MME 68.2 / Voyage-3.5-mm 70.0 / legacy 64.1).
- Image→Image GUIEC R@1 **79.4**, ImageNet R@1 **83.6**.
- Text→Image Mean R@1 **80.5**, Image→Text Mean R@1 **91.2** (MSCOCO 78.8, Flickr30k 97.4, DOCCI 91.3, TextCaps 97.4).
- Text→Video Mean NDCG@10 **63.1** (Vatex 68.8, MSR-VTT 68.0, YouCook2 52.5) — in-domain 학습 split 없이 zero-shot SOTA.
- Image+Text→Text (EncyclopedicVQA) R@20 **71.5**.
- ViDoRe V2 문서 retrieval은 64.9로 Voyage-3.5-mm 65.5에 소폭 뒤짐 (유일한 패배).

### MMTEB / MTEB Code / CoIR

- MTEB Multilingual Mean (Task) **69.9** (이전 text-only Gemini Embedding 68.4 대비 +1.5, multimodal 확장 후에도 텍스트 성능 상승).
- Bitext Mining 85.4, Classification 73.1, Clustering 55.3, STS 79.4 등 전 task 그룹 1위.
- **MTEB Code v1 84.0** (이전 76.0, voyage-code-3에 비공개지만 voyage-3.5 58.5 대비 압도).
- **CoIR 82.3** (voyage-code-3 78.5 능가).

### Audio (MSEB) — Native vs ASR

| Setup | Avg mrr@10 | InLang | CrossLang |
|---|---|---|---|
| + ASR | 70.40 | 73.58 | 67.55 |
| + Native | **73.99** | **75.58** (+2.00) | **72.56** (**+5.01**) |

cross-lingual에서 격차가 더 큰 점이 핵심 — modality-agnostic latent space가 ASR phonetic 경계를 넘는다는 증거.

### Specialized Domain Zero-shot (R@5 I→T)

| Domain | Gemini Emb 2 | 차순위 |
|---|---|---|
| MicroVQA (미생물) | **79.3** | Voyage-3.5-mm 53.3 |
| ArtCap (미술) | **67.7** | TIPS-Giant 65.2 |
| AstroLLaVA (천문) | **64.4** | CLIP-Large/14-336 31.6 |
| Recipe1M Ingredients | **90.2** | SigLIP 2-Giant 81.2 |
| Recipe1M Instructions | **92.1** | SigLIP 2-Giant 80.4 |

천문에서 거의 2배, 미생물에서 +48% margin.

### Ablation 하이라이트

- **PFT vs FT**: 이미지는 PFT만으로도 거의 충분 (ImageNet 83.5 → 83.6), 비디오는 FT가 결정적 (YouCook2 34.7 → 55.9).
- **In-domain video FT의 trade-off**: MSR-VTT+Vatex 추가로 in-domain은 +7.9/+10.3 향상하지만 out-of-domain YouCook2가 -0.6 저하 → **Model Soup (1:1)** 으로 YouCook2 +0.9까지 복원하면서 in-domain 우위 유지.
- **Synthetic data**: MTEB Code 평균 **+15.81**, CodeFeedbackMT만 따로 보면 +36.0.

## 관련 페이지 (Related Pages)

- [[database/guo-2025-rag-anything-all-in-one-rag|RAG-Anything]] — multimodal RAG의 retrieval/storage 쪽. Gemini Embedding 2는 그 파이프라인의 native multimodal embedder 후보로 자리매김 가능. RAG-Anything이 modality-aware hybrid retrieval(KG+vector)로 풀던 문제를 임베딩 측에서 native하게 흡수.
- [[database/guo-2025-lightrag-simple-and-fast|LightRAG]] — text-only graph RAG. text embedding을 본 모델의 텍스트 임베딩으로 교체했을 때 dual-level keyword retrieval 품질 향상 가능성 (특히 multilingual·code 도메인).
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval|Direct Corpus Interaction (DCI)]] — 임베딩 인덱스를 아예 없애고 agent가 grep·bash로 직접 검색하는 정반대 접근. 본 논문이 "더 좋은 임베딩"으로 retrieval을 푸는 동안 DCI는 "임베딩을 버리면 된다"고 주장. 두 페이지를 함께 읽으면 retrieval interface resolution 논쟁의 양극이 보임.
- [[llms/shumailov-2024-ununlearning-unlearning-is-not-sufficient|UnUnlearning]] — 본 페이지의 LLM-backbone embedding 관점과는 직접 관련은 적지만, MLLM을 downstream으로 재활용할 때의 governance/safety 논제로 보조 참조.

## 핵심 인용 (Notable Quotes)

> "Existing multimodal embedding models like CLIP, ALIGN, SigLIP 2, CoCa embed heterogenous modalities by using paired cross-modal data and training modality-specific encoders to encode them into a unified vector space. This late-fusion approach results in good unimodal and cross-modal capabilities but has a key limitation in handling mixed-modality inputs and lacks richness since it does not utilize interactions between modalities."

> "Native audio embeddings yield a striking +5.01 point enhancement (72.56 vs. 67.55). The dramatic jump in PassageCrossLang validates that the modality-agnostic latent space of Gemini Embedding 2 deeply aligns semantic features regardless of the source audio's spoken language, generalizing robustly beyond the strict phonetic bounds parameterized by an intermediate ASR transcriber."

> "Conversely, Gemini Embedding 2 does not exhibit these sharp, domain-dependent fluctuations. Instead, it offers a consistently reliable multimodal embedding space that generalizes predictably across a diverse array of highly specialized tasks."

## 향후 과제 (Future Work, 저자 제시)

1. **Ranking signal 흡수**: 검색 시스템의 ranking signal을 임베딩 학습 loop에 통합.
2. **End-to-end agentic RAG fine-tuning**: 다운스트림 RAG 파이프라인과 함께 임베딩 fine-tuning.
3. **Interleaved multimodal 평가 벤치마크 부재**: 커뮤니티에 평가 프레임워크 기여 요청.
