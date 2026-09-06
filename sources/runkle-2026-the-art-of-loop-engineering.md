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
    caption: "Loop 1 agent loop. model이 action으로 tool을 호출하고 observation을 받는 과정을 작업이 끝날 때까지 반복해 result를 낸다 (원본 도식 재현)"
    strategy: manual
    curated: true
  - id: loop1-agent-docs
    file: assets/runkle-2026-the-art-of-loop-engineering/loop1-agent-docs.svg
    caption: "Loop 1을 docs writer에 적용한 예. model이 계획과 초안을 만들고 sandbox tools로 clone, read, write를 수행해 pull request를 낸다 (원본 도식 재현)"
    strategy: manual
    curated: true
  - id: loop2-verification
    file: assets/runkle-2026-the-art-of-loop-engineering/loop2-verification.svg
    caption: "Loop 2 verification loop. agent loop 전체를 감싼 grader가 rubric과 eval로 result를 채점하고, 통과하면 done, 미달이면 피드백과 함께 재시도시킨다 (원본 도식 재현)"
    strategy: manual
    curated: true
  - id: loop2-verification-docs
    file: assets/runkle-2026-the-art-of-loop-engineering/loop2-verification-docs.svg
    caption: "Loop 2를 docs writer에 적용한 예. grader가 링크 정상 작동과 CI 통과를 검사하고, 미달이면 피드백을 붙여 model에 되돌린다 (원본 도식 재현)"
    strategy: manual
    curated: true
  - id: loop3-event
    file: assets/runkle-2026-the-art-of-loop-engineering/loop3-event.svg
    caption: "Loop 3 event loop. event trigger가 verification loop 전체를 기동하고, 결과인 system update가 new events가 되어 다시 trigger로 순환한다 (원본 도식 재현)"
    strategy: manual
    curated: true
  - id: loop3-event-docs
    file: assets/runkle-2026-the-art-of-loop-engineering/loop3-event-docs.svg
    caption: "Loop 3을 docs writer에 적용한 예. 사내 #docs-plz Slack 메시지가 trigger가 되고, 결과인 docs enhancement가 new request로 순환한다 (원본 도식 재현)"
    strategy: manual
    curated: true
  - id: loop4-hill-climbing
    file: assets/runkle-2026-the-art-of-loop-engineering/loop4-hill-climbing.svg
    caption: "Loop 4 hill climbing loop. 네 겹이 모두 포개진 전체도로, system update가 남긴 traces를 engine이 분석해 harness improvements를 안쪽 agent loop에 되돌린다 (원본 도식 재현)"
    strategy: manual
    curated: true
  - id: loop4-hill-climbing-docs
    file: assets/runkle-2026-the-art-of-loop-engineering/loop4-hill-climbing-docs.svg
    caption: "Loop 4를 docs writer에 적용한 예. engine analysis가 여러 trace에 걸친 문제를 찾아 프롬프트와 tool 변경을 제안하고, 그것이 harness improvements로 반영된다 (원본 도식 재현)"
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

LangChain의 Sydney Runkle이 2026년 6월 16일 자사 블로그에 발행한 글이다. 에이전트의 신뢰할 만한 성능은 더 나은 언어 모델이 아니라 모델을 둘러싸고 과제에 맞춰 설계한 실행 골격에서 나온다고 보고, 가장 안쪽의 agent loop 바깥에 verification, event-driven, hill climbing 세 겹을 더 두르는 4단계 루프 스택을 제시한다. 각 층을 LangChain 제품(`create_agent`, `RubricMiddleware`, LangSmith Deployment와 Fleet, LangSmith Engine)에 하나씩 매핑하고, 층마다 사람의 판단이 들어갈 지점을 함께 지정한다.

## 1. 자료 정보 (Document Information)

- **저자**: Sydney Runkle (LangChain)
- **게시일**: 2026년 6월 16일
- **매체**: LangChain Blog
- **URL**: https://www.langchain.com/blog/the-art-of-loop-engineering
- **분량과 구성**: 중간 길이 에세이. 도입, 네 개 루프 레벨, 사람의 감독, 종합 표 순서다.
- **러닝 예제**: 사내 문서화 에이전트(docs writer agent) 하나를 글 전체에서 단계별로 확장하며 설명한다.
- **언급 도구와 제품**: LangChain `create_agent`, `RubricMiddleware`, `after_agent` 훅, LangSmith Deployment(스케줄과 webhook), Fleet(no-code 에이전트 빌더), LangSmith Engine(trace 분석)
- **연결 개념**: `loopcraft: the art of stacking loops`라는 선행 논의를 출발점으로 인용한다.
- **원본 수집 제약**: `raw/`에 저장된 본문은 사용자 지시에 따라 `WebFetch`로 가져온 것이다. LangChain 블로그가 클라이언트 렌더링 페이지라 일부 문단은 fetch 모델이 재구성한 표현이고, 큰따옴표로 감싼 인용문만 원문 그대로다. 따라서 개별 문장의 어휘 선택은 원문과 다를 수 있고, 인용 없이 쓰인 표현은 원문 직접 인용으로 다루지 않는다.

## 2. 주요 기여 (Key Contributions)

1. **4단계 루프 스택 정식화**. 에이전트 시스템을 네 겹의 루프로 분해한다. (1) Agent는 실행, (2) Verification은 품질, (3) Event-Driven은 통합과 자율 실행, (4) Hill Climbing은 자기 개선을 담당한다. 네 층은 병렬 목록이 아니라 안쪽 루프를 바깥 루프가 감싸는 중첩 구조다.
2. **각 층과 LangChain 도구의 매핑**. 추상적인 루프 개념을 구체 제품에 하나씩 붙인다. `create_agent`, `RubricMiddleware`, LangSmith Deployment와 Fleet channel, LangSmith Engine 순서다.
3. **단일 러닝 예제로 네 층 관통**. 사내 문서화 에이전트 하나가 네 루프를 거치며 어떻게 확장되는지를 보여, 추상 개념을 하나의 실무 흐름으로 묶는다.
4. **hill climbing을 개선의 자동화로 규정**. 앞 세 루프가 실행을 자동화한다면 네 번째는 개선 자체를 자동화한다는 점을 핵심으로 둔다. 복귀 경로가 시작점으로 가지 않고 안쪽 agent loop을 직접 수정한다는 구조적 차이를 강조한다.
5. **각 층의 human-in-the-loop 지점 명시**. 자동화가 사람을 배제하지 않는다는 전제 아래, 사람의 판단이 들어갈 자리를 네 개 항목으로 정리한다.
6. **전략적 권고**. 그동안 관심이 몰렸던 loop 1과 loop 2에서 loop 3과 loop 4로 무게를 옮기라고 제안한다. 통합과 자기 개선에서 우위가 계속 쌓인다는 주장이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 출발점

본문의 전제는 두 문장이다. 에이전트가 가치를 갖는 이유는 실제 환경에서 action을 실행해 일을 자동화하기 때문이다. 그러나 신뢰할 만한 성능에는 우수한 언어 모델만으로 부족하고, 과제에 맞춰 신중하게 설계한 실행 골격이 필요하다.

가장 안쪽의 기본 루프는 저자가 직접 인용으로 정의한다. "The core agent algorithm is simple: give the LLM context and let it call tools in a loop until it's done." 모델에 컨텍스트를 주고 끝날 때까지 루프 안에서 tool을 호출하게 두는 것이 전부다.

이 기본 루프 하나로는 부족하다는 것이 글의 문제의식이다. 정교한 에이전트 시스템은 여러 루프가 함께 구동하며, 선행 논의 `loopcraft: the art of stacking loops`가 여러 루프를 층으로 쌓고 확장해 더 유능한 에이전트를 만드는 방법을 다뤘다. 본문은 그 층들이 어떻게 겹치는지, 그리고 각 레벨을 어떤 LangChain 도구가 구현하는지를 이어서 설명한다.

### 3.2 4단계 루프 스택

원문 말미의 종합 표를 옮기면 다음과 같다.

| Loop | 기능 | 효과 | LangChain 도구 |
|---|---|---|---|
| 1. Agent loop | 모델이 작업이 끝날 때까지 tool을 반복 호출한다 | 일을 자동화한다 | `create_agent`와 지원 모델 |
| 2. Verification loop | 에이전트를 실행하고 출력을 rubric으로 채점해 미달이면 피드백과 함께 재시도한다 | 품질과 정확성을 보장한다 | `RubricMiddleware` |
| 3. Event driven loop | 이벤트가 에이전트를 기동해 실제 시스템을 수정한다 | 자동화된 일을 넓게 실행한다 | LangSmith Deployment의 스케줄과 webhook, 또는 Fleet channel |
| 4. Hill climbing loop | production trace를 분석 에이전트가 읽고 harness 설정을 다듬는다 | harness를 지속 개선한다 | LangSmith Engine |

표의 도구 열은 원문 표 기준이다. 본문에서는 loop 2의 구현으로 `RubricMiddleware` 외에 `create_agent`의 `after_agent` 훅도 함께 제시된다.

### 3.3 Loop 1 Agent loop

가장 안쪽 층에서 에이전트는 모델 하나와 tool 집합으로 구성된다. 모델이 작업을 마칠 때까지 tool을 연달아 호출하는 것이 이 루프의 전부다.

LangChain의 `create_agent` 함수가 제공하는 것이 바로 이 구조다. 모델을 고르고 tool을 넣으면 동작하는 agent loop이 만들어진다. 여기서 tool은 에이전트가 실제 시스템에 action을 가하는 통로에 해당한다.

러닝 예제인 사내 문서화 에이전트를 이 층에 놓으면 다음과 같이 동작한다. 문서 개선 요청을 받고, 모델이 계획을 세우고 수정안 초안을 작성하며, tool을 활용해 저장소를 clone하고 파일에 접근하고 문서를 작성하고 pull request를 생성하는 등의 조작을 수행한다.

### 3.4 Loop 2 Verification loop

agent loop은 일을 처리하지만 초기 출력이 품질이나 일관성 기준을 매번 충족하지는 않는다. 일관성이 중요한 경우에는 agent loop을 verification 구조로 감싸, 출력을 평가하고 기준에 못 미칠 때 피드백을 반환하는 방식이 유효하다.

verification 층이 도입하는 구성 요소가 grader다. grader는 에이전트 출력을 정해진 기준에 대고 평가하고, 실패하면 개선용 피드백을 붙여 결과를 되돌리는 컴포넌트를 말한다. grader는 deterministic하게 규칙으로 판정할 수도 있고 LLM 기반 평가 방식을 쓸 수도 있다.

구현은 저자의 직접 인용으로 제시된다. "`RubricMiddleware` handles this pattern, or you can wire it up with an `after_agent` hook on `create_agent`." 이 배선을 통해 사람이 매번 개입하지 않아도 체계적인 품질 점검이 이뤄진다.

문서화 에이전트 예에서는 채점 장치가 매 시도 뒤에 테스트를 실행해 세 가지를 확인한다. 하이퍼링크가 정상 작동하는지, 지속적 통합(CI) 검사가 통과하는지, 수정 범위가 명시적으로 요청된 것에만 머물러 있는지다. 저자는 이 절차가 사람의 검토를 요구하는 오류 부류 전체를 미리 걷어낸다고 본다.

대가도 명시된다. verification은 실행마다 지연과 운영 비용을 추가한다. 저자는 이 교환이 속도보다 품질이 우선하는 상황에서 값어치를 하며, 대부분의 production 배포가 그런 상황이라고 평가한다.

### 3.5 Loop 3 Event driven loop

에이전트 개발에서 결정적인 구성 요소로 저자가 지목하는 것은 integrations layer다. integrations layer는 에이전트를 조직 인프라에 연결해 백그라운드에서 자율적으로 동작하게 만드는 층을 뜻한다.

동작 방식은 직접 인용으로 서술된다. "The event-driven loop connects your agent to your ecosystem." 이어지는 문장은 이벤트가 발생하는 세 경우를 나열한다. 새 문서가 도착하거나, 스케줄이 발동하거나, webhook이 도착하는 경우이며, 그때 에이전트가 실행된다. 사람이 수동으로 호출하는 대신, 에이전트가 더 큰 시스템 안에서 계속 동작하는 구성 요소가 된다.

LangSmith Deployment가 이 트리거 인프라를 제공하며 예약 실행과 webhook 연동을 지원한다. 스케줄의 흔한 구현이 heartbeat다. heartbeat는 에이전트를 늘 깨어 있고 앞서 움직이는 보조자로 바꾼다.

문서화 에이전트는 no-code 에이전트 구축 플랫폼인 Fleet 위에서 동작한다. Fleet의 channel과 스케줄 기능이 이벤트 기반 기동과 정기 반복 기동을 관리한다. 실제 배선은 channel을 사용해, 사내 `#docs-plz` Slack 채널에 메시지가 올라올 때마다 docs 에이전트를 깨우는 방식이다.

### 3.6 Loop 4 Hill climbing loop

앞의 세 루프가 실행을 자동화한다면, 네 번째 루프는 개선 자체를 자동화한다. 저자는 이 네 번째를 가장 중요할 수 있는 층으로 꼽는다.

에이전트가 한 번 실행될 때마다 trace가 남는다. trace는 모델의 action, tool call, grader의 판정 등을 담은 실행 기록을 말한다. 저자는 이 기록에 성능의 강점과 약점에 대한 유용한 신호가 들어 있다고 본다.

hill climbing 장치는 분석 에이전트를 실행해 이 trace들을 살펴보고, 거기서 얻은 발견으로 harness 설정을 고친다. harness는 모델을 둘러싼 프롬프트, tool, grader 같은 실행 골격이다. 수정 대상은 프롬프트 조정, tool 변경, grader 개선이다. LangSmith에서는 trace 검토 도구인 Engine으로 이 네 번째 루프를 구성한다.

문서화 에이전트로 확장하면 Engine이 docs 에이전트의 trace를 분석해 문제를 식별한다. 여러 trace가 같은 문제를 가리키면, 해당 프롬프트나 tool의 수정을 요청하는 알림이 발행된다.

이 루프가 보통의 루프와 다른 지점은 복귀 경로다. 반환 경로가 단순히 시작점으로 되돌아가지 않고 안쪽으로 파고들어 agent loop 자체를 업그레이드한다. 바깥 루프가 한 바퀴 순환할 때마다 안쪽 장치의 효율이 올라가는 구조다.

### 3.7 Hill climbing의 확장 방향

저자는 `Looking forward` 항목에서 개선 대상의 확장 가능성을 짚는다. 프롬프트와 tool 설정은 손대기 쉬운 개선 표적이지만 전체 그림의 일부일 뿐이라는 것이다.

self-hosted 모델을 운영하는 조직이라면 hill climbing 장치가 trace와 평가 정보를 강화학습 기반 fine-tuning(RL fine-tuning)으로 흘려보내, 그 정보를 모델 자체를 개선하는 학습 재료로 쓸 수 있다. 메모리 구조나 학습된 스킬 같은 부수 요소도 같은 방식으로 다룰 수 있다.

핵심은 구조와 대상의 분리다. 반복 구조 자체는 그대로 유지되고, 최적화 대상이 무엇인지만 유연하게 바뀐다.

### 3.8 사람의 감독과 전문성

자동화가 사람의 참여를 없앨 필요는 없다는 것이 이 절의 전제다. 모든 레벨에는 사람의 판단이 의미 있게 기여하는 자연스러운 자리가 있다.

저자가 드는 대비는 문서 품질이다. 자동 grader는 링크가 작동하는지 검증할 수 있지만, 독자층에 적합한 글인지 알아보는 일에는 사람의 관점이 필요하다. 축적된 시각과 경험과 분별에서 나오는 이런 종류의 판단이야말로 사람의 검토가 정당성을 얻는 지점이라고 본다.

역량 가운데 일부는 프롬프트 명세나 tool 정의 안에 부호화해 둘 만하다. 그러나 결과가 무거운 활동에는 사람의 직접 검토가 필요하다. 저자가 드는 예는 금전이 오가는 거래와 데이터베이스에 영향을 주는 조작이다.

LangChain은 이 검토 지점을 모든 레벨에 넣기 쉽게 만들었다고 서술하며 네 항목을 열거한다.

| 지점 | 사람이 하는 일 |
|---|---|
| agent loop 안 | 결과가 무거운 조작이나 tool use 앞에 "human input" 요구를 배치한다 |
| verification 층 안 | 중요한 워크플로에서 사람을 grader로 지정한다 |
| application 층 안 | 최종 사용자에게 결과를 전송하기 전에 사람의 승인을 받는다 |
| hill climbing 층 안 | harness 개선안을 적용하기 전에 사람의 평가를 거치게 한다 |

열거된 네 지점은 앞서 정의한 네 루프와 정확히 일치하지 않는다. event driven loop에 해당하는 항목이 없고 그 자리에 application 층이 들어와 있다. 본문은 "every level"이라고 적지만 실제 목록은 이렇게 어긋난다.

LangChain은 자사 오픈소스 도구가 "human in the loop"을 "first class primitive"로 자리매김한다고 표현한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

본 자료는 제품 관점의 프레임워크 정리 글이라 정량 벤치마크가 없다. 처리량이나 결함률 같은 측정치 대신, 단일 러닝 예제인 문서화 에이전트로 네 루프의 효과를 서술로 보여준다.

본문에서 검증 가능한 도구 기능 진술은 다음과 같다.

- `create_agent`로 모델과 tool을 묶어 기본 agent loop을 구성한다.
- `RubricMiddleware` 또는 `create_agent`의 `after_agent` 훅으로 채점 패턴을 구현한다.
- LangSmith Deployment가 예약 실행과 webhook 연동을 지원한다.
- Fleet의 channel과 스케줄 기능이 이벤트 기반 기동과 정기 기동을 관리하며, Slack 채널 메시지를 트리거로 쓸 수 있다.
- LangSmith Engine이 trace 분석으로 harness 개선 지점을 표면화하고, 반복되는 문제에 대해 수정 요청 알림을 발행한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **2차 자료이자 제품 서사**. LangChain 자사 블로그라 네 루프가 자사 제품 라인업(`create_agent`, LangSmith, Fleet)에 맞춰 정렬돼 있다. 도구 중립적 프레임워크라기보다 제품 내러티브에 가깝다.
- **정량 근거 부재**. verification과 hill climbing이 실제로 품질을 얼마나 끌어올리는지 수치가 없다. 지연과 비용 증가도 "그만한 값을 한다"는 정성 평가에 머문다.
- **loop 4의 미성숙**. hill climbing, 특히 RL fine-tuning으로의 확장은 self-hosted 모델을 운영하는 조직에 한정된 전망으로 제시되며, 구현 사례나 결과가 본문에 붙지 않는다.
- **human-in-the-loop 목록의 불일치**. 본문은 모든 레벨에 검토 지점을 둔다고 적지만, 열거된 네 항목에는 event driven loop이 없고 대신 application 층이 들어간다. 네 루프 프레임과 검토 지점 목록이 일대일로 맞지 않는다.
- **attribution 부재**. 저자는 저명한 기술자들이 독립적으로 같은 결론에 도달했다고 적지만 구체 인물이나 링크를 달지 않는다. 선행 논의로 인용한 `loopcraft: the art of stacking loops`도 URL 없이 제목만 언급된다.
- **수집본의 표현 신뢰도**. `raw/`의 본문은 클라이언트 렌더링 페이지를 fetch한 결과라 큰따옴표 인용문 밖의 문장은 원문 표현 그대로가 아니다. 어휘 수준의 인용이 필요하면 원문 URL을 확인해야 한다.
- **저자가 명시한 향후 방향**. 무게중심을 loop 1과 loop 2에서 loop 3과 loop 4로 옮기고, trace와 평가 신호를 강화학습, 메모리, 스킬 개선으로까지 확장한다.

## 6. 관련 연구 (Related Work)

본문이 명시적으로 연결한 개념은 다음과 같다.

- `loopcraft: the art of stacking loops`. 여러 루프를 층으로 쌓아 더 유능한 에이전트를 만든다는 선행 논의다. 본 글의 출발점이며 URL은 붙어 있지 않다.
- LangChain `create_agent`, `RubricMiddleware`, `after_agent` 훅, LangSmith Deployment, LangSmith Engine, Fleet. 각 루프의 구현 도구다.
- 저명한 기술자들이 독립적으로 같은 결론에 도달했다는 언급. 구체 인물이나 URL은 없다.
- 조직 차원의 함의를 다룬 업계 인사들의 진술. 학습 장치를 일찍 갖춰 사람의 판단과 연산 자원이 서로를 강화하게 만든 기업이 경쟁자가 따라잡기 어려운 우위를 확보한다는 내용이다. 이 문장 역시 화자가 특정되지 않는다.

본 wiki에서 같은 loop engineering 주제를 다른 저자나 각도로 다룬 자매 자료는 다음과 같다.

- [[agents/osmani-2026-loop-engineering]]. 같은 용어를 코딩 에이전트 관점에서 본 에세이다. Osmani의 5+1 구성 요소와 Runkle의 4 루프 스택이 대비된다.
- [[agents/lee-jeongmin-2026-loop-engineering-claude-code]]. loop engineering을 RLM 이론과 Claude Code의 dynamic workflow에 묶은 한국어 카드 포스트다.
- [[agents/lee-hoyeon-2026-harness-engineering]]. 프롬프트에서 컨텍스트, harness로 이어지는 3단계 진화 모델이다. Runkle의 hill climbing이 이 모델의 개선 항목에 대응한다.
- [[agents/lin-2026-harness-updating-is-not-harness-benefit]]. harness 자기 개선의 이득을 측정 관점에서 비판한다. loop 4가 실제로 가치를 더하는지 따져볼 때 쓰는 대조 자료다.

## 7. 용어집 (Glossary)

- **loop engineering / loopcraft**. 개별 프롬프트가 아니라 에이전트를 둘러싼 루프 구조를 설계 대상으로 삼는 접근. 여러 루프를 층으로 쌓아 더 유능한 에이전트를 만든다.
- **agent loop**. 모델이 작업을 마칠 때까지 tool을 반복 호출하는 가장 안쪽 루프. `create_agent`가 제공한다.
- **verification loop**. agent 출력을 grader가 채점하고 미달이면 피드백과 함께 재시도시키는 품질 루프.
- **grader**. 출력을 정해진 기준에 대고 평가하는 컴포넌트. deterministic한 규칙 방식과 LLM 기반 평가 방식이 있다.
- **`RubricMiddleware`**. 채점 패턴을 구현하는 LangChain 미들웨어. `create_agent`의 `after_agent` 훅으로도 배선할 수 있다.
- **event driven loop**. 새 문서 도착, 스케줄 발동, webhook 도착 같은 이벤트가 에이전트를 기동해 백그라운드에서 자율 실행시키는 통합 루프.
- **integrations layer**. 에이전트를 조직 인프라에 연결해 백그라운드 자율 동작을 가능하게 하는 층.
- **heartbeat**. 스케줄 기반 트리거의 흔한 구현. 에이전트를 늘 깨어 있고 앞서 움직이는 보조자로 만든다.
- **Fleet**. LangChain의 no-code 에이전트 구축 플랫폼. channel과 스케줄로 이벤트 기동과 정기 기동을 관리한다.
- **hill climbing loop**. production trace를 분석 에이전트가 읽고 harness를 다듬는 자기 개선 루프. 복귀 경로가 안쪽 agent loop을 직접 수정한다.
- **trace**. 한 번의 에이전트 실행이 남기는 기록. 모델의 action, tool call, grader 판정 등이 담긴다. hill climbing의 입력이다.
- **harness**. 모델을 둘러싼 프롬프트, tool, grader, 메모리 등의 실행 골격. hill climbing이 개선하는 대상이다.
- **LangSmith Engine**. trace를 검토해 harness 개선 지점을 표면화하는 도구. loop 4의 구현이다.
- **human-in-the-loop**. 자동화의 각 층에 사람의 판단을 배치하는 설계. LangChain은 이를 "first class primitive"로 다룬다고 표현한다.

## 8. 그림 후보 (Figure Candidates)

원본 블로그 도식은 클라이언트 렌더링이라 ingest 시 자동 수집에 실패했다. 사용자가 스크린샷으로 제공한 것을 같은 구조의 SVG로 재현했다. 원본이 네 루프마다 일반형과 docs writer 예시형을 한 쌍으로 두므로 총 8장이다.

8장 모두 `wiki/assets/runkle-2026-the-art-of-loop-engineering/`에 큐레이션 사본으로 들어가며, Obsidian과 GitHub Pages 어디서나 플러그인 없이 렌더된다. 생성기는 `scripts/build_loop_diagrams.py`로 좌표와 스타일을 코드로 관리하며 deterministic하다. 수정이 필요하면 스크립트를 고쳐 다시 실행한다.

| id | 유형 | 내용 | 근거(원본 도식) | strategy | 추천 |
|---|---|---|---|---|---|
| loop1-agent | flowchart | model이 action과 observation으로 tool을 반복 호출해 result에 도달 | `LOOP 1 — AGENT LOOP` | manual | ★ wiki |
| loop1-agent-docs | flowchart | model이 계획과 초안을 만들고 sandbox tools로 clone, read, write를 거쳐 pull request 생성 | `DOCS WRITER AGENT LOOP` | manual | ★ wiki |
| loop2-verification | flowchart | agent loop을 grader가 감싸 채점하고, pass면 done, fail이면 피드백과 함께 재시도 | `LOOP 2 — VERIFICATION LOOP` | manual | ★ wiki |
| loop2-verification-docs | flowchart | grader가 링크 정상 작동과 CI 통과를 검사 | `DOCS WRITER VERIFICATION LOOP` | manual | ★ wiki |
| loop3-event | architecture | event trigger가 verification loop을 기동하고 system update가 new events로 순환 | `LOOP 3 — EVENT LOOP` | manual | ★ wiki |
| loop3-event-docs | architecture | #docs-plz Slack 메시지가 트리거가 되고 docs enhancement가 new request로 순환 | `DOCS WRITER EVENT LOOP` | manual | ★ wiki |
| loop4-hill-climbing | flowchart | 네 겹 전체도에 traces에서 engine analysis를 거쳐 harness improvements가 안쪽으로 되돌아가는 경로 | `LOOP 4 — HILL CLIMBING LOOP` | manual | ★ wiki (overview) |
| loop4-hill-climbing-docs | flowchart | engine analysis가 trace에서 문제를 탐지해 프롬프트나 tool 변경을 제안 | `DOCS WRITER HILL CLIMBING LOOP` | manual | ★ wiki |
