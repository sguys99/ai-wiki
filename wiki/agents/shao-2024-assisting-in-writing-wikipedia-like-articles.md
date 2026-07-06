---
title: "Assisting in Writing Wikipedia-like Articles From Scratch with Large Language Models"
type: paper
year: 2024
category: agents
source: shao-2024-assisting-in-writing-wikipedia-like-articles.md
raw_path: /Users/sguys99/Desktop/project/ai-wiki/raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles.pdf
raw_filename: "shao-2024-assisting-in-writing-wikipedia-like-articles.pdf"
source_collection: external
authors: "Yijia Shao, Yucheng Jiang, Theodore A. Kanell, Peter Xu, Omar Khattab, Monica S. Lam"
arxiv_id: "2402.14207"
tags: [storm, long-form-generation, pre-writing, multi-perspective, question-asking, rag, grounded-writing, dspy, wikipedia, outline]
figures:
  - id: fig01
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/fig01.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/fig01.png
    caption: "Wikipedia-like 글쓰기 개요 — pre-writing 단계와 Direct Prompting(A)/Perspective-Guided(B)/Conversational(C) 질문 비교 (paper Figure 1)"
    page: 1
    strategy: page-region
    curated: true
  - id: fig03
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/fig03.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/fig03.png
    caption: "STORM 전체 파이프라인 — 관점 발견(①②) → 시뮬레이션 대화(③-⑥) → outline 생성(⑦⑧) (paper Figure 2)"
    page: 4
    strategy: page-region
    curated: true
  - id: fig07
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/fig07.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/fig07.png
    caption: "Wikipedia 편집자 10명의 STORM 유용성 설문 결과 (paper Figure 3)"
    page: 8
    strategy: page-region
    curated: false
  - id: fig10
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/fig10.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/fig10.png
    caption: "인용 미지원 문장의 오류 유형 분포 파이차트 (paper Figure 6)"
    page: 17
    strategy: page-region
    curated: false
---

## 요약 (Summary)

STORM은 주제(topic) 하나만 주어졌을 때 참고문헌도 outline도 없이 Wikipedia 수준의 긴 grounded 글을 처음부터 써내는 시스템이다. 핵심은 그동안 자동화 연구가 건너뛰어 온 **pre-writing(쓰기 전 리서치·개요 수립) 단계**를 정면으로 다룬다는 데 있다. STORM은 이 단계를 **다양한 관점(perspective) 발견 → 각 관점을 가진 가상 writer가 전문가에게 인터넷 근거 기반 질문을 던지는 시뮬레이션 대화 → 수집한 정보로 outline 큐레이션**의 흐름으로 자동화한다. STORM = **S**ynthesis of **T**opic **O**utlines through **R**etrieval and **M**ulti-perspective question asking.

![[assets/shao-2024-assisting-in-writing-wikipedia-like-articles/fig01.png]]
*Figure 1: 주제만으로 시작하는 pre-writing 단계 문제. Direct Prompting(A)은 "언제·어디서" 같은 표면적 질문에 그치지만, STORM은 관점 유도(B)·대화형(C) 질문으로 심층 리서치를 수행한다 (Shao 2024, p.1)*

## 주요 기여 (Key Contributions)

1. **문제 정의**: outline·참고문헌이 전혀 없는 상태에서 긴 grounded 글을 쓰는 과제를 정식화하고, (1) 리서치→outline 생성, (2) outline+refs→본문 작성 두 단계로 나눴다 (인간의 pre-writing / drafting / revising 과정을 반영한다).
2. **STORM 시스템**: LLM이 날카로운 질문을 던지고 신뢰할 만한 인터넷 소스를 검색해 outline을 만드는 방식으로 pre-writing을 자동화한다.
3. **FreshWiki 데이터셋**: data leakage를 피하려고 LLM 학습 컷오프 이후 생성·대량 편집된 최신 고품질 위키 문서를 큐레이션했고, outline 평가 지표(heading soft recall, heading entity recall)까지 확립했다.
4. **자동+인간 평가**: 자동 지표와 숙련 Wikipedia 편집자 10명 평가 모두에서 baseline을 앞섰다. 동시에 grounded 글쓰기의 새 난제인 소스 편향 전이(source bias transfer)와 무관 사실 과잉연결도 드러냈다.

## 방법론 및 아키텍처 (Methodology and Architecture)

STORM은 두 가설 위에 서 있다: **(1) 다양한 관점은 다양한 질문을 낳는다**, **(2) 심층 질문은 반복적 리서치를 요구한다**.

![[assets/shao-2024-assisting-in-writing-wikipedia-like-articles/fig03.png]]
*Figure 2: STORM 전체 파이프라인. 관련 문서를 survey해 관점을 도출하고(①②), 각 관점의 writer가 expert에게 질문하는 대화를 시뮬레이션하며(③-⑥), 내부 지식과 대화를 종합해 outline을 만든다(⑦⑧) (Shao 2024, p.4)*

**① 관점 유도 질문 (Perspective-Guided Question Asking)** — 입력 토픽 $t$로 관련 토픽 목록을 만들고, Wikipedia API로 그 문서들의 목차(ToC)를 모아 컨텍스트로 삼아 $N$개 관점 $P = \{p_1, ..., p_N\}$을 도출한다. 기본 사실이 빠지지 않도록 $p_0$("basic fact writer")를 항상 넣는다. 각 관점은 병렬로 질문 생성을 이끈다. 예컨대 "이벤트 기획자" 관점은 개회식의 "교통 준비"나 "예산"을 묻고, 일반인은 기본 정보만 묻는다.

**② 시뮬레이션 대화 (Simulating Conversations)** — 관점마다 "Wikipedia writer ↔ topic expert" 다중 턴 대화(최대 $M$라운드)를 돌린다. 라운드 $i$에서 writer는 토픽·관점·대화 이력을 근거로 질문 $q_i$ 하나를 던진다. expert는 이 질문을 검색 쿼리로 분해(split queries)하고, Wikipedia 신뢰 소스 룰 필터로 걸러(search & sift) 종합해(synthesize) 근거 있는 답 $a_i$를 만든다. 사용한 소스는 참고문헌 집합 $R$에 쌓인다.

**③ Outline 생성** — 먼저 토픽만으로 draft outline $O_D$를 뽑아 LLM 내부 지식으로 뼈대를 잡는다. 그다음 토픽·draft·수집 대화 $\{C_0, ..., C_N\}$을 함께 넣어 refine해 최종 outline $O$를 완성한다.

**④ 본문 작성** — $R$ 전체는 컨텍스트에 안 들어가므로, 섹션 제목과 하위 헤딩으로 Sentence-BERT 의미 유사도 검색을 걸어 관련 문서를 회수한다. 그다음 섹션마다 인용을 붙여 병렬 생성하고, 이어붙인 뒤 중복을 제거해 일관성을 높인다. 끝으로 Wikipedia 스타일의 lead section(전체 요약)을 합성한다.

**구현**: DSPy zero-shot 프롬프팅. $N=M=5$. 질문에는 `gpt-3.5-turbo`, 나머지에는 `gpt-3.5-turbo-instruct`를 쓰고, outline 초안·정제에는 `gpt-4`도 실험했다. 검색은 You.com API를 쓰되 정답 위키 문서는 검색에서 제외했다. 본문 생성은 인용 충실도 문제로 `gpt-4`만 사용한다.

## 결과 (Results)

**Outline 품질 (Table 3, %)** — GPT-4 기준 STORM은 heading soft recall 92.73 / entity recall 45.91로 Direct Gen·RAG·oRAG·RAG-expand를 모두 앞섰다. Direct Gen도 soft recall은 높은데(LLM이 고수준 구조는 잘 잡는다), STORM의 이득은 주로 토픽 특화 세부 커버리지에서 나온다.

**본문 품질 (Table 2)** — STORM은 ROUGE-1 45.82, entity recall 14.10, 루브릭(1-5) Interest 3.99·Organization 4.82·Relevance 4.45·Coverage 4.88로 최고 baseline oRAG를 유의하게(p<0.05) 상회했다. Outline 단계를 제거하면("w/o Outline Stage") 전 지표가 급락해, outline이 필수임을 보여준다.

**Ablation** — "w/o Conversation"이 가장 크게 나빠졌다. 관련 정보를 읽는 것이 효과적 질문의 핵심이라는 뜻이다. 수집한 참고문헌 수도 full STORM 99.83 vs w/o Conversation 39.56으로 크게 벌어졌다(Table 5).

**인용 품질 (Table 4)** — Mistral 7B-Instruct 판정으로 citation recall 84.83 / precision 85.18. 미지원 문장의 주범은 존재하지 않는 내용의 hallucination이 아니라 **부적절한 추론적 연결(improper inferential linking)**과 부정확한 패러프레이즈였다.

**인간 평가 (Table 6, 편집자 10명·20쌍)** — STORM은 oRAG 대비 Organization +25%p, Coverage +10%p(≥4 비율)를 기록했다. 편집자 전원이 pre-writing 단계에 유용하다고 봤고(Fig 3), 80%는 새 토픽 편집에 도움이 된다고 답했다.

## 한계 (Limitations)

- **중립성·검증 가능성**: 편집자 10명 중 7명이 STORM 글을 "감정적/비중립적"이라 지적했다. 인터넷 소스의 편향·홍보성 내용이 그대로 옮겨 온 결과(source bias transfer)로, pre-writing 단계에서 검색 편향을 어떻게 줄일지가 과제로 남는다.
- **과잉추론(red herring)**: $R$ 안에서 서로 무관한 정보나 토픽과 무관한 정보 사이에 검증 불가능한 연결을 짓는다. 단순 fact-checking을 넘어 고차원 sensemaking이 필요하다.
- 잘 다듬어진 인간 글에는 아직 정보량도 중립성도 못 미친다.
- 자유 텍스트만 생성하며 표·멀티모달은 지원하지 않는다. 영어 Wikipedia만 대상이라 다국어 확장이 숙제로 남는다.

## 관련 페이지 (Related Pages)

- [[database/edge-2024-from-local-to-global]] — GraphRAG. STORM이 검색 결과를 대화로 조사하는 것과 달리, GraphRAG는 KG 커뮤니티 요약으로 global 질의를 다룬다. 둘 다 단순 topic 검색의 한계를 넘으려는 시도다.
- [[database/gutierrez-2025-from-rag-to-memory-non]] — HippoRAG 2. 검색·조사 방식의 또 다른 계보(KG + PageRank).
- [[agents/stanford-oval-storm]] — 이 논문의 공식 구현체 `stanford-oval/storm`. Co-STORM까지 포함한 실행 코드.

---

*원본 프로젝트 페이지: https://storm-project.stanford.edu/research/storm/ · 코드: https://github.com/stanford-oval/storm*

<!-- HUMANIZE-SUMMARY v1.6.1
run_id: 2026-07-06-003
metrics:
  char_in: 2604
  char_out: 2620
  change_rate: 8.4%
  self_check: 6/6
  grade: A
categories:  # before → after
  A-15 인지동사 '반영'/명사화: 2 → 0
  A-10 '~할 수 있다'류 잔재: 0 → 0
  A-18 좌향 수식 완화: 3 → 1
  E-2 문장 길이 리듬(장문 분할): 2 → 0
  G-1 '~로 남는다'/명사 나열 정리: 3 → 3
self_check:
  - 고유명사·수치·인용·수식($)·figure 임베드·wikilink 100% 보존: OK
  - 변경률 30% 이하: OK (8.4%)
  - 장르 이탈 없음(paper 리포트 문어체 유지): OK
  - register 보존(격식체 '~다' 유지): OK
  - S1 잔존 0건: OK
  - 인공 표현(비유·수사) 미추가: OK
highlights:
  - id: A-18
    before: "새 난제 — 소스 편향 전이(source bias transfer), 무관 사실 과잉연결 — 를 드러냈다."
    after: "새 난제인 소스 편향 전이(source bias transfer)와 무관 사실 과잉연결도 드러냈다."
  - id: E-2
    before: "먼저 토픽만으로 draft outline O_D를 뽑아 ... 뼈대를 잡은 뒤, 토픽·draft·수집 대화 ...을 함께 넣어 refine해 최종 outline O를 완성한다."
    after: "먼저 토픽만으로 draft outline O_D를 뽑아 ... 뼈대를 잡는다. 그다음 토픽·draft·수집 대화 ...을 함께 넣어 refine해 최종 outline O를 완성한다."
  - id: A-15
    before: "두 단계로 분해했다 (인간의 pre-writing / drafting / revising 과정 반영)."
    after: "두 단계로 나눴다 (인간의 pre-writing / drafting / revising 과정을 반영한다)."
  - id: G-1
    before: "잘 다듬어진 인간 글에는 아직 정보량·중립성 모두 못 미친다."
    after: "잘 다듬어진 인간 글에는 아직 정보량도 중립성도 못 미친다."
residual_findings: (없음 — 원문이 이미 정제된 기술 산문. Do-NOT 대상(수식·모델명·지표) 다수라 윤문 여지 자체가 제한적)
grade_reason: "A — S1 잔존 0건, 변경률 8.4%, 자체검증 6항 통과. paper 리포트 격식 문어체 그대로 유지."
-->
