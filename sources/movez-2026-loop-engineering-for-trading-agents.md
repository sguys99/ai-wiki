---
title: "Loop Engineering for trading agents: 12 Steps to build a self-running Quant desk"
type: article
year: 2026
category: agents
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

## 한 줄 요약 (One-line Summary)

투자에서 레버리지의 무게 중심이 "차트를 더 빨리 보는 것"에서 "나 대신 조사·결정·거래하는 루프를 설계하는 것"으로 옮겨갔다. 이 주장을 트레이딩 도메인에 그대로 옮긴 실무 글이다. Minara라는 앱 하나 안에서 리서치·전략·실행 세 루프를 12단계로 엮으면 코드 없이도 스스로 돌아가는 퀀트 데스크가 나온다는 로드맵을 제시한다. 세 개의 verifier gate(거래 감사·페이퍼 트레이딩·alerts-only)가 자동화된 데스크의 정직성을 지킨다는 것이 이 글의 핵심이다.

## 1. 자료 정보 (Document Information)

- **저자**: Movez (@0xMovez, 본명 Lev Deviatkin) — X(Twitter) Article, 2026-07-02 게시
- **매체**: X 장문 아티클 (인증 장벽으로 자동 fetch 불가, 사용자 제공 본문 기반)
- **성격**: Minara(minara.ai) 제품을 실제 워크플로우로 삼은 튜토리얼이자 사고 프레임. 저자 레퍼럴 링크가 들어 있어 마케팅 성격도 띤다.
- **핵심 프레임**: harness/loop engineering 담론을 "차트 트레이딩"이 아니라 "트레이딩 데스크 자동화"에 이식했다. 이 wiki의 loop engineering 클러스터가 코딩 에이전트를 다룬다면, 이 글은 같은 사고를 금융 트레이딩 에이전트에 적용한 도메인 케이스다.

## 2. 주요 기여 (Key Contributions)

1. **loop engineering의 트레이딩 이식**: "스스로를 스크립트처럼 굴리지 말고 루프를 설계하라"는 명제를 퀀트 데스크에 적용했다. 대부분(10명 중 9명)이 자기 대신 감시하는 루프를 하나도 만들지 않는다는 문제 제기에서 출발한다.
2. **3-loop × 12-step 구조**: Research(1–4) → Strategy(5–8) → Execution(9–12) 세 루프를 12단계로 나눈다. 한 루프의 출력이 다음 루프의 입력이 되면서 복리로 강해지는 구성이다.
3. **verifier gate 3중 강조**: 자동화 데스크가 "빠른 속도로 자기 자신에게 동의하는 에이전트"로 전락하지 않도록, 거래 감사(step 3)·페이퍼 런(step 8)·alerts-only(step 10) 세 게이트를 루프 중간에 박는다. 전략을 쓴 모델은 그 전략에 너무 관대하기 마련이라, 비판만 하는 별도 패스가 가장 값싼 검증기라는 관점이다.
4. **점진적 도입 원칙**: 첫날부터 세 surface를 다 쓸 필요는 없다. 스케줄된 리서치 Workflow 하나로 시작해 넓혀가라는 실전 조언.
5. **"스케줄 가능한 질문" 필터**: "이 질문이 매일 아침 혼자 돌아도 유용할까?"를 통과해야 루프에 넣는다. 매번 같은 구조로 답이 나오는 질문만 스케줄할 수 있다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

Minara는 하나의 앱을 세 개의 surface로 나눠 각각 루프의 다른 구간을 맡긴다.

**Loop 1 · Research Loop (Chat)**
- **01 시장에 진짜 질문 던지기** — 검색이 아니라 질문이다. Minara가 라이브 market·on-chain·sentiment·macro 데이터를 근거로 구조화된 답을 준다. 링크 더미가 아니라 매번 같은 shape로 오는 답이라 나중에 스케줄할 수 있다(step 9로 연결).
- **02 단일 자산 딥다이브** — 6개 데이터 도메인을 한 번에 읽는다: Markets(가격·OHLCV·ETF/macro), Onchain(지갑·전송·top holders·unlock·whale alert), Signals(whale move·뉴스·sentiment·narrative·calendar), Derivatives(funding rate·OI·liquidation·exchange flow·borrow rate), Predictions(Polymarket 검색·포지션·leaderboard), DeFi(pool·yield·DEX·Pendle). 프롬프트에서 도메인을 콕 집어줄수록 tradeable read가 안정적으로 나온다.
- **03 자기 거래 감사** — 자동화에 앞서 자기 track record를 Minara에 들이댄다. "어디서 너무 일찍 진입하고 너무 크게 사이징하는가." 첫 번째 verifier gate다.
- **04 hunch을 thesis로** — 명시적 entry·exit·risk를 담은 문서로 바꾼다. 루프는 측정 가능한 것만 자동화하니 thesis도 숫자로 못 박아야 한다.

**Loop 2 · Strategy Loop (Strategy Studio)**
- **05 평문으로 전략 프롬프트** — 문장 하나를 읽고 구조화된 전략 spec(entry·exit·sizing·universe)을 내놓는다. Time-series(한 자산의 시간축)로 갈지 Cross-sectional(한 시점의 다수 자산)로 갈지, 이 두 구조 선택이 backtest의 의미를 좌우한다. 입력은 4형태(평문·Form·Video-to-Strategy·Code-to-Strategy, 예: Pine Script 포팅)다.
- **06 검증된 템플릿에서 시작** — 4개 template family: Momentum·Mean-reversion·Arbitrage·Pairs.
- **07 리스크 내장 백테스트** — 10년+ 데이터에 fee·funding·borrow·slippage를 venue별 cost curve로 모델링한다. equity curve와 함께 rolling max-drawdown·forward volatility cone·exposure map을 나란히 보여준다. walk-forward·out-of-sample·regime-sliced 뷰와 leakage check가 매 런마다 자동으로 돈다. 판단 지표는 총수익이 아니라 return per unit of risk다.
- **08 실자본 전 페이퍼 트레이딩** — "백테스트는 약속, 페이퍼 트레이딩은 영수증." 라이브 실행과 같은 엔진(같은 fee·slippage·risk hook)으로 라이브 데이터에 돌린다. 두 번째 verifier gate다. 라이브 승격 전 5개 체크: 페이퍼 P&L이 백테스트를 추종·leakage clean·out-of-sample 유지·drawdown 감내 가능·regime 전반 작동.

**Loop 3 · Execution Loop (Workflow + Autopilot)**
- **09 Workflow로 감시 스케줄링** — 평문 no-code 자동화다. "미 장 개장 30분 전 종목 4개 골라 이메일" 같은 recurring monitor를 짠다. Quick Templates(Polymarket Address/Odds Monitor·Copy Trade)도 제공한다.
- **10 alerts-only로 시작해 행동 허용** — 안전한 루프는 권한을 얻기 전에 신뢰부터 번다. 일주일간 알림만 받아보고 그 판단이 내 것과 맞으면 그때 행동을 허용한다. 세 번째 verifier gate다. 조건부 주문("$SOL price ≤ 175 USDT면 매수, TP 200·SL 160")은 monitor 시스템으로 라우팅된다.
- **11 규칙을 Autopilot에 위임** — Hyperliquid에서 deterministic 규칙으로 실행한다. 재량 거래도 숨은 heuristic도 없다. Supertrend flip·RSI threshold·grid level 같은 규칙이 발동하면 움직인다. 공식 전략은 4종(Sharpe Guard·Supertrend Monitor·Classic Futures Grid·Custom)이다. 협상 불가 4대 리스크 컨트롤은 필수 TP/SL·trailing stop·equity drawdown limit(계좌 보호)·trading scope(허용 자산·레버리지 한정)다.
- **12 루프 닫고 복리로** — Workflow 리서치(9)→Chat thesis(1–4)→Studio 전략(5–8)→Autopilot 라이브(11)→다음 주 거래 리뷰(3)로 순환한다. 매 루프가 다음 루프를 조금 더 똑똑하게 만든다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 글은 학술 벤치마크가 아니라 제품 데모 성격이라, 정량 수치라고는 예시 백테스트 카드가 거의 유일하다.

- **예시 백테스트 카드**: "HYPE 15m Leveraged MACD, +366.15%" — equity curve 아래 Max Drawdown / Win Rate / Sharpe 행이 붙는 UI 예시다. 제품 화면 예시일 뿐 검증된 라이브 성과가 아니라는 점에 유의한다.
- **정성 명제**: "return per unit of risk(Sharpe류)가 총수익보다 배포 판단의 진짜 지표"라는 리스크 우선 프레임.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **마케팅성**: 단일 제품(Minara)의 튜토리얼이자 저자 레퍼럴 링크가 붙은 홍보 글이다. 성능 주장(+366% 카드 등)은 독립 검증을 거치지 않았고, 트레이딩은 실손실 위험이 따르는 도메인이다. 그대로 믿기보다 verifier gate 개념만 뽑아 쓰는 편이 안전하다.
- **재현성 없음**: 백테스트·페이퍼 성과의 재현 데이터·기간·수수료 가정이 글에 없다. leakage check·out-of-sample을 강조하면서도 구체적 방법론은 블랙박스로 남겨둔다.
- **플랫폼 종속**: Hyperliquid·Polymarket·Minara라는 특정 생태계에 묶여 있다. 프레임(3-loop·3-gate)은 이식할 수 있어도 구현은 그렇지 못하다.
- **리스크 고지 부재**: 레버리지(10x 예시)·청산 위험을 놓고 균형 잡힌 경고가 약하다.

## 6. 관련 연구 (Related Work)

이 글의 사고 골격은 이 wiki의 loop/harness engineering 클러스터와 직접 맞닿는다. 그 클러스터가 코딩 에이전트를 다루는 반면, 이 글은 **금융 트레이딩 에이전트**라는 별도 도메인에 같은 프레임을 이식했다.

- [[agents/osmani-2026-loop-engineering]] — "prompting agents → designing loops"라는 전환을 Loop Engineering으로 명명한 원류 에세이. 이 글의 "스크립트처럼 굴리지 말고 루프를 설계하라"와 동일한 명제.
- [[agents/runkle-2026-the-art-of-loop-engineering]] — agent→verification→event-driven→hill climbing 4단계 루프 스택. 이 글의 3-gate(verifier)가 runkle의 verification loop에 대응.
- [[agents/kang-2026-no-longer-prompting-claude]] · [[agents/seans-ai-stories-2026-agent-harness-loop-engineering]] — loop/harness 개념의 일반론.
- [[agents/ai-boost-awesome-harness-engineering]] — harness/loop 상위 인덱스.

## 7. 용어집 (Glossary)

- **Loop (트레이딩 루프)**: research → decide → trade → review로 스스로 도는 자동 사이클. 이 글의 five-beat anatomy.
- **Verifier gate**: 루프가 자기 자신에게만 동의하지 않도록 끼우는 검증 관문. 이 글은 거래 감사·페이퍼 런·alerts-only 3중.
- **Paper trading**: 실자본 없이 라이브와 동일 엔진(fee·slippage 동일)으로 전략을 돌려 백테스트 약속을 검증하는 단계.
- **Leakage check**: 미래 데이터가 신호에 스며들었는지 자동 점검(look-ahead bias 방지).
- **Out-of-sample / walk-forward / regime-sliced**: 튜닝하지 않은 데이터·전진 검증·시장 국면별로 백테스트를 잘라 보는 과적합 방어 뷰.
- **Autopilot**: 검증된 전략을 deterministic 규칙으로 거래소(Hyperliquid)에서 자동 실행하는 실행 엔진. TP/SL·trailing stop·drawdown limit·trading scope가 강제.
- **Time-series vs Cross-sectional**: 전략이 한 자산의 시간축을 보느냐(momentum 등) 한 시점의 다수 자산을 비교하느냐(rotation·pairs 등).

## 8. 그림 후보 (Figure Candidates)

원본 X 아티클에서 사용자가 수동 저장한 10개 이미지. 개념 도식(fig01·02·07·10)과 핵심 결과(fig08)를 wiki에 임베드 확정(curated: true), 나머지 UI 스크린샷·예시 화면은 아카이브 보존.

| id | 내용 | 유형 | 추천 |
|---|---|---|---|
| fig01 | 루프 5-beat anatomy (Find·Decide·Act·Record·Refine) | 개념 도식 | ★ wiki 확정 (concept) |
| fig02 | Minara 3-surface 루프 순환 | 아키텍처 도식 | ★ wiki 확정 (architecture) |
| fig03 | Chat UI — bond 질문 + 도구 목록 | UI 스크린샷 | 아카이브 |
| fig04 | step 1 답변 — yield curve 신호 표 | 결과 예시 | (선택) |
| fig05 | step 2 딥다이브 — HYPE whale·liquidation 표 | UI 스크린샷 | 아카이브 |
| fig06 | step 4 thesis — HYPE Perp Trading Thesis | 결과 예시 | (선택) |
| fig07 | vibes vs spec (can't loop vs loopable) | 개념 도식 | ★ wiki 확정 (concept) |
| fig08 | Strategy Studio + 백테스트 카드 (+366.15%) | 결과 | ★ wiki 확정 (result) |
| fig09 | Strategy Studio 입력창 4형태 | UI 스크린샷 | 아카이브 |
| fig10 | 조립된 시스템 — 12-step·3-loop·3-gate | 종합 도식 | ★ wiki 확정 (summary) |
