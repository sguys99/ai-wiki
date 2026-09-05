---
name: write-wiki
version: "2.1.0"
description: sources/·wiki/ 한글 페이지를 작성하는 스킬 (CLAUDE.md Step 3 ~ Step 4). 트리거 — "sources 작성해줘", "wiki 페이지 만들어줘", "Step 3 진행", "요약 작성해줘", "wiki에 정리해줘", "이 자료 위키로", "wiki 갱신해줘". 도메인 용어집을 로드해 전문 용어를 원어로 유지하고, wiki는 교재식으로 재구성한다 (압축 금지, 표와 불릿 적극 사용). 수집(Step 1~2.5)은 해당 없음 — ingest-paper / ingest-article 을 쓸 것.
---

# Write Wiki — sources/ · wiki/ 작성

CLAUDE.md 6-step 중 **Step 3(sources 작성) → Step 3.5(사용자 confirm) → Step 4(wiki 작성 + assets cp + index.md 갱신)** 를 담당한다. frontmatter 스키마, 본문 골격, 문체 규칙은 CLAUDE.md 해당 절("wiki 교재 문체 가이드" 포함)이 정본이고, 이 문서는 **작업 순서, 용어 표기 규칙, 작성 체크리스트**를 다룬다.

## 담당 범위

```
Step 1~2.5  raw/ 수집·추출               ← ingest-paper / ingest-article
──────────────────────────────────────
Step 3      sources/{stem}.md            ← 여기
Step 3.5    사용자 confirm → curated: true ← 여기
Step 4      wiki/{category}/{stem}.md + wiki/assets/ + index.md ← 여기
```

git commit은 하지 않는다 (사용자가 지시할 때만). humanize 자동 윤문도 하지 않는다 (wiki/·sources/는 자동 윤문 제외 대상 — 이 스킬의 가이드 준수 + lint가 품질을 담당한다).

## 0. 용어집 선(先)로드 — 작성 전 필수

초안을 쓰기 전에 자료의 category에 맞는 도메인 용어집을 Read로 읽는다.

| category | 로드할 용어집 |
|---|---|
| `physical-ai` | `wiki/overviews/glossary-physical-ai.md` + `glossary-llms.md` |
| `agents` · `applications` | `wiki/overviews/glossary-agents.md` + `glossary-llms.md` |
| `llms` · `database` · `evaluations` | `wiki/overviews/glossary-llms.md` (+ 에이전트 논의 시 `glossary-agents.md`) |
| `overviews` · `etc` | 다루는 도메인의 용어집 전부 |

## 1. 전문 용어 표기 규칙

- **용어집 canonical만 사용한다.** 금지 표기 열의 표기는 쓰지 않고, 문서 전체에서 하나의 표기만 쓴다. 같은 문서에서 원어와 번역어를 섞지 않는다.
- **원어에 조사를 직결한다**: "policy가 observation을 받아", "reward를 최대화한다", "world model이 예측한".
- **번역어 canonical은 첫 등장 시 원어 병기**: 용어집이 개념 번역어로 지정한 용어(시연 데이터, 지시문 등)는 첫 등장에서 "시연 데이터(demonstration)"처럼 원어를 괄호 병기하고 이후에는 한 표기만 쓴다.
- **반쪽 번역 금지**: "raw 점"처럼 용어의 절반만 번역하지 않는다. "raw point"로 쓰거나 완전한 번역어를 쓴다.
- **영어 용어 밀도 관리**: 한 문장에 영어 용어가 4개 이상이면 문장을 나누거나 번역어로 바꾼다.
- **첫 등장 풀이**: 원어 canonical 용어는 문서(sources와 wiki 각각)당 핵심 용어 1회, 괄호 병기 없이 서술형 한 문장. 문서당 3~6개 용어면 충분하다. 모든 용어에 풀이를 달면 오히려 읽기 힘들다.

  좋은 예 (WikiDocs RT-1 해설 스타일을 wiki 평서체로 옮긴 것):
  - "policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. RT-1은 이 policy를 Transformer로 구현한다."
  - "control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다. RT-1은 3Hz로 동작한다."
  - "behavioral cloning은 시연의 observation→action 쌍을 지도학습으로 흉내 내는 방법이다."
  - "co-fine-tuning은 로봇 데이터만이 아니라 웹 VQA 데이터를 배치에 계속 섞는 레시피다."

  나쁜 예: "정책(policy)은 관측(observation)을 받아…" — 괄호 병기 + 직역. 이 스타일을 쓰지 않는다.
- **자명한 것은 풀이 생략**: 널리 알려진 약어(GPU, API, PDF)와 고유명사(Transformer, EfficientNet, Isaac Lab)는 풀이 없이 그대로.
- **산문 문체와 본문 골격**은 CLAUDE.md의 "wiki 교재 문체 가이드"와 Step 4 템플릿을 따른다 (재서술하지 않음 — 그쪽이 정본). 핵심만 상기: 하다체 기술문서체, 두괄식 문단, 자문자답과 화자 개입 금지, 극적 동사와 어휘 치환표 준수, 중간점(`·`)과 em dash(`—`) 금지, 한글 단독 명사형 헤딩, 열거는 불릿과 표로, 큰 수는 한국식 단위와 단위 표기.

## 2. Step 4 wiki 작성 방법 — 압축이 아니라 교재식 재구성

wiki 페이지는 sources를 줄여 쓰는 단계가 **아니다**. 독자가 원문 없이 이 페이지만 읽어도 핵심을 이해하도록 sources와 raw를 바탕으로 다시 설명하는 단계다.

작업 순서:

1. `sources/{stem}.md` 전체를 읽는다.
2. `raw/{type}/{stem}.*`을 읽어 sources에서 빠진 세부(수치, 예시, 비유, 전개 순서)를 확보한다. 원문이 한국어 해설이면 그 전개 구조 자체를 살린다.
3. CLAUDE.md Step 4의 교재식 골격(요약 → 배경 → 핵심 개념 → 방법 → 결과 → 한계 → 핵심 용어 → 관련 페이지)으로 재구성한다.
4. curated figure를 관련 절에 배치하고 캡션을 단다.
5. 분량을 확인한다: wiki 본문이 sources 본문보다 짧으면 어딘가에서 정보를 잃은 것이다.

### before / after 예시 (실제 교정 전후)

**예시 1 — 압축 줄글을 교재식 풀이로.** 결론을 먼저 서술하고 구성을 구체적으로 나열한다. 질문형 도입("그렇다면 ~일까?")은 쓰지 않는다.

before (압축 줄글):

> 로봇의 action도 하나의 명령이 아니라 arm 7차원·base 3차원·mode 1차원이 묶인 복합 신호다.

after (교재식 기술문서체):

> RT-1의 action은 하나의 클래스 레이블이 아니라 11차원 복합 제어 신호다. arm movement 7차원(x, y, z, roll, pitch, yaw, gripper), base movement 3차원(x, y, yaw), 그리고 arm 제어, base 제어, episode 종료를 고르는 mode 1차원으로 구성된다. 즉 팔, 바퀴, 그리퍼, 종료 여부를 함께 담은 신호다.

**예시 2 — 화자 개입과 구어 동사 제거.**

before (칼럼체):

> 한 줄로 말하면, LiDAR와 IMU를 tightly-coupled iterated extended Kalman filter로 융합해 빠른 움직임과 어수선한 환경에서도 버티는 odometry 패키지다.

after (기술문서체):

> FAST-LIO는 LiDAR와 IMU 데이터를 tightly-coupled iterated extended Kalman filter로 융합하는 odometry 패키지로, 빠른 움직임이나 복잡한 환경에서도 안정적으로 동작한다.

**예시 3 — 수치 서술.** 단위를 생략하지 않고, "차선" 같은 어휘를 쓰지 않으며, 항목이라는 표현을 쓴다.

before:

> seen 97%는 BC-Z보다 25%p, Gato보다 32%p 높다. unseen 76%(차선 대비 +24%p)로 네 축 모두 앞선다.

after:

> RT-1은 seen 과제에서 97%의 성공률을 기록해 BC-Z보다 25%p, Gato보다 32%p 높았다. unseen(76%) 항목에서도 두 번째로 높은 모델을 24%p 앞서, 모든 평가 항목에서 가장 높았다.

## 3. sources "## 7. 용어집" 섹션과의 역할 분담

파일별 `## 7. 용어집 (Glossary)` 섹션에는 **그 자료 고유의 용어**(모델명, 기법명, 자료 내 신조어)만 담는다. 도메인 공통 용어(policy, reward, pre-training 등)는 도메인 용어집으로 위임하고 다시 정의하지 않는다. 표기는 반드시 도메인 용어집과 일치시킨다.

wiki 페이지의 `## 핵심 용어` 표는 sources 용어집에서 이해에 꼭 필요한 3~6개를 골라 옮긴다. 이 표가 없으면 독자가 sources를 열어봐야 하므로 생략하지 않는다 (용어가 정말 없는 자료만 예외).

## 4. 신규 용어 성장 루프

용어집에 없는 전문 용어를 만나면:

1. 본문에는 **원어 + 첫 등장 풀이**로 즉시 작성한다 (막히지 않는다).
2. Step 3.5 confirm 시점에 figure 큐레이션과 함께 "용어집 추가 후보: X, Y — 제안 표기"를 보고한다.
3. 사용자가 승인하면 해당 `glossary-*.md`의 용어 표에 행을 추가하고 같은 커밋에 포함한다.

## 5. 작성 후 검증 (체크리스트 + lint)

저장 전에 스스로 점검한다:

- [ ] 중간점(`·`) 0개, em dash(`—`) 0개
- [ ] "왜 ~일까?" 자문자답 패턴이 없는가
- [ ] 화자 개입 표현("한 줄로 말하면", "표에서 읽을 수 있는 것은", "정리하면" 등)이 없는가
- [ ] 극적 동사(무너지다, 버티다, 얹다, 끼우다 등)와 금지 어휘(판, 축, 벌, 갈래, 기둥, 돌다, 이쪽, 차선, 실+명사 조어)가 없는가
- [ ] 용어집과 다른 표기나 원어/번역어 혼용(demonstration/시연 데이터 등)이 없는가, 번역어 첫 등장에 원어 병기가 있는가
- [ ] 각 문단의 첫 문장이 문단 주제를 담는가 (두괄식)
- [ ] 큰 수는 한국식 단위(13만 개)인가, 수치에 단위가 붙어 있는가, %와 %p를 구분했는가
- [ ] 헤딩이 한글 단독 명사형인가 (영문 병기 없음, wiki 본문 기준)
- [ ] 항목 3개 이상 열거가 문장에 묻혀 있지 않은가 (불릿이나 표로 꺼냈는가)
- [ ] 논문, survey 기반이면 표가 1개 이상 있는가
- [ ] `## 핵심 용어` 표가 있는가
- [ ] wiki 본문이 sources 본문보다 짧지 않은가
- [ ] wiki frontmatter의 `figures:`에 curated 항목만 있는가

sources·wiki 파일을 저장할 때마다 lint를 돌려 경고 0을 확인한다.

```bash
.venv/bin/python scripts/lint_terms.py sources/{stem}.md wiki/{category}/{stem}.md
.venv/bin/python scripts/lint_style.py sources/{stem}.md wiki/{category}/{stem}.md
```

경고가 나오면 고친 뒤 재실행한다. 인용문 등 의도적 예외는 해당 줄에 `<!-- lint-terms: ignore -->` 주석을 달고 사유를 남긴다 (lint_style도 같은 주석 형식 `<!-- lint-style: ignore -->`를 지원한다).
