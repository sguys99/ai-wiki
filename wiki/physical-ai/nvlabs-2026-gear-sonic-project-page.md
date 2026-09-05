---
title: "GEAR-SONIC 프로젝트 페이지 (SONIC 공식 데모)"
type: article
year: 2026
category: physical-ai
source: nvlabs-2026-gear-sonic-project-page.md
raw_path: raw/articles/nvlabs-2026-gear-sonic-project-page.md
raw_filename: "nvlabs-2026-gear-sonic-project-page.md"
source_collection: external
author: "NVIDIA GEAR Lab"
url: "https://nvlabs.github.io/GEAR-SONIC/"
publisher: "nvlabs.github.io"
fetched_at: "2026-08-03T23:12:02+0900"
extractor_tier: "chrome"
tags: [physical-ai, humanoid, teleoperation]
---

## 요약

GEAR-SONIC 프로젝트 페이지는 NVIDIA GEAR Lab이 SONIC 논문에 붙인 공식 소개 페이지다. 텍스트로 남는 것은 논문 초록 한 편뿐이고 페이지 면적의 대부분은 영상 데모가 차지한다. 따라서 이 자료의 값은 서술이 아니라 데모 구성과 저자가 화면에 직접 적어 둔 짧은 선언에 있다.

논문이 수치로 보고하는 자연스러운 whole-body control이 실제로 어떤 움직임인지, 그리고 하나의 policy가 teleoperation과 자율 실행을 모두 받는다는 주장이 화면에서 어떻게 확인되는지를 보는 통로다. 정량 근거는 [[physical-ai/luo-2025-sonic-supersizing-motion-tracking]]이 담당하고, 실행 코드는 [[physical-ai/nvlabs-gr00t-wholebodycontrol]]이 담당한다.

## 배경

프로젝트 페이지는 논문과 코드 저장소 사이에 놓이는 자료 유형이다. 논문이 방법과 수치를 담고 저장소가 실행 가능한 스택을 담는 반면, 프로젝트 페이지는 동작 품질의 육안 증거를 담는다.

SONIC이 다루는 대상은 humanoid다. humanoid는 사람과 비슷한 팔다리 구조를 갖춰 걷기와 물체 조작을 함께 수행하는 로봇을 말한다. 이런 로봇에서는 과제를 성공했는지뿐 아니라 움직임이 얼마나 자연스러운지가 함께 문제가 되는데, 자연스러움은 지표 하나로 전달되기 어렵다. 저자가 영상 갤러리를 페이지의 본체로 삼은 이유가 여기에 있다.

저자 표기도 규모를 짐작하게 한다. 28명이 이름을 올렸고 공동 제1저자, core contributor, equal advising 세 등급으로 구분되어 있다. 소속은 NVIDIA 단일 기관이다.

## 핵심 개념

페이지에 등장하는 용어를 먼저 풀이한다. 개념을 잡아 두면 뒤의 데모 구성이 무엇을 보이려는 것인지 읽힌다.

policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. 이 페이지의 핵심 주장은 아래에 나오는 모든 영상이 서로 다른 여러 policy가 아니라 하나의 policy에서 나왔다는 것이다.

motion tracking은 mocap 목표 포즈를 프레임 단위로 따라가게 학습하는 과제다. SONIC은 이 과제를 humanoid 제어의 확장 가능한 학습 과제로 놓는다.

whole-body control은 균형과 이동을 포함해 몸 전체를 함께 제어하는 문제다. 팔만 움직이는 manipulation과 달리 다리로 균형을 유지하면서 동시에 손을 쓰는 상황을 다룬다.

teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다. 페이지는 teleoperation을 영상 기반과 VR 기반 두 가지로 나눠 보인다.

kinematic planner는 이동 명령을 받아 policy가 따라갈 목표 포즈를 실시간으로 만들어 주는 모듈이다. SONIC에서는 motion tracking과 내비게이션 같은 상위 과제를 잇는 역할을 맡는다.

loco-manipulation은 이동과 물체 조작을 한 과제 안에서 함께 수행하는 문제다. 손과 발의 배치를 함께 맞춰야 하므로 팔만 쓰는 조작보다 어렵다.

## 페이지 구성

### 링크 구조

페이지 상단에는 항상 보이는 내비게이션 바가 있고 제목 바로 아래에 버튼 줄이 한 번 더 있다. 내비게이션 바는 Paper, arXiv, Docs, Code, Demo 다섯 개이고 버튼 줄은 여기에 두 개가 더 붙는다.

| 버튼 | 대상 |
|---|---|
| PDF | 논문 본문 파일 |
| ArXiv | arXiv 초록 페이지 (2511.07820) |
| Summary | 요약 페이지 |
| Docs | 문서 사이트 |
| Code | GR00T-WholeBodyControl 저장소 |
| Interactive Demo | 브라우저에서 실행하는 대화형 데모 |

버튼 줄 바로 밑에 강조 문구가 하나 놓여 있다. 영상에 나오는 모든 모델을 공개하겠다는 선언이다. 즉 이 페이지는 결과 홍보만이 아니라 공개 범위를 미리 밝히는 자리를 겸한다.

### 데모 섹션

본문은 네 개의 데모 묶음으로 이어진다. 각 묶음에는 한두 문장짜리 설명 인용구가 붙고 그 아래 영상이 격자로 놓인다. 사람이 만들어준 모범 실행 데이터를 뜻하는 시연 데이터(demonstration)라는 표현도 이 인용구에 등장한다.

| 섹션 | 저자가 붙인 설명 | 영상 라벨 |
|---|---|---|
| Trailers | 없음 | One Day at NVIDIA, Skill Montage |
| Connection to VLA Foundation Model | GR00T N1.5를 같은 universal control interface로 연결해 상위 추론과 빠른 whole-body control을 결합했고 모든 policy가 완전 자율이다 | Drill, Dropping Soda into Trash Can, Carrot, Sponge, Trash Can, Apple |
| Video Teleoperation | 영상을 입력으로 받고 GEM으로 포즈를 추정해 사람의 시연 데이터를 실시간으로 재현한다 | Kung Fu, Crawling |
| VR Teleoperation with Keypoints | 머리와 양손 세 개의 VR 추적점만으로 상체 동작을 만들고 하체 동작은 kinematic planner가 생성한다 | Lawn Mowing, Object Manipulation |

VR 항목의 설계가 특히 구체적이다. 추적점이 세 개뿐이면 다리 동작 정보가 아예 없는데, SONIC은 부족한 하체를 kinematic planner로 채우는 혼합 제어 방식을 택했다. 조작 과제를 직관적으로 시킬 수 있게 하려는 목적이라고 적혀 있다.

영상 라벨을 보면 데모가 두 방향으로 갈린다. Kung Fu와 Crawling은 동작 자체의 난이도를 보이는 쪽이고, Drill이나 Lawn Mowing, Dropping Soda into Trash Can은 물체를 다루는 과제 쪽이다.

### 저자가 강조한 문구

페이지에는 배경색을 넣어 따로 떼어 놓은 강조 문구가 세 곳 있다. 세 문구가 이 페이지의 메시지를 그대로 요약한다.

- 영상에 나오는 모든 모델을 공개할 예정이다.
- 모든 결과가 하나의 통합된 control policy에서 나왔다.
- VLA를 연결한 데모의 policy는 모두 완전 자율로 동작한다.

첫 번째는 공개 범위, 두 번째는 단일 policy 주장, 세 번째는 자율성 주장이다. 반면 성공률이나 오차 지표 같은 정량 근거는 페이지 어디에도 없다.

## 초록 요지

페이지가 담은 유일한 산문은 논문 초록 전문이다. 초록은 humanoid 제어에서 아직 확인되지 않은 규모 확대의 이득을 보이겠다는 문제 설정으로 시작한다. 사람이 reward를 손으로 설계하지 않아도 다양한 mocap 데이터가 촘촘한 지도 신호를 주기 때문에 motion tracking을 확장 가능한 과제로 삼을 수 있다는 것이 근거다.

규모 확대는 세 가지 항목에서 이뤄졌다.

| 항목 | 범위 |
|---|---|
| 네트워크 크기 | 120만에서 4,200만 파라미터 |
| 데이터 규모 | mocap 700시간에서 나온 1억 프레임 이상 |
| 연산량 | 2만 1,000 GPU hours |

초록이 밝힌 downstream 활용은 두 가지다.

- 실시간 kinematic planner가 motion tracking을 내비게이션 같은 과제로 연결해 자연스럽고 대화형인 제어를 가능하게 한다.
- 통합 토큰 공간(unified token space)이 VR teleoperation과 VLA 모델을 하나의 policy로 함께 받는다. 이 인터페이스 위에서 손과 발의 배치를 함께 맞춰야 하는 자율 loco-manipulation을 시연했다.

규모 확대의 성질에 대해서는 두 가지를 주장한다. 연산량과 데이터 다양성을 키울수록 성능이 꾸준히 개선되고, 학습한 policy가 학습에 없던 모션으로 일반화된다는 것이다. 즉 motion tracking을 크게 키우는 방식이 humanoid 제어의 실용적 기반이 된다는 결론이다. 다만 이 주장을 뒷받침하는 곡선과 표는 페이지가 아니라 논문에 있다.

## 한계

이 자료의 한계는 대부분 수집 단계에서 드러났다. 원본 페이지의 성격 자체가 텍스트로 옮기기 어려운 구조여서다.

- 추출 tier가 `jina`에서 403으로 막혀 `chrome`으로 렌더했다. 그렇게 해도 남은 텍스트는 1,596자에 그친다.
- `<img>` 태그 기반 이미지가 0개로 잡혔다. 페이지 요소가 대부분 영상이라 그렇다. 따라서 figure 후보는 전체 페이지 스크린샷 한 장뿐이다.
- 스크린샷은 원본 12,837px 중 상단 6,000px에서 잘렸다. 확인 가능한 구간은 VR Teleoperation 절까지이고 그 뒤 절반 이상은 이 저장소 안에서 확인되지 않는다.
- 정량 결과가 없다. 성능 곡선, 비교표, 성공률이 페이지에 실려 있지 않다.
- 발행일 표기가 없어 `year`는 수집 시점인 2026-08-03을 기준으로 2026을 넣었다. 대응 논문은 arXiv 2511.07820으로 BibTeX 상 2025년이므로 두 자료의 `year`가 갈린다.

특정 데모 장면을 wiki에 넣으려면 영상 프레임을 수동 캡처해 `raw/articles/nvlabs-2026-gear-sonic-project-page-figures/`에 추가하고 `strategy: manual`로 표기하는 편이 낫다. 전체 페이지 스크린샷은 도식이 아니라 레이아웃 기록이라 본문에 임베드하지 않았고, 재선택할 수 있도록 sources frontmatter에 `curated: false`로 남겨 두었다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| GEAR | Generalist Embodied Agent Research. SONIC과 GR00T 계열을 내는 NVIDIA 연구 조직 |
| project page | 논문에 딸린 영상과 데모 중심 웹페이지. 정량 결과보다 동작 품질을 보이는 용도 |
| motion tracking | mocap 목표 포즈를 프레임 단위로 따라가게 학습하는 과제. SONIC이 규모 확대의 대상으로 삼은 학습 과제다 |
| kinematic planner | 이동 명령을 받아 policy가 따라갈 목표 포즈를 실시간으로 만들어 주는 모듈. VR 데모에서 하체 동작 생성을 맡는다 |
| 통합 토큰 공간 | VR teleoperation 입력과 VLA 출력을 같은 형식으로 적어 하나의 policy가 둘 다 받게 하는 인터페이스 |
| loco-manipulation | 이동과 물체 조작을 한 과제 안에서 함께 수행하는 문제. 손과 발의 배치를 함께 맞춰야 한다 |

## 관련 페이지

- [[physical-ai/luo-2025-sonic-supersizing-motion-tracking]]: 이 페이지가 소개하는 논문. 방법, 규모 확대 곡선, sim2real, VLA 성공률 등 정량 근거가 전부 그곳에 있다.
- [[physical-ai/nvlabs-gr00t-wholebodycontrol]]: 페이지의 Code 버튼이 가리키는 저장소. 학습과 배포 코드, 체크포인트를 담는다.
- [[physical-ai/nvidia-2025-gr00t-n1-5-an-improved-open]]: VLA 연결 데모가 상위 추론에 쓴 GR00T N1.5 모델.
- [[physical-ai/robocasa-2026-robocasa365-project-page]]: 같은 성격의 프로젝트 페이지 자료. 영상 중심이라 텍스트 추출이 얇다는 한계도 같다.
- [[overviews/physical-ai-overview]]: physical-ai 분류 기준과 학습 경로 허브.
