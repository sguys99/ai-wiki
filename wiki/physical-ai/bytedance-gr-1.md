---
title: "GR-1: Unleashing Large-Scale Video Generative Pre-training for Visual Robot Manipulation"
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

## 요약

bytedance/GR-1은 ICLR 2024 논문 "Unleashing Large-Scale Video Generative Pre-training for Visual Robot Manipulation"의 공식 코드 저장소다. 라이선스는 Apache-2.0이고, 저장소가 여는 실행 경로는 CALVIN 벤치마크 평가 하나다. ABCD-D와 ABC-D 두 split에서 각각 학습된 가중치를 내려받아 논문이 보고한 수치를 재현해볼 수 있다.

빠진 부분을 먼저 확인해 두는 편이 실무에 유용하다. Ego4D 영상으로 수행하는 video generative pre-training 코드도, 로봇 데이터 fine-tuning 코드도 README에 없다. video generative pre-training은 언어 설명이 붙은 영상에서 미래 프레임을 맞히도록 모델을 먼저 학습시키는 단계를 말한다. 따라서 GR-1을 다른 로봇이나 다른 데이터로 학습시키려면 논문을 보고 직접 구현해야 한다.

## 배경

GR-1은 언어 지시문(instruction)으로 지정한 manipulation 과제를 수행하는 GPT 계열 Transformer policy다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. README가 밝히는 입출력 구성은 입력 세 종류와 출력 두 종류다.

- 입력: 과제를 지정하는 언어 지시문 한 문장
- 입력: observation 이미지 시퀀스
- 입력: 로봇 상태 시퀀스
- 출력: 로봇 action
- 출력: 미래 이미지

두 출력을 end-to-end로 함께 낸다는 점이 GR-1의 특징이다. 미래 이미지 예측은 pre-training 단계에서 사람 영상으로 배운 과제이고, 로봇 데이터로 fine-tuning할 때도 그대로 남는다. 즉 영상에서 배운 능력이 로봇 policy 학습에서 버려지지 않도록 두 단계에 같은 예측 과제를 남겨둔 구성이다.

구조와 학습 절차의 근거, ablation을 포함한 정량 평가는 원 논문 페이지([[physical-ai/wu-2023-unleashing-large-scale-video-generative]])가 다룬다. 이 페이지는 저장소가 제공하는 자산과 실행 절차에 집중한다.

GR-1은 ByteDance Research가 내놓은 GR 시리즈의 첫 모델이고, 이후 GR-2와 GR-3로 이어진다. 이 저장소는 그중 첫 모델의 공개분이므로 후속 모델의 코드는 담고 있지 않다.

## 저장소 구성

README가 언급하는 자산은 평가 한 경로를 돌리는 데 필요한 최소 구성이다.

| 자산 | 역할 |
|---|---|
| `evaluate_calvin.sh` | CALVIN 평가 진입점. `--dataset_dir` 인자로 평가할 split 디렉토리를 받는다 |
| `install.sh` | CALVIN 환경을 뺀 나머지 파이썬 의존성을 설치하는 스크립트 |
| `logs/` | 내려받은 GR-1 checkpoint를 두는 디렉토리 |
| `snapshot_ABCD.pt` | ABCD-D split에서 학습된 가중치. ByteDance 오브젝트 스토리지에서 별도로 받는다 |
| `snapshot_ABC.pt` | ABC-D split에서 학습된 가중치. 같은 위치에서 받는다 |
| `media/` | 데모 GIF 6개. 전체 개요, 실제 기기 실행 장면, CALVIN 실행 장면 4개 |
| `LICENSE.txt` | Apache-2.0 라이선스 전문 |

저장소가 여는 경로와 열지 않는 경로를 구분해 두면 도입 판단이 빨라진다.

| 구분 | 내용 |
|---|---|
| 여는 경로 | 학습이 끝난 GR-1을 CALVIN ABCD-D와 ABC-D에서 평가 |
| 열지 않는 경로 | Ego4D 영상 80만 clip으로 수행하는 video generative pre-training |
| 열지 않는 경로 | 로봇 데이터 fine-tuning과 학습 스크립트 |
| 열지 않는 경로 | Kinova Gen2 실제 기기 실험 코드와 teleoperation으로 모은 시연 데이터(demonstration) |

teleoperation은 사람이 로봇을 원격으로 움직여 시연 데이터를 만드는 방식이다. 논문의 실제 기기 실험은 이 방식으로 데이터를 모았지만, 해당 코드와 데이터는 저장소에 포함되지 않는다.

## 설치와 준비

실행 전에 저장소 밖에서 받아와야 하는 자산이 넷이다. 하나라도 빠지면 평가 스크립트가 시작되지 않는다.

| 자산 | 출처 | 배치 위치 | 필요한 이유 |
|---|---|---|---|
| CALVIN 환경 | `mees/calvin` 저장소의 설치 절차 | 별도 설치. `CALVIN_ROOT`로 경로 지정 | 평가가 실행되는 시뮬레이터와 과제 정의 |
| CALVIN 데이터셋 | `mees/calvin`의 데이터셋 문서 | 임의 경로. `--dataset_dir`로 지정 | 평가 시퀀스와 지시문 |
| 나머지 파이썬 의존성 | 저장소의 `install.sh` | 저장소 안 | 모델 실행에 필요한 패키지 |
| MAE ViT-Base 가중치 | `facebookresearch/mae`의 `mae_pretrain_vit_base.pth` | 임의 경로. `MAE_CKPT_PATH`로 지정 | 이미지 인코더를 얼린 채로 쓰므로 평가에도 필요 |
| GR-1 checkpoint 2종 | ByteDance 오브젝트 스토리지 링크 | `logs/` | 평가 대상 가중치 |

MAE 가중치가 평가 시점에도 필요한 이유는 GR-1이 이미지 인코더를 학습 대상에서 뺐기 때문이다. 논문 기준으로 전체 195M 파라미터 중 실제로 학습되는 것은 46M이고, 얼려둔 CLIP 텍스트 인코더와 MAE ViT가 나머지를 차지한다. 즉 checkpoint 파일 하나만으로는 모델이 완성되지 않으므로 MAE 가중치를 함께 준비해야 한다.

README는 OS, 파이썬 버전, GPU 사양 같은 요구 사항을 따로 명시하지 않는다. 실질적인 하한선은 CALVIN 저장소의 설치 문서가 결정하며, 별도의 시뮬레이터 스택이 함께 들어온다.

## 평가 실행

평가는 환경 변수 넷을 설정하고 셸 스크립트를 호출하는 형태다. 각 변수의 뜻은 다음과 같다.

| 환경 변수 | 값 예시 | 뜻 |
|---|---|---|
| `CALVIN_ROOT` | `/path/to/calvin/directory/` | 설치한 CALVIN 저장소의 루트 경로 |
| `EVAL_DIR` | `eval_logs/` | 평가 결과가 저장될 디렉토리. 없으면 새로 생성된다 |
| `POLICY_CKPT_PATH` | `logs/snapshot_ABCD.pt` | 평가할 GR-1 checkpoint 경로 |
| `MAE_CKPT_PATH` | `/path/to/mae/checkpoint/` | MAE ViT-Base 가중치 경로 |

README가 제시하는 ABCD-D 평가 명령은 다음과 같다.

```bash
export CALVIN_ROOT=/path/to/calvin/directory/
export EVAL_DIR=eval_logs/
export POLICY_CKPT_PATH=logs/snapshot_ABCD.pt
export MAE_CKPT_PATH=/path/to/mae/checkpoint/
bash evaluate_calvin.sh --dataset_dir /path/to/calvin/dataset/task_ABCD_D/directory/
```

ABC-D split을 평가하려면 `POLICY_CKPT_PATH`를 `logs/snapshot_ABC.pt`로 바꾸고 `--dataset_dir`도 해당 split 디렉토리로 바꾼다. 나머지 두 변수는 그대로 둔다.

두 split은 학습 환경과 평가 환경의 조합이 다르다. CALVIN은 책상 색과 물체 배치가 서로 다른 환경 A부터 D까지 넷으로 구성되며, split 이름의 앞부분이 학습 환경, 뒷부분이 평가 환경을 가리킨다.

| split | checkpoint | 학습 환경 | 평가 환경 | 성격 |
|---|---|---|---|---|
| ABCD-D | `snapshot_ABCD.pt` | A, B, C, D | D | 학습에서 본 환경에서 평가하는 표준 설정 |
| ABC-D | `snapshot_ABC.pt` | A, B, C | D | D를 학습에서 제외한 zero-shot 설정 |

ABC-D가 더 어려운 설정이다. 평가 환경 D의 책상 색과 물체 배치를 학습 중에 한 번도 보지 못한 상태에서 과제를 수행해야 하기 때문이다. 두 checkpoint를 모두 받아 두면 같은 스크립트로 난이도가 다른 두 조건을 비교할 수 있다.

실행 결과는 `EVAL_DIR`이 가리키는 디렉토리에 쌓인다. 해당 디렉토리가 없으면 스크립트가 새로 만들므로 미리 준비할 필요는 없다. 반면 checkpoint를 둘 `logs/`와 CALVIN 데이터셋 경로는 사람이 직접 맞춰야 하며, 이 두 경로가 어긋나는 것이 첫 실행에서 가장 흔한 실패 지점이다.

## 재현 대상 수치

README의 abstract는 논문 수치를 그대로 옮겨 적는다. 저장소가 새로 제시하는 수치는 없고, 공개된 두 checkpoint가 이 수치를 재현하는 자산이다.

| 설정 | 지표 | 기존 최고 성적 | GR-1 | 차이 |
|---|---|---|---|---|
| ABCD-D | 첫 과제 성공률 | 88.9% | 94.9% | 6.0%p |
| ABC-D | 첫 과제 성공률(zero-shot) | 53.3% | 85.4% | 32.1%p |

두 수치의 성격이 다르다. ABCD-D의 6.0%p는 이미 높은 구간에서의 개선이고, ABC-D의 32.1%p는 처음 보는 환경에서 기존 방법이 절반 수준에 머물던 자리를 크게 끌어올린 결과다. 저장소를 재현 목적으로 쓴다면 후자가 확인 가치가 더 크다.

CALVIN 평가는 지시문 5개를 연달아 제시하고 하나를 통과해야 다음으로 넘어가는 방식이다. 따라서 첫 과제 성공률만으로는 긴 과제 사슬을 얼마나 이어가는지 알 수 없고, 평균 몇 개를 통과했는지를 재는 Avg. Len.을 함께 본다. 설정별 전체 표와 ablation 결과는 [[physical-ai/wu-2023-unleashing-large-scale-video-generative]]에 있다.

## 인용과 라이선스

라이선스는 Apache-2.0이고 전문은 저장소의 `LICENSE.txt`에 있다. 결합 조건이 GPL 계열보다 느슨하므로 사내 실험 코드에 가져다 쓰기 쉬운 편이지만, 저작권 고지와 라이선스 사본 유지 의무는 그대로 남는다.

README는 별도로 인용을 요청하며 BibTeX 항목을 제시한다. 인용 대상은 저장소가 아니라 ICLR 2024 논문 `wu2023unleashing`이다. 즉 코드 사용과 논문 인용이 분리되어 있으므로, 결과를 문서로 남길 때는 논문 쪽을 인용한다.

## 한계

평가 전용이라는 점이 가장 큰 제약이다. 저장소는 학습이 끝난 가중치를 CALVIN에서 확인하는 경로만 열고, 학습 파이프라인은 어느 단계도 공개하지 않는다. 다른 로봇이나 다른 데이터로 GR-1을 학습시키려면 논문 본문과 부록의 하이퍼파라미터를 보고 직접 구현해야 한다.

실제 기기 관련 자산도 빠져 있다. 논문은 7자유도 Kinova Gen2로 물체 옮기기와 서랍 여닫기를 실험했지만, 해당 제어 코드도 teleoperation으로 모은 시연 데이터도 저장소에 없다. 시뮬레이터 밖에서 GR-1을 확인하려는 경우 참고할 코드가 없다는 뜻이다.

설치 부담도 가볍지 않다. CALVIN 환경 자체가 별도의 시뮬레이터 스택을 요구하고, MAE 가중치를 따로 받아야 하며, checkpoint는 ByteDance 사내 오브젝트 스토리지 링크에 걸려 있어 장기 가용성을 보장받기 어렵다. 재현이 목적이라면 checkpoint 두 개를 미리 확보해 두는 편이 안전하다.

마지막으로 README는 실행 환경 요구 사항을 적지 않는다. 파이썬 버전, CUDA 버전, GPU 메모리 같은 정보가 없어 CALVIN 저장소 문서와 `install.sh` 내용을 직접 확인해야 한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| CALVIN | Franka Emika Panda와 평행 그리퍼, 슬라이딩 도어와 서랍이 놓인 책상으로 구성된 언어 조건부 manipulation 벤치마크. 환경 A부터 D까지 넷과 34개 과제로 이뤄진다 |
| ABCD-D / ABC-D | CALVIN 데이터 split. 앞부분이 학습 환경, 뒷부분이 평가 환경이다. ABC-D는 D를 학습에서 제외한 zero-shot 설정 |
| `snapshot_ABCD.pt` / `snapshot_ABC.pt` | 두 split에서 각각 학습된 GR-1 가중치. `logs/`에 두고 `POLICY_CKPT_PATH`로 가리킨다 |
| `evaluate_calvin.sh` | CALVIN 평가 진입점. `--dataset_dir`로 평가할 split 디렉토리를 받는다 |
| MAE ViT-Base | GR-1이 얼린 채로 쓰는 이미지 인코더. `facebookresearch/mae`에서 받아 `MAE_CKPT_PATH`로 지정하며 평가에도 필요하다 |
| Avg. Len. | CALVIN 평가 지표. 지시문 5개를 연달아 줬을 때 평균 몇 개를 통과했는지를 나타낸다 |

## 관련 페이지

- [[physical-ai/wu-2023-unleashing-large-scale-video-generative]]: 이 저장소가 구현하는 원 논문(ICLR 2024). 구조, 학습 절차, 전체 실험 수치의 1차 출처다.
- [[physical-ai/huggingface-lerobot]]: 로봇 policy의 학습과 평가를 한 프레임워크로 묶은 저장소. 평가 경로만 여는 GR-1과 공개 범위가 대비된다.
- [[physical-ai/physical-intelligence-openpi]]: 학습 코드까지 함께 공개한 VLA 저장소 사례.
- [[physical-ai/nvidia-isaac-gr00t]]: pre-training된 가중치와 fine-tuning 절차를 함께 여는 foundation model 저장소.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
