---
title: "Your Embedding Model is SMARTer Than You Think"
type: paper
year: 2026
category: database
raw_path: raw/papers/zhang-2026-your-embedding-model-is-smarter.pdf
raw_filename: "zhang-2026-your-embedding-model-is-smarter.pdf"
source_collection: external
source: zhang-2026-your-embedding-model-is-smarter.md
tags: [embedding, retrieval, multimodal, multi-vector, late-interaction, ColBERT, MaxSim, Qwen3-VL-Embedding, ColPali, jina-embeddings-v4, MMEB-V2, visual-document-retrieval, RAG]
authors: "Jianrui Zhang, Hyun Jung Lee, Sukanta Ganguly, Tae-Eui Kam, Donghyun Kim, Yong Jae Lee"
arxiv_id: "2605.24938"
---

## 요약 (Summary)

이 paper는 retrieval의 표현력 문제를 **새 모델 학습 문제가 아니라 "기존 모델이 이미 가진 표현을 더 잘 쓰는 문제"** 로 재프레이밍한다. 핵심 관찰은 단순하다 — single-vector retriever가 contrastive loss로 학습되더라도, `<eot>` pooled embedding은 *full token sequence의 함수* 이기 때문에 attention·residual을 통해 gradient가 모든 비-pooling hidden state까지 흐른다. Loss 자체가 cosine 기반이므로 이 *간접 supervision* 이 비-pooling token 표현을 token-level cosine retrieval에 친화적인 geometry로 자동 정렬한다. 즉 "single-vector 학습 모델 안에 이미 multi-vector 잠재력이 들어있다".

이 가설을 바탕으로 저자들은 **SMART (Single-to-Multi Adaptation for Retrieval Transformers)** 를 제안한다. 백본을 동결한 채 final-layer 비-pooling hidden state에 **MaxSim late-interaction** 을 적용하고 (`s_late = (1/|M_q|) Σ_i max_j h̃_{q,i}^⊤ h̃_{c,j}`), 원래 pooled cosine score와 단순 합산해 `s_hybrid = s_single + s_late` 로 점수를 낸다. 두 항이 모두 같은 final-layer cosine 공간의 normalized score이기 때문에 weight tuning이 필요 없다는 점이 흥미롭다.

결과는 세 layer로 나뉜다. **(1) Training-free plug-and-play**: MMEB-V2에서 VLM2Vec-V2.0 64.50→67.04 (+2.54), Qwen3-VL-Embedding-2B 74.87→75.77, SoTA Qwen3-VL-Embedding-8B 78.83→79.34까지 모두 일관되게 보강. **(2) Lightweight adapter** (백본 freeze, LayerNorm+Linear+ℓ2 normalize, 1h50m on 8×A6000): Qwen3-VL-Embedding-2B 79.27 → 81.25로, SoTA multi-vector model jina-embeddings-v4 (80.91)를 +0.34 추월. 4B 백본을 2B + 1h50m adapter로 이긴다. **(3) LoRA 변환**: from-scratch multi-vector 학습(12h) 대비 **single→multi 변환은 9.5h(−20.8%)에 성능 격차 −0.63**. 즉 "왜 처음부터 multi-vector를 학습하지 않는가?"라는 자연스러운 질문에 대해 paper가 직접 만든 답변.

가장 명료한 진단은 controlled toy benchmark다. 5×5 grid panel의 (code, marker color/shape) local binding을 permutation으로 흐려놓은 1000 query pairwise — 원래 single-vector score는 31.9% (chance 미만), late-interaction only는 56.8%. 같은 모델의 같은 hidden state인데 pooling 한 번에 정보가 24.9pp 날아간다는 직접 증거. 같은 세팅에서 jina-embeddings-v4 (50.9%), Colpali (48.7%)는 native multi-vector조차 near-chance인 점도 흥미롭다 — local binding이라는 retrieval 모드 자체가 어렵다는 의미.

## 주요 기여 (Key Contributions)

- **Pooled supervision의 gradient flow 관찰**: contrastive loss는 pooled `<eot>` 토큰에만 명시 supervision을 가하지만 transformer attention/residual을 통해 모든 비-pooling token이 gradient path 위에 있고, loss가 cosine 기반이므로 비-pooling hidden state도 cosine token-level retrieval에 친화적인 geometry로 *간접 정렬*된다. ← SMART의 모든 결과를 떠받치는 핵심 가설.
- **SMART 프레임워크**: 단일 식 `s_hybrid = s_single + s_late` (unit weight, hyperparameter free). Same final-layer cosine space라는 이유로 단순 합산이 작동한다는 점이 ColBERT/Colpali/MetaEmbed와의 핵심 차이.
- **세 가지 사용 모드를 한 paper에서 통합 검증**:
  - **Training-free plug-and-play**: MMEB-V2 전체에서 4개 backbone 일관 개선, SoTA Qwen3-VL-Embedding-8B 까지 들어 올림.
  - **Frozen-backbone adapter (1h50m)**: Qwen3-VL-Embedding-2B + adapter가 jina-embeddings-v4 (4B SoTA multi-vector)를 추월.
  - **LoRA conversion**: single→multi 변환이 from-scratch multi 대비 학습 시간 −20.8%, 성능 차 −0.63 — "왜 처음부터 multi-vector를 학습하지 않는가?" 에 대한 정답.
- **Controlled local-binding toy benchmark**: 1000 query pairwise. Pooled 31.9% vs late-only 56.8% vs jina-v4 50.9% vs Colpali 48.7%. Single-vector bottleneck을 깨끗하게 격리.
- **Layer-wise 분석**: late-interaction에 쓸 hidden state를 layer 20에서 뽑아도 layer 28과 거의 동일(80.16 vs 80.10). Final-layer는 권장이지 절대 요건이 아님.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 핵심 가설 — gradient가 비-pooling token까지 흐른다

Pooled state `h^L_{q,eot}` 는 full token sequence의 함수이므로 다음이 성립한다:

```
∂L/∂h^l_{q,i} = (∂z_q/∂h^l_{q,i})^⊤ ∂L/∂z_q
```

각 token이 *독립* retrieval vector로 supervise되는 건 아니지만, contrastive loss가 cosine similarity 기반이라는 점이 결정적이다. 이 간접 supervision은 비-pooling hidden states를 token-level cosine retrieval에 호환되는 geometry로 조직한다. 따라서 *학습된 single-vector retriever는 이미 multi-vector 잠재력을 보유* 한다고 주장한다.

### SMART 점수 함수

| 기호 | 의미 |
|---|---|
| M_q, M_c | padding과 pooling token을 뺀 valid non-pooling 토큰 인덱스 집합 |
| h̃^L_{x,i} = h^L_{x,i} / ||h^L_{x,i}||₂ | normalized final-layer hidden state |
| s_single(q,c) = (h^L_{q,eot})^⊤ h^L_{c,eot} | 원래 pooled cosine score |
| s_late(q,c) = (1/|M_q|) Σ_{i∈M_q} max_{j∈M_c} h̃^L_{q,i}^⊤ h̃^L_{c,j} | MaxSim late-interaction |
| **s_hybrid = s_single + s_late** | 단순 합 (unit weight) |

Hyperparameter가 없는 이유는 두 항이 *같은 final-layer cosine space의 normalized score* 이기 때문에 별도 rescaling이 불필요하다는 논리.

### 세 가지 사용 모드

1. **Inference-only**: 위 수식만 추론에 적용. 학습 0스텝. Indexing 측면에서는 candidate token 시퀀스를 모두 저장해야 함.
2. **Lightweight adapter** (백본 freeze, 1h50m on 8×A6000 48GB):
   ```
   r_i = normalize( Linear( LN(h^L_i) ) )    Linear: R^H → R^d
   ```
   학습은 `s_late` 만 사용. 추론은 `s_hybrid = s_single + s_late(r 적용)`.
3. **LoRA conversion** (LamRA-Ret recipe, Qwen3-VL-2B-Instruct, r=128 α=256, 8×A100 80GB, batch 512, Colpali training set, cosine LR max 1e-4 warmup 0.03):
   - LamRA-Single을 `s_single` 만으로 6.5h 학습 → LamRA-Single-Convert는 거기서 *추가 1 epoch만* `s_hybrid` 로 LoRA → 총 **9.5h**.
   - 비교군 LamRA-Multi: `s_late` 만 from scratch, **12h**.

### 백본·도구

- 학습 시점에 본 multimodal backbones: VLM2Vec-V2.0, GME-2B / GME-7B, **Qwen3-VL-Embedding-2B / -8B (SoTA, ref [10])**.
- 비교 multi-vector: ColBERT [8] (텍스트 late-interaction 시초), ColBERTv2 [19], **Colpali-1.3** [3] (시각 문서), **jina-embeddings-v4** [4] (4B universal multimodal), MetaEmbed [23] (learnable token, test-time scaling).
- 평가: **MMEB-V2 [15]** (Image RET 12, VDRv1 10, VDRv2 4, VR 6, OOD 4, Video RET 5).

## 결과 (Results)

### MMEB-V2 전체 평균 (training-free)

| Model | Avg | Δ (+SMART) |
|---|---|---|
| VLM2Vec-V2.0 | 64.50 → **67.04** | +2.54 |
| GME-2B | 69.00 → 70.00 | +1.00 |
| GME-7B | 72.26 → 72.56 | +0.30 |
| Qwen3-VL-Embed-2B | 74.87 → 75.77 | +0.90 |
| Qwen3-VL-Embed-8B (SoTA) | 78.83 → **79.34** | +0.51 |

→ SoTA 모델까지 일관되게 들어 올리는 것이 핵심. GME는 video에서 single-frame 한계로 video subset만 회색 처리.

### Visdoc subset — adapter post-training (Table 2)

| Model | Train / Eval SMART | Avg |
|---|---|---|
| Qwen3-VL-Embedding-2B | ✗ / ✗ | 79.27 |
| Qwen3-VL-Embedding-2B | ✗ / ✓ (inference only) | 80.10 |
| **Qwen3-VL-Embedding-2B** | **✓† adapter / ✓ (1h50m)** | **81.25** |
| Qwen3-VL-Embedding-8B | ✗ / ✗ | 82.33 |
| Qwen3-VL-Embedding-8B | ✗ / ✓ | 82.88 |
| **Qwen3-VL-Embedding-8B** | **✓† adapter / ✓** | **83.89** |
| Colpali-1.3 (3B) | multi only | 71.00 |
| jina-embeddings-v4 (4B SoTA multi-vector) | multi only | **80.91** |

→ **Qwen3-VL-Embedding-2B + adapter (실효 모델 크기 ≈ 2B + tiny)** 가 **jina-embeddings-v4 (4B)** 보다 visdoc 평균 +0.34 ahead. 학습 1h50m.

### LamRA-Ret family — single→multi 변환 vs from-scratch (Table 3)

| Model | Training Time | Visdoc Avg |
|---|---|---|
| LamRA-Single | 6.5h | 72.60 |
| LamRA-Single-SMART (inference) | 6.5h | 74.18 |
| **LamRA-Single-Convert** (LoRA, +1 epoch s_hybrid) | **9.5h** | **77.68** |
| LamRA-Multi (from scratch s_late) | 12h | 78.31 |

→ 변환이 from-scratch 대비 **시간 −20.8%, 성능 −0.63**.

### Controlled local-binding toy benchmark (1000 query)

| Score | Pairwise Acc |
|---|---|
| Original single-vector (Qwen3-VL-Embedding-2B) | 31.9% |
| Late-interaction only (same model hidden states) | **56.8%** |
| Hybrid (s_single + s_late) | 42.6% (adversarial diagnostic — global cue 자체가 misleading한 세팅) |
| jina-embeddings-v4 multi-vector | 50.9% |
| Colpali multi-vector | 48.7% |

→ 같은 모델의 같은 hidden state인데 pooling 한 번에 24.9pp가 사라진다는 직접 증거. Native multi-vector조차 near-chance라는 점도 흥미로움.

### Layer-wise (Table 4 요약)

Final layer (28층)을 쓰는 것이 단순·robust 하지만 layer 20도 거의 동일(80.16 vs 80.10). Late-region (20+)에 fine-grained retrieval 정보가 보존됨.

### 한계 요약

- Inference-only SMART는 *global task* (예: classification)에 도움이 안 됨 — local + global이 모두 필요한 dense retrieval 전용.
- LamRA-Ret 자체 학습은 compute 제약으로 visdoc subset만 평가 (image RET, video RET 변환은 미실험).
- Adversarial toy benchmark에서 hybrid가 late-only보다 낮아진 점 → "global이 정보를 거의 안 가진 세팅"에서 단순 합산이 정보를 약화시킬 수 있음을 시사. Domain-adaptive weight는 future work.
- Token-level vector를 candidate마다 모두 보관해야 하므로 storage·indexing 비용은 single-vector 대비 명백히 증가.

## 관련 페이지 (Related Pages)

- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] — DCI는 "embedding 자체를 쓰지 말자"는 *외부 인터페이스* 측 해답이고, SMART는 "embedding이 이미 충분히 표현하고 있는데 readout만 바꾸자"는 *내부 readout* 측 해답이다. 두 paper 모두 "single-vector top-k가 retrieval의 표현력을 깎고 있다"는 동일 진단에서 출발하지만 처방이 정반대로 갈리는 흥미로운 대비.
- [[database/guo-2025-lightrag-simple-and-fast]] — LightRAG의 dual-level (low/high) keyword retrieval이 "local + global을 따로 잡는다"는 점에서 SMART의 `s_late + s_single` 디자인과 모티브를 공유 (다만 LightRAG는 KG 위에서, SMART는 hidden state 위에서).
- [[database/vectifyai-pageindex]] — PageIndex는 reasoning-based agent가 tree search로 fine-grained localization을 얻는 또 다른 경로. SMART/DCI/PageIndex 셋 다 "fine-grained localization > broad coverage"를 공통 메시지로 가짐.
