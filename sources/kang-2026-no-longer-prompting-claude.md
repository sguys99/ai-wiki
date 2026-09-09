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
figures:
  - id: fig01
    file: assets/kang-2026-no-longer-prompting-claude/page-full.png
    raw: raw/articles/kang-2026-no-longer-prompting-claude-figures/page-full.png
    caption: "게시물 원문과 댓글이 함께 담긴 LinkedIn 페이지 캡처"
    strategy: screenshot
    curated: false
---

## 한 줄 요약 (One-line Summary)

Sujin Kang이 LinkedIn에 올린 게시물로, 최적화 단위가 약 4년에 걸쳐 prompt에서 context, harness, loop로 이동해온 흐름을 하나의 타임라인으로 배열한다. 단계마다 제안자와 시점과 소속을 붙이고, 루프의 구성 요소 여섯 가지와 리스크 세 가지에 각각 짧은 정의를 달았으며, 프롬프트 엔지니어링이 소멸했는지에 대한 저자의 답으로 마무리한다.

## 1. 자료 정보 (Document Information)

- **저자**: Sujin Kang Ph.D. (강수진)
- **매체**: LinkedIn 게시물 (한국어)
- **원제**: 더 이상 Claude를 프롬프팅하지 않습니다 >> 하지만 프롬프트는 여전히 중요합니다
- **해시태그**: #promptengineering #loopengineering #contextengineering #AIagents #claudecode #LLM #prompting
- **분량과 형식**: 본문 약 2,800자. 이모지 번호 불릿으로 나눈 목록 구간과 한 문단짜리 서술 구간이 섞여 있다. 절 구분에 헤딩 대신 이모지를 쓴다.
- **수집 상태**: 2026-09-10에 `scripts/fetch_article.py`의 chrome tier로 원문 전문을 다시 수집했다. 이전 판은 `WebFetch` 요약본이었다. 전체 페이지 스크린샷 1장이 `raw/articles/kang-2026-no-longer-prompting-claude-figures/`에 함께 아카이브되어 있다.
- **본문 밖 참고문헌**: 본문에는 링크가 없다. 다만 수집된 스크린샷을 보면 저자 본인이 첫 댓글에 참고 자료 두 건을 달아 두었다. Addy Osmani의 Loop Engineering 블로그 글과 Anthropic의 "Effective context engineering for AI agents"다.

## 2. 주요 기여 (Key Contributions)

1. **최적화 단위의 4단계 이동을 하나의 타임라인으로 배열했다.** 자신의 일이 프롬프트를 쓰는 것이 아니라 Claude를 프롬프팅하는 루프를 설계하는 것이라는 Boris Cherny의 발언을 출발점으로 삼는다. 게시물은 Cherny를 Claude Code를 이끄는 Anthropic 소속으로 적고, 이 발언이 2026년 6월에 "Loop Engineering"이라는 이름을 얻으며 하나의 담론이 되었다고 서술한다.
2. **각 단계에 제안자와 시점과 소속을 붙였다.** context는 2025년 Anthropic의 개념 정리, harness는 2026년 2월 HashiCorp 공동창업자 Mitchell Hashimoto의 제안, loop는 2026년 6월 7일 Google Chrome의 Addy Osmani가 명명한 것으로 표기한다.
3. **루프의 구성 요소 여섯 가지를 역할과 구현 예까지 적었다.** 목록 앞에 "Osmani가 정리한 요소를 요약했습니다"라는 주석을 달아 출처를 밝히고, Claude Code와 Codex 모두 이미 갖춘 요소들이라고 덧붙인다.
4. **리스크 세 가지에 한 줄 정의를 붙였다.** 검증 부채, 이해 부채, 인지적 저항 각각에 어떤 상태를 가리키는지 설명 문장을 하나씩 달았다.
5. **프롬프트 엔지니어링의 소멸 여부에 답하는 결론부를 두었다.** 하위 계층이 사라지지 않고 루프가 그 위에 구조를 추가하는 것이며, 바뀐 것은 프롬프트의 형태와 수명이라는 것이 저자의 결론이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 네 단계의 엔지니어링

게시물은 흐름을 "Prompt → Context → Harness → Loop"로 적고, 이를 약 4년에 걸쳐 최적화 단위가 이동해온 흐름이라고 부른다. 각 단계의 표기는 다음과 같다.

| 단계 | 시점과 제안자 | 게시물이 적은 최적화 대상 |
|---|---|---|
| Prompt Engineering | 표기 없음 | 한 번의 지시문을 최적화. "무엇을 말할 것인가" |
| Context Engineering | 2025년, Anthropic이 개념 정리 | 프롬프트 밖의 모든 토큰 구성을 최적화 |
| Harness Engineering | 2026년 2월, HashiCorp 공동창업자 Mitchell Hashimoto | 도구, 제약, 검증 게이트 등 모델 바깥의 실행 환경을 설계 |
| Loop Engineering | 2026년 6월 7일, Google Chrome의 Addy Osmani | harness를 타이머 위에 올리고, 서브에이전트를 생성하고, 스스로에게 일을 공급하는 오케스트레이션 계층 |

harness 단계에는 "Agent = Model + Harness"라는 등식이 함께 적혀 있다.

### 단계 상승의 방향

게시물은 네 단계의 상승 방향을 괄호 안에 한 줄로 적는다. 설계 대상이 단어에서 맥락으로, 다시 환경으로, 마지막으로 시스템으로 옮겨간다는 것이다. 그 결과로 사람이 설계하는 단위는 커지고 건별 개입은 줄어든다고 서술한다.

### 루프의 구성 요소

소제목은 "루프의 5가지 구성 요소 (+n)"이고 실제 목록은 여섯 항목이다. 여섯 번째 항목만 이름 앞에 더하기 기호가 붙어 있다. 목록 바로 아래에는 Osmani가 정리한 요소를 요약했다는 주석과, Claude Code와 Codex 모두 이미 갖춘 요소들이라는 문장이 붙는다.

| 구성 요소 | 게시물이 적은 역할 | 게시물이 든 구현 예 |
|---|---|---|
| Automations | 스케줄과 이벤트 트리거 | `/loop`, cron, 훅, GitHub Actions |
| Worktrees | 병렬 에이전트의 작업 격리 | 표기 없음 |
| Skills | 재사용 가능한 능력 패키징 | 표기 없음 |
| Sub-agents | 큰 목표의 분해와 위임 | 표기 없음 |
| Connectors | 외부 시스템 연결 | MCP |
| +External State | 실행 간 기억을 유지하는 외부 상태 | 표기 없음 |

### 현장 적용 사례

게시물은 OpenAI가 이미 내부에서 루프를 상시 가동 중이라고 했다며 세 가지 용도를 든다. 이슈 트리아지, CI 실패 요약, 버그 헌팅이다. 이 문장에는 출처 표기가 붙어 있지 않다.

바로 다음 문장에서 게시물은 방향을 바꾼다. 이 개념을 말한 Osmani 자신이 가장 회의적이라는 것이다. 리스크 세 가지는 이 문장에 이어 제시된다.

### 제목의 구성과 결론부

제목은 "더 이상 Claude를 프롬프팅하지 않습니다"와 "하지만 프롬프트는 여전히 중요합니다"를 `>>`로 이어 붙인 형태다. 두 문장 모두 Cherny가 한 말로 소개된다.

결론부에서 게시물은 프롬프트 엔지니어링이 소멸했는지 묻고 전혀 그렇지 않다고 답한다. 근거로 세 문장을 든다. 루프는 프롬프트로 만들어진다는 것, 루프 안의 엉성한 프롬프트는 엉성한 결과물을 더 빠르게 찍어낼 뿐이라는 것, 하위 계층인 프롬프트와 컨텍스트는 사라지지 않고 루프가 그 위에 구조를 추가한다는 것이다.

이어서 바뀐 것이 프롬프트의 형태와 수명이라고 정의한다. 사람이 매 턴 타이핑하는 1회성 지시문이었다면 이제는 시스템에 내장되는 프롬프트로 레버리지가 변했다는 서술이다. 작업의 질문도 "어떻게 말할 것인가"에서 "내가 없는 동안 에이전트가 무엇이 말하게 할 것인가"로 옮겨간다. 게시물은 괄호로 "내가 작업을 보지 않는 동안"이라는 부연을 덧붙인다.

마지막 두 문장이 저자의 최종 입장이다. 루프에서는 프롬프트를 잘못 쓰면 오류가 증폭되는 구조가 되며, 루프를 자동으로 구축하되 직접 프롬프트는 여전히 유효한 균형의 문제라는 것이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크가 있는 연구 글이 아니라 관점을 정리한 게시물이다. 측정 가능한 산출물 대신 이름과 정의로 제시된 항목이 두 묶음 있다.

리스크 세 가지는 이름과 정의가 함께 붙어 있다.

| 리스크 | 게시물이 붙인 정의 |
|---|---|
| 검증 부채 | 에이전트는 증거 없이 "완료"라고 주장한다 |
| 이해 부채 | 내가 쓰지 않은 코드가, 내 이해 속도보다 빠르게 쌓인다 |
| 인지적 저항 | 루프가 주는 결과를 판단 없이 수용하게 되는 상태 |

세 항목 바로 뒤에 결과의 편차를 지적하는 문장이 붙는다. 같은 루프를 두 사람이 돌려도 정반대의 결과가 나온다는 것이다.

결론부의 명제도 검증 대상이 아니라 주장 형태로 제시된다.

| 명제 | 게시물의 서술 |
|---|---|
| 프롬프트 엔지니어링의 존속 | 소멸하지 않았다. 루프는 프롬프트로 만들어진다 |
| 계층 관계 | 하위 계층인 프롬프트와 컨텍스트는 사라지지 않고 루프가 그 위에 구조를 추가한다 |
| 변화의 실체 | 프롬프트의 형태와 수명이 바뀌었다. 1회성 지시문에서 시스템에 내장되는 프롬프트로 레버리지가 이동했다 |
| 실패의 대가 | 루프에서는 프롬프트를 잘못 쓰면 오류가 증폭되는 구조가 된다 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 게시물 본문에 링크와 각주가 없다. Cherny, Hashimoto, Osmani의 발언이 이름과 시점과 소속으로만 표기되고 개별 발언의 원문 인용이 붙어 있지 않다. 참고 자료 두 건은 본문이 아니라 저자 본인의 댓글에 달려 있다.
- OpenAI가 이슈 트리아지, CI 실패 요약, 버그 헌팅에 루프를 상시 가동 중이라는 서술에 출처가 없다. 게시물이 원출처로 지목한 [[agents/osmani-2026-loop-engineering]]은 하루 1회 triage 스킬을 실행하는 가상 시나리오와 Codex 앱 사례만 들고 OpenAI의 사내 상시 가동은 서술하지 않아, 어디서 온 정보인지 확인되지 않는다.
- 리스크 세 가지의 화자가 명확하지 않다. 구성 요소 목록에는 Osmani가 정리한 것을 요약했다는 주석이 붙어 있지만 리스크 목록에는 같은 주석이 없다. 앞 문장이 Osmani의 회의적 태도를 언급하므로 Osmani의 정리로 읽을 여지가 있으나 게시물이 명시하지는 않는다.
- 소제목의 개수와 실제 목록의 개수가 어긋난다. 소제목은 "5가지 구성 요소 (+n)"인데 나열은 여섯 항목이다. 여섯 번째에만 더하기 기호를 붙인 표기를 보면 의도적 구분으로 보이지만, 개수 표기 자체는 목록과 맞지 않는다.
- 세 번째 리스크의 이름과 정의가 서로 다른 방향을 가리킨다. 이름은 인지적 저항인데 정의는 "루프가 주는 결과를 판단 없이 수용하게 되는 상태"로 수동적 수용을 서술한다. 저항과 수용은 반대말이므로 이름만 보고 뜻을 짐작하면 어긋난다.
- Prompt Engineering 단계에만 시점과 제안자 표기가 없다. 나머지 세 단계는 연도와 인물이 붙어 있어 표기 수준이 고르지 않다.
- 게시물의 구성 요소 목록이 Osmani 원문의 요약이므로, 각 요소를 실제로 설계할 때 참고할 세부는 이 게시물에 없다. 원출처를 읽어야 한다.

## 6. 관련 연구 (Related Work)

- Addy Osmani, *Loop Engineering* (2026-06-07). 이 게시물이 loop의 명명자로 지목하고 구성 요소 목록의 출처로 밝힌 자료다. 구성 요소 다섯 가지와 보조 요소 하나, 그리고 한계 세 가지를 본문에서 직접 설명한다.
- Google, *The New SDLC with Vibe* (2026). "Agent = Model + Harness" 등식을 백서 전체의 기준선으로 삼은 자료다. 이 게시물이 harness 단계에 붙인 등식과 같은 문장을 쓴다.
- Jeongmin Lee의 LinkedIn 게시물. Cherny, Steinberger, Osmani 세 사람의 발언을 RLM 이론에 묶은 한국어 게시물로, 같은 계보를 다룬다.
- 이호연, *Harness Engineering* (2026-04-07). harness 단계를 54장 슬라이드로 풀어낸 한국어 자료다.
- Sydney Runkle, *The Art of Loop Engineering* (LangChain). loop를 4단계 루프 스택으로 나눠 도구에 매핑했다.

## 7. 용어집 (Glossary)

- **Prompt Engineering**: 한 번의 지시문을 최적화하는 일. 게시물은 이 단계의 질문을 "무엇을 말할 것인가"로 적는다.
- **Context Engineering**: 프롬프트 밖의 모든 토큰 구성을 최적화하는 접근. 게시물은 2025년 Anthropic이 개념을 정리한 것으로 표기한다.
- **Harness Engineering**: 도구, 제약, 검증 게이트 등 모델 바깥의 실행 환경을 설계하자는 제안. 게시물은 2026년 2월 HashiCorp 공동창업자 Mitchell Hashimoto의 제안으로 표기한다.
- **Loop Engineering**: harness를 타이머 위에 올리고 서브에이전트를 생성하며 스스로에게 일을 공급하는 오케스트레이션 계층. 게시물은 2026년 6월 7일 Google Chrome의 Addy Osmani가 명명한 것으로 표기한다.
- **Agent = Model + Harness**: harness 단계에 함께 적힌 등식. 에이전트가 모델과 실행 환경의 합이라는 뜻이다.
- **External State**: 실행 간 기억을 유지하는 외부 상태. 구성 요소 목록에서 유일하게 이름 앞에 더하기 기호가 붙은 항목이다.
- **검증 부채**: 에이전트가 증거 없이 완료를 주장하는 데서 생기는 부채.
- **이해 부채**: 내가 쓰지 않은 코드가 내 이해 속도보다 빠르게 쌓이는 상태.
- **인지적 저항**: 루프가 주는 결과를 판단 없이 수용하게 되는 상태.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 게시물 원문과 댓글이 함께 담긴 LinkedIn 페이지 캡처 | screenshot | (본문 임베드 제외) |

fig01은 `scripts/fetch_article.py`가 남긴 전체 페이지 캡처다. 본문 상단 절반을 LinkedIn 로그인 모달이 가리고 있어 게시물 텍스트를 읽는 용도로는 쓸 수 없다. 같은 텍스트가 raw 본문에 전부 남아 있으므로 wiki 본문에는 임베드하지 않고 아카이브로만 둔다. 이 캡처의 고유한 값은 본문에 없는 정보 두 가지다. 저자 본인이 첫 댓글에 단 참고 자료 링크 두 건과, 게시물 하단의 반응 수치다.
