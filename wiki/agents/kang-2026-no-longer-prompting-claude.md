---
title: "더 이상 Claude를 프롬프팅하지 않습니다 — 하지만 프롬프트는 여전히 중요합니다"
type: article
year: 2026
category: agents
source: kang-2026-no-longer-prompting-claude.md
raw_path: raw/articles/kang-2026-no-longer-prompting-claude.md
raw_filename: "kang-2026-no-longer-prompting-claude.md"
source_collection: external
author: "Sujin Kang (강수진)"
url: "https://www.linkedin.com/posts/sujin-prompt-engineer_promptengineering-loopengineering-contextengineering-activity-7479012981381689344-bFDu"
publisher: "LinkedIn"
tags: [prompt-engineering, context-engineering, harness-engineering, loop-engineering, claude-code, boris-cherny, addy-osmani, mitchell-hashimoto, paradigm-shift]
---

## 요약 (Summary)

프롬프트 엔지니어 Sujin Kang이 올린 LinkedIn 카드 포스트다. "이제 Claude를 프롬프팅하지 않는다"는 도발적인 제목 아래, 최적화의 무게중심이 4년에 걸쳐 **Prompt → Context → Harness → Loop**로 옮겨온 흐름을 한 장에 담았다. 제목과 달리 프롬프트가 사라졌다는 말은 아니다. 사람이 매번 손으로 쓰던 프롬프트를 이제 루프가 대신 만들어 공급할 뿐, 좋은 프롬프트의 가치는 그대로다. 부제가 "하지만 프롬프트는 여전히 중요합니다"로 붙은 이유가 여기 있다.

> **수집 메모**: LinkedIn 전문 스크래핑 차단으로 raw는 WebFetch 요약본이다. 원문 카드의 정확한 문장·이미지는 사용자 보강 여지가 있다.

## 주요 기여 (Key Contributions)

- **4단계 진화를 한 타임라인으로.** 초점이 "Claude를 프롬프팅하는 것"에서 "Claude를 프롬프팅할 루프를 설계하는 것"으로 넘어갔다는 Anthropic Boris Cherny의 발언을 출발점 삼아, 지난 4년을 Prompt → Context → Harness → Loop로 배열한다.
- **개념마다 사람과 시점을 박았다.** Context는 Anthropic(2025), Harness는 Mitchell Hashimoto(2026-02), Loop는 Addy Osmani(2026-06-07). 계보를 되짚을 수 있도록 출처를 밝혔다.
- **이득과 대가를 나란히.** 루프의 5+1 구성 요소와 3대 부채를 함께 놓으니, 자동화가 무엇을 주고 무엇을 앗아가는지 한눈에 대비된다.

## 방법론 및 아키텍처 (Methodology and Architecture)

네 단계는 무엇을 최적화 대상으로 삼느냐에 따라 갈린다.

| 단계 | 시점·제안자 | 최적화 대상 |
|---|---|---|
| **Prompt Engineering** | — | 단일 지시(single instruction) |
| **Context Engineering** | 2025, Anthropic | 프롬프트 밖의 문맥 토큰 |
| **Harness Engineering** | 2026-02, Mitchell Hashimoto | 실행 환경(execution environment) |
| **Loop Engineering** | 2026-06-07, Addy Osmani | 오케스트레이션 레이어(루프) |

**루프의 5+1 구성 요소**는 automations, worktrees, skills, sub-agents, connectors, 그리고 external state(외부 지속 상태)다. Osmani가 정리한 구성과 궤를 같이한다.

제목의 역설이 이 글의 핵심이다. "더 이상 프롬프팅하지 않는다"는 프롬프트를 버린다는 말이 아니라, 사람이 매번 쓰던 일을 루프에 맡긴다는 뜻이다. 무게중심이 문장 한 줄에서 그 문장을 자동으로 만들어내는 루프 구조로 옮겨갔을 뿐이다.

## 결과 (Results)

정량 벤치마크 대신 이 글이 내놓는 결과물은 루프 시대가 치르는 **3대 부채의 명명**이다.

- **Validation debt (검증 부채)** — 루프가 쏟아내는 결과를 사람이 다 검증하지 못한 채 쌓인다.
- **Understanding debt (이해 부채)** — 루프가 대신 처리한 과정을 이해하지 못하고 넘어가며 누적된다.
- **Cognitive resistance (인지적 저항)** — 위임이 주는 편안한 수동성, 사고를 덜 하게 되는 관성.

이름을 붙이는 데서 멈출 뿐 완화책까지 내놓지는 않는다. 그 공백은 아래 관련 페이지들이 메운다.

## 관련 페이지 (Related Pages)

- [[agents/lee-jeongmin-2026-loop-engineering-claude-code]] — 같은 Cherny·Steinberger·Osmani 계보를 다룬 한국어 LinkedIn 카드 포스트. 본 글과 거의 자매편이고, 그쪽은 RLM 이론까지 끌어온다.
- [[agents/osmani-2026-loop-engineering]] — Loop Engineering의 원 출처. 5+1 구성 요소와 3대 한계의 정식 정리.
- [[agents/lee-hoyeon-2026-harness-engineering]] — Prompt → Context → Harness 진화를 강의 슬라이드로 풀어낸 한국어 자료.
- [[agents/runkle-2026-the-art-of-loop-engineering]] — 4단계 루프 스택으로 loop를 LangChain 도구에 매핑.
- [[overviews/agent-harness-engineering-overview]] — Skills·Loop·Harness·Verification을 한 지도로 묶은 개괄.
