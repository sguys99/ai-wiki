---
title: "TANGO: Humanoid Navigation in Cluttered Environments with a Whole-Body Vision-Language-Action Model"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/li-2026-tango-humanoid-navigation-in-cluttered.pdf
raw_filename: "li-2026-tango-humanoid-navigation-in-cluttered.pdf"
source_collection: external
authors: "Anqi Li, Yuxin Chen, Zhaobo Li, Zhuo Cao, Junli Ren, Masayoshi Tomizuka, Dhruv Shah (UC Berkeley, Peking University, Tsinghua University, The University of Hong Kong, Princeton University). 앞의 네 명이 공동 제1저자, Yuxin Chen이 프로젝트 리드, Dhruv Shah가 교신저자"
arxiv_id: "2609.09158"
url: "https://tango-vla.github.io"
tags: [physical-ai, vla, humanoid, sim2real]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/li-2026-tango-humanoid-navigation-in-cluttered/fig01.png
    raw: raw/papers/li-2026-tango-humanoid-navigation-in-cluttered-figures/fig01.png
    caption: "실제 사무실에서 촬영한 TANGO의 whole-body 통과 장면. 위쪽은 30m 구간을 zero-shot으로 주행한 long-horizon 사례이고, 아래 세 컷은 바닥 장애물을 넘는 stride, 머리 위 장애물을 피해 몸을 낮추는 squat, 좁은 통로를 옆으로 지나는 sidestep이다"
    page: 2
    bbox_norm: [0.106, 0.073, 0.894, 0.5029]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/li-2026-tango-humanoid-navigation-in-cluttered/fig02.png
    raw: raw/papers/li-2026-tango-humanoid-navigation-in-cluttered-figures/fig02.png
    caption: "TANGO의 아키텍처와 데이터 파이프라인. 위쪽은 충돌 없는 whole-body 통과 데이터를 자동 합성하는 Plan, Edit, Track 파이프라인이고, 아래쪽은 Qwen2.5-VL backbone, diffusion 기반 action expert, SONIC tracker로 이어지는 세 계층 실행 구조다"
    page: 5
    bbox_norm: [0.1484, 0.0834, 0.8513, 0.367]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/li-2026-tango-humanoid-navigation-in-cluttered/fig03.png
    raw: raw/papers/li-2026-tango-humanoid-navigation-in-cluttered-figures/fig03.png
    caption: "실제 로봇 배포 시스템의 서버 클라이언트 구조. 로봇의 전방과 하방 카메라 영상이 서버로 전송되고, 서버의 VLA가 2Hz로 추론해 30Hz action chunk를 돌려주면 로봇이 50Hz로 재샘플링해 200Hz SONIC tracker로 실행한다"
    page: 7
    bbox_norm: [0.5055, 0.0732, 0.8875, 0.3093]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/li-2026-tango-humanoid-navigation-in-cluttered/fig04.png
    raw: raw/papers/li-2026-tango-humanoid-navigation-in-cluttered-figures/fig04.png
    caption: "실제 환경 정성 평가 다섯 장면과 각각에 준 지시문. long-horizon 주행, 좁은 통로 sidestep 두 사례, 머리 위 장애물 아래를 지나는 squat, 바닥 장애물을 넘는 stride 순서로 배치돼 있다"
    page: 10
    bbox_norm: [0.106, 0.1602, 0.8951, 0.7668]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/li-2026-tango-humanoid-navigation-in-cluttered/fig05.png
    raw: raw/papers/li-2026-tango-humanoid-navigation-in-cluttered-figures/fig05.png
    caption: "환경 augmentation으로 삽입한 세 가지 장애물 유형의 렌더 예시. 위쪽 stride는 바닥의 낮은 물체, 가운데 sidle은 좁은 통로를 만드는 양옆 물체, 아래쪽 squat은 천장 조명이나 선반 같은 머리 위 물체다"
    page: 19
    bbox_norm: [0.1245, 0.073, 0.87, 0.4177]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/li-2026-tango-humanoid-navigation-in-cluttered/tab01.png
    raw: raw/papers/li-2026-tango-humanoid-navigation-in-cluttered-figures/tab01.png
    caption: "VLNVerse 벤치마크 결과표. Val Seen과 Val Unseen 두 분할에서 NE, OSR, SR, SPL을 비교하며, low-level control 열이 체크된 방법은 TANGO뿐이고 나머지는 teleportation 조건에서 평가됐다"
    page: 8
    bbox_norm: [0.135, 0.0735, 0.8604, 0.2454]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/li-2026-tango-humanoid-navigation-in-cluttered/tab02.png
    raw: raw/papers/li-2026-tango-humanoid-navigation-in-cluttered-figures/tab02.png
    caption: "장애물을 삽입한 augmented VLNVerse-unseen에서의 평가표. InternVLA-N1의 zero-shot 두 조건과 fine-tuning 두 조건을 TANGO와 비교하며 NE, SR, SPL에 더해 충돌률 CR을 함께 보고한다"
    page: 9
    bbox_norm: [0.106, 0.0754, 0.5285, 0.2583]
    strategy: table-region
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/li-2026-tango-humanoid-navigation-in-cluttered/tab03.png
    raw: raw/papers/li-2026-tango-humanoid-navigation-in-cluttered-figures/tab03.png
    caption: "실제 Unitree G1에서 측정한 정량 결과표. 짧은 2D 구간, 긴 2D 구간, 장애물이 있는 3D 구간 세 조건에서 15회 시행 중 성공 횟수와 시행당 평균 충돌 횟수를 보고한다"
    page: 9
    bbox_norm: [0.5272, 0.0624, 0.8998, 0.1896]
    strategy: manual
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/li-2026-tango-humanoid-navigation-in-cluttered/tab04.png
    raw: raw/papers/li-2026-tango-humanoid-navigation-in-cluttered-figures/tab04.png
    caption: "action space ablation 표. 평면 예측만 하는 Ours-2D와 InternVLA-N1을 teleportation 조건과 Unitree low-level controller 실행 조건에서 각각 비교해 29-DoF whole-body 예측의 기여를 분리한다"
    page: 11
    bbox_norm: [0.0902, 0.0574, 0.4898, 0.2526]
    strategy: manual
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/li-2026-tango-humanoid-navigation-in-cluttered/tab05.png
    raw: raw/papers/li-2026-tango-humanoid-navigation-in-cluttered-figures/tab05.png
    caption: "핵심 구성 요소 ablation 표. real-time action chunking 제거, 모션 편집 제거, SONIC을 ScaleBFM으로 교체한 세 조건을 기본 설정과 비교한다"
    page: 11
    bbox_norm: [0.4792, 0.0735, 0.894, 0.207]
    strategy: table-region
    curated: true
  - id: tab06
    label: Table 6
    kind: table
    file: assets/li-2026-tango-humanoid-navigation-in-cluttered/tab06.png
    raw: raw/papers/li-2026-tango-humanoid-navigation-in-cluttered-figures/tab06.png
    caption: "데이터셋 규모와 생성 비용표. VLNVerse와 SAGE-3D의 원본과 augmentation 버전별 trajectory 수, PET 생성 GPU 시간, 렌더링 GPU 시간을 합산한다"
    page: 20
    bbox_norm: [0.1986, 0.0735, 0.7969, 0.2221]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

TANGO는 지시문(instruction)과 전방, 하방 RGB 영상만 받아 humanoid의 29-DoF 관절 action을 직접 예측하는 최초의 whole-body vision-language navigation 프레임워크로, 시뮬레이션에서만 학습하고도 Unitree G1에서 zero-shot으로 실제 실내 공간을 통과한다.

## 1. 자료 정보 (Document Information)

TANGO는 Traversability-Aware Vision-Language Navigation의 약자다. UC Berkeley를 중심으로 Peking University, Tsinghua University, The University of Hong Kong, Princeton University가 참여했고 2026년 9월 8일 arXiv에 공개됐다(arXiv:2609.09158v1, cs.RO). 저자는 데이터 파이프라인, 생성된 데이터셋, VLA 프레임워크, 모델 체크포인트, 배포 시스템을 모두 공개하겠다고 밝혔다.

문제 설정은 어수선한 실내 공간에서의 humanoid 주행이다. 바퀴형 로봇과 달리 humanoid는 움직이는 동안 몸의 기하 형태가 계속 바뀌기 때문에, 로봇의 자세 자체가 주행 문제의 일부가 된다. 논문은 이 상황을 "계획 수준에서 타당해 보이는 action이 실제 로봇에게는 실행 불가능할 수 있다"는 문장으로 정리한다.

## 2. 주요 기여 (Key Contributions)

논문의 기여는 네 가지로 나뉜다.

1. **whole-body vision-language navigation 문제의 정식화.** 기존 VLN이 2D waypoint나 이산 action을 예측하는 평면 계획 문제였다면, TANGO는 29개 관절 각도와 base의 6D 회전을 함께 예측하는 문제로 다시 정의한다.
2. **PET 데이터 생성 파이프라인.** Plan, Edit, Track 세 단계로 충돌 없는 whole-body 통과 동작을 시뮬레이션에서 자동 합성한다. 사람의 모션 캡처와 retargeting에 의존하지 않는다.
3. **triple-system 아키텍처.** Qwen2.5VL-7B 기반 vision-language backbone(system-2), flow matching으로 학습한 MM-DiT action expert(system-1), pre-training을 마친 SONIC tracker(system-0)를 결합한다.
4. **zero-shot sim2real 배포.** 실제 주행 데이터를 전혀 쓰지 않고 Unitree G1에 배포해, 장애물을 넘고 몸을 낮추고 옆걸음으로 통과하는 동작을 확인했다.

기존 방법과의 차이는 세 방향에서 드러난다. VLN 계열은 평면 action space 때문에 whole-body 실행 가능성을 표현하지 못한다. GR00T-N1.6, Ψ0, WholeBodyVLA 같은 humanoid foundation model은 상체 동작만 예측하고 주행은 하위 제어기에 넘기는 분리 설계라, 주행 중 whole-body 통과 가능성을 명시적으로 다루지 못한다. HumanoidPF 같은 강화학습 기반 통과 연구는 특정 상황에서는 잘 동작하지만 과제별 사전 지식에 의존해 long-horizon 지시문 주행으로 확장하기 어렵다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 정식화

policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. TANGO의 policy는 자연어 지시문 ℓ, 전방과 하방 카메라의 RGB 영상 시퀀스 I^{fr,dn}_{1:t}, 그리고 전신 관절 각도로 이뤄진 proprioception 상태 q_t를 받는다. proprioception은 로봇이 자기 관절의 각도와 속도를 스스로 감지하는 정보를 말한다.

출력은 길이 H의 whole-body action chunk A_t = {a_1, ..., a_H}다. 각 a_i는 목표 관절 각도 q_{d,i} ∈ ℝ^29와 base의 6D 회전 표현 r_{b,i} ∈ ℝ^6으로 구성된다. 예측된 action chunk는 하위 motion tracker로 흘려보내진다.

### 3.2 시뮬레이션 데이터 생성

**환경 augmentation.** 기존 주행 데이터셋은 정돈된 방 배치를 담고 있어 통과 제약이 거의 없다. 저자는 VLNVerse의 263개 장면과 SAGE-3D의 1,000개 장면을 출발점으로 삼고, Gemini 2.5 Flash로 바닥이 고르지 않거나 기하가 불완전한 저품질 장면을 걸러 각각 205개와 373개, 합계 578개 장면을 남겼다.

여기에 HumanoidPF를 따라 세 가지 장애물을 삽입한다.

| 유형 | 삽입 방식 | 유도되는 동작 | 사용 자산 예시 | 비중 |
|---|---|---|---|---|
| stride | 경로 위에 낮은 물체를 놓는다 | 다리를 들어 넘어간다 | 러그, 쿠션, 스툴 | 44% |
| sidle | 양옆에 물체를 놓아 좁은 통로를 만든다 | 몸을 돌려 옆걸음으로 지난다 | 의자, 화분, 선반 | 15% |
| squat | 머리 위나 상체 높이에 물체를 놓는다 | 허리를 굽히거나 몸을 낮춘다 | 천장 조명, 램프, 커튼 | 41% |

삽입 위치는 무작위가 아니라 기존 A* trajectory를 따라 표본을 뽑고 경로의 진행 방향에 정렬시킨다. 시작점과 목표점 근처는 피하고, occupancy 지도와 같은 장면의 다른 trajectory를 함께 검사해 무관한 경로를 막지 않도록 한다. 배치가 끝나면 장애물을 occupancy 표현에도 기록해 하위 계획기가 policy와 같은 기하를 보도록 맞춘다. 지시문 역시 Gemini 2.5 Flash로 장애물과 목표 동작 정보를 반영해 다시 생성한다.

**PET 파이프라인.** 사람의 모션 캡처와 retargeting에 의존하는 기존 수집 방식은 동작 품질 저하와 embodiment 불일치를 낳는다. 저자는 이를 피하려고 Plan, Edit, Track 세 단계를 자동화했다.

**Plan 단계**는 2D 바닥 격자에서 A*로 평면 경로를 찾는다. 장애물에 가까운 칸에 완만한 벌점을 주기 위해 단계 비용에 다음 항을 더한다.

```
c(x) = c_step + λ · exp(−Φ_2D(x) / d_0)
```

Φ_2D는 점유된 칸까지의 2D signed distance이고 d_0는 여유 거리 감쇠 상수다. 목표까지의 유클리드 거리를 쓰는 heuristic은 이 비용 아래에서도 최적성을 유지한다.

좁은 통로에서는 규칙 기반 yaw 재작성기가 동작한다. 경로 위 각 지점에서 양옆의 자유 폭 w_⊥(s)를 재고, 이 값이 임계 w_min 아래로 떨어지면 몸의 방향을 진행 방향에서 90도 회전시킨다. 회전 부호는 앞서는 어깨가 넓은 쪽에 오도록 고른다. 그 결과 이동 방향과 몸이 향하는 방향이 분리된 게걸음 형태의 옆걸음이 만들어진다.

재작성된 평면 trajectory는 base 속도 명령 u_k = (v_x, v_y, ω)_k로 바뀌어 SONIC 모션 플래너에 입력된다. SONIC은 약 800시간의 고품질 모션 캡처 데이터로 학습된 motion tracking 모델이다. 여기서 나온 결과에 PD 제어기로 경로 이탈을 보정하면 29개 관절 각도와 부유 base 자세로 이뤄진 참조 보행 M_ref를 얻는다. 이 보행은 부드럽지만 아직 3D 장애물을 인지하지 못한다. 평면 경로를 따라가고 좁은 통로에서 옆걸음을 할 뿐, 넘거나 숙이는 동작은 없다.

이 단계에서 IsaacSim으로 2Hz의 1인칭 RGB를 렌더링하고 Gemini 2.5 Flash로 VLN 지시문을 생성한다.

**Edit 단계**는 참조 보행을 whole-body 회피 동작으로 바꾼다. 보행의 타이밍, 위상, 스타일은 그대로 두고 장애물이 있는 구간에만 국소적으로 편집을 적용한다. 매 프레임 네 가지 목표를 갖는 whole-body 역기구학 문제를 푼다.

- 참조 자세 추종
- 발 접촉과 착지 목표
- 무게중심 목표
- potential field 링크 힘

장면의 voxel occupancy는 fast marching method로 3D signed distance field Φ(p)로 변환한다. 봉 같은 얇은 구조물은 해석적 SDF를 갖는 방향성 박스로 따로 표현해 여유 거리 질의가 연속적으로 유지되도록 했다. 편집은 계획 경로 주변 반폭 약 0.5m의 통로 안으로 제한한다. 이 통로 밖의 표본은 자유 공간으로 간주하므로, A*가 이미 우회한 잡동사니는 편집에 영향을 주지 않고 실제로 지나가야 하는 장애물만 반영된다.

안내 벡터장은 전진을 유도하는 경로 접선 τ̂와 회피를 유도하는 SDF 반발항을 합쳐 만든다.

```
g(p) = τ̂(p) + β · exp(−Φ̃(p)/σ) · ∇Φ̃(p) / ‖∇Φ̃(p)‖
```

가중치는 장애물 근처에서 반발항이 우세하도록 정했다. 힘은 어깨, 팔꿈치, 손목, 몸통과 선택적으로 무릎과 골반에 가한다. 발과 발목은 제외해 접촉 패턴이 참조 보행과 보행 적응 모듈에서만 결정되도록 했다. 각 링크의 힘은 강성 κ로 나눠 변위로 바꾼 뒤 링크별 상한 δ_max로 잘라내고, 다시 강성을 곱해 유사 힘으로 되돌린다. 이 유사 힘은 하드 제약이 아니라 부드러운 과제로 역기구학에 들어가고, 보행 전환 지점에서 생기는 불연속을 없애기 위해 시간 축으로 저역 통과 필터를 거친다.

squat 장애물에서는 힘의 수직 성분만 남겨 몸을 낮추는 신호로 쓰고, sidle 통로에서는 수평 성분이 몸통과 팔을 벽에서 밀어낸다. 링크별 힘을 무게중심 오프셋으로 모으고 잔차만 각 링크에 적용하면, 팔다리가 따로 반응하지 않고 몸 전체가 한 덩어리로 비켜난다.

머리 위 장애물을 일찍부터 안정적으로 피하도록 두 항을 추가했다.

| 항 | 해결하는 문제 | 동작 방식 |
|---|---|---|
| look-ahead | 원래 벡터장은 몸이 이미 천장 아래 들어갈 때까지 0에 가깝다 | 머리와 어깨 높이의 여러 지점을 앞쪽 여러 거리에서 미리 조사하고, 최소값이 여유 η 안에 들어오면 위반량에 비례하는 하향력을 더한다 |
| virtual head barrier | 숙이는 동작이 늦거나 불안정해진다 | 몸통 위 h만큼 떨어진 가상 머리점의 여유 b가 임계 b_m 아래로 떨어지면 부드러운 항과 강한 항으로 이뤄진 하향력을 더하고 몸통 변위 상한으로 잘라낸다 |

상체가 내려간 만큼은 crouch 활성도 α = clip(Δz/δ_max, 0, 1)로 환산돼 자세로 전달된다. 허리 피치 목표에 α θ_0를 더하고, 고관절 피치에 비례 편향을 주고, 무게중심 목표를 α c_z만큼 내린다. 무게중심을 함께 내려야 다리가 몸을 낮추게 되고, 그렇지 않으면 무게중심 과제가 몸을 다시 세워버린다. 구현은 허리만 굽히는 waist-only, 몸을 수직으로 내리는 com-drop, 허리와 골반과 고관절과 무릎과 발목과 무게중심을 함께 쓰는 full-squat 세 가지 preset을 지원한다. 웅크리는 동안에는 상체 참조 추종 항을 느슨하게 풀어 벡터장이 몸통을 다시 만들 수 있게 한다.

stride 장애물은 발이 직접 넘어야 하므로 상체 안내만으로 부족하다. 보행 적응 모듈이 참조 보행의 위상과 타이밍을 유지한 채 착지 지점만 온라인으로 다시 잡는다. 발이 떨어질 때마다 base를 계획 경로에 투영하고 짧은 거리만큼 앞을 조회해 경로 yaw 기준으로 착지 목표를 정한다. 이 목표는 참조 착지점에서 최대 변위 이내로 제한해, 역기구학이 도달 불가능한 발 위치를 좇지 않도록 막는다. 발자국 크기를 고려한 SDF 조사가 앞쪽 낮은 장애물을 찾아 그 구간 [d_near, d_far]과 윗면 높이 z_top을 돌려준다. z_top이 임계 z_bar 이하일 때만 넘기 동작이 발동하고, 그보다 높은 기하는 벽이나 천장으로 보고 옆이나 상체 층에 맡긴다. 넘을 수 있는 봉이면 착지 목표를 먼 쪽 가장자리 너머로 여유 m만큼 밀어낸다. 이는 장애물을 확실히 넘기 위한 조치이면서 동시에 하위 tracker가 전방으로 덜 도달하는 특성을 보정한다.

발의 스윙 궤도는 참조 발 경로를 새 끝점으로 변형하고 수직 여유 호를 더해 만든다.

```
p_swing(u) = p_ref(u) + (1−ū)·Δp_lift + ū·Δp_land + h_arc · ρ(u) · ẑ
```

ρ(u)는 4분의 1 사인으로 빠르게 올라가 이른 정점을 찍고 4분의 1 코사인으로 내려오는 비대칭 여유 프로파일이다. 대칭인 sin(πu) 호는 발이 떨어진 직후 봉을 건너야 하는 뒷다리에게 너무 낮다. 정점 높이 h_arc는 표본 위상마다 발자국 전체가 장애물 박스를 넘도록 매 걸음 따로 푼다. 무릎 굽힘 편향을 더해 다리를 편 채 넘기보다 무릎을 굽혀 넘도록 유도하고, 낮은 장애물이 연달아 나오면 짧은 발판 순서를 만들어 한 번의 긴 걸음 대신 자연스러운 길이의 걸음으로 통과한다.

발 재설정이 지지면을 옮기는 동안 골반 참조는 원래 보행을 따르기 때문에 몸이 뒤처진다. 이 상태로 넘기를 시도하면 앞으로 나아가지 못하고 제자리에서 기울어진다. 저자는 골반 참조를 계획된 지지면 쪽으로 옮기는 root redirection과 역기구학의 무게중심 목표를 함께 옮기는 CoM redirection 두 보정을 지수 이동 평균으로 완만하게 적용한다. 봉을 건너는 동안에는 두 보정의 갱신 주기를 낮은 지연으로 전환해 base가 다리와 함께 전진하게 한다.

각 프레임은 두 번에 걸쳐 푼다. 첫 번째는 발과 지지면과 무게중심 목표에 맞춰 참조를 고치는 하체 투영이고, 두 번째는 그 결과를 추종하면서 potential field 힘을 적용하는 전신 순응 역기구학이다. 발 고정 비용을 크게 주어 자세 편집이 발 미끄러짐을 유발하지 않게 했다. 출력은 편집된 29-DoF trajectory M_edit다.

**Track 단계**는 실행 가능성 필터다. M_edit는 기구학적으로만 만들어졌기 때문에 스윙이 지나치게 빠르거나 웅크림이 과격해 동역학적으로 불가능할 수 있다. 편집된 참조를 MuJoCo 안의 SONIC tracker에 프레임 단위로 흘려보내 물리 아래에서 추종시키고, 실패하거나 충돌하는 trajectory는 버린다. 같은 tracker를 배포에도 쓰기 때문에 합성한 학습 신호와 실제 실행 조건이 일치한다.

중요한 선택은 추종된 결과를 학습 신호로 쓰지 않는다는 점이다. 추종 결과를 그대로 쓰면 사람다운 동작 품질이 떨어지므로, 검증만 tracker에 맡기고 학습 신호로는 Plan과 Edit 단계에서 나온 충돌 없는 참조 동작을 쓴다. 검증된 trajectory에 대해 RGB를 다시 렌더링하고 지시문을 갱신한다.

최종 데이터셋은 6만 4,633개 trajectory이며, PET에 86 GPU 시간, 렌더링에 125 GPU 시간, 합계 211 RTX PRO 6000 GPU 시간이 들었다.

### 3.3 아키텍처와 학습

TANGO는 vision-language backbone(system-2), MM-DiT action expert(system-1), 기성 motion tracker(system-0)로 이뤄진 triple-system 아키텍처다. backbone과 action expert는 함께 학습하고, tracker는 학습하지 않는다.

**system-2.** Qwen2.5VL-7B를 쓰되 가중치를 InternVLA-N1로 warm-start해 주행 사전 지식을 물려받는다. 저자는 이 선택의 이유로 공개 여부와 주행 pre-training을 들면서, 다른 VLN backbone으로 교체 가능하다고 밝힌다. 각 timestep에서 전방과 하방 영상 (I^fr_t, I^dn_t)을 세로로 쌓아 한 장의 프레임 I_t로 만든다.

긴 영상 이력을 제한된 메모리 안에서 다루기 위해 Budget-Aware Token Sampling을 적용한다. 시점 T에서 모든 과거 프레임을 다음 확률로 독립 표본한다.

```
P(t) = (1 − ε)·e^{k(t−T)/T} + ε,  t ∈ [1, T]
```

ε와 k가 시간 집중도를 조절한다. 표본된 프레임의 시각 특징은 GridPool로 공간 격자 풀링을 거치는데, 최근 observation에는 촘촘한 격자를, 오래된 이력에는 성긴 격자를 배정한다. 이렇게 줄인 시각 토큰과 지시문을 VLM에 넣어 잠재 컨텍스트 토큰 z를 얻는다.

**system-1.** 잠재 z와 현재 proprioception을 조건으로 미래 whole-body 참조 chunk를 예측한다. 회귀를 쉽게 하려고 학습 목표를 안정화된 형태로 바꿨다.

```
ã_i = { q_{d,i}, r̃_{b,i}, Δx_i, Δy_i, Δψ_i }
```

r̃_{b,i}의 base yaw는 chunk의 첫 프레임을 기준으로 상대 표현하고, 보조항 (Δx_i, Δy_i, Δψ_i)이 chunk 수준의 평면 이동량과 방향 변화를 명시적으로 담는다. 이 평면 예측은 보조 목표이기 때문에, ablation에서 평면 변형인 Ours-2D를 만들 때 활용된다.

action expert는 flow matching으로 학습하는 flow 기반 MM-DiT다. 오프라인 학습과 온라인 스트리밍 실행을 맞추기 위해 학습 시점에 real-time action chunking을 적용한다. 무작위로 고른 길이 d의 확정 접두부를 조건으로 주고 나머지 구간을 채우게 하는 방식이다. 생성된 chunk는 A_{t:t+H}로 복원돼 SONIC tracker로 전달된다.

**결합 학습 목표.** system-2에 텍스트 디코딩 분기를 붙이고 VideoQA 표본을 함께 학습해 일반 지식을 유지한다. 목표 함수는 다음과 같다.

```
L = L_CE + w_FM · L_FM,   w_FM = 20
```

L_CE는 VideoQA의 교차 엔트로피 손실이고 L_FM은 flow matching 손실이다. 전체 학습은 1 epoch, 학습률 1×10^-5로 진행했다.

부록 A는 학습 세부를 덧붙인다. 흔치 않은 whole-body 동작을 강조하기 위해 데이터 수준과 손실 수준 두 곳에서 보정한다. rollout을 action chunk로 바꾼 뒤 큰 회전, 옆걸음, 웅크림, 넘기, 웅크림과 넘기가 섞인 구간을 상향 표본하는데, 특히 넘기와 옆걸음은 빈도가 낮고 신호가 약해 가장 크게 키운다. 손실에서는 동작별로 관련 관절 차원에 더 큰 가중치를 준다. 웅크림에는 고관절과 척추와 무릎, 넘기에는 척추와 어깨, 섞인 동작에는 둘의 합집합, 옆걸음에는 어깨와 몸통 좌표계 이동 차원이다. 학습은 A100 8장을 갖춘 노드 16대에서 약 7시간, 합계 896 A100 GPU 시간이 걸렸다.

### 3.4 배포

**시뮬레이션 배포.** 렌더링 품질과 물리 정확도를 동시에 얻기 위해 디지털 트윈 순간이동 방식을 쓴다. MuJoCo가 하위 tracker 실행과 물리 시뮬레이션을 맡고, IsaacSim에 있는 디지털 트윈을 순간이동시켜 사실적인 시각 observation을 얻는다. 카메라 자세는 주어진 로봇 자세에서 순기구학으로 계산한다.

**실제 로봇 배포.** 연산이 무거운 VLA와 고주파 whole-body control을 분리하는 클라우드 엣지 구조다.

| 구성 요소 | 실행 위치 | 동작 주기 |
|---|---|---|
| VLA(system-2와 system-1) | RTX PRO 6000 서버 | 0.5초마다 추론 |
| SONIC tracker(system-0) | 로봇에 탑재한 Jetson Orin NX | 약 200Hz 제어 루프 |
| 카메라 전송 | RealSense D455(전방)와 D435i(하방) | 약 20ms 지연 |

서버가 전역 시계 역할을 하며 0.5초마다 추론하고, 이는 30Hz에서 15개 action에 해당하는 execution horizon과 맞춘다. 예측된 chunk는 로봇으로 돌아와 50Hz로 재샘플링된 뒤 SONIC tracker가 실행한다. 지시문 입력, VLA 출력과 로봇 observation 모니터링, 제어 신호 전송을 담당하는 웹 기반 제어판도 함께 만들었다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 평가 지표

주행 성능은 표준 VLN 지표로 잰다. 성공 임계 δ는 표준 관행을 따라 측지 거리 3m다.

| 지표 | 정의 | 방향 |
|---|---|---|
| NE (Navigation Error) | 최종 정지 위치와 목표 사이 측지 거리의 평균 | 낮을수록 좋다 |
| SR (Success Rate) | 최종 정지 위치가 목표에서 3m 이내인 episode 비율 | 높을수록 좋다 |
| OSR (Oracle Success Rate) | 실행 trajectory가 한 번이라도 목표 반경에 들어간 비율 | 높을수록 좋다 |
| SPL (Success weighted by Path Length) | 성공 여부에 최단 경로 대비 실제 경로 길이 비율을 곱한 값 | 높을수록 좋다 |
| CR (Collision Rate) | 한 번 이상 충돌이 발생한 episode 비율 | 낮을수록 좋다 |

실제 환경 표의 Coll.은 CR과 다른 지표다. 15회 시행에서 기록된 충돌 횟수의 평균이며 비율이 아니라 개수다.

### 4.2 VLNVerse 벤치마크

모든 방법을 VLNVerse-train의 3,963개 trajectory로 학습하고, VLNVerse-seen 423개와 VLNVerse-unseen 825개로 평가했다. InternVLA-N1과 Uni-NaVid는 원 논문 설정을 따라 5 epoch fine-tuning했고, CMA, Seq2Seq, RDP, HNR 결과는 VLNVerse 팀이 제공했다.

| 방법 | low-level control | Seen NE | Seen OSR | Seen SR | Seen SPL | Unseen NE | Unseen OSR | Unseen SR | Unseen SPL |
|---|---|---|---|---|---|---|---|---|---|
| CMA | 없음 | 5.36 | 59.81 | 37.35 | 33.36 | 5.16 | 62.79 | 31.15 | 27.92 |
| RDP | 없음 | 4.02 | 68.09 | 47.28 | **41.69** | 3.75 | **71.93** | 48.60 | **42.72** |
| Seq2Seq | 없음 | 4.78 | 44.68 | 32.62 | 30.39 | 4.36 | 49.58 | 35.03 | 33.37 |
| HNR | 없음 | 미보고 | 미보고 | 36.34 | 32.10 | 미보고 | 미보고 | 32.95 | 29.56 |
| InternVLA-N1 | 없음 | 3.91 | 62.50 | 51.56 | 34.37 | 4.09 | 64.13 | 45.56 | 34.98 |
| Uni-NaVid | 없음 | 4.31 | 60.62 | 51.88 | 39.72 | 3.97 | 62.50 | 45.00 | 39.42 |
| TANGO | 있음 | **3.90** | **70.31** | **54.69** | 40.18 | **3.72** | 71.07 | **52.89** | 40.18 |

TANGO는 두 분할 모두에서 가장 높은 SR과 가장 낮은 NE를 기록했고, SPL과 OSR은 RDP와 비슷한 수준이다. 비교 조건이 TANGO에 불리하다는 점을 짚어둘 필요가 있다. 다른 방법은 하위 제어 모듈이 없어 VLNVerse 원 규약대로 teleportation 조건에서 평가되지만, TANGO만 실제 물리 제약 아래에서 움직인다. SPL이 상대적으로 낮은 이유로 저자는 하위 tracker의 보수적 동작을 든다. 장애물 주변에서 더 안전하지만 덜 직선적인 경로를 고르는 경향이다.

### 4.3 어수선한 환경 통과 성능

장애물을 삽입한 augmented VLNVerse-unseen에서 InternVLA-N1을 두 가지 하위 실행기와 조합해 비교했다. 하나는 평면 속도 명령을 받는 Unitree 공식 강화학습 제어기에 MPC를 붙인 구성이고, 다른 하나는 3D 장면에서 회피 동작을 수행하는 HumanoidPF generalist policy다. 추론 시 Unitree 제어기는 예측 trajectory에서 해석한 2D 속도 명령을 받고, HumanoidPF는 trajectory 위 1.2m 앞의 waypoint를 50Hz로 추종한다.

| 방법 | NE | SR | SPL | CR |
|---|---|---|---|---|
| InternVLA-N1 zero-shot + Unitree WBC와 MPC | 5.34 | 26.67 | 11.92 | 19.03 |
| InternVLA-N1 zero-shot + HumanoidPF | **3.19** | 35.29 | 24.35 | 16.11 |
| InternVLA-N1 fine-tuning + Unitree WBC | 4.57 | 35.00 | 17.38 | 17.49 |
| InternVLA-N1 fine-tuning + HumanoidPF | 4.04 | 41.88 | 29.49 | 15.81 |
| TANGO | 4.01 | **43.75** | **31.83** | **9.90** |

TANGO는 SR과 SPL이 가장 높고 CR이 가장 낮다. 가장 강한 baseline과 비교하면 CR을 15.81%에서 9.90%로 5.91%p 낮췄고, SR은 1.87%p, SPL은 2.34점 앞선다. 조건 차이도 함께 볼 필요가 있다. HumanoidPF는 3D 기하 정보를 위해 LiDAR를 추가로 쓰지만 TANGO는 RGB만 입력받는다.

### 4.4 실제 환경 실험

Unitree G1에서 실제 주행 데이터 없이 zero-shot으로 평가했다. 정성 평가는 long-horizon 주행, 좁은 통로 옆걸음, 머리 위 장애물 아래 숙이기, 바닥 장애물 넘기 네 장면에서 진행했다.

정량 평가는 fine-tuning한 InternVLA-N1과 Unitree WBC 조합을 상대로 세 조건에서 진행했다. 각 조건은 장면 3개에 장면당 5회 시행이므로 조건당 15회다.

| 조건 | 설명 | InternVLA-N1 SR | InternVLA-N1 Coll. | TANGO SR | TANGO Coll. |
|---|---|---|---|---|---|
| 짧은 2D 구간 | 회전 1회, 약 10m | 11/15 | 1.40 | 12/15 | 0.40 |
| 긴 2D 구간 | 회전 2~3회, 약 30m | 6/15 | 3.47 | 8/15 | 1.07 |
| 어수선한 3D 구간 | 난도 높은 장애물 1개 | 6/15 | 1.93 | 10/15 | 0.73 |

TANGO는 세 조건 모두에서 성공 횟수가 많고 충돌이 적다. 격차는 어수선한 3D 구간에서 가장 크다. 이 조건의 지시문은 넘기, 옆걸음, 숙이기처럼 필요한 통과 동작을 명시적으로 지정한다.

### 4.5 ablation

**action space.** 원본 VLNVerse-unseen에서 29-DoF whole-body action space의 기여를 분리했다. 평면 예측이 보조 목표이므로 평면 변형 Ours-2D를 만들어 비교할 수 있다. teleportation과 Unitree 제어기 실행 두 조건에서 평가했다.

| 방법 | low-level control | SR | SPL |
|---|---|---|---|
| InternVLA-N1 | 없음 | 43.69 | 35.74 |
| Ours-2D | 없음 | 45.74 | 35.44 |
| InternVLA-N1 + Unitree 제어기와 MPC | 있음 | 42.37 | 22.50 |
| Ours-2D + Unitree 제어기와 MPC | 있음 | 26.67 | 8.34 |
| TANGO | 있음 | **52.89** | **40.18** |

두 평면 policy 모두 teleportation에서 물리 실행으로 넘어갈 때 성능이 크게 떨어진다. Ours-2D는 SR이 45.74%에서 26.67%로, SPL이 35.44에서 8.34로 내려간다. 기존 주행 policy를 체화된 환경으로 옮기기 어렵다는 점을 보여주는 대목이다. TANGO는 하위 제어 제약 아래에서도 안정적으로 동작한다. 다만 zero-shot InternVLA-N1 행은 학습 조건이 달라 action 표현만 분리해 비교하지는 못한다는 점을 저자가 명시한다.

**핵심 구성 요소.** augmented VLNVerse-unseen에서 real-time action chunking, 모션 편집, 하위 tracker를 각각 검토했다. SR과 CR은 백분율이고 SPL은 100을 곱한 값이다.

| 조건 | SR | SPL | CR |
|---|---|---|---|
| real-time action chunking 제거 | 10.94 | 10.94 | 14.60 |
| 모션 편집 제거 | 36.25 | 30.36 | 20.60 |
| SONIC을 ScaleBFM으로 교체 | 40.94 | 29.65 | **9.10** |
| 기본 설정 | **43.75** | **31.83** | 9.90 |

real-time action chunking을 빼면 SR이 43.75%에서 10.94%로 32.81%p 하락하고 CR은 9.90%에서 14.60%로 오른다. 세 조건 중 영향이 가장 크며, chunk 사이의 동작 연속성이 실행 단계에서 핵심임을 보여준다. 모션 편집을 빼면 SR이 36.25%로 내려가고 CR이 20.60%로 올라, 장애물을 인지한 학습 신호가 충돌 회피에 기여함을 나타낸다. SONIC을 ScaleBFM으로 바꾼 경우 세 지표 모두 기본 설정과 3점 이내라, 다른 범용 whole-body 제어기와도 호환됨을 시사한다.

### 4.6 데이터셋 규모와 생성 비용

| 데이터셋 | trajectory 수 | PET GPU 시간 | 렌더링 GPU 시간 | 합계 |
|---|---|---|---|---|
| VLNVerse 원본 | 3,478 | 3 | 8 | 11 |
| VLNVerse augmentation | 3,784 | 6 | 17 | 23 |
| SAGE-3D 원본 | 28,678 | 20 | 45 | 65 |
| SAGE-3D augmentation | 28,693 | 57 | 55 | 112 |
| 합계 | **64,633** | **86** | **125** | **211** |

이 비용은 RTX PRO 6000 GPU 시간 기준이며 trajectory 생성과 렌더링만 포함한다. VLA 학습 비용은 별도로, A100 기준 896 GPU 시간이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자가 밝힌 한계는 두 가지다.

첫째, 하위 tracker의 능력이 더 복잡한 환경으로의 배포를 제약한다. 계단을 오르는 상황이 예로 제시된다. tracker가 할 수 없는 동작은 policy가 예측해도 실행되지 않는다.

둘째, 시각 입력이 RGB에만 의존한다. 어수선하거나 시각적으로 모호하거나 조도가 낮은 환경에서 장면 이해가 제한될 수 있으며, 깊이 카메라와 LiDAR가 도움이 될 것으로 본다.

본문에서 드러나는 추가 제약도 있다. SPL이 RDP보다 낮은 것은 tracker의 보수적 경로 선택 때문으로 설명되며, 안전성과 효율의 상충이 아직 해소되지 않았음을 뜻한다. 어수선한 실제 환경 시행에서 쓴 지시문은 필요한 통과 동작을 명시적으로 지정한 형태다. 부록 C.1은 충돌 회피 지시문을 포함하면 수렴과 회피 동작 학습에 도움이 된다고 적으면서, 이것이 통제된 언어 ablation이 아니라 경험적 관찰이라는 점을 함께 밝힌다.

향후 방향으로 저자는 TANGO를 foundation model 삼아 loco-manipulation 방향으로 확장하는 것을 제시한다. 몸 전체를 조율해 쓰는 과제로 나아가겠다는 구상이다.

## 6. 관련 연구 (Related Work)

논문은 관련 연구를 세 가지로 정리한다.

| 계열 | 대표 연구 | TANGO와의 차이 |
|---|---|---|
| VLN을 위한 대형 모델 | NaVid, Uni-NaVid, InternVLA-N1, OmniVLA, NaVILA | 시각 주행을 평면 trajectory 계획으로 다뤄 실제 배포 시의 물리 격차를 다루지 않는다. TANGO는 물리 인지를 학습 단계에 내장한다 |
| 어수선한 환경 통과 | humanoid parkour 계열, HumanoidPF, MM-Nav | parkour는 짧은 상호작용에 집중하고, HumanoidPF는 확장이 어려우며, VLN 계열 통과 연구는 2D 정식화 탓에 우회 동작에 머문다 |
| 대규모 학습 기반 whole-body control | GR00T-N1.6, Ψ0, WholeBodyVLA(분리 설계), LeVERB, HumanoidVLA, PhysiFlow(latent 설계) | 분리 설계는 상체만 예측하고 하체는 명령으로 넘겨 whole-body 조율이 제한된다. latent 설계는 전용 디코더가 필요하다. TANGO는 실행 가능한 whole-body action을 직접 예측하고 범용 tracker에 맡긴다 |

이 밖에 dual-system VLA 설계를 참고해 flow matching 기반 action expert를 system-1로 두고 real-time action chunking으로 학습했다는 점을 밝힌다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| TANGO | Traversability-Aware Vision-Language Navigation. 통과 가능성을 인지하는 지시문 기반 주행을 뜻하는 이 논문의 시스템 이름 |
| PET | Plan, Edit, Track. 경로 계획, 장애물 대응 편집, 물리 검증 세 단계로 충돌 없는 whole-body 동작을 자동 합성하는 데이터 파이프라인 |
| stride / sidle / squat | 이 논문이 정의한 세 가지 통과 동작. 각각 바닥 장애물 넘기, 좁은 통로 옆걸음, 머리 위 장애물 아래 숙이기 |
| SONIC | 약 800시간의 모션 캡처 데이터로 학습된 humanoid motion tracking 모델. PET의 Track 단계와 배포의 system-0에 모두 쓰인다 |
| BATS | Budget-Aware Token Sampling. 제한된 메모리 안에서 긴 영상 이력을 다루기 위해 최근 프레임에 높은 확률을 주어 표본하는 기법 |
| GridPool | 시각 특징을 공간 격자로 풀링하는 연산. 최근 observation에 촘촘한 격자를, 오래된 이력에 성긴 격자를 배정한다 |
| VLNVerse / SAGE-3D | 이 연구가 augmentation의 출발점으로 삼은 실내 주행 데이터셋. IsaacSim에서 사실적으로 렌더링된 장면을 제공한다 |
| HumanoidPF | 강화학습으로 실내 충돌 회피 통과를 학습한 humanoid 연구. 장애물 삽입 방식과 potential field 안내를 TANGO가 참고했고 baseline으로도 쓰인다 |
| CR | Collision Rate. 한 번 이상 충돌이 일어난 episode의 비율로 정의한 안전 지표 |
| Coll. | 실제 환경 시행에서 15회 평균 충돌 횟수. CR과 달리 한 시행 안의 다중 충돌을 세며 비율이 아니다 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | 실제 사무실에서의 whole-body 통과 장면 4컷 | caption-region | ★ wiki 권장 (overview) |
| fig02 | 5 | 아키텍처와 PET 데이터 파이프라인 | caption-region | ★ wiki 권장 (architecture) |
| fig03 | 7 | 실제 배포 서버 클라이언트 구조와 동작 주기 | caption-region | ★ wiki 권장 (deployment) |
| fig04 | 10 | 실제 환경 정성 결과 5장면과 지시문 | caption-region | (확인 필요, 세로로 길다) |
| fig05 | 19 | stride, sidle, squat 장애물 augmentation 예시 | caption-region | ★ wiki 권장 (data) |
| tab01 | 8 | VLNVerse 벤치마크 결과 | table-region | ★ wiki 권장 (result) |
| tab02 | 9 | augmented VLNVerse-unseen 통과 성능 | table-region | ★ wiki 권장 (result) |
| tab03 | 9 | 실제 로봇 정량 결과 | manual | ★ wiki 권장 (result) |
| tab04 | 11 | action space ablation | manual | (확인 필요, 본문 표로 대체 가능) |
| tab05 | 11 | 핵심 구성 요소 ablation | table-region | ★ wiki 권장 (ablation) |
| tab06 | 20 | 데이터셋 규모와 생성 비용 | table-region | (확인 필요, 본문 표로 대체 가능) |
