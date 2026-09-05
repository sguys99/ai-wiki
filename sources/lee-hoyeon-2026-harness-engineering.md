---
title: "Harness Engineering — AI가 잘 일하는 환경을 설계하는 기술"
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

Team Attention의 **이호연 (Builder)** 가 2026-04-07에 발표한 54장짜리 슬라이드 deck. 핵심 주장은 "프롬프트만으로는 부족하다 — 말을 잘 하는 것에서 **일하는 방법을 설계해주는 것**으로 패러다임이 이동했다"는 것이다. 진화 흐름을 **Prompt Engineering → Context Engineering → Harness Engineering** 3단계로 정의하고, Harness를 *"AI가 혼자서도 잘 일할 수 있는 작업 환경을 만들어주는 것"* 으로 규정한다. LangChain·OpenAI·Anthropic·Stripe 사례를 들어 "모델 교체로 5% 개선하기보다 하네스 설계로 15% 개선하는 것이 현실적"이라고 단언한다. Harness의 6개 축 — **구조(Scaffolding) → 맥락(Context) → 계획(Planning) → 실행(Orchestration) → 검증(Verification) → 개선(Compounding)** — 의 순환 구조를 제시하고, 각 단계마다 Claude Code 생태계의 구체적 도구(skill, agent, hook, MCP, plugin)와 패턴(progressive disclosure, Ralph Loop, Generator/Evaluator 분리 등)을 매핑한다.

## 1. 자료 정보 (Document Information)

- **제목**: Harness Engineering — AI가 잘 일하는 환경을 설계하는 기술
- **발표자**: 이호연 (Builder, Team Attention)
- **발표일**: 2026-04-07
- **자료 유형**: 슬라이드 deck (54페이지, 이미지 기반 PDF)
- **참고 리포지토리**:
  - `team-attention/harness` — 강의자료 + `materials/slides`, `harness-checklist.md` 기본 체크리스트
  - `team-attention/hoyeon` — 발표자 개인 Harness 전체 구성 예시
  - `plugins-for-claude-natives` — Team Attention에서 자주 쓰는 플러그인 모음
- **발표자 이력**: 前 Contents Technologies(Tech Lead), 前 Terminal X(Tech Lead), 前 Socar(Senior Data Engineer), 前 컨텐츠 크리에이터(인프런/클래스101 10K+ 수강생)
- **대상 청중**: Claude Code 사용자, AI 코딩 에이전트 운영자
- **핵심 도구 가정**: Claude Code 생태계 (CLAUDE.md, .claude/rules/, skills, agents, hooks, MCP, plugins)

## 2. 주요 기여 (Key Contributions)

이 자료의 기여는 학술적 발견이 아닌 **실무 패러다임의 정리**와 **Claude Code 생태계의 매핑**에 있다.

1. **Harness Engineering 정의 확립**: "AI 에이전트의 **작업 환경 자체를 설계**하는 것" — 가드레일 + 목적별 툴셋 + 비개발 워크플로우까지 포괄. 좁은 의미(가드레일·툴셋)와 넓은 의미(맥락·제한·흐름·검증 일체)를 구분.
2. **3단계 진화 모델**: Prompt(말을 잘 하기) → Context(배경지식 제공) → Harness(환경 설계). 각 단계는 누적되며 대체되지 않는다.
3. **6개 축 순환 구조**: 구조(Scaffolding) → 맥락(Context) → 계획(Planning) → 실행(Execution) → 검증(Verification) → 개선(Compounding) → 다시 구조로. *Anthropic 인용*: "규율은 코드가 아니라 스캐폴딩에서 드러난다."
4. **사례 기반 비교 데이터**:
   - **LangChain**: GPT-5.2-Codex 고정, 하네스만 변경 → TerminalBench 52.8 → 66.5 (+14%p, 30위 → Top 5)
   - **OpenAI**: 인간 코드 0줄, 엔지니어 3~7명 5개월, 100만 줄 — "5개월을 쓴 곳은 코딩이 아니라 하네스 설계"
   - **Anthropic**: 싱글 에이전트 20분/$9 → 실패 vs 3에이전트 하네스 6h/$200 → 완전 동작 (간소화 $124로 품질 유지) → "차이는 모델이 아니라 하네스"
   - **Stripe**: 1,000 PR/주, 완전 무인 자동 머지, 매 스텝 검증 게이트 + 정밀 컨텍스트 관리
5. **사람·AI 문서 분리 원칙**: `docs/` = 사람이 관리하는 비즈니스의 진실 vs `.dev/` = AI가 남기는 작업 흔적. 분리하지 않으면 사람이 관리를 멈춘 순간 AI도 엉뚱한 맥락으로 일한다.
6. **Progressive Disclosure 원칙**: SKILL.md/CLAUDE.md에 다 때려넣지 말고 `references/` 폴더로 분리 후 *"이 상황에서는 이걸 참고해"* 라고 안내 — 컨텍스트 절약.
7. **CLAUDE.md 3-tier 상속 구조**: User(`~/.claude/CLAUDE.md`, 내 습관) → Project(`my-app/CLAUDE.md`, 스택·컨벤션) → Folder(`src/auth/CLAUDE.md`, 특수 규칙). 하위가 상위를 오버라이드, 최대 ~200줄 권장.
8. **세션 맥락 관리 규칙**: 20% 쾌적, 50%면 `/compact`, 80%면 `/clear` 또는 새 세션. 발표자 기준은 **20~30%면 새로 시작**, 같은 주제 이어가야 하면 **handoff**로 맥락 파일 저장 후 새 세션 인계.
9. **실행 패턴 분류**: 혼자(Single) vs 부하 파견(Subagent) vs 팀(Team Mode). 단일/서브에이전트가 90% 사례 커버, Team Mode는 ~7× 토큰 비용.
10. **검증 4원칙**: (1) 기준이 있어야 검증 가능(Sprint Contract), (2) Generator/Evaluator 컨텍스트·관점 분리, (3) 모델도 역할도 분리(Codex 코드 리뷰, Gemini 문서 리뷰, Opus 복잡 판단/Sonnet 빠른 확인), (4) Browser Agent·Computer Use로 에이전트에게 "눈"을 달기.
11. **개선 루프 (Compounding)**: 3번 반복 → Skill로, 3번 틀리면 → Rule 또는 CLAUDE.md에 명시. *Anthropic 인용*: "Harness의 공간은 모델이 좋아져도 줄어들지 않는다. 이동할 뿐이다."
12. **자가 진단 체크리스트**: 좋은 신호(같은 말 두 번 안 함 / 실수가 규칙이 됨 / 차단 장치가 막아줌 / 불필요한 게 줄어듦) vs 실패 신호(검수 시간 증가 / 결과 미달 / Skill 많은데 안 쓰임 / 가이드 파일 비대화).

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 Harness Engineering의 6개 축 순환 구조

```
구조(Scaffolding)  →  맥락(Context)    →  계획(Planning)
      ↑                                          ↓
개선(Compounding) ←  검증(Verification) ←  실행(Execution)
```

각 축이 무엇을 다루는지의 핵심 질문:
- **구조**: 뭘 깔아두는가 (폴더, 도구, 경계)
- **맥락**: AI가 뭘 아는가 (CLAUDE.md, 규칙, 점진적 노출)
- **계획**: 뭘 할지 정하는가 (Plan → Spec → 승인)
- **실행**: 어떻게 시키는가 (혼자/서브에이전트/팀)
- **검증**: 어떻게 믿는가 (Sprint Contract, Generator-Evaluator 분리)
- **개선**: 어떻게 나아지는가 (관측 → 패턴 발견 → Skill/Rule 추가)

### 3.2 구조(Scaffolding) — 프로젝트 레이아웃

```
my-project/
├── src/         # 비즈니스 로직
├── docs/        # AI의 참고 문서 (사람이 관리)
├── tests/       # 검증 인프라
├── .dev/        # AI가 남기는 기록 (learnings, troubleshooting, 로그)
├── .claude/     # AI 설정
├── out/         # 빌드 산출물
└── CLAUDE.md    # 프로젝트 지도
```

- **Monorepo로 묶기**: 소스코드 + 문서 + 테스트 + 설정을 하나의 프로젝트에 → AI가 전체 맥락을 한눈에.
- **역할별 폴더링**: AI가 "테스트 작성해줘" → `tests/`, "문서 업데이트" → `docs/`로 자동 이동.
- **아키텍처가 퀄리티 결정**: 클린 아키텍처 → 시간 갈수록 AI 산출물 품질 ↑ (3개월 후 30% → 85%). 구조 없는 평면 `src/` → 시간 갈수록 ↓.
- **AI 도구 4종 + 1종 배치**: Skills(반복 작업 레시피화, /commit·/review), Agents(전문가 팀원), Hooks(자동 안전장치: Pre/Post/Stop/Notification), MCP(외부 시스템 연결: DB·Slack·Linear), Plugins(위 컴포넌트 패키지화).
- **경계 설정 3종**: 뭘 알려줄까(CLAUDE.md, rules/), 어디까지 허용(Permission Mode: plan/auto/bypass), 뭘 막을까(Hooks). 예: `git push --force` 차단 = CLAUDE.md 명시 + Hook 이중 안전장치.

### 3.3 맥락(Context) — 점진적 노출

**CLAUDE.md 3-tier 상속**:
```
~/.claude/CLAUDE.md         (USER, 내 습관·스타일)
└── my-app/CLAUDE.md        (PROJECT, 스택·컨벤션, 팀 공유·Git 커밋)
    └── src/auth/CLAUDE.md  (FOLDER, 특수 규칙, 이 폴더 작업 시만 자동 로드)
```
하위가 상위 오버라이드. 예: User="camelCase 사용" → Project="snake_case 사용" → Project가 이김.

**`.claude/rules/` 가이드** (CLAUDE.md가 200줄 넘어가면 분리):
```
.claude/rules/
├── code-style.md      # 항상 로드
├── testing.md         # 항상 로드
├── react-*.md         # glob: *.tsx 작업 시
└── api-design.md      # glob: routes/ 작업 시
```
- `security.md` (glob: `**/*.sql, **/auth/**`): SQL parameterized query 강제
- `testing.md` (glob: `**/*.test.*`): 커버리지 80%+, mock 최소화

**Progressive Disclosure**: SKILL/CLAUDE.md에 다 넣지 말고 `references/` 폴더로 분리하고 *"이 상황에서는 이걸 참고해"* 라고 안내:
```
my-skill/
├── SKILL.md
└── references/
    ├── code-style.md
    ├── testing-guide.md
    ├── api-convention.md
    └── deploy-checklist.md
```

**세션 맥락 관리** (`/context`로 사용량 확인):
- ~20% 쾌적
- ~50% → `/compact` (요약·압축, 같은 주제 이어갈 때)
- ~80% → `/clear` (완전 초기화, 다른 주제로 전환) 또는 새 세션
- 발표자 기준: 20~30%면 새로 시작, 이어가야 하면 **handoff**로 맥락 파일 저장

**주기적 점검**: Skill·MCP는 context를 먹고 pollution을 만든다. 안 쓰는 건 정리. *"CLAUDE.md, .claude/rules를 분석해서 논리적으로 문제가 없는지 + 중복·대치되는 내용은 없는지 분석해줘"* 를 AI에게 직접 시킨다.

### 3.4 계획(Planning)

**핵심 흐름**: 계획 → 실행 → 검증 → (미달 시) 다시 계획. 한 번에 완벽보다 반복 수렴.

**안티패턴 "해줘"**:
"이거 만들어줘" → AI 알아서 → 검수 "아닌데..." → 다시 → 검수 → 다시 → 시간만 날림.

**올바른 패턴**:
"~~할 건데 같이 계획 세워보자" → AI가 계획 작성 → 사람 검토·수정·승인 → 승인된 계획대로 실행 → 높은 성공률.

**AskUserQuestion 패턴**: 프롬프트에 *"이해한 것을 미러링하고, 모호한 점을 질문해서 명확하게 해줘"* 를 명시. AI가 PG 단일/멀티, 구독 결제 포함 여부, DB 스키마 변경 허용 등을 역질문한다.

**커스텀 Plan 스킬 진화**: 기본 Plan Mode 한계 → /specify 같은 커스텀 스킬로 [목표 확인 → 인터뷰 → 요구사항+태스크 도출 → 플랜 파일로 저장 → /execute로 실행] 4단계 자동화. implicit(머릿속) → explicit(플랜 파일).

**관련 스킬**: `/specify`, `/deep-interview`, `/clarify`.

### 3.5 실행(Orchestration) — 3가지 패턴

| 패턴 | 사용처 | 비용 |
|---|---|---|
| **혼자 (Single)** | 단순 작업, 대부분의 일상 | 낮음 |
| **부하 파견 (Subagent)** | 병렬/전문화, 위임 → 종합 | 중간 |
| **팀 (Team Mode)** | 다관점·복잡, 에이전트 간 소통 필요 | ~7× 토큰 |

90% 케이스는 단일/서브에이전트로 충분.

**상황별 오케스트레이션 예시**:
- 순차 파이프라인: "AI 에이전트 트렌드 조사해서 → 초안 작성 → 퇴고 순서대로 진행" → TaskCreate로 체크박스 생성
- 병렬 Subagent: "A사·B사·C사 랜딩 페이지 각각 에이전트 파견해서 동시 분석. 비교표 만들어" → Agent 3개 spawn → 메인이 취합
- Team Mode: "설계자·구현자·리뷰어 3명으로 팀 꾸려. 설계 나오면 구현자가 바로 시작해" → TeamCreate로 팀 생성, 에이전트 간 직접 소통

**Ralph Loop**: 완료 기준 합의 → AI 작업 → 기준 충족? (NO → 작업으로 회귀). 사람은 기준만 정하면 AI가 될 때까지 돈다. 예: "모바일 반응형 + Lighthouse 90점 이상 + 카피 3번 이상 퇴고" → 4회차에 PASS.

**Auto Research (karpathy/autoresearch)**: 사람이 `program.md`에 연구 방향만 작성 → AI가 `train.py`만 수정 → 5분 학습 → 평가 → 유지/폐기 → 다음 실험 → 시간당 ~12개 실험 자율 수행, 밤새 무인 운영.

### 3.6 검증(Verification) — 4원칙

1. **기준이 있어야 검증 가능** — Sprint Contract: 작업 전에 "뭘 만들고 어떻게 검증할지" 합의. 측정 가능하게: "잘 되게" 말고 "테스트 통과 + 빌드 성공".
2. **컨텍스트·관점 분리 (Anthropic)**: Generator(결과를 만드는 AI)와 Evaluator(평가하는 AI)를 물리적으로 분리. *"자기 작업을 평가하면 quality가 mediocre해도 자신있게 칭찬한다."* / *"Evaluator를 회의적으로 튜닝하는 게, Generator를 자기비판적으로 만드는 것보다 훨씬 쉽다."*
3. **모델도 역할도 분리** — Codex(코드 리뷰: 로직 오류·보안·테스트 누락), Gemini(문서 리뷰: 일관성·정확성·구조), Opus(복잡 판단·아키텍처) / Sonnet(빠른 확인·반복 검증). *Anthropic*: "Out of the box, Claude is a poor QA agent" — 검증 에이전트도 튜닝 필요.
4. **에이전트에게 눈 달아주기**: Browser Agent (chrome-cdp / agent-browser: 실제 Chrome 제어, DOM·클릭·스크린샷·UX 검증), Computer Use (built-in MCP: 스크린샷+마우스·키보드로 네이티브 앱 제어), 시각 검증 루프 (generate → screenshot → evaluate).

**안전장치 3종**:
- 되돌릴 수 있는 환경: 브랜치/Worktree 격리 (`git worktree add`)
- 위험한 건 사람이 확인: Runtime Gate (삭제·배포·외부 발송은 승인)
- Dry-run 먼저: `--dry-run` 미리보기 후 실행

### 3.7 개선(Compounding) — 관측 → 개선 → 단순화

**관측**:
- 세션 분석: 프롬프트 패턴 + Skill/Agent 호출 빈도. 어디서 시간 쓰는지, 어디서 실패하는지.
- AI Slop 감지: 작업하다 보면 불필요한 코드·중복 설정·안 쓰는 규칙이 쌓인다.

**개선 규칙**:
- 같은 작업 **3번 반복** → Skill로 만들어 재사용
- 같은 실수 **3번 반복** → `.claude/rules/`에 규칙 추가 또는 CLAUDE.md에 명시
- Skill 개선 루프: 만들기 → 사용 → 세션 분석 → 병목 → 개선 (스킬도 계속 다듬는다)

**단순화 원칙**:
- 안 쓰는 건 치운다 (Skill·MCP·Rule 쌓이면 AI Slop)
- 모델이 좋아지면 Harness 재평가 (옛 가드레일이 지금은 불필요할 수 있음)
- 과설계 신호 인식: 설정이 너무 복잡하면 뭔가 잘못된 것

**자가 진단 — 잘 가고 있다는 신호 (+) vs 실패 징후 (−)**:

| 잘 가고 있는 신호 | 실패하고 있는 징후 |
|---|---|
| 같은 말 두 번 안 함 (맥락 전달 OK) | 검수에 시간이 더 걸린다 |
| 실수가 규칙이 됨 (개선 루프 작동) | 시켰는데 원하는 결과 안 나옴 |
| 차단 장치가 뭔가 막고 있음 | 스킬·에이전트 많은데 잘 안 쓰임 |
| 불필요한 것이 줄어듦 (단순화) | 가이드 파일 길어지고 관리 안 됨 |

*"좋은 Harness는 점점 단순해진다. 복잡해지고 있다면 뭔가 잘못된 것."*

**session-wrap 플러그인** (`plugins-for-claude-natives`): Claude Code 세션 종료 후 분석 → 패턴 발견(Skill 후보) + 실수 추출(Rule 후보) + 문서 업데이트 필요 항목 감지.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 자료는 1차 벤치마크 결과보다 **사례 기반 데이터**를 강조한다.

| 회사 | 수치 | 비고 |
|---|---|---|
| **LangChain** | TerminalBench 52.8 → 66.5 (+14%p) | 같은 GPT-5.2-Codex 모델, 하네스(셀프 검증 루프 + 컨텍스트 자동 수집 + 둠 루프 탐지)만 변경. 30위 → Top 5. |
| **OpenAI** | 100만 줄 코드, 인간 0줄 | 엔지니어 3~7명, 5개월. "5개월을 쓴 곳은 코딩이 아니라 하네스 설계." 교훈 중 "더 좋은 모델 써라"는 없음 — 전부 환경 설계. |
| **Anthropic** | 싱글 20분/$9(실패) vs 3에이전트 6h/$200(성공) | 차이는 모델이 아니라 하네스. 간소화 $124로 품질 유지 가능. |
| **Stripe** | 1,000 PR/주, 완전 무인 자동 머지 | 매 스텝 검증 게이트 + 정밀 컨텍스트 관리. 전문화된 소형 에이전트 다수. 하네스 없이는 불가능한 규모. |

**핵심 메시지**: *"모델 교체로 5% 개선하는 것보다, 하네스 설계로 15% 개선하는 것이 현실적이다."*

## 5. 한계와 향후 과제 (Limitations and Future Work)

자료가 명시적으로 다루는 한계와 미해결 영역:

1. **2차 자료 의존**: LangChain·OpenAI·Anthropic·Stripe 수치는 외부 블로그·강연 인용으로, 본 자료가 1차 측정한 것이 아니다. 재현성·세부 조건은 원 출처 확인 필요.
2. **Claude Code 생태계 종속**: 모든 도구·패턴(CLAUDE.md, .claude/rules/, skills, agents, hooks, MCP, plugins)이 Claude Code 기준. Cursor·Cline·Aider·GitHub Copilot 등 다른 코딩 에이전트에서는 직접 대응 안 됨 — 개념은 이식 가능하나 구현은 재설계 필요.
3. **개인 워크플로우 중심**: 발표자 본인의 Harness 구성(`team-attention/hoyeon`)이 baseline. 팀·조직 단위 Harness 거버넌스(권한, 공유, 버전 관리)는 다루지 않음.
4. **Team Mode 비용·실패 모드**: ~7× 토큰 비용은 언급되나, Team Mode가 실패하는 경우의 디버깅·복구 패턴은 미상세.
5. **Verification 자동화의 한계**: *"Out of the box, Claude is a poor QA agent"* — 검증 에이전트 튜닝 노하우는 "기준을 구체적으로, 회의적으로" 수준의 일반 원칙만 제공.
6. **Harness 자체의 측정 부재**: 좋은 Harness는 단순해진다는 주장은 정성적. 정량 지표(예: rule 수, skill 호출 빈도, 검증 패스율)로 측정하는 프레임워크는 미정의.
7. **모델 발전 대응**: *"Harness의 공간은 모델이 좋아져도 줄어들지 않는다. 이동할 뿐이다"* (Anthropic) — 구체적으로 어떻게 이동하는지의 사례 연구는 향후 과제.
8. **비개발 영역 확장**: SEO 감사, 콘텐츠 제작, 리서치 등 비개발 워크플로우도 Harness 가능하다고 언급(`/geo-audit` 예시)하나, 상세 케이스 스터디는 부재.

**저자가 권장하는 향후 행동**:
- 이미 잘 만들어진 도구부터 써보기: `gstack` (garrytan/gstack), `superpowers` (obra/superpowers), `oh-my-claudecode` (Yeachan-Heo)
- 현재 상태 자가 진단 → 한꺼번에 다 바꾸려 하지 말고 불편한 지점 하나씩 개선
- 조심할 점: Harness 설계 시 너무 옥죄려 하지 말 것. 자유도 높게, 안 되는 것만 제한. Agent는 생각보다 예측 가능하게 잘 움직인다.

## 6. 관련 연구 (Related Work)

자료가 명시적으로 인용·언급하는 자원과 인접 영역:

**공식 문헌 / 인용**:
- **OpenAI**: "사람이 방향을 잡고, 에이전트가 실행한다." — `openai.com/index/harness-engineering`
- **Anthropic**: "규율은 코드가 아니라 스캐폴딩에서 드러난다." — `anthropic.com/engineering/harness-design`
- **Anthropic**: "Harness의 모든 구성요소는 모델이 혼자서는 못 하는 것에 대한 가정을 담고 있다."
- **Anthropic — Harness design for long-running application development**: Generator/Evaluator 분리, "자기 작업을 평가하면 quality가 mediocre해도 자신있게 칭찬한다", "만든 AI와 확인하는 AI를 분리하는 것이 가장 강력한 레버"
- **Anthropic**: "Harness의 공간은 모델이 좋아져도 줄어들지 않는다. 이동할 뿐이다."

**참고 리포지토리 & 도구**:
- `team-attention/harness` — 본 강의 자료 + harness-checklist.md
- `team-attention/hoyeon` — 발표자 개인 Harness 전체 구성
- `plugins-for-claude-natives` — Team Attention 검증 플러그인 모음 (session-wrap 등 포함)
- `karpathy/autoresearch` — 자율 실험 루프 (program.md 방향 작성 → AI 자율 실험 시간당 ~12개)
- `garrytan/gstack` — Garry Tan의 풀스택 도구 (cf. wiki에 `wiki/agents/garrytan-gstack.md`, `wiki/overviews/gbrain-ecosystem-overview.md`)
- `obra/superpowers` — Claude Code 슈퍼파워 플러그인
- `Yeachan-Heo/oh-my-claudecode` — Claude Code 한국 커뮤니티 패키지

**Harness Plugin 스킬들** (`team-attention/harness` 또는 plugins-for-claude-natives 산하):
- 구조: `/scaffold`, `/check-harness`, `/skill-creator` (Anthropic 공식)
- 계획: `/specify`, `/deep-interview`, `/clarify`
- 실행: `/agent-orchestrate`, `ralph` (Claude Code 공식 plugin), `autoresearch`
- 검증: `/qa`, `verify` 레퍼런스
- 개선: `session-wrap`

**진화 흐름의 맥락**: Prompt Engineering → Context Engineering(Lewis et al. 2020의 RAG 흐름과 prompt 강화 도구들) → Harness Engineering. 본 wiki의 [[agents/qiao-2026-memory-intelligence-agent|MIA]] 같은 multi-agent decoupling 연구, [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval|DCI]] 같은 agent의 corpus 직접 조작 연구와도 사상적으로 연결된다 (agent에게 풍부한 작업 환경을 제공하는 흐름).

## 7. 용어집 (Glossary)

| 용어 | 정의 |
|---|---|
| **Harness Engineering** | AI 에이전트가 혼자서도 잘 일할 수 있는 작업 환경(맥락·제한·흐름·검증)을 설계하는 행위. Prompt/Context Engineering의 상위 개념. |
| **Scaffolding (구조)** | 프로젝트 폴더, 도구 배치, 경계 설정 — Harness 6축 중 첫 단계. *"규율은 스캐폴딩에서 드러난다"* (Anthropic). |
| **Progressive Disclosure** | SKILL.md/CLAUDE.md에 모든 정보를 담지 않고, `references/` 폴더로 분리한 뒤 "이런 상황에서는 이걸 참고해" 라고 안내하는 패턴. 컨텍스트 절약. |
| **CLAUDE.md 3-tier** | User(`~/.claude/CLAUDE.md`) → Project(`my-app/CLAUDE.md`) → Folder(`src/.../CLAUDE.md`) 상속·오버라이드 구조. 하위가 상위를 덮어쓴다. |
| **.claude/rules/** | 주제별 분리된 규칙 폴더. 파일 상단에 `glob: **/*.tsx` 같은 패턴을 넣으면 해당 파일 작업 시에만 자동 로드 (조건부 로드). |
| **Permission Mode** | settings.json에서 자동 허용 범위 설정. `plan` / `auto` / `bypass` 3단계. |
| **Hook** | 위험한 명령(예: `git push --force`)을 실행 전 자동 차단·검사하는 자동 안전장치. Pre / Post / Stop / Notification 4종. |
| **Skill** | 반복 작업의 레시피화. `/commit`, `/review` 같은 슬래시 명령으로 호출. |
| **Agent (Subagent)** | 전문가 팀원처럼 서브에이전트 파견 또는 팀 구성으로 작업 위임·종합. |
| **MCP (Model Context Protocol)** | 외부 시스템(DB, Slack, Linear) 연결 표준. |
| **Plugin** | Skills/Agents/Hooks/MCP를 하나의 패키지로 묶어 배포·공유하는 단위. |
| **Plan Mode** | Claude Code의 계획·실행 분리 모드. 한계: 사람이 모든 걸 프롬프트에 담을 수 없다 → 커스텀 Plan 스킬로 진화. |
| **AskUserQuestion** | AI가 모호한 점을 사용자에게 역질문하게 하는 패턴/도구. "이해한 것을 미러링하고, 모호한 점을 질문해서 명확하게 해줘". |
| **/specify / /deep-interview / /clarify** | 계획 단계 커스텀 스킬들 — 스펙 명확화, 깊이 있는 인터뷰, 모호함 → 구체 스펙 변환. |
| **Single / Subagent / Team Mode** | 실행 패턴 3종. 90%는 Single·Subagent로 충분. Team Mode는 ~7× 토큰. |
| **Ralph Loop** | "완료 기준 합의 → AI 작업 → 기준 충족? → NO면 다시 작업" 자동 반복 루프. Claude Code 공식 plugin. |
| **Auto Research** | karpathy/autoresearch 패턴. 사람은 방향(`program.md`)만 정하고 AI가 코드 수정 → 실행 → 평가 → 반복을 자율 수행. 시간당 ~12개 실험. |
| **Sprint Contract** | 작업 전에 "뭘 만들고 어떻게 검증할지" 합의. 기준 없이 시키면 AI가 끝없이 하거나 대충 끝냈다고 한다. |
| **Generator / Evaluator 분리** | 결과를 만드는 AI와 평가하는 AI의 컨텍스트·관점을 물리적으로 분리. Anthropic이 "가장 강력한 레버" 라고 칭하는 검증 원칙. |
| **Browser Agent (chrome-cdp / agent-browser)** | 실제 Chrome 브라우저를 제어해 DOM 탐색·클릭·스크린샷·네비게이션으로 웹앱 UX 직접 검증. |
| **Computer Use** | 스크린샷 + 마우스/키보드로 모든 앱 제어 가능한 built-in MCP. 네이티브 앱·디자인 도구 검증. |
| **AI Slop** | 작업하다 보면 쌓이는 불필요한 코드·중복 설정·안 쓰는 규칙. 주기적 정리 대상. |
| **session-wrap** | Claude Code 세션 종료 후 세션 내용을 분석해 반복 패턴(Skill 후보), 실수(Rule 후보), 문서 업데이트 필요 항목을 자동 추출하는 플러그인 (plugins-for-claude-natives). |
| **handoff** | 세션 맥락이 비대해질 때 현재 세션 맥락을 파일로 저장 → 새 세션에서 이어받기. `/compact`(같은 주제)와 `/clear`(다른 주제)의 중간. |
| **TerminalBench** | 코딩 에이전트 평가용 터미널 작업 벤치마크. LangChain 사례에서 사용된 지표 (52.8 → 66.5). |
