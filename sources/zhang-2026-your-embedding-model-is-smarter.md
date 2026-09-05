---
title: "Your Embedding Model is SMARTer Than You Think"
type: paper
year: 2026
category: database
raw_path: raw/papers/zhang-2026-your-embedding-model-is-smarter.pdf
raw_filename: "zhang-2026-your-embedding-model-is-smarter.pdf"
source_collection: external
tags: [embedding, retrieval, multimodal, multi-vector, late-interaction, ColBERT, MaxSim, Qwen3-VL-Embedding, ColPali, jina-embeddings-v4, MMEB-V2, visual-document-retrieval, RAG]
authors: "Jianrui Zhang, Hyun Jung Lee, Sukanta Ganguly, Tae-Eui Kam, Donghyun Kim, Yong Jae Lee"
arxiv_id: "2605.24938"
---

## 한 줄 요약 (One-line Summary)

기존 single-vector embedding 모델의 **non-pooling hidden states** 가 contrastive loss의 gradient flow를 통해 *이미 cosine retrieval 친화적인 geometry* 로 정렬되어 있다는 관찰에서 출발, MaxSim late-interaction을 추론 시점에 plug-and-play로 얹는 **SMART (Single-to-Multi Adaptation for Retrieval Transformers)** 를 제안 — 학습 없이 MMEB-V2 6개 카테고리에서 일관된 개선(Qwen3-VL-Embedding-8B 78.83 → 79.34)을 보이고, lightweight adapter 1h50m 학습만으로 Qwen3-VL-Embed-2B가 SoTA multi-vector embedder인 jina-embeddings-v4를 능가, LoRA 변환은 from-scratch multi-vector 대비 학습 시간 20%↓에 성능 0.63점 차이로 따라잡는 paper.

## 1. 자료 정보 (Document Information)

- **Title**: Your Embedding Model is SMARTer Than You Think
- **Authors**: Jianrui Zhang (UW-Madison, 공동 1저자), Hyun Jung Lee (Korea University, 공동 1저자), Sukanta Ganguly (NetApp), Tae-Eui Kam (Korea University), Donghyun Kim (Korea University, 공동 교신), Yong Jae Lee (UW-Madison, 공동 교신)
- **Affiliations**: UW-Madison, Korea University, NetApp
- **Year**: 2026 (arXiv preprint, 2026-05-24)
- **arXiv ID**: 2605.24938v1 (cs.IR)
- **Code/Repo**: https://github.com/HanSolo9682/SMART
- **Type**: Preprint (15 pages, 본문 + Appendix · References)
- **Funding**: NSF IIS2404180, IITP (MSIT) 2022-0-00871, RS-2025-2543949, Korea University AI Graduate School Program, NRF (RS-2025-25302986) 등

## 2. 주요 기여 (Key Contributions)

1. **Pooled 학습이 non-pooling hidden states를 retrieval geometry로 정렬한다는 관찰**. Contrastive InfoNCE loss는 표면적으로는 pooled `<eot>` 토큰에만 supervision을 가하지만, transformer의 attention·residual pathway를 통해 gradient(`∂L/∂hl_{q,i} = (∂z_q/∂hl_{q,i})^⊤ ∂L/∂z_q`)가 모든 비-pooling 토큰까지 흐른다. Cosine similarity 기반 objective이기 때문에 이 *간접 supervision* 은 hidden state들을 token-level cosine retrieval에 친화적인 기하 구조로 조직한다 — 즉 single-vector 학습 모델은 *이미* multi-vector 잠재력을 보유.

2. **SMART (Single-to-Multi Adaptation for Retrieval Transformers) 제안**. 백본을 동결한 채 **MaxSim late-interaction** 을 final-layer non-pooling hidden states에 적용 (`s_late(q,c) = (1/|M_q|) Σ_{i∈M_q} max_{j∈M_c} h̃^L_{q,i}^⊤ h̃^L_{c,j}`), 원래 pooled cosine score와 **단순 합산** 한 hybrid scoring `s_hybrid = s_single + s_late`. Unit weight·hyperparameter 없음 — 두 항이 모두 같은 final-layer cosine 공간의 normalized score이기 때문에 단순 합이 효과적임.

3. **Training-free Plug-and-Play 결과 (MMEB-V2 전체)**. 학습 0스텝으로 4개 backbone에서 일관 개선:
   - VLM2Vec-V2.0: 64.50 → 67.04 (+2.54)
   - GME-2B: 69.00 → 70.00 (+1.00), GME-7B: 72.26 → 72.56 (+0.30)
   - Qwen3-VL-Embedding-2B: 74.87 → 75.77 (+0.90)
   - Qwen3-VL-Embedding-8B (SoTA): 78.83 → 79.34 (+0.51)
   
   세부 도메인별로도 Image RET, VDRv1, VDRv2, VR, OOD, Video RET 전부 보강(GME는 single-frame 한계로 video만 회색 처리).

4. **Lightweight adapter post-training (1h50m)으로 SoTA multi-vector 추월**. Backbone은 동결하고 final-layer hidden state 위에 LayerNorm + Linear projection + ℓ2-normalize의 token-wise adapter만 학습(`r_i = normalize(Linear(LN(h^L_i)))`, Colpali training set, batch 512, 8×A6000 48GB). Qwen3-VL-Embedding-2B는 visdoc avg 79.27 → 81.25 (+1.98), **jina-embeddings-v4 (80.91) 를 +0.34 추월**. 8B는 82.33 → 83.89 (+1.56).

5. **LoRA로 single→multi 변환이 from-scratch multi-vector보다 20% 빠르고 성능 거의 동등**. Qwen3-VL-2B-Instruct에서 LamRA-Ret 레시피로 학습한 자체 세트(Table 3):
   - LamRA-Single (s_single만, 6.5h): 72.60
   - LamRA-Single-SMART (training-free inference): 74.18 (+1.58)
   - **LamRA-Single-Convert** (LamRA-Single에서 +1 epoch 만 LoRA `s_hybrid` 추가 학습, **9.5h 총 비용**): 77.68
   - LamRA-Multi (s_late만 from scratch, 12h): 78.31
   
   → 변환은 from-scratch 대비 학습 시간 **20%↓**, 성능 격차 **0.63점**.

6. **Controlled toy benchmark로 "local-binding bottleneck" 실증**. 5×5 grid의 chart panel, 각 panel에 (code, marker color/shape) local binding이 있는 positive doc dA와 모든 layout·codes·colors·shapes는 동일하되 code 할당만 무고정점 permutation으로 섞은 hard negative dB. 1000 query pairwise:
   - 원래 single-vector score: **31.9%** (chance 미만, single-vector bottleneck 실증)
   - Late-interaction only: **56.8%**
   - Hybrid (s_single + s_late): 42.6% (이 adversarial 세팅에서는 global cue 자체가 misleading이라 단순 합산이 하락하는데, paper는 이를 일반 retrieval과 분리되는 *진단용 stress test* 라고 명시)
   - jina-embeddings-v4 multi-vector: 50.9% / Colpali: 48.7% (둘 다 native multi-vector조차 near-chance)

7. **Layer-wise 분석 (Table 4)**. Hidden state를 어느 층에서 뽑아 late-interaction에 쓸지 비교 — last layer 28층이 최적이지만 layer 20도 거의 동급(80.16 vs 80.10). 즉 final-layer가 절대 요건은 아니며 "late layers (20+)" 전반이 fine-grained retrieval 정보를 보존.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 Preliminaries — Single-vector objective와 bottleneck

Multimodal embedding 모델은 토큰 단위(텍스트·비주얼·special token) 시퀀스를 처리하지만, contrastive 학습은 보통 단 하나의 pooling 표현(주로 `<eot>` final-layer hidden state)만 supervise한다. InfoNCE loss:

```
L = -log [ exp(s_single(q, c+)/τ) / (exp(s_single(q,c+)/τ) + Σ_{c-} exp(s_single(q,c-)/τ)) ]
s_single(q, c) = (h^L_{q,eot})^⊤ h^L_{c,eot}   (둘 다 normalize)
```

이 단일 readout 때문에 *single-vector bottleneck* 발생: localized evidence(특정 부분 텍스트, 시각 속성, regional binding)가 pooling으로 압축되면서 사라지고, 높은 single-vector similarity가 *aggregate semantic relatedness* 는 잘 잡아도 *local binding* 은 놓침. 이론적으로도 distinct subset ranking 수는 embedding dimensionality에 의해 strictly bounded.

### 3.2 SMART의 핵심 가설 — pooled supervision이 non-pooling hidden states에 도달함

표면적으로 contrastive loss는 pooled embedding만 supervise하는 듯 보이지만, pooled state는 *full token sequence의 함수* 다. Transformer attention/residual을 통해 `h^L_{q,eot}` 가 모든 non-pooling 토큰에서 정보를 모으기 때문에, gradient 식

```
∂L/∂h^l_{q,i} = (∂z_q/∂h^l_{q,i})^⊤ ∂L/∂z_q
```

는 모든 i에 대해 non-zero. 각 token이 *독립적인 retrieval vector* 로 supervise되는 건 아니지만, contrastive objective 자체가 cosine similarity로 정의되어 있기 때문에 이 *간접 supervision* 은 hidden states를 cosine-token-retrieval에 친화적인 geometry로 조직한다. ← 이 관찰이 SMART의 출발점.

### 3.3 Direct Late-Interaction over Hidden States

- 백본·pooled readout은 그대로 두고 추가 readout만 얹는다.
- M_q, M_c = padding과 pooling token을 제외한 *valid non-pooling* index 집합.
- Normalized final-layer hidden state: `h̃^L_{x,i} = h^L_{x,i} / ||h^L_{x,i}||_2`.
- **MaxSim late-interaction** (ColBERT 따라):

```
s_late(q, c) = (1/|M_q|) Σ_{i∈M_q} max_{j∈M_c} h̃^L_{q,i}^⊤ h̃^L_{c,j}
```

- **Hybrid scoring** (unit weight):

```
s_hybrid(q, c) = s_single(q, c) + s_late(q, c)
```

두 점수 모두 같은 final-layer cosine space의 normalized score이기 때문에 weight tuning이나 rescaling이 필요 없음. Final layer를 쓰는 이유는 pooled embedding이 그 층에서 읽히기 때문에 single-vector scoring 공간과 가장 직접적으로 호환되기 때문(earlier layer가 부족해서가 아니라 호환성 문제, Section 4.6에서 실증).

### 3.4 Lightweight Adapter Post-Training

Hidden state 위에 token-wise adapter만 학습 (백본 freeze):

```
r_i = normalize( Linear( LN(h^L_i) ) )    Linear: R^H → R^d
```

학습은 `s_late` 만 사용 (pooled score는 unchanged). Colpali training set, batch 512, **Qwen3-VL-Embedding-2B의 경우 8×A6000 48GB에서 1h50m**. 추론 시 `s_hybrid = s_single + s_late(r 적용)`.

### 3.5 Full Conversion via LoRA + `s_hybrid` (from-scratch와의 비교용)

- Backbone: Qwen3-VL-2B-Instruct, LamRA-Ret recipe.
- LoRA r=128, α=256, cosine LR schedule (max 1e-4, warmup 0.03), batch 512, 8×A100 80GB, Colpali training set 4 epochs.
- LamRA-Single (s_single만, 6.5h) → +1 epoch만 `s_hybrid` 로 LoRA → LamRA-Single-Convert (총 9.5h).
- 비교군 LamRA-Multi: s_late만 from scratch, 12h.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### Table 1 — MMEB-V2 전체 (Image RET R@1 / Visdoc NDCG@5 / Video R@1)

| Model | Image RET | VDRv1 | VDRv2 | VR | OOD | Video RET | Average |
|---|---|---|---|---|---|---|---|
| VLM2Vec-V2.0 | 69.50 | 75.34 | 47.28 | 79.43 | 62.04 | 28.66 | 64.50 |
| **+ SMART** | **69.95** | **80.23** | **51.08** | **82.76** | **64.00** | **30.03** | **67.04 (+2.54)** |
| GME-2B | 70.13 | 87.61 | 53.76 | 82.49 | 66.93 | 26.73 | 69.00 |
| + SMART | 71.05 | 87.97 | 57.23 | 84.18 | 67.82 | 26.50 | 70.00 (+1.00) |
| GME-7B | 73.09 | 90.01 | 60.43 | 86.20 | 69.22 | 29.92 | 72.26 |
| + SMART | 73.57 | 90.12 | 61.04 | 87.05 | 69.43 | 29.38 | 72.56 (+0.30) |
| Qwen3-VL-Embed-2B | 74.91 | 84.46 | 65.38 | 86.19 | 69.37 | 54.04 | 74.87 |
| + SMART | 75.33 | 85.52 | 66.61 | 86.87 | 69.90 | 56.05 | 75.77 (+0.90) |
| Qwen3-VL-Embed-8B (SoTA) | 80.09 | 87.29 | 69.35 | 88.78 | 73.27 | 59.01 | 78.83 |
| + SMART | 80.15 | 87.92 | 70.57 | 89.12 | 73.21 | 60.43 | **79.34 (+0.51)** |

### Table 2 — Visdoc subset, adapter post-training

| Model | Size | SMART (Train / Eval) | VDRv1 | VDRv2 | VR | OOD | Avg |
|---|---|---|---|---|---|---|---|
| Qwen3-VL-Embedding | 2B | ✗s / ✗s | 84.60 | 65.33 | 86.34 | 69.27 | 79.27 |
| | 2B | ✗s / ✓ | 85.52 | 66.61 | 86.87 | 69.90 | 80.10 |
| | 2B | ✓† (adapter) / ✓ | 87.09 | 67.08 | 87.99 | 70.73 | **81.25** |
| | 8B | ✗s / ✗s | 87.29 | 69.35 | 88.78 | 73.27 | 82.33 |
| | 8B | ✗s / ✓ | 87.92 | 70.57 | 89.12 | 73.21 | 82.88 |
| | 8B | ✓† (adapter) / ✓ | 89.42 | 71.25 | 89.67 | 73.99 | **83.89** |
| Colpali-1.3 | 3B | multi only | 83.60 | 52.00 | 81.10 | 43.10 | 71.00 |
| jina-embeddings-v4 | 4B | multi only | 89.94 | 57.36 | 88.74 | 70.18 | 80.91 |

→ Qwen3-VL-Embedding-2B + adapter (4B 백본보다 작음) = **81.25 > 80.91 (jina-embeddings-v4 SoTA multi-vector)**, 학습 1h50m.

### Table 3 — LamRA-Ret family (Qwen3-VL-2B-Instruct에서 자체 학습)

| Model | Training Time | SMART (Tr / Ev) | VDRv1 | VDRv2 | VR | OOD | Avg |
|---|---|---|---|---|---|---|---|
| LamRA-Single | 6.5h | ✗s / ✗s | 81.58 | 50.72 | 78.41 | 63.50 | 72.60 |
| LamRA-Single-SMART | 6.5h | ✗s / ✓ | 83.02 | 52.25 | 80.52 | 64.50 | 74.18 |
| LamRA-Single-Convert | **9.5h** | ✓† LoRA / ✓ | 86.93 | 54.60 | 84.39 | 67.61 | **77.68** |
| LamRA-Multi | 12h | ✗m / ✗m | 87.93 | 54.29 | 85.24 | 67.91 | 78.31 |

→ Single→Multi 변환은 from-scratch multi 대비 **시간 −20.8% (12h→9.5h)**, 성능 차이 **−0.63**.

### Table 4 — Layer-wise 분석 (Qwen3-VL-Embedding-2B 28 layers)

| Layer X | X-th layer pooling (avg) | Last layer pooling + X-th late (avg) |
|---|---|---|
| 4 | 48.59 | 79.42 |
| 8 | 62.28 | 79.83 |
| 12 | 64.77 | 79.67 |
| 16 | 60.71 | 79.70 |
| **20** | 72.34 | **80.16** |
| 24 | 76.29 | 80.04 |
| 28 (final) | 80.10 | 80.10 |

→ Final layer가 최적이지만 layer 20 ~ 28 사이 "late region"이면 충분. Pooled은 final-layer에서 그대로 유지.

### Controlled toy benchmark (1000 query)

| Score | Pairwise Acc |
|---|---|
| Original single-vector | 31.9% |
| Late-interaction only | 56.8% |
| Hybrid (s_single + s_late) | 42.6% (adversarial 세팅, paper는 diagnostic stress test로 분리 해석) |
| jina-embeddings-v4 multi-vector | 50.9% |
| Colpali multi-vector | 48.7% |

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **Dense retrieval에 한정**. SMART는 inference-only 도구로 *global task* (예: classification)에는 도움이 안 된다고 명시. Local evidence와 global summary가 모두 필요한 dense retrieval에서만 효과.
- **LamRA-Ret 학습은 visdoc subset에 국한**. Compute 제약으로 자체 학습 모델은 Visdoc만 평가. Image RET, Video RET 등 다른 도메인에서의 from-scratch vs convert 비교는 미실험.
- **Hyperparameter free라는 단순 합산 가정의 일반성**. Hybrid score `s_single + s_late` 가 동일 cosine space라는 *이유로* unit weight가 작동한다고 주장하지만, 백본이 다른 normalization을 쓰거나 readout이 다른 층에서 나오는 경우의 robustness는 명시적 ablation 부족.
- **Adversarial 세팅에서의 hybrid 하락**. Toy benchmark에서 hybrid가 late-only보다 낮은 42.6%로 떨어진 점은 "global이 informative하지 않을 때" hybrid의 단순 합산이 신호를 약화시킬 수 있음을 시사. Domain detection이나 weight adaptation은 future work.
- **MaxSim의 메모리·indexing 비용**. Inference-only라도 token-level vector를 모두 보관해야 하므로 candidate 저장/검색 비용은 single-vector 대비 증가 (token 수 × dim). 대규모 corpus 운영 시 disk·RAM·ANN 인덱스 설계가 별도 과제.

## 6. 관련 연구 (Related Work)

- **Single-vector multimodal embedders**: CLIP [17], BLIP [9], SigLIP [25], UniIR [21], VLM2Vec [7], E5-V [6], GME [27], **Qwen3-VL-Embedding [10]** (SoTA). SMART는 이 모델들의 *남는 compute* (비-pooling hidden state)를 재활용한다는 주장.
- **Multi-vector / late-interaction**:
  - **ColBERT [8] (Khattab & Zaharia, 2020)** — 텍스트에서 late-interaction의 시초. MaxSim 연산자 도입.
  - **ColBERTv2 [19] (Santhanam et al., 2022)** — 효율화.
  - **Colpali [3] (Faysse et al., ICLR 2025)** — 시각 문서에 late-interaction 적용.
  - **jina-embeddings-v4 [4] (Günther et al., 2025)** — multimodal universal embeddings.
  - **MetaEmbed [23] (Xiao et al., 2026)** — learnable token으로 test-time scaling.
  
  SMART는 이들과 달리 **full-scale task-specific finetuning 없이** late-interaction을 *재활용* 한다는 점에서 차별.
- **Theoretical limits**:
  - **Weller et al., 2026 [22]** — embedding-based retrieval의 이론적 한계 (distinct subset ranking 수 ≤ embedding dim).
  - Luan et al. (TACL 2021) [14], Reimers & Gurevych (ACL-IJCNLP 2021) [18] — sparse/dense/attentional representation 비교 및 dense low-dim의 한계.
- **Benchmarks**: M-BEIR [21], MMEB [7], **MMEB-V2 [15]** (이 paper의 메인 평가), ViDoRe [3], VisRAG [24], Jina-VDR [4], UMRB [27].
- **이 paper와 같은 first author의 후속작 / 동시기 작업**: Zhang et al., "Reasoning-augmented representations for multimodal retrieval" [26] (arXiv 2602.07125, 2026).

## 7. 용어집 (Glossary)

- **SMART (Single-to-Multi Adaptation for Retrieval Transformers)**: 이 paper가 제안하는 framework 이름. Single-vector retriever를 추가 학습 없이 (또는 lightweight 학습으로) multi-vector retriever로 변환.
- **Single-vector retrieval**: 시퀀스 전체를 하나의 pooled embedding(보통 `<eot>` 토큰)으로 압축해 cosine similarity nearest-neighbor search로 검색. 효율적이지만 *single-vector bottleneck* 존재.
- **Multi-vector retrieval / Late-interaction**: 토큰/패치 단위 벡터 시퀀스를 모두 유지하고, 검색 시 token-token interaction(예: MaxSim)으로 점수 계산. 표현력 ↑, 비용 ↑.
- **MaxSim / Late-interaction (ColBERT)**: 각 query token에 대해 candidate의 모든 token과의 cosine 중 최댓값을 취해 평균. `s_late(q,c) = (1/|M_q|) Σ_i max_j h̃_{q,i}·h̃_{c,j}`.
- **Single-vector bottleneck**: Pooled 표현 하나에 retrieval 결정 전체가 의존하므로 local evidence(특정 텍스트·시각 디테일·regional binding)가 압축되어 사라지는 현상.
- **Hybrid scoring (s_hybrid)**: `s_single(global) + s_late(local)` 의 단순 합. 같은 final-layer cosine 공간에서 normalize된 두 점수라서 unit weight로 작동.
- **InfoNCE loss**: Contrastive 학습의 표준 loss [van den Oord et al., 2018, ref 16].
- **Pooling token / `<eot>` token**: End-of-text 토큰. Single-vector retriever들이 시퀀스를 압축하는 readout 토큰.
- **MMEB-V2**: Massive Multimodal Embedding Benchmark V2 [15]. Image RET (12 tasks), VDRv1 (10), VDRv2 (4), VR (6), OOD (4), Video RET (5) — Apache-2.0.
- **Visdoc (Visual Document Retrieval)**: PDF·차트·legend 같은 시각 문서에서 fine-grained text↔visual 정렬이 필요한 retrieval. VDRv1, VDRv2, VR, OOD가 모두 visdoc subset에 속함.
- **LoRA [Hu et al., 2021]**: Low-rank adapter. SMART의 LoRA finetuning에서 r=128, α=256 사용.
- **LamRA-Ret [Liu et al., 2024]**: SMART가 자체 학습 비교에 사용한 backbone (Qwen3-VL-2B-Instruct에서 출발) 학습 recipe.
- **Local-evidence toy benchmark**: 5×5 grid panel의 code-marker binding을 permutation으로 흐려놓은 1000 query pairwise 데이터. Global content는 같고 local binding만 다르게 만들어 single-vector bottleneck을 격리.
- **Layer-wise analysis**: Late-interaction에 사용할 hidden state를 어느 layer에서 뽑는지에 따른 성능 변화. Layer 20+ 가 충분.
