---
title: "RAG-Anything — All-in-One Multimodal RAG Framework (arXiv 2025-10)"
type: paper
year: 2025
category: database
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/2510.12323v1.pdf
raw_filename: "2510.12323v1.pdf"
source_collection: external
source: guo-2025-rag-anything-all-in-one-rag.md
authors: "Zirui Guo, Xubin Ren, Lingrui Xu, Jiahao Zhang, Chao Huang"
arxiv_id: "2510.12323"
url: "https://github.com/HKUDS/RAG-Anything"
tags: [multimodal-rag, rag, knowledge-graph, dual-graph, hybrid-retrieval, document-qa, vlm, paper]
---

## 요약 (Summary)

**RAG-Anything**(Guo et al., arXiv 2510.12323, HKUDS)은 LightRAG 후속작으로, 텍스트 외에 **이미지·테이블·수식**까지 1급 시민으로 다루는 통합 multimodal RAG이다. 핵심 두 축:

- **Dual-Graph Construction**: 비텍스트 atomic unit을 anchor 노드 `v_mm_j`로 두고 내부 엔티티를 `belongs_to`로 묶는 **cross-modal KG**와, LightRAG 방식의 **text-based KG**를 entity name 매칭으로 병합 → 통합 KG `G`.
- **Cross-Modal Hybrid Retrieval**: KG 구조 탐색(structural navigation)과 임베딩 유사도(semantic matching)를 병행한 뒤, 그래프 중요도 + 임베딩 유사도 + 질의의 modality 단서("figure"/"table"/…)를 결합한 **multi-signal fusion**으로 재랭킹. 시각 청크는 **dereferencing**으로 원본을 복원해 VLM에 함께 입력.

결과: DocBench(평균 66페이지) 63.4% > MMGraphRAG 61.0 / LightRAG 58.4 / GPT-4o-mini 51.2. MMLongBench 42.8% > 38.9 / 37.7 / 33.5. **100페이지 이상 장문**에서 격차가 13점+로 확대. Ablation은 그래프 구축이 게인의 대부분(+2.4pp), reranker는 marginal(+1.0pp).

## 주요 기여 (Key Contributions)

1. **All-in-One Atomic Unit 추상화** — 텍스트·이미지·표·수식을 modality-consistent atomic unit으로 정규화 (MinerU 파서 기반). 문서 포맷 비종속.
2. **Dual-Graph 전략** — 단일 거대 그래프 대신 두 상보 KG를 별도 구축 후 병합. 비텍스트 anchor를 보존해 modality-specific grounding이 깨지지 않는다.
3. **Hybrid Retrieval + Modality-aware Fusion** — structural + semantic + modality preference 신호를 결합. query에 "figure"가 있으면 visual modality에 가중.
4. **VLM Synthesis with Dereferencing** — 검색된 시각 청크의 텍스트 프록시는 검색용으로만 쓰고, 합성 단계에서 원본 시각을 복원해 VLM에 직접 conditioning.
5. **장문 강건성** — 페이지 길이가 길수록 baseline과의 격차가 벌어진다는 일관된 trend 입증.

## 방법론 및 아키텍처 (Methodology and Architecture)

```
PDF/slides/...
  ↓ MinerU parallel parser
[Atomic Units: text, image, table, equation]
  ↓ context-aware (window δ)
VLM → (d_chunk_j 검색용 description, e_entity_j 그래프용 summary)
  ↓
[Cross-Modal KG]                [Text-based KG (LightRAG/GraphRAG)]
   anchor v_mm_j                   NER + Relation Extraction
   inner entities —belongs_to→
  ↓ entity-name alignment + merge
[Unified KG  G = (V, E)]  +  [Embedding Table T = emb(V ∪ E ∪ chunks)]
                                         ↓
                          Query q → modality cues + e_q
                ┌─────────────────────────┴─────────────────────────┐
   Structural Navigation (hop-expansion)         Semantic Matching (cos sim top-k)
                C_stru(q)                                    C_seman(q)
                └─────────────── Multi-Signal Fusion ──────────────┘
                                         ↓
                       C*(q) + dereferenced V*(q) → VLM → response
```

- **인덱스**: `I = (G, T)`. 인덱싱 시 VLM 호출이 발생해 LightRAG보다 비싸지만, 검색은 LightRAG와 같이 dense+keyword를 섞는 lightweight 형태.
- **구현**: backbone GPT-4o-mini, embedding `text-embedding-3-large`(3072d), reranker `bge-reranker-v2-m3`. 그래프 토큰 제한 20K, 청크 12K.

## 결과 (Results)

### DocBench (Accuracy %)

| Method | Overall | Mm. (multimodal questions) | 100+ 페이지 |
|---|---|---|---|
| GPT-4o-mini | 51.2 | 43.8 | — |
| LightRAG | 58.4 | 59.7 | — |
| MMGraphRAG | 61.0 | 66.0 | 54.6 / 55.0 |
| **RAG-Anything** | **63.4** | **76.3** | **68.2 / 68.8** |

### MMLongBench (Accuracy %)

| Method | Overall |
|---|---|
| GPT-4o-mini | 33.5 |
| LightRAG | 38.9 |
| MMGraphRAG | 37.7 |
| **RAG-Anything** | **42.8** |

### Ablation (DocBench Overall)

- Chunk-only (그래프 제거): **60.0%** → 그래프 구축이 핵심 게인.
- w/o Reranker: **62.4%** → reranker 기여는 작음.
- Full: **63.4%**.

### Case Studies

- **Multi-panel figure (t-SNE)**: panel ↔ caption ↔ axis 그래프 덕분에 인접 패널 혼동 회피 (정답 DAE, 경쟁 모델 모두 VAE 오답).
- **Financial table (Novo Nordisk 2020 wages)**: row/column/unit 엣지로 정확한 셀 지목 (정답 26,778M DKK, baseline은 32,928M 또는 11,503M 오답).

## 한계 (Limitations)

- **Text-Centric Retrieval Bias** — 시각 정보를 요구하는 질의에도 텍스트를 우선 검색하는 경향(저자 Appendix A.5).
- **Rigid Spatial Processing** — 비표준 레이아웃(회전된 표 등)에 spatial reasoning 부족.
- **인덱싱 비용** — atomic unit별 VLM 호출 누적 → LightRAG 대비 indexing cost 증가 (논문은 명시적 latency 비교 미제공).
- **백본 의존** — 모든 실험이 GPT-4o-mini 단일 backbone 기준.

## 관련 페이지 (Related Pages)

- [[overviews/lightrag-family-graph-rag-overview|Graph-based RAG — LightRAG 계열 overview]] — 본 논문이 modality 축 확장 위치에 자리하는 LightRAG 계열 합성 페이지. LeanRAG(abstraction 축)와의 비대칭 비교, DocBench·MMLongBench vs UltraDomain의 head-to-head 부재 문제, 인덱싱 비용 open question은 overview에서 다룬다.
- [[database/guo-2025-lightrag-simple-and-fast|LightRAG]] — 동일 HKUDS lab의 직전 작업. RAG-Anything의 **text-based KG**는 LightRAG의 KV 인덱스 + dual-level keyword retrieval을 그대로 차용한다. RAG-Anything은 그 위에 cross-modal KG를 얹어 multimodal로 확장.
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation|LeanRAG]] — hierarchical KG + LCA retrieval. RAG-Anything이 modality 축으로 KG를 확장한다면, LeanRAG는 abstraction 축으로 확장하는 방향. retrieval에서 redundancy 처리 관점은 다르나 둘 다 LightRAG 계열의 dual-level 사고를 잇는다.
- [[database/9bow-2026-rag-anything-multimodal-rag-framework|RAG-Anything 한국어 소개글 (PyTorchKR)]] — 본 논문의 한국어 입문 자료. 5단계 파이프라인 정리, `pip install raganything` 코드 예제, LightRAG 통합 스니펫 포함. 단 본문은 GPT 모델 정리본이므로 정밀 인용은 이 페이지를 우선.
- [[database/dsba-2026-paper-review-graph-based-rag|Graph-based RAG 세미나 (LightRAG · LeanRAG)]] — LightRAG/LeanRAG 비판적 리뷰. RAG-Anything은 이 비교의 multimodal 확장축으로 위치 지을 수 있다.
