---
title: "RAG-Anything: 멀티모달 올인원 RAG 프레임워크"
type: article
year: 2026
category: database
raw_path: raw/articles/9bow-2026-rag-anything-multimodal-rag-framework.md
raw_filename: "9bow-2026-rag-anything-multimodal-rag-framework.md"
source_collection: external
author: "9bow (박정환)"
url: "https://discuss.pytorch.kr/t/rag-anything-rag-feat-hkuds/9976"
publisher: "PyTorch Korea User Group Discuss"
tags: [rag-anything, multimodal-rag, hkuds, lightrag, knowledge-graph, dual-graph, korean-summary, article]
---

## 한 줄 요약 (One-line Summary)

PyTorch Korea User Group 운영자 9bow(박정환)가 2026-05-05에 게시한 RAG-Anything 한국어 소개글이다. 홍콩대학교 데이터 인텔리전스 랩(HKUDS)이 공개한 멀티모달 RAG 프레임워크를 도전 과제, 핵심 기여, 5단계 파이프라인, 벤치마크 결과, 어블레이션, 설치와 사용법 순으로 정리한다. 글은 이중 그래프 구축과 크로스-모달 하이브리드 검색을 핵심으로 꼽고, 100페이지를 넘는 긴 문서에서 MMGraphRAG와의 격차가 13점 이상으로 벌어진다는 점을 강조한다. 글 말미에 명시된 대로 본문은 GPT 모델로 정리된 2차 자료이므로, 정밀한 인용은 원 논문을 우선한다.

## 1. 자료 정보 (Document Information)

- **제목**: RAG-Anything: 멀티모달 올인원 RAG 프레임워크
- **작성자**: 9bow (박정환)
- **작성일**: 2026-05-05
- **출처**: PyTorch Korea User Group Discuss, 읽을거리&정보공유 카테고리
- **URL**: https://discuss.pytorch.kr/t/rag-anything-rag-feat-hkuds/9976
- **원문 태그**: hkuds, rag-anything, rag, paper, multimodal, knowledge-graph, lightrag
- **자료 유형**: 커뮤니티 소개글. 원 논문(arXiv 2510.12323)과 GitHub 저장소(HKUDS/RAG-Anything)를 참고 자료로 링크한다
- **본문 생성 방식**: 글 말미에 "이 글은 GPT 모델로 정리되었으며, 원문의 내용과 다르게 정리된 부분이 있을 수 있습니다"라고 명시되어 있다

## 2. 주요 기여 (Key Contributions)

이 글은 1차 연구물이 아니라 한국어 독자를 위한 소개 자료다. 글이 RAG-Anything의 기여로 정리해 제시하는 항목은 네 가지다.

1. **이중 그래프 구축**: 크로스-모달 지식 그래프와 텍스트 기반 지식 그래프를 별도로 구축한 뒤 엔티티 정렬로 융합하는 전략을 쓴다.
2. **크로스-모달 하이브리드 검색**: 그래프의 구조적 탐색과 임베딩 공간의 의미 유사도 매칭을 결합해 다중 홉 추론과 의미 검색을 동시에 수행한다.
3. **모달리티 인지 질의 처리**: 질의에 포함된 "figure", "table", "equation" 같은 단서를 분석해 모달리티 선호를 추론한다.
4. **긴 문서 강건성**: 문서가 길어질수록 베이스라인 대비 성능 격차가 증가한다.

글은 이와 별개로 도입 편의성도 함께 제시한다. `pip install raganything` 한 줄로 설치할 수 있고, MIT 라이선스로 공개되어 개인과 상업적 목적 모두에 사용, 수정, 배포가 가능하다고 적는다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 글이 제시한 세 가지 도전 과제

| 도전 과제 | 글의 서술 |
|---|---|
| 통합 멀티모달 표현 | 서로 다른 정보 유형을 매끄럽게 통합하면서도 각 모달리티의 고유한 특성과 모달리티 간 관계를 보존해야 한다 |
| 구조 인지 분해 | 복잡한 레이아웃을 지능적으로 파싱하면서 공간적, 계층적 관계를 유지하는 레이아웃 인지 파싱이 필요하다 |
| 크로스-모달 검색 | 서로 다른 모달리티 사이를 탐색하고 그 상호 연결을 추론할 수 있는 정교한 메커니즘을 요구한다 |

### 5단계 멀티모달 파이프라인

| 단계 | 이름 | 글의 서술 |
|---|---|---|
| 1 | 멀티모달 파싱 엔진 | PDF, DOCX, PPTX 등 다양한 형식을 입력받아 텍스트, 이미지, 수식, 표를 모두 처리한다 |
| 2 | 크로스-모달 지식 그래프 구축 | 각 콘텐츠 단위에서 검색용 설명과 그래프 구축용 엔티티 요약을 생성하며 문맥을 고려한다 |
| 3 | 그래프 융합 및 인덱스 생성 | 멀티모달 그래프와 텍스트 기반 지식 그래프를 엔티티 이름으로 정렬하여 통합한다 |
| 4 | 크로스-모달 하이브리드 검색 | 구조적 탐색과 의미 유사도 매칭을 병행하여 후보를 검색하고 다시 순서를 매긴다 |
| 5 | 멀티모달 응답 합성 | 최종 텍스트 컨텍스트와 시각 자료를 VLM에 입력하여 응답을 생성한다 |

글은 RAG-Anything을 LightRAG(EMNLP 2025)를 기반으로 구축된 올인원 멀티모달 RAG 시스템으로 소개한다. 텍스트, 이미지, 표, 수식을 단일 인터페이스로 처리하고 PDF, Office 문서, 이미지를 포함한 다양한 형식을 지원한다고 적는다.

### 글에 수록된 코드

설치는 한 줄이다.

```bash
pip install raganything
```

기본 사용 예시는 비동기 함수 하나로 초기화, 인덱싱, 질의를 모두 보여준다.

```python
import asyncio
from raganything import RAGAnything

async def main():
    rag = RAGAnything(
        llm_model_func=your_llm_func,
        vision_model_func=your_vision_func
    )
    await rag.process_document_complete(
        file_path="research_paper.pdf",
        output_dir="./rag_output"
    )
    result = await rag.query(
        "논문의 주요 실험 결과와 관련 그림을 설명해줘",
        mode="hybrid"
    )
    print(result)

asyncio.run(main())
```

LightRAG 통합 예시는 `working_dir`를 `./lightrag_cache`로 지정하고 `llm_model_func`에 OpenAI 호환 모델을, `vision_model_func`에 비전 모델을 넘긴다.

```python
from raganything import RAGAnything
from lightrag import LightRAG

rag = RAGAnything(
    working_dir="./lightrag_cache",
    llm_model_func=openai_compatible_model,
    vision_model_func=vision_model
)
```

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### DocBench

229개 문서, 평균 66페이지 규모의 벤치마크다. 글은 RAG-Anything 행만 제시한다.

| 방법 | 학술 | 금융 | 정부 | 법률 | 뉴스 | 텍스트 | 멀티미디어 | 통상 | 전체 |
|---|---|---|---|---|---|---|---|---|---|
| RAG-Anything | 61.4 | 67.0 | 61.5 | 60.2 | 66.3 | 85.0 | 76.3 | 46.0 | 63.4% |

### MMLongBench

135개 문서, 7가지 유형으로 구성된다.

| 방법 | 자료 | 튜토리얼 | 학술 | 가이드 | 브로셔 | 행정 | 금융 | 전체 |
|---|---|---|---|---|---|---|---|---|
| RAG-Anything | 46.6 | 43.5 | 38.7 | 43.9 | 34.0 | 45.7 | 43.6 | 42.8% |

### 긴 문서에서의 우위

| 문서 길이 | RAG-Anything | MMGraphRAG |
|---|---|---|
| 101에서 200페이지 | 68.2% | 54.6% |
| 200페이지 이상 | 68.8% | 55.0% |

글은 100페이지를 초과하는 문서에서 MMGraphRAG와의 격차가 13점 이상이라고 요약한다.

### 어블레이션 연구

| 방법 | 학술 | 금융 | 정부 | 법률 | 뉴스 | 텍스트 | 멀티미디어 | 통상 | 전체 |
|---|---|---|---|---|---|---|---|---|---|
| Chunk-only | 55.8 | 61.5 | 60.1 | 60.7 | 64.0 | 81.6 | 66.2 | 43.5 | 60.0% |
| w/o Reranker | 60.9 | 63.5 | 58.8 | 60.2 | 68.6 | 81.7 | 74.7 | 45.4 | 62.4% |
| RAG-Anything | 61.4 | 67.0 | 61.5 | 60.2 | 66.3 | 85.0 | 76.3 | 46.0 | 63.4% |

글의 해석은 다음과 같다. 그래프 기반 구조 표현이 멀티모달 추론에 결정적이며, 성능의 주된 원천이 reranker가 아니라 그래프 기반 검색이다.

### 케이스 스터디

| 사례 | 글의 서술 |
|---|---|
| 다중 패널 그림 해석 | t-SNE 시각화처럼 여러 서브패널을 가진 그림에서 패널, 축 라벨, 범례, 캡션을 노드로 하고 의미 관계를 엣지로 가지는 시각 레이아웃 그래프를 구축한다 |
| 금융 표 탐색 | 행 헤더, 열 헤더(연도), 데이터 셀, 단위를 노드로 하고 관계를 명시적으로 모델링하여 유사한 용어가 반복되는 재무 표에서도 정확히 정보를 추출한다 |

### 글이 만든 비교 매트릭스

| 기능 | RAG-Anything | 기존 텍스트 RAG | GraphRAG |
|---|---|---|---|
| 텍스트 처리 | 지원 | 지원 | 지원 |
| 이미지 분석 | 지원 | 미지원 | 미지원 |
| 표 파싱 | 지원 | 부분적 | 부분적 |
| 수식 인식 | 지원 | 미지원 | 미지원 |
| 크로스-모달 추론 | 지원 | 미지원 | 미지원 |
| 통합 인터페이스 | 지원 | 지원 | 지원 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

글이 옮긴 시스템 한계는 두 가지다.

- **텍스트 중심 검색 편향**: 시각 정보가 명시적으로 요구되는 질의에서도 텍스트 소스를 선호한다.
- **경직된 공간 처리**: 셀 병합, 비표준 칼럼 경계 등 표준 레이아웃을 벗어난 문서 처리에 제한이 있다.

자료 자체의 한계도 함께 기록한다.

- **2차 자료**: 본문 말미에 GPT 모델로 정리되었고 원문과 다르게 정리된 부분이 있을 수 있다는 안내가 붙어 있다. 정밀한 인용은 원 논문 페이지를 우선한다.
- **베이스라인 수치 미수록**: DocBench와 MMLongBench 표에 RAG-Anything 행만 실려 있어, 전체 순위나 두 번째로 높은 방법과의 차이는 이 글만으로 확인할 수 없다. 어블레이션 표와 긴 문서 비교 표에서만 다른 방법의 수치가 나온다.
- **실험 조건 미수록**: 실험에 사용한 backbone 모델, 인덱싱 비용, 파서 구현은 글에 나오지 않는다.
- **긴 문서 표의 출처 불명**: 101에서 200페이지 구간의 68.2%는 DocBench 전체 63.4%와 MMLongBench 전체 42.8% 어느 쪽과도 직접 연결되지 않는다. 글은 이 구간 수치가 어느 벤치마크의 부분집합인지 밝히지 않는다.

## 6. 관련 연구 (Related Work)

글 말미가 직접 링크하는 PyTorch Korea User Group 내부 글은 다섯 편이다.

| 글 | 글이 붙인 설명 |
|---|---|
| LightRAG | 지식 그래프 기반의 이중 검색 구조로 GraphRAG보다 빠른 RAG 프레임워크 |
| ApeRAG | GraphRAG와 멀티모달 검색을 결합한 오픈소스 RAG 플랫폼 |
| EdgeQuake | Rust로 구현한, LightRAG 알고리즘 기반의 초고속 GraphRAG 프레임워크 |
| Agentic RAG for Dummies | Agentic 기반 RAG 시스템 구축 가이드 |
| AdalFlow | LLM 애플리케이션을 위한 PyTorch Library |

본 wiki 내 관련 자료는 다음과 같다.

- [[database/guo-2025-rag-anything-all-in-one-rag]]: 이 글의 1차 출처인 원 논문. 정밀한 수치와 아키텍처 서술은 원 논문 페이지에서 확인한다.
- [[database/hkuds-rag-anything]]: 같은 프레임워크의 OSS 저장소 페이지.
- [[database/guo-2025-lightrag-simple-and-fast]]: 글이 RAG-Anything의 기반이라고 밝힌 LightRAG.
- [[database/9bow-2026-turbovec-turboquant-rust-vector-index]]: 같은 저자가 같은 게시판에 쓴 다른 소개글.

## 7. 용어집 (Glossary)

- **RAG-Anything**: HKUDS가 공개한 올인원 멀티모달 RAG 시스템. 글은 LightRAG를 기반으로 구축되었다고 소개한다.
- **이중 그래프 구축**: 크로스-모달 지식 그래프와 텍스트 기반 지식 그래프를 따로 만든 뒤 엔티티 정렬로 합치는 전략.
- **엔티티 정렬**: 두 지식 그래프를 엔티티 이름 기준으로 맞춰 하나의 인덱스로 통합하는 절차.
- **크로스-모달 하이브리드 검색**: 그래프의 구조적 탐색과 임베딩 공간의 의미 유사도 매칭을 함께 수행하는 검색 방식.
- **모달리티 인지 질의 처리**: 질의에 들어 있는 "figure", "table", "equation" 같은 단서로 모달리티 선호를 추론하는 처리.
- **DocBench**: 229개 문서, 평균 66페이지 규모의 벤치마크.
- **MMLongBench**: 135개 문서, 7가지 유형으로 구성된 벤치마크.
- **MMGraphRAG**: 긴 문서 구간 비교에서 글이 유일하게 이름을 든 비교 대상.
- **HKUDS**: 홍콩대학교 데이터 인텔리전스 랩. 글은 이 랩이 RAG-Anything을 공개했다고 적는다.
