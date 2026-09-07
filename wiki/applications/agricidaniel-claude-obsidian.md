---
title: "claude-obsidian: Self-Organizing AI Second Brain for Obsidian + Claude Code"
type: repo
year: 2026
category: applications
raw_path: raw/repos/agricidaniel-claude-obsidian.md
raw_filename: "agricidaniel-claude-obsidian.md"
source: agricidaniel-claude-obsidian.md
source_collection: external
org: "AgriciDaniel"
repo: "claude-obsidian"
url: "https://github.com/AgriciDaniel/claude-obsidian"
license: "MIT"
tags:
  - obsidian
  - claude-code
  - claude-code-plugin
  - llm-wiki
  - karpathy-pattern
  - knowledge-base
  - second-brain
  - pkm
  - methodology-modes
  - hybrid-retrieval
  - multi-writer-safety
  - agent-skills
figures:
  - id: fig01
    file: assets/agricidaniel-claude-obsidian/vault-flow.svg
    raw: assets/diagrams/vault-flow.svg
    caption: "vault 흐름도. 소스가 .raw/에 들어오면 ingest 에이전트가 entity, concept, source 페이지를 만들고 index와 log, hot cache를 갱신한다. 질의는 hot cache, index, 개별 페이지 순으로 읽는다."
    strategy: manual
    curated: true
  - id: fig02
    file: assets/agricidaniel-claude-obsidian/multi-writer-locking.svg
    raw: assets/diagrams/multi-writer-locking.svg
    caption: "다중 writer 안전성 도식. 두 writer가 같은 페이지를 잡으려 할 때 한쪽만 lock을 얻고 다른 쪽은 다음 패스에서 재시도한다."
    strategy: manual
    curated: true
  - id: fig03
    file: assets/agricidaniel-claude-obsidian/hybrid-retrieval.svg
    raw: assets/diagrams/hybrid-retrieval.svg
    caption: "hybrid retrieval 3계층 도식. 질의가 BM25와 선택적 contextual prefix 호출로 갈라진 뒤 local ollama cosine rerank로 합쳐져 순위가 매겨진 후보 목록을 낸다."
    strategy: manual
    curated: true
---

# claude-obsidian

## 요약

claude-obsidian은 Karpathy의 LLM Wiki 패턴을 Claude Code 플러그인과 Obsidian vault로 동시에 구현한 오픈소스 저장소다. Daniel Agrici가 만들었고 MIT 라이선스로 배포되며, 최신 공개 빌드는 v1.9.2다.

핵심은 지식 베이스를 사람이 손으로 정리하지 않아도 되게 만든 것이다. 소스를 넣으면 에이전트가 읽고 entity와 concept를 뽑아 vault에 배치하며, 질문하면 학습 데이터가 아니라 vault 안의 특정 페이지를 인용해 답한다. 세션이 끝날 때마다 최근 컨텍스트 캐시를 갱신해 다음 세션이 요약 없이 이어진다.

같은 패턴을 구현한 다른 저장소와 비교했을 때 이 저장소의 차별점은 배포 완성도다. 스킬 15개와 셋업 스크립트 5개, Obsidian 설정 파일, 시드 vault를 한 저장소에 담아 클론 후 스크립트 한 번으로 2분 안에 가동되는 형태로 포장했다.

## 배경

Karpathy가 공개한 LLM Wiki gist는 원본 자료를 요약 계층을 거쳐 wiki 페이지로 정착시키고, 이후 모든 질문을 그 wiki에 근거해 답하게 하는 운영 패턴이다. 본 ai-wiki도 같은 계보에 속해 있어 claude-obsidian은 직접 비교 대상이 된다.

이 패턴을 실제로 운영하려면 두 가지가 필요하다. 첫째는 에이전트가 따를 절차이고, 둘째는 사람이 읽을 열람 환경이다. gist는 절차의 원형만 제시하고 나머지는 각자 구현하도록 남겨 두었다.

claude-obsidian은 그 빈 자리를 채우려는 시도다. 절차는 Claude Code 스킬로, 열람 환경은 미리 설정된 Obsidian vault로 제공한다. README는 기존 Obsidian AI 플러그인 대부분이 채팅 인터페이스에 머물러 이미 있는 노트에 대해 답하기만 한다고 지적하며, 이 저장소는 노트를 만들고 조직하고 유지하며 진화시키는 지식 엔진이라고 자리매김한다.

버전 계보를 보면 기능이 세 단계로 쌓였다. v1.7은 Compound Vault라는 이름으로 기반을 다시 놓았고, v1.8은 조직 철학을 선택 가능한 설정으로 만들었으며, v1.9는 사고 절차 자체를 스킬로 넣었다.

| 버전 | 이름 | 더해진 것 |
|---|---|---|
| v1.7 | Compound Vault | Obsidian CLI 기본 transport, hybrid retrieval, 파일 단위 advisory lock |
| v1.8 | Methodology Modes | LYT, PARA, Zettelkasten, Generic 4종 배치 규칙 |
| v1.9 | Thinking framework | 10원칙 사고 루프 스킬과 감사 강화 |

배포는 두 트랙으로 나뉜다. 코어가 같은 MIT 라이선스이고 유료 전용 기능이 없다는 점이 이 구조의 전제다.

| 트랙 | 저장소 | 조건 |
|---|---|---|
| 공개 오픈소스 빌드 (권장) | `AgriciDaniel/claude-obsidian` | 누구나 설치 가능, 멤버십 불필요 |
| AI Marketing Hub Pro | `AI-Marketing-Hub/claude-obsidian` | 조직 미러. `gh auth login` 또는 GitHub PAT로 조직 접근 권한이 필요하다 |

Pro 트랙이 제공하는 것은 개발 중인 기능에 먼저 접근하는 권한과 커뮤니티 접근이다. 조직 접근 권한이 없는 계정으로 미러의 마켓플레이스를 등록하면 404가 반환된다.

## 핵심 개념

**vault**는 에이전트와 사람이 함께 읽고 쓰는 Markdown 파일 폴더를 뜻한다. claude-obsidian에서 vault는 Obsidian이 여는 폴더이자 Claude Code가 작업하는 프로젝트 디렉토리로, 두 도구가 같은 파일 집합을 본다.

**hot cache**는 최근 컨텍스트를 담은 약 500단어짜리 캐시 파일 `hot.md`를 가리킨다. 매 세션 끝에 갱신되며 다음 세션의 첫 읽기 대상이 된다. 카탈로그인 `index.md`와 두 층을 이루어, 반복 질의가 매번 vault 전체를 훑지 않도록 만든다.

**transport**는 vault에 읽고 쓰는 통로를 뜻한다. Obsidian CLI, MCP 서버 두 종류, 파일시스템 직접 접근이 후보이며 어느 것을 쓸지는 환경에 따라 자동으로 정해진다.

**advisory lock**은 운영체제가 강제하지 않고 참여자끼리 지키기로 약속한 잠금이다. 병렬로 도는 ingest 서브에이전트가 같은 파일을 동시에 쓰지 않도록 이 약속을 사용한다.

**methodology mode**는 vault를 어떤 철학으로 정리할지 고르는 설정이다. 폴더 구조와 파일명 규칙이 모드마다 다르고, 어느 모드를 골랐는지는 `.vault-meta/mode.json` 한 파일이 기준값으로 들고 있다.

**contextual prefix**는 페이지 본문을 요약한 짧은 머리말을 검색 색인에 덧붙이는 기법이다. Anthropic이 2024년 9월에 공개한 contextual retrieval 연구에서 가져왔고, 원문 조각만으로는 무슨 문맥인지 알기 어려운 문제를 보완한다.

## 방법

### 설치 경로

설치 방법이 세 가지 준비되어 있고 각각 다른 상황을 겨냥한다.

| 경로 | 방법 | 적합한 상황 |
|---|---|---|
| 1. vault로 클론 | `git clone` 후 `bash bin/setup-vault.sh`, 그 폴더를 Obsidian vault로 열고 `/wiki` 입력 | 새 지식 베이스를 시작할 때. 저자는 2분이면 끝난다고 밝힌다 |
| 2. Claude Code 플러그인 설치 | `claude plugin marketplace add`로 카탈로그를 등록한 뒤 `claude plugin install`로 설치 | 이미 다른 프로젝트에서 Claude Code를 쓰고 있을 때 |
| 3. 기존 vault에 추가 | `WIKI.md`를 vault 루트에 복사하고 지정된 지시문을 Claude에 붙여넣기 | 이미 쌓아 둔 Obsidian vault가 있을 때 |

경로 1의 `setup-vault.sh`는 Obsidian 설정 파일 세 개를 손본다. `graph.json`에 필터와 색을 넣고, `app.json`이 플러그인 디렉토리를 색인에서 제외하게 하며, `appearance.json`에서 CSS 스니펫을 활성화한다. Obsidian을 처음 열기 전에 한 번 실행하면 그래프 뷰와 색 구성, wiki 구조가 갖춰진 상태로 시작한다.

경로 2는 두 단계로 나뉜다. 카탈로그를 먼저 등록하고 그 카탈로그에서 플러그인을 설치하는 방식이라, 설치 후 `claude plugin list`로 확인한다.

경로 3의 지시문은 Obsidian 설치 여부 확인, Local REST API 플러그인이 포트 27124에서 동작하는지 확인, MCP 서버 설정, "이 vault는 무엇을 위한 것인가"라는 질문 하나를 순서대로 요구한 뒤 전체 wiki 구조를 만들게 한다.

### 첫 실행 절차

`/wiki`를 처음 입력하면 여섯 단계가 진행된다.

1. Obsidian 설치 확인
2. Local REST API 플러그인 확인 (MCP transport를 쓸 경우에만)
3. "이 vault는 무엇을 위한 것인가" 질문. 이 답 하나가 이후 스캐폴드를 결정한다
4. 선택된 methodology mode와 vault use case에 맞는 폴더 구조 생성
5. `hot.md`, `index.md`, `log.md`, `wiki/meta/dashboard.base` 시드 생성
6. 첫 인제스트 제안

두 번째 실행부터 `/wiki`는 중단 지점부터 이어 간다. vault 건강 상태를 점검하고 오래된 주장을 표면화하며 `hot.md`에 담긴 최근 활동을 보여준다.

스캐폴드가 만드는 파일은 다음과 같다.

| 파일 또는 폴더 | 역할 |
|---|---|
| `wiki/index.md` | 전체 페이지 카탈로그 |
| `wiki/log.md` | 추가만 하는 작업 로그 |
| `wiki/hot.md` | 최근 컨텍스트 캐시 |
| `wiki/overview.md` | 요약 페이지 |
| `wiki/meta/dashboard.base` | Bases 대시보드 (기본) |
| `wiki/meta/dashboard.md` | Dataview 대시보드 (레거시 대체재) |
| `_templates/` | 노트 유형별 Obsidian Templater 템플릿 |
| `.obsidian/snippets/vault-colors.css` | 색으로 구분되는 파일 탐색기 |
| vault의 `CLAUDE.md` | 자동으로 로드되는 프로젝트 지시문 |

시드 vault에는 이미 몇 개의 페이지가 들어 있다. concept 3개(LLM Wiki Pattern, Hot Cache, Compounding Knowledge)와 entity 1개(Andrej Karpathy)이고, `wiki/sources/`는 첫 인제스트 전까지 비어 있다. graph view에는 5개 페이지가 연결된 클러스터가 보이는데, 이것이 한 번 인제스트한 뒤의 모습을 미리 보여주는 예시다.

### vault 흐름

소스가 `.raw/`에 들어오면 `/wiki-ingest` 에이전트가 각 소스를 읽는다. entity와 concept를 추출하고, 활성 methodology mode가 지정한 `wiki/` 하위 폴더에 배치한 뒤, index와 log, hot cache를 갱신한다.

질의는 반대 방향으로 흐른다. hot cache를 먼저 읽고, 부족하면 index를 훑고, 그 다음에야 개별 페이지로 내려간다. 이 순서가 고정된 이유는 토큰 비용이다. 대부분의 질문은 최근 컨텍스트만으로 답이 되고, 그렇지 않은 경우에만 더 넓은 범위를 읽는다.

![[assets/agricidaniel-claude-obsidian/vault-flow.svg]]
*Figure 1: 소스가 .raw/에서 ingest 에이전트를 거쳐 entity와 concept, source 페이지로 나뉘고, 질의는 hot cache에서 index, 개별 페이지 순으로 내려간다 (Agrici 2026, README Architecture 절).*

README는 사용자가 하는 일을 네 가지로 정리한다.

| 사용자 동작 | 시스템 동작 |
|---|---|
| 소스를 넣는다 | 읽고 entity와 concept를 추출하고 상호 참조를 갱신한 뒤 구조화된 vault에 배치한다 |
| 질문한다 | hot cache를 읽고 index를 훑고 관련 페이지를 드릴다운해 답을 합성한다. 인용 대상은 학습 데이터가 아니라 특정 wiki 페이지다 |
| lint를 실행한다 | 고아 페이지, 끊긴 링크, 오래된 주장, 누락된 상호 참조를 찾는다 |
| 세션을 끝낸다 | hot cache를 갱신한다. 다음 세션은 요약 설명 없이 최근 컨텍스트를 갖고 시작한다 |

### 스킬 구성

기능은 스킬 15개로 나뉘어 있다. 스킬은 특정 작업 절차를 담아 에이전트에 붙이는 지침 패키지를 뜻하며, 각각 독립적으로 호출되고 조합된다.

| 묶음 | 스킬 | 역할 |
|---|---|---|
| 오케스트레이션 | `wiki` | 전체 흐름 조율 |
| 인제스트와 수집 | `wiki-ingest` | 소스 읽기와 페이지 생성 |
| | `save` | 대화를 wiki 노트로 저장 |
| | `autoresearch` | 자율 연구 루프 |
| | `defuddle` | 웹 추출 래퍼 |
| 질의와 유지 | `wiki-query` | vault 기반 질의 응답 |
| | `wiki-lint` | vault 건강 점검 |
| | `wiki-fold` | 로그 rollup (DragonScale opt-in) |
| | `wiki-retrieve` | hybrid retrieval (v1.7 이상, opt-in) |
| Obsidian 통합 | `wiki-cli` | Obsidian CLI transport (v1.7 이상) |
| | `obsidian-bases` | Bases 스키마 참조 |
| | `obsidian-markdown` | Obsidian Flavored Markdown 문법 참조 |
| | `canvas` | 시각 canvas 계층 |
| 라우팅과 사고 | `wiki-mode` | methodology mode 라우터 (v1.8 이상) |
| | `think` | 10원칙 사고 프레임워크 (v1.9 이상) |

스킬 외에 에이전트 정의 3개가 따로 있다. `agents/verifier.md`는 커밋 직전 감사를 맡고, `agents/wiki-ingest.md`는 여러 소스를 병렬로 처리하는 일괄 인제스트를 담당하며, `agents/wiki-lint.md`는 건강 점검을 수행한다.

### 저장소 구성

저장소 자체가 플러그인 배포 단위이면서 동시에 시연용 vault다. 최상위 디렉토리가 이 두 성격으로 나뉜다.

| 경로 | 내용 |
|---|---|
| `.claude-plugin/` | `plugin.json`(manifest)과 `marketplace.json`(배포 카탈로그) |
| `skills/` | 스킬 15개. 각각 자체 문서와 참조 자료를 갖는다 |
| `agents/` | 에이전트 정의 3개 |
| `commands/` | 슬래시 명령어 진입점 |
| `hooks/hooks.json` | SessionStart, Stop, PostToolUse 훅 정의 |
| `scripts/` | transport와 잠금, 검색 등을 담당하는 헬퍼 스크립트 12개 |
| `tests/` | hermetic 테스트 스위트 9개 |
| `bin/` | 셋업 스크립트 5개 |
| `_templates/` | Obsidian Templater 템플릿 |
| `wiki/` | 시드 vault. `canvases/`, `concepts/`, `entities/`, `sources/`, `meta/`로 나뉜다 |
| `docs/` | 가이드와 감사 기록, 릴리스 노트 |
| `.raw/` | 원본 소스 문서. Obsidian에서는 숨김 처리된다 |
| `.obsidian/snippets/` | `vault-colors.css` |
| `WIKI.md` | 전체 스키마 참조 문서 |
| `CLAUDE.md` | vault의 프로젝트 지시문 |

훅 세 개가 각각 다른 시점을 잡는다. SessionStart는 세션이 시작될 때, Stop은 세션이 끝날 때, PostToolUse는 tool call 직후에 개입한다. tool call은 모델이 도구 하나를 실제로 호출하는 한 번의 실행 단위를 뜻한다. hot cache 갱신과 자동 커밋이 이 지점들에 걸려 있다.

`WIKI.md`는 경로 3으로 설치할 때 vault 루트에 복사하는 파일이기도 하다. 스키마 정의가 이 한 파일에 모여 있어서, 기존 vault에 붙일 때는 이것만 옮기면 나머지를 에이전트가 구성한다.

### 명령어 표면

사용자가 실제로 입력하는 것은 슬래시 명령어와 자연어 지시가 섞인 목록이다.

| 입력 | 동작 |
|---|---|
| `/wiki` | 셋업 점검, 스캐폴드, 또는 중단 지점부터 재개 |
| `ingest [file]` | 소스를 읽어 wiki 페이지 8개에서 15개를 만들고 index와 log를 갱신 |
| `ingest all of these` | 여러 소스를 일괄 처리한 뒤 상호 참조 |
| `what do you know about X?` | index를 읽고 관련 페이지를 드릴다운해 답변 합성 |
| `/save`, `/save [name]` | 현재 대화를 wiki 노트로 저장. 이름을 주면 명명 질문을 건너뛴다 |
| `/autoresearch [topic]` | 검색, 수집, 합성, 배치로 이어지는 자율 연구 루프 실행 |
| `/canvas` | canvas를 열거나 만들고 zone과 노드를 나열 |
| `/canvas add image [path]` | 이미지를 auto-layout으로 canvas에 추가 |
| `/canvas add text [content]` | Markdown 텍스트 카드 추가 |
| `/canvas add pdf [path]` | PDF를 렌더링된 미리보기 노드로 추가 |
| `/canvas add note [page]` | wiki 페이지를 연결 카드로 고정 |
| `/canvas zone [name]` | 이름이 붙은 zone 추가 |
| `/canvas from banana` | 최근 생성한 이미지를 canvas에 담기 |
| `/think [problem]` | 10원칙 사고 루프 적용 |
| `lint the wiki` | 고아 페이지, 끊긴 링크, 빈틈, 개선 제안 |
| `update hot cache` | `hot.md`를 최신 컨텍스트 요약으로 갱신 |

### 다중 writer 안전성

여러 소스를 한꺼번에 넣으면 병렬 ingest 서브에이전트가 같은 wiki 페이지를 대상으로 삼는 상황이 생긴다. 두 프로세스가 같은 파일을 동시에 쓰면 내용이 섞이거나 절반만 쓰인 페이지가 남는다.

`scripts/wiki-lock.sh`가 파일 단위 advisory lock으로 이 경로를 막는다. 한 writer가 lock을 얻으면 다른 writer는 대기했다가 다음 패스에서 재시도한다. 잠금 단위가 파일이라 서로 다른 페이지를 쓰는 작업은 그대로 병렬로 진행된다.

커밋 쪽에도 같은 보호가 걸린다. PostToolUse 자동 커밋 훅은 스테이징 전에 lock 목록을 확인하고, 쓰기가 진행 중이면 커밋을 미룬다. 절반만 쓰인 상태가 커밋으로 굳는 일을 막기 위해서다.

프로세스가 비정상 종료하면 lock이 남을 수 있다. 방치된 lock은 60초 뒤 자동으로 회수되므로 사람이 손으로 지울 필요가 없다.

![[assets/agricidaniel-claude-obsidian/multi-writer-locking.svg]]
*Figure 2: 두 writer가 같은 페이지에 lock을 걸려 할 때 한쪽만 승인되고 다른 쪽은 건너뛴 사실을 기록한 뒤 다음 패스에서 재시도한다 (Agrici 2026, v1.7 Compound Vault).*

### hybrid retrieval

`/wiki-retrieve` 스킬이 제공하는 3계층 검색 파이프라인은 v1.7에서 들어온 opt-in 기능이다. 설계 근거는 Anthropic이 2024년 9월에 공개한 contextual retrieval 연구다.

| 계층 | 방식 | 기본 상태 | 데이터가 나가는가 |
|---|---|---|---|
| BM25 | 단어 빈도 기반 sparse 검색 | 항상 켜짐 | 로컬에서만 처리 |
| contextual prefix | 페이지 본문을 Anthropic API로 보내 prefix 생성 | 꺼짐 | `--allow-egress` 동의 시에만 전송 |
| cosine rerank | 임베딩 사이 코사인 유사도로 후보 순위를 다시 매김 | 켜짐 | 기본값이 local ollama 모델이라 로컬 |

계층을 이렇게 나눈 이유는 각각 잡아내는 것이 다르기 때문이다. BM25는 정확한 단어가 겹치는 문서를 잘 찾고, 임베딩 기반 rerank는 표현이 달라도 뜻이 가까운 문서를 찾는다. contextual prefix는 조각난 본문에 문맥 정보를 덧붙여 두 방식 모두의 정확도를 올린다.

파이프라인 준비는 `bash bin/setup-retrieve.sh` 한 번으로 끝난다. 이 스크립트가 BM25 색인을 만들고 egress 동의 여부를 묻고 ollama 연결을 검증한다. 어느 계층을 쓸 수 없는 상황이 와도 나머지 계층이 유효한 결과를 내도록 설계되어 있다.

![[assets/agricidaniel-claude-obsidian/hybrid-retrieval.svg]]
*Figure 3: 질의가 BM25와 선택적 contextual prefix 호출로 갈라진 뒤 local ollama 임베딩 기반 cosine rerank로 합쳐져, 점수 근거를 추적할 수 있는 후보 목록으로 나온다 (Agrici 2026, README Architecture 절).*

### transport와 MCP 설정

MCP를 붙이면 복사와 붙여넣기 없이 vault 노트를 직접 읽고 쓴다. 두 경로가 준비되어 있다.

| 경로 | 실행 방식 | 필요 조건 |
|---|---|---|
| A. REST API 기반 | `uvx mcp-obsidian`, 포트 27124 | Obsidian Local REST API 플러그인과 API 키 |
| B. 파일시스템 기반 | `npx -y @bitbonsai/mcpvault@latest /path/to/your/vault` | 플러그인 불필요 |

어느 쪽을 쓸지는 `scripts/detect-transport.sh`가 자동으로 감지하고, 판정 결과는 `.vault-meta/transport.json`에 기록된다. 자동 감지 결과를 무시하고 특정 transport로 고정하려면 그 파일에 `"manual_override": true`를 넣는다. v1.8.2 이상이 이 값을 존중한다.

v1.7 이후로는 Obsidian CLI가 기본 transport다. MCP 설정은 선택 사항으로 남는다.

### methodology mode

같은 vault라도 사람마다 정리하는 방식이 다르다. v1.8은 널리 알려진 조직 철학 세 가지를 배치 규칙으로 코드화하고, 아무 의견도 강요하지 않는 기본값을 하나 더해 네 가지 모드로 만들었다.

| 모드 | 철학 | 배치 규칙 |
|---|---|---|
| Generic (기본) | 의견을 강요하지 않는다. v1.7 동작을 그대로 보존한다 | `wiki/sources/`, `wiki/entities/`, `wiki/concepts/`, `wiki/sessions/` |
| LYT (Linking Your Thinking) | 노트가 연결하고 폴더는 연결하지 않는다. MOC가 탐색의 기본 단위다 | `wiki/mocs/<topic>-moc.md`와 `wiki/notes/<atomic-note>.md` |
| PARA (Tiago Forte) | 실행 가능성을 기준으로 나눈다 | `wiki/projects/`, `wiki/areas/`, `wiki/resources/`, `wiki/archives/` |
| Zettelkasten (Luhmann) | 원자 노트에 고유 ID를 주고 양방향으로 촘촘히 연결한다. 폴더를 쓰지 않는다 | `wiki/<YYYYMMDDHHMMSSffffff>-<slug>.md` 평면 구조 |

모드는 `bash bin/setup-mode.sh`로 켜는 opt-in 기능이다. `wiki-mode` 스킬이 `.vault-meta/mode.json`을 읽고 새 페이지를 해당 규칙으로 배치하므로, 인제스트나 저장을 담당하는 스킬은 모드를 신경 쓰지 않아도 된다.

모드를 바꿔도 이미 만들어진 파일은 자동으로 옮겨지지 않는다. 마이그레이션을 자동화하지 않은 것은 파일 이동이 되돌리기 어려운 작업이라서 명시적 결정으로 남긴 선택으로 보인다.

### vault use case

use case는 vault가 무엇을 위한 것인지 정하고, methodology mode는 어떻게 정리할지 정한다. 두 설정은 서로 독립이라 자유롭게 조합된다.

| Use case | 쓰는 상황 |
|---|---|
| A. Website | 사이트맵, 콘텐츠 감사, SEO wiki |
| B. GitHub | 코드베이스 지도, 아키텍처 wiki |
| C. Business | 프로젝트 wiki, 경쟁 정보 |
| D. Personal | second brain, 목표, 저널 합성 |
| E. Research | 논문, 개념, 학위 논문 |
| F. Book/Course | 챕터 트래커, 강의 노트 |

Business와 Research를 겹쳐 쓰면서 PARA로 정리하는 구성이 유효한 예로 제시된다.

### 자율 연구 루프

`/autoresearch`는 주제 하나를 받아 검색부터 페이지 배치까지 스스로 진행한다. 동작 규칙은 `skills/autoresearch/references/program.md`에 적혀 있어 사용자가 고칠 수 있다.

| 설정 항목 | 기본값이나 내용 |
|---|---|
| 최대 라운드 수 | 3 |
| 세션당 최대 페이지 수 | 15 |
| 선호 소스 규칙 | 학술, 공식 문서, 뉴스 |
| 신뢰도 점수와 도메인 제약 | 사용자 정의 |

루프 자체는 네 단계다.

1. **1라운드 광범위 검색**: 주제를 3개에서 5개 관점으로 분해하고, 관점마다 질의를 2개에서 3개 실행한 뒤, 관점마다 상위 결과를 2개에서 3개 가져온다
2. **2라운드 빈틈 메우기**: 모순이 있거나 빠진 부분을 겨냥해 다시 검색한다
3. **3라운드 합성 점검**: 큰 빈틈이 남아 있을 때만 선택적으로 한 번 더 진행한다
4. **배치**: 합성 페이지와 소스 페이지, entity 페이지, concept 페이지를 만들고 전부 상호 참조한다

기본 프로그램은 일반 연구에 맞춰져 있고, 도메인에 따라 덮어쓰라고 권한다. 의학 연구자라면 PubMed를 선호하도록, 비즈니스 분석가라면 시장 자료와 공시에 집중하도록 규칙을 바꾸는 식이다.

웹에서 내용을 가져오는 이상 안전 문제가 따라온다. v1.8.2 이후 `Web egress hygiene` 정책이 `skills/autoresearch/SKILL.md`에 명시되어 있다.

| 위협 | 대응 |
|---|---|
| 로컬 파일과 스크립트 실행 유도 | `file://`과 `javascript:` 거부 |
| 내부망 접근 | RFC1918 대역 호스트 거부 |
| 스크립트 삽입 | `<script>` 제거 |
| wikilink 주입 | 주입 시도 문자열 제거 |
| 과대 응답 | 응답 본문을 50KB로 제한 |

### canvas 계층

`/canvas` 계열 명령어는 이미지와 PDF, 노트, 생성 이미지를 Obsidian canvas에 올린다. zone으로 묶어 정리하고, auto-layout이 노드를 겹치지 않게 배치한다. 산출물은 JSON Canvas 1.0 명세를 따르며 참조 문서는 `skills/canvas/references/canvas-spec.md`에 있다.

이 저장소가 담는 것은 canvas의 기본 조작까지다. 템플릿 12종과 레이아웃 알고리즘 6종, 발표 기능을 포함한 전체 오케스트레이션은 동반 프로젝트 `claude-canvas`가 맡는다. 두 플러그인을 함께 설치하면 서로를 보완하고, `claude-canvas`는 claude-obsidian vault를 자동으로 감지한다.

### 사고 프레임워크

v1.9는 사고 절차 자체를 스킬로 만들었다. `OBSERVE-OBSERVE-LISTEN-THINK-CONNECT-CONNECT-FEEL-ACCEPT-CREATE-GROW` 10단계를 `skills/think/SKILL.md`에 캡슐화하고, 단계마다 프롬프트를 두어 에이전트를 통과시킨다.

적용 대상은 아키텍처 결정, 감사, 사후 분석, 모호한 사용자 요청처럼 사소하지 않은 문제다. README는 문제의 새로움과 되돌리기 어려움이 이 정도 규율을 정당화할 때만 쓰라고 조건을 붙인다.

프레임워크는 `think` 스킬 안에만 머물지 않는다. 나머지 스킬마다 이 10단계를 자기 작업에 대응시킨 "How to think" appendix가 붙어 있어, 스킬을 호출할 때 같은 사고 규율이 따라온다. v1.8.0 사전 감사 문서가 이 프레임워크를 방법론 뼈대로 사용했다.

### Obsidian 환경 구성

vault를 열었을 때 바로 쓸 수 있도록 플러그인 구성이 미리 잡혀 있다.

| 구분 | 항목과 역할 |
|---|---|
| 코어 플러그인 | Bases가 `wiki/meta/dashboard.base`를 구동한다. Obsidian v1.9.10부터 제공되는 네이티브 데이터베이스 뷰로 기본 대시보드에서 Dataview를 대체했다. Properties는 frontmatter 편집기, Backlinks와 Outline, Graph view는 표준 탐색 도구다 |
| 미리 설치된 커뮤니티 플러그인 | Calendar(단어 수와 작업 표시가 붙은 사이드바 달력), Thino(빠른 메모 패널), Excalidraw(자유 드로잉과 이미지 주석), Banners(frontmatter `banner:`로 Notion식 헤더 이미지) |
| 직접 설치할 플러그인 | Templater(`_templates/`에서 frontmatter 자동 채움), Obsidian Git(15분마다 vault 자동 커밋), Dataview(레거시 대시보드 전용, 선택) |

Excalidraw의 `main.js`는 8MB라 git으로 추적하지 않고 `setup-vault.sh`가 자동으로 내려받는다. 브라우저 확장 Obsidian Web Clipper를 함께 설치하면 웹 페이지를 클릭 한 번으로 `.raw/`에 보낼 수 있다.

CSS 스니펫 3종도 `setup-vault.sh`가 자동으로 켠다.

| 스니펫 | 효과 |
|---|---|
| `vault-colors` | 파일 탐색기에서 `wiki/` 폴더를 유형별로 색칠한다. 파랑은 concept, 초록은 source, 보라는 entity다 |
| `ITS-Dataview-Cards` | Dataview `TABLE` 질의를 카드 그리드로 바꾼다 |
| `ITS-Image-Adjustments` | 이미지 임베드 뒤에 `|100` 같은 표기를 붙여 크기를 조절한다 |

대시보드는 두 가지가 나란히 배포된다. `wiki/meta/dashboard.base`가 기본이고 `wiki/meta/dashboard.md`가 Dataview 기반 레거시 대체재다. Obsidian에서 하나를 고르면 다른 하나는 무해하게 남는다. Bases 기반 대시보드를 쓰려면 Obsidian v1.9.10 이상이 필요하다.

Banners 플러그인은 페이지 frontmatter에 `banner:`와 `banner_icon:`을 넣으면 전체 폭 헤더 이미지를 렌더한다. 허브 페이지나 개요 페이지에 쓰기 좋은 장치다.

### 프로젝트 간 지식 공유

같은 vault를 여러 Claude Code 프로젝트가 참조하게 만들 수 있다. 다른 프로젝트의 `CLAUDE.md`에 vault 경로와 읽기 순서를 적어 두는 방식이다.

README가 제시하는 읽기 순서는 vault 내부 질의와 같다. `wiki/hot.md`를 먼저 읽고, 부족하면 `wiki/index.md`를 읽고, 도메인 세부가 필요하면 해당 도메인의 하위 인덱스를 읽고, 그 다음에만 개별 페이지로 내려간다. 지시문에는 일반 코딩 질문이나 해당 도메인과 무관한 작업에는 vault를 읽지 말라는 제한도 함께 넣는다.

이렇게 두면 업무 보조, 코딩 프로젝트, 콘텐츠 작업이 같은 지식 베이스를 공유한다.

### 데이터 소유 모델

이 저장소가 스스로를 설명하는 방식의 중심에는 데이터 소유권이 있다. 모든 내용이 사용자 디스크의 평범한 Markdown 파일로 저장되며, 별도의 데이터베이스도 종속도 구독료도 없다는 것이 FAQ가 반복하는 주장이다.

local-first는 데이터 원본을 사용자 디스크에 두고 서버 없이 동작하는 설계를 뜻한다. README는 이 성격을 근거로 호스팅형 데이터베이스에 노트를 올리는 서비스의 대안이라고 자리매김한다.

이 원칙은 네트워크 전송에도 그대로 적용된다.

| 기능 | 기본 동작 | 켜는 방법 |
|---|---|---|
| BM25 검색과 ollama rerank | 완전히 로컬에서 처리 | 기본 활성 |
| contextual prefix | 꺼짐. 켜면 페이지 본문이 Anthropic API로 전송된다 | `--allow-egress` 동의 플래그 |
| autoresearch 웹 수집 | 꺼짐. 같은 opt-in 원칙을 따른다 | 명령어 실행 시 |

제거 경로가 준비된 것도 같은 맥락이다. 플러그인 제거든 폴더 삭제든, `wiki/` 아래의 vault 내용은 평범한 Markdown이라 그대로 남는다.

### 선택 확장

DragonScale Memory는 `bash bin/setup-dragonscale.sh`로만 켜지는 별도 확장이다. 메모리 메커니즘 4종을 더하며 일반 사용에는 필요하지 않다.

| 메커니즘 | 내용 |
|---|---|
| 로그 fold | 과거 항목을 rollup으로 접는다 |
| 결정론적 페이지 주소 | 카운터 기반 고유 ID를 부여한다 |
| 의미 단위 tiling lint | ollama로 청크 경계가 적절한지 검증한다 |
| 경계 우선 autoresearch | vault의 frontier에 해당하는 영역을 먼저 연구한다 |

## 결과

### 검색 벤치마크

v1.7에서 질의 50개로 측정한 결과, top-1 정확도가 v1.6 기준선 대비 32%p 올랐고 오류가 41% 줄었다. hybrid retrieval 도입이 이 저장소에서 수치로 제시된 유일한 성능 개선이다.

이 값은 저자가 직접 측정한 자체 벤치마크다. 질의 50개라는 규모도 크지 않아, 외부 검증 없이 일반화하기는 어렵다.

### 테스트와 CI

`make test` 한 번으로 hermetic 테스트 스위트 9개가 실행되고, assertion은 약 1,240개다. hermetic 테스트는 외부 상태에 의존하지 않고 매번 같은 결과를 내도록 격리한 테스트를 뜻한다.

CI는 PR마다 세 가지를 실행한다. `make test`와 SKILL.md frontmatter 검증, 플러그인 manifest JSON 유효성 검사다. 여기에 더해 `agents/verifier.md`가 커밋 직전 스테이징된 diff에 six-cut과 agent kernel 규율을 적용한다. 이 규율의 정의는 저자의 별도 저장소 `best-practices`에 있다.

기여 규칙 문서도 갖춰져 있다. `CONTRIBUTING.md`에 작업 흐름과 six-cut 자체 검토 체크리스트, 커밋 규약, hermetic 테스트 요구 사항이 있고, `CODE_OF_CONDUCT.md`는 Contributor Covenant v2.1을 따르며, `SECURITY.md`는 보안 취약점 제보 정책을 담는다.

### 경쟁 제품 비교

README는 Smart Connections와 Copilot을 비교 대상으로 삼아 13개 항목 표를 제시한다.

| 항목 | claude-obsidian | Smart Connections | Copilot |
|---|---|---|---|
| 노트 자동 조직화 | entity와 concept, 상호 참조 생성 | 없음 | 없음 |
| 모순 표시 | `[!contradiction]` callout에 출처 첨부 | 없음 | 없음 |
| 세션 메모리 | hot cache가 대화 사이에 유지 | 없음 | 없음 |
| vault 유지보수 | 8개 범주 lint | 없음 | 없음 |
| 자율 연구 | 빈틈 메우기를 포함한 3라운드 웹 연구 | 없음 | 없음 |
| Methodology mode | LYT, PARA, Zettelkasten, Generic | 없음 | 없음 |
| 사고 프레임워크 | 10원칙 루프를 호출 가능한 스킬로 제공 | 없음 | 없음 |
| 다중 모델 지원 | Claude, Gemini, Codex, Cursor, Windsurf | Claude 전용 | 여러 모델 |
| 시각 canvas | `claude-canvas` 경유 | 없음 | 없음 |
| 다중 writer 안전성 | 파일 단위 advisory lock (v1.7 이상) | 없음 | 없음 |
| 인용이 붙은 질의 | 특정 wiki 페이지를 인용 | 유사 노트를 인용 | 노트를 인용 |
| 일괄 인제스트 | 여러 소스에 병렬 에이전트 | 없음 | 없음 |
| 오픈소스 | MIT | MIT | freemium |

이 표는 저자가 작성한 자기 평가다. 세 제품을 같은 기준으로 측정한 독립 비교가 아니므로, 인용할 때는 출처가 저자 본인임을 함께 밝혀야 한다.

### 동반 프로젝트와 배포 상태

claude-obsidian은 같은 저자가 운영하는 Claude Code 도구 묶음의 하나다. 저장소 사이의 관계가 기능 분담으로 정리되어 있다.

| 프로젝트 | 역할 | claude-obsidian과의 관계 |
|---|---|---|
| `claude-canvas` | 시각 canvas 오케스트레이션. 템플릿 12종, 레이아웃 알고리즘 6종, 이미지 생성, 발표 기능 | canvas 계층의 확장판. claude-obsidian vault를 자동 감지한다 |
| `claude-ads` | 다중 플랫폼 유료 광고 감사. Google, Meta, LinkedIn, TikTok, Microsoft, Apple, Amazon Ads에 걸쳐 250개 이상 점검 | 같은 저자의 별도 도구 |
| `claude-seo` | 기술 SEO와 GEO 감사 도구 모음 | 같은 저자의 별도 도구 |
| `best-practices` | 조합 가능한 엔지니어링 커널 | `agents/verifier.md`가 적용하는 six-cut과 agent kernel의 정의 출처 |

커뮤니티 규모는 무료 커뮤니티가 2,800명 이상이라고 README가 밝힌다. 이 수치는 claude-obsidian 사용자 수가 아니라 저자가 운영하는 커뮤니티 전체 규모다.

### 요구 사항

| 구성 요소 | 최소 조건 | 비고 |
|---|---|---|
| Claude Code | 최신 | |
| Obsidian | v1.9.10 이상 | Bases 대시보드 조건. v1.6 이상은 Dataview 대체재로 동작 |
| Python | 3.10 이상 | 선택적 검색 파이프라인과 테스트 스위트에 필요 |
| Bash | 4.0 이상 또는 zsh | 셋업 스크립트 실행용 |
| Git | 버전 무관 | Obsidian Git 플러그인의 자동 커밋용 |

선택 요소는 네 가지다. `/wiki-retrieve`의 로컬 rerank에 쓰는 ollama, `/defuddle`의 웹 추출에 쓰는 defuddle-cli, contextual prefix 계층에 쓰는 Anthropic API 키, REST API transport에 쓰는 Local REST API 플러그인이다.

제거는 간단하다. 플러그인으로 설치했다면 플러그인 제거와 마켓플레이스 제거 두 명령이면 되고, 클론으로 설치했다면 폴더를 지우면 된다. `wiki/` 아래의 vault 내용은 평범한 Markdown이라 제거 후에도 남는다. 런타임 상태만 지우려면 `make clean-test-state`를 실행한다.

## 한계

**자료 범위의 한계가 가장 크다.** 본 wiki가 근거로 삼은 raw는 README 전문 한 편이다. 저장소 클론 스냅샷이 아니라서 vault 구성 파일, 플러그인 설정 값, 스크립트 구현, 테스트 코드, 감사 문서의 내용, 릴리스 날짜 같은 내부 세부는 확인할 수 없다. 이 페이지는 README가 명시한 사실만 다루며, 내부 구현을 검증해야 하는 판단에는 저장소를 직접 열어야 한다.

**외부 검증이 없다.** 경쟁 비교표와 검색 벤치마크가 모두 저자 자평이다. 제3자가 같은 조건으로 재현한 수치가 없어, 성능 주장을 그대로 인용하기는 어렵다.

**production 검증 범위가 좁다.** 스킬이 Agent Skills 규격과 호환된다고 표방하지만 실제 검증은 Claude Code에서만 이루어졌다. OpenAI Codex CLI, Cursor, Windsurf, Gemini CLI, Goose는 실험 단계이며 호스트마다 스킬 탐색 방식이 달라 동작이 갈릴 수 있다.

**기기 간 동기화가 없다.** vault는 평범한 Markdown 폴더라 여러 기기에서 쓰려면 Obsidian Sync나 Obsidian Git, Syncthing, iCloud, Dropbox 같은 도구를 따로 붙여야 한다.

**egress 동의는 한 번뿐이다.** contextual prefix 계층은 기본적으로 꺼져 있고 `--allow-egress` 플래그로만 켜지지만, 한 번 켜면 페이지 본문이 Anthropic API로 전송된다. 개인 노트를 다루는 도구라 사용자가 이 경계를 인지한 채 켜야 한다.

**선택 확장이 검증되지 않았다.** DragonScale Memory의 메커니즘 4종은 기능 설명만 있고 비교 데이터가 없다.

**Obsidian 버전에 묶인다.** 기본 대시보드가 Bases 기반이라 Obsidian v1.9.10 이상이 필요하다. 그 아래 버전은 Dataview 대체재로만 동작한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Compound Vault | v1.7 리팩터링에 저자가 붙인 이름. Obsidian CLI transport와 hybrid retrieval, 파일 단위 advisory lock, 기반 정렬을 묶은 재설계다 |
| Hot cache | 약 500단어 분량의 최근 컨텍스트 캐시 `hot.md`. 매 세션 갱신되며 질의 시 가장 먼저 읽는다 |
| Methodology Mode | vault를 어떻게 정리할지 정하는 설정. Generic, LYT, PARA, Zettelkasten 4종이며 `.vault-meta/mode.json`이 기준값이다 |
| Vault Use Case | vault가 무엇을 위한 것인지 정하는 설정. Website부터 Book/Course까지 6종이며 methodology mode와 독립 조합된다 |
| Per-file advisory lock | `scripts/wiki-lock.sh`가 제공하는 파일 단위 잠금. 방치된 lock은 60초 뒤 자동 회수된다 |
| Contextual prefix | 페이지 본문을 Anthropic API로 보내 검색용 머리말을 만드는 계층. `--allow-egress` 동의로만 켜진다 |

## 관련 페이지

- [[applications/garrytan-gbrain]]: Karpathy LLM Wiki 패턴의 또 다른 구현체. Markdown 우선 에이전트 메모리로, 같은 패턴을 다른 저장 구조로 푼 사례라 직접 비교 대상이다.
- [[applications/dnotitia-akb]]: MCP 우선 에이전트 지식 베이스. 개인 vault보다 조직용 공유 vault 쪽에 무게가 실린다.
- [[applications/dragon1086-llm-wiki]]: 같은 패턴의 한국어권 구현. 배포 완성도보다 개인 운영 방식에 초점이 있다.
- [[applications/joonan30-llm-wiki-labs]]: 같은 패턴을 실험 랩 형태로 구성한 구현.
- [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]]: Karpathy gist의 영어권 입문 가이드. claude-obsidian이 제품 형태로 구체화한 패턴의 원형이다.
- [[applications/kmyu-2026-llm-wiki-pattern-synthesis]]: 본 ai-wiki 운영자 관점에서 정리한 한국어 종합.
- [[applications/kmyu-2026-akb-llmwiki-gbrain-comparison]]: AKB와 llmwiki, GBrain 비교. claude-obsidian을 네 번째 대상으로 추가할 가치가 있다.
- [[applications/liu-2026-rag-llm-wiki-or-gbrain]]: 에이전트의 역할로 RAG와 LLM Wiki, Fat Skills를 가르는 결정 프레임워크.
- [[applications/safishamsi-graphify]]: tree-sitter AST와 군집화로 코드 지식 그래프를 만드는 다른 접근.
- [[agents/patel-2026-beyond-the-prompt-claude-code]]: Claude Code 운영 관점. 셋업이 곧 작업이라는 시각이 claude-obsidian의 셋업 스크립트 구성과 호응한다.
- [[agents/osmani-2026-loop-engineering]]: 스킬과 서브에이전트를 조합해 루프를 설계하는 관점. 스킬 15개와 병렬 ingest 에이전트가 그 한 사례다.
- [[agents/cemri-2025-why-do-multi-agent-llm-systems]]: 다중 에이전트 실패의 시스템 설계 결함 분류. 명시적 lock과 transport 대체, verifier 에이전트는 그 충돌 표면을 줄이는 장치로 읽을 수 있다.
