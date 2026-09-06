---
title: "PaperBanana: Automated Academic Illustration for AI Scientists"
type: repo
year: 2026
category: agents
raw_path: raw/repos/llmsresearch-paperbanana.md
raw_filename: "llmsresearch-paperbanana.md"
source_collection: external
source: llmsresearch-paperbanana.md
org: "llmsresearch"
repo: "paperbanana"
url: "https://github.com/llmsresearch/paperbanana"
license: "MIT"
tags: [multi-agent, vlm, image-generation, academic-diagram, matplotlib, mcp-server, agentic-pipeline, vlm-as-judge]
---

## 요약

`llmsresearch/paperbanana`는 논문의 방법론 텍스트를 받아 출판 품질의 다이어그램과 통계 플롯을 만들어 내는 오픈소스 프레임워크다. 최대 7개 전문화 에이전트가 두 단계 파이프라인을 이루며, 앞 단계는 그림의 텍스트 설계도를 만들고 뒤 단계는 이미지를 그린 뒤 스스로 비평해 고친다. MIT 라이선스로 배포되고 Python 3.10 이상을 요구한다.

이 저장소는 arXiv:2601.23265 논문 "PaperBanana: Automating Academic Illustration for AI Scientists"(Zhu 외 7인, 2026)를 커뮤니티가 재구현한 비공식 프로젝트다. README는 상단과 하단에서 두 번, 원저자와 Google Research, Peking University 어느 쪽과도 무관하며 공개된 논문만 보고 독립적으로 구현했다고 밝힌다. 따라서 동작이 원 시스템과 다를 수 있다는 점을 전제로 읽어야 한다.

기능 범위는 그림 한 장 생성에 머물지 않는다. 매니페스트 하나로 여러 장을 만드는 배치 실행, 패널을 합치는 composite, 논문 전체를 파싱해 figure 패키지를 통째로 만드는 오케스트레이션, 이미 완성된 그림을 학회 스타일에 맞춰 고치는 후처리까지 포함한다. 진입 경로도 CLI 하나가 아니라 Python API, MCP 서버, Claude Code 스킬, 로컬 웹 UI, GitHub Action으로 나뉘어 있어 논문 작성 워크플로 여러 지점에 결합할 수 있다.

## 핵심 개념

VLM은 이미지와 텍스트를 함께 이해하고 생성하는 멀티모달 모델을 가리킨다. PaperBanana에서 VLM은 그림을 그리는 주체가 아니라 그림의 설계도를 쓰고, 완성된 그림을 보고 문제를 지적하며, matplotlib 코드를 작성하는 주체다. 그림 픽셀을 실제로 만들어 내는 일은 별도의 이미지 생성 provider가 맡는다. 이 저장소가 VLM provider와 이미지 생성 provider를 따로 지정하게 만든 이유가 여기에 있다.

in-context learning은 가중치를 갱신하지 않고 프롬프트 안의 예시만으로 과제를 배우는 능력이다. PaperBanana는 검증된 방법론 다이어그램 13개를 참조 집합으로 두고, 그중 관련도가 높은 예시를 골라 프롬프트에 넣어 목표 그림의 설명을 쓰게 한다. 즉 모델을 다시 학습시키지 않고 좋은 그림의 사례를 보여 주는 방식으로 품질을 끌어올린다.

VLM-as-a-Judge는 VLM을 평가자로 삼아 생성물의 품질을 채점하는 방식이다. PaperBanana는 이 방식을 두 곳에서 쓴다. 하나는 파이프라인 안에서 Critic이 자신의 산출물을 평가해 다음 반복의 지시를 만드는 곳이고, 다른 하나는 `evaluate` 명령이 생성 그림과 사람이 만든 참조 그림을 비교 채점하는 곳이다.

venue style pack은 학회별 그림 스타일 가이드를 묶은 디렉터리 단위 설정이다. 하나의 팩은 방법론 그림 가이드와 플롯 가이드, 선택 항목인 메타데이터 파일로 이루어진다. 같은 논문의 그림들이 색상과 레이아웃에서 서로 어긋나지 않게 하고, 투고 학회를 바꿀 때 그림 스타일을 한 번에 옮기는 수단이다.

composite figure는 개별 패널 이미지 여러 장을 `(a)`, `(b)`, `(c)` 라벨과 함께 한 장으로 합친 그림을 뜻한다. 논문에서 여러 하위 그림을 한 Figure 번호 아래 묶는 관행을 그대로 자동화한 것이다.

guided edit는 원본 이미지를 입력으로 받아 지시에 따라 수정본을 만드는 이미지 편집 기능이다. 텍스트만 받아 새로 그리는 생성과 달리 원본의 구도를 유지한 채 고친다. `polish` 명령이 이 기능에 의존하므로 provider 선택이 제한된다.

## 방법

### 두 단계 파이프라인

파이프라인은 선택 단계인 Phase 0, 한 번만 실행되는 Phase 1, 반복 구간인 Phase 2로 나뉜다. 앞의 두 단계가 텍스트만 다루고, 이미지가 등장하는 시점은 Phase 2에 가서다. 그림을 바로 그리지 않고 텍스트 설계도를 먼저 정교하게 만드는 구성이다.

| Phase | 에이전트 | 역할 |
|---|---|---|
| 0 (선택) | Context Enricher | 원문 방법론 텍스트를 컴포넌트, 흐름, 그룹, 입출력 단위로 재구성한다 |
| 0 (선택) | Caption Sharpener | 모호한 caption을 정밀한 시각 명세로 바꾼다 |
| 1 | Retriever | 검증된 방법론 다이어그램 13개 중 관련도가 높은 참조 예시를 고른다 |
| 1 | Planner | 고른 예시를 활용한 in-context learning으로 목표 그림의 상세 텍스트 설명을 만든다 |
| 1 | Stylist | NeurIPS 스타일 가이드라인의 색상 팔레트, 레이아웃, 타이포그래피에 맞춰 설명을 다듬는다 |
| 2 | Visualizer | 설명을 이미지로 렌더링한다 |
| 2 | Critic | 생성 이미지를 원본 컨텍스트와 대조해 문제를 지적하고 수정된 설명을 돌려준다 |

에이전트가 최대 7개인 이유는 Phase 0이 선택 단계이기 때문이다. `--optimize`를 주지 않으면 Context Enricher와 Caption Sharpener가 실행되지 않아 5개로 동작한다.

### Phase 0 입력 최적화

Phase 0은 `--optimize` 플래그로 활성화하며 VLM 호출 두 건을 병렬로 실행한다. Context Enricher는 논문에서 그대로 떼어 온 산문 문단을 다이어그램이 소화할 수 있는 형태로 바꾼다. 구체적으로 어떤 컴포넌트가 있고 그 사이에 어떤 흐름이 있으며 무엇이 한 그룹으로 묶이는지, 입력과 출력이 무엇인지를 명시적으로 분리한다.

Caption Sharpener는 사용자가 준 caption을 다듬는다. "Overview of our framework" 같은 문구는 그 자체로는 그림에 담을 정보가 거의 없으므로, 무엇을 시각적으로 강조해야 하는지를 담은 명세로 바꾼다.

두 작업이 병렬로 실행되는 이유는 서로 의존하지 않기 때문이다. 하나는 본문을 다루고 다른 하나는 caption을 다룬다.

### Phase 1 계획 수립

Retriever는 저장소에 동봉된 참조 집합에서 예시를 고른다. 이 집합은 에이전트와 추론, 비전과 지각, 생성과 학습, 과학과 응용 네 영역에 걸친 13개의 검증된 방법론 다이어그램이다. 기본 설정에서 가져오는 예시 수는 `pipeline.num_retrieval_examples` 값인 10개다.

Planner는 가져온 예시를 프롬프트에 넣고 목표 그림의 상세 텍스트 설명을 작성한다. 이 설명이 파이프라인의 중심 산출물이다. 이후 단계는 모두 이 텍스트를 다듬거나 이 텍스트로 그림을 그리는 일을 한다.

Stylist는 그 설명을 미적 기준으로 손본다. 기준은 저장소가 `data/guidelines/`에 담아 둔 NeurIPS 스타일 가이드라인이며 색상 팔레트, 레이아웃, 타이포그래피를 다룬다. `--venue`로 다른 학회 팩을 지정하면 그 팩의 가이드가 대신 쓰인다.

### Phase 2 반복 개선

Visualizer가 완성된 설명을 이미지로 렌더링하면 Critic이 그 이미지를 원본 컨텍스트와 대조한다. Critic의 출력은 점수가 아니라 수정된 설명이므로, 다음 반복의 Visualizer는 개선된 설계도를 받아 다시 그린다. 생성과 비평이 한 쌍으로 묶여 순환하는 구조다.

반복 횟수는 기본 3회다. `--auto`를 주면 Critic이 만족할 때까지 계속하며, 무한 반복을 막는 안전장치로 `--max-iterations`가 상한 역할을 한다. 이 상한의 기본값은 30회다.

산출물은 `outputs/run_<timestamp>/final_output.png`에 저장된다. 중간 반복본과 메타데이터도 같은 실행 폴더에 남으므로 어느 반복에서 무엇이 바뀌었는지 나중에 확인할 수 있다.

### 후보 병렬 생성과 실행 재개

`--num-candidates`는 후보 이미지를 1장에서 8장까지 병렬로 만든다. 계획 단계는 한 번만 실행하고 개선 단계만 seed offset을 달리해 분기하는 방식이라, 같은 설계도에서 출발한 변형본들을 얻는다. 결과는 `candidates/cand_<i>/`에 나뉘어 저장되고 실행 루트의 `final_output`은 1번 후보다. 분기한 만큼 비용이 늘어나므로 비용 추정과 `--budget` 계산도 이 분기 수를 반영한다.

이미 끝난 실행을 이어받는 경로도 있다. `--continue`는 `outputs/`의 가장 최근 실행을, `--continue-run`은 지정한 실행 ID를 이어받는다. 이때 `--feedback`으로 넘긴 문장은 Critic에 사용자 피드백으로 전달된다. "화살표를 더 굵게, 색을 더 뚜렷하게" 같은 지시를 처음부터 다시 생성하지 않고 반영할 수 있다.

### provider 구성

VLM provider와 이미지 생성 provider는 서로 독립적으로 지정한다. 무료 등급이 있는 Gemini 키 하나로 전체 흐름을 실행할 수도 있고, 계획과 비평만 저렴한 모델에 맡기고 렌더링은 다른 provider에 맡길 수도 있다.

| 구성 요소 | provider | 모델 | 비고 |
|---|---|---|---|
| VLM(계획, 비평) | OpenAI | `gpt-5.2` | 기본값 |
| 이미지 생성 | OpenAI | `gpt-image-1.5` | 기본값 |
| VLM | Atlas Cloud | `deepseek-ai/DeepSeek-V3-0324` | OpenAI 호환 chat 엔드포인트 |
| 이미지 생성 | Atlas Cloud | `openai/gpt-image-2/text-to-image` | 비동기 예측 API |
| VLM | Google Gemini | `gemini-2.5-flash` | 저비용 |
| 이미지 생성 | Google Gemini | `gemini-3-pro-image-preview` | 이미지 1장당 0.134달러(1K 해상도) |
| VLM, 이미지 생성 | OpenRouter | 지원 모델 전부 | 유연한 라우팅 |

Azure OpenAI와 Foundry 엔드포인트는 `OPENAI_BASE_URL`만 지정하면 자동으로 인식되므로 별도 provider 이름을 쓰지 않는다. Gemini 호환 게이트웨이도 `GOOGLE_BASE_URL`로 같은 방식을 따른다. Atlas Cloud만 chat과 이미지 생성의 base URL이 달라 두 개를 각각 지정한다.

Atlas Cloud는 전 모달리티에 걸쳐 300개가 넘는 모델을 단일 API로 제공하는 추론 플랫폼이다. README는 그중 API에 대해 검증한 VLM 5종(`deepseek-ai/DeepSeek-V3-0324`, `openai/gpt-4o`, `openai/gpt-4.1`, `google/gemini-2.5-flash`, `anthropic/claude-sonnet-4.5-20250929`)과 이미지 모델 6종(`openai/gpt-image-2`의 생성과 편집 두 종, `baidu/ERNIE-Image-Turbo/text-to-image`, `black-forest-labs/flux-dev`, `black-forest-labs/flux-schnell`, `qwen/qwen-image`)을 권장 목록으로 제시하되, 플랫폼 문서에 실린 모델 ID면 무엇이든 환경 변수로 지정할 수 있다고 안내한다.

### venue 스타일 팩

`--venue`가 받는 값은 모델 이름이 아니라 스타일 팩 디렉터리다. 팩 하나는 다음 세 파일로 구성된다.

| 파일 | 필수 여부 | 내용 |
|---|---|---|
| `methodology_style_guide.md` | 필수 | 방법론 다이어그램 스타일 지침 |
| `plot_style_guide.md` | 필수 | 통계 플롯 스타일 지침 |
| `venue.yaml` | 선택 | `display_name`, `aspect_ratio`, `fonts` 세 필드. 전부 선택 항목 |

기본 제공 팩은 `neurips`, `icml`, `acl`, `ieee` 네 개다. 사용자 팩은 `~/.config/paperbanana/venues/` 아래에 두면 저장소 파일을 고치지 않고도 인식되며, 위치는 `--venue-dir` 또는 `PAPERBANANA_VENUE_DIR`로 바꾼다. `paperbanana venues init mylab`은 NeurIPS 템플릿을 씨앗 삼아 두 가이드를 만들어 주고, `paperbanana venues list`는 기본 팩과 사용자 팩을 출처와 함께 보여 준다.

가이드를 직접 쓰는 대신 기존 그림에서 뽑아낼 수도 있다. `paperbanana guidelines synthesize --reference-set ./examples`는 예시 그림 모음에서 스타일 가이드를 생성한다. 연구실이 이미 쌓아 둔 그림들의 공통 스타일을 문서로 만드는 경로다.

이름이 겹치면 기본 제공 팩이 이긴다. 사용자 팩이 기본 팩을 가리는 일은 일어나지 않는다. 없는 이름을 주면 양쪽 목록을 보여 주며 즉시 실패한다.

## 명령 구성

### 명령 카탈로그

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
| `venues`, `guidelines synthesize` | 스타일 팩 관리와 가이드 자동 생성 |
| `data` | PaperBananaBench 참조 데이터셋 내려받기와 캐시 관리 |
| `studio`, `setup` | 로컬 웹 UI 실행, 초기 설정 마법사 |

### 단건 다이어그램 생성

가장 단순한 형태는 방법론 텍스트 파일과 caption 두 가지만 주는 것이다. 이 둘은 새 실행에서 필수 인자다.

| 플래그 | 설명 |
|---|---|
| `--input`, `-i` | 방법론 텍스트 파일 또는 PDF 경로 |
| `--caption`, `-c` | 그림 caption이자 전달 의도 |
| `--image` | 손그림 스케치, 화이트보드 사진, 기존 그림 등 Planner를 안내할 참조 이미지. 반복 지정 가능 |
| `--iterations`, `-n` | Visualizer와 Critic 반복 횟수(기본 3) |
| `--num-candidates`, `-k` | 후보 이미지를 1~8장 병렬 생성 |
| `--auto`, `--max-iterations` | Critic이 만족할 때까지 반복하되 상한을 둔다(기본 30) |
| `--optimize` | Phase 0 입력 최적화 활성화 |
| `--continue`, `--continue-run`, `--feedback` | 직전 또는 지정한 실행을 이어서 진행하고 피드백을 Critic에 전달한다 |
| `--pdf-pages` | PDF 입력의 1-based 페이지 선택(`1-5`, `2,4,6-8`) |
| `--format`, `-f` | `png`, `jpeg`, `webp` 중 선택(기본 `png`) |
| `--vlm-provider`, `--vlm-model`, `--image-provider`, `--image-model` | provider와 모델 개별 지정 |
| `--config` | YAML 설정 파일 경로 |
| `--verbose`, `--progress-json` | 진행과 소요 시간 출력, 진행 이벤트를 JSON으로 stdout에 방출 |

PDF를 입력으로 쓰려면 `paperbanana[pdf]` extras를 설치해야 한다. 내부적으로 PyMuPDF를 쓰며, `--pdf-pages`로 방법론이 실린 페이지만 골라 넘길 수 있다.

`--image`는 손그림 스케치나 화이트보드 사진, 이전 논문의 그림을 Planner에 참고 자료로 넘긴다. 머릿속 구도가 이미 있는 경우 텍스트로 설명하는 대신 대충 그린 그림을 보여 주는 편이 빠르다.

### 통계 플롯

`plot`은 CSV 또는 JSON 데이터 파일과 전달 의도 문장을 받는다. 여기서 중요한 차이는 렌더링 방식이다. 플롯은 이미지 생성 모델이 그리는 것이 아니라 VLM이 작성한 matplotlib 코드를 실행해 만든다. 따라서 이미지 생성 provider나 그 인증 정보가 아예 필요 없다.

이 차이는 실무에서 두 가지 결과를 낳는다. 첫째, 이미지 생성 API 키 없이 Gemini VLM 키 하나만으로도 플롯 기능 전체를 쓸 수 있다. 둘째, 산출물이 코드이므로 수치가 이미지 생성 모델의 해석으로 왜곡될 여지가 없다.

### 배치 생성과 composite

배치 매니페스트는 YAML이나 JSON으로 쓰며 `items` 목록을 갖는다. 각 항목은 `input`, `caption`, `id`를 적고 PDF 입력이면 `pdf_pages`를 덧붙인다. 매니페스트 안의 경로는 매니페스트 파일이 있는 디렉터리 기준으로 해석되므로, 매니페스트를 논문 폴더 옆에 두면 상대 경로가 그대로 통한다.

출력은 `outputs/batch_<id>/run_<id>/`에 쌓이고 `batch_report.json`이 전체 실행을 요약한다. 이 리포트에는 `batch_kind`가 기록되어 다이어그램 배치는 `methodology`, 플롯 배치는 `statistical_plot`으로 구분된다. `paperbanana batch-report`는 이 JSON을 사람이 읽는 Markdown 또는 HTML 문서로 렌더링한다.

매니페스트에 `composite` 절을 두면 배치가 끝난 뒤 패널을 자동으로 합친다.

| 키 | 뜻 |
|---|---|
| `layout` | 행과 열 배치(`1x3` 등) 또는 `auto` |
| `labels` | `auto`면 `(a)`, `(b)`, `(c)` 자동 생성. 명시적 목록이나 `null`도 가능 |
| `spacing` | 패널 사이 픽셀 간격 |
| `label_position` | 라벨 위치(`top` 또는 `bottom`) |
| `output` | 합친 결과 파일명 |

`composite` 명령은 배치와 무관하게 단독으로도 쓴다. 이미 갖고 있는 이미지 파일들을 인자로 넘기면 라벨과 간격을 붙여 한 장으로 합쳐 주며, 이 과정에는 API 호출이 없다. 기본 간격은 20픽셀, 기본 라벨 글자 크기는 32이고 라벨은 기본적으로 아래쪽에 붙는다.

`plot-batch`는 다이어그램 배치와 같은 구조를 플롯에 적용한다. 항목마다 `data`와 `intent`를 적고 `aspect_ratio`를 항목별로 지정할 수 있다. 기본 VLM provider가 `gemini`인 점이 `generate` 계열과 다르다.

### 설정 조합 탐색

`sweep`은 provider, 모델, 반복 횟수 같은 설정을 여러 조합으로 바꿔 가며 변형본을 만들고 순위를 매긴다. 조합 계획은 여덟 개의 쉼표 구분 CLI 플래그로 줄 수도 있고 매니페스트 파일로 줄 수도 있으며, 두 방식은 함께 쓸 수 없다.

`sweep-report`가 렌더링한 리포트는 요약, 상위 5개 순위표, 그리고 전체 변형표를 담는다. 전체 변형표에는 변형별 provider와 모델, 반복 횟수, Critic 제안 건수, `quality_proxy_score`, 출력 경로가 들어간다. `--dry-run`으로 계획만 세운 경우에는 간략한 계획 목록만 렌더링된다.

`quality_proxy_score`는 이름 그대로 대리 지표다. `evaluate`가 매기는 정식 점수와 달리 조합끼리 비교하는 신호로 쓰라는 뜻이며, 리포트도 이 점수에 별도 주석을 붙인다.

### 논문 단위 오케스트레이션

`orchestrate`는 그림 한 장이 아니라 논문 한 편 분량의 figure 패키지를 만든다. 동작 순서는 네 단계다. 먼저 논문 원본(`.txt`, `.md`, `.pdf`)을 파싱하고, 섹션 구조에서 방법론 그림 여러 장을 계획한다. 이어 선택 사항으로 지정한 데이터 폴더에서 CSV와 JSON 파일을 찾아 통계 플롯을 계획하고, 마지막으로 계획한 항목을 모두 생성한다.

산출물은 패키지 폴더 하나다. 그 안에 `figure_package.json`, 이미지가 담긴 `figures/`, 그리고 LaTeX에서 바로 `\input`할 수 있는 `figures.tex`와 `captions.md`가 들어간다.

긴 작업이므로 중단과 재개를 지원한다. `--dry-run`은 API 호출 없이 `orchestration_plan.json`만 만들어 계획을 먼저 검토하게 하고, `--resume-orchestrate`는 중단된 작업을 체크포인트에서 이어받는다. 재개할 때 `--retry-failed`를 주면 앞서 실패한 작업까지 다시 시도하고, `--max-retries`로 작업당 추가 재시도 횟수를, `--concurrency`로 병렬 작업자 수를 조절한다. 계획 규모는 `--max-method-figures`와 `--max-plot-figures`로 제한한다.

### 기존 그림 다듬기

`polish`는 다른 명령들과 입력이 다르다. 방법론 텍스트가 아니라 이미 완성된 그림 파일을 받는다. VLM이 그 그림을 venue 스타일 가이드와 대조해 구체적이고 실행 가능한 개선안을 최대 10개까지 제안하고, guided edit을 지원하는 provider가 그 제안을 원본에 적용한다. 제안 내용은 콘솔에 출력되므로 무엇이 바뀌었는지 확인할 수 있다.

`--iterations`를 주면 각 회차가 직전 결과 위에 다시 제안과 적용을 반복한다. `--budget`은 달러 단위 상한을 두어 초과 시 정상 종료하게 하고, `--seed`는 편집을 재현 가능하게 만든다. 입력 그림이 이미 스타일 가이드를 따르고 있으면 아무것도 바꾸지 않고 종료한다.

## 통합 경로

### Python API 연동

Python API는 `Settings`로 provider와 모델, `optimize_inputs`, `auto_refine`을 지정한 뒤 `PaperBananaPipeline`을 만들고, `GenerationInput`에 `source_context`, `communicative_intent`, `diagram_type`을 담아 `generate()`에 넘기는 구조다. 호출은 asyncio 기반이라 `asyncio.run`으로 감싼다.

`generate()`와 `continue_run()`은 선택 인자 `progress_callback`을 받는다. 파이프라인은 optimizer, retriever, planner, stylist, visualizer, critic 각 단계에서 `PipelineProgressEvent` 객체를 이 콜백에 전달하며, 이벤트에는 stage, message, seconds, iteration, extra가 담긴다. 에이전트 코드를 고치지 않고도 UI에 진행 상황을 표시하거나 단계별 소요 시간을 기록할 수 있다는 뜻이다.

이전 실행을 이어받을 때는 `load_resume_state`로 출력 폴더와 실행 ID를 지정해 상태를 불러온 뒤, 추가 반복 횟수와 사용자 피드백을 함께 `continue_run()`에 넘긴다.

### MCP 서버와 Claude Code 스킬

MCP 서버는 로컬 클론 없이 `uvx --from paperbanana[mcp] paperbanana-mcp`로 실행하도록 설정 예시가 제공된다. 노출하는 도구는 11개다.

| 도구 | 대응 기능 |
|---|---|
| `generate_diagram`, `generate_plot` | 다이어그램과 플롯 단건 생성 |
| `continue_run`, `continue_diagram`, `continue_plot` | 이전 실행 이어받기. 선택 피드백 전달 |
| `evaluate_diagram`, `evaluate_plot` | 참조 대비 비교 평가 |
| `orchestrate_figures` | 논문 단위 figure 패키지 |
| `batch_diagrams`, `batch_plots` | 매니페스트 기반 배치 |
| `download_references` | 참조 데이터셋 내려받기 |

저장소는 `.claude/skills/` 아래에 Claude Code 스킬 3종도 함께 배포한다. `/generate-diagram <file> [caption]`은 텍스트 파일에서 방법론 다이어그램을, `/generate-plot <data-file> [intent]`는 CSV나 JSON에서 통계 플롯을, `/evaluate-diagram <generated> <reference>`는 참조 대비 평가를 실행한다.

### Overleaf 연동 GitHub Action

Overleaf가 제공하는 GitHub 동기화와 짝을 이루는 GitHub Action이 있다. 워크플로에 `llmsresearch/paperbanana/integrations/github-action@main`을 넣고 `tex-file`과 `caption`을 지정하면, `.tex` 변경이 푸시될 때 액션이 방법론 섹션을 추출해 그림을 생성하고 이미지와 함께 바로 `\input`할 수 있는 LaTeX 스니펫을 커밋한다. Overleaf에서 pull하면 파일 트리에 반영된다.

논문 텍스트를 고쳤는데 그림이 옛 버전으로 남는 문제를 자동화로 막는 구성이다. 액션 문서는 별도의 비용 통제 옵션도 안내한다.

### 로컬 웹 UI

`paperbanana studio`는 Gradio 기반 로컬 웹 UI를 띄운다. `paperbanana[studio]` extras 설치가 필요하고 기본 주소는 `http://127.0.0.1:7860/`이다. CLI가 제공하는 흐름을 그대로 노출하며 방법론 다이어그램, 통계 플롯, 비교 평가, 이전 실행 이어받기, 배치 매니페스트 실행, 그리고 `run_*`와 `batch_*` 출력 폴더를 훑어보는 브라우저를 포함한다.

`--host`, `--port`, `--config`, `--output-dir`로 실행 옵션을 조절하고, 리버스 프록시 뒤에 둘 때는 `--root-path`로 URL 하위 경로를 지정한다. `--share`는 임시 공개 Gradio 링크를 만드는 옵션인데, README는 민감한 데이터에는 쓰지 말라고 명시한다.

## 설정과 참조 데이터

### 설정 파일 키

기본값은 `configs/config.yaml`에 있고 CLI 플래그나 별도 YAML로 덮어쓴다.

| 설정 키 | 기본값 | 뜻 |
|---|---|---|
| `vlm.provider`, `vlm.model` | `openai`, `gpt-5.2` | VLM provider와 모델 |
| `image.provider`, `image.model` | `openai_imagen`, `gpt-image-1.5` | 이미지 생성 provider와 모델 |
| `pipeline.num_retrieval_examples` | 10 | Retriever가 가져오는 참조 예시 수 |
| `pipeline.refinement_iterations` | 3 | Visualizer와 Critic 반복 횟수 |
| `pipeline.auto_refine` | 주석 처리 | Critic이 만족할 때까지 반복 |
| `pipeline.max_iterations` | 30 | 자동 반복 안전 상한 |
| `pipeline.optimize_inputs` | 주석 처리 | Phase 0 입력 최적화 |
| `pipeline.output_resolution` | `"2k"` | 출력 해상도 |
| `reference.path` | `data/reference_sets` | 참조 집합 경로 |
| `output.dir` | `outputs` | 출력 폴더 |
| `output.save_iterations`, `output.save_metadata` | true, true | 중간 반복본과 메타데이터 보존 |

provider 선택 값은 VLM이 `openai`, `atlas`, `gemini`, `openrouter` 네 가지, 이미지 생성이 `openai_imagen`, `atlas_imagen`, `google_imagen`, `openrouter_imagen` 네 가지다.

### 환경 변수

API 키와 엔드포인트는 `.env` 파일로 관리한다.

| provider | 환경 변수 |
|---|---|
| OpenAI, Azure | `OPENAI_API_KEY`, `OPENAI_BASE_URL`, `OPENAI_VLM_MODEL`, `OPENAI_IMAGE_MODEL` |
| Atlas Cloud | `ATLASCLOUD_API_KEY`, `ATLASCLOUD_BASE_URL`, `ATLASCLOUD_IMAGE_BASE_URL`, `ATLASCLOUD_VLM_MODEL`, `ATLASCLOUD_IMAGE_MODEL` |
| Google Gemini | `GOOGLE_API_KEY`, `GOOGLE_BASE_URL`, `GOOGLE_VLM_MODEL`, `GOOGLE_IMAGE_MODEL` |

`.env`를 직접 쓰는 대신 `paperbanana setup` 마법사를 써도 된다. 마법사는 공식 Gemini API를 쓸지 먼저 묻고, 쓰지 않겠다고 답하면 Gemini 호환 URL과 API 키를 따로 입력받는다.

### PaperBananaBench 참조 데이터셋

`evaluate`가 쓰는 참조 데이터셋 PaperBananaBench는 약 254MB다. 저장소가 직접 호스팅하는 GitHub 릴리스 미러(`bench-data-v1`)에서 배포하고 압축 해제 전에 SHA256 체크섬을 검증한다. README는 원 데이터셋 저자에게 공을 돌리며 이 미러가 그들의 2026-03-22 개정본을 추적한다고 밝힌다. 원본은 Hugging Face `dwzhu/PaperBananaBench`에 공개되어 있다.

`paperbanana data download`가 기본 내려받기이고, `--task plot` 또는 `--task both`로 플롯 참조까지 가져온다. 캐시는 `~/.cache/paperbanana/`에 저장되며 `PAPERBANANA_CACHE_DIR`로 위치를 바꾼다. `data info`로 캐시를 확인하고 `data clear`로 비운다. 생성 명령에 `--auto-download-data`를 주면 첫 사용 시 자동으로 받는다.

## 평가

`evaluate`는 생성 다이어그램을 사람이 만든 참조 다이어그램과 비교 채점한다. 필수 인자가 네 개인 점이 특징이다. 생성 이미지(`--generated`), 사람 참조 이미지(`--reference`), 원본 컨텍스트 파일(`--context`), caption(`--caption`)이 모두 있어야 한다. 참조 없이 절대 점수를 매기지 않고 반드시 사람이 만든 그림과의 비교로만 채점한다는 뜻이다.

채점은 원 논문의 계층적 집계 방식을 따라 네 지표를 두 층으로 나눈다.

| 층 | 지표 | 뜻 |
|---|---|---|
| 1차 | Faithfulness | 원본 방법론 내용을 그림이 정확히 반영했는가 |
| 1차 | Readability | 그림을 읽고 이해할 수 있는가 |
| 2차 | Conciseness | 군더더기 없이 간결한가 |
| 2차 | Aesthetics | 시각적으로 완성도가 있는가 |

내용 정확성과 가독성을 먼저 보고 간결성과 미적 완성도를 그다음에 보는 순서다. 프롬프트 템플릿도 이 네 지표에 맞춰 `prompts/evaluation/` 아래에 파일별로 나뉘어 있다.

README 자체에는 정량 벤치마크 수치가 없다. 재구현 품질이 원 논문 수준인지는 이 저장소의 문서만으로 확인할 수 없고, 사용자가 `evaluate`를 직접 실행해 확인해야 한다.

## 저장소 구조

| 경로 | 내용 |
|---|---|
| `paperbanana/core/` | 파이프라인 오케스트레이션, 타입, 설정, 재개 로직 |
| `paperbanana/agents/` | Optimizer, Retriever, Planner, Stylist, Visualizer, Critic |
| `paperbanana/providers/vlm/`, `image_gen/` | OpenAI, Atlas Cloud, Gemini, OpenRouter provider 구현 |
| `paperbanana/reference/` | 참조 집합 관리(검증된 예시 13개) |
| `paperbanana/guidelines/` | 스타일 가이드라인 로더 |
| `paperbanana/evaluation/` | VLM-as-a-Judge 평가 |
| `prompts/diagram/` | context_enricher, caption_sharpener, retriever, planner, stylist, visualizer, critic 프롬프트 |
| `prompts/plot/`, `prompts/evaluation/` | 플롯 전용 변형, 지표 4종 프롬프트 |
| `data/reference_sets/`, `data/guidelines/` | 검증된 방법론 다이어그램 13개, NeurIPS 스타일 가이드라인 |
| `mcp_server/`, `.claude/skills/` | MCP 서버, Claude Code 스킬 3종 |
| `configs/`, `examples/`, `scripts/`, `tests/` | 설정, 예제, 데이터 큐레이션 스크립트, 테스트 |

프롬프트가 에이전트 코드 안에 문자열로 박혀 있지 않고 `prompts/` 아래 파일로 분리되어 있다는 점이 눈에 띈다. 에이전트 이름과 프롬프트 파일 이름이 일대일로 대응하므로 특정 단계의 동작을 바꾸려면 해당 파일만 고치면 된다. 개발 명령은 `pytest tests/ -v`와 `ruff check`, `ruff format`이다.

## 한계

README에는 한계나 로드맵을 정리한 절이 없다. 문서에 명시된 제약을 모으면 다음과 같다.

- `polish`는 guided edit을 지원하는 이미지 provider를 요구하며 README는 Google Gemini 이미지 모델을 지목한다. 모든 provider 조합에서 쓸 수 있는 기능이 아니다.
- 이 저장소는 원 논문의 비공식 재구현이며 원 시스템과 동작이 다를 수 있다고 README가 명시한다.
- README에 정량 벤치마크 결과가 없어 재구현 품질을 문서만으로 확인할 수 없다.
- Studio의 `--share`는 임시 공개 링크를 만들기 때문에 민감한 데이터에 쓰면 안 된다.
- 사용자 venue 팩은 기본 제공 팩과 이름이 겹칠 때 기본 팩을 가릴 수 없다.
- PDF 입력, Studio, MCP 서버는 각각 별도 extras 설치가 필요하다.

비용 측면에서는 통제 수단이 마련되어 있다. `polish`의 `--budget`은 달러 상한을 두고, `--num-candidates`의 병렬 분기는 비용 추정과 상한 계산에 반영된다. 통계 플롯이 이미지 생성 provider를 요구하지 않는 점, Gemini에 무료 등급이 있는 점도 초기 도입 비용을 낮추는 요소다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| VLM-as-a-Judge | VLM을 평가자로 삼아 생성물의 품질을 채점하는 방식. Faithfulness, Readability, Conciseness, Aesthetics 네 지표로 계층 집계한다 |
| Venue style pack | 학회별 그림 스타일 가이드를 묶은 디렉터리 단위 설정. 방법론 가이드, 플롯 가이드, 선택 항목 `venue.yaml`로 구성된다 |
| Composite figure | 개별 패널 이미지 여러 장을 `(a)`, `(b)`, `(c)` 라벨과 함께 한 장으로 합친 그림 |
| Guided edit | 원본 이미지를 입력으로 받아 지시에 따라 수정본을 만드는 이미지 편집 기능. `polish`가 이 기능을 요구한다 |
| quality_proxy_score | sweep이 변형본 순위를 매길 때 쓰는 대리 품질 점수. 정식 평가 지표가 아니라 비교용 신호다 |
| Orchestrate | 논문 전체를 파싱해 그림과 플롯을 한 번에 계획하고 생성해 `figure_package.json`, `figures/`, `figures.tex`, `captions.md`를 만드는 명령 |

## 관련 페이지

- [[agents/imbad0202-academic-research-skills]]: 연구부터 집필과 리뷰까지 잇는 학술 논문 스킬 파이프라인. 텍스트 산출물을 다루므로 그림을 담당하는 PaperBanana와 보완 관계다
- [[agents/stanford-oval-storm]]: 역할이 나뉜 에이전트로 위키 스타일 글을 자동 작성하는 시스템. 학술 저작물 생성에서 참조 예시와 관점 다양화를 활용한다는 점이 겹친다
- [[agents/madslorentzen-ai-job-search]]: drafter-reviewer 2단계 구조로 문서를 만들고 PDF 렌더링으로 검증하는 파이프라인. PaperBanana의 Visualizer와 Critic 반복과 같은 생성-비평 패턴을 쓴다
- [[agents/rodrigues-2026-mcp-server-architecture-patterns]]: MCP 서버의 tool 설계 패턴. PaperBanana가 노출하는 11개 도구가 단일 컨텍스트 tool 수 권고치와 어떤 관계인지 대조해 볼 수 있다
