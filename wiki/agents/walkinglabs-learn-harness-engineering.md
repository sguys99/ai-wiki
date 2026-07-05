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

# Learn Harness Engineering

## 요약 (Summary)

AI 코딩 에이전트를 신뢰성 있게 굴리는 **harness(마구)** 를 가르치는 프로젝트 기반 코스다. 강의 12편, 프로젝트 6편, 15개 언어 번역(한국어 포함)으로 짜였고 VitePress 문서 사이트로 배포된다. 전제는 단순하다. 아무리 강한 모델도 환경 구조가 없으면 실제 엔지니어링 과제에서 무너진다. 같은 모델이 harness 품질에 따라 "20분·$9에 작동조차 안 하는 결과"와 "6시간·$200에 플레이 가능한 제품"으로 갈렸다는 OpenAI·Anthropic 사례가 코스의 출발점이다.

## The Harness Pattern — 5개 축 (Key Contributions)

harness를 다섯 하위 시스템으로 쪼갠 것이 이 코스의 뼈대다. 막연한 "잘 세팅하기"를 점검 가능한 항목으로 바꿔놓는다.

| 축 | 정체 | 대표 산출물 |
|---|---|---|
| **Instructions** | 에이전트 운영 매뉴얼 | AGENTS.md, CLAUDE.md, 문서 |
| **State** | 진행 상태의 영속 기록 | progress log, feature list, git history |
| **Verification** | 증거 기반 완료 판정 | test · lint · type-check · e2e |
| **Scope** | 단일 기능 제약(overreach 방지) | feature_list.json |
| **Lifecycle** | 초기화·실행·clean-state 인수인계 | 구조화된 세션 |

바로 쓰는 템플릿 4종도 함께 준다. `AGENTS.md`(운영 지시), `init.sh`(환경 검증), `feature_list.json`(기계 판독 scope 경계), `progress.md`(세션 연속성)이다. 부속으로 새 프로젝트에 harness를 스캐폴딩하는 `harness-creator` skill과 Node.js 없이 도는 `audit-harness.sh` 검증 도구가 딸려 있다.

## 방법론 및 학습 구조 (Methodology and Architecture)

6단계로 난이도가 오르고, 각 단계가 앞 단계 위에 얹힌다.

1. **Problem Recognition** — 역량-신뢰성 간극(capability-reliability gap) 이해
2. **Repository Architecture** — 에이전트가 읽기 좋게 코드베이스 구조화
3. **Session Continuity** — 여러 세션에 걸친 진행 상태 유지
4. **Feedback Mechanisms** — 런타임 교정과 scope 경계
5. **Self-Verification** — 에이전트가 자기 작업을 스스로 검증
6. **Complete Integration** — 전체 harness 시스템 통합

6개 프로젝트가 전부 같은 Electron 지식 베이스 앱을 다룬다. 앞 프로젝트의 결과물이 다음 프로젝트의 토대가 되고, harness 장치들이 어떻게 복리로 신뢰성을 쌓는지 한 앱 안에서 차곡차곡 드러난다.

## 결과와 성격 (Results)

정량 벤치마크를 파는 저장소가 아니라 교육 코스다. 대표 수치는 harness 유무의 효과를 보여주는 일화적 실험 하나뿐이고($9/20분/미작동 대 $200/6시간/플레이 가능), 나머지 학습 성과는 6개 프로젝트를 관통하며 검증 장치가 쌓이는 것으로 체감하도록 설계됐다. 명제의 근거가 외부(OpenAI·Anthropic) 연구에 있고 세부가 README가 아니라 VitePress 사이트에 있다는 점은 한계로 짚어둘 만하다.

## 관련 페이지 (Related Pages)

- [[agents/ai-boost-awesome-harness-engineering]] — harness를 primitive 단위로 큐레이션한 상위 인덱스. 이 코스는 그 분류의 "교육·실습" 슬롯을 채운다.
- [[agents/lee-hoyeon-2026-harness-engineering]] — Prompt → Context → Harness 진화 서사. 이 코스의 5축은 그 harness 단계를 실습으로 편 것.
- [[agents/kang-2026-no-longer-prompting-claude]] — Prompt → Context → Harness → Loop 4단계 카드. 같은 계보의 담론.
- [[agents/lin-2026-harness-updating-is-not-harness-benefit]] — "환경이 결과를 가른다"는 전제의 controlled 실증과 경계선.
- [[overviews/agent-harness-engineering-overview]] — 이 클러스터를 한 지도로 묶는 개괄.

## 소스 (Source Links)

- [원문 repo](https://github.com/walkinglabs/learn-harness-engineering) · [문서 사이트](https://walkinglabs.github.io/learn-harness-engineering/)
- 요약 source: `sources/walkinglabs-learn-harness-engineering.md`
