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
    raw: raw/repos/startrail-org-pixelrag/docs/assets/banner.png
    caption: "PixelRAG 프로젝트 배너"
    strategy: manual
    curated: true
  - id: fig02
    file: assets/startrail-org-pixelrag/pipeline.png
    raw: raw/repos/startrail-org-pixelrag/docs/assets/pipeline.png
    caption: "텍스트 기반 RAG는 표를 파싱하며 잃어버리지만, PixelRAG는 스크린샷 타일로 렌더링해 표를 그대로 보존한다"
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

문서를 텍스트로 파싱하는 대신 **스크린샷으로 렌더링**해 이미지 자체를 검색하는 visual RAG 프레임워크. `Qwen3-VL-Embedding`을 스크린샷 데이터로 LoRA 파인튜닝해 페이지 이미지를 검색 가능한 벡터로 embed하고, 위키피디아 828만 페이지짜리 사전 구축 FAISS 인덱스를 무료 API로 제공한다.

## 1. 자료 정보 (Document Information)

- **저장소**: [StarTrail-org/PixelRAG](https://github.com/StarTrail-org/PixelRAG)
- **논문**: PIXELRAG: Web Screenshots Beat Text for Retrieval-Augmented Generation (arXiv:2606.28344, cs.IR)
- **저자**: Yichuan Wang, Zhifei Li(공동 1저자), Zirui Wang, Paul Teiletche, Lesheng Jin / (지도) Matei Zaharia, Joseph E. Gonzalez, Sewon Min
- **소속**: Berkeley Sky Computing Lab, BAIR, Berkeley NLP Group
- **라이선스**: Apache-2.0
- **라이브 서비스**: [pixelrag.ai](https://pixelrag.ai)(웹 데모), [api.pixelrag.ai](https://api.pixelrag.ai)(호스팅 검색 API), [status.pixelrag.ai](https://status.pixelrag.ai)

## 2. 주요 기여 (Key Contributions)

1. **문서를 파싱하지 않고 렌더링한다** — 웹페이지·PDF·이미지를 스크린샷으로 만들어 그 이미지 자체를 검색 대상으로 삼는다. HTML 파싱이 흔히 버리는 표·차트·레이아웃·인포그래픽 같은 시각 구조가 그대로 남고, reader 모델은 이미지에서 답을 직접 읽어낸다.
2. **`Qwen3-VL-Embedding` LoRA 파인튜닝** — 스크린샷 데이터로 파인튜닝한 임베딩 모델이 페이지 이미지를 검색 가능한 공간에 넣는다. 학습된 어댑터는 `Chrisyichuan/wiki-screenshot-embedding-lora`로 공개돼 있어, 재학습 없이 바로 쓴다.
3. **위키피디아 828만 페이지 사전 구축 인덱스를 무료 API로 공개** — `api.pixelrag.ai`는 설정이나 API 키 없이 즉시 쓰는 호스팅 검색을 제공하며, 텍스트 쿼리뿐 아니라 이미지 쿼리(visual search)도 받는다.
4. **파이프라인을 단계별로 분리 설치** — 캡처(`pixelshot`) · 임베딩(`pixelrag[embed]`) · 오케스트레이션(`pixelrag[index]`) · 서빙(`pixelrag[serve]`)이 각각 독립 설치되는 extras로 나뉘어, 필요한 단계만 설치하면 된다.
5. **Claude Code 플러그인 `pixelbrowse`** — Claude가 웹페이지의 raw HTML을 파싱하는 대신 `pixelshot`으로 스크린샷을 찍어 이미지를 직접 읽게 만드는 스킬. 차트·다이어그램·표·레이아웃을 사람이 보는 방식 그대로 인식한다.
6. **학습 데이터·코드 전면 공개** — LoRA 어댑터뿐 아니라 학습셋(`Chrisyichuan/screenshot-training-natural-filtered-v2`), 그리고 LLM 기반 쿼리 생성·필터링·hard-negative mining을 포함한 데이터 큐레이션 파이프라인 문서까지 공개해, 다른 backbone으로 재학습하는 경로를 열어둔다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

핵심은 두 가지다. (1) 문서를 텍스트로 파싱하는 대신 이미지로 렌더링하는 것, (2) 스크린샷 데이터로 LoRA 파인튜닝한 `Qwen3-VL-Embedding` 모델로 그 이미지를 검색 가능한 벡터 공간에 넣는 것.

파이프라인은 다음 4단계로 나뉜다.

| 단계 | 명령 | 역할 | 설치 |
|---|---|---|---|
| Render | `pixelshot` | 문서 → 이미지 타일 (Playwright CDP, PDF) | `pip install pixelrag` |
| Embed | `pixelrag chunk` · `embed` · `build-index` | 타일 → 벡터 → FAISS 인덱스 | `pip install 'pixelrag[embed]'` |
| Index | `pixelrag index` | source → ingest → embed → index 전체 오케스트레이션 | `pip install 'pixelrag[index]'` |
| Serve | `pixelrag serve` | FAISS 검색 API (FastAPI, CPU 또는 GPU) | `pip install 'pixelrag[serve]'` |

`render`는 `index`를 거쳐 `embed`로 이어지고, `serve`는 독립적으로 인덱스를 서빙하며, `train`은 별도로 `serve`에 어댑터를 공급한다(README의 ASCII 다이어그램: `render ←── index ──→ embed`, `serve (independent)`, `train → serve (HTTP)`).

렌더링은 웹페이지의 경우 headless Chromium(CDP), PDF의 경우 poppler 기반 변환을 쓴다. `device: auto` 설정이 Linux(CUDA)·macOS(Apple Silicon MPS)를 자동 감지해 최적 백엔드를 고른다. `train/`은 `torch==2.9.1+cu129`, `transformers==4.57.1`, cuDNN 9.20으로 버전을 고정한 별도 uv 프로젝트로, 루트 환경과 분리해 관리한다.

Claude Code 플러그인(`pixelbrowse`)은 별도 서버 없이 로컬에서 `pixelshot`(Playwright/CDP)만 호출한다. `uv tool install pixelrag`로 `pixelshot`을 PATH에 설치한 뒤 `claude plugin install pixelbrowse@pixelrag-plugins`로 붙이면 된다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README는 벤치마크 표 대신 위키피디아 828만 페이지 인덱스를 실제 서비스로 공개하는 방식으로 결과를 증명한다. `api.pixelrag.ai`에 curl로 텍스트 쿼리를 보내면 관련 페이지 이미지가 즉시 검색되고, 로컬 재현 예시(PDF 1개 인덱싱 → 개요 다이어그램이 있는 페이지 검색)도 문서에 담겨 있다. 소규모 인덱스 빌드는 Apple M-series에서 약 3분, GPU에서는 약 1분이면 끝난다고 안내한다. 다만 정량적 벤치마크 수치(recall, latency 등)는 이 README에 없고, 원 논문(arXiv:2606.28344)에 있는 것으로 보인다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **정량 벤치마크가 README에 없음** — recall·latency 등 수치 비교는 논문 쪽 자료이고, 이 저장소 자체는 사용법과 데모 중심이다.
- **대규모 인덱스는 무겁다** — 위키피디아 FAISS 인덱스(base) 크기가 약 217GB라, 셀프호스팅에는 상당한 저장 공간이 든다.
- **Turbo 렌더링은 linux-x64 전용** — 번들된 turbo `headless_shell`은 linux-x64에서만 자동 설치되고, Windows/macOS는 시스템 Chrome/Chromium이나 Playwright Chromium에 의존한다.
- **`train/`이 루트와 분리된 별도 환경** — `torch`·`transformers`·cuDNN 버전을 고정한 별도 uv 프로젝트라, 파인튜닝을 시도하려면 별도 셋업이 필요하다.

## 6. 관련 연구 (Related Work)

- **LEANN** (StarTrail-org) — 같은 조직이 이전에 만든 프로젝트로, Claude Code·OpenAI Codex의 오픈소스 기여자 지원(크레딧)을 받는 계기가 됐다고 Acknowledgments에 명시한다.
- **Qwen3-VL-Embedding** — PixelRAG의 임베딩 backbone이자 LoRA 파인튜닝 대상 모델.
- 원 논문 PIXELRAG(arXiv:2606.28344)를 이 저장소의 공식 reference 구현체로 명시한다.

## 7. 용어집 (Glossary)

- **PixelRAG**: 문서를 텍스트로 파싱하지 않고 스크린샷 이미지로 렌더링해 그 이미지를 직접 검색하는 RAG 방식.
- **pixelshot**: 웹페이지·PDF·이미지를 스크린샷 타일로 변환하는 독립 CLI 명령.
- **pixelbrowse**: `pixelshot`을 호출해 Claude가 raw HTML 대신 스크린샷 이미지를 읽게 하는 Claude Code 플러그인/스킬.
- **Qwen3-VL-Embedding**: PixelRAG가 스크린샷 데이터로 LoRA 파인튜닝하는 비전-언어 임베딩 모델.
- **FAISS**: 렌더링된 이미지의 임베딩 벡터를 저장·검색하는 인덱스 엔진.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | "PixelRAG 프로젝트 배너" | manual | ★ wiki 권장 (identity) |
| fig02 | "텍스트 기반 RAG vs PixelRAG 렌더링 비교 다이어그램" | manual | ★ wiki 권장 (method) |

