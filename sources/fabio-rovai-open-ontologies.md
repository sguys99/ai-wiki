---
title: "Open Ontologies"
type: repo
year: 2026
category: applications
raw_path: raw/repos/fabio-rovai-open-ontologies.md
raw_filename: "fabio-rovai-open-ontologies.md"
source_collection: external
org: "fabio-rovai"
repo: "open-ontologies"
url: "https://github.com/fabio-rovai/open-ontologies"
license: "MIT"
tags:
  - ontology
  - owl
  - knowledge-graph
  - reasoning
  - formal-verification
  - lean4
  - certificate
  - mcp
  - rust
  - sparql
  - shacl
  - ontology-lifecycle
figures:
  - id: fig01
    file: assets/fabio-rovai-open-ontologies/demo-certify.svg
    raw: https://raw.githubusercontent.com/fabio-rovai/open-ontologies/main/docs/assets/demo-certify.svg
    caption: "supplier 예제의 certificate 검사와 위조 거부. 왼쪽 터미널은 oo-horn check가 asserted 3건과 derivations 3건을 entailed로 승인하고 exit 0을 내는 장면이고, 이어서 결론 한 줄만 바꾼 forged.tsv에 exit 1을 내며 rdfs9를 지목한다. 오른쪽 그래프는 같은 추론을 ex:Northwind에서 ex:NeedsEnhancedDueDiligence까지 보여 준다"
    strategy: manual
    curated: true
  - id: fig02
    file: assets/fabio-rovai-open-ontologies/certified-claims.svg
    raw: https://raw.githubusercontent.com/fabio-rovai/open-ontologies/main/docs/assets/certified-claims.svg
    caption: "신뢰에만 기대 왔던 세 가지 주장을 실제 실행과 대조한 그림. crosswalk의 exactMatch가 relatedMatch로 내려가며 carry되지 않는 term 하나를 지목하고, 모듈별 추론이 3개 중 2개에서 성립하는 사실 1건을 가려내며, 행렬 곱이 MatCert.mul_of_check로 재계산되는 경우와 Freivalds 확률 보증에 머무는 경우를 비용과 verdict로 나눈다"
    strategy: manual
    curated: true
  - id: fig03
    file: assets/fabio-rovai-open-ontologies/hqdm-audit.svg
    raw: https://raw.githubusercontent.com/fabio-rovai/open-ontologies/main/docs/assets/hqdm-audit.svg
    caption: "HQDM 표준이 배포하는 두 파일을 같은 검사로 감사한 결과. 왼쪽 RDFS 파일(1,094 triple, 선언 class 210개)은 선언되지 않은 term 23개와 relation을 range로 지목한 선언 12개를 안고 있고, 오른쪽 OWL 파일(3,127 triple, 선언 class 234개)은 세 검사를 통과하지만 이 엔진이 satisfiable로 판정한 named class 195개 외에 판정 불가 39개를 남기며 HermiT는 그 39개를 unsatisfiable이라 부른다"
    strategy: manual
    curated: true
  - id: fig04
    file: assets/fabio-rovai-open-ontologies/knowledge-graph.webp
    raw: https://raw.githubusercontent.com/fabio-rovai/open-ontologies/main/docs/assets/knowledge-graph.webp
    caption: "ies-core.ttl을 손그림 애니메이션으로 옮긴 표지 도해. 사람이 주장한 edge 426건이 회색, 엔진이 유도한 edge 259건이 녹색으로 나타나고 certificate 하나가 그 259건을 묶어 Lean 4 checker 한 번의 실행으로 승인되며, 위조한 red edge 1건은 거부되고 규칙 이름이 호출된다"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

Open Ontologies는 production ontology에 들어갈 변경을 적용 전에 계획하고, 그 변경이 shape이 아니라 의미를 어떻게 바꾸는지 보고하며, 엔진이 유도한 결론을 Lean 4로 검사되는 certificate로 남겨 제3자가 엔진 없이 재검증하게 하는 Rust 단일 바이너리다.

## 1. 자료 정보 (Document Information)

- **저장소**: [fabio-rovai/open-ontologies](https://github.com/fabio-rovai/open-ontologies)
- **라이선스**: MIT. README의 License 절이 "MIT"를 본문으로 못박고 있어 raw frontmatter의 `license:` 값과 일치한다
- **수집 시점 규모**: GitHub API 기준 star 752, fork 95, 생성 2026-03-09, 기본 브랜치 main, 최신 커밋 9b2dfc24ebeb (2026-10-01)
- **주 언어와 배포 형태**: Rust edition 2024, 단일 바이너리. macOS aarch64와 Linux x86_64 릴리스 바이너리, GHCR 컨테이너 이미지, `cargo build --release`(Rust 1.85 이상) 네 경로를 README가 제시한다
- **운영 주체**: Fabio Rovai가 [Tesseract Semantics](https://tesseractsemantics.com)에서 유지한다. README는 엔진이 MIT를 유지하고 플랫폼은 그 엔진의 호스팅 버전이라고 구분한다
- **인용 논문**: Open Ontologies 본편([arXiv:2605.09184](https://arxiv.org/abs/2605.09184))과 CIVeX([arXiv:2605.09168](https://arxiv.org/abs/2605.09168)). `CITATION.cff`가 기계가 읽는 메타데이터를 담는다
- **수집 범위**: 최상위 `README.md` 전문과 `docs/architecture.md`, `docs/lifecycle.md`, `docs/benchmarks.md` 전문

README 자체가 문체 규약의 검사 대상이다. 이 페이지는 ASD-STE100 Simplified Technical English의 작성 규칙을 따르며 서술문 한 문장이 25단어, 한 문단이 6문장을 넘지 않는다. `tests/readme_simplified_english_test.rs`가 그 규칙을 측정하고 위반하면 빌드를 실패시키며, 같은 테스트가 번역본 `README.zh-CN.md`를 원본과 같은 구조로 묶어 둔다. 다만 STE의 승인 어휘 사전은 유료 문서라 저장소가 사본을 갖고 있지 않고, 그래서 README는 작성 규칙 준수만 주장하고 승인 어휘 준수는 주장하지 않는다.

저장소 최상위에는 Rust 소스(`src/`)와 함께 증명 자산이 계층별로 나뉘어 있다. `lean/`이 certificate checker 본체이고 `isabelle/`, `rocq/`, `dafny/`, `aeneas/`가 별도 디렉토리로 있으며, `benchmark/`, `case-studies/`, `tests/`, `studio/`, `web/`, `python/`, `skills/`가 각자의 역할을 갖는다.

## 2. 주요 기여 (Key Contributions)

- **변경 계획을 shape이 아니라 의미 기준으로 낸다.** README의 첫 예시는 `ex:hasParent rdfs:domain ex:Person` 한 줄을 추가하는 변경이다. 추가된 class 0개, 제거된 class 0개, blast radius 0 triple, risk score low가 나오지만 그 property를 이미 가진 개체 전부에 새 type이 붙어 새 결론 901건이 생긴다. 텍스트 diff로는 한 줄이고 shape diff로는 안전해 보이는 변경에서 이 격차를 메우는 것이 이 도구의 출발점이다.
- **유도 결과에 certificate를 붙이고 다른 구현이 검사한다.** `reason --certificate DIR`이 추론 단계마다 규칙과 전제를 기록하고, `lean/`의 checker가 `OOCert.certificate_sound`라는 기계 검사된 soundness 정리 아래에서 그 파일을 검사한다. 엔진과 checker는 디스크의 바이트만 공유하고 프로토콜을 공유하지 않는다.
- **위조를 거부하는 쪽이 헤드라인보다 중요하다고 명시한다.** 전제를 그대로 두고 결론 한 줄만 바꾼 derivation 파일에 같은 checker가 exit 1을 내고 성립하지 않는 규칙 이름을 지목한다. README는 이 거부가 검증을 견디는 부분이라고 적는다.
- **verdict 단어로 보증의 종류를 구분한다.** 내장 규칙표로 얻은 결론은 `entailed`, 사용자가 공급한 규칙표로 얻은 결론은 `entailed_under_supplied_rules`를 받는다. 전자는 asserted graph의 모든 모델에서 참이고 후자는 그 규칙까지 만족하는 모델에서만 참이다. 이 단어가 바뀌지 않으면 테스트가 실패한다.
- **증명하지 않는 것을 보고서가 먼저 말한다.** 측정한 값에는 measured, prover의 판정에는 opinion을 붙이고 checker의 어휘를 쓰지 않는다. unsatisfiability 답에는 보증이 없다고 비교표에 그대로 적는다.
- **retrieval slice에 coverage 대신 entailment preservation을 둔다.** coverage 99%인 slice가 답이 필요한 triple 하나를 잃을 수 있고 coverage 60%인 slice가 필요한 claim을 모두 지킬 수 있다. 이 도구는 claim마다 보존 여부를 판정하고 certificate 하나씩을 낸다.
- **Terraform 방식의 lifecycle 루프를 제공한다.** `plan`, `apply`, `drift`, `certify`, `rollback`이 한 루프를 이루고 locked IRI와 lineage 감사 추적(audit trail)이 그 루프를 감싼다.
- **MCP 서버로 에이전트가 전체를 조작한다.** `serve` 명령이 stdin과 stdout에서 JSON-RPC를 말하는 MCP 서버를 띄우고, Claude와 Cursor 같은 클라이언트가 `onto_*` 도구로 같은 기능을 쓴다.
- **두 번째 엔진을 두면서 그 독립성의 한계를 명시한다.** `open-ontologies-lite`는 Rust 툴체인 없이 순수 Python으로 추론하고 같은 Lean 바이너리가 그 certificate를 검사한다. 다만 두 엔진은 같은 알고리즘과 같은 규칙표를 쓰고 Python 주석이 Rust를 파일과 행으로 인용하므로 독립적이지 않다고 README가 못박는다. 독립적인 쪽은 Lean checker뿐이다.
- **자기 수치를 철회하고 정정한 기록을 문서에 남긴다.** HermiT 대비 속도 주장은 빈 store에서 측정한 값이라 철회했고, 비결정적이던 tableaux 분류와 alignment를 고친 뒤 OAEI Anatomy 수치를 0.832에서 0.829로 정정했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 계층 구조

엔진은 클라이언트 세 종류를 받는 전송 계층, 도구 묶음, 핵심 엔진 네 구성 요소로 나뉘고 외부 원천을 데이터 파이프라인으로 끌어온다. `docs/architecture.md`의 다이어그램이 이 구조를 선언한다.

| 계층 | 구성 |
|---|---|
| 클라이언트 | Claude 같은 LLM(MCP stdio), CLI(`onto_*` 서브커맨드), Studio(HTTP REST) |
| 전송 | MCP Streamable HTTP(`/mcp`), REST API(`/api/query`, `/api/update`, `/api/save`, `/api/load`, `/api/lineage`) |
| 핵심 엔진 | Oxigraph triple store(RDF와 OWL, SPARQL 1.1), SQLite(lineage 이벤트, 버전 스냅샷, lint와 enforce 피드백, 임베딩 벡터), DL reasoner(SHIQ tableaux, RDFS, OWL-RL), 임베딩 엔진(tract-onnx, 텍스트와 Poincaré 구조 임베딩) |
| 외부 원천 | PostgreSQL 스키마 import, 원격 SPARQL endpoint, `owl:imports` 연쇄를 따르는 OWL URL, Parquet와 Arrow(ICD-10, SNOMED, MeSH 같은 임상 crosswalk), CSV와 JSON과 XML과 YAML과 XLSX 파일 |

도구는 다섯 묶음으로 묶인다.

| 묶음 | 도구 |
|---|---|
| Core | `validate`, `load`, `save`, `clear`, `stats`, `query`, `diff`, `lint`, `convert`, `status` |
| Data Pipeline | `map`, `ingest`, `shacl`, `reason`, `extend`, `import-schema` |
| Lifecycle | `plan`, `apply`, `lock`, `drift`, `enforce`, `monitor`, `lineage` |
| Alignment와 Clinical | `align`, `crosswalk`, `enrich`, `embed`, `search`, `similarity`, `dl_explain`, `dl_check` |
| Versioning | `version`, `history`, `rollback` |

기술 스택은 Oxigraph 0.5가 RDF와 SPARQL 1.1을, `rmcp`가 streamable HTTP 위의 MCP를, SQLite가 상태와 lineage와 피드백을 맡는다. checker는 Lean 4 v4.33.1이고 core Lean만 쓰며 Mathlib에 의존하지 않는다. Studio는 Tauri 2와 React 19와 Tailwind 4로 만든다.

### certificate의 구성

certificate는 탭으로 구분된 파일 둘이다. README의 세 triple 예제에서 두 파일의 크기는 합쳐 1.3KB다.

- `asserted.tsv`는 사람이 주장한 triple을 담는다. triple은 주어와 술어와 목적어 세 항으로 적는 RDF의 최소 단위다.
- `derivations.tsv`는 추론 단계마다 한 줄을 담는다. 각 줄은 규칙 이름, 그 줄의 결론, 그 결론의 전제들을 차례로 적는다.

checker의 검사 절차는 줄 단위다. 각 줄에서 그 줄이 지목한 규칙 아래 전제로부터 결론을 다시 유도하고, 그 전제가 asserted이거나 더 앞선 줄의 결론인지 확인한다. 이런 checker는 누구나 작성할 수 있고 이 구현에는 soundness 정리가 붙어 있다. soundness 정리는 checker가 승인한 결과가 전제에서 실제로 따라 나온다는 것을 기계가 검사한 보증을 말한다.

`asserted.sha256`이 실행이 사용한 주장들의 digest를 함께 남기고, store 보유자는 `certificate-check <dir>`로 store에서 계산한 digest와 비교한다. README는 이 답의 한계를 같은 자리에서 밝힌다. digest는 certificate를 바이트에 묶을 뿐 세계의 상태에 묶지 않으므로, 바뀐 뒤 되돌아온 store는 같은 답을 준다. 타입 수준으로 이 문제를 다루는 작업은 decision 0010이고 아직 열려 있다.

한 가지 경우가 사용자를 혼란시킬 수 있어 명시된다. `reason`은 기본값으로 추론 결과를 store에 쓰므로, 그 뒤의 검사는 certificate가 열거한 것보다 많은 triple을 store에서 발견한다. 보고서는 그 원인을 지목하고 store를 다른 그래프라고 부르지 않는다. store의 triple이 그 실행의 결론이 아닐 때만 different graph라고 적는다.

certificate를 누가 언제 검사하는지도 네 경우로 정리돼 있다.

| 검사 주체 | 시점 | 실행 |
|---|---|---|
| 작업 중인 본인 | 답을 신뢰하기 전 매 실행 | reasoner 옆에서 `lake exe oo-cert` |
| 리뷰어 | 변경이 들어올 때 | CI에서 실행이 남긴 artifact에 같은 명령 |
| 감사인 | 몇 달 뒤 | 보관한 파일에 같은 명령 |
| 다른 에이전트 | 신뢰하지 않는 에이전트의 주장을 받을 때 | 그 주장에 따라 행동하기 전 같은 명령 |

이 네 경우가 성립하는 이유는 도구가 아무것도 스트리밍하지 않고 서버를 호출하지 않는다는 점이다. 몇 달 뒤의 감사인은 파일 둘과 Lean 빌드만 있으면 되고 이 소프트웨어의 인스턴스는 필요 없다.

### 사용자 규칙과 verdict 단어

`reason --rules TABLE --certificate DIR`은 사용자가 공급한 규칙표를 평가하고 `lake exe oo-horn check`가 `OOCert.horn_certificate_sound`로 검사하는 certificate를 쓴다. 이 정리 하나가 모든 규칙표를 한 번에 다룬다. `rules-import --from swrl`은 적재된 ontology에서 SWRL 규칙을 읽고 `--from rif`는 RIF Core를 XML 문법에서 읽으므로 규칙표를 손으로 쓰지 않아도 된다.

다만 각 언어에서 triple 패턴 위의 Horn 규칙표가 되는 것은 일부 조각뿐이다. SWRL의 built-in atom, same-individual과 different-individual atom, data range는 거부된다. RIF의 equality, `External`, `Expr`, `rif:local` 상수, list term, presentation 문법도 거부된다. 거부는 항목마다 이름과 개수로 보고되고 기본값에서는 거부 하나가 import 전체를 실패시킨다. 규칙 절반을 조용히 잃은 규칙 집합도 fixpoint에 도달하고 그 certificate도 통과하는데, 그것은 아무도 작성하지 않은 규칙 집합에 대한 건전한 증명이기 때문이다.

이 계층의 정리는 조건부이고 조건은 Rust가 사실을 그대로 기록한다는 점이다. certificate가 지목한 asserted graph와 기록한 단계가 그 경계이며, `docs/trusted-computing-base.md`가 검사 가능한 30개 속성으로 열거하고 무엇이 검사되고 무엇이 아직 신뢰에 남는지 밝힌다.

### 거부와 미결이 설계에 들어간 지점

같은 실행이 모순도 찾아 `oo-refute`가 판정할 수 있는 모순을 만나면 `refutation.tsv`를 쓴다. `false`를 결론하는 OWL 2 RL 규칙 17개 중 10개를 검출하지만, 그중 `cax-dw` 하나만 `lean/`에 의미 조건이 있고 refutation이 쓰이는 유일한 규칙이다. 나머지 9개는 이 엔진이 찾았다는 사실로만 보고된다. checker가 판정할 수 없는 규칙을 적은 파일은 아무것도 증명하지 않는 certificate 모양의 물건이 되기 때문이다. `cax-dw`는 서로 disjoint한 두 class에 속한 개체를 요구하므로, 개체 없이 TBox만으로 unsatisfiable한 경우는 규칙 기반 경로에 보이지 않는다. 그 경우는 `owl-dl` tableau가 보고 그 답에는 certificate가 붙지 않는다.

### lifecycle 루프

`docs/lifecycle.md`는 production ontology의 변경을 Terraform 방식으로 다룬다. `onto_plan`이 risk score를 내고, `onto_enforce`가 설계 규칙 준수를 보며, `onto_apply`가 적용하고, `onto_monitor`가 watcher를 걸고, `onto_drift`가 변화 속도를 재서 다시 plan 단계로 이어진다.

| 단계 | 하는 일 |
|---|---|
| plan | 현재와 제안 ontology를 diff해 추가와 제거된 class, property, 개체와 triple 단위 delta, blast radius, risk score(`low`, `medium`, `high`)를 보고한다. `onto_lock`으로 잠근 IRI는 실수로 지워지지 않는다 |
| enforce | 설계 패턴 검사. 내장 pack은 `generic`(고아 class, 누락 label), `boro`(IES4와 BORO 준수), `value_partition`(disjointness)이고 사용자 SPARQL 규칙도 받는다 |
| apply | `safe`는 delta만 쓰고 `migrate`는 거기에 소비자를 위한 `owl:equivalentClass`와 `owl:equivalentProperty` 다리를 더한다 |
| monitor | 임계값 경보를 가진 SPARQL watcher. 동작은 `notify`, `block_next_apply`, `auto_rollback`, `log` |
| drift | 버전을 비교하고 Jaro-Winkler 유사도로 rename을 검출하며 drift 속도를 계산한다. SQLite 피드백 루프로 신뢰도를 자체 보정한다 |
| lineage | 모든 lifecycle 작업을 추가만 가능한 감사 추적으로 남긴다 |

제안 Turtle은 Terraform처럼 원하는 상태 전체이므로 거기에 없는 것은 제거된다. 그래서 plan은 TBox뿐 아니라 인스턴스 데이터도 보고한다. 어떤 종류든 제거는 최소 `medium` risk이고, 다른 triple이 그것을 참조하면 `high`가 된다.

plan은 state 데이터베이스에 저장되고 `plan_id`로 반환되므로 계산한 프로세스보다 오래 남는다. `plan`과 `apply`는 별개의 CLI 실행이자 별개의 MCP 호출이고 메모리를 공유하지 않는다. 최근 plan 100개가 보존된다. 기본값은 가장 최근 plan을 적용하되 그 "가장 최근"은 계산한 주체(MCP 세션 하나 또는 CLI 전체)로 범위가 제한된다. HTTP 모드에서는 모든 세션이 하나의 state db를 공유하므로, 범위 없는 기본값은 한 세션이 다른 세션이 검토 중인 변경을 적용하게 만든다. `plan_id`를 지정하면 의도적으로 그 경계를 넘을 수 있고, plan이 존재하지만 다른 주체의 것일 때는 오류가 그 사실을 알린다.

`apply`는 다른 triple만 쓴다. 그래서 변경 없는 그래프는 비용이 0이고 개체 한 건의 변경은 triple 하나를 건드린다. 결과의 `strategy`는 `delta`로 보고되고, 두 그래프 어디든 blank node가 있으면 `reload`로 보고된다. blank node label은 store 지역적이라 그것을 대상으로 한 집합 차이가 의미를 갖지 않고 `DELETE DATA`와 `INSERT DATA`로 옮길 수도 없기 때문이다. 결과는 어느 경로든 같다.

`migrate`의 rename 다리는 `onto_drift`가 쓰는 같은 보정된 rename 검출기 `DriftDetector`가 제거와 추가를 일대일로 짝지어 만든다. 이름과 label 유사도 0.6 미만인 짝은 거절된다. `owl:equivalentClass`는 강한 논리적 주장이므로 틀린 다리가 없는 다리보다 나쁘다. 그래서 모든 다리가 유사도 점수와 함께 `bridges`에 보고되고 matcher가 거절한 제거는 `unbridged_removals`에 이름이 남는다.

lint와 enforce는 사용자 결정에서 학습한다. 경고를 세 번 무시하면 억제되고 한 번 수용하면 유지된다. `align`과 `drift`가 쓰는 자체 보정 패턴과 같다.

### conservativity, plan에서 의미를 보는 단 하나의 부분

plan의 나머지가 모두 shape에 대한 것이라면 conservativity는 의미에 대한 것이다. conservativity는 어떤 변경이 store가 이미 쓰고 있던 이름들에 대한 결론을 하나라도 바꾸는지를 묻는 성질이다. `check_conservativity: true`를 주면 plan이 이 질문의 답을 규칙과 base에 없던 전제까지 행마다 붙여 보고한다.

opt-in인 이유는 두 그래프를 fixpoint까지 추론해야 하기 때문이다. 꺼져 있을 때도 `conservativity` 블록은 남아 `ran: false`와 사유를 적는다. 블록이 없는 것과 깨끗한 블록이 대시보드에 같게 보이는 상황을 막기 위한 설계다. 이 검사는 치명적 오류가 되지 않는다. 실행할 수 없으면 `conservativity.skipped`가 설정되고 plan은 그대로 반환된다. verdict는 boolean이 아니라 단어이며, description logic 기준이 아니라 Horn 규칙표 기준의 conservativity다.

### module과 slice, 정리와 측정의 구분

손실을 측정하는 것은 두 번째로 좋은 답이고 가장 좋은 답은 아무것도 잃을 수 없는 부분집합이다. `onto_module_extract`가 signature 위의 syntactic locality module을 계산하면 전체 ontology가 그 term들에 대해 갖는 모든 entailment가 부분집합의 entailment이기도 하다. entailment는 어떤 그래프의 모든 모델에서 참이 되는 결론을 말한다.

이 보증은 Cuenca Grau, Horrocks, Kazakov, Sattler의 JAIR 31권(2008) 정리이고, 도구는 그 정리를 인용하지만 여기서 기계가 검사하지는 않는다. `lean/` 아래 어떤 파일도 locality를 다루지 않으며 보고서가 그 사실을 그대로 적는다.

그래서 보고서는 이 프로젝트의 정리를 인용하지 않고 측정을 제시한다. ontology와 module 양쪽을 fixpoint까지 추론한 뒤 signature 위에서 module이 도달하지 못한 결론을 보고한다. 저장소의 pizza ontology에서 module은 axiom 1,345개 중 238개이고, 그 실행은 차이 2,583건 중 잃은 결론이 0건이었다. `onto_conservative_check`가 같은 기계를 lifecycle에 쓴다.

### crosswalk, 모듈 분해, 수치의 certificate

세 가지 주장이 이 저장소에서 실행과 대조되는 대상으로 바뀌었다.

- **crosswalk의 match type.** 엔진이 양쪽을 따로 추론하고 매핑을 통해 각 쪽의 entailment를 비교한 뒤 근거가 지지하는 가장 강한 match type을 보고한다. entailment가 지지하지 않는 `exactMatch`는 사유와 함께 강등되고, crosswalk가 옮기지 않는 term 전부가 이름으로 열거된다. 출력은 유효한 SSSOM이라 기존 도구가 그대로 읽는다. 더 날카로운 두 번째 질문은 번역된 claim을 target에 넣고 다시 추론하는 것이다. 충돌이 나면 target이 매핑이 들여온 것을 부정한다는 뜻이고 사람이 판정해야 한다.
- **문맥이 서로 어긋나는 경우.** 새는 난다, 펭귄은 새이고 펭귄은 날지 않는다를 한 그래프에 담으면 모순이고 이 엔진은 그 충돌을 찾는다. 대신 각 모듈이 따로 추론하고, n개 모듈 중 k개가 어떤 사실을 entail할 때 그 사실이 "어디서나 참"을 얻는다.
- **수치의 certificate.** `oo-matcert`가 행렬 곱을 정의대로 다시 계산하고 승인하면 `MatCert.mul_of_check`를 출력한다. 정수에 한정되며 그것이 문장이 성립하는 조건이다. Freivalds 알고리즘은 비용이 적지만 확률을 주므로 bound를 출력하는 opinion에 머문다. 부동소수점은 허용 오차를 보고한다. 실수 위의 증명이 IEEE-754에 대해서는 아무것도 말하지 않기 때문이다.

### 무엇이 어떤 정리로 검사되는가

| 질문 | 받는 것 | 대조 대상 |
|---|---|---|
| OWL 추론 | derivation certificate | `OOCert.certificate_sound` |
| 사용자 규칙으로 추론 | certificate와 다른 verdict 단어 | `OOCert.horn_certificate_sound` |
| satisfiable인가 | 유한 모델 | `Dl.satisfiable_of_checkModel` |
| solver의 모델이 실재하는가 | 재생한 모델 | `Fol.satisfiable_of_check` |
| inconsistent인가 | refutation | `OOCert.refutation_sound` |
| 데이터가 shape에 맞는가 | validation 보고서 | `Shacl.validate_spec` |
| retrieval slice가 답을 여전히 지지하는가 | claim별 보존 | `OOCert.certificate_sound` |

### 실행 경로와 두 기본값의 함정

설치는 릴리스 바이너리 두 종(macOS aarch64, Linux x86_64), `ghcr.io/fabio-rovai/open-ontologies:latest` 이미지, 소스 빌드 네 경로다. Intel macOS와 네이티브 Windows는 `docs/quickstart.md`와 `docs/windows.md`로 넘긴다.

`serve`가 MCP 서버를 띄우면 stdin과 stdout에서 JSON-RPC를 말한다. 그래서 시작 직후 클라이언트를 기다리는 동안 멈춘 것처럼 보이는데 README는 이 동작이 정상이라고 적는다. 터미널에서는 `open-ontologies validate <file.ttl>` 같은 CLI 서브커맨드를 쓴다. Claude Code는 `~/.claude/settings.json`에, Claude Desktop은 `claude_desktop_config.json`에 `mcpServers` 블록을 넣고 클라이언트를 다시 시작하면 `onto_*` 도구가 나타난다.

기본값 둘이 문제를 일으킬 수 있다고 README가 경고한다. 첫째, `OPEN_ONTOLOGIES_STORAGE_MODE=persistent`를 설정하지 않으면 저장이 메모리에 머문다. 그래서 `load` 다음의 `reason`이 빈 store에서 시작해 아무것도 certify하지 않는다. 도구가 경고를 내지만 놓치기 쉽다. 둘째, `--data-dir`은 환경 변수가 아니라 플래그다. 그래서 그 플래그 없이 실행한 시연은 실제 작업물 옆인 `~/.open-ontologies`에 쓴다.

일부 도구는 Cargo feature를 요구하고 그 feature 없이는 오류를 낸다. 4개 도구가 `embeddings`, 2개가 `plugins`, 2개가 `postgres` 또는 `duckdb`를 요구한다. 공개 바이너리와 GHCR 이미지는 기본 feature 집합이므로 그 8개 도구를 갖고 있지 않다.

### 전면에 두지 않은 부분과 Studio

README는 하나의 루프(`plan`, `apply`, `drift`, `certify`, `rollback`)만 전면에 두고, alignment, 임베딩, PDDL planning, 임상 crosswalk, 플러그인 마켓플레이스, CIVeX는 `docs/tool-reference.md`로 한 번에 넘긴다. 기능을 길게 열거하는 것이 논증이 아니라는 이유다. 저장소는 그 부분들과 함께 표준 ontology 33종의 마켓플레이스, 임상 crosswalk, 의미 임베딩, lineage 감사 추적을 담는다.

Studio는 데스크톱 애플리케이션이고 Protégé 방식의 inspector와 가상 스크롤 ontology 트리, AI 채팅 패널을 갖는다. React UI가 읽기와 쓰기를 세션 없는 REST로 처리하고, 에이전트의 쓰기만 MCP `tools/call`로 보낸다. 세션을 들고 있는 쪽은 사이드카 자신의 MCP 클라이언트(`studio/src-tauri/sidecars/agent/mcp.ts`)이고 모델에는 전체 도구 집합이 필요하기 때문이다. 모든 MCP 세션과 REST 핸들러는 `Arc<GraphStore>`로 같은 메모리 내 triple store를 공유한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### ontology 생성과 확장

Manchester Pizza 튜토리얼은 학생이 Protégé로 약 4시간에 Pizza ontology를 만드는 가장 널리 쓰이는 OWL 교육 자료다. 입력은 "Manchester 튜토리얼 명세에 따라 Pizza ontology를 만들어라" 한 문장이었다.

| 지표 | 기준(Protégé) | 생성 결과 | coverage |
|---|---|---|---|
| class | 99개 | 95개 | 96% |
| property | 8개 | 8개 | 100% |
| topping | 49개 | 49개 | 100% |
| named pizza | 24개 | 24개 | 100% |
| 소요 시간 | 약 4시간 | 약 5분 | |

누락된 class 4개는 OWL 문법 변형을 보여 주기 위해서만 존재하는 교육용 산물(`UnclosedPizza` 등)이다.

IES4 건물 도메인은 영국 정부의 정보 교환 표준을 BORO와 4D 방식으로 다룬 사례다. 준수 검사 86개를 모두 통과하고(86/86) triple 318건, class 36개, property 12개를 한 번의 생성으로 유효한 Turtle로 냈다.

확장 사례는 Manchester Pizza OWL과 13행 음식점 CSV를 받아 데이터를 ontology에 매핑하는 과제다. 기준 대비 topping coverage 94%(66개 중 62개 일치), IRI 정확도 94%에서 100%, 채식 분류 92%(정제한 매핑에서 100%)를 기록했다.

### 추론 정확도

UCI Mushroom 데이터셋은 전문가가 분류한 표본 8,124건이다. OWL axiom 6개로 분류했을 때 정확도 98.33%, 독성 표본 recall 100%로 독버섯을 하나도 놓치지 않았고, 거짓 양성 136건(1.67%), 거짓 음성 0건이었다. 설계상 보수적으로 기운 결과다.

비전 벤치마크는 수동으로 정답을 붙인 실제 사진 10장이다.

| 지표 | 수동 | Claude 단독 | RDF 파이프라인 |
|---|---|---|---|
| 객체 recall | 100% | 89% | 95% |
| RDF triple 수 | 0건 | 0건 | 2,540건 |
| SPARQL 질의 가능 | 불가 | 불가 | 가능 |

### 같은 기계를 남의 파일에 적용한 감사

HQDM은 영국 정부 계열의 상위 ontology이고 두 파일로 배포된다. `hqdmTop/hqdmFramework`가 RDFS 파일을 내고 MagmaCore가 그 파일의 사본을 바이트 단위로 유지하며, `gchq/HQDM`이 OWL 파일을 낸다. 두 파일은 서로 다른 검사에서 실패한다.

| 파일 | 규모 | 검사 결과 |
|---|---|---|
| `hqdm-0.0.1-alpha.ttl` (RDFS) | triple 1,094건, 선언 class 210개, term 488개가 한 연결 그래프 | `owl:` term과 disjointness axiom이 없어 어떤 named class도 unsatisfiable할 수 없다. 대신 class로 쓰이면서 선언되지 않은 term 23개, class가 아니라 relation을 지목한 `rdfs:range` 선언 12개, 마지막 밑줄 하나만 다른 이름 13쌍(그중 3쌍은 domain과 range까지 같다)을 안고 있다 |
| `hqdm.owl` (OWL) | triple 3,127건, 선언 class 234개, term 320개, disjointness axiom 14개 | 세 검사를 모두 통과하고 선언되지 않은 term 0개, relation을 지목한 range 0개다. 그러나 coherent하지 않다. 이 엔진의 tableaux가 named class 195개를 satisfiable로 판정하고 39개를 판정하지 못하며, HermiT는 정확히 그 39개를 unsatisfiable이라 부른다 |

README는 이 그림이 아무것도 증명하지 않으며 증명을 주장하지도 않는다고 적는다. 테스트가 각 개수를 다시 계산하고 그 교집합도 다시 계산하며, 출처와 방법은 `docs/assets/hqdm/PROVENANCE.md`에 있다. 이 사례의 요점은 reasoner가 볼 수 없는 결함(선언 누락, 잘못된 range, 이름 쌍둥이)과 reasoner만 볼 수 있는 결함(unsatisfiable class)이 서로 다른 파일에서 갈라져 나타난다는 점이다.

표지 도해가 쓰는 `ies-core.ttl` 사례도 같은 기계의 출력이다. 사람이 주장한 edge 426건에서 엔진이 유도한 edge 259건이 나오고, certificate 하나가 그 259건을 묶어 checker 한 번의 실행으로 승인된다. 위조한 edge 1건에는 같은 checker가 exit 1을 내고 규칙을 지목한다. 각 개수는 실행이 공급하며 캡션에 사람이 적어 넣지 않는다.

### OntoAxiom 재채점

[OntoAxiom](https://arxiv.org/abs/2512.05594)은 axiom 유형 5종에 대한 LLM의 axiom 식별 능력을 재는 벤치마크다. 논문은 axiom 2,771개라 적지만 공개된 정답은 그 유형들에 대한 순서쌍 3,042개(대칭쌍을 합치면 2,514개)를 담고 있어, 이 저장소는 3,042개를 채점하고 그 사실을 밝힌다. 아래 모든 조건은 하나의 채점기(`score_all_conditions.py`)가 공통 정규화와 `domain`과 `range`에 한정한 쌍 뒤집기, 빈 정답 칸 제외, 두 평균 동시 보고로 채점했고, 저장된 예측을 다시 채점한 값이라 새 추론은 없다.

| 모델 | 조건 | 입력 | macro F1 | micro F1 |
|---|---|---|---|---|
| Claude Opus | A | 이름 목록만 | 0.451 | 0.397 |
| Claude Opus | D | 전체 원본 OWL | 0.768 | 0.686 |
| Qwen3-Coder-30B | A | 이름 목록만 | 0.223 | 0.176 |
| Qwen3-Coder-30B | D | 전체 원본 OWL | 0.673 | 0.667 |
| MCP와 SPARQL 추출 | C | 전체 OWL | 0.713 | 0.717 |

두 결론이 따라 나오고 어느 쪽도 자기에게 유리한 해석이 아니다.

첫째, 원본 OWL은 도움이 된다. OWL 파일 전체를 준 LLM(0.323)이 이름 목록만 준 같은 LLM(0.431)보다 낮았다는 OntoAxiom 논문의 반직관적 결과는 공통 채점기 하나를 통과하지 못한다. 그 두 값은 camelCase 정규화, macro 대 micro 평균, 어느 axiom 유형에 쌍 뒤집기를 적용할지 세 지점에서 서로 어긋나는 스크립트가 낸 값이고 세 지점 모두 원본 OWL 조건에 불리했다. 다시 채점하면 두 모델 모두, 두 평균 모두에서 부호가 뒤집힌다. `score_condition_d.py --legacy`가 0.323을 그대로 재현하므로 버그는 주장이 아니라 시연으로 제시된다.

둘째, 도구는 정확도가 아니라 감사 가능성을 산다. 올바르게 채점하면 MCP 추출과 원본 파일 읽기는 대등하다. 원본 OWL이 macro에서 앞서고(0.768 대 0.713) 추출이 micro에서 앞선다(0.717 대 0.686). 도구 계층에 남는 근거는 모든 MCP 쌍이 실제 triple에 대한 SPARQL 질의로 추적된다는 점이고, 파일을 읽는 모델은 그럴듯한 쌍을 환각할 수 있으며 어떤 F1 점수도 그것이 어느 쌍인지 알려 주지 않는다.

OntoAxiom 논문이 최고 시스템으로 보고한 o1의 F1 0.197은 비교 baseline으로 쓰지 않는다. 논문이 어느 평균인지 밝히지 않았고, 통계를 섞는 것이 위에서 정정한 바로 그 오류이기 때문이다. 결과는 temperature 0.2에서 단일 실행이고 seed 평균이 아니다. Pizza, FOAF, OWL-Time 같은 벤치마크 ontology는 널리 공개돼 pre-training 데이터에 있을 가능성이 높아 모델 단독 점수는 오염을 포함한 baseline이며, Qwen 교차 모델 ablation은 어떤 효과가 도구의 성질인지 한 공급사 모델의 성질인지 가리기 위해 존재한다.

### alignment와 claim 검증

OAEI ontology alignment에서 Anatomy는 F1 0.829로 OAEI 2025 참가 13개 중 9위이고, Conference는 0.438로 참가한 모든 시스템과 두 baseline보다 낮다.

claim 검증 벤치마크는 `claimcheck` 모듈이 설계된 작업 부하, 즉 고정된 ontology를 한 번 컴파일해 두고 후보 claim의 흐름을 consistent와 rejected와 undetermined로 답하는 상황을 측정한다. `claimcheck`는 라이브러리 모듈이고 `src/server.rs`의 어떤 MCP 도구도 `src/main.rs`의 어떤 CLI 서브커맨드도 그것을 호출하지 않으므로, 이 수치는 배포되는 서버나 바이너리의 능력이 아니라 따로 측정한 모듈의 수치다.

측정 방법은 과제를 맞춰 둔 비교다. 두 엔진이 같은 파일에 같은 질문을 답하고, baseline(`ClaimConsistency.java`)은 각 claim을 ABox axiom으로 주장한 뒤 HermiT 1.4.3.456에 KB 전체의 consistency를 묻는다. JVM은 예열 상태이고 ontology는 한 번 적재해 모든 claim에 분할 상환된다. 정답은 `DisjointnessMatrix.java`가 모든 named class 쌍 A와 B의 교집합 satisfiability를 HermiT로 전수 검사해 만든다. 적대적 claim은 `structural_parity.py`가 컴파일된 구조에서 유도한다. 무작위 쌍 추출은 실제 모순을 약 11%만 건드리는데 구조적 생성은 약 60%에 도달한다. LUBM은 의도적으로 쓰지 않는다. ABox 질의 벤치마크이고 스키마가 매우 단순해 reasoner 비교에 쓰지 말라는 문헌(Lam et al., DMKG 2023) 경고가 있기 때문이다.

표준 pizza.owl(triple 1,944건, class 99개)과 Apple M3 Max 기준 결과다.

| claim 1건 검사 | 중앙값 | p95 | 처리량 |
|---|---|---|---|
| HermiT, 예열 상태 | 4,936µs | 미보고 | 초당 약 200건 |
| 컴파일된 token-bitset 검사 | 0.3µs | 0.4µs | 순차 초당 310만 건, 배치 초당 1,120만 건 |

지연과 처리량은 `tests/claimcheck_pizza_bench.rs`가 컴파일된 Pizza ontology에 claim 4개를 번갈아 넣어 측정한 값이고 출력만 하며 저장소에 커밋되지 않는다.

| 정확성 항목 | 결과 |
|---|---|
| HermiT 대비 부당한 거부, 감사한 쌍 78,884건(ontology 13종) | 0건, 23쌍은 residual 계층으로 넘김 |
| 구조적 적대 claim 793건 일치(ontology 8종) | 100%, 거짓 음성 0건 |
| 모순 recall, pizza.owl | 3,944/3,944(100%) |
| 모순 recall, ore_ont_10230 | 232/232(100%) |
| 모든 sweep의 부당한 거부 | 0건 |

컴파일된 표면은 건전하되 의도적으로 불완전하다. 판정할 수 없는 쌍은 `Undetermined`를 반환하고 reasoner가 받는 residual 계층으로 넘어가며, 적대 claim 전체에서 그 비율은 4.9%다. 오프라인 컴파일 비용은 분류 한 번과 전파 fixpoint로 pizza.owl 약 120ms, class 659개인 ore_ont_12925가 컴파일 단계만 약 270ms이고, class 3,539개에 추론된 subsumption 2만 7천 건인 ontology는 분류에 28.5초가 걸렸다. 질의 시점이 아니라 빌드 시점에 예산을 잡을 비용이다.

### 철회하고 정정한 수치

이 저장소의 두 하위 시스템이 비결정적이었다. tableaux 분류와 alignment가 모두 `HashMap` 순회 순서에 출력을 맡기고 있었다. 둘 다 고쳤고, 수정 전에 기록한 Anatomy F1 0.832는 결정론적 값이 0.829인 분포에서 뽑힌 한 표본이었다. HermiT 대비 속도 주장은 철회됐다. 빈 store에서 측정한 값이고 올바르게 측정하면 뒤집히며, 그 주장은 이 README뿐 아니라 `arXiv:2605.09184v1`에도 실려 있었다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **certificate가 묶는 것은 바이트이고 세계의 상태가 아니다.** `asserted.sha256` digest는 바뀐 뒤 되돌아온 store에 같은 답을 준다. 입력을 store가 아니라 값으로 다루는 타입 수준 작업(decision 0010)은 열려 있다.
- **refutation은 규칙 17개 중 1개에만 certificate가 붙는다.** `false`를 결론하는 OWL 2 RL 규칙 17개 중 10개를 검출하지만 `cax-dw`만 Lean에 의미 조건이 있다. 나머지 9개와 `owl-dl` tableau의 답은 보증 없는 보고다.
- **locality module의 보증은 인용된 정리이고 기계 검사가 없다.** `lean/` 아래 어떤 파일도 locality를 다루지 않는다. 보고서는 정리 대신 측정을 제시한다.
- **unsatisfiability 답에는 보증이 없다.** 비교표가 "none, and the tool says so"로 그대로 적는다.
- **두 엔진은 독립적이지 않다.** Rust와 순수 Python 두 엔진은 같은 알고리즘과 같은 규칙표를 쓰고 Python 주석이 Rust를 파일과 행으로 인용한다. 둘의 일치는 전사 오류에 대한 강한 증거이지만 W3C 규칙의 공통 오독에 대해서는 거의 증거가 되지 않는다. 독립적인 쪽은 Lean checker뿐이고 도구가 매 실행에서 이 유보를 일치 개수 옆에 출력한다.
- **Lean 정리는 Rust가 사실을 그대로 기록한다는 조건에 달려 있다.** 그 경계가 이 계층의 신뢰 기반 전체이고 `docs/trusted-computing-base.md`가 검사 가능한 30개 속성으로 열거한다.
- **공개 바이너리에 8개 도구가 없다.** 기본 feature 집합으로 빌드되므로 `embeddings`, `plugins`, `postgres`, `duckdb`를 요구하는 도구는 오류를 낸다.
- **기본값 둘이 조용히 틀린 결과를 만든다.** 메모리 저장 기본값은 certify할 것이 없는 상태를 만들고, `--data-dir` 없는 실행은 실제 작업물 옆에 쓴다.
- **claimcheck 수치는 배포 산출물의 능력이 아니다.** MCP 도구도 CLI 서브커맨드도 이 모듈을 호출하지 않는다.
- **alignment 성능은 과제에 따라 크게 갈린다.** OAEI Anatomy는 13개 중 9위이고 Conference는 모든 참가 시스템과 두 baseline보다 낮다.
- **벤치마크 설계의 한계를 스스로 밝힌다.** OntoAxiom 결과는 temperature 0.2 단일 실행이고, Pizza와 FOAF와 OWL-Time은 pre-training 오염 가능성이 높은 공개 ontology다.
- **STE 승인 어휘 준수는 주장하지 않는다.** 사전이 유료 문서라 저장소가 사본을 갖고 있지 않고, 작성 규칙 준수만 테스트가 검사한다.

## 6. 관련 연구 (Related Work)

README가 명시적으로 비교하거나 인용하는 대상은 네 묶음이다.

**ontology 편집기와의 역할 분담.** README는 이 도구가 ontology 편집기가 아니라고 못박는다. class 계층을 그리는 일은 Protégé가 맡고, Open Ontologies는 변경이 production에 들어가기 전 그 변경에 실행된다. Terraform과 닮은 것은 의도이고, 다만 plan이 문법적이 아니라 의미적이라는 점이 다르다. 문법적 diff는 `git diff`이며 사용자가 이미 갖고 있다.

**보통의 reasoner와의 대비.** 보통의 reasoner는 답과 "reasoner가 그렇다고 한다"는 근거를 준다. 두 번째 구현이 동의할 수 있고 일부 reasoner는 설명을 주지만, 검증된 checker가 그 둘 중 어느 것도 받지 않는다. 이 도구는 규칙과 전제를 이름으로 적은 certificate를 주고, 엔진과 코드를 공유하지 않는 checker로 누구나 검사할 수 있다. 엔진에 결함이 있으면 checker가 답을 거부하고 exit 1을 낸다.

**HermiT.** claim 검증 벤치마크의 baseline이자 정답 생성기이며, HQDM 감사에서 판정 불가 39개를 unsatisfiable이라 부르는 oracle로도 등장한다. 이 저장소의 어휘에서 HermiT의 판정은 opinion이고 checker의 어휘를 받지 않는다.

**인용된 정리와 벤치마크.** locality module의 보증은 Cuenca Grau, Horrocks, Kazakov, Sattler의 JAIR 31권(2008) 정리다. axiom 식별 평가는 OntoAxiom([arXiv:2512.05594](https://arxiv.org/abs/2512.05594))을 다시 채점한 것이고, alignment는 OAEI 2025 참가 field와 비교한다. LUBM을 쓰지 않는 근거로 Lam et al.의 DMKG 2023 경고를 든다. Isabelle/HOL은 같은 바이트를 읽는 독립된 두 번째 커널로 도식에 등장한다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| certificate | 엔진이 유도한 결론을 규칙과 전제까지 적어 남긴 파일. `asserted.tsv`와 `derivations.tsv` 두 개이며 네트워크도 엔진도 없이 재검사된다 |
| soundness 정리 | checker가 승인한 결과가 전제에서 실제로 따라 나온다는 것을 기계가 검사한 보증. `OOCert.certificate_sound`가 derivation certificate에 대한 그 정리다 |
| verdict 단어 | 보증의 종류를 구분하는 출력 문자열. 내장 규칙은 `entailed`, 사용자 규칙은 `entailed_under_supplied_rules`를 받는다 |
| blast radius | 변경이 영향을 주는 triple의 개수로 보고되는 파급 범위. shape 기준 지표라 의미 변화를 잡지 못한다 |
| conservativity | 변경이 store가 이미 쓰던 이름들에 대한 결론을 하나라도 바꾸는지를 묻는 성질. plan에서 opt-in이고 Horn 규칙표 기준으로 판정된다 |
| entailment preservation | retrieval slice가 답에 필요한 결론을 여전히 지지하는지를 claim 단위로 판정하는 성질. coverage를 대신하는 목표 지표다 |
| locality module | signature 위에서 전체 ontology의 모든 entailment를 보존하는 부분집합. 보증은 인용된 정리이고 이 저장소에서 기계 검사되지 않는다 |
| residual 계층 | 컴파일된 검사가 `Undetermined`를 반환한 claim을 reasoner가 받아 처리하는 뒷단 |
| drift | 적용된 ontology가 기준에서 벗어난 정도. 버전 비교와 Jaro-Winkler rename 검출, 변화 속도 계산으로 보고된다 |
| rename bridge | `migrate` 적용이 제거된 term과 대체 term을 잇는 `owl:equivalentClass` 주장. 유사도 0.6 미만은 거절되고 거절된 제거는 이름으로 남는다 |
| SSSOM | 매핑을 주고받는 표준 포맷. crosswalk 판정 결과가 이 포맷으로 나가 기존 도구에서 그대로 읽힌다 |
| STE | ASD-STE100 Simplified Technical English. README가 따르는 작성 규칙이며 테스트가 위반 시 빌드를 실패시킨다 |

## 8. 그림 후보 (Figure Candidates)

repo라 자동 추출을 실행하지 않았다. 아래는 README 본문이 임베드한 도해 목록이고 전부 `strategy: manual`이며, `raw`는 GitHub 원본 URL을 가리킨다. ★ 표시한 셋(fig01, fig02, fig03)이 큐레이션을 거쳐 `curated: true`로 wiki 본문에 들어갔고, fig04는 1.4MB 애니메이션 webp라 이 아카이브에만 남는다.

| id | 파일 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | demo-certify.svg | certificate 승인과 위조 거부를 터미널과 그래프로 보여 주는 도해 | manual | ★ wiki 권장 (method) |
| fig02 | certified-claims.svg | crosswalk 강등, 모듈별 추론, 수치 certificate 세 사례 | manual | ★ wiki 권장 (result) |
| fig03 | hqdm-audit.svg | HQDM 두 배포 파일을 같은 검사로 감사한 결과 | manual | ★ wiki 권장 (result) |
| fig04 | knowledge-graph.webp | ies-core.ttl의 주장 426건과 유도 259건과 거부 1건 표지 도해 | manual | (선택, 1.4MB 애니메이션) |

큐레이션에서 제외한 fig04는 로컬 사본이 없다. `wiki/assets/fabio-rovai-open-ontologies/`에는 curated 셋만 두고, fig04는 `raw` 열의 GitHub URL이 유일한 출처다. 나중에 필요해지면 그 URL에서 받아 사본을 만든 뒤 `curated: true`로 올린다.
