---
title: "OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments"
type: paper
year: 2024
category: evaluations
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for.pdf
raw_filename: "xie-2024-osworld-benchmarking-multimodal-agents-for.pdf"
source_collection: external
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

## 한 줄 요약 (One-line Summary)

컴퓨터를 조작하는 agent를 재려면 실제로 돌아가는 OS가 필요하다는 판단에서, 가상 머신 위 Ubuntu에 369개 task를 얹고 task마다 초기 상태 설정과 채점 스크립트를 손으로 붙인 벤치마크다. 사람은 72.36%를 풀지만 2024년 당시 최고 모델은 12.24%에 그쳤고 실패의 대부분은 화면 좌표를 못 맞히는 grounding 문제로 드러났다.

## 1. 자료 정보 (Document Information)

- **제목**: OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments
- **저자**: Tianbao Xie 외 16인 (교신저자 Tao Yu)
- **소속**: 홍콩대(HKU), CMU, Salesforce Research, 워터루대
- **arXiv**: 2404.07972v2 (cs.AI, 2024-05-30 개정, 본문 18p + 부록 포함 51p) — NeurIPS 2024 Datasets and Benchmarks 채택
- **프로젝트**: <https://os-world.github.io> · 코드 <https://github.com/xlang-ai/OSWorld>

## 2. 주요 기여 (Key Contributions)

2024년 초 GUI agent 연구의 벤치마크는 두 갈래였다. 시연 기록만 모아 놓은 데이터셋은 실행 없이 다음 step 예측만 채점했다. 정답을 하나로 가정하니 다른 방식의 올바른 해법에는 벌점이 갔다. 실행이 되는 환경도 있었지만 웹 브라우저나 코딩처럼 좁은 영역에 갇혀 앱을 넘나드는 작업을 아예 표현하지 못했다.

1. 실제 OS를 통째로 환경으로 쓴다. 가상 머신 안의 Ubuntu·Windows·macOS를 그대로 구동하고 agent에게 원본 화면과 날것의 마우스·키보드 제어권을 준다. 앱별 시뮬레이터를 새로 짜지 않고도 임의의 앱이 걸린 task를 정의할 수 있다.
2. 저자 9명이 3개월, 대략 1,800 man-hour를 들여 369개 task에 지시문과 초기 상태 config, 채점 스크립트를 하나하나 붙였다. 고유한 채점 함수가 134개인데 비교 대상인 WebArena의 5개와는 자릿수가 다르다.
3. 시작점을 빈 바탕화면으로 두지 않는다. 작업이 진행되던 중간 시점을 그대로 재현한다. 파일을 내려받고 창을 열고 크기까지 맞춰 놓은 상태에서 agent가 들어온다.
4. 사용자가 실제로 요청했지만 기능이 없어지거나 애초에 존재하지 않는 요청 30개를 일부러 섞었다. 수행 불가 task다. agent가 FAIL을 정확히 뱉을 수 있는지도 함께 잰다.
5. 해당 소프트웨어를 처음 쓰는 대학생을 붙여 사람 기준선을 쟀다. 72.36%, 중위 소요 시간 111.94초가 나왔다. 같은 조건으로 WebArena 100개를 재서 88%, 35.38초와 나란히 놓았다.
6. 모델과 입력 설정을 격자로 돌렸다. GPT-4V 계열, Gemini 계열, Claude-3 Opus, Qwen-Max에 오픈소스 Mixtral·Llama-3·CogAgent를 얹고 입력을 a11y tree만 / screenshot만 / 둘 다 / Set-of-Mark 네 가지로 갈랐다. 결과는 0.99%에서 12.24% 사이에 몰린다.
7. 550개 실패 사례를 표본으로 뜯어보니 75% 넘게 마우스 클릭 좌표가 틀렸다. 계획은 코드 주석에 또박또박 적어놓고 실행에서 무너지는 패턴이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 task 정의

agent task를 POMDP로 형식화한다. POMDP는 상태를 부분적으로만 관측할 수 있는 순차 의사결정 문제를 뜻하고 여기서는 상태 공간 $S$, 관측 공간 $O$, action space $A$, 전이 함수 $T$, reward 함수 $R$의 다섯 쌍이다. 관측 $o_t$는 자연어 지시문과 screenshot, accessibility tree 또는 그 조합이다. accessibility tree는 OS가 화면 요소의 종류와 이름, 좌표와 크기를 프로그램이 읽을 수 있게 노출하는 트리다. 웹의 DOM에 대응하는 데스크톱 구조다. agent는 실행 가능한 action $a_t$를 내고 — 예를 들어 `.click(300, 540, button='right')` 이나 `.hotkey('ctrl', 'alt', 't')` — 새 상태와 새 관측을 받는다. DONE이나 FAIL이 나오거나 최대 step에 닿으면 끝난다. 실험에서는 15 step으로 잡았다.

reward는 $R: S \times A \to [0,1]$ 이다. 마지막 step에서 상태 전이가 목표에 부합하면 1 또는 1 미만 양수(부분 성공)를 주고 수행 불가 task에서 agent가 실패를 정확히 예측한 경우도 준다. 나머지는 전부 0이다.

### 3.2 환경 인프라

가상 머신은 agent를 호스트에서 격리해 되돌릴 수 없는 피해를 막는다. 스냅샷으로 환경을 빠르게 원래대로 돌려놓기도 한다.

초기화 단계에서 파일을 내려받고 소프트웨어를 열고 창 배치를 맞춘다. 채점 단계에서는 후처리로 특정 창을 활성화한 뒤 최종 상태에서 필요한 값을 뽑는다. 이 절차 전체가 config 파일 한 벌에 들어 있다.

### 3.3 관측 공간과 action space

관측 공간의 screenshot은 마우스 위치와 커서 모양까지 포함한 데스크톱 전체다. 사람이 보는 화면을 그대로 준다는 원칙이다. accessibility tree는 Ubuntu에서 ATSPI, Windows에서 PyWinAuto로 얻는다. 문제는 크기다. 원본 XML은 요소와 속성, 마크업이 넘쳐 토큰이 백만 단위로 나온다. 그래서 태그와 가시성, 활성 여부, 텍스트나 이미지가 있는지를 보고 걸러낸 뒤 태그와 이름, 텍스트, 위치, 크기만 탭으로 이어붙인 표 형태로 압축한다.

MiniWoB++나 WebArena가 정의한 action space는 클릭과 타이핑, 웹 전용 몇 가지에 그쳐서 우클릭이나 ctrl+클릭 다중 선택을 표현하지 못했다. 저자들은 이것이 agent의 학습 능력에 천장을 씌웠다고 지적한다. OSWorld의 action space는 `pyautogui`를 그대로 쓴다. agent는 문법이 맞는 파이썬 코드를 내야 하고 `press`나 `moveTo` 같은 기본 action을 for 루프 안에 넣을 수 있다. 이게 표현력 면에서 이득이다. 여기에 WAIT·FAIL·DONE 세 특수 action을 더했다.

### 3.4 실행 기반 채점

task마다 getter 함수와 evaluator 함수, 인자를 골라 config를 조립한다. getter는 수정된 파일이나 창 요소에 표시된 텍스트처럼 최종 환경의 핵심 조각을 꺼내오고 evaluator가 그것으로 성공을 판정한다. 없는 함수는 새로 만들어 환경 함수 라이브러리에 넣는다.

Thunderbird의 계정 정보를 복호화하느라 리버스 엔지니어링 도구를 동원한 경우까지 있다. 소프트웨어 내부 파일 포맷을 해석하고 전용 패키지를 쓰고 권한에 맞춰 미리 발판을 깔아야 한다. Chrome과 VLC는 원격 디버깅 포트를 열어두고 VS Code에는 확장을 만들어 넣는다. 논문 인용 수나 블로그 내용처럼 값이 실시간으로 바뀌는 task는 채점 시점에 크롤러를 돌려 그때의 값을 가져와 비교한다. 이 벤치마크에서 손이 가장 많이 간 부분이 여기다.

품질 관리는 세 겹이다. 주석자가 자기 테스트 케이스로 1차 확인을 한다. 그 예시를 만들지 않은 다른 저자 두 명이 agent 역할로 직접 풀어보며 지시문이 모호한 곳, 코너 케이스 크래시, 오탐을 되돌려준다. 사람 성능 측정과 baseline 실험 단계에서 4회에 걸쳐 400 man-hour를 더 썼다.

### 3.5 task 구성

중심에 둔 앱은 Chrome(웹), VLC(미디어), Thunderbird(메일), VS Code(IDE), LibreOffice Calc·Writer·Impress(문서), GIMP(이미지 편집) 여덟 개다. 여기에 터미널과 파일 관리자, 이미지 뷰어, PDF 뷰어 같은 기본 앱이 붙는다.

지시문은 공식 가이드와 튜토리얼, TikTok·YouTube 팁 영상, WikiHow, Reddit·Quora·Superuser·StackOverflow, Coursera·Udemy 강의, 개인 블로그에서 조회 수와 추천 수를 보고 골랐다. 여러 앱이 협업하는 task는 인터넷에서 충분히 찾기 어려워 저자들이 직접 브레인스토밍으로 채웠다. 환경이 열린 형태의 task 생성을 감당한다는 걸 보이려고 NL2Bash·Mind2Web·SheetCopilot·PPTC·GAIA에서 84개를 가져와 통합하기도 했다.

소프트웨어 성격으로 묶어 OS, Office(LibreOffice 3종), Daily(Chrome·VLC·Thunderbird), Professional(VS Code·GIMP), 여러 앱이 걸린 Workflow까지 다섯 갈래로 나눴다.

### 3.6 입력 설정 네 가지

먼저 시도한 방식은 few-shot 프롬프트였다. (관측, action) 쌍을 예시로 주는 방식인데 순수 screenshot 설정에서 2.79%로 나빴다. 히스토리 인코딩이 없는 탓으로 보고 최근 관측·action 3턴을 user/assistant가 번갈아 나오는 대화 형태로 컨텍스트에 넣는 방식으로 바꿨다. temperature 1.0, top-p 0.9.

- **a11y tree만**: 텍스트 기반 모델이 컨텍스트만으로 grounding할 수 있는지 본다. grounding은 모델의 출력을 화면의 실제 위치나 요소에 붙들어 매는 일을 말한다. 좌표가 트리 안에 들어있으니 모델은 그걸 골라 쓰면 된다.
- **screenshot만**: 1920×1080 원본을 그대로 넣는다. 사람의 지각에 가장 가깝고 모델이 좌표를 직접 찍어야 한다.
- **screenshot + a11y tree**: 둘을 합쳐 공간 grounding이 나아지는지 확인한다.
- **Set-of-Mark**: 걸러낸 a11y tree 정보로 화면 요소에 번호가 붙은 경계 박스를 그려 넣는다. 모델은 좌표 대신 번호를 지목하고 후처리가 그것을 action space로 옮긴다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 메인 표

전 설정 최고가 a11y tree 입력 GPT-4의 12.24%다. screenshot + a11y tree GPT-4V가 12.17%, a11y tree GPT-4o가 11.36%로 뒤를 잇는다. 순수 screenshot은 GPT-4V 5.26%, Gemini-ProV 5.80%에 머문다. 오픈소스 모델은 CogAgent 0.99~1.32%, Mixtral-8x7B 2.98%, Llama-3-70B 1.61%다. 사람은 72.36%.

| 입력 | 모델 | Overall |
|---|---|---|
| A11y tree | GPT-4 | **12.24%** |
| Screenshot + a11y tree | GPT-4V | 12.17% |
| Set-of-Mark | GPT-4V | 11.77% |
| A11y tree | GPT-4o | 11.36% |
| Screenshot | Gemini-ProV | 5.80% |
| Screenshot | GPT-4V | 5.26% |
| Screenshot | Claude-3-Opus | 2.42% |
| Screenshot | CogAgent | 1.11% |
| — | 사람 | **72.36%** |

### 4.2 도메인별 분산이 사람보다 훨씬 크다

CLI 성격이 강한 OS task는 상대적으로 낫고 GUI 클릭이 많은 Office task는 나쁘다. 모델과 설정에 따라 도메인 간 격차가 20%를 넘기도 한다. 여러 앱이 걸린 Workflow는 대체로 5% 아래다. 반면 사람은 어떤 유형에서도 70% 근처에서 5% 이내로 흔들린다. 사람이 task를 이해하고 푸는 방식과 현재 모델의 방식이 상당히 다르다는 신호다.

### 4.3 a11y tree와 SoM의 효과는 모델마다 갈린다

GPT-4V와 Claude-3은 a11y tree를 더해주면 순수 screenshot보다 오른다. Gemini-Pro는 반대로 내려간다. SoM은 더 헷갈린다. 고전적인 이미지 이해 과제나 웹 agent에서 효과가 잘 알려진 기법인데 OSWorld의 GPT-4V에서는 screenshot + a11y tree보다 떨어졌다. OS task는 해상도가 높고 요소도 훨씬 많다. 스프레드시트 셀이 대표적이다. 저자들은 이 조건에서 경계 박스가 도움보다 노이즈를 더 준다고 설명한다. 좌표 수준의 세밀한 조작은 박스로 표현되지도 않는다.

순수 screenshot 설정은 성적이 가장 낮지만 저자들은 이 설정이 장기적으로 맞는 방향이라고 못 박는다. a11y tree는 모든 소프트웨어가 제공하지도 않고 노이즈가 있는 환경에서는 얻을 수 없으며 잎 노드만 해도 수만 토큰이라 추론 부담이 크다.

### 4.4 관측 변형 실험

해상도를 낮추면 순수 screenshot은 성능이 단조롭게 떨어진다. 출력 좌표는 원본 1080p 기준으로 요구되니 입력 해상도와 어긋나는 문제로 보인다. SoM은 사정이 다르다. 0.4배(768×432)에서 오히려 오르고 0.2배까지 내리면 눈에 띄게 나빠진다.

히스토리 길이는 SoM에서 1→3으로 늘릴 때 성능이 오르고 그 뒤로 평평해진다. 순수 screenshot에서는 늘려도 나아지지 않는다. 현재 VLM은 텍스트에서 하는 만큼 이미지에서 맥락을 뽑아내지 못한다. a11y tree 길이 분포를 보면 관측 한 번을 담는 데만 컨텍스트 6,000 토큰이 필요하다(90퍼센타일 6,343.60).

### 4.5 창 교란에 취약하다

agent가 비교적 잘 푸는 28개 task를 골라(원래 성공률 50.79%) 시작 시점에 창을 흔들었다. 위치를 옮기면 36.5%, 크기를 최소로 줄이면 15.04%, 무관한 앱을 최대화해 화면을 어지럽히면 25.39%로 떨어진다. 창 사이를 옮겨 다니기는 어느 정도 하는데 중간 단계로 창을 최대화하는 걸 못 하고 다른 데서 막힌다.

### 4.6 OS 간 전이

Ubuntu 4.88%, Windows 2.55%, 상관계수 0.7. Ubuntu 부분집합을 Windows로 옮겨 GPT-4V screenshot 설정으로 재본 결과다. 관측 공간이 다른데도 상관이 높다. 저자들은 OSWorld에서 얻은 통찰과 방법론이 Windows로도 옮겨간다고 해석한다.

### 4.7 정성 분석

성공 사례는 오히려 복잡하다. 화면을 VLC와 터미널로 나누고 `ffmpeg`를 두 번 써서 자막을 뽑아낸 경우가 대표적이다. 반대로 실패는 의외로 단순하다. "제목을 가운데 정렬해줘"에서 엉뚱한 단어를 선택하고 관계없는 메뉴를 열며 헛돈다.

550개 실패 표본에서 75% 이상이 마우스 클릭 부정확이다. 여기서 반복 클릭과 환경 노이즈 딜레마가 파생된다. 잘못 누르고 조정하고 또 실패하며 step을 다 쓰거나 의도치 않은 것을 눌러 팝업이 뜨고 엉뚱한 앱이 열린 뒤 원래 상태로 돌아오는 법을 모른다. 웹 페이지에 대한 사람 같은 상식도 없어서 팝업을 닫지 않거나 광고에 끌려간다.

"슬라이드 글꼴을 굵게 하고 노트를 추가"나 "문서의 형광펜 표시를 모두 지워" 같은 텍스트와 디자인 작업에서는 사람이 앞선다. 이런 조작 과정의 세밀한 데이터가 인터넷에 없으니 학습될 기회도 없었다. 거꾸로 agent는 코드로 풀리는 task에서 낫다. "CPU를 30초 감시하고 결과를 출력"이나 "프로세스를 강제 종료"처럼 GUI 상호작용이 거의 없는 것들이다. 사람과 agent가 어려워하는 지점은 이렇게 어긋난다. 다만 코드로 푸는 게 지시를 어기는 경우가 있다. "GIMP로 영상의 2초~4초를 잘라내"에서 `ffmpeg`를 써버려 "GIMP로"를 무시했다.

Claude-3 Opus는 GSM8K나 HumanEval 같은 벤치마크에서 GPT-4를 앞서는데도 여기서는 2.84~7.76%p 낮다. 고수준 해법은 그럴듯하게 내놓지만 grounding 단계에서 세부에 환각이 섞인다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자들이 직접 짚은 것들이다.

오탐과 미탐이 아직 남아 있다. 4회 검수와 400 man-hour를 더 썼지만 완전히 없애지는 못했고 시간과 레드팀을 더 들여야 한다고 인정한다.

VLM 자체에 모자란 부분이 있다. 훨씬 긴 컨텍스트를 효율적으로 처리하는 능력, 창 변화에 견디는 GUI grounding, 이미지 형태의 맥락 이해다. 마지막 항목이 중요한 이유는 이미지로 히스토리를 인코딩할 수 있어야 그 위에 메모리와 반성을 얹을 수 있기 때문이다.

길고 날것인 관측·action 기록을 다루는 새로운 인코딩 방식이 agent 방법론 쪽 숙제다. 컨텍스트를 압축하는 메모리와 반성, GUI·CLI 전용 프로토콜도 함께 든다. 개인화와 커스터마이즈는 실사용 조수의 요건으로 꼽는다.

지금은 능력이 낮아서 실험 중 유해한 행동을 보지 못했지만 범용 디지털 agent가 CAPTCHA를 우회하거나 계정을 남용하거나 취약점을 공격하는 데 쓰일 수 있다. 가상 머신으로 격리하고는 있으나 격리 환경에서 agent의 안전을 재는 신뢰할 만한 지표가 아직 없다. 현재 채점 함수는 지시문 달성 여부만 보고 불필요한 파괴적 action은 거의 살피지 않는다.

의료와 교육, 산업, 교통 같은 전문 영역과 개인화 요구로 환경과 데이터를 넓히는 일도 과제로 꼽는다. a11y tree 품질이 앱마다 들쭉날쭉한 문제도 있다. 지금 포함한 앱에서는 두드러지지 않지만 개발자가 a11y 규약을 지키리라는 보장이 없다. 컴퓨터 조작 데이터를 손쉽게 모아 agent 능력으로 바꾸는 수집 방법도 마련해야 한다고 덧붙인다.

## 6. 관련 연구 (Related Work)

멀티모달 agent 벤치마크는 도메인별로 갈린다. 코딩에서는 InterCode·SWE-bench·DevBench 계열, 웹에서는 MiniWoB++·WebShop·Mind2Web·WebArena·VisualWebArena·WorkArena, 모바일에서는 PixelHelp·MetaGUI·AitW·WikiHow 계열이다. 실제 컴퓨터에 붙지만 상호작용은 안 되는 GUI grounding 데이터셋으로 AssistGUI·SeeClick·OmniAct이 있다. OSWorld는 이 가운데 실행 가능성과 확장성, 크로스앱, 중간 초기 상태를 한꺼번에 만족한다고 내세운다.

멀티모달 agent에 쓸 VLM은 어떤 입력을 받아야 하는가. 기존 GUI 연구는 HTML과 accessibility tree, view hierarchy 같은 구조 데이터를 grounding 원천으로 삼아왔다. 하지만 소스는 장황하고 직관적이지 않고 노이즈가 많으며 아예 접근할 수 없는 경우도 있다. 그래서 screenshot을 입력으로 받는 특화 모델(ScreenAI·Pix2Struct·CogAgent)과 범용 foundation model 양쪽이 후보가 된다.

## 7. 용어집 (Glossary)

- **accessibility tree (a11y tree)**: OS가 화면 요소의 종류·이름·좌표·크기를 프로그램이 읽을 수 있게 노출하는 트리. Ubuntu는 ATSPI, Windows는 PyWinAuto로 얻는다. 웹의 DOM에 대응한다.
- **execution-based evaluation**: 최종 환경 상태를 실제로 조회해 채점하는 방식. 정답 action 시퀀스와 대조하는 방식과 달리 다른 해법도 인정한다.
- **getter / evaluator**: 채점 config를 이루는 두 함수. getter가 최종 환경에서 파일·창 텍스트·쿠키 등을 꺼내면 evaluator가 그것으로 성공을 판정한다.
- **initial state setup config**: task 시작 시점의 환경을 재현하는 JSON 명세. 파일 내려받기, 앱 열기, 창 크기 조정 등이 들어간다.
- **infeasible task**: 기능이 없어졌거나 애초에 존재하지 않아 완료 자체가 불가능한 task. 369개 중 30개. agent가 FAIL을 정확히 내면 reward를 준다.
- **Set-of-Mark (SoM)**: screenshot의 요소마다 번호가 붙은 경계 박스를 씌워 모델이 좌표 대신 번호를 지목하게 하는 기법.
- **POMDP**: 상태를 부분적으로만 관측할 수 있는 순차 의사결정 문제. OSWorld는 agent task를 $(S, O, A, T, R)$ 다섯 쌍으로 형식화한다.
- **pyautogui**: 마우스·키보드를 파이썬 코드로 조작하는 라이브러리. OSWorld의 action space 문법이다.
- **computer_13**: 강화학습 연구용으로 따로 만든 대체 action space(Table 8). `pyautogui` 코드 생성 대신 구조화된 action 유형을 쓴다.
- **OSWorld-Verified**: 2025-07-28 공개된 개정판. 커뮤니티가 보고한 채점 결함을 고치고 AWS 병렬화를 붙였다. 논문에는 없고 repo README에 있다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | OSWorld 전체 그림 (task 예시 + 실행 루프) | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 4 | 환경 인프라 — config 한 벌과 Coordinator·VM | caption-region | ★ wiki 권장 (method, 핵심) |
| fig03 | 8 | 369개 task의 도메인·조작 분포 sunburst | manual | ★ wiki 권장 (data) |
| fig04 | 9 | 사람 소요 시간·정확도를 WebArena와 비교 | manual | ★ wiki 권장 (baseline) |
| fig05 | 13 | 해상도 downsampling ablation | manual | ★ wiki 권장 (analysis) |
| fig06 | 13 | a11y tree 길이 분포 (90p = 6,343.60 토큰) | caption-region | (선택) |
| fig07 | 13 | 히스토리 길이 ablation | manual | ★ wiki 권장 (analysis) |
| fig08 | 14 | 창 교란에 따른 성능 하락 | manual | ★ wiki 권장 (robustness) |
| fig09 | 15 | 성공 사례 — VLC + 터미널로 자막 추출 | caption-region | (선택) |
| fig10 | 16 | 정성 분석 세 사례 | caption-region | (선택) |
| fig11~fig21 | 24~51 | 부록 — a11y tree 시각화, t-SNE, SoM 예시, 오류 사례 screenshot | caption-region | (부록, 미권장) |
| tab01 | 5 | 채점 스크립트 예시 3개 | table-region | ★ wiki 권장 (method) |
| tab02 | 6 | action space 예시 | table-region | (선택) |
| tab03 | 8 | 핵심 통계 (369 / 134 / 302) | manual | ★ wiki 권장 (data) |
| tab04 | 9 | 기존 환경 17종과의 비교 | table-region | ★ wiki 권장 (positioning, 핵심) |
| tab05 | 10 | 메인 결과 — 입력×모델 성공률 | table-region | ★ wiki 권장 (result, 핵심) |
| tab06 | 12 | GPT-4V(SoM) task 유형별 성공률 | table-region | ★ wiki 권장 (result) |
| tab07 | 14 | OS 간 성능·상관계수 | table-region | (선택) |
| tab08~tab14 | 26~39 | 부록 — computer_13 action space, 출처 목록, 세부 통계, 앱별 상세 성공률 | table-region | (부록, 미권장) |
