---
title: "CUA-Gym: Scaling Verifiable Training Environments and Tasks for Computer-Use Agents"
type: paper
year: 2026
category: agents
raw_path: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments.pdf
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
    caption: "CUA-Gym 데이터 합성 파이프라인 전체 구조. Orchestrator가 VM 두 대를 준비하고 Generator와 Discriminator를 information barrier로 갈라 실행한 뒤 Filter를 통과시킨다"
    page: 3
    bbox_norm: [0.109, 0.077, 0.891, 0.272]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig02.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/fig02.png
    caption: "mock 웹 앱 합성 멀티에이전트 파이프라인. Plan Agent가 DESIGN.md와 TODO.md를 쓰고 Dev Agent가 구현하며 Web Agent가 Playwright로 UI를 검사해 N라운드 반복한다"
    page: 4
    bbox_norm: [0.109, 0.077, 0.891, 0.242]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig03.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/fig03.png
    caption: "state injection 예시. 같은 메일 mock에 빈 받은편지함, 마감 임박 상태, 부재 후 백로그 세 가지 초기 상태를 주입한 화면"
    page: 5
    bbox_norm: [0.109, 0.077, 0.891, 0.217]
    strategy: caption-region
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig04.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/fig04.png
    caption: "trajectory slicing과 sliding window 비교. 오래된 스크린샷만 placeholder로 접고 assistant의 사고와 tool call은 원문 그대로 남긴다"
    page: 5
    bbox_norm: [0.136, 0.574, 0.864, 0.755]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig05.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/fig05.png
    caption: "주요 결과. (a) OSWorld-Verified 도메인별 성공률을 A3B와 A17B 두 패널로 나눠 표시하고, (b) OSWorld-Verified와 WebArena 종합 성적을 표로 정리한다"
    page: 6
    bbox_norm: [0.109, 0.356, 0.891, 0.678]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig06.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/fig06.png
    caption: "데이터셋 구성. (a) 직업 분류별 환경 커버리지, (b) 시나리오와 난이도와 cross-app 분포, (c) 기존 GUI 에이전트 학습 데이터셋과의 비교"
    page: 7
    bbox_norm: [0.108, 0.077, 0.893, 0.431]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig07.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/fig07.png
    caption: "데이터 스케일링. 1.4K, 3K, 12K 튜플로 나눠 학습한 100 step 구간의 OSWorld-Verified 점수와 학습 reward 곡선"
    page: 8
    bbox_norm: [0.109, 0.077, 0.891, 0.293]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig08.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/fig08.png
    caption: "환경 스케일링 ablation. teacher distillation 설정에서 환경 10개 대 80개, trajectory 3K 대 6K 세 조건의 OSWorld-Verified 점수"
    page: 8
    bbox_norm: [0.505, 0.494, 0.891, 0.688]
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/fig09.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/fig09.png
    caption: "학습 중 창발한 action batching. model step당 tool call 수가 1.0에서 시작해 step 15에서 2.63까지 올랐다가 1.4에서 1.9 사이 대역에 자리 잡는다"
    page: 9
    bbox_norm: [0.52, 0.193, 0.891, 0.442]
    strategy: caption-region
    curated: true
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
    caption: "information barrier를 강제하는 접근 권한 행렬. Generator와 Discriminator가 자원별로 갖는 read, write, denied 권한 9개 항목"
    page: 17
    bbox_norm: [0.221, 0.077, 0.779, 0.243]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab02.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/tab02.png
    caption: "O*NET SOC 대분류 14종과 mock 앱 카테고리의 매핑"
    page: 21
    bbox_norm: [0.179, 0.573, 0.823, 0.858]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab03.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/tab03.png
    caption: "합성된 mock 웹 앱 전체 목록. 16개 카테고리로 묶여 있다"
    page: 22
    bbox_norm: [0.16, 0.461, 0.841, 0.84]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab04.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/tab04.png
    caption: "측정 대상 mock 앱 99종의 구조 통계. 소스 LOC, route 수, 데이터 모델 엔티티 수의 분위값"
    page: 25
    bbox_norm: [0.172, 0.077, 0.828, 0.152]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab05.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/tab05.png
    caption: "mock 앱 소스 LOC 분포. 6개 구간별 앱 수와 비율"
    page: 25
    bbox_norm: [0.379, 0.178, 0.621, 0.288]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab06.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/tab06.png
    caption: "GSPO 학습 하이퍼파라미터 전체 목록"
    page: 31
    bbox_norm: [0.162, 0.077, 0.841, 0.472]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab07.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/tab07.png
    caption: "학습 후 자주 묶여 나온 길이 2 이상의 tool call 시퀀스 상위 12종"
    page: 32
    bbox_norm: [0.284, 0.664, 0.716, 0.846]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab08.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/tab08.png
    caption: "action별 solo rate. 단독으로 나오는 비율이 높은 action과 항상 묶여서만 나오는 action을 가른다"
    page: 33
    bbox_norm: [0.335, 0.247, 0.665, 0.44]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab09.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/tab09.png
    caption: "공개된 CUA-Gym 코퍼스의 시나리오별 task 수 10개 항목"
    page: 72
    bbox_norm: [0.338, 0.274, 0.662, 0.431]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab10.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/tab10.png
    caption: "도메인 18종과 난이도 3단계의 교차표"
    page: 72
    bbox_norm: [0.289, 0.593, 0.711, 0.864]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/wang-2026-cua-gym-scaling-verifiable-training-environments/tab11.png
    raw: raw/papers/wang-2026-cua-gym-scaling-verifiable-training-environments-figures/tab11.png
    caption: "task 지시문에 가장 많이 쓰인 명령형 동사와 빈도"
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
    caption: "task 지시문의 단어 길이 분포와 요약 통계"
    page: 74
    bbox_norm: [0.309, 0.077, 0.691, 0.218]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

컴퓨터를 조작하는 에이전트를 강화학습으로 훈련하려면 지시문과 실행 가능한 환경과 검증 가능한 reward 세 요소가 서로 맞아떨어지는 데이터가 필요하다. CUA-Gym은 서로 격리된 두 코딩 에이전트에게 이 셋을 적대적으로 함께 만들게 해 검증 튜플 32,112개를 자동 생성했다. 그 데이터로 GSPO 학습한 모델이 OSWorld-Verified 72.6%를 기록했다. 저자들은 이를 "각자의 규모대에서 오픈소스 CUA 중 최고"라고 표현하는데, 논문 자체 비교표에는 Kimi-K2.6이 73.1%로 더 높게 올라 있어 규모 조건 없이는 성립하지 않는 주장이다.

## 1. 자료 정보 (Document Information)

- **제목**: CUA-Gym: Scaling Verifiable Training Environments and Tasks for Computer-Use Agents
- **저자**: Bowen Wang, Dunjie Lu, Junli Wang, Tianyi Bai, Shixuan Liu, Zhipeng Zhang, Haiquan Wang, Hao Hu, Tianbao Xie, Shuai Bai, Dayiheng Liu, Que Shen, Junyang Lin, Tao Yu (교신저자 Tao Yu)
- **소속**: 홍콩대(HKU), Qwen Team(Alibaba), UC San Diego, 칭화대
- **arXiv**: 2605.25624v2 (cs.AI, 2026-06-08 개정)
- **분량**: 본문 10페이지, 부록 포함 총 82페이지. 부록은 A(데이터 합성 상세), B(mock 환경 합성), C(학습 상세), D(추가 실험), E(정성 예시), F(데이터셋 통계), G(프롬프트 카탈로그) 일곱 절이다
- **프로젝트**: <https://cua-gym.xlang.ai>, 코드 <https://github.com/xlang-ai/CUA-Gym>, 환경 <https://github.com/xlang-ai/CUA-Gym-Hub>, 데이터 <https://huggingface.co/datasets/xlangai/CUA-Gym>

## 2. 주요 기여 (Key Contributions)

RLVR은 verifiable reward를 쓰는 강화학습이다. 정답을 코드로 채점할 수 있는 문제에 policy를 최적화시키는 post-training 방식으로, 수학과 소프트웨어 엔지니어링과 터미널 조작에서는 이미 자리를 잡았다. 넘어오지 못한 쪽이 computer-use agent다. 사람처럼 화면을 보고 마우스와 키보드를 써서 데스크톱과 브라우저를 조작하는 에이전트를 말한다. 이 논문이 짚는 병목은 알고리즘이 아니라 데이터다.

논문 자체는 기여를 파이프라인, 환경 층, 스케일링 실증 세 가지로 묶는다. 세부로 펼치면 다음 일곱 항목이 된다.

1. task 지시문 $t$, 재현 가능한 초기 환경 상태 $s$, 검증 함수 $r: s \to [0,1]$ 을 각각 따로 만들지 않는다. 하나의 topic specification에서 셋을 같이 뽑아내 서로 어긋날 여지를 설계 단계에서 지웠다.
2. Generator와 Discriminator를 information barrier로 갈라놓았다. 같은 에이전트가 golden 상태를 만들고 reward까지 쓰면 reward는 "task가 끝났는가"를 놓치고 "내가 짠 setup 절차를 그대로 밟았는가"를 검사하게 된다. Discriminator를 Generator의 스크립트와 작업 디렉토리에 아예 접근하지 못하는 샌드박스에 가둔 이유다.
3. mock 웹 애플리케이션 94종을 묶은 CUA-Gym-Hub. Plan, Dev, Web 세 에이전트가 번갈아 실행되며 진짜처럼 동작하되 상태를 프로그램으로 주입하고 조회하고 리셋할 수 있는 단일 페이지 앱을 합성했다. 실제 웹사이트는 인증을 요구하고 rate limit이 걸리며 같은 상태를 다시 만들 수도 없어 RL 환경으로 쓰지 못하기 때문이다.
4. 검증 튜플 32,112개에 환경 110개. 데스크톱 앱 16종과 mock 웹 앱 94종을 합친 수로, 프로그램 방식 검증과 데스크톱 및 웹 동시 커버리지를 함께 갖춘 것으로는 공개된 것 중 가장 크다고 저자들은 밝힌다.
5. Qwen3.5-35B-A3B와 Qwen3.5-397B-A17B를 GSPO로 학습한 CUA-Gym-A3B와 CUA-Gym-A17B. OSWorld-Verified에서 각각 62.1%, 72.6%를 냈고 같은 체크포인트가 학습에 쓰지 않은 WebArena에서도 오른다.
6. 데이터 양과 환경 다양성을 각각 키워가며 스케일링을 실측했다. 데이터를 1.4K에서 3K, 12K로 키우면 RL 학습 곡선의 정점이 같이 올라간다. 저자들은 12K 곡선에서 포화 조짐을 찾지 못했다고 보고한다.
7. 창발한 action batching. policy가 최적화 대상으로 지정되지도 않았는데 한 턴에 여러 tool call을 묶어 내보내기 시작하고, 같은 성능에서 trajectory 길이가 33%에서 45% 짧아진다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 튜플 정의와 task 생성

이 논문에서 RLVR 데이터는 튜플 $(t, s, r)$ 이다.

| 기호 | 정체 | 산출 주체 |
|---|---|---|
| $t$ | 자연어 task 지시문 | Task-Gen |
| $c$ | 초기 환경에 있어야 할 개체, 파일, 앱 상태를 열거한 컨텍스트 | Task-Gen |
| $s_{\text{init}}$ | `initial_setup.py`가 만드는 재현 가능한 초기 상태 | Generator |
| $s_{\text{gold}}$ | `golden_patch.py`가 만드는 정답 상태 | Generator |
| $r$ | 최종 환경을 $[0,1]$ 로 채점하는 `reward.py` | Discriminator |

지시문만으로는 그 지시문이 성립하는 환경이 결정되지 않는다. 그래서 각 task를 지시문과 컨텍스트의 쌍 $(t, c)$ 로 만든다. 컨텍스트의 근거는 실제 사용 패턴을 조사한 웹 리서치, 소프트웨어 문서, 미리 준비된 에셋 파일 세 가지다. 각 task에는 난이도와 도메인, 관련 앱이 라벨로 붙는다.

앱마다 기능 분류 트리(feature taxonomy tree)를 만든다. 내부 노드는 관련 기능을 묶고 리프는 원자적 UI 기능에 대응한다. `libreoffice_calc` 아래 `formatting` 아래 `conditional_formatting` 같은 경로다. 트리는 공식 문서와 LLM 웹 리서치로 부트스트랩하고 깊이는 4 이하, 노드당 분기는 12 이하로 제한한다. `libreoffice_calc` 트리는 최상위 서브트리 9개에 리프 147개이고 `formatting` 하나가 리프 21개쯤을 차지한다.

트리 위에서 task를 다음 다섯 차원으로 뽑는다. 샘플러는 셀별 누적 개수를 유지하며 역빈도 가중으로 덜 채워진 셀 쪽으로 편향시킨다.

| 차원 | 값 |
|---|---|
| platform | desktop / web / cross |
| domain | O*NET에 맞춘 10개 카테고리 |
| difficulty | easy(원자 action 3개 이하) / medium(3에서 10 step) / hard(장기 planning 필요) |
| scenario | commercial / educational / scientific / personal |
| task type | single-application / cross-application |

매트릭스는 세 번 훑는다. Pass 1(breadth)은 트리 전역을 균일 샘플링하며 모든 리프가 최소 25개 task를 받도록 산출량을 맞춘다. Pass 2(gap-fill)는 Pass 1 결과의 사후 커버리지 분석으로 과소 대표 셀을 골라 다시 뽑는데, cross-application과 hard 분포를 의도적으로 올리는 단계다. Pass 3(edge cases)은 단발 해결 한계에 걸친 task, 비정상 순서로 앱을 섞은 task, drag와 hotkey chord와 다중 창 이동 같은 희귀 primitive를 강제하는 task를 노린다.

생성된 지시문은 중복 방지 검사 세 가지를 통과해야 한다. 문장 임베딩 코사인 유사도가 0.85 이상이면 근접 중복으로 표시하고, 기존 task와 토큰 4-gram을 50% 넘게 공유하면 거부하며, 같은 지시문 템플릿은 앱당 3개 인스턴스까지만 허용한다. 어느 검사든 걸리면 "diversify" 지시를 붙여 Generator에 재합성을 요청한다.

샘플러는 다음을 하드 제약으로 강제한다고 명시한다. 넷째 항목은 논문 안에서 산술이 성립하지 않는다 (5절 참고).

| 제약 | 값 |
|---|---|
| 도메인 카테고리 최대 비중 | 21% 이하 |
| hard task 비중 | 40% 이상 |
| cross-application task 비중 | 35% 이상 |
| 앱당 검증 튜플 | 1,000개 이상, 단일 앱이 코퍼스의 15% 초과 금지 |

### 3.2 적대적 co-generation 루프

setup과 reward 스크립트는 코딩 에이전트에게 맡기되 한 에이전트에게 양쪽을 다 시키지는 않는다. task마다 앱과 파일 포맷, 검증 방식이 달라서 이 스크립트들을 손으로 쓰는 방식은 확장되지 않기 때문이다.

| 역할 | 입력 | 산출 | 격리 |
|---|---|---|---|
| Orchestrator | task-gen 출력 JSON | VM 준비, 서브에이전트 spawn, 합의 조건 판정, 최종 튜플 기록 | 스크립트를 직접 쓰지 않는다 |
| Generator | $t$, $c$, 도메인 skill 파일 | `initial_setup.py`, `golden_patch.py`를 써서 두 VM에 실행 | `reward.py`를 못 본다. `REVIEW.md`만 읽는다 |
| Discriminator | $t$, $c$, 도메인 skill 파일, 두 VM의 state-only API | task를 세부 판정 기준으로 쪼갠 뒤 합산해 $[0,1]$ 점수를 내는 `reward.py`, 판정과 피드백을 담은 `REVIEW.md` | Generator의 스크립트, 작업 디렉토리, VM 파일시스템 접근이 전부 차단된다 |

튜플 $(t, s_{\text{init}}, s_{\text{gold}}, r)$ 은 다음 다섯이 동시에 성립할 때만 루프를 통과한다.

| 조건 | 내용 | 검사 대상 |
|---|---|---|
| C1 | `initial_setup.py`가 $V_{\text{init}}$ 에서 예외 없이 완주 | 환경 산출물의 형식 정합성 |
| C2 | `golden_patch.py`가 $V_{\text{gold}}$ 에서 예외 없이 완주 | 환경 산출물의 형식 정합성 |
| C3 | $r(V_{\text{gold}}) = 1.0$ | reward가 정답 끝점에서 만점을 준다 |
| C4 | $r(V_{\text{init}}) = 0.0$ | reward가 시작 끝점에서 0점을 준다 |
| C5 | `reward.py`에 금지 패턴이 하나도 없다 | reward가 산출물 동일성이 아니라 task 의미를 검사한다 |

Discriminator가 쓴 `reward.py`는 작성 시점에 정적 스캔을 받는다. 하나라도 걸리면 라운드를 중단하고 걸린 패턴을 피드백으로 붙여 재요청한다. 검사는 정규식과 Python AST 순회를 함께 쓴다.

| 금지 패턴 | 내용 |
|---|---|
| 직접 부울 대입 | 계산 없이 검증 플래그에 값을 넣는다. `chart_verified = True` 같은 형태 |
| placeholder 검증 | 플래그에 상수를 넣고 중간 평가 없이 조건부로 점수에 더한다 |
| 하드코딩 성공 | 환경을 보지 않고 성공 경로에서 0.5나 1.0 같은 상수를 반환한다 |
| 존재 여부만 채점 | 내용 검사 없이 `os.path.exists(...)` 만으로 점수를 준다 |
| `subprocess` 사용 | 외부 프로세스를 불러 채점한다. 재현 불가능하고 위조가 쉽다 |
| 주석만으로 검증 | `# assume X is correct` 같은 주석 뒤에 실제 검사 코드 없이 점수를 올린다 |

라운드 상한은 $K = 5$ 다. 실패한 라운드마다 Discriminator가 실패 조건, 관측된 $(r_{\text{init}}, r_{\text{gold}})$ 값, 걸린 금지 패턴, 자유 서술 권고를 담은 `REVIEW.md`를 낸다. Generator는 이것만 피드백으로 받아 스크립트를 고친다. 5라운드에서도 실패하면 튜플을 버리고 오프라인 분석용으로 기록한다. 저자들은 $K$ 를 올리지 않는 이유를 명시한다. 5라운드까지 수렴하지 않는 튜플은 모호한 지시문과 풀 수 없는 명세가 대부분이어서, 스크립트를 더 고치는 것보다 Pass 2의 gap-fill로 넘기는 편이 비용 대비 효과가 크다.

정보 격리가 어디까지 강제되는지는 Table 1이 자원별로 명시한다.

| 자원 | Generator | Discriminator |
|---|---|---|
| task 지시문 $t$, 컨텍스트 $c$ | 접근 | 접근 |
| 도메인 skill 파일 $S_{\text{dom}}$ | 접근 | 접근 |
| `initial_setup.py` | write | denied |
| `golden_patch.py` | write | denied |
| Generator 작업 디렉토리 | full | denied |
| setup 이후 $V_{\text{init}}$, state-only API 경유 | read | read |
| patch 이후 $V_{\text{gold}}$, state-only API 경유 | read | read |
| $V_{\text{init}}$, $V_{\text{gold}}$ 의 파일시스템 내용 | write | denied (API로만 read) |
| `reward.py` | denied | write |
| `REVIEW.md` | read | write |

격리는 프로세스 수준으로 구현된다. 두 프로세스는 서로 겹치지 않는 파일시스템 뷰를 가진 별도 작업 디렉토리에서 실행되고 프로세스 사이 통신은 Orchestrator만 중개한다. Orchestrator 시스템 프롬프트는 이 구조를 "파이프라인의 부하를 지탱하는 보안 보증"이라 적고, 정본 task 산출물 파일은 각 VM의 `/home/user/`에만 존재하며 로컬 파일시스템으로 절대 내려받지 않는다고 못박는다.

### 3.3 데이터셋 수준 필터

루프가 수렴했다는 건 튜플이 자기들끼리 앞뒤가 맞는다는 뜻이지, 지시문이 모호하지 않다거나 어떤 policy든 풀 수 있다는 뜻은 아니다. 이런 문제는 rollout을 돌려봐야 드러난다. 그래서 통과한 튜플 전부를 독립된 두 단계 필터에 한 번 더 태운다.

1단계는 서로 다른 foundation model 계열에서 뽑은 비평자 $V$ 명의 다수결이다. 각 비평자가 네 요소 튜플을 받아 verdict, severity, can_fix_with_query_only, query_issues, setup_reward_risks, training_pool_fit, confidence, reasoning_summary, revised_query 아홉 필드의 구조화 JSON 판정을 낸다. 평가 항목은 일관성, 실행 가능성, hack 위험, 명료성, 난이도 보정 다섯 가지다.

| severity | 판정 | 내용 |
|---|---|---|
| P0 | reject | setup, reward, 환경의 치명적 결함. 지시문 수정으로 못 고치는 $(t, s, r)$ 불일치 |
| P1 | modify-query | 지시문에 필수 컨텍스트가 없거나, 해로운 모호성이 있거나, 평가를 편향시키는 방식으로 절차를 누설한다 |
| P2 | keep-or-modify | 치명적이지 않은 품질 문제. 사용 가능하지만 이상적이지는 않다 |
| P3 | keep | 표면 문체 외에는 유의미한 문제가 없다 |

집계 규칙은 과반, 즉 $\lceil V/2 \rceil + 1$ 명이 keep이나 modify_query를 내면 통과다. modify_query가 다수면 수정 의견 중 confidence가 가장 높은 revised_query를 정본으로 채택하고, keep이 다수면 원래 지시문을 유지하며, 동수면 기본값이 거부다. 튜플별 severity는 어떤 비평자든 부여한 최고 severity로 기록해 최악 기준 품질 등급을 릴리스 메타데이터에 남긴다.

2단계는 teacher rollout이다. Claude Sonnet 4.6을 튜플마다 $N_{\text{teach}}$ 회 실행하고 rollout마다 두 점수를 매긴다. 하나는 `reward.py`가 구현한 프로그램 reward $r(s, \tau) \in [0,1]$ 이고, 다른 하나는 최종 상태 스크린샷과 지시문과 수용 기준 체크리스트를 받는 별도 VLM 심판의 점수 $\hat{r}_{\text{vlm}}(s, \tau) \in \{0, 1\}$ 이다. $r$ 은 파일 내용과 상태 diff와 라이브러리 introspection에 근거해 분산이 작지만 reward 작성자가 계측하기로 선택한 것만 본다. $\hat{r}_{\text{vlm}}$ 은 최종 시각 상태에 근거해 프로그램 reward가 놓치는 표면 실패를 잡는다. 데이터는 맞게 로드됐지만 색상 테마가 틀린 UI, 값은 맞지만 축 레이블이 없는 차트 같은 사례다.

| $N_{\text{teach}}$ 회 평균 조건 | 판정 |
|---|---|
| 두 평균이 모두 $(0, 1)$ 구간이고 차이가 $\delta$ 미만 | 수용 |
| 두 평균이 모두 0 | 풀 수 없을 가능성이 높다. 코퍼스에서 제거 |
| 두 평균이 첫 시행부터 모두 1 | 지나치게 쉬울 가능성이 높다. 쉬운 꼬리 통제를 위해 down-sampling |
| 두 평균의 차이가 $\delta$ 이상 | 불일치 구간을 강조한 피드백으로 Discriminator에 반송 |

반송된 튜플은 정련 후 teacher rollout에 재진입하고 두 번의 패스에서도 수렴하지 못하면 오프라인 분석 버킷으로 내린다. 두 단계는 서로 다른 실패 유형을 걸러내고 전체 필터 손실에 대략 70대 30으로 기여한다. LLM 다수결이 약 3,100개를 거부하는데 루프의 합의 조건을 통과하지만 종단 비평에서 실패하는 정적 명세 오류가 주 대상이고, teacher rollout이 1,278개를 추가 거부하는데 실제 에이전트 행동에서만 드러나는 실행 불가능성과 자명함이 주 대상이다.

### 3.4 환경 확장 CUA-Gym-Hub

기존 벤치마크는 데스크톱 앱 몇 개가 전부고 진짜 웹사이트는 RL 환경으로 쓸 수 없다. task 다양성의 상한이 곧 환경 다양성이니 94개 mock 앱을 직접 합성했다. 각각은 단일 페이지 앱이며 세션 상태를 조회하고 주입하고 리셋할 수 있는 통합 HTTP API를 노출한다.

대상 선정의 근거는 두 외부 자료다. O*NET의 표준 직업 분류(SOC) 대분류 14종을 mock 앱 카테고리에 다대다로 매핑하고, Anthropic Economic Index에서 뽑은 소프트웨어 사용 빈도 $f_c$ 를 정규화한 가중치 $w_c = f_c / \sum_{c'} f_{c'}$ 를 카테고리별 합성 예산으로 쓴다. 포함 임계 $w_{\min}$ 을 두어 가중 사용량 1% 미만 카테고리 꼬리에는 공학 예산을 쓰지 않는다. Table 3은 합성된 mock을 16개 카테고리로 묶어 열거하고 가장 큰 묶음은 Social / publishing 10개, 가장 작은 것은 Real estate / utilities 1개다.

각 mock은 참조 앱의 표면 시각 레이아웃과 내비게이션 트리와 주요 기능 목록을 유지하되 인증을 제거하고, 데이터를 전부 세션 로컬로 합성 시딩하며, 외부 네트워크 호출을 in-process 상태 변경으로 대체한다. 공개 산출물에는 상표와 트레이드 드레스 준수 조치 여섯 가지가 적용된다. 일반 식별자로 전면 개명(`slack`은 `team-chat-mock`), 로고 미포함과 12색 중립 팔레트 교체, UI 문구 신규 작성, 참조 스크린샷 미배포, 이용약관 민감 분야의 추가 인간 검토, mock별 공시 문서 배포다.

공개 프로덕션 묶음은 mock 94개이고 소스 트리에는 템플릿 스캐폴드 5개가 남아 있어 부록 통계는 99개 디렉토리 전체 값이다. 소스 LOC는 평균 6,127, p50 5,663, 최대 13,095이고 91%가 2,500에서 10,000 구간에 들어간다. route 컴포넌트는 평균 15.0에 최대 60, 데이터 모델 엔티티는 평균 5.9에 최대 23이다.

mock 합성에도 에이전트 셋이 붙고 서로 직접 메시지를 주고받지 않고 파일로만 조율한다. Plan Agent가 웹 리서치로 대상 앱을 파악해 `DESIGN.md`와 `assets/README.md`와 `assets/data_model.md`와 `TODO.md`를 낸다. Dev Agent가 Vite와 React 기반 단일 페이지 앱을 고정 레이아웃으로 구현하고, Web Agent가 headless Playwright로 모든 인터랙티브 요소를 눌러보며 실제 DOM을 기준과 대조해 `TEST.md`와 `AUDIT.md`를 돌려보낸다. 루프는 두 리포트가 모두 P0과 P1을 0건으로 보고할 때까지 반복하고, 라운드 예산 안에 수렴하지 못한 mock은 공개 묶음에서 제외한다. 최종 산출물에는 `SKILL.md`가 붙고 이게 그대로 task 합성 파이프라인의 입력이 된다.

| 엔드포인트 | 용도 | 응답 |
|---|---|---|
| `POST /post?sid=<sid>` | 상태 주입과 생명주기 제어. action은 `set`, `set_current`, `merge`, `reset` | `success`, `sid`, `state_id` 해시 |
| `GET /go?sid=<sid>` | 구조적 상태 조회. `reward.py`가 쓰는 주 인터페이스 | `initial_state`, `current_state`, `state_diff` |
| `GET /state?sid=<sid>` | 원시 현재 상태. 저수준 조회 | `stored_state`, `has_custom_state`, `sid` |
| `POST /upload?sid=<sid>` | 첨부가 필요한 task용 파일 업로드 | 파일별 URL |

모든 호출은 세션 식별자 `sid`(UUIDv4)를 실어 상태 읽기와 쓰기를 세션별 이름공간으로 스코프하고 세션 TTL은 마지막 접근으로부터 한 시간이다. `/go`가 돌려주는 `state_diff`는 initial과 current 스냅샷의 평평한 키 경로 비교다. 배열은 순서 있는 시퀀스로 취급해 어느 인덱스든 차이가 나면 전체를 변경으로 표시하고, 휘발성 필드는 diff 전에 마스킹한다. state injection은 task가 자기 JSON 초기 상태를 `reward.py`와 함께 들고 오게 해 mock 구현 하나가 코드 수정 없이 수많은 task 세계를 호스팅하게 한다.

검증된 튜플은 `output/final/<task_id>/` 아래 자기완결 디렉토리로 나오고 `config.json`은 OSWorld 평가기 계약을 스키마 확장 없이 그대로 따른다. 그래서 CUA-Gym 튜플을 OSWorld 벤치마크 항목으로 바로 쓸 수 있다. 앱 도메인마다 붙는 `SKILL.md`의 마지막 절 bitter lessons가 이 포맷의 가장 특징적인 부분이다. `libreoffice_calc`은 12항목인데 openpyxl이 수식 값을 계산하지 않는다는 것, 색상은 항상 8자 ARGB로 써야 한다는 것, `showDropDown=False`가 실제로는 드롭다운을 표시한다는 반전된 불리언 같은 항목이 들어 있다.

### 3.5 학습 scaffold와 trajectory slicing

에이전트는 원본 스크린샷을 보고 tool call 태그로 감싼 action을 낸다. 스크린샷은 VM native 해상도로 캡처하고(OSWorld 데스크톱 task는 1000 곱하기 1000), vision 인코더는 최소 65,536 픽셀에서 최대 2,097,152 픽셀 토큰 예산 안에서 리사이즈한다. policy에는 `computer_use` 함수 하나만 노출하고 action primitive는 pointer 9종, keyboard 4종, navigation 4종, control 2종 합계 19종이다. XML 포맷은 하나의 `<tool_call>` 안에 연속된 `<function>` 블록 여럿을 허용하고 중간 스크린샷 없이 순서대로 실행되는데, policy가 이를 쓰도록 강제되지는 않는다.

긴 호흡의 rollout은 컨텍스트 예산을 넘어선다. `max_turns` 100 에피소드에 턴당 최대 2,048 토큰 응답과 턴별 스크린샷을 더하면 약 20만 토큰까지 자라는데 하드 컨텍스트 상한은 14만 4천 토큰이다. trajectory slicing은 rollout 하나에서 같은 예산으로 여러 학습 샘플을 만든다. `traj_slice_interval` 10 턴쌍마다 정수 `collapsed_length`로 색인된 slice를 내고, 그 slice의 prompt 부분은 앞쪽 `collapsed_length` 턴쌍의 스크린샷을 `"<image collapsed>"` 플레이스홀더로 대체한다. response 부분은 이후 모든 턴이며 멀티모달 observation을 온전히 보존한다. 첫 slice는 `collapsed_length`가 0이라 trajectory 원형이다. gradient는 prompt 부분과 환경 observation에는 흐르지 않고 response 부분 assistant 메시지에만 흐른다. 각 slice는 부모 trajectory의 전체 에피소드 reward를 동일하게 복제받고 나누거나 할인하지 않는다. 접은 뒤에도 예산을 넘는 slice는 전량 마스킹 패딩인 dummy slice로 바뀌며 논문 실행에서는 1% 미만이었다.

| 방식 | 동작 | 문제 |
|---|---|---|
| truncation | 컨텍스트 초과 지점에서 trajectory를 버린다 | 성공과 실패가 결정되는 후반 턴의 지도 신호를 정확히 버려 policy를 앞쪽 턴 행동으로 편향시킨다 |
| summarization | prefix를 LM 생성 요약으로 대체한다 | 학습 샘플마다 LM 호출이 추가되고, 요약 품질 분산이 gradient에 유입되며, 스크린샷 픽셀에서 grounding된 좌표로 가는 결정적 대응이 사라진다 |
| trajectory slicing | 오래된 스크린샷만 결정적 플레이스홀더로 접는다 | 플레이스홀더가 완전히 결정적이고 gradient는 모든 slice의 합집합에서 전체 trajectory에 대해 계산된다. 재사용 가능한 prefix가 남아 인접 slice의 로그확률 계산에서 KV 캐시를 재사용할 수 있다 |

디코딩은 학습과 검증이 같은 스택을 쓰고(sglang 서버, multi-token prediction 활성, speculative 3 step과 draft token 4개, attention 백엔드 FA3) 검증 디코딩은 temperature 0.6, top-p 0.95다. 형식이 깨진 tool call XML은 파서 오류 메시지로 재프롬프트하고, VM 쪽 action 실패는 오류 문자열을 환경 응답으로 관측하게 하며, 샘플러 예외는 최대 5회 재시도한다.

### 3.6 학습 알고리즘과 인프라

GSPO(Group Sequence Policy Optimization)로 학습한다. GSPO는 중요도 비율을 토큰이 아니라 시퀀스 단위로 잡는 방식으로, mixture-of-experts 모델의 RL 학습에서 더 안정적이다. policy $\pi_\theta$ 가 $G$개 rollout을 내면 각각 $r_i = r(s, \tau_i) \in [0,1]$ 을 받는다. 본문 식(1)은 그룹 정규화 advantage $\hat{A}_i = (r_i - \mu)/\sigma$ 로 가중된 clipped surrogate에서 참조 policy에 대한 KL 페널티 $\beta D_{\text{KL}}[\pi_\theta \| \pi_{\text{ref}}]$ 를 뺀 목적함수를 최대화하는 형태로 적혀 있다. 시퀀스 단위 중요도 비율은 trajectory 길이 $|\tau_i|$ 로 기하평균을 낸 형태다.

$$\rho_i = \left( \frac{\pi_\theta(\tau_i \mid t, s)}{\pi_{\theta_{\text{old}}}(\tau_i \mid t, s)} \right)^{1/|\tau_i|}$$

| 기호 | 값 | 설명 |
|---|---|---|
| $G$ | 16 | prompt당 rollout 수 |
| $N_{\text{oversample}}$ | 20 | over-sampling 목표. 유효 rollout 앞 16개만 남기고 타임아웃과 형식 오류는 버린다 |
| $\varepsilon$ | 0.2 | 중요도 비율 clipping 범위. 양쪽 clip이 같다 |
| $\beta$ | 0 | 참조 policy KL 페널티. 보고된 실행에서는 KL 항과 참조 모델을 전부 비활성화했다 |
| learning rate | $1 \times 10^{-6}$ | AdamW, 상수 스케줄, warmup 없음 |
| $(\beta_1, \beta_2, \epsilon_{\text{Adam}})$ | (0.9, 0.999, $10^{-8}$) | AdamW 파라미터 |
| weight decay | 0.01 | bias와 norm이 아닌 모든 파라미터 |
| batch / mini-batch | prompt 128개 / 32개 | 외부 GSPO 배치와 내부 gradient 누적 step |
| PPO epochs | 1 | 외부 배치당 옵티마이저 패스 1회 |
| total steps | 1,000 | 전체 학습 실행의 외부 배치 갱신 수 |
| rollout / eval temperature | 1.0 / 0.6 | 학습 rollout과 검증 rollout의 샘플링 temperature |
| top-p / top-k | 0.95 / 무제한 | 평가 시 nucleus 샘플링 |
| max new tokens / turn | 2,048 | 턴당 응답 상한 |
| max context / prompt length | 144K / 8K | 하드 컨텍스트 상한과 slice당 초기 prompt 예산 |

보조 손실로는 저품질 이중언어 출력의 가중을 낮추는 중국어 토큰 페널티(계수 0.5)를 적용하고 형식과 언어와 무한 반복 페널티는 비활성화하며 그룹 필터링도 비활성화한다. 엔트로피 보너스는 전 구간 0이다. 저자들은 초기 프로토타이핑에서 $\beta \in \{10^{-3}, 10^{-2}\}$ 를 재평가했고 보고된 데이터 규모에서는 학습 안정성 이득도 task 성공률 개선도 관측하지 못했다고 밝힌다.

부록 C.3.3은 advantage를 prompt별 그룹 단위로 $\hat{A}_i = r_i - \mu_g$ 로 계산한다고 적는다. 표준편차 정규화는 의도적으로 비활성화한다(`divide_by_std=False`). 점진적 $[0,1]$ reward가 이미 고정 척도 위에 있고, $\sigma_g$ 로 나누면 그룹이 거의 균일한 prompt에서 노이즈가 증폭되기 때문이다. 이 서술은 본문 식(1)의 $(r_i - \mu)/\sigma$ 와 어긋난다 (5절 참고).

RL 실행은 NVIDIA H200 SXM GPU(각 141GB HBM3e)를 노드당 8장씩 쓴다. turbo 구성이 192 GPU(24노드)로 A3B를, plus 구성이 512 GPU(64노드)로 A17B를 학습한다. verl의 분리형 트레이너로 학습 서브클러스터와 rollout 서브클러스터를 균등 분할하고 dispatch ratio 2.35, policy 버전 격차 최대 4 step으로 잇는다. rollout은 OSWorld 가상 머신 2,000개 풀에 접속하며 학습 step당 평균 VM 사용률이 75%를 넘어 rollout 지연이 병목이 되지 않는다. 1,000 step 실행은 두 구성 모두 벽시계 약 5일이고 누적 비용은 각각 약 23,040 GPU시간과 약 61,440 GPU시간이다. 비용은 rollout이 지배한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 실험 설정

CUA-Gym에서 10,858개 검증 튜플을 뽑아 RLVR 학습 세트로 쓴다. 80개가 넘는 환경의 task를 덮는다. SFT 워밍업에는 같은 task 세트에 Claude Sonnet 4.6을 실행해 성공한 것만 남긴 3,578개 trajectory를 쓴다. teacher rollout은 task당 4개를 temperature 1.0으로 샘플링하고 최종 reward $r(s, \tau) = 1$ 인 trajectory만 남기는데, 이 성공 전용 필터가 teacher rollout의 약 50%를 버린다. SFT 단계에서 추가 재가중이나 도메인 재균형은 적용하지 않는다.

SFT는 assistant 토큰에 표준 교차 엔트로피를 적용하고 user와 system과 tool 메시지를 마스킹한다. AdamW에 최고 learning rate $7 \times 10^{-6}$, 실행 동안 $7 \times 10^{-7}$ 까지 코사인 감쇠, weight decay 0.01, 배치 prompt 512개, 큐레이션 코퍼스 1 epoch다. 시퀀스 길이는 256K이고 trajectory slicing을 동일하게 적용해 SFT와 RL의 데이터 형태를 맞춘다. bf16 혼합 정밀도에 matmul 경로는 FP8 가중치를 쓰고 GPU 512장에서 실행한다. 모델은 Qwen3.5-35B-A3B와 Qwen3.5-397B-A17B 두 규모다.

### 4.2 종합 성적

| 구분 | 모델 | OSWorld-Verified | WebArena |
|---|---|---:|---:|
| 상용 | Claude Sonnet 4.6 | 72.9 | 65.6 |
| 상용 | Claude Opus 4.7 | 78.0 | 미보고 |
| 상용 | GPT-5.5 | 78.7 | 미보고 |
| 오픈소스 | EvoCUA-8B | 46.1 | 미보고 |
| 오픈소스 | EvoCUA-32B | 56.7 | 미보고 |
| 오픈소스 | OpenCUA-32B | 34.8 | 미보고 |
| 오픈소스 | OpenCUA-72B | 45.0 | 미보고 |
| 오픈소스 | Step-GUI-8B | 40.2 | 미보고 |
| 오픈소스 | Kimi-K2.6 | 73.1 | 미보고 |
| 자체 | Qwen3.5-35B-A3B (base) | 54.5 | 40.8 |
| 자체 | Qwen3.5-397B-A17B (base) | 62.2 | 54.0 |
| 자체 | **CUA-Gym-A3B** | **62.1** | **44.5** |
| 자체 | **CUA-Gym-A17B** | **72.6** | **56.0** |

작은 쪽이 +7.6%p, 큰 쪽이 +10.4%p 오른다. GUI 에이전트의 RL 이득은 보통 모델이 커질수록 줄어드는데 여기서는 큰 쪽에서도 유지된다. CUA-Gym-A3B는 총 파라미터가 약 10분의 1인 채로 Qwen3.5-397B-A17B base와 맞먹는다. 논문이 주장하는 최상급은 규모 조건이 붙은 형태로, "각자의 규모대에서 오픈소스 CUA 중 state-of-the-art"다. 같은 표에서 오픈소스로 분류된 Kimi-K2.6이 73.1로 CUA-Gym-A17B의 72.6보다 높으므로 규모 조건을 떼면 성립하지 않는다.

WebArena는 학습에 쓰지 않은 홀드아웃이고 그 사이트 클론들은 학습에 쓴 94개 mock과 겹치지 않는다. 여기서도 +3.7%p, +2.0%p 오른다. 저자들은 웹 mock 파이프라인이 합성 mock에 과적합되지 않고 브라우저 환경 전반으로 옮겨가는 능력을 길러준다는 근거로 읽는다.

### 4.3 도메인별 편차

전체 task 360개를 도메인 10개로 나눈 성공률이다. Figure 5 캡션은 학습 후 도메인별 점수가 run-4 체크포인트 분해에서 나왔다고 밝힌다.

| 도메인 | n | A3B base | A3B 학습 후 | 변화 | A17B base | A17B 학습 후 | 변화 |
|---|---:|---:|---:|---:|---:|---:|---:|
| overall | 360 | 54.5 | 62.1 | +7.6%p | 62.2 | 72.6 | +10.4%p |
| writer | 23 | 60.9 | 69.6 | +8.7%p | 78.3 | 91.2 | +12.9%p |
| calc | 47 | 51.1 | 76.6 | +25.5%p | 72.3 | 91.5 | +19.2%p |
| impress | 47 | 56.3 | 70.1 | +13.8%p | 66.0 | 70.0 | +4.0%p |
| gimp | 26 | 46.2 | 53.8 | +7.6%p | 53.8 | 65.4 | +11.6%p |
| chrome | 46 | 63.0 | 54.3 | -8.7%p | 60.9 | 65.1 | +4.2%p |
| multi_apps | 93 | 42.6 | 54.8 | +12.2%p | 48.4 | 57.9 | +9.5%p |
| os | 24 | 66.7 | 79.2 | +12.5%p | 70.8 | 91.7 | +20.9%p |
| thunderbird | 15 | 66.7 | 53.3 | -13.4%p | 60.0 | 66.7 | +6.7%p |
| vlc | 17 | 69.4 | 44.9 | -24.5%p | 58.8 | 81.8 | +23.0%p |
| vs_code | 22 | 63.6 | 63.6 | +0.0%p | 77.3 | 81.8 | +4.5%p |

A3B에서 calc가 가장 크게 오른 반면 vlc와 thunderbird와 chrome 세 도메인은 하락했다. 전체는 올랐지만 균일하지 않다. A17B에서는 이 하락이 사라지고 vlc가 58.8에서 81.8로 뒤집힌다. 작은 모델에서는 학습 데이터가 두터운 도메인으로 능력이 쏠리며 얇은 도메인을 깎아먹는 양상으로 보인다. Figure 5 캡션은 A3B에서 가장 큰 이득이 `libreoffice_calc`, `multi_apps`, `vs_code`에 나타난다고 적는데, 같은 그림의 `vs_code`는 +0.0%p로 가장 작아 캡션과 데이터가 어긋난다 (5절 참고).

### 4.4 데이터 스케일링

SFT 초기화와 하이퍼파라미터를 고정한 채 1.4K, 3K, 12K 세 부분집합(약 1,400개, 3,000개, 1만 2,000개 튜플)으로 Qwen3.5-35B-A3B를 GSPO 학습했다. 그래프는 RL step 100까지를 담고 회색 점선이 SFT 기준선 0.53이다. 흐린 선이 step별 원시값, 굵은 선이 지수 평활 곡선이다.

논문의 서술은 세 항목이다. 12K가 가장 높은 정점에 도달하고, SFT 기준선에서 가장 일찍 벌어져 더 높은 대역을 유지하며, 3K와 1.4K는 기준선 근처에서 평평해진다. 12K 곡선에는 포화로 꺾이는 지점이 아직 보이지 않는다. 저자들은 추가 데이터의 한계 가치가 점근 정점과 학습 곡선 전체 형태 두 방향에서 동시에 나타난다고 서술한다.

세 실행 모두 SFT 기준선에서 단조 증가했다. RLVR에서 흔한 진동이나 붕괴, reward와 성공률의 탈동조도 없었다. 합성된 reward가 학습을 지탱할 만큼 안정적이라는 간접 근거다. 저자들은 이 곡선을 information barrier 설계의 진단으로도 쓴다. 악용 가능한 reward 함수는 RL 최적화에서 특징적 불안정을 유발하는 것으로 알려져 있기 때문이다. 다만 "세 곡선의 상대 순서가 학습 내내 보존된다"는 서술은 그림과 맞지 않는다 (5절 참고).

### 4.5 환경 스케일링

환경 수준 ablation은 RL로 하기엔 너무 비싸서 teacher distillation으로 대신했다. 이 설정은 CUA-Gym 데이터가 RL 인프라를 요구하지 않는 post-training 레시피에서도 소비 가능함을 보이는 부수 효과도 있다. Claude Sonnet 4.6을 CUA-Gym task에 실행해 $r(s,\tau) = 1$ 인 trajectory만 남겨 teacher 시연 데이터(demonstration) 풀을 만들고, 4.1절과 같은 Qwen3.5-35B-A3B base를 표준 SFT로 학습시킨다. 세 학생은 SFT 하이퍼파라미터가 동일하고 학습 세트 구성만 다르다.

| 조건 | 환경 수 | trajectory 총량 | 환경당 trajectory | OSWorld-Verified |
|---|---:|---:|---:|---:|
| narrow | 10 | 3K | 300 | 57.8 |
| mid | 80 | 3K | 38 | 58.8 |
| broad | 80 | 6K | 75 | 60.7 |

narrow와 mid의 비교가 데이터 총량 고정 상태에서 환경 다양성만 분리하고, mid와 broad의 비교가 환경 커버리지 고정 상태에서 trajectory 양만 분리한다. 데이터 총량을 고정하고 환경만 늘리면 +1.0%p로 개선이 작다. 넓힌 환경 풀에서 trajectory를 두 배로 늘리면 +1.9%p로 더 크게 오른다. 논문은 두 방향을 서로 보완하는 관계로 읽고, CUA-Gym-Hub의 공학 투자가 정당화되는 이유를 "trajectory 양만으로는 다양한 노출을 대신할 수 없기 때문"이라고 적는다. 이 결론에는 설계상 확인되지 않은 부분이 있다. "환경 10개에 trajectory 6K" 조건이 없어 trajectory 양만 늘렸을 때 어디까지 회복되는지는 이 ablation으로 판정되지 않는다 (5절 참고).

### 4.6 창발한 action batching

SFT 초기 policy는 step당 tool call을 약 1개 낸다. RL이 진행되면 이 값이 1.4에서 1.9 사이 대역으로 안정화되고 같은 성능에서 trajectory 길이가 33%에서 45% 짧아진다. 최적화 대상이 아니었는데 나타난 행동이다. 그래프에는 step 15에서 2.63까지 올라간 과도 구간이 있고 이후 1.4 근처로 내려와 자리 잡는다.

원인은 그룹 정규화 advantage 하의 step 예산 압박으로 본다. 고정된 task별 예산 안에 끝낸 trajectory가 타임아웃된 것보다 높은 상대 reward를 받으니 GSPO는 메뉴 순회와 폼 채우기와 키보드 및 클립보드 연쇄 같은 결정적 하위 시퀀스를 한 턴에 몰아넣는 policy를 자연히 고르게 된다.

부록 D.1은 Qwen3.5-397B-A17B 규모 RL 체크포인트를 학습 step 30 시점에 OSWorld-Verified 테스트 분할에서 rollout 1,105회 실행해 총 22,361 model step의 `<tool_call>` 스트림을 원문 그대로 파싱했다. 이 분포에서 평균은 step당 1.41개다.

| step당 tool call 수 | 비율 |
|---|---:|
| 1개 | 69.6% |
| 2개 | 26.7% |
| 3개 | 2.4% |
| 4개 | 0.8% |
| 5개 이상 | 0.5% |

단축 효과의 대부분은 2개 묶음에서 온다. 상위 시퀀스는 결정적 입력 연쇄 `type` → `key`(3,942 step)와 연속 스크롤 전주곡 `mouse_move` → `scroll`(1,052 step)이고 둘이 합쳐 전체 묶인 step의 약 75%를 차지한다. 다음 단계는 action과 관측을 짝지은 쌍 `wait` → `screenshot`(315)과 `left_click` → `screenshot`(303)이고, 세 개 묶음 `type` → `key` → `screenshot`(158)과 `key_down` → `left_click` → `key_up`(119), 네 개 묶음 `type` → `key` → `wait` → `screenshot`(51)이 긴 꼬리에 나타난다.

| action | 단독 | 전체 | solo 비율 |
|---|---:|---:|---:|
| `right_click` | 144 | 147 | 98.0% |
| `double_click` | 328 | 346 | 94.8% |
| `triple_click` | 630 | 666 | 94.6% |
| `left_click` | 10,132 | 11,187 | 90.6% |
| `screenshot` | 1,023 | 2,319 | 44.1% |
| `key` | 2,351 | 7,356 | 32.0% |
| `wait` | 160 | 615 | 26.0% |
| `type` | 738 | 5,199 | 14.2% |
| `mouse_move` | 55 | 1,279 | 4.3% |
| `scroll` | 0 | 1,112 | 0.0% |
| `key_down` | 0 | 153 | 0.0% |
| `key_up` | 0 | 153 | 0.0% |
| `left_click_drag` | 0 | 104 | 0.0% |

포인터 클릭 변종은 94%에서 98% 비율로 단독으로 나온다. 이 action들이 컨텍스트 메뉴나 선택 상태를 드러내고 그 이후 UI를 예측하기 어렵다는 가설과 일관된다. 반대로 `scroll`과 `key_down`과 `key_up`과 `left_click_drag`는 단독으로 나오는 일이 아예 없다. 단독으로는 의미가 없고 더 큰 제스처의 기계적 하위 구성요소로만 존재한다. 저자들은 policy의 배치 행동이 "기계적 제스처의 하위 구성요소와 결정적 연쇄는 묶고, 결과가 확률적 UI 상태에 의존하는 action 사이에서는 배치를 유보한다"는 원칙과 맞아떨어진다고 읽는다. 40% 수준의 trajectory 단축은 구조 변경도 reward shaping 개입도 없이 학습 중 rollout 비용과 배치 시 추론 지연을 직접 줄인다.

### 4.7 코퍼스 통계

task 구성은 카테고리별로 고르게 퍼져 있고(어느 카테고리도 21%를 넘지 않는다) 어려운 쪽으로 기울어 있다. hard가 45%, cross-app이 38%다. Figure 6b의 category 도넛은 Single-App 56%, Cross-App 38%, Gymnastic 6%로 나뉘는데 세 번째 항목의 정의는 본문에 나오지 않는다.

| 시나리오 | task 수 | 비율 |
|---|---:|---:|
| Spreadsheet & Data | 6,684 | 20.8% |
| Document Writing | 6,314 | 19.7% |
| Presentation Design | 5,328 | 16.6% |
| Software Engineering | 4,434 | 13.8% |
| System Administration | 4,225 | 13.2% |
| PDF & Publishing | 2,055 | 6.4% |
| Communication & Email | 939 | 2.9% |
| Project & Task Management | 879 | 2.7% |
| Business Operations | 840 | 2.6% |
| Creative & Media | 412 | 1.3% |

상위 다섯 시나리오가 코퍼스의 84%를 덮는다. 시나리오 안에서 task는 여러 구성 앱에 퍼진다. Spreadsheet & Data는 `libreoffice_calc`, 데이터 분석 mock 웹사이트, Calc가 들어가는 cross-application 조합을 함께 덮는다.

| 도메인 | Easy | Medium | Hard | 합계 |
|---|---:|---:|---:|---:|
| Cross-Desktop | 300 | 1,198 | 6,030 | 7,528 |
| Spreadsheet | 993 | 2,627 | 1,952 | 5,572 |
| Document Editing | 881 | 2,070 | 1,165 | 4,116 |
| Presentation | 889 | 1,541 | 737 | 3,167 |
| System & OS | 1,110 | 1,388 | 311 | 2,809 |
| Code Editing | 690 | 1,130 | 660 | 2,480 |
| Desktop × Web | 0 | 84 | 1,917 | 2,001 |
| PDF | 113 | 946 | 757 | 1,816 |
| Cross-Web | 0 | 53 | 376 | 429 |
| E-Commerce | 166 | 191 | 27 | 384 |
| Cloud & Productivity | 93 | 166 | 116 | 375 |
| Social Media | 127 | 191 | 21 | 339 |
| Project Management | 82 | 135 | 58 | 275 |
| Communication | 65 | 120 | 37 | 222 |
| Business & CRM | 37 | 87 | 71 | 195 |
| Media | 80 | 68 | 2 | 150 |
| Development Tools | 28 | 55 | 65 | 148 |
| Image Editing | 30 | 53 | 23 | 106 |
| 합계 | 5,684 | 12,103 | 14,325 | 32,112 |

이 표로 보면 hard가 44.6%, medium이 37.7%, easy가 17.7%다. 편중은 여러 앱을 쓰는 도메인에서 가장 뚜렷하다. Cross-Desktop은 80.1%가 hard, Cross-Web은 87.6%, Desktop × Web은 95.8%다. 단일 앱 도메인은 기울기가 완만하고 Spreadsheet는 easy 17.8%, medium 47.2%, hard 35.0%다.

지시문의 첫 명령형 동사 상위는 open 4,585, create 2,728, set 1,448, add 1,028, use 906, extract 891, configure 728, apply 605이며 꼬리에는 merge와 flatten과 normalize처럼 각각 50개 미만인 동사가 이어진다. cross-app task는 12,311개(38.3%)이고 앱 쌍 상위는 pdf와 writer 3,173, calc와 writer 3,129, impress와 writer 2,056이다. 문서 생산 삼중항이 cross-app 트래픽의 큰 부분을 차지하는데 지식노동 파이프라인이 PDF 산출물로 끝나는 일이 많다는 경험적 현실을 반영한다. 지시문 길이는 단어 기준 평균 54.1, p50 41, p90 108, 최대 390이고 68.5%가 60단어 미만이다.

### 4.8 생성 비용

Task-Gen, Generator, Discriminator, Filter 네 LLM 구동 단계를 합산하면 수용된 튜플 하나가 Claude Sonnet 4.6 입력 토큰 약 1만 개와 출력 토큰 약 5,000개를 소비한다.

| 항목 | 튜플당 | 코퍼스 32,112개 기준 |
|---|---|---|
| LLM 비용 | 입력 100만 토큰당 3달러, 출력 100만 토큰당 15달러 기준 0.030 + 0.075, 약 0.11달러 | 수용 비율에 따라 약 3,300에서 3,500달러 |
| VM 비용 | 벽시계 약 45분, Aliyun ECS g8i.xlarge(4 vCPU, 16GB RAM) 인스턴스시간당 약 0.21달러를 2대 유지해 약 0.32달러 | 약 1만 달러 |

VM 시간이 검증 튜플의 한계 비용에서 LLM 비용보다 약 3배 크다. 이중 VM 실행 단계의 내부 분해는 스냅샷 복원 약 2분, `initial_setup` 실행 약 10분(데이터 픽스처 다운로드가 만드는 긴 꼬리 포함), `golden_patch` 실행 약 8분, post-config를 포함한 reward 실행 약 15분(문서 재렌더와 assertion 파싱이 지배), 디스크 이미지 리셋을 포함한 teardown 약 10분이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

reward가 검증하는 것은 에이전트가 도달한 마지막 환경 상태지 거기까지 간 과정이 아니다. reward 작성을 확장 가능하게 유지하는 선택이지만, 깔끔하게 편집한 경우와 기존 내용을 지워버렸다가 같은 최종 상태를 다시 만든 경우를 구분하지 못한다. reward hacking도 형식적으로 배제하지는 못한다. information barrier와 금지 패턴 스캔이 위험을 줄이지만 지나치게 느슨한 의미 검사나 성공과 상관관계만 있는 상태 프록시 같은 잔여 경로는 남는다.

- mock은 근사치다. 인증 흐름, 서드파티 연동, 네트워크 지연, rate limit, 드문 서버측 장애 상태는 현재 mock 표면 밖이다.
- 가장 큰 RL 실행은 연산 비용 때문에 시드 하나로만 보고했다. 저자들은 이를 "검증된 task와 환경 규모가 이 구간에서 가치 있다"는 근거로 읽되 파이프라인의 최종 천장이나 배포가 얼마나 견고한지를 말하는 근거로는 읽지 말라고 명시한다.
- 4.3절에서 본 작은 모델의 vlc와 thunderbird 하락을 논문은 별도 절로 다루지 않는다. 데이터를 어떻게 구성하고 도메인을 어떻게 균형 잡을지가 과제로 남는다.

### 5.1 논문 내적 불일치

부록까지 대조하면 본문과 표와 그림 사이에 어긋나는 지점이 여럿 나온다. 수치를 인용할 때 어느 쪽을 기준으로 삼을지 미리 정해두는 편이 안전하다.

| 항목 | 한쪽 | 다른 쪽 | 판단 |
|---|---|---|---|
| 코퍼스 총량 | 본문과 Table 6c와 Table 9와 Table 10이 32,112 | Figure 6b 도넛 중심 라벨과 Table 13 합계가 32,122 | 32,112를 쓴다. Table 10의 행 합계가 정확히 32,112로 맞는다 |
| advantage 정규화 | 본문 식(1)이 $\hat{A}_i = (r_i - \mu)/\sigma$ | 부록 C.3.3이 $\hat{A}_i = r_i - \mu_g$, `divide_by_std=False` | 부록을 쓴다. 구현 설정값이 명시되어 있다 |
| KL 페널티 | 본문 식(1)에 $\beta D_{\text{KL}}$ 항이 있다 | Table 6이 $\beta = 0$, 참조 모델을 아예 로드하지 않는다 | 보고된 실행에는 KL 항이 없다 |
| mock 앱 수 | 본문과 Table 3 캡션이 94종 | Table 3이 열거하는 식별자를 세면 98개 | 공개 규모는 94로 보고된 값을 쓴다. 열거 개수 차이의 원인은 논문에 설명이 없다 |
| Figure 10과 Table 3 | Figure 10이 `figma`를 32종 중 하나로 표시 | Table 3의 전체 목록에 `figma`가 없다 | 목록 쪽이 전체 인벤토리로 선언되어 있어 어긋난다 |
| 데이터 스케일링 순서 | 본문이 "세 곡선의 상대 순서가 학습 내내 보존된다" | Figure 7에서 step 35 이전에는 3K가 12K보다 높고, reward 패널의 step 100 시점에는 1.4K가 12K와 비슷하거나 위에 있다 | 그림을 쓴다. 최종 정점 순서는 데이터 규모와 맞지만 "내내 보존"은 성립하지 않는다 |
| SFT 초기값 | Figure 5가 A3B base 54.5를 "SFT-initialized base"로 지칭 | Figure 7이 SFT init을 0.53으로 표시 | 두 값이 다르다. Table 5b의 54.5는 Qwen3.5-35B-A3B base 항목으로도 올라 있다 |
| Figure 5 캡션의 최대 이득 | 캡션이 `libreoffice_calc`, `multi_apps`, `vs_code`를 최대 이득으로 지목 | 같은 그림의 A3B `vs_code`는 +0.0%p로 가장 작다 | 그림 수치를 쓴다 |
| Figure 5 패널 구성 | 캡션이 (a)를 A3B 대 base 비교로만 서술 | 그림에는 A3B와 A17B 두 패널이 있다 | 그림에 두 패널이 있다 |
| 리프당 task 최소치 | A.2.3이 "모든 리프가 최소 25개 task" | A.2.6이 "Pass 1은 리프당 지시문 2개를 목표로 A.2.5의 리프별 최소치를 만족" | 어긋난다. 게다가 A.2.5에는 리프별 최소치 조항이 없다 |
| 앱당 튜플 하드 제약 | A.2.5가 "앱당 검증 튜플 1,000개 이상" | 환경 110개에 1,000개면 11만 개로 코퍼스 32,112개를 넘는다 | 산술이 성립하지 않는다 |
| 도메인 카테고리 수 | A.2.2가 "O*NET에 맞춘 10개 카테고리" | Table 2가 SOC 대분류 14종을 매핑한다 | 두 값이 다르다 |
| Table 10 행 구성 | 캡션이 "task 10개 미만인 두 도메인(Other, Web Browsing)을 행에서 뺐다" | 행 합계가 정확히 32,112로 전체 코퍼스와 같다 | 뺐다면 합계가 전체보다 작아야 한다 |
| Table 9 합계 | 시나리오별 값을 더하면 32,110 | 코퍼스는 32,112 | 2개 차이가 남는다 |
| Table 11 항목 수 | 캡션이 "top-20 명령형 동사" | 실제 열거는 18개 | 2개가 비어 있다 |
| state API | Figure 2가 `GET /state`, `POST /reset`, `POST /inject`, `GET /diff` | 부록 B.3.1이 `POST /post`, `GET /go`, `GET /state`, `POST /upload` | 부록을 쓴다. 엔드포인트 계약이 명세 형태로 적혀 있다 |
| 환경 스케일링 결론 | 본문이 "trajectory 양만으로는 다양한 노출을 대신할 수 없다" | ablation에 "환경 10개에 trajectory 6K" 조건이 없다 | 설계상 확인되지 않는 추론이다 |
| Figure 8 캡션 | "broad가 trajectory를 환경당 4배 적게 쓰면서 narrow를 앞선다" | broad는 총량으로는 narrow의 2배(6K 대 3K)를 쓴다 | 환경당 비교로는 맞지만 총량 조건을 함께 적어야 한다 |
| Figure 9 서술 | 본문이 "1개에서 1.4에서 1.9 대역으로의 지속적 증가" | 그림에 step 15의 2.63 과도 정점이 있다 | 그림에 과도 구간이 있다 |
| 데스크톱 앱 수 | 본문이 16종(94 + 16 = 110) | Figure 6a의 Desktop Applications 상자에 아이콘 15개 | 그림은 대표 표시일 수 있으나 개수가 다르다 |

## 6. 관련 연구 (Related Work)

실행 가능한 환경 안의 산출물을 뒤틀거나 역설계해 task를 만들고 프로그램 검사로 결과를 확인하는 방식은 디지털 에이전트의 데이터 합성에서 이미 가장 널리 쓰이는 레시피다. RLVE는 적응형 verifiable 환경으로 RL을 확장하는 보완 방향을 다룬다. 소프트웨어 엔지니어링에서는 SWE-smith가 실제 코드베이스 안에서 LM 유도 함수 재작성과 AST 수준 변이로 버그를 심고, R2E-Gym이 커밋에서 실행 보조 역번역으로 task를 뽑으며, SWE-Gym이 미리 구축한 실행 환경으로 수천 개 저장소까지 확장한다. SWE-universe와 SWE-next도 같은 계열이고 전부 유닛 테스트를 이진 reward로 쓴다. 터미널에서는 Endless Terminals와 Terminal-Task-Gen이 컨테이너화된 CLI task를 절차적으로 생성하되 사전 테스트가 처음엔 반드시 실패하고 올바른 실행 뒤에만 통과해야 한다는 이중 검증 규약을 건다.

이 파이프라인들의 공학 비용을 정당화하는 것은 경험적 성과다. SWE-smith와 SWE-Gym이 합성 task 양에 대해 로그선형 성능 스케일링을 보고하고 수만 개 규모에서 아직 포화하지 않았다고 밝히며 Endless Terminals가 터미널 조작에서 같은 추세를 관측한다. 저자들은 이질적인 도메인에서 이 거동이 일관되게 나타난다는 사실을 RLVR 데이터 합성이 아직 포화 구간이 아니라는 신호로 읽고, GUI 기반 computer-use agent에 같은 인프라를 만들 이유로 삼는다.

GUI 에이전트의 task와 환경 합성에는 reward 검증 가능성과 환경 범위 사이의 긴장이 깔려 있다. 한 방향은 VLM 기반 reward 추정으로 앱별 계측 없이 일반화하려 한다. ZeroGUI는 자체 ablation에서 이때 생기는 거짓 양성 reward가 RL 학습을 불안정하게 만든다고 확인했다. 다른 방향은 코드 네이티브 reward 오라클을 가진 웹 환경을 합성한다. GUI-Genesis는 task별 Flask 앱으로, InfiniteWeb은 task 중심 TDD로, AutoWebWorld는 유한상태기계 전이 모델로 간다. 그러나 전부 브라우저 상호작용에 갇혀 OS 수준 데스크톱 task나 앱 간 워크플로를 다루지 못한다. 데스크톱과 검증 가능성을 잇는 최근 시도들은 체크리스트 기반 VLM 평가로 후퇴하거나(Gym-Anything) 앱 커버리지가 좁다. OSWorld는 실제 데스크톱 환경에 대한 보완적 평가 벤치마크를 제공한다. 이 논문은 결정적 검증과 넓은 OS 수준 앱 커버리지, 확장 가능한 task 다양성을 동시에 달성한 선행 연구가 없다고 본다.

기존 데이터셋과 견준 규모는 다음과 같다. Programmatic은 코드 네이티브 assertion, VLM은 VLM-as-a-judge를 뜻하고 별표는 공개를 약속했으나 아직 공개되지 않았다는 표시다.

| 데이터셋 | 플랫폼 | 데이터 수 | 환경 수 | reward | 공개 |
|---|---|---:|---:|---|---|
| GUI-Genesis | Mobile | 969 | 1 | Programmatic | 아니오 |
| WebArena-Infinity | Web | 1,260 | 10 | Programmatic | 예 |
| InfiniteWeb | Web | 600 | 미보고 | Programmatic | 아니오(공개 예정) |
| UltraCUA | Desktop | 17,000 | 9 | Programmatic | 아니오(공개 예정) |
| Gym-Anything | Desktop | 7,277 | 193 | VLM | 예 |
| **CUA-Gym** | **Desktop+Web** | **32,112** | **110** | **Programmatic** | **예** |

## 7. 용어집 (Glossary)

이 자료 고유의 용어만 담는다. policy, reward, rollout, trajectory, action, 강화학습 등 도메인 공통 용어는 [[overviews/glossary-physical-ai]]와 [[overviews/glossary-agents]]를 따른다.

| 용어 | 뜻 |
|---|---|
| CUA (computer-use agent) | 화면을 보고 마우스와 키보드로 데스크톱과 브라우저를 조작하는 에이전트 |
| RLVR | reinforcement learning with verifiable rewards. 코드로 채점 가능한 reward를 쓰는 강화학습 post-training |
| CUA-Gym-Hub | 이 연구가 합성한 94개 mock 웹 앱 묶음. 상태 주입과 리셋 API를 갖춘 재사용 환경 층 |
| Generator | 초기 상태와 golden 상태를 만드는 서브에이전트. `initial_setup.py`와 `golden_patch.py` 작성 |
| Discriminator | task 설명만 보고 `reward.py`를 쓰는 서브에이전트. Generator의 코드에 접근 차단 |
| Orchestrator | VM을 준비하고 두 서브에이전트를 실행하며 합의 조건을 판정하는 상위 에이전트. 스크립트는 직접 쓰지 않는다 |
| information barrier | Generator의 스크립트와 작업 디렉토리를 Discriminator에게 감추는 프로세스 수준 격리 |
| golden state | task를 올바로 수행했을 때 도달해야 할 정답 환경 상태 |
| 다섯 합의 조건 | 루프 통과 판정 기준 C1에서 C5. 두 스크립트의 완주, golden에서 reward 1.0, initial에서 0.0, 금지 패턴 부재 |
| 금지 패턴 리스트 | `reward.py`에 나타나면 라운드를 중단시키는 6종 코드 패턴. 정규식과 AST 순회로 검사 |
| state injection | task별 JSON 초기 상태를 주입해 같은 mock 구현으로 여러 task 세계를 만드는 설계 |
| session isolation | 모든 변경을 세션 id로 스코프해 분산 워커가 서로 간섭하지 않게 하는 설계 |
| state diff | `/go`가 돌려주는 initial과 current 스냅샷의 평평한 키 경로 비교 결과. reward 작성의 기준 자료 |
| SKILL.md | 앱 도메인별 지침 문서. 라이브러리, 파일 레이아웃, setup과 reward 템플릿, bitter lessons 6절 구성 |
| bitter lessons | `SKILL.md` 마지막 절. 개발 중 실제 디버깅 사례에서 뽑은 함정 목록 |
| trajectory slicing | rollout 하나에서 오래된 스크린샷만 접어 여러 학습 샘플을 만드는 컨텍스트 관리 기법 |
| collapsed_length | slice가 스크린샷을 플레이스홀더로 접은 앞쪽 턴쌍 수. slice를 색인하는 정수 |
| dummy slice | 접은 뒤에도 컨텍스트를 넘긴 slice를 대체하는 전량 마스킹 패딩. 배치 형태만 보존한다 |
| GSPO | Group Sequence Policy Optimization. 중요도 비율을 시퀀스 단위로 잡는 RL 알고리즘 |
| action batching | 한 턴에 여러 tool call을 묶어 내보내는, 학습 중 창발한 행동 |
| solo rate | 어떤 action이 model step에 단독으로 나타난 비율. 묶여도 안전한 action을 가르는 지표 |
| OSWorld-Verified | 실제 데스크톱 환경 벤치마크 OSWorld의 검증판 |
| WebArena | 사이트 클론 위에서 브라우저 task를 평가하는 벤치마크. 이 연구에서는 홀드아웃 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 3 | 데이터 합성 파이프라인 전체 구조 | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 4 | mock 웹 앱 합성 멀티에이전트 파이프라인 | caption-region | ★ wiki 권장 (method) |
| fig03 | 5 | state injection된 메일 mock 세 상태 | caption-region | ○ 보조 (설계 예증) |
| fig04 | 5 | trajectory slicing과 sliding window 비교 | caption-region | ★ wiki 권장 (method) |
| fig05 | 6 | 도메인별 성공률 두 패널과 종합 결과표 | caption-region | ★ wiki 권장 (result) |
| fig06 | 7 | 환경 커버리지, task 분포, 데이터셋 비교 3분할 | caption-region | ★ wiki 권장 (dataset) |
| fig07 | 8 | 데이터 스케일링 곡선 | caption-region | ★ wiki 권장 (result) |
| fig08 | 8 | 환경 스케일링 ablation 막대 3개 | caption-region | ★ wiki 권장 (result) |
| fig09 | 9 | 창발한 action batching 곡선과 배치 개념도 | caption-region | ★ wiki 권장 (result) |
| fig10 | 23 | mock 앱 32종 랜딩 페이지 | caption-region | (면적비 0.67, 확인 필요) |
| tab01 | 17 | information barrier 접근 권한 행렬 | table-region | ★ wiki 권장 (method 핵심) |
| tab02 | 21 | O*NET SOC 대분류와 앱 카테고리 매핑 | table-region | (부록, 본문에 요약해 옮김) |
| tab03 | 22 | mock 웹 앱 전체 인벤토리 | table-region | (부록, 본문에 요약해 옮김) |
| tab04 | 25 | mock 앱 99종 구조 통계 | table-region | (부록, 본문에 요약해 옮김) |
| tab05 | 25 | mock 앱 소스 LOC 분포 | table-region | (부록, 본문에 표로 옮김) |
| tab06 | 31 | GSPO 학습 하이퍼파라미터 | table-region | (부록, 본문에 표로 옮김) |
| tab07 | 32 | 상위 batched tool call 시퀀스 | table-region | (부록, 본문에 요약해 옮김) |
| tab08 | 33 | action별 solo rate | table-region | (부록, 본문에 표로 옮김) |
| tab09 | 72 | 시나리오별 task 수 | table-region | (부록, 본문에 표로 옮김) |
| tab10 | 72 | 도메인과 난이도 교차표 | table-region | (부록, 본문에 표로 옮김) |
| tab11 | 73 | 명령형 동사 빈도 | table-region | (부록, 본문에 요약해 옮김) |
| tab12 | 73 | cross-app 앱 쌍 빈도 | table-region | (부록, 본문에 요약해 옮김) |
| tab13 | 74 | 지시문 단어 길이 분포 | table-region | (부록, 본문에 요약해 옮김) |

크롭 검증 결과 md5 중복은 없고 `legacy/` 디렉토리도 없다. 재크롭이 필요한 항목은 없다. `fig10`만 면적비 0.674로 low_confidence 표시가 남아 있는데, 원본이 페이지 전면을 쓰는 스크린샷 격자여서 그대로 두는 것이 맞다.
