---
title: "LLM Wiki by Andrej Karpathy: Build a Compounding Knowledge Base (Data Science Dojo 튜토리얼)"
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

Data Science Dojo 블로그가 2026-04-16에 발행한 영어권 일반 독자용 입문 튜토리얼로, Andrej Karpathy가 2026년 4월 GitHub Gist로 공개한 LLM Wiki 패턴을 25~35분 안에 코딩 없이 따라 할 수 있는 6단계 절차로 풀어썼다. 핵심 주장은 RAG가 질의마다 지식을 처음부터 다시 찾는 stateless 구조인 반면 LLM Wiki는 자료를 받는 시점에 entity page로 미리 컴파일해 두어 지식이 계속 축적된다는 것이다. 6개 항목 비교표로 두 방식을 대조하고, 시작용 논문 5편과 컴파일, 증분 갱신, 유지보수용 프롬프트 3개를 원문 그대로 제공한다. 본 ai-wiki 저장소가 같은 패턴을 한국어와 3-tier 구조로 확장한 구현체이며, 이 article은 같은 패턴의 한국어 종합 정리인 [[applications/kmyu-2026-llm-wiki-pattern-synthesis]]와 짝을 이룬다.

## 1. 자료 정보 (Document Information)

- **형식**: Data Science Dojo 블로그 게시물. 일반 독자 대상 입문 튜토리얼이다.
- **저자**: Data Science Dojo Staff. 개인 저자가 아니라 staff byline이다.
- **퍼블리셔**: Data Science Dojo Blog
- **URL**: <https://datasciencedojo.com/blog/llm-wiki-tutorial/>
- **발행일**: 2026-04-16
- **구성**: Overview, Key Problem Addressed, What Is an LLM Wiki, RAG 비교표, Prerequisites, Step 1에서 Step 6, Common Mistakes to Avoid, FAQ 6문항, Next Steps, Key Concepts 요약의 순서다.
- **분량과 구성 요소**: 비교표 1개, 원문 그대로 제공되는 프롬프트 3개, FAQ 6문항이 들어 있다.
- **성격**: 1차 자료가 아니라 Karpathy Gist의 2차 해설 겸 실행 가이드다. 논문 5편 추천, 6단계 구분, 소요 시간 추정, 코딩 불필요 강조로 진입 장벽을 낮춘 구성이다.
- **원문이 밝히지 않은 것**: Karpathy가 "2026년 4월 GitHub Gist"로 공개했다고만 적고 Gist의 ID나 URL, 정확한 공개일은 제시하지 않는다. 본 저장소의 다른 자료가 인용하는 Gist ID를 이 article의 근거로 삼을 수 없다.

## 2. 주요 기여 (Key Contributions)

1. **6단계 절차 정식화**. 시작용 논문 5편 내려받기, `my-wiki/{raw,wiki}` 폴더 만들기, 컴파일 프롬프트 실행, Obsidian Graph View 열기, 자료를 더 넣고 증분 컴파일하기, 약 20페이지 도달 시 유지보수 패스 실행의 순서다. 단계마다 복사해 붙여 넣을 수 있는 프롬프트 상자를 둔다.
2. **RAG와 LLM Wiki를 6개 항목으로 대조**. 원문 비교표는 다음과 같다.

| 비교 항목 | RAG | LLM Wiki |
|---|---|---|
| 지식 영속성 | 없음, stateless | 완전, 시간이 지나며 축적 |
| 다중 문서 합성 | 질의마다 처음부터 | 페이지에 사전 컴파일 |
| 모순 탐지 | 없음 | 있음, 컴파일 중 표시 |
| 출처 추적성 | 높음 | 보통, 페이지 단위 |
| 구축 난이도 | 낮음 | 낮음에서 중간 |
| 적합한 용도 | 문서 대상 빠른 질의응답 | 깊고 계속 자라는 연구 주제 |

   출처 추적성을 LLM Wiki의 약점으로 명시한 점이 이 표의 특징이다. 페이지 단위까지만 남고 인용 문장 단위 추적은 RAG보다 약하다고 인정한다.
3. **문제 정의를 한 문장으로 제시**. "PDF를 ChatGPT에 올려 질문하고 다음 날 같은 PDF를 다시 올려 후속 질문을 해 본 적이 있다면 LLM Wiki가 푸는 문제를 이미 이해한 것"이라는 도입이다. 기존 AI 지식 시스템은 세션 사이에 메모리가 없어 검색하고 답하고 잊으며, 다음 질의에서 이해를 처음부터 다시 만든다는 진단이 뒤따른다.
4. **시작용 논문 5편 큐레이션**. 첫 그래프에서 연결이 자연스럽게 생기도록 고른 조합이다.

| 순서 | 논문 | 연도 | arXiv | 원문 설명 |
|---|---|---|---|---|
| 1 | Attention Is All You Need | 2017 | 1706.03762 | 원조 Transformer 논문 |
| 2 | BERT | 2018 | 1810.04805 | 언어 이해를 위한 양방향 Transformer |
| 3 | GPT-3 | 2020 | 2005.14165 | few-shot learner로서의 대형 언어 모델 |
| 4 | Foundation Models | 2021 | 2108.07258 | Transformer와 규모 확대, 응용을 잇는 survey |
| 5 | RLHF | 2022 | 2203.02155 | GPT 모델의 인간 피드백 alignment |

5. **두 가지 실행 경로 제시**. Option A는 Claude.ai 무료 티어에 PDF 5개를 한꺼번에 올리고 프롬프트를 보내는 방식으로 코딩이 필요 없으나 생성된 페이지를 사용자가 직접 `wiki/` 폴더로 복사해야 한다. Option B는 터미널에서 Claude Code를 띄워 같은 프롬프트를 붙여 넣는 방식으로, 파일을 직접 읽고 `wiki/`에 자동으로 쓴다.
6. **유지보수 프롬프트를 원문 그대로 제공**. 검사 항목은 다섯 가지다. 들어오거나 나가는 링크가 하나도 없는 orphan 페이지, 병합해야 할 중복이나 준중복 페이지, 페이지 사이의 모순, 깨지거나 잘못된 `[[wiki-links]]`, 너무 길어 분할이 필요한 페이지다. 결과는 `maintenance-report.md` 한 파일로 받아 사용자가 검토한다.
7. **흔한 실수 3가지 명시**. 한 페이지에 두 개념을 담는 것, 유지보수 패스를 한 번도 실행하지 않는 것, 서로 무관한 주제를 한꺼번에 넣는 것이다.
8. **다음 단계 3가지 제안**. Obsidian Web Clipper 확장으로 웹페이지를 markdown으로 자동 변환하기, 하나의 거대한 wiki 대신 주제별 wiki를 여러 개 두어 그래프를 깔끔하게 유지하기, 잘 관리된 100페이지 이상을 확보한 뒤 작은 모델을 fine-tuning해 개인 전용 모델을 만들기다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 6단계 절차

| 단계 | 하는 일 | 산출물 |
|---|---|---|
| Step 1 | 시작용 논문 5편을 PDF로 내려받는다 | `raw/`에 넣을 원본 5개 |
| Step 2 | `my-wiki/` 아래 `raw/`와 `wiki/` 두 폴더를 만들고 PDF를 `raw/`로 옮긴다 | 2-tier 폴더 |
| Step 3 | 컴파일 프롬프트를 Claude.ai(Option A) 또는 Claude Code(Option B)로 실행한다 | 개념별 `[concept-name].md` |
| Step 4 | Obsidian을 설치하고 `wiki/`를 vault로 열어 Graph View를 확인한다 | 노드와 엣지로 그린 지식 그래프 |
| Step 5 | 논문을 `raw/`에 더 넣고 증분 컴파일 프롬프트를 실행한다 | 갱신된 기존 페이지와 새 페이지 |
| Step 6 | 새 페이지가 약 20개 쌓이면 유지보수 프롬프트를 실행한다 | `maintenance-report.md` |

### 구조와 규격

- **2-tier 폴더 구조**. `my-wiki/` 아래에 `raw/`와 `wiki/`만 둔다. `raw/`는 원본 파일(PDF, 기사, 노트)을 담고 사람이 직접 편집하지 않는다. `wiki/`는 AI 에이전트가 쓰는 entity page를 담는다. 본 ai-wiki 저장소의 3-tier 구조와 달리 중간 요약 단계가 없어 wiki 페이지가 원본에서 곧바로 컴파일된다.
- **entity page 5항목 규격**. 컴파일 프롬프트가 각 개념 페이지에 요구하는 항목은 명확한 제목과 2~3문장 요약, 개념의 상세 설명, 관련 개념으로 향하는 `[[wiki-links]]`, 그 개념이 등장하는 출처 논문, 논문들이 그 개념을 다루는 방식 사이에서 관찰되는 모순이나 긴장이다. 개념 하나당 파일 하나로 `[concept-name].md` 형식으로 저장한다.
- **compilation step의 4가지 작업**. 새 문서를 넣을 때 시스템이 수행하는 일은 기존 페이지를 새 정보로 갱신하기, 처음 등장한 개념에 새 entity page 만들기, 새 개념과 기존 개념을 잇는 `[[wiki-links]]` 만들기, 새 자료와 기존 내용 사이의 모순 표시하기다. 이 네 가지가 stateless RAG와 LLM Wiki를 가르는 지점이다.
- **컴파일 프롬프트 2종 분리**. 초기 컴파일 프롬프트는 논문 5편을 한꺼번에 처리해 개념별 페이지를 새로 만든다. 증분 컴파일 프롬프트는 "새 논문들과 `wiki/` 폴더의 기존 wiki 페이지를 함께 읽어라"로 시작해 개념이 없으면 새 페이지를 만들고, 새 논문이 관련 정보를 더하면 기존 페이지를 갱신하고, 페이지 사이에 새 `[[wiki-links]]`를 추가하고, 예전 내용과 새 내용 사이의 모순을 표시하도록 네 가지 분기를 명시한다. 원문은 이 단계에서 새 논문이 새 페이지만 만드는 것이 아니라 기존 페이지를 풍부하게 만든다는 점을 강조한다.
- **유지보수 트리거는 약 20페이지**. 새 페이지가 대략 20개에 도달하면 유지보수 패스를 실행하라고 정량 기준을 제시한다. 작은 오류가 빠르게 번지므로 정기 점검이 필요하다는 것이 근거다.
- **Obsidian은 열람 계층**. Obsidian은 wiki를 수정하지 않고 시각화만 담당한다. `wiki/` 폴더를 vault로 선택하고 Graph View를 Ctrl+G 또는 Cmd+G로 연다. entity page가 노드로, `[[wiki-links]]`가 엣지로 렌더링된다.
- **논문 5편이 만드는 첫 그래프 모양**. 원문은 논문 5편을 처리한 뒤 Transformer 아키텍처가 attention 메커니즘과 연결되고, BERT가 fine-tuning과 연결되며, RLHF가 alignment 및 GPT 개념과 연결된 그림을 보게 될 것이라고 예고한다. 논문 선정이 이 연결을 의도한 결과임을 보여 준다.
- **필요한 준비물**. 도구는 폴더에 접근할 수 있는 컴퓨터(Mac, Windows, Linux), Claude.ai 계정(무료 티어로 충분), Obsidian(무료 markdown 편집기, 선택이지만 권장)이다. 파일은 PDF로 내려받은 연구 논문 5편이다. 필요한 지식은 폴더 만들기와 파일 내려받기 정도이며, Claude.ai 방식에는 코딩이 필요 없다. 예상 소요 시간은 25~35분이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

| 항목 | 원문이 제시한 값 |
|---|---|
| 예상 소요 시간 | 25~35분 |
| 필요한 코딩 | 없음(Option A 기준) |
| 시작 자료 | arXiv 논문 5편 |
| 유지보수 트리거 | 새 페이지 약 20개 |
| Karpathy 본인 wiki 규모 | 약 100편, 40만 단어 |
| 정량 벤치마크 | 없음 |

- **Karpathy 본인 wiki 규모**. FAQ의 "LLM Wiki는 얼마나 커질 수 있는가" 항목에서 "Karpathy 본인의 wiki는 약 100편과 40만 단어에 도달했고, 그 시점에도 LLM이 효율적으로 탐색할 수 있다고 그가 언급했다"고 인용한다. 이 수치가 성능 측정이 아니라 저자 본인의 관찰 보고라는 점을 함께 읽어야 한다.
- **정량 벤치마크 부재**. 이 article은 튜토리얼이라 RAG와 LLM Wiki의 정확도를 비교한 수치를 제시하지 않는다. "LLM이 여전히 효율적으로 탐색할 수 있었다" 같은 정성 평가만 인용한다.
- **FAQ가 답한 6문항**. LLM Wiki가 무엇인지, 누가 만들었는지, 코딩 지식이 필요한지, Notion이나 Obsidian과 무엇이 다른지, 얼마나 커질 수 있는지, 어떤 파일 형식이 되는지다. Notion 및 Obsidian과의 차이에 대한 답은 그 도구들이 사람이 직접 구조를 만들어야 하는 반면 LLM Wiki는 그 도구들을 열람 인터페이스로만 쓰고 컴파일, 연결, 유지보수는 AI 에이전트가 수행한다는 것이다. 파일 형식에 대한 답은 연구 논문은 PDF가 가장 잘 맞고, 웹 기사는 markdown이 잘 맞으며(Obsidian Web Clipper가 웹페이지를 자동 변환한다), 일반 텍스트와 내보낸 대화 기록도 쓸 수 있다는 것이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **2차 자료라 비판이 빠져 있다**. Karpathy Gist를 일반 독자용으로 푼 글이라 원 패턴을 향한 반론을 다루지 않는다. [[applications/kmyu-2026-llm-wiki-pattern-synthesis]]가 정리한 6가지 비판(RAG 본질 논쟁, 모델 붕괴, 손실 압축, 차세대 모델이 패턴을 무의미하게 만들 가능성, 벤치마크와 프로덕션 이슈 부재, 사고 위임에 따른 인지적 부작용)은 이 article의 범위 밖이다. LLM Wiki가 RAG보다 낫다는 논조가 강하지만 벤치마크가 없는 입문 가이드라는 점을 함께 읽어야 한다.
- **원본에서 wiki로 직접 컴파일하는 구조의 추적성 약화**. 중간 요약 단계가 없어 entity page가 어느 원본 문장에서 나왔는지 페이지 단위까지만 추적된다. 원문 비교표도 이 점을 LLM Wiki의 약점으로 인정한다. 본 ai-wiki 저장소가 `sources/` 단계를 넣어 3-tier로 확장한 이유가 이 추적성과 재요약, 언어 정책이다.
- **단일 wiki를 가정한다**. Next Steps에서 주제별 wiki를 여러 개 두라고 권하지만 본문은 단일 wiki를 전제로 쓰였다. wiki 사이의 링크, 여러 wiki에 걸친 동일 개념의 처리, 중복 정리는 다루지 않는다.
- **Option A는 수동 복사가 남는다**. Claude.ai 경로는 생성된 페이지를 사용자가 직접 `wiki/` 폴더에 복사해야 한다. Option B와 비교하면 사람의 실수와 형식 불일치가 생길 여지가 크다.
- **언어 정책이 없다**. 영어 자료와 영어 페이지를 전제한다. 본 ai-wiki 저장소가 다루는 한국어 본문과 영어 식별자 분리, 교착어 형태소 때문에 생기는 검색 한계는 범위 밖이다.
- **fine-tuning 시나리오가 한 줄에 그친다**. "100페이지 이상을 잘 관리한 뒤 작은 모델을 fine-tuning해 개인 전용 모델을 만들라"는 제안만 있고 모델 선정, 데이터 형식, 평가 방법은 없다.
- **개인 사용자를 가정한다**. 권한 관리, 다중 사용자, 감사 기록, 롤백, 동시 편집, 컴플라이언스는 다루지 않는다. [[applications/dnotitia-akb]]가 다루는 조직 단위 시나리오와 대비된다.
- **Gist 원문의 식별 정보가 없다**. 이 article은 Gist의 URL이나 ID, 정확한 공개일을 적지 않아 원문 대조가 이 자료만으로는 불가능하다.

## 6. 관련 연구 (Related Work)

- **Karpathy의 LLM Wiki Gist(2026년 4월)**. 이 article의 직접 출처다. 원문은 Karpathy를 OpenAI 공동 창업자이자 전 Tesla AI 디렉터로 소개하고, Gist 공개 후 개발자들 사이에서 빠르게 확산됐다고만 적는다. Gist의 URL이나 ID는 제시하지 않는다.
- **[[applications/kmyu-2026-llm-wiki-pattern-synthesis]]**. 같은 Gist를 출발점으로 한국어 커뮤니티 자료를 합성한 종합 정리다. 두 자료는 상호 보완 관계다. 이 datasciencedojo article이 영어권 일반 독자용 진입 경로(코딩 없이 25~35분, 프롬프트 원문 제공)를 맡고, 한국어 종합 정리는 비판, 한국어 실전 팁, 구현 세부, 메타 분석을 맡는다.
- **[[applications/liu-2026-rag-llm-wiki-or-gbrain]]**. RAG와 LLM Wiki, fat skills 중 무엇을 고를지의 판단 기준을 제시한 결정 프레임워크다. 이 article이 진입 가이드라면 Liu의 글은 의사결정 가이드다.
- **[[applications/garrytan-gbrain]]과 [[applications/dnotitia-akb]]와 [[applications/safishamsi-graphify]]**. markdown을 지식의 원본으로 두고 AI가 유지하는 동시대 사례들이다. LLM Wiki가 개인 학습자용 단순화 패턴이라면 이들은 에이전트 운영과 조직 단위 시나리오를 겨냥한다.
- **[[applications/lum1104-understand-anything]]**. Karpathy 패턴으로 만들어진 wiki를 입력으로 받아 지식 그래프를 만드는 OSS 도구다.
- **[[applications/pandey-2026-rag-is-no-longer-just]]**. RAG를 단일 패턴이 아니라 설계 공간으로 보자는 관점을 제시한다. 이 article의 RAG 대 LLM Wiki 비교를 그 설계 공간 안의 한 선택지로 다시 읽을 수 있다.
- **Obsidian Web Clipper**. Next Steps에서 권하는 브라우저 확장이다. 웹페이지를 markdown으로 자동 변환해 `raw/`에 넣게 해 준다. 본 ai-wiki 저장소의 articles 수집 절차와 목적이 같다.

## 7. 용어집 (Glossary)

- **LLM Wiki**: AI 에이전트가 작성하고 유지하는 plain markdown 파일들로 이루어진 개인 지식 베이스. 파일 하나가 개념 하나를 담고 `[[wiki-links]]`로 서로 연결된다.
- **entity page**: Wikipedia 형식의 개념 페이지. 제목과 요약, 상세 설명, `[[wiki-links]]`, 출처 논문, 모순 표기의 5항목으로 구성한다.
- **`[[wiki-links]]`**: 개념 사이의 내부 연결을 나타내는 markdown 문법. Obsidian이 이 문법을 그래프의 엣지로 렌더링한다.
- **compilation step**: 새 자료가 들어올 때 LLM이 수행하는 단계. 기존 페이지 갱신, 새 페이지 생성, 링크 생성, 모순 표시의 네 가지 작업으로 이루어진다.
- **knowledge graph**: entity page를 노드로, `[[wiki-links]]`를 엣지로 본 wiki 내부의 연결망.
- **Graph View**: Obsidian의 시각화 모드. Ctrl+G 또는 Cmd+G로 열어 wiki 구조를 한눈에 본다.
- **linting**: orphan 페이지, 중복, 모순, 깨진 링크, 과도하게 긴 페이지의 다섯 항목을 점검하는 정기 유지보수 패스. 새 페이지 약 20개마다 실행한다.
- **orphan page**: 들어오는 링크도 나가는 링크도 없는 entity page. 유지보수 프롬프트의 첫 검사 항목이다.
- **stateless와 stateful**: RAG는 질의마다 처음부터 답을 다시 만드는 stateless 구조이고, LLM Wiki는 지식을 유지하며 축적하는 stateful 구조다.
- **Obsidian Web Clipper**: 웹페이지를 markdown으로 자동 변환하는 브라우저 확장.
- **주제별 다중 wiki**: 하나의 거대한 wiki 대신 주제마다 wiki를 따로 두는 방식. 그래프 가독성을 위해 Next Steps에서 권한다.
