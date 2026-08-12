---
title: "CUA-Gym Dataset (xlangai/CUA-Gym)"
type: repo
year: 2026
category: agents
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/repos/xlangai-cua-gym-dataset.md
raw_filename: "xlangai-cua-gym-dataset.md"
source_collection: external
source: xlangai-cua-gym-dataset.md
org: "xlangai"
repo: "CUA-Gym (Hugging Face dataset)"
url: "https://huggingface.co/datasets/xlangai/CUA-Gym"
license: "CC BY 4.0"
tags: [computer-use-agents, gui-agents, rlvr, verifiable-rewards, robot-dataset, synthetic-data, huggingface, osworld, webarena]
---

## 요약 (Summary)

[[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]]가 만든 RLVR task 묶음의 Hugging Face 배포판(CC BY 4.0). 논문이 다루지 않는 배포 공학과 운영 주의사항이 데이터셋 카드에 담겨 있다.

지금 받을 수 있는 분량은 10,910 task로 논문이 보고한 32,112개와 차이가 크다. 카드는 "필요한 데이터 검토를 마친 공개분 전체"라 하고 저장소 README는 "남은 데이터는 행정 검토 중"이라 밝힌다. 카드는 이 데이터셋을 벤치마크로 쓰지 말라고도 못박는다 — 실행 환경·action 인터페이스·observation 포맷·reward 호출 규약을 사용자가 표준화하지 않는 한 리더보드로 삼을 수 없다.

## 배포 구조 (Layout)

parquet 메타데이터와 실행 번들을 분리한 2층 구조다. 수만 개 잔파일이 Hub 저장소에 흩어지는 걸 피하면서 Dataset Viewer는 깨끗한 표 하나만 보게 하려고 이렇게 절충했다.

```text
README.md
stats.json
url_variables.json
data/tasks.parquet                      # Viewer·필터링용 메타데이터
artifacts/cua_gym_tasks_v1.tar.zst      # 실행 가능한 원본 번들
scripts/materialize_dataset_urls.py
```

아카이브 안은 task 하나당 디렉토리 하나로, `task.json`·`reward.py`·`initial_setup.{py,sh,xlsx,docx,pptx}` 중 하나가 들어간다.

## task 테이블 스키마

`id`·`instruction`·`app_type`·`app_family`·`platform`·`difficulty`·`setup_kind`·`num_setup_steps`·`num_setup_files`·`has_ground_truth`에 더해, 아카이브 내부 경로를 가리키는 `archive_member`·`task_json_member`·`reward_member`·`setup_file_members`가 있다. 이 필드들만으로 원본 번들을 되짚어 갈 수 있다.

메타데이터만 볼 때는 `datasets`로 충분하다.

```python
from datasets import load_dataset
tasks = load_dataset("xlangai/CUA-Gym", "tasks", split="train")
print(tasks[0]["instruction"])
```

실제로 실행하려면 아카이브를 따로 받아 풀고 엔드포인트를 자기 배포 URL로 치환한 뒤, `task.json`의 `config`를 적용하고 에이전트를 돌린 다음 `reward.py`로 채점한다.

## 릴리스 통계 (Statistics)

| 항목 | 값 |
|---|---:|
| task 수 | 10,910 |
| 원본 task 파일 수 | 32,730 |
| 압축 해제 크기 | 약 294MB |
| `app_type` 종류 | 327 |
| 난이도 라벨 있음 | 7,365 |
| 난이도 라벨 없음 | 3,545 |

가장 큰 앱 카테고리는 `libreoffice_calc`·`libreoffice_writer`·`libreoffice_impress`·`multi_apps`·`vscode`·`pdf`이고 mock 웹 쪽에서는 `instagram_mock`·`hubspot_mock`·`google_docs_mock`·`outlook_web_mock`·`google_sheets_mock`이 뒤를 잇는다.

`app_type` 327종은 논문의 환경 110개보다 훨씬 많은 수인데 카드에서 `app_type`은 앱·환경 라벨이고 묶음은 `app_family`가 따로 맡으니 두 수의 세는 단위가 다르다.

## 실행 안전 (Safety Notes)

아카이브에는 Python·셸 스크립트가 들어있다. 파일을 만들고 로컬 상태를 바꾸고 앱을 여니 신뢰할 수 없는 실행 산출물로 다뤄야 한다고 카드가 별도 절로 경고한다.

- 일회용 VM이나 컨테이너에서 돌린다.
- 개인 워크스테이션에서 setup 스크립트를 실행하지 않는다.
- 개인 파일·자격증명·클라우드 토큰·프로덕션 서비스 접근을 차단한다.
- 새 환경에서 실행하기 전에 스크립트를 검토한다.

일부 task 상태에 합성 자격증명·비밀번호·API 키·토큰이 들어있는데 평가용 mock 데이터일 뿐 실제 비밀이 아니라고 명시한다.

## 한계 (Limitations)

한계는 카드가 스스로 꼽는다. reward가 재는 것은 최종 환경 상태이고 거기 도달한 과정은 재지 않는다.

- 3,545개 task에 난이도 라벨이 없다.
- mock 웹 task는 인증, 네트워크 지연, rate limit, 서드파티 연동, 프로덕션 오류 상태 같은 실제 동작을 빠뜨린다.
- setup 산출물이 `.py`·`.sh`·`.xlsx`·`.docx`·`.pptx`로 섞여 있어 실행기 쪽에 앱별 지원이 필요하다.

## 관련 페이지 (Related Pages)

- [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]] — 원 논문. 32,112개 튜플의 합성 방법과 학습 결과
- [[agents/xlang-ai-cua-gym]] — 코드 저장소. 자체 배포와 placeholder를 실제 URL로 채우는 절차
