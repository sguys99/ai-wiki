---
title: "Vision-and-Language Navigation Today and Tomorrow: A Survey in the Era of Foundation Models"
type: paper
year: 2024
category: physical-ai
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/zhang-2024-vision-and-language-navigation-today.pdf
raw_filename: "zhang-2024-vision-and-language-navigation-today.pdf"
source_collection: external
source: zhang-2024-vision-and-language-navigation-today.md
authors: "Yue Zhang, Ziqiao Ma, Jialu Li, Yanyuan Qiao, Zun Wang, Joyce Chai, Qi Wu, Mohit Bansal, Parisa Kordjamshidi"
arxiv_id: "2407.07035"
tags: [physical-ai, world-model, mobile-robot, spatial-reasoning]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/zhang-2024-vision-and-language-navigation-today/fig01.png
    raw: raw/papers/zhang-2024-vision-and-language-navigation-today-figures/fig01.png
    caption: "LAW framework로 본 VLN 구조 — world model · human model · VLN agent 삼분과 그 사이를 잇는 grounding & reasoning / planning / dialogue (Figure 1, p.2)"
    page: 2
    bbox_norm: [0.4902, 0.1536, 0.8926, 0.4048]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/zhang-2024-vision-and-language-navigation-today/fig02.png
    raw: raw/papers/zhang-2024-vision-and-language-navigation-today-figures/fig02.png
    caption: "서베이 전체 taxonomy — 세 모델별 challenge 5개와 그 아래 해법 13갈래, foundation model의 역할 4분류(Data and Knowledge · Representation · Decision Making · Task Learning), 미래 과제 5항 (Figure 2, p.5)"
    page: 5
    bbox_norm: [0.1078, 0.0958, 0.8922, 0.3869]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/zhang-2024-vision-and-language-navigation-today/tab01.png
    raw: raw/papers/zhang-2024-vision-and-language-navigation-today-figures/tab01.png
    caption: "VLN 벤치마크 24종 분류표 — world(domain·environment) · human(turn·format·granularity) · agent(type·action space·other) · dataset collection(text·route) 축 (Table 1, p.3). 캡션 정규식이 본문 교차참조를 잡은 자리라 자동 캡션은 오탐이었고 실제 내용은 Table 1"
    page: 3
    bbox_norm: [0.1246, 0.0986, 0.8754, 0.3941]
    strategy: table-region
    curated: true
---

## 요약 (Summary)

Michigan State·UMich·UNC·Adelaide 4개 기관이 쓴 VLN(Vision-and-Language Navigation) 서베이다. 기존 VLN 리뷰가 pre-foundation-model 시대의 벤치마크·기법 정리에 머문 데 반해, 이 논문은 Hu & Shu(2023)의 LAW framework를 빌려 world model · human model · VLN agent 세 축으로 challenge를 나누고 각 축에서 foundation model이 무엇을 바꿨는지를 top-down으로 짚는다.

## 학습 경로 (Study Path)

이미 있는 world model 서베이 2종([[physical-ai/li-2025-a-comprehensive-survey-on-world]], [[physical-ai/hou-2026-world-model-for-robot-learning]])은 로봇 조작·자율주행 축에서 world model을 다룬다. 이 논문은 **navigation** 축에서 같은 개념을 다뤄 좌표계가 보완된다. world model 계열을 먼저 읽은 뒤 이 페이지로 넘어오면 "왜 navigation에서는 history/memory와 grounded instruction 일반화가 별도 축으로 갈라지는지"가 자연스럽게 이어진다.

## 주요 기여 (Key Contributions)

![[assets/zhang-2024-vision-and-language-navigation-today/fig01.png]]
*Figure 1: LAW framework로 본 VLN 구조 — world model이 환경을, human model이 사람의 지시를 담당하고 VLN agent가 이 둘을 grounding·reasoning으로 이어 planning·dialogue를 수행한다 (Zhang 2024, p.2)*

foundation model을 world model과 agent model의 backbone으로 놓는 LAW framework를 가져와, challenge를 history and memory · generalization ability · ambiguous instruction · grounding and reasoning · planning 다섯으로 가른다. foundation model의 역할도 개별 기법 나열 대신 파이프라인에서 맡는 자리로 묶는다 — 데이터·지식(전처리·증강·합성), 표현(일반화되는 텍스트·시각 표현), 의사결정(navigation planner·dialogue manager), 태스크 학습(embodied reasoning·language grounding) 네 갈래다.

![[assets/zhang-2024-vision-and-language-navigation-today/tab01.png]]
*Table 1: VLN 벤치마크 24종 — world(domain·environment) · human(turn·format·granularity) · agent(type·action space·other) · dataset collection(text·route) 네 축으로 분류 (Zhang 2024, p.3)*

LANI/CHAI(2018)부터 ANDH(2023)까지 24종을 이 표 하나로 정리한다. indoors 15종 vs outdoors 9종, action space는 graph 9종·discrete 12종·continuous 3종(Robo-VLN·CDNLI·SDN 일부)으로 실제 로봇에 가까운 연속 제어 벤치마크가 가장 적다. freeform dialogue를 지원하는 것은 RobotSlang·TEACh·TtW·SDN·ANDH 5종뿐이다.

## 방법론 및 아키텍처 (Methodology and Architecture)

![[assets/zhang-2024-vision-and-language-navigation-today/fig02.png]]
*Figure 2: 세 모델별 challenge 5개와 그 아래 해법, foundation model 역할 4분류, 미래 과제 5항을 한 장에 담은 전체 taxonomy (Zhang 2024, p.5)*

### world model

history encoding은 재귀 갱신 state token(단일 `[CLS]` 토큰, 가변 길이 memory bank)에서 panorama encoder + history encoder 계층 구조의 multi-modal Transformer(Chen et al., 2021b)로, 다시 시각 환경을 텍스트 서술로 바꿔 LLM에 넣는 방식으로 옮겨왔다. graph 기반 history는 topological graph에 grid map·semantic map 같은 top-down 정보를 더한다. MapGPT·MC-GPT 같은 LLM 에이전트는 이를 언어 형태 map으로 저장한다. generalization은 시각 표현을 ImageNet ResNet에서 CLIP visual encoder로 갈아타며 개선됐다. 학습 방식도 환경 증강 후 LSTM fine-tuning에서 증강 데이터로 pre-training하는 쪽으로 옮겨갔다.

### human model

모호한 지시는 현재 시야에 없는 landmark를 언급하거나 여러 시점에서 똑같이 보이는 landmark를 지시할 때 생긴다. foundation model의 commonsense로 외부 지식을 끌어 해석하는 방법과 oracle에게 되묻는 information seeking 방법이 둘 다 쓰인다. grounded instruction 일반화는 pre-trained 텍스트 표현(PRESS·VLN-BERT·PREVALENT·Airbert)과 지시 합성(Speaker-Follower 계열 → Marky → SRDF) 두 갈래로 진행됐다.

### VLN agent

planning은 graph 기반(방문 노드의 frontier에서 global action 추출)과 LLM 기반(NavGPT·MapGPT·DiscussNav·SayNav)으로 갈린다. 에이전트 backbone은 Seq2Seq LSTM에서 Transformer를 거쳐 foundation model로 이동했다. VLM을 그대로 쓰는 계열과 시각 관측을 텍스트로 바꿔 LLM에 넣는 계열이 지금은 함께 쓰인다.

## 결과 (Results)

서베이라 자체 실험은 없다. 성능 관련 서술은 정성적이다. Marky는 unseen 환경 R2R 스타일 경로에서 near-human 품질에 도달했다. in-domain pre-trained multi-modal Transformer는 Oscar·LXMERT 초기화보다 낫다. CLIP encoder 교체는 VLN 성능을 끌어올린다. 이 정도가 전부다. 실질 산출물은 Table 1의 벤치마크 24종 분류다. 여기서 읽히는 분포(실내 편중, freeform dialogue 벤치마크 희소, 연속 action space 최소)가 §6 미래 과제와 바로 연결된다.

## 한계와 향후 과제 (Limitations and Future Work)

R2R의 instruction-trajectory 쌍이 최단 경로로 편향돼 실제 navigation을 대표하지 못한다. 저자들은 sim-to-real을 함께 재는 통합 평가 플랫폼(OVMM)과 사람의 실제 필요에서 출발한 과제 설계(BEHAVIOR-1K)를 요구한다. VLN은 본질적으로 3D 과제인데 현재 표현은 여전히 2D 위주다. CLIP feature를 3D voxel grid나 scene graph에 넣는 시도는 있다. 다만 대규모 3D 표현을 VLN에 붙이는 일은 아직 미개척이다. human model은 자유형 대화 벤치마크가 늘어도 실제 접근법이 rule-based 템플릿에 머문다. LLM 에이전트는 embodied experience 부재로 hallucination에 취약하다. 방에 소파가 없는데도 "소파에서 좌회전"을 생성하는 식이다. 저자들의 결론은, LLM이 planning 전체를 떠맡는 게 아니라 지시를 구조적으로 분해해 보조하고 실제 결정은 지각·모션 제어에 남는다는 것이다.

## 관련 페이지 (Related Pages)

- [[physical-ai/li-2025-a-comprehensive-survey-on-world]] — world model을 로보틱스·자율주행·범용 비디오 축에서 다룬 자매 서베이. 이 논문은 navigation 축을 더해 world model 좌표계를 보완한다
- [[physical-ai/hou-2026-world-model-for-robot-learning]] — 정책 결합 방식 5분류로 로봇 학습을 좁게 파는 서베이. VLN agent의 backbone 진화(LSTM→Transformer→foundation model) 논의와 겹쳐 읽을 만하다
- [[overviews/physical-ai-overview]] — physical-ai 카테고리의 분류 기준과 학습 경로 허브
