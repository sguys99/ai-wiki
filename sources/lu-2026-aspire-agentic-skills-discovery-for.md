---
title: "ASPIRE: Agentic /Skills Discovery for Robotics"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/lu-2026-aspire-agentic-skills-discovery-for.pdf
raw_filename: "lu-2026-aspire-agentic-skills-discovery-for.pdf"
source_collection: external
authors: "Runyu Lu·Yubo Wu·Ethan Kou (공동 1저자) 외. NVIDIA·UMich·UIUC·UC Berkeley·CMU. 프로젝트 리드 Runyu Lu·Yuke Zhu·Linxi 'Jim' Fan·Guanzhi Wang"
url: "https://research.nvidia.com/labs/gear/aspire/"
tags: [physical-ai, robot-learning, manipulation, sim2real]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/lu-2026-aspire-agentic-skills-discovery-for/fig01.png
    raw: raw/papers/lu-2026-aspire-agentic-skills-discovery-for-figures/fig01.png
    caption: "ASPIRE 시스템 전체 구조. robot execution engine이 multimodal trace를 내보내고, coordinator가 과제마다 actor agent를 배정해 iterative debugging과 evolutionary search를 실행한다. 검증된 수정은 skill library에 쌓여 다음 actor에게 in-context guidance로 제공되고, 시뮬레이션에서 발견한 skill은 실제 로봇으로도 전이된다"
    page: 2
    bbox_norm: [0.0947, 0.0939, 0.9094, 0.4493]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/lu-2026-aspire-agentic-skills-discovery-for/fig02.png
    raw: raw/papers/lu-2026-aspire-agentic-skills-discovery-for-figures/fig02.png
    caption: "trace 기반 디버깅 사례. BEHAVIOR-1K 라디오 집기 과제에서 (a) ego-view 키프레임, (b) primitive trace가 반복된 PLANNING_ERROR를 지목하고, (c) 에이전트가 접근 각도를 바꾸는 코드를 작성해 성공한 뒤 그 수정이 Multi-Angle Approach skill로 승격된다"
    page: 4
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.4109]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/lu-2026-aspire-agentic-skills-discovery-for/fig03.png
    raw: raw/papers/lu-2026-aspire-agentic-skills-discovery-for-figures/fig03.png
    caption: "skill library 구성. 위쪽은 localization, motion primitive, navigation 대표 항목의 문제와 적용 조건과 코드 스케치, 가운데는 6개 범주로 확장된 라이브러리 전경, 아래는 시뮬레이션에서 발견해 실제 로봇으로 옮긴 4개 skill"
    page: 5
    bbox_norm: [0.0559, 0.1578, 0.917, 0.7074]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/lu-2026-aspire-agentic-skills-discovery-for/fig04.png
    raw: raw/papers/lu-2026-aspire-agentic-skills-discovery-for-figures/fig04.png
    caption: "세 벤치마크 성능 비교. (a) LIBERO-Pro 세 suite의 Pos와 Task 항목, (b) Robosuite 7개 과제, (c) BEHAVIOR-1K 두 가사 과제. 상당수 항목에서 사람이 작성한 프로그램(Human)을 넘어선다"
    page: 8
    bbox_norm: [0.0927, 0.0939, 0.9055, 0.6386]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/lu-2026-aspire-agentic-skills-discovery-for/fig05.png
    raw: raw/papers/lu-2026-aspire-agentic-skills-discovery-for-figures/fig05.png
    caption: "LIBERO-Pro Long zero-shot 전이. (a) N=90 라이브러리와 베이스라인 비교, (b) 라이브러리 크기 N이 커질수록 Pos와 Task 성공률이 함께 상승한다"
    page: 9
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3343]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/lu-2026-aspire-agentic-skills-discovery-for/fig06.png
    raw: raw/papers/lu-2026-aspire-agentic-skills-discovery-for-figures/fig06.png
    caption: "ablation. (a)(b) 누적 막대가 기본 시스템, execution engine 추가분, evolutionary search 추가분을 구분해 보여준다. (c) evolutionary search 회차별 평균 성공률"
    page: 11
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.2346]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/lu-2026-aspire-agentic-skills-discovery-for/fig07.png
    raw: raw/papers/lu-2026-aspire-agentic-skills-discovery-for-figures/fig07.png
    caption: "디버깅 범주 skill 예시. 한 번의 실패는 잡음이고 두 번 이상 반복되면 라이브러리 항목 후보라는 Failure Pattern 항목"
    page: 17
    bbox_norm: [0.1144, 0.2039, 0.8856, 0.3938]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/lu-2026-aspire-agentic-skills-discovery-for/fig08.png
    raw: raw/papers/lu-2026-aspire-agentic-skills-discovery-for-figures/fig08.png
    caption: "localization 범주 skill 예시. SAM3가 'front bowl' 같은 공간 수식어를 이해하지 못하는 문제를 축 정렬 후 인덱싱으로 해결하는 Multi-Object Disambiguation 항목"
    page: 17
    bbox_norm: [0.1144, 0.4532, 0.8856, 0.6425]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/lu-2026-aspire-agentic-skills-discovery-for/fig09.png
    raw: raw/papers/lu-2026-aspire-agentic-skills-discovery-for-figures/fig09.png
    caption: "navigation 범주 skill 예시. 직선 접근이 PLANNING_ERROR를 낼 때 접근 벡터를 5개 각도로 회전시키는 Multi-Angle Approach 항목의 문제와 조건과 코드"
    page: 18
    bbox_norm: [0.1144, 0.0939, 0.8856, 0.3186]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/lu-2026-aspire-agentic-skills-discovery-for/fig10.png
    raw: raw/papers/lu-2026-aspire-agentic-skills-discovery-for-figures/fig10.png
    caption: "grasping 범주 skill 예시. 와인병이 grasping 중 넘어지는 문제를 OBB 장축 정렬과 2단 폐합으로 해결하는 Bottle 항목"
    page: 18
    bbox_norm: [0.1144, 0.378, 0.8856, 0.5849]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/lu-2026-aspire-agentic-skills-discovery-for/fig11.png
    raw: raw/papers/lu-2026-aspire-agentic-skills-discovery-for-figures/fig11.png
    caption: "motion primitive 범주 skill 예시. 2cm 미만 납작한 물체는 집는 대신 바닥면을 따라 미는 Linear Push 항목"
    page: 18
    bbox_norm: [0.1144, 0.6444, 0.8856, 0.8344]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/lu-2026-aspire-agentic-skills-discovery-for/fig12.png
    raw: raw/papers/lu-2026-aspire-agentic-skills-discovery-for-figures/fig12.png
    caption: "scene reasoning 범주 skill 예시. 길쭉한 물체는 OBB 장축과 단축 중 어느 쪽에 그리퍼를 맞출지가 성패를 가른다는 OBB Axis Semantics 항목"
    page: 19
    bbox_norm: [0.1144, 0.0939, 0.8856, 0.2838]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/lu-2026-aspire-agentic-skills-discovery-for/tab01.png
    raw: raw/papers/lu-2026-aspire-agentic-skills-discovery-for-figures/tab01.png
    caption: "실제 로봇 cross-embodiment skill 전이. 3개 과제에서 skill 검색 유무에 따른 토큰 소모와 성공률 비교"
    page: 10
    bbox_norm: [0.0799, 0.1829, 0.9221, 0.3021]
    strategy: manual
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/lu-2026-aspire-agentic-skills-discovery-for/tab02.png
    raw: raw/papers/lu-2026-aspire-agentic-skills-discovery-for-figures/tab02.png
    caption: "LIBERO-Pro 정량 수치. libero-object, libero-goal, libero-spatial 세 suite의 Pos와 Task 항목과 Overall"
    page: 20
    bbox_norm: [0.2128, 0.2916, 0.7872, 0.4166]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/lu-2026-aspire-agentic-skills-discovery-for/tab03.png
    raw: raw/papers/lu-2026-aspire-agentic-skills-discovery-for-figures/tab03.png
    caption: "Robosuite 7개 과제 성공률. two_arm_handover가 0.20에서 0.92로 오르고 two_arm_lift는 0.74에서 0.71로 내려간다"
    page: 20
    bbox_norm: [0.28, 0.5, 0.712, 0.655]
    strategy: manual
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/lu-2026-aspire-agentic-skills-discovery-for/tab04.png
    raw: raw/papers/lu-2026-aspire-agentic-skills-discovery-for-figures/tab04.png
    caption: "BEHAVIOR-1K 두 가사 과제의 Navigation과 Task 성공률 (Human, CaP-Agent0, ASPIRE)"
    page: 20
    bbox_norm: [0.275, 0.757, 0.712, 0.848]
    strategy: manual
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/lu-2026-aspire-agentic-skills-discovery-for/tab05.png
    raw: raw/papers/lu-2026-aspire-agentic-skills-discovery-for-figures/tab05.png
    caption: "LIBERO-Pro Long zero-shot 전이 정량 수치. 라이브러리 크기 N=0, 25, 50, 90과 베이스라인 비교"
    page: 21
    bbox_norm: [0.2547, 0.2537, 0.7452, 0.4065]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/lu-2026-aspire-agentic-skills-discovery-for/tab06.png
    raw: raw/papers/lu-2026-aspire-agentic-skills-discovery-for-figures/tab06.png
    caption: "zero-shot 전이 과제별 분해. 라이브러리를 키워도 성공률이 오히려 떨어지는 항목이 섞여 있다"
    page: 21
    bbox_norm: [0.228, 0.5143, 0.772, 0.7008]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/lu-2026-aspire-agentic-skills-discovery-for/tab07.png
    raw: raw/papers/lu-2026-aspire-agentic-skills-discovery-for-figures/tab07.png
    caption: "LIBERO-Pro 위치 교란 과제별 ablation. engine과 evolutionary search 없음 / evolutionary search 없음 / evolutionary search 단독 / 최종"
    page: 22
    bbox_norm: [0.2265, 0.2859, 0.7735, 0.7697]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/lu-2026-aspire-agentic-skills-discovery-for/tab08.png
    raw: raw/papers/lu-2026-aspire-agentic-skills-discovery-for-figures/tab08.png
    caption: "LIBERO-Pro 지시문 교란 과제별 ablation (구성은 Table 7과 동일)"
    page: 23
    bbox_norm: [0.2265, 0.2545, 0.7735, 0.7383]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/lu-2026-aspire-agentic-skills-discovery-for/tab09.png
    raw: raw/papers/lu-2026-aspire-agentic-skills-discovery-for-figures/tab09.png
    caption: "evolutionary search 회차별 진행. 성능이 단조 증가하지 않고 중간에 떨어졌다 회복하는 과제가 여럿이다"
    page: 24
    bbox_norm: [0.2115, 0.1901, 0.7885, 0.3189]
    strategy: table-region
    curated: false
---
## 한 줄 요약 (One-line Summary)

ASPIRE는 코딩 에이전트가 로봇 제어 프로그램을 직접 쓰고 고치면서 검증된 수정을 skill library에 쌓아 다음 과제로 넘기는 지속학습 시스템이다. 세 구성 요소는 primitive 단위 multimodal trace를 내보내는 실행 엔진, 재사용 가능한 수정만 등재하는 skill library, 한 회차에 여러 후보 프로그램을 실행하는 evolutionary search다. LIBERO-Pro에서 종합 0.72로 이전 코딩 에이전트(0.18)와 VLA(0.13 이하)를 크게 앞선다. LIBERO-90에서 모은 라이브러리만으로 미학습 long-horizon 과제에 31% zero-shot 성공한다.

## 1. 자료 정보 (Document Information)

- **제목**: ASPIRE: Agentic /Skills Discovery for Robotics (Agentic **S**kill **P**rogramming through **I**terative **R**obot **E**xploration)
- **저자**: Runyu Lu, Yubo Wu, Ethan Kou (공동 1저자), Letian Fu, Wenli Xiao, Ajay Mandlekar, Yinzhen Xu, Guanya Shi, Ken Goldberg, Ang Chen, Mosharaf Chowdhury, Yuke Zhu, Linxi "Jim" Fan, Guanzhi Wang. NVIDIA(GEAR), UMich, UIUC, UC Berkeley, CMU
- **발표**: 2026-06-30 (NVIDIA 기술 보고서). arXiv 번호는 본문에 없다
- **프로젝트**: https://research.nvidia.com/labs/gear/aspire/
- **한 줄 성격**: code-as-policy 계보에 소프트웨어 엔지니어링 에이전트의 write-execute-debug 루프를 붙이고, 거기서 나온 수정 경험을 과제 사이로 옮기는 skill library를 얹었다. 로봇 policy를 end-to-end로 학습시키는 VLA 노선과 정반대 지점에 있다.

## 2. 주요 기여 (Key Contributions)

코딩 에이전트로 로봇을 제어한다는 발상 자체는 새롭지 않다. code-as-policy는 언어 모델이 perception, planning, control API를 조합해 실행 가능한 로봇 프로그램을 짜게 하는 방식인데 Code as Policies, ProgPrompt, VoxPoser로 이어지는 계보가 이미 있다. ASPIRE가 지적하는 문제는 두 가지다.

기존 시스템이 에이전트에게 주는 피드백은 너무 거칠다. rollout은 policy를 실행해 trajectory를 만들어내는 과정을 뜻하는데 실패한 rollout은 "과제를 못 했다"만 알려줄 뿐 perception이 틀렸는지, grasping이 불안정했는지, planning이 실패했는지를 구분해 주지 않는다. 논문은 이걸 primitive 단위 trace로 바꾼다.

경험도 쌓이지 않는다. 과제를 하나 끝내면 그 과정에서 찾아낸 수정과 복구 전략이 버려진다. 논문 표현으로는 백 번째 과제를 푸는 에이전트가 첫 번째를 푸는 에이전트보다 조금도 더 유능하지 않다. 사람 로봇 엔지니어는 반대로 디버깅 경험이 grasping 복구 요령이나 navigation 전략 같은 이전 가능한 지식으로 굳는다.

그래서 세 구성 요소를 추가했다. 실행 엔진은 perception, planning, grasping, control 호출마다 입출력과 시각 증거를 기록해 에이전트가 실패 지점을 좁혀 들어가게 한다. skill library는 검증을 통과한 수정만 in-context guidance 형태로 보관해 이후 과제가 물려받게 한다. evolutionary search는 한 가지 수리 루프에 갇히는 것을 막으려고 회차마다 서로 다른 가설을 담은 후보 프로그램 여러 개를 동시에 실행한다.

성능은 세 벤치마크 모두에서 이전 최고를 크게 넘는다. LIBERO-Pro 교란 suite에서 최대 77%p, Robosuite 양팔 handover에서 72%p, BEHAVIOR-1K long-horizon 가사 과제에서 최대 32%p를 올린다. 라이브러리를 쌓아두면 미학습 과제에도 그대로 통한다. 시뮬레이션에서 찾은 skill은 embodiment가 다른 실제 로봇의 프로그래밍 비용까지 줄인다. 둘 다 추가 학습 없이 되는 일이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### coordinator–actor 구조

중앙의 coordinator가 공유 skill library를 관리하면서 과제마다 actor 코딩 에이전트를 하나씩 붙인다. actor는 자기 과제 안에서 프로그램을 쓰고 실행하고 진단하고 고친다. actor끼리는 대화 기록이나 원본 rollout trajectory를 주고받지 않는다. trajectory는 observation과 action이 시간순으로 이어진 실행 기록을 말한다. 이전 가능한 경험은 오직 skill library를 거쳐 흐른다. 덕분에 각 actor의 context window는 과제 명세와 현재 프로그램, 지금 실패와 관련된 trace에만 집중할 수 있다.

### robot execution engine

기존 방식은 사람이 미리 설계한 인터페이스로 증거를 노출했다. 장면 요약을 손으로 큐레이션하거나 observation 집합을 고정해 두는 식이다. 여기엔 트레이드오프가 있다. 증거가 적으면 실패한 primitive가 가려진다. 원본 영상을 통째로 주면 인과의 사슬에서 주의가 흩어진다.

ASPIRE는 이 채널을 열린 디버깅 환경으로 바꾼다. primitive 호출마다 어떤 API를 불렀는지, 입력과 출력이 무엇이었는지, 반환 상태가 어땠는지, RGB 키프레임과 오버레이와 grasping 후보와 물체 pose와 motion planning 결과 같은 시각 증거를 기록한다. 전체 프레임을 주지는 않는다. 호출 직전과 직후 프레임에 대응 오버레이와 반환값을 묶어 보관한다. 에이전트는 문제 되는 호출 주변만 들여다보면 된다.

Figure 2의 라디오 집기 사례가 이 구조의 쓰임새다. ego-view를 보면 로봇이 라디오를 찾은 뒤 접근을 반복해서 실패하다가 방향을 바꾸고 나서야 성공한다. trace는 원인을 정확히 짚는다. perception은 성공해 pose를 돌려주는데 `navigate_to_pose` 호출이 계속 `PLANNING_ERROR`를 낸다. 반환값과 로그를 뒤진 에이전트는 목표 지점이 테이블 경계에서 20cm 안쪽이라 충돌 회피가 걸린다는 것을 찾아낸다. perception도 grasping도 아니고 목표 pose 자체가 충돌 제약 아래서 실현 불가능했다. 수정은 진단에서 곧바로 따라 나온다. 라디오 주변으로 대안 navigation 목표를 뿌려 충돌 버퍼를 벗어나는 접근 방향을 고르는 루틴을 넣는다.

### skill library

과제 사이에서 되풀이되는 것은 프로그램 전체가 아니라 그 안의 수정 패턴이다. 라이브러리에 들어가는 지식은 성격이 제각각이다. localization 요령, perception 프롬프트, grasping 제약, navigation 복구 전략, motion primitive, 장면 이해 루틴, 디버깅 워크플로가 함께 들어 있다. 이 분류는 미리 정해둔 것이 아니다. actor가 trace로 실패를 진단하고 프로그램을 고쳐 디버그 설정에서 검증하면 coordinator가 그중 재사용 가능한 패턴만 골라 등재한다.

항목 하나에는 실패 시그니처, 언제 적용할지의 조건, 수정 전략, 필요하면 대표 코드 스케치가 들어간다. 앞의 라디오 과제에서 등재된 것도 "라디오 집기 프로그램"이 아니라 navigation 복구 패턴이다. 장애물 경계 근처에서 planner 오류가 반복되면 표본 pose가 충돌 버퍼 안에 들어갔을 수 있으니 perception과 grasping을 다시 시도하기 전에 물체 주위 대안 접근 방향을 훑어보라.

등재 심사는 coordinator가 맡는다. actor는 실패 모드, 검증된 수정, 이전 가능성이 있는 패턴, 과제 고유의 특이점, 디버그 설정에서 낸 성공률을 구조화된 형식으로 보고한다. coordinator는 이 보고를 감사해서 허용 API 규정을 지켰는지 확인하고 디버그 검증을 통과한 재사용 가능 수정만 공유 라이브러리에 올린다. 병렬 actor는 과제 단위 수정과 보고만 쓴다. 라이브러리 쓰기는 coordinator가 직렬화해서 충돌을 막는다.

### evolutionary search

trace 기반 디버깅만으로는 국소 수리 루프에 빠질 수 있다. 근본적으로 다른 접근을 찾는 대신 같은 실패 전략에 계속 반창고를 붙이는 상태다. evolutionary search는 이걸 깨려고 실행 가능한 프로그램의 탐색 폭을 넓힌다.

회차마다 코딩 에이전트가 skill library를 참조하면서 후보 프로그램 K개를 낸다. 조건은 직전까지 성적이 좋았던 프로그램들과 그 실패 trace다. 각 후보를 실행 엔진에 태우면 과제 결과와 새 진단 trace가 나온다. 다음 회차는 최고 성적 프로그램과 거기 남은 실패 모드를 함께 조건으로 받는다. 같은 해법을 반복해서 다듬는 대신 서로 구별되는 전략을 탐색하게 만드는 구조다.

탐색 대상은 로봇 프로그램 그 자체다. 후보 선별은 closed-loop 실행으로 한다. 검증된 수정은 탐색이 끝난 뒤 환경 변형과 과제를 넘어 일반화된다는 조건에서만 라이브러리에 등재한다. 후보 하나가 디버그 설정을 풀거나 탐색 예산이 소진되면 끝난다(Algorithm 1).

부록 E.4에 따르면 회차 사이를 잇는 것은 `task_analysis.md`라는 지속 문서다. 여기엔 초기 스냅샷에서 채운 과제별 장면 기술(물체 형상, 목표 기하, 장애물, 막힌 접근 방향)과 진행 중인 가설, 그 가설을 시험하는 후보 메타데이터가 들어간다. 배제된 방향의 대장도 함께 적는다. 테스트로 걸러낸 것과 작업공간 제약 탓에 시도조차 못 한 것을 나눠 둔다. 이 구분 덕분에 나중 회차가 이미 죽은 가지를 다시 들추지 않으면서도 손목 회전 같은 새 기법이 생기면 막혀 있던 가지는 다시 시도할 수 있다.

### 에이전트 스캐폴딩

부록 E는 ASPIRE가 사용한 에이전트 설정을 거의 그대로 공개한다. Claude Code 기반이고 `CLAUDE.md`를 프로젝트 헌법으로, `.claude/memory/MEMORY.md`를 세션 시작 시 읽는 메모리로, `.claude/skills/<name>/SKILL.md`를 자동 발견되는 스킬로 둔다. 가장 두드러진 규약은 금지 API 목록이다. 시뮬레이터 내부 상태(`env.handle.env.sim`, `sim.data.body_xpos`)와 자산 파일(`.bddl`, `.xml`, `.urdf`) 접근을 전면 금지한다. 판단 기준은 단순하다. 카메라 달린 실제 로봇이 할 수 있으면 허용, 물리 엔진 내부 상태를 읽으면 금지다. 이 규약을 어기면 벤치마크 결과 자체가 무효라고 명시한다.

평가 seed 격리도 같은 성격이다. Stage 1 디버깅은 디버그 seed만 재생하고 held-out 검증 seed는 `fix_code.py`가 확정된 뒤 Stage 2에서 정확히 한 번만 돈다. seed당 재생 시도는 3회로 제한하고 초과하면 `BLOCKED.md`를 쓰고 넘어간다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 실험 설정

시뮬레이션 벤치마크 전부에서 코딩 에이전트는 Claude Code에 Claude Opus 4.6과 1M 토큰 context window를 결합한 구성이다. context window는 모델이 한 번에 받아들일 수 있는 토큰 길이 한도를 뜻한다. 에이전트가 쓰는 프로그램은 CaP-X 위에서 실행되는 Python 코드다. CaP-X는 MuJoCo Playground를 토대로 한 오픈소스 code-as-policy 프레임워크다. perception, 기하, motion planning API가 여기 딸려 있다. 에이전트와 환경과 API 집합은 전 실험에서 고정했다.

실제 로봇 전이 실험만 구성이 다르다. OpenAI Codex GPT-5.5를 reasoning-xhigh 모드로 쓰고 양팔 YAM 조작 스테이션에서 실행한다. Franka 기반 시뮬레이션에서 ASPIRE가 뽑아낸 3개 skill(캔 집기, 그릇 접시에 놓기, 서랍 밀고 당기기)을 in-context guidance로 제공한다.

LIBERO-Pro는 물체와 목표와 공간 교란에 대한 단기 강건성, Robosuite는 접촉이 많은 단팔과 양팔 manipulation, BEHAVIOR-1K는 절차적으로 생성한 배치에서 long-horizon 가사 이동 manipulation을 잰다. 주 베이스라인은 CaP-Agent0이고 end-to-end VLA로는 OpenVLA와 π₀와 π₀.₅를 함께 비교한다.

평가 규약에서 한 가지 짚어둘 게 있다. ASPIRE는 과제당 프로그램 하나를 생성해 held-out seed 전체에 그대로 돌리는 반면, CaP-Agent0는 seed마다 프로그램을 새로 만들고 실행 시점 추론과 재시도까지 쓴다. ASPIRE 쪽이 더 불리한 조건이다.

### 세 벤치마크 성능

LIBERO-Pro 종합은 Pos 0.77, Task 0.67, 전체 0.72다. CaP-Agent0가 0.20/0.16/0.18, π₀.₅가 0.25/0.01/0.13이고 OpenVLA와 π₀는 전 항목 0.00이다. suite별로 보면 Pos와 Task 두 항목 평균에서 Object 77%p, Goal 41.5%p, Spatial 42.5%p를 각 suite 최강 베이스라인 위로 올린다. π₀.₅는 일부 위치 교란에서 OpenVLA와 π₀보다 낫지만 지시문을 바꿔 쓰면 사실상 0에 가깝게 하락한다.

Robosuite는 평균 0.68에서 0.81로 오른다. 개선폭이 가장 큰 항목은 양팔 handover 하나로 0.20에서 0.92로 뛴다. 나머지는 이미 포화 상태라 유지에 가깝다. nut_assembly는 0.00에서 0.09로 올라도 여전히 낮다. two_arm_lift는 0.74에서 0.71로, spill_wipe는 1.00에서 0.99로 미세하게 내려간다.

BEHAVIOR-1K에서는 사람이 짠 프로그램과 CaP-Agent0를 navigation과 과제 성공 양쪽에서 모두 넘는다. 가장 큰 개선은 라디오 집기 과제의 과제 성공률로, CaP-Agent0의 0.56에서 0.88로 오른다. navigation은 1.00이다. 참고로 이 과제의 사람 성적은 0.36으로, 세 방식 중 가장 낮다.

### 미학습 과제 zero-shot 전이

LIBERO-90에서 모은 수정 skill이 held-out LIBERO-Pro Long 과제에 그대로 통하는지를 본다. 라이브러리 스냅샷을 N ∈ {0, 25, 50, 90}으로 만들고 각 held-out 과제에 프로그램을 하나 생성해 추가 디버깅과 재시도와 과제별 라이브러리 갱신 없이 평가한다.

N=90에서 Pos 0.226, Task 0.383, 종합 0.305다. CaP-Agent0(0.038)와 π₀.₅(0.05)를 두 항목 모두에서 앞선다. 라이브러리가 비어 있는 N=0은 0.047이다. 25와 50과 90으로 키우면 0.137 → 0.215 → 0.305로 꾸준히 오른다. 단기 과제에서 검증된 수정이 long-horizon 조합 과제에도 재사용 가능한 지식이 된다는 근거다.

다만 과제별로 뜯어보면(Table 6) 단조 증가가 아니다. "Stove + moka pot"의 Task 축은 N=50에서 0.68이었다가 N=90에서 0.26으로 떨어진다. "Mug on two plates"의 Task 축은 N=25의 0.28에서 N=90의 0.00으로 사라진다. 논문도 이 현상을 라이브러리 관리 문제로 인정한다.

### 실제 로봇 cross-embodiment 전이

여기서 재는 것은 policy를 그대로 옮겨 싣는 배포가 아니다. 실제 로봇은 자기 perception과 캘리브레이션과 제어 스택을 쓴다. 코딩 에이전트는 실세계 실행 피드백으로 프로그램을 다시 맞춰야 한다. 이 실험이 측정하는 값은 시뮬레이션에서 발견한 skill을 제공했을 때 줄어드는 실세계 디버깅 분량이다.

세 과제 모두 디버깅 비용이 줄었고 최종 성공률 개선은 과제에 따라 갈렸다(Table 1). 그릇 놓기는 skill 유무와 무관하게 20/20인데 토큰만 8.65M에서 5.11M으로 준다. 캔 들기는 13/20에서 19/20으로 오르면서 총 토큰이 61.94M에서 6.58M으로 거의 한 자릿수 줄어든다. 서랍 조작은 대비가 가장 크다. skill을 준 쪽은 11/20을 내는데 안 준 쪽은 334.9M 토큰을 쓰고도 성공하는 평가 프로그램을 끝내 못 만든다.

### ablation

execution engine과 evolutionary search를 각각 떼어본다. 둘 다 없는 기본 시스템(15개 예시 프로그램만 준 zero-shot Claude Opus 4.6)은 매크로 평균 14%다. execution engine을 넣으면 62%로 뛰고 evolutionary search를 더하면 72%가 된다. 기여의 대부분은 실행 엔진 쪽이다. evolutionary search는 남은 어려운 과제에서 추가분을 낸다.

evolutionary search 회차별로 보면 초반 몇 회차에서 빠르게 오르다가 이후 완만해진다. 여러 수정 가설을 동시에 뿌리면 단일 회차 디버깅이 놓친 대안을 금방 건진다. 뒤로 갈수록은 수익이 체감한다. 과제별 진행(Table 9)은 단조롭지 않다. "Bowl → plate"는 0.62 → 0.60 → 0.60 → 0.18로 내려갔다가 0.86으로 끝난다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문이 직접 꼽는 한계가 다섯이다.

완전 자율 실세계 평생학습은 아직 아니다. 시뮬레이션에서는 성공 판정과 장면 리셋이 싸고 프로그램으로 처리된다. 실세계로 나가려면 견고한 성공 감지와 안전한 리셋, 안전 모니터링, 캘리브레이션 유지까지 갖춰야 한다.

동결된 프론티어 LLM에 기댄다. Claude Opus 4.6에 1M 토큰 context window라는 구성이 multimodal trace를 해석하고 수정을 짜고 탐색 후보를 내는 일을 감당한다. 더 작거나 약한 모델이 같은 루프를 버틸 수 있는지는 검증하지 않았다.

미리 정의된 API가 표현 가능한 행동의 상한을 정한다. 이 제약은 디버깅을 다루기 쉽고 안전하게 만든다. 다만 노출된 primitive 바깥의 감지와 제어와 상호작용이 필요한 과제에서는 에이전트가 비효율적으로 근사하거나 사람이 API를 늘려줄 때까지 막힌다. 에이전트가 새 primitive를 안전하게 제안하고 검증하고 편입하는 방법이 후속 과제다.

라이브러리가 커지면 오래돼 맞지 않거나, 지나치게 특정 상황에 묶였거나, 중복이거나, 새 과제에는 오히려 방향을 흐리는 항목이 생긴다. skill library의 장기 메모리 관리는 아직 미해결이다. 논문은 zero-shot 전이의 비단조 추세를 이 문제로 진단한다. 검색과 정리와 순위 매기기와 재검증 기제가 더 필요하다.

디버그와 탐색 루프가 연산을 많이 소모한다. 과제 하나에 LLM 호출과 시뮬레이터 또는 로봇 rollout이 여러 번 든다. 추론 비용을 낮추거나 표본 효율이 높은 탐색을 쓰거나 이전 수정을 더 잘 재사용하는 기제 없이는 과제 묶음을 크게 키우지 못한다.

## 6. 관련 연구 (Related Work)

**agentic 로봇 제어.** 로봇 제어는 end-to-end VLA와 실행 가능한 프로그램 두 가지로 연구돼 왔다. 전자는 RT-2, Octo, OpenVLA, π₀, π₀.₅, GR00T N1 계보고 후자는 SayCan, Code as Policies, ProgPrompt, VoxPoser, RoboCodex, CaP-X 계보다. 소프트웨어 엔지니어링 에이전트(SWE-bench, SWE-agent, OpenHands, Claude Code, Codex) 쪽에도 코드에 대한 비슷한 write-execute-debug 루프가 있다. ASPIRE는 실행 가능 프로그램 노선 위에 서되 초점을 지속적 체화 개선에 둔다.

**자기개선 에이전트와 skill library.** LLM 에이전트는 열린 메모리, skill library, 자기진화 저장소로 개선돼 왔다. Voyager, Lifelong Robot Library Learning, Uni-Skill, SkillFlow가 여기 해당한다. 다른 계열은 LLM으로 reward, 커리큘럼, 환경, 탐색 후보를 생성한다(Eureka, DrEureka, Text2Reward, Eurekaverse, RoboGen, FunSearch, AlphaEvolve). ASPIRE의 차별점은 저장 대상에 있다. 성공 기억도, 텍스트 반성도, 후속 policy 학습용 reward 함수도 아니다. 원인을 규명한 체화 실패에서 뽑아내 검증까지 마친 수정 지식이다.

## 7. 용어집 (Glossary)

이 자료 고유 용어만 담는다. 도메인 공통 용어는 [[overviews/glossary-physical-ai]]와 [[overviews/glossary-llms]]를 따른다.

| 용어 | 뜻 |
|---|---|
| ASPIRE | Agentic Skill Programming through Iterative Robot Exploration. 이 논문의 시스템 이름 |
| code-as-policy | 언어 모델이 perception, planning, control API를 조합해 실행 가능한 로봇 프로그램을 짜게 하는 제어 방식 |
| primitive | 실행 엔진이 노출하는 최소 호출 단위. `segment_text_prompt`, `plan_grasp`, `navigate_to_pose` 같은 perception, planning, control API 하나하나 |
| multimodal trace | primitive 호출마다 기록되는 API명, 입출력, 반환 상태와 RGB 키프레임, 오버레이, grasping 후보, 물체 pose 묶음 |
| skill library | 검증을 통과한 수정 지식을 실패 시그니처, 적용 조건, 수정 전략, 코드 스케치 형태로 모아둔 저장소. 다음 actor에게 in-context guidance로 주입된다 |
| coordinator / actor | coordinator는 라이브러리를 관리하고 과제를 배분하는 중앙 에이전트, actor는 과제 하나를 맡아 프로그램을 쓰고 고치는 코딩 에이전트 |
| evolutionary search | 회차마다 서로 다른 가설을 담은 후보 프로그램 K개를 만들어 실행하고, 성적 좋은 것과 남은 실패 trace로 다음 회차를 조건짓는 탐색 절차 |
| embodiment | 로봇의 물리적 형상과 그에 딸린 제어 API 구성. cross-embodiment 전이란 형상과 API가 다른 기기로 지식을 옮기는 것 |
| CaP-X | Fu 외 2026의 오픈소스 code-as-policy 프레임워크. MuJoCo Playground 위에서 돌며 이 논문의 실행 기반이다 |
| CaP-Agent0 | CaP-X에 딸린 기존 코딩 에이전트 베이스라인. 시각 차분과 미리 정한 skill library, episode별 실행 시점 재시도를 쓴다 |
| LIBERO-Pro | LIBERO를 물체, 목표, 공간, 지시문 교란으로 확장해 암기가 아닌 강건성을 재는 벤치마크. Pos는 초기 위치 교란, Task는 지시문 교란 조건 |
| BEHAVIOR-1K | 1,000개 일상 활동을 담은 체화 AI 벤치마크. 이 논문은 라디오와 캔 집기 두 long-horizon 이동 manipulation 과제를 쓴다 |
| Stage 1 / Stage 2 | 디버그 seed에서 수정 프로그램을 만드는 단계와, 확정된 프로그램을 held-out seed에서 정확히 한 번만 검증하는 단계 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | ASPIRE 시스템 전체 구조 | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 4 | trace 기반 디버깅 실례 (라디오 집기) | caption-region | ★ wiki 권장 (method) |
| fig03 | 5 | skill library 구성과 실제 로봇 전이 | caption-region | ★ wiki 권장 (method) |
| fig04 | 8 | 세 벤치마크 성능 비교 | caption-region | ★ wiki 권장 (result) |
| fig05 | 9 | LIBERO-Pro Long zero-shot 전이 | caption-region | ★ wiki 권장 (result) |
| fig06 | 11 | execution engine과 evolutionary search ablation | caption-region | ★ wiki 권장 (result) |
| tab01 | 10 | 실제 로봇 cross-embodiment skill 전이 | manual | ★ wiki 권장 (result) |
| fig07 | 17 | 디버깅 범주 skill 예시 | caption-region | (부록, 필요 시) |
| fig08 | 17 | localization 범주 skill 예시 | caption-region | (부록, 필요 시) |
| fig09 | 18 | navigation 범주 skill 예시 | caption-region | (부록, 필요 시) |
| fig10 | 18 | grasping 범주 skill 예시 | caption-region | (부록, 필요 시) |
| fig11 | 18 | motion primitive 범주 skill 예시 | caption-region | (부록, 필요 시) |
| fig12 | 19 | scene reasoning 범주 skill 예시 | caption-region | (부록, 필요 시) |
| tab02 | 20 | LIBERO-Pro 정량 수치 | table-region | (fig04와 중복) |
| tab03 | 20 | Robosuite 과제별 성공률 | manual | (fig04와 중복) |
| tab04 | 20 | BEHAVIOR-1K 성공률 | manual | (fig04와 중복) |
| tab05 | 21 | zero-shot 전이 정량 수치 | table-region | (fig05와 중복) |
| tab06 | 21 | zero-shot 전이 과제별 분해 | table-region | (확인 필요, 비단조 근거) |
| tab07 | 22 | 위치 교란 과제별 ablation | table-region | (부록 상세) |
| tab08 | 23 | 지시문 교란 과제별 ablation | table-region | (부록 상세) |
| tab09 | 24 | evolutionary search 회차별 진행 | table-region | (부록 상세) |
