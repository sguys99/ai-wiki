---
title: "langchain-ai/openwiki"
type: repo
year: 2026
category: applications
raw_path: raw/repos/langchain-ai-openwiki.md
raw_filename: "langchain-ai-openwiki.md"
source_collection: external
source: langchain-ai-openwiki.md
org: "langchain-ai"
repo: "openwiki"
url: "https://github.com/langchain-ai/openwiki"
license: "MIT"
tags: [openwiki, cli, coding-agent, documentation, repo-wiki, deepagents, langsmith, agents-md, claude-md, langchain-ai]
---

## 요약

OpenWiki는 코드베이스 문서를 생성하고 유지하는 명령줄 도구다. LangChain이 공개했고 npm 전역 패키지로 배포한다. README의 첫 문장은 이 도구가 "에이전트를 위해 특별히 만들어졌다(built specifically for agents)"고 선언한다. 사람이 읽을 문서를 예쁘게 만드는 것이 목표가 아니라, 코딩 에이전트가 저장소를 이해할 때 참조할 자료를 만드는 것이 목표다.

동작은 세 단계로 이어진다. 첫째, 저장소를 읽어 `openwiki/` 디렉토리에 문서를 만든다. 둘째, `AGENTS.md`와 `CLAUDE.md`에 그 문서를 참조하라는 지시를 덧붙인다. 셋째, 코드가 바뀌면 같은 명령이 문서를 새로 고친다. 세 번째 단계를 사람이 잊지 않도록 GitHub Actions와 GitLab CI 예시 워크플로가 저장소에 함께 들어 있다.

두 번째 단계가 이 도구의 설계 판단이 드러나는 자리다. 생성한 문서를 지시 파일에 통째로 넣지 않고 짧은 참조만 남긴다. 지시 파일은 방향을 가리키는 포인터이고 본문은 위키가 담당한다는 분업이다.

이 페이지의 근거 자료는 저장소 README 본문 하나다. 소스 트리 스냅샷이 아니므로 문서 생성 파이프라인의 내부 구현은 다루지 않는다. README에 없고 LangChain 공식 출시 블로그에만 있는 사실은 본문에서 출처를 밝혀 구분한다.

## 배경

문서는 만드는 것보다 유지하는 것이 어렵다. 초기 문서를 쓰는 데 시간이 들고, 코드가 바뀔 때마다 고치는 일은 더 어렵다. PR이 자주 들어오는 큰 저장소에서 문서는 빠르게 낡는다. OpenWiki 출시 블로그가 문제 정의로 든 상황이 이것이다.

코딩 에이전트가 등장하면서 이 문제의 성격이 달라졌다. 에이전트는 저장소를 이해할수록 정확한 코드 변경을 낸다. 핵심 로직이 어디 있는지, 파일이 어떻게 연결되는지, 이 코드베이스가 어떤 패턴을 기대하는지를 알아야 하기 때문이다. 낡은 문서는 사람에게 불편한 데서 그치지 않고 에이전트의 출력 품질을 직접 떨어뜨린다.

기존 수단인 지시 문서만으로는 이 요구를 감당하기 어렵다. 대부분의 코딩 에이전트가 이미 `AGENTS.md`나 `CLAUDE.md`를 읽지만, 그 파일은 수백 페이지 분량의 저장소 문서를 담을 자리가 아니다. 큰 저장소에서 위키는 파일 수백 개에 이르고, 그 전부를 매 실행마다 컨텍스트로 올리면 낭비가 크다. 지시 파일은 에이전트를 올바른 컨텍스트로 안내하고, 실제 검색은 에이전트가 하게 두는 편이 낫다. OpenWiki는 이 분업을 도구로 구현한다.

## 핵심 개념

**코딩 에이전트 지시 문서.** `AGENTS.md`와 `CLAUDE.md`는 코딩 에이전트가 저장소에 들어올 때 읽는 규칙 파일이다. OpenWiki는 여기에 위키 참조 프롬프트를 자동으로 덧붙이며, 파일이 없으면 만들어 준다. 사용자가 워크플로를 바꾸지 않아도 에이전트가 문서를 발견하게 만드는 장치다.

**inference provider.** 모델 추론을 제공하는 서비스 사업자를 뜻한다. OpenWiki는 provider, API 키, 모델 ID 세 값을 조합해 어느 모델을 호출할지 정한다. 첫 대화형 실행에서 이 세 값을 묻는다.

**base URL.** provider의 API 엔드포인트 주소다. 기본 주소 대신 다른 주소를 지정하면 같은 API 형태를 유지한 채 호출 대상만 바꿀 수 있다. 자체 호스팅 모델이나 사내 프록시를 쓰는 조직에 필요한 설정이다.

**게이트웨이.** 여러 상위 provider를 하나의 API 형태로 중계하는 서버를 말한다. README가 예로 드는 LiteLLM이 그런 서버다. OpenWiki는 게이트웨이가 노출하는 이름을 모델 ID로 받아서 게이트웨이 뒤의 어떤 provider든 호출한다.

**LangSmith 트레이싱 프로젝트.** LangChain의 실행 관측 서비스에서 실행 기록을 모아 두는 단위다. OpenWiki는 실행 기록을 "openwiki"라는 이름의 프로젝트로 남기며, 이 기능은 LangSmith API 키를 넣은 경우에만 켜진다.

## 방법

### 설치와 초기화

설치는 npm 전역 설치 한 줄이다.

```sh
npm install -g openwiki
```

이어서 `openwiki --init`을 실행하면 초기화가 시작된다. 이 명령 하나가 모델과 API 키 설정을 받은 뒤 문서 생성까지 이어서 수행한다. 첫 대화형 실행에서 묻는 값은 inference provider, API 키, 사용할 LLM 세 가지이며, 여기에 LangSmith API 키를 선택 사항으로 더 받는다. 설정값과 시크릿은 로컬 기기의 `~/.openwiki/.env`에 저장된다.

### 명령 목록

README가 제시하는 진입점은 여섯 가지다.

| 명령 | 하는 일 |
|---|---|
| `openwiki --init` | 초기화한다. 모델과 API 키를 설정하고 문서를 생성한다 |
| `openwiki` | 대화형 CLI를 시작한다 |
| `openwiki "Please generate documentation for this repository"` | 최초 요청을 인자로 넘겨 시작한다 |
| `openwiki -p "Summarize what you can do"` | 명령 하나를 실행하고 종료한다 |
| `openwiki --update` | 기존 문서를 갱신한다 |
| `openwiki --help` | 도움말을 보여 준다 |

명령을 외우지 않아도 되도록 기본 동작이 저장소 상태에 따라 달라진다. `openwiki`는 위키가 없으면 `openwiki/`에 초기 문서를 만들고, 이미 있으면 저장소 변경 사항을 반영해 그 문서를 새로 고친다. 생성과 갱신을 사용자가 구분해 부를 필요가 없다는 뜻이다.

### 실행 모드

CLI에는 대화형과 일회성 두 모드가 있다.

| 모드 | 지정 방법 | 동작 |
|---|---|---|
| 대화형 | 기본값 | 실행이 끝나도 CLI가 열려 있어 후속 메시지를 이어 보낼 수 있다 |
| 일회성 | `-p` 또는 `--print` | 한 번만 실행하고 최종 assistant 출력을 찍은 뒤 종료한다 |

일회성 모드는 사람이 없는 환경을 위한 것이다. CI 작업과 스크립트는 프롬프트를 기다리는 세션을 유지할 수 없기 때문에 출력만 받고 끝나는 실행이 필요하다.

### 생성물과 건드리는 파일

한 번의 실행이 남기는 결과는 네 자리로 나뉜다.

| 위치 | 내용 | 성격 |
|---|---|---|
| `openwiki/` | 생성된 저장소 문서 | 저장소 안에 커밋되는 산출물 |
| `AGENTS.md` | 위키 참조 프롬프트가 덧붙는다 | 없으면 OpenWiki가 만든다 |
| `CLAUDE.md` | 위키 참조 프롬프트가 덧붙는다 | 없으면 OpenWiki가 만든다 |
| `~/.openwiki/.env` | provider, API 키, base URL 등 설정과 시크릿 | 저장소 밖 로컬 기기에만 남는다 |

시크릿이 저장소가 아니라 홈 디렉토리에 놓인다는 점이 중요하다. 생성된 문서와 지시 파일은 팀이 공유하는 저장소로 들어가지만 자격 증명은 실행한 기기를 벗어나지 않는다.

### 에이전트 지시 파일 연동

문서를 만든 뒤 OpenWiki는 `AGENTS.md`와 `CLAUDE.md`에 프롬프트를 덧붙인다. 내용은 컨텍스트를 찾을 때 이 위키를 참조하라는 지시다. 덮어쓰기가 아니라 덧붙이기이므로 기존 지시는 그대로 남는다.

이 방식은 위키 전체를 지시 파일에 넣는 대안과 대비된다. 출시 블로그는 큰 저장소에서 위키가 파일 수백 개에 이르며 그 전부를 매 실행에 올리면 낭비이고 유지도 어렵다고 설명한다. 짧은 참조 한 줄이면 에이전트가 필요할 때 문서를 찾아가고, 사용자는 워크플로를 바꾸지 않아도 된다.

### 모델과 provider 설정

기본 지원 provider는 여섯 가지다. README가 설정 예시까지 제공하는 것은 그중 둘이다.

| provider | README가 밝힌 설정 |
|---|---|
| OpenRouter | 기본 지원 목록에 포함된다 |
| Fireworks | 기본 지원 목록에 포함된다 |
| Baseten | 기본 지원 목록에 포함된다 |
| OpenAI | 기본 지원 목록에 포함된다 |
| Anthropic | `ANTHROPIC_BASE_URL`로 대체 엔드포인트를 지정할 수 있다 |
| openai-compatible | base URL이 필수다. LiteLLM 같은 게이트웨이를 붙이는 용도다 |

모델은 provider마다 몇 가지가 미리 정의돼 있다. README가 예로 드는 이름은 GLM 5.2, Kimi K2.6, Sonnet 5다. 목록에 없는 모델을 쓰려면 provider별로 커스텀 모델 ID를 직접 지정하면 된다. 출시 블로그는 기본값이 OpenRouter와 오픈 모델 조합이라고 덧붙인다.

게이트웨이 연결에 쓰는 환경 변수는 다음과 같다.

| 환경 변수 | 쓰이는 곳 | 값 |
|---|---|---|
| `OPENWIKI_PROVIDER` | 공통 | `anthropic` 또는 `openai-compatible` 같은 provider 이름 |
| `ANTHROPIC_API_KEY` | Anthropic | Anthropic 자격 증명 |
| `ANTHROPIC_BASE_URL` | Anthropic | Anthropic 호환 엔드포인트 주소 |
| `OPENAI_COMPATIBLE_API_KEY` | openai-compatible | 게이트웨이 자격 증명 |
| `OPENAI_COMPATIBLE_BASE_URL` | openai-compatible | 게이트웨이의 OpenAI 형태 엔드포인트 주소 |
| `OPENWIKI_MODEL_ID` | openai-compatible | 게이트웨이가 노출하는 모델 이름 |

이 값들은 셸 환경 변수로 두거나 `~/.openwiki/.env`에 저장한다. 두 방식 중 하나를 고르면 되고 동작은 같다. 원하는 provider나 모델이 목록에 없으면 PR을 열어 달라고 README가 요청한다.

### CI 워크플로

문서를 계속 최신으로 두는 일은 CI가 맡는다. 저장소가 두 종류의 예시 파일을 제공한다.

| Git provider | 예시 파일 | 배치 위치 |
|---|---|---|
| GitHub Actions | `examples/openwiki-update.yml` | `.github/workflows/openwiki-update.yml`로 복사한다 |
| GitLab CI | `examples/openwiki-update.gitlab-ci.yml` | `.gitlab-ci.yml`로 복사하거나 기존 파이프라인에서 include한다 |

두 워크플로의 목적은 같다. 문서 갱신을 담은 PR 또는 merge request를 자동으로 여는 것이다. 실행 주기를 README는 밝히지 않는다. 출시 블로그가 GitHub Action을 하루 한 번 같은 일정으로 실행하는 예를 들고, 그 실행이 지난 실행 이후 들어온 커밋을 확인해 git diff로 변경을 파악한 뒤 관련 부분을 위키에 반영한다고 설명한다.

## 결과

README에는 성능 수치, 벤치마크, 사용자 사례가 없다. 도구 저장소의 README라서 설치와 사용법, 설정 옵션만 담겨 있다. 문서 자동화가 얼마나 효과가 있는지를 정량으로 주장하는 대목도 없다.

효과에 대한 논거는 출시 블로그가 대신 제시하며 그 논거도 정성적이다. 좋은 문서가 에이전트에 컨텍스트를 주고, 그 결과 코드 변경이 더 정확해지며 피할 수 있는 실수가 줄어든다는 주장이다. 이 인과를 측정한 실험은 두 자료 어디에도 없다.

같은 문제 영역의 도구 중에는 정량 근거를 내놓은 사례가 있다. [[applications/colbymchenry-codegraph]]는 7개 저장소 A/B 벤치마크에서 토큰 47% 감소와 tool call 58% 감소를 보고했고, [[applications/safishamsi-graphify]]는 질의당 토큰이 71.5배 줄었다고 주장한다. OpenWiki는 이런 비교 실험을 제시하지 않으므로, 효과 판단은 사용자가 자기 저장소에서 직접 확인해야 한다.

## 같은 문제 영역의 다른 도구

저장소를 에이전트가 이해하도록 돕는 도구는 이 wiki에만 여러 편이 있다. 산출물 형태를 보면 성격이 나뉜다. OpenWiki는 문서를 만들고, 나머지는 대체로 그래프를 만든다.

| 도구 | 산출물 | 에이전트 연결 방식 | 최신 유지 |
|---|---|---|---|
| OpenWiki | 저장소 안 `openwiki/` 문서 | `AGENTS.md`와 `CLAUDE.md`에 참조 프롬프트를 덧붙인다 | `--update`와 CI 예시 워크플로 |
| [[applications/colbymchenry-codegraph]] | 프로젝트 폴더 안 SQLite 그래프 | MCP 서버가 그래프를 도구로 노출한다 | OS 파일 이벤트 감시로 증분 동기화 |
| [[applications/lum1104-understand-anything]] | JSON 그래프와 대시보드 | `/understand` 슬래시 명령 플러그인 | 기본 증분 분석, `--auto-update`의 post-commit 훅 |
| [[applications/safishamsi-graphify]] | `graphify-out/`의 HTML, Obsidian vault, wiki 문서, 그래프 JSON | `/graphify` 스킬과 `--mcp` 서버 | `--watch`가 코드 저장 시 재빌드 |
| [[applications/wlsdks-ontology-atlas]] | 저장소 안 Markdown vault | MCP 서버 | 사람과 에이전트가 같은 파일을 편집하고 git diff가 판정한다 |

문서와 그래프의 차이는 검색 방식의 차이로 이어진다. 그래프 계열은 노드와 엣지를 질의해 호출 관계나 영향 범위 같은 구조적 질문에 답한다. 문서 계열인 OpenWiki는 에이전트가 이미 잘하는 파일 읽기와 검색을 그대로 쓰되, 읽을 대상을 원본 소스 대신 요약된 문서로 바꾼다. 새 인터페이스를 도입하지 않는 대신 구조 질의 능력도 얻지 못한다.

연결 방식에서도 차이가 난다. 그래프 계열 넷은 MCP 서버나 슬래시 명령처럼 에이전트 쪽 설정을 요구한다. OpenWiki는 지시 파일 한 줄로 끝나므로 도입 비용이 가장 낮다. 대신 에이전트가 그 참조를 실제로 따라가는지는 보장되지 않는다.

## 한계

- **raw가 README 하나라 내부 구현 세부는 확인 불가.** 문서 생성 파이프라인의 단계 구성, 저장소를 읽는 범위, 변경 검출 알고리즘, 생성 문서의 형식은 README에 없다.
- **라이선스 조항 부재.** README 본문에 라이선스 절이 없다. frontmatter의 MIT 기록은 저장소 메타데이터에서 온 값이다.
- **정확성 검증 장치 부재.** 생성된 문서가 코드와 맞는지 재는 절차가 없다. 자동으로 열린 PR을 사람이 검토하는 흐름을 전제한다.
- **비용 정보 없음.** 저장소를 읽어 문서를 만들고 반복 갱신하는 구조라 provider 호출 비용이 따르지만 README는 비용을 언급하지 않는다.
- **CI 예시의 동작 조건 미기재.** 예시 워크플로 파일 자체는 raw에 포함돼 있지 않고, 실행 주기와 트리거도 README에 없다.
- **첫 릴리스는 코드베이스 전용.** 출시 블로그에 따르면 다른 종류의 작업에 지속 컨텍스트를 제공하는 확장은 향후 방향으로만 언급된다.
- **좁은 PR 정책.** 기여자는 `CONTRIBUTING.md`를 먼저 읽어야 하며, PR은 한 번에 한 변경으로 좁게 유지해야 한다. 관련 없는 변경을 묶은 PR은 분리 요청과 함께 닫힐 수 있다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| inference provider | 모델 추론을 제공하는 서비스 사업자. OpenWiki는 provider와 API 키, 모델 ID를 조합해 호출 대상을 정한다 |
| AGENTS.md와 CLAUDE.md | 코딩 에이전트가 저장소 진입 시 읽는 지시 문서. OpenWiki가 위키 참조 지시를 여기에 덧붙인다 |
| LangSmith 트레이싱 프로젝트 | LangChain의 실행 관측 서비스에서 실행 기록을 모아 두는 단위. OpenWiki는 "openwiki"라는 이름으로 기록한다 |
| openai-compatible provider | OpenAI 형태의 chat-completions 엔드포인트를 base URL로 지정해 붙이는 provider 옵션 |
| `-p` 또는 `--print` 모드 | 한 번 실행하고 최종 assistant 출력만 찍은 뒤 종료하는 비대화형 실행 방식 |

## 관련 페이지

- [[applications/sproul-2026-introducing-openwiki-an-open-source]]: 같은 도구의 LangChain 공식 출시 블로그. README에 없는 DeepAgents 기반, git diff 증분 갱신, 하루 한 번 실행하는 GitHub Action 예시가 이 글에 있다
- [[applications/9bow-2026-openwiki-coding-agent-documentation]]: 같은 도구를 한국어로 정리한 소개 기사
- [[applications/colbymchenry-codegraph]]: 코드베이스를 SQLite 그래프로 만들어 MCP로 노출하는 도구
- [[applications/lum1104-understand-anything]]: 코드베이스를 knowledge graph로 바꿔 대시보드로 탐색하게 하는 플러그인
- [[applications/safishamsi-graphify]]: 폴더 하나를 지식 그래프와 여러 산출물로 바꾸는 스킬
- [[applications/wlsdks-ontology-atlas]]: 저장소 안 Markdown 폴더를 그래프로 컴파일하는 로컬 워크벤치
- [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]]: 출시 블로그가 영감으로 인용한 Karpathy LLM Wiki 개념
- [[applications/kmyu-2026-llm-wiki-pattern-synthesis]]: 같은 패턴을 이 저장소 운영에 적용한 합성 페이지
- [[agents/stanford-oval-storm]]: 에이전트 대화로 장문 문서를 생성하는 상위 계열
