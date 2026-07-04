---
title: "You Can Learn AI Agent Harness & Loop Engineering In 19 Min | LLM Ops, Eval, Tracing, RAG"
type: video
year: 2026
category: agents
source: seans-ai-stories-2026-agent-harness-loop-engineering.md
raw_path: raw/videos/seans-ai-stories-2026-agent-harness-loop-engineering.md
raw_filename: "seans-ai-stories-2026-agent-harness-loop-engineering.md"
source_collection: external
channel: "Sean's AI Stories"
url: "https://www.youtube.com/watch?v=GrNbuWWJYiI"
upload_date: "2026-06-26"
duration: "20:00"
video_id: "GrNbuWWJYiI"
tags: [agent-harness, loop-engineering, llmops, eval, tracing, rag, agent-memory, llm-as-judge, end-loop-guardrails, self-evolving-agents, video, transcript]
---

## 요약 (Summary)

Sean's AI Stories의 20분 화이트보드 강의. 최근 쏟아진 버즈워드 — **harness · loop engineering · LLMOps · eval · tracing · RAG** — 가 실은 몇 개의 단순한 building block이라는 걸 코드 한 줄 없이 하나의 비유로 꿰어 낸다. 비유는 이렇다. **LLM은 인류의 지식은 다 알지만 "당신"과 "당신의 소프트웨어가 원하는 방식"은 모르는 강력한 말(horse)** 이고, **harness는 그 말을 원하는 방향으로 달리게 하는 마구**다. 확률적으로 다음 단어를 뱉는 기술의 랜덤성을 실무에서 통제하려면 바깥에 구조를 깔아야 한다.

전체 그림은 두 블록이 feedback loop으로 물린 형태다 — 왼쪽 **harness**(에이전트를 통제)와 오른쪽 **LLMOps**(에이전트를 평가·개선). 비전공자도 따라오도록 설계된 입문 종합판이니, wiki에 이미 쌓인 [[overviews/agent-harness-engineering-overview]]의 개념들을 단일 비유로 압축한 버전으로 읽으면 좋다.

## 핵심 단위: agent run (The Unit)

강의는 관측 단위를 먼저 못박는다. **agent run = user input 1회 → reply 1회.** 그 안에서 tool call이 몇 번 일어나든 상관없다. 이 단위가 뒤의 tracing·eval에서 그대로 "관측 대상"으로 재사용된다.

기본 run은 `질문 + 현재 chat history + system prompt`를 **working memory(context RAM)** 로 조립해 LLM에 넣고 답을 받는다. 문제는 이 memory가 너무 단기라는 것. 그래서 harness가 필요해진다.

## Harness — 3종 memory와 통제 (Memory & Control)

에이전트가 제대로 일하려면 단기 working memory 위에 장기 memory 세 종류가 붙는다. 강의는 이들을 **저장·갱신·검색** 관점에서 분리한다.

| memory | 정체 | 검색 방식 |
|---|---|---|
| **procedural** | 행동 지침·skill (markdown 파일/텍스트, "how to act") | 파일 로드 |
| **semantic / durable facts** | 지속되는 사실 ("who Sean is") — 공개 안 된 사람은 직접 주입 | **RAG** (텍스트 유사도) |
| **episodic** | timestamp 있는 event time-series (과거 대화 이력) | **SQL** (+ 필요 시 semantic search) |

검색 경로가 어떻게 갈리는지가 이 강의의 알맹이다. semantic은 사실·텍스트라 RAG면 되지만, episodic은 시계열이라 다르다. *"이 미국 고객과의 최근 대화 10건"* 은 SQL 한 방이면 되고, *"품질 불만이었고 우리 에이전트가 해결 못 한 대화 20건"* 은 2,000건 중 딱 맞는 20건을 골라야 하므로 SQL로 후보를 좁힌 뒤 **RAG로 의미까지 맞춘다.**

memory는 저절로 생기지 않으니 database(AWS·Supabase·Google Cloud·Azure 등)에 저장하고 매 응답마다 갱신한다. 규모가 커지면 **consolidation 게이트**가 돈다. 백만 고객이 매번 같은 환불 문의를 반복하면, 예컨대 2,000건마다 **summarizer agent**(그 자체가 또 하나의 harness)가 요약·distill해 semantic memory로 승격시킨다. context가 커서 비싼 작업이니 저렴한 open-source 모델을 붙여도 된다.

```
user prompt + chat history + system prompt
        │
        ▼
   working memory (context RAM)  ◄──────┐
        │            ▲                  │
        ▼            │ retrieve         │ update (매 응답마다 write)
   ┌─────────┐   ┌───┴─────────────────┴───┐
   │  LLM    │   │  Database                │
   │ (agent) │   │  · procedural (files)    │
   └────┬────┘   │  · episodic (SQL)        │
        │        │  · semantic (facts, RAG) │
        │        └──────────────────────────┘
        │            ▲ consolidate (2,000건마다 summarizer → 저렴한 모델)
        ▼
   tool calls (CRM·Stripe·일정) ──► end-loop guardrails ──► reply
        └────────────── loop until "good enough" ──────────┘
```

## Loop Engineering — 언제 멈출 것인가 (End-loop Guardrails)

에이전트는 memory를 읽기만 하지 않고 tool을 부른다 — 미팅 잡기, CRM 읽고 쓰기, Stripe·Alipay 결제 조회. 그런데 말(LLM)에게 전권을 주면 **멈출 줄을 모른다.** 언제가 "충분히 좋은" 종료 지점인지 스스로 판단하지 못하기도 한다. 그래서 **loop engineering도 harness의 일부**다 — 기술을 원하는 대로 달리게 하는 통제의 한 조각이다.

강의의 예시는 이렇다. *"고객 불만을 찾아 후속 조치를 정하고, 환불 요청이 있었는데 아직 안 했으면 처리하라."* 에이전트는 Salesforce·HubSpot을 읽어 "지난 2달 30건 불만, 12건 환불 완료, 8건 미완료"를 파악하고, 미완료 8명에게 미팅을 잡거나(더 나아가면) Stripe 환불 트리거까지 건다 — **task가 끝날 때까지 도는 loop.** 정답이 하나로 고정되지 않으며(one-solution-fits-all 없음), 종료 조건은 태스크마다 직접 설계해야 한다.

핵심은 **loop이 멈출 때를 알아야 한다**는 것. guardrail은 단순히 "task done"일 수도 있고, planning 단계에서 사용자와 종료 조건을 confirm하는 것일 수도 있다 — *"8명 다 환불할까요, 아니면 명단만 드리고 나중에 직접 처리하실래요?"*

실전 예로는 **Claude Code hook**을 든다. 권한 승인 대기가 걸리면 노트북에 알림을 보내도록 hook을 걸어 둔다. 안 그러면 유튜브 보다 30분 뒤 돌아왔을 때 25분 전부터 멈춰 있던 걸 발견하는 시간 낭비가 난다. loop이 끝났거나 다시 입력이 필요하다는 신호를 notification으로 받는 패턴이다.

## LLMOps — 스스로 진화하는 feedback loop (Eval & Tracing)

harness만으로는 *"이게 잘 돌고 있나?"* 를 알 길이 없다. 그래서 오른쪽에 **LLMOps** feedback loop를 붙인다. 3단계다.

```
agent run ──► ① tracing: event tree
                (질문·retrieval·tool call 횟수·latency·token 수집)
                     │
                     ▼
              ② eval: good? / healthy?  (LLM-as-judge or 결정론적 코드)
                     │  dashboard·metrics
                     ▼
              ③ diagnose → gate
                 ├─ 통과: prompt/model/param 개선 → agent run에 반영 (1 loop 종료)
                 └─ 심각한 버그: fix → 재run → 재trace → 재eval
```

1. **tracing** — 매 run을 event tree로 기록한다. 사용자가 뭘 물었나, 어떤 retrieval이 일어났나, tool을 몇 번 불렀나, 응답 시간(latency)·토큰은 얼마였나. 데이터를 모으는 1단계다. 도구 예: **LangFuse, LangSmith.**
2. **eval** — 그 데이터를 두 질문으로 가른다: *good?*(잘했나) 와 *healthy?*(건강했나). **LLM-as-judge** 로 점수를 매기거나 결정론적 코드로 검사한다. metric 예: 이벤트가 실제로 트리거됐나(미팅이 진짜 잡혔나), latency가 20초냐 2ms냐, 토큰을 얼마나 썼나.
3. **diagnose → gate** — 대시보드로 어디가 왜 깨졌는지 진단한다. latency가 20초면 tool call 지연·과대 working memory·불필요한 retrieval을 의심한다("내 생일은?" 같은 질문은 모델이 이미 알아서 거대 memory 검색이 필요 없다). 그러고 나서 게이트에서 갈린다. **통과** → 간단한 fix(더 나은 system prompt·model config·retrieval 파라미터)를 agent run에 반영하고 1 loop 종료. **심각한 버그** → 코드를 고치고 재run → 재trace → 재eval.

이 두 블록이 물리면 결과적으로 **스스로 관측·진단·개선하며 진화하는 자율 시스템**이 된다. harness 도구로는 LangGraph·LangChain·Pydantic이 예시로 호명된다.

## 관련 페이지 (Related Pages)

- [[overviews/agent-harness-engineering-overview]] — 이 영상의 harness·loop·verification 축을 6개 자료로 합성한 상위 지도. 본 영상은 그 개념을 비전공자용 단일 비유로 압축한 입문판.
- [[agents/lee-hoyeon-2026-harness-engineering]] — 구조→맥락→계획→실행→검증→개선 6축. 영상의 좌(harness)·우(LLMOps)와 대응.
- [[agents/osmani-2026-loop-engineering]] · [[agents/lee-jeongmin-2026-loop-engineering-claude-code]] · [[agents/runkle-2026-the-art-of-loop-engineering]] — loop engineering·end-loop guardrail 심화. 영상의 Claude Code hook 알림 예시와 직접 연결.
- [[agents/qiao-2026-memory-intelligence-agent]] · [[agents/zou-2026-task-focused-memorization-multimodal-agents]] — procedural·semantic·episodic 3분법의 학술 배경.
- [[evaluations/marker-inc-korea-autorag]] · [[evaluations/kim-2026-ai-prd-eval-plan]] — eval/LLMOps 파트의 실무 프레임.

