---
title: "You Can Learn AI Agent Harness & Loop Engineering In 19 Min | LLM Ops, Eval, Tracing, RAG"
type: video
year: 2026
category: agents
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

## 한 줄 요약 (One-line Summary)

Sean's AI Stories의 20분 화이트보드 강의. **agent run → 3종 memory(procedural·semantic·episodic) → harness → loop(end-loop guardrails) → LLMOps(tracing·eval·diagnose·ship)** 를 "LLM은 당신을 모르는 powerful horse, harness는 그 말을 통제하는 마구"라는 하나의 비유로 꿰었다. 최근 버즈워드(harness·loop engineering·LLMOps·eval·tracing·RAG)가 실은 몇 개의 단순 building block이라는 점을 비전공자도 따라오게 풀어낸 입문 영상.

## 1. 자료 정보 (Document Information)

- **채널**: Sean's AI Stories (@SeanAIStories)
- **URL**: <https://www.youtube.com/watch?v=GrNbuWWJYiI>
- **업로드**: 2026-06-26
- **러닝타임**: 20:00
- **자막**: YouTube 자동 생성 원어(en-orig) 자막을 `yt-dlp`로 취득 → VTT → 평문 정제 (약 22,800자).
- **선행 영상 전제**: 진행자가 앞선 "AI agent memories" 영상을 언급하며 memory 파트는 빠르게 복습하고 harness·loop·LLMOps에 집중.
- **음성인식 오류 주의**: "Clockwork/clock code/cloud code" → **Claude Code**, "Automanous" → CRM 제품 오인식, "Asian runtime" → **agent runtime** 오인식, "hardness" → **harness**.
- **성격**: 코드·수식 없는 개념 강의. 아키텍처 다이어그램을 말로 그려 나가는 방식(도식은 영상 화면에만 존재).

## 2. 주요 기여 (Key Contributions)

1. **harness = "말을 통제하는 마구" 비유의 일관된 전개.** LLM은 인류의 지식은 알지만 *"당신"* 과 *"당신의 소프트웨어가 원하는 방식"* 은 모르는 강력한 말이며, harness는 그 말을 원하는 방향으로 달리게 하는 도구 집합이다. 확률적(next-word) 랜덤성을 실무에서 통제하는 장치라는 프레임.
2. **agent run = 1 user input → 1 reply** 로 단위를 못박고, 그 안의 tool call 횟수는 무관하다고 정의 — 이후 tracing·eval의 관측 단위로 재사용.
3. **3종 장기 memory를 저장·갱신·검색 관점에서 분리**:
   - **procedural**(지시·skill, markdown 파일/텍스트, "how to act")
   - **semantic / durable facts**("who Sean is" 같은 사실, 공개 안 된 사람은 직접 주입)
   - **episodic**(timestamp 있는 event time-series, 과거 chat 이력)
4. **memory 검색 방식을 종류별로 구분**: semantic = RAG(텍스트 유사도), episodic = **SQL 쿼리 + (필요 시) semantic search**. "2,000개 메시지 중 딱 관련된 20개"를 뽑으려면 SQL만으론 부족하고 RAG가 붙는다는 예시.
5. **memory 자동 진화(consolidation) 게이트.** 대량 대화(예: 2,000건마다)를 저렴한 모델의 **summarizer agent**(또 하나의 harness)로 요약·distill해 semantic memory로 승격한다 — 비용·속도 최적화.
6. **loop engineering = harness의 일부.** tool call이 무한 반복될 위험을 막는 **end-loop guardrails**. "언제 충분한가(when is good enough)"를 아키텍처로 정의하는 일이다. planning 단계에서 사용자와 종료 조건을 confirm(예: "8명 환불까지 할까, 아니면 명단만 줄까").
7. **Claude Code hook 실전 예시.** 권한 대기(permission pending) 시 노트북 알림을 보내도록 hook/loop을 설정해 "25분 전에 멈춰 있던 걸 30분 뒤에 발견"하는 시간 낭비를 막는다. loop 종료·재입력 신호를 notification으로 받는 패턴.
8. **LLMOps = harness에 붙이는 feedback loop.** 3단계로 정식화한다: **① tracing(event tree 수집) → ② eval(good?·healthy?) → ③ diagnose→fix→ship**. LLM-as-judge로 점수화하고, latency·token·tool 성공 여부를 metric으로 삼는다.
9. **eval 통과 여부에 따른 분기(gate).** 통과하면 간단한 fix(더 나은 system prompt·model config·retrieval 파라미터)를 agent run에 반영하고 1 loop을 닫는다. 심각한 버그면 bug fix → 재실행 → 재trace → 재eval. 결과적으로 **self-evolving 자율 시스템**이 된다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

전체 그림은 좌(**harness system**)·우(**LLMOps system**) 두 블록이 feedback loop으로 연결된 구조다.

**좌: Harness (에이전트를 통제)**

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
   └────┬────┘   │  · episodic (time-series)│
        │        │  · semantic (facts, RAG) │
        │        └──────────────────────────┘
        │            ▲ consolidate (2,000건마다 summarizer agent → 저렴한 모델)
        ▼
   tool calls (CRM·Stripe·일정) ──► end-loop guardrails ──► reply
        └────────────── loop until "good enough" ──────────┘
```

- **working memory(context RAM)**: 매 run마다 question·chat history·system prompt를 조립. DB가 매번 관련 context를 여기로 feed back.
- **검색 경로 분기**: semantic memory는 RAG로, episodic memory는 SQL(+선택적 semantic search)로 찾는다.
- **loop**: tool call → 사고 → 추가 tool call … 을 종료 조건(guardrail)까지 반복. 종료 조건은 planning 시 사용자 confirm이거나 "task done" 규칙이다.

**우: LLMOps (에이전트를 평가·개선)**

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

- **tracing 도구 예시**: LangFuse, LangSmith.
- **harness 도구 예시**: LangGraph, LangChain, Pydantic.
- **저장소 예시**: AWS, Supabase, Google Cloud, Azure.
- 핵심 사상: tracing이 데이터를 모으는 1단계다. 그 데이터가 "좋았나 / 건강했나" 두 질문(eval)으로 갈라지고, 진단을 거쳐 prompt·config·retrieval 파라미터(knobs)를 갱신하면 **스스로 진화하는 루프**가 완성된다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

개념 강의라 정량 벤치마크는 없다. 대신 반복되는 **운영 휴리스틱·판단 기준**이 사실상의 결과물이다:

- **consolidation 임계값 예시**: "매 2,000 대화마다" 요약 승격 — 백만 고객 규모에서 매 대화 요약은 비현실적.
- **비용 최적화**: summarizer는 context가 커 비싸므로 저렴한 open-source 모델로 교체 가능.
- **latency 진단 기준**: "20초 vs 2ms" — 느리면 tool call 지연·과대 working memory·불필요한 retrieval을 의심.
- **불필요 retrieval 회피**: "내 생일은?"·"OpenAI 설립 시점?" 같은 질문은 모델이 이미 알아 거대 memory 검색이 필요 없다.
- **eval metric 3종**: 이벤트 실제 트리거 여부(예: 미팅이 실제 잡혔나), 응답 latency, token 사용량.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **입문용 추상화**: LangGraph/LangChain/Pydantic, LangFuse/LangSmith를 호명만 하고 코드·구현은 다루지 않는다. "prompting your way through"라는 표현대로 구현보다 멘탈 모델 전달이 목표다.
- **loop 설계는 case-by-case**: "one-solution-fits-all 없음"을 명시한다 — 종료 조건은 태스크·시스템마다 직접 설계해야 한다.
- **memory 시스템 깊이 생략**: 선행 영상으로 미루고 harness 관점만 빠르게 복습한다.
- **평가 자동화의 신뢰성**(LLM-as-judge의 편향·재현성) 등은 언급하지 않는다 — wiki의 evaluation 자료로 보완이 필요하다.

## 6. 관련 연구 (Related Work)

이 영상은 wiki에 이미 쌓인 harness/loop 계열 자료의 **입문용 종합판** 위치다.

- **[[overviews/agent-harness-engineering-overview]]** — 이 영상의 harness·loop·verification 축을 이미 6개 자료로 합성한 상위 지도. 본 영상은 그 개념들을 비전공자용 단일 비유로 압축한 버전.
- **[[agents/lee-hoyeon-2026-harness-engineering]]** — 구조→맥락→계획→실행→검증→개선 6축. 영상의 좌(harness)·우(LLMOps) = 실행+검증+개선 축과 대응.
- **[[agents/osmani-2026-loop-engineering]]**, **[[agents/lee-jeongmin-2026-loop-engineering-claude-code]]**, **[[agents/runkle-2026-the-art-of-loop-engineering]]** — loop engineering·end-loop guardrail의 심화. 영상의 Claude Code hook 알림 예시와 직접 연결.
- **[[agents/qiao-2026-memory-intelligence-agent]]**, **[[agents/zou-2026-task-focused-memorization-multimodal-agents]]** — procedural·semantic·episodic memory 3분법의 학술적 배경.
- **[[evaluations/marker-inc-korea-autorag]]**, **[[evaluations/kim-2026-ai-prd-eval-plan]]** — eval/LLMOps 파트의 실무 프레임(RAG 평가·eval plan 중심 PRD).

## 7. 용어집 (Glossary)

- **harness (하네스)**: LLM을 원하는 방향으로 통제하기 위해 바깥에 두는 도구·구조 집합(마구 비유). memory·tool·loop·guardrail을 포함.
- **agent run**: user input 1회 → reply 1회의 실행 단위. 내부 tool call 횟수와 무관.
- **working memory / context RAM**: 매 run마다 조립되는 단기 컨텍스트(질문+chat history+system prompt+검색된 memory).
- **procedural memory**: 에이전트의 행동 지침(skill, markdown 텍스트) — "how to act".
- **semantic memory / durable facts**: 지속되는 사실(사용자·엔티티 정보). RAG로 검색.
- **episodic memory**: timestamp 있는 과거 event/대화의 time-series. SQL(+semantic) 검색.
- **consolidation**: 대량 event를 summarizer agent로 요약·distill해 semantic memory로 승격하는 자동 진화.
- **loop engineering**: tool call 반복의 종료 시점을 설계하는 것(harness의 일부).
- **end-loop guardrails**: 루프를 언제 멈출지 정하는 조건("task done", 사용자 confirm 등).
- **LLMOps (LLM operations)**: harness의 성능을 관측·진단·개선하는 feedback loop.
- **tracing**: 한 agent run의 event tree(질문·retrieval·tool call·latency·token)를 기록. 예: LangFuse, LangSmith.
- **eval**: run이 "좋았나(good)/건강했나(healthy)"를 판정. LLM-as-judge 또는 결정론적 코드.
- **RAG (retrieval-augmented generation)**: 의미 유사도로 관련 텍스트를 검색해 컨텍스트로 주입.

