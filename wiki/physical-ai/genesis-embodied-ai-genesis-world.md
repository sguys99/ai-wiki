---
title: "Genesis World: Simulation platform for general-purpose robotics & embodied AI learning"
type: repo
year: 2026
category: physical-ai
source: genesis-embodied-ai-genesis-world.md
raw_path: raw/repos/genesis-embodied-ai-genesis-world.md
raw_filename: "genesis-embodied-ai-genesis-world.md"
source_collection: external
org: "Genesis-Embodied-AI"
repo: "genesis-world"
url: "https://github.com/Genesis-Embodied-AI/genesis-world"
license: "Apache-2.0"
tags: [physical-ai, simulator, robot-learning, manipulation]
figures:
  - id: fig01
    file: assets/genesis-embodied-ai-genesis-world/hero-shot.png
    raw: https://raw.githubusercontent.com/Genesis-Embodied-AI/genesis-world/readme-assets/videos/HeroShot_Final.png
    caption: "README 최상단 히어로 이미지. 양팔 로봇과 링 쌓기 장난감이 놓인 탁상 장면을 사실적으로 렌더한 것이다"
    strategy: manual
    curated: true
  - id: fig02
    file: assets/genesis-embodied-ai-genesis-world/stack-diagram.png
    raw: https://raw.githubusercontent.com/Genesis-Embodied-AI/genesis-world/readme-assets/videos/diagram_white_lum.png
    caption: "Genesis World 계층 구조도. 점선 상자 위쪽에 Simulation interface가 걸치고 그 아래 Render와 Physics와 Compiler가 나란히 놓인다"
    strategy: manual
    curated: true
---

## 요약

Genesis World는 physical AI 개발을 겨냥한 오픈소스 시뮬레이션 플랫폼이다. 여러 물리 솔버가 하나의 장면과 하나의 상태를 공유하는 multi-physics 엔진, 로보틱스를 겨냥해 자체 개발한 렌더러 Nyx, Python으로 쓴 커널 코드를 여섯 종의 하드웨어 백엔드로 낮추는 컴파일러 Quadrants가 하나의 Python API 아래 묶여 있다. 세 구성 요소를 사용자가 따로 조립하지 않고 같은 인터페이스에서 부른다는 점이 이 저장소의 설계 기준이다.

프로젝트는 2024년 12월 학술 프로젝트 Genesis로 출발했고 지금은 Genesis AI가 개발을 공식 지원한다. 저장소와 패키지 이름도 `Genesis`에서 `genesis-world`로 바뀌었다. 라이선스는 Apache 2.0이며 수집 시점 기준 star 29,909개, fork 2,854개로 로봇 시뮬레이션 저장소 중 규모가 큰 편에 속한다.

README가 답하는 범위는 세 가지다. 플랫폼의 계층 구조, 계층마다 실행되는 예제 카탈로그, 설치 절차다. 반면 속도와 정확도, 다른 시뮬레이터와의 비교 수치는 하나도 없고 기술 세부는 Genesis AI 블로그 글로 넘긴다. 따라서 이 페이지도 무엇이 들어 있고 어떻게 나뉘어 있는지를 다루며, 얼마나 빠르고 정확한지는 다루지 않는다.

![[assets/genesis-embodied-ai-genesis-world/hero-shot.png]]
*Figure 1: README 최상단 히어로 이미지. 양팔 로봇 한 대가 링 쌓기 장난감이 놓인 탁상 앞에 있는 장면을 사실적으로 렌더한 것이다 (Genesis-Embodied-AI 2026).*

## 배경

Genesis World의 현재 형태는 이름 변경과 소속 변경을 거쳐 만들어졌다. 시작은 2024년 12월의 학술 프로젝트 Genesis였고, 그때의 인용 항목은 "Genesis: A Generative and Universal Physics Engine for Robotics and Beyond"라는 제목으로 남아 있다. 이후 개발 주체가 Genesis AI로 옮겨 갔고, 2026년 5월 블로그 글 "The Role of Simulation in Scalable Robotics, Genesis World 1.0, and the Path Forward"가 1.0 시점의 기술 설명을 담당한다.

README가 밝히는 설계 목표는 두 가지다. 첫째는 확장 범위로, 노트북 한 대에서 실행되는 커널부터 데이터센터급 GPU까지 같은 코드가 확장되도록 설계했다고 적는다. 둘째는 코드 자체의 성질로, 읽기 쉽고 확장하기 쉬우며 연구 코드에 그대로 포함할 수 있는 상태를 유지하는 것을 목표로 든다.

구성 요소를 분리해 개발한다는 점도 배경으로 읽을 부분이다. 렌더러 Nyx와 컴파일러 Quadrants는 각각 독립 저장소를 가지며 별도 문서 사이트와 별도 패키지로 배포된다. Genesis World는 그 둘을 묶어 쓰는 상위 계층이고, Quadrants는 컴파일러만 필요한 사용자를 위해 독립 wheel로도 제공된다.

## 핵심 개념

multi-physics 엔진은 성질이 다른 물체를 각각 다른 방식으로 계산하면서도 하나의 시뮬레이션에 담는 엔진을 말한다. Genesis World는 강체와 변형체, 입자, 유체를 담당하는 솔버를 한데 모으고 이들이 같은 장면과 같은 상태를 공유하게 한다.

솔버는 특정 물리 모델의 상태를 시간에 따라 갱신하는 계산 모듈이다. 강체 동역학을 푸는 솔버와 유체를 푸는 솔버는 내부 수식이 전혀 다르지만, 이 플랫폼에서는 같은 장면 객체에 등록되어 한 스텝 안에서 함께 갱신된다.

coupling은 서로 다른 솔버가 맞닿는 경계에서 상호작용을 처리하는 방법이다. 물레방아처럼 유체가 강체를 밀거나, 천이 로봇 팔에 걸리는 장면이 여기에 해당한다. Genesis World는 explicit coupler와 SAP라는 두 경로를 제공하고 각각 전용 예제 폴더를 둔다.

렌더러가 카메라 센서로 붙는다는 점도 이 플랫폼의 개념 중 하나다. 렌더링 경로를 바꾸는 일이 파이프라인 교체가 아니라 장면에 붙이는 센서 설정 변경이 된다. 세 가지 경로가 같은 자리에 꽂히므로 사실적 영상이 필요할 때와 빠른 rasterization이 필요할 때를 코드 수정 없이 오갈 수 있다.

병렬 환경은 같은 시뮬레이션을 여러 벌 동시에 실행해 한 번의 스텝에서 여러 rollout을 얻는 방식이다. rollout은 policy를 실행해 얻은 한 번의 시뮬레이션 기록을 말한다. 로봇 학습에서 데이터 수집 속도가 학습 속도를 결정하는 경우가 많아, 이 플랫폼도 병렬 환경을 Simulation Interface 계층의 기본 기능으로 노출한다.

커널 낮춤(lowering)은 사용자가 Python으로 쓴 계산 코드를 대상 하드웨어의 명령으로 번역하는 과정이다. Quadrants가 이 역할을 맡아 같은 Python 커널을 NVIDIA GPU, AMD GPU, Apple GPU, Vulkan, x86 CPU, ARM64 CPU로 내려보낸다.

## 아키텍처

### 계층 구조

README의 구조도에서 Genesis World가 차지하는 부분은 점선 상자 안 네 계층이다. 그 위에는 사용자가 만드는 것이 있고 아래에는 사용자가 가진 연산 백엔드가 있다. 위쪽으로 예시된 용도는 로보틱스 환경, 머신러닝 파이프라인, 데이터 생성, agentic simulation 네 가지다.

| 계층 | 역할 | 주요 구성 |
|---|---|---|
| Simulation Interface | 사용자와 맞닿는 API | asset 파싱(URDF, MJCF, OBJ, GLB, USD 등), entity 접근자, 컨트롤러, 센서, 병렬 환경과 heterogeneous 환경, 내장 GUI |
| Physics | 통합 multi-physics 엔진 | Rigid, FEM, MPM, Particle(PBD와 SPH), uipc, explicit coupler, SAP |
| Render | 카메라 센서로 꽂히는 렌더링 경로 | Nyx, Luisa, Pyrender |
| Compiler | Python 커널 코드의 하드웨어 낮춤 | Quadrants |

![[assets/genesis-embodied-ai-genesis-world/stack-diagram.png]]
*Figure 2: Genesis World 계층 구조도. 점선 상자 맨 위를 Simulation interface가 가로지르고 그 아래 Render와 Physics와 Compiler가 나란히 놓인다. 위로는 Application layer, 아래로는 Compute layer가 붙는다 (Genesis-Embodied-AI 2026).*

구조도의 배치는 표의 순서와 조금 다르다. Simulation Interface가 상자 맨 위를 가로질러 사용자 코드와 맞닿고, 나머지 세 구성 요소는 그 아래에 위아래가 아니라 좌우로 나란히 놓인다. 즉 렌더러와 물리 엔진과 컴파일러는 서로를 거쳐 쌓이는 관계가 아니라 같은 인터페이스가 부르는 세 부품이다. 구조도 아래쪽 Compute layer에는 NVIDIA CUDA, AMD GPU, x86, ARM64, Metal이 적혀 있다.

이 네 계층이 한 저장소에 있다는 사실 자체가 Genesis World의 성격을 정한다. 물리 엔진만 제공하는 프로젝트라면 렌더러 선택과 GPU 커널 컴파일은 사용자 몫으로 남는다. 여기서는 세 조각이 같은 패키지에 들어오고 Python 인터페이스 한 겹이 그 위를 덮는다.

### 통합 multi-physics 엔진

Physics 계층은 일곱 개 항목을 통합한다. 앞의 다섯은 물리 모델별 솔버이고 뒤의 둘은 솔버 사이를 잇는 결합 경로다.

| 항목 | 다루는 대상 |
|---|---|
| Rigid | 강체 동역학과 충돌 |
| FEM | 유한요소로 나눈 변형체 |
| MPM | Material Point Method 기반의 모래와 점성 물질 같은 연속체 |
| Particle: PBD | position based dynamics 계열의 천과 액체 |
| Particle: SPH | 입자 기반 유체 |
| uipc | 외부 IPC 솔버 백엔드로, 선택 설치 항목이다 |
| explicit coupler | 서로 다른 솔버 사이의 명시적 결합 |
| SAP | 결합 예제군을 따로 가진 접촉 처리 경로 |

README는 이들이 "하나의 장면과 하나의 상태"를 공유한다고 명시한다. 즉 강체 시뮬레이션 결과를 유체 시뮬레이션에 사용자가 손으로 전달하는 구조가 아니라, 같은 상태 위에서 함께 갱신되는 구조다. 결합 예제가 카탈로그의 상당 부분을 차지하는 이유도 여기에 있다. 천을 강체에 올리는 예제, 강체와 MPM을 부착하는 예제, 드래곤을 절단하는 예제, 물레방아와 큐브 배출 예제가 모두 coupler 항목으로 묶여 있다.

uipc는 성격이 조금 다르다. 나머지가 저장소 안에 구현된 솔버라면 uipc는 외부 프로젝트 libuipc를 백엔드로 쓰는 경로이고, `pyuipc` 패키지를 따로 설치해야 하며 플랫폼 제약도 붙는다.

### 렌더링 경로

세 렌더링 경로는 성격이 서로 다르다. Nyx는 로보틱스를 겨냥해 자체 개발한 렌더러이고, Luisa는 DSL 기반 ray tracer, Pyrender는 rasterizer다.

| 경로 | 성격 | 설치 |
|---|---|---|
| Nyx | 로보틱스용 자체 렌더러. 별도 저장소와 예제군을 가진다 | `pip install gs-nyx` |
| Luisa | DSL 기반 ray tracer | 본체 포함 |
| Pyrender | rasterizer | 본체 포함 |

Nyx 예제는 genesis-nyx 저장소에 모여 있고 일곱 편이 순서대로 걸려 있다. hello 예제로 시작해 부착 카메라, PBR 재질, 조명 유형, 3D Gaussian Splatting, 물체 선택, 다중 카메라와 다중 환경으로 이어진다. 본 저장소에 남은 렌더링 예제는 entity를 따라가는 카메라와 애니메이션 카메라 두 편이다.

### 컴파일러 Quadrants

Quadrants는 Python 커널 코드를 여섯 종의 백엔드로 낮춘다. 대상은 CUDA, AMD ROCm, Apple Metal, Vulkan, x86, ARM64다. 노트북에서 데이터센터까지라는 확장 목표가 실제로 성립하려면 이 계층이 있어야 한다.

컴파일 외에 세 가지 기능을 함께 담고 있다고 명시한다. 미분 가능한 시뮬레이션을 위한 autodiff, 실행 그래프를 GPU에 미리 올려 두는 GPU graph, 그리고 fastcache다. README는 fastcache의 동작을 설명하지 않고 이름만 든다.

Quadrants는 Genesis World 설치 시 자동으로 포함되므로 별도 설치가 필요 없다. 컴파일러만 따로 쓰려는 사용자를 위한 독립 wheel도 있다. 계보상으로는 2025년 6월 Taichi에서 fork한 컴파일러이며, README는 Taichi 팀의 기술 지원에 감사를 표한다.

### 시뮬레이션 인터페이스와 센서

Simulation Interface 계층이 제공하는 것은 asset 파싱, entity 접근자, 컨트롤러, 센서, 병렬 환경과 heterogeneous 환경, 내장 GUI다. asset 파싱은 URDF, MJCF, OBJ, GLB, USD를 포함해 로보틱스와 그래픽스 양쪽 형식을 받는다.

센서 예제가 특히 두껍다. 일곱 종이 각각 독립 예제로 걸려 있다.

| 센서 예제 | 내용 |
|---|---|
| depth 카메라 | 사용자 정의 vverts 기반 깊이 영상 |
| IMU | Franka에 부착한 관성 센서 |
| lidar | teleoperation과 함께 쓰는 lidar |
| tactile sandbox | 촉각 센서 실험 장면 |
| contact force | 사족 로봇 Go2의 접촉력 |
| surface distance | ShadowHand의 표면 거리 |
| temperature grid | 온도 격자 |

컨트롤러 쪽에는 Diff-IK 컨트롤러와 배치 IK 예제가 있다. IK는 inverse kinematics의 약어로, 원하는 end-effector 자세를 만들기 위한 관절 값을 역으로 푸는 문제를 말한다. 배치 IK 예제가 따로 있다는 것은 IK 계산도 환경 여러 개를 한꺼번에 처리하는 형태로 제공됨을 뜻한다. GUI 쪽으로는 ImGui 기반 관절 제어 창, 디버그 드로잉, 메시 위의 점을 고르는 선택기, 마우스 상호작용 예제가 있어 장면을 눈으로 확인하며 조작하는 경로도 갖춰져 있다.

heterogeneous 환경은 병렬로 실행하는 환경들의 구성이 서로 다른 설정을 말한다. 같은 로봇을 여러 벌 복제하는 병렬화와 달리, 환경마다 다른 물체나 다른 구조를 두고 함께 실행한다. domain randomization 예제가 같은 묶음에 있는 것도 이 계층이 데이터 생성 용도를 염두에 두고 있음을 보여준다.

## 예제 카탈로그

카탈로그는 Physics, Rendering, Simulation Interface 세 묶음으로 나뉜다. 대부분 `pip install -e ".[dev]"` 이후 그대로 실행되고, IPC와 Nyx에 의존하는 예제만 선택 확장 설치가 필요하다.

| 묶음 | 항목 수 | 대표 예제 |
|---|---|---|
| Physics | 19 | Franka 큐브 조작, 충돌 타워, FEM constraint, MPM 모래 바퀴, SPH와 MPM 결합, PBD 천과 액체, stable fluid 연기, IPC 로봇 천 teleoperation, coupler 계열 5종, SAP grasping, 접촉 패치 |
| Rendering | 9 | entity 추적 카메라, 애니메이션 카메라, Nyx 예제 7편 |
| Simulation Interface | 18 | 로봇 제어 튜토리얼, ImGui 관절 제어, heterogeneous 환경, domain randomization, 센서 7종, 디버그 드로잉, 메시 점 선택기, 마우스 상호작용, Diff-IK 컨트롤러, 배치 IK, 드론, advanced worm |

카탈로그를 읽을 때 주의할 점이 하나 있다. README 하단에 HTML 주석으로 감춰 둔 예제 목록이 별도로 있다. 표에서 잠시 뺐을 뿐 링크와 썸네일 경로는 모두 유효하며 필요하면 그대로 되붙일 수 있다고 적혀 있다. 여기에는 병 잡기와 충돌 피라미드, 탄성 드래곤, SAP 고정 constraint, SPH 액체, 부드러운 큐브 grasping, 닫힌 kinematic chain, advanced muscle, hybrid robot, 키보드 teleoperation, IK와 motion planning을 결합한 grasping 예제가 있다. 즉 실제로 제공되는 예제는 표에 보이는 46개보다 많다.

## 설치

설치는 PyTorch를 공식 안내에 따라 먼저 설치하는 것으로 시작한다. 그다음 세 경로 중 하나를 고른다.

```bash
pip install genesis-world          # PyPI 릴리스, Python>=3.10,<3.14
pip install git+https://github.com/Genesis-Embodied-AI/genesis-world.git   # 최신 main
```

기여를 하려는 사용자에게는 editable 설치를 권한다. 기존 `genesis-world` 패키지를 먼저 제거한 뒤 저장소를 클론하고 `pip install -e ".[dev]"`를 실행한다. README는 HEAD를 옮길 때마다 이 명령을 다시 실행해 의존성과 엔트리포인트를 최신 상태로 맞추라고 명시한다. PyPI로 설치한 버전은 main 브랜치와 자동으로 동기화되지 않으므로 수동 갱신이 필요하다는 안내도 함께 붙는다.

uv 경로도 별도로 안내한다. 저장소를 클론하고 `uv sync`로 환경을 만든 뒤 플랫폼에 맞는 PyTorch를 설치한다. NVIDIA GPU는 `cu126` 인덱스, CPU 전용은 `cpu` 인덱스, Apple Silicon은 기본 wheel을 쓴다. 실행은 `uv run examples/rigid/single_franka.py` 형태다.

| 선택 확장 | 설치 명령 | 제약 |
|---|---|---|
| IPC 솔버(uipc 백엔드) | `pip install pyuipc` | Linux와 Windows의 x86, NVIDIA GPU 필요 |
| Nyx 렌더러 | `pip install gs-nyx` | genesis-nyx 저장소 참고 |
| Quadrants | 자동 포함 | 독립 사용 시 `pip install quadrants` |

## 성능 자료의 부재

README에는 성능 수치가 한 건도 없다. 스텝 속도, 병렬 환경 확장 특성, 솔버 정확도, 다른 시뮬레이터와의 비교가 모두 빠져 있다. 저장소가 그 자리에 두는 것은 실행 가능한 데모 목록이다. 46개 항목이 파일 경로와 함께 걸려 있어, 무엇이 되는지를 문장이 아니라 코드로 확인하게 한다.

이 구성은 저장소의 성격을 보여준다. 벤치마크 점수로 우열을 주장하는 자료가 아니라, 어떤 물리 현상과 어떤 센서와 어떤 하드웨어 백엔드를 다룰 수 있는지를 목록으로 보이는 자료다. 도입을 검토한다면 필요한 기능이 예제 목록에 있는지를 먼저 확인하고, 속도와 정확도는 직접 측정하거나 블로그 글을 참고해야 한다.

수치가 필요하면 두 곳을 봐야 한다. 하나는 2026년 5월 Genesis AI 블로그 글이고, 다른 하나는 세 곳으로 나뉜 문서 사이트다. 이 저장소의 README만으로는 도입 판단에 필요한 정량 근거를 얻을 수 없다.

## 한계

첫째, 자료의 범위가 좁다. 설치와 예제 카탈로그가 전부여서 솔버별 정확도나 성능 특성을 저장소 첫 문서만으로는 판단할 수 없다.

둘째, 선택 백엔드에 플랫폼 제약이 있다. IPC 솔버는 Linux와 Windows의 x86, NVIDIA GPU 조합에서만 설치된다고 명시돼 있어, Apple Silicon 사용자는 IPC 계열 예제를 실행할 수 없다. 본체는 Metal 백엔드를 지원하므로 플랫폼 지원이 계층마다 다르다는 점을 함께 봐야 한다.

셋째, 설치 절차가 사용자 환경에 의존한다. PyTorch 선설치가 필요하고, PyPI 버전은 main과 동기화되지 않으며, editable 설치는 HEAD 이동마다 재실행이 권장된다. 세 조건이 겹치면 버전 상태를 사용자가 계속 관리해야 한다.

넷째, 문서가 세 사이트로 나뉘어 있다. 본체와 Quadrants와 Nyx가 각자 문서를 두므로 렌더링이나 컴파일 문제를 추적할 때 저장소 밖으로 나가야 한다.

다섯째, 카탈로그의 일부가 주석 처리 상태다. README만 읽으면 실행 가능한 예제 범위를 실제보다 좁게 파악하게 된다.

## 계보와 인용

감사 목록이 곧 구현 계보다. 어느 부분이 어디에서 왔는지가 항목마다 적혀 있다.

| 프로젝트 | Genesis World에서의 위치 |
|---|---|
| Taichi | Quadrants가 2025년 6월 fork한 원본 컴파일러 |
| libuipc | IPC 솔버 백엔드 |
| FluidLab | MPM 솔버 구현 참고 |
| SPH_Taichi | SPH 솔버 구현 참고 |
| Ten Minute Physics, PBF3D | PBD 솔버 구현 참고 |
| MuJoCo | 강체 동역학 참고 |
| libccd | 충돌 검출 참고 |
| PyRender | rasterization 렌더러 |
| LuisaCompute, LuisaRender | ray tracing DSL |
| Madrona, Madrona-mjx | 배치 렌더러 백엔드 |

인용 항목은 두 개다. 2026년 5월 Genesis AI 블로그 글이 현재 버전을 대표하고, 2024년 12월의 "Genesis: A Generative and Universal Physics Engine for Robotics and Beyond"가 초기 프로젝트를 대표한다. 두 항목이 함께 걸려 있는 것은 프로젝트가 학술 출발점과 회사 지원 단계를 모두 거쳤음을 보여준다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Nyx | 로보틱스를 겨냥해 만든 자체 렌더러. `gs-nyx` 패키지로 설치하며 별도 저장소를 가진다 |
| Quadrants | Python 커널 코드를 CUDA, ROCm, Metal, Vulkan, x86, ARM64로 낮추는 컴파일러. 2025년 6월 Taichi에서 fork했고 autodiff와 GPU graph, fastcache를 담당한다 |
| uipc | libuipc 기반 IPC 솔버 백엔드. `pyuipc`로 설치하는 선택 확장이며 Linux와 Windows의 x86, NVIDIA GPU를 요구한다 |
| explicit coupler | 서로 다른 솔버가 같은 장면에서 상호작용하도록 잇는 결합기 |
| SAP | Physics 계층의 또 다른 결합 경로. 전용 예제 폴더 `examples/sap_coupling/`을 가지며 README는 약어를 풀어 적지 않는다 |
| heterogeneous 환경 | 병렬로 실행하는 환경들의 구성이 서로 다른 시뮬레이션 설정. 전용 예제 `heterogeneous_simulation.py`가 있다 |

## 관련 페이지

- [[physical-ai/robocasa-robocasa]]: robosuite와 MuJoCo 위에 세운 주방 시뮬레이션 저장소. Genesis World가 엔진과 렌더러 계층을 제공한다면 RoboCasa 저장소는 그 위의 장면과 과제를 제공한다는 점에서 층이 다르다.
- [[physical-ai/nasiriany-2026-robocasa365-a-large-scale-simulation-framework]]: 시뮬레이션을 평가 무대로 쓰는 사례. 같은 조건에서 VLA 여러 종의 성공률을 비교한다.
- [[physical-ai/huggingface-lerobot]]: 로봇 학습 쪽 공용 프레임워크. 데이터셋 형식과 policy 학습을 담당해, 시뮬레이션 플랫폼과 상보적인 위치에 있다.
- [[physical-ai/9bow-2026-physics-aware-generation-world-simulator]]: 생성 모델로 미래 장면을 만드는 world simulator 계열의 한국어 정리. 물리 방정식을 푸는 시뮬레이터와 대비해 읽을 자료다.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리 전체 지도.
- [[overviews/glossary-physical-ai]]: 이 페이지의 전문 용어 표기 기준.
