---
title: "microsoft/graphrag"
type: repo
year: 2024
category: database
raw_path: raw/repos/microsoft-graphrag.md
raw_filename: "microsoft-graphrag.md"
source_collection: external
org: "microsoft"
repo: "graphrag"
url: "https://github.com/microsoft/graphrag"
license: "MIT"
tags: [graphrag, graph-rag, knowledge-graph, rag, llm, indexing, community-detection, microsoft-research]
---

## 한 줄 요약 (One-line Summary)

`microsoft/graphrag`는 Edge et al. 2024 논문("From Local to Global", arXiv:2404.16130)의 공식 reference 구현체로, 비정형 텍스트에서 LLM으로 엔티티·관계를 추출해 knowledge graph를 만들고 커뮤니티 요약을 쌓는 **인덱싱 파이프라인 + 변환 스위트**다. PyPI로 배포되는 `graphrag` 패키지와 `graphrag init`/CLI quickstart를 제공하지만 "데모용이며 Microsoft가 공식 지원하지 않는다"고 명시한다.

## 1. 자료 정보 (Document Information)

- **저장소**: `microsoft/graphrag` (https://github.com/microsoft/graphrag)
- **라이선스**: MIT License, Copyright (c) Microsoft Corporation
- **배포**: PyPI `graphrag` 패키지 (`pip install graphrag`)
- **원논문**: GraphRAG Arxiv — arXiv:2404.16130 (Edge et al. 2024) → 이 wiki의 [[edge-2024-from-local-to-global]]
- **공식 채널**: Microsoft Research Blog(GraphRAG 소개), Docs(`microsoft.github.io/graphrag`), GitHub Discussions
- **진입점(문서 기준)**:
  - `graphrag init --root [path]` — 설정·프롬프트 스캐폴딩 생성
  - command line quickstart (`microsoft.github.io/graphrag/get_started/`)
  - Prompt Tuning Guide — 데이터에 맞춘 프롬프트 파인튜닝 권장

## 2. 주요 기여 (Key Contributions)

1. **GraphRAG 원논문의 공식 구현체.** "From Local to Global" 방법론(엔티티·관계 추출 → Leiden 커뮤니티 탐지 → 커뮤니티 요약 → map-reduce global 답변)을 실제 실행 가능한 파이프라인으로 제공한다.
2. **비정형 텍스트 → 구조화 데이터 파이프라인.** README는 스스로를 "data pipeline and transformation suite"로 규정 — LLM을 활용해 unstructured text에서 meaningful, structured data를 추출하는 것이 핵심.
3. **knowledge graph memory로 LLM 출력 강화.** private data에 대한 LLM 추론 능력을 knowledge graph 구조로 보강하는 방법론.
4. **비용 경고를 전면에 명시.** "GraphRAG indexing can be an expensive operation … start small" — 인덱싱 단계에서 대량의 LLM 호출이 발생하므로 비용을 이해하고 소규모로 시작하라고 경고.
5. **버전 관리·프롬프트 튜닝 운영 가이드.** minor 버전 업 시 `graphrag init --force`로 최신 config 포맷 갱신, major 버전 업 시 migration notebook 사용을 안내.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

README는 상세 아키텍처를 문서 사이트로 위임하고, 저장소 자체는 다음을 제공한다.

- **인덱싱(indexing) 파이프라인**: 소스 텍스트 → LLM 기반 엔티티/관계 추출 → 그래프 구성 → 커뮤니티 탐지(Leiden) → 계층적 커뮤니티 요약. 이 단계가 비용의 대부분을 차지한다("expensive operation" 경고 대상).
- **쿼리(query) 모드**: 원논문의 local search(특정 엔티티 이웃 기반)와 global search(커뮤니티 요약 map-reduce) 두 축.
- **설정 관리**: `graphrag init`이 config + 프롬프트 템플릿을 스캐폴딩. 프롬프트는 out-of-the-box로 최적이 아니므로 Prompt Tuning Guide로 데이터 맞춤 튜닝을 강권.
- **책임 있는 AI(RAI)**: `RAI_TRANSPARENCY.md`에 use case·intended use·평가 지표·한계·운영 요인 FAQ를 별도 문서화.

> 상세 알고리즘(그래프 구축·커뮤니티 요약·map-reduce 답변 생성)은 원논문 [[edge-2024-from-local-to-global]]에 정리되어 있으며, 이 repo는 그 실행 코드다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- README에는 벤치마크 수치가 없다(구현체 저장소). 성능 근거는 원논문에 위임 — 대규모 코퍼스 global sensemaking 질의에서 comprehensiveness·diversity가 vector RAG 대비 우수하다는 주장은 [[edge-2024-from-local-to-global]] 참조.
- 운영 지표로는 PyPI 다운로드·GitHub Issues/Discussions 배지가 활동성을 나타낸다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **비용**: 인덱싱이 expensive — 문서 전체를 LLM으로 훑어 그래프를 구축하므로 토큰 비용이 크다. LightRAG·LeanRAG 등 후속작이 이 비용 문제를 겨냥한다.
- **공식 지원 아님**: "demonstration and is not an officially supported Microsoft offering" — 프로덕션 SLA 없음.
- **프롬프트 의존성**: out-of-the-box 결과가 데이터에 따라 최적이 아니어서 프롬프트 튜닝이 사실상 필수.
- **버전 호환성**: minor/major 버전 업마다 config·프롬프트 재생성 또는 마이그레이션 필요(재인덱싱 리스크).

## 6. 관련 연구 (Related Work)

- **원논문**: Edge et al. 2024, "From Local to Global: A Graph RAG Approach to Query-Focused Summarization" (arXiv:2404.16130) → [[edge-2024-from-local-to-global]]
- **후속·비교**: [[guo-2025-lightrag-simple-and-fast]] (LightRAG, 비용 절감), [[zhang-2026-leanrag-knowledge-graph-based-generation]] (LeanRAG)
- **한국어 해설**: [[dsba-2025-graphrag-paper-review]], [[dsba-2026-paper-review-graph-based-rag]]
- **계보 overview**: [[lightrag-family-graph-rag-overview]]

## 7. 용어집 (Glossary)

- **GraphRAG**: knowledge graph를 인덱스로 사용해 LLM retrieval을 강화하는 RAG 계열. 엔티티·관계·커뮤니티 요약을 인덱싱 시점에 미리 구축.
- **indexing**: 소스 텍스트에서 그래프와 커뮤니티 요약을 만드는 전처리 단계(비용 집중 구간).
- **Leiden community detection**: 그래프를 계층적 커뮤니티로 분할하는 알고리즘. 커뮤니티별 요약이 global search의 기반.
- **local / global search**: 특정 엔티티 이웃 기반 질의(local) vs. 커뮤니티 요약 map-reduce 기반 전역 질의(global).
- **prompt tuning**: 대상 데이터에 맞춰 추출·요약 프롬프트를 조정하는 과정(README가 강권).
