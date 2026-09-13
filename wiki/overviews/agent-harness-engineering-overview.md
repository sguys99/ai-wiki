---
title: "Agent Harness Engineering 개괄과 학습 경로"
type: overview
year: 2026
category: overviews
source_collection: synthesis
sources:
  - osmani-2026-agent-skills.md
  - hada-2026-agent-skills.md
  - osmani-2026-loop-engineering.md
  - lee-hoyeon-2026-harness-engineering.md
  - patel-2026-beyond-the-prompt-claude-code.md
  - lin-2026-harness-updating-is-not-harness-benefit.md
  - trq212-2026-a-field-guide-to-fable.md
  - walkinglabs-learn-harness-engineering.md
tags: [harness-engineering, loop-engineering, agent-skills, verification, progressive-disclosure, scope-discipline, self-evolving-agents, claude-code, evidence-grading, overview, synthesis]
study_path:
  - id: agents/lee-hoyeon-2026-harness-engineering
    note: "harness 담론의 어휘와 여섯 단계 순환을 먼저 잡는다. 나머지 일곱 편을 어디에 놓을지 정하는 좌표계 역할을 한다."
  - id: agents/walkinglabs-learn-harness-engineering
    note: "같은 대상을 다섯 하위 시스템으로 자른 두 번째 분해. 두 분해를 겹쳐 보면 어느 구성 요소가 공통이고 어느 것이 한 저자의 선택인지 드러난다."
    prereq: ["agents/lee-hoyeon-2026-harness-engineering"]
  - id: agents/osmani-2026-agent-skills
    note: "harness에 들어갈 재료 하나인 스킬의 설계 원칙 다섯 가지와 6단계 SDLC 배치를 얻는다."
    prereq: ["agents/lee-hoyeon-2026-harness-engineering"]
  - id: agents/hada-2026-agent-skills
    note: "위 처방을 받아든 실무자들의 반론과 컨텍스트 비용 관찰. 강제의 판단 주체가 모델 자신이라는 지적이 여기서 나온다."
    prereq: ["agents/osmani-2026-agent-skills"]
  - id: agents/patel-2026-beyond-the-prompt-claude-code
    note: "원칙을 파일과 커맨드로 옮긴 운용 매뉴얼. 설정 계층부터 서브에이전트와 완료 조건 루프까지 이어진다."
    prereq: ["agents/osmani-2026-agent-skills"]
  - id: agents/osmani-2026-loop-engineering
    note: "앞에서 깔아 둔 구성 요소를 사람 개입 없이 순환시키는 실행 층. 자동화의 최소 골격 다섯 가지를 얻는다."
    prereq: ["agents/patel-2026-beyond-the-prompt-claude-code"]
  - id: agents/trq212-2026-a-field-guide-to-fable
    note: "harness에 무엇을 입력할지의 문제로 옮긴다. unknown 발굴 8패턴이 사람 쪽 준비 절차를 채운다."
    prereq: ["agents/osmani-2026-loop-engineering"]
  - id: agents/lin-2026-harness-updating-is-not-harness-benefit
    note: "앞선 처방이 어느 모델에서 실제로 회수되는지 통제 실험으로 잰다. 마지막에 읽어야 처방들이 깔아 둔 전제가 보인다."
    prereq: ["agents/osmani-2026-agent-skills", "agents/osmani-2026-loop-engineering"]
---

## 요약

2026년 상반기에 여러 저자가 같은 전환을 저마다 다른 이름으로 기록했다. 작업의 무게 중심이 프롬프트를 잘 쓰는 일에서 에이전트가 혼자 일할 작업 환경을 설계하는 일로 옮겨갔다는 진단이다. harness는 모델을 감싸 도구와 검증과 상태를 제공하는 실행 환경을 말한다.

이름은 셋으로 갈린다. [[agents/lee-hoyeon-2026-harness-engineering]]은 harness engineering이라 부르고, [[agents/osmani-2026-loop-engineering]]은 loop engineering이라 부르며, [[agents/patel-2026-beyond-the-prompt-claude-code]]는 "Setup is the work. Execution is verification."라는 한 문장으로 요약한다. 세 이름이 가리키는 대상은 겹치지만 다루는 범위와 해상도는 서로 다르다.

이 개괄은 저장소에 실재하는 8편을 한 장의 지도로 묶는다. 개별 자료의 내용 요약은 각 페이지가 담당한다. 따라서 여기서 다루는 것은 자료 사이의 역할 분담, 여러 자료가 함께 말하는 주장, 서로 갈리는 주장, 그리고 각 주장이 어느 등급의 근거에 기대고 있는지다.

8편 중 통제 실험은 [[agents/lin-2026-harness-updating-is-not-harness-benefit]] 한 편뿐이고 나머지 일곱은 처방과 경험담과 교육 자료다. 이 비대칭이 이 개괄의 구성을 결정한다. 처방을 먼저 정리하고, 그 처방이 무엇을 전제로 깔고 있는지를 유일한 실측 자료로 검토하는 순서다.

## 자료 구성

여덟 자료는 같은 주제를 다루면서도 담당하는 자리가 서로 다르다. 아래 역할 서술은 각 페이지의 `## 관련 페이지` 절이 스스로 밝힌 위치 규정과 본문 내용을 근거로 정리한 것이다.

| 자료 | 담당 층위 | 이 지도에서 채우는 자리 |
|---|---|---|
| [[agents/lee-hoyeon-2026-harness-engineering]] | 전체 프레임 | 구조, 맥락, 계획, 실행, 검증, 개선 여섯 단계 순환과 단계별 도구 매핑 |
| [[agents/walkinglabs-learn-harness-engineering]] | 교육과 실습 | harness를 다섯 하위 시스템으로 나눈 두 번째 분해와 같은 앱을 여섯 번 다시 짓는 커리큘럼 |
| [[agents/osmani-2026-agent-skills]] | 재료 설계 | 절차 강제 장치인 스킬의 설계 원칙 다섯 가지와 6단계 SDLC 배치 |
| [[agents/hada-2026-agent-skills]] | 실무 반응 | 위 원칙에 대한 커뮤니티 찬반 토론과 컨텍스트 비용 관찰 |
| [[agents/patel-2026-beyond-the-prompt-claude-code]] | 운용 매뉴얼 | 설정 파일 계층, 스킬과 서브에이전트 구성, 완료 조건 루프, MCP 연결의 구체 절차 |
| [[agents/osmani-2026-loop-engineering]] | 실행 자동화 | 사람 개입 없이 순환하는 루프의 최소 구성 요소 다섯 가지와 보조 요소 하나 |
| [[agents/trq212-2026-a-field-guide-to-fable]] | 사람 입력단 | harness에 무엇을 넣을지의 문제. unknown을 네 분면으로 나눠 구현 전과 중과 후에 발굴하는 8패턴 |
| [[agents/lin-2026-harness-updating-is-not-harness-benefit]] | 실증 경계 | harness를 갱신하는 능력과 harness에서 이득을 얻는 능력을 분리해 잰 통제 실험 |

이 배치에서 두 자료가 담론의 바깥쪽을 맡는다. [[agents/trq212-2026-a-field-guide-to-fable]]은 harness보다 앞선 자리에서 사람이 무엇을 원하는지를 다루고, [[agents/lin-2026-harness-updating-is-not-harness-benefit]]은 harness보다 뒤에서 그 효과가 어느 조건에서 나타나는지를 잰다. 나머지 여섯은 harness 자체를 무엇으로 채울지에 대한 처방이다.

## 배경

전환의 출발점은 프롬프트 하나로는 부족해진 상황이다. [[agents/lee-hoyeon-2026-harness-engineering]]은 이 이동을 세 단계 진화로 그린다. Level 1 Prompt Engineering은 한 번의 발화를 주고, Level 2 Context Engineering은 참고 자료를 주며, Level 3 Harness Engineering은 지속되는 환경을 준다. 앞의 두 단계는 매 작업마다 다시 공급해야 하지만 환경은 한 번 깔아두면 계속 쓰인다는 것이 이 사다리의 요지다.

[[agents/osmani-2026-loop-engineering]]은 같은 이동을 다른 어휘로 짚는다. 기존 워크플로가 프롬프트 작성과 출력 검토와 수정 요청의 반복이라면, 자율 시스템은 작업을 스스로 발견하고 위임하고 평가하고 다음 단계를 결정한다. 네 항목 모두 원래 사람이 쥐고 있던 판단이다. 이름의 출처는 Anthropic의 Peter Steinberger와 Boris Cherny가 쓴 "designing loops that prompt your agents"라는 표현인데, 원문에 구체적 링크가 붙어 있지 않아 1차 확인은 되지 않는다.

[[agents/walkinglabs-learn-harness-engineering]]은 문제를 capability-reliability gap이라는 이름으로 세운다. 모델이 원리적으로 할 수 있는 일과 실제 과제에서 반복적으로 해내는 일 사이에 간극이 있다는 뜻이고, 코스는 이 간극을 모델 교체가 아니라 환경 설계로 메우려 한다. 이 코스는 2025년 공개 자료라 위 두 편보다 앞선다. 따라서 2026년 담론을 뒤에서 교재로 옮긴 자료가 아니라, 같은 문제의식이 교육 자료 쪽에서 먼저 굳은 사례로 읽는 편이 정확하다.

세 자료가 공유하는 전제는 하나다. 성능을 끌어올리는 지렛대가 문장 안이 아니라 문장 밖에 있다는 것이다. 다만 그 지렛대의 크기를 수치로 말한 자료는 한정된다. 이 점은 아래 근거 등급 절에서 따로 다룬다.

## harness의 구성 요소

### 자료마다 다른 분해 방식

같은 대상을 놓고도 저자마다 나누는 개수와 이름이 다르다. 분해 방식을 나란히 놓으면 어느 구성 요소가 여러 자료에 공통으로 나타나는지 보인다.

| 자료 | 분해 단위 | 구성 요소 |
|---|---|---|
| [[agents/lee-hoyeon-2026-harness-engineering]] | 6단계 순환 | 구조(Scaffolding), 맥락(Context), 계획(Planning), 실행(Execution), 검증(Verification), 개선(Compounding) |
| [[agents/walkinglabs-learn-harness-engineering]] | 5개 하위 시스템 | Instructions, State, Verification, Scope, Lifecycle |
| [[agents/osmani-2026-loop-engineering]] | 5개 필수 요소와 보조 요소 1개 | Automations, Worktrees, Skills, Plugins와 Connectors, Sub-agents, 그리고 Persistent state |
| [[agents/osmani-2026-agent-skills]] | 5개 layer | Skills(절차), AGENTS.md(rulebook), Hooks(enforcement), Tools(action), Session log(메모리) |
| [[agents/patel-2026-beyond-the-prompt-claude-code]] | 설정 파일 계층 | `CLAUDE.md`, `CLAUDE.local.md`, `settings.json`, `.mcp.json`, `skills/`, `commands/`, `agents/`, `rules/` |

[[agents/osmani-2026-agent-skills]]의 분해가 특히 중요한 위치 규정을 담는다. 저자는 스킬을 harness의 전부가 아니라 그 안의 한 layer로 못 박고, 나란히 놓이는 층위 넷을 함께 제시한다. 스킬이 무엇을 어떤 순서로 할지 정한다면 rulebook은 항상 적용되는 규칙을 두고, 훅은 특정 시점에 개입해 그 규칙을 집행한다. 절차를 정의하는 일과 절차가 지켜지게 만드는 일이 서로 다른 층위에 있다는 뜻이다.

### 세 분해의 단계 대응

[[agents/lee-hoyeon-2026-harness-engineering]]은 자기 여섯 단계를 walkinglabs 코스의 하위 시스템, Osmani의 loop 구성 요소와 나란히 놓는 대응표를 싣는다. 그 페이지가 밝히듯 이 대응은 각 자료가 명시한 매핑이 아니라 세 분해 방식을 겹쳐 읽은 해석이다.

| 이호연의 단계 | walkinglabs의 하위 시스템 | Osmani의 loop 구성 요소 |
|---|---|---|
| 구조 | Scope | Plugins와 Connectors |
| 맥락 | Instructions | Skills |
| 계획 | 대응 요소 없음 | 대응 요소 없음 |
| 실행 | Lifecycle | Automations |
| 검증 | Verification | Sub-agents와 Worktrees |
| 개선 | 대응 요소 없음 | 대응 요소 없음 |
| 대응 단계 없음 | State | Persistent state |

이 표가 드러내는 것은 세 가지다. 첫째, 검증은 세 분해 모두에서 독립 구성 요소로 올라온다. 둘째, 계획과 개선을 별도 단계로 세운 것은 [[agents/lee-hoyeon-2026-harness-engineering]]의 특징이고 다른 두 자료에는 대응 요소가 없다. 셋째, 실행 사이에 상태를 남기는 State와 persistent state는 반대로 이호연의 여섯 단계에 대응 항목이 없다. 그 자료에서는 `.dev/` 폴더와 handoff 파일이 같은 역할을 하지만 단계 하나로 올라오지는 않는다.

따라서 [[agents/osmani-2026-loop-engineering]]이 harness의 실행 구간만 다룬다고 요약하는 것은 부정확하다. 위 대응에서 loop 구성 요소는 구조와 맥락과 실행과 검증 네 단계에 흩어져 있고, 빠진 것은 사람이 계획을 승인하는 국면과 harness 자체를 갱신하는 국면이다.

## 여러 자료가 함께 말하는 원리

### 검증을 만드는 쪽에서 떼어 낸다

검증을 산출 주체에서 분리하라는 처방은 여덟 자료 중 다섯이 공유한다. 다만 무엇을 판정 근거로 삼는지는 자료마다 다르다.

| 자료 | 처방 | 판정 근거 |
|---|---|---|
| [[agents/osmani-2026-agent-skills]] | verification을 선택 사항이 아니라 필수 exit criteria로 둔다 | 통과한 test, 오류 없이 완료된 build, reviewer 승인 |
| [[agents/osmani-2026-loop-engineering]] | 구현과 평가를 서브에이전트로 나눠 자기 채점 편향을 끊는다 | 지시문이 다른 별도 서브에이전트 |
| [[agents/lee-hoyeon-2026-harness-engineering]] | Generator와 Evaluator를 물리적으로 분리하고 모델과 역할도 나눈다 | Codex와 Gemini와 Opus와 Sonnet의 분업, Browser Agent와 Computer Use |
| [[agents/patel-2026-beyond-the-prompt-claude-code]] | 모델에 자기 출력을 검증할 수단을 준다 | 테스트 커맨드, CLI exit code, grep 가능한 파일 상태 |
| [[agents/walkinglabs-learn-harness-engineering]] | 완료 선언이 아니라 증거로 완료를 판정한다 | test, lint, type-check, end-to-end 파이프라인 |

다섯 처방의 공통 형태는 판정을 산출 주체 바깥으로 내보내는 것이다. [[agents/osmani-2026-agent-skills]]가 인정하는 증거 세 가지는 모두 에이전트 바깥에서 만들어진다. test는 실행 결과가 판정하고, build는 빌드 시스템이 판정하며, 승인은 사람이 판정한다. [[agents/lee-hoyeon-2026-harness-engineering]]이 인용하는 문장은 같은 요구를 실무 지침으로 옮긴다. Evaluator를 회의적으로 조정하는 편이 Generator를 자기비판적으로 만드는 것보다 쉽다는 것이다.

나머지 세 자료는 이 처방과 다른 자리에 선다. [[agents/trq212-2026-a-field-guide-to-fable]]의 퀴즈 패턴은 검증 대상이 산출물이 아니라 사람의 이해도다. 저자는 변경 내용에 대한 퀴즈를 완벽하게 통과한 뒤에만 merge한다고 적는다. [[agents/hada-2026-agent-skills]]가 정리한 반대 논거는 강제의 판단 주체가 결국 모델 자신이라는 지적이고, 따라서 사람 리뷰가 여전히 필수라는 결론으로 이어진다. [[agents/lin-2026-harness-updating-is-not-harness-benefit]]은 처방을 내는 대신 준수 자체를 계측 대상으로 삼는다.

도구 층위에서 이 원리를 구현한 예는 [[agents/patel-2026-beyond-the-prompt-claude-code]]가 가장 구체적이다. `/goal`은 완료 조건을 걸고 그 조건이 참이 될 때까지 계속 시도하게 하며, 중단하려는 시도마다 transcript를 조건과 대조하는 검사가 발동한다. 저자가 제시한 조건 예시는 테스트 통과, lint 정상, 3회 연속 무결점 통합 테스트처럼 모두 검증 가능하고 결정론적이다. 반대로 "the code is good"이라고 쓰면 이미 실패한 것이라고 저자는 못 박는다.

### 다 넣지 않고 필요할 때 꺼낸다

progressive disclosure는 필요한 시점에만 정보를 단계적으로 노출하는 설계다. 네 자료가 같은 원칙을 서로 다른 층위에서 적용한다.

| 자료 | 적용 층위 | 구체적 처방 |
|---|---|---|
| [[agents/osmani-2026-agent-skills]] | 스킬 활성화 | 스킬 20개를 동시에 로드하지 않고 맥락에 따라 활성화한다. 이유는 토큰 효율이다 |
| [[agents/patel-2026-beyond-the-prompt-claude-code]] | 스킬 로딩 시점 | 세션 시작 시 항목당 약 100토큰의 description만 읽고, 실제 호출 시점에야 `SKILL.md` 전문과 보조 파일을 가져온다 |
| [[agents/lee-hoyeon-2026-harness-engineering]] | 지침 배치 | `CLAUDE.md`와 `SKILL.md`에 다 넣지 않고 `references/`로 분리해 상황별로 참조시킨다 |
| [[agents/hada-2026-agent-skills]] | 완화책 | frontmatter만 먼저 올려 두면 컨텍스트 오염이 줄어든다 |

이 원칙이 필요한 이유는 스킬의 이점과 비용이 같은 방향으로 늘어나기 때문이다. 스킬을 많이 갖출수록 강제되는 절차는 촘촘해지지만, 그 스킬이 모두 컨텍스트에 올라가면 작업에 쓸 자리가 줄어든다. progressive disclosure는 보유량과 로드량을 떼어 놓아 이 상충을 완화한다.

[[agents/hada-2026-agent-skills]]가 정리한 커뮤니티 토론은 이 완화가 완전하지 않다고 본다. 스킬 하나가 800줄을 넘기는 경우가 있어 컨텍스트를 크게 차지하며 필요 없는 스킬까지 설치하면 토큰이 낭비된다는 관찰이다. 다만 그 페이지가 한계로 밝히듯 댓글 요약은 발화자와 수치를 특정하지 않으므로 800줄은 일화적 증언으로 읽어야 한다. 더 근본적인 지적은 무엇이 맥락에 맞는지 판단하는 주체 역시 모델이라는 것이다. 그래서 얼마나 갖추고 얼마나 로드할지는 이 원칙만으로 풀리지 않은 채 남는다.

컨텍스트 예산에 대한 감각은 두 자료가 수치로 제공한다. [[agents/lee-hoyeon-2026-harness-engineering]]은 메시지를 한 줄도 주고받지 않은 시점에 시스템 프롬프트와 도구 정의와 스킬이 이미 2만 토큰 넘게 들어와 있는 `/context` 화면을 싣는다. [[agents/patel-2026-beyond-the-prompt-claude-code]]는 컨텍스트가 일정 길이를 넘으면 품질이 떨어지는 context rot이 1M 모델 기준 30만에서 40만 토큰 부근에 나타난다고 적고 이른 compaction을 권고한다. 두 수치 모두 1차 측정이 아니라 각 저자가 관찰하거나 전해 들은 값이다.

### 실수를 규칙으로 옮긴다

harness가 시간과 함께 두꺼워지는 경로를 두 자료가 거의 같은 형태로 제시한다.

[[agents/patel-2026-beyond-the-prompt-claude-code]]가 전하는 Boris Cherny의 두 번째 원칙은 모델이 무언가를 잘못할 때마다 "Update CLAUDE.md so you don't repeat this"라고 지시하는 것이다. 몇 주 지나면 그 파일이 프로젝트가 쌓아 온 함정 목록이 된다. Boris는 여기서 한 걸음 더 나가 PR 코멘트로 룰을 바로 커밋하게 하는 방식을 Compounding Engineering이라 부른다.

[[agents/lee-hoyeon-2026-harness-engineering]]은 같은 발상을 숫자로 고정한다. 같은 작업을 3번 반복하면 스킬로 만들고, 같은 실수가 3번 반복되면 규칙으로 만든다. 3번이라는 기준이 하는 일은 판단을 자동화하는 것이다. 자동화할 가치가 있는지 매번 고민하지 않고 반복 횟수로 결정하므로 개선이 의지가 아니라 절차가 된다.

같은 자료가 반대 방향의 원칙도 함께 둔다. 안 쓰는 스킬과 MCP와 규칙은 바로 삭제하고, 모델이 좋아지면 예전 가드레일을 재평가하며, 설정이 너무 복잡해지면 과설계 신호로 본다는 것이다. 좋은 harness는 점점 단순해진다는 진단이 여기서 나온다. 규칙 수나 스킬 수가 늘어난다는 사실 자체는 성과가 아니라는 뜻이다.

## harness 앞의 사람

위 다섯 자료가 그리는 것은 에이전트 바깥의 기계 쪽이다. 구조와 맥락과 검증을 미리 깔아 두면 사람이 매 단계 개입하지 않아도 된다. [[agents/trq212-2026-a-field-guide-to-fable]]은 그 지도의 입력단을 다룬다. harness를 아무리 정교하게 깔아도 사람이 무엇을 원하는지 흐릿하면 결과도 흐리다는 것이다.

저자가 빌려오는 구분은 지도와 영토다. 프롬프트와 스킬과 컨텍스트가 지도라면 코드베이스와 현실 제약은 영토이고, 지도는 언제나 영토보다 성기다. 둘 사이에 남는 영역이 unknown이다. 원문은 "the map is not the territory"를 오래된 교훈으로 소개할 뿐 출처를 붙이지 않으므로, 특정 저자에게 귀속하지 않는 편이 안전하다.

unknown이 문제가 되는 이유는 모델이 그 앞에서 멈추지 않기 때문이다. Claude는 unknown을 만나면 사용자 의도를 최선으로 추측해 결정을 내린다. 즉 unknown은 작업 중단이 아니라 임의 결정으로 나타나고, 그 결정이 사용자 의도와 어긋날 때 결과가 틀어진다. 저자는 Fable을 두고 작업 품질이 unknown을 명료화하는 자기 능력에 병목이 걸린 첫 모델이라고 규정한다.

처방은 unknown을 네 분면으로 나눈 뒤 구현 전과 중과 후에 걸쳐 발굴하는 8패턴이다. 구현 전에 blindspot pass, brainstorm과 프로토타입, interview, reference, implementation plan 다섯 가지를 두고, 구현 중에 implementation notes 하나를 두며, 구현 후에 pitch와 quiz 둘을 둔다. 이 패턴들은 다른 자료의 단계와 곧장 맞물린다.

- implementation plan과 reference는 [[agents/lee-hoyeon-2026-harness-engineering]]의 계획과 맥락 단계를 사람 쪽에서 채우는 재료다. 같은 자료의 `/specify` 스킬이 인터뷰와 요구사항 도출과 플랜 파일 생성을 자동화하는 것과 겨냥이 같다.
- quiz는 위 검증 절의 사람 쪽 짝이다. 서브에이전트가 코드를 검증한다면 quiz는 사람이 변경을 이해했는지 검증한다. 검증 대상이 산출물에서 이해도로 옮겨 갔을 뿐 구조는 같다.
- implementation notes의 Deviations 기록은 위 개선 절과 겹친다. 계획 이탈을 남겨 다음 시도에서 활용한다는 발상은 실수를 `CLAUDE.md` 규칙으로 굳히는 방식을 한 세션 안으로 줄인 것이다.

harness 담론이 에이전트를 어떻게 자율적으로 실행할지를 묻는다면, 이 자료는 한 발 앞에서 그 에이전트에게 원하는 바를 얼마나 또렷이 건넸는지를 묻는다. 두 물음은 경쟁하지 않고 겹친다.

## 실증의 경계

### 통제 실험이 잰 것

[[agents/lin-2026-harness-updating-is-not-harness-benefit]]은 LLM 7종과 agentic benchmark 3종을 격자로 조합해 두 능력을 따로 측정한다. 하나는 실행 기록을 보고 유용한 harness 수정을 만들어내는 harness-updating이고, 다른 하나는 그렇게 수정된 harness에서 실제로 이득을 얻는 harness-benefit이다. 벤치마크는 SWE-bench Verified, MCP-Atlas, SkillsBench 셋이다.

| 측정 항목 | SWE-bench Verified | MCP-Atlas | SkillsBench |
|---|---|---|---|
| evolver 7종 사이 이득 격차 (최대와 최소의 차) | 2.3%p | 3.0%p | 3.1%p |
| 한 agent 안에서 evolver를 바꿔 생기는 최대 변동폭 | 5.0%p | 5.1%p | 9.3%p |
| anchor agent 사이 base capability 격차 (Opus 4.6 대 Qwen3-235B) | 53.5%p | 36.0%p | 20.9%p |
| 약한 agent에 최선 evolver, 강한 agent에 최악 evolver를 붙였을 때 남는 격차 | 35.2%p | 32.3%p | 18.6%p |
| harness-benefit 정점 모델과 그 이득 | Qwen3-235B, base 20.7%에서 19.3%p | GPT-OSS-120B, base 28.0%에서 7.0%p | Haiku 4.5, base 5.8%에서 15.1%p |

첫 두 행과 셋째 행의 대비가 이 논문의 첫 결론이다. evolver를 어떤 모델로 바꾸든 얻는 차이는 3.1%p를 넘지 않는데, 같은 벤치마크에서 agent를 바꿀 때의 base capability 격차는 20.9%p에서 53.5%p에 이른다. 논문이 설계 지침의 근거로 짝지어 제시하는 쌍은 evolver 사이 최대 격차 3.1%p와 agent 사이 base capability 격차 36.0%p다. 결국 evolution 이후 성능은 evolver 쪽이 아니라 task를 푸는 agent 쪽에서 제한된다.

harness를 만드는 능력에는 모델 크기도 예측력이 없다. 가장 작은 evolver인 Qwen3.5-9B가 SkillsBench에서 3.8%p로 1위를 차지해 Opus 4.6(2.3%p)을 넘어선다. 논문은 `flink-query` 과제 하나를 열어 그 이유를 보인다. 9B 모델이 쓴 skill과 Opus 4.6이 쓴 skill이 같은 다섯 단계를 담고 있고 차이는 세션화 구현 표현뿐이라, 두 조건 모두 0.67점을 1.0점으로 끌어올린다.

### 이득이 나오는 구간

harness-benefit은 base capability에 단조 증가하지 않는다. 마지막 행이 그 정점을 보여준다. SWE-bench Verified에서 base 20.7%인 Qwen3-235B가 19.3%p로 가장 많이 얻고, 더 약한 Qwen3-32B는 4.4%p, 더 강한 Opus 4.6은 2.6%p에 머문다. MCP-Atlas에서는 정점이 base 28.0%인 GPT-OSS-120B로 옮겨 간다.

곡선의 양 끝이 낮은 이유는 서로 다르다. 높은 쪽은 ceiling effect와 부합한다. Opus 4.6은 SWE-bench Verified에서 base pass rate가 74.2%라 남은 여지가 25.8%p뿐이다. 낮은 쪽에는 이 설명이 통하지 않는다. Qwen3-32B는 같은 벤치마크에서 base pass rate가 3.6%로 남은 여지가 96.4%p인데 실제 이득은 4.4%p에 그친다.

따라서 harness 설계가 frontier 모델에서 가장 크게 회수된다는 서술은 이 실험과 맞지 않는다. 측정된 정점은 중간 등급이고, frontier는 개선 여지가 좁아서, weak-tier는 별도 병목 때문에 이득이 작다.

### 약한 모델의 두 병목

그 별도 병목을 논문은 SkillsBench 심층 분석으로 두 실패로 나눈다. skill을 컨텍스트로 가져오지 못하는 activation 실패와, 가져오고도 지침을 따르지 못하는 adherence 실패다.

| 지표 | Qwen3-32B | GPT-OSS-120B | Opus 4.6 |
|---|---|---|---|
| Skill-Load Rate, activation | 0.251 | 0.446 | 0.957 |
| Harness-Following Rate, adherence | 0.142 | 0.442 | 0.757 |
| Loaded-Pass Rate, 결과 | 0.023 | 0.040 | 0.177 |
| 로드 시점에서 마지막 검증 시점까지의 준수 하락 | −0.39 | −0.24 | −0.09 |

두 실패의 위치는 사례로 확인된다. activation 실패의 `threejs` 사례에서 Qwen3-32B는 어떤 skill이 필요한지 알고 있었고 계획의 첫 항목에 그 skill을 로드한다고 적었으나, 세 키를 묶은 출력이 단일 키만 받는 형식 검사에 막혀 skill 본문이 컨텍스트에 들어오지 못했다. 부록은 이 실패를 이해의 문제가 아니라 출력 형식 규약 계층의 문제로 못 박는다. adherence 실패의 `pg-essay-to-audiobook` 사례에서는 skill을 읽고도 본문을 완성된 스크립트로 오독했고, 첫 단계가 막히자 본문에 적힌 대체 경로를 건너뛴 채 종료했다.

두 지표가 서로 다른 능력이라는 점은 Qwen3-235B가 가장 선명하게 보여준다. 이 모델의 Skill-Load Rate는 0.961로 Opus 4.6과 사실상 같은데 Harness-Following Rate는 0.350에 그치고, Loaded-Pass Rate는 0.022로 Opus의 0.177 대비 8분의 1 수준이다. harness를 컨텍스트에 넣는 것과 그 harness를 따르는 것은 별개이며, 로드에 성공하는 것만으로는 이득이 보장되지 않는다.

마지막 행은 adherence 실패가 로드 시점의 오독이 아니라 누적 현상임을 가리킨다. 하락 폭이 등급에 따라 단계적으로 커지므로, 약한 모델은 harness를 처음부터 잘못 읽는 것이 아니라 작업이 길어질수록 준수 수준을 점진적으로 잃는다.

### 처방이 깔아 둔 전제

앞 절들의 처방과 이 실험의 측정을 나란히 놓으면 무엇이 검증되었고 무엇이 남았는지가 갈린다. 아래 대응은 각 자료가 스스로 밝힌 전제가 아니라 이 개괄이 두 편을 겹쳐 읽은 해석이다.

| 처방이 기대하는 것 | 해당 자료 | 실험이 잰 값 |
|---|---|---|
| 모델이 필요한 스킬을 컨텍스트로 불러온다 | [[agents/osmani-2026-agent-skills]]의 맥락 기반 활성화 | Skill-Load Rate가 강한 등급 약 0.96, Qwen3-32B 0.251 |
| 모델이 워크플로의 단계 순서를 끝까지 따른다 | [[agents/osmani-2026-agent-skills]]의 anti-rationalization table | Harness-Following Rate가 Opus 4.6 0.757, Qwen3-32B 0.142 |
| 긴 자율 실행이 기준 충족까지 반복된다 | [[agents/lee-hoyeon-2026-harness-engineering]]의 Ralph Loop, [[agents/patel-2026-beyond-the-prompt-claude-code]]의 `/goal` | 구간별 준수 하락이 Qwen3-32B −0.39, Opus 4.6 −0.09 |
| harness를 갱신하면 다음 작업이 나아진다 | [[agents/lee-hoyeon-2026-harness-engineering]]의 개선 단계 | evolver 쪽 63개 조합 중 9개, agent 쪽 54개 조합 중 8개가 갱신 없는 기준선보다 낮다 |

마지막 행이 처방 쪽에서 거의 다뤄지지 않은 지점이다. harness 갱신이 항상 개선을 보장하지는 않으며, base pass rate가 낮은 SkillsBench에서 회귀가 가장 잦다. 논문도 이 회귀를 별도로 분석하지 않아 원인 규명은 남은 과제로 적는다.

[[agents/hada-2026-agent-skills]]의 회의론은 이 실험과 같은 지점을 다른 방식으로 짚는다. 규칙을 적용할지 판단하는 주체가 모델 자신이므로 문서로 강제하는 것이 실제로 작동하는지 의문이라는 반론인데, 위 두 지표가 그 의문에 조건부 수치를 붙인 셈이다. 강제는 모델 등급에 따라 다른 비율로 작동하며, 약한 등급에서는 형식 규약과 절차 실행 두 곳에서 각각 손실이 난다.

## 합의와 불일치

| 쟁점 | 여러 자료가 함께 말하는 것 | 갈리는 지점 |
|---|---|---|
| 검증의 위치 | 판정을 산출 주체 바깥으로 내보낸다 | 판정 근거를 자동 검사에 둘지 사람 승인에 둘지, 사람 이해도까지 검증 대상으로 볼지 |
| 지침의 양 | 다 넣지 않고 필요할 때 꺼낸다 | 무엇이 맥락에 맞는지 판단하는 주체가 모델이라는 문제가 남는다 |
| 강제의 실효성 | 절차를 문서로 고정하면 생략이 줄어든다 | 처방 쪽은 작동을 전제하고, 커뮤니티 토론은 우회 가능성을 지적하며, 통제 실험은 모델 등급에 따라 갈린다고 잰다 |
| harness의 필수 구성 요소 | 검증은 세 분해 모두에서 독립 항목이다 | 계획과 개선을 단계로 세울지, 상태 보존을 단계로 세울지는 자료마다 다르다 |
| 투자가 회수되는 자리 | 모델 바깥 설계가 지렛대다 | 그 지렛대가 어느 모델 등급에서 가장 큰지는 처방 쪽에 측정이 없고 통제 실험은 중간 등급을 가리킨다 |

세 번째와 다섯 번째가 이 묶음에서 가장 크게 갈리는 지점이다. 처방 여섯 편은 모델이 harness를 제대로 로드하고 따른다는 조건을 대체로 문제 삼지 않는다. [[agents/lin-2026-harness-updating-is-not-harness-benefit]]은 그 조건 자체를 측정 대상으로 바꾸고, 조건이 성립하는 정도가 모델마다 다르다는 결과를 낸다.

## 근거 등급

같은 주장이라도 어느 등급의 근거에 기대는지가 자료마다 다르다. 처방을 실무에 옮길 때는 이 등급을 함께 보는 편이 안전하다.

| 자료 | 근거 유형 | 각 페이지가 밝힌 제약 |
|---|---|---|
| [[agents/lin-2026-harness-updating-is-not-harness-benefit]] | LLM 7종과 벤치마크 3종의 통제 실험 | 가중치를 바꾸는 적응은 범위 밖이고, `tools/`가 읽기 전용이라 tool 진화 설정은 답하지 않으며, in-situ 평가라 보류 집합이 없다 |
| [[agents/lee-hoyeon-2026-harness-engineering]] | 외부 사례 4건의 2차 인용 | 네 회사 수치가 발표자의 1차 측정이 아니고, 도구와 패턴이 Claude Code 생태계에 묶인다 |
| [[agents/walkinglabs-learn-harness-engineering]] | 외부 연구 인용과 반복 실습 설계 | 인용한 비용 대비 사례는 비용과 시간이 함께 늘어난 조건이라 harness 기여만 분리할 수 없다 |
| [[agents/patel-2026-beyond-the-prompt-claude-code]] | 1인칭 운용 경험과 Anthropic 관계자 인용 | 품질 2~3배 같은 핵심 수치에 원 출처 링크가 없고, 커맨드 상당수가 특정 버전 기능이다 |
| [[agents/osmani-2026-agent-skills]] | 처방형 의견 에세이 | 정량 데이터가 없고, 수집된 원자료가 3인칭으로 압축된 추출본이라 저자의 논증 전개가 그대로 남아 있지 않다 |
| [[agents/osmani-2026-loop-engineering]] | 처방형 의견 에세이 | 약 700 단어 분량이고 검증 가능한 외부 인용이 두 건뿐이다 |
| [[agents/hada-2026-agent-skills]] | 커뮤니티 댓글 토론 | 발화자와 수치가 특정되지 않아 800줄 같은 표현의 출처를 되짚기 어렵다 |
| [[agents/trq212-2026-a-field-guide-to-fable]] | 개인 워크플로 경험담 | 통제 실험과 비교군이 없고, 언제 어떤 기법을 쓸지에 대한 명시적 결정 규칙이 없다 |

자주 인용되는 비용 사례 하나는 두 자료에 같은 형태로 등장한다. 20분에 9달러를 쓴 단일 에이전트 시도가 작동하지 않는 산출물로 끝났고, 6시간에 200달러를 쓴 세 에이전트 구성이 동작하는 결과를 냈다는 Anthropic 실험이다. [[agents/lee-hoyeon-2026-harness-engineering]]은 여기에 간소화 버전이 124달러로 같은 품질을 냈다는 대목을 덧붙여 harness 비용도 최적화 대상이라고 읽는다. [[agents/walkinglabs-learn-harness-engineering]]은 같은 사례를 쓰면서 비용과 시간이 함께 늘어난 조건이라 harness 품질만의 기여를 분리해 읽을 수 없다고 단서를 단다. 같은 사례를 두 자료가 다른 무게로 다루는 대목이라 함께 보는 편이 낫다.

harness가 모델보다 큰 지렛대라는 명제를 수치로 말한 자료는 [[agents/lee-hoyeon-2026-harness-engineering]] 하나다. 모델 교체로 5%를 개선하기보다 harness 설계로 15%를 개선하는 편이 현실적이라는 것이고, 그 근거로 드는 LangChain 사례는 GPT-5.2-Codex 모델을 고정한 채 harness만 바꿔 TerminalBench 점수를 52.8에서 66.5로 올렸다는 것이다. 다만 이 값은 발표자가 측정한 것이 아니라 인용한 것이다.

## 학습 경로

아래 여덟 단계는 frontmatter의 `study_path`와 같은 순서다. 개념 진입에서 시작해 재료와 운용을 거쳐 실증과 경계로 간다.

1. [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering 슬라이드]]. 담론의 어휘와 여섯 단계 순환을 먼저 잡는다. 구조와 맥락과 계획과 실행과 검증과 개선이라는 이름이 나머지 일곱 편을 배치할 좌표계가 된다.
2. [[agents/walkinglabs-learn-harness-engineering|Learn Harness Engineering]]. 같은 대상을 Instructions와 State와 Verification과 Scope와 Lifecycle 다섯으로 자른 두 번째 분해다. 두 분해를 겹쳐 보면 어느 구성 요소가 공통이고 어느 것이 한 저자의 선택인지 드러난다.
3. [[agents/osmani-2026-agent-skills|Agent Skills]]. harness에 들어갈 재료 하나를 자세히 본다. 설계 원칙 다섯 가지와 6단계 SDLC 배치를 얻고, 스킬이 harness의 한 layer일 뿐이라는 위치 규정도 여기서 나온다.
4. [[agents/hada-2026-agent-skills|Agent Skills GeekNews 토론]]. 위 처방을 받아든 실무자들의 찬반을 본다. 강제의 판단 주체가 모델 자신이라는 반론과 800줄 스킬의 컨텍스트 비용 관찰이 처방의 빈틈을 짚는다.
5. [[agents/patel-2026-beyond-the-prompt-claude-code|Beyond the Prompt]]. 원칙을 파일과 커맨드로 옮긴 운용 매뉴얼이다. 설정 계층, 스킬 frontmatter 키, 읽기 전용 리뷰 서브에이전트, 완료 조건 루프까지 그대로 따라 할 수 있는 형태로 나온다.
6. [[agents/osmani-2026-loop-engineering|Loop Engineering]]. 앞에서 깔아 둔 구성 요소를 사람 개입 없이 순환시키는 실행 층이다. 자동화와 worktree와 스킬과 커넥터와 서브에이전트, 그리고 보조 요소인 persistent state 여섯 가지를 얻는다.
7. [[agents/trq212-2026-a-field-guide-to-fable|A Field Guide to Fable]]. 문제를 harness 앞으로 옮긴다. 지도와 영토의 간극인 unknown을 네 분면으로 나누고 구현 전과 중과 후에 걸쳐 발굴하는 8패턴이 사람 쪽 준비 절차를 채운다.
8. [[agents/lin-2026-harness-updating-is-not-harness-benefit|Harness Updating Is Not Harness Benefit]]. 앞선 처방이 어느 모델에서 실제로 회수되는지 통제 실험으로 잰다. 마지막에 읽어야 harness-updating과 harness-benefit의 분리, 그리고 activation과 adherence 두 병목이 앞선 처방의 전제를 어디서 건드리는지 보인다.

빠르게 훑어야 한다면 1번과 8번 두 편으로 줄일 수 있다. 앞은 담론 전체의 어휘를 주고 뒤는 그 담론이 어느 조건에서 성립하는지를 준다. 실무에 바로 옮길 절차만 필요하면 5번과 6번을 먼저 보는 편이 빠르다.

## 한계

이 개괄 자체의 제약은 근거 등급의 비대칭에서 온다.

- **통제 실험이 한 편뿐이다.** 8편 중 [[agents/lin-2026-harness-updating-is-not-harness-benefit]]만 비교군을 둔 측정이고 나머지 일곱은 처방, 실무 경험담, 커뮤니티 토론, 교육 자료다. 따라서 harness 설계의 효과에 대한 정량 진술은 사실상 한 자료에 의존한다.
- **그 한 편의 적용 범위도 좁다.** 해당 논문은 가중치를 고정한 채 외부 artifact만 갱신하는 설정을 다루고, 편집 허용 범위가 skill과 일부 prompt와 memory에 한정되며 `tools/`는 전 벤치마크에서 읽기 전용이다. 사람이 직접 설계한 harness의 효과를 잰 실험이 아니라 evolver가 자동 갱신한 harness를 잰 실험이라는 점도 처방 쪽 주장과 곧장 겹치지 않는다.
- **자주 인용되는 회사 사례가 모두 2차 자료다.** LangChain, OpenAI, Anthropic, Stripe 사례는 [[agents/lee-hoyeon-2026-harness-engineering]]이 인용한 값이고 발표자의 1차 측정이 아니다. 원 출처의 실험 조건은 이 저장소 자료로 확인할 수 없다.
- **도구 종속이 크다.** 통제 실험 한 편을 뺀 일곱 편이 Claude 계열 도구를 예시로 삼는다. [[agents/lee-hoyeon-2026-harness-engineering]]과 [[agents/patel-2026-beyond-the-prompt-claude-code]]는 각 페이지가 Claude Code 생태계 종속과 버전 의존성을 한계로 명시한다. 커맨드 이름, frontmatter 키, 환경 변수는 버전에 따라 바뀌므로 개념과 구현을 나눠 읽어야 한다.
- **분해 대응이 해석이다.** 위 단계 대응표는 각 자료가 합의한 매핑이 아니라 세 분해를 겹쳐 읽은 결과이며, 그 출처인 [[agents/lee-hoyeon-2026-harness-engineering]]도 해석임을 밝히고 있다.
- **커버 범위 밖이 남는다.** harness를 모델 가중치 쪽으로 옮기는 접근, harness를 건 채 학습 루프를 실행하는 접근, 메모리 구조를 다루는 연구는 이 여덟 편에 포함되지 않는다. 저장소에 관련 페이지가 있으나 이 개괄이 커버 자료로 삼지 않았으므로 여기서는 다루지 않는다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| harness | 모델을 감싸 도구와 검증과 상태를 제공하는 실행 환경. 프롬프트, 스킬, 메모리, tool 인터페이스가 그 구성 요소다 |
| verification distance | 구현을 맡은 에이전트와 평가를 맡은 에이전트를 떼어 놓아 자기 채점 편향을 차단하는 구조 |
| progressive disclosure | 필요한 시점에만 정보를 단계적으로 노출하는 설계. 스킬 보유량과 로드량을 분리해 컨텍스트를 아낀다 |
| harness-updating과 harness-benefit | 유용한 harness 수정을 만들어내는 능력과 그렇게 수정된 harness에서 이득을 얻는 능력. 두 능력이 base capability와 서로 다르게 어긋난다 |
| activation 실패와 adherence 실패 | 관련 harness artifact를 컨텍스트로 가져오지 못하는 실패와, 가져오고도 그 지침을 따르지 못하는 실패. 앞은 출력 형식 규약 계층, 뒤는 절차 실행 계층의 문제다 |
| unknown | 사용자가 건넨 표상과 작업이 실제로 벌어지는 현실 사이에 남는 영역. 모델은 이 앞에서 멈추지 않고 의도를 추측해 결정한다 |

## 관련 페이지

- [[agents/lee-hoyeon-2026-harness-engineering]]: 여섯 단계 순환과 단계별 도구 매핑을 제공하는 전체 프레임. 이 지도의 좌표계이자 다른 분해 방식과의 대응표가 나오는 자리다.
- [[agents/walkinglabs-learn-harness-engineering]]: harness를 다섯 하위 시스템으로 나눠 같은 앱을 여섯 번 다시 짓게 하는 실습 코스. 분해를 점검 가능한 체크리스트로 바꾼 자리다.
- [[agents/osmani-2026-agent-skills]]: 스킬의 설계 원칙 다섯 가지와 6단계 SDLC 배치. 스킬을 harness의 전부가 아니라 한 layer로 규정한 출처다.
- [[agents/hada-2026-agent-skills]]: 위 원칙에 대한 커뮤니티 찬반 토론. 강제의 판단 주체 문제와 컨텍스트 비용이라는 두 반론을 담당한다.
- [[agents/patel-2026-beyond-the-prompt-claude-code]]: 설정 계층부터 완료 조건 루프까지 원칙을 파일과 커맨드로 옮긴 운용 매뉴얼. 이 지도에서 가장 구체적인 실행 절차를 제공한다.
- [[agents/osmani-2026-loop-engineering]]: 구성 요소를 사람 개입 없이 순환시키는 실행 층. 자동화의 최소 골격과 comprehension debt 경고를 담당한다.
- [[agents/trq212-2026-a-field-guide-to-fable]]: harness의 입력단인 사람 쪽 준비 절차. unknown 네 분면과 발굴 8패턴을 담당한다.
- [[agents/lin-2026-harness-updating-is-not-harness-benefit]]: 두 능력을 분리해 잰 통제 실험. 이 지도에서 유일한 실증 근거이자 처방들의 전제를 검토하는 자리다.
- [[overviews/prompt-to-loop-engineering-evolution-overview]]: 프롬프트에서 컨텍스트와 harness를 거쳐 루프로 이어지는 4단계 진화를 묶은 상위 진입 지도. 이 개괄은 그 사다리에서 harness 칸을 확대한 자리에 놓인다.
- [[overviews/agent-skills-overview]]: 스킬 포맷의 설계 근거와 오픈 표준화, 생태계를 묶은 합성 페이지. 이 개괄이 재료로만 다룬 `SKILL.md` 규격과 구현 세부를 담당한다.
- [[overviews/loop-engineering-cross-domain-overview]]: 같은 프레임이 코딩 밖 도메인으로 옮겨가는지 검토한 개괄. 이 개괄이 코딩 에이전트 안에서 다룬 논의를 도메인 바깥으로 넓힌다.
