---
title: "garrytan/gbrain"
type: repo
year: 2026
category: applications
raw_path: raw/repos/garrytan-gbrain.md
raw_filename: "garrytan-gbrain.md"
source: garrytan-gbrain.md
source_collection: external
org: "garrytan"
repo: "gbrain"
url: "https://github.com/garrytan/gbrain"
license: "MIT"
language: "TypeScript"
version: "README 본문이 v0.41.37.0까지 언급"
tags: [agent-memory, personal-brain, markdown-first, knowledge-graph, hybrid-search, pgvector, pglite, mcp, openclaw, hermes, zeroentropy, brainbench, longmemeval, karpathy-llm-wiki, minions, dream-cycle, schema-pack, company-brain]
---

## 요약

GBrain은 Y Combinator의 Garry Tan이 자신의 에이전트를 운영하려고 만들어 MIT 라이선스로 공개한 에이전트 메모리 시스템이다. 지식의 원본은 사용자가 git으로 소유하는 markdown 저장소에 두고, GBrain은 그 저장소를 Postgres로 sync해 retrieval에 쓰는 파생 인덱스를 만든다.

README가 다른 개인 지식 도구와 구별점으로 내세우는 것은 두 가지다. 하나는 상위 페이지 목록 대신 인용과 gap analysis가 붙은 답을 합성해 돌려주는 brain layer이고, 다른 하나는 페이지를 쓸 때마다 LLM 호출 없이 typed edge를 만드는 self-wiring knowledge graph다. 240페이지 코퍼스로 만든 자체 벤치마크에서 P@5 49.1%, R@5 97.9%를 기록했으며, graph를 끈 변형과 비교하면 P@5가 31.4%p 높다.

시스템은 개인용으로 시작해 company brain까지 범위를 넓혔다. 팀원마다 login으로 범위가 정해진 brain 조각을 갖고, 질의 결과에는 허용된 것만 나온다. 구현은 TypeScript와 Bun이며 기본 엔진은 서버가 필요 없는 PGLite다.

## 배경

### 검색 결과와 답의 차이

README는 문제를 사용 장면 하나로 설명한다. 내일 Alice와 회의가 있고, 그가 무슨 일을 하는지, 마지막으로 언제 이야기했는지, 둘 사이에 무엇이 열려 있는지 알고 싶은 상황이다.

대부분의 개인 지식 도구는 여기서 페이지 목록을 돌려준다. Alice의 인물 페이지, 지난 분기 제품 리뷰 회의록, 킥오프 회의록, 고객사 페이지, 4월 22일 가격 논의 메모 다섯 건이 나오는 식이다. 자료를 제대로 찾아 주기는 했지만 읽고 정리하는 일은 사용자에게 그대로 남는다.

GBrain이 같은 질문에 돌려주는 것은 문장으로 쓰인 답이다. Alice가 어느 회사에서 엔지니어링을 맡고 있고, 마지막 대화가 언제였으며, 그 대화에서 아직 닫히지 않은 항목이 무엇인지가 근거 페이지와 함께 나온다. 예시에서는 보안 검토 회신 지연, 500석 요금제 견적에 대한 무응답, CISO 채용 관련 소개 약속 세 가지가 열린 항목으로 제시된다.

답의 마지막에 붙는 문장이 이 시스템의 성격을 잘 보여준다. 6주 전인 4월 22일 이후로 Alice와 그 회사에 대해 brain에 추가된 것이 없으니, 이메일이나 Slack DM처럼 brain이 보지 못하는 경로로 답이 왔을 수 있다는 경고다. 무엇을 아는지뿐 아니라 무엇을 모르는지를 함께 말하는 부분이 gap analysis다.

### 상시 실행 데몬이라는 선택

README는 설계 근거를 운영 관점에서 밝힌다. 대화창 안의 에이전트가 계속 열심히 일하게 만드는 것보다, ingest와 enrichment와 통합을 24시간 수행하는 데몬을 만드는 편이 쉽다는 것이다. GBrain은 그 데몬을 일반화한 결과물로 소개된다.

같은 문단이 목표도 밝힌다. 10만 페이지 규모의 brain을 만드는 목적은 그것을 전략적 해자로 쓰기 위해서다. 컨텍스트를 잃지 않기 위해, 그리고 자기 머릿속에 있는 것을 다시 읽지 않고도 질의하기 위해서다. brain layer가 그 해자를 실제로 쓸 수 있게 만들고, 야간에 실행되는 dream cycle이 날을 유지한다. brain layer와 dream cycle 모두 사용자의 하드웨어, 데이터베이스, API 키 위에서 수행된다.

### 저자 본인의 운영 규모

README 첫 단락은 저자 자신의 production brain 수치를 공개한다. 문서 전체에서 실제 운영 규모를 알려주는 유일한 수치다.

| 항목 | 값 |
|---|---|
| 페이지 | 146,646 |
| 인물 | 24,585 |
| 회사 | 5,339 |
| 자율 실행 중인 cron job | 66 |

이 brain은 사용자가 자는 동안 회의, 이메일, 트윗, 음성 통화, 직접 적은 아이디어를 ingest한다. 마주친 모든 사람과 회사를 보강하고, 자기 인용을 고치며, 밤사이 메모리를 통합한다.

## 핵심 개념

**brain repo**는 사용자가 git으로 소유하는 평문 markdown 디렉토리다. README는 이것을 system of record로 부른다. GBrain은 이 저장소를 데이터베이스로 sync하며, git에서 파일을 지우면 데이터베이스에서는 soft delete가 된다. 인덱스가 손상되어도 저장소가 남아 있으면 다시 만들 수 있는 구조다.

**brain**은 데이터베이스 자체를 가리킨다. 개인 brain일 수도 있고 참여한 팀 mount일 수도 있다. **source**는 그 brain 안에 든 저장소 하나를 가리키며 wiki, gstack, 에세이, 지식 베이스 같은 단위다. 두 개념이 서로 직교하기 때문에 하나의 brain이 여러 source를 담고, 하나의 source가 여러 brain에 mount될 수 있다.

**typed edge**는 페이지 사이의 관계에 이름을 붙인 것이다. `works_at`, `invested_in`, `attended`, `founded`, `advises`, `mentions` 같은 값을 쓴다. 이 edge는 페이지를 쓸 때마다 LLM 호출 없이 문법 매칭만으로 만들어진다.

**schema pack**은 brain의 형태를 선언한 묶음이다. 어떤 페이지 타입이 존재하는지, 그 타입들이 어떤 관계로 연결되는지, 어떤 fact를 자동으로 추출할지를 정한다. 기본값은 `gbrain-base-v2`이며 사용자가 직접 만들어 쓸 수도 있다.

**brain layer**는 retrieval 결과 위에서 답을 합성하는 층이다. `gbrain think`가 진입점이고, 인용과 gap analysis를 함께 낸다. raw retrieval을 담당하는 `gbrain search`와 역할이 나뉜다.

**Minion**은 Postgres 네이티브 job queue의 작업 단위다. durable subagent, shell job, child job이 모두 여기에 실린다. **dream cycle**은 야간 cron으로 수행되는 enrichment, 인용 수정, salience 채점, 모순 탐지, 다음 날 준비 묶음을 부르는 이름이다.

## 방법

### 에이전트 루프

시스템 전체의 동작은 여섯 단계 루프 하나로 서술된다.

```
  signal   →   search   →   respond   →   write   →   auto-link   →   sync
  (every    (brain-first  (informed     (page +    (typed edges     (cron
  message)  retrieval)    by context)   timeline)  + backlinks)     keeps fresh)
```

| 단계 | 하는 일 |
|---|---|
| signal | signal detector가 에이전트가 받는 모든 메시지에서 실행된다. 아이디어, entity 언급, 기한이 있는 todo, 이름, 링크를 캡처한다 |
| search | 외부 API를 부르기 전에 brain을 먼저 조회한다. README는 brain을 가장 싸고 빠르고 개인적인 정보원으로 부른다 |
| respond | 조회로 얻은 컨텍스트를 근거로 답한다 |
| write | 페이지와 timeline을 기록한다 |
| auto-link | 페이지를 쓸 때마다 발동한다. LLM 호출 없이 `[[wiki/people/bob]]` 형태 참조에 순수 패턴 매칭을 적용해 typed edge와 backlink를 만든다 |
| sync | cron이 저장소와 인덱스를 최신 상태로 유지한다 |

auto-link 단계가 graph를 자라게 하는 지점이다. 참조된 entity에 해당하는 페이지가 없으면 stub 페이지가 새로 생기고, 그 stub이 다음 enrichment의 대상이 된다. 사용자가 별도로 관계를 입력하지 않아도 graph가 커지는 구조다.

sync 단계에 붙은 cron 작업이 dream cycle이다. 사람 페이지 중복 제거, 인용 수정, salience 점수 매기기, 모순 찾기, 다음 날 할 일 준비를 사용자가 자는 동안 수행한다.

### 두 엔진과 하나의 계약

GBrain은 규모에 따라 두 가지 저장소를 쓰지만 상위 코드는 하나의 interface만 본다.

| 엔진 | 구성 | 적합 범위 |
|---|---|---|
| PGLite | WASM으로 컴파일된 Postgres 17. 서버도 Docker도 없이 파일 기반으로 동작하며 기본값이다 | 약 5만 페이지까지의 개인 brain |
| Postgres + pgvector | Supabase 또는 self-hosted | 공유, 대규모, 다중 머신 배치 |

두 엔진은 `src/core/engine.ts`에 선언된 contract-first `BrainEngine` interface를 함께 구현한다. 이 interface가 약 47개 연산을 정의하고, CLI와 MCP 서버가 모두 이 한 곳에서 생성된다. 어느 표면으로 호출하든 같은 연산이 같게 동작한다는 뜻이며, 엔진 교체가 상위 기능에 영향을 주지 않는 근거이기도 하다.

PGLite는 서버가 없으므로 초기화가 2초 만에 끝난다. README가 설치 소요를 30분으로 잡으면서 "데이터베이스는 2초, 사용자는 API 키에 대한 질문에만 답하면 된다"고 적는 근거가 여기에 있다.

### brain과 source의 분리

brain이 데이터베이스이고 source가 그 안의 저장소라는 구분은 라우팅 규칙으로 구현된다. 어떤 파일이 어느 source에 속하는지는 `.gbrain-source` dotfile이 정하며, 해석은 문서화된 6단계 precedence chain을 따른다.

이 분리 덕분에 하나의 배치가 여러 형태를 가질 수 있다. 개인 brain에 개인 wiki와 에세이 저장소를 함께 두는 형태, 팀 mount에 참여해 공용 지식 베이스를 함께 읽는 형태, 동료의 brain 서버를 가리키는 thin client 형태가 모두 같은 구조에서 나온다. 저장소 공개 범위를 부분집합으로 나누어 publish하는 것도 가능하다.

### schema pack

README는 대부분의 개인 지식 도구가 자기 방식의 고정 레이아웃을 강요한다고 지적한다. Notion export나 오래된 Obsidian vault를 그 위에 올리면 에이전트가 `Projects/` 폴더가 무엇을 뜻하는지, `Reading/`이 사람인지 출처인지 알지 못한다는 것이다. GBrain의 답은 레이아웃을 교체 가능한 pack으로 만드는 것이다.

| pack | 내용 | 활성화 방법 |
|---|---|---|
| `gbrain-base-v2` | v0.41.22부터 기본값. canonical 14종에 catch-all `note`를 더한 15종 분류다. 하위 타입, 포맷, 출처는 타입이 아니라 frontmatter로 내렸다 | 기본값 |
| `gbrain-base` | v0.41 이전 brain이 쓰던 24종 legacy 레이아웃. 하위 호환을 위해 계속 번들된다 | `gbrain onboard --check --explain`으로 점검한 뒤 `gbrain jobs submit unify-types`로 이전 |
| `gbrain-recommended` | `gbrain-base`에 `source`, `place`, `trip`, `conversation`, `personal`, `civic`, `project` 등 디렉토리 13개를 더한 확장 | `gbrain schema use gbrain-recommended` |
| 사용자 pack | 실제 파일 구조에서 뽑아 만든 자체 분류. 후속 pack은 `migration_from:`을 선언해 기존 brain이 옮겨올 수 있게 한다 | `gbrain schema use my-pack` |

기본값인 `gbrain-base-v2`의 15종은 `person`, `company`, `media`, `tweet`, `social-digest`, `analysis`, `atom`, `concept`, `source`, `deal`, `email`, `slack`, `writing`, `project`, `note`다. 서로 겹치지 않으면서 빠짐이 없도록 정리한 분류라고 README는 설명한다.

자체 pack을 만드는 절차는 세 명령이다. `gbrain schema detect`가 실제 파일 구조를 타입 후보로 클러스터링하고, `gbrain schema suggest`가 그 후보에 LLM 패스를 적용하며, `gbrain schema review-candidates --apply`가 사람이 고른 것만 승격한다. 이 밖에 `gbrain schema active`는 지금 어느 pack이 어느 단계에서 설정됐는지 보여주고, `gbrain schema list`는 번들된 pack과 설치된 pack을 나열한다.

활성 pack은 읽기와 쓰기 경로 전체를 관통한다.

| 지점 | pack이 관여하는 방식 |
|---|---|
| `parseMarkdown` | pack이 선언한 경로 접두사로 페이지 타입을 추론한다 |
| `whoknows` | `expert_routing: true`로 선언된 타입에만 전문가 라우팅을 적용한다 |
| `extract_facts` | `extractable: true` 타입에서만 실행된다 |
| 검색 캐시 | 캐시 키에 pack 이름과 버전을 접어 넣어 pack 사이 오염이 구조적으로 불가능하게 한다 |

pack을 바꾸면 brain이 스스로를 다시 해석하고, 되돌리면 잃는 것이 없다. 어느 pack을 쓸지는 7단계 순서로 결정된다. per-call 플래그, 환경 변수, source별 데이터베이스 키, brain 전역 데이터베이스 키, `gbrain.yml`, `~/.gbrain/config.json`, 그리고 `gbrain-base` 기본값 순이다.

v0.40.7.0부터는 사람이 아니라 에이전트가 이 스키마를 바꿀 수 있다. `gbrain schema` CLI 동사 14개와 배치 MCP op `schema_apply_mutations`가 제공되며, 이 op는 admin scope를 요구하되 localOnly가 아니라서 원격 에이전트도 HTTPS로 접근한다. 안전 장치로는 atomic file lock, 에이전트 신원이 남는 audit log, 동시 writer를 막지 않는 1,000행 단위 chunked UPDATE backfill이 붙는다.

### retrieval 구성

retrieval은 여러 층을 겹쳐 점수를 매긴다. 기본 층은 pgvector의 HNSW vector 검색, BM25 keyword 검색, 두 결과를 합치는 reciprocal-rank fusion, source-tier boost, 그리고 의도를 반영해 질의를 다시 쓰는 intent-aware query rewriting이다.

비용과 품질의 조절값은 개별 설정이 아니라 세 가지 이름 있는 mode로 묶여 있다. README는 각 mode의 세부 값을 본문에 적지 않고 `docs/eval/SEARCH_MODE_METHODOLOGY.md`의 비용과 재현율 비교로 넘긴다.

| search mode | README가 밝힌 내용 |
|---|---|
| `conservative` | 세 mode 중 하나라는 것 외에 본문 서술이 없다 |
| `balanced` | 기본값이며 ZeroEntropy reranker를 켠 상태다 |
| `tokenmax` | ZeroEntropy `zerank-2` 호스팅 reranker가 기본으로 적용되는 mode로 소개된다 |

reranker에 대한 두 서술은 서로 어긋난다. 기본값 `balanced`가 이미 ZeroEntropy reranker를 켠 상태라고 적으면서, 통합 목록에서는 `zerank-2`를 `tokenmax` mode의 기본값으로 소개한다. 실제 적용 범위는 README만으로 확정되지 않는다.

여기에 질의마다 발동하는 graph signal 세 가지가 더해진다.

| 신호 | 발동 조건 | 효과 |
|---|---|---|
| adjacency boost | 상위 결과가 바로 그 질의에 대해 hub일 때 | 점수를 올린다 |
| cross-source boost | 여러 팀 brain에서 교차 확인될 때 | 점수를 올린다 |
| session demote | 수다스러운 세션에서 나온 약한 chunk가 자리를 차지할 때 | 점수를 내린다 |

점수 산출은 관측 가능하게 만들어져 있다. `gbrain search "<query>" --explain`은 단계별 기여를 보여준다. 기본 점수가 얼마였는지, 어떤 boost가 발동했는지, 그 boost가 무엇을 곱했는지가 나온다. `gbrain doctor`에는 `graph_signals_coverage` 검사가 있고, `gbrain search stats`는 신호별 발동 횟수와 실패 분해를 보여준다. 특정 페이지가 왜 나오지 않는지 추적할 때는 `gbrain search diagnose "<query>" --target <slug>`가 어느 retrieval 층이 그 페이지를 표면화하거나 놓치는지 알려준다.

세부 규칙 세 가지가 실무에서 자주 문제가 되는 지점을 겨냥한다.

- **페이지 단위 pooling**: vector retrieval이 페이지마다 가장 좋은 chunk를 모아 점수를 낸다. 한 chunk가 약하다는 이유로 이웃 페이지에 밀리는 대신, 페이지가 가장 강한 근거로 표면화된다.
- **이름을 부르는 질의**: 페이지 제목 문구나 선언된 free-text alias에 맞는 질의는 그 페이지로 boost된다. 기존 페이지의 alias는 `gbrain reindex --aliases`로 backfill한다.
- **에이전트가 쓰는 힌트**: 모든 결과에 왜 매치됐는지 알리는 `evidence` 태그와 `exists`, `probable`, `unknown` 중 하나인 `create_safety` 힌트가 붙는다. 에이전트가 raw score를 보고 추측하는 대신 페이지가 이미 있는지 판단하라는 설계다.

### self-wiring knowledge graph

graph는 별도의 추출 단계가 아니라 쓰기 경로 안에 들어 있다. 모든 `put_page`가 markdown, wikilink, typed-link 문법에서 entity 참조를 뽑아 edge를 기록하며, 이 과정에 LLM 호출이 하나도 없다. 대용량 ingest에서도 graph 유지 비용이 토큰 비용으로 번지지 않는 이유다.

README는 vector 검색과 graph의 역할을 한 문장으로 구분한다. vector 검색은 의미적으로 가까운 chunk를 돌려주고, graph는 사실로 연결된 chunk를 돌려준다는 것이다. hybrid retrieval은 양쪽에서 함께 끌어오고, 모든 write에서 실행되는 auto-link가 graph를 최신으로 유지한다.

여러 단계를 건너가는 질의는 `gbrain graph-query`로 처리한다. "Acme AI에서 일하는 사람이 누구인가", "Bob이 이번 분기에 어디에 투자했는가" 같은 질문이 vector 검색만으로는 닿기 어려운 예로 제시된다.

Obsidian에서 옮겨온 vault에는 별도 설정이 필요하다. `[[struktura]]`처럼 폴더를 명시하지 않은 wikilink가 실제로는 `projects/struktura.md`를 가리키는 경우인데, 이 basename 해석은 `gbrain config set link_resolution.global_basename true`로 켜야 동작한다. 기본값은 꺼짐이고, 켜기 전에 `gbrain doctor`가 몇 개의 edge를 새로 얻게 되는지 알려준다.

### brain layer와 gap analysis

질의 경로는 세 가지로 나뉜다. 무엇이 필요한지에 따라 고르는 구조다.

| 명령 | 반환물 | 비용 | 쓰임 |
|---|---|---|---|
| `gbrain search` | hybrid score 상위 페이지 목록 | LLM 비용 없음 | 에이전트 컨텍스트 채우기, 인용 조회, 특정 문구 찾기 |
| `gbrain think` | 같은 retrieval 위에 합성한 답변과 인용, gap analysis | LLM 호출 있음 | 답 자체가 필요한 질의 |
| `gbrain agent run` | 같은 표면을 Minions 큐의 서브에이전트에 노출 | crash safe two-phase persistence | 오래 걸리는 작업 |

gap analysis가 이 층의 차별점으로 지목된다. 답변이 사용자에게 알리는 것은 네 가지다. 페이지가 오래됐을 때, claim에 인용이 없을 때, 두 페이지가 서로 모순될 때, 그리고 아직 채워지지 않은 구멍이 있을 때다.

README는 brain layer를 `find_trajectory`와 함께 쓰는 조합을 복리 효과의 예로 든다. 회사 지표가 어떻게 변했는지, 팀이 지금 어떤 모습인지, 무엇을 약속하고 공유했는지, 마지막으로 언제 만났는지, 여기서 줄 수 있는 value-add가 무엇인지를 한 번에 점수와 인용이 붙은 형태로 답한다는 것이다.

### Minions 작업 큐

Minions는 BullMQ 모양을 따르되 Postgres 네이티브로 만든 job queue다. BullMQ 계열이 보통 별도 Redis를 두는 것과 달리 작업 상태가 brain과 같은 데이터베이스에 남는다. README는 이 큐가 "서브에이전트를 fire-and-forget Promise로 띄우는" 방식을 대체한다고 설명한다.

| 기능 | 내용 |
|---|---|
| durable subagent | LLM tool loop이 crash를 넘겨 살아남는다. two-phase `pending`에서 `done`으로 가는 persistence를 쓴다 |
| shell job | 실행 기록이 audit로 남는다 |
| child job | 상위 작업의 timeout이 하위로 연쇄된다 |
| rate lease | outbound provider 호출량을 배분한다 |
| attachment | S3와 Supabase storage를 쓴다 |

### 43개 스킬

지능을 실행기가 아니라 markdown 파일에 두는 태도가 `docs/ethos/`의 "thin harness, fat skills"다. 스킬 라우팅은 `skills/RESOLVER.md`에 있고, 커버하는 영역은 signal capture, ingest(아이디어, 미디어, 회의), enrichment, querying, brain ops, 인용 수정, 일일 작업 관리, cron 스케줄링, 리포트, voice, soul audit, 스킬 작성, eval 프레임워크, 마이그레이션이다.

스킬이 평문 markdown이고 특정 도구에 묶여 있지 않다는 점이 중요하다. 설치기가 43개를 하나의 skillpack으로 묶어 에이전트 workspace에 넣으며, 운영자는 필요한 스킬을 고쳐 쓸 수 있다.

### 데이터 유입 경로

ingest는 명령 하나로 통일돼 있고, 어느 형태로 부르든 페이지가 데이터베이스와 디스크에 한 번에 안착한다.

```bash
gbrain capture "the thought I want to remember"
gbrain capture --file ./notes/today.md
echo "from a pipe" | gbrain capture --stdin
SLUG=$(gbrain capture "..." --quiet)
```

기본 slug는 `inbox/YYYY-MM-DD-<hash8>`다. 캡처가 예측 가능한 triage 위치에 모이게 하려는 규칙이다. thin client 설치에서는 같은 동사가 MCP를 거쳐 서버로 라우팅되며 명령과 사용 경험은 동일하다.

| 경로 | 방식 |
|---|---|
| CLI | `gbrain capture`의 인자, `--file`, `--stdin` |
| webhook | `POST /ingest`에 Bearer 토큰과 `Content-Type: text/markdown`. Zapier, IFTTT, Apple Shortcuts 대상 |
| 모바일 | inbox 폴더 소스가 `~/.gbrain/inbox/`에 떨어진 파일을 집어 올린다. iOS Shortcuts, AirDrop, Drafts, Finder |
| 서드파티 | `gbrain/ingestion`의 버전 관리되는 `IngestionSource` 계약에 맞춘 skillpack. Granola, Linear, voice, OCR이 예로 제시된다 |

### 설치 경로

설치는 사람이 아니라 에이전트가 수행하는 것을 기본으로 설계됐다. README가 제시하는 네 경로는 목적이 다르다.

| 경로 | 절차 | 소요 |
|---|---|---|
| 에이전트가 설치 | OpenClaw 또는 Hermes를 띄운 뒤 `INSTALL_FOR_AGENTS.md` URL을 붙여넣는다. 에이전트가 설치, brain 생성, API 키 질문, 43개 스킬 로드, dream cycle 설정, 종단 검증까지 수행한다 | 약 30분 |
| 코딩 에이전트에 메모리만 | `gbrain init --pglite` 뒤 `claude mcp add gbrain -- gbrain serve` 또는 `codex mcp add gbrain -- gbrain serve` | 명령 2개 |
| 원격 brain에 연결 | `gbrain connect https://your-host/mcp --token gbrain_xxx --install`. Codex는 `--agent codex`를 붙인다. `--install`이 설정과 토큰 확인까지 한다 | 명령 1개 |
| CLI 단독 | `bun install -g github:garrytan/gbrain` 뒤 `gbrain init --pglite`, `gbrain doctor`, `gbrain import ~/notes/`, `gbrain query "..."` | init 2초 |

에이전트 설치 경로는 HTTPS로 파일을 읽고 shell 명령을 실행할 수 있는 에이전트면 동작한다. README는 Codex, Claude Code, Claude Cowork, Cursor, AlphaClaw에서 검증했다고 적는다. 에이전트 플랫폼을 써 본 적이 없는 사용자를 위해 personal-brain 튜토리얼이 플랫폼 선택부터 첫 질의 검증까지를 따로 안내한다.

### MCP 서버와 클라이언트

GBrain은 MCP로 30개가 넘는 도구를 노출한다. 서버는 두 가지 모습으로 실행된다.

| 명령 | 형태 | 용도 |
|---|---|---|
| `gbrain serve` | stdio MCP. 로컬 하위 프로세스 | Claude Code, Cursor, Windsurf |
| `gbrain serve --http` | OAuth 2.1과 `/admin` 대시보드를 갖춘 HTTP MCP | Claude Desktop, Cowork, Perplexity, ChatGPT |

HTTP 서버에는 DCR 방식 client registration, `read`와 `write`와 `admin`으로 나뉜 scope 게이트, rate limit이 포함된다. ngrok, Railway, Fly.io 배포 가이드는 `docs/mcp/`에 있다.

클라이언트별 설정은 인증 방식에 따라 갈린다.

| 클라이언트 | 방식 | 특이점 |
|---|---|---|
| Claude Code | `claude mcp add gbrain -- gbrain serve` | 서버도 토큰도 터널도 필요 없다 |
| Codex | `gbrain connect ... --agent codex` | bearer를 런타임에 `$GBRAIN_REMOTE_TOKEN`에서 읽어 토큰이 설정 파일에 남지 않는다 |
| Cursor, Windsurf | MCP 설정에 `{"command": "gbrain", "args": ["serve"]}` 추가 | stdio 클라이언트의 공통 형태다 |
| Claude Desktop (Cowork) | Settings의 Integrations에 HTTP 서버 URL 추가 | 원격 전용이다. 로컬 `claude_desktop_config.json`은 원격 서버에 동작하지 않는다 |
| Claude Cowork (team plan) | 조직 Owner가 Organization Settings의 Connectors에 추가 | |
| Perplexity Computer | `--oauth --register`가 최소 권한 OAuth client를 발급하고 Issuer, Client ID, Secret을 출력한다 | Pro 구독이 필요하다 |
| ChatGPT | PKCE를 동반한 OAuth 2.1이 필수 요건이다 | admin 대시보드에서 grant type `authorization_code`로 `chatgpt` client를 등록한다 |

### 통합 카탈로그

외부 데이터를 brain으로 넣는 경로는 recipe로 관리된다. recipe는 markdown과 설정 힌트로 이루어져 `recipes/`에 실리며 `gbrain integrations list`로 찾는다.

| 분류 | 내용 |
|---|---|
| Voice | Twilio와 OpenAI Realtime을 조합해 전화 통화가 brain 페이지가 된다. STT, LLM, TTS를 직접 조합하는 방식도 지원한다 |
| Email, calendar | brain signal로 라우팅하는 webhook 핸들러 |
| 임베딩 provider 16종 | OpenAI(기본 fallback), OpenRouter, Voyage, ZeroEntropy(기본), Google Gemini, Azure OpenAI, MiniMax, Alibaba DashScope, Zhipu, Ollama(로컬), llama.cpp llama-server(로컬), LiteLLM proxy. 가격 행렬과 결정 트리가 함께 제공된다 |
| Reranker | ZeroEntropy `zerank-2` 호스팅과 v0.40.6.1의 `llama-server-reranker` recipe. 후자는 llama.cpp로 Qwen3-Reranker나 self-hosted ZeroEntropy 가중치를 같은 `gateway.rerank()` seam에 연결해 완전 로컬 cross-encoder rerank를 수행한다 |
| Credential gateway | vault를 인식하는 secret 배포 |
| MCP 클라이언트 | 주요 MCP 클라이언트 전부 |

### 스킬 자동 개선

스킬이 markdown 파일이라는 점은 그 파일을 학습 대상으로 다룰 수 있다는 뜻이기도 하다. `gbrain skillopt`는 `SKILL.md`를 학습 가능한 파라미터로 놓고 다음 순서로 개선한다.

1. `--bootstrap-from-skill`로 그 스킬에서 곧바로 시작용 벤치마크를 만든다. 직접 작성한 벤치마크를 써도 된다.
2. 채점을 담당하는 judge를 강화한다.
3. optimizer가 편집안을 제안하면 점수가 실제로 오른 것만 남긴다.

README는 이 절차를 약 20분에 API 호출 약 $1로 잡는다. 플래그와 비용, 안전 장치 기준은 `docs/guides/skillopt.md`에 있다. 사람이 문체를 다듬는 대신 측정 가능한 점수로 스킬을 고른다는 점에서, 지능을 markdown에 두는 설계가 어디까지 이어지는지를 보여주는 사례다.

### 문서 지도와 에이전트 진입점

설치와 운영을 에이전트가 맡는 설계이므로 문서 구조도 사람과 에이전트를 나누어 놓았다.

| 파일 또는 디렉토리 | 대상과 내용 |
|---|---|
| `llms.txt` | LLM이 읽는 문서 지도 |
| `llms-full.txt` | 같은 지도에 핵심 문서를 인라인으로 넣어 한 번의 fetch로 받게 한 것 |
| `AGENTS.md` | Claude 계열이 아닌 에이전트의 진입점 |
| `CLAUDE.md` | Claude Code용 진입점. 저장소 운영 컨텍스트를 깊게 담는다 |
| `INSTALL_FOR_AGENTS.md` | 에이전트가 따라 실행하는 설치 규약 |
| `docs/architecture/` | 시스템 설계, 배치 형태, retrieval 이론 |
| `docs/guides/` | 서브에이전트 라우팅, minion 배치, 스킬 개발, brain-first lookup 같은 운영 절차 |
| `docs/eval/` | eval 프레임워크, 지표 용어집, 방법론 |
| `docs/ethos/` | thin harness, fat skills를 비롯한 설계 철학과 기원 |
| `SECURITY.md` | OAuth 위협 모델과 강화 기본값 |

에이전트에게 URL 하나를 붙여넣는 것만으로 설치가 진행되는 구조는 이 문서 배치에 기대고 있다. 사람이 읽는 튜토리얼과 에이전트가 실행하는 규약이 같은 저장소 안에서 분리돼 있기 때문이다.

### company brain

개인 brain과 같은 구조를 팀 단위로 확장한 것이 company brain이다. 팀원마다 login으로 범위가 정해진 brain 조각을 갖고, 질의하면 허용된 것만 보인다. 다른 사람의 노트나 다른 팀의 데이터는 결과에 포함되지 않는다.

권한 격리는 개별 API가 아니라 읽기 경로 전체를 대상으로 검증했다고 README가 밝힌다. search, list, lookup, multi-source read를 포함해 brain을 읽는 모든 방식에 fuzz test를 적용했고 누출은 0건이었다는 서술이다. 저자는 이 형태를 YC가 Request for Startups에 올린 company-brain 항목에 대응시키며, 그 영역에서 창업할 계획이라면 GBrain 위에 지으라고 권한다. 설정 절차는 10명에서 50명 규모 팀을 대상으로 한 90분짜리 튜토리얼로 따로 문서화돼 있다.

### 계보와 크레딧

README 마지막 절은 이 시스템이 혼자 만들어진 것이 아님을 밝힌다. 라이선스는 MIT이고, 저자는 GBrain을 자신의 OpenClaw와 Hermes 배치를 운영하기 위해 만든 production brain으로 다시 한번 규정한다. 기원에 대한 서술은 `docs/ethos/ORIGIN.md`에 있다.

| 대상 | 기여 내용 |
|---|---|
| ZeroEntropy | 기본으로 실리는 임베딩과 reranker 스택 |
| Voyage AI | 비대칭 인코딩 recipe 템플릿 |
| Ramp Labs | 검색 품질 개선의 계보 |
| community 기여자 | 릴리스별로 `CHANGELOG.md`에 기록되며 `Co-Authored-By:` trailer로 표기가 유지된다 |

개발 쪽 검증 절차도 세 단계로 나뉜다. `bun run test`가 빠른 반복용이고, `bun run verify`가 push 전 게이트이며, `bun run ci:local`이 Docker 기반 CI 스택 전체를 로컬에서 실행한다.

## 결과

### BrainBench

자체 벤치마크인 BrainBench는 Opus로 생성한 240페이지 rich-prose 코퍼스를 쓴다. 개인 brain이 실제로 담는 종류의 서술형 문서를 모사한 코퍼스다.

| 구성 | P@5 | R@5 |
|---|---|---|
| 전체 시스템 | 49.1% | 97.9% |
| graph 레이어를 끈 변형 | 전체 시스템 대비 31.4%p 낮음 | 보고 없음 |
| ripgrep 기반 BM25와 vector-only RAG | 비슷한 폭으로 낮음 | 보고 없음 |

P@5는 상위 5건 중 관련 문서의 비율이고 R@5는 관련 문서를 상위 5건 안에서 얼마나 회수했는지를 나타낸다. 두 수치를 함께 보면 이 시스템의 성격이 드러난다. R@5 97.9%는 필요한 문서가 거의 언제나 상위 5건 안에 들어온다는 뜻이고, P@5 49.1%는 그 5건의 절반가량이 관련 문서라는 뜻이다. 답을 합성하는 층이 위에 놓인 구조에서는 회수율이 먼저 확보되어야 한다.

31.4%p라는 차이가 이 저장소가 내세우는 핵심 근거다. hybrid retrieval에 graph를 더한 것이 vector 단독 대비 성능을 끌어올린 최대 요인이며, 같은 폭이 ripgrep 기반 BM25 조합에 대해서도 유지된다. scorecard 전문은 자매 저장소 `gbrain-evals`에 공개돼 있다.

### 평가 프레임워크

벤치마크 하나가 아니라 목적이 다른 여러 eval이 CLI 하위 명령으로 붙어 있다.

| 명령 | 내용 |
|---|---|
| `gbrain eval longmemeval` | 공개 LongMemEval 벤치마크를 자기 hybrid retrieval에 실행한다. README에 점수는 적혀 있지 않다 |
| `gbrain eval export`, `gbrain eval replay` | 실제 질의를 캡처해 코드 변경에 재생한다. `GBRAIN_CONTRIBUTOR_MODE=1`이 필요하다 |
| `gbrain eval cross-modal` | 서로 다른 provider의 frontier 모델 3개로 출력을 과제에 대해 교차 확인한다 |
| `gbrain eval retrieval-quality` | NamedThingBench를 실행해 title-substring, alias-synonym, generic-to-named, multi-chunk-dilution 네 계열을 hard gate한다. 회귀가 생기면 CI가 크게 실패한다 |
| `gbrain eval suspected-contradictions` | retrieval 쌍을 sampling하고 계층적 날짜 pre-filter를 적용한 뒤 query-conditioned LLM judge와 영속 캐시로 판정한다. 에이전트가 쓴 견해와 fact 사이의 충돌을 드러내며 daily dream cycle에 연결돼 있다 |

`gbrain eval replay`가 흥미로운 이유는 평가 대상이 합성 코퍼스가 아니라 실제 사용 기록이라는 점이다. 코드가 바뀔 때마다 과거의 실제 질의를 다시 실행해 회귀를 확인하는 구조이며, NamedThingBench의 hard gate와 함께 retrieval 품질을 CI에서 붙잡아 두는 역할을 한다.

### 운영 관련 수치

| 항목 | 값 |
|---|---|
| Tan 본인 brain 규모 | 146,646 페이지, 24,585명, 5,339개 회사, 자율 cron job 66개 |
| PGLite 초기화 | 2초 |
| PGLite 권장 상한 | 약 5만 페이지 |
| MCP 노출 도구 | 30개 이상 |
| `BrainEngine` 연산 | 약 47개 |
| 번들 스킬 | 43개 |
| company brain 권한 fuzz test | 누출 0건 |
| 에이전트 설치 소요 | 약 30분 |

## 한계

### 문서가 스스로 남긴 유보

README는 릴리스 노트를 인용하며 미완인 부분을 함께 밝힌다.

- **cron sync의 부분 완료**: v0.41.13.0의 `--timeout`이 import 도중 발동하면 `gbrain sync`가 status `partial`로 exit 0을 내고 `last_commit`은 그대로 둔다. 다음 실행이 같은 diff를 다시 걷고 `content_hash`가 이미 처리된 파일을 단축한다. 이 설계에서 extract와 embed 단계는 끝까지 실행되며, full sync 트리거는 v0.42 이후로 미뤄져 있다. `--max-age`는 마이그레이션 v98 이후 30분의 rollout window를 갖는다.
- **태그 제거가 반영되지 않는 트레이드오프**: v0.41.37.0이 태그 조정을 추가 전용으로 바꾼 결과, frontmatter에서 태그를 지워도 다음 sync에서 데이터베이스의 태그가 사라지지 않는다. 이를 구분하려면 provenance 컬럼이 필요해 미뤘다고 적혀 있다.
- **Obsidian basename 해석은 기본 꺼짐**: 폴더를 가로지르는 bare wikilink 해석은 사용자가 명시적으로 켜야 동작한다. 기본값에서는 그런 링크가 edge로 잡히지 않는다.

### 운영에서 드러난 실패 유형

troubleshooting 절은 분량이 가장 큰 절이며, 실제 운영에서 나온 실패를 증상 단위로 기록한다. 이 목록 자체가 시스템의 난이도를 보여주는 자료다.

| 증상 | 원인과 대응 |
|---|---|
| `gbrain import`가 `expected N dimensions, not M`으로 실패 | 임베딩 차원 불일치다. `gbrain doctor`가 필요한 `gbrain config set` 또는 `gbrain retrieval-upgrade` 명령을 정확히 출력하며 `~/.gbrain`을 지울 필요는 없다. 새 `gbrain init --pglite`는 환경의 API 키에서 provider를 자동 감지하고, 키가 여러 개면 대화형 선택기가 뜨며, 키가 없는 비대화형 환경(CI, Docker)에서는 exit 1과 붙여넣기용 힌트를 낸다 |
| federated brain에서 매시간 cron sync가 타임아웃 | v0.41.13.0이 플래그 2개와 권장 패턴을 제공한다. `gbrain sync --break-lock --all --max-age 1800`을 먼저 실행하고, source별로 `timeout 600 gbrain sync --source "$src" --timeout 540` 루프를 실행한다. `--max-age`는 v98의 `last_refreshed_at` 의미를 쓰므로 살아 있는 장기 실행 holder를 건드리지 않는다 |
| Supabase에서 dream cycle이 wiki 링크를 조용히 잃음 | Supavisor pooler의 순간 장애다. v0.41.19.0이 `addLinksBatch`, `addTimelineEntriesBatch`, `upsertChunks` 벌크 write를 자체 재시도한다. 최악 12초 대기로 5초에서 10초에 이르는 circuit breaker 복구 구간을 덮는다. 기본값은 재시도 3회, base 1초, 최대 10초이며 decorrelated jitter를 쓴다. `gbrain doctor`의 `batch_retry_health` 검사가 최근 24시간 기록을 읽는다. PGLite 전용 설치는 pooler가 없어 비용이 0이다 |
| dream cycle이 실행마다 링크 행 약 150개를 잃고 `No database connection` 오류 | v0.41.27.0이 `withRetry`에 `reconnect` 콜백을 추가해 무효화된 데이터베이스 싱글턴에서 자체 복구한다. 같은 릴리스에서 `gbrain capture`가 CLI 종료 뒤 background worker 때문에 남기던 stderr도 없앴다 |
| `gbrain brainstorm`이 `judge_failed: true`와 채점 결과 0개 | v0.41.21.0이 버그 두 개를 닫았다. judge의 출력 상한이 4,000 토큰으로 고정돼 있어 아이디어가 약 40개를 넘으면 JSON이 중간에 끊겨 파서가 예외를 냈고, 가격 조회가 콜론 형식만 매치해 슬래시 형식 모델 이름이 `BudgetExhausted reason=no_pricing`으로 실패했다 |
| `gbrain reindex --markdown`이 자동 생성 태그를 지움 | v0.41.37.0이 태그 조정을 추가 전용으로 바꿨다. 데이터베이스 전용 fallback도 re-chunk 전에 frontmatter, 본문, timeline을 포함한 markdown 전체를 재구성한다 |
| 큰 brain에서 `gbrain sync`가 멈춤 | `GBRAIN_SYNC_TRACE=1`로 마지막 `[sync] begin import:` 줄을 찾아 멈춘 파일을 특정한다. schema pack `inference.regex`의 catastrophic backtracking이 의심되면 `--no-schema-pack`으로 완료한다. `gbrain schema lint`가 `(a+)+` 같은 중첩 수량자 형태를 경고하고 런타임이 입력 길이를 제한한다. PGLite brain에서는 큰 sync 전에 `gbrain serve`를 멈춰야 한다. PGLite는 단일 writer라 살아 있는 MCP 서버가 write lock을 두고 경합한다 |
| Windows에서 스키마 마이그레이션이 `getaddrinfo ENOTFOUND`로 실패 | v0.41.37.0이 9개 bring-up 단계를 자식 프로세스 대신 in-process로 실행한다. Windows와 bun과 Supabase pooler 조합에서 자식 프로세스만 DNS 해석에 실패했다. 82,000 페이지 PGLite brain에서 70분 넘게 멈추던 v0.13.1 마이그레이션도 chunked bulk SQL 패스로 바뀌어 1초에서 2초 만에 끝난다 |

개별 버그보다 반복되는 유형이 중요하다. 대형 brain에서 sync가 멈추는 문제, 원격 Postgres pooler의 불안정이 조용한 데이터 손실로 이어지는 문제, PGLite의 단일 writer 제약이 서버와 경합하는 문제가 각각 여러 릴리스에 걸쳐 등장한다. 이 시스템을 실제로 운영하려면 `gbrain doctor`의 검사 항목과 `~/.gbrain/audit/` 아래 감사 로그를 읽을 줄 알아야 한다.

### 기여 절차상의 제약

외부 기여는 즉시 반영되지 않는다. community PR은 하나씩 merge하지 않고 release wave 단위로 묶이며, 기여자 표기는 `Co-Authored-By:` trailer로 유지되고 릴리스별로 `CHANGELOG.md`에 기록된다.

변경 범위에 따라 절차도 갈린다. 오타, 문서 버그, 명백한 회귀 같은 빠른 수정만 바로 PR로 갈 수 있고, schema와 retrieval ranking과 MCP 프로토콜과 보안 경계를 건드리는 변경은 PR 전에 이슈에서 설계 논의를 거쳐야 한다.

### 자료 자체의 한계

README 안에서 기본 페이지 타입 개수가 서로 다르게 적혀 있다. schema pack 절은 v0.41.22부터 기본값이 15종 `gbrain-base-v2`이고 legacy가 24종이라고 밝히는데, v0.40.7.0을 소개하는 문단은 "기본값은 22종 universal type을 제공한다"고 적는다. 릴리스가 달라 생긴 서술로 보이지만 README만으로는 확정되지 않는다.

이 페이지의 근거는 README 전문 하나다. 저장소 코드를 직접 읽고 검증한 결과가 아니므로, 성능 수치와 fuzz test 결과는 저자의 자기 보고다. BrainBench 코퍼스와 평가 코드가 `gbrain-evals`에 공개돼 있다는 점은 재현 가능성 측면에서 근거를 보태지만, 그 저장소 자체는 본 wiki에 수집돼 있지 않다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| brain repo | 사용자가 git으로 소유하는 평문 markdown 디렉토리. README가 system of record로 부르는 지식의 원본이다 |
| brain layer | retrieval 결과 위에서 인용과 gap analysis가 붙은 답을 합성하는 층. `gbrain think`가 진입점이다 |
| gap analysis | 답변에 함께 붙는, brain이 아직 모르는 것에 대한 서술. 오래된 페이지, 인용 없는 claim, 페이지 간 모순, 비어 있는 구멍을 알린다 |
| typed edge | LLM 호출 없이 추출되는 관계. `works_at`, `invested_in`, `attended`, `founded`, `advises`, `mentions` 등이다 |
| schema pack | brain의 페이지 타입, 링크 타입, 자동 추출 대상 fact를 선언한 묶음. 기본값은 `gbrain-base-v2`다 |
| dream cycle | 야간 cron으로 수행되는 enrichment, 인용 수정, salience 채점, 모순 탐지, 다음 날 준비 묶음 |
| PGLite | WASM으로 컴파일된 Postgres 17. 서버 없이 파일 기반으로 동작하는 GBrain의 기본 엔진이다 |

## 관련 페이지

- [[applications/garrytan-gbrain-tutorials]]: 같은 저장소의 `docs/tutorials/`를 정리한 페이지. 이 페이지가 구조와 동작을 다룬다면 튜토리얼 페이지는 개인 brain, company brain, skillopt, 코딩 에이전트 연결을 시간과 비용 예산과 함께 절차로 다룬다.
- [[applications/tilnote-2026-gbrain-repository-core-summary]]: 저장소를 계약 우선 설계와 thin harness, fat skills 두 관점으로 읽은 한국어 정리. 버전이 자라온 순서를 하나의 흐름으로 보여준다.
- [[applications/xguru-2026-gbrain-open-source-personal-knowledge]]: GeekNews에 올라온 한국어 소개글. 이 저장소를 처음 접할 때 읽을 짧은 개괄이다.
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]]: 5분 45초짜리 소개 영상을 정리한 페이지. 3계층 멘탈 모델과 데이터베이스 primitive, sync 검증 절차를 다룬다.
- [[applications/vectorize-2026-gbrain-review-honest-assessment]]: 외부 평가. 10개 항목 scorecard와 강점, 약점, 대안 비교가 여기에 있다. 이 페이지가 다루지 않는 판단은 그 페이지가 담당한다.
- [[applications/mantena-2026-hermes-gbrain-setup-vps]]: Hermes와 GBrain을 VPS에 올리는 실전 셋업 기록.
- [[applications/gajjar-2026-gbrain-vs-computer-memory]]: 개인 메모리와 엔터프라이즈 메모리를 비교한 에세이. 공유 범위와 권한 모델의 차이를 다룬다.
- [[applications/liu-2026-rag-llm-wiki-or-gbrain]]: RAG, LLM Wiki, GBrain 중 무엇을 고를지 판단하는 결정 프레임워크.
- [[applications/kmyu-2026-llm-wiki-pattern-synthesis]]: Karpathy의 LLM Wiki 패턴을 합성한 페이지. GBrain이 확장한 원형에 해당한다.
