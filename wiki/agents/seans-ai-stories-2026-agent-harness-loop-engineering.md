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

## 요약

Sean's AI Stories가 2026년 6월 26일 공개한 20분 화이트보드 강의다. agent harness와 loop engineering, LLMOps, eval이라는 네 개의 버즈워드를 코드 한 줄 없이 하나의 아키텍처 그림으로 이어 붙인다.

강의를 관통하는 비유는 말과 마구다. LLM은 인류의 지식과 과학, 생물학의 역사까지 아는 강력한 두뇌이지만 사용자 개인이 누구인지, 그리고 그 사용자의 소프트웨어가 어떤 방식으로 동작하기를 원하는지는 전혀 모른다. harness는 그 말을 원하는 방향으로 달리게 하는 마구에 해당하는 도구 집합이다.

전체 구조는 두 블록이 feedback loop으로 맞물린 형태다. 왼쪽 harness 블록은 에이전트를 통제하고, 오른쪽 LLMOps 블록은 에이전트를 평가하고 개선한다. harness 블록에는 working memory와 장기 memory 3종, tool call 반복, 그리고 반복을 멈추는 end-loop guardrail이 들어간다. LLMOps 블록은 tracing으로 데이터를 모으고 eval로 판정한 뒤 진단 결과를 harness로 돌려보낸다.

이 페이지는 비전공자용 입문 강의를 정리한 것이므로 구현 근거가 아니라 멘탈 모델로 읽는 편이 적절하다. 정량 벤치마크는 없고 도구 이름은 예시로만 호명된다. 같은 주제를 더 깊게 다루는 자료는 [[overviews/agent-harness-engineering-overview]]와 그 아래 링크된 페이지들이다.

## 배경

### 버즈워드를 building block으로 되돌리기

강의의 출발점은 최근 AI 에이전트 분야에서 가장 많이 쓰이는 네 개의 용어다. agent harness, loop engineering, LLMOps(large language model operations의 약어), 그리고 eval(에이전트 평가 시스템)이다. RAG는 뒤에서 별도로 등장하는 다섯 번째 용어다.

진행자의 진단은 이 용어들이 유행하는 이유가 복잡해서가 아니라는 것이다. 오히려 각각이 매우 단순한 building block이고, 단순한 블록을 조합해야 지능적으로 동작하는 큰 아키텍처를 만들 수 있다는 관점을 취한다.

대상 독자도 명시한다. 기술 배경 여부와 무관하게 따라올 수 있도록 설계했고, 목표는 직접 구현하는 능력이 아니라 나중에 이런 시스템을 프롬프트로 지시해 만들 수 있을 만큼의 멘탈 모델이다.

### 기본 agent run이 남기지 못하는 것

강의는 가장 단순한 실행 형태를 먼저 그린다. 사용자가 ChatGPT나 DeepSeek 같은 서비스에 질문을 던지고 응답을 받는 한 번의 흐름이다. 예시 질문은 "Sam Altman이 OpenAI에서 언제 해고됐나"다.

이 흐름에서 모델에 들어가는 것은 세 가지다. 사용자의 질문, 현재 대화 이력, 그리고 에이전트가 어떻게 행동해야 하는지를 담은 system prompt다. 대화 이력의 예시로는 "Elon Musk가 Sam Altman을 몰아붙이듯이 말해 달라"는 앞선 지시를 든다. 세 가지가 working memory에 조립되고 LLM이 질의응답 에이전트로 동작해 응답을 낸다.

문제는 이 구조가 ephemeral하다는 점이다. 즉 실행이 끝나면 아무것도 남지 않는다. 대화 이력은 현재 세션의 것뿐이고 그 바깥의 지식은 존재하지 않는다. 에이전트 시스템을 실제로 운영하려면 이 단기 memory 위에 무언가를 더 쌓아야 하고, 그 추가 구조 전체를 강의는 harness라고 부른다.

### memory 복습이 harness로 이어지는 지점

강의가 앞선 영상의 memory 내용을 다시 꺼내는 이유도 밝혀 둔다. 같은 내용을 반복하는 것처럼 보이지만, 지금까지 다룬 것 전체가 결국 하나의 사실을 말하고 있기 때문이라는 설명이다.

그 사실은 LLM이 이 일들을 혼자서는 해내지 못한다는 것이다. working memory를 조립하는 일도, 과거 대화를 꺼내 오는 일도, 사용자가 누구인지 기억해 두는 일도 모델 바깥에서 누군가 해 줘야 한다. 모델을 감싸는 그 바깥 구조에 붙은 이름이 harness다.

## 핵심 개념

**harness**는 모델을 감싸 도구와 검증, 상태를 제공하는 실행 환경이다. 이 강의는 어원 쪽에서 접근한다. harness의 원래 뜻은 말을 탈 때 말을 통제하는 데 쓰는 도구 모음이고, LLM이 말이라면 harness는 그 말에 씌우는 마구다. 마구 없이 말에 올라타면 다치거나 엉뚱한 곳으로 가게 되고, 전장이라면 그런 상황을 허용할 수 없다는 것이 비유의 확장이다.

강의는 harness를 LLM이 원하는 방식으로 동작하도록 그 주위에 짜는 에이전트 프레임워크라고 여러 번 되풀이해 정의한다.

**agent run**은 사용자 입력 1회에서 응답 1회까지의 실행 단위다. 그 안에서 tool call이 몇 번 일어나든 단위는 하나로 센다. 이 정의는 강의 후반의 tracing과 eval에서 그대로 관측 대상이 되므로, 처음부터 못박아 두는 것이 중요하다.

**working memory**는 매 agent run마다 새로 조립되는 단기 컨텍스트다. 강의는 컨텍스트를 담아 두는 RAM이라고도 부른다. 질문과 대화 이력, system prompt, 그리고 데이터베이스에서 검색해 온 장기 memory가 여기 모인다.

**장기 memory**는 working memory 바깥에 지속되는 세 종류의 저장소다. procedural memory는 행동 지침, semantic memory는 지속되는 사실, episodic memory는 timestamp가 붙은 과거 이벤트의 시계열을 담는다.

**RAG**(retrieval-augmented generation)는 의미가 가까운 텍스트를 찾아 컨텍스트로 주입하는 검색 방식이다. 강의는 검색을 여러 차례 언급한 뒤 이 지점에서야 용어를 붙이고, RAG 자체를 다룬 별도 영상이 여러 편 있다고 밝힌다.

**consolidation**은 대량의 대화를 요약하고 distill해 semantic memory로 승격시키는 자동 진화 장치다. 사람이 사실을 일일이 입력하지 않아도 시스템이 스스로 memory를 채우게 만드는 경로다.

**loop engineering**은 에이전트를 도는 루프 자체를 설계 대상으로 삼는 관점이다. 강의는 이를 harness와 별개의 개념으로 두지 않고 harness의 일부로 규정한다. 루프 역시 기술을 원하는 방향으로 달리게 하는 통제 수단이라는 이유에서다.

**end-loop guardrail**은 tool call 반복을 언제 멈출지 정하는 조건이다. 설계 질문은 "언제가 충분히 좋은 지점인가"이고, 그 답을 아키텍처 수준에서 고정하는 장치다.

**LLMOps**는 harness의 성능을 관측하고 진단하며 개선하는 feedback loop이다. 강의는 Y Combinator가 늘 언급하는 버즈워드로 eval과 LLMOps를 소개한다.

## 방법

### harness가 필요한 통계적 이유

강의는 비유에만 기대지 않고 근거를 하나 덧붙인다. 통계나 기계학습을 공부한 사람이라면 LLM이 다음에 나올 단어의 확률을 예측하는 기술이라는 점을 안다. 모든 출력이 확률에서 나오므로 랜덤성이 섞인다.

문제를 풀 때는 그 랜덤성이 지나치게 많으면 곤란하다. 따라서 기술을 잘 통제할 수단이 필요하고, 그 수단의 총칭이 harness다. 여기까지가 강의가 harness라는 개념을 도입하는 논리다.

### 장기 memory 3종

harness가 제공해야 할 첫 번째 요소는 단기 working memory 위에 올라가는 장기 memory다. 강의는 세 종류를 담는 내용과 저장 형태, 검색 방식으로 나누어 설명한다.

| 종류 | 담는 내용 | 저장 형태 | 검색 방식 |
|---|---|---|---|
| procedural | 에이전트의 행동 지침과 스킬 지시문 | 마크다운 파일이나 텍스트 | 강의에서 별도로 언급하지 않는다 |
| semantic (durable facts) | 지속되는 사실. 사용자가 누구이고 과거에 무엇을 만들었나 | 요약되고 distill된 사실 | RAG |
| episodic | timestamp가 붙은 과거 이벤트와 대화 이력 | 발생 순서대로 쌓인 긴 목록 | SQL, 필요하면 semantic search 추가 |

procedural memory는 에이전트가 사람에게 어떻게 응답해야 하는지를 정한다. 마구 비유로 옮기면 말을 더 빠르게 달리게 할지 느리게 달리게 할지를 정하는 부분이다. 보통은 파일이나 텍스트 형태이며, 최근 스킬이라는 이름으로 불리는 것도 결국 에이전트에 넣어 주는 마크다운 파일 속 텍스트 조각이다.

semantic memory에는 조건이 하나 붙는다. 유명하지 않은 개인의 정보는 모델의 학습 데이터에 없으므로 직접 주입해야 하고, 이미 유명한 사람이라면 이 단계를 건너뛸 수 있다. 강의의 예시는 진행자 본인의 초기 스타트업 경험을 Sam Altman의 초기 경험과 비교하게 만드는 상황이다. 그러려면 에이전트가 진행자가 누구이고 과거에 무엇을 만들었는지를 사실로 알고 있어야 한다.

episodic memory의 예시는 "마지막으로 취업 준비를 한 게 언제였나" 같은 질문이다. 현재 대화에는 없는 과거 이벤트라서 별도의 시계열 저장소에서 꺼내 와야 한다. 더 복잡한 시스템이라면 과거 대화뿐 아니라 과거에 발동한 트리거까지 여기에 쌓인다.

### memory 저장소와 갱신 경로

memory는 저절로 생기지 않으므로 저장소가 필요하다. 강의가 드는 예시는 AWS와 Supabase, Google Cloud, Azure다. 집에 직접 서버를 두는 선택지도 있지만 비용이 커서 권하지 않는다고 덧붙인다.

갱신 경로는 단순하다. 에이전트가 질문에 응답할 때마다 그 메시지를 데이터베이스로 보낸다. 반대 방향으로는 새 질문이 들어올 때마다 데이터베이스가 관련 컨텍스트를 찾아 working memory로 되먹임한다. 갱신에 쓰이는 데이터는 직전 LLM 응답에서 나온다.

episodic memory의 저장 방식은 특히 단순하다. 일어난 일을 하나도 빠짐없이 추적해 두면 timestamp가 붙은 아주 긴 목록이 된다. 반면 semantic memory는 사람이 직접 입력하거나 시스템이 스스로 채우게 만들어야 한다.

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

### consolidation 게이트

semantic memory를 시스템이 스스로 채우게 만드는 장치가 consolidation이다. 강의의 예시는 D2C 이커머스 브랜드다. 고객이 백만 명 규모이면 "제품이 작동하지 않을 때 환불은 어떻게 받나" 같은 문의가 고객 응대 에이전트에게 수없이 반복된다. 이런 대화를 요약하고 distill해 semantic memory에 사실로 올려 두면 된다.

문제는 비용이다. Alibaba나 Amazon 규모의 브랜드에서 대화 하나하나를 요약하는 것은 타당하지 않고 비용도 크다. 그래서 harness 관점에서 영리하게 처리할 필요가 있고, 시스템이 알아서 처리하도록 만들어야 한다.

강의가 제시하는 단순한 방법은 게이트를 두는 것이다. 예를 들어 대화 2,000건마다 한 번씩 시간순 이벤트를 묶어 summarizer agent에 넘긴다. summarizer agent는 그 자체가 또 하나의 LLM harness라서 세 가지를 따로 설정할 수 있다.

- system prompt를 별도로 정의한다.
- 필요하면 memory도 함께 넣는다.
- 모델을 다르게 고른다.

세 번째 항목에 비용 최적화가 걸려 있다. 넣는 텍스트가 많아 context window가 커지면 호출 비용이 오르므로 더 저렴한 오픈소스 모델로 대체할 수 있다. 승격의 효과는 두 가지다. memory 시스템이 계속 갱신되고, 요약된 사실은 원본 대화보다 검색이 빠르다.

### harness 블록의 데이터 흐름

강의는 여기서 한 번 멈추고 지금까지 조립한 harness의 흐름을 처음부터 되짚는다. 순서는 네 단계다.

1. 사용자가 프롬프트를 보내면 agent runtime이 현재 대화 이력과 에이전트의 행동 방식을 정한 system prompt를 함께 모아 working memory를 준비한다.
2. 에이전트가 질문에 답할 때마다 그 메시지를 데이터베이스로 보낸다.
3. 새 질문이 들어와 관련 컨텍스트를 확인할 때마다 데이터베이스가 working memory로 되먹임한다.
4. 데이터베이스가 지나치게 커지면 요약 정보나 distill된 사실로 묶어 semantic memory에 제대로 저장하고, 그 덕분에 이후 검색이 빨라진다.

네 단계의 공통점은 working memory를 중심에 두고 데이터가 양방향으로 오간다는 것이다. 쓰기는 응답마다 일어나고, 읽기는 질문마다 일어나며, 요약은 임계값에 도달할 때만 일어난다.

### memory 검색 경로의 분기

검색 방식은 memory 종류에 따라 갈린다. semantic memory는 사실과 텍스트, 파일이라서 RAG만으로 충분하다. episodic memory는 시계열이라 사정이 다르다.

강의는 같은 이커머스 상황에서 두 질문을 나란히 놓아 차이를 보인다.

| 질문 | 필요한 수단 | 이유 |
|---|---|---|
| "이 미국 고객과 나눈 최근 대화 10건은?" | SQL 쿼리 | 최근 이벤트를 날짜로 추리면 된다 |
| "제품 품질 불만이 있었고 에이전트가 해결하지 못한 대화 20건은?" | SQL 쿼리에 semantic search 추가 | 불만 내용이 텍스트라서 의미를 맞춰야 한다 |

두 번째 질문에서 필요한 것은 2,000개 메시지 전부가 아니라 그중 정확히 관련된 20개다. SQL은 날짜가 붙은 이벤트를 테이블에서 가져오는 데까지만 유효하다. 불만의 내용은 자유 텍스트이므로 사용자 질문과 의미를 맞추는 단계가 따로 필요하고, 그 단계가 RAG다. 그렇게 골라낸 20개만 working memory로 올라간다.

### tool call과 loop의 전개

에이전트는 memory를 읽기만 하지 않는다. 작업을 수행하고 도구를 호출한다. 강의가 드는 도구는 일정 잡기, CRM 시스템의 고객 데이터 읽기와 쓰기, Stripe나 Alipay의 결제 정보 조회다. 그리고 tool call은 한 번으로 끝나지 않고 여러 번 이어질 수 있다.

여기서 통제 문제가 생긴다. LLM에 전권을 주면 호출을 계속 반복할 수 있고, 언제 멈춰야 하는지나 어떤 tool call이 옳은지, 어느 시점의 응답이 충분히 좋은지를 스스로 판단하지 못할 수 있다.

강의의 loop 예시는 다음 지시문이다. "고객이 우리 제품에 대해 무엇을 불평하는지 알아내고, 그들을 되찾기 위한 후속 조치를 정하고, 환불 요청이 있었는데 아직 처리하지 않았다면 처리하라." 여러 질문이 한 번에 던져진 형태이며, 실무에서는 이런 덩어리 지시가 흔하다.

에이전트는 먼저 이 태스크를 끝내는 데 도움이 될 도구를 고른다. 이후 진행은 다음과 같다.

1. Salesforce나 HubSpot 같은 CRM을 읽어 지난 2개월간 고객 불만 30건을 확인한다.
2. 그중 12건은 환불이 완료됐고 나머지 8건은 처리되지 않았음을 파악한다.
3. 1차 조회 결과를 놓고 다시 판단한 뒤, 환불받지 못한 8명과 미팅을 잡는 tool call을 추가로 낸다.
4. 더 나아가면 Stripe나 Alipay의 환불 트리거를 직접 호출해 실제 환불까지 실행한다.

task가 끝날 때까지 이 조회와 판단, 추가 호출이 반복되므로 loop이다. 다만 태스크가 무엇인지와 시스템을 어떻게 구성했는지에 따라 달라지는 사안이라 하나의 정답은 없다고 강의는 명시한다.

### end-loop guardrail의 두 형태

loop에서 가장 중요한 부분은 언제 멈춰야 하는지를 아는 것이다. 강의는 종료 조건을 두 가지 형태로 제시한다.

첫째는 단순히 task가 끝났다는 신호다. 정해진 작업이 완료되면 반복을 멈추고 응답한다.

둘째는 planning 단계에서 사용자와 종료 지점을 확정하는 방식이다. 위 예시라면 에이전트가 실행 전에 되묻는다. "나머지 8명에게 환불을 진행할까요, 아니면 명단만 알려 드리고 나중에 직접 처리하시겠습니까." 사용자가 어느 쪽을 고르든 그 선택이 loop에 종료 시나리오를 알려 주는 신호가 된다. 두 선택지는 서로 다른 결정이며, 확정하는 행위 자체가 loop에 끝이 있다는 것을 알려 주는 절차다.

### Claude Code 훅 사례

강의는 자신이 최근에 본 실무 예시로 Claude Code 훅을 든다. 코딩 작업 중 권한 승인을 요구하는 창이 뜨는 상황이 출발점이다.

여기에 loop engineering을 적용하는 방법은 훅을 하나 걸어 두는 것이다. 권한 승인을 기다리는 상태가 되면 노트북으로 알림을 보내도록 지시해 둔다.

그렇게 하지 않으면 유튜브를 보다가 30분 뒤에 돌아왔을 때 25분 전부터 한 권한에서 멈춰 있었다는 것을 발견하게 된다. 그만큼이 낭비다. 이 패턴의 핵심은 loop이 끝났거나 다시 사람의 입력이 필요하다는 신호를 알림으로 받아 낸다는 데 있다.

### harness 구축 도구

여기까지가 harness 시스템 전체다. agent run과 memory 시스템, loop engineering, 그리고 응답을 내보내는 종료 트리거가 하나로 묶인 집합이다. 강의가 이름을 부르는 도구는 다음과 같다.

| 역할 | 예시 도구 |
|---|---|
| harness 구축 | LangGraph, LangChain, Pydantic |
| memory 저장소 | AWS, Supabase, Google Cloud, Azure |
| tracing | LangFuse, LangSmith |
| tool 연동 대상 | Salesforce, HubSpot, Stripe, Alipay |

강의는 이들을 이름만 부르고 코드나 설정은 다루지 않는다. 어떤 도구를 고를지보다 각 자리에 무엇이 놓여야 하는지를 이해하는 것이 이 강의의 목표다.

## LLMOps 피드백 루프

### LLMOps가 필요한 이유

harness만으로는 시스템이 얼마나 잘 동작하는지 알 수 없다. 강의가 던지는 질문은 두 가지다. 이 에이전트가 내 비즈니스와 사용 사례에서 제대로 동작하고 있는가, 그리고 고치는 방법에 대한 피드백을 계속 받아 스스로 고칠 수 있는가.

여기서 "고친다"는 것이 뜻하는 범위도 명확히 한다. 더 나은 system prompt를 쓰는 것, 더 나은 모델 설정을 쓰는 것, 그리고 에이전트의 memory를 검색하는 방식을 바꾸는 것이다. 이 세 가지를 계속 반복 개선하려면 평가하고 진단하고 문제를 해결하는 절차가 필요하며, 그 절차의 이름이 LLMOps다.

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

### tracing

첫 단계는 데이터 수집이다. 모든 agent run을 이벤트 트리 형태로 기록한다. 도구로는 LangFuse와 LangSmith를 예시로 든다.

이벤트 트리에 담기는 항목은 다음과 같다. 사용자가 실제로 무엇을 물었는지, 모델이 어떤 retrieval을 수행했는지, tool을 몇 번 호출했고 그 사용 결과가 어땠는지, 전체 실행에 시간이 얼마나 걸렸는지, 그리고 토큰을 얼마나 썼는지다.

tracing 자체는 판정을 하지 않는다. 데이터를 모으는 1단계이며, 그 데이터가 다음 단계의 두 질문에 답하는 재료가 된다.

### eval

두 번째 단계는 모아 둔 데이터를 두 질문으로 가르는 것이다. 좋은 실행이었나(good), 그리고 건강했나(healthy). 판정 수단은 두 가지다. LLM-as-judge로 점수를 매길 수도 있고 결정론적 코드로 검사할 수도 있다.

good과 healthy는 별개의 시스템이 아니라 같은 절차 안의 두 질문이다. 앞의 질문은 산출물의 품질을 묻고 뒤의 질문은 실행 자체의 건전성을 묻는다.

강의가 드는 metric은 세 가지다.

| metric | 확인 내용 |
|---|---|
| 이벤트 실제 발생 여부 | 미팅 일정 태스크였다면 미팅이 실제로 잡혔는가 |
| 응답 latency | 응답까지 20초가 걸렸는가 2밀리초가 걸렸는가 |
| 토큰 사용량 | 이번 실행에 토큰을 얼마나 썼는가 |

latency는 한 번의 실행이 응답까지 걸린 시간을 뜻한다. 세 metric은 모두 tracing 단계에서 이미 수집된 항목이라, eval은 새로 측정하는 것이 아니라 수집된 값에 기준을 적용하는 단계에 해당한다.

### diagnose

세 번째 단계는 무엇이 어디서 왜 깨졌는지를 대시보드의 metric으로 진단하는 것이다. 미팅 일정 이벤트가 한 번도 발동하지 않았다면 그 원인을 파고들어야 한다. 강의는 이 심층 분석을 Claude의 코딩 에이전트에 넘길 수 있다고 덧붙인다.

latency가 2밀리초가 아니라 20초라면 무언가 잘못된 것이며, 의심할 후보는 세 가지다.

| 의심 원인 | 설명 |
|---|---|
| tool call 지연 | 호출한 도구 중 하나가 지나치게 오래 걸린다 |
| 과대한 working memory | working memory가 너무 커서 memory 검색과 응답 생성이 함께 느려진다 |
| 불필요한 retrieval | 모든 질문에 거대한 memory 검색을 붙이고 있다 |

세 번째 항목에는 판단 기준이 함께 붙는다. "내 생일은 언제인가"나 "OpenAI는 언제 시작했나" 같은 단순 질문은 모델이 이미 답을 알고 있으므로 대량 retrieval을 붙일 필요가 없다는 설명이다.

### 게이트의 두 경로

진단 다음에 게이트가 온다. 통과 기준은 시스템 운영자가 규칙으로 정의한다.

| 게이트 결과 | 조치 |
|---|---|
| eval 통과 | system prompt의 새 버전, 모델 설정 갱신, tool 변경, retrieval 파라미터 조정 같은 간단한 수정을 배포한다 |
| 심각한 결함 | 최신 system prompt를 배포하는 것으로 해결되지 않으므로 버그를 고치고 agent run을 다시 실행하며 질문을 다시 보내고 이벤트를 다시 tracing한 뒤 eval을 다시 수행한다 |

통과 경로에서는 LLMOps가 개선된 system prompt와 모델 설정을 agent run 시스템으로 돌려보낸다. 그 시점에 한 번의 LLMOps loop이 닫힌다.

두 경로의 차이는 수정 범위에 있다. 통과 경로는 harness의 설정값만 갱신하므로 실행 구조를 그대로 두고 한 바퀴를 닫는다. 결함 경로는 코드를 고쳐야 하므로 agent run부터 eval까지 전 과정을 처음부터 다시 밟는다. 어느 쪽이든 개선 결과가 harness로 반영된다는 점은 같고, 그래서 두 블록은 한 번의 개선으로 끝나지 않고 계속 순환한다.

## 두 블록의 결합

강의는 마지막에 화면을 한 번 더 넓혀 전체 그림을 다시 본다. 지금까지 다룬 것은 네 가지다. agent run이 무엇인지, 에이전트가 memory에서 정보를 어떻게 검색하는지, LLM 에이전트가 어떻게 질문하고 도구를 호출해 task를 loop 안에서 끝내는지, 그리고 언제 loop을 멈추고 응답을 내보내야 하는지다.

이 네 가지를 묶은 것이 harness이며, 말이라는 기술을 올바른 방향으로 달리게 해 올바른 태스크를 수행시키는 도구 집합이다. 그 옆에 건강 검진 시스템이자 평가 시스템이 붙어, 모든 실행이 어떻게 추적되고 관측되는지, 문제를 어떻게 진단하고 고치는지, 그리고 system prompt와 모델 설정을 비롯한 파라미터의 최신 갱신을 어떻게 배포하는지를 담당한다.

| 구분 | harness 블록 | LLMOps 블록 |
|---|---|---|
| 목적 | 에이전트를 통제한다 | 에이전트를 평가하고 개선한다 |
| 구성 | working memory, 장기 memory 3종, tool call, end-loop guardrail | tracing, eval, diagnose, 게이트 |
| 입력 | 사용자 질문과 대화 이력, system prompt | 완료된 agent run의 이벤트 트리 |
| 출력 | 사용자 응답 | 개선된 system prompt와 모델 설정, 파라미터 |
| 도구 예시 | LangGraph, LangChain, Pydantic | LangFuse, LangSmith |

두 블록이 서로의 출력을 입력으로 받으면 사람이 매번 개입하지 않아도 관측과 개선이 이어진다. 강의가 자율 시스템이라고 부르는 상태가 이것이다.

## 운영 판단 기준

정량 벤치마크는 없지만 반복해서 제시되는 운영 휴리스틱이 사실상의 결과물이다.

| 판단 지점 | 강의가 제시한 기준 |
|---|---|
| consolidation 주기 | 고객 백만 명 규모라면 대화 2,000건마다 한 번 요약해 승격한다. 대화마다 요약하는 방식은 비용상 타당하지 않다 |
| summarizer 모델 선택 | 넣는 텍스트가 많아 context window가 커지고 비싸지므로 더 저렴한 오픈소스 모델로 대체할 수 있다 |
| latency 기준 | 20초와 2밀리초를 대비 사례로 든다. 20초라면 tool call 지연, 과대한 working memory, 불필요한 retrieval을 의심한다 |
| retrieval 생략 판단 | 모델이 이미 아는 단순 질문에는 거대 memory 검색을 붙이지 않는다 |
| eval metric | 이벤트가 실제로 발동했는지, 응답 latency, 토큰 사용량 세 가지를 본다 |
| loop 종료 조건 | task 완료 신호 또는 planning 단계의 사용자 확정. 하나의 정답은 없다 |
| 자체 서버 운영 | 집에 서버를 직접 두는 선택지는 비용이 커서 권하지 않는다 |

## 한계

입문용 추상화에 머문다. LangGraph와 LangChain, Pydantic, LangFuse, LangSmith를 이름만 부르고 코드나 구현은 다루지 않는다. 도입부에서 밝힌 목표 자체가 구현이 아니라 나중에 프롬프트로 지시해 만들 수 있을 만큼의 멘탈 모델 전달이다.

loop 설계는 사례마다 다르다. 하나의 정답이 없다고 명시하므로 종료 조건은 태스크와 시스템 구성에 맞춰 직접 설계해야 한다. 강의는 loop이 무엇인지를 설명할 뿐이며 설계 방법론까지 제시하지는 않는다.

memory 시스템의 깊이는 생략한다. 선행 영상으로 미루고 harness 관점에서만 빠르게 복습한다. procedural memory의 검색 방식은 아예 언급되지 않는다.

자료 내부에 서로 어긋나는 예시가 있다. 불필요한 retrieval의 사례로 "내 생일은 언제인가"를 들며 모델이 이미 안다고 설명하는데, 같은 강의가 앞서 유명하지 않은 개인의 사실은 모델이 학습하지 않았으므로 semantic memory에 직접 주입해야 한다고 말했다. 개인의 생일은 후자에 해당하므로 두 설명이 충돌한다. 자동 자막의 오인식일 가능성도 있으나 확인할 수단이 없다.

평가 자동화의 신뢰성을 다루지 않는다. LLM-as-judge의 편향이나 재현성, 채점 기준 설계 같은 문제는 언급되지 않으므로 [[evaluations/marker-inc-korea-autorag]] 같은 자료로 보완하는 편이 좋다.

보안과 권한 설계가 빠져 있다. 에이전트가 Stripe와 Alipay의 환불을 실제로 실행하는 시나리오까지 제시하지만, 승인 절차나 권한 범위, 실패 시 롤백은 다루지 않는다.

자동 자막의 음성인식 오류가 여러 곳에 있다. Claude Code가 Clockwork나 cloud code로, harness가 hardness로, agent runtime이 Asian runtime으로, Supabase가 Superbase로 표기된다. Salesforce와 HubSpot 옆에 나열된 CRM 제품 하나는 Automanous로 표기되어 특정할 수 없다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| agent run | 사용자 입력 1회에서 응답 1회까지의 실행 단위. 내부 tool call 횟수와 무관하다 |
| working memory | 매 agent run마다 조립되는 단기 컨텍스트. 질문과 대화 이력, system prompt, 검색된 memory로 구성된다 |
| consolidation | 대량 이벤트를 summarizer agent로 요약하고 distill해 semantic memory로 승격하는 자동 진화 장치 |
| end-loop guardrail | tool call 반복을 언제 멈출지 정하는 조건. task 완료 신호이거나 planning 단계에서 확정한 종료 지점이다 |
| tracing | 한 번의 agent run을 이벤트 트리로 기록하는 단계. 질문과 retrieval, tool call 횟수, latency, 토큰을 담는다 |
| eval | 기록된 데이터를 good과 healthy 두 질문으로 판정하는 단계. LLM-as-judge 또는 결정론적 코드로 수행한다 |

## 관련 페이지

- [[overviews/agent-harness-engineering-overview]]: harness와 loop, verification을 여러 자료로 합성한 상위 지도. 이 영상은 같은 개념을 비전공자용 단일 비유로 압축한 입문판이다.
- [[agents/lee-hoyeon-2026-harness-engineering]]: 구조에서 개선까지 6단계로 harness를 나눈 국내 정리. 이 영상의 harness 블록과 LLMOps 블록이 그 실행, 검증, 개선 단계에 대응한다.
- [[agents/ai-boost-awesome-harness-engineering]]: harness engineering 자료를 모은 큐레이션 목록. 이 영상이 이름만 부른 도구들의 출처를 넓게 훑을 때 쓴다.
- [[agents/walkinglabs-learn-harness-engineering]]: harness engineering 학습 경로 정리. 입문 이후 순서를 잡는 데 참고한다.
- [[agents/lin-2026-harness-updating-is-not-harness-benefit]]: harness 개선이 곧 성능 향상은 아니라는 반론. 이 영상의 자율 진화 낙관론과 대비해 읽을 만하다.
- [[agents/he-2026-agent-lightning-v1-0-towards-harnessed]]: harness를 학습 루프에 통합한 프레임워크. 이 영상의 LLMOps feedback loop을 자동화 쪽으로 밀고 간 사례다.
- [[agents/osmani-2026-loop-engineering]]: loop engineering을 패러다임 명칭으로 굳힌 에세이. 이 영상의 end-loop guardrail은 그 글의 종료 조건 논의와 직접 겹친다.
- [[agents/lee-jeongmin-2026-loop-engineering-claude-code]]: Claude Code 기반 loop 운용 정리. 이 영상의 훅 알림 예시를 실제 설정으로 확장한다.
- [[agents/runkle-2026-the-art-of-loop-engineering]]: loop 설계의 심화. 종료 조건 설계가 사례마다 다르다는 이 영상의 한계를 메운다.
- [[agents/qiao-2026-memory-intelligence-agent]]: 에이전트 memory 연구 정리. procedural, semantic, episodic 3분법의 학술적 배경이다.
- [[agents/zou-2026-task-focused-memorization-multimodal-agents]]: 태스크 중심 기억 선별 연구. 이 영상의 consolidation 게이트와 문제의식이 같다.
- [[evaluations/marker-inc-korea-autorag]]: RAG 평가 자동화 프레임워크. 이 영상이 생략한 eval 신뢰성 문제를 다룬다.
- [[evaluations/kim-2026-ai-prd-eval-plan]]: eval 계획을 PRD 단계에 넣는 실무 프레임. LLMOps 파트를 제품 개발 절차로 잇는다.
