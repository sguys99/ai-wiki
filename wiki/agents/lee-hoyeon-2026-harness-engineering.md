---
title: "Harness Engineering (Team Attention, 2026)"
type: article
year: 2026
category: agents
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/articles/lee-hoyeon-2026-harness-engineering.pdf
raw_filename: "lee-hoyeon-2026-harness-engineering.pdf"
source_collection: external
source: lee-hoyeon-2026-harness-engineering.md
author: "이호연 (Hoyeon Lee)"
url: "https://github.com/team-attention/harness"
publisher: "Team Attention"
tags: [harness-engineering, claude-code, ai-agents, context-engineering, scaffolding, orchestration, verification, slide-deck, korean]
---

## 요약 (Summary)

Team Attention의 **이호연 (Builder)** 가 2026-04-07에 발표한 54장 슬라이드 deck. 메인 메시지는 *"프롬프트만으로는 부족하다 — 말을 잘 하는 것에서 **일하는 방법을 설계해주는 것**으로"*. 진화 흐름을 **Prompt → Context → Harness Engineering** 3단계로 정의하고, Harness를 *"AI가 혼자서도 잘 일할 수 있는 작업 환경을 만들어주는 것"* 으로 규정한다.

핵심은 **6개 축의 순환 구조**다: **구조(Scaffolding) → 맥락(Context) → 계획(Planning) → 실행(Execution) → 검증(Verification) → 개선(Compounding)**. 각 축마다 Claude Code 생태계의 구체적 도구(skills, agents, hooks, MCP, plugins)와 패턴(Progressive Disclosure, CLAUDE.md 3-tier 상속, Ralph Loop, Generator/Evaluator 분리)을 매핑한다.

사례 비교 데이터로 강조하는 것은 *"모델 교체로 5% 개선보다 하네스 설계로 15% 개선이 현실적"* 이라는 결론 — LangChain은 같은 모델에서 하네스만 바꿔 TerminalBench +14%p (30위 → Top 5), Anthropic은 싱글 에이전트 $9 실패 vs 3에이전트 하네스 $200 성공, Stripe는 1,000 PR/주 완전 무인 머지.

> **2차 자료 주의**: LangChain·OpenAI·Anthropic·Stripe 수치는 외부 인용이고, 본 자료가 1차 측정한 것이 아님. 도구·플러그인 정보는 Claude Code 생태계 기준(2026-04 시점).

## 주요 기여 (Key Contributions)

1. **Harness Engineering 패러다임 정의**: Prompt → Context → Harness 3단계 진화. Harness = "작업 환경 자체 설계" — 가드레일·툴셋·맥락·제한·흐름·검증 일체.
2. **6축 순환 모델**: 구조 → 맥락 → 계획 → 실행 → 검증 → 개선 → 다시 구조. 각 축에 Claude Code 도구 매핑.
3. **사례 기반 수치**:
   - LangChain: GPT-5.2-Codex 고정, 하네스만 변경 → TerminalBench 52.8 → 66.5 (+14%p)
   - OpenAI: 인간 0줄, 100만 줄, 5개월 — "5개월은 코딩 아닌 하네스 설계"
   - Anthropic: 싱글 20분/$9 실패 vs 3에이전트 6h/$200 성공
   - Stripe: 1,000 PR/주, 완전 무인 자동 머지
4. **사람·AI 문서 분리**: `docs/`(사람이 관리하는 비즈니스 진실) vs `.dev/`(AI가 남기는 작업 흔적).
5. **CLAUDE.md 3-tier 상속**: User → Project → Folder, 하위가 상위 오버라이드, ~200줄 권장.
6. **Progressive Disclosure**: SKILL/CLAUDE.md에 다 넣지 말고 `references/` 폴더로 분리 + 상황별 참조 안내.
7. **세션 맥락 관리**: 20%·50%·80% 임계점. `/compact` vs `/clear` vs `handoff` 선택 규칙.
8. **실행 패턴 분류**: Single·Subagent·Team Mode. 90%는 단일·서브에이전트, Team은 ~7× 토큰.
9. **검증 4원칙**: 기준(Sprint Contract) + Generator/Evaluator 분리 + 모델·역할 분리 + 에이전트에게 눈(Browser Agent·Computer Use).
10. **개선 규칙**: 3번 반복 → Skill, 3번 틀리면 → Rule. "좋은 Harness는 점점 단순해진다."

## 방법론 및 아키텍처 (Methodology and Architecture)

### Harness의 6개 축 — 순환 구조

```
구조(Scaffolding)  →  맥락(Context)    →  계획(Planning)
      ↑                                          ↓
개선(Compounding) ←  검증(Verification) ←  실행(Execution)
```

| 축 | 핵심 질문 | 대표 도구·패턴 |
|---|---|---|
| 구조 | 뭘 깔아두는가 | 모노레포, 폴더링(`src/`·`docs/`·`tests/`·`.dev/`·`.claude/`·`out/`), Skills/Agents/Hooks/MCP/Plugins 배치 |
| 맥락 | AI가 뭘 아는가 | CLAUDE.md 3-tier 상속, `.claude/rules/` + glob 조건부 로드, Progressive Disclosure |
| 계획 | 뭘 할지 정하는가 | Plan Mode → 커스텀 Plan 스킬(`/specify`·`/deep-interview`·`/clarify`), AskUserQuestion |
| 실행 | 어떻게 시키는가 | Single / Subagent / Team Mode, Ralph Loop, Auto Research |
| 검증 | 어떻게 믿는가 | Sprint Contract, Generator/Evaluator 분리, Browser Agent·Computer Use, Worktree·Dry-run |
| 개선 | 어떻게 나아지는가 | session-wrap, 3회 반복 → Skill / 3회 실수 → Rule, 단순화 진단 |

### 사람의 문서 vs AI의 문서

| `docs/` (사람이 관리) | `.dev/` (AI가 남기는 기록) |
|---|---|
| 비즈니스 룰·도메인 정의 | learnings, troubleshooting 기록 |
| 체크리스트·온보딩 가이드 | 작업 로그, 디버깅 히스토리 |
| ADR, API 스펙, 외부 연동 규격 | 실험 결과, 스크래치패드 |

위 두 콘텐츠를 아래 4개 설정 파일이 참조·지탱한다: `CLAUDE.md` (프로젝트 지도 ~100줄, docs/와 rules/로 포인팅), `.claude/rules/` (코딩 규칙·테스트 컨벤션, glob로 조건부), `.claude/skills/` (반복 작업 레시피, /commit·/review 등), `hooks·agents·MCP·plugins`.

### CLAUDE.md 상속 구조

```
USER     ~/.claude/CLAUDE.md      모든 프로젝트 공통 (내 습관, 스타일)
            ↓ 상속
PROJECT  my-app/CLAUDE.md         이 프로젝트 전용 (스택, 컨벤션)
            ↓ 상속 + 오버라이드
FOLDER   src/auth/CLAUDE.md       이 폴더 작업 시만 (특수 규칙)
```

가장 좁은 범위가 우선. 예: User="camelCase" → Project="snake_case" → Project 승리.

### 세션 맥락 관리

| 사용량 | 액션 | 사용 시점 |
|---|---|---|
| ~20% | 쾌적 — 그대로 진행 | 일반 작업 |
| ~50% | `/compact` | 오래된 대화 요약·압축, 같은 주제 이어갈 때 |
| ~80% | `/clear` 또는 새 세션 | 컨텍스트 완전 초기화, 다른 주제로 전환 |
| 임의 시점 | `handoff` | 현재 세션 맥락을 파일 저장 → 새 세션에서 이어받기 |

발표자 기준: 20~30%면 새로 시작. 같은 주제 이어가야 하면 handoff로 맥락 넘긴다.

### 실행 패턴

| 패턴 | 사용처 | 비용 |
|---|---|---|
| **Single** | 단순 작업, 대부분의 일상 | 낮음 |
| **Subagent** | 병렬/전문화, 위임 → 종합 | 중간 |
| **Team Mode** | 다관점·복잡, 에이전트 간 소통 | ~7× 토큰 |

90% 케이스는 Single/Subagent로 충분.

**Ralph Loop**: 완료 기준 합의 → AI 작업 → 기준 충족? (NO → 작업으로). 사람은 기준 정하기 1번. 예: "모바일 반응형 + Lighthouse 90점 + 카피 3번 퇴고" → 4회차에 PASS.

**Auto Research** (karpathy/autoresearch): `program.md`에 방향 작성 → AI가 `train.py`만 수정 → 5분 학습 → 평가 → 유지/폐기 → 다음 실험. 시간당 ~12개, 밤새 무인 운영.

### 검증 — 4원칙

1. **기준 (Sprint Contract)**: 작업 전 "뭘 만들고 어떻게 검증할지" 합의. 측정 가능하게 — "잘 되게" 말고 "테스트 통과 + 빌드 성공".
2. **Generator/Evaluator 분리** (Anthropic 원칙): 만든 AI와 검증하는 AI의 컨텍스트·관점을 물리적으로 분리. *"자기 작업을 평가하면 quality가 mediocre해도 자신있게 칭찬한다"* — Evaluator를 회의적으로 튜닝하는 게 Generator를 자기비판적으로 만드는 것보다 훨씬 쉽다.
3. **모델·역할 분리**: Codex(코드 리뷰), Gemini(문서 리뷰), Opus(복잡 판단)/Sonnet(빠른 확인). 다른 모델·다른 역할로 교차 검증.
4. **에이전트에게 눈 달기**: Browser Agent(chrome-cdp/agent-browser로 실제 Chrome 제어), Computer Use(built-in MCP, 스크린샷+키보드/마우스), 시각 검증 루프(generate → screenshot → evaluate).

**안전장치 3종**: 되돌릴 수 있는 환경(git worktree add), Runtime Gate(위험 작업은 승인), Dry-run 먼저(`--dry-run` 미리보기).

### 개선 — 관측 → 단순화

- **관측**: 세션 분석 (프롬프트 패턴 + Skill/Agent 호출 빈도). AI Slop(불필요한 코드·중복 설정·안 쓰는 규칙) 감지.
- **개선 규칙**:
  - 같은 작업 **3번 반복** → Skill로
  - 같은 실수 **3번 반복** → `.claude/rules/` 또는 CLAUDE.md에 명시
- **단순화**: 안 쓰는 건 치운다(Skill·MCP·Rule). 모델 좋아지면 Harness 재평가. 과설계 신호 인식(설정이 복잡하면 잘못된 것).

**자가 진단 — 잘 가는 신호 vs 실패 징후**:

| 잘 가고 있다 (+) | 실패하고 있다 (−) |
|---|---|
| 같은 말 두 번 안 함 | 검수에 시간이 더 걸린다 |
| 실수가 규칙이 된다 | 시켰는데 결과 안 나옴 |
| 차단 장치가 뭔가 막는다 | 스킬·에이전트 많은데 안 쓰임 |
| 불필요한 것이 줄어든다 | 가이드 파일 길어지고 관리 안 됨 |

*"좋은 Harness는 점점 단순해진다."*

## 결과 (Results)

| 회사 | 핵심 수치 | 메시지 |
|---|---|---|
| **LangChain** | TerminalBench 52.8 → 66.5 (+14%p), 30위 → Top 5 | 같은 GPT-5.2-Codex 모델, 셀프 검증 루프 + 컨텍스트 자동 수집 + 둠 루프 탐지 하네스만 추가 |
| **OpenAI** | 100만 줄, 인간 코드 0줄, 엔지니어 3~7명·5개월 | "5개월을 쓴 곳은 코딩이 아니라 하네스 설계." 교훈 5가지 중 "더 좋은 모델 써라"는 없음 |
| **Anthropic** | 싱글 20분/$9 → 실패 vs 3에이전트 6h/$200 → 완전 동작 | 차이는 모델이 아니라 하네스. 간소화 $124로 품질 유지 가능 |
| **Stripe** | 1,000 PR/주, 완전 무인 자동 머지 | 매 스텝 검증 게이트 + 정밀 컨텍스트 관리. 하네스 없이는 불가능한 규모 |

**결론**: *"모델 교체로 5% 개선보다 하네스 설계로 15% 개선이 현실적이다."*

> 본 자료는 1차 측정 자료가 아니라 외부 인용 종합이다. 재현·세부 조건은 OpenAI/Anthropic/Stripe 원 출처에서 별도 확인 필요.

## 관련 페이지 (Related Pages)

- [[agents/qiao-2026-memory-intelligence-agent]] — Manager·Planner·Executor 3-agent decoupling 패러다임. 본 자료의 "실행 패턴: Single/Subagent/Team Mode" 와 사상적으로 연결 (역할 분리로 품질 ↑).
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] — agent가 raw corpus를 직접 grep·bash로 다루는 DCI 접근. "AI에게 작업 환경을 제공한다"는 본 자료 메시지와 같은 흐름.
- [[overviews/gbrain-ecosystem-overview]] — Garry Tan의 `gstack`이 본 자료 "이미 잘 만들어진 도구부터 써보기" 권장 도구 중 하나로 명시됨.

## 외부 참조 (External References)

- **GitHub**: [team-attention/harness](https://github.com/team-attention/harness) — 강의자료 + `harness-checklist.md`
- **GitHub**: [team-attention/hoyeon](https://github.com/team-attention/hoyeon) — 발표자 개인 Harness 전체 구성 예시
- **GitHub**: `plugins-for-claude-natives` — Team Attention 검증 플러그인 모음 (session-wrap 포함)
- **GitHub**: [karpathy/autoresearch](https://github.com/karpathy/autoresearch) — 자율 실험 루프
- **GitHub**: `garrytan/gstack`, `obra/superpowers`, `Yeachan-Heo/oh-my-claudecode`
- **Anthropic**: `anthropic.com/engineering/harness-design` (자료에 명시된 인용 출처)
- **OpenAI**: `openai.com/index/harness-engineering` (자료에 명시된 인용 출처)
