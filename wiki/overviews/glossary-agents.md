---
title: "용어집: Agents (Terminology Glossary)"
type: overview
year: 2026
category: overviews
source_collection: synthesis
glossary_domain: agents
applies_to: [agents, applications, database, evaluations, etc, llms, overviews, physical-ai]
tags: [glossary, terminology, agents, synthesis]
---

## 표기 원칙

agents 도메인(agentic 시스템·tool use·harness·loop engineering) 전문 용어의 canonical 표기 SSOT다. 공통 원칙은 [[overviews/glossary-physical-ai]]의 표기 원칙 절과 같다 — 원어 유지 + 문서당 첫 등장 시 서술형 한글 풀이 한 문장, 원어에 조사 직결, 금지 표기는 `·` 구분 리터럴 검사, `—`는 지침만.

이 도메인은 음차가 이미 넓게 정착해 있다(프롬프트 69회·컨텍스트 73회·메모리 33회 등). 정착한 음차는 음차를 canonical로 삼고, 개념어는 원어를 유지한다.

금지 표기 칸에는 영문 철자 변형도 둘 수 있다 (예: LLM-as-a-Judge 행의 LLM-as-judge). `lint_terms.py`는 영문도 대소문자를 구분하는 리터럴 부분 문자열로 검사하므로 canonical과 대소문자만 다른 변형을 금지 표기로 두어도 canonical 자체는 걸리지 않는다. (2026-09 4차 갱신)

## 용어 표

| 원어 | canonical 표기 | 금지 표기 | 첫 등장 풀이 예문 | 비고 |
|---|---|---|---|---|
| tool use | tool use | 도구 사용 | tool use는 모델이 외부 도구를 호출해 행동 범위를 넓히는 능력이다 | 로봇이 물리적 도구를 다루는 문맥(RT-2, PhysToolBench, SONIC)도 원문이 tool use라 같은 원어를 쓴다 |
| tool call | tool call | 도구 호출 | tool call은 모델이 도구 하나를 실제로 호출하는 한 번의 실행 단위다 | tool use가 능력이라면 tool call은 그 능력의 개별 실행이다. 2026-09 3차 갱신 등재 (원어 55회 대 직역 24회) |
| function calling | function calling | — | function calling은 모델이 구조화된 인자로 함수를 호출하게 하는 인터페이스다 | "함수 호출"은 일반 프로그래밍 의미와 겹쳐 지침만 |
| MCP | MCP | — | MCP는 모델이 외부 도구와 데이터 원천에 표준화된 방식으로 접근하게 하는 프로토콜이다 | Model Context Protocol의 약어이며 약어를 기본 표기로 쓴다. 저장소 최다 출현 약어(789회)인데 어느 용어집에도 없었다. 풀어 쓴 "모델 컨텍스트 프로토콜"은 0건이라 금지 표기는 비운다. 지침만. 2026-09 4차 갱신 등재 |
| planning | planning | — | planning은 목표를 하위 단계로 쪼개 실행 순서를 정하는 과정이다 | "계획"은 일반어라 지침만 — 기법 명칭 문맥에서는 원어 권장 |
| policy | policy | 메모리 정책·기억 정책·정책 네트워크 | RL 문맥의 policy는 observation을 받아 action을 정하는 함수다 | agents 도메인은 일반 의미 "정책"(운영 정책 등)이 많아 RL 복합어만 금지 |
| memory | 메모리 | — | — | 음차 정착(33회). "장기 기억" 같은 인지과학 서술은 허용하되 시스템 구성 요소는 메모리. "기억 정책"은 policy 행. 단독 memory만 메모리로 쓰고 episodic memory, working memory, procedural memory, semantic memory 같은 복합어는 원어로 쓴다 (episodic memory 행. 2026-09 4차 갱신에서 skill 행과 같은 복합어 방침을 명문화했다) |
| episodic memory | episodic memory | 일화 기억 | episodic memory는 개별 경험 단위로 저장되는 메모리 층이다 | procedural·semantic memory도 원어 |
| working memory | working memory | — | working memory는 한 번의 실행 안에서만 유지되며 여러 node나 단계가 함께 읽고 쓰는 메모리 층이다 | episodic memory 행과 짝을 이룬다. "작업 기억"은 attention budget 설명 등 인지과학 비유로 이미 쓰이고 있어 기계 검사에서 뺐다. 지침만 (2026-09 등재, ReAcTree) |
| orchestration | 오케스트레이션 | — | 오케스트레이션은 여러 에이전트·도구의 실행을 조율하는 층이다 | 음차 정착 |
| handoff | handoff | — | handoff는 한 에이전트가 작업을 다른 에이전트로 넘기는 전환점이다 | "인계"는 일반어라 지침만 |
| guardrail | 가드레일 | — | 가드레일은 에이전트의 행동 범위를 제한하는 안전 장치다 | 음차 정착 |
| prompt | 프롬프트 | — | — | 음차 정착(69회) |
| context | 컨텍스트 | — | — | 음차 정착(73회). "맥락"은 일반 서술에서 허용 |
| context engineering | context engineering | 컨텍스트 엔지니어링 | context engineering은 유한한 attention budget에 넣을 토큰을 고르는 설계다 | 고유 기법명이라 원어. 2026-09 3차 갱신에서 금지 표기를 "컨텍스트 엔지니어링 공학"에서 줄여 음차 단독형도 잡는다 |
| compaction | compaction | 컴팩션 | compaction은 길어진 대화 이력을 요약으로 접어 context 한계 안에서 세션을 이어가는 처리다 | 2026-09 등재 (원어 53회 대 음차 0회). "컨텍스트 압축" 같은 일반 서술은 허용 (지침) |
| harness | harness | 하네스 | harness는 모델을 감싸 도구·검증·상태를 제공하는 실행 환경이다 | "마구" 비유 인용은 그대로 두고 lint-ignore. 2026-09 3차 갱신에서 음차를 금지 표기에 넣었다 (원어 482회 대 하네스 61회) |
| sandbox | 샌드박스 | — | 샌드박스는 에이전트가 실행하는 코드와 명령을 호스트와 격리된 환경 안에 가두는 실행 공간이다 | 음차 canonical. 3차 보류분을 재계량한 결과 샌드박스 57회 대 원어 40회로 음차가 앞서 음차로 고정한다. 원어 잔존은 지침으로 정리하고 기계 검사는 두지 않는다. 2026-09 4차 갱신 등재 |
| provider | provider | 프로바이더 | provider는 모델 API를 제공하는 회사나 서비스 단위를 말한다 | 일반 서술 "제공자"와 "공급자"는 허용한다. inference provider도 원어를 권장하며 "추론 제공자"는 쓰지 않는다 (지침). cheahjs와 zhulinsen 두 stem에 집중돼 있다. 2026-09 4차 갱신 등재 (원어 298회 대 음차 76회) |
| agent loop | agent loop | — | agent loop는 모델 호출→도구 실행→관찰을 반복하는 기본 순환이다 | |
| workflow | 워크플로 | 워크플로우 | — | 표기 흔들림(워크플로 150 vs 워크플로우 114)을 워크플로로 고정 |
| sub-agent | 서브에이전트 | 하위 에이전트 | 서브에이전트는 상위 에이전트가 위임한 작업을 격리된 컨텍스트에서 수행한다 | 4차 재계량에서 서브에이전트 267회 대 원어 20회로 canonical이 정착했다. 남은 원어는 Osmani의 구성 요소명 Sub-agents, 저장소명 awesome-claude-code-subagents, gbrain의 durable subagent 기능명 같은 고유명이라 금지 표기에 넣지 않는다 (2026-09 4차 갱신 보강) |
| multi-agent | 멀티에이전트 | 멀티 에이전트 | — | "다중 에이전트"는 지침만. 2026-09 3차 갱신에서 띄어쓰기 변형을 금지 표기에 넣었다 (5회) |
| chain-of-thought | chain-of-thought | 사고 사슬·생각의 사슬 | chain-of-thought는 답 전에 중간 추론을 텍스트로 펼치게 하는 기법이다 | 약어 CoT 병용 가능 |
| reasoning | 추론 | 리즈닝 | — | 표준 번역 정착. reasoning trace 같은 복합어는 원어로 쓴다 (glossary-llms의 reasoning trace 행. 2026-09 4차 갱신 보강) |
| counterfactual | 반사실 | — | 반사실(counterfactual)은 실제로 일어난 것과 다른 조건을 가정하고 그 결과를 추론하는 사고 방식이다 | 번역어 canonical. 문서당 첫 등장 시 원어를 괄호 병기하고 이후 한 표기만 쓴다. 국내 학술 표기로 정착했고 원어 금지 시 physical-ai 4파일이 rework라 번역어를 택했다. 원어 12회는 지침으로 정리한다. 2026-09 4차 갱신 등재 (원어 12회 대 반사실 13회) |
| retrieval | retrieval | — | retrieval은 외부 지식에서 관련 정보를 찾아오는 단계다 | RAG 문맥의 "검색"은 허용 (지침) |
| reranking | reranking | 재순위·재정렬 | reranking은 1차 검색이 뽑은 후보를 정밀 모델로 다시 정렬하는 단계다 | 한글 표기가 재순위와 재정렬로 갈려 있었다. 2026-09 3차 갱신 등재 (원어 97회 대 직역 17회). reranker도 원어 |
| hybrid search | hybrid search | 하이브리드 검색 | hybrid search는 키워드 기반 검색과 벡터 유사도 검색의 결과를 합쳐 쓰는 retrieval 방식이다 | 반쪽 번역이라 원어로 고정한다. hybrid retrieval도 원어. 2026-09 4차 갱신 등재 (원어 88회 대 직역 25회) |
| vector database | vector database | 벡터 데이터베이스·벡터 DB | vector database는 임베딩 벡터를 저장하고 유사도 기준으로 검색하는 데이터베이스다 | 영문 약칭 vector DB는 허용한다. 2026-09 4차 갱신 등재 (원어 97회 대 직역 34회) |
| chunk / chunking | chunk / chunking | 청크·청킹 | chunk는 문서를 retrieval 단위로 잘라 낸 조각이고, chunking은 그렇게 자르는 처리다 | 파일럿 1-3부터 7개 배치가 올린 후보. "분할"은 3차에서 일반어로 기각했다. glossary-physical-ai의 action chunking 계열 행(행동 청킹, 행동 청크)과 별개 문맥이며 physical-ai 파일에서는 두 용어집이 함께 경고할 수 있다. 스트리밍 chunk(SSE)도 같은 원어라 chunk로 쓴다. 2026-09 4차 갱신 등재 (원어 921회 대 음차 120회) |
| indexing / index | 인덱싱 / 인덱스 | 색인 | 인덱싱은 문서를 검색 가능한 구조로 미리 정리해 두는 처리이고, 인덱스는 그 결과 구조다 | 음차 canonical. 인덱스가 원어 대비 3.5대 1로 정착해 인덱싱도 음차로 통일한다. 재색인 같은 파생형도 재인덱싱으로 쓴다. "top-k 검색인 반면" 꼴 오탐은 `lint_terms.py`의 SUBSTRING_EXCEPTIONS("검색인")로 걸러 낸다. 3차 보류분. 2026-09 4차 갱신 등재 (인덱싱 223회, 인덱스 473회 대 색인 166회) |
| query | 질의 | 쿼리 | 질의(query)는 retrieval 시스템에 넘기는 검색 요청 문장이나 벡터다 | 번역어 canonical. 문서당 첫 등장 시 원어를 괄호 병기하고 이후 질의만 쓴다. 원어 query와의 문서 내 혼용은 lint가 잡지 않으므로 작성 시 자체 검토한다. 질의응답(QA)은 별개 개념이라 영향이 없다. 3차 이관분. 2026-09 4차 갱신 등재 (질의 1,071회, 원어 435회 대 쿼리 203회) |
| top-k | top-k | 상위 k·상위 K | top-k는 점수 순으로 정렬한 후보 중 앞에서 k개만 남기는 선택 방식이다 | 반쪽 번역이라 원어로 고정한다. 2026-09 4차 갱신 등재 (원어 58회 대 직역 17회) |
| multi-hop | multi-hop | 다중 홉·멀티홉 | multi-hop은 답을 얻기 위해 여러 문서나 관계를 차례로 거쳐야 하는 질의 유형이다 | 두 한글 표기가 파일별로 갈려 있었다. 2026-09 4차 갱신 등재 (원어 68회 대 직역 30회) |
| entity | entity | 엔티티 | entity는 knowledge graph에서 노드가 되는 사람, 조직, 개념 같은 개별 대상이다 | 4차 등재 행 중 위반이 가장 크다. zep, graphiti, rag-anything에 집중돼 있다. 일반 서술 "개체"는 허용한다. 2026-09 4차 갱신 등재 (원어 551회 대 음차 172회) |
| knowledge graph | knowledge graph | — | knowledge graph는 entity를 노드로, 관계를 edge로 적은 그래프 형태의 지식 표현이다 | "지식 그래프"는 표준 번역으로 병용 허용하되 한 문서에서는 하나만 쓴다. 붙여 쓴 "지식그래프"는 쓰지 않는다. 3차 보류분. 지침만. 2026-09 4차 갱신 등재 (원어 231회 대 번역어 164회) |
| community (GraphRAG) | community | 커뮤니티 감지·커뮤니티 탐지·커뮤니티 요약 | GraphRAG의 community는 그래프에서 서로 촘촘히 연결된 entity 묶음이다 | community detection, community report, community summary 모두 원어. 단독 "커뮤니티"는 오픈소스 커뮤니티 같은 일반어라 복합어만 금지한다. "한국 커뮤니티가 쓴 요약"처럼 사람 집단을 뜻하면 "한국 커뮤니티의 요약"으로 풀어 금지 표기를 피한다. 2026-09 4차 갱신 등재 (원어 394회 대 직역 26회) |
| GraphRAG | GraphRAG | — | GraphRAG는 Microsoft가 공개한 그래프 기반 RAG 시스템의 고유명이다 | 시스템 고유명은 GraphRAG로 붙여 쓴다. 범주를 가리킬 때는 graph-based RAG를 쓰고 "그래프 기반 RAG"는 범주 서술로 허용한다. 띄어 쓴 "Graph RAG"는 원문 제목 인용이 섞여 있어 금지하지 않는다. 지침만. 2026-09 4차 갱신 등재 (GraphRAG 347회, Graph RAG 51회, graph-based RAG 11회) |
| vectorless RAG | vectorless RAG | 벡터리스 | vectorless RAG는 임베딩 벡터 검색 없이 문서 구조와 모델의 추론으로 근거를 찾는 RAG 방식이다 | D3 재작성 중 실제 혼용을 겪은 용어. 2026-09 4차 갱신 등재 (원어 81회 대 음차 2회) |
| grounding | grounding | 접지 | grounding은 모델 출력을 외부 근거나 물리 세계에 붙들어 매는 것이다 | |
| hallucination | 환각 | 할루시네이션 | — | 표준 번역 정착(29회). CLAUDE.md 관례와 일치 |
| eval | eval | 이밸 | eval은 에이전트나 모델의 출력을 정해진 기준으로 채점하는 평가 항목 하나 또는 그 묶음이다 | 일반 서술 "평가"는 허용한다. kim-2026 한 편이 "이밸"로 소개한 음차다. 2026-09 4차 갱신 등재 (원어 235회 대 음차 4회) |
| LLM-as-a-Judge | LLM-as-a-Judge | LLM 평가자·LM 심판·LLM-as-judge·LLM-as-a-judge | LLM-as-a-Judge는 사람 대신 LLM이 다른 모델의 출력을 채점하게 하는 평가 방식이다 | 철자는 원 논문(Zheng 2023) 표기로 고정한다. 영문 변형 LLM-as-judge와 LLM-as-a-judge는 금지 표기로 두며 lint가 대소문자를 구분하므로 canonical은 걸리지 않는다. "LM 심판"은 LLM 심판과 VLM 심판을 부분 문자열로 함께 잡는다. VLM-as-a-Judge와 LM judge도 같은 표기 규칙을 따른다. 2026-09 4차 갱신 등재 (LLM-as-a-Judge 24회 대 영문 변형 40회, 한글 직역 10회) |
| scaffold | scaffold | 발판 구조 | scaffold는 모델 주위에 짜 놓은 보조 실행 구조를 뜻한다 | |
| skill | 스킬 | 스킬 라이브러리·스킬 팩 | 스킬은 특정 작업 절차를 담아 에이전트에 결합하는 지침 패키지다 | 음차 정착. 파일명·포맷명(Agent Skills)은 원어 그대로. 단독 skill만 스킬로 쓰고 skill library, skill pack, skill composition, skill sequence 같은 복합어는 원어로 쓴다. skill pack은 띄어 쓰고 원문 인용의 skillpack은 그대로 둔다. 2026-09 4차 갱신에서 복합어 금지 표기를 채웠다 (skill library 80회 대 스킬 라이브러리 12회, skill pack 31회 대 스킬 팩 15회) |
| slash command | 슬래시 커맨드 | 슬래시 명령 | 슬래시 커맨드는 채팅 입력창에서 슬래시로 시작하는 짧은 명령으로 정해진 동작을 부르는 인터페이스다 | 음차 canonical. 원어를 쓰는 파일이 없고 슬래시 커맨드 70회 대 슬래시 명령어 36회로 다수 표기를 따른다. 금지 표기 "슬래시 명령"은 "슬래시 명령어"를 부분 문자열로 품어 둘 다 잡는다. A6 배치가 gstack에 적용한 명령어 표기를 되돌린다. 2026-09 4차 갱신 등재 |
| instruction file | 지시 파일 | 지시문 파일·지침 파일 | 지시 파일(instruction file)은 AGENTS.md나 CLAUDE.md처럼 에이전트가 작업을 시작할 때 읽는 진입 지시를 담은 파일이다 | 번역어 canonical. 원어가 0건이라 다수 표기 지시 파일로 고정한다. glossary-physical-ai의 instruction(지시문) 행은 로봇 과제 지시문을 가리키며 이 행과 별개다. 2026-09 4차 갱신 등재 (지시 파일 30회 대 지시문 파일 9회, 지침 파일 5회) |
| hook | 훅 | — | 훅은 특정 이벤트 시점에 끼어들어 실행되는 사용자 정의 코드다 | 음차 정착 |
| artifact | artifact | 아티팩트 | artifact는 에이전트가 작업 과정에서 만들어 남기는 파일, 문서, 코드 같은 산출 단위다 | 일반 서술 "산출물"은 허용한다. 2026-09 4차 갱신 등재 (원어 81회 대 음차 21회) |
| worktree | worktree | 작업 트리·워크트리 | worktree는 하나의 git 저장소에서 브랜치별로 따로 체크아웃해 둔 작업 디렉토리다 | 워크트리는 0건이지만 음차 재발 방지용으로 함께 넣는다. 2026-09 4차 갱신 등재 (원어 95회 대 직역 6회) |
| primitive (소프트웨어) | primitive | 프리미티브 | 소프트웨어 문맥의 primitive는 더 작은 단위로 나누지 않고 조합의 재료로 쓰는 기본 구성 요소다 | glossary-physical-ai의 primitive 행(motion primitive)은 applies_to 밖이라 agents와 llms 파일을 구속하지 않으므로 별도 행을 둔다. 2026-09 4차 갱신 등재 (원어 216회 대 음차 4회) |
| design token | design token | 디자인 토큰 | design token은 색, 간격, 글꼴 크기 같은 디자인 값에 이름을 붙여 코드와 디자인 도구가 공유하는 단위다 | "토큰"으로 줄이지 않는다. LLM 토큰과 같은 문서에 있으면 design token 전체 표기를 쓴다. 두 커버 페이지의 규약이 갈렸던 것(hall은 원어, google-labs는 줄임)을 원어로 고정한다. 2026-09 4차 갱신 등재 (원어 27회 대 직역 1회) |
| verification | verification | — | verification은 에이전트 산출물을 자동으로 검사하는 단계다 | "검증"은 표준 번역이라 병용 허용 (지침) |
| verifier | verifier | — | verifier는 에이전트 산출물이 기준을 통과했는지 판정하는 자동 검사 구성 요소다 | verifier gate도 원어. verification 행이 "검증" 병용을 허용하는 것과 같은 계열이라 지침만 둔다. "검증자"는 사람 검증자와 겹친다. 2026-09 4차 갱신 등재 (원어 69회 대 검증기 6회, 검증자 9회, 검증 게이트 13회) |
| delegation | delegation | — | delegation은 작업을 서브에이전트에 맡기는 패턴이다 | "위임"은 병용 허용 (지침) |
| provenance | provenance | — | provenance는 어떤 정보가 어느 원본에서 어떤 경로로 왔는지를 되짚을 수 있게 남긴 출처 계보다 | 일반 서술 "출처"와 "계보"는 허용한다. "출처 추적"은 기계 검사 없이 원어를 권장한다. 네 배치(A2, A9, B5, E2)가 올렸다. 2026-09 4차 갱신 등재 (원어 66회 대 직역 13회) |
| audit trail | 감사 추적 | — | 감사 추적(audit trail)은 누가 언제 무엇을 했는지 되짚을 수 있게 남긴 기록 흐름이다 | 번역어 canonical. 첫 등장 시 원어 병기. audit log는 별개 개념이며 "감사 로그"로 쓴다. A12 실측(9대 9) 이후 배치에서 번역어로 기울었다. 2026-09 4차 갱신 등재 (감사 추적 22회 대 원어 6회) |
| progressive disclosure | progressive disclosure | 점진적 공개 | progressive disclosure는 필요한 시점에만 정보를 단계적으로 노출하는 설계다 | |
| trajectory | trajectory | — | agent 문맥의 trajectory는 세션 하나의 실행 기록 전체다 | physical-ai 용어집과 달리 이 도메인은 일반어 "궤적"(진화 궤적 등)이 있어 지침만. 4차 재계량에서도 잔존 "궤적" 21회가 입자 궤적, 공의 궤적 같은 일반어라 지침을 유지한다. 개별 이벤트 열은 trace 행 |
| trace | trace | 트레이스 | trace는 에이전트 실행 중 일어난 모델 호출과 tool call 같은 개별 이벤트를 시간순으로 기록한 열이다 | trajectory가 세션 단위 실행 기록 전체라면 trace는 그 안의 개별 이벤트 열이다. tracing도 원어를 권장하되 "트레이싱"은 레이트레이싱과 부분 문자열로 충돌해 금지 표기에서 뺐다. 2026-09 4차 갱신 등재 (원어 272회 대 음차 10회) |
| telemetry | 텔레메트리 | — | 텔레메트리는 실행 중인 시스템이 자동으로 내보내는 지표, 로그, trace 같은 관측 데이터다 | 음차 canonical. 원어 51회 중 산문은 7회뿐이고 나머지는 코드 식별자와 URL이라 음차로 고정한다. 2026-09 4차 갱신 등재 (텔레메트리 48회 대 원어 산문 7회) |
| loop engineering | loop engineering | 루프 엔지니어링 공학 | loop engineering은 에이전트를 실행하는 루프 자체를 설계 대상으로 삼는 관점이다 | 고유 기법명 |
| compounding | compounding | 복리 | compounding은 에이전트나 wiki가 만든 결과가 다음 작업의 입력이 되어 효과가 시간이 갈수록 누적되는 성질이다 | 원어 canonical. CLAUDE.md 문체 가이드가 "복리로 쌓인다"를 피할 어휘로 지목하므로 금지 표기 등재가 가이드와 일치한다. glossary-physical-ai의 compounding error 행은 오차 누적을 가리키는 별개 개념이다. "누적되는 메모리" 같은 일반 서술은 허용한다. 2026-09 4차 갱신 등재 (원어 36회 대 직역 20회) |
| software factory | software factory | 소프트웨어 팩토리 | software factory는 반복 가능한 파이프라인으로 소프트웨어를 규격에 맞춰 생산하는 체계다 | gstack 클러스터(4편과 overview 1편) 고유 용어. 확산 전에 원어로 고정한다. 2026-09 4차 갱신 등재 (원어 13회 대 음차 10회) |
| comprehension debt | comprehension debt | 이해 부채 | comprehension debt는 배포된 시스템과 개발자의 이해 사이에 벌어지는 격차가 검토 없이 누적되는 부담이다 | Osmani의 용어라 원저자 표기를 따르고 kang의 번역어는 해설로 본다. 2026-09 4차 갱신 등재 (원어 10회 대 직역 7회) |
| vault | vault | 볼트 | vault는 에이전트와 사람이 같이 읽고 쓰는 Markdown 파일 폴더를 뜻한다 | 영문 174회 대 "볼트" 19회로 영문이 우세해 vault로 고정. Obsidian 원문 절 제목 인용은 lint-ignore |
| local-first | local-first | 로컬-퍼스트·로컬 퍼스트 | local-first는 데이터 원본을 사용자 디스크에 두고 서버 없이 실행되는 설계다 | 표기 흔들림(영문 10회 대 로컬-퍼스트 4회)을 영문으로 고정 |
| orphan page | 고아 페이지 | — | 고아 페이지(orphan page)는 다른 어느 페이지에서도 링크되지 않아 그래프에서 고립된 wiki 페이지다 | 번역어 canonical. 첫 등장 시 원어 병기. Karpathy LLM Wiki 패턴의 용어를 옮긴 자연스러운 번역이고 lint 오탐 위험이 없다. 원어 8회는 지침으로 정리한다. 2026-09 4차 갱신 등재 (원어 8회 대 번역어 13회) |
| source of truth | 진실의 원천 | 진실 원천·진실 공급원 | 진실의 원천(source of truth)은 여러 사본이 어긋날 때 무엇이 맞는지를 정하는 기준 데이터다 | 번역어 canonical이며 CLAUDE.md의 병기 관례를 따른다. 첫 등장 시 원어 병기. 약어 SSOT는 그대로 쓴다. "단일 진실 원천"과 "단일 진실 공급원" 같은 변형도 금지 표기가 잡는다. "진실의 원천"은 "진실 원천"을 부분 문자열로 품지 않아 canonical이 걸리지 않는다. 2026-09 4차 갱신 등재 (원어 33회, 진실의 원천 12회 대 변형 16회) |
| manifest | 매니페스트 | — | 매니페스트는 패키지나 산출물에 무엇이 들었는지를 적어 둔 목록 파일이다 | 음차 canonical. 원어를 금지하면 `manifest.json` 같은 산문 언급을 오탐하므로 지침만 둔다. 2026-09 4차 갱신 등재 (매니페스트 53회 대 원어 19회) |
| ontology | ontology | 온톨로지 | ontology는 도메인의 개체 종류와 관계 타입을 고정된 집합으로 정의한 구조다 | physical-ai의 물리 상식 분류(Cosmos-Reason1)도 같은 개념이라 원어로 통일한다. 2026-09 applies_to 전 카테고리 확장 시 음차 13건을 정리했다 |
| taxonomy | taxonomy | — | taxonomy는 논문이나 서베이가 대상을 분류하기 위해 세운 계층적 분류 틀이다 | 논문 자체의 taxonomy를 가리킬 때 원어를 권장한다. "분류 체계"는 일반 서술로도 쓰여 기계 검사 없이 지침만 둔다. 2026-09 4차 갱신 등재 (원어 83회 대 분류 체계 18회, 분류체계 17회) |
| distractor | distractor | 교란 도구·방해 도구 | distractor는 task에 함께 노출되지만 풀이에는 필요 없는 도구다 | tool use 평가 문헌의 공통 용어. physical-ai의 시각 distractor와 표기가 같다 (Bandi 2026) |
| claim | claim | — | claim은 정답이라면 최종 답에 담겨 있어야 하는 원자적 사실 진술이다 | "주장"은 일반어라 오탐이 커서 지침만. 채점 단위 문맥에서는 원어 권장 (Bandi 2026) |
| coverage | coverage | — | coverage는 task의 claim 점수를 평균낸 값이다 | "커버리지"는 테스트·개념 커버리지 등 다른 문맥에 이미 쓰여 지침만. claim 채점 문맥에서는 원어 (Bandi 2026). li-2026의 retrieval coverage(검색 결과가 필요한 근거를 얼마나 덮었는지)도 같은 원어를 쓴다 (2026-09 4차 갱신 보강) |
| seam | seam | — | seam은 그 자리를 편집하지 않고 동작을 바꿀 수 있는 위치다 | Michael Feathers의 용어로, 모듈의 interface가 놓이는 자리이자 테스트가 놓이는 자리를 가리킨다. "이음새"는 동작의 매끄러움을 뜻하는 일반어 용법이 있어 지침만. 2026-09 등재 (원어 49회 대 기술 용어로 쓴 직역 0회, mattpocock/skills 2026) |

## 신규 용어 추가 절차

[[overviews/glossary-physical-ai]]의 동일 절차를 따른다 — 본문은 원어 + 풀이로 즉시 작성, Step 3.5에서 추가 후보 보고, 승인 후 표에 행 추가.

## 관련 페이지

- [[overviews/glossary-llms]] — 모델 학습 일반 용어. agents 페이지에도 함께 적용된다
- [[overviews/glossary-physical-ai]] — physical-ai 도메인 용어
