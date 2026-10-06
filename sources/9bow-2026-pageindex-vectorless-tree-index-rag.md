---
title: "PageIndex: 벡터 DB와 청킹 없이 LLM 추론으로 문서를 검색하는 계층형 인덱스 기반 RAG 시스템"
type: article
year: 2026
category: database
raw_path: raw/articles/9bow-2026-pageindex-vectorless-tree-index-rag.md
raw_filename: "9bow-2026-pageindex-vectorless-tree-index-rag.md"
source_collection: external
author: "9bow (박정환)"
url: "https://discuss.pytorch.kr/t/pageindex-db-llm-rag/9579"
publisher: "PyTorch Korea User Group Discuss"
publication_date: "2026-04-07"
extractor_tier: "chrome"
tags: [pageindex, vectorless-rag, reasoning-based-rag, tree-index, rag, korean-summary, article, vectifyai]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/9bow-2026-pageindex-vectorless-tree-index-rag/fig01.jpg
    raw: raw/articles/9bow-2026-pageindex-vectorless-tree-index-rag-figures/fig01.jpg
    caption: "PageIndex 공식 배너와 네 가지 표어"
    strategy: fetched
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/9bow-2026-pageindex-vectorless-tree-index-rag/fig02.jpg
    raw: raw/articles/9bow-2026-pageindex-vectorless-tree-index-rag-figures/fig02.jpg
    caption: "PageIndex 제품 소개 일러스트, 긴 문서에서 답을 뽑는 흐름을 그림으로 표현한다"
    strategy: fetched
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/9bow-2026-pageindex-vectorless-tree-index-rag/fig03.png
    raw: raw/articles/9bow-2026-pageindex-vectorless-tree-index-rag-figures/fig03.png
    caption: "PageIndex workflow 도식, 문서에서 트리를 만들고 질의를 받아 LLM이 그 트리를 탐색해 답을 낸다"
    strategy: fetched
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/9bow-2026-pageindex-vectorless-tree-index-rag/page-full.png
    raw: raw/articles/9bow-2026-pageindex-vectorless-tree-index-rag-figures/page-full.png
    caption: "원문 게시글 전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/9bow-2026-pageindex-vectorless-tree-index-rag/crop01.png
    raw: raw/articles/9bow-2026-pageindex-vectorless-tree-index-rag-figures/crop01.png
    caption: "본문에 걸린 배너 영역 크롭, fig01과 같은 이미지의 저해상도 사본"
    strategy: crop
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/9bow-2026-pageindex-vectorless-tree-index-rag/crop02.png
    raw: raw/articles/9bow-2026-pageindex-vectorless-tree-index-rag-figures/crop02.png
    caption: "본문에 걸린 제품 소개 일러스트 영역 크롭, fig02와 같은 이미지의 저해상도 사본"
    strategy: crop
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/9bow-2026-pageindex-vectorless-tree-index-rag/crop03.png
    raw: raw/articles/9bow-2026-pageindex-vectorless-tree-index-rag-figures/crop03.png
    caption: "본문에 걸린 workflow 도식 영역 크롭, fig03과 같은 이미지의 저해상도 사본"
    strategy: crop
    curated: false
---

## 한 줄 요약 (One-line Summary)

PyTorch Korea User Group 운영자 9bow(박정환)가 2026-04-07에 게시한 PageIndex 한국어 소개글이다. VectifyAI가 공개한 vectorless RAG 프로젝트를 문제 제기, vector 기반 RAG와의 비교표, 2단계 동작 원리, 설치와 사용법, 라이선스 순으로 정리한다. 글이 제시하는 정량 수치는 FinanceBench 98.7% 하나이고, 설치 절차는 `requirements.txt`와 `run_pageindex.py`를 쓰는 2026년 4월 시점의 CLI 방식이다. 글 말미에 명시된 대로 본문은 GPT 모델로 정리한 2차 자료이므로, 정밀한 인용은 저장소 README와 PageIndex 팀의 소개글을 우선한다.

## 1. 자료 정보 (Document Information)

- **제목**: "PageIndex: 벡터 DB와 청킹 없이 LLM 추론으로 문서를 검색하는 계층형 인덱스 기반 RAG 시스템" <!-- lint-terms: ignore 원문 제목 직접 인용 -->
- **저자**: 9bow (박정환). PyTorch Korea User Group 운영자다.
- **게시일**: 2026-04-07
- **게시판**: discuss.pytorch.kr의 "읽을거리&정보공유" 카테고리
- **원문 URL**: https://discuss.pytorch.kr/t/pageindex-db-llm-rag/9579
- **분량**: 본문 약 4,900자. 도식 3장과 코드 블록 1개를 포함한다.
- **대상 자료**: VectifyAI의 오픈소스 프로젝트 PageIndex (`https://github.com/VectifyAI/PageIndex`)
- **자료 성격**: 글 마지막 문단이 "이 글은 GPT 모델로 정리한 글을 바탕으로 한 것으로, 원문의 내용 또는 의도와 다르게 정리된 내용이 있을 수 있습니다"라고 밝힌다. 즉 원 저작물의 번역이 아니라 모델이 요약한 2차 자료다.

> 수집 메모. 이 글은 Discourse 기반 게시판에 있어 기본 수집 경로로는 본문이 200자 정도만 잡힌다. `scripts/fetch_article.py`를 감싸 본문 렌더 완료를 기다리는 래퍼로 다시 받아 전문 4,941자를 확보했다. 원문의 비교 표는 HTML `<table>`이라 마크다운 변환에서 행과 열 구분이 사라졌고, 셀 내용을 바꾸지 않고 구분자만 복원했다.

## 2. 주요 기여 (Key Contributions)

1. **PageIndex의 문제 의식을 한국어로 정리한다.** 글은 RAG의 가장 큰 도전을 "문서를 어떻게 분할하고 검색할 것인가"로 규정하고, 기존 vector 기반 RAG가 문서를 임의 크기로 잘라 임베딩으로 바꾸는 과정에서 자연스러운 문서 구조를 무시하고 의미적으로 연관된 내용을 단절시킨다고 지적한다.
2. **vector 기반 RAG와 PageIndex를 다섯 항목으로 대조한 표를 제공한다.** 인덱싱 방식, 검색 방식, vector database 필요 여부, 문서 구조 보존, FinanceBench 정확도를 나란히 놓는다.
3. **2단계 동작 원리를 서술한다.** 계층형 트리 인덱스 구축 단계와 추론 기반 검색 단계로 나누고, 각 단계에서 LLM이 무엇을 하는지 설명한다.
4. **2026년 4월 시점의 설치와 실행 명령을 기록한다.** `pip3 install --upgrade -r requirements.txt`, `python3 run_pageindex.py --pdf_path`, `python3 examples/agentic_vectorless_rag_demo.py` 세 명령을 하나의 코드 블록에 담는다.
5. **저장소에 포함된 예제의 종류를 정리한다.** `cookbook/` 디렉토리의 노트북 세 종류와 `.claude/commands/` 디렉토리의 Claude 연동 명령을 언급한다.
6. **관련 글 목록으로 국내 RAG 자료와 연결한다.** 같은 게시판의 PageIndex MCP 소개글을 포함해 일곱 편을 "더 읽어보기"로 제시한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 제기

글의 출발점은 chunking이 만드는 손실이다. 기존 vector 기반 RAG는 문서를 임의의 크기로 분할한 뒤 임베딩 벡터로 변환해 검색하는데, 이 과정에서 자연스러운 문서 구조가 무시되고 의미적으로 연관된 내용이 단절된다고 설명한다.

PageIndex는 이 문제를 "근본적으로 다른 방식"으로 해결한다고 소개한다. vector database를 전혀 사용하지 않고 LLM의 추론 능력으로 사람과 유사하게 문서를 검색하는 시스템이라는 것이다.

글은 PageIndex가 제안하는 패러다임의 이름을 "Reasoning-based RAG(추론 기반 RAG)"로 적고, 핵심 아이디어를 문서를 목차와 유사한 계층형 트리 구조로 인덱싱한 뒤 검색 시 LLM이 그 트리를 탐색하게 하는 것으로 요약한다.

### 3.2 vector 기반 RAG와의 비교

원문이 제시한 비교 표는 다섯 행이다.

| 항목 | vector 기반 RAG | PageIndex |
|---|---|---|
| 인덱싱 방식 | chunking과 임베딩 벡터화 | 계층형 트리 인덱스 |
| 검색 방식 | 벡터 유사도 계산 | LLM 추론 기반 트리 탐색 |
| vector database 필요 | 필수 | 불필요 |
| 문서 구조 보존 | chunking으로 인해 파괴 가능 | 자연스러운 구조 유지 |
| FinanceBench 정확도 | 시스템별 상이 | 98.7% |

표 아래 문단은 두 방식의 차이를 사람의 독해에 빗댄다. PageIndex는 문서의 자연스러운 구조를 유지하면서 사람이 목차를 보고 원하는 챕터를 찾아가는 방식과 유사하게 동작하며, 복잡한 금융 문서, 법률 문서, 학술 논문처럼 구조화된 정보를 다룰 때 이점이 크다고 적는다.

표의 FinanceBench 행에서 vector 기반 RAG 칸이 "시스템별 상이"로 비어 있다는 점에 유의한다. 즉 이 표는 98.7%의 대조군 수치를 제시하지 않는다.

### 3.3 2단계 동작 원리

| 단계 | 이름 | 글이 설명하는 동작 |
|---|---|---|
| 1 | 계층형 트리 인덱스 구축 | 문서가 입력되면 LLM이 구조를 분석해 목차와 유사한 계층형 트리를 만든다. 각 노드는 특정 섹션이나 개념 단위에 대응하고 부모와 자식 관계로 연결된다. 임의적인 chunking 대신 섹션, 단락, 절 같은 자연스러운 경계를 존중한다 |
| 2 | 추론 기반 검색 | 사용자가 질의(query)를 입력하면 LLM이 구축된 트리를 탐색하며 관련 정보를 찾는다. 벡터 유사도 점수 대신 LLM의 이해와 추론에 기반하며, 결과적으로 문맥이 보존된 정보가 반환된다 |

글은 두 번째 단계를 사람이 책의 목차를 보고 원하는 챕터를 선택하는 방식에 비유한다. 두 단계의 분리가 비용 구조에서 갖는 의미, 예를 들어 트리를 한 번 만들어 두고 질의마다 재사용한다는 점은 이 글에서 다루지 않는다.

### 3.4 설치와 실행

글이 싣는 코드 블록은 세 명령으로 구성된다.

```bash
# 의존성 설치
pip3 install --upgrade -r requirements.txt

# PDF 문서 인덱싱 및 검색 실행
python3 run_pageindex.py --pdf_path /path/to/document.pdf

# 에이전트 기반 RAG 데모 실행
python3 examples/agentic_vectorless_rag_demo.py
```

이 절차는 저장소를 클론해 쓰는 자체 호스팅 방식이다. 글은 API 키 설정이나 선택 인자는 다루지 않고, 세 명령만 제시한다.

### 3.5 저장소에 포함된 예제

| 위치 | 내용 |
|---|---|
| `cookbook/` | Jupyter Notebook 형태의 사용 예시. OpenAI Agents SDK와 통합한 에이전트 기반 vectorless RAG, OCR 없이 이미지를 직접 처리하는 vision 기반 RAG, 최소 코드로 동작하는 simple RAG 세 종류를 든다 |
| `.claude/commands/` | Claude 연동 명령이 들어 있어 Claude와의 연동을 설정할 수 있다고 적는다 |

`.claude/commands/` 언급은 저장소 README에는 없는 정보다. 글쓴이가 저장소 파일 구조까지 확인했음을 보여주는 대목이다.

### 3.6 제공 형태와 공식 채널

프로젝트가 자체 호스팅 패키지 형태로 제공되며 클라우드 서비스와 엔터프라이즈 배포 선택지도 지원한다고 적는다. 공식 홈페이지 `pageindex.ai`, 문서 사이트 `docs.pageindex.ai`, 대화형 데모 `chat.pageindex.ai`를 안내한다.

라이선스는 MIT로 공개되어 개인과 상업적 목적 모두 자유롭게 사용, 수정, 배포할 수 있다고 밝힌다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

| 항목 | 값 | 글이 붙인 조건 |
|---|---|---|
| FinanceBench 정확도 | 98.7% | "달성했다고 보고되어 있으며"라는 전언 형식으로 적는다. 기존 vector 기반 RAG와 비교해 주목할 만한 성과라고 평가한다 |

글이 제시하는 정량 근거는 이 한 줄뿐이다. 측정 주체, 측정 대상 시스템, 대조군 수치, 재현 절차는 모두 언급되지 않는다. 저장소 README를 보면 이 수치의 측정 대상은 PageIndex 자체가 아니라 PageIndex를 retrieval 층으로 쓰는 Mafin 2.5이고 보고 주체는 VectifyAI 자신이므로, 이 글만으로 수치를 인용하면 측정 조건이 빠진다.

인덱싱 비용, 질의 비용, 처리 시간 같은 운영 지표는 이 글에 없다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **2차 자료다.** 글 말미가 GPT 모델로 정리한 글임을 명시한다. 원문의 내용이나 의도와 다르게 정리된 부분이 있을 수 있다고 스스로 밝힌다.
- **시점이 2026년 4월에 고정돼 있다.** 글이 기록한 설치 절차는 `requirements.txt`와 `run_pageindex.py`를 쓰는 CLI 방식인데, 저장소 README는 2026년 8월에 `pip install -U pageindex` SDK 중심으로 개편됐다. 현재 저장소를 그대로 따라 하면 글의 명령과 일치하지 않는다.
- **98.7%의 측정 조건이 빠져 있다.** 어떤 시스템이 어떤 설정에서 낸 수치인지, 대조군이 무엇인지 글에 없다.
- **트리 노드의 구조가 제시되지 않는다.** 각 노드가 제목, 식별자, 위치 범위, 요약을 갖는다는 README의 스키마는 이 글에 나오지 않는다.
- **자체 호스팅과 클라우드의 품질 차이를 다루지 않는다.** README가 세 곳에서 반복하는 주의, 즉 오픈소스 코드는 standard PDF parsing만 쓰고 복잡한 PDF에는 클라우드 서비스를 권한다는 안내가 글에는 없다.
- **본문에 걸린 세 도식 가운데 두 장은 제품 홍보 이미지다.** 기술적 내용을 담은 것은 workflow 도식 한 장이다.
- **원문의 공식 링크 절 세 개가 비어 있다.** "PageIndex 공식 홈페이지", "PageIndex 문서 사이트", "PageIndex 프로젝트 GitHub 저장소"는 Discourse의 링크 카드로 렌더링되어 수집본에는 제목만 남았다. 세 곳의 주소는 본문 다른 문단에 그대로 적혀 있다.

## 6. 관련 연구 (Related Work)

- **저장소 README** (`sources/vectifyai-pageindex.md`). 이 글이 소개하는 대상이다. 글이 2026년 4월의 CLI 방식을 기록한 반면 README는 2026년 8월 SDK 개편 이후의 상태를 담는다.
- **PageIndex 팀 소개글** (`sources/zhang-2025-pageindex-vectorless-reasoning-rag.md`). 설계 동기와 철학의 1차 자료다.
- **PageIndex Cloud 튜토리얼** (`sources/geeksforgeeks-2026-vectorless-rag-pageindex.md`). 이 글이 다루지 않는 클라우드 API 사용법을 코드 예제로 보인다.
- **3자 리뷰** (`sources/kalane-2026-pageindex-threw-out-vector-databases.md`). 같은 98.7%를 외부 시각에서 검토한다.
- **한글 학습용 직접 구현** (`sources/sguys99-langchain-study-vectorless-rag.md`). PageIndex API 없이 문서 트리를 직접 만들어 같은 아이디어를 재현한 코드다.
- **같은 게시판의 PageIndex MCP 소개글**. 글의 "더 읽어보기" 첫 항목이며 PageIndex를 MCP 서버로 쓰는 쪽을 다룬다. 이 wiki에 미수록이다.
- **더 읽어보기의 나머지 여섯 편**. Agentic RAG for Dummies, ApeRAG, Morphik Core, nano-GraphRAG, PDF GPT Indexer, Trieve로, 모두 같은 게시판의 RAG 관련 글이다. 이 wiki에 미수록이다.

## 7. 용어집 (Glossary)

- **vectorless RAG**: vector database와 임베딩 유사도 검색 없이 LLM의 추론으로 retrieval을 수행하는 방식. 글은 이를 "추론 기반 RAG"라는 패러다임 이름과 함께 소개한다.
- **계층형 트리 인덱스**: 문서를 목차와 유사한 계층 구조로 인덱싱한 결과물. 각 노드가 섹션이나 개념 단위에 대응하고 부모와 자식 관계로 연결된다.
- **추론 기반 검색**: 벡터 유사도 점수 대신 LLM의 이해와 추론으로 트리를 탐색해 관련 구간을 고르는 단계.
- **FinanceBench**: 재무 문서 질의응답 벤치마크. 글은 PageIndex가 98.7%를 달성했다고 보고되어 있다고만 적고 벤치마크의 구성은 설명하지 않는다.
- **Mafin 2.5**: 글에는 등장하지 않지만 98.7%의 실제 측정 대상인 VectifyAI의 재무 문서 분석 시스템. 저장소 README가 밝힌다.

## 8. 그림 후보 (Figure Candidates)

본문 이미지 3장을 원본 해상도로 내려받고, 전체 페이지 스크린샷 1장과 영역 크롭 3장을 함께 보관했다. 크롭 3장은 본문 이미지와 같은 대상의 저해상도 사본이다.

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | PageIndex 공식 배너와 네 가지 표어 | fetched | (선택) 표어가 프로젝트 성격을 압축하지만 정보량은 적다 |
| fig02 | PageIndex 제품 소개 일러스트 | fetched | (제외 권장) 제품 홍보 이미지다 |
| fig03 | PageIndex workflow 도식 | fetched | ★ wiki 권장 (method) 문서에서 트리를 만들고 질의를 받아 탐색하는 2단계를 한 장에 담는다 |
| fig04 | 원문 게시글 전체 페이지 스크린샷 | screenshot | (제외 권장) 수집 확인용이다 |
| fig05 | 배너 영역 크롭 | crop | (제외 권장) fig01과 중복이다 |
| fig06 | 제품 소개 일러스트 영역 크롭 | crop | (제외 권장) fig02와 중복이다 |
| fig07 | workflow 도식 영역 크롭 | crop | (제외 권장) fig03과 중복이고 해상도가 낮다 |
