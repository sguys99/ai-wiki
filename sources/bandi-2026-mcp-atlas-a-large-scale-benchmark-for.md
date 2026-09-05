---
title: "MCP-Atlas: A Large-Scale Benchmark for Tool-Use Competency with Real MCP Servers"
type: paper
year: 2026
category: evaluations
raw_path: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for.pdf
raw_filename: "bandi-2026-mcp-atlas-a-large-scale-benchmark-for.pdf"
source_collection: external
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
## 한 줄 요약 (One-line Summary)

목(mock)이 아닌 실제 운영 중인 MCP 서버 36개와 도구 220개를 걸어놓고 1,000개 task로 tool use 실력을 재는 벤치마크다. 채점 기준을 궤적 일치에서 최종 답에 담겨야 할 원자 단위 claim으로 바꿨다. 이렇게 재보니 20개 프런티어 모델의 실패 가운데 63.3%가 도구 호출 이후의 인지 단계, 곧 조기 종료와 잘못된 합성에서 나왔다.

## 1. 자료 정보 (Document Information)

- **제목**: MCP-Atlas: A Large-Scale Benchmark for Tool-Use Competency with Real MCP Servers
- **저자**: Chaithanya Bandi, Razvan-Gabriel Dumitru 외 21인 (앞 두 명 공동 1저자)
- **소속**: Scale AI, 싱가포르국립대(NUS)
- **arXiv**: 2602.00933v3 (cs.SE / cs.AI, 2026-01-31 최초, 2026-05-19 개정, 본문 9p + 부록 포함 25p)
- **코드**: <https://github.com/scaleapi/mcp-atlas>

## 2. 주요 기여 (Key Contributions)

MCP는 에이전트가 외부 도구를 발견하고 호출하는 계층의 표준으로 자리 잡았다. 문제는 그 위에서 도는 에이전트를 어떻게 재느냐다. 저자들은 기존 평가를 세 가지 기준으로 들여다본다. 실제로 경로가 갈리고 서버를 넘나드는 multi-step 워크플로를 다루는가, 목 대신 진짜 서버를 폭넓게 쓰는가, 에이전트의 말수나 문체와 분리된 재현 가능한 채점을 하는가. Table 1의 비교표를 보면 기존 벤치마크는 두 기준까지는 채우지만 나머지 하나에서 무너진다. 엄밀함을 택한 MCP-Universe·Toolathlon·MCPMark는 task가 250개를 못 넘는다. 규모를 택한 MCPEval은 자동 생성 탓에 품질을 잃는다. MCP-Bench·LiveMCPBench는 전체론적 LLM-as-a-judge라 말이 긴 답이 다르게 점수를 받는다.

- 규모와 실서버를 동시에 잡았다. 1,000개 task, 36개 운영 MCP 서버, 220개 도구다. task는 자동 생성 대신 사람이 쓰고 검증했다. 저자들이 밝힌 소요는 task 하나당 전문가 노동 4.6시간이다. 98.6%가 서버 두 개 이상을 요구한다.
- 프롬프트에서 서버·도구·인자 이름을 전부 뺐다. 대신 task마다 도구 6~37개(평균 15.2)를 노출하고 그중 실제로 필요한 것은 2~8개(평균 4.1)만 둔다. 나머지 평균 11.1개는 의미상 그럴듯한 distractor다. 도구를 쓸 줄 아는지가 아니라 어떤 도구를 쓸지 찾아내는지를 잰다.
- claim 기반 채점. task마다 정답이라면 담겨 있어야 할 원자적 사실 진술 목록(평균 4.7개, 1~23개)을 정의한다. judge는 claim 하나씩을 충족(1.0)·부분 충족(0.5)·미충족(0.0)으로 매긴다. task coverage는 claim 점수의 평균이고 0.75 이상이면 통과다. 어떤 경로로 갔는지는 채점에 넣지 않으므로 다른 방식의 올바른 풀이도 만점을 받는다.
- 11종 실패 유형 분류. tool-call 계열 4종(인자 오류, 도구 오선택, 도구 미사용, 오류 복구 실패)과 인지 계열 7종(task 오해, 잘못된 합성, 응답 파싱 실패, 조기 종료, 환각, 논리 오류, 제약 위반)으로 갈랐다. 실패한 task에만 자동 진단을 돌린다.
- 20개 모델 실증. 여섯 개 제공사(Anthropic·Google·OpenAI·Meta·Kimi·GLM)를 같은 조건으로 돌려 세 층 구조와 인지 실패 우위(63.3% 대 36.7%)를 확인했다.
- 500개는 공개, 500개는 비공개로 나눠 릴리스했다. 공개 split에는 프롬프트·도구 집합·claim·참조 궤적까지 들어간다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 서버 생태계

36개 서버가 실제 엔드포인트를 때린다. 전부 운영용 MCP 구현이고 합성 스텁은 하나도 없다. 진짜 rate limit, 페이지네이션 경계, 스키마 버전 불일치, 일시적 오류 코드가 그대로 돌아온다. 목 환경이 설계상 지워버리는 실패 조건을 일부러 남겨뒀다.

서버는 Docker 컨테이너로 감싸고 파일시스템을 샌드박스에 넣는다. 명시적으로 쓰기 가능한 작업 디렉터리만 빼면 읽기 전용 마운트다. 네트워크 egress는 그 서버가 정당하게 필요로 하는 상류 API로 허용 목록을 좁힌다. 컨테이너는 task 사이마다 재시작해 상태가 새지 않게 했다. 이미지 다이제스트도 고정해서 같은 다이제스트로 다시 돌리면 상류 API 드리프트를 뺀 나머지가 동일하게 재현된다.

버킷은 Basic·Productivity·Coding·Analytics·Financial로 나뉜다. Basic(32%)에 brave_search·exa·weather·maps가, Productivity(22%)에 filesystem·notion·slack·arxiv가, Coding(22%)에 git·github·code-executor·cli가, Analytics(12%)에 airtable·mongodb가, Financial(12%)에 twelvedata·alchemy가 들어간다. task 수로 보면 oxylabs가 155개로 가장 많고 filesystem 133개, exa 108개가 뒤를 잇는다.

### 3.2 task 구조

프롬프트는 단일 턴 자연어 요청이고 서버·도구·인자 이름을 하나도 대지 않는다. 모델은 task의 의미만으로 도구 체인을 추론해야 한다. 서버를 넘나드는 조율이 기본값이다. 98.6%가 서버 두 개 이상을 요구하고(평균 2.55개), 정확히 둘이 51.7%, 셋이 38.2%, 넷 이상이 8.7%다.

claim 목록과 별도로 참조 궤적(평균 9.8 step)을 둔다. 공개 split에서는 도구 이름·인자·의존관계·해당 task에서 반환된 근거까지 순서대로 직렬화해 공개했다. 다만 이 궤적은 풀이 가능성 확인, 도구 의존성 검증, 실패 진단에만 쓰고 통과·실패 판정에는 절대 쓰지 않는다. 무엇을 달성해야 하는가와 어떻게 달성하는가를 이렇게 떼어놓는다.

### 3.3 평가와 진단

모든 모델이 같은 프롬프트, 같은 노출 도구 집합, 같은 도구 호출 예산(task당 100회), 같은 채점 루브릭, 같은 최종 답 프로토콜에서 돈다. 제공사마다 네이티브 tool use 인터페이스가 달라 저수준 어댑터만 제공사별로 갈린다. 모델별 데모나 재시도 정책, task 프롬프트, scaffold는 붙이지 않았다. scaffold는 모델 주위에 짜 놓은 보조 실행 구조를 뜻한다.

judge 편향을 성능에서 떼어내려고 세 개의 LLM judge가 1,000개 task를 각각 독립적으로 채점한다. Gemini 3.1 Pro Preview가 주 judge이고 GPT-5.4와 Claude Opus 4.6이 대조군이다. judge는 claim 하나마다 한 번씩 호출된다. task당 한 번이 아니다. claim이 5개면 평가자 호출도 5회다. 한 번의 호출에 claim을 전부 몰아넣으면 컨텍스트 손실이 생겨서 이렇게 나눴다. claim이 10개를 넘는 4%의 task에서 특히 그렇다.

95% 신뢰구간은 비모수 부트스트랩으로 낸다. 모델마다 task별 coverage 점수에서 복원추출로 N=1000 표본을 10,000번 뽑아 매번 pass@0.75를 다시 계산하고 2.5·97.5 백분위를 취했다.

### 3.4 품질 관리

먼저 전문가가 구성된 MCP 환경에서 참조 궤적을 직접 실행한다. 도메인 전문가가 정확성과 풀이 가능성을 검토한다. 2차 검토에서는 프롬프트에 도구·서버 이름이 새지 않았는지 확인한다. 이어 LLM이 claim 완결성과 궤적 일관성을 자동 검증한다. 마지막으로 무작위 표본을 사람이 감사한다. 품질 관리는 이렇게 다섯 단계다.

주석 작성 단계에서는 도구 선택·도구 입력·해석 세 항목의 느슨한 체크리스트를 썼다. 사후 실패 분석에 쓰는 11종 자동 진단 분류와는 별개다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 세 층 구조

신뢰구간이 겹치는 상위 세 모델은 Muse Spark 82.2%, Claude Opus 4.7 79.1%, Gemini 3.1 Pro Preview 78.2%다. 중위권 여덟 개는 67.6~76.8%에 몰려 있다(Opus 4.6, GLM-5.1, GPT-5.5, GPT-5.4, Gemini 3 Pro Preview, Opus 4.5, Sonnet 4.6, GPT-5.2). 나머지 아홉 개는 65% 아래로 길게 늘어져 Claude Haiku 4.5의 40.2%까지 내려간다. 리더보드가 세 층으로 갈린다.

오픈소스 GLM-5.1이 75.6%로 GPT-5.5와 통계적으로 동률이고 다른 GPT-5.x 변형보다 위다. 에이전트 과제에서 오래 유지되던 독점 모델의 우위가 이 지점에서는 사라졌다. 반대쪽 끝에는 o3 Pro가 있다. 수학·코딩 벤치마크의 강자인데 여기서는 44.5%로 바닥권이다. 실패한 궤적의 40.1%에 도구 호출이 아예 하나도 없다.

### 4.2 실패 유형 — 병목이 도구에서 인지로 옮겼다

20개 모델의 진단된 실패 약 6,900건 중 63.3%가 인지 계열이고 36.7%가 도구 계열이다. 이 비율이 이 논문의 중심 주장이다. 벤치마크가 재는 건 유효한 도구 호출을 뽑아내는 능력이 아니다. 도구에 접근한 다음에 벌어지는 일을 잰다. task를 이해하고 근거가 충분히 모였는지 판단하고 도구 출력에서 최종 답을 합성하는 일이다.

o3 Pro는 진단된 실패의 57.6%가 도구 관련이고 그중 40.1%가 도구 미호출이다. GPT-5.1(50.4%)과 Claude Haiku 4.5(46.7%)도 같은 양상이다. 도구 계열 붕괴는 하위권에 몰린다. 근거 수집 단계에 들어가기도 전에 실패한다. 저자들은 미지의 도구와 현실적인 distractor가 섞인 MCP 환경에 기본 tool use 정책이 맞지 않는다고 본다.

Gemini 3.1 Pro Preview 42.8%, GPT-5.4 41.4%, Claude Opus 4.6 36.3%가 근거를 다 모으기 직전에 멈춘다. 상위권에서는 병목이 이렇게 아래로 내려가 조기 종료에 실패가 몰린다. 그런데 더 최근 모델인 GPT-5.5와 Claude Opus 4.7은 이 유형을 각각 3.6%·3.8%까지 거의 없앴다. 대신 오류가 더 뒤쪽으로 이동해 잘못된 합성이 GPT-5.5에서 19.8%, Opus 4.7에서 25.0%로 올라간다. 워크플로를 끝까지 밀고 가지만 모아온 근거를 잘못 결합하거나 잘못 읽거나 잘못 보고한다. 저자들은 다음 개선이 claim을 의식한 정지 기준과 최종 답을 수집된 근거에 대조하는 검증에서 나온다고 진단한다.

### 4.3 효율 frontier

정확도와 함께 그 정확도에 드는 시간을 본다. Pareto frontier 위에 여섯 모델이 있다. 빠르지만 부정확한 쪽 끝에 Claude Haiku 4.5(27초·40.2%), 그다음 GLM-4.7(42초·58.1%), 50초 부근에 Claude Opus 4.5와 Gemini 3 Pro Preview(둘 다 70% 안팎), Claude Opus 4.7(71초·79.1%), 꼭짓점에 Muse Spark(121초·82.2%)다.

frontier에 밀린 모델도 보인다. o3 Pro는 194초로 가장 느리면서 44.5%로 가장 부정확한 축에 든다. GPT-5.1(84초·50.1%)은 GLM-4.7에 속도와 정확도 양쪽에서 밀린다. GPT-5.4 Mini(135초·56.7%)는 큰 형제 GPT-5.4(130초·70.6%)보다 느리면서 점수도 낮다. 에이전트 환경의 벽시계 시간은 모델 추론이 아니라 도구 호출 왕복 지연이 지배하므로 "Mini"가 빠름을 뜻하지 않는다. GLM-5.1도 pass rate는 강하지만 task당 149초로 비슷한 정확도의 Opus 4.6·4.7의 대략 두 배가 걸려 frontier에 못 든다.

### 4.4 judge 간 일치도

주 judge인 Gemini 3.1 Pro Preview가 가장 후하고(평균 pass rate 65.4%), GPT-5.4가 가장 엄격하며(62.3%), Claude Opus 4.6이 중간이다(63.9%). 모델별 점수 폭은 2.1~4.6pp다. 순위는 대체로 보존되고 변동은 점수가 촘촘한 상위권에 몰린다. 가장 크게 움직인 Claude Opus 4.7은 Gemini judge에서 2위, GPT-5.4 judge에서 3위, Claude Opus 4.6 judge에서 5위다. 저자들은 이 변동을 self-preference로 보지 않는다. Claude judge는 오히려 Gemini 3.1 Pro Preview와 GLM-5.1을 그 위에 놓는다. 상위권의 격차가 judge 간 변동폭과 비슷한 크기라고 보는 쪽이 더 보수적이다. 이 해석을 따르면 상위권의 작은 순위 교체는 능력 차이가 아니라 평가자 불확실성으로 읽어야 한다.

### 4.5 공개·비공개 split 격차

대부분의 모델이 공개 쪽에서 더 높은 점수를 받고 격차는 −0.8~+9.6pp에 걸친다. 이 격차는 전체 pass rate를 따라가지 않는다. 제공사별 군집이 보인다. OpenAI 모델이 평균 +8.4pp(+7.0~+9.6)로 가장 크고 Google +5.2pp, Anthropic +4.8pp, 오픈소스 +3.8pp 순이다. Kimi K2.5만 비공개 쪽이 0.8pp 높다.

이 격차를 오염(contamination)의 직접 증거로 읽지 말라고 저자들은 못박는다. 공개 split에는 프롬프트·도구 집합·claim·참조 궤적이 다 들어 있다. 릴리스 이후의 격차는 split 민감도와 노출 모니터링 신호로 해석하는 게 맞다. 모델 수준의 작은 비교에는 집단 크기까지 고르지 않으므로 감사 신호로만 취급하겠다고 밝힌다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 채점이 전부 LLM으로 이뤄진다. judge 셋으로 완화했지만 절대 pass rate는 2~5점의 judge 간 대역폭을 감안해 읽어야 한다. judge 버전이 바뀌면 숫자가 움직이므로 어떤 judge를 썼는지와 버전 고정을 항상 함께 보고하라고 권한다.
- 서버와 도구, 그 아래 API가 살아 있다. 현재 리더보드는 2026년 5월 시점의 서버 동작이다. rate limit 정책·인증 방식·스키마 버전이 예고 없이 바뀌고 일부 task는 시간이 지나면 풀 수 없거나 반대로 너무 쉬워질 수 있다. 컨테이너 버전을 고정하고 상류 드리프트가 감지되면 재채점 결과를 내겠다고 한다. 개별 task 궤적 수준의 재현성은 여전히 상류 안정성에 묶여 있다.
- 1,000개 task 전부 영어로 작성됐고 영어 서버 응답을 겨냥한다. 비영어 tool use, 문자 처리, 현지화 실패는 범위 밖이다.
- 제공사가 권장하는 네이티브 tool use 전략(anthropic-native, openai-responses-api 등)을 그대로 쓴다. 공개된 모범 사례를 따르는 대신 harness가 제공사 간에 완전히 같지는 않다. harness는 모델을 감싸 도구·검증·상태를 제공하는 실행 환경이다.
- 도구 호출 예산은 task당 100회로 고정했다. 실제 도구 오류에서 재시도로 회복해야 하는 장기 task에서는 일부 실패가 모델 능력보다 이 천장 탓일 수 있다. 예산을 늘리면 절대 수치는 올라가겠지만 내부 테스트에서 상대 순위는 바뀌지 않았다고 밝힌다.

원자 claim은 전문가 작성과 자동 후보 생성 + 사람 검토를 섞어 만들었다. 남은 잡음 때문에 완벽한 에이전트라도 달성 가능한 pass rate에 잡음이 낀다. 자동 진단도 검증된 참조 궤적을 참조하므로, 서로 아주 다른 근거 경로가 여럿 존재하는 task에서는 실패 라벨이 저자가 제시한 경로 쪽으로 기울 수 있다. 이를 완화하려고 통과·실패는 claim으로만 채점하고 진단은 실패한 뒤에만 돌린다. 진단 judge에게는 궤적을 정답 풀이로 보지 말고 하나의 충분한 근거 흔적으로 다루라고 지시한다.

향후 과제로는 단일 pass rate 대신 정확도·효율·judge 민감도·split 격차·드리프트·실패 유형을 묶은 진단 프로파일을 보고하는 관행, 그리고 멀티턴 명확화와 distractor ablation 추가를 든다.

## 6. 관련 연구 (Related Work)

평가는 정적 지식 측정에서 상호작용 평가로 옮겨왔다. MMLU와 HELM이 고정 문항으로 사실 회상과 추론을 쟀다면, WebArena·MiniWoB++는 GUI 조작을, OSWorld·Android Arena는 OS 수준 제어와 장기 planning을 요구한다. API·function calling 계열에서는 ToolBench가 수천 개 RESTful API를, BFCL이 function calling 리더보드를, τ²-Bench가 소매·항공 도메인의 사용자–에이전트 교대 대화를 다뤘다. SWE-Bench와 GAIA는 코드 실행·웹 검색 같은 이종 도구를 섞었다.

MCP 계열에서는 두 방향의 절충이 반복된다. MCP-Universe는 형식·정적·동적 evaluator에 실시간 ground truth 검증을 붙여 엄밀함을 택했다. 여기서 제기한 "미지의 도구(unknown-tools)" 문제가 MCP-Atlas의 distractor 설계를 낳았다. Toolathlon과 MCPMark도 라이브 소프트웨어 환경에 전용 검증 스크립트를 붙였지만 수작업 비용 때문에 250 task를 못 넘는다. 반대로 MCPEval은 자동 생성으로 676개까지 갔지만 품질과 자연스러움을 잃을 수 있다. MCP-Bench·LiveMCPBench의 전체론적 LLM-as-a-judge는 규모는 되지만 문체 편향이 들어간다. MCPVerse와 MCP-RADAR는 서버 범위를 넓히되 합성·목 구현에 부분적으로 기댄다. MCP-Atlas는 세 가지를 택해 그 절충을 풀려 했다. 자동 생성 대신 체계적 수작업 검증으로 규모를 확보했다. 전체론적 judge 대신 claim 기반 부분 점수를 썼고 실서버만 쓰되 distractor를 체계적으로 심었다.

MCP 표준 자체는 Anthropic이 2024년 11월 발표한 사양이다. judge 방법론은 Zheng 외의 MT-bench·Chatbot Arena 연구를 따르고 신뢰구간은 Efron의 부트스트랩이다.

## 7. 용어집 (Glossary)

| 용어 | 설명 |
|---|---|
| MCP-Atlas | 이 논문의 벤치마크. 실서버 36개·도구 220개 위 1,000 task |
| claim | task마다 정의된 원자적 사실 진술. 정답이라면 최종 답에 담겨 있어야 하는 단위 |
| coverage | task의 claim 점수 평균. 충족 1.0·부분 충족 0.5·미충족 0.0을 평균낸 값 |
| pass@0.75 | coverage 0.75 이상을 통과로 보는 이 논문의 주 지표 |
| distractor | task에 함께 노출되지만 풀이에 필요 없는 도구. 의미상 그럴듯한 것으로 고른다 |
| reference trajectory | 저자가 검증한 최소 정답 경로. 풀이 가능성 확인·진단에만 쓰고 채점에는 쓰지 않는다 |
| cross-server orchestration | 서버 두 개 이상의 도구를 엮어 하나의 task를 푸는 것. 이 벤치마크 task의 98.6% |
| environment bucket | 서버를 성격으로 묶은 다섯 묶음. Basic·Productivity·Coding·Analytics·Financial |
| tool-call failure | 실패 유형 상위 분류 하나. 인자 오류·도구 오선택·도구 미사용·오류 복구 실패 |
| cognitive failure | 나머지 상위 분류. task 오해·잘못된 합성·응답 파싱 실패·조기 종료·환각·논리 오류·제약 위반 |
| early termination | 인지 실패 중 하나. 근거를 다 모으기 전에 답을 내고 끝내는 것 |
| faulty synthesis | 인지 실패 중 하나. 도구 출력은 제대로 받았는데 최종 답으로 잘못 결합하는 것 |
| public/private split | 500/500으로 나눈 공개·비공개 분할. 비공개 쪽은 리더보드 무결성용 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | 20개 모델 pass rate·평균 coverage 막대, 세 층 색 구분 | caption-region | ★ wiki 권장 (result) |
| fig02 | 9 | 정확도–시간 Pareto frontier 산점도 | caption-region | ★ wiki 권장 (result) |
| fig03 | 10 | 공개·비공개 split 격차 dumbbell | caption-region | ★ wiki 권장 (result) |
| tab01 | 3 | MCP 벤치마크 8종과의 위치 비교 | table-region | ★ wiki 권장 (related work) |
| tab02 | 5 | 다섯 환경 버킷의 비중·대표 서버·함정 | table-region | ★ wiki 권장 (method) |
| tab03 | 6 | 모델별 tool-call 실패 분포 | table-region | ★ wiki 권장 (result) |
| tab04 | 8 | 모델별 인지 실패 분포 | table-region | ★ wiki 권장 (result) |
| tab05 | 14 | 36개 서버 전체 목록 | table-region | (부록 — 참고용) |
| tab06 | 23 | 11개 실패 유형 정의·사례 | table-region | (확인 필요 — 면적비 0.47) |
| tab07 | 24 | judge 세 개별 pass rate | table-region | (부록 — 참고용) |
| tab08 | 24 | coverage 임계값 0.5/0.75/1.0 민감도 | table-region | (부록 — 참고용) |
| tab09 | 25 | 모델별 reasoning 설정 | table-region | (부록 — 참고용) |
