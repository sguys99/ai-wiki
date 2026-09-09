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
    caption: "20개 모델의 전체 성적. 왼쪽은 coverage 0.75 기준 pass rate 막대(Muse Spark 82.2%에서 Claude Haiku 4.5 40.2%까지)이고 오른쪽은 같은 순서의 평균 coverage다. 색으로 top tier, mid tier, tail 세 층을 구분했다"
    page: 2
    bbox_norm: [0.087, 0.083, 0.913, 0.438]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/fig02.png
    raw: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for-figures/fig02.png
    caption: "정확도와 소요 시간의 Pareto frontier. 가로축이 task당 평균 벽시계 시간, 세로축이 pass rate다. Claude Haiku 4.5, GLM-4.7, Claude Opus 4.5, Gemini 3 Pro Preview, Claude Opus 4.7, Muse Spark 여섯 모델이 초록 선 위에 있고 o3 Pro는 194초에 44.5%로 오른쪽 아래에 홀로 떨어져 있다"
    page: 9
    bbox_norm: [0.087, 0.083, 0.913, 0.478]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/fig03.png
    raw: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for-figures/fig03.png
    caption: "공개 split과 비공개 split 성적을 모델별로 이은 dumbbell 차트. 격차가 6%p를 넘으면 빨간 연결선이고 Kimi K2.5만 비공개 쪽이 0.8%p 높다"
    page: 10
    bbox_norm: [0.087, 0.083, 0.913, 0.441]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/tab01.png
    raw: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for-figures/tab01.png
    caption: "동시대 MCP 벤치마크 8종과의 위치 비교. 서버 수, 도구 수, task 수와 cross-server, distractor, 자연어 프롬프트, 실제 서버 지원 여부를 대조한다. 네 항목을 모두 갖춘 벤치마크 가운데 task가 1,000개인 것은 MCP-Atlas뿐이다"
    page: 3
    bbox_norm: [0.091, 0.120, 0.909, 0.322]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/tab02.png
    raw: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for-figures/tab02.png
    caption: "다섯 환경 버킷의 task 비중 범위, 대표 서버, 각 버킷이 유발하는 전형적 함정"
    page: 5
    bbox_norm: [0.200, 0.120, 0.800, 0.243]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/tab03.png
    raw: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for-figures/tab03.png
    caption: "모델별 tool call 계열 실패 분포. 인자 오류, 도구 오선택, 도구 미사용, 오류 복구 실패 네 가지와 전체 실패 중 tool call 계열 비중이다. o3 Pro의 도구 미사용 40.1%가 가장 크다"
    page: 6
    bbox_norm: [0.181, 0.120, 0.819, 0.561]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/tab04.png
    raw: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for-figures/tab04.png
    caption: "모델별 인지 계열 실패 분포. task 오해, 잘못된 합성, 응답 오독, 조기 종료, 환각, 논리 오류, 제약 위반 일곱 가지다. Gemini 3.1 Pro Preview의 조기 종료 42.8%와 Claude Opus 4.7의 잘못된 합성 25.0%가 대비된다"
    page: 8
    bbox_norm: [0.164, 0.120, 0.840, 0.616]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/tab05.png
    raw: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for-figures/tab05.png
    caption: "36개 서버 전체 목록. 서버별로 그 서버를 필요로 하는 task 수와 환경 버킷을 적었다. oxylabs 155개가 최다, context7 4개가 최소다"
    page: 14
    bbox_norm: [0.184, 0.542, 0.816, 0.871]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/tab06.png
    raw: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for-figures/tab06.png
    caption: "11개 실패 유형의 정의와 대표 사례. tool call 계열 4개와 인지 계열 7개이며 진단 judge가 쓰는 정의도 이것과 같다"
    page: 23
    bbox_norm: [0.086, 0.240, 0.924, 0.796]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/tab07.png
    raw: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for-figures/tab07.png
    caption: "judge 세 개를 각각 썼을 때의 coverage 0.75 기준 pass rate와 judge별 순위. Range 열은 세 judge 중 최고와 최저의 차이다"
    page: 24
    bbox_norm: [0.171, 0.134, 0.829, 0.499]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/tab08.png
    raw: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for-figures/tab08.png
    caption: "coverage 임계값을 0.50, 0.75, 0.90으로 바꿨을 때의 pass rate와 평균 coverage"
    page: 24
    bbox_norm: [0.164, 0.559, 0.837, 0.902]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/bandi-2026-mcp-atlas-a-large-scale-benchmark-for/tab09.png
    raw: raw/papers/bandi-2026-mcp-atlas-a-large-scale-benchmark-for-figures/tab09.png
    caption: "평가에 쓴 모델별 model ID와 reasoning 설정값"
    page: 25
    bbox_norm: [0.178, 0.281, 0.822, 0.698]
    strategy: table-region
    curated: false
---
## 한 줄 요약 (One-line Summary)

MCP-Atlas는 mock이 아닌 실제 운영 중인 MCP 서버 36개와 도구 220개 위에서 1,000개 task로 tool use 능력을 재는 벤치마크다. 채점 기준을 trajectory 일치에서 최종 답에 담겨야 할 원자 단위 claim으로 바꿨고, 20개 프런티어 모델을 같은 조건에서 평가한 결과 진단된 실패의 63.3%가 tool call 계열이 아니라 인지 계열이었다.

## 1. 자료 정보 (Document Information)

- **제목**: MCP-Atlas: A Large-Scale Benchmark for Tool-Use Competency with Real MCP Servers
- **저자**: Chaithanya Bandi, Razvan-Gabriel Dumitru 외 21인 (앞 두 명이 공동 1저자)
- **소속**: Scale AI (Bandi를 제외한 전원), National University of Singapore (Bandi)
- **arXiv**: 2602.00933v3 (cs.SE, 2026-05-19 개정판), 본문 10페이지에 부록 A부터 J까지 포함해 25페이지
- **코드**: <https://github.com/scaleapi/mcp-atlas>
- **라이선스**: 데이터셋(프롬프트, claim, trajectory, distractor 선택)은 CC BY 4.0, harness와 claim evaluator 코드는 Apache 2.0

## 2. 주요 기여 (Key Contributions)

MCP는 LLM 에이전트가 외부 도구를 발견하고 호출하는 계층의 표준으로 자리 잡았다. 저자들은 실무 배포가 평가에 요구하는 조건을 세 가지로 본다. 첫째, 분기와 cross-server 조율이 있는 현실적인 multi-step 워크플로를 다룰 것. 둘째, mock 대체물이 아닌 실제 MCP 서버와 API를 폭넓게 쓸 것. 셋째, 에이전트의 장황함이나 문체와 분리된 구조적이고 재현 가능한 claim 수준 채점을 할 것. 기존 MCP 벤치마크는 이 가운데 한두 가지에서 진전을 냈지만 나머지에서 한계를 보였다.

기여는 네 가지로 요약된다.

- **대규모 실제 서버 벤치마크**. 1,000개 task, 36개 운영 MCP 서버, 220개 도구다. 프롬프트는 도구 이름을 대지 않는 자연어이고, task의 98.6%가 cross-server 조율을 요구한다. task는 자동 생성이 아니라 사람이 쓰고 검증했으며, task 하나당 작성, 검증, 문서화에 전문가 노동 평균 4.6시간이 들었다.
- **데이터 공개**. 전체 벤치마크의 도메인과 난이도 분포를 보존하는 500개 task 공개 subset을 오픈소스로 내놓았다. 나머지 500개는 노출 모니터링과 리더보드 무결성을 위한 비공개 split이다.
- **claim 기반 채점과 세밀한 진단 분류**. 실패한 task마다 11개 유형 taxonomy로 자동 진단을 붙인다. tool call 계열 4종(인자 오류, 도구 오선택, 도구 미사용, 오류 복구 실패)과 인지 계열 7종(task 오해, 잘못된 합성, 응답 오독, 조기 종료, 환각, 논리 오류, 제약 위반)이다. 집계된 실패 유형 통계도 함께 공개한다.
- **대규모 실증 연구**. 20개 프런티어 모델을 평가해 세 층 성능 구조, 인지 우위의 실패 분포(63.3% 대 36.7%), 그리고 강력한 추론 모델이 실패한 task의 상당 비율에서 tool call을 거부하는 tool use 방침 불일치를 확인했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 설계 목표와 세 가지 위협

MCP-Atlas는 기존 연구가 통제하지 않은 평가 타당성 위협 세 가지를 겨냥한다. (i) 실제 세계의 오류 유형을 억제하는 정제된 서버 동작, (ii) 유효한 대안 풀이에 벌점을 주는 trajectory 일치 지표, (iii) 진정한 도구 발견을 불필요하게 만드는 깨끗한 도구 집합이다. task는 재현성과 오염 모니터링을 위해 무작위로 500/500 공개와 비공개 subset으로 나뉜다.

### 3.2 서버 생태계

36개 서버는 다섯 환경 카테고리에 걸친다. 전부 운영용 MCP 구현이고 합성 스텁은 없다. task는 실제 endpoint를 상대로 실행되므로 진짜 rate limit, 페이지네이션 경계, 스키마 버전 불일치, 일시적 오류 코드가 그대로 돌아온다. mock 환경이 설계상 제거하는 실패 조건을 의도적으로 남긴 것이다.

버킷별 비중은 Table 2에서 범위로, 부록 B에서 정확한 값으로 제시된다. Basic 32%(brave_search, exa, weather, maps), Productivity 22%(filesystem, notion, slack, arxiv), Coding 22%(git, github, code-executor, cli), Analytics 12%(airtable, mongodb), Financial 12%(twelvedata, alchemy)다. 버킷마다 전형적 함정도 다르다. Basic은 질의 구성과 페이지네이션, Productivity는 경로 범위와 rate limit, Coding은 상태를 가진 연산과 diff 범위, Analytics는 스키마 정렬과 타이핑, Financial은 기간 정렬과 심볼이다.

부록 B의 Table 5는 36개 서버 전체와 각 서버를 필요로 하는 task 수를 싣는다. oxylabs가 155개로 가장 많고 filesystem 133개, exa 108개, wikipedia 99개, mongodb 98개, airtable 96개가 뒤를 잇는다. 가장 적은 서버는 context7로 4개다. 여러 task가 서버 여러 개를 요구하므로 이 열의 합은 1,000을 넘는다. 서버 선정 기준은 네 가지다. 안정적이고 문서화된 MCP 구현의 존재, 기능 카테고리(검색, 분석, 생산성, 금융, 코딩) 간 다양성, distractor 선택이 의미를 갖도록 서버당 관련 도구가 여럿 있을 것, 현실적인 multi-step 워크플로에 적용 가능할 것이다.

각 서버는 Docker 컨테이너로 패키징된다. 파일시스템은 명시적으로 쓰기 가능한 작업 디렉터리를 제외하면 읽기 전용으로 마운트되고, 네트워크 egress는 그 서버가 정당하게 필요로 하는 상류 API로 허용 목록을 좁힌다. 컨테이너는 task 간 상태 누출을 막기 위해 task 사이마다 재시작되며, 평가 실행은 컨테이너를 특정 이미지 digest에 고정해 같은 digest로 다시 실행하면 상류 API drift를 제외하고 동일한 서버 동작을 얻는다.

### 3.3 task 구조

task마다 6개에서 37개(평균 15.2개)의 도구 집합이 노출되고, 그중 정답 풀이에 필요한 도구는 2개에서 8개(평균 4.1개)뿐이다. 나머지 평균 11.1개는 의미상 비슷한 카테고리에서 뽑은 distractor다. 알려진 API로 도구를 실행하는 능력이 아니라 잡음 속에서 도구를 발견하는 능력을 재기 위해서다. 이 설계는 선행 연구가 제기한 "unknown-tools" 문제를 직접 겨냥한다.

cross-server 조율은 기본값이다. 98.6%가 서버 두 개 이상의 도구를 요구하고(평균 2.55개), 정확히 두 개가 51.7%, 세 개가 38.2%, 네 개 이상이 8.7%다. 대부분의 task는 뒤쪽 tool call이 앞쪽 출력으로 parameterize되는 multi-hop 의존성을 가진다. 프롬프트는 단일 턴 자연어 요청이고 서버, 도구, 파라미터 이름을 하나도 대지 않는다.

task마다 claim 목록을 정의한다. 도구 출력에 근거한 원자적이고 독립적으로 검증 가능한 사실 진술의 집합으로, task당 평균 4.7개(범위 1개에서 23개)다. evaluator judge는 claim 하나를 충족(1.0), 부분 충족(0.5), 미충족(0.0)으로 채점한다. task 수준 coverage는 claim 점수의 평균이고, 주 분석에서는 coverage 0.75 이상을 통과로 본다.

claim 목록과 별도로 reference trajectory(평균 9.8 tool call step)가 task마다 최소 정답 경로를 기록한다. 공개 split에서는 도구 이름, 인자, 의존관계, task별 반환 근거를 포함한 순서 있는 tool call 시퀀스로 직렬화했다. reference trajectory는 풀이 가능성 확인, 도구 의존성 검증, 실패 진단에만 쓰고 통과/실패 채점에는 절대 쓰지 않는다. 통과/실패는 모델의 최종 답을 claim 목록에 대조해서만 계산하므로 유효한 대안 trajectory도 만점을 받는다.

### 3.4 예시 task (부록 D.5)

프롬프트는 "광고 효과 논문을 조사하면서 우리 온라인 데이터베이스의 광고 데이터와 비교하고 있다. Jane Castleman의 2024년 논문 초록을 가져오고, 2015년에서 2023년 사이에 시작한 캠페인 중 참여율이 가장 높은 캠페인의 날짜와 지역을 알려 달라"는 취지의 단일 턴 요청이다. 노출된 도구 15개 중 task에 필요한 것은 arxiv_search_papers, notion_API-post-search, notion_API-post-database-query 세 개이고, 나머지 12개(notion retrieve 계열 3개, fetch, memory 2개, slack 4개, whois 2개)는 distractor다.

reference trajectory는 세 단계다. arxiv 검색으로 초록을 가져오고, notion 검색으로 광고 데이터베이스를 찾고, database_id를 넣어 캠페인 날짜를 조회한다. claim은 다섯 개다. C1은 논문 제목, C2는 초록 본문, C3은 참여율 15%로 동률인 캠페인이 세 개라는 사실, C4는 세 캠페인의 시작일(2022-06-24, 2019-09-20, 2017-09-09), C5는 세 캠페인의 지역(National, International, International)이다.

### 3.5 평가 조건과 judge

모든 모델은 같은 task 프롬프트, 같은 노출 도구 집합, 같은 tool call 예산, 같은 채점 루브릭, 같은 최종 답 프로토콜이라는 task 수준 동일 조건에서 평가된다. 제공사 API가 서로 다른 네이티브 tool call 인터페이스를 노출하므로 저수준 어댑터는 제공사별로 다르지만, 모델별 demonstration, 재시도 방침, task 프롬프트, scaffold는 적용하지 않는다. 부록 H는 harness가 모델 평가 중 task당 최대 5회 재시도를 허용하고 도구 오류 요약을 모델 컨텍스트에 되돌려 준다고 밝힌다. tool call 한도 100회에 도달하면 부분 응답도 채점한다.

judge 편향을 모델 성능에서 분리하려고 세 LLM judge가 Zheng 외의 방법론에 따라 모든 task를 독립적으로 채점한다. Gemini 3.1 Pro Preview가 주 judge이고 GPT-5.4와 Claude Opus 4.6이 대조군이다. judge는 task당 한 번이 아니라 claim당 한 번 호출된다. claim이 5개면 evaluator 호출도 5회 독립으로 이루어지고 task coverage는 그 5개 점수의 평균이다. claim마다 독립 호출하는 이유는 같은 응답에 대해 모든 claim을 한 호출에서 채점할 때 생기는 컨텍스트 손실을 피하기 위해서이며, claim이 10개를 넘는 4%의 task에서 특히 중요하다.

evaluator 프롬프트(부록 C)는 수치 비교 기준을 명시한다. 소수는 정확히 일치할 필요가 없고, claim 수치의 5% 이내면 일치로 보며, 백분율은 ±1%p를 허용한다. "0.5"와 "50%"와 "half"처럼 표현만 다른 수치는 일치로 본다. judge는 세 범주 라벨과 함께 구조화된 근거와 신뢰도 값을 출력한다.

95% 신뢰구간은 Efron의 비모수 부트스트랩으로 낸다. 모델마다 task별 coverage 점수에서 N=1000 task를 복원추출한 표본을 1만 번 뽑아 매번 pass@0.75를 다시 계산하고 2.5번째와 97.5번째 백분위를 취한다. 구간은 78.2% ± 2.5%처럼 반폭으로 보고한다.

### 3.6 실패 유형 분류와 진단 프롬프트

실패한 task는 11개 유형 taxonomy에서 주 실패 유형 하나를 배정받는다. 진단은 coverage가 0.75 미만인 task와 모델 쌍에만 실행되고, 진단 라벨은 사후 실패 분석에만 쓰이며 통과/실패 채점에는 쓰이지 않는다.

진단 프롬프트는 reference trajectory를 포함한다. 놓친 claim을 채우기에 충분했던 도구 접근 가능 근거가 무엇인지 알아야 사후 귀인이 가능하기 때문이다. trajectory는 검증된 근거 흔적이지 유일한 목표 경로가 아니며, 대안 계획, 다른 도구 순서, 추가 호출, 병렬 호출, 다른 parameterization에 벌점을 주는 데 쓰이지 않는다. 프롬프트는 네 단계로 구성된다. (1) 정답 trajectory와 claim으로 무엇이 일어났어야 하는지 고정, (2) 모델의 실제 trajectory를 턴 단위로 검토해 전진 여부, 오류 후 동일 재시도 여부, 비생산적 도구 전환, 필요 데이터가 없는 상태의 정지를 평가, (3) 채점기가 남긴 놓친 claim의 이유를 직접 근거로 사용, (4) 11개 유형 중 하나로 매핑이다.

judge 규칙에는 경계 판정 지침이 들어 있다. 응답 오독은 도구 출력에서 잘못된 필드나 행을 읽은 것이고 잘못된 합성은 전부 맞게 읽고 결합을 잘못한 것이다. 논리 오류는 multi-step 추론 사슬 자체가 틀린 것이고, 환각은 어느 도구 출력에도 없는 사실을 말한 것이며, 도구 미사용은 도구가 필요한 사실에 대해 도구를 아예 우회한 것이다. 인자 오류는 첫 번째 잘못된 파라미터 사용이고 오류 복구 실패는 같은 오류를 적응 없이 반복한 것이다. 잘못된 합성은 논리 오류, 응답 오독, 환각으로 더 잘 설명되지 않을 때만 쓴다. 신뢰도는 trajectory와 채점기 근거가 한 유형을 명확히 가리키면 0.9에서 1.0, 두 번째 유형이 근접하면 0.6에서 0.8, 모호하면 0.6 미만으로 보정한다.

### 3.7 품질 관리

task와 평가 harness의 품질은 다섯 층으로 유지된다. (1) 전문가가 구성된 MCP 환경에서 reference trajectory를 직접 실행, (2) 도메인 전문가의 정확성과 풀이 가능성 검토, (3) 프롬프트에 도구와 서버 이름이 새지 않았는지 2차 검토, (4) claim 완결성과 trajectory 일관성의 LLM 자동 검증, (5) 무작위 표본 수동 감사다.

task 작성 지침(부록 D)은 세 요건을 요구한다. 외부 데이터가 있어야 풀리고 평가 기간 내내 유효한 정보에 의존할 것, 주관적 표현을 피하고 내부 시스템 구조나 의도된 풀이 경로를 드러내지 않는 대화체일 것, 간접 참조를 해소하거나 여러 소스에 걸쳐 데이터를 걸러야 하는 multi-step 요청일 것이다. 작성 단계의 검토자는 도구 선택, 도구 입력, 해석의 느슨한 3항목 체크리스트를 썼다. 이 체크리스트는 사후 실패 분석용 11개 유형 자동 진단과 별개다. 작성자와 검토자는 현지 임금 기준을 충족하거나 초과하는 계약 조건으로 보상받았고 무급 자원 노동은 없었다. 내부 작성 매뉴얼 전문은 운영 절차와 접근 제어 세부를 담고 있어 공개하지 않는다.

### 3.8 형식화 (부록 J)

task는 튜플 τ = (G, C, T_expose, π*, C*)로 정의된다. G는 목표 명세, C는 자연어 맥락과 제약, T_expose는 에이전트에 제시되는 허용 도구 집합, π*는 진단용 최소 의존 충족 tool call 시퀀스인 reference trajectory, C*는 정답이 담아야 할 서로 겹치지 않고 독립적으로 검증 가능한 명제의 집합인 claim 목록이다. π*가 요구하는 도구 T_req가 target이고 T_expose에서 T_req를 뺀 나머지가 distractor다. 단일 턴 프롬프트가 주어지면 에이전트는 tool call과 환경 응답의 실행 trace를 쌓은 뒤 텍스트 답 Â를 낸다. 이 상호작용은 유한 horizon POMDP를 이루고, reward는 claim 기반 채점 함수 S(Â, C*)로 사후에 붙는다. 통과/실패는 S로만 결정되며 π*와 독립이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 전체 성능과 세 층 구조

20개 모델은 Anthropic, Google, OpenAI, Meta, Kimi, GLM 여섯 제공사에서 나왔고 모두 1,000개 task 전체를 같은 노출 도구, tool call 예산, 프롬프트 템플릿, evaluator judge로 실행했다. 리더보드는 세 층으로 나뉜다. 상위층은 신뢰구간이 겹치는 세 모델로 Muse Spark 82.2%, Claude Opus 4.7 79.1%, Gemini 3.1 Pro Preview 78.2%다. 중위층은 67.6%에서 76.8% 사이의 여덟 모델(Claude Opus 4.6 76.8%, GLM-5.1 75.6%, GPT-5.5 75.3%, GPT-5.4 70.6%, Gemini 3 Pro Preview 70.3%, Claude Opus 4.5 69.8%, Claude Sonnet 4.6 69.5%, GPT-5.2 67.6%)이다. 나머지 아홉 모델은 65% 아래로 길게 이어져 Kimi K2.5 64.4%, Gemini 3 Flash Preview 62.0%, Claude Sonnet 4.5 59.5%, GLM-4.7 58.1%, Gemini 3.1 Flash Lite Preview 57.1%, GPT-5.4 Mini 56.7%, GPT-5.1 50.1%, o3 Pro 44.5%, Claude Haiku 4.5 40.2% 순이다. 평균 coverage는 Muse Spark 86.2%에서 Claude Haiku 4.5 51.7%까지다.

두 결과가 두드러진다. 첫째, 오픈소스 GLM-5.1은 75.6%로 주 judge 기준 GPT-5.5와 통계적으로 동률이고 다른 GPT-5.x 변형보다 위에 있어, 에이전트 과제에서 오래 독점 모델에 유리했던 격차를 좁혔다. 둘째, 수학과 코딩 벤치마크에서 선도적 추론 모델인 o3 Pro는 실패한 trajectory의 40.1%에 tool call이 하나도 없어 44.5%로 하위권에 머문다. 외부 근거가 필요한 task와 기본 tool use 방침이 맞지 않는다는 신호다.

### 4.2 실패 유형 분석

20개 모델에서 진단된 약 6,900건의 실패 중 63.3%가 인지 계열이고 36.7%가 tool call 계열이다. 전체 평균으로 보면 tool call 계열은 인자 오류 6.9%, 도구 오선택 9.0%, 도구 미사용 10.5%, 오류 복구 실패 10.3%이고, 인지 계열은 task 오해 15.1%, 잘못된 합성 12.0%, 응답 오독 7.6%, 조기 종료 18.7%, 환각 4.1%, 논리 오류 4.1%, 제약 위반 1.7%다. 이 분포는 MCP-Atlas가 유효한 tool call을 낼 수 있는지만 재는 벤치마크가 아님을 보여준다. 현재 에이전트의 지배적 실패는 도구에 접근한 뒤에 벌어진다. task를 이해하고, 근거가 충분히 모였는지 판단하고, 도구 출력에서 최종 답을 합성하는 단계다. tool call 실패는 리더보드 하위에서 여전히 중요하지만 남은 오류의 대부분을 설명하지는 않는다.

가장 뚜렷한 tool use 실패는 하위 모델에서 나타난다. o3 Pro는 진단된 실패의 57.6%가 tool call 계열이고 실패 trajectory의 40.1%에 tool call이 전혀 없다. GPT-5.1과 Claude Haiku 4.5도 덜 극단적이지만 비슷한 근거 획득 실패를 보여 tool call 계열 비중이 각각 50.4%와 46.7%다. Haiku 4.5의 도구 미사용은 25.7%, GPT-5.1은 22.9%다. 이 모델들은 근거 수집 단계에 들어가기 전에 실패하는 경우가 많아, 기본 tool use 방침이 미지의 도구와 현실적 distractor가 있는 MCP 환경에 잘 보정되지 않았음을 시사한다.

강한 모델에서는 병목이 tool call에서 근거 사슬을 완성하고 활용하는 단계로 옮겨 가고, 최신 프런티어 모델은 이 경계를 더 하류로 밀어낸다. 조기 종료는 한 상위 하위집단의 대표 실패다. Gemini 3.1 Pro Preview, GPT-5.4, Claude Opus 4.6은 진단된 실패의 각각 42.8%, 41.4%, 36.3%에서 조기 종료한다. 반면 더 새로운 GPT-5.5와 Claude Opus 4.7은 이 유형을 각각 3.6%와 3.8%로 거의 없앴지만, 오류가 더 어려운 retrieval 이후 실패로 다시 나타난다. 잘못된 합성이 GPT-5.5에서 19.8%, Claude Opus 4.7에서 25.0%로 올라간다. GLM-5.1도 조기 종료 3.8%에 잘못된 합성 22.5%로 같은 양상이다. 에이전트가 워크플로를 끝까지 지속하지만 수집한 근거를 잘못 결합하거나 잘못 해석하거나 잘못 보고하는 새로운 프런티어 국면이다. 저자들은 다음 개선이 claim을 의식한 정지 기준뿐 아니라 최종 답을 수집된 도구 근거에 대조하는 trajectory 기반 verification에서 나올 것으로 본다.

### 4.3 효율 frontier

Figure 2는 모델마다 task당 평균 벽시계 trajectory 시간과 pass rate를 함께 그린다. Pareto frontier 위에는 여섯 모델이 있다. 빠르지만 부정확한 끝의 Claude Haiku 4.5(27초, 40.2%), GLM-4.7(42초, 58.1%), 둘 다 50초 부근에 70% 안팎인 Claude Opus 4.5와 Gemini 3 Pro Preview, Claude Opus 4.7(71초, 79.1%), 최상단의 Muse Spark(121초, 82.2%)다.

여러 모델이 더 빠른 대안에 완전히 지배된다. o3 Pro는 194초로 가장 느리면서 44.5%로 가장 부정확한 편에 속해 리더보드 하위 절반의 모든 모델에 벽시계 효율에서 크게 뒤진다. GPT-5.1(84초, 50.1%)은 더 빠르고 더 정확한 GLM-4.7에 지배된다. GPT-5.4 Mini(135초, 56.7%)는 상위 모델 GPT-5.4(130초, 70.6%)보다 느리면서 점수도 낮다. 벽시계 시간이 모델 추론이 아니라 tool call 왕복 지연에 지배되는 에이전트 환경에서는 "Mini"라는 이름이 빠른 실행으로 이어지지 않는다는 뜻이다. 오픈소스 GLM-5.1은 강한 pass rate에도 task당 평균 149초가 걸려, 비슷한 정확도의 Claude Opus 4.6과 Opus 4.7의 대략 두 배 벽시계 비용 탓에 frontier에 들지 못한다.

### 4.4 judge 간 일치도

세 judge 중 주 judge인 Gemini 3.1 Pro Preview가 가장 후해서 평균 pass rate 65.4%이고, GPT-5.4가 가장 엄격해 62.3%, Claude Opus 4.6이 중간인 63.9%다. 모델별 점수 범위는 2.1%p에서 4.6%p다. 순위는 judge 사이에서 대체로 보존되고 몇 안 되는 변동은 촘촘한 상위 군집에 집중된다. 가장 큰 변동은 Claude Opus 4.7로, Gemini 3.1 Pro Preview에서 2위, GPT-5.4에서 3위, Claude Opus 4.6에서 5위다. 저자들은 이를 self-preference로 해석하지 않는다. Claude judge는 더 새로운 Anthropic 모델을 우대하지 않으며 오히려 Gemini 3.1 Pro Preview와 GLM-5.1을 그 위에 놓는다. 더 보수적인 해석은 상위 군집의 여러 모델이 judge 간 범위 2.1%p에서 4.6%p에 견줄 만한 간격으로 떨어져 있다는 것이다. 따라서 상위권의 작은 순위 교체는 견고한 능력 차이가 아니라 evaluator 불확실성으로 읽어야 하며, 주 리더보드에는 단일 주 judge를 쓰고 judge 간 범위를 보정 정보로 보고하는 방식이 뒷받침된다.

부록 F의 Table 7을 보면 Muse Spark는 세 judge 모두에서 1위(82.2, 79.1, 79.6)이고, GLM-5.1은 Claude judge에서 3위(75.2)로 올라간다. 순위가 judge에 따라 바뀌는 모델은 Opus 4.7, Gemini 3.1 Pro, GLM-5.1, Opus 4.5와 Sonnet 4.6, 그리고 GLM-4.7, Gemini 3.1 Flash Lite, GPT-5.4 Mini 세 모델이 얽힌 15위에서 17위 구간이다. 나머지 모델은 세 judge에서 순위가 같다.

### 4.5 coverage 임계값 민감도

주 본문의 0.75 임계값은 리더보드 관례를 따른 보고상의 결정이지 채점상의 결정이 아니다. claim 루브릭이 실수 값 coverage를 돌려주기 때문이다. 부록 G의 Table 8은 20개 모델의 평균 coverage와 0.50, 0.75, 0.90 임계값 pass rate를 싣는다. 단일 대표 임계값을 쓰는 근거는 두 가지다. 첫째, 0.50과 0.75 사이의 Spearman 순위 상관이 ρ = 0.965로 높아 순위가 대체로 보존된다. 둘째, 두 pass rate의 절대 차이는 리더보드 상위에서 좁고(Muse Spark 89.6%에서 82.2%로 7.4%p 하락) 하위로 갈수록 넓어진다(Claude Haiku 4.5 55.8%에서 40.2%로 15.6%p 하락). 부분 점수는 엄격한 통과 기준보다 얻기 쉽고 그 격차는 전체 능력이 낮을수록 커지므로, 잘 동작하는 coverage 지표에서 기대되는 양상이다. pass@0.90에서는 Muse Spark 71.2%, Claude Opus 4.7 63.2%, Gemini 3.1 Pro Preview 61.8%이고 Claude Haiku 4.5는 27.1%다.

### 4.6 공개와 비공개 split 민감도

공개 split에는 프롬프트, 도구 집합, claim, reference trajectory가 들어 있으므로, 릴리스 이후의 격차는 암기의 직접 증거가 아니라 split 민감도와 노출 모니터링 신호로 해석하는 것이 맞다. 대부분의 모델이 공개 task에서 더 높은 점수를 받고 격차는 −0.8%p에서 +9.6%p에 걸치며, 격차는 전체 pass rate를 따라가지 않는다. 격차에는 모델 계열과 제공사별 군집이 보이지만, 집단 크기가 고르지 않은 작은 모델 수준 비교라 저자들은 이 패턴을 오염 증거가 아니라 감사 신호로 다룬다. OpenAI 모델은 +8.4%p(범위 +7.0에서 +9.6)에 몰리고 Google 평균 +5.2%p, Anthropic +4.8%p, 오픈소스 +3.8%p이며, Kimi K2.5만 비공개 성적이 공개보다 높다(−0.8%p). Figure 3에서 6%p를 넘는 격차는 빨간 연결선으로 표시되며 GLM-5.1(+6.0), GPT-5.5(+8.2), GPT-5.4(+9.6), Claude Opus 4.5(+7.2), Claude Sonnet 4.6(+6.6), GPT-5.2(+8.4), GLM-4.7(+6.2), Gemini 3.1 Flash Lite Preview(+6.6), GPT-5.4 Mini(+8.6), GPT-5.1(+7.0), o3 Pro(+8.6)가 해당한다. Muse Spark의 격차는 +0.4%p로 가장 작다.

### 4.7 재현 비용

20개 모델 전체 실행은 20 × 1,000 = 2만 개 trajectory를 요구했다. judge가 claim당 호출되므로(평균 4.7개) 주 리더보드에는 약 9만 4,000회의 evaluator 호출이, 세 judge 민감도 연구에는 약 28만 2,000회가 들었다. 관측된 평균 trajectory 시간(task당 27초에서 194초)에서 한 모델의 1,000개 task 실행은 워크스테이션 한 대에서 8개에서 12개 동시 클라이언트로 2시간에서 18시간이 걸렸다. 주 evaluator인 Gemini 3.1 Pro Preview는 8개에서 12개 동시 요청으로 모델당 약 2시간에 1,000개 task 채점을 마쳤다. 저장소에는 vendor 모델 자격 증명 없이 실행되는 로컬 smoke test가 포함되고, 전체 라이브 재평가에는 제공사 API 키와 일부 상류 MCP 서버의 서비스별 자격 증명이 필요하다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

부록 A는 결론을 제한하는 요인을 일곱 항목으로 밝힌다.

- **judge 모델 상한**. 모든 평가가 LLM으로 이루어진다. 세 독립 judge로 완화했지만 절대 pass rate는 2점에서 5점의 judge 간 대역을 감안해 읽어야 한다. 논문 발표와 후속 평가 사이에 judge 모델 버전이 바뀌면 보고 수치도 움직일 수 있으므로, 사용한 judge를 항상 보고하고 judge 버전을 고정하라고 권한다.
- **움직이는 생태계의 스냅샷**. 서버, 도구, 그 아래 API가 살아 있다. 현재 리더보드는 2026년 5월 시점의 서버 동작이다. rate limit 정책, 인증 방식, 스키마 버전이 예고 없이 바뀌고 소수의 task는 시간이 지나면 풀 수 없거나 사소하게 쉬워질 수 있다. 서버 컨테이너 버전을 고정하고 상류 drift가 감지되면 재채점 결과를 공개하겠지만, 개별 task trajectory 수준의 재현성은 상류 안정성에 묶여 있다.
- **영어 전용 프롬프트**. 1,000개 task 전부 영어로 작성됐고 영어 서버 응답을 겨냥한다. 비영어 tool use, 문자 처리, 현지화 실패는 범위 밖이다.
- **제공사별 harness 기본값**. 제공사가 네이티브 tool call 전략(anthropic-native, openai-responses-api 등)을 권장하면 그것을 쓴다. 공개된 모범 사례를 따르는 대신 harness가 제공사 간에 완전히 같지는 않다.
- **tool call 예산**. task당 100회 예산을 고정했다. 실제 도구 오류에서 재시도 위주 복구가 필요한 장기 task에서는 소수의 실패가 모델 능력이 아니라 이 상한에서 비롯된다. 예산을 늘리면 절대 수치는 올라가겠지만 내부 테스트에서 상대 순위가 바뀌지는 않았다.
- **claim 추출 오차 대역**. 원자 claim은 전문가 작성과 자동 후보 생성 뒤 수동 검토의 조합으로 만들어졌다. claim 목록에 남은 잡음은 완벽한 에이전트에게도 달성 가능한 pass rate에 잡음을 만든다. 일부 claim은 프롬프트의 모호한 해석 아래에서만 회복 가능하기 때문이다.
- **진단의 reference trajectory 의존**. 자동 진단이 검증된 reference trajectory를 쓰므로, 서로 매우 다른 근거 경로가 여럿 존재할 때 실패 라벨이 저자가 제공한 근거 경로 쪽으로 기울 수 있다. claim 기반 통과/실패 채점, 실패 이후에만 진단 적용, 진단 judge에게 trajectory를 정답 풀이가 아닌 하나의 충분한 근거 흔적으로 다루라는 지시로 완화한다.

더 넓은 영향과 위험도 밝힌다. 벤치마크는 배포 전에 신뢰성 격차를 드러내 도구 발견, 근거 수집, 합성, 정지 행동의 실패를 찾도록 돕지만, 더 나은 평가는 오용, 무단 데이터 접근, 프라이버시 유출, 상류 이용 약관 위반이 가능한 환경에서 더 효과적으로 동작하는 에이전트 개발도 가속할 수 있다. 라이브 MCP 평가는 API drift, 라이선스 변경, 사용자가 harness를 개인 계정에 연결할 때의 민감 출력 노출 같은 상류 위험을 물려받는다. 완화책은 서버 컨테이너 샌드박싱, 네트워크 egress 제한, 비공개 split 보류, 자격 증명과 비밀 제외, 상류 라이선스 문서화, raw 상류 도구 출력 스냅샷 대신 파생된 claim과 점수만 공개하는 것이다. 저자들은 MCP-Atlas를 안전 필수, 프라이버시 민감, 고위험 배포에 대한 안전 인증이 아니라 신뢰성과 실패 분석을 위한 진단 벤치마크로 쓰라고 명시한다.

향후 과제로는 단일 pass rate 대신 정확도, 효율, judge 민감도, split 격차, drift, 실패 유형을 묶은 진단 프로파일을 보고하는 관행, 그리고 멀티턴 명확화와 distractor ablation의 추가를 든다.

## 6. 관련 연구 (Related Work)

LLM 평가는 정적이고 지식 중심인 평가에서 에이전트 능력을 재는 동적이고 상호작용적인 패러다임으로 옮겨왔다. MMLU와 HELM 같은 초기 벤치마크는 고정 문항으로 사실 회상과 추론을 고립된 환경에서 쟀다. 이후 WebArena와 MiniWoB++가 정보 검색이나 온라인 쇼핑 같은 task를 위한 GUI 탐색과 조작을 요구했고, OSWorld와 Android Arena는 운영체제 수준으로 확장해 멀티모달 제어와 장기 planning을 시험했다. API와 function calling 계열에서는 ToolBench가 수천 개 RESTful API를 multi-step task로 묶었고, BFCL이 합성과 실제 API의 function calling 리더보드를 제공했으며, τ2-Bench가 소매와 항공 도메인의 사용자와 에이전트 교대 상호작용을 강조했다. SWE-Bench(소프트웨어 공학)와 GAIA(일반 보조)는 코드 실행과 웹 검색 같은 이종 도구를 통합해 planning, 오류 복구, 조율의 어려움을 부각했다.

MCP 기반 평가에서는 지속적인 긴장이 보인다. 평가 엄밀함을 최적화하는 벤치마크는 작게 머물고, 규모를 달성한 벤치마크는 객관성이나 현실성에서 타협한다. 초기 MCP 벤치마크는 엄밀한 프로그램적 평가를 우선했다. MCP-Universe는 형식, 정적, 동적 evaluator에 실시간 ground truth 검증을 도입했고 MCP-Atlas의 distractor 설계를 이끈 unknown-tools 문제를 식별했다. Toolathlon과 MCPMark도 라이브 소프트웨어 환경에 전용 검증 스크립트를 붙였지만 수작업 task 작성과 맞춤 검증기의 비용 탓에 250개 task 미만에 머물러, 에이전트가 실제로 마주치는 tool use 시나리오의 다양성에서 통계적으로 견고한 비교를 하기에 부족하다. 규모를 키우려는 시도는 다른 절충을 낳았다. MCPEval은 자동 생성으로 676개 task에 이르렀지만 task 품질과 자연스러움이 손상될 수 있다. MCP-Bench와 LiveMCPBench는 전체론적 LLM-as-judge 채점을 채택해 규모를 얻었지만 문체 편향이 들어가, 장황한 응답이 간결한 정답과 다른 점수를 받을 수 있어 재현성이 떨어진다. MCPVerse와 MCP-RADAR는 서버 범위를 넓히지만 부분적으로 합성이나 mock 구현에 의존해 결과가 실제 성능을 얼마나 예측하는지가 제한된다.

MCP-Atlas는 세 설계 선택으로 이 절충을 다룬다. 첫째, 자동 생성 대신 체계적 수동 검증으로 품질을 유지하면서 규모(36개 서버, 220개 도구, 1,000개 task)를 달성한다. 둘째, 전체론적 LLM-as-judge 채점을 claim 기반 평가로 대체한다. task마다 정답이 담아야 할 독립적이고 검증 가능한 사실 claim을 정의해, 완전한 프로그램적 검증의 작성 부담 없이 claim 수준의 judge 보조 부분 점수를 가능하게 한다. 셋째, 실제 MCP 서버만 써서 평가 충실도를 확보하고 task마다 그럴듯한 distractor를 체계적으로 넣어 선행 연구가 주된 실패 유형으로 지목한 도구 발견 능력을 직접 시험한다.

MCP 표준 자체는 Anthropic이 2024년 11월 발표한 사양이다. judge 방법론은 Zheng 외의 MT-bench와 Chatbot Arena 연구를 따르고 신뢰구간은 Efron의 부트스트랩이다.

## 7. 용어집 (Glossary)

| 용어 | 설명 |
|---|---|
| MCP-Atlas | 이 논문의 벤치마크. 실제 서버 36개와 도구 220개 위의 1,000개 task |
| claim | task마다 정의된 원자적 사실 진술. 정답이라면 최종 답에 담겨 있어야 하는 단위 |
| coverage | task의 claim 점수 평균. 충족 1.0, 부분 충족 0.5, 미충족 0.0을 평균낸 값 |
| pass@0.75 | coverage 0.75 이상을 통과로 보는 이 논문의 주 지표 |
| distractor | task에 함께 노출되지만 풀이에 필요 없는 도구. 의미상 비슷한 카테고리에서 고른다 |
| reference trajectory | 저자가 검증한 최소 정답 경로. 풀이 가능성 확인과 진단에만 쓰고 채점에는 쓰지 않는다 |
| cross-server orchestration | 서버 두 개 이상의 도구를 엮어 하나의 task를 푸는 것. 이 벤치마크 task의 98.6% |
| environment bucket | 서버를 성격으로 묶은 다섯 묶음. Basic, Productivity, Coding, Analytics, Financial |
| tool-call failure | 실패 유형 상위 분류 하나. 인자 오류, 도구 오선택, 도구 미사용, 오류 복구 실패 |
| cognitive failure | 나머지 상위 분류. task 오해, 잘못된 합성, 응답 오독, 조기 종료, 환각, 논리 오류, 제약 위반 |
| early termination | 인지 실패 중 하나. task는 이해했지만 필요한 단계를 다 마치기 전에 멈추는 것 |
| faulty synthesis | 인지 실패 중 하나. 도구 출력은 제대로 받았는데 최종 답으로 잘못 결합하거나 해석하는 것 |
| no tool use | tool call 실패 중 하나. 도구가 필요한데 아무 도구도 부르지 않고 내부 지식으로 답하는 것 |
| public/private split | 500/500으로 나눈 공개와 비공개 분할. 비공개 쪽은 노출 모니터링과 리더보드 무결성용 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | 20개 모델의 전체 성적. 왼쪽은 coverage 0.75 기준 pass rate 막대(Muse Spark 82.2%에서 Claude Haiku 4.5 40.2%까지)이고 오른쪽은 같은 순서의 평균 coverage다. 색으로 top tier, mid tier, tail 세 층을 구분했다 | caption-region | ★ wiki 권장 (result) |
| fig02 | 9 | 정확도와 소요 시간의 Pareto frontier. 가로축이 task당 평균 벽시계 시간, 세로축이 pass rate다. Claude Haiku 4.5, GLM-4.7, Claude Opus 4.5, Gemini 3 Pro Preview, Claude Opus 4.7, Muse Spark 여섯 모델이 초록 선 위에 있고 o3 Pro는 194초에 44.5%로 오른쪽 아래에 홀로 떨어져 있다 | caption-region | ★ wiki 권장 (result) |
| fig03 | 10 | 공개 split과 비공개 split 성적을 모델별로 이은 dumbbell 차트. 격차가 6%p를 넘으면 빨간 연결선이고 Kimi K2.5만 비공개 쪽이 0.8%p 높다 | caption-region | ★ wiki 권장 (result) |
| tab01 | 3 | 동시대 MCP 벤치마크 8종과의 위치 비교. 서버 수, 도구 수, task 수와 cross-server, distractor, 자연어 프롬프트, 실제 서버 지원 여부를 대조한다. 네 항목을 모두 갖춘 벤치마크 가운데 task가 1,000개인 것은 MCP-Atlas뿐이다 | table-region | ★ wiki 권장 (related work), 본문 표로 전사 |
| tab02 | 5 | 다섯 환경 버킷의 task 비중 범위, 대표 서버, 각 버킷이 유발하는 전형적 함정 | table-region | ★ wiki 권장 (method), 본문 표로 전사 |
| tab03 | 6 | 모델별 tool call 계열 실패 분포. 인자 오류, 도구 오선택, 도구 미사용, 오류 복구 실패 네 가지와 전체 실패 중 tool call 계열 비중이다. o3 Pro의 도구 미사용 40.1%가 가장 크다 | table-region | ★ wiki 권장 (result), 본문 표로 전사 |
| tab04 | 8 | 모델별 인지 계열 실패 분포. task 오해, 잘못된 합성, 응답 오독, 조기 종료, 환각, 논리 오류, 제약 위반 일곱 가지다. Gemini 3.1 Pro Preview의 조기 종료 42.8%와 Claude Opus 4.7의 잘못된 합성 25.0%가 대비된다 | table-region | ★ wiki 권장 (result), 본문 표로 전사 |
| tab05 | 14 | 36개 서버 전체 목록. 서버별로 그 서버를 필요로 하는 task 수와 환경 버킷을 적었다. oxylabs 155개가 최다, context7 4개가 최소다 | table-region | (부록, 참고용) |
| tab06 | 23 | 11개 실패 유형의 정의와 대표 사례. tool call 계열 4개와 인지 계열 7개이며 진단 judge가 쓰는 정의도 이것과 같다 | table-region | (확인 필요, 면적비 0.47), 본문 표로 전사 |
| tab07 | 24 | judge 세 개를 각각 썼을 때의 coverage 0.75 기준 pass rate와 judge별 순위. Range 열은 세 judge 중 최고와 최저의 차이다 | table-region | (부록, 참고용), 본문 표로 전사 |
| tab08 | 24 | coverage 임계값을 0.50, 0.75, 0.90으로 바꿨을 때의 pass rate와 평균 coverage | table-region | (부록, 참고용), 본문 표로 전사 |
| tab09 | 25 | 평가에 쓴 모델별 model ID와 reasoning 설정값 | table-region | (부록, 참고용) |
