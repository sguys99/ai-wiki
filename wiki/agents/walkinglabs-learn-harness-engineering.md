---
title: "Learn Harness Engineering"
type: repo
year: 2025
category: agents
source: walkinglabs-learn-harness-engineering.md
raw_path: raw/repos/walkinglabs-learn-harness-engineering.md
raw_filename: "walkinglabs-learn-harness-engineering.md"
source_collection: external
org: "walkinglabs"
repo: "learn-harness-engineering"
url: "https://github.com/walkinglabs/learn-harness-engineering"
license: "MIT"
tags: [harness-engineering, coding-agents, course, AGENTS.md, verification, agent-lifecycle]
---

## 요약

Learn Harness Engineering은 AI 코딩 에이전트가 안정적으로 동작하는 환경을 직접 만들어 보게 하는 프로젝트 기반 코스다. walkinglabs가 2025년에 MIT 라이선스로 공개했고 강의 12편과 프로젝트 6편으로 구성된다. 한국어를 포함한 15개 언어 번역을 제공하며 강의 본문과 프로젝트 명세는 VitePress 문서 사이트에 올려 두었다.

harness는 모델을 감싸 지시, 상태, 검증, 범위, 생애주기를 제공하는 실행 환경을 말한다. 이 코스의 핵심 주장은 harness를 다섯 하위 시스템으로 나눠 하나씩 설계할 수 있는 대상으로 만든 데 있다. 다섯 하위 시스템은 Instructions, State, Verification, Scope, Lifecycle이다.

교육 방식도 이 주장을 따라간다. 6개 프로젝트가 모두 같은 Electron 기반 지식 베이스 앱을 대상으로 하고, 앞 프로젝트의 해답이 다음 프로젝트의 출발점이 된다. 독자는 같은 앱을 여섯 번 다시 만들면서 harness 장치가 하나씩 더해질 때 결과가 어떻게 달라지는지 직접 확인하게 된다.

## 배경

이 코스가 출발점으로 삼는 문제는 모델의 성능이 아니라 모델을 둘러싼 환경이다. README는 강한 AI 모델이라도 적절한 환경 구조가 없으면 실제 엔지니어링 과제에서 실패한다고 명시한다. 코스가 1단계에서 다루는 capability-reliability gap이 바로 이 상황을 가리킨다. 모델이 원리적으로 할 수 있는 일과 실제 과제에서 반복적으로 해내는 일 사이에 간극이 있다는 뜻이다.

근거로는 OpenAI와 Anthropic의 연구를 인용한다. README의 요지는 동일한 모델이 harness 품질에 따라 크게 다른 결과를 낸다는 것이다. 인용된 실험 하나는 두 가지 결과를 대비한다. 한쪽은 20분 동안 9달러를 쓰고도 작동하지 않는 산출물을 얻었고 다른 쪽은 6시간 동안 200달러를 들여 플레이 가능한 제품을 얻었다.

이 대비는 harness 설계가 모델 선택만큼 큰 변수라는 주장을 압축한다. 다만 비용과 시간이 함께 늘어난 조건이므로 harness 품질만의 기여를 분리해 읽을 수는 없다. 코스는 이 사례를 정량 근거가 아니라 문제의식을 여는 장치로 사용한다.

## 핵심 개념

**capability-reliability gap**은 모델의 잠재 역량과 실제 과제에서 나타나는 신뢰성 사이의 간극을 말한다. 코스는 이 간극을 모델 교체로 메우는 대신 환경 설계로 메우려 한다.

**overreach**는 에이전트가 지시받은 범위를 넘어 여러 기능을 동시에 건드리는 상태를 뜻한다. README는 이 상태와 미완성 작업을 Scope 하위 시스템이 막아야 할 대상으로 지목한다.

**증거 기반 완료 판정**은 에이전트가 "다 했다"고 선언하는 것으로 작업을 끝내지 않고 test, lint, type-check, end-to-end 파이프라인 같은 실행 가능한 검사로 완료를 증명하게 하는 원칙이다. Verification 하위 시스템의 정의가 이 원칙 그 자체다.

**clean-state handoff**는 세션을 마칠 때 다음 세션이 그대로 이어받을 수 있도록 정돈된 상태로 넘기는 것이다. Lifecycle 하위 시스템은 초기화와 실행에 이 인수인계 국면을 더해 세 국면으로 세션을 구조화한다.

## 방법

### harness 패턴의 다섯 하위 시스템

README는 완성된 harness가 서로 맞물린 다섯 하위 시스템으로 이루어진다고 규정한다. 이 구분이 코스 전체의 뼈대다.

| 하위 시스템 | 정의 | 대표 산출물 |
|---|---|---|
| Instructions | 에이전트 운영 매뉴얼 | AGENTS.md, CLAUDE.md, 문서 |
| State | 진행 상태의 영속 기록 | progress log, feature list, git history |
| Verification | 증거 기반 완료 판정 | test, lint, type-check, end-to-end 파이프라인 |
| Scope | 단일 기능 제약으로 overreach와 미완성 작업 방지 | feature_list.json |
| Lifecycle | 초기화, 실행, clean-state 인수인계로 이어지는 구조화된 세션 | 세션 운영 절차 |

다섯 항목은 서로 다른 실패 양상에 대응한다. Instructions는 에이전트가 프로젝트의 규칙을 모르는 상태를 다루고 State는 세션이 끊길 때 진행 상황이 사라지는 문제를 다룬다. Verification은 완료 선언과 실제 완료가 어긋나는 문제를, Scope는 한 번에 너무 많은 것을 건드려 어느 것도 끝나지 않는 문제를 담당한다. Lifecycle은 이 넷을 세션이라는 시간 단위 위에 배치한다.

분해의 효과는 점검 가능성이다. harness를 하나의 덩어리로 두면 "환경을 잘 갖추라"는 조언에 머물지만 다섯으로 나누면 각 항목에 대해 우리 저장소에 무엇이 있는지 확인할 수 있다. 저장소가 셸 기반 검증 도구 `audit-harness.sh`를 함께 담은 것도 같은 맥락이다.

### 6단계 커리큘럼

강의는 여섯 단계로 나뉘고 각 단계가 앞 단계 위에 쌓인다. 앞의 세 단계가 환경을 갖추는 쪽이라면 뒤의 세 단계는 에이전트가 스스로 교정하고 검증하도록 만드는 쪽이다.

| 단계 | 이름 | 다루는 문제 |
|---|---|---|
| 1 | Problem Recognition | capability-reliability gap 이해 |
| 2 | Repository Architecture | 에이전트가 읽기 좋게 코드베이스를 구조화 |
| 3 | Session Continuity | 여러 세션에 걸쳐 진행 상태 유지 |
| 4 | Feedback Mechanisms | 런타임 교정과 scope 경계 |
| 5 | Self-Verification | 에이전트가 자기 작업을 스스로 검증 |
| 6 | Complete Integration | 전체 harness 시스템 통합 |

단계와 하위 시스템은 느슨하게 대응한다. 2단계가 Instructions에, 3단계가 State에, 4단계가 Scope에, 5단계가 Verification에 각각 무게를 싣고 6단계에서 Lifecycle까지 포함해 전체를 통합한다. 1단계는 특정 하위 시스템이 아니라 왜 이런 분해가 필요한지를 다루는 도입부다.

### 동일 앱 반복 실습 구조

6개 프로젝트는 모두 하나의 Electron 기반 지식 베이스 애플리케이션을 대상으로 한다. 각 프로젝트의 해답이 다음 프로젝트의 토대가 되는 방식이다.

이 구조는 harness 장치의 효과를 비교 가능하게 만든다. 대상 앱이 매번 바뀌면 결과 차이가 앱 난이도 때문인지 harness 때문인지 구분하기 어렵다. 대상을 하나로 고정하면 달라지는 변수는 그 회차에 추가된 장치뿐이다. README는 이 점진적 구성이 harness 장치가 계속 쌓이며 신뢰성을 높이는 방식을 보여준다고 설명한다.

### 바로 쓰는 템플릿

코스는 읽고 끝나지 않도록 즉시 적용 가능한 템플릿 네 개를 quick start로 제공한다.

| 파일 | README의 설명 | 대응하는 하위 시스템 |
|---|---|---|
| `AGENTS.md` | 운영 지시 | Instructions |
| `init.sh` | 환경 검증 스크립트 | Lifecycle의 초기화 국면 |
| `feature_list.json` | 기계가 읽을 수 있는 scope 경계 | Scope |
| `progress.md` | 세션에서 세션으로 이어지는 연속성 파일 | State |

세 번째 열의 대응은 README가 명시한 것이 아니라 각 파일의 설명을 다섯 하위 시스템의 정의와 맞춰 본 결과다. 네 파일은 Verification을 제외한 나머지 네 항목을 한 번씩 채운다. Verification은 프로젝트마다 다른 test와 lint 구성에 맡겨지므로 단일 템플릿으로 배포하기 어려운 항목이다.

`feature_list.json`이 JSON 형식인 이유도 같은 맥락에서 읽힌다. scope 경계를 산문 지시가 아니라 기계가 읽을 수 있는 구조로 두면 에이전트가 범위를 벗어났는지 자동으로 판정할 수 있다.

### 부속 도구와 다국어 리소스

저장소는 강의 자료 외에 세 가지를 함께 담고 있다.

| 항목 | 성격 | 특징 |
|---|---|---|
| `harness-creator` 스킬 | 새 프로젝트용 harness 스캐폴딩 | production 수준 harness를 생성한다 |
| `audit-harness.sh` | 셸 기반 검증 도구 | Node.js 설치가 필요 없다 |
| 다국어 리소스 라이브러리 | 템플릿과 체크리스트 모음 | 15개 언어로 제공한다 |

`audit-harness.sh`가 Node.js를 요구하지 않는다는 점은 실용적인 선택이다. 검사 대상 프로젝트의 언어와 무관하게 셸만 있으면 harness 상태를 점검할 수 있다.

## 사용 전제

코스를 따라가려면 코딩 에이전트 도구가 최소 1종 필요하다. README는 Claude Code와 Codex를 예로 들고 동급 도구도 무방하다고 밝힌다. 요구되는 능력은 네 가지다.

| 요구 능력 | 코스에서 쓰이는 자리 |
|---|---|
| 로컬 저장소의 파일 편집 | 프로젝트 코드와 harness 파일 작성 |
| 명령 실행 | `init.sh`와 검증 파이프라인 구동 |
| 다단계 과제 완수 | 한 세션 안에서 여러 단계를 이어 수행 |
| 출력 검사와 반복 수정 | Self-Verification 단계의 자기 교정 |

두 번째 열은 README가 항목별로 밝힌 용도가 아니라 코스 구성에 비춘 해석이다. 네 능력이 사실상 Verification과 Lifecycle을 실행 가능하게 만드는 최소 조건이라는 점은 분명하다. 명령을 실행하고 그 출력을 읽어 다시 고치는 순환이 없으면 증거 기반 완료 판정 자체가 성립하지 않는다.

## 결과

이 저장소는 정량 벤치마크를 제시하지 않는다. 성격이 실증 연구가 아니라 교육 코스이기 때문이다. README가 인용하는 유일한 수치는 배경 절에서 다룬 비용 대비 사례 하나다.

학습 성과는 다른 방식으로 확인된다. 같은 앱을 여섯 번 반복하는 구조 자체가 측정 장치 역할을 한다. 회차가 진행될수록 harness 장치가 누적되므로 독자는 자기 결과물의 변화로 효과를 확인한다.

## 한계

- 명제의 근거가 코스 밖에 있다. 자체 실험이 아니라 외부(OpenAI, Anthropic) 연구를 인용하는 교육 자료라서 harness 품질의 효과를 이 저장소만으로 검증할 수 없다.
- 인용된 비용 대비 사례는 조건이 통제된 비교가 아니다. 비용과 시간이 함께 늘어난 상황이라 harness 품질만의 기여를 분리하기 어렵다.
- 세부가 README 밖에 있다. 강의 12편과 프로젝트 6편의 내용은 VitePress 사이트에서 확인해야 하며 이 wiki가 보유한 원본은 README 스냅샷뿐이다.
- 예제가 Electron 기반 지식 베이스 앱 한 종에 묶여 있다. 다른 도메인이나 다른 규모의 저장소로 옮기는 작업은 독자 몫으로 남는다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Harness pattern | 이 코스가 정의한 harness의 구성 규격. Instructions, State, Verification, Scope, Lifecycle 다섯 하위 시스템이 서로 맞물린 형태를 말한다 |
| Capability-reliability gap | 모델의 잠재 역량과 실제 과제에서 보이는 신뢰성 사이의 간극. 코스 1단계가 다루는 문제다 |
| Scope constraint | 한 세션이 한 기능만 다루도록 묶는 제약. `feature_list.json`에 기계가 읽을 수 있는 형태로 기록한다 |
| Clean-state handoff | 세션을 마칠 때 다음 세션이 이어받기 좋도록 정돈된 상태로 넘기는 것. Lifecycle의 마지막 국면이다 |
| AGENTS.md | 에이전트 운영 지시를 담는 문서. CLAUDE.md와 나란히 Instructions의 대표 산출물로 제시된다 |

## 관련 페이지

- [[agents/ai-boost-awesome-harness-engineering]]: harness를 primitive 단위로 큐레이션한 상위 인덱스. 이 코스는 그 분류에서 교육과 실습에 해당하는 자리를 채운다
- [[agents/lee-hoyeon-2026-harness-engineering]]: 프롬프트에서 컨텍스트, harness로 이어지는 진화를 다룬 한국어 강의 자료. 이 코스의 다섯 하위 시스템은 그중 harness 단계를 실습으로 풀어낸 것에 해당한다
- [[agents/kang-2026-no-longer-prompting-claude]]: 프롬프트, 컨텍스트, harness, loop 네 단계를 정리한 한국어 해설. 같은 계보의 담론이다
- [[agents/lin-2026-harness-updating-is-not-harness-benefit]]: harness의 이득이 어디서 나오는지 통제 실험으로 분해한 논문. 이 코스가 전제로 삼은 명제의 적용 범위를 검토할 때 함께 읽는다
- [[agents/seans-ai-stories-2026-agent-harness-loop-engineering]]: harness와 loop engineering을 짧은 영상으로 개괄하는 자료. 코스에 들어가기 전 개요를 잡는 용도로 쓸 수 있다
- [[agents/he-2026-agent-lightning-v1-0-towards-harnessed]]: 배포용 harness를 그대로 둔 채 강화학습을 수행하는 harnessed agentic RL 프레임워크. 사람이 harness를 설계하는 이 코스와 접근이 대비된다
- [[overviews/agent-harness-engineering-overview]]: 이 클러스터 전체를 한 지도로 묶는 개괄

## 원본 링크

- 저장소: https://github.com/walkinglabs/learn-harness-engineering (MIT)
- 문서 사이트: https://walkinglabs.github.io/learn-harness-engineering/
- 요약 source: `sources/walkinglabs-learn-harness-engineering.md`
