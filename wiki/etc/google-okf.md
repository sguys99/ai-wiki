---
title: "Open Knowledge Format (OKF)"
type: repo
year: 2026
category: etc
source: google-okf.md
raw_path: raw/repos/google-okf.md
raw_filename: "google-okf.md"
source_collection: external
org: "GoogleCloudPlatform"
repo: "knowledge-catalog"
url: "https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf"
license: "미확인 (repo 내 LICENSE 파일 미발견)"
tags: [okf, knowledge-format, metadata, data-catalog, markdown, yaml-frontmatter, bigquery, gemini, agent, visualizer]
---

## 요약 (Summary)

**OKF(Open Knowledge Format)**는 데이터와 시스템을 둘러싼 지식 — 메타데이터, 문맥, 큐레이션된 통찰 — 을 **YAML frontmatter를 얹은 평범한 markdown 파일**로 표현하는 벤더 중립 포맷이다. 특정 에이전트·프레임워크·모델 제공자·서빙 시스템에 묶이지 않는다는 점이 핵심이다. GoogleCloudPlatform/knowledge-catalog 저장소의 `okf/` 하위 프로젝트로, 포맷 명세(`SPEC.md` v0.1 draft)와 함께 이를 자동 생산하는 reference agent, 소비하는 visualizer를 proof-of-concept로 담는다.

저장소가 분명히 못 박는 지점: **기여는 포맷 그 자체**이고, 에이전트와 뷰어는 포맷을 생산·소비 양단에서 다뤄볼 수 있게 하는 예시일 뿐이다.

## 주요 기여 (Key Contributions)

- **파일이라는 최소 계약.** *"cat 하면 읽을 수 있고, git clone 하면 배포할 수 있다."* 서비스가 소유하는 메타데이터 저장소로는 얻기 어려운 성질을 파일 포맷 하나로 확보한다 — git 기반 버전 관리(diff·PR·blame), 디렉토리 하나의 이식성, 락인 없음.
- **누구나 생산, 누구나 소비.** 생산 측은 손으로 쓰는 사람부터 임의 프레임워크(ADK·LangChain·custom) 위 에이전트, 기존 카탈로그(Dataplex·Unity Catalog·Collibra) export 파이프라인, DB를 훑는 스크립트까지 아우른다. 소비 측은 정적 파일 서버, KM UI(Obsidian·Notion·MkDocs), 파일을 문맥에 올리는 LLM, 검색 인덱스, 그래프 뷰어까지 열려 있다.
- **구조/비구조 데이터의 의도된 혼합.** query·filter·index를 걸 소수 필드만 frontmatter(`type`·`resource`·`tags`·`timestamp`)에 두고, 사람과 LLM이 실제로 읽는 산문·스키마·예시 쿼리는 markdown body에 둔다.
- **관대한 소비(permissive) 원칙.** 소비자는 optional 필드 누락, 모르는 `type` 값, 끊긴 cross-link을 이유로 bundle을 거부해서는 안 된다(MUST NOT). required 키는 최소로 두어 상호운용성을 보장하고, 확장은 자유롭게 허용한다.
- **그래프 구조.** 개념들이 표준 markdown 링크로 서로를 참조해, 디렉토리의 부모/자식보다 풍부한 관계를 표현한다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 포맷 명세 (SPEC v0.1)

- **Frontmatter**: `type`만 required(개념 종류 식별). `title`·`description`·`resource`·`tags`·`timestamp`는 recommended. bundle은 임의 추가 키를 자유롭게 실을 수 있다.
- **Bundle 구조**: 계층 디렉토리 + 개념 문서(`.md`). 예약 파일명 — `index.md`(디렉토리 리스팅, progressive disclosure용), `log.md`(시간순 업데이트).
- **Cross-linking**: absolute bundle-relative(`/`로 시작, 권장) 또는 표준 relative markdown 경로.
- **Body**: 표준 markdown. 관용 헤딩 `# Schema`·`# Examples`·`# Citations`.
- **Conformance**: 모든 non-reserved `.md`가 파싱 가능한 YAML frontmatter + 비어있지 않은 `type`을 가져야 한다. 버전 0.1 draft, SemVer(minor=하위호환 추가, major=breaking).

### 두 개의 PoC — 생산자와 소비자

**Reference agent (생산자)** 는 두 pass로 돈다. **BQ pass**는 BigQuery 메타데이터만으로 개념마다 OKF 문서를 하나씩 쓴다. **Web pass**는 LLM을 크롤러로 삼아, seed URL을 `fetch_url` 도구로 가져오고 outbound 링크가 기존 개념의 권위 있는 문서처럼 보이는지 판단해 (a) 기존 문서 보강 / (b) `references/<slug>` 신설 / (c) skip 중 하나를 고른다. `--web-max-pages` 상한과 same-domain 필터를 도구 내부에서 강제해 폭주를 막는다.

**Visualize (소비자)** 는 임의 bundle을 백엔드·설치 없는 **자기완결 HTML 파일 하나**로 렌더한다. force-directed 그래프(타입별 색상 노드 + body cross-link 방향 엣지), detail 패널, "Cited by" 백링크, 검색·타입 필터·레이아웃 전환을 갖춘다. bundle을 JSON blob으로 임베드하고 Cytoscape.js와 marked를 CDN에서 로드하며, 데이터는 페이지 밖으로 나가지 않는다.

## 결과 (Results)

정량 벤치마크는 없다. 대신 **재현 가능한 세 bundle**로 포맷을 실증한다 — GA4 e-commerce, Stack Overflow(교차 문서에서 multi-concept 보강), Bitcoin(테이블 간 foreign-key 관계를 산문으로). 각 예시는 recipe(seed URL + 정확한 `enrich` 명령)와 그 산출 bundle을 짝지어 재현 경로를 그대로 보여준다.

## 한계 (Limitations)

- 명세가 **0.1 draft** 단계.
- 에이전트·뷰어는 프로덕션 도구가 아닌 **PoC**.
- 생산 경로가 **BigQuery + Gemini(GCP)** 에 편중 — 다만 포맷은 벤더 중립이라 다른 생산자를 붙일 수 있다.
- 관대한 소비의 대가로, 끊긴 링크·미지 type의 무결성 검증은 소비자 몫으로 남는다.

## 관련 페이지 (Related Pages)

- 이 ai-wiki 자체가 OKF와 사실상 동일한 패턴(markdown + YAML frontmatter, git 버전 관리, Obsidian-friendly, `index.md` 카탈로그, `[[wikilinks]]` 그래프)을 개인 지식 베이스에 적용한 사례다 — [Karpathy LLM Wiki 패턴](https://gist.github.com/karpathy/1dd0294ef9567971c1e4348a90d69285)의 다중 자료 유형 확장.
- [[applications/dragon1086-llm-wiki]] · [[applications/joonan30-llm-wiki-labs]] · [[applications/agricidaniel-claude-obsidian]] — 같은 Karpathy 위키 패턴 계열. OKF는 이들을 데이터 카탈로그·에이전트 소비로 일반화하고 포맷을 명세로 못 박은 판이다.
