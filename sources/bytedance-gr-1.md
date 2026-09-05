---
title: "GR-1 — Unleashing Large-Scale Video Generative Pre-training for Visual Robot Manipulation"
type: repo
year: 2024
category: physical-ai
raw_path: raw/repos/bytedance-gr-1.md
raw_filename: "bytedance-gr-1.md"
source_collection: external
org: "bytedance"
repo: "GR-1"
url: "https://github.com/bytedance/GR-1"
license: "Apache-2.0"
tags: [physical-ai, vla, manipulation, benchmark]
---

## 한 줄 요약 (One-line Summary)

GR-1 논문의 공식 코드 저장소로, CALVIN 벤치마크 평가 스크립트와 ABCD-D와 ABC-D 두 split의 학습된 가중치를 공개한다. 학습 코드와 Ego4D pre-training 파이프라인은 포함되지 않는다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저장소 | bytedance/GR-1 |
| 라이선스 | Apache-2.0 |
| 대응 논문 | [[physical-ai/wu-2023-unleashing-large-scale-video-generative]] (ICLR 2024, arXiv 2312.13139) |
| 프로젝트 페이지 | https://gr1-manipulation.github.io |
| 공개 자산 | CALVIN 평가 스크립트, ABCD-D와 ABC-D 가중치 2종 |

## 2. 주요 기여 (Key Contributions)

논문 결과를 그대로 재현할 수 있는 최소 구성을 공개했다는 점이 이 저장소의 역할이다. 구체적으로는 CALVIN 평가 진입점 `evaluate_calvin.sh`, ABCD-D와 ABC-D 각각의 checkpoint(`snapshot_ABCD.pt`와 `snapshot_ABC.pt`), 그리고 의존성 설치 스크립트 `install.sh`가 들어 있다.

주의할 점은 빠진 부분이다. Ego4D 80만 clip으로 수행하는 video generative pre-training 코드도, 로봇 데이터 fine-tuning 코드도 README에 언급되지 않는다. 저장소는 학습된 GR-1을 CALVIN에서 실행해보는 경로만 연다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

README가 설명하는 모델 정의는 논문과 같다. GR-1은 언어 지시문, observation 이미지 시퀀스, 로봇 상태 시퀀스를 받아 action과 미래 이미지를 end-to-end로 낸다.

실행에 필요한 외부 자산이 셋이다.

- CALVIN 환경과 데이터셋: `mees/calvin` 저장소의 설치 절차를 그대로 따른다
- MAE ViT-Base pre-training 가중치: `facebookresearch/mae`의 `mae_pretrain_vit_base.pth`. 이미지 인코더가 얼려진 채로 쓰이므로 평가에도 필요하다
- GR-1 checkpoint: ByteDance가 호스팅하는 링크에서 받아 `logs/`에 둔다

평가는 환경 변수 넷을 잡고 셸 스크립트를 부르는 형태다.

```bash
export CALVIN_ROOT=/path/to/calvin/directory/
export EVAL_DIR=eval_logs/
export POLICY_CKPT_PATH=logs/snapshot_ABCD.pt
export MAE_CKPT_PATH=/path/to/mae/checkpoint/
bash evaluate_calvin.sh --dataset_dir /path/to/calvin/dataset/task_ABCD_D/directory/
```

ABC-D split을 보려면 `POLICY_CKPT_PATH`만 `snapshot_ABC.pt`로 바꾼다. 결과는 `EVAL_DIR`에 쌓인다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README의 abstract가 논문 수치를 그대로 옮긴다. CALVIN 성공률 88.9% → 94.9%, zero-shot unseen scene 53.3% → 85.4%. 저장소 자체가 새로 제시하는 수치는 없고, 위 두 checkpoint가 그 수치를 재현하는 자산이다. 자세한 표는 [[physical-ai/wu-2023-unleashing-large-scale-video-generative]]에 있다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

평가 전용이라는 점이 가장 큰 제약이다. 다른 로봇이나 다른 데이터로 GR-1을 학습시켜 보려면 논문을 보고 직접 구현해야 한다. 실제 기기 실험에 쓰인 Kinova Gen2 관련 코드와 teleoperation으로 모은 데이터도 공개되지 않았다.

설치도 가벼운 편은 아니다. CALVIN 환경 자체가 별도 시뮬레이터 스택을 요구하고, MAE 가중치를 따로 받아야 하며, checkpoint는 ByteDance 사내 오브젝트 스토리지 링크에 걸려 있다.

## 6. 관련 연구 (Related Work)

README가 직접 거는 링크는 CALVIN 저장소(`mees/calvin`)와 MAE 저장소(`facebookresearch/mae`) 둘이다. 전자는 벤치마크 환경, 후자는 얼려 쓰는 이미지 인코더의 출처다. 인용 블록은 ICLR 2024 논문을 가리킨다.

## 7. 용어집 (Glossary)

이 저장소 고유의 이름만 담는다. 모델 구조 용어는 논문 source의 용어집과 [[overviews/glossary-physical-ai]]를 따른다.

| 이름 | 뜻 |
|---|---|
| `snapshot_ABCD.pt` / `snapshot_ABC.pt` | CALVIN ABCD-D와 ABC-D split에서 각각 학습된 GR-1 가중치 |
| `evaluate_calvin.sh` | CALVIN 평가 진입점. `--dataset_dir`로 split 디렉토리를 받는다 |
| `CALVIN_ROOT` / `MAE_CKPT_PATH` | CALVIN 저장소 경로와 MAE ViT-Base 가중치 경로를 가리키는 환경 변수 |
