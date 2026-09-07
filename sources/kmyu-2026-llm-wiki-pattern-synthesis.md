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

Andrej Karpathy가 2026년 4월 4일 GitHub Gist로 공개한 LLM Wiki 아이디어 파일을 중심에 두고, 박재홍 위키독스 분석, GeekNews 요약, unclejobs-ai 한국어 번역과 역자 주석, nashsu/llm_wiki 구현 분석을 한국어로 합성한 11개 절 구성의 기술 리포트다. 핵심 주장은 RAG가 질의마다 지식을 다시 발견하는 반면 LLM Wiki는 수집 시점에 지식을 한 번 컴파일해 계속 축적되는 산출물로 유지한다는 것이며, 차이는 검색 기술이 아니라 지식 관리 워크플로에 있다고 본다. 문서는 3계층 아키텍처(Raw, Wiki, Schema), 세 가지 작업(Ingest, Query, Lint), 임베딩 없이 동작하는 `index.md`와 `log.md` 인덱싱, 유지보수 비용 관점의 경제학적 해석, 여섯 가지 비판, 한국어 사용자를 위한 아홉 가지 운영 팁, 구현 사례를 차례로 정리한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 형식 | Notion 페이지 (공개 share). 개인 데이터베이스 "기술 리포트"의 한 항목 |
| 저자 | kmyu99 (Notion 페이지 소유자) |
| URL | <https://kmyu99.notion.site/LLM-wiki-3586150bf13c8057988bf7b9661465e5> |
| 문서 작성일 (본문 말미 자체 기재) | 2026년 5월 6일 |
| 구성 | 최상위 11개 절, 본문 한글 약 4,900자, 외부 URL 15개 |
| 성격 | 1차 자료 요약이 아니라 다수 자료의 한국어 합성 |

문서가 합성한 자료는 다섯 편이다. Karpathy의 GitHub Gist(영어 원문), 박재홍의 실리콘밸리 위키독스 글, GeekNews의 요약과 Hacker News 의견 정리, unclejobs-ai의 한국어 번역본과 역자 주석, nashsu/llm_wiki 구현 분석이다.

### 1.1 취소선 처리 영역

원문 8장의 세 소절(8.1 Farzapedia, 8.2 Karpathy가 정리한 네 가지 장점, 8.3 nashsu/llm_wiki 구현 상세)은 Notion 원문에서 취소선으로 표시돼 있다. raw 파일은 이를 `~~...~~`로 보존한다. 취소선의 의도는 원문에 설명돼 있지 않으므로, 이 문서는 해당 내용을 기록하되 취소선 상태라는 사실을 함께 남긴다.

취소선 영역의 내용은 문서의 다른 곳에서도 언급된다. 11.2절은 GeekNews의 특징으로 "Farzapedia 사례 + Karpathy의 4가지 장점 정리"를 적고, 11.3절은 nashsu/llm_wiki의 특징으로 "2-step Ingest, 4-Signal Relevance Model, 4-phase Query Pipeline"을 적는다. 두 곳 모두 취소선이 없다.

## 2. 주요 기여 (Key Contributions)

1. **분산된 한국어 논의를 한 문서로 통합.** 영어 Gist 한 편과 한국어 자료 세 편(박재홍, GeekNews, unclejobs-ai)을 출처를 명기해 11개 절로 정리했다.
2. **3계층 아키텍처를 표로 명시화.** Raw Sources(사람 소유, 불변, LLM은 읽기만), Wiki(LLM 전적 소유), Schema(사람과 LLM 공동, `CLAUDE.md` 또는 `AGENTS.md`)로 소유권과 가변성을 나눈다.
3. **세 가지 작업을 정식화.** Ingest, Query, Lint 각각의 입력과 절차, 산출물을 나열한다. 단일 소스 하나가 10~15개 위키 페이지에 영향을 준다는 규모 감각을 제시한다.
4. **임베딩 없는 인덱싱 패턴.** `index.md`(콘텐츠 카탈로그)와 `log.md`(시간순 append-only 기록) 두 파일만으로 소스 약 100개, 페이지 수백 개 규모까지 동작한다고 본다. 그 이상은 qmd 같은 검색 도구를 권한다.
5. **Obsidian 보조 도구 카탈로그.** Web Clipper, 첨부 이미지 로컬 다운로드, Graph View, Marp, Dataview, Git 백엔드를 용도와 함께 정리한다.
6. **경제학적 해석.** 위키 유지의 실제 장벽은 읽기나 사고가 아니라 북키핑(bookkeeping)이며, LLM이 이 비용을 거의 0으로 만들어 개인 지식 관리의 경제학 자체를 바꾼다고 본다. Vannevar Bush의 Memex(1945)가 남긴 "누가 유지보수하느냐"에 LLM이 답한다는 계보를 붙인다.
7. **여섯 가지 비판 정리.** RAG 본질 논쟁, 모델 붕괴, 손실 압축, 차세대 모델의 무력화 가능성, 벤치마크와 프로덕션 이슈 부재, 인지적 부작용을 각각 반론과 함께 적는다.
8. **한국어 사용자 실전 팁 아홉 항목.** unclejobs-ai 역자 주석에서 발췌한 것으로, 파일명 규칙부터 MCP 서버 도입 시점, 아홉 항목짜리 Lint 프롬프트 전문까지 포함한다.
9. **RAG 실무자 관점의 적용 가이드.** 적합한 시나리오 네 가지와 신중해야 할 영역 세 가지를 구분하고, 기존 RAG 기법과의 연결점을 짚는다.
10. **구현 사례 열거.** Farzapedia, nashsu/llm_wiki, agricidaniel, joonan30, OpenKB, Astro-Han, dragon1086과 Gist 댓글에서 발견된 구현체 12개를 모은다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 RAG의 구조적 한계와 LLM Wiki의 차별점

문서는 일반적인 LLM 문서 워크플로를 RAG로 규정한다. 파일을 업로드하면 청크 단위로 벡터 DB에 저장하고, 질의 시점에 관련 청크를 검색해 답변을 만든다. NotebookLM, ChatGPT 파일 업로드, 대부분의 RAG 시스템이 이 구조라고 본다.

근본 문제로 지목하는 것은 LLM이 매 질의마다 지식을 처음부터 찾아야 하고 재발견한다는 점이다. 문서 다섯 편을 종합해야 하는 미묘한 질문도 매번 처음부터 조립하고, 이전 질의에서 발견한 연결고리와 모순점, 종합적 해석이 사라진다. 지식이 축적되지 않는다.

LLM Wiki는 LLM이 단순 인덱싱이 아니라 점진적으로 축적되고 발전하는 위키를 구축하고 유지하게 한다. 위키를 사람이 직접 쓰지 않고 LLM이 쓰고 관리한다. 새 소스가 도착하면 LLM은 소스를 읽고 핵심 정보를 추출하며, 기존 위키에 통합해 엔티티와 개념 페이지를 갱신하고, 새 데이터가 기존 주장과 모순되면 표시하며, 진화하는 종합 분석을 강화하거나 도전한다. 지식은 한 번 컴파일되고 최신 상태로 유지되며 질의마다 재도출되지 않는다.

핵심 통찰은 위키가 영속적이고 복리로 축적되는 산출물(persistent, compounding artifact)이라는 것이다. 교차 참조가 이미 구성돼 있고, 모순점이 이미 표시돼 있으며, 종합 분석이 이미 모든 자료를 반영한다. 소스를 추가할수록, 질문할수록 더 풍부해진다.

역할 분담도 명시된다. 사람은 소스 큐레이션과 탐색 방향 결정, 질문 던지기를 맡고, LLM은 요약과 교차 참조, 분류, 기록 관리 같은 허드렛일을 전부 맡는다. Karpathy 본인의 사용 방식은 Obsidian을 IDE로, LLM을 내용을 수정하는 프로그래머로, 위키를 코드베이스로 두는 것이다.

### 3.2 적용 영역

문서는 다섯 영역을 든다.

| 영역 | 예시 |
|---|---|
| 개인 | 목표, 건강, 심리, 자기개발 추적. 일기, 기사, 팟캐스트 노트 정리 |
| 연구 | 수 주에서 수개월간 한 주제를 깊이 파고들며 진화하는 테제를 담은 위키 |
| 독서 | 챕터별 정리, 캐릭터와 테마와 플롯 페이지. Tolkien Gateway 같은 팬 위키를 개인용으로 |
| 비즈니스와 팀 | Slack 스레드, 미팅 전사, 프로젝트 문서로 만드는 내부 위키 |
| 기타 | 경쟁 분석, 실사(due diligence), 여행 계획, 강의 노트, 취미 심층 탐구 |

### 3.3 3계층 아키텍처

| 레이어 | 소유자 | 특성 | 내용 |
|---|---|---|---|
| Raw Sources | 사람 | 불변(immutable) | 큐레이션된 원본 논문, 기사, 이미지, 데이터 파일. LLM은 읽기만 한다 |
| Wiki | LLM | LLM 전적 소유 | 마크다운 파일 디렉토리. 요약, 엔티티, 개념, 비교, 종합 분석 |
| Schema | 사람과 LLM 공동 | 핵심 설정 | `CLAUDE.md`(Claude Code), `AGENTS.md`(Codex) 등 |

Raw Sources는 사용자가 선별한 문서 모음이자 정보의 원(source of truth)이다. LLM이 읽을 수는 있지만 절대 수정하지 않는다.

Wiki는 LLM이 생성한 마크다운 파일 디렉토리로 요약, 엔티티 페이지, 개념 페이지, 비교 자료, 개요, 종합 분석을 포함한다. 새 원본 자료가 도착하면 LLM이 갱신하면서 상호 참조를 관리하고 내용을 일관되게 유지한다. 사용자는 읽기만 한다.

Schema는 위키 구조와 컨벤션, 유지 관리 워크플로를 정의한다. LLM을 범용 챗봇이 아니라 체계적인 위키 관리자로 만드는 핵심이며, 사용자와 LLM이 시간이 지나며 함께 발전시킨다.

### 3.4 세 가지 핵심 작업

| 작업 | 시점 | 절차 | 산출 |
|---|---|---|---|
| Ingest | 새 소스 도착 시 | 소스 읽기, 핵심 요점 사용자와 논의, 위키 요약 페이지 작성, 인덱스 갱신, 관련 엔티티와 개념 페이지 갱신, 로그에 항목 추가 | 단일 소스가 10~15개 위키 페이지에 영향 |
| Query | 대화 중 | 관련 페이지 검색과 읽기, 인용과 함께 답변 합성 | 마크다운 페이지, 비교 테이블, Marp 슬라이드 덱, matplotlib 차트, 캔버스 |
| Lint | 주기적 | 위키 관리 상태 점검(health-check) | 모순, 낡은 주장, 고아 페이지 등 목록 |

Ingest에는 두 가지 운영 방식이 있다. 하나는 한 번에 하나씩 처리하는 순차 수집에 사용자가 직접 관여하는 방식으로, Karpathy가 선호한다고 적혀 있다. 다른 하나는 여러 소스를 한 번에 일관되게 처리하는 일괄 수집으로 감독을 최소화한다.

Query의 중요한 통찰은 좋은 답변을 위키에 새 페이지로 다시 저장할 수 있다는 점이다. 비교 분석과 발견한 연결고리, 심층 분석이 채팅 히스토리로 사라지지 않고 탐색 활동 자체가 지식 베이스에 복리로 축적된다.

Lint의 점검 항목은 여섯 가지다.

- 페이지 간 모순
- 새 소스에 의해 대체된 낡은 주장
- 인바운드 링크 없는 고아 페이지
- 언급만 되고 자체 페이지가 없는 중요 개념
- 누락된 교차 참조
- 웹 검색으로 채울 수 있는 데이터 공백

문서는 LLM이 조사할 새 질문과 찾아볼 새 소스를 제안하는 데 뛰어나다고 덧붙인다.

### 3.5 인덱싱과 로깅

`index.md`는 콘텐츠 중심 카탈로그다. 위키의 모든 페이지를 링크와 한 줄 요약, 메타데이터(날짜, 소스 수 등)로 카탈로그화하고 엔티티, 개념, 소스 같은 카테고리별로 정리한다. LLM은 수집할 때마다 갱신하고 질의할 때마다 먼저 읽는다. 소스 약 100개, 페이지 수백 개 규모까지는 임베딩 기반 RAG 인프라 없이 잘 작동한다.

`log.md`는 시간순 append-only 기록으로 수집, 질의, 점검 내역을 남긴다. 일관된 접두사를 쓰면 unix 도구로 파싱할 수 있다. 예시는 `## [2026-04-02] ingest | Article Title` 형식이고, `grep "^## \[" log.md | tail -5`로 최근 다섯 항목을 뽑는다.

위키 규모가 커지면 선택적으로 CLI 도구를 도입한다. 문서가 권하는 것은 [qmd](https://github.com/tobi/qmd)로, 마크다운 로컬 검색 엔진이며 BM25와 벡터 하이브리드에 LLM reranking을 결합하고 온디바이스로 동작하며 CLI와 MCP 서버를 모두 지원한다.

### 3.6 Obsidian 보조 도구

| 도구 | 용도 |
|---|---|
| Obsidian Web Clipper | 웹 기사를 마크다운으로 변환하는 브라우저 확장. 원본 컬렉션에 소스를 빠르게 추가한다 |
| 첨부 이미지 로컬 다운로드 | 설정에서 첨부 파일 경로를 고정 디렉토리(예: `raw/assets/`)로 지정하고, "현재 파일의 첨부 파일 다운로드"에 단축키를 할당한다. 클리핑 후 단축키를 누르면 이미지가 로컬로 내려온다 |
| Graph View | 위키 구조 파악. 무엇이 무엇과 연결되는지, 어떤 페이지가 허브이고 어떤 페이지가 고아인지 본다 |
| Marp | 마크다운 기반 슬라이드 덱 포맷. 위키 콘텐츠에서 바로 프레젠테이션을 만든다 |
| Dataview | 페이지 frontmatter에 쿼리를 실행하는 플러그인. LLM이 태그, 날짜, 출처 수를 frontmatter에 넣으면 동적 테이블과 목록을 생성한다 |
| Git | 위키가 마크다운 파일로 된 Git 저장소이므로 버전 이력, 브랜치, 협업 기능을 그대로 쓴다 |

이미지 로컬 다운로드에는 주의 사항이 붙는다. URL이 깨질 수 있는 상황에 의존하지 않고 LLM이 이미지를 직접 보고 참조할 수 있게 해주지만, LLM은 인라인 이미지가 포함된 마크다운을 한 번에 원시적으로 읽지 못한다. 해결책은 LLM이 먼저 텍스트를 읽은 다음 참조된 이미지의 일부 또는 전부를 별도로 확인해 추가 맥락을 얻게 하는 것이다.

### 3.7 왜 작동하는가

지식 베이스 유지의 핵심 장벽은 북키핑(bookkeeping)이다. 교차 참조 갱신, 요약 갱신, 모순 표시, 일관성 유지가 부담이며 읽기나 사고가 부담인 것이 아니다. 사람들이 위키를 포기하는 이유는 유지 관리 부담이 가치보다 빠르게 증가하기 때문이다.

LLM의 강점은 지루함을 모르고, 교차 참조 갱신을 잊지 않으며, 한 번에 15개 파일을 처리할 수 있다는 것이다. 유지 관리 비용이 거의 0에 수렴하면서 개인 지식 관리의 경제학 자체가 바뀐다.

역사적 맥락으로는 Vannevar Bush의 Memex(1945)와의 정신적 연결을 든다. 개인적이고 능동적인 큐레이션이며 문서 간 연결이 문서 자체만큼 가치 있다는 점이 같다. Bush가 풀지 못한 "누가 유지보수하느냐"를 LLM이 담당한다.

### 3.8 한국어 운영 아홉 항목

9장은 unclejobs-ai의 한국어 번역본 역자 주석에서 발췌한 것으로 다음 아홉 항목이다.

| 번호 | 항목 | 요지 |
|---|---|---|
| 9.1 | 파일명 컨벤션 | 파일명은 영어 kebab-case, 제목(H1)만 한국어. 한글 파일명은 URL 인코딩과 git 호환성 문제를 일으킨다. frontmatter에는 한영 태그를 병기해 Dataview 쿼리에서 양쪽이 잡히게 한다 |
| 9.2 | 한국어 검색 문제 | 한국어는 교착어라 형태소 분석 없이 검색이 잘 안 된다. qmd의 한국어 토크나이징 지원 여부를 확인해야 한다. 차선책은 `index.md`에 영어 키워드를 병기하는 것이고, 대안은 BM25의 한글 약점을 보완하는 가드레일이다 |
| 9.3 | Obsidian과 에이전트 연동 | Obsidian vault를 LLM 에이전트의 작업 디렉토리로 직접 지정한다. Claude Code는 vault 루트에서 세션을 연다. `.obsidian/` 설정 디렉토리는 LLM이 건드리지 않도록 스키마에 명시하고, Linter 플러그인으로 LLM이 쓴 마크다운을 자동 정규화하며, Templater로 페이지 템플릿을 미리 만든다 |
| 9.4 | 스키마에 들어갈 것 | 디렉토리 구조, 페이지 템플릿(frontmatter와 필수 섹션), 네이밍 규칙, 수집 워크플로 체크리스트, 금지 사항(원시 소스 수정 금지, 원문 통째 복사 금지 등) |
| 9.5 | MCP 서버 | 위키 검색을 MCP 서버로 노출하면 LLM이 셸 명령어가 아니라 네이티브 도구로 직접 호출한다. Claude Code는 `.mcp.json`에 등록한다. 위키가 50페이지를 넘으면 진지하게 고려할 가치가 있다 |
| 9.6 | RAG와 병행 | 원문은 RAG 대체재처럼 설명하지만 실제로는 보완재다. 1차 레이어가 위키(컴파일된 지식), 2차 레이어가 원시 소스 RAG(원문 검증 도구) |
| 9.7 | 세션 간 컨텍스트 유실 | 원문에 명시되지 않은 실전 가치. 새 세션 시작 시 `index.md`와 `log.md`를 먼저 읽으라고 스키마에 박아두면 어제의 분석에서 즉시 이어갈 수 있다 |
| 9.8 | 비용과 규모 감각 | 소스 1건 수집은 입력과 출력을 합쳐 수만에서 십수만 토큰을 소비할 수 있다. 질의 1건은 인덱스와 관련 페이지 2~5개로 상대적으로 가볍다. 위키 100페이지 이상이면 인덱스만으로 탐색이 어려워져 qmd 같은 검색 도구 도입 시점이 된다 |
| 9.9 | Lint 실전 프롬프트 | 아홉 항목짜리 점검 프롬프트를 전문으로 제공한다 |

9.2의 가드레일 대안에는 kurthong의 seCall 사례가 붙어 있다. 11.3절의 구현체 목록에는 hang-in/seCall이 들어 있다.

9.9의 프롬프트 전문은 다음과 같다.

```
위키 상태를 점검해줘. 아래 항목을 순서대로 확인하고 결과를 보고해:

1. index.md에 등록되었지만 실제 파일이 없는 항목 (깨진 링크)
2. 파일은 있지만 index.md에 누락된 페이지 (미등록 페이지)
3. 다른 페이지에서 한 번도 링크되지 않은 고아 페이지
4. 2개 이상의 페이지에서 서로 모순되는 주장
5. 언급은 되지만 자체 페이지가 없는 주요 개념
6. source_count가 3 이상인데 요약이 1문단 이하인 빈약한 페이지
7. 최근 수집된 소스가 기존 주장을 업데이트했어야 하는데 반영 안 된 곳

각 항목에 대해 발견 사항과 구체적인 수정 제안을 함께 알려줘.
```

원문 9.9절은 이 프롬프트를 아홉 항목짜리로 소개하지만 실제 코드 블록에는 일곱 항목이 들어 있다.

### 3.9 RAG 실무자 관점

문서 10장은 이 패턴의 위치를 검색 기술의 새 패러다임이 아니라 지식 관리 워크플로의 재구성으로 규정한다. nashsu의 4-Signal Relevance Model과 4-phase Query Pipeline은 결국 그래프 RAG에 가까운 것으로 본다. "RAG가 아니다"라는 프레이밍을 곧이곧대로 받지 말고 하이브리드 검색과 사전 컴파일된 지식 레이어의 조합으로 이해하기를 권한다.

적용 가능 시나리오는 네 가지다.

- 자기주도 학습 자료 정리. 12주 LLM 엔지니어링 커리큘럼이나 24주 논문 기반 커리큘럼처럼 누적 학습이 필요한 영역
- 인터뷰와 면접 준비. 회사별 정보, 예상 질문, 답변, 회사 분석 누적
- 클라이언트 케이스 누적 문서화. Vision AI 프로젝트처럼 평가 메트릭과 모델 선택 기준 같은 공통 패턴이 추출돼야 하는 도메인
- arXiv 논문 정리와 리뷰. 종합 분석 페이지가 자동으로 진화하는 구조

신중하게 적용할 영역은 세 가지다.

- Legal과 Compliance RAG. 손실 압축이 치명적이고 원문 보존이 필수다
- 프로덕션 검색 시스템. 벤치마크가 없고 권한 모델과 감사 로그 같은 이슈가 미해결이다
- 빠르게 변하는 데이터. 위키 동기화 비용이 가치를 추월할 위험이 있다

기존 RAG 기법과의 연결에서는 GraphRAG, 멀티홉 검색, 계층적 요약, 하이브리드 검색(BM25와 벡터)이 자연스럽게 이어진다고 보고, 기존 도구로도 충분히 구현할 수 있으며 Karpathy의 기여는 워크플로와 철학 측면이라고 정리한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 문서는 합성 article이라 자체 벤치마크가 없다. 인용한 수치는 다음과 같다.

| 항목 | 수치 | 출처 맥락 |
|---|---|---|
| Gist 반응 | GitHub 별과 포크 5,000개 이상, Hacker News 댓글 700개 이상 | 1장 |
| 구현체 등장 | 공개 한 달 만에 다수 등장. Gist 댓글에서 발견된 것 12개 열거 | 1장, 11.3절 |
| 단일 소스의 영향 범위 | 위키 페이지 10~15개 | 4.1절 |
| 임베딩 없는 운영 한계 | 소스 약 100개, 페이지 수백 개 | 5.1절 |
| MCP 도입 검토 시점 | 위키 50페이지 | 9.5절 |
| 검색 도구 도입 시점 | 위키 100페이지 | 9.8절 |
| 수집 비용 | 소스 1건당 입력과 출력 합쳐 수만에서 십수만 토큰 | 9.8절 |
| context window 한계 | 100만 토큰 모델도 20만에서 30만 토큰에서 기억 손실 시작 | 7.4절 |

Gist 댓글에서 발견된 구현체 12개는 paulshomo/co-wiki, gowtham0992/link, jgoldfed/keppi, doum1004/llmwiki-cli, cagataysengor/llm-wiki-studio, kytmanov/obsidian-llm-wiki-local, tuirk/Kompl, swarmclawai/swarmvault, skyllwt/OmegaWiki, axoviq-ai/synthadoc, theafh/ai-modules, hang-in/seCall이다.

### 4.1 취소선 영역의 수치

아래 내용은 원문에서 취소선으로 표시된 8.1에서 8.3절에 있다.

Farzapedia는 Karpathy 본인이 좋은 사례로 언급한 구현이다. 일기와 Apple Notes, iMessage 2,500건을 입력해 위키 문서 400개를 자동 생성했다. 친구, 스타트업, 좋아하는 애니메이션, 영감 이미지까지 백링크로 연결했다. 사용자 열람용이 아니라 에이전트가 활용하는 지식 베이스로 설계했고, Claude Code를 위키에 연결해 `index.md`를 진입점으로 에이전트가 직접 탐색하게 한다. 1년 전 RAG 기반으로 시도했으나 성능이 부족해 파일시스템 직접 탐색으로 바꿨다. 새 항목을 추가하면 관련된 기존 문서 2~3개를 자동으로 갱신하거나 새 문서를 만든다.

Karpathy가 정리한 네 가지 장점은 기존 AI 개인화 방식과 대비한 것이다.

| 장점 | 내용 |
|---|---|
| Explicit (명시성) | 메모리가 위키 형태로 보인다. AI가 무엇을 알고 모르는지 직접 확인하고 관리할 수 있다 |
| Yours (데이터 소유권) | 로컬 컴퓨터에 저장하며 특정 AI 제공업체에 락인되지 않는다 |
| File over App (파일 우선) | 마크다운과 이미지 같은 범용 포맷이라 Unix 툴킷을 활용할 수 있다 |
| BYOAI (AI 선택 자유) | Claude, Codex, OpenCode를 자유롭게 연결하고 오픈소스 AI를 위키로 fine-tuning할 수도 있다 |

이 절은 에이전트 활용 능력이 21세기의 핵심 스킬이라는 문장으로 강조를 맺는다.

nashsu/llm_wiki는 Karpathy 패턴을 Tauri 데스크탑 앱으로 구현한 것으로 GitHub 별 23개다.

- **2-step Chain-of-Thought Ingest**: Step 1(Analysis)에서 소스를 구조화된 분석(엔티티, 개념, 모순, 추천)으로 바꾸고, Step 2(Generation)에서 분석을 위키 파일로 만든다.
- **purpose.md 추가**: schema가 "어떻게"라면 purpose는 "왜"에 해당한다.
- **4-Signal Relevance Model** (지식 그래프): Direct link 3.0배(`[[wikilinks]]`), Source overlap 4.0배(frontmatter `sources[]` 공유), Adamic-Adar 1.5배(공통 이웃을 이웃의 차수로 가중), Type affinity 1.0배(같은 타입 보너스).
- **4-phase Query Pipeline**: Phase 1은 토큰화 검색(영어 단어 분리, 한중일 bigram), Phase 2는 그래프 확장(검색 결과를 시드로 관련성 모델 적용), Phase 3은 예산 제어(위키 60%, 히스토리 20%, 인덱스 5%, 시스템 15%), Phase 4는 컨텍스트 어셈블리(페이지 번호 인용)다.
- 다국어를 지원하고 Chrome 확장(웹 클리퍼)과 멀티 포맷(PDF, DOCX, PPTX, XLSX)을 다룬다.

### 4.2 취소선 없는 기타 구현 사례

8.4절은 취소선 없이 다음을 든다.

- Agrici Daniel의 "Obsidian AI Second Brain: The Open-Source Plugin That Organizes Itself"
- joonan30의 "Compounding Wiki, 31일의 누적"
- OpenKB. LLM이 문서를 자동으로 위키 형태 지식 베이스로 컴파일하는 오픈소스 도구
- Astro-Han/karpathy-llm-wiki
- dragon1086/llm-wiki

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5.1 문서가 정리한 여섯 가지 비판

| 번호 | 비판 | 반론 또는 평가 |
|---|---|---|
| 7.1 | 결국 RAG다. 벡터 DB 대신 인덱스 파일과 파일시스템 계층을 쓸 뿐, 의미적 연결 인덱스와 검색 보조 구조 자체는 RAG와 같다 | 사전 컴파일과 런타임 조립의 차이이며, 검색 기술이 아니라 지식 관리 패턴의 차이라고 반박한다 |
| 7.2 | 모델 붕괴. Nature 논문을 인용해 LLM이 쓴 텍스트를 다시 LLM이 처리하면 정보가 점진적으로 열화한다고 본다 | 그것은 LLM 학습의 맥락이며 이미 학습된 모델로 위키를 작성하는 맥락과 다르다고 반박한다. 다만 LLM이 생성한 요약을 다시 요약하면 미묘한 뉘앙스가 빠지는 현상은 실제로 존재한다고 인정한다 |
| 7.3 | 손실 압축. 원문을 위키 페이지로 재작성하며 단서(caveats), 정확한 날짜, 소수 의견, 정확한 워딩, 엣지 케이스, 소스 컨텍스트가 손실된다 | 원본 대신 위키를 검색하기 시작하면 요약 오류가 지식 베이스에 고착된다는 위험을 그대로 인정한다 |
| 7.4 | 차세대 모델이 다 해결한다. 1,000만 컨텍스트에 초당 1,000토큰 모델이 나오면 중간 계층 자체가 불필요하다 | 100만 컨텍스트도 20만에서 30만 토큰에서 기억 손실이 시작되므로 근본 한계는 같다고 반박한다 |
| 7.5 | 벤치마크와 프로덕션 이슈 부재 | 하이브리드 RAG, BM25와 reranking 조합, GraphRAG, 계층적 요약, NotebookLM 같은 베이스라인 대비 우위 증거가 없다. 권한, 다중 사용자 편집, 감사 로그, 롤백, 출처 버저닝, 동시성, 컴플라이언스도 무시된다 |
| 7.6 | 인지적 부작용 | 한 개발자의 후기로 새로운 형태의 기술 부채가 발생한다고 적는다. 사고 정리를 LLM에 위임하며 직접 깊이 생각하는 능력이 약해지는 느낌, 지속적인 뇌의 공백을 경험했다는 내용이다 |

7.5의 합리적 결론으로 문서는 이렇게 정리한다. 소규모에서 중규모, 느린 변화, 사람이 큐레이션하는 연구 폴더에 유용하며, 대규모나 빠른 변화, 고위험, 멀티유저, 엔터프라이즈 환경에는 검증이 필요하다.

### 5.2 이 문서 자체의 한계

- **취소선 영역의 상태가 미결이다.** 8.1에서 8.3절(Farzapedia, Karpathy의 네 가지 장점, nashsu 구현 상세)이 취소선으로 남아 있고 그 이유가 문서 안에 설명돼 있지 않다.
- **자체 검증이 없다.** GitHub 별 수, Hacker News 댓글 수, Farzapedia 2,500건 같은 수치는 출처 자료의 보고치를 그대로 옮긴 것이다.
- **영어권 자료가 Karpathy 한 명에 집중돼 있다.** 한국어 자료는 세 편을 다루지만 영어권 비판은 Hacker News 스레드 요약에 그친다.
- **9장의 항목 수가 어긋난다.** 11.2절은 unclejobs-ai 역자 주석을 10가지로 소개하지만 9장은 아홉 항목만 발췌한다. 9.9절도 아홉 항목짜리 프롬프트를 표방하나 코드 블록에는 일곱 항목이 들어 있다.

### 5.3 문서가 남긴 미해결 항목

- **qmd의 한국어 토크나이징 지원 여부.** 9.2절이 확인이 필요하다고만 적고 결론을 내지 않는다.
- **BM25의 한글 약점 보완.** 가드레일 대안으로 kurthong의 seCall 사례만 언급하고 방법을 설명하지 않는다.
- **베이스라인 비교 실험.** 7.5절이 지적한 우위 증거 부재는 반론 없이 남는다.

## 6. 관련 연구 (Related Work)

### 6.1 이 문서가 인용한 1차 자료

- **Andrej Karpathy, "LLM Wiki" Gist** (2026-04-04). <https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f>. 이 문서가 11.1절에 적은 gist 주소다.
- **Hacker News 토론** (item 47640875). 댓글 700개 이상. RAG 본질 논쟁, 모델 붕괴 우려, 베이스라인 비교 부재 비판.

### 6.2 한국어 자료

- **박재홍의 실리콘밸리** (위키독스 블로그, 2026-04-06). "LLM에게 지식의 '유지보수'를 맡기다: Karpathy의 LLM Wiki 패턴". 비판적 분석(모델 붕괴, 손실 압축)과 경제학적 통찰.
- **GeekNews** (news.hada.io topic 28208, 2026-04-05). "LLM-Wiki, LLM을 활용하여 개인 지식저장소 구축 하기". 핵심 요약과 Hacker News 의견 정리, Farzapedia 사례, Karpathy의 네 가지 장점.
- **unclejobs-ai 한국어 번역본과 역자 주석** (2026-04-05). <https://gist.github.com/unclejobs-ai/7af4a9e3446751b8e2c3bc66d23fa0ac>. 9장 한국어 팁의 출처.

### 6.3 역사적 계보와 도구

- **Vannevar Bush, "Memex"** (1945, As We May Think). 개인 큐레이션 지식 저장소의 원형 개념.
- **J.C.R. Licklider, "Man-Computer Symbiosis"** (1960). 인간과 컴퓨터의 공생 개념.
- **qmd**. <https://github.com/tobi/qmd>. 마크다운용 로컬 검색 엔진.

### 6.4 이 저장소 안의 관련 자료

- `[[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]]`. 같은 Karpathy Gist를 다룬 영어권 입문 튜토리얼. 실행 절차 중심이라 이 문서의 비판과 한국어 운영 팁과 역할이 나뉜다.
- `[[applications/liu-2026-rag-llm-wiki-or-gbrain]]`. RAG, LLM Wiki, GBrain 선택 기준을 영어 1차 자료로 정리했다. 3계층 정식화와 단일 수집이 10~15개 페이지에 영향을 준다는 규모 감각이 같다. 다만 context window 성능 저하 지점은 Liu가 한도의 30~40%라 적고 이 문서는 100만 토큰 기준 20만에서 30만 토큰이라 적어 수치가 다르다.
- `[[applications/garrytan-gbrain]]`. markdown 우선 에이전트 메모리 도구. 마크다운 파일을 지식 원본으로 두고 계속 쌓는 발상을 공유한다.
- `[[applications/lum1104-understand-anything]]`. Karpathy 패턴 위키를 지식 그래프로 시각화하는 오픈소스.
- `[[applications/dragon1086-llm-wiki]]`, `[[applications/agricidaniel-claude-obsidian]]`, `[[applications/joonan30-llm-wiki-labs]]`. 이 문서 8.4절이 이름만 들고 지나간 구현체를 이 저장소가 개별 페이지로 다룬 것들이다.
- `[[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]]`. 임베딩 없이 에이전트가 `grep`과 `bash`로 원본 코퍼스를 직접 검색하는 Direct Corpus Interaction. Farzapedia의 파일시스템 직접 탐색과 방식이 겹친다.
- `[[database/zhang-2025-pageindex-vectorless-reasoning-rag]]`, `[[database/kalane-2026-pageindex-threw-out-vector-databases]]`. 벡터 DB 없이 목차를 컨텍스트 안에 두는 retrieval. 임베딩 없는 `index.md` 발상과 통한다.
- `[[database/guo-2025-lightrag-simple-and-fast]]`, `[[database/zhang-2026-leanrag-knowledge-graph-based-generation]]`. 그래프 기반 RAG. 이 문서 10.1절이 nashsu의 관련성 모델을 그래프 RAG에 가깝다고 본 것과 이어진다.

## 7. 용어집 (Glossary)

- **LLM Wiki**: LLM이 단순 인덱싱이 아니라 점진적으로 축적되고 진화하는 위키를 작성하고 유지하는 패턴. Raw, Wiki, Schema 3계층으로 구성한다.
- **persistent compounding artifact**: 한 번 컴파일되고 최신 상태로 유지되는 지식 산출물. 질의마다 재도출하지 않는다.
- **Schema**: 위키 구조와 컨벤션, 워크플로를 정의하는 파일. `CLAUDE.md`나 `AGENTS.md`가 여기 해당한다. LLM을 체계적인 위키 관리자로 만드는 핵심이다.
- **Ingest**: 새 소스를 원시 컬렉션에 추가하고 LLM이 요약, 인덱스, 엔티티 페이지, 로그까지 갱신하는 작업. 단일 소스가 위키 페이지 10~15개에 영향을 준다.
- **Query**: 위키를 검색해 인용과 함께 답변을 합성하는 작업. 좋은 답변은 새 페이지로 저장해 다시 축적한다.
- **Lint**: 위키의 주기적 상태 점검. 모순, 낡은 주장, 고아 페이지, 자체 페이지 없는 개념, 누락된 교차 참조, 데이터 공백을 본다.
- **고아 페이지(orphan page)**: 다른 페이지에서 인바운드 링크를 한 번도 받지 못한 위키 페이지. Lint 점검 항목이다.
- **북키핑(bookkeeping)**: 교차 참조 갱신, 요약 갱신, 모순 표시, 일관성 유지 같은 기록 관리 작업. 문서는 이것을 위키 유지의 실제 장벽으로 본다.
- **qmd**: tobi/qmd. 마크다운용 로컬 검색 엔진. BM25와 벡터 하이브리드에 LLM reranking을 붙이고 온디바이스로 동작하며 CLI와 MCP 서버를 지원한다.
- **Farzapedia**: Karpathy 본인의 LLM Wiki 사례. 일기와 Apple Notes, iMessage 2,500건에서 문서 400개를 만들었고 에이전트 활용을 목적으로 설계했다.
- **BYOAI (Bring Your Own AI)**: Karpathy가 든 네 가지 장점 중 하나. 위키가 특정 제공업체에 묶이지 않아 Claude, Codex, OpenCode를 자유롭게 연결한다.
- **File over App**: 네 가지 장점 중 하나. 마크다운과 이미지 같은 범용 포맷이라 Unix 툴킷을 쓸 수 있다.
- **Memex**: Vannevar Bush가 1945년 제시한 개인 큐레이션 지식 저장소의 원형. 문서 간 연결이 문서 자체만큼 가치 있다고 봤으나 유지보수 주체 문제를 남겼다.
- **model collapse (모델 붕괴)**: LLM이 쓴 텍스트로 LLM을 다시 학습시키면 정보가 열화하는 현상. 7.2절 비판에 인용된다.
- **lossy compression (손실 압축)**: 원문을 위키 페이지로 요약하며 단서, 날짜, 소수 의견, 정확한 워딩, 엣지 케이스가 사라지는 것. 7.3절 비판이다.
- **4-Signal Relevance Model**: nashsu/llm_wiki의 페이지 관련성 계산. Direct link 3.0배, Source overlap 4.0배, Adamic-Adar 1.5배, Type affinity 1.0배.
- **Adamic-Adar**: 공통 이웃 수를 이웃의 차수로 가중하는 link prediction 지표.
- **4-phase Query Pipeline**: nashsu/llm_wiki의 질의 처리. 토큰화 검색, 그래프 확장, 예산 제어(60/20/5/15), 컨텍스트 어셈블리 순서다.
- **2-step Chain-of-Thought Ingest**: nashsu/llm_wiki의 수집 방식. Analysis 단계에서 구조화 분석을 만들고 Generation 단계에서 위키 파일을 쓴다.
- **purpose.md**: nashsu/llm_wiki가 추가한 파일. schema가 "어떻게"를 담는다면 purpose는 "왜"를 담는다.
