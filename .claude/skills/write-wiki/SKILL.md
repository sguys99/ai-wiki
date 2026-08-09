---
name: write-wiki
version: "1.0.0"
description: sources/·wiki/ 한글 페이지를 작성하는 스킬 (CLAUDE.md Step 3 ~ Step 4). 트리거 — "sources 작성해줘", "wiki 페이지 만들어줘", "Step 3 진행", "요약 작성해줘", "wiki에 정리해줘", "이 자료 위키로", "wiki 갱신해줘". 도메인 용어집을 로드해 전문 용어를 원어로 유지하고 첫 등장 시 서술형 한글 풀이를 단다. 수집(Step 1~2.5)은 해당 없음 — ingest-paper / ingest-article 을 쓸 것.
---

# Write Wiki — sources/ · wiki/ 작성

CLAUDE.md 6-step 중 **Step 3(sources 작성) → Step 3.5(사용자 confirm) → Step 4(wiki 작성 + assets cp + index.md 갱신)** 를 담당한다. frontmatter 스키마·본문 헤딩 구조·figure 절차는 CLAUDE.md 해당 절이 정본이고, 이 문서는 **용어 표기 규칙과 작성 순서**만 다룬다.

## 담당 범위

```
Step 1~2.5  raw/ 수집·추출               ← ingest-paper / ingest-article
──────────────────────────────────────
Step 3      sources/{stem}.md            ← 여기
Step 3.5    사용자 confirm → curated: true ← 여기
Step 4      wiki/{category}/{stem}.md + wiki/assets/ + index.md ← 여기
```

git commit은 하지 않는다 (사용자가 지시할 때만).

## 0. 용어집 선(先)로드 — 작성 전 필수

초안을 쓰기 전에 자료의 category에 맞는 도메인 용어집을 Read로 읽는다.

| category | 로드할 용어집 |
|---|---|
| `physical-ai` | `wiki/overviews/glossary-physical-ai.md` + `glossary-llms.md` |
| `agents` · `applications` | `wiki/overviews/glossary-agents.md` + `glossary-llms.md` |
| `llms` · `database` · `evaluations` | `wiki/overviews/glossary-llms.md` (+ 에이전트 논의 시 `glossary-agents.md`) |
| `overviews` · `etc` | 다루는 도메인의 용어집 전부 |

## 1. 전문 용어 표기 규칙

- **용어집 canonical만 사용한다.** 금지 표기 열의 표기는 쓰지 않는다.
- **원어에 조사를 직결한다**: "policy가 observation을 받아", "reward를 최대화한다", "world model이 예측한".
- **첫 등장 풀이**: 문서(sources와 wiki 각각)당 핵심 용어 1회, 괄호 병기 없이 서술형 한 문장. 문서당 3~6개 용어면 충분하다 — 모든 용어에 풀이를 달면 오히려 읽기 힘들다.

  좋은 예 (WikiDocs RT-1 해설 스타일을 wiki 평서체로 옮긴 것):
  - "policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. RT-1은 이 policy를 Transformer로 구현한다."
  - "control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다. RT-1은 3Hz로 동작한다."
  - "behavioral cloning은 시연의 observation→action 쌍을 지도학습으로 흉내 내는 방법이다."
  - "co-fine-tuning은 로봇 데이터만이 아니라 웹 VQA 데이터를 배치에 계속 섞는 레시피다."

  나쁜 예: "정책(policy)은 관측(observation)을 받아…" — 괄호 병기 + 직역. 이 스타일을 쓰지 않는다.
- **자명한 것은 풀이 생략**: 널리 알려진 약어(GPU·API·PDF)와 고유명사(Transformer·EfficientNet·Isaac Lab)는 풀이 없이 그대로.
- **산문 문체**는 CLAUDE.md의 "wiki 산문 문체 가이드"를 따른다 (재서술하지 않음 — 그쪽이 정본).

## 2. sources "## 7. 용어집" 섹션과의 역할 분담

파일별 `## 7. 용어집 (Glossary)` 섹션에는 **그 자료 고유의 용어**(모델명·기법명·자료 내 신조어)만 담는다. 도메인 공통 용어(policy·reward·pre-training 등)는 도메인 용어집으로 위임하고 다시 정의하지 않는다. 표기는 반드시 도메인 용어집과 일치시킨다.

## 3. 신규 용어 성장 루프

용어집에 없는 전문 용어를 만나면:

1. 본문에는 **원어 + 첫 등장 풀이**로 즉시 작성한다 (막히지 않는다).
2. Step 3.5 confirm 시점에 figure 큐레이션과 함께 "용어집 추가 후보: X, Y — 제안 표기"를 보고한다.
3. 사용자가 승인하면 해당 `glossary-*.md`의 용어 표에 행을 추가하고 같은 커밋에 포함한다.

## 4. 작성 후 검증

sources·wiki 파일을 저장할 때마다 lint를 돌려 경고 0을 확인한다.

```bash
python3 scripts/lint_terms.py sources/{stem}.md wiki/{category}/{stem}.md
```

경고가 나오면 canonical 표기로 고친 뒤 재실행한다. 인용문 등 의도적 예외는 해당 줄에 `<!-- lint-terms: ignore -->` 주석을 달고 사유를 남긴다.
