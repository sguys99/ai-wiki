---
title: "OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments"
type: paper
year: 2024
category: evaluations
raw_path: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for.pdf
raw_filename: "xie-2024-osworld-benchmarking-multimodal-agents-for.pdf"
source_collection: external
source: xie-2024-osworld-benchmarking-multimodal-agents-for.md
authors: "Tianbao Xie, Danyang Zhang, Jixuan Chen, Xiaochuan Li, Siheng Zhao, Ruisheng Cao, Toh Jing Hua, Zhoujun Cheng, Dongchan Shin, Fangyu Lei, Yitao Liu, Yiheng Xu, Shuyan Zhou, Silvio Savarese, Caiming Xiong, Victor Zhong, Tao Yu"
arxiv_id: "2404.07972"
tags: [computer-use-agents, gui-agents, benchmark, execution-based-evaluation, accessibility-tree, set-of-mark, gui-grounding, virtual-machine, osworld, webarena]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig01.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig01.png
    caption: "OSWorld 전체 그림 — task 예시 두 개의 실행 화면 위에, 지시문과 초기 상태 config가 VM으로 들어가고 agent가 screenshot·a11y tree를 받아 마우스·키보드 action을 내면 최종 상태를 실행 기반으로 채점하는 흐름"
    page: 2
    bbox_norm: [0.147, 0.050, 0.863, 0.363]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig02.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig02.png
    caption: "환경 인프라 구조 — 왼쪽은 지시문·config·evaluator·expected·func을 담은 JSON 한 벌, 오른쪽은 Coordinator가 Simulator와 Task Manager로 VM 여러 대를 몰아 setup·postprocess·getter·metrics를 거쳐 reward를 뽑는 경로"
    page: 4
    bbox_norm: [0.131, 0.033, 0.873, 0.314]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig03.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig03.png
    caption: "369개 task의 앱 도메인·조작 유형 분포 sunburst — 안쪽 고리는 Office 31.7%·Workflow 27.4%·Daily 21.1%·Professional 13.3%·OS 6.5%, 바깥 고리는 slide editing 8.7%·data analysis 8.9% 같은 세부 조작"
    page: 8
    bbox_norm: [0.485, 0.152, 0.825, 0.406]
    strategy: manual
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig04.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig04.png
    caption: "사람의 작업 시간과 정확도를 WebArena와 비교한 violin plot + 막대 — 중위 소요 시간 111.94초 대 35.38초, 정확도 72.36% 대 88%"
    page: 9
    bbox_norm: [0.485, 0.422, 0.845, 0.641]
    strategy: manual
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig05.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig05.png
    caption: "screenshot 해상도를 0.2~1.0배로 낮췄을 때의 성공률 — 순수 screenshot은 해상도와 단조 증가하지만 SoM은 0.4배에서 20%대로 튀는 비단조 곡선"
    page: 13
    bbox_norm: [0.174, 0.224, 0.515, 0.404]
    strategy: manual
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig06.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig06.png
    caption: "관측 한 번당 a11y tree 길이 분포 히스토그램 — 90퍼센타일이 6,343.60 토큰"
    page: 13
    bbox_norm: [0.167, 0.549, 0.510, 0.678]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig07.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig07.png
    caption: "히스토리 길이 1·2·3·>3에 따른 성공률 — SoM은 3까지 우상향해 15%대에서 평평해지고 순수 screenshot은 >3에서 오히려 떨어진다"
    page: 13
    bbox_norm: [0.175, 0.704, 0.515, 0.884]
    strategy: manual
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig08.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig08.png
    caption: "창 교란에 따른 성공률 하락 — 원본 50.79%에서 위치 변경 36.5%, 최소 크기 15.04%, 무관한 창으로 어지럽힌 경우 25.39%"
    page: 14
    bbox_norm: [0.160, 0.225, 0.430, 0.394]
    strategy: manual
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig09.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig09.png
    caption: "성공 사례 — 화면을 VLC와 터미널로 나누고 ffmpeg를 두 번 써서 영상에서 자막을 뽑고 자막 없는 영상을 따로 만든 6단계"
    page: 15
    bbox_norm: [0.126, 0.087, 1.000, 0.436]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig10.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig10.png
    caption: "정성 분석 세 사례 — 1행은 제목 가운데 정렬처럼 쉬운 task에서 GPT-4V가 실패한 경우, 2행은 사람보다 agent가 어려워한 경우, 3행은 반대로 사람이 더 어려워한 경우"
    page: 16
    bbox_norm: [0.152, 0.068, 0.956, 0.373]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig11.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig11.png
    caption: "가공하지 않은 XML 형식 accessibility tree 시각화"
    page: 24
    bbox_norm: [0.231, 0.083, 0.769, 0.299]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig12.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig12.png
    caption: "Accerciser로 a11y tree 구성 요소를 들여다본 예 — LibreOffice 툴바의 프린터 아이콘과 트리의 Print 노드가 어떻게 대응하는지"
    page: 24
    bbox_norm: [0.231, 0.321, 0.769, 0.561]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig13.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig13.png
    caption: "지시문 분포 비교 t-SNE — 공정한 비교를 위해 모든 데이터셋을 300개로 샘플링"
    page: 29
    bbox_norm: [0.175, 0.083, 0.824, 0.237]
    strategy: caption-region
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig14.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig14.png
    caption: "여러 앱 GUI에 SoM 번호 박스를 씌운 screenshot 예시"
    page: 37
    bbox_norm: [0.175, 0.397, 0.825, 0.593]
    strategy: caption-region
    curated: false
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig15.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig15.png
    caption: "네 가지 입력 설정별 GPT-4V agent가 소비한 step 수 분포"
    page: 38
    bbox_norm: [0.231, 0.083, 0.769, 0.365]
    strategy: caption-region
    curated: false
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig16.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig16.png
    caption: "소프트웨어별 사용 오류 사례 — 1행 GIMP, 2행 LibreOffice Calc, 3행 Google Chrome"
    page: 40
    bbox_norm: [0.157, 0.083, 0.879, 0.660]
    strategy: caption-region
    curated: false
  - id: fig17
    label: Figure 17
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig17.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig17.png
    caption: "마우스 클릭 부정확으로 인한 실패 — 나이키 스토어의 상품 카테고리 이미지를 눌러야 하는데 좌표 계산이 어긋난 사례"
    page: 44
    bbox_norm: [0.123, 0.108, 0.938, 0.418]
    strategy: caption-region
    curated: false
  - id: fig18
    label: Figure 18
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig18.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig18.png
    caption: "환경 노이즈 처리 미숙으로 인한 실패 — 쿠키 배너나 팝업 광고를 치우지 않고 페이지와 바로 상호작용하려 든 사례"
    page: 44
    bbox_norm: [0.150, 0.464, 0.910, 0.779]
    strategy: caption-region
    curated: false
  - id: fig19
    label: Figure 19
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig19.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig19.png
    caption: "사람과 agent가 수행한 task 보충 사례"
    page: 45
    bbox_norm: [0.153, 0.113, 0.855, 0.409]
    strategy: caption-region
    curated: false
  - id: fig20
    label: Figure 20
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig20.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig20.png
    caption: "Claude-3 Opus의 오류 사례 분석 screenshot"
    page: 48
    bbox_norm: [0.159, 0.083, 0.861, 0.531]
    strategy: caption-region
    curated: false
  - id: fig21
    label: Figure 21
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig21.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig21.png
    caption: "같은 task에서 SoM agent는 설정 UI를 찾아 헤맸고 screenshot + a11y tree agent는 settings.json 값을 바로 고친 대비 사례"
    page: 51
    bbox_norm: [0.154, 0.083, 0.858, 0.636]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab01.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab01.png
    caption: "채점 스크립트 예시 세 개 — 쿠키 삭제 확인, 스프레드시트를 클라우드 정답과 대조, a11y tree로 메일 수신자 필드 검사"
    page: 5
    bbox_norm: [0.170, 0.135, 0.830, 0.430]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab02.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab02.png
    caption: "action space 예시 — moveTo·click·write·hotkey·scroll·dragTo 같은 pyautogui 호출과 WAIT·FAIL·DONE 특수 action"
    page: 6
    bbox_norm: [0.443, 0.132, 0.831, 0.291]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab03.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab03.png
    caption: "핵심 통계 — Ubuntu 369개(멀티앱 101 · 단일앱 268 · 외부 통합 84 · 수행 불가 30), Windows 보충 43개, 초기 상태 302개, 채점 스크립트 134개"
    page: 8
    bbox_norm: [0.164, 0.239, 0.470, 0.407]
    strategy: manual
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab04.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab04.png
    caption: "기존 환경 17종과의 비교 — 통제 가능한 실행 환경·확장성·멀티모달·크로스앱·중간 초기 상태 다섯 축을 모두 채운 것은 OSWorld뿐이고 채점 함수 수도 134개로 가장 많다"
    page: 9
    bbox_norm: [0.167, 0.203, 0.830, 0.440]
    strategy: table-region
    curated: true
  - id: tab05
    label: Table 5
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab05.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab05.png
    caption: "메인 결과 — 입력 설정 4종 × 모델별 도메인 성공률. 최고가 a11y tree GPT-4의 12.24%이고 맨 아래 사람 72.36%와 대비된다"
    page: 10
    bbox_norm: [0.199, 0.129, 0.801, 0.541]
    strategy: table-region
    curated: true
  - id: tab06
    label: Table 6
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab06.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab06.png
    caption: "GPT-4V(SoM)의 task 유형별 성공률 — 난이도 Easy 16.78%에서 Hard 4.59%로, 단일앱 13.74%에서 멀티앱 워크플로 6.57%로 떨어진다"
    page: 12
    bbox_norm: [0.536, 0.649, 0.830, 0.790]
    strategy: table-region
    curated: true
  - id: tab07
    label: Table 7
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab07.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab07.png
    caption: "OS 간 성능 비교 — Ubuntu 4.88%, Windows 2.55%, 상관계수 0.7"
    page: 14
    bbox_norm: [0.536, 0.644, 0.829, 0.712]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab08.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab08.png
    caption: "강화학습 연구용으로 따로 만든 action space computer_13의 action 유형과 인자"
    page: 26
    bbox_norm: [0.167, 0.134, 0.844, 0.425]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab09.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab09.png
    caption: "task 예시를 끌어온 출처 목록"
    page: 27
    bbox_norm: [0.167, 0.252, 0.955, 0.886]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab10.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab10.png
    caption: "벤치마크 세부 통계 — 예시 수, 평균 지시문 토큰 수, 수행 불가 지시문, 외부에서 통합한 지시문"
    page: 28
    bbox_norm: [0.170, 0.728, 0.830, 0.803]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab11.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab11.png
    caption: "Windows 분석용 세트 세부 통계 — 수행 불가 task와 통합 task는 없다"
    page: 28
    bbox_norm: [0.331, 0.862, 0.669, 0.916]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab12.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab12.png
    caption: "도메인별 하위 집합에서 뽑은 추가 예시"
    page: 31
    bbox_norm: [0.167, 0.209, 0.890, 0.851]
    strategy: table-region
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab13.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab13.png
    caption: "Ubuntu·Windows에서 a11y tree 노드를 남길지 정하는 기준"
    page: 36
    bbox_norm: [0.170, 0.629, 0.830, 0.914]
    strategy: table-region
    curated: false
  - id: tab14
    label: Table 14
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab14.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab14.png
    caption: "앱 단위로 쪼갠 상세 성공률 — OS·Calc·Impress·Writer·Chrome·VLC·Thunderbird·VS Code·GIMP·Workflow"
    page: 39
    bbox_norm: [0.174, 0.148, 0.860, 0.604]
    strategy: table-region
    curated: false
---

## 요약 (Summary)

컴퓨터를 조작하는 agent를 제대로 재려면 실제로 돌아가는 OS가 필요하다는 판단에서 출발한 벤치마크다. 가상 머신 위 Ubuntu에 369개 task를 얹고 task마다 초기 상태 설정과 채점 스크립트를 손으로 붙였다. 사람은 72.36%를 푸는데 2024년 당시 최고 모델은 12.24%에 그쳤고 실패의 75% 이상이 화면 좌표를 못 맞히는 grounding 문제였다.

![[assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig01.png]]
*Figure 1: OSWorld 전체 그림. 지시문과 초기 상태 config가 VM으로 들어가고 agent가 screenshot과 a11y tree를 받아 마우스·키보드 action을 내면 최종 상태를 실행 기반으로 채점한다 (Xie 2024, p.2)*

## 무엇을 풀려고 했나 (Motivation)

2024년 초 GUI agent 벤치마크는 두 갈래로 갈려 있었다. 시연 기록만 모아 놓은 데이터셋은 실행 없이 다음 step 예측만 채점해서, 정답을 하나로 가정하고 다른 방식의 올바른 해법에 벌점을 준다. 실행이 되는 쪽은 웹 브라우저나 코딩처럼 좁은 영역에 갇혀 있어 앱을 넘나드는 작업을 아예 표현하지 못한다.

OSWorld는 가상 머신 안의 Ubuntu·Windows·macOS를 그대로 구동하고 agent에게 원본 화면과 날것의 마우스·키보드 제어권을 준다. 앱별 시뮬레이터를 새로 짜지 않고도 임의의 앱이 걸린 task를 정의할 수 있다는 게 설계의 핵심이다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### task 정의

agent task를 POMDP로 형식화한다. POMDP는 상태를 부분적으로만 관측할 수 있는 순차 의사결정 문제를 뜻하고 여기서는 상태 공간 $S$, 관측 공간 $O$, action space $A$, 전이 함수 $T$, reward 함수 $R$의 다섯 쌍이다. 관측은 자연어 지시문과 screenshot, accessibility tree 또는 그 조합이다. accessibility tree는 OS가 화면 요소의 종류·이름·좌표·크기를 프로그램이 읽을 수 있게 노출하는 트리로, 웹의 DOM에 대응하는 데스크톱 쪽 구조다.

reward는 $R: S \times A \to [0,1]$ 이다. 마지막 step에서 상태 전이가 목표에 부합하면 1 또는 1 미만 양수를 주고 수행 불가 task에서 agent가 실패를 정확히 예측한 경우도 준다. 나머지는 전부 0이다.

### 환경 인프라

![[assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig02.png]]
*Figure 2: 환경 인프라. 왼쪽은 지시문·config·evaluator·expected를 담은 JSON 한 벌, 오른쪽은 Coordinator가 Simulator와 Task Manager로 VM 여러 대를 몰아 setup·postprocess·getter·metrics를 거쳐 reward를 뽑는 경로 (Xie 2024, p.4)*

가상 머신은 agent를 호스트에서 격리해 되돌릴 수 없는 피해를 막고 스냅샷으로 환경을 빠르게 원래대로 돌려놓는다. 초기화 단계에서 파일을 내려받고 소프트웨어를 열고 창 배치를 맞추며 채점 단계에서는 후처리로 특정 창을 활성화한 뒤 최종 상태에서 필요한 값을 뽑는다. 이 절차 전체가 config 파일 한 벌에 들어 있다.

### 관측 공간과 action space

screenshot은 마우스 위치와 커서 모양까지 포함한 데스크톱 전체다. 사람이 보는 것과 같은 것을 준다는 원칙이다. accessibility tree는 Ubuntu에서 ATSPI, Windows에서 PyWinAuto로 얻는데 문제는 크기다. 원본 XML은 토큰이 백만 단위로 나오므로 태그·가시성·활성 여부·텍스트 유무로 걸러낸 뒤 태그·이름·텍스트·위치·크기만 탭으로 이어붙인 표 형태로 압축한다.

action space는 `pyautogui`를 그대로 쓴다. agent는 문법이 맞는 파이썬 코드를 내야 하고 `press`나 `moveTo` 같은 기본 action을 for 루프 안에 넣을 수 있다는 게 표현력 면에서 이득이다. 여기에 WAIT·FAIL·DONE 세 특수 action을 더했다. MiniWoB++나 WebArena가 정의한 action space는 클릭과 타이핑, 웹 전용 몇 가지에 그쳐 우클릭이나 ctrl+클릭 다중 선택을 표현하지 못했고 이것이 agent 학습 능력에 천장을 씌웠다는 게 OSWorld가 날것의 입력을 고른 이유다.

### 실행 기반 채점

task마다 getter 함수와 evaluator 함수, 인자를 골라 config를 조립한다. getter는 최종 환경에서 핵심 조각을 꺼내오고 evaluator가 그것으로 성공을 판정한다.

여기가 가장 손이 많이 간 부분이다. 소프트웨어 내부 파일 포맷을 해석하고 전용 패키지를 쓰고 권한에 맞춰 미리 발판을 깔아야 한다. Chrome과 VLC는 원격 디버깅 포트를 열어두고 VS Code에는 확장을 만들어 넣는다. Thunderbird의 계정 정보를 복호화하느라 리버스 엔지니어링 도구를 동원한 경우까지 있다. 논문 인용 수처럼 값이 실시간으로 바뀌는 task는 채점 시점에 크롤러를 돌려 그때의 값을 가져와 비교한다.

품질 관리는 세 겹이다. 주석자가 자기 테스트 케이스로 1차 확인을 하고 그 예시를 만들지 않은 다른 저자 두 명이 agent 역할로 직접 풀어보며 지시문이 모호한 곳과 오탐을 되돌려준다. 사람 성능 측정과 baseline 실험 단계에서 4회에 걸쳐 400 man-hour를 더 썼다.

### task 구성

![[assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig03.png]]
*Figure 3: 369개 task의 앱 도메인·조작 유형 분포. 안쪽 고리가 Office 31.7%, Workflow 27.4%, Daily 21.1%, Professional 13.3%, OS 6.5% (Xie 2024, p.8)*

여덟 개 앱이 중심이다. Chrome, VLC, Thunderbird, VS Code, LibreOffice Calc·Writer·Impress, GIMP, 그리고 터미널·파일 관리자 같은 기본 앱이다. 지시문은 공식 가이드, TikTok·YouTube 팁 영상, WikiHow, Reddit·StackOverflow, Coursera 강의, 개인 블로그에서 조회 수와 추천 수를 보고 골랐다. 여러 앱이 협업하는 task는 인터넷에서 충분히 찾기 어려워 저자들이 직접 브레인스토밍으로 채웠다.

저자 9명이 3개월, 대략 1,800 man-hour를 들였다. 고유한 채점 함수가 134개인데, 비교 대상인 WebArena의 5개와는 자릿수가 다르다.

![[assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab04.png]]
*Table 4: 기존 환경 17종과의 비교. 통제 가능한 실행 환경·확장성·멀티모달·크로스앱·중간 초기 상태 다섯 축을 모두 채운 것은 OSWorld뿐이다 (Xie 2024, p.9)*

### 입력 설정 네 가지

먼저 시도한 방식은 few-shot 프롬프트였다. (관측, action) 쌍을 예시로 주는 방식인데 순수 screenshot 설정에서 2.79%로 나빴다. 히스토리 인코딩이 없는 탓으로 보고 최근 관측·action 3턴을 대화 형태로 컨텍스트에 넣는 방식으로 바꿨다.

- **a11y tree만**: 텍스트 기반 모델이 컨텍스트만으로 grounding할 수 있는지 본다. grounding은 모델의 출력을 화면의 실제 위치나 요소에 붙들어 매는 일을 말한다.
- **screenshot만**: 1920×1080 원본을 그대로 넣는다. 모델이 좌표를 직접 찍어야 한다.
- **screenshot + a11y tree**: 둘을 합쳐 공간 grounding이 나아지는지 확인한다.
- **Set-of-Mark**: 화면 요소에 번호가 붙은 경계 박스를 그려 넣고 모델은 좌표 대신 번호를 지목한다.

## 결과 (Results)

![[assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab05.png]]
*Table 5: 메인 결과. 입력 설정 4종 × 모델별 도메인 성공률이다. 맨 아래 사람 72.36%와 대비된다 (Xie 2024, p.10)*

전 설정 최고가 a11y tree 입력 GPT-4의 12.24%다. screenshot + a11y tree GPT-4V가 12.17%, a11y tree GPT-4o가 11.36%로 뒤를 잇는다. 순수 screenshot은 GPT-4V 5.26%, Gemini-ProV 5.80%에 머문다. 오픈소스 모델은 CogAgent 0.99~1.32%, Mixtral-8x7B 2.98%, Llama-3-70B 1.61%다.

![[assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig04.png]]
*Figure 4: 사람의 작업 시간과 정확도를 WebArena와 비교했다. 중위 소요 시간 111.94초 대 35.38초, 정확도 72.36% 대 88% (Xie 2024, p.9)*

사람 기준선은 해당 소프트웨어를 처음 쓰는 컴퓨터공학 전공 대학생으로 쟀다. 같은 조건으로 WebArena 100개를 측정해 나란히 놓았는데 OSWorld 쪽이 시간도 더 걸리고 정확도도 낮다.

### 도메인별 분산이 사람보다 훨씬 크다

CLI 성격이 강한 OS task는 상대적으로 낫고 GUI 클릭이 많은 Office task는 나쁘다. 모델과 설정에 따라 도메인 간 격차가 20%를 넘기도 한다. 여러 앱이 걸린 Workflow는 대체로 5% 아래다. 반면 사람은 어떤 유형에서도 70% 근처에서 5% 이내로 흔들린다.

![[assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab06.png]]
*Table 6: GPT-4V(SoM)의 task 유형별 성공률. 난이도 Easy 16.78%에서 Hard 4.59%로, 단일앱 13.74%에서 멀티앱 워크플로 6.57%로 떨어진다 (Xie 2024, p.12)*

난이도는 사람이 푸는 데 걸린 시간으로 나눴다. 180초를 넘는 Hard 구간은 사실상 풀지 못한다. 반면 사람은 같은 구간에서 49.57%로, 떨어지긴 해도 불가능해지지는 않는다.

### a11y tree와 SoM의 효과는 모델마다 갈린다

GPT-4V와 Claude-3은 a11y tree를 더해주면 순수 screenshot보다 오르는데 Gemini-Pro는 반대로 내려간다. SoM은 더 헷갈린다. 고전적인 이미지 이해 과제나 웹 agent에서 효과가 잘 알려진 기법인데, OSWorld의 GPT-4V에서는 screenshot + a11y tree보다 떨어졌다. 저자들은 OS task의 해상도가 높고 요소가 훨씬 많아서 — 스프레드시트 셀이 대표적이다 — 경계 박스가 주는 도움보다 노이즈가 커진다고 본다.

순수 screenshot 설정은 성적이 가장 낮지만 저자들은 이쪽이 장기적으로 맞는 방향이라고 못 박는다. a11y tree는 모든 소프트웨어가 제공하지도 않고 노이즈가 있는 환경에서는 얻을 수 없으며 잎 노드만 해도 수만 토큰이라 추론 부담이 크다.

### 관측 변형 실험

![[assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig05.png]]
*Figure 5: 해상도를 0.2~1.0배로 낮췄을 때의 성공률. 순수 screenshot은 해상도와 함께 오르지만 SoM은 0.4배에서 튀는 비단조 곡선을 그린다 (Xie 2024, p.13)*

해상도를 낮추면 순수 screenshot은 성능이 단조롭게 떨어진다. 출력 좌표는 원본 1080p 기준으로 요구되니 입력 해상도와 어긋나는 문제로 보인다. SoM은 사정이 다르다. 0.4배(768×432)에서 오히려 오르고 0.2배까지 내리면 눈에 띄게 나빠진다.

![[assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig07.png]]
*Figure 7: 히스토리 길이에 따른 성공률. SoM은 3까지 우상향해 평평해지고 순수 screenshot은 >3에서 오히려 떨어진다 (Xie 2024, p.13)*

히스토리는 SoM에서 1→3으로 늘릴 때 성능이 오르고 그 뒤로 평평해진다. 순수 screenshot에서는 늘려도 나아지지 않는다. 현재 VLM이 텍스트에서 하는 만큼 이미지에서 맥락을 뽑아내지 못한다는 뜻이다. a11y tree 길이 분포를 보면 관측 한 번을 담는 데만 컨텍스트 6,000 토큰이 필요하다.

### 창 교란에 취약하다

![[assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig08.png]]
*Figure 8: 창 교란에 따른 성능 하락. 원본 50.79%에서 위치 변경 36.5%, 최소 크기 15.04%, 무관한 창으로 어지럽힌 경우 25.39% (Xie 2024, p.14)*

agent가 비교적 잘 푸는 28개 task를 골라 시작 시점에 창을 흔들었다. 창 사이를 옮겨 다니기는 어느 정도 하는데 중간 단계로 창을 최대화하는 걸 못 하고 다른 데서 막힌다.

### OS 간 전이

Ubuntu 부분집합을 Windows로 옮겨 GPT-4V screenshot 설정으로 재봤다. Ubuntu 4.88%, Windows 2.55%, 상관계수 0.7이다. 관측 공간이 다른데도 상관이 높으므로 OSWorld에서 얻은 통찰과 방법론이 Windows로 옮겨간다고 볼 수 있다는 해석이다.

### 실패의 정체

550개 실패 표본에서 75% 이상이 마우스 클릭 부정확이다. 계획은 코드 주석에 또박또박 적어놓고 실행에서 무너진다. 여기서 반복 클릭과 환경 노이즈 딜레마가 파생된다. 잘못 누르고 조정하고 또 실패하며 step을 다 쓰거나, 의도치 않은 것을 눌러 팝업이 뜨고 엉뚱한 앱이 열린 뒤 원래 상태로 돌아오는 법을 모른다.

사람과 agent가 어려워하는 지점이 어긋난다는 관찰도 있다. 사람이 나은 쪽은 텍스트·디자인 작업이다. "슬라이드 글꼴을 굵게 하고 노트를 추가"나 "문서의 형광펜 표시를 모두 지워"처럼. 이런 조작 과정의 세밀한 데이터가 인터넷에 없으니 학습될 기회도 없었다. agent가 나은 쪽은 코드로 풀리는 것들이다. "CPU를 30초 감시하고 결과를 출력" 같은 GUI 상호작용이 거의 없는 task다. 다만 코드로 푸는 게 지시를 어기기도 한다. "GIMP로 영상의 2초~4초를 잘라내"에서 `ffmpeg`를 써버려 "GIMP로"를 무시했다.

Claude-3 Opus는 GSM8K나 HumanEval 같은 벤치마크에서 GPT-4를 앞서는데도 여기서는 2.84~7.76%p 낮다. 고수준 해법은 그럴듯하게 내놓지만 grounding 단계에서 세부에 환각이 섞인다.

## 한계 (Limitations)

저자들이 직접 짚은 것들이다. 오탐과 미탐이 아직 남아 있어서 4회 검수와 400 man-hour를 더 썼지만 완전히 없애지는 못했다고 인정한다. 안전 쪽은 더 열려 있다. 지금은 능력이 낮아서 실험 중 유해한 행동을 보지 못했지만 범용 디지털 agent가 CAPTCHA를 우회하거나 계정을 남용하는 데 쓰일 수 있다. 가상 머신으로 격리하고는 있으나 격리 환경에서 agent의 안전을 재는 신뢰할 만한 지표가 아직 없고 현재 채점 함수는 지시문 달성 여부만 보고 불필요한 파괴적 action은 거의 살피지 않는다.

a11y tree 품질이 앱마다 들쭉날쭉한 문제도 남는다. 지금 포함한 앱에서는 두드러지지 않지만 개발자가 a11y 규약을 지키리라는 보장이 없다.

## 이 wiki에서의 위치 (Context)

OSWorld는 computer-use agent 평가의 기준점이 됐고 이후 연구는 대부분 이 벤치마크 숫자로 자기 성과를 말한다. 2024년의 12.24%가 얼마나 낮은 출발점이었는지는 [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]]가 보고하는 OSWorld-Verified 72.6%와 나란히 놓으면 드러난다. 사람 기준선 72.36%를 2년 만에 따라잡은 셈이다.

공식 구현체는 [[evaluations/xlang-ai-osworld]]에 정리했다. 논문 버전과 2025년 OSWorld-Verified는 채점이 달라서 숫자를 직접 비교하면 안 된다는 점이 실무에서 가장 자주 걸리는 지점이다.

## 관련 페이지 (Related Pages)

- [[evaluations/xlang-ai-osworld]] — 공식 구현체. provider 추상화와 OSWorld-Verified 개정 내역
- [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]] — OSWorld를 평가 대상으로 삼아 학습 환경을 합성한 후속 연구
- [[overviews/glossary-agents]] — agent 도메인 용어 canonical 표기
- [[evaluations/bandi-2026-mcp-atlas-a-large-scale-benchmark-for]] — 채점 설계가 대비되는 agent 벤치마크. OSWorld는 task마다 실행 채점 스크립트를, MCP-Atlas는 원자 claim 목록을 붙였다
