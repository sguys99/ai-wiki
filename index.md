# AI Wiki Index

이 파일은 `wiki/` 안의 모든 페이지를 카탈로그화한 색인이다. 자료가 추가될 때마다 해당 카테고리 섹션에 한 줄씩 추가한다.

> **참조 규칙**: 모든 응답은 `sources/`와 `wiki/`에 실재하는 자료만 인용한다. 자세한 운영 규칙은 [`CLAUDE.md`](./CLAUDE.md)의 **The Four Rules**를 참고한다.

**카탈로그 한 줄 형식 (Entry format):**

```
- [[category/stem|표시 이름]] — 한 줄 설명 (year, type)
```

예: `- [[llms/vaswani-2017-attention-is-all-you-need|Attention Is All You Need]] — Transformer 아키텍처 (2017, paper)`

---

## Database (database)

Vector DB, RAG 인프라, embedding store (pgvector, Qdrant, Weaviate 등).

- [[database/guo-2025-lightrag-simple-and-fast|LightRAG]] — KG entity·relation을 key-value로 직렬화하고 dual-level keyword (low·high) retrieval로 GraphRAG 대비 토큰·API 호출 대폭 절감 (2025, paper)
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation|LeanRAG]] — GMM-BIC로 hierarchical KG 구축하면서 abstract 노드 간 relation까지 합성, LCA 기반 retrieval로 redundancy 46% 감소 (2026, paper)
- [[database/guo-2025-rag-anything-all-in-one-rag|RAG-Anything]] — LightRAG 후속작; cross-modal KG + text-based KG dual-graph와 modality-aware hybrid retrieval로 텍스트·이미지·표·수식 통합 multimodal RAG, 100+ 페이지 장문에서 격차 13점+ (2025, paper)
- [[database/dsba-2026-paper-review-graph-based-rag|Graph-based RAG (LightRAG · LeanRAG)]] — DSBA 김도윤 박사과정 세미나 + 발표 슬라이드; LightRAG의 dual-level keyword retrieval과 LeanRAG의 hierarchical KG + LCA retrieval 비교·비판 (2026, video)

## LLMs (llms)

모델 아키텍처, pre-training, fine-tuning, foundation model 논문.

- [[llms/shumailov-2024-ununlearning-unlearning-is-not-sufficient|UnUnlearning]] — ICL로 인해 unlearning(exact 포함)만으로는 LLM content regulation에 불충분함을 논증 (2024, paper)

## Agents (agents)

Agentic 시스템, tool use, planning, LangGraph 등.

_(아직 자료가 없습니다)_

## Evaluations (evaluations)

평가 프레임워크(RAGAS, Braintrust), benchmark.

_(아직 자료가 없습니다)_

## Applications (applications)

RAG 응용, 도메인 적용 사례, 제품 패턴.

_(아직 자료가 없습니다)_

## Etc (etc)

미분류, 횡단(cross-cutting) 주제.

_(아직 자료가 없습니다)_

## Overviews (overviews)

다수 자료를 합성한 페이지 — 지식이 복리로 쌓이는 곳.

_(아직 자료가 없습니다)_
