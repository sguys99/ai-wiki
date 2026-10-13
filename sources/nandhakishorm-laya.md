---
title: "Laya"
type: repo
year: 2026
category: llms
raw_path: raw/repos/nandhakishorm-laya.md
raw_filename: "nandhakishorm-laya.md"
source_collection: external
org: "NandhaKishorM"
repo: "laya"
url: "https://github.com/NandhaKishorM/laya"
license: "Apache-2.0"
tags:
  - decision-model
  - system-one-model
  - typed-decisions
  - non-autoregressive
  - modernbert
  - mmbert
  - multilingual
  - routing
  - calibration
  - rlcd
  - jev
  - fine-tuning
  - mcp
  - langgraph
figures:
  - id: fig01
    file: assets/nandhakishorm-laya/long_context_8192.png
    raw: https://raw.githubusercontent.com/NandhaKishorM/laya/main/assets/long_context_8192.png
    caption: "laya-multilingual을 max_len=8192로 실행해 8개 언어의 지원 요청 20건을 무관한 문서 끝에 붙인 결과. 앞쪽 텍스트가 약 4,000 토큰까지는 20건 중 16~18건이 맞고, 약 5,000 토큰에서 11건, 약 7,000 토큰에서 8건으로 떨어지며, 요청당 시간은 0.02초에서 4.50초로 늘어난다 (Apple GPU 중앙값)"
    strategy: manual
    curated: true
  - id: fig02
    file: assets/nandhakishorm-laya/laya_benchmark.png
    raw: https://raw.githubusercontent.com/NandhaKishorM/laya/main/assets/laya_benchmark.png
    caption: "언어별로 어느 checkpoint가 읽을 수 있는지를 보여 주는 그림. 왼쪽은 MASSIVE intent 20지선다에서 51개 언어별 laya와 laya-multilingual 정확도를 점으로 잇고, 오른쪽은 T4 지연 시간, Jev와의 공개 데이터셋 비교, temperature 재적합 전후 ECE를 둔다. 언어별 점은 재측정 이전 committed 수치다"
    strategy: manual
    curated: true
  - id: fig03
    file: assets/nandhakishorm-laya/laya_vs_jev_full.png
    raw: https://raw.githubusercontent.com/NandhaKishorM/laya/main/assets/laya_vs_jev_full.png
    caption: "Laya와 TypeSafe Jev 비교 대시보드. Jev 수치가 공개된 세 데이터셋의 정확도, 9개 응용 워크플로의 checkpoint별 정확도, 영어와 비영어 성능, T4 지연 시간, temperature 재적합 전후 ECE, typed-decisions 결과, 51개 언어 routing 정확도, preload 여부에 따른 혼합 언어 처리 시간을 한 장에 담는다. 사용 가능 언어를 45/51로 표기한 시점의 그림이다"
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

Laya는 텍스트를 생성하지 않고 `choice`, `score`, `noul` 세 타입의 질문에 한 번의 forward pass로 확률을 반환하는 non-autoregressive decision model이자 그 Python 패키지다. 영어, 다국어, typed-decisions 세 checkpoint와 요청마다 checkpoint를 고르는 `Router`를 함께 배포하고, TypeSafe Jev와 같은 HTTP 프로토콜을 제공한다.

## 1. 자료 정보 (Document Information)

- **저장소**: [NandhaKishorM/laya](https://github.com/NandhaKishorM/laya)
- **라이선스**: Apache-2.0. README 마지막 절이 "Apache 2.0. Developed by Convai Innovations."라고 적는다
- **수집 시점 규모**: GitHub API 기준 star 32,607, fork 2,915, 생성 2026-09-18, 기본 브랜치 main, 최신 커밋 c73908d96ff7 (2026-10-12)
- **배포 형태**: PyPI 패키지 `laya` (Python 3.10 이상), npm 패키지 `laya-ts`(브라우저와 Node.js의 ONNX 런타임 추론)와 `laya-client`(HTTP 클라이언트), Docker 이미지, Nix flake. 저장소 최상위에 `laya-go/`, `laya-java/`, `laya-dotnet/` 디렉토리도 있다
- **모델 배포**: Hugging Face `convaiinnovations/laya`, `convaiinnovations/laya-multilingual`, `convaiinnovations/laya-typed-decisions`, 데모 Space `convaiinnovations/laya-demo`
- **문서 시점**: README는 0.4.6 릴리스 노트를 담는다
- **수집 범위**: 최상위 `README.md` 전문과 `BENCHMARKS.md` 전문

README의 출발점은 TypeSafe AI가 닫힌 API로 공개한 Jev다. 저장소 topics에 `jev`가 있고, HTTP 서버가 Jev의 `POST /v1/systemone` 프로토콜을 그대로 쓰며, 벤치마크 절 대부분이 Jev의 공개 수치와 비교한다. Jev 수치는 저장소가 직접 측정한 것이 아니라 제3자가 공개한 값이라고 README와 BENCHMARKS가 반복해서 밝힌다 (TypeSafe API 접근 권한이 없다).

## 2. 주요 기여 (Key Contributions)

- **텍스트 생성 없는 타입 판단.** state(텍스트, 이메일, 티켓, JSON 문서)와 타입이 정해진 질문 묶음을 받아 질문 전체를 한 번의 forward pass로 답한다. 생성 단계가 없으므로 파싱할 문자열도, 환각으로 만들어질 문자열도 없다고 README는 설명한다. T4에서 질문 1개 33ms, 묶어서 처리하면 질문당 7.2ms다.
- **세 checkpoint와 Router.** ModernBERT-large 기반 영어 checkpoint, mmBERT-base 기반 다국어 checkpoint, typed-decisions 워크플로에 fine-tuning한 checkpoint를 배포하고, `Router`가 문자 체계와 언어를 0.5ms 미만의 순수 Python 검사로 판정해 checkpoint를 고른다.
- **RLCD 학습.** strictly proper scoring rule을 reward로 쓰는 강화학습(RLCD)으로 학습해 확률값에 통계적 의미를 두려 한다. fine-tuning 노트북은 GRPO 방식 policy gradient를 쓴다.
- **Jev 호환 서버.** `laya-serve`가 Jev와 같은 `/v1/systemone` 프로토콜과 같은 응답 스키마를 제공해 기존 Jev 클라이언트가 `baseUrl`만 바꿔 쓰게 한다.
- **운영 기능 묶음.** batch 처리와 길이 정렬, 긴 문서 window 스캔(`predict_long`), JSON schema 기반 결정(`decide`), 예측 훅(prediction hook), 신뢰도 임계값 기반 기권(`min_confidence`), 5개 프리셋, LangChain과 LangGraph 통합, MCP 서버, 평가 harness `laya-evals`, TileLang GPU fast path를 제공한다.
- **한계의 명시.** "Honest limits"와 "Where Jev leads" 절을 따로 두어 zero-shot typed-decisions가 무작위 수준에 가깝다는 점, 20개 넘는 선택지에서 Jev에 뒤진다는 점, 두 checkpoint 모두 과신(over-confident) 상태로 배포된다는 점을 적는다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 질문 타입 세 가지

| primitive | 출력 | 용례 |
|---|---|---|
| `choice` | 선택된 레이블, 선택지별 확률, confidence | 부서 라우팅, intent 분류, 주제 분류 |
| `score` | 서열 척도의 기대 수준, 분포, confidence | 불만 수준, 티켓 긴급도, 피해 심각도 |
| `noul` | P(true), 0.0~1.0 | 피싱 탐지, 스팸 필터, jailbreak 탐지, 이탈 위험 |

질문은 `type`, `instructions`, `criteria`로 쓴다. `choice`의 criteria는 레이블과 설명의 사전이고 `score`의 criteria는 수준 설명의 목록이다. 응답의 `result["answers"][qid]`는 `choice`면 선택 레이블, `score`면 기대 수준, `noul`이면 P(true)를 담고, 별도 필드 `confidence`와 (`choice`, `score`의 경우) `probabilities`를 함께 둔다. `result["routing"]`은 어느 checkpoint가 왜 선택됐는지를 설명한다.

`noul`은 항상 `[false, true]` 순서의 두 의미 slot을 채점하고 두 번째 slot의 확률을 반환한다. 모델에 보이는 텍스트는 기본이 `false`와 `true`이며, `labels` 사전으로 이 표시 텍스트만 바꿀 수 있다(예: `B`와 `A`). `labels`는 정확히 `false`와 `true` 두 키를 가져야 하고 값은 서로 다른 비어 있지 않은 문자열이어야 한다. `noul`의 criteria 역시 `true`와 `false` 키만 허용한다. 예전에는 `{"yes": ..., "no": ...}`가 조용히 버려지고 기본값으로 답해 영어 checkpoint에서 명백한 긍정 리뷰 3건 중 2건을 틀렸고(#156), 지금은 다른 키를 거부한다.

### 세 checkpoint

| checkpoint | 인코더 | 파라미터 | context | 용도 |
|---|---|---|---|---|
| `laya` | ModernBERT-large | 4억 2,100만 | 512 | 영어 |
| `laya-multilingual` | mmBERT-base | 3억 2,200만 | 1,024 (최대 8,192) | 100개 이상 언어, 2배 빠름 |
| `laya-typed-decisions` | ModernBERT-large | 4억 2,100만 | 1,024 | typed-decisions 워크플로 |

세 checkpoint를 `models/`에 받으면 약 2.3GB다. 각 checkpoint는 `model.safetensors` 옆에 `rl_agent_config.json`을 둔다.

### Router의 판정 규칙

Router가 묻는 질문은 하나다. "영어 checkpoint가 이 state를 읽을 수 있는가." 내장 검출기는 문자 체계와 기능어 휴리스틱으로 답하며 외부 의존성이 없다.

- 결정 우선순위: `model=`, `task=`, 검출된 typed-decisions 워크플로, 명시적 `lang=`, 해석 가능한 `lang_guess`가 검출보다 앞선다. 이들 중 하나가 결정하면 `routing["detection"]`은 `None`이다.
- `routing`은 `model`, `repo`, `reason`, `detection`, `workflow` 다섯 키를 항상 담는다. 예를 들어 힌디어 입력의 reason은 "non-Latin script (devanagari, 100% of letters); the English checkpoint cannot read it"이다.
- 아주 짧은 라틴 문자 텍스트("Quero cancelar", "Esqueci minha senha")는 언어 단서가 없어 `default`로 간다. 0.4.0부터 기본값은 `multilingual`이다. 영어 트래픽이 많으면 `Router(default="english")` 또는 서버 환경변수 `LAYA_DEFAULT_MODEL=english`로 되돌린다. 영어에서 영어 checkpoint는 0.820, 다국어 checkpoint는 0.710이며 손익분기는 영어 트래픽 약 62%다.
- `lang_guess`는 언어 코드나 state를 받는 callable(fastText, CLD3 등)이다. 영어인지 아닌지만 결정하며, `en`, `eng`, `english`로 시작하는 코드는 영어로, 다른 언어 코드는 다국어로 보낸다. `None`이나 언어를 가리키지 않는 코드(`C`, `POSIX`, `C.UTF-8`, `und`, `zxx`, `mul`)는 기권해 내장 검출기로 넘긴다. `C.UTF-8`은 공식 Python 이미지의 기본 `$LANG`이라 이 처리가 중요하다.
- `router.route(...)`는 forward pass 없이 판정만 반환한다. 예: 독일어 문장에 "Latin script but language looks like 'de', not English".

### 메모리와 preload

| 배포 방식 | 요청당 지연 | 모델 재적재 |
|---|---|---|
| `Router()` (lazy, `max_loaded=2`) | 전환 시 검출만(1ms 미만), 언어별 첫 적재 이후 | 언어가 처음 나타날 때 1회 |
| `Router(max_loaded=1)` | 언어 전환마다 7~10초 | 전환마다 1회 |
| `Router(preload=True)` | GPU 32.8ms, CPU 193~464ms | 없음 |

`max_loaded=1`의 재적재는 CPU 중앙값 7.4초, T4 10.3초로 측정됐다. 토크나이저는 프로세스당 한 번만 파싱해 재사용하며, 다국어 `tokenizer.json`만 34MB(어휘 25만 6천 개)다. `router.attach("english", existing_agent)`로 이미 만든 agent를 붙여 VRAM 중복을 피할 수 있다.

### 이질적 batch

`Router.predict_batch()`는 전체 요청을 먼저 라우팅하고, checkpoint별로 묶은 뒤 같은 질문 스키마끼리 다시 묶어 `Agent.predict_batch()`로 보내고, 결과를 원래 순서로 되돌린다. 요청마다 `model`, `task`, `lang`, `lang_guess`, `max_len`, `head_max_len`을 따로 줄 수 있다. `route_batch`는 checkpoint를 적재하지 않고 판정만 낸다. `predict_many`는 별칭이다.

### batch와 길이 정렬

`agent.predict_batch(states, questions, batch_size=64, sort_by_length=True)`는 같은 질문에 대한 여러 state를 공유 forward pass로 처리한다. `sort_by_length`는 길이가 비슷한 state를 묶어 padding을 줄이며 `1 < batch_size < len(states)`일 때만 작동한다. 측정값은 다음과 같다.

| 조건 | 정렬 전 | 정렬 후 | 배율 |
|---|---|---|---|
| CLI, Yelp 리뷰 128건, `--batch-size 8`, Apple silicon | 41.25초 | 29.23초 | 1.42배 (1.39~1.44배), 결정 128건 동일 |
| 웹 서버, 리뷰 64건, `batch_size: 8`, MPS | 5.35초 | 3.04초 | 1.77배, 레이블 64/64 동일 |
| ONNXAgent, 지원 티켓 80건, Apple M1, `batch_size=4` | 53.7초 | 36.3초 | 약 1.48배, 결정 변화 0/80 |
| research, 합성 다국어 티켓 1만 건 | | | 2.15배 |

웹 서버 사례에서 `batch_size: 8`만 준 경우는 4.95초였으므로 길이 정렬이 두 번째 배율(크기만 정한 batch 대비 1.66배)을 만든다. GPU에서는 batch가 처리량 이득이 크다. RTX 5060 Ti에서 결정당 지연이 약 10ms에서 약 1ms로 줄었다(9~10배). CLI `--batch`는 20건 티켓에서 `predict` 반복 대비 2.6배였다. batch 모양이 바뀌면 부동소수점 차이가 생길 수 있어 결정 경계 근처를 검증하라고 README는 권한다.

### 긴 문서 처리

`predict`는 `max_len`을 넘는 state를 첫 window(대화 목록이면 마지막 window) 하나로 잘라 나머지를 조용히 버린다. `predict_long`은 겹치는 window로 전체를 스캔해 공유 forward pass로 채점한 뒤 질문별로 집계한다.

- `noul`은 가장 강한 window를 취한다 (어느 window든 지지하면 참).
- `choice`와 `score`는 가장 확신이 높은 window를 취한다. 평균을 내면 중립적인 다수 window가 결정적 구간을 본 한 window를 이긴다.
- 기본 window는 `max(64, max_len - head_max_len - 8)`이며 영어 checkpoint 312 토큰, 나머지 두 checkpoint 760 토큰이다.
- 반환 확률은 결정한 window의 값이지 문서 전체의 calibration된 값이 아니다. `noul` 최댓값은 신호가 없어도 window 수가 늘면 올라간다. 각 답은 `answer["window"]`(index, token_start, token_end, count)를 담는다.

`laya-multilingual`은 `max_len=8192`로 8,192 토큰까지 읽는다. 배포 기본값은 1,024라 긴 문서를 자른다. fig01의 측정에서 앞쪽 텍스트 약 4,000 토큰까지는 20건 중 16~18건을 맞혔고, 그 너머는 8~17건으로 변동했다. 짧은 입력은 `max_len=8192`에서도 답이 같고 속도는 실제 입력 길이를 따른다. 4,000 토큰 입력은 Apple GPU에서 약 1.7초다. 영어 위주의 긴 문서는 Router가 영어 checkpoint로 보내므로 `model="multilingual"`을 명시해야 한다.

### 토큰 예산과 선택지 수

입력 시퀀스는 질문과 선택지를 담는 head 예산(`head_max_len`)과 나머지 state 예산으로 나뉜다. `head_max_len`은 상한이지 실제 head 길이가 아니다. 렌더러는 필요한 만큼만 head를 채우고 `build_sequence`가 실제 head 길이로 state 공간(`room = max_len - head_len - 1`)을 정한다.

- `laya`: `max_len` 512, `head_max_len` 192. 예시 부서 질문은 48 토큰 head를 만들어 state에 463 토큰을 남긴다 (상한 기준 계산값 320이 아님).
- `laya-multilingual`과 `laya-typed-decisions`: `max_len` 1,024, `head_max_len` 256. 같은 질문은 45 토큰 head, state 978 토큰.
- 선택지가 많으면 반대로 상한을 넘는다. 선택지당 `per = max(4, (head_max_len - 16) // k)`로 최소 4 토큰이 보장되므로 대략 `head_max_len / 4`개를 넘으면 head가 상한보다 커진다.

| 설정 | 선택지 k | head | 실제 state 공간 | 상한 기준 계산값 |
|---|---|---|---|---|
| `laya`, `max_len=512` | 77 | 319 | 192 | 320 |
| `laya`, `max_len=512` | 100 | 411 | 100 | 320 |
| `laya-multilingual`, `max_len=1024` | 100 | 411 | 612 | 768 |

HTTP 서버는 질문당 선택지를 100개로 제한한다(`MAX_CHOICE_OPTIONS = 100`, 초과 시 413). 많은 선택지를 다루는 방법으로 README는 네 가지를 든다.

1. `head_max_len=512`, `max_len=1024` 이상으로 예산을 늘린다 (요청 단위로도 가능).
2. `predict_shortlist`로 임베딩 유사도 top-k 레이블만 남겨 한 번 forward pass한다. `embed_fn_from_agent`는 이미 적재된 인코더를 mean-pooling해 쓰므로 추가 모델이 필요 없다. `cached_embed_fn`은 최대 4,096개 항목의 LRU 캐시로 바뀌지 않는 선택지 임베딩을 재사용한다 (768차원 기준 약 12MB).
3. 레이블 집합을 거친 질문과 세부 질문으로 직접 나눈다.
4. `predict_tournament`로 레이블을 최대 16개씩 묶어 같은 forward pass에서 답한 뒤 각 묶음 승자끼리 다시 묻는다. 256개 레이블까지 `predict` 두 번으로 끝난다.

`predict_tournament`는 영어 checkpoint에서 BANKING77(77개)을 0.430에서 0.610으로, CLINC150(150개)을 0.625에서 0.876으로, MASSIVE intent(60개)를 0.515에서 0.569로 올렸고 ECE는 0.30~0.37에서 0.06~0.14로 낮췄다. 지연은 질문 하나의 약 2배다. 레이블이 늘린 예산 안에 잘리지 않고 들어가면 예산 확대가 낫다(MASSIVE 60개, `head_max_len=512`에서 0.622 대 0.590, 500행). Issue #102 제보자는 top-20 shortlist로 BANKING77이 54.3%에서 60.8%로 올랐다고 보고했고, 저장소는 이 수치를 재측정하지 않았다.

CLI `--head-max-len`도 같은 효과가 있다. MASSIVE-INTENT 58개 레이블을 한 choice 질문으로 쓰면 영어 checkpoint가 기본 192 토큰 예산에서 24/58, 384 토큰에서 34/58을 맞혔고 요청당 시간은 CPU에서 약 1.4배였다. 더 넓히면 state 공간이 줄어 정확도가 다시 떨어진다.

### 선택지 순서와 parallel layout

선택지가 놓인 위치가 답을 바꾼다. `research/eval/presentation_checks.py`가 텍스트가 완전히 같은 선택지 5개로 측정하니 영어 checkpoint의 slot별 logit이 `[+1.68, +1.47, +0.11, -1.35, -1.91]`로 위치만으로 갈렸다. 다국어 checkpoint는 `score`에서 반대 방향으로 기운다(#131).

- `option_order`는 선택지를 어느 slot에 둘지 정하는 순열이다. 확률은 항상 사용자의 원래 순서로 반환된다. k개 회전을 k개 질문으로 넣으면 한 forward pass 안의 k개 행으로 처리되며, 확률을 평균 내면 위치 효과가 줄어든다. 62개 은행 intent를 20개로 shortlist한 49개 state에서 표시 순서에 따라 답이 바뀌는 비율이 16.3%에서 6.1%로 줄었다.
- `option_layout: "parallel"`은 모든 선택지를 같은 position id에서 시작시키고 선택지끼리 attention하지 못하게 하는 학습 layout이다. decision head에 위치 인코딩이 없어 순서를 바꿔도 logit의 순서만 바뀐다. Parallel Context Windows(Ratner et al., 2023)의 아이디어를 선택지에 적용했다. 배포된 checkpoint는 모두 기본 sequential layout이고, `laya.train`의 `TrainConfig(option_layout="parallel")`로 직접 학습한다. transformers 5 이상과 eager backend가 필요하고 ONNX, TileLang, `compile=True`는 거부한다.

| layout | 정확도(원래 순서) | 정확도(섞음) | ECE | 섞어도 같은 답 |
|---|---|---|---|---|
| sequential | 0.779 | 0.767 | 0.153 | 91.7% |
| sequential + `shuffle_options` | 0.757 | 0.750 | 0.136 | 95.0% |
| parallel | 0.764 | 0.764 | 0.143 | 100% |

`convaiinnovations/laya`에서 typed-decisions로 4 epoch fine-tuning한 결과(T4 한 장, 테스트 결정 2,000건)이며 arm마다 seed 하나다. 같은 레시피를 두 번 돌렸을 때 sequential arm이 0.008 움직였다.

### Confidence와 기권

README는 RLCD 학습 덕분에 confidence가 통계적 의미를 갖는다고 쓰면서도, 임계값은 모델의 성질이 아니라 호출자가 자기 데이터의 정확도와 coverage를 보고 고르는 운영 규칙이라고 못박는다. 두 checkpoint 모두 과신 상태로 배포되고 `laya-multilingual`에는 적합된 temperature가 아예 없다.

- `confidence`(choice, score)는 1에서 정규화 entropy를 뺀 값으로 분포가 얼마나 몰렸는지를 잰다. Jev의 `(n·p_max − 1)/(n − 1)`과 다르므로 Jev 임계값을 그대로 옮기면 안 된다.
- `answer_confidence`는 보고된 답의 확률 `max(p)`로, temperature scaling이 적합하는 값이다. 모든 질문 타입에 공통으로 쓰는 calibration된 숫자는 이것이다.
- 같은 필드라도 선택지 수에 따라 의미가 다르다. T4 실행에서 `laya`의 평균 `max(p)`는 3지선다 XNLI 0.7677, 20지선다 MASSIVE 0.9659였고 `laya-multilingual`은 반대로 0.9152와 0.8055였다.

`min_confidence`는 `predict`, `predict_batch`, `system_one`, `decide`, `decide_batch`에 걸 수 있는 선택형 기권 장치다. 숫자 하나 또는 bucket별 사전을 받는다. bucket 키는 세 답 타입(choice, score, noul)과 네 선택지 대역(`2`, `3-5`, `6-10`, `11+`)의 곱 12개와 `"default"`다. 사전에 `"default"`가 없으면 이름 없는 bucket은 0.0으로 게이트하지 않는다. `fit_abstention_thresholds`가 `target_error`에 맞춰 bucket별 임계값을 적합한다. 이때 serving agent의 `binning_map`을 넘기지 않으면 척도가 어긋난다. 실측 예로 binning 이전 confidence로 적합한 임계값은 coverage 50%에서 오류 9.8%를 지켰지만 binning된 confidence와 비교하자 답의 94.5%를 통과시키며 오류 25.6%를 냈다.

`min_confidence`를 주면 모든 답에 `abstention` 필드가 붙는다.

| `abstention` | 의미 |
|---|---|
| `passed` | 게이트가 실행되었고 `answer_confidence`가 임계값을 넘었다 |
| `abstained` | 게이트가 실행되었고 임계값 아래였다 |
| `unevaluated` | 게이트가 실행되었지만 쓸 수 있는 confidence가 없었다 (NaN, 누락, bool) |

`low_confidence`는 게이트가 발동할 때만 쓰이므로 그 부재만으로는 "통과"와 "게이트 없음"을 구분하지 못한다. 그래서 `abstention`과 `abstention_threshold`를 따로 둔다. `min_confidence`를 주지 않으면 응답은 이전과 바이트 단위로 같다.

autocast dtype도 임계값에 영향을 준다. CUDA compute capability 8 이상에서는 checkpoint의 `amp_dtype`(세 checkpoint 모두 bf16)을 쓴다. 60개 state, checkpoint당 288개 질문(RTX 2000 Ada)에서 bf16은 fp32 대비 확률을 최대 0.073 움직이고 864개 argmax 중 3개를 뒤집었다. fp16은 0.019 이내, 뒤집힘 0개였고 지연은 같았다. MPS는 `mps_amp_min_rows`(기본 5) 이상의 행에서만 fp16으로 autocast한다.

load 시점에 temperature는 `[0.5, 5.0]`으로 clamp되고 유효하지 않은 값은 중립값 1.0을 쓴다.

### Schema 기반 결정

`agent.decide(text, schema=...)`는 JSON schema나 pydantic 모델을 받아 한 번의 forward pass로 schema 모양의 값을 돌려준다. enum은 `choice`로, 범위가 있는 정수는 `score`로, boolean은 `noul`로 옮긴다. `return_details=True`면 필드별 confidence를 함께 반환하고, `min_confidence`에 걸린 필드는 `None`이 된다. `decide_batch`는 schema를 한 번만 계획하고 state들이 forward pass를 공유한다. Apple M 시리즈 MPS에서 영어 티켓 8건은 2,624ms에서 723ms(3.6배), 영어와 독일어가 섞인 16건을 Router로 처리하면 2,977ms에서 1,903ms(1.6배)였다. CPU에서는 1.6배와 2.0배였다.

### 프리셋과 통합

| 프리셋 함수 | 용도 |
|---|---|
| `router_questions()` | 요청을 작은 모델과 frontier 모델 중 어디로 보낼지 결정 |
| `guard_questions()` | jailbreak, prompt injection, 유출 탐지 |
| `moderation_questions()` | 유해성, 괴롭힘, 위협 |
| `triage_questions()` | 지원 티켓의 intent, 긴급도, 불만, 이탈 |
| `email_questions()` | 이메일 분류, 스팸, 피싱, 긴급도, 회신 필요 여부 |

- **LangChain과 LangGraph**: `LayaRouter`(조건부 edge 라우팅과 confidence fallback), `LayaGuardrail`(jailbreak나 injection에 예외), `LayaDecision`(schema 결정). `batch()`와 `abatch()`가 `predict_batch`로 묶여 LangChain 기본 thread pool을 대체한다. MPS에서는 동시 torch forward가 프로세스를 중단시키므로 이 대체가 안정성 문제이기도 하다. 측정 배율은 16건 라우팅 2.2배, 다국어 24건 2.2배, guard 프리셋 1.8배였다.
- **MCP 서버**: `laya-mcp-server`가 stdio MCP 서버로 `laya_predict`, `laya_predict_batch`, `laya_route`, `laya_route_batch`, `laya_decide`, `laya_shortlist`, `laya_preset`, `laya_status` 8개 도구를 제공한다. `LAYA_BASE_URL`을 주면 공유 `laya-serve`를 HTTP로 호출한다. 다국어 16건에서 batch 호출 한 번이 개별 호출 16번보다 MPS에서 2.1~2.3배, CPU에서 약 1.25배 빨랐고 결정 뒤집힘은 0/16이었다.
- **HTTP 서버**: `laya-serve`는 Jev와 같은 `POST /v1/systemone`과 `/v1/systemone/batch`(최대 64 state)를 제공한다. 설정은 `LAYA_HOST`, `LAYA_PORT`, `LAYA_DEVICE`, `LAYA_PRELOAD`, `LAYA_MODELS`, `LAYA_THREADS`, `LAYA_AUTO_TASK`, `LAYA_DEFAULT_MODEL`, `LAYA_MAX_LOADED`, `LAYA_IDLE_UNLOAD_SECONDS`, `LAYA_EXTRA_MODELS`, `LAYA_API_KEY` 등 환경변수로 한다. 훅 인자 다섯 개는 서버 쪽 callable이어야 하므로 422로 거부한다.
- **Jev 이식 시 차이**: 선택지 수는 Jev의 255개 상한이 아니라 토큰 예산과 100개 가드가 정한다. score의 모든 수준에 설명이 필요하다. confidence 정의가 다르다.
- **예측 훅**: `on_predict_start`, `on_predict_end`, `on_route`, `on_load`, `on_evict`, `on_error`. start 훅은 state와 질문을 바꾸거나 `ctx.skip(...)`으로 캐시된 답을 낼 수 있고 end 훅은 결과를 바꿀 수 있다. 감사 로그, PII 제거, 캐시, 메트릭에 쓴다.
- **평가 harness**: `laya-evals`는 torch 없이 numpy만으로 레이블된 데이터셋을 채점하고 `--min-accuracy`, `--max-ece`, baseline 비교로 CI 게이트를 건다.

### GPU fast path와 compile

`laya[fast]`는 TileLang 융합 커널(GEMM과 bias/activation epilogue, GEMM과 GEGLU, residual과 LayerNorm, in-place RoPE, packed QKV를 직접 읽는 sliding-window flash attention)로 forward를 대체한다. 가중치를 bf16으로 상주시키고 (batch, length) bucket마다 CUDA graph를 캡처해 질문 하나에 Python에서 약 200개 커널을 띄우던 비용을 없앤다. 60개 state 고정 집합에서 fp32 대비 최대 차이 0.046, 기본 bf16 경로 대비 0.076 이내였다. CPU와 MPS, 또는 tilelang 미설치 시 기본 forward를 쓴다. `compile=True`는 load 시 `agent.warmup()`을 실행해 그래프 컴파일을 시작 시점으로 옮긴다.

### 설치와 플랫폼

- 장치 자동 선택 순서는 CUDA, MPS, XPU, CPU다. CUDA는 mixed precision, CPU와 MPS는 fp32다.
- Intel Mac은 PyTorch가 x86_64 wheel을 2.2.2에서 멈춰 그대로 설치하면 실행할 수 없는 조합이 잡힌다. `numpy<2`, `torch==2.2.2`, `transformers==4.57.6`으로 고정한다. 이때 `build_model`이 mmBERT의 `rope_parameters`(두 base 모두 160000)를 4.x 속성으로 옮긴다.
- 저장소 개발 기기(Intel Mac Pro, AMD Radeon Pro Vega II, MPS)에서 질문 4개 호출 중앙값은 다음과 같다.

| checkpoint | CPU (28 스레드) | MPS |
|---|---|---|
| `laya` | 453ms (질문당 113ms) | 146ms (질문당 37ms) |
| `laya-multilingual` | 192ms (질문당 48ms) | 121ms (질문당 30ms) |
| `laya-typed-decisions` | 441ms (질문당 110ms) | 145ms (질문당 36ms) |

CPU는 16 스레드 근처가 가장 빠르고 기본 28 스레드는 과다 할당이다. 첫 MPS 호출은 Metal 커널 컴파일에 약 13초가 든다.

### Fine-tuning

- Kaggle 2xT4(DDP) 노트북이 데이터셋 구축, RLCD 학습(proper scoring rule reward, GRPO 방식 policy gradient), temperature 적합, 평가, Hub 업로드를 한 번에 수행한다. 4 epoch, 약 3만 개 질문에 4~5시간이 걸린다.
- Apple Silicon 스크립트는 단일 프로세스와 micro-batch, gradient accumulation(예: `--micro-batch 1 --grad-accum 32`)으로 16GB MacBook에서 실행된다. 인코더와 decision head 모두 gradient checkpointing을 켠다.
- 노트북은 타입별 `temperature` 하나를 적합하고 상속된 `temperature_by_options`를 지운다. 남겨 두면 옛 bucket 값이 우선해 새 적합을 덮는다. 노트북의 calibration 표본은 학습 항목에서 나오므로 개선을 주장하려면 별도 held-out 데이터로 평가하라고 README는 적는다.
- 브라우저 에이전트 사례(`docs/finetune_browser_agent.md`): 16GB GPU 한 장에서 browser-use/jev-ultrafast의 operation과 target 결정기로 특화했다. 후보 약 45개 중 element top-1이 zero-shot 0.10에서 0.66으로, 실제 과제 성공률이 0%에서 62%로 올랐고 단계당 17~23ms다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

모든 Laya 수치는 고정 seed로 각 checkpoint가 바이트 단위로 같은 질문에 답한 결과다. Jev 수치는 제3자 공개값이다.

### Routing의 근거

T4 공유 벤치마크(17,416 질문, seed 13, choice 질문당 선택지 20개, 언어별 첫 300 테스트 행).

| 과제 | `laya` | `laya-multilingual` | Router |
|---|---|---|---|
| MASSIVE intent, 영어 | 0.783 | 0.657 | 0.783 |
| MASSIVE intent, 다른 13개 언어 | 0.306 | 0.451 | 0.451 |
| MASSIVE scenario, 영어 | 0.603 | 0.560 | |
| MASSIVE scenario, 다른 언어 | 0.281 | 0.439 | |
| XNLI, 영어 | 0.860 | 0.843 | 0.860 |
| XNLI, 다른 14개 언어 | 0.521 | 0.731 | 0.731 |
| 사용 가능 언어(무작위 3배 초과) | 23/51 | 48/51 | 48/51 |
| 지연, 질문 1개 (T4) | 39.5ms | 32.8ms | 32.8ms |
| 지연, 질문 10개 batch | 158.6ms | 72.3ms | 72.3ms |

영어 checkpoint는 비라틴 문자에서 붕괴하면서도 확신을 유지한다. 크메르어는 정확도 0.000에 raw confidence 0.952(clamp 이후 0.705)였고, 평균 confidence는 어떤 정확도 수준에서도 0.885(clamp 이후 0.621) 아래로 내려가지 않았다. 그래서 confidence 게이트로는 막을 수 없고 forward pass 이전에 라우팅해야 한다는 것이 Router의 존재 이유다.

### 51개 언어 (MASSIVE intent, 20지선다, 무작위 0.050)

| | `laya` | `laya-multilingual` |
|---|---|---|
| macro 정확도 | 0.2269 | 0.4008 |
| macro ECE | 0.5709 | 0.3911 |
| 무작위 3배 초과 언어 | 23/51 | 48/51 |

`laya-multilingual` 열은 재측정값이다. 0.2.0에서 측정한 committed 파일의 다국어 절반(macro 0.3661, 45/51)은 0.2.0, 0.3.7, 0.3.20, x86 CPU, Apple M5 CPU와 MPS 모두에서 재현되지 않았고 전부 0.4008로 나왔다(#208). 0.05 이상 움직인 16개 언어 중 15개가 올랐다(bn 0.29→0.45, kn 0.15→0.30, hy 0.15→0.25). `laya` 열은 마지막 자리까지 재현됐다. 영어 checkpoint의 macro ECE는 clamp 이전 0.7331에서 clamp 이후 0.5709로 내려갔고 정확도는 그대로다. routing 이득이 가장 큰 언어는 태국어(+0.400), 벵골어, 페르시아어(+0.370), 힌디어, 한국어(+0.360, 0.110→0.470)다. 영어만 영어 checkpoint가 앞선다(0.820 대 0.710).

### Jev와의 비교

| 항목 | Jev 1.13.0 | Laya (routed) | 차이 |
|---|---|---|---|
| typed-decisions, 결정 2,000건 | 0.727 | 0.766 | +0.039 |
| AG News, 4 레이블 | 0.910 | 0.950 | +0.040 |
| DAIR Emotion, 6 레이블 | 0.480 | 0.595 | +0.115 |
| Banking77 (Jev 72개, Laya 77개) | 0.870 | 0.425 | 20개 초과에서 Jev 우세 |
| ECE | 0.246 | 0.081 | temperature 적합 후 3배 |
| p50 지연, 질문 1개 | 236~276ms | 32.8ms | 7.8배 |
| 사용 가능 언어 | 공개 벤치마크 없음 | 48/51 | |
| 가중치 | 닫힌 API | Apache 2.0 | |
| 비용 | 100만 토큰당 0.042달러 | 자체 호스팅 0달러 | |

DAIR Emotion에서 Jev는 예시의 16%에서 정답 레이블에 확률 0을 줬다. Jev가 앞서는 곳은 세 가지다.

- 20개 넘는 선택지: Banking77에서 77개 레이블이 선택지당 3~4 토큰만 받아 구분되지 않는다. 두 checkpoint가 정확히 0.425로 같은 값을 낸 것도 능력이 아니라 예산 상한 때문이라는 해석의 근거다. typed-decisions checkpoint는 0.492다.
- soft accuracy: typed-decisions에서 teacher 분포와의 일치는 Jev 0.580, Laya 0.471이다.
- raw calibration: temperature 적합 전 ECE는 Jev 0.144, Laya 0.213이다.

### typed-decisions (400 사례, 결정 2,000건, 워크플로 4개)

| 모델 | 정확도 | soft acc | Brier | ECE | score MAE |
|---|---|---|---|---|---|
| `laya-typed-decisions` | 0.766 | 0.471 | 0.062 | 0.213 | 0.242 |
| `laya` | 0.362 | 0.331 | 0.315 | 0.174 | 0.694 |
| `laya-multilingual` | 0.352 | 0.328 | 0.463 | 0.314 | 0.760 |
| Jev 1.13.0 (공개) | 0.727 | 0.580 | 0.148 | 0.144 | 0.391 |
| teacher 자기 일치 상한 | 0.735 | | | | |
| 질문별 최빈 클래스 | 0.461 | | | | |
| 무작위 | 0.318 | | | | |

Brier는 README 0.062, BENCHMARKS 0.061로 표기가 다르다. fine-tuning checkpoint의 워크플로별 정확도는 송장 처리 0.804, 보안 사고 0.766, 고객 서비스 0.764, agent trace 관측 0.730이고 primitive별로는 `noul` 0.857, `choice` 0.733, `score` 0.723이다. 기본 checkpoint 두 개는 최빈 클래스 baseline(0.461)보다 낮아, 이 벤치마크의 능력은 전부 fine-tuning에서 나온다. 0.766 행과 워크플로별 수치에는 아직 committed 결과 파일이 없다.

### 응용 워크플로 (각 400 사례)

| 주제 | `laya` | `laya-multilingual` | `laya-typed-decisions` | 데이터 |
|---|---|---|---|---|
| 이메일 스팸 | 0.993 | 0.993 | 0.958 | 학습 포함 |
| 피싱 | 0.980 | 0.993 | 0.940 | 학습 포함 |
| LLM 가드레일 (jailbreak) | 0.708 | 0.755 | 0.762 | held out |
| moderation (유해성) | 0.530 | 0.525 | 0.530 | held out |
| RAG passage 관련성 | 0.625 | 0.657 | 0.625 | 학습 포함 |
| 지원 triage (10개 큐) | 0.502 | 0.522 | 0.505 | 학습 포함 |
| 모델 라우팅 (도메인) | 0.639 | 0.123 | 0.659 | held out |

스팸과 피싱은 ECE 약 0.01로 강하지만 둘 다 학습 데이터에 있었다. held-out toxic-chat moderation은 0.530, macro-F1 0.400으로 균형 분할에서 무작위를 겨우 넘는다. jailbreak 탐지 0.708~0.762는 서로 무관한 두 데이터셋에서 일관됐다(deepset prompt-injections 0.698).

### 영어 과제

| 과제 | `laya` | `laya-multilingual` | 비고 |
|---|---|---|---|
| AG News | 0.947 | 0.937 | 학습 포함 |
| BoolQ | 0.830 | 0.787 | 학습 포함 |
| DAIR Emotion | 0.573 | 0.513 | held out |
| prompt-injections | 0.698 | 0.578 | held out, n=116 |
| SST-5 (서열) | 0.372 | 0.282 | held out |

### 속도 (Tesla T4)

| 호출당 질문 수 | `laya` | `laya-multilingual` |
|---|---|---|
| 1 | 39.5ms | 32.8ms |
| 5 | 84.5ms | 40.1ms |
| 10 | 158.6ms (질문당 15.9ms) | 72.3ms (질문당 7.2ms) |
| 50 | 771ms | 337ms (질문당 6.8ms) |

batch 처리량은 T4 한 장에서 초당 103~332 질문이다.

### Calibration

| | 배포 상태 | temperature 재적합 |
|---|---|---|
| `laya` | 0.466 | 0.081 |
| `laya-multilingual` | 0.314 | 0.106 |

(질문 타입, 선택지 수)마다 temperature 하나를 held-out 데이터로 재적합한 결과다. 라우팅 과제 하나(laya_router 180건, 3단계 choice)에서는 반대로 거의 모든 설정이 과소확신이었다(root checkpoint 평균 P(chosen) 0.562 대 정확도 0.744). 방향이 과제에 따라 달라지므로 어느 쪽이든 자기 데이터로 temperature를 적합하라는 것이 결론이다.

### 선택지 순서 강건성

선택지를 섞었을 때 답이 바뀌는 비율이며 Jev는 0.13으로 측정됐다.

| suite | `laya` | `laya-multilingual` |
|---|---|---|
| massive_intent.en | 0.150 | 0.230 |
| en.emotion | 0.040 | 0.090 |
| xnli.en | 0.000 | 0.015 |

20지선다에서는 두 checkpoint 모두 Jev보다 덜 안정적이다.

### 다른 하드웨어

| 환경 | 측정 | 비고 |
|---|---|---|
| NVIDIA GB10 (DGX Spark), typed-decisions | 질문 1개 p50 100.2ms, 50개 443.1ms | 질문당 약 7.0ms, 호출당 고정 오버헤드 약 93ms (원인 미규명) |
| Ryzen 9 6900HX 노트북 CPU | 기본 스레드 9,396ms → intra 8, inter 1로 783ms | 12배. intra-op 8에서 p50 329ms가 최적 |
| Intel Arc B390 (XPU) | 질문 1개 29.7ms, 10개 96.9ms | CPU 대비 9.7배에서 26.9배 |
| Apple M1 Pro (MPS) | fp16이 english 요청당 20~30ms, multilingual 약 10ms 느림 | long english 8행에서만 fp16 우세 |
| AWS m7a.xlarge (EPYC 4코어) | english 질문 1개 580ms, multilingual 193ms | CPU에서는 질문 batch 이득 작음, 최대 RSS 9.3GiB |

독립 NVIDIA 용량 연구(SAM.gov 공고 1,000건, 요청당 질문 3개)에서 TensorRT FP16(ONNX Runtime 경유)으로 H100 NVL은 p99 130ms 이하에서 초당 175 결정, p99 50ms 이하에서 105 결정을 냈다. RTX PRO 6000은 130ms에서 146 결정, RTX PRO 5000은 15와 42 결정이었다. 7개 MIG slice는 SLO를 안정적으로 충족하지 못했다. 63개 parity 질문에서 모든 backend와 정밀도가 FP32 답을 재현했다(74/74 행). RTX PRO 6000 한 장의 24시간 1,000만 결정 압축 재생은 138,863 요청, 오류 0, 전체 p99 111ms였고 피크 구간 두 곳이 132ms와 144ms였다.

### GPU fast path 지연 (RTX 4070 Ti SUPER, `agent.predict()` 종단 간)

| checkpoint | 조건 | 기본 | fast | 배율 |
|---|---|---|---|---|
| `laya` | 질문 1개, 72 토큰 | 17.7ms | 4.6ms | 3.8배 |
| `laya` | 질문 30개, 512 토큰 | 327.5ms | 232.1ms | 1.4배 |
| `laya-multilingual` | 질문 1개, 72 토큰 | 14.1ms | 2.8ms | 5.1배 |
| `laya-multilingual` | 질문 30개, 966 토큰 | 320.7ms | 187.6ms | 1.7배 |

작은 요청은 커널 실행 오버헤드가 지배하고 CUDA graph가 이를 없앤다. 큰 batch에서는 융합 커널이 약 80 TFLOPS로 cuBLAS와 비슷하고, sliding-window attention은 L=1024에서 dense mask SDPA보다 16배 빠르다. fp16 fast path는 bf16보다 fp32에 3~10배 가깝다.

### 중국어 커뮤니티 평가

zh-decision-bench(219 항목, 284 질문)에서 다국어 checkpoint는 음성 라우팅 0.883, 고객 서비스 라우팅 0.640을 냈다. 선택지 순서 뒤집힘 비율은 28%(고객 서비스)와 10.6%(음성)였다. `noul:2` bucket의 raw temperature 적합값 10.23이 clamp 상한 5를 넘어, 중국어 이진 판단의 과신이 clamp 보정 범위를 벗어난다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **zero-shot typed-decisions는 무작위에 가깝다.** 0.362와 0.352는 무작위 0.318과 최빈 클래스 0.461 사이에 있다. README는 Laya를 zero-shot 결정 엔진이 아니라 특화할 빠른 기반으로 다루라고 쓴다.
- **choice 레이블에 boolean 단어를 쓰지 않는다.** `true`/`false`, `yes`/`no` 같은 키를 쓰면 설명이 아니라 레이블을 따라갈 수 있다.
- **의미 있는 레이블도 부정문을 안전하게 만들지 않는다.** #377의 해지 예시에서 `no_action`/`cancel_account` 키로 부정 요청 4건을 물었더니 `laya`는 4건 모두, `laya-multilingual`은 2건을 `cancel_account`로 골랐고 그중 하나는 확률 0.9998이었다.
- **선택지 20개 초과는 토큰 예산 문제다.**
- **`score`가 가장 약한 primitive다.** SST-5 0.372.
- **`noul`이 state가 아니라 레이블을 따를 수 있다.** 영어 checkpoint에서 가장 심하다(#156). criteria 없는 `noul`은 영어 checkpoint에서 state와 무관하게 "no"를 낸다.
- **`laya-multilingual`의 `score` 위치 편향.** 첫 수준을 거의 고르지 않는다(#131).
- **`action.act_probability`는 아직 쓸 신호가 없다.** 거의 모든 입력에서 1.0이고 raw logit의 정답 AUROC가 0.30이다. 같은 396개 결정에서 `confidence`는 AUROC 0.77이다.
- **moderation은 held-out 데이터에서 성립하지 않는다.**
- **두 checkpoint 모두 과신 상태로 배포된다.** `laya-multilingual`에는 적합된 temperature가 없다.
- **`predict_long`의 확률은 문서 전체에 대해 calibration되지 않는다.**
- **향후 과제로 언급된 것**: position-balanced 재학습, 더 공격적인 선택지 순서 섞기, `noul` 레이블 문제를 고친 재학습 checkpoint.

## 6. 관련 연구 (Related Work)

- **TypeSafe Jev**: 닫힌 API의 System One model. Laya는 같은 질문 타입, 같은 HTTP 프로토콜, 같은 응답 스키마를 쓰고 RLCD라는 학습 이름도 공유한다.
- **ModernBERT, mmBERT**: 각 checkpoint의 인코더 backbone.
- **Parallel Context Windows (Ratner et al., 2023)**: parallel option layout의 출처.
- **TileLang**: GPU fast path의 커널 언어.
- **커뮤니티 도구**: omp-laya-judge(oh-my-pi 플러그인), laya-adk-toolkit(Google ADK 도구), laya-Ascend(화웨이 Ascend NPU, batch 1에서 CPU 대비 34~71배), laya-apple(MLX와 Neural Engine), stuntd(고정 인코더 위 결정별 head 학습, 12개 레이블 intent에서 zero-shot 89.5%에서 학습 후 100%), hs-jev(Haskell 클라이언트), laya-php.

## 7. 용어집 (Glossary)

| 용어 | 설명 |
|---|---|
| System 1 decision engine | 확장된 추론 없이 빠르게 내리는 판단(분류, 라우팅, 점수화)을 한 번의 forward pass로 처리하는 모델이라는 자기 규정 |
| non-autoregressive | 토큰을 하나씩 이어 생성하지 않고 입력 전체를 한 번 읽어 출력을 내는 방식 |
| state | 판단 대상 입력. 문자열, 사전, 목록 모두 가능 |
| `choice` / `score` / `noul` | 레이블 하나 고르기, 서열 수준 기대값, 참일 확률 P(true)를 내는 세 질문 타입 |
| RLCD | strictly proper scoring rule을 reward로 쓰는 강화학습으로 calibration된 결정 확률을 학습하는 방법 |
| `Router` | 문자 체계와 언어를 검출해 요청마다 checkpoint를 고르는 진입점 |
| `head_max_len` | 질문과 선택지 렌더링에 허용하는 토큰 상한. 실제 head 길이와 다르다 |
| `answer_confidence` | 보고된 답의 확률 `max(p)`. temperature scaling이 적합하는 값 |
| `min_confidence` / `abstention` | 호출자가 거는 선택형 기권 임계값과 그 결과 상태 |
| `predict_shortlist` / `predict_tournament` | 많은 선택지를 임베딩 top-k로 줄이거나 16개씩 묶어 두 단계로 고르는 방법 |
| parallel option layout | 선택지마다 같은 position id에서 시작하고 서로 attention하지 않게 학습해 순서 불변성을 얻는 layout |
| typed-decisions | 송장 처리, 보안 사고, 고객 서비스, agent trace 관측 네 워크플로의 결정 2,000건 벤치마크 |

## 8. 그림 후보 (Figure Candidates)

repo라 자동 추출을 실행하지 않았다. 아래는 README 본문이 임베드한 그림이고 전부 `strategy: manual`이며 `raw`는 GitHub 원본 URL이다. 저장소 `assets/`에는 README가 임베드하지 않은 `benchmark_comparison.png`, `laya_benchmark_common.png`, `laya_vs_jev.png`, 로고 파일도 있으나 후보에서 제외했다.

| id | 파일 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | long_context_8192.png | 다국어 checkpoint의 8,192 토큰 문서 길이별 정답 수와 요청당 시간 | manual | ★ wiki 권장 (result) |
| fig02 | laya_benchmark.png | 51개 언어별 checkpoint 정확도와 속도, Jev 비교, calibration | manual | ★ wiki 권장 (result) |
| fig03 | laya_vs_jev_full.png | Laya와 Jev 비교 대시보드 (정확도, 워크플로, 언어, 속도, calibration, preload) | manual | ★ wiki 권장 (result) |

fig03의 "45 / 51 languages usable"과 fig02의 언어별 점은 재측정(#208) 이전 committed 수치다. 본문 표는 재측정값 48/51을 따른다.
