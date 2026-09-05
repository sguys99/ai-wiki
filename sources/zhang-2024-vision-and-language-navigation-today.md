---
title: "Vision-and-Language Navigation Today and Tomorrow: A Survey in the Era of Foundation Models"
type: paper
year: 2024
category: physical-ai
raw_path: raw/papers/zhang-2024-vision-and-language-navigation-today.pdf
raw_filename: "zhang-2024-vision-and-language-navigation-today.pdf"
source_collection: external
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

## 한 줄 요약 (One-line Summary)

Michigan State·UMich·UNC·Adelaide 4개 기관이 쓴 32페이지 VLN 서베이. 기존 VLN 리뷰는 pre-foundation-model 시대의 벤치마크·기법을 정리하는 데 머물렀다. 이 논문은 LAW framework를 빌려 world model · human model · VLN agent 세 축으로 challenge를 나눈 뒤 각 축에서 foundation model이 무엇을 바꿨는지를 top-down으로 정리한다.

## 1. 자료 정보 (Document Information)

- 제목: Vision-and-Language Navigation Today and Tomorrow: A Survey in the Era of Foundation Models
- 저자: Yue Zhang, Ziqiao Ma, Jialu Li, Yanyuan Qiao (공동 1저자 5인 중 4인) / Zun Wang / 지도 Joyce Chai, Qi Wu, Mohit Bansal, Parisa Kordjamshidi
- 소속: Michigan State University, University of Michigan, UNC Chapel Hill, University of Adelaide
- 게재: Transactions on Machine Learning Research (TMLR) 12/2024, OpenReview `yiqeh2ZYUh`
- arXiv: 2407.07035v2 (2024-12-29), 32페이지 중 본문 13페이지 + 참고문헌 19페이지
- 코드/자료: https://github.com/zhangyuejoslin/VLN-Survey-with-Foundation-Models

VLN(Vision-and-Language Navigation)은 에이전트가 사람의 언어 지시를 따라 3D 환경을 탐색하는 과제다. Anderson et al. (2018)이 R2R로 정식화한 뒤 photorealistic 시뮬레이터와 실환경 양쪽에서 확장돼 왔다.

## 2. 주요 기여 (Key Contributions)

Hu & Shu (2023)의 LAW framework를 VLN에 가져왔다. foundation model을 world model과 agent model의 backbone으로 놓는 구도다. world model은 에이전트가 주변 환경과 자기 행동이 world state를 어떻게 바꾸는지를 표현한 추상이다. agent model은 여기에 사람의 지시를 해석하는 human model을 더한 상위 개념이다. challenge는 이 구도에서 history and memory, generalization ability, ambiguous instruction, grounding and reasoning, planning 다섯으로 나뉘고 해법이 그 아래 붙는다.

foundation model의 역할도 네 갈래로 분류한다. 개별 기법을 나열하는 대신 모델이 파이프라인에서 맡는 역할로 묶는 방식이다. 데이터·지식 갈래는 전처리·증강·합성과 commonsense 활용을 맡는다. 표현 갈래는 일반화되는 텍스트·시각 표현과 history 처리다. 의사결정 갈래에는 navigation planner, dialogue manager, 범용 decision-making agent가 들어간다. 태스크 학습 갈래는 embodied reasoning, language grounding, few-shot·in-context·fine-tuning이다.

벤치마크 24종 taxonomy도 붙였다. LANI/CHAI(2018)부터 ANDH(2023)까지를 world·human·agent·dataset collection 네 축으로 정리한 표다.

기존 서베이와 무엇이 다른지도 밝혀 둔다. 저자들은 Gu et al. (2022), Park & Kim (2023), Wu et al. (2024)가 foundation model 이전 시기의 벤치마크·전통 기법 중심이고 LLM의 VLN 적용을 다룬 리뷰는 이 논문 이전에 없었다고 주장한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 태스크 설정과 벤치마크 축

Matterport3D 기반 R2R 계열은 사전 정의된 connectivity graph 위를 인접 노드 텔레포트로 이동하는 discrete environment(VLN-DE)다. Krantz et al. (2020)의 VLN-CE는 이 경로를 연속 공간으로 옮겼고 Robo-VLN(Irshad et al., 2021)은 연속 action space까지 도입해 sim-to-real 간극을 좁혔다. RxR(Ku et al., 2020)은 영어·힌디어·텔루구어 다국어 변형에 virtual pose와 시간 정렬된 지시를 붙였다.

Table 1은 네 축으로 분류한다. world 축에는 domain(indoors/outdoors)과 environment(Matterport3D, Habitat, AI2-THOR, CARLA, Google Street View, AirSim, xView 등)가 들어간다. human 축은 turn(single/multi), format(freeform dialogue / restricted dialogue / multi-instruction), granularity(action-directed / goal-directed) 세 항목이다. agent 축은 type(household robot / driving / aerial), action space(graph / discrete / continuous), 부가 태스크(manipulation, detection)로 이뤄진다. dataset collection 축은 text(human/templated)와 route(human/planner) 둘이다.

평가지표는 NE(Navigation Error), SR(Success Rate), SPL(Success Rate Weighted Path Length) 셋이 기본이다. trajectory는 에이전트가 실제로 밟은 경로를 시간순으로 기록한 것을 말한다. trajectory 충실도를 볼 때는 CLS(Coverage Weighted by Length Score), nDTW, sDTW를 쓴다.

### world model

환경을 배우고 표현하는 축이다. 첫 challenge는 history와 memory다. VQA 같은 정적 VL 태스크와 달리 VLN 에이전트는 과거 observation과 action을 현재 스텝 입력에 넣어야 한다. observation은 매 스텝 에이전트가 받는 센서 입력이다. foundation model 이전에는 LSTM hidden state가 겉으로 드러나지 않는 memory 역할을 했다. attention 설계나 auxiliary task로 지시-history 정렬을 보강하기도 했다.

history encoding은 크게 세 방향이다. 재귀적으로 갱신되는 state token을 쓰는 계열이 있다. Hong et al. (2021)은 직전 스텝의 `[CLS]` 토큰 하나를 쓰고 Lin et al. (2022a)은 가변 길이 memory bank에 이전 스텝 activation을 쌓는다. 이 방식은 스텝별 토큰 갱신에 묶여 임의 시점의 history를 꺼내기 어렵고 pre-training 확장성이 떨어진다. history를 시퀀스로 직접 인코딩하는 multi-modal Transformer가 다음이다. Chen et al. (2021b)의 panorama encoder + history encoder 계층 구조가 대표적이다. 한 시점의 panoramic 공간 관계와 panorama 사이의 시간 변화를 분리해 처리하고 재귀 갱신 의존을 끊어 대규모 instruction-path pre-training을 가능하게 했다. 후속 연구는 panorama encoder를 mean pooling(Kamath et al., 2023)이나 front-view 인코딩(Qiao et al., 2022)으로 바꿔도 성능이 유지된다고 보고한다. LLM 시대에는 시각 환경을 텍스트 서술로 바꾼다. heading·elevation·distance 같은 상대 공간 정보를 붙여 서술 시퀀스로 history를 남기는 식이다(Zhou et al., 2024b). HELPER(Sarch et al., 2023)는 language-program 쌍을 외부 memory에 두고 retrieval-augmented prompting으로 자유형 대화를 action program으로 파싱한다.

graph 기반 history는 topological graph를 structured Transformer encoder로 인코딩하는 계열에 top-down 정보(grid map, semantic map, local metric map, 국소 이웃 map)를 더한다. LLM 에이전트에서는 MapGPT(Chen et al., 2024a)가 topological graph를 언어 형태 map으로 저장한다. MC-GPT(Zhan et al., 2024b)는 viewpoint·객체·공간관계를 담은 topological map을 memory 구조로 쓴다.

semantic segmentation feature 학습(Zhang et al., 2021a), 환경 dropout(Tan et al., 2019), 의미가 정렬된 이미지 쌍의 유사도 최대화(Li et al., 2022a)는 모두 unseen 성능을 올렸다. generalization의 병목이 학습 환경 수라는 뜻이다. 대규모 환경 데이터가 필요하다. 시각 표현의 backbone이 ImageNet ResNet에서 CLIP visual encoder로 바뀌면서 이미지-지시 정렬이 좋아졌다(Shen et al., 2022). Wang et al. (2022b)는 비디오에서 배운 표현의 시간 정보가 navigation에 중요하다고 본다. 환경 증강에서 EnvEdit·EnvMix·KED·FDA는 Matterport3D 환경을 섞고 스타일을 바꾸고 고주파 특징을 보간한다. Pathdreamer·SE3DS는 현재 observation에서 미래 스텝 환경을 합성한다. 학습 방식도 달라졌다. 예전에는 증강한 뒤 LSTM을 fine-tuning했지만 지금은 증강 데이터로 pre-training한다. in-domain pre-trained multi-modal Transformer가 Oscar·LXMERT 같은 범용 VLM에서 초기화한 경우보다 낫다고 보는 편이 이제 정설이다.

### human model

지시를 해석하고 사람과 소통하는 일은 human model이 맡는다. 모호한 지시는 주로 single-turn 상황에서 생긴다. 현재 시야에 없는 landmark를 언급하거나 여러 시점에서 똑같이 보이는 landmark를 지시하는 경우다(Zhang & Kordjamshidi, 2023). foundation model 이전에는 거의 다뤄지지 않았다. LEO(Xia et al., 2020)가 같은 trajectory에 대한 여러 관점의 지시를 모으는 정도였는데 그마저 사람 주석에 의존했다. 지금은 foundation model의 지각 맥락과 commonsense로 외부 지식을 끌어 해석하거나 아예 oracle에게 되묻는 information seeking으로 푼다. SwinBert 기반 oracle을 학습시키는 방식이 있고 mPLUG-Owl 같은 대형 VLM은 별도 학습 없이 zero-shot oracle 역할을 한다. Zhu et al. (2021c)은 oracle이 긍정 답을 낼 확률을 에이전트가 학습해 추론 시점에는 oracle 없이 self-Q&A로 돌린다.

grounded instruction의 일반화는 데이터 규모·다양성 부족 문제다. 언어 스타일 자체는 seen/unseen을 넘어 잘 일반화되지만(Zhang et al., 2021a) 제한된 지시 데이터로 unseen 환경에 grounding하는 것은 어렵다. 해법으로는 pre-trained 텍스트 표현과 지시 합성이 쓰인다. 표현 계열에는 PRESS(BERT fine-tuning), VLN-BERT·PREVALENT(웹 수집 text-image 쌍 pre-training), Airbert(image-caption 쌍), CLEAR(cross-lingual)가 있다. ProbES는 CLIP으로 검출한 움직임·객체구를 템플릿에 채워 지시를 자동 생성하고 prompt 기반으로 학습한다. NavGPT-2는 InstructBLIP + Flan-T5/Vicuna 표현을 policy 학습에 투입한다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. 지시 합성은 Speaker-Follower 계열의 오프라인 speaker에서 출발했다. Zhao et al. (2021)은 생성 지시의 품질이 낮고 사람 wayfinding 평가에서 성능이 나쁘다고 지적했다. Marky(Wang et al., 2022a; Kamath et al., 2023)는 multilingual T5의 멀티모달 확장에 텍스트에 aligned된 시각 landmark 대응을 붙여 unseen 환경 R2R 경로에서 사람에 가까운 품질을 냈다. 여기에 PASTS(progress-aware spatio-temporal speaker), SAS(의미·구조 단서로 공간 정보가 풍부한 지시 생성), SRDF(반복 self-training)가 이어진다. LANA(Wang et al., 2023e)처럼 항해하면서 경로 설명도 생성하는 양방향 에이전트도 있다.

### VLN agent

VLN agent에서는 embodied reasoning과 planning이 쟁점이다. grounding과 reasoning은 VQA·captioning의 정적 정렬과 다르다. 에이전트는 이전 행동을 고려해 지금 실행할 sub-instruction 조각을 골라 시각 환경에 접지해야 한다. 예전에는 motion·landmark 명시 모델링, 지시의 구문 정보, 공간 관계 활용 같은 explicit semantic grounding이 주였다. foundation model 시대에는 명시적 grounding 연구가 오히려 드물다. pre-training이 이미 공간·시간 의미를 어느 정도 준다고 보기 때문이다. 대신 VLN 전용 pre-training task가 자리 잡았다. scene/object grounding용 task(Lin et al., 2021), 방향과 시각 정보를 분리 학습하는 LOViS, history와 trajectory 순서를 강조하는 HOP, 미래 view semantics 예측(Li & Bansal, 2023), 마스킹된 sub-path 복원(Dou et al., 2023), entity 예측·정렬(Cui et al., 2023) 등이다.

graph planner는 방문 노드의 graph frontier에서 global action을 뽑아 local action space를 넓힌다. Gao et al. (2023)은 zone 선택(high-level)과 node 선택(low-level)으로 계층화하고 Liu et al. (2023a)은 grid 수준 action을 더한다. 연속 환경에서는 예측된 local navigability graph에서 waypoint를 고르는 계층 planning이 표준이 됐다. CM2는 local map 안에서 지시를 접지해 trajectory를 짠다. Wang et al. (2023a; 2024a)은 video prediction 모델이나 neural radiance 표현으로 여러 미래 waypoint를 예측해 장기 효과를 보고 행동을 고른다. LLM planner는 접근이 다르다. LLM-Planner는 sub-goal 계획을 검출 객체로 실시간 조정한다. Mic와 A2Nav는 GPT-3로 지시를 하위 태스크로 분해하고 ThinkBot은 chain-of-thought로 누락 행동을 생성한다. VL-Map은 Code-as-Policy 방식으로 지시를 코드 형태 함수열로 분해해 queryable map으로 실행한다. SayNav는 탐색한 환경의 3D scene graph를 LLM 입력으로 삼아 high-level plan을 만든다.

에이전트 backbone은 Seq2Seq LSTM(Anderson et al., 2018)으로 시작해 Transformer를 거쳐 지금은 foundation model을 쓴다. 주류는 single-stream VLM이다. 언어·시각·history 토큰을 매 스텝 함께 넣고 cross-modal self-attention으로 대응을 잡아 행동 확률을 낸다. zero-shot 설정에서는 CLIP-NAV가 CLIP으로 목표 객체 referring expression을 얻어 순차 결정을 내린다. VLN-CE 에이전트는 action space가 다르지만 waypoint predictor(panoramic RGBD로 인접 navigable 후보를 예측)를 끼워 DE용 기법을 CE로 옮긴다.

LLM을 에이전트로 직접 쓰는 흐름도 있다. 시각 observation을 텍스트 서술로 바꿔 지시와 함께 LLM에 넣고 행동을 예측하게 한다. NavGPT(GPT-4로 자율 행동 생성)와 MapGPT(topological map을 global exploration hint로 변환)가 zero-shot navigation의 가능성을 보였다. DiscussNav는 Instruction Analysis·Vision Perception·Completion Estimation·Decision Testing 네 종류의 도메인 전문가를 두는 multi-expert 구성으로 사람 개입을 줄인다. InstructNav는 multi-sourced value map으로 하위 태스크를 실행한다. NavCoT는 LLM을 world model 겸 navigational reasoning agent로 만들어 미래 환경을 시뮬레이션하며 결정을 간소화한다. zero-shot 대신 LLM을 fine-tuning하는 갈래도 따로 있다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

서베이라 자체 실험은 없다. 정량 비교표 대신 Table 1의 벤치마크 24종 분류가 실질 산출물이다. 여기서 드러나는 분포가 몇 가지 있다.

- indoors 15종 vs outdoors 9종. 실내는 Matterport3D(R2R·R4R·RxR·SOON·REVERIE·VNLA·HANNA·CVDN·VLN-CE·Robo-VLN)와 AI2-THOR(ALFRED·TEACh·DialFRED)에 몰려 있고 실외는 Google Street View(TouchDown·Street Nav·Talk2Nav), CARLA(LCSD·CDNLI·SDN), AirSim/xView(AerialVLN·ANDH)로 나뉜다.
- action space는 graph 9종, discrete 12종, continuous 3종(Robo-VLN·CDNLI·SDN 일부)이다. 실제 로봇에 가까운 연속 제어 벤치마크가 가장 적다.
- 대화 형식은 multi-instruction이 다수고 freeform dialogue는 RobotSlang·TEACh·TtW·SDN·ANDH 5종뿐이다.
- route demonstration은 planner 생성이 다수(P), 사람 시연(H)은 CVDN·TEACh·TtW·CDNLI·SDN·AerialVLN·ANDH 등에 그친다.

본문이 내놓는 성능 주장은 정성적이다. Marky가 unseen 환경 R2R 스타일 경로에서 near-human 품질에 도달했다. in-domain pre-trained multi-modal Transformer는 Oscar·LXMERT 초기화보다 효과적이다. CLIP encoder를 바꾸면 VLN 성능이 오른다. 이 정도가 전부다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

R2R의 instruction-trajectory 쌍은 최단 경로로 편향돼 실제 navigation을 대표하지 못한다. 벤치마크 자체가 첫 과제다. 저자들은 sim-to-real을 함께 재는 통합 평가 플랫폼(OVMM 같은)과 사람의 실제 필요에서 출발한 과제 설계(BEHAVIOR-1K)를 요구한다. 동적 환경도 아직 거의 다뤄지지 않았다. 움직이는 사물과 사람, 조명·날씨 변화가 지각을 흔드는데 HAZARD, Habitat 3.0, HA-VLN이 출발점 정도다. 실외(자율주행·비행체) 확장은 prompt engineering이나 LLM fine-tuning으로 다음 action·trajectory를 예측하는 초기 시도가 나와 있다. 실주행 비디오·시뮬레이션 데이터로 instruction tuning해 throttle·steering을 예측하게 만드는 방향이다.

VLN은 원래 3D 과제인데 world model의 표현은 강력하지만 아직 2D다. semantic SLAM, volumetric 표현, depth, BEV grid map, local metric map 같은 명시적 3D 표현은 객체 집합을 닫힌 집합으로 축소해 자연어의 open-vocabulary 설정에 맞지 않는다. CLIP multi-view feature를 3D voxel grid나 top-down feature map에 넣어 queryable map을 만들거나 scene graph로 공간 관계를 표현하는 시도가 있다. 다만 대규모 데이터로 학습한 3D 표현을 VLN 에이전트에 붙이는 일은 아직 미개척이다. 3D reconstruction 모델과 3D multimodal 표현을 포함한 3D foundation model의 부상이 관건이 될 수 있다.

human model에 남은 과제는 대화다. 기존 연구는 speaker-listener 패러다임이나 에이전트가 도움만 요청하는 제한된 QA 대화에 머문다. 최근 자유형 대화 벤치마크가 늘어 묻고 제안하고 설명하고 협상하는 상호작용이 가능해졌지만 실제 접근법은 여전히 rule-based 대화 템플릿에 foundation model 컴포넌트를 얹은 수준이다. 저자들은 situated task-oriented dialogue management로 넘어가야 한다고 처방한다.

agent model을 적응시키는 문제도 남는다. LLM은 환경을 직접 보지 못하고 hallucination에 취약하다. 논문이 짚는 갈래는 셋이다. 첫째는 embodied experience 부재다. 인터넷 데이터로 만든 모델은 실제 환경에서 겪은 경험이 없어 실제 요구에 안 맞는 계획을 세운다. 시각을 캡션으로 바꿔 넣는 우회는 시각 의미를 잃는다. EmbodiedGPT·PaLM-E·Octopus 같은 embodied foundation model이 대안으로 제시된다. hallucination도 문제다. 방에 소파가 없는데도 "앞으로 가서 소파에서 좌회전"을 생성하면 실행 불가능한 행동이 된다. planning 능력에도 한계가 있다. PlanBench·CogEval은 복잡한 계획에서 LLM의 한계를 드러냈다. 다만 VLN은 실내 고정 환경에 항해 행동 집합도 제한적이라 조건이 낫다. 저자들의 결론은 이렇다. LLM이 planning 전체를 떠맡는 게 아니라 지시를 구조에 따라 나눠 보조하고 실제 결정은 지각·모션 제어에 남는다.

시뮬레이터와 실로봇 사이의 간격도 과제다. 시뮬레이터는 실환경의 복잡도와 변동성이 없고 렌더 품질도 떨어져 perception gap이 생긴다. Wang et al. (2024b)이 semantic map과 3D feature field로 단안 로봇에 panoramic 지각을 주는 시도를 했다. embodiment gap과 데이터 부족도 병목이다. 로봇 teleoperation(He et al., 2024b)이 실제 human-robot 소통에서 VLN 데이터를 늘리는 경로로 언급된다.

윤리·사회적 영향은 §7에서 다룬다. 웹 규모 pre-training 데이터의 편향이 다국어 사용자 등에서 공정성 문제로 이어질 수 있다. 지속 학습을 포함한 접근은 가정용 로봇 배치 시 프라이버시 위험을 안는다.

## 6. 관련 연구 (Related Work)

- 선행 VLN 서베이: Gu et al. (2022), Park & Kim (2023), Wu et al. (2024) — foundation model 이전 시기
- LAW framework: Hu & Shu (2023). world model 개념은 Ha & Schmidhuber (2018), Koh et al. (2021), agent model·human model은 Andreas (2022), Ma et al. (2023)
- 인지과학 배경: Gallistel (1990)의 piloting·path integration, Tolman (1948)의 cognitive map 가설, O'Keefe & Dostrovsky (1971)의 place cell, Warren (2019)·Ericson & Warren (2020)의 비유클리드 cognitive graph
- foundation model 일반: Bommasani et al. (2021), Du et al. (2022), Zhou et al. (2023)
- embodied AI 서베이: Duan et al. (2022), Nguyen et al. (2021)
- 자율주행 foundation model 서베이: Li et al. (2023b), Cui et al. (2024), Gao et al. (2024), Yan et al. (2024)

## 7. 용어집 (Glossary)

- **VLN (Vision-and-Language Navigation)**: 언어 지시를 따라 3D 환경을 탐색하는 멀티모달 협력 과제
- **VLN-DE / VLN-CE**: discrete environment는 connectivity graph의 인접 노드 사이 텔레포트로 이동, continuous environment는 연속 공간에서 저수준 제어를 실행
- **LAW framework**: language-agent-world. foundation model을 world model과 agent model의 backbone으로 놓는 추론·계획 구도
- **world model**: 에이전트가 주변 환경과 자기 행동이 world state를 바꾸는 방식을 표현한 내부 추상
- **human model**: 사람 파트너의 지시를 해석해 에이전트의 목표를 정하는 모델. agent model의 부분
- **R2R / RxR**: Matterport3D 기반 대표 VLN 데이터셋. RxR은 영어·힌디어·텔루구어 다국어 확장
- **SPL**: 성공률을 trajectory 길이로 정규화해 도달 성공과 경로 효율을 함께 재는 지표
- **nDTW / sDTW**: ground-truth trajectory에서 벗어난 정도를 벌점화하는 지표. sDTW는 성공률까지 반영
- **waypoint predictor**: panoramic RGBD observation에서 현재 위치의 인접 navigable 후보를 예측해 연속 환경에 그래프 기반 기법을 적용하게 하는 모듈
- **Speaker-Follower**: 사람이 주석한 instruction-trajectory 쌍으로 지시 생성기(speaker)를 학습해 새 trajectory의 지시를 합성하는 데이터 증강 틀

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | "LAW framework로 본 VLN 구조 — world/human/VLN agent 삼분" (Figure 1) | page-region | ★ wiki 권장 (framework) |
| fig02 | 3 | "VLN 벤치마크 24종 분류표" (Table 1) | page-region | ★ wiki 권장 (reference table) |
| fig03 | 5 | "서베이 전체 taxonomy + foundation model 역할 4분류 + 미래 과제" (Figure 2) | page-region | ★ wiki 권장 (핵심 도해) |

세 후보 모두 페이지 통째 200 DPI PNG라, curated 사본은 도식 영역만 재렌더해서 넣는 편이 낫다. fig01은 p.2 오른쪽 단, fig03은 p.5 상단 밴드, fig02는 p.3 표 전체가 해당 영역이다.
