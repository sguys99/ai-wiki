---
title: "VectifyAI/PageIndex"
type: repo
year: 2025
category: database
raw_path: raw/repos/vectifyai-pageindex.md
raw_filename: "vectifyai-pageindex.md"
source_collection: external
tags: [rag, vectorless-rag, reasoning-based-rag, tree-index, long-document, llm, pdf, agentic-rag, litellm, sdk, pageindex-flash]
org: "VectifyAI"
repo: "PageIndex"
url: "https://github.com/VectifyAI/PageIndex"
license: "MIT"
fetched_at: "2026-10-06"
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/vectifyai-pageindex/fig01.png
    raw: https://docs.pageindex.ai/images/cookbook/vectorless-rag.png
    caption: "PageIndex의 vectorless RAG 흐름도, 문서에서 트리를 만들고 질의를 받아 LLM이 그 트리를 탐색해 답을 낸다"
    strategy: manual
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/vectifyai-pageindex/fig02.png
    raw: https://raw.githubusercontent.com/VectifyAI/PageIndex/main/assets/index-cost-light.png
    caption: "문서 길이별 로컬 인덱싱 비용, 9쪽에서 1,098쪽까지 PDF 9건이 쪽당 0.0011달러 기준선을 따른다"
    strategy: manual
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/vectifyai-pageindex/fig03.png
    raw: https://raw.githubusercontent.com/VectifyAI/PageIndex/main/assets/index-time-light.png
    caption: "문서 길이별 로컬 인덱싱 시간, 같은 PDF 9건이 약 13초에서 4.5분 사이에 끝난다"
    strategy: manual
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/vectifyai-pageindex/fig04.png
    raw: https://raw.githubusercontent.com/VectifyAI/PageIndex/main/assets/results-light.png
    caption: "질의당 평균 비용 대비 정확도, 모델 3개와 reasoning effort 4단계의 조합을 로그 축에 올렸다"
    strategy: manual
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/vectifyai-pageindex/fig05.png
    raw: https://raw.githubusercontent.com/VectifyAI/PageIndex/main/assets/query-cost-light.png
    caption: "질의 한 건의 비용 비교, PDF를 통째로 넣는 쪽이 52쪽에서 2.1배, 420쪽에서 16.6배가 된다"
    strategy: manual
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/vectifyai-pageindex/fig06.png
    raw: https://raw.githubusercontent.com/VectifyAI/PageIndex/main/assets/financebench-light.png
    caption: "FinanceBench 정확도 비교, PageIndex 98.7%와 vector RAG 50%를 막대 두 개로 보인다"
    strategy: manual
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/vectifyai-pageindex/fig07.png
    raw: https://github.com/user-attachments/assets/bae02956-6c4e-4a0b-adea-257b0be4aaa1
    caption: "저장소 최상단 배너 이미지, 제품 소개 페이지로 연결된다"
    strategy: manual
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/vectifyai-pageindex/fig08.png
    raw: https://github.com/user-attachments/assets/eae4ff38-48ae-4a7c-b19f-eab81201d794
    caption: "후원 요청 절에 놓인 star 추이 이미지"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

PageIndex는 vector database와 chunking 없이 긴 문서를 목차 형태의 계층 트리로 바꾼 뒤 LLM이 그 트리를 추론으로 탐색해 관련 구간을 찾는 vectorless RAG 엔진이고, 이 저장소는 `pip install -U pageindex`로 설치하는 Python SDK의 공개 코드다. 2026년 8월 개편으로 로컬 실행과 PageIndex Cloud를 같은 클라이언트로 쓰는 구조가 되었고, README는 인덱싱 비용과 시간, 질의 비용 대비 정확도, PDF 직접 입력과의 비용 비교, FinanceBench 결과까지 네 묶음의 정량 근거를 싣는다.

## 1. 자료 정보 (Document Information)

- **저장소**: `VectifyAI/PageIndex` (https://github.com/VectifyAI/PageIndex)
- **패키지**: PyPI 배포명 `pageindex`, `pyproject.toml` 기준 버전 0.2.10, 설명은 "Python SDK for PageIndex, reasoning-based, vectorless document retrieval, cloud and local"이다. 작성자 필드는 "Ray <ray@vectify.ai>"다.
- **라이선스**: MIT. `LICENSE` 파일의 저작권 표기는 "Copyright (c) 2025 Vectify AI"다. README 하단 저작권 표기는 "© 2026 PageIndex AI"로, 2026-06 스냅샷의 "© 2026 Vectify AI"에서 바뀌었다.
- **실행 요구사항**: Python 3.10 이상. `pyproject.toml`의 classifiers는 3.10부터 3.13까지를 명시하고 개발 단계는 "3 - Alpha"다.
- **인용 요청**: Mingtian Zhang, Yu Tang and PageIndex Team, "PageIndex: Next-Generation Vectorless, Reasoning-based RAG", PageIndex Blog, Sep 2025. BibTeX의 `note` 필드가 `https://pageindex.ai/blog/pageindex-intro`를 가리킨다. 즉 인용 대상은 저장소가 아니라 블로그 글이다.
- **공식 채널**: 웹사이트 `pageindex.ai`, 클라우드 `developer.pageindex.ai`, 문서 `docs.pageindex.ai`, 블로그 `pageindex.ai/blog`, 문의 `pageindex.ai/contact`, 앱 `app.pageindex.ai`.
- **수집 범위**: 최상위 README 전문에 `LICENSE`, `requirements.txt`, `pyproject.toml`을 이어 붙였다. 패키지 내부 모듈과 함수 구현은 수집하지 않았다.

> 스냅샷 교체 주의. 이 자료의 raw는 2026-10-06 판이며, 2026-06-17 커밋 `0507ad0`이 저장한 이전 README를 교체한 것이다. 이전 판은 `run_pageindex.py` CLI와 선택 인자 일곱 개, 트리 노드 JSON 예시, Ecosystem 절(OpenKB, ChatIndex, ConDB, PageIndex MCP)을 싣고 있었고 현재 판에는 그 내용이 없다. 2026년 4월 이전에 쓰인 PageIndex 소개 자료는 CLI 방식을 전제하므로 현재 저장소와 명령이 일치하지 않는다.

## 2. 주요 기여 (Key Contributions)

1. **similarity와 relevance를 분리한 문제 제기.** vector 기반 RAG는 semantic similarity로 검색하지만 retrieval이 실제로 필요로 하는 것은 relevance이고 relevance에는 추론이 필요하다고 주장한다. 원문 표현은 "similarity ≠ relevance"다. 맥락 이해와 도메인 지식과 다단계 추론이 필요한 전문 문서에서 similarity 검색은 관련 있지만 닮지 않은 부분을 놓치고 닮았지만 관련 없는 부분을 가져온다고 설명한다.
2. **2단계 retrieval의 정식화.** Index 단계에서 문서마다 tree structure index를 만들고, Retrieve 단계에서 LLM 추론으로 그 트리를 agentic하게 탐색한다. README는 이 구성이 AlphaGo에서 영감을 받았다고 밝힌다.
3. **SDK 단일 클라이언트 제공.** `pip install -U pageindex`로 설치하고 `PageIndexClient`의 `index`와 `chat` 인자만 바꿔 로컬 실행과 PageIndex Cloud를 전환한다. 2026년 8월 Updates 항목이다.
4. **PageIndex Flash 도입.** 텍스트 기반 PDF를 빠르게 트리 인덱스로 만드는 방식이며 SDK local mode의 기본 인덱싱 방식이다. 2026년 8월 Updates 항목이다.
5. **로컬 실행의 비용과 시간 측정치 공개.** 인덱싱은 쪽당 약 0.001달러이고, 9쪽에서 1,098쪽까지의 PDF 9건이 약 13초에서 4.5분 사이에 끝났다고 보고한다.
6. **오픈소스 구성에 대한 재현 가능한 벤치마크 공개.** `PageIndex-OSS-Benchmark`가 quickstart와 같은 설정, 즉 local mode와 flash 인덱싱과 OCR 없음으로 PDF 34건 1,945쪽에서 뽑은 62개 질문을 측정한다.
7. **PDF 직접 입력과의 비용 비교.** 같은 답을 내는 문서에서 PDF를 통째로 모델에 넣는 쪽이 52쪽에서 2.1배, 420쪽에서 16.6배 비싸고, 805쪽에서는 context window를 넘어 아예 불가능하다고 보고한다.
8. **Local과 Cloud의 기능 경계 명시.** OCR과 이미지 이해, 메타데이터, 폴더, MCP 서버, 블록 단위 인용은 Cloud 전용이며 PageIndex File System도 Cloud 전용이라고 못박는다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 2단계 retrieval

README가 제시하는 절차는 두 단계다.

1. **Index**: 문서마다 tree structure index를 만든다.
2. **Retrieve**: LLM 추론으로 그 트리를 agentic하게 탐색한다.

README는 이 동작을 사람 전문가가 긴 보고서에서 맞는 절을 펼쳐 읽는 과정에 빗댄다. TL;DR 블록은 PageIndex를 "vectorless, reasoning-based RAG 엔진으로, 사람이 읽는 방식을 본떠 추적 가능하고 설명 가능하며 컨텍스트를 반영하는 retrieval을 제공하고 vector database나 chunking을 쓰지 않는다"로 요약한다.

두 단계는 비용 구조가 다르다. Index는 문서 분량에 비례하는 일회성 작업이고 결과 트리는 이후 질의마다 재사용된다. Retrieve는 트리와 질의만 보고 판단하므로 본문 전체를 모델에 넣지 않는다.

### 3.2 vector RAG와의 대조

README의 Compare with Vector RAG 표는 네 행이다.

| 기준 | Vector RAG | PageIndex |
|---|---|---|
| Index | vector index | tree index |
| Retrieval | semantic similarity 검색 | 트리 위에서의 LLM 추론 |
| Result | 불투명한 "vibe retrieval" | 명시적 참조로 추적 가능 |
| Context | 질의 임베딩만 | 대화 이력과 도메인 지식을 포함한 전체 컨텍스트 |

적합한 대상으로는 재무 보고서, 법률 문서, 규제 신고 서류, 기술 매뉴얼, 의학 문헌, 학술 교과서를 비롯해 길고 복잡한 전문 문서를 든다.

### 3.3 quickstart

설치와 실행은 두 블록이다.

```bash
pip install -U pageindex
```

```python
import os
from pageindex import PageIndexClient

os.environ["OPENAI_API_KEY"] = "your-openai-key"

client = PageIndexClient(
    index="gpt-5.6-luna",               # model to build the tree index
    chat="gpt-5.6-sol",                 # model to search the tree
)
doc_id = client.submit_document("report.pdf")["doc_id"]

answer = client.chat("What was the 2023 operating margin?", doc_id=doc_id)
print(answer)
```

인터페이스는 세 호출로 끝난다. 클라이언트를 만들고, 문서를 올려 `doc_id`를 받고, 그 `doc_id`에 질의한다.

### 3.4 모델 선택 지침

README는 `index`와 `chat`에 서로 다른 기준을 제시한다.

| 인자 | 권장 | README가 드는 이유 |
|---|---|---|
| `index` | 기본 수준 모델로 충분하다 | 트리 구조 자체는 LLM 없이 문서 레이아웃에서 추출하고, index 모델은 그 결과를 요약하고 다듬는 일만 한다 |
| `chat` | 감당할 수 있는 가장 좋은 모델 | chat 모델이 트리를 탐색해 정보를 찾는 주체다 |

이 지침은 Flash 인덱싱의 성격을 드러낸다. 구조 추출이 레이아웃 기반이므로 인덱싱 품질이 모델 성능에 크게 좌우되지 않고, 실제 실험에서도 기본 수준 모델이 품질을 떨어뜨리지 않았다고 밝힌다.

SDK 문서로 연결되는 항목에는 다른 모델 설정, 스트리밍, 여러 문서를 함께 검색하는 기능, 인용 생성이 있다. 에이전트 결합 쪽으로는 OpenAI Agents SDK, Claude Agent SDK, 그 밖의 프레임워크에 PageIndex 도구를 넣을 수 있다고 안내한다.

### 3.5 Local과 Cloud

클라우드 전환은 `PAGEINDEX_API_KEY`를 설정하고 `index`를 `"cloud"`로 바꾸는 것으로 끝난다. 문서 제출 시 `wait=True`를 주는 형태가 예시로 제시된다.

```python
client = PageIndexClient(
    index="cloud",                       # build and store the index in PageIndex Cloud
    chat="gpt-5.6-sol",                  # use your preferred compatible model for chat
)
doc_id = client.submit_document("report.pdf", wait=True)["doc_id"]
```

두 방식의 차이는 표로 정리된다.

| 항목 | Local | Cloud |
|---|---|---|
| 처리 대상 | 텍스트 기반 PDF | 텍스트 기반, 스캔본, 이미지가 많은 문서 |
| 인덱싱 | 사용자 기기에서 | PageIndex가 관리 |
| 저장 | 로컬 디렉토리 | 클라우드 저장소 |
| 인용 단위 | 페이지 단위 | 블록 단위 |
| OCR과 이미지 이해 | 없음 | 제공 |
| 메타데이터 | 없음 | 제공 |
| 폴더 | 없음 | 제공 |
| MCP 서버 | 없음 | 제공 |

chat과 retrieval 층은 Cloud에서도 사용자가 쓰는 모델과 호환된다고 밝힌다. 즉 클라우드로 옮기는 것은 파싱, OCR, 이미지 이해, 트리 인덱스 구축, 저장이고 답을 만드는 모델은 그대로 둔다.

PageIndex File System은 파일 단위 트리 인덱싱 층으로 corpus 전체를 대상으로 추론하게 한다고 소개되며, Cloud 전용임이 명시된다. 전용 배포(VPC나 온프레미스)는 문의와 데모 예약으로 안내한다.

### 3.6 패키지 의존성

`requirements.txt`는 15개 항목을 싣고 일부는 버전을 고정한다.

| 묶음 | 항목 |
|---|---|
| 모델 호출 | `litellm==1.97.0`, `openai>=1.70.0`, `openai-agents>=0.18.1`, `mcp>=1.19.0,<3` |
| PDF 처리 | `PyPDF2==3.0.1`, `pypdfium2==5.13.0`, `Pillow>=9.0`. `pymupdf`는 주석 처리된 선택 항목이다 |
| 공통 유틸리티 | `requests>=2.28.0`, `urllib3>=1.26`, `python-dotenv==1.2.2`, `pyyaml==6.0.2`, `regex>=2024.0.0`, `sortedcontainers==2.4.0` |

`pyproject.toml`은 같은 목록을 하한만 둔 형태로 선언하고 선택 의존성을 extras로 나눈다. `claude` extras가 `claude-agent-sdk>=0.1.53`을, `anthropic` extras가 `anthropic>=0.122.0`을 가져오며, `openai` extras는 `pip install "pageindex[openai]"`를 유효하게 두기 위한 빈 항목이라고 주석이 밝힌다. 패키지에는 `pageindex/config.yaml`과 `pageindex/flash/data/*.json`이 포함되고 `pageindex/flash/assets`는 제외된다. 즉 Flash는 클라우드 기능이 아니라 패키지에 함께 배포되는 구성 요소다.

`urllib3>=1.26` 하한에는 MCP 재시도가 `Retry(allowed_methods=...)`를 쓴다는 주석이, `openai-agents>=0.18.1` 하한에는 구버전이 현재 openai와 함께 요청 전에 중단된다는 주석이 붙어 있다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 로컬 인덱싱 비용과 시간

| 항목 | 값 | 조건 |
|---|---|---|
| 인덱싱 비용 | 쪽당 약 0.001달러 | index 모델 `gpt-5.6-luna`, 로컬 실행. 차트의 기준선은 쪽당 0.0011달러이고 기준선 주변의 분산은 길이가 아니라 텍스트 밀도 때문이라고 설명한다 |
| 1,000쪽 교과서 | 1달러를 조금 넘는 비용과 몇 분 | 한 번만 치르고 이후 질의는 그 트리를 재사용한다 |
| 인덱싱 시간 | 약 13초에서 4.5분 | 같은 로컬 설정, 9쪽에서 1,098쪽까지의 PDF 9건 |

차트에 이름이 붙은 문서는 bitcoin 백서, Attention 논문, KIMI K3, DeepSeek-R1, Situational Awareness, Fed 2023 Annual Report, SpaceX Prospectus, PRML, Murphy ML이다. 두 차트 모두 가로축이 문서 쪽수, 세로축이 비용 또는 시간이며 로그 축이다.

### 4.2 질의 비용과 정확도

`PageIndex-OSS-Benchmark`는 quickstart와 동일한 설정을 측정한다.

| 측정 설정 | 내용 |
|---|---|
| 구성 | `PageIndexClient()` local mode, flash 인덱싱, OCR 없음 |
| 문항 | 62개 lookup 질문 |
| 문서 | PDF 34건, 합계 1,945쪽. 출처는 `MMLongBench-Doc-V2` |
| 문항 성격 | 모든 정답이 본문에 문장으로 적혀 있어, 틀리면 추론 실패가 아니라 retrieval 또는 독해 실패다 |

결과 차트는 모델 3개와 reasoning effort 4단계의 조합을 질의당 평균 비용과 정확도 평면에 놓는다. reasoning effort는 모델이 답하기 전에 들이는 추론 분량을 단계로 조절하는 설정이다.

| 모델 | 질의당 평균 비용 | 정확도 |
|---|---|---|
| `gpt-5.6-luna` | 약 0.003달러 | none과 low 85.5%, medium 92%, high 96.8% |
| `gpt-5.6-terra` | 약 0.03달러 | none 90.3%, low 95.2%, medium은 97%대, high 100% |
| `gpt-5.6-sol` | 약 0.10달러 | none과 low 96.8%, medium과 high 100% |

차트 설명문이 요약하는 모양은 두 가지다. 모델 하나 안에서 reasoning effort를 올리면 비용은 거의 그대로인 채 정확도만 수직으로 오르고, 모델을 바꾸면 한 단계마다 비용이 10배 수준으로 뛴다.

### 4.3 PDF 직접 입력과의 비용 비교

retrieval을 쓰지 않는 대안은 질의마다 PDF 전체를 모델에 넣는 것이다. 그 비용은 문서가 길어질수록 커지지만 PageIndex는 추론이 닿는 노드만 읽으므로 그렇지 않다고 설명한다.

| PDF 쪽수 | PDF 직접 입력의 상대 비용 |
|---|---|
| 52쪽 | 2.1배 |
| 85쪽 | 3.4배 |
| 198쪽 | 7.8배 |
| 420쪽 | 16.6배 |
| 805쪽 | context window를 넘어 불가능 |

측정 조건은 `gpt-5.6-sol`, prompt caching 제외, 양쪽이 같은 답을 내는 문서다. 차트 범례는 PDF 직접 입력의 분량을 쪽당 약 1,650 토큰으로 적는다.

### 4.4 FinanceBench

| 항목 | 값 | 조건 |
|---|---|---|
| FinanceBench 정확도 | PageIndex 98.7%, vector RAG 50% | VectifyAI 자체 보고이며 독립 재검증은 없다. README는 state-of-the-art로 표기한다. 상세 결과는 `VectifyAI/Mafin2.5-FinanceBench` 저장소와 `vectify.ai/blog/Mafin2.5` 블로그에 있다 |

이전 스냅샷과 비교할 때 달라진 점은 대조군 수치가 생겼다는 것이다. 2026-06 판은 "vastly outperforming" 같은 정성 표현만 두었으나, 현재 판은 차트에 vector RAG 50%를 함께 싣는다. 다만 그 50%가 어떤 vector RAG 구성인지는 README에 없다. 측정 대상 시스템이 PageIndex를 retrieval 층으로 쓰는 Mafin 2.5라는 점은 링크된 저장소 이름으로만 드러난다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **오픈소스 구성은 텍스트 기반 PDF로 한정된다.** 스캔본과 이미지가 많은 문서는 Cloud가 담당한다고 표가 명시한다. OCR과 이미지 이해가 Local 칸에서 비어 있다.
- **인용 단위가 Local에서는 페이지 단위다.** 블록 단위 인용은 Cloud 전용이다. 긴 페이지에서 근거 구간을 좁게 가리키려면 유료 경로가 필요하다.
- **PageIndex File System은 Cloud 전용임이 명시됐다.** 이전 스냅샷에서는 이 기능이 오픈소스에 포함되는지 불분명했는데, 현재 판은 Cloud 전용으로 못박아 그 불확실성이 해소됐다.
- **벤치마크 문항이 lookup으로 한정된다.** 62개 질문은 모두 정답이 본문에 문장으로 적혀 있는 유형이며, 표나 그림에서 읽어야 하는 질문이나 다단계 추론 질문은 포함되지 않는다.
- **FinanceBench 50% 대조군의 구성이 불명이다.** 어떤 임베딩 모델과 chunk 크기와 top-k 설정의 vector RAG인지 README에 없다.
- **벤치마크의 보고 주체가 모두 개발사다.** 두 벤치마크 저장소와 블로그가 모두 VectifyAI 소유이며 제3자 재검증은 제시되지 않는다.
- **트리 노드 스키마가 README에서 빠졌다.** 2026-06 판에 있던 노드 필드 여섯 개와 JSON 예시가 현재 판에는 없다. 인덱싱 결과물의 형태를 알려면 문서 사이트를 거쳐야 한다.
- **인덱싱 출력의 저장 위치와 형식이 README에 없다.** Local의 저장 위치가 "로컬 디렉토리"라고만 적혀 있고 경로나 파일 형식은 밝히지 않는다.
- **목차가 없는 문서의 처리 방식이 문서화되어 있지 않다.** 트리 구조를 문서 레이아웃에서 추출한다고만 밝히고, 레이아웃에서 계층을 찾지 못했을 때의 대체 경로는 설명하지 않는다.
- **Markdown 입력 경로가 README에서 사라졌다.** 2026-06 판의 `--md_path` 모드에 해당하는 설명이 현재 판에 없어, SDK가 Markdown을 받는지는 이 자료로 확인할 수 없다.
- **패키지가 Alpha 단계다.** `pyproject.toml`의 개발 단계 분류가 "3 - Alpha"이고 버전은 0.2.10이다.

## 6. 관련 연구 (Related Work)

- **PageIndex 팀 소개글** (`sources/zhang-2025-pageindex-vectorless-reasoning-rag.md`). README가 인용 대상으로 지정한 블로그 글이며 동기와 설계 철학을 담당한다.
- **한국어 소개글** (`sources/9bow-2026-pageindex-vectorless-tree-index-rag.md`). 2026년 4월 시점의 PageIndex를 한국어로 정리한 글이다. CLI 방식을 전제하므로 현재 저장소의 SDK 방식과 명령이 다르다.
- **PageIndex Cloud 튜토리얼** (`sources/geeksforgeeks-2026-vectorless-rag-pageindex.md`). README가 스펙을 문서 사이트로 위임한 클라우드 경로를 코드 예제로 보인다.
- **3자 리뷰** (`sources/kalane-2026-pageindex-threw-out-vector-databases.md`). 같은 FinanceBench 결과를 외부 시각에서 검토한다. 다만 근거 문서는 VectifyAI의 Mafin 2.5 저장소와 블로그로 같다.
- **한글 학습용 직접 구현** (`sources/sguys99-langchain-study-vectorless-rag.md`). PageIndex API 없이 문서 트리를 직접 만들어 같은 아이디어를 재현한다.
- **LightRAG 계열** (`sources/guo-2025-lightrag-simple-and-fast.md`, `sources/zhang-2026-leanrag-knowledge-graph-based-generation.md`). 긴 문서 RAG에서 vector 단독의 한계를 넘으려는 같은 문제의식을 knowledge graph로 푼다.
- **RAG-Anything** (`sources/hkuds-rag-anything.md`). 멀티모달 확장에 초점을 두는 반면 PageIndex는 문서 구조에 초점을 둔다.
- **MMLongBench-Doc-V2**. 질의 벤치마크의 문서 출처로 지목된 `VectifyAI/MMLongBench-Doc-V2`다. 이 wiki에 미수록이다.
- **AlphaGo**. README가 tree search 비유의 출처로 명시한다. 이 wiki에 미수록이다.
- **OpenAI Agents SDK와 Claude Agent SDK**. 에이전트 결합 경로로 언급되며 선택 의존성으로 선언된다. 이 wiki에 미수록이다.

## 7. 용어집 (Glossary)

- **vectorless RAG**: vector database와 임베딩 유사도 검색 없이 LLM의 추론으로 retrieval을 수행하는 방식. PageIndex가 스스로를 규정하는 이름이다.
- **PageIndex tree index**: 문서 하나를 목차 형태의 계층 구조로 표현한 인덱스. 트리 구조 자체는 문서 레이아웃에서 추출하고 index 모델이 요약과 정리를 맡는다.
- **PageIndex Flash**: 텍스트 기반 PDF를 빠르게 트리 인덱스로 만드는 방식이며 SDK local mode의 기본값이다. 패키지의 `pageindex/flash/` 하위에 데이터가 포함된다.
- **PageIndex File System**: 파일 단위 트리 인덱싱 층. corpus 전체를 대상으로 추론하게 하며 Cloud 전용이다.
- **local mode와 cloud mode**: 같은 `PageIndexClient`로 인덱싱과 저장을 사용자 기기에서 할지 PageIndex Cloud에서 할지 고르는 두 운영 방식. `index` 인자 값과 API 키로 구분된다.
- **reasoning effort**: 모델이 답하기 전에 들이는 추론 분량을 none, low, medium, high로 조절하는 설정. 벤치마크 차트의 세로 사다리가 이 단계다.
- **Mafin 2.5**: 같은 팀의 재무 문서 분석 시스템. PageIndex를 retrieval 층으로 쓴다. FinanceBench 98.7%의 측정 대상이다.

## 8. 그림 후보 (Figure Candidates)

repo 유형이라 `-figures/` 디렉토리를 만들지 않는다. 사용자 지시에 따라 README가 참조하는 차트 이미지를 내려받아 `wiki/assets/vectifyai-pageindex/`에 보관했고, `raw` 필드에는 원본 URL을 남겼다. 다크 모드 변형(`*-dark.png`)은 받지 않았다.

| id | 위치 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | What is PageIndex 절 | PageIndex의 vectorless RAG 흐름도 | manual | ★ wiki 권장 (method) |
| fig02 | Benchmarks 절 | 문서 길이별 로컬 인덱싱 비용 | manual | ★ wiki 권장 (result) |
| fig03 | Benchmarks 절 | 문서 길이별 로컬 인덱싱 시간 | manual | ★ wiki 권장 (result) |
| fig04 | Benchmarks 절 | 질의당 평균 비용 대비 정확도 | manual | ★ wiki 권장 (result) |
| fig05 | Benchmarks 절 | PDF 직접 입력과의 질의 비용 비교 | manual | ★ wiki 권장 (result) |
| fig06 | Benchmarks 절 | FinanceBench 정확도 비교 | manual | ★ wiki 권장 (result) |
| fig07 | 최상단 | 저장소 배너 | manual | (제외 권장) |
| fig08 | Support Us 절 | star 추이 | manual | (제외 권장) |

fig01은 한국어 소개글의 workflow 도식과 같은 그림이다. 두 페이지가 같은 이미지를 각자의 경로로 임베드한다.
