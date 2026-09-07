---
title: "CUA-Gym Dataset (xlangai/CUA-Gym)"
type: repo
year: 2026
category: agents
raw_path: raw/repos/xlangai-cua-gym-dataset.md
raw_filename: "xlangai-cua-gym-dataset.md"
source_collection: external
org: "xlangai"
repo: "CUA-Gym (Hugging Face dataset)"
url: "https://huggingface.co/datasets/xlangai/CUA-Gym"
license: "CC BY 4.0"
tags: [computer-use-agents, gui-agents, desktop-agents, web-agents, rlvr, verifiable-rewards, programmatic-reward, synthetic-data, huggingface, osworld, webarena]
---

## 한 줄 요약 (One-line Summary)

[[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]]가 제시한 RLVR task 집합의 Hugging Face 배포판이다. 브라우징용 parquet 테이블과 실행 가능한 tar 아카이브를 분리한 2층 구조이며, 2026-06-03 릴리스 시점의 공개분은 10,910 task다.

## 1. 자료 정보 (Document Information)

데이터셋 카드가 선언한 Hub 메타데이터다.

| 항목 | 값 |
|---|---|
| 데이터셋 | <https://huggingface.co/datasets/xlangai/CUA-Gym> |
| `pretty_name` | CUA-Gym |
| 라이선스 | CC BY 4.0 (`cc-by-4.0`) |
| `language` | en |
| `task_categories` | reinforcement-learning, text-generation |
| `size_categories` | `10K<n<100K` |
| config 이름 | `tasks` |
| split과 경로 | `train` → `data/tasks.parquet` |
| 최근 릴리스 | 2026-06-03, 데이터 행정 검토를 마친 공개분 |

카드가 참조하는 논문은 arXiv 2605.25624이며 primary class는 cs.AI다.

## 2. 주요 기여 (Key Contributions)

데이터셋 카드는 논문이 다루지 않는 배포 공학과 운영 주의사항을 담는다. 기여는 네 가지로 정리된다.

| 항목 | 내용 |
|---|---|
| 2층 배포 | parquet 메타데이터 테이블과 압축 아카이브를 분리해 Hub에 잔파일이 흩어지는 것을 피한다 |
| 15개 필드 스키마 | task 내용 필드 10개와 아카이브 경로 필드 5개로 원본 번들을 되짚어 갈 수 있다 |
| placeholder 엔드포인트 | 웹 task의 mock 엔드포인트를 URL 대신 `__CUA_GYM_GMAIL_URL__` 형태의 자리표시자로 저장한다 |
| 벤치마크 경계 명시 | 실행 환경을 표준화하지 않은 상태에서 리더보드로 쓰는 것은 의도된 용도가 아니라고 밝힌다 |

2층 구조의 근거를 카드는 두 방향으로 적는다. 수만 개 잔파일이 Hub 저장소에 흩어지는 것을 피하고, Dataset Viewer에는 정돈된 표 하나만 노출한다는 절충이다.

일부 웹 task의 setup과 reward 파일은 CUA-Gym-Hub mock 애플리케이션 엔드포인트를 요구한다. 공개 릴리스는 이 값을 하드코딩된 호스팅 URL이 아니라 자리표시자로 저장한다. 카드는 안정적인 사용을 위해 해당 앱을 직접 배포하고 `url_variables.json`에 나열된 변수를 설정한 뒤 파일을 치환하라고 권한다. 릴리스가 띄워둔 `xlang.ai` 엔드포인트는 참조와 스모크 테스트용이며 대규모 학습이나 평가의 의존 대상으로 삼지 말라고 두 곳에서 밝힌다. 하나는 상단 주의 절이고 다른 하나는 치환 스크립트의 `--use-hosted-defaults` 설명이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 저장소 레이아웃

```text
README.md
stats.json
url_variables.json
data/tasks.parquet
artifacts/cua_gym_tasks_v1.tar.zst
scripts/materialize_dataset_urls.py
```

| 경로 | 역할 |
|---|---|
| `data/tasks.parquet` | Dataset Viewer 브라우징과 프로그램 필터링용 메타데이터 테이블 |
| `artifacts/cua_gym_tasks_v1.tar.zst` | 원본 실행 번들을 담은 zstd 압축 아카이브 |
| `url_variables.json` | 엔드포인트 변수 매니페스트 |
| `scripts/materialize_dataset_urls.py` | 자리표시자를 실제 URL로 치환하는 스크립트 |
| `stats.json` | 릴리스 통계 |

아카이브 안은 task 하나당 디렉토리 하나다. `task.json`, `reward.py`, 그리고 `initial_setup.py`, `initial_setup.sh`, `initial_setup.xlsx`, `initial_setup.docx`, `initial_setup.pptx` 중 하나가 들어간다.

### 3.2 task 테이블 필드

카드는 Dataset Viewer가 노출하는 `tasks` 테이블 필드를 15개로 정의한다. 앞의 10개가 task 내용과 라벨이다.

| 필드 | 설명 |
|---|---|
| `id` | 안정적인 task 식별자 |
| `instruction` | 에이전트에 제시되는 자연어 지시문(instruction) |
| `app_type` | `libreoffice_calc`, `vscode`, `instagram_mock`, `multi_apps` 같은 앱 또는 환경 라벨 |
| `app_family` | `app_type`에서 유도한 거친 분류 |
| `platform` | 추론 가능할 때의 거친 플랫폼 구분 |
| `difficulty` | 난이도 라벨. 일부 task는 현재 라벨이 없다 |
| `setup_kind` | setup 산출물 종류 |
| `num_setup_steps` | 원본 task config의 setup action 수 |
| `num_setup_files` | config가 참조하는 setup 산출물 수 |
| `has_ground_truth` | 원본 task 메타데이터에 `ground_truth` 필드가 있는지 여부 |

나머지 5개는 아카이브 내부 위치를 가리킨다. 이 필드들이 parquet 테이블과 tar 아카이브를 잇는 연결 고리다.

| 필드 | 설명 |
|---|---|
| `archive_path` | 원본 task 번들을 담고 있는 아카이브 파일 |
| `archive_member` | 아카이브 안의 task 디렉토리 |
| `task_json_member` | 아카이브 안 `task.json` 경로 |
| `reward_member` | 아카이브 안 `reward.py` 경로 |
| `setup_file_members` | 아카이브 안 setup 산출물 경로 목록 |

분류 필드의 값 범위는 카드가 열거한다.

| 필드 | 값 |
|---|---|
| `app_family` | `desktop_office`, `desktop`, `mock_web`, `multi_apps`, `other` |
| `platform` | `desktop`, `web`, `cross_app` |
| `setup_kind` | `py`, `sh`, `xlsx`, `docx`, `pptx` |

### 3.3 사용 흐름

메타데이터만 볼 때는 `datasets`로 충분하다.

```python
from datasets import load_dataset
tasks = load_dataset("xlangai/CUA-Gym", "tasks", split="train")
print(tasks[0]["instruction"])
```

카드는 `tasks.filter`로 `app_type`과 `difficulty`를 조합해 거르는 예시와 `collections.Counter`로 `app_type` 상위 10개를 세는 예시를 함께 제시한다.

실행하려면 아카이브를 따로 받아 푼다. `huggingface-cli download`에 `--repo-type dataset`을 주고 `--include`로 네 경로를 지정한다. 아카이브, 치환 스크립트, 변수 매니페스트, parquet 테이블이다. 압축 해제는 `tar --zstd -xf`로 한다.

이후 실행 절차는 네 단계다.

| 단계 | 동작 |
|---|---|
| 1 | `<task_id>/task.json`을 읽는다 |
| 2 | 그 안의 `config` 단계를 적용해 환경을 준비한다 |
| 3 | `instruction`을 에이전트에 전달한다 |
| 4 | 최종 환경에서 `<task_id>/reward.py`를 실행해 점수를 계산한다 |

`task.json`에는 `instruction`, `config`, `evaluator` 키가 들어 있고 원본 실행 config 원형이 그 안에 보존된다.

### 3.4 엔드포인트 치환

`url_variables.json`의 `variables` 항목은 변수마다 스펙 객체를 가진다.

| 키 | 역할 |
|---|---|
| `kind` | 변수 종류. `host`인 항목은 env 파일 생성에서 제외한다 |
| `env` | 환경 변수 이름 |
| `default` | 기본값 |

카드가 제시하는 절차는 매니페스트에서 env 파일 템플릿을 생성하고 값을 자기 배포 URL로 고친 뒤 `materialize_dataset_urls.py`에 `--manifest`와 `--env-file`을 주어 추출된 task 파일을 치환하는 순서다. 스크립트는 필요한 `CUA_GYM_*` 변수가 하나라도 없으면 즉시 실패한다. 짧은 스모크 테스트에 한해 `--use-hosted-defaults`로 릴리스 호스팅 엔드포인트를 되살릴 수 있다.

### 3.5 현재 릴리스 통계

| 항목 | 값 |
|---|---:|
| task 수 | 10,910 |
| 원본 task 파일 수 | 32,730 |
| 압축 해제 크기 | 약 294MB |
| `app_type` 종류 | 327 |
| 난이도 라벨 있음 | 7,365 |
| 난이도 라벨 없음 | 3,545 |

라벨 있음과 없음의 합이 task 수와 일치하고, 파일 수 32,730은 task 수의 정확히 3배다. task 하나가 `task.json`, `reward.py`, setup 산출물 하나로 구성된다는 아카이브 레이아웃과 맞는 수치다.

카드가 꼽는 가장 큰 앱 카테고리는 `libreoffice_calc`, `libreoffice_writer`, `libreoffice_impress`, `multi_apps`, `vscode`, `pdf`이고, 여기에 `instagram_mock`, `hubspot_mock`, `google_docs_mock`, `outlook_web_mock`, `google_sheets_mock` 같은 mock 웹 애플리케이션이 함께 열거된다. 카드는 이 목록을 "포함한다"로 서술해 전수 순위로 제시하지 않는다.

세는 단위가 다른 수치가 여럿이라 혼동하기 쉽다.

| 수치 | 단위 | 출처 |
|---|---|---|
| 10,910 | 공개 task 수 | 이 데이터셋 카드 |
| 32,730 | 아카이브 원본 파일 수 | 이 데이터셋 카드 |
| 32,112 | 검증된 RLVR 학습 튜플 수 | [[agents/xlang-ai-cua-gym]] 저장소 README |
| 327 | `app_type` 라벨 종류 | 이 데이터셋 카드 |
| 110 | 환경 수 (데스크톱 16종과 mock 웹 94종) | [[agents/xlang-ai-cua-gym]] 저장소 README |

32,730과 32,112는 값이 가까우나 각각 파일 수와 튜플 수라서 같은 대상이 아니다. 10,910과 32,112의 차이에 대해 카드는 "필요한 데이터 검토를 마친 공개분 전체"라고만 적고, [[agents/xlang-ai-cua-gym]] 저장소 README가 남은 데이터는 행정 검토 중이며 전체 데이터셋을 점진적으로 공개하겠다고 밝힌다. `app_type` 327종과 환경 110개도 세는 단위가 다르다. 카드는 `app_type`을 앱 또는 환경 라벨로 정의하고 거친 묶음은 `app_family`가 따로 맡는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

데이터셋 카드에는 모델 성적이 없다. 성적은 논문 source가 담당한다. 카드가 밝히는 의도된 용도는 다섯 가지다.

| 용도 |
|---|
| computer-use agent와 GUI 에이전트 연구 |
| RLVR과 프로그램 reward 설계 |
| 합성 task 생성 |
| 실행 가능한 데스크톱과 웹 평가 |
| post-training 데이터 필터링과 스케일링 연구 |

동시에 카드는 사용자가 실행 환경, action 인터페이스, observation 포맷, reward 호출 규약을 표준화하지 않는 한 이 데이터셋 자체를 리더보드로 쓰는 것은 의도된 용도가 아니라고 밝힌다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

카드가 스스로 꼽는 한계는 네 가지다.

| 한계 | 내용 |
|---|---|
| 결과 기반 reward | reward가 재는 것은 최종 환경 상태이며 거기 도달한 과정 전체는 재지 않는다 |
| 라벨 결손 | 일부 task에 난이도 라벨이 없다 (3,545개) |
| mock 웹의 단순화 | 인증, 네트워크 지연, rate limit, 서드파티 연동, 프로덕션 오류 상태 같은 실제 동작을 빠뜨린다 |
| 이질적 setup 산출물 | `.py`, `.sh`, `.xlsx`, `.docx`, `.pptx`가 섞여 있어 실행기 쪽에 앱별 지원이 필요하다 |

여기에 안전 주의가 별도 절로 붙는다. 아카이브에는 파일을 만들고 로컬 상태를 바꾸고 앱을 열고 reward 검사를 실행하는 Python과 셸 스크립트가 들어 있으니 신뢰할 수 없는 실행 산출물로 다뤄야 한다.

| 수칙 |
|---|
| 일회용 가상 머신이나 컨테이너 안에서 task를 실행한다 |
| 개인 워크스테이션에서 setup 스크립트를 실행하지 않는다 |
| 개인 파일, 자격증명, 클라우드 토큰, 프로덕션 서비스 접근을 차단한다 |
| 새 환경에서 실행하기 전에 스크립트를 검토한다 |

일부 task 상태에는 합성 자격증명, 비밀번호, API 키, 토큰이 들어 있다. 카드는 이것이 평가용 mock 데이터이며 실제 비밀로 해석해서는 안 된다고 덧붙인다.

## 6. 관련 연구 (Related Work)

카드는 논문과 `xlang-ai/CUA-Gym` 저장소를 가리키고 별도의 선행 연구 서술은 두지 않는다. 인용 규약으로 bibtex 항목 두 개를 제시한다.

| 항목 | 내용 |
|---|---|
| 논문 | `wang2026cuagymscalingverifiabletraining`. 저자 14명, arXiv 2605.25624, cs.AI |
| 데이터셋 | `cua-gym-dataset`. 저자 표기는 CUA-Gym Team, Hugging Face 데이터셋 페이지를 `howpublished`로 지정 |

문의 창구는 Hugging Face 데이터셋 페이지의 discussion이거나 프로젝트 저장소를 통한 메인테이너 연락이다.

## 7. 용어집 (Glossary)

논문 source의 용어집을 공유한다. 카드에만 나오는 필드와 도구를 여기 정리한다.

| 용어 | 뜻 |
|---|---|
| `app_type` | `libreoffice_calc`, `vscode`, `instagram_mock`, `multi_apps` 같은 앱 또는 환경 라벨. 327종 |
| `app_family` | `app_type`에서 유도한 거친 분류. `desktop_office`, `desktop`, `mock_web`, `multi_apps`, `other` |
| `setup_kind` | 초기 setup 산출물의 종류. `py`, `sh`, `xlsx`, `docx`, `pptx` |
| `archive_path` | 원본 task 번들을 담고 있는 아카이브 파일 |
| `archive_member` | tar 아카이브 안의 task 디렉토리 경로 |
| Dataset Viewer | Hugging Face가 parquet 테이블을 브라우저에서 훑게 해주는 기능 |
| materialize | 자리표시자로 저장된 엔드포인트를 실제 배포 URL로 치환해 실행 가능한 상태로 만드는 처리 |
