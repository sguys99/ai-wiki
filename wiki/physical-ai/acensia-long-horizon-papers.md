---
title: "long-horizon-papers"
type: repo
year: 2026
category: physical-ai
source: acensia-long-horizon-papers.md
raw_path: raw/repos/acensia-long-horizon-papers.md
raw_filename: "acensia-long-horizon-papers.md"
source_collection: external
org: "acensia"
repo: "long-horizon-papers"
url: "https://github.com/acensia/long-horizon-papers"
license: "None (unlicensed)"
tags: [physical-ai, vla, manipulation, benchmark]
---

## 요약

`acensia/long-horizon-papers`는 long-horizon 과제를 다룬 논문 52편을 LLM agent, VLM planning, VLA manipulation 세 영역으로 나눠 정리한 큐레이션 저장소다. 2026년 연구가 중심이고, VLA 쪽은 2025년 기반 논문을 함께 담았다.

이 목록의 가치는 수록 편수가 아니라 조직 원리에 있다. 저장소는 VLA 영역을 "긴 과제를 어떻게 끝까지 수행하는가"라는 질문 하나에 대한 경쟁 답안으로 보고, 답안의 종류에 따라 Hierarchical, Memory, WorldModel, Benchmarks, Recovery 다섯 폴더로 나눈다. 앞의 네 폴더는 실패하지 않기 위한 전략이고, `Recovery/`는 실패를 잘 처리하려는 새 흐름이다. 논문 제목이나 발표처가 아니라 문제 해결 방식이 분류 기준이라서, 같은 폴더 안의 논문들은 서로 대안 관계로 읽힌다.

## 배경

long-horizon 과제가 별도 연구 주제가 된 이유는 단계가 늘어날수록 실패 지점도 함께 늘어나기 때문이다. long-horizon 과제는 여러 단계를 이어야 끝나는 긴 과제를 말한다. 서랍을 열고, 물건을 꺼내고, 서랍을 닫고, 물건을 다른 곳에 놓는 과제가 그 예다. 한 단계씩 떼어놓고 보면 모두 학습된 동작이지만, 이어 붙이면 성공률이 크게 낮아진다.

저장소는 이 문제를 HELM 논문의 분류로 정리한다. HELM은 실행 루프의 결함을 메모리, verification, recovery 세 가지로 이름 붙였다. 메모리는 단계가 바뀌면서 이전 맥락을 잃는 문제, verification은 지금 단계가 제대로 끝났는지 확인하지 못하는 문제, recovery는 잘못됐다는 것을 알고도 되돌리지 못하는 문제다.

저장소의 관찰은 이 세 결함 중 앞의 것만 답이 나와 있다는 것이다. Hierarchical, Memory, WorldModel 세 폴더는 모두 메모리 결함을 다루는 서로 다른 처방이고, verification과 recovery를 정면으로 다루는 연구는 2026년 6월 이후에야 `Recovery/` 폴더를 채우기 시작했다. 저장소가 정리한 흐름의 표현을 빌리면, 2026년 5월까지 이 분야의 답은 "실패하지 마라"였고 그 이후 "실패를 알아차리고 고쳐라"가 더해졌다.

## 핵심 개념

**policy**는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. VLA에서 policy는 카메라 이미지와 자연어 지시문(instruction)을 받아 로봇의 제어 명령을 낸다. 이 저장소의 다섯 폴더는 policy가 긴 과제 동안 성능을 유지하도록 만드는 서로 다른 방법이다.

**subtask**는 상위 추론이 텍스트로 내놓는 중간 단계 명령을 말한다. "서랍에서 컵을 꺼내 식탁에 놓아라"라는 지시문은 "서랍을 연다", "컵을 집는다", "식탁으로 옮긴다", "컵을 놓는다" 같은 subtask로 나뉜다. 계층형 구조는 이 분해를 명시적으로 수행하고, end-to-end 구조는 분해 없이 하나의 모델이 처리한다.

**action chunk**는 policy가 한 번에 출력하는 여러 timestep 분량의 action 묶음이다. 매 프레임 새 명령을 내지 않고 묶음 단위로 내보내면 제어가 매끄러워지지만, 묶음을 실행하는 동안에는 새 입력을 반영하지 못한다. `Recovery/` 폴더의 VLA-Corrector가 다루는 문제가 정확히 이 구간이다.

**world model**은 환경의 dynamics를 학습해 미래를 예측하는 모델이다. `WorldModel/` 폴더는 이 예측 능력으로 다음 subgoal의 모습을 미리 그려보고 그것을 목표로 삼는 전략을 모았다.

**keyframe**은 실행 영상에서 장면이 크게 바뀌는 대표 시점을 말한다. 긴 실행 이력을 전부 모델에 넣을 수 없으므로, 어떤 시점을 남기고 어떤 시점을 버릴지가 `Memory/` 폴더의 중심 문제가 된다.

**partial observability**는 로봇이 환경 상태의 일부만 볼 수 있는 조건을 가리킨다. 서랍 안을 이미 확인했다는 사실은 현재 카메라 이미지에 남아 있지 않으므로, policy는 이력을 기억하지 못하면 같은 확인을 반복하거나 잘못된 판단을 내린다.

## 저장소 구성

논문 한 편에 폴더 하나를 두고, 각 폴더에 `source.txt` 파일 하나만 넣는 단순한 구조다. `source.txt`는 논문 제목, 발표 시점, arXiv 링크, PDF 링크 네 줄 수준으로 이뤄진다. 예를 들어 MemoryVLA 폴더의 `source.txt`는 제목과 "arXiv preprint (Aug 2025)"라는 시점, 그리고 초록 페이지와 PDF의 두 링크를 담는다.

PDF 본문은 저장소에 없다. `.gitignore`가 `*.pdf`를 제외하고 있어서, 저장소를 받아도 각 폴더에는 `source.txt`만 남는다. 본문이 필요하면 그 링크로 다시 받는 방식이며, 이는 상위 저장소인 `acensia/paper-shelf`의 관례를 그대로 따른 것이다.

| 항목 | 값 |
|---|---|
| 논문 수 | 52편 |
| PDF 확보 | 51편 |
| 철회 | 1편 (KLong, 2026년 4월 데이터 오류로 철회) |
| 저장소 생성 | 2026년 6월 |
| 마지막 push | 2026년 7월 |
| 라이선스 | 미지정 (LICENSE 파일 없음) |
| 상위 저장소 | `acensia/paper-shelf`의 submodule |

## 분류 체계

### 세 영역과 다섯 하위 폴더

최상위는 세 영역이고, VLA만 다시 다섯으로 갈린다.

| 영역 / 폴더 | 논문 수 | 초점 |
|---|---|---|
| `LLM/` | 12 | long-horizon agent의 메모리 시스템과 강화학습 |
| `VLM/` | 3 | long-horizon planning과 진행도 추정 |
| `VLA/Hierarchical/` | 8 | VLM planner와 VLA executor의 분업 |
| `VLA/Memory/` | 14 | policy 내부의 시간 컨텍스트 |
| `VLA/WorldModel/` | 8 | subgoal 상상과 시각 예측 |
| `VLA/Benchmarks/` | 4 | long-horizon manipulation 평가 |
| `VLA/Recovery/` | 3 | verification, 실패 감지, 교정 |

VLA가 37편으로 전체의 71%를 차지한다. 이 저장소를 physical-ai 자료로 보는 근거이며, LLM과 VLM 영역은 같은 문제를 다른 modality에서 다루는 참조 축으로 놓여 있다.

### LLM 영역

12편 모두 2026년 논문이고, 메모리 시스템과 강화학습 두 흐름으로 갈린다.

메모리 쪽에서는 실행 이력을 어떻게 저장하고 꺼내 쓸지가 문제다. Agent Memory는 stateful long-horizon 워크로드를 시스템 관점에서 처음 특성화하고 네 항목의 분류를 세운다. Memex(RL)은 수백 단계에 걸친 워크플로를 위해 색인된 경험 메모리를 둔다. Continuum Memory Architectures도 장시간 워크플로용 메모리를 다룬다.

Meta-Cognitive Memory Policy Optimization은 조금 다른 각도에서 접근한다. 압축된 메모리만 주어졌을 때 모델이 latent 과제 상태를 얼마나 모르는지 재는 "Belief Entropy"를 두어, 메모리 압축의 손실을 정량화한다.

강화학습 쪽에서는 긴 실행에 reward를 어떻게 줄지가 문제다. reward는 policy가 얼마나 잘했는지를 알려주는 스칼라 신호다. 수백 턴이 지난 뒤 성공 여부만 알려주면 학습 신호가 너무 희박하므로, A Subgoal-driven Framework는 온라인 subgoal 분해와 함께 milestone 기반 dense reward로 학습하는 MiRA를 제시한다. Rethinking Agentic Reinforcement Learning은 long-horizon planning과 tool use에 초점을 둔 agentic LLM 강화학습을 다룬다.

평가와 그 밖의 연구는 다음과 같다.

- **YC-Bench**: agent가 가상의 스타트업을 1년 기간 동안 수백 턴에 걸쳐 운영하게 한다.
- **Beyond pass@1**: 단발 성공률 대신 신뢰성 관점의 평가 방법론을 제안한다.
- **AgentLAB**: 적응형 다중 턴 공격이라는 보안 관점에서 long-horizon agent를 시험한다.
- **The Y-Combinator for LLMs**: 람다 계산으로 long-context rot 문제를 다룬다.
- **InfiAgent**: 무한 지평 범용 자율 agent 프레임워크를 제안한다.
- **KLong**: 데이터 오류로 2026년 4월 저자가 철회했으며, 목록에는 철회 표시와 함께 남아 있다.

### VLM 영역

3편으로 가장 얇다. Goal2Skill은 구조화된 과제 메모리를 갖춘 VLM planner로, 사후 조건 검증과 reflection으로 실패를 진단한다. AgentVLN은 agent 관점의 vision-and-language navigation을 다룬다. Recurrent Reasoning with VLMs는 진행도 추정을 다단계 실행의 핵심 신호로 본다.

세 편 모두 "지금 어디까지 왔는가"를 판단하는 문제로 수렴한다. 이는 `Recovery/` 폴더의 문제의식과 이어진다.

### VLA/Hierarchical

VLM planner를 위에 두고 VLA executor를 아래에 두는 분업 구조다. 8편의 차이는 두 층을 무엇으로 잇느냐에 있다.

| 논문 | 발표 | 인터페이스 설계 |
|---|---|---|
| Harness VLA | 2026-07 | 메모리 기반 agent가 얼린 VLA와 해석적 primitive를 조합한다 |
| Cortex | 2026-07 | 32개 표준 skill primitive와 subtask 전이의 처리 가능성 원칙으로 planner와 executor의 의미 간극을 정면으로 다룬다 |
| What Matters in Orchestrating Robot Policies | 2026-06 | options 형식의 프레임워크로 planner와 controller 조합을 벤치마킹한다. 이 폴더의 서베이에 가장 가깝다 |
| VoLo | 2026-06 | VLA와 WAM을 VLM이 실행 중간에 끼어들어 조종하는 중단 가능한 도구로 다룬다 |
| Tool-Aligned VLA | 2026-05 | VLA를 도구로 보고 planning VLM이 한정된 VLA 실행을 호출한다. 도구 계열별 residual adapter를 둔다 |
| Anticipation-VLA | 2026-05 | 하나의 멀티모달 모델을 예측 모델이자 value function으로 써서 subgoal을 만들고, 진행이 멈추면 subgoal을 갱신한다 |
| LoHo-Manip | 2026-04 | 어떤 VLA 위에도 올릴 수 있는 과제 관리 VLM을 두고, trace로 조건화한 executor가 재계획을 암묵적으로 처리한다 |
| LiLo-VLA | 2026-02 | 연결된 물체 중심 policy를 모듈로 두고 동적 재계획과 skill 재사용을 지원한다 |

인터페이스 설계는 두 가지 방향으로 나뉜다. 하나는 VLA를 그대로 두고 위에서 호출만 하는 방식으로, Tool-Aligned VLA와 VoLo와 Harness VLA가 여기 속한다. VLA는 얼린 채 도구처럼 쓰이고 planner가 호출 시점과 중단 시점을 정한다. 다른 하나는 executor 쪽을 조건화해 상위 의도를 받아들이게 만드는 방식으로, LoHo-Manip의 trace 조건화와 LiLo-VLA의 물체 중심 모듈이 여기 속한다.

Cortex는 이 폴더가 만들어낸 문제를 이름으로 짚은 논문이다. planner가 내놓는 subtask의 의미와 executor가 실제로 수행할 수 있는 동작 사이에 간극이 있으며, 표준 primitive 집합과 전이 조건으로 그 간극을 좁힌다는 접근이다.

### VLA/Memory

가장 큰 폴더로 14편이다. 계층 구조를 두는 대신 policy 자체가 시간 컨텍스트를 갖게 만드는 방향이며, 무엇을 남길지 정하는 기준에서 갈린다.

**압축 방식**은 이력을 작게 만들어 통째로 넣는다. NativeMEM은 VLA 자신의 vision encoder로 이력을 단일 토큰으로 압축해 외부 메모리 모듈을 두지 않는다. Efficient Long-Horizon VLA는 시각 토큰을 정적 성분과 동적 성분으로 분리해 context 길이를 줄인다. VQ-Memory는 과거 관절 상태를 VQ-VAE로 이산화해 모델에 무관한 시간 메모리를 만든다.

**선별 방식**은 남길 시점을 고른다. EventVLA는 미래 keyframe 확률을 예측해 어떤 keyframe을 남길지 학습한다. Keyframe Chaining은 희소한 의미 keyframe 이력만 두고 수천 timestep 떨어진 사건을 함께 추론한다.

**상태 유지 방식**은 이력 대신 요약된 상태를 이어간다. Chronos는 전체 이력에 선택적 SSM을 적용하는 물리 정보 기반 프레임워크다. S²-VLA는 belief state를 유지하며 실행 단계에 따라 시각, 언어, action feature의 융합을 조절한다. Recursive Belief VLA도 belief 갱신 계열이다.

**계층 구조**를 policy 안으로 들여온 연구도 있다. HiMe는 고빈도 Executor, 작업 메모리를 담당하는 Sentry, Planner로 나누고 "frequency-competence paradox"라는 이름을 붙인다. 빠르게 반응하려면 판단이 얕아지고 판단을 깊게 하려면 반응이 느려진다는 상충이다. HELM은 앞서 본 세 결함 분류를 제시한 논문으로 이 폴더에 놓여 있다.

μVLA는 이 폴더에서 대조 실험의 위치에 있다. 보조 손실 없이 recurrence만 두었을 때 무엇이 얻어지는지를 재는 연구이며, 위의 정교한 설계들이 실제로 얼마를 더하는지 판단할 기준선이 된다.

기반 연구는 셋이다. MemoryVLA(2025년 8월)가 지각 인지 메모리 뱅크를 세운 출발점으로, 실세계 long-horizon 과제에서 26포인트 향상을 보고했다. EchoVLA(2025년 11월)는 모바일 manipulation용 선언적 메모리를 다루고, StemVLA는 미래 3D 공간 기하와 4D 이력 표현을 함께 쓴다.

### VLA/WorldModel

world model로 다음 장면을 그려보고 그것을 목표로 삼는 전략이다. 8편 중 세 편이 이 전략의 한계를 다룬다는 점이 이 폴더의 특징이다.

| 논문 | 발표 | 내용 |
|---|---|---|
| Imagined Rollouts are Kinematic, Not Dynamic | 2026-07 | 상상된 rollout이 동역학이 아니라 기구학 수준에서 실패함을 보인다. 저장소가 이 폴더에서 가장 날카로운 부정적 결과로 지목했다 |
| Foresight | 2026-06 | 과제 수준 라벨과 conformal threshold만으로 world model의 latent에서 실패를 감지한다 |
| World Model for Robot Learning: A Comprehensive Survey | 2026-05 | VLA의 subgoal 생성을 "예측 분기"로 보고 네이티브 비디오 world model과 구분한다 |
| Do World Action Models Generalize Better than VLAs? | 2026-03 | 두 계열의 강건성을 비교한다 |
| H-WM | 2026-02 | 이해 전문가와 예측 전문가로 기호적 계획을 시각에 grounding된 subgoal로 대응시킨다 |
| BagelVLA | 2026-02 | 텍스트 추론과 시각 예측을 action 루프 안에 교차 배치한다 |
| PALM | 2026-01 | 미래 affordance 예측과 진행도 추정을 결합해 CALVIN과 LIBERO-LONG에서 최고 성능을 보고했다 |
| DreamVLA | 2025-07 | 포괄적 world knowledge를 갖춘 예측 분기를 둔 기반 연구다 |

rollout은 policy를 실행해 trajectory를 만들어내는 과정이다. affordance는 물체가 허용하는 상호작용 가능성을 뜻한다.

Imagined Rollouts are Kinematic, Not Dynamic의 진단은 이 폴더 전체에 걸린다. 생성된 미래 장면이 물체의 위치 변화는 그럴듯하게 그리지만 힘과 접촉 같은 동역학은 반영하지 못한다면, 그 장면을 목표로 삼은 policy는 물리적으로 불가능한 상태를 좇게 된다. Foresight는 같은 latent를 예측이 아니라 실패 감지에 쓴다는 점에서 방향이 다르며, 이 때문에 저장소는 Foresight를 `Recovery/` 폴더와도 상호 참조한다.

### VLA/Benchmarks

4편이며, 평가 대상이 시뮬레이션 사슬에서 실세계와 메모리 측정으로 옮겨가는 흐름을 보여준다.

| 벤치마크 | 발표 | 특징 |
|---|---|---|
| RoboDojo | 2026-07 | 시뮬레이션과 실제 기기를 통합한 벤치마크. policy 30종을 일반화, 메모리, 정밀도, 지평 네 항목으로 평가한다 |
| LongBench | 2026-04 | 시뮬레이션이 아닌 실세계 long-horizon 과제로 manipulation policy를 평가한다 |
| RoboMME | 2026-03 | 16개 과제를 시간, 공간, 물체, 절차 메모리로 분류해 범용 policy의 메모리를 측정한다 |
| Long-VLA | 2025-08 | 최초의 end-to-end long-horizon VLA. 단계 인식 입력 마스킹을 쓰고 L-CALVIN 벤치마크를 함께 내놨다 |

고전 기준선은 CALVIN과 LIBERO-Long이다. CALVIN은 subtask 5개를 잇는 사슬 과제이고, LIBERO-Long은 long-horizon 과제 100개로 이뤄진다. 두 벤치마크가 모두 시뮬레이션이라는 점이 이후 벤치마크가 실세계와 메모리 측정으로 옮겨간 배경이다. RoboDojo가 지평을 독립된 평가 항목으로 명시한 것은 long-horizon 성능이 일반화 성능과 별개로 측정돼야 한다는 판단을 담고 있다.

### VLA/Recovery

가장 새로운 폴더로 3편이다. 긴 rollout이 잘못됐음을 알아차리고, 처음부터 다시 시작하지 않으면서 바로잡는 문제를 다룬다.

- **Diagnosing Semantic Handoff Failures** (2026-07): 실패 분류 논문이다. 개별로는 통과하는 skill이 사슬로 이어질 때 경계에서 깨진다는 것을 보인다.
- **VLA-Corrector** (2026-07): action chunk 실행 도중 시각적 이탈을 감지해 온라인 재계획을 촉발한다.
- **PhysReflect-VLA** (2026-06): 실행 시점 물리적 타당성 검사와 LLM reflection으로 오류를 교정한다.

handoff 실패 진단 논문의 주장은 앞의 폴더들과 맞물린다. 손상이 skill 경계에 몰린다면, 계층형 VLA가 subtask를 나누면서 만들어내는 이음매가 곧 취약 지점이 된다. 계층 구조로 긴 과제를 다루기 쉽게 만드는 대신 새로운 실패 유형을 들여오는 셈이다.

## 저장소가 정리한 흐름

README 끝에 2026년 7월 기준 트렌드 요약이 여섯 항목으로 붙어 있다.

1. **LLM 쪽 이동**: 프롬프트와 planning 요령에서 메모리 시스템과 milestone 기반 dense reward 강화학습으로 옮겨갔다.
2. **VLA 쪽 네 전략 경쟁**: VLM planner를 위에 두기, policy 안에 메모리를 넣기, world model로 subgoal을 상상하기, 단계 인식 기법을 쓴 end-to-end 네 가지가 경쟁한다. HELM의 결함 분류가 이를 조직하는 데 쓸 만한 관점이다.
3. **메모리는 용량이 아니라 선별로 수렴**: 2026년 6월부터 7월 사이의 EventVLA, NativeMEM, Chronos, HiMe는 이력을 더 많이 저장하는 문제가 아니라 무엇을 남길지 고르는 문제를 푼다. 학습된 keyframe 근거, 네이티브 인코더 압축, 선택적 상태 공간이 그 수단이다. μVLA는 순수 recurrence가 그중 얼마를 이미 제공하는지 재는 대조군이다.
4. **recovery가 새 전선**: 2026년 5월까지 이 분야의 답은 "실패하지 마라"였고, 6월부터 "실패를 알아차리고 고쳐라"가 더해졌다.
5. **world model 예측 전략의 후퇴**: Imagined Rollouts are Kinematic, Not Dynamic이 subgoal 상상 전략에 대한 명확한 부정적 결과를 냈다.
6. **벤치마크 이동**: 시뮬레이션 사슬(CALVIN)에서 메모리 측정(RoboMME), 실세계(LongBench), 지평 항목을 명시한 시뮬레이션과 실제 기기 통합(RoboDojo)으로 옮겨가고 있다.

이 여섯 항목은 서로 이어진다. 메모리가 선별 문제로 좁혀지고 world model 예측이 부정적 결과를 받은 상황에서, 남은 방향이 실패를 사후에 처리하는 쪽이라는 구도다.

## 대표 수치

README 해설이 인용한 수치는 다음과 같다.

| 항목 | 값 |
|---|---|
| Goal2Skill 성공률 | 32.4% (가장 강한 기준선 9.8% 대비 22.6%p 높음) |
| MemoryVLA 향상폭 | 실세계 long-horizon 과제에서 26포인트 |
| Cortex 표준 primitive | 32개 |
| RoboDojo 평가 대상 | policy 30종, 네 항목 |
| RoboMME 과제 수 | 16개, 메모리 유형 네 가지 |
| CALVIN | subtask 5개 사슬 |
| LIBERO-Long | long-horizon 과제 100개 |

이 수치들은 각 논문이 자기 실험 조건에서 보고한 값이라 서로 비교할 수 없다. Goal2Skill의 32.4%와 MemoryVLA의 26포인트는 과제 집합도 기준선도 다르다. 저장소가 논문 간 성능을 같은 자로 재는 표를 두지 않은 이유이기도 하다.

Goal2Skill의 수치는 이 분야의 난이도를 보여준다는 점에서 읽을 만하다. 가장 강한 기준선이 9.8%에 그쳤다는 것은 long-horizon manipulation이 아직 대부분의 시도에서 실패하는 단계에 있다는 뜻이다.

## 저장소 보유 자료와의 대응

수록 논문 52편 중 이 wiki가 본문까지 보유한 자료는 두 편이다.

| 저장소 항목 | arXiv | 이 wiki의 페이지 |
|---|---|---|
| Cortex (`VLA/Hierarchical/`) | 2607.05377 | [[physical-ai/peng-2026-cortex-a-bidirectionally-aligned-embodied]] |
| World Model for Robot Learning: A Comprehensive Survey (`VLA/WorldModel/`) | 2605.00080 | [[physical-ai/hou-2026-world-model-for-robot-learning]] |

두 편이 서로 다른 폴더에 속한다는 점이 유용하다. Cortex 페이지는 계층형 구조에서 planner와 executor를 잇는 문제를 자세히 다루고, world model 서베이 페이지는 예측 기반 전략의 전체 지형을 다룬다. 이 저장소의 다섯 폴더 중 둘의 내부를 이미 들여다볼 수 있다는 뜻이다.

같은 형식의 큐레이션 목록으로는 [[physical-ai/keon-awesome-physical-ai]]와 [[physical-ai/openhelix-robot-awesome-dual-system-vla]]가 있다. 세 목록은 범위가 서로 다르다.

| 목록 | 분류 기준 | 범위 |
|---|---|---|
| `keon/awesome-physical-ai` | 방법 계열 (16개 최상위 섹션) | Physical AI 전 영역 |
| `acensia/long-horizon-papers` | 문제 해결 전략 (7개 폴더) | long-horizon 과제 하나 |
| `OpenHelix-robot/awesome-dual-system-VLA` | 구조 판정 기준 | dual-system VLA 하나 |

이 저장소는 넓은 지도와 좁은 구조 목록 사이에 놓인다. 문제 하나를 기준으로 삼되 그 문제를 세 modality에 걸쳐 따라간다는 점이 다른 두 목록과의 차이다.

## 한계

- **라이선스 미지정**: LICENSE 파일이 없다. 인용과 재배포 조건이 명시돼 있지 않으므로 개별 논문의 라이선스를 따로 확인해야 한다.
- **PDF 미포함**: `.gitignore`가 `*.pdf`를 제외해 저장소를 받아도 본문은 없다. 각 폴더의 `source.txt` 링크로 다시 받아야 한다.
- **메타데이터 최소**: `source.txt`는 네 줄 수준이다. 초록, 저자, 코드 링크, 태그가 없어 저장소 자체로는 검색성이 낮다. 실질적인 정보는 README 표의 한 줄 해설에 집중돼 있다.
- **시점 고정**: 트렌드 요약과 마지막 push가 모두 2026년 7월이다. 이후 연구는 반영돼 있지 않으며, 저장소가 "새 전선"으로 지목한 `Recovery/`가 그 뒤로 어떻게 전개됐는지는 알 수 없다.
- **영역 간 불균형**: VLM 영역이 3편이고 `VLA/Recovery/`도 3편이다. 저장소가 중요하다고 지목한 영역의 표본이 아직 적어, 분류의 무게와 수록 편수가 어긋난다.
- **정량 비교 부재**: 논문 간 성능을 같은 조건에서 비교한 표가 없다. 어느 전략이 실제로 우세한지는 이 목록만으로 판단할 수 없고, RoboDojo 같은 통합 벤치마크의 결과를 따로 봐야 한다.
- **철회 논문 포함**: KLong은 철회됐으나 목록에 남아 있다. 표시는 돼 있지만 편수 집계에는 포함된다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| frequency-competence paradox | HiMe가 붙인 이름으로, 제어 빈도를 높이면 판단 능력이 떨어지고 판단 능력을 높이면 제어 빈도가 떨어지는 상충을 가리킨다 |
| Belief Entropy | Meta-Cognitive Memory Policy Optimization의 지표로, 압축된 메모리만 주어졌을 때 모델이 latent 과제 상태를 얼마나 모르는지 잰다 |
| semantic handoff failure | 개별로는 통과하는 skill이 사슬로 이어질 때 경계에서 깨지는 실패 유형이다 |
| long-context rot | 실행이 길어질수록 context가 열화되는 현상으로, The Y-Combinator for LLMs가 다루는 문제다 |
| L-CALVIN | Long-VLA가 CALVIN을 확장해 내놓은 long-horizon 벤치마크다 |
| source.txt | 이 저장소의 논문 폴더마다 하나씩 있는 메타데이터 파일로, 제목과 발표 시점과 arXiv 링크와 PDF 링크를 담는다 |

## 관련 페이지

- [[physical-ai/peng-2026-cortex-a-bidirectionally-aligned-embodied]]: 이 저장소 `VLA/Hierarchical/` 폴더의 수록 논문. 표준 skill primitive로 planner와 executor의 의미 간극을 다룬다
- [[physical-ai/hou-2026-world-model-for-robot-learning]]: 이 저장소 `VLA/WorldModel/` 폴더의 수록 논문. world model 기반 로봇 학습의 전체 지형을 정리한 서베이다
- [[physical-ai/keon-awesome-physical-ai]]: Physical AI 전 영역을 16개 섹션으로 나눈 넓은 큐레이션 목록. 방법 계열이 분류 기준이다
- [[physical-ai/openhelix-robot-awesome-dual-system-vla]]: dual-system VLA 하나에 집중한 좁은 큐레이션 목록. 계층 구조를 다루는 점에서 `VLA/Hierarchical/`과 겹친다
- [[physical-ai/cui-2025-openhelix-a-short-survey-empirical]]: dual-system VLA의 구성 요소를 실험으로 분해한 연구. 상위 모델과 하위 policy를 잇는 방법을 다룬다
- [[overviews/physical-ai-overview]]: 이 저장소가 속한 physical-ai 도메인의 종합 페이지
- [[overviews/glossary-physical-ai]]: long-horizon, policy, action chunk 등 이 페이지가 쓴 용어의 canonical 표기
