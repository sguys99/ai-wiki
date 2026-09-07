---
title: "CUA-Gym Dataset (xlangai/CUA-Gym)"
type: repo
year: 2026
category: agents
raw_path: raw/repos/xlangai-cua-gym-dataset.md
raw_filename: "xlangai-cua-gym-dataset.md"
source_collection: external
source: xlangai-cua-gym-dataset.md
org: "xlangai"
repo: "CUA-Gym (Hugging Face dataset)"
url: "https://huggingface.co/datasets/xlangai/CUA-Gym"
license: "CC BY 4.0"
tags: [computer-use-agents, gui-agents, desktop-agents, web-agents, rlvr, verifiable-rewards, programmatic-reward, synthetic-data, huggingface, osworld, webarena]
---

## 요약

CUA-Gym Dataset은 computer-use agent를 RLVR로 학습시키기 위한 검증 가능한 task 집합의 Hugging Face 배포판이다. task 하나가 자연어 지시문(instruction), 실행 가능한 setup 산출물, 그리고 완료 여부를 프로그램으로 판정하는 Python reward 함수로 짝지어져 있다. 2026-06-03 릴리스 시점의 공개분은 10,910 task이며 라이선스는 CC BY 4.0이다.

이 페이지는 데이터셋의 구성, 필드 스키마, 규모 통계, 라이선스와 사용 조건을 다룬다. task를 합성한 방법과 학습 결과는 [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]]가, 실행 환경 구현과 설치 절차는 [[agents/xlang-ai-cua-gym]]이 담당한다.

데이터셋 카드가 논문과 저장소 문서에 더해 주는 정보는 배포 공학과 운영 조건이다. 어떤 파일이 어디에 있고, 메타데이터 테이블과 실행 번들이 어떻게 연결되며, 자체 배포 없이는 무엇이 동작하지 않고, 어떤 격리 환경에서 실행해야 하는지를 카드가 명시한다.

## 배경

이 데이터셋은 Hugging Face Hub에 올리기 어려운 형태의 자료를 다룬다. RLVR용 computer-use task는 텍스트 한 줄이 아니라 실행 가능한 번들이다. task 하나마다 환경을 준비하는 스크립트와 채점 코드가 별도 파일로 딸려 오므로, 1만 개 규모에서는 파일 수가 3만 개를 넘는다.

카드는 이 문제를 2층 배포로 해결한다. 잔파일 수만 개를 Hub 저장소에 그대로 올리는 대신 메타데이터만 parquet 테이블 하나로 뽑고 실행 번들 전체는 압축 아카이브 하나에 담았다. Dataset Viewer에는 정돈된 표 하나만 노출되고, 실행이 필요한 사용자만 아카이브를 따로 내려받는다.

두 번째 제약은 웹 task다. mock 웹 애플리케이션을 대상으로 하는 task는 그 애플리케이션이 어딘가에 떠 있어야 실행된다. 공개 릴리스는 특정 호스트에 고정된 URL을 심는 대신 자리표시자를 저장해, 사용자가 자기 배포를 가리키도록 치환하게 했다.

## 핵심 개념

RLVR은 reinforcement learning with verifiable rewards의 약어로, 사람의 선호 라벨이 아니라 프로그램이 판정한 성공 여부를 reward로 쓰는 학습 방식이다. 이 데이터셋의 각 task에 `reward.py`가 딸려 있는 이유가 여기 있다.

reward는 이 데이터셋에서 최종 환경 상태를 검사하는 함수다. 에이전트가 작업을 마친 뒤 파일 내용, 애플리케이션 상태, 웹 애플리케이션의 데이터가 기대한 모양인지 코드로 확인해 점수를 낸다.

instruction은 에이전트에 그대로 제시되는 자연어 과제 서술이다. 지시문(instruction)이라는 번역어와 원어가 같은 대상을 가리키며, 이 페이지에서는 필드 이름을 다룰 때 원어를 쓴다.

materialize는 자리표시자로 저장된 엔드포인트를 실제 배포 URL로 치환해 task 파일을 실행 가능한 상태로 만드는 처리를 뜻한다. 카드는 이 작업을 전용 스크립트로 수행하게 한다.

Dataset Viewer는 Hugging Face가 parquet 테이블을 브라우저에서 훑고 필터링하게 해주는 기능이다. 2층 배포에서 상단 층이 존재하는 목적이 이 Viewer를 쓸 수 있게 하는 것이다.

## 배포 구조

### 2층 레이아웃

배포는 메타데이터 층과 실행 산출물 층으로 나뉜다.

| 층 | 경로 | 용도 |
|---|---|---|
| 메타데이터 | `data/tasks.parquet` | Dataset Viewer 브라우징과 프로그램 필터링 |
| 실행 산출물 | `artifacts/cua_gym_tasks_v1.tar.zst` | 원본 실행 번들을 담은 zstd 압축 아카이브 |

메타데이터 층만 쓰는 경우에는 `datasets` 라이브러리로 표를 불러오면 되고 아카이브는 내려받지 않아도 된다. task를 실제로 실행하려면 두 층을 모두 받아야 한다.

### 저장소 구성 파일

저장소 루트에는 두 층 외에 매니페스트와 스크립트가 함께 놓인다.

```text
README.md
stats.json
url_variables.json
data/tasks.parquet
artifacts/cua_gym_tasks_v1.tar.zst
scripts/materialize_dataset_urls.py
```

| 파일 | 역할 |
|---|---|
| `stats.json` | 릴리스 통계 |
| `url_variables.json` | 웹 엔드포인트 변수 매니페스트 |
| `scripts/materialize_dataset_urls.py` | 자리표시자를 실제 URL로 치환하는 스크립트 |

### 아카이브 내부

아카이브를 풀면 task 하나가 디렉토리 하나가 된다.

```text
<task_id>/
  task.json
  reward.py
  initial_setup.py | initial_setup.sh | initial_setup.xlsx | initial_setup.docx | initial_setup.pptx
```

`task.json`이 실행 config를, `reward.py`가 채점 코드를 담고, setup 산출물이 초기 환경 상태를 만든다. setup 산출물의 확장자가 다섯 가지인 이유는 준비 방식이 task마다 다르기 때문이다. 스크립트로 상태를 만드는 task는 `.py`나 `.sh`를 쓰고, 문서 편집 task는 편집 대상 파일 자체를 `.xlsx`, `.docx`, `.pptx`로 포함한다.

## 메타데이터 스키마

Dataset Viewer가 노출하는 `tasks` 테이블은 필드 15개로 정의된다. 이 중 10개가 task의 내용과 라벨을 담고, 5개가 아카이브 안의 위치를 가리킨다.

### 내용과 라벨 필드

| 필드 | 설명 |
|---|---|
| `id` | 안정적인 task 식별자. 카드 예시는 `0018392e-cfed-5e2f-8278-a4580d64a00a` 같은 UUID 형태다 |
| `instruction` | 에이전트에 제시되는 자연어 task 지시문 |
| `app_type` | `libreoffice_calc`, `vscode`, `instagram_mock`, `multi_apps` 같은 앱 또는 환경 라벨 |
| `app_family` | `app_type`에서 유도한 거친 분류 |
| `platform` | 추론 가능할 때의 거친 플랫폼 구분 |
| `difficulty` | 난이도 라벨. 일부 task는 현재 라벨이 없다 |
| `setup_kind` | setup 산출물의 종류 |
| `num_setup_steps` | 원본 task config에 들어 있는 setup action의 수 |
| `num_setup_files` | config가 참조하는 setup 산출물의 수 |
| `has_ground_truth` | 원본 task 메타데이터에 `ground_truth` 필드가 있는지 여부 |

`num_setup_steps`와 `num_setup_files`는 task의 준비 비용을 미리 재는 데 쓸 수 있는 값이다. 예를 들어 setup 단계가 많은 task만 골라 실행기의 안정성을 시험하거나, 반대로 준비가 가벼운 task로 빠른 반복 실험을 구성할 수 있다.

### 아카이브 경로 필드

나머지 다섯 필드가 parquet 테이블과 tar 아카이브를 잇는 연결 고리다. 표에서 조건에 맞는 행을 고른 뒤 이 경로들로 해당 번들을 곧바로 찾아갈 수 있다.

| 필드 | 설명 |
|---|---|
| `archive_path` | 원본 task 번들을 담고 있는 아카이브 파일 |
| `archive_member` | 아카이브 안의 task 디렉토리 |
| `task_json_member` | 아카이브 안 `task.json` 경로 |
| `reward_member` | 아카이브 안 `reward.py` 경로 |
| `setup_file_members` | 아카이브 안 setup 산출물 경로 목록 |

### 분류 필드의 값 범위

세 분류 필드는 값의 집합이 카드에 명시되어 있다. 필터를 짤 때 이 목록이 기준이 된다.

| 필드 | 값 |
|---|---|
| `app_family` | `desktop_office`, `desktop`, `mock_web`, `multi_apps`, `other` |
| `platform` | `desktop`, `web`, `cross_app` |
| `setup_kind` | `py`, `sh`, `xlsx`, `docx`, `pptx` |

`app_type`은 값이 327종이라 열거되지 않는다. `app_family`가 존재하는 이유가 이것이다. 327종을 그대로 다루는 대신 다섯 묶음으로 접어 분포를 보게 한다. `platform`에는 "추론 가능할 때"라는 조건이 붙어 있어 모든 task에 값이 채워져 있다고 가정할 수 없다.

## 규모 통계

2026-06-03 릴리스 시점의 수치다.

| 항목 | 값 |
|---|---:|
| task 수 | 10,910 |
| 원본 task 파일 수 | 32,730 |
| 압축 해제 크기 | 약 294MB |
| `app_type` 종류 | 327 |
| 난이도 라벨 있음 | 7,365 |
| 난이도 라벨 없음 | 3,545 |

표의 수치는 서로 맞물린다. 난이도 라벨이 있는 7,365개와 없는 3,545개를 더하면 task 수 10,910과 같다. 파일 수 32,730은 task 수의 정확히 3배인데, 이는 task 하나가 `task.json`, `reward.py`, setup 산출물 하나로 이루어진다는 아카이브 레이아웃과 일치한다. 즉 setup 산출물이 여러 개인 task는 이 릴리스에 사실상 없다고 읽을 수 있다.

압축 해제 크기가 약 294MB에 그치는 것은 아카이브 레이아웃과 맞는다. 번들에 들어가는 것은 실행 config, 채점 코드, setup 산출물 하나뿐이고 스크린샷이나 영상 같은 무거운 자료는 카드가 열거한 구성에 없다.

### 앱 카테고리 분포

카드는 이 릴리스에서 큰 앱 카테고리를 두 묶음으로 열거한다.

| 묶음 | 카테고리 |
|---|---|
| 데스크톱 | `libreoffice_calc`, `libreoffice_writer`, `libreoffice_impress`, `multi_apps`, `vscode`, `pdf` |
| mock 웹 | `instagram_mock`, `hubspot_mock`, `google_docs_mock`, `outlook_web_mock`, `google_sheets_mock` |

데스크톱 쪽은 오피스 문서 작업과 코드 편집기가 중심이고, 웹 쪽은 소셜, CRM, 문서 협업, 메일, 스프레드시트 같은 업무용 서비스를 흉내 낸 mock이다. 카드는 이 목록을 "포함한다"로 서술하므로 전수 순위표로 읽을 수는 없다.

### 혼동하기 쉬운 수치

CUA-Gym 계열 문서에는 값이 비슷하면서 세는 단위가 다른 수치가 여럿 있다.

| 수치 | 단위 | 출처 |
|---|---|---|
| 10,910 | 공개된 task 수 | 이 데이터셋 카드 |
| 32,730 | 아카이브 원본 파일 수 | 이 데이터셋 카드 |
| 32,112 | 검증된 RLVR 학습 튜플 수 | [[agents/xlang-ai-cua-gym]] 저장소 README |
| 327 | `app_type` 라벨 종류 | 이 데이터셋 카드 |
| 110 | 환경 수 (데스크톱 16종과 mock 웹 94종) | [[agents/xlang-ai-cua-gym]] 저장소 README |

32,730과 32,112는 값이 가깝지만 각각 파일 수와 튜플 수라서 같은 대상이 아니다. 두 수를 같은 것으로 보면 이 릴리스가 전체 데이터셋이라는 잘못된 결론이 나온다.

10,910과 32,112의 차이에 대해 카드는 "필요한 데이터 검토를 마친 공개분 전체"라고만 적는다. 배경은 [[agents/xlang-ai-cua-gym]] 저장소 README가 밝히는데, 남은 데이터가 행정 검토 중이며 전체 데이터셋을 점진적으로 공개할 예정이라고 되어 있다.

`app_type` 327종과 환경 110개도 세는 단위가 다르다. 카드는 `app_type`을 앱 또는 환경 라벨로 정의하고 거친 묶음은 `app_family`가 따로 맡으므로, 라벨 종류 수를 환경 수로 읽을 수 없다.

## 사용 절차

### 메타데이터만 사용하기

표만 필요할 때는 표준 Hugging Face 도구로 끝난다. 설치는 `pip install datasets huggingface_hub`다.

```python
from datasets import load_dataset
tasks = load_dataset("xlangai/CUA-Gym", "tasks", split="train")
print(tasks[0]["instruction"])
```

카드는 이어서 두 가지 활용 예시를 제시한다. `tasks.filter`로 `app_type`과 `difficulty`를 함께 걸어 특정 앱의 어려운 task만 세는 예시, 그리고 `collections.Counter`로 `app_type` 상위 10개를 뽑아 앱 단위 커버리지를 확인하는 예시다. 두 예시 모두 아카이브를 내려받지 않고 표만으로 수행된다.

### 실행 번들 내려받기

실행에는 아카이브가 필요하다. `huggingface-cli download`에 `--repo-type dataset`과 `--local-dir`을 주고 `--include`로 필요한 파일만 지정한다. 카드가 지정하는 네 경로는 다음과 같다.

| 경로 | 필요한 이유 |
|---|---|
| `artifacts/cua_gym_tasks_v1.tar.zst` | 실행 번들 본체 |
| `scripts/materialize_dataset_urls.py` | 엔드포인트 치환 |
| `url_variables.json` | 치환에 쓸 변수 매니페스트 |
| `data/tasks.parquet` | 번들 위치를 찾을 메타데이터 |

압축 해제는 `tar --zstd -xf`로 한다. 이후 `archive_member`, `task_json_member`, `reward_member` 필드로 개별 task 번들을 찾는다.

### task 실행 4단계

카드가 제시하는 실행 패턴은 네 단계다.

| 단계 | 동작 |
|---|---|
| 1 | `<task_id>/task.json`을 읽는다 |
| 2 | 그 안의 `config` 단계를 적용해 환경을 준비한다 |
| 3 | `instruction`을 에이전트에 전달한다 |
| 4 | 최종 환경에서 `<task_id>/reward.py`를 실행해 점수를 계산한다 |

`task.json`에는 `instruction`, `config`, `evaluator` 키가 들어 있다. 원본 실행 config 원형이 이 파일 안에 보존되므로, parquet 테이블의 요약 필드만으로 부족한 세부는 여기서 확인한다.

## 자체 배포와 엔드포인트 치환

일부 웹 task의 setup과 reward 파일은 CUA-Gym-Hub mock 애플리케이션 엔드포인트를 요구한다. 공개 릴리스는 이 값을 하드코딩된 호스팅 URL이 아니라 `__CUA_GYM_GMAIL_URL__` 같은 자리표시자로 저장한다.

카드는 안정적인 사용을 위해 해당 앱을 직접 배포하고 `url_variables.json`에 나열된 엔드포인트 변수를 설정한 뒤 추출된 task 파일을 치환하라고 권한다. 릴리스가 띄워둔 `xlang.ai` 엔드포인트는 참조와 스모크 테스트용이며 대규모 학습이나 평가의 의존 대상으로 삼지 말라는 경고가 두 곳에 있다. 상단 주의 절과 치환 스크립트의 `--use-hosted-defaults` 설명이다.

`url_variables.json`의 `variables` 항목은 변수마다 스펙 객체를 가진다.

| 키 | 역할 |
|---|---|
| `kind` | 변수 종류. 값이 `host`인 항목은 env 파일 생성에서 제외한다 |
| `env` | 환경 변수 이름 |
| `default` | 기본값 |

치환 절차는 세 단계다. 먼저 매니페스트를 읽어 `kind`가 `host`가 아닌 항목만 모아 env 파일 템플릿을 만든다. 다음으로 그 값을 자기 배포 URL로 고친다. 마지막으로 `materialize_dataset_urls.py`에 `--manifest`와 `--env-file`을 주어 추출된 task 디렉토리를 치환한다.

스크립트는 필요한 `CUA_GYM_*` 변수가 하나라도 없으면 즉시 실패한다. 자리표시자가 남은 상태로 실행이 진행되어 조용히 잘못된 결과가 나오는 것을 막는 설계다. 짧은 스모크 테스트에 한해 `--use-hosted-defaults`로 릴리스 호스팅 엔드포인트를 되살릴 수 있다.

## 의도된 용도와 벤치마크 경계

카드는 이 데이터셋의 연구 용도를 다섯 가지로 밝힌다.

| 용도 |
|---|
| computer-use agent와 GUI 에이전트 연구 |
| RLVR과 프로그램 reward 설계 |
| 합성 task 생성 |
| 실행 가능한 데스크톱과 웹 평가 |
| post-training 데이터 필터링과 스케일링 연구 |

같은 절에서 카드는 경계도 함께 긋는다. 사용자가 실행 환경, action 인터페이스, observation 포맷, reward 호출 규약을 표준화하지 않는 한 이 데이터셋 자체를 리더보드로 쓰는 것은 의도된 용도가 아니라고 밝힌다.

이 조건이 붙는 이유는 데이터셋이 task와 채점 코드만 제공하고 실행 환경은 제공하지 않기 때문이다. 같은 task를 다른 환경에서 다른 action 인터페이스로 실행하면 점수를 비교할 근거가 없다. 표준화 부담이 사용자에게 남는 구조이며, 이 부담을 줄이는 쪽은 [[agents/xlang-ai-cua-gym]] 저장소가 제공하는 실행 도구다.

## 실행 안전

아카이브에는 파일을 만들고 로컬 상태를 바꾸고 애플리케이션을 열고 reward 검사를 실행하는 Python과 셸 스크립트가 들어 있다. 카드는 이를 신뢰할 수 없는 실행 산출물로 다루라고 별도 절에서 요구한다.

| 수칙 |
|---|
| 일회용 가상 머신이나 컨테이너 안에서 task를 실행한다 |
| 개인 워크스테이션에서 setup 스크립트를 실행하지 않는다 |
| 개인 파일, 자격증명, 클라우드 토큰, 프로덕션 서비스 접근을 차단한다 |
| 새 환경에서 실행하기 전에 스크립트를 검토한다 |

일부 task 상태에는 합성 자격증명, 비밀번호, API 키, 토큰이 들어 있다. 카드는 이것이 평가용 mock 데이터이며 실제 비밀로 해석해서는 안 된다고 덧붙인다.

## 한계

카드가 스스로 꼽는 한계는 네 가지다.

| 한계 | 내용 |
|---|---|
| 결과 기반 reward | reward가 재는 것은 최종 환경 상태이며 거기 도달한 과정 전체는 재지 않는다 |
| 라벨 결손 | 일부 task에 난이도 라벨이 없다. 이 릴리스에서 3,545개다 |
| mock 웹의 단순화 | 인증, 네트워크 지연, rate limit, 서드파티 연동, 프로덕션 오류 상태 같은 실제 동작을 빠뜨린다 |
| 이질적 setup 산출물 | `.py`, `.sh`, `.xlsx`, `.docx`, `.pptx`가 섞여 있어 실행기 쪽에 앱별 지원이 필요하다 |

앞의 두 한계는 사용 방식에 곧바로 영향을 준다. 결과 기반 reward는 우회 경로로 목표 상태를 만든 궤적과 의도한 절차를 따른 궤적을 구분하지 못한다. 난이도 라벨 결손은 전체의 약 3분의 1에 해당해, 난이도별 커리큘럼을 짜려면 라벨 있는 7,365개만 쓰거나 라벨을 직접 붙여야 한다.

뒤의 두 한계는 실행기 쪽 부담이다. mock 웹은 실제 서비스의 실패 양상을 재현하지 않으므로 여기서 학습한 정책이 프로덕션 환경의 오류 상태를 다룰 수 있다고 보장되지 않는다. setup 산출물이 다섯 종류로 섞여 있다는 점은 실행기가 LibreOffice 계열 문서와 스크립트 실행을 모두 지원해야 한다는 요구로 이어진다.

## 라이선스와 인용

데이터셋 카드가 선언하는 라이선스는 CC BY 4.0(`cc-by-4.0`) 단일 항목이다. 저작자 표시를 지키면 사용과 재배포, 변형이 허용되는 조건이다. [[agents/xlang-ai-cua-gym]] 저장소 쪽은 코드에 Apache-2.0을, 데이터셋에 CC BY 4.0을 적용한다고 밝히므로, 코드와 데이터를 함께 쓸 때는 두 라이선스를 각각 확인해야 한다.

Hub 메타데이터로 선언된 항목은 다음과 같다.

| 항목 | 값 |
|---|---|
| `pretty_name` | CUA-Gym |
| `license` | `cc-by-4.0` |
| `language` | en |
| `task_categories` | reinforcement-learning, text-generation |
| `size_categories` | `10K<n<100K` |
| config 이름 | `tasks` |
| split과 경로 | `train` → `data/tasks.parquet` |

`size_categories`가 `10K<n<100K`인 것은 현재 공개분 10,910 task와 맞는 구간 표기다. `task_categories`에는 reinforcement-learning과 함께 text-generation이 선언되어 있다.

인용 규약으로 카드는 bibtex 항목 두 개를 제시하며 둘을 함께 인용하라고 요청한다.

| 항목 | 내용 |
|---|---|
| 논문 | `wang2026cuagymscalingverifiabletraining`. 저자 14명, arXiv 2605.25624, primary class cs.AI |
| 데이터셋 | `cua-gym-dataset`. 저자 표기는 CUA-Gym Team, Hugging Face 데이터셋 페이지를 `howpublished`로 지정 |

문의 창구는 Hugging Face 데이터셋 페이지의 discussion이거나 프로젝트 저장소를 통한 메인테이너 연락이다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| `app_type` | `libreoffice_calc`, `vscode`, `instagram_mock`, `multi_apps` 같은 앱 또는 환경 라벨. 이 릴리스에 327종 |
| `app_family` | `app_type`에서 유도한 거친 분류. `desktop_office`, `desktop`, `mock_web`, `multi_apps`, `other` |
| `setup_kind` | 초기 setup 산출물의 종류. `py`, `sh`, `xlsx`, `docx`, `pptx` |
| `archive_member` | tar 아카이브 안의 task 디렉토리 경로. parquet 테이블과 실행 번들을 잇는 필드다 |
| materialize | 자리표시자로 저장된 엔드포인트를 실제 배포 URL로 치환해 실행 가능한 상태로 만드는 처리 |
| Dataset Viewer | Hugging Face가 parquet 테이블을 브라우저에서 훑게 해주는 기능 |

## 관련 페이지

- [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]]: 원 논문. task 합성 방법, 검증 튜플 32,112개의 생성 과정, 학습 결과와 벤치마크 성적을 담당한다
- [[agents/xlang-ai-cua-gym]]: 코드 저장소. 실행 환경 구현, 설치 절차, CUA-Gym-Hub 자체 배포와 코드 라이선스를 담당한다
