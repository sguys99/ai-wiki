---
title: "RAG-Anything: All-in-One RAG Framework"
type: paper
year: 2025
category: database
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/2510.12323v1.pdf
raw_filename: "2510.12323v1.pdf"
source_collection: external
authors: "Zirui Guo, Xubin Ren, Lingrui Xu, Jiahao Zhang, Chao Huang"
arxiv_id: "2510.12323"
url: "https://github.com/HKUDS/RAG-Anything"
tags: [multimodal-rag, rag, knowledge-graph, dual-graph, hybrid-retrieval, document-qa, vlm, paper]
---

## 한 줄 요약 (One-line Summary)

**RAG-Anything**(Guo et al., 2025-10, HKUDS)은 텍스트뿐 아니라 **이미지·테이블·수식**까지 1급 시민으로 다루는 통합 multimodal RAG 프레임워크다. 핵심은 (1) **dual-graph construction**: 비텍스트 콘텐츠를 anchor로 묶는 **cross-modal KG**와 LightRAG/GraphRAG 스타일의 **text-based KG**를 엔티티 정렬로 병합하고, (2) **cross-modal hybrid retrieval**: 그래프 구조 탐색(structural navigation)과 임베딩 의미 매칭(semantic similarity)을 결합한 뒤 modality-aware fusion으로 재랭킹한다. DocBench(229문서, 평균 66페이지)와 MMLongBench(135문서)에서 LightRAG·MMGraphRAG·GPT-4o-mini 대비 우세(63.4% vs 58.4/61.0/51.2 on DocBench), 특히 **100페이지 이상 장문 문서**에서 격차가 13점 이상으로 벌어진다. Ablation은 그래프 구축이 게인의 대부분(60.0% → 63.4%)을 차지하며 reranker는 marginal(62.4% → 63.4%) 임을 보인다.

## 1. 자료 정보 (Document Information)

- **제목**: RAG-Anything: All-in-One RAG Framework
- **저자**: Zirui Guo, Xubin Ren, Lingrui Xu, Jiahao Zhang, Chao Huang* (The University of Hong Kong, HKUDS lab)
- **교신저자**: Chao Huang (chaohuang75@gmail.com)
- **arXiv**: 2510.12323v1 (2025-10-14)
- **PDF 경로**: `raw/papers/2510.12323v1.pdf` (18 pages, 본문 + Appendix)
- **오픈소스**: https://github.com/HKUDS/RAG-Anything
- **계보**: 동일 그룹(HKUDS)의 **LightRAG**(EMNLP 2025 Findings)을 multimodal로 확장한 후속작. text KG 구성은 LightRAG/GraphRAG의 파이프라인을 그대로 사용하고, 그 위에 cross-modal KG와 hybrid retrieval을 얹은 구조.

## 2. 주요 기여 (Key Contributions)

1. **Unified Multimodal Representation**: 텍스트·이미지·테이블·수식을 **atomic unit** (`xj`)으로 추상화하고, 각각 hierarchical text extraction / image caption & metadata / LaTeX 수식 인식 / 표 구조-내용 파싱 등 전용 파서를 거쳐 **structured content list**로 정규화한다. 문서 포맷(PDF, slides, 웹 등)에 비종속.
2. **Dual-Graph Construction**: 단일 통합 그래프 대신 두 개의 상보적 KG를 명시적으로 구축한 뒤 entity name 기반 alignment로 병합.
   - **Cross-Modal KG**: 비텍스트 단위 `c_j`마다 VLM이 ① 검색용 상세 description `d_chunk_j`와 ② 그래프 구축용 entity summary `e_entity_j`를 생성. 로컬 컨텍스트 윈도우 `C_j = {c_k : |k−j| ≤ δ}`로 context-aware. 각 비텍스트 단위는 `v_mm_j`라는 multimodal 엔티티 노드가 되고, 내부 엔티티들은 `belongs_to` 엣지로 anchor에 묶인다.
   - **Text-based KG**: LightRAG/GraphRAG와 동일하게 NER+RE로 엔티티·관계 추출.
3. **Cross-Modal Hybrid Retrieval**: 두 경로 병행.
   - **Structural Knowledge Navigation**: query에서 키워드·엔티티 매칭 → KG 위에서 hop-distance 기반 neighborhood expansion → 후보 `C_stru(q)`.
   - **Semantic Similarity Matching**: query 임베딩 `e_q`와 임베딩 테이블 `T`(엔티티·관계·청크 모두 포함) 간 코사인 유사도 → top-k 청크 `C_seman(q)`.
   - **Multi-Signal Fusion**: 그래프 topology 중요도 + 임베딩 유사도 + query에서 추론한 **modality preference**("figure", "chart", "table", "equation" 같은 어휘 단서)를 결합해 최종 `C*(q)` 결정.
4. **Retrieval-to-Synthesis with VLM**: 텍스트 컨텍스트 `P(q)`를 만들고, 시각 자료 청크는 **dereferencing**으로 원본 visual content `V*(q)`를 복원해 VLM에 함께 입력: `Response = VLM(q, P(q), V*(q))`. 텍스트 프록시는 검색 효율, 원본 시각은 reasoning 충실도를 담당.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 Multimodal Knowledge Unification

문서를 **Parallel Parser**가 atomic unit 시퀀스로 분해한다. 각 단위는 `(content, type, position)` 정보를 보존:

- Text → hierarchical text extraction (paragraph / list item)
- Image → caption + metadata extraction
- Equation → LaTeX 심볼릭 표현
- Table → header / cell / unit 구조 보존

이로써 다양한 파일 포맷이 modality-consistent atomic unit 시퀀스로 canonicalize된다.

### 3.2 Dual-Graph Construction

수식 표기로 정리하면,

- 비텍스트 단위 `c_j`별 graph 추출: `(V_j, E_j) = R(d_chunk_j)`
- 통합 노드/엣지: `Ṽ = {v_mm_j}_j ∪ ⋃_j V_j`, `Ẽ = ⋃_j E_j ∪ ⋃_j {(u —belongs_to→ v_mm_j) : u ∈ V_j}`
- text-based KG와 entity name 매칭으로 병합 → 최종 KG `G = (V, E)`
- 모든 엔티티·관계·청크에 대해 임베딩 테이블 `T = {emb(s) : s ∈ V ∪ E ∪ {c_j}_j}`
- 최종 인덱스 `I = (G, T)`

### 3.3 Cross-Modal Hybrid Retrieval

- **Modality-aware Query Encoding**: query `q`에서 modality 어휘 단서를 뽑아 modality preference 신호를 추출 + 통합 임베딩 `e_q` 생성 (indexing과 동일 encoder).
- **Structural Knowledge Navigation**: KG `G`에서 엔티티 매칭 → 지정 hop 거리 neighborhood expansion → `C_stru(q)`.
- **Semantic Similarity Matching**: `e_q` vs `T` 전체에 대해 dense vector search → `C_seman(q)`.
- **Candidate Pool Unification**: `C(q) = C_stru(q) ∪ C_seman(q)`, multi-signal fusion으로 `C*(q)`.

### 3.4 Synthesis

- (i) 검색 후보를 entity summary / relation description / chunk content별 구분자와 함께 직렬화해 **structured textual context** `P(q)` 구성.
- (ii) 시각 청크는 원본을 dereferencing해 `V*(q)`로 복원.
- VLM이 `(q, P(q), V*(q))`를 통합 conditioning해 응답 생성.

### 3.5 구현 디테일

- 백본 LLM/평가 judge: **GPT-4o-mini**
- 문서 파서: **MinerU**(Wang et al., 2024) — 텍스트·이미지·테이블·수식 분리
- 임베딩: **text-embedding-3-large** (3072-dim)
- 리랭커: **bge-reranker-v2-m3**
- Graph 토큰 제한: entity+relation 합산 20K tokens, chunk 12K tokens
- 출력은 1-sentence로 제약. 베이스라인 GPT-4o-mini는 문서를 50페이지/144 dpi 이미지로 컨캣해 입력.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 데이터셋

| Dataset | # Docs | Avg Pages | Avg Tokens | Doc Types | # Questions |
|---|---|---|---|---|---|
| DocBench (Zou et al., 2024) | 229 | 66 | 46,377 | 5 (Academia/Finance/Government/Laws/News) | 1,102 |
| MMLongBench (Ma et al., 2024) | 135 | 47.5 | 21,214 | 7 | 1,082 |

### 4.2 DocBench (Accuracy %, overall best **bold**)

| Method | Aca. | Fin. | Gov. | Law | News | Txt. | Mm. | Una. | **Overall** |
|---|---|---|---|---|---|---|---|---|---|
| GPT-4o-mini | 40.3 | 46.9 | 60.3 | 59.2 | 61.0 | 61.0 | 43.8 | 49.6 | 51.2 |
| LightRAG | 53.8 | 56.2 | 59.5 | 61.8 | 65.7 | **85.0** | 59.7 | 46.8 | 58.4 |
| MMGraphRAG | **64.3** | 52.8 | **64.9** | 40.0 | 61.5 | 67.6 | 66.0 | **60.5** | 61.0 |
| **RAG-Anything** | 61.4 | **67.0** | 61.5 | 60.2 | **66.3** | **85.0** | **76.3** | 46.0 | **63.4** |

### 4.3 MMLongBench (Accuracy %)

| Method | Res. | Tut. | Acad. | Guid. | Broch. | Admin. | Fin. | **Overall** |
|---|---|---|---|---|---|---|---|---|
| GPT-4o-mini | 35.5 | **44.0** | 24.6 | 33.1 | 29.5 | 46.8 | 31.1 | 33.5 |
| LightRAG | 40.8 | 34.1 | 36.2 | 39.4 | **41.0** | 44.4 | 38.3 | 38.9 |
| MMGraphRAG | 40.8 | 36.5 | 35.7 | 35.8 | 28.2 | **46.9** | 38.5 | 37.7 |
| **RAG-Anything** | **46.6** | 43.5 | **38.7** | **43.9** | 34.0 | 45.7 | **43.6** | **42.8** |

### 4.4 장문 문서 일반화

- DocBench 101–200 페이지: **68.2% vs 54.6%** (MMGraphRAG), 200+ 페이지: **68.8% vs 55.0%** → 13점+ 격차.
- MMLongBench: 11–50 pages +3.4, 51–100 pages +9.3, 101–200 pages +7.9 — 길이 증가에 따라 격차 확대.
- 해석: dual-graph가 페이지 간 엔티티 정렬을 제공하고, structural+semantic hybrid가 분산된 multimodal evidence를 모은다는 가설을 지지.

### 4.5 Ablation (DocBench Overall)

| Variant | Aca. | Fin. | Gov. | Law | News | Txt. | Mm. | Una. | Overall |
|---|---|---|---|---|---|---|---|---|---|
| Chunk-only (no graph) | 55.8 | 61.5 | 60.1 | 60.7 | 64.0 | 81.6 | 66.2 | 43.5 | **60.0** |
| w/o Reranker | 60.9 | 63.5 | 58.8 | 60.2 | 68.6 | 81.7 | 74.7 | 45.4 | **62.4** |
| Full RAG-Anything | 61.4 | 67.0 | 61.5 | 60.2 | 66.3 | 85.0 | 76.3 | 46.0 | **63.4** |

→ 그래프 구축이 핵심 게인(+2.4pp), reranker는 marginal(+1.0pp).

### 4.6 Case Studies

- **Case 1 — Multi-panel Figure (t-SNE)**: 질의가 "style space에서 어떤 모델이 더 선명하게 분리되는가"인데, 정답은 DAE이지만 경쟁 모델은 모두 VAE라고 오답. RAG-Anything은 panel ↔ caption ↔ axis 그래프를 만들어 style-space panel에 집중, content-space panel과 헷갈리지 않음.
- **Case 2 — Financial Table (Novo Nordisk wages 2020)**: 정답 DKK 26,778M인데 GPT-4o-mini(32,928M), MMGraphRAG/LightRAG(11,503M) 오답. RAG-Anything은 row "Wages and salaries" × column "2020" 셀 교차점을 `row-of`, `column-of`, `header-applies-to`, `unit-of` 엣지로 정확 지목.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자들이 Appendix A.5에서 정리한 **failure mode** 두 가지:

1. **Text-Centric Retrieval Bias**: 질의가 명백히 시각 정보를 요구해도 시스템이 텍스트 소스를 우선 검색하는 경향. cross-modal alignment가 여전히 비대칭.
2. **Rigid Spatial Processing**: 비표준 레이아웃(예: 회전된 표, 비정형 다단)에 적응적 spatial reasoning이 부족.

향후 방향: adaptive spatial reasoning, layout-aware parsing의 정교화.

기타 관찰 가능한 한계:
- **VLM/LLM 비용**: dual-graph 구축에 atomic unit별 VLM 호출이 발생 → 인덱싱 비용·시간이 LightRAG 대비 증가.
- **벤치마크 폭**: DocBench/MMLongBench 모두 정답·QA pair 기반, 자유 응답 평가(RAGAS 등)는 제외.
- **백본 의존**: 모든 실험이 GPT-4o-mini로 통일 — open-source LLM/VLM에서의 재현성은 미검증.

## 6. 관련 연구 (Related Work)

- **Graph-Enhanced RAG**: GraphRAG (Edge et al., 2024), LightRAG (Guo et al., 2024) — text-only KG. RAG-Anything은 이를 multimodal로 확장.
- **Hierarchical/Aggregation RAG**: RAPTOR (Sarthi et al., 2024), ArchRAG (Wang et al., 2025) — 다층 요약. 본 논문의 dual-graph는 modality 축에서 작동.
- **GNN/Memory-augmented RAG**: GNN-RAG (Mavromatis & Karypis, 2024), HippoRAG (Jimenez Gutierrez et al., 2024).
- **Multimodal RAG 사전 연구**:
  - **VideoRAG** (Ren et al., 2025) — 비디오용 dual-channel.
  - **MM-VID** (Lin et al., 2023) — 비디오 → 텍스트 변환(시각 정보 손실).
  - **VisRAG** (Yu et al., 2025) — 문서를 이미지로 보존하나 granular relation 누락.
  - **MMGraphRAG** (Wan & Yu, 2025) — scene graph + 텍스트, 다만 테이블/수식을 plain text 취급 → 구조적 맹점.
- **Survey/Foundation**: Abootorabi et al. (2025) multimodal RAG 서베이; Zhang et al. (2025) graph RAG 서베이.

## 7. 용어집 (Glossary)

- **Atomic Unit `x_j`**: 문서를 분해한 modality-consistent 최소 단위 (텍스트 paragraph / 이미지 / 표 / 수식 등).
- **Cross-Modal KG**: 비텍스트 단위를 anchor 노드 `v_mm_j`로 두고 그 내부 엔티티를 `belongs_to`로 연결한 그래프.
- **Text-based KG**: LightRAG/GraphRAG 스타일의 텍스트 NER+RE 그래프.
- **Dual-Graph Construction**: 위 두 KG를 별도로 구축한 뒤 entity name 매칭으로 병합하는 전략.
- **Modality-Aware Query Encoding**: 질의의 어휘 단서("figure", "table" 등)로 modality preference를 추출하는 query 분석.
- **Structural Knowledge Navigation**: KG의 명시적 엣지를 따라 multi-hop으로 후보를 모으는 retrieval.
- **Semantic Similarity Matching**: 임베딩 공간에서 dense vector 유사도 기반 retrieval.
- **Multi-Signal Fusion**: 구조 중요도 + 임베딩 유사도 + modality preference를 결합한 재랭킹.
- **Dereferencing**: 검색된 multimodal 청크의 텍스트 프록시를 원본 시각 자료로 복원해 VLM에 직접 입력하는 과정.
- **Belongs_to edge**: 비텍스트 anchor `v_mm_j`와 그 내부 엔티티를 잇는 modality-grounding 엣지.
- **DocBench / MMLongBench**: 각각 멀티모달 long-document QA 벤치마크. 본 논문 평가의 주축.
- **MinerU**: 문서에서 텍스트·이미지·테이블·수식을 분리 추출하는 오픈소스 파서.
