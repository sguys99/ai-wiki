---
title: "Meet Stripe's Knowledge AI Platform"
type: article
year: 2026
category: agents
raw_path: raw/articles/stripe-2026-meet-stripes-knowledge-ai-platform.md
raw_filename: "stripe-2026-meet-stripes-knowledge-ai-platform.md"
source_collection: external
author: "Anna Mason, Sharadh Krishnamurthy, Anupam Upadhyay"
url: "https://stripe.dev/blog/meet-stripes-knowledge-ai-platform"
publisher: "Stripe Dot Dev Blog"
publication_date: "2026-07-30"
tags: [kai, knowledge-work, enterprise-agent, deepagents, agent-studio, harness, sandbox, virtual-filesystem, skill-selection, guardrail, stripe]
figures:
  - id: fig01
    file: assets/stripe-2026-meet-stripes-knowledge-ai-platform/fig01.gif
    raw: raw/articles/stripe-2026-meet-stripes-knowledge-ai-platform-figures/fig01.gif
    caption: "Kai 웹 앱의 세션 시작 화면과 한 번에 입력된 복합 과제 프롬프트"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/stripe-2026-meet-stripes-knowledge-ai-platform/fig02.png
    raw: raw/articles/stripe-2026-meet-stripes-knowledge-ai-platform-figures/fig02.png
    caption: "사내 분석 도구 안에 API로 내장된 Kai 패널"
    strategy: fetched
    curated: true
  - id: fig03
    file: assets/stripe-2026-meet-stripes-knowledge-ai-platform/fig03.png
    raw: raw/articles/stripe-2026-meet-stripes-knowledge-ai-platform-figures/fig03.png
    caption: "Agent Studio 시작 화면. 스킬, task, 에이전트 세 경로로 나뉜다"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/stripe-2026-meet-stripes-knowledge-ai-platform/fig04.png
    raw: raw/articles/stripe-2026-meet-stripes-knowledge-ai-platform-figures/fig04.png
    caption: "Kai와 제품용 에이전트가 공유하는 단일 실행 환경 구조"
    strategy: fetched
    curated: true
  - id: fig05
    file: assets/stripe-2026-meet-stripes-knowledge-ai-platform/fig05.png
    raw: raw/articles/stripe-2026-meet-stripes-knowledge-ai-platform-figures/fig05.png
    caption: "2026년 6월 36만 세션의 턴 수, LLM 호출 수, tool call 수 분위 분포"
    strategy: fetched
    curated: true
  - id: fig06
    file: assets/stripe-2026-meet-stripes-knowledge-ai-platform/page-full.png
    raw: raw/articles/stripe-2026-meet-stripes-knowledge-ai-platform-figures/page-full.png
    caption: "원문 페이지 전체 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig07
    file: assets/stripe-2026-meet-stripes-knowledge-ai-platform/crop01.png
    raw: raw/articles/stripe-2026-meet-stripes-knowledge-ai-platform-figures/crop01.png
    caption: "fig01과 같은 화면의 브라우저 크롭본"
    strategy: crop
    curated: false
  - id: fig08
    file: assets/stripe-2026-meet-stripes-knowledge-ai-platform/crop02.png
    raw: raw/articles/stripe-2026-meet-stripes-knowledge-ai-platform-figures/crop02.png
    caption: "fig02와 같은 화면의 브라우저 크롭본"
    strategy: crop
    curated: false
  - id: fig09
    file: assets/stripe-2026-meet-stripes-knowledge-ai-platform/crop03.png
    raw: raw/articles/stripe-2026-meet-stripes-knowledge-ai-platform-figures/crop03.png
    caption: "fig03과 같은 화면의 브라우저 크롭본"
    strategy: crop
    curated: false
  - id: fig10
    file: assets/stripe-2026-meet-stripes-knowledge-ai-platform/crop04.png
    raw: raw/articles/stripe-2026-meet-stripes-knowledge-ai-platform-figures/crop04.png
    caption: "fig04와 같은 도식의 브라우저 크롭본"
    strategy: crop
    curated: false
  - id: fig11
    file: assets/stripe-2026-meet-stripes-knowledge-ai-platform/crop05.png
    raw: raw/articles/stripe-2026-meet-stripes-knowledge-ai-platform-figures/crop05.png
    caption: "fig05와 같은 차트의 브라우저 크롭본"
    strategy: crop
    curated: false
---

## 한 줄 요약 (One-line Summary)

Stripe가 비개발자 지식 업무를 위해 만든 사내 에이전트 플랫폼 Kai의 설계와 도입 결과를 정리한 엔지니어링 블로그로, LangChain deepagents 기반 harness 위에 인터페이스 독립 API, Agent Studio, 공용 실행 환경이라는 세 계층을 올려 1,000개가 넘는 스킬과 도구를 연결한 구조를 소개한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | Meet Stripe's Knowledge AI Platform |
| 저자 | Anna Mason(테크니컬 라이터), Sharadh Krishnamurthy(Agent Foundation 팀 EM), Anupam Upadhyay(AI Platform 팀 소프트웨어 엔지니어) |
| 발행 | 2026년 7월 30일, stripe.dev 엔지니어링 블로그 |
| 분량 | 원문 기준 9분 읽기, 도식 5장 |
| 성격 | 사내 시스템 소개와 도입 성과 보고. 벤치마크나 재현 가능한 실험은 없다 |

Kai는 Stripe's Knowledge AI Platform의 줄임말이자 제품 이름이다. 2026년 4월에 출시했고, 발행 시점 기준 전사 직원의 83%가 주간 활성 사용자다.

## 2. 주요 기여 (Key Contributions)

이 글이 기록하는 것은 새로운 모델이나 알고리즘이 아니라 **사내 배포 사례**다. 다음 다섯 가지를 담고 있다.

- **지식 업무와 코딩 업무의 구조적 차이를 플랫폼 설계 근거로 제시한다.** 코딩은 과제가 달라도 파일 수정, 테스트 실행, 커밋이라는 작업 형태가 거의 같아 하나의 에이전트 아키텍처로 충분하다. 반면 지식 업무는 과제마다 도구, 데이터, 산출물, 완료 조건이 모두 달라서 단일 에이전트로 담을 수 없다.
- **사내 에이전트 난립이 만든 실패를 수치와 함께 남긴다.** Kai 이전에 NoCode Agent Builder로 만들어진 에이전트가 4,000개를 넘었고, 팀마다 비슷한 프롬프트를 서로 다른 품질로 작성해 모니터링과 유지보수가 감당하기 어려워졌다.
- **세 계층 구조를 공개한다.** 인터페이스 독립 API, 도메인 담당자용 제어 계층인 Agent Studio, 그리고 제품용 에이전트와 공유하는 실행 환경이다.
- **harness를 LangChain deepagents로 구축했다고 명시한다.** Kubernetes 위에서 세션별 샌드박스와 멀티테넌트 가상 파일 시스템을 함께 쓴다.
- **도입 효과를 대조군과 함께 제시한다.** 같은 영업 담당자의 Kai 사용 주와 미사용 주를 비교하는 방식으로, 코호트 차이가 아닌 개인 내 비교를 시도했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 설계가 풀어야 했던 세 가지 문제

글은 지식 AI 플랫폼을 만들려면 세 가지를 동시에 해결해야 했다고 적는다.

| 문제 | 내용 | 설계에 준 제약 |
|---|---|---|
| 전문성을 중앙화하지 않고 확장하기 | 청구 에스컬레이션 분류나 매출 시나리오 모델링을 아는 사람은 에이전트 인프라 팀이 아니라 GTM, 재무, 마케팅, 법무, 데이터 과학 등 수십 개 도메인에 흩어져 있다 | 도메인 담당자가 직접 스킬과 에이전트를 만들고 관리하는 제어 계층이 필요하다 |
| 에이전트가 업무 현장으로 이동하기 | 모두가 브라우저 탭에서 일하지 않고, 터미널에서 일하는 사람은 더 적다 | 독립 제품이 아니라 API를 기본 단위로 삼아 여러 인터페이스에 같은 에이전트를 노출해야 한다 |
| 가드레일을 맨바닥에서 만들기 | 코딩 에이전트에는 컴파일러, 테스트, git처럼 빠르고 검증 가능한 안전망이 이미 있지만 지식 업무에는 거의 없다 | 접근 권한만이 아니라 과제 맥락을 기준으로 데이터 격리를 강제해야 한다 |

세 번째 항목에 대해 글은 구체적인 불변 조건을 하나 든다. 서로 무관한 두 고객의 데이터를 한 분석에 결합해서는 안 된다는 규칙이다. 사용자가 두 맥락 각각에 정당한 접근 권한을 갖고 있더라도 같은 세션에 함께 나타나서는 안 된다. 격리 기준은 "이 사람이 인가 토큰으로 무엇에 접근할 수 있는가"가 아니라 "이 과제가 이 맥락에서 무엇을 볼 수 있어야 하는가"라고 적는다.

### 3.2 Kai 이전의 두 가지 선택지와 그 실패

| 선택지 | 무엇이었나 | 왜 부족했나 |
|---|---|---|
| NoCode Agent Builder | 누구나 도구를 쓰는 업무별 에이전트를 만들어 배포할 수 있었고 4,000개 이상이 만들어졌다 | 팀마다 개념적으로 비슷한 프롬프트를 서로 다른 품질로 작성했고, 마이크로 에이전트가 늘면서 모니터링과 유지보수가 어려워졌다 |
| 코딩 에이전트 | 강력했고 일부 비개발자가 업무 방식을 바꿔 가며 사용했다 | 보안 우려가 빠르게 드러났고, 비개발자를 지원해 본 적 없는 코드 품질 팀에 새로운 지원 부담이 생겼다 |

글은 하나의 거대한 단일 에이전트로 모든 제약을 담을 수 없고, 도메인 팀마다 안전하고 성능 좋은 호스팅 인프라를 따로 만들게 하는 것도 확장되지 않는다고 결론짓는다. 그래서 세 계층으로 나눴다.

### 3.3 첫째 계층, 인터페이스 독립 API

Kai는 자체 웹 애플리케이션과 Slack 연동을 함께 제공하지만, 기본 단위(primitive)는 그 둘을 함께 구동하는 API다. 글의 표현으로는 에이전트가 애플리케이션이 아니라 서비스이고, 각 인터페이스는 그 서비스를 목적에 맞게 보여 주는 화면이다.

- 대부분의 직원은 사내 호스팅 웹 애플리케이션으로 Kai를 쓴다. 설정할 인프라가 없어 입사 첫날부터 쓸 수 있다.
- 사내 도구는 API로 Kai를 내장할 수 있고 실제로 많은 도구가 그렇게 했다.
- Chrome 확장 프로그램이 웹 기반 서드파티 도구 안에서도 Kai 기능을 노출한다. 예를 들어 비즈니스 인텔리전스 플랫폼에서 일하는 직원은 그 애플리케이션을 벗어나지 않고 Kai에 질의(query)를 던진다.

독립형 에이전트 제품을 만들면 사용자를 원래 업무 흐름에서 끌어내 새 앱으로 보내야 하고, 인터페이스마다 별도 제품을 만들면 유지보수가 흩어지고 여러 도구를 오가는 사용자의 경험이 분절된다는 것이 이 선택의 근거다.

### 3.4 둘째 계층, Agent Studio

Agent Studio는 도메인 담당자를 위한 제어 계층이다. 팀은 여기서 자기 스킬, 맞춤 Kai 에이전트, 도구 구성을 만들고 테스트하고 모니터링한다.

예로 든 것은 GTM 팀이다. GTM 팀은 자기 워크플로에 맞춘 Kai 에이전트를 소유한다. 그 에이전트는 팀의 스킬을 기본으로 불러오고, 팀의 데이터 소스에 연결되며, 팀 사용자가 기대하는 형식으로 결과를 낸다. Agent Studio는 각 자산 옆에 사용량 데이터와 품질 신호를 함께 보여 주므로 도메인 담당자가 플랫폼 팀에 묻지 않고도 무엇이 작동하는지 확인한다.

### 3.5 셋째 계층, 실행 환경

실행 환경은 플랫폼의 약속을 실제로 지키게 하는 계층이다. 핵심 기본 단위인 agent harness, 샌드박스, 워크플로 오케스트레이션, 접근 제어 프레임워크를 **Stripe의 제품용 에이전트와 의도적으로 공유한다**. 사내 지식 업무도 외부 제품과 같은 민감 데이터를 다루고 같은 사용자를 상대하므로 같은 보안과 컴플라이언스 기준이 필요하다는 것이 이유다. 기반을 공유하면 실행 환경 개선이 사내 에이전트와 제품 에이전트에 동시에 반영되는 순환이 생긴다.

구현 세부는 다음과 같다.

| 구성 요소 | 내용 |
|---|---|
| agent harness | LangChain의 [deepagents](https://github.com/langchain-ai/deepagents)로 구축했다. harness는 모델을 감싸 도구, 검증, 상태를 제공하는 실행 환경을 말한다 |
| 실행 기반 | Kubernetes 위에서 구동한다 |
| 격리 | 세션마다 별도의 보안 샌드박스를 둔다 |
| 파일 계층 | 멀티테넌트 가상 파일 시스템을 쓴다. 세션 안에서 에이전트는 이 가상 파일 시스템 위에서 산출물을 만들고 고쳐 나간다 |
| 코드 실행 | 분석과 데이터 처리에는 별도의 보안 코드 실행 샌드박스를 쓴다 |

상태 유지 능력에 대해서는 구체적인 수치를 하나 든다. 최근 한 세션이 932턴에 도달했다는 것이다. 한 대화가 수백 턴, 수백 번의 tool call과 LLM 호출로 이어져도 시간 초과가 나거나 context window가 넘치지 않는다고 적는다. 지식 업무는 단일 질문이 아니라 이전 결과 위에 추론을 쌓는 반복 작업이므로 세션이 그 상태를 품질 저하 없이 들고 있어야 한다는 것이 이 요구의 근거다.

### 3.6 스킬 선택 문제

Kai는 1,000개가 넘는 스킬과 도구에 연결돼 있다. 주요 지표를 추적하는 비즈니스 인텔리전스 대시보드, 사내 실행을 관리하는 프로젝트 관리 도구, 그리고 Zoom과 Google Workspace 같은 서드파티 서비스가 여기 포함된다.

글은 이 규모에서 올바른 스킬을 고르는 일이 harness의 가장 흥미로운 부분이라고 말한다. 코딩 에이전트는 작업 대상 폴더 구조가 스킬과 컨텍스트를 자연스럽게 조직해 주지만, 지식 업무에는 그런 사전 구조가 없다. Stripe는 이 문제를 hybrid RAG와 LLM을 결합한 접근으로 풀었다고만 밝히고, 구체적인 방법은 후속 글에서 다루겠다고 예고한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 도입 지표

| 지표 | 값 |
|---|---|
| 출시 시점 | 2026년 4월 |
| 초기 확산 | 출시 2주 안에 Stripe 대부분이 사용 |
| 주간 활성 사용자 비율 | 83% |
| GTM 조직 커버리지 | 마케팅, 영업, 고객 성공 관리자, 기술 계정 관리자 포함 거의 전원 |
| 데이터 분석 중심 세션 | 하루 5,000건 이상 |

### 4.2 업무 성과

수치는 두 묶음으로 나뉜다. 하나는 코호트 안 비교이고, 다른 하나는 같은 사람의 사용 주와 미사용 주 비교다.

| 비교 방식 | 대상 | 결과 |
|---|---|---|
| 코호트 안 비교 | GTM 신규 입사자 | Kai 사용량이 2.7배 높다 |
| 코호트 안 비교 | 같은 코호트의 집중 사용자 대 저사용자 | 성사 계약 가치가 80% 높다 |
| 개인 내 비교 | 같은 영업 담당자의 Kai 사용 주 대 미사용 주 | 영업 활동 2배, 생성 기회 17% 증가, 매출 기회 26% 증가, 계약 성사 39% 증가 |
| 전사 집계 | 행정 업무에서 매출 창출 업무로 이동한 시간 | 연간 25,000시간 |

정성 결과로는 재무와 운영 조직이 정리되지 않은 데이터를 분석하고 정기 요약을 생성하며 흩어진 맥락을 사용 가능한 산출물로 바꾸는 데 Kai를 쓴다고 적는다. 엔지니어링에서는 시스템 질문, 실행 요청 조사, 로그 분석, 계획 초안 작성, 그리고 더 전문화된 에이전트와 스킬 호출에 쓰인다.

### 4.3 세션 분포 (fig05 기준)

본문에는 없고 도식에만 있는 수치다. 2026년 6월 36만 세션을 집계한 것이다.

| 지표 | 표본 수 | 평균 | p50 | p90 |
|---|---|---|---|---|
| 세션당 턴 수 | 134만 | 3.7 | 2 | 7 |
| 세션당 LLM 호출 수 | 569만 | 15.8 | 8 | 34 |
| 세션당 tool call 수 | 688만 | 19.1 | 9 | 45 |

평균이 p50보다 훨씬 크고 p90 위로 급격히 꺾이는 분포다. 즉 대부분의 세션은 짧게 끝나고 소수의 긴 세션이 전체 호출량을 끌어올린다. 본문이 강조하는 932턴 세션은 이 꼬리의 극단값에 해당한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

글이 직접 밝힌 미해결 과제는 세 가지다.

| 과제 | 현재 상황 | 계획 |
|---|---|---|
| 상태 관리 | 범용 에이전트가 반복적으로 tool call을 하고 큰 문서를 내려받으면서 상태가 계속 쌓인다 | LLM에 실제로 보내는 활성 컨텍스트와 S3나 가상 파일 시스템에 두는 확장 컨텍스트를 계속 조정한다 |
| 자기 개선 | 스킬 품질을 사람이 관리한다 | Kai가 특정 스킬이 쓰인 trace를 검토하고 개선안을 제안하고 테스트한 뒤 스킬 소유자에게 변경안을 제출하는 품질 개선 루프를 개발 중이다 |
| 협업 | 세션 안에서 만든 맥락이 그 세션에 갇혀 있다 | 세션 간 공유와, 여러 사람 및 에이전트가 같은 산출물을 함께 다루는 협업을 지원하려 한다 |

자료 자체의 한계로 기록해 둘 것은 다음과 같다.

- **재현 가능한 평가가 없다.** 공개 벤치마크나 eval 결과가 없고 모든 수치가 사내 집계다. 특히 영업 성과 수치는 사용 주와 미사용 주를 비교한 관찰 데이터라 인과 해석에 주의가 필요하다. 영업 활동이 2배 늘었는데 생성 기회 증가는 17%에 그치고 계약 성사는 39% 늘었다는 조합은 단순한 선형 효과로 설명되지 않는다.
- **핵심 기술 세부가 후속 글로 미뤄져 있다.** 1,000개 이상의 스킬 중에서 올바른 것을 고르는 hybrid RAG와 LLM 방식이 이 시스템의 가장 어려운 부분인데, 이 글에는 이름만 나온다.
- **모델 선택과 비용에 대한 서술이 없다.** 어떤 모델을 쓰는지, 토큰 비용이 얼마인지, 세션당 지연 시간이 얼마인지에 관한 정보가 없다.

## 6. 관련 연구 (Related Work)

- **LangChain deepagents**: harness의 기반이다. 같은 사례를 LangChain 쪽 시각에서 기술한 [[agents/langchain-2026-how-stripe-built-kai-on]]에 미들웨어 구성과 개발 기간이 더 자세히 나온다.
- **Agent Skills**: Kai의 스킬 개념은 Agent Skills 계열 규약과 같은 문제를 다룬다. 저장소에는 [[agents/agentskills-io-2026-agent-skills-overview]]와 [[agents/osmani-2026-agent-skills]]가 있다.
- **컨텍스트 관리**: 활성 컨텍스트와 확장 컨텍스트를 나누는 접근은 [[agents/anthropic-2025-effective-context-engineering-for-ai]]가 정리한 context engineering 논의와 맞닿는다.
- **사내 지식 자산화**: [[agents/theaxlabs-2026-company-brain-prompt-guide]]는 같은 문제를 훨씬 작은 조직 규모에서 프롬프트와 파일 규약으로 푸는 접근을 제시한다.
- **한국어 요약과 토론**: [[agents/hada-2026-stripe-kai-internal-ai-platform]]에 GeekNews 요약과 Hacker News 반응이 정리돼 있다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Kai | Stripe's Knowledge AI Platform의 줄임말이자 사내 에이전트 플랫폼의 제품명 |
| Agent Studio | 도메인 담당자가 스킬, 맞춤 에이전트, 도구 구성을 만들고 테스트하고 모니터링하는 제어 계층 |
| NoCode Agent Builder | Kai 이전에 Stripe가 쓰던 노코드 에이전트 제작 도구. 4,000개 이상의 에이전트가 만들어졌다 |
| surface-agnostic API | 웹 앱, Slack, 사내 도구가 모두 같은 에이전트 서비스를 부르도록 인터페이스에 종속되지 않게 설계한 API |
| 멀티테넌트 가상 파일 시스템 | 여러 세션이 각자의 파일 공간을 격리한 채 공유 저장소 위에서 산출물을 읽고 쓰게 하는 파일 계층 |
| 활성 컨텍스트와 확장 컨텍스트 | 실제로 LLM 요청에 실어 보내는 부분과 S3나 가상 파일 시스템에 두고 필요할 때만 꺼내는 부분을 구분한 Stripe의 용어 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | Kai 웹 앱 세션 시작 화면과 복합 과제 프롬프트 | fetched | ★ wiki 권장 (product) |
| fig02 | 사내 분석 도구에 내장된 Kai 패널 | fetched | ★ wiki 권장 (architecture) |
| fig03 | Agent Studio 시작 화면 | fetched | ★ wiki 권장 (product) |
| fig04 | 제품용 에이전트와 공유하는 실행 환경 구조 | fetched | ★ wiki 권장 (architecture) |
| fig05 | 2026년 6월 36만 세션의 분위 분포 차트 | fetched | ★ wiki 권장 (result) |
| fig06 | 원문 페이지 전체 스크린샷 | screenshot | 아카이브용 |
| fig07 | fig01 화면의 브라우저 크롭본 | crop | 중복 |
| fig08 | fig02 화면의 브라우저 크롭본 | crop | 중복 |
| fig09 | fig03 화면의 브라우저 크롭본 | crop | 중복 |
| fig10 | fig04 도식의 브라우저 크롭본 | crop | 중복 |
| fig11 | fig05 차트의 브라우저 크롭본 | crop | 중복 |

fig07부터 fig11까지는 `--crop`이 같은 요소를 브라우저에서 다시 찍은 것이라 fig01부터 fig05까지와 내용이 겹친다. 원본 해상도가 더 높은 fetched 쪽을 쓴다.
