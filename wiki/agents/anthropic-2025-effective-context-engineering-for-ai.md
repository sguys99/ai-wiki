---
title: "Effective Context Engineering for AI Agents"
type: article
year: 2025
category: agents
source: anthropic-2025-effective-context-engineering-for-ai.md
raw_path: raw/articles/anthropic-2025-effective-context-engineering-for-ai.md
raw_filename: "anthropic-2025-effective-context-engineering-for-ai.md"
source_collection: external
author: "Prithvi Rajasekaran, Ethan Dixon, Carly Ryan, Jeremy Hadfield (Anthropic Applied AI)"
url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
publisher: "Anthropic Engineering"
tags: [context-engineering, agents, prompt-engineering, compaction, memory, sub-agents, claude-code]
figures:
  - id: fig01
    file: assets/anthropic-2025-effective-context-engineering-for-ai/fig01.png
    raw: raw/articles/anthropic-2025-effective-context-engineering-for-ai-figures/fig01.png
    caption: "Prompt engineering vs. context engineering — 단일 턴 프롬프트 작성과, 매 턴 curation이 반복되는 에이전트 context 큐레이션의 대비"
    strategy: manual
    curated: true
  - id: fig02
    file: assets/anthropic-2025-effective-context-engineering-for-ai/fig02.png
    raw: raw/articles/anthropic-2025-effective-context-engineering-for-ai-figures/fig02.png
    caption: "Calibrating the system prompt — too specific(취약한 하드코딩) ↔ just right ↔ too vague(막연함)의 right altitude 스펙트럼"
    strategy: manual
    curated: true
---

# Effective Context Engineering for AI Agents

## 요약 (Summary)

Anthropic Applied AI 팀이 2025년 9월에 낸 실무 가이드다. **context engineering**을 prompt engineering의 다음 단계로 자리매김한다. 핵심 명제는 하나다. LLM의 **attention budget**은 유한하므로, 좋은 context engineering이란 "원하는 결과의 확률을 최대화하는 high-signal 토큰의 **최소 집합**"을 찾는 일이다. 글은 이 원칙을 system prompt·tools·examples 같은 context 구성 요소별로 풀어낸 다음, context window를 넘어서는 long-horizon 작업을 위한 세 기법(compaction·structured note-taking·sub-agent)을 제시한다.

![[assets/anthropic-2025-effective-context-engineering-for-ai/fig01.png]]
*Figure 1: Prompt engineering vs. context engineering — 단일 턴 프롬프트는 한 번 쓰고 끝이지만, 에이전트의 context는 매 턴 curation(가위 아이콘)이 반복된다 (Anthropic 2025)*

## 주요 기여 (Key Contributions)

- **prompt vs. context engineering**: prompt engineering이 프롬프트(특히 system prompt)를 잘 쓰는 법이라면, context engineering은 추론 중 context window에 들어갈 토큰 전체(system instruction·tools·MCP·external data·message history)를 큐레이션하고 유지하는 전략이다. 저자들은 후자를 전자의 자연스러운 확장으로 본다.
- **context rot**: context window의 토큰이 늘수록 recall 정확도가 떨어진다. transformer의 n² pairwise 관계와 짧은 시퀀스 위주 학습 분포에서 비롯되며, 절벽처럼 뚝 떨어지는 게 아니라 완만한 performance gradient로 나타난다. 그래서 context는 한계 효용이 체감하는 유한 자원으로 다뤄야 한다.
- **최소 집합 원칙**: 모든 조언이 "informative, yet tight(정보는 충분하되 빡빡하게)"라는 한 문장으로 수렴한다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### context 구성 요소별 지침

- **System prompt — right altitude**: 취약한 if-else 하드코딩(너무 낮은 고도)과 공유 맥락을 잘못 가정하는 막연함(너무 높은 고도) 사이에서 균형점을 노린다. `<background_information>`·`<instructions>`·`## Tool guidance` 같은 섹션 구분을 권장하지만, 모델이 강해질수록 포맷의 비중은 줄어든다. minimal은 짧다는 뜻이 아니라 기대 행동을 온전히 규정하는 최소량이라는 뜻이다.

![[assets/anthropic-2025-effective-context-engineering-for-ai/fig02.png]]
*Figure 2: Calibrating the system prompt — 왼쪽 too specific(취약한 if-else 하드코딩)과 오른쪽 too vague(막연한 일반론) 사이의 just right가 right altitude다 (Anthropic 2025)*
- **Tools**: 에이전트와 정보·행동 공간을 잇는 계약이다. self-contained하고 토큰 효율적이며 용도가 명확해야 한다. 가장 흔한 실패는 기능이 겹치는 방대한 tool set이다. 사람도 어느 tool을 쓸지 단정 못 하는 상황이면 에이전트도 마찬가지다.
- **Examples**: edge case를 욱여넣기보다, 기대 행동을 잘 드러내는 다양한 canonical 예시를 큐레이션한다.

### pre-inference retrieval에서 just-in-time으로

글은 에이전트를 "LLM이 loop 안에서 자율적으로 tool을 사용하는 것"으로 단순하게 정의한 뒤, 맥락 설계가 embedding 기반 **pre-inference retrieval**에서 **just-in-time** 전략으로 옮겨가는 흐름을 짚는다. 데이터를 미리 다 처리하는 대신 가벼운 식별자(file path·query·link)만 두고 런타임에 tool로 동적 로드하는 방식이다. Claude Code가 대용량 DB를 전체 로드 없이 `head`·`tail`로 분석하는 것이 대표적인 예다. 파일명·폴더 계층·timestamp 같은 metadata 자체가 신호가 되고(`tests/test_utils.py` vs. `src/core_logic/test_utils.py`), 에이전트는 **progressive disclosure**로 맥락을 층층이 쌓아간다.

물론 트레이드오프가 있다. 런타임 탐색은 느리고, tool 설계가 나쁘면 dead-end에 빠져 context를 낭비한다. 그래서 실전에서는 **hybrid**가 낫다. Claude Code는 CLAUDE.md를 미리 넣어두고 나머지는 `glob`·`grep`으로 just-in-time 검색한다. 전반적인 지침은 "do the simplest thing that works"로 요약된다.

### long-horizon 3대 기법

| 기법 | 원리 | 적합 상황 |
|---|---|---|
| **Compaction** | window 한계 근처 대화를 요약해 새 window로 재출발 (아키텍처 결정·미해결 버그는 보존, 중복 tool 출력은 폐기) | 잦은 back-and-forth로 대화 흐름 유지가 필요한 작업 |
| **Structured note-taking** | context 밖 메모리에 노트를 쓰고 나중에 재로드 (to-do list, NOTES.md) | 명확한 milestone이 있는 반복적 개발 |
| **Sub-agent architecture** | clean context를 가진 하위 에이전트가 수만 토큰 탐색 후 1,000~2,000 토큰 요약만 반환 | 병렬 탐색이 이득인 복잡한 research·분석 |

- Claude Code의 compaction은 압축 context에 최근 접근 파일 5개를 더해 이어간다. 프롬프트는 recall을 먼저 최대화한 뒤 precision을 높이는 순서로 튜닝하는 것이 좋다. 가장 안전한 경량 형태는 tool result clearing이다.
- note-taking 사례로는 Claude의 Pokémon 플레이를 든다. 수천 스텝에 걸쳐 목표·지도·전투 전략을 노트로 유지하다가, context reset 후 자기 노트를 읽고 이어가는 식이다. Sonnet 4.5와 함께 파일 기반 memory tool이 public beta로 공개됐다.

## 결과 (Results)

정량 벤치마크 논문이 아니라 실무 가이드다. 정성적 근거는 두 가지다. 하나는 needle-in-a-haystack 연구로, context rot가 정도 차이는 있어도 모든 모델에서 관찰된다는 점을 드러냈다. 다른 하나는 multi-agent research system인데, 복잡한 research 과제에서 single-agent 대비 실질적인 개선을 보였다.

## 한계 (Limitations)

- context window가 커져도 당분간은 모든 크기의 window가 context pollution과 정보 관련성 문제를 겪는다. 더 큰 window를 기다리는 것은 해법이 아니다.
- compaction이 지나치면 나중에야 중요성이 드러나는 미묘한 맥락을 잃는다.
- 모델이 강해질수록 prescriptive engineering의 필요는 줄어들지만, context를 유한 자원으로 다루는 원칙은 계속 중심에 남는다.

## 관련 페이지 (Related Pages)

- [[agents/lee-hoyeon-2026-harness-engineering]] — Prompt → Context → Harness 3단계 진화. 이 글의 "context engineering"을 harness 관점으로 확장한 한국어 자료
- [[agents/osmani-2026-loop-engineering]] — loop를 설계하는 관점. context 큐레이션이 loop 안에서 반복되는 지점과 맞닿는다
- [[agents/osmani-2026-agent-skills]] — skill로 workflow를 강제하는 접근. just-in-time context·progressive disclosure와 상보적
- [[agents/patel-2026-beyond-the-prompt-claude-code]] — CLAUDE.md·메모리 운영 실전. 이 글의 hybrid 전략(CLAUDE.md 선로딩 + glob/grep)의 구체 사례
