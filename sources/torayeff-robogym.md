---
title: "robogym"
type: repo
year: 2026
category: physical-ai
raw_path: raw/repos/torayeff-robogym.md
raw_filename: "torayeff-robogym.md"
source_collection: external
org: "torayeff"
repo: "robogym"
url: "https://github.com/torayeff/robogym"
license: "Apache-2.0"
tags: [physical-ai, simulator, manipulation, robot-learning]
---

## 한 줄 요약 (One-line Summary)

robogym은 AI 에이전트가 HTTP 요청으로 시뮬레이션 로봇을 제어하게 하는 Python 서버로, 시뮬레이션이 실제 로봇처럼 실시간으로 계속 진행되는 상태에서 에이전트가 observation을 읽고 action을 보내며, 그 장면을 브라우저에서 H.264 영상으로 지켜볼 수 있다. 현재 환경은 MuJoCo로 시뮬레이션한 SO-101 팔 두 대의 협업 과제(so101_dual_arm) 하나다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저장소 | torayeff/robogym |
| 설명 | "RoboGym - Playground for agentic robotics" |
| 저작권자 | Robominder (Copyright 2026) |
| 라이선스 | Apache-2.0 (로봇 모델은 각 출처의 라이선스를 따름) |
| 주 언어 | Python (실행은 `uv`) |
| 생성 | 2026-10-05 |
| 수집 시점 커밋 | 54876614c00d (2026-10-12) |
| 수집 범위 | 최상위 README, so101_dual_arm 환경 README, sandbox.toml |
| 주요 의존 | FastAPI, uvicorn, MuJoCo, PyAV(libx264), OpenCV, Modal |

수집 시점에 star와 fork는 모두 0이고 GitHub topics도 없다. 공개된 지 일주일 남짓 된 초기 저장소다. README에는 이미지가 없고 아키텍처를 그린 Mermaid 도식 하나만 있다.

## 2. 주요 기여 (Key Contributions)

- **HTTP 기반 로봇 제어 인터페이스.** 에이전트는 `/spec`, `/observation`, `/action`, `/pause`, `/resume`, `/reset`, `/status` 일곱 개 엔드포인트만으로 시뮬레이션 로봇을 다룬다. `/spec`은 observation과 action의 JSON Schema를 제공하고, 스펙에 맞지 않는 action은 상태 코드 422와 오류 설명으로 거부된다.
- **실시간 진행 시뮬레이션.** 일반적인 gym 계열 환경은 에이전트가 `step()`을 호출할 때만 시간이 흐른다. robogym은 반대로 시뮬레이션이 실제 시계에 맞춰 계속 진행되고, 에이전트가 다음 action을 고민하는 동안에도 세계가 움직인다. 즉 에이전트의 추론 지연이 그대로 제어 결과에 반영된다.
- **실시간 보장을 위한 프로세스 분리.** 물리 시뮬레이션은 별도 프로세스(`PhysicsProcess`)에서 높은 스케줄링 우선순위로 실행되고, 서버 프로세스의 작업이나 GIL이 step을 지연시키지 못하게 한다.
- **브라우저 실시간 시청.** 1280 × 720 프레임을 libx264로 한 번 인코딩해 모든 브라우저에 같은 바이트로 보내고, 브라우저는 WebCodecs `VideoDecoder`로 디코딩한다.
- **클라우드 샌드박스 배포.** Modal 샌드박스에서 환경을 공개 HTTPS URL로 띄우는 CLI(`robogym sandbox create/list/delete`)를 제공한다.
- **정밀하게 문서화한 SO-101 양팔 환경.** 도달 범위 탐색으로 정한 물체 배치 제약, 렌즈 왜곡 모델을 적용한 카메라, MuJoCo Menagerie 모델 대비 변경 사항을 항목별로 기록한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 빠른 시작

```bash
git clone https://github.com/torayeff/robogym.git
cd robogym
uv run robogym serve so101_dual_arm --host 127.0.0.1 --port 8000
```

http://127.0.0.1:8000 에서 장면을 보고, 시뮬레이션은 일시정지 상태로 시작한다. 다른 터미널에서 다음처럼 재개, 관절 이동, observation 조회를 한다.

```bash
curl -X POST localhost:8000/resume
curl --json '{"joints": {"left_shoulder_lift": -0.75}}' localhost:8000/action
curl localhost:8000/observation
```

대화형 API 문서는 `/docs`에 있다. 디스플레이가 없는 Linux에서는 `MUJOCO_GL=egl`을 설정해 오프스크린 렌더링을 쓴다. macOS 시작 시 나오는 `AVFFrameReceiver` 중복 구현 경고는 무해하다.

### 3.2 HTTP API

| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/spec` | 환경 설명, observation과 action의 JSON Schema |
| GET | `/observation` | 현재 observation (모든 값이 같은 순간에 측정됨) |
| POST | `/action` | action 전송, 다음 시뮬레이션 step에 적용 |
| POST | `/pause` | 시뮬레이션 일시정지 |
| POST | `/resume` | 시뮬레이션 재개 |
| POST | `/reset` | 장면과 시계를 초기화하고 일시정지 |
| GET | `/status` | 실행 여부, 시뮬레이션 시간, 지연된 step 수 |

서버에는 인증이 없어 서버에 접근할 수 있는 누구나 시뮬레이션을 제어할 수 있다.

### 3.3 2-프로세스 구조

`PhysicsProcess`를 쓰는 환경은 두 프로세스로 실행된다. 에이전트는 서버 프로세스와 HTTP로 통신하고, 서버 프로세스는 시뮬레이션 프로세스와 `multiprocessing.Pipe`로 명령과 상태를 주고받으며, 브라우저에는 `/video`로 H.264 스트림을 보낸다.

| 프로세스 | 구성 요소 | 역할 |
|---|---|---|
| 서버 프로세스 | FastAPI 앱, `So101DualArm`(Env), `Renderer`, `Viewer` | HTTP 처리, 렌더링, 영상 인코딩 |
| 시뮬레이션 프로세스 | `_run()` 루프, `So101DualArmPhysics` | 물리 step, 명령 처리 |

**서버 프로세스 세부.**

- `robogym serve <env>`는 `ENVS`에서 환경을 찾아 그 모듈만 import하고 uvicorn으로 `create_app()`을 서빙한다. `main()`은 서버 모듈을 함수 안에서 import한다. 시뮬레이션 프로세스가 `robogym.__main__`을 다시 import할 때 FastAPI, PyAV, OpenCV를 불러오지 않게 하기 위해서다.
- 앱의 `lifespan`이 Env를 생성해 시뮬레이션 프로세스를 띄운 뒤, 서버 자신의 우선순위를 `NICE` = 10 단계 낮춘다 (Linux에서는 스레드마다). 이후 `Viewer.run()`과 `stop_if_dead()`를 asyncio 태스크로 시작한다.
- `POST /action`은 `Env.act()`의 `ValueError`를 422 응답으로 바꾼다.
- 블로킹 작업은 이벤트 루프 밖에서 실행된다. `PhysicsProcess`는 파이프 스레드에서 응답을 기다리고, `Renderer`는 프로세스의 유일한 OpenGL 컨텍스트를 소유한 렌더 스레드에서 그린다 (컨텍스트는 한 번에 한 스레드에서만 current 상태가 될 수 있다). 두 스레드 모두 단일 스레드 executor이고, `Viewer`는 `asyncio.to_thread()`에서 인코딩한다.

**시뮬레이션 프로세스 세부.**

- `PhysicsProcess`는 `multiprocessing`의 `spawn` 방식으로 서버의 스레드나 OpenGL 상태가 없는 새 인터프리터에서 `_run()`을 실행한다.
- `_run()`은 `SIGINT`를 무시하고, `Physics`를 만들고, 우선순위를 올리고, 준비 완료를 알린 뒤 `gc.freeze()`를 호출해 설정 단계에서 할당한 객체를 가비지 컬렉션 대상에서 뺀다.
- 우선순위 요청은 OS별로 다르다. Linux는 `SCHED_FIFO` 우선순위 1로, `CAP_SYS_NICE` 권한(Docker에서는 `--cap-add=SYS_NICE`)이 필요하다. macOS는 Mach `THREAD_TIME_CONSTRAINT_POLICY`를 한 timestep 주기로 요청하며 권한이 필요 없다. OS가 거부하면 경고를 남기고 일반 우선순위로 실행한다.
- `origin`은 시뮬레이션 시간이 0이었던 `time.monotonic()` 값이다. 다음 step의 기한은 `origin + physics.time + physics.timestep`이다. 루프는 그때까지 잠들었다가 기한이 지난 정수 개의 step `n`(보통 1)을 `physics.step(n)`으로 한 번에 진행한다. 따라서 늦게 깨어나도 이후 step의 시각이 밀리지 않는다.
- 시뮬레이션 시간이 `MAX_LAG` = 0.5초 넘게 뒤처지면 지연분을 `origin`에 더해 그 구간을 건너뛴다.
- 한 timestep 넘게 늦게 실행된 step마다 `late_steps`가 1 증가하고, `max_lateness`가 최악의 지연을 기록하며, 경고는 초당 최대 한 번 남긴다.
- 각 step 전에 `connection.poll()`로 명령을 확인하고 대기 중인 명령(`act`, `state`, `status`, `pause`, `resume`, `reset`, `stop`)을 먼저 실행한다. 일시정지 중에는 `connection.recv()`에서 대기한다. `resume`은 `origin`을 다시 잡아 시뮬레이션 시간이 멈춘 지점부터 이어지게 한다. 명령에서 난 예외는 응답으로 보내져 서버의 `PhysicsProcess.call()`에서 다시 발생한다.
- `step()`이 예외를 내면 루프는 `reset()`을 호출하고 일시정지하며 `resets`를 1 늘린다. `So101DualArmPhysics.step()`은 MuJoCo가 `mjWARN_BADQPOS`, `mjWARN_BADQVEL`, `mjWARN_BADQACC`를 설정하면 `FloatingPointError`를 낸다.

### 3.4 observation과 action 처리

- `So101DualArm.observe()`는 `state` 명령을 보내고, 루프는 두 step 사이에 MuJoCo의 `mjSTATE_INTEGRATION` 상태(숫자 237개)로 답한다. 서버의 `Renderer`는 렌더 스레드에서 이 상태를 자기 모델에 `mj_setState`와 `mj_forward`로 적재해 카메라 세 대를 렌더링하고 JPEG로 인코딩한다. 그동안 시뮬레이션은 계속 진행된다. 응답의 시간, 관절 각도, 이미지는 모두 이 한 상태에서 나오므로 같은 순간의 값이다.
- `So101DualArm.act()`는 `/spec`이 주는 서보별 목표 범위로 action을 검사하고, 틀리면 무엇이 틀렸는지 담은 `ValueError`를 낸다. 유효한 action만 `act`로 보내므로 시뮬레이션 루프가 두 step 사이에서 큰 무효 action을 unpickle할 일이 없다. `So101DualArmPhysics.act()`는 목표값을 actuator의 `ctrl`에 쓴다.

### 3.5 영상 스트리밍

- `GET /`는 `viewer.html`을 서빙한다. 페이지는 `GET /video`를 `fetch`로 읽어 WebCodecs `VideoDecoder`로 디코딩하고 canvas에 그린다. 스트림이 끝나면 1초 뒤 재연결한다.
- `Viewer.run()`은 브라우저가 연결된 동안 1/30초(`FPS`)마다 `Env.view()`를 호출한다. `So101DualArm.view()`는 observation이 처리 중이거나 직전 프레임 이후 상태가 바뀌지 않았으면 `None`을 반환한다. 따라서 observation이 우선하고, 일시정지된 시뮬레이션은 action이나 reset 이후에만 프레임을 보낸다.
- 1280 × 720 프레임(`VIEW_WIDTH`, `VIEW_HEIGHT`)은 PyAV를 거쳐 libx264로 한 번만 인코딩된다. 설정은 preset `veryfast`, tune `zerolatency`, CRF 23, 60프레임마다 keyframe(`KEYFRAME_INTERVAL`), High profile level 3.1이며, viewer.html의 코덱 문자열 `avc1.64001f`가 이를 지정한다.
- 모든 브라우저가 같은 바이트를 받는다. 형식은 4바이트 little-endian 길이, keyframe 플래그 1바이트, H.264 Annex B 형식 프레임이다.
- 처음 연결한 브라우저는 마지막 keyframe 이후 프레임을 받아 즉시 디코딩을 시작한다. 브라우저 큐가 60프레임을 넘으면 큐를 비우고 다음 keyframe으로 건너뛴다.
- 브라우저는 HTTPS 또는 localhost에서 서빙된 페이지에서만 영상을 재생한다. 샌드박스 없이 다른 기기의 서버를 보려면 HTTPS 프록시를 둔다.

### 3.6 종료 처리

- Ctrl+C나 `SIGTERM`이 오면 `Server.shutdown()`이 먼저 `Viewer.end_streams()`를 호출한다. 그러지 않으면 uvicorn이 끝나지 않는 `/video` 응답을 기다리기 때문이다. 이후 lifespan이 Env를 닫는다. `Renderer.close()`가 렌더 스레드에서 OpenGL 컨텍스트를 해제하고, `PhysicsProcess.close()`가 `stop`을 보내고 프로세스를 join한다.
- `stop_if_dead()`는 0.1초마다 시뮬레이션 프로세스를 확인하는 `Env.wait()`를 기다린다. 프로세스가 종료되면 종료 코드를 기록하고 서버에 `SIGTERM`을 발생시켜 위와 같이 종료한다.

### 3.7 클라우드 샌드박스

- 절차: Modal 토큰 생성, `.env.example`을 `.env`로 복사해 토큰 ID와 secret 입력, `uv run robogym sandbox create so101_dual_arm` 실행.
- 명령은 샌드박스 ID와 URL을 출력한다. `sandbox list`는 실행 중인 샌드박스를, `sandbox delete <id>`는 종료를 담당한다. 샌드박스는 연결이 30분 없거나 2시간이 지나면 스스로 멈춘다.
- `robogym sandbox create <env>`는 Modal 앱 `robogym` 안에 `robogym serve <env> --host 0.0.0.0 --port 8000`을 실행하는 `modal.Sandbox`를 띄운다. 이미지는 환경의 `Dockerfile`로 빌드하고, `cpu`, `memory`, `gpu`는 `sandbox.toml`에서 읽는다. Modal 코어 하나가 vCPU 두 개라서 `vcpus`는 절반으로 나눈다.
- 포트 8000은 암호화된 Modal 터널로 공개되며, `create`는 TCP 준비 확인이 연결되면 반환한다. 샌드박스마다 `env` 태그가 붙고 `sandbox list`가 이를 출력한다.
- so101_dual_arm의 `sandbox.toml`은 `vcpus = 4`, `memory_gib = 8`, `gpu = "T4"`다.

### 3.8 환경 추가 방법

서버는 `robogym/env.py`의 `Env` 인터페이스로만 환경과 통신하며, 그 메서드는 API와 대응한다. 두 종류의 시뮬레이터를 수용한다.

- Python에서 step할 수 있는 시뮬레이터(MuJoCo 등)는 `Physics`를 구현하고 `PhysicsProcess`가 실시간으로 실행한다.
- 자기 프로세스에서 실행과 렌더링을 하는 시뮬레이터(Isaac Sim 등)는 별도로 실행하고, `Env`가 그 클라이언트 역할을 한다.

추가 절차는 다음 네 단계다.

1. `robogym/envs/`에 `Env` 하위 클래스를 담은 패키지를 만들고 `robogym/envs/__init__.py`의 `ENVS`에 `"<name>": "robogym.envs.<name>.env:<Class>"`로 등록한다.
2. `PhysicsProcess`를 쓰면 `Physics` 메서드를 빠르게 유지한다 (시뮬레이션 step 사이에 실행되므로). 반환 상태에는 장면 렌더링에 필요한 모든 것을 담는다. 정의 모듈에는 렌더링 라이브러리를 두지 않는다 (시뮬레이션 프로세스가 그 모듈을 import하므로).
3. 클라우드 샌드박스용으로 저장소 루트에서 빌드되고 `PATH`에 `robogym`이 있는 `Dockerfile`과, `vcpus`, `memory_gib`, 필요하면 Modal `gpu` 타입을 담은 `sandbox.toml`을 추가한다. GPU 샌드박스는 gVisor에서 실행되어 실시간 우선순위를 허용하지 않고, GPU 없는 샌드박스는 VM에서 실행되어 허용한다.
4. `uv run pytest`를 실행한다. `tests/test_envs.py`가 등록된 모든 환경을 `Env` 인터페이스 기준으로 검사한다.

### 3.9 so101_dual_arm 환경

**장면.** SO-101 팔 두 대가 테이블 뒤편에 나란히 서 있고 앞에 빨간 블록과 빨간 트레이가 있다. 각 물체는 옆에 있는 팔만 닿는 곳에서 시작하므로, 블록을 트레이에 넣으려면 두 팔이 모두 필요하다. 에이전트는 양 손목 카메라와 머리 위 카메라 한 대로 장면을 본다.

**observation과 action.**

| 구분 | 내용 |
|---|---|
| 서보 | 팔마다 `shoulder_pan`, `shoulder_lift`, `elbow_flex`, `wrist_flex`, `wrist_roll`, `gripper` 6개, `left_`/`right_` 접두사 (총 12개) |
| observation | 시뮬레이션 시간(초), 관절 각도 12개(rad), 카메라 3대(`top_camera`, `left_wrist_camera`, `right_wrist_camera`)의 640 × 480 JPEG (base64) |
| observation에 없는 것 | 블록과 트레이의 위치 (에이전트가 이미지에서 찾아야 함) |
| action | 일부 서보의 목표 각도(rad). 빠진 서보는 이전 목표 유지 |
| `/spec` 추가 정보 | 서보별 범위와 회전 방향, 블록과 트레이 크기 |

action 예시: `{"joints": {"left_shoulder_lift": -0.75, "left_gripper": 1.2}}`

**reset.** 두 팔을 접고 그리퍼를 테이블 바로 위에 두며, 블록과 트레이를 한쪽 팔씩 옆에 무작위로 배치한다. 각 물체는 무작위 각도로 회전하고, 블록은 세워지거나 눕혀진다. `physics.py`의 세 상수가 물체 중심의 위치 범위를 정한다.

| 상수 | 경계 | 목적 |
|---|---|---|
| `NEAR` | 자기 팔 shoulder-pan 축에서의 최대 거리 | 그 팔이 그리퍼를 수직에서 25° 이내로 기울여 블록을 집고, 40° 이내로 기울여 트레이 위에 닿을 수 있음 |
| `FAR` | 반대 팔 shoulder-pan 축에서의 최소 거리 | 반대 팔은 블록을 잡거나 트레이 위로 그리퍼를 가져갈 수 없음. 완전히 뻗으면 손끝이 물체에 살짝 닿을 수는 있음 |
| `FRONT` | 최소 전방 위치 x | 물체 전체가 머리 위 카메라 시야에 들어옴 |

이 도달 한계는 테이블, 리그, 팔 자신에 최대 1 mm까지만 파고드는 자세를 허용한 관절 각도 탐색에서 나왔다. 블록 높이에서 팔의 grasp point(`gripperframe` site)는 shoulder-pan 축에서 최대 0.436 m, 트레이 위에서는 최대 0.441 m까지 닿는다. 물체가 `FAR` 경계에 있을 때 반대 팔의 grasp point는 그 팔을 향해 누운 블록의 잡을 수 있는 부분에 19 mm보다, 모서리를 향해 돌려진 트레이 위 공간에 14 mm보다 가까이 오지 못한다.

**카메라.** 세 카메라 모두 InnoMaker U20CAM-1080P-S1 모듈을 모델로 한다. 광각 렌즈의 barrel distortion을 MuJoCo의 이상적 핀홀 렌더링으로 낼 수 없으므로, 더 넓은 핀홀 이미지를 렌더링한 뒤 `camera.py`의 렌즈 모델로 왜곡한다. MuJoCo 뷰어는 왜곡 없이 보여준다.

- 렌즈 모델은 보정(calibration)이 아니라 사용자 매뉴얼 v1.1에 근거한다. 매뉴얼 값은 2.8 mm 렌즈, 1/3″ 1920 × 1080 센서, 수평 화각 106°다.
- 그 초점 거리의 핀홀 렌즈는 약 86°만 담지만 equidistant fisheye 렌즈는 106°를 담으므로, `camera.py`는 왜곡 계수를 모두 0으로 둔 OpenCV fisheye 모델을 쓴다.
- 640 × 480 모드를 센서 중앙 4:3 영역의 축소로 보면 화각은 79.5° × 59.6°다.
- 매뉴얼은 일관되지 않다. 수평 103°, 대각 130°(이 모델은 122°), 규약을 밝히지 않은 TV distortion −17%도 함께 적혀 있다. 실제 수직 화각은 약 54°에서 66° 사이일 수 있다. 실제 카메라와 맞추려면 보정 후 `camera.py`의 `U20CAM`을 보정된 K와 D로 바꾼다.

**MuJoCo 뷰어.** `uv run python -m robogym.envs.so101_dual_arm`으로 서버 없이 장면을 연다. reset 직후 상태를 보여주며, Ctrl+L로 reset하고 Control 패널 슬라이더로 서보를 움직인다.

**파일 구성.**

| 파일 | 내용 |
|---|---|
| `env.py` | 서버가 서빙하는 환경 (스펙, action 검사, observation과 영상 렌더링) |
| `physics.py` | 시뮬레이션과 reset 시 무작위 배치 |
| `camera.py` | 렌즈 모델 |
| `__main__.py` | MuJoCo 뷰어 |
| `scene.xml` | 테이블, 블록, 트레이, 조명, 접힌 초기 자세 |
| `robot/so101_dual_arm.xml` | 장착 리그와 머리 위 카메라, 양팔 부착 |
| `robot/so101.xml` | 손목 카메라가 달린 팔 하나 |
| `robot/u20cam.xml` | 카메라 모듈 |
| `robot/assets/` | STL 메시 21개 |
| `Dockerfile`, `sandbox.toml` | Modal 샌드박스 이미지와 자원 |

**모델 크기와 GPU.** `physics.py`는 `scene.xml`에서 메시 파일을 바꾸지 않고 메모리 안에서 모델 두 개를 만든다. 시뮬레이션 프로세스는 그리기 전용 메시를 뺀 7 MB 모델을, 렌더러는 전체 장면을 받는다. 렌더러 모델에서는 팔 두 대와 카메라 세 대가 메시 사본을 공유해 MuJoCo 기본 적재 시 125 MB가 될 것을 65 MB로 줄인다. Modal 샌드박스는 T4 GPU를 쓴다. CPU 렌더링은 약 10배 느리고 시뮬레이션의 CPU 시간을 빼앗기 때문이다. GPU 샌드박스는 실시간 우선순위를 줄 수 없지만 렌더링이 GPU에 있으므로 시뮬레이션은 제때 실행된다.

**출처와 Menagerie 대비 변경.** 팔은 The Robot Studio의 오픈소스 SO-101이다. `robot/so101.xml`은 MuJoCo Menagerie `robotstudio_so101`(revision `822c2d8`)에서 가져왔고, Menagerie는 The Robot Studio의 SO101 MJCF에서 파생했다. 둘 다 Apache-2.0이다. body frame, 관절 한계, damping, friction loss, armature, actuator gain과 force range, 상완부터 그리퍼까지의 collision geometry, 그리퍼를 제외한 링크 관성은 그대로다. 변경 사항은 다음과 같다.

- 출력 부품 색을 노란색에서 흰색으로 바꿨다.
- 고정 jaw를 SO-ARM100 손목 카메라 마운트로 그리고, 10 g U20CAM 카메라(`robot/u20cam.xml`)를 box collision envelope와 함께 달았다.
- 그리퍼 링크 질량을 0.0939 kg(Menagerie 0.087 kg)으로 바꾸고 관성도 따로 정했다.
- `wrist_roll` 제어 범위를 관절 범위와 같은 ±2.74385 rad로 맞췄다 (Menagerie는 −2.74385에서 2.84121로 관절 한계를 넘는다).
- base와 shoulder에 메시에 맞춘 collision box를 달았다. Menagerie는 base에 없고 shoulder box 두 개가 브래킷과 서보를 최대 14 mm 덮지 못한다. base는 world에 용접되어 MuJoCo의 parent-child 필터가 적용되지 않으므로 `<contact><exclude>`로 base와 shoulder box를 떼어 둔다.
- 그리퍼 접촉에 `solref="0.006 1"`, `solimp="0.95 0.99 0.001"`을 쓴다 (Menagerie는 5 ms timestep이 허용하는 가장 단단한 `0.01 1`과 기본 `solimp`). 그리퍼 geom에 contact priority를 주어 모든 grasp에 이 값이 적용된다. 최대 grip에서 손끝이 블록에 파고드는 깊이가 2.5 mm에서 약 1 mm로 줄었다.
- Menagerie의 `<option>`, `<visual>`, 주석, 쓰지 않는 기본값과 메시를 제거했다. 시뮬레이션과 시각 옵션은 `scene.xml`이 정한다.

`robot/so101_dual_arm.xml`, `robot/u20cam.xml`, `scene.xml`은 이 프로젝트를 위해 작성했다. 블록과 트레이는 균일 밀도의 box다.

| 메시 | 출처 | 변경 |
|---|---|---|
| 출력 부품 10종, 서보 2종(`sts3215_03a_v1`, `sts3215_03a_no_horn_v1`), 그리퍼 collision 메시 3종 | Menagerie `robotstudio_so101/assets` (revision `822c2d8`) | 없음 |
| `arm_base`, `cam_mount_bottom`, `cam_mount_middle`, `cam_mount_top` | SO-ARM100 overhead camera mount (revision `7629d2a`) | 없음 |
| `wrist_cam_mount_32x32_uvc_module_so101` | SO-ARM100 wrist camera mount (revision `7629d2a`) | ASCII STL을 binary로 변환, 중복 삼각형 1,915개 제거 |
| `u20cam_1080p` | InnoMaker U20CAM-1080P 치수와 사진으로 직접 모델링 | 해당 없음 |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README는 성능 벤치마크나 에이전트 평가 결과를 싣지 않는다. 수치로 제시되는 것은 설계 파라미터와 환경 사양이다.

| 항목 | 값 |
|---|---|
| 시뮬레이션 프로세스 우선순위 | Linux `SCHED_FIFO` 1, macOS `THREAD_TIME_CONSTRAINT_POLICY` |
| 서버 프로세스 우선순위 하향 | `NICE` = 10 |
| 최대 허용 지연 `MAX_LAG` | 0.5초 (초과 시 구간 건너뜀) |
| 영상 | 1280 × 720, 30 FPS, CRF 23, keyframe 60프레임 간격, 브라우저 큐 상한 60프레임 |
| observation 이미지 | 640 × 480 JPEG 3장 |
| 통합 상태 크기 | `mjSTATE_INTEGRATION` 숫자 237개 |
| 시뮬레이션 모델 / 렌더 모델 | 7 MB / 65 MB (기본 적재 시 125 MB) |
| 도달 거리 | 블록 높이 0.436 m, 트레이 위 0.441 m |
| CPU 렌더링 대비 GPU | CPU가 약 10배 느림 |
| 샌드박스 자원 | vCPU 4, 메모리 8 GiB, T4 GPU, 무연결 30분 또는 2시간 후 자동 종료 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 환경이 so101_dual_arm 하나뿐이다. Isaac Sim처럼 별도 프로세스 시뮬레이터를 붙이는 경로는 설계로만 서술되고 구현 예시가 없다.
- 서버에 인증이 없다. 접근 가능한 누구나 시뮬레이션을 제어할 수 있다.
- 에이전트 예시, 학습 코드, 평가 지표, 성공 판정 기준이 README에 없다. 과제 목표(블록을 트레이에)는 장면 설명에서만 드러난다.
- 카메라 렌즈 모델은 보정이 아니라 일관되지 않은 매뉴얼에 근거해 실제 수직 화각과 54°에서 66° 범위 안에서 어긋날 수 있다.
- GPU 샌드박스는 gVisor 위에서 실행되어 실시간 우선순위를 받을 수 없다.
- 브라우저 영상은 HTTPS 또는 localhost에서만 재생된다.
- 수집 시점에 star 0의 초기 저장소로, 외부 사용 사례가 확인되지 않는다.

## 6. 관련 연구 (Related Work)

- **The Robot Studio SO-101 / SO-ARM100**: 사용된 오픈소스 팔 하드웨어.
- **MuJoCo Menagerie `robotstudio_so101`**: 팔 MJCF 모델의 직접 출처.
- **MuJoCo**: 물리 엔진과 렌더러.
- **Isaac Sim**: 별도 프로세스 시뮬레이터 연결 경로의 예로 언급됨.
- **Modal**: 클라우드 샌드박스 실행 기반.
- **InnoMaker U20CAM-1080P-S1**: 카메라 모델의 원형.

## 7. 용어집 (Glossary)

| 용어 | 설명 |
|---|---|
| `Env` | 서버가 환경과 통신하는 유일한 인터페이스. 메서드가 HTTP API와 대응한다 |
| `Physics` | Python에서 step 가능한 시뮬레이터가 구현하는 인터페이스 (`step`, `state`, `act`, `reset`) |
| `PhysicsProcess` | `Physics`를 별도 프로세스에서 실시간으로 실행하고 파이프로 명령을 중계하는 클래스 |
| `late_steps` | 한 timestep 넘게 늦게 실행된 step 수. `/status`가 보고한다 |
| `MAX_LAG` | 시뮬레이션이 실제 시계보다 이만큼(0.5초) 넘게 뒤처지면 따라잡지 않고 건너뛰는 한계 |
| `mjSTATE_INTEGRATION` | MuJoCo의 시뮬레이션 상태 스냅숏. 서버가 이 한 상태로 시간, 관절 각도, 이미지를 함께 만든다 |
| `NEAR` / `FAR` / `FRONT` | reset 시 물체 배치 범위를 정하는 세 상수 |
| Modal 샌드박스 | 환경을 공개 HTTPS URL로 띄우는 클라우드 실행 단위 |
