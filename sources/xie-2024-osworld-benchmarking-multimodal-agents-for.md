---
title: "OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments"
type: paper
year: 2024
category: evaluations
raw_path: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for.pdf
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
    caption: "OSWorld 전체 구조. 위쪽은 task 예시 두 개(장부 갱신, 스네이크 게임 코드 수정)의 실행 화면이고, 아래쪽은 지시문과 초기 상태 config가 VM으로 들어가고 agent가 screenshot과 a11y tree를 받아 마우스와 키보드 action을 내면 최종 상태를 실행 기반으로 채점하는 흐름이다"
    page: 2
    bbox_norm: [0.147, 0.050, 0.863, 0.363]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig02.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig02.png
    caption: "환경 인프라 구조. 왼쪽은 지시문, config, evaluator, expected, func을 담은 JSON 설정 파일 하나이고, 오른쪽은 Coordinator가 Simulator와 Task Manager로 VM 여러 대를 제어해 setup, postprocess, getter, metrics를 거쳐 reward를 산출하는 경로다"
    page: 4
    bbox_norm: [0.131, 0.033, 0.873, 0.314]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig03.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig03.png
    caption: "369개 task의 앱 도메인과 조작 유형 분포 sunburst. 안쪽 고리는 Office 31.7%, Workflow 27.4%, Daily 21.1%, Professional 13.3%, OS 6.5%이고 바깥 고리는 data analysis 8.9%, slide editing 8.7% 같은 세부 조작이다"
    page: 8
    bbox_norm: [0.485, 0.152, 0.825, 0.406]
    strategy: manual
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig04.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig04.png
    caption: "사람의 작업 시간(violin plot)과 정확도(막대)를 WebArena와 비교. 중위 소요 시간 111.94초 대 35.38초, 정확도 72.36% 대 88%. 크롭 상단에 Table 4 마지막 행의 체크 표시와 134가 함께 잘려 들어갔다"
    page: 9
    bbox_norm: [0.485, 0.422, 0.845, 0.641]
    strategy: manual
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig05.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig05.png
    caption: "screenshot 해상도를 원본의 0.2배에서 1.0배까지 바꿨을 때의 성공률(10% 부분집합). 순수 screenshot은 해상도가 높을수록 오르지만 SoM은 0.4배에서 20%대로 가장 높고 0.2배에서 하락하는 비단조 곡선이다"
    page: 13
    bbox_norm: [0.174, 0.224, 0.515, 0.404]
    strategy: manual
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig06.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig06.png
    caption: "샘플링한 trajectory에서 관측 한 번당 a11y tree 토큰 길이 분포 히스토그램. 90퍼센타일이 6,343.60 토큰이다"
    page: 13
    bbox_norm: [0.167, 0.549, 0.510, 0.678]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig07.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig07.png
    caption: "히스토리 길이 1, 2, 3, 3 초과에 따른 성공률(10% 부분집합). SoM은 3까지 올라 15%대에서 평평해지고 순수 screenshot은 3 초과에서 오히려 하락한다"
    page: 13
    bbox_norm: [0.175, 0.704, 0.515, 0.884]
    strategy: manual
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig08.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig08.png
    caption: "창 교란에 따른 성공률 하락. 원본 50.79%에서 위치 변경 36.5%, 최소 크기 15.04%, 무관한 창으로 화면을 어지럽힌 경우 25.39%"
    page: 14
    bbox_norm: [0.160, 0.225, 0.430, 0.394]
    strategy: manual
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig09.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig09.png
    caption: "성공 사례. 화면을 VLC와 터미널로 나누고 ffmpeg를 두 번 실행해 자막을 subtitles.srt로 추출하고 자막 없는 영상을 따로 만든 6단계. 크롭 상단에 본문 문단이 함께 잘려 들어갔다"
    page: 15
    bbox_norm: [0.126, 0.087, 1.000, 0.436]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig10.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig10.png
    caption: "정성 분석 세 사례. 1행은 제목 가운데 정렬처럼 쉬운 task에서 GPT-4V가 실패한 경우, 2행은 형광펜 표시 제거처럼 사람보다 agent가 어려워한 경우, 3행은 GIMP 영상 자르기를 ffmpeg로 풀어 지시를 어긴 경우"
    page: 16
    bbox_norm: [0.152, 0.068, 0.956, 0.373]
    strategy: caption-region
    curated: true
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig11.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig11.png
    caption: "가공하지 않은 XML 형식 accessibility tree의 일부. desktop-frame 아래 application과 panel 노드가 좌표와 크기 속성을 달고 중첩된다"
    page: 24
    bbox_norm: [0.231, 0.083, 0.769, 0.299]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig12.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig12.png
    caption: "Accerciser로 a11y tree 구성 요소를 확인한 예. LibreOffice Calc 툴바의 프린터 아이콘과 Accessibility Explorer 트리의 Print 노드가 대응한다"
    page: 24
    bbox_norm: [0.231, 0.321, 0.769, 0.561]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig13.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig13.png
    caption: "지시문 분포 비교 t-SNE 세 장. OSWorld(DesktopEnv), Mind2Web, WebArena, Android 데이터를 각 300개씩 샘플링했고 OSWorld 군집이 나머지 셋과 떨어져 있다"
    page: 29
    bbox_norm: [0.175, 0.083, 0.824, 0.237]
    strategy: caption-region
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig14.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig14.png
    caption: "VLC, Chrome, Calc, Writer, GIMP, Impress 여섯 앱 GUI에 SoM 번호 박스를 씌운 screenshot 예시"
    page: 37
    bbox_norm: [0.175, 0.397, 0.825, 0.593]
    strategy: caption-region
    curated: false
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig15.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig15.png
    caption: "네 가지 입력 설정별 GPT-4V agent가 소비한 step 수 분포. a11y tree 설정은 4 step 근처에 몰리고 screenshot과 SoM 설정은 15 step 이상 상한에 몰린다"
    page: 38
    bbox_norm: [0.231, 0.083, 0.769, 0.365]
    strategy: caption-region
    curated: false
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig16.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig16.png
    caption: "소프트웨어별 사용 오류 사례. 1행 GIMP 밝기 조절, 2행 LibreOffice Calc 회의 장소 입력, 3행 Chrome 기본 검색 엔진 변경. 크롭 상단에 부록 코드 블록이 함께 잘려 들어갔다"
    page: 40
    bbox_norm: [0.157, 0.083, 0.879, 0.660]
    strategy: caption-region
    curated: false
  - id: fig17
    label: Figure 17
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig17.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig17.png
    caption: "Figure 17 캡션 위에 놓인 이미지. 뭄바이발 스톡홀름행 항공편 검색 task에서 Chrome 업데이트 팝업과 쿠키 배너가 떠 있는 화면으로, 캡션이 설명하는 나이키 클릭 오류가 아니라 Figure 18 캡션의 환경 노이즈 사례에 해당한다. 크롭 상단에 본문 문단이 함께 잘려 들어갔다"
    page: 44
    bbox_norm: [0.123, 0.108, 0.938, 0.418]
    strategy: caption-region
    curated: false
  - id: fig18
    label: Figure 18
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig18.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig18.png
    caption: "Figure 18 캡션 위에 놓인 이미지. 나이키 여성 저지 목록 task에서 좌표 오류로 즐겨찾기 버튼을 눌러 Bookmark added 창이 뜬 화면으로, Figure 17 캡션이 설명하는 마우스 클릭 부정확 사례에 해당한다. 크롭 상단에 본문 문단 조각이 함께 잘려 들어갔다"
    page: 44
    bbox_norm: [0.150, 0.464, 0.910, 0.779]
    strategy: caption-region
    curated: false
  - id: fig19
    label: Figure 19
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig19.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig19.png
    caption: "사람과 agent의 난이도 차이 보충 사례. 1행은 슬라이드 글꼴 굵게와 노트 추가에서 agent가 실패한 경우, 2행과 3행은 CPU 30초 감시와 프로세스 강제 종료를 터미널 명령으로 성공한 경우"
    page: 45
    bbox_norm: [0.153, 0.113, 0.855, 0.409]
    strategy: caption-region
    curated: true
  - id: fig20
    label: Figure 20
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig20.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig20.png
    caption: "Claude-3 Opus의 오류 사례 세 개. secret.docx 경로 복사, Calc 셀 B6 값을 Chrome에서 검색, 문서의 text를 test로 치환 task가 모두 실패했다. 크롭 상단에 부록 코드 블록과 D.4 절 제목이 함께 잘려 들어갔다"
    page: 48
    bbox_norm: [0.159, 0.083, 0.861, 0.531]
    strategy: caption-region
    curated: false
  - id: fig21
    label: Figure 21
    kind: figure
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/fig21.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/fig21.png
    caption: "같은 VS Code 설정 task에서 SoM agent는 설정 UI를 찾지 못했고 screenshot과 a11y tree agent는 settings.json 값을 직접 고쳐 성공한 대비 사례. 크롭 상단에 부록 코드 블록과 D.6 절 본문이 함께 잘려 들어갔다"
    page: 51
    bbox_norm: [0.154, 0.083, 0.858, 0.636]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab01.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab01.png
    caption: "채점 스크립트 예시 세 개. 아마존 쿠키 삭제 확인, 시트 이름 변경과 복사 결과를 클라우드 정답 파일과 대조, 메일 수신자 필드를 a11y tree로 검사"
    page: 5
    bbox_norm: [0.170, 0.135, 0.830, 0.430]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab02.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab02.png
    caption: "action space 예시. moveTo, click, write, press, hotkey, scroll, dragTo, keyDown, keyUp 같은 pyautogui 호출과 WAIT, FAIL, DONE 특수 action"
    page: 6
    bbox_norm: [0.443, 0.132, 0.831, 0.291]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab03.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab03.png
    caption: "핵심 통계. Ubuntu task 369개(멀티앱 워크플로 101, 단일앱 268, 외부 통합 84, 수행 불가 30), Windows 보충 task 43개, 초기 상태 302개, 채점 스크립트 134개"
    page: 8
    bbox_norm: [0.164, 0.239, 0.470, 0.407]
    strategy: manual
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab04.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab04.png
    caption: "기존 환경 16종과 OSWorld의 비교. 통제 가능한 실행 환경, 확장성, 멀티모달, 크로스앱, 중간 초기 상태 다섯 기준을 모두 만족하는 것은 OSWorld뿐이고 실행 기반 채점 함수 수도 134개로 가장 많다"
    page: 9
    bbox_norm: [0.167, 0.203, 0.830, 0.440]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab05.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab05.png
    caption: "메인 결과. 입력 설정 4종과 모델별 도메인 성공률. 최고는 a11y tree 입력 GPT-4의 12.24%이고 맨 아래 사람 72.36%와 대비된다"
    page: 10
    bbox_norm: [0.199, 0.129, 0.801, 0.541]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab06.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab06.png
    caption: "GPT-4V(SoM)의 task 유형별 성공률. 난이도 Easy 16.78%에서 Hard 4.59%로, 단일앱 13.74%에서 멀티앱 워크플로 6.57%로 하락한다"
    page: 12
    bbox_norm: [0.536, 0.649, 0.830, 0.790]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab07.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab07.png
    caption: "OS 간 성능 비교. GPT-4V screenshot 설정으로 Ubuntu 4.88%, Windows 2.55%, 상관계수 0.7"
    page: 14
    bbox_norm: [0.536, 0.644, 0.829, 0.712]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab08.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab08.png
    caption: "강화학습 연구용 대체 action space computer_13의 13개 action 유형과 인자, 그리고 WAIT, FAIL, DONE 특수 action"
    page: 26
    bbox_norm: [0.167, 0.134, 0.844, 0.425]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab09.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab09.png
    caption: "task 예시를 수집한 출처 목록. 앱별로 공식 도움말, Super User, Stack Overflow, Reddit, YouTube 같은 자료원과 링크"
    page: 27
    bbox_norm: [0.167, 0.252, 0.955, 0.886]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab10.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab10.png
    caption: "벤치마크 세부 통계. 앱별 예시 수, 평균 지시문 토큰 수, 수행 불가 지시문 수, 외부 벤치마크에서 통합한 지시문 수"
    page: 28
    bbox_norm: [0.170, 0.728, 0.830, 0.803]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab11.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab11.png
    caption: "Windows 분석용 세트 세부 통계. Excel 11, Word 9, PPT 7, Workflow 16으로 총 43개이며 수행 불가 task와 통합 task는 없다"
    page: 28
    bbox_norm: [0.331, 0.862, 0.669, 0.916]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab12.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab12.png
    caption: "도메인별 하위 집합에서 뽑은 추가 task 예시와 초기 상태 screenshot, 필요한 능력"
    page: 31
    bbox_norm: [0.167, 0.209, 0.890, 0.851]
    strategy: table-region
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab13.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab13.png
    caption: "Ubuntu와 Windows에서 a11y tree 노드를 남길지 정하는 기준. 태그, showing, visible, enabled, 이름이나 텍스트 존재, 위치, 크기"
    page: 36
    bbox_norm: [0.170, 0.629, 0.830, 0.914]
    strategy: table-region
    curated: false
  - id: tab14
    label: Table 14
    kind: table
    file: assets/xie-2024-osworld-benchmarking-multimodal-agents-for/tab14.png
    raw: raw/papers/xie-2024-osworld-benchmarking-multimodal-agents-for-figures/tab14.png
    caption: "앱 단위로 나눈 상세 성공률. OS, Calc, Impress, Writer, VLC, Thunderbird, Chrome, VS Code, GIMP, Workflow"
    page: 39
    bbox_norm: [0.174, 0.148, 0.860, 0.604]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

OSWorld는 가상 머신 안에서 실제 OS를 구동하고 agent에게 원본 screenshot과 마우스, 키보드 제어권을 주는 실행 가능한 컴퓨터 환경이다. 그 위에 Ubuntu task 369개를 정의하고 task마다 초기 상태 설정과 실행 기반 채점 스크립트를 붙였다. 사람은 72.36%를 풀지만 최고 모델은 12.24%에 그쳤고, 실패 표본 550개 중 75% 이상에서 마우스 클릭 좌표 부정확이 관찰됐다.

## 1. 자료 정보 (Document Information)

- **제목**: OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments
- **저자**: Tianbao Xie 외 16인
- **소속**: The University of Hong Kong, CMU, Salesforce Research, University of Waterloo
- **arXiv**: 2404.07972v2 (cs.AI, 2024-05-30). raw PDF는 51쪽이며 표지에 "Preprint. Under review."로 표기돼 있다. 게재 학회 정보는 raw에 없다
- **프로젝트 페이지**: <https://os-world.github.io> (raw 각주 1). 코드, 환경, baseline, 데이터를 공개한다고 적었다

## 2. 주요 기여 (Key Contributions)

기존 벤치마크의 한계는 두 가지였다. 첫째, 시연 기록만 모아 놓은 데이터셋은 실행 환경이 없어 다음 step 예측만 채점하고, 정답을 하나로 가정하므로 다른 방식의 올바른 해법에 벌점을 준다. 둘째, 실행 환경이 있는 벤치마크는 웹 탐색이나 코딩처럼 특정 앱이나 도메인에 한정돼 관측과 action space를 단순화하고, 앱을 넘나드는 작업을 표현하지 못한다.

1. **실제 OS 환경**: 가상 머신 안의 실제 OS를 구동하고 agent에게 원본 화면과 자유로운 마우스, 키보드 제어권을 준다. 앱별 시뮬레이터를 새로 만들지 않고도 임의의 앱이 걸린 task를 정의할 수 있다. 환경 자체는 Ubuntu, Windows, macOS를 지원한다고 적었지만 벤치마크는 Ubuntu에서 만들었고 macOS는 저작권 문제로 개발하지 않았다(부록 B.1).
2. **369개 task와 134개 채점 함수**: 컴퓨터과학 전공 학생 저자 9명이 3개월 이상, 약 1,800 man-hour(단일앱 650, 워크플로 750, 재검토 400)를 들여 task마다 지시문, 초기 상태 config, 실행 기반 채점 스크립트를 붙였다. 고유한 채점 함수는 134개로, Table 4의 비교 대상 중 두 번째로 많은 MiniWoB++의 125개와 WebArena의 5개를 웃돈다.
3. **중간 초기 상태**: 빈 바탕화면이 아니라 작업이 진행되던 중간 시점을 재현한다. 파일을 내려받고 앱을 열고 창 크기를 맞춘 상태에서 agent가 시작한다.
4. **수행 불가 task 30개**: 사용자가 실제로 요청했지만 기능이 없어졌거나 애초에 존재하지 않는 요청을 섞었다. agent가 FAIL을 정확히 출력하는지도 함께 측정한다.
5. **사람 기준선**: 해당 소프트웨어를 써 본 적 없는 컴퓨터과학 전공 대학생이 전 예시를 풀어 72.36%, 중위 소요 시간 111.94초를 기록했다. 같은 조건으로 WebArena 100개를 측정하면 88%, 35.38초다.
6. **모델과 입력 설정 격자 평가**: GPT 계열, Gemini 계열, Claude-3 Opus, Qwen-Max와 오픈소스 Mixtral, Llama-3, CogAgent를 a11y tree, screenshot, 둘의 결합, Set-of-Mark 네 입력 설정으로 평가했다. 성공률은 0.99%에서 12.24% 사이이고 일부 앱 부분집합은 0%다.
7. **실패 분석**: 실패 표본 550개 중 75% 이상에서 마우스 클릭 부정확이 나타났다. 코드 주석에는 계획을 상세히 적지만 실행에서 좌표를 맞히지 못하는 패턴이다. 여기서 반복 클릭과 환경 노이즈 문제가 파생된다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 task 정의

agent task를 POMDP $(S, O, A, T, R)$로 형식화한다. POMDP는 상태를 부분적으로만 관측할 수 있는 순차 의사결정 문제를 뜻하며, 상태 공간 $S$, 관측 공간 $O$, action space $A$, 전이 함수 $T: S \times A \to S$, reward 함수 $R: S \times A \to \mathbb{R}$로 이루어진다. 관측 $o_t$는 자연어 지시문과 screenshot, accessibility tree(줄여서 a11y tree) 또는 그 조합이다. a11y tree는 OS나 브라우저의 접근성 API가 화면 요소의 종류, 상태, 위치를 프로그램이 읽을 수 있게 노출하는 트리다.

agent는 실행 가능한 action $a_t$를 낸다. 예를 들어 `.click(300, 540, button='right')`나 `.hotkey('ctrl', 'alt', 't')`다. action이 실행되면 새 상태 $s_{t+1}$과 새 관측 $o_{t+1}$을 받는다. 종료 action(DONE 또는 FAIL)이 나오거나 최대 step에 닿으면 끝난다. 실험에서는 최대 15 step이다.

reward 함수는 실행 기반이며 $R: S \times A \to [0, 1]$이다. 마지막 step에서 상태 전이가 task 목표에 부합하면 1 또는 1 미만의 양수(부분 성공)를 주고, 수행 불가 task에서 agent가 실패를 정확히 예측한 경우에도 준다. 나머지는 모두 0이다.

### 3.2 환경 인프라

OSWorld 환경은 호스트 머신에서 실행된다. Coordinator가 config 파일을 받아 가상 머신 인스턴스를 만들고 Task Manager로 초기 상태를 구성한다. config 파일은 사용할 VM 스냅샷과 설정 정보(파일 다운로드, 앱 열기, 추가 설정)를 지정한다. agent는 screenshot, a11y tree, 터미널 출력 같은 관측을 받고 `.click(300, 540)` 같은 코드 문자열을 action으로 내며, 환경의 Simulator가 이를 VM 안에서 실행한다. task가 끝나면 Task Manager가 post-config에 따라 후처리(파일 저장, 앱 재실행)를 하고 데이터를 호스트로 가져온 뒤 채점 스크립트를 실행한다. 한 호스트에서 VM 여러 대를 동시에 실행해 학습과 평가를 병렬화할 수 있고 headless 실행도 지원한다.

가상 머신을 고른 이유는 격리와 복원이다. agent가 호스트에 되돌릴 수 없는 피해를 주지 못하게 막고, 스냅샷으로 환경을 빠르게 초기화한다. 부록 A.1은 Docker와 달리 VM은 자체 커널을 실행하므로 Windows, macOS, Linux와 x64, ARM 같은 하드웨어를 폭넓게 지원한다고 설명한다.

config 파일 하나에 네 가지가 들어간다.

| 구성 요소 | Figure 2의 색 | 역할 |
|---|---|---|
| config | 빨강 | 초기화 단계. 파일 다운로드, 앱 열기, 창 배치 |
| postconfig | 주황 | 채점 전 후처리. 특정 창 활성화, 파일 저장 |
| result와 expected | 노랑 | 채점용 파일과 정보 획득. VM의 결과 파일, 클라우드의 정답 파일, Chrome 쿠키 등 |
| func와 options | 초록 | 채점 함수와 인자. 예를 들어 `compare_table`에 `sheet_fuzzy` 규칙 |

### 3.3 초기 상태 설정

예시마다 VM 스냅샷을 통째로 저장하면 불필요한 하드웨어 상태까지 담겨 예시당 수 GB가 필요하다. 그래서 스냅샷 하나에 config 기반 설정을 결합한 하이브리드 방식을 쓴다. 절차는 세 단계다.

1. VM 에뮬레이터를 시작하고 지정한 스냅샷으로 되돌린다.
2. (선택) 파일을 준비한다. 호스트가 직접 링크로 내려받아 LAN으로 VM에 올리고 앱으로 연다. OS task의 일부 초기 파일은 명령줄로 파일 시스템을 직접 조작해 만든다.
3. (선택) 재처리 명령을 실행한다. 열린 Impress 파일을 5쪽으로 넘기거나 화면 가운데를 클릭해 메인 화면으로 돌아오는 식이다.

파일은 가능한 한 task 출처에서 구하고, 공개되지 않은 파일은 시나리오에 맞게 사실적으로 재구성했다. 창 열기와 크기 조정은 앱과 OS의 API로 구현했고 API로 어려운 기능은 pyautogui로 다시 구현했다. 예시 하나의 setup 작성에 약 1 man-hour가 들었다.

### 3.4 관측 공간

관측은 세 종류를 구현했다. 전체 screenshot, a11y tree, 터미널 출력이다. 환경 녹화기도 구현했지만 agent 능력의 한계 때문에 모델링에는 쓰지 않았다. 필요하면 특정 앱에서 데이터를 뽑는 식으로 관측을 재구성하거나 확장할 수 있다.

screenshot은 마우스 위치와 커서 모양까지 포함한 데스크톱 전체다. 사람이 보는 것과 같은 지각을 준다는 원칙이며, 커서 정보가 중요한 경우에 도움이 된다. 기본 해상도는 1920×1080인데, 2023년 인터넷 사용자 화면 해상도 통계에서 가장 흔한 값이고 16:9 비율이기 때문이다. 절대 픽셀 값 암기를 피하거나 해상도 일반화를 연구할 수 있게 VM 해상도 변경도 지원한다.

a11y tree는 Ubuntu에서 pyatspi(ATSPI), Windows에서 pywinauto로 얻어 XML로 변환한다. OS마다 접근성 API가 다르다. Windows는 MSAA와 UIA, macOS는 NSAccessibility와 Accessibility Inspector, Ubuntu의 GNOME은 ATSPI다. 원본 XML은 요소와 중복 속성, 마크업이 많아 보통 100만 토큰을 넘는다. 그래서 태그, 가시성, 활성 여부, 텍스트나 이미지 존재 등으로 노드를 걸러낸 뒤 태그, 이름, 텍스트, 위치, 크기만 탭으로 이어붙인 표 형태로 압축한다(부록 C.3, Table 13). 걸러낸 뒤에도 관측 한 번의 90퍼센타일 길이가 6,343.60 토큰이다.

### 3.5 action space

action space는 마우스 이동, 클릭(좌, 우, 다중), 드래그, 키 입력, 단축키 등 사람이 컴퓨터에 하는 action 전체를 담는다. 구현은 pyautogui 라이브러리를 그대로 쓴다. agent는 문법이 맞는 pyautogui 파이썬 코드를 내야 하며, `press`나 `moveTo` 같은 기본 action을 for 루프 같은 프로그램 구조 안에 결합할 수 있어 표현력이 크게 오른다. 여기에 대기(WAIT), 수행 불가 판단(FAIL), 완료 판단(DONE) 세 특수 action을 더했다. 모바일 연구에서 강조된 타이밍 문제와 수행 가능 여부 판단을 다루기 위해서다.

MiniWoB++, CC-Net, WebArena 같은 기존 환경은 클릭과 타이핑, 웹 전용 action 몇 가지만 정의해 우클릭이나 ctrl을 누른 채 클릭하는 다중 선택을 표현하지 못했다. 저자들은 이것이 agent 학습 능력의 상한을 만든다고 지적한다. pyautogui를 고른 다른 이유는 xdotool, mouse, keyboard 같은 대안보다 OS 간 호환성이 좋았고, 프롬프트에서 action space 정의에 드는 토큰이 적기 때문이다.

강화학습 연구용으로 pyautogui를 유한한 action 클래스로 감싼 computer_13도 만들었다. MOVE_TO, CLICK, MOUSE_DOWN, MOUSE_UP, RIGHT_CLICK, DOUBLE_CLICK, DRAG_TO, SCROLL, TYPING, PRESS, KEY_DOWN, KEY_UP, HOTKEY 13개 action 유형에 WAIT, FAIL, DONE을 더한 구조다(Table 8). 부록은 언어 모델이 `pyautogui.locateOnScreen('Apple.png')` 같은 화면 이미지 검색 함수를 생성하는 현상도 언급하며, grounding 근거가 부족할 때 흥미로운 방법이 될 수 있다고 적었다.

### 3.6 실행 기반 채점

일반 컴퓨터 task는 단일 지표로 환원되지 않으므로 예시별 채점 지표를 설계했다. task마다 getter 함수, evaluator 함수, 인자를 골라 config를 조립한다. getter는 최종 환경에서 핵심 조각(수정된 파일, 창 요소에 표시된 텍스트)을 꺼내오고 evaluator가 그것으로 성공을 판정한다. 없는 함수는 새로 만들어 환경 함수 라이브러리에 추가한다.

채점에는 소프트웨어 내부 파일 포맷 해석, 전용 패키지 사용, 소프트웨어 권한에 맞춰 접근 경로를 미리 마련하는 사전 준비가 필요하다. Chrome과 VLC는 원격 디버깅 포트를 열고 VS Code에는 확장을 만들어 설치한다. Thunderbird 계정 정보 복호화에는 리버스 엔지니어링 도구 Firefox Decrypt를 썼다. 논문 인용 수나 블로그 내용처럼 값이 실시간으로 바뀌는 task는 getter 안에 크롤러 스크립트 같은 동적 함수를 두어 채점 시점의 값을 가져와 비교한다.

| 앱 | 채점 방법 (부록 B.6) |
|---|---|
| LibreOffice Calc, Writer, Impress | 결과 파일(xlsx, docx, pptx)을 정답과 비교하거나 특정 속성(페이지 스타일, 틀 고정, 로케일)을 검사. openpyxl, python-docx, python-pptx를 쓰고 미지원 속성은 Office Open XML을 직접 파싱. 버전 7.3.7.2 |
| Thunderbird | 프로필 폴더의 설정과 데이터 파일을 읽음. 계정 정보는 Firefox Decrypt로 복호화. 메일 작성 task는 보내기 전 작성 창을 a11y tree로 검사. 버전 115.6.0 |
| VLC | HTTP 인터페이스, 설정 파일, 결과 파일 비교, a11y tree 검사를 병용 |
| Chrome | 호스트의 Playwright를 socat 포트 전달로 VM의 Chrome에 연결. 일부 task는 웹 페이지 HTML 소스도 활용 |
| VS Code | 파일 조작 task는 결과 파일을 정답과 비교. 앱 기능 task는 직접 만든 확장의 명령과 settings JSON 값으로 내부 상태를 읽음 |
| GIMP | 파일 조작 task는 pillow로 결과 이미지를 정답과 비교. 앱 기능 task는 GIMP 설정 파일을 읽음 |
| Windows(Excel, Word, PowerPoint, Thunderbird, Chrome) | LibreOffice 채점 함수를 재사용. Thunderbird는 프로필 폴더 구조 차이만 수정. Chrome은 socat을 Ncat으로 교체 |

품질 관리는 여러 단계다. 주석자가 자기 테스트 케이스로 1차 확인한다. 예시마다 그 예시를 만들지 않은 다른 저자 두 명이 agent 역할로 직접 풀어보며 지시문 불명확, 완료 불가, 코너 케이스 크래시, 심각한 오탐과 미탐을 되돌려준다. 사람 성능 측정과 baseline 실험 단계에서는 개인이 바뀌어 가며 세 번 더 지시문 정합성과 다른 해법에 대한 정확성을 검토했다. 이 과정에 4회에 걸쳐 400 man-hour 이상을 썼다. 예시 하나의 채점 개발과 검토에는 대학원생 기준 약 2 man-hour가 들었다.

### 3.7 OS와 앱 선택, task 구성

2023년 데스크톱 OS 점유율은 Windows 69.5%, macOS 20.4%, ChromeOS 3.2%, Linux 3.1%다. Windows와 macOS는 폐쇄 소스라 저작권 문제가 있고 ChromeOS는 Google 계정 의존이 커서 공개 벤치마크에 맞지 않는다. 그래서 오픈소스 앱이 풍부한 Ubuntu를 메인으로 골랐다. Windows용으로는 Microsoft Office(Excel, PowerPoint, Word) 중심의 소규모 세트를 만들었고 라이선스 구매 후 활성화해 쓴다. macOS는 Apple 외 기기 설치가 불법이라 개발하지 않았다.

앱 선택 기준은 다섯 가지다. Ubuntu 22.04 가용성, 오픈소스 라이선스, 다운로드 수와 블로그 추천 빈도로 본 인기, 활발한 사용자 커뮤니티와 공식 문서, 카테고리 다양성이다. 결과적으로 일반 용도의 VLC(미디어), Chrome(웹), Thunderbird(메일)와 전문 용도의 VS Code(IDE), LibreOffice Calc, Writer, Impress(문서), GIMP(이미지 편집)까지 여덟 종류를 골랐다. 여기에 터미널, 파일 관리자, 이미지 뷰어, PDF 뷰어 같은 기본 OS 앱이 더해진다.

지시문은 공식 가이드와 튜토리얼, TikTok과 YouTube의 팁 영상, WikiHow 같은 how-to 사이트, Reddit, Quora, Superuser, StackOverflow 같은 Q&A 포럼, Coursera와 Udemy 강의, 개인 블로그에서 조회 수와 추천 수로 본 인기, 유용성, 다양성을 기준으로 골랐다. 여러 앱이 협업하는 task는 인터넷에서 충분히 찾기 어려워 저자들이 기존 예시를 조합하거나 일상 시나리오에서 착안해 브레인스토밍으로 만들었다. 선정 후 다른 저자 두 명이 수행 가능성, 모호성, 출처 정합성을 교차 검토했다. 수행 불가 예시 30개를 포함했고, 환경의 통합 능력을 보이기 위해 NL2Bash, Mind2Web, SheetCopilot, PPTC, GAIA에서 84개를 가져와 통합했다. 예시 수집에 약 400 man-hour가 들었다.

task는 소프트웨어 성격에 따라 OS, Office(LibreOffice Calc, Impress, Writer), Daily(Chrome, VLC, Thunderbird), Professional(VS Code, GIMP), Workflow(여러 앱)의 다섯 카테고리로 묶는다.

| 통계 (Table 3) | 값 |
|---|---|
| Ubuntu task 전체 | 369 (100%) |
| 멀티앱 워크플로 | 101 (27.4%) |
| 단일앱 | 268 (72.6%) |
| 외부 벤치마크 통합 | 84 (22.8%) |
| 수행 불가 | 30 (8.1%) |
| Windows 보충 task | 43 |
| 고유 초기 상태 | 302 |
| 채점 스크립트 | 134 |

| 앱 (Table 10) | OS | Calc | Impress | Writer | VLC | Thunderbird | Chrome | VS Code | GIMP | Workflow | 전체 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 예시 수 | 24 | 47 | 47 | 23 | 17 | 15 | 46 | 23 | 26 | 101 | 369 |
| 평균 지시문 토큰 | 22.38 | 33.30 | 25.19 | 35.30 | 35.82 | 34.07 | 22.07 | 20.78 | 16.23 | 51.24 | 33.36 |
| 수행 불가 | 5 | 1 | 0 | 1 | 3 | 1 | 3 | 5 | 10 | 1 | 30 |
| 통합 | 7 | 19 | 30 | 0 | 0 | 0 | 26 | 0 | 0 | 2 | 84 |

Windows 분석 세트 43개는 Excel 11, Word 9, PPT 7, Workflow 16이고 평균 지시문 토큰은 32.48이며 수행 불가 task와 통합 task가 없다(Table 11). 지시문 임베딩을 t-SNE로 시각화하면(Figure 13, 데이터셋당 300개 샘플링) OSWorld 군집이 Mind2Web, WebArena, Android 데이터 군집과 떨어져 있어 의미 분포가 가장 넓다고 주장한다.

### 3.8 baseline 설정과 입력 설정 네 가지

먼저 VisualWebArena를 따라 (관측, action) 쌍을 few-shot 예시로 주는 프롬프트를 시도했지만 순수 screenshot 설정에서 2.79%로 성능이 낮았다. 히스토리 인코딩 부재와 프롬프트 방식 변화가 원인이라고 보고, 최근 관측과 action 3개를 user와 assistant 프롬프트가 번갈아 나오는 채팅 형태로 context window에 넣는 방식으로 바꿨다. 최대 토큰을 넘으면 입력 앞부분부터 잘라낸다.

| 설정 (부록 C.1) | 값 |
|---|---|
| GPT 모델 버전 | `gpt-3.5-turbo-16k`, `gpt-4-0125-preview`, `gpt-4-vision-preview` |
| Gemini 모델 버전 | `gemini-pro`, `gemini-pro-vision` |
| temperature / top_p | 1.0 / 0.9 |
| 최대 생성 토큰 | 1,500 |
| 최대 step / 최대 시간 | 15 step / 30분 |

입력 설정은 네 가지다.

- **a11y tree만**: 텍스트 기반 언어 모델이 컨텍스트만으로 추론하고 grounding할 수 있는지 본다. grounding은 모델의 출력을 화면의 실제 위치나 요소에 대응시키는 일을 말한다. 원본 좌표가 트리 안에 있으므로 모델은 그 좌표로 action을 grounding해야 한다.
- **screenshot만**: 사람의 지각에 가장 가까운 입력이다. VM의 원본 screenshot을 특별한 처리 없이 VLM에 넣고 모델이 정확한 좌표를 직접 예측한다. 해상도 ablation도 여기서 한다.
- **screenshot + a11y tree**: 원본 screenshot과 단순화한 a11y tree를 함께 넣어 공간 grounding이 나아지는지 확인한다.
- **Set-of-Mark(SoM)**: 입력 이미지를 구획으로 나누고 번호나 마스크, 박스를 표시해 VLM의 grounding 능력을 높이는 기법이다. OSWorld는 원 논문의 분할 모델 대신 걸러낸 a11y tree로 클릭 가능한 요소의 경계 박스를 잡아 번호를 붙이고, VisualWebArena와 UFO를 따라 index, tag, name, text 메타데이터 표를 함께 준다. 모델은 좌표 대신 번호를 지목하고 후처리가 이를 action space로 옮긴다. 소프트웨어 생태계의 지원 수준에 따라 저품질이거나 오해를 부르는 박스가 생기기도 한다(부록 C.4).

프롬프트는 pyautogui 코드만 코드 블록으로 반환하도록 요구하고, `pyautogui.locateCenterOnScreen`과 `pyautogui.screenshot()` 사용을 금지하며, 여러 줄을 낼 때 `time.sleep(0.5)` 간격을 두게 한다. sudo 비밀번호도 프롬프트에 넣어 준다. SoM 프롬프트는 `pyautogui.click(tag_2)`처럼 좌표 자리에 태그를 쓸 수 있게 한다(부록 C.2).

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 사람 기준선

기본 소프트웨어 사용 능력은 있지만 해당 예시와 소프트웨어를 접한 적 없는 컴퓨터과학 전공 대학생이 전 예시를 풀었다. 소요 시간과 정답 여부를 기록했고 비교를 위해 WebArena 100개도 같은 방식으로 측정했다. OSWorld의 중위 완료 시간은 111.94초로 WebArena의 35.38초보다 길며, 900초 이상 걸린 예시도 상당수다. 정확도는 72.36%로 순수 웹 task의 88%보다 낮다.

### 4.2 메인 결과

전 설정 최고는 a11y tree 입력 GPT-4의 12.24%다. screenshot + a11y tree GPT-4V가 12.17%, SoM GPT-4V가 11.77%, a11y tree GPT-4o가 11.36%로 뒤를 잇는다. 순수 screenshot은 가장 강한 VLM인 GPT-4V와 Gemini-Pro-vision도 5.26%에서 5.80%에 머문다. a11y tree 입력 언어 모델은 2.37%에서 12.24% 사이다.

| 입력 | 모델 | Overall |
|---|---|---|
| a11y tree | Mixtral-8x7B | 2.98% |
| a11y tree | Llama-3-70B | 1.61% |
| a11y tree | GPT-3.5 | 2.69% |
| a11y tree | GPT-4 | **12.24%** |
| a11y tree | Gemini-Pro | 2.37% |
| a11y tree | Gemini-Pro-1.5 | 4.81% |
| a11y tree | Qwen-Max | 6.87% |
| a11y tree | GPT-4o | 11.36% |
| screenshot | CogAgent | 1.11% |
| screenshot | GPT-4V | 5.26% |
| screenshot | Gemini-ProV | 5.80% |
| screenshot | Gemini-Pro-1.5 | 5.40% |
| screenshot | Claude-3-Opus | 2.42% |
| screenshot | GPT-4o | 5.03% |
| screenshot + a11y tree | CogAgent | 1.32% |
| screenshot + a11y tree | GPT-4V | 12.17% |
| screenshot + a11y tree | Gemini-ProV | 3.48% |
| screenshot + a11y tree | Gemini-Pro-1.5 | 5.10% |
| screenshot + a11y tree | Claude-3-Opus | 4.41% |
| screenshot + a11y tree | GPT-4o | 11.21% |
| SoM | CogAgent | 0.99% |
| SoM | GPT-4V | 11.77% |
| SoM | Gemini-ProV | 1.06% |
| SoM | Gemini-Pro-1.5 | 7.79% |
| SoM | Claude-3-Opus | 6.72% |
| SoM | GPT-4o | 4.59% |
| 사람 | | **72.36%** |

### 4.3 도메인별 분산

agent 성능은 도메인에 따라 크게 흔들린다. CLI 성격이 강한 OS task는 상대적으로 좋고 GUI 클릭이 많은 Office task(스프레드시트 셀 클릭, 문서 처리)는 나쁘다. 모델과 설정에 따른 편향도 일관되지 않아 격차가 20%p를 넘기도 한다. 여러 앱이 걸린 Workflow task는 대체로 5% 아래이고 최고가 6.57%다. 반면 사람은 모든 유형에서 70% 근처를 유지하며 편차가 5%p를 넘지 않는다. 저자들은 사람이 task를 이해하고 완수하는 방식이 현재 LLM과 VLM 기반 논리와 상당히 다를 수 있다고 해석한다.

### 4.4 a11y tree와 SoM의 효과

a11y tree의 효과는 모델마다 다르다. GPT-4V와 Claude-3는 순수 screenshot보다 a11y tree를 더한 설정에서 오르는데, 이는 GUI 요소를 정확히 지각하고 추론하는 능력에 개선 여지가 크다는 뜻이다. Gemini-Pro는 반대로 내려간다.

SoM은 GPT-4V에서 screenshot + a11y tree보다 성능이 낮았다(11.77% 대 12.17%). 고전적 이미지 이해 과제와 웹 agent에서 알려진 SoM의 효과와 어긋나는 결과다. 저자들은 OS task가 해상도가 높고 스프레드시트 셀처럼 요소가 훨씬 많아 경계 박스가 보조 역할보다 노이즈를 더 만든다고 추정한다. 좌표 수준의 세밀한 조작은 박스로 표현되지도 않는다. 부록 D.6은 SoM이 action space를 좁혀 탐색과 적응을 방해한다고 덧붙인다. VS Code 설정 task에서 SoM 없는 agent는 settings.json을 편집해 성공했지만 SoM agent는 설정 화면의 체크박스를 찾다가 더 긴 action 경로와 클릭 오류로 실패했다(Figure 21).

순수 screenshot 설정은 5.26%로 가장 낮지만 저자들은 장기적으로 이것이 최종 구성이라고 본다. 여러 앱이 걸린 워크플로 task에서는 의외로 괜찮은 결과를 냈다. 추가 정보가 필요 없는 유일한 설정이라는 점이 핵심이다. a11y tree는 모든 소프트웨어가 잘 지원하지도 않고, 주변 화면을 통해 컴퓨터를 보는 것처럼 노이즈가 있는 조건에서는 얻을 수 없으며, 잎 노드만 해도 수만 토큰이라 추론 부담이 크다. 순수 시각 agent는 일반화가 강하고 물리 세계와 통합될 가능성도 크다고 전망한다.

### 4.5 난이도, 수행 가능성, 앱 수별 성능

이하 분석은 별도 언급이 없으면 GPT-4V의 SoM 설정이다.

| task 부분집합 (Table 6) | 전체 대비 비율 | 성공률 |
|---|---|---|
| Easy (0~60초) | 28.72% | 16.78% |
| Medium (60~180초) | 40.11% | 13.12% |
| Hard (180초 초과) | 30.17% | 4.59% |
| Infeasible | 8.13% | 16.67% |
| Feasible | 91.87% | 13.34% |
| Single-App | 72.63% | 13.74% |
| Multi-App Workflow | 27.37% | 6.57% |

난이도는 사람의 완료 시간으로 나눴다. 시간이 길수록 성공률이 떨어지며 180초를 넘는 task는 거의 풀지 못한다(수행 불가 예시에서 운으로 맞힌 경우를 고려하면 더 그렇다). 사람은 같은 세 구간에서 84.91%, 81.08%, 49.57%로 같은 방향으로 완만히 하락한다.

수행 불가 task(16.67%)가 수행 가능 task(13.34%)보다 약간 높지만 전체적으로 낮다. 순수 screenshot 설정의 Gemini-Pro처럼 일부 설정에서는 agent가 쉽게 FAIL을 내고 시도를 포기하는 경향이 있어 수행 불가 task에서 오탐이 생긴다.

단일앱 task의 평균 13.74%도 낮지만 멀티앱 워크플로 6.57%의 두 배가 넘는다. 단일앱 안에서는 GUI 집약적인 Office 앱이 가장 나쁘고 LibreOffice Calc 부분집합은 0%인 경우가 많다.

### 4.6 관측 변형 실험

**해상도.** 대부분의 VLM은 1080p, 2K, 4K보다 훨씬 낮은 해상도 데이터로 학습됐다. screenshot 설정과 SoM 설정에서 원본의 0.2, 0.4, 0.6, 0.8배로 다운샘플링해 10% 부분집합으로 측정했다. 출력 좌표는 여전히 원본 1080p 기준으로 요구된다. 순수 screenshot은 해상도가 오를수록 성능이 직접 상승하는데, screenshot 해상도와 출력 좌표의 불일치가 원인일 수 있다. SoM은 다르다. 0.4배(768×432)에서 오히려 성능이 오르고 0.2배로 더 내리면 눈에 띄게 하락한다(Figure 5).

**히스토리 길이.** 메인 실험은 현재 기술 조건에서 a11y tree가 성능에 결정적임을 보였다. document, item, button, heading, label 등 핵심 태그만 남기는 휴리스틱 규칙을 써도 LLM은 여전히 큰 컨텍스트가 필요하다. 샘플링한 a11y tree 관측의 분포를 보면 관측 한 번의 약 90%를 담는 데 6,000 토큰 길이가 필요하다(Figure 6). 현재 관측만 쓰면 agent가 같은 오류를 반복하므로 과거 N 라운드의 관측과 action을 함께 넣고 N을 1, 2, 3, 전부(가능한 최대)로 바꿨다. SoM은 히스토리가 늘수록 성능이 오른다(Figure 7). 순수 screenshot 설정에서는 히스토리를 늘려도 나아지지 않는데, 현재 VLM이 텍스트만큼 이미지에서 강건한 맥락 정보를 뽑아내지 못한다는 뜻으로 해석한다.

### 4.7 창 교란

SoM 설정에서 agent가 비교적 잘 푸는 28개 task(성공률 50.79%)를 골라 각 task 시작 시점에 창을 교란했다. 위치 변경, 최소 크기로 축소, 무관한 소프트웨어를 열어 최대화해 화면을 어지럽히기 세 가지다. 이렇게 원래 부분집합의 몇 배 되는 샘플을 만들어 측정했다.

| 조건 (Figure 8) | 성공률 |
|---|---|
| 원본 | 50.79% |
| 위치 변경 | 36.5% |
| 최소 크기 | 15.04% |
| 무관한 창으로 어지럽힘 | 25.39% |

본문은 이 하락을 "60%에서 80%가 넘는 하락"이라고 적었다. 그러나 Figure 8 값으로 계산한 상대 하락률은 위치 변경 28%, 최소 크기 70%, 어지럽힘 50%다. agent는 창 사이를 어느 정도 전환하지만 중간 단계로 창을 최대화하지 못하고 다른 일에 막힌다. 창 사이를 이동하는 능력은 있지만 창 상태를 관리하는 포괄적 전략이 없다는 해석이다.

### 4.8 OS 간 전이

Windows에서 초기 상태 설정, 최종 채점, a11y tree와 screenshot 관측을 지원하도록 환경을 확장하고 기존 Ubuntu 부분집합을 예시별로 수정해 Windows로 옮겼다. GPT-4V screenshot 설정으로 측정한 성공률은 Ubuntu 4.88%, Windows 2.55%이고 상관계수는 0.7이다(Table 7). 관측 공간이 다른데도 상관이 높으므로, OSWorld에서 얻은 통찰과 방법론이 Windows 환경으로 신뢰성 있게 옮겨진다고 해석한다.

### 4.9 정성 분석

**성공 사례.** GPT-4V 기반 agent는 복잡한 문제 해결이나 창의적 사고가 필요한 task를 풀기도 한다. 영상에서 자막 파일을 추출해 저장하는 task에서 agent는 화면을 왼쪽 VLC와 오른쪽 터미널로 나누고 ffmpeg를 두 번 실행했다. 한 번은 자막을 subtitles.srt로 뽑고 다른 한 번은 자막을 제거한 영상을 만들었다(Figure 9).

**실패 사례.** "문서 제목을 가운데 정렬"이라는 단순한 요구를 grounding하지 못하고 무관한 단어를 선택하거나 무관한 메뉴를 여는 쓸모없는 action을 반복했다(Figure 10 1행). 부록 D.1의 코드를 보면 agent는 (400, 150)과 (340, 80)을 가운데 정렬 버튼이라 추정해 반복 클릭했다. 소프트웨어 사용 사전 지식도 부족하다. GIMP에서 "밝기를 낮춰"라는 지시에 어느 메뉴가 밝기 조정인지 몰라 Colors 메뉴의 항목을 28픽셀 간격으로 추정해 무작위로 열고 닫다가 최대 step을 소진했다(Figure 16).

**GPT-4V agent의 공통 오류.** 여러 설정에서 표본으로 뽑은 실패 예시 550개 중 75% 이상에서 마우스 클릭 부정확이 나타났다. 코드 주석에 상세하고 정확한 단계를 계획하고도 올바른 좌표를 클릭하지 못하므로 planning은 강하고 실행은 약하다. 여기서 두 오류가 파생된다. 반복 클릭은 잘못 클릭하고 조정하고 다시 실패하며 step을 소진하는 현상이다. 환경 노이즈 딜레마(environmental noise dilemma)는 의도치 않은 대상을 클릭해 팝업이 뜨거나 무관한 앱이 열리는 현상으로, 전문 소프트웨어 사전 지식이 없어 action과 현재 상태의 불일치에 빠진 뒤 정상 상태로 돌아오는 방법을 모른다. 실제 웹 페이지에서 팝업을 닫지 않거나 광고 콘텐츠에 이끌리는 등 사람 같은 기본 인지도 부족하다. 지시문 오해와 시각적 간과에서 오는 실패도 있다.

**사람과 agent의 난이도 차이.** 사람이 앞서는 task는 텍스트와 디자인 작업이다. "이 슬라이드 글꼴을 굵게 하고 노트를 추가", "문서의 형광펜 표시를 모두 지워" 같은 것이다. 인터넷에 소프트웨어 실행 과정 같은 세밀한 데이터가 없어 학습 과정도 없었으므로 grounding 능력이 부족하고, GUI 논리 이해 부족으로 선택과 스크롤 같은 조작도 서툴다. agent가 앞서는 task는 "시스템 CPU를 30초 감시하고 결과를 출력", "프로세스 강제 종료"처럼 코드로 풀리는 것이다. GUI 상호작용이 거의 없고 복잡한 코드와 명령 실행으로 완료할 수 있다. 다만 코드로 푸는 방식이 지시와 어긋나기도 한다. "GIMP로 영상의 2초에서 4초 구간을 잘라내" task에서 agent는 ffmpeg로 잘라내 "GIMP 사용" 요구를 무시했다(Figure 10 3행). 복사, 붙여넣기, 시트 일괄 편집처럼 기계적으로 반복되는 task에서는 agent도 사람만큼 비효율적이다. API 부재나 API 관련 학습 데이터 부족이 원인이며, 느린 응답으로 시간 초과나 최대 step 초과가 생기기도 한다.

**Claude-3 대 GPT-4V.** Claude-3 Opus는 GSM8K와 HumanEval 같은 벤치마크에서 GPT-4를 앞서지만 OSWorld에서는 GPT-4V보다 2.84%p에서 7.76%p 낮다. 만족스러운 고수준 해법은 내놓지만 grounding에 세부 환각이 섞인다. 파일 더블클릭을 열기가 아니라 선택으로 해석하고, Calc의 B열을 C열로 다루며, VS Code 치환 상자에 텍스트를 입력하고 전체 치환을 클릭하지 않았다(Figure 20). 사람의 planning과는 잘 맞지만 실행 grounding이 부족하다는 결론이다.

### 4.10 step 수 분포

부록 C.5는 GPT-4V가 네 설정에서 소비한 step 수 분포를 제시한다(Figure 15). 설정에 따라 agent가 실행하는 step 수와 종료를 결정하는 시점이 눈에 띄게 다르며, 이 행동의 세밀한 제어와 분석은 후속 연구 과제로 남긴다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자가 명시한 한계와 과제는 다음과 같다.

- **오탐과 미탐**: 4회 검수와 400 man-hour 이상을 들였지만 채점의 오탐과 미탐을 완전히 없애지 못했다. 추가 시간 투자와 레드팀이 필요하며 향후 과제로 남겼다.
- **VLM 능력**: 훨씬 긴 컨텍스트를 효율적으로 처리하는 능력, 앱 창 변화에 강건한 GUI grounding, 지시에 맞는 정확한 action 생성, 이미지 형태의 맥락 이해가 필요하다. 이미지로 히스토리를 인코딩할 수 있어야 그 위에 메모리와 반성을 구축할 수 있다. pre-training, 하류 fine-tuning, 모델 구조 자체의 개선이 필요할 수 있다.
- **agent 방법론**: 길고 가공되지 않은 관측과 action 기록을 다루는 새 인코딩 방식, 컨텍스트를 압축하는 효율적 메모리와 반성, 메모리 메커니즘을 통한 지식 grounding, 사용자 프로파일링과 장기 상호작용 메모리에 기반한 개인화와 커스터마이즈, GUI와 CLI 전용 프로토콜이 과제다.
- **안전**: 범용 디지털 agent는 CAPTCHA 우회, 특허권 침해, 계정 남용, 취약점 악용에 쓰일 수 있다. 현재는 agent 능력이 낮아 실험 중 유해 행동을 관찰하지 못했다. VM으로 격리하지만 격리 환경에서 agent 안전을 재는 신뢰할 만한 지표가 없다. 현재 채점 함수는 task 완료 정확성만 보고 불필요하게 피해를 주는 action은 거의 살피지 않으며, 잠재적 부작용을 효율적으로 검출하는 방법도 마련하지 못했다.
- **데이터와 환경 확장**: 의료, 교육, 산업, 교통 같은 전문 분야와 개인화 요구로 범위를 넓히고 다양한 하드웨어와 소프트웨어 설정에서 배포되게 해야 한다. a11y tree 품질은 앱마다 다르며 현재 포함한 앱에서는 두드러지지 않지만 개발자가 a11y 규약을 지킨다는 보장이 없다. 중복 요소를 걸러내고 누락 요소를 다루는 지능적 방법, 컴퓨터 조작 데이터를 손쉽게 수집해 agent 능력으로 바꾸는 방법도 필요하다.

자료 자체의 내적 불일치와 모호한 부분은 다음과 같다.

- Table 5와 Table 14의 Workflow 열이 일부 다르다. Llama-3-70B(a11y tree)는 0.93% 대 0.63%, GPT-4V(screenshot + a11y tree)는 4.64% 대 4.59%, Gemini-Pro-1.5(screenshot + a11y tree)는 1.52% 대 1.56%, Claude-3-Opus(screenshot + a11y tree)는 1.00% 대 0.99%, Mixtral-8x7B와 CogAgent(screenshot + a11y tree)는 0.09% 대 0.10%다. 이 문서는 본문 Table 5 값을 우선한다.
- 부록 D.2의 Figure 17과 Figure 18은 캡션과 이미지가 서로 바뀌어 있다. Figure 17 캡션은 나이키 스토어 클릭 오류를 설명하지만 그 위의 이미지는 항공편 검색 화면의 팝업과 쿠키 배너이고, Figure 18 캡션은 환경 노이즈를 설명하지만 그 위의 이미지는 나이키 즐겨찾기 오클릭 화면이다. 본문도 "Figure 18 and Figure 17" 순서로 언급한다.
- 창 교란 실험의 "60%에서 80%가 넘는 하락"은 Figure 8 값으로 계산한 상대 하락률(28%, 70%, 50%)과 맞지 않는다.
- 400 man-hour가 세 곳에 등장한다. 1,800 man-hour 내역의 재검토 400시간, 예시 수집 약 400시간, 4회 검수 400시간 이상이다. 이들의 포함 관계는 본문에 명시되지 않는다.
- Table 5의 Claude-3-Opus(screenshot + a11y tree) Office 값은 3.57%이고 같은 열의 다른 모델은 3.58%다. 반올림 차이로 보이나 확인할 수 없다.

## 6. 관련 연구 (Related Work)

멀티모달 agent 벤치마크는 코딩, 웹, 모바일로 나뉜다. 코딩에는 InterCode, SWE-bench, DevBench, Design2Code가 있고, 웹에는 World of Bits, MiniWoB++, WebShop, Mind2Web, WebArena, VisualWebArena, WorkArena가 있으며, 모바일에는 PixelHelp, META-GUI, UGIF, AndroidEnv, AitW, Mobile-Env, AutoDroid, AppAgent, Mobile-Agent가 있다. 실제 컴퓨터에 연결되지만 상호작용은 없는 GUI grounding 데이터셋으로 AssistGUI, SeeClick, ScreenAgent, OmniAct, Cradle이 있고, AgentBench와 GAIA는 여러 측면의 종합 평가를 시도한다. OSWorld는 단일 환경에 갇히거나 실행이 안 되는 기존 연구와 달리 완전히 통제 가능한 환경에서 다양한 task와 정밀한 채점 스크립트를 제공한다고 내세운다.

| 벤치마크 (Table 4) | 인스턴스 (템플릿) | 통제 가능 실행 환경 | 환경 확장성 | 멀티모달 | 크로스앱 | 중간 초기 상태 | 실행 기반 채점 함수 수 |
|---|---|---|---|---|---|---|---|
| GAIA | 466 | 없음 | - | 없음 | 없음 | 없음 | 0 |
| Mind2Web | 2350 | 없음 | - | 있음 | 없음 | 있음 | 0 |
| WebLINX | 2337 | 없음 | - | 있음 | 없음 | 있음 | 0 |
| PixelHelp | 187 | 없음 | - | 있음 | 없음 | 없음 | 0 |
| META-GUI | 1125 | 없음 | - | 있음 | 없음 | 없음 | 0 |
| AitW | 30,000 | 없음 | - | 있음 | 없음 | 있음 | 0 |
| OmniAct | 9802 | 없음 | - | 있음 | 없음 | 있음 | 0 |
| AgentBench | 1091 | 다중 격리 | 없음 | 없음 | 없음 | 없음 | 7 |
| InterCode | 1350 (3) | 코드 | 없음 | 없음 | 없음 | 없음 | 3 |
| MiniWoB++ | 125 | 웹 | 없음 | 있음 | 없음 | 없음 | 125 |
| WebShop | 12,000 (1) | 웹 | 없음 | 있음 | 없음 | 없음 | 1 |
| WebArena | 812 (241) | 웹 | 없음 | 있음 | 없음 | 없음 | 5 |
| VisualWebArena | 910 (314) | 웹 | 없음 | 있음 | 없음 | 없음 | 6 |
| WorkArena | 23,000 (29) | 웹 | 없음 | 있음 | 없음 | 있음 | 7 |
| WikiHow (Mobile-Env) | 150 (16) | 모바일 | 없음 | 있음 | 없음 | 없음 | 16 |
| AssistGUI | 100 | 없음 | 없음 | 있음 | 없음 | 있음 | 2 |
| OSWorld | 369 | 컴퓨터 | 있음 | 있음 | 있음 | 있음 | 134 |

멀티모달 agent용 VLM 연구에서 기존 GUI 연구는 HTML, a11y tree, view hierarchy 같은 구조 데이터를 grounding 원천으로 썼다. 그러나 소스 코드는 장황하고 직관적이지 않으며 노이즈가 많고 접근 불가능한 경우도 있어 멀티모달 또는 시각 전용 지각이 필수다. screenshot을 입력으로 받는 특화 모델은 웹용 ScreenAI, Pix2Struct와 모바일용 CogAgent, Auto-UI가 있고, Qwen, LLaVA, MiniGPT-4 같은 범용 foundation model도 잠재력을 보인다. 이 논문은 텍스트 전용, 시각 전용, 멀티모달 입력과 여러 방법을 평가해 기존 멀티모달 모델이 아직 유능한 컴퓨터 agent와 거리가 멀며, 장기 planning, screenshot 세부 지각, 픽셀 좌표 위치 파악, 세계 지식에 개선 여지가 크다고 결론짓는다.

## 7. 용어집 (Glossary)

- **accessibility tree (a11y tree)**: OS나 브라우저의 접근성 API가 화면 요소의 종류, 상태, 위치를 프로그램이 읽을 수 있게 노출하는 트리. Ubuntu는 pyatspi(ATSPI), Windows는 pywinauto로 얻어 XML로 변환한다. 원본은 보통 100만 토큰을 넘어 걸러 쓴다.
- **execution-based evaluation**: 최종 환경 상태를 실제로 조회해 채점하는 방식. 정답 action 시퀀스와 대조하는 방식과 달리 다른 해법도 인정한다.
- **getter / evaluator**: 채점 config를 이루는 두 함수. getter가 최종 환경에서 파일, 창 텍스트, 쿠키 등을 꺼내면 evaluator가 그것으로 성공을 판정한다. 실시간 값이 필요한 task는 getter 안에 크롤러 같은 동적 함수를 둔다.
- **initial state setup config**: task 시작 시점의 환경을 재현하는 JSON 명세. VM 스냅샷 지정, 파일 다운로드, 앱 열기, 창 크기 조정이 들어간다. 스냅샷과 config를 결합한 하이브리드 방식이다.
- **infeasible task**: 기능이 없어졌거나 애초에 존재하지 않아 완료할 수 없는 task. 369개 중 30개(8.1%). agent가 FAIL을 정확히 내면 reward를 준다.
- **Set-of-Mark (SoM)**: 이미지를 구획으로 나누고 번호, 마스크, 박스를 표시해 VLM의 grounding을 돕는 기법. OSWorld는 a11y tree로 클릭 가능 요소의 경계 박스를 잡아 번호를 붙인다.
- **POMDP**: 상태를 부분적으로만 관측할 수 있는 순차 의사결정 문제. OSWorld는 agent task를 $(S, O, A, T, R)$로 형식화한다.
- **pyautogui**: 마우스와 키보드를 파이썬 코드로 제어하는 크로스플랫폼 라이브러리. OSWorld action space의 문법이다.
- **computer_13**: 강화학습 연구용으로 pyautogui를 감싼 대체 action space. 13개 action 유형과 WAIT, FAIL, DONE으로 이루어진다(Table 8).
- **환경 노이즈 딜레마 (environmental noise dilemma)**: 의도치 않은 대상을 클릭해 팝업이나 무관한 앱이 열린 뒤 정상 상태로 돌아오지 못하는 실패 유형. 반복 클릭과 함께 마우스 클릭 부정확에서 파생된다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | OSWorld 전체 구조 (task 예시 두 개와 실행 루프) | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 4 | 환경 인프라. config 파일 하나와 Coordinator, VM | caption-region | ★ wiki 권장 (method, 핵심) |
| fig03 | 8 | 369개 task의 도메인과 조작 유형 분포 sunburst | manual | ★ wiki 권장 (data) |
| fig04 | 9 | 사람 소요 시간과 정확도를 WebArena와 비교 (상단에 Table 4 마지막 행 혼입) | manual | ★ wiki 권장 (baseline) |
| fig05 | 13 | 해상도 downsampling ablation | manual | ★ wiki 권장 (analysis) |
| fig06 | 13 | a11y tree 길이 분포 (90퍼센타일 6,343.60 토큰) | caption-region | (선택) |
| fig07 | 13 | 히스토리 길이 ablation | manual | ★ wiki 권장 (analysis) |
| fig08 | 14 | 창 교란에 따른 성능 하락 | manual | ★ wiki 권장 (robustness) |
| fig09 | 15 | 성공 사례. VLC와 터미널로 자막 추출 (상단에 본문 문단 혼입) | caption-region | (선택) |
| fig10 | 16 | 정성 분석 세 사례 | caption-region | (선택) |
| fig11 | 24 | 원본 XML a11y tree 일부 | caption-region | (부록, 미권장) |
| fig12 | 24 | Accerciser로 본 a11y tree와 GUI 대응 | caption-region | (부록, 미권장) |
| fig13 | 29 | 지시문 분포 t-SNE 비교 | caption-region | (부록, 미권장) |
| fig14 | 37 | 여섯 앱의 SoM 번호 박스 예시 | caption-region | (부록, 미권장) |
| fig15 | 38 | 네 설정별 step 수 분포 | caption-region | (부록, 미권장) |
| fig16 | 40 | 소프트웨어별 사용 오류 사례 (상단에 코드 블록 혼입) | caption-region | (부록, 미권장) |
| fig17 | 44 | 항공편 검색 화면의 팝업과 쿠키 배너 (캡션과 이미지 뒤바뀜, 상단에 본문 혼입) | caption-region | (부록, 미권장) |
| fig18 | 44 | 나이키 즐겨찾기 오클릭 화면 (캡션과 이미지 뒤바뀜, 상단에 본문 혼입) | caption-region | (부록, 미권장) |
| fig19 | 45 | 사람과 agent의 난이도 차이 보충 사례 | caption-region | ★ wiki 권장 (failure analysis) |
| fig20 | 48 | Claude-3 Opus 오류 사례 (상단에 코드 블록과 절 제목 혼입) | caption-region | (부록, 미권장) |
| fig21 | 51 | SoM 유무에 따른 VS Code 설정 task 대비 (상단에 코드 블록과 본문 혼입) | caption-region | (부록, 미권장) |
| tab01 | 5 | 채점 스크립트 예시 3개 | table-region | ★ wiki 권장 (method) |
| tab02 | 6 | action space 예시 | table-region | (선택) |
| tab03 | 8 | 핵심 통계 (369 / 134 / 302) | manual | ★ wiki 권장 (data) |
| tab04 | 9 | 기존 환경 16종과의 비교 | table-region | ★ wiki 권장 (positioning, 핵심) |
| tab05 | 10 | 메인 결과. 입력×모델 성공률 | table-region | ★ wiki 권장 (result, 핵심) |
| tab06 | 12 | GPT-4V(SoM) task 유형별 성공률 | table-region | ★ wiki 권장 (result) |
| tab07 | 14 | OS 간 성능과 상관계수 | table-region | (선택) |
| tab08 | 26 | computer_13 action 유형과 인자 | table-region | (부록, 미권장) |
| tab09 | 27 | task 예시 출처 목록 | table-region | (부록, 미권장) |
| tab10 | 28 | 앱별 세부 통계 | table-region | (부록, 미권장) |
| tab11 | 28 | Windows 분석 세트 세부 통계 | table-region | (부록, 미권장) |
| tab12 | 31 | 도메인별 추가 task 예시 | table-region | (부록, 미권장) |
| tab13 | 36 | a11y tree 노드 필터 기준 | table-region | (부록, 미권장) |
| tab14 | 39 | 앱별 상세 성공률 | table-region | (부록, 미권장) |

큐레이션 결과는 fig01, fig02, fig03, fig05, fig07, fig08, fig10, fig19의 8장이다. Table 1부터 Table 14까지는 이미지 대신 wiki 본문의 마크다운 표로 옮겼고, fig04는 크롭 상단에 Table 4 마지막 행이 섞여 있어 수치만 본문 표로 옮겼다. fig09, fig16, fig17, fig18, fig20, fig21은 크롭 상단에 인접 본문이나 코드 블록이 섞여 있어 재크롭 없이 사실만 기록한다.
