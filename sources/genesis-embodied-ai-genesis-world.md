---
title: "Genesis World: Simulation platform for general-purpose robotics & embodied AI learning"
type: repo
year: 2026
category: physical-ai
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

## 한 줄 요약 (One-line Summary)

Genesis World는 physical AI 개발을 겨냥한 오픈소스 시뮬레이션 플랫폼이다. 여러 솔버가 하나의 장면과 하나의 상태를 공유하는 multi-physics 엔진, 로보틱스용으로 자체 개발한 렌더러 Nyx, Python 커널 코드를 여섯 가지 하드웨어 백엔드로 낮추는 컴파일러 Quadrants를 Python API 한 겹 아래에 묶었다. 2024년 12월 학술 프로젝트 Genesis로 출발했고 지금은 Genesis AI가 개발을 공식 지원한다. 라이선스는 Apache 2.0이다.

## 1. 자료 정보 (Document Information)

- **저장소**: https://github.com/Genesis-Embodied-AI/genesis-world
- **개발 주체**: Genesis AI. 전신은 2024년 12월 시작한 학술 프로젝트 Genesis이고, 저장소 이름도 `Genesis`에서 `genesis-world`로 바뀌었다
- **라이선스**: Apache 2.0
- **배포**: PyPI 패키지 `genesis-world`, 요구 버전은 Python 3.10 이상 3.14 미만
- **문서**: 본체는 genesis-world.readthedocs.io, 컴파일러 Quadrants와 렌더러 Nyx는 각각 별도 문서 사이트
- **수집 범위**: README 전문. 수집 시점 star 29,909, fork 2,854, open issue 134, 최종 push 2026-09-06
- **자료 성격**: 플랫폼 계층 구조 소개와 실행 가능한 예제 카탈로그, 설치 절차가 전부다. 성능 수치와 벤치마크 결과는 없고 기술 세부는 Genesis AI 블로그 글로 넘긴다

## 2. 주요 기여 (Key Contributions)

README가 내세우는 첫 번째 요점은 네 계층을 한 패키지 뒤에 통합했다는 것이다. multi-physics 엔진, 사실적 렌더러 Nyx, 크로스 플랫폼 컴파일러 Quadrants가 Python 시뮬레이션 인터페이스 하나로 노출된다. 사용자는 세 구성 요소를 따로 조립하지 않고 같은 API에서 부른다.

두 번째 요점은 확장 범위다. 노트북 한 대의 커널부터 데이터센터급 GPU까지 같은 코드가 확장되도록 설계했다고 적는다. 동시에 읽기 쉽고 확장하기 쉬우며 연구 코드에 그대로 끼워 넣을 수 있는 상태를 유지하는 것을 목표로 든다.

세 번째 요점은 계층마다 실행 가능한 데모를 붙인 카탈로그다. Physics, Rendering, Simulation Interface 세 묶음으로 나뉘고 대부분 `pip install -e ".[dev]"` 이후 그대로 실행된다. IPC와 Nyx처럼 선택 백엔드에 의존하는 예제만 추가 설치가 필요하다.

네 번째 요점은 생태계 분리다. 렌더러 Nyx와 컴파일러 Quadrants는 각각 독립 저장소로 개발되며, Quadrants는 별도 wheel로도 설치할 수 있다. Genesis World는 그 둘을 묶어 쓰는 상위 계층이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 계층 구조

README의 구조도에서 Genesis World가 차지하는 영역은 점선 상자 안 네 계층이다. 그 위에는 사용자가 만드는 것(로보틱스 환경, 머신러닝 파이프라인, 데이터 생성, agentic simulation)이 있고, 아래에는 사용자가 가진 연산 백엔드가 있다.

| 계층 | 역할 | 주요 구성 |
|---|---|---|
| Simulation Interface | 사용자와 맞닿는 API | asset 파싱(URDF, MJCF, OBJ, GLB, USD 등), entity 접근자, 컨트롤러, 센서, 병렬 환경과 heterogeneous 환경, 내장 GUI |
| Physics | 통합 multi-physics 엔진 | Rigid, FEM, MPM, Particle(PBD와 SPH), uipc, explicit coupler, SAP |
| Render | 카메라 센서로 꽂히는 렌더링 경로 | Nyx(자체 개발), Luisa(DSL ray tracer), Pyrender(rasterizer) |
| Compiler | Python 커널 코드의 하드웨어 낮춤 | Quadrants |

### Physics 계층

Physics 계층의 설계 요점은 여러 솔버가 하나의 장면과 하나의 상태를 공유한다는 것이다. 강체와 변형체, 입자, 유체가 각자 별도 시뮬레이션으로 나뉘는 대신 같은 상태 위에서 함께 갱신된다.

| 솔버 | 다루는 대상 |
|---|---|
| Rigid | 강체 동역학과 충돌 |
| FEM | 유한요소 기반 변형체 |
| MPM (Material Point Method) | 모래, 점성 물질 같은 연속체 |
| Particle: PBD | position based dynamics 계열의 천과 액체 |
| Particle: SPH | 입자 기반 유체 |
| uipc | 외부 IPC 솔버 백엔드(선택 설치) |
| explicit coupler | 서로 다른 솔버 사이의 결합 |
| SAP | 결합 예제군이 따로 있는 접촉 처리 경로 |

카탈로그의 Physics 예제는 이 조합을 그대로 보여준다. Franka 로봇의 큐브 조작과 충돌 타워, contype 설정 같은 강체 예제, FEM의 hard constraint와 soft constraint, MPM 튜토리얼과 모래 바퀴, SPH 강체 결합과 SPH에 MPM을 더한 예제, PBD 액체와 천, stable fluid 연기, IPC 기반 로봇 천 teleoperation, coupler 계열(천과 강체, 강체와 MPM 부착, 드래곤 절단, 물레방아, 큐브 배출), SAP 기반 Franka 강체 큐브 grasping, 접촉 패치 예제가 있다.

### Render 계층

렌더링 경로 세 가지는 모두 카메라 센서 형태로 장면에 붙는다. 즉 렌더러를 바꾸는 일이 파이프라인 교체가 아니라 센서 설정 변경이다.

| 경로 | 성격 |
|---|---|
| Nyx | 로보틱스를 겨냥해 자체 개발한 렌더러. 별도 저장소와 예제군을 가진다 |
| Luisa | DSL 기반 ray tracer |
| Pyrender | rasterizer |

Nyx 예제는 genesis-nyx 저장소에 있고 hello 예제, 부착 카메라, PBR 재질, 조명 유형, 3D Gaussian Splatting, 물체 선택, 다중 카메라와 다중 환경을 다룬다. 본 저장소에는 entity 추적 카메라와 애니메이션 카메라 예제가 들어 있다.

### Compiler 계층

Quadrants는 Python으로 쓴 커널 코드를 CUDA, AMD ROCm, Apple Metal, Vulkan, x86, ARM64로 낮춘다. Genesis의 autodiff와 GPU graph, fastcache 기능도 이 컴파일러가 담고 있다. Quadrants는 2025년 6월 Taichi에서 fork한 컴파일러다.

Quadrants는 Genesis World 설치 시 함께 들어오므로 별도 설치가 필요 없다. 컴파일러만 따로 쓰려는 사용자를 위해 `pip install quadrants` 형태의 독립 wheel도 있다.

### Simulation Interface 계층

카탈로그의 Simulation Interface 예제는 이 계층이 무엇을 제공하는지 목록으로 보여준다.

- 로봇 제어 튜토리얼, Diff-IK 컨트롤러, 배치 IK
- ImGui 기반 관절 제어 GUI, 디버그 드로잉, 메시 점 선택기, 마우스 상호작용
- heterogeneous 환경과 domain randomization
- 센서: depth 카메라, IMU, lidar teleoperation, tactile sandbox, Go2의 contact force, ShadowHand의 surface distance, temperature grid
- 드론(`hover_train.py`), advanced worm

README 하단 주석에는 카탈로그에서 잠시 뺀 예제 목록이 남아 있다. 링크와 썸네일 경로가 모두 유효하므로 필요하면 표에 그대로 되붙일 수 있다고 적혀 있다. 여기에는 병 잡기, 충돌 피라미드, 탄성 드래곤, SAP 고정 constraint, SPH 액체, 부드러운 큐브 grasping, 닫힌 kinematic chain, advanced muscle, hybrid robot, 키보드 teleoperation, IK와 motion planning 결합 예제 등이 있다.

### 설치

PyTorch를 공식 안내에 따라 먼저 설치한 뒤 Genesis World를 설치한다.

```bash
pip install genesis-world          # Python>=3.10,<3.14
pip install git+https://github.com/Genesis-Embodied-AI/genesis-world.git   # 최신 main
```

기여를 하려는 사용자에게는 editable 설치를 권한다. 기존 `genesis-world`를 먼저 제거한 뒤 저장소를 클론하고 `pip install -e ".[dev]"`를 실행한다. HEAD를 옮길 때마다 이 명령을 다시 실행해 의존성과 엔트리포인트를 맞추라고 명시한다.

uv 경로도 안내한다. `uv sync`로 환경을 만든 뒤 플랫폼에 맞는 PyTorch를 설치하고(`cu126` 인덱스, `cpu` 인덱스, Apple Silicon은 기본 wheel) `uv run examples/rigid/single_franka.py`로 예제를 실행한다.

| 선택 확장 | 설치 | 제약 |
|---|---|---|
| IPC 솔버(uipc 백엔드) | `pip install pyuipc` | Linux와 Windows의 x86, NVIDIA GPU 필요 |
| Nyx 렌더러 | `pip install gs-nyx` | genesis-nyx 저장소 참고 |
| Quadrants | 자동 포함 | 독립 사용 시 `pip install quadrants` |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README에는 성능 수치가 없다. 속도, 정확도, 다른 시뮬레이터와의 비교가 모두 빠져 있고 기술 세부는 Genesis AI 블로그 글 "The Role of Simulation in Scalable Robotics, Genesis World 1.0, and the Path Forward"로 넘긴다. 수치 비교가 목적이라면 이 자료는 맞지 않는다.

대신 README가 제시하는 것은 실행 가능한 데모 목록이다. Physics 19개, Rendering 9개, Simulation Interface 18개 항목이 파일 경로와 함께 걸려 있어, 무엇이 되는지를 코드 단위로 확인할 수 있다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

첫째, 자료 자체의 범위가 좁다. 설치와 예제 카탈로그가 전부여서 솔버 정확도, 스텝 속도, 병렬 환경 확장 특성 같은 실무 판단 근거를 저장소 첫 문서만으로는 얻을 수 없다.

둘째, 선택 백엔드에 플랫폼 제약이 있다. IPC 솔버는 Linux와 Windows의 x86, NVIDIA GPU 조합에서만 설치된다고 적혀 있어 Apple Silicon 사용자는 해당 예제를 실행할 수 없다.

셋째, 설치 절차가 사용자 환경에 의존한다. PyTorch를 먼저 직접 설치해야 하고, PyPI 버전은 main 브랜치와 자동으로 동기화되지 않으며, editable 설치는 HEAD를 옮길 때마다 다시 실행하라고 안내한다.

넷째, 문서가 세 사이트로 나뉘어 있다. 본체, Quadrants, Nyx가 각자 문서를 두므로 렌더링이나 컴파일 문제를 좇을 때 저장소 밖으로 나가야 한다.

다섯째, 카탈로그 일부가 주석 처리된 상태다. 표에서 뺀 예제 목록이 HTML 주석으로 남아 있어 README만 보면 실행 가능한 예제 범위를 실제보다 좁게 파악하게 된다.

## 6. 관련 연구 (Related Work)

README의 감사 목록이 곧 구현 계보다.

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

인용 항목은 두 개다. 하나는 2026년 5월 Genesis AI 블로그 글이고, 다른 하나는 2024년 12월의 초기 프로젝트 "Genesis: A Generative and Universal Physics Engine for Robotics and Beyond"다.

## 7. 용어집 (Glossary)

이 자료 고유 용어만 정리한다. 도메인 공통 용어는 [[overviews/glossary-physical-ai]]와 [[overviews/glossary-llms]]에 위임한다.

- **Genesis World**: 저장소와 PyPI 패키지 이름. 이전 이름은 Genesis이며 2024년 12월 학술 프로젝트로 시작했다.
- **Nyx**: 로보틱스를 겨냥해 만든 자체 렌더러. `gs-nyx` 패키지, genesis-nyx 저장소.
- **Quadrants**: Python 커널 코드를 CUDA, ROCm, Metal, Vulkan, x86, ARM64로 낮추는 컴파일러. 2025년 6월 Taichi에서 fork했고 autodiff와 GPU graph, fastcache를 담당한다.
- **uipc**: libuipc 기반 IPC 솔버 백엔드. `pyuipc`로 설치하는 선택 확장이다.
- **SAP**: Physics 계층의 결합 경로 중 하나. 전용 예제 폴더 `examples/sap_coupling/`을 가진다. README는 약어를 풀어 적지 않는다.
- **explicit coupler**: 서로 다른 솔버가 같은 장면에서 상호작용하도록 잇는 결합기.
- **heterogeneous 환경**: 병렬 환경 각각의 구성이 서로 다른 시뮬레이션 설정. 전용 예제 `heterogeneous_simulation.py`가 있다.
- **fastcache**: Quadrants가 담고 있는 캐시 기능. README는 이름만 언급한다.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 큐레이션 |
|---|---|---|---|
| fig01 | README 최상단 히어로 이미지 | manual | 확정 (요약 절 대표 이미지) |
| fig02 | 계층 구조도 (`diagram_white_lum.png`) | manual | 확정 (architecture) |

repo 유형이라 이미지는 자동으로 내려받지 않는다. 사용자 확인 뒤 두 장 모두 `wiki/assets/genesis-embodied-ai-genesis-world/`에 `hero-shot.png`와 `stack-diagram.png`로 저장했다. 원본은 저장소의 `readme-assets` 브랜치에 있다.
