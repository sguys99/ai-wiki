---
title: "71.5배 토큰 절감, Graphify가 LLM 토큰 비용은 낮추고 답변 정확도는 높이는 방법"
type: video
year: 2026
category: applications
raw_path: raw/videos/todaycode-2026-graphify-llm-token-reduction-wiki.md
raw_filename: "todaycode-2026-graphify-llm-token-reduction-wiki.md"
source: todaycode-2026-graphify-llm-token-reduction-wiki.md
source_collection: external
tags: [graphify, llm-wiki, knowledge-graph, token-reduction, code-intelligence, tree-sitter, leiden, networkx, karpathy, korean]
channel: "오늘코드todaycode"
url: "https://www.youtube.com/watch?v=Ma8e25AOtao"
duration: "1h01m44s"
upload_date: "2026-04-17"
video_id: "Ma8e25AOtao"
---

## 요약 (Summary)

오늘코드 채널이 한 시간에 걸쳐 [[applications/safishamsi-graphify|Graphify]] 스킬을 한국어로 풀어쓴 deep dive 영상이다. 출발점은 Andrej Karpathy가 X에 올린 LLM Wiki(`raw/` 폴더 워크플로우)이고, Graphify는 그 아이디어를 자동화한 도구라는 계보를 첫 30초부터 분명히 한다. 발표자는 박정환(파이토치 한국 사용자 모임 운영진)이 만든 git 기반 한국 법령·판례 저장소 `legalize-kr`에서 특허법 폴더를 골라 직접 그래프로 만든 뒤 "특허 출원과 등록의 차이"를 자연어 질의로 풀어낸다. 공식 벤치마크는 71.5배지만 이 시연에서는 20만 토큰 → 292 토큰, **657배 절감**이라는 구체 수치가 나왔다. 후반 30분은 9단계 파이프라인(detect → extract → cache → build → analyze → visualize → transcribe → query → report), 이중 경로 추출(deterministic AST + non-deterministic LLM), tree-sitter·NetworkX·Leiden 알고리즘을 한국어로 압축 강의한다.

## 메타데이터 (Metadata)

- **채널**: 오늘코드todaycode (한국어 데이터·AI 교육 채널)
- **URL**: https://www.youtube.com/watch?v=Ma8e25AOtao
- **업로드일**: 2026-04-17
- **길이**: 1시간 1분 44초
- **포맷**: 라이브 시연 + 슬라이드 강의 — 발표자는 슬라이드 자체도 Graphify로 자동 생성했다고 밝힌다 (~38:00)
- **언어**: 한국어 (자막 한국어 자동 생성)

## 영상 구조 (Outline)

| 구간 | 내용 |
|---|---|
| 00:00 – 17:00 | 도구 소개 + 한국 법령(`legalize-kr`) 직접 시연. 특허법 폴더 그래프화 → 자연어 질의 → 657배 토큰 절감 실측 |
| 17:00 – 23:30 | Karpathy LLM Wiki X 포스트의 원전 아이디어와 Graphify의 연결 고리. 멀티모달 입력(코드·문서·논문·이미지·영상)과 결정적 그래프 생성 |
| 23:30 – 26:00 | 기존 도구(grep · IDE 정적 분석 · LSP)의 한계와 지식 그래프의 6대 해결책. 노드·엣지·속성 기본 구조 |
| 26:00 – 44:30 | 9단계 파이프라인 모듈별 책임 분해 |
| 44:30 – 55:00 | AST · tree-sitter · Leiden 알고리즘 기술 deep dive |
| 55:00 – 1:01:44 | Graphify 자체 코드(`extract.py`, `build.py`, `analyze.py`) 워크스루 + 메타 자체 분석 결과(1,394 노드 · 2,141 엣지 · 63 커뮤니티 · modularity 0.78) |

## Karpathy LLM Wiki → Graphify 계보 (Pedigree)

발표자가 명시적으로 강조하는 사실 연결고리다.

1. Andrej Karpathy가 X에 "관심 주제별 raw 폴더 → 요약 → 개념 → markdown/wiki" 워크플로우를 LLM Wiki로 제안한다 (~17:30).
2. Safi Shamsi(YC S26)는 이 raw 폴더 워크플로우에서 영감을 얻어 [[applications/safishamsi-graphify|Graphify]]를 만든다. 슬래시 스킬 한 줄이면 임의 폴더를 단일 NetworkX 그래프로 컴파일한다.
3. 본 영상은 Graphify를 한국어로 풀이하면서, 동시에 한국 법령 데이터에 실제로 적용해 토큰 절감 효과를 검증한다.

본 wiki에서 이 계보는 다음 자료들과 직접 연결된다.

- [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy|Karpathy LLM Wiki 입문 튜토리얼 (Data Science Dojo)]] — 영어권 6단계 워크플로우 가이드. 본 영상의 한국어 카운터파트
- [[applications/kmyu-2026-llm-wiki-pattern-synthesis|Karpathy LLM Wiki 패턴 한국어 종합 정리]] — 본 ai-wiki 소유자가 Notion에 정리한 메타 리포트
- [[applications/safishamsi-graphify|Graphify repo]] — 본 영상이 분해 대상으로 삼은 도구

## 이중 경로 추출 (Dual-Path Extraction)

`extract` 모듈의 핵심이다. 두 경로 결과를 마지막에 하나의 그래프로 머지하고, 각 엣지에는 신뢰도 태그를 붙인다 (~29:00-32:00).

- **Path A — 구조적 추출 (deterministic)**. `tree-sitter`로 23개 언어 AST를 파싱한다. function · class · import 노드와 call · inherit 엣지를 뽑아낸다. LLM을 전혀 호출하지 않으니 토큰 비용은 0, 결과도 늘 동일하다. 영상은 이 결정성이 71.5배 절감의 근원이라고 지목한다.
- **Path B — 의미적 추출 (non-deterministic, LLM)**. Claude · Antigravity · Codex 같은 모델이 개념·엔티티 인식, 인용·참조, 설계 의도, 이미지(UI · 스크린샷 · 차트 · 다이어그램)를 분석한다. "왜 이렇게 설계했는가" 같은 정보는 Path A로 잡히지 않고 Path B가 채운다.

신뢰도 태그는 세 단계로 정량화된다 (~35:30-36:00).

| 태그 | 의미 | 점수 |
|---|---|---|
| `extracted` | 소스에서 직접 확인된 관계 (예: AST가 잡은 call) | 1.0 |
| `inferred` | LLM의 합리적 의미 추론 | 0.6 – 0.9 |
| `ambiguous` | 불확실, 사람 검토 필요 | 0.1 – 0.3 |

## 9단계 파이프라인 (Nine-stage Pipeline)

| 단계 | 모듈 | 책임 |
|---|---|---|
| 1 | detect | 폴더 재귀 스캔 + 카테고리 분류(코드/문서/논문/이미지/영상/오디오) + 민감 파일 자동 필터(.env, credentials.json, .pem 등) + 200 file / 2M words 초과 시 사용자 확인 |
| 2 | extract | Path A(AST, tree-sitter) + Path B(LLM semantic) 이중 경로 병렬 |
| 3 | cache | 파일 해시 기반 증분 업데이트, `--update`로 80%+ 캐시 히트 → 첫 실행 대비 5배 속도 |
| 4 | build | extract 결과 머지 → 중복 노드 제거 → NetworkX 객체 → Leiden 커뮤니티 |
| 5 | analyze | God Node + Surprising Connections + Suggested Questions |
| 6 | visualize | 인터랙티브 HTML(vis.js) · SVG · GraphML · Neo4j Cypher · Obsidian vault · wiki(에이전트 크롤 가능) |
| 7 | transcribe | OpenAI Whisper로 영상·오디오 텍스트화 + 도메인 힌트로 전문 용어 보정 |
| 8 | query | BFS · DFS 기반 자연어 그래프 탐색 + 토큰 예산 제한 |
| 9 | report | `graph_understanding_report.md` 자동 생성 |

전체가 단일 CLI 명령으로 실행된다 — `graphify`, `graphify .`, `graphify ./raw`, `graphify watch`, `graphify wiki`. Claude Code · Antigravity · Codex 같은 어시스턴트에서는 `/graphify` 슬래시 스킬로 노출된다.

## 토큰 절감 실측 (Token Savings, in numbers)

발표자가 직접 측정한 값을 정리한다.

- **공식 벤치마크 (Graphify 문서 인용)**: 71.5배 토큰 절감
- **시연 실측 (한국 법령 특허법 폴더, ~13:00-13:30)**:
  - Graphify 없이: 약 20만 토큰 (파일 전체 읽기)
  - Graphify로: 292 토큰 (그래프 BFS/DFS 탐색)
  - **절감률: 657배**

처리 속도도 함께 정리되어 있다 (~40:30-41:00).

| 코퍼스 규모 | 처리 시간 |
|---|---|
| 50 파일 (소규모) | < 1분 |
| 200 파일 | < 5분 |
| 1,000 파일 (~10만 LOC) | ~8분 |
| 증분 업데이트 (캐시 히트) | ~1분 |

## Graphify 자체 분석 (Meta-analysis)

영상의 클라이맥스다. 발표자가 Graphify를 Graphify로 분석한다 (~33:00-34:30, ~58:30-59:30).

- **노드** 1,394개
- **엣지** 2,141개 (자막은 "2114, 141"로 잘못 합성한 부분을 맥락으로 복원한 값)
- **커뮤니티** 63개 (Leiden로 감지)
- **응집도** 0.78 (modularity. 1에 가까울수록 커뮤니티 내부 결합이 강함 — "매우 높음"으로 평가)
- **Python 파일** 20개
- **God Node 1위**: `extract.py` (48개 함수, 239개 관계). 발표자는 "새 프로젝트에 합류하면 여기서부터 읽으라"고 권한다.

## 핵심 라이브러리 (Core Libraries, ~54:30-55:30)

- **tree-sitter** — C로 구현된 다언어 incremental 파서. 23개 언어, 증분 파싱(log n), error recovery로 작성 중인 코드도 부분 파싱
- **NetworkX** — Python 그래프 라이브러리. 노드·엣지·중심성·직렬화
- **leidenalg + python-igraph** — Leiden 커뮤니티 감지(2019, Louvain 개선판). Louvain에서 연결이 끊긴 커뮤니티가 생기는 문제를 해결하고, resolution 파라미터로 클러스터 granularity를 조절
- **Python `ast`** — 표준 라이브러리. tree-sitter가 다언어를 맡고, Python 코드에 한해 보완 정보를 더해 주는 보조 역할

## 한계와 트레이드오프 (Limitations)

영상에 명시 한계 섹션은 없지만, 발표자가 흘리듯 짚은 트레이드오프와 본 sources 작성자가 추가로 식별한 노이즈를 묶었다.

- **초기 구축 비용**. 토큰 절감은 쿼리 시점 효과이고, Path B의 semantic 추출에는 LLM 토큰이 소모된다. 캐시 + 증분 업데이트가 이후 비용을 떨어뜨린다.
- **대규모 코퍼스 가드레일**. 200 파일 / 2M words를 넘으면 자동 처리하지 않고 사용자 확인을 요구한다. 안전장치인 동시에 "전체를 한 번에 그래프화"하기는 어렵다는 의미다.
- **외부 LLM 의존**. 시연 도중 "API 오류가 나서 다시 시도했다"는 코멘트가 등장한다 (~11:00). Path B는 네트워크·quota에 노출된다.
- **자막의 transcribing 노이즈** (sources 한계). YouTube 한국어 자동 자막이 고유명사·숫자를 잘못 합성한다("2114, 141", "tree-sitter / 트리시터 / 크트리시터", "Leiden / 라이덴", "vis.js / bj.js" 등). 정확한 인용이 필요할 땐 원본 영상 슬라이드를 직접 확인하는 편이 좋다.

## 본 wiki 운영 관점에서의 시사점 (Implications for ai-wiki)

본 ai-wiki는 Karpathy LLM Wiki 패턴을 직접 구현한 저장소다 ([`CLAUDE.md`](../../CLAUDE.md)의 3-tier `raw/` → `sources/` → `wiki/`). 본 영상은 그 패턴을 자동화한 도구를 분석하므로, 본 wiki 운영 모델과 직접 견주어 볼 만하다.

- 본 wiki는 사람이 LLM의 도움을 받아 정제한다. Graphify는 LLM 어시스턴트가 폴더에 적용해 그래프를 자동 생성한다.
- 본 wiki의 `wiki/{category}/{stem}.md` 페이지는 인간 큐레이션이고, Graphify의 `graph_understanding_report.md`는 결정적 추출 + LLM 보강으로 자동 생성된다.
- 두 접근은 보완 관계다. 본 wiki에서 Graphify를 써 보고 싶다면 `raw/` 폴더에 `graphify .`를 돌리면 된다 — Karpathy의 원전 아이디어가 그대로 살아 있다.

## 관련 페이지 (Related Pages)

- [[applications/safishamsi-graphify|Graphify repo (safishamsi/graphify)]] — 본 영상이 분석한 도구 자체. 모든 아키텍처 진술은 이 페이지와 교차 검증
- [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy|LLM Wiki by Karpathy 입문 튜토리얼 (Data Science Dojo)]] — 영어권 6단계 워크플로우 가이드 — 본 영상의 영어 카운터파트
- [[applications/kmyu-2026-llm-wiki-pattern-synthesis|Karpathy LLM Wiki 패턴 한국어 종합 정리]] — 본 wiki 소유자가 Notion에 합성한 메타 리포트
- [[applications/colbymchenry-codegraph|colbymchenry/codegraph]] — tree-sitter 기반 code-intelligence MCP 서버 — Graphify와 같은 "deterministic AST + KG" 계열
- [[applications/liu-2026-rag-llm-wiki-or-gbrain|RAG, LLM Wiki, or GBrain? (Liu, Medium)]] — 에이전트 job 기준 결정 프레임워크 — Graphify는 "compile" 축에 위치
- [[database/edge-2024-from-local-to-global|GraphRAG: From Local to Global]] — Microsoft GraphRAG 원논문 — Leiden 커뮤니티 감지를 RAG에 가져온 출발점, Graphify build/analyze 단계의 직접 계보
- [[database/guo-2025-lightrag-simple-and-fast|LightRAG]] · [[database/zhang-2026-leanrag-knowledge-graph-based-generation|LeanRAG]] — GraphRAG 후속작 — 그래프 RAG로 토큰을 줄이는 같은 흐름
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval|Direct Corpus Interaction]] · [[database/kalane-2026-pageindex-threw-out-vector-databases|PageIndex]] — vector DB 없는 RAG 계보 — Graphify와 같은 "탈벡터" 노선

<!-- HUMANIZE-SUMMARY v1.6.1
run_id: 2026-06-08-004
metrics:
  char_in: ~6900
  char_out: ~6920
  change_rate: 3.2%
  self_check: 6/6
  grade: A
categories:  # before → after
  A-15 추상 주어 + 만능 동사: 4 → 1
  A-18 좌향 수식·번역투 절: 3 → 1
  D-7 변환 공식 'X에서 Y로': 1 → 0
  E-2 '~한다' 종결 단조: 6 → 3
  H-3 메타 진입 '이 계보는': 1 → 0
  I-4 권고형 결말 '~한다' 반복: 2 → 1
self_check:
  - 고유명사·수치·인용 100% 보존: pass
  - YAML frontmatter 무변경: pass
  - wikilink·표·코드·CLI 명령 보존: pass
  - 변경률 30% 이하: pass (3.2%)
  - 장르 이탈 없음 (기술 리포트 톤 유지): pass
  - register 보존 (격식·평어 그대로): pass
  - S1 잔존 0건: pass
  - 인공 표현 추가 없음: pass
highlights:
  - id: A-15
    before: "발표자는 박정환(파이토치 한국 사용자 모임 운영진)이 만든 git 기반 한국 법령·판례 저장소 `legalize-kr`에서 특허법 폴더를 골라 직접 그래프화한 뒤"
    after: "발표자는 박정환(파이토치 한국 사용자 모임 운영진)이 만든 git 기반 한국 법령·판례 저장소 `legalize-kr`에서 특허법 폴더를 골라 직접 그래프로 만든 뒤"
  - id: E-2
    before: "구체 수치가 나온다."
    after: "구체 수치가 나왔다."
  - id: H-3
    before: "이 계보는 본 wiki에서 다음 자료들과 직접 연결된다."
    after: "본 wiki에서 이 계보는 다음 자료들과 직접 연결된다."
  - id: A-15
    before: "토큰 비용 0, 항상 같은 결과가 나온다."
    after: "토큰 비용은 0, 결과도 늘 동일하다."
  - id: I-4
    before: "본 wiki 운영 모델과 직접 비교할 수 있다."
    after: "본 wiki 운영 모델과 직접 견주어 볼 만하다."
residual_findings: (없음 — S1 잔존 0, S2 잔존 1건 미만)
grade_reason: "A — S1 0건, 변경률 3.2% (기술 리포트 보수적 윤문 목표 충족), 자체검증 6항 통과. 수치·고유명사·wikilink·YAML·표 구조 100% 보존, 기술 리포트 register 그대로."
-->
