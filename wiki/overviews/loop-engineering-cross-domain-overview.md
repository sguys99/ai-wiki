---
title: "Loop Engineering 도메인 이식 개괄"
type: overview
year: 2026
category: overviews
source_collection: synthesis
sources:
  - osmani-2026-loop-engineering.md
  - runkle-2026-the-art-of-loop-engineering.md
  - kang-2026-no-longer-prompting-claude.md
  - seans-ai-stories-2026-agent-harness-loop-engineering.md
  - lee-jeongmin-2026-loop-engineering-claude-code.md
  - movez-2026-loop-engineering-for-trading-agents.md
  - ai-boost-awesome-harness-engineering.md
tags: [loop-engineering, verifier-gate, domain-transfer, trading-agent, coding-agent, harness-engineering, evidence-grading, verification, overview, synthesis]
---

## 요약

2026년 상반기의 loop engineering 담론은 코딩 도구를 기본 예시로 삼아 형성됐다. loop engineering은 개별 프롬프트가 아니라 에이전트를 반복 구동하는 루프 자체를 설계 대상으로 삼는 관점이다. [[agents/osmani-2026-loop-engineering]]이 이 전환에 이름을 붙였고, [[agents/runkle-2026-the-art-of-loop-engineering]]이 같은 대상을 네 겹의 층으로 나눴으며, [[agents/kang-2026-no-longer-prompting-claude]]가 약 4년치 흐름을 한 장의 타임라인으로 배열했다.

이 개괄이 묻는 것은 그 프레임이 코딩 밖에서도 성립하는지다. [[agents/movez-2026-loop-engineering-for-trading-agents]]는 같은 발상을 트레이딩 데스크에 옮겨 3개 루프와 12단계와 3개 verifier gate로 조립한다. 두 구성을 나란히 놓으면 어디까지가 도메인과 무관한 뼈대이고 어디부터가 특정 도구에 묶인 부분인지가 갈린다.

대조의 결과를 먼저 적는다. 다섯 단계 골격(탐색, 결정, 실행, 기록, 개선)과 검증을 산출 주체 바깥에 두는 배치 원리는 두 도메인에서 같은 형태로 나타난다. 반면 각 단계를 채우는 도구와 산출물은 하나도 공유되지 않는다. 다만 코딩 밖 사례가 제품 데모 한 편뿐이라는 제약이 이 결론 전체에 걸린다.

## 커버 자료의 역할

일곱 편은 같은 주제를 다루지만 담당하는 자리가 서로 다르다. 아래 표의 도메인 열은 각 자료가 예시로 삼은 작업 영역이며, 자료가 스스로 선언한 적용 범위와는 별개다.

| 자료 | 유형 | 예시 도메인 | 이 개괄에서 맡는 자리 |
|---|---|---|---|
| [[agents/osmani-2026-loop-engineering]] | 에세이 | 코딩 | 전환의 명명과 구성 요소 5+1 카탈로그. 다른 여섯 편이 참조하는 기준점 |
| [[agents/runkle-2026-the-art-of-loop-engineering]] | 제품 블로그 | 문서화 에이전트 | 루프를 네 겹의 중첩 층으로 나눈 구획. 검증과 개선이 각각 독립 층이 되는 근거 |
| [[agents/kang-2026-no-longer-prompting-claude]] | 요약 게시물 | 코딩 | prompt에서 context, harness, loop로 이어지는 4단계 좌표. 루프가 만드는 리스크 3종 |
| [[agents/seans-ai-stories-2026-agent-harness-loop-engineering]] | 입문 강의 | 이커머스 고객 응대 | 코딩 밖 예시로 harness 구조를 설명한 유일한 입문 자료. LLMOps 되먹임 경로 |
| [[agents/lee-jeongmin-2026-loop-engineering-claude-code]] | 해설 게시물 | 코딩 | 서브에이전트 격리의 이론적 근거. 적용 범위를 비개발 업무까지 넓혀 잡은 자료 |
| [[agents/movez-2026-loop-engineering-for-trading-agents]] | 제품 튜토리얼 | 트레이딩 | 코딩 밖에서 루프 전체를 끝까지 조립한 유일한 사례. 3개 verifier gate의 출처 |
| [[agents/ai-boost-awesome-harness-engineering]] | 큐레이션 목록 | 여러 도메인 | 385개 항목의 상위 색인. 개별 구성 요소를 더 파고들 때의 출발점 |

표의 도메인 열이 이 개괄의 출발 관찰을 담는다. 일곱 편 가운데 다섯 편이 코딩 도구를 예시로 쓰고, 코딩 밖을 예시로 삼은 자료는 두 편이다. 둘 중 [[agents/movez-2026-loop-engineering-for-trading-agents]]만 탐색부터 개선까지 전체 순환을 조립한다.

## 배경

loop engineering이라는 이름이 붙은 경위 자체가 코딩 도구에 묶여 있다. [[agents/osmani-2026-loop-engineering]]에 따르면 이 이름의 출처는 Peter Steinberger와 Boris Cherny의 발언이며, 두 사람은 코딩 에이전트에 프롬프트를 쓰는 대신 에이전트를 프롬프트하는 루프를 설계하라고 표현했다. [[agents/kang-2026-no-longer-prompting-claude]]는 같은 발언을 4단계 타임라인의 마지막 칸에 놓고, 그 칸의 명명 시점을 2026년 6월 7일로 적는다.

그래서 담론에 쓰이는 어휘도 코딩 도구에서 왔다. worktree는 Git 저장소의 작업 디렉토리를 분리하는 기능이고, `/loop`과 `/goal`은 Claude Code의 커맨드이며, [[agents/runkle-2026-the-art-of-loop-engineering]]이 드는 구현은 `create_agent`와 `RubricMiddleware` 같은 LangChain API다. 이 어휘를 그대로 쓰면 다른 도메인에서 무엇이 대응하는지 판단하기 어렵다.

도메인 이식을 검토할 근거가 이 저장소에 하나 있다. [[agents/movez-2026-loop-engineering-for-trading-agents]]가 저장소도 CI도 없는 환경에서 같은 구조를 조립하기 때문이다. 이 자료는 리서치를 담당하는 Chat, 전략을 담당하는 Strategy Studio, 실행을 담당하는 Workflow와 Autopilot 세 구획에 12단계를 배정한다.

같은 방향의 단서가 두 편 더 있다. [[agents/seans-ai-stories-2026-agent-harness-loop-engineering]]은 harness와 loop을 설명하면서 예시를 D2C 이커머스 고객 응대 에이전트로 잡고, CRM 조회와 결제 환불 처리를 tool call의 사례로 든다. [[agents/lee-jeongmin-2026-loop-engineering-claude-code]]는 서브에이전트 실행 패턴을 소개한 뒤 적용 범위를 코드 리팩토링 밖으로 넓혀, 리서치 검증과 서포트 티켓 분류에서도 쓸 수 있다고 적는다. 두 편 모두 코딩 밖을 가리키지만 루프 전체를 조립해 보이지는 않는다.

## 핵심 개념

loop engineering은 설계 대상을 문장에서 시스템으로 옮기는 관점이다. [[agents/osmani-2026-loop-engineering]]은 이 전환의 결과로 요구되는 역량도 프롬프트 표현력에서 구조 설계 능력으로 바뀐다고 서술한다.

verifier gate는 루프의 산출물을 만든 주체와 채점하는 주체를 분리해 순환 중간에 배치하는 검증 관문이다. [[agents/movez-2026-loop-engineering-for-trading-agents]]가 붙인 이름이며, 그 근거로 전략을 작성한 모델이 그 전략에 관대하다는 관찰을 든다. 같은 문제를 [[agents/osmani-2026-loop-engineering]]은 verification distance라고 부르는데, 구현을 맡은 에이전트와 평가를 맡은 에이전트를 떼어 놓아 확보하는 거리를 뜻한다.

loopable은 매번 같은 구조로 답이 돌아와 스케줄에 올릴 수 있는 상태를 가리킨다. [[agents/movez-2026-loop-engineering-for-trading-agents]]의 용어이며, 질문의 답이 링크 목록으로 오면 사람이 매번 해석해야 하므로 스케줄할 수 없고 데이터가 붙은 일정한 구조로 오면 어제 값과 오늘 값을 같은 자리에서 비교할 수 있다는 구분이다. 이 구분이 자동화 가능 여부를 가르는 실질 기준으로 쓰인다.

근거 등급은 이 개괄이 쓰는 판단 기준이다. 같은 주장을 실었더라도 그 주장이 제품 데모에서 나왔는지, 1인칭 경험 서술에서 나왔는지, 큐레이션 목록의 요약에서 나왔는지, 비교군을 둔 통제 실험에서 나왔는지에 따라 옮겨 쓸 수 있는 범위가 달라진다.

## 도메인을 건너는 뼈대

### 다섯 단계의 도메인 대응

[[agents/movez-2026-loop-engineering-for-trading-agents]]는 모든 루프가 공유하는 최소 골격으로 Find, Decide, Act, Record, Refine 다섯 단계를 제시하고 12단계를 각각 이 중 하나에 대응시킨다. 아래 표는 그 다섯 단계를 한글 이름으로 옮긴 뒤, 코딩 쪽 자료가 같은 자리에 무엇을 놓는지를 병렬로 적은 것이다. 코딩 열의 항목은 어느 자료에서 왔는지를 함께 밝힌다.

| 단계 | 코딩 쪽 구현 | 트레이딩 쪽 구현 |
|---|---|---|
| 탐색 | 예약 실행이 CI 실패와 열린 이슈와 최근 커밋을 검토한다 (Osmani). Slack 채널 메시지나 webhook이 에이전트를 기동한다 (Runkle) | Markets, Onchain, Signals, Derivatives, Predictions, DeFi 여섯 도메인을 한 번의 패스로 읽는다 |
| 결정 | 모델이 수정 계획과 초안을 세운다 (Runkle) | entry와 exit과 risk를 숫자와 조건으로 적은 thesis 문서를 만든다 |
| 실행 | 격리된 worktree에서 코드를 고치고 pull request를 생성한다 (Osmani, Runkle) | Autopilot이 Hyperliquid에서 deterministic 규칙으로 주문을 낸다 |
| 기록 | 발견 사항을 마크다운 파일이나 프로젝트 보드에 남긴다 (Osmani). 실행마다 trace가 쌓인다 (Runkle) | 체결과 손익, 그리고 무엇이 왜 발동했는지를 기록한다 |
| 개선 | 분석 에이전트가 여러 trace에 걸친 문제를 찾아 프롬프트와 tool 수정을 제안한다 (Runkle) | 주간 리뷰 Workflow가 결과를 3단계 거래 감사로 되돌린다 |

다섯 행 전체에서 같은 명제가 반복된다. 한 단계의 출력이 다음 단계의 입력이 되고 마지막 단계가 첫 단계로 되돌아간다는 것이다. [[agents/movez-2026-loop-engineering-for-trading-agents]]는 이 구조를 리서치가 전략에, 전략이 실행에, 실행이 리뷰에, 리뷰가 다음 주 리서치에 입력을 공급하는 순환으로 적는다.

기록 단계가 이 순환의 전제라는 점도 두 도메인이 공유한다. [[agents/osmani-2026-loop-engineering]]이 persistent state를 필수 다섯 요소와 따로 여섯 번째로 떼어 부르는 이유가 여기 있다. 모델이 세션 사이에 메모리를 갖지 않으므로 실행 결과를 외부에 남겨 두지 않으면 다음 실행이 백지에서 다시 시작한다.

기록과 개선 두 단계가 나머지 셋과 성격이 다르다는 점도 두 도메인이 공유한다. [[agents/movez-2026-loop-engineering-for-trading-agents]]는 탐색부터 실행까지는 사람도 매일 수행하지만 기록과 개선이 빠지면 순환이 아니라 빠른 반복 실행일 뿐이라고 적는다. [[agents/runkle-2026-the-art-of-loop-engineering]]이 네 층 가운데 hill climbing을 가장 중요할 수 있는 층으로 꼽는 것도 같은 판단이며, 이 층의 복귀 경로만 시작점이 아니라 안쪽 agent loop으로 진입한다는 점이 근거로 제시된다.

### 같은 뼈대가 서로 다른 산출물을 낳는 자리

뼈대가 겹친다고 해서 구현이 옮겨지지는 않는다. [[agents/movez-2026-loop-engineering-for-trading-agents]]도 12단계의 내용이 특정 화면과 주문 인터페이스에 결합되어 있어 다른 환경으로 그대로 옮기기 어렵다고 스스로 밝히고, 이식 가능한 것은 세 게이트의 배치 원리뿐이라고 범위를 제한한다.

가장 크게 갈리는 자리는 실행 단계의 되돌릴 수 없음이다. 코딩 쪽 실행의 산출물은 pull request이며, 병합 전에 사람이 보거나 되돌릴 수 있다. 트레이딩 쪽 실행의 산출물은 체결된 주문이라서 같은 방식으로 되돌릴 수 없다. [[agents/movez-2026-loop-engineering-for-trading-agents]]가 필수 손절과 이익 실현 주문, 이동하는 손절선, 계좌 단위 청산 한도, 승인된 자산 범위라는 네 가지 통제를 협상 불가 항목으로 강제하는 이유가 여기 있다.

이 차이를 코딩 쪽 자료도 같은 방향에서 짚는다. [[agents/runkle-2026-the-art-of-loop-engineering]]은 결과가 무거운 활동에 사람의 직접 검토가 필요하다고 적으면서 그 예로 금전이 오가는 거래와 데이터베이스에 영향을 주는 조작을 든다. 즉 코딩 쪽 담론도 돈이 움직이는 실행을 예외로 분류하고 있었고, 트레이딩 사례는 그 예외가 기본값이 되는 도메인이다.

두 번째로 갈리는 자리는 검증의 재료다. 코딩 쪽 검증은 이미 존재하는 객관적 기준에 걸린다. [[agents/osmani-2026-loop-engineering]]의 시나리오에서 두 번째 서브에이전트는 프로젝트 표준과 테스트 스위트를 기준으로 검토하고, [[agents/runkle-2026-the-art-of-loop-engineering]]의 문서화 예시는 링크 작동과 지속적 통합 검사 통과를 확인한다. 트레이딩 쪽에는 이런 기성 기준이 없어서, 라이브와 같은 엔진으로 자본 없이 실행해 보는 페이퍼 트레이딩이 그 자리를 대신한다.

## verifier gate

### 자료별 검증 배치

일곱 편 가운데 여섯 편이 검증을 독립 구성 요소로 세운다. 다만 검증자의 정체와 판정 기준은 자료마다 다르다.

| 자료 | 검증을 맡는 것 | 판정 기준 | 배치 위치 |
|---|---|---|---|
| [[agents/osmani-2026-loop-engineering]] | 지시문이 다른 별도 서브에이전트, `/goal`의 독립 판정 모델 | 프로젝트 표준과 테스트 스위트 | 구현 서브에이전트와 나란히, 그리고 종료 조건 판정 자리 |
| [[agents/runkle-2026-the-art-of-loop-engineering]] | grader (`RubricMiddleware` 또는 `after_agent` 훅) | deterministic 규칙 또는 rubric 기반 LLM 평가 | agent loop 전체를 감싸는 두 번째 층 |
| [[agents/seans-ai-stories-2026-agent-harness-loop-engineering]] | end-loop guardrail과 LLMOps 블록의 eval 단계 | 종료 신호 또는 사용자 확정, 그리고 good과 healthy 두 질문 | tool call 반복의 종료 지점, 그리고 agent run 바깥의 되먹임 경로 |
| [[agents/lee-jeongmin-2026-loop-engineering-claude-code]] | adversarial verification 패턴의 별도 에이전트 | 본문에 판정 기준이 적혀 있지 않다 | 격리된 context window를 가진 서브에이전트 사이 |
| [[agents/movez-2026-loop-engineering-for-trading-agents]] | 거래 감사, 페이퍼 런, alerts-only 세 게이트 | 과거 거래의 반복 편향, 백테스트 대비 라이브 체결, 일주일간 사용자 판단과의 일치 | 12단계 중 3단계와 8단계와 10단계 |
| [[agents/ai-boost-awesome-harness-engineering]] | 목록의 세 절이 검증 자료를 따로 모은다 | 판정 기준은 각 수록 항목에 위임한다 | Verification & CI Integration 12개, Evals & Verification 19개, Human-in-the-Loop 11개 |

[[agents/kang-2026-no-longer-prompting-claude]]만 검증자를 구성 요소로 세우지 않는다. 이 자료는 같은 문제를 검증 부채라는 이름의 리스크로 적고, 에이전트가 증거 없이 완료를 주장하므로 확인 부담이 사람에게 남는다고 서술한다. 구성 요소 쪽이 아니라 남는 부담 쪽에서 같은 문제를 다룬 셈이다.

여섯 편이 합의하는 지점은 검증자를 산출 주체에서 떼어 놓는다는 것 하나다. [[agents/osmani-2026-loop-engineering]]은 같은 모델이 자기가 만든 산출물을 채점하면 후한 점수를 준다는 이유를 든다. [[agents/movez-2026-loop-engineering-for-trading-agents]]는 전략을 작성한 모델이 그 전략에 관대하므로 비판만 담당하는 별도 패스가 가장 값싼 검증 수단이라고 적는다. 도메인이 코드에서 거래로 바뀌어도 같은 관찰이 같은 처방으로 이어진다.

분리의 방향은 세 가지로 나뉜다. [[agents/movez-2026-loop-engineering-for-trading-agents]]의 세 게이트가 그 셋을 한자리에 보여준다. 거래 감사는 사람의 판단을 모델이 채점하고, 페이퍼 런은 백테스트의 주장을 라이브 데이터가 채점하며, alerts-only는 자동화의 판단을 사람이 채점한다. 코딩 쪽 자료는 이 가운데 첫 두 방향만 다루고 세 번째는 [[agents/runkle-2026-the-art-of-loop-engineering]]의 사람 개입 지점 설계에서 부분적으로만 나타난다.

### 게이트가 막는 손실의 성격

같은 원리를 쓰면서도 게이트의 개수와 엄격함은 도메인에 따라 달라진다. [[agents/movez-2026-loop-engineering-for-trading-agents]]는 게이트를 세 개 겹치고, 여기에 권한을 단계적으로 넓히는 절차를 하나 더 결합한다. 모든 Workflow를 먼저 알림 전용으로 일주일 실행해 그 판단이 자기 판단과 맞는지 읽어 본 뒤에야 행동을 허용하라는 것이다.

이 보수성은 게이트가 막는 손실의 성격에서 나온다. 코딩 쪽에서 검증 실패는 잘못된 pull request나 롤백으로 끝나지만, 트레이딩 쪽에서 게이트 없는 루프는 체결된 주문과 자본 손실로 이어진다. [[agents/movez-2026-loop-engineering-for-trading-agents]]가 게이트 없는 루프를 빠른 속도로 자기 자신에게 동의하는 에이전트라고 부르고 게이트가 있는 루프만 비용이 발생하기 전에 자기 실수를 잡는다고 적는 대목이 이 판단을 담는다.

반대 방향의 대가도 자료에 적혀 있다. [[agents/runkle-2026-the-art-of-loop-engineering]]은 검증 층이 실행마다 지연과 운영 비용을 추가한다고 명시하고, 속도보다 품질이 우선하는 상황에서 값어치를 한다고 평가한다. [[agents/lee-jeongmin-2026-loop-engineering-claude-code]]는 더 직접적으로 자제 기준을 붙여, 일반 코딩 작업에 검증자를 다섯 개나 붙일 필요는 없다고 적는다. 게이트를 몇 개 둘지가 도메인의 손실 구조에 따라 달라지는 설계 변수라는 뜻이다.

## 근거 등급

일곱 편이 기대는 근거의 성격이 서로 다르다. 아래 제약 열은 이 개괄의 평가가 아니라 각 wiki 페이지가 해당 자료의 한계로 적고 있는 내용이다.

| 자료 | 근거 유형 | 각 페이지가 밝힌 제약 |
|---|---|---|
| [[agents/movez-2026-loop-engineering-for-trading-agents]] | 단일 제품 데모와 튜토리얼 | 저자 레퍼럴 링크가 붙은 홍보 글이고, 성능 수치가 독립 검증을 거치지 않았으며, 세 게이트 중 둘이 같은 제품 안에서 수행되어 검증자의 독립성이 확인되지 않는다 |
| [[agents/osmani-2026-loop-engineering]] | 처방형 의견 에세이 | 약 700 단어 분량이고 정량 데이터가 없으며, 외부에 근거를 둔 진술이 두 건뿐이다 |
| [[agents/runkle-2026-the-art-of-loop-engineering]] | 자사 제품 서사 | 정량 벤치마크가 없고 네 층이 자사 제품군에 정렬되어 있으며, 사람 개입 지점 목록이 네 층과 일대일로 맞지 않는다 |
| [[agents/kang-2026-no-longer-prompting-claude]] | 2차 요약 타임라인 | 본문에 링크와 각주가 없고, OpenAI 사내 도입 서술에 출처가 없으며, harness 단계의 제안자 표기가 이 저장소 안에서 교차 확인되지 않는다 |
| [[agents/seans-ai-stories-2026-agent-harness-loop-engineering]] | 비전공자용 입문 강의 | 정량 벤치마크가 없고 도구를 이름만 호명하며, 자동 자막 오인식과 자료 내부 예시 충돌이 남아 있다 |
| [[agents/lee-jeongmin-2026-loop-engineering-claude-code]] | 2차 해설 게시물 | 저자가 직접 측정한 수치가 없고, 이론적 기반으로 든 논문을 제목과 저자와 연도 없이 인용하며, 본문의 수치 두 개 모두 측정값이 아니라 서술 안의 언급이다 |
| [[agents/ai-boost-awesome-harness-engineering]] | 큐레이션 목록 | 항목당 주석이 한두 문장이고, 링크가 전부 외부 URL이라 부패 위험이 있으며, 수록 판정이 관리자의 주관적 평가다 |

일곱 칸 어디에도 비교군을 둔 통제 실험이 없다. 처방 세 편과 제품 서사 두 편, 입문 강의 한 편, 큐레이션 한 편이 전부다. 따라서 이 개괄이 내놓는 도메인 이식 판정은 구조의 대응 관계에 대한 것이고, 그 구조가 성과를 얼마나 끌어올리는지에 대한 것이 아니다.

수치를 인용할 때의 주의는 [[agents/movez-2026-loop-engineering-for-trading-agents]]에 집중된다. 이 자료의 백테스트 카드는 총수익 +366.15%와 Sharpe Ratio 6.28을 표시하는데, 같은 화면 아래쪽의 실제 실행 결과는 총수익 +7.61%와 Sharpe Ratio 0.68이다. 저자 자신이 배포 판단의 실질 지표로 내세운 값에서 약 8배 차이 나는 두 수치가 한 화면에 놓여 있으므로, 카드의 값은 도구 성능의 근거가 아니라 화면 구성의 예시로 읽어야 한다.

[[agents/ai-boost-awesome-harness-engineering]]이 모아 둔 수치는 성격이 또 다르다. 이 목록은 harness만 바꿔 성능이 크게 달라진 사례를 여러 건 표로 묶지만, 각 수치의 실험 조건은 링크된 원본에 있고 목록은 한두 문장으로 요약할 뿐이다. 같은 목록의 평가 절이 통과 사례의 최대 23.2%가 검증 없이 얻어걸린 통과였다는 분석을 함께 싣고 있다는 점도 함께 보는 편이 안전하다.

## 합의와 불일치

| 쟁점 | 여러 자료가 함께 말하는 것 | 갈리는 지점 |
|---|---|---|
| 루프의 최소 골격 | 탐색에서 개선까지 이어지는 순환이 있고 한 바퀴의 출력이 다음 바퀴의 입력이 된다 | 그 순환을 구성 요소 목록으로 셀지, 중첩된 층으로 셀지, 번호 붙은 단계로 셀지 |
| 검증의 위치 | 판정을 산출 주체 바깥으로 내보낸다 | 판정자를 별도 모델에 둘지, 결정론적 검사에 둘지, 사람에게 둘지 |
| 자동화의 무게중심 | 실행 쪽보다 개선 쪽에 힘을 옮긴다 | 그 자리를 hill climbing이라 부를지, 주간 리뷰라 부를지, LLMOps 되먹임이라 부를지 |
| 사람에게 남는 부담 | 검증과 이해와 판단은 자동화가 걷어 가지 않는다 | 이를 리스크 목록으로 처리할지, 개입 지점 설계로 처리할지, 권한을 늦추는 절차로 처리할지 |
| loop과 harness의 관계 | 두 개념은 겹친다 | [[agents/seans-ai-stories-2026-agent-harness-loop-engineering]]은 loop을 harness의 일부로 규정하고, [[agents/kang-2026-no-longer-prompting-claude]]는 harness 다음에 오는 별도 단계로 배열한다 |

마지막 행이 이 묶음에서 가장 크게 갈리는 지점이다. [[agents/seans-ai-stories-2026-agent-harness-loop-engineering]]은 루프도 기술을 원하는 방향으로 통제하는 수단이라는 이유로 loop engineering을 harness 안에 넣는다. [[agents/kang-2026-no-longer-prompting-claude]]는 harness를 타이머 위에 올리고 서브에이전트를 생성하는 오케스트레이션 계층이 loop이라고 적어, 층위를 하나 더 바깥에 둔다. 두 배열이 같은 구조를 다르게 자른 것이므로, 자료를 옮겨 인용할 때 어느 정의를 쓰는지 밝히는 편이 안전하다.

세 번째 행도 표기만 다를 뿐 방향이 같다. [[agents/runkle-2026-the-art-of-loop-engineering]]은 관심이 몰려 있던 안쪽 두 층에서 바깥 두 층으로 전략적 무게를 옮기라고 권하고, [[agents/movez-2026-loop-engineering-for-trading-agents]]의 12단계도 스케줄된 감시와 주간 리뷰로 끝난다. [[agents/seans-ai-stories-2026-agent-harness-loop-engineering]]의 LLMOps 블록 역시 실행이 아니라 실행 기록을 모으고 진단하며 개선안을 배포하는 일을 담당한다.

## 한계

이 개괄 자체의 제약은 근거 구성의 비대칭에서 온다.

- **코딩 밖 사례가 한 편뿐이다.** 루프 전체를 조립해 보인 코딩 밖 자료는 [[agents/movez-2026-loop-engineering-for-trading-agents]] 하나이고, 나머지 여섯 편 가운데 코딩 밖을 예시로 삼은 것은 [[agents/seans-ai-stories-2026-agent-harness-loop-engineering]]의 고객 응대 예시뿐이다. 따라서 이 개괄의 도메인 이식 판정은 사실상 두 도메인의 1대1 대조이며, 셋 이상의 도메인에서 같은 뼈대가 성립하는지는 이 자료들로 확인할 수 없다.
- **그 한 편이 데모 성격이다.** 해당 페이지는 이 자료가 단일 제품 튜토리얼이며 저자 레퍼럴 링크가 포함된 홍보 글이라고 명시한다. 게이트 셋 가운데 거래 감사와 페이퍼 런이 같은 제품 안에서 수행되어 채점하는 쪽이 실제로 분리되어 있는지 원문이 밝히지 않는다는 점도 같은 페이지가 한계로 적는다. 이 개괄이 취한 것은 성능 주장이 아니라 게이트의 배치 구조다.
- **통제 실험이 커버 범위 밖이다.** 커버 일곱 편에 비교군을 둔 측정이 없으므로, 루프 설계가 성과를 얼마나 끌어올리는지는 이 개괄이 답하지 않는다. 이 저장소에서 그 질문을 통제 실험으로 다루는 자료는 [[overviews/agent-harness-engineering-overview]]가 커버 자료로 삼고 있으므로, 실증 경계가 필요하면 그 개괄로 이동하는 편이 맞다.
- **다섯 단계 대응이 이 개괄의 해석이다.** 위 대응표에서 코딩 쪽 구현을 다섯 단계에 배치한 것은 각 자료가 합의한 매핑이 아니다. 다섯 단계 골격은 [[agents/movez-2026-loop-engineering-for-trading-agents]]의 분류이고, [[agents/runkle-2026-the-art-of-loop-engineering]]의 네 층은 한 번의 통과를 나눈 단계가 아니라 서로를 감싸는 중첩 구조라서 같은 종류의 분류가 아니다. 두 분류를 같은 표에 놓은 것은 대조를 위한 배치이며 원자료의 대응 주장이 아니다.
- **어느 자료도 이식을 검증하지 않는다.** [[agents/lee-jeongmin-2026-loop-engineering-claude-code]]가 적용 범위를 비개발 업무로 넓혀 잡지만 사례나 결과를 붙이지 않고, [[agents/movez-2026-loop-engineering-for-trading-agents]]도 코딩 쪽 자료와의 대응을 두 편만 언급하고 지나간다. 이식 가능성은 각 자료의 주장이 아니라 일곱 편을 겹쳐 읽은 이 개괄의 판단이다.
- **도구 버전 의존이 크다.** 커맨드 이름과 API 이름과 제품 구획은 2026년 상반기 시점의 것이며, [[agents/ai-boost-awesome-harness-engineering]] 페이지도 수록 항목 다수가 2026년 2월에서 6월 사이 발표물이라 갱신 주기가 짧다고 적는다. 개념과 구현을 나눠 읽어야 한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| loop engineering | 개별 프롬프트가 아니라 에이전트를 반복 구동하는 루프 자체를 설계 대상으로 삼는 관점 |
| verifier gate | 산출물을 만든 주체와 채점하는 주체를 분리해 루프 중간에 배치하는 검증 관문. 거래 감사, 페이퍼 런, 알림 전용 운영이 그 예다 |
| verification distance | 구현을 맡은 에이전트와 평가를 맡은 에이전트를 떼어 놓아 확보하는 거리. 자기 평가 편향을 차단하는 구조다 |
| loopable | 매번 같은 구조로 답이 돌아와 스케줄에 올릴 수 있는 상태. 사람이 매번 해석해야 하는 서술과 대비된다 |
| end-loop guardrail | tool call 반복을 언제 멈출지 정하는 조건. 작업 완료 신호이거나 계획 단계에서 사용자와 확정한 종료 지점이다 |
| 다섯 단계 골격 | 탐색, 결정, 실행, 기록, 개선. Find, Decide, Act, Record, Refine을 이 개괄이 한글 이름으로 옮긴 것이다 |

## 관련 페이지

- [[agents/movez-2026-loop-engineering-for-trading-agents]]: 코딩 밖에서 루프 전체를 조립한 유일한 사례. 3개 루프와 12단계와 3개 verifier gate의 출처이며, 이 개괄의 트레이딩 열 전체를 담당한다.
- [[agents/osmani-2026-loop-engineering]]: 전환에 이름을 붙인 에세이. 구성 요소 5+1과 verification distance의 출처이자 다른 여러 편이 참조하는 기준점이다.
- [[agents/runkle-2026-the-art-of-loop-engineering]]: 루프를 네 겹의 중첩 층으로 나눈 구획. 검증과 개선이 각각 독립 층이 되는 근거와, 금전이 오가는 조작을 사람 검토 대상으로 분류한 대목을 담당한다.
- [[agents/kang-2026-no-longer-prompting-claude]]: prompt에서 context와 harness를 거쳐 loop로 이어지는 4단계 좌표. 검증 부채와 이해 부채와 인지적 저항이라는 리스크 세 가지의 출처다.
- [[agents/seans-ai-stories-2026-agent-harness-loop-engineering]]: 고객 응대 에이전트를 예시로 harness와 LLMOps 되먹임을 설명한 입문 강의. loop을 harness의 일부로 규정한 배열의 출처다.
- [[agents/lee-jeongmin-2026-loop-engineering-claude-code]]: 서브에이전트 격리의 이론적 근거와 실행 패턴 세 가지. 적용 범위를 비개발 업무까지 넓혀 잡은 자료이자 검증자 개수의 자제 기준을 적은 자리다.
- [[agents/ai-boost-awesome-harness-engineering]]: 385개 항목을 문제 단위로 분류한 상위 색인. 이 개괄이 구성 요소 수준으로 더 내려갈 때의 출발점이다.
- [[overviews/agent-harness-engineering-overview]]: 같은 클러스터를 코딩 에이전트 안에서 다룬 자매 개괄. 통제 실험을 커버 자료로 삼으므로 실증 경계가 필요할 때 이동할 곳이다.
- [[overviews/prompt-to-loop-engineering-evolution-overview]]: prompt에서 loop까지의 4단계 진화를 묶은 상위 진입 지도. 이 개괄은 그 사다리의 마지막 칸을 도메인 방향으로 넓힌 자리에 놓인다.
