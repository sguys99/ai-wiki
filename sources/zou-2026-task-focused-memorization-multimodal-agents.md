---
title: "Task-Focused Memorization for Multimodal Agents"
type: paper
year: 2026
category: agents
raw_path: raw/papers/zou-2026-task-focused-memorization-multimodal-agents.pdf
raw_filename: "zou-2026-task-focused-memorization-multimodal-agents.pdf"
source_collection: external
authors: "Tao Zou, Yichen He, Tian Qiu, Yuan Lin, Hang Li"
arxiv_id: "2605.31075"
url: "https://taskmem.github.io/"
tags: [taskmem, multimodal-agent, long-term-memory, episodic-memory, reinforcement-learning, gspo, dpo, adapter, online-learning, test-time-training, qwen3-vl, videomme, egolife, egotempo, mllm, bytedance, paper]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/fig01.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/fig01.png
    caption: "TaskMem의 전체 구조와 동작 예시. 왼쪽은 환경이 streaming 입력과 task를 흘려보내고 memorization policy가 장기 메모리를 쌓으며 task로 갱신되는 순환이고, 오른쪽은 같은 거실 영상에서 policy가 갱신될 때마다 메모리에 담기는 세부가 사물 목록과 작업 정황으로 바뀌는 과정이다"
    page: 2
    bbox_norm: [0.1417, 0.0908, 0.8528, 0.3361]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/fig02.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/fig02.png
    caption: "두 단계 학습 구조도. Phase One은 MLLM 전체를 4중 reward로 학습하고, Phase Two는 MLLM을 얼린 채 adapter만 pairwise 데이터로 학습한다. 왼쪽 확대도는 adapter가 transformer block의 MLP 잔차 합산 뒤 layer 출력에 더해지는 자리를 보여준다"
    page: 4
    bbox_norm: [0.1828, 0.0908, 0.8172, 0.3075]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/fig03.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/fig03.png
    caption: "Phase One의 richness reward와 NSR control 제거 비교. (a)와 (b)는 off-policy history와 on-policy history의 reward 곡선이고, (c)와 (d)는 같은 조건의 메모리 길이 변화다. richness를 빼면 reward는 더 높은데 메모리 길이가 90 근처에서 40 근처로 떨어진다"
    page: 7
    bbox_norm: [0.106, 0.3323, 0.894, 0.4516]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/fig04.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/fig04.png
    caption: "VideoMME object recognition task에서 질문 5개를 환경 feedback으로 쓴 Phase Two 학습 추이. (a) win ratio가 13.4%에서 35.2%로 오르고, (b) accuracy와 non-redundancy는 90%대에서 유지되며, (c) adapter norm은 단조 증가하고, (d) step-40 adapter와의 코사인 유사도는 step-10에서 0.8에 이른다"
    page: 8
    bbox_norm: [0.1417, 0.3404, 0.8528, 0.4874]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/fig05.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/fig05.png
    caption: "adapter를 넣을 layer를 1번에서 46번까지 바꾼 ablation. win ratio는 layer 19 근처에서 38% 정도로 가장 높고 layer 40 이후 base 수준까지 떨어진다. accuracy는 얕은 layer와 중간 layer에서 base 값 근처를 유지한다"
    page: 9
    bbox_norm: [0.1417, 0.0909, 0.8529, 0.2572]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab01.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab01.png
    caption: "Phase Two 학습 방식 3종을 Phase One과 비교한 표. 품질 지표는 accuracy와 non-redundancy, task 관련성 지표는 loss/tie/win 비율이다. full-parameter, 40-step adapter, 가중치를 1.5배 한 10-step adapter가 나란히 놓인다"
    page: 8
    bbox_norm: [0.1301, 0.7254, 0.8748, 0.8218]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab02.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab02.png
    caption: "VideoMME, EgoLife, EgoTempo 세 벤치마크의 주 결과표. 8개 방법을 accuracy, coverage, precision 세 지표로 비교하며 최고값은 굵게, 두 번째 값은 밑줄로 표시한다"
    page: 10
    bbox_norm: [0.1052, 0.0966, 0.8967, 0.6544]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab03.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab03.png
    caption: "Phase One과 Phase Two를 각각 떼어낸 ablation 표. base 모델, task prompt만 준 baseline, Phase One만, 두 단계 전부의 네 조건을 세 벤치마크에서 비교한다"
    page: 11
    bbox_norm: [0.1054, 0.1657, 0.8963, 0.5603]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab04.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab04.png
    caption: "object recognition task에 다른 task로 학습한 adapter로 교체한 cross-task transfer 결과표. counting, OCR, attribute adapter는 모두 accuracy가 내려가고 object adapter만 올라간다"
    page: 11
    bbox_norm: [0.5056, 0.4136, 0.8887, 0.5204]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab05.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab05.png
    caption: "Phase Two 학습 전후의 episodic memory를 task 4종에서 비교한 정성 표. 학습 후 추가된 세부에 노란 강조가 붙는다. 크롭에는 Case 1의 대표 질문 목록까지만 담겨 메모리 본문이 빠졌다"
    page: 11
    bbox_norm: [0.1033, 0.7456, 0.8956, 0.8642]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab06.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab06.png
    caption: "5분 길이 영상 하나에 대해 생성된 episodic memory 전문. 10초 구간마다 타임스탬프가 붙고 대괄호 토큰으로 인물을 추적하며, 앞에 놓인 counting 질문의 정답을 메모리만으로 맞힐 수 있음을 보여준다"
    page: 14
    bbox_norm: [0.1041, 0.2486, 0.8963, 0.8591]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab07.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab07.png
    caption: "음성 인식에 쓴 프롬프트 전문. 10초 영상에서 발화 구간을 화자 전환 단위로 끊어 시작 시각, 종료 시각, 전사 텍스트를 JSON 배열로 내놓게 지시한다"
    page: 24
    bbox_norm: [0.106, 0.3823, 0.894, 0.8485]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab08.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab08.png
    caption: "화자 식별에 쓴 프롬프트 전문. 앞 단계에서 얻은 자막 배열의 각 항목에 speaker 필드를 붙이고, 확정할 수 없으면 unknown을 넣게 지시한다"
    page: 25
    bbox_norm: [0.106, 0.0915, 0.894, 0.4671]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab09.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab09.png
    caption: "GSPO 학습 하이퍼파라미터 표. batch size, mini batch size, 80GB GPU 대수, group 크기, learning rate 다섯 항목이다"
    page: 27
    bbox_norm: [0.3348, 0.2598, 0.6597, 0.3736]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab10.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab10.png
    caption: "DPO 학습 하이퍼파라미터 표. batch size와 mini batch size가 같은 값이고 learning rate는 GSPO보다 1000배 크다"
    page: 28
    bbox_norm: [0.3686, 0.7076, 0.626, 0.8071]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab11.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab11.png
    caption: "VideoMME의 질문 유형 12종을 하나씩 떼어낸 세부 결과표. 방법 8종을 유형마다 accuracy, coverage, precision으로 나눠 적는다"
    page: 29
    bbox_norm: [0.1298, 0.1368, 0.868, 0.4014]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab12.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab12.png
    caption: "EgoLife의 task 5종별 세부 결과표. relation map, event recall, entity log, habit insight, task master 순으로 방법 8종을 비교한다"
    page: 29
    bbox_norm: [0.1298, 0.1237, 0.8608, 0.509]
    strategy: table-region
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab13.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab13.png
    caption: "EgoTempo의 task 10종별 세부 결과표. 물체 위치 찾기, 공간 관계, 미래 행동 예측 등 시간 이해 중심 유형이 나열된다"
    page: 29
    bbox_norm: [0.1286, 0.7031, 0.8687, 0.8222]
    strategy: table-region
    curated: false
  - id: tab14
    label: Table 14
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab14.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab14.png
    caption: "생성된 메모리를 고정한 채 답변 생성 모델만 GPT-4o에서 Gemini-2.5-Pro로 바꾼 VideoMME 결과표. 절대 점수는 달라지지만 base 대비 향상 폭은 유지된다"
    page: 30
    bbox_norm: [0.2185, 0.1318, 0.776, 0.2422]
    strategy: table-region
    curated: false
  - id: tab15
    label: Table 15
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab15.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab15.png
    caption: "richness reward를 뺀 조건과 본 모델의 메모리 생성 비교. 같은 농장 영상에서 본 모델만 작물 덮개, 상의와 하의, 배경 온실을 남기고 richness 없는 쪽은 발화만 남긴다. 인물 얼굴은 논문 게재용으로만 가려졌다"
    page: 30
    bbox_norm: [0.1054, 0.6113, 0.8963, 0.9066]
    strategy: table-region
    curated: true
  - id: tab16
    label: Table 16
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab16.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab16.png
    caption: "세밀한 시각 근거가 메모리에서 빠져 틀린 실패 사례. 립스틱 제품 번호를 묻는 질문에 메모리는 립스틱으로 넘어갔다는 사실만 남겨 정답 근거가 사라졌다"
    page: 32
    bbox_norm: [0.1054, 0.1179, 0.8972, 0.8818]
    strategy: table-region
    curated: false
  - id: tab17
    label: Table 17
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab17.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab17.png
    caption: "메모리에 부정확하거나 오해를 낳는 서술이 들어가 틀린 실패 사례. 근거는 남아 있으나 그 서술 자체가 사실과 어긋난다"
    page: 33
    bbox_norm: [0.1049, 0.3905, 0.8971, 0.8802]
    strategy: table-region
    curated: false
  - id: tab18
    label: Table 18
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab18.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab18.png
    caption: "국소적 시각 단서는 잡았지만 관계와 시간 구조를 통합하지 못해 틀린 실패 사례. 개별 장면 서술은 맞는데 그 사이 순서와 관계가 메모리에 남지 않았다"
    page: 34
    bbox_norm: [0.1049, 0.5251, 0.8963, 0.9067]
    strategy: table-region
    curated: false
  - id: tab19
    label: Table 19
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab19.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab19.png
    caption: "episodic memory 생성 프롬프트 전문. baseline MLLM에도 같은 템플릿을 주고, 중간 추론을 지정 태그로 감싼 뒤 메모리를 정해진 JSON 스키마로 내놓게 요구한다"
    page: 36
    bbox_norm: [0.106, 0.3603, 0.894, 0.9016]
    strategy: table-region
    curated: false
  - id: tab20
    label: Table 20
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab20.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab20.png
    caption: "task prompt를 함께 준 episodic memory 생성 프롬프트 전문. 학습 없이 프롬프트만으로 task 관련성을 노린 baseline이 이 템플릿을 쓴다"
    page: 37
    bbox_norm: [0.106, 0.4207, 0.894, 0.8265]
    strategy: table-region
    curated: false
  - id: tab21
    label: Table 21
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab21.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab21.png
    caption: "메모리 정확성 채점 프롬프트 전문. 영상 내용과 자막에 충실한지 판정하며 Phase One의 quality reward와 Phase Two의 accuracy 지표가 같이 쓴다. 크롭 좌표가 tab20과 겹쳐 확인이 필요하다"
    page: 37
    bbox_norm: [0.106, 0.4207, 0.894, 0.8265]
    strategy: table-region
    low_confidence: true
    curated: false
  - id: tab22
    label: Table 22
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab22.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab22.png
    caption: "메모리 중복 여부 채점 프롬프트 전문. 이전 메모리에 없던 정보를 새로 담았는지, 문장 형태와 문체가 규격에 맞는지 함께 본다"
    page: 38
    bbox_norm: [0.106, 0.0915, 0.894, 0.5576]
    strategy: table-region
    curated: false
  - id: tab23
    label: Table 23
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab23.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab23.png
    caption: "메모리 풍부함 순위 매기기 프롬프트 전문. 한 rollout group 안에서 유효 후보들을 중복 없는 시각 정보량 기준으로 정렬하게 지시한다"
    page: 39
    bbox_norm: [0.106, 0.1607, 0.894, 0.4457]
    strategy: table-region
    curated: false
  - id: tab24
    label: Table 24
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab24.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab24.png
    caption: "메모리 두 개의 task 관련성을 견주는 프롬프트 전문. 최근 질문 묶음을 근거로 어느 쪽이 더 관련 있는지 또는 동등한지 답하게 하며 정답은 주지 않는다"
    page: 39
    bbox_norm: [0.106, 0.4884, 0.894, 0.8918]
    strategy: table-region
    curated: false
  - id: tab25
    label: Table 25
    kind: table
    file: assets/zou-2026-task-focused-memorization-multimodal-agents/tab25.png
    raw: raw/papers/zou-2026-task-focused-memorization-multimodal-agents-figures/tab25.png
    caption: "세 벤치마크 공통의 QA 평가 프롬프트 전문. 메모리만 보고 먼저 추론한 뒤 근거가 부족하면 정보 부족을 반환하고 그렇지 않으면 답을 내게 지시한다"
    page: 40
    bbox_norm: [0.106, 0.0996, 0.894, 0.4816]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

**TaskMem**은 multimodal agent의 장기 메모리 생성을 "학습 가능한 memorization policy"로 재정식화한 ByteDance Seed와 Fudan University의 프레임워크다. "무엇을 기억할지(what to memorize)"라는 AI Frame Problem을 두 단계로 푼다. Phase One은 GSPO와 4중 reward(format, thinking length, quality, richness)로 정확하고 중복이 없으며 내용이 풍부한 episodic memory 생성 policy를 강화학습으로 만들고, Phase Two는 배포 후 최근 task 5개에서 10개의 sparse한 feedback을 reward model로 증폭해 pairwise preference를 만든 뒤 단일 layer의 2,048 파라미터 adapter만 DPO로 학습한다. Qwen3-VL-30B-A3B 위에서 streaming VQA로 재구성한 VideoMME, EgoLife, EgoTempo에서 base 대비 accuracy가 각각 6.3%p, 7.0%p, 5.3%p 올랐고, VideoMME와 EgoLife의 accuracy와 precision에서는 GPT-5.2와 Gemini-2.5-Pro를 포함한 모든 baseline을 앞섰다. 핵심 주장은 메모리가 수동적 저장소가 아니라 환경과 task에 적응하는 능동적 policy라는 것이며, 학습된 adapter는 저자들의 표현으로 "parametric personalized memory"에 해당한다.

## 1. 자료 정보 (Document Information)

- **제목**: Task-Focused Memorization for Multimodal Agents
- **저자**: Tao Zou(1, 공동 1저자), Yichen He(1, 공동 1저자), Tian Qiu(1, 2), Yuan Lin(1, corresponding), Hang Li(1). 소속은 (1) ByteDance Seed, (2) Fudan University
- **발표**: arXiv preprint 2605.31075v1 [cs.CV]. 등록일 2026-05-29, 문서에 적힌 날짜 2026-06-01
- **분량**: 40페이지 (본문 19페이지, 참고문헌 4페이지, 부록 17페이지)
- **PDF 경로**: `raw/papers/zou-2026-task-focused-memorization-multimodal-agents.pdf`
- **프로젝트 페이지**: https://taskmem.github.io/
- **기반 모델**: Qwen3-VL-30B-A3B
- **연락처**: linyuan.0@bytedance.com

부록 Table 15는 제안 방법을 TaskMem이 아니라 **FOMO**로 적는다. 본문과 다른 모든 표는 TaskMem을 쓴다. 투고 과정에서 이름이 바뀌며 부록 한 곳이 갱신되지 않은 것으로 보인다. 3.3절 baseline 설명이 메모리 프레임워크 하나를 `HippoMem [35]`로 적는 것도 같은 성격의 불일치다. Table 2와 참고문헌 [35]는 **HippoMM**이다.

## 2. 주요 기여 (Key Contributions)

1. **memorization을 policy로 재정식화**. 기존 연구가 메모리 생성을 프롬프트나 SFT로 고정한 단계로 다루던 것을, streaming multimodal 입력에서 무엇을 저장할지 스스로 결정하는 학습 가능한 policy로 정의했다. 저자들의 표현은 "memory is not merely a passive storage system, but an active, goal-driven process"다. AI Frame Problem을 현재 관련성에서 미래 유용성으로 확장한 framing이다.
2. **두 단계 학습 체계**. Phase One은 배포 전에 사실 정확성, 비중복, 형식 준수를 강화학습으로 채운다. Phase Two는 배포 후에 환경 task feedback을 reward model로 증폭해 adapter 하나만 갱신한다.
3. **richness reward**. quality reward만 최적화하면 policy가 "정확하지만 내용이 없는" 짧은 출력으로 reward를 우회한다. group 안 상대 순위로 매기는 richness reward가 이를 막는다.
4. **NSR gating**. 평균 reward가 높아진 뒤에는 음의 advantage 샘플이 학습을 불안정하게 만든다. reward 자체가 음수일 때만 negative reinforce를 적용하는 gate로 안정화했다. PSR과 NSR 분해 연구 [67]를 다중 reward 설정으로 확장한 것이다.
5. **off-policy에서 on-policy로 넘어가는 history 학습**. Gemini-2.5-Pro가 합성한 history로 먼저 학습하고 이어서 policy 자신의 history로 학습해 학습 시점과 배포 시점의 분포 차이를 줄인다.
6. **2,048 파라미터 adapter**. 파라미터 효율, 추론 시점에만 불러와 배포 비용이 0, activation steering 연구와의 이론적 정합이라는 세 근거를 든다. adapter 방향이 step-10에서 거의 수렴한다는 관찰에서 75% 학습 단축 기법을 파생시켰다.
7. **cross-task transfer 실험**. object recognition task에 다른 task의 adapter를 교체 적용하면 모두 accuracy가 내려가고 자기 task adapter만 올라간다. Phase Two가 일반 능력이 아니라 task별 초점을 학습한다는 증거다.
8. **streaming VQA 평가 프로토콜**. VQA 벤치마크 세 개를 질문 유형별로 묶어 task stream으로 바꾸고, 영상을 다 본 뒤에만 질문을 공개하며 원본 영상 없이 메모리만으로 답하게 했다.
9. **identity 정보를 입력 단계에서 처리**. face bounding box와 전역 face ID, 화자 태그가 붙은 자막을 영상 자체에 그려 넣는다. 도구 출력 텍스트를 컨텍스트 앞에 붙이는 기존 방식 [37]보다 컨텍스트가 짧다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 정식화

각 step $t$에서 agent는 새 video segment $v_t$를 관찰한다. policy는 최근 $k$개 segment와 그중 앞 $k-1$개의 메모리로 이루어진 sliding window 컨텍스트 $q_t = (v_{t-k+1:t}, m_{t-k+1:t-1})$에 조건화되어 $m_t$를 정한다. trajectory는 $\tau = (v_{t-k+1:t}, m_{t-k+1:t})$이고 reward $r(\tau)$는 마지막 토큰에서 한 번 주어진다. 목표는 $\max_\theta \mathbb{E}_{\tau \sim \pi_\theta}[r(\tau)]$다. 논문은 표기를 단순화해 $q = (v_1, \ldots, v_k, m_1, \ldots, m_{k-1})$, $\tau = (q, m_k)$로 다시 적는다.

좋은 episodic memory의 요건은 네 가지다. 현재 segment에 충실할 것(faithful), 앞선 메모리와 서술이 이어질 것(coherent), 이미 저장된 정보를 되풀이하지 않을 것(non-redundant), 앞으로 들어올 task에 쓸모가 있을 것(useful for future tasks). 저자들은 episodic memory를 대표 사례로 다루되 같은 정식화가 semantic memory와 visual memory로 확장된다고 밝힌다.

### 3.2 강화학습을 택한 이유

선행 연구가 주로 쓴 SFT의 한계가 두 가지다. 성능이 합성 학습 데이터를 만든 모델의 품질에 갇히고, maximum likelihood 목표가 전역 수준의 목표를 명시적으로 강제하지 못한다. 반면 큰 모델은 생성보다 평가에 강하다 [4, 46]. 영상과의 사실 정합 판정이나 중복 검출은 정확하고 중복 없는 글을 쓰는 일보다 쉽다. 이 비대칭을 reward 신호로 활용하면 큐레이션한 SFT 데이터 없이 raw video만으로 학습할 수 있다.

### 3.3 Phase One 최적화 알고리즘

GSPO(Group Sequence Policy Optimization)를 쓴다. sequence 수준 reward에서 학습 안정성과 효율이 좋다는 이유다 [65, 66]. 입력 $q$마다 $G$개 trajectory를 rollout하고 group 안에서 reward를 정규화해 advantage를 얻는다.

$$\hat A_i = \frac{r_{\text{mc}}(\tau_i) - \text{mean}(\{r_{\text{mc}}(\tau_i)\})}{\text{std}(\{r_{\text{mc}}(\tau_i)\})}, \qquad s_i(\theta) = \left(\frac{\pi_\theta(m_{k,i}|q)}{\pi_{\theta_{\text{old}}}(m_{k,i}|q)}\right)^{1/|m_{k,i}|}$$

$$J_{\text{GSPO}}(\theta) = \mathbb{E}\left[\frac{1}{G}\sum_{i=1}^{G} \min\left(s_i(\theta)\hat A_i,\ \text{clip}(s_i(\theta), 1-\epsilon, 1+\epsilon)\hat A_i\right)\right]$$

importance ratio는 토큰 길이로 정규화한 sequence 수준 비율이다.

### 3.4 4중 reward의 정확한 정의

$$r_{\text{mc}}(\tau) = r_{\text{fmt}}(\tau) + r_{\text{len}}(\tau) + r_{\text{qual}}(\tau) + r_{\text{rich}}(\tau)$$

부록 B가 각 항을 상수까지 정의한다. 계산은 **format을 관문으로 삼는 단계 구조**다. 형식을 어기면 format 페널티만 받고 나머지는 모두 0이 된다.

| 항 | 값 | 산출 방식 |
|---|---|---|
| $r_{\text{fmt}}$ | 유효 0, 위반 $-1.5$ | 규칙 기반. 중간 추론이 지정 태그 안에 있고 최종 메모리가 지정 JSON 스키마를 따르는지 검사 |
| $r_{\text{len}}$ | $\ell \le L$이면 0, $L < \ell < 2L$이면 $\lambda_{\text{len}}(\ell-L)/L$, $\ell \ge 2L$이면 $\lambda_{\text{len}}$ | 규칙 기반. $\lambda_{\text{len}} = -1.0$, $L_{\text{think}} = 1200$ 토큰 |
| $r_{\text{qual}}$ | 전 기준 통과 $+0.5$, 아니면 $-0.5$ | Gemini-2.5-Flash가 시각 충실성과 문맥 일관성, GPT-4o가 문장 유효성과 비중복을 판정. 토큰 예산은 규칙 검사 |
| $r_{\text{rich}}$ | $\lambda_{\text{rich}} u_i$, $\lambda_{\text{rich}} = 0.05$ | GPT-4o가 유효 후보를 풍부함으로 순위 매김. 유효 후보 2개 이상일 때만 적용 |

$$u_i = 1 - \frac{\text{rank}(m_{k,i}) - 1}{G' - 1}, \qquad V = \{i \mid r_{\text{fmt}}(\tau_i) = 0 \ \text{and} \ r_{\text{qual}}(\tau_i) \ge \gamma_{\text{qual}}\},\ G' = |V|$$

quality 유효 임계값은 $\gamma_{\text{qual}} = 0$이다. 상수를 모으면 reward의 이론적 최대는 $0.5 + 0.05 = 0.55$, 최소는 $-1.5$다. richness의 기여가 quality의 10분의 1인 보조 신호라는 점이 설계 의도를 드러낸다. Figure 3의 학습 곡선이 0.4 근처에 머무는 것도 이 범위와 맞는다. 모든 평가 프롬프트는 실험 전체에서 고정되고 reward 질의는 deterministic decoding으로 수행한다.

### 3.5 NSR gating

학습 신호를 **PSR**(advantage 양수 응답 강화)과 **NSR**(음수 응답 페널티)로 분해한다. 관찰된 현상은 평균 reward가 비교적 높은 수준에 이르면 NSR이 불안정을 일으킨다는 것이다. 해결책은 reward가 양수인 샘플에서 NSR을 끄는 것이다.

$$J_{\text{GSPO}}(\theta) = \mathbb{E}_{q}\frac{1}{G}\left[\underbrace{\sum_{\hat A_i > 0} \min(\cdot)}_{\text{PSR}} + \underbrace{\sum_{\hat A_i < 0} \mathbb{I}(r_{\text{mc}}(\tau_i)) \cdot \min(\cdot)}_{\text{NSR}}\right]$$

$\mathbb{I}(r_{\text{mc}}(\tau_i)) = 1$은 $r_{\text{mc}}(\tau_i) < 0.0$일 때, 그 밖에는 0이다. group 정규화 때문에 잘한 샘플들 사이에서도 상대적으로 뒤처진 것에 음의 advantage가 붙는데, 그 샘플까지 페널티를 준 것이 후반 불안정의 원인이었다는 진단이다.

### 3.6 두 단계 history 학습

off-policy history 단계는 Gemini-2.5-Pro가 $m_{1:k-1}$을 합성한다(프롬프트는 Table 19). 현재 policy로 history를 뽑는 비용을 피하고 $m_k$만 최적화한다. on-policy history 단계는 policy가 직접 history를 만들어 학습 시점과 배포 시점의 분포 차이를 없앤다.

Algorithm 1이 on-policy 단계를 정의한다. 초기화 때 배치 크기 $B$만큼 영상을 뽑고 각 영상에서 무작위 시작점의 10초 clip 하나를 초기 입력으로 삼는다. 각 인스턴스는 같은 장편 영상에서 소비한 clip 수를 세는 counter $c_j$를 든다. 매 step은 GSPO 갱신과 배치 재구성 두 국면으로 이루어진다.

| 조건 | 처리 | 의도 |
|---|---|---|
| $c_j < n_{\min}$ | 무조건 Extend | 긴 컨텍스트에 충분히 노출시킨다 |
| $c_j > n_{\max}$ | 무조건 Resample | 한 영상에 오래 머물지 않게 한다 |
| 그 사이 | 확률 $p$로 Extend, 아니면 Resample | 두 목적을 확률로 절충한다 |

Extend는 뽑힌 메모리 후보 하나를 history에 붙이고 다음 clip을 추가한다. window가 $K = 5$를 넘으면 앞쪽을 밀어내 컨텍스트를 5개 clip 이내로 유지한다. Resample은 새 영상과 새 시작점을 뽑아 counter를 1로 되돌린다. $n_{\min}$과 $n_{\max}$의 값은 논문에 적히지 않았다. 학습 데이터는 사내 장편 영상 데이터셋의 **영상 326편, 영상당 평균 25.15개 clip**이다.

### 3.7 Phase Two가 풀어야 하는 세 제약

| 제약 | 내용 | 대응 |
|---|---|---|
| sparse feedback | 최근 task 소수(예: 질문 10개)만으로 갱신해야 한다 | reward model로 pairwise preference를 만들어 신호 증폭 |
| catastrophic forgetting | 파라미터 갱신이 Phase One의 능력을 훼손한다 | backbone을 얼리고 2,048 파라미터 adapter만 학습 |
| computational efficiency | 배포 시점 갱신이 서빙에 영향을 주면 안 된다 | rollout 캐시를 미리 만들고 adapter만 짧게 학습 |

### 3.8 rollout 캐시와 task reward model

Phase One policy $\pi_0$이 고정되면 Phase Two용 rollout 캐시를 **한 번** 미리 계산한다. 각 컨텍스트 $q = (v_{1:k}, m_{1:k-1})$에 대해 현재 clip용 후보 메모리 $N$개를 $\pi_0$에서 뽑아 $\langle q, Y(q)\rangle$로 저장한다. 캐시는 Phase Two 동안 고정되며, 적응 시 후보를 다시 샘플링하지 않고 정답도 쓰지 않는다.

task reward model은 절대 점수 채점기가 아니라 **상대 선호 판정기**다. 최근 질문 묶음 $T$와 같은 컨텍스트의 후보 두 개 $x, y$를 받아 $R_{\text{task}}(x, y; T) \in \{x \succ y,\ y \succ x,\ x \sim y\}$를 낸다. 구현은 GPT-4o 프롬프트(Table 24)이고 정답은 주지 않는다.

편향 억제 장치가 두 겹이다. 첫째, **후보 쌍마다 순서를 바꿔 두 번 평가**하고 두 결과가 일치하며 무승부가 아닐 때만 선호로 남긴다. 둘째, 남은 선호를 후보 위의 유향 그래프로 모으고, 이행적이지 않아 생기는 순환에 얽힌 비교를 제거해 DAG만 쓴다.

### 3.9 DPO 학습 쌍의 선별 기준

DPO 쌍 $(q, m_k^w, m_k^l)$은 컨텍스트마다 하나씩 만든다. 두 메모리가 최근 task 집합 $T$ 아래에서 관련성 차이가 분명해야 하고, 기본 메모리 품질에서는 큰 차이가 없어야 한다. 두 번째 조건이 선호가 관련성 대신 일반 품질 차이를 반영하는 사태를 막는다.

| 규칙 | 내용 |
|---|---|
| 선호 방향 | $x$가 $y$보다 선호되어야 한다 |
| 품질 하한 | $r_{\text{qual}}(x) \ge r_{\text{qual}}(y)$ |
| 양쪽 저품질 배제 | 두 메모리가 모두 저품질이면 안 된다 |
| 1순위 기준 | DAG 경로 거리가 가장 큰 쌍. 경로가 길면 관련성 격차가 크다 |
| 동점 처리 | 거리가 같으면 메모리 길이 차이가 작은 쌍 |

구현 수치가 함께 공개됐다. 컨텍스트마다 후보 $N = 8$개를 뽑았고 필터를 지나 **유효 선호 쌍이 나온 컨텍스트는 29.17%**였다. Phase Two 학습에 실제로 쓰인 영상은 **약 100편**이다.

### 3.10 adapter 구조와 DPO 목적함수

$$h_o \leftarrow h_o + a, \qquad h_o \in \mathbb{R}^d,\ a \in \mathbb{R}^d,\ d = 2{,}048$$

Figure 2의 확대도가 삽입 위치를 보여준다. Input Layer Norm에서 Multi-head Attention과 잔차 합산, Post Attention Layer Norm, MLP와 잔차 합산까지 지난 layer 출력에 adapter가 더해진다. 실험에서는 **layer 22**를 쓴다.

$$\mathcal{L}_{\text{DPO}}(\pi_\theta; \pi_{\text{ref}}) = -\mathbb{E}_{(q, m_k^w, m_k^l) \sim D}\left[\log\sigma\left(\beta\log\frac{\pi_\theta(m_k^w|q)}{\pi_{\text{ref}}(m_k^w|q)} - \beta\log\frac{\pi_\theta(m_k^l|q)}{\pi_{\text{ref}}(m_k^l|q)}\right)\right]$$

$\pi_{\text{ref}}$는 Phase One policy다. Phase Two 동안 adapter만 갱신하고 backbone은 고정한다.

### 3.11 학습 하이퍼파라미터

| 항목 | Phase One (GSPO, Table 9) | Phase Two (DPO, Table 10) |
|---|---|---|
| Batch Size | 32 | 64 |
| Mini Batch Size | 8 | 64 |
| 80GB GPU 대수 | 32 | 32 |
| group 크기 $G$ | 8 | 해당 없음 |
| Learning Rate | 1e-6 | 1e-3 |

Phase Two는 mini batch가 batch와 같아 매 step이 full-batch 갱신이다. learning rate는 Phase One의 1000배다. 학습 대상이 2,048차원 벡터 하나이고 총 step이 40 이하인 설정과 맞물린 값이다.

### 3.12 adapter를 고른 세 가지 근거

첫째는 파라미터 효율이다. 학습 파라미터가 2,048개이고, Table 1에서 full-parameter와 win ratio는 비슷한데 adapter는 accuracy와 non-redundancy를 원 모델 수준으로 지킨다. 둘째는 배포 효율이다. 학습된 adapter는 추론 시점에만 불러오는 파라미터 묶음으로 볼 수 있어 배포 모델의 가중치를 바꾸지 않고 추가 서빙 비용도 없다. 셋째는 이론적 정합이다. LLM 행동은 layer activation에 벡터를 더해 추론 시점에 조향할 수 있는데 [2, 9, 40, 53], 고차 행동이 activation 공간의 선형 방향으로 근사 인코딩되기 때문이다 [15, 42].

세 번째 근거의 차이가 방법의 위치를 정한다. 기존 activation steering은 그 방향을 **추출**하는데 TaskMem은 **직접 학습**해 각 목표 task의 activation 공간 표현을 담는다. 저자들은 이 adapter를 개념적으로 "parametric personalized memory"의 한 형태로 해석할 수 있다고 적는다.

### 3.13 identity 정보 처리

video segment를 넘나들며 같은 인물을 이어 붙이려면 각 clip의 얼굴과 목소리를 앞서 본 개인과 연결해야 한다 [24]. TaskMem은 영상 입력 자체에 identity를 주석으로 그려 넣는다(부록 A).

| 단계 | 처리 |
|---|---|
| 얼굴 인식 | 기존 연구 [37]를 따라 bounding box를 얻고 저품질 얼굴을 걸러낸다. 1초 clip마다 중간 프레임을 골라 검출된 모든 얼굴에 box를 그리고 각 box를 시간축 앞뒤로 0.5초씩 늘린다. face ID는 box 왼쪽 위 모서리에 적는다 |
| 음성 인식 | Gemini-2.5-Pro가 오디오 구간을 뽑고 화자를 식별한다. 화자 식별은 현재 clip 기준이며, 화자를 정할 수 없는 구간은 전역 메모리에서 비슷한 목소리를 찾아 face ID를 붙인다. 발화와 화자 ID는 영상 아래 자막으로 표시한다 |

기존 연구 [37]는 도구 출력 텍스트를 별도 컨텍스트로 앞에 붙여 컨텍스트가 길어졌다. 이 설계는 identity 추론 정확도를 희생하지 않고 컨텍스트를 짧게 유지한다는 것이 저자들의 주장이다. 다만 두 프롬프트(Table 7, Table 8)는 발화를 문장 단위로 끊고 알아듣기 어렵거나 아주 짧은 발화는 건너뛰라고 지시한다.

### 3.14 adapter 학습 가속

Figure 4가 VideoMME object recognition task에서 질문 5개를 환경 feedback으로 쓴 Phase Two 학습 추이를 네 폭으로 보여준다.

| step | win ratio (%) | tie ratio (%) | loss ratio (%) | adapter norm (그림 판독) | step-40과의 코사인 (그림 판독) |
|---|---|---|---|---|---|
| 0 (Phase One) | 13.4 | 72.8 | 13.8 | 해당 없음 | 해당 없음 |
| 1 | 기록 없음 | 기록 없음 | 기록 없음 | 0.04 근처 | 0.36 근처 |
| 10 | 25.4 | 70.2 | 4.4 | 0.19 근처 | 0.8 |
| 20 | 29.5 | 66.1 | 4.4 | 0.25 근처 | 0.92 근처 |
| 30 | 29.9 | 65.8 | 4.4 | 0.31 근처 | 0.98 근처 |
| 40 | 35.2 | 61.7 | 3.1 | 0.37 근처 | 1.0 |

loss ratio가 step 10에서 13.8%에서 4.4%로 떨어진 뒤 거의 변하지 않는 반면 win ratio는 40 step까지 계속 오른다. 초반 학습은 "지는 경우를 없애는" 효과가 크고 후반 학습은 "이기는 경우를 늘리는" 효과가 크다.

여기서 나온 가속 기법은 **step-10 adapter를 목표 norm 0.3으로 곧바로 scaling**하는 것이다. Table 1 caption은 같은 조작을 "가중치에 1.5를 곱한 10-step adapter"로 적는다. step-10 norm이 0.19 근처이므로 1.5배가 0.3 근처가 되어 두 서술이 맞는다. 목표 norm 0.3은 step-40의 0.37이 아니라 step 20에서 30 사이 값이다. 이 조작으로 학습 데이터와 시간을 약 75% 줄인다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 평가 데이터셋과 프로토콜

| 벤치마크 | 성격 | 규모 | task 유형 수 |
|---|---|---|---|
| VideoMME [20] | YouTube 출처, 다양한 영상 종류 | short와 medium subset만, 영상 600편과 QA 1,800쌍 | 12 |
| EgoLife [60] | 1인칭 시점, 일상 활동 | VQA 500개 | 5 (event recall, relation map, entity log, habit insight, task master) |
| EgoTempo [43] | 1인칭 시점, 시간 이해 중심 | VQA 500개 | 10 |

VideoMME의 long subset을 뺀 이유가 명시돼 있다. 장편 영상의 메모리 길이가 **GPT-4o의 최대 토큰 한도를 넘길 수 있어서**다.

프로토콜은 다음과 같다. video와 question 쌍을 질문 유형으로 묶어 각 묶음을 하나의 task, 하나의 환경으로 본다. task 안에서 영상을 하나씩 순차 관찰하며 episodic memory를 만들고, 각 질문은 해당 영상을 다 본 뒤에만 제시된다. 답은 원본 영상 접근 없이 메모리만으로 낸다. 각 task의 처음 질문 5개는 Phase One 메모리로 답하고, 그 feedback으로 Phase Two 학습을 수행한 뒤 남은 질문은 갱신된 policy의 메모리로 답한다. 답변 생성 모델은 GPT-4o이며 먼저 추론한 뒤 근거가 부족하면 "insufficient information"을 반환한다(프롬프트는 Table 25). baseline MLLM에도 같은 프로토콜을 적용해 최근 10초 clip 4개와 그 메모리, 새 10초 clip 하나를 준다. baseline도 $k = 5$ 창을 쓴다.

| 지표 | 정의 | 재는 것 |
|---|---|---|
| Accuracy | 전체 질문 중 정답 비율 | 메모리의 종합 유용성 |
| Coverage | 전체 질문 중 메모리가 답에 필요한 정보를 담은 비율 | 메모리의 포괄성 |
| Precision | 메모리가 충분하다고 판정된 질문 중 정답 비율 | 메모리의 충실성 |

### 4.2 주 결과 (Table 2)

| Method | VideoMME Acc | Cov | Prec | EgoLife Acc | Cov | Prec | EgoTempo Acc | Cov | Prec |
|---|---|---|---|---|---|---|---|---|---|
| EgoGPT | 44.3 | 58.7 | 75.5 | 19.2 | 28.2 | 68.1 | 15.0 | 33.5 | 44.9 |
| HippoMM | 48.9 | 66.6 | 73.5 | 30.4 | 43.4 | 70.0 | 15.8 | 30.8 | 51.1 |
| M3-Agent | 62.5 | 77.7 | 80.4 | 21.8 | 30.8 | 70.8 | 16.0 | 36.3 | 44.2 |
| Gemini-1.5-Pro | 55.3 | 65.9 | 83.9 | 39.4 | 51.6 | 76.4 | 19.7 | 34.3 | 57.4 |
| Gemini-2.5-Pro | 63.2 | 74.8 | 84.4 | 43.8 | 56.6 | 77.4 | 25.8 | 42.3 | 61.0 |
| GPT-5.2 | 67.3 | 80.8 | 83.3 | 34.8 | 48.2 | 72.2 | **32.1** | 51.4 | 62.4 |
| Qwen3-VL-30B-A3B (base) | 61.6 | 74.7 | 82.5 | 38.4 | 52.4 | 73.3 | 22.3 | 38.9 | 57.2 |
| **TaskMem** | **67.9** | 79.3 | **85.6** | **45.4** | 56.4 | **80.5** | 27.6 | 43.7 | **63.2** |

base 대비 Accuracy 향상은 VideoMME 6.3%p, EgoLife 7.0%p, EgoTempo 5.3%p다. abstract와 3.4절은 이를 "6.3%, 7.0%, 5.3%"로 적지만 부록 E.1은 같은 값을 "6.3 points"로 적는다. 백분율 차이이므로 %p가 정확한 표기다.

지표별로 읽으면 세 가지 사실이 나온다.

- **Accuracy와 Precision**: VideoMME와 EgoLife에서 TaskMem이 모든 baseline 중 최고다. EgoTempo Accuracy만 GPT-5.2의 32.1에 못 미치는 27.6으로 2위다. 격차는 **4.5%p**다.
- **Coverage**: TaskMem이 최고인 벤치마크가 하나도 없다. VideoMME에서 GPT-5.2 80.8이 TaskMem 79.3보다 높고, EgoLife에서 Gemini-2.5-Pro 56.6이 TaskMem 56.4보다 미세하게 높으며, EgoTempo에서는 GPT-5.2 51.4가 TaskMem 43.7을 7.7%p 앞선다. 세 곳 모두 base 대비로는 올랐다.
- **base 대비 Precision**: VideoMME 3.1%p, EgoLife 7.2%p, EgoTempo 6.0%p로 Accuracy 향상과 비슷하거나 크다.

EgoTempo 격차의 주된 원인으로 저자들은 GPT-5.2가 세밀한 활동을 서술하는 기본 영상 이해 능력에서 앞선다는 점을 든다. EgoTempo 질문의 상당수가 그 능력을 요구한다는 것이다. 그럼에도 Precision은 TaskMem 63.2가 GPT-5.2 62.4보다 높아, 학습이 환각이 적은 메모리를 만든다는 근거로 제시된다.

### 4.3 단계별 ablation (Table 3)

| Method | VideoMME Acc | Cov | Prec | EgoLife Acc | Cov | Prec | EgoTempo Acc | Cov | Prec |
|---|---|---|---|---|---|---|---|---|---|
| Qwen3-VL-30B-A3B | 61.6 | 74.7 | 82.5 | 38.4 | 52.4 | 73.3 | 22.3 | 38.9 | 57.2 |
| + Task Prompt | 64.2 | 77.3 | 83.0 | 40.0 | 51.0 | 78.4 | 24.5 | 42.9 | 57.1 |
| TaskMem Phase One | 64.4 | 75.4 | 85.3 | 39.6 | 51.0 | 77.6 | 23.7 | 37.5 | **63.3** |
| TaskMem (두 단계) | **67.9** | 79.3 | **85.6** | **45.4** | 56.4 | **80.5** | **27.6** | 43.7 | 63.2 |

Task Prompt는 학습 없이 프롬프트만으로 task 관련성을 노린 baseline이다. 같은 최근 task를 test 시점에 base 모델에 주고 task 관련 메모리를 만들라고 지시한다(프롬프트는 Table 20).

논문이 이 표에서 주장하는 것은 두 가지다. 프롬프트만으로도 base보다 오르지만 TaskMem에는 못 미치므로 파라미터 갱신이 프롬프트보다 효과적이라는 것, 그리고 Phase One이 base보다 Accuracy와 Precision을 함께 올려 더 신뢰할 만한 메모리를 학습한다는 것이다.

표를 더 자세히 읽으면 논문이 언급하지 않은 세 가지가 보인다.

- **Task Prompt와 Phase One의 우열은 벤치마크마다 뒤집힌다.** Accuracy 기준으로 VideoMME에서는 Phase One 64.4가 Task Prompt 64.2보다 0.2%p 높지만 EgoLife에서는 Task Prompt 40.0이 Phase One 39.6보다, EgoTempo에서도 24.5가 23.7보다 높다. Precision도 EgoLife에서 Task Prompt 78.4가 Phase One 77.6보다 높다. 표의 2위 밑줄이 두 벤치마크의 Accuracy에서 Task Prompt에 붙어 있다. 따라서 "Task Prompt보다 Phase One이 낫다"는 순서는 성립하지 않으며, 논문 본문도 프롬프트 baseline을 두 단계를 다 거친 TaskMem과만 비교한다.
- **Phase One은 Coverage를 낮춘다.** EgoLife에서 52.4가 51.0으로, EgoTempo에서 38.9가 37.5로 내려가고 같은 조건의 Precision은 73.3이 77.6으로, 57.2가 63.3으로 오른다. 메모리를 좁게 다듬어 충실성을 얻는 대신 포괄성을 내주는 셈이고, Coverage를 되돌리는 것은 Phase Two다.
- **EgoTempo Precision의 최고값은 두 단계가 아니라 Phase One**이다. 63.3 대 63.2로 격차는 0.1%p이며 표의 굵은 표시가 Phase One에 붙어 있다.

### 4.4 cross-task adapter transfer (Table 4)

평가 task를 object recognition VQA로 고정하고 adapter만 다른 task의 것으로 교체한 실험이다. Phase Two가 단순히 더 좋은 adapter를 만든다면 모든 변형이 향상되어야 하고, task별 초점을 학습한다면 짝이 맞는 adapter만 도움이 되어야 한다는 가설 검정 구조다.

| Method | Acc | Cov | Prec |
|---|---|---|---|
| TaskMem Phase One | 65.7 | 74.7 | 87.9 |
| + Counting adapter | 65.0 | 74.0 | 87.8 |
| + OCR adapter | 65.0 | 75.7 | 85.9 |
| + Attribute adapter | 65.0 | 74.3 | 87.4 |
| **+ Object adapter** | **69.7** | 78.7 | **88.6** |

짝이 맞지 않는 adapter 세 개가 모두 Accuracy를 65.7에서 65.0으로 0.7%p 낮췄고 짝이 맞는 object adapter만 4.0%p 올렸다. 세 변형의 Accuracy가 65.0으로 완전히 같은 점은 논문이 따로 언급하지 않는다. OCR adapter는 Coverage를 74.7에서 75.7로 올리면서 Precision을 87.9에서 85.9로 낮추는데, 메모리를 넓게 쓰되 정확도가 떨어지는 방향으로 밀었다는 해석이 가능하다.

### 4.5 adapter 대 full-parameter (Table 1)

| Method | Accuracy | Non-redundancy | Loss Ratio | Tie Ratio | Win Ratio |
|---|---|---|---|---|---|
| TaskMem Phase One | 92.39 ± 0.47 | 83.59 ± 0.43 | 13.82 ± 1.15 | 72.80 ± 0.83 | 13.38 ± 0.37 |
| + full-parameter tuning | 91.29 | 78.21 | 2.00 | 58.00 | **40.00** |
| + 40-step adapter | **92.93** | 81.74 | 3.06 | 61.72 | 35.22 |
| + scaled adapter (10-step에 1.5배) | 91.54 | 80.96 | 3.17 | 58.52 | 38.31 |

Phase One 행만 3회 실행의 평균과 표준편차로 보고된다. 나머지 세 행은 단일 수치다.

full-parameter 학습은 win ratio 40.00%로 가장 높지만 Accuracy가 92.39에서 91.29로, Non-redundancy가 83.59에서 78.21로 함께 내려간다. Non-redundancy의 5.38%p 하락은 표의 어떤 변화보다 크고 catastrophic forgetting의 지표로 제시된다. 40-step adapter는 Accuracy를 92.93으로 오히려 올리면서 win ratio 35.22%를 얻는다. scaled adapter는 win ratio 38.31%로 full-parameter에 더 가까우나 Accuracy는 91.54로 낮다.

이 표의 지표는 §4.1의 벤치마크 지표와 다르다. 부록 D.4가 정의한 검증 집합 지표다. 검증 집합은 학습 집합과 겹치지 않는 clip으로 만들고 history 메모리는 $\pi_0$이 생성한다.

Accuracy는 Gemini-2.5-Flash가 현재 clip의 영상 내용과 자막에 충실한지 판정하고 규칙 기반 길이 검사가 토큰 예산 $L_{\text{mem}}$ 준수를 확인해 둘 다 통과해야 정답으로 센다. Non-redundancy rate는 GPT-4o가 생성 메모리를 history 메모리와 견줘 새 정보를 담았는지, 문장 형태와 문체가 일관되는지 판정한다. Relevance win/tie/loss는 GPT-4o가 task reward model과 같은 프롬프트로 현재 policy와 기준 policy $\pi_0$의 메모리를 견준 결과다.

### 4.6 adapter layer ablation (Figure 5)

Figure 5는 layer 1번에서 46번까지 3칸 간격으로 adapter 위치를 바꾼 결과를 accuracy, non-redundancy, win ratio로 그린다. 기준선 세 개가 점선으로 표시되며 Table 1의 Phase One 값과 맞는다(accuracy 92.4 근처, non-redundancy 83.6 근처, win ratio 13.4 근처).

| layer 구간 | win ratio 개략값 (%) | 특징 |
|---|---|---|
| 1에서 16 | 27에서 34 | 진동하되 base 13.4보다 훨씬 높다 |
| 19 | 38 근처 | 그림상 최고점 |
| 22에서 28 | 33에서 36 | 논문이 채택한 구간 |
| 31에서 37 | 24에서 31 | 하강 시작 |
| 40에서 46 | 13에서 16 | base 수준까지 내려온다 |

논문의 결론은 "얕은 layer와 중간 layer가 깊은 layer보다 효과적이며 모든 실험에서 layer 22를 쓴다"까지다. 그림에는 논문이 설명하지 않는 세부가 있다. win ratio 최고점은 layer 19이지만 그 지점의 accuracy가 89.9 근처로 base 92.4보다 낮게 내려가고, layer 22는 accuracy가 91.8 근처로 base에 더 가깝다. layer 22는 win ratio 단독 최고점이 아니라 win ratio와 품질 보존의 균형점으로 보인다. 논문이 그렇게 서술하지는 않았으므로 그림 판독에 근거한 해석이다.

### 4.7 richness reward와 NSR control ablation (Figure 3)

Figure 3은 세 조건을 네 폭으로 비교한다. (a)와 (b)는 off-policy history와 on-policy history의 reward 곡선이고 (c)와 (d)는 같은 조건의 메모리 길이 변화다. 붉은 세로 점선이 각 단계의 학습 종료 지점(off-policy 60 step, on-policy 40 step)을 표시한다.

| 조건 | reward 곡선 (그림 판독) | 메모리 길이 (그림 판독) |
|---|---|---|
| TaskMem | off-policy 0.08 근처에서 0.32 근처로 상승, on-policy 0.15 근처에서 0.33 근처로 상승 | off-policy 90 근처에서 100을 넘어 상승, on-policy 100에서 115 사이 유지 |
| richness 제거 | 세 조건 중 가장 높고 안정적. on-policy 구간에서 0.39 근처를 거의 평평하게 유지 | off-policy 90 근처에서 40 근처까지 급격히 하락한 뒤 60 근처까지 부분 회복, on-policy 50에서 68 사이 |
| NSR control 제거 | off-policy 후반에 0.15 근처까지 하락한 뒤 회복하는 불안정한 궤적 | 세 조건 중 가장 길다. off-policy에서 137 근처까지 상승 |

reward 곡선만 보면 richness를 뺀 쪽이 더 좋아 보인다. 저자들의 해석은 그것이 더 좋은 policy가 아니라 policy가 reward를 우회한 결과라는 것이고, 메모리 길이가 빠르게 줄어드는 것이 근거다. 더 짧은 메모리로 quality 점수를 높게 받는 방향으로 학습됐다는 진단이다.

Table 15가 같은 현상을 사례로 보여준다. 농장 영상에서 본 모델은 작물이 비닐과 그물로 덮여 있다는 사실, 인물의 상의와 하의와 모자, 배경의 온실과 목조 창고까지 남긴다. richness reward를 뺀 쪽은 같은 영상에서 발화 인용만 남기고 시각 세부를 모두 버린다. 3개 사례가 같은 패턴을 보인다. 메모리 길이 축의 단위는 그림에 적히지 않았으나 §3.4의 토큰 예산 서술과 함께 보면 토큰 수로 읽는 것이 자연스럽다.

### 4.8 답변 생성 모델 교체 검증 (Table 14)

GPT-4o는 파이프라인의 두 곳에 쓰인다. Phase Two의 관련성 선호 데이터를 만드는 곳과 평가 시점에 메모리로 답을 내는 곳이다. 학습된 선호 신호가 평가 모델과 결합될 위험이 있어 메모리를 고정한 채 답변 생성 모델만 바꿔 확인했다.

| 답변 생성 모델 | Model | Acc | Cov | Prec |
|---|---|---|---|---|
| GPT-4o | Qwen3-VL-30B-A3B | 61.6 | 74.7 | 82.5 |
| GPT-4o | TaskMem | 67.9 | 79.3 | 85.6 |
| Gemini-2.5-Pro | Qwen3-VL-30B-A3B | 68.9 | 81.7 | 84.4 |
| Gemini-2.5-Pro | TaskMem | 74.5 | 85.8 | 86.9 |

base 대비 Accuracy 향상은 GPT-4o에서 6.3%p, Gemini-2.5-Pro에서 5.6%p다. Coverage와 Precision도 두 모델 모두에서 오른다. 절대 점수가 Gemini-2.5-Pro에서 높은 이유는 주로 Coverage 차이다. 같은 메모리를 주면 Gemini-2.5-Pro가 근거가 충분하다고 판정해 답을 시도하는 빈도가 더 높다. Precision이 함께 유지되므로 무분별한 답변 때문에 Coverage가 오른 것은 아니라는 해석이 붙는다. 메모리가 고정된 비교이므로 이 차이는 메모리 품질 변화가 아니라 답변 생성 모델의 행동을 반영한다.

### 4.9 task별 세부 결과 (Table 11에서 Table 13)

VideoMME 12개 유형의 base 대비 Accuracy 변화다.

| 질문 유형 | base | TaskMem | 차이 (%p) |
|---|---|---|---|
| Attribute Perception | 54.4 | 65.6 | +11.2 |
| Spatial Perception | 54.9 | 64.7 | +9.8 |
| Action Reasoning | 61.0 | 69.5 | +8.5 |
| Temporal Perception | 73.5 | 81.6 | +8.1 |
| Counting Problem | 34.5 | 42.3 | +7.8 |
| Object Recognition | 62.0 | 69.7 | +7.7 |
| Object Reasoning | 68.7 | 74.3 | +5.6 |
| OCR Problems | 69.6 | 75.2 | +5.6 |
| Spatial Reasoning | 86.7 | 91.1 | +4.4 |
| Information Synopsis | 90.0 | 93.1 | +3.1 |
| Action Recognition | 54.0 | 56.8 | +2.8 |
| Temporal Reasoning | 70.9 | 72.1 | +1.2 |

12개 유형 모두 올랐다. base가 이미 높은 유형(Information Synopsis 90.0, Spatial Reasoning 86.7)에서 향상 폭이 작다. Counting Problem은 base 34.5로 가장 낮고 TaskMem 값 42.3도 12개 중 가장 낮다.

| EgoLife task | base | TaskMem | 차이 (%p) |
|---|---|---|---|
| TaskMaster | 58.7 | 71.4 | +12.7 |
| RelationMap | 30.4 | 37.6 | +7.2 |
| EventRecall | 42.9 | 50.0 | +7.1 |
| HabitInsight | 54.1 | 60.7 | +6.6 |
| EntityLog | 24.0 | 28.0 | +4.0 |

| EgoTempo task | base | TaskMem | 차이 (%p) |
|---|---|---|---|
| Action Sequence | 37.9 | 53.1 | +15.2 |
| Locating Object | 11.6 | 20.4 | +8.8 |
| Future Action Prediction | 28.4 | 36.8 | +8.4 |
| Counting Objects | 12.8 | 21.2 | +8.4 |
| Counting Actions | 16.7 | 22.9 | +6.2 |
| Object-Specific Action | 18.8 | 24.8 | +6.0 |
| Object Sequence | 31.6 | 37.2 | +5.6 |
| Spatial Relationship | 6.4 | 8.0 | +1.6 |
| Action-Specific Object | 29.2 | 30.0 | +0.8 |
| Temporal Event Ordering | 29.8 | 29.4 | -0.4 |

**Temporal Event Ordering만 하락한다.** 벤치마크 단위로 세 곳 모두 올랐다는 논문 서술은 맞지만 task 단위로는 내려간 곳이 하나 있다. Spatial Relationship은 절대값이 base 6.4, TaskMem 8.0으로 매우 낮고 GPT-5.2의 22.0에 크게 뒤진다. 같은 task의 Coverage가 TaskMem 10.0, GPT-5.2 30.0이라 메모리에 공간 관계 정보가 거의 남지 않는다는 뜻이다. 반대로 Counting Actions의 Precision은 TaskMem 70.0으로 GPT-5.2의 58.9를 11.1%p 앞선다.

### 4.10 정성 사례 (Table 5, Table 6)

Phase One policy는 정확하지만 일반적인 사건 서술 문체로 메모리를 만든다. object recognition 질문으로 Phase Two 학습을 거치면 문체가 세밀한 사물 세부를 담는 방향으로 옮겨간다. 논문은 task 4종에서 같은 패턴을 확인한다.

| Case | task | Phase Two 이후 추가된 세부 |
|---|---|---|
| Case 1 | Object Recognition | 침구의 색(흰색과 분홍색), 목재 가구와 큰 창, 세면대 위 세면도구와 수건, 인물의 모자와 배낭 |
| Case 2 | Object Reasoning | 인물의 긴 붉은 머리, 흰 손목시계, 붉은 드레스, 샌드위치 속 재료(brisket과 jalapeno sausage) |
| Case 3 | Attribute Perception | 작업장의 기계 설비, 어두운 셔츠와 카키 바지, 흰 머리와 하늘색 셔츠와 회색 조끼, 집중한 표정과 손동작 |
| Case 4 | Counting Problem | 동물 종의 정정(beaver에서 water vole로)과 추가(hedgehog), 염소 두 마리의 색(검정과 흰색), 물속 다른 물고기들 |

Case 4는 종 식별이 바뀐 사례다. Phase One은 물에서 나오는 동물을 beaver로 적었는데 Phase Two는 water vole로 적고 hedgehog 한 장면을 추가로 담았다. counting task는 개체 수를 세야 하므로 종을 구분하고 빠짐없이 열거하는 쪽으로 policy가 밀린 결과로 읽힌다.

Table 6은 별개 사례로 5분 영상 하나의 메모리 전문을 싣는다. **4,620 토큰** 분량의 상세하고 정확한 서술, clip 경계를 넘는 매끄러운 흐름, counting task 아래에서 국소 개체 수를 기록해 전역 counting 문제를 맞힌 task 관련성 세 가지를 보이려는 예시다. 메모리 형식도 여기서 드러난다. `00:00:00--00:00:10` 같은 10초 구간 타임스탬프마다 한 문단이 붙고 인물은 `[face_1]`처럼 대괄호 토큰으로 참조하며, 그 토큰이 영상 전체에서 같은 인물을 가리킨다. 질문은 "How many persons does Superman fight versus?"이고 정답과 예측이 모두 C(5명)다.

### 4.11 실패 사례 분석 (부록 E.3)

무작위로 뽑은 오답 50개의 메모리를 사람이 직접 검토했다. 각 사례마다 답에 필요한 근거가 메모리에 남았는지, 남은 근거가 사실에 맞는지, 근거가 있는데도 QA 모델이 틀렸는지를 확인했다.

| 유형 | 내용 | 사례 |
|---|---|---|
| 세밀한 시각 근거 누락 | 답에 필요한 미세 정보가 메모리에 없다 | Table 16. 립스틱 제품 번호를 묻는 질문에 메모리는 "립스틱으로 넘어갔다"는 사실만 남겼다. 정답은 656번인데 예측은 선택지 밖의 E였다 |
| 부정확하거나 오해를 낳는 시각 서술 | 근거는 남았으나 서술 자체가 틀렸다 | Table 17 |
| 관계와 시간 구조 통합 부족 | 국소 단서는 잡았으나 그 사이의 관계와 순서를 엮지 못했다 | Table 18 |

저자들이 이 분석에서 끌어낸 후속 방향은 메모리에 더 풍부한 시각 정보를 담는 것이다. 열린 질문으로는 visual memory를 어떻게 구조화할지, 어떤 시각 세부를 남길지 판정하는 기준을 어떻게 세울지, 여러 modality에서 온 공간과 관계와 시간 단서를 어떻게 보존할지를 든다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문은 별도의 한계 절을 두지 않는다. 아래는 본문과 부록의 서술, 표에서 확인되는 사실을 정리한 것이다.

| 한계 | 근거 |
|---|---|
| base MLLM의 영상 이해 능력이 상한이다 | EgoTempo Accuracy에서 4.5%p 뒤진 원인을 저자들이 base 모델의 세밀한 활동 서술 능력 차이로 설명한다. policy는 지각하지 못한 것을 기억할 수 없다 |
| task마다 adapter가 필요하다 | cross-task transfer가 도움이 되지 않는다는 Table 4의 결과는 장점의 근거이면서 비용이다. 새 task마다 질문 5개에서 10개와 학습이 요구되고, 여러 task를 함께 다루는 방법은 다루지 않았다 |
| reward model 의존이 크다 | quality reward는 Gemini-2.5-Flash와 GPT-4o, richness reward와 Phase Two 선호 판정은 GPT-4o에 기댄다. API 비용과 재현성, judge 편향이 걸린다. 부록 D.2의 순서 교체 이중 평가와 순환 제거는 편향 억제 장치이되 판정자를 대체하지 않는다 |
| 평가가 답변 생성 모델의 컨텍스트에 묶여 있다 | VideoMME long subset을 뺀 이유가 메모리 길이가 GPT-4o 토큰 한도를 넘길 수 있다는 것이다. 장기 메모리가 가장 필요한 구간이 평가에서 빠졌다 |
| streaming 프로토콜의 현실성이 미검증이다 | 같은 질문 유형을 묶는 가정이 실제 배포 환경의 task 분포와 맞는지는 다루지 않았다. task 안에서 질문 유형이 고정돼 있어 환경 추정이 실제보다 쉬울 수 있다 |
| sliding window가 5개 clip으로 짧다 | $K = 5$는 10초 clip 기준 50초 분량이다. 시간이나 일 단위 horizon에서 메모리를 어떻게 압축하고 잊을지는 범위 밖이다 |
| Coverage가 baseline을 넘지 못한다 | 세 벤치마크 모두 Coverage 최고값이 다른 모델의 것이다. Phase One 단계에서는 base보다 Coverage가 내려가기도 한다 |
| Temporal Event Ordering은 하락한다 | EgoTempo 10개 task 중 하나가 base 29.8에서 29.4로 내려갔다. 시간 순서가 clip 단위 메모리에 잘 보존되지 않는다는 신호이며 부록 E.3의 세 번째 실패 유형과 맞물린다 |
| adapter 방향의 조기 수렴이 설명되지 않았다 | step 10에서 코사인 0.8에 이르는 현상을 관찰하고 가속에 활용하지만 왜 그런지는 분석하지 않았다 |
| identity overlay가 도구 한계를 그대로 흡수한다 | face 검출과 ASR, 화자 식별의 오류가 입력 픽셀에 새겨져 들어간다. 프롬프트가 짧거나 알아듣기 어려운 발화를 건너뛰게 지시하는 것도 정보 손실 지점이다 |

저자들이 결론에서 밝힌 향후 방향은 두 가지다. episodic memory를 넘어 semantic memory와 visual memory로 확장하는 것, 그리고 상호작용이 더 많은 embodied 환경에서 적응적 memorization을 탐구하는 것이다.

## 6. 관련 연구 (Related Work)

논문의 5절은 두 소절로 이루어진다.

### 6.1 multimodal agent의 장기 메모리 (5.1절)

multimodal agent는 context window를 넘는 정보를 보존하려고 외부 메모리를 필요로 한다 [27, 29]. 선행 연구의 메모리 패러다임은 네 묶음으로 정리된다.

장편 영상 이해를 위한 memory bank와 희소 메모리 표현 [23, 50], 텍스트와 객체 중심과 episodic과 semantic과 visual 표현으로 구성한 구조화된 이질 메모리 [16, 37, 63], 지속적 통합과 구조적 retrieval과 neuro-symbolic 추론을 결합한 시스템 [7, 32, 36], 그리고 개인화와 검증 가능성과 벤치마크 설정으로의 최근 확장 [5, 10, 18]이 네 묶음이다.

시간이 흐르며 multimodal 관찰이 쌓이면 메모리 품질 유지가 점점 어려워지고, 이는 하위 retrieval과 추론에 부정적 영향을 줄 수 있다 [38, 45, 58]. TaskMem이 짚는 공통 한계는 기존 방법이 저장할 내용을 미리 정해 둔다는 것이다. 프롬프트로 정하거나 [7, 16, 32] post-training으로 정한다 [36, 37]. 저자들의 진단은 "무엇을 기억할지가 환경에 따라 동적으로 적응해야 한다"는 측면이 간과됐다는 것이다.

Table 2의 baseline 중 셋이 이 계보에 놓인다. M3-Agent [37]는 프롬프트 템플릿 기반 multimodal 메모리 프레임워크이며 identity를 텍스트로 앞에 붙이는 방식이 TaskMem 설계의 직접 대조 대상이다. EgoLife와 EgoGPT [60]는 평가 데이터셋과 baseline 양쪽으로 쓰인다. HippoMM [35]은 해마에서 착안한 multimodal 메모리다.

### 6.2 test-time training (5.2절)

두 번째 소절은 TaskMem의 Phase Two를 test-time training(TTT) 계보에 놓는다. TTT는 추론 도중 현재 test 인스턴스와 관련된 데이터로 모델 파라미터를 적응시켜 현재 task 분포에 맞추는 접근이며, 뿌리는 local learning 연구 [6]까지 올라간다.

| 흐름 | 내용 | 인용 |
|---|---|---|
| LLM에서의 TTT | 학습 코퍼스에서 검색한 nearest neighbor로 추론 시점 적응 | [22] |
| 능동적 데이터 선택 | 적응에 쓸 데이터를 능동적으로 골라 개선 | [30] |
| continual learning과의 관계 | 데이터 스트림에서 점진적으로 갱신하는 문제와 밀접하다 | [8, 14, 31, 33] |
| catastrophic forgetting | 새 데이터 적응이 기존 지식을 훼손하는 중심 난점 | [19, 26, 33] |

저자들이 자기 설정을 구분하는 지점이 이 소절의 핵심이다. 기존 TTT는 task 입력이나 test 인스턴스에서 유도한 자기지도 목표처럼 **직접적인 적응 신호**에 기댄다 [1, 22, 26]. 반면 TaskMem의 설정은 **간접 feedback**이다. 배포된 multimodal agent는 메모리 품질을 반영하는 신호를 직접 관찰할 수 없고 환경의 task와 상호작용할 뿐이다. 관찰 가능한 경험과 메모리 최적화 목표 사이에 간극이 생기며 feedback augmentation이 그 간극을 메우는 장치다.

### 6.3 방법론적 계보

최적화 알고리즘은 Phase One의 GSPO [65, 66]와 Phase Two의 DPO [44]다. PSR과 NSR 분해 [67]는 양과 음의 advantage를 나눠 안정성을 분석한 연구이고, 본 논문이 이를 다중 reward 설정으로 확장하며 gating을 도입했다. 출력 형식은 ReAct [62]에서 왔다. adapter의 정당화는 activation steering [2, 9, 40, 53]과 linear representation hypothesis [15, 42], parameter-efficient tuning [13, 28]에 기댄다. 문제 설정의 출처는 AI Frame Problem [48]이고, identity 유지의 필요성은 Storyteller [24]에서 가져왔다.

## 7. 용어집 (Glossary)

- **TaskMem**: Task-focused Memorization Policy Learning의 약칭. 부록 Table 15에는 옛 이름 FOMO가 남아 있다.
- **memorization policy $\pi_\theta(m_t|q_t)$**: streaming multimodal 입력에 대해 episodic memory를 생성하는 학습 가능한 policy. TaskMem의 핵심 추상화다.
- **Phase One과 Phase Two**: TaskMem의 두 학습 단계. 앞은 배포 전에 "어떻게 기억할지"를, 뒤는 배포 후에 "무엇을 기억할지"를 학습한다.
- **richness reward $r_{\text{rich}}$**: group 안 상대 순위를 0에서 1로 정규화해 $\lambda_{\text{rich}} = 0.05$를 곱한 보조 reward. quality reward만 최적화할 때 나타나는 "짧고 빈약한 출력" 우회를 막는다.
- **NSR gating**: reward 자체가 음수인 샘플에만 negative reinforce를 적용하는 기법. 후반 학습 안정성을 위한 조치다.
- **PSR (Positive Sample Reinforce)**: advantage가 양수인 샘플을 강화하는 항.
- **off-policy history training과 on-policy history training**: Phase One의 두 sub-stage. 앞은 Gemini-2.5-Pro가 history를 합성하고 뒤는 policy 자신이 history를 만들어 학습과 배포의 분포 차이를 없앤다.
- **Extend와 Resample**: Algorithm 1의 배치 갱신 연산. 앞은 history에 메모리와 다음 clip을 붙이고 뒤는 새 영상으로 인스턴스를 교체한다.
- **feedback augmentation**: 최근 task 5개에서 10개의 sparse한 feedback을 reward model로 pairwise preference로 바꿔 학습 신호를 늘리는 절차.
- **task reward model $R_{\text{task}}(x, y; T)$**: 최근 질문 묶음 $T$ 아래에서 후보 메모리 두 개의 상대 관련성을 판정하는 모델. 절대 점수를 내지 않는다.
- **rollout 캐시**: Phase One policy가 고정된 뒤 컨텍스트마다 후보 메모리 $N = 8$개를 미리 뽑아 둔 데이터. Phase Two 동안 고정된다.
- **adapter vector $a \in \mathbb{R}^{2{,}048}$**: 단일 layer 출력에 더해지는 학습 가능한 벡터. layer 22에 삽입한다.
- **parametric personalized memory**: adapter를 메모리로 해석한 저자들의 표현. task별 초점이 파라미터에 담긴다는 관점이다.
- **scaled adapter**: step-10 adapter를 목표 norm 0.3으로 키운 것. Table 1 caption의 표현으로는 가중치에 1.5를 곱한 10-step adapter다.
- **identity overlay**: face bounding box와 전역 face ID, 화자 태그가 붙은 자막을 영상 프레임에 그려 넣어 identity 문제를 입력 단계에서 처리하는 방식.
- **streaming VQA**: VQA 벤치마크를 질문 유형별 task stream으로 재구성한 평가 프로토콜. 영상을 다 본 뒤 질문이 공개되며 원본 영상 없이 메모리만으로 답한다.
- **Accuracy, Coverage, Precision**: 메모리 평가 세 지표. 전체 정답 비율, 메모리가 답에 필요한 정보를 담은 비율, 충분 판정된 질문 중 정답 비율이다.
- **Qwen3-VL-30B-A3B**: 본 논문이 사용한 base MLLM. Qwen3-VL의 mixture-of-experts 변형이다.
- **AI Frame Problem**: 조합 폭발 속에서 문맥 관련 정보를 식별하는 문제 [48]. 본 논문은 "미래에 유용할 정보"까지 식별하는 시간 방향의 확장으로 다시 세운다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | "TaskMem 전체 구조와 거실 영상 동작 예시" | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 4 | "두 단계 학습 구조와 adapter 삽입 위치" | caption-region | ★ wiki 권장 (method) |
| fig03 | 7 | "richness와 NSR control 제거 시 reward와 메모리 길이" | caption-region | ★ wiki 권장 (ablation) |
| fig04 | 8 | "Phase Two 학습 추이 4폭, win ratio와 norm과 코사인" | caption-region | ★ wiki 권장 (dynamics) |
| fig05 | 9 | "adapter layer 위치 ablation, layer 1에서 46" | caption-region | ★ wiki 권장 (ablation) |
| tab01 | 8 | "Phase Two 학습 방식 3종 대 Phase One" | table-region | 본문 표로 재현 (결과 절) |
| tab02 | 10 | "세 벤치마크 주 결과, 방법 8종" | table-region | 본문 표로 재현 (결과 절). 크롭에 본문 3.3절까지 섞여 임베드 부적합 |
| tab03 | 11 | "Phase One과 Phase Two 단계별 ablation" | table-region | 본문 표로 재현 (결과 절). 크롭에 본문과 Table 4가 함께 들어감 |
| tab04 | 11 | "object recognition의 cross-task adapter 결과" | table-region | 본문 표로 재현 (결과 절) |
| tab05 | 11 | "Phase Two 전후 메모리 정성 비교" | table-region | 크롭 불완전, 메모리 본문 누락. 내용은 본문 표로 재현 |
| tab06 | 14 | "5분 영상의 episodic memory 전문" | table-region | (텍스트 전문, 요지만 본문에 옮김) |
| tab07 | 24 | "음성 인식 프롬프트 전문" | table-region | (프롬프트 전문, 임베드 불필요) |
| tab08 | 25 | "화자 식별 프롬프트 전문" | table-region | (프롬프트 전문, 임베드 불필요) |
| tab09 | 27 | "GSPO 하이퍼파라미터 5항목" | table-region | 본문 표로 재현 (방법 절) |
| tab10 | 28 | "DPO 하이퍼파라미터 4항목" | table-region | 본문 표로 재현 (방법 절) |
| tab11 | 29 | "VideoMME 질문 유형 12종 세부 결과" | table-region | 본문 표로 재현 (결과 절) |
| tab12 | 29 | "EgoLife task 5종 세부 결과" | table-region | 본문 표로 재현 (결과 절) |
| tab13 | 29 | "EgoTempo task 10종 세부 결과" | table-region | 본문 표로 재현 (결과 절) |
| tab14 | 30 | "답변 생성 모델 교체 시 VideoMME 결과" | table-region | 본문 표로 재현 (결과 절) |
| tab15 | 30 | "richness reward 제거 시 메모리 생성 비교" | table-region | ★ wiki 권장 (case study). identity overlay도 함께 보인다 |
| tab16 | 32 | "세밀한 시각 근거 누락 실패 사례" | table-region | (텍스트 전문, 요지만 본문에 옮김) |
| tab17 | 33 | "부정확한 시각 서술 실패 사례" | table-region | (텍스트 전문, 요지만 본문에 옮김) |
| tab18 | 34 | "관계와 시간 구조 통합 부족 실패 사례" | table-region | (텍스트 전문, 요지만 본문에 옮김) |
| tab19 | 36 | "episodic memory 생성 프롬프트 전문" | table-region | (프롬프트 전문, 임베드 불필요) |
| tab20 | 37 | "task prompt 포함 메모리 생성 프롬프트 전문" | table-region | (프롬프트 전문, 임베드 불필요) |
| tab21 | 37 | "메모리 정확성 채점 프롬프트 전문" | table-region | (확인 필요, 크롭 좌표가 tab20과 동일) |
| tab22 | 38 | "메모리 중복 채점 프롬프트 전문" | table-region | (프롬프트 전문, 임베드 불필요) |
| tab23 | 39 | "메모리 풍부함 순위 프롬프트 전문" | table-region | (프롬프트 전문, 임베드 불필요) |
| tab24 | 39 | "메모리 두 개의 task 관련성 비교 프롬프트 전문" | table-region | (프롬프트 전문, 임베드 불필요) |
| tab25 | 40 | "세 벤치마크 공통 QA 평가 프롬프트 전문" | table-region | (프롬프트 전문, 임베드 불필요) |

수치 표 크롭 열 개(tab01, tab02, tab03, tab04, tab09에서 tab14)는 이미지 대신 본문 마크다운 표로 재현했다. 이 논문은 표 25개 중 열세 개가 프롬프트 전문(tab07, tab08, tab19에서 tab25)이거나 메모리와 사례 전문(tab06, tab16에서 tab18)이라 임베드 대상이 적다. tab05는 캡션과 Case 1의 대표 질문 목록까지만 잡혀 정작 비교하려는 메모리 본문이 빠졌고, 같은 내용은 본문의 정성 사례 표에 옮겼다. tab21은 bbox가 tab20과 완전히 같아 크롭 내용이 tab20과 겹칠 가능성이 있다. 두 항목의 실제 페이지 영역은 사람이 다시 확인해야 한다.
