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
tags: [awesome-list, cookbook, ai-agents, rag, mcp, voice-agents, agent-skills, multi-agent, fine-tuning, templates, streamlit, provider-agnostic, repo]
---

## 한 줄 요약 (One-line Summary)

포크해서 바로 돌릴 수 있는 **100+개 LLM 앱 템플릿 쿡북**. RAG 파이프라인·agent loop·MCP 연동을 매번 밑바닥부터 다시 짤 필요 없이, AI Agents부터 RAG·Voice·MCP·Agent Skills·fine-tuning까지 modern AI stack 15개 카테고리를 자족형(self-contained) 스타터 코드로 준다. 큐레이션한 링크 모음이 아니라 **손으로 직접 만들고 end-to-end로 테스트한 원본 코드**라는 게 다르다.

## 1. 자료 정보 (Document Information)

- **저장소**: [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps)
- **제작·관리**: Shubham Saboo ([Unwind AI](https://www.theunwindai.com) 운영자) + 커뮤니티 기여자
- **라이선스**: Apache-2.0 ("fork it, ship it, sell it" — 상업적 사용 허용, paywall·signup·telemetry 없음)
- **성격**: awesome-list라는 이름이지만 실제로는 **cookbook** — 각 항목이 링크가 아니라 full source code가 포함된 실행 가능 템플릿
- **provider-agnostic**: Claude · Gemini · OpenAI · xAI · Qwen · Llama 사이를 config 변경만으로 전환
- **튜토리얼**: featured 템플릿마다 Unwind AI에 무료 step-by-step 워크스루 연결

## 2. 주요 기여 (Key Contributions)

- **"3 commands로 실행"**: 깨진 `requirements.txt`나 "알아서 하세요"식 scaffolding 없이 clone → install → run으로 30초 내 첫 agent 구동 (예: `ai_travel_agent`을 streamlit으로 실행).
- **modern AI stack 전 영역 커버**: 단일 파일 스타터 에이전트 → 프로덕션급 multi-agent 팀 → RAG 20+ 변형 → MCP 연동 → voice·generative UI·게임 플레이 에이전트까지.
- **재사용 가능한 Agent Skills 라이브러리**: 어떤 AI agent/LLM 워크플로우에도 꽂아 쓸 수 있는 skill 파일 19종(Academic Researcher, Code Reviewer, Debugger, Deep Research 등) + self-improving skills.
- **프레임워크 크래시 코스**: Google ADK, OpenAI Agents SDK를 tools·memory·callback·multi-agent 패턴 단위로 쪼갠 심화 튜토리얼.
- **오픈소스 학습 자원**: Apache-2.0로 개인 학습부터 상용 제품 fork까지 제약 없음.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

레포는 **15개 최상위 카테고리** 폴더로 나뉘고, 그 아래 개별 템플릿이 각각 자족형 디렉토리로 들어간다.

1. **Starter AI Agents** — API 키만으로 돌아가는 단일 파일 에이전트 (Blog→Podcast, Data Analysis, Medical Imaging, Travel, xAI Finance, Web Scraping, Mixture of Agents 등 ~12종).
2. **Advanced AI Agents** — tools·memory·multi-step reasoning을 갖춘 프로덕션 스타일 (Deep Research, Home Renovation with Nano Banana Pro, VC Due Diligence, Financial Coach, Self-Evolving Agent, Trust-Gated Multi-Agent 등 ~22종).
3. **Always-on Agents** — 스케줄/이벤트로 상시 구동되며 변화하는 컨텍스트를 감시해 능동적으로 브리핑 (Hacker News Briefing Agent, ADK 기반).
4. **Multi-agent Teams** — 여러 에이전트가 협업해 cross-domain 작업 수행 (Competitor Intelligence, Legal Team, Recruitment, Real Estate, CrewAI 기반 Services Agency, AG2 Adaptive Research 등 ~13종).
5. **Voice AI Agents** — 실시간 voice API 기반 speech-in/speech-out (Audio Tour, Customer Support, Insurance Claim Live Team with Gemini Live, Voice RAG).
6. **Generative UI & Agentic Frontends** — 텍스트가 아니라 폼·카드·차트·편집 가능한 plan 같은 인터랙티브 UI를 렌더링 (Dashboard Canvas, MCP App Builder, Shadcn Component Generator 등).
7. **Autonomous Game-Playing Agents** — 3D Pygame, Chess, Tic-Tac-Toe.
8. **MCP AI Agents** — Model Context Protocol로 외부 도구·데이터 연결 (Browser, GitHub, Notion, Travel Planner, Multi-MCP Router).
9. **RAG Tutorials** — 단순 chain부터 agentic·multi-source까지 (Agentic RAG, Corrective RAG(CRAG), Hybrid Search, Deepseek Local RAG, Vision RAG, RAG with Database Routing, Knowledge Graph RAG with Citations, RAG Failure Diagnostics Clinic 등 ~20종).
10. **Awesome Agent Skills** — 19종 skill 파일 + self-improving skills.
11. **LLM Apps with Memory** — 세션 간 대화·상태를 기억하는 앱 (ArXiv Agent Memory, Stateful Chat, Shared Memory Multi-LLM 등).
12. **Chat with X** — 임의 데이터 소스를 채팅 인터페이스로 (GitHub, Gmail, PDF, ArXiv, Substack, YouTube).
13. **LLM Optimization Tools** — 토큰·컨텍스트·비용 절감 (Toonify/TOON format 30~60% 절감, Headroom Context Optimization 50~90% 절감).
14. **LLM Fine-tuning** — 오픈소스 모델 end-to-end 파인튜닝 레시피 (Gemma 3, Llama 3.2).
15. **Framework Crash Courses** — Google ADK, OpenAI Agents SDK 심화.

대부분 템플릿은 **Python + Streamlit** UI로 돌아가고, agent 프레임워크는 ADK·OpenAI SDK·CrewAI·AG2 등이 섞여 있다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- 정량 벤치마크를 담은 연구 자료가 아니라 **교육·부트스트랩용 템플릿 컬렉션**이다. GitHub star·fork·contributor 수가 사실상의 인기 지표이고, Trendshift에도 featured로 올랐다.
- 이달의 featured: Always-on Hacker News Briefing Agent(ADK), Insurance Claim Live Agent Team(Gemini Live + ADK), Home Renovation Agent(Nano Banana Pro vision), Self-Improving Agent Skills(Gemini + ADK).
- 내장 최적화 도구가 명시적 절감률 주장: Toonify 30~60%, Headroom 50~90% (본 ai-wiki에 Headroom overview 별도 존재).

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **깊이보다 폭**: 각 템플릿은 "돌아가는 스타터"에 초점 — 프로덕션 하드닝(에러 핸들링, 관측성, 보안, 테스트)은 fork 이후 사용자 몫.
- **품질 편차**: 손수 제작·테스트를 표방하지만 100+개 커뮤니티 기여 템플릿의 유지보수 수준은 항목마다 다를 수 있음. 일부 항목은 external repo 링크(↗ external)로 대체.
- **Streamlit 중심 UI**: 데모 친화적이나 실서비스 프론트엔드로는 재작성 필요.
- **버전 드리프트**: 프레임워크(ADK, OpenAI SDK 등)와 모델 API가 빠르게 바뀌어 `requirements.txt` 고정 버전이 시간이 지나면 깨질 수 있음.

## 6. 관련 연구 (Related Work)

- 본 ai-wiki에 이미 존재하는 인접 자료: RAG 계보(GraphRAG/LightRAG overview), Headroom context compression overview(이 레포의 optimization 도구 중 하나와 동일 대상), agent harness engineering overview, LLM Wiki/GBrain/AKB 계열 knowledge-base 레포들.
- Karpathy LLM Wiki 패턴과 견줘 보면, LLM Wiki는 "개인 지식 베이스 구축법"이고 이 레포는 "LLM 앱 구현 템플릿 쿡북"이다. 둘 다 학습 자원이라는 점은 같다.

## 7. 용어집 (Glossary)

- **RAG (Retrieval-Augmented Generation)**: 외부 문서를 검색해 LLM 응답 근거로 주입하는 기법.
- **MCP (Model Context Protocol)**: 에이전트가 외부 도구·데이터에 연결하는 표준 프로토콜.
- **Agent Skills**: 에이전트에 꽂아 쓸 수 있는 재사용 가능 역량 파일(프롬프트·도구·워크플로우 묶음).
- **ADK (Agent Development Kit)**: Google의 에이전트 개발 프레임워크.
- **Provider-agnostic**: 특정 LLM 벤더에 종속되지 않고 config 변경으로 모델을 갈아끼울 수 있는 설계.
- **CRAG (Corrective RAG)**: 검색 결과 품질을 평가해 부족하면 교정·재검색하는 RAG 변형.
- **TOON**: 토큰 절감을 위한 압축 포맷(Toonify 도구가 사용).
