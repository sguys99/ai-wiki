---
title: "Orkas"
type: repo
year: 2026
category: agents
raw_path: raw/repos/orkas-ai-orkas.md
raw_filename: "orkas-ai-orkas.md"
source_collection: external
org: "Orkas-AI"
repo: "Orkas"
url: "https://github.com/Orkas-AI/Orkas"
license: "MIT"
tags: [multi-agent, desktop-app, local-first, orchestration, coding-agent, self-improvement]
figures:
  - id: fig01
    file: assets/orkas-ai-orkas/task-en.png
    raw: resources/app-ui/task-en.png
    caption: "Orkas 데스크톱 앱의 작업 화면. 사용자가 예산 $5,000 이하의 데스크 램프 출시 계획을 요청하자 Commander가 3분 만에 포지셔닝, 단계별 예산표, 출시 계획 Markdown 파일과 경쟁사 비교 CSV 파일을 돌려준다. 왼쪽 사이드바에는 To-do, Auto, AI Team, Skills, Connectors, Library, Apps 메뉴와 프로젝트별 작업 목록이 있다."
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

Orkas는 MIT 라이선스의 local-first 멀티에이전트 데스크톱 앱으로, Commander가 사용자의 목표를 할 일 목록으로 나누고 내장 전문 에이전트 16개와 사용자가 이미 설치한 CLI 에이전트(Claude Code, Codex, OpenCode, OpenClaw, Hermes-Agent)에 일을 나눠 맡겨 완성된 산출물을 돌려준다.

## 1. 자료 정보 (Document Information)

- **저장소**: [Orkas-AI/Orkas](https://github.com/Orkas-AI/Orkas), 라이선스 MIT
- **규모**: star 약 9,371개, 2026-04-29 생성 (2026-11-15 수집 시점 GitHub API 기준)
- **수집 범위**: 최상위 `README.md` 원문 한 파일. 소스 코드와 각 언어판 README(简体中文, 日本語)는 수집하지 않았다
- **배포 형태**: macOS 12 이상(Apple Silicon, Intel)과 Windows 10 이상용 패키지 앱, 그리고 저장소 소스 실행. Linux(glibc 2.34 이상, x64와 arm64)는 현재 소스 실행만 가능하다
- **README 작성자 연락처**: X 계정 @leochenpm, 웹사이트 orkas.ai
- **README 성격**: 제품 소개, 비교표, FAQ가 큰 비중을 차지하고, "How it works" 절이 내부 구조를 소스 파일 링크와 함께 설명한다

## 2. 주요 기여 (Key Contributions)

1. **Commander 중심의 팀형 에이전트**. 사용자는 Commander 하나와 대화하고, Commander가 직접 처리할 일과 전문 에이전트에 넘길 일을 가른다. 큰 작업은 단계를 계획한 뒤 여러 에이전트에 나눠 맡기고 결과를 합친다.
2. **외부 CLI 에이전트의 팀원화**. Claude Code, Codex, OpenCode(코딩 에이전트)와 OpenClaw, Hermes-Agent(개인 에이전트)를 로컬 subprocess 세션으로 구동해 하나의 계획 아래 함께 쓴다. HyperFrames 같은 오픈소스 도구도 같은 방식으로 연결된다.
3. **지속되는 작업 단위**. project가 목표, 규칙, 메모리, 파일을 보관해 새 대화가 이전 맥락에서 이어진다. 할 일 목록, Auto-advance, 예약 자동화가 한 번의 프롬프트로 끝나지 않는 일을 계속 진행시킨다.
4. **local-first 설계**. 대화, 파일, 지식 베이스, 사용자 정의 에이전트가 기본적으로 사용자 디스크에 남는다. 자기 API 키를 쓰면 모델 호출이 사용자 기기에서 provider로 바로 간다.
5. **활동 기반 자기 개선**. 앱이 유휴 상태일 때 백그라운드 리뷰가 새 활동을 살펴 에이전트별 자기 평가(`COMPETENCE.md`), 재사용 방법(`LEARNING_STRATEGIES.md`), 학습된 스킬을 갱신한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 내장 전문 에이전트 16개

| 영역 | 에이전트 | 산출물 |
|---|---|---|
| 리서치와 분석 | DeepResearcher | 검증된 출처, 표시된 모순, 감사 가능한 보고서를 갖춘 근거 기반 리서치 |
| | SeoGeoAgent | URL을 받아 기술 감사, 콘텐츠 품질, Core Web Vitals, AI 답변(GEO) 인용 가능성, 우선순위가 매겨진 수정 목록 |
| | StockAnalyser | 주식 리서치, factor screen, backtest, 포트폴리오 위험 점검과 추적 가능한 대시보드 |
| 콘텐츠와 미디어 | ContentWriter | 목표, 출처, 초안에서 게시 가능한 글, 기사, 뉴스레터, 사례 연구 |
| | PptMaker | 주제, 개요, 문서에서 편집 가능한 PPTX 덱 |
| | ImageStudio | 포스터, 표지, 소셜 이미지, 인포그래픽 |
| | VideoStudio | 내레이션, AI 발표자, 자막과 더빙, 하이라이트 클립, 현지화, 참조 영상 재현 |
| | VoiceStudio | 내레이션, 다중 음성 오디오, 전사와 자막, 오디오 편집과 믹싱 |
| | UIDesigner | 제품 목표, PRD, 스크린샷, Figma 자료에서 편집 가능한 HTML 우선 UI |
| 개발과 사무 | ProductDeveloper | 저장소를 이해하는 엔지니어링. PRD 구현, 버그 수정, 리팩터링, 리뷰를 검증 가능한 결과로 |
| | OfficeWorker | Word, Excel, PowerPoint, PDF 파일의 생성, 편집, 점검, 일괄 처리 |
| 이커머스 | ECommerceResearcher | 예산, 시장, 소싱 제약에 따른 상품 선정과 탈락 사유, 검증 계획 |
| | ECommerceWriter | 브랜드 톤의 제목, 상세 페이지, FAQ, 이미지 문구, 영상 대본 |
| | ECommerceReviewer | 리뷰와 평판 분석. 고객 주제, 나쁜 리뷰의 근본 원인, 우선순위 |
| | ECommerceAnalyzer | 내보낸 데이터에서 매출, 이익, 광고, 환불, 재고를 대조한 지표와 의사결정 |
| | ECommerceOperator | 카탈로그, 가격, 프로모션, 재고 변경을 계획하고 연결된 도구로만 실행 |

각 에이전트는 고유한 스킬, 메모리, 도구를 가진다. 에이전트 마켓플레이스에서 30개 이상을 추가로 고를 수 있고, 필요한 역할을 설명하면 Commander가 사용자 정의 에이전트를 만든다.

### 3.2 참조 영상 재현 (VideoStudio)

VideoStudio는 화제가 된 영상의 서사 구조, 시각 스타일, 편집 속도를 사용자의 제품, 대본, 촬영본으로 재현한다. 에이전트는 참조 영상의 hook, 정보 순서, 시각적 비트, call to action을 분석한 뒤 무엇을 유지하고 무엇을 바꿀지 제작 전에 먼저 제안한다.

- 잘 맞는 대상: 모션 그래픽 해설 영상, SaaS와 앱 데모, 기존 촬영본으로 만드는 제품 광고
- 수정 단위: 로컬에서 작성한 텍스트, 자막, 내레이션, 클립은 따로 고칠 수 있다. AI 생성 영상 안에 구워진 텍스트는 그 영상을 바꿔야 한다
- 제약: 에이전트가 읽을 수 있는 영상 파일이 필요하고 소셜 플랫폼 공유 링크 다운로드는 내장되어 있지 않다. 정확한 카메라 움직임, 사람의 연기, 프레임 단위 일치는 보장하지 않는다

### 3.3 작업 지속 장치

| 장치 | 내용 |
|---|---|
| Projects | 목표와 규칙, 메모리, 파일을 담아 프로젝트 안의 모든 대화가 여기서 시작한다 |
| To-dos와 Auto-advance | 프로젝트마다 사람과 에이전트가 함께 쓰는 할 일 목록이 있다. Auto-advance를 켜면 팀이 다음 항목을 스스로 맡고 완료된 작업을 검토용으로 돌려준다 |
| Scheduled automations | 작업을 매시간, 매일, 매주, 매월 반복 실행한다. v1.9부터 컴퓨터가 깨어나거나 Orkas가 시작될 때 12시간 이내에 놓친 최근 실행 1회를 보충한다 |
| Connectors | Gmail, Google Calendar, Sheets, Drive, Notion, Slack, Shopify, Stripe 등. 기본값으로 보내기, 게시, 삭제 전에 사용자에게 묻는다 |
| Apps | 도구를 설명하면 데스크톱 앱 안의 로컬 앱으로 만든다. 패키지 앱의 유료 플랜은 공개 링크를 가진 웹 앱으로 게시할 수 있다 |
| Shared projects | 패키지 앱 전용. 팀원이나 VA를 초대해 각 할 일을 사람 또는 에이전트에 배정한다 |

공유 프로젝트, 클라우드 동기화, 웹 앱 게시는 패키지 앱에만 있고 오픈소스 빌드는 아직 지원하지 않는다. 음성 입력은 소스 빌드에서도 동작하지만 Settings → Models에 Orkas API Key를 설정해야 하고, 오디오가 인식을 위해 Orkas로 전송되어 키 소유자의 크레딧을 쓴다.

### 3.4 작업 라우팅

Commander는 일반 작업을 직접 처리하고 전문 작업은 세 가지 도구로 위임한다.

| 도구 | 동작 | 대화 이력 |
|---|---|---|
| `dispatch_to` | 이름 있는 에이전트를 실행하고 결과를 받아 작업을 이어 간다. 결과를 기다리거나 비동기로 실행해 완료 시 Commander에 알릴 수 있다 | 이어짐 |
| `hand_off_to` | 남은 작업을 이름 있는 에이전트에 넘기고 현재 Commander 턴을 끝낸다. 해당 에이전트가 직접 답한다. 선택적 continuation으로 Commander가 더 큰 작업을 나중에 재개할 수 있다 | 넘겨짐 |
| `run_worker` | 익명의 격리된 하위 작업을 실행하고 비공개 결과를 돌려준다 | 받지 않음, 이름 있는 에이전트의 스킬도 받지 않음 |

이름 있는 에이전트 작업과 익명 worker는 별도의 동시 실행 제어를 가진다 (`src/main/features/group_chat/bus.ts`, `src/main/util/locks.ts`).

### 3.5 컨텍스트 관리

런타임은 선택된 모델의 사용 가능한 입력 용량을 기준으로 프롬프트, 도구, 지속 런타임 상태를 포함해 컨텍스트 예산을 잡는다.

- 완료된 대화는 최근 이력 창(bounded recent-history window)만 유지한다
- 긴 진행 중 작업은 checkpoint로 이전 과정 메시지를 압축하고 최근 작업은 남긴다
- 파일 읽기, 파일 변경, 명령 실행은 구조화된 기록으로 남아 compaction 이후에도 살아남을 수 있다

관련 파일은 `context-budget.ts`, `session.ts`, `workspace-state.ts`(`src/core-agent/src/agent/` 아래)다.

### 3.6 메모리와 Library

| 구성 | 내용 |
|---|---|
| Durable notes | 사용자 선호, 프로젝트 사실, 에이전트별 재사용 지식을 별도 scope로 나눠 보관한다 |
| Library | 문서를 passage로 추출해 로컬 SQLite 벡터 인덱스에 저장한다. 임베딩 모델이 사용자 기기에서 실행된다. `library` 도구가 전역 또는 현재 프로젝트 Library에서 파일 목록, 관련 passage 검색, 원문 읽기를 제공한다 |
| chat_history | 이전 대화는 Library와 별개로 `chat_history`로 검색한다 |

Durable notes는 Library의 문서 인덱스, 저장된 대화 이력과 구분된다.

### 3.7 실행 한도와 복구

session lock과 동시 실행 한도가 병렬 작업의 범위를 묶는다. tool round 예산, 진행 checkpoint, 반복 호출 검사, 단계 인식 유휴 watchdog이 멈추거나 같은 일을 반복하는 실행을 제한한다. 이름 있는 에이전트 작업은 개별로 추적하고 취소할 수 있으며, 접수되거나 대기열에 있는 작업을 완료 결과로 취급하지 않는다 (`actor-budgets.ts`, `runner.ts`, `client.ts`).

### 3.8 활동 기반 학습

백그라운드 리뷰는 앱이 유휴 상태일 때 cooldown과 실행 한도 안에서 새 에이전트 활동을 검토한다. 리뷰는 에이전트의 자기 평가(`COMPETENCE.md`), 재사용 방법(`LEARNING_STRATEGIES.md`), 학습된 스킬을 갱신할 수 있다. 리뷰는 작업 횟수가 아니라 새 활동 유무에 따라 일어나고, 저장할 것이 없다고 결론 낼 수도 있다 (`reflection-orchestrator.ts`, `evolution/metacognition.ts`).

### 3.9 모델과 데이터 위치

- Commander와 내장 에이전트는 하나의 모델 설정을 공유한다. 내장 Orkas 모델, 사용자 provider, 로컬 endpoint 중 고를 수 있다. 외부 CLI 에이전트는 자기 모델 설정을 유지한다
- 지원 provider: Claude, OpenAI, Gemini, DeepSeek, Kimi, GLM, Qwen, MiniMax, Doubao, 로컬 OpenAI 호환 endpoint
- Ollama, LM Studio 같은 로컬 모델은 Models → Chat → Add model → Custom에서 OpenAI-compatible 또는 Anthropic-compatible을 고르고 base URL, 모델 ID, API key를 입력해 쓴다
- 사용자 provider 키는 로컬에서 암호화되고 클라우드 동기화에서 제외된다. 내장 Orkas 모델은 Orkas의 관리형 모델 서비스를 거친다

### 3.10 소스 실행

요건은 Node 22.12 이상과 macOS, Windows 10 이상, glibc 2.34 이상 Linux(x64, arm64)다. native module을 소스에서 빌드해야 하는 드문 경우에 대비해 Python 3와 C/C++ 빌드 도구가 필요하다.

```bash
git clone https://github.com/Orkas-AI/Orkas.git
cd Orkas
./run.sh           # macOS / Linux
run.cmd            # Windows
```

- 첫 실행 시 `run.sh`/`run.cmd`가 고정된 npm 의존성과 함께 Python, uv, Node, 임베딩 모델(약 95MB), OfficeCLI, FFmpeg, whisper.cpp, 다국어 음성 모델을 준비한다
- 작업 공간은 `~/.orkas/`(macOS, Linux) 또는 Windows의 가장 작은 비시스템 드라이브 `\.orkas\`에 생긴다
- native 의존성 오류는 Node.js 24 LTS를 쓰고 `npm run native:repair`로 복구하며, `npm run native:check`는 설치 없이 점검만 한다
- Alpine 같은 musl 기반 배포판은 지원하지 않는다

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README는 정량 벤치마크를 제시하지 않는다. 대신 다른 도구와의 차이를 비교표로 설명한다.

| 도구 | README의 설명 | Orkas와의 차이 |
|---|---|---|
| Claude Code | Anthropic의 에이전트형 코딩 도구 | Orkas는 Claude Code를 팀원 하나로 구동하고, 코드 밖 작업(리서치, 콘텐츠, 영상)을 맡는 모델 무관 팀과 프로젝트, 할 일, 자동화를 더한다 |
| Codex | OpenAI의 코딩 에이전트 | 코딩은 Codex에, 리뷰는 다른 에이전트에 맡기고 문서, 출시 글, 영상 같은 비코드 작업까지 다룬다 |
| Claude Cowork | Anthropic의 일상 업무 에이전트, 기본적으로 클라우드 실행 | 오픈소스 대안. 로컬 실행과 로컬 데이터가 기본이다. 대신 컴퓨터가 켜져 있어야 한다 |
| Manus | 클라우드에서 계획하고 실행하는 에이전트 | 오픈소스 대안. 같은 trade-off(컴퓨터가 켜져 있어야 함) |
| LangChain | 코드 우선 LLM 앱 프레임워크 | Orkas는 코드가 아니라 채팅으로 지시하는 데스크톱 앱이다 |
| CrewAI | 역할 기반 에이전트를 코드로 조율하는 Python 프레임워크 | 멀티에이전트 오케스트레이션을 데스크톱 앱으로 가져오고 프로젝트, 할 일, 자동화, 에이전트별 자기 개선을 내장한다 |
| OpenClaw | 메시징 연동과 멀티에이전트 라우팅을 가진 개인 에이전트 플랫폼 | Orkas는 산출물 중심 작업 공간이며 OpenClaw를 CLI 에이전트로 합류시킬 수 있다 |
| Hermes-Agent | Nous Research의 자기 개선형 단일 에이전트 | Orkas는 팀을 조율하며 Hermes-Agent를 그중 하나로 연결한다 |

README가 밝힌 적합 대상은 단일 비서보다 에이전트 팀을 원하고, 며칠에 걸쳐 이어지는 작업을 하며, 데이터와 키와 에이전트를 자기 디스크에 두려는 사용자다. 단일 범용 챗봇이나 앱에 내장할 코드 라이브러리를 원하면 맞지 않는다고 명시한다.

### 4.1 활용 사례

- 마케팅 콘텐츠: 출시 영상, 제품 페이지, 글, 뉴스레터
- 스토어 운영: 주간 매출 브리핑, 리뷰 답변, 상품 등록, 경쟁사 점검
- 리서치와 보고서: 출처를 단 보고서와 덱
- 문서 기반 질의응답: 로컬 파일에 근거하고 원문 passage를 인용
- 고객 업무: 회의 브리핑, 월간 고객 보고서
- 제품 출시: 랜딩 페이지, 테스트를 포함한 버그 수정, changelog
- 앱 제작: 견적 계산기, 예약 양식, 내부 도구
- 소규모 팀: 사람과 에이전트가 하나의 프로젝트를 공유

### 4.2 가격 정책

패키지 앱은 내장 Orkas 모델용 크레딧 500을 무료로 제공해 API 키 없이 시작할 수 있다. 유료 플랜은 월 $11.99부터이며 월간 크레딧, 클라우드 동기화, 더 많은 공유 프로젝트, 앱 게시를 더한다. 웹 앱 게시 한도는 Lite 5개, Pro 8개, Max 15개다. 자기 키를 쓰면 provider가 과금하고 Orkas는 추가 마진을 붙이지 않는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **상시 구동 필요**: Orkas는 사용자 컴퓨터에서 실행되므로 Auto-advance와 자동화는 컴퓨터가 켜져 있고 Orkas가 실행 중일 때만 동작한다. v1.9부터 놓친 최근 실행 1회를 12시간 이내에 보충한다
- **오픈소스 빌드의 기능 공백**: 공유 프로젝트, 클라우드 동기화, 웹 앱 게시는 패키지 앱에만 있다
- **계정 요건 차이**: 패키지 앱은 첫 실행에 로그인이 필요하다. 소스 빌드는 계정 계층이 없다
- **오프라인 실행 범위**: 소스 빌드는 로컬 모델 endpoint로 완전 오프라인 실행이 가능하지만, 패키지 앱은 로그인과 클라우드 모델 사용에 네트워크가 필요하다
- **내장 모델과 음성 입력의 외부 전송**: 내장 Orkas 모델과 음성 인식은 Orkas 관리형 서비스를 거친다. 클라우드 동기화와 공유 프로젝트는 선택된 데이터를 Orkas 서버에 저장한다
- **플랫폼 제약**: Linux는 설치 파일이 없고 소스 실행만 가능하며 musl 기반 배포판은 지원하지 않는다
- **참조 영상 재현의 한계**: 3.2절 참고
- **정량 평가 부재**: README에는 성능, 품질, 비용에 대한 벤치마크가 없다

## 6. 관련 연구 (Related Work)

- [[agents/garrytan-gstack]]: Claude Code 위에 역할별 스킬을 둔 가상 개발팀. Orkas는 같은 "에이전트 팀" 발상을 코딩 밖 업무와 데스크톱 앱으로 넓힌다
- [[agents/cemri-2025-why-do-multi-agent-llm-systems]]: 멀티에이전트 시스템의 실패 유형 분류. Orkas의 실행 한도, 반복 호출 검사, watchdog이 겨냥하는 문제와 연결된다
- [[agents/anthropic-2025-effective-context-engineering-for-ai]]: compaction과 구조화된 기록 같은 context engineering 기법의 배경
- [[agents/osmani-2026-loop-engineering]]: 예약 실행과 조건 기반 반복 같은 루프 설계 관점

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Commander | 사용자와 대화하며 목표를 할 일로 나누고 직접 처리하거나 전문 에이전트에 위임하는 Orkas의 조율 에이전트 |
| Auto-advance | 켜 두면 팀이 프로젝트 할 일 목록의 다음 항목을 스스로 맡아 진행하는 기능 |
| `dispatch_to` | 이름 있는 에이전트를 실행하고 결과를 받아 Commander가 작업을 이어 가는 위임 도구 |
| `hand_off_to` | 남은 작업을 이름 있는 에이전트에 넘기고 Commander 턴을 끝내는 위임 도구 |
| `run_worker` | 대화 이력 없이 격리된 익명 하위 작업을 실행하는 도구 |
| Library | 문서를 passage 단위로 로컬 SQLite 벡터 인덱스에 저장하고 검색하게 하는 문서 저장소 |
| Durable notes | 사용자 선호, 프로젝트 사실, 에이전트별 지식을 scope별로 보관하는 지속 메모 |
| `COMPETENCE.md` / `LEARNING_STRATEGIES.md` | 백그라운드 리뷰가 갱신하는 에이전트별 자기 평가와 재사용 방법 파일 |

## 8. 그림 후보 (Figure Candidates)

figure의 `raw:` 값은 README가 참조하는 저장소 내부 상대 경로다. repos 유형은 `-figures/` 디렉토리를 만들지 않는다. README 상단의 데모 영상(GitHub user-attachments)은 정지 이미지가 아니라 후보에서 제외했다. README 본문의 유일한 정지 이미지라 wiki 사본을 `wiki/assets/orkas-ai-orkas/`에 저장했다.

| id | strategy | caption | 추천 |
|---|---|---|---|
| fig01 | manual | 데스크톱 앱의 작업 대화와 산출물 화면 | ★ wiki 권장 (product UI) |
