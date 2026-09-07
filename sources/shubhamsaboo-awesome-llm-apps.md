---
title: "Awesome LLM Apps"
type: repo
year: 2026
category: applications
raw_path: raw/repos/shubhamsaboo-awesome-llm-apps.md
raw_filename: "shubhamsaboo-awesome-llm-apps.md"
source_collection: external
org: "Shubhamsaboo"
repo: "awesome-llm-apps"
url: "https://github.com/Shubhamsaboo/awesome-llm-apps"
license: "Apache-2.0"
tags: [awesome-list, cookbook, ai-agents, rag, mcp, voice-agents, agent-skills, multi-agent, generative-ui, fine-tuning, templates, provider-agnostic, repo]
---

## 한 줄 요약 (One-line Summary)

Awesome LLM Apps는 포크해서 바로 실행하는 LLM 앱 템플릿을 모은 쿡북 저장소다. README는 스스로를 "100+ AI Agent & RAG apps you can actually run"으로 소개하고, 목차의 15개 카테고리 아래 107건의 항목을 건다. 링크만 모은 awesome 목록과 달리 각 항목은 full source code를 포함한 자족형 디렉토리이며, 라이선스는 Apache-2.0다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저장소 | [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) |
| 제작과 관리 | Shubham Saboo. README는 "Created and maintained by Shubham Saboo with contributions from the amazing community members"로 적는다 |
| 라이선스 | Apache-2.0. README 본문 License 절이 "Apache-2.0. See LICENSE. Fork it, ship it, sell it."이라고 밝히고, raw frontmatter의 `license:` 값과 일치한다 |
| 성격 | 이름은 awesome 목록이지만 README가 스스로를 cookbook으로 규정한다 |
| 튜토리얼 | Unwind AI(theunwindai.com). 상단 배너, 상단 버튼, featured 절 하단 구독 링크가 모두 같은 사이트를 가리킨다 |
| 다국어 README | readme-i18n.com 경유 8개 언어 링크(독일어, 스페인어, 프랑스어, 일본어, 한국어, 포르투갈어, 러시아어, 중국어) |
| 배지 | stars, forks, contributors, license, last-commit 5종. Trendshift featured 배지(repositories/9876)와 star-history 차트도 있다 |
| 수치 확보 여부 | star 수, fork 수, contributor 수는 모두 shields.io 배지 이미지 안에 있다. README 텍스트에는 절대 수치가 없다 |

raw는 ingest 시점의 README 스냅샷 하나다. 저장소 코드는 보유하고 있지 않다.

## 2. 주요 기여 (Key Contributions)

README의 "Why this exists" 절이 이 저장소의 판매 논지를 여섯 항목으로 정리한다.

| 항목 | README가 주장하는 내용 |
|---|---|
| Hand-built, not curated | 모든 템플릿이 원본 작업이고 배포 전 end-to-end로 테스트했다 |
| Runs in 3 commands | 깨진 `requirements.txt`나 "알아서 하라"는 scaffolding이 없다 |
| Covers the modern AI stack | AI Agents, Always-on Agents, Multi-agent Teams, MCP Agents, Voice AI Agents, RAG, Agent Skills, Fine-tuning을 모두 다룬다 |
| Provider-agnostic | Claude, Gemini, GPT, Llama, Qwen, xAI와 그 밖의 모델을 config 변경만으로 교체한다 |
| Step-by-step tutorials | featured 템플릿마다 Unwind AI에 무료 walkthrough가 있다 |
| Apache-2.0 | fork, ship, sell을 허용한다. paywall, signup, telemetry가 없다 |

문제의식은 "You shouldn't have to rebuild the same RAG pipeline, agent loop, or MCP integration from scratch every time you start a new LLM project"라는 한 문장이다. 즉 새 프로젝트마다 같은 retrieval 파이프라인과 agent loop, MCP 연동을 다시 구현하는 비용을 없애는 것이 목표다.

Quick Start 절은 첫 agent를 30초 안에 실행한다고 밝히며 다음 블록을 싣는다.

```bash
git clone https://github.com/Shubhamsaboo/awesome-llm-apps.git
cd awesome-llm-apps/starter_ai_agents/ai_travel_agent
pip install -r requirements.txt
streamlit run travel_agent.py
```

"3 commands"라는 표현과 달리 블록은 네 줄이고, 이 예제는 Python 패키지 설치와 Streamlit 실행을 쓴다. README가 실행 스택을 명시하는 곳은 이 블록 하나뿐이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 목차 15개 카테고리와 항목 수

목차는 "15 categories"라고 스스로 밝히고 15개 링크를 건다. 각 카테고리 절에는 한 줄 이탤릭 부제가 붙어 선별 기준을 밝힌다. 항목 수는 raw의 불릿과 표 행을 직접 센 값이다.

| 카테고리 | README 부제가 밝히는 선별 기준 | 항목 수 |
|---|---|---|
| Starter AI Agents | API 키만으로 실행되는 단일 파일 에이전트 | 12 |
| Advanced AI Agents | tools, 메모리, multi-step reasoning을 갖춘 프로덕션 스타일 | 22 |
| Always-on Agents | 스케줄이나 이벤트로 상시 구동되며 변화하는 컨텍스트를 감시하고 무엇이 주목받아야 하는지 판단해 능동적으로 업데이트와 산출물과 행동을 전달 | 1 |
| Multi-agent Teams | 복잡한 cross-domain 작업을 위해 협업하는 다수 에이전트 | 13 |
| Voice AI Agents | 실시간 voice API 기반 speech-in, speech-out | 5 |
| Generative UI and Agentic Frontends | 텍스트가 아니라 폼, 카드, 차트, 편집 가능한 plan 같은 인터랙티브 UI 컴포넌트를 렌더링 | 7 |
| Autonomous Game-Playing Agents | reasoning과 전략과 행동으로 게임을 end-to-end 수행 | 3 |
| MCP AI Agents | Model Context Protocol로 외부 도구와 데이터에 연결 | 5 |
| RAG (Retrieval Augmented Generation) | 단순 chain부터 agentic과 multi-source까지의 retrieval 파이프라인 | 20 |
| Awesome Agent Skills | 어떤 AI 에이전트나 LLM 워크플로에도 결합할 수 있는 즉시 사용 스킬 파일 | 1 (별도 표에 19종) |
| LLM Apps with Memory | 세션을 넘어 대화와 사용자 상태를 기억하는 에이전트와 챗봇 | 6 |
| Chat with X | 임의의 데이터 소스를 채팅 인터페이스로 전환 | 6 |
| LLM Optimization Tools | 품질 손실 없이 토큰 사용량, 컨텍스트 크기, API 비용을 절감 | 2 |
| LLM Fine-tuning | 오픈소스 모델의 end-to-end fine-tuning 레시피 | 2 |
| AI Agent Framework Crash Courses | 주요 에이전트 프레임워크 심화 튜토리얼 | 2 |

합계 107건이고 링크 대상이 겹치는 항목은 없다. 이 가운데 2건은 외부 저장소를 가리키므로 실제로 이 저장소 안에 있는 항목은 105건이다. Awesome Agent Skills의 접힌 표에 담긴 skill 파일 19종을 더하면 저장소가 관리하는 디렉토리는 124개다.

"100+"라는 문구는 실측 107건과 어긋나지 않는다.

### 3.2 카테고리와 디렉토리의 관계

목차의 15개 카테고리는 폴더 구조가 아니라 열람용 분류다. 링크 경로를 모으면 최상위 코드 디렉토리는 10개다.

| 최상위 디렉토리 | 링크 수 | 대응하는 목차 카테고리 |
|---|---|---|
| `advanced_ai_agents/` | 37 | Advanced AI Agents, Multi-agent Teams, Autonomous Game-Playing Agents |
| `rag_tutorials/` | 20 | RAG |
| `advanced_llm_apps/` | 16 | LLM Apps with Memory, Chat with X, LLM Optimization Tools, LLM Fine-tuning |
| `starter_ai_agents/` | 12 | Starter AI Agents |
| `generative_ui_agents/` | 7 | Generative UI and Agentic Frontends |
| `mcp_ai_agents/` | 5 | MCP AI Agents |
| `voice_ai_agents/` | 4 | Voice AI Agents (나머지 1건은 외부 링크) |
| `awesome_agent_skills/` | 1 | Awesome Agent Skills (skill 파일 19종은 표 안에서 같은 디렉토리를 가리킨다) |
| `always_on_agents/` | 1 | Always-on Agents |
| `ai_agent_framework_crash_course/` | 2 | AI Agent Framework Crash Courses |

`advanced_ai_agents/` 아래는 다시 `single_agent_apps/`, `multi_agent_apps/`, `multi_agent_apps/agent_teams/`, `autonomous_game_playing_agent_apps/`로 나뉜다. 목차에서 따로 서 있는 Multi-agent Teams와 Game-Playing이 실제로는 이 디렉토리의 하위 묶음이다. 배너 이미지가 있는 `docs/`를 빼면 코드 디렉토리는 위 10개다.

같은 이름의 템플릿이 서로 다른 경로로 두 번 등장하기도 한다. AI Financial Coach Agent는 `advanced_ai_agents/multi_agent_apps/ai_financial_coach_agent/`와 `generative_ui_agents/ai-financial-coach-agent/`에, AI Deep Research Agent는 `advanced_ai_agents/single_agent_apps/ai_deep_research_agent/`와 `generative_ui_agents/ai-deep-research-agent/`에 각각 있다. 경로가 다르므로 별개 구현이고, 같은 과제를 UI 방식만 바꿔 다시 만든 짝으로 보인다.

### 3.3 이달의 featured 4건

README 상단에 "Featured This Month" 표가 있고, Template, What it does, Stack 세 열로 구성된다.

| 템플릿 | 하는 일 | Stack |
|---|---|---|
| Always-on Hacker News Briefing Agent | Hacker News를 스케줄에 따라 살펴 AI 에이전트와 LLM 앱 신호를 걸러 전달 가능한 일일 브리프로 만든다 | ADK + Agent Runtime |
| Insurance Claim Live Agent Team | Gemini Live와 ADK로 실시간 음성 보험 청구 접수를 처리한다 | Voice + ADK |
| Home Renovation Agent | 사진을 Nano Banana Pro로 재설계한다 | Vision + Multi-agent |
| Self-Improving Agent Skills | Gemini와 ADK로 agent skill을 자동 최적화한다 | Agent Skills + ADK |

네 건 모두 각 카테고리 절에 다시 등장한다. Stack 열에 ADK가 세 번 나오는 데서 이 시점의 관심이 Google ADK에 쏠려 있음이 드러난다.

### 3.4 Agent Skills 19종

Awesome Agent Skills 카테고리는 불릿으로 Self-Improving Agent Skills 하나만 노출하고, 나머지는 "Browse all 19 skills"라는 접힌 표에 넣는다. 표는 Skill과 Description 두 열이다.

| skill | 설명 |
|---|---|
| Academic Researcher | 문헌 리뷰, 논문 분석, 인용 관리 |
| Code Reviewer | best practice 점검을 포함한 자동 코드 리뷰 |
| Content Creator | 블로그 글, 소셜 미디어, 마케팅 카피 |
| Data Analyst | 데이터 탐색, 통계 분석, 인사이트 |
| Debugger | 체계적 버그 추적과 근본 원인 분석 |
| Decision Helper | 구조화된 의사결정 프레임워크와 트레이드오프 분석 |
| Deep Research | 다중 소스 리서치와 종합 |
| Editor | 교정, 문체, 명료성 개선 |
| Email Drafter | 업무용 이메일 작성 |
| Fact Checker | 주장 검증과 출처 확인 |
| Fullstack Developer | end-to-end 웹 앱 개발 |
| Meeting Notes | 회의 요약, 액션 아이템, 후속 조치 |
| Project Planner | 로드맵, 마일스톤, 자원 계획 |
| Python Expert | Pythonic 코드, 패키징, 성능 |
| Sprint Planner | 애자일 스프린트 계획과 백로그 정리 |
| Strategy Advisor | 비즈니스 전략과 경쟁 분석 |
| Technical Writer | 문서, API 문서, 가이드 |
| UX Designer | UI/UX 디자인 피드백과 와이어프레임 |
| Visualization Expert | 차트, 대시보드, 데이터 스토리텔링 |

19종 가운데 개발 직군 대상은 Code Reviewer, Debugger, Fullstack Developer, Python Expert 4종이고, 나머지 15종은 조사, 문서 작성, 기획, 디자인처럼 코드 밖 업무를 겨냥한다. 목록에 없는 Self-Improving Agent Skills는 Gemini와 ADK로 스킬 자체를 자동 최적화한다는 설명이 붙어 있어 성격이 다르다.

### 3.5 프레임워크 크래시 코스 두 종

이 카테고리만 불릿이 아니라 코스명 링크 아래 커리큘럼 목록을 다는 형식이다.

| 코스 | 다루는 주제 |
|---|---|
| Google ADK Crash Course | starter agent와 model-agnostic 구성(OpenAI, Claude), Pydantic 기반 structured output, 도구 4종(built-in, function, third-party, MCP tools), 메모리, callback, plugin, simple multi-agent, multi-agent 패턴 |
| OpenAI Agents SDK Crash Course | starter agent, function calling, structured output, 도구 3종(built-in, function, third-party 연동), 메모리, callback, 평가, multi-agent 패턴, agent handoff, swarm 오케스트레이션, 라우팅 로직 |

두 커리큘럼은 starter agent에서 시작해 structured output, 도구, 메모리, callback을 거쳐 멀티에이전트로 올라가는 같은 순서를 따른다. 차이는 ADK 쪽에 MCP tools와 plugin이 있고, OpenAI SDK 쪽에 평가, handoff, swarm 오케스트레이션, 라우팅 로직이 있다는 점이다.

### 3.6 외부 링크 2건

전체 107건 중 2건은 `↗ external` 표시와 함께 다른 저장소를 가리킨다.

| 항목 | 소속 카테고리 | 대상 |
|---|---|---|
| Openwork (Open Browser Automation Agent) | Advanced AI Agents | `github.com/accomplish-ai/openwork` |
| OpenSource Voice Dictation Agent (Wispr Flow clone) | Voice AI Agents | `github.com/akshayaggarwal99/jarvis-ai-assistant` |

이 2건은 "모든 템플릿이 full source code를 담은 자족형"이라는 README의 규정에서 벗어나는 예외다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 저장소는 정량 평가를 제시하는 연구 자료가 아니라 교육과 부트스트랩용 템플릿 컬렉션이다. README에 벤치마크 표나 성능 실험은 없다.

수치를 제시하는 곳은 LLM Optimization Tools 카테고리 두 항목뿐이다.

| 도구 | README가 밝힌 효과 |
|---|---|
| Toonify Token Optimization | TOON 포맷으로 LLM API 비용을 30~60% 절감 |
| Headroom Context Optimization | LLM API 비용을 50~90% 절감 |

두 수치 모두 절감 대상이 API 비용이다. 측정 조건, 데이터셋, 비교 기준은 README에 없다.

인기 지표 역할을 하는 star, fork, contributor 수는 shields.io 배지로만 표시되므로 raw 텍스트에서는 값을 읽을 수 없다. Trendshift featured 배지(repositories/9876)와 star-history 차트도 이미지다. 이 자료로 확인 가능한 사실은 배지가 있다는 것과 Trendshift에 featured로 올랐다는 것까지다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

| 한계 | 근거 |
|---|---|
| raw가 README 하나라 내부 구현 세부는 확인 불가 | 저장소 클론이 아니라 README 스냅샷만 보유한다. 각 템플릿의 코드 품질, 의존성 버전, 테스트 유무는 이 자료로 판단할 수 없다 |
| 실행 스택 정보가 Quick Start 한 곳뿐 | README가 명시하는 실행 방식은 `pip install -r requirements.txt` 뒤 `streamlit run` 한 예시다. 나머지 106건이 어떤 UI와 런타임을 쓰는지는 README에 없다 |
| 품질 보증 절차가 명시되지 않음 | "tested end-to-end before it ships"라고만 적고 리뷰 기준, 테스트 범위, 갱신 주기는 밝히지 않는다 |
| 자족형 규정의 예외 2건 | Openwork와 OpenSource Voice Dictation Agent는 외부 저장소 링크라 이 저장소가 코드를 관리하지 않는다 |
| 카테고리 밀도 불균형 | Advanced AI Agents 22건, RAG 20건과 달리 Always-on Agents와 Awesome Agent Skills는 불릿 항목이 각 1건이다. 카테고리 단위로 완결성을 기대하기 어렵다 |
| 자체 서술의 불일치 | "Runs in 3 commands"라고 적었지만 Quick Start 블록은 네 줄이다 |
| 절감률의 근거 부재 | Toonify 30~60%, Headroom 50~90%라는 수치에 측정 조건이 붙어 있지 않다 |
| 정량 평가 부재 | 템플릿의 정확도, 지연, 비용을 재는 벤치마크가 없다. 선택 근거는 카테고리 분류와 설명 문장뿐이다 |

향후 과제는 README에 명시되어 있지 않다. 갱신 방향을 짐작할 수 있는 단서는 "Featured This Month"라는 월 단위 갱신 슬롯과 구독 링크 문구("get new template drops + tutorials in your inbox") 정도다.

## 6. 관련 연구 (Related Work)

이 wiki에 이미 있는 인접 자료와의 관계는 다음과 같다.

- Headroom context 압축: 이 저장소의 LLM Optimization Tools 항목 하나가 Headroom이다. wiki에 Headroom 자체를 다룬 overview가 따로 있다. 다만 절감률의 대상이 다르다. 이 저장소는 API 비용 50~90% 절감으로 적고, Headroom overview는 토큰 60~95% 절감으로 적는다.
- Graph 기반 RAG 계열: RAG 카테고리의 Knowledge Graph RAG with Citations가 이 계보와 닿는다.
- Agent Skills: 이 저장소의 Awesome Agent Skills 카테고리는 스킬을 파일 단위로 배포하는 방식의 사례다. wiki에 Agent Skills 설계 원전과 생태계를 다룬 overview가 있다.
- MCP 서버 아키텍처: MCP AI Agents 카테고리 5건이 클라이언트 쪽 사례에 해당한다.
- 카탈로그 성격의 이웃 자료: 무료 LLM API 목록을 정리한 저장소가 같은 카테고리에 있다. 둘 다 목록 형식이지만 하나는 외부 서비스 카탈로그이고 이 저장소는 자체 코드 쿡북이다.

## 7. 용어집 (Glossary)

- **cookbook**: 이 저장소가 스스로를 부르는 이름. 링크 모음이 아니라 실행 가능한 스타터 코드 묶음을 뜻한다.
- **self-contained**: 각 템플릿 디렉토리가 full source code를 담아 단독으로 실행된다는 규정.
- **provider-agnostic**: 특정 LLM 벤더에 묶이지 않고 config 변경만으로 모델을 교체할 수 있는 설계.
- **MCP (Model Context Protocol)**: 에이전트가 외부 도구와 데이터에 연결하는 프로토콜. README가 MCP AI Agents 카테고리 부제에서 이렇게 규정한다.
- **Agent Skills**: 어떤 AI 에이전트나 LLM 워크플로에도 결합할 수 있는 즉시 사용 스킬 파일.
- **ADK**: Google의 에이전트 프레임워크. README는 약어를 풀어 쓰지 않고 crash course와 featured 4건 중 3건의 Stack 표기로만 언급한다.
- **TOON**: Toonify Token Optimization 템플릿이 쓰는 포맷 이름. README는 이름과 절감률만 밝히고 포맷 사양은 설명하지 않는다.
- **Always-on agent**: 스케줄이나 이벤트로 상시 구동되며 변화하는 컨텍스트를 감시하고 능동적으로 산출물을 전달하는 에이전트.
- **Generative UI**: 텍스트 대신 폼, 카드, 차트, 편집 가능한 plan 같은 인터랙티브 UI 컴포넌트를 렌더링하는 방식.
