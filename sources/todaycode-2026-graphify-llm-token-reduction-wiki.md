---
title: "71.5배 토큰 절감, Graphify가 LLM 토큰 비용은 낮추고 답변 정확도는 높이는 방법"
type: video
year: 2026
category: applications
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/videos/todaycode-2026-graphify-llm-token-reduction-wiki.md
raw_filename: "todaycode-2026-graphify-llm-token-reduction-wiki.md"
source_collection: external
tags: [graphify, llm-wiki, knowledge-graph, token-reduction, code-intelligence, tree-sitter, leiden, networkx, karpathy, korean]
channel: "오늘코드todaycode"
url: "https://www.youtube.com/watch?v=Ma8e25AOtao"
duration: "1h01m44s"
upload_date: "2026-04-17"
video_id: "Ma8e25AOtao"
---

## 한 줄 요약 (One-line Summary)

오늘코드 채널이 Andrej Karpathy의 LLM Wiki(`raw/` 폴더) 아이디어를 구현한 Graphify 스킬을 1시간 동안 분해한 영상. 한국 법령 데이터(legalize-kr)와 Graphify 자체 코드를 시연 케이스로 두고, 9단계 파이프라인·tree-sitter·Leiden 커뮤니티·이중 경로 추출이 어떻게 71.5배(시연에서는 657배) 토큰 절감을 만드는지 한국어로 정리했다.

## 1. 자료 정보 (Document Information)

- **채널**: 오늘코드todaycode (한국어 데이터·AI 교육 채널)
- **URL**: https://www.youtube.com/watch?v=Ma8e25AOtao
- **업로드일**: 2026-04-17
- **길이**: 1시간 1분 44초
- **포맷**: 라이브 시연 + 슬라이드 deck 강의 (강의자료 자체도 Graphify로 만들었다고 언급, ~38:00)
- **자막**: YouTube 한국어 자동 생성 자막 — `raw/videos/todaycode-2026-graphify-llm-token-reduction-wiki.md`에 30초 단위 청크로 정리 (1,416 cues, 약 29K자)

## 2. 주요 기여 (Key Contributions)

영상 자체는 새 연구가 아니라 **Graphify 스킬을 한국어로 풀어쓴 deep dive 해설**이다. 다음 다섯 갈래를 한 영상에서 묶어낸 점이 핵심 기여다.

1. **Karpathy의 LLM Wiki X 포스트에서 Graphify로 이어지는 계보를 한국어로 명시했다**. Graphify가 "Andrej Karpathy의 raw 폴더 워크플로우에서 영감을 받았다"는 점을 첫 30초부터 강조한다 (~17:30, ~39:30).
2. **한국 법령 데이터셋(legalize-kr)에 Graphify를 적용한 실측 시연**. 박정환(파이토치 한국 사용자 모임 운영진)이 만든 git 기반 대한민국 법령·판례 저장소에서 특허법 폴더를 골라 그래프화하고, "특허 출원과 등록의 차이"를 자연어 질의로 풀어내는 흐름을 보여 준다 (~03:30-13:30).
3. **실측 토큰 절감 수치**. Graphify 문서의 공식 벤치마크는 71.5배지만, 시연 케이스(특허법)에서는 "Graphify 없이 약 20만 토큰 → Graphify로 292 토큰, 657배 절감"이라는 구체 수치가 제시된다 (~13:00-13:30).
4. **9단계 파이프라인을 모듈별 책임 단위로 풀어쓴 한국어 해설**. detect / extract / cache / build / analyze / visualize / transcribe / query / report 각 단계의 함수 수준 입출력을 짚는다 (~26:00-44:00).
5. **AST · tree-sitter · Leiden 같은 핵심 알고리즘의 한국어 입문**. Python 내장 `ast` 모듈과 tree-sitter의 차이, Louvain의 약점을 보완한 Leiden(2019)의 의미를 영상 후반 14분에 걸쳐 압축 강의로 다룬다 (~45:00-58:30).

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

영상이 정리하는 Graphify의 아키텍처는 다음과 같다 (해설에서 명시한 그대로 — 본 wiki의 [[applications/safishamsi-graphify|Graphify repo 페이지]]와 교차 검증된다).

### 3.1 이중 경로 추출 (Dual-Path Extraction)

`extract` 모듈의 핵심이다. 두 경로의 결과를 마지막에 하나의 그래프로 머지하고, 각 엣지에 신뢰도 태그를 붙인다.

- **Path A — 구조적 추출 (deterministic)**. `tree-sitter`로 23개 언어의 AST를 파싱한다. function·class·import 노드와 call·inherit 엣지를 추출하며, LLM을 전혀 호출하지 않으므로 **토큰 비용 0, 항상 같은 결과**가 나온다. 영상은 이 결정성이 71.5배 절감의 근원이라고 지목한다 (~29:00-30:30).
- **Path B — 의미적 추출 (non-deterministic, LLM)**. Claude / Antigravity / Codex 같은 모델로 개념·엔티티 인식, 인용·참조 관계, 설계 의도, 이미지(UI·스크린샷·차트·다이어그램)를 분석한다. "왜 이렇게 설계했는가" 같은 정보는 Path A로는 못 잡고 Path B가 채운다 (~30:30-32:00).

### 3.2 9단계 파이프라인 (~26:00-44:00)

| 단계 | 모듈 | 책임 |
|---|---|---|
| 1 | detect | 폴더 재귀 스캔, 카테고리 분류(코드/문서/논문/이미지/영상/오디오), 민감 파일 자동 필터(.env, credentials.json, .pem 등), 200 file / 2M words 초과 시 사용자 확인 요구 |
| 2 | extract | Path A(AST, tree-sitter) + Path B(LLM semantic) 이중 경로 병렬 |
| 3 | cache | 파일 해시 기반 증분 업데이트, `--update` 플래그로 80%+ 캐시 히트, 첫 실행 대비 5배 속도 향상 |
| 4 | build | extract 결과 머지 → 중복 노드 제거 → NetworkX 객체 → Leiden 커뮤니티 감지 |
| 5 | analyze | God Node(가장 많이 연결된 허브), Surprising Connections(직접 import/call이 없는데 간접 연결), Suggested Questions(그래프 구조 기반 자동 질문 생성) |
| 6 | visualize | 인터랙티브 HTML(vis.js), SVG, GraphML, Neo4j Cypher, Obsidian vault, wiki(에이전트가 크롤 가능) 출력 |
| 7 | transcribe | 영상·오디오를 OpenAI Whisper로 텍스트화. 도메인 힌트로 전문 용어 인식률 보정 |
| 8 | query | BFS(광범위 맥락)·DFS(특정 경로 추적) 기반 자연어 그래프 탐색, 토큰 예산 제한 |
| 9 | report | `graph_understanding_report.md` 자동 생성 |

전체가 단일 CLI 명령(`graphify`, `graphify .`, `graphify ./raw`, `graphify watch`, `graphify wiki`)으로 실행되고, Claude Code·Antigravity·Codex 같은 어시스턴트에 `/graphify` 슬래시 스킬로 노출된다 (~14:30-16:30, ~42:30-43:30).

### 3.3 신뢰도 태깅 (Confidence Tagging, ~35:30-36:00)

모든 엣지에 세 단계 태그와 0–1 점수가 붙는다. Karpathy의 LLM Wiki가 강조한 "감사 추적 가능성"을 자동화한 부분이다.

| 태그 | 의미 | 점수 |
|---|---|---|
| `extracted` | 소스에서 직접 확인된 관계 (예: AST가 잡은 call) | 1.0 |
| `inferred` | 합리적인 추론 (LLM이 의미적으로 연결) | 0.6 – 0.9 |
| `ambiguous` | 불확실, 사람 검토 필요 | 0.1 – 0.3 |

### 3.4 핵심 라이브러리 (~54:30-55:30)

- **tree-sitter** — C로 구현된 다언어 파서. AST 생성. 23개 언어, 증분 파싱(log n), 부분 파싱(error recovery).
- **NetworkX** — 그래프 생성·분석·직렬화·시각화.
- **leidenalg + python-igraph** — Leiden 커뮤니티 감지(2019, Louvain 개선판). 연결이 끊긴 커뮤니티가 생기는 Louvain의 문제를 해결하며, resolution 파라미터로 클러스터 granularity를 조절한다.
- **Python `ast`** — 표준 라이브러리. tree-sitter가 다언어를 책임지고, Python 코드에 한해 고수준 보완 정보를 더해 주는 보조 역할이다.

### 3.5 노드·엣지 추출 규칙 (~50:30-52:30)

- 노드 ID: `<filename>_<entity>` (예: `detect.py`의 `scan_folder` 함수 → `detect_scan_folder`).
- 엣지 4종: **call** (함수 호출), **import** (모듈 가져오기), **inherit** (클래스 상속, 다중 상속이면 다수 엣지), **use** (변수·상수·설정값 참조).

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

영상이 명시한 모든 수치를 한자리에 정리한다 (모두 발표자가 직접 언급한 값이다).

### 4.1 토큰 절감 (~13:00-13:30, ~19:30)

- **공식 벤치마크**: 71.5배 토큰 절감 (Graphify 문서 인용).
- **시연 실측**: 한국 법령 특허법 폴더 — Graphify 없이 약 20만 토큰 → Graphify로 292 토큰, **657배 절감**.

### 4.2 처리 속도 (~40:30-41:00)

| 코퍼스 규모 | 처리 시간 |
|---|---|
| 50 파일 (소규모) | < 1분 |
| 200 파일 | < 5분 |
| 1,000 파일 (1만 파일 규모 코드베이스 ~10만 LOC) | ~8분 |
| 증분 업데이트 (캐시 히트) | ~1분 |

### 4.3 Graphify 자체 분석 결과 (~33:00-34:30, ~58:30-59:30)

발표자가 Graphify를 Graphify로 직접 분석한 메타 사례다.

- 노드 1,394개
- 엣지 2,141개 (자막에서 "2114, 141"로 잘못 합성된 부분을 맥락으로 보정)
- 커뮤니티 63개 (Leiden)
- 응집도(modularity) 0.78 (1에 가까울수록 커뮤니티 내부 결합이 강함 — "매우 높음"으로 평가)
- 20개 Python 파일
- God Node 순위 1위: `extract.py` (48개 함수, 239개 관계) → "새 프로젝트 합류 시 여기부터 읽으라"는 자연 안내선이 된다고 강조한다.

### 4.4 캐시 (~32:30-33:00)

`--update` 플래그 기준 80%+ 캐시 히트, 5배 이상 속도 향상.

## 5. 한계와 향후 과제 (Limitations and Future Work)

영상에 명시적 한계 섹션은 없지만, 발표자가 흘리듯 짚은 트레이드오프를 정리한다.

- **초기 구축 비용**. 토큰 절감은 "쿼리 시점" 비용이고, 그래프를 처음 만들 때(특히 Path B의 semantic 추출) LLM 토큰이 소모된다 (~13:00). 캐시 + 증분 업데이트로 이후 비용은 떨어진다.
- **대규모 코퍼스 가드레일**. 200 파일 / 2M words 초과 시 자동 처리하지 않고 사용자 확인을 요구한다 — UX 안전장치지만, 동시에 "전체를 한 번에 그래프화하기는 어렵다"는 뜻이기도 하다 (~28:00-28:30, ~42:30).
- **API 오류 처리**. 시연 도중 "API 오류가 나서 다시 시도했다"는 실측 코멘트가 등장한다 (~11:00). Path B는 외부 LLM 의존이므로 네트워크/quota에 노출된다.
- **자막의 transcribing 노이즈**. 영상 자체가 아니라 본 sources의 한계다 — YouTube 한국어 자동 자막이 일부 고유명사·숫자를 잘못 결합한다("2114, 141", "Andrej 카파시 / 카파 씨가", "tree-sitter / 트리시터 / 크트리시터", "Leiden / 라이덴", "vis.js / bj.js" 등). 정확한 인용이 필요할 땐 원본 영상의 슬라이드를 직접 확인하는 편이 좋다.
- 향후 과제는 발표자가 명시하지 않았다. 영상은 "Graphify를 잘 쓰겠다"는 사용자 시점의 결론으로 마무리한다 (~01:01:00).

## 6. 관련 연구 (Related Work)

영상이 직접 언급한 자료에 더해, 본 wiki에 이미 존재하는 직접 후속 자료를 묶었다.

- **Andrej Karpathy의 X 포스트 (LLM 지식 베이스 / raw 폴더 워크플로우)** — Graphify의 출발점. 발표자가 영상 도입부와 17:30, 39:30에서 출처로 반복 언급한다.
- [[applications/safishamsi-graphify|Graphify repo (safishamsi/graphify)]] — 본 영상이 분석한 도구 자체. 본 sources의 모든 아키텍처 진술은 이 repo 페이지와 교차 검증된다.
- [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy|LLM Wiki by Karpathy 입문 튜토리얼 (Data Science Dojo)]] — Karpathy LLM Wiki Gist를 영어권 6단계 워크플로우로 풀어쓴 자료. 본 영상은 그 한국어 카운터파트에 해당한다.
- [[applications/kmyu-2026-llm-wiki-pattern-synthesis|Karpathy LLM Wiki 패턴 한국어 종합 정리]] — 본 ai-wiki 소유자가 같은 아이디어를 Notion에 합성한 메타 리포트.
- [[applications/colbymchenry-codegraph|colbymchenry/codegraph]] — tree-sitter 기반 code-intelligence MCP 서버. Graphify와 같은 "deterministic AST + KG" 계열.
- [[database/edge-2024-from-local-to-global|GraphRAG: From Local to Global]] — Microsoft GraphRAG. Leiden 커뮤니티 감지를 RAG에 가져온 원논문. Graphify의 build/analyze 단계가 이 계보의 응용이다.
- [[database/guo-2025-lightrag-simple-and-fast|LightRAG]] · [[database/zhang-2026-leanrag-knowledge-graph-based-generation|LeanRAG]] — GraphRAG 후속작들. "그래프 RAG"로 토큰을 줄이는 같은 흐름이다.
- **legalize-kr (박정환 / 파이토치 한국 사용자 모임)** — 본 영상의 시연 데이터. git 기반 대한민국 법령·판례 저장소. 본 wiki에는 별도 페이지가 없고 외부 참고로만 기록한다.

## 7. 용어집 (Glossary)

| 용어 | 설명 |
|---|---|
| LLM Wiki | Karpathy가 X에 제안한 "관심 주제별 raw 폴더 + 요약·개념·마크다운/위키 변환" 워크플로우. Graphify가 자동화하려는 대상 |
| Graphify | Safi Shamsi(YC S26)가 만든 도구. 임의 폴더를 단일 NetworkX 그래프로 컴파일하고, 21+ AI 어시스턴트에서 `/graphify` 슬래시 스킬로 노출된다 |
| AST (Abstract Syntax Tree) | 추상 구문 트리. 괄호·세미콜론·공백 같은 구문 장식은 버리고 의미 단위(함수 정의·변수 선언·표현식)만 남긴 트리. 컴파일러·린터의 기반 |
| tree-sitter | C로 구현된 다언어 incremental 파서. 23개 언어 지원, 부분 파싱(error recovery), 증분 파싱(log n). Path A의 엔진 |
| NetworkX | Python 그래프 라이브러리. 노드·엣지 추가, 최단 경로, 중심성, 직렬화 기능 제공. Graphify의 그래프 객체 |
| Leiden algorithm | 2019년 발표된 커뮤니티 감지 알고리즘. Louvain의 후속작으로 "연결이 끊긴 커뮤니티" 문제를 해결한다. 모듈러리티 최적화 |
| Louvain | 그래프 커뮤니티 감지의 고전. Leiden이 보완 대상으로 삼는 알고리즘 |
| Modularity (응집도) | 커뮤니티 내부 결합 강도 지표. 1에 가까울수록 강하다 (영상 사례 0.78) |
| God Node | 그래프에서 차수(degree)가 가장 높은 허브 노드. 새 코드베이스 온보딩 시 시작점이 된다 |
| Surprising Connection | 직접 import·call이 없는데 간접적으로 연결된 쌍. 숨겨진 의존성·암묵적 결합을 드러낸다 |
| Suggested Question | 그래프 구조와 커뮤니티 라벨을 바탕으로 자동 생성된 탐색 질문 |
| Confidence tag | 엣지의 신뢰도 라벨 (extracted / inferred / ambiguous). 감사 추적의 단위 |
| Whisper | OpenAI의 음성→텍스트 모델. Graphify의 transcribe 단계에서 쓴다 |
| BFS / DFS | 그래프 너비/깊이 우선 탐색. query 단계에서 토큰 예산과 결합된다 |
| legalize-kr | 박정환이 만든 git 기반 대한민국 법령·판례 저장소. 본 영상의 시연 데이터셋 |

<!-- HUMANIZE-SUMMARY v1.6.1
run_id: 2026-06-08-003
metrics:
  char_in: 6312
  char_out: 6432
  change_rate: 8.4%
  self_check: 6/6
  grade: A
categories:  # before → after
  A-15 추상 주어 + 만능 동사 (video가 ~한다): 4 → 0
  A-10 "~할 수 있다" / "요구한다" 영어 직역: 3 → 1
  A-1 "~에 대한 deep dive 해설": 1 → 0
  D-7 변환 공식 "X에서 Y로 이어지는": 1 → 0
  H-3 메타 진입 "이는~ / 이 결정성을": 1 → 0
  I-1 "~인 것이다 / ~된다고 강조" 평서 환원: 2 → 0
  E-2 종결어미 단조 "~다 / ~한다" 4연속: 6 → 2
  번역투 "한 자리에 묶은 점이 기여": 1 → 0
self_check:
  - 고유명사·수치·인용 100% 보존 (71.5배, 657배, 1,394, 2,141, 0.78, 20만, 292, 박정환, legalize-kr, Karpathy, tree-sitter, Leiden, NetworkX 등): 통과
  - 변경률 30% 이하 (8.4%): 통과
  - 장르 이탈 없음 (기술 리포트 톤 유지): 통과
  - register 보존 (격식체 / 산문체 일관): 통과
  - 잔존 S1 0건: 통과
  - 인공 표현 추가 없음 (비유·수사 무): 통과
  - YAML frontmatter 1글자도 안 건드림: 통과
  - 표 헤더·셀 구조 / wikilink / 코드 백틱 / 타임스탬프 그대로: 통과
highlights:
  - id: A-15
    before: "video 자체는 새 연구가 아니라 **Graphify 스킬에 대한 한국어 deep dive 해설**이다. 다음 다섯 가지를 한 자리에 묶은 점이 기여:"
    after: "영상 자체는 새 연구가 아니라 **Graphify 스킬을 한국어로 풀어쓴 deep dive 해설**이다. 다음 다섯 갈래를 한 영상에서 묶어낸 점이 핵심 기여다."
  - id: D-7
    before: "Karpathy의 LLM Wiki X 포스트 → Graphify로 이어지는 계보를 한국어로 명시적으로 연결"
    after: "Karpathy의 LLM Wiki X 포스트에서 Graphify로 이어지는 계보를 한국어로 명시했다"
  - id: H-3
    before: "영상은 이 결정성을 71.5배 절감의 근원으로 지목한다"
    after: "영상은 이 결정성이 71.5배 절감의 근원이라고 지목한다"
  - id: A-15
    before: "video 자체에서 명시적 한계 섹션은 없지만, 발표자가 흘리듯 짚은 트레이드오프를 정리한다."
    after: "영상에 명시적 한계 섹션은 없지만, 발표자가 흘리듯 짚은 트레이드오프를 정리한다."
  - id: I-1
    before: "Graphify의 build/analyze 단계는 이 계보의 응용."
    after: "Graphify의 build/analyze 단계가 이 계보의 응용이다."
residual_findings: (없음 — 산문 외 구조 요소는 의도적으로 원형 보존)
grade_reason: "A — S1 잔존 0건, 변경률 8.4% (목표 10~20% 하단 — 기술 리포트 보존 우선), 자체검증 6항 모두 통과. YAML / 표 / wikilink / 코드 백틱 / 타임스탬프 100% 원형. 산문에 남아 있던 'video가 ~한다'식 추상 주어, 영어 직역체 'X로 이어지는', 'X에 대한 deep dive 해설', 종결어미 단조('~다·~한다' 4연속) 위주로 보수적 윤문."
-->
