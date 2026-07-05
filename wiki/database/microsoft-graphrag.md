---
title: "microsoft/graphrag"
type: repo
year: 2024
category: database
raw_path: raw/repos/microsoft-graphrag.md
raw_filename: "microsoft-graphrag.md"
source_collection: external
source: microsoft-graphrag.md
org: "microsoft"
repo: "graphrag"
url: "https://github.com/microsoft/graphrag"
license: "MIT"
tags: [graphrag, graph-rag, knowledge-graph, rag, llm, indexing, community-detection, microsoft-research]
---

## 요약 (Summary)

`microsoft/graphrag`는 Edge et al. 2024 논문("From Local to Global", arXiv:2404.16130)의 공식 reference 구현체다. 비정형 텍스트에서 LLM으로 엔티티와 관계를 뽑아 knowledge graph를 만들고 Leiden 커뮤니티 탐지로 계층 요약을 쌓아 두는 **인덱싱 파이프라인 겸 변환 스위트**다. PyPI `graphrag` 패키지로 배포되며 `graphrag init`과 CLI quickstart를 제공한다. 다만 README는 "데모용이고 Microsoft가 공식 지원하지 않는다"고 못 박는다.

## 주요 기여 (Key Contributions)

- **원논문의 공식 실행 코드.** "엔티티·관계 추출 → Leiden 커뮤니티 탐지 → 커뮤니티 요약 → map-reduce global 답변"이라는 방법론을 그대로 돌릴 수 있는 파이프라인으로 담았다.
- **비정형 텍스트를 구조화 데이터로.** README는 스스로를 "data pipeline and transformation suite"로 규정한다. LLM으로 unstructured text에서 구조화된 데이터를 뽑는 것이 목적이다.
- **비용 경고를 전면에.** 인덱싱은 문서 전체를 LLM으로 훑기 때문에 비싸다. README도 "start small"을 강조한다.
- **운영 가이드.** minor 버전 업에는 `graphrag init --force`로 config를 갱신하고 major 버전 업에는 migration notebook을 쓰라고 안내한다. 프롬프트는 out-of-the-box로 최적이 아니라 데이터 맞춤 튜닝을 권한다.

## 방법론 및 아키텍처 (Methodology and Architecture)

README는 상세 아키텍처를 문서 사이트로 위임하고, 저장소는 다음 두 축을 제공한다.

- **인덱싱(indexing)**: 소스 텍스트에서 엔티티·관계를 추출해 그래프를 짓고 Leiden으로 커뮤니티를 나눈 뒤 계층 요약을 만든다. 비용이 몰리는 구간이다.
- **쿼리(query)**: 특정 엔티티 이웃을 훑는 local search와, 커뮤니티 요약을 map-reduce하는 global search 두 모드.

설정은 `graphrag init`이 config와 프롬프트 템플릿까지 스캐폴딩한다. 책임 있는 AI 항목은 `RAI_TRANSPARENCY.md`에 use case·한계·평가 지표 FAQ로 별도 정리돼 있다.

상세 알고리즘(그래프 구축, 커뮤니티 요약, map-reduce 답변)은 원논문 쪽에 정리돼 있고, 이 저장소는 그 실행 코드에 해당한다.

## 한계 (Limitations)

- **비용**: 인덱싱이 비싸다. LightRAG·LeanRAG 등 후속작이 겨냥하는 지점이다.
- **공식 지원 아님**: 프로덕션 SLA가 없는 데모 구현체다.
- **프롬프트 의존성**: 데이터에 따라 기본 결과가 흔들려 프롬프트 튜닝이 사실상 필수다.
- **버전 호환성**: 버전 업마다 config·프롬프트 재생성 또는 마이그레이션이 필요하다(재인덱싱 리스크).

## 관련 페이지 (Related Pages)

- [[database/edge-2024-from-local-to-global]] — 이 저장소가 구현하는 GraphRAG 원논문 (arXiv:2404.16130)
- [[database/dsba-2025-graphrag-paper-review]] — GraphRAG 원논문 한국어 해설
- [[database/guo-2025-lightrag-simple-and-fast]] — 인덱싱 비용을 줄인 후속작 LightRAG
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] — KG 기반 후속작 LeanRAG
- [[overviews/lightrag-family-graph-rag-overview]] — GraphRAG를 트렁크로 둔 graph RAG 계보 overview
