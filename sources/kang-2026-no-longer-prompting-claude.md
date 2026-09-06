---
title: "더 이상 Claude를 프롬프팅하지 않습니다 >> 하지만 프롬프트는 여전히 중요합니다"
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

Sujin Kang이 LinkedIn에 올린 짧은 게시물로, 최적화의 단위가 약 4년에 걸쳐 prompt에서 context, harness, loop로 옮겨온 흐름을 하나의 타임라인으로 배열한다. 단계마다 제안자와 시점을 붙이고, 루프의 구성 요소와 세 가지 리스크를 함께 적었다.

## 1. 자료 정보 (Document Information)

- **저자**: Sujin Kang Ph.D. (강수진)
- **매체**: LinkedIn 게시물 (한국어)
- **원제**: 🟣 더 이상 Claude를 프롬프팅하지 않습니다 >> 하지만 프롬프트는 여전히 중요합니다.
- **해시태그**: #promptengineering #loopengineering #contextengineering #AIagents #claudecode #LLM #prompting
- **수집 상태**: LinkedIn이 게시물 전문 스크래핑을 차단해 raw는 WebFetch가 돌려준 요약본이다. 따라서 아래 내용은 원문의 요지이고, 저자의 실제 문장과 게시물에 포함된 이미지는 수집되지 않았다.

## 2. 주요 기여 (Key Contributions)

1. **최적화 단위의 4단계 이동을 하나의 타임라인으로 배열했다.** 초점이 "Claude를 프롬프팅하는 것"에서 "Claude를 프롬프팅하기 위한 루프를 설계하는 것"으로 옮겨갔다는 Anthropic Boris Cherny의 언급을 출발점으로 삼아, 약 4년의 변화를 prompt에서 context, harness, loop 순서로 놓았다.
2. **각 단계에 제안자와 시점 라벨을 붙였다.** context는 Anthropic(2025), harness는 Mitchell Hashimoto(2026년 2월), loop는 Addy Osmani(2026년 6월 7일)로 출처를 표기해 개념의 계보를 따라갈 수 있게 했다.
3. **루프의 구성 요소와 리스크를 같은 게시물에 나란히 적었다.** 구성 요소 목록과 리스크 세 가지를 함께 제시해, 도입의 내용과 대가를 한자리에서 보여준다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 네 단계의 엔지니어링

수집된 요약이 전하는 각 단계의 정의는 다음과 같다.

| 단계 | 시점과 제안자 | 최적화 대상 |
|---|---|---|
| Prompt Engineering | 표기 없음 | 단일 지시(single instruction) |
| Context Engineering | 2025, Anthropic | 프롬프트 바깥의 토큰 |
| Harness Engineering | 2026년 2월, Mitchell Hashimoto | 실행 환경(execution environment) |
| Loop Engineering | 2026년 6월 7일, Addy Osmani | 오케스트레이션 레이어 |

게시물은 이 배열 자체를 "약 4년에 걸친 최적화 단위의 이동"이라고 부른다. 그리고 loop engineering이 개념으로 등장한 시점을 2026년 6월로 적었다.

### 루프의 구성 요소

게시물은 루프 구성 요소를 automations, worktrees, skills, sub-agents, connectors로 들고, 여기에 external state를 덧붙인다. 수집본의 소제목은 "다섯 가지 루프 구성 요소"인데 실제 목록은 다섯 개에 external state가 더해진 형태다.

### 제목의 구성

제목은 "더 이상 Claude를 프롬프팅하지 않습니다"와 "하지만 프롬프트는 여전히 중요합니다"를 붙여 놓았다. Cherny의 언급을 그대로 따르면 프롬프팅 자체가 없어지는 것이 아니라 프롬프팅을 수행하는 주체가 사람에서 루프로 옮겨간다. 부제가 뒤에 붙은 이유도 같은 맥락이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크가 있는 연구 글이 아니라 관점을 정리한 게시물이다. 수집본이 전하는 산출물은 리스크 세 가지에 이름을 붙인 것이다.

| 리스크 | 게시물이 붙인 한글 표기 |
|---|---|
| Validation debt | 검증 부채 |
| Understanding debt | 이해 부채 |
| Cognitive resistance | 인지적 저항 |

수집본은 세 항목의 이름과 한글 표기만 전하고 각각의 정의나 사례는 담고 있지 않다. 원문에 설명이 있었는지는 이 수집본으로 확인할 수 없다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 수집본이 LinkedIn 요약이라 저자의 실제 문장과 이미지가 빠져 있다. 정밀 인용이 필요하면 원문을 다시 수집해야 한다.
- 리스크 세 가지는 이름만 남아 있어 정의와 완화 방법을 이 자료만으로 알 수 없다. 관련 자료에서 보충해야 한다.
- 계보의 출처(Cherny, Hashimoto, Osmani)는 이름과 시점으로만 표기되고 개별 발언의 링크나 원문 인용이 붙어 있지 않다.
- Harness Engineering을 Mitchell Hashimoto의 2026년 2월 제안으로 보는 배열은 이 wiki 안에서 이 자료가 유일한 근거다. 다른 harness 자료는 같은 attribution을 담고 있지 않다.

## 6. 관련 연구 (Related Work)

- Addy Osmani, *Loop Engineering* (2026-06-07). 이 게시물이 loop의 제안자로 지목한 자료다. 구성 요소 다섯 가지와 보조 요소 하나, 그리고 한계 세 가지를 본문에서 직접 설명한다.
- Jeongmin Lee의 LinkedIn 게시물. Cherny, Steinberger, Osmani 세 사람의 발언을 RLM 이론에 묶은 한국어 게시물로, 같은 계보를 다룬다.
- 이호연, *Harness Engineering* (2026-04-07). harness 단계를 54장 슬라이드로 풀어낸 한국어 자료다.
- Sydney Runkle, *The Art of Loop Engineering* (LangChain). loop를 4단계 루프 스택으로 나눠 도구에 매핑했다.

## 7. 용어집 (Glossary)

- **Prompt Engineering**: 모델에 주는 단일 지시를 다듬어 성능을 올리는 일. 이 게시물이 첫 단계로 놓은 항목이다.
- **Context Engineering**: 프롬프트 바깥의 토큰을 최적화 대상으로 삼는 접근. 게시물은 이를 Anthropic이 2025년에 제시한 개념으로 표기한다.
- **Harness Engineering**: 실행 환경 자체를 설계 대상으로 삼자는 제안. 게시물은 Mitchell Hashimoto가 2026년 2월에 내놓은 것으로 표기한다.
- **Loop Engineering**: 오케스트레이션 레이어를 가리키는 용어. 게시물은 Addy Osmani가 2026년 6월 7일에 쓴 것으로 표기한다.
- **External state**: 루프 구성 요소 목록에서 다섯 항목 뒤에 덧붙은 항목.
- **Validation debt / Understanding debt / Cognitive resistance**: 게시물이 지목한 세 가지 리스크의 이름. 수집본에는 이름과 한글 표기만 남아 있다.
