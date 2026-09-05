---
title: "The Art of Loop Engineering"
type: article
year: 2026
category: agents
raw_path: raw/articles/runkle-2026-the-art-of-loop-engineering.md
raw_filename: "runkle-2026-the-art-of-loop-engineering.md"
source_collection: external
author: "Sydney Runkle"
url: "https://www.langchain.com/blog/the-art-of-loop-engineering"
publisher: "LangChain Blog"
publication_date: "2026-06-16"
tags: [loop-engineering, langchain, create-agent, rubric-middleware, langsmith, verification-loop, event-driven, hill-climbing, traces, human-in-the-loop, agents, fleet, engine]
figures:
  - id: loop1-agent
    file: assets/runkle-2026-the-art-of-loop-engineering/loop1-agent.svg
    caption: "Loop 1 Agent loop — model이 action·observation으로 tool을 반복 호출, 끝나면 result (원본 도식 재현)"
    strategy: manual
    curated: true
  - id: loop1-agent-docs
    file: assets/runkle-2026-the-art-of-loop-engineering/loop1-agent-docs.svg
    caption: "Loop 1 docs writer — model(plan+draft) ⇄ sandbox tools → pull request (원본 도식 재현)"
    strategy: manual
    curated: true
  - id: loop2-verification
    file: assets/runkle-2026-the-art-of-loop-engineering/loop2-verification.svg
    caption: "Loop 2 Verification — agent loop을 grader가 감싸 채점, pass면 done·아니면 retry (원본 도식 재현)"
    strategy: manual
    curated: true
  - id: loop2-verification-docs
    file: assets/runkle-2026-the-art-of-loop-engineering/loop2-verification-docs.svg
    caption: "Loop 2 docs writer — grader가 links resolve·CI passes 검사 (원본 도식 재현)"
    strategy: manual
    curated: true
  - id: loop3-event
    file: assets/runkle-2026-the-art-of-loop-engineering/loop3-event.svg
    caption: "Loop 3 Event loop — event trigger→verification loop, system update가 new events로 순환 (원본 도식 재현)"
    strategy: manual
    curated: true
  - id: loop3-event-docs
    file: assets/runkle-2026-the-art-of-loop-engineering/loop3-event-docs.svg
    caption: "Loop 3 docs writer — #docs-plz Slack 트리거, docs enhancement가 new request로 순환 (원본 도식 재현)"
    strategy: manual
    curated: true
  - id: loop4-hill-climbing
    file: assets/runkle-2026-the-art-of-loop-engineering/loop4-hill-climbing.svg
    caption: "Loop 4 Hill Climbing — traces→engine→harness improvements가 안쪽 루프로 (원본 도식 재현)"
    strategy: manual
    curated: true
  - id: loop4-hill-climbing-docs
    file: assets/runkle-2026-the-art-of-loop-engineering/loop4-hill-climbing-docs.svg
    caption: "Loop 4 docs writer — engine analysis가 trace에서 문제를 찾아 prompt/tool 변경 제안 (원본 도식 재현)"
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

LangChain의 Sydney Runkle이 2026-06-16에 쓴 글. 에이전트의 힘은 모델 성능이 아니라 그 둘레에 쌓아 올린 **루프 구조**에서 나온다. 글은 핵심 agent loop 바깥에 verification → event-driven → hill climbing 세 겹을 더 두르는 **4단계 루프 스택**을 제시한다. 각 층을 LangChain 도구(`create_agent`·`RubricMiddleware`·LangSmith Deployment/Fleet·LangSmith Engine)에 매핑하고, 층마다 사람의 판단이 끼어들 지점을 둔다.

## 1. 자료 정보 (Document Information)

- **저자**: Sydney Runkle (LangChain)
- **게시일**: 2026-06-16
- **매체**: LangChain Blog
- **URL**: https://www.langchain.com/blog/the-art-of-loop-engineering
- **분량**: 중간 길이 에세이 (도입 + 4개 루프 레벨 + 사람 감독 + 종합 표)
- **러닝 예제**: 사내 문서화 에이전트(docs writer agent) 하나를 글 전체에서 단계별로 확장하며 설명
- **언급 도구/제품**: LangChain `create_agent`, `RubricMiddleware`, `after_agent` 훅, LangSmith Deployment(스케줄·webhook), Fleet(no-code 에이전트 빌더), LangSmith Engine(trace 분석)
- **연결 개념**: "loopcraft: the art of stacking loops"라는 선행 논의를 인용

## 2. 주요 기여 (Key Contributions)

1. **4단계 루프 스택 정식화** — 에이전트 시스템을 네 겹의 루프로 분해한다: (1) Agent(실행), (2) Verification(품질), (3) Event-Driven(통합/자율 실행), (4) Hill Climbing(자기 개선). 안쪽 루프를 바깥 루프가 감싸는 *중첩 구조*다.
2. **각 층 ↔ LangChain 도구 매핑** — 추상적 루프 개념을 구체 제품에 1:1로 붙인다: `create_agent` / `RubricMiddleware` / LangSmith Deployment·Fleet channel / LangSmith Engine.
3. **단일 러닝 예제로 4층 관통** — 사내 문서화 에이전트 하나가 네 루프를 거치며 어떻게 진화하는지 보여주며, 추상 개념을 실무 흐름으로 묶는다.
4. **Hill Climbing = "개선의 자동화"** — 앞 세 루프가 *실행*을 자동화한다면 네 번째는 *개선 자체*를 자동화한다는 점을 핵심으로 못 박는다. 복귀 경로가 처음으로 돌아가지 않고 *안쪽 agent loop을 직접 수정*한다는 구조적 차이를 강조한다.
5. **모든 층에 human-in-the-loop 지점 명시** — 자동화가 사람을 없애는 게 아니라, 네 층 각각에 사람 판단이 들어갈 자리를 둔다는 점을 4개 항목으로 정리한다.
6. **전략적 권고** — 그동안 무게가 실린 loop 1·2에서 loop 3·4로 옮겨가라고 방향을 제시한다. 통합과 자기 개선에서 경쟁 우위가 복리로 쌓인다는 주장이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 4단계 루프 스택

| Loop | 기능 | 효과 | LangChain 도구 |
|---|---|---|---|
| **1. Agent loop** | 모델이 도구를 반복 호출해 작업 완료 | 일을 자동화 | `create_agent` + 임의 모델 |
| **2. Verification loop** | 출력을 grader가 채점, 실패 시 피드백과 함께 재시도 | 품질·일관성 보장 | `RubricMiddleware` 또는 `after_agent` 훅 |
| **3. Event-driven loop** | 이벤트(문서 도착·스케줄·webhook)가 에이전트를 기동, 실제 시스템을 수정 | 자동화된 일을 넓게 실행 | LangSmith Deployment(스케줄/webhook) 또는 Fleet channel |
| **4. Hill climbing loop** | production trace를 분석 에이전트가 읽고 harness 설정을 다듬음 | harness를 지속 개선 | LangSmith Engine |

### 3.2 각 루프의 동작

- **Loop 1 (Agent)**: 모델과 도구로 구성된다. 도구는 실제 시스템에 행동을 가하는 통로다. 문서화 에이전트 예에서는 repo clone, 파일 접근, 문서 작성, PR 생성 도구를 호출한다.
- **Loop 2 (Verification)**: agent loop을 grader로 감싼다. grader는 **deterministic**(규칙 기반)일 수도, **agentic**(LLM 평가)일 수도 있다. 기준에 못 미치면 피드백을 달아 출력을 되돌린다. 문서화 예에서는 매 시도 뒤 테스트를 돌려 링크 정상 작동·CI 통과·요청 범위 외 수정 없음을 검증한다. 대신 실행마다 지연과 비용이 늘지만, 품질이 속도보다 중요한 대부분의 production에서는 그만한 값을 한다.
- **Loop 3 (Event-Driven)**: 에이전트를 조직 인프라에 연결해 백그라운드에서 자율 동작시킨다. 이벤트가 발생하면("새 문서 도착, 스케줄 발동, webhook 도착") 에이전트가 돈다. 스케줄의 흔한 구현이 **heartbeat**로, 에이전트를 늘 깨어 선제적으로 움직이는 보조자로 만든다. 문서화 에이전트는 Fleet 위에서 동작하며, 사내 `#docs-plz` Slack 채널에 메시지가 뜨면 channel이 docs 에이전트를 깨운다.
- **Loop 4 (Hill Climbing)**: 매 실행이 남기는 **trace**(모델 행동·도구 호출·grader 판정 기록)를 분석 에이전트가 읽어 harness를 고친다. 수정 대상은 prompt·tool·grader다. 복귀 경로가 시작점으로 가지 않고 *안쪽 agent loop을 직접 업그레이드*한다. 바깥 루프가 한 바퀴 돌 때마다 안쪽 메커니즘의 효율이 올라가는 구조다. LangSmith Engine이 이 trace 분석을 맡으며, 여러 trace에서 같은 문제가 반복되면 해당 prompt·tool 수정을 알림으로 띄운다.

### 3.3 Hill Climbing의 확장 가능성 (Looking forward)

prompt·tool 설정은 가장 손쉬운 개선 표적일 뿐이다. self-hosted 모델을 굴리는 조직이라면 hill climbing 루프가 trace·평가 정보를 **RL fine-tuning**의 학습 재료로 흘려보내, 모델 자체를 개선 대상으로 삼을 수 있다. memory framework나 학습된 skill 같은 부수 요소도 같은 방식으로 다룬다. *루프 구조는 그대로 두고, 무엇을 최적화하느냐만 바꾼다.*

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

본 자료는 제품 관점의 프레임워크 정리 글이라 **정량 벤치마크가 없다**. throughput·결함률 같은 측정치 대신, 단일 러닝 예제(문서화 에이전트)로 네 루프의 효과를 서술로 보여준다. 검증 가능한 도구 기능 사실은 다음과 같다.

- `create_agent`로 모델과 도구를 묶어 기본 agent loop을 구성한다.
- `RubricMiddleware`나 `after_agent` 훅으로 채점 패턴을 구현한다.
- LangSmith Deployment가 scheduled run·webhook을, Fleet channel이 Slack 트리거를 지원한다.
- LangSmith Engine이 trace 분석으로 harness 개선 지점을 표면화한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **2차 자료 / 제품 마케팅 성격**: LangChain 자사 블로그라 네 루프가 자사 제품(`create_agent`·LangSmith·Fleet) 라인업에 맞춰 정렬돼 있다. 도구 중립적 프레임워크라기보다 제품 내러티브에 가깝다.
- **정량 근거 부재**: verification·hill climbing이 실제로 품질을 얼마나 끌어올리는지 수치가 없다. latency·비용 증가도 "그만한 값을 한다"는 정성 평가에 머문다.
- **Loop 4의 미성숙**: hill climbing, 특히 RL fine-tuning으로의 확장은 self-hosted 모델 운영 조직에 한정된 *전망*으로 제시되며, 본문에 구현 사례나 결과가 붙지 않는다.
- 저자가 명시한 향후 방향: 무게중심을 loop 1·2에서 **loop 3·4(통합·자기 개선)**로 옮기고, trace·평가 신호를 RL·memory·skill 개선으로까지 확장.

## 6. 관련 연구 (Related Work)

본문이 명시적으로 연결한 개념:

- **"loopcraft: the art of stacking loops"** — 여러 루프를 겹쳐 더 유능한 에이전트를 만든다는 선행 논의. 본 글의 출발점이다.
- **LangChain `create_agent`, `RubricMiddleware`, LangSmith(Deployment·Engine), Fleet** — 각 루프의 구현 도구.
- 본문은 *"여러 기술자들이 독립적으로 같은 결론에 도달했다"*고 언급하지만 구체 인물이나 URL attribution은 달지 않는다.

본 wiki에서 같은 "loop engineering" 패러다임을 다른 저자·각도로 다룬 자매 자료:

- [[agents/osmani-2026-loop-engineering|Loop Engineering (Addy Osmani 2026)]] — 같은 용어를 코딩 에이전트 관점에서 본 에세이. Osmani의 5+1 요소(automations·worktrees·skills·connectors·sub-agents) vs Runkle의 4 루프 스택.
- [[agents/lee-jeongmin-2026-loop-engineering-claude-code|Loop Engineering · Claude Code · RLM (Jeongmin Lee 2026)]] — loop engineering을 RLM 이론·Claude Code dynamic workflow에 묶은 한국어 카드 포스트.
- [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering (이호연 2026)]] — Prompt → Context → Harness 3단계 진화. Runkle의 hill climbing(loop 4)은 이호연의 "개선" 축에 해당한다.
- [[agents/lin-2026-harness-updating-is-not-harness-benefit|Harness Updating Is Not Harness Benefit (Lin 2026)]] — harness 자기 개선의 이득을 측정 관점에서 비판. loop 4가 정말 가치를 더하는지 따져볼 렌즈.

## 7. 용어집 (Glossary)

- **Loop Engineering / Loopcraft** — 개별 prompt가 아니라 에이전트를 둘러싼 *루프 구조*를 설계 대상으로 삼는 접근. 여러 루프를 겹쳐(stack) 더 유능한 에이전트를 만든다.
- **Agent loop** — 모델이 도구를 반복 호출해 작업을 끝낼 때까지 도는 가장 안쪽 루프. `create_agent`가 제공한다.
- **Verification loop** — agent 출력을 grader로 채점하고 미달 시 피드백과 함께 재시도시키는 품질 루프.
- **Grader** — 출력을 기준에 대고 평가하는 컴포넌트. deterministic(규칙) 또는 agentic(LLM) 방식.
- **`RubricMiddleware`** — 채점 패턴을 구현하는 LangChain 미들웨어. `after_agent` 훅으로도 배선할 수 있다.
- **Event-driven loop** — 이벤트(문서 도착·스케줄·webhook)가 에이전트를 기동해 백그라운드 자율 실행시키는 통합 루프.
- **Heartbeat** — 스케줄 기반 트리거의 흔한 구현. 에이전트를 늘 깨어 선제적으로 움직이게 한다.
- **Fleet** — LangChain의 no-code 에이전트 빌더. channel·scheduling으로 이벤트·정기 트리거를 관리한다.
- **Hill climbing loop** — production trace를 분석 에이전트가 읽고 harness(prompt·tool·grader)를 다듬는 자기 개선 루프. 복귀 경로가 안쪽 agent loop을 직접 수정한다.
- **Trace** — 한 번의 에이전트 실행이 남기는 기록(모델 행동·도구 호출·grader 판정 등). hill climbing의 입력이다.
- **Harness** — 모델 둘레의 prompt·tool·grader·메모리 등 실행 골격. hill climbing이 개선하는 대상이다.
- **LangSmith Engine** — trace를 분석해 harness 개선 지점을 표면화하는 도구. loop 4의 구현이다.
- **Human-in-the-loop** — 자동화 각 층에 사람의 판단을 끼워 넣는 설계. LangChain이 "first class primitive"로 다룬다고 표현한다.

## 8. 그림 후보 (Figure Candidates)

원본 블로그 도식(클라이언트 렌더링이라 ingest 시 자동 수집 실패)을 사용자가 스크린샷으로 제공했고, 이를 **동일 구조의 SVG로 재현**했다. 원본이 네 루프마다 일반형 + docs writer 예시형 한 쌍을 두므로 총 8장이다. 모두 `wiki/assets/runkle-2026-the-art-of-loop-engineering/`에 큐레이션 사본으로 들어가며, Obsidian·GitHub Pages 어디서나 플러그인 없이 렌더된다. 생성기는 `scripts/build_loop_diagrams.py`(좌표·스타일을 코드로 관리, deterministic)이며, 수정은 스크립트를 고쳐 재실행한다.

| id | 유형 | 내용 | 근거(원본 도식) | strategy | 추천 |
|---|---|---|---|---|---|
| loop1-agent | flowchart | model이 action·observation으로 tool 반복 호출 → result | "LOOP 1 — AGENT LOOP" | manual | ★ wiki |
| loop1-agent-docs | flowchart | model(plan+draft) ⇄ sandbox tools(clone·read·write) → pull request | "DOCS WRITER AGENT LOOP" | manual | ★ wiki |
| loop2-verification | flowchart | agent loop을 grader(rubric/eval)가 감싸 채점, pass→done·fail→retry with feedback | "LOOP 2 — VERIFICATION LOOP" | manual | ★ wiki |
| loop2-verification-docs | flowchart | grader가 links resolve·CI passes 검사 | "DOCS WRITER VERIFICATION LOOP" | manual | ★ wiki |
| loop3-event | architecture | event trigger→verification loop→system update, new events로 순환 | "LOOP 3 — EVENT LOOP" | manual | ★ wiki |
| loop3-event-docs | architecture | #docs-plz Slack→…→docs enhancement, new request로 순환 | "DOCS WRITER EVENT LOOP" | manual | ★ wiki |
| loop4-hill-climbing | flowchart | 4겹 전체도 + traces→engine analysis→harness improvements가 안쪽으로 | "LOOP 4 — HILL CLIMBING LOOP" | manual | ★ wiki (overview) |
| loop4-hill-climbing-docs | flowchart | engine analysis가 trace에서 문제 탐지→prompt/tool 변경 제안 | "DOCS WRITER HILL CLIMBING LOOP" | manual | ★ wiki |
