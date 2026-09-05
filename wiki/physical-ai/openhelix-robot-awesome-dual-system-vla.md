---
title: "Awesome-Dual-System-VLA"
type: repo
year: 2025
category: physical-ai
source: openhelix-robot-awesome-dual-system-vla.md
raw_path: raw/repos/openhelix-robot-awesome-dual-system-vla.md
raw_filename: "openhelix-robot-awesome-dual-system-vla.md"
source_collection: external
org: "OpenHelix-robot"
repo: "awesome-dual-system-vla"
url: "https://github.com/OpenHelix-robot/awesome-dual-system-vla"
license: "unspecified"
tags: [physical-ai, vla, manipulation, humanoid, benchmark]
---

## 요약

Awesome-Dual-System-VLA는 OpenHelix 저자들이 자기 논문의 서베이 절을 계속 갱신되는 목록으로 옮긴 GitHub 큐레이션 저장소다. dual-system VLA는 느린 대형 모델과 빠른 경량 policy를 서로 다른 주기로 함께 구동하는 VLA 구조를 말한다. 저장소는 README 하나로 이뤄져 있으며 벤치마크 결과표 2개와 논문 목록 4개 절을 담는다.

다른 awesome 리스트와 구별되는 지점은 배제 목록이다. `✅ Dual-System VLA`와 `❌ Not a Dual-System VLA` 두 절을 나란히 두고 각 논문이 어느 쪽인지 판정해 놓는다. π0, π0.5, GR00T N1처럼 널리 알려진 모델이 배제 쪽에 들어가는데, 이름값으로 보면 어색하지만 저자들이 논문에서 세운 정의를 일관되게 적용한 결과다.

- 저장소: [OpenHelix-robot/awesome-dual-system-vla](https://github.com/OpenHelix-robot/awesome-dual-system-vla)
- 생성: 2025-04-16, star 약 122개 (수집 시점)
- 라이선스: 명시 없음
- 근거 논문: [[physical-ai/cui-2025-openhelix-a-short-survey-empirical]] (arXiv 2505.03912)

## 배경

README 첫 문단은 dual-system VLA가 등장한 이유를 VLA의 세 가지 난점으로 설명한다. VLA는 vision-language-action model의 약어로, 이미지와 자연어 지시문(instruction)을 받아 로봇 제어 명령을 직접 내는 모델을 가리킨다.

| 난점 | 내용 |
|---|---|
| 실시간 성능 | 효율적인 실시간 동작을 달성하기 어렵다 |
| pre-training 비용 | pre-training에 드는 비용이 높다 |
| fine-tuning 복잡도 | embodied 데이터로 end-to-end fine-tuning할 때 domain shift와 catastrophic forgetting이 따라온다 |

catastrophic forgetting은 새 학습이 기존 능력을 지워버리는 현상이다. 세 난점을 동시에 피하려는 시도가 dual-system 구조이며, 그 구조와 설계 세부를 다룬 문서로 README는 arXiv 2505.03912를 지목한다. 즉 이 저장소는 논문의 부속 목록으로 출발했다.

저장소는 계속 갱신하겠다고 명시하고 커뮤니티의 pull request와 issue를 통한 제보를 요청한다. 목록이 논문에 고정된 서베이 표가 아니라 계속 자라는 문서라는 뜻이다.

## 핵심 개념

dual-system VLA는 역할이 다른 두 모델을 한 시스템에 두고 서로 다른 주기로 구동하는 구조다. System 2 자리에는 연산이 무겁지만 일반화가 뛰어난 대형 멀티모달 모델이 들어가고, System 1 자리에는 가볍고 빠른 policy가 들어간다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다.

이 저장소가 dual-system 여부를 가르는 기준은 하나다. System 1이 RGB 이미지 같은 실시간 perception 입력을 직접 받아야 한다는 것이다. 기준의 출처는 근거 논문이고 저장소는 판정 결과만 목록 형태로 보여준다.

기준의 논리는 시간 지연에 있다. System 2가 갱신을 쉬는 동안 System 1이 상위에서 내려온 조건 정보만 갖고 있으면, 그 정보가 낡는 순간 시스템 전체가 낡은 상태로 동작한다. 반면 System 1이 자기 카메라로 환경을 계속 보고 있으면 상위가 낡아도 하위가 현재 장면을 근거로 action을 낼 수 있다.

판정 기준의 논거와 그것을 뒷받침하는 통제 실험은 논문 페이지가 다룬다. 저장소가 유지하는 것은 판정의 산출물, 즉 어느 논문이 어느 목록에 들어가 있는지다.

## 저장소 구성

README는 크게 세 부분으로 짜여 있다.

| 절 | 내용 | 규모 |
|---|---|---|
| Current Results | CALVIN ABC→D와 LIBERO 두 벤치마크의 결과표 | 표 2개 |
| `✅ Dual-System VLA` | 판정을 통과한 논문 목록 (manipulation, humanoid) | 12편 |
| `❌ Not a Dual-System VLA` | 배제된 논문 목록 (manipulation, humanoid) | 7편 |

각 목록 행은 제목(Title), 발표처(Venue), 날짜(Date), 코드(Code) 네 열로 구성된다. 제목은 원 논문 arXiv 페이지로 연결되고, 코드 열에는 GitHub 저장소나 프로젝트 페이지 링크가 붙는다. GitHub 링크에는 star 배지가 함께 걸려 있어 어느 구현이 실제로 쓰이는지 가늠하는 단서가 된다.

### dual-system 목록

manipulation 절에는 11편이 실려 있다. manipulation은 팔과 손으로 물체를 다루는 과제 영역을 말한다.

| 제목 | 발표처 | 날짜 | 코드 |
|---|---|---|---|
| Galaxea Open-World Dataset and G0 Dual-System VLA Model | arXiv | 2025-08-30 | GitHub (OpenGalaxea/G0) |
| TriVLA: A Unified Triple-System-Based Unified Vision-Language-Action Model for General Robot Control | arXiv | 2025-07-01 | 프로젝트 페이지 |
| RationalVLA: A Rational Vision-Language-Action Model with Dual System | arXiv | 2025-06-12 | 프로젝트 페이지 |
| Fast-in-Slow: A Dual-System Foundation Model Unifying Fast Manipulation within Slow Reasoning | arXiv | 2025-06-02 | GitHub (CHEN-H01/Fast-in-Slow) |
| Hume: Introducing System-2 Thinking in Visual-Language-Action Model | arXiv | 2025-05-27 | GitHub (hume-vla/hume) |
| OpenHelix: A Short Survey, Empirical Analysis, and Open-Source Dual-System VLA Model for Robotic Manipulation | arXiv | 2025-05-06 | GitHub (OpenHelix-robot/OpenHelix) |
| DexVLA: Vision-Language Model with Plug-In Diffusion Expert for General Robot Control | arXiv | 2025-02-09 | GitHub (juruobenruo/DexVLA) |
| RoboDual: Towards Synergistic, Generalized, and Efficient Dual-System for Robotic Manipulation | arXiv | 2024-10-10 | GitHub (OpenDriveLab/RoboDual) |
| DP-VLA: A Dual Process VLA: Efficient Robotic Manipulation Leveraging VLM | CoRL 2024 | 2024-10-21 | 없음 |
| HiRT: Enhancing Robotic Control with Hierarchical Robot Transformers | CoRL 2024 | 2024-09-12 | 없음 |
| LCB: From LLMs to Actions: Latent Codes as Bridges in Hierarchical Robot Control | IROS 2024 | 2024-05-08 | 프로젝트 페이지 |

목록이 담는 기간은 2024-05-08 LCB부터 2025-08-30 Galaxea G0까지 약 16개월이다. 발표처는 arXiv preprint가 8편으로 대다수이고 CoRL 2024가 2편, IROS 2024가 1편이다. 즉 이 구조를 둘러싼 논의 대부분이 아직 학회 심사를 거치지 않은 preprint 단계에서 이뤄지고 있다.

코드 공개 상태는 세 가지로 나뉜다.

- GitHub 저장소를 star 배지와 함께 공개한 항목 6편: Galaxea G0, Fast-in-Slow, Hume, OpenHelix, DexVLA, RoboDual
- 프로젝트 페이지만 있는 항목 3편: TriVLA, RationalVLA, LCB
- 코드 링크가 없는 항목 2편: DP-VLA, HiRT

humanoid 절에는 Figure AI의 Helix 한 건만 있다. humanoid는 사람 형상을 한 로봇 플랫폼을 가리킨다. Helix는 논문이 아니라 회사 블로그 글이라 발표처와 날짜 열이 모두 비어 있고, 코드 열에도 같은 블로그 링크가 들어간다.

### 배제 목록

`❌ Not a Dual-System VLA` 절은 같은 네 열 형식으로 manipulation 6편과 humanoid 1편을 담는다.

| 제목 | 발표처 | 날짜 | 분류 |
|---|---|---|---|
| OneTwoVLA: A Unified Vision-Language-Action Model with Adaptive Reasoning | arXiv | 2025-05-17 | manipulation |
| NORA: A Small Open-Sourced Generalist Vision Language Action Model for Embodied Tasks | arXiv | 2025-04-28 | manipulation |
| π0.5: a Vision-Language-Action Model with Open-World Generalization | arXiv | 2025-04-22 | manipulation |
| π0: A Vision-Language-Action Flow Model for General Robot Control | arXiv | 2024-10-31 | manipulation |
| PIVOT-R: Primitive-Driven Waypoint-Aware World Model for Robotic Manipulation | NeurIPS 2024 | 2024-10-14 | manipulation |
| MResT: Multi-Resolution Sensing for Real-Time Control with Vision-Language Models | CoRL 2023 | 2024-01-25 | manipulation |
| GR00T N1: An Open Foundation Model for Generalist Humanoid Robots | arXiv | 2025-03-18 | humanoid |

배제 목록에 이름값이 큰 모델이 몰려 있다는 점이 이 저장소의 성격을 보여준다. π0와 π0.5는 Physical Intelligence의 대표 모델이고 GR00T N1은 NVIDIA의 humanoid foundation model이다. 세 모델 모두 System 1에 해당하는 부분이 실시간 perception 입력을 직접 받지 않는다는 이유로 제외된다.

README 자체는 배제 사유를 항목별로 적지 않는다. 따라서 판정 근거를 확인하려면 링크된 논문으로 가야 한다.

## 벤치마크 결과

Current Results 절은 CALVIN ABC→D와 LIBERO 두 벤치마크에서 single-system과 dual-system 항목을 한 표에 놓는다. 두 벤치마크 모두 시뮬레이터 안에서 실행되는 manipulation 평가다.

### CALVIN ABC→D

CALVIN ABC→D는 환경 A, B, C에서 학습하고 학습에 쓰지 않은 환경 D에서 평가하는 설정이다. 로봇은 지시문 5개를 연속으로 받아 차례로 수행하며 앞 과제에 실패하면 뒤 과제로 넘어가지 못한다. 표의 1부터 5까지 열은 해당 단계까지 도달한 비율이고, Avg. Len.은 한 시퀀스에서 연속으로 완료한 과제 수의 평균이라 최댓값이 5다.

| 구분 | Method | 1 | 2 | 3 | 4 | 5 | Avg. Len. |
|---|---|---|---|---|---|---|---|
| Single-System | OpenVLA | 91.3% | 77.8% | 62.0% | 52.1% | 43.5% | 3.27 |
| Single-System | UniVLA | 95.5% | 85.8% | 75.4% | 66.9% | 56.5% | 3.80 |
| Single-System | Seer | 94.4% | 87.2% | 79.9% | 72.2% | 64.3% | 3.98 |
| Dual-System | LCB | 73.6% | 50.2% | 28.5% | 16.0% | 9.9% | 1.78 |
| Dual-System | RationalVLA | 74.3% | 58.3% | 42.3% | 30.0% | 20.7% | 2.26 |
| Dual-System | Robodual | 94.4% | 82.7% | 72.1% | 62.4% | 54.4% | 3.66 |
| Dual-System | OpenHelix | 97.1% | 91.4% | 82.8% | 72.6% | 64.1% | **4.08** |

구조가 성능을 보장하지는 않는다는 점이 이 표의 첫 번째 관찰이다. dual-system 항목 중 LCB(1.78)와 RationalVLA(2.26)는 single-system 세 항목 모두에 크게 뒤진다. 특히 LCB는 첫 과제 성공률이 73.6%로 이미 가장 낮고 다섯 번째 과제에서는 9.9%까지 하락한다. 반면 OpenHelix는 첫 과제 97.1%로 시작해 Avg. Len. 4.08로 표에서 가장 높다.

상위권의 간격이 좁다는 점이 두 번째 관찰이다. OpenHelix(4.08)와 Seer(3.98)의 차이는 0.10에 그치고, 다섯 번째 과제만 보면 Seer가 64.3%로 OpenHelix의 64.1%보다 오히려 0.2%p 높다. 즉 OpenHelix의 우위는 앞 단계에서 벌어진 차이가 누적된 결과에 가깝다.

저장소의 OpenHelix 수치는 논문과 어긋난다. 근거 논문이 CALVIN ABC-D 1,000회 전수 평가에서 보고한 평균 완료 길이는 3.45인데 저장소 표는 4.08이다. 저장소가 계속 갱신된다고 밝힌 만큼 논문 공개 이후 개선된 결과로 보이지만 README에는 측정 시점이 적혀 있지 않다. 따라서 논문 기준 수치를 인용할 때는 3.45를, 프로젝트의 현재 성적을 말할 때는 4.08을 쓰고 둘을 구분하는 편이 안전하다.

### LIBERO

LIBERO는 네 과제군으로 일반화 능력을 나눠 재는 벤치마크다. Spatial은 공간 배치 변화, Object는 물체 변화, Goal은 목표 변화, Long은 long-horizon 과제에 대한 일반화를 잰다. long-horizon 과제는 여러 단계를 이어야 끝나는 긴 과제를 말한다.

| 구분 | Method | Spatial | Object | Goal | Long | Avg. |
|---|---|---|---|---|---|---|
| Single-System | OpenVLA | 84.7% | 88.4% | 79.2% | 53.7% | 76.5% |
| Single-System | π0 | 96.8% | 98.8% | 95.8% | 85.2% | 94.2% |
| Single-System | OpenVLA-OFT | 97.6% | 98.4% | 97.9% | 94.5% | 97.1% |
| Single-System | GR00T N1 | 94.4% | 97.6% | 90.6% | 93.9% | 93.9% |
| Single-System | UniVLA | 96.5% | 96.8% | 95.6% | 92.0% | 95.2% |
| Single-System | Seer | 미보고 | 미보고 | 미보고 | 87.7% | 미보고 |
| Dual-System | DexVLA | 97.2% | 99.1% | 95.6% | 미보고 | 미보고 |
| Dual-System | Hume | 98.6% | 99.8% | 99.4% | 98.6% | **98.6%** |

LIBERO 표는 dual-system 항목이 둘뿐이라 CALVIN보다 표본이 얇다. Hume이 평균 98.6%로 가장 높지만 두 번째로 높은 OpenVLA-OFT(97.1%)와의 차이는 1.5%p에 그친다. DexVLA는 Long 열이 비어 있어 평균을 낼 수 없고, 나머지 세 열만 보면 OpenVLA-OFT와 비슷한 수준이다.

두 표 사이에 겹치는 항목은 많지 않다. CALVIN 표의 7개 항목과 LIBERO 표의 8개 항목 중 양쪽에 모두 나오는 것은 OpenVLA, UniVLA, Seer 셋뿐이다. 두 벤치마크를 함께 보고한 모델이 드물다는 뜻이므로 표를 가로질러 순위를 비교하기는 어렵다.

### 결과표와 목록의 어긋남

결과표에 등장하는 모델과 판정 목록에 오른 모델은 서로 완전히 겹치지 않는다.

| 관계 | 해당 모델 |
|---|---|
| 결과표에만 있고 판정 목록에 없음 | OpenVLA, UniVLA, Seer, OpenVLA-OFT |
| dual-system 목록에 있고 결과표에도 있음 | LCB, RationalVLA, Robodual, OpenHelix, DexVLA, Hume |
| dual-system 목록에만 있고 결과표에 없음 | Galaxea G0, TriVLA, Fast-in-Slow, DP-VLA, HiRT, Helix |
| 배제 목록에 있고 결과표에는 single-system 행 | π0, GR00T N1 |

첫 번째 묶음은 판정 대상이 아니라 비교용 기준선으로만 쓰인 모델이다. 반면 dual-system 목록 12편 중 벤치마크 수치가 실린 것은 절반인 6편뿐이고, 나머지 6편은 수치 없이 목록에만 있다. π0와 GR00T N1이 배제 목록에 있으면서 LIBERO 표에서는 single-system 행으로 등장하는 것은 배제 판정과 결과표 분류가 같은 기준을 쓰기 때문이므로 모순이 아니다.

## 한계

라이선스가 명시되어 있지 않다. 목록 자체는 공개 정보를 정리한 것이지만 인용과 재배포 조건이 불분명하므로 내용을 옮겨 쓸 때 주의가 필요하다.

배제 사유를 README 안에서 확인할 수 없다. π0가 왜 빠졌는지 알려면 링크된 논문으로 가야 하고, 목록만 보는 독자는 판정을 근거 없이 받아들이게 된다. 기준 자체도 논쟁적이다. GR00T N1이 대표적인 사례로, 근거 논문은 본문에서 GR00T N1을 dual-system 범위 밖이지만 frozen 학습으로 좋은 결과를 낸 사례로 다루면서도 목록에서는 배제 쪽에 넣는다.

결과표의 측정 시점이 표시되지 않는다. OpenHelix의 4.08처럼 논문과 어긋나는 값이 섞여 있는데 어느 시점의 어느 버전인지 알 수 없다. LIBERO 표에는 평균 열이 네 과제군의 산술 평균과 맞지 않는 행도 있다. GR00T N1은 네 값의 산술 평균이 94.1%인데 Avg. 열은 93.9%이고, Hume은 산술 평균이 99.1%인데 Avg. 열은 98.6%다. README가 각 값의 출처를 밝히지 않으므로 원인은 확인할 수 없다.

humanoid 분류가 사실상 비어 있다. dual-system 쪽 humanoid는 Helix 한 건인데 논문이 없어 발표처와 날짜가 모두 비어 있고, 배제 쪽 humanoid도 GR00T N1 한 건이다. Helix는 두 결과표 어디에도 수치가 없고 GR00T N1은 LIBERO 표의 single-system 행으로만 나오므로, humanoid 항목끼리 비교할 근거가 저장소 안에 없다.

목록의 정렬과 메타데이터에도 작은 오류가 있다. dual-system manipulation 목록은 날짜 내림차순을 따르지만 RoboDual(2024-10-10)이 DP-VLA(2024-10-21)보다 앞에 있어 한 번 어긋난다. MResT는 발표처가 CoRL 2023인데 날짜 열은 2024-01-25로 적혀 있다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| dual-system VLA | System 2 역할의 대형 모델과 System 1 역할의 경량 policy를 서로 다른 주기로 함께 구동하는 VLA 구조. 이 저장소는 System 1이 실시간 perception 입력을 직접 받는지를 판정 기준으로 쓴다 |
| awesome 리스트 | 특정 주제의 자료를 큐레이션해 모은 GitHub 목록형 저장소 관례. 보통 README 하나로 이뤄진다 |
| Avg. Len. | CALVIN의 주 지표. 한 평가 시퀀스에서 연속으로 완료한 과제 수의 평균이며 최댓값은 5다 |
| LIBERO Spatial / Object / Goal / Long | LIBERO의 네 과제군. 각각 공간 배치 변화, 물체 변화, 목표 변화, long-horizon 과제에 대한 일반화를 잰다 |
| Hume | 2025-05 공개된 dual-system VLA. 이 저장소 LIBERO 표에서 평균 98.6%로 가장 높다 |
| Galaxea G0 | 2025-08 공개된 dual-system VLA. 목록에서 가장 최신 항목이다 |

## 관련 페이지

- [[physical-ai/cui-2025-openhelix-a-short-survey-empirical]]: 이 저장소의 근거 논문이자 짝을 이루는 페이지. 논문 쪽은 판정 기준의 논거와 통제된 실험, OpenHelix 모델 자체를 다루고, 이 저장소는 그 기준을 적용한 목록과 갱신 상태를 유지한다.
- [[physical-ai/keon-awesome-physical-ai]]: 같은 큐레이션 저장소지만 범위가 다르다. VLA와 world model을 중심으로 physical AI 논문 계보 전체를 16개 최상위 섹션에 배열한다.
- [[physical-ai/natnew-awesome-physical-ai]]: 역시 큐레이션 저장소이며 논문보다 자료 색인에 가깝다. 시뮬레이터, 데이터셋, 벤치마크, 교재를 종류별로 묶고 초심자 학습 경로를 앞세운다. 이 저장소가 dual-system 하나로 범위를 좁히고 판정까지 내리는 것과 대비된다.
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]: 배제 목록에 오른 모델. System 1이 실시간 perception 입력을 직접 받지 않는다는 것이 사유다.
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]]: 같은 사유로 배제 목록에 있다.
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: humanoid 배제 목록의 유일한 항목이자 LIBERO 결과표의 single-system 행.
- [[physical-ai/figure-ai-2025-helix-a-vision-language-action]]: dual-system humanoid 절의 유일한 항목. 논문이 없어 발표처와 날짜가 비어 있다.
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]]: 두 결과표 모두에 등장하는 single-system 기준선.
- [[overviews/glossary-physical-ai]]: dual-system VLA 표기와 판정 기준의 근거.
