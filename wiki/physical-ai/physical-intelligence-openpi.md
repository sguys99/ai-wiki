---
title: "openpi — Open-source models and packages for robotics (π₀ / π₀-FAST / π₀.₅)"
type: repo
year: 2025
category: physical-ai
source: physical-intelligence-openpi.md
raw_path: /home/sguys99/project/ai-wiki/raw/repos/physical-intelligence-openpi.md
raw_filename: "physical-intelligence-openpi.md"
source_collection: external
org: "Physical-Intelligence"
repo: "openpi"
url: "https://github.com/Physical-Intelligence/openpi"
license: "Apache-2.0"
tags: [physical-ai, vla, robot-learning, manipulation, edge-inference]
---

## 요약 (Summary)

Physical Intelligence가 π0 계열 VLA를 공개한 공식 저장소다. 라이선스는 Apache-2.0이다. 1만 시간 넘는 로봇 데이터로 pre-training한 base checkpoint 3종과 플랫폼별 fine-tuned checkpoint를 내려받아 쓸 수 있다.

RT-2는 논문만 내고 가중치는 닫아 뒀다. openpi는 base checkpoint를 pre-training이 끝난 상태로 제공하므로 사용자는 자기 데이터로 fine-tune만 하면 된다. 진입 문턱도 낮다. 추론은 8GB 넘는 GPU면 되고 LoRA fine-tuning은 22.5GB라 RTX 4090 한 장에서 돌아간다. LoRA는 저랭크 행렬만 학습해 fine-tuning 비용을 줄이는 기법이다.

다만 저장소는 스스로를 "실험"이라 부른다. 이 전제를 깔고 읽어야 한다. π0는 Physical Intelligence 자체 로봇을 위해 개발됐고 그 로봇들은 ALOHA·DROID와 다르다. 다른 플랫폼에 옮겼을 때 모든 시도가 성공한다고 기대하지는 않는다고 README가 직접 밝힌다.

## 제공 모델 (Checkpoints)

base 모델 셋은 전부 1만 시간 이상의 로봇 데이터로 pre-training을 마친 fine-tuning용이다.

| 모델 | 설명 |
|---|---|
| π0 | flow matching 기반 base VLA. [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model|논문]]의 모델 |
| π0-FAST | FAST action tokenizer로 action을 이산화해 autoregressive로 예측하는 변형 |
| π0.5 | knowledge insulation으로 학습해 open-world 일반화를 높인 개선판 |

π0.5는 저장소 안에서 학습·추론 모두 flow matching head만 지원한다.

fine-tuned expert checkpoint는 대상 로봇에서 바로 돌리는 용도다. π0-FAST-DROID는 DROID 플랫폼의 새 장면에서 간단한 tabletop manipulation을 zero-shot으로 해낸다. 저자들이 실사용에서 가장 넓게 일반화된다고 꼽는 체크포인트다. π0-DROID는 추론이 더 빠른 대신 언어 지시 따르기가 약할 수 있다. ALOHA용으로는 수건 개기·반찬통 꺼내기·펜 뚜껑 열기가 각각 따로 있다. π0.5-LIBERO는 LIBERO 벤치마크 SOTA를 낸다. π0.5-DROID는 knowledge insulation을 적용해 빠른 추론과 좋은 언어 따르기를 함께 얻으려 한 모델이다.

체크포인트는 `gs://openpi-assets`에서 필요할 때 자동으로 받아 `~/.cache/openpi`에 캐시한다. 경로는 `OPENPI_DATA_HOME`으로 바꾼다.

## 실행 요구사항 (Requirements)

| 모드 | 필요 메모리 | 예시 GPU |
|---|---|---|
| 추론 | 8GB 초과 | RTX 4090 |
| fine-tuning (LoRA) | 22.5GB 초과 | RTX 4090 |
| fine-tuning (full) | 70GB 초과 | A100 80GB / H100 |

단일 GPU 기준이며 `fsdp_devices` 설정으로 model parallelism을 쓰면 GPU당 요구량이 준다. 학습 스크립트는 아직 multi-node를 지원하지 않는다. 테스트 환경은 Ubuntu 22.04뿐이고 다른 OS는 지원하지 않는다고 명시한다. 의존성 관리는 uv를 쓰며 LeRobot을 끌어오려면 `GIT_LFS_SKIP_SMUDGE=1`이 필요하다.

## 쓰는 법 (Usage)

### 추론

policy를 만들고 observation dict를 넣으면 action chunk가 나온다. action chunk는 미래 여러 스텝의 action을 한 묶음으로 예측한 것이다.

```python
config = _config.get_config("pi05_droid")
checkpoint_dir = download.maybe_download("gs://openpi-assets/checkpoints/pi05_droid")
policy = policy_config.create_trained_policy(config, checkpoint_dir)
action_chunk = policy.infer(example)["actions"]
```

모델을 별도 서버에서 돌리고 websocket으로 action을 로봇에 보내는 원격 추론도 갖췄다. 로봇에 붙이기 어려운 큰 GPU를 쓰면서 로봇 환경과 policy 환경을 분리할 수 있다. 논문이 보고한 off-board 추론 지연 13ms가 이 구조에서 나온다. 로봇 없이 추론만 시험하는 스크립트도 있다.

### 자체 데이터로 fine-tuning

데이터를 LeRobot dataset 형식으로 변환하는 일이 출발점이다. LIBERO 변환 스크립트를 예시로 두고 이를 고쳐 쓰라고 안내한다.

config에서는 로봇 환경과 모델 사이의 입출력 매핑, 원본 데이터 처리 방식, 하이퍼파라미터와 weight loader를 각각 잡는다. 학습 전에는 `compute_norm_stats.py`로 정규화 통계를 뽑아야 한다. pre-training mixture에 포함됐던 로봇이라면 pre-training의 정규화 통계를 다시 불러 쓰는 기능도 있다.

`serve_policy.py`로 policy server를 띄우면 8000번 포트에서 observation을 기다린다. 평가 스크립트나 로봇 런타임이 이 서버에 질의한다.

### JAX와 PyTorch

2025년 9월에 PyTorch 구현이 더해졌고 LIBERO에서 추론·fine-tuning 모두 검증했다. 다만 π0-FAST 모델, 혼합 정밀도 학습, FSDP 학습, LoRA 학습, 학습 중 EMA 가중치가 아직 빠져 있어서 대규모 학습은 여전히 JAX 쪽이 유리하다.

정밀도 처리도 다르다. JAX 학습은 혼합 정밀도가 기본이다. 가중치와 그래디언트는 float32로 두고 활성값과 연산을 bfloat16으로 돌린다. PyTorch 학습은 전부 bfloat16이거나 전부 float32 둘 중 하나다. bfloat16이 메모리를 덜 쓰는 대신 손실이 더 높게 나온다. 추론 속도는 torch.compile을 쓰면 두 구현이 비슷하다.

설치할 때는 transformers 4.53.2에 패치 파일을 덮어써야 한다. AdaRMS 지원, 활성값 정밀도 제어, 갱신 없이 KV 캐시를 쓰기 위한 변경이다. uv 기본 링크 모드가 hardlink라 이 덮어쓰기가 uv 캐시의 transformers를 영구히 바꾸고 다른 프로젝트로까지 번질 수 있다고 README가 경고한다. 되돌리려면 `uv cache clean transformers`를 실행해야 한다.

## 한계 (Limitations)

저장소는 플랫폼 이식이 보장되지 않는다는 점을 먼저 밝힌다. expert checkpoint도 비교적 작은 데이터로 fine-tune한 것이라 특정 setup으로 옮기면 일반화가 안 될 수 있다. 예외적으로 DROID checkpoint는 실제로 꽤 넓게 일반화된다고 본다.

인프라 쪽에서는 multi-node 학습과 Ubuntu 22.04 외의 OS를 지원하지 않는다. 여기에 PyTorch 기능 격차와 transformers 패치의 캐시 오염 문제가 겹친다.

## 이 저장소 안에서의 위치 (Position in This Wiki)

physical-ai에서 이 페이지는 "논문을 실제로 돌려 보는 경로"에 해당한다. 오픈소스 VLA라는 자리는 [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model|OpenVLA]]가 앞서 차지했지만, openpi는 base 가중치를 여러 변형으로 공개하고 플랫폼별 expert checkpoint까지 붙인다. 여기가 다르다. 두 저장소를 나란히 보면 오픈소스 VLA의 공개 범위가 어디까지 넓어졌는지 알 수 있다.

논문에 없는 정보도 담고 있다. π0-FAST와 π0.5는 원 논문 이후에 나온 모델이라 [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model|π0 논문]] 쪽에는 없다. π0.5는 이제 [[physical-ai/black-2025-pi05-a-vision-language-action-model-with|자체 논문 페이지]]가 있는데, 학습 방식 설명이 서로 다르다. 논문은 FAST 이산 토큰 pre-training 뒤에 action expert를 붙이는 2단 레시피를 쓰고 이 저장소는 knowledge insulation을 든다. 둘을 함께 읽는 편이 안전하다. 이 계열의 전체 전개는 [[physical-ai/sa-2026-vision-language-action-models-for|VLA 서베이]]가 π0 → π0.5 → π*0.6 → π0.7 순으로 정리한다. 서베이가 말하는 Knowledge Insulation이 여기 π0.5 설명에 그대로 나온다.

하드웨어 요구사항 표는 [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation|GR00T N1]]처럼 배포를 다루는 페이지와 함께 읽을 만하다. VLA를 실제로 돌릴 때 드는 비용의 실측치라서다.

## 관련 페이지 (Related Pages)

- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]] — 이 저장소가 구현하는 모델의 원 논문
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]] — checkpoint 3종 중 π0.5의 원 논문. 저장소 설명과 학습 방식 서술이 갈린다
- [[physical-ai/physical-intelligence-2024-our-first-generalist-policy]] — 같은 팀의 공식 블로그 해설
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]] — 오픈소스 VLA라는 자리가 겹치는 선행 저장소
- [[physical-ai/sa-2026-vision-language-action-models-for]] — π0-FAST·π0.5를 포함한 π 계열 전체 계보
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — 배포·추론 비용을 함께 볼 만한 후속 foundation model
- [[overviews/physical-ai-overview]] — 도메인 허브
