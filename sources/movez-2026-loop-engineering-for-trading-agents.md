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
    caption: "루프의 다섯 박자 구조 (Find, Decide, Act, Record, Refine)"
    strategy: manual
    curated: true
  - id: fig02
    file: assets/movez-2026-loop-engineering-for-trading-agents/fig02.png
    raw: raw/articles/movez-2026-loop-engineering-for-trading-agents-figures/fig02.png
    caption: "Minara 루프의 순환 경로 (Chat 리서치에서 Studio 전략, Autopilot 실행, Workflow 기록을 거쳐 다음 날 리서치로 되먹임)"
    strategy: manual
    curated: true
  - id: fig03
    file: assets/movez-2026-loop-engineering-for-trading-agents/fig03.png
    raw: raw/articles/movez-2026-loop-engineering-for-trading-agents-figures/fig03.png
    caption: "Chat 화면의 bond market 질문과 호출된 데이터 도구 목록 (25개 출처, 41초 소요)"
    strategy: manual
    curated: false
  - id: fig04
    file: assets/movez-2026-loop-engineering-for-trading-agents/fig04.png
    raw: raw/articles/movez-2026-loop-engineering-for-trading-agents-figures/fig04.png
    caption: "1단계 답변 예시로 제시된 yield curve 지표별 신호 표 (2년물 4.07%, 10년물 4.38%, 10년물과 2년물 스프레드 +31bps)"
    strategy: manual
    curated: false
  - id: fig05
    file: assets/movez-2026-loop-engineering-for-trading-agents/fig05.png
    raw: raw/articles/movez-2026-loop-engineering-for-trading-agents-figures/fig05.png
    caption: "2단계 딥다이브 예시로 제시된 $HYPE whale position 표와 거래소별 liquidation 표"
    strategy: manual
    curated: false
  - id: fig06
    file: assets/movez-2026-loop-engineering-for-trading-agents/fig06.png
    raw: raw/articles/movez-2026-loop-engineering-for-trading-agents-figures/fig06.png
    caption: "4단계 thesis 예시로 제시된 $HYPE Perp Trading Thesis의 entry trigger 조건표"
    strategy: manual
    curated: false
  - id: fig07
    file: assets/movez-2026-loop-engineering-for-trading-agents/fig07.png
    raw: raw/articles/movez-2026-loop-engineering-for-trading-agents-figures/fig07.png
    caption: "루프에 올릴 수 없는 vibes와 올릴 수 있는 spec의 대비"
    strategy: manual
    curated: true
  - id: fig08
    file: assets/movez-2026-loop-engineering-for-trading-agents/fig08.png
    raw: raw/articles/movez-2026-loop-engineering-for-trading-agents-figures/fig08.png
    caption: "Strategy Studio 화면과 백테스트 카드 두 장 (HYPE 15m Leveraged MACD +366.15%, RKLB 1h RSI Mean Reversion +76.67%)"
    strategy: manual
    curated: true
  - id: fig09
    file: assets/movez-2026-loop-engineering-for-trading-agents/fig09.png
    raw: raw/articles/movez-2026-loop-engineering-for-trading-agents-figures/fig09.png
    caption: "Strategy Studio 입력창의 네 가지 입력 형태 (평문, Form, Video, Code)"
    strategy: manual
    curated: false
  - id: fig10
    file: assets/movez-2026-loop-engineering-for-trading-agents/fig10.png
    raw: raw/articles/movez-2026-loop-engineering-for-trading-agents-figures/fig10.png
    caption: "조립된 시스템 전체 다이어그램 (3 loop, 12 step, 3 verifier gate)"
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

투자에서 우위의 원천이 "차트를 남보다 빨리 보는 것"에서 "나 대신 조사하고 결정하고 거래하는 루프를 설계하는 것"으로 옮겨갔다는 명제를 트레이딩 도메인에 적용한 실무 글이다. Minara라는 앱 하나 안에서 리서치, 전략, 실행 세 루프를 12단계로 엮으면 코드 없이도 스스로 실행되는 퀀트 데스크가 만들어진다는 로드맵을 제시한다. 거래 감사, 페이퍼 트레이딩, alerts-only 세 개의 verifier gate가 자동화된 데스크의 정직성을 유지하는 장치라는 것이 이 글의 중심 주장이다.

## 1. 자료 정보 (Document Information)

- **저자**: Movez (@0xMovez, 본명 Lev Deviatkin), X(Twitter) Article, 7월 2일 게시
- **매체**: X 장문 아티클. 인증 장벽 때문에 자동 수집이 불가해 사용자가 제공한 본문을 기반으로 한다
- **원문 분량**: 15,871자
- **성격**: Minara(minara.ai) 제품을 실제 워크플로로 삼은 튜토리얼이자 사고 프레임이다. 본문 중간에 저자 레퍼럴 링크가 삽입되어 있고 Lite 플랜과 크레딧 1,400개를 선착순 200명에게 무료로 준다는 문구가 붙어 있어 마케팅 성격도 함께 띤다
- **핵심 프레임**: harness와 loop engineering 담론을 차트 트레이딩이 아니라 트레이딩 데스크 자동화에 이식했다. 이 wiki의 loop engineering 클러스터가 코딩 에이전트를 다루는 데 비해, 이 글은 같은 사고를 금융 트레이딩 에이전트에 적용한 도메인 사례다

## 2. 주요 기여 (Key Contributions)

1. **loop engineering의 트레이딩 이식**: 스스로를 스크립트처럼 반복 실행하지 말고 루프를 설계하라는 명제를 퀀트 데스크에 적용했다. 대부분의 트레이더가 탭 10개를 열고 같은 차트와 같은 질문을 매일 반복하며, 10명 중 9명은 자기 대신 감시해 주는 루프를 하나도 만들지 않는다는 문제 제기에서 출발한다.
2. **3-loop와 12-step 구조**: Research(1~4단계), Strategy(5~8단계), Execution(9~12단계) 세 루프를 12단계로 나눈다. 한 루프의 출력이 다음 루프의 입력이 되면서 효과가 누적되는 구성이다.
3. **다섯 박자 루프 골격**: 모든 루프가 Find, Decide, Act, Record, Refine라는 같은 다섯 박자를 가진다고 보고, 12단계 각각을 이 다섯 박자 중 하나에 대응시킨다.
4. **verifier gate 3중 배치**: 자동화된 데스크가 "빠른 속도로 자기 자신에게 동의하는 에이전트"가 되지 않도록, 거래 감사(3단계), 페이퍼 런(8단계), alerts-only(10단계) 세 게이트를 루프 중간에 배치한다. 전략을 작성한 모델은 그 전략에 관대하기 때문에, 비판만 담당하는 별도 패스가 가장 값싼 검증 수단이라는 관점이다.
5. **점진적 도입 원칙**: 첫날부터 세 surface를 모두 쓸 필요는 없다. 대부분의 데스크가 스케줄된 리서치 Workflow 하나로 시작해 범위를 넓혀 가지만, 효과가 누적되는 것은 surface가 서로 연결될 때라고 덧붙인다.
6. **스케줄 가능한 질문 필터**: 질문을 던지기 전에 이 질문이 매일 아침 혼자 실행되어도 여전히 유용한지를 먼저 확인한다. 매번 같은 구조로 답이 돌아오는 질문만 스케줄할 수 있기 때문이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 다섯 박자 루프 골격

저자는 루프의 최소 골격을 다섯 박자로 정의하고 12단계를 각각 한 박자에 대응시킨다 (fig01).

| 박자 | 하는 일 | 원문이 든 예 |
|---|---|---|
| 01 Find | 처리할 대상을 표면으로 끌어올린다 | 읽어야 할 시장, 스캔할 지갑, 감시할 가격 |
| 02 Decide | thesis를 세우고 전략을 생성하고 신호를 분류한다 | |
| 03 Act | 주문을 내고 알림을 보내고 포지션을 연다 | |
| 04 Record | 무엇이 일어났는지 기록한다 | fill, P&L, 무엇이 발동했고 왜 발동했는지 |
| 05 Refine | 결과를 되먹여 다음 실행이 더 나은 지점에서 시작하게 한다 | |

### 3.2 세 surface 배치

Minara는 앱 하나를 세 개의 surface로 나눠 각각에 루프의 다른 구간을 맡긴다 (fig02, fig10).

- **Chat (1~4단계)**: 시장에 질문하고 자산을 딥다이브하고 자기 거래를 감사해 thesis를 만든다
- **Strategy Studio (5~8단계)**: thesis를 전략 spec으로 바꾸고 백테스트와 페이퍼 트레이딩으로 검증한다
- **Workflow와 Autopilot (9~12단계)**: 감시를 스케줄링하고 알림에서 실행으로 권한을 넓히고 결과를 다음 리서치로 되먹인다

### 3.3 리서치 루프 (Chat)

**01 시장에 진짜 질문 던지기.** 검색이 아니라 질문이다. Minara가 라이브 market, on-chain, sentiment, macro 데이터를 근거로 구조화된 답을 만든다. 답이 링크 목록이 아니라 데이터가 뒤에 붙은 구조화된 판독이라는 점이 이 단계를 loopable하게 만든다. 매번 같은 구조로 답이 돌아오는 질문은 나중에 스케줄할 수 있는 질문이며, 이것이 9단계로 연결된다. 원문이 제시한 테스트 명령과 추가 예시 질문은 다음과 같다.

```
How is the bond market signaling risk appetite for stocks and crypto right now?
```

추가 예시로는 현재 시장 국면이 risk-on인지 risk-off인지 전환 국면인지를 묻고 가장 중요한 신호 3개와 포지셔닝 방향을 요구하는 질문, 이번 주 Polymarket leaderboard 상위 트레이더 5명이 무엇에 베팅하는지와 반대로 갈 만한 합의가 있는지를 묻는 질문을 든다.

**02 단일 자산 딥다이브.** macro 판독이 방향을 가리키면 자산 하나로 좁혀 가격 움직임, on-chain 흐름, derivatives 포지셔닝, sentiment를 한 번에 확보한다. 저자는 이 작업이 보통 탭 5개와 한 시간을 쓰는 일이라고 서술한다. 루프에 쓸 수 있는 이유는 Minara가 여섯 개 데이터 도메인을 한 번의 패스로 읽기 때문이다.

| 도메인 | 포함 데이터 |
|---|---|
| Markets | 라이브 가격, OHLCV, ETF와 macro, 재무 분석 |
| Onchain | 지갑 자산, 전송, top holder, unlock, whale alert |
| Signals | whale move, 뉴스, sentiment, narrative 신호, 캘린더 |
| Derivatives | funding rate, open interest, liquidation, 거래소 흐름, borrow rate |
| Predictions | Polymarket 검색, 포지션, leaderboard, 활동 |
| DeFi | pool 데이터, yield 탐색, DEX 추세, Pendle 시장 |

tradeable read를 안정적으로 얻는 프롬프트는 도메인을 명시적으로 지목한다. 어떤 렌즈를 조합할지 모델이 추측하게 두지 않는 것이 요점이다.

```
Full thesis on $SOL: trend (markets), holder concentration (onchain), funding + OI skew (derivatives), and narrative momentum (signals). End with a one-line risk/reward call.
```

**03 자기 거래 감사.** 스스로 개선되는 루프에는 결과에 동의하지 않고 채점하는 verifier가 필요하다. 자동화에 앞서 자기 track record를 Minara에 입력한다. 무엇을 계속 틀리는지에 대한 정직한 판독이 이후 모든 루프의 가장 값진 입력이라는 것이 저자의 주장이다. 첫 번째 verifier gate에 해당한다.

```
Review my trades from the last month and suggest improvements. Where am I entering too early or sizing too big?
```

**04 직감을 thesis로.** 마지막 리서치 단계는 앞의 결과를 명시적 entry, exit, risk를 담은 문서로 바꾼다. 이 문서가 전략을 세울 spec이 된다. 전략을 세울 수 있는 thesis와 세울 수 없는 thesis의 차이는 구체성이며, 루프는 측정 가능한 것만 자동화하므로 thesis도 측정 가능해야 한다 (fig07). 원문의 thesis 예시 화면(fig06)은 계좌 리스크 거래당 2%, 대상 HYPE-PERP, 보유 기간 3~10일, entry trigger 64.00~64.50달러 되돌림에 15분에서 1시간 봉 상승 장악형 캔들과 20기간 평균 2배 초과 현물 거래량, 미되돌림 시 67.63달러 돌파 재시험 진입이라는 dynamic trigger까지 모든 항을 숫자와 조건으로 적는다.

### 3.4 전략 루프 (Strategy Studio)

**05 평문으로 전략 작성.** Strategy Studio는 문장 하나를 읽고 entry, exit, sizing, universe를 담은 구조화된 전략 spec을 출력한다. 코드도 퀀트 배경도 요구하지 않는다. 4단계의 thesis가 같은 스레드 안에서 테스트 가능한 전략이 된다.

```
$HYPE momentum strategy (15m): long on ROC>0 + volume breakout, hold 10 bars; 10x, stop 2% target 5%, 6-month backtest.
```

전략의 성격을 좌우하는 구조 선택이 둘 있다. 이 선택을 잘못하면 백테스트가 다른 대상을 재게 된다.

- **Time-series**: 한 자산의 시간축을 본다. momentum, mean-reversion, breakout처럼 자산 자신의 이력에 연동된 기법이 여기 속한다
- **Cross-sectional**: 한 시점의 다수 자산을 비교한다. 상대 강도, rotation, pairs처럼 universe를 비교하는 기법이 여기 속한다

입력은 문장으로만 시작하지 않는다. Studio는 thesis를 네 가지 형태로 받는다 (fig09).

- **평문**: entry, exit, sizing을 문장으로 서술한다
- **Build with a Form**: 자산, 타임프레임, 선호를 구조화된 필드에 입력해 정밀도를 높인다
- **Video to Strategy**: 전략 해설 영상을 업로드하면 바로 거래 가능한 형태로 생성한다
- **Code to Strategy**: Pine Script나 다른 플랫폼의 코드를 붙여 넣으면 이식한다

**06 검증된 템플릿에서 시작.** thesis를 처음부터 쓰지 않으려면 Studio가 제공하는 네 개 template family를 fork해 튜닝한다.

- **Momentum**: 지속되는 추세를 따라가며 적응형 stop과 변동성 인식 sizing을 쓴다
- **Mean-reversion**: 거래량이 소진을 확인해 줄 때 이동 기준선 주변의 극단 움직임에 반대로 진입한다
- **Arbitrage**: 거래소, 페어, funding rate 사이의 가격 괴리를 실시간으로 포착한다
- **Pairs**: 한 자산을 long하고 cointegrated된 짝을 short해 시장 방향에 중립을 유지하고 스프레드에만 반응한다

**07 리스크 내장 백테스트.** Studio는 10년 이상의 시장 데이터에 전략을 수 초 만에 재생하면서 fee, funding, borrow, slippage를 거래소별 cost curve로 모델링한다. equity curve만 주는 것이 아니라 수익 옆에 리스크를 나란히 놓는 것이 요점이다. 리스크는 세 가지 방식으로 표시된다.

- **Drawdown**: 최악의 경로를 rolling max-drawdown으로 드러낸다
- **Volatility cone**: 시장 국면(regime)에 맞춰 보정한 전방 변동성 범위를 보여 준다
- **Exposure map**: 자본이 실제로 어디에 놓여 있는지를 종목별로 보여 주며, 색이 진할수록 비중이 크다

walk-forward, out-of-sample, regime-sliced 뷰가 매 실행마다 함께 제공되고, leakage check가 의심스러운 결과를 자동으로 표시한다. 배포 여부를 결정하는 지표는 총수익이 아니라 return per unit of risk다. 수익이 비슷한 두 전략의 리스크 프로파일이 전혀 다를 수 있기 때문이다.

**08 실자본 전 페이퍼 트레이딩.** 저자는 백테스트가 약속이고 페이퍼 트레이딩이 영수증이라고 표현한다. 백테스트를 클릭 한 번으로 페이퍼로 승격하면 Studio가 라이브 실행과 같은 엔진으로 라이브 시장 데이터에 실행한다. fee 모델, slippage curve, risk hook이 모두 동일하고 자본은 걸리지 않는다. 전략 루프의 verifier gate이며, 라이브 승격 전에 통과해야 하는 검사는 다섯 개다.

| 검사 | 통과 기준 |
|---|---|
| 페이퍼 P&L이 백테스트를 추종 | 합리적 범위 안에 있어야 한다. 큰 격차는 백테스트가 체결을 낙관했다는 뜻이다 |
| leakage check 통과 | 미래 데이터가 신호에 유입되지 않았다 |
| out-of-sample 유지 | 튜닝하지 않은 데이터에서도 작동한다 |
| drawdown 감내 가능 | 표시된 최악의 경로를 중단 없이 통과할 수 있다 |
| regime 전반 작동 | regime-sliced 뷰에서 수익이 운 좋은 한 달에 몰려 있지 않다 |

### 3.5 실행 루프 (Workflow와 Autopilot)

**09 Workflow로 감시 스케줄링.** 데스크가 사람을 기다리지 않게 되는 지점이다. Workflow는 평문 기반 no-code 자동화로, 무엇이 언제 일어나야 하는지를 서술하면 Minara가 monitor를 구성한다. 제품이 기본 제공하는 예시 프롬프트는 모두 스케줄에 따라 이메일을 보내는 recurring monitor를 만든다.

```
30 minutes before the U.S. market opens, select 4 stocks and email me their tickers, entry prices, and a brief research note.
```

나머지 세 예시는 주간 시장 리포트를 이메일로 받는 것, Minara 지갑 상위 보유 종목 3개의 움직임과 on-chain 활동을 일간으로 받는 것, 일요일 저녁에 그 주의 주요 macro 이벤트와 시장 영향을 요약받는 것이다.

프롬프트를 쓰지 않으려면 Quick Templates가 폼 필드만 채워 표준 워크플로를 만든다. Polymarket Address Monitor, Polymarket Odds Monitor, Copy Trade 세 종류가 기본 제공된다.

**10 alerts-only로 시작해 행동 허용.** 안전한 루프는 권한을 얻기 전에 신뢰를 확보한다. 모든 Workflow는 먼저 alerts-only로 실행할 수 있다. 감시하고 알리기만 하며 실행은 하지 않는다. 일주일간 그 판단을 읽어 보고 자기 판단과 맞으면 행동을 허용한다. 세 번째 verifier gate에 해당한다.

```
Buy 200 USDT of $SOL if price ≤ 175 USDT, then take profit at 200 USDT and stop loss at 160 USDT.
```

이 한 문장이 조건부 주문이 되어 Minara의 monitor 시스템을 통해 고정밀 실행으로 라우팅된다. Telegram이나 이메일 알림을 켜 두면 발동할 때마다 실시간 영수증을 받는다.

**11 규칙을 Autopilot에 위임.** 검증된 전략은 클릭 한 번으로 Autopilot에 올라가 Hyperliquid에서 deterministic 규칙으로 실행된다. 재량 거래도 숨은 heuristic도 없다. entry나 exit 규칙이 발동하면(Supertrend flip, RSI threshold, grid level) Autopilot이 행동한다. 모든 포지션은 필수 take-profit과 stop-loss를 달고 열리며, 거래가 유리하게 움직이면 stop이 따라 올라간다.

경계는 사용자가 통제한다. 허용 자산 승인, 종목별 레버리지 범위, 도달 시 전체 청산하는 Initial Equity Drawdown Limit을 설정하며, 포지션 종료와 엔진 일시정지와 자산 제외는 언제든 가능하다. 모든 수동 조작은 의도된 override로 취급되어 숨은 재시도가 발생하지 않는다.

직접 만들지 않고 공식 전략에서 시작할 수도 있다. 각 전략은 자체 preset 거래 범위와 리스크 프레임워크를 함께 가진다.

- **Sharpe Guard**: 15m 추세 추종
- **Supertrend Monitor**: 멀티 타임프레임
- **Classic Futures Grid**: 횡보 구간 대응
- **Custom (Studio)**: 사용자가 만든 전략

어떤 전략이 실행되더라도 협상 불가한 리스크 컨트롤 네 가지가 강제된다.

| 컨트롤 | 내용 |
|---|---|
| 필수 TP/SL | 모든 포지션이 take-profit과 stop-loss를 달고 열리며, Autopilot 활성 중에는 조용히 제거될 수 없다 |
| Trailing stop | stop이 거래와 함께 이동해 이익을 확정한다. 기술적 지표가 급격히 반전하면 대기하지 않고 시장가로 종료할 수 있다 |
| Equity drawdown limit | 하한선을 고정한다. 계좌 자산이 하한에 도달하면 전체 포지션이 청산된다. 거래 단위 stop이 거래를 보호하는 데 비해 이 컨트롤은 계좌를 보호한다 |
| Trading scope | Autopilot은 사용자가 승인한 자산만, 허용한 레버리지까지만 건드린다. 범위 밖은 사용자 손에 남는다 |

**12 루프 닫고 효과 누적.** 12단계가 하나의 시스템이 되는 지점이다. 아침 리서치를 실행하는 Workflow(9단계)가 Chat에서 다듬는 thesis(1~4단계)에 입력을 공급하고, 그 thesis가 Studio의 전략(5~8단계)이 되고, 그 전략이 Autopilot에서 라이브로 실행되고(11단계), Autopilot의 결과가 다음 주 거래 리뷰(3단계)가 되어 루프가 다시 시작한다. 중간의 세 verifier gate가 자동화된 데스크의 정직성을 유지한다. 게이트 없는 루프는 빠른 속도로 자기 자신에게 동의하는 에이전트일 뿐이고, 게이트가 있는 루프는 자기 실수를 비용이 발생하기 전에 잡는 시스템이라는 것이 저자의 정리다. 데스크를 스스로에 대해 채점하는 주간 리뷰 Workflow 하나가 이 정직성을 유지한다.

```
Every Sunday evening, email me a summary of the week's major macro events, how they affected my open positions, and what I should adjust.
```

### 3.6 결론부의 주장

저자는 지난 2년간 트레이딩의 우위가 더 빨리 읽고 더 많은 탭을 새로고침하는 데 있었지만 그 국면이 끝나고 있다고 서술한다. 이제 우위는 설계한 루프, 즉 스케줄에 따라 실행되는 리서치와 스스로 백테스트하는 전략과 잠든 사이 규칙에 따라 발동하는 실행에 있다. 마지막 권고는 지금 하지 않는 한 단계를 골라 오늘 설정하라는 것이며, 후보로 첫 Workflow나 라이브 전 페이퍼 런을 든다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 글은 학술 벤치마크가 아니라 제품 데모 성격이라, 정량 수치는 예시 백테스트 카드가 거의 전부다. 본문 텍스트가 언급하는 수치는 HYPE 15m Leveraged MACD의 총수익 +366.15% 한 건이고, 나머지 수치는 fig08 화면 안에서만 확인된다.

| 항목 | HYPE 15m Leveraged MACD | RKLB 1h RSI Mean Reversion |
|---|---|---|
| Total Return | +366.15% | +76.67% |
| Max Drawdown | 29.63% | 19.32% |
| Win Rate | 31.82% | 70.83% |
| Sharpe Ratio | 6.28 | 5.21 |

두 카드는 승률과 총수익의 관계가 서로 반대다. HYPE 카드는 승률 31.82%로 낮으면서 총수익이 높고, RKLB 카드는 승률 70.83%로 두 배 이상 높으면서 총수익은 5분의 1 수준이다.

같은 fig08 화면 아래쪽의 Strategy Studio 실제 실행 결과는 카드보다 훨씬 낮다. V1 HYPE ROC Volume 전략을 HYPE 15m으로 2025-01-01부터 2026-06-30까지 백테스트한 결과가 Profit +7.61%, Drawdown 27.85%, Win Rate 50.9%, Sharpe 0.68, Trades 379회, PnL Ratio 1.03으로 표시된다.

정성 명제로는 return per unit of risk가 총수익보다 배포 판단의 실질 지표라는 리스크 우선 프레임이 제시된다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **마케팅성**: 단일 제품(Minara)의 튜토리얼이며 저자 레퍼럴 링크가 포함된 홍보 글이다. +366.15% 같은 성능 수치는 독립 검증을 거치지 않았고, 트레이딩은 실제 손실 위험이 따르는 도메인이다. 성능 주장보다 verifier gate 개념을 프레임으로 취하는 편이 안전하다.
- **비용 가정 불투명**: 원문은 fee, funding, borrow, slippage가 거래소별 cost curve로 모델링된다고 밝히지만 구체적 수수료율과 slippage 가정치는 제시하지 않는다. leakage check와 out-of-sample을 강조하면서도 판정 기준과 구현 방법은 서술하지 않는다. 백테스트 기간은 fig08 화면에서만 확인되고 본문 텍스트에는 없다.
- **플랫폼 종속**: Hyperliquid, Polymarket, Minara라는 특정 생태계에 결합되어 있다. 3-loop와 3-gate 프레임은 다른 환경으로 이식할 수 있어도 구현은 그렇지 못하다.
- **손실 고지 부재**: 원문은 필수 TP/SL, trailing stop, equity drawdown limit, trading scope처럼 플랫폼 차원의 리스크 컨트롤을 상당한 분량으로 다룬다. 그러나 레버리지 10배 예시를 들면서도 투자 손실 가능성 자체에 대한 고지나 청산 위험에 대한 균형 잡힌 경고는 두지 않았다.
- **verifier의 독립성 미검증**: 세 게이트 중 거래 감사와 페이퍼 런은 모두 같은 제품 안에서 수행된다. 전략을 만든 모델과 채점하는 모델이 실제로 분리되어 있는지는 원문이 밝히지 않는다.

## 6. 관련 연구 (Related Work)

이 글의 사고 골격은 이 wiki의 loop engineering과 harness engineering 클러스터와 직접 맞닿는다. 그 클러스터가 코딩 에이전트를 다루는 데 비해, 이 글은 금융 트레이딩 에이전트라는 별도 도메인에 같은 프레임을 이식했다.

- [[agents/osmani-2026-loop-engineering]]: "prompting agents"에서 "designing loops"로의 전환을 loop engineering으로 명명한 원류 에세이. 이 글의 "스크립트처럼 반복 실행하지 말고 루프를 설계하라"와 동일한 명제다.
- [[agents/runkle-2026-the-art-of-loop-engineering]]: agent, verification, event-driven, hill climbing 4단계 루프 스택. 이 글의 3-gate가 runkle의 verification loop에 대응한다.
- [[agents/kang-2026-no-longer-prompting-claude]]: prompt에서 context, harness, loop로 이어지는 4단계 흐름 정리.
- [[agents/seans-ai-stories-2026-agent-harness-loop-engineering]]: harness와 loop 개념의 일반론.
- [[agents/ai-boost-awesome-harness-engineering]]: harness와 loop 상위 인덱스.

## 7. 용어집 (Glossary)

- **다섯 박자 루프 (five-beat anatomy)**: 저자가 모든 루프의 공통 골격으로 제시한 Find, Decide, Act, Record, Refine 다섯 단계. 12단계가 각각 이 중 하나에 대응한다.
- **Verifier gate**: 루프가 자기 자신에게만 동의하지 않도록 중간에 배치하는 검증 관문. 이 글에서는 거래 감사, 페이퍼 런, alerts-only 세 개다.
- **Loopable**: 매번 같은 구조로 답이 돌아와 스케줄에 올릴 수 있는 상태. 반대는 사람이 매번 해석해야 하는 vibes다.
- **Paper trading**: 실자본 없이 라이브와 동일한 엔진(같은 fee 모델, 같은 slippage curve, 같은 risk hook)으로 전략을 실행해 백테스트의 약속을 확인하는 단계.
- **Leakage check**: 미래 데이터가 신호에 유입되었는지 자동으로 점검해 의심스러운 결과를 표시하는 검사.
- **Return per unit of risk**: 총수익 대신 리스크 한 단위당 수익으로 배포 여부를 판단하는 지표. Sharpe Ratio가 대표적이다.
- **Autopilot**: 검증된 전략을 deterministic 규칙으로 Hyperliquid에서 자동 실행하는 실행 엔진.

## 8. 그림 후보 (Figure Candidates)

원본 X 아티클에서 사용자가 수동 저장한 10개 이미지다. 개념 도식(fig01, fig02, fig07, fig10)과 핵심 결과(fig08)를 wiki에 임베드 확정하고, 나머지 UI 스크린샷과 예시 화면은 아카이브에 보존한다.

| id | caption | 유형 | 추천 |
|---|---|---|---|
| fig01 | 루프의 다섯 박자 구조 (Find, Decide, Act, Record, Refine) | 개념 도식 | ★ wiki 확정 (concept) |
| fig02 | Minara 루프의 순환 경로 (Chat 리서치에서 Studio 전략, Autopilot 실행, Workflow 기록을 거쳐 다음 날 리서치로 되먹임) | 아키텍처 도식 | ★ wiki 확정 (architecture) |
| fig03 | Chat 화면의 bond market 질문과 호출된 데이터 도구 목록 (25개 출처, 41초 소요) | UI 스크린샷 | 아카이브 |
| fig04 | 1단계 답변 예시로 제시된 yield curve 지표별 신호 표 (2년물 4.07%, 10년물 4.38%, 10년물과 2년물 스프레드 +31bps) | 결과 예시 | (선택) |
| fig05 | 2단계 딥다이브 예시로 제시된 $HYPE whale position 표와 거래소별 liquidation 표 | UI 스크린샷 | 아카이브 |
| fig06 | 4단계 thesis 예시로 제시된 $HYPE Perp Trading Thesis의 entry trigger 조건표 | 결과 예시 | (선택) |
| fig07 | 루프에 올릴 수 없는 vibes와 올릴 수 있는 spec의 대비 | 개념 도식 | ★ wiki 확정 (concept) |
| fig08 | Strategy Studio 화면과 백테스트 카드 두 장 (HYPE 15m Leveraged MACD +366.15%, RKLB 1h RSI Mean Reversion +76.67%) | 결과 | ★ wiki 확정 (result) |
| fig09 | Strategy Studio 입력창의 네 가지 입력 형태 (평문, Form, Video, Code) | UI 스크린샷 | 아카이브 |
| fig10 | 조립된 시스템 전체 다이어그램 (3 loop, 12 step, 3 verifier gate) | 종합 도식 | ★ wiki 확정 (summary) |
