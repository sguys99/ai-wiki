---
title: "Loop Engineering — 코딩과 트레이딩을 관통하는 도메인 이식 개괄"
type: overview
year: 2026
category: overviews
source_collection: synthesis
sources:
  - movez-2026-loop-engineering-for-trading-agents.md
  - osmani-2026-loop-engineering.md
  - runkle-2026-the-art-of-loop-engineering.md
  - kang-2026-no-longer-prompting-claude.md
  - seans-ai-stories-2026-agent-harness-loop-engineering.md
  - lee-jeongmin-2026-loop-engineering-claude-code.md
  - ai-boost-awesome-harness-engineering.md
tags: [loop-engineering, verifier-gate, trading-agent, coding-agent, domain-transfer, self-improving-loop, verification, harness-engineering, quant, overview, synthesis]
---

## 요약 (Summary)

2026년 상반기 loop engineering 담론은 거의 전부 **코딩 에이전트**를 말한다. Osmani는 "prompting agents"에서 "designing loops that prompt agents"로의 전환을 Loop Engineering으로 명명했다. Runkle은 그 루프를 4단계 스택으로 쌓았고, Kang은 Prompt→Context→Harness→Loop 4년치 흐름을 한 장에 눌러 담았다. 셋 다 코드를 짜는 에이전트가 배경이다.

Movez의 트레이딩 데스크 글이 값진 이유는, 이 클러스터에서 **처음으로 코딩이 아닌 도메인**에 같은 프레임을 이식했기 때문이다. 두 도메인을 나란히 놓으면 loop engineering에서 **어디까지가 도메인 불변의 뼈대이고 어디부터가 코딩 특유의 살**인지가 갈린다. 이 overview는 wiki에 실재하는 **7개 자료**를 그 대조 위에 얹는다.

| 자료 | 도메인 | 한 줄 |
|---|---|---|
| [[agents/osmani-2026-loop-engineering]] | 코딩 | "prompting → designing loops" 전환을 명명. automations·worktrees·skills·connectors·sub-agents 5+1 |
| [[agents/runkle-2026-the-art-of-loop-engineering]] | 코딩 | agent → verification → event-driven → hill climbing 4단계 루프 스택 |
| [[agents/kang-2026-no-longer-prompting-claude]] | 코딩 | Prompt→Context→Harness→Loop 4단계 진화 + 루프 5+1 요소·3대 부채 |
| [[agents/seans-ai-stories-2026-agent-harness-loop-engineering]] | 코딩 | "말(LLM)과 마구(harness)" 비유로 loop·memory·guardrail·LLMOps 입문 |
| [[agents/lee-jeongmin-2026-loop-engineering-claude-code]] | 코딩 | Claude Code dynamic workflow를 RLM 이론에 묶은 설계 의도 7가지 |
| [[agents/movez-2026-loop-engineering-for-trading-agents]] | **트레이딩** | Minara 앱 안 3-loop × 12-step × 3 verifier gate로 스스로 도는 퀀트 데스크 |
| [[agents/ai-boost-awesome-harness-engineering]] | 메타 | harness/loop 393개 자료 상위 인덱스 (문제 단위 분류) |

## 도메인 불변의 뼈대 (The Portable Skeleton)

이름과 도구는 저자마다 달라도 루프의 골격은 포갠다 — **탐색 → 결정 → 실행 → 기록 → 개선**. Movez는 이를 five-beat anatomy(Find·Decide·Act·Record·Refine)로, Runkle은 4단계 스택으로, Sean은 tracing→eval→diagnose 3단계 LLMOps 루프로 그린다. 해상도만 다를 뿐 같은 그림이다.

핵심은 **한 루프의 출력이 다음 루프의 입력이 되어 복리로 강해진다**는 데 있다. Movez가 "research feeds strategy, strategy feeds execution, execution feeds review, review feeds next week's research"라 쓴 문장은, 코딩 쪽 Kang이 말한 "한 번 설계하면 스스로 도는 루프"와 같은 명제를 트레이딩 언어로 옮긴 것이다.

두 도메인이 갈리는 지점은 **무엇이 "실행"이냐** 하나뿐이다.

| 루프 beat | 코딩 에이전트 | 트레이딩 데스크 (Movez) |
|---|---|---|
| 탐색 | 코드베이스·이슈·문서 읽기 | 시장·on-chain·derivatives 6개 도메인 질의 |
| 결정 | 구현 계획·설계 | thesis(entry·exit·risk) 명세 |
| 실행 | 코드 작성·PR | Autopilot 자동 주문 (Hyperliquid) |
| 기록 | 세션 로그·CLAUDE.md | 거래 P&L·fills 로그 |
| 개선 | 실수를 규칙으로 (Compounding) | 주간 리뷰가 다음 주 리서치로 |

살은 완전히 다른데 뼈대는 한 치도 어긋나지 않는다. loop engineering이 **도메인 이식 가능한 규율**이라는 증거다.

## 관통하는 원리 — Verifier Gate (The Load-Bearing Principle)

두 도메인이 가장 세게 합의하는 지점은 **검증을 만드는 주체와 분리하라**는 원리, 곧 loop engineering의 진짜 심장이다.

- **코딩 (Runkle)**: 4단계 스택의 2단계가 통째로 *verification loop*다. generator와 evaluator를 다른 컨텍스트에 두어 self-grading bias를 없앤다.
- **코딩 (Sean)**: end-loop guardrail + tracing→eval→diagnose로 루프가 자기 출력을 감시한다.
- **트레이딩 (Movez)**: 세 verifier gate — 거래 감사(step 3)·페이퍼 런(step 8)·alerts-only(step 10) — 를 루프 중간에 박는다. Movez의 한 줄이 이 원리를 가장 날카롭게 벼린다.

> *"A loop with no gate is just an agent agreeing with itself at speed; a loop with gates is a system that catches its own mistakes before they cost you."* (Movez 2026)

"전략을 쓴 모델은 그 전략에 너무 관대하다"는 Movez의 관찰은, 코딩 쪽 "자기 작업을 평가하면 mediocre해도 자신 있게 칭찬한다"(→ [[overviews/agent-harness-engineering-overview]]의 Generator/Evaluator 분리)와 **글자 그대로 같은 통찰**이다. 도메인이 코드에서 돈으로 바뀌어도, 검증기를 다른 역할에 맡겨야 신뢰가 선다는 원리는 흔들리지 않는다.

차이는 **게이트가 막는 손실의 성격**이다. 코딩에서 검증 실패가 버그·롤백에 그친다면, 트레이딩에서 게이트 없는 루프는 실자본 손실로 곧장 이어진다. 그래서 Movez는 게이트를 셋이나 겹치고 "권한 전에 신뢰를 먼저 번다"(alerts-only 일주일)는 점진적 위임을 강조한다 — 코딩 담론엔 없는, 도메인이 강제하는 보수성이다.

## 경계와 주의 (Caveats)

- **Movez는 제품 홍보 글이다.** 단일 앱(Minara) 튜토리얼에 레퍼럴 링크가 붙었고 +366% 백테스트 카드는 독립 검증되지 않았다. 이식 가능한 자산은 성능 주장이 아니라 **3-loop·3-gate 프레임**이다. 이 overview도 그 프레임만 취한다.
- **코딩 쪽엔 실증의 경계가 있다.** loop/harness가 model보다 큰 lever라는 주장에는 [[overviews/agent-harness-engineering-overview]]에서 Lin et al.의 controlled grid로 "frontier 모델에서만 크게 회수된다"는 조건이 붙었다. 트레이딩 쪽엔 아직 이런 통제 실증이 wiki에 없다 — Movez의 주장은 데모 수준에 머문다.
- **자동화의 무게중심.** Runkle은 loop 1·2(agent·verification)에서 loop 3·4(event-driven·hill climbing)로 옮기라 권한다. Movez의 12단계도 스케줄된 Workflow(event-driven)와 주간 리뷰(hill climbing)로 끝난다 — 두 도메인이 "자기개선 루프로 무게중심을 옮기라"는 같은 지향을 공유한다.

## 이 지도를 어떻게 쓰나 (Reading Order)

1. **왜 이 전환인가** → [[agents/osmani-2026-loop-engineering]] (명명) + [[agents/kang-2026-no-longer-prompting-claude]] (4단계 진화)
2. **루프를 어떻게 쌓나** → [[agents/runkle-2026-the-art-of-loop-engineering]] (4단계 스택) + [[agents/seans-ai-stories-2026-agent-harness-loop-engineering]] (입문 비유)
3. **코딩 밖으로 이식하면** → [[agents/movez-2026-loop-engineering-for-trading-agents]] (트레이딩 데스크 12단계)
4. **정말 효과 있나** → [[overviews/agent-harness-engineering-overview]] (Lin et al.의 실증 경계로 이어짐)

## 관련 페이지 (Related Pages)

- [[overviews/agent-harness-engineering-overview]] — 같은 클러스터의 코딩 하네스 개괄. 이 overview가 *도메인 이식*을 축으로 본다면, 그쪽은 *Skills·검증·실증*을 축으로 본다. 자매 지도.
- [[agents/ai-boost-awesome-harness-engineering]] — harness/loop 393개 자료 상위 인덱스. 두 overview 모두 이 리스트의 하위 심화다.
- [[agents/lee-jeongmin-2026-loop-engineering-claude-code]] — Claude Code dynamic workflow의 설계 의도. 루프를 도구 층에서 구현하는 쪽.
