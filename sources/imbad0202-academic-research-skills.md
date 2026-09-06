---
title: "Academic Research Skills (ARS): Claude Code 학술 연구 파이프라인"
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

Claude Code용 스킬 4종(Deep Research, Academic Paper, Academic Paper Reviewer, Academic Pipeline)으로 연구부터 집필, 리뷰, 수정, 최종본까지 잇는 학술 논문 파이프라인이다. 환각 인용(citation hallucination)을 구조적 위험으로 규정하고 Stage 2.5와 Stage 4.5의 integrity gate, claim-faithfulness audit을 두어 완전 자동화 대신 human-in-the-loop을 설계 원칙으로 고정했다.

## 1. 자료 정보 (Document Information)

- **Org / Repo**: `Imbad0202/academic-research-skills` (약칭 ARS)
- **저자**: Cheng-I Wu (吳政宜), 단독 maintainer
- **스위트 버전**: v3.18.0 (2026-07-18 릴리스). README 기준 최신 항목이다
- **License**: CC BY-NC 4.0. 공유와 변형이 허용되지만 상업적 이용은 금지되고, 저작자 표시는 "Based on Academic Research Skills by Cheng-I Wu" 형식을 요구한다
- **DOI**: 10.5281/zenodo.20696614
- **README 언어판**: 영어 원본에 더해 간체중문, 번체중문, 일본어, 한국어판이 있다. 한국어판은 기여자 devCharlotte가 PR #469로 번역했다

스위트 버전과 개별 스킬 버전은 따로 움직인다. `academic-pipeline`이 스위트 버전을 대표하고 나머지 셋은 변경이 있을 때만 올라간다.

| 스킬 | 버전 | 에이전트 수 | 모드 수 |
|---|---|---|---|
| Deep Research | v2.11.0 | 13 | 8 |
| Academic Paper | v3.2.0 | 12 | 11 |
| Academic Paper Reviewer | v1.10.0 | 7 | 6 |
| Academic Pipeline | v3.18.0 | 10-stage orchestrator | mid-entry 3종 |

v3.12.1에서 `three-way-scan`과 `rebuttal-audit` 두 모드가 추가되며 스위트 전체 모드 수가 25개에서 27개로 늘었다. 스킬 개수는 4개 그대로다.

**연관 프로젝트**

| 프로젝트 | 관계 |
|---|---|
| `Imbad0202/academic-research-skills-codex` | 동일 워크플로를 Codex CLI용 단일 `$academic-research-suite` 스킬로 패키징한 자매 배포판 |
| `Imbad0202/experiment-agent` | Stage 1과 Stage 2 사이의 실험 실행 구간을 메우는 동반 스킬. 코드 실험 실행, IRB 윤리 체크리스트 기반 human study 관리, 11종 통계 오류 탐지를 담당한다 |
| `YujxZJCN/teaching-skills` | 같은 아키텍처를 강의 설계로 이식한 프로젝트. `sotl` 모드가 교실 탐구 과제를 ARS로 넘긴다 |

## 2. 주요 기여 (Key Contributions)

1. **스킬 4종 파이프라인**: Deep Research에서 시작해 Academic Paper, Academic Paper Reviewer를 거쳐 Academic Pipeline orchestrator로 이어지는 논문 생산 흐름을 하나로 묶었다. 각 스킬은 독립적으로 쓸 수도 있고 orchestrator로 연결할 수도 있다.
2. **Human-in-the-loop의 설계 원칙 명문화**: Lu et al.(2026, *Nature*)의 완전자율 AI Scientist가 남긴 실패 모드 목록을 근거로, "AI가 보강한 인간 연구자가 AI 단독보다 이 실패 모드들을 더 잘 피한다"는 전제를 README 서두에 건다. 매 스테이지 사용자 확인 체크포인트가 필수이고 integrity gate는 건너뛸 수 없다.
3. **3단계 인용 무결성 인프라**: v3.7.3의 3-layer locator anchor, v3.8의 claim-faithfulness audit, v3.11의 4개 색인 citation-existence gate를 순차로 쌓았다. Zhao et al.(2026-05)의 코퍼스 규모 감사 결과가 직접 동기다.
4. **Devil's Advocate Concession Threshold Protocol (v3.0)**: 저자가 직접 겪은 frame-lock, sycophancy, 의도 오판 세 가지 한계에서 나왔다. DA가 반박을 1점에서 5점으로 채점해 4점 이상일 때만 양보를 허용하고 연속 양보를 금지한다.
5. **Anti-Context-Rot 장치 (v3.1)**: 스킬 4종에 걸쳐 anti-pattern 29개를 "왜 실패하는가"와 "올바른 행동" 열을 갖춘 표로 명시하고, 긴 대화에서도 깨지면 안 되는 규칙에 IRON RULE 표식 22개를 달았다. SKILL.md 총량은 142KB에서 85KB로 40% 줄이고 상세 프로토콜을 `references/`로 뺐다.
6. **Model Tiering과 Cross-Model Verification**: opt-in `ARS_MODEL_TIERING` 스위치가 실행형 에이전트 13개를 세션 모델보다 한 단계 낮은 등급(economy, 하한은 Opus 계열)으로 내리고, integrity gate와 최종 리뷰의 판단형 에이전트를 frontier 등급(quality-boost)으로 올린다. 스위치를 켜지 않으면 이전 동작과 바이트 단위로 동일하다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 스킬별 역할

- **Deep Research (v2.11.0, 13-agent)**: full, quick, systematic-review(PRISMA), socratic(가이드), fact-check, lit-review, three-way-scan(WHY/HOW/WHAT 비교), review 8개 모드. Socratic Mentor는 대화 시작 시점과 3턴마다 사용자 의도를 exploratory와 goal-oriented로 재분류한다. exploratory로 판정되면 자동 수렴을 끄고 최대 라운드를 60으로 올리며 "요약해 드릴까요" 류의 마무리 유도를 금지한다. 5턴마다 지속적 동의, 충돌 회피, 조기 수렴 세 가지를 자가 점검하는 Dialogue Health Indicator가 함께 실행되며, 사용자가 이를 역이용하지 못하도록 화면에는 노출하지 않고 로그로만 남긴다.
- **Academic Paper (v3.2.0, 12-agent)**: full, plan(가이드), outline-only, revision, revision-coach, abstract-only, lit-review, format-convert, citation-check, disclosure, rebuttal-audit 11개 모드. Style Calibration이 사용자의 과거 글에서 문체를 학습하고 Writing Quality Check가 기계가 쓴 듯한 문장 패턴을 잡는다. 출력은 Markdown이 기본이고 Pandoc이 있으면 DOCX, LaTeX(APA 7.0 `apa7` 클래스, IEEE, Chicago)를 거쳐 tectonic으로 PDF까지 낸다.
- **Academic Paper Reviewer (v1.10.0, 7-agent)**: EIC와 동적 리뷰어 3인, Devil's Advocate로 구성된 패널이 0점에서 100점 rubric으로 채점한다. full, re-review, quick, methodology-focus, guided, calibration 6개 모드가 있다. v3.1에서 read-only 제약이 걸려 리뷰어는 원고를 수정할 수 없다.
- **Academic Pipeline (v3.18.0, 10-stage orchestrator)**: Stage 1(RESEARCH)부터 Stage 6(Process Summary)까지 연결한다. 파이프라인은 v2.4에서 9단계에서 10단계로 늘었다. R&R Traceability Matrix(Schema 11)가 저자의 수정 주장을 독립적으로 검증한다.

### 리뷰 판정 매핑

| 점수 구간 | 판정 |
|---|---|
| 80점 이상 | Accept |
| 65점에서 79점 | Minor Revision |
| 50점에서 64점 | Major Revision |
| 50점 미만 | Reject |

calibration 모드는 사용자가 제공한 gold set 대비 자체 FNR과 FPR을 측정하는 opt-in 자기 검증이다. v3.2에서 도입될 때 5회 앙상블과 cross-model 기본 활성화, 세션 범위 신뢰도 고지가 함께 붙었다.

### 파이프라인 진입점과 게이트

| 진입 상황 | 시작 지점 |
|---|---|
| 처음부터 논문을 쓴다 | Stage 1 full pipeline |
| 이미 초고가 있다 | Stage 2.5 mid-entry (무결성 검사 우선) |
| 리뷰어 코멘트를 받았다 | Stage 4 mid-entry |

Stage 2.5와 Stage 4.5의 integrity gate는 PRISMA-trAIce와 RAISE 기준의 Compliance Agent(v3.4)가 담당하며 건너뛸 수 없다. v3.5에서 추가된 Collaboration Depth Observer(`collaboration_depth_agent`)는 FULL과 SLIM 체크포인트마다 advisory로만 동작하고, 컴플라이언스 판정이 희석되지 않도록 MANDATORY gate에서는 의도적으로 제외된다. 이 관찰자가 쓰는 rubric v1.0의 평가 항목은 Delegation Intensity, Cognitive Vigilance, Cognitive Reallocation, Zone Classification(Zone 1에서 Zone 3) 네 가지이며, Wang과 Zhang(2026, IJETHE 23:11)이 근거다. `ARS_CROSS_MODEL`이 설정되면 관찰자는 두 모델에서 함께 실행되고 항목 점수 차가 2점을 넘으면 평균으로 뭉개지 않고 불일치로 보고한다.

파이프라인 종료 지점인 Stage 6은 논문 작성 과정 기록을 자동 생성하고, Collaboration Quality Evaluation으로 Direction Setting, Intellectual Contribution, Quality Gatekeeping, Iteration Discipline, Delegation Efficiency, Meta-Learning 여섯 항목을 1점에서 100점으로 채점한다.

### Stage 1 실험 provenance intake (#260)

ARS는 실험을 직접 실행하지 않는다. 대신 Stage 1에서 이번 실행이 실험 근거 주장을 포함할지 감지해 `experiment_intake_declaration`을 fail-closed로 설정한다. 외부에서 실험을 실행했다면 실험 하나당 `experiment_provenance[]` 항목 하나를 기록하며, 항목은 `experiment_id`, 중첩된 `repro_lock`, `planned_vs_executed[]`, `negative_results[]`, `known_limitations[]`으로 구성된다.

integrity gate는 실험 근거 주장마다 선언된 provenance와 대조해 ALIGNED, OVERSTATED, NOT_SUPPORTED_BY_PROVENANCE, PROVENANCE_INSUFFICIENT 중 하나로 판정한다. 실험 자체가 옳았는지는 판정 대상이 아니다. 실험을 전혀 다루지 않는 실행도 `no_experiments_declared`를 반드시 남겨야 하므로 provenance 블록 누락으로 게이트를 우회할 수 없다.

### 인용 검증 파이프라인

| 버전 | 추가된 것 |
|---|---|
| v3.3 | Semantic Scholar API를 Tier 0 존재 검사로 도입. Levenshtein 유사도 0.70 이상 제목 매칭, DOI 불일치 탐지, S2 ID 기반 중복 제거 |
| v3.7.3 | 모든 인용에 3-layer locator anchor(quote, page, section, paragraph)를 붙이는 locator 인프라 |
| v3.8 | opt-in `ARS_CLAIM_AUDIT=1` claim-faithfulness audit. 앵커로 원문을 다시 가져와 주장이 실제로 뒷받침되는지 판정 |
| v3.9.0 | Semantic Scholar 단일 색인 오염 탐지를 OpenAlex와 Crossref를 더한 3색인 교차검증(advisory)으로 확장 |
| v3.11.0 | arXiv resolver를 더해 4개 색인 결정적 존재 검증 gate로 승격 |
| v3.18.0 | 캐시 스루에 나이 기반 staleness advisory와 opt-in 실시간 재검증 연결 |

v3.8이 도입한 HIGH-WARN 판정은 claim-not-supported, negative-constraint-violation, fabricated-reference, anchorless, constraint-violation-uncited 다섯 가지이며, formatter 종단 hard gate에서 출력을 거부한다.

v3.11의 `lookup_verified` 값은 `true`, `false`, `unresolvable` 셋 중 하나다. `false`는 "DOI나 arXiv ID로 정확히 조회했는데 확실히 실패한 경우"로 좁혀 두어, 색인되지 않은 인문학이나 비영어권 인용은 `unresolvable`로 남고 차단되지 않는다. recall보다 precision을 우선한 명시적 트레이드오프다. 다만 `false` 행이 실제로 파이프라인을 멈추는 것은 사용자가 `terminal_policies.citation_existence`를 `strict`로 설정했을 때뿐이며, 기본 동작은 advisory이고 `/ars-mark-read`로 확인 처리할 수 있다. 검증 결과는 `~/.cache/ars/verification.db` SQLite 캐시에 90일 TTL로 보관되고 `/ars-cache-invalidate`로 비운다.

### 설치와 실행 환경

v3.7.0부터 플러그인 한 줄 설치를 지원한다. `/plugin marketplace add Imbad0202/academic-research-skills` 다음에 `/plugin install academic-research-skills`를 실행하면 Claude Code CLI, VS Code, JetBrains에서 동작한다. 기존의 `git clone` 후 `~/.claude/skills/`로 symlink하는 방식도 계속 유효하며 두 경로 모두 1급으로 취급된다. `docs/SETUP.md`는 플러그인, 프로젝트 스킬, 전역 스킬, claude.ai 프로젝트, repo clone, Claude Science import까지 설치 방법 6가지를 다룬다.

| 요구 사항 | 필수 여부 | 용도 |
|---|---|---|
| Claude Code 최신 버전 | 필수 | 플러그인 패키징이 최신 버전을 요구한다 |
| `ANTHROPIC_API_KEY` | 필수 | 환경 변수로 내보내거나 첫 실행 시 설정 |
| Pandoc | 선택 | DOCX 출력 |
| tectonic + Source Han Serif TC | 선택 | APA 7.0 PDF 출력 |
| 실제 Python 인터프리터 | 선택 | `PreToolUse` write-scope guard와 일부 opt-in 기능 |

핵심 스킬 3종(연구, 집필, 리뷰)은 프롬프트로만 동작하므로 Python이 필요 없다. Python이 없으면 guard는 조용히 비활성화되고 핵심 스킬은 영향을 받지 않는다. Windows에서는 `python3`가 실제 인터프리터가 아니라 Microsoft Store 자리표시자인 경우가 많고, guard 실행기가 POSIX 셸 스크립트라 Git Bash가 필요하다. Git Bash가 없으면 Claude Code가 PowerShell로 폴백해 `.sh` 실행기를 아예 실행하지 못하고, guard는 비활성 상태로 호출마다 오류를 로그에 남긴다. README는 이를 감수한 저하로 명시한다.

플러그인 설치 시 `commands/ars-*.md`의 슬래시 커맨드 10개와 플러그인 에이전트 3개가 함께 들어온다. 모델 라우팅은 커맨드 frontmatter에 고정돼 `full`과 `revision-coach`는 opus, 나머지 8개는 sonnet이며 프로젝트 정책상 Haiku는 쓰지 않는다.

### 지원 범위

| 구분 | 목록 |
|---|---|
| 언어 | 번체중문(중국어 입력 시 기본), 영어(영어 입력 시 기본), 학술 논문용 중영 이중 초록 |
| 인용 형식 | APA 7.0(기본, 중국어 인용 규칙 포함), Chicago(Notes와 Author-Date), MLA, IEEE, Vancouver |
| 논문 구조 | IMRaD, 주제별 문헌 리뷰, 이론 분석, 사례 연구, 정책 브리프, 학회 논문 |

메타데이터 규약도 두 가지 있다. v3.3.2부터 모든 스킬이 `data_access_level`을 `raw`, `redacted`, `verified_only` 중 하나로 선언하고 `scripts/check_data_access_level.py`가 강제한다. 같은 버전에서 `task_type`도 `open-ended`와 `outcome-gradable` 중 하나로 선언하게 했으며 현재 ARS 스킬은 모두 `open-ended`다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

| 항목 | 수치 | 출처 버전 |
|---|---|---|
| Stage 2.5 integrity report | 조작된 참고문헌 15건, 통계 오류 3건 검출 | showcase 실행 예시 |
| Stage 4.5 최종 검사 | 회귀 0건 | showcase 실행 예시 |
| 사후 공개 감사 | 3라운드 integrity check가 놓친 문제 21건을 68건 중에서 추가 검출(오류율 31%) | v2.7 |
| claim-faithfulness audit calibration | 20-tuple gold set 기준 FNR 0.15 미만, FPR 0.10 미만을 수용 기준으로 설정 | v3.8 |
| temporal integrity audit 커버리지 | baseline 55%에서 70%, M7 minimal 적용 시 65%에서 75% | v3.9.4 |
| 연구질문 advisory 일반화 | held-out miss rate 0.34에서 0.38 구간을 0.094로 하향, false-fire는 16건 중 0건 유지 | v3.16.0 |
| 전체 파이프라인 비용 추정 | 1만 5천 단어 논문 기준 약 4달러에서 6달러 | `docs/PERFORMANCE.md` |

사후 공개 감사 수치는 README에서 두 번 등장한다. v2.7 changelog는 전체 참고문헌 68건을 WebSearch로 전수 검증해 21건의 문제를 찾았다고 기록하고, v3.0 절은 같은 31%를 두고 "검증 AI와 생성 AI가 같은 인지 프레임을 공유하는" frame-lock의 결과라고 해석한다. 두 서술은 별개 실험이 아니라 같은 사건이다. 이 감사로 조작된 참고문헌 4건이 제거되고 저자 오류 6건, 메타데이터 오류 7건, 형식 오류 2건이 수정됐다.

v3.9.4의 temporal integrity audit이 다루는 시간적 오류 유형은 다섯 가지다. 소급 산술(P1), 시대착오 인용(P2), 미구체화 비교 대상(P3), 인과 역전(P4), 직시적 현재형(P5)이며 `scripts/temporal_integrity_audit.py`가 결정적으로 5회 통과 검사한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **완전 자동화가 아니다**: README가 "AI is your copilot, not the pilot"이라고 명시한다. 연구 방향, 방법론 선택, 해석은 인간 몫으로 남긴 설계이며 이것이 한계이자 원칙이다. 도구가 맡는 부분은 참고문헌 추적, 인용 형식 정리, 데이터 검증, 논리 정합성 검사다.
- **자체 평가가 코퍼스 규모로 이뤄지지 않았다**: README는 v3.7.x가 Zhao et al.의 코퍼스 규모 발견에서 동기를 얻었을 뿐 ARS 자체의 코퍼스 규모 평가는 향후 과제로 남았다고 밝힌다. Ren et al. survey 인용도 human-in-the-loop이 자율 파이프라인보다 낫다는 실증이 아니라 설계 근거로만 제시된다.
- **claim-faithfulness audit이 opt-in이다**: `ARS_CLAIM_AUDIT=1`을 켜지 않으면 v3.8의 인용과 주장 정합성 감사는 동작하지 않는다. 기본 활성화 전환(ramp-on) 계획은 calibration 증거가 쌓인 뒤로 미뤄져 있다(v3.8 spec §5).
- **citation-existence gate도 기본은 advisory다**: `lookup_verified == false` 행이 파이프라인을 실제로 막으려면 사용자가 `terminal_policies.citation_existence`를 `strict`로 설정해야 한다.
- **재현성은 구성 문서일 뿐이다**: `repro_lock`을 두고 README가 "설정 문서화이지 replay 보장이 아니다"라고 스스로 밝힌다. LLM 출력은 바이트 단위로 재현되지 않는다.
- **인용 검증의 precision과 recall 트레이드오프**: `unresolvable` 분류로 색인되지 않은 문헌을 통과시키므로 색인 커버리지가 낮은 분야와 언어에서는 검증 공백이 남는다.
- **사후 감사에서 드러난 잔여 오류**: 68건 중 21건 사례처럼 3중 integrity gate를 거쳐도 독립 감사가 추가로 문제를 찾아낸 전례가 있다. gate 통과가 완전무결의 증명은 아니다.
- **다국어 지원의 비대칭성**: Socratic 모드와 Plan 모드는 의도 기반 활성화라 모든 언어에서 동작하지만, 스킬 활성화 여부를 결정하는 Trigger Keywords 절은 영어와 번체중문 키워드 위주다. 다른 언어에서는 활성화 신뢰도가 떨어지며 사용자가 `SKILL.md`에 키워드를 직접 추가해야 한다.
- **버전 히스토리가 매우 촘촘하다**: v3.9.x대 후반부터 거의 매주 patch와 hotfix가 나오는 릴리스 리듬이라 특정 기능의 현재 상태를 파악하려면 CHANGELOG를 세심히 추적해야 한다.
- **Claude Science import는 시점 스냅숏이다**: 4개 스킬을 GitHub에서 import할 수 있지만 ARS 갱신 후에는 다시 import해야 하고, 슬래시 커맨드와 훅, 서브에이전트 오케스트레이션 같은 Claude Code 전용 기계 장치는 넘어가지 않는다.

## 6. 관련 연구 (Related Work)

| 문헌 | ARS와의 관계 |
|---|---|
| Lu et al. (2026, *Nature* 651:914-919), *The AI Scientist* | 최상위 ML 학회 워크숍(ICLR 2025)에서 블라인드 심사를 통과한 첫 완전자율 AI 연구 시스템으로, 점수는 6.33점(워크숍 평균 4.87점)이었다. 그 Limitations 절이 열거한 실패 모드(구현 버그, 환각 결과, shortcut 의존, bug-as-insight 재해석, 방법론 조작, frame-lock, 환각 인용)가 ARS human-in-the-loop 설계의 근거다. v3.2에서 7-mode 실패 모드 체크리스트로 반영됐다 |
| Zhao et al. (2026-05, arXiv:2605.07723) | arXiv, bioRxiv, SSRN, PMC의 논문 250만 편에 실린 참고문헌 1억 1,100만 개를 감사했다. 2025년 한 해만 환각 인용 146,932건을 보수적으로 추정했고 2024년 중반을 변곡점으로 관측했다. bioRxiv에서 PMC로 이어지는 쌍에서는 preprint 단계 인용이 출판본까지 남는 비율이 85.3%였다. "인용된 문헌이 실제로는 하지 않는 주장을 뒷받침한다고 제시된 실재 인용"을 미해결 과제로 규정한 부분이 ARS의 L3 문제의식과 직결된다 |
| Ren et al. (2026, arXiv:2607.13104), *Self-Improvements in Modern Agentic Systems: A Survey* | discovery agent가 신규성, 정확성, 재현성을 스스로 검증하기 어렵고 약한 대리 지표를 악용할 수 있다는 §7.4 결론, human auditing을 자기 생성 평가 루프의 실전 안전장치로 꼽은 §5.1에서 §5.2, Lenat의 EURISKO가 사용자를 외부 평가 신호로 삼아 성공했다는 §2.2 역사 서술이 근거로 인용된다. v3.18.0의 advisory 품질 계층 8종이 여기서 나왔다 |
| Song, Song, Pfister & Yoon (2026, arXiv:2604.05018), *PaperOrchestra* (Google) | Semantic Scholar API 검증, anti-leakage protocol, VLM figure verification, score trajectory tracking이 ARS v3.3의 직접 영감이다 |
| Wang & Zhang (2026, IJETHE 23:11) | Collaboration Depth Observer rubric의 근거 문헌. 생성형 AI와의 교육적 협업에서 이중 인지 경로를 다룬다 |
| GPTZero × NeurIPS 2025 연구 | v2.7의 환각 패턴 5종 분류(TF, PAC, IH, PH, SH)와 복합 기만 패턴 5종의 출처다 |
| aspi6246/Claude-Code-Skills-for-Academics | v3.1 최적화의 영감. read-only 제약 패턴, anti-pattern의 1급 설계 요소화, 절차가 아니라 사고법을 가르치는 인지 프레임워크 접근, lean skill size 철학을 가져왔다 |

## 7. 용어집 (Glossary)

- **ARS**: Academic Research Skills, 이 저장소의 약칭
- **Material Passport**: 세션 사이의 연속성과 mid-entry provenance를 담는 문서 스키마. `literature_corpus[]`, `repro_lock`, `experiment_provenance[]`, Schema 12 `compliance_history[]` 등이 하위 블록으로 붙는다
- **Integrity Gate (Stage 2.5 / 4.5)**: 건너뛸 수 없는 무결성 검증 체크포인트. Compliance Agent가 PRISMA-trAIce와 RAISE 기준으로 실행한다
- **Collaboration Depth Observer**: FULL과 SLIM 체크포인트마다 협업 깊이를 Delegation Intensity, Cognitive Vigilance, Cognitive Reallocation, Zone Classification으로 채점하는 advisory 에이전트. 진행을 막지 않는다
- **Frame-lock**: 검증 AI와 생성 AI가 동일한 인지 프레임을 공유해, 전제 자체가 아니라 그 안의 논거만 공격하게 되는 구조적 한계
- **Concession Threshold Protocol**: Devil's Advocate가 반박을 1점에서 5점으로 채점해 4점 이상일 때만 양보를 허용하는 anti-sycophancy 장치
- **L3 (Claim-Faithfulness Gap)**: 인용이 존재는 하지만 실제로 주장을 뒷받침하는지는 검증되지 않는 격차. ARS 내부 용어이며 원 논문 용어가 아니라고 README가 명시한다
- **Locator Anchor (Three-Layer Citation)**: 모든 인용에 붙는 quote, page, section, paragraph 앵커. claim-faithfulness audit이 원문을 다시 조회할 수 있게 한다
- **Experiment Provenance Intake**: ARS가 직접 실험을 실행하지 않는 대신, 사용자가 외부에서 실행한 실험의 근거를 Stage 1에서 fail-closed로 선언하게 하는 장치
- **Devil's Advocate (DA)**: Academic Paper Reviewer와 Deep Research에 공통으로 존재하는, 반대 입장에서 공격하는 리뷰 에이전트
- **repro_lock**: Material Passport의 선택적 재현성 lockfile. "구성 문서화이지 replay 보장이 아님"이라고 명시된다
- **Anti-Leakage Protocol**: 세션 자료를 LLM 파라미터 기억보다 우선하게 하고, 빠진 내용은 기억으로 메우는 대신 `[MATERIAL GAP]`으로 표시하게 하는 규약
