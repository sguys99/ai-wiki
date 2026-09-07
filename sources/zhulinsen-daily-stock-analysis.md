---
title: "AI Stock Analysis System (daily_stock_analysis)"
type: repo
year: 2026
category: applications
raw_path: raw/repos/zhulinsen-daily-stock-analysis.md
raw_filename: "zhulinsen-daily-stock-analysis.md"
source_collection: external
org: "ZhuLinsen"
repo: "daily_stock_analysis"
url: "https://github.com/ZhuLinsen/daily_stock_analysis"
license: "MIT"
tags: [stock-analysis, agent, notification, multi-market, backtest]
---

## 한 줄 요약 (One-line Summary)

A주, 홍콩, 미국, 일본, 한국, 대만 6개 시장의 관심종목을 매일 자동 분석해 매수와 관망과 매도 판정과 점수를 매기고, 그 결과를 텔레그램과 디스코드와 슬랙 등 6개 채널로 전송하는 MIT 라이선스 오픈소스 시스템이다.

## 1. 자료 정보 (Document Information)

- **저장소**: [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)
- **라이선스**: MIT (README 본문에 "MIT License © 2026 ZhuLinsen"으로 표기. 저장소를 활용할 경우 원 저장소 링크를 남기는 attribution을 권장한다고 덧붙인다)
- **스택**: Python 3.10 이상, FastAPI 서비스, GitHub Actions와 Docker 배포 지원
- **원본**: 저장소 하위 디렉토리에 놓인 영문판 README. 본문 상단 언어 전환 링크가 간체 중국어판을 `../README.md`로 가리키므로 중국어판이 저장소 최상위 원본이고 영문판이 번역본이다. 번체 중국어판(`README_CHT.md`)도 함께 제공된다.
- **README가 위임한 별도 문서**: `INDEX_EN.md`(문서 색인), `full-guide_EN.md`(전체 가이드), `LLM_CONFIG_GUIDE_EN.md`(모델 설정), `market-support.md`(시장 경계와 데이터 소스 커버리지). README는 세부 규칙 대부분을 이 문서들로 넘긴다.
- **후원과 배지**: README 상단에 GitHub stars, CI, MIT, Python 3.10+, GitHub Actions, Docker Hub 배지가 붙어 있다. 별도 Sponsors 절에 Anspire와 SerpAPI 배너가 있다.

## 2. 주요 기여 (Key Contributions)

README의 Key Features 표는 시스템 기능을 6개 묶음으로 정리한다.

| 기능 | 범위 |
|---|---|
| AI 의사결정 리포트 | 핵심 결론, 점수, 추세, 진입과 청산 레벨, 리스크 경고, 촉매(catalyst), 액션 체크리스트 |
| 멀티마켓 데이터 | A주, 홍콩, 미국, 일본, 한국, 대만 주식과 ETF를 포괄. 시세, K-line, 기술지표, 뉴스, 공시, 펀더멘털, 리포트 컨텍스트를 제공. 시장 경계는 `market-support.md`에 별도 문서화 |
| Web와 데스크톱 워크스페이스 | 수동 분석, 작업 진행 상황, 히스토리, 전체 Markdown 리포트, 백테스트, 포트폴리오, 설정, 라이트와 다크 테마 |
| 에이전트 전략 채팅 | 내장 전략 15종으로 Web, Bot, API에서 멀티턴 질의응답 |
| 스마트 임포트와 자동완성 | 이미지, CSV와 Excel, 클립보드 임포트. 코드, 이름, 병음, 별칭 자동완성 |
| 자동화와 알림 | GitHub Actions, Docker, 로컬 스케줄러, FastAPI 서비스. 위챗워크, 페이슈, 텔레그램, 디스코드, 슬랙, 이메일 전송 |

README는 상세 필드, 펀더멘털 P0 timeout 의미, 거래 규칙, 데이터 소스 우선순위, Web와 API 동작, 문제 해결 방법을 전체 가이드로 위임한다고 명시한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

README가 부제로 요약한 흐름은 세 단계다. 관심종목을 매일 분석하고, 의사결정 대시보드를 생성하며, 여섯 개 메신저 채널로 전송한다.

### 3.1 기술 스택과 데이터 소스

| 구분 | 지원 대상 |
|---|---|
| AI 모델 | Anspire, AIHubMix, Gemini, OpenAI 호환 프로바이더, DeepSeek, Qwen, Claude, Ollama |
| 시장 데이터 | TickFlow, AkShare, Tushare, Pytdx, Baostock, YFinance, Longbridge |
| 뉴스 검색 | Anspire, SerpAPI, Tavily, Bocha, Brave, MiniMax, SearXNG |
| 소셜 감성 | Stock Sentiment API를 통한 Reddit, X, Polymarket 데이터. 미국 주식 전용 |

README는 AkShare, Baostock, YFinance 같은 무료 시장 데이터 소스를 기본 포함하므로 추가 자격증명 없이도 구동된다고 밝힌다. 다만 무료 소스는 rate limit이 걸리거나 업스트림 계약이 바뀌거나 네트워크 상태에 따라 흔들릴 수 있어 안정성을 보장하지 않는다고 명시한다. 정기 실행이나 배치 분석, 더 안정적인 시세가 필요하면 TickFlow, Tushare, Longbridge 같은 토큰 기반 소스를 설정하라고 권한다.

### 3.2 GitHub Actions 배포 경로

README가 권장하는 첫 번째 경로다. 서버와 인프라 비용 없이 약 5분 만에 배포된다고 소개한다. 절차는 네 단계다.

1. 저장소를 fork한다.
2. `Settings` → `Secrets and variables` → `Actions` → `New repository secret`에서 Secrets를 설정한다.
3. `Actions` 탭에서 워크플로를 활성화한다.
4. `Actions` → `Daily Stock Analysis` → `Run workflow`로 수동 테스트를 실행한다.

기본 스케줄은 베이징 시간 기준 평일 18시이며 비거래일은 건너뛴다. 강제 실행, 거래일 확인, 재개 규칙은 전체 가이드의 스케줄 설정 절로 위임된다.

### 3.3 Secrets 설정 항목

README는 Secrets를 네 묶음으로 나눈다. 모델과 알림은 각각 최소 하나 이상, 관심종목은 필수다.

**AI 모델 (최소 하나 설정)**

| Secret | 설명 | 필수 여부 |
|---|---|---|
| `ANSPIRE_API_KEYS` | 주요 LLM과 웹 검색을 키 하나로 사용. 이 프로젝트용 무료 쿼터 제공 | 권장 |
| `AIHUBMIX_KEY` | 여러 모델 계열을 키 하나로 사용. 이 프로젝트에 충전 금액 10% 할인 | 권장 |
| `GEMINI_API_KEY` | Google Gemini API 키 | 선택 |
| `ANTHROPIC_API_KEY` | Anthropic Claude API 키 | 선택 |
| `OPENAI_API_KEY` | OpenAI 호환 API 키. DeepSeek과 Qwen 호환 서비스 포함 | 선택 |
| `OPENAI_BASE_URL` / `OPENAI_MODEL` | OpenAI 호환 프로바이더를 쓸 때 지정 | 선택 |

README는 프로바이더 하나와 API 키 하나로 시작하라고 안내하고, 멀티 모델 라우팅과 이미지 인식과 로컬 모델과 고급 라우팅은 `LLM_CONFIG_GUIDE_EN.md`로 위임한다. Ollama는 로컬이나 Docker 배포에 더 적합하고 GitHub Actions에서는 클라우드 API 쪽이 대체로 원활하다고 덧붙인다.

**알림 채널 (최소 하나 설정)**

| Secret | 채널 |
|---|---|
| `WECHAT_WEBHOOK_URL` | 위챗워크 봇 |
| `FEISHU_WEBHOOK_URL` | 페이슈 봇 |
| `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` | 텔레그램 |
| `DISCORD_WEBHOOK_URL` | 디스코드 webhook |
| `SLACK_BOT_TOKEN` + `SLACK_CHANNEL_ID` | 슬랙 봇 |
| `EMAIL_SENDER` + `EMAIL_PASSWORD` | 이메일 전송 |

추가 채널, 서명, 이메일 그룹, Markdown을 이미지로 바꾸는 설정은 전체 가이드의 알림 설정 절로 위임된다.

**관심종목 (필수)**

`STOCK_LIST` 하나가 필수 Secret이다. README가 제시한 예시 값 `600519,hk00700,AAPL,7203.T,005930.KS,2330.TW`는 시장별 코드 표기 규약을 그대로 보여준다.

| 예시 코드 | 시장 |
|---|---|
| `600519` | A주 |
| `hk00700` | 홍콩 |
| `AAPL` | 미국 |
| `7203.T` | 일본 |
| `005930.KS` | 한국 |
| `2330.TW` | 대만 |

**뉴스 검색 (권장)**

README는 뉴스 검색이 감성, 공시, 이벤트, 촉매 품질을 크게 높인다고 밝히고 가능하면 검색 프로바이더를 최소 하나 설정하라고 권한다.

| Secret | 설명 | 필수 여부 |
|---|---|---|
| `ANSPIRE_API_KEYS` | 중국어 콘텐츠와 A주 분석에 최적화된 AI 검색. 같은 키를 Anspire LLM 폴백에도 사용 | 권장 |
| `SERPAPI_API_KEYS` | 검색 엔진 결과 기반 실시간 금융 뉴스 | 권장 |
| `TAVILY_API_KEYS` | 범용 뉴스 검색 API | 선택 |
| `BOCHA_API_KEYS` | AI 요약을 포함한 중국어 검색 | 선택 |
| `BRAVE_API_KEYS` | 프라이버시 우선 검색과 미국 주식 뉴스 보강 | 선택 |
| `MINIMAX_API_KEYS` | 구조화된 검색 결과 | 선택 |
| `SEARXNG_BASE_URLS` | 자체 호스팅 SearXNG 인스턴스. 쿼터 없는 폴백 | 선택 |

**시장 데이터 (선택)**

기본값은 무료 소스이며 로그에 뜨는 "not configured" 메시지는 안내일 뿐 실행에 영향을 주지 않는다고 명시한다.

| Secret | 시장 | 효과 |
|---|---|---|
| `TUSHARE_TOKEN` | A주 | 과거 데이터 안정성 개선 |
| `LONGBRIDGE_OAUTH_CLIENT_ID` + `LONGBRIDGE_OAUTH_TOKEN_CACHE_B64` | 홍콩과 미국 | 거래량 비율, 회전율, PER 등 필드 보강 |

### 3.4 로컬과 Docker 배포 경로

두 번째 경로는 직접 실행이다. README가 제시한 절차는 저장소 clone, `pip install -r requirements.txt`로 의존성 설치, `.env.example`을 `.env`로 복사해 환경변수 설정, `python main.py` 실행 순서다.

주요 실행 옵션은 다음과 같다.

| 명령 | 용도 |
|---|---|
| `python main.py --debug` | 디버그 실행 |
| `python main.py --dry-run` | 실제 전송 없이 시험 실행 |
| `python main.py --stocks 600519,hk00700,AAPL,2330.TW` | 종목을 인자로 직접 지정 |
| `python main.py --market-review` | 시장 리뷰 생성 |
| `python main.py --schedule` | 로컬 스케줄러 구동 |
| `python main.py --serve-only` | 서비스만 구동 |
| `python main.py --webui` | 분석과 Web UI 동시 구동 |
| `python main.py --webui-only` | Web UI만 구동 |

Docker 배포, 스케줄링, 클라우드 서버에서 WebUI에 접근하는 방법은 전체 가이드로 위임된다.

### 3.5 Web 워크스페이스

Web 워크스페이스는 설정, 작업 모니터링, 수동 분석, 히스토리 리포트, 전체 Markdown 리포트, 에이전트 전략 채팅, 백테스트, 포트폴리오 관리, 스마트 임포트, 라이트와 다크 테마를 지원한다. 기본 접속 주소는 `http://127.0.0.1:8000`이다. 인증, 스마트 임포트, 자동완성, 리포트 복사, 클라우드 서버 접근은 전체 가이드의 로컬 WebUI 관리 절로 위임된다.

### 3.6 에이전트 전략 채팅

AI API 키를 하나라도 설정하면 Web의 `/chat` 페이지에서 전략 채팅을 쓸 수 있다. 명시적으로 끄려면 환경변수 `AGENT_MODE=false`를 설정한다.

- 내장 전략은 이동평균 크로스, 챈 이론, 엘리엇 파동, 상승 추세, 핫테마, 이벤트 드리븐, 성장주 퀄리티, 기대치 리프라이싱 등이다. README는 총 15종이라고 밝히면서 이 8종을 예시로 나열한다.
- 실시간 시세, K-line 데이터, 기술지표, 뉴스, 리스크 컨텍스트를 호출한다.
- 후속 질문, 세션 내보내기, 알림 발송, 백그라운드 실행을 지원한다.
- 커스텀 전략 파일과 실험적 멀티에이전트 오케스트레이션을 지원한다.

에이전트 파라미터, `skill` 명명 호환성, 멀티에이전트 모드, 예산 가드는 전체 가이드와 모델 설정 가이드로 위임된다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README에는 수익률, 정확도, 백테스트 성과 같은 정량 지표가 없다. 대신 출력 형식을 보여주는 예시 두 개가 실려 있다. 아래 수치는 모두 README가 형식 설명용으로 제시한 예시 값이며 실측 성과가 아니다.

### 4.1 의사결정 대시보드 예시

날짜는 2026-02-08이고 3개 종목을 분석해 매수 0종목, 관망 2종목, 매도 1종목으로 요약한다.

| 종목 코드 | 판정 | 점수 | 추세 |
|---|---|---|---|
| 000657 | 관망 | 65 | 강세 |
| 600105 | 관망 | 48 | 횡보 |
| 300260 | 매도 | 35 | 약세 |

리스크 경고 두 건과 긍정 촉매 두 건이 함께 붙는다. 리스크 경고 예시는 주력 자금의 뚜렷한 유출과 매물대 집중에 따른 단기 저항이다. 촉매 예시는 AI 서버 공급망 노출이 시장의 관심사로 남아 있다는 점과 최근 실적 성장이 펀더멘털을 뒷받침한다는 점이다.

### 4.2 시장 리뷰 예시

날짜는 2026-01-10이고 주요 지수와 시장 폭(market breadth)을 요약한다.

| 지수 | 지수값 | 등락률 |
|---|---|---|
| SSE Composite | 3250.12 | +0.85% |
| SZSE Component | 10521.36 | +1.02% |
| ChiNext | 2156.78 | +1.35% |

시장 폭은 상승 3,920종목, 하락 1,349종목, 상한가 155종목, 하한가 3종목으로 표시된다.

### 4.3 커뮤니티 인지도

README 상단에 Trendshift 배지가 붙어 있고 배지의 대체 텍스트는 "#1 Python Repository Of The Day"다. HelloGitHub의 Featured 추천 배지도 함께 있다. GitHub stars 배지는 shields.io 이미지 링크만 있어 README 텍스트에는 별 개수가 기록되어 있지 않다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **무료 데이터 소스의 불안정성**: AkShare, Baostock, YFinance는 rate limit, 업스트림 계약 변경, 네트워크 상태에 따라 흔들릴 수 있고 README가 안정성을 보장하지 않는다고 직접 명시한다.
- **실행 환경별 모델 선택 제약**: Ollama는 로컬과 Docker 배포에 더 적합하고 GitHub Actions에서는 클라우드 API가 대체로 원활하다고 안내한다. 무료 자동화 경로를 쓰면 로컬 모델 이점을 살리기 어렵다.
- **자매 프로젝트 통합은 계획 단계**: AlphaSift와 AlphaEvo는 현재 독립적으로 유지되며 후보 종목 임포트, 백테스트 검증, 리포트 핸드오프는 향후 통합 방향으로만 언급된다.
- **멀티에이전트 오케스트레이션은 실험 단계**: README가 "experimental"로 표기한다.
- **README 한 장으로는 검증 범위가 제한된다**: raw 자료가 README 단일 문서라서 내부 구현 세부는 확인할 수 없다. 펀더멘털 P0 timeout 의미, 거래 규칙, 데이터 소스 우선순위와 폴백 규칙, 예산 가드, `skill` 명명 호환성은 모두 `full-guide_EN.md`와 `LLM_CONFIG_GUIDE_EN.md`로 위임되어 있고 README에는 이름만 등장한다.
- **추천 프로바이더 링크에 추천인 파라미터가 붙어 있다**: Anspire, AIHubMix, SerpAPI, TickFlow 링크에 `share_code`, `aff`, `ref`, `utm_source` 같은 추천 파라미터가 포함되어 있고 Anspire와 SerpAPI는 Sponsors 절에도 배너로 노출된다. 프로바이더 선택 근거를 읽을 때 참고할 사항이다.
- **면책 고지**: README 말미의 Disclaimer는 이 프로젝트가 정보 제공과 교육 목적이며 AI가 생성한 분석은 투자 자문이 아니라고 밝힌다. 주식 투자에는 위험이 따르므로 직접 조사하고 필요하면 인가된 재무 자문가와 상의하라고 덧붙인다.

## 6. 관련 연구 (Related Work)

README의 Related Projects 절은 DSA가 일일 분석 리포트에 집중하고, 종목 스크리닝과 전략 검증과 전략 진화는 자매 프로젝트가 맡는다고 구분한다.

| 프로젝트 | 초점 |
|---|---|
| [AlphaSift](https://github.com/ZhuLinsen/alphasift) | 다중 팩터 종목 스크리닝과 전체 시장 스캔으로 후보 관심종목 구성 |
| [AlphaEvo](https://github.com/ZhuLinsen/alphaevo) | 전략 백테스트와 자가진화 실험으로 규칙을 검증하고 파라미터와 조합을 반복 탐색 |

## 7. 용어집 (Glossary)

- **DSA**: README가 이 시스템 자체를 가리킬 때 쓰는 약칭으로, 저장소 이름 daily_stock_analysis에서 왔다.
- **Decision Dashboard**: 관심종목별 판정, 점수, 추세와 리스크 경고, 촉매를 한 화면에 모은 일일 의사결정 요약 리포트. 이 저장소 출력물의 기본 형식이다.
- **Market Review**: 주요 지수 등락률과 시장 폭을 요약하는 별도 리포트로, `--market-review` 옵션으로 생성한다.
- **STOCK_LIST**: 분석 대상 관심종목을 쉼표로 구분해 담는 필수 Secret. 시장별 코드 표기 규약을 그대로 사용한다.
- **AGENT_MODE**: Web `/chat`의 전략 채팅 기능을 켜고 끄는 환경변수. 기본값은 활성이며 `false`로 두면 꺼진다.
- **Fundamental P0 timeout**: 펀더멘털 데이터 조회의 timeout 처리 규칙을 가리키는 이름. README는 이름만 언급하고 정의는 전체 가이드로 위임한다.
