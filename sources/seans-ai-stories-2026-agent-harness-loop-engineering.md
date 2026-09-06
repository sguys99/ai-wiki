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

Sean's AI Stories가 공개한 20분 화이트보드 강의로, agent harness와 loop engineering, LLMOps, eval이라는 네 개의 버즈워드를 코드 한 줄 없이 하나의 비유로 꿴다. LLM은 인류의 지식은 알지만 사용자 개인과 그 소프트웨어가 원하는 방식은 모르는 강력한 말이고, harness는 그 말을 원하는 방향으로 달리게 하는 마구라는 비유다. 강의는 agent run이라는 관측 단위에서 출발해 장기 memory 3종, tool call 반복과 end-loop guardrail, tracing과 eval로 이어지는 LLMOps feedback loop까지를 하나의 아키텍처 그림으로 이어 붙인다.

## 1. 자료 정보 (Document Information)

- **채널**: Sean's AI Stories (@SeanAIStories). 진행자는 본문에서 Sean으로 지칭된다.
- **URL**: <https://www.youtube.com/watch?v=GrNbuWWJYiI>
- **업로드**: 2026-06-26
- **러닝타임**: 20:00 (영상 제목은 19분으로 표기한다)
- **자막**: YouTube 자동 생성 원어(en-orig) 자막을 `yt-dlp`로 취득해 평문으로 정제했다. 약 23,000자.
- **선행 영상 전제**: 진행자가 앞서 올린 "AI agent memories" 영상을 언급하며 memory 파트는 빠르게 복습하고 harness와 loop, LLMOps에 시간을 쓴다. RAG를 다룬 별도 영상도 여러 편 있다고 밝힌다.
- **성격**: 코드와 수식이 없는 개념 강의다. 화이트보드 아키텍처 다이어그램을 말로 그려 나가는 방식이라 도식은 영상 화면에만 존재하고 transcript에는 남지 않는다.
- **대상 독자**: 기술 배경 여부와 무관하게 따라올 수 있도록 설계했다고 도입부에서 밝힌다. 목표는 구현이 아니라 "prompting your way through", 즉 나중에 이런 시스템을 프롬프트로 지시해 만들 수 있을 만큼의 멘탈 모델 전달이다.

자동 자막의 음성인식 오류가 여러 곳에 있어 인용 시 주의가 필요하다.

| 자막 표기 | 실제 용어로 판단한 근거 | 판정 |
|---|---|---|
| Clockwork, clock code, cloud code | 코딩 중 권한 승인 팝업을 띄우고 훅을 걸 수 있는 도구로 설명한다 | Claude Code |
| hardness | 같은 문단에서 harness를 반복해서 쓴다 | harness |
| Asian runtime | agent run의 실행 환경을 가리키는 자리다 | agent runtime |
| Superbase | AWS, Google Cloud, Azure와 나란히 나열된 저장소다 | Supabase |
| Deep Seek | ChatGPT와 나란히 나열된 서비스명이다 | DeepSeek |
| Automanous | Salesforce, HubSpot과 나란히 나열된 CRM 제품이다 | CRM 제품명 미상 |
| Everyone's John | 본문에서 진행자를 Sean으로 지칭한다 | 도입 인사말의 오인식 |

## 2. 주요 기여 (Key Contributions)

1. **harness를 마구 비유로 일관되게 전개한다.** LLM은 인류의 지식과 과학, 생물학의 역사까지 아는 강력한 두뇌이지만 사용자 본인과 그 소프트웨어가 원하는 동작 방식은 전혀 모른다. 마구 없이 말에 올라타면 다치거나 엉뚱한 곳으로 가고, 전장이라면 그런 상황을 허용할 수 없다는 것이 비유의 확장이다. 통계 관점의 근거도 덧붙인다. LLM은 다음 단어의 확률을 예측하는 기술이므로 출력에 랜덤성이 섞이고, 문제 해결 국면에서는 그 랜덤성을 줄여야 한다.
2. **agent run을 관측 단위로 고정한다.** 사용자 입력 1회에서 응답 1회까지가 한 번의 agent run이며, 그 안에서 tool call이 몇 번 일어나든 단위는 변하지 않는다. 이 정의를 강의 후반의 tracing과 eval에서 그대로 관측 대상으로 재사용한다.
3. **기본 agent run이 ephemeral하다는 점을 문제로 제시한다.** 질문과 현재 대화 이력, system prompt만 working memory로 조립하면 memory가 전혀 남지 않는다. 예시 질문은 "Sam Altman이 OpenAI에서 언제 해고됐나"이고, 대화 이력의 예시는 "Elon Musk가 Sam Altman을 몰아붙이듯이 말해 달라"는 앞선 지시다.
4. **장기 memory 3종을 저장과 갱신, 검색 관점에서 분리한다.** procedural memory는 에이전트가 어떻게 행동해야 하는지를 담은 지시문이고, semantic memory는 지속되는 사실이며, episodic memory는 timestamp가 붙은 과거 이벤트의 시계열이다.
5. **memory 종류에 따라 검색 경로가 갈린다는 점을 짚는다.** semantic memory는 사실과 텍스트라서 RAG로 충분하지만, episodic memory는 시계열이라 SQL 쿼리가 먼저 필요하고 질문에 따라 semantic search를 추가로 붙여야 한다.
6. **memory 자동 진화 게이트를 설계 요소로 제시한다.** 대량 대화를 summarizer agent로 요약하고 distill해 semantic memory로 승격시키는 consolidation이다. summarizer agent 자체가 또 하나의 LLM harness이며 system prompt와 memory, 모델을 따로 설정할 수 있다.
7. **loop engineering을 harness의 일부로 규정한다.** loop 역시 기술을 원하는 대로 달리게 하는 통제 수단이라는 이유에서다. 핵심 설계 질문은 "언제가 충분히 좋은 지점인가"이고, 그 답을 아키텍처로 정의하는 장치가 end-loop guardrail이다.
8. **Claude Code 훅을 loop engineering의 일상 예시로 든다.** 권한 승인 대기가 걸리면 노트북에 알림을 보내도록 훅을 설정해, 루프가 멈춰 있는 것을 뒤늦게 발견하는 시간 낭비를 막는 방식이다.
9. **LLMOps를 harness에 붙이는 feedback loop로 정식화한다.** tracing으로 이벤트 트리를 모으고, eval에서 good과 healthy 두 질문으로 판정하며, diagnose 이후 게이트에서 간단한 개선과 버그 수정으로 갈라진다. 두 블록이 맞물리면 스스로 진화하며 성장하는 자율 시스템이 된다는 것이 강의의 결론이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

전체 그림은 왼쪽 harness 블록과 오른쪽 LLMOps 블록이 feedback loop으로 연결된 구조다.

### 3.1 기본 agent run

한 번의 agent run은 세 가지를 working memory로 조립하는 데서 시작한다. 사용자의 질문과 현재 대화 이력, 그리고 에이전트가 어떻게 행동해야 하는지를 담은 system prompt다. working memory는 컨텍스트를 담아 두는 RAM에 해당하며, 이 상태로는 ephemeral하다. 즉 run이 끝나면 아무것도 남지 않는다.

### 3.2 harness 블록

```
사용자 질문 + 대화 이력 + system prompt
        │
        ▼
   working memory (컨텍스트 RAM)  ◄──────┐
        │            ▲                   │
        ▼            │ retrieve          │ 응답마다 기록
   ┌─────────┐   ┌───┴──────────────────┴───┐
   │  LLM    │   │  데이터베이스              │
   │ (agent) │   │  procedural (파일, 텍스트) │
   └────┬────┘   │  episodic (시계열, SQL)    │
        │        │  semantic (사실, RAG)      │
        │        └───────────────────────────┘
        │            ▲ consolidate (2,000건마다 summarizer agent)
        ▼
   tool call (일정, CRM, 결제) ──► end-loop guardrail ──► 응답
        └──────────── task가 끝날 때까지 반복 ───────────┘
```

장기 memory 3종의 성격은 다음과 같다.

| 종류 | 담는 내용 | 저장 형태 | 검색 방식 |
|---|---|---|---|
| procedural | 에이전트의 행동 지침, 스킬 지시문 | 마크다운 파일이나 텍스트 | 강의에서 별도로 언급하지 않는다 |
| semantic (durable facts) | 지속되는 사실. "Sean이 누구이고 과거에 무엇을 만들었나" | 요약되고 distill된 사실 | RAG |
| episodic | timestamp가 붙은 과거 이벤트와 대화 이력 | 발생 순서대로 쌓인 긴 목록 | SQL, 필요하면 semantic search 추가 |

semantic memory에는 조건이 하나 붙는다. 유명하지 않은 개인의 정보는 모델의 학습 데이터에 없으므로 직접 주입해야 하고, 이미 유명한 사람이라면 이 단계를 건너뛸 수 있다. 강의의 예시는 진행자 본인의 초기 스타트업 경험을 Sam Altman의 초기 경험과 비교하게 하려면 에이전트가 진행자를 알아야 한다는 것이다. episodic memory의 예시는 "마지막으로 취업 준비를 한 게 언제였나" 같은 질문이다.

memory는 저절로 생기지 않으므로 데이터베이스에 저장하고 계속 갱신해야 한다. AWS와 Supabase, Google Cloud, Azure 같은 곳을 예시로 들고, 집에 직접 서버를 두는 선택지는 비용이 커서 권하지 않는다고 덧붙인다. 갱신 데이터는 직전 LLM 응답에서 나온다.

### 3.3 consolidation 게이트

semantic memory를 사람이 직접 입력하는 대신 시스템이 스스로 진화하게 만드는 장치다. 예시는 D2C 이커머스 브랜드다. 고객이 백만 명 규모이면 "제품이 작동하지 않을 때 환불은 어떻게 받나" 같은 문의가 수없이 반복된다. 이런 대화를 요약하고 distill해 semantic memory에 사실로 올려 둔다.

문제는 비용이다. Alibaba나 Amazon 규모에서 대화 하나하나를 요약하는 것은 타당하지 않고 비용도 크다. 그래서 게이트를 두고 예를 들어 대화 2,000건마다 한 번씩 시간순 이벤트를 묶어 summarizer agent에 넘긴다. summarizer agent는 그 자체가 또 하나의 LLM harness라서 system prompt를 정의하고 memory를 넣고 모델을 골라 쓸 수 있다. 넣는 텍스트가 많아 컨텍스트가 커지고 비용이 오르므로 더 저렴한 오픈소스 모델로 바꿀 수 있다. 승격된 사실은 검색도 더 빠르다.

### 3.4 memory 검색 경로

강의는 같은 이커머스 상황에서 두 질문을 대비시켜 검색 경로의 차이를 보인다.

| 질문 | 필요한 수단 | 이유 |
|---|---|---|
| "이 미국 고객과 나눈 최근 대화 10건은?" | SQL 쿼리 |  최근 이벤트를 날짜로 추리면 된다 |
| "제품 품질 불만이 있었고 에이전트가 해결하지 못한 대화 20건은?" | SQL 쿼리에 semantic search 추가 | 불만 내용이 텍스트라서 의미를 맞춰야 한다 |

두 번째 질문에서 필요한 것은 2,000개 메시지 전부가 아니라 그중 정확히 관련된 20개다. 날짜 테이블만 훑는 SQL로는 그 20개를 고를 수 없으므로 RAG로 사용자 질문과 텍스트의 의미를 맞춰 working memory에 올릴 컨텍스트를 고른다.

### 3.5 tool call과 loop

에이전트는 memory를 읽기만 하지 않고 도구를 호출한다. 강의가 드는 도구는 일정 잡기, CRM의 고객 데이터 읽기와 쓰기, Stripe나 Alipay의 결제 정보 조회다. tool call은 한 번으로 끝나지 않고 여러 번 이어질 수 있다.

여기서 통제가 필요해진다. LLM에 전권을 주면 호출을 무한히 반복할 수 있고, 언제 멈춰야 하는지나 어떤 tool call이 옳은지, 어느 시점의 응답이 충분히 좋은지를 스스로 판단하지 못할 수 있다. 그래서 end-loop guardrail을 둔다.

강의의 loop 예시는 다음 지시문이다. "고객이 우리 제품에 대해 무엇을 불평하는지 알아내고, 그들을 되찾기 위한 후속 조치를 정하고, 환불 요청이 있었는데 아직 처리하지 않았다면 처리하라." 여러 질문이 한 번에 던져진 형태다. 에이전트의 진행은 다음과 같다.

1. Salesforce나 HubSpot 같은 CRM을 읽어 지난 2개월간 고객 불만 30건을 확인한다.
2. 그중 12건은 환불이 완료됐고 8건은 처리되지 않았음을 파악한다.
3. 1차 조회 결과를 바탕으로 다시 판단하고, 환불받지 못한 8명과 미팅을 잡는 tool call을 추가로 낸다.
4. 더 나아가면 Stripe나 Alipay의 환불 트리거로 실제 환불까지 실행한다.

task가 끝날 때까지 반복되는 구조라서 loop이다. 다만 태스크와 시스템 구성에 따라 달라지는 사안이라 하나의 정답은 없다고 명시한다.

### 3.6 end-loop guardrail

loop에서 가장 중요한 부분은 언제 멈춰야 하는지를 아는 것이다. 종료 조건은 단순히 "task가 끝났다"일 수도 있다. 또 하나의 방법은 planning 단계에서 사용자와 종료 지점을 확정하는 것이다. 위 예시라면 에이전트가 "나머지 8명에게 환불을 진행할까요, 아니면 명단만 알려 드리고 나중에 직접 처리하시겠습니까"라고 되묻는다. 사용자가 어느 쪽을 고르든 그 선택이 loop에 종료 시나리오를 알려 주는 신호가 된다.

실무 예시는 Claude Code 훅이다. 코딩 중 권한 승인 팝업이 뜨면 노트북에 알림을 보내도록 훅을 걸어 둔다. 그렇게 하지 않으면 유튜브를 보다가 30분 뒤에 돌아왔을 때 25분 전부터 한 권한에서 멈춰 있었다는 것을 발견하게 되고, 그만큼이 낭비다. loop이 끝났거나 다시 입력이 필요하다는 신호를 알림으로 받는 패턴이다.

여기까지가 harness 시스템이다. memory 시스템과 loop engineering, 그리고 응답을 내보내는 종료 트리거가 하나로 묶인 집합이다. harness 구축 도구로는 LangGraph와 LangChain, Pydantic을 예시로 든다.

### 3.7 LLMOps 블록

```
agent run ──► ① tracing: 이벤트 트리
                (질문, retrieval, tool call 횟수, latency, 토큰)
                     │
                     ▼
              ② eval: good? healthy?  (LLM-as-judge 또는 결정론적 코드)
                     │  대시보드와 metric
                     ▼
              ③ diagnose → 게이트
                 ├─ 통과: system prompt, 모델 설정, 파라미터 개선을 agent run에 반영
                 └─ 심각한 버그: 수정 → 재실행 → 재tracing → 재eval
```

LLMOps가 필요한 이유는 harness만으로는 성능을 알 수 없기 때문이다. 강의는 Y Combinator가 늘 언급하는 버즈워드로 eval과 LLMOps를 소개하고, 던져야 할 질문 두 가지를 제시한다. 이 에이전트가 내 비즈니스와 사용 사례에서 제대로 동작하고 있는가, 그리고 고치는 방법에 대한 피드백을 계속 받아 스스로 고칠 수 있는가.

여기서 "고친다"는 것은 세 가지를 뜻한다. 더 나은 system prompt를 쓰는 것, 더 나은 모델 설정을 쓰는 것, 에이전트의 memory를 검색하는 방식을 바꾸는 것이다.

**① tracing.** 모든 agent run을 이벤트 트리로 기록한다. 사용자가 실제로 무엇을 물었는지, 모델이 어떤 retrieval을 수행했는지, tool을 몇 번 호출하고 사용 결과가 어땠는지, 전체 실행에 걸린 시간이 얼마인지, 토큰을 얼마나 썼는지를 담는다. 데이터를 모으는 1단계다. 도구로는 LangFuse와 LangSmith를 예시로 든다.

**② eval.** 모아 둔 데이터를 두 질문으로 가른다. 좋은 실행이었나(good), 그리고 건강했나(healthy). LLM-as-judge로 점수를 매길 수 있고 결정론적 코드로 검사할 수도 있다. metric 예시는 세 가지다.

| metric | 확인 내용 |
|---|---|
| 이벤트 실제 발생 여부 | 미팅 일정 태스크였다면 미팅이 실제로 잡혔는가 |
| 응답 latency | 응답까지 20초가 걸렸는가 2밀리초가 걸렸는가 |
| 토큰 사용량 | 이번 실행에 토큰을 얼마나 썼는가 |

**③ diagnose와 게이트.** 무엇이 어디서 왜 깨졌는지를 대시보드의 metric으로 진단한다. 미팅 일정 이벤트가 한 번도 발동하지 않았다면 그 원인을 파고들어야 하고, 이때 Claude의 코딩 에이전트에 넘겨 심층 분석을 맡길 수 있다고 덧붙인다. latency 진단의 후보 원인은 다음과 같다.

| 증상 | 의심할 원인 |
|---|---|
| 응답이 2밀리초가 아니라 20초 걸린다 | tool call 하나가 지나치게 오래 걸린다 |
| | working memory가 너무 커서 검색과 응답이 느려진다 |
| | 모든 질문에 거대한 memory 검색을 붙이고 있다 |

마지막 항목의 예시는 "내 생일은 언제인가"나 "OpenAI는 언제 시작했나" 같은 단순 질문이다. 이런 정보는 모델이 이미 알고 있으므로 대량 retrieval이 필요 없다는 설명이다.

진단 다음에 게이트가 온다. 통과 기준은 사용자가 규칙으로 정의한다.

| 게이트 결과 | 조치 |
|---|---|
| eval 통과 | system prompt의 새 버전, 모델 설정 갱신, tool 변경, retrieval 파라미터 조정 같은 간단한 수정을 배포한다. LLMOps가 개선된 system prompt와 모델 설정을 agent run 시스템으로 돌려보내면 한 번의 LLMOps loop이 끝난다 |
| 심각한 결함 | 최신 system prompt를 배포하는 것으로 해결되지 않으므로 버그를 고치고 agent run을 다시 실행하며 질문을 다시 보내고 이벤트를 다시 tracing한 뒤 eval을 다시 수행한다 |

두 블록을 합치면 모든 실행이 추적되고 관측되며, 문제를 진단하고 고쳐 system prompt와 모델 설정, 각종 파라미터의 최신 갱신을 배포하는 구조가 된다. 강의는 이를 스스로 진화하며 시간이 갈수록 성장하는 자율 시스템이라고 정리한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

개념 강의라 정량 벤치마크는 없다. 대신 반복해서 제시되는 운영 휴리스틱과 판단 기준이 사실상의 결과물이다.

| 판단 지점 | 강의가 제시한 기준 |
|---|---|
| consolidation 주기 | 고객 백만 명 규모라면 대화 2,000건마다 한 번 요약해 승격한다. 대화마다 요약하는 방식은 비용상 타당하지 않다 |
| summarizer 모델 선택 | 넣는 텍스트가 많아 컨텍스트가 커지고 비싸지므로 더 저렴한 오픈소스 모델로 대체할 수 있다 |
| latency 기준 | 20초와 2밀리초를 대비 사례로 든다. 20초면 tool call 지연, 과대한 working memory, 불필요한 retrieval을 의심한다 |
| retrieval 생략 판단 | 모델이 이미 아는 단순 질문에는 거대 memory 검색을 붙이지 않는다 |
| eval metric | 이벤트가 실제로 발동했는지, 응답 latency, 토큰 사용량 세 가지 |
| loop 종료 조건 | task 완료 신호 또는 planning 단계의 사용자 확정. 하나의 정답은 없다 |
| 자체 서버 운영 | 집에 서버를 직접 두는 선택지는 비용이 커서 권하지 않는다 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **입문용 추상화에 머문다.** LangGraph와 LangChain, Pydantic, LangFuse, LangSmith를 이름만 부르고 코드나 구현은 다루지 않는다. 도입부에서 밝힌 목표 자체가 구현이 아니라 나중에 프롬프트로 지시해 만들 수 있을 만큼의 멘탈 모델 전달이다.
- **loop 설계는 사례마다 다르다.** 하나의 정답이 없다고 명시하므로 종료 조건은 태스크와 시스템 구성에 맞춰 직접 설계해야 한다.
- **memory 시스템의 깊이를 생략한다.** 선행 영상으로 미루고 harness 관점에서만 빠르게 복습한다.
- **자료 내부에 일관되지 않은 예시가 있다.** 불필요한 retrieval의 예시로 "내 생일은 언제인가"를 들며 모델이 이미 안다고 설명한다. 그런데 같은 강의가 앞서 유명하지 않은 개인의 사실은 모델이 학습하지 않았으므로 semantic memory에 직접 주입해야 한다고 말했다. 개인의 생일은 후자에 해당하므로 두 설명이 서로 어긋난다. 자막 오인식일 가능성도 있으나 확인할 수단이 없다.
- **평가 자동화의 신뢰성을 다루지 않는다.** LLM-as-judge의 편향이나 재현성, 채점 기준 설계 같은 문제는 언급하지 않는다. wiki의 evaluations 카테고리 자료로 보완이 필요하다.
- **보안과 권한 설계가 빠져 있다.** 에이전트가 Stripe와 Alipay의 환불을 실제로 실행하는 시나리오까지 제시하지만, 승인 절차나 권한 범위, 실패 시 롤백은 다루지 않는다.

## 6. 관련 연구 (Related Work)

이 영상은 wiki에 이미 쌓인 harness와 loop 계열 자료의 입문용 종합판에 해당한다.

- [[overviews/agent-harness-engineering-overview]]: harness와 loop, verification을 여러 자료로 합성한 상위 지도. 이 영상은 같은 개념을 비전공자용 단일 비유로 압축한 버전이다.
- [[agents/lee-hoyeon-2026-harness-engineering]]: 구조에서 개선까지 6단계로 harness를 나눈 국내 정리. 영상의 harness 블록과 LLMOps 블록이 그 실행, 검증, 개선 단계에 대응한다.
- [[agents/osmani-2026-loop-engineering]]: loop engineering을 패러다임 명칭으로 굳힌 에세이. 영상의 end-loop guardrail은 이 글의 종료 조건 논의와 직접 겹친다.
- [[agents/lee-jeongmin-2026-loop-engineering-claude-code]], [[agents/runkle-2026-the-art-of-loop-engineering]]: loop 종료 조건과 Claude Code 훅 운용의 심화.
- [[agents/qiao-2026-memory-intelligence-agent]], [[agents/zou-2026-task-focused-memorization-multimodal-agents]]: procedural, semantic, episodic 3분법의 학술적 배경.
- [[evaluations/marker-inc-korea-autorag]], [[evaluations/kim-2026-ai-prd-eval-plan]]: eval과 LLMOps 파트를 실무 프레임으로 잇는 자료.

## 7. 용어집 (Glossary)

- **agent run**: 사용자 입력 1회에서 응답 1회까지의 실행 단위. 내부 tool call 횟수와 무관하다.
- **working memory**: 매 agent run마다 조립되는 단기 컨텍스트. 질문과 대화 이력, system prompt, 검색된 memory로 구성된다. 강의는 컨텍스트 RAM이라고도 부른다.
- **procedural memory**: 에이전트가 어떻게 행동해야 하는지를 담은 지시문. 마크다운 파일이나 텍스트 형태이며 스킬이라는 이름으로 불린다.
- **semantic memory (durable facts)**: 지속되는 사실. 유명하지 않은 개인의 정보는 모델이 학습하지 않았으므로 직접 주입해야 한다.
- **episodic memory**: timestamp가 붙은 과거 이벤트와 대화의 시계열.
- **consolidation**: 대량 이벤트를 summarizer agent로 요약하고 distill해 semantic memory로 승격하는 자동 진화 장치.
- **summarizer agent**: consolidation을 수행하는 별도 LLM harness. system prompt와 memory, 모델을 따로 설정하며 저렴한 오픈소스 모델을 쓸 수 있다.
- **end-loop guardrail**: tool call 반복을 언제 멈출지 정하는 조건. task 완료 신호이거나 planning 단계에서 사용자와 확정한 종료 지점이다.
- **LLMOps**: harness의 성능을 관측하고 진단하며 개선하는 feedback loop. large language model operations의 약어다.
- **tracing**: 한 번의 agent run을 이벤트 트리로 기록하는 단계. 질문과 retrieval, tool call 횟수, latency, 토큰을 담는다.
- **eval**: 기록된 데이터를 good과 healthy 두 질문으로 판정하는 단계. LLM-as-judge 또는 결정론적 코드로 수행한다.
- **latency**: 한 번의 실행이 응답까지 걸린 시간. 강의는 20초와 2밀리초를 대비 사례로 든다.
