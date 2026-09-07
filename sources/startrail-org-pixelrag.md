---
title: "PixelRAG"
type: repo
year: 2026
category: database
raw_path: raw/repos/startrail-org-pixelrag.md
raw_filename: "startrail-org-pixelrag.md"
source_collection: external
org: "StarTrail-org"
repo: "PixelRAG"
url: "https://github.com/StarTrail-org/PixelRAG"
license: "Apache-2.0"
tags: [pixelrag, visual-rag, screenshot-retrieval, multimodal-embedding, qwen3-vl, faiss, vector-index, wikipedia, claude-code-plugin, repo]
figures:
  - id: fig01
    file: assets/startrail-org-pixelrag/banner.png
    raw: https://raw.githubusercontent.com/StarTrail-org/PixelRAG/main/docs/assets/banner.png
    caption: "PixelRAG 프로젝트 배너"
    strategy: manual
    curated: true
  - id: fig02
    file: assets/startrail-org-pixelrag/pipeline.png
    raw: https://raw.githubusercontent.com/StarTrail-org/PixelRAG/main/docs/assets/pipeline.png
    caption: "텍스트 기반 RAG는 파싱 과정에서 표를 잃고 답하지 못하지만, PixelRAG는 같은 페이지를 스크린샷 타일로 렌더링해 표를 그대로 남기고 수치를 읽어낸다"
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

문서를 텍스트로 파싱하는 대신 스크린샷으로 렌더링해 이미지 자체를 검색하는 visual RAG 프레임워크다. `Qwen/Qwen3-VL-Embedding-2B`를 스크린샷 데이터로 LoRA fine-tuning해 페이지 이미지를 검색 가능한 벡터 공간에 배치하고, 위키피디아 828만 페이지 사전 구축 인덱스를 키 없이 쓰는 호스팅 API로 공개한다.

## 1. 자료 정보 (Document Information)

- **저장소**: [StarTrail-org/PixelRAG](https://github.com/StarTrail-org/PixelRAG)
- **논문**: PIXELRAG: Web Screenshots Beat Text for Retrieval-Augmented Generation (arXiv:2606.28344, cs.IR, 2026). BibTeX 키는 `wang2026pixelragwebscreenshotsbeat`다.
- **저자**: Yichuan Wang, Zhifei Li (두 사람이 공동 1저자), Zirui Wang, Paul Teiletche, Lesheng Jin. 지도는 Matei Zaharia, Joseph E. Gonzalez, Sewon Min 세 사람이 동등하게 맡았다.
- **소속**: Berkeley Sky Computing Lab (SkyLab), BAIR, Berkeley NLP Group
- **라이선스**: Apache-2.0 (README 하단 License 절과 배지 모두 동일)
- **표어**: "Search any document by how it looks, not just the text it contains."
- **운영 중인 서비스**: 웹 데모 [pixelrag.ai](https://pixelrag.ai), 호스팅 검색 API [api.pixelrag.ai](https://api.pixelrag.ai), 상태 페이지 [status.pixelrag.ai](https://status.pixelrag.ai), GitHub Actions CI 배지, Slack 초대 링크
- **감사 표시**: Rulin Shao의 지원. 그리고 Claude Code와 OpenAI Codex가 오픈소스 기여자에게 제공한 크레딧과 플랜에 대한 감사가 있는데, README는 그 크레딧을 LEANN 작업으로 얻었다고 적는다.

## 2. 주요 기여 (Key Contributions)

1. **파싱 대신 렌더링한다.** 웹페이지, PDF, 이미지를 스크린샷으로 만들어 그 이미지 자체를 검색 대상으로 삼는다. HTML 파싱이 흔히 버리는 표, 차트, 레이아웃, 인포그래픽 같은 시각 구조가 그대로 남아, reader 모델이 그 내용을 실제로 답할 수 있게 된다.
2. **스크린샷 데이터로 LoRA fine-tuning한 임베딩 모델.** `Qwen/Qwen3-VL-Embedding-2B`를 웹페이지 검색용으로 LoRA fine-tuning해, 페이지 이미지를 시각 내용까지 검색 가능한 공간에 배치한다. 학습된 어댑터는 `Chrisyichuan/wiki-screenshot-embedding-lora`의 `lora_vit/ckpt200`으로 공개돼 있어, 재학습 없이 그대로 쓸 수 있다.
3. **위키피디아 828만 페이지 사전 구축 인덱스를 무료 호스팅 API로 공개.** `https://api.pixelrag.ai/search`는 설정도 API 키도 없이 즉시 호출되며, 텍스트 쿼리뿐 아니라 이미지를 쿼리로 받는 visual search도 지원한다. 위키피디아 828만 문서가 사전 구축 인덱스로 함께 배포되지만, 파이프라인 자체는 특정 코퍼스에 묶이지 않은 범용이다.
4. **단계별로 쪼개 설치하는 파이프라인.** 캡처는 독립 명령 `pixelshot`이고, 나머지는 `pixelrag <stage>` 우산 명령 아래 있다. `embed`, `index`, `serve` extras가 각각 따로 설치되므로 필요한 단계만 설치하면 된다.
5. **Claude Code 플러그인 `pixelbrowse`.** 렌더러가 Claude Code 스킬로도 배포된다. Claude가 raw HTML을 가져오는 대신 `pixelshot`으로 페이지를 스크린샷해 이미지를 읽으므로, 차트, 다이어그램, 표, 레이아웃을 사람이 보는 방식으로 인식한다. MCP 서버도 백엔드도 없이 로컬에서 `pixelshot`만 호출한다.
6. **학습 자산 전면 공개.** LoRA 어댑터뿐 아니라 전체 학습셋 `Chrisyichuan/screenshot-training-natural-filtered-v2`를 공개해, 더 큰 Qwen이나 다른 임베딩 모델 같은 다른 backbone에 같은 방식을 적용할 수 있게 했다. 데이터 큐레이션 파이프라인(LLM 기반 쿼리 증강 생성, 필터링, hard-negative mining)은 `train/docs/synthetic_data_pipeline.md`에 문서화돼 있다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 두 가지 핵심 요소

README가 명시하는 핵심은 두 가지다. 첫째, 문서를 텍스트로 파싱하는 대신 이미지로 렌더링한다. 둘째, 스크린샷 데이터로 LoRA fine-tuning한 `Qwen3-VL-Embedding` 모델이 페이지 이미지를 시각 내용이 검색 가능한 공간으로 임베딩한다.

두 핵심 연산도 같은 구도로 제시된다. 페이지를 스크린샷으로 **render**하는 것과, 시각 인덱스를 **search**하는 것이다.

### 3.2 파이프라인 단계와 설치 단위

| 명령 | 하는 일 | 설치 |
|---|---|---|
| `pixelshot` | 문서를 이미지 타일로 변환 (Playwright CDP, PDF) | `pip install pixelrag` |
| `pixelrag chunk`, `embed`, `build-index` | 타일을 벡터로, 벡터를 FAISS 인덱스로 | `pip install 'pixelrag[embed]'` |
| `pixelrag index` | source에서 ingest, embed, index까지 전체 오케스트레이션 | `pip install 'pixelrag[index]'` |
| `pixelrag serve` | FAISS 검색 API (FastAPI, CPU 또는 GPU) | `pip install 'pixelrag[serve]'` |

단계 사이 관계는 README의 ASCII 다이어그램이 `render ←── index ──→ embed`, `serve (independent)`, `train → serve (HTTP)`로 적는다. `index`가 render와 embed를 호출하는 오케스트레이터이고, `serve`는 독립적으로 동작하며, `train`은 HTTP를 통해 `serve`와 이어진다.

`train`은 루트가 아니라 별도 uv 프로젝트다. `torch==2.9.1+cu129`, `transformers==4.57.1`, cuDNN 9.20으로 환경이 고정돼 있고, 루트가 아니라 `train/` 안에서 설치해야 한다.

### 3.3 렌더링

렌더링 대상은 웹 URL과 로컬 파일 양쪽이며, 한 명령에 자유롭게 섞을 수 있다.

| 입력 | 처리 방식 | 추가 요구 |
|---|---|---|
| 웹페이지 | headless Chromium을 CDP로 구동해 타일 생성 | 없음 (`pip install pixelrag`) |
| PDF | 타일 변환, `--dpi 200` 같은 해상도 지정 가능 | poppler, `pip install 'pixelrag[pdf]'` |
| 이미지 | 렌더링 대상 문서 유형으로 명시 | 없음 |

Python API도 있다. `from pixelrag_render import render_url` 후 `render_url("https://en.wikipedia.org/wiki/Python", "./tiles")`를 호출하면 타일이 생성되며, README는 에이전트가 읽을 용도를 예로 든다.

Chrome 조달 방식은 플랫폼마다 다르다. 번들된 turbo `headless_shell`은 linux-x64에서만 자동 설치되고, 그 밖의 플랫폼에서는 시스템에 설치된 Chrome이나 Chromium, 또는 Playwright의 Chromium을 표준 설치 경로에서 자동 탐지해 쓴다. 자동 탐지가 실패하면 `CHROME_PATH`로 바이너리를 직접 지정한다. 렌더링은 매번 격리된 일회용 Chrome 프로필에서 실행되므로 사용자가 Chrome을 열어 둔 상태에서도 동작한다.

### 3.4 임베딩과 인덱싱

`pixelrag[embed]`를 설치하면 오케스트레이터 없이 각 단계를 따로 실행할 수 있다.

| 명령 | 인자 예시 | 역할 |
|---|---|---|
| `pixelrag chunk` | `--tiles-dir ./tiles` | 타일을 청크 단위로 분할 |
| `pixelrag embed` | `--shard-dir ./tiles --output-dir ./embeddings --gpu-ids 0,1` | 타일을 임베딩 벡터로 변환, 다중 GPU 지정 가능 |
| `pixelrag build-index` | `--embeddings-dir ./embeddings --output-dir ./index` | 임베딩을 FAISS 인덱스로 빌드 |

자체 문서를 인덱싱할 때는 `pixelrag.yaml` 설정 파일을 두고 `pixelrag index build`를 실행한다. Linux(CUDA)와 macOS(Apple Silicon MPS)에서 동작한다.

| 설정 키 | 예시 값 | 뜻 |
|---|---|---|
| `source.type` | `local` | 입력 소스 종류 |
| `source.path` | `./my_docs`, `./paper.pdf` | 입력 디렉터리 또는 파일 |
| `embed.model` | `Qwen/Qwen3-VL-Embedding-2B` | 임베딩 모델 |
| `embed.device` | `auto` | Linux는 cuda, macOS는 mps, 없으면 cpu로 폴백 |
| `output` | `./my_index` | 인덱스 출력 경로 |

### 3.5 서빙과 사전 구축 인덱스

`pixelrag serve --index-dir <경로> --port 30001`로 로컬 검색 API를 띄운다. 요청 형식은 호스팅 API와 같다. `POST /search`에 `{"queries": [{"text": "What is the capital of France?"}], "n_docs": 5}` 꼴의 JSON을 보낸다. 호스팅 엔드포인트는 이미지도 쿼리로 받는다고 명시한다.

사전 구축 인덱스는 Hugging Face 데이터셋 저장소 `StarTrail-org/pixelrag-faiss-indexes`에 있고, FAISS 인덱스 네 개를 담는다.

| 인덱스 | 내용 | 크기 |
|---|---|---|
| base Wikipedia pixel | 기본 모델로 만든 위키피디아 픽셀 인덱스, 경로 `search_index_normed_v2/` | 약 217GB |
| LoRA Wikipedia pixel | LoRA 어댑터를 적용해 만든 위키피디아 픽셀 인덱스 | README에 없음 |
| Wikipedia text | 위키피디아 텍스트 인덱스 | README에 없음 |
| news pixel | 뉴스 픽셀 인덱스 | README에 없음 |

`huggingface-cli download StarTrail-org/pixelrag-faiss-indexes --repo-type dataset --include "search_index_normed_v2/*" --local-dir ./index`처럼 필요한 인덱스만 골라 받는다.

### 3.6 학습

fine-tuning은 `train/` 아래 별도 uv 프로젝트 `wiki-screenshot-training`에 있다. `Qwen/Qwen3-VL-Embedding-2B`를 웹페이지 검색용으로 LoRA fine-tuning하며, `cd train && uv sync` 후 그 안에서 실행한다. 전체 레시피는 `train/README.md`가 담는다.

| 공개 자산 | 위치 | 용도 |
|---|---|---|
| LoRA 어댑터 | `Chrisyichuan/wiki-screenshot-embedding-lora` (`lora_vit/ckpt200`) | 재학습 없이 바로 사용 |
| 학습셋 | `Chrisyichuan/screenshot-training-natural-filtered-v2` | 다른 backbone에 같은 방식 적용 |
| 데이터 큐레이션 문서 | `train/docs/synthetic_data_pipeline.md` | LLM 기반 쿼리 증강 생성, 필터링, hard-negative mining |

### 3.7 pixelbrowse 플러그인

렌더러는 Claude Code 플러그인으로도 배포된다. 설치는 세 단계다.

| 단계 | 명령 | 비고 |
|---|---|---|
| CLI를 PATH에 설치 | `uv tool install pixelrag` 또는 `pipx install pixelrag` | 프로젝트 venv에 그냥 `pip install`하면 `pixelshot`이 PATH에 없을 수 있다 |
| 마켓플레이스 등록 | `claude plugin marketplace add StarTrail-org/PixelRAG` | 저장소를 클론할 필요는 없다 |
| 플러그인 설치 | `claude plugin install pixelbrowse@pixelrag-plugins` | |

호출은 두 가지다. 비대화형은 `claude -p "screenshot https://news.ycombinator.com and summarize the top stories"`처럼 프롬프트로 지시하고, 대화형 세션에서는 슬래시 커맨드 `/screenshot https://example.com`을 쓴다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 README에는 recall이나 latency 같은 정량 벤치마크 표가 없다. 대신 실제로 동작하는 서비스와 재현 가능한 예시로 결과를 보인다.

| 근거 | 내용 |
|---|---|
| 호스팅 인덱스 | 위키피디아 828만 페이지 인덱스를 설정과 API 키 없이 공개 운영. curl 한 줄로 검색된다 |
| 웹 데모 | [pixelrag.ai](https://pixelrag.ai) 브라우저 데모 |
| Colab 노트북 | `demos/quickstart.ipynb`가 페이지를 렌더링하고 호스팅 인덱스를 검색하며, 이미지를 인라인으로 보여준다 |
| 로컬 재현 | 샘플 PDF(`assets/pixelrag-paper.pdf`) 한 개를 인덱싱한 뒤 "Overview of PixelRAG and the diagram"으로 검색하면 개요 다이어그램이 있는 2쪽이 나와야 한다고 명시 |

샘플 PDF 한 개를 인덱싱하는 데 걸리는 시간은 Apple M 시리즈에서 약 3분, GPU에서 약 1분이라고 안내한다. 이 예시는 GPU 없이도 동작하며 macOS(Apple Silicon)나 Python 3.10 이상이 있는 아무 기기에서 실행된다.

Figure 2의 워크된 예시는 방식 차이를 하나의 질문으로 보여준다. 2010 UEFA 챔피언스리그 결승 위키피디아 페이지에 "인터가 바이에른과의 2010 UCL 결승에서 유효 슈팅을 몇 개 기록했는가"를 묻는다. 텍스트 기반 RAG는 HTML을 파싱해 텍스트 청크로 만드는 과정에서 통계 표를 잃고, reader 모델이 "주어진 컨텍스트로는 답을 결정할 수 없다"고 답한다. PixelRAG는 같은 페이지를 스크린샷 타일로 렌더링해 통계 표가 들어 있는 타일을 검색하고, reader 모델이 표에서 값 7을 그대로 읽는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **정량 벤치마크가 README에 없다.** recall이나 latency 같은 수치 비교는 이 저장소 문서에 없다. 저장소는 사용법과 데모 중심이고, 수치를 확인하려면 논문(arXiv:2606.28344)을 따로 봐야 한다.
- **대규모 인덱스의 저장 비용이 크다.** 위키피디아 base 픽셀 인덱스 하나가 약 217GB다. 나머지 세 인덱스의 크기는 README에 없어서 전체 규모를 알 수 없다.
- **turbo 렌더링이 linux-x64 전용이다.** 번들된 turbo `headless_shell`은 linux-x64에서만 자동 설치되고, Windows와 macOS는 시스템 Chrome이나 Playwright Chromium에 의존한다. 자동 탐지가 실패하면 `CHROME_PATH`를 직접 지정해야 한다.
- **학습 환경이 루트와 분리돼 있다.** `train/`은 `torch`, `transformers`, cuDNN 버전을 고정한 별도 uv 프로젝트라, fine-tuning을 시도하려면 별도 설치 절차를 거쳐야 한다.
- **설치 경로에 따라 CLI가 PATH에서 빠질 수 있다.** README 본문은 `pixelshot`이 `pip install pixelrag`로 함께 설치된다고 적으면서, 플러그인 절에서는 프로젝트 venv에 그냥 설치하면 PATH에 없을 수 있다고 경고한다. 격리 설치 도구(`uv tool`, `pipx`)를 권장하는 이유다.
- **단계 간 디렉터리 규약이 문서화되지 않았다.** 독립 실행 예시에서 `pixelrag chunk --tiles-dir ./tiles`의 출력 위치가 명시되지 않은 채 다음 단계가 `pixelrag embed --shard-dir ./tiles`로 같은 `./tiles`를 가리킨다. chunk의 산출물이 어디에 쌓이는지 README만으로는 확인되지 않는다.
- **저장소는 reference 구현이고 방법론 근거는 논문에 있다.** 설계 선택(타일 분할 기준, 임베딩 차원, 검색 파라미터)의 근거는 README 범위 밖이다.

## 6. 관련 연구 (Related Work)

- **PIXELRAG (arXiv:2606.28344)**: 이 저장소가 공식 코드베이스로 명시하는 원 논문. 제목이 "Web Screenshots Beat Text for Retrieval-Augmented Generation"이다.
- **Qwen3-VL-Embedding**: PixelRAG가 LoRA fine-tuning 대상으로 삼는 비전 언어 임베딩 모델. 설정에서 쓰는 버전은 `Qwen/Qwen3-VL-Embedding-2B`다.
- **LEANN (StarTrail-org)**: 같은 조직의 이전 프로젝트. README는 Claude Code와 OpenAI Codex의 오픈소스 기여자 크레딧을 LEANN 작업으로 얻었다고 적는다. 커뮤니티 Slack 워크스페이스 이름도 LEANN 계열이다.
- **FAISS**: 인덱스 빌드와 서빙 양쪽에서 쓰는 벡터 인덱스 엔진.
- **Playwright / CDP**: 웹페이지를 headless Chromium으로 렌더링하는 수단.

## 7. 용어집 (Glossary)

- **PixelRAG**: 문서를 텍스트로 파싱하지 않고 스크린샷 이미지로 렌더링해 그 이미지를 직접 검색하는 RAG 방식.
- **pixelshot**: 웹페이지, PDF, 이미지를 스크린샷 타일로 변환하는 독립 CLI 명령. `pip install pixelrag`에 포함된다.
- **screenshot tile**: 한 페이지를 검색 단위로 자른 스크린샷 조각. 텍스트 RAG의 텍스트 청크에 대응하는 단위다.
- **pixelbrowse**: `pixelshot`을 호출해 Claude가 raw HTML 대신 스크린샷 이미지를 읽게 하는 Claude Code 플러그인 스킬.
- **visual search**: 텍스트가 아니라 이미지를 쿼리로 주고 인덱스를 검색하는 방식. 호스팅 API가 지원한다.
- **Qwen3-VL-Embedding**: PixelRAG가 스크린샷 데이터로 LoRA fine-tuning하는 비전 언어 임베딩 모델.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | "PixelRAG 프로젝트 배너" | manual | ★ wiki 권장 (identity) |
| fig02 | "텍스트 기반 RAG vs PixelRAG 렌더링 비교 다이어그램" | manual | ★ wiki 권장 (method) |
