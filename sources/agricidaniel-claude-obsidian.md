---
title: "claude-obsidian: Self-Organizing AI Second Brain for Obsidian + Claude Code"
type: repo
year: 2026
category: applications
raw_path: raw/repos/agricidaniel-claude-obsidian.md
raw_filename: "agricidaniel-claude-obsidian.md"
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
  - id: fig07
    file: assets/agricidaniel-claude-obsidian/image-example-graph-view.png
    raw: wiki/meta/image-example-graph-view.png
    caption: "Obsidian graph view 예시. concept은 파랑, source는 초록, entity는 보라로 색이 구분된 지식 그래프를 보여준다."
    strategy: manual
    curated: false
  - id: fig08
    file: assets/agricidaniel-claude-obsidian/image-example-wiki-map-view.png
    raw: wiki/meta/image-example-wiki-map-view.png
    caption: "Wiki Map canvas 예시. 도메인 페이지와 concept, entity를 하나의 시각 허브로 연결한 화면이다."
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

Daniel Agrici가 만든 Claude Code 플러그인 겸 Obsidian vault다. Karpathy의 LLM Wiki 패턴을 스킬 15개와 미리 설정된 vault 구조로 패키징해, 소스를 넣으면 자동으로 정리되고 질문하면 vault 페이지를 인용해 답하는 자기조직 지식 베이스를 2분 안에 가동할 수 있게 만들었다.

## 1. 자료 정보 (Document Information)

- **저장소**: [`AgriciDaniel/claude-obsidian`](https://github.com/AgriciDaniel/claude-obsidian)
- **저자**: Daniel Agrici (`agricidaniel.com`)
- **라이선스**: MIT. README 본문 License 절이 "MIT License. See LICENSE for full text. Free for personal and commercial use. Attribution appreciated but not required."로 명시하며, 배지와 frontmatter의 `license: "MIT"`도 같은 값이다.
- **최신 공개 빌드**: `v1.9.2`
- **계보**: [Andrej Karpathy의 LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)를 명시적으로 계승한다. README 서두와 문서 말미가 같은 gist를 두 번 인용한다.
- **동반 프로젝트**: [`claude-canvas`](https://github.com/AgriciDaniel/claude-canvas)(시각 canvas 오케스트레이션), [`claude-ads`](https://github.com/AgriciDaniel/claude-ads)(다중 플랫폼 광고 감사, 250개 이상 점검), [`claude-seo`](https://github.com/AgriciDaniel/claude-seo)(기술 SEO와 GEO 감사), [`best-practices`](https://github.com/AgriciDaniel/best-practices)(six-cut과 agent kernel의 출처)
- **블로그 해설**: [I Turned Obsidian Into a Self-Organizing AI Brain](https://agricidaniel.com/blog/claude-obsidian-ai-second-brain)

배포 트랙은 두 가지다.

| 트랙 | 저장소 | 조건 |
|---|---|---|
| 공개 OSS 빌드 (권장) | `AgriciDaniel/claude-obsidian` | 누구나 설치 가능, 멤버십 불필요 |
| AI Marketing Hub Pro | `AI-Marketing-Hub/claude-obsidian` | 조직 미러. `gh auth login` 또는 GitHub PAT로 조직 접근 권한 필요 |

두 트랙의 코어는 동일한 MIT 라이선스이고 유료 전용 기능은 없다. Pro 트랙은 개발 중 기능에 먼저 접근하는 권한과 커뮤니티 접근을 제공한다. 조직 접근 권한이 없으면 `/plugin marketplace add`가 404를 반환한다.

**자료 범위 주의**: 본 저장소의 raw는 README 전문 한 편이다. 저장소 클론 스냅샷이 아니므로 스크립트 내부 구현, 테스트 코드, `CHANGELOG.md`, `docs/audits/` 감사 문서의 내용, 릴리스 날짜 같은 저장소 내부 세부는 이 자료만으로 확인할 수 없다. 아래 서술은 모두 README에 실재하는 문장에 한정한다.

## 2. 주요 기여 (Key Contributions)

이 저장소의 핵심 기여는 Karpathy LLM Wiki 패턴을 설치 가능한 제품 형태로 구체화한 점이다. 세부 기여는 다음 6개다.

1. **Claude Code 스킬 15개로 LLM Wiki 워크플로를 모듈화**
   - 오케스트레이션: `wiki`
   - 소스 인제스트와 수집: `wiki-ingest`, `save`, `autoresearch`, `defuddle`(웹 추출 래퍼)
   - 질의와 유지: `wiki-query`, `wiki-lint`, `wiki-fold`(로그 rollup, DragonScale opt-in), `wiki-retrieve`
   - Obsidian 통합: `wiki-cli`(Obsidian CLI transport), `obsidian-bases`(Bases 스키마 참조), `obsidian-markdown`(OFM 문법 참조), `canvas`
   - 라우팅과 사고: `wiki-mode`, `think`

2. **Compound Vault refoundation (v1.7)**
   - Obsidian CLI를 기본 transport로 채택
   - hybrid retrieval 도입: contextual prefix와 BM25, cosine rerank 3계층
   - per-file advisory lock 도입으로 다중 writer 손상 경로를 차단
   - [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills)와 기반 정렬

3. **Methodology Modes (v1.8)**: LYT, PARA, Zettelkasten, Generic 4종 조직 철학을 1차 시민으로 승격. `wiki-mode` 스킬이 `.vault-meta/mode.json`을 읽어 새 페이지를 해당 규칙으로 배치한다.

4. **10-principle thinking framework (v1.9)**: `OBSERVE-OBSERVE-LISTEN-THINK-CONNECT-CONNECT-FEEL-ACCEPT-CREATE-GROW` 10단계를 `skills/think/SKILL.md`로 캡슐화하고, 나머지 스킬마다 이 프레임워크를 자기 작업에 대응시킨 "How to think" appendix를 붙였다.

5. **Pre-commit verifier agent (v1.7.1+)**: `agents/verifier.md`가 스테이징된 diff에 six-cut과 agent kernel을 적용한다. 이 규율의 출처는 저자의 별도 저장소 `best-practices`다.

6. **거버넌스와 부속 자산**: `bin/`의 셋업 스크립트 5개, `scripts/`의 헬퍼 스크립트 12개, `tests/`의 hermetic 테스트 스위트 9개(약 1,240개 assertion, `make test`), 매 PR마다 `make test`와 SKILL.md frontmatter 검증, 플러그인 manifest JSON 유효성을 실행하는 CI.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

README는 세 개의 다이어그램으로 설계상의 핵심 선택을 설명한다. vault 흐름, 다중 writer 안전성, hybrid retrieval이다.

### 3.1 Vault flow

소스가 `.raw/`에 들어오면 `/wiki-ingest` 에이전트가 각 소스를 읽고 entity와 concept를 추출한 뒤, 활성 methodology mode에 맞는 `wiki/` 하위 폴더에 배치하고 index와 log, hot cache를 갱신한다. 질의는 hot cache에서 index, 개별 페이지 순으로 내려가며, 이 순서가 토큰 비용을 낮게 유지하는 장치다.

README가 요약하는 4가지 동작은 다음과 같다.

| 동작 | 내용 |
|---|---|
| 소스 투입 | 읽기, entity와 concept 추출, 상호 참조 갱신, 구조화된 vault에 배치 |
| 질문 | hot cache 읽기, index 스캔, 관련 페이지 드릴다운, 답변 합성. 학습 데이터가 아니라 특정 vault 페이지를 인용한다 |
| lint | 고아 페이지, 끊긴 링크, 오래된 주장, 누락된 상호 참조 검출 |
| 세션 종료 | hot cache 갱신. 다음 세션은 요약 없이 최근 컨텍스트를 그대로 갖고 시작한다 |

`hot.md`는 최근 컨텍스트 캐시로 약 500단어 분량이고 매 세션 갱신된다. `index.md`는 vault의 전체 페이지 카탈로그다. 이 두 층 설계가 반복 질의의 토큰 비용을 낮춘다.

### 3.2 다중 writer 안전성 (v1.7+)

사용자가 여러 소스를 한꺼번에 넣으면 병렬 ingest 서브에이전트가 같은 wiki 페이지를 대상으로 삼을 수 있다. `scripts/wiki-lock.sh`가 파일 단위 advisory lock을 제공해, 한 writer가 lock을 얻으면 다른 writer는 대기했다가 다음 패스에서 재시도한다. PostToolUse 자동 커밋 훅은 스테이징 전에 lock 목록을 확인해, 쓰기가 진행 중이면 커밋을 미룬다.

FAQ는 이 메커니즘을 "여러 사람이 같은 vault를 안전하게 편집할 수 있는가"에 대한 답으로 제시하며, 방치된 lock은 60초 뒤 자동으로 회수된다고 밝힌다.

### 3.3 Hybrid retrieval (v1.7+, opt-in)

`/wiki-retrieve` 스킬이 [Anthropic의 2024년 9월 contextual retrieval 연구](https://www.anthropic.com/news/contextual-retrieval)를 토대로 3계층 검색 파이프라인을 제공한다.

| 계층 | 내용 | egress |
|---|---|---|
| BM25 | 항상 켜져 있는 sparse 계층 | 로컬 |
| contextual prefix | 페이지 본문을 Anthropic API로 보내 prefix를 생성 | `--allow-egress` 동의 게이트 |
| cosine rerank | 기본값은 local ollama 모델 | 로컬 |

`bash bin/setup-retrieve.sh`가 BM25 인덱스를 만들고 egress 동의를 묻고 ollama 연결을 검증한다. 파이프라인은 점진적으로 성능이 낮아지는 구조라, 한 계층을 쓸 수 없어도 나머지가 유효한 결과를 낸다.

### 3.4 Methodology Modes (v1.8+)

`bash bin/setup-mode.sh`로 켜는 opt-in 기능이다. `wiki-mode` 스킬이 `.vault-meta/mode.json`을 읽어 새 페이지를 모드별 규칙으로 배치한다. 기본값은 `generic`으로, v1.7 동작을 그대로 유지하며 조직 철학을 강요하지 않는다.

| 모드 | 철학 | 배치 규칙 |
|---|---|---|
| Generic (기본) | 의견을 강요하지 않는다. v1.7 동작 보존 | `wiki/sources/`, `wiki/entities/`, `wiki/concepts/`, `wiki/sessions/` |
| LYT (Linking Your Thinking) | 노트가 연결하고 폴더는 연결하지 않는다. MOC가 탐색 기본 단위 | `wiki/mocs/<topic>-moc.md`와 `wiki/notes/<atomic-note>.md` |
| PARA (Tiago Forte) | 실행 가능성 기준 분류(Projects, Areas, Resources, Archives) | `wiki/projects/`, `wiki/areas/`, `wiki/resources/`, `wiki/archives/` |
| Zettelkasten (Luhmann) | 원자 노트, 고유 ID, 양방향 링크, 폴더 없음 | `wiki/<YYYYMMDDHHMMSSffffff>-<slug>.md` (평면, timestamp) |

모드를 바꿔도 기존 파일은 자동 마이그레이션되지 않는다.

### 3.5 Vault Use Cases (v1.0+)

Use case는 vault가 "무엇을 위한 것인지"를, methodology mode는 "어떻게 정리하는지"를 정한다. 둘은 서로 독립이라 조합할 수 있다. Business와 Research를 합친 vault를 PARA로 운영하는 구성이 유효한 예로 제시된다.

| Use case | 쓰는 상황 |
|---|---|
| A. Website | 사이트맵, 콘텐츠 감사, SEO wiki |
| B. GitHub | 코드베이스 지도, 아키텍처 wiki |
| C. Business | 프로젝트 wiki, 경쟁 정보 |
| D. Personal | second brain, 목표, 저널 합성 |
| E. Research | 논문, 개념, 학위 논문 |
| F. Book/Course | 챕터 트래커, 강의 노트 |

### 3.6 명령어

| 입력 | 동작 |
|---|---|
| `/wiki` | 셋업 점검, 스캐폴드, 또는 이어서 진행 |
| `ingest [file]` | 소스를 읽어 wiki 페이지 8개에서 15개를 만들고 index와 log를 갱신 |
| `ingest all of these` | 여러 소스를 일괄 처리한 뒤 상호 참조 |
| `what do you know about X?` | index를 읽고 관련 페이지를 드릴다운해 답변 합성 |
| `/save`, `/save [name]` | 현재 대화를 wiki 노트로 저장 |
| `/autoresearch [topic]` | 자율 연구 루프 실행 |
| `/canvas` 계열 | canvas 열기, 이미지와 PDF, 텍스트 카드, wiki 페이지 추가, zone 추가 |
| `/think [problem]` | 10원칙 사고 루프 적용 |
| `lint the wiki` | 고아 페이지, 끊긴 링크, 빈틈 점검 |
| `update hot cache` | `hot.md`를 최신 컨텍스트 요약으로 갱신 |

`/wiki`의 첫 실행은 Obsidian 설치 확인, Local REST API 플러그인 확인(MCP transport를 쓸 경우), "이 vault는 무엇을 위한 것인가" 한 가지 질문, 선택된 모드와 use case에 따른 스캐폴드, `hot.md`와 `index.md`, `log.md`, `wiki/meta/dashboard.base` 시드 생성, 첫 인제스트 제안 순으로 진행된다. 이후 실행에서는 vault 건강 상태를 점검하고 오래된 주장을 표면화하며 `hot.md`의 최근 활동을 보여준다.

### 3.7 자율 연구 루프

`/autoresearch`의 동작은 `skills/autoresearch/references/program.md`로 설정한다. 설정 가능한 항목은 최대 라운드 수(기본 3), 세션당 최대 페이지 수(기본 15), 선호 소스 규칙(학술, 공식 문서, 뉴스), 신뢰도 점수와 도메인 제약이다.

1. 1라운드 광범위 검색: 주제를 3개에서 5개 관점으로 분해하고 관점마다 질의를 2개에서 3개 실행한 뒤 상위 결과를 2개에서 3개씩 가져온다
2. 2라운드 빈틈 메우기: 모순과 누락 부분을 겨냥한 검색
3. 3라운드 합성 점검(선택): 큰 빈틈이 남아 있으면 한 번 더
4. 배치: 합성 페이지와 소스 페이지, entity 페이지, concept 페이지를 만들고 모두 상호 참조

웹 수집에는 `skills/autoresearch/SKILL.md`의 `Web egress hygiene (v1.8.2+)` 정책이 적용된다. `file://`와 `javascript:`, RFC1918 대역 호스트를 거부하고, `<script>`와 wikilink 주입 시도를 제거하며, 응답 본문을 50KB로 제한한다.

### 3.8 transport와 MCP

MCP를 붙이면 복사와 붙여넣기 없이 vault 노트를 직접 읽고 쓴다. 두 가지 경로가 있다.

| 경로 | 구성 | 필요 조건 |
|---|---|---|
| A. REST API 기반 | `uvx mcp-obsidian`, 포트 27124 | Obsidian Local REST API 플러그인과 API 키 |
| B. 파일시스템 기반 | `npx -y @bitbonsai/mcpvault@latest /path/to/your/vault` | 플러그인 불필요 |

두 transport는 `scripts/detect-transport.sh`가 자동 감지하고 결과를 `.vault-meta/transport.json`에 기록한다. 수동으로 고정하려면 그 파일에 `"manual_override": true`를 넣는다 (v1.8.2 이상이 이 값을 존중한다).

### 3.9 canvas 계층

이미지와 PDF, 노트, AI 생성 이미지를 Obsidian canvas에 올린다. zone으로 묶고 auto-layout이 겹치지 않게 노드를 배치한다. JSON Canvas 1.0 명세를 따르며 참조 문서는 `skills/canvas/references/canvas-spec.md`다. 템플릿 12종과 레이아웃 알고리즘 6종, 발표 기능을 포함한 전체 오케스트레이션은 동반 프로젝트 `claude-canvas`가 담당한다.

### 3.10 vault 구성과 생성물

스캐폴드가 만드는 것은 다음과 같다.

- 선택한 use case와 methodology mode에 맞는 폴더 구조
- `wiki/index.md`(마스터 카탈로그), `wiki/log.md`(추가 전용 작업 로그), `wiki/hot.md`(최근 컨텍스트 캐시), `wiki/overview.md`(요약)
- `wiki/meta/dashboard.base`(Bases 대시보드, 기본)와 `wiki/meta/dashboard.md`(Dataview 레거시 대체재)
- `_templates/`(노트 유형별 Obsidian Templater 템플릿)
- `.obsidian/snippets/vault-colors.css`(색으로 구분되는 파일 탐색기)
- vault의 `CLAUDE.md`(자동 로드되는 프로젝트 지시문)

시드 vault에는 concept 3개(LLM Wiki Pattern, Hot Cache, Compounding Knowledge)와 entity 1개(Andrej Karpathy)가 들어 있고 `wiki/sources/`는 첫 인제스트 전까지 비어 있다. graph view에는 5개 페이지가 연결된 클러스터가 보이며, 이것이 한 번 인제스트한 뒤의 모습이다.

### 3.11 플러그인과 CSS

| 구분 | 항목 |
|---|---|
| Obsidian 코어 플러그인 | Bases(`dashboard.base` 구동, Obsidian v1.9.10 이후 제공, 2025년 8월), Properties(frontmatter 편집기), Backlinks와 Outline, Graph view |
| 미리 설치된 커뮤니티 플러그인 | Calendar(단어 수와 작업 표시가 있는 사이드바 달력), Thino(빠른 메모 패널), Excalidraw(자유 드로잉과 이미지 주석), Banners(frontmatter `banner:`로 Notion식 헤더 이미지) |
| 직접 설치할 플러그인 | Templater(`_templates/`에서 frontmatter 자동 채움), Obsidian Git(15분마다 vault 자동 커밋), Dataview(레거시 대시보드 전용, 선택) |

Excalidraw의 `main.js`는 8MB라 git으로 추적하지 않고 `setup-vault.sh`가 자동으로 내려받는다. 브라우저 확장 Obsidian Web Clipper를 함께 설치하면 웹 페이지를 한 번의 클릭으로 `.raw/`에 보낸다.

CSS 스니펫 3종은 `setup-vault.sh`가 자동으로 활성화한다. `vault-colors`는 파일 탐색기에서 `wiki/` 폴더를 유형별로 색칠하고(파랑은 concept, 초록은 source, 보라는 entity), `ITS-Dataview-Cards`는 Dataview `TABLE` 질의를 카드 그리드로 바꾸며, `ITS-Image-Adjustments`는 이미지 임베드 뒤에 `|100` 같은 표기로 크기를 조절하게 한다.

### 3.12 프로젝트 간 지식 베이스 공유

다른 Claude Code 프로젝트의 `CLAUDE.md`에 vault 경로와 읽기 순서를 적어 두면 그 프로젝트도 같은 지식 베이스를 참조한다. README가 제시하는 순서는 `wiki/hot.md`를 먼저 읽고, 부족하면 `wiki/index.md`를 읽고, 도메인 세부가 필요하면 해당 도메인 하위 인덱스를 읽고, 그 다음에만 개별 페이지로 내려가는 것이다. 일반 코딩 질문에는 vault를 읽지 말라는 제한도 같은 지시문에 포함된다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- **Hybrid retrieval 벤치마크**: v1.7의 50개 질의 벤치마크에서 top-1 정확도가 v1.6 기준선 대비 32%p 올랐고 오류가 41% 줄었다.
- **테스트와 CI**: `make test`로 hermetic 테스트 스위트 9개, 약 1,240개 assertion을 실행한다. CI는 매 PR마다 `make test`와 SKILL.md frontmatter 검증, 플러그인 manifest JSON 유효성 검사를 실행한다.
- **경쟁 제품 비교**: README는 Smart Connections와 Copilot을 비교 대상으로 삼아 13개 항목 표를 제시한다.

| 항목 | claude-obsidian | Smart Connections | Copilot |
|---|---|---|---|
| 노트 자동 조직화 | entity와 concept, 상호 참조 생성 | 없음 | 없음 |
| 모순 표시 | `[!contradiction]` callout에 출처 첨부 | 없음 | 없음 |
| 세션 메모리 | hot cache가 대화 사이에 유지 | 없음 | 없음 |
| vault 유지보수 | 8개 범주 lint(고아, 끊긴 링크, 빈틈) | 없음 | 없음 |
| 자율 연구 | 빈틈 메우기를 포함한 3라운드 웹 연구 | 없음 | 없음 |
| Methodology mode | LYT, PARA, Zettelkasten, Generic | 없음 | 없음 |
| 사고 프레임워크 | 10원칙 루프를 호출 가능한 스킬로 제공 | 없음 | 없음 |
| 다중 모델 지원 | Claude, Gemini, Codex, Cursor, Windsurf | Claude 전용 | 여러 모델 |
| 시각 canvas | `claude-canvas` 경유 | 없음 | 없음 |
| 다중 writer 안전성 | 파일 단위 advisory lock (v1.7+) | 없음 | 없음 |
| 인용이 붙은 질의 | 특정 wiki 페이지를 인용 | 유사 노트를 인용 | 노트를 인용 |
| 일괄 인제스트 | 여러 소스에 병렬 에이전트 | 없음 | 없음 |
| 오픈소스 | MIT | MIT | freemium |

> **주의**: 위 비교표는 저자가 작성한 자기 평가다. 외부 기관의 독립 검증 결과가 아니므로 인용 시 출처를 명시한다.

- **커뮤니티 규모**: AI Marketing Hub 무료 커뮤니티가 2,800명 이상이라고 README가 밝힌다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **자료 자체의 한계**: 본 자료의 raw는 README 스텁이다. 저장소 클론이 아니라서 vault 구성 파일, 플러그인 설정 값, 스크립트 구현, 테스트 코드, 감사 문서, 릴리스 날짜 같은 내부 세부는 확인할 수 없다. README가 명시하지 않은 수치와 파일 경로는 이 페이지에서 다루지 않는다.
- **에이전트 호환성**: 스킬이 Agent Skills 규격과 호환된다고 표방하지만 production 검증은 Claude Code에서만 이루어졌다. OpenAI Codex CLI, Cursor, Windsurf, Gemini CLI, Goose는 실험 단계이며 호스트마다 스킬 탐색 방식이 다를 수 있다.
- **자동 동기화 없음**: vault는 평범한 Markdown 폴더라 기기 간 동기화가 자동으로 되지 않는다. Obsidian Sync나 Obsidian Git, Syncthing, iCloud, Dropbox 같은 도구를 따로 붙여야 한다.
- **API egress 신뢰 모델**: contextual prefix 계층은 기본적으로 꺼져 있고 `--allow-egress` 동의 플래그로만 켜지지만, 한 번 켜면 페이지 본문이 Anthropic API로 전송된다는 점을 사용자가 인지해야 한다.
- **자기 평가 의존**: 경쟁 비교표가 저자 자평이고 외부 벤치마크가 없다. hybrid retrieval의 50개 질의 벤치마크도 저자가 직접 측정한 값이다.
- **DragonScale 미검증**: opt-in 확장의 메커니즘 4종은 기능 설명만 있고 비교 데이터가 없다.
- **Obsidian 버전 의존**: 기본 대시보드가 Bases 기반이라 Obsidian v1.9.10 이상이 필요하다. v1.6 이상은 Dataview 대체재로만 동작한다.

## 6. 관련 연구 (Related Work)

본 ai-wiki가 이미 보유한 관련 자료다.

- **[[applications/garrytan-gbrain|garrytan/gbrain]]**: Karpathy LLM Wiki 패턴의 또 다른 구현체. Markdown 우선 에이전트 메모리로 claude-obsidian과 직접 비교된다.
- **[[applications/dnotitia-akb|dnotitia/AKB]]**: MCP 우선 에이전트 지식 베이스. 조직용 공유 vault 쪽에 무게가 실린다.
- **[[applications/dragon1086-llm-wiki|dragon1086/llm-wiki]]**: 같은 패턴의 한국어권 구현.
- **[[applications/joonan30-llm-wiki-labs|joonan30/llm-wiki-labs]]**: 같은 패턴을 실험 랩 형태로 구성한 구현.
- **[[applications/safishamsi-graphify|safishamsi/graphify]]**: tree-sitter AST와 Leiden 군집화로 코드 지식 그래프를 만든다.
- **[[applications/colbymchenry-codegraph|colbymchenry/codegraph]]**: 로컬 우선 code intelligence MCP 서버.
- **[[applications/lum1104-understand-anything|Lum1104/Understand-Anything]]**: 7단계 파이프라인으로 코드베이스를 지식 그래프로 변환한다.
- **[[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy|LLM Wiki by Karpathy 입문 튜토리얼]]**: Karpathy gist의 영어권 입문 가이드.
- **[[applications/kmyu-2026-llm-wiki-pattern-synthesis|Karpathy LLM Wiki 패턴 한국어 종합 정리]]**: 본 ai-wiki 운영자 관점의 합성.
- **[[applications/kmyu-2026-akb-llmwiki-gbrain-comparison|AKB와 llmwiki, GBrain 비교]]**: 6개 기준 비교. claude-obsidian을 네 번째 대상으로 추가할 가치가 있다.
- **[[applications/liu-2026-rag-llm-wiki-or-gbrain|RAG, LLM Wiki, or GBrain?]]**: 에이전트의 역할로 RAG와 LLM Wiki, Fat Skills를 가르는 결정 프레임워크.
- **[[agents/patel-2026-beyond-the-prompt-claude-code|Beyond the Prompt: Claude Code]]**: Claude Code 운영 관점이 claude-obsidian의 셋업 스크립트 구성과 호응한다.
- **[[agents/osmani-2026-loop-engineering|Loop Engineering]]**: 스킬과 서브에이전트를 조합하는 루프 설계 관점.
- **[[agents/cemri-2025-why-do-multi-agent-llm-systems|Why Do Multi-Agent LLM Systems Fail?]]**: 다중 에이전트 실패의 시스템 설계 결함 분류.

README가 명시적으로 인용한 외부 자료는 다음과 같다.

- **Karpathy LLM Wiki gist**: 패턴의 원형
- **Anthropic 2024년 9월 contextual retrieval 연구**: hybrid retrieval 계층 설계 근거
- **kepano/obsidian-skills**: v1.7에서 기반을 정렬한 대상
- **Tiago Forte, Nick Milo, Niklas Luhmann**: PARA와 LYT, Zettelkasten 방법론의 출처

## 7. 용어집 (Glossary)

- **Compound Vault**: v1.7 리팩터링에 저자가 붙인 이름. Obsidian CLI transport와 hybrid retrieval, per-file advisory lock, 기반 정렬을 묶은 재설계다.
- **Hot cache**: 약 500단어 분량의 최근 컨텍스트 캐시. 매 세션 갱신되며 질의 시 가장 먼저 읽는다.
- **Methodology Mode**: vault를 "어떻게" 정리할지 정하는 설정. Generic, LYT, PARA, Zettelkasten 4종이며 `.vault-meta/mode.json`이 기준값이다.
- **Vault Use Case**: vault가 "무엇을 위한 것인지" 정하는 설정. Website, GitHub, Business, Personal, Research, Book/Course 6종이며 methodology mode와 독립 조합된다.
- **Per-file advisory lock**: `scripts/wiki-lock.sh`가 제공하는 파일 단위 잠금. 방치된 lock은 60초 뒤 자동 회수된다.
- **Transport**: vault에 읽고 쓰는 채널. Obsidian CLI가 v1.7 이후 기본값이고, MCP 경로 두 가지를 `scripts/detect-transport.sh`가 자동 감지한다.
- **Hybrid retrieval**: BM25와 contextual prefix, cosine rerank를 합친 3계층 검색.
- **Contextual prefix**: 페이지 본문을 Anthropic API로 보내 검색용 prefix를 생성하는 계층. Anthropic의 2024년 9월 연구에서 가져왔고 `--allow-egress` 동의로만 켜진다.
- **Six-cut과 agent kernel**: 저자의 `best-practices` 저장소에서 정의한 코드 리뷰 규율. `agents/verifier.md`가 스테이징된 diff에 적용한다.
- **10-principle thinking framework**: `OBSERVE-OBSERVE-LISTEN-THINK-CONNECT-CONNECT-FEEL-ACCEPT-CREATE-GROW` 10단계 사고 루프. v1.9에서 `skills/think/SKILL.md`로 도입됐다.
- **DragonScale Memory**: `bash bin/setup-dragonscale.sh`로 켜는 선택 확장. 로그 fold(과거 항목 rollup), 결정론적 페이지 주소(카운터 기반 고유 ID), 의미 단위 tiling lint(ollama로 청크 경계 검증), 경계 우선 autoresearch(vault의 frontier부터 연구) 4종을 더한다.
- **Web egress hygiene**: v1.8.2 이후 autoresearch에 적용되는 웹 수집 위생 정책. URL 검증과 콘텐츠 정제, 응답 본문 50KB 제한을 포함한다.

## 8. 그림 후보 (Figure Candidates)

`assets/diagrams/`의 SVG 3개는 README가 "설계상의 핵심 선택을 설명하는 세 개의 다이어그램"으로 지목한 그림이라 wiki에 가장 적합하다. graph view와 Wiki Map canvas PNG는 완성된 화면을 보여주는 데모라 추상화 수준이 낮아 보조용으로 둔다.

figure의 `raw:` 값은 README가 `<img src>`로 참조하는 저장소 내부 상대 경로다. repos 유형은 `-figures/` 디렉토리를 만들지 않고 저장소 내 이미지를 제자리에서 참조하는 규약을 따른다.

| id | strategy | caption | 추천 |
|---|---|---|---|
| fig01 | manual | vault 흐름도 (소스 투입에서 페이지 생성과 캐시 갱신, 질의 경로까지) | ★ wiki 권장 (architecture) |
| fig02 | manual | 다중 writer 잠금 (파일 단위 advisory lock, v1.7+) | ★ wiki 권장 (architecture) |
| fig03 | manual | hybrid retrieval (BM25와 contextual prefix, cosine rerank) | ★ wiki 권장 (architecture) |
| fig07 | manual | Obsidian graph view 예시 | (선택, demo) |
| fig08 | manual | Wiki Map canvas 예시 | (선택, demo) |

> README에 등장하는 애니메이션 GIF 4종(`claude-obsidian-gif-cover-16x9`, `welcome-canvas`, `wiki-graph-grow`, `workflow-loop`)은 Obsidian 렌더에서는 동작하지만 정적 인용에 적합하지 않아 후보에서 제외한다.

> 2026-09 재검증에서 후보 3개(DragonScale 관련 SVG)를 삭제했다. 이전 클론 스냅샷에만 있던 파일이고 현재 raw인 README 스텁에는 근거가 없어서다.
