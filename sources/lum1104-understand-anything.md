---
title: "Lum1104/Understand-Anything"
type: repo
year: 2026
category: applications
raw_path: raw/repos/lum1104-understand-anything.md
raw_filename: "lum1104-understand-anything.md"
source_collection: external
tags: [code-understanding, knowledge-graph, multi-agent-pipeline, tree-sitter, llm-hybrid, claude-code-plugin, karpathy-llm-wiki, dashboard, incremental-analysis, multi-platform]
org: "Lum1104"
repo: "Understand-Anything"
url: "https://github.com/Lum1104/Understand-Anything"
license: "MIT"
---

## 한 줄 요약 (One-line Summary)

Understand Anything은 코드베이스나 문서 모음을 멀티에이전트 파이프라인으로 분석해 파일, 함수, 클래스, 의존 관계를 담은 knowledge graph를 만들고 이를 대화형 대시보드로 탐색하게 해주는 MIT 라이선스 플러그인이다. tree-sitter가 구조적 사실을 결정론적으로 뽑고 LLM이 자연어 설명과 의미 정보를 붙이는 역할 분담이 핵심 설계이며, Claude Code를 기준으로 만들어져 17개 AI 코딩 플랫폼으로 설치 경로를 넓혔다.

## 1. 자료 정보 (Document Information)

- **저장소**: README의 설치 명령과 라이선스 링크는 모두 `Egonex-AI/Understand-Anything`를 가리킨다. README는 이 프로젝트를 "Egonex의 오픈소스 프로젝트"로 소개하고 원저자를 Lum1104로 밝힌다. 이 wiki의 stem과 raw frontmatter `url`은 이전 주소인 `Lum1104/Understand-Anything`을 기록하고 있다.
- **라이선스**: MIT. README 말미의 표기는 "MIT License, Yuxiang Lin and Infinite Universe, Inc."다.
- **공식 채널**: 홈페이지 `understand-anything.com`, 라이브 데모 `understand-anything.com/demo/`, 자매 프로젝트 `egonex.ai`
- **다국어 README**: 영어 본문에 더해 `READMEs/` 아래 zh-CN, zh-TW, ja-JP, ko-KR, es-ES, tr-TR, ru-RU 7종
- **외부 노출**: Trendshift 등록(`repositories/23482`), Better Stack 채널의 커뮤니티 walkthrough 영상(YouTube `VmIUXVlt7_I`)
- **기여 절차**: fork 후 feature 브랜치를 만들고 `pnpm --filter @understand-anything/core test`로 테스트를 실행한 뒤 pull request를 연다. 큰 변경은 issue를 먼저 열어 접근 방식을 논의하도록 요구한다.
- **자료 형태의 제약**: 이 wiki가 보유한 raw는 README 한 편이다. 저장소 전체 클론은 2026-06-17 커밋 `0507ad0`에서 README 스텁으로 대체되었다. 따라서 버전 번호, 내부 소스 파일 구성, 스키마 정의, issue 번호처럼 README 바깥에 있던 정보는 이 자료로 확인할 수 없다.

## 2. 주요 기여 (Key Contributions)

1. **온보딩 문제를 knowledge graph로 다룬 오픈소스 도구.** README는 "새 팀에 합류했는데 코드베이스가 20만 줄이면 어디서 시작하는가"를 출발점으로 삼는다. 목표를 코드베이스가 얼마나 복잡한지 과시하는 그래프가 아니라 각 조각이 어떻게 맞물리는지 조용히 가르치는 그래프로 규정한다. 단순 시각화에 그치지 않고 학습 순서(guided tour), 아키텍처 레이어, business domain까지 함께 추출한다.

2. **tree-sitter와 LLM의 역할 분리를 설계 원칙으로 명문화.** README의 "Under the Hood" 절이 두 수단이 각자 잘하는 일을 나눈다고 설명한다. tree-sitter는 소스를 concrete syntax tree로 파싱해 import, export, 함수와 클래스 정의, 호출 지점, 상속 같은 구조적 사실을 뽑는다. 이 결과는 스캔 단계에서 `importMap`으로 미리 해석되어 file-analyzer에 전달되므로 file-analyzer가 import를 소스에서 다시 유도하지 않는다. LLM은 파서가 만들 수 없는 것을 담당한다. 자연어 요약, 태그, 아키텍처 레이어 배정, business domain 매핑, guided tour, 언어 개념 설명이 그것이다.

3. **구조 쪽 재현성과 의미 쪽 표현력의 동시 확보.** README는 이 분리 덕분에 같은 코드가 항상 같은 엣지를 만들고, 동시에 파일이 무엇을 위한 것인지라는 의도까지 담긴다고 설명한다.

4. **역할이 나뉜 에이전트 조합.** `/understand` 명령이 5개 전문 에이전트를 오케스트레이션하고 `/understand-domain`이 여섯 번째를 추가한다고 README가 밝힌다.

5. **그래프를 JSON 산출물로 보고 팀에 공유하는 패턴.** 그래프는 JSON 파일일 뿐이므로 한 번 커밋해 두면 동료는 파이프라인을 실행하지 않아도 된다. README는 이 방식을 온보딩, PR 리뷰, docs-as-code 용도로 권장한다.

6. **증분 분석 기본값.** `/understand`는 다시 실행해도 기본이 증분이며 변경된 파일만 재분석한다. tree-sitter가 fingerprint 기반 변경 감지도 함께 담당한다.

7. **Karpathy 패턴 LLM wiki 전용 분석 경로.** `/understand-knowledge`를 Karpathy 패턴 LLM wiki(`karpathy/442a6bf555914893e9891c11519de94f` gist)를 대상으로 지정하면 community clustering이 적용된 force-directed knowledge graph를 얻는다. 결정론적 파서가 wikilink와 `index.md`의 카테고리를 추출하고, 이어서 LLM 에이전트가 암묵적 관계를 찾아내고 entity를 뽑고 claim을 드러낸다. 이 ai-wiki 저장소가 정확히 이 형태의 자료다.

8. **하나의 코드베이스로 17개 플랫폼 지원.** Claude Code는 플러그인 마켓플레이스로, Cursor와 VS Code Copilot은 자동 탐지로, 나머지는 설치 스크립트가 만드는 심볼릭 링크로 붙는다.

9. **출력 언어의 다국어화.** `--language` 플래그가 knowledge graph의 노드 설명, 대시보드 UI 문자열, guided tour 설명을 지정 언어로 생성한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 세 가지 그래프 뷰

README의 Features 절은 산출물을 세 가지 뷰로 제시한다.

| 뷰 | 진입점 | 내용 |
|---|---|---|
| 구조 그래프 | `/understand` 후 대시보드 | 파일, 함수, 클래스가 각각 노드다. 노드를 클릭하면 자연어 요약, 관계, guided tour를 본다 |
| 도메인 뷰 | `/understand-domain` | 코드가 실제 business process에 어떻게 대응하는지를 domain, flow, step으로 수평 그래프에 배치한다 |
| 지식 베이스 그래프 | `/understand-knowledge` | Karpathy 패턴 LLM wiki를 community clustering이 적용된 force-directed 그래프로 만든다 |

### 3.2 대시보드 기능 여섯 가지

| 기능 | 설명 |
|---|---|
| Guided Tours | 아키텍처 walkthrough를 의존 순서대로 자동 생성한다. 코드베이스를 올바른 순서로 익히게 하는 것이 목적이다 |
| Fuzzy & Semantic Search | 이름으로도 의미로도 찾는다. "어느 부분이 인증을 담당하는가" 같은 질의가 그래프 전체에서 결과를 낸다 |
| Diff Impact Analysis | 커밋 전에 변경이 시스템의 어느 부분에 영향을 주는지 본다 |
| Persona-Adaptive UI | 주니어 개발자, PM, 숙련 사용자 중 누가 보느냐에 따라 대시보드가 상세도를 조정한다 |
| Layer Visualization | API, Service, Data, UI, Utility 레이어로 자동 묶고 색으로 구분된 범례를 붙인다 |
| Language Concepts | generics, closure, decorator 등 12가지 프로그래밍 패턴을 등장 지점의 맥락에서 설명한다 |

### 3.3 명령 여덟 가지

| 명령 | 인자 | 효과 |
|---|---|---|
| `/understand` | `[path]`, `--language`, `--auto-update` | 프로젝트를 스캔해 `.understand-anything/knowledge-graph.json`을 만든다. 경로 인자로 하위 디렉터리만 범위로 잡을 수 있다 |
| `/understand-dashboard` | 없음 | 대화형 웹 대시보드를 연다 |
| `/understand-chat` | 질문 문장 | 코드베이스에 관해 자유롭게 묻는다 |
| `/understand-diff` | 없음 | 현재 변경분의 영향 범위를 분석한다 |
| `/understand-explain` | 파일 또는 함수 경로 | 특정 파일이나 함수를 깊이 설명한다 |
| `/understand-onboard` | 없음 | 신규 팀원용 온보딩 가이드를 생성한다 |
| `/understand-domain` | 없음 | business domain, flow, step을 추출한다 |
| `/understand-knowledge` | wiki 디렉터리 경로 | Karpathy 패턴 LLM wiki를 분석한다 |

### 3.4 에이전트 구성

README의 표는 에이전트 7종의 역할을 정의한다.

| 에이전트 | 역할 |
|---|---|
| `project-scanner` | 파일을 찾아내고 언어와 프레임워크를 식별한다 |
| `file-analyzer` | 함수, 클래스, import를 추출해 그래프의 노드와 엣지를 만든다 |
| `architecture-analyzer` | 아키텍처 레이어를 식별한다 |
| `tour-builder` | guided learning tour를 생성한다 |
| `graph-reviewer` | 그래프의 완전성과 참조 무결성을 검증한다. 기본은 inline 실행이고 `--review`를 주면 LLM 전체 리뷰를 수행한다 |
| `domain-analyzer` | business domain, flow, process step을 추출한다. `/understand-domain`이 사용한다 |
| `article-analyzer` | wiki article에서 entity, claim, 암묵적 관계를 추출한다. `/understand-knowledge`가 사용한다 |

병렬성은 file-analyzer에 걸린다. 최대 5개가 동시에 실행되고 배치당 20에서 30개 파일을 처리한다.

에이전트 수 서술에는 내적 불일치가 있다. 본문은 `/understand`가 5개를 오케스트레이션하고 `/understand-domain`이 여섯 번째를 더한다고 적지만, 바로 아래 표는 `article-analyzer`를 포함해 7행이다.

### 3.5 설치 경로

Claude Code는 플러그인 마켓플레이스를 쓴다.

```bash
/plugin marketplace add Egonex-AI/Understand-Anything
/plugin install understand-anything
```

나머지 플랫폼은 한 줄 설치 스크립트를 쓴다. macOS와 Linux는 `install.sh`, Windows는 `install.ps1`이다. 스크립트는 저장소를 `~/.understand-anything/repo`에 클론하고 선택한 플랫폼에 맞는 심볼릭 링크를 만든다. 설치 후에는 CLI나 IDE를 다시 시작해야 한다.

플랫폼 인자로 받는 값은 `gemini`, `codex`, `opencode`, `pi`, `openclaw`, `antigravity`, `vibe`, `vscode`, `hermes`, `cline`, `kimi`, `trae`, `nanobot`, `kiro` 14종이다. 갱신은 `./install.sh --update`, 제거는 `./install.sh --uninstall <platform>`이다.

플랫폼별로 설치 방식이 다르다.

| 방식 | 대상 |
|---|---|
| 플러그인 마켓플레이스 | Claude Code |
| 자동 탐지 | Cursor(`.cursor-plugin/plugin.json`), VS Code + GitHub Copilot v1.108 이상(`.copilot-plugin/plugin.json`) |
| 전용 플러그인 명령 | Copilot CLI(`copilot plugin install Egonex-AI/Understand-Anything:understand-anything-plugin`) |
| 설치 스크립트 | Codex, OpenCode, OpenClaw, Antigravity, Gemini CLI, Pi Agent, Vibe CLI, Hermes, Cline, KIMI CLI, Trae, Nanobot, Kiro |

호환성 표에는 17개 플랫폼이 모두 지원 상태로 올라 있다. Cursor는 저장소를 클론해 열기만 하면 자동으로 인식하고, 인식되지 않을 때만 설정 화면에서 저장소 주소를 직접 추가한다. Kiro는 설치 후 스킬이 `~/.kiro/skills/`로 링크되고 `understand` 에이전트가 `~/.kiro/agents/understand.json`에 기록되어 CLI와 IDE 양쪽에서 쓸 수 있다.

### 3.6 출력 언어 처리

`--language` 플래그가 지원하는 값은 `en`(기본), `zh`, `zh-TW`, `ja`, `ko`, `ru` 6종이다.

프로젝트에서 처음 실행할 때 `--language`를 주지 않았고 저장된 언어도 없으면, `/understand`가 사용자가 대화에 쓰는 언어를 감지한다. 영어가 아니면 생성 전에 확인이나 변경을 요청하고, 영어 대화는 영향을 받지 않는다. 선택은 `.understand-anything/config.json`에 저장되어 이후 실행에서 재사용된다.

플래그가 영향을 주는 범위는 세 가지다.

- knowledge graph의 노드 요약과 설명
- 대시보드 UI의 라벨, 버튼, 툴팁
- guided tour의 설명문

### 3.7 팀 공유와 산출물 관리

`.understand-anything/` 아래 산출물 가운데 `intermediate/`와 `diff-overlay.json`은 로컬 임시 파일이라 커밋 대상에서 제외한다. 나머지는 커밋한다.

```gitignore
.understand-anything/intermediate/
.understand-anything/diff-overlay.json
```

그래프를 최신 상태로 유지하는 방법은 두 가지다. `/understand --auto-update`를 켜면 post-commit 훅이 그래프를 증분으로 패치해 커밋마다 짝이 맞는 그래프가 함께 남는다. 그렇지 않으면 릴리스 전에 `/understand`를 수동으로 다시 실행한다.

10MB를 넘는 큰 그래프는 git-lfs로 추적한다.

```bash
git lfs install
git lfs track ".understand-anything/*.json"
git add .gitattributes .understand-anything/
```

README가 예시로 드는 저장소는 `GoogleCloudPlatform/microservices-demo`다. Go, Java, Python, Node로 구성된 참조 저장소이며 그래프가 커밋되어 있다.

### 3.8 Karpathy 패턴 wiki 분석의 분업 구조

`/understand-knowledge`의 처리는 결정론적 부분과 LLM 부분으로 나뉜다.

| 단계 | 수행 주체 | 산출 |
|---|---|---|
| 추출 | 결정론적 파서 | wikilink, `index.md`의 카테고리 |
| 보강 | LLM 에이전트 | 암묵적 관계 발견, entity 추출, claim 표면화 |
| 시각화 | 대시보드 | community clustering이 적용된 force-directed 그래프 |

README가 밝힌 분업은 여기까지다. 파서의 구현 방식, 엣지 타입의 종류와 개수, 배치 크기 같은 세부는 이 자료에 없다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 저장소는 정량 벤치마크를 제공하지 않는다. README에는 그래프 품질, 재현율, 엣지 정확도를 측정한 수치도 없고 다른 코드 이해 도구와 비교한 표도 없다. 확인 가능한 신호는 정성적인 것뿐이다.

| 신호 | 내용 |
|---|---|
| 플랫폼 호환성 | 호환성 표에 17개 플랫폼이 지원 상태로 등재 |
| 다국어 | README 번역 7종, 출력 언어 6종 |
| 외부 등록 | Trendshift `repositories/23482` |
| 커뮤니티 | Better Stack 채널의 walkthrough 영상 |
| 참조 데이터 | `GoogleCloudPlatform/microservices-demo`의 커밋된 그래프, `understand-anything.com/demo/`의 라이브 데모 |

README가 제시하는 성능 관련 서술은 병렬성 수치 하나다. file-analyzer가 최대 5개 동시에 실행되고 배치당 20에서 30개 파일을 처리한다는 것이다. 실행 시간이나 토큰 비용의 실측값은 없다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **raw가 README 스텁이라 내부 구현 세부는 확인 불가.** 이 wiki가 보유한 자료는 README 한 편이다. 파이프라인의 내부 단계 구성, knowledge graph 스키마의 노드와 엣지 타입 정의, 파서 구현, 대시보드 기술 스택, 버전 이력, issue 대응 내역은 이 자료로 검증할 수 없다. 해당 주장이 필요하면 저장소 원본을 다시 수집해야 한다.
- **벤치마크 부재.** 그래프 품질을 정량 측정한 결과가 없다. `graph-reviewer`가 검증하는 대상도 완전성과 참조 무결성이라는 내적 일관성이며, 추출된 관계가 실제로 맞는지를 외부 기준으로 재는 것이 아니다.
- **LLM 비용이 코드베이스 크기에 비례.** file-analyzer 배치마다 LLM 호출이 발생한다. 최대 5개 동시 실행으로 시간은 줄지만 호출 총량은 파일 수를 따라간다. README가 제시하는 완화책은 `/understand src/frontend`처럼 경로 인자로 범위를 좁히는 것이다.
- **Claude Code 중심 설계.** 17개 플랫폼 호환을 표방하지만 플러그인, 스킬, 에이전트 dispatch라는 개념 자체가 Claude Code 생태계에서 왔다. 다른 플랫폼은 설치 스크립트가 심볼릭 링크로 붙이는 방식이며, 병렬 실행이나 재시도 같은 dispatch 의미론이 플랫폼마다 같게 동작하는지는 README가 다루지 않는다.
- **번역 언어와 출력 언어의 불일치.** README 번역은 es-ES와 tr-TR을 포함해 7종인데 `--language`가 받는 값에는 `es`와 `tr`이 없다. 스페인어와 터키어 사용자는 문서는 모국어로 읽지만 그래프 출력은 그렇게 받을 수 없다.
- **에이전트 개수 서술의 내적 불일치.** 본문은 5개에 여섯 번째를 더한다고 적고 표는 7행을 싣는다. `article-analyzer`가 본문 계산에서 빠져 있다.
- **대시보드 호스팅 가이드 부재.** 그래프를 팀에 커밋하는 공유 패턴을 권장하면서도, 커밋된 그래프로 대시보드를 어디에 어떻게 띄울지는 README가 설명하지 않는다.
- **그래프 최신성 유지가 운영자 책임.** `--auto-update`를 켜지 않으면 그래프와 코드가 어긋난 상태로 남는다. README도 릴리스 전 수동 재실행을 대안으로 제시할 뿐 어긋남을 감지하는 수단은 언급하지 않는다.
- **저장소 주소의 이원화.** README의 명령은 `Egonex-AI/Understand-Anything`를 쓰는데 이 wiki의 stem과 raw frontmatter는 `Lum1104/Understand-Anything`을 기록한다. 이전 주소로 접근하는 이용자가 어떤 경로로 안내되는지는 이 자료로 확인할 수 없다.

## 6. 관련 연구 (Related Work)

### 이 wiki 내부 연결

- **[[applications/colbymchenry-codegraph]]**: tree-sitter로 코드를 파싱해 그래프를 만드는 같은 계열이다. CodeGraph는 산출물을 MCP 서버로 에이전트에게 노출하고, Understand Anything은 사람이 보는 대시보드로 노출한다.
- **[[applications/wlsdks-ontology-atlas]]**: 코드베이스의 경계와 영향 범위를 다루는 같은 문제 영역이다. Atlas는 사람이 쓰고 리뷰하는 Markdown 폴더가 원본이고, Understand Anything은 분석 파이프라인의 산출물이 원본이다.
- **[[applications/safishamsi-graphify]]**: 지정한 폴더를 읽어 하나의 knowledge graph로 만드는 스킬이다. graphify는 코드와 문서, PDF, 이미지를 함께 다루고 엣지마다 추출과 추론을 구분해 표시한다.
- **[[applications/garrytan-gbrain]]**: Markdown을 원본으로 삼고 git에 커밋해 공유하는 철학이 겹친다. gbrain은 에이전트의 메모리를 다루고 Understand Anything은 코드와 지식의 시각화를 다룬다.
- **[[applications/liu-2026-rag-llm-wiki-or-gbrain]]**: retrieve, compile, act 세 가지로 나눈 분류에서 `/understand-knowledge`는 compile에 해당한다. wiki를 컴파일된 산출물로 보는 관점의 구현 사례다.
- **[[database/vectifyai-pageindex]]**: 임베딩 없이 구조로 검색하는 접근이 겹친다. PageIndex는 문서의 계층 트리를, Understand Anything은 코드의 knowledge graph를 구조로 삼는다.
- **[[database/hkuds-rag-anything]]**: 파서로 뽑고 LLM으로 보강하는 구성이 같다. RAG-Anything은 멀티모달 문서를, Understand Anything은 코드베이스와 wiki를 대상으로 한다.
- **[[agents/lee-hoyeon-2026-harness-engineering]]**: 생성과 평가를 분리하는 구성이 겹친다. `--review` 플래그가 검증을 별도 LLM 에이전트로 올리는 선택지다.
- **[[agents/dennis-2026-compiling-agentic-workflows-into-llm]]**: Understand Anything은 프롬프트 단에서 에이전트를 조율하는 쪽에 속한다. 에이전트 동작을 모델 가중치로 컴파일하는 접근과 대비된다.

### 외부 참조 (이 wiki 미수록)

- **Karpathy 패턴 LLM wiki**: README가 `/understand-knowledge`의 대상으로 지목하며 gist `karpathy/442a6bf555914893e9891c11519de94f`를 링크한다. 이 저장소의 `CLAUDE.md`가 같은 패턴의 출처로 밝힌 주소와는 표기가 갈린다.
- **tree-sitter**: 구조 추출에 쓰는 파서 생성기다. README는 사용 사실만 밝히고 언어 지원 범위는 적지 않는다.
- **GoogleCloudPlatform/microservices-demo**: 그래프가 커밋된 참조 저장소로 README가 인용한다.

## 7. 용어집 (Glossary)

- **knowledge graph**: `/understand`의 산출물이다. 파일, 함수, 클래스, 의존 관계를 노드와 엣지로 담아 `.understand-anything/knowledge-graph.json` 한 파일에 저장한다. JSON 파일이라 git에 커밋하면 동료가 파이프라인을 실행하지 않고 대시보드만 열면 된다.
- **importMap**: 스캔 단계에서 tree-sitter가 미리 해석해 둔 import 관계다. file-analyzer 배치에 함께 전달되므로 LLM이 소스에서 import를 다시 유도하지 않는다.
- **guided tour**: 의존 순서로 정렬된 아키텍처 walkthrough다. `tour-builder`가 자동 생성하며 코드베이스를 익히는 순서를 제시한다.
- **fingerprint 기반 변경 감지**: tree-sitter가 담당하는 증분 갱신의 근거다. 이 감지가 있어 `/understand`를 다시 실행해도 변경된 파일만 재분석한다.
- **persona-adaptive UI**: 주니어 개발자, PM, 숙련 사용자라는 페르소나에 맞춰 대시보드가 정보 밀도를 조정하는 방식이다.
- **language concepts**: generics, closure, decorator를 비롯한 12가지 프로그래밍 패턴을 코드에 등장하는 자리에서 설명하는 기능이다.
- **`.understand-anything/`**: 산출물 디렉터리다. `knowledge-graph.json`과 `config.json`이 여기 남고, `intermediate/`와 `diff-overlay.json`은 로컬 임시 파일이라 커밋에서 제외한다.
- **Trendshift**: GitHub 저장소 트렌드를 큐레이션하는 외부 서비스다. 이 저장소는 `repositories/23482`로 등록되어 있다.
