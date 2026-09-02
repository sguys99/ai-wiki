---
title: "MCP-Atlas: A Large-Scale Benchmark for Tool-Use Competency with Real MCP Servers"
type: paper
year: 2026
category: evaluations
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for.pdf
raw_filename: "bandi-2026-mcp-atlas-a-large-scale-benchmark-for.pdf"
source_collection: external
source: bandi-2026-mcp-atlas-a-large-scale-benchmark-for.md
authors: "Chaithanya Bandi, Razvan-Gabriel Dumitru, Ben Hertzberg, Divyansh Agarwal, Geobio Boo, Tejas Polakam, Sami Hassaan, Jeff Da, HiJae Kim, Vipul Gupta, Manasi Sharma, Andrew Park, Martin Dimakis, Ernesto Gabriel Hernández Montoya, Dan Rambado, Ivan Salazar, Rafael Cruz, MohammadHossein Rezaei, Chetan Rane, Ben Levin, Daniel Yue Zhang, Brad Kenstler, Bing Liu"
arxiv_id: "2602.00933"
tags: [mcp, tool-use, benchmark, agent-evaluation, claim-based-scoring, failure-taxonomy, llm-as-judge, distractor-tools, cross-server-orchestration, scale-ai]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/fig01.png
    raw: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for-figures/fig01.png
    caption: "20개 모델의 전체 성적 — 왼쪽은 coverage 0.75 기준 pass rate 막대(Muse Spark 82.2%에서 Claude Haiku 4.5 40.2%까지), 오른쪽은 같은 순서의 평균 coverage. 색으로 top tier·mid tier·tail 세 층을 갈랐다"
    page: 2
    bbox_norm: [0.087, 0.083, 0.913, 0.438]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/fig02.png
    raw: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for-figures/fig02.png
    caption: "정확도와 소요 시간의 Pareto frontier — x축이 task당 평균 벽시계 시간, y축이 pass rate. Haiku 4.5·GLM-4.7·Opus 4.5·Gemini 3 Pro·Opus 4.7·Muse Spark 여섯 개가 초록선 위에 놓이고 o3 Pro는 194초·44.5%로 오른쪽 아래에 홀로 떨어져 있다"
    page: 9
    bbox_norm: [0.087, 0.083, 0.913, 0.478]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/fig03.png
    raw: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for-figures/fig03.png
    caption: "공개 split과 비공개 split 성적을 모델별로 이은 dumbbell 차트 — 격차가 6pp를 넘으면 빨간 연결선. Kimi K2.5만 비공개 쪽이 0.8pp 높다"
    page: 10
    bbox_norm: [0.087, 0.083, 0.913, 0.441]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/tab01.png
    raw: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for-figures/tab01.png
    caption: "동시대 MCP 벤치마크 8종과의 위치 비교 — 서버 수·도구 수·task 수와 cross-server·distractor·자연어·실서버 지원 여부. MCP-Atlas만 1,000 task로 네 항목을 모두 채운다"
    page: 3
    bbox_norm: [0.091, 0.120, 0.909, 0.322]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/tab02.png
    raw: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for-figures/tab02.png
    caption: "다섯 개 환경 버킷의 task 비중과 대표 서버, 각 버킷이 유발하는 전형적 함정"
    page: 5
    bbox_norm: [0.200, 0.120, 0.800, 0.243]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/tab03.png
    raw: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for-figures/tab03.png
    caption: "모델별 tool-call 계열 실패 분포 — 인자 오류·도구 오선택·도구 미사용·오류 복구 실패 네 갈래와 전체 실패 중 tool 계열 비중. o3 Pro의 도구 미사용 40.1%가 눈에 띈다"
    page: 6
    bbox_norm: [0.181, 0.120, 0.819, 0.561]
    strategy: table-region
    curated: true
  - id: tab04
    label: Table 4
    kind: table
    file: assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/tab04.png
    raw: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for-figures/tab04.png
    caption: "모델별 인지 계열 실패 분포 — task 오해·합성 오류·응답 파싱 실패·조기 종료·환각·논리 오류·제약 위반 일곱 갈래. Gemini 3.1 Pro의 조기 종료 42.8%와 Opus 4.7의 합성 오류 25.0%가 대비된다"
    page: 8
    bbox_norm: [0.164, 0.120, 0.840, 0.616]
    strategy: table-region
    curated: true
  - id: tab05
    label: Table 5
    kind: table
    file: assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/tab05.png
    raw: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for-figures/tab05.png
    caption: "36개 서버 전체 목록 — 서버별로 그것을 필요로 하는 task 수와 환경 버킷. oxylabs 155개가 최다, context7 4개가 최소"
    page: 14
    bbox_norm: [0.184, 0.542, 0.816, 0.871]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/tab06.png
    raw: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for-figures/tab06.png
    caption: "11개 실패 유형의 정의와 실제 사례 — tool-call 계열 4개, 인지 계열 7개. 진단 judge가 쓰는 정의도 이것과 같다"
    page: 23
    bbox_norm: [0.086, 0.240, 0.924, 0.796]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/tab07.png
    raw: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for-figures/tab07.png
    caption: "judge 세 개를 각각 썼을 때의 coverage 0.75 기준 pass rate 대조표"
    page: 24
    bbox_norm: [0.171, 0.134, 0.829, 0.499]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/tab08.png
    raw: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for-figures/tab08.png
    caption: "coverage 임계값을 0.5·0.75·1.0으로 바꿨을 때의 pass rate 변화"
    page: 24
    bbox_norm: [0.164, 0.559, 0.837, 0.902]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/tab09.png
    raw: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for-figures/tab09.png
    caption: "평가에 쓴 모델별 reasoning 설정값 — 재현을 위해 공개한 config"
    page: 25
    bbox_norm: [0.178, 0.281, 0.822, 0.698]
    strategy: table-region
    curated: false
---
## 요약 (Summary)

MCP는 에이전트가 외부 도구를 발견하고 호출하는 계층의 표준이 됐다. 그 위에서 도는 에이전트를 어떻게 재느냐가 이 논문의 출발점이다. Scale AI와 싱가포르국립대가 목(mock)이 아닌 실제 운영 중인 MCP 서버 36개와 도구 220개를 걸어놓고 1,000개 task로 tool use 실력을 쟀다.

설계의 핵심은 채점 기준을 바꾼 데 있다. 궤적 일치 대신 최종 답에 담겨야 할 원자 단위 claim으로 잰다. claim은 정답이라면 최종 답에 담겨 있어야 하는 원자적 사실 진술이다. 이렇게 재보니 20개 프런티어 모델의 실패 가운데 63.3%가 도구 호출이 아니라 그 이후의 인지 단계 — 조기 종료와 잘못된 합성 — 에서 나왔다. 최고 성적은 Muse Spark의 82.2%다.

## 주요 기여 (Key Contributions)

기존 MCP 평가를 저자들은 세 기준으로 들여다본다. 경로가 갈리고 서버를 넘나드는 multi-step 워크플로를 다루는가, 목 대신 진짜 서버를 폭넓게 쓰는가, 에이전트의 말수나 문체와 분리된 재현 가능한 채점을 하는가. 기존 벤치마크는 두 기준까지는 채우지만 나머지 하나에서 무너진다.

- 1,000개 task, 36개 운영 MCP 서버, 220개 도구. 자동 생성 대신 사람이 쓰고 검증했고 task 하나당 전문가 노동 4.6시간이 들었다. 98.6%가 서버 두 개 이상을 요구한다.
- 프롬프트에서 서버·도구·인자 이름을 전부 뺐다. task마다 도구 6~37개(평균 15.2)를 노출하되 실제로 필요한 것은 2~8개(평균 4.1)뿐이고, 나머지 평균 11.1개는 distractor다. distractor는 task에 함께 노출되지만 풀이에는 필요 없는 도구다.
- claim 기반 채점. task마다 원자적 사실 진술 목록(평균 4.7개)을 정의하고 judge가 claim 하나씩을 충족(1.0)·부분 충족(0.5)·미충족(0.0)으로 매긴다. coverage는 그 평균이고 0.75 이상이면 통과다. 경로는 채점에 넣지 않으므로 다른 방식의 올바른 풀이도 만점을 받는다.
- 11종 실패 유형 분류. tool-call 계열 4종과 인지 계열 7종으로 갈라 실패한 task에만 자동 진단을 돌린다.
- 500개는 공개, 500개는 비공개로 나눠 릴리스했다. 공개 split에는 프롬프트·도구 집합·claim·참조 궤적까지 들어간다.

![[assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/tab01.png]]
*Table 1: 동시대 MCP 벤치마크 8종과의 위치 비교. MCP-Atlas만 1,000 task로 cross-server·distractor·자연어·실서버 네 항목을 모두 채운다 (Bandi 2026, p.3)*

## 방법론 및 아키텍처 (Methodology and Architecture)

### 서버 생태계

36개 서버가 실제 엔드포인트를 때린다. 전부 운영용 MCP 구현이고 합성 스텁은 하나도 없다. 진짜 rate limit, 페이지네이션 경계, 스키마 버전 불일치, 일시적 오류 코드가 그대로 돌아온다. 목 환경이 설계상 지워버리는 실패 조건을 일부러 남겨뒀다.

서버는 Docker 컨테이너로 감싸고 파일시스템을 샌드박스에 넣는다. 네트워크 egress는 그 서버가 정당하게 필요로 하는 상류 API로 허용 목록을 좁힌다. 컨테이너는 task 사이마다 재시작해 상태가 새지 않게 했고, 이미지 다이제스트도 고정해서 같은 다이제스트로 다시 돌리면 상류 API 드리프트를 뺀 나머지가 동일하게 재현된다.

버킷은 Basic(32%)·Productivity(22%)·Coding(22%)·Analytics(12%)·Financial(12%)로 나뉜다. task 수로 보면 oxylabs가 155개로 가장 많고 filesystem 133개, exa 108개가 뒤를 잇는다.

### task 구조와 채점

프롬프트는 단일 턴 자연어 요청이고 서버·도구·인자 이름을 하나도 대지 않는다. 모델은 task의 의미만으로 도구 체인을 추론해야 한다. 서버 두 개 이상을 요구하는 task가 98.6%(평균 2.55개)이고, 정확히 둘이 51.7%, 셋이 38.2%, 넷 이상이 8.7%다.

claim 목록과 별도로 참조 궤적(평균 9.8 step)을 둔다. 다만 이 궤적은 풀이 가능성 확인, 도구 의존성 검증, 실패 진단에만 쓰고 통과·실패 판정에는 절대 쓰지 않는다. 무엇을 달성해야 하는가와 어떻게 달성하는가를 이렇게 떼어놓는다.

judge 편향을 성능에서 떼어내려고 세 개의 LLM judge가 1,000개 task를 각각 독립적으로 채점한다. Gemini 3.1 Pro Preview가 주 judge이고 GPT-5.4와 Claude Opus 4.6이 대조군이다. judge는 claim 하나마다 한 번씩 호출된다. 한 번의 호출에 claim을 전부 몰아넣으면 컨텍스트 손실이 생겨서 이렇게 나눴다.

모든 모델이 같은 프롬프트, 같은 노출 도구 집합, 같은 도구 호출 예산(task당 100회), 같은 채점 루브릭에서 돈다. 제공사마다 네이티브 tool use 인터페이스가 달라 저수준 어댑터만 갈리고, 모델별 데모나 재시도 정책, scaffold는 붙이지 않았다. scaffold는 모델 주위에 짜 놓은 보조 실행 구조를 뜻한다.

## 결과 (Results)

### 세 층 구조

신뢰구간이 겹치는 상위 세 모델은 Muse Spark 82.2%, Claude Opus 4.7 79.1%, Gemini 3.1 Pro Preview 78.2%다. 중위권 여덟 개는 67.6~76.8%에 몰려 있고, 나머지 아홉 개는 65% 아래로 길게 늘어져 Claude Haiku 4.5의 40.2%까지 내려간다.

오픈소스 GLM-5.1이 75.6%로 GPT-5.5와 통계적으로 동률이고 다른 GPT-5.x 변형보다 위다. 에이전트 과제에서 오래 유지되던 독점 모델의 우위가 이 지점에서는 사라졌다. 반대쪽 끝에는 o3 Pro가 있다. 수학·코딩 벤치마크의 강자인데 여기서는 44.5%로 바닥권이고, 실패한 궤적의 40.1%에 도구 호출이 아예 하나도 없다.

![[assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/fig01.png]]
*Figure 1: 20개 모델의 pass rate(왼쪽)와 평균 coverage(오른쪽). 색으로 top tier·mid tier·tail 세 층을 갈랐다 (Bandi 2026, p.2)*

### 병목이 도구에서 인지로 옮겼다

20개 모델의 진단된 실패 약 6,900건 중 63.3%가 인지 계열이고 36.7%가 도구 계열이다. 이 비율이 이 논문의 중심 주장이다. 벤치마크가 재는 건 유효한 도구 호출을 뽑아내는 능력이 아니라 도구에 접근한 다음에 벌어지는 일이다. task를 이해하고 근거가 충분히 모였는지 판단하고 도구 출력에서 최종 답을 합성하는 일이다.

o3 Pro는 진단된 실패의 57.6%가 도구 관련이고 그중 40.1%가 도구 미호출이다. GPT-5.1(50.4%)과 Claude Haiku 4.5(46.7%)도 같은 양상이다. 도구 계열 붕괴는 하위권에 몰린다.

![[assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/tab03.png]]
*Table 3: 모델별 tool-call 계열 실패 분포. o3 Pro의 도구 미사용 40.1%가 눈에 띈다 (Bandi 2026, p.6)*

상위권은 다르다. Gemini 3.1 Pro Preview 42.8%, GPT-5.4 41.4%, Claude Opus 4.6 36.3%가 근거를 다 모으기 직전에 멈춘다. 그런데 더 최근 모델인 GPT-5.5와 Claude Opus 4.7은 이 유형을 각각 3.6%·3.8%까지 거의 없앴다. 대신 오류가 더 뒤쪽으로 이동해 잘못된 합성이 GPT-5.5에서 19.8%, Opus 4.7에서 25.0%로 올라간다. 워크플로를 끝까지 밀고 가지만 모아온 근거를 잘못 결합하거나 잘못 읽거나 잘못 보고한다. 저자들은 다음 개선이 claim을 의식한 정지 기준과 최종 답을 수집된 근거에 대조하는 검증에서 나온다고 진단한다.

![[assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/tab04.png]]
*Table 4: 모델별 인지 계열 실패 분포. Gemini 3.1 Pro의 조기 종료 42.8%와 Opus 4.7의 합성 오류 25.0%가 대비된다 (Bandi 2026, p.8)*

### 효율 frontier

Pareto frontier 위에 여섯 모델이 있다. Claude Haiku 4.5(27초·40.2%), GLM-4.7(42초·58.1%), 50초 부근의 Claude Opus 4.5와 Gemini 3 Pro Preview, Claude Opus 4.7(71초·79.1%), 꼭짓점의 Muse Spark(121초·82.2%)다.

frontier에 밀린 모델도 보인다. o3 Pro는 194초로 가장 느리면서 44.5%로 가장 부정확한 축에 든다. GPT-5.4 Mini(135초·56.7%)는 큰 형제 GPT-5.4(130초·70.6%)보다 느리면서 점수도 낮다. 에이전트 환경의 벽시계 시간은 모델 추론이 아니라 도구 호출 왕복 지연이 지배하므로 "Mini"가 빠름을 뜻하지 않는다. GLM-5.1도 pass rate는 강하지만 task당 149초로 비슷한 정확도의 Opus 4.6·4.7의 대략 두 배가 걸려 frontier에 못 든다.

![[assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/fig02.png]]
*Figure 2: 정확도와 소요 시간의 Pareto frontier. o3 Pro가 오른쪽 아래에 홀로 떨어져 있다 (Bandi 2026, p.9)*

### judge 간 일치도와 split 격차

주 judge인 Gemini 3.1 Pro Preview가 가장 후하고(평균 pass rate 65.4%), GPT-5.4가 가장 엄격하며(62.3%), Claude Opus 4.6이 중간이다(63.9%). 모델별 점수 폭은 2.1~4.6pp다. 상위권의 격차가 judge 간 변동폭과 비슷한 크기라서, 저자들은 상위권의 작은 순위 교체를 능력 차이가 아니라 평가자 불확실성으로 읽어야 한다고 본다.

공개·비공개 split 격차는 −0.8~+9.6pp에 걸치고 제공사별 군집이 보인다. OpenAI 모델이 평균 +8.4pp로 가장 크고 Google +5.2pp, Anthropic +4.8pp, 오픈소스 +3.8pp 순이다. Kimi K2.5만 비공개 쪽이 0.8pp 높다. 다만 이 격차를 오염(contamination)의 직접 증거로 읽지 말라고 저자들은 못박는다. 공개 split에 참조 궤적까지 다 들어 있으므로 릴리스 이후의 격차는 split 민감도와 노출 모니터링 신호로 해석하는 게 맞다는 입장이다.

## 한계 (Limitations)

- 채점이 전부 LLM으로 이뤄진다. judge 셋으로 완화했지만 절대 pass rate는 2~5점의 judge 간 대역폭을 감안해 읽어야 한다.
- 서버와 도구, 그 아래 API가 살아 있다. 현재 리더보드는 2026년 5월 시점의 서버 동작이고, 개별 task 궤적 수준의 재현성은 상류 안정성에 묶여 있다.
- 1,000개 task 전부 영어다. 비영어 tool use와 현지화 실패는 범위 밖이다.
- 제공사가 권장하는 네이티브 tool use 전략을 그대로 쓰므로 harness가 제공사 간에 완전히 같지는 않다. harness는 모델을 감싸 도구·검증·상태를 제공하는 실행 환경이다.
- 도구 호출 예산이 task당 100회로 고정돼 있어, 장기 task의 일부 실패는 모델 능력보다 이 천장 탓일 수 있다.

## 관련 페이지 (Related Pages)

- [[agents/rodrigues-2026-mcp-server-architecture-patterns]] — MCP 서버측 아키텍처 패턴. "클라이언트가 문서 대신 tool 설명을 읽고 무엇을 호출할지 고른다"는 제약이 여기서는 distractor 설계로 평가된다
- [[agents/cemri-2025-why-do-multi-agent-llm-systems]] — MAST 실패 taxonomy. 14개 실패 모드를 시스템 설계 문제로 본 관점이, 이 논문의 11종 분류에서 인지 실패 63.3%로 재현된다
- [[evaluations/xie-2024-osworld-benchmarking-multimodal-agents-for]] — 실행 기반 채점의 다른 축. OSWorld는 task마다 채점 스크립트를 붙였고 MCP-Atlas는 claim 목록을 붙였다
- [[agents/lee-2026-the-agent-loop-a-survey]] — agent loop와 harness 일반론. 이 논문의 조기 종료·잘못된 합성은 loop의 정지 조건 설계 문제로 읽힌다
- [[overviews/glossary-agents]] — claim·coverage·distractor canonical 표기
