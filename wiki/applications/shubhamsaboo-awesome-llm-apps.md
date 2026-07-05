---
title: "Awesome LLM Apps"
type: repo
year: 2026
category: applications
source: shubhamsaboo-awesome-llm-apps.md
raw_path: raw/repos/shubhamsaboo-awesome-llm-apps.md
raw_filename: "shubhamsaboo-awesome-llm-apps.md"
source_collection: external
org: "Shubhamsaboo"
repo: "awesome-llm-apps"
url: "https://github.com/Shubhamsaboo/awesome-llm-apps"
license: "Apache-2.0"
tags: [awesome-list, cookbook, ai-agents, rag, mcp, voice-agents, agent-skills, multi-agent, fine-tuning, templates, streamlit, provider-agnostic, repo]
---

## 요약 (Summary)

[Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps)는 포크해서 바로 돌릴 수 있는 100+개 LLM 앱 템플릿 쿡북이다. RAG 파이프라인, agent loop, MCP 연동을 새 프로젝트마다 밑바닥부터 다시 짜지 말자는 문제의식에서 나왔다. 그래서 링크만 모아둔 여느 awesome-list와 달리 각 항목이 full source code까지 담은 자족형 실행 템플릿이다. AI Agents, Multi-agent Teams, Voice, MCP, RAG, Agent Skills, fine-tuning 등 modern AI stack 15개 카테고리를 아우르고, provider-agnostic(Claude·Gemini·OpenAI·xAI·Qwen·Llama)하게 설계돼 config 하나만 바꾸면 모델을 갈아끼운다. 라이선스가 Apache-2.0라 학습용이든 상용 fork든 제약이 없다.

## 주요 기여 (Key Contributions)

- **손으로 만든 실행 템플릿**: 큐레이션된 링크가 아니라 end-to-end 테스트를 거친 원본 코드다. clone → install → run 세 명령이면 30초 안에 첫 agent가 뜬다.
- **AI stack 전 영역**: 단일 파일 스타터 에이전트에서 프로덕션급 multi-agent 팀, RAG 20여 변형, MCP·voice·generative UI·게임 플레이 에이전트까지 이어진다.
- **재사용 Agent Skills 19종**: Academic Researcher, Code Reviewer, Debugger, Deep Research처럼 어떤 워크플로우에든 꽂아 쓰는 skill 파일과 self-improving skills.
- **프레임워크 크래시 코스**: Google ADK와 OpenAI Agents SDK를 tools·memory·callback·multi-agent 패턴 단위로 쪼갠 심화 튜토리얼.
- **provider-agnostic + Apache-2.0**: 벤더에 묶이지 않고 paywall·signup·telemetry도 없이 fork·ship·sell 할 수 있다.

## 방법론 및 아키텍처 (Methodology and Architecture)

레포는 최상위 카테고리 폴더 15개로 나뉘고, 각 템플릿은 그 아래 자족형 디렉토리로 들어간다. 실행 스택은 대부분 Python에 Streamlit UI이고, agent 프레임워크는 ADK·OpenAI SDK·CrewAI·AG2가 뒤섞여 있다.

| 카테고리 | 성격 | 대표 템플릿 |
|---|---|---|
| Starter AI Agents | API 키만으로 도는 단일 파일 | Travel, Data Analysis, Medical Imaging, Mixture of Agents |
| Advanced AI Agents | tools·memory·multi-step reasoning | Deep Research, VC Due Diligence, Self-Evolving, Trust-Gated Team |
| Always-on Agents | 스케줄/이벤트 상시 구동 | Hacker News Briefing (ADK) |
| Multi-agent Teams | cross-domain 협업 | Legal, Recruitment, Competitor Intelligence, CrewAI Services Agency |
| Voice AI Agents | 실시간 speech-in/out | Insurance Claim Live (Gemini Live), Voice RAG |
| Generative UI | 인터랙티브 UI 렌더링 | Dashboard Canvas, MCP App Builder, Shadcn Generator |
| Game-Playing | 게임 end-to-end 플레이 | 3D Pygame, Chess, Tic-Tac-Toe |
| MCP AI Agents | MCP로 외부 도구·데이터 연결 | Browser, GitHub, Notion, Multi-MCP Router |
| RAG Tutorials | 단순 chain → agentic·multi-source | Corrective RAG(CRAG), Vision RAG, KG RAG with Citations, RAG Failure Clinic |
| Agent Skills | 꽂아 쓰는 skill 파일 19종 | Code Reviewer, Deep Research, self-improving |
| LLM Apps with Memory | 세션 간 상태 기억 | ArXiv Memory, Stateful Chat, Shared Memory Multi-LLM |
| Chat with X | 임의 소스를 채팅으로 | GitHub, Gmail, PDF, ArXiv, YouTube |
| Optimization Tools | 토큰·비용 절감 | Toonify(TOON, 30~60%), Headroom(50~90%) |
| Fine-tuning | 오픈소스 모델 파인튜닝 | Gemma 3, Llama 3.2 |
| Framework Crash Courses | 프레임워크 심화 | Google ADK, OpenAI Agents SDK |

## 결과 (Results)

정량 벤치마크를 내세우는 연구가 아니라 교육·부트스트랩용 템플릿 컬렉션이다. 그래서 인기 지표 역할은 GitHub의 star·fork·contributor 수가 대신하고, Trendshift에도 소개됐다. 이달 소개된 항목은 Always-on Hacker News Briefing Agent, Insurance Claim Live Agent Team(Gemini Live + ADK), Home Renovation Agent(Nano Banana Pro vision), Self-Improving Agent Skills다. 내장 최적화 도구는 절감률을 구체적으로 밝혀 둔다. Toonify가 30~60%, Headroom이 50~90%다.

## 한계 (Limitations)

- **폭이 깊이를 앞선다**: 각 템플릿은 돌아가는 스타터 수준까지만 다듬어져 있고, 프로덕션 하드닝(에러 핸들링·관측성·보안·테스트)은 fork 이후 사용자 몫으로 남는다.
- **품질 편차**: 100+개 커뮤니티 기여 항목이라 유지보수 수준이 고르지 않고, 일부는 external repo 링크로 대체돼 있다.
- **Streamlit 중심 UI**: 데모용으로는 좋지만 실서비스 프론트엔드로 쓰려면 다시 짜야 한다.
- **버전 드리프트**: 프레임워크와 모델 API가 워낙 빨리 바뀌어, 버전을 고정한 `requirements.txt`도 시간이 지나면 깨진다.

## 관련 페이지 (Related Pages)

- [[overviews/headroom-context-compression-overview]] — 이 레포의 optimization 도구 중 하나(Headroom)와 같은 대상을 다룬 개괄
- [[overviews/lightrag-family-graph-rag-overview]] — RAG Tutorials 섹션의 Graph RAG 계열과 이어지는 계보
- [[overviews/agent-harness-engineering-overview]] — Agent Skills·multi-agent 설계 담론의 배경

## 원문 · 소스 (Sources)

- 원문(raw): [raw/repos/shubhamsaboo-awesome-llm-apps.md](../../raw/repos/shubhamsaboo-awesome-llm-apps.md)
- 요약 source: [sources/shubhamsaboo-awesome-llm-apps.md](../../sources/shubhamsaboo-awesome-llm-apps.md)
- GitHub: [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps)
