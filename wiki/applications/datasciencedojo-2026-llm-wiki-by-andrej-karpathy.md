---
title: "LLM Wiki by Karpathy: 25–35분 입문 튜토리얼 (Data Science Dojo)"
type: article
year: 2026
category: applications
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/articles/datasciencedojo-2026-llm-wiki-by-andrej-karpathy.md
raw_filename: "datasciencedojo-2026-llm-wiki-by-andrej-karpathy.md"
source: datasciencedojo-2026-llm-wiki-by-andrej-karpathy.md
source_collection: external
author: "Data Science Dojo Staff"
url: "https://datasciencedojo.com/blog/llm-wiki-tutorial/"
publisher: "Data Science Dojo Blog"
publication_date: "2026-04-16"
tags: [llm-wiki, karpathy, knowledge-management, obsidian, claude-code, claude-ai, tutorial, rag-vs-wiki, compounding-knowledge, entity-pages, wiki-links, linting, datasciencedojo]
---

## 요약 (Summary)

**Data Science Dojo 블로그**가 Karpathy LLM Wiki Gist(2026-04-04) 공개 약 2주 뒤인 2026-04-16에 발행한 영어권 일반 독자용 **25–35분 입문 튜토리얼**. *"PDF를 ChatGPT에 올려 질문하고 다음날 같은 PDF를 다시 올려본 적이 있다면 LLM Wiki가 푸는 문제를 이미 이해한 것"* 문제의식에서 출발해, **6-step 워크플로우**(5 starter paper 다운로드 → `my-wiki/{raw,wiki}` 폴더 → Claude.ai 또는 Claude Code 컴파일 프롬프트 → Obsidian Graph View → 추가 소스로 복리 누적 → ~20 page 도달 시 linting)와 **3개 verbatim 프롬프트 박스**(초기 컴파일/증분 컴파일/9-항목 linting)를 그대로 제공해 코딩 0줄로 따라할 수 있게 풀어쓴 진입 가이드. 핵심 thesis는 **RAG(stateless 재발견) vs LLM Wiki(stateful 사전 컴파일 + 복리 누적)** 6-축 비교표 — *persistence/multi-doc synthesis/contradiction detection/source traceability/setup complexity/best for*. 본 ai-wiki repo가 같은 패턴을 한국어 + 3-tier(`raw/sources/wiki/`)로 확장한 직접 구현체이며, 본 article은 [[applications/kmyu-2026-llm-wiki-pattern-synthesis]]의 한국어 종합 정리와 **상호 보완**(영어권 진입 vs 한국어 비판/구현 디테일) 관계.

## 주요 기여 (Key Contributions)

1. **6-step 일관 워크플로우 + 3 verbatim 프롬프트** — 1) 5 starter paper(Attention 2017 · BERT 2018 · GPT-3 2020 · Foundation Models 2021 · RLHF 2022) → 2) `raw/`+`wiki/` 2-tier 폴더 → 3) **Option A Claude.ai 무료 티어** 또는 **Option B Claude Code CLI** 양자택일 컴파일 → 4) Obsidian Graph View(Ctrl+G/Cmd+G) → 5) 증분 컴파일로 페이지 enrichment → 6) **~20 new pages 임계**에서 linting 패스 + `maintenance-report.md` 출력.
2. **6-축 RAG vs LLM Wiki 비교표** — Knowledge persistence (None/Full) · Multi-doc synthesis (per query/pre-compiled) · Contradiction detection (No/Yes flagged) · **Source traceability (High/Moderate page-level)** · Setup complexity (Low/Low–Medium) · Best for (Quick Q&A/Deep growing research). source traceability를 **LLM Wiki의 약점**으로 명시한 점이 합리적.
3. **Karpathy wiki 스케일 수치** — *"~100 articles, 400,000 words까지 LLM이 효율적으로 navigate"*. [[applications/kmyu-2026-llm-wiki-pattern-synthesis]]의 *"~100 sources 수백 page까지 OK, 이상은 qmd/BM25+벡터+rerank 필요"* 천장과 동일 임계치.
4. **Entity page 5-항목 규격** — clear title + 2-3 sentence summary + detailed explanation + `[[wiki-links]]` + source paper + contradictions. **본 ai-wiki의 한글 7-헤딩보다 단순한 일반 독자용 구조**.
5. **Compilation step의 4-action 분기** — update existing pages / create new pages / establish wiki-links / flag contradictions. stateless RAG와 stateful LLM Wiki를 가르는 핵심 차이를 LLM 프롬프트에 명시.
6. **Linting 9-항목 prompt verbatim** — orphan pages · duplicates · contradictions · broken `[[wiki-links]]` · oversized pages 5 카테고리를 LLM에 점검 요청, 결과는 `maintenance-report.md`로 받아 사용자 수동 적용. [[applications/kmyu-2026-llm-wiki-pattern-synthesis]] 9-항목 Lint와 6항목 중복.
7. **3 흔한 실수** — one page에 두 개념(split 필요) · linting 패스 미실행(작은 오류 빠르게 전파) · 한 번에 무관 주제 다수(topically related sources일 때 가장 잘 복리).
8. **Next Steps 3가지** — Obsidian Web Clipper(웹→markdown 자동) · **topic-specific multiple wikis**(단일 거대 wiki 회피) · 100+ page 도달 후 smaller model fine-tuning → custom private intelligence.

## 방법론 및 아키텍처 (Methodology and Architecture)

- **2-tier 폴더** (`my-wiki/{raw,wiki}`) — 본 ai-wiki repo 3-tier보다 단순. `sources/` 중간 요약 단계 없음, wiki page가 `raw/`에서 직접 컴파일. 일반 독자 진입 장벽 최소화 목적.
- **Obsidian = view layer only** — Obsidian은 wiki를 **수정**하지 않고 **시각화**만 담당. AI agent의 편집 작업과 충돌 없음. 본 ai-wiki [`CLAUDE.md`](../../CLAUDE.md) *"Browsing with Obsidian"* 섹션과 완전 동일 philosophy.
- **2개 컴파일 프롬프트 분리** — 초기 컴파일(처음 5 paper 일괄) vs 증분 컴파일(*"Read these new research papers AND the existing wiki pages in the wiki/ folder"* — 4-action 분기 명시).
- **Linting 트리거 = ~20 new pages** — 정량 임계치. 빠르게 *"small errors propagate"*하므로 정기 audit pass 필수.
- **5 starter paper 그래프 토폴로지 의도** — transformer → bidirectional → scale/few-shot → 횡단 survey → alignment 5축이 첫 시각화에서 명확한 hub-and-spoke가 나오도록 큐레이션.

## 결과 (Results)

- **튜토리얼 완성 시간**: 25–35분 (5 paper 다운로드 + 폴더 생성 + Claude.ai 1회 프롬프트 + Obsidian 설치까지).
- **코딩 요구량**: 0 (Option A Claude.ai).
- **비용**: 무료 (arXiv 5 paper + Claude.ai free tier + Obsidian 무료).
- **Karpathy 본인 wiki 스케일**: ~100 articles · ~400,000 words.
- **Linting 트리거**: ~20 new pages.
- **정량 벤치마크 없음** — 튜토리얼 콘텐츠라 RAG vs LLM Wiki 정확도 수치는 제시되지 않음. *"LLM이 효율적으로 navigate"* 같은 정성 평가만 인용.

## 한계 (Limitations)

- **2차 자료 한계** — Karpathy Gist의 일반 독자용 풀이판. HN 700+ 댓글의 비판(model collapse / lossy compression / 벤치마크 부재 / *"사고 위임에 의한 새로운 기술 부채"*)이나 박재홍 위키독스 한국어 비판([[applications/kmyu-2026-llm-wiki-pattern-synthesis]] 정리)은 전혀 다루지 않음 — *"LLM Wiki는 RAG보다 우월"* 톤이 강하지만 벤치마크 없는 입문 가이드임을 인지 필요.
- **`raw/` → `wiki/` 직접 컴파일의 추적성 약화** — 중간 요약 단계 없음 → entity page가 어느 원본 문장에서 왔는지 page-level만 추적. 본 ai-wiki repo가 3-tier로 확장한 이유 = 추적성 + 재요약 + 다국어 정책.
- **단일 wiki 가정** — Next Steps에서 *"topic-specific multiple wikis"*만 언급, cross-wiki linking/shared entity 해소/중복 정리는 다루지 않음.
- **사용자 수동 복사 작업** — Option A는 생성 결과를 사용자가 직접 `wiki/`에 복사. 휴먼 에러 가능.
- **언어 정책 부재** — 영어 전용. 본 ai-wiki repo의 한국어 본문 + 영어 식별자/교착어 검색 한계는 범위 밖.
- **fine-tuning 시나리오 미상세** — Next Steps의 *"100+ pages → custom private intelligence"*는 한 줄 언급만, 모델 선정/데이터 포맷/평가 없음.
- **권한·다중사용자·감사·롤백·동시성·컴플라이언스** — 개인 사용자 가정. 엔터프라이즈 시나리오([[applications/dnotitia-akb]] PG-native vault isolation 영역)는 범위 밖.

## 관련 페이지 (Related Pages)

- [[applications/kmyu-2026-llm-wiki-pattern-synthesis]] — 같은 Karpathy Gist를 trunk로 한국어 커뮤니티 자료(박재홍 위키독스 + GeekNews + unclejobs-ai 번역 + nashsu/llm_wiki)를 합성한 11-섹션 종합 article. 본 datasciencedojo와 **상호 보완**: datasciencedojo는 영어권 일반 독자용 진입 가이드(코딩 0줄, 25–35분), kmyu99 Notion은 비판·한국어 실전 팁·구현 디테일·메타 분석.
- [[applications/garrytan-gbrain]] — Y Combinator CEO Garry Tan의 markdown-first AI 에이전트 메모리 시스템. plain markdown 철학 공유하지만 GBrain은 **에이전트 활용** 목적, LLM Wiki는 **개인 학습자 지식 베이스** 목적.
- [[applications/dnotitia-akb]] — Dnotitia의 MCP-first agent knowledge base. PG-native vault isolation + 40+ MCP tool로 엔터프라이즈 시나리오 답. LLM Wiki의 *"개인 사용자 가정"*과 대비.
- [[applications/safishamsi-graphify]] — Safi Shamsi YC S26. 임의 폴더를 3-pass + Leiden community + EXTRACTED/INFERRED/AMBIGUOUS confidence로 NetworkX 그래프 컴파일. 21+ AI 어시스턴트 호환. *"plain markdown + AI agent maintenance"* 패턴의 다른 추상화.
- [[applications/lum1104-understand-anything]] — Karpathy LLM Wiki(이 ai-wiki 포함) 패턴 first-class 지원 OSS 플러그인. wikilink/`index.md` 카테고리 정규식 추출 + LLM 5종 implicit edge 보완.
- [[applications/pandey-2026-rag-is-no-longer-just]] — *"RAG는 single pattern이 아니라 design space"* — 본 article의 RAG vs LLM Wiki 6-축 비교를 *"design space의 한 선택지"*로 재해석 가능.
- [[applications/liu-2026-rag-llm-wiki-or-gbrain]] — Yanli Liu의 3-축 결정 프레임워크(RAG/LLM Wiki/Fat Skills 분류). 본 article이 진입 가이드라면 Liu article은 의사결정 가이드.
