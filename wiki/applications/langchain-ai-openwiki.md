---
title: "langchain-ai/openwiki"
type: repo
year: 2026
category: applications
raw_path: raw/repos/langchain-ai-openwiki.md
raw_filename: "langchain-ai-openwiki.md"
source_collection: external
source: langchain-ai-openwiki.md
org: "langchain-ai"
repo: "openwiki"
url: "https://github.com/langchain-ai/openwiki"
license: "MIT"
tags: [openwiki, cli, coding-agent, documentation, repo-wiki, deepagents, langgraph, langsmith, agents-md, claude-md, langchain-ai]
---

## 요약 (Summary)

`langchain-ai/openwiki`는 코드베이스 문서를 자동으로 짓고 최신 상태로 유지하는 CLI다. README는 첫 줄부터 사람이 아니라 에이전트를 위해 만들었다고 못 박는다. `npm install -g openwiki`로 설치한 뒤 `openwiki --init`으로 provider·API 키·모델만 잡아 주면 저장소를 훑어 `openwiki/` 디렉토리에 위키를 짓는다. 여기서 멈추지 않는다. `AGENTS.md`·`CLAUDE.md`에 "맥락이 필요하면 이 위키를 참조하라"는 안내까지 자동으로 붙여, 코딩 에이전트가 그 문서를 알아서 찾아 쓰게 만든다. DeepAgents 위에서 돌기 때문에 LangSmith 트레이싱을 지원하며, 라이선스는 MIT다.

## 주요 기여 (Key Contributions)

- **에이전트를 1차 독자로 삼는다.** 사람이 읽을 문서가 아니라 코딩 에이전트가 소비할 저장소 위키를 겨냥한다. DeepWiki·AutoWiki·Karpathy LLM Wiki의 계보를 CLI와 CI로 옮겨 놓은 셈이다.
- **문서와 코드를 붙여 둔다.** `openwiki/`가 없으면 새로 만들고, 있으면 저장소 변경분만 반영해 갱신한다. GitHub Actions·GitLab CI 예시가 딸려 있어 하루 한 번 문서 업데이트 PR/MR이 자동으로 열린다.
- **지시 파일 연동이 기본이다.** `AGENTS.md`·`CLAUDE.md`에 위키 참조를 자동으로 심고, 파일이 없으면 만들어 준다. 지시 파일은 포인터, 실제 문서는 위키라는 분업을 강제하는 셈이다.
- **멀티 provider.** OpenRouter·Fireworks·Baseten·OpenAI·OpenAI-compatible·Anthropic을 기본 지원한다. GLM 5.2·Kimi K2.6·Sonnet 5가 미리 정의돼 있고, provider별 커스텀 모델 ID도 받는다. `ANTHROPIC_BASE_URL`이나 `openai-compatible` provider를 쓰면 LiteLLM 같은 게이트웨이도 붙는다.

## 방법론 및 아키텍처 (Methodology and Architecture)

동작은 생성 → 연동 → 갱신 세 축으로 나뉜다.

- **생성**: `--init`이 provider·키·모델을 설정한 뒤 저장소를 읽어 `openwiki/`에 초기 문서를 짓는다. DeepAgents 기반이라 LangSmith 키를 주면 실행이 "openwiki" 프로젝트로 트레이싱된다.
- **연동**: 위키를 만들고 나면 `AGENTS.md`·`CLAUDE.md`에 짧은 참조를 심는다. 위키 전체를 지시 파일에 밀어 넣으면 대형 저장소에서는 수백 페이지가 매 실행마다 컨텍스트로 실려 낭비다. 그래서 포인터만 두고 필요할 때 검색하게 한다.
- **갱신**: `--update`(또는 CI의 update 플래그)가 지난 실행 이후 커밋을 확인하고, git diff로 변경을 짚어 관련 부분만 위키에 반영한다.

CLI는 실행이 끝나도 열려 있어 후속 요청을 이어 보낼 수 있다. `-p`/`--print`는 최종 출력만 찍고 끝나는 일회성 모드다. 설정과 시크릿은 `~/.openwiki/.env`에 저장된다.

## 한계 (Limitations)

- **코드베이스 전용 첫 릴리스.** 다른 워크플로의 지속 맥락으로 넓히는 일은 향후 방향으로만 언급된다.
- **비용.** 저장소 전체를 훑어 문서를 짓고 매일 갱신하는 구조라 토큰 비용이 든다.
- **정확성 보증 부재.** 생성물이 얼마나 정확한지 재는 장치가 없다. 자동 PR을 사람이 리뷰한다는 전제를 깔고 있다.
- **좁은 PR 정책.** PR은 한 번에 한 변경으로 유지해야 한다. 여러 변경을 묶은 번들 PR은 분리 요청과 함께 닫힐 수 있다.

## 관련 페이지 (Related Pages)

- [[applications/sproul-2026-introducing-openwiki-an-open-source]] — 이 저장소의 LangChain 공식 출시 블로그
- [[applications/9bow-2026-openwiki-coding-agent-documentation]] — 같은 도구의 한국어 커뮤니티 소개글
- [[applications/lum1104-understand-anything]] — 코드베이스를 지식 그래프로 바꾸는 유사 계열 OSS
- [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]] — OpenWiki가 계보로 든 Karpathy LLM Wiki 개념
- [[agents/stanford-oval-storm]] — 문서 생성을 에이전트 대화로 자동화한 상위 계열
