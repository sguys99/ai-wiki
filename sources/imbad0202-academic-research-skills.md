---
title: "Academic Research Skills (ARS) — Claude Code 학술 연구 파이프라인"
type: repo
year: 2026
category: agents
raw_path: raw/repos/imbad0202-academic-research-skills.md
raw_filename: "imbad0202-academic-research-skills.md"
source_collection: external
org: "Imbad0202"
repo: "academic-research-skills"
url: "https://github.com/Imbad0202/academic-research-skills"
license: "CC BY-NC 4.0"
tags: [claude-code, agent-skill, multi-agent, academic-writing, literature-review, peer-review, citation-verification, human-in-the-loop, repo, oss]
---

## 한 줄 요약 (One-line Summary)

Claude Code용 4개 스킬(Deep Research·Academic Paper·Academic Paper Reviewer·Academic Pipeline)로 연구→집필→리뷰→수정→최종본을 잇는 학술 논문 파이프라인. 인용 환각(citation hallucination)을 구조적 위험으로 규정하고 Stage 2.5/4.5 integrity gate와 claim-faithfulness audit으로 완전 자동화 대신 human-in-the-loop을 설계 원칙으로 못 박은 프로젝트다.

## 1. 자료 정보 (Document Information)

- **Org / Repo**: `Imbad0202/academic-research-skills` (약칭 ARS)
- **저자**: Cheng-I Wu (吳政宜)
- **버전**: v3.18.0 (2026-07-18 릴리스)
- **License**: CC BY-NC 4.0 (비영리·저작자표시, 상업적 이용 불가)
- **DOI**: 10.5281/zenodo.20696614
- **Stars**: 38,333 (2026-07-18 기준)
- **생성일**: 2026-02-26
- **Codex 자매판**: `Imbad0202/academic-research-skills-codex` — 동일 워크플로우를 Codex CLI용 단일 `$academic-research-suite` 스킬로 패키징
- **연관 프로젝트**: [Experiment Agent](https://github.com/Imbad0202/experiment-agent)(코드/human-study 실험 실행), [Teaching Skills](https://github.com/YujxZJCN/teaching-skills)(같은 아키텍처를 강의 설계에 이식)

## 2. 주요 기여 (Key Contributions)

1. 4-스킬 파이프라인: Deep Research(13-agent, 8모드) → Academic Paper(12-agent, 11모드) → Academic Paper Reviewer(7-agent, 6모드) → Academic Pipeline(10-stage orchestrator)이 하나의 논문 생산 흐름을 이룬다. 각 스킬은 독립적으로 쓰기도 하고 orchestrator로 묶어 하나로 연결하기도 한다.
2. Human-in-the-loop을 설계 철학으로 명문화: Lu et al.(2026, *Nature*)의 완전자율 AI Scientist가 남긴 실패 모드(구현 버그·환각 결과·shortcut 의존·bug-as-insight 재해석·방법론 조작·frame-lock·인용 환각) 목록을 근거로, "AI가 보강한 인간 연구자가 AI 단독보다 이 실패 모드들을 더 잘 피한다"는 전제를 README 서두에 건다. 매 스테이지 사용자 확인 체크포인트가 필수이며 integrity gate(Stage 2.5/4.5)는 건너뛸 수 없다.
3. 3단계 인용 무결성 인프라 (v3.7.3 → v3.8 → v3.11): Zhao et al.(2026-05, arXiv:2605.07723)이 2.5M편 논문의 111M개 참고문헌을 감사해 2025년 한 해만 146,932건의 환각 인용을 추정한 결과를 정면 인용하며 (i) 모든 인용에 3-layer locator anchor(quote/page/section/paragraph)를 붙이는 v3.7.3, (ii) opt-in `ARS_CLAIM_AUDIT=1`로 인용된 출처가 실제로 주장을 뒷받침하는지 감사하는 v3.8 claim-faithfulness audit, (iii) Semantic Scholar+OpenAlex+Crossref+arXiv 4개 색인을 교차 조회해 결정적으로 존재를 검증하는 v3.11 citation-existence gate를 순차로 쌓았다.
4. Devil's Advocate Concession Threshold Protocol (v3.0): 저자가 직접 겪은 세 가지 구조적 한계에서 나왔다. 검증 AI와 생성 AI가 같은 인지 프레임을 공유해 전제 자체는 못 건드리는 frame-lock, 반박에 대한 아부적 양보(sycophancy), 탐색 대화를 성급히 수렴시키는 Socratic Mentor의 의도 오판이 그 세 가지다. 이를 바탕으로 DA가 반박을 1-5점으로 채점해 4점 이상일 때만 양보를 허용하고 연속 양보는 금지하는 프로토콜을 도입했다.
5. Material Passport 스키마: 세션 간 연속성과 사용자-AI 협업 깊이를 delegation intensity·cognitive vigilance·cognitive reallocation·work zone 4개 축으로 추적하는 문서. Stage 1의 `experiment_intake_declaration`(실험 유무를 fail-closed로 명시), `experiment_provenance[]`(외부에서 실행한 실험의 근거 기록), `repro_lock`(재현성 lockfile, replay 보장이 아닌 구성 문서화) 등을 포함한다.
6. Model Tiering & Cross-Model Verification: opt-in `ARS_MODEL_TIERING` 스위치로 실행형 에이전트는 한 단계 낮은 모델(economy), 판단형 에이전트는 frontier 모델(quality-boost)로 배정한다. 별도 모델 계열 하나를 5석 리뷰 패널에 섞는 cross-model reviewer track과 owner→dispatcher→owner 간 blind checkpoint 전송을 위한 `[CROSS-MODEL-HANDOFF v1]` 정형 envelope(v3.17)도 갖췄다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

4개 스킬은 역할을 이렇게 나눠 맡는다.

- Deep Research (v2.11.0, 13-agent): full·quick·systematic-review(PRISMA)·socratic(가이드)·fact-check·lit-review·three-way-scan(WHY/HOW/WHAT 비교)·review 8모드. Socratic Mentor는 탐색적(exploratory) vs 목표지향적(goal-oriented) 의도를 대화 시작 시점과 3턴마다 재분류하고 5턴마다 동의 편향·충돌 회피·조기 수렴 3축을 자가 점검하는 Dialogue Health Indicator를 (사용자에게는 비공개로) 돌린다.
- Academic Paper (v3.2.0, 12-agent): full·plan(가이드)·outline-only·revision·revision-coach·abstract-only·lit-review·format-convert·citation-check·disclosure·rebuttal-audit 11모드. Style Calibration이 과거 글에서 문체를 학습하고 Writing Quality Check가 "AI가 쓴 것처럼 느껴지는" 패턴을 잡는다. 출력은 MD + (Pandoc 있으면) DOCX + LaTeX(APA 7.0 `apa7` 클래스/IEEE/Chicago) → tectonic으로 PDF.
- Academic Paper Reviewer (v1.10.0, 7-agent): EIC + 동적 리뷰어 3인 + Devil's Advocate 구성으로 0-100점 rubric 채점. 점수 매핑은 ≥80 Accept, 65-79 Minor Revision, 50-64 Major Revision, <50 Reject. full·re-review·quick·methodology-focus·guided·calibration 6모드가 있고 calibration 모드는 사용자가 제공한 gold set 대비 자체 FNR/FPR을 측정하는 opt-in 자기 검증이다.
- Academic Pipeline (v3.18.0, 10-stage orchestrator): Stage 1(RESEARCH)부터 Stage 6(Process Summary, 6차원 협업 품질 1-100점 평가)까지 연결하며 이미 초고가 있으면 Stage 2.5(integrity gate)로, 리뷰어 코멘트를 받았으면 Stage 4로 mid-entry할 수 있다. Stage 2.5/4.5 integrity gate는 PRISMA-trAIce + RAISE 기반 Compliance Agent(v3.4)가 담당하며 절대 건너뛸 수 없다. v3.5에서 추가된 Collaboration Depth Observer는 매 체크포인트마다 advisory로만 동작하고 MANDATORY gate에서는 의도적으로 제외된다(컴플라이언스 판정을 희석하지 않기 위해).

Stage 1 실험 provenance intake (#260): Stage 1에서 이번 실행이 실험 근거 주장을 포함할지 감지해 `experiment_intake_declaration`을 fail-closed로 설정한다. 외부에서 실험을 돌렸다면 `experiment_provenance[]`에 실험 하나당 항목(실험 ID, `repro_lock`, 계획 대비 실행, negative results, 알려진 한계)을 기록해 `experiments_generated`로, 아니면 `no_experiments_declared`로 표시한다. 실험을 전혀 다루지 않는 실행도 이 선언을 반드시 남겨야 하므로 provenance 블록 누락으로 게이트를 우회할 수 없다.

인용 검증 파이프라인: v3.9.0에서 Semantic Scholar 단일 색인 오염 탐지를 OpenAlex+Crossref 3색인 교차검증(advisory)으로 확장했고 v3.11.0에서 arXiv resolver를 더해 4개 색인 결정적 존재 검증 gate로 승격했다. `lookup_verified` 값은 `{true, false, unresolvable}` 셋 중 하나이며 `false`는 "ID로 정확히 조회했으나 실패"로 좁혀 인덱싱 안 된 인문학/비영어권 인용은 `unresolvable`로 남겨 차단하지 않는다(recall보다 precision을 우선하는 명시적 트레이드오프). SQLite 캐시(90일 TTL)를 두고 v3.18.0에서 캐시-스루에 나이 기반 staleness advisory + opt-in 실시간 재검증을 연결했다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- Showcase 파이프라인 실행 예시(`examples/showcase/`): Stage 2.5 integrity report에서는 실제 초고의 조작된 참고문헌 15건과 통계 오류 3건이 걸러졌고 Stage 4.5 최종 검사는 회귀 0건을 확인했다. 그러나 사후 공개 감사(post-publication audit)에서는 독립 전수 참고문헌 감사가 3라운드의 integrity check가 놓친 문제 21/68건을 추가로 찾아냈다. 시스템 스스로도 완벽하지 않다는 근거를 README가 굳이 남긴 셈이다.
- v2.7 stress test: 저자가 겪은 사례에서 DA(devil's advocate)와 생성 AI가 같은 인지 프레임을 공유할 때 31%의 인용 오류율이 관측됐다. 이것이 v3.0 Concession Threshold Protocol의 도입 근거다.
- v3.8 claim-faithfulness audit calibration: 20-tuple gold set 기준 FNR<0.15 + FPR<0.10을 acceptance threshold로 삼는다. ramp-on(기본 활성화 전환) 계획은 calibration 증거가 쌓인 뒤로 명시적으로 미뤄둔 상태(v3.8 spec §5).
- v3.9.4 temporal integrity audit: 5개 시간적 오류 유형(소급 산술·시대착오 인용·미구체화 비교대상·인과 역전·직시적 현재형)을 커버하는 결정적 advisory verifier의 커버리지 추정치는 baseline 55-70%, M7 minimal 적용 시 65-75%.
- v3.16.0 자연어 규칙 일반화: 연구질문(RQ) advisory가 20개 shell 표현 테이블에 갇혀 있던 것을 noun-swap test로 일반화해 held-out miss rate를 0.34-0.38에서 0.094로 낮췄고 false-fire는 0/16을 유지했다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 완전 자동화가 아니다: README가 명시적으로 "AI is your copilot, not the pilot"이라 못 박는다. research direction·methodology 선택·해석은 인간 몫으로 남겨둔 설계이며 이것이 한계이자 원칙이다.
- claim-faithfulness audit은 opt-in: `ARS_CLAIM_AUDIT=1`을 켜지 않으면 v3.8의 인용-주장 정합성 감사는 작동하지 않는다.
- 재현성은 구성 문서일 뿐: `repro_lock`은 "설정 문서화이지 replay 보장이 아니다"라고 README가 스스로 한계를 명시한다. LLM 출력은 byte-reproducible하지 않다.
- 인용 검증의 precision-recall 트레이드오프: `unresolvable` 분류로 인덱싱 안 된 문헌은 통과시키므로 색인 커버리지가 낮은 분야·언어에서는 검증 공백이 남는다.
- 사후 감사에서 드러난 잔여 오류: 위 §4의 21/68 사례처럼 3중 integrity gate를 거쳐도 독립 감사가 추가로 문제를 찾아낸 전례가 있다. gate 통과가 완전무결의 증명은 아니다.
- 다국어 지원의 비대칭성: Socratic mode와 Plan mode는 의도 기반 활성화로 모든 언어에서 동작하지만 스킬 활성화 여부를 결정하는 Trigger Keywords 섹션은 영어·번체중문 키워드 위주로만 채워져 있어 다른 언어에서는 활성화 신뢰도가 떨어진다(사용자가 `SKILL.md`에 직접 키워드 추가 필요).
- 버전 히스토리가 매우 촘촘함: v3.9.x대 후반부터 거의 매주 단위로 patch/hotfix가 나오는 릴리스 리듬이라 특정 기능의 "현재 상태"를 파악하려면 CHANGELOG를 세심히 추적해야 한다.

## 6. 관련 연구 (Related Work)

- Lu et al. (2026, *Nature* 651:914-919), *The AI Scientist* — 완전자율 AI 연구 시스템의 실패 모드 목록을 ARS의 human-in-the-loop 설계 근거로 인용
- Zhao et al. (2026-05, arXiv:2605.07723) — 111M 참고문헌 감사, 2025년 146,932건 환각 인용 추정. ARS v3.7.x 인용 무결성 인프라의 직접적 동기
- Ren et al. (2026, arXiv:2607.13104), *Self-Improvements in Modern Agentic Systems: A Survey* — discovery agent의 자기검증 한계와 human auditing의 실전적 안전장치 역할을 인용, ARS v3.18.0의 advisory quality layer 8종 설계 근거
- Song, Song, Pfister & Yoon (2026, arXiv:2604.05018), *PaperOrchestra* (Google) — Semantic Scholar API 검증·anti-leakage protocol·VLM figure verification·score trajectory tracking이 ARS v3.3의 직접 영감
- Kong et al. (2026, arXiv:2605.18661) — auto-research 기능 트랙(experiment provenance, figure fidelity gate, cross-paper contradiction inventory)의 근거 논문, v3.12.0에 반영
- Wang & Zhang (2026, IJETHE 23:11) — Collaboration Depth Observer(협업 깊이 관찰자) 설계의 근거

## 7. 용어집 (Glossary)

- **ARS**: Academic Research Skills, 이 저장소의 약칭
- **Material Passport**: 세션 간 연속성과 사용자-AI 협업 깊이(delegation intensity·cognitive vigilance·cognitive reallocation·work zone)를 추적하는 문서 스키마
- **Integrity Gate (Stage 2.5 / 4.5)**: 파이프라인에서 건너뛸 수 없는 무결성 검증 체크포인트. Compliance Agent가 PRISMA-trAIce + RAISE 기준으로 실행
- **Frame-lock**: 검증 AI와 생성 AI가 동일한 인지 프레임을 공유해, 전제 자체가 아니라 그 안의 논거만 공격하게 되는 구조적 한계
- **Concession Threshold Protocol**: Devil's Advocate가 반박을 1-5점 채점해 4점 이상일 때만 양보를 허용하는 anti-sycophancy 장치
- **L3 (Claim-Faithfulness Gap)**: 인용이 존재는 하지만 실제로 주장을 뒷받침하는지는 검증되지 않는 격차. ARS 내부 용어(원 논문 용어 아님)
- **Locator Anchor (Three-Layer Citation)**: 모든 인용에 붙는 quote/page/section/paragraph 중 하나의 앵커. claim-faithfulness audit이 원문을 다시 조회할 수 있게 함
- **Experiment Provenance Intake**: ARS가 직접 실험을 실행하지 않는 대신, 사용자가 외부에서 실행한 실험의 근거를 Stage 1에서 fail-closed로 선언하게 하는 장치
- **Devil's Advocate (DA)**: Academic Paper Reviewer와 Deep Research에 공통으로 존재하는, 반대 입장에서 공격하는 리뷰 에이전트
- **repro_lock**: Material Passport의 선택적 재현성 lockfile. "구성 문서화이지 replay 보장이 아님"이라고 명시됨
