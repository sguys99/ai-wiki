---
title: "Prompt → Context → Harness → Loop Engineering: 4단계 진화 개괄"
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
tags: [prompt-engineering, context-engineering, harness-engineering, loop-engineering, paradigm-shift, verification-distance, progressive-disclosure, compounding, claude-code, roadmap, overview, synthesis]
study_path:
  - id: agents/kang-2026-no-longer-prompting-claude
    note: "네 단계의 이름과 순서, 제안자 표기를 한 장에서 먼저 잡는다. 개념을 배우는 자리가 아니라 좌표를 세우는 자리다."
  - id: agents/patel-2026-i-taught-myself-claude-code
    note: "prompt 단계의 어휘가 어떤 논문에서 왔는지 확인한다. 그 다섯 편을 이 저장소가 전용 페이지로 보유하지 않는다는 사실도 여기서 드러난다."
    prereq: ["agents/kang-2026-no-longer-prompting-claude"]
  - id: agents/anthropic-2025-effective-context-engineering-for-ai
    note: "attention budget이 유한하다는 제약과 최소 고신호 집합 원칙을 잡는다. 뒤의 두 단계가 전부 이 제약 위에 서 있다."
    prereq: ["agents/patel-2026-i-taught-myself-claude-code"]
  - id: database/edge-2024-from-local-to-global
    note: "컨텍스트를 미리 요약해 인덱스로 굳히는 경로를 정량 비교로 확인한다. 토큰 9배에서 43배 절감이라는 값이 압축의 대가를 재는 기준점이 된다."
    prereq: ["agents/anthropic-2025-effective-context-engineering-for-ai"]
  - id: agents/zhang-2026-recursive-language-models
    note: "컨텍스트를 요약하지 않고 변수로 두는 반대 경로다. 컨텍스트를 밖으로 옮긴 효과와 재귀 sub-call의 효과를 분리해 보여준다."
    prereq: ["agents/anthropic-2025-effective-context-engineering-for-ai"]
  - id: agents/lee-hoyeon-2026-harness-engineering
    note: "harness 단계의 실행 절차를 여섯 단계 순환으로 잡는다. 뒤에 읽을 실전 가이드와 실증 논문이 모두 이 좌표계를 쓴다."
    prereq: ["agents/anthropic-2025-effective-context-engineering-for-ai"]
  - id: agents/patel-2026-beyond-the-prompt-claude-code
    note: "여섯 단계가 실제 설정 파일과 커맨드로 어떻게 내려오는지 확인한다. 설정이 곧 작업이라는 명제의 구체형이다."
    prereq: ["agents/lee-hoyeon-2026-harness-engineering"]
  - id: agents/trq212-2026-a-field-guide-to-fable
    note: "harness의 앞단인 사람의 문제 정의를 다룬다. 환경을 아무리 잘 깔아도 무엇을 원하는지 흐릿하면 상한이 거기서 정해진다."
    prereq: ["agents/patel-2026-beyond-the-prompt-claude-code"]
  - id: agents/lin-2026-harness-updating-is-not-harness-benefit
    note: "이 묶음에서 유일한 통제 실험이다. harness의 이득이 모델 등급에 비단조로 반응한다는 결과가 앞 두 자료의 낙관에 조건을 붙인다."
    prereq: ["agents/lee-hoyeon-2026-harness-engineering"]
  - id: agents/osmani-2026-loop-engineering
    note: "loop 단계의 명명 자료다. 루프의 최소 골격 다섯 가지와 보조 요소 하나, 그리고 자동화가 걷어 가지 못하는 세 가지 부담을 얻는다."
    prereq: ["agents/lee-hoyeon-2026-harness-engineering"]
  - id: agents/runkle-2026-the-art-of-loop-engineering
    note: "같은 loop를 네 겹의 중첩 구조로 다시 나눈다. 구성 요소 목록과 층위 구획이라는 두 분해 방식을 대조하는 자리다."
    prereq: ["agents/osmani-2026-loop-engineering"]
  - id: agents/lee-jeongmin-2026-loop-engineering-claude-code
    note: "loop 설계를 RLM 구조에 묶어 읽는 마지막 단계다. context 단계에서 읽은 변수 모델이 loop 단계의 도구 설계로 이어지는 경로를 확인한다."
    prereq: ["agents/osmani-2026-loop-engineering", "agents/zhang-2026-recursive-language-models"]
---

## 요약

AI 코딩 에이전트를 다루는 작업에서 무엇을 최적화하는지가 약 4년 동안 네 번 바깥으로 옮겨 왔다. 한 번의 지시문에서 프롬프트 밖 토큰 전체로, 다시 모델을 감싸는 실행 환경으로, 마지막으로 그 환경을 반복 구동하는 오케스트레이션 층으로 넘어온 순서다.

[[agents/kang-2026-no-longer-prompting-claude]]가 이 순서를 하나의 타임라인으로 배열했고, 이 페이지는 그 배열을 이 저장소가 실제로 보유한 자료 13편으로 채운 지도다. 각 단계에 어떤 자료가 놓이는지, 단계 사이에서 무엇이 되풀이되는지, 그리고 어느 주장이 실측으로 뒷받침되고 어느 주장이 일화에 기대는지를 한자리에 모은다.

네 단계는 대체 관계가 아니라 포함 관계다. 좋은 프롬프트는 지금도 필요하지만, 사람이 매번 손으로 쓰는 대신 루프가 대신 만들어 공급한다. [[agents/kang-2026-no-longer-prompting-claude]]의 제목이 두 문장으로 붙어 있는 이유도 여기에 있다. 앞 문장은 더 이상 프롬프팅하지 않는다고 말하고 뒤 문장은 그래도 프롬프트가 여전히 중요하다고 말한다. 바뀐 것은 프롬프트의 가치가 아니라 프롬프트를 공급하는 주체다.

이 페이지는 최상위 진입점이라서 각 단계를 깊이 다루지 않는다. 자료가 두껍게 쌓인 harness와 loop 두 단계는 자매 overview 세 편으로 내려보낸다.

## 배경

이 지도가 필요한 이유는 이름이 자료보다 빨리 늘었기 때문이다. 2026년 상반기에만 harness engineering, loop engineering, loopcraft, dynamic workflow 같은 명칭이 몇 달 간격으로 나왔고, 같은 대상을 서로 다른 개수의 구성 요소로 나눈 분해 방식이 나란히 유통됐다.

[[agents/lee-jeongmin-2026-loop-engineering-claude-code]]는 이 상황을 자료 안에서 직접 언급한다. 지난 3년간, 그리고 최근 수 개월 사이 등장한 여러 용어 때문에 사용자의 피로감이 매우 높다는 것이다. 그러면서도 loop만큼은 근거가 있다고 보는데, 모델 하나의 부족한 판단력을 구조로 보완한다는 진단이 그 근거다.

용어를 줄 세우는 작업 자체는 [[agents/kang-2026-no-longer-prompting-claude]]가 이미 해 두었다. 그 자료의 값은 새 기법을 제안하는 데 있지 않고 흩어져 있던 네 개념에 순서와 좌표를 부여하는 데 있다. 다만 타임라인 하나로는 각 단계에서 실제로 무엇을 하는지, 그 주장이 얼마나 검증됐는지를 알 수 없다. 이 페이지가 그 두 가지를 덧붙인다.

자료의 밀도도 단계마다 크게 다르다. 앞의 두 단계는 원점 자료가 하나씩이고, 뒤의 두 단계에 열 편 넘게 몰려 있다. 이 불균형은 이 저장소의 수집 이력이지 단계의 중요도 순서가 아니다.

## 핵심 개념

context engineering은 유한한 attention budget에 넣을 토큰을 고르는 설계다. [[agents/anthropic-2025-effective-context-engineering-for-ai]]는 이를 추론 중 context window에 들어갈 토큰 전체를 골라 유지하는 전략으로 정의하고, 좋은 context engineering이란 원하는 결과의 확률을 최대화하는 high-signal 토큰의 최소 집합을 찾는 일이라고 적는다.

harness는 모델을 감싸 도구와 검증과 상태를 제공하는 실행 환경이다. 이 저장소 안에서 세 자료가 각각 다른 폭으로 이 말을 쓴다. [[agents/lee-hoyeon-2026-harness-engineering]]은 AI가 혼자서도 잘 일할 수 있는 작업 환경 전체로 가장 넓게 잡고, [[agents/lin-2026-harness-updating-is-not-harness-benefit]]은 프롬프트와 스킬과 메모리와 tool 인터페이스라는 편집 가능한 artifact 집합으로 좁게 잡으며, [[agents/runkle-2026-the-art-of-loop-engineering]]은 모델을 둘러싼 프롬프트와 tool과 grader로 잡는다.

loop engineering은 에이전트를 반복 구동하는 루프 자체를 설계 대상으로 삼는 관점이다. [[agents/osmani-2026-loop-engineering]]이 이 이름을 붙였고, 설계자가 만들어야 할 산출물이 잘 다듬은 프롬프트 한 줄이 아니라 정의된 목표를 향해 스스로 반복하는 시스템이라고 적는다.

verification distance는 구현을 맡은 에이전트와 평가를 맡은 에이전트를 떼어 놓아 확보하는 거리다. 같은 모델이 자기 산출물을 채점하면 후하게 매기는 편향이 생기므로, 지시문이 다른 별도 에이전트에 평가를 맡겨 그 편향을 차단한다.

progressive disclosure는 필요한 시점에만 정보를 단계적으로 노출하는 설계다. [[agents/patel-2026-beyond-the-prompt-claude-code]]가 드는 구체형은 스킬이 세션 시작 시 항목당 약 100토큰의 description만 읽고 실제 호출 시점에야 `SKILL.md` 전문과 보조 파일을 가져오는 방식이다.

base capability는 harness 개선 없이 초기 상태에서 그 모델이 보이는 task 해결 성능을 뜻한다. [[agents/lin-2026-harness-updating-is-not-harness-benefit]]이 harness의 이득을 재기 위해 세운 기준선이며, 뒤의 실증 절 전체가 이 값과의 관계를 다룬다.

## 네 단계 진화

### 단계별 대응

각 단계가 무엇을 최적화 대상으로 삼는지, 이 저장소가 그 단계를 어떤 페이지로 보유하는지를 한 표에 모은다. 시점과 제안자 표기는 [[agents/kang-2026-no-longer-prompting-claude]]가 정리한 타임라인을 따랐다.

| 단계 | 최적화 대상 | 대표 자료 | 이 저장소의 근거 페이지 |
|---|---|---|---|
| prompt engineering | 한 번의 지시문. 게시물은 이 단계의 질문을 "무엇을 말할 것인가"로 적는다 | 시점과 제안자 표기 없음 | [[agents/patel-2026-i-taught-myself-claude-code]]가 원전 논문 다섯 편을 목록으로 지목한다 |
| context engineering | 프롬프트 밖의 모든 토큰 구성 | 2025년, Anthropic | [[agents/anthropic-2025-effective-context-engineering-for-ai]]가 원점, [[database/edge-2024-from-local-to-global]]과 [[agents/zhang-2026-recursive-language-models]]와 [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]]가 서로 다른 처리 경로 |
| harness engineering | 도구와 제약과 검증 게이트 등 모델 바깥의 실행 환경 | 2026년 2월, Mitchell Hashimoto | [[agents/lee-hoyeon-2026-harness-engineering]]이 프레임, [[agents/patel-2026-beyond-the-prompt-claude-code]]가 실전 설정, [[agents/trq212-2026-a-field-guide-to-fable]]이 입력단, [[agents/lin-2026-harness-updating-is-not-harness-benefit]]이 실증 |
| loop engineering | harness를 타이머 위에 올리고 서브에이전트를 생성하며 스스로에게 일을 공급하는 오케스트레이션 계층 | 2026년 6월 7일, Addy Osmani | [[agents/osmani-2026-loop-engineering]]이 명명, [[agents/runkle-2026-the-art-of-loop-engineering]]이 층위 구획, [[agents/lee-jeongmin-2026-loop-engineering-claude-code]]가 이론 연결 |

표의 시점 열에는 검증 정도가 고르지 않은 항목이 섞여 있다. loop 단계의 표기는 [[agents/osmani-2026-loop-engineering]]이 같은 날짜의 원문이라 교차 확인되지만, harness 단계를 2026년 2월 Mitchell Hashimoto의 제안으로 보는 배열은 이 저장소 안에서 [[agents/kang-2026-no-longer-prompting-claude]] 한 편이 유일한 근거다. 같은 주제를 다루는 [[agents/lee-hoyeon-2026-harness-engineering]]은 이 attribution을 담고 있지 않다. prompt 단계 칸이 비어 있는 것은 이 단계에 단일 제안자가 없기 때문으로 보인다.

### 단계 1 prompt engineering

출발점은 잘 쓴 지시 한 줄이다. [[agents/anthropic-2025-effective-context-engineering-for-ai]]는 prompt engineering을 프롬프트, 특히 system prompt를 쓰고 조직하는 방법으로 정의하고, 이를 뒤 단계와 견주는 기준선으로 삼는다.

이 단계가 오래 작업의 대부분을 차지한 데는 이유가 있다. 같은 자료의 진단에 따르면 일상 대화를 뺀 사용 사례가 대부분 one-shot 분류나 텍스트 생성이었고, 그런 과제에서는 프롬프트 한 번을 잘 쓰는 것이 곧 성능이었다.

이 단계의 기법 어휘가 어디서 왔는지는 [[agents/patel-2026-i-taught-myself-claude-code]]가 지목한다. Manthan Patel이 Claude Code 독학 경로에 쓸 자료를 다섯 묶음으로 나눈 목록이고, 논문 묶음에 ReAct와 Generative Agents와 Toolformer와 Chain-of-Thought Prompting과 Reflexion 다섯 편이 들어 있다.

다만 이 다섯 편은 이 저장소에 전용 페이지로 들어와 있지 않다. 같은 페이지의 보유 현황 대조가 그 빈칸을 명시한다. 개념을 해설한 2차 자료는 두텁게 쌓여 있는 반면 원본에 해당하는 공식 저장소와 원 논문은 비어 있다는 것이다. 따라서 이 지도에서 prompt 단계는 이름과 위치만 확인하는 자리이고, 원 논문의 내용은 별도 수집이 필요하다.

한계도 뚜렷하다. 한 번 쓰고 끝나는 단일 턴 관점이라 여러 턴에 걸쳐 긴 시간 동작하는 에이전트에는 부족하다.

### 단계 2 context engineering

[[agents/anthropic-2025-effective-context-engineering-for-ai]]가 이 전환을 분명히 했다. 저자들은 이동을 질문의 교체로 표현한다. 예전 질문이 프롬프트에 쓸 적절한 표현이 무엇인가였다면, 지금 질문은 어떤 컨텍스트 구성이 원하는 모델 행동을 낼 확률이 가장 높은가다.

![[assets/anthropic-2025-effective-context-engineering-for-ai/fig01.png]]
*Figure 1: prompt engineering과 context engineering의 대비. 왼쪽 단일 턴 질의는 큐레이션이 한 번 일어나고 끝나지만, 오른쪽 에이전트는 후보 컨텍스트에서 매 턴 큐레이션해 context window를 다시 채운다 (Anthropic 2025)*

제약의 근거도 함께 제시된다. attention budget이 유한한 이유를 저자들은 세 가지로 나눈다. Transformer 구조에서 n개 토큰에 n제곱 개의 pairwise 관계가 생긴다는 점, 학습 데이터에서 짧은 시퀀스가 긴 시퀀스보다 흔하다는 점, 긴 시퀀스를 짧은 컨텍스트에 맞춰 처리하는 position encoding interpolation이 토큰 위치 이해를 일부 떨어뜨린다는 점이다. 세 요인이 겹쳐 만드는 결과는 급격한 절벽이 아니라 완만한 성능 기울기다.

이 단계가 낳은 대응 기법은 세 가지다. compaction은 대화 이력을 요약으로 접어 새 context window에서 다시 출발하고, structured note-taking은 노트를 컨텍스트 밖에 기록했다가 필요할 때 다시 가져오며, 서브에이전트 구조는 작업을 격리된 window로 나누고 요약만 회수한다. 마지막 항목의 토큰 비대칭이 인상적이다. 각 서브에이전트는 탐색에 수만 토큰 이상을 쓰지만 위로 올리는 것은 보통 1,000에서 2,000 토큰 분량의 요약이다.

컨텍스트를 다루는 다른 형태의 자료 세 편도 이 단계에 속한다. 세 편이 같은 문제에 서로 다른 답을 낸다는 점이 이 묶음의 값이다.

| 자료 | 컨텍스트를 어떻게 다루는가 | 대가 |
|---|---|---|
| [[database/edge-2024-from-local-to-global]] | 문서 집합을 knowledge graph로 바꾸고 community마다 요약문을 미리 만들어 둔다 | 가장 추상적인 root-level 요약은 구체적 인용과 예시를 잃어 empowerment 항목에서 vector RAG에 졌다 |
| [[agents/zhang-2026-recursive-language-models]] | 요약하지 않고 prompt를 REPL 변수에 두어, 모델이 코드로 필요한 부분만 읽고 조각마다 sub-LM을 호출한다 | 짧은 입력에서는 base 모델이 더 낫고, 2^14 토큰을 넘는 길이부터 우위가 일관된다 |
| [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]] | 자료를 받는 시점에 개념 페이지로 미리 컴파일해 두어 질의마다 다시 만들지 않는다 | 출처 추적성이 페이지 단위까지만 남고 문장 단위로는 잃는다 |

수치로 보면 압축 경로의 절감 폭이 크다. [[database/edge-2024-from-local-to-global]]에서 root-level 요약은 원본 텍스트를 그대로 map-reduce하는 조건 대비 토큰을 9배에서 43배 줄이면서 comprehensiveness와 diversity 우위를 유지한다. Podcast 데이터셋 기준으로 root-level이 쓰는 토큰은 2만 6,657개이고 원본 텍스트 조건은 101만 4,611개다.

반대 경로의 효과는 [[agents/zhang-2026-recursive-language-models]]가 분리해 보여준다. OOLONG-Pairs에서 base GPT-5는 F1 0.1%로 사실상 아무것도 풀지 못하고 compaction agent를 붙여도 0.1%에 머문다. sub-call 없이 REPL만 쓰는 설정이 43.9%를 내고, 재귀 sub-call을 허용한 depth=1이 58.0%, depth=3이 76.0%를 낸다. 앞의 43.8%p가 컨텍스트를 밖으로 옮긴 효과이고 뒤의 상승분이 재귀 호출의 효과다.

### 단계 3 harness engineering

초점이 한 번 더 바깥으로 나간다. 프롬프트도 컨텍스트도 결국 에이전트가 일할 작업 환경의 일부이므로, 그 환경 전체를 설계 대상으로 삼는다는 것이 harness engineering이다. [[agents/lee-hoyeon-2026-harness-engineering]]이 이 전환을 말을 잘 하는 것에서 일하는 방법을 설계해주는 것으로의 이동이라고 표현한다.

같은 자료가 제시하는 골격은 여섯 단계가 이어지는 순환 구조다.

```
구조(Scaffolding)  →  맥락(Context)    →  계획(Planning)
      ↑                                          ↓
개선(Compounding) ←  검증(Verification) ←  실행(Execution)
```

순환이라는 점이 중요하다. 개선 단계에서 발견한 패턴이 새 스킬이나 새 규칙이 되어 다시 구조와 맥락으로 들어가기 때문이다. 여섯 단계는 실행 순서이면서 동시에 harness가 스스로 자라는 경로다.

이 단계의 핵심 주장은 모델보다 harness가 큰 지렛대라는 것이다. [[agents/lee-hoyeon-2026-harness-engineering]]이 인용하는 네 회사 사례가 그 근거이며, 네 사례의 공통점은 모델을 고정한 상태에서 결과가 바뀌었다는 것이다.

| 회사 | 수치 | 조건 |
|---|---|---|
| LangChain | TerminalBench 점수가 52.8에서 66.5로 오르고 순위가 30위에서 Top 5로 이동 | GPT-5.2-Codex를 고정하고 harness만 바꿨다. 추가한 것은 셀프 검증 루프, 컨텍스트 자동 수집, 둠 루프 탐지다 |
| OpenAI | 100만 줄 코드에 인간이 쓴 코드 0줄 | 엔지니어 3명에서 7명이 5개월을 투입했고, 그 기간을 쓴 곳은 코딩이 아니라 harness 설계였다 |
| Anthropic | 싱글 에이전트로 20분에 9달러를 쓰고 실패한 작업을 3에이전트 구성으로 6시간에 200달러를 써서 완전히 동작시켰다 | 간소화 버전은 124달러로 같은 품질을 냈다 |
| Stripe | 주당 1,000건의 풀 리퀘스트를 완전 무인으로 자동 머지 | 매 스텝에 검증 게이트를 두고 전문화된 소형 에이전트를 다수 운용한다 |

네 사례를 묶는 명제는 하나다. 모델 교체로 5%를 개선하기보다 harness 설계로 15%를 개선하는 편이 현실적이라는 것이다. 다만 이 수치는 전부 외부 사례 인용이고 발표자가 직접 측정한 값이 아니다.

절차 수준의 구체형은 [[agents/patel-2026-beyond-the-prompt-claude-code]]가 맡는다. Arpan Patel의 이 가이드는 `.claude/` 디렉토리의 설정 계층과 스킬과 서브에이전트와 완료 조건 루프를 실무 절차로 풀어내고, 결론을 마지막 문장에 둔다. 설정이 곧 작업이고 실행 단계에서 할 일은 검증이라는 것이다. 같은 자료가 인용하는 Boris Cherny의 원칙은 모델에 자기 출력을 검증할 수단을 주라는 것이며, Boris는 이 한 가지 조치를 품질 2배에서 3배 향상으로 평가한다. 다만 이 수치에는 원 출처 링크가 붙어 있지 않다.

harness의 앞단을 파고드는 자료도 하나 있다. [[agents/trq212-2026-a-field-guide-to-fable]]는 지도가 영토가 아니라는 구분에서 출발해, 사용자가 건네는 표상과 작업이 실제로 벌어지는 현실 사이에 남는 차이를 unknown이라고 부른다. 저자는 Claude Fable 5를 두고 작업 품질이 unknown을 명료화하는 자기 능력에 병목이 걸린 첫 모델이라고 적는다. 결과의 상한을 긋는 것이 모델 역량이 아니라 사용자의 문제 정의 능력이라는 진단이다.

이 진단을 harness 좌표계에 놓으면 앞 두 자료와 같은 방향이 아니라 한 칸 앞선 자리를 가리킨다. 실행 환경이 모델보다 큰 지렛대라면, 그 환경에 무엇을 담을지를 정하는 사람의 판단이 다시 그 위의 지렛대가 된다는 읽기다. 이 연결은 원자료가 명시한 것이 아니라 두 자료를 나란히 놓은 이 페이지의 해석이다.

### 단계 4 loop engineering

마지막 단계는 환경 위에서 사람 손 없이 반복되는 순환을 설계한다. [[agents/osmani-2026-loop-engineering]]이 이 전환에 loop engineering이라는 이름을 붙였고, 이름의 출처로 Peter Steinberger와 Boris Cherny가 쓴 표현을 든다. 코딩 에이전트를 프롬프팅하는 것이 아니라 에이전트를 프롬프팅하는 루프를 설계하는 데 집중해야 한다는 문장이다.

루프의 최소 골격은 다섯 가지이고 여기에 보조 요소 하나가 붙는다.

| 구성 요소 | 역할 | 구현 |
|---|---|---|
| Automations | 예약된 발견과 분류를 사람 개입 없이 수행 | Claude Code의 `/loop`과 `/goal`, Codex 앱의 반복 프롬프트 |
| Worktrees | 병렬 실행 에이전트 사이의 파일 충돌 차단 | Git worktree. 저장소 이력은 공유하고 작업 디렉토리는 분리 |
| Skills | 프로젝트 지식을 문서로 고정해 재유도 반복 제거 | 두 플랫폼 공통 구조인 `SKILL.md` 파일과 보조 스크립트 폴더 |
| Plugins와 Connectors | 파일시스템 바깥 시스템과의 통합 | MCP 기반 커넥터. 이슈 트래커 조회, staging API 호출, 알림 발송 |
| Sub-agents | 구현 기능과 평가 기능의 분리 | 지시문이 다른 별도 서브에이전트 |
| Persistent state | 실행 사이의 컨텍스트 보존 | 마크다운 파일 또는 프로젝트 보드 |

Claude Code의 슬래시 커맨드 두 개가 루프의 종료 방식을 가른다. `/loop`은 정해진 시간 간격마다 실행되고, `/goal`은 지정한 기준을 만족할 때까지 계속하며 그 판정을 별도 모델에 위임한다. 뒤쪽 커맨드가 서브에이전트 원리를 이미 내부에 담고 있는 셈이다.

같은 루프를 다른 방식으로 자른 자료가 [[agents/runkle-2026-the-art-of-loop-engineering]]다. LangChain의 Sydney Runkle은 루프를 나란히 놓인 목록이 아니라 안쪽을 바깥이 감싸는 네 겹의 중첩 구조로 본다. agent loop이 일을 처리하고, verification loop이 그 출력을 채점하며, event driven loop이 전체를 조직 인프라에 연결해 자율 기동시키고, hill climbing loop이 실행 기록을 읽어 안쪽 구조 자체를 고친다.

네 번째 층의 성질이 나머지와 다르다. 보통의 루프는 한 바퀴를 마치면 시작점으로 복귀하지만, hill climbing의 반환 경로는 시작점이 아니라 안쪽으로 파고들어 agent loop 자체를 개선한다. 저자는 그동안 관심이 몰렸던 앞의 두 층에서 뒤의 두 층으로 무게를 옮기라고 권한다. 실행과 품질은 도구가 보편화되면 따라잡히는 반면, 에이전트를 자사 운영 시스템에 통합하고 그 시스템이 목표에 맞춰 나아지게 만드는 일은 조직마다 결과가 달라지기 때문이다.

이론 쪽 연결은 [[agents/lee-jeongmin-2026-loop-engineering-claude-code]]가 맡는다. 이 한국어 카드 포스트는 loop engineering을 에이전트를 프롬프트하는 시스템을 설계하는 일로 정의하고, 그 정의를 RLM 구조에 묶는다. 서브에이전트 결과가 상위 컨텍스트가 아니라 REPL 안의 변수로 돌아오므로 상위 에이전트의 일이 결과 재생성에서 변수 검증으로 줄어든다는 것이 그 연결의 핵심이다. Claude Code의 dynamic workflow가 이 구조를 가져갔고 각 서브에이전트가 독립된 context window에서 작동한다고 적는다.

이 단계가 사람에게 남기는 부담도 두 자료가 함께 짚는다. [[agents/osmani-2026-loop-engineering]]이 든 세 가지는 verification 부담과 comprehension debt와 comfortable passivity다. [[agents/kang-2026-no-longer-prompting-claude]]가 같은 자리에 붙인 한국어 이름은 검증 부채와 이해 부채와 인지적 저항이다. <!-- lint-terms: ignore -->

두 목록은 정의 수준에서 맞물리지만 세 번째 이름의 방향이 어긋난다. 게시물이 붙인 정의는 루프가 주는 결과를 판단 없이 수용하게 되는 상태이므로 comfortable passivity와 같은 것을 가리키는데, 인지적 저항이라는 이름은 문자 그대로 읽으면 받아들이지 않으려는 태도에 가깝다. 이름만 인용하면 뜻이 뒤집힌다.

두 자료의 결론은 같은 곳을 향한다. [[agents/osmani-2026-loop-engineering]]은 지렛대의 위치는 이동했지만 품질에 대한 책임은 제자리에 남았다고 적고, 같은 루프를 구현한 두 엔지니어가 정반대 결과에 도달할 수 있다는 대비를 근거로 든다. 한 사람은 이미 이해한 작업을 가속하는 데 루프를 쓰고, 다른 한 사람은 이해 자체를 회피하는 데 쓴다는 것이다.

## 네 단계를 관통하는 세 원리

단계가 바깥으로 밀려나도 같은 원리가 이름을 바꿔 되풀이된다. 네 단계가 별개의 기법 묶음이 아니라 하나의 진화라는 근거가 여기에 있다.

| 원리 | prompt 단계 | context 단계 | harness 단계 | loop 단계 |
|---|---|---|---|---|
| verification distance | 자료 없음. 단일 턴이라 검증할 이전 산출물이 없다 | 서브에이전트가 깨끗한 context window로 탐색하고 요약만 올린다 | Generator와 Evaluator의 컨텍스트를 물리적으로 분리한다 | 서브에이전트가 구현과 평가를 나눠 맡고, grader가 rubric으로 채점한 뒤 미달이면 피드백과 함께 되돌린다 |
| progressive disclosure | 자료 없음 | 식별자만 두었다가 런타임에 tool로 불러오는 just-in-time 전략 | `references/` 분리와 glob 조건부 로드, 스킬 description 약 100토큰만 선로드 | 스킬이 맥락에 맞을 때만 본문을 컨텍스트로 가져온다 |
| compounding | 자료 없음 | structured note-taking으로 컨텍스트 밖에 노트를 쌓는다 | 3회 반복하면 스킬로, 3회 틀리면 규칙으로 옮긴다 | persistent state가 실행 사이에 값을 남기고, hill climbing이 trace를 읽어 안쪽 구조를 고친다 |

### verification distance

같은 문제의식이 세 단계를 관통한다. [[agents/lee-hoyeon-2026-harness-engineering]]이 인용한 문장이 그 문제의식을 가장 직접적으로 적는다. 자기 작업을 평가하면 품질이 mediocre해도 자신 있게 칭찬한다는 것이다. 같은 자료는 실무 지침도 함께 든다. Evaluator를 회의적으로 튜닝하는 편이 Generator를 자기비판적으로 만드는 것보다 훨씬 쉽다는 판단이며, 개선 노력을 평가하는 쪽에 배치하라는 뜻이다.

구현 형태는 단계마다 다르다. context 단계에서는 lead agent와 서브에이전트의 토큰 비대칭으로 나타나고, harness 단계에서는 검증을 다른 모델에 맡겨 맹점을 교차로 잡는 배치로 나타난다. loop 단계에서는 [[agents/runkle-2026-the-art-of-loop-engineering]]의 grader처럼 별도 층으로 독립한다.

평가 기준을 무엇에 걸지도 공통 관심사다. [[agents/osmani-2026-loop-engineering]]의 시나리오에서 두 번째 서브에이전트의 평가 기준은 프로젝트 표준과 테스트 스위트다. [[agents/patel-2026-beyond-the-prompt-claude-code]]의 `/goal` 조건도 같은 성격이며, 테스트 커맨드와 CLI exit code처럼 검증 가능하고 결정론적인 대상에 조건을 묶는다.

### progressive disclosure

지침의 총량은 그대로 두고 한 번에 올라오는 양만 줄인다는 발상이다. [[agents/anthropic-2025-effective-context-engineering-for-ai]]가 just-in-time 전략으로 처음 정식화했고, 가벼운 식별자만 컨텍스트에 두었다가 런타임에 tool로 불러오는 방식이다. 파일 경로나 저장된 질의 같은 식별자에는 저장 효율을 넘어서는 쓸모가 하나 더 있다. 폴더 계층과 naming convention이 그 자체로 용도 신호가 된다는 점이다.

harness 단계로 오면 같은 원리가 파일 배치 규약이 된다. [[agents/lee-hoyeon-2026-harness-engineering]]은 지침을 한 파일에 몰아넣지 않고 상황과 참조 파일을 짝지어 두라고 권하며, 참조 구조를 제대로 갖춘 경우 CLAUDE.md가 약 30줄까지 줄어든다고 적는다. 같은 자료가 드는 관리 상한은 최대 200줄이다.

이 원리가 왜 강제되는지는 컨텍스트 사용량 분해가 보여준다. [[agents/lee-hoyeon-2026-harness-engineering]]에 실린 `/context` 화면은 메시지를 한 줄도 주고받지 않은 시점에 이미 시스템 프롬프트와 도구 정의와 스킬이 2만 토큰 넘게 들어와 있는 상태를 보여준다. 설정이 대화보다 먼저 자리를 차지한다는 뜻이다.

### compounding

세 번째 원리는 실수와 반복을 자산으로 바꾸는 것이다. context 단계의 structured note-taking이 출발점이고, [[agents/anthropic-2025-effective-context-engineering-for-ai]]가 드는 구현은 to-do list와 `NOTES.md` 같은 단순한 파일이다.

harness 단계에서는 이 원리가 숫자로 고정된 규칙이 된다. [[agents/lee-hoyeon-2026-harness-engineering]]은 같은 작업을 3번 반복하면 스킬로 만들고 같은 실수가 3번 반복되면 규칙으로 옮기라고 적는다. 3이라는 기준이 하는 일은 판단을 자동화하는 것이다. 자동화할 가치가 있는지 매번 검토하지 않고 반복 횟수로 결정하므로 개선이 의지가 아니라 절차가 된다.

[[agents/patel-2026-beyond-the-prompt-claude-code]]는 같은 실천을 Compounding Engineering이라는 이름으로 전한다. PR 코멘트에서 바로 룰을 커밋하게 해 리뷰어가 실수를 한 번 잡으면 다시 반복되지 않게 만드는 방식이다.

지식 축적 자체를 목적으로 삼는 자료도 이 원리 위에 있다. [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]]가 RAG와 대비해 제시하는 명제가 그것이다. RAG는 질의마다 답을 처음부터 다시 만드는 stateless 구조이고, LLM Wiki는 자료를 받는 시점에 컴파일해 두어 결과를 유지하는 stateful 구조다. 다만 같은 자료가 출처 추적성만큼은 RAG가 낫다고 함께 인정한다.

loop 단계에서는 개선 대상이 산출물에서 구조로 옮겨간다. [[agents/runkle-2026-the-art-of-loop-engineering]]의 hill climbing이 그 자리이며, 분석 에이전트가 trace를 읽어 프롬프트와 tool과 grader를 고친다. 한 번의 실패가 아니라 여러 trace가 같은 문제를 가리킬 때를 신호로 삼는다는 점이 판정 기준이다.

## 실증의 경계

### 근거의 성격이 자료마다 다르다

네 단계의 주장은 모두 같은 무게로 검증되지 않았다. 인용 전에 각 자료가 어떤 종류의 근거를 갖는지 구분해 두는 편이 안전하다.

| 근거 유형 | 해당 자료 | 성격 |
|---|---|---|
| 통제 실험 | [[agents/lin-2026-harness-updating-is-not-harness-benefit]] | agent와 evolver를 독립적으로 바꾸는 격자 설계. 이 묶음에서 유일하다 |
| 논문 벤치마크 | [[agents/zhang-2026-recursive-language-models]], [[database/edge-2024-from-local-to-global]] | 공개 벤치마크와 비교군이 있으나 context 처리 방법을 재는 것이고 harness나 loop를 재지 않는다 |
| 2차 사례 인용 | [[agents/lee-hoyeon-2026-harness-engineering]] | 네 회사 수치가 전부 외부 블로그와 강연 인용이고 발표자의 1차 측정이 아니다 |
| 1인칭 경험과 통념 | [[agents/patel-2026-beyond-the-prompt-claude-code]], [[agents/trq212-2026-a-field-guide-to-fable]] | 품질 2배에서 3배 향상 같은 수치에 출처 링크가 없고 통제 실험과 비교군이 없다 |
| 의견 에세이 | [[agents/osmani-2026-loop-engineering]], [[agents/runkle-2026-the-art-of-loop-engineering]] | 정량 결과가 없다. 앞은 약 700단어이고 외부 근거가 두 건뿐이며, 뒤는 자사 제품 라인업에 맞춘 서사다 |
| 2차 전언 | [[agents/kang-2026-no-longer-prompting-claude]], [[agents/lee-jeongmin-2026-loop-engineering-claude-code]] | 타임라인과 개념 연결이 값이고, 본문에 링크와 각주가 없다 |

### harness의 이득은 모델 등급에 비단조로 반응한다

[[agents/lin-2026-harness-updating-is-not-harness-benefit]]은 self-evolving agent의 성능 향상을 두 능력으로 갈라 측정한다. 실행 기록을 보고 유용한 harness 수정을 만드는 능력이 harness-updating이고, 그렇게 수정된 harness에서 실제로 이득을 얻는 능력이 harness-benefit이다.

![[assets/lin-2026-harness-updating-is-not-harness-benefit/fig02.png]]
*Figure 2: 두 발견의 요약. 왼쪽은 harness-updating이 base capability와 무관하게 평평하다는 것을, 오른쪽은 harness-benefit이 중간 등급에서 정점을 찍고 약한 등급에서 두 실패 모드에 막힌다는 것을 보여준다 (Lin 2026, p.2)*

첫 번째 결과는 수정을 만드는 능력이 모델 등급을 거의 따라가지 않는다는 것이다. evolver 7종 사이의 최대 격차가 어느 벤치마크에서도 3.1%p를 넘지 않고, 가장 작은 9B 모델인 Qwen3.5-9B가 SkillsBench에서 3.8%p로 1위를 차지해 Opus 4.6의 2.3%p를 넘어선다. `flink-query` task를 열어 보면 두 모델이 쓴 skill이 같은 다섯 단계를 담고 있으며 차이는 세션화 구현 표현뿐이다.

두 번째 결과가 이 지도의 낙관에 조건을 붙인다. 이득을 얻는 능력은 base capability에 단조 증가하지 않고 중간 등급에서 정점을 찍는다.

| 등급 | 대표 모델 | SWE-bench Verified base | 이득 | 이득이 그 크기인 이유 |
|---|---|---|---|---|
| 약한 등급 | Qwen3-32B | 3.6% | 4.4%p | 개선 여지가 96.4%p로 가장 큰데도 harness를 컨텍스트로 가져오지 못하거나 가져와도 따르지 못한다 |
| 중간 등급 | Qwen3-235B | 20.7% | 19.3%p | harness를 활용할 실행 능력이 있고 개선 여지도 남아 있다 |
| 강한 등급 | Opus 4.6 | 74.2% | 2.6%p | 초기 harness에서 이미 많은 task를 풀어 남은 여지가 25.8%p뿐이다 |

MCP-Atlas에서는 정점이 base 28.0%인 GPT-OSS-120B로 이동해 7.0%p를 얻고 양쪽 끝은 역시 작다. 곡선의 양 끝이 낮은 이유는 서로 다르다. 높은 쪽은 ceiling effect로 설명되지만, 낮은 쪽은 개선 여지가 가장 큰데도 가장 적게 얻으므로 별개의 병목이 있다.

그 병목은 두 실패로 분해된다. 관련 skill을 작업 컨텍스트로 가져오지 못하는 activation 실패와, 가져왔음에도 지침을 따르지 못하는 adherence 실패다. 지표로 보면 Qwen3-32B의 skill 로드율은 0.251이고 로드 후 준수율은 0.142인 반면, Opus 4.6은 각각 0.957과 0.757이다. 긴 작업에서의 준수 하락도 등급에 따라 단계적으로 커져서, 로드 직후에서 마지막 검증 시점까지의 하락 폭이 Qwen3-32B는 0.39이고 Opus 4.6은 0.09다.

이 결과가 뒤집는 서술이 하나 있다. harness와 loop의 정교한 설계가 강한 모델에서 가장 크게 회수된다는 읽기는 이 실증과 맞지 않는다. 강한 모델은 이미 잘하기 때문에 harness가 더할 여지가 좁고, 실제로 가장 많이 얻는 것은 중간 등급이다. 약한 모델에서도 이득이 0은 아니며, 다만 개선 여지에 비해 크게 적다.

설계 지침도 여기서 나온다. 논문은 성능 예산을 evolver가 아니라 task를 푸는 agent에 배정하라고 권한다. evolver를 frontier 모델로 바꿔 얻는 것이 최대 3.1%p인 반면, MCP-Atlas 기준 agent 사이 base capability 격차는 36.0%p다. 뒤집어 보면 evolver 자리에는 작고 저렴한 모델을 배치할 여지가 있다.

한 가지 더 짚어 둘 것은 harness 갱신이 항상 개선을 보장하지는 않는다는 점이다. 같은 논문의 전체 조합 행렬에서 evolver 쪽 63개 셀 중 9개, agent 쪽 54개 셀 중 8개가 evolution 없는 기준선보다 낮다. 논문은 이 회귀를 별도로 분석하지 않으므로 어떤 조건에서 갱신이 성능을 떨어뜨리는지는 남은 과제다.

## 겹치는 주장과 갈리는 주장

### 네 자료 이상이 합의하는 것

같은 진단이 서로 다른 어휘로 반복되는 지점이 세 군데다.

- **검증은 분리해야 한다.** [[agents/anthropic-2025-effective-context-engineering-for-ai]]의 서브에이전트 격리, [[agents/lee-hoyeon-2026-harness-engineering]]의 Generator와 Evaluator 분리, [[agents/osmani-2026-loop-engineering]]의 서브에이전트 평가, [[agents/runkle-2026-the-art-of-loop-engineering]]의 grader 층, [[agents/lee-jeongmin-2026-loop-engineering-claude-code]]의 adversarial verification이 모두 같은 편향을 겨냥한다.
- **책임은 사람에게 남는다.** [[agents/osmani-2026-loop-engineering]]의 세 가지 부담, [[agents/lee-hoyeon-2026-harness-engineering]]이 사람에게 배정한 세 가지 유지 작업, [[agents/patel-2026-beyond-the-prompt-claude-code]]의 증거 없이 성공을 주장하게 두지 않는다는 규칙이 같은 방향이다.
- **모델 교체보다 둘레 설계가 먼저다.** 네 회사 사례와 [[agents/runkle-2026-the-art-of-loop-engineering]]의 출발 명제가 같고, [[agents/lin-2026-harness-updating-is-not-harness-benefit]]은 이 명제를 조건부로 지지한다. 다만 그 조건이 앞 절의 비단조 곡선이다.

### 자료 사이가 어긋나는 지점

| 어긋남 | 내용 |
|---|---|
| 루프의 구성 요소 개수 | [[agents/osmani-2026-loop-engineering]]은 다섯 가지에 보조 하나를 더하고, [[agents/kang-2026-no-longer-prompting-claude]]는 여섯 항목을 나열하면서 소제목에는 다섯 가지라고 적으며, [[agents/runkle-2026-the-art-of-loop-engineering]]은 네 층으로, [[agents/lee-hoyeon-2026-harness-engineering]]은 여섯 단계로 나눈다 |
| 여섯 번째 요소의 이름 | Osmani는 persistent state, Kang은 external state로 적는다. 앞은 실행 사이에 값이 남는다는 점을, 뒤는 저장 위치가 모델 밖이라는 점을 강조한다 |
| Steinberger의 소속 | [[agents/osmani-2026-loop-engineering]]의 원문은 Anthropic으로 묶고, [[agents/lee-jeongmin-2026-loop-engineering-claude-code]]의 원문은 OpenClaw로 적는다. 두 원자료가 어긋나므로 각 페이지가 자기 원문 표기를 그대로 따른다 |
| 세 번째 부담의 이름 | Osmani의 comfortable passivity와 Kang의 인지적 저항은 정의가 대응하지만 이름의 방향이 반대다 |
| harness 단계의 attribution | Mitchell Hashimoto 표기는 [[agents/kang-2026-no-longer-prompting-claude]]가 이 저장소 안 유일한 근거이고 교차 확인되지 않는다 |
| 계획 국면의 유무 | [[agents/lee-hoyeon-2026-harness-engineering]]은 계획과 개선을 독립 단계로 세우지만 loop 계열 두 자료는 그 두 국면을 별도 요소로 떼지 않는다 |

이 어긋남을 무리하게 통일하지 않는 편이 낫다. 구성 요소 개수가 다른 것은 분해 기준이 다르기 때문이고, 저장 위치를 강조하느냐 지속성을 강조하느냐에 따라 같은 대상의 이름이 갈린다.

## 자매 overview로의 라우팅

이 페이지는 좌표를 세우는 자리이고 세부는 아래 세 편이 맡는다.

| 자매 페이지 | 맡는 범위 | 이 페이지에서 내려가는 지점 |
|---|---|---|
| [[overviews/agent-harness-engineering-overview]] | harness 담론 전반. 프레임과 실전 설정과 실증과 회의론을 한 장으로 묶는다 | 단계 3을 읽은 뒤 |
| [[overviews/loop-engineering-cross-domain-overview]] | loop 프레임이 코딩 밖 도메인으로 옮겨가는지 검토한다 | 단계 4를 읽은 뒤 |
| [[overviews/agent-skills-overview]] | 스킬이라는 단위 자체의 설계와 생태계 | progressive disclosure 절을 읽은 뒤 |

세 편의 커버 범위가 이 페이지와 일부 겹치지만 역할이 다르다. 이 페이지는 네 단계 사이의 순서와 관계를 다루고, 자매 세 편은 한 단계 안쪽의 설계 선택지를 다룬다.

## 학습 경로

아래 12단계는 frontmatter의 `study_path`와 같은 순서다. 네 단계 진화를 따라가는 단일 트랙이며, 커버 자료 13편 안에서만 골랐다.

1. [[agents/kang-2026-no-longer-prompting-claude|4단계 타임라인]]. 네 단계의 이름과 순서, 제안자 표기를 한 장에서 먼저 잡는다. 개념을 깊이 배우는 자리가 아니라 좌표를 세우는 자리다.
2. [[agents/patel-2026-i-taught-myself-claude-code|Claude Code 학습 자료 목록]]. prompt 단계의 어휘가 어떤 논문에서 왔는지 확인한다. ReAct와 Chain-of-Thought를 비롯한 다섯 편을 이 저장소가 전용 페이지로 보유하지 않는다는 사실도 여기서 드러난다.
3. [[agents/anthropic-2025-effective-context-engineering-for-ai|Effective Context Engineering]]. attention budget이 유한하다는 제약과 최소 고신호 집합 원칙을 잡는다. attention budget은 LLM이 대량의 컨텍스트를 파싱할 때 끌어다 쓰는 유한한 주의 자원을 뜻하며, 뒤의 두 단계가 전부 이 제약 위에 서 있다.
4. [[database/edge-2024-from-local-to-global|GraphRAG]]. 컨텍스트를 미리 요약해 인덱스로 굳히는 경로를 정량 비교로 확인한다. 원본 텍스트 조건 대비 토큰 9배에서 43배 절감이라는 값이 압축의 대가를 재는 기준점이 된다.
5. [[agents/zhang-2026-recursive-language-models|RLM]]. 컨텍스트를 요약하지 않고 REPL 변수로 두는 반대 경로다. 컨텍스트를 밖으로 옮긴 효과와 재귀 sub-call의 효과를 depth=0 설정으로 분리해 보여준다.
6. [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering]]. harness 단계의 실행 절차를 여섯 단계 순환으로 잡는다. 뒤에 읽을 실전 가이드와 실증 논문이 모두 이 좌표계를 쓴다.
7. [[agents/patel-2026-beyond-the-prompt-claude-code|Beyond the Prompt]]. 여섯 단계가 실제 설정 파일과 커맨드로 어떻게 내려오는지 확인한다. 설정이 곧 작업이고 실행은 검증이라는 명제의 구체형이다.
8. [[agents/trq212-2026-a-field-guide-to-fable|A Field Guide to Fable]]. harness의 앞단인 사람의 문제 정의를 다룬다. 환경을 아무리 잘 깔아도 무엇을 원하는지 흐릿하면 상한이 거기서 정해진다는 진단이다.
9. [[agents/lin-2026-harness-updating-is-not-harness-benefit|Harness Updating Is Not Harness Benefit]]. 이 묶음에서 유일한 통제 실험이다. harness의 이득이 모델 등급에 비단조로 반응한다는 결과가 앞 두 자료의 낙관에 조건을 붙인다.
10. [[agents/osmani-2026-loop-engineering|Loop Engineering]]. loop 단계의 명명 자료다. 루프의 최소 골격 다섯 가지와 보조 요소 하나, 그리고 자동화가 걷어 가지 못하는 세 가지 부담을 얻는다.
11. [[agents/runkle-2026-the-art-of-loop-engineering|The Art of Loop Engineering]]. 같은 loop를 네 겹의 중첩 구조로 다시 나눈다. 구성 요소 목록과 층위 구획이라는 두 분해 방식을 대조하는 자리다.
12. [[agents/lee-jeongmin-2026-loop-engineering-claude-code|Loop Engineering과 RLM]]. loop 설계를 RLM 구조에 묶어 읽는 마지막 단계다. 5단계에서 읽은 변수 모델이 loop 단계의 도구 설계로 이어지는 경로를 확인한다.

커버 자료 가운데 [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]]만 이 트랙에서 뺐다. 네 단계 진화의 본류가 아니라 compounding 원리의 곁가지라서, 지식 축적 구조에 관심이 있을 때 3단계와 6단계 사이에서 따로 읽으면 된다.

## 한계

이 개괄 자체의 제약이 여섯 가지다.

- **커버 범위가 Claude Code 생태계에 몰려 있다.** 13편의 대부분이 Claude Code와 그 주변 도구를 전제로 쓰였다. 다른 스택을 기준으로 삼은 것은 LangChain 제품군에 맞춘 [[agents/runkle-2026-the-art-of-loop-engineering]] 한 편이고, 코딩 에이전트가 아니라 컨텍스트 처리 방법을 다루는 자료가 [[database/edge-2024-from-local-to-global]]과 [[agents/zhang-2026-recursive-language-models]] 두 편이다. 다른 코딩 에이전트나 코딩 밖 도메인에서 같은 네 단계가 성립하는지는 이 자료 묶음으로 확인되지 않는다.
- **통제 실험이 한 편뿐이다.** [[agents/lin-2026-harness-updating-is-not-harness-benefit]]만 agent와 evolver를 독립적으로 바꾸는 격자 설계를 갖췄고, 나머지 harness와 loop 자료에는 정량 결과가 없다. 따라서 단계 3과 단계 4의 효과 크기는 이 지도가 답하지 못한다.
- **그 한 편의 실험도 범위가 한정된다.** 같은 논문은 가중치를 바꾸는 적응 방법이 평가 밖이고 모델 집합이 망라적이지 않다고 스스로 밝힌다. 여기에 harness representation이 고정되어 `tools/`가 전 벤치마크에서 읽기 전용이라는 설정 제약과, evolution을 구동하는 task stream이 평가 집합을 겸해 별도의 보류 집합이 없다는 제약이 더해진다.
- **자기 보고 수치에 의존하는 대목이 많다.** harness 단계의 네 회사 수치는 전부 2차 인용이고, 품질 2배에서 3배 향상과 KV cache hit 90%는 측정 조건 없이 서술 안에 등장하는 값이다. 인용할 때는 원 출처를 다시 확인해야 한다.
- **prompt 단계의 원전이 비어 있다.** ReAct와 Chain-of-Thought를 비롯한 다섯 편이 목록으로만 존재하고 이 저장소에 전용 페이지가 없다. 그래서 단계 1의 서술은 뒤 단계 자료가 그 단계를 어떻게 회고하는지에 기대고 있다.
- **네 단계 구분 자체가 한 자료의 배열이다.** 시점과 제안자 표기는 [[agents/kang-2026-no-longer-prompting-claude]]에서 왔고, 그중 harness 단계의 attribution은 이 저장소 안에서 교차 확인되지 않는다. 네 단계를 확립된 학술 구분이 아니라 2026년 상반기 담론의 정리로 읽는 편이 맞다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| context engineering | 추론 중 context window에 들어갈 토큰 전체를 골라 유지하는 전략. 원하는 결과의 확률을 최대화하는 high-signal 토큰의 최소 집합을 찾는 일로 정의된다 |
| harness | 모델을 감싸 도구와 검증과 상태를 제공하는 실행 환경. 자료마다 폭이 달라 작업 환경 전체로 넓게 잡기도 하고 편집 가능한 artifact 집합으로 좁게 잡기도 한다 |
| loop engineering | 개별 프롬프트가 아니라 에이전트를 반복 구동하는 루프 자체를 설계 대상으로 삼는 관점 |
| verification distance | 구현 에이전트와 평가 에이전트를 분리해 자기 평가 편향을 차단하는 구조 |
| harness-benefit capability | 갱신된 harness에서 실제로 이득을 얻는 능력. base capability에 비단조로 반응해 중간 등급에서 정점을 찍는다 |
| comprehension debt | 배포된 시스템과 개발자의 이해 사이에 벌어지는 격차. 생성된 변경을 적극적으로 검토하지 않으면 계속 누적된다 |

## 관련 페이지

- [[overviews/agent-harness-engineering-overview]]: 단계 3의 상세 지도. 프레임과 실전 설정과 실증과 회의론까지 harness 담론을 한 장으로 묶는다.
- [[overviews/loop-engineering-cross-domain-overview]]: 단계 4의 상세 지도. 같은 loop 프레임이 코딩 밖 도메인으로 옮겨가는지 검토한다.
- [[overviews/agent-skills-overview]]: progressive disclosure의 구현 단위인 스킬을 설계와 생태계 관점에서 다룬다.
- [[agents/kang-2026-no-longer-prompting-claude]]: 네 단계 배열의 출처. 이 지도의 타임라인 골격과 제안자 표기가 여기서 왔다.
- [[agents/patel-2026-i-taught-myself-claude-code]]: prompt 단계의 원전 논문 다섯 편을 지목하는 학습 자료 목록. 저장소 보유 현황 대조로 무엇이 비어 있는지도 함께 보여준다.
- [[agents/anthropic-2025-effective-context-engineering-for-ai]]: 단계 1에서 단계 2로 넘어가는 전환의 원점. attention budget과 context rot, long-horizon 세 기법이 여기서 나온다.
- [[database/edge-2024-from-local-to-global]]: 컨텍스트를 community 요약으로 미리 접어 두는 경로. 압축의 절감 폭과 세부 손실을 함께 계측한 드문 사례다.
- [[agents/zhang-2026-recursive-language-models]]: 컨텍스트를 요약하지 않고 REPL 변수로 두는 반대 경로. 정보 밀도가 높은 task에서 압축 계열과 격차가 벌어진다.
- [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]]: 지식을 질의 시점이 아니라 수집 시점에 컴파일해 두는 stateful 구조. compounding 원리를 지식 관리 쪽으로 확장한 자료다.
- [[agents/lee-hoyeon-2026-harness-engineering]]: 단계 3의 프레임 자료. 여섯 단계 순환과 단계별 Claude Code 도구 매핑을 제공한다.
- [[agents/patel-2026-beyond-the-prompt-claude-code]]: 단계 3의 실전 설정. 설정 파일 계층부터 완료 조건 루프까지 절차로 풀어낸다.
- [[agents/trq212-2026-a-field-guide-to-fable]]: 단계 3의 입력단. 사람의 문제 정의가 결과의 상한을 긋는다는 진단과 unknown 발굴 패턴 8가지를 담는다.
- [[agents/lin-2026-harness-updating-is-not-harness-benefit]]: 단계 3의 실증. 이 지도에서 유일한 통제 실험이며 harness 낙관에 비단조 곡선이라는 조건을 붙인다.
- [[agents/osmani-2026-loop-engineering]]: 단계 4의 명명 자료. 루프의 구성 요소 카탈로그와 자동화가 남기는 세 가지 부담을 제시한다.
- [[agents/runkle-2026-the-art-of-loop-engineering]]: 단계 4의 층위 구획. 같은 loop를 네 겹의 중첩 구조로 나누고 개선 자체를 자동화하는 층을 맨 바깥에 둔다.
- [[agents/lee-jeongmin-2026-loop-engineering-claude-code]]: 단계 4의 이론 연결. loop 설계를 RLM 구조에 묶어 Claude Code의 dynamic workflow가 왜 그렇게 설계됐는지를 읽는다.
