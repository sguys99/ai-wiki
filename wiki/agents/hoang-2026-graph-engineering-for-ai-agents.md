---
title: "Graph Engineering for AI Agents: From Prompts and Loops to Workflows"
type: article
year: 2026
category: agents
raw_path: raw/articles/hoang-2026-graph-engineering-for-ai-agents.md
raw_filename: "hoang-2026-graph-engineering-for-ai-agents.md"
source_collection: external
author: "Nhu Hoang"
publisher: "Towards Data Science"
publication_date: "2026-09-14"
url: "https://towardsdatascience.com/graph-engineering-for-ai-agents-from-prompts-and-loops-to-workflows/"
tags: [graph-engineering, agent-workflow, loop-engineering, human-in-the-loop]
source: hoang-2026-graph-engineering-for-ai-agents.md
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/hoang-2026-graph-engineering-for-ai-agents/fig01.png
    raw: raw/articles/hoang-2026-graph-engineering-for-ai-agents-figures/fig01.png
    caption: "한 모델이 조사와 평가를 겸하는 루프와 근거 검토를 별도 단계로 둔 그래프"
    strategy: fetched
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/hoang-2026-graph-engineering-for-ai-agents/fig02.gif
    raw: raw/articles/hoang-2026-graph-engineering-for-ai-agents-figures/fig02.gif
    caption: "Shopify 회계 도구의 고객, 경쟁사, 유통 경로 조사에서 창업자 승인까지의 흐름"
    strategy: fetched
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/hoang-2026-graph-engineering-for-ai-agents/fig03.gif
    raw: raw/articles/hoang-2026-graph-engineering-for-ai-agents-figures/fig03.gif
    caption: "세 조사 결과가 같은 필드에 도착할 때 덮어쓰기와 병합의 차이"
    strategy: fetched
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/hoang-2026-graph-engineering-for-ai-agents/fig04.png
    raw: raw/articles/hoang-2026-graph-engineering-for-ai-agents-figures/fig04.png
    caption: "고객과 제품 사이의 관계를 나타내는 그래프와 작업 순서를 정하는 그래프"
    strategy: fetched
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/hoang-2026-graph-engineering-for-ai-agents/fig05.png
    raw: raw/articles/hoang-2026-graph-engineering-for-ai-agents-figures/fig05.png
    caption: "근거 검토 결과만 권고안 작성 단계로 넘기는 연결"
    strategy: fetched
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/hoang-2026-graph-engineering-for-ai-agents/fig06.png
    raw: raw/articles/hoang-2026-graph-engineering-for-ai-agents-figures/fig06.png
    caption: "범위가 좁은 질문을 경쟁사 조사로 바로 보내는 분기"
    strategy: fetched
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/hoang-2026-graph-engineering-for-ai-agents/fig07.png
    raw: raw/articles/hoang-2026-graph-engineering-for-ai-agents-figures/fig07.png
    caption: "고객 불편, 경쟁사, 유통 경로를 병렬로 조사한 뒤 근거를 모으는 단계"
    strategy: fetched
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/hoang-2026-graph-engineering-for-ai-agents/fig08.png
    raw: raw/articles/hoang-2026-graph-engineering-for-ai-agents-figures/fig08.png
    caption: "실행 중에 발견한 조사 범주에 따라 상한 안에서 작업자를 추가하는 구조"
    strategy: fetched
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/hoang-2026-graph-engineering-for-ai-agents/fig09.png
    raw: raw/articles/hoang-2026-graph-engineering-for-ai-agents-figures/fig09.png
    caption: "권고안 초안을 검토하고 최대 두 차례까지 수정을 허용하는 루프"
    strategy: fetched
    curated: true
---

## 요약

Shopify 판매자를 위한 AI 회계 도구를 만들어야 할지 한 모델에 물으면 시장 조사부터 권고안까지 한 번에 받을 수 있다. 그런데 권고안에 “판매자가 월 50달러를 지불할 것이다”라는 문장이 있다면, 누가 그 금액의 근거를 확인했는지가 중요해진다. Nhu Hoang은 조사자와 작성자 사이에 근거를 검토하는 단계를 두고, 출시 여부를 결정하는 사람이 그 판정을 함께 읽도록 설계한다.

이런 작업 사이의 의존 관계와 이동 조건을 명시한 구조가 agent graph다. 미리 정할 수 있는 규칙은 코드로 표현하고, 서로 엇갈리는 자료를 해석하거나 근거가 충분한지 판단하는 일은 모델에 맡긴다. 그래프가 적절한지는 같은 질문으로 만든 권고안을 직접 읽어보면 알 수 있다. 저자는 한 번에 받은 답보다 나아지는지 손으로 먼저 시험해 보라고 제안한다.

![[assets/hoang-2026-graph-engineering-for-ai-agents/fig01.png]]
*Figure 1: 왼쪽에서는 한 모델이 조사 방향을 정하고 결론의 신뢰도까지 평가한다. 오른쪽에서는 조사자가 모은 근거를 검토자가 먼저 읽고, 마지막 결정은 창업자가 내린다. (Nhu Hoang, 2026)*

## 배경

이 글의 출발점은 OpenClaw 창립자 Peter Steinberger와 AI 엔지니어 Hamel Husain 사이에서 시작된 루프와 그래프 논의다. Hoang은 반복 업무에서 누가 다음 행동을 정하는지에 초점을 맞춘다.

| 설계 방법 | 회계 도구 조사에서 달라지는 점 |
|---|---|
| 프롬프트 설계 | 어떤 시장성 질문을 던지고 어떤 형식의 답을 요구할지 정한다. |
| 컨텍스트 설계 | 모델이 답을 쓸 때 볼 수 있는 시장 자료를 고른다. |
| 루프 설계 | 한 번의 실행 안에서 모델이 도구를 사용하고 결과를 살펴 다음 조사와 종료 시점을 정한다. |
| 그래프 설계 | 어떤 조사들을 동시에 시작하고 어느 결과가 모여야 검토와 작성을 시작할지 정한다. |

한 모델이 조사 범위를 고르면 첫 판단은 이후의 근거 수집에도 영향을 준다. 모델이 경쟁 제품 몇 개만 살펴보고 계획을 쓰기 시작하면, 고객이 실제로 무엇을 불편해하는지 확인하지 않고도 설득력 있는 메모가 완성될 수 있다. 같은 실행에서 모델이 자기 결론의 신뢰도까지 평가하면 처음에 빠뜨린 질문은 끝까지 드러나기 어렵다.

## 시장성 조사를 그래프로 구성하는 법

### 각 단계의 입력과 산출물

노드는 독립적으로 실행할 수 있는 일의 단위다. 송장 금액이 승인 기준을 넘었는지 비교하는 노드는 계산만으로 충분하다. 고객이 쓴 모호한 이메일을 읽어 환불 요청인지 해석하는 노드에는 모델의 판단이 필요할 수 있다. 사람이 권고안을 읽고 결정을 내리는 절차도 노드가 된다.

![[assets/hoang-2026-graph-engineering-for-ai-agents/fig02.gif]]
*Figure 2: 계획 노드에서 뻗은 세 화살표는 고객의 불편, 경쟁 제품, 유통 경로를 동시에 조사하는 과정을 보여준다. 세 결과가 검토자에게 모여야 권고안을 쓸 수 있다. (Nhu Hoang, 2026)*

| 단계 | 입력을 받아서 하는 일 | 다음 단계에 남기는 것 |
|---|---|---|
| 계획 | 회계 도구의 시장성을 묻는 질문을 조사 단위로 나눈다. | 고객의 불편, 경쟁 제품, 유통 경로에 관한 질문 |
| 조사 | 세 조사자가 각자 받은 질문을 조사한다. 서로의 결과를 기다릴 필요가 없다. | 분야별 발견 사항과 근거 |
| 근거 검토 | 세 조사 결과를 읽고 어떤 주장을 뒷받침할 자료가 있는지 확인한다. | 유지할 주장과 기각할 주장을 구분한 판정 |
| 작성과 수정 | 판정을 바탕으로 권고안을 쓰고, 초안에서 근거가 빠진 주장이 발견되면 수정한다. | 검토를 거친 권고안 |
| 승인 | 창업자가 권고안과 판단의 근거를 함께 읽는다. | 실제로 다음 행동을 할지에 대한 결정 |

상태는 노드들이 공유하는 구조화된 작업 기록이다. 여기에는 원래 질문과 조사 결과뿐 아니라 어떤 주장이 검토를 통과했는지도 남는다. 따라서 작성자는 긴 채팅 이력을 처음부터 다시 읽거나 어느 발언을 믿을지 추측할 필요 없이 검토 결과에서 작업을 시작할 수 있다.

### 다음 단계로 넘어가는 조건

두 노드를 잇는 간선은 실행을 어디로 넘길지 정한다. 조사자 셋을 동시에 시작하는 조건과 셋의 근거를 모두 읽은 뒤 권고안을 쓰는 조건이 다르므로, 계획에서 승인까지를 단순한 작업 목록으로만 적으면 필요한 대기 지점을 놓치기 쉽다.

| 간선 종류 | 적용하는 상황 |
|---|---|
| 직행 | 근거 검토가 끝나면 결과를 작성자에게, 완성된 권고안은 승인자에게 보낸다. |
| 조건 분기 | 기존 제품에 기능 하나를 추가하는 좁은 질문이면 담당 조사자에게 바로 보낸다. |
| 병렬 분기 | 고객 조사와 경쟁사 조사처럼 서로 기다릴 필요가 없는 일을 동시에 시작한다. |
| 반복 | 초안 검토에서 발견한 문제와 그 이유를 작성자에게 돌려보낸다. |
| 오류 처리 | 검색 호출에 실패했을 때 결과를 보고하기 전에 재시도하는 경로를 둘 수 있다. |
| 사람의 승인 | 창업자가 판단할 때까지 실행을 멈춘다. |
| 외부 이벤트 대기 | 새 경쟁 제품이 등록되면 조사를 다시 시작하는 식으로 외부 변화에 반응할 수 있다. |

오류 처리와 외부 이벤트는 원문이 제시한 확장 예다. Shopify의 기본 흐름을 손으로 그릴 때는 조사 결과가 합류하는 곳, 수정 요청이 되돌아가는 곳, 창업자의 승인이 필요한 곳부터 표시한다.

### 병렬 기록의 병합과 실행 재개

세 조사자가 거의 동시에 같은 조사 기록 필드를 갱신하면 마지막으로 도착한 결과가 앞선 결과를 덮어쓸 수 있다. 이 경우 노드는 모두 성공했는데 검토자에게는 한 분야의 자료만 보인다. state reducer는 병렬로 도착한 갱신을 공유 상태에 합칠 방법을 정하는 규칙이다. 조사 메모는 목록으로 모으고 범주별 기록은 키에 따라 합치는 식으로 자료 구조에 맞는 동작을 정한다.

![[assets/hoang-2026-graph-engineering-for-ai-agents/fig03.gif]]
*Figure 3: 왼쪽에서는 늦게 도착한 조사 메모가 앞선 기록을 덮어쓴다. 오른쪽에서는 병합 규칙 덕분에 검토자가 세 분야의 메모를 모두 읽을 수 있다. (Nhu Hoang, 2026)*

checkpoint는 특정 시점에 저장한 실행 상태다. 예를 들어 40분짜리 조사의 마지막에 실패하면 저장된 지점에서 재개해 완료한 조사의 비용을 아낄 수 있다. LangGraph에서는 사람이 승인할 때까지 실행을 중단하고 같은 스레드 식별자로 저장된 상태를 찾아 이어간다.

실행 상태의 복원과 외부 작업의 효과는 따로 고려해야 한다. 모델이 메일을 보낸 뒤 실행이 멈추면, 그 노드를 다시 실행할 때 수신자가 같은 메일을 두 번 받을 수 있다. 결제도 마찬가지다. 저자는 중단이나 재시도 전에 발생하는 외부 작업에 멱등성을 갖춰, 같은 요청을 다시 처리해도 외부에 미치는 효과가 한 번으로 끝나도록 권한다.

## 정보를 연결하는 그래프와 작업을 연결하는 그래프

knowledge graph는 정보에 나타난 대상과 그 관계를 기록한다. 예를 들어 고객의 소속 회사에서 출발해 그 회사가 쓰는 제품, 문의가 들어온 기능, 그 기능을 담당하는 팀까지 관계를 따라갈 수 있다. Microsoft의 GraphRAG는 여러 문서에 흩어진 정보를 연결해야 하는 검색의 예다.

agent graph를 따라가면서 읽는 것은 실행 순서다. 조사 단계가 knowledge graph를 읽어 고객과 제품의 관계를 확인했다면, agent graph는 그 조사 결과가 어디에 저장되고 어느 검토자가 언제 읽을지를 정한다. 같은 시스템에서 두 그래프를 함께 쓸 수 있는 이유다.

![[assets/hoang-2026-graph-engineering-for-ai-agents/fig04.png]]
*Figure 4: 왼쪽의 선은 고객과 회사, 제품 사이의 관계를 나타낸다. 오른쪽의 화살표는 연구 결과가 어느 작업으로 넘어가는지 나타낸다. (Nhu Hoang, 2026)*

## 다섯 가지 실행 패턴

### 검토에 필요한 자료만 넘기는 연결

Prompt chaining에서는 한 단계의 출력이 다음 단계의 입력이 된다. Shopify 사례에서 작성자에게 필요한 것은 검토자가 내린 주장별 판정이다. 경쟁사 조사 중에 읽은 QuickBooks 연동 문서, 질문과 조금만 관련 있는 포럼 글, 결국 쓰지 않은 가격표까지 넘기면 작성자가 관련성을 다시 판단해야 한다.

![[assets/hoang-2026-graph-engineering-for-ai-agents/fig05.png]]
*Figure 5: 노란 검토자가 남긴 판정이 보라색 작성자의 입력이 된다. 조사 단계에서 읽은 메모 전체를 다시 전달할 필요가 없다. (Nhu Hoang, 2026)*

단계를 나눌 근거는 두 작업에 필요한 자료의 차이에 있다. 두 번째 작업에도 첫 작업자가 본 모든 자료가 꼭 필요하다면, 둘로 나눠서 얻는 이점은 작고 모델을 한 번 더 호출하므로 응답은 늦어진다.

### 질문의 범위에 따른 분기

Routing은 요청을 처음에 분류해 필요한 경로로 보낸다. 새 회계 제품의 시장성을 묻는 경우에는 고객, 경쟁사, 유통 경로를 모두 살필 이유가 있다. 반면 기존 제품에 송장 동기화 기능을 추가할지 묻는 경우에는 관련 조사 하나로 범위를 좁힐 수 있다.

![[assets/hoang-2026-graph-engineering-for-ai-agents/fig06.png]]
*Figure 6: 범위가 좁은 질문은 분홍색 분류 단계에서 경쟁사 조사자로 바로 간다. 계획 단계와 나머지 두 조사를 건너뛰는 경로다. (Nhu Hoang, 2026)*

분류 오류는 실행 오류보다 알아차리기 어려울 수 있다. 넓은 시장성 질문을 좁은 경로에 보내도 한 조사자의 자료만으로 매끄러운 권고안이 나오기 때문이다. 원문은 기대 경로가 표시된 질문 예시로 분류를 시험하고, 분류 결과의 확신이 낮으면 조사 범위가 넓은 경로를 쓰도록 제안한다.

### 동시에 시작할 조사와 실행 중에 발견하는 조사

Parallelization은 필요한 일과 그 수를 미리 알 때 쓴다. 고객 조사자는 경쟁 제품 목록이 완성되기 전에도 판매자의 불편을 조사할 수 있다. 두 일을 동시에 시작해야 순차 실행에서 발생하는 대기 시간을 줄일 수 있다. 한 조사자가 다른 조사자의 결과를 읽어야 질문을 정할 수 있다면 둘 사이에는 의존 관계를 표시해야 한다.

![[assets/hoang-2026-graph-engineering-for-ai-agents/fig07.png]]
*Figure 7: 초록색 조사자 셋은 동시에 시작할 수 있다. 세 화살표가 모이는 노란 노드에서는 각 조사 결과를 함께 검토한다. (Nhu Hoang, 2026)*

Orchestrator-workers는 조사 대상을 실행 중에 발견할 때 쓴다. 창업자가 회계 앱의 대체재 전체를 물으면 전용 앱 외에도 회계 대행사, 프리랜서, 스프레드시트 양식이 조사 대상으로 떠오를 수 있다. 조정자는 발견한 범주마다 작업자를 배정한다. 미리 정한 세 분야를 병렬로 조사하는 예와 달리, 여기서는 작업자 수 자체가 중간 결과에 따라 달라진다.

![[assets/hoang-2026-graph-engineering-for-ai-agents/fig08.png]]
*Figure 8: 점선으로 표시한 작업자는 실행 중 새 조사 범주를 발견할 때 추가한다. 마지막 작업자에 표시된 상한이 호출 수의 증가를 제한한다. (Nhu Hoang, 2026)*

원문은 범주 40개를 발견하자마자 호출 40개를 시작하는 예로 비용 문제를 설명한다. 모두 독립적인 작업이어도 API 호출 한도나 총예산을 넘을 수 있으므로, 실행 전에 작업자 수나 총지출의 상한을 정한다.

### 근거가 부족한 초안의 수정과 종료

Evaluator-optimizer는 작성자가 낸 결과를 별도 검토자가 평가하고, 판정 이유와 함께 돌려보내는 구조다. 월 50달러의 지불 의사를 뒷받침하는 자료가 없다면 검토자는 그 금액의 근거를 제시하거나 해당 주장을 삭제하라고 요청한다. 작성자에게 무엇을 고칠지 특정해야 수정한 초안이 원래 문제를 해결했는지 대조할 수 있다.

![[assets/hoang-2026-graph-engineering-for-ai-agents/fig09.png]]
*Figure 9: 작성자에서 검토자로 돌아가는 화살표는 초안의 주장을 다시 확인하는 경로다. 근거가 빠지면 수정을 요청하고, 이 예시에서는 검토와 수정을 최대 두 차례 허용한다. (Nhu Hoang, 2026)*

원문의 그래프는 검토와 수정을 최대 두 차례로 제한하는 예를 든다. 횟수와 함께 내용의 변화도 본다. 두 번째 초안에서 가격 주장의 어순만 바뀌고 근거는 그대로 비어 있다면, 반복을 이어가도 검토 결과는 개선되지 않는다. 최종 권고안을 받은 사람은 어떤 근거가 남았는지 직접 확인한 뒤 결정한다.

## 자동화 전에 수동으로 검증하는 방법

저자는 약 20분 동안 종이에 흐름을 그려보는 방법을 제안한다. 비교 대상은 같은 질문을 한 번에 물어 얻은 평소의 답이다. 각 노드에는 새 대화를 열고 직전 단계에서 실제로 넘기기로 한 자료만 전달한다. 이렇게 해야 긴 대화에 우연히 남은 단서 없이도 다음 사람이 자기 일을 할 수 있는지 드러난다.

1. 산출물을 한 문장으로 정한다. Shopify 예시의 산출물은 아이디어를 시험할 가치가 있는지 판단하는 한 쪽짜리 권고안이다.
2. 숙련된 사람이 그 문서를 만드는 데 필요한 일 5~7개를 적는다. 질문 구체화와 근거 검토도 각각 일로 센다.
3. 한 작업이 무엇을 기다려야 하는지 표시한다. 독립적인 두 조사는 나란히 두고 검토자는 결과가 모인 뒤에 배치한다.
4. 실수의 영향이 커지는 행동 앞에 사람의 승인을 둔다. 내부 조사 메모는 가벼운 검토로 충분할 수 있지만 고객 발송, 환불, 공개 게시에는 실행 직전의 판단이 중요하다.
5. 각 역할을 수동으로 수행한 뒤 권고안을 비교한다. 조사 누락이나 근거 없는 주장이 여전히 그대로라면 어디서 정보를 잃었는지 먼저 살펴본다.

수동 실행을 세 번 만족스럽게 마치면 파일로 단계를 연결한다. 계획자는 `plan.md`, 각 조사자는 자기 조사 파일, 검토자는 `review.md`, 작성자는 `recommendation.md`를 남긴다. 최종 권고안에서 문제가 보이면 검토자가 이미 기각한 주장을 작성자가 다시 썼는지, 조사 자료에서부터 근거가 비었는지 추적할 수 있다.

| 도구 | 선택할 이유 | 도입 조건과 비용 |
|---|---|---|
| LangGraph | 긴 작업의 상태를 보존하고 사람의 승인을 기다렸다가 재개해야 한다. | Python 또는 JavaScript와 상태 저장소가 필요하다. 운영 구성과 버전 변화를 관리한다. |
| AutoGen GraphFlow | 단계 사이의 분기와 조건을 코드로 구성한다. | Python과 AutoGen AgentChat을 사용하며 API 변화에 유의한다. |
| n8n 또는 Make.com | Slack, 메일, CRM 등의 외부 서비스에 결과를 전달한다. | 커넥터 계정이 필요하고 에이전트 내부의 추론 과정을 제어할 수 있는 범위가 좁다. |

## 결과와 한계

이 기사에서 확인하는 결과는 권고안의 특정 주장에 근거를 요구하고, 필요하면 창업자의 승인 전에 문장을 고칠 수 있다는 점이다. 월 50달러는 근거 부족을 검토하는 가상의 금액이고, 수동 실행 세 번은 도구 도입 전 저자가 권하는 절차다. Shopify 판매자를 대상으로 얻은 가격 조사 결과나 그래프의 품질 향상률은 보고하지 않는다.

역할 수를 늘려도 같은 잘못된 전제를 공유하면 여러 작업자가 같은 오답에 도달할 수 있다. 저자는 실제 대기를 줄이는지, 작성과 검토의 담당이 구분되는지, 실수의 비용이 큰 행동 앞에 사람이 있는지, 반복을 언제 끝낼 수 있는지를 보고 필요한 만큼만 단계를 두도록 권한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Agent graph | 노드가 처리할 일, 각 작업의 의존 관계와 다음 단계로 넘어가는 조건을 나타낸 구조 |
| State reducer | 여러 노드가 같은 상태 필드에 쓴 결과를 합치는 규칙 |
| Checkpoint | 중단한 실행의 상태를 다시 불러올 수 있도록 저장한 사본 |
| Human gate | 후속 행동 전에 사람이 권고안과 근거를 보고 진행 여부를 정하는 단계 |

## 관련 페이지

- [[agents/osmani-2026-loop-engineering|에이전트 루프의 설계]]는 한 루프 안에서 목표를 검증하고 실행을 끝내는 조건을 설명한다.
- [[database/edge-2024-from-local-to-global|GraphRAG의 전역 검색]]은 문서 속 관계를 따라 자료를 묶어 전체 문서 집합에 대한 질문에 답하는 방법을 설명한다.
