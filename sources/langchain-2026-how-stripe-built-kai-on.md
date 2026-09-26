---
title: "How Stripe Built Kai, its Company-Wide AI Agent, on Deep Agents"
type: article
year: 2026
category: agents
raw_path: raw/articles/langchain-2026-how-stripe-built-kai-on.md
raw_filename: "langchain-2026-how-stripe-built-kai-on.md"
source_collection: external
author: "Sofia Sulikowski"
url: "https://www.langchain.com/blog/how-stripe-built-their-knowledge-ai-platform-on-deep-agents"
publisher: "LangChain Blog"
publication_date: "2026-08-03"
tags: [kai, deepagents, langgraph, middleware, virtual-filesystem, sandbox, summarization, skill-selection, mcp, case-study, stripe]
figures:
  - id: fig01
    file: assets/langchain-2026-how-stripe-built-kai-on/fig01.jpg
    raw: raw/articles/langchain-2026-how-stripe-built-kai-on-figures/fig01.jpg
    caption: "글쓴이 프로필 사진. 본문 도식이 아니다"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/langchain-2026-how-stripe-built-kai-on/fig02.png
    raw: raw/articles/langchain-2026-how-stripe-built-kai-on-figures/fig02.png
    caption: "관련 글 Included Health 카드 썸네일. 본문 도식이 아니다"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/langchain-2026-how-stripe-built-kai-on/fig03.png
    raw: raw/articles/langchain-2026-how-stripe-built-kai-on-figures/fig03.png
    caption: "관련 글 Credit Genie 카드 썸네일. 본문 도식이 아니다"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/langchain-2026-how-stripe-built-kai-on/fig04.jpg
    raw: raw/articles/langchain-2026-how-stripe-built-kai-on-figures/fig04.jpg
    caption: "관련 글 글쓴이 프로필 사진. 본문 도식이 아니다"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/langchain-2026-how-stripe-built-kai-on/fig05.png
    raw: raw/articles/langchain-2026-how-stripe-built-kai-on-figures/fig05.png
    caption: "관련 글 Apollo 카드 썸네일. 본문 도식이 아니다"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/langchain-2026-how-stripe-built-kai-on/page-full.png
    raw: raw/articles/langchain-2026-how-stripe-built-kai-on-figures/page-full.png
    caption: "원문 페이지 전체 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig07
    file: assets/langchain-2026-how-stripe-built-kai-on/crop01.png
    raw: raw/articles/langchain-2026-how-stripe-built-kai-on-figures/crop01.png
    caption: "관련 글 카드 영역 크롭본 1"
    strategy: crop
    curated: false
  - id: fig08
    file: assets/langchain-2026-how-stripe-built-kai-on/crop02.png
    raw: raw/articles/langchain-2026-how-stripe-built-kai-on-figures/crop02.png
    caption: "관련 글 카드 영역 크롭본 2"
    strategy: crop
    curated: false
  - id: fig09
    file: assets/langchain-2026-how-stripe-built-kai-on/crop03.png
    raw: raw/articles/langchain-2026-how-stripe-built-kai-on-figures/crop03.png
    caption: "관련 글 카드 영역 크롭본 3"
    strategy: crop
    curated: false
---

## 한 줄 요약 (One-line Summary)

Stripe의 사내 에이전트 Kai를 LangChain 쪽 시각에서 기술한 사례 연구로, Deep Agents가 제공한 filesystem, 샌드박스, 요약 세 미들웨어가 어떻게 엔지니어 한 명이 일주일 만에 초기 버전을 만들게 했는지와 1,000개가 넘는 스킬 중에서 올바른 것을 고르는 문제를 어떻게 다루는지를 담고 있다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | How Stripe Built Kai, its Company-Wide AI Agent, on Deep Agents |
| 글쓴이 | Sofia Sulikowski (LangChain) |
| 발행 | 2026년 8월 3일, LangChain 블로그 Case Studies 절 |
| 분량 | 원문 기준 10분 읽기 |
| 인터뷰 대상 | Sharadh Krishnamurthy(Agent Foundation 팀 EM), Anupam Upadhyay(Staff Software Engineer), Chrissie(Head of AI Platform) |
| 성격 | 벤더 쪽 사례 연구. Deep Agents 채택 효과를 강조하는 관점이 들어 있다 |

같은 시스템을 Stripe 자신이 기술한 글이 [[agents/stripe-2026-meet-stripes-knowledge-ai-platform]]이다. 두 글은 겹치는 부분이 많지만, 이 글에만 있는 것은 미들웨어 수준의 구현 세부, 스킬 선택의 정량 한계, Python 전환 결정의 배경이다.

## 2. 주요 기여 (Key Contributions)

- **Deep Agents 위에 올린 계층 구조를 네 단계로 공개한다.** Stripe의 harness가 어디서 시작해 어디까지 내려가는지 경계를 명확히 한다.
- **초기 버전 개발 기간을 엔지니어 한 명, 일주일로 명시한다.** 그리고 그 속도를 만든 미들웨어가 무엇이었는지 세 가지로 특정한다.
- **스킬 규모의 한계를 수치로 남긴다.** frontmatter 1,024자 제한과, 시스템 프롬프트와 합쳤을 때 스킬이 150개를 넘어가면 최신 모델의 품질이 떨어지기 시작했다는 관찰이다.
- **RAG와 LLM 기반 스킬 선택의 우열을 현 시점 기준으로 판정한다.** 전체 컨텍스트를 넣을 수 있는 현재 규모에서는 순수 LLM 선택이 RAG보다 결과가 좋지만, 규모가 커지면 prefilter 계층이 필요하다는 판단이다.
- **Python 스택 전환의 투자 회수 논리를 기록한다.** 10년 넘게 Ruby와 Java 위에 쌓아 온 사내 도구와 보안 계층을 Python으로 다시 세운 결정을 Kai가 정당화했다는 서술이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 자체 harness를 만들려던 시도가 부딪힌 벽

agentic AI 도입이 빨라지면서 Stripe 여러 엔지니어링 팀이 기존 Ruby와 Java 스택 위에 각자 오케스트레이션 계층을 만들기 시작했다. 사내 인프라와의 연동 자체는 비교적 수월했지만, 프로덕션 품질의 harness를 만드는 일은 별개의 난관이었다고 적는다.

효과적인 에이전트 시스템에는 연결성만으로 부족하고 성능, 견고한 평가, 복잡한 과제를 일관되게 처리하는 능력이 함께 필요하다. 팀들의 초기 구현은 단순한 사용 사례에서는 작동했지만 규모에서 신뢰할 만한 결과를 내려면 추가 투자가 필요했다.

2024년 말 Claude Code가 나오면서 Stripe 직원 모두가 에이전트를 만들고 싶어 했다. 그러나 비개발자에게는 터미널, 데이터 접근, 보안 구성 요소가 큰 장벽이었다. Sharadh와 Anupam은 방향을 뒤집었다. 비기술직을 개발자 도구 쪽으로 끌어오는 대신, 그들이 있는 자리로 목적에 맞게 만든 것을 가져가자는 것이다. 글은 그 질문을 "모두가 항상 켜져 있는 프로덕션 수준의 비서를 갖는다면 어떨까"로 옮긴다.

### 3.2 Kai가 어떤 제품인가

Kai는 전 직원이 쓸 수 있고, 대부분의 Stripe 직원이 실제로 하는 업무에 맞춰 만들어졌다. 데이터 종합, 브레인스토밍, 문서 초안 작성, 추세 분석, 직능 간 협업이 그 업무다. 이 모든 것이 세션 기반 인터페이스 하나에서 일어나고, 그 인터페이스는 사내 데이터 웨어하우스와 Slack, Google Suite에 연결돼 있다.

사용 흐름은 다음과 같다. 사용자가 세션을 시작하고 채팅으로 상호작용하면 Kai가 산출물, 리포트, 대시보드, 문서를 만들어 대화 옆에 둔다. 대화가 이어지면 그 산출물이 함께 갱신된다. 글은 이것이 비개발자를 위한 코딩 에이전트처럼 동작한다고 표현한다.

범용 AI 비서와의 차이는 사전 적재된 맥락이다. Kai에는 도구와 스킬을 통해 Stripe 맥락이 미리 들어가 있어서, 사용자가 과제마다 자기 직무나 회사를 설명할 필요가 없다. 회사 여러 부문의 전문가가 100개 이상 팀에서 1,000개가 넘는 스킬로 도메인 지식을 기여한다.

### 3.3 Deep Agents 위의 네 계층

| 계층 | 담당 |
|---|---|
| Deep Agents (기반) | LLM 상호작용의 모든 기본 요소를 처리한다. 요청 관리, 에이전트 실행, 미들웨어 조합이 여기 들어간다 |
| Stripe 전용 harness | Kai를 Stripe의 보안 태세, 인프라, 사내 서비스에 통합해 의견이 반영된 실행 환경을 만든다 |
| 설정 계층 | 팀이 harness를 건드리지 않고 스킬 구성, 동작, 페르소나가 다른 맞춤 Kai 에이전트를 설정한다 |
| Kai UI | 대부분의 직원이 실제로 만나는 제품 경험. 아래 세 계층을 관통한다 |

Deep Agents는 tool call 루프, 미들웨어 조합, 스트리밍, 상태 관리를 엮어 주는 기반이다. 글은 이 요소들을 처음부터 만들어 안정화하려면 몇 달이 걸린다고 적는다.

Sharadh의 표현은 이렇다. "Deep Agents 계층이 Stripe답지 않은 문제를 전부 해결해 주니 우리는 Stripe다운 에이전트 문제에 집중할 수 있다. 미들웨어를 기성품으로 가져다 쓸 수 있고, 조합 가능한 스킬 패턴과 복합 백엔드가 올바른 구조를 주면서도 유연성은 충분히 남긴다."

### 3.4 프로덕션 투입을 가능하게 한 세 미들웨어

Anupam이 일주일 만에 Kai 초기 버전을 만들었고, 그 속도를 만든 Deep Agents 미들웨어는 다음 셋이다.

**filesystem 미들웨어.** Kai는 로컬 프로세스가 아니라 클라우드에서 도는 프로덕션 서비스다. Stripe는 S3를 백엔드로 하는 가상 파일 시스템을 만들어 에이전트가 턴 사이에 파일을 컨텍스트로 읽고 쓰고 참조하게 했다. 파일 시스템이 LLM 컨텍스트에 잘 맞는 이유로는 컨텍스트를 모델이 검사하고 갱신하고 시간에 따라 정리할 수 있는 대상으로 바꿔 주기 때문이라고 적는다.

샌드박스 실행 호출은 전부 "sync in / sync out" 패턴으로 감싼다. 실행 전에 관련 파일을 전부 샌드박스 안으로 구체화하고, 실행 후에 새로 만들어지거나 수정된 파일을 가상 파일 시스템으로 다시 동기화한다. 그 결과 에이전트와 에이전트를 구동하는 LLM은 세션 전체 수명에 걸쳐 일관되고 지속되는 파일 환경을 경험한다.

**샌드박스 미들웨어.** Kai는 두 종류의 작업을 샌드박스 환경에서 실행한다. 하나는 분석 작업으로, 데이터를 질의하고 차트를 만드는 Python 코드를 쓰고 실행하는 일이다. 다른 하나는 PDF, 프레젠테이션, 구조화 문서 같은 임의 파일 형식의 처리다.

설계상 중요한 점은 샌드박스가 에이전트에게 **도구로 노출되고, 에이전트 자신의 실행 환경이 아니라는 것**이다. 에이전트는 샌드박스 바깥에서 돌면서 안쪽을 호출한다. 이렇게 하면 실행 경계가 깨끗하게 유지되고 LLM이 생성한 코드와 관련된 한 부류의 보안 문제를 막을 수 있다. 원문은 이 지점에서 lethal trifecta 논의를 링크한다.

**요약 미들웨어.** 여러 턴이 길게 이어지는 세션에서 쌓인 컨텍스트가 성능을 떨어뜨리거나 모델 한계에 부딪히는 것을 막는 데 필수적이다. Kai는 특히 긴 다중 턴 세션을 잘 다룬다. 사용 가능한 컨텍스트를 최대한 쓰면서 비용과 균형을 맞추기 위해 deepagents 라이브러리가 제공하는 조정 항목을 활용한다. 요약 시작 임계값, 요약 담당 모델, 출력 크기 등이다.

비용과 관련해서는 사용 패턴을 근거로 든다. 대부분의 사용자가 Kai 세션을 띄엄띄엄 쓰기 때문에, 큰 컨텍스트에서 캐시 미스가 나는 것을 피하는 것이 비용 통제에 도움이 된다.

### 3.5 스킬과 도구 로딩

Deep Agents의 스킬은 구조화된, 에이전트가 실행 가능한 모듈이다. 각 스킬은 특정 과제를 어떻게 수행하는지, 어떤 도구를 불러올지, 한 부류의 작업에 어떻게 접근할지를 담는다.

Stripe는 각 팀이 자기 스킬을 소유하고 유지하는 연합형 방식을 택했다.

| 층 | 내용 |
|---|---|
| 기본 스킬 | 기본 Kai 에이전트에 Stripe 전반을 탐색하는 기초 스킬 묶음이 함께 실린다 |
| 계층별 추가 스킬 | 사용자 프로필과 실제로 쓰는 Kai 에이전트 설정에 따라 추가로 로딩된다. 영업 운영 담당자와 재무 담당자가 받는 스킬 구성이 다르다 |
| 사용자 프로필 층 | 개인이 직능 기본값 위에 스킬을 더 얹을 수 있다 |

500개가 넘는 사내 MCP 도구와 계속 늘어나는 skill library를 전부 컨텍스트에 실을 수는 없다. 그래서 Agent Skills의 `allowedTools` 목록이 동적 도구 로딩을 구동한다. 스킬 선택이 도구 컨텍스트를 결정하는 2단계 방식이라, 모든 도구를 미리 올리지 않는다. 선택은 이미 관련 맥락을 갖고 있는 LLM에 맡긴다. Anupam의 표현으로는 "LLM이 어떤 스킬을 불러올지 알아내는 데 이미 노력을 쓰고 있으니, 관련 도구를 로딩하는 일도 그 판단에 기대는 것"이다.

일부 기초 스킬은 고정되어, 모델이 무엇을 로딩하거나 내리기로 하든 유지된다. Stripe 맥락과 정책 동작이 항상 일관되게 유지되도록 하기 위해서다.

### 3.6 Python 전환 결정

Stripe는 10년 넘게 Ruby와 Java를 중심으로 사내 도구, 보안 계층, 배포 지원을 쌓아 왔다. Python 네이티브 스택을 채택한다는 것은 사내 서비스 스캐폴딩을 새 언어로 다시 세운다는 뜻이고, 이는 큰 투자였다.

Kai는 그 투자 회수를 실증으로 증명했다. 엔지니어 한 명이 일주일 만에 Kai를 만들었고, Deep Agents의 기본 요소 덕에 어려운 에이전트 인프라가 이미 해결된 상태였기 때문이다. Head of AI Platform인 Chrissie는 "Kai가 Deep Agents가 맞는 길이라는 믿음을 완전히 굳혔다"고 말한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 확산 곡선

| 지표 | 값 |
|---|---|
| 분기 도입 목표 달성 | 오픈 프리뷰 후 일주일 |
| 사용자 증가 | 약 4주 동안 296명에서 5,000명 이상으로 16배 이상 |
| 주간 사용 비율 | 전사 83% |
| 주간 세션 수 | 6만 건 이상 |
| 마케팅 조직 | 95% |
| GTM 조직 | 87% |

마케팅과 GTM 같은 비즈니스 직능의 사용 비율이 엔지니어링보다 높다는 점을 글은 강조한다. 이들은 Kai를 딜 준비에 쓰면서 여러 사내 소스에서 데이터를 끌어와 종합하고 쓸 수 있는 산출물을 만드는 과정이 크게 달라졌다고 말한다. 재무 조직은 데이터 분석과 대시보드 생성에 같은 정도로 유용하게 쓴다.

신규 사용자의 대부분은 팀이 설계 대상으로 삼았던 직무였다. 영업, 재무 분석, 비즈니스 운영 담당자, 즉 "AI를 쓰라"는 요구를 받았지만 자기 업무 방식에 맞는 도구를 찾지 못했던 직원들이다.

인용된 사용자 반응은 다음 둘이다.

- "Kai는 영업 담당자에게 정말 믿기 어려울 정도다. 수만 시간이 절약될 것이다."
- "내 Stripe 커리어는 Kai 이전과 이후로 나뉜다."

신규 입사자는 온보딩을 빠르게 하는 데 Kai를 쓰기 시작했다. 비개발자를 위해 Kai를 만든 엔지니어링 팀도 자기 업무의 보조 도구로 쓰게 됐다. 자기 시스템에 관한 질문에 답하게 하거나, 자기 trace와 사용 데이터를 Kai로 분석해 스킬의 빈틈을 찾고 커버리지를 넓히는 식이다.

### 4.2 스킬 규모에서 관찰한 한계

이 글의 가장 구체적인 정량 관찰이다.

| 항목 | 값 | 의미 |
|---|---|---|
| frontmatter 문자 수 제한 | 1,024자 | 스킬 하나가 자기 설명에 쓸 수 있는 예산 |
| 품질 저하가 시작된 스킬 수 | 150개 초과 | 시스템 프롬프트와 합쳤을 때 최신 모델의 품질이 떨어지기 시작한 지점 |
| 사내 MCP 도구 수 | 500개 이상 | 전부 컨텍스트에 올릴 수 없는 규모 |
| 스킬 수 | 1,000개 이상 | 같음 |

글은 스킬 개수가 여전히 과제로 남아 있고 팀이 더 나은 해법을 찾는 중이라고 적는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

글이 밝힌 다음 과제는 네 가지다.

| 과제 | 현재 판단 | 계획 |
|---|---|---|
| 스킬 선택 확장 | 전체 컨텍스트를 넣을 수 있는 현재 규모에서는 순수 LLM 선택이 RAG보다 결과가 좋다 | 규모가 커지면 RAG나 분류기 계층으로 후보를 미리 좁힌 뒤 LLM이 최종 판단을 하는 hybrid 선택 시스템으로 간다 |
| 거버넌스와 가드레일 | 수천 명 규모로 확산됐다 | Kai의 영향 범위가 감독 체계를 앞지르지 않도록 보안과 컴플라이언스 가드레일에 투자한다 |
| 행동 수준 개인화 | 팀마다 원하는 에이전트 동작이 다르다. 어떤 팀은 항상 계획을 세우고 명확화 질문을 하기를 원하고, 어떤 팀은 빠르고 직접적인 답을 원한다 | ML 분류기와 AI 기반 방식으로 사용자 맥락에 맞춰 동작을 자동 조정하는 방향을 검토 중이다 |
| 세션 간 협업 | 현재 모델은 단일 사용자 세션이다 | 스킬 공유, 산출물 공유를 거쳐 여러 직원이 같은 AI 산출물을 함께 다루는 협업 세션으로 확장한다 |

개인화에 대해 Sharadh는 "이 제품의 약속 자체가 조정 항목을 만질 필요가 없다는 것"이라며, 따라서 그 판단을 대신 해 주는 지능을 만드는 책임을 팀이 떠안았다고 말한다.

자료 자체의 한계는 다음과 같다.

- **벤더 쪽 사례 연구다.** LangChain이 자사 Deep Agents 채택 효과를 소개하는 맥락이므로, 실패한 시도나 대안 harness와의 비교는 나오지 않는다.
- **"일주일"의 범위가 명시되지 않는다.** 엔지니어 한 명이 일주일에 만든 것은 초기 버전이고, 그 뒤 프로덕션 harness와 Agent Studio를 세우는 데 든 노력은 이 글에 없다.
- **비용과 지연 시간 수치가 없다.** 캐시 미스 회피가 비용 통제에 도움이 된다는 서술은 있지만 실제 비용은 나오지 않는다.
- **품질 저하 관찰의 측정 방법이 없다.** 스킬 150개 초과에서 품질이 떨어졌다는 관찰이 어떤 eval로 측정된 것인지 밝히지 않는다.

## 6. 관련 연구 (Related Work)

- **같은 시스템의 Stripe 쪽 서술**: [[agents/stripe-2026-meet-stripes-knowledge-ai-platform]]. 세 계층 구조, 도입 성과 수치, 데이터 격리 규칙은 Stripe 쪽 글에 더 자세하다.
- **Agent Skills 규약**: `allowedTools` 기반 동적 도구 로딩은 [[agents/agentskills-io-2026-agent-skills-overview]]가 정리한 규약을 그대로 쓴다.
- **스킬 선택 문제**: [[agents/zhao-2026-generative-skill-composition-for-llm]]이 같은 문제를 학술 쪽에서 다룬다.
- **MCP 구조**: 500개가 넘는 사내 MCP 도구를 다루는 맥락은 [[agents/rodrigues-2026-mcp-server-architecture-patterns]]와 이어진다.
- **컨텍스트 압축**: 요약 미들웨어의 역할은 [[agents/9bow-2026-headroom-ai-agent-context-compression]]와 [[agents/anthropic-2025-effective-context-engineering-for-ai]]가 다루는 문제와 같다.
- **harness 관점**: [[agents/ai-boost-awesome-harness-engineering]]는 Deep Agents가 harness 변경만으로 Terminal Bench 순위를 끌어올린 사례를 기록하고 있다.
- **한국어 요약과 토론**: [[agents/hada-2026-stripe-kai-internal-ai-platform]].

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Deep Agents | LangChain의 오픈소스 agent harness. tool call 루프, 미들웨어 조합, 스트리밍, 상태 관리를 제공한다 |
| 미들웨어 (Deep Agents 문맥) | harness의 기본 루프에 끼워 넣어 파일 접근, 샌드박스 실행, 요약 같은 기능을 더하는 교체 가능한 구성 요소 |
| sync in / sync out | 샌드박스 실행 전에 관련 파일을 샌드박스로 구체화하고, 실행 후 변경분을 가상 파일 시스템으로 되돌리는 Stripe의 패턴 |
| `allowedTools` | 스킬이 자기 실행에 필요한 도구를 선언하는 Agent Skills 필드. 스킬 선택이 도구 로딩을 결정하게 하는 열쇠다 |
| 고정 스킬 (pinned skill) | 모델의 로딩 판단과 무관하게 항상 유지되는 기초 스킬. Stripe 맥락과 정책 동작의 일관성을 담보한다 |
| 연합형 스킬 소유 | 플랫폼 팀이 아니라 각 도메인 팀이 자기 스킬을 만들고 유지하는 운영 방식 |

## 8. 그림 후보 (Figure Candidates)

원문에는 본문 도식이 없다. 수집된 이미지는 전부 글쓴이 프로필 사진과 꼬리의 관련 글 카드 썸네일이다.

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 글쓴이 프로필 사진 | fetched | 잡음 |
| fig02 | 관련 글 Included Health 카드 썸네일 | fetched | 잡음 |
| fig03 | 관련 글 Credit Genie 카드 썸네일 | fetched | 잡음 |
| fig04 | 관련 글 글쓴이 프로필 사진 | fetched | 잡음 |
| fig05 | 관련 글 Apollo 카드 썸네일 | fetched | 잡음 |
| fig06 | 원문 페이지 전체 스크린샷 | screenshot | 아카이브용 |
| fig07 | 관련 글 카드 영역 크롭본 1 | crop | 잡음 |
| fig08 | 관련 글 카드 영역 크롭본 2 | crop | 잡음 |
| fig09 | 관련 글 카드 영역 크롭본 3 | crop | 잡음 |

이 자료의 wiki 페이지에 임베드할 도식은 없다. 구조 도식이 필요하면 [[agents/stripe-2026-meet-stripes-knowledge-ai-platform]]의 실행 환경 도식을 쓴다.
