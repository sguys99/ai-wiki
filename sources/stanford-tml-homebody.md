---
title: "HomeBody: A Humanoid That Explores, Remembers, and Acts on Its Own"
type: repo
year: 2026
category: physical-ai
raw_path: raw/repos/stanford-tml-homebody.md
raw_filename: "stanford-tml-homebody.md"
source_collection: external
org: "Stanford-TML"
repo: "homebody"
url: "https://github.com/Stanford-TML/homebody"
license: "Apache-2.0"
tags: [physical-ai, humanoid, manipulation, simulator]
---

## 한 줄 요약 (One-line Summary)

HomeBody의 공식 저장소다. 첫 공개분(SIM)은 VLM agent가 MuJoCo 안 real2sim 주방(SRC Kitchen)에서 Unitree G1을 스킬 하나씩 골라 조종하는 시뮬레이션 환경으로, navigate, pick, place 세 스킬과 Codex/Claude Code/API provider, 독립 physics 채점기, 실행 기록 도구를 담는다. Real2Sim 파이프라인과 실제 로봇 배치 코드는 이후 공개 예정이다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저장소 | https://github.com/Stanford-TML/homebody |
| 저자 | Gio Huh, Cayden Gu, Takara E. Truong, C. Karen Liu, Guy Tevet |
| 라이선스 | Apache-2.0 (서드파티 구성 요소는 각자 라이선스) |
| 생성과 갱신 | 생성 2026-09-26, 마지막 commit 2026-10-13 |
| 패키지 | `homebody` 0.1.0, Python 3.11 이상, 설명 "An open-source agentic framework for vision-language models to control humanoid robots on long-horizon tasks" |
| 주요 의존성 | numpy, scipy, mujoco 3.11.0, torch 2.4 이상, pillow, trimesh, viser, imageio-ffmpeg |
| 수집 범위 | README, CLAUDE.md, VLM 지시문, Robot 프로토콜, 스킬 계약과 레지스트리, 기본 설정, 시뮬레이션 설정, wave 설정 3종, real backend placeholder, pyproject.toml, NOTICE, THIRD_PARTY_NOTICES, LICENSE, 파일 트리, 세 스킬 모듈의 선언부 발췌 |
| 대응 자료 | `sources/huh-2026-homebody-a-humanoid-that-explores.md` (프로젝트 페이지) |

`docs/` 폴더가 프로젝트 웹사이트 자체이며, 페이지의 도식과 영상 원본(`docs/figures/`, `docs/videos/`)이 이 폴더에 들어 있다.

## 2. 주요 기여 (Key Contributions)

### 2.1 공개 일정

| 목표일 | 공개분 | 범위 | 상태 |
|---|---|---|---|
| 2026-10-05 | SIM | navigate와 pick-and-place를 갖춘 시뮬레이션 환경 | 공개 |
| 2026-10-16 | REAL2SIM | 탐색과 장면 재구성 파이프라인 | 예정 |
| 2026-10-23 | REAL | 실세계 배치 코드와 설정 안내 | 예정 |

### 2.2 SIM 공개분이 제공하는 것

- MuJoCo로 시뮬레이션한 Unitree G1(29 자유도, Dex3 손)과 걷기 policy, 팔, 손, 모든 물체의 물리.
- 실제 SRC Kitchen을 스캔해 만든 real2sim 주방 `src_kitchen`(커피 봉지 2개, 우유갑 2개). 다른 환경은 추후 추가 예정이다.
- VLM agent가 로봇 카메라, 지도, 장면 메모리로 결정하며 스킬을 하나씩 실행하는 결정 루프.
- 실행마다 `runs/session-<time>-<id>/`에 저장되는 기록과 분석 도구(timeline, score_session, compose_cockpit).
- 스킬, 모델, 장면, 로봇 backend를 각각 한 곳만 고쳐 추가하는 확장 구조.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 디렉터리 구성

| 경로 | 내용 |
|---|---|
| `src/homebody/skills/` | 스킬 모듈(`navigate.py`, `pick.py`, `place.py`). 각 모듈이 prompt 한 줄, 인자, `prepare`/`execute`/`abort`, 실패 코드를 선언하고 `registry.py`가 목록을 관리한다 |
| `src/homebody/motion/` | 공유 로봇 동작. `arm.py`(servo, 관절 stream, 유일한 팔 복귀 함수 `reset_arm`), `carry.py`(들기, 접어 넣기, 복구) |
| `src/homebody/helpers/` | 순수 수학: geometry, kinematics, collision, grasp, navigation, trajectory |
| `src/homebody/primitives/` | 로봇 인터페이스 `Robot`, observation 기록, action 한계, `NotReleased` |
| `src/homebody/backends/` | `mujoco.py`가 물리로 `Robot`을 구현하고 `real.py`는 실제 G1용 빈 placeholder다 |
| `src/homebody/vlm/` | provider(Codex, Claude Code, API 2종), `catalog.py`, `agent_prompt.md`, 매 turn 모델이 보는 내용(`observations.py`) |
| `src/homebody/session/` | 결정 루프, 설정, 기록 |
| `src/homebody/ui/` | viser 기반 실시간 콘솔 |
| `src/homebody/real2sim/` | 스캔 파이프라인 단계(explore, capture, reconstruct, package, validate). 아직 미구현 |
| `assets/` | 로봇 모델과 보정값, 걷기 policy 가중치, SRC Kitchen 장면 패키지, 해시 manifest |
| `evaluation/evaluate.py` | 실행 후 기록된 물리만 읽는 독립 채점기 |
| `tools/` | 스크립트 검사, wave 실행, 채점, timeline, cockpit 재생, 장면 빌드 |
| `vendor/holosoma_inference/` | Holosoma에서 파생한 걷기 policy 커널 |
| `hardware/g1_iphone_mount.stl` | G1에 iPhone을 다는 거치대 형상 |

### 3.2 설계 규칙 (CLAUDE.md)

1. 스킬은 `Robot`을 통해서만 로봇에 닿는다. 스킬은 시뮬레이터를 import하지 않으므로 실제 backend에서도 스킬을 고치지 않고 동작해야 한다.
2. 모델은 지시문과 영상만 받는다. 실시간 물체 자세, 시뮬레이터 상태, 채점기 목표값은 프롬프트에도 스킬에도 들어가지 않는다. 스캔 라벨, anchor, 스캔 자체의 판단은 모든 entity에 똑같이 초기 장면 메모리로 들어간다.
3. 프롬프트는 일반적이다. 스킬 prompt 줄은 이 주방이나 과제가 아니라 로봇을 설명하며, 장면 명사나 특정 benchmark용 힌트를 넣지 않는다.
4. 확장 지점은 각각 한 곳이다. 스킬은 모듈 하나와 `SKILLS` 등록, provider는 클래스 하나와 `PROVIDERS`, `MODELS` 등록, 장면은 `assets/real2sim/` 아래 폴더 하나, backend는 `Robot` 구현이다.
5. 팔 복귀는 하나다. 모든 휴지 자세 복귀는 `motion/arm.reset_arm`을 거치며 두 팔이 y 대칭으로 같다.

### 3.3 Robot 프로토콜

`Robot`은 epoch, 시계, frame, 측정값, 다섯 명령으로 이뤄진다. 모든 명령은 epoch를 명시하고, 거부된 명령은 `ActionRejected`, reset 없이 계속할 수 없는 상태는 `PhysicsInvalid`를 낸다.

| 멤버 | 역할 |
|---|---|
| `epoch` | 명령 세대. reset이 새 세대를 열고 이전 명령을 거부한다 |
| `time` | 각 Frame에 찍히는 시계(초) |
| `snapshot()` | 최신 동기화 frame |
| `measure()` | 카메라 렌더 없이 최신 관절, 손, 자세 |
| `base_velocity()` | body 좌표계 m/s와 rad/s. `physics.command_timeout` 안에 갱신하지 않으면 무시된다 |
| `arm_target()` | 한 팔의 관절 7개 위치(라디안). 로봇이 속도와 범위를 제한한다 |
| `grip()` | 한 손의 닫힘 정도. 0은 열림, 1은 보정된 닫힘, `grasp.squeeze`만큼 더 쥘 수 있다 |
| `advance()` | 현재 명령 아래에서 지정 시간만큼 진행(제어 주기 단위, 최대 1초) |
| `stop()` | base를 멈추고 두 팔을 유지한다. 손 닫힘은 그대로 둔다 |

실제 하드웨어 backend는 여기에 캡처 타임스탬프(frame의 영상, depth, 관절, 자세를 함께 캡처해 그 시점으로 기록하고 `advance`가 실제 시간으로 기다림), 명령이 끊기면 base를 멈추는 deadman, 한 번에 한 지휘자(operator stop이 새 epoch를 열어 이전 명령 거부), 보정값(팔 한계, jaw 샘플, 카메라 intrinsic과 extrinsic)을 더해야 한다. `__main__.py`가 `MujocoBackend`를 직접 생성하고 session이 채점기용 시뮬레이터 전용 상태를 기록하므로, 실제 backend를 붙이려면 이 둘을 먼저 선택 사항으로 바꿔야 한다.

### 3.4 스킬 계약

스킬 모듈은 `NEEDS`, `FAILURES`, `PROMPT`, `prepare`, `execute`를 선언하고 `abort`는 선택이다. `declared()`가 등록 시 다음을 검사한다.

- `NEEDS`는 `Robot` 명령 이름의 tuple이어야 한다.
- `FAILURES`는 결과 코드 tuple이어야 한다.
- `PROMPT`는 `"{스킬 이름}: "`으로 시작해야 한다.

`prepare(arguments, selected, current, planning)`는 카메라 frame 하나로 계획하고, `execute(plan, ctx)`는 계획을 실행해 `Result(skill, code, message, details)`를 돌려준다. `code`가 `OK`면 성공이다. `Context`는 실행이 로봇에 닿는 유일한 손잡이로, 매 단계 epoch와 취소를 검사해 `CANCELLED`, `STALE_EPOCH`를 내고, 오래된 센서 값(기본 0.25초 초과)은 `STALE_OBSERVATION`으로 막는다. 모든 스킬 공통 실패 코드는 `CANCELLED`, `STALE_EPOCH`, `STALE_OBSERVATION`, `INVALID_ARGUMENT`, `TARGET_LOST`, `ACTION_REJECTED`, `PHYSICS_INVALID`, `COLLISION` 8개다.

### 3.5 세 스킬의 인자와 실패 코드

| 스킬 | 인자 | 동작 | 고유 실패 코드 |
|---|---|---|---|
| navigate | `goal_map_1000`, `facing_map_1000`(영상 3 지도 위 [x, y]) 또는 `goal_xy_m`, `facing_xy_m`(world 좌표), `snap`, `hand` | 정적 지도에서 stance까지 경로를 짜고 localization 자세로 도착을 검증한다. snap이 켜져 있으면 지도 가장자리에 직각으로, 바라볼 점에서 `stance_reach` 이상 떨어져 선다 | `NO_ROUTE`, `STALL`, `TIMEOUT`, `ARRIVAL_NOT_VERIFIED`, `CARRY_CLEARED`, `HOLD_UNCERTAIN` |
| pick | `point_normalized_1000`(영상 1의 물체 몸통 중앙 픽셀), `hand`(기본 right) | 필요하면 grasp stance로 걸어가 보이는 depth로 grasp를 계획하고 접근, 닫기, 들기, 쥠 검증 후 몸 앞 carry 자세로 접는다 | `HAND_OCCUPIED`, `CALIBRATION_MISSING`, `NO_GRASP`, `UNREACHABLE`, `TARGET_MOVED`, `ARM_NOT_REACHED`, `LIFT_NOT_VERIFIED`와 복구 실패, navigate 실패 |
| place | `hand`와 목적지 하나: `release_point_1000`(영상 4) 또는 `x_ahead_m`, `y_left_m`(torso 좌표계)와 `delta_z_m`, 또는 `point_normalized_1000`(영상 1의 지지면 픽셀)과 `release_height_m` | 지지면이나 torso XY에 물체 중심을 놓고 결과를 관찰로 검증한다. 다른 물체 위면 쌓이고 가장자리 근처면 떨어질 수 있다 | `NOT_HOLDING`, `SURFACE_CHANGED`, `ARM_NOT_REACHED`, `RELEASE_NOT_VERIFIED`, `OUTCOME_UNKNOWN`, `PLACEMENT_NOT_VERIFIED`와 복구 실패 |

프로젝트 페이지가 보인 open drawer와 pick from drawer는 SIM 공개분의 `SKILLS`(`navigate`, `pick`, `place`)에 없다.

### 3.6 VLM이 받는 입력과 출력 형식

`agent_prompt.md`는 모델이 지시문과 첨부 영상 4장만으로 결정하도록 지시한다.

1. head camera RGB 영상
2. depth 미리보기(흰색이 가깝고 검은색이 멀거나 depth 없음)
3. 고정 장애물 정적 지도(어두운 곳이 막힘, 밝은 곳이 빈 바닥, 파란색이 로봇과 방향)
4. 현재 시점 depth를 위에서 torso 좌표계로 투영한 영상(x 앞, y 왼쪽, m 단위, 흰색은 비관찰 영역이며 빈 공간이 아님)

클릭은 영상 왼쪽 위 [0, 0]에서 오른쪽 아래 [1000, 1000]까지의 좌표이며 영상 1과 4의 클릭은 그 turn의 시점에서만 유효하다. observation은 base 자세 [x, y, yaw]와 `map_click_from_world` 변환을 준다. 초기 장면 메모리는 스캔 시점의 환경 설명일 뿐 실시간 재고가 아니므로, 지도 anchor는 스캔이 본 위치이고 옮길 수 있는 물체는 이동했을 수 있다. 모델은 스킬 결과와 현재 시점으로 믿음을 갱신해야 한다. 스킬은 OK나 거부 코드와 메시지로 끝나며 거부는 정상이다. `done`은 summary를 받아 과제를 끝내며, 완료했거나 완료할 수 없을 때 고르고 어느 쪽인지 summary에 적는다. 응답은 `text`(이번 결정을 정한 관찰 한 문장), `skill`, `arguments_json`을 담은 JSON 객체 하나다.

### 3.7 모델과 provider

`--model`로 고르며 기본값은 `astra`다. 각 모델은 CLI 로그인으로 실행되고, `-api` 접미사는 API key로 실행된다.

| 이름 | provider(CLI / API) | 모델 ID |
|---|---|---|
| astra | codex / openai-api | gpt-6-astra |
| sol | codex / openai-api | gpt-5.6-sol |
| luna | codex / openai-api | gpt-5.6-luna |
| terra | codex / openai-api | gpt-5.6-terra |
| opus | claude-code / claude-api | claude-opus-5-5 |
| fable | claude-code / claude-api | claude-fable-5-1 |
| sonnet | claude-code / claude-api | claude-sonnet-5-5 |
| haiku | claude-code / claude-api | claude-haiku-4-5-20251001 |

검증된 모델은 `astra`와 `opus`뿐이며, README는 작은 모델일수록 더 자주 실패한다고 적는다. 새 provider는 `src/homebody/vlm/`의 클래스 하나(`LABEL`, `EXECUTABLE` 또는 `KEY`, `Decision`을 돌려주는 `generate`)와 `vlm/catalog.py`의 `PROVIDERS` 등록으로 더한다.

### 3.8 주요 기본 설정 (session/config.py)

| 묶음 | 값 |
|---|---|
| Physics | timestep 0.001초, control 250Hz, policy 50Hz, command_timeout 0.20초, 기울기 한계 45도 |
| Camera | 640×480, 수평 FOV 69도, near 0.02m, far 15m |
| Servo | tick 0.04초, perception 주기 0.20초, 최대 선속도 0.08m/s |
| Agent | 기본 모델 astra, 결정 timeout 180초, busy 재시도 3회, 최대 80 step, done 후 3초 대기 |
| Navigate | 주행 0.35m/s, 회전 0.45rad/s, 물체를 들었을 때 0.25m/s와 0.30rad/s, 로봇 반경 0.28m, 도착 거리 0.10m, 주행 timeout 90초, 정지 판정 6초 |
| Grasp | 접근 높이 0.10m, 들기 높이 0.18m, 삽입 깊이 배율 1.0, 0.65, 0.3 |

`configs/simulation.toml`은 시뮬레이터 쪽 값을 덮어쓴다. 예를 들어 MuJoCo에서는 팔 trajectory 속도를 1.0으로 올리고, 로봇 반경을 0.20m로 줄이며, 렌더 depth에 잡음이 없으므로 충돌 cloud 여유를 5mm로 둔다. 장면 폴더의 `settings.toml`과 `--settings`가 그 위를 다시 덮는다.

### 3.9 장면 패키지

장면은 `assets/real2sim/` 아래 폴더 하나이며 `--env <folder>`로 실행한다. 필요한 파일은 `scene.xml`(MuJoCo), `task_scene.json`(로봇 시작 위치와 움직일 수 있는 물체), `map.npz`(navigation 지도), `physics.json`, `semantics.json`(모델에 주는 라벨과 설명), 선택적 `settings.toml`이다. `src_kitchen`에는 이 밖에 `kitchen_semantic.glb`와 메시 파일 약 100개가 있고 `tools/verify_assets.py`가 manifest 해시로 파일을 검사한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

저장소는 정량 표를 싣지 않고 평가 방법과 정성 결과만 적는다.

- 모델 동작은 단일 실행이 아니라 `tools/run_wave.py`로 반복한 세션의 비율로 측정한다(CLAUDE.md).
- `configs/waves/default.json`은 기본 과제 4종이다. 커피 봉지를 아일랜드에, 우유갑을 파란 통에 넣는 과제와 그 바꿔 말한 버전, 목적지를 서로 바꾼 버전 2종이다.
- `configs/waves/fun.json`의 9개 과제는 README가 "Things to try"로 소개하며, 모델당 2회씩 두 모델 모두 매번 성공했다고 적는다. 지시 해석 예: "The juice is for whoever sits at the round table nearest the recycling bin. Take it to them."(사람 위치 추론), "If the orange juice is next to the toaster, move it to the island; otherwise throw it away."(조건 분기), "Show the red and white carton to someone at the island, then put it back where it was."(원래 위치 기억).
- `configs/waves/other_tasks.json`은 4개 과제이며 마지막 과제는 `--place-object`로 물체를 미리 옮겨 둔다.
- 잘못된 메모리 시험: 실행 전에 물체를 옮기면 스캔은 여전히 원래 위치를 알려 주므로 모델이 이를 알아채고 찾아야 한다. README는 이 시험이 가장 어렵고 수 분씩 탐색한다고 적으며, 최근 실행에서 Opus가 두 번 모두 우유갑을 찾았고 한 번은 29분이 걸렸다고 보고한다.
- 스크립트 검사: `tools/check_manipulation.py --sequence configs/continuous_four.json --no-visuals`가 모델 없이 물체 4개를 한 번에 옮기고 `tools/score_session.py`가 채점한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- REAL2SIM과 REAL 공개분은 "Coming soon"이다. `backends/real.py`와 `real2sim/` 단계는 모두 `NotReleased`를 낸다.
- SIM 환경은 `src_kitchen` 하나뿐이다.
- 스킬은 navigate, pick, place 셋이고, 프로젝트 페이지의 open drawer와 pick from drawer는 포함되지 않았다.
- 콘솔에 로그인이 없으므로 신뢰할 수 있는 네트워크가 아니면 `--host`를 localhost로 둔다.
- AMO 가중치는 upstream이 연구용으로만 배포한다(THIRD_PARTY_NOTICES). 해시 검사는 재배포 권리를 보장하지 않는다.
- README는 스킬, grasp planner, 프롬프트가 개선 여지가 많은 baseline이라고 밝히고 기여를 받는다.

## 6. 관련 연구 (Related Work)

| 구성 요소 | 출처 | 라이선스 |
|---|---|---|
| G1 걷기 controller 커널 | Amazon FAR Holosoma 파생, AMO/Holosoma adapter, OpenTeleVision/AMO와 Psi0의 observation 계산 | Apache-2.0 |
| AMO 걷기 policy 가중치 | OpenTeleVision/AMO와 바이트 단위로 동일 | Apache-2.0, 연구용 배포 |
| Unitree G1 로봇 설명(29 자유도, Dex3 손) | Unitree G1 모델 | BSD-3-Clause |
| MuJoCo | 의존 패키지 | Apache-2.0 |
| 웹사이트 자산 | Three.js, HLS.js, DM Sans, provider 아이콘 | MIT, Apache-2.0, SIL OFL 1.1 |

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| SIM / REAL2SIM / REAL | 저장소 공개 단위. 시뮬레이션 환경, 탐색과 재구성 파이프라인, 실세계 배치 코드 |
| `Robot` 프로토콜 | 스킬이 로봇에 닿는 유일한 인터페이스. epoch, 시계, frame, 측정값, 다섯 명령 |
| epoch | 명령 세대 번호. reset이나 operator stop이 새 epoch를 열고 이전 epoch의 명령을 거부한다 |
| 초기 장면 메모리 | 스캔 라벨, anchor, 스캔의 판단을 모델에 주는 기억. 실시간 재고가 아니다 |
| wave | 같은 과제 묶음을 여러 번 반복 실행해 성공 비율을 재는 단위 |
| cockpit | 실행 기록으로 합성한 재생 영상 `cockpit.mp4` |
| deadman | 명령이 끊기면 base를 멈추는 안전 장치 |

## 8. 그림 후보 (Figure Candidates)

README 상단 그림 `docs/figures/overview-full.webp`는 프로젝트 페이지의 개요 도식과 같은 그림이며, 페이지 쪽 수집본(`raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/fig25.webp`)으로 대신한다. 저장소 쪽에는 그림을 따로 수집하지 않았다.
