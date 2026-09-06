---
title: "LLM wiki: Karpathy의 LLM Wiki 패턴과 한국어 커뮤니티 토론 종합 정리 (kmyu99 Notion)"
type: article
year: 2026
category: applications
raw_path: raw/articles/kmyu-2026-llm-wiki-pattern-synthesis.md
raw_filename: "kmyu-2026-llm-wiki-pattern-synthesis.md"
source_collection: external
author: "kmyu99 (Notion 페이지 소유자)"
url: "https://kmyu99.notion.site/LLM-wiki-3586150bf13c8057988bf7b9661465e5"
publisher: "kmyu99.notion.site (개인 Notion '기술 리포트')"
publication_date: "2026-05-06"
tags: [llm-wiki, karpathy, knowledge-management, obsidian, claude-code, ingest-query-lint, three-layer-architecture, indexing, qmd, model-collapse, lossy-compression, korean-community, mcp, nashsu-llm-wiki, farzapedia, memex]
---

## 한 줄 요약 (One-line Summary)

**kmyu99**의 2026-05-06 Notion "기술 리포트" — Andrej Karpathy의 **LLM Wiki Gist**(2026-04-04, GitHub 5,000+ ★, HN 700+ 댓글)를 trunk로 삼아 한국어 커뮤니티 자료(박재홍 위키독스, GeekNews, unclejobs-ai 번역+10가지 역자 주석, nashsu/llm_wiki Tauri 데스크탑 앱)를 한국어로 합성한 11개 섹션 종합 문서. **핵심 thesis**: RAG는 "매 질의마다 지식을 재발견"하지만, LLM Wiki는 ingest 시점에 **사전 컴파일 + 복리 축적**되는 영속 산출물(persistent compounding artifact)을 유지한다 — 차이는 검색 기술이 아니라 **지식 관리 워크플로우**다. **3-Layer 아키텍처**(Raw 사람 소유 immutable / Wiki LLM 전적 소유 / Schema CLAUDE.md·AGENTS.md 공동) + **3-Operation**(Ingest 단일 소스 → 10~15 page touch · Query 인용+합성 + 좋은 답변은 페이지로 재저장 · Lint 모순/orphan/stale 주기 점검) + **임베딩 없는 검색**(index.md + log.md, ~100 sources까지 OK, 그 이상은 qmd 같은 BM25+벡터 하이브리드+LLM rerank 도구) + **경제학적 통찰**(*"북키핑 비용이 ~0에 수렴 → Bush의 Memex 1945가 풀지 못한 유지보수 문제를 LLM이 담당"*) + **6대 비판**(RAG 본질 논쟁 · Nature 모델 붕괴 · lossy compression · 차세대 모델 무력화 가능성 · 벤치마크/프로덕션 이슈 부재 · "사고 위임에 의한 새로운 기술 부채" 인지적 부작용)을 정리. **9개 한국어 실전 팁**(영어 kebab-case 파일명 + 한국어 H1 / 한국어 교착어 검색 한계 / Obsidian vault ↔ Claude Code 직접 연동 / CLAUDE.md 필수 항목 / **MCP 서버가 게임 체인저** / RAG와 병행 = 1차 wiki + 2차 raw / 세션 간 컨텍스트 유실 해결 = "index.md/log.md 먼저 읽어" 스키마 박기 / 소스당 수만~십수만 토큰 비용 / 9-항목 Lint 프롬프트 verbatim)과 **nashsu/llm_wiki 구현 디테일**(취소선 처리되어 사용자가 무효화한 섹션이지만 raw 보존, 2-step CoT Ingest · purpose.md · 4-Signal Relevance Model: Direct ×3.0 / Source overlap ×4.0 / Adamic-Adar ×1.5 / Type affinity ×1.0 · 4-phase Query Pipeline 토큰화→그래프 확장→예산 제어 60/20/5/15→컨텍스트 어셈블리)도 기록. **이 ai-wiki 자체가 Karpathy 패턴의 직접 구현**이라는 메타 관계: 사용자의 [`CLAUDE.md`](../CLAUDE.md) "THE FOUR RULES" + [`index.md`](../index.md) + raw/sources/wiki 3-tier + 한국어 본문/영어 식별자 정책이 본 문서가 정리한 9.1·9.4·9.7 조항을 그대로 적용한 결과물.

## 1. 자료 정보 (Document Information)

- **형식**: Notion 페이지 (개인 share 공개, 비공개 데이터베이스 "기술 리포트"의 한 항목)
- **저자**: kmyu99 (Notion 페이지 소유자, 본 ai-wiki repo의 사용자)
- **URL**: <https://kmyu99.notion.site/LLM-wiki-3586150bf13c8057988bf7b9661465e5>
- **Notion 모계 구조**: ancestor 7개 계층, 최상위 `Engineering Wiki` 데이터베이스 → ... → `기술 리포트` 데이터베이스 → 본 페이지
- **상태**: "시작 전" (Notion 속성)
- **최종 편집**: 2026-05-11T03:59:38Z
- **문서 작성일 (자체 기재)**: 2026년 5월 6일
- **분량**: 11개 최상위 섹션, ~6,500자 한국어 + 외부 링크 ~20개
- **성격**: 1차 자료 요약이 아니라 **다수 자료의 한국어 합성**. Karpathy의 GitHub Gist(영어)를 중심으로 박재홍 위키독스 분석, GeekNews 핵심 요약+HN 의견, unclejobs-ai 한국어 번역+역자 10가지 주석, nashsu/llm_wiki 구현 분석을 한국어로 통합.
- **수집 방법**: `mcp__claude_ai_Notion__notion-fetch`로 Notion API에서 페이지 본문 직접 추출
- **취소선 처리 영역 (사용자 의도)**: 8.1 Farzapedia, 8.2 Karpathy 4가지 장점, 8.3 nashsu/llm_wiki 4-Signal/4-phase 상세 — Notion 원문에서 **취소선(strikethrough) 처리**되어 있어 사용자가 잠정 무효화·재검토 마킹한 것으로 보임. raw에는 취소선을 `~~...~~`로 보존, sources/wiki 본문에서는 메타 사실로만 언급.

## 2. 주요 기여 (Key Contributions)

1. **Karpathy LLM Wiki 패턴의 한국어 정식 정리 (11 섹션)** — 단일 영어 Gist + 한국어 분산 토론을 처음으로 1개 문서에 종합. 박재홍·GeekNews·unclejobs-ai 3개 한국어 자료를 모두 출처 명기.
2. **3-Layer 아키텍처 표 명시화** —
    - **Raw Sources** (사람 소유, immutable, LLM 읽기만)
    - **Wiki** (LLM 전적 소유, markdown 디렉토리, summary·entity·concept·synthesis)
    - **Schema** (사람+LLM 공동, CLAUDE.md/AGENTS.md, "범용 챗봇 → 체계적 위키 관리자" 전환의 핵심)
3. **3-Operation 정식화 (Ingest / Query / Lint)** —
    - Ingest: 단일 소스 = **10~15 wiki page touch** (요약 + 인덱스 + 엔티티/개념 + 로그). 순차+직접 관여 vs 일괄+감독 최소화 2 모드.
    - Query: 답변이 페이지로 재저장되어 *"탐색 활동이 지식 베이스에 복리 축적"*. 마크다운/테이블/Marp 슬라이드/matplotlib 차트/캔버스 출력 가능.
    - Lint: 모순·낡은 주장·orphan page·미생성 개념·누락 cross-ref·웹 검색 데이터 공백 6 항목.
4. **임베딩 없는 인덱싱 패턴** —
    - **index.md**: 콘텐츠 카탈로그, 매 ingest 시 LLM 업데이트, 매 query 시 LLM 첫 reading
    - **log.md**: append-only `## [YYYY-MM-DD] ingest | Title` 일관 접두사 → `grep "^## \["` unix 도구 파싱
    - **scale ceiling**: ~100 sources, 수백 page까지 임베딩 없이 OK
    - **확장 도구**: [qmd](https://github.com/tobi/qmd) (BM25+벡터 하이브리드, LLM rerank, 온디바이스, CLI+MCP)
5. **Obsidian 보조 도구 카탈로그** — Web Clipper(브라우저 확장) · 이미지 로컬 다운로드(URL 깨짐 방지) · Graph View(허브/orphan 파악) · Marp(slide deck) · Dataview(frontmatter 쿼리) · Git 백엔드(버전/브랜치/협업).
6. **경제학적 통찰** — 위키 유지의 진짜 장벽은 **북키핑(bookkeeping)** = 교차 참조 업데이트, 요약 갱신, 모순 표시. 사람들이 위키를 포기하는 이유 = 유지비 > 가치. LLM은 *"지루함을 모르고, 교차 참조 업데이트를 잊지 않고, 한 번에 15 파일 처리 가능"* → 유지비 ~0 → 개인 지식 관리의 경제학 자체가 변화. Vannevar Bush **Memex (1945)** 의 미해결 "누가 유지하느냐"에 LLM이 답.
7. **6대 비판 정리 (HN/박재홍 종합)** —
    - **7.1 "결국 RAG"**: 벡터 DB 대신 인덱스 + 파일시스템일 뿐. 반론 = *"사전 컴파일 vs 런타임 조립"*, 검색 기술이 아닌 **지식 관리 패턴**의 차이.
    - **7.2 모델 붕괴**: Nature 논문 인용(*"LLM이 쓴 텍스트를 다시 LLM이 처리"*). 반론 = "학습" 맥락 vs "이미 학습된 모델로 위키 작성" 맥락 분리. 실무: 요약의 요약은 뉘앙스 손실 실재.
    - **7.3 Lossy Compression**: 단서·날짜·소수의견·정확 워딩·엣지 케이스·소스 컨텍스트 손실. 위험 = 원본 대신 위키 검색하면 요약 오류 고착.
    - **7.4 차세대 모델 무력화**: 10M context, 1000 tps면 중간 계층 불필요? 반론 = 1M context도 **20~30만 토큰에서 기억 손실 시작** → 근본 한계 유지.
    - **7.5 벤치마크/프로덕션 부재**: hybrid RAG · BM25+rerank · GraphRAG · 계층적 요약 · NotebookLM 대비 우위 증거 0. 권한·다중사용자·감사로그·롤백·버저닝·동시성·컴플라이언스 미해결.
    - **7.6 인지적 부작용**: *"사고 정리를 LLM에 위임 → 깊이 생각하는 능력 약화"* = **새로운 기술 부채**, "지속적인 뇌의 공백" 경험담.
8. **한국어 사용자 9가지 실전 팁 (unclejobs-ai 역자 주석)** — 본 ai-wiki의 CLAUDE.md 정책에 직접 반영되는 핵심 가이드.
9. **6가지 RAG 실무자 적용 가이드** — 자기주도 학습/면접 준비/클라이언트 케이스/arXiv 정리에 적합, Legal/프로덕션/빠른 변화 도메인은 신중. 기존 GraphRAG·멀티홉·계층 요약·BM25+벡터와 자연 연결, Karpathy 기여는 **워크플로우와 철학** 측면.
10. **6+ 구현 사례 인용** — Karpathy 본인의 **Farzapedia** (일기+Notes+iMessage 2,500건 → 400 위키 doc, 에이전트 활용용, RAG 1년 전 실패 후 파일시스템 직접 탐색) + **nashsu/llm_wiki Tauri 데스크탑 앱** (취소선 처리됐지만 raw 보존) + Astro-Han · dragon1086 · joonan30 · OpenKB · agricidaniel 기타.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 3-Layer Stack

```
┌──────────────────────────────────────────────────────────┐
│ Schema (CLAUDE.md / AGENTS.md)            사람 ↔ LLM 공동 │
│   디렉토리·페이지 템플릿·네이밍·워크플로우·금지사항       │
├──────────────────────────────────────────────────────────┤
│ Wiki  (markdown directory)                LLM 전적 소유  │
│   summaries · entity pages · concept · synthesis        │
│   LLM이 작성·업데이트·cross-ref 관리, 사용자는 읽기만   │
├──────────────────────────────────────────────────────────┤
│ Raw Sources  (papers/articles/PDFs/images)  사람 소유    │
│   curated, immutable, LLM 읽기만                        │
└──────────────────────────────────────────────────────────┘
```

### 3.2 3-Operation Loop

```
                   새 소스 도착
                       │
                       ▼
   ┌───────────────────────────────────────────┐
   │ INGEST                                     │
   │  - LLM이 소스 읽기                          │
   │  - 핵심 요점 사용자와 논의                  │
   │  - wiki 요약 페이지 작성                    │
   │  - index.md 업데이트                        │
   │  - 관련 entity/concept 페이지 갱신           │
   │  - log.md에 entry append                    │
   │  → 단일 소스 = 10-15 page touch              │
   └───────────────────────────────────────────┘
                       │
                       ▼ (대화 도중)
   ┌───────────────────────────────────────────┐
   │ QUERY                                      │
   │  - index.md 먼저 읽기                       │
   │  - 관련 페이지 검색·읽기                    │
   │  - 인용+합성 답변 (md/table/Marp/chart)     │
   │  - 좋은 답변 = 새 wiki page로 재저장        │
   │  → 탐색 활동이 지식 베이스로 복리 축적      │
   └───────────────────────────────────────────┘
                       │
                       ▼ (주기적)
   ┌───────────────────────────────────────────┐
   │ LINT (health check)                        │
   │  1. 페이지 간 모순                          │
   │  2. 새 소스에 의해 대체된 낡은 주장          │
   │  3. inbound link 없는 orphan 페이지         │
   │  4. 언급만 되고 자체 페이지 없는 개념        │
   │  5. 누락된 cross-reference                  │
   │  6. 웹 검색으로 메울 수 있는 데이터 공백     │
   └───────────────────────────────────────────┘
```

### 3.3 임베딩 없는 검색 = index.md + log.md

- `index.md`: 카테고리별 catalog. 형식 = `link + one-line summary + metadata(날짜, 소스 수)`.
- `log.md`: append-only, `## [YYYY-MM-DD] ingest | Title` prefix로 grep 가능.
- **scale ceiling = ~100 sources, 수백 page**. 그 이상이면 qmd 같은 BM25+벡터 하이브리드 + LLM rerank + MCP 서버 노출 도구가 필요.

### 3.4 한국어 운영 9가지 (unclejobs-ai)

1. 영어 kebab-case 파일명 + 한국어 H1 (URL 인코딩·git 호환성)
2. frontmatter 한영 태그 병기 (`tags: [인공지능, artificial-intelligence]`)
3. Obsidian vault = LLM 작업 디렉토리. `.obsidian/` 보호, Linter 플러그인으로 정규화, Templater로 템플릿
4. CLAUDE.md 필수 = 디렉토리 구조 + 페이지 템플릿 + 네이밍 규칙 + 수집 워크플로우 체크리스트 + 금지사항
5. **MCP 서버 = 게임 체인저**: 위키 검색을 MCP로 노출하면 LLM이 셸 명령 아닌 **네이티브 도구**로 호출. 50 페이지 이상이면 진지하게.
6. RAG는 대체재 아닌 **보완재** = 1차 wiki(컴파일) + 2차 raw RAG(원문 검증)
7. 세션 컨텍스트 유실 해결 = *"index.md와 log.md를 먼저 읽어"*를 스키마에 박기
8. 비용: 소스 1건 ingest = 수만~십수만 토큰, query = 인덱스+2~5 page로 가벼움
9. **9-항목 Lint 프롬프트 verbatim 제공** (raw 9.9 섹션)

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

> 본 문서는 합성 article이므로 자체 벤치마크는 없다. 다만 다음 수치를 인용·확장한다:

- **Karpathy Gist 반응**: 5,000+ 별/포크, HN 700+ 댓글, 한 달 만에 paulshomo/co-wiki · jgoldfed/keppi · doum1004/llmwiki-cli · cagataysengor/llm-wiki-studio · kytmanov/obsidian-llm-wiki-local · tuirk/Kompl · swarmclawai/swarmvault · skyllwt/OmegaWiki · axoviq-ai/synthadoc · theafh/ai-modules · hang-in/seCall 등 **10+ 구현체** 등장.
- **Farzapedia 규모**: 일기 + Apple Notes + iMessage **2,500건 입력 → 400 위키 doc 자동 생성**. 새 항목 추가 시 관련 2~3개 기존 문서 자동 업데이트 또는 새 문서 생성. **에이전트 활용 목적으로 설계** — 사용자 열람용 아님. 1년 전 RAG 시도 실패 후 파일시스템 직접 탐색으로 전환.
- **단일 소스 → 10~15 wiki page touch** (Karpathy 본인 추정, 실측 아님).
- **Context window degradation**: 1M context도 20~30만 토큰에서 기억 손실 시작 (7.4 비판 반박).
- **Wiki scale**: ~100 sources, 수백 page까지는 임베딩 없이 OK; 그 이상은 qmd 같은 도구 필요.
- **nashsu/llm_wiki Tauri 앱** (취소선 처리됐지만 raw 보존, GitHub 23 ★):
    - 2-step CoT Ingest (Analysis → Generation)
    - purpose.md 추가 (schema=how, purpose=why)
    - **4-Signal Relevance Model**: Direct link ×3.0 (`[[wikilinks]]`) · Source overlap ×4.0 (frontmatter `sources[]`) · Adamic-Adar ×1.5 (공통 이웃, 이웃의 차수로 가중) · Type affinity ×1.0
    - **4-phase Query Pipeline**: 토큰화 검색(영어 단어 분리, 한중일 bigram) → 그래프 확장(검색 결과 시드 + 관련성 모델) → **예산 제어(60% 위키 / 20% 히스토리 / 5% 인덱스 / 15% 시스템)** → 컨텍스트 어셈블리(페이지 번호 인용)
    - 다국어, Chrome 확장(웹 클리퍼), 멀티 포맷(PDF/DOCX/PPTX/XLSX)

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5.1 비판 6가지 (본 문서 정리)

- **결국 RAG**: 사전 컴파일 vs 런타임 조립의 차이로 반박하지만 **컴파일된 인덱스 + 파일시스템 lookup**은 RAG의 한 변종이라는 시각도 합리적.
- **모델 붕괴 (Model Collapse, Nature)**: 학습 vs 운영 맥락 분리로 반박하지만, 요약의 요약 = 뉘앙스 손실은 실재.
- **Lossy compression**: 원문 대신 위키에 의존하면 요약 오류가 고착. **법률·컴플라이언스에 치명적**.
- **차세대 모델 무력화 가능성**: 10M context · 1000 tps면 중간 계층 불필요? 실측은 20~30만 토큰부터 degradation.
- **벤치마크/프로덕션 부재**: hybrid RAG · BM25+rerank · GraphRAG · 계층 요약 · NotebookLM 대비 우위 증거 0. 권한·다중사용자·감사·롤백·버저닝·동시성·컴플라이언스 미해결. **결론: 소·중규모 · 느린 변화 · 사람 큐레이션 연구 폴더에 유용; 대규모/빠른 변화/고위험/멀티유저/엔터프라이즈는 검증 필요**.
- **인지적 부작용**: *"사고 위임에 의한 새로운 기술 부채"* — "지속적인 뇌의 공백" 경험담.

### 5.2 본 문서 자체의 한계

- **취소선 영역(8.1·8.2·8.3)이 사용자에 의해 잠정 무효화** — Farzapedia/Karpathy 4 BYOAI 장점/nashsu 4-Signal·4-phase 상세가 raw에는 보존되나 사용자 평가가 미완. 이후 갱신 시 취소선 해제 또는 명시적 삭제 결정 필요.
- **자체 검증 없음**: 인용한 GitHub star, HN 댓글 수, Farzapedia 2,500건 등은 출처 자료의 보고치를 신뢰한 것으로 본 문서 시점에서 재검증 안 됨.
- **언어 unbalance**: 한국어 자료(박재홍·GeekNews·unclejobs-ai)는 풍부하지만 영어 ecosystem은 Karpathy 한 명에 집중. 다른 영어 비판(Simon Willison, Hamel Husain 등)은 미커버.

### 5.3 향후 과제

- 본 문서가 정리한 **9-항목 Lint 프롬프트**를 이 ai-wiki에 실제로 주기 적용 → orphan/모순/stale 항목 첫 점검 결과 도출.
- nashsu/llm_wiki의 **4-Signal Relevance Model (Direct ×3.0 / Source overlap ×4.0 / Adamic-Adar ×1.5 / Type affinity ×1.0)** 을 본 wiki의 frontmatter `tags` + 본문 `[[wikilink]]` 데이터로 측정 가능한지 검토.
- **MCP 서버화** (9.5) — 본 ai-wiki를 `akb` MCP 서버에 vault로 등재하면 grep/search/browse를 native tool로 호출 가능. (단, 위키 50 페이지 임계점 인근에서 의사결정)
- **세션 컨텍스트 유실 해결책 (9.7)** — *"index.md와 log.md를 먼저 읽어"*가 본 ai-wiki CLAUDE.md에는 명시 안 됨. `log.md`도 부재. ingest log 도입 검토.

## 6. 관련 연구 (Related Work)

- **본 ai-wiki 내부 (Karpathy LLM Wiki 패턴 직접 인용 자료)**
    - `[[applications/liu-2026-rag-llm-wiki-or-gbrain]]` — Yanli Liu의 RAG/LLM Wiki/GBrain 3-축 결정 프레임워크. **Karpathy LLM Wiki 3-layer 정식화**(raw/wiki/schema) + **단일 ingest = 10~15 page touch** + **scale ceiling ~100 sources** 등 동일 thesis를 영어 1차 자료로 정리. 본 문서와 핵심 수치 일치.
    - `[[applications/garrytan-gbrain]]` — Garry Tan의 markdown-first agent memory(2026-04-05 OSS). Karpathy 패턴을 production 도구로 확장한 사례. *"memory that compounds beats memory that just retrieves"* 동일 thesis.
    - `[[applications/lum1104-understand-anything]]` — 15개 AI 코딩 플랫폼 호환 OSS. `/understand-knowledge` skill + `article-analyzer` agent + `parse-knowledge-base.py`가 **Karpathy LLM Wiki(이 ai-wiki 포함) 패턴 first-class 지원** — wikilink/`index.md` 카테고리 정규식 추출, LLM은 5종 implicit edge만 보완. 본 문서가 정리한 패턴의 **직접 구현체**.
    - `[[applications/gajjar-2026-gbrain-vs-computer-memory]]` · `[[applications/vectorize-2026-gbrain-review-honest-assessment]]` · `[[applications/mantena-2026-hermes-gbrain-setup-vps]]` · `[[applications/techwealth-hub-2026-garry-tan-gbrain-explained]]` — GBrain 생태계 6개 자료. Karpathy LLM Wiki 계보를 production memory 시스템으로 확장한 사례.
    - `[[overviews/gbrain-ecosystem-overview]]` — GBrain 6개 자료 합성. Liu의 3-축 분류에 Karpathy LLM Wiki + Bush Memex 계보 명시.
- **Vectorless / Reasoning-based RAG (대안적 retrieval 패러다임)**
    - `[[database/zhang-2025-pageindex-vectorless-reasoning-rag]]` — PageIndex founder intro. ToC를 LLM active context 안에 두는 **in-context index** + iterative reasoning loop. *"vector DB 없이 reasoning으로 retrieval"* = LLM Wiki의 *"사전 컴파일 + 임베딩 없는 index.md"* 와 철학 공명.
    - `[[database/kalane-2026-pageindex-threw-out-vector-databases]]` — Mafin 2.5 FinanceBench **98.7%** verbatim. *"Vector DB 폐기"* 실증.
    - `[[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]]` — Direct Corpus Interaction (DCI). embedding/index 없이 agent가 `grep`·`bash`로 raw corpus 직접 검색. **BrowseComp-Plus 80.0%** vs Qwen3-Embed-8B 69.0%. LLM Wiki의 *"파일시스템 직접 탐색"*(Karpathy Farzapedia)과 mechanism 일치.
- **Graph-based RAG (구조화된 사전 컴파일 인덱스)**
    - `[[database/guo-2025-lightrag-simple-and-fast]]` — KG entity·relation을 key-value로 직렬화 + dual-level keyword retrieval.
    - `[[database/zhang-2026-leanrag-knowledge-graph-based-generation]]` — hierarchical KG + LCA 기반 retrieval.
- **외부 1차 자료 (Karpathy 패턴 원본)**
    - **Andrej Karpathy, "LLM Wiki" Gist** (2026-04-04) — <https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f>. 5,000+ ★, HN 700+ 댓글.
    - **Hacker News 토론** (item 47640875) — 베이스라인 비교 부재, model collapse, 권한/multi-user 비판.
- **외부 한국어 자료**
    - **박재홍의 실리콘밸리** (위키독스 2026-04-06) — *"LLM에게 지식의 '유지보수'를 맡기다"*. 비판적 분석 + 경제학적 통찰.
    - **GeekNews** (news.hada.io topic 28208, 2026-04-05) — 핵심 요약 + HN 의견 + Farzapedia + BYOAI 4가지.
    - **unclejobs-ai 한국어 번역본 + 10가지 역자 주석** (2026-04-05) — <https://gist.github.com/unclejobs-ai/7af4a9e3446751b8e2c3bc66d23fa0ac>. 본 문서 9장 한국어 9가지 팁의 출처.
- **구현 사례 (외부)**
    - **nashsu/llm_wiki** (Tauri 데스크탑 앱) — <https://github.com/nashsu/llm_wiki>. 2-step CoT Ingest · 4-Signal Relevance Model · 4-phase Query Pipeline.
    - paulshomo/co-wiki, jgoldfed/keppi, doum1004/llmwiki-cli, cagataysengor/llm-wiki-studio, kytmanov/obsidian-llm-wiki-local, tuirk/Kompl, swarmclawai/swarmvault, skyllwt/OmegaWiki, axoviq-ai/synthadoc, theafh/ai-modules, hang-in/seCall — Karpathy gist 댓글 발견 구현체.
    - dragon1086/llm-wiki, Astro-Han/karpathy-llm-wiki, joonan30/llm-wiki-labs (Compounding Wiki 31일 누적), agricidaniel "Obsidian AI Second Brain", OpenKB.
- **역사적 계보**
    - **Vannevar Bush, "Memex" (1945, As We May Think)** — 개인 큐레이션 지식 저장소. 미해결 *"누가 유지하느냐"* 문제에 LLM이 답.
    - **J.C.R. Licklider, "Man-Computer Symbiosis" (1960)** — 인간-컴퓨터 공생 개념.
- **도구**
    - **qmd** — <https://github.com/tobi/qmd>. BM25+벡터 하이브리드 + LLM rerank, 온디바이스, CLI + MCP. wiki 50+ page에서 권장.
    - **Obsidian** — Web Clipper · Graph View · Marp · Dataview · Templater · Linter.

## 7. 용어집 (Glossary)

- **LLM Wiki (Karpathy)**: LLM이 단순 인덱싱이 아니라 **점진적으로 축적·진화하는 위키를 작성·유지**하는 패턴. raw/wiki/schema 3-layer.
- **Persistent Compounding Artifact**: 한 번 컴파일되고 최신 상태로 유지되는 지식 산출물. 매 질의마다 재도출하지 않음.
- **Re-derivation Problem**: RAG가 매 질의마다 같은 문서를 다시 읽어 종합하는 문제. *"RAG rereads the same books for every exam, never learning the material."* (Karpathy)
- **3-Layer**: Raw Sources(사람 immutable) / Wiki(LLM 전적 소유) / Schema(CLAUDE.md·AGENTS.md 공동).
- **Schema (CLAUDE.md/AGENTS.md)**: 위키 구조·컨벤션·워크플로우 정의. LLM을 *"체계적 위키 관리자"*로 만드는 핵심.
- **Ingest**: 새 소스 추가 + LLM 처리. 단일 소스 = 10~15 page touch.
- **Query**: 위키 검색 + 인용+합성. 좋은 답변은 페이지로 재저장 → 복리 축적.
- **Lint**: 주기적 health check. 모순/낡은 주장/orphan/미생성 개념/누락 cross-ref/데이터 공백 6 항목.
- **index.md**: wiki 카탈로그. 매 ingest 갱신, 매 query 첫 reading.
- **log.md**: append-only ingest/query/lint 기록. `## [YYYY-MM-DD]` prefix로 unix grep.
- **qmd**: tobi/qmd. 마크다운 로컬 검색 엔진. BM25+벡터 하이브리드 + LLM rerank, 온디바이스, CLI+MCP.
- **MCP (Model Context Protocol)**: 위키 검색을 native tool로 LLM에 노출. 9.5 *"50 페이지 이상이면 진지하게"*.
- **Farzapedia**: Karpathy 본인의 LLM Wiki 사례. 일기+Notes+iMessage 2,500건 → 400 doc. 에이전트 활용 목적.
- **BYOAI (Bring Your Own AI)**: Karpathy의 4가지 장점 중 하나. Claude/Codex/OpenCode/오픈소스 LLM 자유 연결.
- **File over App**: Karpathy 4 장점 중 하나. 마크다운/이미지 등 범용 포맷 + Unix 툴킷 활용.
- **Memex (Vannevar Bush, 1945)**: 개인 큐레이션 지식 저장소의 원형. *"누가 유지하느냐"* 미해결.
- **Model Collapse**: Nature 논문. LLM이 쓴 텍스트로 LLM을 재학습하면 정보 열화. 본 패턴 비판 7.2에 인용 (학습 vs 운영 맥락 분리로 반박).
- **Lossy Compression (위키 맥락)**: 원문을 위키 페이지로 요약하며 단서·날짜·소수의견·정확 워딩·엣지 케이스 손실. 7.3 비판.
- **Inbound Link / Orphan Page**: 다른 페이지에서 한 번도 링크되지 않은 wiki 페이지. Lint 점검 항목.
- **4-Signal Relevance Model (nashsu)**: Direct link ×3.0 / Source overlap ×4.0 / Adamic-Adar ×1.5 / Type affinity ×1.0. 지식 그래프 페이지 관련성 계산.
- **Adamic-Adar**: 공통 이웃 수를 이웃의 차수로 가중하는 link prediction metric.
- **4-phase Query Pipeline (nashsu)**: 토큰화 검색 → 그래프 확장 → 예산 제어(60/20/5/15) → 컨텍스트 어셈블리(페이지 번호 인용).
- **2-step CoT Ingest (nashsu)**: Analysis(소스 → 구조화 분석: 엔티티/개념/모순/추천) → Generation(분석 → 위키 파일).
- **purpose.md (nashsu)**: schema=how, purpose=why. *"위키 사용 의도"* 명시 파일.
- **Hyperlinked Mention (Liu)**: *"An unlinked mention is a broken brain."* GBrain의 signal-detector 원칙으로 Liu가 인용. LLM Wiki 맥락에서는 Lint의 *"언급만 되고 자체 페이지 없는 개념"* 점검과 동치.
- **취소선(Strikethrough) 영역**: Notion 원문 8.1~8.3에서 사용자가 잠정 무효화·재검토 마킹한 부분. raw에는 `~~...~~`로 보존, sources/wiki는 메타 사실로만 언급.
