---
title: "Wall-OSS-0.5 Technical Report: Pretrain Once, Act Anywhere"
type: paper
year: 2026
category: physical-ai
source: x-square-robot-2026-wall-oss-05-technical-report.md
raw_path: /home/sguys99/project/ai-wiki/raw/papers/x-square-robot-2026-wall-oss-05-technical-report.pdf
raw_filename: "x-square-robot-2026-wall-oss-05-technical-report.pdf"
source_collection: external
authors: "X Square Robot Team — Ryan Yu·Pushi Zhang·Starrick Liu·Brae Liu·Miracle Kang·Shalfun Li 외 (총 27인, Project Lead Lucy Liang, 교신 Hao Wang)"
arxiv_id: "2605.30877"
url: "https://arxiv.org/abs/2605.30877"
tags: [physical-ai, vla, manipulation, robot-learning, edge-inference]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/x-square-robot-2026-wall-oss-05-technical-report/fig01.png
    raw: raw/papers/x-square-robot-2026-wall-oss-05-technical-report-figures/fig01.png
    caption: "Wall-OSS-0.5 능력 요약 — 왼쪽은 pre-training 스텝이 늘수록 평균 task progress가 25.5에서 51.1로 오르는 곡선, 가운데는 다섯 능력 축의 레이더 비교, 오른쪽은 fine-tuning 없이 17과제 중 4개가 80% 이상, π0.5 대비 +17.5pp, embodied grounding +21.8pp라는 세 수치. 아래 (a)~(h)는 fine-tuning 없이 실행한 실기기 과제 장면이다"
    page: 2
    bbox_norm: [0.1078, 0.0909, 0.8922, 0.6076]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/x-square-robot-2026-wall-oss-05-technical-report/fig02.png
    raw: raw/papers/x-square-robot-2026-wall-oss-05-technical-report-figures/fig02.png
    caption: "gradient-bridged co-training과 MoT 라우팅 — 멀티모달 CE는 vision-language 지식을 잡아 두는 anchor, action 토큰 CE는 backbone을 제어 쪽으로 미는 gradient bridge, flow matching은 배포 시 쓰는 연속 action을 학습한다. VL Expert와 Action Expert는 Joint Attention을 공유해 gradient가 양쪽으로 흐른다"
    page: 4
    bbox_norm: [0.1078, 0.0909, 0.8922, 0.4107]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/x-square-robot-2026-wall-oss-05-technical-report/fig03.png
    raw: raw/papers/x-square-robot-2026-wall-oss-05-technical-report-figures/fig03.png
    caption: "Vision-Aligned RVQ Action Tokenizer 구조 — action chunk를 encoder로 압축해 residual vector quantization으로 다단계 이산 토큰을 만들고, action decoder가 원 chunk를 복원하는 한편 feature predictor가 미래 observation feature를 맞힌다. 얼린 context encoder와의 contrastive learning이 토큰을 시각 feature 쪽으로 당긴다"
    page: 5
    bbox_norm: [0.1078, 0.0909, 0.8921, 0.2962]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/x-square-robot-2026-wall-oss-05-technical-report/fig04.png
    raw: raw/papers/x-square-robot-2026-wall-oss-05-technical-report-figures/fig04.png
    caption: "pre-training에 쓴 manipulation 데이터 지형 — 왼쪽은 자체 수집분과 RoboMIND·AgiBotWorld·DROID·BRIDGE v2 등 10개 open-source 부분집합의 trajectory 구성, 오른쪽은 embodiment 형상 다양성"
    page: 9
    bbox_norm: [0.1078, 0.0909, 0.8922, 0.3515]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/x-square-robot-2026-wall-oss-05-technical-report/fig05.png
    raw: raw/papers/x-square-robot-2026-wall-oss-05-technical-report-figures/fig05.png
    caption: "embodied bridge 데이터의 네 층위 — 장면 이해, 물체 grounding과 2D 경로, 공간 관계와 다시점 pointing, 과제 수준 계획. 각 층위마다 실제 모델 출력 예시가 붙는다"
    page: 11
    bbox_norm: [0.1079, 0.3566, 0.8922, 0.7955]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/x-square-robot-2026-wall-oss-05-technical-report/fig06.png
    raw: raw/papers/x-square-robot-2026-wall-oss-05-technical-report-figures/fig06.png
    caption: "체크포인트별 zero-shot 실기기 성적 — (a) seen 12과제와 unseen 5과제의 평균 task progress 추이, (b) 의미 이해·강체·변형체·정밀·장기 다섯 범주별 추이"
    page: 13
    bbox_norm: [0.0832, 0.0655, 0.9284, 0.3108]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/x-square-robot-2026-wall-oss-05-technical-report/fig07.png
    raw: raw/papers/x-square-robot-2026-wall-oss-05-technical-report-figures/fig07.png
    caption: "fine-tuning 과제 수를 5 → 10 → 19로 늘렸을 때의 성적 — 공유 5과제는 73.96 → 74.75 → 83.75, 공유 10과제는 59.98 → 64.78, 새로 넣은 9과제는 65.59다"
    page: 16
    bbox_norm: [0.1078, 0.0909, 0.8923, 0.4357]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/x-square-robot-2026-wall-oss-05-technical-report/fig08.png
    raw: raw/papers/x-square-robot-2026-wall-oss-05-technical-report-figures/fig08.png
    caption: "co-training 전후 멀티모달 능력 변화 — Embodied Grounding +21.8, Where2Place +11.0, EO-Bench +3.9인 반면 ERQA −5.5, RealWorld VQA −15.0이다"
    page: 17
    bbox_norm: [0.0643, 0.0593, 0.9717, 0.3688]
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/x-square-robot-2026-wall-oss-05-technical-report/fig09.png
    raw: raw/papers/x-square-robot-2026-wall-oss-05-technical-report-figures/fig09.png
    caption: "embodied 장면에서의 grounding·공간 추론 정성 비교 (Wall-OSS-0.5 vs Qwen2.5-VL-3B)"
    page: 18
    bbox_norm: [0.1461, 0.0909, 0.8539, 0.5853]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/x-square-robot-2026-wall-oss-05-technical-report/fig10.png
    raw: raw/papers/x-square-robot-2026-wall-oss-05-technical-report-figures/fig10.png
    caption: "학습 전략 비교 — (a) 밑바닥 학습 5과제에서 flow only 36.68, stop-grad 31.93, stop-grad 후 co-train 49.58, co-train 57.00. (b) fine-tuning 단계에서도 co-training 우위가 이어진다"
    page: 19
    bbox_norm: [0.1148, 0.0909, 0.8851, 0.3694]
    strategy: caption-region
    curated: true
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/x-square-robot-2026-wall-oss-05-technical-report/fig11.png
    raw: raw/papers/x-square-robot-2026-wall-oss-05-technical-report-figures/fig11.png
    caption: "LIBERO에서의 action-space loss와 velocity-space loss 비교 곡선"
    page: 20
    bbox_norm: [0.0915, 0.0708, 0.5642, 0.3324]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/x-square-robot-2026-wall-oss-05-technical-report/fig12.png
    raw: raw/papers/x-square-robot-2026-wall-oss-05-technical-report-figures/fig12.png
    caption: "tokenizer만 바꾼 통제 실험 — VQA 정확도는 75.7%에서 77.5%로, 실기기 4과제 평균 task progress는 29.3에서 48.1로 올랐다"
    page: 20
    bbox_norm: [0.1078, 0.4639, 0.8922, 0.751]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/x-square-robot-2026-wall-oss-05-technical-report/tab01.png
    raw: raw/papers/x-square-robot-2026-wall-oss-05-technical-report-figures/tab01.png
    caption: "open-source 멀티모달 데이터 분류 — 일반 vision-language, embodied perception, embodied cognition 세 범주와 각 데이터셋"
    page: 11
    bbox_norm: [0.1082, 0.1646, 0.8918, 0.7078]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/x-square-robot-2026-wall-oss-05-technical-report/tab02.png
    raw: raw/papers/x-square-robot-2026-wall-oss-05-technical-report-figures/tab02.png
    caption: "체크포인트별 zero-shot 평균 task progress — seen 26.1 → 50.0, unseen 24.2 → 53.6, 전체 25.5 → 51.1"
    page: 13
    bbox_norm: [0.1155, 0.4427, 0.8845, 0.5385]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/x-square-robot-2026-wall-oss-05-technical-report/tab03.png
    raw: raw/papers/x-square-robot-2026-wall-oss-05-technical-report-figures/tab03.png
    caption: "400k 체크포인트에서 task progress 60 이상인 zero-shot 과제 — Block Sorting 100, Fruit Sorting 96, Ring Stacking 86, Rope Tightening 82(unseen), Cup Grasping 64, Bean Pouring 60(unseen)"
    page: 14
    bbox_norm: [0.1155, 0.5269, 0.8845, 0.6734]
    strategy: table-region
    curated: true
  - id: tab04
    label: Table 4
    kind: table
    file: assets/x-square-robot-2026-wall-oss-05-technical-report/tab04.png
    raw: raw/papers/x-square-robot-2026-wall-oss-05-technical-report-figures/tab04.png
    caption: "실기기 fine-tuning baseline 비교 — manipulation 10과제·reasoning 5과제 평균에서 Wall-OSS-0.5 61.1/59.3/60.5, π0.5 35.0/58.9/43.0, DreamZero 33.7/32.7/33.4"
    page: 15
    bbox_norm: [0.2453, 0.1316, 0.7547, 0.2202]
    strategy: table-region
    curated: true
  - id: tab05
    label: Table 5
    kind: table
    file: assets/x-square-robot-2026-wall-oss-05-technical-report/tab05.png
    raw: raw/papers/x-square-robot-2026-wall-oss-05-technical-report-figures/tab05.png
    caption: "부록 — seen 과제별 zero-shot task progress. tab06과 같은 페이지 밴드를 잡아 크롭이 겹친다"
    page: 29
    bbox_norm: [0.1078, 0.2541, 0.8922, 0.4823]
    strategy: table-region
    low_confidence: true
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/x-square-robot-2026-wall-oss-05-technical-report/tab06.png
    raw: raw/papers/x-square-robot-2026-wall-oss-05-technical-report-figures/tab06.png
    caption: "부록 — unseen 과제별 zero-shot task progress. tab05와 바이트 동일한 크롭이다"
    page: 29
    bbox_norm: [0.1078, 0.2541, 0.8922, 0.4823]
    strategy: table-region
    low_confidence: true
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/x-square-robot-2026-wall-oss-05-technical-report/tab07.png
    raw: raw/papers/x-square-robot-2026-wall-oss-05-technical-report-figures/tab07.png
    caption: "부록 — 멀티모달 이해 벤치마크 항목별 점수"
    page: 30
    bbox_norm: [0.1078, 0.1316, 0.8922, 0.3674]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/x-square-robot-2026-wall-oss-05-technical-report/tab08.png
    raw: raw/papers/x-square-robot-2026-wall-oss-05-technical-report-figures/tab08.png
    caption: "부록 — fine-tuning 평가 과제별 결과"
    page: 30
    bbox_norm: [0.1078, 0.4698, 0.8922, 0.7193]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/x-square-robot-2026-wall-oss-05-technical-report/tab09.png
    raw: raw/papers/x-square-robot-2026-wall-oss-05-technical-report-figures/tab09.png
    caption: "부록 — 다중 과제 fine-tuning 과제별 상세"
    page: 31
    bbox_norm: [0.1078, 0.1643, 0.8922, 0.4692]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/x-square-robot-2026-wall-oss-05-technical-report/tab10.png
    raw: raw/papers/x-square-robot-2026-wall-oss-05-technical-report-figures/tab10.png
    caption: "부록 — 실기기 평가 과제 설명과 채점 기준"
    page: 32
    bbox_norm: [0.1078, 0.1169, 0.8942, 0.9059]
    strategy: table-region
    curated: false
---

## 요약 (Summary)

Wall-OSS-0.5는 VLA pre-training의 성적을 fine-tuning 이후가 아니라 pre-training된 체크포인트 그대로 실기기에서 재도록 설계를 바꾼 4B 오픈소스 모델이다. 물음이 하나로 좁혀져 있다. VLA pre-training은 그 자체로 실행 가능한 로봇 동작을 만들어내는가, 아니면 downstream policy 학습의 더 나은 초기값을 줄 뿐인가. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다.

17과제 실기기 zero-shot 스위트에서 몇 과제는 fine-tuning 없이도 높은 task progress를 낸다. 같은 체크포인트를 fine-tuning하면 15과제 평균 60.5%로 π0.5를 17.5%p 앞선다.

방법 쪽 핵심은 gradient-bridged co-training이다. 이산 action 토큰의 cross-entropy가 VLM에 익숙한 인터페이스로 backbone을 세게 밀어 주고, grounding된 멀티모달 데이터의 cross-entropy가 vision-language 능력을 붙잡아 두며, flow matching이 배포 시 실제로 쓰는 연속 action 생성기를 학습한다. flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다.

![[assets/x-square-robot-2026-wall-oss-05-technical-report/fig01.png]]
*Figure 1: 왼쪽은 pre-training 스텝이 늘수록 평균 task progress가 25.5에서 51.1로 오르는 곡선, 가운데는 다섯 능력 축의 레이더 비교, 오른쪽은 fine-tuning 없이 17과제 중 4개가 80% 이상이라는 요약. 아래 (a)~(h)는 fine-tuning 없이 실행한 실기기 과제 장면 (X Square Robot 2026, p.2)*

## 주요 기여 (Key Contributions)

pre-training 체크포인트를 초기값이 아니라 policy 그 자체로 평가하는 프로토콜을 세운 게 첫째다. 저자들은 지금까지 VLA 논문의 성적표가 거의 예외 없이 과제별 fine-tuning 이후에 찍혔기 때문에 이 물음이 열려 있었다고 본다.

둘째는 세 목표의 역할 분담을 gradient 관점에서 규명한 것이다. 학습 초기를 지나면 flow matching이 backbone 갱신에서 차지하는 몫은 5% 남짓으로 안정되고 나머지를 두 cross-entropy 항이 가져간다. 어느 하나를 빼거나 gradient를 끊으면 실기기 성적이 떨어진다.

셋째는 이를 규모에서 굴리는 설계 세 가지다. 층마다 VL Expert와 Action Expert를 나누되 attention은 공유하는 Mixture-of-Transformers backbone, 규칙 기반 FAST tokenizer를 대체하는 학습형 Vision-Aligned RVQ Action Tokenizer, flow matching 손실을 velocity가 아니라 원래 action 공간에 거는 Action-Space Supervision이다.

넷째는 배포 스택이다. CUDA Graph 캡처와 융합 커널로 PyTorch eager 대비 4배를 얻어 고해상도 입력에서도 15Hz를 유지한다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### MoT 라우팅과 gradient bridge

Qwen2.5-VL-3B-Instruct에서 출발해 Mixture-of-Transformers backbone으로 넓히면 4B가 넘는다. vision·language·proprioception·이산 action 네 갈래 토큰은 VL Expert로, 노이즈가 낀 연속 action 토큰은 Action Expert로 간다. proprioception은 관절 각도 같은 로봇 자신의 상태 감각 입력이다.

이게 gradient를 끊는 장치가 아니라는 점이 π0.5와 갈리는 대목이다. 두 expert는 같은 시퀀스 수준 attention 문맥을 공유하므로 flow matching gradient도 공유 attention을 타고 VL Expert까지 흘러간다. attention mask는 이산 action 토큰과 연속 action 토큰만 서로 안 보이게 만들어, 두 경로를 따로 학습하고 따로 평가할 수 있게 한다.

![[assets/x-square-robot-2026-wall-oss-05-technical-report/fig02.png]]
*Figure 2: 멀티모달 CE는 vision-language 지식을 잡아 두는 anchor, action 토큰 CE는 backbone을 제어 쪽으로 미는 gradient bridge, flow matching은 배포 시 쓰는 연속 action을 학습한다 (X Square Robot 2026, p.4)*

전체 손실은 flow matching 손실에 action 토큰 CE와 멀티모달 CE를 각각 0.01 가중치로 더한 형태다. Action-Space Supervision 아래에서 flow 손실이 CE 항보다 두 자릿수 작기 때문에, 이 가중치가 오히려 세 항의 규모를 비슷하게 맞춘다. action 데이터와 멀티모달 데이터는 배치에서 9:1로 섞는다.

### Vision-Aligned RVQ Action Tokenizer

FAST tokenizer는 action chunk를 압축해 이산 토큰으로 적는 규칙 기반 방식이라 의미를 담는 능력이 제한적이라고 본다. 대신 delta action 공간에서 동작하는 Encoder–RVQ–Decoder를 여러 embodiment의 로봇 데이터로 학습시킨다. embodiment는 로봇의 물리적 형상과 그에 딸린 제어 API 구성을 뜻한다.

복원만 목표로 삼지 않는다. 시각-action alignment가 action latent를 VLM 시각 feature 쪽으로 당기고, 다음 프레임 예측이 토큰에 행동의 결과를 담게 하며, DCT 영역 복원이 고주파 떨림을 눌러 준다.

![[assets/x-square-robot-2026-wall-oss-05-technical-report/fig03.png]]
*Figure 3: action chunk를 encoder로 압축해 residual vector quantization으로 다단계 이산 토큰을 만들고, decoder가 원 chunk를 복원하는 한편 feature predictor가 미래 observation feature를 맞힌다 (X Square Robot 2026, p.5)*

### Action-Space Supervision

linear Gaussian 경로를 쓰되 timestep을 Beta(1.5, 1)로 뽑아 고노이즈 구간에 확률 질량을 몰아 준다. 네트워크는 여전히 velocity를 내지만 손실은 복원된 action에 건다. 이렇게 하면 velocity 공간에서 (1−τ)² 가중을 준 것과 같아져 trajectory의 전체 모양이 잡히는 고노이즈 구간이 강조된다. 근거는 로봇 action 신호의 스펙트럼 성질이다. 자연 이미지와 달리 로봇 동작은 쓸모 있는 구조가 저주파 쪽에 몰려 있다.

### action 인터페이스

입력은 VLM 대화 형식을 그대로 쓴다. 시스템 프롬프트에 embodiment를 적고, 사용자 차례에 카메라별 이미지 토큰과 지시문, 텍스트 숫자로 이산화한 proprioception 토큰을 넣는다. 추론 시에는 이산 토큰을 실행 가능한 action으로 디코딩하지 않고 Action Expert가 다단계 flow matching denoising으로 연속 action chunk를 만든다.

회전은 오일러각이나 사원수 대신 6D 표현을 쓴다. 최종 action space는 26차원이다. 팔 하나당 상대 3D 위치·상대 6D 회전·그리퍼 1D로 20차원, 여기에 이동 베이스 속도 3D, 리프트 높이 1D, 머리 2D가 붙는다. 두 경로 모두 1초 분량을 예측하고 프레임 수는 데이터 원천의 control frequency에 맞춘다. control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다.

optimizer는 Muon이고 각 expert의 2D 파라미터에 적용한다. Action Expert와 VL Expert의 gradient 규모가 크게 다른 설정이라, momentum을 직교화해 gradient 크기에 무관한 갱신을 만드는 성질이 중요하다고 적는다. 분산 런타임 DMuon이 순진한 구현의 2배 오버헤드를 0.02배로 줄인다.

### 데이터

자체 수집분은 탁상형 양팔과 이동형 manipulator 두 계열에 XRZero-G0라는 embodiment 비의존 수집 장치가 더해진다. 주석은 목표만 적은 짧은 지시와 중간 목표를 시간순으로 나열한 상세 지시 두 벌을 붙인 뒤 LLM으로 표현을 늘린다. 긴 teleoperation trajectory는 원자적 하위 목표 단위로 잘라 각 구간에 맞는 지시를 단다. teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다.

전처리에서 좌표 의미를 통일하고, 관절 상태만 있는 데이터셋은 URDF로 forward kinematics를 돌려 end-effector 자세를 복원한다. 거의 정지한 프레임은 걸러낸다. 같은 observation에 0에 가까운 action과 0이 아닌 action이 함께 붙어 감독 신호를 흐리고 추론 시 멈칫거림을 만들기 때문이다.

샘플링은 원천과 과제 라벨로 그룹을 묶고 그룹 크기의 제곱근에 비례하는 가중치를 준다. 이렇게 뽑은 한 epoch이 100만 trajectory를 넘고 자체 수집과 open-source가 6:4쯤이다.

![[assets/x-square-robot-2026-wall-oss-05-technical-report/fig04.png]]
*Figure 4: 왼쪽은 자체 수집분과 RoboMIND·AgiBotWorld·DROID·BRIDGE v2 등 10개 open-source 부분집합의 trajectory 구성, 오른쪽은 embodiment 형상 다양성 (X Square Robot 2026, p.9)*

멀티모달 corpus는 9,000만 샘플이다. 7,800만은 공개 데이터이고 1,200만은 action trajectory에서 직접 합성한 embodied bridge 데이터다. bridge라 부르는 이유는 이 샘플이 action 학습과 같은 trajectory·같은 observation·같은 과제 맥락에서 나와 실행 가능한 로봇 동작과 처음부터 붙어 있기 때문이다.

## 결과 (Results)

### fine-tuning 없이 실기기에서

17과제 중 12개는 pre-training 분포 안의 seen, 5개는 현재 embodiment에서 같은 과제로 수집한 적 없는 unseen이다. 채점은 성공·실패가 아니라 0~100의 task progress다.

400k 체크포인트에서 전체 평균 51.1, seen 50.0, unseen 53.6이다. 50k에서는 25.5였다. 범주별로는 의미 이해 과제가 400k 평균 72.6으로 가장 강하다. 반대로 정밀 삽입이나 변형체 접기는 여전히 하위 실행에 발목이 잡힌다. Towel Folding 10, Table Setting 9, Charger Plugging 9다.

![[assets/x-square-robot-2026-wall-oss-05-technical-report/fig06.png]]
*Figure 6: (a) seen 12과제와 unseen 5과제의 평균 task progress 추이, (b) 의미 이해·강체·변형체·정밀·장기 다섯 범주별 추이 (X Square Robot 2026, p.13)*

![[assets/x-square-robot-2026-wall-oss-05-technical-report/tab03.png]]
*Table 3: 400k 체크포인트에서 task progress 60 이상인 zero-shot 과제 여섯 (X Square Robot 2026, p.14)*

논문이 unseen의 의미를 스스로 좁혀 둔 대목이 있다. 이 과제들은 현재 embodiment에서 동일 과제로 수집된 적이 없고 소품 조합도 새롭지만, pre-training corpus의 open-source 데이터에 의미상 관련된 경험이 들어 있을 수 있다. 여기서의 일반화는 완전히 새로운 기술의 습득이라기보다 장면과 소품을 건너뛰는 기술 전이에 가깝다.

능력이 계단처럼 나타나는 것도 눈에 띈다. Block Sorting은 중후반에 50%대에서 100%로 뛰고 Ring Stacking은 350k에서 100에 닿았다가 400k에서 86으로 내려앉는다. 전체 평균이 400k에서도 계속 오르는 중이라 pre-training이 아직 포화하지 않았다고 본다.

### fine-tuning 이후

π0.5와 DreamZero를 각자의 공식 가중치에서 출발시켜 15과제(manipulation 10 + reasoning 5)에 같은 데이터와 같은 프로토콜로 붙였다.

![[assets/x-square-robot-2026-wall-oss-05-technical-report/tab04.png]]
*Table 4: 실기기 fine-tuning baseline 비교 — Wall-OSS-0.5 61.1/59.3/60.5, π0.5 35.0/58.9/43.0, DreamZero 33.7/32.7/33.4 (X Square Robot 2026, p.15)*

갈리는 지점은 manipulation 쪽이다. Color Block Sorting 96 대 42, Ring Stacking 91 대 60, Drawer Organization 52 대 7, Spoon-in-Bowl 80 대 43이다. reasoning 쪽은 59.3 대 58.9로 사실상 붙어 있다. Pencil Case Packing 18.5가 남은 약점인데 변형체와 관절 물체가 얽힌 정밀 양팔 조작이다.

fine-tuning 성적이 pre-training 성적을 따라간다는 관찰도 붙는다. fine-tuning 후 가장 강한 Color Block Sorting 96과 Ring Stacking 91은 zero-shot에서도 각각 100과 86이었다.

### 과제 수를 늘리면

fine-tuning 과제를 5 → 10 → 19로 늘리면서 같은 체크포인트에서 6 epoch씩 돌렸다. 과제를 늘리면 기존 과제가 희석될 것 같지만 반대로 나왔다. 논문은 통째 과제 전이보다는 접근·정렬·잡기·조정·놓기 같은 원자적 동작 패턴, 지시 표현, 상태 변화 분포의 빈틈이 메워진 결과일 가능성을 든다.

![[assets/x-square-robot-2026-wall-oss-05-technical-report/fig07.png]]
*Figure 7: 공유 5과제는 73.96 → 74.75 → 83.75, 공유 10과제는 59.98 → 64.78, 새로 넣은 9과제는 65.59 (X Square Robot 2026, p.16)*

### 멀티모달 능력의 특화

backbone 대비 embodied 쪽은 오르고 개방 도메인 VQA는 내려간다. 논문은 이걸 손실이 아니라 특화로 읽는다. action 실행이 주 목적인 모델이 "어디를 보고, 어디를 가리키고, 어디에 놓을지"에 해당하는 신호를 얻는 대신 일반 이미지 이해 점수 일부를 내주는 교환이라는 것이다.

![[assets/x-square-robot-2026-wall-oss-05-technical-report/fig08.png]]
*Figure 8: Embodied Grounding +21.8, Where2Place +11.0, EO-Bench +3.9인 반면 ERQA −5.5, RealWorld VQA −15.0 (X Square Robot 2026, p.17)*

사전 실험에서 embodied bridge 데이터가 모자라면 action 토큰 목표가 로봇 observation 분포에서의 멀티모달 점수까지 크게 깎는다는 것을 확인했고, 1,200만 bridge 샘플은 그 압력에 대한 대응으로 넣었다.

### ablation

학습 전략 넷을 5과제에서 70k 스텝씩 밑바닥부터 돌렸다. 셋 중 어느 신호를 빼도 7.4~25.1pp가 깎인다. stop-gradient는 VQA 점수만 근소하게 앞서고 모든 action 과제에서 꼴찌이며 flow 손실 수렴이 느리고 최종값도 높다.

![[assets/x-square-robot-2026-wall-oss-05-technical-report/fig10.png]]
*Figure 10: (a) 밑바닥 학습 5과제에서 flow only 36.68, stop-grad 31.93, stop-grad 후 co-train 49.58, co-train 57.00. (b) fine-tuning 단계에서도 co-training 우위가 이어진다 (X Square Robot 2026, p.19)*

Action-Space Supervision은 LIBERO 통제 실험에서 25k 스텝 최고 96.5%로 velocity 공간 대비 6.2%p 앞선다. 예외는 초기 10k 구간으로, 저노이즈 gradient가 희박한 탓에 여기서만 velocity 쪽이 근소하게 낫다.

![[assets/x-square-robot-2026-wall-oss-05-technical-report/fig12.png]]
*Figure 12: tokenizer만 바꾼 통제 실험 — VQA 정확도 75.7% → 77.5%, 실기기 4과제 평균 task progress 29.3 → 48.1 (X Square Robot 2026, p.20)*

실기기 평가가 이산 토큰 디코딩이 아니라 flow matching 연속 action으로 이뤄지므로, tokenizer 품질의 이득이 이산 경로에만 갇히지 않는다는 게 저자들의 해석이다.

### 추론 속도

병목이 계산이 아니라 CPU 디스패치라는 프로파일링 결과에서 출발한다. denoising 스텝 전체를 CUDA Graph 하나로 캡처해 커널 사이 공백을 없애고, RoPE·RMSNorm 같은 잔여 연산을 레지스터 안에서 끝나는 단일 CUDA 커널로 융합해 2~10배를 얻는다. RTX 5090 한 장, 3시점 입력 기준으로 224×224에서 21Hz, 448×448에서 15Hz다.

## 한계 (Limitations)

gradient bridge의 동역학이 3B backbone에서만 검증됐다. 더 큰 backbone에서는 세 신호의 상대적 기하와 상호작용 세기가 크게 달라질 수 있다.

입력이 단일 프레임 이미지라 시간 기억과 상태 추적이 필요한 장기 과제의 zero-shot 성적이 제약된다.

RVQ tokenizer와 학습 파이프라인이 26차원 action 표현에 묶여 있어 손가락이 많은 dexterous hand처럼 자유도가 큰 embodiment에는 그대로 쓰기 어렵다.

평가가 여전히 사람이 만든 채점 기준에 기댄다. 현재 실기기 벤치마크는 다중 로봇 협업, 장시간 배치, 넓은 개방 세계 상호작용을 다루지 않는다.

## 관련 페이지 (Related Pages)

- [[physical-ai/zhai-2025-igniting-vlms-toward-the-embodied]] — 같은 팀의 전작 WALL-OSS. Inspiration·Integration 두 단계였던 커리큘럼이 여기서 단일 단계 co-training으로 합쳐진다
- [[physical-ai/x-square-robot-wall-x]] — 이 모델의 학습·추론 코드. 1.1.0이 서빙 런타임과 DMuon 지원을 담았다
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]] — 가장 가까운 비교 대상. FAST 기반 autoregressive 경로와 flow matching 경로를 co-training하되 stop-gradient를 쓴다
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]] — flow matching action expert 계열의 출발점. timestep 샘플링 편향도 여기서 따왔다
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]] · [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]] — action을 텍스트 토큰으로 이산화한 초기 계열
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — 고용량 planner와 경량 controller를 나누는 계층형 계열
- [[llms/lipman-2022-flow-matching-for-generative-modeling]] — Action-Space Supervision이 다시 쓰는 토대
- [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x]] — cross-embodiment 데이터 통합의 선례
- [[overviews/physical-ai-overview]] — 도메인 허브
