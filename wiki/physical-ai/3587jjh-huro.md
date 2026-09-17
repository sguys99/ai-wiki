---
title: "HuRo (3587jjh/HuRo, GitHub repo)"
type: repo
year: 2026
category: physical-ai
source: 3587jjh-huro.md
raw_path: raw/repos/3587jjh-huro.md
raw_filename: "3587jjh-huro.md"
source_collection: external
org: "3587jjh"
repo: "HuRo"
url: "https://github.com/3587jjh/HuRo"
license: "Apache-2.0 (저장소 LICENSE 파일 확인). 다만 README가 의존 구성 요소의 제약 때문에 상업적 실행은 불가하다고 명시한다"
tags: [physical-ai, vla, robot-dataset, teleoperation, simulator]
---

## 요약

HuRo 저장소는 논문의 robotization 파이프라인을 열 개 스크립트로 공개한 코드베이스다. 편집하지 않은 원본 에고센트릭 영상 디렉토리를 넣으면 LeRobot V2.0 데이터셋이 나온다. 그 사이에서 카메라 기하와 hand pose를 추정하고, manipulation 구간을 잘라 지시문(instruction)을 붙이고, 사람 팔을 지운 뒤 대상 로봇을 그 자리에 렌더한다.

공개 범위를 정확히 보면 데이터 생산 파이프라인만 들어 있다. VLA를 pre-training하는 코드, downstream fine-tuning 코드, 평가 코드는 포함되지 않고 HuRo dataset 자체도 공개 예정 상태다. 사람 영상에서 로봇 형식 데이터를 만드는 작업을 재현하거나 자기 로봇으로 옮기려는 쪽을 대상으로 한 저장소다.

## 배경

[[physical-ai/jeong-2026-huro-robotizing-human-videos]] 논문은 사람 영상을 로봇 형식으로 바꾼 데이터로 VLA를 pre-training하면 실제 manipulation 성능이 오른다는 것을 보였다. 논문이 쓴 데이터는 다섯 개 원천에서 만든 63만 개 episode, 1억 4,220만 장 규모다.

이 규모를 다시 만들려면 파이프라인 자체가 필요하다. 논문 부록 G가 절차를 서술하지만 droidcalib, HAWOR, DROID-SLAM, SAM2, ProPainter, PyRoKi, Isaac Sim 같은 기성 구성 요소를 어떤 순서로 어떤 형식으로 엮는지는 코드 없이 재현하기 어렵다. 이 저장소가 그 배선을 공개한다.

저장소를 읽을 때 염두에 둘 설계 결정이 하나 있다. 공개 코드는 원천 데이터셋이 제공하는 annotation을 읽지 않는다. EgoDex나 EgoVerse처럼 카메라 기하와 hand pose를 함께 배포하는 원천에서도 코드는 영상에서 직접 추정한다. 논문 본문이 말하는 "원천이 제공하는 것은 쓰고 없는 것만 추정한다"는 부분은 공개 코드에 들어 있지 않고, 사람이 중간 단계 출력을 형식에 맞춰 직접 채워 넣어야 한다.

## 핵심 개념

**구간(segment).** 파이프라인의 처리 단위다. 6단계가 영상에서 manipulation 구간을 잘라내고, 7단계부터는 영상이 아니라 구간 단위로 동작한다. 구간 하나에 지시문 하나가 붙고 최종적으로 LeRobot episode 하나가 된다.

**Parquet 테이블.** 2단계부터 9단계까지 각 단계가 자기 Parquet 테이블을 쓰며 모두 같은 스키마를 공유한다. 단계 사이의 전달이 이 테이블로 이뤄지므로, 중간 단계부터 실행하려면 이전 단계가 썼을 테이블을 같은 스키마로 만들어 두어야 한다.

**`.done` 표시.** 단계 완료를 알리는 표식 파일이다. 모든 단계가 재개 가능하도록 설계됐고, 재개 판단이 이 표식에 달려 있다. 표식 없이 출력만 채워 놓으면 해당 단계가 그 영상을 버려진 것으로 처리할 수 있다.

**`--part a/b`.** 한 단계의 작업을 b등분해 그중 a번째만 처리하는 분할 실행 플래그다. 모든 단계가 받는다. GPU 여러 장에 나눠 실행할 때 쓴다.

## 파이프라인 10단계

세 묶음으로 나뉜다. 1단계부터 7단계는 사람 영상만 다루고, 8단계와 9단계가 로봇을 도입하며, 10단계가 데이터셋을 쓴다.

| 단계 | 스크립트 | 사용 모델 | 출력 |
|---|---|---|---|
| 1 | stage1_annot_intrinsics.py | DroidCalib, 실패 시 AnyCalib | 영상 단위 JSON (fx, fy, cx, cy, xi, H, W, model) |
| 2 | stage2_annot_contact.py | 100DoH Faster R-CNN의 손 클래스만 | 프레임별 손 상자와 좌우 배정, 첫 Parquet 테이블 |
| 3 | stage3_annot_contact_refine.py | BoT-SORT 추적 | 추적 단위로 좌우 배정을 일관되게 정리한 결과 |
| 4 | stage4_annot_hand.py | HAWOR | 프레임별 3D 손 키포인트, MANO 회전, 손 마스크 |
| 5 | stage5_annot_extrinsics.py | DROID-SLAM, MoGe-2, GeoCalib | 프레임별 카메라 pose. 미터 단위 크기와 중력 기준이 적용된 4x4 카메라-세계 행렬 (OpenCV 규약) |
| 6 | stage6_annot_narr.py | ViTDet-H, Qwen3.5-9B | 구간별 왜곡 보정 영상과 language 지시문이 담긴 Parquet 테이블 |
| 7 | stage7_annot_inpaint.py | ViTDet-H, SAM 2, ProPainter | 구간별 팔 마스크와 inpainting 영상 |
| 8 | stage8_robot_retarget.py | PyRoKi IK (JAX) | 구간별 로봇 관절각과 손목 pose, 로봇 base 기준 카메라 pose, IK 진단값 |
| 9 | stage9_robot_overlay.py | Isaac Sim | 정리된 프레임 위에 로봇을 합성한 구간별 영상 |
| 10 | stage10_lerobot_convert.py | 없음 | 구간 하나가 episode 하나가 되는 LeRobot V2.0 데이터셋 |

단계 사이의 의존 관계는 두 곳에서 갈린다. 1단계가 추정한 intrinsic을 2단계부터 6단계가 써서 프레임을 핀홀 시점으로 왜곡 보정하므로 1단계 실패는 이후 전부를 막는다. 그리고 8단계부터 10단계만 대상 로봇에 의존하므로, 이미 annotation한 영상은 1단계부터 7단계를 다시 실행하지 않고 다른 로봇으로 변환할 수 있다.

6단계는 구간을 버리는 기준을 두 가지 갖는다. 영상에 사람이 셋 이상 검출되거나, 생성한 지시문이 검증에서 거부되면 그 구간을 메시지 없이 버린다. 사람이 여럿이면 어느 손이 촬영자의 것인지 판정하기 어렵기 때문이다.

하위 시스템은 네 디렉토리로 나뉜다.

| 디렉토리 | 담당 |
|---|---|
| pipeline/segmentation/ | 6단계와 7단계가 쓰는 ViTDet-H 사람 검출과 SAM 2 래퍼 |
| pipeline/captioning/ | 6단계 VLM 하위 시스템. captioning, 프롬프트, 캡션 검증, 거부 추적기 |
| pipeline/retargeting/ | 8단계 IK 하위 시스템. 2단계 solver와 순기구학 보조 함수 |
| pipeline/overlay/ | 9단계 Isaac Sim 렌더러와 URDF 임포트 |

## 실행

기본 실행은 스크립트 하나다.

```bash
./run_pipeline.sh
```

이 스크립트가 영상 디렉토리 전체에 대해 열 단계를 순서대로 실행한다. 설정은 파일 상단의 설정 블록에서 바꾼다. INPUT_DIR의 기본값은 `examples/clips/`이고 여기 들어 있는 예제 영상 두 개가 입력 요건을 이미 만족하므로, 별도 준비 없이 그대로 실행해 동작을 확인할 수 있다.

출력은 입력 디렉토리 옆에 접미사를 붙여 쓴다. `<clips>_intr`, `_contact`, `_contact_refined`, `_hand`, `_extr`, `_chunked`, `_lerobot` 일곱 개다. 접미사가 단계 묶음과 대응하므로 어느 단계까지 진행됐는지를 디렉토리만 보고 알 수 있다.

단계별 개별 실행도 가능하다.

```bash
CUDA_VISIBLE_DEVICES=<gpu> python pipeline/stage<N>_<phase>_<name>.py \
    --input_dir <clip-dir> --part <a>/<b> --no_tqdm
```

모든 단계가 `--input_dir`, `--part`, `--no_tqdm` 세 플래그를 받는다. retargeting, overlay, LeRobot 변환 세 단계는 `--robot_name`을 추가로 받으며 기본값은 `allex`(`configs/allex.yaml`)다.

## 입력 영상 요건

INPUT_DIR은 .mp4 파일이 든 디렉토리를 가리킨다. 파이프라인이 스스로 구간을 찾으므로 편집하지 않은 원본 영상을 그대로 넣어도 된다. 권장 길이는 30초에서 30분 사이다. 너무 짧으면 카메라 자기 보정에 쓸 움직임이 부족하고, 길면 CPU 메모리를 더 쓴다.

| 속성 | 요건 | 이유 |
|---|---|---|
| 시점 | 에고센트릭 | 파이프라인 전체가 에고센트릭 영상을 전제로 설계됐다 |
| 프레임률 | 30fps | 내부 파라미터가 이 속도를 가정한다 |
| 해상도 | 짧은 변 256픽셀 | 더 크게 넣어도 동작하지만 디코딩과 크기 조정 시간만 늘고 품질 이득이 뚜렷하지 않다 |

어안 영상과 직선 영상 모두 그대로 받는다. 카메라 보정에 실패한 영상은 오류 없이 버려지며, 빈 `<clips>_intr/<clip>.json`이 그 기록이 된다. 실패를 예외로 알리지 않는 설계라 대량 처리 시에는 이 JSON을 세어 보아야 한다.

README가 제시하는 변환 명령은 다음과 같다.

```bash
ffmpeg -i raw.mp4 -vf "fps=30,scale='if(gt(iw,ih),-2,256)':'if(gt(iw,ih),256,-2)'" \
    -c:v libx264 -crf 18 -an clips/raw_30fps_256.mp4
```

## 대상 로봇 교체

설정된 로봇은 Allex 하나뿐이다. 논문이 정성 결과로 보인 OpenArm, RBY1, GR1 설정은 저장소에 들어 있지 않다.

다른 로봇을 더하는 작업은 대부분 설정으로 끝난다. retargeting과 overlay가 YAML 파일 하나와 거기서 가리키는 URDF를 읽으므로 코드 변경이 필요 없다. retargeting 이전 단계의 annotation은 로봇에 의존하지 않으므로, 이미 만들어 둔 `<clips>_chunked` 트리를 다른 로봇으로 다시 변환할 수 있다. 논문이 측정한 바로는 대상별 재계산이 전체 처리 비용의 5%에서 11% 수준이다. 절차는 `configs/README.md`가 문서화한다.

## 데이터 형식

Parquet 테이블이 annotation을 담고 LeRobot V2.0 데이터셋이 robotization된 episode를 담는다. LeRobot episode에서는 overlay 영상이 observation, retargeting한 관절이 state와 action, 6단계 지시문이 language가 된다.

두 형식 각각에 리더 스크립트가 하나씩 있고, 각 스크립트가 자기 형식의 참조 구현이다.

```bash
python examples/read_parquet.py examples/clips_chunked
python examples/load_lerobot.py examples/clips_lerobot/allex/192x342
```

경로의 `192x342`는 출력 해상도다. 입력 요건인 짧은 변 256픽셀과 다른데, 렌더링과 변환을 거친 최종 observation 크기다.

## 실행 환경

| 항목 | 요건 |
|---|---|
| 운영체제 | Linux |
| GPU | NVIDIA, VRAM 24GB 이상 |
| 드라이버 | CUDA 12.8 지원 |
| 로봇 overlay 추가 요건 | RT 코어가 있는 GPU, R580보다 새롭지 않은 드라이버 |
| 기타 | git |

overlay 단계의 드라이버 상한은 Isaac Sim 의존에서 온다. 최신 드라이버를 쓰는 환경에서는 9단계만 별도 장비로 분리해야 할 수 있다. 설치와 기성 모델 내려받기 절차는 `setup/README.md`가 다룬다.

## 논문과의 대응

| 논문 | 저장소 |
|---|---|
| 3.1.1 human video annotation | 1단계부터 7단계 |
| 3.1.2 action conversion | 8단계 |
| 3.1.3 visual conversion | 7단계(사람 제거)와 9단계(로봇 합성) |
| 3.1.4 HuRo dataset | 10단계 LeRobot 변환 |
| 3.2 VLA policy 학습 | 공개되지 않음 |
| 4장 실험과 평가 | 공개되지 않음 |

논문 부록 G의 Algorithm 1이 스크립트 번호와 그대로 맞물린다. 다만 논문은 visual conversion을 하나의 단계로 서술하는 반면 저장소는 사람 제거(7단계)를 annotation 묶음에, 로봇 합성(9단계)을 로봇 묶음에 두어 나눈다. 사람 제거가 대상 로봇과 무관해 재사용할 수 있다는 점을 코드 구조에 반영한 배치다.

## 한계

| 항목 | 내용 |
|---|---|
| 공개 범위 | robotization 파이프라인만 공개했다. VLA pre-training과 fine-tuning 코드, 평가 코드는 없다 |
| 데이터셋 | HuRo dataset 자체는 공개 예정이며 Hugging Face 배지가 coming soon으로 표시된다 |
| 제공 annotation 미사용 | 원천 데이터셋의 annotation을 읽지 않는다. 중간 단계부터 시작하려면 이전 단계가 쓸 파일을 형식에 맞춰 직접 만들고 `.done` 표시까지 채워야 한다 |
| 로봇 지원 | Allex 하나만 설정돼 있다 |
| 상업적 사용 | Apache-2.0이지만 의존 구성 요소의 제약 때문에 상업적 실행이 금지된다 |
| 실행 환경 제약 | Linux와 NVIDIA GPU가 필요하고, overlay 단계는 RT 코어와 R580 이하 드라이버를 추가로 요구한다 |
| 처리 비용 | 논문 측정 기준 원본 영상 길이의 8배에서 10배가 걸린다. GPU 한 장으로 대규모 처리를 하기는 어렵다 |

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| robotization pipeline | 원본 에고센트릭 영상을 로봇 형식 episode로 바꾸는 10단계 처리 전체 |
| 구간 (segment) | 영상에서 잘라낸 manipulation 구간. 지시문 하나가 붙고 LeRobot episode 하나가 된다 |
| LeRobot V2.0 | 파이프라인 최종 출력 형식. overlay 영상이 observation, retargeting한 관절이 state와 action, 6단계 지시문이 language가 된다 |
| `.done` 표시 | 단계 완료 표식 파일. 없으면 해당 영상이 버려진 것으로 처리될 수 있다 |
| `--part a/b` | 한 단계의 작업을 b등분해 그중 a번째만 처리하는 분할 실행 플래그 |
| Allex | 저장소에 유일하게 설정된 대상 로봇. `configs/allex.yaml`과 거기서 가리키는 URDF로 정의된다 |

## 관련 페이지

- [[physical-ai/jeong-2026-huro-robotizing-human-videos]]: 이 저장소가 구현한 논문
- [[physical-ai/huggingface-lerobot]]: 10단계 출력 형식인 LeRobot 데이터셋의 원천 프로젝트
- [[physical-ai/ginwind-vla-jepa]]: 사람 영상을 VLA pre-training에 쓰는 다른 접근의 공개 저장소. VLA-JEPA 저장소는 학습 코드를 공개하고 HuRo는 데이터 생산 코드를 공개한다
- [[physical-ai/nvidia-isaac-gr00t]]: HuRo가 policy backbone으로 쓰는 GR00T 계열의 공개 저장소
- [[overviews/physical-ai-overview]]: physical-ai 도메인 허브
