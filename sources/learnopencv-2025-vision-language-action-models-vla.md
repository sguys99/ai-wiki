---
title: "Vision Language Action Models (VLA) & Policies for Robots"
type: article
year: 2025
category: physical-ai
raw_path: raw/articles/learnopencv-2025-vision-language-action-models-vla.md
raw_filename: "learnopencv-2025-vision-language-action-models-vla.md"
source_collection: external
author: "LearnOpenCV"
url: "https://learnopencv.com/vision-language-action-models-lerobot-policy/"
publisher: "LearnOpenCV"
publication_date: "2025-04-11"
extractor_tier: "chrome"
tags: [physical-ai, vla, robot-learning, manipulation, humanoid]
figures:
  - id: fig01
    file: assets/learnopencv-2025-vision-language-action-models-vla/fig01.gif
    raw: raw/articles/learnopencv-2025-vision-language-action-models-vla-figures/fig01.gif
    caption: "글 머리의 VLA 로봇 제어 애니메이션 (4.4MB GIF)"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/learnopencv-2025-vision-language-action-models-vla/fig02.png
    raw: raw/articles/learnopencv-2025-vision-language-action-models-vla-figures/fig02.png
    caption: "RT-2의 co-fine-tuning과 closed-loop 제어. 웹 VQA와 로봇 action 데이터를 한 배치에 섞어 학습한 뒤 실기기에 배포한다"
    strategy: fetched
    curated: true
  - id: fig03
    file: assets/learnopencv-2025-vision-language-action-models-vla/fig03.png
    raw: raw/articles/learnopencv-2025-vision-language-action-models-vla-figures/fig03.png
    caption: "RT-2 내부. 이미지는 ViT로 패치화되고 언어 명령과 함께 LLM에 들어가며, 출력 숫자열을 de-tokenize하면 Δ병진·Δ회전이 나온다"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/learnopencv-2025-vision-language-action-models-vla/fig04.webp
    raw: raw/articles/learnopencv-2025-vision-language-action-models-vla-figures/fig04.webp
    caption: "action 문자열의 8개 슬롯 — 종료 여부, 위치 변화 3축, 회전 변화 3축, 그리퍼 개폐"
    strategy: fetched
    curated: true
  - id: fig05
    file: assets/learnopencv-2025-vision-language-action-models-vla/fig05.png
    raw: raw/articles/learnopencv-2025-vision-language-action-models-vla-figures/fig05.png
    caption: "RT-2의 chain-of-thought 실행 예시. Plan 문장을 먼저 내놓고 그 뒤에 숫자 action이 붙는다"
    strategy: fetched
    curated: true
  - id: fig06
    file: assets/learnopencv-2025-vision-language-action-models-vla/fig06.jpg
    raw: raw/articles/learnopencv-2025-vision-language-action-models-vla-figures/fig06.jpg
    caption: "OpenVLA 구조. DINOv2와 SigLIP 두 vision encoder → MLP projector → Llama 2 7B → action de-tokenizer → 7차원 제어값"
    strategy: fetched
    curated: true
  - id: fig07
    file: assets/learnopencv-2025-vision-language-action-models-vla/fig07.png
    raw: raw/articles/learnopencv-2025-vision-language-action-models-vla-figures/fig07.png
    caption: "ALOHA 2 양팔 teleoperation 장면. 사람이 조작기를 잡고 로봇과 함께 작업한다"
    strategy: fetched
    curated: true
  - id: fig08
    file: assets/learnopencv-2025-vision-language-action-models-vla/fig08.png
    raw: raw/articles/learnopencv-2025-vision-language-action-models-vla-figures/fig08.png
    caption: "FAST tokenizer 5단계 — 정규화된 action chunk → DCT → 양자화 → flatten → BPE 압축 토큰"
    strategy: fetched
    curated: true
  - id: fig09
    file: assets/learnopencv-2025-vision-language-action-models-vla/fig09.png
    raw: raw/articles/learnopencv-2025-vision-language-action-models-vla-figures/fig09.png
    caption: "π0 계열과 OpenVLA·Octo의 out-of-box 성능 비교. 셔츠 개기·식기 정리·장보기 봉투 담기 등 5개 과제"
    strategy: fetched
    curated: true
  - id: fig10
    file: assets/learnopencv-2025-vision-language-action-models-vla/fig10.jpg
    raw: raw/articles/learnopencv-2025-vision-language-action-models-vla-figures/fig10.jpg
    caption: "글 하단 홍보 블록의 Satya Mallick 프로필 사진 — 본문 내용과 무관"
    strategy: fetched
    curated: false
  - id: fig11
    file: assets/learnopencv-2025-vision-language-action-models-vla/page-full.png
    raw: raw/articles/learnopencv-2025-vision-language-action-models-vla-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

## 한 줄 요약 (One-line Summary)

RT-2부터 Gemini Robotics까지 VLA 아홉 갈래를 dual-system 관점으로 배열하고 Octo·OpenVLA·π0·GR00T N1은 LeRobot과 Hugging Face 체크포인트로 실제 돌려보는 코드까지 붙인 2025년 4월 튜토리얼.

## 1. 자료 정보 (Document Information)

- 매체: LearnOpenCV (Big Vision LLC 운영 블로그), 2025-04-11 게재
- 저자 서명 없음. 글 하단에 Satya Mallick(Big Vision·LearnOpenCV 창립자) 홍보 블록만 붙어 있다
- LearnOpenCV 로보틱스 시리즈 7편째. 앞선 글은 ROS 2·Carla·PID 제어·Visual SLAM·LiDAR SLAM을 다뤘다
- 본문 약 4.8만 자. 그중 절반 가까이가 실행 코드와 출력 로그다
- 코드는 회원가입 게이트("Download Code") 뒤에 있고 본문에 인용된 스니펫만 열려 있다

서베이 논문이 아니라 튜토리얼 블로그다. 각 모델을 한두 문단으로 소개한 뒤 바로 실행 코드로 넘어가는 리듬이 반복된다. 원문이 스스로 밝히듯 기준 시점은 2025년 4월이다. π0.5·GR00T N1.5·Helix 후속 발표가 빠진 이유다.

## 2. 주요 기여 (Key Contributions)

새 연구는 없다. 값은 세 군데서 나온다.

VLA를 다섯 유형으로 갈라놓은 분류가 이 글 고유다. 다른 자료에서 잘 안 보이는 축이라 기록해 둘 만하다.

| 유형 | 구성 | 예시 |
|---|---|---|
| Type-1 | VLM·LLM이 high-level 계획, 저수준 제어는 별도 policy | SayCan, PaLM-E |
| Type-2 | 이미지·영상 생성 모델이 high-level 계획 | SuSIE (UC Berkeley) |
| Type-3 | Type-1과 Type-2를 섞어 중간 단계를 계획 | HybridVLA |
| Type-4 | 단일 VLM이 perception·계획·제어를 end-to-end로 | (원문에 예시 없음) |
| Type-5 | VLM이 계획하고 diffusion이 실행 | GR00T N1, Octo |

Kahneman의 이중 처리 이론을 빌린 System 1 / System 2 프레임도 그중 하나다. 이 틀로 2025년 4월 시점의 SOTA를 정렬한다. 느린 쪽이 VLM으로 장면을 읽고 subtask를 쪼갠다. 빠른 쪽은 Transformer decoder나 diffusion으로 모터 명령을 뽑는다. GR00T N1과 Helix가 이 틀의 대표다. π0은 그와 대비되는 단일 generalist policy 계열로 분류한다. generalist policy는 과제별 fine-tuning 없이 하나의 모델로 여러 downstream 과제를 푸는 policy를 말한다.

남은 하나는 실행 코드다. Octo 추론 노트북은 원본 예제가 깨져 있어 직접 고쳤다고 밝힌다. OpenVLA·π0·GR00T N1은 공개 체크포인트를 그대로 불러 쓰는 최소 경로를 보여준다. π0 부분은 LeRobot 저장소를 clone해 `lerobot/pi0` 체크포인트로 pusht·aloha 환경을 평가한다. 커스텀 데이터셋 fine-tuning까지 명령 단위로 적어뒀다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### generalist policy가 나온 배경

출발점은 policy 정의다. policy는 현재 observation을 받아 다음 action을 정하는 함수다. 상태마다 action 하나를 확정하면 deterministic, action 위의 확률 분포를 내면 stochastic으로 갈린다. episode는 초기 상태에서 종료 상태까지의 한 실행 단위다. 그 안에서 상태·action·reward·다음 상태가 이어진다.

전통적 경로는 강화학습으로 reward를 최대화하거나 demonstration의 observation→action 쌍을 흉내 내는 behavioral cloning이었다. 어느 쪽이든 저수준 과제마다, 하드웨어 구성마다 policy를 따로 만들어야 했다. 데이터도 시간도 많이 든다. 여기서 질문이 나온다. LLM의 일반화를 가져와 이 반복을 없앨 수 있는가.

그렇다고 LLM만으로 되지도 않는다. 텍스트는 로봇이 놓인 물리적 제약을 담지 못한다. 실행 불가능한 subtask가 나오고 미세한 저수준 동작은 말로 다 적을 수도 없다. VLM은 이미지·영상 대규모 학습으로 일반화가 좋지만 action 데이터가 빠져 있다. VLA는 여기에 두 종류의 토큰을 더한다. state는 로봇 자신의 상태를 담은 토큰이다. 센서값·그리퍼 위치·각도 같은 값이 들어간다. action은 trajectory를 따라가기 위한 모터 명령 시퀀스다.

### RT-2

원문에 따르면 VLA라는 말 자체가 RT-2 논문에서 나왔다. vision 쪽 backbone은 PaLI-X 55B, embodied 쪽은 PaLM-E 12B다. 여기에 웹 데이터와 가중치를 높인 로봇 action 데이터를 함께 학습시킨다. 카메라 이미지와 자연어 질의를 받아 이산 action 토큰을 내놓는다. 이를 de-tokenize하면 end-effector의 위치·자세 명령이 된다. 출력 문자열은 8개 슬롯이다. 종료 여부 하나, 위치 변화 3축, 회전 변화 3축, 그리퍼 개폐 하나.

학습에 없던 과제를 푸는 emergent 능력이 관찰됐다. 인물 인식, 기호 이해, 추론이 그런 예이고 원문은 이를 웹 스케일 학습 덕으로 돌린다. 과제별 policy를 없앤 채 실행 가능한 행위를 직접 내놓은 첫 사례라는 평가다.

### Octo와 OXE 80만 건

Octo의 학습 데이터는 Open X-Embodiment의 로봇 demonstration 80만 건이다. UC Berkeley가 내놓은 오픈소스 generalist policy다. 명령은 언어 encoder를 거쳐 task 토큰으로, 이미지는 패치로 쪼개 CNN encoder를 거쳐 observation 토큰으로 들어간다. Transformer 출력 임베딩은 diffusion head가 action 토큰으로 디코딩한다. 저자들은 이산 action 토큰보다 diffusion decoder가 낫더라고 보고했다. 손목 카메라든 3인칭 카메라든 받는다. 작은 demonstration 데이터셋으로 fine-tuning해 새 embodiment에 붙인다. Tiny·Small·Base 세 종이 있고 Base가 93M이다.

### 7B로 55B를 넘긴 OpenVLA

Stanford의 OpenVLA는 Open X-Embodiment 97만 episode로 학습한 7B 오픈소스 모델이다. DINOv2 300M과 SigLIP 400M을 함께 쓰는 dual vision encoder가 이미지를 패치 임베딩으로 만든다. DINOv2는 공간 관계에, SigLIP은 언어 정렬에 강하다. MLP projector가 이를 LLM 임베딩 공간으로 옮긴다. Llama 2 7B가 언어 토큰과 함께 받아 위치·회전·그리퍼 상태의 변화량을 낸다. action 예측에 맞추려면 vision encoder까지 얼리지 말고 함께 학습해야 한다. 원문이 특히 강조하는 대목이다.

평가 플랫폼은 Franka Emika Panda 7-DoF 팔이고 control frequency는 5Hz다. control frequency는 로봇이 1초에 몇 번 새 action을 갱신하는지를 뜻한다. LoRA 같은 PEFT로 fine-tuning해도 원본과 비슷했다는 결과도 적혀 있다. VLA도 LLM처럼 next-token prediction과 cross-entropy loss로 학습하면 된다. 로봇 action space 전체를 255개 action 토큰으로 덮을 수 있다. 파라미터가 7분의 1인데도 RT-2-X 55B를 앞섰다. 단서는 붙는다. 웹 데이터로 학습하지 않은 탓에 분포 밖 입력에는 RT-2보다 약하다.

### QUAR-VLA와 ALOHA

MiLAB의 QUAR-VLA는 사족 보행 로봇을 겨냥한다. 다리 여럿을 조율하고 gait를 관리해야 하는 locomotion 문제다. 학습 데이터는 실제와 합성을 섞은 지형 주행이다. QUART-2는 observation 이미지 묶음과 언어 명령을 받아 2Hz로 이산 action 토큰을 낸다. 연속 action space는 255개 구간으로 나눠 쓴다.

ALOHA는 모델이 아니라 하드웨어다. 약 2만 달러로 만드는 양팔 teleoperation 플랫폼이다. 설계도와 3D 프린팅 지침까지 전부 공개돼 있다. teleoperation은 사람이 로봇을 원격으로 움직여 demonstration을 만드는 방식을 말한다. 원래 ALOHA에는 VLA가 들어 있지 않다. Mobile ALOHA·OpenVLA-OFT·π0·RDT-1B가 양팔 manipulation 평가대로 이 플랫폼을 쓰면서 사실상 공용 테스트베드가 됐다.

### π0 — flow matching으로 연속 action

Physical Intelligence의 π0은 PaliGemma 3B를 backbone으로 삼고 300M짜리 action expert를 붙인다. action expert는 로봇 상태와 action 토큰만 처리하도록 분리한 별도 가중치 묶음이다. VLM 쪽은 미래의 상태·action 토큰을 보지 못하게 막는다. 그래야 사전 지식으로 시각 정보를 해석하는 역할에 머문다. action expert는 vision·언어·상태 토큰 전부를 참조해 문맥에 맞는 action을 만든다.

핵심은 출력 방식이다. 이산 토큰 하나가 아니라 conditional flow matching으로 H=50 길이의 연속 action 시퀀스를 뽑는다. flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다. 무작위 noise에서 시작해 반복적으로 목표 방향으로 옮겨가며 매끄러운 모터 명령에 수렴한다. 기존 VLA가 쓰던 autoregressive 이산 토큰화는 50Hz급 실시간 제어에 비효율적이다. flow matching을 고른 이유가 거기 있다.

π0-FAST는 반대로 autoregressive로 돌아가되 토큰화를 바꿨다. FAST tokenizer는 action chunk를 압축해 이산 토큰으로 적는다. DCT로 시간 영역을 주파수 영역으로 옮긴 뒤 희소해진 계수를 flatten하고 BPE로 다시 압축하는 순서다. 저주파는 느리고 매끄러운 변화, 고주파는 급격한 변화에 대응한다. 실제 장면에서는 대개 저주파만 있으면 되므로 고주파는 버리거나 더 압축할 수 있다.

### Helix와 GR00T N1

Helix는 공개돼 있지 않다. Figure AI가 휴머노이드 상반신 제어를 겨냥해 만든 VLA다. 멀티로봇 데이터 약 500시간을 지도학습으로 돌렸고 구조는 dual-system이다. S2는 인터넷 규모로 pre-training된 7B 오픈웨이트 VLM이다. 단안 카메라 영상과 손목 자세·손가락 위치를 vision-language 임베딩 공간에 투영한다. 여기에 자연어 명령을 합쳐 하나의 연속 latent 벡터로 압축한다. S1은 80M cross-attention encoder-decoder Transformer다. vision backbone은 다단 스케일 convolution이고 시뮬레이션 pre-training에서 초기화했다. 같은 이미지와 상태를 받되 더 높은 주기로 처리해 200Hz로 closed-loop 제어를 돌린다. 과제 조건 부여는 S2가 넘긴 latent 벡터를 S1 토큰 공간으로 투영해 vision feature와 이어붙이는 식이다.

원문은 Helix의 특징 넷을 꼽는다. 여러 로봇이 실시간으로 협업할 수 있다. 머리 시선·손목·상체 자세·손가락까지 상반신 전체를 고속으로 제어한 첫 VLA다. 과제별 fine-tuning 없이 분포 밖 상황에서도 동작한다. 로봇 위에서 전부 돌아가며 BMW 공장에 상용 배치됐다. 초기 Figure 로봇은 GPT-4o로 구동됐다. 그런 대형 모델은 현실성이 없어 OpenAI와의 협업을 접고 자체 VLA를 만들었다는 배경도 덧붙인다.

같은 설계 원칙을 NVIDIA GR00T N1이 따른다. 2B 오픈 foundation model이고 backbone은 eagle2_hg_model이다. Omniverse·Cosmos 합성 데이터와 실제 휴머노이드 데이터를 함께 썼다. System 2가 vision과 언어로 물리 세계를 해석해 계획을 세운다. 그러면 System 1인 Diffusion Transformer가 denoising으로 120Hz의 매끄러운 모터 명령을 만든다. 코드 walkthrough에서 실제 출력 형태가 드러나는데 action은 관절마다 (16, N) 모양이다. 16은 예측 지평으로 t부터 t+15까지고 N은 자유도다. 팔은 어깨 pitch·roll·yaw에 팔꿈치 pitch, 손목 yaw·roll·pitch를 더해 7개다. 손은 손가락 5개와 엄지 굽힘까지 6개, 허리는 yaw·pitch·roll 3개다.

### Gemini Robotics

Gemini 2.0 멀티모달 위에 올린 계열로 20Hz 제어를 낸다. Gemini Robotics-ER은 로봇 action 데이터로 fine-tuning하지 않고 사전 지식의 공간 추론만으로 동작한다. Gemini Robotics는 여기에 action 데이터를 얹는다. perception·추론·action 생성을 별도 diffusion 없이 한 모델로 처리한다. 배치는 나눠 놓는다. high-level 추론을 맡는 distillation 버전은 클라우드에 둔다. 저수준 action decoder는 로봇의 온보드 컴퓨터에서 돌려 네트워크 지연을 메운다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

원문에는 벤치마크 표가 없다. 아래 표는 본문에 흩어진 수치를 모았다.

| 모델 | 규모·구성 | control frequency | 데이터 | 비고 |
|---|---|---|---|---|
| RT-2 | PaLI-X 55B + PaLM-E 12B | — | 웹 VQA + 가중된 로봇 action | 비공개 |
| Octo | 93M (Base) | — | OXE demonstration 80만 | Tiny·Small·Base |
| OpenVLA | 7B (DINOv2 300M + SigLIP 400M + Llama 2 7B) | 5Hz (Franka Panda 7-DoF) | OXE 97만 episode | action 토큰 255개, RT-2-X 55B 상회 |
| QUART-2 | — | 2Hz | 실제 + 합성 지형 주행 | action space 255구간 |
| ALOHA | 하드웨어 약 $20,000 | — | — | 설계 전면 공개 |
| π0 | PaliGemma 3B + action expert 300M | 50Hz | π Cross-Embodiment 데이터셋 | flow matching, H=50 |
| Helix | S2 7B VLM + S1 80M Transformer | S1 200Hz | 멀티로봇 약 500시간 | 온보드 실행, BMW 배치 |
| GR00T N1 | 2B (eagle2_hg_model) | S1 120Hz | Omniverse·Cosmos 합성 + 실기기 | 예측 지평 16스텝 |
| Gemini Robotics | Gemini 2.0 기반 | 20Hz | — | ER 변종은 action 데이터 미사용 |

π0 비교 그림 fig09의 다섯 과제는 셔츠 개기·식기 정리 쉬움/어려움·장보기 봉투 담기·토스트다. 여기서 π0은 평균 진행률 0.75~1.0을 낸다. 같은 과제에서 OpenVLA와 Octo는 사실상 0이다. π0-small조차 대부분의 과제에서 두 모델을 크게 앞선다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

원문에 손봐야 할 대목이 몇 군데 있다.

System 1을 설명하면서 "system 1's guided path or instructions를 실행한다"고 적었는데 문맥상 System 2가 맞다. 앞뒤 문단이 일관되게 System 2를 상위 계획자로 두고 있으므로 단순 오기로 읽힌다.

Type-5에 Octo를 넣은 분류도 의심스럽다. Type-5는 VLM이 high-level 계획을 맡고 diffusion이 실행하는 구조인데, Octo에는 VLM backbone이 없다. 언어 encoder와 CNN encoder를 붙인 93M Transformer에 diffusion head를 단 구성이다. "VLM이 계획한다"는 조건에 맞지 않는다. diffusion decoder를 쓴다는 공통점 하나로 묶인 것으로 보인다.

Octo가 RT-2 55B와 "동등한 성능"이라는 서술에도 근거가 없다. 원논문의 비교 대상은 OXE 위의 RT-1-X·RT-2-X다. 파라미터 600배 차이를 성능 동등으로 요약하려면 어떤 과제 집합에서인지가 명시돼야 한다.

각 모델을 한두 문단으로 소개하고 넘어가므로 아키텍처 선택의 근거나 ablation은 담기지 않는다. Gemini Robotics 절은 특히 짧다. 인용된 벤치마크 그림 두 장은 캡션만 있고 본문 해설이 없다. 본문 스니펫만으로는 재현도 되지 않는다. 코드가 다운로드 게이트 뒤에 있어서다.

기준이 2025년 4월이라 그 뒤에 나온 π0.5, GR00T N1.5, SmolVLA는 없다. LearnOpenCV 자신이 이 글에 SmolVLA 후속 튜토리얼 링크를 나중에 끼워 넣었다.

## 6. 관련 연구 (Related Work)

이 wiki에 원본을 이미 보유한 자료:

- `physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web` — 이 글이 VLA 용어의 출처로 지목한 논문. co-fine-tuning과 emergent 능력 서술이 대응한다
- `physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model` — dual vision encoder·255 action 토큰·LoRA 결과의 원출처
- `physical-ai/black-2024-pi0-a-vision-language-action-flow-model` — flow matching과 action expert의 원논문
- `physical-ai/figure-ai-2025-helix-a-vision-language-action` — 글이 통째로 인용한 Figure 발표문. S1/S2 파라미터와 주기 수치가 여기서 왔다
- `physical-ai/nvidia-2025-gr00t-n1-an-open-foundation` — GR00T N1 원논문. data pyramid와 latent action 학습은 이 글에 없다
- `physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation` — ACT와 ALOHA 플랫폼의 원논문
- `physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x` — Octo·OpenVLA가 공유하는 학습 데이터
- `physical-ai/huggingface-lerobot` — π0 walkthrough가 사용하는 프레임워크
- `physical-ai/cui-2025-openhelix-a-short-survey-empirical` — dual-system VLA를 실험으로 해부한 서베이. 이 글의 System 1/System 2 서술보다 판정 기준이 엄밀하다
- `physical-ai/engiuniverse-2025-14-key-physical-ai-papers` — 같은 계보를 한국어로 훑은 영상. 다루는 논문이 상당 부분 겹치고 온디바이스 최적화 축이 추가돼 있다
- `physical-ai/shukor-2025-smolvla-a-vision-language-action-model` — 이 글 이후 나온 경량 VLA. 원문이 후속 링크로 가리키는 대상

이 글에 나오지만 wiki에 원본이 없는 자료: Octo, QUAR-VLA·QUART-2, Gemini Robotics, SayCan, PaLM-E, SuSIE, HybridVLA, RDT-1B, OpenVLA-OFT. ingest 후보다.

## 7. 용어집 (Glossary)

- **Type-1 ~ Type-5**: 이 글이 제시한 VLA 5분류. high-level 계획을 무엇이 맡고 저수준 실행을 무엇이 맡는지로 가른다. 다른 자료에서는 잘 쓰이지 않는 축이다
- **Octo**: UC Berkeley의 93M 오픈소스 generalist policy. 언어·CNN encoder + Transformer + diffusion head
- **QUAR-VLA / QUART-2**: MiLAB의 사족 보행 로봇용 VLA. 2Hz, 이산 255구간
- **ALOHA**: A Low-cost Open-source Hardware System for Bimanual Teleoperation. 약 $20,000짜리 양팔 teleoperation 하드웨어이자 양팔 manipulation 공용 평가대
- **Gemini Robotics-ER**: Gemini 2.0의 공간 추론만으로 동작하는 embodied reasoning 변종. action 데이터로 fine-tuning하지 않는다
- **eagle2_hg_model**: GR00T N1의 backbone 이름. 코드에서 확인되는 구성은 SigLIP vision encoder 27층 + Llama decoder 12층
- **PEFT**: parameter-efficient fine-tuning. OpenVLA 절에서 LoRA를 가리키는 상위 범주로 쓰인다

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | VLA 로봇 제어 애니메이션 (4.4MB GIF) | fetched | (장식용) |
| fig02 | RT-2 co-fine-tuning과 closed-loop 제어 | fetched | ★ wiki 확정 (method) |
| fig03 | RT-2 내부 — ViT + LLM → de-tokenize | fetched | ★ wiki 확정 (architecture) |
| fig04 | action 문자열 8슬롯 구성 | fetched | ★ wiki 확정 (method) |
| fig05 | RT-2 chain-of-thought 실행 예시 | fetched | ★ wiki 확정 (example) |
| fig06 | OpenVLA 구조 | fetched | ★ wiki 확정 (architecture) |
| fig07 | ALOHA 2 양팔 teleoperation 장면 | fetched | ★ wiki 확정 (platform) |
| fig08 | FAST tokenizer 5단계 | fetched | ★ wiki 확정 (method) |
| fig09 | π0 vs OpenVLA·Octo 성능 비교 | fetched | ★ wiki 확정 (result) |
| fig10 | Satya Mallick 프로필 사진 | fetched | ✗ 본문 무관 |
| fig11 | 전체 페이지 스크린샷 | screenshot | ✗ 아카이브용 |

Step 3.5에서 fig02~fig09 여덟 장을 wiki 임베드로 확정했다. `--crop`으로 만든 `crop01.png` ~ `crop46.png` 46장이 `-figures/`에 함께 있다. 확인해 보니 임베드된 데모 영상 프레임과 쿠키 배너가 대부분이고 fig01~fig10과 겹치거나 판독 불가라 후보 목록에서 뺐다. 필요하면 `figures.json`에서 되살릴 수 있다.
