---
title: "또 새로운 용어? Loop Engineering: Claude Code, RLM, Dynamic Workflow 7가지 정리 (Jeongmin Lee, LinkedIn 2026-06-09)"
type: article
year: 2026
category: agents
raw_path: raw/articles/lee-jeongmin-2026-loop-engineering-claude-code.md
raw_filename: "lee-jeongmin-2026-loop-engineering-claude-code.md"
source_collection: external
author: "Jeongmin Lee (LinkedIn 핸들 jyoung105)"
url: "https://www.linkedin.com/posts/jyoung105_또-새로운-용어-loop-engineering-claude-code-share-7469915686845247488-ecQO/"
publisher: "LinkedIn"
publication_date: "2026-06-09"
tags: [loop-engineering, claude-code, rlm, recursive-language-model, dynamic-workflow, subagent, boris-cherny, peter-steinberger, addy-osmani, openclaw, anthropic, opus-4-8, codeact, kv-cache, context-window, agentic-laziness, fan-out-and-synthesize, adversarial-verification, tournament-pattern]
---

## 한 줄 요약 (One-line Summary)

Jeongmin Lee가 LinkedIn에 올린 한국어 카드 포스트로, loop engineering이라는 신조어를 RLM(Recursive Language Model) 구조와 연결해 7개 항목으로 정리한다. 핵심 주장은 loop engineering이 에이전트를 프롬프트하는 시스템을 설계하는 일이며, RLM을 알아야 Claude Code의 dynamic workflow가 왜 그렇게 설계됐는지 보인다는 것이다.

## 1. 자료 정보 (Document Information)

- **형식**: LinkedIn 텍스트 포스트. 번호를 붙인 절 6개(❶부터 ❻)와 경고 표시를 단 절 1개(⚠️), 합쳐 7개 항목으로 구성된다. 본문에 이미지나 도식은 없다.
- **저자**: Jeongmin Lee, LinkedIn 핸들 `jyoung105`. 본문 끝에 AI 정보를 지속적으로 업로드하고 있다는 안내와 "1촌" 요청 문구가 붙어 있다.
- **발행일**: 2026-06-09. raw 수집 시점은 2026-06-10이다.
- **URL**: <https://www.linkedin.com/posts/jyoung105_또-새로운-용어-loop-engineering-claude-code-share-7469915686845247488-ecQO/>
- **상호작용**: 좋아요 158개, 댓글 2개 (수집 시점 기준).
- **참고 링크**: 본문 끝에 lnkd.in 단축 URL 2개(`giBBf-fe`, `gM8ZviyE`)가 첨부돼 있다. 어느 자료를 가리키는지는 본문에 적혀 있지 않다.
- **자기 인용**: "제가 3개월 전에도 작성한 것처럼"이라는 문장이 있어 같은 주제의 선행 글이 있음을 알 수 있다. 다만 그 글의 시점과 URL은 본문에 없다.
- **자료 성격**: 1차 연구가 아니라 인용과 해설로 구성된 2차 자료다. 저자가 직접 측정한 수치는 없고, 세 사람의 발언과 RLM 논문의 구조를 요약해 전달한다.

## 2. 주요 기여 (Key Contributions)

1. **loop engineering 용어의 등장 맥락 정리**. Claude Code를 만든 Boris Cherny가 Anthropic 개발자 컨퍼런스에서 "나는 더 이상 Claude에 프롬프트를 치지 않는다. 내 일은 loop를 짜는 것이다"라고 말했고, OpenClaw의 Peter Steinberger도 "코딩 에이전트에게 프롬프트를 치지 마라. 에이전트를 프롬프트하는 loop를 설계하라"고 말했다는 두 발언을 같은 흐름으로 묶는다.
2. **용어 인플레이션 비판에 대한 저자의 입장 표명**. 새로운 용어 놀이를 많이 한다는 비아냥이 있지만, loop 자체는 LLM의 부족한 판단력을 구조적으로 극복한다는 점에서 근거가 충분하다는 것이 저자의 입장이다.
3. **loop engineering의 정의**. 사람이 프롬프트를 입력하고 결과를 확인하고 다시 입력하는 방식에는 한계가 있으며, loop engineering은 태스크 발견, 분배, 실행, 검증, 다음 태스크 결정까지 loop가 자동으로 이어지도록 만드는 데 목적이 있다고 정의한다.
4. **Addy Osmani의 다섯 building block 인용**. Automation, worktree, skill, connector, subagent 다섯 가지를 이름만 나열한다.
5. **RLM을 이론적 기반으로 지목**. 보통 LLM은 입력 전체를 context window에 한꺼번에 올리지만, RLM은 REPL 환경에 컨텍스트를 변수로 두고 에이전트가 필요한 부분만 골라 읽는다. print 출력도 scaffold 단에서 강제로 잘리기 때문에 불필요한 정보가 컨텍스트를 채우지 않는다.
6. **`llm_query()`의 반환 방식 해설**. 기존 CodeAct와 서브에이전트 구조에서는 서브에이전트 결과 전체가 상위 컨텍스트에 올라갔다. RLM의 `llm_query()`는 결과를 REPL 안의 Python 변수로 돌려주고, 상위 에이전트는 그 변수를 검증만 한 뒤 `FINAL()`로 반환한다. 결과를 토큰 단위로 다시 생성할 필요가 없고 이론상 출력 길이 제한도 없다.
7. **Claude Code dynamic workflow의 설계 의도 해독**. Opus 4.8과 함께 출시된 dynamic workflow는 JavaScript로 서브에이전트를 생성하고 조율하며, 각 서브에이전트가 독립된 context window에서 작동하고 결과만 상위로 올린다. RLM은 단일 context window에서 생기는 agentic laziness, self-preferential bias, goal drift를 구조로써 차단한다.
8. **실행 패턴 세 가지 제시**. fan-out-and-synthesize로 작업을 병렬 분할한 뒤 합치고, adversarial verification으로 별도 에이전트가 서로 결과를 검증하며, tournament 패턴으로 여러 접근법을 경쟁시킨다. 적용 범위는 코드 리팩토링뿐 아니라 리서치 검증이나 서포트 티켓 분류 같은 비개발 업무까지 포함되고, Claude Code 안에서 바로 쓸 수 있다.
9. **비용 관찰**. 서브에이전트가 한 단계씩 작업하면 system prompt와 이전 메시지가 그대로 유지되어 KV cache hit 비율이 90%까지 올라갈 수 있다. 에이전트가 읽을 범위를 직접 결정하므로 전체 프롬프트를 매번 스캔하는 비용도 빠진다.
10. **현재 한계와 전망**. 현재의 dynamic workflow는 토큰을 많이 쓰고 환경을 직접 구축하는 비용 부담도 크지만, 모델 비용이 내려가고 cache hit 비율이 높아질수록 loop의 활용은 기본값이 된다는 전망으로 마무리한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

본 글은 실험이나 측정을 담지 않는다. 세 사람의 발언을 한 줄씩 인용한 뒤 RLM 구조를 풀어 설명하는 해설 구조다. 본문이 서술한 구조는 항목별로 다음과 같다.

### 3.1 기존 LLM과 RLM의 컨텍스트 처리 차이 (본문 ❷)

```
[기존 LLM]
  입력 전체 → context window 에 한꺼번에 적재

[RLM]
  REPL 환경
   ├─ 컨텍스트가 변수로 존재
   ├─ 에이전트가 필요한 부분만 골라 읽음
   └─ print 출력은 scaffold 단에서 강제로 잘림
```

본문이 짚는 차이는 컨텍스트를 한꺼번에 올리는 대상이 아니라 골라 읽는 변수로 둔다는 점이다. print 출력이 scaffold 단에서 잘리므로 불필요한 정보가 컨텍스트를 채우지 않는다. 저자는 RLM 논문을 읽어보면 이 구조가 명쾌하게 잡힌다고 덧붙인다.

### 3.2 CodeAct와 RLM `llm_query()`의 반환 방식 차이 (본문 ❸)

```
[CodeAct + 서브에이전트]
  서브에이전트 결과 전체 → 상위 컨텍스트에 적재

[RLM llm_query()]
  서브에이전트 결과 → REPL 안의 Python 변수로 반환
  상위 에이전트는 그 변수를 검증만 수행
  FINAL() 로 최종 반환
  결과를 토큰 단위로 재생성하지 않음
  이론상 출력 길이 제한 없음
```

본문이 이 차이에서 끌어내는 결론은 두 가지다. 하나는 상위 에이전트의 역할이 결과 재생성이 아니라 변수 검증으로 줄어든다는 것이고, 다른 하나는 출력 길이가 상위 모델의 생성 한도에 묶이지 않는다는 것이다.

### 3.3 Claude Code dynamic workflow의 구성 (본문 ❹)

| 항목 | 본문 서술 |
|---|---|
| 출시 시점 | Opus 4.8과 함께 출시 |
| 조율 언어 | JavaScript로 서브에이전트를 생성하고 조율 |
| 컨텍스트 격리 | 각 서브에이전트가 독립된 context window에서 작동 |
| 결과 전달 | 결과만 상위로 올림 |
| 차단 대상 | 단일 context window에서 생기는 agentic laziness, self-preferential bias, goal drift |

저자는 에이전트가 긴 작업 중간에 멈추거나 결과를 대충 넘기던 현상에 이유가 있었다고 진단하면서, RLM 구조가 그 세 가지 실패를 구조로써 차단한다고 정리한다.

### 3.4 dynamic workflow 실행 패턴 (본문 ❺)

| 패턴 | 본문 설명 |
|---|---|
| fan-out-and-synthesize | 작업을 병렬로 분할한 뒤 합친다 |
| adversarial verification | 별도 에이전트가 서로 결과를 검증한다 |
| tournament | 여러 접근법을 경쟁시킨다 |

본문은 적용 범위를 개발 업무 밖으로 넓힌다. 코드 리팩토링뿐 아니라 리서치 검증이나 서포트 티켓 분류 같은 비개발 업무에서도 Claude Code 안에서 바로 쓸 수 있다고 적는다.

### 3.5 loop engineering의 다섯 building block (본문 ❶)

Addy Osmani가 loop engineering을 다섯 building block으로 정리했다고 인용하며 이름만 나열한다. Automation, worktree, skill, connector, subagent 다섯 가지다. 각 블록이 무엇을 하는지는 본문에 설명되지 않으므로, 상세는 원출처를 다룬 [[agents/osmani-2026-loop-engineering]] 페이지를 참조한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크는 없다. 본문에 등장하는 수치는 두 가지뿐이다.

| 수치 | 맥락 |
|---|---|
| KV cache hit 비율 90% | RLM 구조에서 서브에이전트가 한 단계씩 작업할 때 도달할 수 있는 상한으로 제시 |
| verifier 5개 | 일반 코딩 작업에는 붙일 필요가 없다는 자제 권고의 기준값 |

포스트 자체의 상호작용 지표는 좋아요 158개, 댓글 2개다(수집 시점 2026-06-10). 벤치마크 수치가 필요하면 본문이 가리키는 RLM 논문과 Opus 4.8 dynamic workflow 자료를 별도로 확보해야 한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

본문이 스스로 인정한 한계는 세 가지다.

1. **토큰 비용**. 현재의 dynamic workflow는 토큰을 많이 쓴다. 다만 일반 코딩 작업에 verifier 5개를 붙일 필요는 없다는 단서를 붙인다.
2. **환경 구축 부담**. 이 환경을 직접 만드는 것도 비용 면에서 아직 부담이 크다.
3. **용어 피로감**. 지난 3년간, 그리고 최근 수 개월 사이 등장한 여러 용어들로 사용자들의 피로감이 매우 높다. loop engineering이라는 작명이 비아냥의 대상이 되는 맥락을 저자가 인정한다.

향후 전망은 한 문장으로 제시된다. 모델 비용이 내려가고 cache hit 비율이 높아질수록 loop의 활용은 기본값이 된다는 것이다. 저자는 마무리에서 RLM이 무엇인지 알아두라고 권하며, 그래야 dynamic workflow가 왜 그렇게 설계됐는지 보이고 다음 스텝으로 무엇을 준비해야 하는지 감이 잡힌다고 적는다. 이어서 지난 몇 년간 Transformer 쇠퇴론을 비롯한 여러 비관 속에서도 프론티어 랩이 주장한 내용이 결국 AI 발전의 큰 방향에 모두 반영되었다는 회상을 덧붙인다.

본 글이 답하지 않아 별도 자료가 필요한 지점은 다음과 같다.

- RLM 논문 본문의 실제 벤치마크 수치. 본문은 논문의 제목, 저자, 연도를 명시하지 않고 구조만 가져온다.
- Opus 4.8 dynamic workflow가 권장하는 verifier 개수와 패턴 선택 기준.
- fan-out-and-synthesize, adversarial verification, tournament 세 패턴 사이의 비용과 품질 비교.

## 6. 관련 연구 (Related Work)

본문이 이름을 밝힌 인물과 자료는 다음과 같다.

| 대상 | 본문 서술 |
|---|---|
| Boris Cherny | Claude Code를 만든 사람. Anthropic 개발자 컨퍼런스에서 "나는 더 이상 Claude에 프롬프트를 치지 않는다. 내 일은 loop를 짜는 것이다"라고 발언 |
| Peter Steinberger | OpenClaw 소속. "코딩 에이전트에게 프롬프트를 치지 마라. 에이전트를 프롬프트하는 loop를 설계하라"라고 발언 |
| Addy Osmani | loop engineering을 다섯 building block으로 정리한 출처 |
| RLM 논문 | 이론적 기반. 제목, 저자, 연도는 본문에 없다 |
| CodeAct | 비교 대상 선행 구조. 서브에이전트 결과 전체가 상위 컨텍스트로 올라갔다는 점이 대비의 출발선 |
| Claude Code dynamic workflow | Opus 4.8과 함께 출시된 기능 |
| Transformer 쇠퇴론 | 마무리에서 과거의 비관론 사례로 한 번 언급 |

본 wiki 안의 인접 자료는 다음과 같다.

- [[agents/osmani-2026-loop-engineering]]: 본 글이 인용한 다섯 building block의 원출처. 본 글이 이름만 나열한 자리를 요소별 절로 전개한다.
- [[agents/zhang-2026-recursive-language-models]]: 본 글이 이론적 기반으로 지목한 RLM 논문. REPL 컨텍스트 변수 모델과 재귀 호출 구조를 1차 자료로 다룬다.
- [[agents/kang-2026-no-longer-prompting-claude]]: 같은 시기 한국어 LinkedIn 카드 포스트로, 최적화 대상이 프롬프트에서 컨텍스트, harness, loop로 옮겨온 흐름을 다룬다.
- [[agents/lee-hoyeon-2026-harness-engineering]]: harness engineering을 여섯 단계 실행 절차로 정리한 한국어 슬라이드 자료.
- [[agents/patel-2026-beyond-the-prompt-claude-code]]: Boris Cherny의 자기 검증 원칙을 Claude Code 운영 절차로 풀어낸 실전 가이드.
- [[agents/runkle-2026-the-art-of-loop-engineering]]: loop를 네 겹으로 쌓은 LangChain 측의 정리.

## 7. 용어집 (Glossary)

- **loop engineering**: 에이전트를 프롬프트하는 시스템을 설계하는 일. 태스크 발견, 분배, 실행, 검증, 다음 태스크 결정까지 loop가 자동으로 이어지게 만드는 것을 목적으로 한다.
- **RLM (Recursive Language Model)**: REPL 환경에 컨텍스트를 변수로 두고 에이전트가 필요한 부분만 골라 읽는 구조. print 출력은 scaffold 단에서 강제로 잘린다.
- **`llm_query()`**: RLM에서 서브에이전트를 호출하는 함수. 결과를 REPL 안의 Python 변수로 돌려준다.
- **`FINAL()`**: 상위 에이전트가 변수 검증을 마친 뒤 최종 결과를 반환할 때 쓰는 RLM 함수.
- **CodeAct**: 서브에이전트 결과 전체를 상위 컨텍스트에 올리는 선행 구조. 본 글에서 RLM과 대비되는 기준선 역할을 한다.
- **dynamic workflow**: Opus 4.8과 함께 출시된 Claude Code 기능. JavaScript로 서브에이전트를 생성하고 조율하며, 각 서브에이전트가 독립된 context window에서 작동한다.
- **agentic laziness, self-preferential bias, goal drift**: 단일 context window에서 생기는 세 가지 실패로 본문이 지목한 현상. RLM이 구조로써 차단한다고 서술한다.
- **fan-out-and-synthesize**: 작업을 병렬로 분할한 뒤 결과를 합치는 dynamic workflow 패턴.
- **adversarial verification**: 별도 에이전트가 서로 결과를 검증하는 패턴.
- **tournament**: 여러 접근법을 경쟁시키는 패턴.
- **KV cache hit**: 이전 요청에서 만든 key와 value 캐시를 다시 쓰는 비율. 본문은 RLM 구조에서 90%까지 올라갈 수 있다고 적는다.
- **OpenClaw**: 본문이 Peter Steinberger의 소속으로 밝힌 이름. 그 밖의 설명은 본문에 없다.
- **Opus 4.8**: dynamic workflow가 함께 출시된 Claude 모델 버전.
