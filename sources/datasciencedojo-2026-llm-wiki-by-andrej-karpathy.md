---
title: "LLM Wiki by Andrej Karpathy: Build a Compounding Knowledge Base — Data Science Dojo 튜토리얼"
type: article
year: 2026
category: applications
raw_path: raw/articles/datasciencedojo-2026-llm-wiki-by-andrej-karpathy.md
raw_filename: "datasciencedojo-2026-llm-wiki-by-andrej-karpathy.md"
source_collection: external
author: "Data Science Dojo Staff"
url: "https://datasciencedojo.com/blog/llm-wiki-tutorial/"
publisher: "Data Science Dojo Blog"
publication_date: "2026-04-16"
tags: [llm-wiki, karpathy, knowledge-management, obsidian, claude-code, claude-ai, tutorial, rag-vs-wiki, compounding-knowledge, entity-pages, wiki-links, linting, datasciencedojo]
---

## 한 줄 요약 (One-line Summary)

**Data Science Dojo 블로그**의 2026-04-16 튜토리얼 — Andrej Karpathy가 2026-04 GitHub Gist로 공개한 **LLM Wiki 패턴**을 일반 독자가 25–35분 안에 따라할 수 있도록 6-step 워크플로우(starter 5 papers → `raw/`+`wiki/` 폴더 → Claude.ai 또는 Claude Code 컴파일 프롬프트 → Obsidian Graph View → 추가 소스로 복리 축적 → ~20 page 도달 시 linting 패스)로 풀어쓴 입문 가이드. **핵심 thesis**: RAG는 매 질의마다 stateless 재발견하지만 LLM Wiki는 **사전 컴파일된 entity page**(Wikipedia 스타일 1개념 1파일 + `[[wiki-links]]`)에 지식이 영속·복리 축적된다 — *"PDF를 ChatGPT에 올려 질문하고 다음날 같은 PDF를 다시 올려본 적이 있다면 LLM Wiki가 푸는 문제를 이미 이해한 것"*. 6×2 비교표(persistence/multi-doc synthesis/contradiction detection/source traceability/setup complexity/best-for)로 RAG와 정면 대조하고, Karpathy 본인 wiki가 **~100 articles, 400,000 words**까지 성장해도 LLM이 효율적으로 탐색 가능했다는 수치를 제시. 시작용 5 paper(Attention 2017 arXiv:1706.03762 · BERT 2018 arXiv:1810.04805 · GPT-3 2020 arXiv:2005.14165 · Foundation Models 2021 arXiv:2108.07258 · RLHF 2022 arXiv:2203.02155)와 컴파일/증분 갱신/maintenance용 **3개 verbatim 프롬프트**를 그대로 제공. 본 ai-wiki repo가 Karpathy 패턴을 직접 구현한 한국어 변형이며, 본 article은 영어권 일반 독자에게 같은 패턴을 단순화 진입로(Claude.ai 한 번이면 코딩 0줄)로 소개한다는 점에서 [[applications/kmyu-2026-llm-wiki-pattern-synthesis]]의 한국어 종합 정리와 짝을 이룬다.

## 1. 자료 정보 (Document Information)

- **형식**: Data Science Dojo 블로그 게시물 (마케팅 톤 포함된 입문 튜토리얼)
- **저자**: Data Science Dojo Staff (개인 저자가 아닌 staff byline — 일반 독자 대상 콘텐츠 마케팅)
- **퍼블리셔**: Data Science Dojo Blog (데이터 사이언스 부트캠프/교육 기관)
- **URL**: <https://datasciencedojo.com/blog/llm-wiki-tutorial/>
- **발행일**: 2026-04-16 (Karpathy Gist 공개 약 2주 후 — 빠른 입문 가이드 포지셔닝)
- **분량**: ~1,800자 영문 본문 + 1 비교표 + 3 verbatim 프롬프트 박스 + FAQ 6개
- **성격**: 1차 자료가 아니라 **Karpathy Gist의 2차 해설 + 실행 가이드**. 5 paper 추천·6 step 구분·시간 추정(25–35분)·코딩 불필요 강조 등 진입 장벽을 낮춘 콘텐츠 마케팅 포맷.

## 2. 주요 기여 (Key Contributions)

1. **6-step 일관 워크플로우 정식화** — 1) 5 starter paper 다운로드 → 2) `my-wiki/{raw,wiki}` 폴더 → 3) 컴파일 프롬프트(Claude.ai 또는 Claude Code 양자택일) → 4) Obsidian Graph View 열기(Ctrl+G/Cmd+G) → 5) 추가 소스로 복리 누적(증분 프롬프트) → 6) ~20 page 도달 시 linting 패스. 단계마다 **verbatim 프롬프트 박스**를 제공해 복사·붙여넣기 가능.
2. **6-축 RAG vs LLM Wiki 비교표** — *persistence*(None vs Full) · *multi-doc synthesis*(per query vs pre-compiled) · *contradiction detection*(No vs Yes-flagged) · *source traceability*(High vs Moderate page-level) · *setup complexity*(Low vs Low–Medium) · *best for*(Quick Q&A vs Deep growing research). **source traceability를 LLM Wiki의 약점으로 명시**한 점이 합리적 — page-level만 보존되고 인용 문장 단위 추적성은 RAG보다 낮다.
3. **Karpathy wiki 스케일 수치 인용** — *"Karpathy's own wiki reached approximately 100 articles and 400,000 words before he noted that the LLM could still navigate it efficiently"*. [[applications/kmyu-2026-llm-wiki-pattern-synthesis]]의 *"~100 sources 수백 page까지 OK, 이상은 qmd/BM25+벡터 도구 필요"* 천장과 정확히 동일한 임계치.
4. **5 starter paper 큐레이션** — Attention 2017 / BERT 2018 / GPT-3 2020 / Foundation Models 2021 / RLHF 2022. **transformer → bidirectional → scale/few-shot → 횡단 survey → alignment** 5축으로 한 graph 안에 transformer-attention-BERT-fine-tuning-RLHF-alignment-GPT 연결이 자연 발생하도록 설계.
5. **두 가지 진입 옵션을 동시 제시** — Option A(Claude.ai 무료 티어 + PDF 직접 업로드, 코딩 0줄, 생성 결과를 사용자가 수동 복사) vs Option B(Claude Code CLI, 파일 직접 읽기/쓰기 자동). *"코딩 불필요"*가 헤드라인이라 Option A가 메인.
6. **Linting prompt 9-항목 verbatim** — 1) orphan pages(no incoming/outgoing links) · 2) duplicate or near-duplicate pages to merge · 3) contradictions between pages · 4) broken or incorrect `[[wiki-links]]` · 5) pages too long to split. 결과는 `maintenance-report.md`로 받아 사용자가 수동 적용. [[applications/kmyu-2026-llm-wiki-pattern-synthesis]] 9-항목 Lint 프롬프트와 6 항목 중복.
7. **3 흔한 실수 명시** — 1) one page에 두 개념 = split 필요 · 2) linting 패스 미실행 = 작은 오류가 빠르게 전파 · 3) 한 번에 무관 주제 다수 투입 = topically related sources일 때 가장 잘 복리 누적.
8. **Next Steps 3 항목** — Obsidian Web Clipper 브라우저 확장(웹페이지→markdown 자동) · 단일 거대 wiki 대신 **topic-specific multiple wikis**(cleaner graphs) · 100+ page 잘 유지된 후 *"smaller model fine-tuning으로 custom private intelligence"*. 마지막 항목은 [[applications/kmyu-2026-llm-wiki-pattern-synthesis]]의 미래 활용 시나리오와 일치하지만 본 article은 fine-tuning 디테일·BYOAI 4 장점·model collapse 우려 등은 다루지 않음.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

- **2-tier 폴더 구조** (`my-wiki/{raw,wiki}`) — `raw/`는 immutable 원본(PDF·article·notes, 수동 편집 금지), `wiki/`는 AI agent가 작성하는 entity page. **본 ai-wiki repo의 3-tier(`raw/sources/wiki/`)보다 한 단계 단순** — `sources/` 중간 요약 단계가 없고 wiki page가 raw에서 직접 컴파일됨.
- **Entity page 5-항목 규격** — (1) clear title + 2-3 sentence summary · (2) 상세 설명 · (3) `[[wiki-links]]` to related concepts · (4) source paper(s) where concept appears · (5) papers 간 모순/긴장 표기. **본 ai-wiki의 한글 7-헤딩 (요약/기여/방법/결과/한계/관련/용어집)보다 단순한 구조** — 일반 독자용으로 진입 장벽 최소화.
- **Compilation step의 4가지 작업** — 1) update existing pages · 2) create new entity pages · 3) establish `[[wiki-links]]` · 4) flag contradictions. 이 4 작업이 stateless RAG와 stateful LLM Wiki를 가르는 핵심 차이.
- **2개 컴파일 프롬프트 분리** — 초기 컴파일 프롬프트(5 paper 전체 처음 처리)와 증분 컴파일 프롬프트(*"Read these new research papers AND the existing wiki pages in the wiki/ folder"*)를 별도 verbatim 제공. 증분 프롬프트는 4-action 분기(create new / update existing / add wiki-links / flag contradictions)를 LLM에 명시.
- **Linting 트리거 = ~20 new pages** — 정량 임계치 명시. 빠르게 *"small errors propagate"*하므로 정기 audit pass 필수.
- **Obsidian = view layer only** — Obsidian은 wiki를 **수정**하지 않고 **시각화**만 담당. Graph View가 entity page를 노드로, `[[wiki-links]]`를 엣지로 렌더링. 본 ai-wiki repo의 *"Browsing with Obsidian"* 섹션과 완전 동일한 philosophy.
- **5 starter paper의 그래프 토폴로지 예측** — *"transformer architecture linking to attention mechanisms, BERT connecting to fine-tuning, RLHF connecting to alignment and GPT concepts"* — 5 paper 큐레이션이 의도적으로 첫 그래프 시각화에서 명확한 hub-and-spoke 토폴로지가 나오도록 설계됨.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- **Karpathy 본인 wiki 스케일**: ~100 articles · ~400,000 words까지 성장해도 LLM이 효율적으로 탐색 가능했다고 본인 보고 (출처: Gist).
- **튜토리얼 완성 추정 시간**: 25–35분 (5 paper 다운로드 + 폴더 생성 + Claude.ai 1회 프롬프트 + Obsidian 설치까지).
- **코딩 요구량**: 0 (Option A Claude.ai 사용 시).
- **시작 자료 비용**: 무료 (arXiv 5 paper + Claude.ai free tier + Obsidian 무료).
- **Linting 트리거 임계**: ~20 new pages.
- **정량 벤치마크 없음** — article은 **튜토리얼**이라 RAG vs LLM Wiki 정확도 비교 등의 수치는 제시하지 않는다. *"LLM이 효율적으로 navigate"* 같은 정성 평가만 인용.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **2차 자료 한계** — Karpathy Gist의 일반 독자용 풀이판. **HN 700+ 댓글의 비판**(model collapse / lossy compression / 벤치마크 부재 / *"사고 위임에 의한 새로운 기술 부채"*)이나 박재홍 위키독스의 한국어 비판([[applications/kmyu-2026-llm-wiki-pattern-synthesis]] 정리)은 전혀 다루지 않음. 즉 *"LLM Wiki는 RAG보다 우월하다"* 톤이 강하지만 **벤치마크 없는 입문 가이드**임을 독자가 인지해야 함.
- **`raw/` → `wiki/` 직접 컴파일의 추적성 약화** — `sources/` 중간 요약 단계가 없어 entity page가 어느 원본 문장에서 왔는지 page-level만 추적 가능. 본 ai-wiki repo가 의도적으로 3-tier로 확장한 이유 = 추적성·재요약·다국어 정책.
- **single wiki 가정** — Next Steps에서 *"topic-specific multiple wikis"*를 언급하지만 본 튜토리얼은 단일 wiki 가정. cross-wiki linking·shared entity 해소·중복 정리 등은 다루지 않음.
- **사용자 수동 복사 작업** — Option A(Claude.ai)는 생성 결과를 사용자가 직접 `wiki/` 폴더에 복사해야 함. Option B(Claude Code)에 비해 휴먼 에러·일관성 부족 가능.
- **언어 정책 부재** — 영어 전용 가정. 본 ai-wiki repo가 다루는 *"한국어 본문 + 영어 식별자"* 분리·다국어 검색 한계·교착어 형태소 분석 이슈는 범위 밖.
- **fine-tuning 시나리오 미상세** — Next Steps에서 *"100+ pages → custom private intelligence"*만 언급, 모델 선정·데이터 포맷·평가 등 디테일 없음.
- **권한·다중 사용자·감사·롤백·동시성·컴플라이언스** — 개인 사용자 가정. 엔터프라이즈 시나리오 ([[applications/dnotitia-akb]]가 PG-native vault isolation으로 답한 영역)는 범위 밖.

## 6. 관련 연구 (Related Work)

- **trunk: Karpathy LLM Wiki Gist (2026-04-04)** — 본 article의 직접 출처. GitHub Gist URL은 본 ai-wiki [`CLAUDE.md`](../CLAUDE.md) 상단 *"Karpathy의 LLM Wiki 패턴"* 링크에 인용됨.
- **[[applications/kmyu-2026-llm-wiki-pattern-synthesis]]** — 본 ai-wiki repo 소유자의 한국어 종합 정리. 같은 Karpathy Gist를 trunk로 박재홍 위키독스 + GeekNews + unclejobs-ai 번역 + nashsu/llm_wiki를 합성한 11-섹션 article. 본 datasciencedojo article과 **상호 보완**: datasciencedojo는 영어권 일반 독자용 진입(코딩 0줄, 25–35분, 컴파일 프롬프트 verbatim), kmyu99 Notion은 비판·한국어 실전 팁·구현 디테일·메타 분석 측에 집중.
- **Karpathy software 3.0 thesis** — 본 ai-wiki에는 [[applications/karpathy-2024-software-3-llms]] 형태로 별도 페이지가 있을 수 있음 (확인 필요). LLM이 *"북키핑 비용 ~0"*으로 만드는 영역 확장 = software 3.0의 한 사례.
- **Vannevar Bush Memex (1945)** — *"누가 위키를 유지하느냐"* 라는 미해결 문제. [[applications/kmyu-2026-llm-wiki-pattern-synthesis]]에서 강조된 경제학적 통찰이며 본 article은 *"코딩 불필요 + 25–35분"* 진입 장벽 측면에서 같은 결론에 도달.
- **[[applications/garrytan-gbrain]] + [[applications/dnotitia-akb]] + [[applications/safishamsi-graphify]]** — markdown-first AI 에이전트 메모리/지식 베이스 동시대 사례. LLM Wiki는 **개인 학습자용 단순화 패턴**, GBrain/AKB/graphify는 **에이전트 활용/엔터프라이즈 시나리오** — 같은 *"plain markdown + AI agent maintenance"* 철학의 다른 추상화 레벨.
- **[[applications/lum1104-understand-anything]]** — Karpathy LLM Wiki(이 ai-wiki 포함) 패턴을 first-class 지원하는 OSS 플러그인. wikilink/`index.md` 카테고리 정규식 추출 + LLM 5종 implicit edge 보완.
- **[[applications/pandey-2026-rag-is-no-longer-just]]** — *"RAG는 single pattern이 아니라 design space"* 슬로건. 본 article의 RAG vs LLM Wiki 6-축 비교를 *"design space의 한 선택지"*로 재해석 가능.
- **Obsidian Web Clipper** — 본 article Next Steps에서 추천. 본 ai-wiki repo의 *"Articles → Step 1: 사용자가 본문을 직접 `raw/articles/{stem}.md`로 저장"* 정책과 호환.

## 7. 용어집 (Glossary)

- **LLM Wiki**: AI agent가 능동적으로 작성·유지하는 plain markdown 파일들로 구성된 영속·복리 누적되는 개인 지식 베이스. 각 파일이 1 concept = 1 entity page를 표현하고 `[[wiki-links]]`로 상호 연결.
- **Entity page**: Wikipedia 스타일의 1개념 1파일 markdown. 5-항목 규격 = title + 2-3 sentence summary + detailed explanation + `[[wiki-links]]` + source paper + contradictions.
- **`[[wiki-links]]`**: concept 간 내부 연결을 표시하는 markdown 문법. Obsidian이 이 문법을 그래프 엣지로 렌더링.
- **Compilation step**: 새 source가 추가될 때 LLM이 수행하는 4-action 단계 = update existing pages + create new pages + establish wiki-links + flag contradictions.
- **Knowledge graph**: entity page를 노드로, `[[wiki-links]]`를 엣지로 시각화한 wiki 내부 연결 네트워크. Obsidian Graph View(Ctrl+G/Cmd+G)로 즉시 확인.
- **Linting**: orphan pages · duplicates · contradictions · broken links · oversized pages 5-항목을 점검하는 정기 maintenance 패스. ~20 new pages 임계 트리거.
- **Stateless vs Stateful**: RAG = stateless (매 질의마다 처음부터 재발견) ↔ LLM Wiki = stateful (지식이 영속 유지·복리 누적).
- **Orphan page**: incoming link도 outgoing link도 없는 entity page. linting의 첫 항목.
- **Obsidian Web Clipper**: 브라우저 확장. 웹페이지를 markdown으로 자동 변환해 `raw/`에 저장 가능하게 함.
- **Graph View**: Obsidian의 시각화 모드. entity page = 노드, `[[wiki-links]]` = 엣지로 wiki 구조를 한눈에 확인.
- **Foundation Models**: Bommasani et al. 2021 survey (arXiv:2108.07258). transformer + scaling + 범용 활용의 횡단 정리. 5 starter paper의 4번째.
- **RLHF (Reinforcement Learning from Human Feedback)**: Ouyang et al. 2022 (arXiv:2203.02155). GPT 모델 alignment 방법. 5 starter paper의 5번째이자 graph에서 alignment·GPT 허브를 만드는 노드.
- **Topic-specific multiple wikis**: 단일 거대 wiki 대신 주제별 여러 wiki를 두는 패턴. graph 가독성·복리 누적 효율 측면에서 권장 (Next Steps).
- **BYOAI (Bring Your Own AI)**: 본 article에는 직접 등장하지 않지만 *"100+ pages → fine-tune smaller model → custom private intelligence"* Next Step이 BYOAI 시나리오의 한 실현. [[applications/kmyu-2026-llm-wiki-pattern-synthesis]]에 정리된 4 장점과 연결.
