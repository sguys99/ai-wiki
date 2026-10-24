---
title: "FLORA: An Open Model Suite for Scaling Robotics Data Engines"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/leng-2026-flora-an-open-model-suite.pdf
raw_filename: "leng-2026-flora-an-open-model-suite.pdf"
source_collection: external
authors: "Sicong Leng*, Yunze Man*, Zhiqi Li*, Jing Wang, Yuhe Zhang, Ryan Punamiya, Siddharth Patki, Kaiyuan Zheng, Zi-ang Cao, Zhiding Yu, Sifei Liu, Danfei Xu, Ben Levin, Jan Kautz, Yuke Zhu†, Johan Bjorck*†, Linxi \"Jim\" Fan† (NVIDIA GEAR)"
url: "https://research.nvidia.com/labs/gear/flora/assets/paper/flora.pdf"
tags: [physical-ai, robot-dataset, robot-learning, benchmark]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/leng-2026-flora-an-open-model-suite/fig01.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/fig01.png
    caption: "Flora의 다섯 가지 기능. 컵 피라미드 쌓기 episode를 temporal segmentation으로 A부터 G까지 7개 구간으로 나누고 구간마다 맥락형 action caption을 붙인다. 아래에는 outcome reward(1~5점), process reward(Normal, Suboptimal, Failure), rubric reward(콩 퍼 담기 과제 0.60/1.00) 예시가 있다"
    page: 1
    bbox_norm: [0.0947,  0.4582,  0.9056,  0.8229]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/leng-2026-flora-an-open-model-suite/fig03.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/fig03.png
    caption: "annotation 품질 대비 비용. 가로 방향은 원본 영상 1시간당 비용(USD, log 눈금), 세로 방향은 annotation 품질이다. Flora는 품질 57.1%를 시간당 $0.72에, GPT-6 Astra(max)는 53.7%를 $88.49에 달성해 Flora가 약 125배 저렴하다"
    page: 2
    bbox_norm: [0.0947,  0.0939,  0.9053,  0.4906]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/leng-2026-flora-an-open-model-suite/fig04.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/fig04.png
    caption: "하나의 data engine이 담당하는 여섯 과제의 결과. 위 3개는 timestamped caption(WGO, 사람, 로봇 action annotation), 아래 3개는 reward(outcome 정확도, dense reward, rubric 채점)이며 Flora를 GPT-6 Astra 등 범용 모델과 비교한다"
    page: 4
    bbox_norm: [0.0947,  0.0939,  0.9053,  0.4859]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/leng-2026-flora-an-open-model-suite/fig05.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/fig05.png
    caption: "WGO-Bench에서 완성형 파이프라인 비교. Flora(Qwen3.5-9B/27B)는 segmentation F1 50.3%, gold-window 정확도 64.7%, joint F1 34.5%로 Refiner, Pegasus, common pipeline, LeRobot보다 높다"
    page: 5
    bbox_norm: [0.0947,  0.0939,  0.9053,  0.3219]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/leng-2026-flora-an-open-model-suite/fig06.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/fig06.png
    caption: "Flora와 GPT-6 Astra의 정성 비교. 사람 episode에서 Flora는 참조 구간 37개 중 34개를 맞춰 F1@0.5 82.9를 얻고 Astra는 18.2에 그친다. 전선 삽입과 손 간 전달 caption, 장난감 비행기 조립 실패 탐지, 병 넘어뜨리기의 부분 진행 3/5 채점 사례를 함께 보인다"
    page: 7
    bbox_norm: [0.0947,  0.0939,  0.9056,  0.512]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/leng-2026-flora-an-open-model-suite/fig07.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/fig07.png
    caption: "영상에서 재사용 가능한 감독 신호를 만드는 전체 흐름. 왼쪽은 겹치는 window의 구간 조각을 이어 붙인 뒤 앞뒤 맥락과 함께 caption을 생성하는 과정이고, 오른쪽은 하나의 reward 모델이 dense(0.5초 단위), outcome(1~5점), rubric 라벨을 내는 과정이다"
    page: 8
    bbox_norm: [0.0947,  0.0939,  0.9053,  0.3968]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/leng-2026-flora-an-open-model-suite/fig08.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/fig08.png
    caption: "가정한 처리 속도 대비 annotation 품질. API 모델은 Table 10의 할당량 시나리오를, Flora는 8-GPU replica 12개를 가정해 분당 원본 영상 22.15시간에서 품질 57.1%를 보인다. 처리 속도는 측정값이 아니라 모델링한 값이다"
    page: 24
    bbox_norm: [0.0947,  0.32,  0.9053,  0.6339]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/leng-2026-flora-an-open-model-suite/fig09.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/fig09.png
    caption: "시간에 따른 action과 reward. 위는 꽃꽂이 episode의 집기, 건네기, 꽂기 세 연속 action caption이고, 아래는 장난감 자동차 조립 중 왼손 grasp 불량을 Failure로 국소화한 사례다"
    page: 25
    bbox_norm: [0.0947,  0.1261,  0.9056,  0.6036]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/leng-2026-flora-an-open-model-suite/fig10.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/fig10.png
    caption: "embodiment별 출력 예시. 사람(신발 세척), 평행 그리퍼(과일 옮기기), dexterous hand(가위 건네기와 필름 자르기)의 timestamped caption과 장난감 자동차 조립의 dense reward, 당근 놓기와 수건 접기의 outcome 3/5 판정을 보인다"
    page: 26
    bbox_norm: [0.1014,  0.12,  0.8986,  0.6658]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/leng-2026-flora-an-open-model-suite/fig11.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/fig11.png
    caption: "GPT-6 Astra와의 정성 비교. Flora는 촘촘한 action 구간(a)과 전선 삽입, 배터리 끼움 같은 국소 조작(c, e)을 더 잘 잡지만, 큰 단위 구간을 과분할하거나(b) action 단계와 물체를 혼동하는(d, f) 사례도 있다"
    page: 27
    bbox_norm: [0.1345,  0.0937,  0.8661,  0.618]
    strategy: caption-region
    curated: true
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/leng-2026-flora-an-open-model-suite/fig12.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/fig12.png
    caption: "Flora-Rewarder가 실패를 표시하고 부분 진행을 인정하는 사례. DenseRewardBench에서 Astra는 날개가 떨어지는 장면과 grasp 실패를 자기 rationale로 서술하고도 Suboptimal로 표시하고(a~d), RoboRewardBench에서는 부분 성공과 완전 성공을 낮게 채점한다(e, f)"
    page: 28
    bbox_norm: [0.1345,  0.0937,  0.8661,  0.6576]
    strategy: caption-region
    curated: true
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/leng-2026-flora-an-open-model-suite/fig13.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/fig13.png
    caption: "window 기반 localization과 맥락형 captioning 도식. 겹치는 window가 중앙 core 영역의 조각만 내보내고, timestamp 투영과 stitching으로 episode 구간을 복원한 뒤 앞, 대상, 뒤 시각 블록으로 구간마다 지시문을 생성한다"
    page: 31
    bbox_norm: [0.1019,  0.13,  0.8981,  0.4186]
    strategy: caption-region
    curated: true
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/leng-2026-flora-an-open-model-suite/fig14.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/fig14.png
    caption: "동기화된 다중 시점과 시간 맥락. 시점 t마다 주 카메라를 위에, 좌우 손목 카메라를 아래에 둔 mosaic 하나를 만들고 앞, 대상, 뒤 블록 안에서 mosaic의 시간 순서를 유지한다"
    page: 31
    bbox_norm: [0.1019,  0.4938,  0.8981,  0.6915]
    strategy: caption-region
    curated: false
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/leng-2026-flora-an-open-model-suite/fig15.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/fig15.png
    caption: "하나의 reward 모델이 제공하는 세 가지 인터페이스. 컵을 쟁반에 세워 놓는 episode에 대해 outcome 프롬프트는 5점(E[s]=4.6), dense 프롬프트는 16초 window마다 32개 group 품질과 rationale, rubric 프롬프트는 단계별 점수(합계 0.75)를 낸다"
    page: 36
    bbox_norm: [0.1291,  0.1594,  0.8709,  0.5096]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/leng-2026-flora-an-open-model-suite/tab01.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/tab01.png
    caption: "벤치마크 점수 요약. WGO-Bench, DenseCaptionBench(Human100, Robot200), RoboRewardBench와 RobometerBench, DenseRewardBench, RubricBench에서 Flora를 GPT-6 Astra, GPT-5.6 Sol, Gemini 3.8 Flash, Claude Opus 5, Kimi K3, Qwen3.5-397B-A17B와 비교한다"
    page: 3
    bbox_norm: [0.0849,  0.1229,  0.9151,  0.8571]
    strategy: manual
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/leng-2026-flora-an-open-model-suite/tab02.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/tab02.png
    caption: "WGO-Bench 전체 결과. HomER, DROID, Galaxea 세 부분집합별 segmentation F1@0.75, gold-window 정확도, joint semantic F1@0.75와 동일 가중 평균"
    page: 13
    bbox_norm: [0.0947,  0.2431,  0.9053,  0.5042]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/leng-2026-flora-an-open-model-suite/tab03.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/tab03.png
    caption: "DenseCaptionBench 전체 결과. 사람 100개, 평행 그리퍼 100개, dexterous hand 100개 episode에서 segmentation F1@0.5, oracle caption point quality, joint point F1@0.5를 비교한다"
    page: 13
    bbox_norm: [0.0947,  0.5937,  0.903,  0.8695]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/leng-2026-flora-an-open-model-suite/tab04.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/tab04.png
    caption: "공개 reward 벤치마크 결과. RoboRewardBench MAE와 RobometerBench OOD Kendall, ID VOC, OOD VOC에서 범용 모델, 전문 reward 모델, Flora-Rewarder를 비교한다"
    page: 14
    bbox_norm: [0.0947,  0.168,  0.9053,  0.5168]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/leng-2026-flora-an-open-model-suite/tab05.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/tab05.png
    caption: "내부 reward 벤치마크 결과. DenseRewardBench의 macro F1, balanced accuracy, bad-action F1, failure recall과 RubricBench의 pooled L1 오차"
    page: 14
    bbox_norm: [0.0947,  0.5921,  0.9053,  0.9285]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/leng-2026-flora-an-open-model-suite/tab06.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/tab06.png
    caption: "DenseCaptionBench 구성. 사람(1인칭 카메라) 100개 episode에 참조 구간 3,220개, 평행 그리퍼와 dexterous hand(주 카메라와 손목 카메라 2대) 각 100개 episode에 1,266개와 391개로 총 4,877개다"
    page: 15
    bbox_norm: [0.094,  0.3829,  0.908,  0.9285]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/leng-2026-flora-an-open-model-suite/tab07.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/tab07.png
    caption: "baseline 디코딩 설정. 모델별 추론 강도와 샘플링 방식, DenseCaptionBench와 WGO의 출력 토큰 한도"
    page: 16
    bbox_norm: [0.0941,  0.6242,  0.9056,  0.9285]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/leng-2026-flora-an-open-model-suite/tab08.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/tab08.png
    caption: "WGO-Bench 파이프라인 비교. Gemini 3.5 Flash를 공유하는 common pipeline, Refiner, LeRobot annotate와 고유 backbone을 쓰는 Pegasus 1.5, Flora의 부분집합별 점수"
    page: 19
    bbox_norm: [0.094,  0.1393,  0.9081,  0.9285]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/leng-2026-flora-an-open-model-suite/tab09.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/tab09.png
    caption: "Gemini 3.8 Flash backbone으로 다시 실행한 파이프라인 비교. Refiner는 joint F1 36.4%로 Flora(34.5%)를 넘지만 segmentation F1은 Flora가 50.3%로 가장 높다. Flora(API) 대체 실험 결과도 포함한다"
    page: 20
    bbox_norm: [0.0947,  0.3209,  0.9053,  0.9285]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/leng-2026-flora-an-open-model-suite/tab10.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/tab10.png
    caption: "처리 속도 추정에 쓴 할당량 시나리오. 모델별 분당 요청 수(RPM)와 분당 입력, 출력 토큰 한도"
    page: 23
    bbox_norm: [0.0941,  0.2417,  0.9067,  0.9285]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/leng-2026-flora-an-open-model-suite/tab11.png
    raw: raw/papers/leng-2026-flora-an-open-model-suite-figures/tab11.png
    caption: "사과 자르기 과제의 rubric 예시. 사과 잡기(최대 0.4), 칼 집기(최대 0.3), 사과 반으로 자르기(최대 0.3) 세 단계와 단계별 허용 점수"
    page: 36
    bbox_norm: [0.0947,  0.5648,  0.9053,  0.7666]
    strategy: table-region
    curated: true
---

## 한 줄 요약 (One-line Summary)

Flora는 NVIDIA GEAR 팀이 GR00T 모델 학습에 실제로 써 온 로봇 데이터 annotation 엔진으로, Qwen3.5 기반 segmentation 모델(9B), captioning 모델(27B), reward 모델(27B) 세 개가 timestamped caption, dense(process) reward, outcome reward, rubric reward를 함께 생성한다. GPT-6 Astra와 비슷한 품질을 약 125배 낮은 비용으로 내며, GB300 512장에서 하루 20만 시간 분량의 영상을 라벨링한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | FLORA: An Open Model Suite for Scaling Robotics Data Engines |
| 저자 | Sicong Leng, Yunze Man, Zhiqi Li 외 14명 (공동 1저자 표시 *, 공동 지도 표시 †: Yuke Zhu, Johan Bjorck, Linxi "Jim" Fan) |
| 소속 | NVIDIA (GEAR 팀) |
| 날짜 | 2026-10-20 (PDF 표지), 37쪽 |
| 공개 자원 | 프로젝트 페이지 research.nvidia.com/labs/gear/flora/, 모델 묶음 huggingface.co/collections/nvidia/flora |
| 함께 수집한 자료 | 프로젝트 페이지 (sources/nvidia-2026-flora-an-open-model-suite.md) |

PDF에는 Figure 2 라벨이 없다. Figure 1 다음 도식이 Figure 3으로 번호가 매겨져 있어 figure 후보도 fig01, fig03부터 이어진다.

## 2. 주요 기여 (Key Contributions)

로봇 foundation model은 학습 단계마다 다른 종류의 라벨이 필요하다. 논문은 이 세 수요를 하나의 엔진으로 묶는다.

| 학습 단계 | 필요한 라벨 | 쓰임 |
|---|---|---|
| pre-training | timestamped action 지시문(instruction) | 언어 조건 부여, 데이터 혼합 재조정 |
| 강화학습 post-training | process reward | episode 안에서 진행을 재는 단계별 감독 신호 (언어 모델의 step-level supervision과 비슷하다) |
| 배포 | outcome reward | 로봇 fleet 모니터링, 실패 탐지, 대규모 policy 평가 |

- 기존 시스템은 대부분 한 종류의 annotation만 다룬다. 범용 frontier 모델은 여러 종류를 낼 수 있지만 현대 로봇 데이터셋 규모에서는 너무 비싸다.
- Flora는 captioning, segmentation, reward 모델 셋으로 timestamped caption, process reward, outcome reward를 함께 만들고, 사용자 정의 rubric으로 test-time에 reward를 유연하게 정의하는 기능도 제공한다.
- WGO-Bench(captioning)와 RoboReward, Robometer(reward)에서 SOTA를 기록하고, 내부 벤치마크에서는 GPT-6 Astra와 경쟁하면서 다른 frontier 모델을 앞선다.
- 비용은 GPT-6 Astra 대비 약 125배 낮다.
- 512개 GB300에서 하루 최대 20만 시간 분량을 라벨링하는 운영 규모로 검증되었다.
- 새 내부 벤치마크 3종을 만든다: DenseCaptionBench(300 episode), DenseRewardBench(40 episode), RubricBench(40 episode).
- 모델을 오픈소스로 공개해 연구자가 자체 로봇 데이터셋을 확장하고 physical auto-research, human-to-robot transfer 같은 응용을 탐색하도록 한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 전체 구성

| 구성 요소 | 초기화 모델 | 역할 | 학습 |
|---|---|---|---|
| segmentation 모델 f_θ | Qwen3.5-9B | 겹치는 window에서 action 구간 (s, e)와 연속 flag 예측 | SFT(LoRA, visual encoder 고정) 후 GRPO |
| captioning 모델 g_φ | Qwen3.5-27B | 구간마다 앞, 대상, 뒤 시각 맥락으로 의도된 action을 서술 | SFT(언어 모델과 visual merger 갱신) 후 GRPO |
| reward 모델 r_ψ (Flora-Rewarder) | Qwen3.5-27B | 프롬프트로 outcome, dense, rubric 중 하나를 선택 | SFT만 (언어 모델, visual merger, visual encoder 모두 갱신) |

SFT는 NeMo AutoModel로, 강화학습은 PyTorch 자체 구현으로 수행한다. 학습 데이터는 오픈소스 데이터셋, 라이선스 계약한 상용 데이터셋, 자체 수집하고 라벨링한 내부 데이터셋을 조합한다. 사람 annotator가 상세한 가이드라인에 따라 dense timestamped caption과 action 품질 라벨을 단다.

### 3.2 timestamped caption 파이프라인

출력은 영상 X(길이 T)에 대해 (s_i, e_i, c_i) 튜플의 집합이다. c_i는 s_i부터 e_i 사이의 의도된 action을 서술하는 문자열이며, action은 여러 동작에 걸칠 수 있고 성공하지 않아도 된다.

1. **겹치는 window 분할**: episode를 겹치는 window로 나눈다. 각 window는 중앙의 출력 영역(core)과 주변 맥락(guard)으로 구성된다. 기본 설정은 16초 window에 64프레임(4Hz), core 12초, 앞뒤 guard 2초다. long-horizon 로봇 데이터는 32초 window, core 24초, guard 4초를 쓴다.
2. **window 내 예측**: segmentation 모델이 window 상대 시각으로 시작과 끝, 그리고 구간이 window 왼쪽과 오른쪽 경계를 넘어 이어지는지 나타내는 binary 연속 flag를 예측한다. 출력 좌표는 20Hz tick 단위다.
3. **필터와 stitching**: core와 겹치는 조각만 남기고, 로컬 timestamp를 episode 시각으로 투영한 뒤 시간 겹침과 연속 flag로 같은 action의 조각을 잇는다. 동시에 일어나는 action은 별도 구간으로 유지한다. guard에만 있는 조각은 구간을 만들지 않는다.
4. **경계 정제**: 이동한 window로 segmentation 모델을 다시 호출해 미해결 경계를 다듬는다. 영상에서 보이지 않는 끝점은 전이를 지어내지 않고 보이는 범위만 유지한다.
5. **맥락형 captioning**: 각 구간 I_i에 대해 대상 프레임 X_i와 바로 앞뒤의 겹치지 않는 이웃 구간 프레임 X_i^-, X_i^+를 준비하고, captioning 모델이 c_i = g_φ(X_i^-, X_i, X_i^+, q_cap)를 독립적으로 생성한다. 앞, 대상, 뒤 블록은 명시적으로 라벨링되고 caption은 I_i 범위로 제한된다. 이웃 프레임은 물체 정체와 국소 의도를 판별하는 데 쓰인다.
6. **다중 카메라**: 시점마다 주 카메라를 위에, 좌우 손목 카메라를 아래에 둔 mosaic 한 장으로 타일링한다. 프롬프트가 카메라 역할을 알려주고 시점 전체에 걸친 action 서술 하나를 요청한다.
7. **caption 형식**: 의도된 action, 물체, manipulator 역할, 관련 공간 관계를 담은 자기완결적 명령문이다. 실패한 시도도 성공을 암시하지 않고 의도된 목표를 유지한다.

이웃 구간 맥락은 학습과 운영에서 쓰고, DenseCaptionBench 평가에서는 맥락을 대상 앞뒤 최대 2초로 제한한다. 동점일 때는 더 짧은 이웃 구간을 고른다.

### 3.3 reward 라벨

Flora-Rewarder는 단일 모델 r_ψ이고 프롬프트로 세 가지 reward 중 하나를 고른다. outcome과 dense 프롬프트는 동기화된 카메라 시점을 시점당 mosaic 한 장으로 묶고 episode의 전체 과제 지시문을 조건으로 받는다. rubric 채점은 카메라별 영상을 따로 받는다.

| reward 종류 | 출력 | 쓰임 |
|---|---|---|
| outcome | 과제 완료 점수 1(완전 실패)~5(완전 성공), 선택적으로 짧은 rationale | 배포 모니터링, 데이터 필터링, policy 평가 |
| dense (process) | 0.5초 단위 group마다 failure(1), suboptimal(2), normal(3)과 비정상 구간 rationale | 강화학습 post-training의 단계별 credit assignment, 세밀한 데이터 큐레이션 |
| rubric | 사용자가 정의한 단계별 허용 점수 중 하나씩, 합계가 최대 1 | test-time에 reward를 유연하게 정의 |

**outcome reward**: 실제 로봇에서는 사람이 episode마다 성공 여부를 라벨링해야 하는데, outcome reward 모델이 이를 대신한다. 연속 reward가 필요하면 다섯 점수 토큰의 확률 분포에서 기댓값 E[s]를 구해 ŷ = (E[s] − 1)/4로 [0, 1]에 맞춘다. 생성된 점수 토큰 위치에서 상위 20개 후보 중 1~5로 디코딩되는 것만 남겨 재정규화한다. 프레임은 m = min(64, max(2, ⌊10N/f⌋))개를 균등 샘플링하고 첫 프레임과 마지막 프레임을 항상 포함한다. 학습 데이터에서 binary 성공과 실패는 5와 1로, 부분 성공 p∈[0,1]은 s = 1 + round(4p)로 변환한다.

**dense reward**: failure는 큰 과제 실패, 안전하지 않거나 파괴적인 사건, 과제 수행 가능성 상실을 뜻한다. suboptimal은 주저하거나 비효율적이거나 부정확하거나 국소적으로 틀렸지만 복구 가능한 action이다. 라벨은 retrospective하다. 즉 뒤 프레임이 앞선 실수를 드러낼 수는 있지만 뒤의 복구가 앞 단계의 라벨을 올려주지는 않는다.

- window는 16초(64프레임, 4FPS)이고 10초씩 이동한다. 출력은 2프레임씩 묶인 32개 group의 품질 문자열이다.
- 마지막이 아닌 window는 마지막 4초(group 25~32)를 버려, 남은 라벨마다 이후 시각 증거가 있도록 한 뒤 episode 시각으로 stitching한다.
- 출력 형식은 `Worst: <1~3>`, 32자리 `Quality:` 문자열, 비정상 연속 구간별 `Rationales:`이다. Worst는 32자리 중 최솟값과 같아야 한다.
- 디코딩은 정규식으로 문법을 제약한 greedy 방식이며 최대 640 토큰이다. Worst와 Quality가 불일치하면 거부하고, 파싱 불가 답은 전부 normal로 바꾸고 표시한다.
- 과제 조건은 episode의 전체 과제 지시문만 쓰고 subtask annotation은 쓰지 않는다. failure, success, retry, recovery처럼 결과를 드러내는 단어는 지운다.
- 사람 annotator는 episode마다 action 이름, 시작과 끝 시각, 결과(success, normal, suboptimal, failure)를 표로 채우고, suboptimal과 failure에는 문제 서술을 반드시 적는다. 30FPS 프레임 라벨로 변환하며 겹치면 더 심각한 라벨을 택한다.

**rubric reward**: rubric은 과제 단계를 순서대로 나열하고 단계마다 action 설명, 최대 점수, 2~5개의 점수 수준을 둔다. 최대 점수 합은 1이다. 모델은 thinking 모드로 추론한 뒤 단계당 점수 하나를 주고 총점 R_ρ(X) = Σ ŷ_j를 계산한다. 답은 마지막 `ANSWER:` 줄의 JSON 배열에서 파싱한다. 내부 policy 평가용 rubric은 2~10단계, 외부 episode용은 1~4단계다.

| 단계 | 점수 | 기준 (Table 11 사과 자르기 예시) |
|---|---|---|
| 1. 사과 확실히 잡기 | 0.0 / 0.2 / 0.4 | 못 잡음 / 닿았지만 못 쥠 / 확실히 쥠 |
| 2. 칼 집기 | 0.0 / 0.15 / 0.3 | 못 집음 / 쥐었다가 떨어뜨림 / 안정적으로 집음 |
| 3. 사과 반으로 자르기 | 0.0 / 0.15 / 0.3 | 못 자름 / 일부만 자름 / 완전히 반으로 자름 |

### 3.4 학습 세부

- **segmentation SFT**: rank 32, α=64의 LoRA를 언어 모델의 attention과 MLP projection에 적용하고 visual encoder는 고정한다. 목표는 window 로컬 구간과 연속 flag를 직렬화한 문자열이다.
- **captioning SFT**: 언어 모델과 visual merger를 갱신하고 visual patch 임베딩과 Transformer 블록은 고정한다. AdamW와 gradient clipping, sharding과 activation checkpointing을 쓴다.
- **reward SFT**: 언어 모델, visual merger, visual encoder를 모두 갱신하되 visual encoder는 학습률을 낮춘다. 세 reward 종류의 데이터를 재가중이나 oversampling 없이 섞어 1 epoch 학습한다. rubric 예시는 thinking 모드로, outcome과 dense는 바로 답한다. 공개된 reward 모델은 SFT만 거쳤다.
- **segmentation 강화학습**: GRPO와 검증 가능한 reward r_seg = 0.45 F_0.5 + 0.15 F_0.75 + 0.25 P_0.5 + 0.15 B를 쓴다. F_τ와 P_τ는 tIoU 임계값 τ에서의 temporal F1과 precision이고, B는 끝점 오차와 연속 flag 정확도를 반영한다(잘못된 flag마다 0.5초 오차 추가, max(0, 1 − d/1초)의 평균). 둘 다 빈 집합이면 reward 1, 잘못되거나 잘린 출력은 0이다. 그룹 평균만 빼는 advantage(표준편차 정규화 없음)와 SFT policy에 대한 KL 정규화를 쓰고 LoRA만 갱신한다.
- **captioning 강화학습**: reference 기반 point-quality reward r_cap = 2M/(R+M+F)를 쓴다. R은 근거 있는 reference 요구사항의 질량, M은 caption이 다룬 질량, F는 입증된 사실 오류의 벌점이다. 부분 점수를 준다. 언어 모델만 갱신하고 visual encoder와 merger는 고정한다.
- **checkpoint 선택**: segmentation은 검증 집합에서 가중 F1@0.5를 최대화하되 각 보호 그룹의 하락을 2%p 이내로 제한한다. captioning은 세 embodiment를 동일 가중해 트랙별 퇴보가 없는 checkpoint 중 평균 품질이 가장 높은 것을 고른다. 벤치마크 결과는 선택에 쓰지 않는다.

### 3.5 추론 설정

- 추론은 BF16으로 하되 Gated DeltaNet 파라미터와 temporal LoRA 텐서는 FP32로 유지한다.
- greedy 디코딩으로 temporal 토큰 1,024개, caption 토큰 512개를 허용한다.
- captioning 모델은 duration-adaptive 8Hz 샘플링을 쓴다.
- outcome과 dense 프롬프트에는 샘플링한 프레임의 원본 프레임 번호와 frame rate를 그대로 넘겨, Qwen3.5의 timestamp 토큰이 학습과 추론 모두에서 episode 절대 시각(초)을 가리키게 한다.
- reward mosaic은 1~4개 시점을 1×1, 1×2, 1×3, 2×2로 배치하고 64프레임 클립을 시각 토큰 14,336개 이하로 제한한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 요약 표 (Table 1, 모든 값 ×100)

| 벤치마크 / 지표 | Flora | GPT-6 Astra | GPT-5.6 Sol | Gemini 3.8 Flash | Claude Opus 5 | Kimi K3 | Qwen3.5-397B-A17B |
|---|---|---|---|---|---|---|---|
| WGO Segmentation F1@0.75 ↑ | **50.3** | 46.0 | 33.7 | 26.4 | 25.5 | 26.1 | 19.5 |
| WGO Gold-window accuracy ↑ | 64.7 | **77.4** | 56.6 | 70.9 | 49.3 | 50.6 | 46.0 |
| WGO Joint semantic F1@0.75 ↑ | 34.5 | **39.0** | 24.6 | 21.7 | 15.4 | 16.7 | 11.2 |
| DCB Human100 Segmentation F1@0.5 ↑ | **54.6** | 44.2 | 32.6 | 33.5 | 22.7 | 21.1 | 19.6 |
| DCB Human100 Caption point quality ↑ | **66.5** | 60.3 | 36.4 | 46.7 | 31.0 | 30.3 | 29.1 |
| DCB Human100 Joint point F1@0.5 ↑ | **37.4** | 29.7 | 14.6 | 17.7 | 8.2 | 7.9 | 7.8 |
| DCB Robot200 Segmentation F1@0.5 ↑ | 66.9 | **71.9** | 45.8 | 45.8 | 45.9 | 41.2 | 37.0 |
| DCB Robot200 Caption point quality ↑ | 73.7 | **80.2** | 69.6 | 66.0 | 49.7 | 48.0 | 49.5 |
| DCB Robot200 Joint point F1@0.5 ↑ | 51.0 | **57.9** | 33.6 | 32.2 | 23.6 | 22.2 | 19.8 |
| RoboReward MAE ↓ | **40.0** | 55.4 | 78.0 | 83.3 | 88.2 | 68.2 | 87.1 |
| Robometer OOD Kendall ↑ | 72.0 | **82.3** | 64.2 | 63.3 | 63.1 | 63.5 | 48.8 |
| Robometer ID VOC ↑ | **98.9** | **98.9** | 97.1 | 96.9 | 91.8 | 97.2 | 91.5 |
| Robometer OOD VOC ↑ | 99.6 | **99.7** | 99.3 | 98.6 | 98.6 | **99.7** | 97.1 |
| DenseReward Macro F1 ↑ | **46.2** | 40.7 | 36.3 | 38.8 | 33.9 | 31.2 | 34.7 |
| DenseReward Balanced accuracy ↑ | **54.2** | 44.1 | 37.8 | 40.2 | 35.1 | 32.3 | 39.2 |
| DenseReward Bad-action F1 ↑ | **47.7** | 44.8 | 26.4 | 31.2 | 22.9 | 17.6 | 31.3 |
| DenseReward Failure recall ↑ | **53.3** | 0.0 | 1.0 | 11.7 | 0.3 | 0.3 | 3.3 |
| RubricBench Pooled L1 error ↓ | 6.5 | **3.6** | 8.4 | 32.6 | 17.1 | 15.6 | 8.9 |

(DCB는 DenseCaptionBench)

### 4.2 timestamped caption

**공통 파이프라인**: 기성 모델은 공유 2단계 파이프라인으로 평가한다. 한 번의 호출로 timestamp가 찍힌 contact sheet를 segmentation하고, 고정 구간마다 앞뒤 최대 2초 맥락으로 caption을 한 번씩 생성한다. 두 단계 모두 같은 모델을 쓴다. reference caption은 절대 제공하지 않는다. 사람 episode는 segmentation 2Hz(최대 1,024프레임), caption 대상 4Hz(최대 256프레임), 320×240 타일 4×4 contact sheet(JPEG 품질 90)를 쓰고, 로봇 episode는 세 카메라를 mosaic으로 유지한다.

**WGO-Bench**: HomER(사람 1인칭) 25개, DROID(외부 시점 로봇) 50개, Galaxea(머리 카메라 로봇) 25개 episode로 구성되며 참조 구간은 각각 470개, 150개, 123개다. tIoU≥0.75 일대일 매칭과 공개된 텍스트 전용 caption rubric(Gemini 3.5 Flash 판정)을 쓴다. 모든 시스템은 두 단계 모두 episode 지시문을 받는다. Flora는 segmentation F1 50.3%로 1위, joint F1 34.5%로 Astra(39.0%) 다음 2위다. caption 정확도는 Astra와 Gemini 3.8 Flash보다 낮아, 이득은 주로 temporal localization에서 나온다. Flora는 벤치마크별 경계 조정 없이 운영 워크플로를 그대로 써서 annotation 기준이 다른 데이터로의 전이를 시험한다.

| 부분집합별 (Table 2) | HomER | DROID | Galaxea | 평균 |
|---|---|---|---|---|
| Flora segmentation F1@0.75 | 23.9 | 56.1 | 70.8 | 50.3 |
| Astra segmentation F1@0.75 | 25.2 | 65.5 | 47.2 | 46.0 |
| Flora joint F1@0.75 | 17.9 | 32.5 | 53.1 | 34.5 |
| Astra joint F1@0.75 | 19.3 | 54.5 | 43.1 | 39.0 |

**파이프라인 비교 (Figure 5, Table 8)**: Gemini 3.5 Flash를 공유하는 파이프라인과 비교했다.

| 파이프라인 | backbone | segmentation F1@0.75 | gold-window 정확도 | joint F1@0.75 |
|---|---|---|---|---|
| Flora | Qwen3.5-9B / 27B | 50.3 | 64.7 | 34.5 |
| Refiner | Gemini 3.5 Flash | 33.4 | 64.3 | 27.2 |
| Pegasus | Pegasus 1.5 | 27.9 | 50.1 | 23.3 |
| Common pipeline | Gemini 3.5 Flash | 25.3 | 57.2 | 18.9 |
| LeRobot annotate | Gemini 3.5 Flash | 24.5 | 41.4 | 17.1 |

Refiner 대비 Flora는 segmentation F1이 16.9 point, joint F1이 7.3 point 높고 gold-window 정확도는 비슷하다(64.7% 대 64.3%).

**backbone 민감도 (Table 9)**: backbone을 Gemini 3.8 Flash로 바꾸면 Refiner의 joint F1은 27.2%에서 36.4%로 올라 Flora(34.5%)를 넘는다. Flora는 segmentation 평균에서 여전히 가장 높지만(50.3% 대 Refiner 42.0%), caption 정확도와 joint F1은 Refiner가 앞선다(73.8%, 36.4%). 따라서 파이프라인 순위는 생성 backbone에 따라 달라진다.

| Gemini 3.8 Flash 비교 | segmentation | 정확도 | joint |
|---|---|---|---|
| Common pipeline | 26.4 | 70.9 | 21.7 |
| Refiner | 42.0 | 73.8 | 36.4 |
| LeRobot annotate | 34.3 | 53.3 | 27.9 |
| Flora (API) | 21.2 | 72.1 | 16.4 |
| Pegasus 1.5 | 27.9 | 50.1 | 23.3 |
| Flora (학습된 모델) | 50.3 | 64.7 | 34.5 |

**API 대체 진단**: Flora의 두 모델을 API backbone으로 바꾸고 운영 window, 프롬프트, stitching, 맥락은 유지했다. Gemini 3.5 Flash로 segmentation F1 19.4%, oracle 정확도 52.1%, joint F1 11.1%, Gemini 3.8 Flash로 21.2%, 72.1%, 16.4%였다. 어느 쪽도 학습된 시스템에 미치지 못하므로, 워크플로만으로 생기는 이점은 입증되지 않는다.

**DenseCaptionBench**: WGO-Bench는 단일 시점 100 episode라 과제와 시나리오 범위가 좁고, 다중 시점 녹화나 dexterous hand manipulation을 시험하지 않으며, binary caption 매칭이라 action 세부의 부분 커버리지를 재지 못한다. 그래서 300 episode 벤치마크를 새로 만들었다.

| 구성 (Table 6) | 시각 입력 | episode | 참조 구간 |
|---|---|---|---|
| 사람 | 1인칭 카메라 | 100 | 3,220 |
| 평행 그리퍼(YAM) | 주 카메라와 손목 카메라 2대 | 100 | 1,266 |
| dexterous hand | 주 카메라와 손목 카메라 2대 | 100 | 391 |
| 합계 | | 300 | 4,877 |

- episode 선택은 모델 성능 점수 없이 과제, action, 환경, manipulator 협응 메타데이터의 커버리지를 체감 수익형 목적함수 Φ(S)로 greedy 최대화한다. 사람 트랙은 환경 라벨 56개, 과제 라벨 95개, 로봇 두 트랙은 과제 그룹 99개와 75개를 포함한다.
- 로봇 reference는 의도된 action이 확정된 단위 1,364개와 눈에 보이는 조작으로 대신한 단위 293개를 구분해 기록한다.
- segmentation은 tIoU≥0.5 F1로 잰다. caption 품질은 요구사항을 action(0.50), 정체(0.25), 협응(0.20), 세부(0.05)로 가중하고 q = 2M/(R+M+F), F = 1.25 × (오류 그룹 가중치 합)로 계산한다. joint F1은 품질 합을 최대화하는 일대일 할당으로 구한다.
- 판정은 고정된 GPT-6 Astra judge가 모델 이름을 가린 채 수행한다(사람 12,000, 로봇 20,000 토큰 응답 예산). Astra가 평가 대상이기도 해 generator와 judge 사이의 자기 선호는 한계로 명시한다.

| DenseCaptionBench (Table 3) | Flora | Astra | 다음 순위 baseline |
|---|---|---|---|
| Human segmentation F1@0.5 | 54.6 | 44.2 | 33.5 (Gemini 3.8 Flash) |
| Human point quality | 66.5 | 60.3 | 46.7 (Gemini 3.8 Flash) |
| Human joint F1@0.5 | 37.4 | 29.7 | 17.7 (Gemini 3.8 Flash) |
| Robot Avg segmentation | 66.9 (Grip 71.0, Dex 62.7) | 71.9 | 45.9 |
| Robot Avg point quality | 73.7 | 80.2 | 69.6 |
| Robot Avg joint F1 | 51.0 | 57.9 | 33.6 |

사람 트랙에서 Flora는 세 지표 모두 1위이고 joint F1이 Astra보다 7.7 point 높다. 로봇 트랙에서는 세 지표 모두 Astra 다음 2위다. 로봇 트랙에서는 5개 source가 새 caption 생성을 갖지 못했고 oracle과 joint 작업 전체에서 judge 작업 98건을 얻지 못해, 순위를 모든 값이 측정된 순서로 해석할 수 없다고 저자들은 적는다.

### 4.3 reward 라벨링

| 공개 reward 벤치마크 (Table 4) | RoboReward MAE ↓ | OOD Kendall τ_a ↑ | ID VOC ↑ | OOD VOC ↑ |
|---|---|---|---|---|
| GPT-6 Astra | 55.4 | 82.3 | 98.9 | 99.7 |
| Kimi K3 | 68.2 | 63.5 | 97.2 | 99.7 |
| RoboDopamine | n/a | 45.0 | 79.0 | 80.0 |
| RynnValue | n/a | 67.5 | n/a | n/a |
| LLM-as-a-Verifier | 72.0 | n/a | n/a | n/a |
| RoboReward | 66.5 | 47.0 | 82.0 | 88.0 |
| Robometer | 75.0 | 65.5 | 92.0 | 94.0 |
| Flora-Rewarder | **40.0** | 72.0 | 98.9 | 99.6 |

- **RoboRewardBench**: episode 2,831개를 사람이 1~5점 outcome으로 라벨링했다. Flora-Rewarder의 MAE는 40.0(×100)으로 Astra 55.4 대비 27.8% 낮고, 전문 모델 RoboReward(66.5)보다도 낮다. 이점은 부분 완료된 과제에서 나온다. 완전 실패와 완전 성공에서는 Astra가 같거나 더 정확하다.
- **RobometerBench**: OOD trajectory 567개를 품질 순으로 정렬하는지(Kendall τ_a), 성공 trajectory(ID 255개, OOD 105개)에서 예측 진행도가 경과 시간을 따르는지(VOC, Pearson 상관)를 본다. Flora-Rewarder는 기대 outcome ŷ로 정렬하고 dense reward 누적으로 진행도를 만든다. OOD 정렬은 Astra(82.3)에만 뒤진 72.0이고 ID VOC는 98.9로 동률, OOD VOC는 99.6이다. VOC는 성공 episode의 순서만 재므로 실패 탐지 정확도를 보장하지 않는다.
- **DenseRewardBench**: 학습에서 제외한 양팔 episode 40개, 1Hz 기준 4,861 time step(normal 3,942, suboptimal 619, failure 300)으로 구성된다. 모든 모델이 같은 64프레임 4FPS window 508개를 라벨링한다. Flora-Rewarder는 네 지표 모두 1위이며 macro F1 46.2다. 가장 큰 이점은 실패 탐지로, failure step의 53.3%를 찾는 반면 어떤 baseline도 11.7%를 넘지 못한다. Astra는 bad-action F1에서 가장 가깝지만 failure를 하나도 찾지 못한다. 대가로 normal step의 약 11%를 failure로 잘못 표시한다.
- **RubricBench**: 10개 과제의 teleoperation episode 40개를 사람이 사람이 만든 rubric으로 채점한 내부 벤치마크다. 지표는 정답 점수와 예측 점수의 L1 거리다. Flora-Rewarder는 9개 sample의 medoid로 답해 pooled L1 6.5를 기록해 범용 모델 10개 중 9개보다 정확하다. Astra는 3.6이다(응답한 39개 episode에서는 3.7).

| 내부 reward 벤치마크 (Table 5) | Macro F1 | Balanced acc. | Bad-action F1 | Failure recall | Pooled L1 ↓ |
|---|---|---|---|---|---|
| GPT-6 Astra | 40.7 | 44.1 | 44.8 | 0.0 | 3.6 |
| GPT-5.6 Sol | 36.3 | 37.8 | 26.4 | 1.0 | 8.4 |
| Gemini 3.8 Flash | 38.8 | 40.2 | 31.2 | 11.7 | 32.6 |
| Claude Opus 5 | 33.9 | 35.1 | 22.9 | 0.3 | 17.1 |
| Qwen3.5-397B-A17B | 34.7 | 39.2 | 31.3 | 3.3 | 8.9 |
| Flora-Rewarder | 46.2 | 54.2 | 47.7 | 53.3 | 6.5 |

### 4.4 비용과 처리 속도

- **평가 집합**: DenseCaptionBench에서 고정한 50 episode(사람 20, 평행 그리퍼 15, dexterous hand 15), 원본 영상 총 4,483.54초(1.24543시간). 품질은 embodiment마다 segmentation, reference 구간 captioning, joint annotation을 동일 가중 평균한 뒤 세 embodiment를 다시 평균한다.
- **결과**: Flora는 품질 57.1%를 원본 영상 1시간당 약 $0.72(GB300 8장 배치, GPU 시간당 $10 가정)에 낸다. GPT-6 Astra(최대 추론 강도)는 53.7%를 시간당 $88.49(실사용량 기준 API 비용)에 낸다. 비용 비율은 122.49배로 약 125배로 요약되고, 평균 품질은 Flora가 3.3%p 높다. 미해결 기여를 감안하면 Flora 평균 품질의 범위는 57.1~59.6%다.
- **Flora 비용 모델**: 9B segmentation 모델과 27B captioning 모델, 이전 배포 연구의 참조 작업량(window 660개, caption 890개), 데이터 병렬과 batch 16을 가정한 조건부 속도 S = 1.23495 episode/초(공학 시나리오 0.70804~1.74862)로 C = (p × g × N) / (3600 × H × S)를 계산해 $0.7224를 얻는다(시나리오 범위 $0.5102~1.2600). 이 범위는 신뢰구간이 아니라 공학적 시나리오이고, 저장, 과금 단위, 배포 부대비용은 뺐다.
- **API 비용**: 2026-10-04 공개 표준 요금으로 반환된 사용량을 계산했다. 시도 7,062건 중 6,956건이 사용량을 보고했고 106건은 가격을 매기지 못했다.
- **처리 속도 (Figure 8, Table 10)**: 8-GPU replica 하나가 분당 원본 영상 1.8457시간을 처리한다고 모델링하고, replica 12개(GPU 96장)로 분당 22.15시간을 분당 $16.00에 처리한다고 가정한다. 이는 비교 대상 중 가장 낮은 할당량 기반 API 지출 속도($16.08/분) 안에 들어간다. 처리 속도는 측정이 아니라 모델링 값이고 선형 확장을 가정한다.
- **운영 규모**: 실제 운영에서 GB300 512장으로 하루 최대 20만 시간 분량을 라벨링한다.

### 4.5 정성 사례

- 사람 episode 하나에서 Flora는 참조 구간 37개 중 34개를 맞춰(예측 45개) F1@0.5 82.9, Astra는 4개만 맞춰(예측 7개) 18.2다.
- 전선 삽입 장면을 Flora는 "왼손으로 connector를 잡고 오른손으로 전선을 connector에 삽입"으로 서술하고, Astra는 "작은 흰 꽃 조각"을 다루는 장면으로 잘못 읽는다. 찻잎을 오른손에서 왼손으로 건네는 장면을 Astra는 파우치 접기로 서술한다.
- 장난감 비행기 조립에서 빨간 부품이 떨어지는 장면을 두 모델 모두 서술하지만 Flora만 failure로 표시한다(Astra는 suboptimal).
- 병을 테이블에서 떨어뜨리는 과제에서 병이 넘어졌지만 테이블에 남은 경우 reference 3/5에 대해 Flora 3/5, Astra 1/5다. 완료된 천 접기는 Flora 5, Astra 3이다.
- 실패 사례도 있다. Flora는 큰 단위 reference 구간을 짧은 조각으로 과분할하고(참조 2개 중 1개만 매칭, Astra는 2개 모두), 손 뻗기를 놓기로, 접시 닦기를 냅킨 접기로 바꿔 서술한 사례가 있다.
- 함께 판정된 사람 window에서 Flora는 협응 요구사항을 Astra보다 훨씬 자주 다룬다(58.3% 대 21.2%). action 커버리지는 비슷하다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **비교 조건 불일치**: 모든 비교는 서로 다른 시각 입력, 프롬프트, 추론 compute를 쓰는 완성형 시스템 사이의 비교다. 추론 강도와 compute를 모델 간에 맞추지 않았다.
- **judge 자기 선호**: DenseCaptionBench 판정자가 GPT-6 Astra이고 Astra가 평가 대상이기도 하다.
- **미측정 항목**: 로봇 트랙에서 caption 생성 누락 source 5개와 judge 불가 작업 98건이 있어 순위를 모든 값이 측정된 순서로 볼 수 없다. 실패하거나 판정 불가한 기여는 점수 0으로 처리한다.
- **reference 버전 불일치**: 비용 비교에서 Flora는 현재 reference snapshot을, API 결과는 원래 snapshot을 써 완전히 맞춰진 비교가 아니다. bootstrap 신뢰구간은 episode 샘플링 불확실성만 반영한다.
- **비용과 처리 속도 가정**: GPU 가격은 가정값이고 운영 GPU 시간 분모는 검증되지 않았다. 96-GPU 처리 속도는 측정하지 않았고 선형 확장을 가정한다. API 할당량은 실제 계정 권한이 아니라 비교용 가정이다.
- **dense reward의 오탐**: failure recall이 높은 대가로 normal step의 약 11%를 failure로 표시한다. dense reward는 retrospective라 오프라인 라벨링 용도이고 온라인 제어용이 아니다.
- **과분할과 혼동**: 큰 단위 구간을 쪼개거나 action 단계와 물체를 혼동하는 경우가 있다. dexterous hand episode에서 Flora는 recall은 비슷하지만 precision이 낮다.
- **rubric 채점**: GPT-6 Astra(3.6)보다 오차가 크다.
- **파이프라인 순위의 backbone 의존성**: 더 강한 backbone(Gemini 3.8 Flash)을 쓰면 Refiner가 joint F1에서 Flora를 넘는다.
- **향후 방향**: 오픈소스 공개로 자체 로봇 데이터셋 확장, physical auto-research, human-to-robot transfer 탐색을 제시한다.

## 6. 관련 연구 (Related Work)

- **로봇용 captioning**: Scale AI의 Physical AI Data Engine 같은 상용 서비스, Macrodata Labs의 Refiner(subtask segmentation과 reward 채점, WGO-Bench 제공), LeRobot(기성 VLM으로 subtask와 계획과 VQA 쌍을 작성하고 Robometer 같은 reward 모델로 프레임별 진행도 라벨링), 범용 영상 언어 모델 Pegasus, policy 학습용 언어 감독을 생성하는 DIAL과 ECoT.
- **annotator로서의 open-weight VLM**: Gemma, Qwen3-VL, InternVL3.5, GLM-4.5V, Kimi. CapRL은 captioning 모델을 강화학습으로 다운스트림 효용에 맞춰 최적화할 수 있음을 보였다. Flora는 이 흐름 위에서 정확하고 일관되며 pre-training 코퍼스 전체를 덮을 만큼 저렴한 annotation이라는 좁은 목표를 겨냥한다.
- **로봇 reward 모델**: 시각 표현(VIP, LIV), zero-shot VLM 유사도(RoboCLIP 등), in-context 진행도 추정을 거쳐 fine-tuning한 reward 모델로 발전했다. RoboReward는 실패를 합성해 episode 수준 reward를 학습하고, Robometer는 프레임 수준 진행도와 trajectory 선호를 결합하며, Robo-Dopamine은 고정밀 manipulation용 process reward를 다룬다.
- **로봇 foundation model**: RT-1, RT-2, π0.5, GR00T N1, Gemini Robotics. 강화학습 post-training 사례로 SimpleVLA-RL과 π*0.6을 인용한다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Flora | NVIDIA GEAR의 로봇 데이터 annotation 엔진. segmentation, captioning, reward 모델 셋으로 구성된다 |
| Flora-Rewarder | 프롬프트로 outcome, dense, rubric reward를 고르는 단일 Qwen3.5-27B 기반 reward 모델 |
| timestamped caption | 영상의 action 구간 (시작, 끝)마다 의도된 action을 서술한 문장을 붙인 라벨 |
| process reward / dense reward | episode 안의 짧은 단위(0.5초)마다 action 품질을 매기는 reward |
| outcome reward | episode 전체의 과제 완료 정도를 1~5점으로 매기는 reward |
| rubric-derived reward | 사용자가 정의한 단계별 점수표로 test-time에 매기는 reward. 단계 최대 점수 합은 1이다 |
| continuation flag | window 경계를 넘어 action이 이어지는지 나타내는 binary flag. stitching의 근거다 |
| emission core / guard | window 중앙의 출력 영역과 그 주변 맥락 영역 |
| contextual captioning | 대상 구간 앞뒤 이웃 구간의 프레임을 함께 보여 주고 대상 구간만 서술하게 하는 방식 |
| DenseCaptionBench | 사람, 평행 그리퍼, dexterous hand 각 100 episode로 구성된 timestamped caption 벤치마크 |
| DenseRewardBench | 양팔 로봇 episode 40개, 4,861 time step의 action 품질 라벨 벤치마크 |
| RubricBench | 10개 과제 40 episode를 사람이 rubric으로 채점한 내부 벤치마크 |
| point quality | 요구사항 질량 기반의 부분 점수 caption 품질 q = 2M/(R+M+F) |
| VOC (value-order correlation) | 예측 진행도와 경과 시간의 Pearson 상관 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | "Flora의 다섯 가지 기능" | caption-region | ★ wiki 권장 (overview) |
| fig03 | 2 | "annotation 품질 대비 비용" | caption-region | ★ wiki 권장 (result) |
| fig04 | 4 | "하나의 data engine이 담당하는 여섯 과제의 결과" | caption-region | (보관) |
| fig05 | 5 | "WGO-Bench에서 완성형 파이프라인 비교" | caption-region | (보관) |
| fig06 | 7 | "Flora와 GPT-6 Astra의 정성 비교" | caption-region | ★ wiki 권장 (qualitative) |
| fig07 | 8 | "영상에서 재사용 가능한 감독 신호를 만드는 전체 흐름" | caption-region | ★ wiki 권장 (architecture) |
| fig08 | 24 | "가정한 처리 속도 대비 annotation 품질" | caption-region | (보관) |
| fig09 | 25 | "시간에 따른 action과 reward" | caption-region | (보관) |
| fig10 | 26 | "embodiment별 출력 예시" | caption-region | (보관) |
| fig11 | 27 | "GPT-6 Astra와의 정성 비교" | caption-region | ★ wiki 권장 (qualitative) |
| fig12 | 28 | "Flora-Rewarder가 실패를 표시하고 부분 진행을 인정하는 사례" | caption-region | ★ wiki 권장 (qualitative) |
| fig13 | 31 | "window 기반 localization과 맥락형 captioning 도식" | caption-region | ★ wiki 권장 (method) |
| fig14 | 31 | "동기화된 다중 시점과 시간 맥락" | caption-region | (보관) |
| fig15 | 36 | "하나의 reward 모델이 제공하는 세 가지 인터페이스" | caption-region | ★ wiki 권장 (method) |
| tab01 | 3 | "벤치마크 점수 요약" | manual | ★ wiki 권장 (result) |
| tab02 | 13 | "WGO-Bench 전체 결과" | table-region | (보관) |
| tab03 | 13 | "DenseCaptionBench 전체 결과" | table-region | (보관) |
| tab04 | 14 | "공개 reward 벤치마크 결과" | table-region | (보관) |
| tab05 | 14 | "내부 reward 벤치마크 결과" | table-region | (보관) |
| tab06 | 15 | "DenseCaptionBench 구성" | table-region | (보관) |
| tab07 | 16 | "baseline 디코딩 설정" | table-region | (보관) |
| tab08 | 19 | "WGO-Bench 파이프라인 비교" | table-region | (보관) |
| tab09 | 20 | "Gemini 3.8 Flash backbone으로 다시 실행한 파이프라인 비교" | table-region | (보관) |
| tab10 | 23 | "처리 속도 추정에 쓴 할당량 시나리오" | table-region | (보관) |
| tab11 | 36 | "사과 자르기 과제의 rubric 예시" | table-region | ★ wiki 권장 (method) |
