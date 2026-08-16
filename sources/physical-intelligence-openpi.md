---
title: "openpi — Open-source models and packages for robotics (π₀ / π₀-FAST / π₀.₅)"
type: repo
year: 2025
category: physical-ai
raw_path: /home/sguys99/project/ai-wiki/raw/repos/physical-intelligence-openpi.md
raw_filename: "physical-intelligence-openpi.md"
source_collection: external
org: "Physical-Intelligence"
repo: "openpi"
url: "https://github.com/Physical-Intelligence/openpi"
license: "Apache-2.0"
tags: [physical-ai, vla, robot-learning, manipulation, edge-inference]
---

## 한 줄 요약 (One-line Summary)

Physical Intelligence가 π0 계열 VLA를 공개한 공식 저장소다. 1만 시간 넘는 로봇 데이터로 pre-training한 base checkpoint 3종(π0·π0-FAST·π0.5)과 플랫폼별 fine-tuned checkpoint를 내려받아 추론·fine-tuning할 수 있다. 추론은 RTX 4090 한 장이면 돈다.

## 1. 자료 정보 (Document Information)

- **저장소**: https://github.com/Physical-Intelligence/openpi
- **조직**: Physical-Intelligence
- **라이선스**: Apache-2.0
- **수록 모델**: π0(flow matching VLA), π0-FAST(FAST action tokenizer 기반 autoregressive VLA), π0.5(knowledge insulation으로 학습한 open-world 일반화 강화판)
- **최근 갱신**: 2025-09 PyTorch 지원과 π0.5 공개, DROID 학습용 idle filter 개선. 2025-06 DROID 전체 데이터셋 학습 안내 추가
- **성격**: 논문 [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]의 레퍼런스 구현. 저장소 안에서는 π0.5 학습·추론 모두 flow matching head만 지원한다

## 2. 주요 기여 (Key Contributions)

RT-2는 논문만 공개하고 끝났다. 그와 달리 π0는 가중치와 코드를 함께 공개한다. base checkpoint는 pre-training을 마친 상태로 제공돼 사용자가 직접 fine-tune할 수 있다. 여기에 ALOHA·DROID처럼 널리 쓰이는 플랫폼에 맞춰 fine-tune한 "expert" checkpoint도 따로 붙는다.

저장소는 스스로를 실험으로 규정한다. π0는 Physical Intelligence 자체 로봇을 위해 개발됐고 그 로봇들은 ALOHA·DROID와 다르다. 그래서 다른 플랫폼에 옮겼을 때 모든 시도가 성공하리라 기대하지 않는다고 미리 밝힌다.

추론은 8GB만 넘으면 되고 LoRA fine-tuning은 22.5GB로 RTX 4090에서 돌아간다. LoRA는 저랭크 행렬만 학습해 fine-tuning 비용을 줄이는 기법이다. full fine-tuning만 70GB 이상이라 A100 80GB나 H100이 필요하다. 하드웨어 요구사항이 진입 문턱을 실제로 낮췄다.

2025년 9월에는 PyTorch 구현이 더해졌다. 원래 JAX로만 있던 π0와 π0.5를 PyTorch로도 쓸 수 있게 됐고 LIBERO 벤치마크에서 추론·fine-tuning 모두 검증했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 제공 checkpoint

base 모델 셋은 모두 1만 시간 이상의 로봇 데이터로 pre-training돼 있으며 fine-tuning용이다.

| 모델 | 용도 | 설명 |
|---|---|---|
| π0 | fine-tuning | flow matching 기반 base VLA |
| π0-FAST | fine-tuning | FAST action tokenizer를 쓰는 autoregressive base VLA |
| π0.5 | fine-tuning | knowledge insulation으로 학습해 open-world 일반화를 높인 π0 개선판 |

fine-tuned expert checkpoint는 대상 로봇에서 바로 돌린다. π0-FAST-DROID는 DROID 플랫폼의 새 장면에서 간단한 tabletop manipulation을 zero-shot으로 해낸다. 저자들이 실사용에서 가장 넓게 일반화된다고 꼽는 체크포인트이기도 하다. π0-DROID는 추론이 더 빠르다. 그 대신 언어 지시 따르기가 약할 수 있다. ALOHA용으로는 수건 개기·반찬통 꺼내기·펜 뚜껑 열기가 각각 따로 있다. π0.5-LIBERO는 LIBERO 벤치마크 SOTA다. π0.5-DROID는 knowledge insulation을 적용해 빠른 추론과 좋은 언어 따르기를 함께 겨냥해 만들어졌다.

체크포인트는 `gs://openpi-assets`에서 필요할 때 자동으로 받아 `~/.cache/openpi`에 캐시한다. 경로는 `OPENPI_DATA_HOME`으로 바꾼다.

### 추론 인터페이스

policy를 만들고 observation dict를 넣으면 action chunk가 나온다. action chunk는 미래 여러 스텝의 action을 한 묶음으로 예측한 것이다.

```python
config = _config.get_config("pi05_droid")
checkpoint_dir = download.maybe_download("gs://openpi-assets/checkpoints/pi05_droid")
policy = policy_config.create_trained_policy(config, checkpoint_dir)
action_chunk = policy.infer(example)["actions"]
```

원격 추론도 갖췄다. 모델을 별도 서버에서 돌리고 websocket으로 action을 로봇에 보내는 방식이다. 로봇에 붙이기 어려운 큰 GPU를 쓰면서 로봇 환경과 policy 환경을 분리할 수 있다. 로봇 없이 추론만 시험하는 스크립트도 있다.

### fine-tuning 파이프라인

자체 데이터로 fine-tune하려면 먼저 데이터를 LeRobot dataset 형식으로 옮긴다. LIBERO 변환 스크립트가 예시로 딸려 있어 이를 고쳐 쓰면 된다.

변환이 끝나면 config에서 로봇 환경과 모델 사이의 입출력 매핑(`LiberoInputs`/`LiberoOutputs`), 원본 데이터 처리 방식(`LeRobotLiberoDataConfig`), 하이퍼파라미터와 weight loader(`TrainConfig`)를 각각 잡는다. 학습 전에는 `compute_norm_stats.py`로 정규화 통계를 먼저 뽑아야 한다. pre-training mixture에 포함됐던 로봇이라면 pre-training의 정규화 통계를 다시 불러 쓰는 기능도 있다.

학습이 끝나면 policy server를 띄우고 추론한다. `serve_policy.py`가 8000번 포트에서 observation을 기다리고 평가 스크립트나 로봇 런타임이 이 서버에 질의한다.

### JAX와 PyTorch

두 구현의 정밀도 처리가 다르다. JAX 추론은 대부분 bfloat16을 쓰고 안정성이 필요한 일부만 float32를 쓴다. 학습은 가중치·그래디언트를 float32로 두고 활성값과 연산을 bfloat16으로 돌리는 혼합 정밀도가 기본이다. PyTorch 추론은 JAX와 같은 방식이지만, 학습은 전부 bfloat16이거나 전부 float32 둘 중 하나이며 혼합 정밀도를 아직 지원하지 않는다. bfloat16은 메모리를 덜 쓴다. 다만 손실이 더 높게 나온다. torch.compile을 쓰면 추론 속도는 두 구현이 비슷하다.

PyTorch 쪽에는 π0-FAST 모델, 혼합 정밀도 학습, FSDP 학습, LoRA 학습, 학습 중 EMA 가중치가 아직 없다. 설치할 때 transformers 4.53.2에 패치 파일을 덮어써야 하는데 AdaRMS 지원, 활성값 정밀도 제어, 갱신 없이 KV 캐시를 쓰기 위한 변경이다. uv 기본 링크 모드가 hardlink라 이 덮어쓰기가 uv 캐시의 transformers를 영구히 바꾸고 다른 프로젝트로까지 번질 수 있다고 경고한다. 되돌리려면 `uv cache clean transformers`가 필요하다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

저장소는 성능 수치를 직접 싣지 않고 실행 요구사항을 제시한다.

| 모드 | 필요 메모리 | 예시 GPU |
|---|---|---|
| 추론 | 8GB 초과 | RTX 4090 |
| fine-tuning (LoRA) | 22.5GB 초과 | RTX 4090 |
| fine-tuning (full) | 70GB 초과 | A100 80GB / H100 |

단일 GPU 기준이며 `fsdp_devices` 설정으로 model parallelism을 쓰면 GPU당 요구량이 준다. 다만 학습 스크립트가 아직 multi-node를 지원하지 않는다. 테스트 환경은 Ubuntu 22.04뿐이고 다른 OS는 지원하지 않는다고 명시한다.

벤치마크는 두 곳에서 언급된다. π0.5-LIBERO가 LIBERO에서 SOTA라고 밝히고 PyTorch 구현을 LIBERO에서 추론·fine-tuning 양쪽으로 검증했다고 적는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

π0는 자체 로봇용으로 개발됐고 ALOHA·DROID 등 널리 쓰이는 플랫폼과 다르다. 저장소는 "당신 환경에서 될 수도 안 될 수도 있다"고 직접 쓴다. 플랫폼 이식은 보장되지 않는다. expert checkpoint도 비교적 작은 데이터로 fine-tune해서 특정 setup으로 옮기면 일반화가 안 될 수 있다. 예외적으로 DROID checkpoint는 실제로 꽤 넓게 일반화된다고 본다.

- PyTorch 구현에는 π0-FAST·혼합 정밀도·FSDP·LoRA·EMA가 빠져 있어 대규모 학습은 여전히 JAX 쪽이 유리하다.
- multi-node 학습과 Ubuntu 22.04 외 OS는 지원하지 않는다.
- 설치 시 덮어쓰는 transformers 패치가 uv 캐시를 오염시켜 다른 프로젝트까지 번질 우려가 있다.

## 6. 관련 연구 (Related Work)

- **π0 논문**: [[black-2024-pi0-a-vision-language-action-flow-model]]. 이 저장소가 구현하는 모델의 원 논문이다.
- **π0-FAST**: action을 이산 토큰으로 압축하는 FAST tokenizer를 써서 autoregressive로 동작하는 변형. 언어 따르기는 낫지만 추론은 flow matching 버전보다 느리다.
- **π0.5**: knowledge insulation으로 학습해 open-world 일반화를 높인 후속 모델.
- **데이터 플랫폼**: LeRobot(학습 데이터 형식), DROID(대규모 in-the-wild Franka 데이터셋), ALOHA(저가 양팔 teleoperation 플랫폼), LIBERO(시뮬레이션 벤치마크).
- **비교 대상**: [[kim-2024-openvla-an-open-source-vision-language-action-model]]. 오픈소스 VLA라는 위치가 겹치지만 openpi는 base 가중치까지 여러 변형으로 공개한다는 점이 다르다.

## 7. 용어집 (Glossary)

π0 아키텍처 용어는 [[black-2024-pi0-a-vision-language-action-flow-model]]에, 공통 용어는 [[overviews/glossary-physical-ai]]·[[overviews/glossary-llms]]에 위임한다.

- **openpi**: Physical Intelligence의 로봇 모델 공개 저장소. π0 계열 가중치와 학습·추론 코드를 담는다.
- **π0-FAST**: FAST action tokenizer로 action을 이산화해 autoregressive로 예측하는 π0 변형.
- **FAST action tokenizer**: 연속 action chunk를 소수의 이산 토큰으로 압축하는 토크나이저.
- **π0.5**: knowledge insulation 기법으로 학습한 π0 개선판. open-world 일반화가 목표다.
- **knowledge insulation**: VLM이 pre-training에서 얻은 지식을 로봇 데이터 학습 중에 잃지 않도록 보호하는 학습 기법.
- **LeRobot dataset**: HuggingFace LeRobot이 정한 로봇 데이터 형식. openpi 학습의 입력 규격이다.
- **policy server**: 학습된 policy를 HTTP/websocket으로 노출해 로봇 런타임이 질의하도록 하는 프로세스. 큰 GPU를 로봇 밖에 두는 구조를 만든다.
- **norm stats**: 상태·action 정규화에 쓰는 통계. 학습 전 `compute_norm_stats.py`로 계산하며 pre-training 값을 다시 불러 쓸 수도 있다.
