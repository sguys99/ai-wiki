---
title: "더 이상 Claude를 프롬프팅하지 않습니다 >> 하지만 프롬프트는 여전히 중요합니다"
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

## 요약

Sujin Kang이 LinkedIn에 올린 짧은 게시물로, AI 코딩 에이전트를 다룰 때 무엇을 최적화하는지가 약 4년 동안 네 단계를 거쳐 옮겨왔다는 진단을 하나의 타임라인으로 배열한다. 순서는 prompt에서 context로, 다시 harness로, 마지막으로 loop다.

이 자료의 값은 새 기법을 제안하는 데 있지 않고 이미 흩어져 있던 네 개념에 순서와 좌표를 부여하는 데 있다. 각 단계에 제안자와 시점이 붙어 있어, 개념의 계보를 따라가려는 독자가 어느 자료부터 읽어야 하는지 판단할 수 있다. 이 wiki에서는 [[overviews/prompt-to-loop-engineering-evolution-overview]]가 그 배열을 그대로 채택해 4단계 진화 지도의 골격으로 삼는다.

제목은 두 문장이 붙은 형태다. 앞 문장이 "더 이상 Claude를 프롬프팅하지 않습니다"이고 뒤 문장이 "하지만 프롬프트는 여전히 중요합니다"다. 뒤 문장이 앞 문장의 범위를 제한한다. 프롬프트가 없어진다는 뜻이 아니라 프롬프트를 공급하는 주체가 바뀐다는 뜻이다.

> **수집 상태 안내**: LinkedIn이 게시물 전문 스크래핑을 차단해 raw는 WebFetch가 돌려준 요약본이다. 아래 서술은 그 요약본이 담고 있는 범위 안에서만 이 게시물의 주장으로 표기하고, 그 밖의 내용은 출처가 되는 다른 wiki 페이지를 명시해 구분했다.

## 배경

이 게시물의 출발점은 Anthropic의 Boris Cherny가 남긴 한 문장이다. 초점이 "Claude를 프롬프팅하는 것"에서 "Claude를 프롬프팅하기 위한 루프를 설계하는 것"으로 옮겨갔다는 언급이다. 설계 대상이 문장에서 그 문장을 만들어내는 구조로 한 칸 바깥으로 나갔다는 진술이다.

이 진술을 받아 게시물은 같은 종류의 이동이 이번이 처음이 아니라고 본다. 최적화 대상이 바깥으로 밀려나는 일이 약 4년 동안 세 번 더 있었고, 그 궤적을 이으면 하나의 타임라인이 된다는 것이다. loop engineering은 그 타임라인의 마지막 칸이고, 게시물은 이 개념이 등장한 시점을 2026년 6월로 적었다.

타임라인의 형태를 취한 덕분에 이 게시물은 개별 개념 소개와 다른 기능을 한다. 어떤 기법이 좋은지를 논하는 대신, 각 기법이 어떤 문제를 이어받았는지를 위치로 보여준다. 앞 단계의 한계가 다음 단계를 부른 순서라서, 뒤 단계를 읽을 때 앞 단계를 전제로 삼을 수 있다.

## 핵심 개념

prompt engineering은 모델에 주는 단일 지시를 다듬어 성능을 올리는 일이다. 최적화 대상이 사람이 직접 타이핑하는 한 덩어리의 텍스트로 한정된다.

context engineering은 프롬프트 바깥의 토큰까지 최적화 대상으로 넓힌 접근이다. 같은 지시를 주더라도 함께 들어가는 문서, 이전 대화, 도구 출력이 결과를 바꾸므로, 무엇을 컨텍스트에 넣고 뺄지가 설계 문제가 된다. 게시물은 이를 Anthropic이 2025년에 제시한 개념으로 표기한다.

harness는 모델을 감싸 도구, 검증, 상태를 제공하는 실행 환경이다. harness engineering은 그 실행 환경 자체를 설계 대상으로 삼자는 제안이며, 게시물은 Mitchell Hashimoto가 2026년 2월에 내놓은 것으로 표기한다.

loop engineering은 에이전트를 반복 구동하는 루프 자체를 설계 대상으로 삼는 관점이다. 게시물은 이 용어가 오케스트레이션 레이어를 가리키며 Addy Osmani가 2026년 6월 7일에 쓴 것이라고 표기한다.

## 네 단계 진화

### 단계별 최적화 대상

게시물이 각 단계에 붙인 라벨은 다음과 같다. 시점과 제안자 표기는 게시물 자체의 표기를 그대로 옮긴 것이다.

| 단계 | 시점과 제안자 | 최적화 대상 |
|---|---|---|
| Prompt Engineering | 표기 없음 | 단일 지시(single instruction) |
| Context Engineering | 2025, Anthropic | 프롬프트 바깥의 토큰 |
| Harness Engineering | 2026년 2월, Mitchell Hashimoto | 실행 환경(execution environment) |
| Loop Engineering | 2026년 6월 7일, Addy Osmani | 오케스트레이션 레이어 |

게시물은 이 네 칸 전체를 "약 4년에 걸친 최적화 단위의 이동"이라고 부른다. 네 단계가 서로 대체 관계가 아니라 시간 순서로 놓였다는 뜻이다.

### 단계가 바뀔 때 달라지는 것

네 정의를 나란히 놓으면 이동의 방향이 한 가지로 읽힌다. 설계자가 손대는 범위가 매번 한 겹씩 바깥으로 나간다는 것이다. 각 단계의 최적화 대상을 그 대상이 놓인 위치로 바꿔 적으면 다음과 같이 정리된다.

| 단계 | 설계자가 직접 쓰는 것 | 설계 범위의 경계 |
|---|---|---|
| Prompt Engineering | 지시 문장 | 한 번의 요청 안 |
| Context Engineering | 지시 문장과 함께 들어갈 토큰 | 한 번의 요청에 담기는 컨텍스트 전체 |
| Harness Engineering | 모델이 일할 실행 환경 | 도구, 검증, 상태를 포함한 작업 환경 |
| Loop Engineering | 요청 자체를 만들어내는 루프 | 반복되는 여러 번의 요청 |

마지막 칸에서 성격이 한 번 더 바뀐다. 앞의 세 단계는 요청 한 번을 어떻게 잘 만들지를 다루지만, loop 단계는 요청이 여러 번 반복되는 구조를 다룬다. 사람이 매번 요청을 공급하지 않아도 순환이 이어지는 지점이 여기다.

### 제목의 구성

제목의 앞뒤 문장이 서로 다른 것을 말한다는 점이 이 게시물의 논지를 압축한다. "더 이상 프롬프팅하지 않는다"가 부정하는 것은 프롬프트의 가치가 아니라 사람이 매번 프롬프트를 직접 공급하는 방식이다. Cherny의 표현을 그대로 따르면 루프가 Claude를 프롬프팅하므로, 프롬프트는 여전히 시스템 안에서 만들어지고 쓰인다.

그래서 뒤 문장 "하지만 프롬프트는 여전히 중요합니다"가 부제로 따라붙는다. 최적화 대상이 바깥으로 나갔다고 해서 안쪽 칸이 사라지지 않는다는 것이 타임라인 전체에 걸친 전제이기도 하다.

## 루프의 구성 요소

### 게시물이 든 목록

게시물은 루프를 이루는 요소로 automations, worktrees, skills, sub-agents, connectors를 들고, 여기에 external state를 덧붙인다. 수집본의 소제목은 "다섯 가지 루프 구성 요소"인데 실제 목록은 다섯 개에 external state가 더해진 형태다. 여섯 번째 항목만 앞에 더하기 기호가 붙어 있어, 성격이 다른 보조 항목으로 취급된 것으로 보인다.

수집본은 각 항목의 역할을 설명하지 않고 이름만 나열한다. 항목별 역할은 게시물이 원출처로 지목한 [[agents/osmani-2026-loop-engineering]]에서 확인할 수 있다.

### 원출처 자료와의 대조

두 자료의 목록을 나란히 놓으면 항목이 거의 그대로 대응한다. 아래 표의 역할 열은 게시물이 아니라 Osmani 페이지가 서술하는 내용이다.

| 게시물의 항목 | Osmani 페이지의 대응 항목 | 역할 (Osmani 페이지 기준) |
|---|---|---|
| Automations | Automations | 예약된 발견과 분류를 사람 개입 없이 수행 |
| Worktrees | Worktrees | 병렬 실행 에이전트 사이의 파일 충돌 차단 |
| Skills | Skills | 프로젝트 지식을 문서로 고정해 재유도 반복 제거 |
| Sub-agents | Sub-agents | 구현 기능과 평가 기능의 분리 |
| Connectors | Plugins와 Connectors | 파일시스템 바깥 시스템과의 통합 |
| External state | Persistent state | 실행 사이의 컨텍스트 보존 |

차이는 두 군데다. 다섯 번째 항목을 Osmani 페이지는 플러그인과 커넥터를 묶어 부르고 게시물은 커넥터만 적었다. 여섯 번째 항목의 이름도 external state와 persistent state로 갈린다. 두 이름이 강조하는 지점이 다른데, 앞은 저장 위치가 모델 바깥이라는 점을 가리키고 뒤는 실행과 실행 사이에 값이 남는다는 점을 가리킨다.

이 대조가 알려주는 것은 게시물의 목록이 독자적 분류가 아니라 원출처의 요약이라는 사실이다. 따라서 구성 요소를 실제로 설계할 때는 이 페이지가 아니라 Osmani 페이지를 읽어야 한다.

## 세 가지 리스크

### 이름만 제시된 세 항목

게시물은 루프로 옮겨가면서 생기는 리스크 세 가지에 이름을 붙인다. 수집본이 전하는 것은 원어 이름과 한글 표기까지다.

| 리스크 | 게시물이 붙인 한글 표기 |
|---|---|
| Validation debt | 검증 부채 |
| Understanding debt | 이해 부채 |
| Cognitive resistance | 인지적 저항 |

세 항목의 정의, 발생 조건, 완화 방법은 수집본에 담겨 있지 않다. 원문에 설명이 있었는지도 이 수집본으로는 확인할 수 없다. 그러므로 이 페이지에서 세 이름은 확정된 개념이 아니라 참조점으로 다루는 것이 안전하다.

### 인접 자료에서 찾을 수 있는 대응 항목

게시물이 원출처로 지목한 Osmani 페이지도 한계를 세 가지로 정리한다. 두 목록이 같은 것을 가리키는지 확인하려면 이름을 대조해 볼 수 있다. 아래 표의 오른쪽 두 열은 게시물의 주장이 아니라 [[agents/osmani-2026-loop-engineering]]의 서술이다.

| 게시물의 이름 | Osmani 페이지의 항목 | 대응 여부 |
|---|---|---|
| Validation debt | verification 부담. 사람이 지켜보지 않는 루프는 사람이 지켜보지 않는 실수도 만든다 | 검증 책임이 사람에게 남는다는 점에서 같은 문제로 읽힌다 |
| Understanding debt | comprehension debt. 배포된 시스템과 개발자의 이해 사이에 벌어지는 격차 | 이름과 내용이 모두 대응한다 |
| Cognitive resistance | comfortable passivity. 실행의 편리함이 비판적 검토를 무디게 만드는 상태 | 대응이 불확실하다. 저항과 수동성은 서로 반대 방향을 가리키는 말이다 |

앞의 두 항목은 이름과 문제 구조가 맞물린다. 세 번째는 그렇지 않다. Osmani 페이지의 comfortable passivity가 검토를 게을리하게 되는 상태를 가리키는 반면, cognitive resistance는 문자 그대로 읽으면 변화를 받아들이지 않으려는 저항에 가깝다. 수집본에 정의가 없으므로 둘 중 어느 뜻인지 이 자료만으로 판정할 수 없다.

## 한계

이 자료를 인용할 때 유의할 제약은 네 가지다.

- **수집본이 요약이다.** LinkedIn 전문 스크래핑이 차단되어 저자의 실제 문장과 게시물 이미지가 남아 있지 않다. 정밀 인용이 필요하면 원문을 다시 수집해야 한다.
- **리스크 세 가지에 정의가 없다.** 이름만 남아 있어 이 자료만으로는 개념을 확정할 수 없다.
- **계보 출처에 링크가 없다.** Cherny, Hashimoto, Osmani의 발언이 이름과 시점으로만 표기되고 개별 원문 인용이 붙어 있지 않다.
- **harness 단계의 attribution이 단일 근거다.** harness engineering을 Mitchell Hashimoto의 2026년 2월 제안으로 보는 배열은 이 wiki 안에서 이 자료가 유일한 근거다. 같은 주제를 다루는 [[agents/lee-hoyeon-2026-harness-engineering]]은 이 attribution을 담고 있지 않고, [[overviews/prompt-to-loop-engineering-evolution-overview]]의 표기도 이 게시물에서 가져온 것이다. 따라서 이 항목은 교차 검증되지 않은 상태다.

이 제약을 감안하면 이 자료는 개념을 배우는 곳이 아니라 순서를 잡는 곳으로 쓰는 편이 맞다. 네 단계의 이름과 위치를 확인한 뒤, 각 단계의 내용은 아래 관련 페이지에서 읽는 방식이다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| prompt engineering | 모델에 주는 단일 지시를 다듬어 성능을 올리는 일. 타임라인의 첫 단계다 |
| context engineering | 프롬프트 바깥의 토큰까지 최적화 대상으로 넓힌 접근. 게시물은 Anthropic이 2025년에 제시한 개념으로 표기한다 |
| harness engineering | 모델이 일할 실행 환경 자체를 설계 대상으로 삼자는 제안. 게시물은 Mitchell Hashimoto의 2026년 2월 제안으로 표기한다 |
| loop engineering | 에이전트를 반복 구동하는 루프 자체를 설계 대상으로 삼는 관점. 게시물은 Addy Osmani가 2026년 6월 7일에 쓴 용어로 표기한다 |
| external state | 게시물의 루프 구성 요소 목록에서 다섯 항목 뒤에 덧붙은 여섯 번째 항목. Osmani 페이지의 persistent state에 대응한다 |
| validation debt / understanding debt / cognitive resistance | 게시물이 지목한 세 가지 리스크의 이름. 수집본에는 이름과 한글 표기만 남아 있다 |

## 관련 페이지

- [[overviews/prompt-to-loop-engineering-evolution-overview]]: 이 게시물의 4단계 배열을 골격으로 삼은 최상위 진입점. 각 단계를 wiki 자료로 채워 넣은 지도라서, 순서만 확인한 뒤 내용을 읽으러 갈 곳이다.
- [[agents/osmani-2026-loop-engineering]]: 게시물이 loop의 제안자로 지목한 원출처. 구성 요소 여섯 가지와 한계 세 가지를 본문에서 직접 설명하므로, 이 페이지가 이름만 든 항목의 내용이 여기에 있다.
- [[agents/lee-hoyeon-2026-harness-engineering]]: harness 단계를 54장 슬라이드로 풀어낸 한국어 자료. 다만 harness engineering을 Hashimoto의 제안으로 보는 attribution은 담고 있지 않다.
- [[agents/lee-jeongmin-2026-loop-engineering-claude-code]]: 같은 계보를 다룬 한국어 LinkedIn 게시물. Cherny, Steinberger, Osmani의 발언을 RLM 이론에 묶어 이 게시물보다 한 단계 깊이 들어간다.
- [[agents/runkle-2026-the-art-of-loop-engineering]]: loop를 4단계 루프 스택으로 쌓은 LangChain 글. 이 게시물이 루프를 무엇으로 채우는지를 나열했다면 Runkle은 루프를 어떤 층위로 겹치는지를 다룬다.
- [[agents/movez-2026-loop-engineering-for-trading-agents]]: 같은 프레임을 코딩 밖 트레이딩 도메인으로 옮긴 사례. 타임라인의 마지막 칸이 다른 분야로 이식되는 모습을 보여준다.
- [[agents/luis-carrijo-2026-claude-code-team-just-dropped]]: Claude Code harness의 내부 동작과 auto mode, dynamic workflow를 다룬 강좌. 타임라인의 harness 칸과 loop 칸을 도구 수준에서 확인할 때 쓴다.
- [[overviews/loop-engineering-cross-domain-overview]]: loop 프레임이 도메인을 건너 이식되는지 검토한 개괄.
