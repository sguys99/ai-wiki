---
title: "Prompt → Context → Harness → Loop Engineering — 4단계 진화 개괄"
type: overview
year: 2026
category: overviews
source_collection: synthesis
sources:
  - patel-2026-i-taught-myself-claude-code.md
  - anthropic-2025-effective-context-engineering-for-ai.md
  - edge-2024-from-local-to-global.md
  - zhang-2026-recursive-language-models.md
  - datasciencedojo-2026-llm-wiki-by-andrej-karpathy.md
  - lee-hoyeon-2026-harness-engineering.md
  - patel-2026-beyond-the-prompt-claude-code.md
  - lin-2026-harness-updating-is-not-harness-benefit.md
  - trq212-2026-a-field-guide-to-fable.md
  - osmani-2026-loop-engineering.md
  - runkle-2026-the-art-of-loop-engineering.md
  - kang-2026-no-longer-prompting-claude.md
  - lee-jeongmin-2026-loop-engineering-claude-code.md
tags: [prompt-engineering, context-engineering, harness-engineering, loop-engineering, paradigm-shift, evolution, verification-distance, progressive-disclosure, compounding, claude-code, overview, synthesis]
---

## 요약 (Summary)

AI 코딩 에이전트를 다루는 방식은 4년에 걸쳐 **무엇을 최적화 대상으로 삼느냐**가 한 칸씩 밖으로 밀려났다: **단일 지시(prompt) → 문맥 토큰(context) → 실행 환경(harness) → 오케스트레이션 루프(loop)**. 각 단계는 앞 단계를 **버리는(replace) 게 아니라 감싼다(wrap)**. 좋은 프롬프트는 여전히 필요하지만, 이제 사람이 매번 손으로 쓰는 대신 루프가 대신 만들어 공급한다([[agents/kang-2026-no-longer-prompting-claude]]의 역설).

이 페이지는 그 4단계 진화를 관통하는 **최상위 진입 지도**다. 앞 두 단계(Prompt·Context)는 배경으로 압축하고, wiki에 자료가 두껍게 쌓인 뒤 두 단계(Harness·Loop)에서 각각의 **자매 상세 지도**로 내려보낸다:

- Harness 상세 → [[overviews/agent-harness-engineering-overview]] (Skills·검증·실증 8자료)
- Loop 상세 → [[overviews/loop-engineering-cross-domain-overview]] (코딩↔트레이딩 도메인 이식 7자료)

## 한눈에 보는 4단계 (The Ladder)

| 단계 | 시점·제안자 | 최적화 대상 | 대표 기법·개념 | wiki 앵커 |
|---|---|---|---|---|
| **Prompt Engineering** | ~2022– | 단일 지시(single instruction) | few-shot, Chain-of-Thought, ReAct, Reflexion | [[agents/patel-2026-i-taught-myself-claude-code]] (원전 큐레이션) |
| **Context Engineering** | 2025, Anthropic | 프롬프트 밖 문맥 토큰 전체 | attention budget, context rot, just-in-time, compaction | [[agents/anthropic-2025-effective-context-engineering-for-ai]] |
| **Harness Engineering** | 2026-02, Mitchell Hashimoto | 실행 환경(execution environment) | 6축 순환, `.claude/` config, Generator/Evaluator 분리 | [[agents/lee-hoyeon-2026-harness-engineering]] |
| **Loop Engineering** | 2026-06, Addy Osmani | 오케스트레이션 레이어(루프) | 5+1 구성요소, `/loop`·`/goal`, verification distance | [[agents/osmani-2026-loop-engineering]] |

> 단계별 시점·제안자 배열은 [[agents/kang-2026-no-longer-prompting-claude]]가 정리한 타임라인을 따랐다. Prompt 단계의 원전 논문(ReAct·CoT 등)은 wiki에 **전용 페이지로 보유하지 않는다** — patel 리스트가 추천 목록으로 언급하는 수준이다.

## 배경 — 지시에서 문맥으로 (단계 1·2)

### 단계 1: Prompt Engineering — 지시 한 줄을 벼린다

출발점은 **잘 쓴 지시 한 번**이다. [[agents/patel-2026-i-taught-myself-claude-code]]가 프롬프팅의 원전으로 추천하는 5종 — **ReAct**(추론+행동), **Chain-of-Thought**(단계적 사고), **Toolformer**(도구 사용), **Reflexion**(자기반성), **Generative Agents**(기억+계획) — 이 이 단계의 기법 어휘를 이룬다. [[agents/anthropic-2025-effective-context-engineering-for-ai]]는 prompt engineering을 "프롬프트(특히 system prompt)를 잘 쓰는 법"으로 정의하며, 뒤 단계의 대비 기준선으로 삼는다. 한계는 분명하다 — **한 번 쓰고 끝나는 단일 턴** 관점이라, 여러 턴을 도는 에이전트에는 부족하다.

### 단계 2: Context Engineering — 문맥 창 전체를 큐레이션한다

[[agents/anthropic-2025-effective-context-engineering-for-ai]] (Anthropic Applied AI, 2025)가 이 전환을 못 박았다. 핵심 명제는 하나다 — LLM의 **attention budget은 유한**하므로, 좋은 context engineering이란 "원하는 결과의 확률을 최대화하는 high-signal 토큰의 **최소 집합**"을 찾는 일이다.

![[assets/anthropic-2025-effective-context-engineering-for-ai/fig01.png]]
*Figure 1: Prompt engineering vs. context engineering — 단일 턴 프롬프트는 한 번 쓰고 끝이지만, 에이전트의 context는 매 턴 curation이 반복된다 (Anthropic 2025)*

이 단계가 가져온 개념들:

- **context rot**: 토큰이 늘수록 recall이 완만히 떨어진다. 창을 키워도 해결되지 않는다.
- **pre-retrieval → just-in-time**: 미리 다 넣는 대신 식별자(file path·query)만 두고 런타임에 tool로 로드. Claude Code가 `head`·`grep`으로 대용량을 훑는 방식.
- **long-horizon 3기법**: compaction(요약 후 재출발)·structured note-taking(외부 메모리)·sub-agent(clean context 위임).

문맥을 다루는 다른 형태의 자료도 이 단계에 속한다 — [[database/edge-2024-from-local-to-global]](GraphRAG: 대규모 corpus를 context window의 1/9~1/43로 compaction), [[agents/zhang-2026-recursive-language-models]](context를 REPL **변수**로 두고 sub-LM 재귀 호출), [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]](RAG 대비 **사전 컴파일된** stateful context).

## 단계 3 — Harness Engineering: 실행 환경을 설계하다 (심화)

무게중심이 다시 밖으로 나간다. 프롬프트도 문맥도 결국 **에이전트가 일할 작업 환경**의 일부일 뿐이다. 그 환경 전체(가드레일·툴셋·맥락·검증·흐름)를 설계하는 일이 **harness engineering**이다. [[agents/lee-hoyeon-2026-harness-engineering]]가 이를 가장 넓은 프레임으로 그린다: *"말을 잘 하는 것에서 일하는 방법을 설계해주는 것으로."*

**6축 순환 구조**가 뼈대다:

```
구조(Scaffolding)  →  맥락(Context)    →  계획(Planning)
      ↑                                          ↓
개선(Compounding) ←  검증(Verification) ←  실행(Execution)
```

각 축은 Claude Code 도구로 매핑된다 — 구조(폴더링·Skills·Hooks·MCP), 맥락(CLAUDE.md 3-tier 상속·Progressive Disclosure), 계획(Plan Mode·커스텀 스킬), 실행(Single/Subagent/Team·Ralph Loop), 검증(Generator/Evaluator 분리·Browser Agent), 개선(3회 반복→Skill, 3회 실수→Rule). [[agents/patel-2026-beyond-the-prompt-claude-code]]가 이 축들을 `.claude/` 디렉토리 config로 구체화한 실전 매뉴얼을 제공한다.

이 단계의 강한 주장은 **"모델보다 하네스가 큰 lever"** 다. 이호연이 인용한 수치를 보면 — LangChain은 같은 모델에서 하네스만 바꿔 TerminalBench +14%p(30위→Top 5), Anthropic은 싱글 에이전트 $9 실패 vs 3에이전트 하네스 $200 성공, Stripe는 1,000 PR/주 무인 머지. 결론: *"모델 교체로 5% 개선보다 하네스 설계로 15% 개선이 현실적이다."*

두 개의 경계가 이 낙관을 조인다:

- **실증의 경계** — [[agents/lin-2026-harness-updating-is-not-harness-benefit]]는 7 LLM × 3 벤치마크 controlled grid로 계측해, 하네스 lever가 **frontier 모델에서만 크게 회수**됨을 보인다. 약한 모델은 Skill을 로드하는 format조차 못 맞추거나(activation failure), 절차를 끝까지 못 따른다(adherence failure).
- **입력단의 경계** — [[agents/trq212-2026-a-field-guide-to-fable]]는 하네스 **앞단**을 판다. 하네스를 아무리 정교하게 깔아도 사람이 원하는 바가 흐릿하면(map≠territory의 unknown) 결과도 흐리다. 하네스가 model보다 큰 lever라면, 그 하네스에 무엇을 먹이느냐가 다시 그 위의 lever다.

> **이 단계의 상세 지도** → [[overviews/agent-harness-engineering-overview]] (Skills 원칙·GeekNews 회의론·교육 커리큘럼까지 8자료를 한 장으로)

## 단계 4 — Loop Engineering: 루프가 프롬프트를 만든다 (심화)

마지막 칸이다. 하네스를 다 깔았다면, 이제 그 위에서 **사람 손 없이 도는 루프**를 설계한다. [[agents/osmani-2026-loop-engineering]] (Addy Osmani, 2026-06-07)가 *"prompting agents → designing loops that prompt your agents"* 전환에 **Loop Engineering**이라는 이름을 붙였다.

**5+1 구성 요소**가 루프의 최소 골격이다:

| 요소 | 목적 |
|---|---|
| **Automations** | scheduled discovery·triage가 사람 개입 없이 작업을 표면화 (루프의 심장) |
| **Worktrees** | 격리된 병렬 작업환경으로 파일 충돌 방지 |
| **Skills** | `SKILL.md`로 재유도 토큰 낭비 제거 |
| **Plugins/Connectors** | MCP로 issue tracker·staging API·notification 연결 |
| **Sub-agents** | implementation과 evaluation을 분리해 self-grading bias 제거 |
| **(+1) Persistent state** | markdown·project board로 session 간 메모리 부재 보완 |

Claude Code의 두 슬래시 커맨드가 루프의 두 유형을 가른다 — `/loop`은 **cadence-based**(시간 주기), `/goal`은 **conditional completion**(조건 충족까지 grind + 검증을 별도 모델에 위임)이다. [[agents/runkle-2026-the-art-of-loop-engineering]]는 이 루프를 4단계 스택(agent → verification → event-driven → hill climbing)으로 정리했고, [[agents/lee-jeongmin-2026-loop-engineering-claude-code]]는 Claude Code의 dynamic workflow를 **RLM(Recursive Language Model)** 이론에 묶어 설계 의도를 해부한다.

제목의 역설([[agents/kang-2026-no-longer-prompting-claude]])이 이 단계의 핵심이다. *"더 이상 프롬프팅하지 않는다"*는 프롬프트를 버린다는 말이 아니라, 사람이 매번 쓰던 일을 **루프에 맡긴다**는 뜻이다. 무게중심이 문장 한 줄에서 그 문장을 자동으로 만들어내는 루프 구조로 옮겨갔을 뿐, 좋은 프롬프트의 가치는 그대로다.

자동화가 앗아가는 것도 함께 명명된다 — **3대 부채**:

- **Validation debt(검증 부채)** — 루프가 쏟아내는 결과를 사람이 다 검증하지 못한 채 쌓인다.
- **Understanding/Comprehension debt(이해 부채)** — 루프가 대신 처리한 과정을 이해하지 못하고 넘어가며 누적된다.
- **Cognitive resistance/Comfortable passivity(인지적 저항·편안한 수동성)** — 위임이 주는 편안함이 사고를 덜 하게 만든다.

Osmani의 결론 그대로 — *"leverage point는 옮겨갔지만, 품질의 책임은 여전히 엔지니어에게 고정되어 있다."*

> **이 단계의 상세 지도** → [[overviews/loop-engineering-cross-domain-overview]] (코딩을 넘어 트레이딩까지 — 루프의 도메인 이식성 7자료)

## 네 단계를 관통하는 실 (Three Through-lines)

단계가 밖으로 밀려나도 **같은 세 원리가 이름만 바꿔 반복**된다. 4단계가 별개가 아니라 하나의 진화임을 보여주는 대목이다.

1. **Verification distance — 만드는 AI ≠ 검증하는 AI.** Context 단계의 sub-agent 위임, Harness 단계의 Generator/Evaluator 물리적 분리, Loop 단계의 sub-agent verification까지 — *"자기 작업을 평가하면 mediocre해도 자신 있게 칭찬한다"*는 문제의식이 세 단계를 관통한다.
2. **Progressive disclosure — 다 넣지 말고 필요할 때 꺼낸다.** Context의 "최소 고신호 집합"·just-in-time 로드가, Harness의 `references/` 분리·Skill 조건부 활성화로, Loop의 맥락별 skill 로드로 이어진다.
3. **Compounding — 실수를 규칙으로, 반복을 Skill로.** Context의 structured note-taking(NOTES.md)이, Harness의 "3회 실수→Rule, 3회 반복→Skill"로, Loop의 persistent state로 누적된다. 이 wiki의 3-tier 구조(raw→sources→wiki)도 같은 복리 사상 위에 있다.

**관통하는 경계도 하나 있다** — 사다리를 위로 오를수록 frontier 모델 의존이 커진다. Lin et al.의 실증([[agents/lin-2026-harness-updating-is-not-harness-benefit]])은 harness·loop의 정교한 설계가 약한 모델에선 작동조차 안 함을 보인다. 상위 단계의 lever는 **강한 모델을 쓸 때 가장 크게 회수된다**.

## 이 지도를 어떻게 쓰나 (Reading Order)

1. **큰 그림부터** → 이 페이지 §요약·§Ladder로 4단계 축을 잡는다.
2. **배경 두 단계는 빠르게** → [[agents/anthropic-2025-effective-context-engineering-for-ai]] (Context 전환의 원점) 하나면 충분하다. Prompt 단계는 개념만.
3. **Harness 심화** → [[overviews/agent-harness-engineering-overview]]로 내려가 [[agents/lee-hoyeon-2026-harness-engineering]](프레임)·[[agents/patel-2026-beyond-the-prompt-claude-code]](config)·[[agents/lin-2026-harness-updating-is-not-harness-benefit]](실증)을 읽는다.
4. **Loop 심화** → [[overviews/loop-engineering-cross-domain-overview]]로 내려가 [[agents/osmani-2026-loop-engineering]](원 출처)·[[agents/runkle-2026-the-art-of-loop-engineering]](4단계 스택)을 읽는다.

## 관련 페이지 (Related Pages)

- [[overviews/agent-harness-engineering-overview]] — 단계 3의 상세 지도. Skills·검증·실증·교육까지 8자료.
- [[overviews/loop-engineering-cross-domain-overview]] — 단계 4의 상세 지도. 루프의 도메인 이식(코딩↔트레이딩) 7자료.
- [[agents/kang-2026-no-longer-prompting-claude]] — 4단계 진화를 한 장에 명명한 자매 카드. 이 개괄의 타임라인 골격.
- [[agents/anthropic-2025-effective-context-engineering-for-ai]] — 단계 1→2 전환의 원점 자료.
