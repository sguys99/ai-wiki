---
title: "용어집 — Physical AI (Terminology Glossary)"
type: overview
year: 2026
category: overviews
source_collection: synthesis
glossary_domain: physical-ai
applies_to: [physical-ai, overviews, etc]
tags: [glossary, terminology, physical-ai, synthesis]
---

## 표기 원칙 (Conventions)

이 페이지는 physical-ai 도메인 전문 용어의 canonical 표기를 정하는 SSOT다. `sources/`와 `wiki/`의 한글 산문을 쓸 때 아래 표를 따른다.

- 전문 용어는 원어를 그대로 쓰고, 문서당 첫 등장 시 괄호 없이 서술형 한글 풀이를 한 문장 둔다. 예: "control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다."
- 원어에는 한글 조사를 그대로 붙인다: "policy가", "reward를", "world model이".
- canonical 표기가 한글(음차·표준 번역)인 용어는 그 한글만 쓴다. 표에 없는 표기 흔들림을 만들지 않는다.
- 금지 표기 열은 `scripts/lint_terms.py`의 검사 대상이다. `—`이면 지침만 있고 기계 검사는 없다. 복수 항목은 `·`로 구분하며 리터럴 부분 문자열로 검사된다(조사가 붙어도 잡힌다).
- 이 용어집은 frontmatter `applies_to`에 적힌 category의 파일에만 적용된다. "정책·행동·관측" 같은 단어가 다른 도메인에서 일반 의미(운영 정책 등)로 쓰이는 것까지 막지 않기 위해서다.
- 오탐이 큰 일반어는 단독으로 등재하지 않고 복합어·조사 결합형만 등재한다 (예: 행동 → `행동 공간·행동 토큰`).
- canonical이 개념 번역어인 용어(시연 데이터, 지시문 등)는 문서당 첫 등장 시 원어를 괄호 병기하고("시연 데이터(demonstration)") 이후에는 한 표기만 쓴다. 같은 문서에서 원어와 번역어를 섞지 않는다. 라틴 문자만 든 괄호는 `lint_terms.py`가 마스킹하므로 병기가 금지 표기로 오탐되지 않는다. (2026-09 개정)

## 용어 표 (Term Table)

| 원어 | canonical 표기 | 금지 표기 | 첫 등장 풀이 예문 | 비고 |
|---|---|---|---|---|
| policy | policy | 정책 | policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다 | RL 핵심 용어. physical-ai 문맥에서는 거의 항상 RL policy라 단독 금지 |
| generalist policy | generalist policy | — | generalist policy는 과제별 fine-tuning 없이 하나의 모델로 여러 downstream 과제를 푸는 policy다 | Octo·OpenVLA·π0 계열의 공통 목표. "범용 정책·일반 정책" 직역은 policy 행의 금지 표기가 이미 잡는다 |
| reward | reward | 보상 | reward는 policy가 얼마나 잘했는지를 알려주는 스칼라 신호다 | reward function·reward hacking 등 파생어도 원어 |
| observation | observation | 관측 | observation은 매 timestep에 policy가 받는 센서 입력이다 | 일반어 "관찰"은 lint 제외 — 다만 RL observation 의미로는 쓰지 않는다 |
| action | action | 행동 시퀀스·행동 토큰·행동 청킹·행동 정책 | action은 policy가 출력하는 제어 명령이다 | 단독 "행동"은 일반어라 복합어만 금지. "행동 공간"은 action space 행 |
| action space | action space | 행동 공간 | action space는 로봇이 낼 수 있는 action의 집합이다 | action 행과 중복이지만 명시 |
| relative EEF action space | relative EEF action space | 상대 말단 좌표계·상대 EEF 행동 공간 | relative EEF action space는 action을 절대 목표 pose가 아니라 현재 pose로부터의 변화량으로 적는 표현이다 | EEF는 end-effector 약어. GR00T N1.7이 사람·로봇 데이터에 공통으로 깔아 cross-embodiment 전이와 human video pre-training의 전제로 삼는다 |
| trajectory | trajectory | 궤적 | trajectory는 observation과 action이 시간순으로 이어진 실행 기록이다 | |
| episode | episode | — | episode는 과제 시작부터 종료까지의 한 실행 단위다 | 음차 "에피소드"도 피하고 원어 권장 (지침) |
| rollout | rollout | — | rollout은 policy를 실행해 trajectory를 만들어내는 과정이다 | |
| world model | world model | 세계 모델·월드 모델 | world model은 환경의 동역학을 학습해 미래를 예측하는 모델이다 | |
| latent | latent | 잠재 공간·잠재 변수·잠재 상태·잠재 표현 | latent는 관측되지 않는 내부 표현 공간을 가리킨다 | "잠재력" 같은 일반어 보호를 위해 복합어만 금지 |
| alignment / aligned | alignment | 에 정렬된·와 정렬된 | action에 alignment된 예측이란 실행 가능한 미래를 뜻한다 | "행동에 정렬된" 직역 실사례 차단. 정렬(sort) 의미 보호 위해 조사 결합형만 |
| imitation learning | imitation learning | 모방 학습·모방학습 | imitation learning은 시연 데이터를 흉내 내 policy를 학습하는 방법이다 | |
| behavioral cloning | behavioral cloning | 행동 복제·행동 모사 | behavioral cloning은 시연의 observation→action 쌍을 지도학습으로 흉내 낸다 | |
| teleoperation | teleoperation | 원격 조작·원격조작 | teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다 | 이미 원어로 정착 (22회) |
| demonstration | 시연 데이터 | demonstration | 시연 데이터(demonstration)는 사람이 만들어준 모범 실행 데이터다 | 2026-09 개정: 개념 번역어로 전환. 첫 등장 시 원어 병기 후 단일 표기. 병기 괄호는 lint가 마스킹한다 |
| instruction | 지시문 | — | 지시문(instruction)은 로봇에게 과제를 지정하는 자연어 문장이다 | 2026-09 신설. 기계 검사 없음 — verbal instruction, hindsight instruction 같은 원어 canonical 복합어와 substring이 충돌한다. 혼용 여부는 write-wiki 자체 검토로 관리 |
| end-effector | end-effector | 말단 장치·엔드 이펙터 | end-effector는 로봇 팔 끝에서 물체와 접촉하는 부분이다 | 음차도 금지, 원어 고정 |
| gripper | 그리퍼 | — | 그리퍼는 물체를 집는 end-effector의 한 형태다 | 음차 정착 |
| manipulation | manipulation | — | manipulation은 팔과 손으로 물체를 다루는 과제 영역이다 | "조작"은 일반어라 지침만 — 과제 분류 문맥에서는 원어 권장 |
| locomotion | locomotion | — | locomotion은 다리로 이동하는 과제 영역이다 | |
| whole-body control | whole-body control | 전신 제어·전신제어 | whole-body control은 균형과 이동을 포함해 몸 전체를 함께 제어하는 문제다 | |
| grasping | grasping | 파지 | grasping은 물체를 안정적으로 쥐는 동작이다 | |
| affordance | affordance | 행동 유도성·어포던스 | affordance는 물체가 허용하는 상호작용 가능성을 뜻한다 | |
| proprioception | proprioception | 고유수용감각 | proprioception은 관절 각도 같은 로봇 자신의 상태 감각 입력이다 | |
| value function | value function | 가치 함수 | value function은 상태가 앞으로 받을 reward의 기대값을 추정한다 | |
| dynamics | dynamics | — | dynamics는 상태가 action에 따라 어떻게 변하는지의 규칙이다 | "동역학"은 표준 번역이라 병용 허용 (지침) |
| control frequency | control frequency | 제어 주파수 | control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다 | WikiDocs 예문의 원형 |
| sim2real | sim2real | — | sim2real은 시뮬레이션에서 학습한 policy를 실기기로 옮기는 문제다 | 태그 어휘와 일치 |
| domain randomization | domain randomization | 도메인 무작위화 | domain randomization은 시뮬레이션 파라미터를 흔들어 sim2real 간극을 줄이는 기법이다 | |
| motion tracking | motion tracking | 동작 추적 | motion tracking은 mocap 목표 포즈를 프레임 단위로 따라가게 학습하는 과제다 | |
| retargeting | retargeting | — | retargeting은 사람 동작 데이터를 로봇 형상에 맞게 변환하는 과정이다 | |
| waypoint | waypoint | 경유점 | waypoint는 경로를 이루는 중간 목표 지점이다 | |
| reinforcement learning | 강화학습 | 강화 학습 | — | 표준 번역 허용, 붙여쓰기로 고정. 약어 RL 병용 가능 |
| supervised learning | 지도학습 | 지도 학습 | — | 표준 번역 허용, 붙여쓰기로 고정 |
| state | 상태 | — | — | 표준 번역 허용 |
| embodiment | embodiment | — | embodiment는 로봇의 물리적 형상과 그에 딸린 제어 API 구성을 뜻한다 | cross-embodiment 전이가 이 도메인 반복 주제. "구현체"는 소프트웨어 reference implementation, "체화"는 embodied AI 표준 번역이라 둘 다 오탐이 커 지침만 둔다 |
| embodiment tag | embodiment tag | embodiment 태그·구현체 태그 | embodiment tag는 어떤 로봇의 데이터인지 가리키는 문자열 키로, state·action 배열을 해석할 modality config를 고른다 | GR00T·LeRobot 양쪽이 쓴다. 대소문자를 구분하지 않고 pretrain/posttrain tag로 나뉜다 |
| flow matching | flow matching | 플로우 매칭·흐름 정합 | flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다 | diffusion의 변형. π0 계열 VLA의 action 출력부 |
| action chunking | action chunking | 행동 청킹·액션 청킹 | action chunking은 미래 여러 스텝의 action을 한 묶음으로 한 번에 예측하는 방식이다 | ACT에서 유래, π0는 H=50. action 행의 금지 표기와 짝을 이룬다 |
| execution horizon | execution horizon | 실행 지평·실행 horizon | execution horizon은 예측한 action 중 policy 호출 한 번에 실제로 실행하는 개수다 | action chunking과 짝을 이룬다. GR00T N1.7이 `--action-horizon`을 이 이름으로 개명해 예측 horizon과 구분했다 |
| real-time action chunking | real-time action chunking | 실시간 행동 청킹 | real-time action chunking은 추론 지연이 있어도 action chunk가 매끄럽게 이어지도록 학습 중에 지연을 흉내 내는 기법이다 | 약어 RTC 병용 가능. π0.7은 0~12 timestep 지연을 학습에 넣는다 |
| action tokenization | action tokenization | 액션 토큰화 | action tokenization은 연속값인 제어 명령을 정해진 구간으로 나눠 이산 토큰으로 바꾸는 기법이다 | RT-2가 세우고 OpenVLA가 오픈소스로 옮긴 표준 기법. 한글 직역 "행동 토큰화"는 action 행이 이미 잡는다 |
| action expert | action expert | 행동 전문가 | action expert는 로봇 상태와 action 토큰만 처리하도록 분리한 별도 가중치 묶음이다 | π0 고유 구성. VLM backbone과 나란한 두 번째 전문가 |
| code-as-policy | code-as-policy | 코드를 정책으로·코드 정책 | code-as-policy는 언어 모델이 perception·planning·control API를 조합해 실행 가능한 로봇 프로그램을 짜게 하는 제어 방식이다 | Liang 2023 이후 고유 기법명. CaP 약어 병용 가능 |
| primitive | primitive | 원시 동작·기본 동작 | primitive는 로봇 API가 노출하는 최소 실행 단위를 가리킨다 | motion primitive·control primitive 등 복합어도 원어 |
| co-training | co-training | 공동 학습·병행 학습 | co-training은 성격이 다른 여러 데이터 원천을 하나의 학습 mixture에 함께 넣는 방식이다 | π0.5 레시피의 축. glossary-llms의 co-fine-tuning(RT-2)과 구분 — 이쪽은 웹 데이터에 한정하지 않는다 |
| subtask | subtask | — | subtask는 high-level 추론이 텍스트로 내놓는 중간 단계 명령이다 | "하위 과제·부분 과제"는 기존 페이지에서 일반어로 쓰여 기계 검사에서 뺐다. 지침만 |
| subgoal image | subgoal image | 서브골 이미지·하위 목표 이미지 | subgoal image는 현재 subtask가 끝난 직후의 장면을 여러 카메라 시점으로 그린 목표 이미지다 | π0.7이 prompt modality로 세웠다. 실행 시점에는 world model이 생성한다. SuSIE·CoT-VLA 계보 |
| episode metadata | episode metadata | 에피소드 메타데이터 | episode metadata는 그 episode의 속도·품질·실수 여부를 prompt에 적어 둔 라벨 묶음이다 | π0.7 고유 구성. 품질이 뒤섞인 데이터를 거르지 않고 쓰게 해준다. 발표 글은 strategy metadata로도 부른다 |
| verbal instruction | verbal instruction | 구두 지시 | verbal instruction은 사람이 학습된 저수준 policy에 말로 subtask를 불러 과제를 끝내게 하며 모은 데이터다 | π0.5 고유 데이터 슬라이스(VI). 일반어 "언어 지시"는 지시 따르기 평가 문맥에서 널리 쓰여 금지 목록에서 뺐다 |
| FAST tokenizer | FAST tokenizer | — | FAST tokenizer는 action chunk를 압축해 이산 토큰으로 적는 방식이다 | Pertsch 2025. π0-FAST·π0.5 pre-training이 이걸 쓴다. 약어 FAST 단독 병용 가능 |
| knowledge insulation | knowledge insulation | 지식 절연·지식 격리 | knowledge insulation은 backbone을 FAST token으로 지도하고 action expert의 gradient는 backbone으로 흘리지 않는 학습 레시피다 | π0.5-KI에서 유래해 π0.7이 그대로 쓴다. 약어 KI 병용 가능 |
| compositional generalization | compositional generalization | — | compositional generalization은 학습에서 본 skill을 새로운 조합으로 엮어 미학습 과제를 푸는 능력이다 | π0.7이 로봇 foundation model의 grand challenge로 지목한 목표. 원어를 기본으로 쓰고 첫 등장 풀이에서만 "조합적 일반화"로 옮긴다 |
| world knowledge | world knowledge | 세계 지식 | world knowledge는 물체·행위·환경·예상되는 결과에 대해 모델이 미리 갖고 있는 사전 지식을 말한다 | Zhang 2026 서베이의 조직 축. 예측 장치인 world model과 구분해서 쓴다 |
| multimodal grounding | multimodal grounding | 멀티모달 그라운딩·다중모달 그라운딩 | multimodal grounding은 언어로 된 지식을 이미지·영상·물체·공간 관계에 붙이는 단계다 | VLM·MLLM이 맡는 층. 음차도 표기 흔들림이라 원어로 고정 |
| action grounding | action grounding | 행동 그라운딩·액션 그라운딩 | action grounding은 perception과 언어를 실행 가능한 action으로 잇는 단계다 | VLA가 맡는 층 |
| costmap | costmap | 코스트맵 | costmap은 로봇 주변 환경을 이동 가능 영역·장애물·팽창 비용으로 표현한 2D 격자 지도다 | Nav2 환경 표현. global/local 두 층. costmap filter·layer 등 파생도 원어 |
| behavior tree | Behavior Tree | 행동 트리·비헤이비어 트리 | Behavior Tree는 로봇의 의사결정을 트리 구조의 노드 조합으로 관리하는 제어 구조다 | 약어 BT 병용 가능. Nav2 조율 축 |
| action server | action server | 액션 서버 | action server는 오래 걸리는 작업을 요청받아 실행하며 feedback과 최종 결과를 돌려주는 ROS 2 통신 방식이다 | ROS 2 용어 |
| lifecycle node | lifecycle node | 생명 주기 노드·라이프사이클 노드 | lifecycle node는 configure·activate 같은 상태 전이를 명시적으로 관리하는 ROS 2 노드다 | lifecycle manager도 원어 |
| localization | localization | 로컬라이제이션 | localization은 로봇이 지도 안에서 자기 위치를 추정하는 문제다 | "위치 추정"은 일반어라 지침만 — localization 의미로는 원어 권장 |
| odometry | odometry | 오도메트리·주행기록계 | odometry는 바퀴·IMU 등으로 이동량을 누적해 로봇의 상대 위치를 추정하는 방법이다 | odom frame·visual odometry·LIO·VIO 등 파생도 원어. loop closure 없는 순수 추정이라는 점에서 SLAM과 구분 |
| point cloud | point cloud | 점군·포인트 클라우드 | point cloud는 LiDAR 등이 반환한 3D point의 집합이다 | FAST-LIO2 계열 SLAM 자료의 기본 입력 표현 |
| kNN search | kNN search | 최근접 이웃 탐색 | kNN search는 질의점에서 가장 가까운 k개의 point를 찾는 연산이다 | k-nearest neighbor. scan 정합과 map 질의의 병목 지점 |
| solid-state LiDAR | solid-state LiDAR | 고체형 LiDAR·솔리드 스테이트 LiDAR | solid-state LiDAR는 회전 기구 없이 프리즘이나 MEMS로 주사하는 신형 LiDAR다 | FoV가 좁고 scanning pattern이 비반복적이라 feature 기반 방법과 잘 안 맞는다 |
| dual-system VLA | dual-system VLA | 이중 시스템·듀얼 시스템 | dual-system VLA는 느린 대형 모델과 빠른 경량 policy를 서로 다른 주기로 함께 돌리는 VLA 구조다 | Cui 2025의 판정 기준은 System 1이 실시간 perception 입력을 직접 받는지 여부. 이 기준으로 π0·GR00T N1은 제외된다. System 1 / System 2 표기도 원어 고정 |
| CLIP loss | CLIP loss | — | CLIP loss는 대형 모델 출력을 아래층이 받는 텍스트 임베딩 공간에 맞추는 대조 정렬 손실이다 | dual-system 연결에 쓰일 때의 용법. fine-tuning에서는 필수지만 prompt tuning에서는 없는 쪽이 낫다 (Cui 2025) |
| projector pre-alignment | projector pre-alignment | 프로젝터 사전 정렬 | projector pre-alignment는 위아래를 잇는 MLP projector를 먼저 따로 학습시켜 두 feature 공간을 맞추는 1단계다 | 생략하면 dual-system 성공률이 0으로 떨어진다 (Cui 2025 Table 6). 2단계 학습의 전제 |
| multimodal reasoning learning | multimodal reasoning learning | 멀티모달 추론 학습 | multimodal reasoning learning은 latent에서 position·rotation·개폐를 직접 예측하게 해 대형 모델이 시각 입력을 실제로 쓰도록 강제하는 보조 과제다 | OpenHelix 고유 명명. 추가 데이터 없이 붙는다 |
| visuomotor policy | visuomotor policy | 시각-운동 정책·시각운동 정책 | visuomotor policy는 이미지를 직접 받아 모터 명령을 내는 policy를 말한다 | dual-system VLA의 System 1이 이 형태다. Helix는 80M Transformer, GR00T N1은 flow-matching DiT |
| hindsight instruction | hindsight instruction | 사후 지시문·사후 지시 | hindsight instruction은 이미 수집된 영상을 보고 그 동작을 시킬 만한 지시문을 되물어 사후에 붙인 자연어 라벨이다 | Figure AI 2025(Helix)가 auto-labeling VLM으로 생성. teleoperation 데이터에 언어 조건을 붙이는 저비용 경로 |
| world foundation model | world foundation model | 세계 기반 모델·월드 파운데이션 모델·세계 파운데이션 모델 | world foundation model은 여러 downstream Physical AI 환경으로 fine-tuning될 것을 전제로 학습한 범용 world model이다 | 약어 WFM 병용 가능. NVIDIA Cosmos 2025가 세운 이름. world model 행과 glossary-llms의 foundation model 행을 합친 복합어라 표기가 흔들리기 쉬워 따로 고정한다 |
| perturbation | perturbation | 섭동 | perturbation은 world model이 미래를 예측할 때 함께 받는 현재 입력으로, action·텍스트·무작위 입력을 한 이름으로 묶는다 | Cosmos 형식화의 c(t). 조건 입력의 종류를 가리지 않는다는 뜻이 담겨 직역하면 의미가 좁아진다. "교란"은 벤치마크 교란(LIBERO-Pro 등) 문맥에서 이미 널리 쓰여 기계 검사에서 뺐다 — 지침만 |
| physics alignment | physics alignment | 물리 정렬·물리 정합 | physics alignment는 시뮬레이터로 만든 물리적으로 옳은 영상을 정답 삼아 생성 결과가 물리 법칙을 지키는지 재는 평가 축이다 | NVIDIA Cosmos 2025가 도입한 평가 이름. glossary-llms의 alignment(가치 정렬) 행과는 다른 문맥이다 |
| video generative pre-training | video generative pre-training | 영상 생성 사전학습·비디오 생성 사전학습 | video generative pre-training은 언어 설명이 붙은 영상에서 미래 프레임을 맞히도록 모델을 먼저 학습시키는 단계다 | GR-1(Wu 2023)이 세운 이름. 로봇 trajectory 자체가 영상이라는 전제에서 출발해 GR-2·GR-3와 world-action model 계열로 이어진다. "사전학습" 직역은 glossary-llms의 pre-training 행이 이미 잡는다 |
| latent action | latent action | 잠재 행동·잠재 동작 | latent action은 두 프레임 사이의 시각적 변화를 action 라벨 없이 부호화한 벡터다 | LAPA(Ye 2024)가 VQ-VAE로 세운 표현. GR00T N1의 latent action space와 DreamGen의 pseudo action 라벨링이 모두 이걸 쓴다. latent 행의 금지 표기와 짝을 이룬다 |
| Inverse Dynamics Model | Inverse Dynamics Model | 역동역학 모델 | Inverse Dynamics Model은 두 프레임만 보고 그 사이를 채울 action chunk를 되짚어 예측하는 모델이다 | 약어 IDM 병용 가능. action 라벨이 없는 영상에 pseudo action을 붙이는 표준 경로. dynamics 행이 "동역학"을 병용 허용하는 것과 달리 이 복합어는 원어로 고정한다 |
| neural trajectory | neural trajectory | 신경 궤적·뉴럴 궤적 | neural trajectory는 video world model이 만들어낸 합성 trajectory 데이터다 | DreamGen(Zhu 2025)이 세운 이름. GR00T N1.5 pre-training 데이터에 들어간다. robot state가 없어 상태 입력을 0으로 조건화해 쓴다. trajectory 행의 "궤적" 금지와 짝 |

## 신규 용어 추가 절차 (Growth Loop)

sources·wiki 작성 중 이 표에 없는 전문 용어를 만나면 본문에는 원어 + 첫 등장 풀이로 즉시 쓰고, Step 3.5 confirm 시점에 "용어집 추가 후보"로 함께 보고한다. 사용자가 승인하면 이 표에 행을 추가하고 같은 커밋에 포함한다. 자세한 절차는 `write-wiki` 스킬을 따른다.

## 관련 페이지 (Related Pages)

- [[overviews/glossary-llms]] — 모델 학습 일반 용어 (pre-training, fine-tuning 등). physical-ai 페이지에도 함께 적용된다
- [[overviews/glossary-agents]] — agentic 시스템 용어
- [[overviews/physical-ai-overview]] — 도메인 허브
