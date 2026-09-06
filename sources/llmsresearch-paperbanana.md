---
title: "PaperBanana: Automated Academic Illustration for AI Scientists"
type: repo
year: 2026
category: agents
raw_path: raw/repos/llmsresearch-paperbanana.md
raw_filename: "llmsresearch-paperbanana.md"
source_collection: external
org: "llmsresearch"
repo: "paperbanana"
url: "https://github.com/llmsresearch/paperbanana"
license: "MIT"
tags: [multi-agent, vlm, image-generation, academic-diagram, matplotlib, mcp-server, agentic-pipeline, vlm-as-judge]
figures:
  - id: fig01
    label: Hero image
    kind: figure
    raw: https://github.com/llmsresearch/paperbanana/blob/main/assets/img/hero_image.png
    caption: "논문을 입력으로 받아 다이어그램을 산출하는 전체 흐름"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

방법론 텍스트 한 편을 입력으로 받아 7개 전문화 에이전트가 차례로 처리해 출판 품질의 다이어그램과 통계 플롯을 만들어 내는 오픈소스 프레임워크로, CLI와 Python API, MCP 서버, Claude Code 스킬, 로컬 웹 UI를 함께 제공한다.

## 1. 자료 정보 (Document Information)

PaperBanana는 arXiv:2601.23265 논문 "PaperBanana: Automating Academic Illustration for AI Scientists"를 커뮤니티가 재구현한 비공식 오픈소스 프로젝트다. 원 논문 저자는 Dawei Zhu, Rui Meng, Yale Song, Xiyu Wei, Sujian Li, Tomas Pfister, Jinsung Yoon 일곱 명이다. README는 상단 disclaimer와 하단 Disclaimer 절에서 두 번에 걸쳐, 이 저장소가 원저자와 Google Research, Peking University 어느 쪽과도 무관하며 공개된 논문만 보고 독립적으로 구현했다고 밝힌다.

배포 조건은 MIT 라이선스이고 Python 3.10 이상을 요구한다. CLI는 Typer로, 설정 모델은 Pydantic v2로 구현했다. 설치 경로는 세 가지다.

| 경로 | 명령 | 비고 |
|---|---|---|
| PyPI | `pip install paperbanana` | 기본 경로 |
| 소스 | `pip install -e ".[dev,openai,google]"` | 개발용 extras 포함 |
| Docker | `docker build -t paperbanana .` 후 `docker run` | API 키는 실행 시 환경 변수로 전달하고, 입력 파일과 출력 폴더를 컨테이너의 `/work`에 마운트한다 |

선택 extras로 `paperbanana[pdf]`(PyMuPDF, PDF 입력), `paperbanana[studio]`(Gradio 웹 UI), `paperbanana[mcp]`(MCP 서버)가 있다. 로컬 설치 없이 시험할 경로로 Colab 퀵스타트 노트북과 Hugging Face Spaces 데모를 함께 안내한다. API 키는 `.env` 파일에 직접 적거나 `paperbanana setup` 대화형 마법사로 설정한다. 마법사는 공식 Gemini API를 쓸지 먼저 묻고, 쓰지 않겠다고 하면 Gemini 호환 URL과 키를 따로 입력받는다.

## 2. 주요 기여 (Key Contributions)

첫째, 방법론 텍스트와 caption 한 줄만 주면 다이어그램 생성부터 비평과 수정까지 이어지는 파이프라인을 갖췄다. 산출물은 `outputs/run_<timestamp>/final_output.png`에 저장되고 중간 반복본과 메타데이터도 같은 폴더에 남는다.

둘째, VLM provider와 이미지 생성 provider를 서로 독립적으로 지정한다. OpenAI, Azure OpenAI/Foundry, Google Gemini, Atlas Cloud, OpenRouter를 지원하므로 무료 Gemini 키만으로도 전체 흐름을 실행할 수 있다.

셋째, 통계 플롯은 VLM이 matplotlib 코드를 생성하는 방식이라 이미지 생성 provider나 그 인증 정보를 요구하지 않는다.

넷째, 진입 경로를 여섯 가지로 열어 두었다.

| 진입 경로 | 형태 | 비고 |
|---|---|---|
| CLI | `paperbanana` 명령 | generate, plot, batch, sweep, orchestrate, composite, evaluate, polish, studio, setup, data, venues 등 |
| Python API | `PaperBananaPipeline` | asyncio 기반. `progress_callback`으로 단계별 진행 이벤트 수신 |
| MCP 서버 | `uvx --from paperbanana[mcp] paperbanana-mcp` | 11개 도구 노출. Claude Code, Cursor 등 MCP 클라이언트와 연동 |
| Claude Code 스킬 | `/generate-diagram`, `/generate-plot`, `/evaluate-diagram` | 저장소 `.claude/skills/`에 동봉 |
| Studio | `paperbanana studio` | Gradio 로컬 웹 UI |
| GitHub Action | `llmsresearch/paperbanana/integrations/github-action@main` | Overleaf의 GitHub 동기화와 짝을 이룬다 |

다섯째, 논문 한 편에 그림이 여러 장 필요한 상황을 겨냥한 기능을 갖췄다. YAML 또는 JSON 매니페스트 기반 배치 생성, 여러 패널을 `(a)`, `(b)`, `(c)` 라벨과 함께 한 장으로 합치는 composite, 논문 전체를 파싱해 figure 패키지를 만드는 `orchestrate`, 설정 조합을 훑어 비교하는 `sweep`이 여기에 해당한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 두 단계 파이프라인과 7개 에이전트

README는 파이프라인을 최대 7개 전문화 에이전트로 설명한다. Phase 0는 선택 단계이고 Phase 1은 한 번 실행되는 선형 구간, Phase 2는 반복 구간이다.

| Phase | 에이전트 | 역할 |
|---|---|---|
| 0 (선택, `--optimize`) | Context Enricher | 원문 방법론 텍스트를 컴포넌트, 흐름, 그룹, 입출력 단위의 다이어그램 친화 형식으로 재구성한다 |
| 0 (선택, `--optimize`) | Caption Sharpener | 모호한 caption을 정밀한 시각 명세로 바꾼다 |
| 1 | Retriever | 검증된 방법론 다이어그램 13개 중 가장 관련 있는 참조 예시를 고른다 |
| 1 | Planner | 고른 예시를 활용한 in-context learning으로 목표 다이어그램의 상세 텍스트 설명을 만든다 |
| 1 | Stylist | NeurIPS 스타일 가이드라인의 색상 팔레트, 레이아웃, 타이포그래피에 맞춰 설명을 다듬는다 |
| 2 | Visualizer | 설명을 이미지로 렌더링한다 |
| 2 | Critic | 생성 이미지를 원본 컨텍스트와 대조해 문제를 지적하고 수정된 설명을 돌려준다 |

Phase 0의 두 에이전트는 VLM 호출 두 건을 병렬로 실행한다. Retriever가 고르는 참조 집합 13개는 에이전트와 추론, 비전과 지각, 생성과 학습, 과학과 응용 네 영역에 걸쳐 있다. Phase 2는 Visualizer와 Critic이 기본 3회 반복하며, `--auto`를 주면 Critic이 만족할 때까지 계속하고 `--max-iterations`(기본 30)가 상한 역할을 한다.

### provider 구성

| 구성 요소 | provider | 모델 | 비고 |
|---|---|---|---|
| VLM(계획, 비평) | OpenAI | `gpt-5.2` | 기본값 |
| 이미지 생성 | OpenAI | `gpt-image-1.5` | 기본값 |
| VLM | Atlas Cloud | `deepseek-ai/DeepSeek-V3-0324` | OpenAI 호환 chat 엔드포인트 |
| 이미지 생성 | Atlas Cloud | `openai/gpt-image-2/text-to-image` | 비동기 예측 API |
| VLM | Google Gemini | `gemini-2.5-flash` | 저비용 |
| 이미지 생성 | Google Gemini | `gemini-3-pro-image-preview` | 이미지 1장당 0.134달러(1K 해상도) |
| VLM, 이미지 생성 | OpenRouter | 지원 모델 전부 | 유연한 라우팅 |

Azure OpenAI와 Foundry 엔드포인트는 `OPENAI_BASE_URL`만 지정하면 자동으로 인식된다. Gemini 호환 게이트웨이는 `GOOGLE_BASE_URL`로 지정한다. Atlas Cloud는 chat과 이미지 생성의 base URL이 달라 `ATLASCLOUD_BASE_URL`과 `ATLASCLOUD_IMAGE_BASE_URL`을 각각 둔다. Atlas Cloud는 전 모달리티에 걸쳐 300개가 넘는 모델을 단일 API로 제공하는 추론 플랫폼이며, README는 그중 검증된 VLM 5종(`openai/gpt-4o`, `openai/gpt-4.1`, `google/gemini-2.5-flash`, `anthropic/claude-sonnet-4.5-20250929` 등)과 이미지 모델 6종(`baidu/ERNIE-Image-Turbo/text-to-image`, `black-forest-labs/flux-dev`, `black-forest-labs/flux-schnell`, `qwen/qwen-image` 등)을 권장 목록으로 제시한다.

### 주요 CLI 명령

| 명령 | 하는 일 |
|---|---|
| `generate` | 방법론 다이어그램 생성. 텍스트 또는 PDF 입력 |
| `plot` | CSV 또는 JSON 데이터로 통계 플롯 생성 |
| `batch`, `plot-batch` | 매니페스트 하나로 다이어그램 또는 플롯 여러 장 생성 |
| `batch-report`, `sweep-report` | 기존 배치와 sweep 결과를 Markdown 또는 HTML 리포트로 렌더링 |
| `sweep` | 설정 조합을 훑어 변형본을 만들고 순위를 매긴다 |
| `orchestrate` | 논문 전체를 파싱해 figure 패키지를 계획하고 생성한다 |
| `composite` | 기존 이미지 여러 장을 라벨 붙은 한 장으로 합친다. API 호출 없음 |
| `evaluate` | 생성 다이어그램을 사람이 만든 참조와 비교 평가한다 |
| `polish` | 이미 있는 그림을 venue 스타일 가이드에 맞춰 수정한다 |
| `venues` | venue 스타일 팩을 만들고 목록을 확인한다 |
| `guidelines synthesize` | 예시 그림 모음에서 스타일 가이드를 생성한다 |
| `data` | PaperBananaBench 참조 데이터셋을 내려받고 캐시를 관리한다 |
| `studio`, `setup` | 로컬 웹 UI 실행, 초기 설정 마법사 |

`generate`의 주요 플래그는 다음과 같다.

| 플래그 | 설명 |
|---|---|
| `--input`, `-i` | 방법론 텍스트 파일 또는 PDF 경로. 새 실행에 필수 |
| `--caption`, `-c` | 그림 caption이자 전달 의도. 새 실행에 필수 |
| `--image` | 손그림 스케치, 화이트보드 사진, 기존 그림 등 Planner를 안내할 참조 이미지. 반복 지정 가능 |
| `--iterations`, `-n` | Visualizer와 Critic 반복 횟수(기본 3) |
| `--num-candidates`, `-k` | 후보 이미지를 1~8장 병렬 생성. 계획은 한 번만 실행하고 개선 단계만 seed offset을 두어 분기한다. 결과는 `candidates/cand_<i>/`에 저장되고 실행 루트의 `final_output`은 1번 후보다 |
| `--auto`, `--max-iterations` | Critic이 만족할 때까지 반복하되 상한을 둔다(기본 30) |
| `--optimize` | Phase 0 입력 최적화 활성화 |
| `--continue`, `--continue-run`, `--feedback` | 직전 또는 지정한 실행을 이어서 진행하고 사용자 피드백을 Critic에 전달한다 |
| `--pdf-pages` | PDF 입력의 1-based 페이지 선택(`1-5`, `2,4,6-8`) |
| `--format`, `-f` | `png`, `jpeg`, `webp` 중 선택(기본 `png`) |
| `--config` | YAML 설정 파일 경로 |
| `--verbose`, `--progress-json` | 에이전트 진행과 소요 시간 출력, 진행 이벤트를 JSON으로 stdout에 방출 |

### venue 스타일 팩

`--venue`는 스타일 팩 디렉터리를 지정한다. 팩은 `methodology_style_guide.md`, `plot_style_guide.md`, 그리고 선택 항목인 `venue.yaml`로 구성된다. `venue.yaml`은 `display_name`, `aspect_ratio`, `fonts` 세 필드를 받으며 전부 선택이다. 기본 제공 팩은 `neurips`, `icml`, `acl`, `ieee` 네 개이고, 사용자 팩은 `~/.config/paperbanana/venues/`에 두면 저장소를 수정하지 않고도 인식된다. 위치는 `--venue-dir` 또는 `PAPERBANANA_VENUE_DIR`로 바꾼다. 이름이 겹치면 기본 제공 팩이 이기므로 사용자 팩이 기본 팩을 가릴 수 없다. 없는 이름을 주면 양쪽 목록을 보여주며 즉시 실패한다.

### 배치와 오케스트레이션

배치 매니페스트는 `items` 목록을 갖고 각 항목에 `input`, `caption`, `id`를 적는다. PDF 입력이면 `pdf_pages`를 덧붙인다. 경로는 매니페스트 파일이 있는 디렉터리 기준으로 해석된다. 출력은 `outputs/batch_<id>/run_<id>/`에 쌓이고 `batch_report.json`이 전체를 요약한다. 매니페스트에 `composite` 절을 두면 배치가 끝난 뒤 패널을 자동으로 합친다. 이 절은 `layout`(`1x3`이나 `auto`), `labels`, `spacing`(픽셀), `label_position`(`top` 또는 `bottom`), `output`을 받는다. 리포트에는 `batch_kind`가 기록되어 다이어그램 배치는 `methodology`, 플롯 배치는 `statistical_plot`으로 구분된다.

`plot-batch`는 항목마다 `data`와 `intent`를 받고 `aspect_ratio`를 항목별로 지정할 수 있다. 기본 VLM provider가 `gemini`인 점이 `generate`와 다르다.

`sweep`은 여덟 개의 쉼표 구분 CLI 플래그 대신 매니페스트로 조합 계획 전체를 기술할 수 있으며, 매니페스트와 개별 조합 플래그는 함께 쓸 수 없다. 렌더링된 sweep 리포트는 요약, 상위 5개 순위표, 그리고 변형별 provider와 모델, 반복 횟수, Critic 제안 건수, proxy 점수, 출력 경로를 담은 전체 변형표를 포함한다. dry-run 리포트는 간략한 계획 목록만 렌더링한다.

`orchestrate`는 논문 원본(`.txt`, `.md`, `.pdf`)을 파싱해 섹션 구조에서 방법론 그림 여러 장을 계획하고, 선택적으로 CSV와 JSON 파일을 찾아 통계 플롯까지 계획한 뒤 전부 생성한다. 산출물은 `figure_package.json`, `figures/`, `figures.tex`, `captions.md`를 담은 패키지 폴더다. `--dry-run`은 API 호출 없이 `orchestration_plan.json`만 만들고, `--resume-orchestrate`는 중단된 작업을 체크포인트에서 이어받는다. `--retry-failed`, `--max-retries`, `--concurrency`로 실패 재시도와 병렬 작업자 수를 조절한다.

### 설정과 환경 변수

기본 설정은 `configs/config.yaml`에 있고 CLI 플래그나 사용자 YAML로 덮어쓴다.

| 설정 키 | 기본값 | 뜻 |
|---|---|---|
| `vlm.provider`, `vlm.model` | `openai`, `gpt-5.2` | VLM provider와 모델 |
| `image.provider`, `image.model` | `openai_imagen`, `gpt-image-1.5` | 이미지 생성 provider와 모델 |
| `pipeline.num_retrieval_examples` | 10 | Retriever가 가져오는 참조 예시 수 |
| `pipeline.refinement_iterations` | 3 | Visualizer와 Critic 반복 횟수 |
| `pipeline.auto_refine`, `pipeline.max_iterations` | 주석 처리, 30 | 자동 반복과 안전 상한 |
| `pipeline.optimize_inputs` | 주석 처리 | Phase 0 입력 최적화 |
| `pipeline.output_resolution` | `"2k"` | 출력 해상도 |
| `reference.path` | `data/reference_sets` | 참조 집합 경로 |
| `output.dir`, `output.save_iterations`, `output.save_metadata` | `outputs`, true, true | 출력 폴더와 중간 산출물 보존 |

환경 변수는 provider별로 묶여 있다. OpenAI는 `OPENAI_API_KEY`, `OPENAI_BASE_URL`, `OPENAI_VLM_MODEL`, `OPENAI_IMAGE_MODEL`을 쓴다. Atlas Cloud는 `ATLASCLOUD_API_KEY`와 앞서 언급한 두 base URL, `ATLASCLOUD_VLM_MODEL`, `ATLASCLOUD_IMAGE_MODEL`을 쓴다. Google Gemini는 `GOOGLE_API_KEY`, `GOOGLE_BASE_URL`, `GOOGLE_VLM_MODEL`, `GOOGLE_IMAGE_MODEL`을 쓴다.

### 저장소 구조

`paperbanana/` 패키지는 파이프라인 오케스트레이션과 타입, 설정, 재개 로직을 담은 `core/`, 에이전트 구현이 있는 `agents/`, provider 구현이 VLM과 이미지 생성으로 나뉜 `providers/`, 참조 집합 관리 `reference/`, 스타일 가이드라인 로더 `guidelines/`, VLM-as-a-Judge 평가 `evaluation/`으로 구성된다. 프롬프트 템플릿은 `prompts/` 아래에서 `diagram/`(context_enricher, caption_sharpener, retriever, planner, stylist, visualizer, critic), `plot/`, `evaluation/`(faithfulness, conciseness, readability, aesthetics)으로 나뉜다. 데이터는 `data/reference_sets/`의 검증된 방법론 다이어그램 13개와 `data/guidelines/`의 NeurIPS 스타일 가이드라인이다. 그 밖에 `mcp_server/`, `.claude/skills/`, `examples/`, `scripts/`, `tests/`가 있다. 개발 명령은 `pytest tests/ -v`와 `ruff check`, `ruff format`이다.

### MCP 도구와 Python API

MCP 서버는 11개 도구를 노출한다. `generate_diagram`, `generate_plot`, `continue_run`, `continue_diagram`, `continue_plot`, `evaluate_diagram`, `evaluate_plot`, `orchestrate_figures`, `batch_diagrams`, `batch_plots`, `download_references`다. 로컬 클론 없이 `uvx`로 실행하도록 설정 예시를 제공한다.

Python API는 `Settings`로 provider와 모델, `optimize_inputs`, `auto_refine`을 지정한 뒤 `PaperBananaPipeline`을 만들고 `GenerationInput`(`source_context`, `communicative_intent`, `diagram_type`)을 넘겨 `generate()`를 호출하는 구조다. 호출은 asyncio 기반이다. `generate()`와 `continue_run()`은 선택 인자 `progress_callback`을 받아 optimizer, retriever, planner, stylist, visualizer, critic 각 단계에서 `PipelineProgressEvent`(stage, message, seconds, iteration, extra)를 전달하므로, 에이전트를 수정하지 않고도 UI에 진행 상황을 표시하거나 소요 시간을 기록할 수 있다. 이전 실행을 이어받을 때는 `load_resume_state`로 상태를 불러와 `continue_run()`에 넘긴다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README 자체는 정량 벤치마크 수치를 담고 있지 않다. 대신 `evaluate` 명령으로 VLM-as-a-Judge 방식의 비교 평가를 제공한다. 생성 다이어그램과 사람이 만든 참조 다이어그램, 원본 컨텍스트 파일, caption 네 가지가 모두 필수 인자다. 채점은 원 논문의 계층적 집계 방식을 따라 Faithfulness와 Readability를 1차 지표로, Conciseness와 Aesthetics를 2차 지표로 매긴다.

평가용 참조 데이터셋 PaperBananaBench는 약 254MB이며 저장소가 직접 호스팅하는 GitHub 릴리스 미러(`bench-data-v1`)에서 배포하고, 압축 해제 전에 SHA256 체크섬을 검증한다. README는 원 데이터셋 저자에게 공을 돌리며 미러가 그들의 2026-03-22 개정본을 추적한다고 밝힌다. 캐시는 `~/.cache/paperbanana/`에 저장되고 `PAPERBANANA_CACHE_DIR`로 위치를 바꾼다. `paperbanana data download`는 `--task plot` 또는 `--task both`로 플롯 참조까지 받을 수 있고, `data info`와 `data clear`로 캐시를 확인하거나 비운다. 생성 명령에서 `--auto-download-data`를 주면 첫 사용 시 자동으로 내려받는다.

정량 점수 대신 참고할 수 있는 신호로 `sweep`의 `quality_proxy_score`가 있다. sweep 리포트는 변형별 Critic 제안 건수와 함께 이 proxy 점수를 표로 보여주고 상위 5개 순위를 매긴다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

README에는 한계나 로드맵을 정리한 절이 없다. 다만 문서에 적힌 제약이 몇 가지 있다.

- `polish`는 guided edit을 지원하는 이미지 provider(Google Gemini 이미지 모델)를 요구한다. 모든 provider 조합에서 쓸 수 있는 기능이 아니다. 입력 그림이 이미 스타일 가이드를 따르고 있으면 수정 없이 종료한다.
- 이 저장소는 원 논문의 비공식 재구현이며 원 시스템과 동작이 다를 수 있다고 README가 명시한다.
- Studio의 `--share` 옵션은 임시 공개 Gradio 링크를 만들기 때문에 민감한 데이터에는 쓰지 말라고 경고한다.
- 사용자 venue 팩은 기본 제공 팩과 이름이 겹칠 때 기본 팩을 가릴 수 없다.
- PDF 입력에는 별도 extras 설치(`paperbanana[pdf]`)가 필요하다.
- README에 정량 벤치마크 결과가 없어 재구현 품질이 원 논문 수준인지 문서만으로는 확인할 수 없다.

비용 통제 수단으로 `polish`에 `--budget`(달러 상한, 초과 시 정상 종료)과 `--seed`(재현 가능한 편집)가 있고, `--num-candidates`의 병렬 분기는 비용 추정과 `--budget` 계산에 반영된다. GitHub Action 문서도 별도의 비용 통제 옵션을 안내한다.

## 6. 관련 연구 (Related Work)

원 논문은 arXiv:2601.23265 "PaperBanana: Automating Academic Illustration for AI Scientists"(Zhu et al., 2026)이다. 평가용 참조 데이터셋 PaperBananaBench는 Hugging Face `dwzhu/PaperBananaBench`에 별도로 공개되어 있다. 이 저장소는 원 논문을 인용하라고 BibTeX 항목을 함께 제공한다.

## 7. 용어집 (Glossary)

- **VLM-as-a-Judge**: VLM을 평가자로 삼아 생성물의 품질을 채점하는 방식. 이 저장소는 Faithfulness, Readability, Conciseness, Aesthetics 네 지표로 계층 집계한다.
- **Venue style pack**: 학회별 그림 스타일 가이드를 묶은 디렉터리 단위 설정. `methodology_style_guide.md`, `plot_style_guide.md`, 선택 항목 `venue.yaml`로 구성된다.
- **Composite figure**: 개별 패널 이미지 여러 장을 `(a)`, `(b)`, `(c)` 라벨과 함께 한 장으로 합친 그림.
- **Orchestrate**: 논문 전체를 파싱해 방법론 다이어그램과 통계 플롯을 한 번에 계획하고 생성해 `figure_package.json`, `figures/`, `figures.tex`, `captions.md`를 만드는 명령.
- **Guided edit**: 원본 이미지를 입력으로 받아 지시에 따라 수정본을 만드는 이미지 편집 기능. `polish`가 이 기능을 지원하는 provider를 요구한다.
- **quality_proxy_score**: sweep이 변형본을 순위 매길 때 쓰는 대리 품질 점수. 정식 평가 지표가 아니라 비교용 신호다.

## 8. 그림 후보 (Figure Candidates)

repo 유형이라 `-figures/` 아카이브를 만들지 않는다. README 본문의 이미지는 GitHub URL로만 기록한다.

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | "논문을 입력으로 받아 다이어그램을 산출하는 전체 흐름" | manual | (확인 필요) 저장소 hero 이미지. 필요 시 사용자가 직접 저장 |
