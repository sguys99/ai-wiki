---
title: "Loop Engineering for trading agents: 12 Steps to build a self-running Quant desk"
type: article
year: 2026
category: agents
source: movez-2026-loop-engineering-for-trading-agents.md
raw_path: raw/articles/movez-2026-loop-engineering-for-trading-agents.md
raw_filename: "movez-2026-loop-engineering-for-trading-agents.md"
source_collection: external
author: "Movez (Lev Deviatkin, @0xMovez)"
url: "https://x.com/0xMovez/article/2072668933690126571"
publisher: "X (Twitter) Article"
tags: [loop-engineering, trading-agent, quant, minara, workflow, autopilot, backtest, paper-trading, verifier-gate, agentic-trading]
figures:
  - id: fig01
    file: assets/movez-2026-loop-engineering-for-trading-agents/fig01.png
    raw: raw/articles/movez-2026-loop-engineering-for-trading-agents-figures/fig01.png
    caption: "루프의 5-beat anatomy — Find·Decide·Act·Record·Refine"
    strategy: manual
    curated: true
  - id: fig02
    file: assets/movez-2026-loop-engineering-for-trading-agents/fig02.png
    raw: raw/articles/movez-2026-loop-engineering-for-trading-agents-figures/fig02.png
    caption: "Minara 루프 — Research→Strategy→Execute→Record&refine 3-surface 순환"
    strategy: manual
    curated: true
  - id: fig03
    file: assets/movez-2026-loop-engineering-for-trading-agents/fig03.png
    raw: raw/articles/movez-2026-loop-engineering-for-trading-agents-figures/fig03.png
    caption: "Chat UI — bond market 질문과 호출된 데이터 도구 목록"
    strategy: manual
    curated: false
  - id: fig04
    file: assets/movez-2026-loop-engineering-for-trading-agents/fig04.png
    raw: raw/articles/movez-2026-loop-engineering-for-trading-agents-figures/fig04.png
    caption: "step 1 답변 예시 — Bond Market → Risk Appetite yield curve 신호 표"
    strategy: manual
    curated: false
  - id: fig05
    file: assets/movez-2026-loop-engineering-for-trading-agents/fig05.png
    raw: raw/articles/movez-2026-loop-engineering-for-trading-agents-figures/fig05.png
    caption: "step 2 딥다이브 예시 — $HYPE whale positions·liquidation 표"
    strategy: manual
    curated: false
  - id: fig06
    file: assets/movez-2026-loop-engineering-for-trading-agents/fig06.png
    raw: raw/articles/movez-2026-loop-engineering-for-trading-agents-figures/fig06.png
    caption: "step 4 thesis 예시 — $HYPE Perp Trading Thesis (entry trigger)"
    strategy: manual
    curated: false
  - id: fig07
    file: assets/movez-2026-loop-engineering-for-trading-agents/fig07.png
    raw: raw/articles/movez-2026-loop-engineering-for-trading-agents-figures/fig07.png
    caption: "vibes(can't loop) vs spec(loopable) — 측정 가능한 thesis만 자동화된다"
    strategy: manual
    curated: true
  - id: fig08
    file: assets/movez-2026-loop-engineering-for-trading-agents/fig08.png
    raw: raw/articles/movez-2026-loop-engineering-for-trading-agents-figures/fig08.png
    caption: "Strategy Studio + 백테스트 카드 — HYPE 15m Leveraged MACD +366.15%, RKLB +76.67%"
    strategy: manual
    curated: true
  - id: fig09
    file: assets/movez-2026-loop-engineering-for-trading-agents/fig09.png
    raw: raw/articles/movez-2026-loop-engineering-for-trading-agents-figures/fig09.png
    caption: "Strategy Studio 입력창 — plain language·Form·Video·Code 4형태"
    strategy: manual
    curated: false
  - id: fig10
    file: assets/movez-2026-loop-engineering-for-trading-agents/fig10.png
    raw: raw/articles/movez-2026-loop-engineering-for-trading-agents-figures/fig10.png
    caption: "조립된 시스템 — 12-step·3-loop·3 verifier gate 전체 다이어그램"
    strategy: manual
    curated: true
---

## 요약 (Summary)

투자에서 진짜 레버리지는 "차트를 남보다 빨리 보는 것"이 아니라 "나 대신 조사하고 결정하고 거래하는 루프를 설계하는 것"으로 옮겨갔다. 이 글은 그 명제를 트레이딩 데스크에 그대로 옮겨온다. 저자가 보기에 대부분의 트레이더는 스스로를 스크립트처럼 굴린다. 탭을 열 개 켜고 같은 차트를 읽고 같은 질문을 타이핑하다가, 노트북을 덮으면 내일 다시 처음부터 시작한다. 열 명 중 아홉은 자기 대신 시장을 지켜봐줄 루프를 하나도 만들지 않는다.

해법은 Minara라는 앱 하나에서 세 개의 루프를 12단계로 엮는 것이다. Research(1–4) → Strategy(5–8) → Execution(9–12) 순서로 이어진다. 한 루프의 출력이 다음 루프의 입력이 되어 복리로 강해지는 것이 이 구조의 핵심이다. 첫날부터 셋을 다 돌릴 필요는 없다. 스케줄된 리서치 Workflow 하나로 시작해 차차 키워가면 된다.

이 wiki의 loop/harness engineering 자료들이 코딩 에이전트를 다룬다면, 이 글은 같은 발상을 **금융 트레이딩 에이전트**에 적용한 도메인 사례다. 다만 단일 제품 튜토리얼에 레퍼럴 링크까지 붙은 홍보 글이라, 성능 주장보다는 프레임(3-loop · 3-gate)만 추려 읽는 편이 안전하다.

![[assets/movez-2026-loop-engineering-for-trading-agents/fig01.png]]
*Figure 1: 루프의 5-beat anatomy — Find·Decide·Act·Record·Refine. 12단계가 각각 이 다섯 박자 중 하나에 꽂힌다 (Movez 2026).*

## 핵심 아이디어 (Key Ideas)

- **스크립트가 아니라 루프**: "스스로를 스크립트처럼 굴리지 말고 루프를 설계하라." research → decide → trade → review로 혼자 돌아가는 five-beat 사이클을 머릿속에 두고, 12단계가 각각 그 박자 하나에 대응한다고 본다.
- **스케줄 가능한 질문 필터**: 무엇을 묻든 먼저 "이 질문이 매일 아침 혼자 돌아도 유용할까?"를 통과시킨다. 매번 같은 shape로 답이 돌아오는 질문만 나중에 스케줄할 수 있다.
- **verifier gate 3중**: 자동화 데스크가 "빠른 속도로 자기 자신에게 동의하는 에이전트"로 전락하지 않도록, 거래 감사(step 3)·페이퍼 런(step 8)·alerts-only(step 10) 세 게이트를 루프 중간에 박아 넣는다. 전략을 쓴 모델은 그 전략에 관대할 수밖에 없으니, 비판만 담당하는 별도 패스가 가장 값싼 검증기다.

## 방법론 및 아키텍처 (Methodology and Architecture)

Minara는 앱 하나를 세 surface로 나눠 각각에 루프의 다른 구간을 맡긴다.

![[assets/movez-2026-loop-engineering-for-trading-agents/fig02.png]]
*Figure 2: Minara 루프 — Chat(Research) → Studio(Strategy) → Autopilot(Execute) → Workflow(Record & refine)가 다음 날 리서치로 되먹임된다 (Movez 2026).*

**Loop 1 · Research Loop (Chat)**

1. **시장에 진짜 질문 던지기** — 검색이 아니라 질문이다. Minara가 라이브 market·on-chain·sentiment·macro 데이터를 근거로 구조화된 답을 준다. 링크 더미가 아니라 매번 일정한 shape로 돌아오므로 스케줄이 가능하다(→ step 9).
2. **단일 자산 딥다이브** — 여섯 데이터 도메인(Markets · Onchain · Signals · Derivatives · Predictions · DeFi)을 한꺼번에 읽는다. 프롬프트에서 도메인을 콕 집어 지목할수록 tradeable read가 안정적이다. 예: "$SOL 전체 thesis: trend(markets), holder concentration(onchain), funding+OI skew(derivatives), narrative momentum(signals). 끝에 한 줄 risk/reward."
3. **자기 거래 감사** — 자동화에 앞서 내 track record를 들이댄다. "어디서 너무 일찍 진입하고 너무 크게 사이징하나." 여기가 첫 verifier gate다.
4. **hunch을 thesis로** — 명시적 entry·exit·risk를 담은 문서로 옮긴다. 루프는 측정 가능한 것만 자동화하니 thesis도 숫자로 못 박아둔다.

![[assets/movez-2026-loop-engineering-for-trading-agents/fig07.png]]
*Figure 7: vibes(can't loop) vs spec(loopable). "HYPE 강해 보인다" 같은 vibes는 기계가 감지할 trigger가 없어 매번 사람이 해석해야 하지만, "ROC>0 + volume breakout이면 long, exit +5%/-2%"처럼 모든 항이 checkable하면 전략이 자동으로 감지·진입·사이징한다 (Movez 2026).*

**Loop 2 · Strategy Loop (Strategy Studio)**

5. **평문으로 전략 프롬프트** — 문장 하나에서 구조화된 spec(entry·exit·sizing·universe)을 뽑는다. Time-series(한 자산의 시간축)로 볼지 Cross-sectional(한 시점의 다수 자산 비교)로 볼지에 따라 backtest의 의미가 갈린다. 입력 형태는 넷이다 — 평문·Form·Video-to-Strategy·Code-to-Strategy(Pine Script 포팅).
6. **검증된 템플릿에서 시작** — Momentum · Mean-reversion · Arbitrage · Pairs 네 family를 fork해 튜닝한다.
7. **리스크 내장 백테스트** — 10년+ 데이터에 fee·funding·borrow·slippage를 venue별 cost curve로 모델링한다. equity curve 옆에 rolling max-drawdown · volatility cone · exposure map을 나란히 붙여둔다. walk-forward·out-of-sample·regime-sliced 뷰와 leakage check가 매 런마다 자동으로 돈다. 판단 지표는 총수익이 아니라 return per unit of risk다.
8. **실자본 전 페이퍼 트레이딩** — "백테스트는 약속, 페이퍼 트레이딩은 영수증." 라이브와 같은 엔진으로 라이브 데이터에 돌려본다. 여기가 둘째 verifier gate다. 승격 전 다섯 가지를 확인한다. 페이퍼 P&L이 백테스트를 추종하는지, leakage가 없는지, out-of-sample에서 유지되는지, drawdown을 감내할 만한지, regime 전반에서 작동하는지.

**Loop 3 · Execution Loop (Workflow + Autopilot)**

9. **Workflow로 감시 스케줄링** — 평문 no-code 자동화다. "미 장 개장 30분 전 종목 4개 골라 티커·진입가·리서치 노트를 이메일" 같은 recurring monitor를 짠다. Quick Templates(Polymarket Address/Odds Monitor·Copy Trade)도 폼만 채우면 바로 배포된다.
10. **alerts-only로 시작해 행동 허용** — 안전한 루프는 권한보다 신뢰를 먼저 번다. 일주일 알림만 받아보고 판단이 내 것과 맞으면 그때 행동을 허용한다. 여기가 셋째 verifier gate다. 조건부 주문("$SOL ≤ 175 USDT면 매수, TP 200·SL 160")은 monitor 시스템으로 라우팅되고, 발동하면 Telegram·이메일로 영수증이 온다.
11. **규칙을 Autopilot에 위임** — Hyperliquid에서 deterministic 규칙으로 실행한다. 재량 거래도 숨은 heuristic도 없다. Supertrend flip·RSI threshold·grid level이 발동하면 행동에 옮긴다. 공식 전략은 4종(Sharpe Guard·Supertrend Monitor·Classic Futures Grid·Custom)이다. 협상 불가 컨트롤 넷은 필수 TP/SL, trailing stop, equity drawdown limit(계좌 보호), trading scope(허용 자산·레버리지 한정)다.
12. **루프 닫고 복리로** — Workflow 리서치(9) → Chat thesis(1–4) → Studio 전략(5–8) → Autopilot 라이브(11) → 다음 주 거래 리뷰(3)로 돌고 돈다. 한 바퀴 돌 때마다 다음 루프가 조금 더 똑똑해진다.

![[assets/movez-2026-loop-engineering-for-trading-agents/fig10.png]]
*Figure 10: 조립된 시스템 — 3 surface(Chat·Studio·Workflow+Autopilot) × 12 step × 3 verifier gate(trade audit·paper run·alerts-only)가 하나의 되먹임 경로로 묶인다. 한 번 설계하면 스스로 순환한다 (Movez 2026).*

## 결과 (Results)

학술 벤치마크가 아니라 제품 데모라, 정량 자료는 예시 카드가 거의 전부다.

- **예시 백테스트 카드**: "HYPE 15m Leveraged MACD, +366.15%" — equity curve 아래 Max Drawdown / Win Rate / Sharpe 행이 붙는 UI 예시다. 제품 화면일 뿐 검증된 라이브 성과는 아니다.

![[assets/movez-2026-loop-engineering-for-trading-agents/fig08.png]]
*Figure 8: Strategy Studio의 백테스트 카드. HYPE 15m Leveraged MACD가 +366.15%(Max Drawdown 29.63% / Win Rate 31.82% / Sharpe 6.28), RKLB 1h RSI Mean Reversion이 +76.67%(19.32% / 70.83% / 5.21). 총수익 옆에 리스크 3종을 나란히 보여주는 게 요점 (Movez 2026).*
- **리스크 우선 프레임**: 배포를 판단할 진짜 지표는 총수익이 아니라 return per unit of risk(Sharpe류)라고 본다. 수익이 비슷해도 리스크 프로파일은 전혀 다를 수 있기 때문이다.

> **주의**: 단일 제품(Minara) 홍보 글이고 저자 레퍼럴 링크가 딸려 있다. +366% 같은 수치는 독립 검증을 거치지 않았고, 레버리지(10x 예시)와 청산 위험에 대한 고지도 약하다. 여기서 가져갈 것은 성능 주장이 아니라 3-loop·3-gate 프레임이다.

## 관련 페이지 (Related Pages)

- [[agents/osmani-2026-loop-engineering]] — "prompting agents → designing loops"를 Loop Engineering으로 명명한 원류. 이 글의 "스크립트처럼 굴리지 말고 루프를 설계하라"와 같은 명제를 트레이딩에 옮긴 셈.
- [[agents/runkle-2026-the-art-of-loop-engineering]] — agent→verification→event-driven→hill climbing 4단계 루프 스택. 이 글의 3-gate가 runkle의 verification loop에 대응한다.
- [[agents/kang-2026-no-longer-prompting-claude]] — Prompt→Context→Harness→Loop 4단계 흐름 정리.
- [[agents/seans-ai-stories-2026-agent-harness-loop-engineering]] — harness·loop·LLMOps 입문 비유.
- [[agents/ai-boost-awesome-harness-engineering]] — harness/loop 상위 인덱스.
