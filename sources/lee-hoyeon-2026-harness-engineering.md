---
title: "Harness Engineering: AI가 잘 일하는 환경을 설계하는 기술"
type: article
year: 2026
category: agents
raw_path: raw/articles/lee-hoyeon-2026-harness-engineering.pdf
raw_filename: "lee-hoyeon-2026-harness-engineering.pdf"
source_collection: external
author: "이호연 (Hoyeon Lee)"
url: "https://github.com/team-attention/harness"
publisher: "Team Attention"
tags: [harness-engineering, claude-code, ai-agents, context-engineering, scaffolding, orchestration, verification, slide-deck, korean]
---

## 한 줄 요약 (One-line Summary)

Team Attention의 이호연(Builder)이 2026-04-07에 발표한 54장 슬라이드 deck으로, 프롬프트만으로는 부족하며 "말을 잘 하는 것"에서 "일하는 방법을 설계해주는 것"으로 옮겨가야 한다는 주장을 담았다. 진화 흐름을 Prompt Engineering, Context Engineering, Harness Engineering 세 단계로 정의하고 harness를 "AI가 혼자서도 잘 일할 수 있는 작업 환경을 만들어주는 것"으로 규정한다. LangChain, OpenAI, Anthropic, Stripe 사례를 들어 모델 교체로 5%를 개선하기보다 harness 설계로 15%를 개선하는 편이 현실적이라고 정리하고, 구조(Scaffolding), 맥락(Context), 계획(Planning), 실행(Orchestration), 검증(Verification), 개선(Compounding) 여섯 단계의 순환 구조를 제시한다. 각 단계마다 Claude Code 생태계의 도구(skill, agent, 훅, MCP, plugin)와 패턴(progressive disclosure, Ralph Loop, Generator와 Evaluator 분리)을 매핑한다.

## 1. 자료 정보 (Document Information)

- **제목**: Harness Engineering, 부제 "AI가 잘 일하는 환경을 설계하는 기술"
- **발표자**: 이호연 (Builder, Team Attention)
- **발표일**: 2026-04-07
- **자료 유형**: 슬라이드 deck 54페이지. 텍스트 레이어가 없는 이미지 기반 PDF다
- **발표자 이력**: 전 Contents Technologies Tech Lead, 전 Terminal X Tech Lead, 전 Socar Senior Data Engineer, 전 컨텐츠 크리에이터(인프런과 클래스101 수강생 1만 명 이상)
- **대상 청중**: Claude Code 사용자, AI 코딩 에이전트 운영자
- **핵심 도구 가정**: Claude Code 생태계 (CLAUDE.md, `.claude/rules/`, skills, agents, 훅, MCP, plugins)
- **참고 리포지토리** (11페이지):
  - `team-attention/harness`: 강의자료(`materials/slides`)와 기본 체크리스트(`harness-checklist.md`)
  - `team-attention/hoyeon`: 발표자 개인 harness 전체 구성 예시
  - `plugins-for-claude-natives`: Team Attention에서 자주 쓰는 플러그인 모음
- **발표 구성** (3페이지 agenda): 01 Harness Engineering이란, 02 내 Harness 시연, 03 구조(Scaffolding), 04 맥락(Context Engineering), 05 계획(Planning), 06 실행(Orchestration), 07 검증(Verification), 08 개선(Compound). 10페이지는 발표자 본인의 harness를 라이브 데모로 보여주는 자리이며 슬라이드에 내용이 남아 있지 않다

> **표기 주의**: 원자료는 네 번째 단계를 agenda에서 "실행(Orchestration)"으로, 순환 구조 도식에서 "실행(Execution)"으로 다르게 적는다. 여덟 번째 단계도 agenda는 "개선(Compound)", 도식은 "개선(Compounding)"이다. 두 표기가 자료 안에 함께 있다.

## 2. 주요 기여 (Key Contributions)

이 자료의 기여는 학술적 발견이 아니라 실무 패러다임의 정리와 Claude Code 생태계의 매핑에 있다.

1. **Harness Engineering 정의 확립**: 특정 스킬이나 에이전트 조합이 아니라 AI 에이전트의 작업 환경 자체를 설계하는 것으로 규정한다. 좁은 의미(가드레일 설정, 목적별 툴셋, 비개발 영역 워크플로)와 넓은 의미(맥락, 제한, 흐름, 검증 일체)를 구분한다.
2. **세 단계 진화 모델**: Level 1 Prompt Engineering("이렇게 말해봐", 질문을 잘 하면 답이 좋아진다), Level 2 Context Engineering("이런 배경지식을 줘봐", 배경을 알려주면 맥락을 이해한다), Level 3 Harness Engineering("환경 자체를 설계하자", 작업 환경을 만들어주면 혼자서도 잘한다).
3. **여섯 단계 순환 구조**: 구조 → 맥락 → 계획 → 실행 → 검증 → 개선 → 다시 구조. Anthropic 인용 "규율은 코드가 아니라 스캐폴딩에서 드러난다"를 근거로 든다.
4. **사례 기반 비교 데이터** (5페이지):
   - LangChain: GPT-5.2-Codex 고정, harness만 변경해 TerminalBench 52.8에서 66.5로 14%p 상승, 30위에서 Top 5
   - OpenAI: 인간 코드 0줄, 엔지니어 3~7명이 5개월, 100만 줄. 5개월을 쓴 곳은 코딩이 아니라 harness 설계였다고 정리한다
   - Anthropic: 싱글 에이전트 20분에 9달러로 실패, 3에이전트 harness 6시간에 200달러로 완전 동작. 간소화 버전은 124달러로 품질 유지
   - Stripe: 주당 1,000 PR, 완전 무인 자동 머지, 매 스텝 검증 게이트와 정밀 컨텍스트 관리
5. **사람 문서와 AI 문서의 분리 원칙**: `docs/`는 사람이 관리하는 비즈니스의 진실, `.dev/`는 AI가 남기는 작업의 흔적. 분리하지 않으면 사람이 관리를 멈춘 순간 AI도 엉뚱한 맥락으로 일한다.
6. **Progressive disclosure 원칙**: SKILL.md와 CLAUDE.md에 내용을 전부 담지 말고 `references/` 폴더로 분리한 뒤 "이런 상황에서는 이걸 참고해"라고 안내해 필요한 것만 읽게 한다.
7. **CLAUDE.md 세 계층 상속 구조**: User(`~/.claude/CLAUDE.md`, 내 습관과 스타일), Project(`my-app/CLAUDE.md`, 스택과 컨벤션), Folder(`src/auth/CLAUDE.md`, 특수 규칙). 가장 좁은 범위가 우선하며, 최대 200줄 정도를 유지하라고 권한다.
8. **세션 맥락 관리 규칙**: 사용량 20%까지 쾌적, 50%면 `/compact`, 80%면 `/clear` 또는 새 세션. 발표자 기준은 20~30%면 새로 시작이고, 같은 주제를 이어가야 하면 handoff로 맥락 파일을 저장해 새 세션에 인계한다.
9. **실행 패턴 분류**: 혼자(Single), 부하 파견(Subagent), 팀(Team Mode). 단일과 서브에이전트가 90% 사례를 커버하고 Team Mode는 토큰 비용이 약 7배다.
10. **검증 네 원칙**: 기준이 있어야 검증이 가능하다(Sprint Contract), 컨텍스트를 나누고 관점을 분리한다(Generator와 Evaluator), 모델도 나누고 역할도 나눈다(Codex, Gemini, Opus와 Sonnet), 에이전트에게 눈을 달아준다(Browser Agent, Computer Use).
11. **개선 루프**: 같은 작업을 3번 반복하면 스킬로 만들고, 같은 실수를 3번 하면 `.claude/rules/`에 규칙을 추가하거나 CLAUDE.md에 명시한다. Anthropic 인용 "Harness의 공간은 모델이 좋아져도 줄어들지 않는다. 이동할 뿐이다"로 마무리한다.
12. **자가 진단 체크리스트**: 잘 가고 있다는 신호 네 가지와 실패하고 있다는 징후 네 가지를 각각 원인 진단과 함께 제시한다.
13. **사람에게 남는 역할 정의** (52페이지): 구조를 발전시키고, 맥락을 최신으로 유지하고, AI Slop이 나오지 않도록 점검하는 세 가지다. AI가 코드를 쓰는 시대에 사람의 역할은 "잘 짜기"에서 "잘 일하는 환경을 만들기"로 바뀐다는 것이 발표의 결론이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 여섯 단계 순환 구조

```
구조(Scaffolding)  →  맥락(Context)    →  계획(Planning)
      ↑                                          ↓
개선(Compounding) ←  검증(Verification) ←  실행(Execution)
```

각 단계에 붙은 핵심 질문은 다음과 같다.

| 단계 | 원어 라벨 | 핵심 질문 |
|---|---|---|
| 구조 | Scaffolding | 뭘 깔아두는가 |
| 맥락 | Context | AI가 뭘 아는가 |
| 계획 | Planning | 뭘 할지 정하는가 |
| 실행 | Execution | 어떻게 시키는가 |
| 검증 | Verification | 어떻게 믿는가 |
| 개선 | Compounding | 어떻게 나아지는가 |

7페이지의 정의 도식은 harness라는 작업 환경을 가운데 두고 네 요소를 배치한다. 맥락(뭘 해야 하는지), 제한(뭘 하면 안 되는지), 작업 흐름(어떻게 일하는지), 검증(잘 했는지 확인)이다. 같은 페이지가 두 인용을 근거로 붙인다. OpenAI의 "사람이 방향을 잡고, 에이전트가 실행한다"(`openai.com/index/harness-engineering`)와 Anthropic의 "규율은 코드가 아니라 스캐폴딩에서 드러난다"(`anthropic.com/engineering/harness-design`)다.

8페이지는 좁은 의미의 harness를 세 가지로 나눈다.

| 좁은 의미 | 내용 | 예시 |
|---|---|---|
| 가드레일 설정 | CLAUDE.md에 DOs와 DON'Ts를 쓰고 훅으로 에이전트에 제한을 건다 | "테스트 없이 커밋 금지"를 훅이 차단 |
| 목적별 툴셋 | 스킬과 agent 조합으로 특정 작업을 효율적으로 수행한다 | `/bugfix` = 진단 → 분석 → 수정 → 검증 |
| 비개발 영역 | SEO 감사, 콘텐츠 제작, 리서치 등 개발 외 워크플로도 설계한다 | `/geo-audit` = 기술, 콘텐츠, 스키마 병렬 분석 |

같은 페이지가 붙인 Anthropic 인용은 "Harness의 모든 구성요소는 모델이 혼자서는 못 하는 것에 대한 가정을 담고 있다"다.

### 3.2 구조(Scaffolding)

13페이지는 프로젝트 구조 설계를 세 항목으로 제시한다.

1. **Monorepo로 묶기**: 소스코드, 문서, 테스트, 설정을 하나의 프로젝트에서 관리해 AI가 전체 맥락을 한눈에 파악하게 한다.
2. **역할별 폴더링**: 목적이 명확한 폴더 구조를 두면 AI가 어디에 뭘 넣어야 하는지 바로 안다.
3. **아키텍처가 퀄리티를 결정**: 코드의 아키텍처가 잘 잡혀 있으면 시간이 갈수록 AI 산출물의 퀄리티가 올라간다.

14페이지의 프로젝트 레이아웃은 다음과 같다.

```
my-project/
├── src/         # 비즈니스 로직
├── docs/        # AI의 참고 문서
├── tests/       # 검증 인프라
├── .dev/        # 개발 도구와 스크립트
├── .claude/     # AI 설정
├── out/         # 빌드 산출물
└── CLAUDE.md    # 프로젝트 지도
```

폴더링이 중요한 이유로 AI가 "테스트 작성해줘"에는 `tests/`로, "문서 업데이트"에는 `docs/`로 자동으로 찾아간다는 점을 든다. `docs/`를 AI의 참고서로 규정하고, 아키텍처 문서와 컨벤션과 스펙을 놓아두면 AI가 작업 전에 참고한다고 설명한다.

같은 페이지는 구조가 없는 프로젝트와 클린 아키텍처를 대비한다.

| 구분 | 상태 | 3개월 후 AI 산출물 품질 |
|---|---|---|
| 구조 없음 (모든 게 `src/` 하나에) | 파일 100개가 평면적으로 나열, 비즈니스 로직과 유틸이 혼재, 테스트가 소스 옆에 산재 | 30% |
| 클린 아키텍처 (레이어별 명확한 책임) | 도메인과 서비스와 인프라 분리, 의존성 방향이 일관적, 새 기능은 기존 패턴 복제 | 85% |

30%와 85%는 시간에 따른 개선폭이 아니라 3개월 시점에서 두 구조를 비교한 값이다.

15페이지는 콘텐츠와 설정을 위아래로 나눈 뒤, 콘텐츠 쪽을 다시 사람의 문서와 AI의 문서로 분리한다.

| `docs/` (사람이 관리, 비즈니스의 진실) | `.dev/` (AI가 남기는 기록, 작업의 흔적) |
|---|---|
| 비즈니스 룰과 도메인 정의 | learnings와 troubleshooting 기록 |
| 체크리스트와 온보딩 가이드 | 작업 로그와 디버깅 히스토리 |
| ADR, API 스펙, 외부 연동 규격 | 실험 결과와 스크래치패드 |

아래쪽 설정 파일 네 종이 위 문서를 참조하고 지탱한다. CLAUDE.md(프로젝트 지도 약 100줄, `docs/`와 `rules/`로 포인팅), `.claude/rules/`(코딩 규칙과 테스트 컨벤션, glob 패턴으로 조건부 로드), `.claude/skills/`(반복 작업 레시피, `/commit`과 `/review` 등), 그리고 훅과 agents와 MCP와 plugins다. 이 페이지의 결론은 `docs/`가 사람의 책임이라는 것이다.

> **자료 내부 불일치**: 14페이지 트리는 `.dev/`를 "개발 도구와 스크립트"로 적고, 15페이지는 같은 폴더를 "AI가 남기는 기록"으로 적는다. 두 설명이 자료 안에 함께 있다.

16페이지는 AI 도구 다섯 종의 배치를 정리한다.

| 도구 | 역할 |
|---|---|
| Skills | 반복 작업의 레시피화. `/commit`과 `/review` 같은 슬래시 명령 |
| 훅 | 자동 안전장치. Pre(차단), Post(검사), Stop(일지), Notification(알림) |
| Agents | 전문가 팀원. 서브에이전트 파견 또는 팀 구성 |
| MCP | 외부 시스템 연결. DB, Slack, Linear 등 연동 |
| Plugins | 위 컴포넌트를 하나의 패키지로 묶어서 배포하고 공유 |

17페이지의 경계 설정은 AI가 뭘 알고, 뭘 할 수 있고, 뭘 하면 안 되는지를 정해주는 작업이다.

| 질문 | 수단 | 파일 |
|---|---|---|
| 뭘 알려줄까 | CLAUDE.md에 프로젝트 규칙, 코딩 스타일, 금기사항 작성 | `CLAUDE.md`, `rules/` |
| 어디까지 허용할까 | Permission Mode로 자동 허용 범위 설정 (plan, auto, bypass) | `settings.json` |
| 뭘 막을까 | 훅으로 위험한 명령을 실행 전에 자동 차단 | `.claude/hooks/` |

이중 안전장치의 예시는 CLAUDE.md에 "직접 main push 금지"를 쓰고 동시에 훅으로 `git push --force`를 차단하는 조합이다.

18페이지는 구조 설계를 돕는 스킬 셋을 소개한다. `/scaffold`(harness plugin, 프로젝트 초기 구성을 자동으로 잡아주며 CLAUDE.md와 rules와 폴더 구조까지 한 번에 생성), `/check-harness`(harness plugin, 현재 프로젝트의 harness 상태를 체크리스트로 진단해 빠진 설정과 개선 포인트를 알려준다), `/skill-creator`(Anthropic 공식 plugin, 스킬 생성 도구)다.

### 3.3 맥락(Context)

23페이지는 맥락 관리의 핵심 원칙을 세 항목으로 제시한다. Progressive disclosure(필요한 것만 필요할 때 보여주기), `.claude/rules/`(상황별 세분화된 규칙, CLAUDE.md가 길어지면 분리), Scope 계층(User와 Project와 Folder 각 레벨에 맞는 정보 배치)이다. 이 페이지의 결론은 한꺼번에 다 주면 AI도 헷갈린다는 것이다.

20페이지와 21페이지는 설정 파일의 상속 구조를 보여준다. 아래로 갈수록 범위가 좁고 우선순위가 높으며, 하위 파일은 상위를 자동 상속한다.

```
~/.claude/CLAUDE.md         (USER, 나만 적용, 모든 프로젝트)
└── my-app/CLAUDE.md        (PROJECT, 팀 공유, Git 커밋)
    ├── .claude/rules/      (주제별 분리, glob으로 조건부 적용)
    │   ├── code-style.md   (*.ts, *.tsx)
    │   ├── testing.md      (*.test.*, __tests__/**)
    │   └── security.md     (**/auth/**, *.sql)
    └── src/auth/CLAUDE.md  (FOLDER, 이 폴더 작업 시에만 자동 로드)
```

오버라이드 예시는 세 가지다.

| 레벨 | 예시 규칙 | 적용 범위 |
|---|---|---|
| User | "camelCase 사용" | 모든 프로젝트에 적용 |
| Project | "snake_case 사용" | 이 프로젝트만. Project가 User를 오버라이드 |
| Folder (`auth/`) | "JWT만 사용" | auth 폴더 작업 시만. 가장 좁은 범위가 우선 |

22페이지는 각 레벨에 무엇을 담을지 정리한다. User는 내 작업 습관과 선호하는 코딩 스타일과 공통 규칙, Project는 이 프로젝트의 기술 스택과 컨벤션과 중요한 제약, Folder는 특정 모듈의 특수한 규칙이다. 같은 페이지의 팁은 "최대 200줄 정도를 유지하며 계속 업데이트하라. 너무 길어지면 AI 성능이 급격히 저하된다"다.

26페이지의 `.claude/rules/` 가이드는 작동 방식을 설명한다. `.claude/rules/` 폴더에 `.md` 파일을 놓으면 Claude Code가 자동으로 읽고, 파일명이나 파일 상단에 glob 패턴을 넣으면 해당 파일 작업 시에만 로드된다. 분리 기준은 CLAUDE.md가 길어졌을 때다.

```
# .claude/rules/ 구조
code-style.md    # 항상 로드
testing.md       # 항상 로드
react-*.md       # *.tsx 작업 시만
api-design.md    # routes/ 작업 시만
```

같은 페이지가 드는 규칙 파일 내용 예시는 다음과 같다.

| 파일 | glob | 내용 |
|---|---|---|
| `security.md` | `**/*.sql`, `**/auth/**` | `.env` 직접 수정 금지, SQL은 반드시 parameterized query |
| `testing.md` | `**/*.test.*`, `**/__tests__/**` | 커버리지 80% 이상, mock 최소화, 통합테스트 우선 |
| `code-style.md` | 항상 로드 | 함수 20줄 이내, camelCase, 주석은 영어 |

24페이지의 progressive disclosure는 내용을 전부 담지 말고 상황별 참조로 바꾸는 패턴이다. SKILL.md나 CLAUDE.md 안에 조건과 파일을 짝지어 적는다.

| 상황 | 참조 파일 |
|---|---|
| 코드 작성 시 | `references/code-style.md` |
| 테스트 시 | `references/testing-guide.md` |
| API 설계 시 | `references/api-convention.md` |
| 배포 시 | `references/deploy-checklist.md` |

핵심 아이디어는 프롬프트에 "이 상황에서는 이 문서를 읽어"라고 가이드를 주면 AI가 동적으로 필요한 문서만 읽는다는 것이다. 폴더 구조로는 `my-skill/SKILL.md`와 `my-skill/references/` 아래 네 파일을 두고, CLAUDE.md는 핵심만 30줄로 유지하면서 `docs/architecture.md`와 `docs/conventions.md`로 포인팅한다. 이 방식의 효과는 컨텍스트 절약이다.

25페이지는 세션 맥락 관리를 임계점과 명령으로 정리한다.

| 사용량 | 조치 |
|---|---|
| 약 20% | 쾌적한 상태 |
| 약 50% | `/compact` |
| 약 80% | `/clear` 또는 새 세션 |

| 명령 | 동작 | 사용 시점 |
|---|---|---|
| `/clear` | 컨텍스트 완전 초기화 | 다른 주제로 전환할 때 |
| `/compact` | 오래된 대화를 요약하고 압축 | 같은 주제를 이어갈 때 |
| `handoff` | 현재 세션의 맥락을 파일로 저장해 새 세션에서 이어받기 | 맥락 손실 없이 전환할 때 |

발표자 본인의 기준은 20~30%가 되면 새로 시작하는 것이다. 아예 다른 맥락의 작업을 하게 되면 `/clear`를 쓰고, 이어가야 하면 handoff로 맥락을 넘긴다. 이 페이지의 결론은 컨텍스트는 채우는 것만큼 비우는 것도 중요하다는 것이다.

27페이지는 주기적 점검을 다룬다. 스킬과 MCP는 생각보다 컨텍스트를 많이 차지하고 pollution이 생길 수 있으므로 안 쓰는 것은 주기적으로 정리한다. 현재 사용량은 `/context`로 확인한다. 슬라이드의 `/context` 화면은 Opus 4.6에서 컨텍스트 100만 토큰 가운데 6만 1,200 토큰(6%)을 쓰는 상태를 카테고리별로 분해해 보여준다. System prompt 6,300 토큰, System tools 7,200 토큰, Custom agents 3,600 토큰, Memory files 473 토큰, Skills 7,300 토큰, Messages 4만 1,300 토큰, Free space 90만 800 토큰(93.1%), Autocompact buffer 3만 3,000 토큰(3.3%)이며 MCP tools는 on-demand로 로드된다. CLAUDE.md가 비대해질 때는 AI에게 직접 점검을 시킨다. 슬라이드가 제시하는 프롬프트는 "CLAUDE.md, .claude/rules를 분석해서 논리적으로 문제가 없는지 + 중복되거나 대치되는 내용은 없는지 분석해줘"다.

### 3.4 계획(Planning)

29페이지의 핵심 흐름은 계획(Plan) → 실행(Execute) → 검증(Verify)이고, 미달 시 피드백이 다시 계획 단계로 돌아온다. 한 번에 완벽하게가 아니라 반복해서 수렴하는 구조라는 것이 이 도식의 요지다.

30페이지는 "해줘"의 함정을 올바른 패턴과 나란히 놓는다.

| 안티패턴 "해줘" | 같이 계획부터 |
|---|---|
| "이거 만들어줘" | "~~할 건데 같이 계획 세워보자" |
| AI가 알아서 만듦 | AI가 계획 작성 |
| 검수 후 "아닌데..." | 사람이 검토, 수정, 승인 |
| 다시 시킴, 검수, 다시 반복 | 승인된 계획대로 실행 |
| 시간만 날림 | 높은 성공률 |

이 페이지의 결론은 계획과 실행을 분리하면 검수 횟수가 줄고 결과의 예측 가능성이 올라간다는 것이다.

31페이지의 AskUserQuestion 패턴은 AI가 사람에게 역질문하게 만드는 방법이다. 질문이 중요한 이유로 사람이 자기 머릿속의 전제를 프롬프트에 다 담지 못하며, AI가 질문을 해야 빠진 맥락이 드러난다는 점을 든다. 슬라이드의 대화 예시는 다음 흐름이다. 사용자가 "나 결제 시스템을 리팩토링하려고 해. 너가 지금 이해한 게 뭔지 정리해주고, 모호한 점이 없도록 내게 계속 질문해서 명확하게 해줘"라고 요청하고, AI가 이해한 것을 "결제 모듈의 기존 구조를 개선하려는 것"으로 미러링한 뒤 세 가지를 되묻는다. 현재 PG사 연동이 단일인지 멀티인지, 구독 결제도 포함되는지, DB 스키마 변경도 허용 범위인지다. 사용자가 "멀티 PG, 구독 포함, DB 스키마는 건드리지 마"라고 답하면 AI가 계획 작성으로 넘어간다. 커스텀 Plan 스킬에 인터뷰 단계를 넣으면 AI가 자동으로 AskUserQuestion을 사용한다. 스킬 프롬프트에 넣을 문장으로 "이해한 것을 미러링하고, 모호한 점을 질문해서 명확하게 해줘"를 제시한다.

32페이지는 계획의 진화를 두 단계로 그린다. 기본 Plan Mode는 계획과 실행을 분리하지만 사람이 모든 걸 프롬프트에 담을 수 없다는 한계가 있다. 그 한계를 느끼면 인터뷰와 요구사항 도출과 플랜 파일까지 자동화하는 전용 스킬을 만든다. 커스텀 Plan 스킬 예시 `/specify`는 네 단계다.

1. 목표 확인: 사용자의 의도를 미러링
2. 인터뷰: 모호한 지점을 질문으로 끌어내기
3. 요구사항과 태스크 도출
4. 플랜 파일로 떨구기 후 `/execute`로 실행

이 전환을 슬라이드는 implicit(머릿속)에서 explicit(플랜 파일)로의 이동으로 표기한다.

33페이지는 계획 단계 스킬 세 종을 소개한다.

| 스킬 | 소속 | 역할 |
|---|---|---|
| `/specify` | harness plugin | 스펙 파일을 더 잘 얻기 위한 스킬. 인터뷰에서 요구사항 도출과 플랜 파일까지 자동화 |
| `/deep-interview` | harness plugin | 깊이 있는 인터뷰로 unknown-unknown을 줄인다. 미처 생각 못한 엣지 케이스까지 끌어낸다 |
| `/clarify` | plugins-for-claude-natives | 요구사항을 명확하게 하고 싶을 때. 모호한 지시를 구체적인 스펙으로 변환 |

이 페이지의 결론은 계획 단계에서 모호함을 줄이는 것이 실행 품질을 결정한다는 것이다.

### 3.5 실행(Orchestration)

35페이지는 실행 패턴 세 가지를 병렬로 제시한다.

| 패턴 | 구성 | 사용처 | 비용 |
|---|---|---|---|
| 혼자 (Single) | AI 하나가 결과물까지 | 단순 작업, 대부분의 일상 | 낮음 |
| 부하 파견 (Subagent) | 메인이 조사, 작업, 검증을 위임한 뒤 결과 종합 | 병렬과 전문화 | 중간 |
| 팀 협업 (Team Mode) | PM, 개발, 디자인, QA가 서로 소통 | 다관점과 복잡, 에이전트 간 소통 필요 | 토큰 약 7배 |

슬라이드는 90% 사례가 단일이나 서브에이전트로 충분하다고 못박는다.

36페이지는 상황별 오케스트레이션 패턴을 프롬프트와 동작까지 붙여 제시한다.

| 패턴 | 상황 | 프롬프트 예시 | 동작 |
|---|---|---|---|
| 순차 파이프라인 | 블로그 글을 쓰려는데 조사, 초안, 퇴고, 발행 순서가 중요하다 | "AI 에이전트 트렌드 조사해서 → 초안 작성하고 → 퇴고까지 순서대로 진행해줘" | TaskCreate로 체크박스 생성, 하나씩 직렬 수행 |
| 병렬 Subagent | 경쟁사 3곳의 랜딩 페이지를 동시에 분석하고 싶다. 서로 독립적이다 | "A사, B사, C사 랜딩 페이지를 각각 에이전트 파견해서 동시에 분석해줘. 끝나면 비교표 만들어" | Agent 3개 spawn, 병렬 분석 후 메인이 취합 |
| Team Mode | 새 기능을 설계하면서 동시에 구현하고 리뷰도 받아야 한다. 에이전트끼리 소통이 필요하다 | "Team 켜서 설계자, 구현자, 리뷰어 3명으로 팀 꾸려줘. 설계 나오면 구현자가 바로 시작해" | TeamCreate로 팀 생성, 에이전트 간 직접 소통 |

37페이지의 Ralph Loop는 완료 기준을 정하고 충족할 때까지 AI가 반복하는 구조다. 흐름은 완료 기준 합의 → AI가 작업 → 기준 충족 여부 판정이고, 미달이면 작업 단계로 되돌아간다. 슬라이드의 예시는 "랜딩 페이지 만들어줘" 요청에 완료 기준으로 모바일 반응형, Lighthouse 90점 이상, 카피 3번 이상 퇴고를 걸어둔 경우다.

| 회차 | 결과 |
|---|---|
| 1 | 페이지 완성, Lighthouse 72점 |
| 2 | 92점, 모바일 레이아웃 깨짐 |
| 3 | 레이아웃 수정, 카피 퇴고 2회만 |
| 4 | 전항목 충족, PASS |

사람이 한 일은 기준 정하기 한 번이고 나머지는 AI가 처리한다. 이 페이지의 결론은 무엇이 되면 끝인지만 정해주면 AI가 될 때까지 계속 반복한다는 것이다.

38페이지의 Auto Research는 `karpathy/autoresearch` 패턴이다. 루프는 코드 수정(`train.py` 변경) → 실행(5분간 학습) → 평가(성능 비교) → 판단(유지 또는 폐기) → 다음 실험으로 자동 반복된다. 사람은 `program.md`에 연구 방향을 작성하고, 슬라이드는 이 파일이 스킬과 같은 역할을 한다고 설명한다. AI는 `train.py`만 수정하며 아키텍처와 하이퍼파라미터를 바꾼다. 시간당 약 12개 실험을 자율 수행하며 밤새 무인 운영한다. 성능이 개선되면 유지하고 아니면 폐기한 뒤 다음 실험으로 넘어간다.

39페이지는 실행을 돕는 도구 세 종을 소개한다. `/agent-orchestrate`(harness plugin, 현재 문제에 최적화된 오케스트레이션 패턴을 자동 적용하며 단일과 병렬과 파이프라인 중에서 선택), `ralph`(Claude Code 공식 plugin, 실행 결과를 자동 검증), `autoresearch`(karpathy, 자율 실험)다. 이 페이지의 결론은 실행에서 중요한 것이 패턴 선택과 자율성 범위 설정이라는 것이다.

### 3.6 검증(Verification)

41페이지부터 44페이지까지 네 원칙을 각각 한 페이지씩 다룬다.

**원칙 1. 기준이 있어야 검증이 가능하다.** Sprint Contract는 작업 전에 무엇을 만들고 어떻게 검증할지 합의하는 것이다. 기준 없이 시키면 AI가 끝없이 하거나 대충 끝냈다고 한다. 실행 절차는 세 단계다. 완료 조건을 먼저 정하고("이 3가지가 되면 끝"을 시작 전에 합의), 조건을 측정 가능하게 쓰고("잘 되게" 대신 "테스트 통과 + 빌드 성공"), 미달이면 다시 실행한다. Ralph Loop이 기준 달성까지 반복시키므로 기준이 명확하면 자동화가 가능해진다.

**원칙 2. 컨텍스트를 나누고 관점을 분리한다.** 출처는 Anthropic의 "Harness design for long-running application development"다. 결과물을 만드는 AI(Generator)와 결과물을 평가하는 AI(Evaluator)를 분리하는 것이 핵심이며, 같은 컨텍스트에서 만들고 평가하면 안 된다고 못박는다. 슬라이드가 인용하는 세 문장은 다음과 같다.

- "자기 작업을 평가하면 quality가 mediocre해도 자신있게 칭찬한다"
- "만든 AI와 확인하는 AI를 분리하는 것이 가장 강력한 레버"
- "Evaluator를 회의적으로 튜닝하는 게, Generator를 자기비판적으로 만드는 것보다 훨씬 쉽다"

**원칙 3. 모델도 나누고 역할도 나눈다.**

| 모델 | 역할 | 검출 대상 |
|---|---|---|
| Codex | 코드 리뷰 | 로직 오류, 보안 취약점, 테스트 누락 |
| Gemini | 문서 리뷰 | 일관성, 정확성, 구조 |
| Opus / Sonnet | 성능별 분업 | Opus는 복잡한 판단과 아키텍처, Sonnet은 빠른 확인과 반복 검증 |

같은 페이지가 인용하는 "Out of the box, Claude is a poor QA agent"에 발표자는 검증 에이전트도 튜닝이 필요하며 기준을 구체적이고 회의적으로 설정해야 쓸 수 있다는 해석을 붙인다. 이 페이지의 결론은 다른 모델과 다른 역할로 교차 검증하면 한 모델의 맹점을 다른 모델이 잡는다는 것이다.

**원칙 4. 에이전트에게 눈을 달아주기.** 코드만 검증하는 게 아니라 화면도 직접 보고 확인할 수 있어야 한다는 원칙이다.

| 수단 | 구현 | 범위 |
|---|---|---|
| Browser Agent | chrome-cdp, agent-browser | 실제 Chrome 브라우저를 제어. DOM 탐색, 클릭, 스크린샷, 네비게이션으로 웹앱 UX를 직접 검증 |
| Computer Use | built-in MCP | 스크린샷과 마우스, 키보드로 모든 앱 제어. 웹이 아닌 네이티브 앱과 디자인 도구도 검증 |
| 시각 검증 루프 | generate → screenshot → evaluate | 만들고 스크린샷을 찍고 보고 판단한 뒤 수정한다. 사람이 눈으로 하는 것을 AI가 대신한다 |

검증 범위를 코드에서 화면까지 확장하면 사람이 개입할 일이 줄어든다는 것이 이 페이지의 요지다.

45페이지는 검증을 돕는 자원 두 개를 든다. `/qa`(harness plugin, Browser Agent와 Computer Use 도구를 활용해 QA를 자동화하며 화면을 직접 보고 클릭하고 검증한다)와 `verify` 레퍼런스(`team-attention/hoyeon` 소속 reference로 검증 전략과 패턴과 실제 적용 사례를 정리)다.

46페이지의 안전장치는 세 가지다.

| 안전장치 | 내용 | 수단 |
|---|---|---|
| 되돌릴 수 있는 환경 | 브랜치나 worktree 격리에서 작업하므로 실수해도 메인은 안전하다 | `git worktree add` |
| 위험한 건 사람이 확인 | 삭제, 배포, 외부 발송 같은 작업은 승인 후 실행한다 | Runtime Gate |
| Dry-run 먼저 | "이렇게 할 건데 맞나?" 미리보기 후 실행한다 | `--dry-run` |

이 페이지의 결론은 실수해도 괜찮은 구조를 만드는 것이 핵심이라는 것이다.

### 3.7 개선(Compounding)

48페이지는 관측과 개선을 좌우로 나눈다.

관측하기는 두 항목이다. 세션 분석은 프롬프트 패턴과 스킬 및 agent 호출 빈도를 분석해 어디서 시간을 쓰는지, 어디서 실패하는지를 본다. AI Slop 감지는 작업하다 보면 쌓이는 불필요한 코드와 중복 설정과 안 쓰는 규칙을 찾는 것이다.

개선하기는 세 항목이다.

| 규칙 | 내용 |
|---|---|
| 3번 반복하면 스킬로 | 같은 작업을 3번 반복하면 자동화할 타이밍이다. 스킬로 만들어서 재사용한다 |
| 3번 틀리면 Rule 또는 CLAUDE.md에 | 같은 실수가 반복되면 `.claude/rules/`에 규칙을 추가하거나 CLAUDE.md에 명시한다 |
| 스킬 개선 루프 | 만들기 → 사용 → 세션 분석 → 병목 → 개선. 스킬도 계속 다듬는다 |

전체 루프는 작업 → 관측(세션과 사용 패턴) → 패턴 발견 → 스킬 또는 Rule → 더 나은 작업으로 이어진다.

49페이지의 단순화 원칙은 세 가지다. 안 쓰는 건 치운다(필요 없어진 스킬과 MCP와 Rule은 바로 삭제하며, 쌓이면 AI slop이 된다), 모델이 좋아지면 harness를 재평가한다(예전에 필요했던 가드레일이 지금은 불필요할 수 있다), 과설계 신호를 인식한다(설정이 너무 복잡하면 뭔가 잘못된 것이며 점점 단순해져야 정상이다). 같은 페이지가 붙인 Anthropic 인용은 "Harness의 공간은 모델이 좋아져도 줄어들지 않는다. 이동할 뿐이다"다.

50페이지의 자가 진단은 신호와 징후를 각각 원인 진단과 함께 짝지운다.

| 잘 가고 있다는 신호 | 진단 |
|---|---|
| 같은 말을 두 번 하지 않는다 | 맥락 전달이 잘 되고 있다 |
| 실수가 규칙이 된다 | 개선 루프가 작동하고 있다 |
| 차단 장치가 뭔가를 막고 있다 | 사고가 구조적으로 예방되고 있다 |
| 불필요한 것이 줄어든다 | 복잡해지는 게 아니라 단순해지고 있다 |

| 실패하고 있다는 징후 | 진단 |
|---|---|
| 검수에 시간이 더 오래 걸린다 | 검증 자동화가 필요하다는 신호 |
| 시켰는데 원하는 결과가 안 나온다 | 맥락 전달 또는 계획 단계가 부족하다 |
| 스킬과 agent가 많은데 잘 안 쓴다 | context pollution이 있고 제대로 동작하지 않는다 |
| 가이드 파일이 길어지고 관리가 안 된다 | CLAUDE.md와 docs의 분리나 정리 없이 쌓였다 |

이 페이지의 결론은 좋은 harness는 점점 단순해지며 복잡해지고 있다면 뭔가 잘못된 것이라는 진단이다.

51페이지는 `session-wrap` 플러그인(plugins-for-claude-natives)을 소개한다. Claude Code 세션이 끝난 뒤 세션 내용을 분석해 인사이트를 추출하며, 반복 패턴과 실수와 자동화 기회를 찾아낸다. 산출은 세 가지다. 패턴 발견(반복 작업 패턴을 감지해 스킬 후보로 제안), 실수 추출(세션 중 실수를 정리해 Rule 후보로 제안), 문서 업데이트(CLAUDE.md와 docs의 업데이트 필요 항목 감지)다. 세션 분석에서 패턴 발견을 거쳐 스킬이나 Rule을 추가하는 흐름이 개선 루프의 핵심이라고 정리한다.

### 3.8 사람에게 남는 역할

52페이지는 발표의 마무리로 사람이 앞으로 할 일을 세 단계에 나눠 배치한다.

| 단계 | 사람의 과제 | 세부 |
|---|---|---|
| 구조(Scaffold) | 환경을 설계하고 유지하기 | 비즈니스 요구사항이 바뀔 때마다 코드베이스 구조 발전시키기, 새 도구나 서비스 도입 시 폴더링과 경계 재설계, AI가 따라올 수 있는 아키텍처 유지 |
| 맥락(Context) | AI가 아는 것을 최신으로 유지 | CLAUDE.md와 `docs/`를 코드와 함께 갱신, 새 컨벤션이 생기면 `rules/`에 추가, 오래된 규칙은 정리 |
| 개선(Compound) | AI Slop이 나오지 않도록 점검 | AI 산출물의 품질을 지속적으로 모니터링, 반복되는 실수는 규칙으로 반복 작업은 스킬로, 안 쓰는 건 치우고 쓰는 건 날카롭게 |

이 페이지의 결론은 AI가 코드를 쓰는 시대에 사람의 역할이 "잘 짜기"에서 "잘 일하는 환경을 만들기"로 바뀐다는 것이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 자료는 1차 벤치마크 결과가 아니라 외부 사례를 인용한 비교 데이터를 제시한다. 5페이지 한 장에 네 회사가 나란히 놓인다.

| 회사 | 수치 | 세부 |
|---|---|---|
| LangChain | TerminalBench 52.8에서 66.5로 14%p 상승 | 같은 GPT-5.2-Codex 모델을 고정하고 harness만 변경했다. 추가한 것은 셀프 검증 루프, 컨텍스트 자동 수집, 둠 루프 탐지다. 순위는 30위에서 Top 5로 올랐다 |
| OpenAI | 100만 줄 코드, 인간 코드 0줄 | 엔지니어 3~7명이 5개월 투입했다. 5개월을 쓴 곳은 코딩이 아니라 harness 설계였고, 5가지 교훈 중 "더 좋은 모델 써라"는 없이 전부 환경 설계였다 |
| Anthropic | 싱글 20분에 9달러로 실패, 3에이전트 6시간에 200달러로 완전 동작 | 차이는 모델이 아니라 harness다. 간소화 버전은 124달러로 품질을 유지했다 |
| Stripe | 주당 1,000 PR, 완전 무인 자동 머지 | 매 스텝 검증 게이트와 정밀 컨텍스트 관리를 두고 전문화된 소형 에이전트를 다수 운용한다. harness 없이는 불가능한 규모다 |

같은 페이지 하단이 이 네 사례를 하나의 명제로 묶는다. 모델 교체로 5%를 개선하기보다 harness 설계로 15%를 개선하는 편이 현실적이라는 것이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5.1 자료가 직접 밝히는 주의점

1. **검증 에이전트도 튜닝이 필요하다** (43페이지): "Out of the box, Claude is a poor QA agent"를 인용하면서, 기준을 구체적이고 회의적으로 설정해야 쓸 수 있다는 단서를 붙인다. 다만 튜닝 노하우는 이 수준의 일반 원칙에 머문다.
2. **과도한 제약을 경계한다** (53페이지): harness를 설계할 때 너무 옥죄지 말고 자유도를 높게 주며 안 되는 것만 제한하라고 권한다. Agent는 생각보다 예측 가능하게 잘 움직인다는 것이 근거다.
3. **본인이 이해할 수 있는 형태여야 한다** (53페이지): harness를 진단할 때 본인이 이해 가능한 형태로 사용하는 것이 중요하다고 못박는다.
4. **한꺼번에 바꾸지 않는다** (53페이지): 개선과 점검을 반복하되 한꺼번에 다 바꾸려 하지 말고 불편한 지점만 하나씩 처리하라고 권한다.

### 5.2 독자 관점에서 남는 제약

아래 항목은 자료가 명시한 한계가 아니라 자료 밖에서 본 제약이다.

1. **2차 자료 의존**: LangChain, OpenAI, Anthropic, Stripe 수치는 외부 블로그와 강연을 인용한 것으로 본 자료가 1차 측정한 값이 아니다. 재현성과 세부 조건은 원 출처에서 확인해야 한다.
2. **Claude Code 생태계 종속**: 모든 도구와 패턴(CLAUDE.md, `.claude/rules/`, skills, agents, 훅, MCP, plugins)이 Claude Code 기준이다. Cursor, Cline, Aider, GitHub Copilot 등 다른 코딩 에이전트에는 직접 대응되지 않으며 개념은 이식 가능하나 구현은 재설계가 필요하다.
3. **개인 워크플로 중심**: 발표자 본인의 harness 구성(`team-attention/hoyeon`)이 기준점이다. 팀이나 조직 단위의 harness 거버넌스(권한, 공유, 버전 관리)는 다루지 않는다.
4. **Team Mode의 실패 모드**: 토큰 비용이 약 7배라는 점은 언급되지만, Team Mode가 실패할 때의 디버깅이나 복구 패턴은 제시되지 않는다.
5. **harness 자체의 측정 부재**: 좋은 harness는 단순해진다는 주장은 정성적이다. 규칙 수, 스킬 호출 빈도, 검증 패스율 같은 정량 지표로 harness를 측정하는 프레임워크는 정의되지 않았다.
6. **모델 발전에 따른 이동**: Anthropic 인용은 harness의 공간이 이동할 뿐이라고 말하지만, 구체적으로 어디로 이동하는지의 사례 연구는 없다.
7. **비개발 영역 확장의 근거 부족**: SEO 감사, 콘텐츠 제작, 리서치도 harness 대상이라고 언급하고 `/geo-audit` 예시를 들지만 상세한 케이스 스터디는 없다.
8. **라이브 데모 구간의 공백**: 10페이지가 발표자 본인 harness의 라이브 데모 자리인데 슬라이드에는 제목만 남아 있어 실제 시연 내용은 자료로 확인할 수 없다.

### 5.3 자료가 권하는 다음 행동 (53페이지)

- 이미 잘 만들어진 도구부터 써보기: `gstack`(github.com/garrytan/gstack), `superpowers`(github.com/obra/superpowers), `oh-my-claudecode`(github.com/Yeachan-Heo/oh-my-claudecode)
- 내 현재 상태 진단하기
- 개선하고 점검하기를 반복하되 불편한 지점만 하나씩

## 6. 관련 연구 (Related Work)

자료가 명시적으로 인용하거나 언급하는 자원만 정리한다.

**공식 문헌 인용**

- OpenAI: "사람이 방향을 잡고, 에이전트가 실행한다" (`openai.com/index/harness-engineering`)
- Anthropic: "규율은 코드가 아니라 스캐폴딩에서 드러난다" (`anthropic.com/engineering/harness-design`)
- Anthropic: "Harness의 모든 구성요소는 모델이 혼자서는 못 하는 것에 대한 가정을 담고 있다"
- Anthropic, Harness design for long-running application development: Generator와 Evaluator 분리 원칙과 세 인용문의 출처
- Anthropic: "Harness의 공간은 모델이 좋아져도 줄어들지 않는다. 이동할 뿐이다"

**참고 리포지토리와 도구**

| 자원 | 성격 |
|---|---|
| `team-attention/harness` | 본 강의 자료와 `harness-checklist.md` |
| `team-attention/hoyeon` | 발표자 개인 harness 전체 구성, `verify` 레퍼런스 포함 |
| `plugins-for-claude-natives` | Team Attention에서 자주 쓰는 플러그인 모음. `/clarify`와 `session-wrap` 포함 |
| `karpathy/autoresearch` | 자율 실험 루프. `program.md`로 방향만 정하면 시간당 약 12개 실험 수행 |
| `garrytan/gstack` | Garry Tan의 도구 모음 |
| `obra/superpowers` | Claude Code 플러그인 |
| `Yeachan-Heo/oh-my-claudecode` | Claude Code 패키지 |

**단계별 스킬 목록 (TRY IT 슬라이드 4장)**

| 단계 | 스킬 | 소속 |
|---|---|---|
| 구조 (18페이지) | `/scaffold`, `/check-harness` | harness plugin |
| 구조 (18페이지) | `/skill-creator` | Anthropic 공식 plugin |
| 계획 (33페이지) | `/specify`, `/deep-interview` | harness plugin |
| 계획 (33페이지) | `/clarify` | plugins-for-claude-natives |
| 실행 (39페이지) | `/agent-orchestrate` | harness plugin |
| 실행 (39페이지) | `ralph` | Claude Code 공식 plugin |
| 실행 (39페이지) | `autoresearch` | karpathy |
| 검증 (45페이지) | `/qa` | harness plugin |
| 검증 (45페이지) | `verify` 레퍼런스 | team-attention/hoyeon |
| 개선 (51페이지) | `session-wrap` | plugins-for-claude-natives |

## 7. 용어집 (Glossary)

| 용어 | 정의 |
|---|---|
| Harness Engineering | AI 에이전트가 혼자서도 잘 일할 수 있는 작업 환경(맥락, 제한, 흐름, 검증)을 설계하는 행위. 특정 스킬이나 agent 조합이 아니라 환경 자체를 대상으로 삼는다 |
| Scaffolding (구조) | 프로젝트 폴더, 도구 배치, 경계 설정을 다루는 여섯 단계 중 첫 단계 |
| Progressive disclosure | SKILL.md와 CLAUDE.md에 모든 정보를 담지 않고 `references/` 폴더로 분리한 뒤 상황별로 참조시키는 패턴. 컨텍스트 절약이 목적이다 |
| CLAUDE.md 세 계층 | User(`~/.claude/CLAUDE.md`), Project(`my-app/CLAUDE.md`), Folder(`src/.../CLAUDE.md`)의 상속 구조. 가장 좁은 범위가 우선한다 |
| `.claude/rules/` | 주제별로 분리된 규칙 폴더. 파일명이나 파일 상단에 glob 패턴을 넣으면 해당 파일 작업 시에만 조건부 로드된다 |
| Permission Mode | `settings.json`에서 자동 허용 범위를 정하는 설정. plan, auto, bypass 세 단계다 |
| 훅 | 위험한 명령을 실행 전에 자동 차단하거나 검사하는 안전장치. Pre(차단), Post(검사), Stop(일지), Notification(알림) 네 종이다 |
| Plan Mode | Claude Code의 계획과 실행 분리 모드. 사람이 모든 걸 프롬프트에 담을 수 없다는 한계 때문에 커스텀 Plan 스킬로 확장된다 |
| AskUserQuestion | AI가 모호한 점을 사용자에게 되묻게 하는 패턴. 사람이 자기 전제를 프롬프트에 다 담지 못한다는 점에서 출발한다 |
| Single / Subagent / Team Mode | 실행 패턴 세 종. 90%는 Single과 Subagent로 충분하며 Team Mode는 토큰 비용이 약 7배다 |
| Ralph Loop | 완료 기준을 합의한 뒤 충족할 때까지 AI가 작업과 판정을 반복하는 루프. Claude Code 공식 plugin으로 제공된다 |
| Auto Research | `karpathy/autoresearch` 패턴. 사람은 `program.md`로 방향만 정하고 AI가 코드 수정, 실행, 평가, 반복을 자율 수행한다 |
| Sprint Contract | 작업 전에 무엇을 만들고 어떻게 검증할지 합의하는 것. 기준이 없으면 AI가 끝없이 하거나 대충 끝냈다고 한다 |
| Generator와 Evaluator 분리 | 결과물을 만드는 AI와 평가하는 AI의 컨텍스트와 관점을 물리적으로 분리하는 검증 원칙. Anthropic이 가장 강력한 레버라고 표현했다 |
| Browser Agent | chrome-cdp나 agent-browser로 실제 Chrome을 제어해 DOM 탐색, 클릭, 스크린샷으로 웹앱 UX를 검증하는 수단 |
| Computer Use | 스크린샷과 마우스, 키보드로 모든 앱을 제어하는 built-in MCP. 네이티브 앱과 디자인 도구 검증에 쓴다 |
| AI Slop | 작업하다 보면 쌓이는 불필요한 코드, 중복 설정, 안 쓰는 규칙. 주기적 정리 대상이다 |
| session-wrap | 세션 종료 후 내용을 분석해 스킬 후보와 Rule 후보와 문서 업데이트 항목을 추출하는 플러그인 |
| handoff | 세션 맥락이 비대해질 때 현재 맥락을 파일로 저장해 새 세션에서 이어받는 전환 수단. `/compact`와 `/clear`의 중간이다 |
| TerminalBench | 코딩 에이전트 평가용 터미널 작업 벤치마크. LangChain 사례에서 52.8에서 66.5로 오른 지표다 |
