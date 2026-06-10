---
title: "또 새로운 용어? Loop Engineering — Claude Code, RLM, Dynamic Workflow 7가지 정리"
author: "Jeongmin Lee (jyoung105)"
url: "https://www.linkedin.com/posts/jyoung105_또-새로운-용어-loop-engineering-claude-code-share-7469915686845247488-ecQO/"
publisher: "LinkedIn"
posted_at: "2026-06-09"
fetched_at: "2026-06-10"
interactions:
  likes: 158
  comments: 2
referenced_links:
  - https://lnkd.in/giBBf-fe
  - https://lnkd.in/gM8ZviyE
---

# Jeongmin Lee — 또 새로운 용어? Loop Engineering (LinkedIn, 2026-06-09)

또 새로운 용어? loop engineering? Claude Code 를 만든 Boris Cherny 가 Anthropic 개발자 컨퍼런스에서 이런 말을 합니다. "나는 더 이상 Claude 에 프롬프트를 치지 않는다. 내 일은 loop 를 짜는 것이다." OpenClaw 의 Peter Steinberger 도 비슷한 이야기를 해요. "코딩 에이전트에게 프롬프트를 치지 마라. 에이전트를 프롬프트하는 loop 를 설계하라."

새로운 용어 놀이를 많이 한다는 비아냥이 있지만 제가 3개월 전에도 작성한 것처럼 loop 자체는 LLM 의 부족한 판단력을 구조적으로 극복한다는 점에서 근거는 충분합니다. 특히 RLM(Recursive Language Model) 을 이해하면 Claude Code 의 dynamic workflow 가 왜 그렇게 설계됐는지 보이거든요. 오늘은 loop 에 대한 기술적인 내용을 7가지로 정리했습니다.

## ❶ Loop engineering 은 에이전트를 프롬프트하는 시스템을 설계하는 것입니다

여러 의견과는 별개로 일단 loop engineering 이라는 용어가 어떤 의미에서 서서히 등장하고 있는지 알아야 합니다. 사람이 프롬프트를 입력하고 결과를 확인하고 다시 입력하는 방식에는 한계가 있습니다. 그래서 loop engineering 은 태스크 발견 → 분배 → 실행 → 검증 → 다음 태스크 결정까지 loop 가 자동으로 돌아가도록 만드는 데 목적을 두는 차원에서 등장했습니다. Addy Osmani 는 이 구조를 5가지의 building block 으로 정리했습니다. Automation, worktree, skill, connector, subagent.

## ❷ 이 loop engineering 의 이론적 기반이 RLM 입니다

보통 LLM 은 입력 전체를 context window 에 한꺼번에 올립니다. 하지만 RLM 은 다릅니다. REPL 환경에 context 라는 변수가 있고 에이전트가 필요한 부분만 골라 읽어요. print 출력도 scaffold 단에서 강제로 잘리기 때문에 불필요한 정보가 context 를 채우지 않습니다. RLM 논문을 읽어보면 이 구조가 명쾌하게 잡혀요.

## ❸ Subagent 결과는 context 가 아니라 변수로 돌아옵니다

기존 CodeAct + subagent 구조에서는 하위 에이전트 결과 전체가 상위 context 에 올라갔습니다. RLM 의 llm_query() 는 다릅니다. 결과가 REPL 내 Python 변수로 돌아와요. 상위 에이전트는 그 변수를 검증만 하고 FINAL() 로 반환합니다. 결과를 토큰 단위로 다시 생성할 필요가 없고 이론상 출력 길이 제한도 없어요.

## ❹ 그래서 Claude Code dynamic workflow 가 이 구조를 가져갑니다

Opus 4.8 과 함께 출시된 dynamic workflow 는 JavaScript 로 subagent 를 생성하고 조율합니다. 각 subagent 가 독립된 context window 에서 작동하고 결과만 상위로 올려요. 사실 에이전트가 긴 작업 중간에 멈추거나 결과를 대충 넘기던 게 다 이유가 있었어요. 하지만 RLM 은 단일 context window 에서 생기는 agentic laziness, self-preferential bias, goal drift 를 구조로써 차단합니다.

## ❺ Dynamic workflow 패턴은 생각보다 다양해요

fan-out-and-synthesize 로 작업을 병렬 분할 후 합치거나 adversarial verification 으로 별도 에이전트가 서로 결과를 검증합니다. 특히 tournament 패턴으로 여러 접근법을 경쟁시킬 수도 있어요. 코드 리팩토링뿐 아니라 리서치 검증이나 서포트 티켓 분류처럼 비개발 업무에서도 Claude Code 안에서 바로 쓸 수 있습니다.

## ❻ RLM 구조는 비용 면에서도 유리해요

Subagent 가 한 단계씩 작업하면 system prompt 와 이전 메시지가 그대로 유지됩니다. KV cache hit 비율이 90% 까지 올라갈 수 있어요. 에이전트가 읽을 범위를 직접 결정하니까 전체 prompt 를 매번 스캔하는 비용도 빠져요.

## ⚠️ 물론 아직은 비용이 높습니다. 하지만 방향은 분명합니다

현재의 Dynamic workflow 는 토큰을 많이 씁니다. 다만 일반 코딩 작업에 verifier 5개를 붙일 필요는 없어요. 이 환경을 직접 만드는 것도 비용적으로 아직 부담이 큽니다. 하지만 모델 비용이 내려가고 cache-hit 비율이 높아질수록 loop 의 활용은 기본값이 됩니다.

---

용어 놀이를 한다는 비아냥은 어찌보면 당연합니다. 지난 3년간, 그리고 최근 수 개월 간 등장한 여러 용어들로 사용자들의 피로감은 매우 높은 상황이기 때문입니다. 하지만 확실한 것은 RLM 이 무엇인지는 알고 계시면 좋을 것이라는 점입니다. 그래야 Dynamic workflow 가 왜 그렇게 설계됐는지가 보이고 다음 스텝으로 우리가 무엇을 준비해야 하는지도 감이 잡혀요.

지난 몇 년간 Transformer 의 쇠퇴론 등 많은 비관 속에서도 결국 AI 발전의 큰 방향에서 프론티어 랩에서 주장하는 내용은 모두 반영되었다는 사실을 알면 더욱 그렇습니다. 꼭 필요한 AI 정보를 지속적으로 업로드하고 있습니다. 저와 "1촌" 이 되면 유용한 정보를 놓치지 않을 거에요.

---

**참고 링크:**
- https://lnkd.in/giBBf-fe
- https://lnkd.in/gM8ZviyE
