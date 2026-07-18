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

A주·홍콩·미국·일본·한국·대만 6개 시장 종목을 매일 자동 분석해 매수/관망/매도 점수를 매기고 텔레그램·디스코드·슬랙 등으로 리포트를 push하는 오픈소스 AI 주식 분석 시스템.

## 1. 자료 정보 (Document Information)

- **저장소**: [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)
- **라이선스**: MIT
- **언어/스택**: Python 3.10+, FastAPI 기반 Web UI, GitHub Actions / Docker 배포
- **원본**: `docs/README_EN.md` (영문판, 중국어 원본 README도 별도 존재)

## 2. 주요 기여 (Key Contributions)

- 관심종목 리스트를 매일 분석해 핵심 결론·점수·추세·진입/청산 레벨·리스크 경고·촉매(catalyst)·액션 체크리스트를 포함하는 의사결정 대시보드를 생성한다.
- A주·홍콩·미국·일본·한국·대만 6개 시장과 ETF를 아우르며 시세·K-line·기술지표·뉴스·공시·펀더멘털을 통합해 분석한다.
- Web/데스크톱 워크스페이스에서 수동 분석·작업 진행 상황·히스토리·전체 Markdown 리포트·백테스트·포트폴리오 관리·라이트/다크 테마를 제공한다.
- 15종의 내장 전략(이동평균 크로스, 챈 이론, 엘리엇 파동, 상승 추세, 핫테마, 이벤트 드리븐, 성장주 퀄리티, 기대치 리프라이싱 등)으로 Web/Bot/API에서 멀티턴 에이전트 대화가 가능하다.
- 이미지·CSV/Excel·클립보드로 종목을 가져오는 스마트 임포트와 코드/이름/병음/별칭 자동완성을 지원한다.
- GitHub Actions·Docker·로컬 스케줄러·FastAPI 서비스로 자동화하고 위챗워크·페이슈·텔레그램·디스코드·슬랙·이메일로 결과를 전송한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

시스템은 데이터 수집 → AI 분석 → 알림 발송의 3단 파이프라인으로 구성된다.

AI 모델은 Anspire, AIHubMix, Gemini, OpenAI 호환 프로바이더(DeepSeek·Qwen 포함), Claude, Ollama 등 다양한 LLM을 라우팅할 수 있다. 프로바이더 하나와 API 키 하나만으로 시작할 수 있고 멀티 모델 라우팅·이미지 인식·로컬 모델은 별도 LLM Config Guide를 따른다.

시장 데이터는 TickFlow, AkShare, Tushare, Pytdx, Baostock, YFinance, Longbridge로 시세를 조회한다. AkShare·Baostock·YFinance 같은 무료 소스만으로도 구동할 수 있지만 rate limit이나 업스트림 변경에 취약해 안정성이 보장되지 않는다. 정기 실행이나 배치 분석에는 Tushare·Longbridge 같은 토큰 기반 소스 설정을 권장한다.

뉴스와 검색은 Anspire AI Search, SerpAPI, Tavily, Bocha, Brave, MiniMax, 자체 호스팅 SearXNG 등 여러 검색 프로바이더를 조합해 뉴스·공시·이벤트·촉매 품질을 높인다. 소셜 감성 분석은 Stock Sentiment API로 Reddit·X·Polymarket 데이터를 미국 주식에 한해 반영한다.

배포 경로는 두 가지다. GitHub Actions(포크 → Secrets 설정 → Actions 활성화)로 서버 없이 5분 내 배포하거나 로컬/Docker로 `python main.py` 계열 명령을 직접 실행한다. 기본값은 평일 베이징 시간 18시 실행이며 비거래일은 건너뛴다.

에이전트 전략 채팅은 AI API 키가 하나라도 설정되면 Web의 `/chat` 페이지에서 활성화된다. 실시간 시세·K-line·기술지표·뉴스·리스크 컨텍스트를 호출하며 후속 질문·세션 내보내기·알림 발송·백그라운드 실행을 지원한다. 커스텀 전략 파일과 실험적인 멀티에이전트 오케스트레이션도 제공한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README에는 정량 벤치마크 대신 출력 예시로 시스템 동작이 실려 있다.

- **의사결정 대시보드 예시**: 3개 종목 분석 결과 매수 0·관망 2·매도 1로 요약되고 종목별 점수(예: 65점 관망, 48점 관망, 35점 매도)와 리스크 경고·긍정 촉매가 함께 표시된다.
- **시장 리뷰 예시**: 상하이종합·선전성분·촹예반 등 주요 지수 등락률과 상승/하락/상한가/하한가 종목 수를 요약해 제공한다.
- Trendshift에서 "#1 Python Repository Of The Day"로 소개된 이력이 있고 HelloGitHub 추천 배지도 부착되어 있다 (커뮤니티 인지도 지표).

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 무료 시장 데이터 소스(AkShare·Baostock·YFinance)는 rate limit·업스트림 계약 변경·네트워크 상태에 따라 안정성이 흔들릴 수 있어 별도 안정성 보장이 없다.
- Ollama는 로컬/Docker 배포에 더 적합하고 GitHub Actions 환경에서는 클라우드 API 쪽이 더 원활하다고 명시되어 있어 실행 환경별 모델 선택 트레이드오프가 존재한다.
- 관련 프로젝트인 AlphaSift(종목 스크리닝)·AlphaEvo(전략 백테스트·자가진화)는 현재 독립적으로 유지되며 후보 종목 임포트·백테스트 검증·리포트 핸드오프 통합은 향후 방향으로만 언급된다.
- 멀티에이전트 오케스트레이션은 "실험적(experimental)"으로 표기되어 있어 아직 안정화 단계는 아니다.

## 6. 관련 연구 (Related Work)

- [AlphaSift](https://github.com/ZhuLinsen/alphasift) — 동일 저자의 자매 프로젝트. 다중 팩터 스크리닝과 전체 시장 스캔으로 후보 관심종목을 구축.
- [AlphaEvo](https://github.com/ZhuLinsen/alphaevo) — 전략 백테스트와 자가진화 실험을 담당하는 자매 프로젝트.

## 7. 용어집 (Glossary)

- **DSA (Daily Stock Analysis)**: 이 저장소가 지칭하는 시스템 자체의 약칭.
- **A-shares (A주)**: 중국 본토 증권거래소(상하이·선전)에 상장된 위안화 표시 주식.
- **Decision Dashboard**: 종목별 점수·추세·리스크·촉매를 요약한 일일 의사결정 요약 리포트.
- **Fundamental P0 timeout**: Full Guide에 정의된, 펀더멘털 데이터 조회가 일정 시간 내 응답하지 않을 때의 처리 규칙(README 본문에는 세부 정의 없이 언급만 있음).
- **AGENT_MODE**: Web `/chat`의 전략 채팅 기능을 켜고 끄는 환경변수.
