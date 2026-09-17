---
title: "FastCrest | Cupel and Tether Studio"
type: article
year: 2026
category: physical-ai
source: fastcrest-2026-cupel-and-tether-studio.md
raw_path: raw/articles/fastcrest-2026-cupel-and-tether-studio.md
raw_filename: "fastcrest-2026-cupel-and-tether-studio.md"
source_collection: external
author: "FastCrest"
url: "https://fastcrest.com/"
publisher: "fastcrest.com"
tags: [physical-ai, vla, robot-dataset, teleoperation]
figures:
  - id: fig02
    file: assets/fastcrest-2026-cupel-and-tether-studio/page-full.png
    raw: raw/articles/fastcrest-2026-cupel-and-tether-studio-figures/page-full.png
    caption: "랜딩 페이지 전체 화면. Cupel과 Tether Studio를 좌우 두 단으로 나란히 놓은 제품 구성이 보인다"
    strategy: screenshot
    curated: true
---

## 요약

FastCrest는 로봇 소프트웨어 회사로, 로봇 데이터 준비 도구 Cupel과 policy 개발용 시각 워크스페이스 Tether Studio 두 제품을 만든다. 이 페이지는 그 두 제품을 소개하는 공식 랜딩 페이지다.

페이지의 표제 문구는 "Better data. More capable robots."이고, 두 제품의 관계는 한 문장으로 정리된다. 로봇이 배울 데이터를 먼저 준비하고, 그 다음 policy를 개발하고 실행하고 개선한다. Cupel이 앞 구간, Tether Studio가 뒤 구간을 맡는다.

이 페이지는 기술 해설 문서가 아니다. 구현 방식이나 성능 수치는 없고 두 제품이 각각 어떤 작업 구간을 담당하는지만 밝힌다. 같은 회사의 오픈소스 CLI인 [[physical-ai/fastcrest-tether]]가 기술 세부와 측정값을 담고 있어, 두 문서를 함께 읽어야 회사의 제품 구조가 보인다.

![[assets/fastcrest-2026-cupel-and-tether-studio/page-full.png]]
*Figure 1: 랜딩 페이지 전체 화면. Cupel과 Tether Studio를 좌우 두 단으로 나란히 놓았다 (FastCrest 2026)*

## 배경

VLA를 실제 로봇에 올리는 작업은 모델 학습 하나로 끝나지 않는다. 학습에 쓸 데이터를 모아 정비하는 단계가 앞에 있고, 학습이 끝난 policy를 실제 하드웨어에서 검증하고 배포하는 단계가 뒤에 있다. VLA는 이미지와 언어 지시문을 받아 로봇의 action을 내놓는 모델을 말한다.

FastCrest는 이 앞뒤 두 구간을 각각 별도 제품으로 나눴다. 학습 프레임워크 자체는 만들지 않는다. 데이터를 준비하는 쪽과 학습이 끝난 policy를 다루는 쪽만 담당한다는 것이 이 회사의 범위 설정이다.

회사는 Romir Jain과 Arnav Gupta가 공동 창업했고 두 사람 모두 co-founder로 표기된다. 페이지는 "we are building"이라는 현재진행 표현을 쓰며, 시작 방법으로 제품 가입이 아니라 이메일 문의를 안내한다.

## 핵심 개념

**시연 데이터(demonstration)** 는 사람이나 다른 로봇이 과제를 수행한 기록으로, 로봇이 그 행위를 흉내 내어 배우는 학습 자료가 된다. Cupel이 다루는 입력이 모두 이 범주에 속한다.

**policy** 는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. Tether Studio가 개발 대상으로 삼는 것이 이 policy다.

**Tether** 는 같은 회사가 공개한 오픈소스 CLI로, 학습이 끝난 VLA policy를 ONNX로 변환하고 서빙하며 배포 가부를 판정한다. Tether Studio는 별개 제품이 아니라 이 CLI의 시각 표면이다.

## 제품 구성

### Cupel

Cupel의 표제 문구는 "시연 데이터를 로봇이 배울 수 있는 데이터로 바꾼다"이다. 강조점은 수집이 아니라 변환에 있다. 이미 있는 기록을 학습에 쓸 수 있는 형태로 만드는 것이 이 제품의 일이다.

입력으로 받는 자료는 네 종류다.

| 입력 | 설명 |
|---|---|
| robot recordings | 로봇이 직접 수행한 기록 |
| human video | 사람이 과제를 수행하는 영상 |
| spatial data | 공간 정보를 담은 데이터 |
| 손에 든 장치 시연 데이터(handheld demonstration) | 사람이 손에 든 장치로 직접 수행한 기록 |

네 종류를 한 제품이 함께 받는다는 점이 설계 의도를 드러낸다. 로봇 본체로 수집한 데이터만 쓰는 것이 아니라, 사람 영상과 손에 든 장치로 모은 기록까지 같은 파이프라인에 넣겠다는 뜻이다. teleoperation 장비가 없어도 데이터를 모을 수 있는 경로를 열어두는 접근이다.

목표는 세 단계로 서술된다. 대상 로봇과 과제와 학습 설정에 맞는 데이터셋을 준비하고, 그 데이터셋이 실제로 학습에 도움이 되는지 측정하고, 다음에 어떤 데이터를 모아야 하는지 식별한다.

기능 목록도 이 세 단계와 대응한다.

| 기능 | 내용 |
|---|---|
| 원본 데이터 정비 | 데이터를 이해하고, alignment하고, 손상된 부분을 복구하고, 정보를 보강한다 |
| 대상 맞춤 데이터셋 컴파일 | 시연 데이터를 변환해 대상 로봇과 과제에 맞는 데이터셋으로 묶는다 |
| 학습 유용성 평가 | 학습에 얼마나 기여했는지 평가하고 다음 수집 계획을 세운다 |

세 번째 항목이 이 제품의 관점을 가장 잘 보여준다. 데이터 수집을 한 번 끝내는 작업이 아니라, 평가 결과가 다음 수집 계획으로 이어지는 순환으로 다룬다. 어떤 데이터가 부족한지를 학습 결과로 역추적한다는 뜻이다.

### Tether Studio

Tether Studio는 "Tether를 위한 시각 워크스페이스"로 정의된다. CLI로 흩어져 있던 작업을 하나의 인터페이스로 모으는 것이 이 제품의 역할이다. 페이지가 열거하는 워크플로는 모델 준비, 서빙, 최적화, 검사, 개선, 릴리스 여섯 가지다.

사용 방식은 한 문장으로 요약된다. policy 하나를 실험을 거쳐 따라가되, 그 설정과 증거를 함께 보이게 둔다. 즉 어떤 설정으로 실행했고 그 결과 어떤 증거가 남았는지를 policy와 분리하지 않고 같은 화면에 둔다.

기능 목록은 세 항목이다.

| 기능 | 내용 |
|---|---|
| 준비와 설정 | 모델을 준비하고 policy 실행 방식을 설정한다 |
| 검사와 비교 | 실행을 검사하고 최적화하며 변경 전후를 비교한다 |
| 릴리스 연결 | 검사와 결과를 릴리스 결정으로 이어간다 |

세 번째 항목은 CLI 쪽 Tether가 내놓는 승격 판정과 직접 대응한다. Tether는 수집한 증거를 바탕으로 PROMOTE, HOLD, ROLLBACK 중 하나를 반환하는데, Tether Studio는 그 판정에 들어간 증거와 판정 자체를 같은 화면에서 보게 만든다.

### 두 제품의 관계

페이지는 두 제품이 순서를 이루면서도 서로를 요구하지 않는다고 못박는다. 데이터 준비만 필요하면 Cupel만, policy 개발만 필요하면 Tether Studio만 쓰면 된다. 페이지의 표현으로는 "각각 단독으로 쓸모 있다"이다.

| 항목 | Cupel | Tether Studio |
|---|---|---|
| 담당 구간 | 학습 이전의 데이터 준비 | 학습 이후의 policy 개발과 배포 |
| 입력 | 로봇 기록, 사람 영상, 공간 데이터, 손에 든 장치로 모은 시연 데이터 | 학습이 끝난 모델 |
| 산출물 | 대상 로봇과 과제에 맞는 데이터셋 | 실행 증거와 릴리스 결정 |
| 기반 | 독립 제품 | Tether CLI의 시각 표면 |

## 사용 조건

페이지 하단 FAQ가 진입 조건을 세 가지로 정리한다.

| 질문 | 답 |
|---|---|
| 두 제품이 모두 필요한가 | 아니다. 두 제품은 별개이고 어느 한쪽도 다른 쪽을 요구하지 않는다 |
| 실제 로봇이 필요한가 | 아니다. Cupel은 기존 데이터로, Tether Studio는 지원되는 로컬 시뮬레이터 워크플로로 시작할 수 있다 |
| 어떻게 시작하는가 | team@fastcrest.com으로 보유한 데이터나 policy, 대상 로봇이나 과제, 풀려는 문제를 적어 보낸다 |

두 번째 답에는 단서가 붙는다. 시작은 시뮬레이터로 할 수 있지만 실제 배포를 확인하려면 결국 대상 하드웨어에서 나온 증거가 필요하다. 이 단서는 CLI 쪽 Tether의 설계와 일치한다. Tether도 배포 판정의 근거를 실제 대상 장비에서 측정한 값으로 요구한다.

## 한계

이 페이지에서 확인할 수 없는 것이 여럿이다.

- **검증 가능한 주장이 없다.** 기능 목록은 있지만 그것이 어떻게 구현되는지, 얼마나 잘 동작하는지에 대한 근거가 페이지에 없다. 벤치마크, 성공률, latency, 데이터 규모 중 어느 것도 제시되지 않는다.
- **두 제품의 공개 상태가 불분명하다.** "we are building"이라는 현재진행 표현을 쓰고 시작 방법이 이메일 문의뿐이라, 일반 공개 상태인지 사용 신청을 받는 단계인지 판단하기 어렵다.
- **가격과 라이선스 정보가 없다.** CLI인 Tether는 BSL 1.1로 공개되어 있지만 Cupel과 Tether Studio의 제공 조건은 나와 있지 않다.
- **Cupel의 입력 형식이 특정되지 않았다.** "robot recordings", "spatial data" 같은 범주만 있고 지원 데이터 형식이 명시되지 않는다. Tether CLI가 LeRobot v3.0 코퍼스를 검증 대상으로 삼는 점으로 미루어 같은 계열을 다룰 가능성이 있으나 이 페이지만으로는 확인되지 않는다.
- **본문이 얕다.** 전체 본문이 약 3,100자이고 그중 상당 부분이 내비게이션과 호출 문구다. /cupel과 /tether-studio 하위 페이지에 더 깊은 내용이 있을 것으로 보이며 이번 수집 범위에 들어 있지 않다.

수치가 필요하면 [[physical-ai/fastcrest-tether]]를 본다. 그 저장소의 README에는 네 VLA 계열의 ONNX parity 수치, TensorRT execution provider의 latency 비교, LIBERO 성공률, 하드웨어별 메모리 적합성이 표로 정리되어 있다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Cupel | FastCrest의 로봇 데이터 준비 제품. 여러 출처의 시연 데이터를 대상 로봇과 과제에 맞는 데이터셋으로 만든다 |
| Tether Studio | Tether CLI의 시각 워크스페이스. 모델 준비부터 릴리스 결정까지를 한 인터페이스에 모은다 |
| Tether | FastCrest의 오픈소스 VLA 배포 CLI. 이 페이지에서는 Tether Studio의 기반으로만 언급된다 |
| 손에 든 장치 시연 데이터(handheld demonstration) | 사람이 손에 든 장치로 직접 수행한 기록. 로봇 본체 없이 수집할 수 있는 입력 형태다 |

## 관련 페이지

- [[physical-ai/fastcrest-tether]]: 같은 회사가 공개한 VLA 배포 CLI. 이 페이지가 제품 수준에서 소개한 Tether Studio의 기반이고, 수치와 구현 세부는 그 저장소에 있다.
- [[physical-ai/skild-2026-introducing-s1-in-context-learning]]: 로봇 foundation model을 제품으로 소개하는 다른 회사 발표문. 제품 포지셔닝 문서가 무엇을 밝히고 무엇을 생략하는지 비교할 수 있다.
