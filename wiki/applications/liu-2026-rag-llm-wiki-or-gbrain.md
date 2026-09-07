---
title: "RAG, LLM Wiki, or GBrain? 에이전트 메모리 결정 프레임워크 (Liu)"
type: article
year: 2026
category: applications
raw_path: raw/articles/liu-2026-rag-llm-wiki-or-gbrain.md
raw_filename: "liu-2026-rag-llm-wiki-or-gbrain.md"
source: liu-2026-rag-llm-wiki-or-gbrain.md
source_collection: external
author: "Yanli Liu"
url: "https://ai.gopubby.com/rag-llm-wiki-or-gbrain-how-your-agent-remembers-changes-everything-56829e66725c"
publisher: "ai.gopubby.com (Medium)"
publication_date: "2026-04-27"
tags: [rag, llm-wiki, gbrain, karpathy, garry-tan, fat-skills, decision-framework, retrieve-compile-act, signal-detector, thin-harness, context-window, claude-code]
---

## 요약

Yanli Liu가 2026년 4월 27일에 발표한 15분 분량의 에세이로, 에이전트가 지식을 기억하는 방식을 세 가지 아키텍처로 나누고 그중 어느 것을 골라야 하는지의 판단 기준을 제시한다. 세 후보는 대규모 코퍼스에서 답을 찾아오는 RAG, 원본을 상호 연결된 문서로 미리 컴파일하는 Karpathy의 LLM Wiki, 컴파일한 지식으로 스스로 실행까지 하는 Garry Tan의 GBrain식 fat skills다.

이 글이 다른 비교 글과 구별되는 지점은 판단 기준을 기능 목록이 아니라 질문 하나로 압축한다는 데 있다. 저자가 던지는 질문은 "what is your agent's job?"이다. 에이전트가 하는 일이 대규모 코퍼스에서 답을 retrieve하는 것이면 RAG, 시간이 지날수록 풍부해지는 지식을 compile하는 것이면 LLM Wiki, 아는 것으로 자율 실행(act)하는 것이면 fat skills가 답이 된다.

저자는 세 아키텍처가 경쟁 관계가 아니라 같은 문제의 서로 다른 버전을 푼다고 본다. 원문의 표현은 "Picking between them is a design decision, not a loyalty test"다. 그래서 결론도 승자를 고르는 대신 수렴을 예측한다. 2026년의 질문은 어느 쪽이 이기느냐가 아니라 retrieve와 compile과 act의 경계가 얼마나 빨리 허물어져 셋을 모두 수행하는 단일 knowledge operating system이 되느냐라는 것이다.

이 페이지는 글의 전개를 따라 세 아키텍처의 구조와 운영 조건, 각각이 남기는 문제를 차례로 정리하고, 마지막에 비교표와 수렴 전망을 둔다. 자체 벤치마크가 없는 에세이이므로 본문에 인용된 수치를 별도 표로 모아 두었다.

## 배경

### 두 대안이 등장한 맥락

글이 나오기 약 3주 전, Andrej Karpathy가 GitHub gist를 공개해 며칠 만에 star 5,000개를 받았다. 주장은 문서 위에서 LLM을 검색 엔진으로 쓰지 말고, 원본을 컴파일하고 상호 참조하며 살아 있는 wiki를 유지하는 지식 엔지니어로 쓰라는 것이었다. 이후 Garry Tan이 자율 스킬 24개와 cron job 21개, 17,888 페이지 규모의 brain으로 구성된 GBrain을 공개했다. 이 시스템은 기억하는 데 그치지 않고 그 지식으로 스스로 실행한다.

저자는 두 사람이 진단에는 동의한다고 정리한다. RAG만으로는 충분하지 않다는 것이다. 에이전트가 질문마다 같은 문서를 다시 읽고, 학습하지 않고, 누적하지 않고, 어제의 통찰과 오늘의 질의를 연결하지 못한다. 검색기이지 사고하는 주체가 아니라는 진단이다.

처방은 반대 방향을 향한다. Karpathy는 자료를 넣을수록 풍부해지는 지속적이고 상호 연결된 wiki를 만들라고 하고, Tan은 그 지식을 실행 가능한 형태로 바꾸어 사용자가 잠든 사이에도 배경에서 작업하는 스킬을 만들라고 한다. 그리고 그동안 대부분의 production 팀은 여전히 기본형 RAG를 운영한다. 이상적이어서가 아니라 규모에서 동작하고 대안들이 아직 신생이기 때문이다.

### 에이전트가 잊는 이유

에이전트 설계에서 자주 생략되는 전제는 context window가 메모리가 아니라는 사실이다. context window는 모델이 한 번에 받아들일 수 있는 토큰 길이 한도를 뜻하는데, 저자는 이를 세션이 끝날 때마다 지워지는 화이트보드에 비유한다.

한도가 크다고 문제가 없어지지도 않는다. 100만 토큰을 담을 수 있는 모델도 30만에서 40만 토큰 구간, 즉 한도의 30~40% 지점에서 성능 저하가 시작된다. 그리고 세션이 끝나면 담아 두었던 내용이 전부 사라져 다음 대화는 다시 0에서 시작한다.

RAG는 이 문제에 대한 첫 번째 진지한 답이었다. 전부를 context window에 밀어 넣는 대신 문서를 벡터로 임베딩해 데이터베이스에 저장하고 질의 시점에 관련 청크만 가져온다. 저자는 수백만 개의 production 시스템이 이 방식 위에서 동작한다고 적으며 RAG의 실효성 자체는 부정하지 않는다.

### RAG가 에이전트에서 특히 취약한 세 지점

문제는 RAG가 대화형 질의응답이 아니라 에이전트를 뒷받침할 때 드러난다. 2024년의 한 연구 논문이 production RAG 시스템에서 실패 지점 7개를 정리했고, 저자는 그중 에이전트에게 가장 치명적인 세 가지를 골라낸다. 세 가지 모두 언어 모델이 컨텍스트를 보기도 전에 발생한다는 공통점이 있다.

| 실패 유형 | 무엇이 깨지는가 | 저자가 든 구체 사례 |
|---|---|---|
| chunking problem | 하나의 문서가 조각나면서 관련 정보가 서로 다른 벡터로 흩어진다 | 30페이지 기술 명세가 500토큰 조각으로 쪼개지면 컴플라이언스 요구사항이 담긴 청크와 그 요구사항의 존재 이유를 설명하는 청크가 분리된다. 검색기는 하나만 찾고 다른 하나를 놓친다 |
| re-derivation problem | 모든 질의가 매번 처음부터 도출을 반복하고 결과가 누적되지 않는다 | 어제 같은 아키텍처 문서를 분석해 같은 결론에 도달했더라도 내일 또 같은 분석을 한다 |
| passivity problem | 물어볼 때까지 기다리고 변화나 모순을 스스로 알아채지 않는다 | 지난 화요일에 인덱싱한 문서가 오늘 인덱싱한 문서와 모순되어도 표시하지 않고, 세 자료가 중요한 세부에서 어긋나도 알리지 않는다 |

첫 번째 실패의 결과는 단순한 오답이 아니라는 점에서 더 위험하다. 요구사항 청크만 검색된 상태에서 모델이 답을 만들면 기술적으로는 맞지만 맥락이 빠진 답이 나오며, 사용자는 그 답이 불완전하다는 것을 알 방법이 없다.

두 번째 실패에 대한 Karpathy의 표현이 이 글에서 가장 자주 인용되는 문장이다. "RAG rereads the same books for every exam, never actually learning the material". RAG는 검색할 뿐 학습하지 않는다는 뜻이다.

저자는 세 실패를 각각 fragmented context, no compounding, no action으로 요약한다. 그리고 이 요약이 곧 나머지 두 아키텍처의 설계 목표가 된다. Karpathy의 LLM Wiki가 앞의 두 개를 겨냥하고, Tan의 GBrain이 세 개 전부를 겨냥한다.

| 실패 | RAG | LLM Wiki | Fat Skills |
|---|---|---|---|
| fragmented context | 남아 있다 | 원본을 미리 읽어 하나의 문서로 합성하므로 해소된다 | wiki 계층을 포함하므로 해소된다 |
| no compounding | 남아 있다 | ingest마다 기존 page를 갱신해 해소된다 | 스킬 실행이 brain을 갱신해 해소된다 |
| no action | 남아 있다 | 남아 있다 | cron과 always-on 스킬로 해소된다 |

이 대응 관계가 글 전체의 구성 순서를 정한다. 세 아키텍처를 나란히 놓고 기능을 비교하는 대신, 앞 아키텍처가 남긴 문제를 뒤 아키텍처가 어떻게 겨냥하는지의 순서로 서술한다. 그래서 fat skills 절이 wiki 절을 전제로 읽히며, GBrain 자체가 brain page라는 wiki형 저장 계층 위에 실행 계층을 올린 구조다.

## 핵심 개념

**retrieve, compile, act**는 글 전체를 관통하는 세 동사이며 각각 하나의 아키텍처에 대응한다. retrieve는 질의 시점에 원본 조각을 찾아오는 일, compile은 원본을 미리 읽어 상호 연결된 지식으로 바꾸어 두는 일, act는 그 지식을 근거로 사람의 지시 없이 작업을 실행하는 일이다.

**복리 누적(compounding)**은 LLM Wiki의 핵심 성질을 가리킨다. 새 원본 하나를 넣을 때마다 기존 문서가 함께 갱신되어, 자료가 늘어날수록 같은 질문에 대한 답의 품질이 올라가는 성질이다. RAG에는 이 성질이 없다. 문서를 아무리 많이 인덱싱해도 100번째 질의가 첫 번째 질의보다 나아지지 않는다.

**thin harness, fat skills**는 GBrain의 설계 역전을 가리키는 이름이다. harness는 모델을 감싸 도구와 검증과 상태를 제공하는 실행 환경을 뜻하는데, 통상의 프레임워크가 수십 개 도구 정의로 harness를 두껍게 만드는 것과 반대로 GBrain은 harness를 약 200줄로 얇게 두고 지능을 전부 markdown 스킬 파일로 옮긴다.

**contract로서의 스킬**은 fat skill이 프롬프트 템플릿과 다른 이유를 설명하는 개념이다. 스킬 파일의 frontmatter가 언제 발동하는지, 어떤 도구를 쓰는지, 어디에 쓰는지, 상태를 변경하는지를 선언하므로 실행 전에 그 스킬이 무엇을 할지 검사할 수 있다.

**resolver**는 사용자의 요청을 어느 스킬로 보낼지 정하는 라우팅 계층을 가리킨다. GBrain에서 이 역할은 별도 코드가 아니라 스킬 설명문이 수행하며, 저자는 이 점을 fat skills 설계에서 가장 반직관적인 대목으로 꼽는다.

**always-on 계층**은 사용자의 호출을 기다리지 않고 모든 입력에 대해 실행되는 스킬 묶음이다. 통상의 스킬이 트리거를 기다리는 것과 달리 이 계층은 본 응답과 병렬로 실행되어 기록할 가치가 있는 내용을 놓치지 않는다.

**latent 작업과 deterministic 작업의 분리**는 환각을 막기 위한 운영 원칙이다. 읽기와 합성, 패턴 인식처럼 판단이 필요한 일은 모델이 맡고, 데이터베이스 쓰기와 계산, 재현 가능한 산출처럼 정답이 하나뿐인 일은 결정적 코드가 맡는다. 저자가 인용한 GBrain의 전제는 "Mixing them is how agents hallucinate"다.

## 방법

### 결정 프레임워크의 출발 질문

저자는 아키텍처 선택을 기능 비교표에서 시작하지 않는다. 출발점은 에이전트가 수행하는 일의 성격이며, 그 성격이 정해지면 나머지 선택이 따라온다.

| 에이전트가 하는 일 | 전형적인 상황 | 선택 |
|---|---|---|
| 대규모 코퍼스에서 답을 retrieve | 문서가 수천 건이고 정기적으로 바뀌며 사용자가 빠른 답을 원한다. 알려진 비용 모델로 production에 올리는 것이 우선이다 | RAG |
| 누적되는 전문성을 compile | 논문과 규제 서류, 경쟁사 분석, 기술 명세가 수백 건이다. 가치가 개별 문서가 아니라 문서 사이의 연결에 있다 | LLM Wiki |
| 묻지 않아도 스스로 act | 답만이 아니라 감시와 표시, enrich, 실행을 원한다. 사용자가 잠든 사이에도 작업이 진행되기를 원한다 | Fat skills |

각 선택에는 조건이 붙는다. RAG를 고를 경우 저자는 reranker를 함께 쓰면 knowledge assistant 사용 사례의 80%를 덮는다고 덧붙인다. reranker는 1차 검색이 뽑은 후보를 정밀 모델로 다시 정렬하는 단계를 말한다. LLM Wiki를 고를 경우의 보상은 명확하다. 100번째 질의가 첫 번째 질의보다 확실히 나아지며 저자는 이것이 RAG가 약속할 수 없는 것이라고 강조한다. fat skills를 고를 경우에는 엔지니어링 예산을 함께 잡아야 한다.

### RAG 구조와 운영 조건

RAG의 파이프라인은 네 단계다. 문서를 벡터로 임베딩하고(embed), Pinecone이나 Chroma 같은 데이터베이스에 저장하고(store), 질의가 오면 가장 가까운 청크를 찾아(retrieve), 프롬프트에 넣어 모델이 답을 만든다(generate).

성숙도가 첫 번째 강점이다. LangChain과 LlamaIndex를 비롯한 여러 프레임워크가 이 파이프라인을 이미 표준화했다. 저자는 팀이 이미 만드는 법을 알고 있다는 사실이 대부분의 아키텍처 비교가 인정하는 것보다 중요하다고 지적한다.

규모가 두 번째 강점이다. 정책과 메모, 명세, Slack 내보내기까지 포함해 내부 문서 20만 건을 가진 회사가 전부 인덱싱한 뒤 같은 날 질의를 시작할 수 있다. wiki page로 전처리할 필요도 없고 스킬을 markdown으로 작성할 필요도 없다.

신선도가 세 번째 강점이다. 문서가 바뀌면 다시 임베딩하기만 하면 다음 질의부터 갱신된 내용이 반영된다. wiki 감사나 스킬 재작성 같은 후속 작업이 따라붙지 않는다.

약점은 두 가지로 정리된다.

- **구조적 chunking**: 청크 크기를 조절해 해결되는 문제가 아니다. 문서를 자르는 행위 자체가 정보를 분리하기 때문이다.
- **누적 지연**: 임베딩과 vector search, reranking, 컨텍스트 패키징으로 이어지는 다단계 파이프라인이 각 단계마다 밀리초를 더한다. 단일 질의에서는 문제가 되지 않지만 에이전트가 루프에서 tool call을 40번 하면 그 밀리초가 초 단위로 누적된다.

규제 산업에서의 위치도 이 절에서 다룬다. 데이터가 자기 vector store 안에 남고, retrieval이 감사 가능하며, 생성이 추적 가능하다. 저자는 규제 대상 산업에서 이 감사 가능성이 새 접근이 주는 복리 누적 이점보다 더 중요하게 평가되는 경우가 많다고 본다.

엔터프라이즈에서 RAG가 기본값인 이유도 정리된다. 가장 많은 실전 흉터를 가진 아키텍처이기 때문이다. 알려진 실패 유형이 있고 그에 대한 문서화된 수정 방법이 있으며 그 문제를 풀겠다고 경쟁하는 벤더 생태계가 있다. 저자는 다음 분기까지 사내 지식 어시스턴트를 출시해야 한다면 RAG가 검증된 경로라고 명시한다.

RAG를 쓰지 말아야 할 조건도 명시된다. 에이전트가 자기 작업에서 학습해야 하거나 자율적으로 실행해야 한다면 RAG는 맞지 않는다.

### LLM Wiki 구조와 복리 누적

Karpathy의 gist가 제안하는 전환은 단순하다. 질의 시점에 raw chunk를 가져오는 대신 모델을 지식 엔지니어로 써서 원본을 지속적이고 상호 연결된 wiki로 미리 컴파일한다. 합성은 한 번만 하고 이후의 모든 질의가 그 작업의 결과를 그대로 쓴다.

구조는 세 계층으로 나뉘며 각 계층의 소유자가 다르다는 점이 설계의 핵심이다.

| 계층 | 소유자 | 내용 | 변경 규칙 |
|---|---|---|---|
| 하단, raw | 사람 | PDF, 기사, 자막, 북마크 | immutable. 모델은 읽기만 하고 절대 수정하지 않는다 |
| 중간, wiki | 모델 | 요약, entity page, 개념 정의, 상호 참조를 담은 markdown page | 모델이 이 계층을 전적으로 소유하고 갱신한다 |
| 상단, schema | 사람 | CLAUDE.md 같은 설정 파일 | 명명 규칙, 상호 참조 규칙, 무엇을 모순으로 볼지를 정의한다 |

복리 누적은 두 경로로 일어난다.

첫 번째 경로는 ingest다. 새 문서를 넣으면 모델이 요약 page 하나만 만드는 것이 아니라 새 원본을 기존 wiki 전체와 대조해 영향받는 모든 page를 갱신한다. 한 번의 ingest가 보통 wiki page 10~15개를 건드리며, 그 과정에서 상호 참조를 추가하고 모순을 표시하고 entity profile을 갱신한다.

두 번째 경로는 질의 루프다. 질문에 대한 합성 답변이 새로운 지식에 해당하면 그 답변이 다시 새 wiki page로 저장되고, page의 slug는 질문 자체에서 유도된다. 오늘의 합성이 내일의 질의를 개선하는 구조다.

여기에 세 번째 루프인 lint workflow가 붙는다. 모델이 주기적으로 wiki 전체를 감사해 세 가지를 찾아낸다.

- 들어오는 링크가 하나도 없는 orphan page
- 더 이상 유효하지 않은 오래된 주장
- 본문에서 언급만 되고 자기 page를 받지 못한 개념

저자가 이 루프에 붙인 평가는 "the machine does the maintenance humans always abandon"이다. 사람이 늘 포기하는 유지보수를 기계가 대신한다는 뜻이며, wiki 방식이 시간이 지나도 건강을 유지하는 근거로 제시된다.

약점은 세 가지다.

- **규모 천장**: wiki는 markdown 파일을 BM25나 grep으로 탐색한다. 원본 100건에 wiki page 수백 개까지는 잘 동작하지만 원본 1만 건에서 탐색이 실패하기 시작하고, 10만 건에서는 retrieval 레이어를 얹지 않으면 쓸 수 없다. 그런데 그 레이어를 얹는 순간 다시 RAG처럼 보이기 시작한다.
- **선행 연산 비용**: 매 ingest마다 모델이 새 원본을 읽고 관련된 기존 page를 읽고 영향받는 내용을 다시 써야 한다. 문서당 비용이 RAG 임베딩보다 상당히 크다. 개인 연구용 wiki에서는 감당할 만하지만 엔터프라이즈 지식 베이스에서는 예산 논의가 필요한 수준이다.
- **수동성**: 지식을 훌륭하게 컴파일하지만 그것으로 행동하지 않는다. 세 자료에 등장한 마감이 지났다는 것을 알아채지 않고, 새 문서가 기존 정책과 충돌할 때 알림을 발생시키지 않는다. 안다는 것과 한다는 것 사이의 간극이 남는다.

거버넌스 측면은 양면적이다. wiki는 원본의 파생 사본, 즉 요약과 상호 참조와 합성 page를 만들어 낸다. 일부 규제 환경에서는 그 파생물 자체가 보존과 감사 대상이 되므로 도입 전에 법무 검토가 필요하다.

적합한 사용자군도 좁게 특정된다. 특정 도메인에서 깊은 전문성을 쌓는 연구자와 애널리스트, 소규모 팀이다. 조직 전체의 문서를 질의 가능하게 만드는 용도가 아니라 한정된 주제를 깊게 파는 용도에 맞는다.

적합 여부에 대한 저자의 예시는 구체적이다. 원본 200건으로 규제 변화를 추적하는 팀은 적합한 사례이고, Confluence page 50만 개를 질의 가능하게 만들려는 회사는 부적합한 사례다.

### Fat Skills 구조와 자율 실행

GBrain은 RAG도 LLM Wiki도 시도하지 않는 것을 도입한다. "우리가 무엇을 아는가"가 아니라 "그것에 대해 무엇을 언제 해야 하는가"를 다루는 지식이다.

저자는 이 아키텍처를 평가하기 전에 배경 조건을 먼저 밝힌다. GBrain은 엔터프라이즈 제품으로 설계된 것이 아니라 OpenClaw, Hermes, Claude Code 같은 개인용 AI 에이전트 위에서 실행되도록 만들어졌다. Y Combinator CEO가 자기 에이전트를 운영하려고 만든 뒤 오픈소스로 공개한 것이라, 조직 배포가 아니라 한 명의 파워 유저 워크플로에 최적화되어 있다는 점이 구조 전반을 규정한다. README의 문장은 "Your AI agent is smart but forgetful. GBrain gives it a brain"이다.

구조는 네 부분으로 나뉜다.

| 구성 요소 | 역할 | 특징 |
|---|---|---|
| thin harness | 모델 실행, 파일 읽기와 쓰기, 안전 강제 | 약 200줄. 도구 정의로 context window를 차지하지 않는다 |
| fat skill | 언제 발동할지, 무엇을 확인할지, 다른 스킬과 어떻게 연결할지, 어떤 품질 기준을 강제할지 | markdown 문서 하나가 전체 워크플로를 담는다 |
| RESOLVER.md | 사용자 의도를 스킬로 라우팅 | always-on 스킬, brain 연산, 콘텐츠 ingest, thinking 스킬, 운영 작업, 셋업의 6개 범주 |
| cron | 스킬을 일정에 따라 자율 실행 | 잡 자체는 얇고 지능은 스킬 파일에 남는다 |

resolver에 대한 관찰이 이 절에서 가장 실용적인 통찰이다. RESOLVER.md가 dispatcher처럼 보이지만 실제 라우팅은 스킬 설명 자체가 수행한다. 모델이 설명을 읽고 사용자 의도를 자동으로 매칭하므로 명시적 라우팅 코드가 필요 없다. Tan의 최신 방향은 여기서 한 걸음 더 나아간다. "Fewer fatter skills makes the resolver shorter, which itself is less context bloat. Short resolvers are better than long ones". 좁은 스킬을 여럿 두는 대신 분기 파라미터를 가진 더 적고 포괄적인 스킬로 가는 추세라는 뜻이다.

fat skill이 실제로 어떻게 생겼는지는 인물과 회사 dossier를 만들고 유지하는 `enrich` 스킬의 frontmatter로 제시된다.

```yaml
name: enrich
version: 1.0.0
description: |
  Enrich brain pages with tiered enrichment protocol.
  Creates and updates person/company pages with compiled
  truth, timeline, and cross-links.
triggers:
  - "enrich"
  - "create person page"
  - "update company page"
  - "who is this person"
tools:
  - get_page
  - put_page
  - search
  - add_link
  - add_timeline_entry
mutating: true
writes_to:
  - people/
  - companies/
```

저자의 평가는 이것이 프롬프트 템플릿이 아니라 contract라는 것이다. 스킬이 자기 트리거와 사용 도구, 쓰기 대상, 상태 변경 여부를 스스로 선언하므로 실행 전에 무엇을 할지 알 수 있다.

frontmatter 아래에는 7단계 enrichment 프로토콜이 이어지고, 대상에 따라 세 등급으로 실행 강도가 갈린다.

| 등급 | 대상 | 조사 범위 |
|---|---|---|
| inner-circle | 핵심 인맥 | 모든 API와 심층 웹 검색까지 동원한 전면 조사 |
| industry figures | 업계 인물 | 웹과 소셜에 brain 상호 참조를 더한 중간 수준 |
| tracking only | 추적 가치는 있으나 중요도가 낮은 대상 | 가벼운 처리 |

등급과 무관하게 모든 주장에는 `[Source: ...]` 형태의 인라인 인용이 필수이고, 근거가 충돌할 때의 우선순위가 정해져 있다. 사용자 진술이 가장 높고 그다음이 compiled truth, timeline entry, 외부 API 순이다. 스킬의 철학 문장은 "Intelligence dossiers, not LinkedIn scrapes"로, 검색 한 번이면 얻을 수 있는 기본 사실보다 신념과 진행 중인 프로젝트, 동기, 궤적을 우선한다는 뜻이다.

일부 스킬은 트리거를 기다리지 않는다. signal-detector는 모든 수신 메시지에서 발동해 본 응답과 병렬로 저비용 서브에이전트로 실행되며 두 가지를 포착한다. 하나는 original idea로, 사용자의 정확한 표현을 그대로 보존하고 절대 바꿔 쓰지 않는다. 다른 하나는 인물과 회사, 개념의 entity mention이다. 검출된 모든 entity는 기존 brain page에 상호 연결되거나 새 page를 만든다. 이 동작을 지탱하는 원칙이 "An unlinked mention is a broken brain"이다.

이 지점이 fat skill과 통상의 function calling을 가르는 경계이기도 하다.

| 구분 | function call | fat skill |
|---|---|---|
| 상태 | 없다. 실행하고 반환하면 잊는다 | 유지한다 |
| 품질 기준 | 호출부가 책임진다 | 스킬 자체가 강제한다 |
| 다른 작업과의 연결 | 없다 | 다른 스킬과 연결된다 |
| 실행 후 남는 것 | 반환값 | 더 풍부해진 brain |

cron은 스킬을 자율 에이전트로 바꾸는 장치다. 각 잡은 의도적으로 얇게 만들어져, 프롬프트가 문자 그대로 "Read skills/{name}/SKILL.md and run it" 한 줄이다. 모든 지능은 스케줄러가 아니라 스킬 파일에 남는다. 운영 규칙은 세 가지다. 잡을 5분 간격의 시차 슬롯에 배치해 충돌을 막고, 기본값으로 23시부터 8시까지의 quiet hours를 지키고, 같은 잡을 두 번 실행해도 중복 산출 없이 동일한 결과가 나오도록 idempotent를 강제한다. 결과는 `reports/{job-name}/{YYYY-MM-DD-HHMM}.md`에 저장되어 감사 기록이 된다.

저자가 제시한 전형적인 cron 구성은 다음과 같다.

- 6시간마다 Hacker News를 수집해 새 신호를 저장한다
- 새로 언급된 entity를 매일 enrich한다
- 포트폴리오 회사 지표를 주 단위로 확인한다
- 매주 월요일 아침에 다이제스트 초안을 작성한다

deterministic split도 이 구조의 일부다. 스킬은 SQL 질의와 API 호출, 파일 연산 같은 결정적 코드를 호출할 수 있고, 모델 판단에 맡기면 안 되는 작업은 결정적 코드로 넘긴다. GBrain은 읽기와 합성, 패턴 인식 같은 latent 작업을 데이터베이스 쓰기와 계산, 재현 가능한 산출 같은 deterministic 작업과 분리하며, 이 분리를 지키지 않는 것이 에이전트가 환각을 일으키는 경로라고 본다.

약점 역시 분명하게 제시된다.

- **엔지니어링 부담**: 24개 스킬 전부가 end-to-end 테스트와 평가, 단위 테스트로 검증되어 있다. 주말 프로젝트가 아니라 코드베이스다.
- **개인 종속성**: Tan 개인의 사람과 회사, 발행 일정에 맞춰 만들어졌다. 아키텍처는 이전 가능하지만 구현은 그대로 가져다 쓸 수 없다. 저자의 표현은 "You can't npm install someone else's brain"이다.
- **단일 운영자 전제**: brain 저장소가 17,888 페이지에 이르는 것은 개인 시스템으로는 크지만 엔터프라이즈 기준으로는 작다. Postgres와 pgvector 백엔드가 이론상 더 확장될 수 있어도 스킬 구조 자체가 전체 시스템을 이해하는 단일 운영자를 전제한다.

엔터프라이즈에서의 적합 지점은 조직 전체 배포가 아니라 특정 역할이다. 자율 조사 워크플로를 운영하는 시니어 애널리스트, 요청하지 않아도 매일 경쟁 정보를 갱신받아야 하는 프로덕트 리드, 배포 상태를 감시하고 자율적으로 에스컬레이션하는 에이전트를 둔 엔지니어링 매니저가 예시로 제시된다. 반대로 모두에게 지식 어시스턴트 접근을 주는 전형적인 엔터프라이즈 배포에는 맞지 않는데, 사용자당 엔지니어링 부담이 너무 크고 스킬 작성이 요구하는 시스템 이해 수준이 일반 지식 노동자에게는 높기 때문이다.

### 세 아키텍처 비교

세 아키텍처는 같은 문제의 서로 다른 버전을 풀기 때문에 강점과 약점이 대칭적으로 갈린다. RAG는 규모에서 이기고 깊이에서 지며, LLM Wiki는 깊이에서 이기고 규모에서 지고, fat skills는 자율성에서 이기고 접근성에서 진다.

| 기준 | RAG | LLM Wiki | Fat Skills |
|---|---|---|---|
| 별칭 | The Retriever | The Compiler | The Operator |
| 강점 | 규모 | 깊이 | 자율성 |
| 약점 | 깊이 | 규모 | 접근성 |
| 적정 규모 | 문서 10만 건 이상도 처리 | 원본 1,000건 미만 | 개인 범위, 인용 시점 17,888 페이지 |
| 학습과 누적 | 없음 | 있음. ingest마다 page 10~15개 갱신 | 있음. 스킬 자체가 능력을 누적 |
| 자율 실행 | 없음 | 없음. 수동적 | 있음. cron과 always-on 스킬 |
| 신선도 | 재임베딩으로 즉시 반영 | ingest 시점에 재컴파일 필요 | cron 주기에 따름 |
| 성숙도 | 매우 높음. 대부분의 production 팀이 사용 | 신생 | 신생. 1인 운영 전제 |
| 규제 대응 | 감사 가능성이 강점 | 파생물이 보존과 감사 대상이 될 수 있음 | 자료에 언급 없음 |
| 도입 비용 | 즉시 출시 가능 | ingest마다 모델 비용 | 테스트와 평가를 갖춘 코드베이스 필요 |

이 비교에서 읽히는 규칙성은 강점과 약점이 같은 설계 결정에서 나온다는 점이다. RAG가 규모를 감당하는 이유는 원본을 해석하지 않고 조각내어 저장하기 때문이고, 바로 그래서 깊이를 잃는다. LLM Wiki가 깊이를 얻는 이유는 원본을 모델이 읽고 다시 쓰기 때문이고, 바로 그래서 규모에서 비용이 폭증한다. fat skills가 자율성을 얻는 이유는 스킬마다 실행 규칙과 품질 기준을 사람이 정의하기 때문이고, 바로 그래서 그 정의를 할 수 있는 사람이 있어야만 동작한다.

규제 대응 열에서 fat skills 칸이 비어 있는 것은 이 글의 공백이다. RAG의 감사 가능성과 LLM Wiki의 파생물 문제는 다루지만 fat skills가 규제 환경에서 어떤 위치인지는 언급하지 않는다. 개인용 도구로 출발한 배경을 고려하면 자연스러운 누락이지만, 조직 도입을 검토하는 독자에게는 판단 근거가 하나 비는 셈이다.

### hybrid 수렴 전망

저자는 production 시스템이 한 유형에만 머물지 않을 것이라고 본다. 가장 유능한 아키텍처는 세 가지를 결합해, RAG가 retrieval 계층에서 대규모로 관련 내용을 찾고, wiki가 합성 계층에서 그것을 지속 지식으로 컴파일하고, 스킬이 실행 계층에서 그 지식을 자율 워크플로로 바꾸는 형태가 된다.

근거로 드는 신호는 네 가지이며 각각 다른 방향에서 경계를 허문다.

| 신호 | 어느 경계가 허물어지는가 |
|---|---|
| Karpathy LLM Wiki v2의 커뮤니티 확장판이 컴파일된 wiki 위에 retrieval 레이어를 추가 | compile이 retrieve 쪽으로 |
| GBrain 스킬이 이미 Postgres와 pgvector 백엔드에 질의 | act가 retrieve 쪽으로 |
| Neo4j 같은 엔터프라이즈 플랫폼이 graph database, vector search, semantic reasoning을 단일 access point로 통합 | retrieve 내부의 방식 차이가 소멸 |
| Claude Code에서 CLAUDE.md가 mini-wiki, auto-memory가 복리 누적, 스킬이 실행을 담당 | 셋이 한 도구 안에 공존 |

Claude Code 사례에 대한 저자의 해석은 신중하다. 세 패턴을 의도적으로 구현한 결과가 아니라 같은 압력이 같은 해법을 만들어 냈다고 본다. 원문의 표현은 "It's not a deliberate implementation of all three patterns, but the same pressures produced the same solutions"다.

저자는 이 흐름을 데이터베이스의 역사에 비유한다. SQL이냐 NoSQL이냐를 고르던 시기가 지나고 둘 다 처리하는 hybrid 시스템으로 진화한 것처럼, 지식 아키텍처도 같은 경로를 따를 것이라는 예상이다.

### 각 방식의 시작 경로

글은 결론 대신 세 방식의 진입 지점을 제시하며 끝난다. 어느 것을 고르든 처음 만들어 보는 비용이 크지 않다는 것이 저자의 입장이다.

| 방식 | 시작 지점 | 저자의 조언 |
|---|---|---|
| RAG | LangChain의 RAG 튜토리얼 | 동작하는 프로토타입까지 가장 빠른 길이다 |
| LLM Wiki | Karpathy의 gist | 200줄 분량의 schema이며 오늘 바로 Claude나 GPT에 적용할 수 있다 |
| Fat Skills | GBrain 저장소 | 오픈소스이므로 코드를 읽기 전에 RESOLVER.md와 THIN_HARNESS_FAT_SKILLS.md를 먼저 읽으라고 권한다 |

세 진입 지점의 성격이 서로 다르다는 점이 각 방식의 도입 난이도를 그대로 보여준다. RAG는 코드 튜토리얼이고, LLM Wiki는 200줄짜리 지시문 파일이며, fat skills는 설계 문서를 먼저 읽어야 하는 저장소다. 글의 마지막 문장은 이 선택을 미루는 비용을 짚는다. 지식 계층은 에이전트 스택에서 고장 나기 전까지 아무도 이야기하지 않는 부분이라는 것이다.

## 결과

이 글은 자체 실험이 없는 아키텍처 에세이이며 세 방식을 같은 조건에서 겨룬 벤치마크를 제시하지 않는다. 대신 본문 곳곳에 인용된 수치가 판단의 근거 역할을 한다.

| 항목 | 수치 | 문맥 |
|---|---|---|
| Karpathy gist 반응 | 며칠 만에 star 5,000개 | 글 게시 약 3주 전 공개 |
| GBrain 규모 | 자율 스킬 24개, cron job 21개, 페이지 17,888개 | Tan 본인의 brain. 인용 시점 2026-04-27 |
| context window 성능 저하 | 100만 토큰 한도에서 30만에서 40만 토큰 구간, 한도의 30~40% | 세션 종료 시 전부 초기화 |
| RAG 실패 지점 | 2024년 논문이 7개 매핑, 그중 3개는 모델이 컨텍스트를 보기 전에 발생 | 에이전트에 치명적인 3개는 chunking, re-derivation, passivity |
| chunking 예시 규모 | 30페이지 명세가 500토큰 조각으로 분할 | 요구사항과 그 이유가 다른 벡터로 분리 |
| RAG 지연 누적 | tool call 40회 루프에서 밀리초가 초 단위로 누적 | 임베딩, vector search, reranking, 컨텍스트 패키징의 다단계 |
| LLM Wiki 복리 누적 | ingest 1회당 wiki page 10~15개 갱신 | 상호 참조 추가, 모순 표시, entity 갱신 |
| LLM Wiki 규모 한계 | 원본 100건에 page 수백 개는 정상, 1만 건에서 탐색 실패, 10만 건에서 RAG 회귀 | BM25와 grep 기반 탐색의 한계 |
| GBrain harness | 약 200줄 | 스킬 24개는 end-to-end, 평가, 단위 테스트 전부 보유 |
| GBrain cron | 5분 시차 슬롯, quiet hours 기본 23시부터 8시 | idempotent 강제, 결과는 `reports/{job-name}/{YYYY-MM-DD-HHMM}.md` |
| RAG 적정 규모 예시 | 내부 문서 20만 건 인덱싱 후 당일 질의 시작 | 정책, 메모, 명세, Slack 내보내기 포함 |
| LLM Wiki 적합과 부적합 예시 | 원본 200건 규제 추적 팀은 적합, Confluence page 50만 개는 부적합 | 저자가 든 엔터프라이즈 판단 기준 |
| reranker 효과 주장 | knowledge assistant 사용 사례의 80% 커버 | RAG에 reranker를 결합했을 때. 근거 자료는 제시하지 않음 |

7개 실패 지점 가운데 3개가 모델이 컨텍스트를 보기 전에 발생한다는 대목은 이 글에서 가장 실용적인 수치다. 저자의 논지에 따르면 이 3개는 프롬프트를 다듬거나 더 큰 모델을 쓰는 방식으로는 개선되지 않는다. 문제가 생성 단계가 아니라 저장과 검색 단계에서 이미 확정되기 때문이며, 그래서 해법이 아키텍처 교체 쪽으로 향한다.

수치들이 함께 가리키는 결론은 규모의 임계값이 세 방식마다 다르다는 것이다. RAG는 문서 20만 건을 당일 인덱싱할 수 있는 반면 LLM Wiki는 원본 1만 건에서 이미 탐색이 실패하고, fat skills가 운영하는 GBrain은 인용 시점 기준 17,888 페이지로 개인 규모에 머문다. 세 자릿수 이상의 차이가 나므로 규모 조건만 확인해도 후보가 대부분 걸러진다.

context window 수치는 세 아키텍처가 모두 필요한 이유를 설명한다. 한도가 100만 토큰이어도 실제로 신뢰할 수 있는 구간이 30만에서 40만 토큰에서 끝나므로, 한도를 늘리는 방향으로는 지속 지식 문제가 해결되지 않는다.

정성 근거의 밀도도 함께 볼 필요가 있다. 이 글의 설득력은 벤치마크가 아니라 인용의 검증 가능성에서 나온다. `enrich` 스킬의 frontmatter, cron 잡의 프롬프트 한 줄, quiet hours 기본값, 감사 로그 경로처럼 저장소를 열어 확인할 수 있는 항목을 그대로 옮겨 적기 때문이다. 반대로 context window 성능 저하 구간이나 reranker의 80% 커버 주장처럼 저자가 출처를 밝히지 않은 수치는 같은 수준으로 신뢰하기 어렵다.

lint workflow와 cron 운영 규칙에서는 공통 설계 원리가 드러난다. 두 장치 모두 사람이 계속하기 어려운 반복 작업을 기계 쪽으로 옮기고, 그 결과를 감사 가능한 형태로 남긴다. wiki는 orphan page와 오래된 주장을 주기적으로 표시하고, cron은 실행 결과를 날짜별 파일로 저장한다.

## 한계

- **정량 비교가 없다**: 같은 코퍼스에 RAG와 LLM Wiki, fat skills를 올려 R@5나 지연 시간, 비용으로 견준 자료를 제시하지 않는다. 결정 프레임워크 수준의 안내에 머문다.
- **핵심 수치의 출처가 없다**: 2024년 RAG 7-failure-point 논문의 저자와 제목, URL이 없다. context window 성능 저하가 30~40% 지점에서 시작한다는 수치, reranker를 붙이면 사용 사례의 80%를 덮는다는 주장도 근거를 밝히지 않는다.
- **수렴 신호에 링크가 없다**: "Karpathy LLM Wiki v2 community extensions"를 거론하면서 구체 저장소를 지목하지 않아 확인이 불가능하다.
- **GBrain 수치가 인용 시점 값이다**: 글이 적은 스킬 24개, cron job 21개, 페이지 17,888개는 2026-04-27 시점 값이다. 본 wiki가 보유한 [[applications/garrytan-gbrain]] README(2026-05-22 clone)는 curated skill 43개, 페이지 146,646개, 인물 24,585명, 회사 5,339개, cron job 66개를 적고 있다. 약 한 달 사이에 규모가 크게 늘었을 수도 있고 active와 shipped의 정의 차이일 수도 있다. 수치가 다른 자료를 대조할 때는 시점 차이를 함께 확인해야 한다.
- **3등급 enrichment의 판정 기준을 확인할 수 없다**: 저자는 inner-circle과 industry figures, tracking only를 관계의 깊이로 나눈다고 서술하지만, 본 wiki가 보유한 [[applications/garrytan-gbrain]] README에는 등급을 무엇으로 판정하는지가 나오지 않아 원문 대조가 불가능하다.
- **인접 플랫폼을 다루지 않는다**: OpenClaw와 Hermes, Claude Code가 GBrain의 1차 소비자로 호명되지만 세 플랫폼 자체는 설명하지 않는다.
- **엔터프라이즈 대안이 빠져 있다**: Mem0, Zep, Letta, DevRev Computer Memory 같은 상용 메모리 계층이 세 유형 분류에 들어가지 않는다. 이 공백은 [[applications/gajjar-2026-gbrain-vs-computer-memory]]가 보완한다.
- **fat skills의 규제 대응을 다루지 않는다**: RAG와 LLM Wiki에 대해서는 감사와 거버넌스를 논하지만 fat skills가 규제 환경에서 어떤 위치인지는 언급이 없다.
- **도식이 유실됐다**: 본문에 저자가 그린 도식 10개가 삽입되어 있으나 수집본에는 캡션 줄만 남아 있어 시각 자료를 인용할 수 없다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| The Retriever / The Compiler / The Operator | Liu가 세 아키텍처에 붙인 별칭. 각각 RAG, LLM Wiki, fat skills(GBrain)에 대응한다 |
| chunking problem | 하나의 문서가 조각나면서 관련 정보가 서로 다른 벡터로 흩어져 검색기가 일부만 찾는 실패 |
| re-derivation problem | 모든 질의가 처음부터 다시 도출하며 이전 작업이 누적되지 않는 실패 |
| lint workflow | 모델이 wiki 전체를 주기적으로 감사해 orphan page, 오래된 주장, 미생성 개념 page를 찾는 유지보수 루프 |
| thin harness, fat skills | GBrain의 설계 역전. harness는 약 200줄로 얇게 두고 지능은 전부 markdown 스킬에 둔다 |
| always-on signal-detector | 모든 수신 메시지에 병렬로 붙는 저비용 서브에이전트. original idea를 그대로 보존하고 entity mention을 포착한다 |
| knowledge operating system | retrieve와 compile과 act를 단일 시스템으로 통합한 형태를 가리키는 Liu의 2026년 예측 |

## 관련 페이지

- [[applications/garrytan-gbrain]]: 본 글이 묘사하는 GBrain의 1차 자료다. 본 글이 `enrich` 스킬의 YAML frontmatter를 직접 인용해 대조 검증이 가능하고, 규모 수치의 시점 차이도 이 페이지와 맞대어 확인할 수 있다.
- [[applications/kmyu-2026-akb-llmwiki-gbrain-comparison]]: AKB와 llmwiki, GBrain을 6개 운영 항목으로 비교한 국내 전략 보고서다. 대상은 겹치지만 관점이 달라, 본 글이 아키텍처 선택 기준을 다루는 반면 이 보고서는 제품 포지셔닝과 로드맵을 다룬다.
- [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]]: 본 글이 요약만 하고 지나간 Karpathy LLM Wiki 패턴을 6단계 실습 가이드로 풀어쓴 입문 자료다.
- [[applications/kmyu-2026-llm-wiki-pattern-synthesis]]: LLM Wiki 패턴의 한국어 종합 정리다. 본 글이 제시한 규모 천장 주장과 대조해 읽을 수 있다.
- [[applications/vectorize-2026-gbrain-review-honest-assessment]]: "skills as code, not config" 평가가 본 글의 fat skills 분석과 같은 설계 통찰을 다른 각도에서 진술한다.
- [[applications/gajjar-2026-gbrain-vs-computer-memory]]: 같은 복리 누적 명제를 엔터프라이즈 관점에서 받쳐 주며, 본 글에서 빠진 상용 메모리 계층을 다룬다.
- [[applications/mantena-2026-hermes-gbrain-setup-vps]]: 본 글이 지적한 "can't npm install someone else's brain" 한계의 실전 우회 사례다.
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]]: 영상 자료의 brain agent loop 정의를 본 글의 signal-detector 원칙과 묶어 읽을 수 있다.
- [[overviews/gbrain-ecosystem-overview]]: 본 글이 여섯 번째 자료로 합류해 Medium 계열 자료 미수집 항목을 해소한다.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]]: DCI는 인덱스 자체를 부정하는 방향의 RAG 비판이고, 본 글은 RAG를 retrieval 계층으로 유지하면서 wiki와 스킬을 더하는 방향이다.
- [[database/vectifyai-pageindex]]: vectorless reasoning 기반 RAG로, 본 글이 말한 "LLM Wiki에 retrieval을 더한" hybrid의 한 구현으로 볼 수 있다.
- [[overviews/lightrag-family-graph-rag-overview]]: 본 글이 거론한 graph와 vector와 semantic의 단일 access point 수렴 흐름에 해당하는 계열이다.
