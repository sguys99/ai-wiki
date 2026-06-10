---
title: "또 새로운 용어? Loop Engineering — Claude Code, RLM, Dynamic Workflow 7가지 정리 (Jeongmin Lee, LinkedIn 2026-06-09)"
type: article
year: 2026
category: agents
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/articles/lee-jeongmin-2026-loop-engineering-claude-code.md
raw_filename: "lee-jeongmin-2026-loop-engineering-claude-code.md"
source_collection: external
author: "Jeongmin Lee (LinkedIn 핸들 jyoung105)"
url: "https://www.linkedin.com/posts/jyoung105_또-새로운-용어-loop-engineering-claude-code-share-7469915686845247488-ecQO/"
publisher: "LinkedIn"
publication_date: "2026-06-09"
tags: [loop-engineering, claude-code, rlm, recursive-language-model, dynamic-workflow, subagent, boris-cherny, peter-steinberger, addy-osmani, openclaw, anthropic, opus-4-8, codeact, kv-cache, context-window, agentic-laziness, fan-out-and-synthesize, adversarial-verification, tournament-pattern]
---

## 한 줄 요약 (One-line Summary)

LinkedIn에 올라온 짧은 카드 포스트(2026-06-09, 좋아요 158·댓글 2)다. Jeongmin Lee가 *"loop engineering이란 결국 에이전트를 프롬프트하는 시스템을 설계하는 일이다"* 라는 한 줄짜리 정의를 축으로 삼아, Boris Cherny(Anthropic, Claude Code 메이커)·Peter Steinberger(OpenClaw)·Addy Osmani 세 사람의 발언을 RLM(Recursive Language Model) 이라는 이론적 근거에 묶어 7가지 항목으로 풀어낸 글이다. 핵심 thesis는 *"용어 놀이라는 비아냥은 자연스럽지만, RLM을 알고 나면 Claude Code의 dynamic workflow가 왜 그렇게 설계됐는지 비로소 보인다"* — 사람이 프롬프트를 치고 결과를 보고 다시 치는 루프에는 한계가 있고, 그 자리를 태스크 발견·분배·실행·검증·다음 결정까지 자동으로 도는 loop가 메운다는 진단이다. 글 전반에 반복되는 실천 포인트는 (1) Addy Osmani의 5-building-block(Automation·worktree·skill·connector·subagent), (2) RLM의 REPL 변수 모델 — context를 변수로 두고 에이전트가 필요한 부분만 골라 읽으며 print 출력은 scaffold가 강제로 자른다, (3) `llm_query()`가 subagent 결과를 토큰이 아니라 Python 변수로 돌려준다는 점(상위 에이전트는 변수 검증 후 `FINAL()`로 반환, 이론상 출력 길이 제한 없음), (4) Opus 4.8과 함께 출시된 Claude Code dynamic workflow가 JavaScript로 subagent를 조율하며 단일 context의 agentic laziness·self-preferential bias·goal drift를 구조적으로 차단한다는 진단, (5) 실전 패턴은 fan-out-and-synthesize·adversarial verification·tournament 등이며 코드 리팩토링뿐 아니라 리서치 검증·서포트 티켓 분류 같은 비개발 업무에도 통한다는 권고, (6) KV cache hit 비율이 최대 90%까지 올라가 비용 면에서도 RLM이 유리하다는 관찰, (7) 현재 비용은 부담스럽지만 모델 단가 하락과 cache hit 상승이 진행되면 loop는 결국 기본값이 되리라는 전망이다. 마무리는 *"RLM이 무엇인지는 알아두라 — 그래야 dynamic workflow가 왜 그렇게 설계됐는지 보이고 다음 스텝을 준비할 수 있다"*. 본문은 1인칭 친근체로 쓰였고, 참고 링크 2개(lnkd.in 단축 URL)가 첨부됐지만 본문에는 풀어 옮기지 않았다.

## 1. 자료 정보 (Document Information)

- **형식**: LinkedIn 텍스트 카드 포스트, 1인칭 친근체로 쓴 짧은 에세이(약 1,400자). 헤딩 7개 + 워닝 1개 구조(❶~❻ + ⚠️).
- **저자**: **Jeongmin Lee** (LinkedIn 핸들 `jyoung105`) — 본문 마지막에 *"꼭 필요한 AI 정보를 지속적으로 업로드하고 있습니다. 저와 '1촌'이 되면…"* 이라고 쓴 것으로 보아 한국어 AI 콘텐츠 큐레이터 성격의 계정으로 추정된다. *"제가 3개월 전에도 작성한 것처럼 loop 자체는 LLM의 부족한 판단력을 구조적으로 극복한다"* 라는 자기-인용이 있어 동일 주제(Recursive·Loop) 연재가 있는 듯하다.
- **발행일**: **2026-06-09** (WebFetch 기준 "21시간 전", 수집 시점 2026-06-10).
- **URL**: <https://www.linkedin.com/posts/jyoung105_또-새로운-용어-loop-engineering-claude-code-share-7469915686845247488-ecQO/> (리다이렉트 후 `kr.linkedin.com/...activity-7469915687986098177-x9r-`).
- **상호작용**: 좋아요 158, 댓글 2.
- **참고 링크**: 본문 끝에 lnkd.in 단축 URL 2개(`giBBf-fe`, `gM8ZviyE`). 어느 자료를 가리키는지 본문에 명시되지 않았다 — 정황상 RLM 논문과 Boris Cherny/Addy Osmani의 talk 또는 글로 추정되지만 단정하지 않는다.
- **시각 요소**: 텍스트만. LinkedIn 자체에는 첨부 카드/이미지가 있었을 수 있으나, rule #1(웹 검색 금지)에 따라 본 wiki는 텍스트 본문만 확보했고 `figures` 키는 생략한다.
- **본 wiki 내 인접 자료**:
  - [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering (이호연)]] — *Prompt → Context → Harness*의 3단계 진화를 한국어로 정리한 강의 슬라이드. 본 글의 "loop engineering"은 이호연이 말하는 harness 6축 순환의 하위 개념(특히 subagent/worktree 축)과 대응한다.
  - [[agents/patel-2026-beyond-the-prompt-claude-code|Beyond the Prompt: Claude Code (Arpan Patel)]] — Boris Cherny의 *"verify its own work"* 원칙과 Claude Code `.claude/` 설정·skills·subagents·worktree·`/goal` Ralph Loop를 망라한 27분 분량 실전 가이드. 본 글이 Boris의 *"나는 더 이상 Claude에 프롬프트를 치지 않는다 — loop를 짠다"* 발언을 RLM 이론으로 풀이한 반면, Patel은 같은 발언을 운영 매뉴얼로 풀어낸 짝이다.
  - [[agents/lin-2026-harness-updating-is-not-harness-benefit|Harness Updating Is Not Harness Benefit (Lin et al.)]] — self-evolving 에이전트의 이득을 base capability·harness-updating·harness-benefit 셋으로 가른 논문. 본 글이 *"loop는 LLM의 부족한 판단력을 구조적으로 극복한다"* 라고 주장한 자리에 대한 통제 실험 짝이다.
  - [[etc/rahman-2026-a-practical-guide-to-becoming|AI-Native Engineer 실전 가이드 (Shah Rahman)]] — 조직 차원의 4 Core Practices·ADLC 운영 프레임. 본 글이 도구 차원의 loop 설계라면, Rahman은 같은 mental shift를 팀/조직 차원으로 끌어올린 짝이다.

## 2. 주요 기여 (Key Contributions)

1. **Loop engineering 용어의 등장 배경 정리** — Boris Cherny의 *"나는 더 이상 Claude에 프롬프트를 치지 않는다. 내 일은 loop를 짜는 것이다"* (Anthropic 개발자 컨퍼런스)와 Peter Steinberger(OpenClaw)의 *"코딩 에이전트에게 프롬프트를 치지 마라. 에이전트를 프롬프트하는 loop를 설계하라"* 를 같은 흐름의 두 입구로 묶었다. 저자는 *"용어 놀이라는 비아냥은 자연스럽지만 근거는 충분하다"* 는 입장을 분명히 밝힌다.
2. **5-building-block 프레임 인용** — Addy Osmani가 loop engineering을 **Automation · worktree · skill · connector · subagent** 다섯 블록으로 정리했다는 인용을 그대로 옮긴다. 출처 링크는 본문에 풀려 있지 않다.
3. **RLM(Recursive Language Model)을 이론적 기반으로 명시** — *"보통 LLM은 입력 전체를 context window에 한꺼번에 올린다. 하지만 RLM은 다르다. REPL 환경에 context라는 변수가 있고 에이전트가 필요한 부분만 골라 읽는다"*. print 출력이 scaffold 단에서 강제로 잘려 불필요한 정보가 context를 채우지 않는다는 점을 핵심 차별점으로 든다.
4. **`llm_query()` API 시맨틱 해설** — 기존 CodeAct + subagent 구조와 비교한다. CodeAct에서는 하위 에이전트 결과 전체가 상위 context로 올라간다. RLM의 `llm_query()`는 결과가 REPL 내 Python 변수로 돌아오고, 상위 에이전트는 변수만 검증한 뒤 `FINAL()`로 반환한다. *"결과를 토큰 단위로 다시 생성할 필요가 없고 이론상 출력 길이 제한도 없다"*.
5. **Claude Code Dynamic Workflow(Opus 4.8)의 설계 의도 해독** — JavaScript로 subagent를 생성·조율하고, 각 subagent가 독립된 context window에서 작동하며 결과만 상위로 올린다. 저자는 *"에이전트가 긴 작업 중간에 멈추거나 결과를 대충 넘기던 게 다 이유가 있었다"* 라고 진단하면서, RLM이 단일 context window에서 생기는 **agentic laziness · self-preferential bias · goal drift** 셋을 구조로써 차단한다고 정리한다.
6. **Dynamic workflow 실전 패턴 카탈로그** — fan-out-and-synthesize(작업 병렬 분할 후 합치기), adversarial verification(별도 에이전트가 결과를 서로 검증), tournament(여러 접근법을 경쟁시킴) 세 가지를 사례로 든다. 적용 범위는 *"코드 리팩토링뿐 아니라 리서치 검증이나 서포트 티켓 분류처럼 비개발 업무에서도 Claude Code 안에서 바로 쓸 수 있다"*.
7. **비용 관찰** — RLM에서는 subagent가 한 단계씩 작업하면 system prompt와 이전 메시지가 그대로 유지되어 *"KV cache hit 비율이 90%까지 올라갈 수 있다"*. 에이전트가 읽을 범위를 직접 결정하니 전체 prompt를 매번 스캔하는 비용이 빠진다.
8. **현실 진단과 전망** — 현재 dynamic workflow는 토큰을 많이 쓰지만 *"일반 코딩 작업에 verifier 5개를 붙일 필요는 없다"* 는 균형추를 제시한다. 마무리는 *"모델 비용이 내려가고 cache-hit 비율이 높아질수록 loop의 활용은 기본값이 된다"*.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

본 글은 1차 연구가 아니라 **인용 + 해설** 구조의 카드 포스트다. 저자가 직접 측정·실험한 결과는 없고, 세 사람의 발언을 한 줄씩 인용한 뒤 RLM 논문의 시맨틱을 풀어 설명하는 방식이다. 본문에서 추려낸 아키텍처 그림은 다음과 같다.

### 3.1 기존 LLM 호출 vs RLM의 차이 (본문 ❷)

```
[기존 LLM]
  입력 전체  ──────────►  context window (full load)
  ↑
  context는 단일 텍스트 stream

[RLM]
  REPL 환경
   ├─ context : 변수
   ├─ 에이전트가 필요한 부분만 골라 read
   └─ print 출력 → scaffold가 강제 truncate
```

핵심 변화는 *context를 단일 stream이 아니라 REPL 변수로 둔다* 는 점이다. 에이전트가 필요한 부분을 골라 읽고, 출력이 scaffold 단에서 잘려 불필요한 정보가 context를 채우지 않는다.

### 3.2 CodeAct + subagent vs RLM `llm_query()` (본문 ❸)

```
[CodeAct + subagent]
  subagent 결과 전체 → 상위 context 에 토큰 단위로 spliced
  → 상위 context 가 빠르게 부풀어 오름

[RLM llm_query()]
  subagent 결과 → REPL 내 Python 변수로 반환
  → 상위 에이전트는 변수만 검증
  → FINAL(변수)로 마무리
  → 결과를 토큰으로 재생성하지 않음
  → 이론상 출력 길이 제한 없음
```

이 시맨틱 차이가 본문의 "비용 우위" 주장으로 이어진다. 상위 context에 결과를 통째로 다시 올리지 않으니 system prompt와 이전 메시지가 유지되고, KV cache hit 비율이 최대 90%까지 올라간다는 관찰이다.

### 3.3 Claude Code Dynamic Workflow의 골격 (본문 ❹)

- **출시 시점**: Opus 4.8과 함께.
- **언어**: JavaScript로 subagent 생성·조율.
- **context 격리**: 각 subagent가 독립된 context window.
- **결과 흐름**: 결과만 상위로 올라감(전체 history가 아니라).
- **차단 대상**: 단일 context window에서 생기는 *agentic laziness · self-preferential bias · goal drift* 셋.

### 3.4 Dynamic workflow 패턴 카탈로그 (본문 ❺)

| 패턴 | 설명 | 적용 사례 |
|---|---|---|
| fan-out-and-synthesize | 작업을 병렬 subagent로 분할 후 합침 | 큰 리팩토링, 멀티-아이디어 탐색 |
| adversarial verification | 별도 에이전트가 결과를 서로 검증 | 정확성 요구 높은 코드/리서치 |
| tournament | 여러 접근법을 경쟁시켜 우승자 선택 | 알고리즘 선택, 디자인 비교 |

본문은 *"코드 리팩토링뿐 아니라 리서치 검증이나 서포트 티켓 분류처럼 비개발 업무에서도 Claude Code 안에서 바로 쓸 수 있다"* 라고 적용 범위를 넓힌다.

### 3.5 Loop engineering의 5 building blocks (Addy Osmani 인용, 본문 ❶)

- **Automation** — 사람의 개입 없이 도는 자동화 단위
- **worktree** — git worktree 기반 병렬 작업 공간
- **skill** — 폴더 단위 재사용 가능 능력 묶음
- **connector** — 외부 시스템 연결(MCP 등)
- **subagent** — 격리된 context의 하위 에이전트

본문에서는 이 5개를 나열만 하고 각 블록을 깊이 풀어내진 않는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

본 글은 발표 글의 성격상 정량 벤치마크 결과를 제시하지 않는다. 본문에 등장하는 수치는 다음 두 가지뿐이다.

- **KV cache hit 비율 최대 90%** (본문 ❻, RLM 구조에서 subagent가 한 단계씩 작업할 때).
- **저자의 자기-인용**: *"제가 3개월 전에도 작성한 것처럼"* — 동일 주제 선행 글이 있다는 정황. 정확한 시점·URL은 본문에 없다.
- **상호작용 지표**: 좋아요 158, 댓글 2 (수집 시점 2026-06-10).

벤치마크·실험 결과를 원한다면 본문이 가리키는 RLM 논문과 Dynamic workflow 출시 노트(Opus 4.8)를 별도 자료로 ingest해야 한다. 본 글은 결과보다 *"왜 그렇게 설계됐는지"* 의 해독에 무게를 둔다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

본문이 스스로 인정한 한계는 다음과 같다.

1. **토큰 비용이 크다** — *"현재의 Dynamic workflow는 토큰을 많이 씁니다"*. 저자는 *"일반 코딩 작업에 verifier 5개를 붙일 필요는 없다"* 며 자제를 권한다.
2. **자가 환경 구축의 부담** — *"이 환경을 직접 만드는 것도 비용적으로 아직 부담이 큽니다"*. Loop 환경을 자체 구축하려면 인프라·운영비가 만만치 않다는 진단.
3. **용어 인플레이션 피로감** — *"지난 3년간, 그리고 최근 수 개월 간 등장한 여러 용어들로 사용자들의 피로감은 매우 높다"*. Loop engineering이라는 작명이 일부에게 비아냥의 대상이 되는 맥락을 인정한다.

향후 과제로 본문이 제시하는 방향은 단순하다 — *"모델 비용이 내려가고 cache-hit 비율이 높아질수록 loop의 활용은 기본값이 된다"*. 즉 **모델 단가 하락**과 **cache hit 비율 상승** 두 축이 loop engineering의 main-streaming을 결정한다는 시각이다.

본 글에는 없지만 추적할 가치가 있는 후속 질문은 다음과 같다 — (a) RLM 논문 본문의 실제 벤치마크 수치는 얼마인가? (b) Opus 4.8 Dynamic Workflow 출시 노트가 권장하는 verifier 개수와 패턴 가이드는? (c) fan-out-and-synthesize·adversarial verification·tournament 셋 사이의 비용/품질 trade-off는?

## 6. 관련 연구 (Related Work)

본문이 명시적으로 호명한 인물·자료는 다음과 같다.

- **Boris Cherny** (Anthropic, Claude Code 메이커) — *"나는 더 이상 Claude에 프롬프트를 치지 않는다. 내 일은 loop를 짜는 것이다"* (Anthropic 개발자 컨퍼런스 발언).
- **Peter Steinberger** (OpenClaw) — *"코딩 에이전트에게 프롬프트를 치지 마라. 에이전트를 프롬프트하는 loop를 설계하라"*.
- **Addy Osmani** — loop engineering의 5 building blocks 분류(Automation·worktree·skill·connector·subagent) 출처.
- **RLM 논문** — *"RLM 논문을 읽어보면 이 구조가 명쾌하게 잡힌다"*. 본문은 논문 제목·저자·연도를 명시하지 않고 개념만 가져온다.
- **CodeAct** — 비교 대상 선행 아키텍처. 본문은 *"하위 에이전트 결과 전체가 상위 context에 올라갔다"* 는 점을 차이점의 출발선으로 든다.
- **Claude Code Opus 4.8 Dynamic Workflow** — 출시 시점과 JavaScript subagent 조율 구조.
- **Transformer 쇠퇴론** — 결론부에서 *"지난 몇 년간 Transformer의 쇠퇴론 등 많은 비관 속에서도 결국 AI 발전의 큰 방향에서 프론티어 랩에서 주장하는 내용은 모두 반영되었다"* 라는 회상의 맥락에서 한 번 언급된다.

본문 끝의 단축 URL 두 개(`https://lnkd.in/giBBf-fe`, `https://lnkd.in/gM8ZviyE`)는 어느 자료를 가리키는지 본문에 명시되지 않았다. 정황상 RLM 논문과 Boris/Addy의 talk 또는 글로 추정되지만 본 sources는 단정하지 않는다.

## 7. 용어집 (Glossary)

- **Loop engineering** — 에이전트가 태스크 발견·분배·실행·검증·다음 결정까지 자동으로 도는 loop를 설계하는 시스템 엔지니어링. 사람이 프롬프트를 치고 결과를 보고 다시 치는 수작업 루프의 대안.
- **RLM (Recursive Language Model)** — REPL 환경에 context를 변수로 두고, 에이전트가 필요한 부분만 골라 읽으며 `llm_query()`로 호출한 subagent 결과를 변수로 받는 모델 구조. print 출력이 scaffold 단에서 강제로 잘려 context 오염을 차단한다.
- **`llm_query()`** — RLM의 핵심 API. subagent를 호출하고 결과를 REPL 내 Python 변수로 돌려준다. 결과를 토큰 단위로 재생성하지 않으므로 이론상 출력 길이 제한이 없다.
- **`FINAL()`** — 상위 에이전트가 변수 검증을 마치고 최종 결과를 반환할 때 쓰는 RLM 시맨틱.
- **CodeAct** — 하위 에이전트 결과 전체를 상위 context에 splice하는 선행 아키텍처. 본 글에서는 RLM과 대비되는 기준선 역할을 한다.
- **Dynamic Workflow (Claude Code)** — Opus 4.8과 함께 출시된 JavaScript 기반 subagent 조율 구조. 각 subagent가 독립된 context window에서 작동하고 결과만 상위로 올린다.
- **agentic laziness · self-preferential bias · goal drift** — 단일 context window에서 자주 관찰되는 세 가지 실패 모드. RLM이 구조적으로 차단한다고 본문은 진단한다.
- **fan-out-and-synthesize** — 작업을 병렬 subagent로 분할한 뒤 결과를 합치는 dynamic workflow 패턴.
- **adversarial verification** — 별도 에이전트가 결과를 서로 검증하는 패턴.
- **tournament** — 여러 접근법을 경쟁시켜 우승자를 고르는 패턴.
- **5 building blocks (Addy Osmani)** — Automation · worktree · skill · connector · subagent.
- **KV cache hit** — Transformer 추론에서 system prompt와 이전 메시지의 key/value 캐시가 재사용되는 비율. RLM 구조에서 최대 90%까지 올라간다고 본문은 인용한다.
- **OpenClaw** — Peter Steinberger가 관여한 도구/프로젝트. 본문에는 이름만 등장하고 상세 설명은 없다.
- **Anthropic 개발자 컨퍼런스** — Boris Cherny가 *"나는 더 이상 프롬프트를 치지 않는다"* 발언을 했다고 본문이 인용한 행사. 정확한 회차·일자는 명시되지 않았다.
- **Opus 4.8** — Dynamic Workflow가 함께 출시된 Claude 모델 버전.

<!-- HUMANIZE-SUMMARY v1.6.1
run_id: 2026-06-10-001
metrics:
  char_in: ~6100
  char_out: ~6090
  change_rate: ~3%
  self_check: 6/6
  grade: A
categories:  # before → after
  D-1 결산 피벗 "결론은/정리하면": 2 → 0
  H-3 메타 진입 "이는~/이 점에서": 1 → 0
  A-15 추상 주어 + 만능 동사: 4 → 1
  E-2 "~다" 연속 + "있다" 진행형: 일부 → 다양화
  D-7 변환 공식 "X에서 Y로" / D-2 "주목할 만하다": 0 → 0 (원문 없음)
self_check:
  - 고유명사·수치·인용 100% 보존: OK
  - 변경률 30% 이하 (실측 약 3%): OK
  - 장르 이탈 없음 (리포트 register 유지): OK
  - register 보존 (격식체 ~다/~이다 유지): OK
  - S1 잔존 0건: OK
  - 인공 표현 추가 없음 (원문 골격 유지): OK
highlights:
  - id: D-1
    before: "결론은 \"RLM이 무엇인지는 알아두라\""
    after: "마무리는 \"RLM이 무엇인지는 알아두라\""
  - id: D-1
    before: "결론은 \"모델 비용이 내려가고...\""
    after: "마무리는 \"모델 비용이 내려가고...\""
  - id: A-15
    before: "본문에서 추출되는 아키텍처 그림은"
    after: "본문에서 추려낸 아키텍처 그림은"
  - id: H-3 / E-2
    before: "라는 입장을 명시한다"
    after: "라는 입장을 분명히 밝힌다"
  - id: A-15
    before: "라고 진단하며, RLM이 ... 차단한다고 정리한다"
    after: "라고 진단하면서, RLM이 ... 차단한다고 정리한다"
  - id: E-2
    before: "loop가 메우고 있다는 진단이다"
    after: "loop가 메운다는 진단이다"
  - id: D-1 / E-2
    before: "라고 적용 범위를 확장한다"
    after: "라고 적용 범위를 넓힌다"
residual_findings: (없음 — 본 문서는 sources/{stem}.md 요약 register라 인용·구조 보존 비중이 매우 높아 의도적으로 변경률을 낮게 유지)
grade_reason: "A — S1 잔존 0건, frontmatter·헤딩·표·인용·코드블록·위키링크·URL·파일경로 100% 보존, AI 티 핵심(D-1 결산 피벗 2건·A-15 추상 주어 4건 중 3건·E-2 진행형 1건) 제거. 변경률은 보존 요구가 큰 sources 문서 특성상 약 3%로 낮으나, 산문 부분의 AI 티는 모두 처리됨."
-->
