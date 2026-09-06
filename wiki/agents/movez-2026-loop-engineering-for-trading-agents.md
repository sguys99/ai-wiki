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
    caption: "루프의 다섯 박자 구조 (Find, Decide, Act, Record, Refine)"
    strategy: manual
    curated: true
  - id: fig02
    file: assets/movez-2026-loop-engineering-for-trading-agents/fig02.png
    raw: raw/articles/movez-2026-loop-engineering-for-trading-agents-figures/fig02.png
    caption: "Minara 루프의 순환 경로 (Chat 리서치에서 Studio 전략, Autopilot 실행, Workflow 기록을 거쳐 다음 날 리서치로 되먹임)"
    strategy: manual
    curated: true
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
  - id: fig10
    file: assets/movez-2026-loop-engineering-for-trading-agents/fig10.png
    raw: raw/articles/movez-2026-loop-engineering-for-trading-agents-figures/fig10.png
    caption: "조립된 시스템 전체 다이어그램 (3 loop, 12 step, 3 verifier gate)"
    strategy: manual
    curated: true
---

## 요약

Movez(@0xMovez, 본명 Lev Deviatkin)가 X에 올린 장문 아티클이다. 투자에서 우위의 원천이 차트를 남보다 빨리 보는 데서 나를 대신해 조사하고 결정하고 거래하는 루프를 설계하는 데로 옮겨갔다고 진단하고, 그 루프를 만드는 12단계 로드맵을 제시한다.

로드맵은 Minara라는 앱 하나 안에서 완결된다. 리서치를 담당하는 Chat, 전략을 담당하는 Strategy Studio, 실행을 담당하는 Workflow와 Autopilot 세 구획이 각각 루프의 다른 구간을 맡고, 12단계가 이 세 구획을 순서대로 통과한다. 한 구획의 출력이 다음 구획의 입력이 되므로 구획이 서로 연결될 때 효과가 누적된다.

이 글의 독립적인 기여는 12단계 자체가 아니라 그 중간에 놓인 세 개의 verifier gate다. 자기 거래 감사(3단계), 페이퍼 트레이딩(8단계), alerts-only 모드(10단계)가 그것이다. 저자는 게이트 없는 루프를 "빠른 속도로 자기 자신에게 동의하는 에이전트"라고 부르고, 게이트가 있는 루프만이 자기 실수를 비용이 발생하기 전에 잡는다고 서술한다.

이 wiki의 loop engineering 자료들이 코딩 에이전트를 다루는 데 비해, 이 글은 같은 발상을 금융 트레이딩 에이전트에 적용한 도메인 사례다. 다만 단일 제품 튜토리얼이고 본문에 저자 레퍼럴 링크가 포함되어 있어 홍보 성격을 함께 가진다. 따라서 성능 수치가 아니라 3-loop와 3-gate라는 구조 프레임을 취해 읽는 것이 적절하다.

## 배경

저자가 지목하는 문제는 트레이더의 하루가 자동화되지 않는다는 사실이 아니라, 자동화될 수 있는 부분마저 사람이 매일 다시 수행한다는 점이다. 본문의 표현으로는 대부분의 트레이더가 스스로를 스크립트처럼 반복 실행한다. 탭 10개를 열고 같은 차트를 읽고 같은 질문을 입력하다가 노트북을 덮으면, 다음 날 같은 지점에서 처음부터 다시 시작한다.

이 반복이 손실인 이유는 시간이 들기 때문만이 아니다. 같은 판단 경로를 매번 다시 밟는데 그 판단이 어디에도 축적되지 않기 때문이다. 어제의 판독과 오늘의 판독 사이에 연결이 없으면 판단의 품질은 경험에 비례해 올라가지 않는다.

저자는 이 상태를 수치로 요약한다. 10명 중 9명은 자기 대신 감시해 주는 루프를 하나도 만들지 않는다. 스케줄에 따라 실행되는 리서치도, 스스로 백테스트하는 전략도, 잠든 사이 규칙에 따라 발동하는 실행도 없다는 뜻이다.

도구가 흩어져 있는 것도 같은 문제의 일부다. 리서치를 한 도구에서 하고 백테스트를 다른 도구에서 하고 실행을 또 다른 곳에서 하면, 각 구간의 출력이 다음 구간의 입력으로 자동 전달되지 않는다. 사람이 매번 복사하고 옮겨 붙이는 지점이 남고 그 지점이 루프를 끊는다. 저자가 12단계를 앱 하나 안에서 완결시키는 구성을 택한 이유이자, 효과가 누적되는 것은 구획이 서로 연결될 때라고 반복해 강조하는 이유다.

결론부에서 저자는 우위의 이동을 시간축에 놓는다. 지난 2년간 트레이딩의 우위는 더 빨리 읽고 더 많은 탭을 새로고침하고 남보다 먼저 움직임을 포착하는 데 있었지만 그 국면이 끝나고 있다. 이제 우위는 설계한 루프에 있다는 것이 이 글의 출발 전제다.

## 핵심 개념

루프는 리서치가 전략에 입력을 공급하고 전략이 실행에, 실행이 리뷰에, 리뷰가 다음 주 리서치에 입력을 공급하는 순환이다. 설계는 한 번만 하고 실행은 반복된다는 점이 핵심이며, 이 글이 말하는 자동화는 개별 작업의 자동화가 아니라 이 순환 전체의 자동화다.

다섯 박자는 모든 루프가 공유한다고 저자가 제시하는 최소 골격이다. Find, Decide, Act, Record, Refine 다섯 단계로 이루어지며, 12단계는 각각 이 중 하나에 대응한다. 12단계를 개별 팁의 목록이 아니라 하나의 구조로 읽게 만드는 장치다.

loopable은 매번 같은 구조로 답이 돌아와 스케줄에 올릴 수 있는 상태를 뜻한다. 리서치 결과가 링크 목록이면 사람이 매번 다르게 해석해야 하므로 스케줄할 수 없고, 데이터가 뒤에 붙은 일정한 구조로 돌아오면 같은 질문을 매일 아침 자동 실행해도 결과를 비교할 수 있다.

verifier gate는 루프의 산출물에 동의하지 않고 채점하는 별도 패스다. 저자의 근거는 전략을 작성한 모델이 그 전략에 관대하다는 관찰이며, 그래서 비판만 담당하는 별도 패스가 가장 값싼 검증 수단이라고 본다. 이 관점은 이 wiki의 [[agents/osmani-2026-loop-engineering]]이 말하는 verification distance와 같은 문제 의식에서 나온다.

return per unit of risk는 리스크 한 단위당 얻는 수익을 뜻하며, Sharpe Ratio가 대표적인 지표다. 저자는 배포 여부를 결정하는 지표가 총수익이 아니라 이 값이라고 주장한다. 총수익이 비슷한 두 전략의 리스크 프로파일이 전혀 다를 수 있기 때문이다.

deterministic 규칙은 같은 입력에 항상 같은 행동으로 대응하는 규칙을 뜻한다. 이 글의 실행 단계가 요구하는 성질이며, 재량 판단이나 문서화되지 않은 heuristic이 개입하지 않는다는 조건과 같다. 실행이 deterministic해야 사후에 무엇이 왜 발동했는지 기록할 수 있고, 그 기록이 있어야 Record와 Refine 박자가 성립한다.

regime은 시장이 일정 기간 유지하는 국면을 뜻한다. 상승 추세, 하락 추세, 횡보처럼 성격이 다른 구간이 각각 하나의 regime이다. 이 글이 백테스트를 regime별로 잘라 보라고 요구하는 이유는, 전체 기간 수익이 좋아 보여도 그 수익이 특정 국면 한 곳에서만 나왔다면 다른 국면에서는 작동하지 않기 때문이다.

## 방법

### 다섯 박자 루프 골격

저자는 12단계를 읽기 전에 다섯 박자를 머릿속에 두라고 요구한다. 각 박자가 무엇을 하는지는 다음과 같다.

| 박자 | 하는 일 | 원문이 든 예 |
|---|---|---|
| 01 Find | 처리할 대상을 표면으로 끌어올린다 | 읽어야 할 시장, 스캔할 지갑, 감시할 가격 |
| 02 Decide | thesis를 세우고 전략을 생성하고 신호를 분류한다 | |
| 03 Act | 주문을 내고 알림을 보내고 포지션을 연다 | |
| 04 Record | 무엇이 일어났는지 기록한다 | fill, P&L, 무엇이 발동했고 왜 발동했는지 |
| 05 Refine | 결과를 되먹여 다음 실행이 더 나은 지점에서 시작하게 한다 | |

![[assets/movez-2026-loop-engineering-for-trading-agents/fig01.png]]
*Figure 1: 루프의 다섯 박자 구조. 12단계가 각각 이 다섯 박자 중 하나에 대응한다 (Movez 2026)*

다섯 박자 가운데 Record와 Refine이 이 글의 강조점이다. Find부터 Act까지는 사람도 매일 수행하지만, 무엇이 발동했고 왜 발동했는지를 기록하고 그 기록을 다음 실행에 되먹이는 두 박자가 빠지면 순환이 성립하지 않는다. 앞선 세 박자만 자동화한 시스템은 빠른 반복 실행일 뿐 루프가 아니다.

### 세 개의 surface 배치

Minara는 앱 하나를 세 개의 surface로 나눈다. surface는 루프의 서로 다른 구간을 담당하는 화면 단위를 가리키는 제품 용어다.

| surface | 담당 단계 | 역할 |
|---|---|---|
| Chat | 1~4단계 | 시장에 질문하고 자산을 딥다이브하고 자기 거래를 감사해 thesis를 만든다 |
| Strategy Studio | 5~8단계 | thesis를 전략 spec으로 바꾸고 백테스트와 페이퍼 트레이딩으로 검증한다 |
| Workflow와 Autopilot | 9~12단계 | 감시를 스케줄링하고 알림에서 실행으로 권한을 넓히고 결과를 다음 리서치로 되먹인다 |

![[assets/movez-2026-loop-engineering-for-trading-agents/fig02.png]]
*Figure 2: Minara 루프의 순환 경로. 리서치가 전략에, 전략이 실행에, 실행이 기록에 입력을 공급하고 기록이 다음 날 리서치로 되먹여진다 (Movez 2026)*

저자는 첫날부터 세 surface를 모두 쓸 필요는 없다고 명시한다. 대부분의 데스크가 스케줄된 리서치 Workflow 하나로 시작해 범위를 넓혀 간다. 다만 효과가 누적되는 것은 surface가 서로 연결될 때이고, 그 연결이 루프의 요점이라고 덧붙인다. 즉 점진적 도입은 권장이지만 최종 형태는 연결된 세 구획이다.

### 12단계 요약표

세 루프에 배정된 12단계를 한자리에 모으면 다음과 같다. 아래 절들은 이 표의 각 행을 순서대로 풀어 쓴 것이다.

| 단계 | surface | 하는 일 |
|---|---|---|
| 01 | Chat | 스케줄에 올릴 수 있는 질문을 시장에 던진다 |
| 02 | Chat | 자산 하나로 좁혀 여섯 데이터 도메인을 한 번에 읽는다 |
| 03 | Chat | 자기 거래 기록을 감사받는다 (첫 번째 verifier gate) |
| 04 | Chat | 직감을 측정 가능한 thesis 문서로 바꾼다 |
| 05 | Strategy Studio | 평문 thesis를 구조화된 전략 spec으로 변환한다 |
| 06 | Strategy Studio | 검증된 template family를 fork해 튜닝한다 |
| 07 | Strategy Studio | 비용과 리스크를 함께 모델링한 백테스트를 실행한다 |
| 08 | Strategy Studio | 라이브와 같은 엔진으로 페이퍼 트레이딩한다 (두 번째 verifier gate) |
| 09 | Workflow | 평문으로 recurring monitor를 스케줄링한다 |
| 10 | Workflow | alerts-only로 일주일 검증한 뒤 행동을 허용한다 (세 번째 verifier gate) |
| 11 | Autopilot | 검증된 전략을 deterministic 규칙으로 라이브 실행한다 |
| 12 | Workflow | 실행 결과를 주간 리뷰로 되먹여 3단계로 되돌린다 |

### 리서치 루프의 네 단계

리서치 루프는 질문에서 시작해 문서화된 thesis로 끝난다. 네 단계 각각이 다음 단계의 입력을 만든다.

첫 단계는 시장에 질문을 던지는 것이다. 검색이 아니라 질문이라는 구분이 중요한데, Minara가 라이브 market, on-chain, sentiment, macro 데이터를 근거로 붙여 구조화된 답을 만들기 때문이다. 저자가 든 테스트 질문은 채권 시장이 지금 주식과 암호자산에 대한 위험 선호를 어떻게 신호하는지를 묻는 것이다. 답이 링크 목록이 아니라 데이터가 뒤에 붙은 판독으로 돌아오는 것이 이 단계를 loopable하게 만든다.

구조화된 답이 무엇을 뜻하는지는 원문의 답변 화면이 보여 준다. 채권 시장 질문에 대해 모델은 25개 출처를 41초 동안 조회한 뒤, 호출한 데이터 도구 목록과 지표별 판독 표를 함께 제시한다. 표는 지표 이름, 현재 값, 그 값이 뜻하는 신호를 열로 나눈 형태다. 2년물 4.07%, 10년물 4.38%, 30년물 4.87%, 10년물과 2년물 스프레드 +31bps, 고수익채 스프레드 2.78% 같은 값이 각각 어떤 방향의 신호인지와 함께 놓인다. 열 구성이 매일 같으므로 어제 값과 오늘 값을 같은 자리에서 비교할 수 있고, 이 비교 가능성이 스케줄링의 전제가 된다.

질문을 던지기 전에 통과시켜야 하는 필터가 하나 있다. 이 질문이 매일 아침 혼자 실행되어도 여전히 유용한지를 먼저 확인하는 것이다. 일회성 의견을 요구하는 질문은 이 필터를 통과하지 못하고, 반복 가능한 구조로 답이 돌아오는 질문만 9단계의 스케줄링으로 이어진다.

두 번째 단계는 자산 하나로 좁혀 전체 그림을 확보하는 딥다이브다. 저자는 이 작업이 보통 탭 5개와 한 시간을 쓰는 일이라고 서술한다. 루프에 쓸 수 있는 이유는 Minara가 여섯 개 데이터 도메인을 한 번의 패스로 읽기 때문이다.

| 도메인 | 포함 데이터 |
|---|---|
| Markets | 라이브 가격, OHLCV, ETF와 macro, 재무 분석 |
| Onchain | 지갑 자산, 전송, top holder, unlock, whale alert |
| Signals | whale move, 뉴스, sentiment, narrative 신호, 캘린더 |
| Derivatives | funding rate, open interest, liquidation, 거래소 흐름, borrow rate |
| Predictions | Polymarket 검색, 포지션, leaderboard, 활동 |
| DeFi | pool 데이터, yield 탐색, DEX 추세, Pendle 시장 |

도메인 목록을 아는 것이 곧 무엇을 요청할지 아는 것이라는 게 저자의 조언이다. 따라서 안정적으로 거래에 쓸 수 있는 판독을 얻는 프롬프트는 도메인을 명시적으로 지목한다. 예를 들어 $SOL 전체 thesis를 요청할 때 추세는 markets에서, holder 집중도는 onchain에서, funding과 open interest 편향은 derivatives에서, narrative 모멘텀은 signals에서 가져오라고 지정한 뒤 마지막에 한 줄 위험 대비 보상 판단을 요구한다. 어떤 렌즈를 조합할지 모델이 추측하게 두지 않는 것이 요점이다.

세 번째 단계는 자기 거래 감사이며, 세 개의 verifier gate 중 첫 번째다. 자동화에 앞서 자기 track record를 Minara에 입력해 지난 한 달의 거래를 검토받는다. 저자가 요구하는 질문은 어디서 너무 일찍 진입하고 어디서 너무 크게 사이징하는지다. 무엇을 계속 틀리는지에 대한 정직한 판독이 이후 모든 루프의 가장 값진 입력이라는 것이 이 단계의 근거다.

네 번째 단계는 hunch, 즉 아직 근거가 정리되지 않은 직감을 thesis로 바꾸는 것이다. 앞의 결과를 명시적 entry, exit, risk를 담은 문서로 옮기면 그 문서가 전략을 세울 spec이 된다. 루프는 측정 가능한 것만 자동화하므로 thesis도 측정 가능해야 한다.

원문의 thesis 예시 화면은 이 요구를 구체적으로 보여 준다. 계좌 리스크를 거래당 2%로, 대상을 HYPE-PERP로, 보유 기간을 3~10일로 고정하고, entry trigger를 64.00달러에서 64.50달러 되돌림 구간에 15분에서 1시간 봉의 상승 장악형 캔들과 20기간 평균의 2배를 넘는 현물 거래량이 함께 나타날 때로 규정한다. 되돌림 없이 67.63달러를 상향 돌파하는 경우를 위해 그 가격의 재시험에서 진입하는 dynamic trigger도 함께 적어 둔다. 모든 항이 숫자와 조건으로 표현되어 있다는 점이 공통점이다.

측정 가능한 thesis와 그렇지 않은 thesis의 차이를 저자는 vibes와 spec의 대비로 제시한다.

| 구분 | 상태 | 예시 |
|---|---|---|
| vibes | 기계가 감지할 trigger도, exit도, size도 없다. 사람이 매번 해석해야 한다 | "HYPE가 강해 보인다. 시장이 유지되면 오를 것 같다" |
| spec | 모든 항이 checkable하다. 전략이 trigger를 감지하고 exit을 배치하고 포지션을 사이징한다 | "HYPE 15m에서 ROC가 0을 넘고 거래량 breakout이 나오면 long, exit은 +5% 또는 -2%, size는 계좌 리스크 2%, 4시간 swing low 아래로 내려가면 무효" |

![[assets/movez-2026-loop-engineering-for-trading-agents/fig07.png]]
*Figure 7: 루프에 올릴 수 없는 vibes와 올릴 수 있는 spec의 대비. 모든 항이 checkable한 서술만 전략으로 자동 변환된다 (Movez 2026)*

### 전략 루프의 네 단계

전략 루프는 thesis를 실행 가능한 전략으로 바꾼 뒤 두 번 검증한다. 백테스트가 첫 검증이고 페이퍼 트레이딩이 두 번째 검증이다.

다섯 번째 단계에서 Strategy Studio가 문장 하나를 읽고 entry, exit, sizing, universe를 담은 구조화된 전략 spec을 출력한다. 코드도 퀀트 배경도 요구하지 않으며, 4단계의 thesis가 같은 스레드 안에서 테스트 가능한 전략이 된다. 저자가 든 프롬프트는 HYPE 15m 모멘텀 전략을 ROC 0 초과와 거래량 breakout에서 long 진입, 10봉 보유, 레버리지 10배, stop 2%와 target 5%, 6개월 백테스트로 지정한다.

전략의 성격을 좌우하는 구조 선택이 둘 있다. 이 선택을 잘못하면 백테스트가 의도한 것과 다른 대상을 재게 된다.

- **Time-series**: 한 자산의 시간축을 본다. momentum, mean-reversion, breakout처럼 자산 자신의 이력에 연동된 기법이 여기 속한다
- **Cross-sectional**: 한 시점의 다수 자산을 비교한다. 상대 강도, rotation, pairs처럼 universe 전체를 비교하는 기법이 여기 속한다

입력은 문장으로만 시작하지 않는다. Studio는 thesis를 네 가지 형태로 받으므로 이미 가지고 있는 자료의 형식에 맞춰 고를 수 있다.

| 입력 형태 | 설명 |
|---|---|
| 평문 | entry, exit, sizing을 문장으로 서술한다 |
| Build with a Form | 자산, 타임프레임, 선호를 구조화된 필드에 입력해 산문보다 정밀도를 높인다 |
| Video to Strategy | 전략 해설 영상을 업로드하면 바로 거래 가능한 형태로 생성한다 |
| Code to Strategy | Pine Script나 다른 플랫폼의 코드를 붙여 넣으면 이식한다 |

여섯 번째 단계는 검증된 템플릿에서 시작하는 경로다. thesis를 처음부터 작성하지 않으려면 Studio가 제공하는 네 개 template family를 fork해 튜닝한다. 구조는 Studio가 처리하고 사용자는 우위만 가져오면 된다는 것이 이 단계의 설명이다.

| template family | 동작 |
|---|---|
| Momentum | 지속되는 추세를 따라가며 적응형 stop과 변동성 인식 sizing을 쓴다 |
| Mean-reversion | 거래량이 소진을 확인해 줄 때 이동 기준선 주변의 극단 움직임에 반대로 진입한다 |
| Arbitrage | 거래소, 페어, funding rate 사이의 가격 괴리를 실시간으로 포착한다 |
| Pairs | 한 자산을 long하고 cointegrated된 짝을 short해 시장 방향에 중립을 유지하고 스프레드에만 반응한다 |

일곱 번째 단계인 백테스트는 10년 이상의 시장 데이터에 전략을 수 초 만에 재생하면서 fee, funding, borrow, slippage를 거래소별 cost curve로 모델링한다. equity curve만 주는 것이 아니라 수익 옆에 리스크를 나란히 놓는 것이 이 단계의 설계 의도다. 리스크는 세 가지 방식으로 표시된다.

| 표시 | 내용 |
|---|---|
| Drawdown | 최악의 경로를 rolling max-drawdown으로 드러낸다 |
| Volatility cone | 시장 국면(regime)에 맞춰 보정한 전방 변동성 범위를 보여 준다 |
| Exposure map | 자본이 실제로 어디에 놓여 있는지를 종목별로 보여 준다. 색이 진할수록 비중이 크므로 집중 리스크가 숨지 않는다 |

여기에 walk-forward, out-of-sample, regime-sliced 뷰가 매 실행마다 함께 제공되고, leakage check가 의심스러운 결과를 자동으로 표시한다. leakage check는 미래 데이터가 신호에 유입되었는지를 점검하는 검사다. 저자는 이 자동 점검의 유무가 라이브에서 살아남는 백테스트와 종이 위에서만 좋아 보이는 백테스트를 나눈다고 서술한다.

여덟 번째 단계인 페이퍼 트레이딩은 전략 루프의 verifier gate다. 저자는 백테스트가 약속이고 페이퍼 트레이딩이 영수증이라고 표현한다. 백테스트를 클릭 한 번으로 페이퍼로 승격하면 Studio가 라이브 실행을 구동하는 것과 같은 엔진으로 라이브 시장 데이터에 실행한다. fee 모델, slippage curve, risk hook이 모두 동일하고 자본만 걸리지 않는다. 확인에 성공하면 전략이 실자본을 받을 자격을 얻고, 실패하면 그 사실을 비용 없이 알게 된다.

라이브 승격 전에 통과해야 하는 검사는 다섯 개다. 저자는 이 게이트가 살아남는 전략과 재생에서만 좋아 보였던 전략을 나눈다고 본다.

| 검사 | 통과 기준 |
|---|---|
| 페이퍼 P&L이 백테스트를 추종 | 합리적 범위 안에 있어야 한다. 큰 격차는 백테스트가 체결을 낙관했다는 뜻이다 |
| leakage check 통과 | 미래 데이터가 신호에 유입되지 않았다 |
| out-of-sample 유지 | 튜닝하지 않은 데이터에서도 작동한다 |
| drawdown 감내 가능 | 표시된 최악의 경로를 중단 없이 통과할 수 있다 |
| regime 전반 작동 | regime-sliced 뷰에서 수익이 운 좋은 한 달에 몰려 있지 않다 |

### 실행 루프의 네 단계

실행 루프는 감시를 스케줄링하고, 알림에서 실행으로 권한을 단계적으로 넓히고, 마지막에 결과를 다음 리서치로 되먹인다.

아홉 번째 단계는 Workflow로 감시를 스케줄링하는 것이며, 데스크가 사람을 기다리지 않게 되는 지점이다. Workflow는 평문 기반 no-code 자동화로, 무엇이 언제 일어나야 하는지를 서술하면 Minara가 monitor를 구성한다. 제품이 기본 제공하는 예시는 미국 장 개장 30분 전에 종목 4개를 골라 티커와 진입 가격과 짧은 리서치 노트를 이메일로 보내는 것, 주간 시장 리포트를 이메일로 받는 것, Minara 지갑 상위 보유 종목 3개의 움직임과 on-chain 활동을 일간으로 받는 것, 일요일 저녁에 그 주의 주요 macro 이벤트와 시장 영향을 요약받는 것이다. 네 예시 모두 스케줄에 따라 이메일을 보내는 recurring monitor를 만든다.

프롬프트를 작성하지 않으려면 Quick Templates가 폼 필드만 채워 표준 워크플로를 만든다. Polymarket Address Monitor, Polymarket Odds Monitor, Copy Trade 세 종류가 기본 제공된다.

열 번째 단계는 alerts-only로 시작해 점차 행동을 허용하는 것이며, 세 번째 verifier gate다. 저자의 원칙은 안전한 루프가 권한을 얻기 전에 신뢰를 확보한다는 것이다. 모든 Workflow는 먼저 alerts-only로 실행할 수 있어 감시하고 알리기만 하며 실행은 하지 않는다. 일주일간 그 판단을 읽어 보고 자기 판단과 맞으면 행동을 허용한다.

행동을 허용한 뒤에는 문장 하나가 조건부 주문이 된다. $SOL 가격이 175 USDT 이하면 200 USDT어치를 매수하고 200 USDT에서 이익을 실현하고 160 USDT에서 손절하라는 서술이 Minara의 monitor 시스템을 통해 고정밀 실행으로 라우팅된다. Telegram이나 이메일 알림을 켜 두면 발동할 때마다 실시간 영수증을 받는다.

열한 번째 단계는 규칙을 Autopilot에 위임하는 것이다. 검증된 전략은 클릭 한 번으로 Autopilot에 올라가 Hyperliquid에서 deterministic 규칙으로 실행된다. 재량 거래도 숨은 heuristic도 없으며, Supertrend flip이나 RSI threshold나 grid level 같은 entry와 exit 규칙이 발동할 때만 행동한다. 모든 포지션은 필수 take-profit과 stop-loss를 달고 열리며, 거래가 유리하게 움직이면 stop이 따라 이동한다.

경계는 사용자가 통제한다. Autopilot이 건드릴 수 있는 자산을 정확히 승인하고, 종목별 레버리지 범위를 정하고, 도달하면 전체 포지션을 청산하는 Initial Equity Drawdown Limit을 설정한다. 포지션 종료, 엔진 일시정지, 자산을 범위에서 제외하는 조작은 언제든 가능하며, 모든 수동 조작은 의도된 override로 취급되어 숨은 재시도가 발생하지 않는다.

직접 만들지 않고 공식 전략에서 시작할 수도 있다. 각 전략은 자체 preset 거래 범위와 리스크 프레임워크를 함께 가진다.

| 공식 전략 | 성격 |
|---|---|
| Sharpe Guard | 15m 추세 추종 |
| Supertrend Monitor | 멀티 타임프레임 |
| Classic Futures Grid | 횡보 구간 대응 |
| Custom (Studio) | 사용자가 Studio에서 만든 전략 |

어떤 전략이 실행되더라도 협상 불가한 리스크 컨트롤 네 가지가 강제된다. 저자는 이것이 운전대를 넘기는 행위를 도박이 아니라 규율로 만드는 요소라고 서술한다.

| 컨트롤 | 내용 |
|---|---|
| 필수 TP/SL | 모든 포지션이 take-profit과 stop-loss를 달고 열리며, Autopilot 활성 중에는 조용히 제거될 수 없다 |
| Trailing stop | stop이 거래와 함께 이동해 이익을 확정한다. 기술적 지표가 급격히 반전하면 대기하지 않고 시장가로 종료할 수 있다 |
| Equity drawdown limit | 하한선을 고정한다. 계좌 자산이 하한에 도달하면 전체 포지션이 청산된다. 거래 단위 stop이 거래를 보호하는 데 비해 이 컨트롤은 계좌를 보호한다 |
| Trading scope | Autopilot은 사용자가 승인한 자산만, 허용한 레버리지까지만 건드린다. 범위 밖은 사용자 손에 남는다 |

열두 번째 단계는 루프를 닫는 것이다. 아침 리서치를 실행하는 Workflow가 Chat에서 다듬는 thesis에 입력을 공급하고, 그 thesis가 Studio의 전략이 되고, 그 전략이 Autopilot에서 라이브로 실행되고, Autopilot의 결과가 다음 주 거래 리뷰가 되어 3단계로 복귀한다. 저자는 이 정직성을 유지하는 장치로 주간 리뷰 Workflow 하나를 추가로 권한다. 일요일 저녁에 그 주의 주요 macro 이벤트와 그것이 보유 포지션에 미친 영향과 조정해야 할 사항을 이메일로 받는 구성이다.

### 세 개의 verifier gate

12단계에서 각 루프의 검증 지점만 뽑으면 세 개의 게이트가 남는다. 배치 위치가 서로 달라 잡아내는 오류의 종류도 다르다.

| 게이트 | 위치 | 검증 대상 | 잡아내는 오류 |
|---|---|---|---|
| 거래 감사 | 3단계, 리서치 루프 | 사람의 과거 거래 기록 | 진입 시점과 사이징의 반복되는 편향 |
| 페이퍼 런 | 8단계, 전략 루프 | 백테스트가 약속한 성과 | 체결 낙관, leakage, 과적합 |
| alerts-only | 10단계, 실행 루프 | 자동화의 판단 품질 | 실자본을 넣기 전 판단 불일치 |

세 게이트의 공통 구조는 산출물을 만든 주체와 채점하는 주체를 분리한다는 것이다. 거래 감사는 사람의 판단을 모델이 채점하고, 페이퍼 런은 백테스트의 주장을 라이브 데이터가 채점하고, alerts-only는 자동화의 판단을 사람이 채점한다. 저자가 게이트 없는 루프를 빠른 속도로 자기 자신에게 동의하는 에이전트라고 부르는 이유가 여기 있다.

![[assets/movez-2026-loop-engineering-for-trading-agents/fig10.png]]
*Figure 10: 조립된 시스템 전체 다이어그램. 3 loop와 12 step과 3 verifier gate가 하나의 되먹임 경로로 묶인다 (Movez 2026)*

### 프레임의 이식 가능성

12단계 중 이식 가능한 부분과 그렇지 않은 부분은 명확히 구분된다. 단계의 내용은 Minara의 특정 화면과 Hyperliquid의 주문 인터페이스에 결합되어 있어 다른 환경으로 그대로 옮기기 어렵다. 반면 세 게이트의 배치 원리는 도구와 무관하다.

이식 가능한 원리는 세 가지로 정리된다. 첫째, 산출물을 만든 주체와 채점하는 주체를 분리한다. 둘째, 권한을 단계적으로 넓히고 각 단계마다 관찰 기간을 둔다. 셋째, 무엇이 발동했고 왜 발동했는지를 기록해 다음 실행의 입력으로 되먹인다.

이 세 원리는 코딩 에이전트를 다루는 두 자료의 구성 요소와 대응한다. [[agents/osmani-2026-loop-engineering]]의 서브에이전트 분리와 [[agents/runkle-2026-the-art-of-loop-engineering]]의 verification loop가 첫 번째 원리에 해당하고, osmani의 persistent state와 runkle의 trace 분석이 세 번째 원리에 해당한다. 도메인이 코드에서 거래로 바뀌어도 루프를 정직하게 유지하는 장치는 같은 형태를 취한다.

## 결과

이 글은 학술 벤치마크가 아니라 제품 데모 성격이라 정량 자료는 예시 백테스트 카드가 거의 전부다. 본문 텍스트가 언급하는 수치는 HYPE 15m Leveraged MACD의 총수익 +366.15% 한 건이고, 나머지 수치는 fig08 화면 안에서만 확인된다.

| 항목 | HYPE 15m Leveraged MACD | RKLB 1h RSI Mean Reversion |
|---|---|---|
| Total Return | +366.15% | +76.67% |
| Max Drawdown | 29.63% | 19.32% |
| Win Rate | 31.82% | 70.83% |
| Sharpe Ratio | 6.28 | 5.21 |

![[assets/movez-2026-loop-engineering-for-trading-agents/fig08.png]]
*Figure 8: Strategy Studio 화면과 백테스트 카드 두 장. 총수익 옆에 Max Drawdown, Win Rate, Sharpe Ratio를 나란히 배치한 구성이 요점이다 (Movez 2026)*

두 카드는 승률과 총수익의 관계가 서로 반대다. HYPE 카드는 승률 31.82%로 낮으면서 총수익이 +366.15%로 높고, RKLB 카드는 승률 70.83%로 두 배 이상 높으면서 총수익은 +76.67%로 5분의 1 수준이다. 즉 승률이 높은 전략이 더 많이 벌지 않는다. 총수익만 보고 배포를 판단하지 말라는 본문의 주장과 방향이 같은 예시다.

같은 화면 아래쪽의 Strategy Studio 실제 실행 결과는 카드보다 훨씬 낮다. V1 HYPE ROC Volume 전략을 HYPE 15m으로 2025-01-01부터 2026-06-30까지 백테스트한 결과가 Profit +7.61%, Drawdown 27.85%, Win Rate 50.9%, Sharpe 0.68, Trades 379회, PnL Ratio 1.03으로 표시된다. 마케팅 카드의 +366.15%와 실제 실행의 +7.61%가 같은 화면에 함께 놓여 있는 셈이다. 따라서 이 글의 수치는 도구가 낼 수 있는 성과의 대표값이 아니라 화면 구성의 예시로 읽어야 한다.

Sharpe Ratio를 비교하면 격차가 더 분명하다. 두 카드는 6.28과 5.21을 표시하는데, 같은 화면의 실제 실행은 0.68이다. 카드 쪽이 약 8배 높은 값이다. 저자가 배포 판단의 실질 지표로 내세운 값이 바로 이 Sharpe Ratio다. 그 지표에서 8배 차이 나는 두 값이 같은 화면에 놓여 있으므로, 카드의 수치를 도구의 성능 근거로 인용하기는 어렵다.

정성 명제로는 return per unit of risk가 총수익보다 배포 판단의 실질 지표라는 리스크 우선 프레임이 제시된다. 이 프레임은 백테스트 화면 설계에도 반영되어 있어, 수익 지표 옆에 항상 리스크 지표 세 개가 함께 놓인다. 화면 설계 수준에서는 일관되지만 그 화면에 실리는 수치의 대표성은 별개 문제로 남는다.

## 한계

**마케팅성**: 단일 제품의 튜토리얼이며 저자 레퍼럴 링크가 포함된 홍보 글이다. 본문 중간에 Lite 플랜과 크레딧 1,400개를 선착순 200명에게 무료로 준다는 문구가 링크와 함께 삽입되어 있다. +366.15% 같은 성능 수치는 독립 검증을 거치지 않았고, 트레이딩은 실제 손실 위험이 따르는 도메인이다.

**비용 가정 불투명**: 원문은 fee, funding, borrow, slippage가 거래소별 cost curve로 모델링된다고 밝히지만 구체적 수수료율과 slippage 가정치는 제시하지 않는다. leakage check와 out-of-sample을 강조하면서도 판정 기준과 구현 방법은 서술하지 않는다. 백테스트 기간도 fig08 화면에서만 확인되고 본문 텍스트에는 없다.

**플랫폼 종속**: Hyperliquid, Polymarket, Minara라는 특정 생태계에 결합되어 있다. 3-loop와 3-gate 프레임은 다른 환경으로 이식할 수 있어도 구현은 그렇지 못하다.

**손실 고지 부재**: 원문은 필수 TP/SL, trailing stop, equity drawdown limit, trading scope처럼 플랫폼 차원의 리스크 컨트롤을 상당한 분량으로 다룬다. 그러나 레버리지 10배 예시를 들면서도 투자 손실 가능성 자체에 대한 고지나 청산 위험에 대한 균형 잡힌 경고는 두지 않았다.

**verifier의 독립성 미검증**: 세 게이트 중 거래 감사와 페이퍼 런은 모두 같은 제품 안에서 수행된다. 전략을 만든 모델과 그것을 채점하는 모델이 실제로 분리되어 있는지는 원문이 밝히지 않는다. verifier gate의 근거가 자기 평가 편향을 끊는 것인데, 같은 시스템 안의 게이트가 그 분리를 보장하는지는 이 글로 확인할 수 없다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| 다섯 박자 루프 | 저자가 모든 루프의 공통 골격으로 제시한 Find, Decide, Act, Record, Refine 다섯 단계. 12단계가 각각 이 중 하나에 대응한다 |
| Verifier gate | 루프가 자기 자신에게만 동의하지 않도록 중간에 배치하는 검증 관문. 이 글에서는 거래 감사, 페이퍼 런, alerts-only 세 개다 |
| Loopable | 매번 같은 구조로 답이 돌아와 스케줄에 올릴 수 있는 상태. 반대는 사람이 매번 해석해야 하는 vibes다 |
| Paper trading | 실자본 없이 라이브와 동일한 엔진으로 전략을 실행해 백테스트의 약속을 확인하는 단계. fee 모델, slippage curve, risk hook이 라이브와 같다 |
| Leakage check | 미래 데이터가 신호에 유입되었는지 자동으로 점검해 의심스러운 결과를 표시하는 검사 |
| Return per unit of risk | 총수익 대신 리스크 한 단위당 수익으로 배포 여부를 판단하는 지표. Sharpe Ratio가 대표적이다 |

## 관련 페이지

- [[agents/osmani-2026-loop-engineering]]: prompting agents에서 designing loops로의 전환을 loop engineering으로 명명한 원류 에세이. 이 글의 "스크립트처럼 반복 실행하지 말고 루프를 설계하라"와 동일한 명제를 트레이딩 도메인으로 옮긴 관계다
- [[agents/runkle-2026-the-art-of-loop-engineering]]: agent, verification, event-driven, hill climbing 4단계 루프 스택. 이 글의 3-gate가 runkle의 verification loop에 대응한다
- [[agents/kang-2026-no-longer-prompting-claude]]: prompt에서 context, harness, loop로 이어지는 4단계 흐름 정리
- [[agents/seans-ai-stories-2026-agent-harness-loop-engineering]]: harness와 loop 개념의 일반론과 입문 비유
- [[agents/ai-boost-awesome-harness-engineering]]: harness와 loop 상위 인덱스
