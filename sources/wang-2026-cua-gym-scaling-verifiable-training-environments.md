---
title: "CUA-Gym: Scaling Verifiable Training Environments and Tasks for Computer-Use Agents"
type: paper
year: 2026
category: agents
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments.pdf
raw_filename: "wang-2026-cua-gym-scaling-verifiable-training-environments.pdf"
source_collection: external
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

## 한 줄 요약 (One-line Summary)

컴퓨터를 조작하는 에이전트를 강화학습으로 훈련하려면 (지시문, 실행 가능한 환경, 검증 가능한 reward) 세 쪽이 맞아떨어지는 데이터가 있어야 한다. CUA-Gym은 서로 격리된 두 코딩 에이전트에게 이 셋을 적대적으로 함께 만들게 해서 32,112개를 자동 생성했다. 그 데이터로 학습한 모델은 OSWorld-Verified 72.6%를 찍어 오픈소스 최고 성적을 냈다.

## 1. 자료 정보 (Document Information)

- **제목**: CUA-Gym: Scaling Verifiable Training Environments and Tasks for Computer-Use Agents
- **저자**: Bowen Wang, Dunjie Lu, Junli Wang, Tianyi Bai, Shixuan Liu, Zhipeng Zhang, Haiquan Wang, Hao Hu, Tianbao Xie, Shuai Bai, Dayiheng Liu, Que Shen, Junyang Lin, Tao Yu (교신저자 Tao Yu)
- **소속**: 홍콩대(HKU), Qwen Team(Alibaba), UC San Diego, 칭화대
- **arXiv**: 2605.25624v2 (cs.AI, 2026-06-08 개정, 본문 10p + 부록 포함 82p)
- **프로젝트**: <https://cua-gym.xlang.ai> · 코드 <https://github.com/xlang-ai/CUA-Gym> · 환경 <https://github.com/xlang-ai/CUA-Gym-Hub> · 데이터 <https://huggingface.co/datasets/xlangai/CUA-Gym>

## 2. 주요 기여 (Key Contributions)

RLVR은 verifiable reward를 쓰는 강화학습이다. 정답을 코드로 채점할 수 있는 문제에 policy를 최적화시키는 후처리 학습 방식으로, 수학·소프트웨어 엔지니어링·터미널 조작에서는 이미 자리를 잡았다. 넘어오지 못한 쪽이 computer-use agent다. 사람처럼 화면을 보고 마우스·키보드를 써서 데스크톱과 브라우저를 조작하는 에이전트를 말한다. 이 논문이 짚는 병목은 알고리즘이 아니라 데이터다.

1. task 지시문 $t$, 재현 가능한 초기 환경 상태 $s$, 검증 함수 $r: s \to [0,1]$ 을 각각 따로 만들지 않는다. 하나의 topic specification에서 셋을 같이 뽑아내 서로 어긋날 여지를 설계 단계에서 지웠다.
2. Generator와 Discriminator를 information barrier로 갈라놓았다. 같은 에이전트가 golden 상태를 만들고 reward까지 쓰면 reward는 "task가 끝났는가"를 놓치고 "내가 짠 setup 절차를 그대로 밟았는가"를 검사하게 된다. Discriminator를 Generator의 스크립트와 작업 디렉토리에 아예 접근하지 못하는 샌드박스에 가둔 이유다. 여기서 Discriminator는 task 설명과 결과 환경 두 개만 보고 `reward.py`를 쓴다.
3. mock 웹 애플리케이션 94종을 묶은 CUA-Gym-Hub. Plan/Dev/Web 세 에이전트가 돌아가며 진짜처럼 보이고 동작하되 상태를 프로그램으로 주입·조회·리셋할 수 있는 단일 페이지 앱을 합성했다. 실제 웹사이트는 인증을 요구하고 rate limit이 걸리며 같은 상태를 다시 만들 수도 없어 RL 환경으로 쓰지 못하기 때문이다.
4. 검증 튜플 32,112개에 환경 110개. 데스크톱 앱 16종과 mock 웹 앱 94종을 합친 수로, 프로그램 방식 검증과 데스크톱·웹 동시 커버리지를 함께 갖춘 것으로는 공개된 것 중 가장 크다.
5. Qwen3.5-35B-A3B와 Qwen3.5-397B-A17B를 GSPO로 학습한 CUA-Gym-A3B / A17B. OSWorld-Verified에서 각각 62.1%, 72.6%를 냈고 같은 체크포인트가 학습에 쓰지 않은 WebArena에서도 오른다.
6. 데이터와 환경 두 축을 각각 키워가며 스케일링을 실측했다. 데이터를 1.4K→3K→12K로 키우면 RL 학습 곡선의 천장이 같이 올라간다. 아직 포화 조짐은 없다.
7. 창발한 action batching. 학습 중 policy가 시키지도 않았는데 한 턴에 여러 tool call을 묶어 내보내기 시작하고 trajectory 길이가 33~45% 짧아진다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 데이터 합성 루프

이 논문에서 RLVR 데이터는 튜플 $(t, s, r)$ 이다. $t$는 자연어 지시문, $s$는 재현 가능한 초기 환경 상태, $r$은 최종 환경을 0에서 1 사이 점수로 매기는 검증 함수다.

**Task Generation.** 지시문만으로는 그 지시문이 성립하는 환경이 결정되지 않는다. 그래서 각 task를 지시문-컨텍스트 쌍 $(t, c)$ 로 만든다. $c$에는 초기 환경에 있어야 할 개체와 파일, 앱 상태가 들어간다. 이 컨텍스트의 근거는 실제 사용 패턴을 조사한 웹 리서치, 소프트웨어 문서, 미리 준비된 에셋 파일 세 갈래에서 온다. 각 task에는 난이도와 도메인, 관련 앱이 라벨로 붙는다.

**적대적 co-generation.** setup과 reward 스크립트는 코딩 에이전트에게 맡기되 한 에이전트에게 양쪽을 다 시키지는 않는다. task마다 앱과 파일 포맷, 검증 방식이 달라서 이 스크립트들을 손으로 쓰는 방식은 확장되지 않기 때문이다.

Orchestrator가 task마다 VM 두 대를 띄우고 두 서브에이전트를 돌린다.

- **Generator**: task와 도메인 skill 파일을 읽고 `initial_setup.py`와 `golden_patch.py`를 작성해 두 VM에서 실행, $s_{\text{init}}$ 과 $s_{\text{gold}}$ 를 만든다.
- **Discriminator**: Generator의 스크립트와 작업 디렉토리에 접근이 차단된 샌드박스 프로세스에서 돈다. 보는 것은 $t$와 결과 환경 두 개뿐이다. task를 세부 판정 기준으로 쪼갠 뒤 이를 합산해 $[0,1]$ 점수를 내는 `reward.py`를 쓴다.

Orchestrator는 라운드마다 양쪽 출력을 살펴 다섯 가지 합의 조건이 전부 만족될 때까지 재시도시킨다. 실행해봤을 때 `reward(golden) = 1.0` 이고 `reward(initial) = 0.0` 인 것이 가장 기본이 되는 조건이다.

**두 단계 필터.** 루프가 수렴했다는 건 튜플이 자기들끼리 앞뒤가 맞는다는 뜻이지, 지시문이 모호하지 않다거나 어떤 policy든 풀 수 있다는 뜻은 아니다. 이런 문제는 rollout을 돌려봐야 드러난다. 그래서 통과한 튜플 전부를 데이터셋 수준 필터에 한 번 더 태운다. 앞 단계는 LLM 다수결로 일관성·실행 가능성·hack 위험·명료성·난이도 보정 다섯 축에 점수를 매긴다. 뒤 단계는 teacher 모델 rollout으로 실제로 풀리는지와 reward가 성공 여부를 제대로 따라가는지를 본다.

### 3.2 환경 확장 — CUA-Gym-Hub

기존 벤치마크는 데스크톱 앱 몇 개가 전부고 진짜 웹사이트는 RL 환경으로 쓸 수 없다. task 다양성의 상한이 곧 환경 다양성이니 94개 mock 앱을 직접 합성했다. 각각은 단일 페이지 앱이며 세션 상태를 조회·주입·리셋할 수 있는 통합 HTTP API를 노출한다.

mock을 만드는 쪽도 에이전트 여럿이 붙는다. Plan Agent가 웹 리서치와 레퍼런스 스크린샷으로 대상 앱을 파악해 기능과 데이터 스키마, API 프로토콜, UI 레이아웃 트리를 담은 개발 명세를 쓴다. 이 UI 레이아웃 트리가 검증 기준이 된다. Dev Agent가 명세대로 구현하면 Web Agent가 Playwright로 모든 인터랙티브 요소를 눌러보며 실제 DOM을 기준과 대조해 차이를 Dev Agent에게 돌려보낸다. 둘이 수렴할 때까지 돈다. 최종 산출물에는 API와 함정, 검증 템플릿을 정리한 `SKILL.md`가 붙고 이게 그대로 task 합성 파이프라인의 입력이 된다.

mock을 웹사이트 복제본에 그치지 않는 학습 환경으로 만드는 설계가 둘 있다.

- **state injection**: task가 자기 JSON 초기 상태를 `reward.py`와 함께 들고 온다. mock 구현 하나가 코드 수정 없이 서로 다른 수많은 task 세계를 호스팅한다.
- **session isolation**: 모든 변경·업로드·리셋이 세션 id로 스코프된다. 분산 RL 워커들이 같은 mock 백엔드 풀을 공유하면서도 서로의 변경을 보지 않는다.

### 3.3 학습 scaffold — trajectory slicing

에이전트는 원본 스크린샷을 보고 tool call 태그로 감싼 action을 낸다. 긴 호흡의 rollout은 두 가지 압력을 만든다. 이미지가 많은 히스토리를 어떻게 컨텍스트에 담을지, 그리고 겹치는 prefix가 많은 trajectory들을 어떻게 효율적으로 학습시킬지다.

흔한 sliding window는 최근 5턴만 남기고 나머지를 버린다. 그러면 나중 action을 설명하는 앞부분 상태가 통째로 사라진다. trajectory slicing은 rollout 하나에서 같은 컨텍스트 예산으로 여러 학습 샘플을 만든다. system/task prefix는 유지하고 오래된 스크린샷만 `<image collapsed>` placeholder로 접으며 최근 observation과 assistant action은 멀티모달 원형 그대로 둔다. 규칙이 결정적이라 학습된 요약과 달리 손실이 예측 가능하다. 재사용 가능한 prefix도 명시적으로 남아 인접 slice의 policy 로그확률을 계산할 때 KV 캐시를 재사용할 수 있다.

### 3.4 학습 알고리즘

GSPO(Group Sequence Policy Optimization)로 학습한다. GSPO는 중요도 비율을 토큰이 아니라 시퀀스 단위로 잡는 방식으로, mixture-of-experts 모델의 RL 학습에서 더 안정적이다. policy $\pi_\theta$ 가 $G$개 rollout을 내면 각각 $r_i = r(s, \tau_i) \in [0,1]$ 을 받는다. 학습은 그룹 정규화 advantage $\hat{A}_i = (r_i - \mu)/\sigma$ 로 가중된 clipped surrogate를 최대화한다. 시퀀스 단위 중요도 비율은 trajectory 길이 $|\tau_i|$ 로 기하평균을 낸 형태다.

$$\rho_i = \left( \frac{\pi_\theta(\tau_i \mid t, s)}{\pi_{\theta_{\text{old}}}(\tau_i \mid t, s)} \right)^{1/|\tau_i|}$$

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 실험 설정

CUA-Gym에서 10,858개 검증 튜플을 뽑아 RLVR 학습 세트로 쓰고 SFT 워밍업에는 같은 task 세트에 Claude Sonnet 4.6을 돌려 성공한 것만 남긴 3,578개 trajectory를 썼다. 모델은 Qwen3.5-35B-A3B와 Qwen3.5-397B-A17B 두 규모다.

### 4.2 종합 성적

| 모델 | OSWorld-Verified | WebArena |
|---|---:|---:|
| Claude Sonnet 4.6 | 72.9 | 65.6 |
| Claude Opus 4.7 | 78.0 | — |
| GPT-5.5 | 78.7 | — |
| EvoCUA-32B | 56.7 | — |
| Kimi-K2.6 | 73.1 | — |
| OpenCUA-72B | 45.0 | — |
| Qwen3.5-35B-A3B (base) | 54.5 | 40.8 |
| Qwen3.5-397B-A17B (base) | 62.2 | 54.0 |
| **CUA-Gym-A3B** | **62.1** | **44.5** |
| **CUA-Gym-A17B** | **72.6** | **56.0** |

작은 쪽이 +7.6pp, 큰 쪽이 +10.4pp 오른다. GUI 에이전트의 RL 이득은 보통 모델이 커질수록 줄어드는데 여기서는 오히려 큰 쪽이 더 올랐다. CUA-Gym-A3B는 활성 파라미터가 약 10분의 1인 채로 Qwen3.5-397B-A17B base와 맞먹는다.

WebArena는 학습에 쓰지 않은 홀드아웃이고 그 사이트 클론들은 학습에 쓴 94개 mock과 겹치지 않는다. 여기서도 +3.7pp, +2.0pp 올랐다. 웹 mock 파이프라인이 합성 mock에 과적합되지 않고 브라우저 환경 전반으로 옮겨가는 능력을 길러준다는 뜻이다.

### 4.3 도메인별 편차

A3B에서 libreoffice_calc가 51.1→76.6(+25.5pp)로 가장 크게 오른 반면 vlc는 69.4→44.9(−24.5pp), thunderbird는 66.7→53.3(−13.4pp), chrome은 63.0→54.3(−8.7pp)으로 되레 떨어졌다. 전체는 올랐지만 균일하지 않다. A17B에서는 이 퇴행이 사라지고 vlc가 58.8→81.8(+23.0pp)로 뒤집힌다. 작은 모델에서는 학습 데이터가 두터운 도메인으로 능력이 쏠리며 얇은 도메인을 깎아먹는다.

### 4.4 데이터 스케일링

SFT 초기화와 하이퍼파라미터를 고정한 채 1.4K·3K·12K 세 부분집합으로 학습했다. 세 곡선의 순서는 학습 내내 그대로다. 12K가 가장 높은 정점에 도달하고 SFT 기준선에서 가장 일찍 벌어져 더 높은 대역을 유지하는 반면 3K와 1.4K는 기준선 근처에서 평평해진다. 12K 곡선에는 포화로 꺾이는 지점이 아직 안 보인다.

세 실행 모두 SFT 기준선에서 단조 증가했다. RLVR에서 흔한 진동이나 붕괴, reward와 성공률의 탈동조도 없었다. 합성된 reward가 학습을 버틸 만큼 안정적이라는 간접 근거다.

### 4.5 환경 스케일링

환경 수준 ablation은 RL로 하기엔 너무 비싸서 teacher distillation으로 대신했다. Claude Sonnet 4.6을 굴려 $r(s,\tau) = 1$ 인 trajectory만 남기고 Qwen3.5-35B-A3B를 SFT로 학습시킨다. 세 조건은 narrow(환경 10개·trajectory 3K), mid(환경 80개·3K), broad(환경 80개·6K)다.

narrow → mid, 즉 데이터 총량 고정에 환경만 늘리면 개선이 작다. mid → broad, 넓힌 환경 풀에서 trajectory를 두 배로 늘리면 훨씬 크게 오른다. 논문은 두 축을 서로 보완하는 관계로 읽는다. 한쪽이 다른 쪽을 대체하지는 못한다. 환경을 넓혀두지 않으면 trajectory를 아무리 늘려도 다양한 노출을 대신할 수 없다.

### 4.6 창발한 action batching

SFT 초기 policy는 step당 tool call을 약 1개 낸다. RL이 진행되면 이 값이 1.4~1.9 대역으로 안정화되고 같은 성능에서 trajectory 길이가 33~45% 짧아진다. 최적화 대상이 아니었는데 나타난 행동이다.

원인은 그룹 정규화 advantage 하의 step 예산 압력으로 본다. 고정된 task별 예산 안에 끝낸 trajectory가 타임아웃된 것보다 높은 상대 reward를 받으니 GSPO는 결정적인 하위 시퀀스를 한 턴에 몰아넣는 policy를 자연히 고르게 된다. 실제 rollout을 보면 `click(File)→click(Export)→click(PDF)` 같은 결정적 연쇄는 한 턴으로 나온다. 반면 네트워크 응답이나 시각 확인이 필요한 대화상자처럼 결과가 비결정적인 action은 묶인 그룹에 눈에 띄게 없다. policy가 어떤 action은 묶어도 안전한지를 두고 거친 모델을 내재화했다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

reward가 검증하는 것은 에이전트가 도달한 마지막 환경 상태지 거기까지 간 과정이 아니다. 깔끔하게 편집한 경우와 파괴적으로 뒤엎었다가 같은 최종 상태를 다시 만든 경우를 구분하지 못한다. reward hacking도 형식적으로 배제하지는 못한다. information barrier와 금지 패턴 스캔이 위험을 줄이지만 지나치게 느슨한 의미 검사나 성공과 상관관계만 있는 상태 프록시 같은 잔여 경로는 남는다.

- mock은 근사치다. 인증 흐름, 서드파티 연동, 네트워크 지연, rate limit, 드문 서버측 장애 상태는 현재 mock 표면 밖이다.
- 가장 큰 RL 실행은 연산 비용 때문에 시드 하나로만 보고했다. 저자들은 이를 "검증된 task·환경 규모가 이 구간에서 가치 있다"는 근거로 읽되 파이프라인의 최종 천장이나 배포가 얼마나 견고한지를 말하는 근거로는 읽지 말라고 명시한다.
- §4.3에서 본 작은 모델의 vlc·thunderbird 하락을 논문은 별도 절로 다루지 않는다. 데이터를 어떻게 구성하고 도메인을 어떻게 균형 잡을지가 과제로 남는다.

## 6. 관련 연구 (Related Work)

실행 가능한 환경 안의 산출물을 뒤틀거나 역설계해 task를 만들고 프로그램 검사로 결과를 확인하는 방식은 디지털 에이전트의 데이터 합성에서 이미 가장 널리 쓰이는 레시피다. 소프트웨어 엔지니어링에서는 SWE-smith가 LM 기반 함수 재작성과 AST 변이로 버그를 심고 R2E-Gym이 커밋에서 실행 보조 역번역으로 task를 뽑으며 SWE-Gym이 수천 개 저장소로 확장한다. 전부 유닛 테스트를 이진 reward로 쓴다. 터미널에서는 Endless Terminals와 Terminal-Task-Gen이 컨테이너화된 CLI task를 절차적으로 생성하되 사전 테스트가 처음엔 반드시 실패하고 올바른 실행 뒤에만 통과해야 한다는 이중 검증 규약을 건다. 이들 모두 수만 개 규모에서 로그선형 스케일링이 아직 포화하지 않았다고 보고한다. 저자들은 이 일관성을 GUI 에이전트에도 같은 인프라를 만들 이유로 읽는다.

GUI 에이전트의 task·환경 합성에는 reward 검증 가능성과 환경 범위 사이의 긴장이 깔려 있다. 한 갈래는 VLM 기반 reward 추정으로 앱별 계측 없이 일반화하려 한다. ZeroGUI는 자체 ablation에서 이때 생기는 거짓 양성 reward가 RL 학습을 불안정하게 만든다고 확인했다. 다른 갈래는 코드 네이티브 reward 오라클을 가진 웹 환경을 합성한다. GUI-Genesis는 task별 Flask 앱으로, InfiniteWeb은 task 중심 TDD로, AutoWebWorld는 유한상태기계 전이 모델로 간다. 그러나 전부 브라우저 안에 갇혀 OS 수준 데스크톱 task나 앱 간 워크플로를 다루지 못한다. 데스크톱과 검증 가능성을 잇는 최근 시도들은 체크리스트 기반 VLM 평가로 후퇴하거나(Gym-Anything) 앱 커버리지가 좁다. 이 논문은 결정적 검증과 넓은 OS 수준 앱 커버리지, 확장 가능한 task 다양성을 동시에 달성한 선행 연구가 없다고 본다.

기존 데이터셋과 견준 규모는 다음과 같다.

| 데이터셋 | 플랫폼 | 데이터 수 | 환경 수 | reward | 공개 |
|---|---|---:|---:|---|:---:|
| GUI-Genesis | Mobile | 969 | 1 | 프로그램 | 아니오 |
| WebArena-Infinity | Web | 1,260 | 10 | 프로그램 | 예 |
| InfiniteWeb | Web | 600 | — | 프로그램 | 부분 |
| UltraCUA | Desktop | 17,000 | 9 | 프로그램 | 부분 |
| Gym-Anything | Desktop | 7,277 | 193 | VLM | 예 |
| **CUA-Gym** | **Desktop+Web** | **32,112** | **110** | **프로그램** | **예** |

## 7. 용어집 (Glossary)

이 자료 고유의 용어만 담는다. policy·reward·rollout·trajectory·action·강화학습 등 도메인 공통 용어는 [[overviews/glossary-physical-ai]]와 [[overviews/glossary-agents]]를 따른다.

| 용어 | 뜻 |
|---|---|
| CUA (computer-use agent) | 화면을 보고 마우스·키보드로 데스크톱과 브라우저를 조작하는 에이전트 |
| RLVR | reinforcement learning with verifiable rewards. 코드로 채점 가능한 reward를 쓰는 강화학습 후처리 |
| CUA-Gym-Hub | 이 연구가 합성한 94개 mock 웹 앱 묶음. 상태 주입·리셋 API를 갖춘 재사용 환경 층 |
| Generator | 초기 상태와 golden 상태를 만드는 서브에이전트. `initial_setup.py`·`golden_patch.py` 작성 |
| Discriminator | task 설명만 보고 `reward.py`를 쓰는 서브에이전트. Generator의 코드에 접근 차단 |
| information barrier | Generator의 스크립트·작업 디렉토리를 Discriminator에게 감추는 프로세스 수준 격리 |
| golden state | task를 올바로 수행했을 때 도달해야 할 정답 환경 상태 |
| state injection | task별 JSON 초기 상태를 주입해 같은 mock 구현으로 여러 task 세계를 만드는 설계 |
| session isolation | 모든 변경을 세션 id로 스코프해 분산 워커가 서로 간섭하지 않게 하는 설계 |
| trajectory slicing | rollout 하나에서 오래된 스크린샷만 접어 여러 학습 샘플을 만드는 컨텍스트 관리 기법 |
| GSPO | Group Sequence Policy Optimization. 중요도 비율을 시퀀스 단위로 잡는 RL 알고리즘 |
| action batching | 한 턴에 여러 tool call을 묶어 내보내는, 학습 중 창발한 행동 |
| OSWorld-Verified | 실제 데스크톱 환경 벤치마크 OSWorld의 검증판 |
| WebArena | 사이트 클론 위에서 브라우저 task를 평가하는 벤치마크. 이 연구에서는 홀드아웃 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 3 | 데이터 합성 파이프라인 전체 구조 | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 4 | mock 웹 앱 합성 멀티에이전트 파이프라인 | caption-region | ★ wiki 권장 (method) |
| fig03 | 5 | state injection된 메일 mock 세 상태 | caption-region | ○ 보조 (설계 예증) |
| fig04 | 5 | trajectory slicing vs sliding window | caption-region | ★ wiki 권장 (method) |
| fig05 | 6 | 도메인별 성공률 + 종합 결과표 | caption-region | ★ wiki 권장 (result) |
| fig06 | 7 | 환경 커버리지·task 분포·데이터셋 비교 3분할 | caption-region | ★ wiki 권장 (dataset) |
| fig07 | 8 | 데이터 스케일링 곡선 | caption-region | ★ wiki 권장 (result) |
| fig08 | 8 | 환경 스케일링 ablation | caption-region | ○ 보조 |
| fig09 | 9 | 창발한 action batching 곡선 | caption-region | ○ 보조 |
| fig10 | 23 | mock 앱 32종 랜딩 페이지 | caption-region | (면적비 0.67 — 확인 필요) |
| tab01 | 17 | information barrier 접근 권한 행렬 | table-region | ★ wiki 권장 (method 핵심) |
| tab02~tab13 | 21~74 | 부록 통계·하이퍼파라미터 | table-region | (부록 — 아카이브만) |
