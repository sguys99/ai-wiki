---
title: "구글 'RT-1, RT-2', 로봇개발자라면 반드시 이 내용 알아야 합니다 l 구글 딥마인드 Robotics Transformer 핵심 논문 리뷰"
type: video
year: 2025
category: physical-ai
raw_path: raw/videos/engiuniverse-2025-rt1-rt2-robotics-transformer-review.md
raw_filename: "engiuniverse-2025-rt1-rt2-robotics-transformer-review.md"
source_collection: external
channel: "엥지유니버스 | 로봇 엔지니어"
uploader_id: "@engiuniverse"
channel_url: "https://www.youtube.com/@engiuniverse"
url: "https://www.youtube.com/watch?v=_OMsegs08fo"
video_id: "_OMsegs08fo"
upload_date: "2025-04-20"
duration: "PT19M49S"
caption_source: "youtube auto-generated caption (ko-orig)"
tags: [physical-ai, vla, robot-learning, imitation-learning, video]
---

## 한 줄 요약 (One-line Summary)

RT-1의 CNN+FiLM 구조와 RT-2의 VLM 통합 구조를 텐서 크기까지 손으로 짚어가며 나란히 뜯어보고 RT-2가 왜 로봇 행동을 "또 하나의 언어"로 다루게 됐는지를 하나의 서사로 엮은 20분짜리 한국어 아키텍처 해설 영상.

## 1. 자료 정보 (Document Information)

- 채널: 엥지유니버스 | 로봇 엔지니어 (`@engiuniverse`)
- 업로드: 2025-04-20, 길이 19분 49초
- 자막: 자동 생성(ko-orig). 수동 자막이 아니어서 발음이 비슷한 전문용어가 종종 다르게 옮겨진다. EfficientNet→이피시언트넷, PaLI-X→팔리엑스, PaLM-E→파미, FiLM→필름, RT-1→알티어가 그런 예다. 숫자와 고유명사는 아래 6절의 원논문 wiki 페이지와 대조해 확인했다
- 형식: RT-1과 RT-2 두 논문을 순서대로 깊이 들어가는 리뷰. 여러 편을 훑는 서베이가 아니라 두 논문의 아키텍처 대조에 집중한다. 같은 채널이 8개월 뒤 올린 `videos/engiuniverse-2025-14-key-physical-ai-papers`는 이 영상이 다룬 RT-1과 RT-2를 출발점 삼아 12편으로 확장한 서베이다

## 2. 주요 기여 (Key Contributions)

영상은 RT-1과 RT-2를 각각 새 논문으로 소개하는 대신 "왜 로봇 제어에 foundation model이 필요한가"라는 질문에서 출발해 둘을 하나의 진화선으로 묶는다. 도입부는 특정 태스크에 맞춰 훈련된 기존 로봇이 부품 형태나 색상이 조금만 바뀌어도 재학습이 필요한 이유를 짚고 GPT와 CLIP이 NLP와 CV에서 이미 증명한 일반화 능력을 로봇에 옮기면 데이터 수집 비용 절감, 범용성 확보, 제로샷과 퓨샷 학습이라는 세 이점을 얻는다는 틀을 세운다. 이 틀 위에 RT-1은 "언어로 조건화된 CNN", RT-2는 "행동을 언어로 다루는 VLM"으로 대응시켜 두 모델의 구조 차이가 어디서 비롯됐는지 설명한다.

가장 공을 들인 대목은 텐서 크기를 숫자 하나하나 대입해 보여주는 부분이다. 300×300×3 이미지가 EfficientNet-B3를 지나 9×9×512 피처맵이 되고 이게 평탄화되어 81개의 512차원 비전 토큰이 되며 TokenLearner가 이 중 8개만 골라내는 흐름을 그림 대신 숫자로 따라가게 한다. RT-2 쪽도 마찬가지로 224×224 이미지가 16×16 패치로 잘려 196개 패치가 되고 각 패치가 768차원 벡터로 바뀌는 과정을 같은 방식으로 짚는다. 원논문을 읽을 때 건너뛰기 쉬운 shape 변화를 시청자가 손으로 계산하며 따라갈 수 있게 만든 점이 이 영상의 실질적인 값어치다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### RT-1, 언어로 조건화된 CNN

RT-1은 이미지와 자연어 지시 두 가지를 입력받는다. 로봇 카메라가 찍은 300×300×3 이미지는 pre-training된 EfficientNet-B3를 지나며 9×9 그리드, 각 위치 512차원의 피처맵으로 압축된다. 동시에 자연어 지시는 Universal Sentence Encoder를 거쳐 512차원 벡터가 된다. 이 둘을 잇는 게 FiLM 레이어다. 언어 임베딩에서 뽑아낸 감마(γ)와 베타(β) 값을 이미지 피처맵의 각 채널에 곱하고 더해서 지시와 관련된 채널(예: "사과를 집어라"라면 사과 모양에 반응하는 채널)은 강조하고 나머지는 억제한다.

9×9×512 피처맵은 81개의 512차원 비전 토큰으로 평탄화되고 TokenLearner가 이 중 가장 중요한 8개만 골라 Transformer에 넘긴다. Transformer는 decoder-only 구조로, 비전 토큰과 언어 임베딩을 받아 로봇 행동을 나타내는 11개의 정수 토큰을 순서대로 출력한다. 각 토큰은 0~255 중 하나의 값이며(예: 128은 base X좌표, 100은 그리퍼 열림 정도, 1은 작업 종료 신호), 디코딩 과정을 거쳐 실제 제어 신호로 복원된다. 학습은 13대의 로봇이 17개월에 걸쳐 모은 약 13만 개의 실제 로봇 시연 데이터로 하는 behavioral cloning이다.

### RT-2, 행동을 언어로 통합한 VLM

RT-2도 이미지와 언어 지시를 받아 행동을 출력한다는 입출력 구조는 같지만 내부는 완전히 다르다. RT-1처럼 이미지와 언어를 따로 처리한 뒤 FiLM으로 붙이는 대신, pre-training된 VLM(PaLI-X 또는 PaLM-E) 하나가 전체 처리를 통합한다. 명령 문장은 토크나이저를 거쳐 정수 토큰이 되고 임베딩 레이어를 지나 벡터로 바뀐다. 이미지는 Vision Transformer 인코더로 들어가 224×224 이미지가 16×16 패치 196개로 잘리고 각 패치가 768차원 벡터로 평탄화된다.

RT-2의 핵심은 이렇게 만든 텍스트 토큰과 이미지 토큰을 같은 시퀀스로 이어 붙여 하나의 멀티모달 Transformer에 넣는다는 점이다. 인코더에서 cross-attention으로 이미지와 텍스트 토큰이 서로를 참조하고("red"라는 단어가 이미지 속 빨간 물체에 강하게 반응하는 식), 디코더는 문장을 생성하듯 숫자 토큰 시퀀스를 만든다. 이 숫자들이 곧 로봇 행동이다. RT-1과 동일하게 11개 항목을 0~255로 양자화하지만 VLM의 텍스트 어휘 안에 정수 토큰으로 끼워 넣어 행동을 "언어의 일부"처럼 다룬다는 점이 다르다.

RT-2는 이 VLM을 로봇 제어에 그대로 쓰지 않고 원래의 웹 규모 vision-language 데이터와 로봇 시연 데이터를 같은 배치에 섞어 함께 파인튜닝하는 co-fine-tuning으로 학습한다. 웹 지식을 유지하면서 로봇 행동 감각을 더하는 절충이다. 그 결과 RT-2는 "사과를 3이라는 숫자 위에 올려라"(숫자 인식), "피곤해, 마실 것 좀 줘"(에너지 드링크를 음료로 추론), "가장 오른쪽 물체를 가져와"(공간 비교) 같은 명령을 학습 데이터에 없던 조합으로도 수행한다. 더 나아가 "망치가 필요해 → 주변에 망치가 없어 → 돌이 있네 → 돌을 망치로 쓰자"처럼 action token에 앞서 추론 과정을 텍스트로 먼저 생성하는 사례도 보여준다.

### 영상이 정리한 RT-1 vs RT-2 비교

| 항목 | RT-1 | RT-2 |
|---|---|---|
| 입력 구조 | 이미지 + 자연어 지시 | 이미지 + 자연어 지시 (동일) |
| 비전 백본 | EfficientNet-B3 + FiLM | PaLI-X 또는 PaLM-E (VLM 통합) |
| 행동 표현 | 11개 이산 정수 토큰(0~255) | 동일한 양자화, 텍스트 토큰 시퀀스로 통합 |
| Transformer 구조 | 커스텀 decoder-only | 기존 대형 VLM + 로봇 데이터 추가 학습 |
| 학습 데이터 | 13대 로봇, 17개월, 약 13만 개 시연 | 기존 시연 데이터 + 웹 규모 vision-language 데이터 |
| 학습 방식 | Behavioral cloning (시연 데이터만) | Co-fine-tuning (웹 데이터 + 시연 데이터) |
| 일반화 | 학습한 태스크와 유사 환경에 강함, 제한적 제로샷 | 상징 인식, 수량 비교, 관계 추론 등 VLM 지식 활용 |
| 추론 능력 | 학습한 동작 중심으로 제한적 | 개념 이해 + chain-of-thought 추론 |
| 실시간성 | 경량 구조로 실시간 제어 가능 | 대형 모델은 클라우드 TPU 필요, 속도 제한적 |
| 모델 크기 | 35M 파라미터 | PaLI-X 55B / PaLM-E 12B |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

영상은 서사와 아키텍처 설명에 집중하는 리뷰라 성공률 같은 정량 벤치마크는 다루지 않는다. 등장하는 수치는 모델 규모와 학습 데이터 스케일이 전부다.

| 항목 | 수치 |
|---|---|
| RT-1 학습 데이터 | 로봇 13대, 17개월, 약 13만 개 실제 로봇 시연 |
| RT-1 모델 크기 | 35M 파라미터 |
| RT-2 모델 크기 | PaLI-X 55B, PaLM-E 12B 파라미터 |
| RT-1 행동 표현 | 11차원, 각 0~255 양자화 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

자동 생성 자막이라 전문용어 오인식이 잦다. 7절 용어집은 원논문과 대조해 정정한 표기이고 "1년의 리즈닝"처럼 문맥상 의미는 짐작되지만 정확한 원문을 복원하지 못한 구간도 일부 남아 있다.

영상은 아키텍처 설명에 집중하고 두 논문의 정량 벤치마크(seen/unseen 성공률, distractor와 background 강건성, emergent skill 비교 등)는 다루지 않는다. 수치가 필요하면 6절에 링크한 원논문 wiki 페이지의 결과 절을 봐야 한다.

화면에 원논문 다이어그램이나 자체 제작 슬라이드가 등장하는지, 등장한다면 어느 시점인지는 자막만으로는 알 수 없다. Figure 후보를 만들려면 사용자가 영상을 직접 보고 timestamp를 지정해야 한다. 이번 ingest에서는 Step 2.5(키프레임 캡처)를 보류했다.

## 6. 관련 연구 (Related Work)

이 wiki에 이미 있는 자료와의 관계:

- `physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world`: 이 영상이 리뷰하는 첫 번째 원논문. 13만 시연, 13대 로봇, 17개월, EfficientNet-B3+FiLM+TokenLearner(81→8)+decoder-only Transformer 구조가 영상 설명과 정확히 일치한다
- `physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web`: 이 영상이 리뷰하는 두 번째 원논문. co-fine-tuning 전략과 PaLI-X 55B와 PaLM-E 12B 파라미터 수가 영상 수치와 일치한다
- `physical-ai/engiuniverse-2025-14-key-physical-ai-papers`: 같은 채널의 후속 서베이 영상. 이 영상이 깊이 다룬 RT-1과 RT-2를 출발점 삼아 Octo부터 RTC까지 12편으로 확장한다. 두 영상을 이어 보면 아키텍처 심화 → VLA 계보 전체 조망 순서가 된다

## 7. 용어집 (Glossary)

- **FiLM (Feature-wise Linear Modulation)**: 언어 임베딩에서 뽑은 채널별 스케일(γ)과 시프트(β) 값으로 CNN 피처맵을 조건화하는 레이어. 영상은 "필름 레이어"로 표기
- **EfficientNet-B3**: RT-1이 이미지 인코더로 쓰는 pre-training된 CNN. 자막은 "이피시언트넷 B3"로 표기
- **TokenLearner**: 81개 비전 토큰을 8개로 압축하는 학습형 토큰 선별 모듈
- **Universal Sentence Encoder (USE)**: RT-1이 자연어 지시를 512차원 벡터로 인코딩하는 pre-training된 문장 인코더
- **PaLI-X / PaLM-E**: RT-2의 backbone VLM 두 종류. 각각 55B와 12B 파라미터. 자막은 "팔리엑스"와 "파미"로 표기
- **Co-fine-tuning**: 웹 규모 vision-language 데이터와 로봇 시연 데이터를 같은 배치에 섞어 함께 파인튜닝하는 RT-2의 학습 전략. 자막은 "코파인튜닝"으로 표기
- **Chain-of-thought 기반 제어**: action token을 내기 전에 추론 과정을 텍스트로 먼저 생성하게 하는 RT-2의 확장 방식
