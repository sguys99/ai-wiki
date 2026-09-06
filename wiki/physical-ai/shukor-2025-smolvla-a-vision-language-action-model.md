---
title: "SmolVLA: A vision-language-action model for affordable and efficient robotics"
type: paper
year: 2025
category: physical-ai
source: shukor-2025-smolvla-a-vision-language-action-model.md
raw_path: raw/papers/shukor-2025-smolvla-a-vision-language-action-model.pdf
raw_filename: "shukor-2025-smolvla-a-vision-language-action-model.pdf"
source_collection: external
authors: "Mustafa Shukor, Dana Aubakirova, Francesco Capuano, Remi Cadene (core) 외 Pepijn Kooijmans, Steven Palma, Adil Zouitine, Michel Aractingi, Caroline Pascal, Martino Russi, Andres Marafioti, Simon Alibert, Matthieu Cord, Thomas Wolf (Hugging Face, Sorbonne University, valeo.ai, ENS Paris-Saclay, 총 14인)"
arxiv_id: "2506.01844"
tags: [physical-ai, vla, manipulation, edge-inference]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/fig01.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/fig01.png
    caption: "SmolVLA 전체 구조. community dataset으로 pre-training해 저가 로봇에 배포한다. VLM의 뒤쪽 L-N개 layer를 잘라내고(가위 아이콘) 남은 layer가 지시문, RGB 이미지, sensorimotor state를 임베딩한다. 합쳐진 토큰이 cross-attention과 self-attention을 번갈아 쌓은 action expert로 들어가 action chunk를 낸다"
    page: 1
    bbox_norm: [0.1102, 0.5274, 0.9098, 0.8756]
    strategy: manual
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/fig02.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/fig02.png
    caption: "asynchronous inference 스택. RobotClient가 observation을 PolicyServer로 보내고 action chunk를 돌려받는다. 큐를 다 쓰기 전에 다음 예측을 걸어 대기 구간을 없앤다. PolicyServer는 GPU가 달린 원격 서버여도 된다"
    page: 6
    bbox_norm: [0.1194, 0.0615, 0.8806, 0.3608]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/fig04.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/fig04.png
    caption: "실제 로봇 과제 4종의 시작 프레임과 종료 프레임. (A) SO100의 pickplace, stacking, sorting은 top과 wrist 카메라를 쓰고 (B) SO101의 pickplace는 top과 side 카메라를 쓴다"
    page: 9
    bbox_norm: [0.0796, 0.0628, 0.915, 0.3422]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/fig05.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/fig05.png
    caption: "sync 추론과 async 추론 비교. (a) 성공률은 비슷하고, (b) 완료 시간은 13.75초에서 9.70초로 줄고, (c) 60초 안에 처리한 큐브는 9개에서 19개로 늘어난다"
    page: 12
    bbox_norm: [0.0652, 0.2424, 0.9248, 0.3696]
    strategy: manual
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab02.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab02.png
    caption: "LIBERO와 Meta-World 시뮬레이션 성공률. SmolVLA 0.45B가 LIBERO 87.3%로 π0 3.3B(86.0%)와 OpenVLA 7B(76.5%)를 앞선다"
    page: 11
    bbox_norm: [0.1445, 0.0608, 0.8555, 0.4149]
    strategy: table-region
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab03.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab03.png
    caption: "SO100 실제 로봇 벤치마크. SmolVLA 0.45B가 평균 78.3%로 π0 3.5B(61.7%)와 단일 과제 학습 ACT(48.3%)를 앞선다"
    page: 11
    bbox_norm: [0.0952, 0.4844, 0.5548, 0.6226]
    strategy: manual
    curated: true
  - id: tab05
    label: Table 5
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab05.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab05.png
    caption: "pre-training과 multi-task 학습의 효과. 단일 과제 40%, multi-task 51.7%, community dataset pre-training을 더하면 78.3%"
    page: 12
    bbox_norm: [0.2211, 0.0609, 0.7789, 0.2078]
    strategy: table-region
    curated: true
  - id: tab06
    label: Table 6
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab06.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab06.png
    caption: "cross-attention과 self-attention 비교. 번갈아 쌓은 CA+SA가 85.5%로 CA 단독(79.0%)과 SA 단독(74.5%)을 앞선다"
    page: 13
    bbox_norm: [0.1002, 0.0474, 0.4698, 0.1826]
    strategy: manual
    curated: true
  - id: tab08
    label: Table 8
    kind: table
    file: assets/shukor-2025-smolvla-a-vision-language-action-model/tab08.png
    raw: raw/papers/shukor-2025-smolvla-a-vision-language-action-model-figures/tab08.png
    caption: "layer skipping 비교. 500M VLM의 앞 N개 layer만 쓰는 방식이 256M 작은 VLM(75.8%)이나 한 layer 걸러 쓰기(75.5%)보다 낫다"
    page: 13
    bbox_norm: [0.1002, 0.2084, 0.4698, 0.4076]
    strategy: manual
    curated: true
---

## 요약

SmolVLA는 Hugging Face가 2025년 6월에 공개한 450M 파라미터 규모의 VLA다. π0가 세운 "VLM backbone에 flow matching action expert를 붙인다"는 구도를 그대로 따르되, 모델을 7분의 1로 줄이고 학습 데이터를 기업 자체 수집분에서 커뮤니티가 Hugging Face에 공개한 데이터셋으로 바꿨다. GPU 한 장으로 학습되고 소비자용 GPU나 CPU에서 배포된다.

크기 대비 성능은 높다. LIBERO 평균 87.3%로 3.3B π0(86.0%)와 7B OpenVLA(76.5%)를 앞서고, SO100 실제 로봇 세 과제에서 78.3%로 π0의 61.7%를 크게 웃돈다. 여기에 추론과 실행을 분리하는 asynchronous inference 스택이 두 번째 기여로 붙어 같은 과제를 약 30% 빨리 끝낸다.

논문의 성격은 효율 검증이다. VLA를 얼마나 작게 만들어도 되는지, 비공개 데이터 없이 공개 데이터만으로 어디까지 갈 수 있는지를 확인하므로, 대형 VLA 계보의 연장선이 아니라 배포 비용 쪽으로 방향을 튼 지점으로 읽는 것이 적절하다.

![[assets/shukor-2025-smolvla-a-vision-language-action-model/fig01.png]]
*Figure 1: SmolVLA 전체 구조. community dataset으로 pre-training해 저가 로봇에 배포한다. VLM의 뒤쪽 L-N개 layer를 잘라내고(가위 아이콘) 남은 layer가 지시문, RGB 이미지, sensorimotor state를 임베딩하며, 합쳐진 토큰이 cross-attention과 self-attention을 번갈아 쌓은 action expert로 들어가 action chunk를 낸다 (Shukor 2025, p.1)*

## 배경

VLA 연구는 모델 규모를 키우는 방향으로 굳어져 왔다. OpenVLA가 7B, π0가 3.3B이고 GR00T N1은 그보다 크다. 이 크기는 소비자용 GPU에 올라가지 않아 실제 배포와 반복 실험을 모두 어렵게 만든다.

데이터 쪽 장벽도 함께 있다. 대부분의 VLA는 공개되지 않는 자체 수집 데이터로 학습하고 그 수집이 고가의 로봇 플랫폼을 전제하므로, 외부 연구자가 같은 레시피를 이어받기 어렵다. 근본 원인은 로봇 데이터의 성격이다. 텍스트와 이미지는 인터넷에서 수집할 수 있지만 로봇 데이터는 사람이 teleoperation으로 만들어야 한다. teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다.

모은 데이터를 합치기도 어렵다. 로봇의 형태, 센서, 구동 방식, control frequency, 데이터 형식이 제각각이기 때문이다. control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻하며, 저자들은 이렇게 흩어진 상태를 "data islands"라 부른다.

여기서 논문이 찾은 출구가 저가 로봇 플랫폼과 표준화된 라이브러리다. SO-100 같은 3D 프린팅 로봇 팔과 LeRobot 라이브러리가 퍼지면서 개인 실무자가 공개한 데이터가 쌓였고, SmolVLA는 이 community dataset을 pre-training의 유일한 원천으로 삼는다.

## 핵심 개념

policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. SmolVLA의 policy는 매 timestep마다 action 하나를 내는 대신 action chunk를 내는데, action chunk는 한 번에 출력하는 여러 timestep 분량의 action 묶음이며 기본 크기는 n=50이다. 이 묶음 단위 출력이 chunk 크기 선택과 다음 chunk 계산 시점이라는 두 논의의 전제가 된다.

flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이고, action expert는 로봇 상태와 action 토큰만 처리하도록 분리한 별도 가중치 묶음이다. SmolVLA는 이 action expert를 flow matching 목표로 학습한다.

효율 쪽 개념은 두 가지다. layer skipping은 backbone의 앞쪽 layer만 쓰고 나머지를 생략해 연산량을 줄이는 기법이고, asynchronous inference는 다음 chunk 계산과 현재 chunk 실행을 겹쳐 대기 시간을 감추는 실행 방식이다. 그 반대말인 synchronous inference는 chunk를 다 소진한 뒤에야 다음 chunk를 계산한다.

## 방법

### 전체 구조

SmolVLA는 perception을 맡는 pre-training된 VLM과 action을 만드는 action expert로 나뉘며, 두 부분은 순환으로 이어진다. VLM이 만든 feature가 action expert를 조건화하고, action expert가 낸 action이 다시 VLM에 들어갈 상태를 바꾼다.

| 구성 요소 | 역할 | 세부 |
|---|---|---|
| SigLIP vision encoder | RGB 이미지 인코딩 | tiling을 끄고 pixel shuffle로 프레임당 토큰 64개 |
| SmolLM2 language decoder | 지시문(instruction), 이미지, 상태를 하나의 feature로 통합 | 앞 16개 layer만 사용, 학습 중에는 얼려 둔다 |
| 선형 projector 3종 | 차원 맞추기 | 상태를 VLM 차원으로, action을 expert 차원으로, VLM feature를 expert 차원으로 |
| action expert | action chunk 생성 | flow matching Transformer, 약 100M 파라미터, hidden size는 VLM의 0.75배 |

전체 파라미터는 450M이며 π0와 비교하면 학습이 약 40% 빠르고 메모리는 6분의 1을 쓴다.

### VLM backbone 축소

backbone에는 SmolVLM-2가 들어간다. multi-image와 video 입력에 맞춰 설계된 소형 VLM으로 SigLIP이 시각 feature를 뽑고 SmolLM2가 language decoder를 맡는다. 다만 문서 읽기와 OCR 중심으로 pre-training된 모델이라 로봇 상황에 최적인지는 확인되지 않았다고 저자들이 한계 절에서 인정한다.

연산량은 두 방향에서 줄인다. 첫째는 깊이다. 마지막 layer 대신 앞에서부터 N번째 layer까지의 feature만 action expert에 넘기고 나머지 L-N개 layer는 학습 전에 버린다. N을 전체의 절반으로 두는 것이 균형점이어서 실제 모델은 앞 16개 layer만 쓰며, 근거는 downstream 과제에 가장 좋은 feature가 반드시 마지막 layer에서 나오지는 않는다는 선행 관찰이다.

둘째는 토큰 수다. tiling으로 학습된 모델이지만 추론 속도를 위해 tiling을 끄고 전체 이미지 한 장에 pixel shuffle을 적용해 프레임당 visual 토큰을 64개로 고정한다. pixel shuffle은 인접 픽셀을 채널 축으로 접어 공간 해상도를 낮추는 연산이다. sensorimotor state는 선형 layer 하나로 토큰 한 개에 압축한 뒤 visual 토큰과 언어 토큰에 이어 붙인다. 즉 로봇의 몸 상태가 action 생성 직전이 아니라 장면 해석 단계부터 함께 들어간다.

### action expert와 flow matching

action expert는 flow matching으로 학습하는 Transformer다. 학습 목표는 다음과 같다.

```
L_τ(θ) = E[ ‖ v_θ(A_τ^t, o_t) − u(A_τ^t | A_t) ‖² ]
A_τ^t = τ·A_t + (1−τ)·ε,   ε ~ N(0, I),   u = ε − A_t
```

`o_t`는 N번째 layer에서 뽑은 VLM feature이고 `A_t`는 시점 t부터 n스텝치 action chunk다. 즉 정답 action에 noise를 섞은 `A_τ^t`를 넣고 네트워크가 noise에서 정답으로 향하는 벡터 `u`를 맞히게 한다. τ는 π0와 같이 Beta 분포에서 뽑고 추론에서는 flow 스텝을 10회로 고정한다.

### cross-attention과 self-attention의 교대 배치

π0와 갈리는 지점은 VLM과 action expert를 잇는 방식이다. π0는 self-attention만 쓰고 GR00T N1은 cross-attention만 쓰는 반면, SmolVLA는 블록마다 둘 중 하나를 넣어 번갈아 쌓는다. 두 attention을 한 블록에 함께 담는 표준 VLM decoder와도 다른 구성이다.

| 블록 | 동작 | 목적 |
|---|---|---|
| cross-attention | action 토큰이 VLM feature를 key와 value로 참조한다 | 장면과 지시문 조건을 action에 반영 |
| self-attention | action 토큰끼리 참조하되 causal mask를 씌운다 | chunk 안의 시간 흐름을 매끄럽게 연결 |

저자들은 self-attention이 chunk를 매끄럽게 만드는 효과가 실제 로봇 실험에서 특히 잘 드러났다고 적었다.

### community dataset 정비

pre-training 데이터는 Hugging Face에 올라온 community dataset 481개다. embodiment 종류, episode 수, 데이터 품질, 프레임 커버리지 네 기준으로 걸러 2만 2,900 episode, 1,060만 프레임을 모았다. embodiment는 로봇의 물리적 형상과 그에 딸린 제어 API 구성을 뜻한다. OpenVLA가 쓴 약 100만 trajectory와 비교하면 한 자릿수 이상 작은 규모다.

표준 프로토콜을 따르는 학술 데이터셋과 달리 개인이 각자 모은 것이라 그대로 학습에 넣을 수 없었고, 두 가지 정비가 필요했다.

- 과제 설명 재생성. `task desc` 같은 자리표시자이거나 `Hold`, `Up`처럼 뜻이 통하지 않는 지시문이 많아, 데이터셋마다 대표 프레임과 원래 지시문을 Qwen2.5-VL-3B-Instruct에 넣고 동작을 요약하는 짧은 문장을 다시 생성했다.
- 카메라 시점 정규화. `images.laptop` 같은 이름이 데이터셋마다 top, side, wrist 중 무엇을 가리키는지 달라, top, wrist, side 순으로 손수 매핑해 `OBS_IMAGE_1`부터 번호를 다시 매기고 그 밖의 시점은 학습에서 제외했다.

저자들은 이 정비가 이 정도 데이터 규모에서 특히 중요했다고 밝힌다. 즉 데이터가 작을수록 표기 일관성이 성능에 미치는 영향이 커진다.

### asynchronous inference

논문의 두 번째 몸통은 실행 방식이다. 일반적인 VLA는 chunk 하나를 통째로 실행한 뒤 다음 observation을 policy에 넘기는데, 이때 observation 사이 n개의 timestep이 open-loop 구간이 되고 다음 chunk를 계산하는 동안 로봇이 아예 멈춘다. 반대편 극단은 ACT와 Diffusion Policy가 쓰는 방식으로, 매 timestep마다 새 chunk를 계산하고 겹치는 구간을 합쳐 반응성은 가장 좋지만 추론을 쉬지 않고 실행해야 해서 edge 환경에서는 비용을 감당하기 어렵다.

![[assets/shukor-2025-smolvla-a-vision-language-action-model/fig02.png]]
*Figure 2: asynchronous inference 스택. RobotClient가 observation을 PolicyServer로 보내고 action chunk를 돌려받으며, 큐를 다 쓰기 전에 다음 예측을 걸어 대기 구간을 없앤다. PolicyServer는 GPU가 달린 원격 서버여도 된다 (Shukor 2025, p.6)*

SmolVLA는 그 사이를 잡는다. chunk 예측과 chunk 소비를 RobotClient와 PolicyServer로 나누고 큐가 바닥나기 전에 다음 추론을 미리 걸며, 새 chunk가 도착하면 겹치는 구간을 합쳐 큐를 갱신한다. 따라서 로봇이 끊기지 않고 움직인다.

발동 조건은 큐 잔량이다. 남은 action 수가 `|A_t|/n < g`로 떨어지면 새 observation을 찍어 PolicyServer로 보낸다. 서버 왕복 시간을 `E[ℓ_S]`, 제어 주기를 Δt라 하면 `g ≥ E[ℓ_S]/(Δt·n)`을 만족하는 한 큐가 비지 않으며, 30fps 환경에서 Δt는 33ms다. 임계값 g가 만드는 세 가지 상태를 논문이 나눠 설명한다.

| g | 동작 | 대가 |
|---|---|---|
| 0 (순차 극단) | 큐를 완전히 비운 뒤에 요청한다 | 왕복 시간 `E[ℓ_S]`만큼 로봇이 멈춘다 |
| 0.7 (실제 사용값) | 큐의 약 30%를 소비한 시점에 다음 추론을 건다 | 겹침 구간이 모델 오차의 완충 역할을 한다 |
| 1 (연산 극단) | 매 timestep observation을 보낸다 | 제어 틱마다 forward pass 한 번, 저사양 하드웨어에서 감당이 안 된다 |

이 구조에는 부작용이 하나 있어 필터를 더 뒀다. 큐가 계속 채워지면 거의 같은 observation을 반복해 보내게 되어 로봇이 제자리에서 멈칫거리므로, joint-space 거리가 임계값 ε 아래인 observation은 중복으로 보고 버린다. 다만 큐가 완전히 비면 유사도와 무관하게 가장 최근 observation을 처리한다.

필터가 없다면 RobotClient는 `(1−g)·n·Δt`초마다 observation을 보내고 평균 `(1−g)·n·Δt + E[ℓ_S]`마다 새 chunk를 받는데, 유사도 필터가 이 주기를 늘려 정체를 막는다. 이 스택은 SmolVLA에만 묶이지 않고 action chunk를 내놓는 policy라면 어디에든 붙는다.

### 학습 설정

pre-training은 20만 스텝, 전역 배치 256으로 진행한다. 100스텝 warmup 뒤 cosine 스케줄로 학습률을 1e-4에서 2.5e-6까지 내리고 AdamW(β1=0.9, β2=0.95)를 쓰며, 이미지는 VLM 입력 크기에 맞춰 512×512로 리사이즈한다. 학습 대상은 action expert뿐이고 VLM은 얼려 둔다.

속도를 위해 bfloat16과 `torch.compile()`을 쓰는데, 이 최적화가 고정된 시퀀스 길이와 배치 크기를 요구하므로 배치에 맞지 않는 잔여 프레임은 버린다. 배치를 키우려고 GPU 4장을 썼지만 모델이 작아 한 장으로도 학습되며, 프로젝트 전체가 약 3만 GPU hours를 썼다. fine-tuning은 시뮬레이션 벤치마크가 10만 스텝에 배치 64, 실제 로봇 과제가 20만 스텝인데, 실제로는 훨씬 적은 스텝으로도 성능이 크게 떨어지지 않는다고 저자들이 덧붙인다.

## 실험 설정

평가에는 네 종류의 로봇 팔이 등장한다. SO-100과 SO-101은 6자유도 저가 3D 프린팅 팔로 서보 모터를 위치 명령으로 제어하며, SO-101은 조립이 빠르도록 설계를 바꾸고 모터를 교체해 동작이 더 매끄럽다. 시뮬레이터 쪽은 LIBERO가 7자유도 Franka Emika Panda를, Meta-World가 4자유도 Sawyer를 쓴다. pre-training 데이터는 SO-100에서만 나왔고 SO-101은 전이 실험에만 등장한다.

시뮬레이션 벤치마크는 두 가지다. LIBERO는 Spatial, Object, Goal, Long 네 범주에 각 10개씩 40개 과제를 두고 1,693 episode 데이터셋을 쓴다. Meta-World는 네 난이도의 50개 과제로 이뤄지며, 저자들이 과제당 50개씩 총 2,500 episode의 시연 데이터(demonstration)를 새로 수집했다. 두 벤치마크 모두 과제당 10회 시행해 완전히 성공한 경우만 1점으로 세는 이진 채점을 쓴다.

![[assets/shukor-2025-smolvla-a-vision-language-action-model/fig04.png]]
*Figure 4: 실제 로봇 과제 4종의 시작 프레임과 종료 프레임. (A) SO100의 pickplace, stacking, sorting은 top과 wrist 카메라를 쓰고 (B) SO101의 pickplace는 top과 side 카메라를 쓴다 (Shukor 2025, p.9)*

실제 로봇 데이터셋은 4개이며 모두 공개되어 있다. 각 데이터셋은 시작 위치 5종에 대해 10개씩, 과제당 50개의 시연 데이터를 담고, 채점은 과제를 하위 단계로 쪼갠 부분 점수 방식이다.

| 과제 | 로봇 | 지시문 | 채점 |
|---|---|---|---|
| Pick-Place | SO100 | 큐브를 집어 상자에 넣는다 | grasping 0.5 + 배치 0.5 |
| Stacking | SO100 | 빨간 큐브를 파란 큐브 위에 올린다 | grasping 0.5 + 적재 0.5 |
| Sorting | SO100 | 빨간 큐브는 오른쪽, 파란 큐브는 왼쪽 상자에 넣는다 | 0.25씩 4단계 |
| Pick-Place-Lego | SO101 | 분홍 레고 블록을 투명 상자에 넣는다 | grasping 0.5 + 배치 0.5 |

Sorting은 horizon이 길어 큐브 색 배치를 뒤집어 위치당 10개씩 수집했고, SO101의 Pick-Place-Lego는 작은 블록과 투명 상자 때문에 정밀도와 시각 인식이 함께 요구된다.

베이스라인은 두 가지다. π0는 VLM에 flow matching을 결합한 3.3B 규모 VLA로 Paligemma 기반이며 크로스 embodiment 로봇 데이터 1만 시간으로 pre-training되어 있다. ACT는 약 80M 파라미터의 CVAE policy로 ImageNet pre-training된 ResNet vision encoder를 쓰고 회귀 목표로 연속 action을 직접 예측한다. 학습 조건은 서로 달라서 SmolVLA만 community dataset pre-training을 거치고, π0는 대상 데이터로 fine-tuning하며, ACT는 과제마다 처음부터 학습한다.
## 결과

### 시뮬레이션

![[assets/shukor-2025-smolvla-a-vision-language-action-model/tab02.png]]
*Table 2: LIBERO와 Meta-World 시뮬레이션 성공률. SmolVLA 0.45B가 LIBERO 87.3%로 π0 3.3B(86.0%)와 OpenVLA 7B(76.5%)를 앞선다 (Shukor 2025, Table 2)*

VLA Pt. 열은 로봇 데이터로 pre-training했는지를 가리키며, SmolVLA는 VLM 가중치에서만 출발한다.

| Policy | VLA Pt. | Spatial | Object | Goal | Long | 평균 |
|---|---|---|---|---|---|---|
| Diffusion Policy | 아니오 | 78.3 | 92.5 | 68.3 | 50.5 | 72.4 |
| Octo (0.09B) | 예 | 78.9 | 85.7 | 84.6 | 51.1 | 75.1 |
| OpenVLA (7B) | 예 | 84.7 | 88.4 | 79.2 | 53.7 | 76.5 |
| π0 (Paligemma-3B) | 아니오 | 87 | 63 | 89 | 48 | 71.8 |
| π0 (3.3B) | 예 | 90 | 86 | 95 | 73 | 86.0 |
| SmolVLA (0.24B) | 아니오 | 87 | 93 | 88 | 63 | 82.75 |
| SmolVLA (0.45B) | 아니오 | 90 | 96 | 92 | 71 | 87.3 |
| SmolVLA (2.25B) | 아니오 | 93 | 94 | 91 | 77 | 88.75 |

같은 조건에서 비교하면 격차가 뚜렷하다. 로봇 데이터 pre-training 없는 π0(Paligemma-3B)가 71.8%인데 SmolVLA 0.45B는 87.3%로 15.5%p 앞서고, 로봇 데이터로 pre-training한 π0(86.0%)와도 파라미터 7분의 1로 대등하다. 다만 Object는 96% 대 86%로 SmolVLA가 앞서는 반면 long-horizon 과제인 Long은 71% 대 73%로 π0가 근소하게 높아, 평균의 우위가 모든 범주로 이어지지는 않는다.

Meta-World에서는 격차가 더 벌어진다.

| Policy | VLA Pt. | Easy | Medium | Hard | Very Hard | 평균 |
|---|---|---|---|---|---|---|
| Diffusion Policy | 아니오 | 23.1 | 10.7 | 1.9 | 6.1 | 10.5 |
| TinyVLA | 아니오 | 77.6 | 21.5 | 11.4 | 15.8 | 31.6 |
| π0 (3.5B-Paligemma) | 아니오 | 80.4 | 40.9 | 36.7 | 44.0 | 50.5 |
| π0 (3.5B) | 예 | 71.8 | 48.2 | 41.7 | 30.0 | 47.9 |
| SmolVLA (0.24B) | 아니오 | 86.43 | 46.36 | 35 | 60 | 56.95 |
| SmolVLA (0.45B) | 아니오 | 82.5 | 41.8 | 45.0 | 60.0 | 57.3 |
| SmolVLA (2.25B) | 아니오 | 87.14 | 51.82 | 70 | 64 | 68.24 |

SmolVLA 0.45B가 57.3%로 두 π0 변형을 모두 앞서고, 특히 Very Hard 난이도에서 60.0%로 π0의 30.0%를 두 배 앞선다. 즉 난이도가 올라갈수록 격차가 커진다. 크기를 2.25B로 키우면 더 오르고 0.24B로 줄여도 LIBERO 82.75%를 유지하므로, 규모의 이득은 남아 있되 0.45B 지점에서 이미 대형 모델과 겨룰 수 있다.

### 실제 로봇

![[assets/shukor-2025-smolvla-a-vision-language-action-model/tab03.png]]
*Table 3: SO100 실제 로봇 벤치마크. SmolVLA 0.45B가 평균 78.3%로 π0 3.5B(61.7%)와 단일 과제 학습 ACT(48.3%)를 앞선다 (Shukor 2025, Table 3)*

| Policy | 학습 방식 | Pick-Place | Stacking | Sorting | 평균 |
|---|---|---|---|---|---|
| ACT | 단일 과제 | 70 | 50 | 25 | 48.3 |
| π0 (3.5B) | multi-task | 100 | 40 | 45 | 61.7 |
| SmolVLA (0.45B) | multi-task | 75 | 90 | 70 | 78.3 |

평균만 보면 SmolVLA가 π0를 16.6%p 앞서지만 과제별로는 단순하지 않다. Pick-Place는 π0가 100%로 앞서고 Stacking과 Sorting에서 순위가 뒤집힌다. 즉 SmolVLA의 우위는 가장 쉬운 과제가 아니라 단계가 더 많은 과제에서 나온다.

SO101 Pick-Place-Lego는 다른 embodiment로의 전이를 보는 실험이다. pre-training 데이터에 SO101이 전혀 없는 상태에서 단일 과제로 학습해 학습 분포 안 90%, 학습에서 보지 못한 위치 50%를 기록했고 같은 조건의 ACT는 70%와 40%였다. 분포 밖 50%는 절반이 실패한다는 뜻이라 한계로도 읽히지만, pre-training에 없던 로봇으로 fine-tuning만으로 넘어간 결과다.

### pre-training과 multi-task의 기여

![[assets/shukor-2025-smolvla-a-vision-language-action-model/tab05.png]]
*Table 5: pre-training과 multi-task 학습의 효과. 단일 과제 40%, multi-task 51.7%, community dataset pre-training을 더하면 78.3% (Shukor 2025, Table 5)*

| 학습 구성 | Pick-Place | Stacking | Sorting | 평균 |
|---|---|---|---|---|
| 단일 과제, pre-training 없음 | 55 | 45 | 20 | 40 |
| multi-task, pre-training 없음 | 80 | 40 | 35 | 51.7 |
| multi-task, community dataset pre-training | 75 | 90 | 70 | 78.3 |

여러 과제를 함께 학습하는 것만으로 평균이 11.7%p 오르고 community dataset pre-training을 더하면 26.6%p가 더 오른다. 2만 3천 개 규모의 trajectory로 얻은 값이라는 점에서 이 논문에서 가장 실무적인 수치다.

두 효과의 성격은 다르다. multi-task 학습만으로는 Pick-Place가 크게 오르는 대신 Stacking이 45%에서 40%로 소폭 하락하는 반면, pre-training을 더하면 Pick-Place가 조금 내려가는 대신 Stacking 90%, Sorting 70%로 크게 오른다. 즉 pre-training의 이득은 어려운 과제 쪽에 몰려 있다.

### asynchronous inference

![[assets/shukor-2025-smolvla-a-vision-language-action-model/fig05.png]]
*Figure 5: sync 추론과 async 추론 비교. (a) 성공률은 비슷하고 (b) 완료 시간은 13.75초에서 9.70초로 줄며 (c) 60초 안에 처리한 큐브는 9개에서 19개로 늘어난다 (Shukor 2025, Figure 5)*

속도 실험은 Pick-Place 과제로 두 가지를 잰다. 큐브 위치 5종에 대해 10회 시행한 완료 시간, 그리고 60초를 주고 상자에 넣은 큐브 수다.

| 항목 | sync | async |
|---|---|---|
| 성공률 평균 | 78.3% | 73.3% |
| Pick-Place 성공률 | 75% | 80% |
| Stacking 성공률 | 90% | 90% |
| Sorting 성공률 | 70% | 50% |
| 완료 시간 평균 | 13.75초 (표준편차 2.42) | 9.70초 (표준편차 2.95) |
| 60초 안에 처리한 큐브 | 9개 | 19개 |

성공률만 보면 async가 5.0%p 낮은데, 원인은 Sorting 한 과제의 하락이고 Pick-Place는 오히려 올랐다. 저자들은 하이퍼파라미터를 Pick-Place에 맞춰 잡고 나머지 과제에 그대로 썼다고 밝힌다.

반면 속도 차이는 뚜렷하다. 완료 시간이 약 30% 줄고 고정 시간 안에 처리한 큐브 수가 두 배 넘게 벌어지므로, 성공률 5.0%p의 손해보다 단위 시간당 throughput의 이득이 크다는 것이 이 실험의 주장이다. throughput은 정해진 시간 안에 끝낸 과제 수를 뜻한다. 물체 위치가 바뀌거나 외부에서 방해가 들어올 때 async 쪽이 더 빨리 반응한다는 정성 관찰도 함께 적혀 있다.

## 설계 ablation

ablation은 모두 LIBERO에서 진행했다. 별도 언급이 없으면 로봇 데이터 pre-training 없이 처음부터 학습하며, VLM backbone은 얼려 두고 action expert만 학습한다.

![[assets/shukor-2025-smolvla-a-vision-language-action-model/tab06.png]]
*Table 6: cross-attention과 self-attention 비교. 번갈아 쌓은 CA+SA가 85.5%로 CA 단독(79.0%)과 SA 단독(74.5%)을 앞선다 (Shukor 2025, Table 6)*

![[assets/shukor-2025-smolvla-a-vision-language-action-model/tab08.png]]
*Table 8: layer skipping 비교. 500M VLM의 앞 N개 layer만 쓰는 방식이 256M 작은 VLM(75.8%)이나 한 layer 걸러 쓰기(75.5%)보다 낫다 (Shukor 2025, Table 8)*

| 검증 항목 | 결과 (LIBERO 평균 성공률) |
|---|---|
| VLM과 expert 연결 | CA+SA 85.5% > CA 단독 79.0% > SA 단독 74.5% |
| action 토큰 mask | causal 74.5% > bidirectional 67.5% |
| VLM layer 수 | N=32 80.3% > N=24 79.5% > N=16 78.5% > N=8 75.0%. 한 layer 걸러 쓰기 75.5%, 256M VLM 75.8% |
| expert hidden size | ×1.00 82.3% > ×0.50 80.3% > ×0.75 77.5% > ×0.25 73.8% |
| 학습 목표 | flow matching 80.25% > L1 회귀 75.25% |
| state 위치 (CA) | VLM 쪽 prefix 80.3% > expert 쪽 suffix 73.3% |
| state 위치 (SA) | expert 쪽 suffix 74.8% > VLM 쪽 prefix 53.3% |
| chunk 크기 n | n=10 84.0% > n=50 80.3% > n=30 78.5% > n=100 74.5% > n=1 50.0% |
| observation 갱신 주기 | 10스텝 82.8% > 1스텝 80.3% > 30스텝 70.8% > 50스텝 51.8% |

layer skipping 결과가 가장 실용적이다. 연산량을 절반으로 줄이는 세 방법 중 앞 16개 layer만 쓰기가 한 layer 걸러 쓰기와 256M 작은 VLM 쓰기를 모두 앞선다. 즉 같은 예산이라면 작은 모델을 통째로 쓰는 것보다 큰 모델의 앞부분만 쓰는 편이 낫다.

attention 배치 실험은 두 방식이 서로 보완적임을 보인다. cross-attention 단독이 self-attention 단독보다 높아 VLM feature 조건화만으로도 상당한 성능이 나오지만, 둘을 번갈아 쌓으면 어느 쪽 단독보다 6.5%p 이상 높다. state 위치는 attention 방식에 따라 결과가 뒤집혀서 cross-attention에서는 prefix가, self-attention에서는 suffix가 낫다. 최종 모델은 cross-attention을 포함하므로 prefix를 택한다.

수치가 단조롭지 않은 항목도 있다. expert hidden size는 ×0.50이 ×0.75보다 높은데도 최종 모델은 ×0.75를 쓰고, chunk 크기는 n=10이 최고인데도 최종 모델은 n=50을 쓴다. 논문은 두 선택의 이유를 따로 밝히지 않는다.

observation 갱신 주기 실험은 asynchronous inference의 근거가 된다. chunk 50개를 끝까지 실행한 뒤 갱신하면 51.8%까지 하락하는 반면 10스텝마다 갱신하면 82.8%다. 즉 open-loop 구간을 길게 두는 것 자체가 성능 손실이며, 그 구간을 줄이면서 연산 부담을 늘리지 않으려는 것이 async 설계의 목적이다.

## 한계

저자들이 직접 꼽은 항목이 일곱 가지다.

| 항목 | 내용 |
|---|---|
| 데이터 다양성 | pre-training 데이터가 SO100 한 종류에서만 나와 크로스 embodiment 폭이 없다 |
| 데이터 규모 | 약 2만 3천 개 trajectory로 OpenVLA의 약 100만 개와 비교가 되지 않는다 |
| 모델 크기 | 0.5B 아래에 묶여 있어 접근성을 지키며 어디까지 키울지가 열린 문제다 |
| backbone 선택 | 문서 읽기와 OCR 중심으로 pre-training된 VLM이 로봇 상호작용에 맞는지 검증되지 않았다 |
| 데이터 결합 학습 | 로봇 데이터와 멀티모달 데이터를 함께 학습하면 일반화와 지시 따르기가 개선될 수 있다 |
| long-horizon 과제 | 짧은 조작 과제에는 강하지만 긴 horizon에는 계층적 policy나 다단계 planning이 필요하다 |
| 학습 패러다임 | 현재는 imitation learning 일변도이며 강화학습을 결합하면 긴 과제에서 이득이 있을 수 있다 |

imitation learning은 시연 데이터를 흉내 내 policy를 학습하는 방법이다. SO101 fine-tuning이 되는 것은 보였지만 여러 embodiment를 섞어야 새 플랫폼 일반화가 제대로 될 것이라고 저자들은 본다.

논문이 명시하지 않은 지점도 하나 있다. async 모드에서 Sorting 성공률이 70%에서 50%로 하락했는데, 임계값 g와 유사도 임계값 ε을 과제마다 다시 잡아야 하는지에 대한 분석이 없다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| community dataset | 개인 실무자가 저가 로봇으로 직접 모아 Hugging Face에 공개한 데이터셋. 표준 프로토콜을 따르는 학술 데이터셋과 달리 embodiment, 제어 방식, 카메라 시점, 과제가 제각각이다 |
| layer skipping | language decoder의 뒤쪽 L-N개 layer를 학습 전에 버리고 앞 N개 layer의 feature만 쓰는 방식. SmolVLA는 N을 전체의 절반으로 둔다 |
| pixel shuffle | 인접 픽셀을 채널 축으로 접어 공간 해상도를 낮추는 연산. 프레임당 visual 토큰을 64개로 묶는 데 쓴다 |
| asynchronous inference | chunk 예측과 chunk 실행을 RobotClient와 PolicyServer로 분리해 병렬로 진행하는 실행 방식. 큐 잔량이 임계값 g 아래로 떨어지면 다음 추론을 건다 |
| queue threshold (g) | 남은 action 비율이 이 값 아래로 떨어지면 다음 추론을 시작하는 기준. SmolVLA는 0.7을 쓴다 |
| SO-100 / SO-101 | LeRobot 생태계의 3D 프린팅 6자유도 저가 로봇 팔. SO-101은 조립이 빠르고 모터가 달라 정밀 과제에 유리하다 |

## 관련 페이지

- [[physical-ai/jo-2026-smolvla-vla-primer]]: 이 논문의 한국어 입문 해설. 기초 개념이 낯설면 입문 해설을 먼저 읽는다.
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]: 직계 조상이자 주 베이스라인. VLM backbone과 flow matching action expert 구도를 그대로 따른다.
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]]: π0 계열의 다음 세대. SmolVLA가 규모를 줄인 반면 π0.5는 데이터 폭을 넓혔다.
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]]: 7B 오픈소스 VLA. 데이터 규모 약 100만 trajectory의 비교 기준점이다.
- [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation]]: ACT. action chunking의 출처이자 실제 로봇 베이스라인이다.
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: cross-attention만으로 두 전문가를 잇는 선택지.
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]]: VLM을 fine-tuning해 VLA를 만드는 레시피의 출발점.
- [[llms/lipman-2022-flow-matching-for-generative-modeling]]: action expert 학습 목표인 flow matching의 원 논문.
- [[physical-ai/huggingface-lerobot]]: 학습과 배포 코드가 올라가 있는 프레임워크. SmolVLA policy가 포함되어 있다.
- [[physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics]]: VLA full-stack 서베이.
- [[physical-ai/xu-2025-an-anatomy-of-vision-language-action-models]]: VLA 해부 서베이. 실시간 실행과 효율 관련 절이 async 기여와 맞물린다.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
