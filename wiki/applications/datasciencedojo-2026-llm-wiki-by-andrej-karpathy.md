---
title: "LLM Wiki 입문 튜토리얼 (Data Science Dojo)"
type: article
year: 2026
category: applications
raw_path: raw/articles/datasciencedojo-2026-llm-wiki-by-andrej-karpathy.md
raw_filename: "datasciencedojo-2026-llm-wiki-by-andrej-karpathy.md"
source: datasciencedojo-2026-llm-wiki-by-andrej-karpathy.md
source_collection: external
author: "Data Science Dojo Staff"
url: "https://datasciencedojo.com/blog/llm-wiki-tutorial/"
publisher: "Data Science Dojo Blog"
publication_date: "2026-04-16"
tags: [llm-wiki, karpathy, knowledge-management, obsidian, claude-code, claude-ai, tutorial, rag-vs-wiki, compounding-knowledge, entity-pages, wiki-links, linting, datasciencedojo]
---

## 요약

Data Science Dojo 블로그가 2026-04-16에 발행한 LLM Wiki 입문 튜토리얼이다. Andrej Karpathy가 2026년 4월 GitHub Gist로 공개한 LLM Wiki 패턴을 코딩 없이 25~35분 안에 따라 할 수 있는 6단계 절차로 풀어썼다.

이 자료의 값어치는 개념 설명이 아니라 실행 가능성에 있다. 시작용 논문 5편을 지정하고, 폴더 두 개짜리 최소 구조를 제시하고, 컴파일과 증분 갱신과 유지보수에 쓰는 프롬프트 3개를 원문 그대로 실어 준다. 독자는 읽고 이해하는 데서 그치지 않고 그날 안에 자기 wiki를 하나 만들 수 있다.

핵심 주장은 RAG와 LLM Wiki의 대비다. RAG는 질의가 들어올 때마다 지식을 처음부터 다시 찾는 stateless 구조인 반면, LLM Wiki는 자료를 받는 시점에 개념 페이지로 미리 컴파일해 두어 자료를 넣을수록 이해가 쌓인다. 원문은 이 대비를 6개 항목 비교표로 제시하면서 출처 추적성만큼은 RAG가 낫다고 함께 인정한다.

본 ai-wiki 저장소가 같은 패턴을 한국어와 3-tier 구조로 확장한 구현체다. 이 페이지는 [[applications/kmyu-2026-llm-wiki-pattern-synthesis]]와 짝을 이룬다. 한국어 종합 정리가 비판과 구현 세부를 맡고, 이 article이 영어권 일반 독자를 위한 진입 경로를 맡는다.

## 배경

원문은 독자가 이미 겪었을 상황 하나로 문제를 정의한다. PDF를 ChatGPT에 올려 질문하고, 다음 날 같은 PDF를 다시 올려 후속 질문을 해 본 적이 있다면 LLM Wiki가 푸는 문제를 이미 이해한 것이라는 도입이다.

문제의 뿌리는 메모리 부재다. 대부분의 AI 지식 시스템은 세션 사이에 아무것도 남기지 않는다. 검색하고, 답하고, 잊는다. 그래서 다음 질의에서 같은 자료를 다시 읽고 같은 이해를 처음부터 다시 만든다. 자료를 열 번 물어보면 열 번의 재구축 비용이 든다.

LLM Wiki는 이 비용을 앞으로 당긴다. 자료를 받는 시점에 한 번 컴파일해 개념 페이지로 만들어 두면, 이후의 질문은 이미 정리된 페이지 위에서 답이 나온다. 자료를 더 넣을수록 기존 페이지가 풍부해지므로 이해가 시간이 지날수록 쌓인다. 원문 제목이 말하는 compounding knowledge base가 이 성질을 가리킨다.

패턴을 처음 제시한 사람은 Andrej Karpathy다. 원문은 그를 OpenAI 공동 창업자이자 전 Tesla AI 디렉터로 소개하고, 2026년 4월 GitHub Gist로 개념을 공개한 뒤 개발자들 사이에서 빠르게 퍼졌다고 적는다. 다만 Gist의 URL이나 ID, 정확한 공개일은 이 article에 나오지 않는다.

## 핵심 개념

### entity page

entity page는 개념 하나만 다루는 markdown 파일이다. Wikipedia의 표제어 항목과 같은 단위라고 보면 된다. 컴파일 프롬프트는 각 페이지에 다섯 가지를 요구한다.

| 항목 | 내용 |
|---|---|
| 제목과 요약 | 명확한 제목과 2~3문장 요약 |
| 상세 설명 | 개념 자체의 자세한 설명 |
| 링크 | 관련 개념으로 향하는 `[[wiki-links]]` |
| 출처 | 그 개념이 등장하는 논문 |
| 모순 | 논문들이 그 개념을 다루는 방식에서 관찰되는 모순이나 긴장 |

파일은 개념 하나당 하나로 `[concept-name].md` 형식으로 저장한다. 다섯 번째 항목인 모순 표기가 이 규격의 특징이다. 개별 문서 요약을 모아 두는 것이 아니라 여러 문서를 하나의 개념 위에서 대조하게 만든다.

### wiki-links

`[[wiki-links]]`는 페이지 사이의 연결을 나타내는 markdown 문법이다. 이 링크가 wiki를 목록이 아니라 그래프로 만든다. Obsidian이 같은 문법을 읽어 노드와 엣지로 렌더링하므로, 링크를 잘 달아 두면 별도의 시각화 작업 없이 지식 구조가 그림으로 나온다.

### compilation step

compilation step은 새 자료가 들어올 때 LLM이 수행하는 처리 단계다. 원문은 이 단계가 하는 일을 네 가지로 못박는다.

| 작업 | 설명 |
|---|---|
| 갱신 | 기존 페이지를 새로 들어온 정보로 고친다 |
| 생성 | 처음 등장한 개념에 새 entity page를 만든다 |
| 연결 | 새 개념과 기존 개념을 잇는 `[[wiki-links]]`를 만든다 |
| 모순 표시 | 새 자료와 기존 내용이 어긋나는 지점을 표시한다 |

이 네 가지가 stateless RAG와 LLM Wiki를 가르는 지점이다. RAG는 자료를 넣을 때 chunk를 만들고 벡터를 계산할 뿐 기존 지식과의 관계를 따로 계산하지 않는다. 반면 LLM Wiki는 넣는 시점에 기존 페이지를 읽고 고친다.

### knowledge graph

knowledge graph는 entity page를 노드로, `[[wiki-links]]`를 엣지로 본 wiki 내부의 연결망이다. 별도의 데이터베이스가 아니라 markdown 파일에 적힌 링크가 그대로 그래프의 정의가 된다.

이 구조가 주는 이점은 두 가지다. 하나는 사람이 훑을 때 개념 사이의 거리를 눈으로 확인할 수 있다는 것이고, 다른 하나는 링크가 없는 페이지를 기계적으로 찾아낼 수 있다는 것이다. 뒤에 나오는 유지보수 패스의 첫 검사 항목인 orphan 페이지가 후자를 이용한다.

### linting

linting은 wiki가 커진 뒤 정확성과 내적 일관성을 유지하려고 주기적으로 실행하는 감사 패스다. 컴파일이 지식을 넣는 작업이라면 linting은 넣은 결과를 검사하는 작업이다.

원문은 이 패스를 선택 사항이 아니라 필수로 다룬다. 컴파일이 기존 페이지를 읽고 고치는 구조이므로, 한 페이지에 생긴 오류가 다음 컴파일의 입력이 되어 다른 페이지로 옮겨 간다. 유지보수를 미루면 오류가 한 자리에 머물지 않는다는 것이 원문이 제시하는 근거다.

### stateless와 stateful

두 방식의 차이를 원문은 stateless와 stateful로 부른다. RAG는 질의마다 답을 처음부터 다시 만드는 stateless 구조이고, LLM Wiki는 컴파일 결과를 유지하며 축적하는 stateful 구조다. 원문의 6개 항목 비교표가 이 차이를 항목별로 벌려 놓은 것이다.

| 비교 항목 | RAG | LLM Wiki |
|---|---|---|
| 지식 영속성 | 없음, stateless | 완전, 시간이 지나며 축적 |
| 다중 문서 합성 | 질의마다 처음부터 | 페이지에 사전 컴파일 |
| 모순 탐지 | 없음 | 있음, 컴파일 중 표시 |
| 출처 추적성 | 높음 | 보통, 페이지 단위 |
| 구축 난이도 | 낮음 | 낮음에서 중간 |
| 적합한 용도 | 문서 대상 빠른 질의응답 | 깊고 계속 자라는 연구 주제 |

여섯 항목 중 다섯은 LLM Wiki 쪽이 유리하지만 출처 추적성은 RAG가 앞선다. RAG는 답에 쓰인 chunk를 그대로 되짚을 수 있는 반면 LLM Wiki는 어느 페이지에서 왔는지까지만 남고 어느 문장에서 왔는지는 잃는다. 튜토리얼 성격의 글이 자기 쪽 약점을 표에 함께 적었다는 점에서 이 비교표는 균형이 잡혀 있다.

## 방법

### 준비물

시작 전에 필요한 것은 세 종류로 나뉜다.

| 구분 | 내용 |
|---|---|
| 도구 | 폴더에 접근할 수 있는 컴퓨터(Mac, Windows, Linux), Claude.ai 계정(무료 티어로 충분), Obsidian(무료 markdown 편집기, 선택이지만 권장) |
| 파일 | PDF로 내려받은 연구 논문 5편 |
| 사전 지식 | 폴더 만들기와 파일 내려받기. Claude.ai 방식에는 코딩이 필요 없다 |

예상 소요 시간은 25~35분이다. 논문 내려받기, 폴더 만들기, 프롬프트 한 번 실행, Obsidian 설치까지 포함한 값이다.

### 전체 절차

여섯 단계로 진행하며 각 단계가 다음 단계의 입력을 만든다.

| 단계 | 하는 일 | 산출물 |
|---|---|---|
| Step 1 | 시작용 논문 5편을 PDF로 내려받는다 | 원본 5개 |
| Step 2 | `my-wiki/` 아래 `raw/`와 `wiki/`를 만들고 PDF를 `raw/`로 옮긴다 | 2-tier 폴더 |
| Step 3 | 컴파일 프롬프트를 실행한다 | 개념별 `[concept-name].md` |
| Step 4 | Obsidian으로 `wiki/`를 열어 Graph View를 본다 | 지식 그래프 |
| Step 5 | 논문을 더 넣고 증분 컴파일을 실행한다 | 갱신된 페이지와 새 페이지 |
| Step 6 | 새 페이지가 약 20개 쌓이면 유지보수 패스를 실행한다 | `maintenance-report.md` |

### Step 1, 시작용 논문 5편

원문이 지정한 논문 5편은 임의 선택이 아니다. Transformer에서 출발해 양방향 인코더, 규모 확대, 횡단 survey, alignment로 이어져 첫 그래프에서 연결이 자연스럽게 생기도록 고른 조합이다.

| 순서 | 논문 | 연도 | arXiv | 원문 설명 |
|---|---|---|---|---|
| 1 | Attention Is All You Need | 2017 | 1706.03762 | 원조 Transformer 논문 |
| 2 | BERT | 2018 | 1810.04805 | 언어 이해를 위한 양방향 Transformer |
| 3 | GPT-3 | 2020 | 2005.14165 | few-shot learner로서의 대형 언어 모델 |
| 4 | Foundation Models | 2021 | 2108.07258 | Transformer와 규모 확대, 응용을 잇는 survey |
| 5 | RLHF | 2022 | 2203.02155 | GPT 모델의 인간 피드백 alignment |

### Step 2, 폴더 두 개

구조는 폴더 두 개가 전부다.

```
my-wiki/
├── raw/
└── wiki/
```

`raw/`는 원본 파일을 담는다. PDF, 기사, 노트가 여기 들어가고 사람이 직접 편집하지 않는다. `wiki/`는 AI 에이전트가 쓰는 entity page를 담는다. 내려받은 PDF를 `raw/`로 옮기면 준비가 끝난다.

본 ai-wiki 저장소의 3-tier 구조와 비교하면 중간의 `sources/` 단계가 없다. 그래서 wiki 페이지가 원본에서 곧바로 컴파일된다. 단계가 하나 적은 만큼 시작이 쉽고, 대신 뒤에서 다룰 추적성 손실이 따라온다.

### Step 3, 컴파일 프롬프트

원문이 제공하는 첫 프롬프트다. entity page 5항목 규격이 이 프롬프트 안에 그대로 들어 있다.

```
Read all these research papers carefully. Extract the key concepts, entities, and
ideas from them. For each major concept, write one markdown entity page with:
(1) A clear title and summary (2-3 sentences), (2) A detailed explanation of the
concept, (3) [[wiki-links]] to related concepts in markdown format, (4) The source
paper(s) where this concept appears, (5) Any contradictions or tensions you notice
between how different papers treat this concept. Create one file per concept.
Use markdown formatting. Save each as [concept-name].md
```

실행 경로는 두 가지이며 결과물은 같고 손이 가는 정도가 다르다.

| 경로 | 방식 | 코딩 | 파일 저장 |
|---|---|---|---|
| Option A | Claude.ai에 PDF 5개를 한꺼번에 올리고 프롬프트를 보낸다 | 필요 없음 | 생성된 페이지를 사용자가 `wiki/`로 복사 |
| Option B | 터미널에서 wiki 폴더로 이동해 Claude Code를 띄우고 같은 프롬프트를 붙여 넣는다 | 터미널 사용 | 파일을 직접 읽고 `wiki/`에 자동 저장 |

원문의 헤드라인이 코딩 불필요이므로 Option A가 기본 경로다. Option B는 파일 접근이 자동이라 반복 작업에 유리하다.

### Step 4, Obsidian으로 열기

Obsidian을 설치하고 `wiki/` 폴더를 vault로 선택한다. Ctrl+G 또는 Cmd+G로 Graph View를 열면 entity page가 노드로, `[[wiki-links]]`가 엣지로 그려진다.

원문은 논문 5편을 처리한 뒤 어떤 그림이 나올지까지 예고한다. Transformer 아키텍처가 attention 메커니즘과 연결되고, BERT가 fine-tuning과 연결되며, RLHF가 alignment 및 GPT 개념과 연결된 모습이다. Step 1의 논문 선정이 이 연결을 의도했음을 확인하는 단계이기도 하다.

Obsidian의 역할은 열람에 한정된다. wiki를 수정하는 주체는 AI 에이전트이고 Obsidian은 시각화만 담당하므로 둘의 작업이 서로 충돌하지 않는다.

### Step 5, 자료를 더 넣기

논문을 `raw/`에 추가하고 두 번째 프롬프트를 실행한다. 첫 프롬프트와 달리 기존 wiki 페이지를 함께 읽는 것이 차이다.

```
Read these new research papers and the existing wiki pages in the wiki/ folder.
For each new concept from the new papers: (1) Create a new entity page if the
concept doesn't exist, (2) Update existing entity pages if the new papers add
relevant information, (3) Add new [[wiki-links]] between pages, (4) Flag any
contradictions between old and new content.
```

네 가지 분기가 compilation step의 네 작업과 그대로 대응한다. 원문이 강조하는 지점은 결과의 성격이다. 새 논문이 새 페이지만 만드는 것이 아니라 기존 페이지를 풍부하게 만든다. 자료가 늘수록 페이지 수만 늘어나는 것이 아니라 페이지 하나하나의 내용도 두꺼워진다는 뜻이며, 이것이 지식이 축적된다는 말의 실제 내용이다.

### Step 6, 유지보수 패스

새 페이지가 약 20개 쌓이면 세 번째 프롬프트를 실행한다.

```
Read through all the markdown files in the wiki/ folder. Check for: (1) Pages with
no incoming or outgoing links—these are orphans, (2) Duplicate or near-duplicate
pages that should be merged, (3) Contradictions between pages, (4) Broken or
incorrect [[wiki-links]], (5) Pages that are too long and should be split. For each
issue found, suggest a fix. Create a maintenance-report.md listing all issues and
recommendations.
```

검사 항목은 다섯 가지다.

| 항목 | 무엇을 찾는가 | 조치 |
|---|---|---|
| orphan 페이지 | 들어오는 링크도 나가는 링크도 없는 페이지 | 링크를 달거나 병합 |
| 중복 | 중복이거나 거의 같은 페이지 | 하나로 병합 |
| 모순 | 페이지 사이에서 어긋나는 서술 | 근거를 확인해 정정 |
| 깨진 링크 | 대상이 없거나 잘못된 `[[wiki-links]]` | 링크 수정 |
| 과대 페이지 | 너무 길어진 페이지 | 개념 단위로 분할 |

결과는 `maintenance-report.md` 한 파일로 받는다. LLM이 문제를 찾고 수정안을 제안하되 적용 여부는 사용자가 판단하는 구성이다. 이 패스를 두는 이유는 작은 오류가 빠르게 번지기 때문이다. 링크 하나가 잘못되면 이후 컴파일이 그 링크를 근거로 삼아 오류가 다른 페이지로 옮겨 간다.

### 흔한 실수

원문이 짚는 실수는 세 가지다.

| 실수 | 왜 문제인가 | 대응 |
|---|---|---|
| 한 페이지에 너무 많이 담기 | 페이지 하나가 개념 둘을 다루면 링크 구조가 흐려진다 | 개념 하나당 페이지 하나, 둘이 되면 분할 |
| 유지보수를 한 번도 실행하지 않기 | 작은 오류가 빠르게 번진다 | 정기적으로 감사 패스를 실행 |
| 무관한 주제를 한꺼번에 넣기 | 주제가 흩어지면 페이지 사이에 연결이 생기지 않는다 | 주제가 이어지는 자료끼리 묶어 넣는다 |

세 번째는 이 패턴의 전제를 보여 준다. wiki가 축적되는 원리는 새 자료가 기존 페이지와 맞닿는 데 있으므로, 맞닿을 면이 없는 자료를 넣으면 페이지만 늘고 그래프는 조각난다.

### 이 저장소 구조와의 대조

본 ai-wiki 저장소는 같은 Karpathy 패턴을 쓰지만 단계를 하나 더 둔다. 튜토리얼의 최소 구성과 비교하면 차이가 분명하다.

| 항목 | 튜토리얼의 구성 | 본 ai-wiki 저장소 |
|---|---|---|
| 폴더 단계 | `raw/`와 `wiki/`의 2-tier | `raw/`, `sources/`, `wiki/`의 3-tier |
| 중간 요약 | 없음. 원본에서 wiki로 직접 컴파일 | `sources/{stem}.md`가 자료별 요약을 보관 |
| 페이지 구조 | entity page 5항목 | 요약, 배경, 핵심 개념, 방법, 결과, 한계, 핵심 용어, 관련 페이지 |
| 자료 분류 | 개념 단위 파일만 | 카테고리 폴더와 `index.md` 카탈로그 |
| 언어 | 영어 전제 | 한글 본문과 영문 식별자 분리 |
| 유지보수 | 프롬프트 기반 감사 패스 | 프롬프트 기반 점검에 lint 스크립트를 추가 |

단계를 늘린 대가와 이득이 서로 맞물린다. `sources/` 단계를 두면 진입 비용이 올라가지만 wiki 서술을 원본까지 되짚을 경로가 생긴다. 튜토리얼이 25~35분 안에 첫 결과를 보여 주려고 이 단계를 뺀 것은 목적에 맞는 선택이며, 자료가 쌓이고 추적성이 필요해지는 시점에 단계를 더하는 순서가 자연스럽다.

## 결과

이 article은 튜토리얼이라 성능 수치가 아니라 실행 비용과 규모 관련 수치를 제시한다.

| 항목 | 값 |
|---|---|
| 예상 소요 시간 | 25~35분 |
| 필요한 코딩 | 없음(Option A 기준) |
| 시작 자료 | arXiv 논문 5편 |
| 필요한 계정 | Claude.ai 무료 티어 |
| 유지보수 트리거 | 새 페이지 약 20개 |
| Karpathy 본인 wiki 규모 | 약 100편, 40만 단어 |
| RAG 대비 정량 벤치마크 | 없음 |

규모 수치는 FAQ에서 나온다. "LLM Wiki는 얼마나 커질 수 있는가"라는 물음에 원문은 Karpathy 본인의 wiki가 약 100편과 40만 단어에 도달했고 그 시점에도 LLM이 효율적으로 탐색할 수 있다고 그가 언급했다는 문장을 인용한다. 이 값은 측정 결과가 아니라 저자 본인의 관찰 보고이므로 상한선이 아니라 참고 지점으로 읽어야 한다.

RAG와 LLM Wiki의 정확도를 비교한 수치는 없다. 원문이 근거로 드는 것은 6개 항목 비교표의 정성 대조와 "LLM이 여전히 효율적으로 탐색할 수 있었다"는 인용뿐이다.

원문 말미의 FAQ 6문항은 도입 판단에 필요한 물음을 모아 둔 부분이다.

| 물음 | 원문의 답 |
|---|---|
| LLM Wiki란 무엇인가 | AI 에이전트가 능동적으로 만들고 유지하는 plain markdown 지식 베이스. 지식을 구조화된 연결 페이지로 미리 컴파일해 둔다 |
| 누가 만들었는가 | Andrej Karpathy가 2026년 4월 GitHub Gist로 공개했고 개발자들 사이에서 빠르게 퍼졌다 |
| 코딩 지식이 필요한가 | 필요 없다. Claude.ai 방식은 PDF 업로드와 프롬프트 붙여 넣기만 하면 된다 |
| Notion이나 Obsidian과 무엇이 다른가 | 그 도구들은 사람이 직접 구조를 만들어야 한다. LLM Wiki는 그 도구들을 열람 인터페이스로만 쓰고 컴파일과 연결과 유지보수는 AI 에이전트가 맡는다 |
| 얼마나 커질 수 있는가 | Karpathy 본인 wiki가 약 100편, 40만 단어에 도달한 시점에도 LLM이 효율적으로 탐색할 수 있었다 |
| 어떤 파일 형식이 되는가 | 연구 논문은 PDF, 웹 기사는 markdown이 가장 잘 맞고 일반 텍스트와 내보낸 대화 기록도 쓸 수 있다 |

네 번째 답이 이 패턴의 위치를 규정한다. LLM Wiki는 Obsidian이나 Notion을 대체하는 도구가 아니라 그 위에서 유지보수 주체를 사람에서 에이전트로 옮기는 운영 방식이다. 그래서 도구를 새로 배울 필요 없이 폴더 구조와 프롬프트만으로 시작할 수 있다.

마지막 답의 세부는 다음과 같다.

| 형식 | 적합도 |
|---|---|
| PDF | 연구 논문에 가장 잘 맞는다 |
| markdown | 웹 기사에 잘 맞는다. Obsidian Web Clipper가 웹페이지를 자동 변환한다 |
| 일반 텍스트 | 쓸 수 있다 |
| 내보낸 대화 기록 | 쓸 수 있다 |

원문이 제안하는 다음 단계는 셋이다. Obsidian Web Clipper 확장으로 웹페이지 수집을 자동화하는 것, 하나의 거대한 wiki 대신 주제별 wiki를 여러 개 두어 그래프를 깔끔하게 유지하는 것, 잘 관리된 100페이지 이상을 확보한 뒤 작은 모델을 fine-tuning해 개인 전용 모델을 만드는 것이다.

## 한계

**2차 자료라 반론이 실려 있지 않다.** Karpathy Gist를 일반 독자용으로 푼 글이므로 원 패턴을 향한 비판을 다루지 않는다. [[applications/kmyu-2026-llm-wiki-pattern-synthesis]]가 정리한 여섯 가지 비판, 즉 RAG 본질 논쟁과 모델 붕괴, 손실 압축, 차세대 모델이 이 패턴을 무의미하게 만들 가능성, 벤치마크와 프로덕션 이슈 부재, 사고 위임에 따른 인지적 부작용은 이 article의 범위 밖이다. LLM Wiki가 RAG보다 낫다는 논조가 강하지만 벤치마크가 없는 입문 가이드라는 점을 함께 읽어야 한다.

**원본에서 wiki로 곧바로 컴파일하는 구조는 추적성이 약하다.** 중간 요약 단계가 없어 entity page의 서술이 어느 원본 문장에서 나왔는지 페이지 단위까지만 남는다. 원문 비교표도 이 점을 LLM Wiki의 약점으로 인정한다. 본 ai-wiki 저장소가 `sources/` 단계를 넣어 3-tier로 확장한 이유가 이 추적성과 재요약, 언어 정책이다.

**단일 wiki를 전제한다.** Next Steps에서 주제별 wiki를 여러 개 두라고 권하지만 본문은 wiki 하나를 가정하고 쓰였다. wiki 사이의 링크, 여러 wiki에 걸친 동일 개념의 처리, 중복 정리는 다루지 않는다.

**Option A에는 수동 복사가 남는다.** Claude.ai 경로는 생성된 페이지를 사용자가 직접 `wiki/` 폴더에 복사해야 한다. Option B와 비교하면 사람의 실수와 형식 불일치가 생길 여지가 크다.

**언어 정책이 없다.** 영어 자료와 영어 페이지를 전제한다. 본 ai-wiki 저장소가 다루는 한국어 본문과 영어 식별자 분리, 교착어 형태소 때문에 생기는 검색 한계는 범위 밖이다.

**fine-tuning 제안이 한 줄에 그친다.** 100페이지 이상을 잘 관리한 뒤 작은 모델을 fine-tuning하라는 제안만 있고 모델 선정, 데이터 형식, 평가 방법은 없다.

**개인 사용자를 가정한다.** 권한 관리, 다중 사용자, 감사 기록, 롤백, 동시 편집, 컴플라이언스는 다루지 않는다. 조직 단위 시나리오는 [[applications/dnotitia-akb]]가 다루는 영역이다.

**Gist의 식별 정보가 없다.** 원문은 "2026년 4월 GitHub Gist"라고만 적고 URL이나 ID, 정확한 공개일을 제시하지 않는다. 그래서 이 자료만으로는 Karpathy 원문과의 대조가 불가능하다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| LLM Wiki | AI 에이전트가 작성하고 유지하는 plain markdown 지식 베이스. 파일 하나가 개념 하나를 담고 `[[wiki-links]]`로 서로 연결된다 |
| entity page | Wikipedia 형식의 개념 페이지. 제목과 요약, 상세 설명, 링크, 출처, 모순 표기의 5항목으로 구성한다 |
| compilation step | 새 자료가 들어올 때 LLM이 수행하는 단계. 기존 페이지 갱신, 새 페이지 생성, 링크 생성, 모순 표시의 네 작업으로 이루어진다 |
| linting | orphan 페이지, 중복, 모순, 깨진 링크, 과대 페이지의 다섯 항목을 점검하는 유지보수 패스. 새 페이지 약 20개마다 실행한다 |
| orphan page | 들어오는 링크도 나가는 링크도 없는 entity page. 유지보수 프롬프트의 첫 검사 항목이다 |
| stateless와 stateful | RAG는 질의마다 답을 처음부터 다시 만드는 stateless 구조, LLM Wiki는 컴파일 결과를 유지하며 축적하는 stateful 구조다 |

## 관련 페이지

- [[applications/kmyu-2026-llm-wiki-pattern-synthesis]]: 같은 Karpathy Gist를 출발점으로 한국어 커뮤니티 자료를 합성한 종합 정리. 이 article이 영어권 일반 독자용 진입 경로를 맡고, 한국어 종합 정리가 비판과 한국어 실전 팁, 구현 세부를 맡는다
- [[applications/liu-2026-rag-llm-wiki-or-gbrain]]: RAG와 LLM Wiki, fat skills 중 무엇을 고를지의 판단 기준을 제시한 결정 프레임워크. 이 article이 진입 가이드라면 Liu의 글은 의사결정 가이드다
- [[applications/garrytan-gbrain]]: markdown 저장소를 지식의 원본으로 두고 Postgres 인덱스를 파생시키는 에이전트 메모리 시스템. 같은 markdown 우선 철학이지만 목적이 개인 학습이 아니라 에이전트 운영이다
- [[applications/dnotitia-akb]]: Git과 PostgreSQL 위에 올린 조직용 에이전트 지식베이스. 이 article이 범위 밖으로 둔 권한과 감사, 다중 사용자 시나리오를 다룬다
- [[applications/safishamsi-graphify]]: 임의의 폴더를 지식 그래프로 컴파일하는 도구. markdown 파일을 사람이 읽는 wiki로 두는 대신 그래프 산출물 자체를 결과로 삼는 접근이다
- [[applications/lum1104-understand-anything]]: Karpathy 패턴으로 만들어진 wiki를 입력으로 받아 지식 그래프를 만드는 OSS 도구
- [[applications/pandey-2026-rag-is-no-longer-just]]: RAG를 단일 패턴이 아니라 설계 공간으로 보자는 관점. 이 페이지의 RAG 대 LLM Wiki 비교를 그 설계 공간 안의 한 선택지로 다시 읽을 수 있다
