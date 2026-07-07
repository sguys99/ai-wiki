---
title: "OpenWiki: 코딩 에이전트를 위한 코드베이스 문서를 작성하고 관리하는 CLI 도구"
type: article
year: 2026
category: applications
raw_path: raw/articles/9bow-2026-openwiki-coding-agent-documentation.md
raw_filename: "9bow-2026-openwiki-coding-agent-documentation.md"
source_collection: external
author: "9bow (박정환)"
url: "https://discuss.pytorch.kr/t/openwiki-cli/11089"
publisher: "PyTorch Korea User Group Discuss"
tags: [openwiki, cli, coding-agent, documentation, repo-wiki, langchain, deepwiki, agents-md, claude-md, langsmith, korean-summary, article]
---

# OpenWiki: 코딩 에이전트를 위한 코드베이스 문서를 작성하고 관리하는 CLI 도구

- **작성자:** 9bow (박정환) — PyTorch Korea User Group 운영자
- **작성일:** 2026-07-06 11:30
- **카테고리:** 읽을거리&정보공유
- **출처:** https://discuss.pytorch.kr/t/openwiki-cli/11089
- **원본 저장소:** https://github.com/langchain-ai/openwiki

---

## OpenWiki 소개

OpenWiki는 코드베이스의 문서를 자동으로 작성하고 최신 상태로 유지하는 CLI 도구로, "사람보다 코딩 에이전트가 읽는 것을 우선 목표로 설계되었습니다." LangChain과 LangGraph를 개발해 온 langchain-ai 조직이 공개했으며, 문서 생성부터 갱신, 에이전트 연동까지 명령 몇 개로 이어지는 구성이 특징입니다.

코딩 에이전트가 낯선 코드베이스에서 작업을 시작하면 매번 저장소 구조를 탐색하며 맥락을 다시 쌓아야 합니다. 잘 정리된 문서가 있으면 이 비용이 크게 줄지만, 사람이 손으로 쓰는 문서는 코드 변경을 따라가지 못하고 금세 낡아버립니다. OpenWiki는 이 문제를 LLM이 문서를 직접 쓰고 갱신하는 방식으로 접근합니다.

동작 방식은 단순합니다. 저장소에 위키가 없으면 `openwiki/` 디렉토리에 초기 문서를 생성하고, 이미 있으면 저장소 변경 사항을 반영해 문서를 갱신합니다. 여기에 하루 한 번 문서 업데이트 PR을 자동으로 여는 GitHub Action 예시까지 제공해, 문서가 코드를 따라가도록 만드는 순환 구조를 갖추고 있습니다.

## OpenWiki와 코딩 에이전트의 연동

OpenWiki가 다른 문서 생성 도구와 구별되는 지점은 에이전트 연동을 기본 동작으로 둔다는 점입니다. 실행하면 `AGENTS.md` 또는 `CLAUDE.md` 파일에 "컨텍스트를 검색할 때 이 위키를 참조하라"는 안내를 자동으로 추가하고, 해당 파일이 없으면 새로 만들어 줍니다. 코딩 에이전트가 저장소에 진입했을 때 OpenWiki가 만든 문서를 컨텍스트 소스로 활용하도록 이어주는 것입니다.

첫 대화형 실행에서는 추론(inference) 제공자와 API 키, 사용할 LLM을 설정합니다. OpenRouter, Fireworks, Baseten, OpenAI, Anthropic을 기본 지원하고, GLM 5.2나 Kimi K2.6, Sonnet 5 같은 모델이 미리 정의되어 있으며 제공자별로 커스텀 모델 ID도 지정할 수 있습니다. LangSmith API 키를 설정하면 OpenWiki 실행 과정을 LangSmith 추적 프로젝트로 남길 수도 있습니다. 설정과 시크릿은 로컬의 `~/.openwiki/.env`에 저장됩니다.

## OpenWiki 설치 및 사용법

npm으로 전역 설치한 뒤 초기화 명령으로 시작합니다.

```
npm install -g openwiki
openwiki --init
```

이후 사용법은 목적에 따라 나뉩니다. 인자 없이 실행하면 대화형 CLI가 열리고, 기본적으로 실행이 끝나도 세션이 유지되어 후속 요청을 이어서 보낼 수 있습니다.

```
# 대화형 CLI 시작
openwiki

# 초기 요청과 함께 시작
openwiki "Please generate documentation for this repository"

# 한 번 실행하고 종료 (비대화형)
openwiki -p "Summarize what you can do"

# 기존 문서 갱신
openwiki --update
```

문서를 자동으로 최신 상태로 유지하려면 저장소의 `.github/workflows/`에 openwiki-update.yml 예시 워크플로우를 추가합니다. 하루 한 번 문서 업데이트 PR을 자동으로 열어줍니다.

## OpenWiki의 라이선스

OpenWiki는 MIT 라이선스로 공개되어 있어 개인 및 상업적 목적으로 자유롭게 사용할 수 있습니다.

## GitHub 저장소

**Link:** github.com/langchain-ai/openwiki

OpenWiki is a CLI that writes and maintains agent documentation for your codebase.

## 더 읽어보기

- DeepWiki-Open: GitHub, GitLab 등의 저장소로부터 대화형 Wiki를 생성하는 오픈소스 DeepWiki 프로젝트
- Understand-Anything: 코드베이스를 인터랙티브 지식 그래프로 변환하는 Claude Code 플러그인
- Tutorial-Codebase-Knowledge, GitHub 저장소를 튜토리얼로 변환하는 도구 (feat. The Pocket)
- Wrinkl: AI가 프로젝트의 맥락을 파악하고, 코드 및 문서를 일관성있게 작성하도록 돕는 AI 맥락 관리 시스템

---

*Note: 이 글은 GPT 모델로 정리되어 원문의 의도와 다를 수 있습니다. 자세한 내용은 원문을 참고하세요.*
