---
title: "GR-1 — Unleashing Large-Scale Video Generative Pre-training for Visual Robot Manipulation"
type: repo
year: 2024
category: physical-ai
source: bytedance-gr-1.md
raw_path: raw/repos/bytedance-gr-1.md
raw_filename: "bytedance-gr-1.md"
source_collection: external
org: "bytedance"
repo: "GR-1"
url: "https://github.com/bytedance/GR-1"
license: "Apache-2.0"
tags: [physical-ai, vla, manipulation, benchmark]
---

## 요약 (Summary)

[[physical-ai/wu-2023-unleashing-large-scale-video-generative]]의 공식 코드 저장소다. Apache-2.0으로 공개돼 있고, 담고 있는 것은 CALVIN 평가 경로 하나다. ABCD-D와 ABC-D 두 split에서 학습된 가중치를 내려받아 논문 수치를 그대로 재현해볼 수 있다.

빠진 쪽이 더 중요할 수 있다. Ego4D 80만 clip으로 도는 video generative pre-training 코드도, 로봇 데이터 fine-tuning 코드도 README에 없다. video generative pre-training은 언어 설명이 붙은 영상에서 미래 프레임을 맞히도록 모델을 먼저 학습시키는 단계를 말한다. GR-1을 다른 로봇이나 다른 데이터로 학습시켜 보려면 논문을 보고 직접 구현해야 한다.

## 무엇이 들어 있나 (What Is Included)

| 자산 | 내용 |
|---|---|
| `evaluate_calvin.sh` | CALVIN 평가 진입점. `--dataset_dir`로 split 디렉토리를 받는다 |
| `snapshot_ABCD.pt` | ABCD-D split 학습 가중치 (ByteDance 오브젝트 스토리지에서 별도 다운로드) |
| `snapshot_ABC.pt` | ABC-D split 학습 가중치. 처음 보는 환경 D에서 평가하는 zero-shot 설정용 |
| `install.sh` | 의존성 설치 스크립트 |

## 실행 절차 (Setup)

외부에서 따로 받아와야 하는 것이 셋이다. CALVIN 환경과 데이터셋은 `mees/calvin` 저장소의 절차를 그대로 따르고, 이미지 인코더로 얼려 쓰는 MAE ViT-Base 가중치(`mae_pretrain_vit_base.pth`)는 `facebookresearch/mae`에서 받는다. GR-1 checkpoint 두 개는 README의 링크에서 받아 `logs/`에 둔다.

평가는 환경 변수 넷을 잡고 셸 스크립트를 부르는 형태다.

```bash
export CALVIN_ROOT=/path/to/calvin/directory/
export EVAL_DIR=eval_logs/
export POLICY_CKPT_PATH=logs/snapshot_ABCD.pt
export MAE_CKPT_PATH=/path/to/mae/checkpoint/
bash evaluate_calvin.sh --dataset_dir /path/to/calvin/dataset/task_ABCD_D/directory/
```

ABC-D split을 보려면 `POLICY_CKPT_PATH`만 `snapshot_ABC.pt`로 바꾼다. 결과는 `EVAL_DIR`에 쌓인다. MAE 가중치가 평가에도 필요한 이유는 GR-1이 이미지 인코더를 학습하지 않고 얼린 채로 쓰기 때문이다. 195M 파라미터 중 실제로 학습되는 46M에 이 인코더는 포함되지 않는다.

## 재현되는 수치 (Reported Numbers)

README의 abstract가 논문 수치를 그대로 옮긴다. CALVIN 성공률 88.9% → 94.9%, 처음 보는 환경에서의 zero-shot 성공률 53.3% → 85.4%. 저장소가 새로 제시하는 수치는 없고, 위 두 checkpoint가 그 수치를 재현하는 자산이다. 설정별 전체 표는 [[physical-ai/wu-2023-unleashing-large-scale-video-generative]]에 있다.

## 한계 (Limitations)

평가 전용이라는 점이 가장 큰 제약이다. 실기기 실험에 쓰인 Kinova Gen2 관련 코드와 teleoperation으로 모은 데이터도 공개되지 않았다. teleoperation은 사람이 로봇을 원격으로 움직여 시연 데이터를 만드는 방식이다.

설치 부담도 가볍지 않다. CALVIN 자체가 별도 시뮬레이터 스택을 요구하고, MAE 가중치를 따로 받아야 하며, checkpoint는 ByteDance 사내 오브젝트 스토리지 링크에 걸려 있어 장기 가용성을 보장받기 어렵다.

## 관련 페이지 (Related Pages)

- [[physical-ai/wu-2023-unleashing-large-scale-video-generative]] — 이 저장소가 구현하는 논문 (ICLR 2024)
- [[physical-ai/huggingface-lerobot]] — 로봇 policy 학습·평가를 한 프레임워크로 묶은 쪽. 평가 스크립트만 여는 GR-1과 대비된다
- [[physical-ai/physical-intelligence-openpi]] — 학습 코드까지 함께 공개한 VLA 저장소 사례
