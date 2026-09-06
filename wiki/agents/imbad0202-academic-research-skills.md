---
title: "Academic Research Skills (ARS): Claude Code 학술 연구 파이프라인"
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

## 요약

Academic Research Skills(ARS)는 Claude Code용 스킬 4종을 묶어 학술 논문의 연구부터 집필, 리뷰, 수정, 최종본까지를 하나의 파이프라인으로 잇는 저장소다. Cheng-I Wu가 단독으로 유지보수하며 CC BY-NC 4.0으로 배포된다. README 기준 최신 스위트 버전은 v3.18.0(2026-07-18)이고 DOI는 10.5281/zenodo.20696614다.

이 저장소를 다른 학술 자동화 도구와 구분 짓는 것은 완전 자동화를 목표로 삼지 않는다는 선언이다. README 서두는 "AI is your copilot, not the pilot"이라고 못 박고, 연구 질문 정의와 방법론 선택, 데이터 해석은 인간의 몫으로 남긴다. 도구가 맡는 것은 참고문헌 추적, 인용 형식 정리, 데이터 검증, 논리 정합성 검사처럼 반복적인 부분이다.

그 결과 저장소의 설계 중심은 생성 능력이 아니라 검증 장치에 놓인다. 환각 인용(citation hallucination)을 구조적 위험으로 규정하고, 건너뛸 수 없는 무결성 게이트 두 곳과 인용 검증 3단 인프라, 반박 에이전트의 아부를 막는 프로토콜을 파이프라인 안에 배치했다.

## 배경

ARS의 설계 근거는 세 편의 선행 문헌이다. README는 이들을 근거로 삼되, 각각이 무엇을 증명하고 무엇을 증명하지 않는지를 구분해 적는다.

| 문헌 | ARS가 가져온 것 |
|---|---|
| Lu et al. (2026, *Nature* 651:914-919), *The AI Scientist* | 완전자율 AI 연구 시스템이 상속하는 실패 모드 목록 |
| Zhao et al. (2026-05, arXiv:2605.07723) | 환각 인용의 코퍼스 규모 실측 |
| Ren et al. (2026, arXiv:2607.13104) 자기개선 survey | discovery agent의 자기검증 한계와 human auditing의 역할 |

Lu et al.의 AI Scientist는 최상위 ML 학회 워크숍(ICLR 2025)에서 블라인드 동료 심사(peer review)를 통과한 첫 완전자율 AI 연구 시스템으로, 점수는 6.33점이었고 워크숍 평균은 4.87점이었다. ARS가 주목한 것은 그 성과가 아니라 논문의 Limitations 절이다. 거기에 구현 버그, 환각 결과, shortcut 의존, 버그를 통찰로 재해석하는 문제, 방법론 조작, frame-lock, 환각 인용이 열거돼 있다. ARS는 이 목록을 그대로 실패 모드 체크리스트로 옮겨 Stage 2.5와 Stage 4.5에서 차단 조건으로 쓴다.

Zhao et al.은 arXiv, bioRxiv, SSRN, PMC에 올라온 논문 250만 편의 참고문헌 1억 1,100만 개를 감사했다. 2025년 한 해에만 환각 인용 146,932건을 보수적으로 추정했고 2024년 중반을 변곡점으로 관측했다. bioRxiv에서 PMC로 이어지는 쌍에서는 preprint 단계의 인용이 출판본까지 그대로 남는 비율이 85.3%였다. 즉 초고 단계에서 잡지 못한 환각 인용은 대부분 출판까지 살아남는다.

이 논문이 미해결 과제로 지목한 유형이 ARS 설계에 특히 중요하다. "실재하는 인용이 정작 그 문헌이 하지 않는 주장을 뒷받침한다고 제시되는" 경우다. 문헌이 존재하는지만 확인해서는 걸러지지 않는 유형이며, ARS는 이 격차를 내부 용어로 L3라 부른다.

Ren et al.의 survey는 세 번째 근거다. discovery agent가 신규성과 정확성, 재현성을 스스로 검증하기 어렵고 약한 대리 지표를 악용할 수 있다는 결론(§7.4), human auditing을 자기 생성 평가 루프의 실전 안전장치로 꼽은 부분(§5.1에서 §5.2), Lenat의 EURISKO가 사용자를 외부 평가 신호로 삼아 성공했다는 역사 서술(§2.2)이 인용된다. 다만 README는 이 survey를 설계 근거로만 제시하며, human-in-the-loop 파이프라인이 자율 파이프라인보다 낫다는 실증으로 쓰지는 않는다고 명시한다.

## 핵심 개념

**Human-in-the-loop**는 매 단계에 사람의 확인을 필수로 두는 운용 방식을 뜻한다. ARS에서는 모든 스테이지가 사용자 확인 체크포인트를 요구하고, 무결성 게이트 두 곳은 사용자가 원해도 건너뛸 수 없다.

**Integrity gate**는 Stage 2.5와 Stage 4.5에 놓인 무결성 검증 체크포인트다. PRISMA-trAIce와 RAISE 기준을 적용하는 Compliance Agent(v3.4)가 실행하며, 통과하지 못하면 다음 스테이지로 넘어가지 않는다.

**Frame-lock**은 검증하는 AI와 생성하는 AI가 같은 인지 프레임을 공유해, 전제 자체가 아니라 그 안의 논거만 공격하게 되는 구조적 한계다. 반박 라운드를 아무리 늘려도 "우리가 지금 옳은 질문을 논하고 있는가"를 묻지 못한다.

**Sycophancy**는 사용자가 밀어붙일 때 모델이 근거와 무관하게 물러서는 경향이다. 대화의 조화를 보상하는 학습 특성 때문에 "사용자가 반발했다"는 사실 자체가 "내 지적이 틀렸다"는 증거로 잘못 처리된다.

**L3(claim-faithfulness gap)**는 인용된 문헌이 실재하기는 하지만 그 문헌이 정말 해당 주장을 뒷받침하는지는 검증되지 않은 격차를 가리킨다. ARS 내부 용어이며 원 논문의 용어가 아니라고 README가 밝힌다.

**Material Passport**는 세션 사이의 연속성과 mid-entry 시점의 provenance를 담는 문서 스키마다. 문헌 코퍼스, 재현성 lockfile, 실험 provenance, 컴플라이언스 이력이 하위 블록으로 붙는다.

## 스위트 구성

### 스킬 4종

ARS는 독립적으로도 쓸 수 있는 스킬 4종과, 그것들을 하나의 흐름으로 묶는 orchestrator 하나로 이뤄진다. 스위트 버전과 개별 스킬 버전은 따로 움직인다. `academic-pipeline`이 스위트 버전을 대표하고 나머지 셋은 변경이 있을 때만 올라간다.

| 스킬 | 버전 | 에이전트 | 모드 | 역할 |
|---|---|---|---|---|
| Deep Research | v2.11.0 | 13 | 8 | 문헌 조사, 체계적 문헌고찰, 사실 확인, 소크라테스식 대화 |
| Academic Paper | v3.2.0 | 12 | 11 | 집필, 개요 작성, 수정, 형식 변환, 인용 점검 |
| Academic Paper Reviewer | v1.10.0 | 7 | 6 | 다관점 동료 심사, 재심사, 방법론 집중 검토 |
| Academic Pipeline | v3.18.0 | 10-stage orchestrator | mid-entry 3종 | 스테이지 연결, 무결성 검증, 협업 품질 평가 |

v3.12.1에서 `three-way-scan`과 `rebuttal-audit` 두 모드가 추가되며 스위트 전체 모드 수는 25개에서 27개로 늘었다. 스킬 개수는 4개 그대로다.

### 스킬별 모드

각 모드는 별도 명령이 아니라 사용자의 요청 문장에서 의도를 읽어 선택된다. Deep Research의 8개 모드는 조사의 깊이와 형식으로 갈린다.

| 모드 | 쓰임 |
|---|---|
| full | 주제 전반의 본격 조사 |
| quick | 짧은 브리프 |
| systematic-review | PRISMA 절차를 따르는 체계적 문헌고찰 |
| socratic | 질문을 던져 사용자의 연구 질문을 함께 다듬는 가이드 |
| fact-check | 제시된 주장의 사실 확인 |
| lit-review | 문헌 리뷰 |
| three-way-scan | 논문들을 WHY, HOW, WHAT 형식으로 비교하는 경량 분류 |
| review | 논문의 연구 품질 검토 |

Academic Paper의 11개 모드는 집필 단계별로 나뉜다. full로 전체를 쓰거나 plan으로 안내를 받으며 시작하고, outline-only는 개요만, abstract-only는 초록만 낸다. 심사 이후 단계는 revision(초고와 심사평을 함께 받아 수정), revision-coach(심사평을 수정 로드맵으로 분해), rebuttal-audit(작성한 반박문을 심사평과 대조 점검)으로 세분된다. 나머지는 lit-review, format-convert(LaTeX 변환과 인용 형식 변환), citation-check, disclosure(학회별 AI 사용 고지문 생성)다.

Academic Paper Reviewer의 6개 모드는 full, re-review, quick, methodology-focus, guided, calibration이다. full 모드에서는 EIC와 동적으로 배정되는 리뷰어 3인, Devil's Advocate가 패널을 이룬다.

Academic Pipeline은 모드 대신 진입점을 고른다.

| 상황 | 진입 지점 |
|---|---|
| 처음부터 논문을 쓴다 | Stage 1 전체 파이프라인 |
| 이미 초고가 있다 | Stage 2.5 mid-entry, 무결성 검사부터 시작 |
| 심사평을 받았다 | Stage 4 mid-entry |

### 심사 판정 기준

리뷰어 패널은 0점에서 100점 rubric으로 채점하고 총점을 판정으로 매핑한다.

| 점수 구간 | 판정 |
|---|---|
| 80점 이상 | Accept |
| 65점에서 79점 | Minor Revision |
| 50점에서 64점 | Major Revision |
| 50점 미만 | Reject |

calibration 모드는 사용자가 제공한 gold set과 대조해 자체 FNR과 FPR을 측정하는 opt-in 자기 검증이다. v3.2에서 도입될 때 5회 앙상블과 cross-model 기본 활성화, 세션 범위 신뢰도 고지가 함께 붙었다. 리뷰어에게는 v3.1부터 read-only 제약이 걸려 있어 원고를 직접 수정할 수 없다.

## 검증 장치

### 인용 무결성 3단 인프라

인용 검증은 한 번에 완성된 것이 아니라 세 단계로 쌓였다. 각 단계가 앞 단계로는 잡히지 않는 실패 유형을 맡는다.

| 단계 | 버전 | 잡는 것 |
|---|---|---|
| locator anchor | v3.7.3 | 인용에 원문 위치가 없어 사후 대조가 불가능한 상태 |
| claim-faithfulness audit | v3.8 | 문헌은 실재하지만 주장을 뒷받침하지 않는 경우 |
| citation-existence gate | v3.11 | 문헌 자체가 존재하지 않는 경우 |

v3.7.3의 3-layer locator anchor는 모든 인용에 quote, page, section, paragraph 중 하나의 위치 표시를 붙인다. 이 앵커가 있어야 나중에 원문을 다시 찾아가 대조할 수 있다.

v3.8은 그 앵커를 실제로 따라가는 감사 단계다. `ARS_CLAIM_AUDIT=1`을 설정하면 인용된 출처를 앵커 기준으로 다시 가져와 주장이 정말 뒷받침되는지 판정한다. 이때 붙는 HIGH-WARN 판정은 다섯 가지이며, 하나라도 걸리면 formatter 종단 hard gate가 출력을 거부한다.

| HIGH-WARN 판정 | 뜻 |
|---|---|
| claim-not-supported | 인용 문헌이 해당 주장을 뒷받침하지 않는다 |
| negative-constraint-violation | 문헌이 명시적으로 배제한 내용을 근거로 삼았다 |
| fabricated-reference | 참고문헌 자체가 조작됐다 |
| anchorless | locator anchor가 없어 대조가 불가능하다 |
| constraint-violation-uncited | 제약 위반인데 인용조차 붙어 있지 않다 |

v3.11의 citation-existence gate는 LLM 심사와 무관하게 결정적으로 동작한다. 인용된 문헌마다 Semantic Scholar, OpenAlex, Crossref, arXiv 네 개 색인을 조회해 `lookup_verified` 값을 `true`, `false`, `unresolvable` 중 하나로 기록한다. 검증 결과는 `~/.cache/ars/verification.db` SQLite 캐시에 90일 TTL로 보관되고 `/ars-cache-invalidate`로 비운다.

`false`의 정의를 좁게 잡은 점이 이 게이트의 설계 판단이다. `false`는 "DOI나 arXiv ID로 정확히 조회했는데 확실히 실패한 경우"에만 붙고, 색인되지 않은 인문학이나 비영어권 문헌은 `unresolvable`로 남아 차단되지 않는다. README는 이를 recall보다 precision을 우선한 명시적 트레이드오프라고 적는다.

한 가지 더 유의할 점은 기본 동작이 차단이 아니라는 것이다. `false` 행이 실제로 파이프라인을 멈추려면 사용자가 `terminal_policies.citation_existence`를 `strict`로 설정해야 하고, 그러지 않으면 advisory로만 표시되며 `/ars-mark-read`로 확인 처리할 수 있다.

이 인프라가 붙기까지의 순서는 다음과 같다.

| 버전 | 추가된 것 |
|---|---|
| v3.3 | Semantic Scholar API를 Tier 0 존재 검사로 도입. Levenshtein 유사도 0.70 이상 제목 매칭, DOI 불일치 탐지, S2 ID 기반 중복 제거 |
| v3.9.0 | 단일 색인 오염 탐지를 OpenAlex와 Crossref를 더한 3색인 교차검증으로 확장(advisory) |
| v3.11.0 | arXiv resolver를 더해 4개 색인 결정적 존재 검증 게이트로 승격 |
| v3.18.0 | 캐시 스루에 나이 기반 staleness advisory와 opt-in 실시간 재검증 연결 |

이 3단 구조에 앞서 v2.7이 검증 에이전트의 판정 어휘 자체를 정리해 두었다. `integrity_verification_agent` v2.0은 모델의 기억으로 인용을 확인하는 것을 금지하고(Anti-Hallucination Mandate), 애매한 중간 판정을 없애 VERIFIED, NOT_FOUND, MISMATCH 세 가지만 남겼다. 참고문헌마다 WebSearch 감사 기록을 남기게 했고 Stage 4.5에서는 앞선 결과를 참조하지 않는 독립 재검증을 요구한다.

같은 버전에서 환각 패턴 분류도 함께 정리됐다. GPTZero와 NeurIPS 2025 연구를 근거로 환각 패턴 5종(TF, PAC, IH, PH, SH)과 복합 기만 패턴 5종, 실제 사례 연구, 문헌 통계를 참조 문서로 갖췄다.

### Devil's Advocate와 아부 차단

Devil's Advocate(DA)는 저자의 논지를 반대 입장에서 공격하는 리뷰 에이전트다. v3.0의 Concession Threshold Protocol은 이 DA가 너무 쉽게 물러서는 문제를 겨냥한다.

프로토콜의 규칙은 단순하다. DA는 응답하기 전에 상대의 반박을 1점에서 5점으로 채점하고, 4점 이상일 때만 양보할 수 있다. 4점은 "반박이 핵심 공격을 근거와 함께 직접 다뤘다"는 뜻이다. 3점 이하면 입장을 유지하고 원래의 지적을 다시 진술한다. 여기에 연속 양보 금지, 양보율 추적, 체크포인트마다 frame-lock 탐지가 더해진다.

리뷰어 스킬에는 Attack Intensity Preservation이 함께 들어간다. DA가 압박을 받아도 지적의 강도를 낮추지 않게 하고, 회피성 응답을 명시적으로 탐지하는 반박 평가 규약이다.

README는 이 장치들이 한계를 해결하지 못한다고 분명히 적는다. DA는 충분히 밀어붙이면 결국 양보하고, Socratic Mentor에게는 여전히 수렴 편향이 남는다. 장치의 목적은 한계를 제거하는 것이 아니라 눈에 보이고 관리 가능한 상태로 만드는 것이다.

### 소크라테스식 대화의 의도 감지

Socratic Mentor는 사용자가 아직 탐색 중인지 결론을 원하는지를 판별하지 못해 성급히 마무리를 유도하는 문제가 있었다. v3.0은 여기에 두 개 층을 넣었다.

의도 감지 층은 대화 시작 시점과 3턴마다 사용자 의도를 exploratory와 goal-oriented로 분류한다. exploratory로 판정되면 자동 수렴을 끄고 최대 라운드를 60으로 올리며 "요약해 드릴까요" 류의 마무리 유도를 금지한다. 이 모드에서 대화를 끝낼 시점은 사용자가 정한다.

Dialogue Health Indicator는 5턴마다 지속적 동의, 충돌 회피, 조기 수렴 세 가지를 자가 점검한다. 동의 패턴이 감지되면 도전적인 질문을 자동으로 끼워 넣는다. 이 점검 결과는 사용자가 역이용하지 못하도록 화면에 노출하지 않고 로그로만 남긴다.

의도 기반 활성화는 v2.6.2에서 도입된 2층 구조의 일부다. 1층인 스킬 활성화는 키워드 매칭을 쓰고, 2층인 모드 라우팅은 언어에 의존하지 않는 의도 신호를 쓴다. 의도가 모호할 때는 full보다 socratic이나 plan을 택하는 기본 규칙도 함께 있다.

### 집필 단계의 오염 차단

v3.3은 PaperOrchestra(Song, Song, Pfister & Yoon, 2026, Google)에서 가져온 세 가지 장치로 집필 단계의 오염을 막는다.

Anti-Leakage Protocol은 세션에 올라온 자료를 모델의 파라미터 기억보다 우선하게 하는 규약이다. 자료에 없는 내용을 기억으로 메우는 대신 `[MATERIAL GAP]`으로 표시하게 해, 빠진 부분이 그럴듯한 문장으로 덮이지 않게 한다.

VLM figure verification은 렌더링된 그림을 vision 능력이 있는 모델이 다시 확인하는 선택적 폐루프 검사다. 10개 항목 체크리스트를 쓰고 보정은 최대 2회까지 반복한다.

Score Trajectory Protocol은 수정 라운드를 거치며 rubric 항목별 점수가 어떻게 움직이는지를 7개 항목으로 추적한다. 점수가 3점을 넘게 떨어지면 회귀로 보고 필수 체크포인트를 발동시킨다. 수정이 한 부분을 고치면서 다른 부분을 망가뜨리는 경우를 잡기 위한 장치다.

### 실험 provenance intake

ARS는 실험을 직접 실행하지 않는다. 그래서 실험 근거를 주장하는 원고가 들어올 때 근거의 출처를 사용자가 명시하게 만드는 장치를 Stage 1에 두었다.

Stage 1은 이번 실행이 실험 근거 주장을 포함할지 감지해 `experiment_intake_declaration`을 fail-closed로 설정한다. 외부에서 실험을 실행했다면 실험 하나당 `experiment_provenance[]` 항목 하나를 기록하고, 항목은 `experiment_id`, 중첩된 `repro_lock`, `planned_vs_executed[]`, `negative_results[]`, `known_limitations[]`로 구성된다. `experiment_id`는 이 시점에 확정되고 이후 집필 에이전트가 `planned_experiment_ids[]`로 참조한다.

integrity gate는 실험 근거 주장마다 선언된 provenance와 대조해 네 가지 중 하나로 판정한다.

| 판정 | 뜻 |
|---|---|
| ALIGNED | 주장이 선언된 provenance와 일치한다 |
| OVERSTATED | 주장이 provenance보다 과장됐다 |
| NOT_SUPPORTED_BY_PROVENANCE | 선언된 provenance가 주장을 뒷받침하지 않는다 |
| PROVENANCE_INSUFFICIENT | provenance 기록 자체가 부족하다 |

실험 자체가 옳게 수행됐는지는 판정 대상이 아니다. 실험을 전혀 다루지 않는 실행도 `no_experiments_declared`를 반드시 남겨야 하므로, provenance 블록을 빠뜨려 게이트를 조용히 우회하는 경로가 막힌다.

### 협업 깊이 관찰과 최종 평가

v3.5는 `collaboration_depth_agent`를 추가해 사용자와 AI의 협업 깊이를 관찰한다. FULL과 SLIM 체크포인트마다, 그리고 파이프라인 완료 시점에 실행되며 advisory로만 동작해 진행을 막지 않는다. MANDATORY 무결성 게이트(Stage 2.5와 4.5)에서는 의도적으로 실행되지 않는데, 컴플라이언스 판정이 협업 점수로 희석되는 것을 피하기 위해서다.

이 관찰자가 쓰는 rubric v1.0의 평가 항목은 Delegation Intensity, Cognitive Vigilance, Cognitive Reallocation, Zone Classification(Zone 1에서 Zone 3) 네 가지이며 Wang과 Zhang(2026, IJETHE 23:11)이 근거다. `ARS_CROSS_MODEL`이 설정되면 관찰자는 두 모델에서 함께 실행되고, 항목 점수 차가 2점을 넘으면 평균으로 뭉개지 않고 불일치로 보고한다.

파이프라인 종료 지점인 Stage 6은 논문 작성 과정 기록을 자동 생성하고 Collaboration Quality Evaluation으로 여섯 항목을 1점에서 100점으로 채점한다. Direction Setting, Intellectual Contribution, Quality Gatekeeping, Iteration Discipline, Delegation Efficiency, Meta-Learning이다. 여기에 DA 양보율, 체크포인트 생략률, 건강 경고, 아부 위험 등급, frame-lock 발생 횟수를 담은 AI 자기 성찰 보고서가 붙는데, README는 "이 자기 성찰 역시 아부했을 수 있는 바로 그 AI가 생성한 것"이라는 단서를 함께 적는다.

### model tiering과 cross-model verification

`ARS_MODEL_TIERING`은 비용과 품질을 나눠 배정하는 opt-in 스위치다. economy 방향은 실행형 에이전트 13개를 세션 모델보다 한 단계 낮은 등급으로 내리되 Opus 계열을 하한으로 둔다. quality-boost 방향은 무결성 게이트와 최종 리뷰의 판단형 에이전트를 frontier 등급으로 올린다. 스위치를 켜지 않으면 이전 동작과 바이트 단위로 동일하며, 39개 에이전트의 분류는 매니페스트와 lint로 고정돼 있다.

cross-model verification은 별도 모델 계열을 검증에 섞는 장치다. v3.0에서 GPT-5.4 Pro와 Gemini 3.1 Pro를 무결성 검증 표본 교차확인과 독립 DA 비평에 쓰는 것으로 시작했고, v3.16에서 GPT-5.6 Sol이 잠정 검증자로 추가됐다. v3.18에서는 고정 5석 심사 패널 중 한 자리를 두 번째 모델 계열에 내주는 리뷰어 트랙이 동의 기반으로 들어왔다. v3.17은 owner에서 dispatcher를 거쳐 다시 owner로 돌아오는 blind checkpoint 전송에 `[CROSS-MODEL-HANDOFF v1]` 정형 envelope와 Python 문법 규정을 부여해, 산문 규칙에 의존하던 강제를 기계가 검사할 수 있는 형태로 바꿨다.

### 긴 대화에서 규칙이 흐려지는 문제

v3.1은 대화가 길어질수록 초기 지시가 희석되는 문제(anti-context-rot)를 겨냥한 묶음이다. 스킬 4종에 걸쳐 anti-pattern 29개를 "왜 실패하는가"와 "올바른 행동" 열을 갖춘 표로 명시하고, 긴 대화에서도 깨지면 안 되는 규칙에 IRON RULE 표식 22개를 달았다. 파이프라인 전환 시점마다 스테이지별 IRON RULE과 anti-pattern을 다시 주입하는 규약도 함께 들어갔다.

같은 버전에서 SKILL.md 총량을 142KB에서 85KB로 40% 줄이고 상세 프로토콜을 `references/` 파일 약 15개로 뺐다. IRON RULE 표식은 SKILL.md에 남기고 세부 내용만 필요 시점에 불러오는 구성이다. 절차가 아니라 사고법을 가르치는 인지 프레임워크 참조 파일 3종도 이때 추가됐다. 논증과 추론 프레임워크(Toulmin 모형, Bradford Hill 인과 추론), 리뷰 품질 사고법(내적 타당도, 외적 타당도, 기여도의 세 렌즈), 집필 판단 프레임워크(명료성 검사, 독자의 여정, 수정 결정 매트릭스)다.

## 설치와 실행 환경

v3.7.0부터 플러그인 한 줄 설치를 지원한다. `/plugin marketplace add Imbad0202/academic-research-skills` 다음에 `/plugin install academic-research-skills`를 실행하면 Claude Code CLI와 VS Code, JetBrains에서 동작한다. 기존의 `git clone` 후 `~/.claude/skills/`로 symlink하는 방식도 계속 유효하며 두 경로 모두 1급으로 취급된다. `docs/SETUP.md`는 플러그인, 프로젝트 스킬, 전역 스킬, claude.ai 프로젝트, repo clone, Claude Science import까지 설치 방법 6가지를 다룬다.

| 요구 사항 | 필수 여부 | 용도 |
|---|---|---|
| Claude Code 최신 버전 | 필수 | 플러그인 패키징이 최신 버전을 요구한다 |
| `ANTHROPIC_API_KEY` | 필수 | 환경 변수로 내보내거나 첫 실행 시 설정 |
| Pandoc | 선택 | DOCX 출력 |
| tectonic과 Source Han Serif TC | 선택 | APA 7.0 PDF 출력 |
| 실제 Python 인터프리터 | 선택 | `PreToolUse` write-scope guard와 일부 opt-in 기능 |

핵심 스킬 3종인 연구, 집필, 리뷰는 프롬프트로만 동작하므로 Python이 필요 없다. Python이 없으면 guard는 조용히 비활성화되고 핵심 스킬은 영향을 받지 않는다. Windows에서는 두 가지를 더 확인해야 한다. `python3`가 실제 인터프리터가 아니라 Microsoft Store 자리표시자인 경우가 많고, guard 실행기가 POSIX 셸 스크립트라 Git Bash가 필요하다. Git Bash가 없으면 Claude Code가 PowerShell로 폴백해 `.sh` 실행기를 아예 실행하지 못하며, guard는 비활성 상태로 호출마다 오류를 로그에 남긴다. README는 이를 감수한 저하로 명시한다.

플러그인 설치 시 `commands/ars-*.md`의 슬래시 커맨드 10개와 플러그인 에이전트 3개가 함께 들어온다. 모델 라우팅은 커맨드 frontmatter에 고정돼 `full`과 `revision-coach`는 opus, 나머지 8개는 sonnet이며 프로젝트 정책상 Haiku는 쓰지 않는다. 플러그인이 로드되면 SessionStart 훅이 슬래시 커맨드 목록과 에이전트 목록, 토큰 예산 안내를 첫 턴의 컨텍스트에 주입한다.

지원 범위는 다음과 같다.

| 구분 | 목록 |
|---|---|
| 언어 | 번체중문(중국어 입력 시 기본), 영어(영어 입력 시 기본), 학술 논문용 중영 이중 초록 |
| 인용 형식 | APA 7.0(기본, 중국어 인용 규칙 포함), Chicago(Notes와 Author-Date), MLA, IEEE, Vancouver |
| 논문 구조 | IMRaD, 주제별 문헌 리뷰, 이론 분석, 사례 연구, 정책 브리프, 학회 논문 |

메타데이터 규약도 두 가지 있다. v3.3.2부터 모든 스킬이 `data_access_level`을 `raw`, `redacted`, `verified_only` 중 하나로 선언하고 `scripts/check_data_access_level.py`가 이를 강제한다. 같은 버전에서 `task_type`도 `open-ended`와 `outcome-gradable` 중 하나로 선언하게 했으며 현재 ARS 스킬은 모두 `open-ended`다.

실험이 필요한 연구라면 동반 스킬을 함께 쓴다. Experiment Agent가 Stage 1과 Stage 2 사이의 공백을 메워 코드 실험을 실행하고 IRB 윤리 체크리스트로 human study를 관리하며 11종 통계 오류를 탐지한다. Stage 1 이후 파이프라인을 멈추고 별도 세션에서 실험을 실행한 뒤 Material Passport와 함께 결과를 Stage 2로 가져오는 방식이며, ARS 쪽은 수정할 것이 없다.

Codex CLI를 쓴다면 자매 배포판 `Imbad0202/academic-research-skills-codex`를 대신 설치한다. 워크플로 내용은 같고 Codex 방식에 맞춰 단일 `$academic-research-suite` 스킬과 `ars-*` 별칭으로 패키징돼 있다. 교육 쪽으로는 Teaching Skills가 같은 아키텍처를 강의 설계에 이식해 코스 설계부터 수업, 평가, 운영, 성찰까지를 다루고 `sotl` 모드에서 교실 탐구 과제를 ARS로 넘긴다.

저장소는 단독 유지보수 프로젝트지만 외부 기여가 여러 곳에 반영돼 있다. v3.1의 최적화 방향은 aspi6246의 Claude-Code-Skills-for-Academics에서 가져왔고, IS 분야 저널 목록은 mchesbro1과 cloudenochcsis의 제안으로 Senior Scholars' Basket of 11까지 확장됐다. 일본어와 간체중문, 한국어 README도 각각 다른 기여자가 번역했다. ARS를 감싸거나 호스팅하는 서드파티 플랫폼은 `THIRD_PARTY.md`에 모여 있으며, maintainer가 검토하거나 보증한 목록은 아니라고 명시돼 있다.

## 결과

README는 자기 시스템의 성능을 홍보 수치가 아니라 실제 실행 산출물과 실패 기록으로 제시한다. `examples/showcase/` 폴더에 10단계 파이프라인을 한 번 완주한 결과물이 통째로 공개돼 있다.

| 항목 | 수치 | 출처 |
|---|---|---|
| Stage 2.5 무결성 보고서 | 조작된 참고문헌 15건, 통계 오류 3건 검출 | showcase 실행 |
| Stage 4.5 최종 검사 | 회귀 0건 | showcase 실행 |
| 사후 공개 감사 | 참고문헌 68건 전수 검증에서 3라운드 검사가 놓친 21건 추가 검출(오류율 31%) | v2.7 |
| claim-faithfulness audit 보정 | 20-tuple gold set 기준 FNR 0.15 미만, FPR 0.10 미만을 수용 기준으로 설정 | v3.8 |
| temporal integrity audit 커버리지 | baseline 55%에서 70%, M7 minimal 적용 시 65%에서 75% | v3.9.4 |
| 연구질문 advisory 일반화 | held-out miss rate 0.34에서 0.38 구간을 0.094로 하향, false-fire는 16건 중 0건 유지 | v3.16.0 |
| 전체 파이프라인 비용 추정 | 1만 5천 단어 논문 기준 약 4달러에서 6달러 | `docs/PERFORMANCE.md` |

가장 중요한 수치는 사후 공개 감사의 31%다. 3라운드의 무결성 검사를 통과한 원고를 독립적으로 전수 검증했더니 68건 중 21건에서 문제가 나왔다. 이 감사로 조작된 참고문헌 4건이 제거되고 저자 오류 6건, 메타데이터 오류 7건, 형식 오류 2건이 수정됐다. 자기 시스템이 놓친 비율을 README에 그대로 남긴 셈이다.

같은 31%가 README에서 두 번 쓰이는 점은 읽을 때 주의가 필요하다. v2.7 changelog는 이를 외부 검증의 필요성을 입증하는 감사 결과로 적고, v3.0 절은 같은 수치를 "검증 AI와 생성 AI가 같은 인지 프레임을 공유한" frame-lock의 결과로 해석한다. 별개의 두 실험이 아니라 하나의 사건에 대한 두 가지 서술이다.

v3.9.4가 추가한 temporal integrity audit은 시간 관련 오류를 결정적으로 검사한다. 대상 유형은 다섯 가지로 소급 산술(P1), 시대착오 인용(P2), 미구체화 비교 대상(P3), 인과 역전(P4), 직시적 현재형(P5)이며 `scripts/temporal_integrity_audit.py`가 5회 통과 검사로 확인한다. 커버리지 추정치가 55%에서 75% 구간에 머무는 만큼 이 검사 역시 advisory로만 동작한다.

v3.16.0의 연구질문 advisory 개선은 규칙 기반 검사의 일반화 사례다. 기존에는 20개의 표현 껍데기를 표로 나열해 대조하는 방식이었는데, 명사만 바꿔 넣어 보는 noun-swap 검사로 바꾸자 held-out 집합에서 놓치는 비율이 0.34에서 0.38 구간에서 0.094로 내려갔다. 오작동(false-fire)은 16건 중 0건으로 유지됐다.

## 한계

이 저장소의 한계는 크게 세 가지 성격으로 나뉜다. 설계상 의도한 한계, 검증 장치가 기본값으로는 켜지지 않는다는 한계, 그리고 게이트를 통과해도 오류가 남는다는 한계다.

**설계상 의도한 한계.** 완전 자동화는 목표가 아니다. 연구 방향, 방법론 선택, 데이터 해석은 사람이 맡는다. ARS는 실험을 실행하지 않으며 실험 근거는 사용자가 외부에서 확보해 선언해야 한다. 재현성 역시 보장이 아니다. `repro_lock`을 두고 README가 "설정 문서화이지 replay 보장이 아니다"라고 스스로 밝히는데, LLM 출력이 바이트 단위로 재현되지 않기 때문이다.

**기본값이 advisory인 장치들.** 검증 인프라의 상당 부분이 opt-in이라 설정하지 않으면 동작하지 않는다.

| 장치 | 활성화 조건 |
|---|---|
| claim-faithfulness audit | `ARS_CLAIM_AUDIT=1` |
| citation-existence gate의 차단 동작 | `terminal_policies.citation_existence`를 `strict`로 설정 |
| cross-model verification | `ARS_CROSS_MODEL` |
| model tiering | `ARS_MODEL_TIERING` |

v3.8의 기본 활성화 전환 계획은 보정 증거가 쌓인 뒤로 명시적으로 미뤄져 있다(v3.8 spec §5).

**검증의 잔여 공백.** 인용 검증에는 precision과 recall의 트레이드오프가 있다. `unresolvable` 분류로 색인되지 않은 문헌을 통과시키므로 색인 커버리지가 낮은 분야와 언어에서는 검증 공백이 남는다. 68건 중 21건 사례처럼 3중 게이트를 거쳐도 독립 감사가 추가 문제를 찾아낸 전례가 있어, 게이트 통과가 완전무결의 증명은 아니다.

README가 밝히는 다른 한계도 있다. ARS 자체를 코퍼스 규모로 평가한 결과는 아직 없으며 향후 과제로 남아 있다. Ren et al. survey 인용도 human-in-the-loop이 자율 파이프라인보다 낫다는 실증이 아니라 설계 근거로만 제시된다.

다국어 지원은 비대칭적이다. Socratic 모드와 Plan 모드는 의도 기반 활성화라 어떤 언어에서도 동작하지만, 스킬 활성화 여부를 결정하는 Trigger Keywords 절은 영어와 번체중문 키워드 위주다. 다른 언어에서는 활성화 신뢰도가 떨어지며 사용자가 `SKILL.md`에 키워드를 직접 추가해야 한다. 한국어와 번체중문 트리거는 v3.16과 v3.18에서 일부 보강됐다.

버전 히스토리도 부담 요인이다. v3.9.x대 후반부터 거의 매주 patch와 hotfix가 나오는 릴리스 리듬이라 특정 기능의 현재 상태를 파악하려면 CHANGELOG를 세심히 추적해야 한다. Claude Science로 import하는 경로는 시점 스냅숏이라 ARS 갱신 후 다시 import해야 하고, 슬래시 커맨드와 훅, 서브에이전트 오케스트레이션 같은 Claude Code 전용 장치는 넘어가지 않는다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Integrity Gate | Stage 2.5와 4.5에 놓인 건너뛸 수 없는 무결성 검증 체크포인트. Compliance Agent가 PRISMA-trAIce와 RAISE 기준으로 실행한다 |
| Frame-lock | 검증 AI와 생성 AI가 같은 인지 프레임을 공유해 전제가 아니라 그 안의 논거만 공격하게 되는 구조적 한계 |
| Concession Threshold Protocol | Devil's Advocate가 반박을 1점에서 5점으로 채점해 4점 이상일 때만 양보를 허용하는 아부 차단 장치 |
| L3 (claim-faithfulness gap) | 인용이 실재하기는 하지만 주장을 실제로 뒷받침하는지는 검증되지 않은 격차. ARS 내부 용어다 |
| Locator Anchor | 모든 인용에 붙는 quote, page, section, paragraph 위치 표시. 사후 대조를 가능하게 한다 |
| Material Passport | 세션 사이의 연속성과 mid-entry provenance를 담는 문서 스키마. 문헌 코퍼스, `repro_lock`, 실험 provenance가 하위 블록으로 붙는다 |

## 관련 페이지

- [[agents/stanford-oval-storm]]: 인터넷 검색만으로 Wikipedia 형식의 글을 처음부터 쓰는 Stanford OVAL 시스템. 학술 리서치 자동화라는 문제의식은 겹치지만 접근이 반대다. ARS가 human-in-the-loop 무결성 게이트를 핵심에 두는 반면 STORM은 다관점 시뮬레이션 대화로 집필 전 단계 자체를 자동화한다
- [[agents/cemri-2025-why-do-multi-agent-llm-systems]]: SOTA 멀티에이전트 LLM 시스템 7종의 실패 모드를 분류한 MAST 연구. ARS가 frame-lock과 아부 문제로 개별 대응한 실패 유형을 체계적 분류로 다룬다
- [[agents/microsoft-skillopt]]: 스킬 문서를 학습 가능한 대상으로 다루는 SkillOpt. ARS와 마찬가지로 Claude Code 스킬을 프로덕션 단위로 취급하지만, ARS가 사람의 검증 게이트로 품질을 확보하는 데 비해 SkillOpt는 스킬 문서 자체의 자동 최적화를 노린다
