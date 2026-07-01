---
title: "Agent Harness Engineering — Skills · Loops · Verification 개괄"
type: overview
year: 2026
category: overviews
source_collection: synthesis
sources:
  - osmani-2026-agent-skills.md
  - hada-2026-agent-skills.md
  - osmani-2026-loop-engineering.md
  - lee-hoyeon-2026-harness-engineering.md
  - patel-2026-beyond-the-prompt-claude-code.md
  - lin-2026-harness-updating-is-not-harness-benefit.md
tags: [harness-engineering, agent-skills, loop-engineering, verification, generator-evaluator, progressive-disclosure, scope-discipline, worktree, claude-code, mcp, compounding, self-evolving-agents, overview, synthesis]
---

## 요약 (Summary)

2026년 상반기에 여러 저자가 같은 전환을 저마다 다른 이름으로 짚었다. **"프롬프트를 잘 쓰는 일"에서 "에이전트가 혼자 일할 작업 환경(harness)을 설계하는 일"로.** 이호연은 이를 *Harness Engineering*, Addy Osmani는 *Loop Engineering*, Arpan Patel은 *"setup is the work"* 라 불렀다. 이름은 달라도 뼈대는 포갠다 — 구조·맥락·계획·실행·**검증**·개선을 에이전트 바깥에 미리 깔아 두는 것.

이 overview는 wiki에 실재하는 **6개 자료**를 한 장의 지도로 묶는다.

| 자료 | 층위 | 한 줄 |
|---|---|---|
| [[agents/osmani-2026-agent-skills]] | Skills | 시니어의 절차를 checkpoint 있는 workflow로 강제하는 Skill 5원칙 + 6단계 SDLC |
| [[agents/hada-2026-agent-skills]] | Skills (비판) | 위 글의 GeekNews 요약 + *"LLM은 규칙을 우회한다"* 회의론·context 오염 트레이드오프 |
| [[agents/osmani-2026-loop-engineering]] | Loops | Skills·worktrees·connectors·sub-agents를 자동 loop으로 엮는 실행 층 |
| [[agents/lee-hoyeon-2026-harness-engineering]] | 전체 프레임 | 구조→맥락→계획→실행→검증→개선 6축 순환, *"모델 5% < 하네스 15%"* |
| [[agents/patel-2026-beyond-the-prompt-claude-code]] | 실전 운영 | `.claude/` config·verify-your-own-work·worktree 병렬·Ralph Loop 매뉴얼 |
| [[agents/lin-2026-harness-updating-is-not-harness-benefit]] | 실증 경계 | 하네스의 이득을 controlled grid로 계측 — 약한 모델은 invocation·adherence에서 무너진다 |

## 하나의 그림 (The Shared Picture)

세 처방(이호연·Osmani·Patel)은 결국 같은 구조를 저마다 다른 해상도로 그린다.

- **이호연의 6축**이 가장 넓은 지도다: 구조(Scaffolding) → 맥락(Context) → 계획(Planning) → 실행(Execution) → 검증(Verification) → 개선(Compounding) → 다시 구조.
- **Osmani의 Loop**은 그중 *실행 + 개선* 축을 자동화로 좁혀 본 것이다. automations·worktrees·skills·connectors·sub-agents가 사람 손 없이 돈다.
- **Osmani의 Skill**과 **Patel의 `.claude/` config**는 *구조 + 맥락* 축을 채우는 재료다. Skill은 재사용 가능한 절차, CLAUDE.md는 세션마다 로드되는 맥락이다.

Skill이 harness의 전부가 아니라 **한 layer**일 뿐임을 Osmani가 못 박는다 — AGENTS.md(rulebook)·hooks(enforcement)·tools(action)·session log(memory)와 나란히 놓인 조각이다.

## 관통하는 원리 세 가지 (Three Load-Bearing Principles)

### 1. Verification distance — 만드는 AI ≠ 검증하는 AI

여섯 자료가 가장 세게 합의하는 지점이다.

- **Patel**: *"give Claude a way to verify its own work"* (Boris Cherny가 2~3x 품질로 지목). 검증 루프가 없으면 사용자가 유일한 feedback signal로 남는다.
- **이호연**: Generator/Evaluator를 물리적으로 분리하라 — *"자기 작업을 평가하면 mediocre해도 자신 있게 칭찬한다. Evaluator를 회의적으로 튜닝하는 게 Generator를 자기비판적으로 만드는 것보다 쉽다."*
- **Osmani (Loop)**: sub-agent로 implementation과 evaluation을 갈라 self-grading bias를 없앤다.
- **Osmani (Skills)**: 모든 workflow는 구체적 증거(통과한 test·clean build·reviewer 승인)로 끝난다 — verification is non-negotiable.

공통된 결론은 이렇다 — 검증은 **다른 컨텍스트·다른 역할**에 맡겨야 신뢰가 선다. `/goal`·Ralph Loop는 이 원리를 *"검증 가능·결정론적 조건이 충족될 때까지 자율 grind"* 로 도구화한다.

### 2. Progressive disclosure — 다 넣지 말고 필요할 때 꺼낸다

- **Osmani**: Skill 20개를 한꺼번에 로드하지 않고 맥락에 따라 활성화해 token을 아낀다.
- **Patel**: Skill description은 ~100토큰만 상시 로드, 본문은 필요 시. *"MCP를 다 깔지 마라 — tool list 비대화가 decision quality를 해친다."*
- **이호연**: SKILL/CLAUDE.md에 다 넣지 말고 `references/`로 분리해 상황별 참조.

**GeekNews 토론이 여기에 균열을 낸다**([[agents/hada-2026-agent-skills]]): Skill 하나가 800줄을 넘기도 하는 탓에, 많이 갖출수록 규율은 촘촘해지지만 context는 새어 나간다. "얼마나 갖추고 얼마나 로드할까"는 progressive disclosure로도 말끔히 풀리지 않은 긴장이다.

### 3. Compounding — 실수를 규칙으로, 반복을 Skill로

- **Patel**: 실수할 때마다 *"Update CLAUDE.md so you don't repeat this"* → Boris가 부른 *Compounding Engineering*.
- **이호연**: 같은 작업 3번 → Skill, 같은 실수 3번 → Rule. *"좋은 Harness는 점점 단순해진다."*

이 wiki의 3-tier 구조(raw → sources → wiki)와 [[overviews/gbrain-ecosystem-overview]]의 markdown-first 메모리도 같은 복리 사상 위에 서 있다.

## 실증의 경계 — Lin et al. (2026)

처방 넷은 *"harness가 model보다 큰 lever"* 라 말한다. [[agents/lin-2026-harness-updating-is-not-harness-benefit]]은 이 주장을 7개 LLM × 3개 벤치마크 controlled grid로 계측하며 **못 두 개**를 박는다.

1. **하네스의 lever는 실재한다** — within-agent spread는 최대 5.1pp인데 between-agent gap은 36pp에 이른다. 다만 그 방향이 이호연의 슬로건과 어긋난다. post-evolution 점수는 **evolver가 아니라 task-solving agent 쪽에서 bottlenecked**. 하네스를 *만드는* 능력은 모델 크기와 무관하고(9B 모델이 SkillsBench evolver 1위), 정작 중요한 건 하네스를 *쓰는* 능력이다.

2. **약한 모델에선 lever가 작동조차 안 한다** — 두 failure mode로 갈린다:
   - **Activation failure**: Skill을 로드하는 format을 못 맞춰(multi-key emit → parser reject) skill 본문이 컨텍스트에 진입조차 못 한다 (Qwen3-32B SLR 0.251 vs Opus 0.957).
   - **Adherence failure**: 로드하고도 절차를 literal script로 오독하거나 fallback을 건너뛴다. 게다가 trajectory가 길어질수록 adherence가 갈수록 무너진다(drift −0.39 vs Opus −0.09).

**함의**: Osmani의 anti-rationalization table, 이호연의 6축, Patel의 `.claude/` 매뉴얼은 하나같이 *"모델이 Skill을 제대로 로드하고 끝까지 따른다"* 를 암묵 전제로 깐다. Lin은 그 전제가 strong-tier(Opus·Sonnet)에서만 성립함을 보인다. 결국 **harness engineering은 frontier 모델을 쓸 때 가장 크게 회수된다** — GeekNews의 *"결국 LLM이 규칙을 우회한다"* 회의론에 조건부로나마 정량적인 답을 내놓은 셈이다.

## 이 지도를 어떻게 쓰나 (Reading Order)

1. **왜 이 전환인가** → [[agents/lee-hoyeon-2026-harness-engineering]] (가장 넓은 프레임 + 회사별 수치)
2. **무엇을 깔아야 하나** → [[agents/osmani-2026-agent-skills]] (Skill 원칙) + [[agents/patel-2026-beyond-the-prompt-claude-code]] (구체 config·커맨드)
3. **어떻게 돌리나** → [[agents/osmani-2026-loop-engineering]] (자동 loop 시나리오)
4. **정말 효과 있나 / 언제 안 되나** → [[agents/lin-2026-harness-updating-is-not-harness-benefit]] (실증 + caveat) + [[agents/hada-2026-agent-skills]] (현장 회의론)

## 관련 페이지 (Related Pages)

- [[overviews/gbrain-ecosystem-overview]] — 같은 복리·markdown-first 메모리 사상을 공유하는 자매 생태계. harness의 *맥락·개선* 축을 메모리 관점에서 넓힌다.
- [[agents/qiao-2026-memory-intelligence-agent]] — 역할 분리(Manager·Planner·Executor)로 품질을 끌어올린 연구. verification distance·실행 패턴과 사상적으로 맞닿는다.
- [[agents/dennis-2026-compiling-agentic-workflows-into-llm]] — 하네스를 프롬프트가 아니라 **모델 가중치로 컴파일**하는 대안. Lin이 진단한 invocation/adherence 실패를 우회하는 path다.
