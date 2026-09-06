---
title: "Learn Harness Engineering"
type: repo
year: 2025
category: agents
raw_path: raw/repos/walkinglabs-learn-harness-engineering.md
raw_filename: "walkinglabs-learn-harness-engineering.md"
source_collection: external
org: "walkinglabs"
repo: "learn-harness-engineering"
url: "https://github.com/walkinglabs/learn-harness-engineering"
license: "MIT"
tags: [harness-engineering, coding-agents, course, AGENTS.md, verification, agent-lifecycle]
---

## 한 줄 요약 (One-line Summary)

AI 코딩 에이전트가 실제 엔지니어링 과제에서 안정적으로 동작하도록 주변 환경을 설계하는 방법을 강의 12편과 프로젝트 6편으로 가르치는 프로젝트 기반 코스다. harness는 모델을 감싸 지시, 상태, 검증, 범위, 생애주기를 제공하는 실행 환경을 말한다. 이 코스는 harness를 Instructions, State, Verification, Scope, Lifecycle 다섯 하위 시스템으로 정의하고, 같은 Electron 앱을 여섯 번 반복해 만들며 각 구성 요소가 신뢰성에 어떻게 기여하는지 실습으로 보여준다.

## 1. 자료 정보 (Document Information)

- **저장소**: walkinglabs/learn-harness-engineering (GitHub, MIT 라이선스, 2025)
- **형태**: VitePress 기반 강의 코스 저장소다. 문서 사이트와 템플릿, 셸 스크립트가 함께 들어 있다.
- **구성**: 강의 12편, 프로젝트 6편.
- **번역**: 15개 언어를 지원한다. README가 이름을 밝힌 언어는 영어, 중국어, 일본어, 한국어, 스페인어, 프랑스어, 러시아어, 독일어, 아랍어, 베트남어, 우즈베크어, 터키어, 포르투갈어, 우크라이나어 14종이다.
- **문서 사이트**: https://walkinglabs.github.io/learn-harness-engineering/ 에서 강의 본문, 프로젝트 명세, 리소스 템플릿 전문을 제공한다.
- **전제 조건**: 코딩 에이전트 도구를 최소 1종(Claude Code, Codex 또는 동급) 갖춰야 한다. README가 요구하는 능력은 로컬 저장소의 파일 편집, 명령 실행, 다단계 과제 완수, 출력 검사와 반복 수정 네 가지다.

## 2. 주요 기여 (Key Contributions)

- **harness를 5개 하위 시스템으로 분해**: Instructions(운영 매뉴얼), State(진행 상태), Verification(증거 기반 완료 판정), Scope(단일 기능 제약), Lifecycle(세션 생애주기)로 나눈다. harness 설계를 막연한 감각이 아니라 점검 가능한 항목 목록으로 바꾼다.
- **모델이 아니라 환경이 결과를 가른다는 명제를 코스의 출발점으로 삼음**: README는 OpenAI와 Anthropic의 연구를 인용해, 동일한 모델이라도 harness 품질에 따라 결과가 크게 달라진다고 서술한다. 인용된 실험 하나는 20분 동안 9달러를 쓰고도 작동하지 않는 산출물을 얻은 경우와, 6시간 동안 200달러를 들여 플레이 가능한 제품을 얻은 경우를 대비한다.
- **동일 앱 6회 반복 구조**: 6개 프로젝트가 모두 같은 Electron 기반 지식 베이스 앱을 다룬다. 앞 프로젝트의 해답이 다음 프로젝트의 토대가 되므로, harness 장치가 계속 쌓이며 신뢰성을 높이는 과정을 한 앱 안에서 확인할 수 있다.
- **바로 쓰는 템플릿 4종 제공**: `AGENTS.md`(운영 지시), `init.sh`(환경 검증 스크립트), `feature_list.json`(기계가 읽을 수 있는 scope 경계), `progress.md`(세션 간 연속성 파일).
- **부속 도구와 리소스**: 새 프로젝트에 production 수준 harness를 스캐폴딩하는 `harness-creator` 스킬, Node.js 설치 없이 실행되는 셸 기반 검증 도구 `audit-harness.sh`, 템플릿과 체크리스트를 모은 다국어 리소스 라이브러리.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

**harness 패턴의 다섯 하위 시스템**

README는 완성된 harness가 서로 맞물린 다섯 하위 시스템으로 이루어진다고 규정한다.

| 하위 시스템 | 정의 | 대표 산출물 |
|---|---|---|
| Instructions | 에이전트 운영 매뉴얼 | AGENTS.md, CLAUDE.md, 문서 |
| State | 진행 상태의 영속 기록 | progress log, feature list, git history |
| Verification | 증거 기반 완료 판정 | test, lint, type-check, end-to-end 파이프라인 |
| Scope | 단일 기능 제약으로 overreach와 미완성 작업 방지 | feature_list.json |
| Lifecycle | 초기화, 실행, clean-state 인수인계로 이어지는 구조화된 세션 | 세션 운영 절차 |

**6단계 학습 진행**

코스는 여섯 단계로 나뉘고 각 단계가 앞 단계 위에 쌓인다.

| 단계 | 이름 | 다루는 문제 |
|---|---|---|
| 1 | Problem Recognition | 역량과 신뢰성 사이의 간극(capability-reliability gap) 이해 |
| 2 | Repository Architecture | 에이전트가 읽기 좋게 코드베이스를 구조화 |
| 3 | Session Continuity | 여러 세션에 걸쳐 진행 상태 유지 |
| 4 | Feedback Mechanisms | 런타임 교정과 scope 경계 |
| 5 | Self-Verification | 에이전트가 자기 작업을 스스로 검증 |
| 6 | Complete Integration | 전체 harness 시스템 통합 |

**바로 쓰는 템플릿 4종**

README는 즉시 사용 가능한 템플릿 네 개를 quick start로 제시한다.

| 파일 | README의 설명 |
|---|---|
| `AGENTS.md` | 운영 지시 |
| `init.sh` | 환경 검증 스크립트 |
| `feature_list.json` | 기계가 읽을 수 있는 scope 경계 |
| `progress.md` | 세션에서 세션으로 이어지는 연속성 파일 |

**프로젝트 진행 방식**

6개 프로젝트는 모두 하나의 Electron 애플리케이션을 대상으로 하며, 각 프로젝트의 해답이 다음 프로젝트의 토대가 된다. README는 이 점진적 구성이 harness 장치가 서로 겹치며 신뢰성을 높이는 방식을 보여준다고 설명한다.

**부속 도구**

| 도구 | 성격 | 비고 |
|---|---|---|
| `harness-creator` 스킬 | 새 프로젝트용 production 수준 harness 스캐폴딩 | |
| `audit-harness.sh` | 셸 기반 검증 도구 | Node.js 설치가 필요 없다 |
| 다국어 리소스 라이브러리 | 템플릿과 체크리스트 모음 | 15개 언어 |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크를 제시하는 저장소가 아니라 교육 코스다. README가 인용하는 유일한 수치는 harness 품질의 효과를 보여주는 일화적 실험 하나로, 동일한 모델이 20분과 9달러를 쓰고 작동하지 않는 산출물을 낸 경우와 6시간과 200달러를 들여 플레이 가능한 제품을 낸 경우를 대비한다. 학습 성과는 6개 프로젝트를 지나며 신뢰성 장치가 얼마나 누적되는가로 가늠하는 구조다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 자체 실증 데이터가 아니라 외부(OpenAI, Anthropic) 연구를 인용하는 교육 자료다. 따라서 "환경이 결과를 가른다"는 명제의 근거는 코스 밖에 있다.
- README가 요약 성격이라 강의 12편과 프로젝트 6편의 세부는 VitePress 사이트에서 확인해야 한다. 이 wiki가 보유한 원본은 README 스냅샷뿐이다.
- 예제가 Electron 기반 지식 베이스 앱 한 종에 묶여 있다. 다른 도메인으로 옮기는 작업은 독자 몫으로 남는다.
- 인용된 비용 대비 실험은 조건이 통제된 비교가 아니라 사례 하나다. 비용과 시간이 함께 늘어난 조건이라 harness 품질만의 기여를 분리하기 어렵다.

## 6. 관련 연구 (Related Work)

이 절은 저장소가 인용한 문헌이 아니라 wiki 안의 이웃 자료를 가리킨다. README 자체는 OpenAI와 Anthropic의 연구를 출처 표기 없이 언급할 뿐이다.

- **ai-boost/awesome-harness-engineering**: harness를 primitive 단위로 큐레이션한 상위 인덱스다. 이 코스는 그 분류에서 교육과 실습에 해당하는 자리를 채운다.
- **이호연 (Team Attention), Sujin Kang**: 프롬프트에서 컨텍스트, harness, loop로 이어지는 진화 서사를 다룬 한국어 해설이다. 이 코스의 다섯 하위 시스템은 그중 harness 단계를 실습 가능한 형태로 풀어낸 것에 해당한다.
- **Lin et al., Harness Updating Is Not Harness Benefit**: harness의 이득이 어디서 나오는지 통제 실험으로 분해한 논문이다. 이 코스가 전제로 삼은 "환경이 결과를 가른다"는 명제의 적용 범위를 검토하는 데 쓸 수 있다.

## 7. 용어집 (Glossary)

- **Harness pattern**: 이 코스가 정의한 harness의 구성 규격으로, Instructions, State, Verification, Scope, Lifecycle 다섯 하위 시스템이 서로 맞물린 형태를 말한다.
- **Capability-reliability gap**: 모델의 잠재 역량과 실제 과제에서 보이는 신뢰성 사이의 간극이다. 코스 1단계가 다루는 문제이자 harness가 메우려는 대상이다.
- **Scope constraint**: 한 세션이 한 기능만 다루도록 묶는 제약이다. overreach와 미완성 작업을 막는 장치로 `feature_list.json`에 기계가 읽을 수 있는 형태로 기록한다.
- **Clean-state handoff**: 세션을 마칠 때 다음 세션이 이어받기 좋도록 정돈된 상태로 넘기는 것이다. Lifecycle 하위 시스템의 마지막 국면에 해당한다.
- **AGENTS.md**: 에이전트 운영 지시를 담는 문서다. 이 코스는 CLAUDE.md와 나란히 Instructions 하위 시스템의 대표 산출물로 든다.
