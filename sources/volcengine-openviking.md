---
title: "OpenViking: The Context Database for AI Agents"
type: repo
year: 2026
category: database
raw_path: raw/repos/volcengine-openviking.md
raw_filename: "volcengine-openviking.md"
source_collection: external
org: "volcengine"
repo: "OpenViking"
url: "https://github.com/volcengine/OpenViking"
license: "AGPL-3.0 (main project); Apache-2.0 (crates/ov_cli, examples); third_party는 각자 원 라이선스"
tags: [context-database, agent-memory, virtual-filesystem, directory-retrieval, vector-database, mcp, rag]
figures:
  - id: fig01
    label: Benchmark results chart
    kind: figure
    file: assets/volcengine-openviking/fig01.svg
    raw: https://raw.githubusercontent.com/volcengine/OpenViking/main/docs/images/benchmark-light.svg
    caption: "LoCoMo와 tau2-bench 벤치마크 결과. OpenClaw, Hermes, Claude Code의 native memory 대비 OpenViking 적용 시 정확도가 24~57%에서 80~83%로 상승했다"
    strategy: manual
    curated: true
  - id: fig02
    label: OpenViking Studio screenshot
    kind: figure
    file: assets/volcengine-openviking/fig02.png
    raw: https://raw.githubusercontent.com/volcengine/OpenViking/main/docs/images/studio-playground.png
    caption: "OpenViking Studio의 viking:// 브라우징과 semantic search UI"
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

OpenViking은 AI 에이전트의 지식, 기억, 스킬을 `viking://`이라는 하나의 virtual filesystem으로 통합하고, 디렉터리 단위의 계층적 로딩과 directory recursive retrieval로 세션 간 컨텍스트를 재사용하게 하는 오픈소스 context database다.

## 1. 자료 정보 (Document Information)

- **저장소**: `volcengine/OpenViking` (https://github.com/volcengine/OpenViking), ByteDance 산하 Volcengine(火山引擎)이 공개했다.
- **공식 문서**: `docs.openviking.ai`. 이 source는 문서 사이트의 Getting Started > Introduction 페이지(`docs.openviking.ai/en/getting-started/01-introduction`)를 README와 함께 근거로 쓴다. Architecture, Context Types, Retrieval 같은 심화 concepts 페이지는 이번 수집 범위에 없다.
- **라이선스**: 컴포넌트별로 다르다. 메인 프로젝트는 AGPLv3, `crates/ov_cli`와 `examples`는 Apache-2.0, `third_party`는 각 원 라이선스를 따른다. README 하단 Introduction 페이지는 자신을 "Released under the Apache-2.0 License"로 표기하는데, 이는 문서 사이트 자체의 라이선스이고 코드 저장소의 라이선스와는 별개다.
- **버전과 평가 시점**: 벤치마크는 OpenViking 0.3.22 기준이다.
- **진입점**: PyPI 패키지 `openviking`(CLI `ov`, 서버 `openviking-server`), Python/Go/TypeScript SDK, HTTP API, 그리고 브라우저에서 바로 써 보는 Studio(`openviking.ai/studio`).
- **연구 기반**: README의 Research 절이 논문 세 편을 직접 인용한다. VikingMem(메모리), Directory-Aware Query and Maintenance in Vector Databases(retrieval), VikingRAG(RAG)로, 세 논문이 각각 이 저장소의 메모리, retrieval, RAG 메커니즘의 이론적 근거라고 밝힌다.

## 2. 주요 기여 (Key Contributions)

1. **`viking://` virtual filesystem으로 컨텍스트 종류를 통합.** Resource(문서, 코드, 웹 페이지 같은 지식), Memory(사용자 선호와 경험), Skill(과제 수행 방법)을 모두 같은 파일시스템 아래 배치하고, 각 항목에 고유한 `viking://` URI를 부여한다. 에이전트는 `ls`, `tree`, `read`, `write`, `find`, `grep` 같은 익숙한 파일시스템 명령으로 이 컨텍스트를 다룬다.
2. **L0/L1/L2 3단 계층적 로딩.** 디렉터리마다 L0(Abstract, 최대 256자 한 문장 요약)와 L1(Overview, 최대 4,000자 개요)을 자동으로 만들어 두고, 실제 필요할 때만 L2(Detail, 원문 전체)를 읽는다. 컨텍스트를 한꺼번에 프롬프트에 넣지 않고 필요한 만큼만 불러오는 구조다.
3. **directory recursive retrieval.** vector 검색으로 후보 디렉터리를 먼저 좁히고, 그 안에서 다시 세부 검색을 반복하며 하위 디렉터리로 재귀적으로 내려가는 5단계 retrieval 전략을 구현했다. README는 이 메커니즘의 형식적 근거가 "Directory-Aware Query and Maintenance in Vector Databases" 논문이고, 그 논문이 제안한 TrieHI를 OpenViking이 directory scope 해석에 통합했다고 밝힌다.
4. **세션을 메모리로 자동 전환.** 세션을 commit하면 대화가 아카이브되고 백그라운드에서 메모리 추출이 시작된다. memory policy가 무엇을 남길지 정하고, 추출된 후보는 기존 메모리와 비교해 생성, 병합, 스킵 중 하나로 처리된다.
5. **타입이 있는 메모리 카탈로그.** 기본 제공 메모리 타입을 사용자/환경 이해(`profile`, `preferences`, `entities`, `events`), 에이전트 정체성(`identity`, `soul`), 과제 수행과 학습(`cases`, `trajectories`, `experiences`, `tools`, `skills`) 세 묶음으로 나눠 제공하고, 애플리케이션이 이를 확장하거나 조정할 수 있게 열어 둔다.
6. **LoCoMo와 tau2-bench 정량 평가.** OpenClaw, Hermes, Claude Code라는 서로 다른 에이전트 통합에 OpenViking을 적용해 장기 대화 메모리(LoCoMo)와 멀티턴 에이전트 과제(tau2-bench) 양쪽에서 native memory 대비 향상을 측정했다.
7. **넓은 에이전트 통합 생태계.** Claude, Codex, Cursor, TRAE는 Hooks와 MCP로, OpenClaw는 context engine으로, Hermes는 내장으로, OpenCode, pi, DeerFlow, DSH, Doubao Work, LangChain은 각자의 플러그인이나 커넥터로 연결한다. 그 위에 VikingBot이라는 자체 에이전트 프레임워크도 함께 제공한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 `viking://` 파일시스템 구조

OpenViking은 모든 컨텍스트를 단일 트리로 조직한다. README와 Introduction 페이지가 함께 제시하는 구조는 다음과 같다.

```
viking://
├── resources/              # 프로젝트 문서, 코드 저장소, 웹 페이지 등
│   └── my_project/
│       ├── docs/
│       └── src/
├── user/
│   └── {user_id}/
│       ├── memories/       # 사용자별 메모리
│       ├── resources/      # 사용자별 비공개 resource
│       ├── skills/         # 사용자별 비공개 skill (기본값)
│       ├── peers/          # 다른 사용자 또는 에이전트와의 관계
│       └── sessions/
└── agent/
    └── skills/             # 계정 전체가 공유하는 skill (선택)
```

세 가지 context type은 목적과 lifecycle이 다르다.

| type | 목적 | lifecycle |
|---|---|---|
| Resource | 문서, 코드, FAQ 같은 지식과 규칙 | 장기적이고 비교적 정적 |
| Memory | 사용자 선호, 학습된 경험 같은 에이전트의 인지 | 장기적이고 계속 갱신됨 |
| Skill | 도구, MCP 같은 호출 가능한 능력 | 장기적이고 정적 |

에이전트는 이 트리를 Unix 스타일 API로 다룬다. `client.find(query=...)`는 semantic search를, `client.ls(uri=...)`는 디렉터리 목록을, `client.read(uri=...)`는 본문 읽기를, `client.abstract`와 `client.overview`는 각각 L0와 L1을 가져온다.

### 3.2 L0/L1/L2 계층적 컨텍스트 로딩

거대한 컨텍스트를 한꺼번에 프롬프트에 넣으면 비용이 늘고 모델의 context window를 넘길 위험도 커진다. OpenViking은 컨텍스트를 수집(ingestion)하는 시점에 세 단계로 자동 가공한다.

| 층 | 이름 | 기본 길이 상한 | 용도 |
|---|---|---|---|
| L0 | Abstract | 256자 | vector 검색과 빠른 관련성 판단 |
| L1 | Overview | 4,000자 | rerank와 콘텐츠 탐색 |
| L2 | Detail | 상한 없음 | 필요할 때만 읽는 원문 전체 |

```
viking://resources/my_project/
├── .abstract.md               # L0
├── .overview.md               # L1
├── docs/
│   ├── .abstract.md
│   ├── .overview.md
│   └── api.md                 # L2
└── src/
```

L0와 L1은 파일 단위가 아니라 디렉터리 단위 사이드카(sidecar)로 붙는다는 점이 중요하다. 즉 의미적으로 처리된 디렉터리에만 `.abstract.md`와 `.overview.md`가 생기고, 둘이 항상 함께 있다는 보장도 없다. 에이전트는 L0만 보고 관련 없는 디렉터리를 먼저 걸러낸 뒤, L1로 구조와 핵심을 파악하고, 정말 필요할 때만 L2 원문을 읽는다.

### 3.3 directory recursive retrieval

단일 vector 검색은 복잡한 질의 의도를 한 번에 충족시키기 어렵다. OpenViking은 이를 5단계 절차로 나눈다.

1. **의도 분석**: 질의를 분석해 여러 개의 검색 조건을 생성한다.
2. **초기 위치 결정**: vector 검색으로 점수가 높은 후보 디렉터리를 빠르게 찾는다.
3. **세부 탐색**: 그 디렉터리 안에서 2차 검색을 수행해 후보 집합을 갱신한다.
4. **재귀적 하강**: 하위 디렉터리가 있으면 2차 검색을 재귀적으로 반복한다.
5. **결과 집계**: 가장 관련 있는 컨텍스트를 모아 반환한다.

README는 이 전략을 "먼저 점수가 높은 디렉터리에 자리 잡은 뒤 내용을 자세히 탐색한다"고 요약하고, 그 결과 의미적으로 맞는 조각을 찾는 데 그치지 않고 정보의 전체 맥락까지 파악할 수 있다고 설명한다. CLI 차원에서는 이 구분이 두 명령으로 드러난다. `find`는 질의 하나를 그대로 실행하고, `search`는 세션 컨텍스트를 함께 반영해 retrieval 계획을 세울 수 있다.

이 retrieval 설계의 형식적 근거는 별도 논문("Directory-Aware Query and Maintenance in Vector Databases")이다. 그 논문은 디렉터리 범위(scope)에 한정한 질의와 유지보수 연산을 정의하고, vector ranking 이전에 디렉터리 범위를 해석하는 TrieHI를 제안한다. OpenViking은 이 TrieHI를 통합해 파일시스템 패러다임과 retrieval을 연결한다고 밝힌다.

### 3.4 검색 추적(retrieval trace)의 시각화

OpenViking의 조직 방식 자체가 계층적 virtual filesystem이고 모든 컨텍스트가 고유 URI를 갖기 때문에, 전통적인 flat 구조의 블랙박스 검색과 다르게 검색 과정을 그대로 남길 수 있다. retrieval마다 어떤 디렉터리를 거쳐 어떤 파일에 도달했는지 전체 추적(trace)이 보존되어, 문제의 원인을 명확히 관찰하고 retrieval 로직을 개선하는 데 쓸 수 있다.

### 3.5 세션과 메모리 자기 반복(self-iteration)

OpenViking은 메모리 자기 반복 루프를 내장한다. 세션이 commit되면 시스템은 비동기로 과제 결과와 사용자 피드백을 분석한 뒤, 활성화된 memory policy에 따라 현재 사용자 또는 peer의 메모리를 갱신한다. 추출된 메모리 후보는 기존 메모리와 비교되어 생성, 병합, 스킵 중 하나로 처리된다.

VikingBot이 활성화되어 있으면 `ov compile` 명령이 skill을 활용해 원본 자료를 wiki, knowledge graph, report 중 하나로 정리해 준다.

기본 제공 메모리 타입은 목적별로 세 묶음이다.

| 목적 | 기본 제공 타입 | 설명 |
|---|---|---|
| 사용자와 환경 이해 | `profile`, `preferences`, `entities`, `events` | 사용자 프로필, 선호, 개체, 사건 |
| 에이전트 정체성과 연속성 | `identity`, `soul` | 에이전트의 정체성, 경계, 스타일, 연속성 |
| 과제 수행과 학습 | `cases`, `trajectories`, `experiences`, `tools`, `skills` | 학습 가능한 사례, 실행 trajectory, 재사용 가능한 경험, 도구와 skill 사용 지식 |

애플리케이션은 이 타입 집합을 자신의 필요에 맞게 확장하거나 조정할 수 있다. Introduction 페이지는 이 루프의 목표를 "세계와 상호작용하며 쓸수록 똑똑해지는 에이전트"의 자기 진화로 표현한다.

### 3.6 사용법

Quick start는 Python 3.10 이상과 embedding 모델, VLM 접근을 요구한다.

```bash
pip install openviking --upgrade
openviking-server init      # provider와 모델 설정
openviking-server doctor    # 설정과 연결 확인
openviking-server           # 서버 시작
```

`init`은 `~/.openviking/ov.conf`를 만들고, Volcengine, OpenAI, Codex OAuth, Kimi, GLM, 로컬 Ollama를 provider로 지원한다. CLI `ov`는 저장소를 resource로 가져와 검색하는 예시를 다음과 같이 제시한다.

```bash
ov status
ov add-resource https://github.com/volcengine/OpenViking
ov task status TASK_ID
ov ls viking://resources/
ov tree viking://resources/volcengine -L 2
ov find "what is openviking"
ov grep "openviking" --uri viking://resources/volcengine/OpenViking/docs/en
```

Python, Go, TypeScript SDK와 HTTP API로 직접 통합을 만들 수도 있다.

### 3.7 배포와 운영

오픈소스 서버는 자체 환경에 AGPLv3로 배포할 수 있고 활성화 키가 필요 없다. 서버는 계정과 사용자 격리(multi-tenant), 선택적 resource ACL을 지원하며, localhost 밖에 노출하기 전에는 인증 설정이 권장된다.

상용 에디션은 두 가지다. Managed SaaS는 Volcano Engine이 직접 호스팅하며 개인/기업 플랜과 오픈소스 배포 마이그레이션 도구를 제공하고, 중국 밖 호스팅은 BytePlus에서 계획 중이다. Self-Managed는 자체 클라우드 계정(VPC, BYOC)이나 오프라인 환경에 배포하는 방식으로, 분산 배포와 공식 지원이 추가되며 라이선스 키로 활성화한다.

VikingBot은 OpenViking 위에 지은 에이전트 프레임워크로, `pip install "openviking[bot]"` 후 `openviking-server --with-bot`으로 함께 띄우고 `ov chat`으로 대화할 수 있다. 공식 Docker 이미지는 VikingBot을 기본 포함해 서버, 콘솔 UI와 함께 시작한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

OpenViking 0.3.22를 대상으로 장기 대화 사용자 메모리(LoCoMo)와 멀티턴 에이전트 과제(tau2-bench)를 평가했다. 메모리 평가에는 VLM으로 Doubao 2.0 Pro, 임베딩 모델로 Doubao-embedding-vision-251215를 썼다.

| 벤치마크 | 통합 | native memory | OpenViking 적용 |
|---|---|---|---|
| LoCoMo accuracy | OpenClaw | 24.20% | 82.08% |
| LoCoMo accuracy | Hermes | 33.38% | 82.86% |
| LoCoMo accuracy | Claude Code | 57.21% | 80.32% |
| tau2-bench task success | Retail | 70.94% | 77.81% |
| tau2-bench task success | Airline | 54.38% | 66.25% |

세 에이전트 통합 모두 OpenViking을 적용하면 80~83% 구간으로 수렴한다. 즉 native memory 성능이 24~57%로 크게 벌어져 있던 것과 달리, OpenViking을 얹으면 통합 방식과 무관하게 비슷한 수준에 도달한다. 여기에 더해 입력 토큰은 34.3~91.0% 줄고 질의 지연(latency)은 58.45~66.10% 줄었다고 보고한다. tau2-bench에서는 같은 LLM에 메모리가 없을 때 대비 retail에서 +6.87%p, airline에서 +11.87%p의 과제 성공률 향상을 얻었다.

README는 전체 결과와 설정 세부, 지식베이스 QA 결과까지 포함한 내용이 별도 벤치마크 리포트에 있고 재현 스크립트가 저장소 `./benchmark`에 있다고 밝힌다. 다만 이 수치는 OpenViking 팀 자신이 측정하고 공개한 벤치마크이며, 이 페이지가 근거로 삼은 README와 Introduction 페이지만으로는 독립적인 제3자 재검증 여부를 확인할 수 없다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **자체 보고 벤치마크.** LoCoMo와 tau2-bench 수치는 OpenViking 팀이 직접 설계하고 공개한 평가다. 재현 스크립트는 제공되지만, 이 자료 범위 안에서는 독립적인 제3자 재현 결과를 확인할 수 없다.
- **L0/L1 생성 메커니즘의 세부가 README에 없다.** 디렉터리마다 Abstract와 Overview를 만드는 과정이 "semantically processed"라고만 설명되고, 어떤 모델이 어떤 프롬프트로 이를 생성하는지는 밝히지 않는다.
- **memory policy의 판정 기준이 불명확하다.** 추출된 메모리 후보를 생성, 병합, 스킵 중 어디로 분류할지는 "기존 메모리와 비교한다"고만 서술될 뿐, 비교 알고리즘이나 임계값은 README와 Introduction 페이지 어디에도 없다.
- **TrieHI의 세부는 별도 논문 의존이다.** README는 TrieHI를 "Directory-Aware Query and Maintenance in Vector Databases" 논문에서 가져왔다고만 언급하고, 저장소 문서 자체는 알고리즘을 설명하지 않는다.
- **AGPLv3의 copyleft 조건.** 메인 프로젝트가 AGPLv3라서, 네트워크로 노출되는 수정본을 배포할 경우 소스 공개 의무가 함께 따른다. 상용 Self-Managed 에디션과 라이선스 키 요구가 이 지점과 맞물린다.
- **심화 concepts 문서는 이번 수집 범위 밖이다.** Architecture, Context Types, Retrieval 같은 상세 개념 페이지는 Introduction 페이지가 링크만 제공하고, 이 source는 그 페이지들을 직접 수집하지 않았다.

### 이 페이지의 근거 범위

| README와 Introduction이 답하는 것 | 답하지 않는 것 |
|---|---|
| `viking://` 파일시스템 구조와 3가지 context type | 실제 저장 엔진(어떤 vector DB, 어떤 파일시스템 위에 구현되는지) |
| L0/L1/L2 계층과 길이 상한 | L0/L1을 만드는 프롬프트와 모델 세부 |
| directory recursive retrieval의 5단계 절차 | TrieHI 알고리즘의 수식과 구현 세부 (별도 논문 소관) |
| 메모리 타입 카탈로그와 세션 commit 흐름 | memory policy의 병합, 생성, 스킵 판정 로직 |
| LoCoMo, tau2-bench 수치와 토큰과 지연 감소율 | 벤치마크 리포트 전문과 지식베이스 QA 세부 (블로그 별도 문서) |
| quick start 명령과 CLI 예시 | HTTP API 스펙, SDK 내부 구현 |
| 상용 에디션 두 가지의 차이 | 정확한 가격, 라이선스 키 조건 |

## 6. 관련 연구 (Related Work)

- **VikingMem: A Memory Base Management System for Stateful LLM-based Applications** (Jiajie Fu 외, arXiv:2605.29640, VLDB 2026). 이벤트 기반으로 장기 메모리를 추출, 갱신, 통합하는 방법을 다루며, OpenViking은 이 핵심 능력의 일부를 오픈소스로 공개했다고 밝힌다. 이 wiki에 미수록.
- **Directory-Aware Query and Maintenance in Vector Databases** (Mengzhao Wang 외, arXiv:2606.16903, ICDE). directory-scoped 질의와 유지보수 연산을 정의하고 TrieHI를 제안한다. OpenViking의 directory recursive retrieval이 이 논문의 실무 구현에 해당한다. 이 wiki에 미수록.
- **VikingRAG: Accurate and Token-efficient Retrieval-augmented Generation over Structured Documents** (Peiyuan Gao 외, arXiv:2609.11390, 제출됨). semantic search와 문서 구조를 결합하고 retrieval trace 재사용과 필요할 때만 multi-round retrieval로 확장하는 방법을 다룬다. 핵심 메커니즘이 OpenViking에 통합되어 있다고 밝힌다. 이 wiki에 미수록.
- **PageIndex 계열** (`sources/vectifyai-pageindex.md`, `sources/zhang-2025-pageindex-vectorless-reasoning-rag.md`). 문서 구조를 트리로 만들어 LLM이 직접 탐색하게 한다는 점에서 OpenViking의 디렉터리 기반 탐색과 문제의식이 겹친다. 다만 PageIndex는 문서 한 건 단위의 vectorless 탐색이고, OpenViking은 여러 컨텍스트 타입(resource, memory, skill)을 아우르는 파일시스템 전체와 vector 검색을 함께 쓴다는 점이 다르다.
- **HippoRAG 2** (`sources/gutierrez-2025-from-rag-to-memory-non.md`). 사실 기억, sense-making, associativity라는 메모리 관점의 세 과제를 knowledge graph로 함께 개선한다는 점에서, OpenViking이 메모리를 별도 context type으로 승격한 설계와 문제의식을 공유한다.

## 7. 용어집 (Glossary)

- **viking:// URI**: OpenViking이 모든 컨텍스트(resource, memory, skill)에 부여하는 고유 식별자. 이 URI로 특정 컨텍스트를 정확히 지정하고 파일시스템 명령으로 접근한다.
- **L0 (Abstract) / L1 (Overview) / L2 (Detail)**: 디렉터리 단위로 자동 생성되는 3단 계층. L0는 256자 요약, L1은 4,000자 개요, L2는 상한 없는 원문 전체다.
- **directory recursive retrieval**: vector 검색으로 후보 디렉터리를 좁힌 뒤 그 안에서 세부 검색을 반복하며 하위 디렉터리로 재귀적으로 내려가는 OpenViking의 retrieval 전략.
- **TrieHI**: "Directory-Aware Query and Maintenance in Vector Databases" 논문이 제안한 구조로, vector ranking 이전에 디렉터리 범위(scope)를 해석한다. OpenViking이 이를 retrieval에 통합했다.
- **memory policy**: 세션 commit 이후 어떤 정보를 메모리로 남길지 결정하는 규칙. 추출된 후보를 기존 메모리와 비교해 생성, 병합, 스킵으로 분류한다.
- **VikingBot**: OpenViking을 기반으로 만든 에이전트 프레임워크. `ov chat`으로 대화하고, `ov compile`로 자료를 wiki나 knowledge graph, report로 정리한다.

## 8. 그림 후보 (Figure Candidates)

repo 유형이라 `-figures/` 디렉토리를 만들지 않고, README/docs에 등장하는 이미지 두 장을 직접 내려받아 확인했다.

| id | 위치 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | Proof it works 절 | LoCoMo/tau2-bench 벤치마크 결과 차트 (SVG) | manual | ★ wiki 권장 (result) |
| fig02 | What is OpenViking 절 | OpenViking Studio의 viking:// 브라우징과 semantic search UI 스크린샷 | manual | ★ wiki 권장 (background) |
