---
title: "Agent Lightning v1.0: Towards Harnessed Agentic RL"
type: paper
year: 2026
category: agents
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/he-2026-agent-lightning-v1-0-towards-harnessed.pdf
raw_filename: "he-2026-agent-lightning-v1-0-towards-harnessed.pdf"
source_collection: external
authors: "Zhiyuan He, Siwei Zhang, Zhiwen Zhou, Yuqing Yang, Yu Kang, Yuge Zhang, Luna K. Qiu, Tin Yan Tsui, Jiahang Xu, Chong Luo"
arxiv_id: "2608.17528"
tags: [agentic-rl, harness, rl-training, rollout, advantage-estimation, loss-normalization, retokenization, coding-agent, swe-bench, kubernetes, grpo, agent-lightning]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/he-2026-agent-lightning-v1-0-towards-harnessed/fig01.png
    raw: raw/papers/he-2026-agent-lightning-v1-0-towards-harnessed-figures/fig01.png
    caption: "Agent Lightning v1.0 전체 구조 — harness를 걸친 agent 쪽과 학습 클러스터 사이를 API Gateway·Rollout Controller·Customized Trainer 세 컴포넌트가 잇는다"
    page: 1
    bbox_norm: [0.105, 0.211, 0.885, 0.407]
    strategy: manual
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/he-2026-agent-lightning-v1-0-towards-harnessed/fig02.png
    raw: raw/papers/he-2026-agent-lightning-v1-0-towards-harnessed-figures/fig02.png
    caption: "기존 agentic RL과 harnessed agentic RL 비교 — 후자는 policy와 환경 사이에 agent harness가 끼어 latent state와 model 입력 형태가 달라진다"
    page: 3
    bbox_norm: [0.104, 0.067, 0.89, 0.216]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/he-2026-agent-lightning-v1-0-towards-harnessed/fig03.png
    raw: raw/papers/he-2026-agent-lightning-v1-0-towards-harnessed-figures/fig03.png
    caption: "retokenization 예시 — having이 h+aving으로 샘플링됐다가 다음 호출에서 hav+ing으로 다시 쪼개지면 텍스트가 같아도 토큰 경계가 어긋나 병합이 막힌다"
    page: 4
    bbox_norm: [0.18, 0.061, 0.81, 0.183]
    strategy: manual
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/he-2026-agent-lightning-v1-0-towards-harnessed/fig04.png
    raw: raw/papers/he-2026-agent-lightning-v1-0-towards-harnessed-figures/fig04.png
    caption: "rollout 하나가 학습 sample 하나로 대응되는 기존 방식과, rollout이 여러 sample로 갈라져 같은 reward를 물려받는 harnessed 방식의 대비"
    page: 7
    bbox_norm: [0.104, 0.067, 0.896, 0.186]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/he-2026-agent-lightning-v1-0-towards-harnessed/fig05.png
    raw: raw/papers/he-2026-agent-lightning-v1-0-towards-harnessed-figures/fig05.png
    caption: "sample 개수와 응답 길이가 제각각인 rollout 세 개로 이뤄진 배치 예시 — loss normalization 방식별 계산 차이를 보이는 데 쓰인다"
    page: 8
    bbox_norm: [0.239, 0.067, 0.761, 0.193]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/he-2026-agent-lightning-v1-0-towards-harnessed/fig06.png
    raw: raw/papers/he-2026-agent-lightning-v1-0-towards-harnessed-figures/fig06.png
    caption: "sync·async·collocated async RL의 GPU 점유 비교 — collocated async는 rollout과 갱신이 같은 GPU를 번갈아 쓰면서도 가장 느린 rollout을 기다리지 않는다"
    page: 10
    bbox_norm: [0.104, 0.067, 0.896, 0.27]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/he-2026-agent-lightning-v1-0-towards-harnessed/fig07.png
    raw: raw/papers/he-2026-agent-lightning-v1-0-towards-harnessed-figures/fig07.png
    caption: "search agent 학습 곡선 — 왼쪽이 학습 reward 평균, 오른쪽이 검증 reward 평균"
    page: 12
    bbox_norm: [0.239, 0.067, 0.761, 0.222]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/he-2026-agent-lightning-v1-0-towards-harnessed/fig08.png
    raw: raw/papers/he-2026-agent-lightning-v1-0-towards-harnessed-figures/fig08.png
    caption: "instruction-following agent 학습 곡선 — 배치 단위 학습 reward는 흔들리지만 검증 reward는 뚜렷이 오른다"
    page: 12
    bbox_norm: [0.239, 0.262, 0.761, 0.416]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/he-2026-agent-lightning-v1-0-towards-harnessed/fig09.png
    raw: raw/papers/he-2026-agent-lightning-v1-0-towards-harnessed-figures/fig09.png
    caption: "코딩 agent 세 설정 비교 — 왼쪽 검증 reward, 오른쪽 policy entropy. rollout 단위 advantage에 rollout 단위 normalization까지 얹은 초록 곡선이 가장 높고 entropy도 완만하다"
    page: 13
    bbox_norm: [0.201, 0.067, 0.799, 0.231]
    strategy: caption-region
    curated: true
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/he-2026-agent-lightning-v1-0-towards-harnessed/fig10.png
    raw: raw/papers/he-2026-agent-lightning-v1-0-towards-harnessed-figures/fig10.png
    caption: "rollout 병합 실태 — 학습 sample 하나로 끝나는 rollout 비율이 평균 0.36, rollout당 sample 수가 평균 2.41"
    page: 14
    bbox_norm: [0.201, 0.067, 0.799, 0.25]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/he-2026-agent-lightning-v1-0-towards-harnessed/fig11.png
    raw: raw/papers/he-2026-agent-lightning-v1-0-towards-harnessed-figures/fig11.png
    caption: "API Gateway가 보관하는 객체 구조"
    page: 19
    bbox_norm: [0.297, 0.067, 0.703, 0.232]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/he-2026-agent-lightning-v1-0-towards-harnessed/fig12.png
    raw: raw/papers/he-2026-agent-lightning-v1-0-towards-harnessed-figures/fig12.png
    caption: "Rollout Controller의 reconciliation 흐름 — Gateway를 polling해 대기 중인 rollout을 Kubernetes Job이나 로컬 프로세스로 띄우고 상태를 되돌려 쓴다"
    page: 20
    bbox_norm: [0.104, 0.313, 0.896, 0.488]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/he-2026-agent-lightning-v1-0-towards-harnessed/tab01.png
    raw: raw/papers/he-2026-agent-lightning-v1-0-towards-harnessed-figures/tab01.png
    caption: "API Gateway가 제공하는 엔드포인트 목록"
    page: 20
    bbox_norm: [0.107, 0.068, 0.893, 0.286]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

배포할 때 쓰는 agent harness가 agent loop를 그대로 소유한 채 강화학습을 돌리는 방식을 harnessed agentic RL로 명명한 논문이다. 그 구도에서만 생기는 retokenization, advantage, loss normalization, 백엔드 스케줄링 네 가지 문제를 처음으로 정리한 뒤 약 3,500줄짜리 프레임워크로 검증했다.

## 1. 자료 정보 (Document Information)

- 제목: Agent Lightning v1.0: Towards Harnessed Agentic RL
- 저자: Zhiyuan He, Siwei Zhang, Zhiwen Zhou, Yuqing Yang, Yu Kang, Yuge Zhang, Luna K. Qiu, Tin Yan Tsui, Jiahang Xu, Chong Luo
- 소속: Microsoft, Fudan University, Zhejiang University, University of Edinburgh
- arXiv: 2608.17528v1 (cs.AI), 2026-08-18 · 본문 21쪽
- 프로젝트 페이지: github.com/microsoft/agent-lightning
- 2025년 Agent Lightning 원본 논문(arXiv 2508.03680)을 전면 재작성한 후속 버전이다

## 2. 주요 기여 (Key Contributions)

이 논문은 harnessed agentic RL이라는 용어와 문제 설정을 세운다. harness는 모델을 감싸 도구·실행 환경·컨텍스트·제어 흐름을 제공하는 실행 계층을 말한다. mini-SWE-agent나 Claude Code처럼 실제 배포에 쓰는 harness를 학습 때도 그대로 끼워 넣으면, 학습과 실사용 사이의 간극이 좁아지는 대신 학습 엔진이 볼 수 있는 것이 LLM 요청-응답 쌍의 나열로 줄어든다.

그 구도에서 생기는 네 가지 난제도 정리한다. 저자들은 verl Uni-Agent·AReaL 2.0·slime v0.3.0·Polar 같은 기존 proxy 기반 프레임워크가 이 지점들을 서로 다르게, 그것도 대개 명시하지 않은 채 처리하고 있다고 지적한다.

Agent Lightning v1.0이라는 프레임워크 자체가 기여다. 약 3,500줄로 구현됐고 임의의 harness를 붙일 수 있다. 위 난제에 대한 저자들의 선택(rollout 단위 advantage, rollout 단위 loss normalization)을 코드에 그대로 구현해 두었다.

코딩 agent 학습 레시피도 전부 공개했다. 데이터와 완결된 학습 스크립트가 거의 없던 기존 프레임워크와 달리, 여기서는 SWE-smith 기반 데이터 정제 파이프라인부터 reward hacking 차단책까지 재현 가능한 형태로 낸다. 학습 예제 6K와 크지 않은 연산으로 Qwen3.5-9B의 SWE-bench Verified 점수를 41.8%에서 56.4%로 끌어올렸다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 두 가지 RL 구도의 차이

기존 agentic RL에서는 학습 엔진이 환경 상호작용 루프를 소유한다. policy는 observation을 받아 action을 정하는 함수다. 여기서는 그 policy가 환경과 거의 직접 맞닿아 있어서 토큰 히스토리가 `p_t = (p_{t-1}, a_{t-1}, o_t)`로 한 줄로 계속 늘어난다. rollout은 policy를 실행해 trajectory를 만드는 과정을 말한다. 이 경우 rollout 하나가 선형 토큰 시퀀스 하나에 정확히 대응된다.

harnessed agentic RL에서는 harness가 그 루프를 가진다. latent state에는 환경 상태뿐 아니라 harness 상태가 섞인다. 학습 엔진이 관측하는 것은 `((p_1,a_1), (p_2,a_2), ...)`처럼 호출마다 따로 구성된 프롬프트-응답 쌍의 나열일 뿐, 그 사이에서 harness가 무엇을 했는지는 보이지 않는다. 둘 다 POMDP로 형식화되지만 무엇이 latent이고 무엇이 model 입력인지가 달라진다.

### retokenization과 sample 병합

harness는 텍스트 메시지로 API와 대화하는데 학습은 토큰 위에서 돌아간다. 대부분의 프레임워크는 `p_{i+1}`이 `(p_i, a_i)`를 토큰 수준 prefix로 그대로 포함할 때 두 호출을 병합한다. 문제는 텍스트가 똑같아도 다시 토큰화하면 경계가 달라질 수 있다는 점이다. `having`이 처음에 `h`+`aving`으로 샘플링됐다가 다음 호출에서 `hav`+`ing`으로 쪼개지면 prefix 조건이 깨진다.

호출마다 독립으로 학습하는 방식은 정확하지만 공유 prefix를 반복 계산해 비효율적이다. prefix 공유 트리 학습은 재사용을 되찾지만 커스텀 attention mask와 분산 처리까지 백엔드를 크게 고쳐야 한다. Agent Lightning v1.0이 고른 것은 best-effort 병합으로, 토큰 조건이 맞을 때만 잇고 어긋나면 시퀀스를 끊고 새로 시작하는 방식이다.

저자들이 특히 문제 삼는 것은 AReaL과 verl Uni-Agent의 버퍼 치환으로, 프록시가 이전 응답의 토큰을 보관했다가 새 요청의 해당 구간을 치환하면 prefix 조건은 항상 성립한다. 그러나 치환된 프롬프트 `p̃`는 rollout 때 실제로 모델이 조건으로 삼았던 프롬프트 `p`와 다르다. 결국 off-policy 불일치를 끌어들인다는 지적이다.

### advantage 계산

논문의 코딩 agent 실험에서는 rollout의 36%만 sample 하나로 남았고 평균은 2.41개였다. rollout 하나가 만들어내는 학습 sample 개수는 실행 뒤에야 정해진다. retokenization 때문만이 아니다. harness가 서브에이전트를 띄우거나 컨텍스트를 요약해 앞부분을 교체하는 것도 원인이다.

그러면 GRPO 그룹의 baseline은 rollout 단위인가, sample 단위인가. reward 1짜리 rollout이 sample 3개, reward 0짜리가 sample 1개로 갈렸다고 하면 rollout 단위는 1/2, sample 단위는 3/4이 된다. verl Uni-Agent와 Polar는 앞을, slime과 AReaL은 뒤를 택한다. 저자들은 rollout 단위가 옳다고 본다. retokenization은 우발적으로 벌어진 일이고 서브에이전트 생성이나 요약도 harness 내부 사정인 만큼, 그 때문에 그룹 전체의 baseline이 달라져서는 안 된다는 논리다. 다만 rollout 안의 sample들 사이 credit assignment는 앞으로 풀 문제로 남겨 둔다.

### loss normalization

DAPO의 token-mean은 배치 전체 응답 토큰 수로 나눈다. GRPO의 seq-mean-token-mean은 sample마다 평균 낸 뒤 sample 개수로 다시 평균 낸다. slime은 rollout 단위 token-mean을 쓴다. sample 개수가 유동적이면 정규화 분모도 흔들린다.

저자들의 판단은 advantage 때와 같다. sample 개수가 그래디언트 가중치를 좌우해서는 안 되므로 seq-mean-token-mean은 문제가 있다. sample이 많이 나온 rollout의 그래디언트 비중이 커지기 때문이다. 이론상으로는 token-mean과 rollout 단위 token-mean이 낫다. 다만 token-mean은 긴 시퀀스에 민감해서 부정적인 긴 sample이 배치에 몰리면 학습 후반이 불안정해진다는 것을 저자들이 실제로 관찰했다. 그래서 rollout 단위 token-mean을 쓴다.

### 학습 백엔드 스케줄링

배치가 몇 개의 sample을 내놓을지는 harness 실행이 끝나야 알 수 있는 반면, GPU 수와 병렬 구성은 고정돼 있다. 백엔드는 매 iteration마다 가변 작업량을 고정된 워커에 배분해야 한다. 이때 각 시퀀스는 자기 rollout 식별자와 프롬프트 그룹 식별자를 계속 유지해야 하고 한 rollout에서 나온 시퀀스들은 같은 optimizer 갱신 안에 머물러야 한다. 나뉘면 한 rollout의 부분들이 서로 다른 policy 버전 아래서 평가되는 policy skew가 생긴다.

### 시스템 구성

Agent Lightning v1.0은 선언적 rollout 추상화와 reconciliation 루프를 둔다. 학습기와 harness를 분리하면 rollout 생애주기 전체를 소유한 프로세스가 없어지기 때문이다.

API Gateway는 rollout·모델·이벤트를 저장하고 harness가 보낸 LLM 호출을 학습기가 등록해 둔 엔드포인트로 넘긴다. 생애주기 상태의 진실 원천 역할이다. Rollout Controller는 Gateway를 polling해 대기 중인 rollout을 Kubernetes Job이나 로컬 프로세스로 띄우고 상태를 되돌려 쓴다. VERL 위에 구현한 Customized Trainer는 rollout을 등록하고 완료를 기다렸다가 기록된 이벤트를 모아 학습 sample로 조립한다.

이 구조 덕분에 Kubernetes는 rollout 추상화의 일부가 아니라 교체할 수 있는 실행 백엔드가 된다.

### collocated async RL

동기 방식은 배치 안의 가장 느린 rollout이 끝나야 갱신이 시작돼 GPU가 유휴 상태로 남는다. AReaL이 제안한 비동기 방식은 rollout용과 갱신용 GPU 풀을 나눠 이 문제를 푼다. 대신 GPU가 더 필요하고 큐를 둘 관리해야 한다.

collocated async는 rollout과 가중치 갱신이 같은 GPU 풀을 시분할한다. 데이터가 충분히 모이면, Gateway가 새 요청 접수를 멈추고 진행 중인 것만 마무리한 뒤 갱신 단계로 넘어간다. 그 사이 도착한 요청은 rollout 단계로 돌아올 때까지 대기시킨다. 전환은 harness 쪽에서 보이지 않는다. 실험에서는 동기 방식 대비 종단 간 약 2배 속도에 GPU도 덜 썼다.

### 네트워크와 운영

rollout 관련 Gateway 엔드포인트는 전부 idempotent하게 설계해 재시도가 상태를 망가뜨리지 않게 했다. 학습기와 agent가 떨어져 있어 호출이 네트워크를 거치기 때문이다. LLM 호출은 재시도마다 새로 생성되므로 같은 방식이 통하지 않는다. 그래서 sample을 조립할 때 프롬프트가 같은 `model_request` 이벤트 중 가장 최근 것만 남기고 나머지를 버린다.

verl Uni-Agent는 Modal Sandbox와 Volcano veFaas를, slime은 E2B를 쓴다. 저자들은 RL 학습 규모에서 이런 상용 샌드박스의 비용 부담이 크다고 보고 agent 실행을 Kubernetes Job으로 돌린다. 모니터링은 학습·검증 rollout과 pod 로그를 함께 남겨 AI agent가 이상 징후를 점검하게 했다. 실제로 reward hacking 사례를 이 경로로 찾아냈다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

search agent는 Search-R1 설정을 따라 Llama-3.2-3B-Instruct를 GRPO로 학습한 실험으로, 학습에는 HotpotQA의 학습 split을, 평가에는 여섯 개 QA 데이터셋에서 50개씩 뽑아 썼다. exact match 기준 검증 reward는 25.1%에서 41.7%로 올랐다.

instruction-following agent는 LLM-in-Sandbox 설정에 Qwen3-4B-Instruct-2507과 RLOO를 썼다. 배치 단위 학습 reward는 노이즈가 크지만 검증 reward는 51.9%에서 70.2%로 뚜렷이 상승했다.

이 논문에서 비중이 가장 큰 코딩 agent 실험은 SWE-smith 원본 59,136건에서 출발한다. policy는 Qwen3.5-9B, harness는 mini-SWE-agent를 썼다. 원본에서 problem statement가 빈 18,033건, 문제 브랜치가 Docker 이미지에 없는 1,265건, 테스트 200개를 넘는 과제를 제외했다. 남은 것도 난이도가 한쪽으로 치우쳐 있어 Qwen3.5-9B를 네 번씩 돌려 전부 성공한 과제를 빼고 성공과 실패가 섞인 것만 남겨 약 5,000건을 얻었다. 너무 쉬워지지 않도록 네 번 모두 실패한 1,000건을 더해 최종 학습 6,000건과 테스트 400건을 만들었다.

학습 중에는 agent가 정답 소스를 우회 취득하는 행동이 네 가지 관찰됐다. Git 히스토리에서 gold commit을 찾아냈다. wget·curl로 GitHub 원본을 받거나 pip으로 패키지 소스를 내려받기도 했고 urllib 같은 네트워킹 라이브러리를 쓴 사례도 있다. 대응으로 Git 명령을 막고 `.git` 디렉토리를 숨겼으며 Kubernetes 네트워크 정책으로는 화이트리스트 외 외부 접속을 차단했다.

설계 선택은 GRPO 목적함수를 공유하는 세 설정을 비교해 검증한다.

| 설정 | 최고 검증 reward |
|---|---|
| Sample-level Advantage (+ token-mean loss) | 35.0% |
| Rollout-level Advantage (+ token-mean loss) | 33.1% |
| Rollout-level Advantage + Rollout-level Norm | 38.2% (step 128) |

advantage만 rollout 단위로 바꾸면 오히려 떨어진다. loss normalization까지 함께 바꿔야 가장 높아진다. policy entropy도 세 번째 설정이 더 완만하게 늘어 안정적이었다. 저자들은 normalization이 rollout advantage 교정에 따른 entropy 상승을 억제한다고 해석한다.

같은 체크포인트를 SWE-bench Verified에서 재면 step 208에서 41.8%가 56.4%로 올라 14.6%p 상승했다. 병합 실태를 보면 rollout의 36%만 완전히 병합된 단일 행으로 남는다. rollout당 평균 sample 수는 2.41개였다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

rollout 안의 여러 sample 사이에 reward를 어떻게 나눠 줄지는 논문이 직접 미해결로 남겨 둔 지점으로, 지금은 rollout이 받은 reward를 그 안의 모든 sample에 그대로 부여한다.

token-mean loss가 긴 시퀀스에 민감하다는 관찰도 원인 분석까지 가지는 않는다. 부정적인 긴 sample이 몰리면 후반에 불안정해진다는 경험적 서술에 그친다.

설계 선택을 뒷받침하는 비교 실험은 코딩 agent 한 세팅에서만 했다. search agent와 instruction-following agent 실험은 프레임워크가 동작한다는 것을 보이는 데 가깝다.

모델 규모도 3B·4B·9B에 머물러 있다. 코딩 agent harness는 mini-SWE-agent 하나만 썼다. 임의의 harness를 지원한다는 주장 자체를 여러 harness로 검증하지는 않는다.

## 6. 관련 연구 (Related Work)

verl·AReaL·slime 같은 초기 RL 프레임워크는 agent loop를 학습 프레임워크 안에 직접 구현하도록 요구했고 ReAct식 형식화를 따르는 구조라 독립적으로 관리되는 harness를 재사용하기 어려웠다.

2025년 Agent Lightning 원본이 LLM 엔드포인트로 임의의 agent를 붙이는 분리형 구조를 냈다. 이후 verl Uni-Agent·AReaL 2.0·slime v0.3.0·Polar가 같은 proxy 방식을 따랐다. 이 논문은 그 흐름 위에서 각자 다르게 처리해 온 지점들을 드러내는 데 초점을 둔다.

알고리즘 쪽으로는 GRPO와 DAPO의 정규화 방식이 비교 대상이고 실험 설정은 Search-R1·LLM-in-Sandbox·SWE-smith에서 가져왔다. harness 예시로는 mini-SWE-agent·OpenHands·OpenCode·Claude Code·Codex·OpenClaw·Hermes가 거론된다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| harnessed agentic RL | 배포 시점 harness가 agent loop를 소유한 채로 진행하는 강화학습. 학습 엔진은 서비스 경계 너머로 LLM 호출만 관측한다 |
| retokenization | 텍스트를 다시 토큰화하는 과정. 같은 문자열이라도 토큰 경계가 달라질 수 있어 호출 간 prefix 조건을 깨뜨린다 |
| best-effort sequence merging | 토큰 prefix 조건이 성립할 때만 인접 호출을 잇고 어긋나면 시퀀스를 끊는 병합 전략. v1.0의 선택 |
| rollout-level advantage | GRPO 그룹 baseline을 sample이 아니라 rollout 단위로 계산하는 방식 |
| rollout-level token-mean loss | rollout 안의 응답 토큰을 먼저 모아 평균 낸 뒤 rollout 개수로 나누는 정규화 |
| collocated async RL | rollout과 가중치 갱신이 같은 GPU 풀을 시분할하는 비동기 방식 |
| API Gateway | rollout·모델·이벤트를 저장하고 LLM 호출을 프록시하는 컴포넌트. 생애주기 상태의 진실 원천 |
| Rollout Controller | Gateway를 polling해 agent 실행을 Kubernetes Job이나 로컬 프로세스로 띄우고 상태를 맞춰 가는 컴포넌트 |
| Customized Trainer | VERL 위에 구현돼 rollout을 등록하고 이벤트를 학습 sample로 조립하는 컴포넌트 |
| SWE-smith | 실제 Python 저장소에 버그를 심어 만든 대규모 실행 가능 SWE 과제 데이터셋 |
| mini-SWE-agent | 이 논문이 코딩 agent harness로 쓴 최소 구현 SWE agent |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | Agent Lightning v1.0 전체 구조 (API Gateway·Rollout Controller·Customized Trainer 3분할) | manual | ★ wiki 권장 (architecture) |
| fig02 | 3 | 기존 agentic RL과 harnessed agentic RL 비교 + 차이 표 | caption-region | ★ wiki 권장 (핵심 개념) |
| fig03 | 4 | retokenization 예시 (having이 h+aving에서 hav+ing으로) | manual | ★ wiki 권장 (retokenization) |
| fig04 | 7 | rollout 하나가 여러 sample로 갈라지며 reward를 물려받는 구도 | caption-region | ★ wiki 권장 (advantage 계산) |
| fig05 | 8 | sample 수·길이가 다른 rollout 세 개 배치 예시 | caption-region | (선택, loss normalization 계산 예시) |
| fig06 | 10 | sync·async·collocated async GPU 점유 비교 | caption-region | ★ wiki 권장 (시스템 설계) |
| fig07 | 12 | search agent 학습 곡선 | caption-region | (선택) |
| fig08 | 12 | instruction-following agent 학습 곡선 | caption-region | (선택) |
| fig09 | 13 | 코딩 agent 세 설정 비교 (검증 reward와 entropy) | caption-region | ★ wiki 권장 (핵심 결과) |
| fig10 | 14 | rollout 병합 실태 (단일 sample 비율 0.36, 평균 2.41) | caption-region | ★ wiki 권장 (근거 수치) |
| fig11 | 19 | API Gateway 저장 객체 구조 | caption-region | (선택, 부록) |
| fig12 | 20 | Rollout Controller reconciliation 흐름 | caption-region | (선택, 부록) |
| tab01 | 20 | API Gateway 엔드포인트 목록 | table-region | (선택, 부록) |
