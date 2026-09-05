---
title: "🤖 [실리콘밸리 RFM 기술 및 현황] 2편 VLM & VLA란 무엇이며, 어떤 구조로 변화해 왔는가"
type: article
year: 2026
category: physical-ai
source: kim-2026-silicon-valley-rfm-part-2.md
raw_path: raw/articles/kim-2026-silicon-valley-rfm-part-2.md
raw_filename: "kim-2026-silicon-valley-rfm-part-2.md"
source_collection: external
author: "Kyungyul Kim, Jiyoon Kim"
url: "https://www.linkedin.com/pulse/%EC%8B%A4%EB%A6%AC%EC%BD%98%EB%B0%B8%EB%A6%AC-rfm-%EA%B8%B0%EC%88%A0-%EB%B0%8F-%ED%98%84%ED%99%A9-2%ED%8E%B8-vlm-vla%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B4%EB%A9%B0-%EC%96%B4%EB%96%A4-%EA%B5%AC%EC%A1%B0%EB%A1%9C-%EB%B3%80%ED%99%94%ED%95%B4-%EC%99%94%EB%8A%94%EA%B0%80-kyungyul-kim-gb1we/"
publisher: "LinkedIn"
tags: [physical-ai, vla, robot-learning]
---

## 요약

VLM에서 VLA로 이어지는 개념을 LLM의 next-token prediction 원리에서 출발해 풀고, VLA의 대표 구조 두 가지가 왜 갈라졌는지를 정리한 LinkedIn 연재 2편이다(Kyungyul Kim, Jiyoon Kim, 2026-08-07). next-token prediction은 이전 토큰들로 다음 토큰을 맞히는 학습 목표를 말한다. 1편이 실리콘밸리 RFM 스타트업의 사업 구조와 투자 생태계를 다뤘다면, 2편은 그 사업을 떠받치는 기술 구조 쪽으로 들어간다.

글이 겨냥하는 독자는 Physical AI 영역의 Robot Intelligence 기술을 직접 R&D할지 외부에서 도입할지 판단해야 하는 Enterprise다. 따라서 서술의 목표는 논문 수준의 수식 전개가 아니라, VLA 구조에서 어느 영역이 오픈소스이고 어느 영역이 각 기업의 실제 차별화 지점인지를 구분하게 만드는 데 있다. 이 저장소가 이미 보유한 RT-2, OpenVLA, GR00T N1 같은 원 자료를 개념 쪽에서 잇는 다리 역할을 한다.

## 배경

이 글은 1편이 남긴 질문에서 출발한다. 1편은 실리콘밸리 RFM 스타트업들이 pre-training부터 데이터 제작과 평가까지 학습 전 과정을 직접 수행한다고 정리했는데, 그 전 과정이 모델의 어느 부분을 가리키는지는 기술 구조를 봐야 답할 수 있다. pre-training은 대규모 일반 데이터로 모델의 기반 능력을 먼저 학습하는 단계다.

저자들이 반복해서 지적하는 문제는 기술 실체와 마케팅 비전 사이의 간극이다. RFM을 직접 만든다고 발표하는 기업이 실제로 학습하는 범위가 어디까지인지 외부에서는 구분하기 어렵다. 따라서 이 편은 VLA의 내부 구조를 먼저 세우고, 그 구조도 위에서 학습이 일어나는 영역이 어디인지 짚는 순서로 전개된다.

구성은 두 Section이다. Section 1은 LLM이 문장을 만드는 원리에서 출발해 VLM과 VLA의 개념을 세우고, Section 2는 VLA의 대표 구조 두 가지와 그 변화 흐름을 다룬다.

## 핵심 개념

### 다음 단어 예측에서 출발하는 계보

LLM은 다음에 올 단어를 확률적으로 예측하며 문장을 만든다. "오늘"에서 "저녁은", "파스타가", "어떨까요"로 한 단어씩 이어 붙이는 방식이다. 이 능력은 인터넷에 있는 수조 개 규모의 토큰을 읽으며 어떤 단어 다음에 어떤 단어가 올 확률이 높은지를 학습한 결과다.

VLM은 여기에 이미지를 더한 모델이다. 인터넷의 텍스트와 이미지를 함께 학습해 "사과는 과일이다", "컵은 잡을 수 있다", "깨지기 쉬운 물건은 조심해야 한다" 같은 시각과 언어에 걸친 상식을 갖춘다.

VLA는 VLM이 갖춘 이해 능력 위에 로봇 움직임 생성을 결합한 모델이다. 로봇의 카메라 이미지와 자연어 지시문(instruction)을 입력받아 로봇의 물리적 action을 직접 출력하는 end-to-end 모델을 가리킨다. action은 로봇에게 전달되는 제어 명령값을 말한다.

### VLA의 핵심 트릭

VLA의 핵심 아이디어는 로봇의 움직임을 숫자로 바꿔 단어처럼 취급하는 데 있다. 로봇 팔의 움직임은 "앞으로 3cm, 오른쪽으로 1cm, 아래로 2cm 움직이고 그리퍼를 벌려라"처럼 숫자로 적을 수 있고, 모델 입장에서 이 숫자를 내놓는 일은 단어를 하나 더 예측하는 일과 다르지 않다. 그리퍼는 물체를 집는 end-effector의 한 형태다.

| 모델 | 입력 | 예측 대상 | 출력 예시 |
|---|---|---|---|
| LLM | 텍스트 | 다음 단어 | "오늘 날씨가" → "좋다" |
| VLA | 카메라 영상과 지시문 | 다음 action | [카메라 영상] + "빨간 컵을 집어" → "82 38 105 ..." |

즉 예측 대상이 단어에서 로봇 팔의 움직임을 나타내는 숫자로 바뀌었을 뿐, 예측이라는 메커니즘 자체는 그대로다.

### VLA가 다루는 세 modality

modality는 모델이 다루는 정보의 종류를 뜻한다. VLA라는 이름이 그대로 세 modality를 가리킨다.

| modality | 역할 | 예시 |
|---|---|---|
| Vision | 로봇이 보는 것 | RGB 카메라의 이미지 또는 비디오 프레임 |
| Language | 사람이 로봇에게 말하는 것, 그리고 로봇이 생각하게 만드는 것 | "빨간 컵과 테이블이 있는 장면을 보고 컵을 테이블 위에 놓아야 한다"까지의 판단 |
| Action | 로봇이 실제로 하는 것 | 관절 각도, end-effector 위치, 그리퍼의 개폐 여부 |

## VLA의 세 단계

글은 VLA의 동작을 본다, 이해하고 추론한다, 행동한다의 세 단계로 나눠 설명한다. 이 세 단계가 하나의 모델 안에서 끊김 없이 일어나도록 만든 것이 VLA다.

### 본다

로봇에 부착된 카메라가 현재 장면을 촬영하고, 모델이 "테이블 위에 빨간 컵, 파란 접시, 바나나가 있다"처럼 장면 속 물체를 인식한다. 스마트폰 사진 검색에서 "강아지"를 입력하면 강아지 사진을 찾아주는 것과 같은 종류의 인식이다.

### 이해하고 추론한다

이 단계에서 모델은 지시문의 표면적 뜻만 파악하는 데 그치지 않고, 인터넷에서 배운 상식을 동원해 무엇을 어떻게 해야 하는지를 스스로 판단한다. 글은 세 가지 추론 유형을 예시와 함께 든다.

- 상식 추론: "가장 건강한 간식을 접시에 올려줘"라는 지시문에 대해, 테이블 위의 초콜릿, 바나나, 과자 중 바나나를 고른다. "건강한 간식"은 로봇 학습 데이터에 없는 표현이지만, 인터넷의 수많은 건강 관련 글에서 이미 얻은 상식이 그 판단을 채운다.
- 논리 추론: "이 중에서 36의 제곱근에 가장 가까운 숫자가 적힌 물체를 집어"라는 지시문에 대해, 36의 제곱근이 6임을 계산하고 물체에 적힌 3, 6, 9 가운데 6을 고른다. 수학 문제 풀이와 물체 인식과 로봇 동작을 하나의 모델이 끊김 없이 이어서 수행한 점이 기존 모듈 조합 파이프라인과의 차이다.
- 단계적 추론: "테이블을 정리해줘"라는 지시문에 대해, 음식물 쓰레기를 버리고, 빈 접시를 싱크대로 옮기고, 마지막으로 컵을 싱크대로 옮기는 순서를 스스로 만든다. 이렇게 중간 사고 과정을 거쳐 순서를 정하는 방식을 chain-of-thought 추론이라 부른다.

세 예시의 근거는 하나로 모인다. 로봇 전용 데이터에서는 "건강한 간식"이나 "제곱근" 같은 개념을 배울 수 없지만, 인터넷 규모의 텍스트와 이미지에서 얻은 상식이 그 빈자리를 채운다.

다만 글은 이 대목에 분명한 유보를 단다. 위 예시들은 RT-2 등에서 보고된 emergent capability 실험 구성을 참고한 것이다. emergent capability는 학습 데이터에 없던 조합을 모델이 실행해내는 성질을 말한다. 이 능력은 대부분 제한된 실험 환경에서 확인됐고 성공률도 완전하지 않다. 따라서 실제 산업 환경에서 같은 수준의 일반화가 이뤄지는지는 별개 문제이며, 저자들은 1편에서 말한 기술 실체와 마케팅 비전 사이의 간극이 가장 크게 벌어지는 지점이 바로 여기라고 본다.

### 행동한다

모델은 장면과 지시문을 이해한 뒤 "바나나를 향해 팔을 뻗고, 잡고, 접시로 옮기고, 놓기"에 해당하는 일련의 action을 숫자로 출력한다. 출력 형태는 "82 38 105 26 91 12 201 ..." 같은 관절 제어 숫자의 나열이다. 로봇은 이 숫자를 받아 관절을 움직이는 코드를 호출해 실행한다.

## 두 구조의 분기

### 사람 뇌의 역할 분담 비유

글은 VLA의 두 구조를 설명하기 위해 사람이 컵을 집는 상황을 먼저 든다. 뇌를 보는 관점을 두 가지로 나누면 두 구조가 그대로 대응된다.

| 관점 | 내용 | 대응하는 VLA 구조 |
|---|---|---|
| 하나의 뇌가 전부 처리한다 | 보고, 이해하고, 손을 움직이는 일이 모두 하나의 통합된 과정으로 일어난다 | Single Model |
| 생각하는 뇌와 움직이는 뇌가 따로 있다 | 전두엽은 느리지만 깊이 생각하고, 소뇌는 빠르고 정밀하게 움직임을 만든다 | Dual System |

두 번째 관점의 근거는 일상 경험이다. 사람은 컵을 집을 때 손가락을 몇 도로 굽힐지, 팔꿈치 각도를 얼마로 할지 의식적으로 계산하지 않는다. 그 계산은 거의 자동으로 일어난다.

### Single Model 구조

Single Model은 VLA가 처음 제시된 형태다. RT-2가 2023년 Google DeepMind에서 제안됐고, 이를 기반으로 Stanford가 오픈소스 구현을 만든 프로젝트가 2024년 OpenVLA다.

이 구조의 철학은 이미 인터넷에서 똑똑해진 언어 모델에게 로봇의 눈과 손까지 가르치자는 것이다. 이미지, 사람의 지시문, 로봇의 action 세 가지 입력이 전부 토큰으로 변환되어 하나의 LLM에 들어간다.

| 입력 | 변환 도구 | 하는 일 |
|---|---|---|
| Vision Token | Vision Encoder 2개 | 이미지 한 장을 수십 개의 토큰으로 바꾼다 |
| Text Token | Text Tokenizer | 문장을 최소 단위로 쪼개 미리 정의된 사전의 정수 번호로 치환한다 |
| Action Token | 256구간 이산화 | 연속값인 로봇 움직임을 정수로 바꿔 언어 모델 단어장에 새 단어로 등록한다 |

**Vision Token.** OpenVLA 기준 구조도에는 Vision Encoder가 두 개 나란히 놓인다. 두 인코더가 서로 다른 질문에 답하기 때문이다.

| Vision Encoder | 제작 | 파악 대상 | 읽어내는 정보 |
|---|---|---|---|
| SigLIP (semantic) | Google, 오픈소스 | 이게 무엇인지 | 이미지 속 물체의 이름과 의미 |
| DINO (spatial) | Meta, 오픈소스 | 이게 어디 있는지 | 물체의 위치와 모양, 서로를 향한 방향 관계 |

"가지를 그릇에 담아라"라는 지시문을 수행하려면 무엇을 집어야 하는지와 그것이 어디에 있는지를 모두 알아야 한다. 앞의 판단은 SigLIP이, 뒤의 판단은 DINO가 맡는다. 두 인코더의 결과가 합쳐져 Vision Token이 되고, 이미지 한 장이 수십 개의 토큰으로 바뀌어 LLM에 들어간다.

**Text Token.** "Put eggplant in bowl" 같은 지시문은 Text Tokenizer를 거쳐 ["Put", "egg", "plant", "in", "bowl"]로 쪼개지고 다시 [1234, 4567, 9991, 345, 4625] 같은 정수로 바뀐다. 이 과정은 의미를 이해하는 단계가 아니라 번호를 매기는 단계이고, 실제 이해는 LLM 내부에서 일어난다.

**Action Token.** 이 부분이 VLA의 가장 독창적인 아이디어다. 로봇의 움직임은 "앞으로 0.32cm, 오른쪽으로 0.15cm, 아래로 0.41cm"처럼 연속값인데, 이 값을 256개 구간으로 나눠 정수로 바꾼다. 그러면 "82"라는 숫자 하나가 앞으로 얼마나 움직일지를 나타내는 토큰이 된다.

이 숫자들을 언어 모델의 기존 단어장에 새 단어로 등록하고 나면, 모델 입장에서 "82"는 "apple"과 같은 종류의 단어다. 차이는 그 토큰이 로봇의 관절 움직임을 뜻한다는 점뿐이다. 이 256구간 이산화는 RT-1이 확립한 action tokenization 기법을 그대로 물려받은 것이다. action tokenization은 연속값인 제어 명령을 정해진 구간으로 나눠 이산 토큰으로 바꾸는 기법이다.

**중앙 처리와 출력.** 세 종류의 토큰은 하나의 긴 sequence로 이어져 LLaMA, GPT, Qwen 계열의 LLM에 입력된다. 모델은 이 sequence를 self-attention으로 처리해 각 토큰이 다른 모든 토큰과 관계를 맺게 하고, 그 결과로 Action Token을 한 개씩 순차 생성한다. ChatGPT가 단어를 한 개씩 생성하는 것과 완전히 같은 원리이며, 출력이 단어 대신 숫자라는 점만 다르다.

생성된 토큰은 아직 숫자 상태이므로 구조도 오른쪽의 Action Head가 실제 물리량으로 되돌린다. 별도로 학습되는 모델이라기보다 단순한 변환에 가깝다. 예를 들어 토큰 "82"는 82를 256으로 나눈 뒤 로봇 팔의 움직임 범위를 곱해 0.320cm가 되고, 이 값이 로봇 하드웨어를 구동하는 SDK에 변수로 들어간다.

**한계.** Single Model의 근본적인 한계는 움직임이 정교하지 못하다는 점이다. LLM이 단어를 한 개씩 적듯 Action Token도 한 개씩 생성하다 보니 한 번에 빠르게 움직이기 어렵고, 빨래 접기나 에스프레소 머신 조작처럼 부드럽게 이어지는 섬세한 작업을 표현하지 못한다.

### Dual System 구조

Dual System은 이 한계를 넘기 위해 등장했고, 해법은 사람의 뇌처럼 역할을 나누는 것이다. Physical Intelligence, Figure, NVIDIA 등 RT-2와 OpenVLA 이후 대부분의 기업이 이 구조를 택했다.

| 구분 | System 2 | System 1 |
|---|---|---|
| 담당 | 인식, 이해, 추론 | action 생성과 제어 |
| 구현 | Vision Encoder가 통합된 VLM | Diffusion Transformer, 곧 DiT |
| 하는 일 | 이미지를 보고 지시문을 이해해 계획을 세운다 | System 2의 판단을 받아 실제 관절 움직임을 만든다 |
| 뇌 비유 | 전두엽 | 소뇌 |

**System 2.** Single Model에서는 LLM이 이미지를 이해하지 못해 앞단에 별도의 Vision Encoder를 두고 Vision Token으로 바꿔 넣어야 했다. 이후 LLM이 multi-modal로 확장되면서 Vision Encoder가 합쳐진 형태로 학습된 VLM이 공개됐고, 그 시점의 LLM은 이미 추론 능력을 갖추고 있었다. Dual System은 이 VLM을 System 2로 쓴다.

역할을 이해와 계획까지로 제한하는 데는 분명한 이유가 있다. Single Model처럼 LLM에게 로봇 action 생성까지 맡기면 원래 갖고 있던 언어 능력이 조금씩 손상되거나 변형된다. catastrophic forgetting은 새 학습이 기존 능력을 지워버리는 현상을 말한다. 따라서 System 2는 이미지를 보고 지시문을 파악해 계획을 세우는 데까지만 하고, 그 결과물인 압축된 임베딩을 System 1로 넘긴다.

**System 1.** System 1의 주요 모듈인 DiT는 세 가지를 입력으로 받는다. DiT는 diffusion 모델의 denoising 신경망을 Transformer로 구현한 구조다.

| 입력 | 출처 | 역할 |
|---|---|---|
| Generated VLM Embeddings | System 2 | "이런 상황이고 이렇게 해야 한다"는 판단 신호. 전두엽이 소뇌에 의도를 전달하는 것에 해당한다 |
| Robot State | 로봇 하드웨어 | 각 관절이 몇 도로 꺾여 있는지, end-effector가 얼마나 열려 있는지 같은 현재 상태 값 |
| Noised Action | 무작위 숫자 생성 | 아직 의미가 없는, 노이즈로 가득 찬 가짜 action |

Robot State가 필요한 이유는 명확하다. "팔을 왼쪽으로 10cm 움직여라"라는 판단을 받아도 현재 팔이 어디 있는지 모르면 어디로 움직일지 계산할 수 없다. Robot State는 학습 단계에서 teleoperation으로 수집한 시연 데이터(demonstration)에 이미지, 지시문, action과 함께 기록되어 학습 데이터의 한 항목으로 들어간다. teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다.

한편 Robot State는 System 2에는 들어가지 않는다. VLM은 시각 정보와 지시문으로 무엇을 해야 하는지를 판단하는 고차원 사고를 맡는 곳이고, 관절 각도를 계산하는 곳이 아니기 때문이다. 관절 각도 수준의 계산은 System 1의 관할이다.

Noised Action의 역할은 이미지 생성 모델에 비유하면 이해하기 쉽다. DALL-E나 Midjourney 같은 모델은 완전히 무작위인 노이즈에서 시작해 조금씩 노이즈를 걷어내며 형태를 드러내고 마지막에 완성된 이미지를 만든다. DiT도 같은 방식으로 노이즈 상태의 가짜 action에서 출발해, System 2가 내려준 판단과 Robot State를 참고하며 반복적으로 노이즈를 걷어내 진짜 action을 만들어낸다.

### Diffusion Transformer와 flow matching

로봇의 action 값은 이산값이 아니라 부드럽게 이어지는 연속값이다. AI 영역에서 연속값을 가장 잘 생성하는 방법이 diffusion이고, 그래서 System 1에 Diffusion Transformer가 쓰인다.

diffusion 기반 생성의 기본 원리는 2020년 Ho et al.의 DDPM에서 정립됐지만 속도가 문제였다. flow matching은 noise에서 목표 분포로 가는 연속 변환의 속도장을 학습하는 생성 기법으로, 같은 품질의 결과를 훨씬 적은 step으로 만들어 이 문제를 풀었다.

| 기법 | 발표 | 필요한 step 수 | 로봇 제어 적합성 |
|---|---|---|---|
| DDPM | 2020, Ho et al. | 고품질 생성에 50~1000 step의 반복 denoising | 실시간성이 중요한 로봇 제어에는 부담 |
| flow matching | 2022, Lipman et al., Meta AI | 5~10 step | 실시간에 가까운 action 생성 가능 |

step 수가 50~1000회에서 5~10회로 줄었다는 것은 같은 결과를 내는 데 필요한 반복 연산이 최소 열 배 가까이 줄었다는 뜻이다. 이후 OpenAI, Google, Stability AI, FLUX 같은 이미지와 비디오 생성 기업들이 Diffusion Transformer 구조에 flow matching을 적용해 학습하는 조합을 널리 채택했고, 같은 조합이 VLA의 System 1에도 그대로 들어왔다.

글은 이 대목에서 흔한 오해 하나를 명시적으로 반박한다. Diffusion Transformer와 flow matching이 추론을 가능하게 한다는 설명은 틀렸다. 이 조합은 연속값인 로봇 action을 실시간에 가깝게 생성하기 위한 도구이고, 추론 능력 자체는 System 2인 VLM에서 온다.

### 두 구조의 비교

| 항목 | Single Model | Dual System |
|---|---|---|
| 처리 흐름 | 보고, 이해하고, 행동한다 | 보고, 이해하고 계획을 세우고 추론하고, 행동한다 |
| 담당 모델 | 하나의 LLM | System 2인 VLM과 System 1인 DiT |
| action 생성 방식 | Action Token을 한 개씩 순차 생성 | 노이즈에서 반복적으로 걷어내며 생성 |
| 제안 시점 | 2023년 RT-2, 2024년 OpenVLA | RT-2와 OpenVLA 이후 |
| 대표 주체 | Google DeepMind, Stanford | Physical Intelligence, Figure, NVIDIA |
| 글이 지적한 한계 | 정교하고 빠르게 이어지는 움직임을 표현하기 어렵다 | 글에서 별도로 지적하지 않는다 |

## 학습 가능 영역과 실리콘밸리의 전략

VLA 구조도에서 파란색으로 표시된 학습 가능 영역이 이 글의 결론이 놓인 자리다. 실리콘밸리의 Robot Intelligence 스타트업 대부분은 이미 수십억 장의 이미지와 수조 개의 텍스트로 학습된 오픈소스 모델과 학습 알고리즘을 조합하고, 여기에 일부 변경이나 차별화 알고리즘을 더해 VLA를 만든다. 이들은 그 결과물을 자사의 RFM이라고 부른다.

핵심은 VLM과 LLM 부분을 직접 학습하지 않는다는 점이다. Big-tech가 공개한 VLM과 LLM은 이미 최적의 상태로 학습된 모델이라, 잘못 건드리면 원래 잘하던 능력까지 잃는 catastrophic forgetting이 일어난다. 그래서 스타트업들은 이 부분을 고정해 둔 채, teleoperation으로 모은 이미지와 지시문과 action 쌍으로 로봇 action을 생성하는 법만 가르친다. 글은 이 영역을 pre-training이 일어나는 영역으로 정의한다.

| 구분 | VLM과 LLM의 출처 | 학습 대상 | 근거 |
|---|---|---|---|
| 실리콘밸리 RFM 스타트업 | 오픈소스를 가져와 고정 | 로봇 데이터로 학습하는 영역만 | 잘못 학습하면 catastrophic forgetting이 발생한다 |
| Google DeepMind, Tesla, NVIDIA | 직접 만든 모델 사용 | VLM과 LLM을 포함한 구조 전체 | 자금, GPU, 데이터, 고급 인력 자원을 보유했다 |

이 대비가 1편의 서술을 구체화한다. 1편이 말한 학습 전 과정을 직접 수행한다는 표현이 가리키는 것은 VLM과 LLM 자체가 아니라, 그 위에 로봇 데이터로 학습하는 좁지만 핵심적인 영역이다. 저자들은 어느 영역이 오픈소스이고 어느 영역이 각 기업의 실제 차별화 지점인지 구분할 수 있어야 기술의 실체와 마케팅으로 제시된 비전 사이의 간극을 판단할 수 있다고 결론짓는다.

### 글이 언급한 모델과 구성 요소

| 이름 | 주체 | 시점 | 구조상 위치 | 글이 밝힌 공개 범위 |
|---|---|---|---|---|
| RT-2 | Google DeepMind | 2023 | Single Model의 원형 | 논문으로 제안 |
| OpenVLA | Stanford 외 | 2024 | Single Model의 오픈소스 구현 | 오픈소스 |
| SigLIP | Google | 명시 없음 | Vision Encoder (semantic) | 오픈소스 |
| DINO | Meta | 명시 없음 | Vision Encoder (spatial) | 오픈소스 |
| LLaMA, GPT, Qwen | 명시 없음 | 명시 없음 | Single Model 중앙의 LLM | 명시 없음 |
| DDPM | Ho et al. | 2020 | diffusion 생성의 기본 원리 | 논문 |
| flow matching | Lipman et al., Meta AI | 2022 | System 1의 학습 기법 | 논문 |

## 한계

이 글의 한계는 자료 성격과 수집 과정 양쪽에서 나온다.

- 정량 벤치마크가 없다. 개념과 구조를 설명하는 글이라 수치 대신 프레이밍이 산출물이고, 두 구조의 성능 차이를 숫자로 비교하는 대목은 없다.
- emergent capability 예시는 RT-2 등 원 논문에서 보고된 실험 구성을 재인용한 것이라 저자 자신의 검증이 아니다. 글도 이를 제한된 실험 환경이라는 유보로 감싼다.
- Dual System의 구체적 모델명을 밝히지 않는다. "Physical Intelligence, Figure, NVIDIA 등 대부분의 기업들"로만 언급해 개별 아키텍처 차이는 이 글만으로 알 수 없다. 이 저장소가 보유한 GR00T N1과 π0가 그 빈자리를 구체 사례로 메운다.
- 본문 설명의 중심인 VLA Single Model 구조도와 Dual System 구조도가 수집 시점에 LinkedIn 로그인 화면에 가려 캡처되지 않았다. 따라서 이 페이지는 구조도 없이 산문과 표로만 재구성했다.
- 3편 예고는 글 안에서 확인되지 않는다. 후속 편 발행 여부는 별도 확인이 필요하다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Single Model | Vision Token, Text Token, Action Token을 하나의 LLM sequence로 이어 처리하는 VLA 구조. RT-2와 OpenVLA가 대표 사례다 |
| Dual System | 이해와 추론을 맡는 System 2인 VLM과 action 생성을 맡는 System 1인 DiT로 역할을 나눈 VLA 구조 |
| Action Token | 로봇의 연속 action 값을 256개 구간으로 나눠 정수로 바꾼 뒤 언어 모델 단어장에 새 단어로 등록한 토큰 |
| Action Head | Action Token을 실제 물리량으로 되돌리는 변환 장치. 학습되는 모델이 아니라 단순 변환에 가깝다 |
| Robot State | 관절 각도와 end-effector 개폐 정도 같은 로봇의 현재 상태 값. System 1에만 입력된다 |
| catastrophic forgetting | 새 학습이 기존 능력을 지워버리는 현상. RFM 스타트업이 VLM과 LLM을 고정해 두는 이유다 |

## 관련 페이지

- [[physical-ai/kim-2026-silicon-valley-rfm-part-1]]: 같은 연재의 1편. 1편은 RFM 스타트업의 사업 구조와 투자 생태계, Full-stack 전략을 다루고, 이 2편은 그 전략을 떠받치는 VLA의 기술 구조와 학습 가능 영역을 다룬다.
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]]: Single Model 구조의 원형인 RT-2 원 논문.
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]]: 이 글이 Single Model의 오픈소스 구현으로 든 OpenVLA 원 논문. SigLIP과 DINOv2를 함께 쓰는 Vision Encoder 구성을 논문 수준에서 확인할 수 있다.
- [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]]: Action Token의 256구간 이산화를 확립한 RT-1.
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: Dual System의 구체 사례. Eagle-2 VLM을 System 2로, flow matching 기반 DiT를 System 1로 두고 cross-attention으로 잇는다.
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]: 이 글이 Dual System 채택 기업으로 든 Physical Intelligence의 π0. flow matching으로 action을 생성하는 구조를 논문 수준에서 볼 수 있다.
- [[physical-ai/figure-ai-2025-helix-a-vision-language-action]]: 같은 목록의 Figure가 공개한 Helix. System 2와 System 1을 서로 다른 주기로 구동하는 구성이다.
- [[physical-ai/cui-2025-openhelix-a-short-survey-empirical]]: dual-system VLA를 정의와 실험으로 정리한 서베이. 이 글의 Dual System 서술에 판정 기준을 더해 준다.
- [[physical-ai/sa-2026-vision-language-action-models-for]]: action head를 autoregressive, flow, diffusion, hybrid 계열로 분류한 기술 서베이. Single Model과 Dual System 구분과 맞물린다.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
