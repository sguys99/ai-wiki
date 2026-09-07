---
title: "HKUDS/RAG-Anything"
type: repo
year: 2025
category: database
raw_path: raw/repos/hkuds-rag-anything.md
raw_filename: "hkuds-rag-anything.md"
source_collection: external
source: hkuds-rag-anything.md
org: "HKUDS"
repo: "RAG-Anything"
url: "https://github.com/HKUDS/RAG-Anything"
license: "MIT"
tags: [multimodal-rag, rag, knowledge-graph, lightrag, mineru, docling, paddleocr, repo, oss]
---

## 요약

`HKUDS/RAG-Anything`은 LightRAG 위에 세운 all-in-one multimodal RAG 프레임워크다. PDF와 Office 문서와 이미지와 텍스트 파일을 파서 하나로 분해한 뒤, 텍스트뿐 아니라 이미지와 표와 수식까지 같은 knowledge graph 인덱스에 올려 하나의 질의 인터페이스로 답한다.

README가 스스로 잡는 위치는 "여러 전용 도구를 따로 쓸 필요를 없애는" 통합 프레임워크다. 문서 수집과 파싱, modality별 분석, knowledge graph 구축, retrieval을 각각 다른 라이브러리로 조립하지 않고 한 패키지 안에서 잇는 것이 목표다.

이 페이지의 근거는 저장소 README 한 편이다. 수집된 raw 파일이 저장소 전체 클론이 아니라 README 스텁이라서, 여기서 확인할 수 있는 것은 README가 문서화한 공개 인터페이스와 운영 요구 사항에 한정된다. 정확도 비교와 알고리즘 세부는 같은 팀의 기술 보고서를 다루는 [[database/guo-2025-rag-anything-all-in-one-rag]]가 담당한다.

## 배경

문서가 텍스트만으로 이루어져 있지 않다는 관찰이 출발점이다. README는 현대 문서가 텍스트, 이미지, 표, 수식, 차트, 멀티미디어를 함께 담는데 텍스트 중심 RAG 시스템은 이를 제대로 처리하지 못한다고 문제를 세운다.

RAG는 모델이 답을 만들기 전에 외부 지식에서 관련 정보를 찾아와 함께 넣어 주는 구성이다. 이때 정보를 찾아오는 단계를 retrieval이라 부른다. 텍스트 중심 RAG는 문서를 텍스트 조각으로만 쪼개 임베딩하므로, 그림이 담은 정보나 표의 수치는 인덱스에 아예 들어가지 못하거나 캡션 수준으로만 남는다.

RAG-Anything이 겨냥하는 곳은 이런 손실이 특히 큰 문서군이다. README는 학술 연구, 기술 문서, 재무 보고서, 기업 지식 관리를 든다. 모두 그림과 표가 본문만큼의 정보를 담는 자료다.

토대는 같은 org의 LightRAG다. README 상단 배지와 System Overview 절이 모두 "built on LightRAG"를 명시한다. 텍스트 쪽 knowledge graph 인덱스와 질의 모드를 LightRAG에서 그대로 받고, 그 위에 비텍스트 콘텐츠를 올리는 층을 더한 구조로 읽을 수 있다.

두 프로젝트의 관계는 한 방향이 아니다. README News의 가장 최근 항목인 2026.06은 LightRAG가 RAG-Anything을 native integration하는 방식으로 multimodal RAG를 지원하게 됐다고 적는다. 즉 아래에 깔린 프로젝트가 위층 프로젝트를 다시 품은 형태다.

### 기능 추가 시점

README News 절은 기능이 붙은 순서를 날짜와 함께 남긴다. 어떤 기능이 늦게 붙었는지를 보면 설계의 무게 중심이 어디로 옮겨갔는지 읽힌다.

| 날짜 | 내용 |
|---|---|
| 2026.06 | LightRAG가 RAG-Anything을 native integration해 multimodal RAG를 지원 |
| 2025.10 | 기술 보고서 arXiv 2510.12323 공개 |
| 2025.08 | VLM-Enhanced Query 모드 추가 |
| 2025.07 | context configuration module 추가 |
| 2025.07 | multimodal query 기능 추가 (텍스트, 이미지, 표, 수식) |
| 2025.07 | GitHub star 1,000개 도달 |

인덱싱 쪽 multimodal 처리가 먼저 들어가고 질의 시점에 VLM을 직접 부르는 모드가 한 달 뒤에 붙었다. 기술 보고서는 코드가 자리를 잡은 뒤에 나왔다.

### 프레임워크가 내세우는 기능

README의 Key Features 절은 일곱 항목으로 자기 규정을 남긴다. 앞의 넷이 파이프라인의 뼈대이고 뒤의 셋은 사용자가 개입할 수 있는 지점이다.

| 항목 | 내용 |
|---|---|
| End-to-End Multimodal Pipeline | 문서 수집과 파싱부터 multimodal 질의 응답까지 하나의 워크플로로 잇는다 |
| Universal Document Support | PDF, Office 문서, 이미지, 그 밖의 형식을 함께 처리한다 |
| Specialized Content Analysis | 이미지, 표, 수식, 그 밖의 이질적 콘텐츠마다 전용 처리기를 둔다 |
| Multimodal Knowledge Graph | entity 추출과 cross-modal 관계 발견을 자동으로 수행한다 |
| Adaptive Processing Modes | MinerU 기반 파싱과 multimodal 콘텐츠 직접 주입 가운데 고른다 |
| Direct Content List Insertion | 외부에서 이미 파싱한 항목 목록을 파싱 단계 없이 바로 넣는다 |
| Hybrid Intelligent Retrieval | 텍스트와 multimodal 콘텐츠를 함께 훑는 retrieval을 제공한다 |

뒤의 세 항목이 이 저장소를 닫힌 파이프라인이 아니라 조립 가능한 부품으로 만든다. 파서를 바꾸거나, 파싱을 통째로 건너뛰거나, 처리기를 새로 붙이는 자리가 각각 열려 있다.

## 핵심 개념

**multimodal RAG**는 텍스트 외의 콘텐츠도 인덱스에 올려 질의 대상으로 삼는 RAG 구성이다. README는 이를 "이미지와 표와 수식을 1급 처리 대상으로 다룬다"는 취지로 설명하고, 각 modality마다 전용 처리기를 두는 방식으로 구현한다.

**content list**는 파서가 문서를 분해해 내놓는 항목 목록이다. 항목마다 `type`과 `page_idx`를 갖고, 어느 파서를 썼든 같은 표현으로 정규화된다. 이 표현이 파서와 뒷단 파이프라인을 갈라놓는 경계라서, 외부에서 만든 content list를 파싱 단계 없이 그대로 밀어 넣는 경로도 열려 있다.

**modal processor**는 modality마다 모델을 불러 두 가지 산출물을 만드는 구성 요소다. 하나는 검색 대상이 되는 설명 텍스트이고 다른 하나는 knowledge graph에 올릴 entity다. README에는 `ImageModalProcessor`, `TableModalProcessor`, 그리고 확장용 `GenericModalProcessor`가 등장한다.

**knowledge graph 인덱스**는 문서를 entity와 관계의 그래프로 바꿔 저장한 것이다. 텍스트 조각을 벡터로만 저장하는 인덱스와 달리 항목 사이의 연결이 남기 때문에, 한 곳에서 시작해 관계를 따라가며 관련 정보를 모을 수 있다.

**VLM Enhanced Query**는 검색된 컨텍스트 안의 이미지 경로를 찾아 이미지 원본을 VLM에 함께 넘기는 질의 방식이다. 인덱싱 시점에 만들어 둔 설명 텍스트만 보는 대신 답할 때 그림을 다시 본다는 뜻이다. VLM은 vision-language model의 약어다.

## 방법

### 전체 파이프라인

README는 처리 흐름을 문서 파싱, 콘텐츠 분석, knowledge graph, 지능형 retrieval 네 칸의 흐름도로 먼저 보여 준 뒤, 본문에서 다섯 절로 나눠 설명한다.

```
문서 (PDF / Office / 이미지 / TXT / MD)
   ↓ 1. Document Parsing        MinerU | Docling | PaddleOCR
content list  [ text | image | table | equation | 사용자 정의 ]
   ↓ 2. 콘텐츠 판별과 라우팅      텍스트 파이프라인 ∥ multimodal 파이프라인
   ↓ 3. Multimodal Analysis Engine
        Visual Content Analyzer / Structured Data Interpreter
        Mathematical Expression Parser / Extensible Modality Handler
   ↓ 4. Multimodal Knowledge Graph Index
        entity 추출 + cross-modal 관계 + belongs_to 계층 + 관계 가중치
   ↓ 5. Modality-Aware Retrieval
        벡터 유사도 + 그래프 순회 + modality 반영 순위
   → 응답
```

각 단계가 맡은 몫은 다음과 같다.

| 단계 | README 명칭 | 하는 일 |
|---|---|---|
| 1 | Document Parsing Stage | 문서 구조를 고정밀로 추출하고 이질적 요소를 텍스트 블록, 시각 요소, 표, 수식으로 분해하면서 문맥 관계를 보존한다 |
| 2 | Multi-Modal Content Understanding and Processing | 콘텐츠 종류를 자동 판별해 최적 경로로 보내고, 텍스트와 multimodal 파이프라인을 동시에 실행하며, 원본 문서 계층을 유지한다 |
| 3 | Multimodal Analysis Engine | modality를 아는 처리 단위 네 종에 콘텐츠를 넘긴다 |
| 4 | Multimodal Knowledge Graph Index | 문서 콘텐츠를 구조화된 의미 표현으로 바꾸고 관계마다 가중치를 매긴다 |
| 5 | Modality-Aware Retrieval | 벡터 유사도와 그래프 순회를 결합하고 modality를 반영해 순위를 조정한다 |

### 문서 파싱과 형식 대응

파싱 단계의 목표는 형식이 제각각인 입력을 하나의 표현으로 모으는 것이다. README는 MinerU를 기본 파서로 두고 문서 구조를 높은 충실도로 뽑는다고 적으며, 이어서 적응형 분해와 범용 형식 지원을 나란히 든다.

적응형 분해는 문서를 균일한 길이로 자르는 대신 성격이 같은 덩어리로 나누는 방식이다. 텍스트 블록, 시각 요소, 표, 수식, 그 밖의 특수 콘텐츠로 나누되 요소 사이의 문맥 관계를 함께 남긴다고 서술된다.

### 콘텐츠 판별과 병렬 처리

2단계는 분해된 항목을 어디로 보낼지 정하는 라우팅 층이다. README는 세 가지 성질을 든다. 콘텐츠 유형을 스스로 판별해 최적화된 경로로 보내고, 텍스트 처리와 multimodal 처리를 동시에 진행해 처리량을 높이며, 변환 과정에서 원본 문서의 계층과 요소 사이 관계를 잃지 않는다.

### 분석 엔진 네 종

3단계에서 modality마다 다른 처리 단위가 붙는다. 앞의 셋은 각각 이미지, 표, 수식을 맡고 마지막 하나는 확장 지점이다.

| 처리 단위 | 대상 | README 서술 |
|---|---|---|
| Visual Content Analyzer | 이미지 | vision model로 이미지를 분석하고, 시각 의미에 근거한 문맥 인식 캡션을 만들며, 시각 요소 사이의 공간 관계와 계층 구조를 뽑는다 |
| Structured Data Interpreter | 표 | 표 형식 데이터를 체계적으로 해석하고, 통계 패턴 인식으로 추세를 분석하며, 여러 표 사이의 의미 관계와 의존을 식별한다 |
| Mathematical Expression Parser | 수식 | 복잡한 수식을 높은 정확도로 파싱하고, LaTeX 형식을 기본 지원하며, 수식과 도메인 지식 사이의 개념 대응을 만든다 |
| Extensible Modality Handler | 사용자 정의 | 새 콘텐츠 유형을 위한 설정 가능한 처리 틀을 제공하고, plugin 구조로 처리기를 추가하며, 실행 시점에 파이프라인 구성을 바꾼다 |

이미지 처리의 설명에 "문맥 인식"이 붙은 점이 눈여겨볼 대목이다. 그림 하나만 보고 캡션을 만드는 것이 아니라 주변 문맥을 함께 반영한다는 뜻이고, 2025.07에 별도 기능으로 추가된 context configuration module이 이 부분을 담당한다.

### knowledge graph 인덱스

4단계는 앞에서 만든 설명과 entity를 그래프로 묶는다. README가 드는 기능은 넷이다.

| 기능 | 내용 |
|---|---|
| Multi-Modal Entity Extraction | 의미 있는 multimodal 요소를 knowledge graph의 entity로 바꾸고 의미 주석과 메타데이터를 함께 보존한다 |
| Cross-Modal Relationship Mapping | 텍스트 entity와 multimodal 구성 요소 사이의 의미 연결을 관계 추론으로 세운다 |
| Hierarchical Structure Preservation | `belongs_to` 관계 사슬로 원래 문서 구성과 절 사이의 의존을 유지한다 |
| Weighted Relationship Scoring | 의미 근접도와 문서 안에서의 문맥 중요도를 근거로 관계 유형마다 정량 점수를 준다 |

`belongs_to` 사슬이 하는 일은 문서의 목차 구조를 그래프에 남기는 것이다. 그림 한 장이 어느 절에 속했는지가 관계로 남으면, 그 절의 텍스트를 찾았을 때 딸린 그림까지 함께 끌어올 수 있다.

### modality를 반영한 retrieval

5단계는 벡터 유사도와 그래프 구조를 함께 쓰는 retrieval이다.

| 기전 | 내용 |
|---|---|
| Vector-Graph Fusion | 벡터 유사도 탐색과 그래프 순회를 함께 써서 의미 임베딩과 구조 관계를 동시에 활용한다 |
| Modality-Aware Ranking | 질의가 선호하는 modality에 따라 결과 가중치를 조정하는 적응형 점수 계산을 적용한다 |
| Relational Coherence Maintenance | 검색된 요소 사이의 의미 관계와 구조 관계를 유지해 문맥 일관성을 지킨다 |

세 번째 항목이 앞의 `belongs_to` 설계와 짝을 이룬다. 조각들을 점수 순으로만 뽑으면 서로 관계없는 문장이 뒤섞이는데, 관계를 유지한 채 뽑으면 그림과 그 그림을 설명하는 문단이 함께 온다.

### 질의 방식 세 가지

README의 Query Options 절은 질의를 세 종류로 나눈다. 셋의 차이는 무엇을 추가로 넘기느냐에 있다.

| 방식 | 호출 | 무엇이 다른가 |
|---|---|---|
| Pure Text Query | `aquery(q, mode="hybrid")` | LightRAG의 `hybrid`, `local`, `global`, `naive` 모드를 그대로 받는다. 동기 버전 `rag.query(q, mode=...)`도 제공한다 |
| VLM Enhanced Query | `aquery(q, mode="hybrid", vlm_enhanced=True)` | 검색된 컨텍스트의 이미지를 VLM에 함께 넘긴다. 별도 메서드가 아니라 `aquery`의 인자다 |
| Multimodal Query | `aquery_with_multimodal(q, multimodal_content=[...], mode="hybrid")` | 사용자가 표나 수식을 질의에 첨부한다 |

VLM Enhanced Query는 `vision_model_func`를 넘겼으면 자동으로 켜지고, `vlm_enhanced=False`로 강제로 끌 수 있다. README가 코드 주석으로 밝히는 내부 절차는 세 걸음이다. 이미지 경로가 든 컨텍스트를 먼저 검색하고, 이미지를 읽어 base64로 인코딩한 다음, 텍스트 컨텍스트와 이미지를 함께 VLM에 보낸다.

Multimodal Query는 방향이 반대다. 앞의 방식이 인덱스 안의 그림을 꺼내 온다면, 이 방식은 인덱스에 없는 표나 수식을 사용자가 들고 와서 문서 내용과 비교하게 한다. `type: "table"`이면 `table_data`와 `table_caption`을, `type: "equation"`이면 `latex`와 `equation_caption`을 넘긴다.

### 기본 사용 흐름

설정 객체를 만들고, 모델 함수 셋을 주입하고, 문서를 처리한 뒤 질의하는 순서다.

```python
config = RAGAnythingConfig(
    working_dir="./rag_storage",
    parser="mineru",          # mineru | docling | paddleocr
    parse_method="auto",      # auto | ocr | txt
    enable_image_processing=True,
    enable_table_processing=True,
    enable_equation_processing=True,
)
rag = RAGAnything(
    config=config,
    llm_model_func=...,       # README 예제는 gpt-4o-mini
    vision_model_func=...,    # README 예제는 gpt-4o
    embedding_func=EmbeddingFunc(embedding_dim=3072, max_token_size=8192, ...),
)
await rag.process_document_complete(file_path="document.pdf", output_dir="./output", parse_method="auto")
answer = await rag.aquery("이 문서의 그림과 표가 보여주는 결과는?", mode="hybrid")
```

모델 세 가지를 함수로 주입받는 구조라서 특정 제공자에 묶이지 않는다. README 예제가 OpenAI 계열을 쓰지만 그것은 예제의 선택이고, `vision_model_func`를 넘기지 않으면 VLM 관련 기능만 꺼진 채 나머지가 동작한다.

### 파싱을 건너뛰는 경로

이미 파싱된 결과가 있으면 `insert_content_list`로 파싱 단계 없이 넣을 수 있다. 인자는 `content_list`, `file_path`, `split_by_character`, `split_by_character_only`, `doc_id`, `display_stats`다.

| type | 필수 키 |
|---|---|
| `text` | `text`, `page_idx` |
| `image` | `img_path`(절대 경로), `image_caption`, `image_footnote`, `page_idx` |
| `table` | `table_body`(마크다운 표), `table_caption`, `table_footnote`, `page_idx` |
| `equation` | `latex`, `text`, `page_idx` |
| 사용자 정의 | `content`, `page_idx` |

`page_idx`는 0부터 세는 원본 페이지 번호이고, 항목은 목록에 적힌 순서대로 처리된다. 이미지 경로는 반드시 절대 경로여야 한다고 README가 못 박는다.

README가 드는 쓸모는 넷이다. MinerU와 Docling 밖의 외부 파서 결과를 활용할 때, 프로그램으로 만든 콘텐츠를 넣을 때, 여러 출처를 하나의 knowledge base로 모을 때, 캐시해 둔 파싱 결과를 다시 쓸 때다. 파싱은 비용이 큰 단계이므로 재사용 경로를 따로 열어 둔 셈이다.

### 폴더 처리, 인스턴스 재사용, 확장

문서 하나 단위 밖의 진입점도 문서화되어 있다.

- 폴더를 한 번에 처리할 때는 `process_folder_complete(folder_path, output_dir, file_extensions, recursive, max_workers)`를 쓴다. `max_workers`로 병렬도를 정한다.
- 이미 쓰던 LightRAG 인스턴스가 있으면 `RAGAnything(lightrag=lightrag_instance, vision_model_func=...)`로 그대로 받는다. `working_dir`, `llm_model_func`, `embedding_func`는 그 인스턴스에서 상속되므로 다시 넘기지 않는다. 인스턴스 쪽에서 `initialize_storages()`와 `initialize_pipeline_status()`를 먼저 호출해 둬야 한다.
- 처리기를 직접 부를 수도 있다. `raganything.modalprocessors`의 `ImageModalProcessor`나 `TableModalProcessor`를 만들어 `process_multimodal_content(modal_content, content_type, file_path, entity_name)`을 호출하면 `(description, entity_info)` 쌍을 돌려받는다.
- 새 modality를 붙일 때는 `GenericModalProcessor`를 상속해 `process_multimodal_content`를 재정의하고 마지막에 `self._create_entity_and_chunk(...)`를 호출한다.

## 설치와 운영

### 패키지와 선택 의존

기본 설치는 `pip install raganything`이고, 형식 지원은 extras로 나뉜다. 소스 설치는 uv를 쓰며 `uv sync`, `uv sync --extra image --extra text`, `uv sync --all-extras`를 안내한다. opencv 패키지에서 네트워크 시간 초과가 나면 `UV_HTTP_TIMEOUT=120 uv sync`로 우회한다.

| 요구 콘텐츠 | 추가 설치 |
|---|---|
| Office 문서(.doc, .docx, .ppt, .pptx, .xls, .xlsx) | LibreOffice. macOS는 `brew install --cask libreoffice`, Ubuntu와 Debian은 `sudo apt-get install libreoffice`, CentOS와 RHEL은 `sudo yum install libreoffice` |
| 확장 이미지 형식(.bmp, .tiff, .gif, .webp) | `pip install raganything[image]`, Pillow 필요 |
| 텍스트 파일(.txt, .md) | `pip install raganything[text]`, ReportLab 필요 |
| PaddleOCR 파서 | `pip install raganything[paddleocr]` 뒤에 플랫폼별 `paddlepaddle` 별도 설치 |

`raganything[all]`은 Python 쪽 선택 의존만 한 번에 해결한다. LibreOffice와 `paddlepaddle`은 여전히 따로 깔아야 한다고 README가 단서를 단다.

MinerU 설치 확인은 두 가지로 안내한다. 명령행에서 `mineru --version`을 실행하거나, 파이썬에서 `rag.check_parser_installation()`을 호출한다. 파싱에 쓰는 모델은 첫 실행에서 자동으로 내려받는다.

### 파서 세 종

파서는 `parser="mineru"`처럼 문자열로 고른다. 셋의 성격이 다르므로 문서 종류에 맞춰 선택하는 구성이다.

| 파서 | README가 적는 강점 |
|---|---|
| MinerU | PDF, 이미지, Office 문서를 비롯한 여러 형식을 지원하고, OCR과 표 추출이 강하며, GPU 가속을 지원한다 |
| Docling | Office 문서와 HTML에 최적화됐고, 문서 구조 보존이 낫고, 여러 Office 형식을 기본 지원한다 |
| PaddleOCR | 이미지와 PDF를 위한 OCR 중심 파서로, 기존 content list 처리와 호환되는 텍스트 블록을 만들고, Office와 TXT와 MD는 PDF로 먼저 변환해 처리한다 |

### MinerU 설정

MinerU 2.0은 설정 파일 대신 명령행 인자를 받는다. `magic-pdf.json`을 더 이상 쓰지 않는다는 점을 README가 따로 명시한다. `mineru -p input.pdf -o output_dir -m auto`가 자동 모드, `-m ocr`이 OCR 중심 모드, `-b pipeline --device cuda`가 GPU 가속이다.

같은 설정을 `process_document_complete`의 인자로도 넘길 수 있다.

| 인자 | 값 |
|---|---|
| `lang` | OCR 최적화용 문서 언어. `"ch"`, `"en"`, `"ja"` 등 |
| `device` | `"cpu"`, `"cuda"`, `"cuda:0"`, `"npu"`, `"mps"` |
| `start_page` / `end_page` | 0부터 세는 페이지 범위 |
| `formula` / `table` | 수식 파싱과 표 파싱 사용 여부 |
| `backend` | `pipeline`, `hybrid-auto-engine`, `hybrid-http-client`, `vlm-auto-engine`, `vlm-http-client` |
| `source` | 모델 출처. `"huggingface"`, `"modelscope"`, `"local"` |
| `vlm_url` | `backend=vlm-http-client`일 때 붙을 서비스 주소 |

`parse_method`는 `auto`, `ocr`, `txt` 중 하나이고, RAGAnything 자신의 인자로는 `display_stats`, `split_by_character`, `doc_id`를 함께 받는다.

### 환경 변수

설정은 `.env` 파일로도 준다. README는 `.env.example`을 참고하라고 안내한다.

| 변수 | 용도 |
|---|---|
| `OPENAI_API_KEY` | 모델 호출 키 |
| `OPENAI_BASE_URL` | 대체 엔드포인트. 선택 |
| `OUTPUT_DIR` | 파싱 결과 기본 출력 디렉토리 |
| `PARSER` | `mineru`, `docling`, `paddleocr` 중 선택 |
| `PARSE_METHOD` | `auto`, `ocr`, `txt` 중 선택 |
| `RAGANYTHING_PUBLIC_ASSET_BASE_URL` | 이미지 자산에 붙일 공개 URL의 기준 주소 |
| `RAGANYTHING_PUBLIC_ASSET_STRIP_PREFIX` | 절대 경로에서 떼어낼 파일 시스템 루트 |

예전 이름 `MINERU_PARSE_METHOD`는 폐기 예정이지만 호환을 위해 아직 동작한다.

이미지 자산 공개 URL 기능은 인덱싱은 서버에서 돌리고 화면은 다른 서비스가 그리는 구성을 위한 것이다. 두 변수를 함께 설정하면 파싱 뒤에 비어 있지 않은 `img_path`, `table_img_path`, `equation_img_path`마다 `*_public_url` 형제 필드가 붙고, 원본 경로는 로컬 처리를 위해 그대로 남는다. 둘 중 하나만 설정하면 경고를 남기고 URL 부착을 건너뛴다.

### 지원 형식

| 구분 | 형식 |
|---|---|
| 문서 | PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX |
| 이미지 | JPG, PNG, BMP, TIFF, GIF, WebP |
| 텍스트 | TXT, MD |
| multimodal 요소 | 이미지(사진, 다이어그램, 차트, 스크린샷), 표(데이터 표, 비교표, 통계 요약), 수식(LaTeX), 사용자 정의 콘텐츠 |

## 결과

README는 정확도 벤치마크 표를 싣지 않는다. 성능 비교는 기술 보고서로 위임하고 README는 인용 정보만 제공하므로, DocBench와 MMLongBench 결과를 찾는다면 [[database/guo-2025-rag-anything-all-in-one-rag]]를 본다.

README가 직접 제시하는 지표는 채택과 배포 쪽이다.

| 지표 | 값 |
|---|---|
| GitHub star | 2025.07에 1,000개 도달 |
| 상류 프로젝트 채택 | 2026.06에 LightRAG가 RAG-Anything을 native integration |
| 배포 채널 | PyPI `raganything`, pepy 다운로드 배지 |
| 노출 지표 | Trendshift 저장소 배지(repositories/14959) |
| 커뮤니티 창구 | Discord 초대, WeChat 그룹, 중국어 README |

동작 확인 경로로는 예제 다섯 개를 안내한다. 뒤의 셋은 파서만 시험하므로 API 키 없이 돌려 볼 수 있다.

| 스크립트 | 용도 | API 키 |
|---|---|---|
| `examples/raganything_example.py` | MinerU를 쓰는 end-to-end 문서 처리 | 필요 |
| `examples/modalprocessors_example.py` | multimodal 콘텐츠 직접 처리 | 필요 |
| `examples/office_document_test.py` | Office 문서 파싱 시험, `--check-libreoffice` 지원 | 불필요 |
| `examples/image_format_test.py` | 이미지 형식 파싱 시험, `--check-pillow` 지원 | 불필요 |
| `examples/text_format_test.py` | 텍스트 형식 파싱 시험, `--check-reportlab` 지원 | 불필요 |

실행 명령도 README가 함께 제공한다. 파서 시험 스크립트에는 의존 설치 여부만 확인하는 옵션이 따로 있어서, 문서 처리를 돌리기 전에 환경부터 점검할 수 있다.

```bash
# 파서를 골라 end-to-end 처리
python examples/raganything_example.py path/to/document.pdf --api-key YOUR_API_KEY --parser mineru

# 처리기를 직접 호출
python examples/modalprocessors_example.py --api-key YOUR_API_KEY

# 형식별 파싱 시험 (MinerU만 사용, API 키 불필요)
python examples/office_document_test.py --file path/to/document.docx
python examples/image_format_test.py --file path/to/image.bmp
python examples/text_format_test.py --file path/to/document.md

# 의존 설치 확인
python examples/office_document_test.py --check-libreoffice --file dummy
python examples/image_format_test.py --check-pillow --file dummy
python examples/text_format_test.py --check-reportlab --file dummy
```

## 한계

**공개 URL 부착이 MinerU 경로에만 연결돼 있다.** README가 범위를 스스로 못 박는다. Docling 같은 다른 파서는 계속 동작하지만 각 파서의 content list 후처리에 헬퍼가 연결되기 전까지 `*_public_url` 필드를 만들지 않는다.

**운영체제 수준 의존이 남는다.** Office 문서에 LibreOffice가, PaddleOCR 경로에 `paddlepaddle`이 필요하다. `raganything[all]`도 Python 의존만 해결하므로 컨테이너 이미지를 만들 때 이 둘을 따로 챙겨야 한다.

**파이프라인 실패 유형이 별도 문서를 둘 만큼 많다.** README는 OCR, 표, retrieval 편향, 디버깅 요령을 다루는 점검 목록 `docs/multimodal_rag_failure_modes.md`를 따로 두고 이슈 207번과 213번을 함께 가리킨다. multimodal 파이프라인이 손이 많이 가는 구성이라는 신호로 읽을 수 있다.

**성능 특성이 수치로 제시되지 않는다.** 인덱싱 비용, 지연 시간, 처리량 가운데 어느 것도 README에 없다. 조절 수단으로 안내되는 것은 `max_workers`뿐이다.

### 자료 자체의 불일치

**extras 목록이 절마다 어긋난다.** Quick Start의 Optional Dependencies 절은 `[image]`, `[text]`, `[all]` 세 가지만 나열하는데, 뒤의 Parser Configuration과 Processing Requirements 절은 `[paddleocr]`를 추가로 안내한다. 같은 README 안에서 목록이 맞지 않는다.

**라이선스 조항이 README 본문에 없다.** 수집된 raw 파일의 frontmatter만 `license: "MIT"`를 적고, README 본문에는 라이선스 절도 `LICENSE` 파일 링크도 없다. 저장소 클론을 README 스텁으로 바꾸는 과정에서 `LICENSE` 파일이 함께 빠진 결과이므로, 라이선스를 근거로 삼아야 하는 용도라면 저장소 원본을 다시 확인해야 한다.

### 이 페이지가 다루지 않는 것

수집 자료가 README 한 편으로 바뀌면서 내부 구현을 근거로 한 서술은 확인할 방법이 없어졌다. 이전 판이 담고 있던 다음 항목은 현재 raw에 근거가 없어 이 페이지에서 뺐다.

| 이전 서술 | 현재 raw의 상태 |
|---|---|
| `aquery_vlm_enhanced()`가 세 번째 질의 메서드 | README는 `aquery`의 `vlm_enhanced` 인자로 문서화한다. 메서드 이름 자체가 등장하지 않는다 |
| `reproduce/`의 벤치마크 재현 스크립트 | 해당 디렉토리와 파일명이 README에 없다 |
| DocBench와 MMLongBench 수치 비교 | README에 벤치마크 수치가 없다. 기술 보고서 페이지가 담당한다 |
| `raganything/` 모듈별 클래스 표 | README가 언급하는 것은 `RAGAnything`, `RAGAnythingConfig`, `raganything.modalprocessors`의 처리기 세 종뿐이다 |
| 필수 의존 패키지 목록과 테스트 파일 수 | `pyproject.toml`과 `tests/`가 raw에 없다 |

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| all-in-one multimodal RAG | 텍스트만이 아니라 이미지와 표와 수식까지 한 프레임워크가 함께 처리하도록 묶은 구성 |
| content list | 파서가 문서를 분해해 내놓는 항목 목록. 항목마다 `type`과 `page_idx`를 갖고, 파싱을 건너뛰고 직접 넣을 수도 있다 |
| modal processor | modality마다 모델을 불러 설명 텍스트와 entity를 만드는 구성 요소 |
| VLM Enhanced Query | 검색된 컨텍스트의 이미지를 base64로 인코딩해 텍스트와 함께 VLM에 넘기는 질의 방식. `aquery`의 인자로 켠다 |
| belongs_to 관계 사슬 | 원본 문서의 계층 구조를 knowledge graph 위에 남기는 관계 유형 |
| `*_public_url` | 이미지 자산에 외부 접근용 URL을 붙이는 형제 필드. MinerU 파서 경로에서만 생성된다 |

## 관련 페이지

- [[database/guo-2025-rag-anything-all-in-one-rag]]: 같은 시스템의 기술 보고서. README News가 2025.10에 공개했다고 적는 arXiv 2510.12323이다. 알고리즘 세부와 벤치마크 수치는 그 페이지가 정본이고, 이 페이지는 공개 인터페이스와 운영 요구 사항을 담당한다.
- [[database/guo-2025-lightrag-simple-and-fast]]: 토대가 되는 선행 시스템. 질의 모드 이름 `hybrid`, `local`, `global`, `naive`가 여기서 온다. 2026.06 News에 따르면 통합은 양방향이 됐다.
- [[database/9bow-2026-rag-anything-multimodal-rag-framework]]: 같은 시스템을 다룬 한국어 소개글. 저장소 README가 아니라 기술 보고서 쪽 구성을 따라 정리한 자료라서 서술 범위가 다르다.
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation]]: 같은 LightRAG 계열이지만 확장 방향이 다르다. RAG-Anything이 modality를 넓힌다면 LeanRAG는 추상화 계층을 넓힌다.
- [[database/microsoft-graphrag]]: 다른 계열의 knowledge graph 기반 RAG 구현체. 두 저장소 모두 README가 알고리즘 설명을 논문으로 위임하는 구성을 취한다.
- [[overviews/lightrag-family-graph-rag-overview]]: LightRAG 계열 전체를 묶은 합성 페이지. 이 저장소는 그중 multimodal 확장 자리에 놓인다.
