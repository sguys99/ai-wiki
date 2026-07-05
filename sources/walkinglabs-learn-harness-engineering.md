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

AI 코딩 에이전트를 신뢰성 있게 굴리는 "harness(마구)"를 강의 12편·프로젝트 6편으로 가르치는 프로젝트 기반 코스. harness를 Instructions·State·Verification·Scope·Lifecycle 다섯 축으로 정의하고, 같은 Electron 앱을 여섯 번 반복해 만들며 각 축이 신뢰성을 어떻게 쌓는지 실습으로 보여준다.

## 1. 자료 정보 (Document Information)

- **저장소**: walkinglabs/learn-harness-engineering (GitHub, MIT, 2025)
- **형태**: VitePress 기반 강의 코스 저장소 (문서 사이트 + 템플릿 + 스크립트). 강의 12편, 프로젝트 6편, 15개 언어 번역 제공(한국어 포함).
- **문서 사이트**: https://walkinglabs.github.io/learn-harness-engineering/
- **대상 도구**: Claude Code, Codex 등 파일 편집·명령 실행·다단계 작업·출력 검사가 가능한 코딩 에이전트 최소 1종.

## 2. 주요 기여 (Key Contributions)

- **harness를 5개 하위 시스템으로 분해**: Instructions(운영 매뉴얼), State(진행 상태), Verification(증거 기반 완료), Scope(단일 기능 제약), Lifecycle(세션 생애주기). harness engineering을 막연한 감이 아니라 점검 가능한 체크리스트로 바꾼다.
- **"모델이 아니라 환경이 결과를 가른다"는 명제의 실습화**: 같은 모델이라도 harness 품질에 따라 "20분·$9를 쓰고도 작동 안 하는 결과"와 "6시간·$200을 들여 플레이 가능한 제품"으로 갈린다는 OpenAI·Anthropic 연구를 코스의 출발점으로 삼는다.
- **동일 앱 6회 반복 구조**: 6개 프로젝트가 모두 같은 Electron 지식 베이스 앱을 다루고, 앞 프로젝트의 결과물이 다음 프로젝트의 토대가 된다. harness 장치들이 어떻게 복리로 쌓이는지 한 단계씩 드러난다.
- **바로 쓰는 템플릿 4종**: `AGENTS.md`(운영 지시), `init.sh`(환경 검증), `feature_list.json`(기계 판독 가능한 scope 경계), `progress.md`(세션 간 연속성).
- **부속 도구**: 새 프로젝트에 production급 harness를 스캐폴딩하는 `harness-creator` skill, Node.js 없이 도는 셸 검증 도구 `audit-harness.sh`, 템플릿·체크리스트를 모은 다국어 리소스 라이브러리.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

**The Harness Pattern — 5개 축**

| 축 | 정체 | 대표 산출물 |
|---|---|---|
| Instructions | 에이전트 운영 매뉴얼 | AGENTS.md, CLAUDE.md, 문서 |
| State | 진행 상태의 영속 기록 | progress log, feature list, git history |
| Verification | 증거 기반 완료 판정 | test, lint, type-check, e2e 파이프라인 |
| Scope | 단일 기능 제약(overreach 방지) | feature_list.json |
| Lifecycle | 초기화·실행·clean-state 인수인계 | 구조화된 세션 |

**6단계 학습 진행** (각 단계가 앞 단계 위에 쌓임)

1. Problem Recognition — 역량-신뢰성 간극(capability-reliability gap) 이해
2. Repository Architecture — 에이전트가 읽기 좋게 코드베이스 구조화하기
3. Session Continuity — 여러 세션에 걸쳐 진행 상태 유지하기
4. Feedback Mechanisms — 런타임 교정과 scope 경계
5. Self-Verification — 에이전트가 자기 작업을 스스로 검증
6. Complete Integration — 전체 harness 시스템 통합

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크를 내세우는 저장소가 아니라 교육 코스다. 인용하는 핵심 수치는 harness 품질의 효과를 보여주는 일화적 실험 하나로, 동일 모델에서 harness 유무가 "$9/20분/미작동"과 "$200/6시간/플레이 가능"으로 갈렸다는 사례다. 학습 성과는 6개 프로젝트를 지나며 신뢰성 장치가 얼마나 누적되는가로 가늠한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 자체 실증 데이터가 아니라 외부(OpenAI·Anthropic) 연구를 인용하는 교육 자료라, 명제의 근거는 코스 밖에 있다.
- README가 요약 성격이라 강의 12편·프로젝트 6편의 세부는 VitePress 사이트에서 확인해야 한다(이 wiki에는 README 스냅샷만 보유).
- 예제가 Electron 지식 베이스 앱 한 종에 묶여 있어, 다른 도메인으로 옮기는 일은 독자 몫으로 남는다.

## 6. 관련 연구 (Related Work)

- **ai-boost/awesome-harness-engineering** — harness를 primitive 단위로 큐레이션한 상위 인덱스. 이 코스는 그 분류에서 "교육/실습" 슬롯을 채운다.
- **Team Attention 이호연 / Sujin Kang** — Prompt → Context → Harness → Loop 진화 서사. 이 코스의 5축은 그 harness 단계를 실습 가능한 형태로 풀어낸 것이다.
- **Lin et al. (Harness Updating Is Not Harness Benefit)** — harness의 이득이 어디서 회수되는지 따진 controlled 실증. 이 코스가 내건 "환경이 결과를 가른다"는 전제의 경계선을 짚는다.

## 7. 용어집 (Glossary)

- **Harness(하네스/마구)**: 모델을 둘러싼 실행 환경으로, 지시·상태·검증·범위·생애주기를 아우른다. 모델 자체가 아니라 모델을 "부리는" 장치다.
- **Capability-reliability gap**: 모델의 잠재 역량과 실제 과제에서의 신뢰성 사이 간극. harness가 메우려는 대상이다.
- **Scope constraint**: 한 세션이 한 기능만 건드리도록 묶는 제약. overreach와 미완성 작업을 막는다.
- **Clean-state handoff**: 세션을 마칠 때 다음 세션이 이어받기 좋게 정돈된 상태로 넘기는 것.
- **AGENTS.md**: 에이전트 운영 지시를 담는 표준 문서(도구 중립적이며, CLAUDE.md의 상위 개념격).
