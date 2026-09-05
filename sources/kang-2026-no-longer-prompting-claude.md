---
title: "더 이상 Claude를 프롬프팅하지 않습니다 — 하지만 프롬프트는 여전히 중요합니다"
type: article
year: 2026
category: agents
raw_path: raw/articles/kang-2026-no-longer-prompting-claude.md
raw_filename: "kang-2026-no-longer-prompting-claude.md"
source_collection: external
author: "Sujin Kang (강수진)"
url: "https://www.linkedin.com/posts/sujin-prompt-engineer_promptengineering-loopengineering-contextengineering-activity-7479012981381689344-bFDu"
publisher: "LinkedIn"
tags: [prompt-engineering, context-engineering, harness-engineering, loop-engineering, claude-code, boris-cherny, addy-osmani, mitchell-hashimoto, paradigm-shift]
---

## 한 줄 요약 (One-line Summary)

프롬프트 엔지니어 Sujin Kang이 올린 LinkedIn 카드 포스트. "이제 Claude를 프롬프팅하지 않는다"는 도발적인 제목 아래, 최적화의 단위가 지난 4년 동안 **Prompt → Context → Harness → Loop**로 옮겨온 흐름을 한 장에 담았다. 프롬프트가 사라진 게 아니라, 그것을 감싸는 루프 설계로 무게중심이 넘어갔다는 것이다.

## 1. 자료 정보 (Document Information)

- **저자**: Sujin Kang Ph.D. (강수진) — 프롬프트 엔지니어
- **매체**: LinkedIn 게시물 (한국어)
- **원제**: 🟣 더 이상 Claude를 프롬프팅하지 않습니다 >> 하지만 프롬프트는 여전히 중요합니다
- **수집 상태**: LinkedIn 전문 스크래핑 차단으로 raw는 WebFetch 요약본. 원문 카드의 정확한 문장은 사용자가 직접 보강 가능.

## 2. 주요 기여 (Key Contributions)

1. **최적화 단위의 4단계 진화를 하나의 타임라인으로 압축.** 초점이 "Claude를 프롬프팅하는 것"에서 "Claude를 프롬프팅할 루프를 설계하는 것"으로 넘어갔다는 Anthropic Boris Cherny의 발언을 출발점 삼아, 지난 4년의 변화를 Prompt → Context → Harness → Loop로 배열한다.
2. **각 단계에 사람과 시점 라벨을 붙였다.** Context는 Anthropic(2025), Harness는 Mitchell Hashimoto(2026-02), Loop는 Addy Osmani(2026-06-07)로 출처를 밝혀 개념의 계보를 따라갈 수 있게 했다.
3. **루프의 구성 요소와 리스크를 나란히 적었다.** 5+1 구성 요소(automations·worktrees·skills·sub-agents·connectors + external state)와 3대 부채(validation·understanding·cognitive resistance)를 함께 짚어, 도입의 이득과 대가를 같이 보여준다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

**네 단계의 엔지니어링.**

- **Prompt Engineering** — 최적화 대상은 단일 지시(single instruction). 좋은 한 문장을 벼리는 단계다.
- **Context Engineering (2025, Anthropic)** — 대상이 프롬프트 밖의 토큰으로 넓어진다. 무엇을 문맥에 넣고 뺄지가 관건이다.
- **Harness Engineering (2026-02, Mitchell Hashimoto)** — 대상이 실행 환경(execution environment) 자체로 옮겨간다. 모델을 감싸는 도구·루프·상태의 뼈대를 짜는 일이다.
- **Loop Engineering (2026-06-07, Addy Osmani)** — 대상은 오케스트레이션 레이어다. 에이전트를 프롬프팅하는 루프를 설계하는 층위다.

**루프의 5+1 구성 요소.** automations, worktrees, skills, sub-agents, connectors에 external state(외부 지속 상태)가 더해진다. Osmani가 정리한 구성과 궤를 같이한다.

**제목의 역설.** "더 이상 프롬프팅하지 않는다"는 프롬프트를 버린다는 말이 아니다. 사람이 매번 손으로 쓰던 프롬프트를, 루프가 자동으로 만들어 공급하도록 넘긴다는 뜻이다. 그래서 "하지만 프롬프트는 여전히 중요하다"가 부제로 따라붙는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크가 있는 연구 글이 아니라 관점을 정리한 카드 포스트다. 핵심 산출물은 **3대 리스크에 이름을 붙인 것**이다.

- **Validation debt (검증 부채)** — 루프가 내놓는 결과가 늘수록 사람이 일일이 검증하지 못해 쌓이는 부채.
- **Understanding debt (이해 부채)** — 루프가 대신 처리한 과정을 사람이 이해하지 못한 채 넘어가며 쌓이는 부채.
- **Cognitive resistance (인지적 저항)** — 루프에 맡기면서 몸에 배는 편한 수동성, 사고를 덜 하게 되는 쪽으로의 관성.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 짧은 카드 포스트라 각 단계의 근거와 사례가 축약돼 있다. 계보의 출처(Cherny·Hashimoto·Osmani)는 밝히지만 세부 논증은 원 출처를 따라가야 한다.
- 수집본이 LinkedIn 요약이라 저자 고유의 표현과 뉘앙스가 일부 빠졌다. 정밀 인용이 필요하면 원문을 보강해야 한다.
- 3대 부채는 이름을 붙이는 데 그치고 완화 방법은 내놓지 않는다. 이 부분은 Osmani·Runkle 등 관련 자료에서 보충된다.

## 6. 관련 연구 (Related Work)

- Addy Osmani, *Loop Engineering* (2026-06-07) — Loop의 원 출처. 5+1 구성 요소와 3대 한계를 정식으로 정리했다.
- Jeongmin Lee의 LinkedIn 포스트 — 같은 Cherny·Steinberger·Osmani 계보를 RLM 이론에 묶은 한국어 카드 포스트. 본 글과 거의 자매편이다.
- 이호연 *Harness Engineering* — Prompt → Context → Harness 진화를 강의 슬라이드로 풀어낸 한국어 자료.
- Sydney Runkle, *The Art of Loop Engineering* (LangChain) — loop를 4단계 루프 스택으로 나눠 도구에 매핑했다.

## 7. 용어집 (Glossary)

- **Prompt Engineering**: 모델에 주는 단일 지시문을 다듬어 성능을 끌어올리는 일.
- **Context Engineering**: 프롬프트 바깥의 문맥 토큰(문서·기억·도구 출력 등)을 골라 배치하는 일.
- **Harness**: LLM을 감싸 실제 작업을 수행하게 만드는 실행 환경. 도구·루프·상태·가드레일의 뼈대다.
- **Loop Engineering**: 에이전트를 프롬프팅하는 루프(오케스트레이션 레이어) 자체를 설계 대상으로 삼는 접근.
- **Validation debt / Understanding debt**: 루프 자동화가 늘수록 사람이 검증·이해하지 못한 채 쌓이는 부채.
