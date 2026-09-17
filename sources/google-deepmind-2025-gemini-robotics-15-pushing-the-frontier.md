---
title: "Gemini Robotics 1.5: Pushing the Frontier of Generalist Robots with Advanced Embodied Reasoning, Thinking, and Motion Transfer"
type: paper
year: 2025
category: physical-ai
raw_path: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier.pdf
raw_filename: "google-deepmind-2025-gemini-robotics-15-pushing-the-frontier.pdf"
source_collection: external
authors: "Gemini Robotics Team, Google DeepMind"
arxiv_id: "2510.03342"
url: "https://arxiv.org/abs/2510.03342"
tags: [physical-ai, vla, robot-learning, safety]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig01.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig01.png
    caption: "Gemini Robotics 1.5 모델 가족 개요. 위쪽 Gemini Robotics-ER 1.5는 음성, 텍스트, 이미지를 받아 ER thinking trace를 거쳐 2D pointing, trajectory 예측, 상태 추정, segmentation mask, 물체 검출, task progress 예측 같은 텍스트 출력을 내고 검색, 코드 실행, function calling 도구를 부른다. 아래쪽 Gemini Robotics 1.5는 proprioception과 이미지와 지시문을 받아 다음 단계와 motion description으로 이뤄진 VLA thinking trace를 거쳐 ALOHA 2, Bi-arm Franka, Apptronik Apollo 세 로봇의 action을 낸다"
    page: 2
    bbox_norm: [0.0942, 0.0935, 0.9058, 0.4354]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig02.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig02.png
    caption: "checkpoint 하나로 ALOHA, Bi-arm Franka, Apollo humanoid 세 로봇이 여러 과제를 수행하는 사진 모음"
    page: 5
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3221]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig03.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig03.png
    caption: "로봇별 일반화 성능 분해. ALOHA(위), Bi-arm Franka(가운데), Apollo humanoid(아래)에서 in-distribution, instruction, action, visual, task generalization 다섯 항목의 progress score를 GR 1.5, Gemini Robotics, Gemini Robotics On-Device로 비교한 막대 그래프"
    page: 6
    bbox_norm: [0.2075, 0.1168, 0.784, 0.6951]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig04.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig04.png
    caption: "데이터와 학습 레시피 ablation. 세 로봇에서 GR 1.5, Motion Transfer 없는 multi-embodiment 학습, Motion Transfer 없는 single-embodiment 학습의 progress score를 다섯 일반화 항목별로 비교한 막대 그래프"
    page: 7
    bbox_norm: [0.2204, 0.0955, 0.7726, 0.6773]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig05.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig05.png
    caption: "cross-embodiment 벤치마크. 왼쪽은 세 로봇에서 다른 로봇으로만 수집된 과제의 progress score(위)와 성공률(아래)을 다섯 모델로 비교한 그래프, 오른쪽은 Bi-arm Franka에서 ALOHA로 옮긴 테이프 떼기, ALOHA에서 Franka로 옮긴 배 모양 정리함 닫기, ALOHA에서 Apollo로 옮긴 옷장 문 열기 사례 사진"
    page: 8
    bbox_norm: [0.0947, 0.0939, 1.0, 0.4048]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig06.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig06.png
    caption: "multi-step 벤치마크에서 thinking을 켠 경우와 끈 경우의 progress score 비교. ALOHA 0.55 대 0.26, Bi-arm Franka 0.60 대 0.55, humanoid 0.67 대 0.51"
    page: 9
    bbox_norm: [0.3094, 0.3204, 0.6855, 0.5453]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig07.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig07.png
    caption: "Thinking VLA rollout 예시. Apollo humanoid가 물건을 흰 가방에 넣는 아홉 장면 위에 다음 단계와 motion description thinking trace가 겹쳐 있다. 위쪽 행은 공을 잡은 뒤 목표가 자동으로 바뀌는 implicit success detection, 아래쪽 행은 물병을 떨어뜨린 뒤 왼손으로 다시 집는 error recovery를 보여준다"
    page: 10
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.5419]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig08.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig08.png
    caption: "generality(x축, MMMU와 GPQA와 Aider Polyglot 평균)와 embodied reasoning 점수(y축)의 산점도. GR-ER 1.5 Thinking On이 ER 점수 59.6으로 가장 높고 Gemini 2.5 Pro, GPT-5, Gemini 2.5 Flash, GPT-5-mini, GR-ER이 그 아래에 있다"
    page: 11
    bbox_norm: [0.1999, 0.0909, 0.7901, 0.3371]
    strategy: manual
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig09.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig09.png
    caption: "GR-ER 1.5의 능력 모음. 물체 검출과 상태 추정, segmentation mask, pointing, trajectory 예측, progress understanding을 이미지와 영상 예시로 보여준다"
    page: 12
    bbox_norm: [0.0814, 0.0563, 0.9289, 0.3979]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig10.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig10.png
    caption: "2D pointing과 point 기반 추론 벤치마크 5종 성능. average, spatial, steerable pointing과 point-to-count 네 범주에서 GR-ER 1.5가 GR-ER, Gemini 2.5 Pro, Gemini 2.5 Flash, GPT-5, GPT-5-mini보다 높다"
    page: 12
    bbox_norm: [0.1249, 0.4699, 0.8451, 0.7761]
    strategy: manual
    curated: true
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig11.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig11.png
    caption: "복잡한 pointing 예시 여섯 장. 충돌 없는 경로, 물이 흐르는 방향, 10파운드 payload로 들 수 있는 물체, 그릇 가장자리, 양말 짝 맞추기, 빈 콘센트를 가리킨다"
    page: 13
    bbox_norm: [0.1342, 0.0939, 0.8658, 0.4857]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig12.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig12.png
    caption: "GR-ER 1.5의 progress understanding 세 형태. 위쪽은 과제 완료 비율 예측, 왼쪽 아래는 카메라 4대를 함께 봐야 하는 multi-view success detection, 오른쪽 아래는 뒤섞인 영상 프레임의 순서 복원"
    page: 14
    bbox_norm: [0.0779, 0.0939, 0.9054, 0.4088]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig13.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig13.png
    caption: "success detection 4가지 설정(real-time과 offline, multiview와 singleview)의 정확도. GR-ER 1.5가 real-time 두 설정에서 가장 높고 offline 설정에서는 GPT-5와 비슷하다"
    page: 14
    bbox_norm: [0.0947, 0.5056, 0.9053, 0.7461]
    strategy: caption-region
    curated: true
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig14.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig14.png
    caption: "(a) 재고 선반 이미지를 표로 파싱해 HTML 페이지로 보여주는 검사 과제 예시. (b) 초기 테스터의 실제 사용 사례 데이터 분포에서의 점수. GR-ER 1.5가 41.0으로 가장 높다"
    page: 15
    bbox_norm: [0.0947, 0.0946, 0.9006, 0.2783]
    strategy: caption-region
    curated: false
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig15.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig15.png
    caption: "GR-ER 1.5의 thinking trace 예시 두 건. 온도계 눈금 읽기와 양말 짝 맞추기에서 모델의 생각과 최종 응답을 나란히 보여준다"
    page: 16
    bbox_norm: [0.0947, 0.0939, 0.9058, 0.4885]
    strategy: caption-region
    curated: false
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig16.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig16.png
    caption: "thinking 예산에 따른 성능 곡선 세 개. 왼쪽은 thinking 토큰 예산이 늘수록 평균, 이미지 QA, 영상 QA, pointing 점수가 오르는 곡선, 가운데는 같은 예산에서 과제 유형별로 실제 쓰는 출력 토큰 수, 오른쪽은 GR-ER 1.5(58.2에서 64.9로 6.6%p 상승)와 Gemini 2.5 Flash(54.5에서 57.1로 2.7%p 상승)의 inference-time compute 스케일링 비교"
    page: 17
    bbox_norm: [0.0999, 0.0909, 0.9001, 0.2541]
    strategy: manual
    curated: true
  - id: fig17
    label: Figure 17
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig17.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig17.png
    caption: "long-horizon 평가. ALOHA(위, Blocks in Drawer, Desk Organization, Sort Trash, Pack Suitcase)와 Bi-arm Franka(아래, Top shelf to the table, Nut allergy, Swap, Mushroom risotto) 8개 과제에서 GR-ER 1.5와 GR 1.5 agent, Gemini 2.5 Flash와 GR 1.5 agent, GR 1.5 Thinking on의 progress score를 비교한 막대 그래프와 과제 사진"
    page: 18
    bbox_norm: [0.1699, 0.2117, 0.8262, 0.7364]
    strategy: caption-region
    curated: true
  - id: fig18
    label: Figure 18
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig18.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig18.png
    caption: "ASIMOV-2.0 물리 안전 벤치마크 예시. (a) 텍스트 시나리오에서 잠재 위험과 심각도와 action 효과를 묻는 Injury, (b) embodiment별 안전 지시를 지키는 pointing을 묻는 Constraints, (c) AI 생성 영상에서 개입 가능한 마지막 시점을 묻는 Video"
    page: 20
    bbox_norm: [0.0934, 0.345, 0.9068, 0.7549]
    strategy: caption-region
    curated: false
  - id: fig19
    label: Figure 19
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig19.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig19.png
    caption: "ASIMOV-2.0 안전 평가. (a) 위험 인식(텍스트와 영상), action 안전, 개입 예측 정확도에서 GR-ER 1.5가 GR-ER보다 높다. (b) 물리 안전 제약 준수에서 safety thinking으로 fine-tuning한 GR-ER 1.5가 68.4로 가장 높다"
    page: 21
    bbox_norm: [0.1342, 0.0939, 0.8658, 0.3385]
    strategy: caption-region
    curated: true
  - id: fig20
    label: Figure 20
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig20.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig20.png
    caption: "auto-red-teaming이 ER 모델의 환각을 찾아낸 사례. 공격자가 장면에 없는 소금과 식초 맛 감자칩을 가리키라고 요구하자 모델이 존재하지 않는 대상을 가리켰고, autorater가 이를 실패로 판정한 근거를 적었다"
    page: 21
    bbox_norm: [0.154, 0.5639, 0.846, 0.7128]
    strategy: caption-region
    curated: false
  - id: fig21
    label: Figure 21
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig21.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig21.png
    caption: "시뮬레이션과 실제 로봇의 성공률 rank consistency. 과제 7종의 A/B 테스트 쌍이 대각선 방향으로 늘어서 있어 시뮬레이션 순위가 실제 순위와 일치함을 보여준다"
    page: 32
    bbox_norm: [0.2876, 0.3003, 0.705, 0.5424]
    strategy: caption-region
    curated: false
  - id: fig22
    label: Figure 22
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig22.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig22.png
    caption: "확장된 action generalization 벤치마크 5개 과제 사진(가방에 정육면체 넣기, 양팔로 포도와 빵 집기, Knopper 과자 넣기, 음료를 테이블 앞으로 밀기, 빨대 꺼내기)"
    page: 33
    bbox_norm: [0.0437, 0.15, 0.9591, 0.4129]
    strategy: caption-region
    curated: false
  - id: fig23
    label: Figure 23
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig23.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig23.png
    caption: "task generalization 과제 10종 실행 사진(병을 옷장 하단 선반에 넣기, 모자를 고리에 걸기, 매화를 꽃병에 꽂기, 도장 찍기, 천으로 닦기 등)"
    page: 34
    bbox_norm: [0.0681, 0.0922, 0.9408, 0.5209]
    strategy: caption-region
    curated: false
  - id: fig24
    label: Figure 24
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig24.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig24.png
    caption: "Bi-arm Franka 일반화 벤치마크의 세 장면. 왼쪽은 공구를 걸고 떼는 workbench, 가운데는 컴퓨터와 케이블 장면, 오른쪽은 NIST Assembly Task Board 2"
    page: 35
    bbox_norm: [0.091, 0.1366, 0.9078, 0.6611]
    strategy: caption-region
    curated: false
  - id: fig25
    label: Figure 25
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig25.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig25.png
    caption: "Bi-arm Franka 플랫폼에서 일반화 항목별 성능 측정에 쓴 장면 변형 예시"
    page: 36
    bbox_norm: [0.0942, 0.1224, 0.9054, 0.4498]
    strategy: caption-region
    curated: false
  - id: fig26
    label: Figure 26
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig26.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig26.png
    caption: "Apollo humanoid 플랫폼에서 일반화 항목별 성능 측정에 쓴 장면 변형 예시"
    page: 40
    bbox_norm: [0.0938, 0.1366, 0.9082, 0.6179]
    strategy: caption-region
    curated: false
  - id: fig27
    label: Figure 27
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig27.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig27.png
    caption: "humanoid 일반화 정성 예시. 여러 grasp 전략, 다른 높이의 물체 manipulation, 학습에 없던 물체와 용기 조합"
    page: 43
    bbox_norm: [0.0403, 0.1284, 0.9844, 0.5874]
    strategy: caption-region
    curated: false
  - id: fig28
    label: Figure 28
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig28.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig28.png
    caption: "Bi-arm Franka에서 ALOHA로의 cross-embodiment 과제 10종 실행 사진(벽에 테이프와 벨트와 헤드폰 걸기, 브러시 떼기, 마우스를 통에 넣기, USB 케이블 뽑기 등)"
    page: 44
    bbox_norm: [0.0369, 0.0, 0.9672, 0.8043]
    strategy: caption-region
    curated: false
  - id: fig29
    label: Figure 29
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig29.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig29.png
    caption: "ALOHA에서 Bi-arm Franka로의 cross-embodiment 과제 실행 사진"
    page: 46
    bbox_norm: [0.0, 0.111, 0.902, 0.376]
    strategy: caption-region
    curated: false
  - id: fig30
    label: Figure 30
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig30.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig30.png
    caption: "Apollo humanoid에서 Bi-arm Franka로의 cross-embodiment 과제 사진"
    page: 46
    bbox_norm: [0.0, 0.2643, 0.7798, 0.5365]
    strategy: caption-region
    curated: false
  - id: fig31
    label: Figure 31
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig31.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig31.png
    caption: "ALOHA에서 humanoid로의 cross-embodiment 과제 사진"
    page: 46
    bbox_norm: [0.0427, 0.5763, 0.9528, 0.8717]
    strategy: caption-region
    curated: false
  - id: fig32
    label: Figure 32
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig32.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig32.png
    caption: "ALOHA multi-step 벤치마크 과제 8종 사진(색깔별 접시에 과일 놓기, 가방 지퍼 열고 바나나 넣기, 서랍 순서대로 열기, 쓰레기통 뚜껑 열고 공 넣고 닫기 등)"
    page: 48
    bbox_norm: [0.0487, 0.5168, 0.9019, 0.6664]
    strategy: caption-region
    curated: false
  - id: fig33
    label: Figure 33
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig33.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig33.png
    caption: "Bi-arm Franka multi-step 벤치마크 과제 사진"
    page: 50
    bbox_norm: [0.0636, 0.2532, 0.9039, 0.7202]
    strategy: caption-region
    curated: false
  - id: fig34
    label: Figure 34
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig34.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig34.png
    caption: "Apollo humanoid multi-step 벤치마크 과제 사진"
    page: 52
    bbox_norm: [0.0545, 0.3018, 0.9042, 0.6541]
    strategy: caption-region
    curated: false
  - id: fig35
    label: Figure 35
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig35.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig35.png
    caption: "Figure 3과 같은 비교를 성공률로 다시 그린 그래프. GR 1.5, Gemini Robotics, Gemini Robotics On-Device"
    page: 54
    bbox_norm: [0.2075, 0.2143, 0.784, 0.7895]
    strategy: caption-region
    curated: false
  - id: fig36
    label: Figure 36
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig36.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig36.png
    caption: "Figure 4의 데이터와 레시피 ablation을 성공률로 다시 그린 그래프"
    page: 55
    bbox_norm: [0.1681, 0.1302, 0.8235, 0.8217]
    strategy: caption-region
    curated: false
  - id: fig37
    label: Figure 37
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig37.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig37.png
    caption: "multi-step 벤치마크에서 thinking을 켠 경우와 끈 경우의 성공률. ALOHA 0.38 대 0.09, Bi-arm Franka 0.44 대 0.42, humanoid 0.40 대 0.26"
    page: 56
    bbox_norm: [0.3095, 0.1275, 0.6855, 0.3557]
    strategy: caption-region
    curated: false
  - id: fig38
    label: Figure 38
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig38.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig38.png
    caption: "GR-ER 1.5의 추가 thinking 예시. 온도계 읽기, 양말 짝 맞추기, 머그 손잡이 회전 trajectory, 10파운드 payload로 들 수 있는 물체 판단"
    page: 59
    bbox_norm: [0.0947, 0.0992, 0.9067, 0.8748]
    strategy: caption-region
    curated: false
  - id: fig39
    label: Figure 39
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig39.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig39.png
    caption: "ALOHA long-horizon 벤치마크 4과제(Trash Sorting, Desk Organization, Blocks in Drawer, Pack Suitcase) 사진"
    page: 60
    bbox_norm: [0.0909, 0.289, 0.9053, 0.7832]
    strategy: caption-region
    curated: false
  - id: fig40
    label: Figure 40
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig40.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig40.png
    caption: "Bi-arm Franka long-horizon 벤치마크 4과제 사진"
    page: 61
    bbox_norm: [0.0897, 0.4519, 0.9064, 0.8102]
    strategy: caption-region
    curated: false
  - id: fig41
    label: Figure 41
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/fig41.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/fig41.png
    caption: "Figure 17의 long-horizon 평가를 성공률로 다시 그린 그래프"
    page: 62
    bbox_norm: [0.2101, 0.1495, 0.7837, 0.539]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/tab01.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/tab01.png
    caption: "long-horizon 평가의 실패 유형 비율. Gemini 2.5 Flash orchestrator는 planning 25.5%, success detection 6%, action 13%로 합계 44.5%, GR-ER 1.5 orchestrator는 9%, 4%, 9%로 합계 22%"
    page: 19
    bbox_norm: [0.1299, 0.1509, 0.8701, 0.2661]
    strategy: manual
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/tab02.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/tab02.png
    caption: "Gemini Robotics 1.5 model card 뒷부분(평가 결과, 사용과 한계, 윤리 고려 사항)"
    page: 31
    bbox_norm: [0.0947, 0.0708, 0.9053, 0.2547]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/tab03.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/tab03.png
    caption: "확장된 action generalization 과제 5종의 progress score 정의"
    page: 33
    bbox_norm: [0.0938, 0.4775, 0.9058, 0.9279]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/tab04.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/tab04.png
    caption: "task generalization 과제의 progress score 정의"
    page: 35
    bbox_norm: [0.0947, 0.1216, 0.8921, 0.4985]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/tab05.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/tab05.png
    caption: "Bi-arm Franka workbench 장면 과제의 progress score 정의"
    page: 37
    bbox_norm: [0.0941, 0.1216, 0.9053, 0.9279]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/tab06.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/tab06.png
    caption: "Bi-arm Franka 컴퓨터 장면 과제의 progress score 정의"
    page: 38
    bbox_norm: [0.0938, 0.1216, 0.9053, 0.9279]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/tab07.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/tab07.png
    caption: "Bi-arm Franka NIST Assembly Task Board 2 과제의 progress score 정의"
    page: 39
    bbox_norm: [0.0947, 0.1216, 0.8921, 0.3964]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/tab08.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/tab08.png
    caption: "Bi-arm Franka workbench 장면 semantic generalization 과제의 progress score 정의"
    page: 39
    bbox_norm: [0.0941, 0.4246, 0.9053, 0.9279]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/tab09.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/tab09.png
    caption: "Bi-arm Franka 컴퓨터 장면 semantic generalization 과제의 progress score 정의"
    page: 40
    bbox_norm: [0.0938, 0.1216, 0.9082, 0.6089]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/tab10.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/tab10.png
    caption: "Apollo humanoid in-distribution과 visual generalization 과제의 progress score 정의"
    page: 41
    bbox_norm: [0.0947, 0.1343, 0.8921, 0.5016]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/tab11.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/tab11.png
    caption: "Apollo humanoid semantic generalization 과제의 progress score 정의"
    page: 41
    bbox_norm: [0.0947, 0.5505, 0.9053, 0.9279]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/tab12.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/tab12.png
    caption: "Apollo humanoid action generalization 과제의 progress score 정의"
    page: 42
    bbox_norm: [0.0947, 0.3466, 0.9053, 0.9279]
    strategy: table-region
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/tab13.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/tab13.png
    caption: "Bi-arm Franka에서 ALOHA로의 cross-embodiment 벤치마크 progress score 정의"
    page: 45
    bbox_norm: [0.0938, 0.1216, 0.9084, 0.9279]
    strategy: table-region
    curated: false
  - id: tab14
    label: Table 14
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/tab14.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/tab14.png
    caption: "ALOHA와 humanoid에서 Bi-arm Franka로의 cross-embodiment 벤치마크 progress score 정의"
    page: 47
    bbox_norm: [0.0947, 0.1506, 0.8921, 0.5523]
    strategy: table-region
    curated: false
  - id: tab15
    label: Table 15
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/tab15.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/tab15.png
    caption: "ALOHA에서 humanoid로의 cross-embodiment 벤치마크 progress score 정의"
    page: 47
    bbox_norm: [0.0947, 0.6337, 0.9053, 0.9279]
    strategy: table-region
    curated: false
  - id: tab16
    label: Table 16
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/tab16.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/tab16.png
    caption: "ALOHA multi-step 벤치마크 progress score 정의"
    page: 49
    bbox_norm: [0.0947, 0.3051, 0.9053, 0.9279]
    strategy: table-region
    curated: false
  - id: tab17
    label: Table 17
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/tab17.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/tab17.png
    caption: "Bi-arm Franka multi-step 벤치마크 progress score 정의"
    page: 51
    bbox_norm: [0.0947, 0.2264, 0.9053, 0.9279]
    strategy: table-region
    curated: false
  - id: tab18
    label: Table 18
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/tab18.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/tab18.png
    caption: "humanoid multi-step 벤치마크 progress score 정의"
    page: 53
    bbox_norm: [0.0947, 0.1209, 0.9053, 0.9279]
    strategy: table-region
    curated: false
  - id: tab19
    label: Table 19
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/tab19.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/tab19.png
    caption: "embodied reasoning 학술 벤치마크 15종 상세 점수. GR-ER 1.5(thinking 켬과 끔), GR-ER, Gemini 2.5 Pro, Gemini 2.5 Flash, GPT-5, GPT-5-mini 7열. ER Score는 thinking을 켠 GR-ER 1.5가 59.6으로 가장 높다"
    page: 57
    bbox_norm: [0.0932, 0.0708, 0.9057, 0.7012]
    strategy: table-region
    curated: false
  - id: tab20
    label: Table 20
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/tab20.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/tab20.png
    caption: "MMMU, GPQA, Aider Polyglot 점수. 평균은 GPT-5 83.9, Gemini 2.5 Pro 83.5, thinking을 켠 GR-ER 1.5 73.8"
    page: 58
    bbox_norm: [0.0947, 0.0708, 0.9053, 0.3011]
    strategy: table-region
    curated: false
  - id: tab21
    label: Table 21
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/tab21.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/tab21.png
    caption: "복잡한 pointing 벤치마크의 subtask별 점수. standard, steerable, spatial pointing과 point-to-count로 나눈다"
    page: 58
    bbox_norm: [0.0947, 0.5024, 0.9363, 0.9279]
    strategy: table-region
    curated: false
  - id: tab22
    label: Table 22
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/tab22.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/tab22.png
    caption: "ALOHA long-horizon 벤치마크 4과제의 progress score 정의"
    page: 60
    bbox_norm: [0.0947, 0.2739, 0.9033, 0.4479]
    strategy: table-region
    curated: false
  - id: tab23
    label: Table 23
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier/tab23.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier-figures/tab23.png
    caption: "Bi-arm Franka long-horizon 벤치마크 4과제의 progress score 정의"
    page: 61
    bbox_norm: [0.0947, 0.1917, 0.9033, 0.316]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

Gemini Robotics 1.5는 Google DeepMind가 2025년 9월 공개한 로봇 foundation model 가족의 두 번째 세대로, 여러 로봇을 한 checkpoint로 제어하는 VLA인 Gemini Robotics 1.5와 embodied reasoning 전용 VLM인 Gemini Robotics-ER 1.5로 구성된다. Motion Transfer로 로봇 간 skill을 zero-shot으로 옮기고, action 앞에 자연어 thinking을 삽입해 multi-step 과제를 분해하며, ER 모델을 orchestrator로 두어 도구를 부르고 계획하는 agentic system을 이룬다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | Gemini Robotics 1.5: Pushing the Frontier of Generalist Robots with Advanced Embodied Reasoning, Thinking, and Motion Transfer |
| 저자 | Gemini Robotics Team, Google DeepMind (저자 목록은 Contributions and Acknowledgments 절에 있으며 연락처는 gemini-robotics-report@google.com) |
| arXiv | 2510.03342v3 (cs.RO, 최초 2025년 10월 3일, v3 2025년 11월 28일) |
| 공식 발표 | 2025년 9월 25일 DeepMind 블로그 "Gemini Robotics 1.5 brings AI agents into the physical world" |
| 분량 | 본문 22쪽에 참고문헌 7쪽, 부록 33쪽. 그림 41개와 표 23개 |
| 기반 모델 | Gemini 최신 세대 (Comanici et al., 2025, Gemini 2.5 계열) |
| 로봇 플랫폼 | ALOHA 2, Bi-arm Franka, Apptronik Apollo humanoid |
| 학습 인프라 | TPU v4, v5p, v6e. JAX와 ML Pathways |
| 공개 범위 | Gemini Robotics-ER 1.5는 Gemini API(Google AI Studio)로 공개, Gemini Robotics 1.5는 선별된 파트너에게만 제공 |
| 동시 공개 | ASIMOV-2.0 안전 벤치마크 (Jindal et al., 2025) |

## 2. 주요 기여 (Key Contributions)

논문은 세 가지 혁신을 한 가족 안에 묶은 것을 기여로 내세운다.

1. **multi-embodiment VLA와 Motion Transfer**. Gemini Robotics 1.5(GR 1.5)는 새 아키텍처와 Motion Transfer(MT) 학습 레시피로 서로 다른 로봇의 데이터에서 동작과 물리 상호작용에 대한 통합된 이해를 학습한다. 그 결과 ALOHA, Bi-arm Franka, Apollo humanoid를 로봇별 post-training 없이 한 checkpoint로 제어하고, 한 로봇에서만 수집된 skill을 다른 로봇으로 zero-shot 전이한다.
2. **Thinking VLA**. GR 1.5는 action을 내기 전에 자연어로 이뤄진 다단계 내부 추론을 생성해 context window에 붙인다. 이 방식은 복잡한 multi-step 과제를 primitive skill 시퀀스로 분해하고, 과제 성공과 실패를 감지해 복구 행동을 제안하며, 로봇 행동을 사람이 읽을 수 있게 만든다.
3. **최고 수준의 embodied reasoning 모델**. Gemini Robotics-ER 1.5(GR-ER 1.5)는 시각과 공간 이해, task planning, progress 추정처럼 로봇에 필요한 추론 능력에서 새 최고 기록을 세우면서도 frontier 모델의 일반 능력을 유지한다. 두 모델을 agentic system으로 묶으면 사용자 대화, 고수준 추론과 planning, tool use, 저수준 action이 하나의 흐름으로 이어진다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 모델 가족과 agentic system 구조

두 모델은 모두 Gemini의 멀티모달 world knowledge를 물려받는다. GR-ER 1.5는 VLM으로, Gemini의 고급 추론과 tool use 능력을 그대로 유지한 채 task planning, 공간 추론, task progress 추정 같은 embodied reasoning 문제에 추가로 최적화됐다. embodied reasoning은 로봇 응용에 필요한 물리 세계의 시각, 공간, 시간 이해를 뜻한다. GR 1.5는 VLA로, 중간 길이와 짧은 길이의 지시문(instruction)을 로봇 action으로 옮긴다. open-vocabulary 자연어 지시문을 이해하고, action을 내기 전에 추론 단계를 수행할 수 있으며, embodiment가 다른 여러 로봇을 기본 상태에서 제어한다.

agentic system은 orchestrator와 action model 두 부분으로 이뤄지며 각각 VLM과 VLA가 맡는다.

| 구성 요소 | 담당 모델 | 역할 |
|---|---|---|
| orchestrator | GR-ER 1.5 | 사용자 입력과 환경 피드백을 처리하고 전체 과제 흐름을 제어한다. 복잡한 과제를 VLA가 실행할 수 있는 단순한 단계로 쪼개고, success detection으로 다음 단계로 넘어갈 시점을 정한다. 외부 정보 접근이나 추가 추론을 위해 디지털 도구를 부른다 |
| action model | GR 1.5 | orchestrator가 내린 지시문을 저수준 로봇 action으로 옮긴다. orchestrator에게는 특화된 도구로 노출되며 open-vocabulary 자연어로 지시를 받는다 |

논문은 "런던 여행을 위해 가방을 싸라"는 예로 두 층의 분업을 설명한다. orchestrator인 GR-ER 1.5는 사용자 허락 아래 여행 일정과 최근 일기 예보를 확인해 어떤 옷이 적절한지 정하고, "비옷을 가방에 넣어라" 같은 고수준 계획을 action model에 전달한다. action model은 각 지시문을 몇 초 분량의 로봇 동작에 해당하는 짧은 구간("옷장에서 비옷을 집어라")으로 다시 나누고, 이를 직접 실행하거나 "그리퍼를 왼쪽으로 옮겨라", "그리퍼를 닫아라" 같은 primitive motion의 inner monologue로 한 번 더 옮긴다.

### 3.2 Embodied thinking

Embodied thinking은 action 전에 추론하는 능력이며 VLM과 VLA 양쪽에서 동작한다. GR-ER 1.5 쪽에서는 Gemini의 thinking과 tool use를 향상된 물리 세계 이해와 결합해, 복잡한 과제를 거친 계획으로 나누고 실행 결과에 따라 계획을 갱신하며 웹 검색 같은 외부 도구를 부르는 고수준 planning을 맡는다.

VLA 쪽의 같은 능력을 Thinking VLA라 부르며, 결과 그래프에서는 GR 1.5 (Thinking on)으로 표기한다. Thinking VLA는 지시문과 자기 perception에 대해 명시적으로 추론하고, 자연어 thinking trace를 생성해 context window에 붙인 뒤 action을 낸다. 이 과정은 복잡한 지시문을 primitive skill 시퀀스로 단순화하고, 사람과 로봇의 상호작용 투명성을 높이며, VLA 능력을 확장하는 새 방법이 된다. Figure 7의 thinking trace를 보면 각 장면마다 "next step"(예: 테이블에서 노란 테니스공을 왼손으로 집어라)과 "motion description"(예: 왼팔이 앞으로, 오른쪽으로, 약간 위로 움직이고 왼손 그리퍼가 열린다)이 함께 적혀 있어 thinking이 두 수준으로 나뉘어 있음을 알 수 있다.

### 3.3 Motion Transfer

Motion Transfer는 VLA를 위한 새 모델 아키텍처와 학습 레시피를 함께 가리키는 이름이다. 서로 다른 로봇과 데이터 원천에서 학습해 동작과 물리 상호작용의 효과에 대한 통합된 이해를 형성하고, 그 결과 매우 다른 embodiment 사이에서 skill이 전이되게 한다. 논문은 아키텍처의 세부 구조를 공개하지 않으며, 결과 절에서 MT 유무를 ablation으로만 비교한다.

### 3.4 로봇 데이터

학습 데이터는 ALOHA, Bi-arm Franka, Apollo humanoid에서 수집한 multi-embodiment 로봇 데이터와 인터넷의 공개 텍스트, 이미지, 영상 데이터로 이뤄진다. 로봇 데이터는 세 플랫폼에 걸친 수천 개의 다양한 과제로, 여러 장면에서 폭넓은 manipulation skill을 다룬다. model card에 따르면 GR-ER 1.5와 GR 1.5는 이미지, 텍스트, 로봇 센서와 action 데이터로 학습됐고, 민감 정보 필터링과 Gemini와 FlexCap으로 만든 합성 캡션이 전처리에 쓰였다.

### 3.5 평가 방법

모든 비교는 실제 로봇에서 A/B/n 테스트로 수행한다. 즉 한 비교에 등장하는 모든 모델을 같은 로봇 작업 셀에서 번갈아 테스트해, 로봇과 환경 조건 차이에서 오는 분산을 줄인다.

개발 중 반복 속도를 높이기 위해 실제 로봇 없이 평가하는 방법도 개발했다. 오픈소스 MuJoCo 시뮬레이터로 세 로봇 embodiment의 평가 장면을 만들고, 시뮬레이션과 실제 장면의 시각, 물리 파라미터를 정밀하게 맞춰 두 평가 사이의 강한 rank consistency를 확보했다 (부록 B.1, Figure 21). rank consistency는 시뮬레이션에서 매긴 모델 순위가 실제 로봇에서도 그대로 유지되는 성질을 뜻한다. 그 결과 GR 1.5 개발 중 평가 episode의 90% 이상이 시뮬레이션에서 이뤄졌다. 모델 품질의 최종 판정에는 여전히 실제 평가가 필요하지만, 실제 하드웨어에서 실행되는 테스트 양은 크게 줄었다.

GR 1.5 벤치마크는 이전 Gemini Robotics 논문의 설계 철학을 따르되 모든 embodiment로 확장하고, 더 어려운 multi-step 과제와 cross-embodiment 전이와 thinking을 시험하는 과제를 더해 총 230개 과제로 구성된다. 지표는 progress score의 평균과 표준 오차를 기본으로 보고한다. progress score는 과제를 어디까지 해냈는지를 0과 1 사이의 부분 점수로 재는 지표이며(정의는 부록 B.2에서 B.4), 성공률보다 연속적이고 세밀해 복잡한 multi-step 과제에 특히 유용하다. 성공률 그래프는 부록 B.5에 따로 실려 있다.

| 벤치마크 | 구성 | 출처 |
|---|---|---|
| ALOHA 일반화 | 이전 논문의 68개 일반화 과제에 action generalization 5개와 task generalization 12개를 추가. in-distribution은 이전 논문의 dexterity 벤치마크 20개 과제 | 부록 B.2.1 |
| Bi-arm Franka 일반화 | 새로 정의한 44개 과제 (in-distribution 20개, instruction과 visual과 action 변형 24개). task generalization은 ALOHA와 같은 12개 과제. workbench, 컴퓨터, NIST Assembly Task Board 2 세 장면 | 부록 B.2.2 |
| cross-embodiment | Bi-arm Franka에서 ALOHA로 10개 과제(벽면 패널에 공구 걸고 떼기), ALOHA와 humanoid에서 Bi-arm Franka로, ALOHA에서 humanoid로 | 부록 B.3 |
| multi-step | "A 다음 B 다음 C" 같은 복합 지시문과 "선물을 모두 포장해라" 같은 추상적 목표 지시문. 복합 지시문은 순서를 지켜야 만점 | 부록 B.4 |
| long-horizon (agent) | ALOHA 4과제와 Bi-arm Franka 4과제. subtask별 점수의 합으로 progress를 잰다 | 부록 D.1 |

### 3.6 GR-ER 1.5의 embodied reasoning 능력

논문은 GR-ER 1.5의 핵심 성질을 세 가지로 요약한다. frontier 모델의 일반성을 유지하면서 강한 embodied reasoning 성능을 내고, complex pointing과 progress understanding과 실제 사용 사례 같은 로봇 핵심 능력에서 뛰어나며, inference-time compute로 embodied reasoning 성능을 키울 수 있다.

**generality 측정**. 두 벤치마크 묶음을 쓴다. 첫째는 embodied reasoning을 재는 학술 벤치마크 15종으로, 텍스트 기반 이미지 이해(BLINK, CV-Bench, ERQA 등)와 공간 추론(RoboSpatial, PointArena, Where2Place, RefSpatial 등)을 포함한다. embodied reasoning 점수는 공간 추론 벤치마크 50%와 질의응답 벤치마크(이미지와 영상) 50%의 가중 평균이다. 둘째는 MMMU, GPQA, Aider Polyglot을 같은 가중치로 섞어 이미지 이해, 과학, 코딩 능력을 재는 generality 점수다. 텍스트 기반 VQA 채점에는 Gemini 2.5 Flash를 썼고, Gemini 2.5와 GPT-5 계열은 2025년 9월 1일에서 20일 사이에 기본 thinking 예산과 도구 없이 API로 호출했다.

**complex pointing**. point는 모델의 의미 이해를 시각 입력에 grounding하는 가볍고 유연한 표현이다. 아주 적은 토큰으로 클릭할 위치나 잡기 적합한 물체 부위 같은 추상 개념을 정확히 가리키고, point 집합으로 확장하면 motion trajectory나 경로 같은 복합 출력이 된다. point는 counting 같은 downstream 과제의 중간 추론 도구로도 쓰인다. 논문은 pointing과 추론이 결합된 이 일반화된 능력을 complex pointing이라 부른다. 평가 범주는 네 가지다.

| 범주 | 뜻 |
|---|---|
| Average Pointing | 모든 벤치마크의 평균 |
| Spatial Pointing | "컵 왼쪽의 빈 공간을 가리켜라"처럼 공간 추론이 필요한 pointing |
| Steerable Pointing | "점을 조금 위로 옮겨라"처럼 사용자 지시에 따라 point를 수정하는 능력 |
| Point-to-Count | point를 중간 추론 단계로 쓸 때의 counting 정확도 |

**progress understanding과 success detection**. 물리 상호작용이 있는 실제 상황의 시간적 진행을 이해하는 능력은 policy 평가, 학습, 데이터 필터링, long-horizon 과제의 오케스트레이션에 두루 쓰인다. 정확한 progress 이해에는 시간과 공간 추론, 세계에 대한 의미 이해, multi-view 이해가 함께 필요하다. GR-ER 1.5는 과제 완료 비율 예측, success detection, 영상 프레임 순서 복원을 여러 embodiment의 다양한 장면에서 수행한다. 정량 평가를 위해 이미지와 텍스트 지시문을 주고 성공 여부를 이진으로 예측하는 success detection 벤치마크를 만들었으며, real-time과 offline, multiview와 singleview 두 기준으로 네 설정을 둔다. real-time 평가는 5절(agentic system 평가)에서 기록한 실제 rollout을 5Hz로 모델에 입력하고 추론 지연을 시뮬레이션하며, 응답이 아직 없는 프레임의 예측은 가장 최근에 응답이 있었던 프레임의 라벨로 간주한다. 논문은 모델의 긴 추론 시간이 실시간 사용을 어렵게 만든다고 지적하는데, 오래된 성공 예측은 동적인 로봇 상호작용에서 금방 쓸모없어지기 때문이다. offline 평가는 여러 embodiment와 카메라 시점과 입력 형식을 섞은 실제 상호작용 영상을 쓰고 추론 시간에 제한을 두지 않는다.

**실제 사용 사례**. 학술 벤치마크 밖의 성능을 보기 위해, GR-ER을 자기 응용 분야에 배포했던 초기 테스터가 제공한 예시로 벤치마크를 만들었다. in-the-wild 데이터 분포에서 물체 검출과 pointing 같은 공간 이해에 초점을 두며, bounding box는 IoU로, pointing은 정답 segmentation mask 안에 들어간 point의 비율로 채점한다. Figure 14(a)는 재고 선반 이미지를 표로 파싱해 HTML 페이지로 보여주는 검사 과제 예시다.

**thinking**. 수학과 코드처럼 언어 기반 도메인이 thinking으로 이득을 본 것과 같이, GR-ER 1.5는 open-world embodied reasoning에서 thinking의 이득을 보인다. Figure 15의 trace를 보면 모델은 이미지의 핵심 특징을 먼저 파악한 뒤 세부(온도계 눈금)에 집중하고, 논리적이고 체계적으로 진행하며(양말 짝 맞추기), thinking 중에 point를 찍을 수 있고, 관련 수학 연산을 올바르게 수행한다.

### 3.7 agentic system의 구성과 ablation 설계

5장은 GR-ER 1.5와 GR 1.5를 완전한 agentic system으로 결합해, out-of-distribution 환경에서 복잡한 long-horizon 과제를 수행한다. 테스트 시나리오는 고급 실제 환경 이해, tool use, long-horizon task planning, 실행, 오류 복구를 요구한다. 각 구성 요소의 기여를 보기 위해 세 조건을 비교한다.

| 조건 | 구성 |
|---|---|
| GR 1.5 (Thinking on) | action 전에 thinking하는 Thinking VLA 단독 |
| Agentic (Gemini 2.5 Flash + GR 1.5) | 기성 Gemini 2.5 Flash를 orchestrator로, GR 1.5를 실행 모델로 쓴 기준 시스템 |
| Agentic (GR-ER 1.5 + GR 1.5) | GR-ER 1.5를 orchestrator로, GR 1.5를 실행 모델로 쓴 제안 시스템 |

과제는 ALOHA와 Bi-arm Franka에 걸쳐 8개다. ALOHA에는 pre-training checkpoint를 그대로 썼고, Bi-arm Franka에는 long-horizon 과제 성공률을 높이기 위해 추가 post-training을 적용했다.

| 과제 | 시험하는 능력 |
|---|---|
| Sort Trash, Nut Allergy, Mushroom Risotto | 물체가 프롬프트 요구에 맞는지 알기 위한 웹 검색 (tool use) |
| Desk Organization, Swap | 장면과 물체의 상태를 기억했다가 원래대로 되돌리기 (메모리) |
| Pack Suitcase, Top shelf to the table | 선반이나 옷걸이 위의 부드러운 물체를 다루는 3D 추론과 dexterity |
| Blocks in Drawer | 9개의 구분된 단계로 이뤄진 planning |

### 3.8 안전 접근

안전 접근은 여러 층으로 이뤄진다. 고수준 semantic safety 추론, 사람과의 정중한 대화, action 전 안전에 대한 thinking, 필요 시 충돌 회피 같은 저수준 물리 안전 서브시스템 호출이 함께 작동하고, ISO 안전 표준에 따른 운영 안전 관행을 계속 반영한다. 항목별 내용은 다음과 같다.

| 항목 | 내용 |
|---|---|
| 안전한 사람과 로봇의 대화 | Gemini checkpoint 위에 구축했으므로 혐오 발언, 성적 표현, 개인 식별 정보 노출을 막는 Gemini Safety Policies와 alignment된다. 적대적 테스트에서 GR-ER 1.5는 이 규정을 잘 준수했다 |
| semantic action safety | "상자가 너무 무거울 수 있다", "바닥의 액체는 미끄러질 위험이다" 같은 long-tail 상식 제약을 다룬다. 기존 ASIMOV 벤치마크를 ASIMOV-2.0으로 개선해 함께 공개했다. 품질 향상, 실제 부상 시나리오(NEISS)의 tail coverage 확대, Veo로 생성한 영상 modality, 물리 제약이 있는 새 embodied reasoning 과제가 추가됐다 |
| Auto-Red-Teaming | Gemini의 Auto-Red-Teaming을 따라 Attacker, Target, Autorater 세 모델의 게임으로 적대적 테스트를 자동화한다. Attacker는 Target의 학습이나 평가 데이터에서 평범한 과제를 뽑아 적대적 과제로 바꾼다. ER 모델은 악의적 지시문(prompt attack)이나 편집된 이미지(scene attack)로, action 모델은 rollout 중 움직이는 장애물 같은 방해(environment attack)로 공격한다. Autorater는 Target 응답의 정확성과 안전성을 채점한다 |

ASIMOV-2.0의 세 하위 벤치마크는 Figure 18과 같다. Injury는 텍스트 시나리오에서 잠재 위험의 종류와 심각도, action이 위험을 줄이는지 키우는지, action 후 심각도를 묻는다. Constraints는 "내 팔당 payload는 10kg이다" 같은 embodiment별 안전 지시를 지키는 pointing을 묻는다. Video는 AI 생성 영상에서 물리 위험과 심각도를 이해하고 부상을 막을 수 있었던 마지막 개입 시점을 예측하게 한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 단기 과제 일반화

일반화는 이전 Gemini Robotics 논문과 같은 방법으로 네 항목의 변형을 두고 잰다.

| 항목 | 뜻 |
|---|---|
| Visual Generalization | 배경, 조명, distractor 물체, 질감 같은 시각 변화에 대한 견고함 |
| Instruction Generalization | 바꿔 말하기, 오타, 다른 언어, 구체성 차이를 포함해 자연어 지시문의 의도를 이해하는 능력 |
| Action Generalization | 새 초기 조건이나 물체 인스턴스를 다루기 위해 학습한 동작을 조정하거나 새 동작을 합성하는 능력 |
| Task Generalization | 새 환경에서 새 과제를 수행하는 능력. 시각 변화 견고함, open-vocabulary 지시문 이해, 학습한 동작의 새 과제 적용을 동시에 요구하는 가장 포괄적인 일반화 |

Figure 3의 progress score는 다음과 같다. Bi-arm Franka와 Apollo humanoid에서는 이전 Gemini Robotics 모델과 비교하지 않는데, 그 모델들은 두 플랫폼에서 post-training된 특화 모델이라 학습한 과제의 변형을 넘어서는 일반화가 거의 없었기 때문이다.

| 로봇 | 모델 | In-Distribution | Instruction | Action | Visual | Task |
|---|---|---|---|---|---|---|
| ALOHA | GR 1.5 | 0.83 | 0.76 | 0.54 | 0.81 | 0.70 |
| ALOHA | Gemini Robotics | 0.73 | 0.53 | 0.25 | 0.73 | 0.44 |
| ALOHA | Gemini Robotics On-Device | 0.66 | 0.67 | 0.17 | 0.78 | 0.41 |
| Bi-arm Franka | GR 1.5 | 0.74 | 0.73 | 0.70 | 0.77 | 0.50 |
| Bi-arm Franka | Gemini Robotics On-Device | 0.36 | 0.22 | 0.34 | 0.09 | 0.12 |
| Apollo humanoid | GR 1.5 | 0.74 | 0.62 | 0.66 | 0.73 | 0.63 |
| Apollo humanoid | Gemini Robotics On-Device | 0.32 | 0.20 | 0.24 | 0.16 | 0.07 |

ALOHA에서 GR 1.5는 네 일반화 항목 모두에서 두 기준 모델을 앞서며, 특히 instruction, action, task generalization에서 차이가 크다. Bi-arm Franka와 Apollo humanoid에서는 모든 항목에서 Gemini Robotics On-Device(GRoD)를 크게 앞선다. 다만 논문은 이 비교가 동등 조건이 아니라고 밝힌다. GRoD checkpoint는 더 이른 시점에 공개되어 적은 데이터로 학습됐고, multi-embodiment 모델이 아니라 embodiment마다 다른 checkpoint를 쓴다. 성공률 기준 결과는 부록 Figure 35에 있으며, ALOHA에서 GR 1.5는 in-distribution 0.72, instruction 0.62, action 0.47, visual 0.67, task 0.39를 기록했다.

### 4.2 Motion Transfer ablation

일반화 향상의 원인을 찾기 위해 MT 없이 single-embodiment 데이터로 학습한 모델과 MT 없이 모든 embodiment 데이터로 학습한 모델을 기준으로 둔다 (Figure 4).

| 로봇 | 모델 | In-Distribution | Instruction | Action | Visual | Task |
|---|---|---|---|---|---|---|
| ALOHA | GR 1.5 | 0.83 | 0.76 | 0.54 | 0.81 | 0.70 |
| ALOHA | multi-embodiment, MT 없음 | 0.66 | 0.67 | 0.39 | 0.84 | 0.57 |
| ALOHA | single-embodiment, MT 없음 | 0.66 | 0.65 | 0.31 | 0.83 | 0.60 |
| Bi-arm Franka | GR 1.5 | 0.74 | 0.73 | 0.70 | 0.77 | 0.50 |
| Bi-arm Franka | multi-embodiment, MT 없음 | 0.69 | 0.71 | 0.64 | 0.55 | 0.38 |
| Bi-arm Franka | single-embodiment, MT 없음 | 0.61 | 0.54 | 0.75 | 0.36 | 0.30 |
| Apollo humanoid | GR 1.5 | 0.74 | 0.62 | 0.66 | 0.73 | 0.63 |
| Apollo humanoid | multi-embodiment, MT 없음 | 0.71 | 0.57 | 0.66 | 0.70 | 0.56 |
| Apollo humanoid | single-embodiment, MT 없음 | 0.66 | 0.49 | 0.51 | 0.56 | 0.25 |

다른 embodiment의 데이터를 추가하는 것만으로도 성능이 대체로 오르지만, MT 레시피는 추가 데이터의 긍정 효과를 뚜렷하게 증폭한다. 예외는 ALOHA의 visual generalization(MT 없는 두 조건이 0.84와 0.83으로 GR 1.5의 0.81보다 약간 높음)과 Bi-arm Franka의 action generalization(single-embodiment 0.75가 GR 1.5의 0.70보다 높음)이다. 성공률 기준 ablation은 부록 Figure 36에 있다.

### 4.3 cross-embodiment 전이

이전 연구(Open X-Embodiment)가 여러 로봇의 다양한 데이터로 VLA를 학습하는 이점을 보였지만, 한 embodiment에서 다른 embodiment로의 zero-shot skill 전이를 보인 사례는 드물었다. 논문은 GR 1.5의 multi-embodiment co-training과 MT가 이런 전이를 가능하게 한다는 증거를 제시한다. ALOHA는 Bi-arm Franka에서만 수집된 과제를 수행하고 그 반대도 성립하며, 제어가 훨씬 어렵고 embodiment 간극이 더 큰 humanoid도 ALOHA 데이터에만 있는 skill을 수행한다.

Figure 5의 cross-embodiment 벤치마크 결과는 다음과 같다. 각 embodiment에서 다른 로봇으로만 데이터가 수집된 과제를 테스트한다.

| 모델 | ALOHA progress | Franka progress | humanoid progress | ALOHA 성공률 | Franka 성공률 | humanoid 성공률 |
|---|---|---|---|---|---|---|
| GR 1.5 | 0.66 | 0.65 | 0.63 | 0.43 | 0.58 | 0.40 |
| multi-embodiment, MT 없음 | 0.32 | 0.49 | 0.56 | 0.10 | 0.33 | 0.39 |
| single-embodiment, MT 없음 | 0.44 | 0.33 | 0.25 | 0.19 | 0.14 | 0.09 |
| Gemini Robotics On-Device | 0.21 | 0.24 | 0.07 | 0.08 | 0.17 | 0.03 |
| Gemini Robotics | 0.13 | (없음) | (없음) | 0.00 | (없음) | (없음) |

single-embodiment 데이터로 학습한 모델(Gemini Robotics, GRoD, single-embodiment GR 1.5)은 모두 이 벤치마크에서 낮은 점수를 내고, cross-embodiment 데이터와 MT 레시피를 함께 쓰면 성능이 크게 오른다. 성공률을 함께 보고한 이유는 zero-shot 전이가 부분 진행이 아니라 실제 과제 완수로 이어짐을 보이기 위해서다.

MT의 효과는 해당 플랫폼이 원래 갖고 있던 데이터 양에 따라 다르다.

| 플랫폼 | 데이터 양 | cross-embodiment 데이터 추가 효과 | MT 효과 |
|---|---|---|---|
| ALOHA | 많음 | 단순 추가만으로는 효과가 작다 (progress 0.44에서 0.32로 오히려 하락) | embodiment를 alignment하고 공통점을 뽑아 긍정 전이를 증폭한다 (0.66) |
| Bi-arm Franka | 중간 | 이롭다 (0.33에서 0.49) | 공유 지식을 alignment해 추가 이득을 낸다 (0.65) |
| humanoid | 적음 | 가장 큰 이득 (0.25에서 0.56) | 효과가 덜 뚜렷하다 (0.63). humanoid처럼 embodiment 간극이 매우 큰 경우 MT의 alignment 능력이 덜 효과적일 수 있다 |

### 4.4 thinking과 multi-step 과제

Figure 6은 multi-step 벤치마크에서 추론 시 thinking 모드를 켠 GR 1.5와 끈 GR 1.5의 progress score를 비교한다. "옷을 색깔별로 분류해라" 같은 긴 multi-step 과제에서 action과 명시적 thinking 단계를 교차하는 이점이 특히 뚜렷하다.

| 로봇 | Thinking on progress | Thinking off progress | Thinking on 성공률 | Thinking off 성공률 |
|---|---|---|---|---|
| ALOHA | 0.55 | 0.26 | 0.38 | 0.09 |
| Bi-arm Franka | 0.60 | 0.55 | 0.44 | 0.42 |
| humanoid | 0.67 | 0.51 | 0.40 | 0.26 |

성능 향상은 고수준 multi-step 언어 지시문을 저수준 로봇 action으로 옮기는 어려운 cross-modal 변환을 두 단계로 나누는 데서 온다. 첫째, 모델은 복잡한 과제를 구체적이고 짧은 단계의 시퀀스로 바꾸는 언어 기반 thinking trace를 생성한다("옷 분류"라는 목표를 "옷에 더 가까워지도록 그리퍼를 왼쪽으로 옮겨라" 같은 생각으로). 둘째, 이 저수준 언어 명령을 로봇 action으로 직접 대응시킨다. 두 단계 분해가 단일 end-to-end 변환보다 견고한 이유는, 첫 단계가 VLM backbone의 강한 시각-언어 능력을 활용하고 둘째 단계는 더 단순한 action 대응만 학습하면 되기 때문이다.

정성적 이점은 세 가지다. 첫째, 해석 가능성이 크게 오른다. 내부 thinking trace를 시각화하면 계획된 action을 검사하고 다음 단계를 예측할 수 있어 사람과 로봇 사이의 신뢰와 운영 안전이 높아진다. 둘째, 과제 완료에 대한 상황 인식이 생긴다. Figure 7에서 로봇은 노란 테니스공을 잡는 데 성공하자 목표를 "노란 테니스공을 집어라"에서 "노란 테니스공을 흰 가방에 넣어라"로 자동으로 바꾼다. 즉 모델이 이전 subtask의 성공을 암묵적으로 인식하므로 별도의 success detector가 필요 없다. 셋째, 정교한 복구 행동이 가능하다. 같은 그림에서 물병이 오른손에서 미끄러져 왼손 근처에 떨어지자 다음 thinking trace가 즉시 "물병을 왼손으로 집어라"가 되어 자기 교정 복구가 시작된다.

### 4.5 GR-ER 1.5의 generality와 embodied reasoning

Figure 8은 generality와 embodied reasoning 사이의 trade-off를 여러 frontier 모델에 대해 그린 산점도다. GR-ER 1.5는 이 Pareto frontier를 넓혀, 같은 모델 급의 다른 모델과 비슷한 generality를 유지하면서 최고 수준의 embodied reasoning 성능을 낸다. 부록 Table 19와 Table 20의 상세 수치는 다음과 같다.

| 벤치마크 | GR-ER 1.5 (thinking) | GR-ER 1.5 (no thinking) | GR-ER | Gemini 2.5 Pro | Gemini 2.5 Flash | GPT-5 | GPT-5-mini |
|---|---|---|---|---|---|---|---|
| Point-Bench | 71.6 | 73.3 | 75.7 | 62.7 | 61.7 | 43.6 | 39.5 |
| RefSpatial | 48.5 | 41.8 | 49.3 | 33.6 | 41.2 | 23.5 | 23.0 |
| RoboSpatial-Pointing | 31.1 | 25.3 | 30.3 | 8.3 | 7.9 | 19.0 | 12.5 |
| Where2Place | 59.0 | 48.0 | 41.0 | 37.0 | 48.0 | 37.0 | 33.5 |
| 공간 추론 평균 | 52.6 | 47.1 | 49.1 | 35.4 | 39.7 | 30.8 | 27.1 |
| BLINK | 57.8 | 65.2 | 60.1 | 69.2 | 46.1 | 71.3 | 66.4 |
| CV-Bench | 84.3 | 83.6 | 83.2 | 85.9 | 85.5 | 86.1 | 85.9 |
| ERQA | 54.8 | 47.0 | 45.3 | 56.0 | 47.5 | 59.0 | 57.3 |
| EmbSpatial | 78.4 | 73.4 | 56.4 | 78.0 | 76.2 | 81.5 | 78.8 |
| MindCube | 54.7 | 47.7 | 47.4 | 59.2 | 55.4 | 58.0 | 55.6 |
| RoboSpatial-VQA | 79.3 | 57.7 | 66.2 | 71.3 | 73.4 | 69.3 | 70.7 |
| SAT | 76.7 | 62.0 | 64.7 | 74.7 | 73.3 | 86.7 | 81.3 |
| Cosmos-Reason1 | 72.2 | 68.3 | 62.0 | 73.8 | 72.1 | 79.4 | 76.3 |
| Min Video Pairs | 72.5 | 67.1 | 59.5 | 72.8 | 69.2 | 77.0 | 73.0 |
| OpenEQA | 55.0 | 50.5 | 38.3 | 55.7 | 45.3 | 64.4 | 59.2 |
| VSI-Bench | 45.8 | 39.9 | 34.1 | 51.1 | 45.3 | 52.9 | 46.2 |
| QA 평균 | 66.5 | 60.2 | 56.1 | 68.0 | 62.7 | 71.4 | 68.2 |
| ER Score | 59.6 | 53.7 | 52.6 | 51.7 | 51.2 | 51.1 | 47.7 |
| 전체 평균 | 62.8 | 56.7 | 54.2 | 59.3 | 56.5 | 60.6 | 57.3 |

| generality 벤치마크 | GR-ER 1.5 (thinking) | GR-ER 1.5 (no thinking) | GR-ER | Gemini 2.5 Pro | Gemini 2.5 Flash | GPT-5 | GPT-5-mini |
|---|---|---|---|---|---|---|---|
| MMMU | 80.7 | 79.3 | 67.0 | 82.0 | 79.7 | 82.0 | 78.0 |
| GPQA | 83.3 | 81.3 | 59.6 | 86.4 | 82.8 | 88.4 | 78.3 |
| Aider Polyglot | 57.3 | 44.4 | 16.0 | 82.2 | 56.7 | 81.3 | 66.7 |
| 평균 | 73.8 | 68.3 | 47.5 | 83.5 | 73.1 | 83.9 | 74.3 |

ER Score에서 GR-ER 1.5(thinking)는 59.6으로 2위인 GR-ER 1.5(no thinking) 53.7을 5.9%p, GPT-5의 51.1을 8.5%p 앞선다. 다만 QA 평균만 보면 GPT-5(71.4)와 Gemini 2.5 Pro(68.0)가 GR-ER 1.5(66.5)보다 높고, GR-ER 1.5의 우위는 공간 추론 평균(52.6 대 GPT-5 30.8)에서 온다. generality 평균은 GPT-5와 Gemini 2.5 Pro가 83.9와 83.5로 GR-ER 1.5의 73.8보다 약 10%p 높으며, 차이는 주로 코딩 벤치마크 Aider Polyglot(57.3 대 81.3)에서 난다. GR-ER 1.5는 이전 GR-ER(47.5)에 비해서는 generality가 26.3%p 올랐다.

### 4.6 complex pointing

Figure 10의 네 범주와 부록 Table 21의 subtask별 점수는 다음과 같다. GPT-5 계열 결과는 2025년 9월 API 호출로 얻었다.

| 벤치마크 | GR-ER 1.5 (thinking) | GR-ER 1.5 (no thinking) | GR-ER | Gemini 2.5 Pro | Gemini 2.5 Flash | GPT-5 | GPT-5-mini |
|---|---|---|---|---|---|---|---|
| Point-Bench-Affordance | 70.9 | 76.5 | 87.9 | 65.3 | 67.8 | 58.1 | 50.0 |
| Point-Bench-Counting | 86.8 | 86.8 | 88.4 | 77.5 | 73.1 | 53.7 | 56.8 |
| Point-Bench-Reasoning | 61.7 | 69.0 | 64.8 | 55.4 | 49.4 | 33.0 | 28.3 |
| Point-Bench-Steerable | 67.8 | 61.8 | 65.8 | 53.4 | 61.3 | 38.0 | 32.0 |
| Point-Bench-Spatial | 71.0 | 72.6 | 71.9 | 62.7 | 57.2 | 35.4 | 30.3 |
| RefSpatial | 48.5 | 41.8 | 49.2 | 33.6 | 41.1 | 23.5 | 23.0 |
| RoboSpatial | 31.1 | 25.3 | 30.3 | 8.3 | 7.9 | 19.0 | 12.5 |
| Where2Place | 59.0 | 48.0 | 41.0 | 37.0 | 48.0 | 37.0 | 33.5 |
| PixMo Count (Point-to-Count) | 80.0 | 65.0 | 60.0 | 76.0 | 64.0 | 73.0 | 77.0 |
| 평균 | 52.6 | 47.1 | 49.1 | 35.4 | 39.7 | 30.8 | 27.1 |

Figure 10의 네 범주 요약은 Average Pointing 52.6(GR-ER 49.1, Gemini 2.5 Pro 35.4, Gemini 2.5 Flash 39.7, GPT-5 30.8, GPT-5-mini 27.1), Spatial Pointing 46.2(GR-ER 40.2, Gemini 2.5 Pro 26.3, Flash 32.4, GPT-5 26.5, GPT-5-mini 23.0), Steerable Pointing 67.8(GR-ER 65.8, Pro 54.6, Flash 61.3, GPT-5 38.0, GPT-5-mini 32.0), Point-to-Count 80.0(GR-ER 60.0, Pro 76.0, Flash 64.0, GPT-5 73.0, GPT-5-mini 77.0)이다. 이전 GR-ER은 Point-Bench-Affordance(87.9)와 Point-Bench-Counting(88.4)처럼 표준 pointing 일부에서 GR-ER 1.5보다 높은데, GR-ER 1.5의 우위는 물리, 공간, 의미 제약(안전 포함)을 추론해야 하는 complex pointing에서 두드러진다. Figure 11의 예시가 이를 보여준다.

### 4.7 success detection

Figure 13의 네 설정 정확도는 다음과 같다.

| 모델 | real-time multiview | real-time singleview | offline multiview | offline singleview |
|---|---|---|---|---|
| GR-ER 1.5 | 0.66 | 0.59 | 0.74 | 0.79 |
| GR-ER | 0.66 | 0.57 | 0.60 | 0.63 |
| Gemini 2.5 Pro | 0.48 | 0.50 | 0.70 | 0.76 |
| Gemini 2.5 Flash | 0.51 | 0.52 | 0.68 | 0.69 |
| GPT-5 | 0.47 | 0.46 | 0.73 | 0.80 |
| GPT-5-mini | 0.46 | 0.49 | 0.68 | 0.60 |

GR-ER 1.5는 real-time 두 설정에서 가장 높고 offline에서도 최고 수준이다. real-time과 offline의 차이가 큰 모델(GPT-5는 0.47 대 0.80)은 추론 지연 때문에 실시간 성공 감지에서 손해를 본다.

### 4.8 실제 사용 사례

Figure 14(b)의 초기 테스터 데이터 벤치마크 점수는 GR-ER 1.5 41.0, GR-ER 35.0, Gemini 2.5 Pro 23.0, Gemini 2.5 Flash 32.0, GPT-5 31.0, GPT-5-mini 24.0이다. GR-ER 1.5가 이전 GR-ER과 동시대 최고 멀티모달 모델을 모두 앞선다.

### 4.9 thinking 예산 스케일링

Figure 16은 15종 학술 벤치마크에서 thinking 토큰 예산을 0에서 4096까지 늘렸을 때의 변화를 보여준다. 모든 데이터 점은 같은 벤치마크 집합에 대한 3회 평가 평균이다.

| 관찰 | 내용 |
|---|---|
| 예산과 성능 | 모든 과제 범주에서 예산이 커질수록 성능이 오른다. 평균 점수는 예산 0에서 58.2, 256에서 58.1, 512에서 60.6, 1024에서 62.6, 2048에서 63.8, 3072에서 64.6, 4096에서 64.9다 |
| 과제별 최적 예산 | 이미지와 영상 QA는 긴 thinking에서 더 큰 이득을 보고 pointing은 이득이 작다 |
| 토큰 사용량 자동 조절 | 같은 예산에서 GR-ER 1.5는 pointing에 가장 적은 토큰을, 영상 QA에 가장 많은 토큰을 쓴다. 평균 출력 길이는 예산 0에서 122토큰, 1024에서 569토큰, 2048 이상에서 약 980에서 990토큰이다 |
| Gemini 2.5 Flash와 비교 | 같은 예산 범위에서 GR-ER 1.5는 58.2에서 64.9로 6.6%p 오르고 Gemini 2.5 Flash는 54.5에서 57.1로 2.7%p 오른다 |

frontier 모델이 강한 thinker라 해도 그것이 효과적인 embodied reasoning으로 바로 이어지지는 않는다. Gemini 2.5 Flash의 평평한 스케일링 곡선이 그 근거다. 반면 GR-ER 1.5의 강한 스케일링은 embodied reasoning에서도 inference-time compute 확장의 이득을 얻을 수 있음을 보여준다.

### 4.10 agentic system의 long-horizon 과제

Figure 17의 progress score는 다음과 같다.

| 과제 (로봇) | Agent (GR-ER 1.5 + GR 1.5) | Agent (Gemini 2.5 Flash + GR 1.5) | GR 1.5 (Thinking on) |
|---|---|---|---|
| Blocks in Drawer (ALOHA) | 0.83 | 0.87 | 0.33 |
| Desk Organization (ALOHA) | 0.88 | 0.56 | 0.32 |
| Sort Trash (ALOHA) | 0.80 | 0.64 | 0.36 |
| Pack Suitcase (ALOHA) | 0.45 | 0.15 | 0.40 |
| Top shelf to the table (Franka) | 0.75 | 0.33 | 0.08 |
| Nut allergy (Franka) | 0.78 | 0.78 | 0.00 |
| Swap (Franka) | 0.78 | 0.44 | 0.44 |
| Mushroom risotto (Franka) | 0.67 | 0.58 | 0.25 |

GR 1.5 가족으로 구성된 agent가 두 기준을 일관되게 앞선다. Thinking VLA 단독은 최대 44%의 progress score로 중간 수준에 머무르는 반면 GR 1.5 agent는 80% 근처 점수를 자주 낸다. Thinking VLA도 어느 정도 과제 분해를 하지만, 세계 이해와 task planning은 embodied reasoning 모델보다 제한적이다. Thinking VLA가 action 출력에 최적화된 더 작은 모델이라는 점과 맞는 결과다. Gemini 2.5 Flash를 orchestrator로 쓴 기준 agent와 비교하면 더 복잡한 과제에서 progress score가 거의 두 배다.

실패 분석(Table 1)은 세 범주로 나눈다.

| subtask 실패 유형 | 정의 | Gemini 2.5 Flash orchestrator | GR-ER 1.5 orchestrator |
|---|---|---|---|
| planning | orchestrator가 잘못된 계획을 세우거나 VLA에 잘못된 지시문을 내림 | 25.5% | 9% |
| success detection | subtask를 너무 일찍 또는 너무 늦게 끝냄 | 6% | 4% |
| action | VLA가 subtask를 완수하지 못함 | 13% | 9% |
| 합계 | | 44.5% | 22% |

GR-ER 1.5 orchestrator는 모든 범주에서 기준보다 낫고, task planning 성능 향상이 가장 크다. 이 차이는 GR-ER 1.5가 Gemini 2.5 Flash보다 강한 embodied reasoning 능력을 제공한다는 뜻이다. 논문은 이 결과에서 명확한 능력 위계를 읽는다. VLA 개선은 실행 견고함을 크게 높이지만 복잡한 long-horizon 과제에는 부족하고, 기성 VLM을 고급 VLA와 단순히 짝지어도 안정적인 end-to-end 성공을 얻지 못한다. 일반적이고 견고한 저수준 제어와 지능적인 고수준 embodied reasoning을 결합하는 것이 물리 세계의 AI agent 배포로 가는 핵심 경로라는 설계 철학이 여기서 나온다.

### 4.11 안전 평가

Figure 19(a)의 ASIMOV-2.0 평가에서 GR-ER 1.5는 위험 인식, action의 안전 결과 이해, 개입 시점 판단에서 GR-ER보다 나아졌다.

| 항목 | GR-ER 1.5 | GR-ER |
|---|---|---|
| Risk (text) | 90.0 | 90.9 |
| Action (text) | 76.0 | 62.0 |
| Risk (video) | 62.0 | 44.0 |
| Intervention (video) | 88.4 | 84.1 |

Figure 19(b)의 물리 안전 제약 준수(constraint satisfaction)에서는 Thinking about Safety로 fine-tuning한 GR-ER 1.5가 68.4로 가장 높고, thinking만 켠 GR-ER 1.5 55.1, GR-ER 31.9, Gemini 2.5 Pro 54.5, Gemini 2.5 Flash 58.3, GPT-5 59.4, GPT-5-mini 53.1 순이다.

Auto-Red-Teaming으로는 세 가지가 확인됐다. 첫째, GR-ER 1.5는 특히 thinking을 켰을 때 지시문 난독화, 환각 유도, 콘텐츠 안전 공격에 더 견고하다. 둘째, Autorater로 모델 응답을 안정적으로 비평하고 교정할 수 있다. 셋째, auto-red-teaming으로 생성한 학습 데이터가 환각 같은 취약점을 완화한다. Figure 20은 Attacker가 ALOHA 장면에 없는 물체를 가리키라고 요구해 ER 모델의 환각을 끌어낸 사례이며, Autorater는 응답 오버레이 이미지를 보고 이를 실패로 판정하고 근거를 적었다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **dexterity는 이전 세대 수준**. GR 1.5는 새 수준의 일반화를 보이지만 dexterity, 즉 정밀하고 복잡한 manipulation을 해내는 능력은 이전 세대와 같은 수준에 머문다. 논문은 일반성을 희생하지 않고 dexterity를 높이기 위해 강화학습 같은 새 아키텍처와 학습 방법을 탐색하겠다고 밝힌다.
- **더 확장 가능한 데이터 원천 미활용**. 전통적인 로봇 action 데이터를 넘어 실제 사람 영상과 합성 영상 같은 원천을 활용하는 것이 다음 단계다. GR 1.5의 아키텍처 변경은 action 주석 없이도 이런 데이터에서 학습할 수 있게 이미 갖춰져 있으며, 공개된 저품질 영상 코퍼스에서의 학습이 향후 과제다.
- **Motion Transfer의 한계**. embodiment 간극이 매우 큰 humanoid에서는 MT의 alignment 효과가 덜 뚜렷했다. 또한 ALOHA visual generalization과 Bi-arm Franka action generalization처럼 MT 없는 조건이 더 높은 항목도 있다.
- **Motion Transfer의 세부 미공개**. 아키텍처와 학습 레시피의 구체적 내용은 논문에 없고 ablation 결과로만 효과를 보인다. 재현이나 비교 연구가 어렵다.
- **agentic system의 남은 실패**. GR-ER 1.5 orchestrator에서도 subtask 실패율 합계가 22%이며 planning 9%, action 9%, success detection 4%가 남아 있다.
- **generality 격차**. GR-ER 1.5의 generality 평균은 73.8로 GPT-5(83.9)와 Gemini 2.5 Pro(83.5)보다 약 10%p 낮고, 차이는 코딩 벤치마크에서 크다.
- **기준 모델 비교의 비대칭**. Bi-arm Franka와 humanoid의 GRoD 비교는 데이터 양과 공개 시점이 달라 동등 조건이 아니라고 논문 스스로 밝힌다.
- **접근 제한**. GR 1.5 VLA는 선별된 파트너에게만 제공되고 GR-ER 1.5만 API로 공개됐다.

## 6. 관련 연구 (Related Work)

- **Gemini Robotics (Gemini-Robotics-Team et al., 2025)**: 이전 세대. Gemini의 world knowledge로 VLA를 만들어 상호작용성, 일반성, dexterity를 보였다. GR 1.5는 그 위에 multi-embodiment, thinking, 향상된 ER 모델을 더한다. 벤치마크 설계 철학과 일반화 항목 정의도 이 논문에서 왔다.
- **Gemini 2.5 (Comanici et al., 2025)**: 두 모델의 기반이자 Auto-Red-Teaming 프레임워크와 Gemini Safety Policies의 출처.
- **multi-embodiment VLA**: GR00T N1(Bjorck et al., 2025), π0.5(Intelligence et al., 2025), Wen et al. 2025, RT-2(Zitkovich et al., 2023). Open X-Embodiment(O'Neill et al., 2024)는 여러 로봇 데이터로 학습하는 이점을 보였지만 zero-shot 전이 사례는 드물었다.
- **think before acting**: Huang et al. 2025, Lee et al. 2025, Lin et al. 2025, ECoT(Zawalski et al., 2024). thinking trace 생성은 Belkhale et al. 2024와 Smith et al. 2025의 언어 기반 추론 계열에 속한다.
- **embodied reasoning 벤치마크**: ERQA(이전 Gemini Robotics 논문), BLINK(Fu et al., 2024), CV-Bench(Tong et al., 2024), RoboSpatial(Song et al., 2025), PointArena(Cheng et al., 2025), Where2Place(Yuan et al., 2024), RefSpatial(Zhou et al., 2025). 일반 벤치마크는 MMMU(Yue et al., 2023), GPQA(Rein et al., 2024), Aider Polyglot(Gauthier, 2024).
- **success detection과 progress**: Du et al. 2023, Rocamonde et al. 2023, 프레임 순서 복원은 Ma et al. 2024.
- **long-horizon agent**: SayCan(Ahn et al., 2022), Huang et al. 2022, Shi et al. 2025.
- **안전**: ASIMOV 벤치마크(Sermanet et al., 2025)와 ASIMOV-2.0(Jindal et al., 2025), NEISS 부상 데이터, ISO 안전 표준(2016, 2025).
- **평가 인프라**: MuJoCo(Todorov et al., 2012), ALOHA 2(ALOHA-2-Team et al., 2024), Franka(2025), Apptronik Apollo(2025).

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Gemini Robotics 1.5 (GR 1.5) | multi-embodiment VLA. 세 로봇을 한 checkpoint로 제어하고 thinking 모드를 지원한다 |
| Gemini Robotics-ER 1.5 (GR-ER 1.5) | embodied reasoning에 최적화된 VLM. agentic system의 orchestrator를 맡는다 |
| Gemini Robotics On-Device (GRoD) | 이전 세대의 온보드 실행용 checkpoint. embodiment마다 다른 checkpoint를 쓴다 |
| embodied reasoning (ER) | 로봇 응용에 필요한 물리 세계의 시각, 공간, 시간 이해 |
| Embodied thinking | action 전에 추론하는 능력. VLM과 VLA 양쪽에서 동작한다 |
| Thinking VLA | 자연어 thinking trace를 생성해 context window에 붙인 뒤 action을 내는 VLA 동작 모드 |
| Motion Transfer (MT) | 서로 다른 로봇 데이터에서 동작의 통합된 이해를 학습해 embodiment 간 skill 전이를 가능하게 하는 아키텍처와 학습 레시피 |
| orchestrator | agentic system에서 사용자 입력과 환경 피드백을 처리하고 과제를 단계로 쪼개며 success detection을 하는 상위 모델 |
| action model | orchestrator의 지시문을 저수준 action으로 옮기는 VLA. orchestrator에게 도구로 노출된다 |
| progress score | 과제를 어디까지 해냈는지 0과 1 사이 부분 점수로 재는 지표 |
| complex pointing | 물리, 공간, 의미 제약을 추론해 point를 찍는 능력. pointing과 추론의 결합 |
| success detection (SD) | 이미지와 지시문을 보고 과제 성공 여부를 이진으로 예측하는 과제. real-time과 offline, multiview와 singleview 설정이 있다 |
| rank consistency | 시뮬레이션에서 매긴 모델 순위가 실제 로봇에서도 유지되는 성질 |
| A/B/n 테스트 | 비교 대상 모델 전부를 같은 로봇 작업 셀에서 번갈아 테스트하는 평가 방식 |
| ASIMOV-2.0 | semantic action safety 벤치마크. Injury, Constraints, Video 세 하위 벤치마크 |
| Auto-Red-Teaming (ART) | Attacker, Target, Autorater 세 모델의 게임으로 적대적 테스트를 자동화하는 프레임워크 |
| generality | MMMU, GPQA, Aider Polyglot 평균으로 잰 일반 능력 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | Gemini Robotics 1.5 모델 가족 개요 | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 5 | checkpoint 하나로 ALOHA, Bi-arm Franka, Apollo humanoid 세 로봇이… | caption-region | ★ wiki 권장 (embodiment) |
| fig03 | 6 | 로봇별 일반화 성능 분해 | caption-region | ★ wiki 권장 (result) |
| fig04 | 7 | 데이터와 학습 레시피 ablation | caption-region | ★ wiki 권장 (ablation) |
| fig05 | 8 | cross-embodiment 벤치마크 | caption-region | ★ wiki 권장 (result) |
| fig06 | 9 | multi-step 벤치마크에서 thinking을 켠 경우와 끈 경우의 progress score 비교 | caption-region | ★ wiki 권장 (ablation) |
| fig07 | 10 | Thinking VLA rollout 예시 | caption-region | ★ wiki 권장 (method) |
| fig08 | 11 | generality | manual | ★ wiki 권장 (result) |
| fig09 | 12 | GR-ER 1.5의 능력 모음 | caption-region | (선택, 능력 모음) |
| fig10 | 12 | 2D pointing과 point 기반 추론 벤치마크 5종 성능 | manual | ★ wiki 권장 (result) |
| fig11 | 13 | 복잡한 pointing 예시 여섯 장 | caption-region | (선택, pointing 예시) |
| fig12 | 14 | GR-ER 1.5의 progress understanding 세 형태 | caption-region | (선택, progress 예시) |
| fig13 | 14 | success detection 4가지 설정 | caption-region | ★ wiki 권장 (result) |
| fig14 | 15 |  | caption-region | (선택) |
| fig15 | 16 | GR-ER 1.5의 thinking trace 예시 두 건 | caption-region | (선택, trace 예시) |
| fig16 | 17 | thinking 예산에 따른 성능 곡선 세 개 | manual | ★ wiki 권장 (result) |
| fig17 | 18 | long-horizon 평가 | caption-region | ★ wiki 권장 (result) |
| fig18 | 20 | ASIMOV-2.0 물리 안전 벤치마크 예시 | caption-region | (선택, 벤치마크 예시) |
| fig19 | 21 | ASIMOV-2.0 안전 평가 | caption-region | ★ wiki 권장 (safety) |
| fig20 | 21 | auto-red-teaming이 ER 모델의 환각을 찾아낸 사례 | caption-region | (선택) |
| fig21 | 32 | 시뮬레이션과 실제 로봇의 성공률 rank consistency | caption-region | (선택, 부록) |
| fig22 | 33 | 확장된 action generalization 벤치마크 5개 과제 사진 | caption-region | (선택) |
| fig23 | 34 | task generalization 과제 10종 실행 사진 | caption-region | (선택) |
| fig24 | 35 | Bi-arm Franka 일반화 벤치마크의 세 장면 | caption-region | (선택) |
| fig25 | 36 | Bi-arm Franka 플랫폼에서 일반화 항목별 성능 측정에 쓴 장면 변형 예시 | caption-region | (선택) |
| fig26 | 40 | Apollo humanoid 플랫폼에서 일반화 항목별 성능 측정에 쓴 장면 변형 예시 | caption-region | (선택) |
| fig27 | 43 | humanoid 일반화 정성 예시 | caption-region | (선택) |
| fig28 | 44 | Bi-arm Franka에서 ALOHA로의 cross-embodiment 과제 10종 실행 사진 | caption-region | (선택) |
| fig29 | 46 | ALOHA에서 Bi-arm Franka로의 cross-embodiment 과제 실행 사진 | caption-region | (선택) |
| fig30 | 46 | Apollo humanoid에서 Bi-arm Franka로의 cross-embodiment 과제 사진 | caption-region | (선택) |
| fig31 | 46 | ALOHA에서 humanoid로의 cross-embodiment 과제 사진 | caption-region | (선택) |
| fig32 | 48 | ALOHA multi-step 벤치마크 과제 8종 사진 | caption-region | (선택) |
| fig33 | 50 | Bi-arm Franka multi-step 벤치마크 과제 사진 | caption-region | (선택) |
| fig34 | 52 | Apollo humanoid multi-step 벤치마크 과제 사진 | caption-region | (선택) |
| fig35 | 54 | Figure 3과 같은 비교를 성공률로 다시 그린 그래프 | caption-region | (fig03의 성공률 버전, 부록) |
| fig36 | 55 | Figure 4의 데이터와 레시피 ablation을 성공률로 다시 그린 그래프 | caption-region | (fig04의 성공률 버전, 부록) |
| fig37 | 56 | multi-step 벤치마크에서 thinking을 켠 경우와 끈 경우의 성공률 | caption-region | (fig06의 성공률 버전, 부록) |
| fig38 | 59 | GR-ER 1.5의 추가 thinking 예시 | caption-region | (선택) |
| fig39 | 60 | ALOHA long-horizon 벤치마크 4과제 | caption-region | (선택) |
| fig40 | 61 | Bi-arm Franka long-horizon 벤치마크 4과제 사진 | caption-region | (선택) |
| fig41 | 62 | Figure 17의 long-horizon 평가를 성공률로 다시 그린 그래프 | caption-region | (fig17의 성공률 버전, 부록) |
| tab01 | 19 | long-horizon 평가의 실패 유형 비율 | manual | (본문 표로 대체) |
| tab02 | 31 | Gemini Robotics 1.5 model card 뒷부분 | table-region | (선택) |
| tab03 | 33 | 확장된 action generalization 과제 5종의 progress score 정의 | table-region | (선택) |
| tab04 | 35 | task generalization 과제의 progress score 정의 | table-region | (선택) |
| tab05 | 37 | Bi-arm Franka workbench 장면 과제의 progress score 정의 | table-region | (선택) |
| tab06 | 38 | Bi-arm Franka 컴퓨터 장면 과제의 progress score 정의 | table-region | (선택) |
| tab07 | 39 | Bi-arm Franka NIST Assembly Task Board 2 과제의 progress scor… | table-region | (선택) |
| tab08 | 39 | Bi-arm Franka workbench 장면 semantic generalization 과제의 pro… | table-region | (선택) |
| tab09 | 40 | Bi-arm Franka 컴퓨터 장면 semantic generalization 과제의 progress … | table-region | (선택) |
| tab10 | 41 | Apollo humanoid in-distribution과 visual generalization 과제의… | table-region | (선택) |
| tab11 | 41 | Apollo humanoid semantic generalization 과제의 progress score… | table-region | (선택) |
| tab12 | 42 | Apollo humanoid action generalization 과제의 progress score 정의 | table-region | (선택) |
| tab13 | 45 | Bi-arm Franka에서 ALOHA로의 cross-embodiment 벤치마크 progress sco… | table-region | (선택) |
| tab14 | 47 | ALOHA와 humanoid에서 Bi-arm Franka로의 cross-embodiment 벤치마크 pr… | table-region | (선택) |
| tab15 | 47 | ALOHA에서 humanoid로의 cross-embodiment 벤치마크 progress score 정의 | table-region | (선택) |
| tab16 | 49 | ALOHA multi-step 벤치마크 progress score 정의 | table-region | (선택) |
| tab17 | 51 | Bi-arm Franka multi-step 벤치마크 progress score 정의 | table-region | (선택) |
| tab18 | 53 | humanoid multi-step 벤치마크 progress score 정의 | table-region | (선택) |
| tab19 | 57 | embodied reasoning 학술 벤치마크 15종 상세 점수 | table-region | (본문 표로 대체) |
| tab20 | 58 | MMMU, GPQA, Aider Polyglot 점수 | table-region | (본문 표로 대체) |
| tab21 | 58 | 복잡한 pointing 벤치마크의 subtask별 점수 | table-region | (본문 표로 대체) |
| tab22 | 60 | ALOHA long-horizon 벤치마크 4과제의 progress score 정의 | table-region | (선택) |
| tab23 | 61 | Bi-arm Franka long-horizon 벤치마크 4과제의 progress score 정의 | table-region | (선택) |
