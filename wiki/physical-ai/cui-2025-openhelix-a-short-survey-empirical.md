---
title: "OpenHelix: A Short Survey, Empirical Analysis, and Open-Source Dual-System VLA Model for Robotic Manipulation"
type: paper
year: 2025
category: physical-ai
source: cui-2025-openhelix-a-short-survey-empirical.md
raw_path: raw/papers/cui-2025-openhelix-a-short-survey-empirical.pdf
raw_filename: "cui-2025-openhelix-a-short-survey-empirical.pdf"
source_collection: external
authors: "Can Cui, Pengxiang Ding, Wenxuan Song, Shuanghao Bai, Xinyang Tong, Zirui Ge, Runze Suo, Wanqi Zhou, Yang Liu, Bofang Jia, Hangyu Liu, Mingyang Sun, Han Zhao, Siteng Huang, Donglin Wang"
arxiv_id: "2505.03912"
url: "https://openhelix-robot.github.io/"
tags: [physical-ai, vla, manipulation, robot-learning, benchmark]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/cui-2025-openhelix-a-short-survey-empirical/fig01.png
    raw: raw/papers/cui-2025-openhelix-a-short-survey-empirical-figures/fig01.png
    caption: "dual-system VLA의 7가지 핵심 설계 요소"
    page: 3
    bbox_norm: [0.078, 0.066, 0.914, 0.350]
    strategy: manual
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/cui-2025-openhelix-a-short-survey-empirical/fig03.png
    raw: raw/papers/cui-2025-openhelix-a-short-survey-empirical-figures/fig03.png
    caption: "MLLM 학습 방식 3종(fine-tuning, frozen, prompt tuning)"
    page: 6
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/cui-2025-openhelix-a-short-survey-empirical/fig05.png
    raw: raw/papers/cui-2025-openhelix-a-short-survey-empirical-figures/fig05.png
    caption: "action 토큰의 latent를 의미 공간에 투영한 결과. 물체가 왼쪽으로 이동해도 방향어 확률 분포가 거의 변하지 않는다"
    page: 8
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/cui-2025-openhelix-a-short-survey-empirical/fig06.png
    raw: raw/papers/cui-2025-openhelix-a-short-survey-empirical-figures/fig06.png
    caption: "OpenHelix 전체 구조. 얼린 MLLM, 학습되는 ACT 토큰, diffusion policy"
    page: 9
    bbox_norm: [0.500, 0.212, 0.897, 0.374]
    strategy: manual
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/cui-2025-openhelix-a-short-survey-empirical/fig07.png
    raw: raw/papers/cui-2025-openhelix-a-short-survey-empirical-figures/fig07.png
    caption: "세부 구조. (a) high-level MLLM과 보조 과제 head, (b) low-level diffusion policy"
    page: 10
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/cui-2025-openhelix-a-short-survey-empirical/tab01.png
    raw: raw/papers/cui-2025-openhelix-a-short-survey-empirical-figures/tab01.png
    caption: "기존 dual-system VLA 6종의 구성 비교"
    page: 2
    strategy: table-region
    curated: true
  - id: tab05
    label: Table 5
    kind: table
    file: assets/cui-2025-openhelix-a-short-survey-empirical/tab05.png
    raw: raw/papers/cui-2025-openhelix-a-short-survey-empirical-figures/tab05.png
    caption: "prompt tuning 추가 실험. CALVIN-E에서 방식 간 차이가 커진다"
    page: 7
    strategy: table-region
    curated: true
  - id: tab06
    label: Table 6
    kind: table
    file: assets/cui-2025-openhelix-a-short-survey-empirical/tab06.png
    raw: raw/papers/cui-2025-openhelix-a-short-survey-empirical-figures/tab06.png
    caption: "projector pre-alignment 유무. 생략하면 세 방식 모두 성공률 0%"
    page: 7
    bbox_norm: [0.090, 0.297, 0.897, 0.428]
    strategy: manual
    curated: true
  - id: tab08
    label: Table 8
    kind: table
    file: assets/cui-2025-openhelix-a-short-survey-empirical/tab08.png
    raw: raw/papers/cui-2025-openhelix-a-short-survey-empirical-figures/tab08.png
    caption: "CALVIN ABC-D 최종 결과 (1,000회 전수 평가)"
    page: 11
    strategy: table-region
    curated: true
---

## 요약

OpenHelix는 dual-system VLA를 주제로 짧은 서베이, 통제된 ablation, 오픈소스 모델 공개를 한 문서에 묶은 12페이지 기술 보고서다. dual-system VLA는 느린 대형 모델과 빠른 경량 policy를 서로 다른 주기로 함께 구동하는 VLA 구조를 말한다. 이 논문의 기여는 세 가지로 나뉜다. 첫째로 그동안 느슨하게 쓰이던 dual-system이라는 말에 판정 기준을 세웠고, 둘째로 이 구조를 결정하는 설계 요소를 7가지로 정리한 뒤 그중 셋을 CALVIN에서 통제 비교했으며, 셋째로 그 결론을 그대로 반영한 저비용 모델을 공개했다.

공개 모델의 구성은 단순하다. LLaVA-7B를 전부 얼려 두고 어휘에 추가한 `<ACT>` 토큰 하나만 학습시켜 3D Diffuser Actor에 연결한다. CALVIN ABC-D 1,000회 전수 평가에서 평균 완료 길이는 표준 환경 3.45, 지시문을 풀어 쓴 CALVIN-E에서 2.26이다. 평균 완료 길이는 연속 5개 과제 중 몇 개를 이어서 끝냈는지의 평균이므로 최댓값이 5다. 저장소 용어집이 dual-system VLA 항목에 적어 둔 판정 기준도 이 논문에서 나왔다.

## 배경

전통적인 policy learning은 경량 모델로 새 동작을 처음부터 학습시키는 방식이었다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. 이 방식으로 학습한 모델은 시각과 텍스트 양쪽의 환경 변화에 민감했고 일반화 능력도 제한적이었다.

인터넷 규모 데이터로 학습한 대형 모델이 이 상황을 바꿨다. RT-2가 vision-language-action model(VLA)이라는 개념을 처음 제시하면서 로봇 trajectory 데이터와 인터넷 규모 vision-language 과제를 함께 학습하는 co-fine-tuning을 도입했다. trajectory는 observation과 action이 시간순으로 이어진 실행 기록이다. VLA는 새 물체와 의미적으로 다양한 지시문(instruction)으로 일반화했고 여러 emergent capability를 보였다.

### VLA를 그대로 쓰기 어려운 두 가지 이유

첫 번째는 속도다. control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다. RT-2는 55B 모델이 1~3Hz, 5B 모델이 약 5Hz로 동작하는 반면 BC-Transformer 같은 경량 모델은 약 50Hz로 동작한다. 즉 대형 VLA는 1초에 한두 번밖에 판단을 갱신하지 못해 실시간 제어에 부족하다.

두 번째는 학습 비용이다. pre-training 자체가 자원을 많이 쓰는 데다, pre-training된 VLA를 로봇 데이터로 end-to-end fine-tuning하면 domain shift와 catastrophic forgetting이 따라온다. catastrophic forgetting은 새 학습이 기존 능력을 지워버리는 현상이다.

### dual-system 구조의 등장

이 두 한계를 동시에 피하려는 시도가 dual-system VLA다. LCB가 이 구조를 처음 채택했고 DP-VLA가 dual-process theory를 끌어와 구조적 근거를 제시했다. 따라서 대형 모델의 multimodal 이해와 추론 능력을 유지하면서 빠른 action 생성을 확보하는 것이 이 계열의 공통 목표다.

## 핵심 개념

dual-process theory는 인간 인지를 성격이 다른 두 시스템으로 나눠 보는 심리학 틀이다. System 1은 빠르고 자동적이며 직관적이고 무의식적으로 동작한다. heuristic에 의존해 즉각적인 판단을 내리므로 효율적이지만 체계적 오류를 낳기도 한다. 반면 System 2는 느리고 신중하며 의식적이다. 추론과 논리, 근거 평가를 수행해 대체로 더 정확하지만 인지 자원을 많이 요구한다.

로보틱스로 옮기면 System 1 자리에는 효율적이지만 과제에 특화된 경량 policy 네트워크가 들어가고, System 2 자리에는 연산이 무겁지만 일반화가 뛰어난 MLLM이나 VLA가 들어간다. MLLM은 이미지와 텍스트를 함께 받아 처리하는 대형 언어 모델을 가리킨다.

두 시스템은 병렬로 동작하되 정보 갱신 주기가 다르다. 느린 System 2는 드물게 갱신하며 high-level 표현을 바탕으로 신중한 결정을 내리고, 빠른 System 1은 높은 주기로 갱신하며 실시간 제어에 필요한 low-level action을 만든다. 여기서 중요한 점은 느린 쪽이 넘겨주는 정보에 시간 지연이 있다는 것이다.

latent goal은 System 2가 System 1에 넘기는 조건 벡터를 말한다. 이 논문의 실험 대부분은 latent goal을 어떤 형태로 만들고 두 시스템을 어떻게 이을지에 관한 것이다.

## dual-system VLA 분류

### 판정 기준

이 논문은 dual-system 여부를 가르는 기준을 하나 세운다. 두 시스템이 서로 다른 주기로 추론하려면 System 1이 RGB 이미지 같은 실시간 perception 입력을 직접 받아야 한다는 것이다. 이 조건을 만족하지 못하는 구조는 dual-system 틀에 넣을 수 없다고 본다.

기준의 논리는 시간 지연에서 나온다. System 2가 갱신을 쉬는 동안 System 1이 상위에서 내려온 latent goal만 갖고 있다면, 상위 정보가 낡아지는 순간 시스템 전체가 낡은 정보로 동작한다. 반면 System 1이 자기 카메라로 환경을 계속 보고 있으면 상위가 낡아도 하위가 현재 장면을 근거로 action을 낼 수 있다.

이 기준이 적용된 결과는 다음과 같다.

| 판정 | 모델 | 근거 |
|---|---|---|
| 포함 | LCB, DP-VLA, HiRT, Robodual, DexVLA, Helix | System 1 센서 입력에 RGB가 반드시 들어 있다 |
| 제외 | π0, GR00T N1과 유사 계열 | System 1이 실시간 perception 입력을 직접 받지 않는다 |

Figure 1이 이 기준을 그림으로 보여준다. 저주기 perception 묶음은 MLLM으로 들어가고, 고주기 perception 묶음은 policy로 따로 들어간다. 고주기 쪽에서 이미지 입력만 필수(✓)로 표시되고 depth, tactile, proprioception은 선택(✓/×)으로 표시된다. proprioception은 관절 각도 같은 로봇 자신의 상태 감각 입력을 말한다.

![[assets/cui-2025-openhelix-a-short-survey-empirical/fig01.png]]
*Figure 1: dual-system VLA의 7가지 핵심 설계 요소. 고주기 perception 묶음에서 이미지만 필수로 표시된 것이 판정 기준에 대응한다 (Cui 2025, p.3)*

### 기존 6종의 구성 비교

Table 1은 dual-system으로 분류된 6종의 구성을 한 표에 모은다. 모달리티 약어는 L이 언어, R이 RGB, P가 proprioception, D가 depth, T가 tactile, PC가 point cloud다.

| 모델 | System 2 모델 | System 2 입력 | System 2 학습 | latent representation | policy head | System 1 센서 | policy 학습 |
|---|---|---|---|---|---|---|---|
| LCB | LLaVA-7B | L+R | LoRA fine-tuning | Lang(`<ACT>`) | 3D Diffusion Actor | R+P+PC | pre-training |
| DP-VLA | OpenVLA-7B | L+R | frozen | Vis+Lang | Transformer | R+P | from-scratch |
| HiRT | InstructBLIP-7B | L+R | LoRA fine-tuning | MaxPooling(Vis+Lang) | RT-1 | R | from-scratch |
| Robodual | OpenVLA-7B | L+R | LoRA fine-tuning | Action+Lang | DiT | R+D+T+P | from-scratch |
| DexVLA | Qwen2-VL-2B | L+R | LoRA fine-tuning | Lang | ScaledDP | R+P | from-scratch |
| Helix | N/A | L+R+P | N/A | N/A | Transformer | R+P | N/A |

![[assets/cui-2025-openhelix-a-short-survey-empirical/tab01.png]]
*Table 1: 기존 dual-system VLA 6종의 구성 비교 (Cui 2025, p.2)*

표에서 합의된 항목은 System 2 입력 하나뿐이다. 여섯 모델 모두 언어와 RGB를 받는다. 반면 System 2 모델은 7B급 LLaVA와 OpenVLA, InstructBLIP에서 2B급 Qwen2-VL까지 걸쳐 있고 policy head도 3D Diffusion Actor, Transformer, RT-1, DiT, ScaledDP로 흩어진다. policy 학습에서는 pre-training된 policy를 쓰는 곳이 LCB뿐이고 나머지는 모두 from-scratch다. Helix는 Figure AI의 humanoid 모델인데 논문이 공개되지 않아 여러 항목이 N/A로 남는다.

### 7가지 핵심 설계 요소

이 논문은 dual-system을 설계할 때 결정해야 할 항목을 7가지로 정리한다.

| 번호 | 설계 요소 | 쟁점 |
|---|---|---|
| 1 | MLLM 선택 | Flower의 foundation model은 공간 인지와 low-level vision이 강해 여러 과제에서 SOTA를 냈고, MiniVLA는 추론 비용을 줄이려 Qwen-VL 0.25B를 골랐다. 로봇 데이터로 pre-training된 MLLM이 필요한지는 미해결이다 |
| 2 | policy 선택 | DiT 계열과 flow matching 계열이면 충분하다는 합의가 있다. CARP와 Dense Policy 같은 새 구조, System 1에 어떤 modality가 필수인지가 남은 쟁점이다 |
| 3 | latent representation 선택 | 가장 복잡하고 연구가 가장 필요한 항목이다 |
| 4 | MLLM 학습 방식 | 일반화 능력을 잃지 않으면서 downstream과 잘 통합하는 방법 |
| 5 | policy 학습 방식 | from-scratch와 pre-training된 policy fine-tuning 중 무엇을 쓸지 |
| 6 | 두 시스템의 연결 방식 | latent를 조건으로 어떻게 주입할지, projector를 어떻게 학습시킬지 |
| 7 | 두 시스템의 asynchronous inference 방식 | 상하 추론 주기 차이를 어떻게 다룰지 |

세 번째 항목인 latent representation 선택은 기존 연구가 가장 크게 갈리는 지점이라 별도로 볼 만하다.

- DP-VLA는 MLLM 마지막 층의 hidden 임베딩을 그대로 쓴다.
- GR00T N1은 중간 층 임베딩을 골랐다. 중간 층 feature에 시각 정보가 더 많이 남아 있고 추론 시간도 줄일 수 있다는 판단이다.
- RoboFlamingo와 HiRT는 마지막 층의 언어 feature와 시각 feature를 maxpooling해서 쓴다.
- LCB는 `<ACT>` 토큰이라는 특수 토큰을 도입해 그 토큰만 fine-tuning으로 상하를 잇는다.
- Robodual은 다중 `<ACT>` 토큰에 마지막 층 언어 feature를 함께 쓴다.
- 로보틱스 밖에서는 Metaquery와 LEGO가 hidden state를 더 정교하게 활용한다.

일곱 번째 항목인 두 시스템의 asynchronous inference 방식도 세 가지로 갈린다. asynchronous inference는 상위 모델의 계산과 하위 policy의 실행을 겹쳐 구동해 대기 시간을 감추는 실행 방식을 말한다. LCB는 가장 단순하게 학습에서는 두 시스템의 주기를 맞추고 추론에서만 asynchronous inference를 쓴다. 반면 HiRT는 버퍼를 추가해 학습 단계에서도 두 시스템의 주기를 어긋나게 두고, Robodual은 상위가 낸 거친 action을 하위 추론 결과로 실시간 교체한다.

## 실험 설계

### 통제 조건

7가지 설계 요소를 전부 비교하지는 않는다. 이 논문은 1, 2, 3, 7번을 고정해 일관성을 확보하고 4, 5, 6번에 집중한다. 4, 5, 6번이 나머지 항목의 구체적 선택에 비교적 덜 의존하는 범용 기법이라는 판단에서다.

고정한 조건은 다음과 같다. MLLM은 LCB와 맞추기 위해 LLaVA 1.0을 쓰고, policy는 구조 차이로 생기는 편차를 없애려 3D Diffuser Actor(3DDA)로 통일한다. latent 통합 방식도 LCB를 따르고, asynchronous inference가 관여하는 실험에서는 LCB와 같이 학습에서 주기를 맞추고 추론에서만 주기를 어긋나게 두는 방식을 쓴다.

데이터 처리에서는 LCB와 한 가지가 다르다. LCB는 `<ACT>` 토큰 앞에 대화형 응답을 구성하지만 이 논문은 지시문 뒤에 `<ACT>` 토큰을 바로 이어 붙인다. 저자들은 해당 기능을 아직 구현하지 않았고 없어도 성능이 충분하다고 적는다.

### 평가 환경 3종

평가는 CALVIN ABC→D 설정을 기본으로 한다. 여기에 두 변형을 추가로 만들었다.

| 환경 | 물체 | 지시문 | 목적 |
|---|---|---|---|
| CALVIN | 정적 | 표준 지시문 | 기본 성능 |
| CALVIN-E | 정적 | 같은 뜻을 풀어 쓴 지시문 | 언어 일반화 |
| CALVIN-D | grasping 과제에서 좌측, 전방, 대각, 원형 4패턴으로 이동 | 표준 지시문 | 동적 환경 robustness |

두 변형을 만든 이유는 dual-system이 내세우는 두 가지 장점을 각각 겨냥하기 위해서다. CALVIN-E는 대형 모델의 언어 일반화 능력을, CALVIN-D는 경량 모델의 고주기 특성을 시험한다.

평가 횟수는 실험 성격에 따라 나눈다. ablation은 표준 1,000회 중 첫 100회만 사용해 실험 속도를 확보했고, 최종 결과인 Table 8만 1,000회 전수로 채웠다. 따라서 ablation 수치와 최종 표의 수치를 직접 비교할 때는 평가 규모가 다르다는 점을 감안해야 한다.

## 실증 분석 결과

### 단일 시스템 배제 근거

CALVIN-D 실험이 단일 시스템을 이후 비교에서 제외한 근거다. 표준 ABC 데이터셋으로 학습한 모델을 CALVIN-D에서 100회 시험했다.

| 모델 | Static | Left | Forward | Diagonal | Circle |
|---|---|---|---|---|---|
| RoboFlamingo | 100 | 0 | 0 | 0 | 0 |
| 3DDA | 82 | 84 | 46 | 67 | 80 |

RoboFlamingo는 정적 조건에서 100%를 내지만 네 가지 동적 조건 모두에서 0%다. 원인은 구조에 있다. RoboFlamingo는 추론 시점에 직전 6프레임을 처리해 latent를 얻고 이를 LSTM에 넣어 action을 낸다. 학습 중에는 이 latent가 안정적이지만 물체가 움직이는 환경에서는 변동하므로 학습 조건과 시험 조건이 어긋난다.

반면 3DDA는 동적 조건에서도 46%에서 84% 사이를 유지하지만 정적 조건에서는 82%로 RoboFlamingo보다 18%p 낮다. 즉 MLLM을 시스템의 "뇌"로 쓰는 것 자체는 단순 과제에서 분명한 이점이 있으며, 문제는 그 이점이 동적 환경까지 이어지지 않는다는 데 있다.

저자들은 이 결론이 완전히 엄밀하지는 않다고 인정한다. π0와 GR00T N1을 아직 CALVIN-D에서 시험하지 않았고 후속 작업으로 남겨 두었기 때문이다.

### policy 학습 방식

low-level policy를 pre-training된 3DDA에서 fine-tuning할지 from-scratch로 학습할지를 비교한다. 나머지 구성은 LCB 구조를 그대로 따랐다. LLaVA 1.0 backbone에 `<ACT>` 토큰을 연결하고 CLIP loss로 `<ACT>` 토큰을 downstream 지시문에 맞춘다.

| policy 학습 | 1 | 2 | 3 | 4 | 5 | Avg. Len |
|---|---|---|---|---|---|---|
| pre-training된 3DDA fine-tuning | 96 | 83 | 68 | 58 | 48 | 3.53 |
| from-scratch | 89 | 71 | 49 | 42 | 34 | 2.85 |

차이는 평균 완료 길이 0.68이고 연속 과제 수가 늘어날수록 격차가 커진다. 세 번째 과제에서 68%와 49%로 19%p 벌어진다. 학습 시간도 줄어들기 때문에 이후 실험은 전부 pre-training된 policy를 fine-tuning하는 설정을 쓴다.

### MLLM 학습 방식과 CLIP loss

MLLM을 얼릴지 fine-tuning할지를 CLIP loss 유무와 교차시켜 네 조합을 비교한다. CLIP loss는 대형 모델 출력을 아래층이 받는 텍스트 임베딩 공간에 맞추는 대조 정렬 손실이다.

| MLLM 학습 | CLIP loss | 1 | 2 | 3 | 4 | 5 | Avg. Len |
|---|---|---|---|---|---|---|---|
| frozen | 있음 | 94 | 80 | 64 | 51 | 41 | 3.30 |
| frozen | 없음 | 90 | 74 | 61 | 54 | 40 | 3.33 |
| fine-tuning | 있음 | 96 | 83 | 68 | 58 | 48 | 3.53 |
| fine-tuning | 없음 | 88 | 72 | 56 | 46 | 30 | 3.13 |

MLLM을 얼린 경우 CLIP loss 유무의 차이는 0.03에 그친다. CLIP loss가 하는 일이 바뀌지 않는 MLLM 출력을 downstream 모델의 입력 형식에 맞추는 것이라, 출력이 이미 고정돼 있으면 맞춰 줄 여지가 크지 않기 때문이다.

반면 fine-tuning하는 경우 차이가 0.40으로 커진다. CLIP loss라는 제약이 없으면 이미 학습된 경량 모델이 조건 입력과 다른 perception 입력 사이에 만들어 둔 attention 구조를 흐트러뜨리기 쉽기 때문이다.

여기서 저자들은 CLIP loss가 성능을 확보하는 대신 대형 모델 고유의 일반화 능력을 희생한다고 지적한다. 그래서 대형 모델 파라미터를 얼린 채로도 downstream과 함께 갱신하는 방법을 찾는다. 그 답이 prompt tuning이다. prompt tuning은 모델 파라미터를 전부 얼린 채 어휘에 추가한 토큰의 임베딩만 학습시키는 방식이다. 구체적으로는 대형 모델 어휘에 새 `<ACT>` 토큰을 추가하고 lm-head 층만 학습하며 나머지 파라미터는 전부 고정한다.

![[assets/cui-2025-openhelix-a-short-survey-empirical/fig03.png]]
*Figure 3: MLLM 학습 방식 3종. (a) fine-tuning은 언어 모델을 함께 학습하고, (b) frozen은 마지막 층 토큰의 average pooling을 쓰며, (c) prompt tuning은 학습 가능한 prompt 하나만 갱신한다 (Cui 2025, p.6)*

### prompt tuning의 언어 일반화

prompt tuning의 효과는 표준 CALVIN이 아니라 CALVIN-E에서 드러난다.

| 환경 | MLLM 학습 | CLIP loss | 1 | 2 | 3 | 4 | 5 | Avg. Len |
|---|---|---|---|---|---|---|---|---|
| CALVIN | prompt tuning | 있음 | 94 | 78 | 62 | 52 | 42 | 3.28 |
| CALVIN | prompt tuning | 없음 | 94 | 77 | 67 | 60 | 47 | 3.45 |
| CALVIN-E | prompt tuning | 있음 | 81 | 54 | 41 | 27 | 15 | 2.09 |
| CALVIN-E | prompt tuning | 없음 | 72 | 55 | 40 | 26 | 20 | 2.13 |
| CALVIN-E | fine-tuning | 있음 | 76 | 49 | 30 | 15 | 4 | 1.74 |
| CALVIN-E | frozen | 있음 | 72 | 37 | 21 | 11 | 5 | 1.46 |

표준 CALVIN에서 prompt tuning은 3.28에서 3.45 사이로, fine-tuning의 3.53이나 frozen의 3.30과 크게 다르지 않다. 반면 CALVIN-E에서는 prompt tuning이 2.13으로 fine-tuning보다 0.39, frozen보다 0.67 높다. 다섯 번째 과제까지 이어간 비율을 보면 격차가 더 뚜렷하다. prompt tuning이 20%인 데 비해 fine-tuning은 4%, frozen은 5%에 그친다.

CLIP loss의 역할도 여기서 뒤집힌다. prompt tuning에서는 CLIP loss를 빼는 쪽이 2.09에서 2.13으로 근소하게 낫다. prompt tuning이 애초에 대형 모델의 일반화 능력을 거의 훼손하지 않으므로 추가 제약이 필요 없다는 해석이다.

![[assets/cui-2025-openhelix-a-short-survey-empirical/tab05.png]]
*Table 5: prompt tuning 추가 실험. 표준 CALVIN에서는 방식 간 차이가 작고 CALVIN-E에서 벌어진다 (Cui 2025, p.7)*

### 두 시스템의 연결 방식

상하를 잇는 데는 MLP projector가 필요하다. 새 임베딩을 도입하면 상위 모델과 하위 모델의 차원이 어긋나는 것이 불가피하기 때문이다. 이 projector를 어떻게 학습시킬지에 두 방식이 있다.

- 상위와 하위를 모두 풀어 두고 MLP projector와 함께 한 번에 학습한다.
- 상위 대형 모델을 먼저 얼린 채 MLP projector와 하위 경량 모델을 학습한 뒤 상위를 풀어 함께 학습한다. 이 앞 단계가 projector pre-alignment다.

projector pre-alignment 없이 상하를 바로 연결하면 frozen, fine-tuning, prompt tuning 세 방식 모두 1단계부터 5단계까지 성공률이 전부 0%다. pre-alignment를 거치면 같은 세 방식이 평균 완료 길이 3.28에서 3.53 사이를 낸다.

![[assets/cui-2025-openhelix-a-short-survey-empirical/tab06.png]]
*Table 6: projector pre-alignment 유무. 아래 세 행이 모두 0%다 (Cui 2025, p.7)*

따라서 2단계 학습 절차는 선택 사항이 아니라 전제 조건이다. 예외는 downstream policy를 from-scratch로 학습하는 경우인데, 앞의 policy 학습 비교가 보였듯 from-scratch 자체가 열등한 선택이다.

### asynchronous inference와 latent 진단

MLLM 한 번 추론당 policy가 실행하는 스텝 수를 1에서 60까지 바꿔 가며 성능을 측정했다. 3DDA의 최장 환경 스텝이 60이므로 60은 MLLM이 에피소드당 한 번만 추론하는 가장 극단적인 asynchronous inference 조건이다.

결과는 반직관적이다. 스텝 수와 무관하게 성능 변화가 비슷했고 동적 환경에서도 같은 경향이 나왔다. 이는 현재 MLLM이 환경 변화에 민감하지 않다는 뜻이므로, 상위 layer의 latent vector가 하위로 실제 무엇을 전달하는지 확인할 필요가 생긴다.

확인 방법은 action 토큰의 latent 임베딩을 의미 공간에 투영해 여러 단어와의 유사도를 계산하는 것이다. 실험 장면은 파란 블록이 계속 왼쪽으로 이동하는 동적 시나리오이고, 입력 지시문은 파란 블록을 집어 오른쪽으로 회전시키라는 문장이다.

![[assets/cui-2025-openhelix-a-short-survey-empirical/fig05.png]]
*Figure 5: action 토큰 latent의 의미 공간 투영. 환경 스텝 3에서 파란 블록을 왼쪽으로 옮겼는데도 아래쪽 방향어 확률 분포가 거의 변하지 않는다 (Cui 2025, p.8)*

관찰 결과는 두 가지다.

- 방향어 확률 분포를 보면 로봇 팔이 왼쪽으로 움직이든 오른쪽으로 움직이든 "right"의 확률이 "left"보다 일관되게 높고, 여러 공간 전치사의 확률이 시간이 지나도 거의 변하지 않는다. 즉 action 토큰이 환경 변화와 무관한 고정된 의미 feature를 학습했다. "right"가 높은 이유로는 이 단어가 방향 외에 옳다는 뜻도 담고 있어 의미 정보를 더 많이 나른다는 추정이 제시된다.
- 각 시점에서 latent와 가장 가까운 상위 10개 단어를 보면 지시문의 대상 물체, 공간 관계, 동작 의미와 약간의 noise가 부호화돼 있다. 즉 latent 임베딩은 주로 텍스트 지시문을 요약할 뿐 시각 정보 변화에는 대체로 둔감하다.

따라서 현재 학습 방식은 MLLM의 시각 추론 능력을 제대로 활용하지 못한다. MLLM은 지시문의 의미를 low-level policy에 전달하는 역할에 머물러 있다.

### MLLM 활용 방식

앞의 진단을 받아 MLLM을 쓰는 방법 세 가지를 비교한다. 하위 모델은 fine-tuning, projector는 2단계 학습, 상위는 prompt tuning으로 고정한 상태다.

| MLLM 활용 | 보조 과제 | 1 | 2 | 3 | 4 | 5 | Avg. Len |
|---|---|---|---|---|---|---|---|
| 표준 MLLM (prompt tuning) | 없음 | 94 | 77 | 67 | 60 | 47 | 3.45 |
| 시각 입력 제거, 순수 LLM으로 사용 | 없음 | 77 | 48 | 26 | 16 | 10 | 1.77 |
| 표준 MLLM (prompt tuning) | 있음 | 98 | 92 | 76 | 72 | 63 | 4.01 |

시각 입력을 제거하면 3.45에서 1.77로 1.68 하락한다. 따라서 MLLM이 시각 정보를 전혀 쓰지 않는 것은 아니며 순수 LLM 수준으로 퇴화하지도 않았다. 앞 절의 진단은 시각 정보를 충분히 쓰지 못한다는 뜻으로 읽어야 한다.

보조 과제를 추가하면 3.45에서 4.01로 0.56 오른다. 보조 과제가 모델로 하여금 더 많은 시각 정보를 포착하도록 강제하기 때문이라고 저자들은 설명한다.

## OpenHelix 모델

### 전체 구조

OpenHelix는 앞의 분석 결과를 그대로 반영한다. MLLM을 직접 fine-tuning하는 대신 prompt tuning으로 출력만 조정하고, MLLM의 시각 추론 능력을 끌어내기 위해 보조 과제를 추가한다.

![[assets/cui-2025-openhelix-a-short-survey-empirical/fig06.png]]
*Figure 6: OpenHelix 전체 구조. 얼린 MLLM에서 나온 latent가 diffusion policy로 넘어간다 (Cui 2025, p.9)*

high-level은 LLaVA-7B이고 모든 파라미터가 얼려 있다. 입력은 3인칭 RGB 이미지와 과제 지시문이다. 지시문 끝에 학습 가능한 `<ACT>` 토큰을 붙여 새 지시문 `l' = {l, <ACT>}`를 만들고, LLM 마지막 층에서 `<ACT>` 위치의 feature 임베딩을 뽑아 low-level의 latent goal로 넘긴다.

low-level은 3D Diffuser Actor다. vision 인코더와 Transformer 기반 diffusion 모델로 구성되며, 여러 cross-attention 층을 통해 3D scene 표현과 proprioception 토큰, 상위에서 온 조건 토큰을 조건으로 받는다. 3D Diffuser Actor 원래 구조의 텍스트 인코더는 선형 층 하나로 대체된다. 이 선형 층이 대형 모델 출력의 4096차원을 low-level policy 입력의 512차원으로 줄인다.

입출력 형식은 다음과 같다.

| 항목 | 구성 |
|---|---|
| 지시문 `l` | 길이 N의 과제별 자연어 문장 |
| observation `o_t` | 서로 다른 시점의 RGB-D 이미지 2장 |
| action `a_t` | end-effector pose. 3D 위치 `a^l ∈ R^3`, rotation `a^r ∈ R^6`, 그리퍼 개폐 `a^g ∈ {0,1}` |
| 예측 범위 | temporal horizon T에 걸친 trajectory와 그리퍼 상태 |

diffusion 과정은 noisy trajectory와 diffusion 스텝, observation, latent 임베딩, proprioception을 받아 position noise와 rotation noise를 반복 예측하는 방식이다. 학습 목적은 정답 trajectory에 noise를 더한 뒤 그 noise를 되맞히는 denoising 목표다.

![[assets/cui-2025-openhelix-a-short-survey-empirical/fig07.png]]
*Figure 7: 세부 구조. (a) high-level MLLM은 `<ACT>` 토큰 위치의 임베딩을 뽑고 보조 과제 head로 위치와 rotation, 개폐를 예측한다. (b) low-level policy는 그 임베딩을 3D scene 토큰과 proprioception 토큰에 결합해 noise를 예측한다 (Cui 2025, p.10)*

### 보조 과제

multimodal reasoning learning은 latent에서 position, rotation, 그리퍼 개폐를 직접 예측하게 해 대형 모델이 시각 입력을 실제로 쓰도록 강제하는 보조 과제다. 기존 방식이 CLIP의 텍스트 인코더 출력에 MLLM 출력을 맞추는 순수 텍스트 지도라 multimodal 추론 능력을 퇴화시킬 수 있다는 문제 인식에서 나왔다.

구현은 단순하다. `<ACT>` 토큰 위치의 출력 임베딩을 선형 층에 통과시켜 trajectory와 그리퍼 action을 예측한다. 손실은 두 부분으로 나뉜다. 3D 위치와 3D rotation 시퀀스를 복원하는 데는 L1 손실을, end-effector 개폐를 지도하는 데는 binary cross-entropy를 쓴다. 두 항의 비중은 하이퍼파라미터로 조절한다.

이 과제의 장점은 추가 데이터 준비 과정이 필요 없다는 것이다. 학습에 이미 있는 action 라벨을 그대로 쓰면서 latent 임베딩에 시각 정보와 텍스트 정보가 함께 담기도록 만든다.

### 학습 절차

학습은 2단계로 나뉜다. 두 단계의 차이는 low-level policy를 얼리는지 여부뿐이고 목적함수는 동일하다.

| 단계 | MLLM | low-level policy | prompt과 projection | iteration |
|---|---|---|---|---|
| 1단계 (pre-alignment) | frozen | frozen | 학습 | 2,000 |
| 2단계 | frozen | 학습 | 학습 | 100,000까지 |

1단계의 목적은 MLLM이 만든 임베딩을 pre-training된 policy의 feature 공간에 미리 맞추는 것이다. 2단계에서 low-level policy를 풀고 prompt, projection과 함께 fine-tuning한다. MLLM은 두 단계 내내 얼려 있다.

구현 세부로는 3D Diffuser Actor의 65,000 iteration 체크포인트를 pre-training 파라미터로 쓰고, LLaVA의 토크나이저에 `<ACT>` 토큰을 수동으로 추가한 뒤 새로 추가한 토큰 임베딩만 학습시킨다. 전체 손실은 대형 모델 쪽 손실과 policy 쪽 손실의 합이며, 나머지 학습 설정은 3D Diffuser Actor를 따른다.

## 최종 결과

CALVIN ABC-D 1,000회 전수 평가 결과는 다음과 같다. 표기에서 MLLM (PT)는 prompt tuning, Policy(P)는 pre-training된 policy 사용, AUX는 보조 과제, Asy(N)은 N스텝 지연 추론을 뜻한다.

| 환경 | 구성 | 1 | 2 | 3 | 4 | 5 | Avg. Len |
|---|---|---|---|---|---|---|---|
| CALVIN | Only Policy | 92.2 | 78.7 | 63.9 | 51.2 | 41.2 | 3.27 |
| CALVIN | MLLM(PT) + Policy(P) | 92.2 | 79.2 | 65.0 | 52.9 | 40.9 | 3.30 |
| CALVIN | + AUX + Asy(10) | 93.3 | 81.8 | 67.9 | 56.6 | 46.0 | **3.45** |
| CALVIN | + AUX + Asy(60) | 92.8 | 79.7 | 67.5 | 57.3 | 46.9 | 3.44 |
| CALVIN-E | Only Policy | 65.2 | 39.1 | 20.3 | 11.7 | 6.1 | 1.42 |
| CALVIN-E | MLLM(PT) + Policy(P) | 71.3 | 44.9 | 28.4 | 17.5 | 10.3 | 1.72 |
| CALVIN-E | + AUX + Asy(10) | 78.9 | 57.1 | 40.2 | 29.5 | 20.2 | **2.26** |
| CALVIN-E | + AUX + Asy(60) | 78.1 | 56.5 | 38.9 | 27.0 | 19.5 | 2.20 |

![[assets/cui-2025-openhelix-a-short-survey-empirical/tab08.png]]
*Table 8: CALVIN ABC-D 최종 결과 (Cui 2025, p.11)*

저자들이 이 표에서 끌어낸 결론은 세 가지다.

첫째로 상하 통합의 핵심 가치는 언어 일반화에 있다. 표준 CALVIN에서 policy 단독 3.27과 완성형 3.45의 차이는 0.18에 그친다. 반면 CALVIN-E에서는 1.42에서 2.26으로 0.84 올라 59% 증가한다. 즉 위층을 결합해 얻는 것은 표준 과제의 정확도가 아니라 풀어 쓴 지시문을 이해하는 능력이다.

둘째로 보조 과제는 표준 과제와 일반화 과제 양쪽 성능을 함께 높인다. CALVIN-E에서 보조 과제 없이 1.72이던 것이 보조 과제를 추가하면 2.26이 된다. 100회 기준 ablation에서 3.45가 4.01로 오른 것과 방향이 같다.

셋째로 asynchronous inference는 성능에 거의 영향이 없다. Asy(10)과 Asy(60)이 표준 CALVIN에서 3.45와 3.44, CALVIN-E에서 2.26과 2.20이다. 에피소드당 MLLM을 한 번만 추론해도 성능이 유지되므로 실제 배포에는 유리하다. 다만 이 결과는 위층이 환경 변화를 제대로 반영하지 못한다는 앞선 진단을 다른 각도에서 말한 것이기도 하다.

앞서 다룬 ablation의 수치를 한 표에 모으면 다음과 같다. 모두 100회 평가 기준이다.

| 비교 항목 | 조건 A | 조건 B | 결론 |
|---|---|---|---|
| policy 학습 (Table 3) | fine-tuning 3.53 | from-scratch 2.85 | pre-training된 policy를 쓴다 |
| MLLM 학습 (Table 4) | fine-tuning + CLIP loss 3.53 | fine-tuning, CLIP loss 없음 3.13 | fine-tuning할 때는 CLIP loss가 필요하다 |
| 언어 일반화 (Table 5, CALVIN-E) | prompt tuning 2.13 | fine-tuning 1.74, frozen 1.46 | prompt tuning이 앞선다 |
| projector 연결 (Table 6) | pre-alignment 시 3.28~3.53 | 생략 시 전부 0% | 2단계 학습이 전제 조건이다 |
| MLLM 활용 (Table 7) | MLLM + 보조 과제 4.01 | 시각 입력 제거 1.77 | 시각 입력이 실제로 기여한다 |

> 프로젝트 저장소 [[physical-ai/openhelix-robot-awesome-dual-system-vla]]의 리더보드는 OpenHelix를 4.08로 적는다. 논문 공개 이후 갱신된 수치이므로 논문을 인용할 때는 3.45를 쓴다.

## 한계

저자들은 Figure의 Helix를 오픈소스로 완전히 재현하기까지 갈 길이 멀다고 밝히며 미완 항목 다섯 가지를 나열한다.

- 실제 로봇에 배포하기
- 충분히 빠른 downstream policy 실행 달성하기
- 물리 로봇에서 구동하기
- humanoid 로봇에 배포하기
- humanoid 로봇 간 협업 구현하기

실험 범위도 시뮬레이터 안에 머문다. real-world 실험은 나중에 보완하겠다고 미뤄 두었다.

단일 시스템을 배제한 논거는 RoboFlamingo 한 모델의 CALVIN-D 결과에 기대고 있다. 저자들도 π0와 GR00T N1을 같은 조건에서 시험해야 결론이 엄밀해진다고 본문에 적는다.

7가지 설계 요소 중 실제로 비교한 것은 4, 5, 6번뿐이다. MLLM 선택, policy 선택, latent representation 선택, asynchronous inference 방식은 고정 조건으로 두었을 뿐 통제 비교하지 않았다. asynchronous inference에서 검증한 것도 첫 번째 방식인 LCB식 구성 하나이며, HiRT의 버퍼 기반 방식과 Robodual의 실시간 action 교체는 후속 과제로 남았다.

가장 큰 미해결은 저자들이 스스로 진단한 문제다. latent가 텍스트 지시문의 요약에 그친다는 발견에 보조 과제로 대응했지만 그것이 근본 해법인지는 열려 있다. 대형 모델의 시각 추론 능력을 low-level policy까지 온전히 전달하는 방법은 여전히 미정이다. 저자들 스스로 이 문서를 "initial version"이라 부르며 일부 주장이 아직 충분히 검증되지 않았음을 인정한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| dual-system VLA | System 2 역할의 대형 모델과 System 1 역할의 경량 policy를 서로 다른 주기로 함께 구동하는 VLA 구조. 이 논문은 System 1이 실시간 perception 입력을 직접 받는 것을 판정 기준으로 세운다 |
| prompt tuning | 모델 파라미터를 전부 얼린 채 어휘에 추가한 토큰의 임베딩만 학습시키는 방식. 이 논문이 두 시스템 연결에 쓰는 핵심 기법이다 |
| `<ACT>` 토큰 | 지시문 끝에 붙는 학습 가능한 특수 토큰. 마지막 층에서 뽑은 이 위치의 임베딩이 low-level로 넘어가는 latent goal이 된다 |
| CLIP loss | MLLM 출력을 downstream 입력 형식에 맞추려고 텍스트 인코더 출력과 정렬시키는 보조 손실. fine-tuning에서는 필요하지만 prompt tuning에서는 없는 쪽이 낫다 |
| projector pre-alignment | 상하를 잇는 MLP projector를 먼저 따로 학습시키는 1단계. 생략하면 성공률이 0%로 떨어진다 |
| multimodal reasoning learning | latent에서 position, rotation, 그리퍼 개폐를 직접 예측하게 해 대형 모델이 시각 입력을 실제로 쓰도록 강제하는 보조 과제 |

## 관련 페이지

- [[physical-ai/openhelix-robot-awesome-dual-system-vla]]: 같은 팀이 이 논문의 서베이 절을 옮겨 계속 갱신하는 목록. 논문의 판정 기준이 그대로 적용된다
- [[physical-ai/figure-ai-2025-helix-a-vision-language-action]]: 이 프로젝트가 오픈소스로 재현하려는 원본. Table 1에서 Helix 행이 대부분 N/A인 이유는 논문 공개가 없어서다
- [[physical-ai/9bow-2025-helix-generalist-humanoid-vla]]: 같은 Helix의 한국어 해설. 이 논문의 기준에 맞춰 GR00T N1을 dual-system에서 제외한다
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]: 이 논문의 기준으로는 dual-system이 아니다. System 1이 실시간 perception 입력을 직접 받지 않기 때문이다
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: 같은 이유로 제외되지만 중간 층 임베딩을 latent로 고른 사례이자 frozen 학습으로 좋은 결과를 낸 사례라 MLLM 학습 실험의 동기가 됐다
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]]: DP-VLA와 Robodual이 System 2로 쓰는 모델
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]]: VLA 개념의 출발점이자 55B에서 1~3Hz라는 속도 한계로 dual-system의 동기를 제공한 모델
- [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]]: HiRT가 System 1으로 쓰는 policy head
- [[physical-ai/learnopencv-2025-vision-language-action-models-vla]]: dual-system을 훨씬 느슨하게 쓰는 사례. GR00T N1과 Helix를 나란히 이 구조의 대표로 놓는데 이 논문의 기준으로는 GR00T N1이 빠진다. 용어가 어떻게 헐거워지는지 보여주는 대조군
- [[physical-ai/xu-2025-an-anatomy-of-vision-language-action-models]]: VLA 전반을 perception, brain, action 세 모듈로 해부하고 도전 과제 분석에 무게를 둔 서베이. 이 논문이 dual-system 한 구조만 깊게 파는 것과 범위가 다르다
- [[physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics]]: 로봇 플랫폼과 데이터 수집, 벤치마크까지 함께 훑는 full-stack 서베이. action head 분류에서 이 논문의 policy 선택 논의와 겹친다
- [[physical-ai/sa-2026-vision-language-action-models-for]]: 양팔 조작이라는 렌즈로 VLA 전체를 읽는 서베이. 두 팔의 결합도를 조직 기준으로 삼아 실전 배치 격차를 다룬다
- [[physical-ai/zhang-2026-a-survey-of-physical-ai]]: LLM의 world knowledge에서 출발해 Physical AI 전체를 여섯 단계 배치도로 그리는 서베이. 개별 구조의 세부보다 분야 지도를 제공한다
- [[overviews/glossary-physical-ai]]: dual-system VLA, CLIP loss, projector pre-alignment, multimodal reasoning learning 표기의 근거 자료
