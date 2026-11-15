---
title: "Orkas"
type: repo
year: 2026
category: agents
source: orkas-ai-orkas.md
raw_path: raw/repos/orkas-ai-orkas.md
raw_filename: "orkas-ai-orkas.md"
source_collection: external
org: "Orkas-AI"
repo: "Orkas"
url: "https://github.com/Orkas-AI/Orkas"
license: "MIT"
tags: [multi-agent, desktop-app, local-first, orchestration, coding-agent, self-improvement]
---

## 요약

Orkas는 MIT 라이선스로 공개된 local-first 멀티에이전트 데스크톱 앱이다. 사용자는 Commander라는 조율 에이전트 하나와 대화하고, Commander가 목표를 할 일 목록으로 나눈 뒤 직접 처리하거나 내장 전문 에이전트 16개와 사용자가 이미 설치한 CLI 에이전트에 일을 나눠 맡긴다. 결과물은 답변 한 줄이 아니라 보고서, 슬라이드 덱, 영상, 코드 변경 같은 완성된 파일이다.

이 저장소가 agents 카테고리에서 갖는 의미는 두 가지다. 첫째, Claude Code, Codex, OpenCode, OpenClaw, Hermes-Agent 같은 서로 다른 회사의 에이전트를 로컬 subprocess로 구동해 하나의 계획 아래 팀원으로 묶는다. 둘째, README의 "How it works" 절이 위임 도구, 컨텍스트 예산, 메모리 scope, 실행 한도, 백그라운드 자기 개선을 실제 소스 파일 경로와 함께 공개해, 상용 수준 멀티에이전트 데스크톱 앱의 내부 구조를 읽을 수 있게 한다.

| 항목 | 내용 |
|---|---|
| 저장소 | Orkas-AI/Orkas (2026-04-29 생성, 수집 시점 star 약 9,371개) |
| 라이선스 | MIT |
| 형태 | 데스크톱 앱 (패키지 앱과 소스 실행) |
| 플랫폼 | macOS 12 이상, Windows 10 이상, glibc 2.34 이상 Linux(소스 실행만) |
| 모델 | 내장 Orkas 모델, 사용자 provider 키, 로컬 OpenAI 호환 endpoint |

## 배경

기존 에이전트 도구는 대체로 두 가지로 나뉜다. 한쪽은 Claude Code나 Codex처럼 코딩에 특화된 단일 에이전트이고, 다른 한쪽은 LangChain이나 CrewAI처럼 개발자가 코드로 에이전트를 조립하는 프레임워크다. Claude Cowork나 Manus처럼 일상 업무를 맡는 에이전트도 있지만 기본적으로 제공사의 클라우드에서 실행된다.

Orkas는 이 사이의 빈자리를 겨냥한다. README는 Orkas를 "단일 챗봇도, 코드 프레임워크도, 호스팅 SaaS도 아닌" 데스크톱 앱으로 정의한다. 즉 채팅으로 지시하되 여러 전문 에이전트가 팀으로 일하고, 데이터와 키는 사용자 디스크에 남는 형태다.

또 하나의 출발점은 "한 번의 프롬프트로 끝나지 않는 일"이다. README는 Orkas가 하나의 질문에 답하는 도구가 아니라 프로젝트를 계속 진행시키는 도구라고 설명한다. 그래서 project, 할 일 목록, Auto-advance, 예약 자동화 같은 지속 장치가 제품의 중심에 놓인다.

## 핵심 개념

Commander는 사용자와 직접 대화하는 조율 에이전트다. 분석, 글쓰기, 리서치, 파일 작업처럼 더 적합한 전문가가 없는 일은 직접 처리하고, 전문 작업은 위임 도구로 다른 에이전트에 넘긴다. 큰 작업에서는 단계를 계획하고, 각 부분을 맞는 에이전트에 배정하고, 결과를 합친다.

오케스트레이션은 여러 에이전트와 도구의 실행을 조율하는 층을 말한다. Orkas에서는 Commander가 이 역할을 맡으며, 내장 에이전트와 외부 CLI 에이전트를 같은 계획 안에서 다룬다는 점이 특징이다.

local-first는 데이터 원본을 사용자 디스크에 두고 서버 없이 실행되는 설계다. Orkas에서는 대화, 파일, 지식 베이스, 사용자 정의 에이전트가 기본적으로 로컬에 저장되고, 사용자 키를 쓰면 모델 호출도 사용자 기기에서 provider로 바로 간다.

provider는 모델 API를 제공하는 회사나 서비스 단위를 말한다. Orkas는 Claude, OpenAI, Gemini, DeepSeek, Kimi, GLM, Qwen, MiniMax, Doubao와 로컬 OpenAI 호환 endpoint를 지원한다.

compaction은 길어진 대화 이력을 요약으로 접어 context 한계 안에서 세션을 이어가는 처리다. Orkas는 긴 작업에서 checkpoint 방식의 compaction을 쓰되, 파일 읽기와 변경, 명령 실행은 구조화된 기록으로 따로 남겨 compaction 이후에도 잃지 않게 한다.

## 방법

### 내장 전문 에이전트

Orkas에는 전문 에이전트 16개가 기본으로 들어 있다. 각 에이전트는 자기 스킬, 메모리, 도구를 따로 가진다. 에이전트 마켓플레이스에서 30개 이상을 추가할 수 있고, 필요한 역할을 설명하면 Commander가 사용자 정의 에이전트를 만든다.

| 영역 | 에이전트 | 산출물 |
|---|---|---|
| 리서치와 분석 | DeepResearcher | 검증된 출처와 모순 표시를 갖춘 감사 가능한 리서치 보고서 |
| | SeoGeoAgent | URL을 받아 기술 감사, 콘텐츠 품질, Core Web Vitals, AI 답변(GEO) 인용 가능성, 우선순위 수정 목록 |
| | StockAnalyser | 주식 리서치, factor screen, backtest, 포트폴리오 위험 점검 |
| 콘텐츠와 미디어 | ContentWriter | 게시 가능한 글, 기사, 뉴스레터, 사례 연구 |
| | PptMaker | 편집 가능한 PPTX 덱 |
| | ImageStudio | 포스터, 표지, 소셜 이미지, 인포그래픽 |
| | VideoStudio | 내레이션, AI 발표자, 자막과 더빙, 하이라이트, 현지화, 참조 영상 재현 |
| | VoiceStudio | 내레이션, 다중 음성 오디오, 전사와 자막, 오디오 편집 |
| | UIDesigner | PRD, 스크린샷, Figma 자료에서 HTML 우선 UI |
| 개발과 사무 | ProductDeveloper | PRD 구현, 버그 수정, 리팩터링, 리뷰 |
| | OfficeWorker | Word, Excel, PowerPoint, PDF 생성과 편집, 일괄 처리 |
| 이커머스 | ECommerceResearcher | 예산과 시장 제약에 따른 상품 선정과 검증 계획 |
| | ECommerceWriter | 브랜드 톤의 상품 제목, 상세 페이지, FAQ, 영상 대본 |
| | ECommerceReviewer | 리뷰 주제와 나쁜 리뷰의 근본 원인 분석 |
| | ECommerceAnalyzer | 매출, 이익, 광고, 환불, 재고 지표 대조 |
| | ECommerceOperator | 카탈로그, 가격, 프로모션, 재고 변경 계획과 연결된 도구를 통한 실행 |

여러 에이전트가 필요한 일은 Commander가 쪼개 배정한다. README가 든 예는 시장 조사 한 건이 보고서, 슬라이드 덱, 출시 영상 세 가지 산출물로 이어지는 경우다. 이때 DeepResearcher, PptMaker, VideoStudio가 각자 맡은 부분을 처리하고 Commander가 결과를 합친다.

### 외부 CLI 에이전트 통합

Orkas는 사용자가 이미 설치한 CLI 에이전트 다섯 종을 로컬 subprocess 세션으로 구동한다. 코딩 에이전트로는 Claude Code, Codex, OpenCode가, 개인 에이전트로는 OpenClaw와 Hermes-Agent가 대상이다. HyperFrames 같은 오픈소스 도구도 같은 방식으로 연결할 수 있다.

Commander는 각 에이전트에 가장 잘하는 부분을 맡기고 하나의 계획을 유지한다. 예를 들어 한 대화 안에서 Codex가 버그를 고치고, 다른 에이전트가 변경을 리뷰하고, 또 다른 에이전트가 릴리스 노트 초안을 쓸 수 있다. 외부 CLI 에이전트는 Orkas의 공통 모델 설정을 따르지 않고 자기 모델 설정을 유지한다.

### 작업 라우팅

Commander의 위임은 세 가지 도구로 이루어진다. 세 도구는 결과를 누가 받는지, 대화 이력을 넘기는지, Commander 턴이 끝나는지에서 차이가 난다.

| 도구 | 대상 | 결과 처리 | 대화 이력 | Commander 턴 |
|---|---|---|---|---|
| `dispatch_to` | 이름 있는 에이전트 | Commander가 결과를 받아 작업을 이어 간다. 동기로 기다리거나 비동기로 실행 후 완료 알림을 받는다 | 전달 | 유지 |
| `hand_off_to` | 이름 있는 에이전트 | 해당 에이전트가 사용자에게 직접 답한다. 선택적 continuation으로 Commander가 나중에 더 큰 작업을 재개할 수 있다 | 전달 | 종료 |
| `run_worker` | 익명 worker | 격리된 하위 작업의 비공개 결과를 Commander에 돌려준다 | 전달하지 않음 | 유지 |

`run_worker`는 대화 이력도, 이름 있는 에이전트의 스킬도 받지 않는다. 따라서 맥락이 필요 없는 독립 하위 작업을 격리해 처리하는 서브에이전트에 가깝다. 반면 `hand_off_to`는 handoff 개념 그대로, 작업 주도권 자체를 다른 에이전트로 옮긴다. handoff는 한 에이전트가 작업을 다른 에이전트로 넘기는 전환점을 말한다.

이름 있는 에이전트 작업과 익명 worker는 동시 실행 제어를 따로 가진다. 구현은 `src/main/features/group_chat/bus.ts`(dispatch)와 `src/main/util/locks.ts`(실행 lock)에 있다.

### 컨텍스트 관리

런타임은 선택된 모델이 실제로 받을 수 있는 입력 용량을 기준으로 컨텍스트 예산을 잡는다. 이 예산에는 대화 내용뿐 아니라 프롬프트, 도구 정의, 지속되는 런타임 상태가 함께 계산된다.

| 대상 | 처리 방식 |
|---|---|
| 완료된 대화 | 최근 이력 창만 유지한다 |
| 긴 진행 중 작업 | checkpoint로 이전 과정 메시지를 압축하고 최근 작업은 원문으로 남긴다 |
| 파일 읽기, 파일 변경, 명령 실행 | 구조화된 기록으로 따로 남겨 compaction 이후에도 유지될 수 있다 |

세 번째 항목은 실무적으로 중요하다. 긴 작업에서 요약이 반복되면 "어떤 파일을 이미 고쳤는지" 같은 사실이 흐려지기 쉬운데, Orkas는 이를 대화 텍스트와 분리된 workspace 기록으로 보존한다. 구현 파일은 `src/core-agent/src/agent/` 아래의 `context-budget.ts`, `session.ts`, `workspace-state.ts`다.

### 메모리와 Library

Orkas는 지속 메모, 문서 저장소, 대화 이력을 서로 다른 장치로 분리한다.

| 장치 | 저장 대상 | 접근 방식 |
|---|---|---|
| Durable notes | 사용자 선호, 프로젝트 사실, 에이전트별 재사용 지식 | scope별로 분리된 메모 |
| Library | 사용자가 넣은 PDF와 문서 | 문서를 passage로 추출해 로컬 SQLite 벡터 인덱스에 저장하고 `library` 도구로 파일 목록, passage 검색, 원문 읽기 |
| 대화 이력 | 이전 대화 | `chat_history` 도구로 별도 검색 |

Library의 임베딩 모델은 사용자 기기에서 실행된다. 임베딩은 텍스트를 고정 차원 벡터로 바꾼 표현이며, 소스 실행 시 약 95MB 크기의 임베딩 모델이 첫 실행에 준비된다. Library는 전역 Library와 현재 프로젝트 Library로 나뉜다. 답변에는 원문 passage 인용이 붙어 사용자가 원본을 열어 확인할 수 있다.

구현은 `memory.ts`(scope별 메모리), `file_to_chunks.ts`(문서 추출), `kb-tools.ts`(Library 도구), `chat-history-tools.ts`(대화 검색)에 있다.

### 실행 한도와 복구

멀티에이전트 실행은 멈추거나 같은 일을 반복하는 경우가 생긴다. Orkas는 이를 여러 겹의 한도로 제한한다.

- session lock과 동시 실행 한도: 병렬 작업의 범위를 묶는다
- tool round 예산: 한 실행이 쓸 수 있는 tool call 횟수를 제한한다
- 진행 checkpoint: 진행 상황을 중간중간 기록한다
- 반복 호출 검사: 같은 호출의 반복을 감지한다
- 단계 인식 유휴 watchdog: 실행 단계에 맞춰 멈춘 실행을 감지한다

이름 있는 에이전트 작업은 개별로 추적하고 취소할 수 있다. 또 접수되었거나 대기열에 있는 작업을 완료 결과로 취급하지 않는다고 README는 명시한다. 즉 "맡겼다"와 "끝났다"를 구분해 Commander가 미완료 작업을 결과로 착각하지 않게 한다. 구현은 `actor-budgets.ts`, `runner.ts`, `client.ts`에 있다.

### 활동 기반 자기 개선

각 에이전트는 비공개 스킬과 메모리를 가지며, 앱이 유휴 상태일 때 백그라운드 리뷰가 새 활동을 검토한다. 리뷰는 cooldown과 실행 한도 안에서만 실행된다.

| 갱신 대상 | 내용 |
|---|---|
| `COMPETENCE.md` | 에이전트의 자기 평가 |
| `LEARNING_STRATEGIES.md` | 재사용할 수 있는 방법 |
| 학습된 스킬 | 반복되는 작업 절차 |

리뷰는 작업 횟수가 아니라 새 활동이 있는지에 따라 일어난다. 그리고 저장할 만한 것이 없다고 결론 낼 수도 있다. 구현은 `reflection-orchestrator.ts`(스케줄러)와 `evolution/metacognition.ts`(리뷰 프롬프트)에 있다.

### 작업 지속 장치

Orkas는 한 번의 작업보다 며칠에 걸쳐 이어지는 일을 위해 설계되었다. 다음 장치가 그 역할을 맡는다.

| 장치 | 내용 | 제공 범위 |
|---|---|---|
| Projects | 목표와 규칙, 메모리, 파일을 담아 프로젝트의 모든 대화가 여기서 시작한다 | 전체 |
| To-dos와 Auto-advance | 사람과 에이전트가 함께 쓰는 할 일 목록. Auto-advance를 켜면 팀이 다음 항목을 스스로 맡고 완료 작업을 검토용으로 돌려준다 | 전체 |
| Scheduled automations | 매시간, 매일, 매주, 매월 반복 실행. v1.9부터 깨어난 뒤 12시간 이내에 놓친 최근 실행 1회를 보충한다 | 전체 |
| Connectors | Gmail, Google Calendar, Sheets, Drive, Notion, Slack, Shopify, Stripe 등. 기본값으로 보내기, 게시, 삭제 전에 확인한다 | 전체 |
| Apps | 설명만으로 데스크톱 안의 로컬 앱을 만든다 | 전체 (웹 게시는 패키지 앱 유료 플랜) |
| Shared projects | 팀원이나 VA를 초대해 할 일을 사람 또는 에이전트에 배정한다 | 패키지 앱만 |

커넥터의 기본 확인 동작은 일종의 가드레일이다. 가드레일은 에이전트의 행동 범위를 제한하는 안전 장치를 말하며, Orkas는 외부로 나가는 쓰기 동작에 사람의 승인을 기본으로 둔다. ECommerceOperator도 변경을 계획하되 사용자가 연결한 도구를 통해서만 실행한다.

### 참조 영상 재현

VideoStudio의 참조 영상 재현은 README가 따로 절을 둔 기능이다. 화제가 된 영상의 서사 구조, 시각 스타일, 편집 속도를 사용자의 제품, 대본, 촬영본으로 다시 만든다.

1. 사용자가 참조 영상 파일과 자기 자료를 제공한다
2. 에이전트가 hook, 정보 순서, 시각적 비트, call to action을 분석한다
3. 무엇을 유지하고 무엇을 바꿀지 제작 전에 먼저 제안한다
4. 승인 후 제작한다

README의 예시 지시는 "reference.mp4를 참조해 30초 세로 홍보 영상을 만들고, hook과 타이포그래피와 속도는 유지하되 내용은 내 제품과 화면 녹화로 바꾸고, 분석과 계획을 먼저 보여 달라"는 형태다. 모션 그래픽 해설, SaaS와 앱 데모, 기존 촬영본 기반 제품 광고에 잘 맞는다.

### 모델 설정과 데이터 위치

Commander와 내장 에이전트는 하나의 모델 설정을 공유하며 언제든 바꿀 수 있다. 선택지는 내장 Orkas 모델, 사용자 provider 키, 로컬 endpoint 세 가지다.

| 선택지 | 호출 경로 | 비고 |
|---|---|---|
| 내장 Orkas 모델 | Orkas 관리형 모델 서비스 | 패키지 앱이 크레딧 500을 무료 제공 |
| 사용자 provider 키 | 사용자 기기에서 provider로 직접 | 키는 로컬에서 암호화되고 클라우드 동기화에서 제외된다 |
| 로컬 endpoint | 사용자 기기 안 | Ollama, LM Studio 등을 OpenAI-compatible 또는 Anthropic-compatible로 등록 |

소스 빌드는 로컬 모델 endpoint와 함께 완전 오프라인으로 실행할 수 있다. 반면 패키지 앱은 첫 실행에 로그인이 필요하다.

### 소스 실행

소스 실행에는 Node 22.12 이상이 필요하다. native npm 패키지에 호환되는 사전 빌드 바이너리가 없는 드문 경우에만 Python 3와 C/C++ 빌드 도구가 쓰인다.

```bash
git clone https://github.com/Orkas-AI/Orkas.git
cd Orkas
./run.sh           # macOS / Linux
run.cmd            # Windows
```

첫 실행에서 `run.sh`가 고정된 npm 의존성 트리를 설치하고 Python, uv, Node, 임베딩 모델(약 95MB), OfficeCLI, FFmpeg, whisper.cpp, 다국어 음성 모델을 준비한다. OCR과 스킬별 Python 패키지는 해당 기능을 처음 쓸 때 격리된 로컬 환경에 설치된다. 작업 공간은 macOS와 Linux에서 `~/.orkas/`에 생기고, 이후 Settings → AI Providers에서 API key나 OAuth를 추가한다.

native 의존성 오류가 나면 Node.js 24 LTS를 쓰고 `npm run native:repair`를 실행한다. 이 명령은 선택 패키지 복원, Electron용 SQLite 재빌드, sqlite-vec와 sharp 점검을 수행한다. `npm run native:check`는 설치 없이 점검만 한다.

## 결과

README는 성능이나 품질에 대한 정량 벤치마크를 제시하지 않는다. 대신 비교표로 다른 도구와의 위치 차이를 설명한다.

| 도구 | 성격 | Orkas와의 관계 |
|---|---|---|
| Claude Code | Anthropic의 에이전트형 코딩 도구 | 대체가 아니라 팀원. Orkas가 구동하고 코드 밖 작업과 지속 장치를 더한다 |
| Codex | OpenAI의 코딩 에이전트 | 대체가 아니라 팀원. 코딩은 Codex, 리뷰는 다른 에이전트에 나눠 맡긴다 |
| Claude Cowork | Anthropic의 업무 에이전트, 기본 클라우드 실행 | 오픈소스 대안. 로컬 실행이 기본이지만 컴퓨터가 켜져 있어야 한다 |
| Manus | 클라우드에서 계획하고 실행하는 에이전트 | 오픈소스 대안. trade-off는 Cowork와 같다 |
| LangChain | 코드 우선 LLM 앱 프레임워크 | Orkas는 코드가 아니라 채팅으로 지시한다 |
| CrewAI | 역할 기반 에이전트를 코드로 조율하는 Python 프레임워크 | 멀티에이전트 오케스트레이션을 앱으로 제공하고 지속 장치와 자기 개선을 내장한다 |
| OpenClaw | 메시징 연동과 멀티에이전트 라우팅을 가진 개인 에이전트 플랫폼 | CLI 에이전트로 Orkas 팀에 합류할 수 있다 |
| Hermes-Agent | Nous Research의 자기 개선형 단일 에이전트 | 팀원 하나로 연결된다 |

비교표가 보여 주는 Orkas의 전략은 경쟁보다 포섭이다. 코딩 에이전트와 개인 에이전트는 팀원으로 끌어들이고, 클라우드 에이전트에는 로컬 실행을, 코드 프레임워크에는 앱 형태를 대비시킨다. 대신 클라우드 대안과 달리 사용자 컴퓨터가 켜져 있어야 한다는 trade-off를 README 스스로 명시한다.

README가 제시하는 활용 사례는 다음과 같다.

| 사례 | 예시 산출물 |
|---|---|
| 마케팅 콘텐츠 | 출시 영상, 제품 페이지, 글, 뉴스레터 |
| 스토어 운영 | 주간 매출 브리핑, 리뷰 답변, 상품 등록, 경쟁사 점검 |
| 리서치와 보고서 | 출처를 단 보고서와 덱 |
| 문서 기반 질의응답 | 로컬 파일에 근거하고 원문을 인용하는 답변 |
| 고객 업무 | 회의 브리핑, 월간 고객 보고서 |
| 제품 출시 | 랜딩 페이지, 테스트를 포함한 버그 수정, changelog |
| 앱 제작 | 견적 계산기, 예약 양식, 내부 도구 |
| 소규모 팀 | 사람과 에이전트가 공유하는 프로젝트 |

가격 정책은 패키지 앱 기준이다. 무료로 크레딧 500을 제공하고, 유료 플랜은 월 $11.99부터 월간 크레딧, 클라우드 동기화, 공유 프로젝트, 앱 게시를 더한다. 웹 앱 게시 한도는 Lite 5개, Pro 8개, Max 15개다. 사용자 키를 쓰면 provider가 직접 과금하고 Orkas는 마진을 붙이지 않는다.

## 한계

- **컴퓨터 상시 구동**: Auto-advance와 자동화는 컴퓨터가 켜져 있고 Orkas가 실행 중일 때만 동작한다. v1.9부터 놓친 최근 실행 1회를 12시간 이내에 보충하는 데 그친다
- **오픈소스 빌드의 기능 공백**: 공유 프로젝트, 클라우드 동기화, 웹 앱 게시는 패키지 앱에만 있다
- **외부 전송 경로**: local-first가 기본이지만 내장 Orkas 모델, 음성 입력 인식, 클라우드 동기화, 공유 프로젝트는 Orkas 서버를 거친다. 음성 입력은 소스 빌드에서도 Orkas API Key와 크레딧이 필요하다
- **계정 요건**: 패키지 앱은 로그인이 필요하고 네트워크 없이 쓸 수 없다. 소스 빌드는 계정 계층이 없다
- **플랫폼 제약**: Linux는 설치 파일 없이 소스 실행만 가능하고 Alpine 같은 musl 기반 배포판은 지원하지 않는다
- **참조 영상 재현의 범위**: 소셜 플랫폼 공유 링크 다운로드가 없고, 정확한 카메라 움직임, 사람의 연기, 프레임 단위 일치를 보장하지 않는다. AI 생성 영상 안의 텍스트는 영상 자체를 바꿔야 수정된다
- **정량 평가 부재**: README에는 멀티에이전트 조율의 품질, 비용, 성공률을 보여 주는 벤치마크가 없다. 비교표는 기능과 포지셔닝 비교에 머문다

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Commander | 목표를 할 일로 나누고 직접 처리하거나 전문 에이전트에 위임하는 Orkas의 조율 에이전트 |
| Auto-advance | 팀이 프로젝트 할 일 목록의 다음 항목을 스스로 맡아 진행하는 기능 |
| `dispatch_to` / `hand_off_to` / `run_worker` | 결과 회수형 위임, 주도권 이전형 위임, 격리된 익명 하위 작업이라는 세 가지 위임 도구 |
| Library | 문서를 passage 단위로 로컬 SQLite 벡터 인덱스에 저장해 인용과 함께 검색하게 하는 문서 저장소 |
| Durable notes | 사용자 선호, 프로젝트 사실, 에이전트별 지식을 scope별로 보관하는 지속 메모 |
| `COMPETENCE.md` / `LEARNING_STRATEGIES.md` | 백그라운드 리뷰가 갱신하는 에이전트별 자기 평가와 재사용 방법 파일 |

## 관련 페이지

- [[agents/garrytan-gstack]]: Claude Code 위에 역할별 스킬로 가상 개발팀을 구성한다. Orkas는 같은 팀 발상을 여러 회사의 에이전트와 코딩 밖 업무로 넓힌다
- [[agents/cemri-2025-why-do-multi-agent-llm-systems]]: 멀티에이전트 시스템의 실패 유형 분류. Orkas의 반복 호출 검사, watchdog, 미완료 작업 구분이 다루는 문제와 맞닿아 있다
- [[agents/anthropic-2025-effective-context-engineering-for-ai]]: compaction과 구조화된 기록 같은 context engineering 기법의 배경
- [[agents/osmani-2026-loop-engineering]]: 예약 실행과 조건 기반 반복을 설계 대상으로 보는 관점. Orkas의 Auto-advance와 예약 자동화가 제품화된 사례다
