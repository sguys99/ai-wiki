---
title: "03-11. WALL-OSS - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
source: jo-2026-wall-oss-vla-primer.md
raw_path: raw/articles/jo-2026-wall-oss-vla-primer.md
raw_filename: "jo-2026-wall-oss-vla-primer.md"
source_collection: external
author: "조인령"
url: "https://wikidocs.net/366377"
publisher: "wikidocs.net"
fetched_at: "2026-08-28T08:46:20+0900"
extractor_tier: "chrome"
tags: [physical-ai, vla, robot-learning, manipulation]
figures:
  - id: fig05
    file: assets/jo-2026-wall-oss-vla-primer/fig05.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig05.png
    caption: "static router가 나누는 두 경로를 저자가 논문 Figure 3 위에 빨간 테두리로 표시한 도식. Vision-Language FFN 경로와 Action FFN 경로가 어디서 갈라지는지 보여 준다"
    strategy: fetched
    curated: true
---

## 요약

WALL-OSS(Zhai 2025) 논문을 처음 읽는 사람을 위한 한국어 입문 해설이다. "모두의 로보틱스 - VLA 입문" 시리즈의 03-11편으로, 모델의 등장 배경부터 기존 VLA 구조 두 가지, WALL-OSS의 모델 구성, 두 단계 학습 파이프라인, 데이터 전략, 실험 결과, 한계까지 원문의 전개 순서를 그대로 따라간다.

이 해설을 시리즈의 다른 글과 구분 짓는 것은 수식 비중이다. 본문 도식 18개 중 8개가 손실 함수와 노이즈 스케줄을 캡처한 수식 이미지이고, 논문이 여러 절에 흩어 놓은 손실 함수를 학습 단계 순서로 다시 배열해 기호를 하나씩 풀이한다. 원 논문은 [[physical-ai/zhai-2025-igniting-vlms-toward-the-embodied]]에 정리되어 있으므로, 이 입문 페이지로 전체 그림을 잡은 뒤 원 논문 페이지로 넘어가는 순서를 권한다.

## 배경

WALL-OSS의 출발점은 대형 언어 모델과 VLM이 물리 세계와 단절되어 있다는 관찰이다. 원문은 이 상태를 비구체화(disembodied)라고 부른다. 텍스트와 이미지를 처리하는 능력은 뛰어나지만 물리적 실체가 없어 현실의 물리 법칙이나 공간 맥락을 직접 체득하지 못한다는 뜻이다.

원문은 이 단절을 두 가지 예시로 보여 준다.

- 겹쳐진 카드 더미에서 카드를 모두 세고 하나씩 가리키는 과제. VLM은 방법을 텍스트로 설명할 수 있지만, 각 카드의 정확한 좌표 (x, y)를 잡아 손가락을 그 위치로 옮기는 공간 추론에서는 한계를 보인다.
- 알파벳 블록으로 특정 단어를 만드는 과제. 필요한 철자가 부족한 상황을 인지할 수는 있어도, 그 상태에서 어떤 action을 해야 하는지는 모른다. action은 policy가 출력하는 제어 명령을 말한다.

두 예시가 공통으로 가리키는 것은 perception과 action이 서로 맞물리지 않는 병목이다. 원문은 이 병목을 "지능과 행동 사이의 간극"이라는 한 문장으로 압축한다. 논문이 모달리티 gap, pre-training 분포 gap, 학습 목표 gap 세 가지로 나눠 세운 문제를 입문자가 잡기 쉽게 하나로 줄인 표현이다.

WALL-OSS는 이 간극을 구조와 학습 순서 양쪽에서 메운다. Self-Attention은 하나로 공유해 시각과 언어와 action이 같은 맥락 안에서 소통하게 하되, 실제 지식 처리는 Vision-Language FFN과 Action FFN으로 나눠 정보 손실을 막는다. 여기에 단계별 학습 전략을 더해, 물리 공간에서 스스로를 개선하는 피드백 과정이 가능한 형태로 VLM을 옮기는 것이 목표다.

## 핵심 개념

### 통합 설계와 분리 설계

기존 VLA 모델은 지능과 행동 사이의 간극을 두 가지 구조로 다뤄 왔다. 원문은 WALL-OSS를 설명하기 전에 이 두 구조를 먼저 보여 주고, WALL-OSS를 둘 사이의 절충으로 놓는다.

| 구분 | 통합 설계(Unified Design) | 분리 설계(Decoupled Design) |
|---|---|---|
| 대표 모델 | RT-2, OpenVLA | π0 |
| 처리 방식 | 시각 언어 정보와 action 정보를 한데 모아 Self-Attention과 FFN을 함께 통과 | 시각 언어 정보와 action 정보를 나눠 Self-Attention과 FFN을 각각 통과 |
| 장점 | 두 정보가 강하게 결합되어 지시를 정교하게 반영 | VLM이 원래 갖고 있던 지능이 보존됨 |
| 한계 | action 학습 과정에서 VLM의 원래 가중치가 뒤섞여 시각 언어 이해 능력이 퇴화하는 weight drift 발생 | 시각 언어 정보와 action 제어의 결합이 느슨해 복잡한 지시를 정교하게 수행하기 어려움 |

WALL-OSS의 위치는 이 표의 중간이다. Self-Attention은 통합 설계처럼 공유해 결합을 유지하고, FFN은 분리 설계처럼 나눠 weight drift를 막는다. 원문은 이 구성을 mixture-of-experts로 소개한다. mixture-of-experts는 입력마다 일부 전문 모듈만 활성화하는 구조를 말한다.

### VQA와 embodied VQA

VQA는 이미지와 질문을 함께 입력받아 답을 내놓는 과제다. 이미지와 자연어를 동시에 이해하는 일반적인 VLM이 여기에 해당한다.

embodied VQA는 VQA를 로봇의 신체적 맥락으로 확장한 것이다. 이미지를 보고 답하는 데서 그치지 않고, 시각 이해와 언어 추론을 로봇이 실제로 움직일 공간에 연결한다. WALL-OSS는 embodied VQA로 공간 추론 능력을 키우며, 이 학습에 쓰이는 정답 데이터가 뒤에 나오는 2D 좌표 태그다.

### flow matching과 FAST tokenizer

flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다. WALL-OSS는 이 기법으로 연속적인 action을 직접 생성한다.

FAST tokenizer는 action chunk를 압축해 이산 토큰으로 적는 방식이다. π0-FAST에서 가져왔으며, 연속적인 로봇 움직임을 언어 모델이 단어처럼 다룰 수 있는 형태로 바꾸는 역할을 한다.

### CoT와 subtask

CoT는 모델이 최종 답을 내기 전에 중간 추론 과정을 텍스트로 적어 내는 방식이다. WALL-OSS에서는 이 추론이 별도 모듈이 아니라 같은 모델의 언어 생성 head에서 토큰으로 나온다.

subtask는 high-level 추론이 텍스트로 내놓는 중간 단계 명령이다. 예를 들어 침실을 정리하라는 지시문(instruction)이 들어오면, 모델은 어떤 물건을 먼저 집을지를 subtask 문장으로 적은 뒤 그에 맞는 action을 낸다.

## 모델 구조

WALL-OSS는 시각 언어 이해 능력을 유지하면서 정밀한 로봇 제어를 함께 수행하도록 구성된다. backbone 하나에 성격이 다른 FFN 두 종류와 출력 head 두 개가 붙는 형태다.

| 구성 요소 | 내용 |
|---|---|
| 메인 backbone | Qwen2.5-VL-3B를 VLM backbone으로 채택 |
| mixture-of-experts 구조 | 시각 언어 과제용 FFN과 action 과제용 FFN을 분리해 할당 |
| LM Head | CoT, subtask, 이산 action 토큰을 생성 |
| Flow Head | flow matching으로 연속 action을 생성 |

출력 head가 둘인 이유는 두 head가 서로 다른 성격의 출력을 맡기 때문이다. LM Head는 언어 모델처럼 토큰을 하나씩 내놓고, Flow Head는 로봇이 그대로 실행할 연속값을 낸다. 즉 같은 모델이 생각을 문장으로 적는 일과 팔을 움직일 수치를 내는 일을 함께 처리한다.

## 학습 파이프라인

학습은 VLM의 pre-training에 이어 Inspiration 단계와 Integration 단계 두 부분으로 진행된다. 앞 단계가 거친 감각을 갖추게 하고 뒤 단계가 정밀한 제어를 더하는 순서다.

### Inspiration 단계

Inspiration 단계의 목표는 로봇에게 필요한 공간 지능과 대략적인 action 감각을 함께 갖추게 하는 것이다. 아래 두 과정이 병렬로 진행되어 기존 VLM이 로봇의 신체적 맥락을 이해할 기초를 만든다.

첫째는 embodied VQA를 통한 공간 추론 강화다. 기존 VLM의 FFN을 그대로 재사용하면서 embodied VQA 데이터를 더해 공간 추론 능력을 키운다.

둘째는 이산 action 모델링이다. 로봇의 연속적인 움직임을 단어처럼 다루기 위해 π0-FAST의 action tokenization 기법을 가져온다. action tokenization은 연속값인 제어 명령을 정해진 구간으로 나눠 이산 토큰으로 바꾸는 기법이다. 원문은 FAST 알고리즘을 논문에 없는 세 단계로 나눠 풀이한다.

- DCT(Discrete Cosine Transform): 복잡한 움직임 데이터에서 핵심 특징만 추출한다.
- 양자화(Quantization): 연속적인 수치를 정해진 몇 개의 숫자로 줄인다.
- BPE(Byte Pair Encoding): 자연어 처리에서 단어를 subword로 나누듯, 자주 나타나는 동작 패턴을 하나의 동작 단어로 묶는다.

Inspiration 손실은 이산화된 토큰에 대한 손실이므로 cross-entropy 형태로 정의된다. 원문은 이 손실을 두 항과 하이퍼파라미터 하나로 나눠 읽는다.

| 구성 | 대상 | 역할 |
|---|---|---|
| 첫 번째 항 | τt(텍스트 토큰)와 c(CoT) | VQA 학습에 대한 손실 |
| 두 번째 항 | zk(action 토큰)와 c(CoT) | 이산 action 학습에 대한 손실 |
| λ | 두 항의 비중 | VQA 학습과 이산 action 학습 사이의 균형을 맞추는 하이퍼파라미터 |

이 단계를 마치면 모델은 어떤 상황에서 어떤 action을 해야 하는지에 대한 거친 action 인식(coarse action awareness)과 CoT 능력을 갖춘다.

### Integration 단계

Integration 단계에서는 이산 토큰 예측을 flow matching으로 대체해 로봇의 실제 움직임인 연속 trajectory를 직접 생성한다. trajectory는 observation과 action이 시간순으로 이어진 실행 기록이다.

노이즈 스케줄 함수가 이 단계의 출발점이다. x0는 노이즈가 완전히 제거된 정답 action이고, ε은 Gaussian noise 상태인 시작점이다. 두 점 사이를 잇는 비율 ρ를 0과 1 사이에서 균등하게 뽑지 않고 Beta 분포로 0쪽에 몰아 뽑는 것이 설계의 핵심이다.

원문은 이 편향을 "노이즈가 많은 초기 단계의 데이터를 더 많이 학습하도록 설계"한 것으로 읽는다. 논문 문장을 넘어선 해석인데, 같은 팀의 후속인 Wall-OSS-0.5가 이 편향을 Action-Space Supervision으로 이론화하므로 결과적으로 뒤이은 논문의 논지를 미리 짚은 셈이 됐다.

Integration 손실은 모델이 예측한 노이즈 제거 방향과 실제 방향의 차이로 정의된다. 세 기호가 각각 무엇을 가리키는지가 원문 해설의 중심이다.

| 기호 | 뜻 |
|---|---|
| xt | 현재의 노이즈 섞인 action 상태. 위 노이즈 스케줄 함수로 정의된다 |
| h | 시각 입력 v, 언어 지시문 x, 선택적 CoT c가 Self-Attention을 거쳐 결합된 멀티모달 문맥 |
| (ε − x0) | 무작위 noise에서 정답으로 가는 실제 방향과 속도 |

즉 모델이 예측한 제거 방향 vφ가 올바른 방향 (ε − x0)에서 얼마나 벗어났는지를 재고, 그 차이를 줄이는 방향으로 학습한다.

### static router와 두 단계 학습

WALL-OSS는 통합 과정을 안정시키기 위해 학습을 두 단계로 나누고, 그 사이에 static router를 둔다. static router는 어떤 feature를 어느 FFN으로 보낼지 고정된 경로로 정해 주는 장치로, action 관련 feature는 Action FFN으로, 시각 언어 관련 feature는 Vision-Language FFN으로 보낸다.

![[assets/jo-2026-wall-oss-vla-primer/fig05.png]]
*Figure 3: static router가 나누는 두 경로를 저자가 논문 Figure 3 위에 빨간 테두리로 표시한 도식. 왼쪽이 Vision-Language FFN 경로, 오른쪽이 Action FFN 경로다 (조인령 2026).*

| 단계 | 학습 대상 | 목적 |
|---|---|---|
| Phase 1 | VLM을 얼린 채 action head만 학습 | 이미 배운 공간 지식을 그대로 두고 정밀한 수치 제어 능력만 먼저 익힌다 |
| Phase 2 | VLM의 동결을 풀고 시각 이해와 action 제어를 함께 최적화 | static router가 feature를 고정 경로로 배분해 학습 불안정을 줄이고 시각 언어 지식과 물리 action 사이의 alignment를 정밀하게 맞춘다 |

이 도식은 원문에서 저자가 직접 손을 댄 유일한 그림이다. 논문 Figure 3 자체는 원 논문 페이지에 있으므로, 두 경로가 갈라지는 지점만 확인하려면 위 도식을 보는 편이 빠르다.

### Uni-CoT

Uni-CoT(Unified Cross-Level Chain-of-Thought)는 앞의 두 단계를 하나로 묶는 틀이다. 지시 이해에서 CoT로, CoT에서 subtask 계획으로, 다시 연속 action으로 이어지는 사슬이 단일 모델 안에서 미분 가능한 형태로 연결된다.

이 연결 덕분에 고차원 지시와 저차원 action 사이의 전환이 매끄럽고, asynchronous 실행과 병렬 제어가 가능해진다. 논문은 Integration 단계에서 학습한 action 예측과 Inspiration 단계에서 학습한 VQA를 동시에 최적화하는 통합 손실 함수를 제시하는데, 원문은 이 식의 기호 여덟 개를 하나씩 풀어 적는다.

| 기호 | 뜻 |
|---|---|
| v | 로봇 카메라로 들어오는 이미지나 영상 데이터 |
| x | 사용자가 내린 언어 지시문 |
| c | 선택적 CoT. 과제를 수행하기 위한 중간 추론 단계나 계획 |
| a1:T | 시간 T 동안 로봇이 취해야 할 연속 action의 정답값 |
| y | VQA 감독 신호. 환경에 대한 질문의 실제 정답 텍스트 |
| Fθ | Unified Predictor. v와 x와 c를 모두 고려해 로봇이 이동할 경로를 계산 |
| Hθ | Embodied-aware VQA Head. v와 x를 고려해 환경을 해석 |
| λ | action 학습과 VQA 학습 사이의 균형을 맞추는 하이퍼파라미터 |

통합 목적 함수는 두 항으로 갈린다. action 예측 손실은 모델이 예측한 움직임이 정답 trajectory와 얼마나 다른지를 재며, 입력에 c가 포함되어 있어 중간 추론을 거친 결과를 평가한다. embodied VQA 손실은 로봇이 현재 보고 있는 환경과 명령을 얼마나 잘 이해하는지를 잰다. 두 항을 한 모델에서 함께 최소화하기 때문에 고수준의 언어적 이해와 저수준의 물리 동작이 분리된 모듈로 나뉘지 않는다.

원문이 특히 강조하는 것은 c가 별도 모듈의 출력이 아니라는 점이다. c는 같은 end-to-end 모델의 언어 생성 head에서 토큰으로 나오며, 단순한 수치가 아니라 추론 과정과 subtask 계획을 담는다. 따라서 모델은 복잡한 과제를 수행할 때 자기 action의 방향을 스스로 구조화한다.

path-drop objective는 이 유연함을 만드는 학습 전략이다. 학습 중에 모델에게 때로는 c를 주고 때로는 c 없이 행동하게 유도한다. 그 결과 추론 시점에 모델이 과제 복잡도에 따라 중간 추론을 거칠지 즉각 행동할지를 스스로 결정한다.

논문에 없는 해석이 하나 붙는다. WALL-OSS가 추론과 실행을 병렬로 수행해 자기 action이 환경에 미친 영향을 시각 데이터로 곧바로 되받는 피드백 루프를 만들고, 오류가 나도 embodied VQA로 현재 상태를 다시 읽어 c를 고쳐 trajectory를 실시간 보정할 수 있다는 서술이다. 논문 본문에는 이만큼 강한 진술이 없으므로 글쓴이의 확장으로 읽는 것이 맞다.

## 데이터 전략

학습 데이터는 세 원천으로 구성된다. 원문은 논문과 같은 순서로 각 원천의 성격과 처리 방식을 적는다.

| 원천 | 구성 | 처리 |
|---|---|---|
| 자체 수집 action 데이터 | 사람이 실제 로봇을 제어해 모은 최고 품질 데이터. 주방 청소, 옷 정리, 모바일 집기와 배치, 조립 작업 등 | 정밀도와 일반화를 강조하는 short-horizon과 단계별 추론이 필요한 long-horizon 두 범주로 나누고, 사람이 검수해 동작 단계마다 세밀한 주석을 붙인다 |
| 오픈소스 action 데이터 | DROID, BC-Z, BRIDGE 등 | 로봇 형태와 좌표계와 단위가 서로 다르므로 정규화하고 재샘플링해 안정성을 높인 뒤 통합한다 |
| 멀티모달 VQA 데이터 | General VQA와 embodied VQA 두 스트림 | 언어 시각 능력을 보존하고 공간 시간 추론을 강화한다 |

### General VQA와 weight drift

General VQA 데이터는 action head를 직접 최적화하기보다 VLM이 원래 갖고 있던 인지 능력을 지키는 역할을 맡는다. 전체 데이터셋 규모가 1만 시간을 넘기 때문에 action 데이터에만 치우쳐 학습하면 VLM의 강점인 언어 이해와 상호작용 능력이 훼손되는 weight drift가 발생할 수 있다.

이를 막기 위해 action 데이터를 학습할 때 VQA 데이터를 일정 비율로 섞는다. 결과적으로 기존 시각 언어 backbone의 지식이 유지되며, 이 조치가 뒤에 나오는 처음 보는 물체 일반화 성능의 근거가 된다.

### embodied VQA의 좌표 태그

embodied VQA 데이터는 2D 좌표 형식의 정답을 쓴다. 텍스트로 된 명령을 이미지상의 구체적인 픽셀 위치와 연결하기 위해서다. 원문은 두 종류의 태그를 나눠 적는다.

| 태그 | 형식 | 가리키는 것 |
|---|---|---|
| `<box>` | [x1, y1, x2, y2] | 대상 물체의 bounding box. 좌상단과 우하단 좌표로 물체가 차지하는 전체 영역을 정의해 시각적 경계를 파악하게 한다 |
| `<point>` | [x, y] | 물체의 중심점이나 로봇 팔이 직접 닿아야 할 grasping 지점 같은 단일 픽셀. 여러 물체가 겹치거나 정밀 조작이 필요할 때 어디를 겨냥할지를 알려준다 |

두 태그를 다양한 물체에 대해 학습한 모델은 처음 보는 물체에도 대응할 수 있는 일반화 능력을 얻는다. 이 좌표 학습은 통합 손실 함수의 VQA 항을 통해 반영되며, 학습된 좌표 정보가 CoT 생성 시점에 "먼저 [x, y] 위치의 물체를 집는다" 같은 subtask 계획으로 이어진다는 것이 원문의 설명이다.

## 결과

평가는 세 가지 항목으로 나뉜다.

| 평가 항목 | 내용 |
|---|---|
| 단일 지시 과제(Single-instruction) | 기본적인 동작 정확도와 처음 보는 물체에 대한 적응력 |
| long-horizon | 5단계 이상의 순차 실행이 필요한 복잡한 과제 |
| 추론 집약 과제(Reasoning) | 물리 조작에 앞서 고도의 논리적 추론이 선행되어야 하는 과제 |

비교 대상은 Diffusion Policy와 π0다. 두 베이스라인은 WALL-OSS와 달리 중간 단계 안내를 필요로 하므로, 사람이 미리 나눠 둔 subtask 목록을 GPT-4가 실시간으로 하나씩 알려 주는 방식으로 조건을 맞췄다. 이 실험 설계를 원문이 짚어 둔 덕분에, 성능 차이가 subtask를 스스로 만드는 능력에서 나온다는 점이 분명해진다.

전반적으로 WALL-OSS는 모든 과제에서 더 높은 성능을 보인다. 특히 학습 때 보지 못한 새로운 물체에 대해 전부 61% 이상의 task progress를 달성했다. 즉 열 번 시도하면 평균적으로 과제의 6할 이상을 진행한다는 뜻이며, General VQA로 VLM backbone의 추론 능력을 지켜 둔 결과가 실제 로봇 행동으로 전이됐음을 보여 준다.

과제 종류별로 보면 차이가 나는 지점이 분명하다. Collect-Waste, Pick-Place-Cup, Place-by-color 같은 단일 지시 과제에서는 π0도 높은 성능을 낸다. 반면 long-horizon 과제인 tidy-bedroom과 추론 집약 과제인 block-spell처럼 고수준 판단이 필요하고 5분 이상 이어지는 실행에서는 WALL-OSS가 뚜렷하게 앞선다. subtask를 나눠 지시하지 않았는데도 실행을 이어 간다는 점에서, 움직임만 배운 것이 아니라 현재 어느 단계인지 파악하는 능력까지 갖췄다고 원문은 해석한다.

논문의 Table 2(embodied VQA 벤치마크)와 Table 3(block-spell 지시 이행 정확도)은 이 해설에 나오지 않는다. co-training 효과의 정량 근거를 확인하려면 [[physical-ai/zhai-2025-igniting-vlms-toward-the-embodied]] 쪽을 참고한다.

## 한계

원문은 논문의 한계 서술을 세 항목으로 옮긴다.

- 2D 지시 alignment와 대규모 pre-training으로 개방형 환경의 일반화와 지시 이행 능력은 크게 올랐으나, 고수준 의미 이해가 아니라 미세하고 정밀한 물리 조작 제어 관점에서는 한계가 남는다.
- 정렬된 3D 데이터 자체가 극도로 희소하다는 데이터셋 차원의 제약이 있다. 공개된 3D 비전 foundation model도 로봇이 정교한 action을 예측하고 실행하는 데 필요한 공간 정확도를 충족하지 못한다.
- Uni-CoT와 동적 subtask 계획 생성으로 다단계 과제의 안정성과 성공률은 크게 개선됐지만, 이 계획 능력은 전체 학습 프레임의 1% 수준에 불과한 CoT와 subtask 감독 신호에 의존해 함께 학습된 결과다. 따라서 실행 시간이 3분에서 5분을 넘고 공간 복잡도가 높은 과제에서는 성능이 떨어진다.

읽을 때 두 가지를 감안한다. 첫째, 정밀 manipulation에서 π0가 여전히 앞선다는 논문의 자기 평가는 이 해설에 옮겨지지 않았다. 둘째, 세 번째 항목의 1%는 논문의 fine-tuning 단계 라벨 비율이므로 pre-training 전체의 한계로 읽으면 안 된다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Uni-CoT | 지시 이해, CoT, subtask 계획, 연속 action을 단일 모델 안에서 미분 가능하게 잇는 통합 틀 |
| static router | action feature는 Action FFN으로, 시각 언어 feature는 Vision-Language FFN으로 고정 경로 배분하는 장치 |
| weight drift | action 학습 과정에서 VLM의 원래 가중치가 뒤섞여 기존 시각 언어 이해 능력이 퇴화하는 현상 |
| path-drop objective | 학습 중 c를 주는 경우와 주지 않는 경우를 섞어, 추론 시점에 중간 추론 여부를 모델이 스스로 정하게 만드는 전략 |
| coarse action awareness | Inspiration 단계를 마친 모델이 갖추는 거친 action 인식. 어떤 상황에서 어떤 action을 할지에 대한 대략적 감각 |
| 비구체화(disembodied) | 물리적 실체 없이 텍스트와 이미지만 다루는 상태를 가리키는 원문의 표현 |

## 관련 페이지

- [[physical-ai/zhai-2025-igniting-vlms-toward-the-embodied]]: 이 페이지가 해설하는 원 논문. 표와 한계 서술은 원 논문 페이지가 온전하다.
- [[physical-ai/x-square-robot-wall-x]]: WALL-OSS의 공식 구현 저장소. 원문 참고문헌의 두 번째 항목이다.
- [[physical-ai/x-square-robot-2026-wall-oss-05-technical-report]]: 이 해설이 다루지 않는 후속 모델. 두 단계 커리큘럼이 단일 단계 co-training으로 바뀐다.
- [[physical-ai/jo-2026-pi-0-6-vla-primer]]: 같은 시리즈의 이웃 글. flow matching과 action expert 설명이 이 글보다 먼저 나온다.
- [[physical-ai/jo-2026-smolvla-vla-primer]]: 같은 시리즈의 이웃 글. VLM backbone을 줄여 경량화하는 반대 방향의 선택을 다룬다.
- [[physical-ai/jo-2026-openvla-vla-primer]]: 같은 시리즈의 앞선 글. 통합 설계 계열의 대표 모델을 다룬다.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
