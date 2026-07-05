---
title: "Open Knowledge Format (OKF)"
type: repo
year: 2026
category: etc
raw_path: raw/repos/google-okf.md
raw_filename: "google-okf.md"
source_collection: external
org: "GoogleCloudPlatform"
repo: "knowledge-catalog"
url: "https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf"
license: "미확인 (repo 내 LICENSE 파일 미발견)"
tags: [okf, knowledge-format, metadata, data-catalog, markdown, yaml-frontmatter, bigquery, gemini, agent, visualizer]
---

## 한 줄 요약 (One-line Summary)

OKF(Open Knowledge Format)는 데이터·시스템을 둘러싼 지식(메타데이터·문맥·큐레이션된 통찰)을 **YAML frontmatter를 얹은 평범한 markdown 파일**로 표현하는 벤더 중립 포맷이다. 특정 에이전트·프레임워크·모델 제공자·서빙 시스템에 묶이지 않으며, 저장소는 이 포맷을 자동 생산하는 reference agent와 소비하는 visualizer를 proof-of-concept로 함께 담는다.

## 1. 자료 정보 (Document Information)

- **저장소**: GoogleCloudPlatform/knowledge-catalog, `okf/` 하위 프로젝트
- **핵심 산출물**: `SPEC.md` (OKF v0.1 draft 명세), `reference_agent` (생산자 PoC), `visualize` 서브커맨드 (소비자 PoC)
- **기술 스택**: Python 3.13, BigQuery 메타데이터, Gemini(AI Studio 또는 Vertex AI), Cytoscape.js + marked (visualizer)
- **동봉 예시**: GA4 e-commerce, Stack Overflow, Bitcoin(crypto) 세 개의 실제 bundle이 `bundles/`에 체크인됨

## 2. 주요 기여 (Key Contributions)

1. **포맷이 곧 기여다.** 저장소가 강조하는 바는 에이전트나 뷰어가 아니라 OKF 포맷 자체다. 에이전트·visualizer는 포맷을 생산·소비 양단에서 다뤄볼 수 있게 하는 예시일 뿐이다.
2. **누구나 생산·소비.** 생산 측은 손으로 쓰는 사람, 임의 프레임워크(ADK·LangChain·custom) 위 에이전트, 기존 카탈로그(Dataplex·Unity Catalog·Collibra) export 파이프라인, DB를 훑는 스크립트가 될 수 있다. 소비 측은 정적 파일 서버, KM UI(Obsidian·Notion·MkDocs), 파일을 문맥에 올리는 LLM, 검색 인덱스, 그래프 뷰어가 될 수 있다.
3. **파일이라는 최소 계약.** *"cat 하면 읽을 수 있고, git clone 하면 배포할 수 있다."* 서비스 소유 메타데이터 저장소로는 얻기 힘든 성질 — 버전 관리(git diff·PR·blame), 이식성(디렉토리 하나), 락인 없음 — 을 파일 포맷 하나로 확보한다.
4. **구조/비구조 데이터의 의도된 혼합.** query·filter·index 걸 소수 필드만 frontmatter(`type`·`resource`·`tags`·`timestamp`)로 두고, 사람과 LLM이 실제로 읽는 산문·스키마·예시 쿼리는 markdown body에 둔다.
5. **관대한 소비(permissive) 원칙.** 소비자는 optional 필드 누락, 모르는 `type` 값, 끊긴 cross-link을 이유로 bundle을 거부해서는 안 된다(MUST NOT). 상호운용성을 보장하는 required 키는 최소로 두고 확장은 자유롭게 허용한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 포맷 명세 (SPEC v0.1)

- **Frontmatter**: `type`만 required(개념 종류 식별). `title`·`description`·`resource`·`tags`·`timestamp`는 recommended. bundle은 임의의 추가 키를 자유롭게 실을 수 있다.
- **Bundle 구조**: 계층 디렉토리 + 개념 문서(`.md`). 예약 파일명 — `index.md`(디렉토리 리스팅, progressive disclosure용), `log.md`(시간순 업데이트).
- **Cross-linking**: (1) absolute bundle-relative(`/`로 시작, 권장), (2) 표준 relative markdown 경로. 개념들이 markdown 링크로 서로를 참조해 디렉토리의 부모/자식 관계보다 풍부한 **그래프 구조**를 이룬다.
- **Body**: 표준 markdown, 관용 헤딩 `# Schema`·`# Examples`·`# Citations`.
- **Conformance**: 모든 non-reserved `.md`가 파싱 가능한 YAML frontmatter + 비어있지 않은 `type`을 가져야 한다. 버전 0.1 draft, SemVer(minor=하위호환 추가, major=breaking).

### Reference agent (생산자 PoC)

두 pass로 동작한다.

- **BQ pass**: BigQuery 메타데이터만으로 소스가 광고하는 개념마다 OKF 문서 하나씩 생성.
- **Web pass**: LLM을 크롤러로 삼는다. seed URL(`--web-seed`/`--web-seed-file`)을 `fetch_url` 도구로 가져오고, outbound 링크가 기존 개념의 권위 있는 문서처럼 보이는지 판단해 따라갈지 결정한다. 가져온 페이지마다 (a) 기존 개념 문서 보강, (b) 독립 `references/<slug>` 문서 신설, (c) skip 중 하나를 고른다. `--web-max-pages` 상한과 same-domain allowed-hosts 필터를 도구 내부에서 강제해 에이전트가 폭주하지 못하게 한다. `--no-web`로 web pass 생략 가능.

### Visualize (소비자 PoC)

`visualize` 서브커맨드는 임의 OKF bundle을 **백엔드·설치 없는 자기완결 HTML 파일 하나**로 렌더한다. force-directed 그래프(타입별 색상 노드, body cross-link으로 그린 방향 엣지), 선택 개념의 frontmatter + 렌더된 body를 보여주는 detail 패널, "Cited by" 백링크(링크 그래프 역방향), 검색 박스·타입 필터·레이아웃 전환(cose/concentric/breadth-first/circle/grid)을 제공한다. bundle을 JSON blob으로 임베드하고 Cytoscape.js(그래프) + marked(markdown 렌더)를 CDN에서 로드한다. 데이터는 페이지 밖으로 나가지 않는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크는 없다(포맷 명세 + PoC 저장소). 결과는 **재현 가능한 세 bundle**로 제시된다: GA4 머천다이즈 스토어(GA4 BigQuery Export 문서 seed), Stack Overflow(교차 문서에서 multi-concept 보강 예시), Bitcoin(테이블 간 foreign-key 관계를 산문으로 표현). 각 예시는 recipe(`samples/<name>/`, seed URL + 정확한 `enrich` 명령)와 그 recipe가 만든 bundle(`bundles/<name>/`)을 짝지어 재현성을 보인다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **버전 0.1 draft** — 명세가 아직 초안 단계다.
- **에이전트·뷰어는 어디까지나 PoC** — 프로덕션 도구가 아니라 포맷을 양단에서 시연하는 참조 구현이다.
- **생산 경로가 GCP에 편중** — reference agent는 BigQuery 소스 + Gemini에 묶여 있다. 다만 포맷 자체는 벤더 중립이므로 다른 생산자를 새로 붙일 수 있다.
- **관대한 소비의 대가** — 끊긴 링크·미지의 type을 거부하지 않으므로 무결성 검증은 소비자 몫으로 남는다.

## 6. 관련 연구 (Related Work)

- 이 ai-wiki 자체가 OKF와 사실상 같은 패턴(markdown + YAML frontmatter, git 버전 관리, Obsidian-friendly, `index.md` 카탈로그, `[[wikilinks]]` 그래프)을 개인 지식 베이스에 적용한 사례다 — [Karpathy LLM Wiki 패턴](https://gist.github.com/karpathy/1dd0294ef9567971c1e4348a90d69285)의 확장.
- 그래프형 markdown 지식 도구: Obsidian, Notion, MkDocs — OKF가 "이미 존재하는 도구와 조합된다"고 직접 언급하는 대상.
- 기존 데이터 카탈로그: Dataplex, Unity Catalog, Collibra — export 소스로 언급됨(서비스 소유 메타데이터 저장소의 대안이라는 포지셔닝).

## 7. 용어집 (Glossary)

- **OKF (Open Knowledge Format)**: YAML frontmatter markdown 파일로 지식을 표현하는 벤더 중립 포맷.
- **Bundle**: OKF 개념 문서들을 담은 디렉토리 하나. 배포 단위.
- **Concept doc**: 하나의 개념(dataset·table·reference 등)을 기술하는 `.md` 파일. frontmatter의 `type`으로 종류 식별.
- **Reserved filename**: `index.md`(디렉토리 리스팅), `log.md`(시간순 로그) — 개념 문서로 취급하지 않는 예약명.
- **Progressive disclosure**: `index.md`로 계층을 한 단계씩 탐색해 bundle 전체를 문맥에 올리지 않아도 되게 하는 방식.
- **Permissive consumption**: 소비자가 optional 누락·미지 type·끊긴 링크로 bundle을 거부하지 않는 원칙.
- **Reference agent**: OKF bundle을 자동 생산하는 PoC 에이전트(BQ pass + web pass).
