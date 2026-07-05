---
title: "gstack: AI-Powered Software Factory"
type: repo
year: 2026
category: agents
source: garrytan-gstack.md
raw_path: raw/repos/garrytan-gstack.md
raw_filename: "garrytan-gstack.md"
source_collection: external
org: "garrytan"
repo: "gstack"
url: "https://github.com/garrytan/gstack"
license: "MIT"
tags: [claude-code, skill-pack, slash-commands, agentic-workflow, software-factory, garry-tan, yc]
---

# gstack — Claude Code로 만드는 가상 엔지니어링 팀

## 요약 (Summary)

gstack은 Y Combinator 대표 Garry Tan이 만들어 공개한 Claude Code용 오픈소스 스킬 팩이다. 슬래시 명령어로 CEO·엔지니어링 매니저·디자이너·스태프 엔지니어·QA 리드·보안 담당자·릴리즈 엔지니어 같은 역할을 각각 불러낸다. 혼자 일하는 개발자도 20인 팀의 프로세스를 그대로 밟으며 소프트웨어를 출시하도록 돕는 도구다. 핵심은 코딩 능력이 아니라 **프로세스 규율**이다 — "누가 코드를 쳤느냐가 아니라 무엇을 출시했느냐"가 이 도구가 내세우는 원칙이다. 라이선스는 MIT.

## 설계 철학 — 왜 "역할"인가 (Why Roles)

기본 Claude Code는 똑똑하지만 한 가지 모드로만 움직인다. 코드를 짜달라고 하면 곧장 짜기 시작할 뿐 "이걸 진짜 만드는 게 맞나?"를 먼저 되묻지 않는다. Garry Tan은 이 지점을 **역할의 부재**로 봤다. 실제 팀에서는 CEO가 무엇을 만들지 정하고 엔지니어링 매니저가 어떻게 만들지 설계하며, 시니어 엔지니어가 리뷰에서 버그를 잡고 QA가 화면을 돌려본다. gstack은 이 역할들을 각각 슬래시 명령어로 떼어내, 상황에 맞는 전문가를 골라 부르는 구조로 바꿔 놓는다.

## 스프린트 구조 (Sprint Workflow)

전체 사이클은 `Think → Plan → Build → Review → Test → Ship → Reflect` 순서를 따른다. 단계별 대표 명령은 다음과 같다.

| 단계 | 명령어 | 역할 |
|---|---|---|
| Think & Plan | `/office-hours` | 코딩 전 6개 질문으로 제품 가설 심문 |
| | `/plan-ceo-review` | CEO — 방향성 재검토, 10배 더 나은 제품 탐색 |
| | `/plan-eng-review` | 엔지니어링 매니저 — 아키텍처·데이터 흐름·엣지 케이스 확정 |
| | `/plan-design-review` | 시니어 디자이너 — 각 차원 0~10점 평가 |
| Build & Review | `/review` | 스태프 엔지니어 — CI는 통과했지만 프로덕션에서 터질 버그 탐색 |
| | `/investigate` | 디버거 — "조사 없이 수정 없다" |
| Test | `/qa` · `/qa-only` | QA 리드 — 실제 브라우저로 테스트·수정 / 리포트만 |
| | `/browse` · `/setup-browser-cookies` | 헤드리스 브라우저 실행 / 실제 브라우저 쿠키 주입 |
| Ship & Secure | `/ship` | 릴리즈 엔지니어 — 머지→테스트→PR 원클릭 |
| | `/cso` | 보안 책임자 — OWASP Top 10 + STRIDE 감사 |
| Reflect | `/retro` | 주간 회고, 트렌드 추적 |

**안전 장치**: `/careful`(파괴적 명령 경고), `/freeze`(수정 범위 잠금), `/guard`(둘 다 적용), `/codex`(OpenAI Codex CLI 교차 리뷰).

## 브라우저 스택 (Browser Capabilities)

gstack에서 기술적으로 가장 눈에 띄는 부분은 내장 브라우저다. anti-bot 스텔스를 갖춘 실제 headless Chromium을 띄워 AI가 웹 페이지를 직접 열고 테스트한다. 핵심 특징:

- **장기 실행 데몬**: 매번 새로 띄우지 않고 한 번 시작하면 쿠키·localStorage·로그인 상태를 유지한다. 콜드 스타트는 3~5초, 이후 호출은 100~200ms.
- **Diff-Aware 테스트**: `git diff`를 읽어 변경된 페이지만 골라 테스트한다.
- **prompt injection 방어**: ML 분류기로 주입 공격을 걸러낸다.
- headed 모드용 GStack Browser GUI, 자율 웹 작업 사이드바 에이전트, `/pair-agent` 교차 조율도 함께 제공된다.

## 실적 (Reported Results)

Garry Tan은 AI 인플레이션을 제외한 정규화 logical line count로 생산성 급증을 제시한다. 2026 페이스는 2013년 대비 약 810배, 2026년 연초누계 산출량은 2013년 한 해 전체의 240배, GitHub 기여는 2026년 1,237건 이상(2013년 772건)이다. 다만 이 수치는 저자 본인의 자기 보고 데이터이고 독립 벤치마크는 아니다.

## 설치 (Installation)

필요 환경: Claude Code, Git, Bun v1.0 이상, macOS 또는 Linux(x64/arm64). Windows는 WSL 경유.

```bash
# 글로벌 설치 (모든 프로젝트)
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack \
  && cd ~/.claude/skills/gstack && ./setup

# 프로젝트별 설치 (팀 공유)
cp -Rf ~/.claude/skills/gstack .claude/skills/gstack \
  && rm -rf .claude/skills/gstack/.git && cd .claude/skills/gstack && ./setup

# Codex CLI / Cursor
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git .agents/skills/gstack \
  && cd .agents/skills/gstack && ./setup --host codex
```

텔레메트리는 기본 비활성화이며, 켜더라도 스킬 이름·실행 시간·성공 여부·버전·OS까지만 수집한다. 코드·파일 경로·저장소 이름·프롬프트 내용은 수집하지 않는다.

## 관련 페이지 (Related Pages)

- [[overviews/gstack-ai-software-factory-overview]] — gstack을 세 한국어 자료와 함께 묶은 합성 overview
- [[applications/garrytan-gbrain]] — 같은 저자의 세션 간 지속 메모리 저장소. gstack에 `GBrain`으로 통합된다
