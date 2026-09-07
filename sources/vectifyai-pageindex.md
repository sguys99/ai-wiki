---
title: "VectifyAI/PageIndex"
type: repo
year: 2025
category: database
raw_path: raw/repos/vectifyai-pageindex.md
raw_filename: "vectifyai-pageindex.md"
source_collection: external
tags: [rag, vectorless-rag, reasoning-based-rag, tree-index, long-document, llm, pdf, agentic-rag, litellm]
org: "VectifyAI"
repo: "PageIndex"
url: "https://github.com/VectifyAI/PageIndex"
license: "MIT"
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/vectifyai-pageindex/fig01.png
    raw: https://docs.pageindex.ai/images/cookbook/vectorless-rag.png
    caption: "README 서두에 실린 PageIndex 프레임워크 도해, 프레임워크 소개 블로그로 연결된다"
    strategy: manual
    curated: false
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/vectifyai-pageindex/fig02.png
    raw: https://github.com/user-attachments/assets/571aa074-d803-43c7-80c4-a04254b782a3
    caption: "FinanceBench 사례 연구 절의 성능 이미지, Mafin2.5-FinanceBench 저장소로 연결된다"
    strategy: manual
    curated: false
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/vectifyai-pageindex/fig03.png
    raw: https://github.com/user-attachments/assets/46201e72-675b-43bc-bfbd-081cc6b65a1d
    caption: "저장소 최상단 배너 이미지, 제품 소개 페이지로 연결된다"
    strategy: manual
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/vectifyai-pageindex/fig04.png
    raw: https://github.com/user-attachments/assets/eae4ff38-48ae-4a7c-b19f-eab81201d794
    caption: "후원 요청 절에 놓인 star 추이 이미지"
    strategy: manual
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/vectifyai-pageindex/fig05.png
    raw: https://github.com/user-attachments/assets/eb35d8ae-865c-4e60-a33b-ebbd00c41732
    caption: "PageIndex OCR 소개 이미지, HTML 주석으로 비활성화된 블록 안에 있다"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

PageIndex는 vector DB와 chunking 없이 긴 문서를 목차 형태의 계층 트리로 변환한 뒤 LLM이 그 트리를 추론으로 탐색해 관련 구간을 찾는 vectorless RAG 프로젝트이고, 이 저장소는 Vectify AI가 제시하는 세 가지 배포 방식 가운데 자체 호스팅 경로를 담당하는 오픈소스 코드다.

## 1. 자료 정보 (Document Information)

- **저장소**: `VectifyAI/PageIndex` (https://github.com/VectifyAI/PageIndex)
- **제작사**: Vectify AI. README 하단의 저작권 표기는 "© 2026 Vectify AI"다.
- **라이선스**: 이 자료의 frontmatter는 `license: "MIT"`로 기록하지만, 현재 raw에 남은 README 본문에는 라이선스 조항이 없어 확인할 수 없다. 커밋 `0507ad0`이 저장소 클론을 README 스텁으로 교체하면서 `LICENSE` 파일이 함께 삭제됐다.
- **인용 요청**: Mingtian Zhang, Yu Tang and PageIndex Team, "PageIndex: Next-Generation Vectorless, Reasoning-based RAG", PageIndex Blog, Sep 2025. README는 BibTeX 형식도 함께 제공하고 `note` 필드로 `https://pageindex.ai/blog/pageindex-intro`를 가리킨다. 즉 README는 인용 대상을 저장소가 아니라 블로그 글로 지정한다.
- **공식 채널**: 웹사이트 `vectify.ai`와 `pageindex.ai`, 챗 플랫폼 `chat.pageindex.ai`, 개발자 페이지 `pageindex.ai/developer`, 문서 `docs.pageindex.ai`, Discord, Twitter `@PageIndexAI`, LinkedIn `vectify-ai`.
- **README가 문서화한 진입점**: `run_pageindex.py`(PDF와 Markdown을 트리 구조로 변환하는 CLI), `examples/agentic_vectorless_rag_demo.py`(OpenAI Agents SDK 기반 예제), 노트북 두 개(`cookbook/pageindex_RAG_simple.ipynb`, `cookbook/vision_RAG_pageindex.ipynb`).

> 자료 범위 주의. 이 README에는 패키지 내부의 모듈, 클래스, 함수 이름이 하나도 등장하지 않는다. 소스 트리와 `LICENSE`와 `requirements.txt`의 내용은 커밋 `0507ad0`에서 삭제됐고, 현재 근거로 쓸 수 있는 것은 README 본문뿐이다.

## 2. 주요 기여 (Key Contributions)

1. **similarity와 relevance를 분리한 문제 제기.** README는 전통적 vector RAG가 semantic similarity에 의존하지만 retrieval이 실제로 필요로 하는 것은 relevance이고 relevance에는 추론이 필요하다고 주장한다. 원문 표현은 "similarity ≠ relevance"와 "what we truly need in retrieval is relevance, and that requires reasoning"이다. 도메인 지식과 다단계 추론이 필요한 전문 문서에서는 similarity 검색이 유사하지만 관련 없는 결과를 돌려주고 관련 있지만 유사하지 않은 부분을 놓친다고 설명한다.
2. **2단계 retrieval 절차 정식화.** 문서에서 목차에 해당하는 tree structure index를 만드는 단계와, 그 트리를 tree search로 탐색해 추론 기반 retrieval을 수행하는 단계로 나눈다. README는 이 구성이 AlphaGo에서 영감을 받았다고 밝힌다.
3. **트리 노드 스키마 공개.** README는 미국 연방준비제도 보고서의 "Financial Stability" 절을 예로 들어 노드 하나가 `title`, `node_id`, `start_index`, `end_index`, `summary`, `nodes` 필드를 갖는 JSON임을 보인다.
4. **자체 호스팅 CLI 제공.** `run_pageindex.py` 한 개의 명령으로 PDF나 Markdown에서 트리를 생성하고, 일곱 개의 선택 인자로 모델과 노드 크기 상한과 부가 정보 생성 여부를 조정한다.
5. **agentic vectorless RAG 예제 추가.** README의 Updates 절 최상단 항목이 `examples/agentic_vectorless_rag_demo.py`이며, 자체 호스팅 PageIndex와 OpenAI Agents SDK를 결합한 완결형 예제로 소개한다.
6. **corpus 규모 확장 발표.** PageIndex File System은 파일 단위 트리 층으로, 문서 한 개가 아니라 corpus 전체를 대상으로 추론하게 해 대규모 문서 검색을 가능하게 한다고 Updates 절이 밝힌다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 2단계 retrieval

README가 제시하는 절차는 두 단계다.

1. 문서의 목차에 해당하는 tree structure index를 생성한다.
2. tree search로 그 인덱스를 탐색해 추론 기반 retrieval을 수행한다.

README는 이 방식이 사람 전문가가 복잡한 문서를 훑어 지식을 꺼내는 과정을 흉내 낸다고 설명하며, 그 결과 retrieval이 추적 가능(traceable)하고 설명 가능(explainable)해진다고 주장한다.

### 3.2 핵심 특성

README의 Core Features 절이 vector 기반 RAG와 대비해 다섯 가지를 든다.

| 특성 | README 설명 |
|---|---|
| No Vector DB | vector similarity 검색 대신 문서 구조와 LLM 추론으로 retrieval한다 |
| No Chunking | 인위적 chunk가 아니라 문서의 자연스러운 절 단위로 조직한다 |
| Better Traceability & Explainability | 페이지와 절 참조에 근거해 결과를 추적하고 해석할 수 있다. 불투명한 근사 검색에 기대는 "vibe retrieval"을 벗어난다 |
| Context-Aware Retrieval | 대화 이력과 도메인 지식을 포함한 전체 컨텍스트에 따라 retrieval이 달라지고 새 컨텍스트를 쉽게 반영한다 |
| Human-like Retrieval | 사람 전문가가 복잡한 문서를 탐색하고 지식을 추출하는 방식을 흉내 낸다 |

### 3.3 트리 노드 스키마

README의 JSONC 예시에서 읽히는 필드는 여섯 개다.

| 필드 | 예시 값 | 뜻 |
|---|---|---|
| `title` | `"Financial Stability"` | 절 제목 |
| `node_id` | `"0006"` | 노드 식별자. 예시는 네 자리 문자열이다 |
| `start_index` | `21` | 절이 시작하는 위치 |
| `end_index` | `22` | 절이 끝나는 위치 |
| `summary` | `"The Federal Reserve ..."` | 절 요약 |
| `nodes` | 하위 노드 배열 | 자식 절을 재귀적으로 담는다 |

예시의 최상위 노드 `"0006"`은 `"0007"`(Monitoring Financial Vulnerabilities, 22에서 28)과 `"0008"`(Domestic and International Cooperation and Coordination, 28에서 31)을 자식으로 갖는다. README는 이 구조를 목차와 비슷하지만 LLM 사용에 맞게 최적화한 semantic tree structure라고 부르고, 재무 보고서, 규제 신고 서류, 학술 교과서, 법률이나 기술 매뉴얼처럼 LLM의 context 한계를 넘어서는 문서에 적합하다고 밝힌다.

### 3.4 CLI 사용 절차

Package Usage 절이 세 단계를 제시한다.

| 단계 | 명령 또는 설정 | 비고 |
|---|---|---|
| 1. 의존성 설치 | `pip3 install --upgrade -r requirements.txt` | README는 `requirements.txt`의 내용을 나열하지 않는다 |
| 2. LLM API 키 설정 | 루트에 `.env` 생성 후 `OPENAI_API_KEY=your_openai_key_here` | LiteLLM을 통해 multi-LLM을 지원한다고 밝힌다 |
| 3. 트리 생성 | `python3 run_pageindex.py --pdf_path /path/to/your/document.pdf` | 출력 파일의 위치와 이름은 README에 없다 |

Package Usage 절 머리에는 이 패키지가 standard PDF parsing을 쓴다는 주의 문구가 붙어 있고, 복잡한 PDF에는 MCP와 API로 제공되는 클라우드 서비스가 향상된 OCR과 트리 생성과 retrieval을 제공한다고 안내한다.

### 3.5 CLI 선택 인자

README의 접힌 블록이 일곱 개를 나열한다.

| 인자 | 뜻 | 기본값 |
|---|---|---|
| `--model` | 사용할 LLM 모델 | `gpt-4o-2024-11-20` |
| `--toc-check-pages` | 목차 존재 여부를 확인할 페이지 수 | 20 |
| `--max-pages-per-node` | 노드 하나가 담을 최대 페이지 수 | 10 |
| `--max-tokens-per-node` | 노드 하나가 담을 최대 토큰 수 | 20000 |
| `--if-add-node-id` | 노드 식별자 부여 여부 | yes |
| `--if-add-node-summary` | 노드 요약 생성 여부 | yes |
| `--if-add-doc-description` | 문서 설명 생성 여부 | yes |

`--toc-check-pages`가 존재한다는 사실 자체가 파이프라인이 문서 앞부분에서 목차를 먼저 찾는다는 것을 보여준다. 다만 목차를 찾지 못했을 때의 처리 방식은 README가 설명하지 않는다.

### 3.6 Markdown 모드

`--md_path` 플래그로 Markdown 파일에서도 트리를 만들 수 있다.

```bash
python3 run_pageindex.py --md_path /path/to/your/document.md
```

이 모드는 `#` 기호로 노드 제목과 레벨을 판정한다. `##`가 레벨 2, `###`이 레벨 3이다. README는 PDF나 HTML에서 변환한 Markdown에는 이 모드를 권장하지 않는데, 기존 변환 도구 대부분이 원래의 계층 구조를 보존하지 못하기 때문이라고 밝힌다. 대안으로는 계층 보존을 목표로 만든 자사의 PageIndex OCR로 PDF를 Markdown으로 변환한 뒤 이 모드를 쓰라고 안내한다.

### 3.7 agentic 예제

자체 호스팅 PageIndex와 OpenAI Agents SDK를 결합한 end-to-end 예제가 `examples/agentic_vectorless_rag_demo.py`다. 실행 절차는 두 줄이다.

```bash
pip3 install openai-agents
python3 examples/agentic_vectorless_rag_demo.py
```

`openai-agents`는 선택 의존성으로 표시되어 있다. 예제 내부에서 어떤 도구를 노출하고 어떤 지시문(instruction)을 쓰는지는 README에 나오지 않는다.

### 3.8 배포 방식

README는 Deployment Options 절에서 세 가지를 구분한다.

| 방식 | 내용 | 접근 경로 |
|---|---|---|
| Self-host | 이 오픈소스 저장소로 로컬 실행. standard PDF parsing 사용 | 저장소 클론 |
| Cloud Service | 향상된 OCR과 트리 생성과 retrieval을 갖춘 production 등급 파이프라인 | 챗 플랫폼, MCP, API |
| Enterprise | VPC나 온프레미스 전용 또는 프라이빗 배포 | 문의 양식, 데모 예약 |

세 방식의 서열은 README 안에서 일관된다. Package Usage 절과 Tree Structure 절 모두 더 나은 결과를 원하면 자사 API를 쓰라고 안내한다.

### 3.9 생태계

README의 Ecosystem 절이 PageIndex 생태계의 다른 오픈소스 프로젝트 네 개를 든다.

| 프로젝트 | 설명 |
|---|---|
| OpenKB | 문서를 상호 연결된 wiki로 컴파일하는 LLM 지식 베이스 |
| ChatIndex | 트리 인덱싱과 retrieval을 긴 대화 이력에 적용한다 |
| ConDB | 트리 기반 retrieval을 위한 KV cache 네이티브 컨텍스트 데이터베이스 |
| PageIndex MCP | PageIndex의 MCP 서버 |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README가 제시하는 정량 수치는 하나뿐이다.

| 항목 | 값 | 출처와 조건 |
|---|---|---|
| FinanceBench accuracy | 98.7% | 측정 대상은 PageIndex가 아니라 이를 retrieval 층으로 쓰는 Mafin 2.5다. VectifyAI 자체 보고이며 독립 재검증은 없다. README는 state-of-the-art로 표기 |

세부 사항은 다음과 같다.

- **Mafin 2.5**는 PageIndex를 retrieval 층으로 쓰는 재무 문서 분석용 reasoning 기반 RAG 시스템이다. 즉 98.7%는 이 저장소의 코드가 단독으로 낸 수치가 아니고, 보고 주체도 VectifyAI 자신이다. 전체 벤치마크 결과는 별도 저장소 `VectifyAI/Mafin2.5-FinanceBench`에, 상세 비교와 성능 지표는 블로그 `vectify.ai/blog/Mafin2.5`에 있다고 안내한다.
- **FinanceBench**는 arXiv 2311.11944로 링크된다. README는 이 벤치마크의 저자나 구성은 밝히지 않는다.
- README는 PageIndex의 계층 인덱싱과 추론 기반 retrieval이 SEC 신고 서류와 실적 공시 같은 복잡한 재무 보고서에서 정확한 탐색과 추출을 가능하게 한다고 설명한다.
- vector 기반 RAG와의 비교는 "vastly outperforming"과 "significantly outperforming"이라는 정성 표현 두 곳뿐이고, 대조군의 수치는 제시되지 않는다.
- 이 저장소에 벤치마크 재현용 코드가 포함되는지 여부는 README가 밝히지 않는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **자체 호스팅과 클라우드의 품질 격차가 명시적이다.** 오픈소스 코드는 standard PDF parsing만 쓰고, 복잡한 PDF에는 클라우드 서비스의 향상된 OCR을 쓰라는 안내가 Deployment Options, Tree Structure, Package Usage 세 곳에 반복된다.
- **Markdown 모드의 권장 입력을 오픈소스만으로 만들 수 없다.** README는 변환된 Markdown을 권장하지 않으면서 대안으로 클라우드 전용 PageIndex OCR을 지목한다. 즉 이 모드를 권장 방식대로 쓰려면 유료 경로가 필요하다.
- **라이선스를 현재 raw로 검증할 수 없다.** README 본문에 라이선스 조항이 없고 `LICENSE` 파일은 스텁 전환에서 삭제됐다.
- **README 내부에 비활성 블록이 있다.** PageIndex OCR을 소개하는 절과 Cookbooks 목록이 HTML 주석으로 감싸져 있어 렌더링된 README에는 보이지 않는다. 그러면서 본문 여러 곳은 PageIndex OCR을 설명 없이 링크로만 언급한다.
- **비용과 지연에 관한 정보가 없다.** 목차 확인 페이지 수와 노드 토큰 상한 같은 인자만 노출될 뿐, 문서 한 건을 처리할 때의 LLM 호출 횟수나 소요 시간은 README에 없다.
- **클라우드 API의 스펙과 요금이 README에 없다.** 엔드포인트, 요청 형식, 무료 사용 범위는 모두 외부 문서 사이트로 위임된다.
- **corpus 규모 지원의 현재 상태가 불분명하다.** PageIndex File System은 Updates 절에서 발표되지만, 그 기능이 이 오픈소스 저장소에 포함되는지 아니면 클라우드 전용인지 README는 밝히지 않는다.
- **목차가 없는 문서의 처리 방식이 문서화되어 있지 않다.** `--toc-check-pages` 인자는 목차 탐색이 파이프라인의 첫 단계임을 시사하지만, 탐색 실패 시의 대체 경로는 설명되지 않는다.

## 6. 관련 연구 (Related Work)

- **PageIndex 팀 소개글** (`sources/zhang-2025-pageindex-vectorless-reasoning-rag.md`). README가 인용 대상으로 지정한 블로그 글이다. 이 저장소가 코드를 담당하고 그 글이 동기와 설계 철학을 담당한다.
- **PageIndex Cloud 튜토리얼** (`sources/geeksforgeeks-2026-vectorless-rag-pageindex.md`). README가 스펙을 문서 사이트로 위임한 클라우드 API 쪽을 다룬다.
- **3자 리뷰** (`sources/kalane-2026-pageindex-threw-out-vector-databases.md`). 같은 FinanceBench 결과를 외부 시각에서 검토한 글이다. 이 저장소의 README와 함께 98.7%를 싣는 두 자료 가운데 하나이며, 두 자료의 근거 문서는 VectifyAI의 Mafin 2.5 벤치마크 저장소와 블로그로 같다.
- **한글 학습용 직접 구현** (`sources/sguys99-langchain-study-vectorless-rag.md`). PageIndex API 없이 문서 트리를 직접 만들어 같은 아이디어를 재현한다.
- **LightRAG 계열** (`sources/guo-2025-lightrag-simple-and-fast.md`, `sources/zhang-2026-leanrag-knowledge-graph-based-generation.md`). 긴 문서 RAG에서 vector 단독의 한계를 넘으려는 동일 문제의식을 knowledge graph로 푼다. PageIndex는 문서에 이미 들어 있는 목차 구조를 계층의 출처로 삼는다.
- **RAG-Anything** (`sources/guo-2025-rag-anything-all-in-one-rag.md`, `sources/hkuds-rag-anything.md`). 멀티모달 확장에 초점을 두는 반면 PageIndex는 문서 구조에 초점을 둔다.
- **AlphaGo**. README가 "Inspired by AlphaGo"라며 tree search 비유의 출처로 명시한다. 이 wiki에 미수록.
- **OpenAI Agents SDK**와 **LiteLLM**. 각각 agentic 예제의 선택 의존성과 multi-LLM 호출 경로로 언급된다. 이 wiki에 미수록.

## 7. 용어집 (Glossary)

- **vectorless RAG**: vector DB와 embedding similarity 검색 없이 LLM의 추론만으로 retrieval을 수행하는 RAG 방식. PageIndex가 스스로를 규정하는 이름이다.
- **PageIndex tree structure**: 문서 하나를 목차 형태의 계층 JSON으로 표현한 것. 노드마다 제목, 식별자, 시작과 끝 위치, 요약, 하위 노드를 갖는다.
- **tree search**: 생성된 트리를 LLM이 위에서 아래로 탐색하며 관련 절을 고르는 retrieval 단계. README가 AlphaGo에서 가져온 비유다.
- **PageIndex File System**: 파일 단위 트리 층. 문서 한 개가 아니라 corpus 전체를 대상으로 추론하게 한다고 Updates 절이 밝힌다.
- **PageIndex OCR**: 문서의 전역 구조를 보존하도록 설계됐다고 주장하는 클라우드 전용 OCR. Markdown 모드의 권장 전처리 경로다.
- **Mafin 2.5**: 같은 팀의 재무 문서 분석 시스템. PageIndex를 retrieval 층으로 쓴다. FinanceBench 98.7%는 이 시스템에 대한 VectifyAI 자체 보고 수치이고 독립 재검증은 없다.

## 8. 그림 후보 (Figure Candidates)

repo 유형이라 `-figures/` 디렉토리를 만들지 않고 README 안의 이미지를 원래 위치에서 참조한다. 아래 다섯 장은 모두 외부 호스트에 있어 내려받지 않았고, 캡션은 이미지 자체가 아니라 README 마크업이 밝힌 위치와 링크 대상만으로 작성했다.

| id | 위치 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | Introduction 절 | README 서두에 실린 PageIndex 프레임워크 도해 | manual | (확인 필요, 내용 미확인) |
| fig02 | Case Study 절 | FinanceBench 사례 연구 절의 성능 이미지 | manual | (확인 필요, 내용 미확인) |
| fig03 | 최상단 | 저장소 배너 | manual | (제외 권장) |
| fig04 | Support Us 절 | star 추이 | manual | (제외 권장) |
| fig05 | 주석 블록 | PageIndex OCR 소개 이미지 | manual | (제외 권장, 비활성 블록) |
