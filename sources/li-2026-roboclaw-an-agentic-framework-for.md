---
title: "RoboClaw: An Agentic Framework for Scalable Long-Horizon Robotic Tasks"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/li-2026-roboclaw-an-agentic-framework-for.pdf
raw_filename: "li-2026-roboclaw-an-agentic-framework-for.pdf"
source_collection: external
authors: "Ruiying Li, Yunlang Zhou (공동 1저자), Yuyao Zhu, Kylin Chen, Jingyuan Wang, Sukai Wang, Kongtao Hu, Minhui Yu, Bowen Jiang, Zhan Su, Jiayao Ma, Xin He, Yongjian Shen, Yang Yang, Guanghui Ren, Maoqing Yao, Wenhao Wang, Yao Mu (교신저자 Wenhao Wang, Yao Mu). AgiBot, National University of Singapore, Shanghai Jiao Tong University"
arxiv_id: "2603.11558"
url: "https://github.com/RoboClaw-Robotics/RoboClaw"
tags: [physical-ai, vla, manipulation, robot-dataset]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/li-2026-roboclaw-an-agentic-framework-for/fig01.png
    raw: raw/papers/li-2026-roboclaw-an-agentic-framework-for-figures/fig01.png
    caption: "RoboClaw 워크플로 전경. 개발자가 시스템 설정과 MCP tool과 스킬을 정의하고 RoboClaw가 파일 기반 메모리와 임베딩 검색을 제공한다. 사람의 기본 시연 뒤에 EAP self-resetting rollout이 이어져 VLA policy pool을 만들고, 활성화된 policy가 long-horizon 과제를 수행한다"
    page: 2
    bbox_norm: [0.2245, 0.1387, 0.781, 0.3655]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/li-2026-roboclaw-an-agentic-framework-for/fig02.png
    raw: raw/papers/li-2026-roboclaw-an-agentic-framework-for-figures/fig02.png
    caption: "RoboClaw 시스템 아키텍처. VLM이 meta-controller로 동작하며 structured memory(role identity, task-level memory, working memory)와 observation 입력을 합쳐 결정 컨텍스트를 만들고, chain-of-thought 5단계 질문을 거쳐 MCP tool을 호출한다"
    page: 5
    bbox_norm: [0.2245, 0.1387, 0.781, 0.3921]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/li-2026-roboclaw-an-agentic-framework-for/fig03.png
    raw: raw/papers/li-2026-roboclaw-an-agentic-framework-for-figures/fig03.png
    caption: "자율 데이터 수집 워크플로. primer를 서랍에 넣어달라는 요청을 받은 agent가 MCP tool로 observation을 해석해 초기 상태를 평가하고 계획을 세운 뒤, 서랍에 넣는 forward와 꺼내는 reverse를 번갈아 실행하며 이상 상황을 실시간으로 감시한다"
    page: 6
    bbox_norm: [0.2245, 0.1387, 0.781, 0.3157]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/li-2026-roboclaw-an-agentic-framework-for/fig04.png
    raw: raw/papers/li-2026-roboclaw-an-agentic-framework-for-figures/fig04.png
    caption: "사람 투입량 비교. (a) 같은 양의 데이터를 모으는 데 드는 상대 시간이 baseline에서 2.16배, (b) rollout 중 사람 개입 횟수가 baseline에서 8.04배, (c) vanity table 정리 과제의 iteration별 성공률 곡선. 20회 시도 평균이다"
    page: 8
    bbox_norm: [0.2245, 0.1387, 0.7809, 0.2597]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/li-2026-roboclaw-an-agentic-framework-for/fig05.png
    raw: raw/papers/li-2026-roboclaw-an-agentic-framework-for-figures/fig05.png
    caption: "long-horizon 과제의 실제 실행 시퀀스. 위쪽 high level planning에서 CoT로 subtask 순서를 정하고, 아래쪽 low level executing에서 primer 배치와 lipstick 삽입과 lotion 배치와 tissue wipe 네 policy를 차례로 호출하고 종료한다"
    page: 14
    bbox_norm: [0.2245, 0.1387, 0.7808, 0.5657]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/li-2026-roboclaw-an-agentic-framework-for/tab01.png
    raw: raw/papers/li-2026-roboclaw-an-agentic-framework-for-figures/tab01.png
    caption: "π0.5 fine-tuning 하이퍼파라미터. bfloat16 정밀도, batch size 16, 학습 10,000 step, learning rate 2.5e-5와 LoRA rank 16, alpha 16, dropout 0.1 설정"
    page: 10
    bbox_norm: [0.2824, 0.1684, 0.7232, 0.2881]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/li-2026-roboclaw-an-agentic-framework-for/tab02.png
    raw: raw/papers/li-2026-roboclaw-an-agentic-framework-for-figures/tab02.png
    caption: "네 가지 manipulation 과제에서 inverse reset policy의 성공률. 50회 시도 기준 36회에서 43회 범위에 분포한다"
    page: 10
    bbox_norm: [0.2478, 0.3171, 0.7526, 0.3729]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/li-2026-roboclaw-an-agentic-framework-for/tab03.png
    raw: raw/papers/li-2026-roboclaw-an-agentic-framework-for-figures/tab03.png
    caption: "rollout iteration이 늘어남에 따른 forward manipulation policy의 성공률 변화. 1회차부터 5회차까지 네 과제 모두 꾸준히 상승한다"
    page: 11
    bbox_norm: [0.2841, 0.1631, 0.7213, 0.2743]
    strategy: table-region
    curated: true
---

## 한 줄 요약 (One-line Summary)

VLA 기반 로봇 시스템의 데이터 수집과 policy 학습과 과제 실행을 하나의 VLM 컨트롤러 아래로 합치고, forward 동작에 inverse 복구 동작을 짝지은 Entangled Action Pairs로 사람의 환경 리셋 없이 데이터를 계속 모으는 agentic 프레임워크다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | RoboClaw: An Agentic Framework for Scalable Long-Horizon Robotic Tasks |
| 저자 | Ruiying Li, Yunlang Zhou 외 18인 (공동 1저자 2인, 교신저자 Wenhao Wang, Yao Mu) |
| 소속 | AgiBot, National University of Singapore, Shanghai Jiao Tong University |
| arXiv | 2603.11558v3 (2026년 4월 1일), cs.RO, 18페이지 |
| 코드 | https://github.com/RoboClaw-Robotics/RoboClaw |
| 실험 플랫폼 | Agibot G01 양팔 모바일 manipulation 로봇 |

## 2. 주요 기여 (Key Contributions)

저자들이 밝힌 기여는 세 가지다.

첫째, 로봇 lifecycle 전체를 아우르는 agentic 프레임워크를 제시한다. 데이터 수집과 policy 학습과 long-horizon 과제 실행을 하나의 agent loop 안에 넣어 세 단계가 같은 컨텍스트 의미론을 공유하게 하고, 사람의 부담을 크게 줄인다.

둘째, 학습 주도 자율 데이터 수집 장치인 Entangled Action Pairs(EAP)를 제안한다. forward manipulation policy에 inverse 동작을 짝지어 self-resetting 루프를 만들고, 이를 통해 온라인 데이터 수집을 계속 이어가면서 수집된 데이터와 실행 조건 사이의 정합을 유지한다.

셋째, long-horizon 과제를 위한 스킬 오케스트레이션과 상태 감시 구조를 설계한다. VLM이 structured memory 위에서 in-context learning으로 상위 수준 추론을 수행해 스킬을 선택하고 실행 상태를 감시한다.

수치로 보고된 성과는 long-horizon 과제 성공률이 baseline 대비 25% 향상되고, 사람의 시간 투입이 53.7% 감소한 것이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 설정

기존 VLA 파이프라인은 데이터 수집과 모델 학습과 과제 실행이 서로 독립된 절차로 굴러간다. 저자들은 여기서 두 가지 문제가 생긴다고 본다.

첫 번째는 의미론 불일치다. 세 단계를 서로 다른 사람이 담당하기 때문에 과제 상태의 해석, subtask 경계, 성공 기준이 단계마다 달라진다. 그 결과 시스템 전체에서 일관된 과제 의미론을 유지하기 어렵다.

두 번째는 분포 불일치다. 학습 데이터가 덮는 상태 분포가 배포 시점에 마주치는 조건을 반영하지 못한다. long-horizon 과제는 작은 오차가 뒤 단계로 전파되고 누적되므로 이 불일치에 특히 취약하다.

여기에 더해 사람의 개입 비용 문제가 있다. 운영자는 시연 데이터(demonstration)를 모으고, 매 시도마다 환경을 되돌리고, 실패를 감시하고, trajectory를 걸러내고, 모델 성능을 평가하고, 하위 과제 실행을 감독해야 한다. 과제가 복잡해질수록 이 사람 중심 절차는 확장하기 어려워진다.

### 3.2 세 계층 추상화

RoboClaw는 structured memory와 모듈형 스킬 라이브러리를 OpenClaw 방식으로 결합하고, 시스템을 세 계층으로 나눈다. 상위 계층이 하위 계층을 호출한다.

| 계층 | 정의 | 예시 |
|---|---|---|
| Skills | tool을 조합하는 재사용 가능한 절차 | long-horizon-execution 스킬이 Env Summary를 부르고 이어서 Start Policy를 부른다 |
| Tools | MCP를 통해 policy를 실행하거나 환경을 조회하는 호출 가능한 시스템 인터페이스 | Start Policy, Terminate Policy, Env Summary |
| Policies | 저수준 모터 action을 만드는 robotic foundation model | VLA 모델로 구현된 manipulation policy |

### 3.3 structured memory와 CoT 계획

각 timestep t에서 agent는 structured memory 상태 m_t를 유지한다. 세 요소로 구성된다.

- role identity r_t: agent의 현재 동작 모드와 사용 가능한 tool 집합을 지정한다. 데이터 수집 모드와 과제 실행 모드를 구분한다.
- task-level memory g_t: 전체 과제와 분해된 subtask, 그리고 각각의 실행 상태를 기록한다. long-horizon 진행 상황을 추적하는 근거가 된다.
- working memory w_t: 현재 활성화된 스킬과 tool call 이력 같은 단기 실행 컨텍스트를 담는다.

수식으로는 m_t = (r_t, g_t, w_t)로 쓴다. observation o_t와 메모리가 주어지면 VLM은 chain-of-thought 방식으로 구조화된 추론을 수행한다. 추론 절차는 장면을 해석해 환경의 관련 요소를 식별하고, 현재 목표나 subtask를 정하고, 성공 기준을 평가하고, 현재 상태가 그 기준을 만족하는지 아니면 교정이 필요한지 판단하고, 마지막으로 다음 action을 결정하는 순서를 따른다.

agent는 후보 subtask 집합 Z에서 다음 subtask를 고른다.

z_t = RoboClaw(m_t, o_t), z_t 는 Z의 원소

subtask 완료 여부를 평가한 결과는 task memory g_t에 반영된다.

### 3.4 MCP tool 인터페이스

상위 수준 추론과 로봇 제어를 잇기 위해 Model Context Protocol 인터페이스로 tool 집합을 제공한다. 제공되는 tool은 policy 시작과 종료와 전환, 환경 요약 조회, 로봇 상태 조회, 그리고 필요 시 사람 호출이다. agent는 이 tool을 호출해 VLM이 만든 계획을 실행 가능한 action으로 옮긴다.

전체 동작은 반복 루프다. structured memory와 환경 observation에서 정보를 가져오고, CoT 추론으로 다음 action을 정하고, 대응하는 tool call을 실행한다. 결과는 다시 메모리에 기록되어 과제가 끝날 때까지 지각과 추론과 action의 순환이 이어진다.

### 3.5 저수준 policy

저수준 manipulation policy는 VLA 모델 π0.5로 구현한다. VLA policy는 시각 observation과 언어 지시문(instruction)과 로봇의 proprioception 상태를 함께 처리해 실행 가능한 action을 만든다.

이 시스템에서 언어 지시문은 사람이 직접 주지 않는다. RoboClaw agent가 MCP tool을 호출하는 시점에 동적으로 생성한다. agent가 스킬 실행을 결정하면 현재 subtask를 서술하는 구조화된 지시문을 만들어 policy의 조건으로 넣는다.

policy는 짧은 구간의 action 시퀀스를 예측한다.

A_t = π0.5(o_t, l_t, q_t)

여기서 o_t는 시각 observation, l_t는 RoboClaw agent가 만든 지시문, q_t는 로봇 관절 상태다. 예측되는 action chunk는 길이 H에 대해 A_t = [a_t, ..., a_{t+H-1}]로 정의된다.

policy는 conditional flow matching 목적함수로 분포 p(A_t | o_t, l_t, q_t)를 모델링하도록 학습한다. 표준 가우시안 노이즈 분포를 실제 action 분포로 옮기는 velocity field v_θ를 학습하는 방식이다. 손실은 flow matching 시간 변수 τ가 0과 1 사이 값을 가질 때 A_τ_t = (1-τ)ε + τA_t로 보간된 상태에서 v_θ와 목표 벡터장의 L2 거리로 정의된다.

### 3.6 Entangled Action Pairs

EAP는 이 논문의 핵심 장치다. policy k마다 forward 실행 policy와 reset policy를 함께 학습한다.

forward 상호작용은 trajectory를 하나 모은다. 시점 0부터 T까지의 observation과 관절 상태와 action의 조합이다. agent가 subtask 완료를 판정하면 reset policy가 발동해 환경 상태를 되돌린다. 이때 T+1부터 T+T_reset까지의 두 번째 trajectory가 만들어진다. 두 trajectory는 하나의 entangled pair를 이룬다.

이 구조 덕분에 환경은 사람의 개입 없이 자동으로 초기 상태로 되돌아간다. 수집된 trajectory는 모두 데이터셋에 저장되어 이후 policy 학습에 쓰인다. agent 제어 아래에서 짝지어진 두 동작이 번갈아 실행되므로 온라인 데이터 수집이 끊기지 않는다.

### 3.7 배포 시점 감독과 스킬 스케줄링

배포 단계에서 RoboClaw는 과제 실행자로 동작하며 이미 학습된 policy를 조합해 long-horizon 과제를 수행한다. 결정 구조는 데이터 수집 때와 같다.

선택된 subtask에 대해 MCP tool 인터페이스로 대응하는 forward policy를 호출한다. 실행 중에는 Fetch Robot Stats나 Env Summary 같은 tool로 환경 요약과 로봇 상태를 주기적으로 조회해 진행 상황을 감시한다. 이 피드백 신호는 working memory에 기록되고 subtask 완료 판정에 쓰인다.

성공 조건이 충족되면 task-level memory를 갱신하고 다음 subtask로 넘어간다. 충족되지 않으면 같은 policy를 재시도하거나 Change Policy tool로 다른 forward policy로 전환한다. 반복 실패나 예상치 못한 환경 상태가 감지되면 재계획을 수행하고 forward 스킬 집합에서 대안을 고른다. 자율 복구가 실패하거나 안전 조건이 걸리면 Call Human tool로 사람 개입을 요청한다.

배포 중 생성된 trajectory도 데이터셋에 편입된다. 실제 과제 실행에서 마주친 추가 상태 분포를 담고 있어 스킬 policy를 더 정교하게 만드는 재료가 된다. 데이터 수집과 배포가 같은 결정 루프와 스킬 인터페이스를 공유하기 때문에, 실행이 곧 기반 스킬을 개선하는 lifecycle 학습 구조가 성립한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 실험 설정

모든 실험은 Agibot G01 플랫폼에서 수행했다. 모바일 베이스 위에 양팔이 올라간 manipulation 로봇으로, end-effector를 제외하고 20 자유도를 제공한다. 각 팔에는 능동 자유도가 하나인 적응형 그리퍼 AGIBOT OmniPicker가 달려 있다.

π0.5 fine-tuning 설정은 다음과 같다.

| 구분 | 항목 | 값 |
|---|---|---|
| 일반 | 정밀도 | bfloat16 |
| 일반 | batch size | 16 |
| 일반 | 학습 step | 10,000 |
| 일반 | warmup step | 100 |
| 일반 | learning rate | 2.5e-5 |
| 일반 | gradient checkpointing | 사용 |
| LoRA | rank | 16 |
| LoRA | alpha | 16 |
| LoRA | dropout | 0.1 |
| LoRA | 대상 모듈 | all-linear |
| LoRA | inference step | 3 |

평가는 네 가지 질문을 중심으로 구성했다. 데이터 수집 효율을 높이는가, subtask policy의 성공률을 높이는가, 복잡한 long-horizon 과제의 성능을 높이는가, 실패로부터 학습하는가이다.

### 4.2 데이터 수집 효율

네 가지 실제 환경에서 평가했다. 침실 화장대, 주방 선반, 서재 책상, 편의점 진열대다. 각 환경에서 로봇은 정리나 반출 과제를 맡는다. 편의점 시나리오에서는 주어진 지시에 따라 특정 상품을 고른다. 이 과제들은 여러 물체를 다루고 일련의 action을 순차 실행해야 하므로 multi-stage manipulation 과제로 분류된다. 과제 지시의 올바른 해석과 대상 물체의 의미 식별도 성공 판정 기준에 포함된다.

비교 대상은 순수 수동 데이터 수집 baseline이다. 사람이 시연을 수행하고 매 시도 후 환경을 손으로 되돌린다. 같은 양의 데이터를 모을 때 각 방법이 요구하는 사람 투입 비율을 측정했다.

| 측정 항목 | baseline | RoboClaw |
|---|---|---|
| 같은 수의 trajectory 수집에 드는 사람 시간 | 2.16배 | 1 (기준) |
| rollout 실행 중 사람 개입 | 8.04배 | 1 (기준) |

시간보다 개입 횟수의 격차가 훨씬 크다. RoboClaw가 대부분의 수집을 자율로 수행하기 때문이다.

### 4.3 subtask policy 성공률

네 가지 단일 스킬 과제로 평가했다. 저자들은 난이도 성격이 서로 다르도록 의도적으로 설계했다고 밝힌다.

| 과제 | 내용 | 난이도 요인 |
|---|---|---|
| Body Lotion 배치 | 화장대의 로션 병을 라벨이 붙은 배치 구역으로 옮긴다 | 이동 거리가 길어 접근과 grasping과 들어올림과 배치 사이에서 카메라 시야가 크게 변한다 |
| Primer 배치 | 프라이머를 라벨이 붙은 서랍 안 목표 구역에 놓고 서랍을 닫는다 | 서랍을 닫으려면 배치 후 상태까지 관리해야 하고, 가림과 좁은 여유 공간이 지각을 어렵게 한다 |
| Lipstick 삽입 | 립스틱을 라벨이 붙은 좁은 슬롯에 삽입한다 | 위치와 회전 공차가 좁아 접촉 순간까지 정렬을 유지해야 한다 |
| Tissue wipe | 화장수가 쏟아진 구역을 티슈로 닦는다 | 최종 자세가 아니라 연속 동작의 품질이 성공을 좌우하며 안정적 접촉을 유지해야 한다 |

먼저 데이터 수집 루프에서 쓰이는 inverse reset policy의 성능을 측정했다. 50회 시도 기준으로 Body Lotion 36회, Primer 38회, Lipstick 43회, Tissue Wipe 39회 성공했다. 저자들은 이 높은 성공률이 의도된 결과라고 설명한다. 더 어려운 forward 과제의 자동 수집을 가능하게 하려면 inverse 과제를 일부러 더 쉽게 설계해야 하기 때문이다.

다음으로 iteration을 1에서 5까지 늘리며 forward policy 성능을 측정했다. 각 iteration은 데이터 50건을 추가한다. forward policy마다 사람 시연은 고정된 양만 배정하고, 나머지는 closed-loop rollout으로 얻는다.

| iteration | Body Lotion | Primer | Lipstick | Tissue Wipe |
|---|---|---|---|---|
| 1 | 21/50 | 23/50 | 2/50 | 11/50 |
| 2 | 25/50 | 31/50 | 4/50 | 13/50 |
| 3 | 32/50 | 31/50 | 11/50 | 14/50 |
| 4 | 37/50 | 34/50 | 16/50 | 21/50 |
| 5 | 43/50 | 40/50 | 23/50 | 26/50 |

네 과제 모두 꾸준히 상승한다. 상승 폭이 가장 큰 과제는 Lipstick 삽입으로 2/50에서 23/50으로 11배 넘게 올랐다. Body Lotion은 21/50에서 43/50, Primer는 23/50에서 40/50, Tissue Wipe는 11/50에서 26/50이 되었다. 같은 사람 시연 예산 아래에서 closed-loop로 모은 trajectory가 더 유익한 학습 데이터를 제공한다는 근거다.

저자들은 forward와 inverse 사이의 비대칭이 EAP에 유리하게 작용한다고 덧붙인다. 신뢰할 만한 inverse policy가 self-resetting 루프를 안정적으로 유지해 주기 때문이다.

### 4.4 long-horizon 과제

화장대 정리 과제로 두 baseline과 비교했다. Baseline 1은 같은 데이터셋으로 학습했지만 RoboClaw 프레임워크를 쓰지 않은 π0.5 모델이다. Baseline 2는 네 subtask policy 성공률의 곱으로 기대 성공률을 추정한 값이다. 이 구성은 프레임워크 자체의 기여를 분리해 보기 위한 것이다.

결과는 RoboClaw가 두 baseline을 모두 크게 앞선다. 20회 시도 평균 기준이며, 초록에 보고된 개선 폭은 성공률 25%다. 저자들은 개선의 원인을 과제 진행 상황을 감시하고 실패 시 복구 policy를 자동으로 호출하는 능력에서 찾는다.

학습 파이프라인이 사용하는 데이터 출처는 세 가지다. 사람이 모은 시연 데이터, RoboClaw가 자율로 모은 trajectory, 그리고 자율 rollout 실패 후 사람이 개입한 기록이다.

### 4.5 실패로부터의 학습

RoboClaw는 실행 컨텍스트와 상호작용 이력에서 공통 실패 패턴을 요약한다. 저자들은 실패를 두 범주로 나눈다.

| 범주 | 정의 | 예시 | 대응 |
|---|---|---|---|
| non-degrading failure | 환경 상태가 거의 그대로 남아 같은 policy 재시도로 해결된다 | 로션 병 grasping 중 그리퍼가 빗나가거나 살짝 어긋나게 닫혀 빈손으로 잡힌 경우. 병은 여전히 서 있고 자세도 거의 같다 | 추가 복구 동작 없이 같은 policy를 다시 실행한다 |
| degrading failure | 실패가 환경 상태를 바꿔 즉시 재시도가 불가능하다 | grasping 실패로 로션 병이 넘어지거나 원래 위치에서 미끄러져 grasping policy의 정상 전제 조건 영역을 벗어난 경우 | 실행 가능한 상태로 되돌리는 추가 복구 동작이 필요하다 |

rollout 초기 단계에서는 degrading failure가 사람의 장면 복구를 필요로 한다. 그러나 실행 경험이 쌓이면 이 복구 동작이 전용 복구 policy로 policy 라이브러리에 편입된다. 이후 실행에서는 agent가 복구 policy를 자율로 호출해 환경을 되돌리고 과제를 이어간다.

저자들은 이 관찰에서 반복 rollout의 효과가 두 가지라고 정리한다. 기존 policy의 강건성을 높이는 것과, 복구 전략을 학습해 행동 목록 자체를 넓히는 것이다. 정상 policy와 복구 동작이 함께 쌓이면서 시스템이 안정적으로 다룰 수 있는 환경 상태의 범위가 점점 넓어진다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자들이 결론에서 직접 밝힌 한계는 두 가지다.

첫째, 클라우드 기반 대형 모델이 유발하는 지연이다. 상위 수준 추론을 외부 VLM에 맡기는 구조라 응답 지연이 실행 루프에 그대로 반영된다.

둘째, 실용적인 inverse reset 동작이 존재한다는 가정이다. EAP는 재사용 가능한 환경 상태를 만들기 위해 forward 동작을 되돌리는 동작이 실제로 구현 가능해야 성립한다. 되돌릴 수 없는 조작이나 inverse 설계가 forward보다 어려운 과제에는 그대로 적용하기 어렵다.

저자들은 그럼에도 RoboClaw가 확장 가능한 embodied AI 시스템의 기반이 될 수 있다고 평가하며, VLM과 VLA 모델이 발전하면 프레임워크도 자연스럽게 함께 향상된다고 전망한다.

논문에 명시되지 않은 관찰로는 평가 범위의 제약이 있다. 실험이 화장대 정리를 중심으로 한 네 개 실내 환경과 네 개 단일 스킬 과제에 한정되어 있고, long-horizon 비교의 절대 성공률도 그림 기준으로 30% 안팎에 머문다.

## 6. 관련 연구 (Related Work)

### 6.1 closed-loop 데이터 수집

표준 teleoperation 시스템으로 AnyTeleop과 GELLO와 Mobile ALOHA가 있다. 사람의 부담을 줄이는 방향으로는 RoboCopilot이 human-in-the-loop 잔차 교정을 사용하고, Genie Centurion은 Task Sentinel이 실패를 자율 감지해 사람 개입을 요청하는 rewind-and-refine 장치를 제안했으며 VLAC도 비슷한 구조를 갖는다. FieldGen은 manipulation 단계를 분리해 정밀 조작에만 사람 시연을 쓰고 사전 조작 trajectory는 attraction field로 자동 합성한다.

완전 자동화 방향에서는 MimicGen과 GenH2R-Sim과 RoboCasa가 시뮬레이터에서 대규모 시연을 합성한다. LLM을 계획과 실행 자동화에 쓰는 흐름도 있다. RoboTwin 2.0은 MLLM과 시뮬레이션 피드백으로 과제 실행 코드를 반복 검증하고, HumanoidGen은 LLM으로 공간 제약을 생성하고 STCR 기반 트리 탐색으로 long-horizon 계획을 개선한다. CyberDemo는 Auto Curriculum Learning으로 policy의 현재 성공률에 따라 데이터 증강 난이도를 조절한다.

저자들은 이 연구들이 데이터 합성이나 사람 보조 교정에는 closed-loop 피드백을 성공적으로 도입했지만 실제 배포 중의 자율 적응력이 부족하다고 평가한다. RoboClaw의 차별점은 추론 시점의 자율적 과정 감시와 스킬 스케줄링이다.

### 6.2 embodied 과제를 위한 foundation model

VLA 계열로 PaLM-E와 RT-2와 OpenVLA와 π0가 언어 조건 로봇 제어를 발전시켰으나 long-horizon에서 compounding error에 취약하다. 계획 용도의 LLM 활용으로는 Language Models as Zero-Shot Planners와 Code as Policies와 VoxPoser가 과제 분해를 개선했지만 실행 시점 감독은 제한적이다.

계층적 접근으로 SayCan과 HAMSTER와 HiRobot과 Agentic Robot이 구조화된 subtask 추상화와 계획 검증 장치를 도입했고, π0.5는 단일 VLA 프레임워크 안에서 다단계 추론을 강화했다. Inner Monologue와 LITEN은 재계획으로 강건성을 높였다. 저자들은 실행 중의 지속적 과정 수준 감독은 여전히 거의 탐구되지 않았다고 본다.

RoboClaw는 추론 시점에 동작하는 컨텍스트 인식 감독 agent를 제안하며, 특정 과제 구조나 스킬 라이브러리에 묶이지 않는다는 점을 차별점으로 든다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Entangled Action Pairs (EAP) | forward 실행 policy와 inverse reset policy를 짝지어 self-resetting 루프를 만드는 데이터 수집 장치. 두 trajectory가 하나의 쌍을 이룬다 |
| self-resetting loop | 사람이 손으로 환경을 되돌리지 않아도 로봇이 스스로 재사용 가능한 전제 조건 영역으로 복귀하는 반복 구조 |
| role identity | structured memory의 한 요소. agent의 현재 동작 모드와 사용 가능한 tool 집합을 지정한다 |
| task-level memory | structured memory의 한 요소. 전체 과제와 분해된 subtask, 그리고 각각의 실행 상태를 기록한다 |
| working memory | structured memory의 한 요소. 현재 활성화된 스킬과 tool call 이력 같은 단기 실행 컨텍스트를 담는다 |
| non-degrading failure | 환경 상태가 거의 변하지 않아 같은 policy 재시도로 해결되는 실패 |
| degrading failure | 실패가 환경 상태를 바꿔 즉시 재시도가 불가능하고 별도 복구 동작이 필요한 실패 |
| recovery policy | degrading failure 이후 환경을 실행 가능한 상태로 되돌리는 전용 policy. 실행 경험이 쌓이면서 policy 라이브러리에 편입된다 |
| Agibot G01 | 실험에 쓰인 양팔 모바일 manipulation 플랫폼. end-effector 제외 20 자유도, AGIBOT OmniPicker 그리퍼 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | RoboClaw 워크플로 전경. 개발자 설정과 메모리 제공, EAP 자율 수집, VLA policy pool, long-horizon 실행의 순환 | caption-region | 확정 wiki (overview) |
| fig02 | 5 | 시스템 아키텍처. VLM meta-controller와 structured memory와 CoT 5단계 질문과 MCP tool 목록 | caption-region | 확정 wiki (architecture) |
| fig03 | 6 | 자율 데이터 수집 워크플로. forward와 reverse를 번갈아 실행하는 화면 흐름 | caption-region | 확정 wiki (method) |
| fig04 | 8 | 사람 투입량 비교 3분할. 시간 2.16배, 개입 8.04배, iteration별 성공률 곡선 | caption-region | 확정 wiki (result) |
| fig05 | 14 | long-horizon 실행 시퀀스. 계획 단계와 네 policy의 순차 호출 | caption-region | 아카이브 보관 |
| tab01 | 10 | π0.5 fine-tuning 하이퍼파라미터와 LoRA 설정 | table-region | 아카이브 보관 (본문 표로 옮김) |
| tab02 | 10 | inverse reset policy 성공률 | table-region | 아카이브 보관 (본문 표로 옮김) |
| tab03 | 11 | rollout iteration별 forward policy 성공률 | table-region | 확정 wiki (핵심 결과) |
