---
title: "PageIndex: 벡터 DB와 청킹 없이 LLM 추론으로 문서를 검색하는 계층형 인덱스 기반 RAG 시스템 - 읽을거리&정보공유 - PyTorchKR"
type: article
year: 2026
category: database
raw_path: raw/articles/9bow-2026-pageindex-vectorless-tree-index-rag.md
raw_filename: "9bow-2026-pageindex-vectorless-tree-index-rag.md"
source_collection: external
author: "9bow (박정환)"
url: "https://discuss.pytorch.kr/t/pageindex-db-llm-rag/9579"
publisher: "discuss.pytorch.kr"
publication_date: "2026-04-07T06:30:43+00:00"
fetched_at: "2026-10-06T22:34:10+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/9bow-2026-pageindex-vectorless-tree-index-rag/fig01.jpg
    raw: raw/articles/9bow-2026-pageindex-vectorless-tree-index-rag-figures/fig01.jpg
    caption: "PageIndex: 벡터 DB와 청킹 없이 LLM 추론으로 문서를 검색하는 계층형 인덱스 기반 RAG 시스템"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/9bow-2026-pageindex-vectorless-tree-index-rag/fig02.jpg
    raw: raw/articles/9bow-2026-pageindex-vectorless-tree-index-rag-figures/fig02.jpg
    caption: "image"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/9bow-2026-pageindex-vectorless-tree-index-rag/fig03.png
    raw: raw/articles/9bow-2026-pageindex-vectorless-tree-index-rag-figures/fig03.png
    caption: "PageIndex Workflow"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/9bow-2026-pageindex-vectorless-tree-index-rag/page-full.png
    raw: raw/articles/9bow-2026-pageindex-vectorless-tree-index-rag-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig05
    file: assets/9bow-2026-pageindex-vectorless-tree-index-rag/crop01.png
    raw: raw/articles/9bow-2026-pageindex-vectorless-tree-index-rag-figures/crop01.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig06
    file: assets/9bow-2026-pageindex-vectorless-tree-index-rag/crop02.png
    raw: raw/articles/9bow-2026-pageindex-vectorless-tree-index-rag-figures/crop02.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig07
    file: assets/9bow-2026-pageindex-vectorless-tree-index-rag/crop03.png
    raw: raw/articles/9bow-2026-pageindex-vectorless-tree-index-rag-figures/crop03.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

![PageIndex: 벡터 DB와 청킹 없이 LLM 추론으로 문서를 검색하는 계층형 인덱스 기반 RAG 시스템](https://discuss.pytorch.kr/uploads/default/optimized/3X/0/1/0176c8fe1950beda792d5634adf9bf7fd64795a8_2_1028x620.jpeg)

PageIndex: 벡터 DB와 청킹 없이 LLM 추론으로 문서를 검색하는 계층형 인덱스 기반 RAG 시스템1680×1014 140 KB

## PageIndex 소개

검색 증강 생성(RAG, Retrieval-Augmented Generation) 시스템의 가장 큰 도전 중 하나는 문서를 어떻게 분할하고 검색할 것인가의 문제입니다. 기존의 벡터 기반 RAG 시스템은 문서를 임의의 크기로 분할(청킹, Chunking)한 뒤 임베딩 벡터로 변환하여 검색하는 방식을 사용합니다. 그러나 이 방식은 자연스러운 문서 구조를 무시하고, 의미적으로 연관된 내용을 단절시키는 문제를 내포하고 있습니다. PageIndex는 이 문제를 근본적으로 다른 방식으로 해결합니다. 벡터 데이터베이스를 전혀 사용하지 않고, LLM의 추론 능력을 활용하여 인간과 유사한 방식으로 문서를 검색하는 시스템입니다.

PageIndex는 VectifyAI 팀이 개발한 오픈소스 프로젝트로, "Reasoning-based RAG(추론 기반 RAG)"라는 새로운 패러다임을 제안합니다. 핵심 아이디어는 문서를 목차(Table of Contents)와 유사한 계층형 트리 구조로 인덱싱하고, 실제 검색 시 LLM이 이 트리를 탐색하며 필요한 정보를 찾아내도록 하는 것입니다. 이를 통해 벡터 유사도 계산에 의존하지 않고도 문서의 의미적 구조를 보존한 채 정밀한 검색이 가능합니다. FinanceBench 벤치마크에서 98.7%의 정확도를 달성했다고 보고되어 있으며, 이는 기존 벡터 기반 RAG 시스템들과 비교했을 때 주목할 만한 성과입니다.

![image](https://discuss.pytorch.kr/uploads/default/original/3X/9/2/92c9aa976eda6db30046a3c2bf3ca4166a5bfec2.jpeg)

image1028×579 70.3 KB

PageIndex 프로젝트는 자체 호스팅(Self-hosted) 패키지 형태로 제공되며, 클라우드 서비스와 엔터프라이즈 배포 옵션도 지원합니다. 공식 홈페이지(pageindex.ai)와 문서 사이트(docs.pageindex.ai)도 운영 중이며, 대화형 데모 서비스(chat.pageindex.ai)를 통해 직접 시스템을 체험해볼 수 있습니다.

## 기존 벡터 RAG와의 비교

| 항목 | 벡터 기반 RAG | PageIndex |
|---|---|---|
| 인덱싱 방식 | 청킹 + 임베딩 벡터화 | 계층형 트리 인덱스 |
| 검색 방식 | 벡터 유사도 계산 | LLM 추론 기반 트리 탐색 |
| 벡터 DB 필요 | 필수 | 불필요 |
| 문서 구조 보존 | 청킹으로 인해 파괴 가능 | 자연스러운 구조 유지 |
| FinanceBench 정확도 | (시스템별 상이) | 98.7% |

기존 벡터 RAG는 문서를 일정 크기로 잘라내는 청킹 과정에서 문맥이 단절되는 문제가 빈번히 발생합니다. 반면 PageIndex는 문서의 자연스러운 구조를 유지하면서 인간이 목차를 보고 원하는 챕터를 찾아가는 방식과 유사하게 동작합니다. 이는 특히 복잡한 금융 문서, 법률 문서, 학술 논문처럼 구조화된 정보를 다룰 때 큰 이점을 발휘합니다.

## PageIndex의 핵심 동작 원리

![PageIndex Workflow](https://discuss.pytorch.kr/uploads/default/optimized/3X/6/4/64d286b4ea9a2390b37ba79f587b4cce51866b5f_2_1028x473.png)

PageIndex Workflow1784×822 80 KB

PageIndex의 핵심은 두 단계로 구성됩니다. 첫 번째는 계층형 트리 인덱스 구축 단계입니다. 문서가 입력되면 LLM이 문서의 구조를 분석하여 목차와 유사한 계층형 트리를 생성합니다. 각 노드는 문서의 특정 섹션이나 개념 단위에 해당하며, 부모-자식 관계로 연결되어 전체적인 의미 구조를 반영합니다. 이 과정에서 임의적인 청킹 대신 문서의 자연스러운 경계(섹션, 단락, 절 등)를 존중합니다.

두 번째는 추론 기반 검색 단계입니다. 사용자가 질문을 입력하면 LLM이 구축된 트리를 탐색하며 관련 정보를 찾아냅니다. 이 과정은 사람이 책의 목차를 보고 원하는 챕터를 선택하는 방식과 유사하며, 벡터 유사도 스코어 대신 LLM의 이해와 추론 능력에 기반합니다. 결과적으로 문맥이 보존된 정확한 정보가 반환됩니다.

## PageIndex의 설치 및 사용법

```
# 의존성 설치

pip3 install --upgrade -r requirements.txt

# PDF 문서 인덱싱 및 검색 실행

python3 run_pageindex.py --pdf_path /path/to/document.pdf

# 에이전트 기반 RAG 데모 실행

python3 examples/agentic_vectorless_rag_demo.py
```

cookbook/ 디렉토리에는 다양한 사용 예시가 Jupyter Notebook 형태로 제공됩니다. 주목할 만한 예시들로는 OpenAI Agents SDK와 통합한 에이전트 기반 Vectorless RAG, OCR 없이 이미지를 직접 처리하는 Vision 기반 RAG, 그리고 최소한의 코드로 동작하는 Simple RAG Notebook이 있습니다. 또한 .claude/commands/ 디렉토리에는 Claude 통합 명령어들이 포함되어 있어 Claude와의 연동도 손쉽게 설정할 수 있습니다.

## 라이선스

PageIndex는 MIT 라이선스로 공개되어 있어 개인 및 상업적 목적으로 자유롭게 사용, 수정, 배포할 수 있습니다.

## PageIndex 공식 홈페이지

## PageIndex 문서 사이트

## PageIndex 프로젝트 GitHub 저장소

## 더 읽어보기

- 

[PageIndex MCP: 긴 PDF 문서를 단계적 추론 및 트리 탐색으로 읽는 Vectorless MCP](https://discuss.pytorch.kr/t/pageindex-mcp-pdf-vectorless-mcp/7804)

- 

[Agentic RAG for Dummies: Agentic 기반 RAG 시스템을 이해하고 구축할 수 있도록 돕는 오픈소스 프로젝트 (feat. LangGraph)](https://discuss.pytorch.kr/t/agentic-rag-for-dummies-agentic-rag-feat-langgraph/8783)

- 

[ApeRAG: GraphRAG와 멀티모달 검색을 결합한 오픈소스 RAG 플랫폼](https://discuss.pytorch.kr/t/aperag-graphrag-rag/7737)

- 

[Morphik Core: 인공지능을 위한 확장 가능한 Multimodal RAG 플랫폼](https://discuss.pytorch.kr/t/morphik-core-multimodal-rag/6673)

- 

[nano-GraphRAG: 간단하고 수정이 용이한 GraphRAG 구현체](https://discuss.pytorch.kr/t/nano-graphrag-graphrag/5071)

- 

[PDF GPT Indexer: 로컬에서 동작하는, PDF 문서 인덱싱 및 자연어 질의가 가능한 RAG 프로젝트](https://discuss.pytorch.kr/t/pdf-gpt-indexer-pdf-rag/8163)

- 

[Trieve: 검색, 추천, RAG를 위한 단일 API 솔루션](https://discuss.pytorch.kr/t/trieve-rag-api/5586)

---

이 글은 GPT 모델로 정리한 글을 바탕으로 한 것으로, 원문의 내용 또는 의도와 다르게 정리된 내용이 있을 수 있습니다. 관심있는 내용이시라면 원문도 함께 참고해주세요! 읽으시면서 어색하거나 잘못된 내용을 발견하시면 덧글로 알려주시기를 부탁드립니다.

![:hugs:](https://discuss.pytorch.kr/images/emoji/fluentui/hugs.png?v=15)

![:pytorch:](https://discuss.pytorch.kr/uploads/default/original/2X/f/fa98c2196c22febe7475e503792febf39ba7a0de.svg?v=15)

파이토치 한국 사용자 모임

![:south_korea:](https://discuss.pytorch.kr/images/emoji/fluentui/south_korea.png?v=15)

이 정리한 이 글이 유용하셨나요? [회원으로 가입](https://discuss.pytorch.kr/signup)하시면 주요 글들을 이메일

![:love_letter:](https://discuss.pytorch.kr/images/emoji/fluentui/love_letter.png?v=15)

로 보내드립니다! (기본은 Weekly지만 [Daily로 변경도 가능](https://discuss.pytorch.kr/my/preferences/emails)합니다.)

![:wrapped_gift:](https://discuss.pytorch.kr/images/emoji/fluentui/wrapped_gift.png?v=15)

 아래

![:down_right_arrow:](https://discuss.pytorch.kr/images/emoji/fluentui/down_right_arrow.png?v=15)

쪽에 좋아요

![:+1:](https://discuss.pytorch.kr/images/emoji/fluentui/+1.png?v=15)

를 눌러주시면 새로운 소식들을 정리하고 공유하는데 힘이 됩니다~ 

![:star_struck:](https://discuss.pytorch.kr/images/emoji/fluentui/star_struck.png?v=15)
