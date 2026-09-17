---
title: "FastCrest | Cupel and Tether Studio"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/fastcrest-2026-cupel-and-tether-studio.md
raw_filename: "fastcrest-2026-cupel-and-tether-studio.md"
source_collection: external
author: "FastCrest"
url: "https://fastcrest.com/"
publisher: "fastcrest.com"
tags: [physical-ai, vla, robot-dataset, teleoperation]
figures:
  - id: fig01
    file: assets/fastcrest-2026-cupel-and-tether-studio/fig01.png
    raw: raw/articles/fastcrest-2026-cupel-and-tether-studio-figures/fig01.png
    caption: "FastCrest 로고. 흰 배경에 흰 선으로 그린 번개 기호다"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/fastcrest-2026-cupel-and-tether-studio/page-full.png
    raw: raw/articles/fastcrest-2026-cupel-and-tether-studio-figures/page-full.png
    caption: "랜딩 페이지 전체 화면. Cupel과 Tether Studio를 좌우 두 단으로 나란히 놓은 제품 구성이 보인다"
    strategy: screenshot
    curated: true
---

## 한 줄 요약 (One-line Summary)

FastCrest의 공식 랜딩 페이지로, 로봇 데이터 준비 도구 Cupel과 policy 개발용 시각 워크스페이스 Tether Studio 두 제품을 서로 독립적으로 쓸 수 있는 도구로 소개한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| URL | https://fastcrest.com/ |
| 페이지 제목 | FastCrest \| Cupel and Tether Studio |
| 성격 | 회사 랜딩 페이지 (제품 소개, 창업자 소개, FAQ, 연락 유도) |
| 자기 규정 | "FastCrest / Robotics software" |
| 표제 문구 | "Better data. More capable robots." |
| 창업자 | Romir Jain, Arnav Gupta (둘 다 co-founder) |
| 소재지 | 샌프란시스코 (Tether README 기준) |
| 연결 자료 | Tether 런타임 문서 docs.fastcrest.com, 저장소 github.com/FastCrest/tether |
| 하위 페이지 | /cupel, /tether-studio (각각 예시 워크플로 앵커 포함) |
| 본문 길이 | 약 3,100자 |
| 수집 | 2026-09-18, 추출 tier chrome |

이 페이지는 기술 해설이 아니라 제품 포지셔닝 문서다. 구현 세부나 수치는 없고, 두 제품이 각각 어떤 작업 구간을 맡는지만 밝힌다. 기술 세부는 같은 회사의 오픈소스 CLI 저장소 [[physical-ai/fastcrest-tether]]가 담고 있다.

## 2. 주요 기여 (Key Contributions)

| 항목 | 내용 |
|---|---|
| 두 제품의 경계 선언 | Cupel은 데이터 준비, Tether Studio는 policy 개발을 맡는다. 페이지는 "각각 단독으로 쓸모 있다"고 명시하고 FAQ에서 상호 의존이 없음을 다시 확인한다 |
| 작업 순서 제시 | "로봇이 배울 데이터를 준비한 다음, policy를 개발하고 실행하고 개선한다"는 한 문장으로 두 제품의 전후 관계를 정리한다 |
| Tether와 Tether Studio의 관계 명시 | Tether Studio는 CLI 도구 Tether의 시각 워크스페이스다. 별개 제품이 아니라 같은 워크플로의 다른 표면이다 |
| 진입 조건 완화 | 실제 로봇 없이도 시작할 수 있다고 밝힌다. 다만 실제 배포 확인에는 대상 하드웨어의 증거가 필요하다고 단서를 단다 |

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### Cupel: 데이터 준비 구간

Cupel의 표제 문구는 "시연 데이터(demonstration)를 로봇이 배울 수 있는 데이터로 바꾼다"이다. 입력으로 받는 자료는 네 종류로 제시된다.

- 로봇 기록(robot recordings)
- 사람 영상(human video)
- 공간 데이터(spatial data)
- 손에 들고 수행한 시연 데이터(handheld demonstrations)

목표는 세 단계로 서술된다. 대상 로봇과 과제와 학습 설정에 맞는 데이터셋을 준비하고, 그 데이터셋이 실제로 도움이 되는지 측정하고, 다음에 어떤 데이터를 모아야 하는지 식별한다.

기능은 세 항목으로 나열된다.

| 기능 | 내용 |
|---|---|
| 원본 데이터 정비 | 이해하고, alignment하고, 복구하고, 보강한다 |
| 대상 맞춤 데이터셋 컴파일 | 시연 데이터를 변환해 대상별 데이터셋으로 묶는다 |
| 학습 유용성 평가 | 학습에 얼마나 기여하는지 평가하고 다음 수집 계획을 세운다 |

마지막 항목이 이 제품의 관점을 드러낸다. 데이터 수집을 한 번의 작업이 아니라 평가와 다음 수집이 이어지는 순환으로 다룬다.

### Tether Studio: policy 개발 구간

Tether Studio는 "Tether를 위한 시각 워크스페이스"로 정의된다. 페이지가 열거하는 것은 Tether의 워크플로를 하나의 인터페이스로 모은다는 점이다. 모델 준비, 서빙, 최적화, 검사, 개선, 릴리스가 그 목록이다.

핵심 사용 방식은 한 문장으로 요약된다. policy 하나를 실험을 거쳐 따라가되, 그 설정과 증거를 함께 보이게 둔다.

기능은 세 항목이다.

| 기능 | 내용 |
|---|---|
| 준비와 설정 | 모델을 준비하고 policy 실행 방식을 설정한다 |
| 검사와 비교 | 실행을 검사하고 최적화하며 변경 전후를 비교한다 |
| 릴리스 연결 | 검사와 결과를 릴리스 결정으로 이어간다 |

세 번째 항목은 CLI 쪽 Tether의 승격 판정(PROMOTE, HOLD, ROLLBACK)과 대응한다. 시각 인터페이스가 증거 수집에서 릴리스 결정까지를 같은 화면에 두겠다는 뜻이다.

### FAQ가 규정하는 사용 조건

| 질문 | 답 |
|---|---|
| 두 제품이 모두 필요한가 | 아니다. Cupel과 Tether Studio는 별개 제품이고 어느 한쪽도 다른 쪽을 요구하지 않는다 |
| 실제 로봇이 필요한가 | 아니다. Cupel은 기존 데이터로, Tether Studio는 지원되는 로컬 시뮬레이터 워크플로로 시작할 수 있다. 다만 실제 배포를 확인하려면 결국 대상 하드웨어에서 나온 증거가 필요하다 |
| 어떻게 시작하는가 | team@fastcrest.com으로 보유한 데이터나 policy, 대상 로봇이나 과제, 풀려는 문제를 적어 보낸다 |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 페이지에는 수치가 없다. 벤치마크, 성공률, latency, 데이터 규모 중 어느 것도 제시되지 않는다. 제품 소개와 연락 유도가 목적인 문서이기 때문이다.

수치가 필요하면 같은 회사의 오픈소스 CLI 저장소를 봐야 한다. Tether 저장소에는 네 VLA 계열의 ONNX parity 수치, TensorRT execution provider의 latency 비교, LIBERO 성공률, 하드웨어별 메모리 적합성이 표로 정리되어 있다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **검증 가능한 주장이 없다.** 기능 목록은 있지만 그것이 어떻게 구현되는지, 얼마나 잘 동작하는지에 대한 근거가 페이지에 없다.
- **두 제품의 공개 상태가 불분명하다.** 페이지는 "we are building"이라는 현재진행 표현을 쓴다. Cupel과 Tether Studio가 일반 공개 상태인지, 사용 신청을 받는 단계인지 명시하지 않는다. 시작 방법이 이메일 문의뿐이라는 점이 후자를 시사한다.
- **가격과 라이선스 정보가 없다.** CLI인 Tether는 BSL 1.1로 공개되어 있지만, Cupel과 Tether Studio의 제공 조건은 페이지에 없다.
- **Cupel의 입력 형식이 특정되지 않았다.** "robot recordings", "spatial data" 같은 범주만 있고 지원 데이터 형식(LeRobot 데이터셋 등)이 명시되지 않는다.
- **랜딩 페이지 특성상 내용이 얕다.** 본문이 약 3,100자이고 그중 상당 부분이 내비게이션과 호출 문구다. 더 깊은 내용은 /cupel과 /tether-studio 하위 페이지에 있을 것으로 보이며 이번 수집 범위에 들어 있지 않다.

## 6. 관련 연구 (Related Work)

이 페이지는 학술 자료가 아니라 제품 소개이므로 인용 문헌이 없다. wiki 내부에서는 다음 페이지와 이어진다.

- [[physical-ai/fastcrest-tether]]: 같은 회사가 공개한 VLA 배포 CLI. Tether Studio가 그 시각 표면이다.
- [[physical-ai/skild-2026-introducing-s1-in-context-learning]]: 로봇 foundation model을 제품으로 소개하는 다른 회사 발표문. 제품 포지셔닝 문서의 서술 방식을 비교할 수 있다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Cupel | FastCrest의 로봇 데이터 준비 제품. 여러 출처의 시연 데이터를 대상 로봇과 과제에 맞는 데이터셋으로 만든다 |
| Tether Studio | Tether CLI의 시각 워크스페이스. 모델 준비부터 릴리스 결정까지를 한 인터페이스에 모은다 |
| Tether | FastCrest의 오픈소스 VLA 배포 CLI. 이 페이지에서는 Tether Studio의 기반으로만 언급된다 |
| 손에 든 장치 시연 데이터(handheld demonstration) | 사람이 손에 든 장치로 직접 수행한 기록. 로봇 본체 없이 수집할 수 있는 입력 형태다 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | FastCrest 로고 (흰 배경에 흰 선 번개 기호) | fetched | 제외 권장. 흰 배경에 흰 선이라 화면에서 거의 보이지 않는다 |
| fig02 | 랜딩 페이지 전체 화면. Cupel과 Tether Studio 두 단 구성 | screenshot | wiki 권장 (제품 구성을 한 장으로 보여준다) |
