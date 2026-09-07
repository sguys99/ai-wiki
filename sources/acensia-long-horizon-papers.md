---
title: "long-horizon-papers"
type: repo
year: 2026
category: physical-ai
raw_path: raw/repos/acensia-long-horizon-papers.md
raw_filename: "acensia-long-horizon-papers.md"
source_collection: external
org: "acensia"
repo: "long-horizon-papers"
url: "https://github.com/acensia/long-horizon-papers"
license: "None (unlicensed)"
tags: [physical-ai, vla, manipulation, benchmark]
---

## 한 줄 요약 (One-line Summary)

long-horizon 과제를 다룬 논문 52편을 LLM agent, VLM planning, VLA manipulation 세 영역으로 나눠 정리한 큐레이션 저장소다. VLA 영역을 "긴 과제를 어떻게 끝까지 수행하는가"라는 하나의 질문에 대한 경쟁 답안으로 조직해 Hierarchical, Memory, WorldModel, Benchmarks, Recovery 다섯 폴더로 배열한 점이 이 목록의 조직 원리다.

## 1. 자료 정보 (Document Information)

- **레포**: `acensia/long-horizon-papers` (GitHub, 라이선스 미지정, 별 22개)
- **핵심 주제**: long-horizon 과제. long-horizon 과제는 여러 단계를 이어야 끝나는 긴 과제를 말한다
- **범위**: LLM agent, VLM(vision-language model) planning, VLA(vision-language-action) manipulation 세 영역. 2026년 연구가 중심이고 VLA 쪽은 2025년 기반 논문을 함께 담았다
- **구조**: 논문 한 편에 폴더 하나, 각 폴더에 `source.txt` 메타데이터 파일 하나. `source.txt`에는 논문 제목, 발표 시점, arXiv 링크, PDF 링크가 들어간다. PDF는 `.gitignore`로 제외돼 있고 `source.txt`의 `PDF:` 링크로 다시 받는 방식이다
- **상위 저장소**: `acensia/paper-shelf`의 submodule이며 같은 관례를 따른다
- **규모**: 논문 52편, 그중 PDF 확보 51편, 철회 1편(KLong)
- **시점**: 저장소 생성 2026년 6월, 마지막 push 2026년 7월. 트렌드 요약은 2026년 7월 기준으로 적혀 있다
- **README 구성**: 영역별 표 형식이다. 각 행은 발표 연월, 논문 제목과 한 줄 해설, arXiv 번호 링크로 이뤄진다

## 2. 주요 기여 (Key Contributions)

1. **질문 기준 분류**: VLA 논문을 주제가 아니라 "긴 과제를 어떻게 끝까지 수행하는가"에 대한 답으로 묶는다. 앞의 네 폴더는 실패하지 않기 위한 전략이고, `Recovery/`는 실패를 잘 처리하는 쪽의 새 흐름이다.
2. **HELM의 결함 분류를 조직 기준으로 채택**: HELM 논문이 실행 루프의 결함을 메모리, verification, recovery 세 가지로 이름 붙였다는 점을 인용하고, 앞의 세 폴더가 메모리 결함만 답하고 있다고 지적한다. `Recovery/` 폴더는 나머지 둘을 다루는 2026년 중반 연구 묶음이다.
3. **영역 간 연결**: LLM agent의 메모리 시스템 연구와 VLA의 메모리 연구를 한 저장소에 두어, 텍스트 실행 이력을 다루는 문제와 시각 실행 이력을 다루는 문제를 나란히 볼 수 있게 했다.
4. **논문 간 대비 관계 명시**: 해설에 "cf. Keyframe Chaining, VQ-Memory", "cf. Tool-Aligned VLA" 같은 참조를 달아 같은 폴더 안에서 경쟁하거나 보완하는 논문을 짚는다. μVLA를 "recurrence만으로 얼마나 되는지 보는 대조 실험"으로 지목하는 식이다.
5. **트렌드 요약**: 2026년 7월 기준으로 여섯 항목의 흐름 정리를 붙였다. 메모리 연구가 용량이 아니라 선별로 수렴하고 있다는 관찰과 world model 기반 예측 전략이 부정적 결과를 받았다는 관찰이 핵심이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 최상위 구성

세 영역으로 나뉘고 VLA만 다시 다섯 하위 폴더로 갈라진다.

| 영역 / 폴더 | 논문 수 | 초점 |
|---|---|---|
| `LLM/` | 12 | long-horizon agent의 메모리 시스템과 강화학습 |
| `VLM/` | 3 | long-horizon planning과 진행도 추정 |
| `VLA/Hierarchical/` | 8 | VLM planner와 VLA executor의 분업 |
| `VLA/Memory/` | 14 | policy 내부의 시간 컨텍스트 |
| `VLA/WorldModel/` | 8 | subgoal 상상과 시각 예측 |
| `VLA/Benchmarks/` | 4 | long-horizon manipulation 평가 |
| `VLA/Recovery/` | 3 | verification, 실패 감지, 교정 |

policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. VLA 다섯 폴더는 이 policy가 긴 과제 동안 성능을 유지하도록 만드는 서로 다른 처방이다.

### LLM 영역

12편 모두 2026년 논문이다. 두 흐름으로 갈린다.

- **메모리 시스템**: Agent Memory는 stateful long-horizon 워크로드를 시스템 관점에서 처음 특성화하고 네 항목의 분류를 세운다. Memex(RL)은 수백 단계에 걸친 워크플로를 위해 색인된 경험 메모리를 둔다. Continuum Memory Architectures는 장시간 워크플로용 메모리를 다룬다. Meta-Cognitive Memory Policy Optimization은 압축된 메모리만 주어졌을 때 모델이 latent 과제 상태를 얼마나 모르는지 재는 "Belief Entropy"를 제안한다.
- **강화학습과 평가**: Rethinking Agentic Reinforcement Learning은 long-horizon planning과 tool use에 초점을 둔 agentic LLM 강화학습을 다룬다. A Subgoal-driven Framework는 온라인 subgoal 분해와 함께 milestone 기반 dense reward로 학습하는 MiRA를 제시한다. subtask는 상위 추론이 텍스트로 내놓는 중간 단계 명령을 말한다.
- **벤치마크와 방법론**: YC-Bench는 agent가 가상의 스타트업을 1년 기간 동안 수백 턴에 걸쳐 운영하게 한다. Beyond pass@1은 신뢰성 관점의 평가 방법론을 제안한다. AgentLAB은 적응형 다중 턴 공격이라는 보안 관점에서 long-horizon agent를 시험한다.
- **그 밖**: The Y-Combinator for LLMs는 람다 계산으로 long-context rot 문제를 다루고, InfiAgent는 무한 지평 범용 자율 agent 프레임워크를 제안한다. KLong은 데이터 오류로 2026년 4월 저자가 철회했다.

### VLM 영역

3편으로 가장 작다. Goal2Skill은 구조화된 과제 메모리를 갖춘 VLM planner로, 사후 조건 검증과 reflection으로 실패를 진단한다. AgentVLN은 agent 관점의 vision-and-language navigation을 다룬다. Recurrent Reasoning with VLMs는 진행도 추정을 다단계 실행의 핵심 신호로 본다.

### VLA/Hierarchical

VLM planner를 위에 두고 VLA executor를 아래에 두는 분업 구조다. 8편이 서로 다른 인터페이스를 제안한다.

| 논문 | 인터페이스 설계 |
|---|---|
| Harness VLA (2026-07) | 메모리 기반 agent가 얼린 VLA와 해석적 primitive를 조합한다 |
| Cortex (2026-07) | 32개 표준 skill primitive와 subtask 전이의 처리 가능성 원칙으로 planner와 executor의 의미 간극을 정면으로 다룬다 |
| What Matters in Orchestrating Robot Policies (2026-06) | options 형식의 프레임워크로 planner와 controller 조합을 벤치마킹한다. 이 폴더의 서베이에 가장 가깝다 |
| VoLo (2026-06) | VLA와 WAM을 VLM이 실행 중간에 끼어들어 조종하는 중단 가능한 도구로 다룬다 |
| Tool-Aligned VLA (2026-05) | VLA를 도구로 보고 planning VLM이 한정된 VLA 실행을 호출한다. 도구 계열별 residual adapter를 둔다 |
| Anticipation-VLA (2026-05) | 하나의 멀티모달 모델을 예측 모델이자 value function으로 써서 subgoal을 만들고, 진행이 멈추면 subgoal을 갱신한다 |
| LoHo-Manip (2026-04) | 어떤 VLA 위에도 올릴 수 있는 과제 관리 VLM을 두고, trace로 조건화한 executor가 재계획을 암묵적으로 처리한다 |
| LiLo-VLA (2026-02) | 연결된 물체 중심 policy를 모듈로 두고 동적 재계획과 skill 재사용을 지원한다 |

### VLA/Memory

가장 큰 폴더로 14편이다. policy 안에 시간 컨텍스트를 넣는 방법들이며, 무엇을 남길지 고르는 기준에서 갈린다.

- **압축 방식**: NativeMEM은 VLA 자신의 vision encoder로 이력을 단일 토큰으로 압축해 외부 메모리 모듈을 두지 않는다. Efficient Long-Horizon VLA는 시각 토큰을 정적 성분과 동적 성분으로 분리해 context 길이를 줄인다. VQ-Memory는 과거 관절 상태를 VQ-VAE로 이산화해 모델에 무관한 시간 메모리를 만든다.
- **선별 방식**: EventVLA는 미래 keyframe 확률을 예측해 어떤 keyframe을 남길지 학습한다. keyframe은 실행 영상에서 장면이 크게 바뀌는 대표 시점을 말한다. Keyframe Chaining은 희소한 의미 keyframe 이력만 두고 수천 timestep 떨어진 사건을 함께 추론한다.
- **상태 유지 방식**: Chronos는 전체 이력에 선택적 SSM을 적용하는 물리 정보 기반 프레임워크다. S²-VLA는 belief state를 유지하며 실행 단계에 따라 시각, 언어, action feature의 융합을 조절한다. Recursive Belief VLA도 belief 갱신 계열이다. μVLA는 보조 손실 없이 recurrence만으로 얼마나 되는지 보는 대조 실험이다. partial observability는 로봇이 환경 상태의 일부만 볼 수 있는 조건을 가리킨다.
- **계층 구조**: HiMe는 고빈도 Executor, 작업 메모리 담당 Sentry, Planner로 나누고 "frequency-competence paradox"라는 이름을 붙인다. HELM은 실행 루프의 세 결함을 메모리, verification, recovery로 정리한다.
- **기반 연구**: MemoryVLA(2025-08)가 지각 인지 메모리 뱅크를 세운 출발점으로, 실세계 long-horizon 과제에서 26포인트 향상을 보고했다. EchoVLA(2025-11)는 모바일 manipulation용 선언적 메모리를 다루고, StemVLA는 미래 3D 공간 기하와 4D 이력 표현을 함께 쓴다.

### VLA/WorldModel

world model은 환경의 dynamics를 학습해 미래를 예측하는 모델이다. 이 폴더는 world model로 subgoal을 상상해 긴 과제를 끌고 가려는 8편을 모았다.

- Imagined Rollouts are Kinematic, Not Dynamic(2026-07)은 상상된 rollout이 동역학이 아니라 기구학 수준에서 실패한다는 것을 보인다. 저장소가 이 폴더에서 가장 날카로운 부정적 결과로 지목한 논문이다.
- Foresight(2026-06)는 과제 수준 라벨과 conformal threshold만으로 world model의 latent에서 실패를 감지한다.
- World Model for Robot Learning: A Comprehensive Survey(2026-05)는 VLA의 subgoal 생성을 "예측 분기"로 보고 네이티브 비디오 world model과 구분한다.
- Do World Action Models Generalize Better than VLAs?(2026-03)는 두 계열의 강건성을 비교한다.
- H-WM(2026-02)은 이해 전문가와 예측 전문가로 기호적 계획을 시각에 grounding된 subgoal로 대응시킨다. BagelVLA(2026-02)는 텍스트 추론과 시각 예측을 action 루프 안에 교차 배치한다.
- PALM(2026-01)은 미래 affordance 예측과 진행도 추정을 결합해 CALVIN과 LIBERO-LONG에서 최고 성능을 보고했다. affordance는 물체가 허용하는 상호작용 가능성을 뜻한다. DreamVLA(2025-07)는 포괄적 world knowledge를 갖춘 예측 분기를 둔 기반 연구다.

### VLA/Benchmarks

4편이며 평가 대상이 시뮬레이션 사슬에서 실세계와 메모리 탐침으로 옮겨가고 있다.

| 벤치마크 | 특징 |
|---|---|
| RoboDojo (2026-07) | 시뮬레이션과 실제 기기를 통합한 벤치마크. policy 30종을 일반화, 메모리, 정밀도, 지평 네 항목으로 평가한다 |
| LongBench (2026-04) | 시뮬레이션이 아닌 실세계 long-horizon 과제로 manipulation policy를 평가한다 |
| RoboMME (2026-03) | 16개 과제를 시간, 공간, 물체, 절차 메모리로 분류해 범용 policy의 메모리를 측정한다 |
| Long-VLA (2025-08) | 최초의 end-to-end long-horizon VLA. 단계 인식 입력 마스킹을 쓰고 L-CALVIN 벤치마크를 함께 내놨다 |

고전 기준선으로 CALVIN(subtask 5개 사슬)과 LIBERO-Long(long-horizon 과제 100개)을 든다.

### VLA/Recovery

가장 새로운 폴더로 3편이다. 긴 rollout이 잘못됐음을 알아차리고 처음부터 다시 시작하지 않으면서 바로잡는 문제를 다룬다. rollout은 policy를 실행해 trajectory를 만들어내는 과정이다.

- Diagnosing Semantic Handoff Failures(2026-07)는 실패 분류 논문이다. 개별로는 통과하는 skill이 사슬로 이어질 때 경계에서 깨진다는 것을 보인다.
- VLA-Corrector(2026-07)는 action chunk 실행 도중 시각적 이탈을 감지해 온라인 재계획을 촉발한다. action chunk는 policy가 한 번에 출력하는 여러 timestep 분량의 action 묶음이다.
- PhysReflect-VLA(2026-06)는 실행 시점 물리적 타당성 검사와 LLM reflection으로 오류를 교정한다.

저장소는 world model의 latent에서 실패를 감지하는 Foresight도 이 문제와 이어진다고 상호 참조한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README 해설에 적힌 수치와 판단은 다음과 같다.

| 항목 | 내용 |
|---|---|
| Goal2Skill | 성공률 32.4%로, 가장 강한 기준선 9.8%를 22.6%p 앞섰다 |
| MemoryVLA | 실세계 long-horizon 과제에서 26포인트 향상 |
| Cortex | 표준 skill primitive 32개 정의 |
| RoboDojo | policy 30종을 네 항목으로 평가 |
| RoboMME | 과제 16개를 메모리 유형 네 가지로 분류 |
| CALVIN | subtask 5개를 잇는 사슬 과제 |
| LIBERO-Long | long-horizon 과제 100개 |
| PALM | CALVIN과 LIBERO-LONG에서 최고 성능 |
| 저장소 규모 | 논문 52편, PDF 51편, 철회 1편 |

2026년 7월 기준 트렌드 요약은 여섯 항목이다.

1. **LLM 쪽 이동**: 프롬프트와 planning 요령에서 메모리 시스템과 milestone 기반 dense reward 강화학습으로 옮겨갔다.
2. **VLA 쪽 네 전략 경쟁**: VLM planner를 위에 두기, policy 안에 메모리를 넣기, world model로 subgoal을 상상하기, 단계 인식 기법을 쓴 end-to-end 네 가지가 경쟁한다. HELM의 결함 분류가 이를 조직하는 데 쓸 만한 관점이다.
3. **메모리는 용량이 아니라 선별로 수렴**: 2026년 6월부터 7월 사이의 EventVLA, NativeMEM, Chronos, HiMe는 이력을 더 많이 저장하는 문제가 아니라 무엇을 남길지 고르는 문제를 푼다. 학습된 keyframe 근거, 네이티브 인코더 압축, 선택적 상태 공간이 그 수단이다. μVLA는 순수 recurrence가 그중 얼마를 이미 제공하는지 재는 대조군이다.
4. **recovery가 새 전선**: 2026년 5월까지는 "실패하지 마라"가 답이었고, 6월부터 "실패를 알아차리고 고쳐라"로 옮겨갔다. handoff 실패 진단 논문은 손상이 skill 경계에 몰린다고 주장하는데, 이는 계층형 VLA가 만들어내는 이음매와 정확히 겹친다.
5. **world model 예측 전략의 후퇴**: Imagined Rollouts are Kinematic, Not Dynamic이 subgoal 상상 전략에 대한 명확한 부정적 결과를 냈다.
6. **벤치마크 이동**: 시뮬레이션 사슬(CALVIN)에서 메모리 탐침(RoboMME), 실세계(LongBench), 지평 항목을 명시한 시뮬레이션과 실제 기기 통합(RoboDojo)으로 옮겨가고 있다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **라이선스 미지정**: LICENSE 파일이 없다. 인용과 재배포 조건이 명시돼 있지 않으므로 개별 논문의 라이선스를 따로 확인해야 한다.
- **PDF 미포함**: `.gitignore`가 `*.pdf`를 제외해 저장소를 받아도 본문은 없다. 각 폴더의 `source.txt`에 담긴 링크로 다시 받아야 한다.
- **메타데이터 최소**: `source.txt`는 제목, 발표 시점, arXiv 링크, PDF 링크 네 줄 수준이다. 초록, 저자, 코드 링크, 태그가 없어 저장소 자체로는 검색성이 낮다.
- **시점 고정**: 트렌드 요약이 2026년 7월 기준이고 마지막 push도 같은 달이다. 이후 연구는 반영돼 있지 않다.
- **영역 간 불균형**: VLM 영역이 3편으로, LLM 12편과 VLA 37편에 비해 얇다. VLA/Recovery도 3편이라 저장소가 새 전선이라고 지목한 영역의 표본이 아직 적다.
- **철회 논문 포함**: KLong은 데이터 오류로 철회됐으나 목록에 남아 있다. 저장소는 철회 사실을 표시하는 방식으로 처리했다.
- **정량 비교 부재**: 논문 간 성능을 같은 자로 재는 표가 없다. 해설의 수치는 각 논문이 보고한 값이라 서로 비교할 수 없다.

## 6. 관련 연구 (Related Work)

- 상위 저장소 `acensia/paper-shelf`가 같은 폴더와 `source.txt` 관례를 공유한다.
- 저장소가 수록한 논문 중 이 wiki가 이미 보유한 자료는 두 편이다. Cortex(arXiv 2607.05377)와 World Model for Robot Learning: A Comprehensive Survey(arXiv 2605.00080)다.
- 같은 형식의 큐레이션 목록으로 `keon/awesome-physical-ai`와 `OpenHelix-robot/awesome-dual-system-VLA`가 이 wiki에 있다. 앞의 것은 Physical AI 전 영역을 16개 섹션으로 나눈 넓은 지도이고, 뒤의 것은 dual-system VLA라는 좁은 구조에 집중한다. 이 저장소는 long-horizon이라는 문제 하나를 기준으로 삼는다는 점에서 둘 사이에 놓인다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| frequency-competence paradox | HiMe가 붙인 이름으로, 제어 빈도를 높이면 판단 능력이 떨어지고 판단 능력을 높이면 제어 빈도가 떨어지는 상충을 가리킨다 |
| Belief Entropy | Meta-Cognitive Memory Policy Optimization의 지표로, 압축된 메모리만 주어졌을 때 모델이 latent 과제 상태를 얼마나 모르는지 잰다 |
| semantic handoff failure | 개별로는 통과하는 skill이 사슬로 이어질 때 경계에서 깨지는 실패 유형이다 |
| long-context rot | 실행이 길어질수록 context가 열화되는 현상으로, The Y-Combinator for LLMs가 다루는 문제다 |
| L-CALVIN | Long-VLA가 CALVIN을 확장해 내놓은 long-horizon 벤치마크다 |
| MiRA | A Subgoal-driven Framework의 학습 방법으로, milestone 기반 dense reward를 쓰는 강화학습이다 |
| source.txt | 이 저장소의 논문 폴더마다 하나씩 있는 메타데이터 파일로, 제목과 발표 시점과 arXiv 링크와 PDF 링크를 담는다 |
