---
title: "CUA-Gym: Scaling Verifiable Training Environments and Tasks for Computer-Use Agents"
type: paper
year: 2026
category: agents
raw_path: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments.pdf
raw_filename: "wang-2026-cua-gym-scaling-verifiable-training-environments.pdf"
source_collection: external
source: wang-2026-cua-gym-scaling-verifiable-training-environments.md
authors: "Bowen Wang, Dunjie Lu, Junli Wang, Tianyi Bai, Shixuan Liu, Zhipeng Zhang, Haiquan Wang, Hao Hu, Tianbao Xie, Shuai Bai, Dayiheng Liu, Que Shen, Junyang Lin, Tao Yu"
arxiv_id: "2605.25624"
tags: [computer-use-agents, gui-agents, rlvr, verifiable-rewards, synthetic-data, environment-synthesis, osworld, webarena, gspo, qwen]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig01.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/fig01.png
    caption: "CUA-Gym 데이터 합성 파이프라인 전체 구조 — Orchestrator가 VM 두 대를 띄우고 Generator·Discriminator를 information barrier로 갈라 돌린 뒤 Filter를 통과시킨다"
    page: 3
    bbox_norm: [0.109, 0.077, 0.891, 0.272]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig02.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/fig02.png
    caption: "mock 웹 앱 합성 파이프라인 — Plan Agent가 DESIGN.md·TODO.md를 쓰고 Dev Agent가 구현, Web Agent가 Playwright로 UI를 훑어 스펙과 대조하며 N라운드 반복"
    page: 4
    bbox_norm: [0.109, 0.077, 0.891, 0.242]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig03.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/fig03.png
    caption: "state injection 예시 — 같은 메일 mock에 빈 받은편지함·마감 임박 상태·부재 후 백로그 세 가지 초기 상태를 주입한 화면"
    page: 5
    bbox_norm: [0.109, 0.077, 0.891, 0.217]
    strategy: caption-region
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig04.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/fig04.png
    caption: "trajectory slicing과 sliding window 비교 — 오래된 스크린샷만 placeholder로 접고 assistant의 사고·tool call은 그대로 남긴다"
    page: 5
    bbox_norm: [0.136, 0.574, 0.864, 0.755]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig05.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/fig05.png
    caption: "주요 결과 — (a) OSWorld-Verified 도메인별 성공률 변화, (b) OSWorld-Verified·WebArena 종합 표"
    page: 6
    bbox_norm: [0.109, 0.356, 0.891, 0.678]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig06.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/fig06.png
    caption: "데이터셋 구성 — (a) 직업 분류별 환경 커버리지, (b) 카테고리·난이도·cross-app 분포, (c) 기존 GUI 에이전트 학습 데이터셋과의 비교"
    page: 7
    bbox_norm: [0.108, 0.077, 0.893, 0.431]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig07.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/fig07.png
    caption: "데이터 스케일링 — 1.4K·3K·12K 튜플로 나눠 학습했을 때의 OSWorld-Verified 점수와 학습 reward 곡선"
    page: 8
    bbox_norm: [0.109, 0.077, 0.891, 0.293]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig08.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/fig08.png
    caption: "환경 스케일링 — teacher distillation 설정에서 환경 수(10 vs 80)와 trajectory 수를 갈라 본 ablation"
    page: 8
    bbox_norm: [0.505, 0.494, 0.891, 0.688]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig09.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/fig09.png
    caption: "학습 중 창발한 action batching — model step당 tool call 수가 1.0에서 1.4~1.9 대역으로 올라간다"
    page: 9
    bbox_norm: [0.52, 0.193, 0.891, 0.442]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig10.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/fig10.png
    caption: "합성된 mock 웹 앱 32종의 랜딩 페이지 스크린샷"
    page: 23
    bbox_norm: [0.109, 0.077, 0.892, 0.938]
    strategy: caption-region
    low_confidence: true
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab01.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/tab01.png
    caption: "information barrier를 강제하는 접근 권한 행렬 — Generator와 Discriminator가 각 자원에 대해 갖는 read/write/denied 권한"
    page: 17
    bbox_norm: [0.221, 0.077, 0.779, 0.243]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab02.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/tab02.png
    caption: "O*NET SOC 대분류와 mock 앱 카테고리의 매핑"
    page: 21
    bbox_norm: [0.179, 0.573, 0.823, 0.858]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab03.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/tab03.png
    caption: "합성된 mock 웹 앱 전체 목록"
    page: 22
    bbox_norm: [0.16, 0.461, 0.841, 0.84]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab04.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/tab04.png
    caption: "측정 대상 mock 앱 99종의 구조 통계"
    page: 25
    bbox_norm: [0.172, 0.077, 0.828, 0.152]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab05.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/tab05.png
    caption: "mock 앱 소스 LOC 분포"
    page: 25
    bbox_norm: [0.379, 0.178, 0.621, 0.288]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab06.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/tab06.png
    caption: "GSPO 학습 하이퍼파라미터"
    page: 31
    bbox_norm: [0.162, 0.077, 0.841, 0.472]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab07.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/tab07.png
    caption: "학습 후 자주 묶여 나온 길이 2 이상의 tool call 시퀀스"
    page: 32
    bbox_norm: [0.284, 0.664, 0.716, 0.846]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab08.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/tab08.png
    caption: "action별 solo rate — 단독으로만 나오는 action과 묶이는 action의 구분"
    page: 33
    bbox_norm: [0.335, 0.247, 0.665, 0.44]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab09.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/tab09.png
    caption: "공개된 CUA-Gym 릴리스의 시나리오별 task 수"
    page: 72
    bbox_norm: [0.338, 0.274, 0.662, 0.431]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab10.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/tab10.png
    caption: "도메인 × 난이도 교차표"
    page: 72
    bbox_norm: [0.289, 0.593, 0.711, 0.864]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab11.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/tab11.png
    caption: "task 지시문에 가장 많이 쓰인 명령형 동사"
    page: 73
    bbox_norm: [0.277, 0.193, 0.723, 0.327]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab12.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/tab12.png
    caption: "cross-app task에서 함께 등장하는 애플리케이션 쌍 상위 목록"
    page: 73
    bbox_norm: [0.209, 0.487, 0.791, 0.598]
    strategy: table-region
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab13.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/tab13.png
    caption: "task 지시문의 단어 길이 분포"
    page: 74
    bbox_norm: [0.309, 0.077, 0.691, 0.218]
    strategy: table-region
    curated: false
---

## 요약 (Summary)

홍콩대 XLANG Lab과 Qwen Team의 공동 연구(arXiv 2605.25624, 2026-06-08 개정). computer-use agent는 사람처럼 화면을 보고 마우스·키보드로 데스크톱과 브라우저를 조작하는 에이전트를 말한다. 이런 에이전트를 RLVR로 훈련시키려면 지시문·실행 가능한 환경·검증 가능한 reward 세 쪽이 서로 들어맞는 데이터가 필요한데 하나를 손으로 만드는 데 몇 시간이 걸린다.

CUA-Gym은 그 일을 사람 대신 코딩 에이전트에게 맡긴다. 단, 한 에이전트에게 양쪽을 다 시키지는 않는다. Generator가 환경을 만들고 Discriminator가 채점 함수를 쓰는데 Discriminator는 Generator의 코드를 아예 볼 수 없다. 이 information barrier가 없으면 reward는 "task가 끝났는가"가 아니라 "내가 짠 setup 절차를 밟았는가"를 검사하게 되고 그런 데이터로는 RL이 학습할 신호가 안 나온다.

결과는 32,112개 검증 튜플과 110개 환경. 이 데이터로 GSPO 학습한 CUA-Gym-A17B가 OSWorld-Verified 72.6%로 오픈소스 최고 성적을 냈고 학습에 쓰지 않은 WebArena에서도 올랐다. 데이터를 1.4K→12K로 키우면 학습 곡선의 천장이 같이 올라가며 아직 포화 조짐이 없다.

## 주요 기여 (Key Contributions)

1. task 지시문 $t$, 재현 가능한 초기 상태 $s$, 검증 함수 $r: s \to [0,1]$ 을 따로 만들지 않고 하나의 topic specification에서 같이 뽑는다. 셋이 어긋날 여지를 구조로 없앴다.
2. information barrier를 세웠다. Discriminator는 Generator의 스크립트와 작업 디렉토리에 접근이 차단된 샌드박스에서 돈다. task 설명과 결과 환경 두 개만 보고 `reward.py`를 쓴다.
3. mock 웹 앱 94종을 모은 CUA-Gym-Hub. 실제 웹사이트는 인증·rate limit이 걸리고 상태가 재현되지 않아 RL 환경이 못 된다. Plan/Dev/Web 세 에이전트가 돌아가며 진짜처럼 동작하되 상태를 프로그램으로 주입·조회·리셋할 수 있는 단일 페이지 앱을 합성했다.
4. 튜플 32,112개와 환경 110개(데스크톱 16종 + mock 웹 94종). 프로그램 검증과 데스크톱·웹 커버리지를 둘 다 갖춘 공개 데이터셋 중 최대 규모다.
5. CUA-Gym-A3B는 OSWorld-Verified 62.1%, A17B는 72.6%다. A3B는 활성 파라미터가 10분의 1 수준인 채로 A17B base와 맞먹는다.
6. 스케일링을 두 축으로 나눠 실측했다. ablation 결과 데이터 볼륨과 환경 다양성은 서로를 대체하지 못하는 보완 관계였다.
7. action batching이 창발했다. 최적화 대상이 아니었는데 policy가 한 턴에 여러 tool call을 묶기 시작하고 trajectory가 33~45% 짧아졌다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 적대적 co-generation 루프

RLVR 데이터를 튜플 $(t, s, r)$ 로 정의한다. Orchestrator가 task마다 VM 두 대를 띄우고 서브에이전트 둘을 돌린다.

![[assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig01.png]]
*Figure 1: CUA-Gym 데이터 합성 파이프라인. Orchestrator가 VM을 준비하고 Generator·Discriminator를 information barrier로 갈라 돌린 뒤, 합의된 튜플을 LLM 다수결과 teacher rollout 두 단계 필터에 태운다 (Wang 2026, p.3)*

Generator는 task와 도메인 skill 파일을 읽고 `initial_setup.py`·`golden_patch.py`를 써서 두 VM에 실행, 초기 상태 $s_{\text{init}}$ 과 정답 상태 $s_{\text{gold}}$ 를 만든다. Discriminator는 task를 세부 판정 기준으로 쪼갠 뒤 이를 합산해 $[0,1]$ 점수를 내는 `reward.py`를 쓴다. Orchestrator는 라운드마다 양쪽 출력을 살펴 다섯 합의 조건이 전부 만족될 때까지 재시도시킨다. 가장 기본이 되는 조건은 실행해봤을 때 `reward(golden) = 1.0` 이고 `reward(initial) = 0.0` 이 나오는지다.

정보 격리가 어디까지 강제되는지는 권한 행렬로 명시되어 있다.

![[assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab01.png]]
*Table 1: information barrier 접근 권한 행렬. Discriminator는 Generator의 스크립트·작업 디렉토리·파일시스템 내용에 전부 denied이고, 환경은 state-only API로만 읽는다 (Wang 2026, p.17)*

task와 도메인 skill 파일은 양쪽 다 본다. 갈리는 것은 Generator가 만든 산출물이다. Discriminator는 두 VM의 파일시스템도 직접 못 읽고 state-only API를 거친다. 반대로 Generator는 `reward.py`를 못 보고 오직 Discriminator가 쓴 `REVIEW.md`의 판정과 피드백만 읽는다.

필터는 루프 밖에 하나 더 있다. 루프가 수렴하면 튜플 안에서 앞뒤가 맞는다. 그렇다고 지시문이 모호하지 않다거나 어떤 policy든 풀 수 있는 건 아니다. 이런 문제는 rollout을 돌려야 드러난다. 그래서 통과한 튜플을 데이터셋 수준 필터에 한 번 더 태운다. 첫 단계는 일관성·실행 가능성·hack 위험·명료성·난이도 보정 다섯 축의 LLM 다수결이다. 둘째 단계에서는 teacher 모델 rollout으로 실제 풀리는지, reward가 성공을 제대로 따라가는지 본다.

### CUA-Gym-Hub 합성

task 다양성의 상한은 환경 다양성이다. 기존 벤치마크는 데스크톱 앱 몇 개가 전부라 94개 mock 웹 앱을 따로 합성했다.

![[assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig02.png]]
*Figure 2: mock 환경 합성 파이프라인. Plan Agent가 DESIGN.md·TODO.md로 기능·스키마·API·UI 레이아웃 트리를 명세하고, Dev Agent가 구현하고, Web Agent가 Playwright로 모든 요소를 눌러 실제 DOM을 기준과 대조한다 (Wang 2026, p.4)*

검증 기준은 Plan Agent가 쓴 UI 레이아웃 트리다. Web Agent는 차이를 Dev Agent에게 돌려보내고 둘이 수렴할 때까지 돈다. 최종 산출물에는 API·함정·검증 템플릿을 정리한 `SKILL.md`가 붙어 그대로 task 합성의 입력이 된다.

mock을 고정된 복제본이 아니라 살아있는 학습 환경으로 만드는 설계가 둘이다. state injection은 task가 자기 JSON 초기 상태를 `reward.py`와 함께 들고 오게 한다. 그래서 mock 구현 하나가 코드 수정 없이 수많은 task 세계를 호스팅한다. 나머지 하나인 session isolation은 모든 변경·업로드·리셋을 세션 id로 스코프한다. 덕분에 분산 RL 워커들이 같은 mock 백엔드를 공유하면서도 서로의 변경을 보지 않는다.

### trajectory slicing

에이전트는 원본 스크린샷을 보고 tool call로 감싼 action을 낸다. rollout이 길어지면 두 가지가 문제된다. 이미지가 쌓인 히스토리의 컨텍스트를 어떻게 관리할지, prefix가 겹치는 trajectory를 어떻게 효율적으로 학습시킬지다.

![[assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig04.png]]
*Figure 4: 흔한 sliding window는 최근 5턴만 남기고 나머지를 버린다. trajectory slicing은 rollout 하나에서 같은 컨텍스트 예산으로 여러 학습 샘플을 만들되, 오래된 스크린샷만 `<image collapsed>`로 접고 assistant의 사고와 tool call은 원문 그대로 둔다 (Wang 2026, p.5)*

sliding window로는 나중 action을 설명하는 앞부분 상태가 통째로 사라진다. slicing 쪽은 학습된 요약이 아니라 결정적 규칙이라 손실이 예측 가능하다. 재사용 가능한 prefix가 그대로 남아서 인접 slice의 policy 로그확률을 계산할 때 KV 캐시를 재사용할 수 있다.

### 학습 알고리즘

GSPO는 중요도 비율을 토큰 단위 대신 시퀀스 단위로 잡는 RL 알고리즘으로 mixture-of-experts 모델 학습에서 더 안정적이다. policy가 $G$개 rollout을 내면 각각 $r_i \in [0,1]$ 을 받고 그룹 정규화 advantage $\hat{A}_i = (r_i - \mu)/\sigma$ 로 가중된 clipped surrogate를 최대화한다.

$$\rho_i = \left( \frac{\pi_\theta(\tau_i \mid t, s)}{\pi_{\theta_{\text{old}}}(\tau_i \mid t, s)} \right)^{1/|\tau_i|}$$

## 데이터셋 구성 (Dataset)

![[assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig06.png]]
*Figure 6: (a) O*NET 직업 분류에 맞춘 환경 커버리지, (b) 32,122개 task의 카테고리·난이도·cross-app 분포, (c) 기존 GUI 에이전트 학습 데이터셋과의 비교 (Wang 2026, p.7)*

환경 풀의 근거는 둘이다. 웹 앱 94종의 카테고리는 O*NET 직업 task 분류의 SOC 대분류를 따른다. 그 카테고리 안에서 어떤 제품을 고를지는 Anthropic Economic Index의 소프트웨어 사용 분포를 근거로 삼았다. 데스크톱 쪽은 웹으로 표현 못 하는 OS 수준 워크플로를 메운다.

task 구성은 카테고리별로 고르게 퍼져 있고(어느 카테고리도 21%를 넘지 않는다) 어려운 쪽으로 기울어 있다 — hard가 45%, 앱을 넘나드는 cross-app이 38%다.

| 데이터셋 | 플랫폼 | 데이터 수 | 환경 수 | reward | 공개 |
|---|---|---:|---:|---|:---:|
| GUI-Genesis | Mobile | 969 | 1 | 프로그램 | 아니오 |
| WebArena-Infinity | Web | 1,260 | 10 | 프로그램 | 예 |
| InfiniteWeb | Web | 600 | — | 프로그램 | 부분 |
| UltraCUA | Desktop | 17,000 | 9 | 프로그램 | 부분 |
| Gym-Anything | Desktop | 7,277 | 193 | VLM | 예 |
| **CUA-Gym** | **Desktop+Web** | **32,112** | **110** | **프로그램** | **예** |

## 결과 (Results)

학습에는 CUA-Gym에서 뽑은 10,858개 튜플을 쓰고 같은 task 세트에 Claude Sonnet 4.6을 돌려 성공한 것만 남긴 3,578개 trajectory로 SFT 워밍업을 했다.

![[assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig05.png]]
*Figure 5: (a) OSWorld-Verified 도메인별 성공률 — 회색이 SFT base, 진한 빨강이 CUA-Gym이 올린 폭, 빗금이 되레 떨어진 도메인. (b) OSWorld-Verified·WebArena 종합 (Wang 2026, p.6)*

| 모델 | OSWorld-Verified | WebArena |
|---|---:|---:|
| Claude Sonnet 4.6 | 72.9 | 65.6 |
| Claude Opus 4.7 | 78.0 | — |
| GPT-5.5 | 78.7 | — |
| Kimi-K2.6 | 73.1 | — |
| EvoCUA-32B | 56.7 | — |
| OpenCUA-72B | 45.0 | — |
| Qwen3.5-35B-A3B (base) | 54.5 | 40.8 |
| Qwen3.5-397B-A17B (base) | 62.2 | 54.0 |
| **CUA-Gym-A3B** | **62.1** | **44.5** |
| **CUA-Gym-A17B** | **72.6** | **56.0** |

작은 쪽이 +7.6pp, 큰 쪽이 +10.4pp 올랐다. GUI 에이전트의 RL 이득은 보통 모델이 커질수록 줄어드는데 여기서는 반대다. WebArena는 홀드아웃이고 그 사이트 클론들은 학습에 쓴 94개 mock과 겹치지 않는다. 거기서도 오른 건 웹 mock 파이프라인이 합성 mock에 과적합되지 않는다는 근거다.

도메인별 편차는 크다. A3B에서 libreoffice_calc가 51.1→76.6(+25.5pp)로 가장 크게 오른 반면, vlc는 69.4→44.9(−24.5pp), thunderbird는 66.7→53.3(−13.4pp), chrome은 63.0→54.3(−8.7pp)으로 떨어졌다. A17B에서는 이 퇴행이 사라지고 vlc가 58.8→81.8(+23.0pp)로 뒤집힌다. 작은 모델에서는 학습 데이터가 두터운 도메인으로 능력이 쏠리며 얇은 도메인을 깎아먹는 것으로 보인다. 논문이 별도로 다루지 않는 대목이라 데이터 균형 문제로 남는다.

### 데이터를 늘리면 천장이 올라간다

![[assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig07.png]]
*Figure 7: SFT 초기화와 하이퍼파라미터를 고정한 채 1.4K·3K·12K 세 부분집합으로 학습한 결과. 왼쪽이 OSWorld-Verified 점수, 오른쪽이 학습 reward. 회색 점선이 SFT 기준선 0.53 (Wang 2026, p.8)*

세 곡선의 순서가 학습 내내 유지된다. 12K는 가장 높은 정점에 닿고 기준선에서 가장 일찍 벌어져 더 높은 대역을 유지한다. 3K와 1.4K는 기준선 근처에서 평평해진다. 12K 곡선에 포화로 꺾이는 지점이 아직 안 보이는 것이 이 논문이 강조하는 대목이다.

세 실행 모두 단조 증가했고 RLVR에서 흔한 진동·붕괴·reward와 성공률의 탈동조가 없었다. 합성된 reward가 학습을 버틸 만큼 안정적이라는 간접 근거다.

### 환경 다양성은 데이터 볼륨으로 대체되지 않는다

환경 수준 ablation은 RL로 하기엔 너무 비싸서 teacher distillation으로 대신했다. narrow(환경 10개·trajectory 3K), mid(80개·3K), broad(80개·6K) 세 조건이다. 데이터를 고정하고 환경만 늘리면(narrow→mid) 개선이 작다. 넓힌 풀에서 trajectory를 두 배로 늘리면(mid→broad) 훨씬 크게 오른다. 두 축은 서로를 대체하지 못하는 보완 관계다.

### 시키지 않은 action batching

SFT 초기 policy는 step당 tool call을 약 1개 낸다. RL이 진행되면 1.4~1.9 대역으로 안정화되고 같은 성능에서 trajectory가 33~45% 짧아진다. 원인은 그룹 정규화 advantage 하의 step 예산 압력으로 본다. 고정 예산 안에 끝낸 trajectory가 타임아웃보다 높은 상대 reward를 받으니 GSPO가 결정적 하위 시퀀스를 한 턴에 몰아넣는 policy를 저절로 고른다.

묶이는 것과 빠지는 것의 경계가 흥미롭다. `click(File)→click(Export)→click(PDF)` 같은 결정적 연쇄는 한 턴으로 나오는 반면, 네트워크 응답이나 시각 확인이 필요한 대화상자처럼 결과가 비결정적인 action은 묶인 그룹에서 눈에 띄게 빠져 있다. policy가 어떤 action을 묶어도 안전한지 거칠게나마 스스로 익혔다.

## 한계 (Limitations)

- 검증이 최종 상태만 본다. 깔끔하게 편집한 경우와 다 뒤엎었다가 같은 상태를 되돌린 경우를 구분하지 못한다.
- reward hacking이 없다고 보장하지는 못한다. information barrier와 금지 패턴 스캔이 위험을 줄일 뿐, 지나치게 느슨한 의미 검사나 성공과 상관관계만 있는 상태 프록시는 남는다.
- mock은 근사치라서 인증 흐름, 서드파티 연동, 네트워크 지연, rate limit, 드문 서버측 장애가 현재 mock 표면 밖에 있다.
- 가장 큰 RL 실행은 연산 비용 때문에 시드 하나로만 보고했다. 저자들은 이를 검증된 규모가 이 구간에서 가치 있다는 근거로만 읽으라고 명시한다.

## 관련 페이지 (Related Pages)

- [[agents/xlang-ai-cua-gym]] — 공식 코드 저장소. 파이프라인 실행 명령, mock 상태 API 규약, 자체 배포 절차
- [[agents/xlangai-cua-gym-dataset]] — Hugging Face 배포판. 공개 릴리스 통계와 실행 안전 주의사항
- [[agents/lin-2026-harness-updating-is-not-harness-benefit]] — 에이전트의 harness를 스스로 갱신시킬 때 어디에 역량 예산을 쓸지 가른 연구. CUA-Gym이 코딩 에이전트 harness로 데이터를 만든다는 점과 맞물린다
- [[agents/cemri-2025-why-do-multi-agent-llm-systems]] — 멀티에이전트 시스템의 실패 유형 분류. Generator·Discriminator·Orchestrator 3자 구조의 위험 지점을 짚는 데 참고
- [[agents/dennis-2026-compiling-agentic-workflows-into-llm]] — 오케스트레이션을 모델 가중치로 컴파일하는 방향. CUA-Gym이 scaffold를 유지한 채 policy만 학습시키는 것과 대비된다
- [[overviews/glossary-agents]] · [[overviews/glossary-physical-ai]] — policy·reward·rollout·trajectory 표기 기준
