---
title: "Latent Reasoning VLA: Latent Thinking and Prediction for Vision-Language-Action Models"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/bai-2026-latent-reasoning-vla-latent-thinking.pdf
raw_filename: "bai-2026-latent-reasoning-vla-latent-thinking.pdf"
source_collection: external
authors: "Shuanghao Bai, Jing Lyu (공동 1저자), Wanqi Zhou, Zhe Li, Dakai Wang, Lei Xing, Xiaoguang Zhao, Pengwei Wang, Zhongyuan Wang, Cheng Chi, Badong Chen, Shanghang Zhang (교신 Cheng Chi, Badong Chen, Shanghang Zhang)"
arxiv_id: "2602.01166"
url: "https://arxiv.org/abs/2602.01166"
venue: "ICML 2026"
tags: [physical-ai, vla, manipulation, robot-learning]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/bai-2026-latent-reasoning-vla-latent-thinking/fig01.png
    raw: raw/papers/bai-2026-latent-reasoning-vla-latent-thinking-figures/fig01.png
    caption: "VLA의 chain-of-thought 표현 방식 비교. (a) textual CoT 토큰을 생성한 뒤 AE나 AR 모듈로 action을 만드는 방식, (b) 이산 visual goal 토큰을 거치는 방식, (c) textual CoT latent와 visual goal latent를 연속 공간에 두고 visual goal latent를 perception feature에 alignment하는 LaRA-VLA"
    page: 1
    bbox_norm: [0.4931, 0.2215, 0.8939, 0.5392]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/bai-2026-latent-reasoning-vla-latent-thinking/fig02.png
    raw: raw/papers/bai-2026-latent-reasoning-vla-latent-thinking-figures/fig02.png
    caption: "LaRA-VLA 3단계 학습 개요. Stage I은 subtask, bbox, motion 텍스트 토큰과 다음 프레임 visual 토큰, action 토큰을 지도학습하고 EMA 이미지 인코더로 visual 토큰을 alignment한다. Stage II는 curriculum으로 텍스트 토큰을 앞에서부터 latent로 바꾸고, Stage III는 VLM 출력을 action expert(AE)가 받아 노이즈에서 action을 생성한다"
    page: 5
    bbox_norm: [0.0887, 0.0771, 0.8866, 0.3687]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/bai-2026-latent-reasoning-vla-latent-thinking/fig03.png
    raw: raw/papers/bai-2026-latent-reasoning-vla-latent-thinking-figures/fig03.png
    caption: "LaRA attention mask. 행과 열은 현재 이미지, 텍스트, 미래 이미지, action 토큰이다. Stage I과 II에서는 미래 이미지 토큰끼리 양방향, action 토큰은 앞선 모든 토큰에 causal로 attention하고, Stage III에서는 점선 안쪽(action 제외)만 계산한다"
    page: 6
    bbox_norm: [0.133, 0.3148, 0.4306, 0.5346]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/bai-2026-latent-reasoning-vla-latent-thinking/fig04.png
    raw: raw/papers/bai-2026-latent-reasoning-vla-latent-thinking-figures/fig04.png
    caption: "실제 로봇 long-horizon 과제 4종의 실행 장면. 모든 물체를 바구니에 넣기, 과일을 바구니로 분류하기, 블록을 찾아 바구니에 넣기, 그릇 두 개 쌓기"
    page: 7
    bbox_norm: [0.0933, 0.2953, 0.4703, 0.5456]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/bai-2026-latent-reasoning-vla-latent-thinking/fig05.png
    raw: raw/papers/bai-2026-latent-reasoning-vla-latent-thinking-figures/fig05.png
    caption: "실제 로봇 과제별 성공률 막대 그래프. ACT는 모든 과제에서 0%, GR00T N1.5 평균 47.9%, LaRA-VLA 평균 56.2%다. 모든 물체 넣기 과제만 GR00T N1.5(50.0%)가 LaRA-VLA(41.6%)보다 높다"
    page: 7
    bbox_norm: [0.4872, 0.2953, 0.8999, 0.4615]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/bai-2026-latent-reasoning-vla-latent-thinking/fig06.png
    raw: raw/papers/bai-2026-latent-reasoning-vla-latent-thinking-figures/fig06.png
    caption: "latent collapse 분석 산점도. 왼쪽은 지시문 토큰(회색)과 세 추론 latent의 중심점이 떨어져 있음을, 오른쪽은 Subtask, Bbox, Motion latent가 각각 분리된 군집을 이룸을 보여준다"
    page: 8
    bbox_norm: [0.4872, 0.0771, 0.8998, 0.2676]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/bai-2026-latent-reasoning-vla-latent-thinking/fig07.png
    raw: raw/papers/bai-2026-latent-reasoning-vla-latent-thinking-figures/fig07.png
    caption: "NVIDIA A100 GPU 추론 지연 비교 막대 그래프. ThinkAct-7B 7513 ms, ECoT-7B 4434 ms, Fast-ThinkAct-3B 805 ms, LaRA-VLA-4B 135 ms"
    page: 8
    bbox_norm: [0.4872, 0.2849, 0.8999, 0.4627]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/bai-2026-latent-reasoning-vla-latent-thinking/fig08.png
    raw: raw/papers/bai-2026-latent-reasoning-vla-latent-thinking-figures/fig08.png
    caption: "단계별 학습 데이터 형식 예시. Stage I은 Subtask, BBox, Reasoning 문장과 img next 토큰 16개, Stage II는 thinking 토큰을 1개에서 3개로 늘리며 해당 텍스트를 지우고, Stage III는 thinking 토큰 3개와 img next 토큰만 남는다"
    page: 12
    bbox_norm: [0.0808, 0.2172, 0.8945, 0.62]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/bai-2026-latent-reasoning-vla-latent-thinking/fig09.png
    raw: raw/papers/bai-2026-latent-reasoning-vla-latent-thinking-figures/fig09.png
    caption: "자동 CoT 주석 파이프라인. 그리퍼 개폐 변화로 temporal anchor 구간을 나누고 VLM이 구간별 subtask 문장을 만든다. 첫 프레임과 지시문에서 semantic anchor(대상 물체)를 뽑아 GroundingDINO와 SAM3로 bbox를 얻고, end-effector 위치 차이로 global motion과 local motion 방향 서술을 만든다"
    page: 14
    bbox_norm: [0.1006, 0.0771, 0.8746, 0.4155]
    strategy: caption-region
    curated: true
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/bai-2026-latent-reasoning-vla-latent-thinking/fig10.png
    raw: raw/papers/bai-2026-latent-reasoning-vla-latent-thinking-figures/fig10.png
    caption: "대상 물체 식별 프롬프트 전문. pre-grasp 이미지와 지시문을 받아 주 조작 물체와 보조 물체를 3단어 이하 소문자 JSON으로 출력하게 한다"
    page: 15
    bbox_norm: [0.0808, 0.2809, 0.8945, 0.6989]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/bai-2026-latent-reasoning-vla-latent-thinking/fig11.png
    raw: raw/papers/bai-2026-latent-reasoning-vla-latent-thinking-figures/fig11.png
    caption: "subtask 서술 생성 프롬프트 전문. 구간 시작과 끝 keyframe 두 장과 지시문, 구간 라벨을 받아 물체 이름, 장면 맥락, 물체 이름이 들어간 subtask 문장을 JSON으로 출력하게 한다"
    page: 16
    bbox_norm: [0.0808, 0.2746, 0.8945, 0.7052]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/bai-2026-latent-reasoning-vla-latent-thinking/tab01.png
    raw: raw/papers/bai-2026-latent-reasoning-vla-latent-thinking-figures/tab01.png
    caption: "CoT 표현 형식에 따른 VLA 분류표. ECoT, GraspVLA, π0.5, ThinkAct는 이산 텍스트 토큰, CoT-VLA, DreamVLA, UD-VLA, VITA는 이산 visual 토큰, UP-VLA는 둘 다 이산이고 LaRA-VLA만 텍스트와 visual CoT를 모두 연속 latent로 두고 연속 action을 낸다"
    page: 3
    bbox_norm: [0.0702, 0.1204, 0.9098, 0.3796]
    strategy: manual
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/bai-2026-latent-reasoning-vla-latent-thinking/tab02.png
    raw: raw/papers/bai-2026-latent-reasoning-vla-latent-thinking-figures/tab02.png
    caption: "LIBERO 네 suite 성공률 비교표. CoT 유형(No CoT, Textual, Visual, Latent)별로 묶었고 LaRA-VLA가 평균 97.9%로 가장 높다. Spatial은 96.4%로 DeepThinkVLA(99.0%) 등보다 낮다"
    page: 6
    bbox_norm: [0.1252, 0.0904, 0.8498, 0.3196]
    strategy: manual
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/bai-2026-latent-reasoning-vla-latent-thinking/tab03.png
    raw: raw/papers/bai-2026-latent-reasoning-vla-latent-thinking-figures/tab03.png
    caption: "SimplerEnv WidowX 네 과제 성공률 비교표. LaRA-VLA가 평균 68.8%로 가장 높고 Put Spoon 95.8%, Put Eggplant 91.7%에서 앞서지만 Stack Block은 25.0%로 UD-VLA(54.1%)보다 낮다"
    page: 7
    bbox_norm: [0.1252, 0.0954, 0.8498, 0.2906]
    strategy: manual
    curated: true
  - id: tab04
    label: Table 4
    kind: table
    file: assets/bai-2026-latent-reasoning-vla-latent-thinking/tab04.png
    raw: raw/papers/bai-2026-latent-reasoning-vla-latent-thinking-figures/tab04.png
    caption: "SimplerEnv에서 CoT 감독 형식 ablation 표. CoT 없음 55.21%, 명시적 Text-CoT 58.33%, Latent Text-CoT 64.58%, Latent Text-CoT와 Latent Vis-CoT 결합 68.75%"
    page: 8
    bbox_norm: [0.0702, 0.1324, 0.4968, 0.2326]
    strategy: manual
    curated: true
  - id: tab05
    label: Table 5
    kind: table
    file: assets/bai-2026-latent-reasoning-vla-latent-thinking/tab05.png
    raw: raw/papers/bai-2026-latent-reasoning-vla-latent-thinking-figures/tab05.png
    caption: "LIBERO, SimplerEnv, 실제 로봇 설정별 3단계 하이퍼파라미터표. 학습률, action horizon(8, 16, 25), 단계별 학습 step, 배치 크기, 손실 가중치를 정리한다"
    page: 13
    bbox_norm: [0.0846, 0.0992, 0.8907, 0.3768]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/bai-2026-latent-reasoning-vla-latent-thinking/tab06.png
    raw: raw/papers/bai-2026-latent-reasoning-vla-latent-thinking-figures/tab06.png
    caption: "실제 로봇 과제별 subtask 단위 성공률표. ACT, GR00T N1.5, LaRA-VLA의 subtask 1, subtask 2, 전체 성공률을 과제 네 개에 대해 나열한다"
    page: 14
    bbox_norm: [0.0837, 0.774, 0.8916, 0.8529]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

LaRA-VLA는 VLA가 action을 내기 전에 거치는 chain-of-thought(CoT)를 텍스트 토큰이나 이산 visual 토큰으로 생성하지 않고 연속 latent로 내재화하는 VLA다. 명시적 CoT에서 latent 추론으로 옮겨 가는 3단계 curriculum 학습을 쓰며, LIBERO 평균 97.9%, SimplerEnv WidowX 평균 68.8%를 기록하고 추론 지연을 135 ms로 줄였다 (명시적 CoT 방식 대비 최대 90% 감소).

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | Latent Reasoning VLA: Latent Thinking and Prediction for Vision-Language-Action Models |
| 저자 | Shuanghao Bai, Jing Lyu (공동 1저자), Wanqi Zhou, Zhe Li, Dakai Wang, Lei Xing, Xiaoguang Zhao, Pengwei Wang, Zhongyuan Wang, Cheng Chi, Badong Chen, Shanghang Zhang (교신 Cheng Chi, Badong Chen, Shanghang Zhang) |
| 소속 | Xi'an Jiaotong University 인공지능로봇연구소, Beijing Academy of Artificial Intelligence(BAAI), 중국과학원 자동화연구소와 인공지능학원, Peking University |
| 공개 | arXiv 2602.01166, preprint 날짜 2026-02-01, ICML 2026 채택 (저장소 README와 프로젝트 페이지 기준) |
| 분량 | 본문 8쪽, 참고문헌, 부록 A~C 포함 16쪽 |
| 프로젝트 페이지 | [[physical-ai/bai-2026-lara-vla-project-page]] (https://loveju1y.github.io/Latent-Reasoning-VLA/) |
| 코드 | [[physical-ai/loveju1y-lara-vla]] (https://github.com/LoveJu1y/LaRA-VLA, MIT) |
| backbone | Qwen3-VL (저장소 기준 `StarVLA/Qwen3-VL-4B-Instruct-Action`, 논문 Figure 7의 모델명은 LaRA-VLA-4B) |

## 2. 주요 기여 (Key Contributions)

- **latent 추론 패러다임**: VLA의 CoT를 텍스트와 visual 두 모달리티 모두 연속 latent로 내재화한다. 추론 시 명시적 CoT 생성이 없으므로 지연이 짧고, 연속인 perception과 control 공간과 표현 형식이 맞는다.
- **3단계 curriculum 학습**: Stage I 명시적 CoT fine-tuning, Stage II 이산 CoT 토큰을 latent로 점진 교체, Stage III flow matching action expert 적응. visual latent 예측 목표가 latent 추론을 안내하고 EMA 인코더가 representation collapse를 막는다.
- **구조화 CoT 데이터셋 2종**: LIBERO-LaRA와 Bridge-LaRA를 자동 주석 파이프라인으로 만들었다. 주석은 subtask 분해, 대상 물체 bbox, motion 추론 세 요소로 구성된다. 같은 파이프라인을 실제 로봇 long-horizon 데이터에도 적용했다.
- **평가**: LIBERO, SimplerEnv WidowX, 실제 로봇 long-horizon 과제 4종에서 기존 No CoT, Textual CoT, Visual CoT, Latent CoT 방법보다 높은 평균 성공률을 보고한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 설정

저자는 기존 CoT 기반 VLA의 문제를 두 가지로 정리한다.

| 문제 | 내용 |
|---|---|
| 추론 비용 | 텍스트 CoT는 추론 시 긴 reasoning trace를 생성해야 해서 토큰 길이, KV-cache, 메모리, 지연이 커진다. control frequency가 5Hz 아래, 심하면 1Hz 근처(ECoT)까지 내려가 실시간 제어에 쓰기 어렵다 |
| 표현 불일치 | 텍스트 CoT는 언어 토큰, visual CoT는 대부분 VQ 계열 tokenizer의 이산 visual 토큰에 묶인다. perception과 action은 연속 공간인데 추론만 이산 토큰이라 표현 형식이 어긋난다 |

저자의 관점은 CoT가 효과적인 이유가 자연어로 표현되었기 때문이 아니라 구조화된 중간 추론을 드러내기 때문이라는 것이다. 이 관점에서 중간 추론을 연속 latent로 옮겨도 구조만 유지하면 이점이 남는다고 본다. 출발점은 언어 모델의 latent CoT 연구(Coconut, Multimodal Chain of Continuous Thought)다.

Table 1은 기존 방법을 CoT 표현 형식으로 분류한다.

| 계열 | 방법 (venue) | Text CoT | Visual CoT 정렬 형식 | Action |
|---|---|---|---|---|
| Text CoT | ECoT (CoRL 2024) | 이산 토큰 | 없음 | 이산 |
| Text CoT | GraspVLA (CoRL 2025) | 이산 토큰 | 없음 | 연속 |
| Text CoT | π0.5 (CoRL 2025) | 이산 토큰 | 없음 | 연속 |
| Text CoT | ThinkAct (NeurIPS 2025) | 이산 토큰 | 없음 | 연속 |
| Visual CoT | CoT-VLA (CVPR 2025) | 없음 | 이산 visual 토큰 | 이산 |
| Visual CoT | DreamVLA (NeurIPS 2025) | 없음 | 이산 visual 토큰 | 연속 |
| Visual CoT | UD-VLA (arXiv 2025) | 없음 | 이산 visual 토큰 | 이산 |
| Visual CoT | VITA (arXiv 2025) | 없음 | 이산 visual 토큰 | 이산 |
| 둘 다 | UP-VLA (ICML 2025) | 이산 토큰 | 이산 visual 토큰 | 이산 |
| 둘 다 | LaRA-VLA | 연속 latent | 연속 latent | 연속 |

### 3.2 데이터 수집 파이프라인 (3.1절, 부록 B)

조작에는 long-horizon subtask 구조, 대상 물체의 공간 grounding, 실행 수준의 motion 추론 세 요소가 함께 필요하다는 것이 저자의 주장이다. 기존 파이프라인은 이를 따로 다뤄 감독이 중복되거나 빠진다. 예를 들어 ECoT는 장면의 모든 물체에 bbox를 달아 중복이 크고, Emma-x는 대상 물체 위치가 없다.

LaRA-VLA는 사람 개입 없는 자동 파이프라인을 "anchor-first, generate-later" 원칙으로 만든다.

| 단계 | 방법 |
|---|---|
| semantic anchor | Qwen3-VL이 첫 프레임과 지시문에서 조작 대상 물체를 식별한다 (프롬프트는 Figure 10, 3단어 이하 소문자 JSON 출력) |
| temporal anchor | 그리퍼 개폐 상태 변화로 trajectory를 원자 조작 구간(pre-grasp, grasp, move, release 등)으로 나누고 구간 경계를 keyframe으로 쓴다. Figure 9 예시는 Approach, Grasp, Transport, Release, Retract 구간 |
| subtask 서술 | Qwen3-VL이 지시문과 구간 keyframe 두 장을 받아 구간별 subtask 문장을 만든다 (Figure 11 프롬프트, 일반 라벨 "move to object" 반복 금지, 물체 이름 포함 필수) |
| 대상 bbox | semantic anchor로 GroundingDINO와 SAM3 open-vocabulary grounding을 수행해 시간적으로 일관된 2D bbox trajectory를 얻는다. Bridge는 균일 샘플한 anchor 프레임 5개의 GroundingDINO 검출로 SAM을 prompt하는 multi-frame ensemble을 쓰고, 공간 outlier를 걸러 신뢰도가 가장 높은 시퀀스를 고른 뒤 끊긴 구간은 선형 보간한다 |
| motion 추론 | end-effector 상태 trajectory에서 구간 목표 방향의 global motion(P_goal − P_now)과 순간 local motion(P_now+1 − P_now)을 계산해 LEFT 같은 방향 서술자로 이산화한다 |

이 파이프라인으로 LIBERO와 SimplerEnv(Bridge) 기반 학습 데이터셋 LIBERO-LaRA와 Bridge-LaRA를 만들고, 실제 로봇 long-horizon 데이터에도 같은 방식을 적용했다.

### 3.3 모델 구조 (3.2절)

- **backbone**: Qwen3-VL을 VLM backbone으로 쓰고 이미지 인코더도 그대로 물려받아 학습 내내 같은 visual 표현을 쓴다.
- **`<img_next>` 토큰**: 미래 visual 목표 정보를 예측하는 전용 토큰이다. 예측 visual latent를 담아 초기 단계에서 명시적 감독과 alignment를 가능하게 한다. 부록 Figure 8 예시에서는 16개를 쓴다.
- **Stage I과 II의 action**: FAST tokenizer(Pertsch et al., 2025) 방식의 autoregressive action 토큰을 쓴다. latent 추론과 action 생성을 함께 안정적으로 학습하기 위해서다.
- **Stage III의 action**: action 토큰 예측을 없애고 action expert를 활성화한다. action expert는 self-attention과 cross-attention이 번갈아 쌓인 16층 DiT이며, VLM이 만든 latent를 조건으로 연속 action trajectory를 만든다.

### 3.4 학습 절차 (3.3절)

**Stage I: 명시적 CoT fine-tuning.** 이미지 인코더가 observation을 visual 토큰 v로, 지시문을 텍스트 토큰 x로 바꾸고 VLM이 CoT 토큰을 teacher forcing으로 autoregressive 생성한다.

- CoT 손실: L_cot = −Σ_t log p_θ(c_t | c_<t, v, x)
- visual alignment 손실: 다음 observation의 visual latent z_t+1(입력과 같은 인코더로 인코딩)을 VLM이 예측하고 L_vis = ||ẑ_t+1 − z_t+1||_1로 맞춘다.
- EMA 목표 인코더: VL-JEPA(Chen et al., 2025a)를 따라 목표 latent를 만드는 파라미터를 online 인코더의 EMA(θ̄_v^t = τ_v θ̄_v^(t−1) + (1 − τ_v) θ_v^t)로 갱신해 collapse를 막는다.
- Inverse Dynamics Model 감독: 예측한 미래 visual 표현과 앞선 visual, 텍스트 맥락으로 f(v_t, v_t+1 | x, c) = a_t를 추정한다. FAST의 재귀 생성 틀로 coarse action 의미를 모든 latent에 부여하며, action 토큰은 autoregressive 손실 L_act-dis로 학습한다.

**Stage II: 이산 CoT 토큰의 curriculum 교체.** 목표 함수는 Stage I과 같지만 CoT 토큰 일부를 가리고 학습 가능한 latent로 바꾼다. 이산 CoT 토큰 비율은 미리 정한 schedule로 줄어 전체 CoT가 latent에 흡수될 때까지 진행된다. 부록 Figure 8의 예시에서 thinking 토큰은 1개(Subtask 대체), 2개(Subtask와 BBox 대체), 3개(Reasoning까지 대체) 순으로 늘어난다. 한계 절에 따르면 현재 구현은 추론 단계당 latent 토큰 1개로 제한한다.

**Stage III: flow matching action 생성.** flow matching은 노이즈와 정답 action 사이의 직선 경로를 따라 velocity field를 학습해 노이즈에서 action을 생성하는 방법이다. a_τ = (1 − τ)ε + τ a_t, τ ~ U(0, 1)로 두고 action expert가 v_θ(a_τ, τ | h_t)를 예측하며 손실은 L_act-con = E[||v_θ(a_τ, τ | h_t) − (a_t − ε)||²]다. 조건 h_t는 현재 observation과 지시문의 latent, 텍스트 추론 latent, 예측 미래 visual latent를 모은 것이다. 앞 단계의 inverse dynamics 감독 덕분에 h_t에 coarse action 정보가 이미 들어 있으므로 별도의 action latent는 두지 않는다.

### 3.5 LaRA attention 구조

토큰은 텍스트, 현재 이미지, 미래 이미지, action 네 종류다. 텍스트는 Stage I과 II에서 지시문과 텍스트 CoT, Stage II와 III에서 텍스트 latent를 가리킨다.

| 단계 | 규칙 |
|---|---|
| Stage I, II | 미래 이미지 토큰은 텍스트와 현재 이미지에 causal로 attention하고 서로 간에는 양방향이다. action 토큰은 앞선 텍스트, 현재 이미지, 미래 이미지, 이전 action 토큰 전부에 attention한다 |
| Stage III | action 토큰을 attention 계산에서 빼고 텍스트와 vision 토큰만으로 같은 제약을 적용한다 |

### 3.6 단계별 손실

| 단계 | 손실 |
|---|---|
| Stage I | L_cot + 0.1 L_vis + L_act-dis |
| Stage II | L_cot를 0으로 annealing, 마지막에는 0.2 L_vis + L_act-dis |
| Stage III | L_act-con (연속 action 회귀) |

### 3.7 구현 세부 (부록 A, Table 5)

action horizon은 Bridge 16, LIBERO 8, 실제 로봇 25다. 모든 모델은 NVIDIA H100 8장으로 학습했다.

| 하이퍼파라미터 | LIBERO I / II / III | SimplerEnv I / II / III | 실제 로봇 I / II / III |
|---|---|---|---|
| VLM LR | 1e-5 / 1e-5 / 1e-5 | 1e-5 / 1e-5 / 1.3e-5 | 1e-5 / 1e-5 / 1e-5 |
| DiT LR | 1e-4 / 1e-4 / 1e-4 | 1e-4 / 1e-4 / 1.3e-4 | 1e-4 / 1e-4 / 1e-4 |
| action horizon | 8 / 8 / 8 | 16 / 16 / 16 | 25 / 25 / 25 |
| 학습 step | 5천 / 2천+2천+2천 / 4만 | 1만 / 5천+5천+1만 / 6만 | 5천 / 2천+2천+2천 / 1만 |
| 배치 크기 | 12 / 16 / 16 | 12 / 16 / 16 | 12 / 16 / 16 |
| action token 손실 가중치 | 1.0 / 1.0 / 없음 | 1.0 / 1.0 / 없음 | 1.0 / 1.0 / 없음 |
| image next 손실 가중치 | 0.1 / 0.2 / 없음 | 0.1 / 0.2 / 없음 | 0.1 / 0.2 / 없음 |
| CoT 손실 가중치 | 1.0 / 1.0 / 없음 | 1.0 / 1.0 / 없음 | 1.0 / 1.0 / 없음 |
| DiT 손실 가중치 | 없음 / 없음 / 1.0 | 없음 / 없음 / 1.0 | 없음 / 없음 / 1.0 |

optimizer는 전 설정 AdamW, scheduler는 cosine, warm-up 비율은 0.1이다.

실제 로봇 baseline 설정은 다음과 같다.

| baseline | 설정 |
|---|---|
| ACT | LeRobot 구현, chunk 크기 K = 50, ImageNet pre-training ResNet-18, encoder 4층과 decoder 1층(LeRobot 수정판), 차원 512, head 8, FFN 3200, dropout 0.1, VAE latent 32차원과 KL 가중치 10.0, 4만 step, 배치 100, Adam LR 1e-5, H100 1장 |
| GR00T N1.5 | 원본 구현과 기본 구조, chunk 크기 K = 25, 배치 128, AdamW LR 1e-4, weight decay 1e-5, warmup 0.05, 언어 backbone과 vision tower는 고정하고 projector와 diffusion policy head만 fine-tuning, H100 1장 |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 LIBERO (Table 2)

LIBERO는 Spatial, Goal, Object, Long 네 suite에 단일 팔 과제가 suite당 10개 있고, 과제당 50 rollout의 성공률을 보고한다.

| CoT 유형 | 방법 | Spatial | Goal | Object | Long | 평균 |
|---|---|---|---|---|---|---|
| No CoT | OpenVLA | 84.7 | 88.4 | 79.2 | 53.7 | 76.5 |
| No CoT | π0 | 96.8 | 98.8 | 95.8 | 85.2 | 94.2 |
| No CoT | OpenVLA-OFT | 97.6 | 98.4 | 97.9 | 94.5 | 97.1 |
| Textual | ThinkAct | 88.3 | 91.4 | 87.1 | 70.9 | 84.4 |
| Textual | MolmoAct | 87.0 | 95.4 | 87.6 | 77.2 | 86.6 |
| Textual | π0.5 | 98.8 | 98.2 | 98.0 | 92.4 | 96.8 |
| Textual | DeepThinkVLA | 99.0 | 96.6 | 96.4 | 96.2 | 97.0 |
| Visual | CoT-VLA | 87.5 | 91.6 | 87.6 | 69.0 | 81.1 |
| Visual | DreamVLA | 97.5 | 94.0 | 89.5 | 89.5 | 92.6 |
| Visual | F1 | 98.2 | 97.8 | 95.4 | 91.3 | 95.7 |
| Visual | UD-VLA | 94.1 | 95.7 | 91.2 | 89.6 | 92.7 |
| Latent | Fast-ThinkAct | 92.0 | 97.2 | 90.2 | 79.4 | 89.7 |
| Latent | LaRA-VLA | 96.4 | 98.6 | 99.8 | 96.6 | **97.9** |

LaRA-VLA는 평균 97.9%로 가장 높고, Object 99.8%와 Long 96.6%는 표 안 최고값이다. 반면 Spatial 96.4%는 DeepThinkVLA(99.0%), π0.5(98.8%), F1(98.2%), OpenVLA-OFT(97.6%), DreamVLA(97.5%), π0(96.8%)보다 낮고, Goal 98.6%는 π0(98.8%)보다 0.2%p 낮다. 평균 2위 OpenVLA-OFT(97.1%)와의 차이는 0.8%p다.

### 4.2 SimplerEnv WidowX (Table 3)

Bridge 데이터로 학습한 policy의 real-to-sim 일반화를 보며, WidowX 네 과제에서 과제당 24 rollout을 보고한다.

| CoT 유형 | 방법 | Put Spoon | Put Carrot | Stack Block | Put Eggplant | 평균 |
|---|---|---|---|---|---|---|
| No CoT | OpenVLA | 0.0 | 0.0 | 0.0 | 4.1 | 1.0 |
| No CoT | Octo | 47.2 | 9.7 | 4.2 | 56.9 | 29.5 |
| No CoT | OpenVLA-OFT | 12.5 | 4.2 | 8.3 | 37.5 | 39.6 |
| No CoT | π0 | 29.1 | 0.0 | 16.7 | 62.5 | 40.1 |
| No CoT | CogACT | 71.7 | 50.8 | 15.0 | 67.5 | 51.3 |
| Textual | ThinkAct | 58.3 | 37.5 | 8.7 | 70.8 | 43.8 |
| Visual | F1 | 50.0 | 70.8 | 50.0 | 66.7 | 59.4 |
| Visual | UD-VLA | 58.3 | 62.5 | 54.1 | 75.0 | 62.5 |
| Latent | LaRA-VLA | 95.8 | 62.5 | 25.0 | 91.7 | **68.8** |

LaRA-VLA 평균 68.8%는 UD-VLA(62.5%)보다 6.3%p 높다. Put Spoon(95.8%)과 Put Eggplant(91.7%)에서 크게 앞서지만 Stack Block은 25.0%로 UD-VLA(54.1%), F1(50.0%)의 절반 수준이고, Put Carrot 62.5%는 F1(70.8%)보다 낮다.

표 자체의 수치 불일치가 몇 군데 있다.

- OpenVLA-OFT의 과제별 값(12.5, 4.2, 8.3, 37.5)의 산술평균은 15.6%인데 평균 열은 39.6%다.
- π0의 과제별 값(29.1, 0.0, 16.7, 62.5)의 산술평균은 27.1%인데 평균 열은 40.1%다.
- 나머지 행(LaRA-VLA 68.75%, UD-VLA 62.5%, ThinkAct 43.8% 등)은 과제별 값의 산술평균과 일치한다. 두 행의 평균은 원 논문에서 옮겨 온 값으로 보이며, 이 논문은 출처를 밝히지 않는다.
- 논문 본문과 표 캡션은 "SimplerEnv-WindowX"로 오기했다.

### 4.3 실제 로봇 (4.2절, Figure 4와 5, 부록 C Table 6)

플랫폼은 RGB-D 카메라 3대를 단 Agilex Cobot Magic 바퀴형 로봇이다. 과제 범주마다 30Hz 시연 데이터(demonstration) 100개를 수집했고, 과제당 12회 rollout으로 평가했다. 비교 대상은 ACT와 GR00T N1.5다.

| 과제 | ACT | GR00T N1.5 | LaRA-VLA |
|---|---|---|---|
| 모든 물체를 바구니에 넣기 | 0 | 50.0 | 41.6 |
| 과일을 모두 바구니로 분류하기 | 0 | 33.3 | 50.0 |
| 블록을 찾아 바구니에 넣기 | 0 | 16.7 | 33.3 |
| 그릇 두 개 쌓기 | 0 | 91.7 | 100.0 |
| 평균 | 0 | 47.9 | 56.2 |

본문은 "LaRA-VLA가 네 과제 모두에서 ACT와 GR00T N1.5를 일관되게 앞선다"고 쓰지만, 그림의 수치로는 모든 물체 넣기 과제에서 GR00T N1.5(50.0%)가 LaRA-VLA(41.6%)보다 높다.

Table 6은 각 과제를 subtask 두 개로 나눈 성공률이다.

| 방법 | 물체 넣기 S1 / S2 / 전체 | 과일 분류 S1 / S2 / 전체 | 블록 찾기 S1 / S2 / 전체 | 그릇 쌓기 S1 / S2 / 전체 |
|---|---|---|---|---|
| ACT | 0.0 / 0.0 / 0.0 | 0.0 / 0.0 / 0.0 | 0.0 / 0.0 / 0.0 | 0.0 / 0.0 / 0.0 |
| GR00T N1.5 | 50.0 / 50.0 / 50.0 | 50.0 / 83.3 / 33.3 | 100.0 / 16.7 / 16.7 | 91.7 / 100.0 / 91.7 |
| LaRA-VLA | 50.0 / 41.7 / 41.6 | 66.7 / 75.0 / 50.0 | 100.0 / 33.3 / 33.3 | 100.0 / 100.0 / 100.0 |

부록 C의 해석은 다음과 같다. 물체 넣기, 과일 분류, 그릇 쌓기는 두 subtask가 대체로 독립이라 한쪽 실패가 다른 쪽으로 번지지 않고 개선도 subtask별 국소 실행 향상에서 나온다. 반면 블록 찾기는 첫 subtask(찾기)가 성공해야 둘째(놓기)가 가능한 강한 순차 의존 과제이고, LaRA-VLA가 이 과제에서 GR00T N1.5보다 16.6%p 높은 점을 latent 추론이 subtask 간 일관성을 유지하는 근거로 든다. 표에는 41.7과 41.6처럼 subtask 값과 전체 값의 반올림이 엇갈리는 행이 있다.

### 4.4 Ablation (Table 4, SimplerEnv)

| Text-CoT | Latent Text-CoT | Latent Vis-CoT | 성공률 (%) |
|---|---|---|---|
| × | × | × | 55.21 |
| ✓ | × | × | 58.33 |
| × | ✓ | × | 64.58 |
| × | ✓ | ✓ | 68.75 |

명시적 텍스트 CoT는 CoT 없는 baseline보다 3.12%p만 올리지만, latent 텍스트 CoT는 9.37%p를 올린다. latent visual CoT를 더하면 4.17%p가 더 오른다. 저자는 latent visual CoT가 미래 상태의 예측 정보를 주입하는 동시에 멀티모달 alignment로 latent 텍스트 CoT를 암묵적으로 정규화한다고 해석한다. 표에 명시적 텍스트 CoT와 latent visual CoT를 함께 쓰는 조합은 없다.

### 4.5 latent collapse 분석 (Figure 6)

추론 요소별 latent 토큰(Subtask, Bbox, Motion)이 서로 분리된 의미 군집을 이루고, 지시문 토큰의 latent(회색)는 추론 latent와 다른 부분 공간을 차지한다. 저자는 이를 근거로 collapse가 관찰되지 않았고 latent CoT가 언어 임베딩을 단순 재사용하지 않는다고 주장한다. 차원 축소 방법은 논문에 적혀 있지 않다.

### 4.6 추론 효율 (Figure 7, NVIDIA A100)

| 모델 | 지연 (ms) |
|---|---|
| ThinkAct-7B | 7513 |
| ECoT-7B | 4434 |
| Fast-ThinkAct-3B | 805 |
| LaRA-VLA-4B | 135 |

LaRA-VLA는 rollout당 135 ms이며, 저자는 명시적 CoT 방식 대비 최대 90% 감소라고 쓴다. 표의 수치로는 ThinkAct-7B 대비 약 98%, ECoT-7B 대비 약 97%, latent 방식인 Fast-ThinkAct-3B 대비 약 83% 감소다. "per rollout"의 정확한 측정 단위(1회 action chunk 추론인지 여부)와 모델 크기 차이(3B~7B)는 따로 통제되지 않았다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **latent collapse 위험**: 명시적 감독이 없으면 latent 토큰 의미가 균질해질 수 있고, latent 토큰 수가 늘수록 심해진다(SIM-CoT 인용). 이를 피하려고 추론 단계당 latent 토큰을 1개로 제한했으며, 이것이 표현력을 제한할 수 있다.
- **학습 효율**: curriculum이 CoT 토큰을 latent로 바꿔 가면서 CoT 관련 토큰 수가 늘어 학습 비용이 커진다. 안정적인 latent 추론을 유지하며 학습 효율을 높이는 것이 향후 과제다.
- 논문이 다루지 않은 점: latent 추론의 해석 가능성(latent를 다시 텍스트로 읽어 내는 경로), Stage별 기여 ablation(Stage I이나 II 생략), action expert 구조 ablation, LIBERO에서의 CoT ablation은 제시되지 않았다. 실제 로봇 평가는 과제당 12회라 과제별 수치의 분산이 크다.

## 6. 관련 연구 (Related Work)

- **VLA 일반**: RT-2 이후 구조 개선(π0, π0.5, OpenVLA-OFT, OpenHelix)과 학습 및 추론 최적화(RICL, VOTE) 연구가 이어졌다.
- **텍스트 CoT VLA**: ECoT, Emma-x, Long-VLA, ActionSketcher, ThinkAct, OneTwoVLA. 지시문을 다듬거나 observation에서 motion과 물체 정보를 텍스트로 뽑는다.
- **visual CoT VLA**: CoT-VLA, DreamVLA, F1, UD-VLA, VITA. VQ-VAE 계열 이산 visual 토큰으로 미래 observation을 재구성하거나 예측한다.
- **텍스트와 visual 결합**: UP-VLA.
- **latent CoT**: Fast-ThinkAct가 VLA 쪽 latent CoT baseline이다. 언어 모델 쪽에서는 Coconut(hidden state를 다음 입력으로 되먹이는 연속 사고), SIM-CoT(implicit 추론 토큰 확장 시 불안정을 감독으로 안정화), CoDi(self-distillation으로 명시적 CoT를 연속 공간에 압축), SoftCoT, 그리고 VLM 쪽 Latent CoT for visual reasoning과 Multimodal Chain of Continuous Thought를 인용한다. LaRA-VLA는 답 감독만 쓰는 기존 방법과 달리 latent 추론을 visual 표현과 action 신호에 함께 grounding한다는 점을 차이로 든다.
- **EMA 목표 인코더**: VL-JEPA의 방식을 따른다.
- wiki 내 관련 페이지: [[physical-ai/sun-2026-vla-jepa-enhancing-vision-language-action-model-with]](latent world model로 미래 latent를 예측하는 VLA), [[physical-ai/li-2026-omega-0-a-latent-predictive]](latent 예측 기반 VLA), [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]](flow matching action expert), [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]](텍스트 subtask 추론 baseline), [[physical-ai/nvidia-2025-gr00t-n1-5-an-improved-open]](실제 로봇 baseline), [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]](baseline), [[physical-ai/starvla-vlact]](같은 StarVLA 코드베이스 계열).

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| LaRA-VLA | Latent Reasoning VLA. 텍스트와 visual CoT를 연속 latent로 내재화한 VLA |
| latent CoT | 중간 추론을 토큰 문자열이 아니라 모델 내부 연속 벡터로 수행하는 방식 |
| textual CoT latent | Stage II에서 subtask, bbox, motion 텍스트를 대체하는 `<|thinking|>` 토큰 자리의 latent |
| visual goal latent | `<img_next>` 토큰이 예측하는 다음 프레임의 visual latent. 입력과 같은 인코더(EMA 목표)의 출력에 L1로 맞춘다 |
| anchor-first, generate-later | semantic anchor(대상 물체)와 temporal anchor(그리퍼 기반 구간)를 먼저 정하고 그 조건에서 subtask, bbox, motion 주석을 생성하는 데이터 파이프라인 원칙 |
| LIBERO-LaRA, Bridge-LaRA | 이 논문이 LIBERO와 Bridge 데이터에 구조화 CoT 주석을 붙여 만든 학습 데이터셋 |
| global motion, local motion | 구간 목표까지의 방향(P_goal − P_now)과 순간 이동 방향(P_now+1 − P_now)을 방향 서술자로 바꾼 motion 추론 주석 |
| L_act-dis, L_act-con | Stage I과 II의 이산 action 토큰 손실과 Stage III의 flow matching 연속 action 손실 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | CoT 표현 방식 세 가지 비교 | caption-region | ★ wiki 권장 (concept) |
| fig02 | 5 | 3단계 학습 개요 | caption-region | ★ wiki 권장 (architecture) |
| fig03 | 6 | 단계별 attention mask | caption-region | ★ wiki 권장 (method) |
| fig04 | 7 | 실제 로봇 과제 4종 장면 | caption-region | ★ wiki 권장 (setup) |
| fig05 | 7 | 실제 로봇 성공률 막대 그래프 | caption-region | ★ wiki 권장 (result) |
| fig06 | 8 | latent collapse 분석 산점도 | caption-region | ★ wiki 권장 (analysis) |
| fig07 | 8 | 추론 지연 비교 | caption-region | ★ wiki 권장 (result) |
| fig08 | 12 | 단계별 학습 데이터 형식 예시 | caption-region | (텍스트라 본문 코드 블록으로 대체) |
| fig09 | 14 | 자동 CoT 주석 파이프라인 | caption-region | ★ wiki 권장 (data) |
| fig10 | 15 | 대상 물체 식별 프롬프트 | caption-region | (선택) |
| fig11 | 16 | subtask 서술 생성 프롬프트 | caption-region | (선택) |
| tab01 | 3 | CoT 표현 형식별 VLA 분류표 | manual | ★ wiki 권장 (taxonomy) |
| tab02 | 6 | LIBERO 성공률 비교표 | manual | ★ wiki 권장 (result) |
| tab03 | 7 | SimplerEnv WidowX 성공률 비교표 | manual | ★ wiki 권장 (result) |
| tab04 | 8 | CoT 감독 형식 ablation | manual | ★ wiki 권장 (ablation) |
| tab05 | 13 | 3단계 하이퍼파라미터표 | table-region | (본문 표로 재구성) |
| tab06 | 14 | 실제 로봇 subtask 단위 성공률 | table-region | (본문 표로 재구성) |
