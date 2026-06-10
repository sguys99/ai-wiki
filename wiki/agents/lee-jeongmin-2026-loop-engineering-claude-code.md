---
title: "Loop Engineering — Claude Code · RLM · Dynamic Workflow (Jeongmin Lee, LinkedIn 2026-06-09)"
type: article
year: 2026
category: agents
source: lee-jeongmin-2026-loop-engineering-claude-code.md
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/articles/lee-jeongmin-2026-loop-engineering-claude-code.md
raw_filename: "lee-jeongmin-2026-loop-engineering-claude-code.md"
source_collection: external
author: "Jeongmin Lee (LinkedIn 핸들 jyoung105)"
url: "https://www.linkedin.com/posts/jyoung105_또-새로운-용어-loop-engineering-claude-code-share-7469915686845247488-ecQO/"
publisher: "LinkedIn"
publication_date: "2026-06-09"
tags: [loop-engineering, claude-code, rlm, recursive-language-model, dynamic-workflow, subagent, boris-cherny, peter-steinberger, addy-osmani, openclaw, anthropic, opus-4-8, codeact, kv-cache, context-window]
---

## 요약 (Summary)

Jeongmin Lee가 LinkedIn에 올린 짧은 카드 포스트(2026-06-09)다. **"loop engineering이란 결국 에이전트를 프롬프트하는 시스템을 설계하는 일이다"** 라는 한 줄짜리 정의를 축 삼아, Boris Cherny(Anthropic, Claude Code 메이커)·Peter Steinberger(OpenClaw)·Addy Osmani 세 사람의 발언을 RLM(Recursive Language Model) 이론에 묶어 7가지 항목으로 풀어낸다. 핵심 thesis는 *"용어 놀이라는 비아냥은 자연스럽지만, RLM을 알고 나면 Claude Code의 dynamic workflow가 왜 그렇게 설계됐는지 비로소 보인다"* — 사람이 프롬프트를 치고 결과를 보고 다시 치는 수작업 루프의 한계를, 태스크 발견·분배·실행·검증·다음 결정까지 자동으로 도는 loop가 메운다는 진단이다.

본문이 짚어내는 RLM의 결정적 차이는 둘이다. 첫째, context를 단일 stream이 아니라 **REPL 변수**로 둔다 — 에이전트가 필요한 부분만 골라 읽고 print 출력은 scaffold가 강제로 잘라 context 오염을 차단한다. 둘째, `llm_query()`가 subagent 결과를 토큰이 아니라 **Python 변수**로 돌려준다 — 상위 에이전트는 변수 검증만 거쳐 `FINAL()`로 반환하므로 이론상 출력 길이 제한이 없다. 이 시맨틱은 Opus 4.8과 함께 출시된 Claude Code dynamic workflow의 설계 의도(JavaScript subagent 조율 + 격리 context)와 그대로 맞물리며, 단일 context window의 고질병인 **agentic laziness · self-preferential bias · goal drift** 셋을 구조적으로 차단한다는 게 본문의 결론이다.

## 주요 기여 (Key Contributions)

1. **Loop engineering 용어의 등장 배경 정리** — Boris Cherny의 *"나는 더 이상 Claude에 프롬프트를 치지 않는다. 내 일은 loop를 짜는 것이다"* (Anthropic 개발자 컨퍼런스)와 Peter Steinberger의 *"코딩 에이전트에게 프롬프트를 치지 마라. 에이전트를 프롬프트하는 loop를 설계하라"* 를 같은 흐름의 두 입구로 묶었다.
2. **Addy Osmani의 5-building-block 인용** — Automation · worktree · skill · connector · subagent. 본문은 다섯 블록을 나열만 하고 깊이 풀진 않는다.
3. **RLM을 이론적 기반으로 명시** — REPL 환경에서 context가 변수로 존재하며, 에이전트가 필요한 부분만 읽고 print 출력은 scaffold가 강제로 자른다는 차별점.
4. **`llm_query()` 시맨틱 해설** — CodeAct + subagent에서는 하위 결과가 상위 context로 통째 splice된다. RLM은 결과를 Python 변수로 돌려주고 상위는 검증만 한 뒤 `FINAL()`로 반환한다. 토큰 단위 재생성이 없으니 이론상 출력 길이 제한이 없다.
5. **Claude Code Dynamic Workflow(Opus 4.8) 해독** — JavaScript로 subagent를 생성·조율하고 각 subagent가 독립된 context window에서 작동한다. RLM 구조가 **agentic laziness · self-preferential bias · goal drift** 셋을 차단한다는 진단.
6. **실전 패턴 카탈로그** — fan-out-and-synthesize · adversarial verification · tournament. 적용 범위는 코드 리팩토링을 넘어 리서치 검증, 서포트 티켓 분류 같은 비개발 업무까지 뻗는다.
7. **비용 관찰** — subagent가 한 단계씩 작업하면 system prompt와 이전 메시지가 유지돼 *"KV cache hit 비율이 90%까지 올라갈 수 있다"*. 에이전트가 읽을 범위를 직접 정하니 전체 prompt를 매번 스캔하는 비용도 빠진다.
8. **현실 진단과 전망** — 현재 dynamic workflow는 토큰을 많이 쓰지만 *"일반 코딩 작업에 verifier 5개를 붙일 필요는 없다"*. 모델 단가 하락과 cache hit 비율 상승이 진행되면 loop는 결국 기본값이 된다는 전망.

## 방법론 및 아키텍처 (Methodology and Architecture)

본 글은 1차 연구가 아니라 **인용 + 해설** 구조의 카드 포스트다. 저자의 직접 측정·실험은 없고, 세 사람의 발언을 한 줄씩 인용한 뒤 RLM 논문의 시맨틱을 풀어 설명한다. 본문에서 추려낸 아키텍처 그림은 두 장면이다.

**기존 LLM vs RLM** — 기존 LLM은 입력 전체를 context window에 한꺼번에 올린다. RLM은 REPL 환경에 context라는 변수를 두고 에이전트가 필요한 부분만 골라 읽으며 print 출력은 scaffold 단에서 강제로 잘린다. 단일 stream을 변수로 바꾼 것이 핵심 차이다.

**CodeAct vs RLM `llm_query()`** — CodeAct + subagent에서는 하위 결과 전체가 상위 context로 올라가 토큰 단위로 splice된다. RLM의 `llm_query()`는 결과를 REPL 내 Python 변수로 돌려준다. 상위 에이전트는 변수만 검증한 뒤 `FINAL()`로 마무리하므로 결과를 토큰으로 재생성할 필요가 없고 이론상 출력 길이 제한도 없다. 본문의 "비용 우위" 주장은 여기서 나온다 — 상위 context에 결과를 통째로 다시 올리지 않으니 system prompt와 이전 메시지가 유지되고 KV cache hit 비율이 최대 90%까지 올라간다는 관찰이다.

**Claude Code Dynamic Workflow의 골격** — Opus 4.8과 함께 출시. JavaScript로 subagent를 생성·조율하고 각 subagent는 독립된 context window에서 작동하며 결과만 상위로 올린다. 차단 대상은 단일 context window에서 생기는 **agentic laziness · self-preferential bias · goal drift** 셋.

| 실전 패턴 | 설명 | 적용 사례 |
|---|---|---|
| fan-out-and-synthesize | 작업을 병렬 subagent로 분할 후 합침 | 큰 리팩토링, 멀티-아이디어 탐색 |
| adversarial verification | 별도 에이전트가 결과를 서로 검증 | 정확성 요구 높은 코드/리서치 |
| tournament | 여러 접근법을 경쟁시켜 우승자 선택 | 알고리즘 선택, 디자인 비교 |

## 결과와 관찰 (Results & Observations)

발표 글 성격상 정량 벤치마크는 없다. 본문에 등장하는 수치는 두 가지뿐이다.

- **KV cache hit 비율 최대 90%** — RLM 구조에서 subagent가 한 단계씩 작업할 때.
- **상호작용 지표** — 좋아요 158, 댓글 2 (수집 시점 2026-06-10).

저자의 자기-인용 *"제가 3개월 전에도 작성한 것처럼"* 으로 보아 동일 주제(Recursive·Loop)에 대한 선행 글이 있는 듯하지만 정확한 시점·URL은 본문에 없다. 벤치마크·실험 결과를 원한다면 본문이 가리키는 RLM 논문과 Dynamic workflow 출시 노트(Opus 4.8)를 별도 자료로 ingest해야 한다.

## 한계 (Limitations)

본문이 스스로 인정한 한계는 셋이다.

1. **토큰 비용이 크다** — *"현재의 Dynamic workflow는 토큰을 많이 씁니다"*. 일반 코딩 작업에 verifier 5개를 붙일 필요는 없다는 자제 권고가 따라붙는다.
2. **자가 환경 구축의 부담** — Loop 환경을 자체 구축하려면 인프라·운영비가 만만치 않다.
3. **용어 인플레이션 피로감** — 지난 3년간, 그리고 최근 수 개월 사이 등장한 여러 용어들로 사용자 피로도가 높다. Loop engineering이라는 작명이 일부에게 비아냥의 대상이 되는 맥락을 저자가 인정한다.

본 글에 없지만 추적할 가치가 있는 후속 질문은 — RLM 논문의 실제 벤치마크 수치, Opus 4.8 Dynamic Workflow 출시 노트가 권장하는 verifier 개수와 패턴 가이드, fan-out-and-synthesize·adversarial verification·tournament 사이의 비용/품질 trade-off다.

## 관련 페이지 (Related Pages)

- [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering (이호연)]] — *Prompt → Context → Harness*의 3단계 진화를 한국어로 정리한 강의 슬라이드. 본 글의 "loop engineering"은 이호연이 말하는 harness 6축 순환의 하위 개념(특히 subagent/worktree 축)과 짝을 이룬다.
- [[agents/patel-2026-beyond-the-prompt-claude-code|Beyond the Prompt: Claude Code (Arpan Patel)]] — Boris Cherny의 *"verify its own work"* 원칙을 운영 매뉴얼로 풀어낸 27분 분량 실전 가이드. 본 글이 Boris 발언을 RLM 이론으로 풀이한 자리라면, Patel은 같은 발언을 `.claude/` 설정·skills·subagents·worktree·`/goal` Ralph Loop로 풀어낸 짝이다.
- [[agents/lin-2026-harness-updating-is-not-harness-benefit|Harness Updating Is Not Harness Benefit (Lin et al.)]] — self-evolving 에이전트의 이득을 base capability·harness-updating·harness-benefit 셋으로 가른 논문. 본 글이 *"loop는 LLM의 부족한 판단력을 구조적으로 극복한다"* 라고 단언한 자리에 대한 통제 실험 짝이다.
- [[etc/rahman-2026-a-practical-guide-to-becoming|AI-Native Engineer 실전 가이드 (Shah Rahman)]] — 조직 차원의 4 Core Practices·ADLC 운영 프레임. 본 글이 도구 차원의 loop 설계라면, Rahman은 같은 mental shift를 팀/조직 차원으로 끌어올린 짝이다.

## 인용 메모 (Quote Notes)

본문에 등장하는 발언 인용을 그대로 옮긴다. 출처·맥락은 본문 내 진술 기준이다.

- **Boris Cherny** (Anthropic, Claude Code 메이커, Anthropic 개발자 컨퍼런스) — *"나는 더 이상 Claude에 프롬프트를 치지 않는다. 내 일은 loop를 짜는 것이다."*
- **Peter Steinberger** (OpenClaw) — *"코딩 에이전트에게 프롬프트를 치지 마라. 에이전트를 프롬프트하는 loop를 설계하라."*
- **Jeongmin Lee** (본문 결론) — *"RLM이 무엇인지는 알아두라 — 그래야 Dynamic workflow가 왜 그렇게 설계됐는지 보이고 다음 스텝으로 우리가 무엇을 준비해야 하는지도 감이 잡힌다."*

본문 끝의 단축 URL 두 개(`https://lnkd.in/giBBf-fe`, `https://lnkd.in/gM8ZviyE`)는 어느 자료를 가리키는지 본문에 명시되지 않았다 — 정황상 RLM 논문과 Boris/Addy의 talk·글로 추정되지만 단정하지 않는다.

<!-- HUMANIZE-SUMMARY v1.6.1
run_id: 2026-06-10-002
metrics:
  char_in: 6727
  char_out: 6695
  change_rate: 1.4%
  self_check: 6/6
  grade: A
categories:  # before → after
  C-11 연결어미 뒤 쉼표 (-고/-며/-아서 직후): 6 → 0
  H-3 메타 진입 ("이 시맨틱 차이가"): 1 → 0
  A-15 추상 주어 + 만능 동사 ("본 글은 ~ 싣지 않는다"): 1 → 0
  D-7 "X에서 Y로" 변환 공식: 1 → 1 (보존 — 본문 핵심 대조 구조, 1회는 임계 미만)
  F-5 추상 ("두 가지/세 가지"): 2 → 0 (셋/둘로 자연화)
  E-2 "~다" 단조 종결: 다수 → 다수 (리포트 register상 유지)
self_check:
  - 고유명사·수치·인용 100% 보존: PASS (Boris Cherny·Peter Steinberger·Jeongmin Lee 인용·frontmatter·표·인라인 코드·wikilink·URL 무손상)
  - 변경률 30% 이하: PASS (1.4%)
  - 장르 이탈 없음: PASS (리포트 register 유지)
  - register 보존: PASS (격식 평서체 유지)
  - S1 잔존 0건: PASS
  - 인공 표현 추가 없음: PASS
highlights:
  - id: C-11
    before: "에이전트가 필요한 부분만 골라 읽고, print 출력은 scaffold가 강제로 잘라 context 오염을 차단한다"
    after: "에이전트가 필요한 부분만 골라 읽고 print 출력은 scaffold가 강제로 잘라 context 오염을 차단한다"
  - id: H-3 + A-15
    before: "이 시맨틱 차이가 본문의 \"비용 우위\" 주장으로 이어진다 — 상위 context에 결과를 통째로 다시 올리지 않으니"
    after: "본문의 \"비용 우위\" 주장은 여기서 나온다 — 상위 context에 결과를 통째로 다시 올리지 않으니"
  - id: A-15
    before: "본 글은 발표 글 성격상 정량 벤치마크를 싣지 않는다."
    after: "발표 글 성격상 정량 벤치마크는 없다."
  - id: F-5
    before: "본문이 스스로 인정한 한계는 세 가지다."
    after: "본문이 스스로 인정한 한계는 셋이다."
  - id: C-11
    before: "토큰 단위 재생성이 없으므로 이론상 출력 길이 제한이 없다"
    after: "토큰 단위 재생성이 없으니 이론상 출력 길이 제한이 없다"
residual_findings:
  - id: D-7
    severity: 정상 보존
    reason: "\"단일 stream을 변수로 바꾼\" 1회 등장 — 본문의 RLM vs LLM 핵심 대조 의미. D-7 임계(반복 3회+) 미달."
  - id: E-2
    severity: 정상 보존
    reason: "wiki 리포트 register상 평서 ~다 종결 유지. 다양화 시 학술 톤 이탈 위험."
grade_reason: "A — S1 잔존 0건, 변경률 1.4%, 자체검증 6항 통과. 보존 대상(frontmatter·헤딩·표·인라인 코드·인용·wikilink·URL·영문 고유명사) 무손상. wiki 정제 페이지 특성상 보수적 윤문(목표 10~20%) 하한선에 머물렀으나, AI 티 신호인 C-11/H-3/F-5는 0건으로 정리됨."
-->
