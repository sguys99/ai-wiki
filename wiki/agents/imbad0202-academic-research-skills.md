---
title: "Academic Research Skills (ARS) — Claude Code 학술 연구 파이프라인"
type: repo
year: 2026
category: agents
raw_path: raw/repos/imbad0202-academic-research-skills.md
raw_filename: "imbad0202-academic-research-skills.md"
source_collection: external
source: imbad0202-academic-research-skills.md
org: "Imbad0202"
repo: "academic-research-skills"
url: "https://github.com/Imbad0202/academic-research-skills"
license: "CC BY-NC 4.0"
tags: [claude-code, agent-skill, multi-agent, academic-writing, literature-review, peer-review, citation-verification, human-in-the-loop, repo, oss]
---

## 요약 (Summary)

Claude Code용 4개 스킬(Deep Research·Academic Paper·Academic Paper Reviewer·Academic Pipeline)로 연구부터 집필·리뷰·수정·최종본까지 잇는 학술 논문 파이프라인이다. 인용 환각(citation hallucination)을 시스템의 근본 위험으로 규정하고 Stage 2.5/4.5 integrity gate와 claim-faithfulness audit을 두어 완전 자동화 대신 human-in-the-loop을 설계 원칙으로 못 박았다. 38,333 stars(2026-07-18 기준), CC BY-NC 4.0.

## 주요 기여 (Key Contributions)

네 스킬이 하나의 논문 생산 흐름을 이룬다. Deep Research(13-agent, 8모드)에서 시작해 Academic Paper(12-agent, 11모드), Academic Paper Reviewer(7-agent, 6모드)를 거쳐 Academic Pipeline(10-stage orchestrator)으로 이어진다. 각 스킬은 독립적으로 쓰기도 하고 orchestrator로 묶어 연결하기도 한다.

이 파이프라인은 human-in-the-loop을 원칙으로 못 박는다. Lu et al.(2026, *Nature*)의 완전자율 AI Scientist가 남긴 실패 모드(구현 버그·환각 결과·shortcut 의존·frame-lock·인용 환각 등)를 근거로 삼아 "AI가 보강한 인간 연구자가 AI 단독보다 이 실패 모드들을 더 잘 피한다"는 전제를 README 서두에 건다. 매 스테이지 사용자 확인 체크포인트가 필수이고 integrity gate(Stage 2.5/4.5)는 건너뛸 수 없다.

인용 무결성 인프라는 세 단계(v3.7.3 → v3.8 → v3.11)에 걸쳐 쌓였다. 출발점은 Zhao et al.(2026-05, arXiv:2605.07723)의 감사 결과다. 2.5M편 논문의 111M개 참고문헌을 훑어 2025년 한 해에만 146,932건의 환각 인용을 추정했다. 이를 근거로 v3.7.3은 모든 인용에 3-layer locator anchor(quote/page/section/paragraph)를 붙인다. v3.8 claim-faithfulness audit은 opt-in `ARS_CLAIM_AUDIT=1`로 인용된 출처가 실제 주장을 뒷받침하는지 감사한다. v3.11 citation-existence gate는 Semantic Scholar+OpenAlex+Crossref+arXiv 4개 색인을 교차 조회해 존재 자체를 결정적으로 검증한다.

Devil's Advocate Concession Threshold Protocol(v3.0)은 저자가 직접 겪은 세 가지 한계에서 나온 장치다. 검증 AI와 생성 AI가 같은 인지 프레임을 공유해 전제 자체는 못 건드리는 frame-lock, 반박에 비위 맞추듯 물러서는 양보(sycophancy), 탐색 대화를 성급히 수렴시키는 Socratic Mentor의 의도 오판이 그것이다. DA는 반박을 1-5점으로 채점해 4점 이상일 때만 양보를 허용하고 연속 양보는 금지한다.

Material Passport 스키마는 세션 간 연속성과 사용자-AI 협업 깊이를 delegation intensity·cognitive vigilance·cognitive reallocation·work zone 4개 축으로 추적한다. Stage 1에서는 `experiment_intake_declaration`(실험 유무를 fail-closed로 명시), `experiment_provenance[]`(외부 실행 실험의 근거 기록), `repro_lock`(재현성 lockfile, replay 보장이 아닌 구성 문서화)을 담는다.

## 방법론 및 아키텍처 (Methodology and Architecture)

4개 스킬은 역할을 이렇게 나눠 맡는다.

- **Deep Research** (v2.11.0, 13-agent): full·quick·systematic-review(PRISMA)·socratic(가이드)·fact-check·lit-review·three-way-scan(WHY/HOW/WHAT 비교)·review 8모드. Socratic Mentor는 탐색적 vs 목표지향적 의도를 3턴마다 재분류하고 5턴마다 동의 편향·충돌 회피·조기 수렴을 자가 점검하는 Dialogue Health Indicator를 사용자에게 비공개로 돌린다.
- **Academic Paper** (v3.2.0, 12-agent): full·plan(가이드)·outline-only·revision·revision-coach·abstract-only·lit-review·format-convert·citation-check·disclosure·rebuttal-audit 11모드. Style Calibration이 과거 글에서 문체를 학습하고 Writing Quality Check가 "AI가 쓴 것처럼 느껴지는" 패턴을 잡는다. 출력은 MD + (Pandoc 있으면) DOCX + LaTeX(APA 7.0/IEEE/Chicago) → tectonic으로 PDF.
- **Academic Paper Reviewer** (v1.10.0, 7-agent): EIC + 동적 리뷰어 3인 + Devil's Advocate 구성으로 0-100점 rubric 채점. 점수 매핑은 ≥80 Accept, 65-79 Minor Revision, 50-64 Major Revision, <50 Reject.
- **Academic Pipeline** (v3.18.0, 10-stage orchestrator): Stage 1(RESEARCH)부터 Stage 6(Process Summary, 6차원 협업 품질 평가)까지 연결한다. 이미 초고가 있으면 Stage 2.5로, 리뷰어 코멘트를 받았으면 Stage 4로 mid-entry할 수 있다. Stage 2.5/4.5 integrity gate는 PRISMA-trAIce + RAISE 기반 Compliance Agent(v3.4)가 담당하며 절대 건너뛸 수 없다.

인용 검증 파이프라인은 v3.9.0에서 Semantic Scholar 단일 색인 오염 탐지를 OpenAlex+Crossref 3색인 교차검증으로 확장했고 v3.11.0에서 arXiv resolver를 더해 4개 색인 결정적 존재 검증 gate로 승격했다. `lookup_verified`는 `true`, `false`, `unresolvable` 세 값 중 하나다. 이 가운데 `false`는 "ID로 정확히 조회했으나 실패"로 좁혀 인덱싱 안 된 인문학·비영어권 인용은 `unresolvable`로 남겨 차단하지 않는다. recall보다 precision을 우선하겠다고 분명히 밝힌 트레이드오프다.

## 결과 (Results)

Showcase 파이프라인 실행 예시(`examples/showcase/`)에서 Stage 2.5 integrity report는 실제 초고의 조작된 참고문헌 15건과 통계 오류 3건을 걸러냈고 Stage 4.5 최종 검사는 회귀 0건을 확인했다. 그런데 사후 공개 감사(post-publication audit)에서는 독립 전수 참고문헌 감사가 3라운드의 integrity check가 놓친 문제 21/68건을 추가로 찾아냈다. 시스템 스스로도 완벽하지 않다는 근거를 README가 굳이 남긴 셈이다.

v2.7 stress test에서는 DA와 생성 AI가 같은 인지 프레임을 공유할 때 31%의 인용 오류율이 관측됐고 이것이 v3.0 Concession Threshold Protocol의 도입 근거가 됐다. v3.8 claim-faithfulness audit calibration은 20-tuple gold set 기준 FNR<0.15 + FPR<0.10을 acceptance threshold로 삼는다. v3.16.0에서는 연구질문(RQ) advisory를 20개 shell 표현 테이블에서 noun-swap test로 일반화해 held-out miss rate를 0.34-0.38에서 0.094로 낮췄고 false-fire는 0/16을 유지했다.

## 한계 (Limitations)

완전 자동화는 이 시스템의 목표가 아니다. README는 "AI is your copilot, not the pilot"이라고 못 박고 research direction·methodology 선택·해석은 인간 몫으로 남긴다. 이것은 한계이자 동시에 설계 원칙이다. claim-faithfulness audit도 opt-in이어서 `ARS_CLAIM_AUDIT=1`을 켜지 않으면 v3.8의 인용-주장 정합성 감사는 작동하지 않는다. 재현성 역시 보장이 아니라 문서화 수준에 그친다. README는 `repro_lock`을 두고 "설정 문서화이지 replay 보장이 아니다"라고 스스로 밝힌다. LLM 출력은 애초에 byte-reproducible하지 않기 때문이다.

나머지 한계는 검증과 언어 커버리지 쪽이다.

- 인용 검증에는 precision-recall 트레이드오프가 있다. `unresolvable` 분류로 인덱싱 안 된 문헌은 통과시키므로 색인 커버리지가 낮은 분야·언어에서는 검증 공백이 남는다.
- 3중 integrity gate를 거쳐도 잔여 오류가 나올 수 있다. 위 §결과의 21/68 사례처럼 사후 독립 감사가 추가로 문제를 찾아낸 전례가 있어 gate 통과가 완전무결의 증명은 아니다.
- 다국어 지원은 비대칭적이다. Socratic mode와 Plan mode는 의도 기반 활성화라 모든 언어에서 동작하지만 스킬 활성화 여부를 결정하는 Trigger Keywords 섹션은 영어·번체중문 위주여서 다른 언어에서는 활성화 신뢰도가 떨어진다.

## 관련 페이지 (Related Pages)

- [[agents/stanford-oval-storm]] — 인터넷 검색만으로 Wikipedia 스타일 글을 처음부터 쓰는 Stanford OVAL 시스템. multi-agent 학술 리서치 자동화라는 문제의식은 겹치지만 접근이 갈린다. ARS가 human-in-the-loop integrity gate를 핵심 설계로 두는 반면 STORM은 다관점 시뮬레이션 대화로 pre-writing 자체를 자동화한다
- [[agents/cemri-2025-why-do-multi-agent-llm-systems]] — 7개 SOTA Multi-Agent LLM System의 실패 모드를 분류한 MAST 연구. ARS의 frame-lock·sycophancy 문제의식과 겹치는 실패 유형 분류체계
- [[agents/microsoft-skillopt]] — skill 문서를 학습 가능한 상태로 다루는 SkillOpt. ARS의 스킬 기반 아키텍처와 마찬가지로 Claude Code skill을 프로덕션 단위로 취급하지만 최적화 방식은 다르다
