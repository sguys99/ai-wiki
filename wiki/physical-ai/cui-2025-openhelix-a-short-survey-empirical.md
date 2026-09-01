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
    caption: "dual-system VLA를 가르는 7개 설계 축"
    page: 3
    bbox_norm: [0.078, 0.066, 0.914, 0.350]
    strategy: manual
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/cui-2025-openhelix-a-short-survey-empirical/fig02.png
    raw: raw/papers/cui-2025-openhelix-a-short-survey-empirical-figures/fig02.png
    caption: "평가 환경 3종 — 표준 CALVIN, 지시를 풀어 쓴 CALVIN-E, 물체가 움직이는 CALVIN-D"
    page: 4
    strategy: caption-region
    curated: false
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/cui-2025-openhelix-a-short-survey-empirical/fig03.png
    raw: raw/papers/cui-2025-openhelix-a-short-survey-empirical-figures/fig03.png
    caption: "MLLM 학습 방식 3종 — frozen, fine-tuning, prompt tuning"
    page: 6
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/cui-2025-openhelix-a-short-survey-empirical/fig04.png
    raw: raw/papers/cui-2025-openhelix-a-short-survey-empirical-figures/fig04.png
    caption: "비동기 추론 간격을 1에서 60까지 바꿔도 성공률이 거의 그대로다"
    page: 8
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/cui-2025-openhelix-a-short-survey-empirical/fig05.png
    raw: raw/papers/cui-2025-openhelix-a-short-survey-empirical-figures/fig05.png
    caption: "<ACT> latent를 의미 공간에 투영한 결과 — 물체가 왼쪽으로 밀려도 방향어 분포가 움직이지 않는다"
    page: 8
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/cui-2025-openhelix-a-short-survey-empirical/fig06.png
    raw: raw/papers/cui-2025-openhelix-a-short-survey-empirical-figures/fig06.png
    caption: "OpenHelix 전체 구조 — 얼린 MLLM + 학습되는 <ACT> 토큰 + diffusion policy"
    page: 9
    bbox_norm: [0.500, 0.212, 0.897, 0.374]
    strategy: manual
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/cui-2025-openhelix-a-short-survey-empirical/fig07.png
    raw: raw/papers/cui-2025-openhelix-a-short-survey-empirical-figures/fig07.png
    caption: "세부 구조 — (a) high-level MLLM과 보조 과제 head, (b) low-level diffusion policy"
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
  - id: tab02
    label: Table 2
    kind: table
    file: assets/cui-2025-openhelix-a-short-survey-empirical/tab02.png
    raw: raw/papers/cui-2025-openhelix-a-short-survey-empirical-figures/tab02.png
    caption: "CALVIN-D에서 단일 시스템 평가 — RoboFlamingo가 동적 조건 전부에서 0%"
    page: 5
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/cui-2025-openhelix-a-short-survey-empirical/tab03.png
    raw: raw/papers/cui-2025-openhelix-a-short-survey-empirical-figures/tab03.png
    caption: "low-level policy를 pre-training된 것에서 fine-tuning할 때와 from-scratch로 학습할 때"
    page: 5
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/cui-2025-openhelix-a-short-survey-empirical/tab04.png
    raw: raw/papers/cui-2025-openhelix-a-short-survey-empirical-figures/tab04.png
    caption: "MLLM 학습 방식 × CLIP loss 유무 조합"
    page: 6
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/cui-2025-openhelix-a-short-survey-empirical/tab05.png
    raw: raw/papers/cui-2025-openhelix-a-short-survey-empirical-figures/tab05.png
    caption: "prompt tuning 추가 실험 — CALVIN-E에서 격차가 벌어진다"
    page: 7
    strategy: table-region
    curated: true
  - id: tab06
    label: Table 6
    kind: table
    file: assets/cui-2025-openhelix-a-short-survey-empirical/tab06.png
    raw: raw/papers/cui-2025-openhelix-a-short-survey-empirical-figures/tab06.png
    caption: "projector 사전 정합 유무 — 없으면 세 방식 모두 성공률 0"
    page: 7
    bbox_norm: [0.090, 0.297, 0.897, 0.428]
    strategy: manual
    curated: true
  - id: tab07
    label: Table 7
    kind: table
    file: assets/cui-2025-openhelix-a-short-survey-empirical/tab07.png
    raw: raw/papers/cui-2025-openhelix-a-short-survey-empirical-figures/tab07.png
    caption: "MLLM 활용 방식 비교 — 시각 입력 제거와 보조 과제 추가의 효과"
    page: 9
    strategy: table-region
    curated: false
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
## 요약 (Summary)

짧은 서베이, 설계 축별 ablation, 오픈소스 모델. dual-system VLA를 이 세 덩어리로 묶은 기술 보고서다. LLaVA-7B는 완전히 얼려 두고 어휘에 추가한 `<ACT>` 토큰 하나만 학습시키며 3D Diffuser Actor를 붙인다. CALVIN ABC-D 평균 완료 길이는 3.45(표준)와 2.26(지시 확장)이다.

- 저자: Can Cui, Pengxiang Ding(프로젝트 리드) 외 13명
- 소속: Westlake University, Zhejiang University, Xi'an Jiaotong University, HKUST(GZ)
- arXiv: 2505.03912v1 (2025-05-06, cs.RO) · [프로젝트 페이지](https://openhelix-robot.github.io/)

제목 그대로 서베이와 실증 분석, 모델 공개가 한 문서에 들어 있다. 저자들 스스로 "initial version"이라 부르는 기술 보고서다. 마지막 절은 Figure의 Helix를 완전히 재현하기까지 남은 일을 다섯 항목으로 나열하며 닫는다.

## 주요 기여 (Key Contributions)

dual-system이라는 말은 그동안 느슨하게 쓰였다. 저자들이 여기에 판정 기준을 하나 세운다. System 1이 RGB 같은 실시간 perception 입력을 직접 받아야 dual-system이다. 이 기준으로 π0와 GR00T N1이 분류에서 빠진다. 두 시스템이 병렬로 돌되 갱신 주기가 다른 것이 구조의 본질이라면, 느린 쪽이 정보를 넘겨주는 동안 빠른 쪽은 자기 눈으로 환경을 보고 있어야 한다는 논리다.

설계 축은 7개로 갈랐고 축마다 CALVIN 실험을 붙였다. MLLM 선택, policy 선택, latent 표현 선택, MLLM 학습 방식, policy 학습 방식, 두 시스템의 연결 방식, 비동기 실행 방식이 그 일곱이다. 기존 논문들은 자기 조합만 보고하고 지나갔다. 그 빈자리를 통제된 비교로 채웠다.

![[assets/cui-2025-openhelix-a-short-survey-empirical/fig01.png]]
*Figure 1: dual-system VLA를 가르는 7개 설계 축 (Cui 2025, p.3)*

어휘에 새로 넣은 토큰 임베딩만 학습시키고 MLLM 파라미터는 하나도 건드리지 않는다. 이 결론을 그대로 반영한 것이 저비용 오픈소스 모델 OpenHelix다. 학습 비용도 기존 LoRA fine-tuning 방식보다 낮다.

마지막으로 기존 dual-system이 실제로는 시각 정보를 아래로 내려보내지 않는다는 진단을 실험으로 보인다. latent를 의미 공간에 투영해 보면 물체가 움직여도 방향어 확률 분포가 거의 그대로다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 서베이 부분

dual-process theory는 인간 인지를 빠르고 자동적인 System 1과 느리고 의식적인 System 2로 나눠 보는 심리학 틀이다. 로보틱스로 옮기면 System 1 자리에는 가볍고 과제 특화된 policy 네트워크가 들어간다. System 2 자리는 무겁지만 일반화가 되는 MLLM이나 VLA가 맡는다. MLLM은 multimodal large language model의 약어로, 이미지와 텍스트를 함께 받아 처리하는 대형 언어 모델을 가리킨다.

VLA의 한계 두 가지가 이 구조를 끌어들인 이유다. 하나는 속도다. RT-2는 55B 모델이 1~3Hz, 5B 모델이 약 5Hz로 도는 반면 BC-Transformer 같은 경량 모델은 50Hz 근처에서 움직인다. control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다. 이 차이가 실시간 제어 가능 여부를 가른다. 다른 하나는 학습 비용이다. pre-training이 비싼 데다 로봇 데이터로 end-to-end fine-tuning을 하면 domain shift와 catastrophic forgetting이 따라온다.

기존 6종의 구성은 Table 1에 정리돼 있다. System 2 쪽은 LLaVA-7B(LCB), OpenVLA-7B(DP-VLA·Robodual), InstructBLIP-7B(HiRT), Qwen2-VL-2B(DexVLA)로 갈린다. 학습은 LoRA fine-tuning이 다수이고 DP-VLA만 frozen이다. latent 표현은 `<ACT>` 토큰, 마지막 층 hidden embedding, 그 둘의 maxpooling, action latent + 언어 feature로 제각각이다. System 1 쪽 policy head도 3D Diffusion Actor·Transformer·RT-1·DiT·ScaledDP로 흩어져 있다. pre-training된 policy를 쓰는 곳은 LCB뿐이고 나머지는 from-scratch다.

![[assets/cui-2025-openhelix-a-short-survey-empirical/tab01.png]]
*Table 1: 기존 dual-system VLA 6종의 구성 비교 (Cui 2025, p.2)*

### 실증 분석 부분

평가 축은 CALVIN ABC→D다. 여기에 두 변형을 더 만들었다. CALVIN-E는 언어 지시를 풀어 쓴 버전이고 CALVIN-D는 grasping 과제에서 물체를 좌·전방·대각·원형 네 패턴으로 움직이게 한 버전이다. ablation은 1,000회 중 첫 100회만 돌려 속도를 확보했고 최종 표만 전수로 채웠다.

단일 시스템을 왜 배제했는지부터 확인한다. RoboFlamingo는 정적 조건에서 100%를 낸다. 그런데 네 동적 조건에서는 모두 0%다. 직전 6프레임으로 latent를 뽑아 LSTM에 넣는 구조라 물체가 움직이면 학습 때와 테스트 때 latent 분포가 어긋난다. 3DDA는 82/84/46/67/80으로 무너지지 않는다. 저자들도 π0와 GR00T N1을 아직 안 돌려봤다며 이 결론이 완전히 엄밀하지는 않다고 적어둔다.

평균 3.53 대 2.85. policy 학습은 pre-training된 3DDA를 fine-tuning하는 쪽이 from-scratch를 앞선다. 학습 시간도 줄어들어 이후 실험은 전부 이 설정을 쓴다.

MLLM 학습 방식은 frozen과 fine-tuning을 CLIP loss 유무와 교차시켰다. 얼려 두면 CLIP loss가 있든 없든 3.30 대 3.33으로 차이가 거의 없다. 바뀌지 않는 MLLM 출력을 아래쪽 입력 형식에 맞추는 것이 CLIP loss가 하는 일이라 그렇다. fine-tuning할 때는 3.53 대 3.13으로 벌어진다. 제약이 없으면 이미 학습된 policy의 attention 구조를 흔들어 놓기 때문이다.

저자들이 여기서 던진 물음이 이 논문의 방향을 정했다. CLIP loss로 성능을 붙잡는 건 결국 대형 모델의 일반화 능력을 깎아 먹는 대가는 아닌지, 파라미터를 얼린 채로도 아래쪽과 함께 갱신할 방법은 없는지를 묻는다. 그 답이 prompt tuning이다. 어휘에 `<ACT>` 토큰을 새로 넣고 lm-head 층만 학습시킨다. 나머지는 전부 고정이다. downstream 과제와만 관계된 토큰 하나를 어휘에 더할 뿐이라 원래 능력은 건드리지 않는다.

![[assets/cui-2025-openhelix-a-short-survey-empirical/fig03.png]]
*Figure 3: MLLM 학습 방식 3종 — fine-tuning, frozen, prompt tuning (Cui 2025, p.6)*

표준 CALVIN에서는 prompt tuning이 3.28~3.45로 다른 방식과 갈리지 않는다. 차이는 CALVIN-E에서 드러난다. prompt tuning(CLIP loss 없이) 2.13, fine-tuning 1.74, frozen 1.46이다. 여기서는 CLIP loss를 빼는 쪽이 오히려 낫다. prompt tuning이 애초에 일반화를 덜 훼손하니 추가 제약이 필요 없다는 해석이 붙는다.

![[assets/cui-2025-openhelix-a-short-survey-empirical/tab05.png]]
*Table 5: prompt tuning 추가 실험. 표준 CALVIN에서는 갈리지 않고 CALVIN-E에서 차이가 난다 (Cui 2025, p.7)*

위아래를 잇는 MLP projector를 미리 정합시키지 않고 바로 함께 학습시키면 frozen·fine-tuning·prompt tuning 세 방식 모두 성공률이 0이다. 연결 방식 실험의 결과는 이렇게 극단적이다. projector를 먼저 학습시키는 2단계 절차는 선택 사항이 아니라 전제 조건이다.

![[assets/cui-2025-openhelix-a-short-survey-empirical/tab06.png]]
*Table 6: projector 사전 정합 유무. ✗ 행 세 개가 모두 0이다 (Cui 2025, p.7)*

MLLM 한 번 추론당 policy가 도는 스텝 수를 1에서 60까지 바꿔도 성능이 거의 안 변한다. 비동기 실행 쪽은 예상 밖이었다. 3DDA의 최장 환경 스텝이 60이니 60은 MLLM이 에피소드당 한 번만 도는 극단적 비동기 조건이다. 그런데도 성능이 그대로다. 동적 환경에서도 마찬가지다.

이게 왜 이상한지가 다음 실험의 출발점이다. 위쪽이 환경 변화에 무감각하다. 그렇다면 latent가 실제로 무엇을 나르는지 봐야 한다. action 토큰의 latent 임베딩을 의미 공간에 투영해 단어 유사도를 계산했다. 팔이 왼쪽으로 가든 오른쪽으로 가든 "right" 확률이 "left"보다 일관되게 높고 방향어 분포는 시간이 지나도 거의 안 움직인다. Top-10 유사 단어도 지시문 속 대상 물체·공간 관계·동작 의미를 요약하는 데 그친다. latent가 나르는 건 시각 정보가 아니라 텍스트 지시의 요약이었다.

![[assets/cui-2025-openhelix-a-short-survey-empirical/fig05.png]]
*Figure 5: step 3에서 파란 블록을 왼쪽으로 밀어도 방향어 확률 분포가 거의 그대로다 (Cui 2025, p.8)*

마지막 확인으로 MLLM에서 시각 입력을 떼고 순수 LLM으로 쓰면 평균 3.45가 1.77로 떨어진다. 시각 정보를 잘 못 쓸 뿐 아예 안 쓰지는 않는다. 여기에 보조 과제를 붙이면 4.01까지 올라간다.

### OpenHelix 모델

high-level은 LLaVA-7B이고 파라미터가 전부 얼려 있다. 지시문 끝에 학습 가능한 `<ACT>` 토큰을 붙여 `l' = {l, <ACT>}`로 만들고 그 토큰 임베딩만 갱신한다. 입력은 3인칭 RGB와 과제 지시문이다. LLM 마지막 층에서 `<ACT>` 위치의 feature embedding을 뽑아 아래로 넘긴다.

![[assets/cui-2025-openhelix-a-short-survey-empirical/fig06.png]]
*Figure 6: OpenHelix 전체 구조. 얼린 MLLM에서 나온 `z<ACT>`가 diffusion policy로 넘어간다 (Cui 2025, p.9)*

여기에 보조 과제를 하나 얹는다. 저자들이 multimodal reasoning learning이라 부르는 과제로, `z<ACT>`를 MLP에 통과시켜 position `a^l`, rotation `a^r`, 개폐 상태 `a^g`를 직접 예측하게 한다. position과 rotation은 L1 loss로, 개폐는 binary cross-entropy로 지도한다. 추가로 준비할 데이터가 없다. 그러면서 대형 모델이 시각 입력을 실제로 쓰지 않으면 이 과제를 못 풀게 만든다.

low-level은 3D Diffuser Actor다. high-level이 넘긴 latent goal에 3D scene 토큰과 proprioception 토큰을 합쳐 noisy trajectory에서 noise를 반복적으로 걷어낸다. proprioception은 관절 각도 같은 로봇 자신의 상태 감각 입력을 말한다. 조건 주입은 FiLM과 cross-attention을 섞어 쓴다. 출력은 position noise `ε^l`, rotation noise `ε^r`, 그리퍼 개폐 `a^g`이고 projection은 4096차원을 512로 줄이는 선형 층 하나다.

![[assets/cui-2025-openhelix-a-short-survey-empirical/fig07.png]]
*Figure 7: 세부 구조. (a) high-level MLLM과 보조 과제 head, (b) low-level diffusion policy (Cui 2025, p.10)*

학습은 2단계로 나뉜다. 1단계에서는 MLLM과 policy를 모두 얼린 채 prompt와 projection만 2,000 iteration 학습해 임베딩을 policy의 feature 공간에 미리 맞춘다. 2단계에서 policy를 풀고 prompt·projection과 함께 100,000 iteration까지 돌린다. MLLM은 두 단계 내내 얼려 있다. 3DDA는 65,000 iteration 체크포인트를 pre-training 파라미터로 쓴다. 전체 목적함수는 `L_total = L_lm + L_policy`다.

## 결과 (Results)

CALVIN ABC-D 1,000회 전수 평가 결과는 Table 8에 있다.

![[assets/cui-2025-openhelix-a-short-survey-empirical/tab08.png]]
*Table 8: CALVIN ABC-D 최종 결과. MLLM (PT)는 prompt tuning, Policy(P)는 pre-training된 policy, AUX는 보조 과제, Asy(N)는 N스텝 지연 추론 (Cui 2025, p.11)*

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

표준 CALVIN에서 policy 단독 3.27과 완성형 3.45의 차이는 크지 않다. CALVIN-E에서는 1.42에서 2.26으로 59% 오른다. 위층을 붙여서 얻는 것은 표준 과제의 정확도가 아니라 언어 일반화다.

MLLM(PT) + Policy(P)만으로는 CALVIN-E가 1.72다. 보조 과제를 넣으면 2.26이 된다. Table 7의 3.45 → 4.01(100회 기준)도 같은 방향이다.

비동기 간격은 Asy(10)과 Asy(60)이 3.45 대 3.44, 2.26 대 2.20으로 사실상 같다. 에피소드당 MLLM을 한 번만 돌려도 성능이 유지된다. 실배포 관점에서는 반가운 결과다. 위층이 환경을 제대로 안 보고 있다는 앞선 진단을 뒤집어 말한 것이기도 하다.

앞선 ablation 다섯 건의 수치는 아래로 모았다.

| 비교 | 조건 A | 조건 B | 결론 |
|---|---|---|---|
| policy 학습 (Table 3) | fine-tuning 3.53 | from-scratch 2.85 | pre-training된 policy 사용 |
| MLLM 학습 (Table 4) | FT + CLIP 3.53 | FT − CLIP 3.13 | fine-tuning 시 CLIP loss 필수 |
| 일반화 (Table 5, CALVIN-E) | prompt tuning 2.13 | fine-tuning 1.74 / frozen 1.46 | prompt tuning 우세 |
| projector 정합 (Table 6) | 사전 정합 시 3.28~3.53 | 미정합 시 전부 0 | 2단계 학습이 전제 조건 |
| MLLM 활용 (Table 7) | MLLM + AUX 4.01 | 시각 제거(LLM) 1.77 | 시각 입력이 실제로 기여 |

> 프로젝트 저장소 [[physical-ai/openhelix-robot-awesome-dual-system-vla]]의 리더보드는 OpenHelix를 4.08로 적는다. 논문 공개 이후 갱신된 수치이므로, 논문을 인용할 때는 3.45를 쓴다.

## 한계 (Limitations)

저자들이 직접 적은 미완 목록이 다섯이다. 실기기 배포, 충분히 빠른 downstream policy 실행, 실물 로봇 구동, humanoid 배포, humanoid 간 협업. Figure의 Helix를 오픈소스로 재현한다는 목표에서 보면 갈 길이 멀다고 스스로 인정한다.

실험 범위도 시뮬레이션에 머문다. real-world 실험은 "나중에 보완"으로 미뤄져 있다. 단일 시스템 배제 논거도 RoboFlamingo 하나에 기대고 있어 π0·GR00T N1을 CALVIN-D에서 돌려봐야 한다고 본문에 적어둔다.

비동기 실행 쪽에서 검증한 것은 첫 번째 패러다임(동기 학습 후 비동기 추론)뿐이다. HiRT의 버퍼 기반 비동기 학습과 Robodual의 실시간 action 교체는 후속 과제로 남았다.

가장 큰 미해결은 저자들이 스스로 진단한 문제다. latent가 텍스트 지시의 요약에 그친다는 발견에 보조 과제로 대응했지만 그것이 근본 해법인지는 열려 있다. 대형 모델의 시각 추론 능력을 아래층까지 온전히 내려보내는 방법은 여전히 미정이다.

## 관련 페이지 (Related Pages)

- [[physical-ai/openhelix-robot-awesome-dual-system-vla]] — 같은 팀이 이 논문의 서베이 절을 옮겨 계속 갱신하는 목록. 논문의 판정 기준이 그대로 적용된다
- [[physical-ai/figure-ai-2025-helix-a-vision-language-action]] — 이 프로젝트가 오픈소스로 재현하려는 원본. Table 1에서 Helix 행이 대부분 N/A인 이유는 논문 공개가 없어서다
- [[physical-ai/9bow-2025-helix-generalist-humanoid-vla]] — 같은 Helix의 한국어 해설
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]] — 저자들의 기준으로는 dual-system이 아니다. System 1이 실시간 perception을 받지 않아서다
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — 같은 이유로 제외되지만, frozen 학습으로 좋은 결과를 낸 사례라 MLLM 학습 실험의 동기가 됐다
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]] — DP-VLA와 Robodual이 System 2로 쓰는 모델
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]] — VLA 개념의 출발점이자, 55B에서 1~3Hz라는 속도 한계로 dual-system의 동기를 제공한 모델
- [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]] — HiRT가 System 1으로 쓰는 policy head
- [[physical-ai/xu-2025-an-anatomy-of-vision-language-action-models]] — VLA 서베이. System 2 반성 층을 향후 방향으로 제안한다
- [[physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics]] — full-stack VLA 서베이. action head 분류에서 이 논문의 policy 선택 논의와 겹친다
- [[physical-ai/learnopencv-2025-vision-language-action-models-vla]] — dual-system을 훨씬 느슨하게 쓰는 사례. GR00T N1과 Helix를 나란히 이 틀의 대표로 놓는데, 이 논문의 기준(System 1이 실시간 perception 입력을 직접 받아야 한다)으로는 GR00T N1이 빠진다. 용어가 어떻게 헐거워지는지 보여주는 대조군
- [[overviews/glossary-physical-ai]] — dual-system VLA · CLIP loss · projector pre-alignment · multimodal reasoning learning 표기
