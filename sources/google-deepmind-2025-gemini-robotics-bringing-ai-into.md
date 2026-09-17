---
title: "Gemini Robotics: Bringing AI into the Physical World"
type: paper
year: 2025
category: physical-ai
raw_path: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into.pdf
raw_filename: "google-deepmind-2025-gemini-robotics-bringing-ai-into.pdf"
source_collection: external
authors: "Gemini Robotics Team, Google DeepMind (기여자 명단은 논문 부록)"
arxiv_id: "2503.20020"
tags: [physical-ai, vla, manipulation, benchmark, safety]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig01.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig01.png
    caption: "Gemini Robotics 계열 개요. Gemini 2.0에서 robotics 전용 학습으로 Gemini Robotics-ER과 Gemini Robotics를 만들고, 선택적 specialization으로 dexterous task, 새 embodiment, 고급 추론으로 확장한다"
    page: 2
    bbox_norm: [0.0947, 0.0745, 0.9442, 0.4277]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig02.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig02.png
    caption: "Gemini 2.0 Flash의 embodied reasoning 예시. 2D object detection, 2D pointing, multi-view correspondence, 3D object detection"
    page: 3
    bbox_norm: [0.0947, 0.0939, 0.9057, 0.3957]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig03.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig03.png
    caption: "ERQA 벤치마크 예시 문항. 지퍼가 따라갈 trajectory 고르기, 렌치 이동 방향, 가장 가까운 싱크대 화살표 고르기"
    page: 4
    bbox_norm: [0.1338, 0.0936, 0.866, 0.3323]
    strategy: caption-region
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig04.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig04.png
    caption: "ERQA 400문항의 범주 분포. spatial reasoning 84, action reasoning 72, trajectory reasoning 66, state estimation 55, task reasoning 38, multi-view reasoning 37, pointing 34, 기타 14"
    page: 4
    bbox_norm: [0.6045, 0.7127, 0.9014, 0.8793]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig05.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig05.png
    caption: "Gemini 2.0 Pro Experimental의 chain-of-thought 추론 흔적 두 예시. CoT 없이 틀린 답(빨강)이 CoT를 쓰면 맞는 답(초록)으로 바뀐다"
    page: 6
    bbox_norm: [0.0943, 0.0936, 0.9064, 0.3258]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig06.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig06.png
    caption: "Gemini 2.0 Flash의 2D detection 예시. 물체 범주로, 공간 서술로, affordance로 검출한다"
    page: 7
    bbox_norm: [0.0947, 0.0939, 0.9063, 0.2711]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig07.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig07.png
    caption: "자연어 질의에서 2D point를 예측하는 예시. 스푼 손잡이, 빈 공간, 9번째 캔이 놓일 위치, 사람이 잡을 부위"
    page: 7
    bbox_norm: [0.0947, 0.2964, 0.9772, 0.5282]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig08.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig08.png
    caption: "시작점과 끝점을 먼저 예측해 2D trajectory를 만드는 예시. 손에서 도구까지의 경로와 쟁반 닦기 경로"
    page: 8
    bbox_norm: [0.0947, 0.2471, 0.9056, 0.4416]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig09.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig09.png
    caption: "Gemini Robotics-ER의 top-down grasp 예측 예시. 스테이플러 손잡이, 테이프, 가위 손가락 구멍, 바나나 줄기와 중앙"
    page: 9
    bbox_norm: [0.0947, 0.0939, 0.9054, 0.2951]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig10.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig10.png
    caption: "서로 다른 뷰의 2D point를 대응시키는 multi-view correspondence 예시. 왼쪽 이미지의 점이 오른쪽 이미지에서 보이는지와 그 좌표를 예측한다"
    page: 10
    bbox_norm: [0.1737, 0.2287, 0.8263, 0.5547]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig11.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig11.png
    caption: "단안 이미지에서 open-vocabulary 3D bounding box를 직접 예측하는 예시"
    page: 10
    bbox_norm: [0.0747, 0.6354, 0.9149, 0.8577]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig12.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig12.png
    caption: "zero-shot 제어를 위한 perception API와 control API, episode 안의 agentic 오케스트레이션 개요. Gemini Robotics-ER의 능력이 tool로 노출된다"
    page: 11
    bbox_norm: [0.1124, 0.5769, 0.8855, 0.8403]
    strategy: caption-region
    curated: true
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig13.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig13.png
    caption: "few-shot in-context learning 파이프라인 개요. observation, 지시문, trajectory를 프롬프트로 받아 새 인스턴스의 언어 추론과 trajectory를 생성한다"
    page: 13
    bbox_norm: [0.1001, 0.0939, 0.8855, 0.2932]
    strategy: caption-region
    curated: true
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig14.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig14.png
    caption: "Gemini Robotics 모델의 아키텍처와 입출력 개요. 클라우드의 VLA backbone과 로봇 온보드의 local action decoder로 나뉜다"
    page: 14
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3278]
    strategy: caption-region
    curated: true
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig15.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig15.png
    caption: "어수선한 환경에서 dexterous manipulation이 필요한 예시 task의 로봇 동작. 안경 케이스 열기, 콩 붓기, 파일 폴더 풀기, 헤드폰 선 감기"
    page: 15
    bbox_norm: [0.1737, 0.0939, 0.8263, 0.4583]
    strategy: caption-region
    curated: false
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig16.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig16.png
    caption: "데이터셋에서 뽑은 20개 task의 out-of-the-box 성공률. Gemini Robotics가 π0 re-implement와 multi-task diffusion 두 baseline을 크게 앞선다"
    page: 16
    bbox_norm: [0.0899, 0.0929, 0.9301, 0.3991]
    strategy: manual
    curated: true
  - id: fig17
    label: Figure 17
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig17.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig17.png
    caption: "학습에 없던 어수선한 장면에서의 지시문 추종. 왼쪽은 학습 물체 장면, 가운데는 새 물체 장면, 오른쪽은 새 물체에 대한 Pick과 Pick-Place 성공률"
    page: 17
    bbox_norm: [0.0947, 0.0937, 0.9053, 0.2499]
    strategy: caption-region
    curated: false
  - id: fig18
    label: Figure 18
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig18.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig18.png
    caption: "visual generalization 평가용 task 예시. in-distribution 장면, distractor 추가, 배경 변경, 조명 변경"
    page: 18
    bbox_norm: [0.1645, 0.0936, 0.8127, 0.2512]
    strategy: caption-region
    curated: false
  - id: fig19
    label: Figure 19
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig19.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig19.png
    caption: "instruction generalization 평가용 task 예시. in-distribution, 오타, 스페인어, 다른 문장, 서술적 수식어"
    page: 18
    bbox_norm: [0.0295, 0.304, 0.906, 0.4499]
    strategy: caption-region
    curated: false
  - id: fig20
    label: Figure 20
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig20.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig20.png
    caption: "action generalization 평가용 task 예시. 다른 초기 위치와 새 물체 인스턴스(드레스 크기 S에서 M과 XS로)"
    page: 18
    bbox_norm: [0.0321, 0.5026, 0.9564, 0.7755]
    strategy: caption-region
    curated: false
  - id: fig21
    label: Figure 21
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig21.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig21.png
    caption: "Gemini Robotics의 generalization 분해 결과(progress score). instruction, visual, action 세 유형 모두에서 baseline을 앞선다"
    page: 19
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3843]
    strategy: caption-region
    curated: true
  - id: fig22
    label: Figure 22
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig22.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig22.png
    caption: "ALOHA에서 수행한 long-horizon dexterous task 여섯 개. origami 여우 접기, 도시락 싸기, spelling board game, 카드 게임, 집게로 완두콩 담기, 견과류 담기"
    page: 20
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.6159]
    strategy: caption-region
    curated: false
  - id: fig23
    label: Figure 23
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig23.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig23.png
    caption: "specialization 후 long-horizon dexterous task 성공률. Gemini Robotics만 origami와 lunch-box를 일관되게 풀며 lunch-box는 100%다"
    page: 21
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.291]
    strategy: caption-region
    curated: true
  - id: fig24
    label: Figure 24
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig24.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig24.png
    caption: "embodied reasoning이 필요한 실제 로봇 task에서 reasoning-enhanced specialist와 vanilla Gemini Robotics의 성공률 비교"
    page: 23
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3435]
    strategy: caption-region
    curated: true
  - id: fig25
    label: Figure 25
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig25.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig25.png
    caption: "reasoning-enhanced Gemini Robotics의 내부 chain-of-thought에 쓰이는 예측 trajectory 시각화. 다음 1초 동안의 왼팔(빨강)과 오른팔(파랑) 경로"
    page: 23
    bbox_norm: [0.1354, 0.3874, 0.8726, 0.7445]
    strategy: caption-region
    curated: false
  - id: fig26
    label: Figure 26
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig26.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig26.png
    caption: "시연 데이터 수에 따른 fast adaptation 성공률. 8개 task 중 7개에서 100개 이하의 시연으로 70% 이상에 도달한다"
    page: 24
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3744]
    strategy: caption-region
    curated: true
  - id: fig27
    label: Figure 27
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig27.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig27.png
    caption: "Gemini Robotics를 다른 로봇에 fine-tuning한 예시. 위는 Apollo humanoid의 도시락 싸기, 아래는 bi-arm 산업용 로봇의 고무 벨트 조립"
    page: 25
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3613]
    strategy: caption-region
    curated: true
  - id: fig28
    label: Figure 28
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig28.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig28.png
    caption: "bi-arm Franka로 적응한 Gemini Robotics의 generalization 분해(progress score). visual과 action 두 유형에서 single-task diffusion을 앞선다"
    page: 26
    bbox_norm: [0.2251, 0.0939, 0.7749, 0.3396]
    strategy: caption-region
    curated: false
  - id: fig29
    label: Figure 29
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig29.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig29.png
    caption: "constitution과 safety post-training을 통한 안전 벤치마킹과 완화. ASIMOV-Multimodal과 ASIMOV-Injury의 예시와 alignment 정확도"
    page: 27
    bbox_norm: [0.0934, 0.0988, 0.9077, 0.6736]
    strategy: caption-region
    curated: true
  - id: fig30
    label: Figure 30
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig30.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig30.png
    caption: "ALOHA 2 시뮬레이션 task 환경. Banana in Bowl, Banana Handover, Banana Lift, Fruit Bowl, Mug on Plate, Bowl on Rack, Pack Toy"
    page: 40
    bbox_norm: [0.1291, 0.0939, 0.8709, 0.2991]
    strategy: caption-region
    curated: false
  - id: fig31
    label: Figure 31
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig31.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig31.png
    caption: "실제 ALOHA 2 task 환경. Banana Handover, Fold Dress, Wiping"
    page: 40
    bbox_norm: [0.1291, 0.3535, 0.8709, 0.4935]
    strategy: caption-region
    curated: false
  - id: fig32
    label: Figure 32
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig32.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig32.png
    caption: "zero-shot 로봇 제어 중 Gemini가 출력한 planning 예시. 바나나 handover를 9단계로 나눈다"
    page: 44
    bbox_norm: [0.2133, 0.2487, 0.7873, 0.5546]
    strategy: caption-region
    curated: false
  - id: fig33
    label: Figure 33
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig33.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig33.png
    caption: "zero-shot 로봇 제어 중 Gemini가 출력한 grasping과 lifting 코드, 로봇 상태, 분석 예시"
    page: 45
    bbox_norm: [0.1144, 0.1197, 0.8856, 0.8211]
    strategy: caption-region
    curated: false
  - id: fig34
    label: Figure 34
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig34.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig34.png
    caption: "zero-shot 로봇 제어 중 오류 감지와 재시도 예시. 손가락 간격 0.0으로 grasping 실패를 감지하고 다시 계획한다"
    page: 46
    bbox_norm: [0.1777, 0.3003, 0.823, 0.6413]
    strategy: caption-region
    curated: false
  - id: fig35
    label: Figure 35
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig35.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig35.png
    caption: "out-of-the-box 평가(Fig. 16)에 쓴 20개 task의 초기 장면과 지시문"
    page: 48
    bbox_norm: [0.0454, 0.1496, 0.9442, 0.8183]
    strategy: caption-region
    curated: false
  - id: fig36
    label: Figure 36
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig36.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig36.png
    caption: "지시문 추종 분석(3.3절)에 쓴 5개 장면과 25개 지시문"
    page: 49
    bbox_norm: [0.0833, 0.1663, 0.906, 0.6607]
    strategy: caption-region
    curated: false
  - id: fig37
    label: Figure 37
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig37.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig37.png
    caption: "instruction generalization 평가에 쓴 초기 장면과 지시문 변형 예시"
    page: 50
    bbox_norm: [0.0251, 0.2862, 0.9058, 0.7205]
    strategy: caption-region
    curated: false
  - id: fig38
    label: Figure 38
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig38.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig38.png
    caption: "visual generalization 평가에 쓴 초기 장면과 지시문 예시"
    page: 51
    bbox_norm: [0.1645, 0.0936, 0.8185, 0.578]
    strategy: caption-region
    curated: false
  - id: fig39
    label: Figure 39
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig39.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig39.png
    caption: "action generalization 평가에 쓴 초기 장면과 지시문 예시"
    page: 52
    bbox_norm: [0.0322, 0.0936, 0.967, 0.4803]
    strategy: caption-region
    curated: false
  - id: fig40
    label: Figure 40
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig40.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig40.png
    caption: "Gemini Robotics의 generalization 분해 결과(success rate). Fig. 21의 progress score를 success rate로 다시 그린 것"
    page: 53
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3843]
    strategy: caption-region
    curated: false
  - id: fig41
    label: Figure 41
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig41.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig41.png
    caption: "π0 openpi 공개 체크포인트를 baseline에 추가한 fast adaptation 결과. 8개 중 5개 task에서 re-implement와 일치한다"
    page: 54
    bbox_norm: [0.1342, 0.5092, 0.8658, 0.7575]
    strategy: caption-region
    curated: false
  - id: fig42
    label: Figure 42
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig42.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig42.png
    caption: "specialization 후 long-horizon dexterous task의 평균 progress score. Fig. 23을 보완한다"
    page: 55
    bbox_norm: [0.0947, 0.481, 0.9053, 0.6781]
    strategy: caption-region
    curated: false
  - id: fig43
    label: Figure 43
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig43.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig43.png
    caption: "fast adaptation 실험 task 8개. Draw card, Play card, Pour lettuce, Salad dressing, Seal container, Put container in lunch-box, Zip lunch-box, Origami first fold"
    page: 58
    bbox_norm: [0.0828, 0.0783, 0.9189, 0.8174]
    strategy: caption-region
    curated: false
  - id: fig44
    label: Figure 44
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig44.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig44.png
    caption: "bi-arm Franka 로봇의 4개 task rollout. 테이프 걸기, 플러그 삽입, NIST task board 2의 round belt와 timing belt 조립"
    page: 60
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.4914]
    strategy: caption-region
    curated: false
  - id: fig45
    label: Figure 45
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig45.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig45.png
    caption: "bi-arm Franka 적응 모델의 visual generalization 평가 task 예시"
    page: 62
    bbox_norm: [0.1338, 0.1573, 0.8661, 0.8027]
    strategy: caption-region
    curated: false
  - id: fig46
    label: Figure 46
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig46.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig46.png
    caption: "bi-arm Franka 적응 모델의 action generalization 평가 task 예시"
    page: 63
    bbox_norm: [0.0684, 0.1873, 1.0, 0.7269]
    strategy: caption-region
    curated: false
  - id: fig47
    label: Figure 47
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig47.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig47.png
    caption: "bi-arm Franka 적응 모델의 generalization 분해(success rate). Fig. 28의 progress score를 success rate로 다시 그린 것"
    page: 64
    bbox_norm: [0.2251, 0.3499, 0.7749, 0.5956]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/tab01.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/tab01.png
    caption: "ERQA, RealworldQA, BLINK에서의 VLM 비교. Gemini 2.0 Pro Experimental이 세 벤치마크 모두에서 가장 높다"
    page: 5
    bbox_norm: [0.0999, 0.0899, 0.9001, 0.1971]
    strategy: manual
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/tab02.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/tab02.png
    caption: "ERQA에서 chain-of-thought 프롬프트 유무에 따른 정확도"
    page: 5
    bbox_norm: [0.2052, 0.7886, 0.7948, 0.8746]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/tab03.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/tab03.png
    caption: "2D pointing 벤치마크(Paco-LVIS, Pixmo-Point, Where2Place) 정확도. Gemini Robotics-ER이 세 개 중 두 개에서 Molmo를 앞선다"
    page: 8
    bbox_norm: [0.0999, 0.0899, 0.9001, 0.2091]
    strategy: manual
    curated: true
  - id: tab04
    label: Table 4
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/tab04.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/tab04.png
    caption: "SUN-RGBD 3D object detection(AP@15). Gemini Robotics-ER이 48.3으로 새 state-of-the-art"
    page: 10
    bbox_norm: [0.0899, 0.0979, 0.9201, 0.1771]
    strategy: manual
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/tab05.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/tab05.png
    caption: "ALOHA 2 시뮬레이션 task 성공률. zero-shot과 ICL, Gemini 2.0 Flash와 Gemini Robotics-ER 비교"
    page: 12
    bbox_norm: [0.0899, 0.1979, 0.9101, 0.3421]
    strategy: manual
    curated: true
  - id: tab06
    label: Table 6
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/tab06.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/tab06.png
    caption: "실제 ALOHA 2 task에서 Gemini Robotics-ER의 성공률. zero-shot 평균 25%, ICL 평균 65%"
    page: 12
    bbox_norm: [0.3078, 0.4562, 0.6922, 0.5611]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/tab07.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/tab07.png
    caption: "Gemini Robotics 모델 카드"
    page: 39
    bbox_norm: [0.0947, 0.0708, 0.9053, 0.2547]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

Google DeepMind가 Gemini 2.0 위에 만든 robotics 전용 모델 계열의 기술 보고서다. embodied reasoning을 강화한 VLM인 Gemini Robotics-ER과, 그 위에서 로봇 action을 직접 내는 VLA인 Gemini Robotics를 소개한다. VLM의 embodied reasoning 정도를 재는 공개 벤치마크 ERQA를 함께 내놓고, Gemini Robotics-ER만으로 코드 생성과 in-context learning을 통해 zero-shot과 few-shot 로봇 제어가 가능함을 보인다. Gemini Robotics는 클라우드의 VLA backbone과 로봇 온보드의 local action decoder를 결합해 end-to-end 지연 약 250ms, 유효 control frequency 50Hz로 동작하며, ALOHA 2에서 수집한 수천 시간의 시연 데이터(demonstration)로 학습해 20개 dexterous task와 세 유형의 generalization 벤치마크에서 π0 re-implement와 multi-task diffusion baseline을 앞선다. 선택적 specialization으로 origami 접기와 도시락 싸기 같은 long-horizon task, embodied reasoning을 결합한 generalization, 100개 이하 시연으로의 fast adaptation, bi-arm Franka와 Apollo humanoid 같은 새 embodiment 적응을 시연한다.

## 1. 자료 정보 (Document Information)

- 제목: Gemini Robotics: Bringing AI into the Physical World
- 저자: Gemini Robotics Team, Google DeepMind (기여자 명단은 논문 부록)
- arXiv: 2503.20020 (2025-03-25), 총 64페이지 (본문 29페이지, 참고문헌 8페이지, 부록 27페이지)
- 공개물: ERQA 벤치마크 (https://github.com/embodiedreasoning/ERQA), ASIMOV 데이터셋 (Sermanet et al., 2025a,b 동시 공개), 모델 카드 (부록 A). 모델 가중치는 비공개
- 학습 인프라: TPU v4, v5p, v6e. JAX와 ML Pathways

## 2. 주요 기여 (Key Contributions)

이 보고서의 핵심 주장은 frontier VLM의 멀티모달 이해와 추론이 로봇 제어의 기반이 될 수 있으며, 그러려면 두 가지가 필요하다는 것이다. 첫째는 물리 세계의 기하와 시공간 세부를 이해하는 embodied reasoning이고, 둘째는 그 추론을 물리 action의 언어로 grounding하는 것이다. embodied reasoning은 VLM이 물체와 공간 개념을 실세계에 grounding하고 그 신호를 downstream robotics 응용에 합성하는 능력을 뜻한다.

보고서가 내세우는 기여는 네 가지다.

1. ERQA: VLM의 embodied reasoning을 평가하는 공개 벤치마크. 기존 VLM 벤치마크가 물체 인식, 개수 세기, localization 같은 원자적 능력에 치우친 것을 보완한다.
2. Gemini Robotics-ER: Gemini 2.0 Flash에 embodied reasoning을 강화한 VLM. 3D perception, pointing, 로봇 상태 추정, 코드 생성을 통한 affordance 예측까지 지원한다.
3. Gemini Robotics: 로봇 action 데이터를 통합해 만든 VLA. 고주파 dexterous 제어, 견고한 generalization, 다양한 task와 embodiment로의 fast adaptation을 제공한다.
4. Responsible Development: Google AI Principles에 따라 사회적 이익과 위험을 검토하고, content safety와 semantic action safety 두 층의 완화 방법을 제시한다.

논문은 Gemini Robotics의 성공 요인을 세 가지로 추정한다. embodied reasoning이 강화된 VLM, 대규모 로봇 action 데이터와 다양한 비로봇 데이터를 섞은 robotics 전용 학습 레시피, 저지연 로봇 제어를 위한 클라우드와 온보드 분리 아키텍처다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 ERQA 벤치마크

ERQA(Embodied Reasoning Question Answering)는 객관식 VQA 형식 400문항으로 구성된다. 범주는 spatial reasoning 84문항, action reasoning 72문항, trajectory reasoning 66문항, state estimation 55문항, task reasoning 38문항, multi-view reasoning 37문항, pointing 34문항, 기타 14문항이다. 400문항 중 28%는 프롬프트에 이미지가 두 장 이상 들어가며, 여러 이미지에 걸쳐 개념을 대응시켜야 하는 이 문항들이 단일 이미지 문항보다 어렵다.

모든 문항은 수작업으로 라벨링했다. 이미지(문항이 아니라)는 직접 촬영하거나 OXE, UMI Data, MECCANO, HoloAssist, EGTEA Gaze+에서 가져왔다. 일부 문항은 여러 프레임에 걸쳐 물체를 인식하고 대응시켜야 하고, 다른 문항은 물체의 affordance와 장면 속 3D 관계를 추론해야 한다.

chain-of-thought 프롬프트는 다음 지시를 각 문항 끝에 붙여 적용했다: "Reason step by step about the answer, and show your work, for each step. Only after that, proceed to the final answer." 이 프롬프트를 쓰면 Gemini 2.0 Flash의 성능이 CoT 없는 Gemini 2.0 Pro Experimental을 넘어선다.

### 3.2 Gemini 2.0과 Gemini Robotics-ER의 embodied reasoning 능력

Gemini Robotics-ER은 Gemini 2.0 Flash의 변형으로, 추가 로봇 데이터나 학습 없이 robotics 응용에 쓸 수 있다. 2D 능력과 3D 능력으로 나뉜다.

| 능력 | 구분 | 설명 | 표현 규약 (부록 B.1) |
|---|---|---|---|
| Object Detection | 2D | open-world 2D bounding box. 질의는 명시적(물체 이름)이거나 암시적(범주, 속성, 기능)일 수 있다 | y0, x0, y1, x1. 0~1000 정수로 정규화 |
| Pointing | 2D | 물체와 물체 부위, affordance(어디를 잡을지, 어디에 놓을지), 빈 공간, 공간 개념을 가리킨다 | y, x 튜플. in_frame, point, label 키를 가진 JSON 리스트 |
| Trajectory Prediction | 2D | pointing을 이어 붙여 observation에 grounding된 2D motion trajectory를 만든다 | 시작점과 끝점을 먼저 예측한 뒤 중간 점을 보간 |
| Grasp Prediction | 2D | Gemini Robotics-ER에서 새로 도입. pointing을 top-down grasp로 확장 | y, x, 회전각 θ. θ는 -90~90 정수 도(degree), 0은 손가락이 이미지 가로축과 나란한 상태 |
| Multi-View Correspondence | 3D | 여러 카메라 뷰의 같은 장면에서 2D point 대응을 예측 | 초기 이미지의 점 목록과 새 뷰 이미지를 주면 어느 점이 보이는지와 좌표를 답한다 |
| 3D Bounding Box Detection | 3D | 단안 이미지에서 metric 3D bounding box를 직접 예측 | x, y, z, w, h, l, r1, r2, r3 (r은 Euler 각). 소수점 둘째 자리까지의 짧은 텍스트 토큰 |

Gemini 2.0은 2D bounding box를 y0, x0, y1, x1 순으로 표현한다. 장면 전체를 검출하도록 프롬프트할 수도 있고, "detect all the kitchenware"처럼 서술로, "nuts on the right side of the image"처럼 공간 단서로, "the spill and what can be used to clean it up"처럼 affordance로 검출할 수도 있다. 마지막 예시에서 모델은 명시하지 않은 수건까지 함께 찾아낸다.

pointing은 bounding box보다 유연하고 정밀한 표현이다. 스푼 손잡이 같은 물체 부위, "팬 왼쪽의 빈 공간", "기존 8개 캔의 패턴을 따라 9번째 캔이 놓일 자리" 같은 공간 개념, "사람이 집어 들 때 잡을 곳"(머그 손잡이) 같은 affordance를 모두 가리킬 수 있다. trajectory 예측은 복잡한 motion planning(장애물 회피 등)은 못 하지만 observation에 grounding된 유용한 경로를 만든다. 예를 들어 손에서 잡을 도구까지의 경로나, 그리퍼가 따라가면 쟁반의 얼룩을 닦게 되는 waypoint 열을 낸다.

multi-view correspondence는 시점이 크게 달라도 동작한다. 한 이미지 쌍에서는 사람이 든 물체에 찍힌 빨간 점이 장면이 많이 바뀐 두 번째 이미지에서도 같은 물체를 가리킨다고 맞혔고, 다른 쌍에서는 주황 점이 두 번째 이미지에서 보이지 않는다고 맞혔다. 3D detection은 open-vocabulary 질의를 받는다는 점에서 닫힌 범주 집합만 다루는 expert 모델과 다르다.

개별 expert 모델을 따로 만드는 대신 하나의 foundation model에 이 능력을 모으면, open-world 자연어 지시문(instruction)으로 embodied reasoning task를 수행하고 피드백에 응답하며 multi-turn 상호작용을 이어갈 수 있다. 장면 이해와 추론을 결합해 로봇 코드를 쓰는 것이 그 예다.

### 3.3 zero-shot 제어: 코드 생성

Gemini 2.0의 embodied reasoning 덕분에 로봇 action 데이터로 학습한 적이 없어도 로봇을 제어할 수 있다. perception, 상태 추정, 공간 추론, planning, 제어를 한 모델이 처리한다. 이전 연구(SayCan, Code as Policies 등)는 여러 모델을 조합해야 했다.

실험은 bimanual ALOHA 2 로봇에서 수행했다. Gemini 2.0은 각 그리퍼를 지정 pose로 움직이고, 그리퍼를 여닫고, 현재 로봇 상태를 읽는 API를 받는다. perception 함수도 API에 있지만 외부 모델을 부르지 않는다. Gemini 2.0 자신이 물체 bounding box, 물체 위의 point, top-down grasp pose를 낸다.

episode 흐름은 다음과 같다.

1. 시스템 프롬프트, 로봇 API 설명, task 지시문을 처음에 준다.
2. 현재 장면 이미지, 로봇 상태, 실행 피드백을 반복해서 받는다.
3. 환경에서 실행될 코드를 출력한다. 코드는 API로 장면을 이해하고 로봇을 움직인다.
4. 실행 루프가 반응과 재계획을 허용한다. 예를 들어 그리퍼를 닫았는데 손가락 간격이 0.0이면 grasping 실패로 판단하고 물체 위로 약간 올라가 다시 시도한다 (부록 Fig. 34).

시스템 프롬프트(부록 B.3.2)는 task와 무관하게 고정이고 지시문만 바뀐다. 프롬프트는 로봇을 "양팔 로봇"으로 소개하고 절차를 4단계로 규정한다. 지시문 수신, 장면 서술, 단계 planning(각 단계마다 실행 후 장면이 어떻게 보여야 하는지 서술), 단계 실행(목표 요약, grasping 지침 준수, 도달 가능성과 충돌 여유 확인, 코드 작성, 실행 결과 요약, 목표와 비교해 불일치 시 재계획)이다. 세계 좌표계(x 좌우, y 앞뒤, z 상하, 원점은 테이블 중앙 표면), 로봇 물리 제약(손가락 길이 0.09m, 최대 개방 0.065m, 테이블 0.80m×0.40m, 왼팔 x는 -0.40~0.1m, 오른팔 x는 -0.1~0.40m), grasping 지침(get_grasp_position_and_euler_orientation 사용, 팔이 물체를 가리지 않게, 도달 가능성, 그리퍼 개방 확인, distance_between_fingers > 0으로 성공 판정)이 포함된다.

API 클래스 RealAlohaRobotApi는 close_gripper, detect_objects(XYZ 중심과 크기), get_grasp_position_and_euler_orientation(gripper, object_name, part_name), get_image, move_gripper_to(position, orientation, gripper), move_gripper_to_safe_position, open_gripper, reset, state_description을 제공한다.

### 3.4 few-shot 제어: in-context learning

일부 dexterous manipulation은 zero-shot으로는 어렵다. 이 경우 소수의 in-context 시연 데이터로 모델을 조건화하면 그 동작을 바로 흉내 낸다. 코드 대신 end-effector pose의 trajectory를 직접 생성하도록 프롬프트한다.

방법은 Di Palo and Johns(2024)의 확장이다. 원 방법은 k개의 teleoperation trajectory를 물체와 end-effector pose 목록으로 바꿔 텍스트로 토큰화하고 프롬프트에 넣는다. 원 방법은 시각 keypoint와 물체 pose를 뽑는 외부 모델이 필요했지만, Gemini Robotics-ER은 스스로 그 일을 한다. 추가로 observation과 action 사이에 수행된 action의 언어 서술을 끼워 넣어 추론 시점에 추론을 유도한다. 모델은 in-context trajectory의 자연어 추론을 흉내 내면서 어느 팔을 언제 쓸지, 물체의 어디와 상호작용할지를 더 정확히 예측한다. 큰 멀티모달 모델의 장점은 observation, action, 언어 세 가지를 함께 조건으로 쓸 수 있다는 것이며, 셋의 조합이 어느 하나만 쓸 때보다 낫다. 실험에는 시연 데이터 10개를 썼다.

### 3.5 Gemini Robotics: 모델과 데이터

Gemini Robotics-ER 같은 큰 VLM은 추론이 느리고 특수 하드웨어가 필요해서, VLA로 쓰면 온보드 실행이 불가능하고 지연이 실시간 제어와 맞지 않는다. Gemini Robotics는 두 구성 요소로 이 문제를 푼다.

| 구성 요소 | 위치 | 역할 | 지연 |
|---|---|---|---|
| Gemini Robotics backbone | 클라우드 | Gemini Robotics-ER의 distillation 버전. 이미지와 지시문을 받아 action chunk를 낸다 | 질의에서 응답까지 수 초에서 160ms 미만으로 최적화 |
| Gemini Robotics decoder | 로봇 온보드 컴퓨터 | backbone의 지연을 상쇄하는 local action decoder | backbone과 합쳐 raw observation에서 저수준 action chunk까지 약 250ms |

action chunk는 한 번의 추론으로 여러 timestep의 action을 묶어 내는 단위다. chunk 안에 여러 action이 있으므로 유효 control frequency는 50Hz다. 이 구성은 backbone 지연에도 부드러운 동작과 반응적 동작을 만들면서 backbone의 generalization 능력을 유지한다. 입력은 현재 장면 이미지 여러 장과 task 텍스트 지시문이며(Fig. 14의 프롬프트 예시는 proprioception도 포함), 출력은 로봇이 실행하는 action chunk다.

데이터는 ALOHA 2 로봇 fleet에서 12개월간 수집한 대규모 teleoperation action 데이터셋으로, 수천 시간의 실세계 전문가 시연 데이터를 담는다. 수천 개의 다양한 task를 포함하며 manipulation 스킬, 물체, 난이도, episode 길이, dexterity 요구가 다양하다. 학습 데이터에는 웹 문서, 코드, 멀티모달 콘텐츠(이미지, 오디오, 비디오), embodied reasoning과 VQA 데이터 같은 비action 데이터도 들어간다. 이는 다양한 로봇 task와 요청을 이해하고 추론하고 generalization하는 능력을 높인다.

### 3.6 baseline과 평가 절차

| baseline | 구조 | 학습 (3절) | fine-tuning (4절) | 비고 |
|---|---|---|---|---|
| π0 re-implement | PaliGemma VLM의 latent에 attention하는 diffusion Transformer action expert. 공개 π0의 충실한 재구현 | 동일 데이터 혼합, batch 2,048, 30만 스텝 | 3절 체크포인트에서 batch 2,048, 5만 스텝 | 내부 평가에서 openpi 공개 체크포인트와 task별 fine-tuning한 openpi를 모두 앞서 재구현 결과를 보고 |
| Multi-task diffusion | ALOHA Unleashed의 diffusion policy에 CLIP 텍스트 인코더를 더해 task 조건화 | 동일 action 데이터 혼합, batch 512, 200만 스텝 | 3절 체크포인트에서 batch 512, 100만 스텝 | |
| Single-task diffusion | ALOHA Unleashed 그대로 | 3절 비교에서 제외 (multi-task용이 아님) | 처음부터 batch 512, 200만 스텝 | 4절 specialization과 adaptation 실험에서만 사용 |

두 baseline은 Gemini Robotics와 같은 데이터 혼합으로 수렴할 때까지 학습했다. Gemini Robotics는 주로 클라우드에서 local action decoder와 함께 실행되고, 두 baseline은 NVIDIA RTX 4090 GPU 워크스테이션에서 로컬로 실행된다.

실세계 로봇 지표는 환경 변화와 하드웨어 마모 때문에 잡음이 크다. 그래서 각 평가 task(지시문과 초기 조건으로 정의)를 여러 번 시도하고, 대상 모델들을 무작위 순서로 번갈아 평가한다(A/B testing). 이렇게 하면 네트워크 지연, 모터 마모, 조명 변화 같은 환경 요인과 운영자 편향을 줄이고 pairwise t-test로 개선을 검정할 수 있다. 지표는 이진 success(0 또는 1)와 0~1 연속값 progress score 둘이다. task progress는 task를 얼마나 완수했는지를 나타내는 연속 지표로, long-horizon과 어려운 generalization 시나리오에서 이진 성공보다 세밀하게 비교할 수 있다. 각 task의 progress 정의는 부록 C.1.3.3과 D.1.1에 있다. 예를 들어 "Put the legos into the lego bag"은 블록 4개를 넣으면 1.0, 3개 0.75, 2개 0.5, 1개 0.25다.

### 3.7 out-of-the-box 평가 설계

첫 실험은 데이터셋에서 뽑은 20개 short-horizon dexterous task에서 task별 fine-tuning이나 추가 프롬프트 없이 모든 모델을 평가한다. 장면은 세탁실("fold pants"), 부엌("stack measuring cup"), 어수선한 사무실 책상("open pink folder"), 일상 활동("open glasses case")을 아우른다. dexterity 수준은 단순 pick-and-place("pick the shoe lace from the center of the table")부터 양손 협응이 필요한 변형 물체 조작("wrap the wire around the headphone")까지다. 20개 task 전체 목록은 부록 Fig. 35에 있다.

두 번째 실험은 지시문 추종이다. 학습 장면과 새 물체와 용기가 있는 새 장면을 포함한 5개 장면에서 25개 지시문을 평가한다. "clean the table" 같은 열린 지시가 아니라 "Place the blue clip to the right of the yellow sticky notes"처럼 정확히 따라야 하는 명령에 초점을 둔다.

세 번째 실험은 generalization이다. 선행 연구(Gao et al., 2025)에서 중요하다고 본 세 유형의 변형을 다룬다.

| 유형 | 정의 | 변형 |
|---|---|---|
| Visual Generalization | task 해결에 필요한 action에 영향을 주지 않는 시각 변화에 불변 | 배경(나무 상판을 파란색과 흰색 천으로), 조명, distractor 물체, 질감 |
| Instruction Generalization | 자연어 지시문의 불변성과 동치 이해 | 다른 문장(rephrasing), 오타, 다른 언어(스페인어), 서술적 수식어 |
| Action Generalization | 학습한 동작을 조정하거나 새 동작을 합성 | 학습에 없던 초기 위치, 새 물체 인스턴스(모양이나 물리 속성이 다름. 드레스 크기 S에서 M과 XS) |

벤치마크는 총 85개 task로, 20%가 학습 분포 안, 28%가 visual, 28%가 instruction, 24%가 action generalization이다. visual과 instruction은 도시락 가방에 물건을 싸는 장면의 4개 task, action은 여러 장면의 6개 task로 구성된다. 결과는 progress score로 보고하고(Fig. 21), success rate는 부록 Fig. 40에 있다.

### 3.8 specialization과 adaptation

4절은 generalist 모델의 한계를 시험하고 개선 방향을 탐색한다. (1) long-horizon dexterity와 (2) reasoning-enhanced generalization은 미래 모델 개선을 위한 정보이고, (3) fast adaptation과 (4) 새 embodiment 적응은 실제 배치에 필요한 성질이다.

long-horizon dexterity에서는 여섯 task를 골라 task당 2,000~5,000 episode의 고품질 시연 데이터를 큐레이션하고 3절의 Gemini Robotics 체크포인트를 fine-tuning한다.

| task | 요구 사항 |
|---|---|
| Make an origami fox | 종이를 여우 머리 모양으로 접는다. 정밀한 접기 4번(정렬, 구부리기, 집기, 주름)이 필요하고 종이 층이 늘어난다. 작은 오류가 복구 불가능한 실패로 이어져 정밀한 양팔 협응이 필요하다 |
| Pack a lunch-box | 빵 한 조각을 비닐백의 좁은 입구에 넣고 지퍼를 닫고, 비닐백과 에너지바를 도시락 가방에 옮기고, 포도를 용기에 옮겨 뚜껑을 닫고 가방에 넣은 뒤, 가방 지퍼를 닫는다. 완료에 2분 이상 걸린다 |
| Spelling board game | 사람이 놓은(또는 그린) 그림을 인식하고 알파벳 타일을 보드로 옮겨 세 글자 단어를 철자한다. 시각 인식과 vision-language-action grounding이 필요하다 |
| Play a game of cards | 자동 카드 딜러에서 카드 3장을 뽑아 다른 손으로 옮기고, 사람이 낼 때까지 기다린 뒤 카드 1장을 내고, 손패를 접는다. 얇은 카드의 handover와 손패에서 한 장 뽑기가 필요하다 |
| Add snap peas to salad | 금속 집게로 완두콩을 집어 다른 그릇으로 옮긴다. 한 팔이 집게를 잡고 다른 팔이 눌러서 집고 놓는 양팔 협응이 필요하다 |
| Add nuts to salad | 스푼으로 세로 용기의 견과류를 퍼서 샐러드 그릇에 붓는다 |

비교 대상은 같은 데이터로 fine-tuning한 π0 re-implement specialist와 Multi-task diffusion specialist, 처음부터 학습한 single-task diffusion policy, 그리고 다양한 학습 데이터의 중요성을 보기 위해 3절 체크포인트 없이 specialization 데이터만으로 처음부터 학습한 Gemini Robotics specialist다. 시도 횟수는 task당 모델당 20회, spelling game만 12회(인쇄 카드 6회, 손그림 6회)다.

reasoning-enhanced generalization은 3.1절 로봇 action 데이터셋을 다시 라벨링한 버전으로 fine-tuning한다. 재라벨링은 action 예측을 새로 도입한 embodied reasoning 능력, 특히 trajectory 이해와 생성에 가깝게 만든다. local action decoder는 이 추론 중간체를 연속 저수준 action으로 바꾸도록 확장된다. 평가는 학습 분포 밖의 실세계 task 8개에서 100회 시도로 하며, 각 task는 3.4절의 분포 이동 여러 개를 동시에 결합한다.

| 범주 | task | 학습 action 라벨 분포에 없는 것 |
|---|---|---|
| One-step Reasoning | "Put the coke can into the same colored plate", "Sort the bottom right mouse into the matching pile", "I need to brush my teeth, pick up the correct item" | 추론 키워드 same, matching, correct |
| Semantic Generalization | "Put the Japanese fish delicacy in the lunch-box"(초밥), "Pick up the full bowl"(주사위가 든 그릇) | 새 의미 개념 Japanese fish delicacy, full |
| Spatial Understanding | "Pack the smallest coke soda in the lunch-box"(미니 캔), "Put the cold medicine in the bottom/top left bowl" | 새 물체(coke soda, medicine). 공간 개념은 smallest 없음, top left와 bottom left 드묾, left와 right 흔함 |

fast adaptation은 4.1절 long-horizon task에서 짧은 부분 task 8개를 뽑아 시연 데이터 5개, 20개, 100개로 3절 체크포인트를 fine-tuning한다. 3절 체크포인트는 4.1절 시연을 본 적이 없으므로 새 task에 대한 공정한 시험이다. 각 점은 10회 시도의 평균 성공률이며, short-horizon이라 progress score는 정의하지 않는다. 시연 100개는 task 복잡도에 따라 15분에서 1시간 분량이다.

| task | 내용 |
|---|---|
| Draw card | 초록 버튼을 눌러 카드 1장을 뽑아 왼쪽 그리퍼에 놓는다 |
| Play card | 그리퍼의 카드 3장 중 1장을 테이블에 낸다 |
| Pour lettuce | 초록 그릇의 상추를 흰 샐러드 그릇에 붓는다 |
| Salad dressing | 드레싱 병을 집어 흰 그릇 위에서 짠다 |
| Seal container | 용기 뚜껑의 여러 지점을 맞추고 눌러 닫는다 |
| Put container in lunch-box | 용기를 집어 열린 도시락 가방에 넣는다 |
| Zip lunch-box | 지퍼 손잡이로 가방을 끝까지 닫는다 |
| Origami first fold | 정사각형 종이를 대각선으로 접어 삼각형을 만든다 |

새 embodiment 적응은 예비 실험이다. ALOHA 2 action 데이터로 학습한 모델을 대상 플랫폼의 소량 데이터로 fine-tuning한다. 대상은 평행 그리퍼를 단 bi-arm Franka와 Apptronik의 다섯 손가락 dexterous hand를 가진 실물 크기 humanoid Apollo다. Franka에서는 산업용 task 4개를 평가한다.

| task | 내용 | progress 1.0 조건 |
|---|---|---|
| Tape hanging | 테이프를 집어 다른 팔에 넘기고 벽의 고리에 건다 | handover, 정확한 고리에 걸기, 팔 치우기 |
| Plug insertion | 한 팔이 UK 플러그를 잡아 소켓에 꽂아 불을 켜고 다른 팔이 소켓을 고정한다 | 삽입, 불 켜짐, 팔 치우기 |
| Round belt (NIST ATB 2) | 유연한 고무 벨트를 handover하고 늘려 풀리에 끼운다 | 양쪽 바퀴에 삽입, 정확한 안착, 팔 치우기 |
| Timing belt (NIST ATB 2) | 타이밍 벨트를 풀리에 조립한다. 파란 손잡이를 약 40N의 힘으로 당겨야 한다 | 양쪽 바퀴에 삽입, 정확한 안착, 팔 치우기 |

in-distribution 평가는 task당 20회 시도다. visual generalization은 새 distractor, 배경 변경, 조명 변경으로, action generalization은 학습에 없던 위치와 다른 외형, 모양, 물리 속성의 물체 인스턴스로 시험한다. 비교 대상은 single-task diffusion이며, 이 baseline은 지시문 조건이 없어 instruction generalization은 분석하지 않는다.

### 3.9 안전 설계

전통적 로봇 안전은 ISO와 RIA 표준의 위험 완화, 충돌 없는 motion planning, 힘 조절, 강건 제어를 포함한다. 역사적으로 초점은 physical action safety, 즉 장애물 회피와 작업 공간 경계 같은 물리 제약 준수, 안정적 이동, 접촉력 제한이었다. 이는 고전 제약 제어의 영역이며 motion planning, model-predictive control, 순응/힘 제어로 제어 스택 최하층에 구현된다. VLA는 이런 안전 필수 저수준 제어기와 인터페이스해야 하며, 선행 연구(Chiang et al., 2025; Varley et al., 2024)가 그 인터페이스를 프로토타입했다.

content safety는 Gemini 안전 규정(Gemini Safety policies)이 다루는 영역으로, 혐오 발언, 성적 노출, 부적절한 의료 조언, 개인 정보 노출 같은 유해 대화 콘텐츠를 막는다. Gemini 체크포인트 위에 만들었으므로 이 학습을 물려받는다. pointing 같은 새 출력 modality에는 추가 층이 필요해서, 이미지에 없는 것으로 generalization하면 안 되는 경우를 가르치는 지도 fine-tuning을 Gemini 2.0과 Gemini Robotics-ER에 수행했다. 그 결과 편향을 유도하는 pointing 질의의 거부율이 baseline 20%에서 96%로 올랐다.

semantic action safety는 열린 도메인의 비구조 환경에서 물리 안전 제약을 지키는 것이다. 부드러운 장난감을 뜨거운 스토브에 놓으면 안 되고, 알레르기가 있는 사람에게 땅콩을 주면 안 되고, 와인 잔은 세운 채 옮겨야 하고, 칼을 사람에게 향하면 안 된다는 식의 제약은 전부 열거하기 어렵다. 이를 평가하고 개선하기 위해 ASIMOV 데이터셋(Sermanet et al., 2025a,b)을 동시에 공개했다. 시각 안전 QA(ASIMOV-Multimodal)와 실세계 부상 기록(NEISS, 2024)에서 만든 텍스트 안전 QA(ASIMOV-Injury)로 구성되며 Gemini Robotics-ER은 이 데이터로 post-training된다. alignment 지표는 사람의 안전 판정에 대한 이진 분류 정확도다. constitutional AI 방식(데이터 기반 constitution 생성)과 safety post-training으로 성능이 오르고, 바람직함의 기준을 뒤집으라는 adversarial 프롬프트 아래의 성능 하락도 완화된다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 ERQA와 공간 이해 벤치마크

| 벤치마크 | Gemini 1.5 Flash | Gemini 1.5 Pro | Gemini 2.0 Flash | Gemini 2.0 Pro Experimental | GPT 4o-mini | GPT 4o | Claude 3.5 Sonnet |
|---|---|---|---|---|---|---|---|
| ERQA | 42.3 | 41.8 | 46.3 | 48.3 | 37.3 | 47.0 | 35.5 |
| RealworldQA (test) | 69.0 | 64.5 | 71.6 | 74.5 | 65.0 | 71.9 | 61.4 |
| BLINK (val) | 59.2 | 64.4 | 65.0 | 65.2 | 56.9 | 62.3 | 60.2 |

수치는 객관식 정확도(%)이고 2025년 2월에 측정했다. Gemini 2.0 Flash와 Pro Experimental이 각 모델 등급에서 세 벤치마크 모두 최고이며, ERQA가 셋 중 가장 어렵다.

| 프롬프트 | Gemini 2.0 Flash | Gemini 2.0 Pro Experimental | GPT 4o-mini | GPT 4o | Claude 3.5 Sonnet |
|---|---|---|---|---|---|
| CoT 없음 | 46.3 | 48.3 | 37.3 | 47.0 | 35.5 |
| CoT 있음 | 50.3 | 54.8 | 40.5 | 50.5 | 45.8 |

CoT를 쓰면 Gemini 2.0 Flash(50.3%)가 CoT 없는 Pro Experimental(48.3%)을 넘고, Pro Experimental은 54.8%까지 오른다. Fig. 5의 두 추론 흔적은 모델이 공간 이해를 이미지 observation에 정밀하게 grounding하고 그 grounding으로 단계적 embodied reasoning을 수행함을 보여준다.

### 4.2 pointing과 3D detection

| 벤치마크 | Gemini Robotics-ER | Gemini 2.0 Flash | Gemini 2.0 Pro Experimental | GPT 4o-mini | GPT 4o | Claude 3.5 Sonnet | Molmo 7B-D | Molmo 72B |
|---|---|---|---|---|---|---|---|---|
| Paco-LVIS | 71.3 | 46.1 | 45.5 | 11.8 | 16.2 | 12.4 | 45.4 | 47.1 |
| Pixmo-Point | 49.5 | 25.8 | 20.9 | 5.9 | 5.0 | 7.2 | 14.7 | 12.5 |
| Where2Place | 45.0 | 33.8 | 38.8 | 13.8 | 20.6 | 16.2 | 45 | 63.8 |

점수는 예측 point가 ground truth 영역 마스크 안에 들면 1, 아니면 0인 정확도다. Paco-LVIS는 자연 이미지의 물체 부위 pointing, Pixmo-Point는 웹 이미지의 open-vocabulary pointing, Where2Place는 실내 장면의 빈 공간 pointing이다. Pixmo-Point는 마스크가 없어 ground truth 점 주위 반지름 25의 원형 마스크로 근사했다. GPT와 Claude에는 지시문 기반 형식을 제공하고 Molmo는 XML 출력을 파싱했다. Gemini 2.0은 GPT와 Claude를 크게 앞서고, Gemini Robotics-ER은 pointing 전용 VLM인 Molmo를 세 하위 task 중 두 개에서 앞선다.

| 모델 | SUN-RGBD AP@15 |
|---|---|
| Gemini Robotics-ER | 48.3 |
| Gemini 2.0 Flash | 30.7 |
| Gemini 2.0 Pro Experimental | 32.5 |
| ImVoxelNet | 43.7 (더 쉬운 10개 범주에서 측정) |
| Implicit3D | 24.1 |
| Total3DUnderstanding | 14.3 |

Gemini 2.0의 3D detection은 기존 expert 모델과 비슷하고, Gemini Robotics-ER은 SUN-RGBD에서 새 state-of-the-art다. baseline은 닫힌 범주 집합에서 동작하지만 Gemini는 open-vocabulary 질의를 받는다.

### 4.3 zero-shot과 few-shot 로봇 제어

| 모델 | 컨텍스트 | 평균 | Banana Lift | Banana in Bowl | Mug on Plate | Bowl on Rack | Banana Handover | Fruit Bowl | Pack Toy |
|---|---|---|---|---|---|---|---|---|---|
| Gemini 2.0 Flash | zero-shot | 27 | 34 | 54 | 46 | 24 | 26 | 4 | 0 |
| Gemini Robotics-ER | zero-shot | 53 | 86 | 84 | 72 | 60 | 54 | 16 | 0 |
| Gemini 2.0 Flash | ICL | 51 | 94 | 90 | 36 | 16 | 94 | 0 | 26 |
| Gemini Robotics-ER | ICL | 65 | 96 | 96 | 74 | 36 | 96 | 4 | 54 |

ALOHA 2 시뮬레이션 성공률(%)이며 무작위 초기 조건으로 50회 시도한 평균이다. task는 바나나 20cm 들어올리기 같은 단순 grasping부터 장난감을 상자에 넣고 양팔로 뚜껑을 닫는 Pack Toy 같은 long-horizon 다단계 manipulation까지다. zero-shot에서 Gemini 2.0 Flash는 평균 27%(쉬운 task는 최대 54%), Gemini Robotics-ER은 거의 두 배인 53%다. 즉 embodied reasoning 강화가 downstream 로봇 task에 직접 이득을 준다. ICL(시연 10개)에서는 Flash가 51%, Gemini Robotics-ER이 65%다. 개선의 대부분은 handover, packing처럼 dexterous한 task에서 나오며, 시연이 더 정밀한 양팔 trajectory를 내도록 조건화하기 때문이다.

| 컨텍스트 | 평균 | Banana Handover | Fold Dress | Wiping |
|---|---|---|---|---|
| zero-shot | 25 | 30 | 0 | 44 |
| ICL | 65 | 70 | 56 | 67 |

실제 ALOHA 2에서 Gemini Robotics-ER의 성공률(%)이다. Banana Handover는 10회, Fold Dress와 Wiping은 9회 시도 평균이다. 실제 handover 성공률은 캘리브레이션 오차와 잡음 때문에 시뮬레이션보다 낮다. 드레스 접기는 zero-shot으로 0%인데, 충분히 정밀한 grasping을 생성하지 못해서다. ICL을 쓰면 56%로 오른다.

이 실험은 Gemini 2.0 Flash와 Gemini Robotics-ER이 perception 모듈(object detection), planning 모듈(trajectory 생성), 코드 생성과 실행을 통한 오케스트레이션으로 로봇을 직접 제어할 수 있음을 보인다. 동시에 VLM으로서의 한계도 드러난다. 모델의 embodied reasoning을 로봇 action에 연결하는 중간 단계 때문에 dexterous task에는 본질적 제약이 있다.

### 4.4 Gemini Robotics의 out-of-the-box 성능

Fig. 16에 따르면 Gemini Robotics는 20개 task 중 절반에서 80%를 넘는 성공률을 낸다. close laptop, fold pants, pour pulses, stack measuring cup은 100%이고, fold pink cloth, pick shoelace, place grater compartment는 90%, open pink folder, ornaments on table, wrap headphone wires는 80%다. 변형 물체 조작("fold pink cloth", "wrap the wire around the headphone")에서 특히 뛰어나며 baseline은 이 task에서 낮다. 어려운 task("open pink folder", "insert red block", "wrap the wire around the headphone")에서는 Gemini Robotics만 0이 아닌 성공률을 낸다. 이는 고용량 아키텍처와 vision, language, action 전 modality의 고품질 다양 데이터가 multi-task policy 학습에 필수임을 시사한다. 반면 "insert shoe lace"와 "hang loofah"는 모든 모델이 0%로, 가장 dexterous한 task는 multi-task 설정만으로 배우기 어렵다.

### 4.5 지시문 추종

| task 유형 (새 물체 장면) | Gemini Robotics | π0 re-implement | Multi-task diffusion |
|---|---|---|---|
| Pick | 0.94 | 0.30 | 0.26 |
| Pick-Place | 0.80 | 0.10 | 0.09 |

강한 steerability는 고품질 다양 데이터와 유능한 vision-language backbone의 조합에서 나온다. Gemini Robotics와 π0 re-implement는 단순 in-distribution 장면에서도 diffusion baseline을 앞서므로 강한 언어 인코더가 필요하다. 새 물체와 세밀한 지시문("Place the toothpaste in the bottom compartment of the caddy")이 있는 어려운 장면에서는 Gemini Robotics가 두 baseline보다 훨씬 낫다. PaliGemma 기반 π0 re-implement는 학습에서 본 물체에는 접근하지만 "top black container", "blue clip" 같은 서술 속성 해석에 어려움을 겪고 새 물체와 새 언어 서술 task에 실패한다.

### 4.6 generalization 분해

progress score(0~1) 기준 결과다.

| 항목 | 세부 | Gemini Robotics | π0 re-implement | Multi-task diffusion |
|---|---|---|---|---|
| Instruction | in-distribution 평균 | 0.88 | 0.33 | 0.55 |
| Instruction | out-of-distribution 평균 | 0.65 | 0.32 | 0.34 |
| Instruction | Rephrasing | 0.79 | 0.50 | 0.61 |
| Instruction | Typo | 0.54 | 0.44 | 0.36 |
| Instruction | New language | 0.68 | 0.04 | 0.12 |
| Instruction | Descriptive | 0.61 | 0.25 | 0.25 |
| Visual | in-distribution 평균 | 0.88 | 0.33 | 0.55 |
| Visual | out-of-distribution 평균 | 0.75 | 0.36 | 0.34 |
| Visual | Distractors | 0.77 | 0.50 | 0.29 |
| Visual | New background | 0.75 | 0.32 | 0.29 |
| Visual | Lighting | 0.71 | 0.14 | 0.46 |
| Action | in-distribution 평균 | 0.69 | 0.31 | 0.32 |
| Action | out-of-distribution 평균 | 0.60 | 0.11 | 0.26 |
| Action | New object instance | 0.39 | 0.04 | 0.21 |
| Action | Different position | 0.88 | 0.22 | 0.33 |

Gemini Robotics는 세 유형 모두에서 일관되게 baseline을 앞선다. baseline이 거의 실패하는 경우(새 언어 지시문에서 π0 0.04, 대상 물체의 시각 변형)에도 0이 아닌 성능을 낸다. 저자들은 이 개선이 Gemini 2.0의 state-of-the-art vision 인코더를 포함한 더 크고 강한 VLM backbone과 다양한 학습 데이터에서 온다고 추정한다.

### 4.7 long-horizon dexterity specialization

| task | Gemini Robotics specialist | π0 re-implement specialist | Multi-task diffusion specialist | Single-task diffusion |
|---|---|---|---|---|
| Scoop nuts | 1.00 | 0.90 | 0.65 | 0.60 |
| Lunch-box | 1.00 | 0.00 | 0.35 | 0.20 |
| Playing cards | 0.90 | 0.15 | 0.65 | 0.85 |
| Spelling game | 0.83 | 0.00 | 0.08 | 0.00 |
| Place peas | 0.55 | 0.40 | 0.20 | 0.75 |
| Origami | 0.45 | 0.00 | 0.05 | 0.00 |

specialist 모델은 여섯 task를 평균 79% 성공률로 푼다. 2분 이상 걸리는 도시락 싸기 전체를 100% 성공한다. spelling game에서는 specialization 데이터에 있는 인쇄 이미지를 읽고 철자하며, 학습에 없던 손그림 6개 중 4개도 맞힌다. baseline은 어느 것도 이미지를 일관되게 인식하고 철자하지 못한다. 쉬운 dexterous task에서는 처음부터 학습한 single-task diffusion이 경쟁력 있으며 이는 발표된 최고 결과(ALOHA Unleashed)와 일치한다. 그러나 spelling game, origami, lunch-box에서는 single-task diffusion이 낮은데, long-horizon 성격 때문으로 보인다. 같은 데이터로 fine-tuning한 Multi-task diffusion과 π0 re-implement도 Gemini Robotics에 못 미친다. 이 차이의 핵심은 훨씬 강한 Gemini 기반 backbone이며, 어려운 task의 specialization 성공이 generalist 모델의 강함과 높은 상관을 가진다는 뜻이다.

3절 체크포인트 없이 specialization 데이터만으로 처음부터 학습한 Gemini Robotics specialist는 어느 task도 풀지 못했다(전부 0%, Fig. 23에는 미포함). 따라서 고용량 아키텍처뿐 아니라 다양한 로봇 action 데이터에서 배운 표현, 즉 물리 상식이 long-horizon dexterous task specialization의 또 다른 핵심 요소다.

부록 Fig. 42의 progress score에서는 spelling game을 제외한 모든 task에서 모든 방법이 0이 아닌 진전을 보이지만, Place peas의 single-task diffusion을 빼면 Gemini Robotics가 거의 모든 task에서 앞선다.

### 4.8 reasoning-enhanced generalization

| 범주 | task | Reasoning-enhanced specialist | Vanilla Gemini Robotics |
|---|---|---|---|
| One-step Reasoning | Matching Pile | 0.79 | 0.29 |
| One-step Reasoning | Same Color | 0.60 | 0.27 |
| One-step Reasoning | Correct Item | 0.50 | 0.20 |
| Semantics | Full Bowl | 0.80 | 0.50 |
| Semantics | Find Sushi | 0.73 | 0.45 |
| Spatial Understanding | Bottom Left | 1.00 | 0.80 |
| Spatial Understanding | Top Left | 1.00 | 0.40 |
| Spatial Understanding | Smallest Soda | 0.40 | 0.30 |

vanilla 모델도 어느 정도 동작하지만, reasoning-enhanced 버전은 one-step 추론이나 planning, 의미 지식, 공간 이해가 필요한 out-of-distribution 시나리오에서 성공률을 크게 올린다. 새 상황에 스킬을 배치하는 능력 외에 해석 가능성도 높아진다. 모델이 Gemini Robotics-ER의 사람이 읽을 수 있는 embodied reasoning 흔적과 닮은 중간 단계를 출력하기 때문이다. Fig. 25는 내부 chain-of-thought의 일부로 쓰이는 keypoint trajectory(왼팔 빨강, 오른팔 파랑, 다음 1초)를 시각화한다.

### 4.9 fast adaptation

8개 task 중 7개에서 최대 100개 시연으로 70% 이상 성공률에 도달했고, 두 task(Put container in lunch-box, Pour lettuce)에서는 100%다. baseline은 쉬운 task에서 경쟁력이 있다. "Pour lettuce"는 baseline이 더 효율적으로 배우고, "Salad dressing"과 "Draw card"에서는 π0 re-implement가 약간 더 높다. 그러나 "Origami fox first fold"와 lunch-box task처럼 어려운 task에서는 시연이 적을 때 baseline이 낮다. 이는 풍부하고 다양한 로봇 action 데이터를 물리 상호작용의 세밀한 이해로 바꾸는 강한 VLM backbone이 새 task의 빠른 학습에 핵심이라는 또 하나의 근거다.

부록 Fig. 41은 π0 openpi 공개 체크포인트를 baseline에 추가한 결과로, 8개 중 5개 task에서 re-implement와 일치하고 나머지 3개에서는 re-implement가 더 낫다.

### 4.10 새 embodiment 적응

fine-tuning 후 in-distribution task에서 Gemini Robotics의 성공률은 state-of-the-art single-task diffusion policy와 같거나 약간 높다. bi-arm Franka에 적응한 모델은 4개 task 전부를 평균 63% 성공률로 푼다.

| 항목 | 세부 | Gemini Robotics | Single-task diffusion |
|---|---|---|---|
| Visual | in-distribution 평균 | 0.74 | 0.71 |
| Visual | out-of-distribution 평균 | 0.50 | 0.22 |
| Visual | Distractors | 0.42 | 0.17 |
| Visual | New background | 0.51 | 0.22 |
| Visual | Lighting | 0.62 | 0.34 |
| Action | in-distribution 평균 | 0.74 | 0.71 |
| Action | out-of-distribution 평균 | 0.44 | 0.21 |
| Action | New object instance | 0.47 | 0.20 |
| Action | Different position | 0.42 | 0.22 |

progress score 기준이다(success rate는 부록 Fig. 47). in-distribution에서는 두 모델이 비슷하지만 out-of-distribution에서는 Gemini Robotics가 두 배 이상이다. 새 embodiment로 fine-tuning한 뒤에도 견고성과 generalization 능력이 embodiment를 넘어 전이된다는 뜻이다.

### 4.11 안전 평가

| 벤치마크 | Gemini 2.0 Flash | Gemini Robotics-ER | + Constitution | ER + Adversarial | ER + Constitution + Adversarial |
|---|---|---|---|---|---|
| ASIMOV-Multimodal (VQA) | 0.86 | 0.85 | 0.88 | 0.28 | 0.76 |
| ASIMOV-Injury (VQA) | 0.84 | 0.82 | 0.88 | 해당 없음 | 해당 없음 |

alignment 정확도다. Gemini 2.0 Flash와 Gemini Robotics-ER은 비슷하게 동작하며, 시각 장면과 실세계 부상 기록 시나리오 모두에서 물리 안전에 대한 강한 의미 이해를 보인다. constitution을 쓰면 0.88로 오른다. adversarial 프롬프트는 ASIMOV-Multimodal에서 정확도를 0.28까지 떨어뜨리지만, constitution과 post-training을 결합하면 0.76으로 회복된다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- Gemini 2.0과 Gemini Robotics-ER의 embodied reasoning에는 개선 여지가 있다. 긴 비디오에 걸친 공간 관계 grounding에 어려움을 겪을 수 있고, point와 box 같은 수치 예측이 세밀한 로봇 제어에는 충분히 정밀하지 않을 수 있다.
- Gemini Robotics-ER은 zero-shot으로 드레스 접기를 수행하지 못한다(0%). 충분히 정밀한 grasping 생성이 안 되기 때문이다. VLM 기반 제어는 embodied reasoning을 action에 연결하는 중간 단계 때문에 dexterous task에 본질적 제약이 있다.
- Gemini Robotics의 multi-task 학습만으로는 가장 dexterous한 task("insert shoe lace", "hang loofah")를 배우지 못했다. specialization 후에도 origami는 45%, Place peas는 55%에 그친다.
- 새 embodiment 적응은 예비 실험이며, 여전히 대상 플랫폼 데이터로 fine-tuning이 필요하다.
- 향후 과제 첫째는 다단계 추론과 정밀한 dexterous 동작을 동시에 요구하는 복잡한 시나리오, 특히 새 상황에서의 처리다. 추상 추론과 정밀 실행을 매끄럽게 통합하는 기법을 개발한다.
- 둘째는 시뮬레이션 활용이다. 시각적으로 다양하고 접촉이 많은 데이터를 시뮬레이션으로 만들고, 그 데이터로 실세계에 전이하는 더 강한 VLA를 만드는 기법을 개발한다(Lin et al., 2025).
- 셋째는 multi-embodiment 실험의 확장이다. 새 로봇 유형에 적응하는 데 필요한 데이터를 줄이고 궁극적으로 zero-shot cross-embodiment 전이를 달성한다.
- 안전 측면에서는 물리 action safety를 담당하는 저수준 제어기와의 인터페이스, semantic action safety의 전수 열거 불가능성, 사회적 영향의 선제적 모니터링이 계속되는 과제다.

## 6. 관련 연구 (Related Work)

- π0 (Black et al., 2024): PaliGemma VLM과 diffusion Transformer action expert로 구성된 open-weights VLA. 이 논문의 주된 baseline이며, 저자들이 자체 데이터 혼합으로 재구현해 공개 체크포인트보다 나은 성능을 얻었다.
- ALOHA 2와 ALOHA Unleashed (Team et al., 2024; Zhao et al., 2025): 데이터 수집 플랫폼과 diffusion policy baseline의 출처. Multi-task diffusion과 Single-task diffusion baseline은 ALOHA Unleashed 구조를 따른다.
- Diffusion Policy (Chi et al., 2024): multi-task diffusion baseline의 기반.
- action chunking (Zhao et al., 2023): 한 번의 추론으로 여러 action을 내는 기법. 50Hz 유효 control frequency의 근거다.
- Code as Policies, SayCan, PromptBook (Liang et al., 2023; Ahn et al., 2022; Arenas et al., 2023): zero-shot 코드 생성 제어의 선행 연구. 이전에는 여러 모델을 조합해야 했다.
- Di Palo and Johns (2024), Keypoint Action Tokens: in-context learning으로 로봇을 제어하는 방법. 이 논문은 외부 keypoint 추출기 없이 Gemini Robotics-ER이 직접 물체와 end-effector pose를 뽑도록 확장했다.
- RT-2와 OpenVLA (Brohan et al., 2023; Kim et al., 2025): VLA가 시각 견고성은 얻지만 추상 추론을 동작 generalization에 옮기는 데는 어려움이 있다는 문제의식의 출처.
- ECoT 계열 (Zawalski et al., 2024; Gu et al., 2023; Li et al., 2025; Vecerik et al., 2024; Wen et al., 2024): embodied chain-of-thought로 해석 가능한 중간 단계를 내는 선행 연구.
- Molmo (Deitke et al., 2024): pointing 전용 VLM. Pixmo-Point 벤치마크의 출처이기도 하다.
- SUN-RGBD와 expert 모델 (Song et al., 2015; ImVoxelNet, Implicit3D, Total3DUnderstanding): 3D detection 비교 대상.
- Gao et al. (2025), A taxonomy for evaluating generalist robot policies: visual, instruction, action 세 유형의 generalization 분류 출처.
- Constitutional AI (Bai et al., 2022; Ahn et al., 2024; Huang et al., 2024; Kundu et al., 2023): semantic action safety 완화에 쓴 constitution 방식의 출처. ASIMOV 데이터셋 논문(Sermanet et al., 2025a,b)이 동시 공개다.

## 7. 용어집 (Glossary)

- Gemini Robotics-ER: Gemini 2.0 Flash에 embodied reasoning을 강화한 VLM. 로봇 action 데이터 없이 perception, planning, 코드 생성 모듈로 쓰인다.
- Gemini Robotics: Gemini Robotics-ER 위에 로봇 action 데이터를 통합해 만든 VLA. 클라우드 backbone과 온보드 decoder로 나뉜다.
- embodied reasoning (ER): VLM이 물체와 공간 개념을 실세계에 grounding하고 그 신호를 downstream robotics 응용에 합성하는 능력.
- ERQA: Embodied Reasoning Question Answering. 객관식 VQA 400문항의 공개 벤치마크.
- Gemini Robotics backbone: Gemini Robotics-ER을 distillation해 만든 클라우드 VLA backbone. 질의 응답 지연 160ms 미만.
- Gemini Robotics decoder: 로봇 온보드에서 backbone 지연을 상쇄하는 local action decoder.
- progress score: task 완수 비율을 0~1로 나타내는 연속 지표. 이진 success rate를 보완한다.
- A/B testing (평가 절차): 대상 모델들을 무작위 순서로 번갈아 시도해 환경 요인과 운영자 편향을 줄이는 절차. pairwise t-test로 검정한다.
- π0 re-implement: 저자들이 자체 인프라와 데이터 혼합으로 재구현한 π0. 공개 openpi 체크포인트보다 성능이 높다.
- specialization: generalist 체크포인트를 좁은 고품질 데이터로 fine-tuning해 long-horizon dexterous task나 새 embodiment에 특화하는 선택적 단계.
- reasoning-enhanced Gemini Robotics: trajectory 이해와 생성에 맞게 재라벨링한 action 데이터로 fine-tuning해 embodied reasoning을 action에 연결한 변형.
- content safety: 유해 대화 콘텐츠를 막는 안전 층. pointing 같은 새 출력 modality에는 추가 지도 fine-tuning을 적용했다.
- semantic action safety: 열린 도메인에서 물리 안전 제약(뜨거운 스토브 위 장난감 금지 등)을 지키는 능력.
- ASIMOV 데이터셋: semantic action safety를 평가하고 개선하는 시각 QA(ASIMOV-Multimodal)와 부상 기록 기반 텍스트 QA(ASIMOV-Injury).
- constitution: 데이터 기반으로 생성한 안전 원칙 집합. 프롬프트에 실어 safety alignment를 높인다.
- top-down grasp: y, x 좌표와 회전각 θ로 표현하는 위에서 내려다본 grasping pose.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | "Gemini Robotics 계열 개요" | caption-region | ★ wiki 권장 (overview) |
| fig02 | 3 | "Gemini 2.0 Flash의 embodied reasoning 예시" | caption-region | ★ wiki 권장 (ER capabilities) |
| fig03 | 4 | "ERQA 벤치마크 예시 문항" | caption-region | 아카이브 |
| fig04 | 4 | "ERQA 400문항의 범주 분포" | caption-region | 아카이브 |
| fig05 | 6 | "Gemini 2.0 Pro Experimental의 chain-of-thought 추론 흔적 두 예시" | caption-region | 아카이브 |
| fig06 | 7 | "Gemini 2.0 Flash의 2D detection 예시" | caption-region | 아카이브 |
| fig07 | 7 | "자연어 질의에서 2D point를 예측하는 예시" | caption-region | 아카이브 |
| fig08 | 8 | "시작점과 끝점을 먼저 예측해 2D trajectory를 만드는 예시" | caption-region | 아카이브 |
| fig09 | 9 | "Gemini Robotics-ER의 top-down grasp 예측 예시" | caption-region | 아카이브 |
| fig10 | 10 | "서로 다른 뷰의 2D point를 대응시키는 multi-view correspondence 예시" | caption-region | 아카이브 |
| fig11 | 10 | "단안 이미지에서 open-vocabulary 3D bounding box를 직접 예측하는 예시" | caption-region | 아카이브 |
| fig12 | 11 | "zero-shot 제어를 위한 perception API와 control API, episode 안의 agentic 오케스트레이션 개요" | caption-region | ★ wiki 권장 (zero-shot method) |
| fig13 | 13 | "few-shot in-context learning 파이프라인 개요" | caption-region | ★ wiki 권장 (ICL method) |
| fig14 | 14 | "Gemini Robotics 모델의 아키텍처와 입출력 개요" | caption-region | ★ wiki 권장 (architecture) |
| fig15 | 15 | "어수선한 환경에서 dexterous manipulation이 필요한 예시 task의 로봇 동작" | caption-region | 아카이브 |
| fig16 | 16 | "데이터셋에서 뽑은 20개 task의 out-of-the-box 성공률" | manual | ★ wiki 권장 (result) |
| fig17 | 17 | "학습에 없던 어수선한 장면에서의 지시문 추종" | caption-region | 아카이브 |
| fig18 | 18 | "visual generalization 평가용 task 예시" | caption-region | 아카이브 |
| fig19 | 18 | "instruction generalization 평가용 task 예시" | caption-region | 아카이브 |
| fig20 | 18 | "action generalization 평가용 task 예시" | caption-region | 아카이브 |
| fig21 | 19 | "Gemini Robotics의 generalization 분해 결과(progress score)" | caption-region | ★ wiki 권장 (generalization result) |
| fig22 | 20 | "ALOHA에서 수행한 long-horizon dexterous task 여섯 개" | caption-region | 아카이브 |
| fig23 | 21 | "specialization 후 long-horizon dexterous task 성공률" | caption-region | ★ wiki 권장 (specialization result) |
| fig24 | 23 | "embodied reasoning이 필요한 실제 로봇 task에서 reasoning-enhanced specialist와 vanilla Gemini Robotics의 성공률 비교" | caption-region | ★ wiki 권장 (reasoning result) |
| fig25 | 23 | "reasoning-enhanced Gemini Robotics의 내부 chain-of-thought에 쓰이는 예측 trajectory 시각화" | caption-region | 아카이브 |
| fig26 | 24 | "시연 데이터 수에 따른 fast adaptation 성공률" | caption-region | ★ wiki 권장 (fast adaptation) |
| fig27 | 25 | "Gemini Robotics를 다른 로봇에 fine-tuning한 예시" | caption-region | ★ wiki 권장 (new embodiment) |
| fig28 | 26 | "bi-arm Franka로 적응한 Gemini Robotics의 generalization 분해(progress score)" | caption-region | 아카이브 |
| fig29 | 27 | "constitution과 safety post-training을 통한 안전 벤치마킹과 완화" | caption-region | ★ wiki 권장 (safety) |
| fig30 | 40 | "ALOHA 2 시뮬레이션 task 환경" | caption-region | 아카이브 |
| fig31 | 40 | "실제 ALOHA 2 task 환경" | caption-region | 아카이브 |
| fig32 | 44 | "zero-shot 로봇 제어 중 Gemini가 출력한 planning 예시" | caption-region | 아카이브 |
| fig33 | 45 | "zero-shot 로봇 제어 중 Gemini가 출력한 grasping과 lifting 코드, 로봇 상태, 분석 예시" | caption-region | 아카이브 |
| fig34 | 46 | "zero-shot 로봇 제어 중 오류 감지와 재시도 예시" | caption-region | 아카이브 |
| fig35 | 48 | "out-of-the-box 평가(Fig" | caption-region | 아카이브 |
| fig36 | 49 | "지시문 추종 분석(3.3절)에 쓴 5개 장면과 25개 지시문" | caption-region | 아카이브 |
| fig37 | 50 | "instruction generalization 평가에 쓴 초기 장면과 지시문 변형 예시" | caption-region | 아카이브 |
| fig38 | 51 | "visual generalization 평가에 쓴 초기 장면과 지시문 예시" | caption-region | 아카이브 |
| fig39 | 52 | "action generalization 평가에 쓴 초기 장면과 지시문 예시" | caption-region | 아카이브 |
| fig40 | 53 | "Gemini Robotics의 generalization 분해 결과(success rate)" | caption-region | 아카이브 |
| fig41 | 54 | "π0 openpi 공개 체크포인트를 baseline에 추가한 fast adaptation 결과" | caption-region | 아카이브 |
| fig42 | 55 | "specialization 후 long-horizon dexterous task의 평균 progress score" | caption-region | 아카이브 |
| fig43 | 58 | "fast adaptation 실험 task 8개" | caption-region | 아카이브 |
| fig44 | 60 | "bi-arm Franka 로봇의 4개 task rollout" | caption-region | 아카이브 |
| fig45 | 62 | "bi-arm Franka 적응 모델의 visual generalization 평가 task 예시" | caption-region | 아카이브 |
| fig46 | 63 | "bi-arm Franka 적응 모델의 action generalization 평가 task 예시" | caption-region | 아카이브 |
| fig47 | 64 | "bi-arm Franka 적응 모델의 generalization 분해(success rate)" | caption-region | 아카이브 |
| tab01 | 5 | "ERQA, RealworldQA, BLINK에서의 VLM 비교" | manual | ★ wiki 권장 (ERQA result) |
| tab02 | 5 | "ERQA에서 chain-of-thought 프롬프트 유무에 따른 정확도" | table-region | 아카이브 |
| tab03 | 8 | "2D pointing 벤치마크(Paco-LVIS, Pixmo-Point, Where2Place) 정확도" | manual | ★ wiki 권장 (pointing result) |
| tab04 | 10 | "SUN-RGBD 3D object detection(AP@15)" | manual | 아카이브 |
| tab05 | 12 | "ALOHA 2 시뮬레이션 task 성공률" | manual | ★ wiki 권장 (zero/few-shot result) |
| tab06 | 12 | "실제 ALOHA 2 task에서 Gemini Robotics-ER의 성공률" | table-region | 아카이브 |
| tab07 | 39 | "Gemini Robotics 모델 카드" | table-region | 아카이브 |
