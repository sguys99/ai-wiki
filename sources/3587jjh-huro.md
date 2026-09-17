---
title: "HuRo (3587jjh/HuRo, GitHub repo)"
type: repo
year: 2026
category: physical-ai
raw_path: raw/repos/3587jjh-huro.md
raw_filename: "3587jjh-huro.md"
source_collection: external
org: "3587jjh"
repo: "HuRo"
url: "https://github.com/3587jjh/HuRo"
license: "Apache-2.0 (저장소 LICENSE 파일 확인). 다만 README가 의존 구성 요소의 제약 때문에 상업적 실행은 불가하다고 명시한다"
tags: [physical-ai, vla, robot-dataset, teleoperation, simulator]
figures:
  - id: fig01
    file: assets/3587jjh-huro/teaser.png
    raw: https://raw.githubusercontent.com/3587jjh/HuRo/main/docs/teaser.png
    caption: "README 상단의 HuRo 개요 이미지. 저장소 docs/teaser.png를 in-place 참조한다"
    strategy: manual
    curated: false
  - id: fig02
    file: assets/3587jjh-huro/pipeline_example.jpg
    raw: https://raw.githubusercontent.com/3587jjh/HuRo/main/docs/pipeline_example.jpg
    caption: "원본 에고센트릭 영상, 팔을 지운 프레임, 그 자리에 로봇을 렌더한 프레임을 나란히 둔 예시. 저장소 docs/pipeline_example.jpg를 in-place 참조한다"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

HuRo 논문의 공식 코드 저장소로, 원본 에고센트릭 영상을 LeRobot V2.0 데이터셋으로 바꾸는 robotization 파이프라인 10단계를 공개하며, 실행 스크립트 하나와 단계별 개별 실행 경로, 입력 영상 요건, 대상 로봇 교체 절차, Parquet과 LeRobot 두 형식의 리더 스크립트를 담고 있다. 학습이나 평가 코드가 아니라 데이터 생산 파이프라인만 공개한 저장소다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저장소 | https://github.com/3587jjh/HuRo |
| 설명 | HuRo: Robotizing Human Videos for Scalable VLA Pretraining (CoRL 2026) |
| 기본 브랜치 | main |
| 라이선스 | Apache-2.0. 의존 구성 요소 제약으로 상업적 실행은 금지된다고 README가 경고한다 |
| topics | egocentric-video, motion-retargeting, robot-learning, robotization, vision-language-action, vla |
| 생성 | 2026년 9월 12일 |
| 최종 push | 2026년 9월 16일 (수집 시점 star 25) |
| 공개 이력 | 프로젝트 페이지 2026년 9월 9일, arXiv 2026년 9월 10일, 코드 2026년 9월 11일 |
| 최상위 구성 | README.md, LICENSE, THIRD_PARTY_NOTICES.md, run_pipeline.sh, common/, configs/, docs/, examples/, pipeline/, setup/, submodules/, submodules_patches/ |
| 논문 | [[physical-ai/jeong-2026-huro-robotizing-human-videos]] (arXiv 2609.10706) |
| 데이터셋 | 공개 예정 |

## 2. 주요 기여 (Key Contributions)

1. **논문 파이프라인의 실행 가능한 공개.** 논문 3절과 부록 G가 서술한 세 단계를 열 개 스크립트로 나눠 공개했다. 원본 영상 디렉토리를 입력으로 받아 LeRobot V2.0 데이터셋까지 한 번에 만든다.
2. **annotation을 제공하지 않는 원천에 맞춘 기본 경로.** 공개 코드는 원천 데이터셋이 제공하는 annotation을 읽지 않고 카메라 기하, hand pose, 언어를 영상에서 직접 추정한다. 제공 annotation을 쓰려면 이전 단계의 출력 형식을 사람이 직접 채워 넣어야 한다.
3. **대상 로봇 교체 경로의 분리.** 1단계부터 7단계까지는 로봇과 무관하므로, 이미 annotation한 영상을 다른 로봇으로 다시 robotization할 때는 8단계부터 10단계만 다시 실행한다.
4. **두 출력 형식의 참조 구현.** Parquet 테이블과 LeRobot 데이터셋 각각에 리더 스크립트를 하나씩 두어 형식의 기준 구현으로 삼았다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 10단계 구성

파이프라인은 세 묶음으로 나뉜다. 1단계부터 7단계는 사람 영상만 다루고, 8단계와 9단계가 로봇을 도입하며, 10단계가 데이터셋을 쓴다. 7단계부터는 영상 단위가 아니라 구간 단위로 동작한다.

| 단계 | 스크립트 | 사용 모델 | 출력 |
|---|---|---|---|
| 1 | stage1_annot_intrinsics.py | DroidCalib, 실패 시 AnyCalib | 영상 단위 JSON (fx, fy, cx, cy, xi, H, W, model) |
| 2 | stage2_annot_contact.py | 100DoH Faster R-CNN의 손 클래스만 | 프레임별 손 상자와 좌우 배정, 첫 Parquet 테이블 |
| 3 | stage3_annot_contact_refine.py | BoT-SORT 추적 | 추적 단위로 좌우 배정을 일관되게 정리한 결과 |
| 4 | stage4_annot_hand.py | HAWOR | 프레임별 3D 손 키포인트, MANO 회전, 손 마스크 |
| 5 | stage5_annot_extrinsics.py | DROID-SLAM, MoGe-2, GeoCalib | 프레임별 카메라 pose. 미터 단위 크기와 중력 기준이 적용된 4x4 카메라-세계 행렬 (OpenCV 규약) |
| 6 | stage6_annot_narr.py | ViTDet-H, Qwen3.5-9B | 구간별 왜곡 보정 영상과 language 지시문(instruction)이 담긴 Parquet 테이블 |
| 7 | stage7_annot_inpaint.py | ViTDet-H, SAM 2, ProPainter | 구간별 팔 마스크와 inpainting 영상 |
| 8 | stage8_robot_retarget.py | PyRoKi IK (JAX) | 구간별 로봇 관절각과 손목 pose, 로봇 base 기준 카메라 pose, IK 진단값 |
| 9 | stage9_robot_overlay.py | Isaac Sim | 정리된 프레임 위에 로봇을 합성한 구간별 영상 |
| 10 | stage10_lerobot_convert.py | 없음 | 구간 하나가 episode 하나가 되는 LeRobot V2.0 데이터셋 |

1단계가 추정한 intrinsic을 2단계부터 6단계가 써서 프레임을 핀홀 시점으로 왜곡 보정한다. 6단계는 영상에서 manipulation 구간을 잘라내고 구간마다 VLM으로 지시문 하나를 만든다. 사람이 셋 이상 검출되거나 생성한 지시문이 검증에서 거부되면 그 구간은 메시지 없이 버린다. 2단계부터 9단계는 각자 Parquet 테이블을 쓰며 모두 같은 스키마를 공유한다.

하위 시스템은 네 디렉토리로 나뉜다.

| 디렉토리 | 담당 |
|---|---|
| pipeline/segmentation/ | 6단계와 7단계가 쓰는 ViTDet-H 사람 검출과 SAM 2 래퍼 |
| pipeline/captioning/ | 6단계 VLM 하위 시스템. captioning, 프롬프트, 캡션 검증, 거부 추적기 |
| pipeline/retargeting/ | 8단계 IK 하위 시스템. 2단계 solver와 순기구학 보조 함수 |
| pipeline/overlay/ | 9단계 Isaac Sim 렌더러와 URDF 임포트 |

### 3.2 실행 방식

기본 실행은 스크립트 하나다.

```bash
./run_pipeline.sh
```

이 스크립트가 영상 디렉토리 전체에 대해 열 단계를 순서대로 실행한다. 설정은 파일 상단의 설정 블록에서 바꾼다. INPUT_DIR의 기본값은 examples/clips/이고, 여기 들어 있는 예제 영상 두 개가 입력 요건을 이미 만족하므로 추가 준비 없이 그대로 실행된다. 모든 단계는 재개할 수 있다.

출력은 입력 디렉토리 옆에 접미사를 붙여 쓴다. `<clips>_intr`, `_contact`, `_contact_refined`, `_hand`, `_extr`, `_chunked`, `_lerobot` 일곱 개다.

단계별 개별 실행도 가능하다.

```bash
CUDA_VISIBLE_DEVICES=<gpu> python pipeline/stage<N>_<phase>_<name>.py \
    --input_dir <clip-dir> --part <a>/<b> --no_tqdm
```

모든 단계가 `--input_dir`, `--part`, `--no_tqdm` 세 플래그를 받는다. `--part`는 작업을 나눠 병렬 실행하기 위한 분할 지정이다. retargeting, overlay, LeRobot 변환 세 단계는 `--robot_name`을 추가로 받으며 기본값은 allex(configs/allex.yaml)다.

### 3.3 입력 영상 요건

INPUT_DIR은 .mp4 파일이 든 디렉토리를 가리킨다. 파이프라인이 스스로 구간을 찾으므로 편집하지 않은 원본 영상을 그대로 넣어도 된다. 권장 길이는 30초에서 30분 사이다. 너무 짧으면 보정에 쓸 카메라 움직임이 부족하고, 길면 CPU 메모리를 더 쓴다.

| 속성 | 요건 | 이유 |
|---|---|---|
| 시점 | 에고센트릭 | 파이프라인 전체가 에고센트릭 영상을 전제로 설계됐다 |
| 프레임률 | 30fps | 내부 파라미터가 이 속도를 가정한다 |
| 해상도 | 짧은 변 256픽셀 | 더 크게 넣어도 동작하지만 디코딩과 크기 조정 시간만 늘고 품질 이득이 뚜렷하지 않다 |

어안 영상과 직선 영상 모두 그대로 받는다. 카메라 보정에 실패한 영상은 오류 없이 버려지며 빈 `<clips>_intr/<clip>.json`이 그 기록이 된다. 변환 명령은 README가 ffmpeg 한 줄로 제시한다.

```bash
ffmpeg -i raw.mp4 -vf "fps=30,scale='if(gt(iw,ih),-2,256)':'if(gt(iw,ih),256,-2)'" \
    -c:v libx264 -crf 18 -an clips/raw_30fps_256.mp4
```

### 3.4 대상 로봇 교체

설정된 로봇은 Allex 하나뿐이다. 다른 로봇을 더하는 작업은 대부분 설정으로 끝난다. retargeting과 overlay가 YAML 파일 하나와 거기서 가리키는 URDF를 읽으므로 코드 변경이 필요 없다. retargeting 이전 단계의 annotation은 로봇에 의존하지 않으므로 이미 만들어 둔 `<clips>_chunked` 트리를 다른 로봇으로 다시 변환할 수 있다. 절차는 configs/README.md가 문서화한다.

### 3.5 데이터 형식

Parquet 테이블이 annotation을 담고 LeRobot V2.0 데이터셋이 robotization된 episode를 담는다. 두 형식 각각에 리더 스크립트가 하나씩 있고, 각 스크립트가 자기 형식의 참조 구현이다.

```bash
python examples/read_parquet.py examples/clips_chunked
python examples/load_lerobot.py examples/clips_lerobot/allex/192x342
```

### 3.6 실행 환경

| 항목 | 요건 |
|---|---|
| 운영체제 | Linux |
| GPU | NVIDIA, VRAM 24GB 이상 |
| 드라이버 | CUDA 12.8 지원 |
| 로봇 overlay 추가 요건 | RT 코어가 있는 GPU, R580보다 새롭지 않은 드라이버 |
| 기타 | git |

설치와 사용하는 기성 모델의 내려받기 절차는 setup/README.md가 다룬다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

저장소 자체는 성능 수치를 싣지 않고 논문으로 넘긴다. README 상단 요약이 인용하는 수치는 논문 결과와 같다.

| 항목 | 값 |
|---|---|
| HuRo dataset 규모 | 약 63만 개 episode, 1억 4,200만 장 프레임, 다섯 개 사람 영상 원천 |
| 실제 manipulation 네 과제 전체 completion | fine-tuning 이후 51.5%에서 80.3% |
| 공간과 시각 변화를 준 OOD completion | 34.9%에서 72.2% |

논문의 처리 비용 측정과 비교하면, 저장소가 요구하는 GPU 한 장 구성은 논문 부록 F의 RTX 5090 단일 GPU 측정 조건과 같은 규모다. 논문 기준 처리 시간은 원본 영상 길이의 8배에서 10배다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

| 항목 | 내용 |
|---|---|
| 공개 범위 | robotization 파이프라인만 공개했다. VLA pre-training과 fine-tuning 코드, 평가 코드는 포함되지 않는다 |
| 데이터셋 | HuRo dataset 자체는 공개 예정 상태이며 Hugging Face 배지가 coming soon으로 표시된다 |
| 제공 annotation 미사용 | 공개 코드는 원천 데이터셋의 annotation을 읽지 않는다. 중간 단계부터 시작하려면 이전 단계가 쓸 파일을 형식에 맞춰 직접 만들고 `.done` 표시까지 넣어야 한다. 표시가 없으면 해당 단계가 그 영상을 버려진 것으로 처리할 수 있다 |
| 로봇 지원 | Allex 하나만 설정돼 있다. 논문이 보인 OpenArm, RBY1, GR1 설정은 저장소에 들어 있지 않다 |
| 상업적 사용 | Apache-2.0이지만 의존 구성 요소의 제약 때문에 상업적 실행이 금지된다 |
| 실행 환경 제약 | Linux와 NVIDIA GPU가 필요하고, overlay 단계는 RT 코어와 R580 이하 드라이버를 추가로 요구한다 |

## 6. 관련 연구 (Related Work)

| 대상 | 관계 |
|---|---|
| [[physical-ai/jeong-2026-huro-robotizing-human-videos]] | 이 저장소가 구현한 논문 |
| [[physical-ai/huggingface-lerobot]] | 10단계 출력 형식인 LeRobot V2.0 데이터셋의 원천 프로젝트 |
| [[physical-ai/ginwind-vla-jepa]] | 사람 영상을 VLA pre-training에 쓰는 다른 접근의 공개 저장소. VLA-JEPA 저장소는 학습 코드를 공개하고 HuRo는 데이터 생산 코드를 공개한다 |
| [[physical-ai/nvidia-isaac-gr00t]] | HuRo가 policy backbone으로 쓰는 GR00T 계열의 공개 저장소 |

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| robotization pipeline | 원본 에고센트릭 영상을 로봇 형식의 episode로 바꾸는 10단계 처리 전체 |
| 구간 (segment) | 영상에서 잘라낸 manipulation 구간. 지시문 하나가 붙고 최종적으로 LeRobot episode 하나가 된다 |
| LeRobot V2.0 | 파이프라인 최종 출력 형식. overlay 영상이 observation, retargeting한 관절이 state와 action, 6단계 지시문이 language가 된다 |
| `.done` 표시 | 단계 완료를 알리는 표식 파일. 중간 단계부터 시작할 때 이 표식이 없으면 해당 영상이 버려진 것으로 처리될 수 있다 |
| `--part a/b` | 한 단계의 작업을 b등분해 그중 a번째만 처리하는 분할 실행 플래그 |
| Allex | 저장소에 유일하게 설정된 대상 로봇. configs/allex.yaml과 거기서 가리키는 URDF로 정의된다 |
