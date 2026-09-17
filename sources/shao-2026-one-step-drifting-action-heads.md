---
title: "Technical Report: One-Step Drifting Action Heads for GR00T N1.7"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/shao-2026-one-step-drifting-action-heads.pdf
raw_filename: "shao-2026-one-step-drifting-action-heads.pdf"
source_collection: external
authors: "Xihe Shao (Zhejiang University ZJU-UIUC Institute, LimX Dynamics 인턴)"
arxiv_id: "2609.18108"
tags: [physical-ai, vla, manipulation, edge-inference]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/shao-2026-one-step-drifting-action-heads/fig01.png
    raw: raw/papers/shao-2026-one-step-drifting-action-heads-figures/fig01.png
    caption: "속도와 성공률의 교환 관계 요약. (a)는 Spatial, Goal, Long 세 suite의 평균 model-forward 시간을 VLM backbone과 action head로 나눠 쌓은 막대로, GR00T N1.7의 70.0 ms가 DrifOv에서 30.6 ms로 줄고 그 감소분이 거의 전부 action head(45.3 ms에서 5.0 ms)에서 나온다. (b)는 같은 세 suite의 성공률로 DrifOv가 모든 suite에서 낮고 Long에서 격차가 가장 크다"
    page: 6
    bbox_norm: [0.1038, 0.0562, 0.8962, 0.3065]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/shao-2026-one-step-drifting-action-heads/fig02.png
    raw: raw/papers/shao-2026-one-step-drifting-action-heads-figures/fig02.png
    caption: "초기 checkpoint로 측정한 legacy LIBERO-Long 프로파일. drifting 계열 두 구성이 29.3 ms에 성공률 48.0%와 46.0%를, GR00T N1.7이 69.9 ms에 36.0%를 기록했다. 학습 조건이 달라 본 비교에서 제외되며 개발 이력 기록으로만 남는다"
    page: 6
    bbox_norm: [0.0702, 0.3554, 0.5, 0.5567]
    strategy: caption-region
    curated: false
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/shao-2026-one-step-drifting-action-heads/fig03.png
    raw: raw/papers/shao-2026-one-step-drifting-action-heads-figures/fig03.png
    caption: "같은 서버에서 두 학습 작업을 실행하며 기록한 GPU 메모리 텔레메트리. (a) drifting 실행의 선택 peak는 17.752 GiB, (b) GR00T N1.7 실행은 45.748 GiB, (c)는 두 구간을 이어 붙인 전체 추이다. 다른 작업과 유휴 구간이 섞여 있어 통제된 측정이 아니다"
    page: 7
    bbox_norm: [0.0702, 0.0562, 0.9298, 0.2142]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/shao-2026-one-step-drifting-action-heads/fig04.png
    raw: raw/papers/shao-2026-one-step-drifting-action-heads-figures/fig04.png
    caption: "데이터 수집에 사용한 실제 로봇 과제 1의 변형들. 장난감과 필기구를 지정한 바구니에 담는 설정이다"
    page: 7
    bbox_norm: [0.0702, 0.2546, 0.5, 0.3436]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/shao-2026-one-step-drifting-action-heads/fig05.png
    raw: raw/papers/shao-2026-one-step-drifting-action-heads-figures/fig05.png
    caption: "산업용 부자재 포장 과제의 주석 작업 진행 화면. 전체 2,562개 rollout trajectory 중 2,492개가 처리된 상태를 보여준다"
    page: 7
    bbox_norm: [0.1276, 0.3835, 0.4426, 0.7585]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/shao-2026-one-step-drifting-action-heads/fig06.png
    raw: raw/papers/shao-2026-one-step-drifting-action-heads-figures/fig06.png
    caption: "실제 로봇 배치 중 수집한 천 접기 데이터셋 개요. 성공 시연 데이터와 실패 시도, 사람이 개입해 이어받은 구간을 함께 담았다"
    page: 7
    bbox_norm: [0.5, 0.2546, 0.9298, 0.4918]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table I
    kind: table
    file: assets/shao-2026-one-step-drifting-action-heads/tab01.png
    raw: raw/papers/shao-2026-one-step-drifting-action-heads-figures/tab01.png
    caption: "보고된 실험의 설정. 학습은 NVIDIA A800 2장, 배치는 GPU당 32(실효 64), 2만 step, bfloat16이며 action chunk 길이는 40, LIBERO는 subtask당 10 episode로 suite당 100 rollout, drifting seed는 1과 42와 1000이다"
    page: 4
    bbox_norm: [0.0582, 0.0824, 0.5098, 0.2556]
    strategy: manual
    curated: true
  - id: tab02
    label: Table II
    kind: table
    file: assets/shao-2026-one-step-drifting-action-heads/tab02.png
    raw: raw/papers/shao-2026-one-step-drifting-action-heads-figures/tab02.png
    caption: "LIBERO에서 측정한 model-forward 지연 시간. 네 suite 모두에서 action head가 약 45 ms에서 약 5 ms로 9배 빨라지고 backbone은 25 ms 안팎으로 거의 변하지 않는다. 전처리와 후처리, 제어 오버헤드는 측정에서 제외했다"
    page: 5
    bbox_norm: [0.166, 0.1046, 0.834, 0.2465]
    strategy: table-region
    curated: true
  - id: tab03
    label: Table III
    kind: table
    file: assets/shao-2026-one-step-drifting-action-heads/tab03.png
    raw: raw/papers/shao-2026-one-step-drifting-action-heads-figures/tab03.png
    caption: "LIBERO 성공률. drifting은 seed 1, 42, 1000의 3회, GR00T는 seed 1과 42의 대응 실행에 Spatial과 Goal과 Long 한정으로 구형 seed 1000 checkpoint를 더해 집계했다. Object suite는 drifting 성공률이 없어 평균을 내지 않고 N/A로 둔다"
    page: 5
    bbox_norm: [0.2152, 0.2974, 0.7848, 0.4596]
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

GR00T N1.7의 iterative DiT action head를 한 번의 평가로 action chunk 전체를 내는 one-step drifting head로 바꾸면 action head 시간이 45.3 ms에서 5.0 ms로 줄지만, LIBERO 성공률이 seed 3회 모두에서 일관되게 떨어진다는 사실을 보고한 technical report다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | Technical Report: One-Step Drifting Action Heads for GR00T N1.7 |
| 저자 | Xihe Shao (Zhejiang University ZJU-UIUC Institute, LimX Dynamics 인턴) |
| arXiv | 2609.18108v1 (cs.RO, 2026-09-16) |
| 분량 | 본문 6쪽, 부록 2쪽, figure 6개, table 3개 |
| 성격 | 예비 technical report. 저자가 직접 state-of-the-art 주장이 아니라고 명시했다 |

저자는 단독 1인이며 소속은 Zhejiang University ZJU-UIUC Institute와 LimX Dynamics 인턴 두 곳이다. 보고서 전체가 긍정 결과와 부정 결과를 함께 적는 형식으로 쓰였고, 저자 스스로 "속도와 성공률의 교환 관계이지 전반적 개선이 아니다"라고 결론을 제한한다.

## 2. 주요 기여 (Key Contributions)

보고서가 스스로 열거하는 기여는 다섯 가지다.

- GR00T N1.7용 one-step drifting action head를 구현하고 상속한 학습 목적함수, 모델 차원, 한 번의 평가로 끝나는 추론 경로를 기술했다.
- 이미 컨트롤러에 전달된 action prefix와 그 좌표별 유효성, overlap 길이, 추정 실행 offset을 표현하면서 유효한 prefix 좌표를 그대로 보존하는 overlap 조건부 확장을 구현했다.
- 모든 drifting seed 실행이 동일한 A800 2장 설정을 쓰는 다중 seed LIBERO 연구를 제공했다. 지연 시간과 성공률을 분리해 보고하며 측정이 빠진 suite를 평균에 넣지 않았다.
- 측정된 속도와 성공률의 교환 관계에 대한 가설 여러 개를 제시하고 각 가설을 분리하는 데 필요한 실험을 명시했다. 현재 증거는 drifting 목적함수 자체가 성능 저하 전부의 원인이라는 점을 확립하지 못한다.
- 예비 실제 로봇 배치와 데이터 수집 경험을 기록했다. 통제된 policy 비교가 아니라 엔지니어링 관찰로 제시한다.

핵심 구도는 긍정과 부정의 병기다. 긍정은 크고 안정적인 action head 가속이고, 부정은 그 가속이 현재 학습 프로토콜에서 성공률을 보존하지 못한다는 점이다. seed 3회의 표준편차가 작아서 이 격차는 한 번의 불운한 초기화로 설명되지 않는다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 범위와 아키텍처

구현은 GR00T N1.7의 전처리 스택과 Cosmos-Reason2/Qwen3 vision-language backbone을 그대로 유지한다. hidden feature는 layer 16에서 읽어 action head 차원으로 투영하고, 로봇 상태는 embodiment별 MLP로, action은 embodiment별 action encoder로 인코딩한다.

action head는 12블록 Transformer다. 모델 차원 1024, attention head 16개, feed-forward 차원 4096, dropout 0.1이다. 각 블록은 action 토큰과 상태 토큰에 대한 self-attention, vision-language 메모리에 대한 cross-attention, feed-forward 네트워크로 구성된다. cross-attention은 블록을 지나며 이미지 토큰과 텍스트 토큰을 번갈아 참조한다.

기본 action chunk 길이는 H = 40이다. 상태와 action의 최대 차원은 모두 132이고 상태 이력 길이는 1이다. 배치 시점에 head는 zero action seed를 받아 한 번의 action transformer 평가로 chunk 전체를 낸다. 추론 step 수는 1로 고정된다.

### 3.2 상속한 drifting 목적함수

기반 action head는 Implicit Drifting Policy(IDP)의 목적함수를 그대로 쓴다. 보고서는 새 생성 목적함수를 주장하지 않는다고 명시한다.

observation과 action 쌍 (o_i, a*_i)에 대해 M_i를 detach된 대각 geometry 행렬이라 할 때 potential은 다음과 같다.

```
E_i(a) = 0.5 (a - a*_i)^T (I + M_i) (a - a*_i)
```

대응하는 보정항은 `-∇_a E_i(a) = (I + M_i)(a*_i - a)`다. 학습은 네트워크를 두 지점에서 평가한다. proposal prediction은 시각 0의 zero action seed에서 출발한다.

```
y_i = f_θ(o_i, 0, 0)
```

proximal prediction은 expert action 근처에서 출발한다.

```
ã_i = a*_i + (1 - t*) ε_i,  ε_i ~ N(0, I)
z_i = f_θ(o_i, ã_i, t*)
```

보고된 구성에서 t* = 0.9다. 최종 목적함수는 `L_IDP = E_i(y_i) + λ_prox E_i(z_i)`이고 λ_prox = 81.0이다.

### 3.3 geometry 가중

minibatch 안에서 정규화한 observation feature를 내적으로 비교한다. 유사도를 행 단위로 표준화한 뒤 softmax로 이웃 가중치 w_ij를 만든다. action 좌표 d의 조건부 분산은 `v_cond_i,d = Σ_j w_ij (a*_j,d - a*_i,d)^2`로 추정하고, 참조 분산 v_ref_d는 같은 minibatch에서 계산한다. 정규화된 역분산을 비교해 대각 geometry 초과분을 만든다.

```
m_i,d = ReLU( s_cond_i,d / (s_ref_d + ε) - 1 ),  M_i = Diag(m_i)
```

geometry 행렬은 detach되어 학습 potential의 가중에만 쓰인다.

실험 해석에 걸리는 구현 세부가 두 가지다. 첫째, 참조 분산을 현재 minibatch 안에서 추정하므로 추정 품질이 배치 크기와 배치 구성에 의존한다. 둘째, 현재 구현은 이웃 집합에 질의 표본 자신을 포함하는데 IDP 수식은 j = i를 제외한다. 보고서는 두 선택 모두를 검증된 설계가 아니라 한계로 취급한다.

### 3.4 overlap 조건부 suffix 생성

DrifOv는 one-step head에 명시적 action prefix를 더한 확장이다. h가 action chunk 위치, j가 action 좌표, L이 확정된 prefix 행 수, ν가 유효 action 마스크일 때 마스크는 `m_h,j = I[h < L] ν_h,j`다. prefix 행 p_0:L-1은 prefix 유효성 마스크, overlap 길이 L, 실행 offset과 함께 head에 전달된다.

출력 위치 h의 action query는 다섯 요소로 만든다.

1. 인코딩된 마스킹 prefix
2. 학습된 prefix 마스크 임베딩
3. overlap 길이 임베딩
4. 실행 offset 임베딩
5. 위치 임베딩

디코더는 H개 action query를 한꺼번에 처리하면서 vision-language 토큰과 상태 조건 토큰에 cross-attention한다. 유효한 prefix 좌표는 디코딩 후 공급된 prefix 값으로 대체된다.

```
Â_h,j = m_h,j p_h,j + (1 - m_h,j) Ã_θ,h,j
```

따라서 확정된 action은 학습된 head가 다시 쓸 수 없다. prefix는 self-attention을 통해 suffix에 영향을 주며, 모델은 미지의 suffix만 생성하도록 학습된다.

### 3.5 overlap 인지 학습

학습 action chunk마다 overlap 길이를 0부터 H - 1 사이에서 샘플링한다. 보고된 구성은 확률 0.2로 overlap이 0인 예제도 함께 샘플링한다. 비어 있지 않은 prefix는 expert action chunk에서 복사한다. 구현은 확률 0.5로 prefix에 표준편차 0.02의 가우시안 잡음을 더하고 교란을 [-0.05, 0.05]로 클리핑한다. 실행 offset은 0과 선택된 overlap 길이 사이에서 샘플링한다. prefix 조건부 입력은 비활성화해 무조건부 baseline으로 쓸 수도 있다.

생성 손실은 상속한 potential을 suffix 좌표에서만 평가한다. 모델이 책임지는 좌표를 `ω_h,j = ν_h,j (1 - m_h,j)`로 고르면 suffix 손실은 다음과 같다.

```
L_gen = Σ_h,j ω_h,j E_i(Â_h,j) / Σ_h,j ω_h,j
```

같은 목적함수를 proximal prediction에도 적용하되, 손실 평가 전에 prefix 좌표를 공급된 prefix로 대체한다.

구현은 첫 생성 suffix action에 경계 항을 선택적으로 더한다. 보고된 구성의 가중치는 경계 action 오차 1.0, 유한차분 속도 오차 0.1이며 가속도 가중치는 0이다. 이 항들은 고정된 prefix와 생성된 suffix 사이의 연속성을 유도하기 위한 보조 정칙화이지 새 생성 모델을 만드는 장치가 아니다.

### 3.6 one-step 추론

동기식 LIBERO 평가에서는 action prefix를 공급하지 않는다. 따라서 추론 경로는 빈 prefix와 빈 마스크, overlap 길이 0을 쓴다. action seed는 0, 시간 입력도 0이며 모델은 한 번의 action head 평가로 완전한 chunk 하나를 낸다.

```
Â = f_θ(o, s, 0, 0)
```

이것이 4절 LIBERO 실험에서 측정한 경로다. 무조건부 one-step head를 검증하며 asynchronous overlap 조건부 경로는 검증하지 않는다.

asynchronous 배치에서는 런타임이 남은 정규화 action 행, 패딩 전 실제 길이, 추정 추론 지연을 공급할 수 있다. 확정된 행은 그대로 반환하고 미지의 suffix만 생성한다. 추정 지연이 가용 prefix를 넘어서면 만료된 prefix를 조건으로 suffix를 실행하는 대신 요청을 거부한다.

### 3.7 구현하지 않은 설계

초기 설계 노트는 인과적 history memory 분기와, 추론이 진행되는 동안 실행된 action으로 latent 상태를 갱신하는 delay propagator를 제안했다. 그 형식은 이 보고서에서 구현되지도 평가되지도 않았다. 구현된 방법은 확정된 action prefix와 전역 overlap 메타데이터만 조건으로 쓴다. 따라서 아래 실험은 history latent 모델의 이점을 입증하지 않는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 실험 프로토콜

LIBERO 실험은 LIBERO 벤치마크와 `lerobot/libero` 데이터셋, LeRobot 학습 및 평가 스택을 쓴다. 모든 다중 seed drifting checkpoint는 NVIDIA A800 2장에서 학습했다.

| 항목 | 설정 |
|---|---|
| 학습 하드웨어 | NVIDIA A800 2장 |
| 배치 하드웨어 | RTX 4090 + Intel 14900KF |
| 데이터셋 | `lerobot/libero` |
| 학습 step | 2만 |
| 배치 크기 | GPU당 32, 실효 64 |
| 정밀도 | bfloat16 |
| action chunk | H = 40 |
| LIBERO episode | subtask당 10회, suite당 100회 |
| drifting seed | 1, 42, 1000 |

문서화된 seed 1000 실행은 GPU당 배치 32, 2만 step, bfloat16을 쓴다. 같은 이름의 레시피를 seed 1, seed 42, seed 1000 drifting 실행에 동일하게 적용했다. GR00T와의 주 비교는 보관된 seed 비교 디렉토리의 seed 1과 seed 42 실행을 쓴다. seed 1000 GR00T checkpoint는 더 오래된 보관 평가에서 왔고 참고 지점으로만 보고한다.

지연 시간은 backbone과 action head 주변의 타이밍 훅으로 기록한다. 각 훅은 측정 구간 전후에 CUDA 동기화를 수행한다. 보고값은 suite 내 모든 추론 호출의 평균이며 전처리, 후처리, 네트워킹, action 전송, 저수준 제어를 제외하므로 종단 간 배치 지연 시간이 아니다.

### 4.2 LIBERO 지연 시간

| Task | Model | Seeds | Backbone (ms) | Action head (ms) | Total (ms) | Head 가속 |
|---|---|---|---|---|---|---|
| Spatial | GR00T N1.7 | 3 | 24.99 ± 0.28 | 45.36 ± 0.17 | 70.35 ± 0.19 | 1.0배 |
| Spatial | DrifOv | 3 | 24.42 ± 0.11 | 4.96 ± 0.08 | 29.38 ± 0.05 | 9.1배 |
| Goal | GR00T N1.7 | 3 | 25.03 ± 0.45 | 45.43 ± 0.19 | 70.46 ± 0.50 | 1.0배 |
| Goal | DrifOv | 3 | 26.47 ± 3.69 | 5.07 ± 0.30 | 31.54 ± 3.97 | 9.0배 |
| Long | GR00T N1.7 | 2 | 24.14 ± 0.43 | 45.18 ± 0.07 | 69.33 ± 0.36 | 1.0배 |
| Long | DrifOv | 3 | 25.92 ± 3.46 | 5.04 ± 0.27 | 30.95 ± 3.72 | 9.0배 |
| Object | GR00T N1.7 | 3 | 26.21 ± 1.42 | 45.80 ± 0.12 | 72.01 ± 1.51 | 1.0배 |
| Object | DrifOv | 3 | 24.30 ± 0.14 | 4.94 ± 0.04 | 29.25 ± 0.16 | 9.3배 |

action head는 네 suite 모두에서 약 9배 빨라지고 측정된 model-forward 전체 경로는 약 2.2배에서 2.4배 빨라진다. VLM backbone은 거의 변하지 않아, action head 교체가 추론 파이프라인의 한 구성 요소만 다룬다는 점을 확인해 준다.

### 4.3 LIBERO 성공률

| Task | Model | Seeds | 성공률 (%) | seed별 성공률 (%) | Coverage |
|---|---|---|---|---|---|
| Spatial | GR00T N1.7 | 3 | 82.3 ± 6.8 | 77, 90, 80 | 3/3 |
| Spatial | DrifOv | 3 | 64.0 ± 4.0 | 60, 64, 68 | 3/3 |
| Goal | GR00T N1.7 | 3 | 82.3 ± 4.0 | 80, 87, 80 | 3/3 |
| Goal | DrifOv | 3 | 52.0 ± 1.0 | 52, 51, 53 | 3/3 |
| Long | GR00T N1.7 | 2 | 74.5 ± 10.6 | 67, 82 | 2/2 |
| Long | DrifOv | 3 | 26.0 ± 2.6 | 28, 27, 23 | 3/3 |
| Object | GR00T N1.7 | 1 | 88.0 | 88 | 1/3 |
| Object | DrifOv | 0 | N/A | N/A | 0/3 |

새 drifting seed 실행은 GR00T 기준선 대비 크고 일관된 격차를 보인다. seed 3회의 표준편차가 작다는 점이 중요하다. 실패한 초기화 한 번으로 설명되는 격차가 아니다.

세 drifting seed는 suite 안에서 비슷한 성공률을 낸다. Spatial은 60%, 64%, 68%, Goal은 52%, 51%, 53%, Long은 28%, 27%, 23%다. 거의 일정한 지연 시간과 달리 성공률 손실은 과제 horizon이 길어질수록 커진다. 성능 저하가 가장 큰 곳은 LIBERO-Long이며, 여기서 policy는 더 긴 action chunk 연쇄에 걸쳐 진행을 유지해야 한다.

### 4.4 legacy 프로파일과 메모리 관찰

초기 단일 실행 연구는 다른 checkpoint와 학습 방식을 썼다. 그 측정은 주 비교에 포함되지 않으며 Figure 2가 개발 이력을 기록하는 용도로만 재현한다. legacy 성공률을 다중 seed 결과와 직접 비교해서는 안 된다.

Figure 3은 같은 서버에서 GR00T와 drifting 학습 작업을 실행하며 기록한 GPU 메모리 텔레메트리다. 선택된 peak는 GR00T 실행이 45.748 GiB, drifting 실행이 17.752 GiB다. 이 관찰은 통제된 메모리 벤치마크가 아니라 일화적 기록이다. 따라서 저자는 차이를 action head 하나로 귀속시키지 않고, 자원이 제한된 학습 환경에서의 잠재적 실용 이점으로만 남긴다.

### 4.5 예비 실제 로봇 배치

policy 스택은 RTX 4090과 Intel 14900KF 워크스테이션을 갖춘 LimX Tron2 로봇에 배치했다. manipulation 설정 세 가지에 대해 데이터를 수집하고 주석을 달았다. 이 실험들은 시스템 통합과 데이터 수집을 보여줄 뿐 통제된 성공률 비교가 아니다.

| 과제 | 내용 | 규모와 비고 |
|---|---|---|
| 과제 1 | 장난감과 필기구를 지정한 바구니에 담기 | 성공과 실패 레이블을 데이터 큐레이션용으로 기록. 고정된 policy 평가 프로토콜 아래 수집한 레이블은 아니다 |
| 과제 2 | 포장된 산업용 부자재를 목표 트레이에 담기 | 주석 rollout trajectory 2,562개. LIBERO 탐색 seed 실행보다 훨씬 크지만 대응되는 policy 비교는 완료되지 않았다 |
| 과제 3 | 천 접기 | 성공 시연 데이터(demonstration), 실패 시도, 사람이 이어받은 구간 포함. 변형체 manipulation 연구용이며 통제된 policy 성공률 비교는 없다 |

### 4.6 주 비교에서 제외한 측정

보관된 타이밍 디렉토리의 pi0.5 평가는 모든 LIBERO suite에서 성공률 0.0%를 보고했다. 모든 suite에 걸친 0은 policy 결과보다 평가 실패나 action 매핑 실패에 더 부합하므로 주 비교에서 제외했다. 타이밍 CSV와 요약 JSON도 여러 pi0.5 과제에서 서로 어긋난다.

legacy `drif_ov_libero0809` checkpoint도 두 가지 이유로 통제된 비교에서 제외했다. 첫째, 이 checkpoint는 A800 4장, GPU당 배치 256, 1만 5천 step으로 학습해 다중 seed checkpoint의 A800 2장 2만 step 레시피와 다르다. 둘째, 보고된 성공률이 단일 탐색 실행에서 나왔다. legacy 결과는 방법 품질의 근거가 아니라 개발 기록으로 부록에 남는다.

보관된 object 요약에는 drifting 성공률 값이 없다. 따라서 object 지연 시간은 보고하되 성공률은 N/A로 둔다. 빠진 성공률 값을 legacy 실행이나 다른 suite의 평균으로 대체하지 않았다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5.1 성능 저하의 후보 원인

실험은 어떤 변경이 성능 저하를 일으키는지 분리하지 못한다. 보고서는 다섯 가지를 결론이 아니라 대안 가설로 제시한다.

| 가설 | 내용 | 제안된 검증 |
|---|---|---|
| 결정적 one-step 모드 평균화 | 상속한 목적함수는 등방성 오차에 좌표별 geometry 벌점을 더한 회귀 목표다. one-step 결정적 생성기는 유효한 모드가 여럿인 observation에서 모드들의 조건부 평균 근처를 예측할 수 있는데, 평균 근처에는 시연된 trajectory가 없을 수 있다. 다단계 diffusion이나 flow 생성기는 trajectory를 따라 모드 사이를 이동할 수 있지만 one-step 모델은 즉시 한 위치를 확정해야 한다 | observation 근처 expert 모드 수에 따른 one-step 예측 오차 비교, latent 또는 이산 모드 변수가 오차를 줄이는지 평가 |
| 배치 의존 geometry 추정 | geometry 행렬을 현재 minibatch에서 추정한다. 보고된 A800 2장 실행은 로컬 배치당 32 표본을 쓰므로 이웃 가중치와 조건부 분산, 참조 분산이 배치 구성에 따라 달라진다. 배치 크기를 바꾸면 목적함수와 데이터가 같아도 실효 geometry 목적함수가 달라진다. 현재 구현이 이웃 집합에 질의 표본을 포함하는 점도 softmax 이웃을 더 집중시켜 분산 추정을 바꿀 수 있다 | 두 선택 모두 ablation 필요. 검색 기반이나 데이터셋 수준 geometry 추정으로 minibatch 크기 의존을 제거 |
| open-loop chunk 실행 | policy는 action 40개를 예측하고 기본 평가는 다음 요청 전에 chunk를 모두 실행한다. action head가 빨라져도 이 open-loop 구간은 자동으로 줄지 않으므로 head 자체가 빨라도 long-horizon 오차가 쌓일 수 있다 | 재계획 전 실행 action 수를 1, 2, 5, 10, 20, 40으로 변화. execution horizon이 짧아질수록 성공률이 오르면 지연 시간 이점을 더 잦은 closed-loop 피드백으로 전환할 수 있다 |
| 검증되지 않은 asynchronous overlap 경로 | DrifOv 학습과 추론 코드는 확정 prefix를 지원하지만 동기식 LIBERO 평가는 빈 prefix를 공급한다. 측정된 LIBERO 성공률은 무조건부 one-step 경로를 평가할 뿐 prefix 조건부가 chunk 인계나 큐 연속성을 개선하는지 측정하지 않는다. 학습 prefix는 expert chunk에서 샘플링하고 제한된 가우시안 잡음으로 교란하지만, 배치 시점의 prefix는 policy 자신이 만든다 | 물리적으로 일관된 도착 상태를 갖는 모델 생성 prefix로 평가 |
| 학습과 아키텍처 교란 | GR00T와 DrifOv는 backbone과 전처리 스택이 같지만 action head 아키텍처, 초기화, 학습 목적함수가 다르다. 직접 MSE head, geometry 항 ablation, one-step consistency distillation GR00T head와의 비교가 모두 빠져 있다. pre-training된 GR00T action head를 새 head의 초기화로 쓰지도 않아 비교는 fine-tuning 비교가 아니라 처음부터 학습한 action head 비교다 | 최적화 난이도, 아키텍처 불일치, action 정규화 문제, one-step 목적함수를 각각 분리하는 ablation |

### 5.2 타당성 위협

보고서가 직접 나열한 제약은 여섯 가지다.

- seed 1000의 GR00T 기준 checkpoint가 더 오래된 보관 평가에서 왔고 seed 비교 실행과 동일한 프로토콜이 아닐 수 있다.
- drifting seed의 Object suite 성공률이 없다. object 지연 시간 행에는 대응되는 통제된 성공률 비교가 따라붙지 않는다.
- pi0.5 결과는 보관된 평가가 모든 suite에서 성공률 0을 냈고 요약 파일이 서로 어긋나 제외했다.
- 타이밍이 backbone과 action head만 포함하고 전처리, 네트워킹, 컨트롤러 실행, 스케줄링을 제외한다.
- 실제 로봇 절은 데이터 수집과 시스템 통합을 기록할 뿐 통제된 성공률 비교를 제공하지 않는다.
- 메모리 관찰이 공유 서버 텔레메트리에서 나왔고 다른 작업의 영향을 받는다.

### 5.3 후속 방향

저자가 제시하는 다음 단계는 홍보성이 아니라 통제된 실험이다. 모든 baseline의 학습과 평가 프로토콜 일치, geometry 추정의 minibatch 의존 제거, 이웃 집합에서 질의 표본 제외 여부 검증, chunk당 실행 action 수 감소, asynchronous rollout에서 overlap 경로 평가가 목록에 오른다.

배치 관점의 제안은 느린 VLM backbone과 빠른 action head를 결합하는 구성이다. backbone을 낮은 빈도로 갱신하면서 action head는 캐시된 시각 feature와 최신 로봇 상태로 다시 계산한다. 이 설계는 지연 augmentation과 도착 상태 일관성 학습을 요구하며 이 보고서에서 평가하지 않았다.

저자의 마지막 문장은 평가 기준에 대한 제안이다. one-step policy는 action head 지연 시간만이 아니라 속도와 성공률의 경계면으로, 그리고 지연 시간 감소가 더 잦은 closed-loop 피드백을 가능하게 하는지로 판단해야 한다.

## 6. 관련 연구 (Related Work)

### 6.1 효율적 VLA 추론

VLA 효율화는 VLM 연산의 크기나 빈도를 줄이는 방향으로 접근해 왔다. TinyVLA는 데이터 효율적 제어를 위해 작은 vision-language backbone을 쓴다. VLA-Cache는 trajectory 전반에서 vision-language 토큰을 재사용한다. Fast-in-Slow는 느린 추론과 빠른 action 생성을 분리하고, DEER는 추가 연산이 필요 없을 때 추론을 동적으로 종료한다. 양자화와 최적화된 실행 엔진은 남은 네트워크 평가 비용을 줄인다.

이 방법들은 여기서 다루는 action head 교체와 상보적이다. 이 보고서가 다룬 GR00T N1.7 구성에서는 action head를 약 5 ms로 줄인 뒤에도 VLM backbone이 측정된 model-forward 시간을 지배한다. 그래서 action head만의 지연 시간 감소로는 전체 파이프라인을 실시간으로 만들 수 없다.

### 6.2 action chunking과 real-time action chunking

action chunking policy는 한 번의 policy 호출로 여러 미래 action을 예측하고 다음 요청 전까지 action 큐를 실행한다. VLM 호출은 줄지만 open-loop 실행 길이와 피드백 빈도 사이의 교환 관계가 생긴다. real-time action chunking은 현재 chunk가 소진되기 전에 다음 요청을 시작하고, 추론이 진행되는 동안 실행될 미실행 action과 새 chunk가 일관되도록 제약한다.

DrifOv는 같은 asynchronous 타임라인을 따르지만 추론 시점의 반복적 guidance를 쓰지 않는다. 대신 prefix 조건부 one-step 생성을 학습한다. 확정된 좌표는 디코딩 후 그대로 복사하고 suffix는 한 번의 action transformer 평가로 함께 생성한다.

### 6.3 drifting 모델과 one-step 생성

기반 action head는 Implicit Drifting Policy의 학습 목적함수를 쓴다. IDP는 observation과 action 쌍마다 명시적 연속 drifting field를 회귀하는 대신 expert action 주변에 geometry 가중 potential을 구성한다. 배치 시점에는 zero action seed가 완전한 action chunk로 곧바로 사상된다.

이 보고서의 확장은 drifting 목적함수 자체가 아니다. 구현이 더한 것은 action prefix 인터페이스와 overlap 인지 suffix 생성이며, 이를 통해 후속 chunk가 이미 컨트롤러에 전달된 명령을 조건으로 삼을 수 있다.

### 6.4 인용된 주요 문헌

| 번호 | 문헌 | 이 보고서와의 관계 |
|---|---|---|
| [1] | Fast-in-Slow (NeurIPS 2026) | 느린 추론과 빠른 action 생성을 분리한 dual-system VLA |
| [2] | TinyVLA (RA-L 2025) | 경량 backbone 기반 효율화 |
| [3] | VLA-Cache (NeurIPS 2026) | vision-language 토큰 캐싱 |
| [4] | DEER-VLA (NeurIPS 2024) | 적응형 조기 종료 추론 |
| [5] | Quantization-aware imitation learning (2024) | 양자화 기반 자원 효율 제어 |
| [6] | FluxVLA Engine (2026) | VLA 엔지니어링 플랫폼, 커스텀 연산자 |
| [7] | GR00T N1 (NVIDIA, 2025) | 교체 대상 action head를 가진 기반 모델 계열 |
| [8] | Implicit Drifting Policy (2026) | 상속한 학습 목적함수의 출처 |
| [9] | Training-time action conditioning for efficient real-time chunking (2025) | DrifOv overlap 조건부의 착안점 |
| [10] | LIBERO (NeurIPS 2023) | 평가 벤치마크 |

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| action head | VLM backbone이 만든 표현을 받아 실제 로봇 action 수치로 바꾸는 출력 모듈. GR00T N1.7은 여기에 반복 평가형 DiT를 쓴다 |
| one-step generation | 반복 denoising 없이 네트워크를 한 번만 평가해 action chunk 전체를 내는 방식 |
| drifting 목적함수 | Implicit Drifting Policy가 제안한 학습 목적함수. 명시적 drifting field를 회귀하는 대신 expert action 주변에 geometry 가중 potential을 두고 그 값을 낮춘다 |
| geometry 행렬 | minibatch 안 이웃 표본의 action 분산에서 계산하는 대각 가중 행렬 M. potential의 좌표별 벌점 세기를 정한다. detach되어 gradient를 전달하지 않는다 |
| proposal prediction | zero action seed와 시각 0에서 출발한 예측 y = f(o, 0, 0). 배치 시점의 추론 경로와 같은 입력이다 |
| proximal prediction | expert action에 잡음을 섞은 지점에서 출발한 예측 z = f(o, ã, t*). t* = 0.9이며 λ_prox = 81.0으로 가중된다 |
| DrifOv | one-step drifting head에 overlap 조건부 인터페이스를 더한 이 보고서의 구현체 이름 |
| action prefix | 이미 컨트롤러로 전달돼 확정된 action 행들. DrifOv는 이 값을 디코딩 후 그대로 복사해 덮어쓰지 못하게 한다 |
| overlap 길이 | 새 chunk에서 prefix가 차지하는 행 수 L. 학습 시 0부터 H - 1 사이에서 샘플링한다 |
| 실행 offset | 추론이 진행되는 동안 얼마나 실행이 진행됐는지에 대한 추정값. 임베딩으로 action query에 더해진다 |
| 모드 평균화 | 유효한 action 후보가 여럿일 때 결정적 생성기가 그 평균 근처를 내놓는 현상. 평균 지점에는 시연된 trajectory가 없을 수 있다 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 6 | 속도와 성공률의 교환 관계 요약 (a) 평균 model-forward 시간 (b) suite별 성공률 | caption-region | ★ wiki 권장 (result) |
| fig02 | 6 | legacy LIBERO-Long 프로파일, 개발 이력 기록용 | caption-region | (확인 필요, 주 비교에서 제외된 실행) |
| fig03 | 7 | GPU 메모리 텔레메트리, drifting 17.752 GiB 대 GR00T 45.748 GiB | caption-region | ★ wiki 권장 (result, 일화적 관찰) |
| fig04 | 7 | 실제 로봇 과제 1 장난감 담기 변형 | caption-region | (확인 필요, 데이터 수집 기록) |
| fig05 | 7 | 산업용 부자재 포장 과제 주석 진행 화면 | caption-region | (확인 필요, 데이터 수집 기록) |
| fig06 | 7 | 천 접기 데이터셋 개요 | caption-region | (확인 필요, 데이터 수집 기록) |
| tab01 | 4 | 실험 설정 | manual | ★ wiki 권장 (protocol) |
| tab02 | 5 | LIBERO model-forward 지연 시간 | table-region | ★ wiki 권장 (result) |
| tab03 | 5 | LIBERO 성공률 | manual | ★ wiki 권장 (result) |
