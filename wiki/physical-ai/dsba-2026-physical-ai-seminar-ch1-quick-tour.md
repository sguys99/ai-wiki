---
title: "[Physical AI Seminar] Ch.1: 피지컬AI 빠르게 둘러보기"
type: video
year: 2026
category: physical-ai
source: dsba-2026-physical-ai-seminar-ch1-quick-tour.md
raw_path: raw/videos/dsba-2026-physical-ai-seminar-ch1-quick-tour.md
raw_filename: "dsba-2026-physical-ai-seminar-ch1-quick-tour.md"
source_collection: external
channel: "서울대학교 산업공학과 DSBA 연구실"
presenter: "김한결 (SNU 산업공학과 DSBA 연구실 석사과정)"
url: "https://www.youtube.com/watch?v=TTrz7vj2li8"
video_id: "TTrz7vj2li8"
upload_date: "2026-10-27"
duration: "PT55M17S"
tags: [physical-ai, vla, world-model, robot-learning, robot-dataset, video]
figures:
  - id: slide11
    label: Slide 11
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide11.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-ch1-quick-tour-figures/slide11.png
    caption: "로보틱스 역사 네 시기 (고전 로보틱스, Deep RL, 데이터와 Transformer, foundation model 경쟁)"
    timestamp: "04:52"
    strategy: keyframe
    curated: true
  - id: slide12
    label: Slide 12
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide12.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-ch1-quick-tour-figures/slide12.png
    caption: "패러다임 전환 (모듈형 파이프라인에서 end-to-end를 거쳐 robot foundation model로)"
    timestamp: "05:44"
    strategy: keyframe
    curated: true
  - id: slide19
    label: Slide 19
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide19.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-ch1-quick-tour-figures/slide19.png
    caption: "병목 1 데이터 격차 (학습 데이터 규모 로그 스케일 비교)"
    timestamp: "10:22"
    strategy: keyframe
    curated: true
  - id: slide21
    label: Slide 21
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide21.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-ch1-quick-tour-figures/slide21.png
    caption: "병목 3 실시간성과 closed-loop와 비가역성 (VLM 추론 주기와 로봇 제어 주기 비교)"
    timestamp: "11:52"
    strategy: keyframe
    curated: true
  - id: slide22
    label: Slide 22
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide22.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-ch1-quick-tour-figures/slide22.png
    caption: "병목 4 일반화 격차 (LIBERO-PRO, LIBERO-Plus, LIBERO-Gen, BEHAVIOR 수치)"
    timestamp: "12:24"
    strategy: keyframe
    curated: true
  - id: slide25
    label: Slide 25
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide25.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-ch1-quick-tour-figures/slide25.png
    caption: "기본 용어와 closed-loop 파이프라인 (observation, policy, action, 환경)"
    timestamp: "13:59"
    strategy: keyframe
    curated: true
  - id: slide29
    label: Slide 29
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide29.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-ch1-quick-tour-figures/slide29.png
    caption: "데이터 수집 방식 네 가지 (teleoperation, UMI, human egocentric video, 시뮬레이션 합성)"
    timestamp: "16:51"
    strategy: keyframe
    curated: true
  - id: slide30
    label: Slide 30
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide30.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-ch1-quick-tour-figures/slide30.png
    caption: "대표 데이터셋과 NVIDIA GR00T data pyramid"
    timestamp: "17:47"
    strategy: keyframe
    curated: true
  - id: slide31
    label: Slide 31
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide31.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-ch1-quick-tour-figures/slide31.png
    caption: "학습 패러다임 비교 (imitation learning과 RL)와 VLA 표준 학습 레시피 4단계"
    timestamp: "18:25"
    strategy: keyframe
    curated: true
  - id: slide33
    label: Slide 33
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide33.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-ch1-quick-tour-figures/slide33.png
    caption: "대표적인 policy 구조 (입력, encoder, backbone, action head, 로봇 제어기)"
    timestamp: "20:21"
    strategy: keyframe
    curated: true
  - id: slide34
    label: Slide 34
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide34.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-ch1-quick-tour-figures/slide34.png
    caption: "로봇의 action 표현 (joint space와 end-effector space)과 제어 계층"
    timestamp: "21:05"
    strategy: keyframe
    curated: true
  - id: slide36
    label: Slide 36
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide36.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-ch1-quick-tour-figures/slide36.png
    caption: "action chunking의 원리와 효과 (16스텝 예측 중 앞 8스텝 실행)"
    timestamp: "22:59"
    strategy: keyframe
    curated: true
  - id: slide37
    label: Slide 37
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide37.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-ch1-quick-tour-figures/slide37.png
    caption: "Diffusion Policy와 flow matching 비교 (다봉 분포 표현과 학습 목적식)"
    timestamp: "24:54"
    strategy: keyframe
    curated: true
  - id: slide38
    label: Slide 38
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide38.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-ch1-quick-tour-figures/slide38.png
    caption: "System 2와 System 1 계층 구조와 모델별 주기"
    timestamp: "26:23"
    strategy: keyframe
    curated: true
  - id: slide42
    label: Slide 42
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide42.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-ch1-quick-tour-figures/slide42.png
    caption: "World model이 필요한 이유 (반응형 VLA와 상상 후 행동하는 world model)"
    timestamp: "30:11"
    strategy: keyframe
    curated: true
  - id: slide46
    label: Slide 46
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide46.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-ch1-quick-tour-figures/slide46.png
    caption: "World model 활용 다섯 가지 (데이터 생성, policy 평가, 계획, 상상 속 RL, policy backbone)"
    timestamp: "34:55"
    strategy: keyframe
    curated: true
  - id: slide49
    label: Slide 49
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide49.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-ch1-quick-tour-figures/slide49.png
    caption: "Physical AI 진영 지형도 (VLM 대 world model, 하드웨어 수직계열화 대 플랫폼)"
    timestamp: "37:30"
    strategy: keyframe
    curated: true
  - id: slide60
    label: Slide 60
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide60.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-ch1-quick-tour-figures/slide60.png
    caption: "Base VLA의 한계와 여섯 가지 확장 방향"
    timestamp: "44:04"
    strategy: keyframe
    curated: true
  - id: slide64
    label: Slide 64
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide64.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-ch1-quick-tour-figures/slide64.png
    caption: "비동기 실시간 실행 (동기식과 비동기식 추론 실행 타임라인)"
    timestamp: "47:40"
    strategy: keyframe
    curated: true
  - id: slide66
    label: Slide 66
    kind: figure
    file: assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide66.png
    raw: raw/videos/dsba-2026-physical-ai-seminar-ch1-quick-tour-figures/slide66.png
    caption: "VLA와 WAM 비교 (DreamZero, Cosmos Policy, mimic-video)"
    timestamp: "49:09"
    strategy: keyframe
    curated: true
---

## 요약

이 페이지는 서울대학교 산업공학과 DSBA 연구실 Physical AI 세미나의 첫 세션 영상(55분, 2026-10-27)을 정리한다. 발표자 김한결(석사과정)은 Physical AI 전체 가운데 손을 쓰는 로봇의 두뇌, 즉 robot manipulation을 위한 VLA와 world model에 초점을 두고 분야를 한 바퀴 훑는다. 슬라이드 제목은 "Physical AI: Landscape, Basics, and Research Directions (From VLA to World Models)"이고 73장으로 구성된다.

강의의 축은 두 가지다. 첫째, 로보틱스가 NLP의 발전 경로(규칙 기반 → task별 딥러닝 → pre-training된 foundation model)를 3~4년에 압축해 따라가고 있다는 관점이다. VLA 학습 레시피, 추론 방식, in-context 학습까지 LLM에서 일어난 일이 로봇에서 반복된다. 둘째, 그런데도 LLM의 성공 공식이 그대로 통하지 않는 이유가 있다는 점이다. 데이터 격차, embodiment 이질성, 실시간성, 일반화 격차의 네 병목이 그 이유다.

이 페이지는 강의 순서를 따라 여섯 부분으로 나눈다. 분야의 등장 배경, 네 병목, 기본 구성 요소, world model, 주요 진영, 확장 방향과 연구 주제다. 슬라이드에는 음성에서 말하지 않은 수치와 표가 많아, 키프레임으로 캡처한 슬라이드 내용을 음성과 함께 반영했다. 슬라이드의 수치는 발표자가 각 슬라이드 우상단에 표기한 출처를 옮긴 2차 인용이다.

## 배경

이 세미나는 DSBA 연구실이 Physical AI 연구를 새로 시작하면서 기획한 시리즈의 첫 회다. 연구실 세미나는 VLA와 world model에 집중하고, 첫 회는 분야 전반을 포괄적으로 다룬다. 발표자가 공개한 커리큘럼(https://uye01.github.io/physical-ai-curriculum-2026/)이 이후 회차의 순서를 정한다.

강의는 Generalist AI의 GEN-1.5 데모 영상으로 시작한다. 3~12초의 짧은 시연을 한 번 보여 주면 처음 보는 작업을 곧잘 따라 하고, 시뮬레이션 시연이나 사람 시점 영상으로도 가르칠 수 있으며, 중간에 사람이 방해해도 회복한다. 발표자는 이것이 놀라우면서도 다루는 task가 여전히 초보적이고 단순하다고 본다. GEN-1.5 블로그 그림은 가운데에 pre-training된 모델을 두고 바깥에 task별로 몇 스텝씩만 추가 fine-tuning한 가중치를 배치하는데, 그 task 이름들이 사람에게는 너무 간단한 일인데도 개별 task로 나눠 다룰 만큼 로봇 AI가 어렵다는 것이 발표자의 인상이다.

강의가 제시하는 시대 구분은 다음과 같다. 고전 로보틱스는 규칙과 모델 기반 제어였고, 2015년부터는 Deep RL, 2022년부터는 대규모 데이터와 Transformer가 들어왔으며, 2025년 이후는 foundation model 경쟁 단계다. 분기점은 2023년 Google의 RT-2로, VLM이 그대로 로봇을 제어할 수 있음을 보였고 VLA라는 용어가 여기서 나왔다.

![[assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide11.png]]
*Slide 11: 로보틱스 역사 네 시기 (고전 로보틱스, Deep RL, 데이터와 Transformer, foundation model 경쟁) (DSBA 2026, 04:52)*

| 시기 | 대표 사건 |
|---|---|
| 고전 로보틱스 (1960s~2000s) | Unimate (1961, GM 공장의 첫 산업용 로봇), Shakey (1966~72, 지각과 계획 로봇), 모델 기반 제어와 motion planning |
| Deep RL (2015~2019) | DARPA Robotics Challenge (2015, 우승 KAIST DRC-HUBO), end-to-end visuomotor policy (2016), OpenAI Dactyl 루빅스 큐브 (2019) |
| 데이터와 Transformer (2022~24) | SayCan, RT-1 (2022), Diffusion Policy, ACT (2023), RT-2의 'VLA' 용어 등장 (2023), Open X-Embodiment (2023), OpenVLA, π0 (2024) |
| Foundation model 경쟁 (2025~26) | GR00T N1, Gemini Robotics (2025), π0.5, V-JEPA 2, π*0.6 RL (2025), DreamZero 'WAM', π0.7, Gemini Robotics 2, GEN-1.5 (2026) |

## 핵심 개념

강의 전체에서 반복되는 개념을 먼저 풀이한다.

**Physical AI.** 발표자는 NVIDIA의 정의를 빌려 Physical AI를 물리 세계를 지각하고 이해하고 추론해서 그 안에서 직접 행동하는 AI로 정의한다. 기존 AI와의 가장 큰 차이는 출력이 텍스트나 이미지가 아니라 물리적 행동이라는 점이다. 학계에서는 Embodied AI, 산업과 행정에서는 Physical AI라는 말을 쓰며 사실상 같은 대상을 가리키지만 단일 합의 정의는 없다.

**VLA.** VLA는 vision-language-action model의 약어로, pre-training된 VLM에 action 생성 모듈을 더한 모델이다. VLM이 이미지와 언어를 이해해 representation을 만들고, action 생성 모듈이 그것을 바탕으로 로봇이 실행할 연속 action을 만든다.

**policy와 closed-loop.** policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. observation은 매 시점 policy가 받는 센서 입력(카메라 이미지, 로봇 상태, 언어 지시)이다. closed-loop 제어는 매 시점 새 observation을 받아 action을 다시 정하는 방식이며, 로봇은 이 루프를 초당 수십~수백 번 반복한다.

**proprioception.** proprioception은 관절 각도, 그리퍼 개폐, 손끝 위치처럼 로봇 자신의 상태를 감지한 입력이다. VLA는 카메라 이미지와 언어 지시에 더해 이 값을 토큰으로 받는다.

**embodiment.** embodiment는 로봇의 물리적 형상과 그에 딸린 제어 구성을 뜻한다. 관절 수, 그리퍼와 손의 구분, 카메라 위치, 제어 방식이 다르면 embodiment가 다르다. 여러 몸의 데이터를 한 모델로 학습하는 것을 cross-embodiment라 한다.

**action chunk.** action chunk는 policy가 한 번에 출력하는 여러 시점 분량의 action 묶음이다. 1초 분량을 묶어 예측하는 것이 흔하다.

**flow matching.** flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다. 최신 VLA의 action 생성 모듈 대부분이 이 방식을 쓴다.

**world model.** world model은 환경의 동역학을 학습해 미래를 예측하는 모델이다. 현재 action을 넣으면 그 결과로 세상이 어떻게 바뀔지 예측하므로, 로봇이 행동하기 전에 결과를 상상하게 해 준다.

**sim2real.** sim2real은 시뮬레이션에서 학습한 policy를 실제 로봇으로 옮기는 문제다. 시뮬레이션과 실제 세계의 차이 때문에 성능이 떨어지는 현상을 sim2real gap이라 부른다.

## Physical AI가 주목받는 이유

### Digital AI와의 차이

Physical AI는 VLM의 지능에 몸과 실시간 closed-loop를 더한 것이다. 슬라이드 7은 두 분야를 여섯 항목으로 비교한다.

| 항목 | Digital AI (LLM, VLM) | Physical AI (VLA) |
|---|---|---|
| 출력 | 토큰, 묘사(describe) | 연속 action a(t : t+H), 행동(act) |
| 시간 | one-shot, 틀리면 재생성 | 50~200Hz closed-loop, 되돌릴 수 없음 |
| 세계 | 2D pixel과 text, 물리 법칙 무관 | 3D, 중력, 마찰, 충돌 |
| 감각 | vision, language | + proprioception, force, tactile |
| 오류 비용 | 거의 없음 (regenerate) | 물리적이고 영구적 |
| 데이터 | web-scale, 수집(scraped) | 직접 구매와 수집(bought) |

출력 형태의 차이가 가장 크다. LLM은 이산적인 토큰을 내지만 VLA는 연속적인 action을 50~200Hz로 실시간 생성해야 한다. 오류 비용도 다르다. 챗봇은 틀리면 다시 생성하면 되지만 로봇이 컵을 떨어뜨리면 컵이 깨진다. 데이터는 인터넷에 충분하지 않고 그대로 쓰기도 어려워 직접 수집해야 하는 경우가 많다.

Physical AI의 범위는 manipulation, locomotion, humanoid(whole-body control), 자율주행, 드론, 산업 및 수술 로봇의 여섯 영역이다. 이 강의는 연구와 투자가 가장 집중된 manipulation, 즉 손을 쓰는 로봇의 AI를 다룬다.

### 시장과 투자

자본과 시장 전망이 연구 성과보다 먼저 움직이고 있다. 슬라이드 8과 9의 수치는 다음과 같다.

| 지표 | 값 | 출처 (슬라이드 표기) |
|---|---|---|
| humanoid 시장 2035년 전망 | 380억 달러 (2024.02) → 1,380억 달러, 650만 대 (2026.08 상향) | Goldman Sachs |
| humanoid 시장 2050년 전망 | 5조 달러 이상 | Morgan Stanley |
| 가동 중인 산업용 로봇 | 500만 대 | IFR World Robotics 2026 |
| 2030년 연 출하 | 120만 대, 중국산 BOM 3만 5천 달러 → 1만 7천 달러 미만 | BofA |
| 하드웨어 단가 | 1년 새 약 40% 하락 | |
| 산업용 로봇 신규 설치 | 2025년 60만 대 이상 (중국 59%) | |
| Robotics와 Physical AI VC 투자 | 137억 달러 (2024) → 276억 달러 (2025) → 188억 달러 (2026 H1) | PitchBook, Crunchbase |

Goldman Sachs는 2년 반 만에 전망을 약 3.6배 올렸다. VC 투자는 2025년에 전년의 두 배가 됐고, 2026년에는 6월에 이미 역대 연간 최대치를 넘었다. 주요 기업의 밸류에이션은 아래와 같다.

| 기업 | 성격 | 밸류에이션 | 시점 |
|---|---|---|---|
| Figure AI | humanoid 풀스택 | 390억 달러 | 2025.09 |
| Skild AI | 범용 로봇 두뇌 | 140억 달러 이상 | 2026.01 |
| Physical Intelligence | 범용 로봇 두뇌 | 56억 달러 (약 110억 달러 보도) | 2025.11 |
| Generalist AI | 데이터 스케일링 | 30억 달러 | 2026.08 |
| AMI Labs (LeCun) | world model | 시드 10억 3천만 달러 | 2026.03 |
| Unitree | humanoid 하드웨어 | STAR 상장, 첫날 +460% | 2026.08 |

슬라이드 9는 Jensen Huang의 발언이 "The ChatGPT moment for robotics is coming"(CES 2025)에서 "is here"(CES 2026)로 바뀐 것을 인용하며, 지금을 연구 성과보다 자본이 먼저 몰리는 단계로 규정한다.

국가 단위의 움직임도 크다 (슬라이드 10).

- **중국**: 정부업무보고에 '체화지능'을 처음 명시했고(2025.03), 15차 5개년 계획(2026~30)의 핵심 산업으로 두었다. 1조 위안 규모 정부 주도 펀드를 조성하고 세계 humanoid 로봇 대회를 열었다. humanoid 관련 신규 채용 수요는 전년 대비 +215.8%다 (Liepin, 2026).
- **한국**: K-humanoid 연합(2025.04)이 2028년 공용 robot foundation model을 목표로 하고, 피지컬 AI 3대 메가프로젝트(2026.06), 국산 world model 사업(LG 주관, 서울대와 KAIST 등 참여)이 이어진다. 정부는 AI-로봇 전문 인력 1만 명 양성을 목표로 하며, 삼성은 RX 사업추진실을 신설했고(2026.07) LG와 현대차는 로봇 AI 조직을 확대했다.
- **일본, EU, 미국**: 일본은 2040년 AI 로봇 1,000만 대를 목표로 하고, EU는 Apply AI Strategy 안에서 robotics foundation model을 지원하며, 미국은 로보틱스 행정명령 검토가 보도됐다(2025.12).

발표자는 주변 연구실에서도 Physical AI를 새로 시작하는 곳이 많다며, 산학 전반의 인력 수요가 급증하고 있다고 본다.

### 패러다임 전환

로봇을 만드는 방식은 세 단계로 바뀌어 왔고, 그 순서가 NLP의 역사와 거의 같다.

![[assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide12.png]]
*Slide 12: 패러다임 전환 (모듈형 파이프라인에서 end-to-end를 거쳐 robot foundation model로) (DSBA 2026, 05:44)*

| 단계 | 구성 | 장점 | 단점 | NLP 대응 |
|---|---|---|---|---|
| 모듈형 파이프라인 | perception → state estimation → task, motion planning → control | 해석 가능, 안정적 | 비정형 환경과 새 물체에 취약, 모듈 간 오류 누적, 사람이 설계한 규칙에 의존 | rule, feature engineering |
| End-to-end learned policy | pixels → neural network → action | 지각과 행동의 통합 학습 | task 특화, 작업마다 새로 학습, 낮은 데이터 효율 | task-specific DL (RNN, CNN) |
| Robot foundation model (VLA) | 대규모 pre-training (web + 다중 로봇 데이터) → task post-training | web 지식 상속, 언어 지시, 다중 로봇과 task 일반화 지향 | 막대한 데이터와 연산, 신뢰성 | pre-training된 LM (BERT → GPT) |

과거에는 인식, 계획, 제어를 사람이 모듈별로 설계했다. 그다음에는 2D 영상 observation에서 로봇 action까지 하나의 모델로 학습하는 end-to-end 방식이 나왔고, 지금은 대규모 데이터로 pre-training한 뒤 task별로 post-training하는 foundation model 단계다. 발표자는 NLP가 10년 가까이 걸린 과정을 로보틱스가 그 교훈을 바탕으로 3~4년 만에 따라가는 느낌이라고 말한다.

### 지금 성장하는 이유

연구자들이 AI의 성공 공식에 익숙해졌다는 것 외에도 네 가지 요인이 맞물렸다 (슬라이드 13).

| 요인 | 내용 |
|---|---|
| VLM의 성숙 | web 지식이 로봇 제어로 전이된다는 것이 RT-2에서 확인됐고, OpenVLA와 π0가 open VLM 기반 VLA를 내놨다 |
| 하드웨어 가격 급락 | humanoid Unitree R1 5,900달러, 로봇팔 SO-101 부품비 약 230달러, AgileX PiPER 1,999달러 |
| 데이터 수집 인프라 | teleoperation 장비 (ALOHA, GELLO, UMI), 공개 데이터셋 (OXE, DROID, AgiBot World), GPU 병렬 시뮬레이터 |
| 컴퓨팅과 자본 | 학습 GPU와 탑재형 edge compute (Jetson Thor), 투자 급증과 실매출 발생 (Skild AI ARR 1억 달러) |

### 기대와 현실

2026년의 데모는 1~2년 전에는 불가능했던 장면을 보여 주지만, 데모와 실제 성능은 별개다. 슬라이드 14가 든 데모는 다음과 같다.

- Skild AI S1 (2026.08): 사람 영상 하나로 10분짜리 작업 수행.
- π0.7 (PI, 2026.04): 학습하지 않은 조합의 task, language coaching.
- Gemini Robotics 2 (2026.07): humanoid whole-body control, 22-DoF 손.
- Figure Helix 2.5 (2026.09): 처음 보는 가정 30곳에서 zero-shot.
- GEN-1.5 (Generalist AI, 2026.08): 3~12초 시연만으로 in-context 학습.
- AgiBot (2025): humanoid의 셔츠 개기.

발표자는 데모 영상이 잘 나온 것 위주로 편집됐을 것이라 실제 성능은 다를 수 있고, 아직 작업이 느리며 test time에서 잘 동작하지 않는 경우가 많다고 단서를 단다. 슬라이드 15는 현재 가능한 것과 아직 안 되는 것을 나눈다.

| 되는 것 | 아직 안 되는 것 |
|---|---|
| 정형 환경의 short-horizon 작업 (pick-and-place, 정리, 빨래 개기) | 처음 보는 환경, 물체, 지시에 대한 일반화 |
| task 데이터로 fine-tuning한 특정 작업 | 수십 분 이상의 long-horizon 작업 |
| 공장과 물류의 반복 작업 파일럿 | 산업 수준 신뢰도 (99.9%) |
| | 정교한 dexterous 작업과 접촉 작업 |

데모의 이면도 있다. Tesla Optimus 시연(2024.10) 다수는 원격 조종이었고, 1X NEO(2만 달러)는 'Expert Mode'에서 원격 operator가 대신 작업한다. 성공률 95%는 높은 수치처럼 보이지만 하루 500번 작업하면 25번 실패한다는 뜻이다. 발표자는 이 분야의 교수와 기업 연구원들에게서 "아직 task가 상당히 단순하고, training time에서 겨우 잘하는 수준이며 실제로 써 보면 test time에서 잘 작동하지 않는다"는 말을 많이 듣는다고 전한다. 그만큼 연구할 거리가 많다는 뜻이기도 하다.

### 여러 분야가 만나는 곳

Physical AI에는 아직 master solution이 없어서 여러 배경의 연구자가 자기 분야의 질문을 바로 가져올 수 있다 (슬라이드 16).

| 분야 | 질문 |
|---|---|
| LLM, VLM | 언어 지시, 계획, 추론을 어떻게 행동으로 옮기는가 |
| 3D vision | 2D 기반 encoder로 3D 정밀 조작이 가능한가 |
| video generation | 영상 생성 모델이 로봇의 시뮬레이터가 될 수 있는가 |
| 센서와 촉각 | 시각만으로 접촉과 힘을 다룰 수 있는가 |
| cross-embodiment | 로봇 기종과 센서가 달라도 하나의 모델로 일반화하려면 |
| 강화학습 | 시연 데이터를 넘어 스스로 개선하려면 |
| 로보틱스와 제어 | 수 Hz의 거대 모델로 수백 Hz 제어를 하려면 |
| 데이터와 시스템 | 수집, 정제, 평가 파이프라인과 경량화 |
| memory와 continual learning | 긴 작업의 기억과 평생 학습 |
| 멀티로봇과 멀티에이전트 | 역할 분담, 동기화, 충돌 회피 |

정해진 해법도, 어떤 방향이 맞는지에 대한 글로벌 컨센서스도 없다. 발표자는 이것이 어려움이면서 학계 연구자에게는 기회라고 본다.

## 어려운 이유

### Moravec's Paradox와 데이터 부족

인간에게 쉬운 감각운동이 AI에게는 가장 어렵다. Hans Moravec은 "컴퓨터에게 어른 수준의 지능 검사를 풀게 하는 것은 쉽지만, 지각과 이동에서 한 살 아이의 능력을 주는 것은 어렵거나 불가능하다"고 썼다 (Mind Children, 1988). 실제로 AI가 수학 난제를 증명하는 반면 빨래 개기나 처음 보는 컵 집기는 아직 어려워한다.

| AI에게 쉬운 것 | AI에게 어려운 것 |
|---|---|
| 수학 올림피아드 금메달 수준 추론 | 빨래 개기 |
| 체스, 바둑 | 식기 정리 |
| 코드 작성 | 처음 보는 컵 집기 |
| 시험, 지능 검사 | 한 살 아이의 감각운동 |

Physical Intelligence는 그 원인을 데이터 부족으로 해석한다. 신체 기술은 인터넷에 없고, 실제 세계에서 동작하는 데이터는 대규모로 모으기도 올리기도 어렵다. PI의 'Robot Olympics'에서 fine-tuning된 π0.5의 평균 성공률은 52%였고, 로봇 pre-training이 없는 VLM은 0%였다. 인간에게 쉬운 일은 수억 년 진화로 최적화된 감각운동 능력이라 명시적 지식으로 표현할 수 없고, 따라서 텍스트로 학습할 수 없다.

### 병목 1 데이터 격차

가장 큰 병목은 데이터다. LLM을 학습시킨 텍스트와 비교하면 로봇 데이터는 규모 차이가 너무 크다.

![[assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide19.png]]
*Slide 19: 병목 1 데이터 격차 (학습 데이터 규모 로그 스케일 비교) (DSBA 2026, 10:22)*

| 데이터 | 규모 |
|---|---|
| web text (Llama 3) | 15조 토큰 이상, 사람이 읽는 데 약 10만 년 |
| web image-text (LAION-5B) | 58억 5천만 쌍 |
| 인터넷 영상 (V-JEPA 2) | 100만 시간 이상 |
| 착용형 장치 (GEN-1) | 50만 시간 이상 |
| 로봇 teleoperation (π0) | 약 1만 시간 |
| 로봇 teleoperation (DROID) | 350시간 |

Goldberg는 이 차이를 "100,000-year data gap"이라 불렀다. 문제는 양만이 아니다.

- **비용 구조**: 로봇 데이터는 "bought, not scraped"다. 웹에서 수집할 수 없고 작업 1시간이 곧 데이터 1시간이라 operator 인건비, 장비, 현장 비용이 든다.
- **우회로**: 사람이 착용하는 장치로 데이터를 모은다. GEN-1은 이 방식으로 50만 시간 이상을 모았다.
- **데이터의 질**: 쉽게 모을 수 있는 영상에는 3D, 힘, 촉각 정보가 없다. 시연은 성공 위주라 실패하고 회복하는 데이터도 부족하다.

슬라이드는 이를 "LLM의 성공 공식(scraping + scaling)이 그대로 통하지 않는 첫 번째 이유"로 요약한다. 발표자는 LLM에서 경험한 scaling이 Physical AI에서 아직 그만큼 힘을 발휘하지 못하는 가장 큰 이유가 여기에 있다고 본다.

### 병목 2 embodiment 이질성

로봇은 제품마다 몸이 달라 간단한 집기 동작도 다른 환경이나 제품으로 쉽게 전이되지 않는다. 관절 수(DoF), 그리퍼와 손의 구분, 카메라 위치와 개수, control frequency, action 정의(joint 또는 end-effector)가 모두 다르다. LLM은 하나의 vocabulary를 공유하지만 로봇 action에는 공통 '언어'가 없고 표준화하기도 어렵다. 그 결과 데이터를 통합해 학습하기 어렵고 새 로봇마다 추가 수집과 학습이 필요하다.

대응 방법은 빠르게 나오고 있다 (슬라이드 20).

- **입출력 모듈 분리와 공유 trunk**: embodiment별 입출력 모듈을 따로 두고 가운데만 공유한다 (HPT, CrossFormer). CrossFormer는 팔, 바퀴 로봇, 드론, 4족 로봇을 하나의 Transformer로 다룬다.
- **데이터 원천별 조건화**: 데이터 원천마다 soft prompt를 두거나(X-VLA) action 차원을 padding으로 맞춘다(π0).
- **retargeting**: 사람 손 동작을 로봇 형상에 맞게 변환한다.

Open X-Embodiment는 22종 로봇, 21개 기관, 100만 개 이상의 trajectory를 모아 다기관 데이터 통합을 시작했다.

### 병목 3 실시간성, closed-loop, 비가역성

VLM 추론은 느린데 로봇은 빠른 명령을 요구한다. 3B 이상의 VLM이 한 번 추론하는 데 약 100~300ms가 걸려 수 Hz로 동작하지만, 로봇은 그동안에도 초당 50~200번 명령을 받아야 한다.

![[assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide21.png]]
*Slide 21: 병목 3 실시간성과 closed-loop와 비가역성 (VLM 추론 주기와 로봇 제어 주기 비교) (DSBA 2026, 11:52)*

| 항목 | 내용 |
|---|---|
| 실시간 제어 | 제어 50~200Hz, 전신 균형 제어 1kHz, VLM 추론은 수 Hz |
| closed-loop | 내 행동이 다음 입력을 바꾸고 작은 오차가 누적되어 학습 분포를 벗어난다 |
| 온디바이스 | 로봇 탑재 연산과 전력 한계 (Jetson Thor 130W), 경량화와 가속 필요 |
| 비가역성과 안전 | 깨진 컵은 regenerate 불가, 사람 근처 동작의 안전 보장 |

closed-loop 항목은 compounding error와 같은 현상을 가리킨다. compounding error는 policy의 작은 예측 오차가 다음 입력을 어긋나게 만들어 시간이 갈수록 커지는 현상이다. 발표자는 이 문제가 정답을 한 번 맞히는 문제가 아니라 정해진 시간 안에 계속 행동해야 하는 문제라 더 어렵다고 설명한다.

### 병목 4 일반화 격차

벤치마크 점수가 높아도 조건을 조금만 바꾸면 성능이 크게 하락한다. 현장의 공통 평가는 "아직 단순한 task 위주이고, 학습 분포 안에서도 겨우 잘하는 수준이며, 실제 배치 시 성능이 크게 하락한다"는 것이다.

![[assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide22.png]]
*Slide 22: 병목 4 일반화 격차 (LIBERO-PRO, LIBERO-Plus, LIBERO-Gen, BEHAVIOR 수치) (DSBA 2026, 12:24)*

| 벤치마크 | 수치 | 조건 |
|---|---|---|
| LIBERO-PRO | 90% 이상 → 0% | 물체 위치, 지시문 변경 시 |
| LIBERO-Plus | 95% → 30% 미만 | 카메라 시점, 초기 자세 변경 시 |
| LIBERO-Gen (π0.5) | 21.2% | 학습한 기술의 새 조합 (Task-CG) |
| BEHAVIOR 2025 1위 | 0.26 / 1.0 | 가장 long-horizon한 50개 task |

LIBERO-PRO에서는 지시문을 무의미한 토큰으로 바꿔도 로봇이 똑같이 움직인다. 발표자는 이를 모델이 언어를 이해했다기보다 action trajectory 자체를 외웠다는 뜻으로 해석한다. LIBERO-Plus에서도 모델은 언어 지시를 대부분 무시한다. 원인 가설은 세 가지다.

- 물체와 위치를 묶어 학습하는 spatial overfitting.
- 취약한 시각 표현.
- 데이터 다양성 부족.

따라서 모델이 지시와 observation의 의미를 정말 이해했는지, 아니면 action을 암기했는지 구분하는 평가 방법을 만드는 것 자체가 중요한 연구 과제가 되고 있다.

### scaling 논쟁

데이터만 늘리면 해결되는지에 대해서는 아직 합의가 없다. 데이터를 늘리면 나아지겠지만 scaling으로 어디까지 갈 수 있는지는 확실하지 않다.

| scaling 진영 (더 많고 더 다양한 데이터) | 구조 진영 (scaling만으로는 부족) |
|---|---|
| Data Scaling Laws (ICLR 2025): 일반화 성능이 환경과 물체 수에 대해 power law | compositional generalization 실패 (Task-CG 21%) |
| GEN-0 (Generalist): 27만 시간, 7B 이상에서 지속적 scaling (1B는 정체) | Brooks: "today's humanoid robots will not learn how to be dexterous", 영상에는 촉각과 힘이 없다 |
| EgoScale (NVIDIA): human video 2만 시간, 규모와 loss가 log-linear 관계이며 실제 로봇 성능을 예측 | world model 진영 (LeCun, AMI Labs): 다음 상태 예측으로 물리를 이해 |
| | 3D와 촉각 같은 구조적 prior 도입 |

양쪽의 공통 쟁점은 데이터의 '양'보다 '다양성'이며, teleoperation, human video, 시뮬레이션 가운데 어떤 데이터가 scalable한지다. Levine은 "Sporks of AGI"(2025)에서 시뮬레이션이나 human video 같은 대체 데이터는 결국 타협이라고 반론했다. 발표자의 결론은 LLM에서 본 emergent ability 같은 '와우 모멘트'가 로봇에서는 아직 뚜렷하지 않고, 데이터의 양보다 다양성이 중요하다는 정도가 알려져 있다는 것이다.

## 기본 구성 요소

### 기본 루프와 용어

Physical AI 시스템의 기본은 observation, policy, action, 환경이 이루는 closed-loop다. 카메라 이미지, 로봇 상태, 언어 지시를 입력으로 받아 학습된 policy가 action을 내고, 로봇이 그대로 움직이면 그 결과가 다시 observation으로 들어온다. 이 과정을 초당 50~200번 반복한다.

![[assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide25.png]]
*Slide 25: 기본 용어와 closed-loop 파이프라인 (observation, policy, action, 환경) (DSBA 2026, 13:59)*

| 용어 | 뜻 |
|---|---|
| policy π(a \| o, ℓ) | observation과 지시를 받아 action을 출력하는 학습된 모델 (VLA 등) |
| proprioception | 로봇 자신의 상태 (관절 각도, 그리퍼, 손끝 위치) |
| action space | joint position 또는 end-effector pose (후자는 IK 필요) |
| DoF | 독립 관절 수 (6-DoF 팔 + 그리퍼, 로봇 손은 12~22) |
| teleoperation | 사람이 로봇을 원격 조종해 시연 데이터를 수집하는 방식 |
| embodiment | 특정 로봇의 몸 (cross-embodiment는 여러 몸) |
| rollout과 success rate | 1회 실행, task당 10~100회 시행의 성공 비율 |
| control Hz와 sim2real | 초당 명령 횟수, 시뮬레이션 policy를 실제 로봇으로 옮기는 문제 |

teleoperation은 사람이 로봇의 움직임을 직접 조종하면서 trajectory 데이터를 만드는 방식이며, 아래 데이터 수집 절에서 다시 다룬다.

### 하드웨어

가장 흔한 연구 세팅은 6~7 DoF 로봇팔, 평행 그리퍼, 카메라 2~3대, teleoperation 장치다. 카메라는 손목(wrist)과 3인칭 시점을 섞는다. π0는 base 카메라 1대와 wrist 2대, DROID는 3인칭 stereo 2대와 wrist 1대를 쓴다. 센서는 RGB(-D) 카메라에 더해 힘과 토크 센서, 촉각 센서(GelSight, DIGIT)를 붙일 수 있지만 발표자는 촉각 센서가 생각보다 매우 비싸 갖추기 쉽지 않다고 말한다. 학습은 서버 GPU에서, 추론은 로봇 옆 workstation이나 Jetson에서 한다.

| 형태 | 예시 | 가격대 (USD) | 용도 |
|---|---|---|---|
| 저가 단일 팔 | SO-101 (LeRobot), Koch | 200~500 | 교육, 빠른 프로토타입 |
| 연구용 단일 팔 | AgileX PiPER / xArm / Franka FR3 / UR5e | 2,000 / 8,000~12,000 / 25,000~30,000 / 35,000 | 표준 연구 |
| 양팔 (bimanual) | ALOHA, Trossen AI Stationary | 약 20,000~24,000 | 세밀 작업, 빨래, 조립 |
| 모바일 매니퓰레이터 | Mobile ALOHA, Galaxea R1 Lite, Stretch | 30,000~70,000 | 가정, 이동 작업 |
| humanoid | Unitree G1 (EDU), H2 | 14,000부터 (EDU 44,000 이상), 41,000부터 | whole-body control 연구 |
| dexterous hand | LEAP / Allegro / Inspire | 2,000~21,000 | 손 조작 |

제품이 다양해져 몇십만 원대 저가 로봇부터 수천만 원대 연구용 로봇까지 선택지가 넓지만, 대부분의 VLA 연구는 단일 팔이나 양팔로 이루어진다.

### 시뮬레이터

시뮬레이션은 실제 로봇보다 빠르고 싸고 안전하게 데이터를 모으는 수단이다. 대규모 병렬 RL, 시연 데이터 생성, 재현 가능한 평가, 합성 데이터가 주된 목적이다. 슬라이드 27은 주요 프로그램을 비교한다.

| 프로그램 | 개발과 라이선스 | 강점 | 필요 사양 | 주 용도와 대표 벤치마크 |
|---|---|---|---|---|
| Isaac Sim / Isaac Lab | NVIDIA, 오픈소스 (일부 구성요소 비공개) | GPU 병렬 물리 (PhysX) + RTX 렌더링, 센서, VR teleoperation, 합성 데이터 | RTX GPU 16GB 이상, RAM 32~64GB, A100과 H100 미지원 (RT core 부재) | 대규모 RL, GR00T 데이터 생성, BEHAVIOR |
| MuJoCo | Google DeepMind (+NVIDIA), Apache-2.0 | 정확하고 가벼운 접촉 물리, JAX와 Warp로 GPU 병렬 확장 | CPU만으로 가능, GPU 병렬은 NVIDIA GPU | VLA 벤치마크의 기반 (robosuite → LIBERO, RoboCasa) |
| ManiSkill3 | UCSD Hao Su lab, Apache-2.0 | GPU 병렬 시뮬레이션과 렌더링, 30,000 FPS 이상 (RTX 4090) | NVIDIA GPU + Vulkan (Linux) | manipulation RL, IL, SimplerEnv, RoboTwin 2.0 |
| Genesis | Genesis AI와 커뮤니티, Apache-2.0 | 다중 물리 (강체, 천, 유체, MPM), 속도 주장 (4,300만 FPS)은 논쟁 중 | CUDA, ROCm, Metal, CPU | 변형 물체와 다중 물리 연구, 벤치마크 채택은 적음 |
| Newton (차세대 엔진) | NVIDIA, DeepMind, Disney, Apache-2.0 | Warp 기반 GPU 물리, MuJoCo Warp 통합, 1.0 출시 (2026.03) | Turing 이상 NVIDIA GPU | Isaac Lab 3.0 기본 backend, Isaac Sim 없이 학습 |

대규모 강화학습에는 Isaac Lab을, VLA 벤치마크에는 MuJoCo 기반 환경을 많이 쓴다. 발표자는 Isaac이 렌더링에 RT core를 요구해 A100이나 H100에서 동작하지 않으므로 RTX GPU 중에서도 40 시리즈 이상이 필요하다는 점을 아쉬운 점으로 든다. 발표자 연구실은 Isaac Sim을 A6000에서, MuJoCo, ManiSkill3, Newton을 A100과 H100에서 쓴다. 그 밖에 Gazebo(ROS 생태계), PyBullet(교육, legacy), Drake(TRI, 모델 기반 제어)가 있다.

### 시뮬레이션의 쓸모와 sim2real gap

시뮬레이션은 네 가지 일을 가능하게 한다 (슬라이드 28).

1. **대규모 병렬 RL**: 수천 개 환경을 병렬로 구동해 ANYmal 평지 보행을 GPU 1장으로 4분 만에 학습한다. Dactyl은 시뮬레이션에서만 학습한 손으로 루빅스 큐브를 풀었다 (domain randomization).
2. **시연 데이터 생성과 증강**: MimicGen은 사람 시연 약 200개로 5만 개 이상을 자동 생성한다. GR00T N1은 합성 trajectory 78만 개를 11시간에 생성했고, 실제 데이터만 쓸 때보다 성능이 40% 높았다.
3. **재현 가능한 policy 평가**: LIBERO는 130 tasks, RoboCasa365는 365 tasks, BEHAVIOR는 50 tasks를 제공한다. SimplerEnv는 sim 평가와 실제 로봇 성능의 상관이 r = 0.92다.
4. **합성 데이터와 digital twin**: 조명, 배경, 질감을 흔드는 domain randomization에 Cosmos Transfer로 사실적 영상 변환을 더한다. Real2Sim은 Gaussian Splatting 기반 digital twin 안에서 VR teleoperation으로 데이터를 모은다.

그러나 시뮬레이션에서 잘 동작하던 policy가 실제 로봇에서는 성능이 떨어지는 sim2real gap이 큰 문제다. 시뮬레이션과 실제 세계는 여러 요소에서 조금씩 다르다.

| 구분 | 내용 |
|---|---|
| 원인 | 접촉과 마찰 모델의 근사, 변형 물체, 렌더링 영상과 실제 카메라 영상의 차이, 센서 노이즈와 지연, actuator 동역학 |
| 대응 | domain randomization, system identification, Real2Sim digital twin, sim과 real의 co-training |
| 현황 | locomotion은 sim2real이 정착했지만 contact-rich manipulation은 여전히 gap이 커서 실제 로봇 데이터를 병행한다 |

이 때문에 manipulation 논문은 실제 로봇 실험 결과를 웬만하면 포함해야 한다.

### 데이터 수집

데이터 수집 방식은 정확도와 비용이 맞바뀌는 스펙트럼 위에 있다. 정확한 데이터는 비싸고 싼 데이터는 부정확하다.

![[assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide29.png]]
*Slide 29: 데이터 수집 방식 네 가지 (teleoperation, UMI, human egocentric video, 시뮬레이션 합성) (DSBA 2026, 16:51)*

| 방식 | 방법 | 수치 | 특징 |
|---|---|---|---|
| teleoperation | leader-follower (ALOHA, GELLO), VR | 10분 시연으로 80~90% 성공 (ACT) | 가장 정확하고 가장 비쌈 |
| handheld gripper (UMI) | 로봇 없이 카메라 달린 그리퍼로 시연 | 시간당 111개 (teleoperation 35개) | 약 3배 빠른 수집 |
| human egocentric video | 착용 카메라로 사람 작업 녹화 | EgoDex 829시간, EgoScale 2만 시간 | 가장 scalable, action 정보 없음 |
| 시뮬레이션과 합성 | GPU 병렬 시뮬레이터 (Isaac Lab, MuJoCo), world model 생성 (DreamGen) | MimicGen 시연 200개 → 5만 개 이상 | 대규모, 저비용, 부정확한 action |

egocentric video는 사람 시점에서 찍은 영상으로 확장성은 가장 좋지만 데이터에 action 정보가 없다. 그래서 발표자는 그리퍼 시연과 혼합해 쓰는 편이 좋다고 말한다. 인터넷에 올라와 있는 데이터를 그대로 쓰는 방법도 있다. 슬라이드의 결론은 이 trade-off 아래에서 데이터를 어떻게 수집할지가 그 자체로 핵심 연구 주제라는 것이다.

### 데이터셋과 data pyramid

공개 로봇 데이터셋은 커지고 있지만 LLM 코퍼스와 비교하면 아직 매우 작다.

![[assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide30.png]]
*Slide 30: 대표 데이터셋과 NVIDIA GR00T data pyramid (DSBA 2026, 17:47)*

| 데이터셋 | 규모 | 특징 |
|---|---|---|
| Open X-Embodiment | 100만 개 이상 trajectory, 22 embodiments | 다기관 통합의 시작 |
| DROID | 7만 6천 개 trajectory, 350시간, 564 scenes | Franka, 다양한 장소 |
| BridgeData V2 | 6만 개 trajectory | WidowX, 저가 팔 학계 표준 |
| AgiBot World | 100만 개 이상 trajectory, 217 tasks, 로봇 100대 | 동일 로봇 대규모 |
| LeRobot Hub | 커뮤니티 데이터셋 다수 | 저가 팔 오픈 생태계 |

NVIDIA는 이 규모 문제에 data pyramid 전략으로 대응한다. data pyramid는 web 데이터, 합성 데이터, 실제 로봇 데이터를 양이 많은 순으로 쌓아 함께 학습에 쓰는 전략이다. 맨 아래의 web 데이터와 human video(Ego4D, EgoDex, EgoScale)는 싸고 방대하며, 가운데의 합성 데이터(시뮬레이션, 생성 모델)를 거쳐, 맨 위의 실제 로봇 데이터는 비싸고 정확하다. 싸고 많은 데이터로 먼저 학습하고 시뮬레이션 합성 데이터, 실제 로봇 데이터 순으로 정교하게 학습한다. 슬라이드는 실제 로봇 데이터를 꼭대기에 두고 값싼 데이터를 최대한 쌓아 올리는 전략이 업계 표준이라고 정리한다.

### 학습 패러다임

학습 방식은 imitation learning과 강화학습으로 나뉜다. imitation learning은 시연 데이터(demonstration)를 흉내 내 policy를 학습하는 방법이며, 대표 형태가 시연의 observation과 action 쌍을 지도학습으로 따라 하는 behavioral cloning이다.

![[assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide31.png]]
*Slide 31: 학습 패러다임 비교 (imitation learning과 RL)와 VLA 표준 학습 레시피 4단계 (DSBA 2026, 18:25)*

| 항목 | Imitation Learning (Behavior Cloning) | Reinforcement Learning |
|---|---|---|
| 방식 | 시연 (o, a) 쌍에 대한 지도학습 | reward 기반 시행착오 학습 |
| 장점 | 단순, 데이터 효율적 | 시연 이상의 성능 가능 |
| 단점 | 시연 수준이 상한, 분포 이탈 시 compounding error | 많은 시행, reward 설계 필요 |
| 주류 영역 | manipulation (시각, 접촉, 변형 물체의 시뮬레이션 난도) | locomotion (GPU 병렬 sim RL + sim2real, 수십 분 내 보행 학습) |

imitation learning은 단순하지만 시연자의 수준을 넘기 어렵다. 강화학습은 시행착오를 여러 번 거쳐 시연보다 잘할 수도 있지만 시행 횟수 자체가 매우 많이 필요하다. 그래서 현재 manipulation은 주로 imitation learning으로, locomotion은 주로 강화학습으로 학습한다.

현재 VLA의 표준 레시피는 LLM 학습과 같은 구조다.

| 단계 | 내용 | LLM 대응 |
|---|---|---|
| ① VLM 초기화 | PaliGemma, Gemma 3, Qwen-VL | pre-training된 LLM |
| ② cross-embodiment pre-training | π0: 1만 시간 이상, 7개 로봇 구성 | pre-training |
| ③ task post-training | 목표 task 시연으로 fine-tuning | SFT |
| ④ 실환경 RL | π*0.6: throughput 2배, 실패 절반 | RLHF |

즉 pre-training된 VLM을 가져와 로봇 데이터로 pre-training하고, 세부 task로 post-training한 뒤, 마지막에 강화학습으로 성능을 더 올린다. 발표자는 이 구조에서 기시감이 든다며 LLM의 pre-training, SFT, RLHF와 동일하다고 지적한다.

### VLA 구조

VLA는 "VLM이 보고 이해하고, action expert가 움직이는" 구조다. pre-training된 VLM에 action trajectory를 생성하는 모듈을 붙인 모델이라고 정리할 수 있다. action expert는 로봇 상태와 action 토큰만 처리하도록 분리한 별도 가중치 묶음이며, VLM 표현을 받아 연속 action을 만든다. VLM backbone은 web-scale image-text에서 물체 인식, 언어 이해, 상식을 상속한다.

| 모델 | Backbone | Action 생성 | 크기 |
|---|---|---|---|
| OpenVLA (2024) | Llama 2 7B + DINOv2, SigLIP | 이산 토큰 | 7B |
| π0 (2024) | PaliGemma 3B | flow matching expert (300M) | 3.3B |
| SmolVLA (2025) | SmolVLM2 | flow matching expert | 0.45B |
| GR00T N1.7 (2026) | Cosmos-Reason2-2B (Qwen3-VL 계열) | flow matching DiT | 약 3B |
| π0.7 (2026) | Gemma 3 4B | action expert (860M) | 약 5B |

backbone 크기는 2~5B가 현재 표준이다. 발표자는 로봇에서 on-device로 실시간 추론을 해야 하므로 최근 LLM보다 훨씬 작다고 설명한다.

입력에서 action까지의 데이터 흐름은 다섯 단계다 (슬라이드 33).

![[assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide33.png]]
*Slide 33: 대표적인 policy 구조 (입력, encoder, backbone, action head, 로봇 제어기) (DSBA 2026, 20:21)*

| 단계 | 구성 |
|---|---|
| 입력 | 카메라 이미지 o_t (카메라 N대 × 224 × 224 × 3, 외부 고정 + 손목), 언어 지시 ℓ ("put the bottle in box 1"), 로봇 상태 s_t (관절 각도, 손끝 위치, 그리퍼, 7~14차원) |
| Encoder | Vision Encoder (ViT 또는 ResNet, pre-training됨) → 이미지 토큰, Tokenizer + Embedding → 텍스트 토큰, State Encoder (MLP) → 1 state token |
| Backbone | Transformer 또는 VLM이 모든 토큰을 함께 처리해 상황 요약 context c를 만든다 |
| Action head | 노이즈 예측 네트워크(Transformer)가 action token과 context c 사이 cross-attention을 수행한다. Action Encoder(MLP, step k 포함)와 Action Decoder(MLP → H × D_a)가 노이즈 섞인 action A^k에서 ε 또는 v를 예측하며 k = K부터 1까지 반복한다 |
| 출력 | action chunk A_t = A^0 (H × D_a), 예를 들어 16스텝 × 7차원 → 로봇 제어기 (관절, 모터 제어) |

학습할 때는 시연 (o, ℓ, s, a_{t:t+H})의 action에 노이즈를 섞고 그 노이즈 ε를 예측하는 MSE를 최소화한다. 추론할 때는 무작위 노이즈에서 시작해 K번 노이즈를 제거한 뒤 묶음의 앞부분만 실행하고 다시 예측한다. 이산 토큰 방식(RT-2, OpenVLA)은 action head 없이 LLM이 action을 토큰으로 직접 출력하고, 토큰을 차원별 256구간의 숫자로 되돌린다. 회귀 방식은 MLP 하나로 바로 값을 출력한다.

### action 표현

로봇의 action은 명시적으로 지정해야 한다. 사람은 손을 어떤 좌표의 trajectory로 움직일지, 관절을 몇 도로 돌릴지 생각하지 않지만 로봇은 그것을 값으로 받아야 한다.

![[assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide34.png]]
*Slide 34: 로봇의 action 표현 (joint space와 end-effector space)과 제어 계층 (DSBA 2026, 21:05)*

action을 표현하는 방식은 두 가지다.

| 방식 | 내용 | 특징 |
|---|---|---|
| 관절 공간 (joint space) | 각 관절의 각도를 직접 지정 (관절 7개 → 7차원) | 로봇마다 형태, 크기, 가동 범위가 달라 다른 로봇에 쓸 수 없고 학습도 어렵다 |
| 손끝 공간 (end-effector space) | 손끝의 위치 (x, y, z), 방향, 그리퍼 개폐 | 대부분의 policy가 채택한다 |

end-effector는 로봇 팔 끝에서 물체와 접촉하는 부분이다. end-effector 방식을 쓸 때는 세 가지를 확인한다.

- **절대 좌표와 변화량**: 절대 좌표인지 현재 위치 대비 변화량(delta)인지 데이터셋마다 다르다.
- **방향 표현**: Euler 각, quaternion, 6D 표현 가운데 6D 표현이 학습에 유리하다.
- **정규화**: 차원별로 값의 범위를 맞춰 로봇과 데이터셋마다 다른 단위와 크기를 보정한다.

행동의 단위도 바뀌어 왔다. 평면 위 집기와 놓기에서 3D 공간의 핵심 자세로, 다시 연속 trajectory와 action 묶음으로 옮겨 왔다.

제어는 계층으로 나뉜다. policy π_θ가 5~50Hz로 손끝의 목표 자세를 내면, 로봇 제어기가 100Hz~1kHz로 목표 자세를 관절 각도와 모터 힘으로 바꾸고, 모터가 로봇을 움직인 뒤 카메라와 로봇 상태가 observation으로 피드백된다. 즉 policy는 손끝의 목표만 초당 약 10회 내고, 관절과 모터를 움직이는 일은 로봇 제어기가 초당 약 1,000회 처리한다. 발표자는 VLA 분야에서 low-level policy라 부르는 것도 실제로는 모터 제어기보다 한 층 위에 있다고 강조한다.

### 이산 토큰에서 연속 생성으로

연속적인 로봇 동작을 모델이 어떻게 '출력'할 것인지가 핵심 질문이다. 초기에는 action을 구간으로 쪼개 텍스트처럼 토큰으로 생성했고, 최근에는 연속값을 바로 생성한다 (슬라이드 35).

| 방식 | 대표 | 장점 | 단점 |
|---|---|---|---|
| 이산 토큰 (autoregressive) | RT-1, RT-2, OpenVLA: 차원별 256구간으로 이산화해 텍스트 토큰처럼 생성. FAST (2025): DCT + BPE 압축 (700 → 53 토큰), 학습 최대 5배 가속 | VLM 구조를 그대로 활용 | 느린 순차 생성, 고주파 정밀 동작이 어려움 |
| 연속 생성 (regression, diffusion, flow) | Regression: OpenVLA-OFT (병렬 decoding, LIBERO 97.1%). Diffusion과 flow matching: Diffusion Policy, π0, GR00T | 다봉 분포 표현, 부드러운 trajectory, 고주파 제어 (50Hz)에 적합 | |

action tokenization은 연속값인 제어 명령을 정해진 구간으로 나눠 이산 토큰으로 바꾸는 기법이며, VLM 구조를 그대로 쓸 수 있다는 장점 때문에 초기 VLA가 채택했다. 현재의 수렴점은 둘을 섞는 것이다. backbone은 토큰으로 학습하고 실제 action은 flow matching으로 생성한다. knowledge insulation은 backbone을 FAST 토큰으로 지도하고 action expert의 gradient는 backbone으로 흘리지 않는 학습 레시피로, π0.5에서 π0.7까지 이 방식을 쓴다. 슬라이드는 이를 "언어처럼 쓰는 action과 그림처럼 생성하는 action이 하이브리드로 수렴"한다고 표현한다.

### action chunking

action chunking은 미래 여러 스텝의 action을 한 묶음으로 한 번에 예측하는 방식이다. 매 스텝 예측하면 지연이 생기고 느릴 수밖에 없지만, chunk 단위로 연속 action을 한 번에 생성하면 오차가 덜 쌓이고 동작이 부드러워진다.

![[assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide36.png]]
*Slide 36: action chunking의 원리와 효과 (16스텝 예측 중 앞 8스텝 실행) (DSBA 2026, 22:59)*

ACT는 50Hz에서 chunk 90, π0는 50Hz에서 chunk 50(약 1초)을 쓴다. 효과와 한계는 다음과 같다.

- **compounding error 감소**: 결정 횟수가 1/H로 줄어 오차가 덜 쌓인다.
- **시간적 일관성**: 동작이 부드럽고 일관된다.
- **추론 지연 극복**: 실행 중에 다음 chunk를 준비한다.
- **한계**: 긴 chunk를 실행하는 동안 환경 변화에 둔감하다. 대응으로 receding horizon, temporal ensembling, real-time action chunking이 나왔다. chunk가 길수록 과거 기억은 늘고 최신 observation 반영은 줄어드는 trade-off가 있다 (BID, 2025).

chunk의 뒤쪽은 최신성이 떨어지므로, 실행 도중 새 observation으로 다음 chunk를 만든다. 보통 chunk의 앞부분만 확정적으로 쓰고 뒷부분은 새로 만든 다음 chunk의 앞부분으로 대체한다. 예를 들어 16스텝을 예측했다면 실제로 실행하는 것은 앞 8스텝이고, 뒤 8스텝은 다음 chunk로 갱신한다.

뒤쪽을 버릴 것인데도 더 많이 만드는 이유는 두 가지다.

1. 뒤쪽까지 고려해서 action을 만들어야 더 부드럽고 성공적인 동작이 나온다.
2. 통신 오류나 추론 지연으로 다음 chunk를 만들지 못해도 이전 chunk를 계속 쓰면 된다. 지연으로 인한 문제를 줄이는 안전장치다.

한 스텝은 end-effector 방식에서 보통 7개 스칼라로 구성된다. 슬라이드 33은 이를 위치와 방향의 변화량 6개와 그리퍼 개폐 1개로 적는다. 따라서 16스텝을 예측하면 모델은 16 × 7 = 112개 값을 출력한다.

### Diffusion Policy와 flow matching

action chunk를 만드는 대표 방식은 diffusion과 flow matching이다. 두 방식 모두 완전한 노이즈에서 점진적으로 denoising해 action chunk를 만들고, 이때 condition으로 받는 것은 주로 VLM의 representation이다.

![[assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide37.png]]
*Slide 37: Diffusion Policy와 flow matching 비교 (다봉 분포 표현과 학습 목적식) (DSBA 2026, 24:54)*

| 항목 | Diffusion Policy | Flow Matching |
|---|---|---|
| 아이디어 | 이미지 생성의 diffusion을 action trajectory 생성에 적용 | 직선 경로 위의 속도장(vector field) 학습 |
| 과정 | noise → observation 조건 점진적 denoising → action chunk | 추론 시 noise에서 적분 (π0: 10 step) |
| 강점 | 여러 정답(다봉 분포)을 평균내지 않고 표현, regression의 '평균의 함정' 해결, 12개 task 평균 +46.9% | diffusion 대비 단순하고 빠름 |
| 채택 | | π0, GR00T, SmolVLA 등 최신 VLA의 표준 action head |

Diffusion Policy의 핵심 장점은 다봉 분포를 다루는 능력이다. 같은 상황에서 정답 경로가 둘 이상이면 regression은 그 평균을 내서 어느 경로도 아닌 동작을 만든다. 슬라이드 그림은 Diffusion Policy, LSTM-GMM, BET, IBC를 비교해 Diffusion Policy만 두 경로 중 하나를 일관되게 선택함을 보인다.

flow matching의 학습 목적식은 다음과 같다.

- x_t = (1 − t) a + t ε
- u_t = ε − a
- L_fm = E[‖v_θ(o, x_t, t) − u_t‖²]

완전한 노이즈 ε와 데이터(여기서는 action a)가 공간에 있을 때 둘을 잇는 선분을 긋고, 선분 위의 점에서 모델이 노이즈와 데이터 사이를 오가는 속도 벡터를 맞히도록 학습한다. 단위 시간을 1로 두면 그 속도는 ε − a로 간단히 표현된다. 노이즈를 직접 맞히는 diffusion과 달리 인스턴스마다 하나의 속도만 맞히면 되므로 학습이 더 안정적이고 필요한 스텝이 훨씬 적다. 그래서 이미지와 영상 생성 모델도 요즘 flow matching을 많이 쓰고, VLA와 world model 분야도 대부분 flow matching을 쓴다. 발표자는 diffusion과 flow matching이 컴퓨터 비전과 Physical AI에서 매우 많이 쓰이므로 모른다면 따로 공부해 둘 것을 권한다.

### System 2와 System 1

최근 Physical AI 모델은 아키텍처를 System 2와 System 1으로 나누는 경우가 많다. 이 구조는 dual-process theory에서 영감을 받았다. dual-process theory는 인지를 빠르고 자동적인 System 1과 느리고 숙고적인 System 2로 나눠 보는 Kahneman의 심리학 이론이다.

![[assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide38.png]]
*Slide 38: System 2와 System 1 계층 구조와 모델별 주기 (DSBA 2026, 26:23)*

사람도 어려운 작업(처음 보는 가구 조립)은 천천히 생각하며 이해하고 계획하지만, 간단한 작업(컵 잡기)은 별생각 없이 손이 나간다. 반복 연습하면 숙고가 직관이 된다(S2 → S1). 발표자는 이를 두뇌와 말초신경의 관계에 비유한다. 로봇에서는 큰 VLM이 느리게 작업을 이해하고 세부 계획을 세우는 System 2를, action chunk를 생성하는 모델이 그 이해와 계획에 따라 실제 action을 내는 System 1을 맡는다.

| 모델 | System 2 | System 1 |
|---|---|---|
| Figure Helix (2025) | 7B VLM, 7~9Hz | 80M policy, 200Hz |
| Figure Helix 02 (2026) | 동일 | + S0 균형 제어, 1kHz |
| NVIDIA GR00T N1 (2025) | VLM, 약 10Hz | DiT, 약 120Hz |
| PI Hi Robot (2025) | VLM: subtask 지시 | π0 계열 VLA |
| Gemini Robotics 1.5 | ER 1.5: 계획과 추적 | VLA: 실행 |

'느린 두뇌와 빠른 몸'의 계층 구조는 업계 공통 설계로 자리 잡았다. 다만 지금까지는 System 1에 초점을 맞춘 연구가 더 많았고, 결과를 예측하고 평가하고 수정하는 진정한 System 2는 아직 초기 단계다. 더 어렵고 추상적이기 때문이다. 발표자는 world model을 System 2의 한 발전 방향으로 본다.

### 평가

평가는 시뮬레이션 벤치마크와 실제 환경 평가로 나뉘며, 둘 다 한계가 뚜렷하다 (슬라이드 39).

| 시뮬레이션 벤치마크 | 실제 환경 평가 |
|---|---|
| 재현 가능하고 저비용이지만 sim-real gap이 있다 | 최종 기준이지만 느리고 비싸며 재현이 어렵다 |
| LIBERO (130 tasks): 사실상 포화 (π0.5 96.9%, OFT 97.1%) | RoboArena: 여러 기관의 double-blind pairwise 비교 (Chatbot Arena 방식) |
| SimplerEnv: 실환경 상관관계를 맞춘 real-to-sim 평가, 미포화 | AutoEval: 자동 성공 판정과 환경 리셋, 24시간 평가 |
| CALVIN, RoboCasa, RoboTwin 2.0, BEHAVIOR | world model 기반 평가 |

대표 벤치마크인 LIBERO는 이미 약 97% 수준이라 사실상 포화됐지만, 시나리오를 조금 비틀거나 다양하게 설정하면 성공률이 꽤 내려간다. 실제 환경 평가는 방법론의 신뢰도를 위해 거의 필수지만 느리고 비싸다. 여러 기관이 sim2real gap을 줄이고 평가를 자동화하려 하지만, 충분히 신뢰할 수 있는 평가를 만드는 것 자체가 아직 풀리지 않은 문제다.

### 연구 규모별 필요 자원

로봇 AI 연구에 컴퓨팅 자원이 많이 필요하다는 인식은 상당 부분 사실이다. VLA를 직접 pre-training하려면 GPU 수십 장으로 몇 주, 산업 규모에서는 수천 장이 필요하고 로봇과 인력도 든다. 그래도 적은 자원으로 할 수 있는 연구가 많다 (슬라이드 40).

| 연구 주제 | 대표 예시 | GPU | 로봇과 데이터 | 규모 참고 |
|---|---|---|---|---|
| 소형 policy 학습 | ACT, Diffusion Policy (task별 policy) | 소비자 GPU 1장 (12~24GB) | 로봇 1대 + teleoperation 장치, task당 시연 수십~수백 개 | 학습 수 시간 |
| 공개 VLA fine-tuning | π0, π0.5, GR00T, OpenVLA-OFT, SmolVLA | LoRA는 24GB급 1장, full은 80GB 1~8장 | 로봇 1~2대, task당 시연 수십~수백 개 | π0.5 5,000 step: H100 4장으로 3.7시간 |
| VLA 방법론 연구 | action head, reasoning, memory, 3D 정렬 등 구조 개선 | 80GB × 8~16 (반복 실험, ablation) | sim 벤치마크 (LIBERO, SimplerEnv) + 실제 로봇 검증 | 실험 반복 속도가 GPU 총량에 비례 |
| RL post-training | SimpleVLA-RL, HIL-SERL, π*0.6 RECAP | Sim RL: 80GB × 8 이상, Real RL: 소규모 | Real: 로봇 + 사람 개입 (task당 1~2.5시간), Sim: 병렬 시뮬레이터 | Isaac Sim은 RT core GPU 필요 |
| World model 학습과 활용 | Cosmos fine-tuning, Ctrl-World, DreamGen, WMPO | 2B급 fine-tuning: 80GB × 8, 14B 이상: 다중 노드 | 로봇 영상 수백~수천 시간 | 영상 pre-training은 산업 규모 (V-JEPA 2: 영상 100만 시간 이상) |
| VLA pre-training (학계 규모) | 0.5~7B VLA를 OXE, DROID로 pre-training | 80GB × 8~64, 수일~수주 | OXE 100만 개 이상, DROID 7만 6천 개 trajectory, 스토리지 TB급 | OpenVLA 7B: 2만 1,500 A100-hour (A100 64장 × 14일) |
| Foundation model pre-training (산업 규모) | π0.7, Gemini Robotics 2, GR00T, GEN-1 | GPU 수백~수천 장 | 로봇 fleet + 데이터 1만~50만 시간 이상, 수집 인력과 시설 | GR00T N1: 약 5만 H100-hour (최대 1,024 GPU) |

필요 자원은 연구 주제에 따라 1만 배 이상 차이 난다. 작은 policy는 GPU 한 장으로 몇 시간이면 학습할 수 있고, 공개 VLA fine-tuning은 80GB GPU 몇 장이면 충분하다. 그래서 학계에서는 fine-tuning, 세부 방법론, post-training 위주의 연구가 많다. 발표자는 로봇에 on-device로 모델을 올려야 하는 특성상 작은 모델 기반 연구가 상대적으로 더 중요하므로, 엄청난 자원이 있어야만 Physical AI 연구를 할 수 있는 것은 아니라고 강조한다.

## World model

### World model이 필요한 이유

현재 VLA는 observation을 보고 바로 행동하는 반응형이라, 이렇게 행동하면 세상이 어떻게 바뀔지 예측하는 과정이 없다. world model은 행동의 결과를 미리 상상해 보고 가장 좋은 action을 고르게 돕는 일종의 시뮬레이션이다.

![[assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide42.png]]
*Slide 42: World model이 필요한 이유 (반응형 VLA와 상상 후 행동하는 world model) (DSBA 2026, 30:11)*

| 구분 | VLA (reactive) | World model (imagine, then act) |
|---|---|---|
| 흐름 | o → policy → a | o + 후보 a → world model → 예측 결과 → 평가 → 선택된 a |
| 예측 | 결과 예측 없음 | p(s_{t+1} \| s_t, a_t)로 행동의 결과를 미리 상상 |

world model이 주목받는 근거는 세 가지다.

- **예측의 부재**: VLA는 observation에서 action으로 반응적으로 매핑할 뿐 "이렇게 하면 어떻게 될까"를 예측하지 않는다.
- **인간의 방식**: 인간은 머그컵을 잡기 전에 무게와 그립을 미리 예측한다(forward model).
- **데이터 관점**: action 라벨이 없는 대량의 영상만으로 물리 동역학을 학습할 수 있어 데이터 격차를 완화한다.

LeCun은 두 가지 사고 모드를 구분한다. Mode-1은 지각에서 즉각 행동으로 가는 경로로 현재 VLA, 즉 System 1에 해당한다. Mode-2는 world model로 결과를 시뮬레이션하며 최적 행동을 탐색하는 경로로 System 2에 해당한다. Mode-2의 결과로 Mode-1을 학습시키면 계획이 반응 policy로 옮겨 간다. 슬라이드의 결론은 world model이 로봇에게 '상상력'을 부여하는 System 2의 핵심 부품이라는 것이다.

### 계보와 분류

world model은 2018년 World Models 논문에서 출발해 Dreamer 계열을 거쳐 발전했다. World Models(Ha와 Schmidhuber, 2018)는 VAE로 observation을 압축하고(V), RNN으로 미래를 예측하며(M), controller(C)가 '상상 속에서' policy를 학습하는 구조였다. DayDreamer(2022)는 Dreamer를 실제 로봇에 적용해 4족 보행, UR5와 XArm의 시각 기반 pick and place, Sphero 시각 내비게이션을 학습했다.

지금은 예측 대상에 따라 네 유형으로 나뉜다 (슬라이드 43).

| 유형 | 예측 대상 | 대표 연구 | 특징 |
|---|---|---|---|
| Latent dynamics (model-based RL) | 압축된 latent 상태 | Dreamer v1~v3, DayDreamer | 상상 속 RL, task 특화 |
| Pixel / Video 생성형 (world foundation model) | 미래 영상 프레임 | UniSim, Genie 3, NVIDIA Cosmos, 1X WM | web 영상의 물리 prior, 사람이 확인 가능, 고비용 |
| Latent 예측형 (JEPA) | 미래의 표현 | V-JEPA 2, DINO-WM | 불필요한 디테일 무시, 효율적 계획 |
| 3D 물리 세계 생성 | 시뮬레이션 가능한 3D 환경 | World Labs Marble, Genesis | 시뮬레이터용 환경 생성 |

더 크게 나누면 RGB pixel이나 3D 같은 raw 데이터를 예측할지, latent를 예측할지의 논쟁이다. 슬라이드는 '무엇을 예측할 것인가'(pixel 대 latent)가 world model 진영을 가르는 기준이라고 정리한다.

latent 예측 방식은 인간의 상상 방식에서 따온 것이다. 사람이 머릿속으로 상상할 때 시각 정보를 떠올리기는 하지만 배경이나 가장자리까지 매 프레임 RGB 값을 생성하지는 않는다. 집중하는 대상 위주로 약간 추상적인 시각적 상상을 하는 것에 가깝다. 같은 이유로 Physical AI용 world model도 영상 프레임을 RGB 수준에서 생성하기보다 더 high-level의 의미적인 latent를 상상의 매개체로 써야 한다는 시각이 있고, Meta를 떠나 스타트업을 세운 LeCun이 이 방향을 주도한다. 발표자는 이 생각이 직관적으로는 올바른 방향 같지만 아직은 상대적으로 더 잘 되고 있다고 보기 어렵다고 평가한다.

### 대표 연구

world model에는 주로 빅테크가 대규모로 투자한다. 학습 비용이 너무 크기 때문이다 (슬라이드 44).

| 연구 | 내용 |
|---|---|
| Genie 3 (Google DeepMind, 2025.08) | 텍스트로 생성한 세계와 실시간 상호작용 (720p, 24fps), 수 분간 일관성 유지, Project Genie 공개 (2026.01) |
| NVIDIA Cosmos (2025.01 → Cosmos 3) | Physical AI용 open world foundation model, 합성 데이터와 policy 학습 플랫폼, Cosmos 3는 reasoning + 영상과 action 생성 (4B~64B) |
| V-JEPA 2 (Meta, 2025.06) | 영상 100만 시간 이상으로 action 없이 pre-training, DROID 62시간 미만으로 action-conditioning, 처음 보는 실험실에서 zero-shot 집기와 놓기 |
| 1X World Model (2024 → 2026.01) | humanoid policy 평가용 시뮬레이터 (2024), 14B 영상 모델 + IDM으로 policy 자체로 사용 (2026) |

world foundation model은 여러 downstream Physical AI 환경으로 fine-tuning될 것을 전제로 학습한 범용 world model이며, NVIDIA Cosmos가 이 이름을 세웠다. 슬라이드는 빅테크 모두 world model에 대규모 투자를 하지만 방향이 생성형(Google DeepMind, NVIDIA)과 표현 예측형(Meta, AMI Labs)으로 갈린다고 정리한다.

발표자는 Cosmos Predict 2.5 논문에서 H100 4,096장을 학습에 썼다는 데 충격을 받았다고 말한다. 그러면서도 이만큼 큰 자원으로 학습한 world model도 실제 세계를 다루니 '월드'라는 이름을 붙였을 뿐, 아직은 이전 프레임을 입력받아 미래 프레임을 출력하는 video prediction 모델에 지나지 않는 경우가 많다고 본다. 그럼에도 세계가 어떻게 변할지 영상으로 예측하는 것이 로봇의 행동 결정에 분명 도움이 될 것이라는 믿음으로 발전이 계속되고 있다.

Genie 3 소개 영상은 world model이 무엇인지 감을 잡게 해 준다. 텍스트 프롬프트로 설정을 넣어 세계를 생성하고, 그 안에서 WASD 방향키로 조작한다. 일반 게임처럼 미리 만든 3D 모델을 가상 카메라로 렌더링하는 것이 아니라, 이동에 맞춰 시야에 맞는 그럴듯한 프레임을 실시간으로 생성한다. 즉 선택한 action에 따라 주변 환경이 어떻게 바뀔지를 예측하는 것에 가깝다.

### World model의 활용

world model은 학습 과정에서 다섯 가지로 쓰인다 (슬라이드 46).

![[assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide46.png]]
*Slide 46: World model 활용 다섯 가지 (데이터 생성, policy 평가, 계획, 상상 속 RL, policy backbone) (DSBA 2026, 34:55)*

| 활용 | 방법 | 예시 |
|---|---|---|
| ① 데이터 생성 | 새 행동 영상 생성 → IDM으로 action 라벨링 | DreamGen: 단일 task 데이터로 22개 새 행동 |
| ② policy 평가 | world model 속 rollout으로 policy 순위 예측 | GDM Veo 기반 평가 (실평가로 검증) |
| ③ 계획 (MPC) | 후보 action을 상상한 뒤 목표에 가장 가까운 것 선택 | V-JEPA 2-AC, DINO-WM |
| ④ 상상 속 RL | 안전, 무한 리셋, 병렬 rollout | WMPO: 성공률 53% → 70% |
| ⑤ policy backbone | world model 자체를 policy로 사용 | World Action Model |

Inverse Dynamics Model(IDM)은 두 프레임만 보고 그 사이를 채울 action을 되짚어 예측하는 모델로, action 라벨이 없는 생성 영상에 pseudo-action을 붙이는 데 쓴다. MPC(model-predictive control)는 학습한 동역학으로 후보 action을 여러 스텝 앞까지 예측해 점수를 매기고 첫 action만 실행한 뒤 다시 계획하는 제어 방식이다.

Ctrl-World 그림에서는 위쪽의 실제 로봇 rollout과 아래쪽의 world model 상상이 거의 같은 모습이다. 이는 실제 로봇 없이도 AI 모델의 성능을 평가할 수 있다는 가능성을 보여 준다. WMPO는 world model 안에서 VLA를 강화학습으로 학습한다. 다만 world model은 여전히 실제 로봇 실험만큼 신뢰하기 어렵고, 시뮬레이션이 정확하지 않은 상황이 있을 수 있다.

### 남은 과제

world model이 해결해야 할 과제는 네 가지다 (슬라이드 47).

| 과제 | 내용 |
|---|---|
| 물리적 환각 | 그럴듯하지만 물리 법칙을 위반한다 (물체 소실, 공중 부양). 모델 확장만으로 해결되지 않는다 |
| action 조건부 충실도 | 행동에 따라 결과가 제대로 바뀌는지 검증하기 어렵다. "화질이 task 성공을 보장하지 않으며" controllability가 더 중요하다 (World-in-World) |
| 장기 일관성 | 수십 초~수 분 이후 실제와 어긋나는 drift가 생기며 memory가 필요하다 |
| 비용 | 14B 영상 모델의 실시간 추론이 난제다. DreamZero는 5.7초를 150ms로 줄여 38배 가속으로 7Hz 제어를 달성했다 |

controllability는 world model이 생성한 미래가 명령으로 준 action을 얼마나 정확히 따르는지를 나타내는 성질이다. 이후 방향으로 슬라이드는 pixel과 latent 논쟁의 지속, world model과 policy의 통합인 WAM(GR00T N2, 2026년 연말 예정), world model 평가 벤치마크 정립을 든다.

이런 과제가 남아 있지만 world model을 로봇 학습에 실질적으로 쓰려는 흐름은 분명하다. 그 대표가 기존 VLA와 world model을 융합한 WAM이다. WAM은 world-action model의 약자로, 미래 장면 예측과 action 생성을 한 모델 안에서 함께 수행하는 policy 계열이다. 발표자는 최근 몇 달 가장 많이 보인 키워드라며, 행동하기 전에 결과를 먼저 상상하고 결정하는 방식이라고 설명한다. 보기 좋은 영상을 생성하는 수준에서 로봇이 행동의 결과를 예측해 볼 수 있는 시뮬레이터로 넘어가는 중이라는 것이 슬라이드의 결론이다.

## 주요 진영

### 지형도

Physical AI는 미래에 크게 베팅하는 분야지만 정답이 없어 연구 그룹마다 관점과 방향이 다르다. 빅테크도 자본이 워낙 많이 드는 일이라 지나치게 다양한 베팅보다는 각자의 전략에 맞는 방향을 선택적으로 추진한다.

![[assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide49.png]]
*Slide 49: Physical AI 진영 지형도 (VLM 대 world model, 하드웨어 수직계열화 대 플랫폼) (DSBA 2026, 37:30)*

| 진영 | 핵심 베팅 | 대표 |
|---|---|---|
| A. 범용 로봇 두뇌 | 어떤 몸에도 붙는 하나의 모델 | PI, Skild AI, Google DeepMind |
| B. 풀스택 humanoid | 몸, 두뇌, 배치 데이터 루프 소유 | Tesla, Figure, 1X, Unitree, AgiBot |
| C. 플랫폼과 생태계 | 로보틱스의 'CUDA / Android' | NVIDIA, Hugging Face |
| D. World model 우선 | 미래 예측으로 물리를 이해한 뒤 행동 | Meta, AMI Labs, NVIDIA, 1X |
| E. 데이터 스케일링 | 값싼 human 데이터 + scaling law | Generalist, Figure, Tesla |

지형도 그림은 가로를 "VLM semantics ↔ world model physics", 세로를 "HW 수직계열화 ↔ SW 플랫폼"으로 둔다.

| 위치 | 기업 |
|---|---|
| 하드웨어 수직계열화, VLM 쪽 | Tesla, Figure, Boston Dynamics |
| 하드웨어 수직계열화, world model 쪽 | Unitree와 AgiBot, 1X |
| 소프트웨어 플랫폼, VLM 쪽 | Google DeepMind, Generalist AI, Physical Intelligence, Skild AI |
| 소프트웨어 플랫폼, world model 쪽 | NVIDIA, Meta와 AMI Labs |

슬라이드 주석은 이것이 발표자 해석에 따른 개념적 배치이며 진영 간 중첩이 있다고 밝힌다. 아직 정립된 master solution이 없어 여러 방향이 난립해 있고, '무엇이 정답인가'에 대한 서로 다른 가설이 2026년 현재 경쟁 중이다.

### 플랫폼 기업 NVIDIA

NVIDIA는 흔히 말하는 '곡괭이와 삽' 전략을 쓴다. 금광에서 금을 캐는 대신 곡괭이를 판 사람이 더 많이 벌었던 것처럼, 모든 로봇 기업의 학습 플랫폼이 되려 한다. 슬라이드의 표현으로는 "Robotics의 데이터 문제를 컴퓨팅 문제로 전환"하는 것이다.

- **전 단계 제품**: 학습(DGX), 시뮬레이션과 합성 데이터(Omniverse, Isaac Sim/Lab, Cosmos), 배치(Jetson Thor)를 모두 판다.
- **오픈 VLA**: GR00T N1(2025.03)에서 N1.7(2026, 오픈)까지 humanoid용 open VLA를 S2/S1 구조로 낸다.
- **데이터와 world model**: Cosmos, DreamGen, EgoScale, RoboTTT로 world model, 합성 데이터, human video, long context를 다룬다.
- **WAM**: DreamZero(2026.02)는 WAM으로 VLA 대비 2배 이상 일반화했다. GTC 2026에서 DreamZero 기반 WAM인 GR00T N2를 예고했고 연내 공개 예정이다.
- **생태계 선점**: 오픈 모델로 Figure, 1X, Agility, AgiBot, LG 등을 끌어들인다.

슬라이드는 VLA부터 WAM까지 모든 방향에 베팅하는 '무기상' 전략으로 요약한다.

### 범용 두뇌 진영

**Google DeepMind**는 AI 모델 개발에 집중한다. 로봇이나 하드웨어 기업이 아니므로 타사 로봇을 제어하는 모델 연구가 중심이다. frontier 멀티모달 모델(Gemini)을 행동까지 확장해 Embodied Reasoning(ER) 플래너와 VLA 실행기를 결합한다.

| 시점 | 모델 |
|---|---|
| 2022.12 | RT-1 |
| 2023.07 | RT-2 ('VLA') |
| 2023.10 | RT-X / OXE |
| 2025.03 | Gemini Robotics + ER |
| 2025.06 | On-Device |
| 2025.09 | GR 1.5 / ER 1.5 ("think before acting", ALOHA, Franka, Apollo 간 Motion Transfer) |
| 2026.07 | Gemini Robotics 2 (humanoid whole-body control, ER 2의 수 분 단위 진행 추적과 자기 수정, On-Device 2의 200개 미만 시연 적응) |

world model로는 Genie 3와 Veo 기반 policy 평가를 쓰고, 자체 로봇 없이 API와 파트너십(Apptronik, Boston Dynamics 등)으로 간다. 슬라이드는 가장 강한 VLM을 가진 곳의 'VLM 중심' 전략, 즉 추론을 행동으로 옮기는 전략으로 정리한다.

**Physical Intelligence(PI)**는 어떤 로봇에도 쓸 수 있는 범용 robot foundation model을 만들며 하드웨어는 만들지 않는다. 연구 흐름이 매우 뚜렷해 논문을 시리즈로 이어 읽기 좋다.

| 시점 | 연구 | 내용 |
|---|---|---|
| 2024.10 | π0 | flow matching VLA |
| 2025.01 | FAST | action tokenizer |
| 2025.02 | Hi Robot | 계층적 S2 |
| 2025.04 | π0.5 | open-world 일반화 |
| 2025.05 | Knowledge Insulation | VLM 지식 보존 |
| 2025.06 | Real-Time Chunking | 실시간 실행 |
| 2025.11 | π*0.6 / RECAP | 경험 기반 RL |
| 2025.12 | Human-to-Robot | human video 전이 |
| 2026.03 | MEM | 장단기 기억 |
| 2026.04 | π0.7 | 조합적 일반화 |

오픈소스 openpi(π0, π0-FAST, π0.5)는 학계 VLA 연구의 사실상 표준 출발점이 됐다. 발표자는 이를 LLM 분야 초기의 Llama 같은 위치로 본다. 공동 창업자는 Sergey Levine, Chelsea Finn, Karol Hausman 등이고, 밸류는 56억 달러(2025.11)이며 약 110억 달러 라운드가 보도됐다(2026). 최근에는 API 기반 fine-tuning 서비스까지 내놓아, 발표자는 영리하고 기민하게 포지셔닝한다며 향후 사업 확장 방향이 가장 궁금한 회사로 꼽는다. 슬라이드는 VLA 핵심 아이디어의 상당수가 PI에서 나왔으므로 스터디의 기준점으로 삼기 좋다고 정리한다.

### World model 우선 진영

Meta와 AMI Labs는 LeCun의 철학을 따른다. 언어 모델도 pixel 생성도 아니고 추상적인 latent 공간에서 미래를 예측하는 것이 세상을 더 본질적으로 이해하는 길이라는 관점이다.

- **V-JEPA 2 (2025.06)**: 1.2B 모델을 영상 100만 시간 이상으로 self-supervised pre-training하고, 로봇 데이터 62시간으로 계획 기반 zero-shot 조작을 보였다. V-JEPA 2.1(2026.03)은 dense feature를 개선했다.
- **촉각**: Digit 360 센서와 Sparsh 촉각 encoder.
- **AMI Labs**: LeCun이 Meta를 떠나 파리에서 설립했고(2025.11), 시드 10억 3천만 달러(2026.03, NVIDIA, Toyota, 삼성 등 참여)를 유치했다. 제품보다 연구를 우선한다.

발표자는 이 그룹이 Physical AI 연구 그룹 가운데 가장 이질적인 방향을 파고 있다고 본다. 슬라이드는 VLA 주류에 대한 가장 강력한 대안 가설, 즉 'World model first'로 정리한다.

### 풀스택 humanoid 진영

이 진영은 몸을 직접 만들어 배치 데이터를 독점하려 한다. 로봇을 배치하고 거기서 모은 데이터로 모델을 개선하는 data flywheel이 공통 목표이며, Tesla 자율주행 방식의 재현 시도다. 보스턴 다이나믹스 외에 다음 기업이 있다.

| 기업 | 전략 | 주요 내용 |
|---|---|---|
| Tesla Optimus | FSD와 같은 전략 (카메라, end-to-end, 대량 생산) | 사람 착용 카메라 영상 학습으로 전환 (2025), V3 미공개와 양산 지연 (2026.09 기준), 2024 시연 다수 원격 조종 논란 |
| Figure AI | 몸 + 자체 두뇌 (Helix S2/S1/S0) + human 데이터 | Helix 2.5 (2026.09): Index 플랫폼 human 데이터로 pre-training, 처음 보는 가정 30곳 zero-shot (56% 대 9%), BMW 공장 배치, 390억 달러 밸류 |
| 1X | 가정용 humanoid + world model | NEO (2만 달러) 예약 판매 (2025.10), world model을 평가기이자 policy로 사용 (14B 영상 모델 + IDM), 원격 조종 'Expert Mode' 병행 |

발표자는 Tesla Optimus가 자율주행과 같은 전략으로 가지만 양산이 조금 늦어지는 감이 있다고 평가한다.

### 데이터와 scaling 우선 진영

Generalist AI와 Skild AI는 데이터 규모와 in-context 학습에 베팅한다.

| 기업 | 창업자 | 주요 내용 |
|---|---|---|
| Generalist AI | Pete Florence, Andy Zeng (전 Google DeepMind) | 착용형 'data hands'로 실세계 상호작용 데이터 수집: 27만 시간 (GEN-0) → 50만 시간 이상 (GEN-1). GEN-0: robotics scaling law, 7B 이상에서 지속적 성능 향상. GEN-1.5: 3~12초 시연을 context로 쓰는 physical prompting, 학습 없이 59%, 10 step 학습 시 83% |
| Skild AI | Deepak Pathak, Abhinav Gupta (CMU) | 'Omni-bodied' Skild Brain: 어떤 형태의 로봇에도 하나의 모델. S1 (2026.08): 사람 시연 영상 1개로 새 task in-context 학습 (66% 대 언어 지시 9%). ARR 1억 달러 돌파 (2026.09) |

physical prompt는 언어 예시 대신 센서 데이터와 action trajectory로 이뤄진 sensorimotor 예시를 context window에 넣어 과제를 지시하는 입력이다. 슬라이드는 LLM의 GPT-3 few-shot prompting(2020)에 대응하는 것이 로봇의 physical prompting(2026)이라고 짝짓는다. 발표자는 fine-tuning에서 in-context learning으로 넘어가는 흐름이 보인다며, 이것을 2026년 하반기의 화두로 본다.

### 중국과 국내

중국은 기업 단위가 아니라 국가 단위로 빼놓을 수 없다. 정부가 로보틱스를 국가 사업으로 주도하고, 하드웨어 규모와 자본이 크다. 슬라이드 56은 이를 압도적 하드웨어 양산과 가격 경쟁력, 국가 주도 data factory, 자본시장의 조합으로 정리한다.

- **Unitree**: humanoid 가격 파괴(R1 5,900달러), 상하이 STAR 상장(2026.08, 첫날 +460%).
- **AgiBot**: 2026 상반기 humanoid 출하 1위(8,400대, 점유율 약 44%), AgiBot World 데이터셋(100만 개 이상 trajectory), GO-1 VLA, Genie Envisioner(영상 world model), 홍콩 IPO 추진.
- **그 밖**: Galbot(sim + real), X Square(WALL-OSS 오픈), UBTech(Walker S2).
- **투자**: 2026 H1 935억 위안 (322건).

많이 만들어 배치하면서 데이터를 모으는, 국가 단위라 가능한 규모의 전략이다.

국내에서는 대기업이 하드웨어와 투자를, 정부가 world model과 foundation model 사업을 맡는다 (슬라이드 57).

| 주체 | 주요 내용 |
|---|---|
| 삼성 | 레인보우로보틱스 지분 35%, RX 사업추진실 신설 (2026.07), Skild와 AMI Labs 투자 |
| LG | 가정용 humanoid CLOiD, 정부 world model 컨소시엄 주관, Skild 투자, GR00T 도입 |
| 현대차그룹 | Boston Dynamics 신형 Atlas (CES 2026), 미국 메타플랜트 투입 계획, 2028년 연 3만 대 로봇 생산 체계 목표 |
| RLWRLD (스타트업) | dexterity 중심 robot foundation model, RLDX-1 (8.1B, 촉각과 토크 입력, 2026.05) |

정부 사업은 K-humanoid 연합(2025.04, 2028 공용 foundation model 목표), 피지컬 AI 3대 메가프로젝트(2026.06, 2030 '세계 1강' 목표), 국산 world model 사업(2026.06, LG 주관, 서울대와 KAIST 참여), 국민성장펀드(2026.07, 피지컬 AI 분야 대규모 투자 계획) 순으로 이어진다. 발표자는 로보티즈 같은 하드웨어 강점 기업도 화제가 되고 있으며, 정부 사업이 이어져 학계가 참여할 기회가 늘고 있다고 본다.

### 핵심 질문별 진영의 답

여러 진영의 차이는 다섯 가지 질문에 대한 답으로 정리된다 (슬라이드 58).

| 핵심 질문 | 입장 ① | 입장 ② |
|---|---|---|
| 무엇을 backbone으로? | VLM, semantics 상속 (PI, GDM) | Video와 world model, physics 상속 (NVIDIA N2, 1X, Meta) |
| 데이터는 어디서? | 실제 로봇 teleoperation (PI, AgiBot) | human video와 wearable (Generalist, Figure, EgoScale) |
| 새 task 학습 방법? | fine-tuning과 RL (PI π*0.6) | in-context, physical prompting (GEN-1.5, Skild S1) |
| 하드웨어? | 무관한 범용 두뇌 (PI, Skild, GDM) | 직접 제작, 풀스택 (Tesla, Figure, 1X, Unitree) |
| 모델 구조? | S2/S1 분리 (Figure, GR00T, GDM) | 단일 모델 (π0 계열) |

반면 모두가 비슷하게 채택하는 기본 틀도 있다. 느린 두뇌와 빠른 몸으로 나뉜 System 1과 2의 계층 구조, 사람 데이터를 활용하려는 움직임, RL post-training이다. 발표자는 각 진영의 대표 연구 흐름을 따라가는 것이 스터디 커리큘럼이 될 수 있다며, 아직 master solution이 없는 지금이 연구자로서 진입하기 좋은 시점이라고 본다.

## Base VLA의 확장 방향

### 여섯 가지 확장

가장 기본 형태의 VLA를 가운데 두면, 그 둘레에 현재 부족한 점, 다른 말로 하면 앞으로의 확장 방향이 놓인다. 발표자는 이를 사람이 가진 능력을 하나씩 로봇에게 되돌려 주는 시도로 기억하면 쉽다고 말한다.

![[assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide60.png]]
*Slide 60: Base VLA의 한계와 여섯 가지 확장 방향 (DSBA 2026, 44:04)*

| 확장 | Base VLA의 결핍 | 대응하는 인간 능력 |
|---|---|---|
| 3D | 2D 중심 | 깊이 지각 |
| 촉각과 힘 | 시각 only | 촉각 |
| Memory | 과거 없음 (Markovian) | episodic memory |
| 비동기와 실시간 | 하나의 시계 | 반사 신경 |
| 추론 | 즉각 반응 | 숙고 |
| World model과 WAM | 예측 없음 | 상상 |

여기서 Base VLA는 VLM backbone과 flow matching action expert로 구성된 현재의 표준 구조를 가리킨다.

### 3D

VLA backbone인 VLM은 2D 이미지로 학습해 깊이 정보에 약하지만, 로봇은 3D 공간에서 행동해야 한다. VLM encoder는 2D image-caption 학습으로 만들어져 깊이와 기하 정보가 부족한데, action은 3D 공간의 6-DoF 자세다. 인간도 한쪽 눈을 감고 바늘에 실을 꿰기는 어렵다. 접근은 두 가지다.

| 접근 | 방법 | 대표 결과 |
|---|---|---|
| Explicit | point cloud와 depth를 입력에 직접 추가 | 3D Diffuser Actor, SpatialVLA, Any3D-VLA (실환경 zero-shot grasp 62.5% 대 33.3%) |
| Implicit | 학습 시에만 3D foundation model(VGGT)에 alignment하고 추론에는 RGB만 사용 | Spatial Forcing: LIBERO 98.5%, 학습 3.8배 가속 |

point cloud는 depth 센서나 3D 재구성이 반환한 3D point의 집합이다. 추세는 VGGT와 Depth Anything을 teacher나 pseudo-depth로 활용하는 것이며, 평가는 실환경 공간 변화로 옮겨 가고 있다. 발표자는 DUSt3R와 VGGT 같은 유망한 3D foundation model과 3D reconstruction 모델을 함께 쓰려는 시도가 있다고 소개한다. Any3D-VLA의 입력 방식별 비교는 point cloud와 2D patch를 융합할 때 가장 높다.

| 입력 방식 | Single-Trial SR (%) | Test SR (%) | Grasp SR (%) |
|---|---|---|---|
| 2D-only | 45.3 | 72.6 | 80.0 |
| Implicit-depth RGB | 55.8 | 78.9 | 85.3 |
| Implicit-3D RGB | 46.3 | 78.9 | 87.4 |
| RGBD image-plane | 56.8 | 76.8 | 87.4 |
| Point cloud와 2D patch fusion | 61.1 | 80.0 | 89.5 |

슬라이드는 이 방향의 핵심 질문을 센서를 추가할 것인가, 표현을 alignment할 것인가로 요약한다.

### 촉각과 힘

사람은 물체를 조작할 때 시각에만 의존하지 않는다. 전신의 촉각, 손가락과 팔 관절에 가해지는 힘을 의식적으로든 무의식적으로든 느끼며 동작을 정밀하게 수행한다. 시각에는 구조적인 한계도 있다. 손으로 물체를 집으면 손등에 물체가 가려지는 occlusion이 생기는데, 로봇도 그리퍼, 특히 로봇 손으로 물체를 집을 때 같은 일이 일어나 시각만으로 작업하기 매우 어렵다.

슬라이드 62의 내용은 다음과 같다.

- **문제**: 접촉 순간 그리퍼가 물체를 가리고, 미끄러짐과 힘 변화는 ms 단위로 일어나지만 카메라와 VLM은 약 10Hz다. 인간도 손끝 감각이 마비되면 시각이 멀쩡해도 물체를 떨어뜨린다. 인간의 반응 속도는 촉각에서 반사까지 60~90ms, 시각에서 교정까지 약 200ms다.
- **ForceVLA**: 6축 힘과 토크를 mixture-of-experts로 통합해 π0 대비 +23.2%를 기록했다.
- **OmniVTA (2026)**: 시각과 촉각 world model에 60Hz 반사 제어기를 더했다.
- **FTP-1 (2026)**: 21종 센서, 약 3,000시간의 cross-sensor 촉각 foundation policy다.
- **추세**: 대규모 촉각 pre-training, 빠른 반사 루프, 센서 없는 힘 추정(FD-VLA).
- **병목**: 'Internet of touch'의 부재.

발표자는 촉각과 힘이 직관적으로는 중요하지만 촉각 센서가 실용적으로는 너무 비싸고 잘 망가진다고 말한다. 촉각 정보는 VLM이 pre-training에서 배운 modality가 아니라서 VLM을 추가로 학습하거나 action expert를 학습해야 제대로 활용할 수 있다. 연구 방향은 촉각과 힘 정보를 VLM의 표현력, action expert와 잘 alignment해 USB나 콘센트를 꽂는 것 같은 dexterous manipulation의 정확도를 올리는 것이다.

### Memory

지금의 VLA는 현재 화면만 보고 판단하므로 "요리하다 소금을 넣었나?", "창문을 몇 번 닦았지?" 같은 상태를 추적하지 못한다. 이처럼 현재 observation만으로 판단하는 구조를 Markovian이라 한다.

기억 능력을 평가하는 RoboMME(ICML 2026)는 14개 memory 변형을 비교했다. counting, permanence, reference, imitation의 4개 suite로 구성된다.

| 조건 | 성공률 |
|---|---|
| 기억 없음 | 17.9% |
| 최선의 memory | 44.5% |
| 인간 | 90.5% |

사람은 90%가 넘는 성능을 보이지만 Physical AI 모델은 가장 좋은 것도 절반에 못 미친다. 대표 접근은 다음과 같다.

- **MemoryVLA**: perceptual memory bank와 cognitive memory bank를 둔다.
- **PI MEM**: 단기 영상 기억과 장기 언어 기억을 결합해 최대 15분 task를 다룬다.
- **RoboTTT**: test-time training으로 8K step(약 5분)의 context를 유지한다. test-time training은 추론 시점에 소량 데이터로 가중치를 조금 갱신해 적응하는 방식이다.

LLM이 context window를 늘려 온 것처럼 로봇에서도 context 길이가 새로운 scaling 대상이 되고 있다. 다만 비디오는 스트리밍으로 계속 받을수록 메모리가 선형으로 늘어나 매우 많은 메모리가 필요하다. 그래서 메모리를 효율화하고 중요한 정보 위주로 저장하는 연구가 많다. 슬라이드는 memory를 긴 작업의 전제이자 in-context learning으로 가는 다리로 본다 (GEN-1.5).

### 비동기와 실시간

로봇이 생각하고, 멈추고, 움직이기를 순차적으로 반복하면 동작이 중간중간 끊길 수밖에 없다. 그래서 동작을 실행하는 동안 다음 행동을 미리 준비하는 비동기 방식이 나오고 있다.

![[assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide64.png]]
*Slide 64: 비동기 실시간 실행 (동기식과 비동기식 추론 실행 타임라인) (DSBA 2026, 47:40)*

| 방식 | 흐름 | 결과 |
|---|---|---|
| 동기식 | 추론 → 멈춤 → 실행을 번갈아 반복 | chunk 경계에서 동작이 끊긴다 |
| 비동기식 | 실행 중에 다음 chunk를 추론 | 끊김 없이 실행된다 |

asynchronous inference는 policy의 다음 chunk 계산과 현재 chunk 실행을 겹쳐 돌려 대기 시간을 감추는 실행 방식이다. 문제는 chunk 경계의 끊김과, 추론하는 동안 낡아 버린 observation이다. 인간은 피아니스트가 연주하며 다음 악보를 읽듯 이를 처리한다.

- **이중 시계**: Helix는 7~9Hz와 200Hz, Fast-in-Slow는 117.7Hz로 동작한다.
- **Real-Time Chunking (PI)**: 실행 중 다음 chunk를 생성하되 실행될 구간은 고정하고 나머지를 inpainting한다.
- **추세**: 지연을 학습 분포에 포함한다 (training-time RTC, VLASH).

real-time action chunking은 추론 지연이 있어도 action chunk가 매끄럽게 이어지도록 학습 중에 지연을 흉내 내는 기법이다. 발표자는 추론 지연 문제가 실용적인 엔지니어링 수준이 아니라 연구 차원의 모델링 문제로 다뤄진다는 점이 흥미롭다고 말한다. 슬라이드는 이를 LLM serving의 streaming, speculative decoding과 유사한 문제로 본다.

### 추론

지금까지 VLA는 중간에 생각하는 과정 없이 바로 행동으로 넘어가는 경우가 많았다. 게다가 VLA를 학습하면서 원래 VLM backbone이 가진 시각과 언어 능력까지 해치는 catastrophic forgetting이 생긴다. 접근은 세 가지다.

| 접근 | 대표 연구 | 내용 |
|---|---|---|
| Explicit reasoning | ECoT | 계획, subtask, bbox, 그리퍼 위치를 먼저 추론 (OpenVLA 대비 +28%) |
| | CoT-VLA | subgoal 이미지를 생성한 뒤 행동 (visual CoT) |
| | Gemini Robotics 1.5 | "Thinking VLA" |
| Latent / continuous reasoning (2026) | LaRA-VLA | latent 공간에서 추론해 지연 최대 90% 감소 |
| | Continuous Reasoning VLA | 연속 공간 추론 |
| VLM 지식 보존 | Knowledge Insulation, Actions as Language (ICLR 2026) | VLA 학습 중 VLM 능력 보존 |

행동하기 전에 계획을 먼저 추론하고 subtask를 나누는 action planning 방식이 나왔고, 최근에는 속도를 위해 latent 공간에서 추론하는 쪽으로 가고 있다. 이는 LLM과 VLM에서 chain-of-thought가 latent reasoning으로 넘어간 흐름과 같고, 앞의 latent world model 방향과도 동기가 일치한다. 발표자는 이 방향이 연구실의 강점과 직결된다고 말한다.

### World model과 WAM

올해 가장 주목받는 확장은 WAM이다. VLA가 VLM으로부터 의미적인 representation을 물려받는다면, WAM은 비디오 모델로부터 물리적 개념이나 상식을 물려받아 미래 영상을 action과 함께 예측한다.

![[assets/dsba-2026-physical-ai-seminar-ch1-quick-tour/slide66.png]]
*Slide 66: VLA와 WAM 비교 (DreamZero, Cosmos Policy, mimic-video) (DSBA 2026, 49:09)*

| 구분 | VLA | WAM |
|---|---|---|
| backbone | VLM | video model |
| 상속하는 것 | semantics | physics |
| 예측 대상 | action | 미래 observation(영상)과 action |
| 방식 | | cascaded (영상 계획 → IDM), joint (영상과 action 동시 예측) |

대표 결과는 다음과 같다.

- **DreamZero (NVIDIA)**: 14B 영상 diffusion 기반으로 VLA 대비 일반화 성능을 2배 이상 높였고 7Hz로 제어한다. 다음 GR00T 모델(N2)의 기반이 될 예정이다.
- **Cosmos Policy**: 영상 모델을 그대로 policy로 쓴다 (LIBERO 98.5%).
- **mimic-video**: VLA 대비 10배 sample efficiency.
- **과제와 하이브리드**: 추론이 무겁고 언어 grounding이 약하다. 그래서 π0.7은 경량 world model로 subgoal을 생성하는 하이브리드 방식을 쓴다.

발표자는 WAM이 아직 상당히 무겁고 언어 이해 능력이 약하지만, 방향성 자체는 올해 가장 큰 구조적 변화라고 평가한다. 슬라이드는 2026년 가장 큰 구조적 변화 후보를 'VLA 대 WAM'으로 꼽는다.

## 연구 방향

### 문제의식과 연구 방향 지도

연구 방향은 문제의식에서 나온다. 각 문제의식이 하나의 연구 방향으로 연결되고, 앞 절의 기술 확장과 교차하며 연구 공간을 이룬다 (슬라이드 68).

| 문제의식 | 연구 방향 | 대표 키워드 |
|---|---|---|
| 로봇 데이터가 부족함 | 대체 데이터 활용 | human video, UMI, 시뮬레이션, 합성 데이터, world model 생성 |
| 처음 보는 상황에서 실패함 | 일반화 | co-training, compositional generalization, cross-embodiment |
| 시연 수준을 넘지 못함 | 자기 개선 | RL post-training (real, sim, world model) |
| 정교한 손 작업 불가 | dexterity | dexterous hand, 촉각, 대규모 grasp 합성 |
| 긴 작업과 기술 누적 불가 | 기억과 지속 학습 | memory, in-context learning, continual learning |
| 느리고 무거움 | 효율 | 경량 VLA, on-device, asynchronous inference |
| 성능을 믿을 수 없음 | 평가와 안전 | 벤치마크, world model 기반 평가, 실패 감지와 복구 |

### 데이터

첫 번째 방향은 역시 데이터다. 사람 시점의 egocentric 영상이 가장 확장성 있는 데이터원이며, 로봇 없이 모은 데이터로 로봇을 가르치는 것이 2026년 가장 뜨거운 방향이다 (슬라이드 69).

| 연구 | 결과 |
|---|---|
| EgoMimic | 사람 손 데이터 1시간이 로봇 데이터 1시간보다 낫다 |
| EgoScale (NVIDIA) | human video 2만 시간, log-linear scaling, 22-DoF 손 +54% |
| Ψ0 (RSS 2026) | human 800시간 + robot 30시간이 10배 데이터 baseline보다 높다 |
| PI | 로봇 pre-training이 충분히 다양할 때 human에서 robot으로의 전이가 '창발' |

사람 시점으로 영상을 찍어 데이터를 모으는 것은 쉽고 확장성이 좋지만, 사람 손과 몸이 로봇 몸과 다르다는 점(embodiment gap)을 어떻게 메우느냐가 주요 과제다. co-training과 분리 학습 가운데 무엇이 나은지도 열린 질문이다. co-training은 성격이 다른 여러 데이터 원천을 하나의 학습 mixture에 함께 넣는 방식이다. 시뮬레이션과 합성 데이터로는 DexMimicGen, RoboCasa365(365 tasks, 2,200시간 이상), DreamGen이 있다.

### 일반화

두 번째 방향은 일반화 성능이다. 세 가지로 볼 수 있다 (슬라이드 70).

- **Open-world 일반화**: π0.5는 다중 로봇, web, subtask co-training으로 처음 보는 가정을 청소했다. open-world generalization은 학습에서 보지 못한 환경과 물체까지 다루는 능력이다.
- **Compositional generalization**: compositional generalization은 학습에서 본 skill을 새로운 조합으로 엮어 미학습 과제를 푸는 능력이다. 현황은 LIBERO-Gen Task-CG 21%로 모델이 스스로 조합하지 못하며, π0.7(2026.04)이 조합적 일반화의 초기 신호를 보였다.
- **Cross-embodiment**: 하나의 모델로 여러 몸을 다룬다. HPT(embodiment별 stem + 공유 trunk), X-VLA(soft prompt, 0.9B), One Hand to Rule Them All(처음 보는 손 zero-shot 81.9%)이 대표다.

발표자는 특히 task 조합 일반화의 성능이 아직 많이 낮다고 강조한다. LLM의 'GPT 모먼트', 즉 few-shot 일반화 같은 순간이 로봇에는 아직 오지 않았고, 조합 일반화를 포함한 일반화 성능이 가장 근본적인 미해결 문제다.

### RL post-training

세 번째 방향은 강화학습을 통한 post-training이다. imitation learning은 시연자의 수준이 상한이 될 수밖에 없고, 시연은 대개 성공 trajectory라 실패했을 때 회복하는 방법을 배우지 못한다. 그래서 RL을 찾게 된다 (슬라이드 71).

| 환경 | 연구 | 결과 |
|---|---|---|
| 실환경 | HIL-SERL | 사람 개입 + RL, 1~2.5시간 학습으로 거의 완벽한 성공률 |
| 실환경 | DSRL | 거대 policy는 고정하고 diffusion noise 입력만 RL로 조정 |
| 실환경 | π*0.6 / RECAP (PI) | 시연 + 자율 rollout + 사람 교정 → throughput 2배, 실패 절반 |
| 시뮬레이션 | SimpleVLA-RL | task당 시연 1개 + RL로 LIBERO-Long 17.3% → 91.7% |
| world model | WMPO | world model 속 RL |

throughput은 정해진 시간 안에 처리해낸 과제 수를 말한다. 이 흐름은 LLM이 SFT 다음에 RLHF와 RLVR로 넘어간 것과 같아서, LLM post-training의 노하우가 직접 전이되는 영역이다. reward 설계와 안전한 탐색이 핵심 난제다. 슬라이드는 이를 "pre-training으로 '할 줄 알게', RL로 '잘하게'"라고 요약한다. 다만 발표자는 이런 방법도 test time에 새로 보는 더 어려운 상황을 만나면 성능이 크게 떨어질 수 있다고 단서를 단다.

### 그 밖의 방향

그 밖에도 세부 연구 방향이 매우 많다 (슬라이드 72).

| 방향 | 문제의식 | 대표 연구 |
|---|---|---|
| Dexterity | 손으로 하는 정교한 조작 | Dex1B (10억 grasp 합성), Dexonomy, DexUMI, RLWRLD RLDX-1 |
| Continual learning | 새 기술 학습 시 기존 기술과 VLM 지식 망각 | LifeLong-RFT (RSS 2026), TRI LBM co-training |
| 효율과 배치 | 거대 모델의 지연과 비용 | SmolVLA (0.45B), Gemini Robotics On-Device, Jetson Thor |
| 평가 | 포화된 sim, 비싼 실환경 | RoboArena, AutoEval, PolaRiS (RSS 2026), world model 평가 |
| 실패 감지와 안전 | 실패의 인지와 복구 | AHA, FailSafe, OopsieVerse (RSS 2026) |
| humanoid whole-body control | 이동과 조작의 통합 | GEAR-SONIC, HOMIE, Figure Helix 02 S0 |

RSS 2026의 주요 세션은 VLA, World Models & Memory, Humanoids, Imitation Learning(3개 세션), RL, Datasets & Benchmarks였고, Outstanding Paper는 FlashSAC(off-policy RL, KAIST 연구진 참여)였다. 어느 방향이든 정답이라 할 만한 연구가 아직 없어 문제 정의 자체가 연구 기여가 될 수 있다. 문제의식도 매우 다양한 방향으로 가질 수 있어 무수한 task가 나올 수 있는 분야다.

## 결과

강의 전체에 흩어진 정량 수치를 주제별로 모으면 다음과 같다. 모두 슬라이드에 인용된 값이다.

| 주제 | 수치 | 슬라이드 |
|---|---|---|
| 로봇 pre-training 효과 | PI Robot Olympics: fine-tuning된 π0.5 평균 52%, 로봇 pre-training 없는 VLM 0% | 18 |
| 일반화 격차 | LIBERO-PRO 90% 이상 → 0%, LIBERO-Plus 95% → 30% 미만, LIBERO-Gen Task-CG 21.2% (π0.5), BEHAVIOR 2025 1위 0.26/1.0 | 22 |
| 시뮬레이션 가속 | ANYmal 평지 보행 GPU 1장 4분, GR00T N1 합성 trajectory 78만 개를 11시간에 생성해 +40%, SimplerEnv 상관 r = 0.92 | 28 |
| 데이터 수집 효율 | ACT 10분 시연 → 80~90% 성공, UMI 시간당 111개 (teleoperation 35개) | 29 |
| action 표현 | FAST 700 → 53 토큰, 학습 최대 5배 가속, OpenVLA-OFT LIBERO 97.1% | 35 |
| Diffusion Policy | 12개 task 평균 +46.9% | 37 |
| 벤치마크 포화 | LIBERO π0.5 96.9%, OFT 97.1% | 39 |
| 학습 자원 | π0.5 5,000 step: H100 4장 3.7시간, OpenVLA 7B 2만 1,500 A100-hour, GR00T N1 약 5만 H100-hour (최대 1,024 GPU) | 40 |
| World model 활용 | WMPO 성공률 53% → 70%, DreamGen 단일 task로 22개 새 행동 | 46 |
| World model 비용 | DreamZero 5.7초 → 150ms (38배), 7Hz 제어 | 47 |
| in-context 학습 | GEN-1.5 학습 없이 59%, 10 step 학습 시 83%, Skild S1 66% 대 언어 지시 9% | 55 |
| 가정 일반화 | Figure Helix 2.5 처음 보는 가정 30곳 zero-shot 56% 대 9% | 54 |
| 3D | Any3D-VLA 실환경 zero-shot grasp 62.5% 대 33.3%, Spatial Forcing LIBERO 98.5%와 학습 3.8배 가속 | 61 |
| 촉각과 힘 | ForceVLA π0 대비 +23.2% | 62 |
| Memory | RoboMME 기억 없음 17.9%, 최선의 memory 44.5%, 인간 90.5% | 63 |
| 추론 | ECoT OpenVLA 대비 +28%, LaRA-VLA 지연 최대 90% 감소 | 65 |
| WAM | DreamZero VLA 대비 2배 이상 일반화, Cosmos Policy LIBERO 98.5%, mimic-video 10배 sample efficiency | 66 |
| human video | EgoScale 22-DoF 손 +54%, Ψ0 human 800시간 + robot 30시간이 10배 데이터 baseline보다 높음 | 69 |
| cross-embodiment | One Hand to Rule Them All 처음 보는 손 zero-shot 81.9% | 70 |
| RL post-training | SimpleVLA-RL LIBERO-Long 17.3% → 91.7%, π*0.6 RECAP throughput 2배와 실패 절반, HIL-SERL 1~2.5시간 학습으로 거의 완벽한 성공률 | 71 |

이 수치들은 두 가지 경향을 보여 준다. 첫째, 같은 벤치마크 계열 안에서도 조건을 바꾸면 성능이 극단적으로 달라진다 (LIBERO 약 97% 대 LIBERO-PRO 0%, LIBERO-Gen 21.2%). 표준 벤치마크 점수만으로 일반화를 판단할 수 없다는 강의의 주장이 여기서 나온다. 둘째, 데이터 수집 방식, RL post-training, 3D와 촉각 같은 구조적 확장은 각각 수십 %p 단위의 개선을 보고한다. 아직 어느 한 방향이 지배적이지 않고 여러 방향이 동시에 성과를 내는 단계라는 뜻이다.

강의의 결론은 네 가지다 (슬라이드 73).

1. **열린 분야**: 2023년 이후 급성장했지만 consensus가 없는 관점 경쟁 단계다.
2. **핵심 병목은 데이터와 일반화**: 벤치마크 점수와 실제 성능의 간극이 있고 scaling 논쟁이 진행 중이다.
3. **LLM 발전 경로의 압축 반복**: pretrain → post-train → RL, chain-of-thought → latent reasoning, context → in-context.
4. **향후 2~3년의 관전 포인트**: VLA 대 WAM, teleoperation 대 human video, fine-tuning 대 in-context.

공장과 물류의 제한적 배치는 진행 중이지만 가정용 범용 로봇은 아직 먼 미래라는 신중론이 공존한다 (MIT Technology Review, 2026.10). 발표자는 다양한 방법론이 난립해 있어 어떤 것이 정답처럼 자리 잡고 어떤 것이 공존하며 남을지 지켜보는 것이 흥미롭다고 말한다. 다루는 task가 아직 기초적이고 단순해서, 사람과 자연스럽게 상호작용하며 작업을 돕는 로봇이 나오기까지는 많은 시간이 걸릴 것이라고 본다. 그만큼 발전 가능성과 역동성이 큰 분야라는 것이 마무리다. 슬라이드는 Physical AI를 'LLM 이후의 다음 frontier'로 정리한다.

## 한계

이 자료를 쓸 때 주의할 점은 다음과 같다.

- **개관 강의의 깊이**: 분야 전체를 55분에 훑는 입문 강의라 개별 방법의 학습 설정이나 ablation은 다루지 않는다. 방법별 세부는 관련 페이지의 원 논문 페이지를 참고한다.
- **2차 인용 수치**: 슬라이드 수치는 우상단에 출처만 표기된 2차 인용이다. 이 wiki는 원 출처를 따로 확인하지 않았다.
- **시점 의존성**: 시장 전망, 밸류에이션, 출하량은 2026년 10월 기준이고 보도 기반 값이 섞여 있다 (예: PI 약 110억 달러 라운드 "보도").
- **해석적 배치**: 진영 지형도는 슬라이드 주석이 밝히듯 발표자 해석에 따른 개념적 배치다.
- **데모의 대표성**: 발표자 스스로 데모 영상이 잘 나온 것 위주로 정리됐을 수 있어 실제 성능과 다를 수 있다고 단서를 단다.
- **자동 자막 오인식**: transcript는 자동 자막이라 고유명사 인식 오류가 많다 ("리베로"는 LIBERO, "엔드 벡터"는 end-effector, "얼티 1"은 RT-1). 이 페이지는 슬라이드 표기로 고유명사를 바로잡았다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Physical AI | 물리 세계를 지각하고 이해하고 추론해서 그 안에서 직접 행동하는 AI (NVIDIA 정의). 학계의 Embodied AI와 사실상 같은 대상 |
| Base VLA | 강의가 확장 방향의 기준으로 삼는 표준 구조. VLM backbone과 flow matching action expert로 구성 |
| Moravec's Paradox | 인간에게 어려운 고차 추론은 AI에게 쉽고, 인간에게 쉬운 감각운동은 AI에게 어렵다는 역설 |
| Task-CG | LIBERO-Gen의 compositional generalization 평가. 학습한 기술의 새 조합 성공률 (π0.5 21.2%) |
| Mode-1 / Mode-2 | LeCun의 구분. Mode-1은 지각에서 즉각 행동, Mode-2는 world model로 결과를 시뮬레이션하며 최적 행동을 탐색 |
| JEPA | pixel이 아니라 latent 표현 공간에서 미래를 예측하는 Meta와 LeCun 계열 구조 (V-JEPA 2) |

## 관련 페이지

- [[overviews/physical-ai-overview]]: physical-ai 카테고리 허브. 이 강의가 다루는 VLA 계보와 world model 트랙의 학습 경로가 있다
- [[overviews/vla-evolution-groot-pi-gemini-robotics-overview]]: 강의의 주요 진영 절에 나온 GR00T, π, Gemini Robotics 계열을 버전별로 비교한 합성 페이지
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]]: VLA라는 용어가 나온 분기점 (RT-2)
- [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x]]: 22종 로봇, 100만 개 이상 trajectory의 다기관 데이터셋
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]]: 이산 토큰 방식의 대표 open VLA
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]: flow matching action expert 구조의 원형 (π0)
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]]: open-world 일반화와 co-training (π0.5)
- [[physical-ai/amin-2025-pistar06-a-vla-that-learns]]: 실환경 RL post-training (π*0.6, RECAP)
- [[physical-ai/ai-2026-pi07-a-steerable-generalist-robotic]]: compositional generalization의 초기 신호와 경량 world model subgoal (π0.7)
- [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation]]: action chunking과 temporal ensembling을 세운 ACT
- [[physical-ai/shukor-2025-smolvla-a-vision-language-action-model]]: 0.45B 경량 VLA와 asynchronous inference
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: data pyramid와 System 2, System 1 구조 (GR00T N1)
- [[physical-ai/nvidia-gr00t-n1-7-3b]]: Cosmos-Reason2-2B backbone의 GR00T N1.7
- [[physical-ai/cui-2025-openhelix-a-short-survey-empirical]]: dual-system VLA 서베이와 실험 분석
- [[physical-ai/figure-ai-2025-helix-a-vision-language-action]]: 7~9Hz와 200Hz의 이중 시계를 쓰는 Figure Helix
- [[physical-ai/google-deepmind-2025-gemini-robotics-15-pushing-the-frontier]]: think before acting과 Motion Transfer (Gemini Robotics 1.5)
- [[physical-ai/parada-2026-gemini-robotics-2-whole-body]]: humanoid whole-body control (Gemini Robotics 2)
- [[physical-ai/nvidia-2025-cosmos-world-foundation-model-platform]]: world foundation model 플랫폼 Cosmos
- [[physical-ai/hou-2026-world-model-for-robot-learning]]: world model과 policy 결합 방식을 분류한 서베이
- [[physical-ai/9bow-2026-world-action-model-rise]]: WAM이 VLA와 나란한 두 번째 레시피로 떠오른 흐름
- [[physical-ai/generalist-ai-2026-gen-1-5-embodied-foundation]]: 강의 도입부 데모이자 physical prompting의 GEN-1.5
- [[physical-ai/skild-2026-introducing-s1-in-context-learning]]: 사람 영상 1개로 in-context 학습하는 Skild AI S1
- [[physical-ai/nasiriany-2026-robocasa365-a-large-scale-simulation-framework]]: 365 tasks 시뮬레이션 벤치마크 RoboCasa365
- [[physical-ai/bai-2026-latent-reasoning-vla-latent-thinking]]: latent reasoning으로 지연을 줄인 LaRA-VLA
- [[physical-ai/lin-2026-failsafe-reasoning-and-recovery-from]]: 실패 감지와 복구 방향의 FailSafe
- [[physical-ai/engiuniverse-2025-14-key-physical-ai-papers]]: 같은 분야를 VLA 논문 14편 중심으로 훑는 한국어 영상
- [[database/dsba-2026-paper-review-graph-based-rag]]: 같은 DSBA 연구실 세미나 채널의 Graph based RAG 논문 리뷰
