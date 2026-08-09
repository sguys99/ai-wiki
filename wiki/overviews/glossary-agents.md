---
title: "용어집 — Agents (Terminology Glossary)"
type: overview
year: 2026
category: overviews
source_collection: synthesis
glossary_domain: agents
applies_to: [agents, applications, evaluations, overviews, etc]
tags: [glossary, terminology, agents, synthesis]
---

## 표기 원칙 (Conventions)

agents 도메인(agentic 시스템·tool use·harness·loop engineering) 전문 용어의 canonical 표기 SSOT다. 공통 원칙은 [[overviews/glossary-physical-ai]]의 표기 원칙 절과 같다 — 원어 유지 + 문서당 첫 등장 시 서술형 한글 풀이 한 문장, 원어에 조사 직결, 금지 표기는 `·` 구분 리터럴 검사, `—`는 지침만.

이 도메인은 음차가 이미 넓게 정착해 있다(프롬프트 69회·컨텍스트 73회·메모리 33회 등). 정착한 음차는 음차를 canonical로 삼고, 개념어는 원어를 유지한다.

## 용어 표 (Term Table)

| 원어 | canonical 표기 | 금지 표기 | 첫 등장 풀이 예문 | 비고 |
|---|---|---|---|---|
| tool use | tool use | 도구 사용 | tool use는 모델이 외부 도구를 호출해 행동 범위를 넓히는 능력이다 | |
| function calling | function calling | — | function calling은 모델이 구조화된 인자로 함수를 호출하게 하는 인터페이스다 | "함수 호출"은 일반 프로그래밍 의미와 겹쳐 지침만 |
| planning | planning | — | planning은 목표를 하위 단계로 쪼개 실행 순서를 정하는 과정이다 | "계획"은 일반어라 지침만 — 기법 명칭 문맥에서는 원어 권장 |
| policy | policy | 메모리 정책·기억 정책·정책 네트워크 | RL 문맥의 policy는 observation을 받아 action을 정하는 함수다 | agents 도메인은 일반 의미 "정책"(운영 정책 등)이 많아 RL 복합어만 금지 |
| memory | 메모리 | — | — | 음차 정착(33회). "장기 기억" 같은 인지과학 서술은 허용하되 시스템 구성 요소는 메모리. "기억 정책"은 policy 행 |
| episodic memory | episodic memory | 일화 기억 | episodic memory는 개별 경험 단위로 저장되는 메모리 층이다 | procedural·semantic memory도 원어 |
| orchestration | 오케스트레이션 | — | 오케스트레이션은 여러 에이전트·도구의 실행을 조율하는 층이다 | 음차 정착 |
| handoff | handoff | — | handoff는 한 에이전트가 작업을 다른 에이전트로 넘기는 전환점이다 | "인계"는 일반어라 지침만 |
| guardrail | 가드레일 | — | 가드레일은 에이전트의 행동 범위를 제한하는 안전 장치다 | 음차 정착 |
| prompt | 프롬프트 | — | — | 음차 정착(69회) |
| context | 컨텍스트 | — | — | 음차 정착(73회). "맥락"은 일반 서술에서 허용 |
| context engineering | context engineering | 컨텍스트 엔지니어링 공학 | context engineering은 유한한 attention budget에 넣을 토큰을 고르는 설계다 | 고유 기법명이라 원어 |
| harness | harness | — | harness는 모델을 감싸 도구·검증·상태를 제공하는 실행 환경이다 | "마구" 비유 인용은 그대로 두고 lint-ignore |
| agent loop | agent loop | — | agent loop는 모델 호출→도구 실행→관찰을 반복하는 기본 순환이다 | |
| workflow | 워크플로 | 워크플로우 | — | 표기 흔들림(워크플로 150 vs 워크플로우 114)을 워크플로로 고정 |
| sub-agent | 서브에이전트 | 하위 에이전트 | 서브에이전트는 상위 에이전트가 위임한 작업을 격리된 컨텍스트에서 수행한다 | |
| multi-agent | 멀티에이전트 | — | — | "다중 에이전트"는 지침만 |
| chain-of-thought | chain-of-thought | 사고 사슬·생각의 사슬 | chain-of-thought는 답 전에 중간 추론을 텍스트로 펼치게 하는 기법이다 | 약어 CoT 병용 가능 |
| reasoning | 추론 | 리즈닝 | — | 표준 번역 정착 |
| retrieval | retrieval | — | retrieval은 외부 지식에서 관련 정보를 찾아오는 단계다 | RAG 문맥의 "검색"은 허용 (지침) |
| grounding | grounding | 접지 | grounding은 모델 출력을 외부 근거나 물리 세계에 붙들어 매는 것이다 | |
| hallucination | 환각 | 할루시네이션 | — | 표준 번역 정착(29회). CLAUDE.md 관례와 일치 |
| scaffold | scaffold | 발판 구조 | scaffold는 모델 주위에 짜 놓은 보조 실행 구조를 뜻한다 | |
| skill | 스킬 | — | 스킬은 특정 작업 절차를 담아 에이전트에 얹는 지침 패키지다 | 음차 정착. 파일명·포맷명(Agent Skills)은 원어 그대로 |
| hook | 훅 | — | 훅은 특정 이벤트 시점에 끼어들어 실행되는 사용자 정의 코드다 | 음차 정착 |
| verification | verification | — | verification은 에이전트 산출물을 자동으로 검사하는 단계다 | "검증"은 표준 번역이라 병용 허용 (지침) |
| delegation | delegation | — | delegation은 작업을 서브에이전트에 맡기는 패턴이다 | "위임"은 병용 허용 (지침) |
| progressive disclosure | progressive disclosure | 점진적 공개 | progressive disclosure는 필요한 시점에만 정보를 단계적으로 노출하는 설계다 | |
| trajectory | trajectory | — | agent 문맥의 trajectory는 세션 하나의 실행 기록 전체다 | physical-ai 용어집과 달리 이 도메인은 일반어 "궤적"(진화 궤적 등)이 있어 지침만 |
| loop engineering | loop engineering | 루프 엔지니어링 공학 | loop engineering은 에이전트를 도는 루프 자체를 설계 대상으로 삼는 관점이다 | 고유 기법명 |

## 신규 용어 추가 절차 (Growth Loop)

[[overviews/glossary-physical-ai]]의 동일 절차를 따른다 — 본문은 원어 + 풀이로 즉시 작성, Step 3.5에서 추가 후보 보고, 승인 후 표에 행 추가.

## 관련 페이지 (Related Pages)

- [[overviews/glossary-llms]] — 모델 학습 일반 용어. agents 페이지에도 함께 적용된다
- [[overviews/glossary-physical-ai]] — physical-ai 도메인 용어
