---
title: "sguys99/langchain-study: medium/3.vectorless-rag (Vectorless RAG: A Reasoning-Based Document Retrieval System)"
type: repo
year: 2026
category: database
raw_path: raw/repos/sguys99-langchain-study-vectorless-rag.md
raw_filename: "sguys99-langchain-study-vectorless-rag.md"
source_collection: external
org: sguys99
repo: langchain-study (medium/3.vectorless-rag)
url: https://github.com/sguys99/langchain-study/tree/main/medium/3.vectorless-rag
license: unspecified
tags:
  - vectorless-rag
  - pageindex
  - langgraph
  - pymupdf4llm
  - anthropic
  - document-tree
  - reasoning-based-retrieval
  - bigtable
  - tutorial
  - korean
---

## 한 줄 요약 (One-line Summary)

`sguys99/langchain-study` 모노레포의 `medium/3.vectorless-rag` 서브디렉토리로, towardsai.net 해설 글과 `alphaiterations/agentic-ai-usecases` 저장소를 한글로 재구성한 vectorless RAG 학습용 구현이다. PageIndex 같은 기성 솔루션을 쓰지 않고 `pymupdf4llm`으로 PDF를 마크다운으로 바꾼 뒤 헤더 레벨과 스택으로 DocumentTree를 직접 만들고, langgraph 에이전트가 그 트리를 분석, 하위 탐색, 검색, 생성 네 단계로 내려가며 답을 만든다. Bigtable OSDI'06 논문(13페이지) 데모에서 한 질의가 LLM 호출 4회(navigate 3회, answer 1회), 지연 15.60초로 끝났다.

---

## 1. 자료 정보 (Document Information)

- **저장소 위치**: `sguys99/langchain-study` 모노레포의 `medium/3.vectorless-rag/` 서브디렉토리
- **URL**: https://github.com/sguys99/langchain-study/tree/main/medium/3.vectorless-rag
- **저자**: sguys99 (Kwang Myung Yu), 이 ai-wiki 운영자 본인
- **자료 성격**: 한글 README 한 편. 개념 해설(전통 RAG의 한계 분석과 vectorless RAG 정의)과 구현 해설(트리 생성, 트리 탐색, 실행)이 한 문서에 이어져 있다
- **원 출처 2건** (README가 "본 저장소는 아래 출처의 자료를 수정한 것입니다"로 명시):
  - `https://pub.towardsai.net/vectorless-rag-how-i-built-a-rag-system-without-embeddings-databases-or-vector-similarity-efccf21e42ff`
  - `https://github.com/alphaiterations/agentic-ai-usecases/tree/main/advanced/vectorless-rag`
- **README가 참조하라고 지시한 코드 파일**: `tree.py`(트리 생성), `retriever.py`(트리 탐색), `main.py`(실행 진입점)
- **실행 명령**: `uv run main.py`
- **핵심 의존 라이브러리** (README 본문 언급분): `pymupdf4llm`(PyMuPDF 기반 PDF 마크다운 변환), `langgraph`(에이전트 탐색 루프)
- **데모 문서**: Google의 Bigtable OSDI'06 논문 PDF. `main.py` 실행 결과 JSON에서 `document_name`이 `bigtable-osdi06`, 루트 페이지 범위가 1에서 13이다
- **라이선스**: 현재 raw(README 본문)에 라이선스 조항이 없다. frontmatter의 `license: unspecified`를 유지하며, 재사용 시 저장소의 LICENSE 파일을 직접 확인해야 한다

### raw 범위에 대한 주의

이 stem의 raw는 2026-06-17 커밋 `0507ad0`에서 전체 클론 디렉토리가 README 스텁으로 바뀌었다(ai-wiki 저장소 쪽 변경이며 대상 저장소의 변경이 아니다). 그 커밋이 삭제한 파일은 `tree.py`(386줄), `retriever.py`(603줄), `main.py`(197줄), `questions.py`, `CLAUDE.md`, `overview.md`, `pyproject.toml`, `uv.lock`, `notebooks/vectorless_rag_walkthrough.ipynb`, `results/document_tree.json`, `results/workflow.png`, `img/2.png`, `bigtable-osdi06.pdf`이다.

따라서 클래스 이름, 함수 시그니처, 상수값, 의존성 버전, 노트북 셀 수처럼 소스 코드를 직접 읽어야 확인되는 사실은 현재 raw로 검증할 수 없다. 이 문서는 README 본문에서 확인되는 서술과 README에 인용된 실행 출력만 근거로 삼는다.

---

## 2. 주요 기여 (Key Contributions)

### 2-1. 기성 솔루션을 쓰지 않는 선택과 그 이유의 명시

README는 구현 절에서 "PageIndex와 같이 바로 사용할 수 있는 솔루션도 있어 구조화된 문서 표현을 생성할 수 있음. 하지만 이 구현에서는 파싱, 계층 구조, 메타데이터를 완전히 제어하기 위해 자체 트리를 구축"이라고 적는다. 같은 vectorless RAG 개념을 따르되 PageIndex 라이브러리나 서비스를 쓰지 않는다는 뜻이며, 선택 이유를 통제권으로 밝힌 점이 이 자료의 위치를 정한다.

### 2-2. 전통 RAG의 한계를 등급으로 나눈 분석

흔히 뭉뚱그려 나열되는 전통 RAG의 문제를 네 항목으로 나누고 각각에 성격 등급을 붙인다. Shallow retrieval만 "핵심적 한계"이고 Context Fragmentation은 "완화 가능", Loss of Structure는 "구현 방식에 따라 다름", 전처리 오버헤드는 "아키텍처 상의 절충점"이라는 구분이다. README의 결론은 "흔히 언급되는 여러 문제점 중 유일한 근본적인 한계는 기존 RAG가 추론이 아닌 유사성을 기반으로 검색을 수행한다는 점뿐"이며, 나머지는 설계로 해결 가능하다고 본다.

### 2-3. 인간 분석가 비유로 정의한 추론 기반 검색

vectorless RAG를 정의할 때 인간 분석가가 문서를 다루는 절차를 여섯 단계로 제시한다. 목차를 살펴보고, 구조를 파악하고, "X에 대한 정보가 필요하다면 아마도 Y 섹션에 있을 것"이라고 추론하고, 해당 섹션으로 이동하고, 전체 맥락을 읽고, 답변을 종합하는 순서다. README는 이 절차가 검색의 질문 자체를 바꾼다고 정리한다. `무엇이 비슷해 보이나?`에서 `다음에 어디로 가야 할까?`로 옮겨 가는 것이 vectorless RAG를 정의하는 근본적인 변화다.

### 2-4. langgraph 기반 4단계 탐색 루프 설계

트리 탐색을 일회성 조회가 아니라 네 단계 그래프로 구현한다. 분석 단계가 LLM으로 의사결정을 내리고, 하위 탐색 단계가 선택된 자식으로 이동하고, 검색 단계가 콘텐츠를 추출하고, 생성 단계가 인용 출처가 붙은 답변을 만든다. 각 단계는 탐색 경로, 각 노드에서 내린 결정, 신뢰도 점수, 최종 사용 출처를 로깅한다. README는 이 로깅 덕분에 "블랙박스 검색 시스템과 달리 검색 과정이 완전히 투명해지고 디버깅이 가능해짐"이라고 적는다.

### 2-5. 한글 재구성 학습 자료

영어 출처 두 건을 한글 해설로 옮기면서 개념 설명과 구현 설명을 한 문서에 이어 붙였다. 코드 세부는 `tree.py 파일 참고`, `retriever.py 파일 참고`처럼 파일로 위임하고, README 본문은 무엇을 왜 그렇게 만들었는지에 집중한다.

---

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3-1. 전통 RAG 파이프라인과 변형 세 가지

전통 RAG는 chunking으로 문서를 작은 단위로 나누고, 각 청크를 벡터로 바꾸는 임베딩 단계를 거치고, 코사인 유사도 같은 유사도 검색으로 관련 청크를 찾는다. 그다음 Top-k 청크를 LLM에 보내 답변을 생성한다. README가 적은 파이프라인은 `Query → Embedding → Vector DB → Top-k Chunks → LLM → Answer`다.

검색 품질, 추론 깊이, 문맥 관련성을 겨냥한 변형 세 가지가 뒤따랐다.

| 변형 | 추가하는 것 | 겨냥한 문제 |
|---|---|---|
| Re-ranking RAG | 초기 검색 결과를 LLM이 다시 정렬하는 2차 단계(reranking) | 단순 유사도 점수만으로는 "실제로 쿼리와 가장 관련성이 높은 것"을 가릴 수 없다 |
| Hybrid RAG | dense 벡터 검색과 BM25 같은 키워드 검색의 결합 | 임베딩이 ID, 이름, 희귀 용어의 정확 일치를 놓친다. 반대로 키워드 검색만으로는 의미적 이해가 부족하다 |
| Agentic RAG | 쿼리의 하위 질문 분해, 여러 단계 검색, 다음에 가져올 정보의 동적 결정 | 한 번의 조회로는 다단계 질문을 풀지 못한다 |

README는 이 흐름에서 "검색과 추론의 경계가 모호해지기 시작하며, 시스템은 더 유연해지지만 동시에 더 복잡해진다"고 평가한다.

### 3-2. 전통 RAG의 네 가지 한계와 등급

| 한계 | 자료가 붙인 등급 | 내용 | 완화 수단 |
|---|---|---|---|
| Shallow retrieval | 핵심적 한계 | 검색이 과제 관련성이나 추론이 아니라 의미적 유사성에 기반한다. 벡터 검색은 "어떤 텍스트가 쿼리와 유사해 보이나"에만 답하는데, 실제 쿼리는 인과 관계 이해, 다단계 추론, 여러 섹션에 걸친 정보 통합을 요구한다 | 없다. 더 나은 청킹이나 색인화만으로는 완전히 해결되지 않는다 |
| Context Fragmentation | 완화 가능 | 임베딩 전 분할 때문에 중요한 문맥이 여러 조각에 걸쳐 나뉘고, 검색된 조각에 주변 정보가 부족하며, 섹션 간 관계가 사라진다 | overlapping chunks, sliding windows, reranking, multi-hop retrieval |
| Loss of Structure | 구현 방식에 따라 다름 | 단순한 구현에서 문서가 여러 청크로 평면화되면서 장, 절, 소절 구조가 사라진다 | 절 제목과 계층 구조 같은 메타데이터, hierarchical chunking, parent-child retrieval |
| 전처리 오버헤드 | 아키텍처 상의 절충점 | 임베딩 생성, 벡터 데이터베이스 저장, 인덱싱과 유지 관리에 초기 비용과 시스템 복잡성이 든다 | 절충의 대가로 빠른 검색, 저지연 쿼리, 확장 가능한 성능을 얻는다. 높은 초기 비용과 낮은 쿼리당 비용의 배분으로 이해하는 편이 적절하다 |

### 3-3. vectorless RAG의 동작 네 단계

README는 vectorless RAG를 "일회성 문서 변환"과 "쿼리 시점에 수행되는 추론 기반 검색 루프" 두 단계로 소개한 뒤, 실제로는 네 단계로 나누어 설명한다.

1. **문서 트리 구축(일회성 설정)**: 문서를 제목, 장, 절, 소절이라는 책의 구성과 유사한 계층 구조로 바꾼다. 전처리 단계를 거치면 각 노드가 제목, 짧은 요약, 페이지 경계, 선택적 전문을 갖는다. 이 트리는 전체 텍스트를 훑지 않고도 내용을 탐색할 수 있는 간결한 표현이다.
2. **구조에 대한 추론**: 쿼리 시점에 텍스트를 바로 검색하지 않는다. LLM에 쿼리와 트리 구조(제목과 요약만)를 주고 "어떤 섹션에 답이 포함되어 있을 가능성이 가장 높습니까?"라고 묻는다. 모델은 쿼리의 의미적 이해, 고수준 문서 구조, 섹션 간 관계를 근거로 노드를 고른다. Bigtable의 Chubby에 대한 질문이면 "아키텍처"와 "일관성 및 동기화"를 고를 수 있다. 이 단계가 벡터 유사성을 명시적 의사결정으로 대체한다.
3. **전체 컨텍스트 검색**: 관련 섹션이 정해지면 해당 노드의 전체 텍스트를 가져오고, 완전성을 위해 하위 섹션을 선택적으로 포함해 구조화된 컨텍스트로 결합한다. 검색 단위가 임의의 조각이 아니라 섹션이 된다.
4. **답변 생성**: 검색된 컨텍스트를 LLM에 전달한다. 지침은 제공된 컨텍스트만 사용할 것, 여러 섹션에 걸친 정보를 종합할 것, 선택적으로 출처를 인용할 것이다. 전통 RAG와 형태는 비슷하지만 컨텍스트가 선택된 방식이 다르다.

### 3-4. 트리 생성 구현

`pymupdf4llm`은 PyMuPDF를 기반으로 만든 경량 라이브러리로, 제목과 구조를 유지한 채 PDF 콘텐츠를 마크다운으로 뽑는다. 이 구현이 트리 생성 단계에서 쓰는 도구다.

트리의 설계 원칙은 네 가지다.

- 각 노드는 섹션(chapter, subsection 등)을 나타낸다
- 노드는 마크다운 헤더(`#`, `##`, `###`)에서 파생된다
- 부모와 자식 관계가 문서 구조를 반영한다
- 각 노드는 페이지 범위 및 콘텐츠에 매핑된다

파싱은 세 단계를 따른다.

| 단계 | 수단 | 산출 |
|---|---|---|
| 구조화된 마크다운 추출 | `pymupdf4llm.to_markdown()`으로 레이아웃과 제목을 보존한다 | 헤더가 살아 있는 마크다운 |
| 헤더를 기반으로 계층 구조 구축 | 마크다운 헤더를 레벨로 파싱하고 스택 기반 접근 방식으로 트리를 구성한다 | 부모와 자식이 연결된 트리 뼈대 |
| 콘텐츠를 페이지와 정렬 | 페이지 단위 청크로 페이지 경계를 정교화한다 | 각 노드가 원본 문서에 정확히 매핑된 트리 |

추가 처리도 세 가지가 명시되어 있다. 제목은 번호 매김, 로마 숫자, 번호 없음 등으로 분류된다. 콘텐츠는 상위 레벨 노드에서 요약된다. 리프 노드는 가장 상세한 콘텐츠를 유지한다. 결과물이 DocumentTree이며 README는 세부 구현을 `tree.py 파일 참고`로 넘긴다.

### 3-5. 트리 탐색 구현

탐색은 트리에 대한 의사결정 과정으로 다뤄진다. 루트에서 시작해 각 노드에서 쿼리와의 관련성을 평가하고, 중지하고 콘텐츠를 추출하거나 더 관련성이 높은 하위 섹션으로 깊이 이동한다. 이 과정은 중지 조건이 충족될 때까지 이어진다.

| 중지 조건 | 자료의 서술 |
|---|---|
| 낮은 신뢰도 | 관련성 평가의 신뢰도가 낮으면 더 내려가지 않는다 |
| 최대 깊이 | 정해진 깊이 한도에 도달하면 멈춘다 |
| 리프 노드 | 자식이 없는 노드에 닿으면 멈춘다 |

구체적인 신뢰도 임계값과 깊이 상한 값은 README에 없다.

탐색 파이프라인은 네 단계 그래프로 구성된다.

| 단계 | 받는 정보 | 하는 일 | 내보내는 정보 |
|---|---|---|---|
| 분석 | 쿼리, 현재 노드(제목, 요약, 콘텐츠 미리보기), 자식 노드 목록 | LLM이 관련성을 평가하고 다음 행동을 정한다 | 신뢰도 점수, 하위로 이동할지 여부, 다음에 탐색할 자식 노드, 간략한 추론 |
| 하위 탐색 | 분석이 고른 자식 노드 | 선택된 자식 노드로 이동하고 과정을 반복한다 | 갱신된 현재 위치 |
| 검색 | 탐색이 멈춘 시점의 현재 노드 | 현재 노드에서 콘텐츠를 페이지 메타데이터와 함께 추출한다 | 섹션 콘텐츠와 페이지 정보 |
| 생성 | 검색된 섹션들 | 모델이 섹션을 종합해 근거 기반 답변을 만든다 | 인용 출처가 포함된 최종 답변 |

README가 따로 제시하는 실행 흐름 블록은 단계 이름을 조금 다르게 적는다.

```
Question
   ↓
[Step 1] Analyze Node      ← LLM evaluates relevance and decides next action
   ↓
[Step 2] Route Decision    ← Descend into children, retrieve content, or backtrack
   ↓
[Step 3] Retrieve Content  ← Extract full text from relevant nodes
   ↓
[Step 4] Generate Answer   ← LLM synthesizes final answer with sources
   ↓
Answer + Path + Confidence + Sources
```

각 단계는 탐색 경로, 각 노드에서 내린 결정, 신뢰도 점수, 최종적으로 사용된 출처를 로깅한다. README가 꼽는 주요 특징은 네 가지다. 검색이 일회성이 아니라 반복적으로 수행되고, 결정이 명시적이며 검토 가능하고, 탐색이 구조와 추론을 기반으로 안내되며, 시스템이 광범위한 블록 대신 관련성 높은 하위 섹션에 집중한다. 세부 구현은 `retriever.py 파일 참고`로 넘긴다.

### 3-6. 실행과 트리 출력

`uv run main.py`를 실행하면 가장 먼저 `pymupdf4llm`으로 PDF에서 텍스트를 추출한다. README가 붙인 실제 출력 JSON에서 관측되는 트리는 다음과 같다.

| 노드 id | 제목 | level | 페이지 범위 | heading_type |
|---|---|---|---|---|
| `root` | `bigtable-osdi06.pdf` | 0 | 1에서 13 | 표기 없음 |
| `Bigtable_A_Distribut_0` | `**Bigtable: A Distributed Storage System for Structured Data**` | 1 | 1에서 13 | 표기 없음 |
| `Abstract_8` | `**Abstract**` | 2 | 1에서 1 | `unknown` |
| `1_Introduction_12` | `**1 Introduction**` | 2 | 1에서 1 | `unknown` |

노드 하나가 갖는 필드는 `id`, `title`, `level`, `page_start`, `page_end`, `content`, `children`, `heading_type`, `summary`다. `id`는 제목을 슬러그로 만들고 숫자를 붙인 형태이며, `Bigtable_A_Distribut_0`은 제목이 스무 글자에서 잘린 뒤 `_0`이 붙은 모습이다. `summary`는 `content` 앞부분을 잘라 만든 값으로, Abstract 노드의 `summary`가 초록 본문의 앞부분과 글자 단위로 일치한다. 인용된 JSON은 두 번째 자식 노드에서 잘려 있어 트리 전체 구성은 확인할 수 없다.

---

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크는 없다. README가 인용한 실행 추적 한 건이 유일한 수치다.

```
Total LLM calls : 4  (3 navigate + 1 answer)
Total latency   : 15.60s
```

한 질의가 LLM 호출 4회로 끝났고 그중 3회가 탐색 결정(navigate), 1회가 답변 생성(answer)이다. 전체 지연은 15.60초다. README는 이 수치를 "탐색 깊이 vs 지연" 항목의 근거로 들며 "탐색 단계가 하나 추가될 때마다 지연 시간이 발생"한다고 적는다.

로그 예시도 한 건 인용되어 있다.

```
Decision   : ↓ descend
Reasoning  : The Introduction section directly addresses the query
```

### 벡터 RAG와의 실무 비교

README는 "Bigtable은 복제본 간 일관성을 어떻게 처리하나요?"라는 질문 하나로 두 방식을 대조한다.

| 항목 | 전통 RAG | vectorless RAG |
|---|---|---|
| 검색 대상 선정 | "일관성", "복제" 같은 용어와의 유사성으로 청크를 검색한다 | 관련 섹션(예: "일관성 및 동기화")을 먼저 식별한다 |
| 가져오는 단위 | 부분적으로만 관련성이 있는 청크 | 섹션 전체 |
| 생성 단계의 부담 | 모델이 노이즈를 걸러내야 한다 | 더 일관되고 집중된 맥락을 받는다 |

### 두 방식의 성격 비교

| 기준 | 기존 RAG | vectorless RAG |
|---|---|---|
| 성격 | 효율적이다 | 구조화되어 있다 |
| 검색 근거 | 유사도 | 추론 |
| 확장성 | 우수하다 | 선택적으로 쓴다 |
| 맞는 문제 | 대규모 검색 | 구조화된 문서에 대한 추론 |

README의 결론은 대체가 아니라 전환이다. "벡터리스 RAG는 기존의 RAG를 대체하는 것이 아니라, 검색 전략을 전환하는 것"이며 문제에 따라 선택한다.

---

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5-1. 자료가 밝힌 한계

vectorless RAG가 유리한 조건은 세 가지다. 문서의 구조가 명확한 경우, 질문이 섹션 간 이동을 필요로 하는 경우, 맥락이 관련 하위 섹션에 분산되어 있는 경우다. 반대 방향의 대가도 네 가지로 명시되어 있다.

| 대가 | 내용 |
|---|---|
| 지연 시간 | 쿼리당 여러 번의 LLM 호출이 필요해 지연이 커진다 |
| 비용 | 벡터 조회 대비 쿼리당 비용이 더 높다 |
| 구조 품질 의존 | 구조가 취약하거나 노이즈가 많으면 효과가 줄어든다 |
| 코퍼스 성격 | 대규모의 비정형 코퍼스에는 적합하지 않다 |

### 5-2. 실용적 고려 사항 일곱 가지

README는 구현과 실행 추적에서 두드러진 고려 사항을 일곱 항목으로 정리한다.

| 고려 사항 | 자료의 서술 |
|---|---|
| 구조의 품질 | 깔끔한 제목은 더 나은 탐색으로, 노이즈가 많은 PDF는 불확실한 탐색 결정으로, 계층 구조 누락은 평면적이고 비효율적인 검색으로 이어진다. 우수한 파싱에 투자하는 것이 검색 품질에 직접 영향을 준다 |
| 노드 세분화 | 너무 굵으면 답변이 덜 정확해지고, 너무 잘게 쪼개면 탐색이 깊어져 LLM 호출이 늘어난다. 섹션에서 하위 섹션, 리프로 이어지는 균형 잡힌 계층이 가장 효과적이다 |
| 탐색 깊이와 지연 | 탐색 단계가 하나 늘 때마다 지연이 쌓인다. 실제 시스템은 최대 깊이 제한, 중지 임계값 조정, 불필요한 탐색 방지가 필요하다 |
| 프롬프트 설계 | 명확한 지시는 더 나은 결정으로, 모호한 프롬프트는 무작위 탐색으로 이어진다. `should_descend`를 어떻게 정의하는지 같은 사소한 변경도 결과를 크게 바꾼다 |
| 로깅 | 시스템이 어디로 이동했는지 확인하고 왜 그 결정을 내렸는지 디버깅하며 실제 추적 기록으로 동작을 조정할 수 있다. 로그 없이는 성능 향상이 어렵다 |
| 문서 유형 | 명확한 섹션이 있고 정보가 논리적으로 구성된 논문, 보고서, 문서에서 잘 동작한다. 로그, 채팅, 정리가 안 된 텍스트에서는 효과가 떨어진다 |
| 콘텐츠 품질 | 올바른 정보가 명확히 정의된 섹션에 없으면 시스템에 의미론적 대체 방안이 없다. 콘텐츠 구성이 시스템 설계의 일부가 된다 |

### 5-3. 자료의 공백과 내적 모순

- **비용과 성능 절의 본문 부재**: "코스트, 성능 고려 사항" 절에 `![](img/2.png)` 이미지 참조만 있고 설명 문장이 없다. 해당 이미지 파일은 현재 raw에 없어서 이 절의 내용을 확인할 방법이 없다.
- **단계 이름의 불일치**: "구현 구성 요소"는 네 단계를 분석, 하위 탐색, 검색, 생성으로 열거한다. 반면 "실행 흐름" 블록은 Analyze Node, Route Decision, Retrieve Content, Generate Answer로 적어 하위 탐색 자리에 Route Decision을 놓는다. 두 목록이 같은 그래프를 가리키는지 여부는 README만으로 확정되지 않는다.
- **backtrack의 근거 부족**: 실행 흐름 블록의 Route Decision 설명에만 backtrack이 등장하고, 구현 구성 요소 목록에는 되돌아가기에 해당하는 단계가 없다. 잘못 내려간 경우의 복구 절차는 README에서 확인되지 않는다.
- **단계 수 표기의 흔들림**: 동작 설명을 "두 단계"로 예고한 뒤 실제로는 네 단계로 서술한다.
- **정량 근거 부족**: 표준 벤치마크가 없고, 인용된 지연 15.60초와 LLM 호출 4회도 단일 실행 추적이라 반복 측정이나 분산이 없다.
- **라이선스 미확인**: README 본문에 라이선스 조항이 없다. 재사용 시 저장소의 LICENSE 파일을 직접 확인해야 한다.

### 5-4. README가 제시하는 개선 방향

- 탐색 프롬프트를 명확하게 설계한다. `should_descend`의 정의 한 줄이 결과를 좌우한다
- 로깅을 개선의 근거로 쓴다
- 콘텐츠 구성 자체를 시스템 설계의 일부로 다룬다

---

## 6. 관련 연구 (Related Work)

### README가 인용한 참고 자료

- PageIndex Framework (Vectorless RAG), `https://github.com/VectifyAI/PageIndex`
- Vectorless RAG, `https://www.geeksforgeeks.org/artificial-intelligence/vectorless-rag-pageindex/`
- Bigtable: A Distributed Storage System for Structured Data (데모 대상 논문)
- Alpha Iterations Vectorless RAG Repo (원본 코드 베이스)

### wiki 내 인접 페이지

- [[database/zhang-2025-pageindex-vectorless-reasoning-rag]]: PageIndex 팀이 vectorless RAG 개념을 소개한 글
- [[database/vectifyai-pageindex]]: README가 링크한 PageIndex OSS 구현체. 이 저장소가 쓰지 않기로 한 기성 솔루션이다
- [[database/geeksforgeeks-2026-vectorless-rag-pageindex]]: README의 참고 자료 목록에 있는 PageIndex 튜토리얼
- [[database/kalane-2026-pageindex-threw-out-vector-databases]]: PageIndex에 대한 제3자 리뷰
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]]: 임베딩 없이 corpus를 직접 다루는 다른 방향의 연구
- [[applications/pandey-2026-rag-is-no-longer-just]]: RAG 설계 공간 정리. 이 구현은 그중 agentic 방향에 해당한다

---

## 7. 용어집 (Glossary)

- **vectorless RAG**: 임베딩과 유사도 검색에 의존하지 않고 문서 구조를 따라가며 단계별로 추론해 다음에 볼 위치를 정하는 retrieval 방식. README는 reasoning-based retrieval을 같은 뜻의 별칭으로 쓴다.
- **DocumentTree**: PDF를 제목 계층으로 옮긴 트리 자료구조. 이 저장소의 트리 생성 단계가 내놓는 결과물이며 탐색, 쿼리, 추론의 대상이 된다.
- **`should_descend`**: 분석 단계가 내놓는 판단값. 현재 노드에 머물러 콘텐츠를 뽑을지 자식 노드로 내려갈지를 정한다. README는 이 값의 정의를 바꾸는 것만으로도 결과가 크게 달라진다고 적는다.
- **`heading_type`**: 노드 제목의 분류를 담는 필드. 제목은 번호 매김, 로마 숫자, 번호 없음 등으로 나뉘며 Bigtable 예시에서는 `unknown`으로 채워져 있다.
- **`pymupdf4llm`**: PyMuPDF를 기반으로 만든 경량 라이브러리. 제목과 구조를 유지한 채 PDF 콘텐츠를 마크다운으로 추출한다.
- **navigate 호출과 answer 호출**: 실행 추적이 LLM 호출을 나누는 두 종류. 탐색 결정에 쓰인 호출이 navigate, 최종 답변 생성에 쓰인 호출이 answer다.
