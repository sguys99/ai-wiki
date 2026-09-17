---
title: "제미나이 로보틱스 2: 로봇에 전신 지능을 구현하다"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/parada-2026-gemini-robotics-2-whole-body.md
raw_filename: "parada-2026-gemini-robotics-2-whole-body.md"
source_collection: external
author: "Carolina Parada"
url: "https://blog.google/intl/ko-kr/company-news/technology/gemini-robotics-2/"
publisher: "Google Korea Blog"
publication_date: "2026-07-30"
fetched_at: "2026-09-17T21:24:20+0900"
extractor_tier: "chrome"
tags: [physical-ai, vla, humanoid, manipulation]
figures:
  - id: fig01
    file: assets/parada-2026-gemini-robotics-2-whole-body/fig01.webp
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/fig01.webp
    caption: "whole-body manipulation 성공률 차트: Inspire 손을 단 Apollo 2가 탁자(68.4%), 바닥(45.7%), 선반(76.3%)에서 물체를 집는 과제"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/parada-2026-gemini-robotics-2-whole-body/fig02.webp
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/fig02.webp
    caption: "multi-finger dexterity 성공률 차트: SharpaWave 손을 단 Apollo 2의 전구 조이기 36%, 전구 풀기 92%, 쓰레기봉투 묶기 44%, 쓰레받기 32%, 지퍼백 40%"
    strategy: fetched
    curated: true
  - id: fig03
    file: assets/parada-2026-gemini-robotics-2-whole-body/fig03.webp
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/fig03.webp
    caption: "그리퍼 dexterity 성공률 차트: Franka Duo의 일반 pick and place 74.2%, 다양한 도구 kitting 78.9%, 정밀 삽입 89.6%"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/parada-2026-gemini-robotics-2-whole-body/page-full.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/page-full.png
    caption: "전체 페이지 스크린샷 (상단 6,000px)"
    strategy: screenshot
    curated: false
  - id: fig05
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop01.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop01.png
    caption: "히어로 영상(3:00) 썸네일: Apollo 2 humanoid가 무릎을 굽혀 바닥의 물뿌리개를 집는 장면"
    strategy: crop
    curated: true
  - id: fig06
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop02.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop02.png
    caption: "whole-body manipulation 차트의 저해상도 플레이스홀더 (fig01과 같은 내용)"
    strategy: crop
    curated: false
  - id: fig07
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop03.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop03.png
    caption: "multi-finger dexterity 차트의 저해상도 플레이스홀더 (fig02와 같은 내용)"
    strategy: crop
    curated: false
  - id: fig08
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop04.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop04.png
    caption: "Intelligent Whole-Body Control 절 영상 썸네일 (저해상도 플레이스홀더)"
    strategy: crop
    curated: false
  - id: fig09
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop05.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop05.png
    caption: "Advanced Dexterity 절 영상 썸네일 (저해상도 플레이스홀더)"
    strategy: crop
    curated: false
  - id: fig10
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop06.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop06.png
    caption: "Multi-Robot Collaboration 절 영상 썸네일: Messy Garage 과제에서 Franka 양팔 로봇과 Apollo 2가 함께 작업하는 장면"
    strategy: crop
    curated: true
  - id: fig11
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop07.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop07.png
    caption: "관련 게시글 썸네일: 진료실 장면 (본문과 무관)"
    strategy: crop
    curated: false
  - id: fig12
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop08.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop08.png
    caption: "관련 게시글 썸네일: Gemini 3.8 Live 소개 (본문과 무관)"
    strategy: crop
    curated: false
  - id: fig13
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop09.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop09.png
    caption: "관련 게시글 썸네일: Gemini Notebook 화면 (본문과 무관)"
    strategy: crop
    curated: false
  - id: fig14
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop10.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop10.png
    caption: "관련 게시글 썸네일: Gemini 로고 (본문과 무관)"
    strategy: crop
    curated: false
  - id: fig15
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop11.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop11.png
    caption: "관련 게시글 썸네일: AI for the Planet 단체 사진 (본문과 무관)"
    strategy: crop
    curated: false
  - id: fig16
    file: assets/parada-2026-gemini-robotics-2-whole-body/crop12.png
    raw: raw/articles/parada-2026-gemini-robotics-2-whole-body-figures/crop12.png
    caption: "관련 게시글 썸네일: 산호 이미지 (본문과 무관)"
    strategy: crop
    curated: false
---

## 한 줄 요약 (One-line Summary)

Google DeepMind가 2026년 7월 30일 공개한 Gemini Robotics 2는 humanoid의 whole-body control, 다지 손과 그리퍼의 dexterous manipulation, embodied reasoning 모델이 지휘하는 다중 로봇 협업을 한 세대에 묶은 로봇 foundation model 계열이다. VLA인 Gemini Robotics 2, agentic VLM인 Gemini Robotics ER 2, 로봇 기기에서 실행하는 Gemini Robotics On-Device 2의 세 모델로 구성되며, 같은 체크포인트로 세 embodiment를 제어한 성공률 차트와 새 안전 벤치마크 ASIMOV-Agentic을 함께 내놓았다.

## 1. 자료 정보 (Document Information)

구글코리아 블로그에 2026년 7월 30일 실린 한국어 발표 글이다. 저자는 Google DeepMind의 Senior Director, Robotics인 Carolina Parada이고, 읽는 데 15분이 걸린다고 표시돼 있다. 부제는 "발끝부터 손끝까지 구글은 복잡한 과제를 폭넓게 수행할 수 있도록 로봇에 지능적인 whole-body control과 정밀한 manipulation 능력, 그리고 협업 능력을 학습시키고 있습니다"이다.

글은 제품 발표문이며 기술 보고서가 아니다. 모델 크기, 아키텍처, 학습 데이터 규모, control frequency는 나오지 않는다. 대신 3분짜리 히어로 영상, 성공률 막대 차트 3장, 절마다 붙은 시연 영상, 온디바이스 모델의 6분할 영상이 실려 있다. 영상 내용은 텍스트로 남지 않았고, 차트 3장은 원본 이미지를 확보했다.

본문이 연결하는 외부 자료는 다음과 같다.

| 자료 | 위치 |
|---|---|
| Gemini Robotics 제품 페이지 | deepmind.google/models/gemini-robotics |
| Gemini Robotics 1.5 발표 글 | deepmind.google/blog/gemini-robotics-15-brings-ai-agents-into-the-physical-world |
| 개발자 블로그 (ER 2를 하드웨어에 적용하는 방법) | blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-robotics-er-2 |
| Gemini Robotics ER 2 모델 카드 | deepmind.google/models/model-cards/gemini-robotics-er-2 |
| Gemini Robotics On-Device 2 모델 카드 | deepmind.google/models/model-cards/gemini-robotics-on-device-2 |
| Gemini Robotics 2: Safety Technical Report (PDF) | storage.googleapis.com/deepmind-media/gemini-robotics/Gemini-Robotics-2-Safety.pdf |
| ASIMOV-Agentic 데이터셋 | huggingface.co/datasets/google/asimov_agentic |
| Apptronik Apollo 2 | apptronik.com/apollo/apollo-2 |
| Franka FR3 Duo | franka.de/fr3-duo |
| Trusted Tester Program 신청 폼 | Google Forms |

이용 경로는 두 가지로 나뉜다. 추론 모델인 Gemini Robotics ER 2는 Google AI Studio와 Gemini Enterprise Agent Platform의 프라이빗 프리뷰로 제공되고, VLA와 온디바이스 모델은 얼리 액세스 파트너에게만 제공된다. 본문의 AI Studio 링크가 `aistudio-preprod.corp.google.com`이라는 내부 preprod 도메인을 가리키는 점은 발행 시점의 오류로 보이며, 외부에서는 열리지 않는다.

## 2. 주요 기여 (Key Contributions)

Gemini Robotics 2는 환경에 적응하는 차세대 로봇을 위한 핵심 지능 모델로 소개된다. 글이 강조하는 새 능력은 지능적인 whole-body control, 고도화된 dexterous manipulation, 다중 로봇 협업 세 가지다. whole-body control은 팔뿐 아니라 다리와 몸통까지 포함한 로봇의 모든 관절을 하나의 목표 아래 함께 제어하는 것을 말한다.

- humanoid의 전신을 처음으로 제어한다. 이전 모델은 탁자 위 작업을 위해 상체만 제어했다. Apptronik Apollo 2에 "물뿌리개를 맨 아래 선반의 초록색 통에 넣어 줘"라고 지시하면 탁자로 이동해 물뿌리개를 집고 선반까지 걸어가 지정한 위치에 놓는다.
- 손과 그리퍼 모두에서 dexterous manipulation 수준을 높였다. Apollo 2에 장착한 SharpaWave 5지 22자유도 손으로 매듭을 묶고 지퍼백을 잠그며, Franka FR3 Duo의 표준 2지 평행 그리퍼로 촘촘한 포장 작업을 수행한다.
- embodied reasoning 모델 Gemini Robotics ER 2가 상위 의사결정을 맡아 수 분 동안 수백 번의 의사결정이 필요한 long-horizon 과제를 계획하고 진행 상황을 추적한다. long-horizon은 여러 단계를 이어야 끝나는 긴 과제를 말한다.
- 서로 다른 유형의 로봇이 소통하며 협력하는 다중 로봇 협업 기능을 새로 도입했다.
- Gemini Robotics On-Device 2는 일반적으로 200개 미만의 예시와 몇 시간의 학습만으로 새로운 양팔 로봇 embodiment에 적응한다. embodiment는 policy가 제어하는 로봇 하드웨어의 형태와 센서 구성을 말한다.
- 같은 모델 체크포인트 하나로 세 가지 embodiment(SharpaWave 손을 단 Apollo 2, Inspire 손을 단 Apollo 2, Robotiq 그리퍼를 단 Franka Duo)를 제어한 성공률을 공개했다.
- 에이전트 안전 오케스트레이션과 불확실성 해소 능력을 재는 새 벤치마크 ASIMOV-Agentic을 공개했고, Gemini Robotics ER 2가 안전 제약 준수와 사람 근접성 벤치마크에서 구글 로봇 모델 가운데 가장 높은 안전성을 보인다고 밝혔다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 문제 설정

글은 현재 로봇의 한계를 세 가지로 정리한다. 대부분의 로봇은 제한적이고 반복적인 작업을 하도록 사전에 프로그래밍되거나 teleoperation으로 조종된다. 스스로 학습하거나 예측하기 어려운 환경에 적응하는 능력이 부족하다. 그리고 한 로봇이 익힌 기술을 다른 형태의 로봇에 옮기기 어렵다. 다양한 형태와 크기의 로봇이 복잡한 과제를 대규모로 수행하려면 스스로 판단하고 행동하며 주변과 상호작용하는 AI 모델이 필요하다는 것이 출발점이다.

Gemini Robotics 2가 그리는 목표 장면은 다음과 같다. humanoid 로봇이 걷고 앉고 몸을 굽히거나 뻗고 물체를 다뤄 어질러진 방을 정리하며, 다른 로봇과 협력해 작업을 더 빠르게 끝낸다. 이 신체 지능은 로봇 기기 자체에서 로컬로 실행할 수 있고, 몇 시간 만에 전혀 새로운 형태의 로봇에도 적응한다.

### 세 모델 구성

| 모델 | 종류 | 역할 | 특징 |
|---|---|---|---|
| Gemini Robotics 2 | VLA | 시각과 언어 입력을 모터 제어 신호로 변환한다 | humanoid 전신(발끝부터 손끝까지)과 기타 양팔 로봇을 제어한다. 다지 손과 그리퍼 모두에서 dexterous manipulation 수준을 높였다 |
| Gemini Robotics ER 2 | embodied reasoning VLM (agentic) | 사람과 소통하고 물리 환경을 이해하며 수 분 동안 이어지는 다단계 작업을 계획한다 | 여러 로봇이 하나의 팀으로 협력하는 기능을 새로 도입했다 |
| Gemini Robotics On-Device 2 | VLA (온디바이스 최적화) | 로봇 기기에서 로컬로 실행된다 | 몇 시간 분량의 데이터만으로 새로운 embodiment에 적응한다. 구글의 가장 효율적인 VLA다 |

VLA는 시각과 언어 입력을 받아 action을 직접 출력하는 모델이고, VLM은 시각과 언어를 이해하되 action을 내지 않는 모델이다. 세 모델 가운데 실제 모터를 움직이는 것은 두 VLA이며, ER 2는 그 위에서 계획과 감독을 맡는다.

### ER 2가 VLA를 지휘하는 구조

현실 세계의 대부분의 작업은 여러 단계를 거쳐 오랜 시간 수행된다. 이런 작업을 처리하기 위해 Gemini Robotics ER 2가 로봇의 상위 의사결정 역할을 한다. ER 2의 동작은 다섯 단계로 서술된다.

- 이용자의 지시문(instruction)을 이해하고 사람과 소통한다.
- 주변 환경을 관찰해 작업을 완료하는 데 필요한 단계를 계획한다.
- VLA 모델과 협력해 각 동작을 수행한다.
- 작업이 완료될 때까지 진행 상황을 계속 추적한다.
- 중간 단계에서 문제가 생기면 스스로 수정하고, 새로운 환경과 목표에 대응한다.

이번 업데이트로 ER 2는 작업의 시작과 끝을 이해하고 핵심 사건이 일어나는 순간을 정확히 인식하게 됐다. 그 결과 수 분에 걸쳐 수백 번의 의사결정이 필요한 long-horizon 과제도 더 안정적으로 수행한다고 밝힌다. 다중 로봇 협업도 이 구조 위에 놓인다. 서로 다른 유형의 로봇이 서로 소통하며 협력해, 하나의 로봇만으로는 수행하기 어려운 복잡한 워크플로를 함께 처리한다.

### whole-body control

세상은 사람의 움직임에 맞춰 설계되어 있어서, 좁고 복잡한 공간에서 팔을 뻗고 몸을 굽히며 균형을 유지해야 한다. 이전 모델이 탁자 위 작업을 위해 humanoid의 상체만 제어했다면, Gemini Robotics 2는 물리 AI의 범위를 전신 움직임까지 확장했다.

Apollo 2 예시는 지시문 하나가 이동과 manipulation의 연쇄로 풀리는 과정을 보여준다. "물뿌리개를 맨 아래 선반의 초록색 통에 넣어 줘"라는 지시문을 받으면 로봇은 이를 이해한 뒤 탁자로 이동해 물뿌리개를 집어 들고, 선반까지 걸어가 지정된 위치에 놓는다. 글은 로봇의 이동 속도가 앞으로 개선할 부분으로 남아 있다고 인정한다.

### 손과 그리퍼의 dexterous manipulation

dexterous manipulation은 손가락이나 그리퍼로 물체를 섬세하게 다루는 작업을 말한다. 로봇이 가정과 사업장에서 실제로 쓰이려면 이 능력이 필수라고 글은 전제하며, Gemini Robotics 2가 손과 그리퍼 등 다양한 end-effector를 제어한다고 설명한다. end-effector는 로봇 팔 끝에 달려 물체와 직접 접촉하는 부분이다.

| end-effector | 장착 로봇 | 시연 과제 |
|---|---|---|
| SharpaWave 손 (5지, 22자유도) | Apollo 2 | 매듭 묶기, 지퍼백 잠그기 |
| 표준 2지 평행 그리퍼 | Franka FR3 Duo | 촘촘한 포장 작업 |

구글은 사람 수준의 정밀한 manipulation을 목표로 정밀도와 속도를 계속 높이고 있다고 밝힌다.

### 온디바이스 모델과 motion transfer

많은 로봇 애플리케이션은 네트워크 지연이나 인터넷 연결 없이 동작해야 한다. Gemini Robotics On-Device 2는 이 요구에 맞춰 로봇 기기에서 직접 실행되도록 최적화한 모델이다.

이 모델은 기본적으로 다양한 embodiment를 지원하며, Gemini Robotics 1.5의 고도화된 motion transfer 기술을 계승했다. 글은 motion transfer를 정의하지 않지만, 문맥상 새로운 embodiment에 빠르게 적응하는 능력의 근거로 제시한다. 적응에 필요한 데이터는 일반적으로 200개 미만의 예시와 몇 시간의 학습이다.

6분할 영상은 형태와 센서 구성과 자유도가 크게 다른 로봇 세 종에서의 과제를 보여준다.

| 로봇 | 과제 |
|---|---|
| Dexmate | 책장에 책 꽂기, CAPTCHA를 풀기 위해 마우스 클릭하기, 식기세척기에 그릇 넣기 |
| Trossen | 체스판 위 말 옮기기, 커피잔 다루기 |
| SO101 | 전자 부품 분류하기 |

### 안전 접근

안전은 구글 로봇 연구의 핵심 원칙으로 서술된다. 로봇의 물리적 역량이 커질수록 end-to-end 안전성과 alignment를 확보하기 위해, 매 모델 출시마다 기존의 물리적 안전 조치와 AI 안전 프레임워크를 결합한 다층 접근을 적용해 왔다고 밝힌다. Gemini Robotics 2는 특히 현실 세계의 불확실한 환경을 탐색하고 사람과 안전하게 협업하도록 로봇 안전 기술을 발전시켰다.

새 벤치마크 ASIMOV-Agentic은 에이전트 안전 오케스트레이션과 불확실성 해소 능력을 평가한다. 평가 항목의 예는 두 가지다.

- embodied reasoning 에이전트가 VLA의 안전하지 않은 tool call을 거부하는 능력. tool call은 모델이 외부 기능을 호출하는 행위를 말한다.
- 작업 수행 가능 여부를 예측하고, 확신이 없을 때 사람의 개입을 선제적으로 요청하는 능력.

ER 2의 안전 동작은 세 가지로 서술된다. 사람의 접근을 더 정확하게 감지하고, 필요할 때 안전 관련 tool을 실행하며, 사람이 지나치게 가까이 오면 로봇을 안전하게 정지시킨다. 글은 이를 사람과 로봇이 함께 작업하기 위한 협업 안전 표준의 중요한 요구사항이라고 설명한다. 세부 내용은 별도의 Safety Technical Report에 담겨 있다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 단일 체크포인트의 세 embodiment 평가

차트 3장은 같은 모델 체크포인트를 세 embodiment에서 평가한 결과다. 각 막대는 같은 기술 범주에 속한 여러 과제의 평균 성공률이고, multi-finger 과제만 과제별 성능을 따로 표시했다. 막대마다 오차 막대가 붙어 있지만 그 의미(표준편차인지 신뢰구간인지)와 시행 횟수는 적혀 있지 않다.

whole-body manipulation (Inspire 손을 단 Apollo 2):

| 과제 범주 | 성공률 |
|---|---|
| 탁자에서 집기 | 68.4% |
| 바닥에서 집기 | 45.7% |
| 선반에서 집기 | 76.3% |

multi-finger dexterity (SharpaWave 손을 단 Apollo 2, 과제별):

| 과제 | 성공률 |
|---|---|
| 전구 조이기 | 36% |
| 전구 풀기 | 92% |
| 쓰레기봉투 묶기 | 44% |
| 쓰레받기 | 32% |
| 지퍼백 | 40% |

그리퍼 dexterity (Franka Duo):

| 과제 범주 | 성공률 |
|---|---|
| 일반 pick and place | 74.2% |
| 다양한 도구 kitting | 78.9% |
| 정밀 삽입 | 89.6% |

글의 해석은 명확하다. whole-body control 과제와 그리퍼 기반 정밀 manipulation에서는 높은 성공률을 달성했지만, multi-finger 손을 쓰는 정교한 manipulation은 여전히 해결해야 할 과제로 남아 있다. 수치로 보면 그리퍼 과제는 세 범주 모두 74% 이상인 반면, multi-finger 과제는 전구 풀기(92%)를 제외한 네 과제가 32%에서 44% 사이에 머문다. whole-body 과제 중에서는 바닥에서 집기(45.7%)가 가장 낮은데, 몸을 가장 크게 굽혀야 하는 과제다.

### 정성적 결과

- Apollo 2가 물뿌리개 지시문을 이동, 집기, 보행, 놓기의 연쇄로 수행했다.
- SharpaWave 손으로 매듭 묶기와 지퍼백 잠그기, Franka FR3 Duo 그리퍼로 촘촘한 포장을 수행했다.
- ER 2는 작업의 시작과 끝, 핵심 사건 발생 시점을 인식해 진행 상황을 추적한다.
- On-Device 2는 Dexmate, Trossen, SO101에서 여섯 과제를 수행했다.
- ER 2는 안전 제약 준수와 사람 근접성 벤치마크에서 구글 로봇 모델 가운데 가장 높은 안전성을 보였다. 구체 수치는 글에 없다.

### 제공 범위

| 모델 | 제공 방식 |
|---|---|
| Gemini Robotics ER 2 | Google AI Studio와 Gemini Enterprise Agent Platform의 프라이빗 프리뷰 |
| Gemini Robotics 2 (VLA) | 얼리 액세스 파트너 (Trusted Tester Program 신청) |
| Gemini Robotics On-Device 2 | 얼리 액세스 파트너 (Trusted Tester Program 신청) |

## 5. 한계와 향후 과제 (Limitations and Future Work)

글이 직접 인정하는 한계는 세 가지다.

- humanoid의 이동 속도가 아직 느리며 개선할 부분으로 남아 있다.
- multi-finger 손을 쓰는 정교한 manipulation은 해결해야 할 과제다. 차트에서 쓰레받기 32%, 전구 조이기 36%가 이를 보여준다.
- 사람 수준의 정밀한 manipulation을 위해 정밀도와 속도를 계속 높이는 중이다.

발표문이라는 형식에서 오는 공백은 더 크다.

- 모델 크기, 아키텍처, 학습 데이터 규모와 구성, control frequency, 추론 지연이 전혀 공개되지 않았다. 이전 세대와의 정량 비교도 없다.
- 차트의 과제 범주에 어떤 과제가 몇 개 들어가는지, 시행 횟수가 몇 번인지, 오차 막대가 무엇인지 적혀 있지 않다.
- ER 2의 안전 벤치마크 결과는 "가장 뛰어난 안전성"이라는 서술뿐이고 수치는 Safety Technical Report로 미뤄져 있다.
- 다중 로봇 협업은 기능 도입 사실과 영상 썸네일(Messy Garage 과제)만 있고, 로봇 사이의 통신 방식이나 역할 분담은 설명되지 않는다.
- motion transfer는 이름만 언급되고 정의나 동작 원리는 없다.
- VLA와 온디바이스 모델은 얼리 액세스 파트너에게만 열려 있어 외부 재현이 불가능하다.
- 본문에서 "온디바이스"와 "온-디바이스"가 섞여 쓰이고, AI Studio 링크가 내부 preprod 도메인을 가리킨다.

## 6. 관련 연구 (Related Work)

글 안에서 직접 이어지는 계보는 Gemini Robotics(2025)와 Gemini Robotics 1.5다. 첫 세대는 Gemini의 멀티모달 이해 능력이 실제 행동으로 이어질 수 있음을 보였고, 1.5는 motion transfer 기술을 도입했다. Gemini Robotics 2는 이 둘을 이어 전신 움직임과 다중 로봇 협업으로 범위를 넓힌 세대로 자리매김한다.

저장소 안에서는 다음 페이지가 이 계열을 다룬다.

- [[physical-ai/learnopencv-2025-vision-language-action-models-vla]]: 첫 세대 Gemini Robotics를 ER과 VLA 두 모델로 나눠 소개한다. ER 2와 VLA의 분업 구조는 첫 세대의 구성을 그대로 잇는다.
- [[physical-ai/xu-2025-an-anatomy-of-vision-language-action-models]]: Gemini Robotics의 안전 데이터 Constitutional AI post-training을 학습 기반 alignment 계열로 분류한다. ASIMOV-Agentic은 같은 흐름 위의 벤치마크다.
- [[physical-ai/sa-2026-vision-language-action-models-for]]: Gemini Robotics 2 계열이 기술 보고서 없이 출시돼 파라미터 수와 action 표현, control frequency가 미공개라고 기록한다. 이 발표문이 바로 그 공백의 원문이다.
- [[physical-ai/zhang-2026-a-survey-of-physical-ai]]: Gemini Robotics 계열을 비공개 frontier 시스템으로 분류하며 제한된 공개 아래에서의 재현성과 투명성을 평가 과제로 든다.
- [[overviews/physical-ai-overview]]: Gemini Robotics를 "앞으로 채울 자리"로 두고 있었다. 이 글이 첫 원본이지만 발표문이라 아키텍처 공백은 남는다.

## 7. 용어집 (Glossary)

| 용어 | 설명 |
|---|---|
| Gemini Robotics 2 | 시각과 언어 입력을 모터 제어 신호로 변환하는 구글의 VLA. humanoid 전신과 양팔 로봇을 제어하고 다지 손과 그리퍼 모두를 다룬다 |
| Gemini Robotics ER 2 | 에이전트 역할을 하는 embodied reasoning VLM. 사람과 소통하고 환경을 이해하며 수 분짜리 다단계 작업을 계획하고 VLA를 지휘한다 |
| Gemini Robotics On-Device 2 | 로봇 기기에서 로컬로 실행되도록 최적화한 VLA. 200개 미만 예시와 몇 시간 학습으로 새 양팔 embodiment에 적응한다 |
| motion transfer | Gemini Robotics 1.5에서 도입돼 On-Device 2가 계승한 기술. 글은 새 embodiment 적응의 근거로만 언급하고 정의하지 않는다 |
| ASIMOV-Agentic | 에이전트 안전 오케스트레이션과 불확실성 해소 능력을 재는 새 벤치마크. 안전하지 않은 tool call 거부, 수행 가능 여부 예측, 사람 개입 요청을 평가한다 |
| 다중 로봇 협업 (multi-robot collaboration) | 서로 다른 유형의 로봇이 소통하며 협력해 하나의 로봇으로는 어려운 워크플로를 함께 처리하는 기능. ER 2에 새로 도입됐다 |
| SharpaWave 손 | Apollo 2에 장착한 5지 22자유도 손. 매듭 묶기와 지퍼백 잠그기 시연에 쓰였다 |
| Apollo 2 | Apptronik의 humanoid. whole-body control 시연과 두 종류의 손 평가에 쓰였다 |

## 8. 그림 후보 (Figure Candidates)

원본 이미지는 차트 3장뿐이고, 나머지는 페이지 크롭이다. 크롭 가운데 영상 썸네일은 재생 전 프레임이며, 관련 게시글 썸네일 6장은 본문과 무관하다. 차트 크롭 2장(fig06, fig07)은 lazy loading 전 저해상도 플레이스홀더라 fig01, fig02로 대체한다.

| id | 원본 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | fig01.webp | whole-body manipulation 성공률 (Apollo 2 + Inspire 손) | fetched | ★ wiki 권장 (result) |
| fig02 | fig02.webp | multi-finger dexterity 성공률 (Apollo 2 + SharpaWave 손) | fetched | ★ wiki 권장 (result) |
| fig03 | fig03.webp | 그리퍼 dexterity 성공률 (Franka Duo) | fetched | ★ wiki 권장 (result) |
| fig04 | page-full.png | 전체 페이지 스크린샷 | screenshot | (아카이브용) |
| fig05 | crop01.png | 히어로 영상 썸네일, Apollo 2가 물뿌리개를 집는 장면 | crop | ★ wiki 권장 (hero) |
| fig06 | crop02.png | whole-body 차트 저해상도 플레이스홀더 | crop | (fig01과 중복) |
| fig07 | crop03.png | multi-finger 차트 저해상도 플레이스홀더 | crop | (fig02와 중복) |
| fig08 | crop04.png | Intelligent Whole-Body Control 영상 썸네일 | crop | (선택, 저해상도) |
| fig09 | crop05.png | Advanced Dexterity 영상 썸네일 | crop | (선택, 저해상도) |
| fig10 | crop06.png | Multi-Robot Collaboration 영상 썸네일, Messy Garage | crop | ★ wiki 권장 (method) |
| fig11 | crop07.png | 관련 게시글 썸네일 (진료실) | crop | (본문과 무관) |
| fig12 | crop08.png | 관련 게시글 썸네일 (Gemini 3.8 Live) | crop | (본문과 무관) |
| fig13 | crop09.png | 관련 게시글 썸네일 (Gemini Notebook) | crop | (본문과 무관) |
| fig14 | crop10.png | 관련 게시글 썸네일 (Gemini 로고) | crop | (본문과 무관) |
| fig15 | crop11.png | 관련 게시글 썸네일 (AI for the Planet) | crop | (본문과 무관) |
| fig16 | crop12.png | 관련 게시글 썸네일 (산호) | crop | (본문과 무관) |
