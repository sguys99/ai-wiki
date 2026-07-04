---
title: "Effective Context Engineering for AI Agents"
type: article
year: 2025
category: agents
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

## 한 줄 요약 (One-line Summary)

context engineering을 prompt engineering의 다음 단계로 정의하고, 유한한 attention budget 안에서 "원하는 결과를 낼 확률을 높이는 high-signal 토큰의 최소 집합"을 찾는 원칙과, long-horizon 작업을 위한 세 가지 기법(compaction·structured note-taking·sub-agent)을 정리한 Anthropic Applied AI 팀의 실무 가이드.

## 1. 자료 정보 (Document Information)

- **제목**: Effective Context Engineering for AI Agents
- **저자**: Prithvi Rajasekaran, Ethan Dixon, Carly Ryan, Jeremy Hadfield (Anthropic Applied AI 팀), 기여: Rafi Ayub, Hannah Moran, Cal Rueb, Connor Jennings
- **발행**: Anthropic Engineering 블로그, 2025-09-29
- **유형**: article (엔지니어링 실무 가이드)
- **원문 URL**: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

## 2. 주요 기여 (Key Contributions)

- **용어 정립**: prompt engineering은 프롬프트(특히 system prompt)를 잘 쓰는 법이고, **context engineering**은 추론 과정에서 context window에 들어갈 토큰 전체(system instruction·tools·MCP·external data·message history)를 큐레이션·유지하는 전략이라고 구분한다. context engineering을 prompt engineering의 자연스러운 확장으로 본다.
- **핵심 원칙**: LLM의 attention budget은 유한하므로, 좋은 context engineering은 "원하는 결과의 확률을 최대화하는 high-signal 토큰의 **최소 집합**"을 찾는 일이다.
- **context rot 개념**: context window의 토큰 수가 늘수록 recall 정확도가 떨어진다. transformer의 구조적 제약(n개 토큰의 n² pairwise 관계)과 짧은 시퀀스 위주의 학습 분포에서 비롯되며, 급격한 절벽이 아니라 완만한 performance gradient로 나타난다.
- **long-horizon 3대 기법**: compaction, structured note-taking, sub-agent architecture를 context pollution 대응책으로 제시하고 각각의 적합한 상황을 정리한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### context의 구성 요소별 지침 (anatomy of effective context)

- **System prompt**: "right altitude(적정 고도)"를 지향한다. 한쪽 극단은 취약한 if-else 하드코딩이고, 반대쪽 극단은 지나치게 막연하거나 공유 맥락을 잘못 가정하는 프롬프트다. 그 사이 균형점, 곧 행동을 이끌 만큼 구체적이면서도 강한 heuristic을 줄 만큼 유연한 지점을 노린다. `<background_information>`·`<instructions>`·`## Tool guidance` 같은 섹션 구분(XML 태그·Markdown 헤더)을 권장하되, 모델이 강해질수록 포맷의 비중은 줄어든다. minimal은 짧다는 뜻이 아니라 기대 행동을 온전히 규정하는 최소량이다.
- **Tools**: 에이전트와 정보/행동 공간을 잇는 계약이다. 토큰 효율적이고 self-contained하며, 에러에 강하고 용도가 명확해야 한다. 가장 흔한 실패는 기능이 겹치거나 지나치게 방대한 tool set이다. 사람 엔지니어조차 어느 tool을 써야 할지 못 고르면 에이전트도 못 고른다.
- **Examples (few-shot)**: 여전히 강력히 권장한다. 다만 온갖 edge case를 프롬프트에 욱여넣지 말고, 기대 행동을 잘 드러내는 다양한 canonical 예시를 큐레이션한다. 예시는 LLM에게 "천 마디 말에 해당하는 그림"이다.

### context retrieval: pre-inference vs. just-in-time

- 에이전트의 단순 정의: "LLM이 loop 안에서 자율적으로 tool을 사용하는 것."
- 기존 embedding 기반 pre-inference retrieval에서 **"just in time" 전략**으로 옮겨가는 흐름을 짚는다. 모든 데이터를 미리 처리하는 대신 가벼운 식별자(file path·stored query·web link)만 들고 있다가 런타임에 tool로 동적으로 로드한다. Claude Code가 대용량 DB 분석에서 `head`·`tail` 같은 Bash로 전체 객체를 올리지 않고 처리하는 방식이 그 예다. 파일시스템·북마크로 외부에 색인해 두었다가 필요할 때 꺼내 쓰는 인간 인지와 닮았다.
- 파일명·폴더 계층·naming convention·timestamp 같은 metadata 자체가 행동을 정제하는 신호가 된다(예: `tests/test_utils.py`와 `src/core_logic/test_utils.py`의 의미 차이).
- **progressive disclosure**: 에이전트가 탐색하며 필요한 맥락을 점진적으로 발견하고, working memory에는 그때그때 필요한 것만 남긴다. 대신 런타임 탐색이 pre-computed 조회보다 느리고, 올바른 tool·heuristic이 없으면 dead-end에 빠져 context를 낭비하는 트레이드오프가 따른다.
- **hybrid 전략**: 속도를 위해 일부는 미리 로드하고 나머지는 자율 탐색에 맡긴다. Claude Code가 CLAUDE.md는 미리 넣고 `glob`·`grep`으로 just-in-time 검색하는 것이 그 예다. 법률·금융처럼 덜 동적인 맥락일수록 hybrid가 잘 맞는다. 큰 원칙은 "do the simplest thing that works" 하나다.

### long-horizon 작업 3대 기법

- **Compaction**: context window 한계에 다다른 대화를 요약해 새 window로 재출발한다. 아키텍처 결정·미해결 버그·구현 세부는 보존하고 중복 tool 출력은 버린다. Claude Code는 압축 context에 최근 접근 파일 5개를 더해 이어간다. recall을 먼저 최대화한 뒤 precision을 높이는 방향으로 프롬프트를 튜닝하라. 가장 안전한 경량 형태는 tool result clearing(Claude Developer Platform 기능).
- **Structured note-taking (agentic memory)**: 에이전트가 context window 밖 메모리에 노트를 적어 두었다가 나중에 다시 불러온다. Claude Code의 to-do list, 커스텀 에이전트의 NOTES.md가 그 예다. Claude가 Pokémon을 플레이할 때 수천 스텝에 걸쳐 목표·지도·전투 전략을 노트로 남기다가 context reset 후 자기 노트를 읽고 multi-hour 시퀀스를 이어간 사례를 든다. Sonnet 4.5 출시와 함께 파일 기반 memory tool을 public beta로 공개했다.
- **Sub-agent architecture**: 하나의 에이전트가 전체 상태를 떠안는 대신, 깨끗한 context window를 가진 specialized sub-agent들이 집중된 작업을 나눠 맡는다. 각 sub-agent는 수만 토큰을 써 탐색하되 1,000~2,000 토큰의 요약만 돌려준다. 상세 검색 맥락은 sub-agent 안에 가두고, lead agent는 종합·분석에 집중한다(multi-agent research system 사례).

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- 정량 벤치마크 논문이 아니라 실무 가이드다. 정성적 근거로 다음을 인용한다.
  - needle-in-a-haystack 벤치마킹 연구가 **context rot**(토큰 증가 → recall 감소)를 드러냈고, 정도 차이는 있으나 모든 모델에서 관찰된다.
  - multi-agent research system이 복잡한 research 과제에서 single-agent 대비 실질적 개선을 보였다("How we built our multi-agent research system" 참조).
- 세 기법의 적합 상황 정리:
  - **Compaction**: 잦은 back-and-forth로 대화 흐름 유지가 필요한 작업.
  - **Note-taking**: 명확한 milestone이 있는 반복적 개발.
  - **Multi-agent**: 병렬 탐색이 이득인 복잡한 research·분석.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- context window가 커져도 당분간은 크기와 무관하게 context pollution·정보 관련성 문제가 남으므로, 더 큰 window를 기다리는 것만으로는 해법이 되지 못한다.
- just-in-time 탐색은 느리고, tool을 잘못 설계하면 context를 낭비할 위험이 있다.
- compaction이 지나치면 나중에야 중요성이 드러나는 미묘한 맥락을 잃기 쉽다.
- 모델이 강해질수록 prescriptive engineering의 필요는 줄고 에이전트 자율성은 커진다. 그래도 context를 유한한 자원으로 다루는 원칙은 계속 중심에 남는다.

## 6. 관련 연구 (Related Work)

- Anthropic 자체 글: "Building effective AI agents"(워크플로우 vs. 에이전트), "Writing tools for AI agents – with AI agents", "How we built our multi-agent research system".
- Claude Developer Platform: memory tool(Sonnet 4.5 public beta), tool result clearing, memory·context management cookbook.
- 본 wiki 내: harness·loop engineering(Team Attention·Addy Osmani 계열), agent skills, Claude Code 운영 가이드(Arpan Patel) 등과 직접 맞닿는다.

## 7. 용어집 (Glossary)

- **Context engineering**: 추론 중 context window에 들어갈 토큰 전체를 큐레이션·유지하는 전략. prompt engineering의 확장.
- **Attention budget**: LLM이 대량 context를 파싱할 때 쓰는 유한한 주의 자원. 토큰이 추가될 때마다 소모된다.
- **Context rot**: 토큰 수가 늘수록 context 내 정보 recall 정확도가 떨어지는 현상.
- **Right altitude**: system prompt가 지향할 적정 고도. 취약한 하드코딩과 지나친 막연함 사이의 균형점.
- **Just-in-time context**: 데이터를 미리 로드하지 않고 가벼운 식별자만 두었다가 런타임에 tool로 동적으로 불러오는 전략.
- **Progressive disclosure**: 에이전트가 탐색으로 맥락을 점진적으로 발견하며 working memory를 최소로 유지하는 방식.
- **Compaction**: window 한계 근처 대화를 요약해 새 context window로 재출발하는 기법.
- **Structured note-taking (agentic memory)**: context 밖 메모리에 노트를 기록·재로드하는 지속 메모리 기법.
- **Sub-agent architecture**: 깨끗한 context를 가진 specialized 하위 에이전트가 작업을 분담하고 요약만 상위로 반환하는 구조.

## 8. 그림 후보 (Figure Candidates)

원문에 도식이 없어 자동 추출(Step 2.5)은 건너뛰고, 사용자가 원문 다이어그램 2장을 직접 캡처해 저장했다(`strategy: manual`).

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | "Prompt engineering vs. context engineering" 대비 도식 | manual | ★ wiki 채택 (요약, concept) |
| fig02 | "Calibrating the system prompt" — right altitude 스펙트럼 | manual | ★ wiki 채택 (method) |
