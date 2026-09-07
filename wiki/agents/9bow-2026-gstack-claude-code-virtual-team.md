---
title: "gstack: Y Combinator 대표 Garry Tan이 공개한, Claude Code로 20인 규모의 가상 엔지니어링 팀을 만드는 스킬 모음"
type: article
year: 2026
category: agents
source: 9bow-2026-gstack-claude-code-virtual-team.md
raw_path: raw/articles/9bow-2026-gstack-claude-code-virtual-team.md
raw_filename: "9bow-2026-gstack-claude-code-virtual-team.md"
source_collection: external
author: "9bow (박정환)"
url: "https://discuss.pytorch.kr/t/gstack-y-combinator-garry-tan-claude-code-20/9434"
publisher: "PyTorch KR (discuss.pytorch.kr)"
tags: [gstack, claude-code, slash-commands, agentic-workflow, garry-tan, command-catalog]
---

# gstack 명령어 카탈로그: Claude Code로 만드는 가상 엔지니어링 팀

## 요약

이 글은 PyTorch KR 커뮤니티의 9bow(박정환)가 Garry Tan의 gstack을 한국어로 정리한 소개 글이다. gstack은 Y Combinator 대표가 공개한 오픈소스 소프트웨어 팩토리로, 글은 이를 "Claude Code를 사용하는 개발자가 20인 팀처럼 출시할 수 있도록" 설계된 28가지 슬래시 명령어 모음으로 소개한다.

글의 중심은 명령어 카탈로그다. `Think → Plan → Build → Review → Test → Ship → Reflect`라는 스프린트 사이클을 절 제목으로 걸고, 그 아래 명령어를 5개 그룹으로 묶어 각각에 영문 역할 라벨과 한 줄 기능을 붙인다. 여기에 설치 명령 3종, 권장 실행 순서, 텔레메트리 수집 범위, 라이선스까지 덧붙여 한 화면에서 도구 전체를 훑을 수 있게 했다.

읽는 목적을 기준으로 보면, 이 글은 gstack의 내부 구현을 파고드는 자료가 아니라 어떤 명령어가 있고 무엇을 하는지 빠르게 확인하는 색인에 가깝다. 저장소 원문 정리는 [[agents/garrytan-gstack]]이, 브라우저 데몬 같은 내부 동작은 [[agents/gpters-2026-yc-ai-agent-guide-gstack]]이 맡는다.

## 배경

### 하나의 모드로만 응답하는 어시스턴트

gstack이 겨냥하는 문제는 모델의 코딩 실력이 아니라 작업 절차의 부재다. Claude Code 같은 코딩 에이전트는 무엇을 요청하든 같은 태도로 응답한다. 코드를 부탁하면 곧바로 작성에 들어갈 뿐, 이 기능을 만드는 것이 맞는지 먼저 되묻지 않는다.

실제 조직에서는 이 판단이 여러 사람에게 나뉘어 있다. 방향은 CEO가 정하고, 설계는 엔지니어링 매니저가 잠그고, 리뷰는 시니어 엔지니어가 하고, 검증은 QA가 맡는다. 혼자 쓰는 에이전트에는 이 분업이 없다.

gstack은 그 분업을 슬래시 명령어 단위로 되살린다. 글이 첫머리에서 열거하는 역할은 CEO, 디자이너, 엔지니어링 매니저, QA 리드, 보안 담당자, 릴리즈 엔지니어다. 명령어 하나를 부르면 그 역할의 관점으로 AI가 작업을 수행한다는 구성이다.

### 한국어 자료로서의 위치

이 글은 2026년 3월 29일 PyTorch KR의 "읽을거리&정보공유" 게시판에 올라왔다. 저장소 README를 그대로 번역하는 대신, 명령어를 기능별로 재배열하고 설치 절차를 함께 묶어 카탈로그 형태로 다시 정리했다는 점이 특징이다.

같은 도구를 다룬 한국어 자료 가운데 이 글은 명령어 목록의 폭을 담당한다. 저장소 문서가 대표 명령어만 예시로 드는 데 비해, 이 글은 안전장치와 유틸 계열까지 이름을 붙여 나열한다.

## 핵심 개념

**소프트웨어 팩토리**는 반복 가능한 파이프라인으로 소프트웨어를 생산하는 체계를 뜻한다. 글은 gstack을 오픈소스 소프트웨어 팩토리로 소개하는데, 판매하는 것이 코드 생성 능력이 아니라 생산 절차라는 의미다.

**슬래시 명령어**는 Claude Code에서 `/이름` 형태로 특정 역할이나 작업을 호출하는 단위다. gstack에서는 명령어 하나가 곧 전문가 한 명에 대응하므로, 명령어를 고르는 행위가 곧 어떤 관점으로 검토받을지를 고르는 행위가 된다.

**역할 라벨**은 글이 각 명령어 옆 괄호에 붙인 영문 직함이다. `/cso`에는 Chief Security Officer가, `/review`에는 Staff Engineer가 붙는다. 명령어 이름만으로는 알기 어려운 호출 대상을 라벨이 한눈에 알려준다.

**스프린트 사이클**은 `Think → Plan → Build → Review → Test → Ship → Reflect` 7단계다. 생각하고, 계획하고, 만들고, 리뷰하고, 테스트하고, 출시하고, 회고하는 순서를 뜻하며, gstack의 명령어는 이 사이클 위의 어느 지점을 맡는지로 정체성이 정해진다.

## 방법

### 7단계 사이클과 5개 명령어 그룹

글은 7단계 사이클을 절 제목으로 내걸지만, 실제 하위 절은 5개다. 인접한 단계를 묶어 다음처럼 배치한다.

| 글의 그룹 | 대응 단계 | 명령어 수 | 담당 범위 |
|---|---|---|---|
| 제품 기획 및 설계 | Think, Plan | 5 | 무엇을 왜 만들지 정하고 설계를 잠근다 |
| 코드 구현 및 리뷰 | Build, Review | 3 | 작성한 코드의 결함과 시각 요소를 점검한다 |
| QA 및 테스트 | Test | 4 | 실제 브라우저로 동작을 확인한다 |
| 배포, 보안, 문서화 | Ship | 3 | 출시하고 감사하고 문서를 맞춘다 |
| 안전장치와 유틸 | Reflect 및 공통 | 7 | 회고, 교차 검증, 사고 예방을 담당한다 |

Reflect 단계에 해당하는 `/retro`가 안전장치 그룹에 함께 들어가 있어, 그룹 구분은 사이클 단계와 정확히 1대 1로 맞지 않는다. 그룹 이름을 사이클 단계가 아니라 실무 작업 종류로 붙였기 때문이다.

### 기획과 설계 명령어

코딩에 들어가기 전 단계가 가장 두껍다. 다섯 명령어 모두 코드를 만들지 않고 결정을 만든다.

| 명령어 | 역할 라벨 | 기능 |
|---|---|---|
| `/office-hours` | YC Office Hours | 6가지 질문으로 제품 기획을 재구성하고 가설을 검증한다 |
| `/plan-ceo-review` | CEO/Founder | 사용자 입장에서 10성급 제품 방향을 탐색한다 |
| `/plan-eng-review` | Eng Manager | 아키텍처와 데이터 흐름과 다이어그램을 확정한다 |
| `/plan-design-review` | Senior Designer | 각 항목을 0~10점으로 채점해 디자인을 평가한다 |
| `/design-consultation` | Design Partner | 완전한 디자인 시스템을 구축한다 |

`/office-hours`의 이름은 Y Combinator가 창업팀을 면담하는 자리에서 왔다. 질문 6가지로 기획을 심문한다는 설정이라, 만들기 전에 만들 이유부터 확인시키는 관문 역할을 한다.

`/plan-design-review`는 평가를 점수로 환산한다는 점에서 나머지와 성격이 다르다. 0에서 10 사이의 숫자를 각 항목에 부여하므로, 리뷰 결과가 감상이 아니라 비교 가능한 값으로 남는다.

### 구현과 리뷰 명령어

이 그룹은 이미 작성된 코드와 화면을 대상으로 한다.

| 명령어 | 역할 라벨 | 기능 |
|---|---|---|
| `/review` | Staff Engineer | CI는 통과했지만 프로덕션에서 발생할 미묘한 버그를 찾는다 |
| `/investigate` | Debugger | "조사 없이 수정 없다" 철칙에 따라 근본 원인을 디버깅한다 |
| `/design-review` | Designer Who Codes | 라이브 사이트의 시각 요소를 감사하고 수정한다 |

`/review`가 잡으려는 대상을 글은 명확히 한정한다. 테스트가 이미 걸러낸 오류가 아니라, CI를 통과한 뒤 운영 환경에서 나타나는 결함이다. 자동 검사와 사람 리뷰가 겹치지 않는 구간을 노린다는 뜻이다.

`/investigate`의 "조사 없이 수정 없다"는 원인 파악 없이 증상만 고치는 습관을 막기 위한 규칙이다. 에이전트가 곧바로 코드를 고치려는 성향을 절차로 붙잡아 두는 장치라고 볼 수 있다.

`/design-review`는 이름이 비슷한 `/plan-design-review`와 대상 시점이 다르다. `/plan-design-review`가 계획 단계의 디자인 안을 채점한다면, `/design-review`는 이미 배포된 라이브 사이트를 본다.

### 테스트와 브라우저 명령어

네 명령어가 실제 브라우저를 통한 검증을 담당한다.

| 명령어 | 역할 라벨 | 기능 |
|---|---|---|
| `/qa` | QA Lead | 앱을 직접 테스트하며 버그를 찾고 수정한다 |
| `/qa-only` | QA Reporter | 수정하지 않고 버그 리포트만 생성한다 |
| `/browse` | QA Engineer | 실제 Chromium 브라우저로 동작을 확인한다 |
| `/setup-browser-cookies` | Session Manager | 실제 브라우저의 쿠키를 headless 세션으로 옮긴다 |

`/qa`와 `/qa-only`가 나뉘어 있는 이유는 수정 권한의 유무다. 발견과 수정을 한 번에 맡기고 싶을 때는 `/qa`를, 사람이 판단할 목록만 받고 싶을 때는 `/qa-only`를 쓴다.

`/setup-browser-cookies`는 로그인이 필요한 화면을 검증하기 위한 준비 명령이다. headless는 화면 표시 없이 브라우저를 구동하는 방식을 뜻하는데, 이 상태에서는 사람이 직접 로그인할 수 없다. 그래서 평소 쓰는 브라우저에 이미 저장된 쿠키를 가져와 인증된 상태를 그대로 재현한다.

### 배포, 보안, 문서화 명령어

출시 시점에 붙는 세 명령어다.

| 명령어 | 역할 라벨 | 기능 |
|---|---|---|
| `/ship` | Release Engineer | main을 동기화하고 테스트를 실행한 뒤 PR을 연다 |
| `/cso` | Chief Security Officer | OWASP Top 10과 STRIDE 위협 모델링을 근거로 보안을 감사한다 |
| `/document-release` | Technical Writer | 배포한 기능에 맞춰 문서를 갱신한다 |

`/ship`은 여러 단계를 한 명령으로 잇는다. main 브랜치 동기화, 테스트 실행, PR 생성이 순서대로 이어지므로, 출시 직전에 빠뜨리기 쉬운 절차가 자동으로 채워진다.

`/cso`가 근거로 삼는 두 기준은 성격이 다르다. OWASP Top 10이 웹 애플리케이션에서 자주 나타나는 위험 유형의 목록이라면, STRIDE는 위협을 여섯 범주로 분류해 빠짐없이 훑게 하는 절차다. [[agents/garrytan-gstack]] 용어집이 정리한 대로 STRIDE는 Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege를 가리킨다. 목록과 분류 체계를 함께 써서 감사 범위를 넓힌다는 설계다.

`/document-release`는 문서가 코드보다 늦게 갱신되는 문제를 겨냥한다. 배포된 기능을 기준으로 문서를 맞추므로, 문서 작업이 출시 절차 안으로 들어온다.

### 안전장치와 유틸 명령어

가장 많은 7개가 여기에 속한다. 회고, 교차 검증, 사고 예방, 자체 갱신이 섞여 있다.

| 명령어 | 역할 라벨 | 기능 |
|---|---|---|
| `/retro` | Eng Manager | 주간 회고를 진행한다 |
| `/codex` | Second Opinion | OpenAI Codex CLI로 독립적인 교차 검증을 받는다 |
| `/careful` | Safety Guardrails | 파괴적 명령을 실행하기 전에 경고한다 |
| `/freeze` | Edit Lock | 파일 수정 권한을 단일 디렉토리로 제한한다 |
| `/guard` | Full Safety | `/careful`과 `/freeze`를 동시에 적용한다 |
| `/unfreeze` | Unlock | `/freeze`가 건 제한을 해제한다 |
| `/gstack-upgrade` | Self-Updater | gstack을 최신 버전으로 자동 업그레이드한다 |

`/careful`, `/freeze`, `/guard`, `/unfreeze`는 하나의 가드레일 묶음이다. `/careful`이 위험한 동작의 실행 전 확인을 담당하고, `/freeze`가 편집 가능한 범위를 한 디렉토리로 좁히며, `/guard`가 둘을 함께 켜고, `/unfreeze`가 `/freeze`를 되돌린다. 에이전트에게 넓은 권한을 주되 사고 반경을 미리 제한하려는 구성이다.

`/codex`는 다른 세 명령어와 성격이 다르다. 같은 모델에게 재검토를 맡기면 같은 착각을 반복할 수 있으므로, OpenAI Codex CLI라는 별도 도구를 불러 독립적인 시각을 확보한다.

### 권장 실행 순서

글은 명령어를 나열하는 데서 그치지 않고 일반적인 개발 사이클 예시를 하나 제시한다.

`/office-hours` → `/plan-ceo-review` → `/plan-eng-review` → `/ship` → `/review` → `/qa`

앞의 세 명령어가 기획과 설계를 확정하고, `/ship`이 출시를 수행한 뒤, `/review`와 `/qa`가 뒤이어 점검한다. 계획에 세 단계를 배정한 반면 구현 자체에는 별도 명령을 두지 않은 배치로, 계획 검토에 무게를 싣는 도구의 성격이 순서에 그대로 드러난다.

### 설치 경로 세 가지

설치는 목적에 따라 세 가지로 나뉜다. 세 명령 모두 `--single-branch --depth 1` 옵션으로 저장소를 얕게 clone해 내려받는 양을 줄인다.

| 설치 유형 | 대상 경로 | 절차 |
|---|---|---|
| 글로벌 | `~/.claude/skills/gstack` | 저장소를 clone한 뒤 `./setup` 실행 |
| 프로젝트별 | `.claude/skills/gstack` | 글로벌 설치본을 복사하고 `.git`을 제거한 뒤 `./setup` 실행 |
| Codex CLI와 Cursor | `.agents/skills/gstack` | 저장소를 clone한 뒤 `./setup --host codex` 실행 |

```bash
# 글로벌 설치
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup

# 프로젝트별 설치
cp -Rf ~/.claude/skills/gstack .claude/skills/gstack && rm -rf .claude/skills/gstack/.git && cd .claude/skills/gstack && ./setup

# Codex CLI와 Cursor
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git .agents/skills/gstack
cd .agents/skills/gstack && ./setup --host codex
```

프로젝트별 설치가 clone이 아니라 복사인 이유는 팀 공유에 있다. 글로벌 설치본을 프로젝트 안으로 옮기고 `.git`을 제거하면 gstack이 프로젝트 저장소의 일부가 되어, 같은 저장소를 내려받은 다른 구성원도 동일한 명령어 집합을 갖게 된다.

### 텔레메트리 범위

글은 텔레메트리가 기본 비활성화 상태라는 점을 먼저 밝히고, 활성화했을 때의 수집 범위를 명시한다.

| 구분 | 항목 |
|---|---|
| 수집한다 | 스킬 이름, 실행 시간, 성공과 실패 여부, 버전, OS 정보 |
| 수집하지 않는다 | 코드, 파일 경로, 저장소 이름, 프롬프트 내용 |

수집 항목은 어떤 명령어가 얼마나 쓰이고 성공하는지를 재는 데 필요한 최소 집합이다. 반면 미수집 항목은 작업 내용을 식별할 수 있는 정보에 해당한다. 사용 통계와 작업 내용을 나누고 앞쪽만 가져가는 경계 설정이다.

## 결과

이 글이 제시하는 수치는 도구의 성능 측정이 아니라 저자 Garry Tan의 사용 경험 인용이다. Tan은 gstack을 직접 사용해 2026년 한 해에 GitHub 기여 1,237개를 기록했고, 하루 1만~2만 줄의 프로덕션 코드를 단독으로 작성했다고 밝혔다.

필요 환경은 Claude Code, Git, Bun v1.0 이상이며, Windows에서는 Node.js도 필요하다고 적는다. 라이선스는 MIT여서 개인과 상업 목적 모두에서 자유롭게 사용하고 수정하고 배포할 수 있다.

글 자체는 명령어를 실행해 얻은 측정치를 제시하지 않는다. 카탈로그를 목적으로 하는 자료이므로, 성능 근거는 원 저장소의 주장을 그대로 옮기는 선에서 멈춘다.

## 한계

### 명령어 수와 열거 수의 불일치

글은 gstack을 28가지 슬래시 명령어 모음으로 소개하지만, 본문에 이름이 실제로 나오는 명령어는 22개다. 그룹별로 5개, 3개, 4개, 3개, 7개를 합한 값이다. 나머지 6개가 무엇인지는 글에 나오지 않으므로, 전체 명령어 목록으로 삼기에는 완결되지 않는다.

### 자기 보고 수치

생산성 수치는 도구를 만든 사람이 자기 도구를 쓰고 남긴 기록이다. 독립적인 재현이나 대조군이 없으므로, 도구의 효과를 입증하는 근거로 읽기는 어렵다. 이 한계는 원 저장소를 정리한 [[agents/garrytan-gstack]]도 동일하게 지적한다.

### 원 저장소 문서와 어긋나는 서술

같은 도구를 다루지만 이 글과 저장소 문서 정리가 다르게 적는 항목이 있다. 어느 쪽이 최신인지는 두 자료만으로 판단할 수 없으므로, 실제 사용 시점에는 저장소 문서를 확인하는 편이 안전하다.

| 항목 | 이 글의 서술 | [[agents/garrytan-gstack]]의 서술 |
|---|---|---|
| Windows 지원 | Node.js 추가 설치 필요 | WSL 경유 |
| `/plan-ceo-review` 목표 | 10성급 제품 방향 탐색 | 10배 더 나은 제품 탐색 |
| `/plan-eng-review` 산출물 | 아키텍처, 데이터 흐름, 다이어그램 | 아키텍처, 데이터 흐름, 엣지 케이스 |
| 브라우저 데몬 성능 | 언급 없음 | 콜드 스타트 3~5초, 이후 100~200ms |

### 다루지 않는 범위

브라우저 데몬의 내부 동작, 세션 간 지속 메모리인 GBrain, Conductor 기반 병렬 스프린트 같은 고급 기능은 이 글의 범위 밖이다. 명령어 목록과 설치 절차에 집중한 결과이므로, 구현 세부가 필요하면 다른 자료를 함께 봐야 한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| software factory | 반복 가능한 파이프라인으로 소프트웨어를 생산하는 체계. 글은 gstack을 오픈소스 소프트웨어 팩토리로 소개한다 |
| 슬래시 명령어 | Claude Code에서 `/이름` 형태로 특정 역할이나 작업을 호출하는 단위. gstack에서는 명령어 하나가 역할 하나에 대응한다 |
| 역할 라벨 | 글이 명령어마다 괄호로 붙인 영문 직함 표기. 어떤 전문가를 부르는 명령인지 알려준다 |
| STRIDE | Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege 여섯 범주로 위협을 분류하는 모델링 프레임워크 |
| 텔레메트리 | 스킬 실행 현황을 제작자에게 전송하는 계측 데이터. gstack은 기본 비활성화 상태로 배포된다 |

## 관련 페이지

- [[agents/garrytan-gstack]]: 이 글이 소개하는 원 저장소. 브라우저 스택과 생산성 수치의 근거를 더 자세히 다룬다
- [[agents/gpters-2026-yc-ai-agent-guide-gstack]]: 같은 도구의 실전 가이드. 브라우저 데몬 내부 동작을 파고든다
- [[agents/hada-2026-gstack-virtual-engineering-team]]: 같은 도구의 커뮤니티 소개. 대상 사용자 구분과 반응을 다룬다
- [[overviews/gstack-ai-software-factory-overview]]: gstack 저장소와 한국어 자료 세 편을 묶은 합성 overview
- [[applications/garrytan-gbrain]]: 같은 저자의 세션 간 지속 메모리 저장소. gstack에 GBrain으로 통합된다
