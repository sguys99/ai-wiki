---
title: "Lum1104/Understand-Anything"
type: repo
year: 2026
category: applications
raw_path: raw/repos/lum1104-understand-anything.md
raw_filename: "lum1104-understand-anything.md"
source_collection: external
source: lum1104-understand-anything.md
tags: [code-understanding, knowledge-graph, multi-agent-pipeline, tree-sitter, llm-hybrid, claude-code-plugin, karpathy-llm-wiki, dashboard, incremental-analysis, multi-platform]
org: "Lum1104"
repo: "Understand-Anything"
url: "https://github.com/Lum1104/Understand-Anything"
license: "MIT"
---

## 요약

Understand Anything은 코드베이스를 knowledge graph로 바꿔 대화형 대시보드에서 탐색하게 해주는 MIT 라이선스 오픈소스 플러그인이다. `/understand` 명령 하나가 프로젝트 전체를 스캔해 파일, 함수, 클래스, 의존 관계를 노드와 엣지로 담은 JSON 파일을 만들고, `/understand-dashboard`가 그 JSON을 웹 화면에 띄운다.

설계의 중심은 tree-sitter와 LLM의 역할 분리다. 구조적 사실은 파서가 결정론적으로 뽑고, 그 구조가 무엇을 위한 것인지는 LLM이 자연어로 붙인다. 이 분리 덕분에 같은 코드는 언제나 같은 엣지를 만들면서도 그래프에 의도까지 담긴다.

코드베이스만 대상으로 삼는 것은 아니다. `/understand-knowledge` 명령은 Karpathy 패턴 LLM wiki를 입력으로 받아 문서 사이의 관계를 그래프로 만든다. 이 ai-wiki 저장소가 정확히 그 형태의 자료이므로, 이 페이지가 다루는 도구는 이 저장소 자신을 분석 대상으로 삼을 수 있다.

## 배경

새 코드베이스를 처음 마주할 때 생기는 문제가 출발점이다. README는 상황을 이렇게 제시한다. 새 팀에 합류했는데 코드베이스가 20만 줄이면 어디서부터 봐야 하는가.

기존 방식은 파일을 순서 없이 열어 읽는 것이다. 이때 잃는 것은 전체 구조다. 개별 파일이 무엇을 하는지는 알아도 그 파일이 시스템 어디에 놓이고 무엇에 기대고 있는지는 보이지 않는다.

README는 목표를 명확히 좁힌다. 코드베이스가 얼마나 복잡한지 과시하는 그래프가 아니라, 각 조각이 어떻게 맞물리는지 조용히 가르치는 그래프를 만드는 것이다.

이 목표 설정이 도구의 기능 구성을 결정한다. 그래프를 그리는 것이 목적이라면 노드와 엣지만 있으면 된다. 그러나 가르치는 것이 목적이면 무엇을 먼저 봐야 하는지, 이 파일이 시스템의 어느 층에 속하는지, 이 코드가 어떤 업무에 대응하는지를 함께 말해 줘야 한다. 그래서 산출물에 학습 순서를 정해 주는 guided tour, 아키텍처 레이어 구분, business domain 매핑이 함께 들어간다.

문서로 같은 목적을 달성하는 방법도 있지만 문서는 코드가 바뀌면 낡는다. 그래프를 코드에서 매번 다시 생성하는 방식은 이 문제를 피한다. 대신 생성 비용을 감수해야 하고, 그 비용을 낮추는 것이 증분 분석의 존재 이유다.

## 핵심 개념

knowledge graph는 이 도구의 산출물이자 모든 기능이 올라타는 자료 구조다. 파일, 함수, 클래스가 노드가 되고 그 사이의 의존 관계가 엣지가 된다. 저장 위치는 `.understand-anything/knowledge-graph.json` 한 파일이다. 파일 하나이므로 git에 커밋할 수 있고, 커밋하면 동료는 분석 파이프라인을 실행하지 않고 대시보드만 열면 된다.

tree-sitter는 소스 코드를 concrete syntax tree로 파싱하는 파서 생성기다. 여기서는 import, export, 함수와 클래스 정의, 호출 지점, 상속처럼 코드에 명시적으로 적혀 있는 사실을 뽑는 데 쓴다. 같은 입력에 같은 출력을 내므로 결정론적이다.

importMap은 스캔 단계에서 tree-sitter가 미리 해석해 둔 import 관계다. 이 결과가 file-analyzer 배치에 함께 전달되기 때문에 file-analyzer는 소스를 다시 읽어 import를 유도하지 않는다. 결정론적으로 확정할 수 있는 것을 LLM에 넘기지 않는다는 원칙이 이 자료 구조에 담겨 있다.

guided tour는 의존 순서로 정렬된 아키텍처 walkthrough다. 코드베이스를 아무 순서로 읽는 대신 먼저 봐야 할 것을 먼저 보게 하는 장치이며, `tour-builder` 에이전트가 자동으로 만든다.

fingerprint 기반 변경 감지는 증분 갱신의 근거다. tree-sitter가 이 감지도 함께 담당하며, 덕분에 `/understand`를 다시 실행해도 변경된 파일만 재분석한다.

아키텍처 레이어는 노드를 역할별로 묶는 상위 분류다. API, Service, Data, UI, Utility 다섯 가지가 쓰이고 대시보드가 색으로 구분해 보여 준다. 파일이 디렉터리 어디에 있느냐가 아니라 무엇을 하느냐로 묶는 분류이므로 배정은 LLM이 맡는다.

business domain은 코드가 대응하는 업무 영역이다. domain, flow, step 세 단계로 표현하며 `/understand-domain`이 따로 추출한다. 구조 그래프가 코드끼리의 관계를 담는다면 도메인 뷰는 코드와 업무 사이의 대응을 담는다.

force-directed 배치는 노드끼리 밀고 당기는 힘을 계산해 위치를 정하는 그래프 레이아웃이다. 미리 정해진 계층이 없는 자료에 쓴다. community clustering은 연결이 촘촘한 노드 무리를 자동으로 찾아 묶는 처리다. 두 가지가 함께 지식 베이스 그래프의 화면을 만든다.

## 방법

### tree-sitter와 LLM의 역할 분담

README의 "Under the Hood" 절은 정적 분석과 LLM이 각자 잘하는 일을 나눈다고 설명한다. 두 수단의 담당 범위는 다음과 같이 갈린다.

| 수단 | 성격 | 산출하는 것 |
|---|---|---|
| tree-sitter | 결정론적 | import, export, 함수와 클래스 정의, 호출 지점, 상속. 스캔 단계에서 `importMap`으로 사전 해석되어 file-analyzer에 전달된다. fingerprint 기반 변경 감지도 담당한다 |
| LLM | 의미적 | 자연어 요약, 태그, 아키텍처 레이어 배정, business domain 매핑, guided tour, 언어 개념 설명 |

이 분리가 만드는 결과는 두 가지다. 구조 쪽에서는 같은 코드가 항상 같은 엣지를 만들어 그래프가 재현 가능하다. 의미 쪽에서는 파일이 무엇을 import하는지를 넘어 무엇을 위한 것인지까지 담긴다. 즉 재현성과 표현력을 각각 다른 수단으로 확보한다.

이 원칙은 자료 구조에도 나타난다. `importMap`은 스캔 단계에서 한 번 만들어져 file-analyzer 배치에 그대로 전달된다. LLM에게 소스를 주면서 import를 알아서 읽으라고 하지 않고, 파서가 이미 확정한 답을 함께 건네는 방식이다. 같은 사실을 두 번 유도하지 않으므로 결과가 흔들릴 여지도 그만큼 줄어든다.

### 에이전트 구성

`/understand`는 여러 전문 에이전트를 조율한다. README의 표가 정의하는 역할 분담은 다음과 같다.

| 에이전트 | 역할 | 호출하는 명령 |
|---|---|---|
| `project-scanner` | 파일을 찾아내고 언어와 프레임워크를 식별한다 | `/understand` |
| `file-analyzer` | 함수, 클래스, import를 추출해 그래프의 노드와 엣지를 만든다 | `/understand` |
| `architecture-analyzer` | 아키텍처 레이어를 식별한다 | `/understand` |
| `tour-builder` | guided learning tour를 생성한다 | `/understand` |
| `graph-reviewer` | 그래프의 완전성과 참조 무결성을 검증한다 | `/understand` |
| `domain-analyzer` | business domain, flow, process step을 추출한다 | `/understand-domain` |
| `article-analyzer` | wiki article에서 entity, claim, 암묵적 관계를 추출한다 | `/understand-knowledge` |

`graph-reviewer`의 검증은 기본적으로 inline으로 실행된다. `--review` 플래그를 주면 LLM이 수행하는 전체 리뷰로 승격한다. 검증을 항상 LLM에 맡기지 않고 선택지로 둔 구성이다.

검증 대상은 그래프의 완전성과 참조 무결성이다. 엣지가 존재하지 않는 노드를 가리키는지, 빠진 노드가 있는지를 본다. 추출된 관계가 코드의 실제 동작과 맞는지를 재는 검증이 아니라는 점은 짚어 둘 필요가 있다.

병렬 실행은 `file-analyzer`에만 걸린다. 최대 5개가 동시에 실행되고 배치 하나가 20에서 30개 파일을 처리한다. 분석 시간의 대부분이 파일 단위 LLM 호출에서 나오기 때문에 병렬화 지점을 여기로 잡은 것이다.

### 세 가지 그래프 뷰

같은 파이프라인이 대상에 따라 다른 형태의 그래프를 만든다.

| 뷰 | 진입 명령 | 그래프의 내용 | 배치 방식 |
|---|---|---|---|
| 구조 그래프 | `/understand` | 파일, 함수, 클래스가 노드이고 의존 관계가 엣지다 | 아키텍처 레이어로 색을 구분한다 |
| 도메인 뷰 | `/understand-domain` | 코드가 business process에 어떻게 대응하는지를 domain, flow, step으로 담는다 | 수평 그래프 |
| 지식 베이스 그래프 | `/understand-knowledge` | Karpathy 패턴 LLM wiki의 문서와 그 사이 관계를 담는다 | community clustering이 적용된 force-directed 그래프 |

구조 그래프에서 노드를 클릭하면 자연어 요약, 관계, guided tour를 함께 본다. 코드를 읽지 않고도 그 노드가 무엇인지 파악하게 하는 것이 화면 구성의 목적이다.

세 뷰는 같은 코드베이스를 서로 다른 층위에서 본다. 구조 그래프는 코드가 코드를 어떻게 참조하는지를, 도메인 뷰는 코드가 어떤 업무를 구현하는지를 보여 준다. 지식 베이스 그래프만 대상이 코드가 아니라 문서다.

### 명령 여덟 가지

분석과 탐색은 슬래시 명령으로 나뉘어 있다.

| 명령 | 인자 | 효과 |
|---|---|---|
| `/understand` | `[path]`, `--language`, `--auto-update` | 프로젝트를 스캔해 knowledge graph를 만든다. 경로 인자로 하위 디렉터리만 범위로 좁힐 수 있다 |
| `/understand-dashboard` | 없음 | 대화형 웹 대시보드를 연다 |
| `/understand-chat` | 질문 문장 | 코드베이스에 관해 자유롭게 묻는다 |
| `/understand-diff` | 없음 | 현재 변경분이 시스템의 어디에 영향을 주는지 분석한다 |
| `/understand-explain` | 파일 또는 함수 경로 | 특정 파일이나 함수를 깊이 설명한다 |
| `/understand-onboard` | 없음 | 신규 팀원용 온보딩 가이드를 생성한다 |
| `/understand-domain` | 없음 | business domain, flow, step을 추출한다 |
| `/understand-knowledge` | wiki 디렉터리 경로 | Karpathy 패턴 LLM wiki를 분석한다 |

명령이 여덟 개로 나뉜 이유는 산출물과 소비 방식이 다르기 때문이다. `/understand`와 `/understand-domain`, `/understand-knowledge`는 그래프를 만드는 명령이고 나머지 다섯은 이미 만들어진 그래프를 읽는 명령이다. 그래프를 한 번 만들어 두면 질의, 영향 분석, 설명, 온보딩 문서 생성이 모두 같은 자료 위에서 이루어진다.

### 증분 분석

`/understand`는 처음 실행할 때만 전체를 분석한다. 이후로는 기본이 증분이며 변경된 파일만 다시 본다.

변경 여부를 판정하는 것은 tree-sitter의 fingerprint 기반 변경 감지다. 구조를 파싱한 결과가 판정 근거이므로, 파일을 열었다 저장하기만 한 경우와 실제로 함수가 바뀐 경우가 구분된다.

증분 분석이 중요한 이유는 비용 구조에 있다. 분석 비용의 대부분은 file-analyzer의 LLM 호출에서 나오고 그 호출량은 파일 수를 따라간다. 변경된 파일만 다시 보면 반복 실행 비용은 코드베이스 전체 크기가 아니라 변경 규모에 비례하게 된다.

갱신을 자동화하는 수단은 post-commit 훅이다. `/understand --auto-update`를 켜면 훅이 커밋마다 그래프를 증분으로 패치하므로 커밋과 그래프의 짝이 계속 맞는다.

### 대시보드 기능

대시보드는 그래프를 그리는 데서 멈추지 않고 여섯 가지 탐색 기능을 함께 제공한다.

| 기능 | 하는 일 |
|---|---|
| Guided Tours | 아키텍처 walkthrough를 의존 순서대로 자동 생성한다 |
| Fuzzy & Semantic Search | 이름으로도 의미로도 찾는다. "어느 부분이 인증을 담당하는가" 같은 질의가 그래프 전체에서 결과를 낸다 |
| Diff Impact Analysis | 커밋 전에 변경의 파급 범위를 확인한다 |
| Persona-Adaptive UI | 주니어 개발자, PM, 숙련 사용자 중 누가 보느냐에 따라 상세도를 조정한다 |
| Layer Visualization | API, Service, Data, UI, Utility 레이어로 자동 묶고 색으로 구분된 범례를 붙인다 |
| Language Concepts | generics, closure, decorator 등 12가지 프로그래밍 패턴을 등장 지점의 맥락에서 설명한다 |

여섯 기능은 두 묶음으로 나뉜다. Guided Tours, Persona-Adaptive UI, Language Concepts는 코드베이스를 처음 보는 사람을 돕고, Fuzzy & Semantic Search, Diff Impact Analysis, Layer Visualization은 이미 익숙한 사람이 특정 지점을 찾을 때 쓴다.

Persona-Adaptive UI와 Language Concepts는 이 도구가 지향하는 바를 특히 잘 드러낸다. 그래프를 보는 사람이 코드베이스에 익숙하지 않다는 전제 위에서 화면이 설계되었다. Language Concepts가 generics와 closure를 등장 지점에서 설명한다는 것은, 읽는 사람이 그 언어에 익숙하지 않을 수도 있다고 가정한다는 뜻이다.

### Karpathy 패턴 wiki 분석

`/understand-knowledge`의 처리도 결정론적 부분과 LLM 부분으로 나뉜다. 코드 분석에서 쓴 것과 같은 원칙이다.

| 단계 | 수행 주체 | 산출 |
|---|---|---|
| 추출 | 결정론적 파서 | wikilink와 `index.md`의 카테고리 |
| 보강 | LLM 에이전트 | 암묵적 관계 발견, entity 추출, claim 표면화 |
| 시각화 | 대시보드 | community clustering이 적용된 force-directed 그래프 |

문서 사이에 명시적으로 걸린 링크는 파서가 확정하고, 링크로 드러나지 않은 관계만 LLM이 찾는다. 링크가 이미 말해 주는 것을 LLM에 다시 묻지 않는다는 점에서 `importMap`을 미리 해석해 두는 처리와 같은 구조다.

코드 분석과 대비하면 대응이 분명해진다. 코드에서 import 문이 결정론적 신호였다면 wiki에서는 wikilink가 그 자리를 차지한다. 코드에서 LLM이 파일의 의도를 붙였다면 wiki에서는 문서 사이의 암묵적 관계와 entity, claim을 붙인다. 대상만 바뀌었을 뿐 결정론적 부분과 의미적 부분을 나누는 방식은 그대로다.

레이아웃이 달라지는 이유도 자료의 성질에서 나온다. 코드 그래프는 디렉터리와 의존 방향이라는 계층이 있지만 wiki 문서 사이에는 그런 계층이 없다. 그래서 force-directed 배치로 관계의 밀도가 위치를 정하게 하고, community clustering으로 촘촘히 연결된 문서 무리를 드러낸다.

README가 지목하는 분석 대상은 Karpathy가 공개한 LLM wiki 패턴이며 gist 주소 `karpathy/442a6bf555914893e9891c11519de94f`를 링크한다. 이 저장소의 `CLAUDE.md`가 같은 패턴의 출처로 밝힌 주소와는 표기가 갈린다.

### 설치와 플랫폼 확장

Claude Code는 플러그인 마켓플레이스로 설치한다.

```bash
/plugin marketplace add Egonex-AI/Understand-Anything
/plugin install understand-anything
```

다른 플랫폼은 설치 방식이 셋으로 갈린다.

| 방식 | 대상 플랫폼 |
|---|---|
| 플러그인 마켓플레이스 | Claude Code |
| 자동 탐지 | Cursor, VS Code + GitHub Copilot v1.108 이상 |
| 전용 플러그인 명령 | Copilot CLI |
| 설치 스크립트 | Codex, OpenCode, OpenClaw, Antigravity, Gemini CLI, Pi Agent, Vibe CLI, Hermes, Cline, KIMI CLI, Trae, Nanobot, Kiro |

설치 방식이 셋으로 갈리는 이유는 플랫폼마다 플러그인을 인식하는 방법이 다르기 때문이다. 자체 마켓플레이스를 갖춘 플랫폼은 그것을 쓰고, 저장소 안의 메타파일을 읽는 플랫폼은 자동 탐지로 붙으며, 둘 다 없는 플랫폼은 스크립트가 파일 시스템에 링크를 만들어 붙인다.

자동 탐지는 저장소에 들어 있는 플랫폼별 메타파일이 담당한다. Cursor는 `.cursor-plugin/plugin.json`, VS Code Copilot은 `.copilot-plugin/plugin.json`을 보고 저장소를 클론해 열기만 하면 플러그인을 인식한다. 인식되지 않을 때만 설정 화면에서 저장소 주소를 직접 추가한다.

설치 스크립트는 macOS와 Linux용 `install.sh`, Windows용 `install.ps1` 두 가지다. 스크립트는 저장소를 `~/.understand-anything/repo`에 클론하고 선택한 플랫폼에 맞는 심볼릭 링크를 만든다. 설치 후에는 CLI나 IDE를 다시 시작해야 한다. 플랫폼 인자로 받는 값은 `gemini`, `codex`, `opencode`, `pi`, `openclaw`, `antigravity`, `vibe`, `vscode`, `hermes`, `cline`, `kimi`, `trae`, `nanobot`, `kiro` 14종이며, 갱신은 `--update`, 제거는 `--uninstall <platform>`으로 한다.

Kiro는 설치 결과가 조금 다르다. 스킬이 `~/.kiro/skills/`로 링크되고 `understand` 에이전트가 `~/.kiro/agents/understand.json`에 기록되어 CLI와 IDE 양쪽에서 쓸 수 있다.

### 출력 언어

`--language` 플래그가 지원하는 값은 `en`(기본), `zh`, `zh-TW`, `ja`, `ko`, `ru` 6종이다.

프로젝트에서 처음 실행할 때 플래그를 주지 않았고 저장된 언어도 없으면, `/understand`가 사용자가 대화에 쓰는 언어를 감지한다. 영어가 아니면 생성 전에 확인이나 변경을 요청하고, 영어 대화는 이 절차를 거치지 않는다. 선택한 언어는 `.understand-anything/config.json`에 저장되어 이후 실행에서 재사용된다.

플래그가 영향을 주는 범위는 세 가지다.

- knowledge graph의 노드 요약과 설명
- 대시보드 UI의 라벨, 버튼, 툴팁
- guided tour의 설명문

### 그래프를 팀에 공유하는 방법

그래프가 JSON 파일이라는 점이 공유 방식을 결정한다. 한 번 커밋해 두면 동료는 파이프라인을 실행하지 않아도 된다. README는 이 방식을 온보딩, PR 리뷰, docs-as-code 용도로 권장한다.

커밋 대상은 `.understand-anything/` 전체이되 두 항목만 제외한다. `intermediate/`와 `diff-overlay.json`은 로컬 임시 파일이다.

```gitignore
.understand-anything/intermediate/
.understand-anything/diff-overlay.json
```

그래프를 코드와 맞춰 두는 방법은 두 가지다. `/understand --auto-update`를 켜면 post-commit 훅이 그래프를 증분으로 패치해 커밋마다 짝이 맞는 그래프가 함께 남는다. 켜지 않으면 릴리스 전에 `/understand`를 수동으로 다시 실행한다.

10MB를 넘는 큰 그래프는 git-lfs로 추적한다.

```bash
git lfs install
git lfs track ".understand-anything/*.json"
git add .gitattributes .understand-anything/
```

README가 드는 예시는 `GoogleCloudPlatform/microservices-demo`다. Go, Java, Python, Node로 구성된 참조 저장소이며 그래프가 커밋되어 있다. 여러 언어가 섞인 저장소에서도 하나의 그래프가 만들어진다는 것을 보이는 사례다.

## 결과

이 저장소는 정량 벤치마크를 제공하지 않는다. 그래프 품질, 재현율, 엣지 정확도를 측정한 수치가 README에 없고 다른 코드 이해 도구와 비교한 표도 없다. 확인 가능한 것은 정성적 신호뿐이다.

| 신호 | 내용 |
|---|---|
| 플랫폼 호환성 | 호환성 표에 17개 플랫폼이 지원 상태로 등재 |
| 다국어 | README 번역 7종, 출력 언어 6종 |
| 외부 등록 | Trendshift `repositories/23482` |
| 커뮤니티 | Better Stack 채널의 walkthrough 영상 |
| 참조 데이터 | `GoogleCloudPlatform/microservices-demo`의 커밋된 그래프, `understand-anything.com/demo/`의 라이브 데모 |

성능에 관해 README가 제시하는 수치는 병렬성 하나다. file-analyzer가 최대 5개 동시에 실행되고 배치당 20에서 30개 파일을 처리한다. 실행 시간이나 토큰 비용의 실측값은 없다.

이 신호들은 채택 규모와 이식 범위를 보여 주지만 그래프의 품질은 보여 주지 않는다. 17개 플랫폼에 설치된다는 사실과 추출한 엣지가 옳다는 사실은 별개다. 도입을 검토한다면 자신의 코드베이스에 직접 실행해 결과를 확인하는 절차가 필요하다.

라이선스는 MIT이며 README 말미의 표기는 Yuxiang Lin과 Infinite Universe, Inc.를 저작권자로 든다. 기여 절차는 fork 후 feature 브랜치를 만들고 `pnpm --filter @understand-anything/core test`로 테스트를 실행한 뒤 pull request를 여는 방식이다. 큰 변경은 issue를 먼저 열도록 요구한다.

## 인접 도구와의 차이

이 저장소에는 코드베이스나 문서 폴더를 읽어 그래프로 만드는 도구가 여럿 있다. 문제 영역이 겹치므로 무엇이 다른지를 정리해 둔다.

| 도구 | 입력 | 산출물의 소비자 | 구분되는 점 |
|---|---|---|---|
| Understand Anything | 코드베이스, Karpathy 패턴 wiki | 사람 (웹 대시보드) | 학습 순서를 정해 주는 guided tour와 페르소나별 상세도 조정까지 포함한다. 17개 플랫폼에 설치 경로를 둔다 |
| [[applications/colbymchenry-codegraph]] | 코드베이스 | 코딩 에이전트 (MCP 서버) | 그래프를 SQLite에 저장하고 MCP 도구로 노출한다. 사람이 보는 화면이 아니라 에이전트의 조회 대상이다 |
| [[applications/wlsdks-ontology-atlas]] | 사람이 쓴 Markdown | 사람과 에이전트 양쪽 | 그래프의 원본이 분석 산출물이 아니라 사람이 손으로 쓰고 리뷰하는 폴더다 |
| [[applications/safishamsi-graphify]] | 코드, 문서, PDF, 이미지 | 사람 (출력 폴더) | 코드 외 자료까지 한 그래프에 담고, 엣지마다 추출과 추론과 모호를 구분해 표시한다 |

구분의 핵심은 두 가지다. 첫째, 그래프를 누가 읽느냐다. Understand Anything과 graphify는 사람이 읽는 산출물을 만들고 CodeGraph는 에이전트가 조회하는 저장소를 만든다. 둘째, 그래프의 원본이 무엇이냐다. Ontology Atlas는 사람이 쓴 문서가 원본이고 나머지 셋은 분석 파이프라인의 출력이 원본이다.

구분의 세 번째 기준은 입력의 범위다. Understand Anything과 CodeGraph는 코드를 중심에 두고, graphify는 PDF와 이미지까지 한 그래프에 담으며, Ontology Atlas는 코드가 아니라 코드에 관해 사람이 쓴 문서를 다룬다. 같은 knowledge graph라는 말을 써도 무엇을 노드로 삼느냐가 다르다.

Understand Anything이 이 넷 중에서 유일하게 갖춘 것은 학습 순서에 대한 관심이다. guided tour와 페르소나별 상세도 조정은 그래프를 조회 대상이 아니라 교재로 다루겠다는 선택이다. 나머지 셋은 필요한 것을 찾아 주는 데 초점을 두지만 무엇부터 봐야 하는지는 사용자에게 맡긴다.

설치 경로의 폭도 이 도구 쪽이 넓다. 17개 플랫폼에 붙는 대신 저장소가 플랫폼별 메타파일과 설치 스크립트를 함께 유지해야 하므로, 그만큼 유지 비용을 지불하는 구조다.

## 이 wiki에 적용할 때

이 저장소는 `/understand-knowledge`의 입력 조건을 그대로 만족한다. 파서가 읽는 것은 wikilink와 `index.md`의 카테고리 두 가지이며, 두 신호가 모두 존재한다.

| 파서가 읽는 것 | 이 저장소의 대응 |
|---|---|
| wikilink | `## 관련 페이지` 절의 `[[category/stem]]` 링크. 모든 wiki 페이지가 이 절을 갖는다 |
| `index.md`의 카테고리 | `index.md`가 카테고리별로 나눈 절과 그 아래 페이지 목록 |

따라서 별도 변환 없이 분석 대상이 된다. 다만 `raw/`와 `sources/`를 어떻게 취급할지는 README가 말하지 않는다. 이 저장소가 유지하는 세 계층 가운데 파서가 명시적으로 다룬다고 밝힌 것은 wiki 계층뿐이다.

기대할 수 있는 산출물은 두 가지다.

첫째는 wikilink 그래프의 시각화다. `## 관련 페이지`가 만든 연결이 화면에서 한눈에 보이므로 링크가 한쪽으로만 걸린 페이지나 아무 데도 연결되지 않은 페이지를 찾을 수 있다. 지금은 각 페이지를 열어야 확인되는 정보다.

둘째는 community clustering이 만드는 묶음이다. 내용을 근거로 묶인 결과가 `wiki/` 아래 카테고리 구분과 다르게 나오면, `CLAUDE.md`가 정한 방법 기준 분류를 다시 검토할 근거가 된다. 분류가 옳은지를 사람의 판단이 아니라 자료로 확인하는 경로다.

확인할 수 없는 것도 분명하다. LLM 에이전트가 어떤 종류의 관계를 몇 개나 만드는지, 추출한 claim을 어떤 형태로 남기는지는 README가 밝히지 않는다. 실행해 보기 전에는 산출물의 밀도를 예측할 수 없다.

## 한계

이 절의 첫 항목은 자료 자체의 제약이고 나머지는 도구의 제약이다. 둘을 구분해 읽어야 한다.

- **raw가 README 스텁이라 내부 구현 세부는 확인 불가.** 이 wiki가 보유한 자료는 README 한 편이다. 저장소 전체 클론은 2026-06-17 커밋에서 README 스텁으로 대체되었다. 그래서 파이프라인의 내부 단계 구성, knowledge graph 스키마의 노드와 엣지 타입 정의, 파서 구현, 대시보드 기술 스택, 버전 이력은 이 자료로 검증할 수 없다. 해당 내용이 필요하면 저장소 원본을 다시 수집해야 한다.
- **벤치마크 부재.** 그래프 품질을 정량 측정한 결과가 없다. `graph-reviewer`가 검증하는 대상도 완전성과 참조 무결성이라는 내적 일관성이며, 추출된 관계가 실제로 맞는지를 외부 기준으로 재는 것이 아니다.
- **LLM 비용이 코드베이스 크기에 비례.** file-analyzer 배치마다 LLM 호출이 발생한다. 최대 5개 동시 실행으로 소요 시간은 줄지만 호출 총량은 파일 수를 따라간다. README가 제시하는 완화책은 `/understand src/frontend`처럼 경로 인자로 범위를 좁히는 것이다.
- **Claude Code 중심 설계.** 17개 플랫폼 호환을 표방하지만 플러그인, 스킬, 에이전트 dispatch라는 개념 자체가 Claude Code 생태계에서 왔다. 다른 플랫폼은 설치 스크립트가 심볼릭 링크로 붙이는 방식이며, 병렬 실행이나 재시도 같은 dispatch 의미론이 플랫폼마다 같게 동작하는지는 README가 다루지 않는다.
- **번역 언어와 출력 언어의 불일치.** README 번역은 es-ES와 tr-TR을 포함해 7종인데 `--language`가 받는 값에는 `es`와 `tr`이 없다. 스페인어와 터키어 사용자는 문서는 모국어로 읽지만 그래프 출력은 그렇게 받을 수 없다.
- **에이전트 개수 서술의 내적 불일치.** README 본문은 `/understand`가 5개를 조율하고 `/understand-domain`이 여섯 번째를 더한다고 적는데, 바로 아래 표는 `article-analyzer`를 포함해 7행이다.
- **대시보드 호스팅 가이드 부재.** 그래프를 팀에 커밋하는 공유 패턴을 권장하면서도, 커밋된 그래프로 대시보드를 어디에 어떻게 띄울지는 README가 설명하지 않는다.
- **그래프 최신성 유지가 운영자 책임.** `--auto-update`를 켜지 않으면 그래프와 코드가 어긋난 채 남는다. README도 릴리스 전 수동 재실행을 대안으로 제시할 뿐, 어긋남을 감지하는 수단은 언급하지 않는다.
- **저장소 주소의 이원화.** README의 설치 명령과 라이선스 링크는 `Egonex-AI/Understand-Anything`를 가리키는데 이 wiki의 stem과 frontmatter는 이전 주소인 `Lum1104/Understand-Anything`을 기록한다. README는 프로젝트를 Egonex의 오픈소스로 소개하고 원저자를 Lum1104로 밝힌다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| knowledge graph | 파일, 함수, 클래스를 노드로, 의존 관계를 엣지로 담은 산출물. `.understand-anything/knowledge-graph.json` 한 파일에 저장되어 git에 커밋할 수 있다 |
| importMap | 스캔 단계에서 tree-sitter가 미리 해석해 둔 import 관계. file-analyzer에 함께 전달되어 LLM이 import를 다시 유도하지 않게 한다 |
| guided tour | 의존 순서로 정렬된 아키텍처 walkthrough. `tour-builder`가 자동 생성하며 코드베이스를 읽을 순서를 제시한다 |
| fingerprint 기반 변경 감지 | tree-sitter가 담당하는 증분 갱신의 근거. `/understand`를 다시 실행해도 변경된 파일만 재분석하게 한다 |
| persona-adaptive UI | 주니어 개발자, PM, 숙련 사용자라는 페르소나에 맞춰 대시보드가 정보 밀도를 조정하는 방식 |
| `.understand-anything/` | 산출물 디렉터리. `knowledge-graph.json`과 `config.json`이 여기 남고 `intermediate/`와 `diff-overlay.json`은 커밋에서 제외한다 |

## 관련 페이지

- [[applications/colbymchenry-codegraph]]: tree-sitter로 코드를 파싱해 그래프를 만드는 같은 계열. 산출물을 사람이 보는 대시보드가 아니라 MCP 서버로 노출한다
- [[applications/wlsdks-ontology-atlas]]: 코드베이스의 경계와 영향 범위를 다루는 같은 문제 영역. 그래프의 원본이 사람이 쓰고 리뷰하는 Markdown 폴더다
- [[applications/safishamsi-graphify]]: 지정한 폴더를 하나의 knowledge graph로 만드는 스킬. 코드 외에 문서와 PDF, 이미지까지 함께 다룬다
- [[applications/garrytan-gbrain]]: Markdown을 원본으로 삼고 git에 커밋해 공유하는 철학이 겹친다. gbrain은 에이전트의 메모리를 다룬다
- [[applications/liu-2026-rag-llm-wiki-or-gbrain]]: retrieve, compile, act 세 가지로 나눈 분류에서 `/understand-knowledge`는 compile에 해당한다
- [[database/vectifyai-pageindex]]: 임베딩 없이 구조로 검색하는 접근이 겹친다. PageIndex는 문서의 계층 트리를 구조로 삼는다
- [[database/hkuds-rag-anything]]: 파서로 뽑고 LLM으로 보강하는 구성이 같다. 대상이 멀티모달 문서라는 점이 다르다
- [[agents/lee-hoyeon-2026-harness-engineering]]: 생성과 평가를 분리하는 구성이 겹친다. `--review` 플래그가 검증을 별도 LLM 에이전트로 올리는 선택지다
- [[agents/dennis-2026-compiling-agentic-workflows-into-llm]]: Understand Anything은 프롬프트 단에서 에이전트를 조율하는 쪽에 속한다. 에이전트 동작을 모델 가중치로 컴파일하는 접근과 대비된다
