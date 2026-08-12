---
title: "CUA-Gym Dataset (xlangai/CUA-Gym)"
type: repo
year: 2026
category: agents
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/repos/xlangai-cua-gym-dataset.md
raw_filename: "xlangai-cua-gym-dataset.md"
source_collection: external
org: "xlangai"
repo: "CUA-Gym (Hugging Face dataset)"
url: "https://huggingface.co/datasets/xlangai/CUA-Gym"
license: "CC BY 4.0"
tags: [computer-use-agents, gui-agents, rlvr, verifiable-rewards, robot-dataset, synthetic-data, huggingface, osworld, webarena]
---

## 한 줄 요약 (One-line Summary)

[[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]]가 만든 RLVR task 묶음의 Hugging Face 배포판. 브라우징용 parquet 테이블과 실행 가능한 tar 아카이브를 분리한 2층 구조다. 논문의 32,112개 중 현재 공개된 것은 10,910 task다.

## 1. 자료 정보 (Document Information)

- **데이터셋**: <https://huggingface.co/datasets/xlangai/CUA-Gym>
- **라이선스**: CC BY 4.0
- **규모 구분**: 10K–100K
- **task_categories**: reinforcement-learning, text-generation
- **최근 릴리스**: 2026-06-03 — 데이터 행정 검토를 마친 공개분 전체

## 2. 주요 기여 (Key Contributions)

데이터셋 카드는 논문이 안 다루는 배포 공학과 운영 주의사항을 담는다.

1. 배포가 2층이다. `data/tasks.parquet`은 Dataset Viewer로 빠르게 훑고 프로그램으로 필터링하기 위한 메타데이터 테이블이고 `artifacts/cua_gym_tasks_v1.tar.zst`는 원본 실행 번들을 담은 압축 아카이브다. 수만 개 잔파일이 Hub 저장소에 흩어지는 걸 피하면서 Viewer는 깨끗한 표 하나만 보게 하는 절충이다.
2. 공개된 task 테이블 스키마는 `id`·`instruction`·`app_type`·`app_family`·`platform`·`difficulty`·`setup_kind`·`num_setup_steps`·`num_setup_files`·`has_ground_truth`와 아카이브 내부 경로를 가리키는 `archive_member`·`task_json_member`·`reward_member`·`setup_file_members`로 구성된다. 이 필드들만으로 원본 번들을 되짚어 갈 수 있다.

웹 task의 setup·reward에는 mock 엔드포인트가 `__CUA_GYM_GMAIL_URL__` 형태로 들어 있다. 자체 배포가 전제다. 릴리스가 띄워둔 `xlang.ai` 엔드포인트는 참조와 스모크 테스트용이지 의존 대상이 아니라고 카드가 반복해 경고한다.

벤치마크는 아니다. 실행 환경·action 인터페이스·observation 포맷·reward 호출 규약을 사용자가 표준화하지 않는 한 이 데이터셋 자체를 리더보드로 쓰지 말라고 명시한다.

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

아카이브 안은 task 하나당 디렉토리 하나다. `task.json`, `reward.py`, 그리고 `initial_setup.{py,sh,xlsx,docx,pptx}` 중 하나가 들어간다.

### 3.2 사용 흐름

메타데이터만 볼 때는 `datasets`로 충분하다.

```python
from datasets import load_dataset
tasks = load_dataset("xlangai/CUA-Gym", "tasks", split="train")
print(tasks[0]["instruction"])
```

실행하려면 아카이브를 따로 받아 푼다. 엔드포인트를 자기 배포 URL로 치환한 뒤, `task.json`의 `config`를 적용하고 에이전트를 돌린 다음 `reward.py`로 채점한다. 카드가 제시하는 순서는 네 단계다 — `task.json` 읽기 → `config` 적용 → `instruction`을 에이전트에 전달 → 최종 환경에서 `reward.py` 실행.

### 3.3 현재 릴리스 통계

| 항목 | 값 |
|---|---:|
| task 수 | 10,910 |
| 원본 task 파일 수 | 32,730 |
| 압축 해제 크기 | 약 294MB |
| `app_type` 종류 | 327 |
| 난이도 라벨 있음 | 7,365 |
| 난이도 라벨 없음 | 3,545 |

가장 큰 앱 카테고리는 `libreoffice_calc`·`libreoffice_writer`·`libreoffice_impress`·`multi_apps`·`vscode`·`pdf`다. mock 웹 쪽에서는 `instagram_mock`·`hubspot_mock`·`google_docs_mock`·`outlook_web_mock`·`google_sheets_mock`이 뒤를 잇는다.

논문이 보고한 32,112개 검증 튜플과 여기 10,910 task는 서로 다른 수다. 카드에는 "필요한 데이터 검토를 마친 공개분 전체"라고만 적혀 있다. 저장소 README 쪽은 "남은 데이터는 행정 검토 중"이라고 밝힌다. `app_type` 종류가 327개인 것도 논문의 환경 110개보다 훨씬 많은데 카드가 `app_type`을 앱·환경 라벨로 정의하고 `app_family`로 따로 묶는 걸 보면 두 수의 세는 단위가 다르다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

데이터셋 카드에는 모델 성적이 없다. 성적은 논문 source를 본다. 카드가 밝히는 의도된 용도로는 computer-use agent·GUI 에이전트 연구, RLVR과 프로그램 reward 설계, 합성 task 생성, 실행 가능한 데스크톱·웹 평가, 후처리 학습 데이터 필터링과 스케일링 연구를 든다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

카드에 적힌 한계다.

- reward가 재는 것은 최종 환경 상태이지 거기 도달한 과정이 아니다.
- 일부 task에 난이도 라벨이 없다(3,545개).
- mock 웹 task는 인증, 네트워크 지연, rate limit, 서드파티 연동, 프로덕션 오류 상태 같은 실제 동작을 빠뜨린다.
- setup 산출물이 `.py`·`.sh`·`.xlsx`·`.docx`·`.pptx`로 섞여 있어 실행기 쪽에 앱별 지원이 필요하다.

여기에 안전 주의가 별도 절로 붙는다. 아카이브에는 파일을 만들고 로컬 상태를 바꾸고 앱을 여는 Python·셸 스크립트가 들어있으니 신뢰할 수 없는 실행 산출물로 다뤄야 한다. 일회용 VM이나 컨테이너에서 돌리고 개인 워크스테이션에서는 실행하지 말고 개인 파일·자격증명·클라우드 토큰·프로덕션 서비스 접근을 차단하라고 권한다. 일부 task 상태에 합성 자격증명·비밀번호·API 키·토큰이 들어있는데 이는 평가용 mock 데이터일 뿐 실제 비밀이 아니라고 덧붙인다.

## 6. 관련 연구 (Related Work)

카드는 논문과 `xlang-ai/CUA-Gym` 저장소를 가리키고 별도의 선행 연구 서술은 두지 않는다.

## 7. 용어집 (Glossary)

논문 source의 용어집을 공유한다. 카드에만 나오는 필드를 여기 정리한다.

| 용어 | 뜻 |
|---|---|
| `app_type` | `libreoffice_calc`·`vscode`·`instagram_mock`·`multi_apps` 같은 앱·환경 라벨. 327종 |
| `app_family` | `app_type`에서 유도한 거친 분류 — `desktop_office`·`desktop`·`mock_web`·`multi_apps`·`other` |
| `setup_kind` | 초기 setup 산출물의 종류 — `py`·`sh`·`xlsx`·`docx`·`pptx` |
| `archive_member` | tar 아카이브 안의 task 디렉토리 경로 |
| Dataset Viewer | Hugging Face가 parquet 테이블을 브라우저에서 훑게 해주는 기능 |
