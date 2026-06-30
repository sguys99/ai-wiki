---
title: "The Art of Loop Engineering (Sydney Runkle, 2026-06-16)"
type: article
year: 2026
category: agents
raw_path: /home/sguys99/project/ai-wiki/raw/articles/runkle-2026-the-art-of-loop-engineering.md
raw_filename: "runkle-2026-the-art-of-loop-engineering.md"
source_collection: external
source: runkle-2026-the-art-of-loop-engineering.md
author: "Sydney Runkle"
url: "https://www.langchain.com/blog/the-art-of-loop-engineering"
publisher: "LangChain Blog"
publication_date: "2026-06-16"
tags: [loop-engineering, langchain, create-agent, rubric-middleware, langsmith, verification-loop, event-driven, hill-climbing, traces, human-in-the-loop, agents, fleet, engine]
---

## 요약 (Summary)

LangChain의 **Sydney Runkle**이 2026-06-16에 쓴 글이다. 에이전트의 힘은 모델 성능 자체가 아니라 그 둘레에 쌓아 올린 **루프 구조**에서 나온다고 본다. 가장 안쪽의 agent loop 하나만으로는 부족하고, 그 바깥에 세 겹을 더 둘러 **4단계 루프 스택**을 만들자는 것이 글의 뼈대다. 각 층은 LangChain 제품에 그대로 매핑된다.

네 루프는 이렇게 포개진다. **(1) Agent** — 모델이 도구를 반복 호출해 일을 끝낸다(`create_agent`). **(2) Verification** — 그 출력을 grader가 채점하고 미달이면 피드백과 함께 되돌린다(`RubricMiddleware`). **(3) Event-Driven** — 이벤트가 에이전트를 깨워 백그라운드에서 자율로 돌린다(LangSmith Deployment·Fleet). **(4) Hill Climbing** — 실행이 남긴 trace를 분석 에이전트가 읽고 harness 자체를 다듬는다(LangSmith Engine).

핵심은 네 번째다. 앞 세 루프가 *실행*을 자동화한다면, hill climbing은 **개선 자체**를 자동화한다. 복귀 경로가 처음으로 돌아가지 않고 안쪽 agent loop을 직접 고친다는 점에서 다른 루프와 결이 다르다. 저자는 그동안 무게가 실렸던 loop 1·2에서 **loop 3·4로 옮겨가라**고 권한다 — 통합과 자기 개선에서 우위가 복리로 쌓이기 때문이다.

> **2차 자료 주의**: LangChain 자사 블로그라 네 루프가 자사 제품 라인업(`create_agent`·LangSmith·Fleet)에 맞춰 정렬돼 있다. 도구 중립적 프레임워크라기보다 제품 내러티브에 가깝고, **정량 벤치마크는 없다**. verification·hill climbing의 품질 향상 폭, latency·비용 증가는 모두 정성 서술에 머문다. loop 4의 RL fine-tuning 확장은 self-hosted 모델 운영 조직 한정의 *전망*으로만 제시된다.

## 4단계 루프 스택 (The Four Loops)

| Loop | 기능 | 효과 | LangChain 도구 |
|---|---|---|---|
| **1. Agent loop** | 모델이 도구를 반복 호출해 작업 완료 | 일을 자동화 | `create_agent` + 임의 모델 |
| **2. Verification loop** | 출력을 grader가 채점, 실패 시 피드백과 함께 재시도 | 품질·일관성 보장 | `RubricMiddleware` / `after_agent` 훅 |
| **3. Event-driven loop** | 이벤트(문서·스케줄·webhook)가 에이전트를 기동, 실제 시스템 수정 | 자동화된 일을 넓게 실행 | LangSmith Deployment 또는 Fleet channel |
| **4. Hill climbing loop** | trace를 분석 에이전트가 읽고 harness 설정을 개선 | harness 지속 개선 | LangSmith Engine |

## 각 루프의 동작 (How Each Loop Works)

글 전체는 사내 **문서화 에이전트(docs writer)** 하나를 러닝 예제로 두고 네 층을 차례로 입힌다.

- **Loop 1 — Agent**: 모델 + 도구의 기본 루프. 도구가 실제 시스템에 손을 대는 통로다. 문서화 에이전트는 요청을 받아 계획을 세우고 수정안을 쓰며, repo clone·파일 접근·문서 작성·PR 생성 도구를 호출한다.
- **Loop 2 — Verification**: agent loop을 grader로 감싼다. grader는 **deterministic**(규칙 기반)일 수도, **agentic**(LLM 평가)일 수도 있다. 문서화 예에서는 매 시도 뒤 테스트를 돌려 링크 정상 작동·CI 통과·요청 범위 밖 수정 없음을 확인한다. 사람이 손볼 오류를 통째로 걸러내는 대신, 실행마다 지연과 비용이 붙는다 — 품질이 속도보다 중요한 대부분의 production에서는 감수할 만한 거래다.
- **Loop 3 — Event-Driven**: 에이전트를 조직 인프라에 연결해 백그라운드 자율 동작으로 만든다. *"이벤트가 발생하면 — 새 문서가 도착하거나, 스케줄이 발동하거나, webhook이 오면 — 에이전트가 돈다."* 스케줄의 흔한 구현이 **heartbeat**로, 에이전트를 늘 깨어 선제적으로 움직이는 보조자로 바꾼다. 문서화 에이전트는 Fleet 위에서 동작하며, 사내 `#docs-plz` Slack 채널에 메시지가 뜨면 channel이 에이전트를 깨운다.
- **Loop 4 — Hill Climbing**: 매 실행이 남기는 **trace**(모델 행동·도구 호출·grader 판정 기록)를 분석 에이전트가 읽고 harness를 고친다. 수정 대상은 prompt·tool·grader다. LangSmith **Engine**이 이 분석을 맡아, 여러 trace에서 같은 문제가 반복되면 해당 prompt·tool 수정을 알림으로 띄운다.

## Hill Climbing — 개선의 자동화 (The Self-Improving Loop)

hill climbing이 다른 루프와 갈리는 지점은 **복귀 경로**다. 보통의 루프는 끝나면 시작점으로 돌아가지만, 이 루프는 안쪽으로 파고들어 **agent loop 자체를 업그레이드**한다. 바깥 루프가 한 바퀴 돌 때마다 안쪽 메커니즘의 효율이 올라간다.

확장 여지도 크다. prompt·tool 설정은 가장 손쉬운 개선 표적일 뿐이다. self-hosted 모델을 굴리는 조직이라면 trace·평가 정보를 **RL fine-tuning**의 학습 재료로 흘려보내 모델 자체를 개선 대상으로 삼을 수 있고, memory framework나 학습된 skill도 같은 방식으로 다룰 수 있다. 루프 구조는 그대로 두고 *무엇을 최적화하느냐*만 갈아 끼우는 셈이다.

## 사람의 자리 (Human Oversight)

자동화가 사람을 밀어내지 않는다. 자동 grader가 링크 작동은 검증해도, 독자층에 맞는 글인지 가려내는 일은 사람의 몫이다. 금전 거래나 데이터베이스를 건드리는 작업처럼 결과가 무거운 행동에는 직접 검토가 필요하다. LangChain은 네 층 모두에 사람이 끼어들 지점을 둔다.

1. **Agent loop** — 고위험 작업·도구 사용 직전에 "human input" 요구를 건다.
2. **Verification loop** — 중요한 워크플로우는 사람을 grader로 지정한다.
3. **Application layer** — 결과를 최종 사용자에게 보내기 전 사람의 승인을 받는다.
4. **Hill climbing loop** — harness 개선안을 적용 전에 사람이 평가한다.

LangChain은 오픈소스 도구에서 *"human in the loop"*을 *"first class primitive"*로 다룬다고 표현한다.

## 핵심 통찰 (Key Insight)

> 에이전트의 역량은 근본적으로 그 둘레에 **구축한 루프 구조**에 있다.

좋은 모델을 고르는 일은 시작점일 뿐이다. 경쟁 우위는 loop 1·2(실행·품질)가 아니라 **loop 3·4**에서 복리로 쌓인다 — 에이전트를 운영 시스템에 통합하고(event-driven), 그 시스템이 목표에 맞춰 스스로 나아지게(hill climbing) 만드는 곳이다. 저자의 표현으로는, 학습 메커니즘을 일찍 갖춰 *사람의 판단과 연산 자원이 서로를 강화*하게 만든 조직이 따라잡기 어려운 격차를 벌린다.

## 관련 페이지 (Related Pages)

- [[agents/osmani-2026-loop-engineering|Loop Engineering (Addy Osmani 2026)]] — 같은 *"loop engineering"* 용어를 **코딩 에이전트** 관점에서 본 자매 에세이. Osmani의 5+1 요소(automations·worktrees·skills·connectors·sub-agents)가 *무엇으로 루프를 채우나*라면, Runkle의 4 루프 스택은 *어떤 층위로 루프를 포개나*에 가깝다. Osmani의 sub-agent verification distance ↔ Runkle의 verification loop(loop 2)이 직접 대응한다.
- [[agents/lee-jeongmin-2026-loop-engineering-claude-code|Loop Engineering · Claude Code · RLM (Jeongmin Lee 2026)]] — loop engineering을 RLM 이론과 Claude Code dynamic workflow에 묶은 한국어 카드 포스트. 같은 흐름을 모델·이론 쪽에서 본 시각.
- [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering (이호연 2026)]] — *Prompt → Context → Harness* 3단계 진화 모델. Runkle의 hill climbing(loop 4 = harness 개선)이 이호연의 "개선" 축과 정확히 겹친다.
- [[agents/lin-2026-harness-updating-is-not-harness-benefit|Harness Updating Is Not Harness Benefit (Lin 2026)]] — harness 자기 개선의 이득을 측정 관점에서 비판. loop 4가 정말 가치를 더하는지 따져볼 렌즈로 짝지어 읽으면 좋다.
- [[agents/patel-2026-beyond-the-prompt-claude-code|Beyond the Prompt: Claude Code (Patel 2026)]] — self-verification·subagent·worktree 등 loop 2·3의 실무 구현을 Claude Code 사례로 푼 가이드.
