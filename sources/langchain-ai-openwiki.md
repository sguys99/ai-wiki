---
title: "langchain-ai/openwiki"
type: repo
year: 2026
category: applications
raw_path: raw/repos/langchain-ai-openwiki.md
raw_filename: "langchain-ai-openwiki.md"
source_collection: external
org: "langchain-ai"
repo: "openwiki"
url: "https://github.com/langchain-ai/openwiki"
license: "MIT"
tags: [openwiki, cli, coding-agent, documentation, repo-wiki, deepagents, langsmith, agents-md, claude-md, langchain-ai]
---

## 한 줄 요약 (One-line Summary)

`langchain-ai/openwiki`는 코드베이스 문서를 생성하고 유지하는 CLI다. README 첫 문장은 이 도구가 "에이전트를 위해 특별히 만들어졌다(built specifically for agents)"고 밝힌다. `npm install -g openwiki`로 설치하고 `openwiki --init`으로 inference provider, API 키, 모델을 설정하면 저장소를 읽어 `openwiki/` 디렉토리에 문서를 만든다. 문서 생성에서 끝나지 않고 `AGENTS.md`와 `CLAUDE.md`에 "컨텍스트를 찾을 때 이 문서를 참조하라"는 지시를 자동으로 덧붙여, 코딩 에이전트가 그 문서를 스스로 찾아 쓰게 연결한다.

## 1. 자료 정보 (Document Information)

- **저장소**: `langchain-ai/openwiki` (https://github.com/langchain-ai/openwiki)
- **배포**: npm 전역 패키지 (`npm install -g openwiki`)
- **소속**: LangChain (langchain-ai 조직)
- **raw 성격**: README 본문 하나뿐이다. 소스 트리 스냅샷이 아니므로 내부 구현, 테스트, 버전 이력은 확인할 수 없다.
- **라이선스**: raw frontmatter는 MIT로 기록하지만 README 본문에는 라이선스 조항이 없다.
- **README에 실린 도식**: `static/openwiki.png` 한 장이 문서 상단에 임베드돼 있다. 저장소 안의 이미지를 in-place 참조하는 형태라 로컬 사본은 없다.

README가 명시하는 진입점은 여섯 가지다.

| 명령 | 동작 | 종료 방식 |
|---|---|---|
| `openwiki --init` | OpenWiki를 초기화하고 모델과 API 키를 설정한 뒤 문서를 생성한다 | 첫 실행 시 대화형 설정 |
| `openwiki` | 대화형 CLI를 시작한다 | 실행 후에도 세션이 열려 있어 후속 메시지를 보낼 수 있다 |
| `openwiki "Please generate documentation for this repository"` | 최초 요청을 인자로 넘겨 시작한다 | 대화형 유지 |
| `openwiki -p "Summarize what you can do"` | 명령 하나를 실행한다 | 최종 assistant 출력을 찍고 종료하는 비대화형 실행 |
| `openwiki --update` | 기존 문서를 갱신한다 | 기본 동작을 따른다 |
| `openwiki --help` | 도움말을 보여 준다 | 즉시 종료 |

## 2. 주요 기여 (Key Contributions)

1. **에이전트를 1차 독자로 삼은 문서 생성 CLI.** README는 사람이 읽을 문서가 아니라 에이전트를 위해 만들었다고 첫 줄에서 선언한다. 생성된 문서는 저장소 안 `openwiki/` 디렉토리에 남는다.
2. **없으면 생성하고 있으면 갱신하는 단일 명령.** `openwiki`는 위키가 없을 때 `openwiki/`에 초기 문서를 만들고, 이미 있으면 저장소 변경 사항을 반영해 그 문서를 새로 고친다. 두 경우를 사용자가 구분해 부를 필요가 없다.
3. **에이전트 지시 파일 자동 연동.** `AGENTS.md`와 `CLAUDE.md`에 위키 참조 지시를 자동으로 덧붙이고, 두 파일이 없으면 만들어 준다. 지시 파일은 포인터를 두는 자리이고 실제 문서는 위키가 담당한다는 분업이 도구 차원에서 강제된다.
4. **CI 워크플로 예시 제공.** GitHub Actions용 `examples/openwiki-update.yml`과 GitLab CI용 `examples/openwiki-update.gitlab-ci.yml`을 저장소가 함께 배포한다. 문서 갱신을 PR 또는 merge request로 자동 생성하는 것이 목적이다.
5. **멀티 provider와 게이트웨이 지원.** OpenRouter, Fireworks, Baseten, OpenAI, OpenAI 호환 provider, Anthropic을 기본 지원한다. GLM 5.2, Kimi K2.6, Sonnet 5 등이 미리 정의돼 있고 provider마다 커스텀 모델 ID를 지정할 수 있다. `ANTHROPIC_BASE_URL`로 Anthropic 호환 게이트웨이를, `openai-compatible` provider로 LiteLLM 같은 OpenAI 형태 게이트웨이를 붙인다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

README는 내부 구현을 설명하지 않고 사용자가 보는 동작만 기술한다. 그 동작은 생성, 연동, 갱신 세 단계로 나뉜다.

### 생성

`--init`이 inference provider, API 키, 사용할 LLM을 묻고 저장소를 읽어 `openwiki/`에 초기 문서를 만든다. 첫 대화형 실행에서만 이 설정 절차가 나오며, 같은 화면에서 LangSmith API 키를 선택 사항으로 받는다. 키를 넣으면 실행 기록이 "openwiki"라는 이름의 LangSmith 트레이싱 프로젝트로 남는다. 설정값과 시크릿은 로컬 기기의 `~/.openwiki/.env`에 저장된다.

### 연동

문서를 만든 뒤 `AGENTS.md`와 `CLAUDE.md` 중 존재하는 파일에 프롬프트를 덧붙인다. 내용은 컨텍스트를 찾을 때 생성된 위키를 참조하라는 지시다. 파일이 저장소에 없으면 OpenWiki가 새로 만든다.

### 갱신

`--update`가 기존 문서를 갱신한다. README의 서술은 "저장소 변경 사항으로부터 문서를 새로 고친다" 수준이며, 변경 검출 방식은 밝히지 않는다. 반복 실행은 CI가 담당한다. GitHub Actions는 예시 파일을 `.github/workflows/openwiki-update.yml`로 복사하고, GitLab CI는 `.gitlab-ci.yml`로 복사하거나 기존 파이프라인에서 include한다.

### 실행 모드

기본값은 대화형이다. 한 번 실행한 뒤에도 CLI가 열려 있어 후속 메시지를 이어 보낼 수 있다. `-p` 또는 `--print`를 주면 한 번만 실행하고 최종 assistant 출력을 표준 출력으로 찍은 뒤 종료한다. 비대화형 실행이 필요한 CI와 스크립트를 위한 모드다.

### provider 설정

두 가지 확장 경로가 README에 예시와 함께 실려 있다.

| 경로 | 목적 | 필요한 환경 변수 |
|---|---|---|
| Anthropic 대체 base URL | 자체 호스팅이나 프록시 게이트웨이 같은 Anthropic 호환 엔드포인트로 라우팅한다 | `OPENWIKI_PROVIDER=anthropic`, `ANTHROPIC_API_KEY`, `ANTHROPIC_BASE_URL` |
| OpenAI 호환 엔드포인트 | LiteLLM 게이트웨이처럼 OpenAI 형태 chat-completions 엔드포인트를 붙인다. base URL이 필수이고 모델 ID는 게이트웨이가 노출하는 이름을 쓴다 | `OPENWIKI_PROVIDER=openai-compatible`, `OPENAI_COMPATIBLE_API_KEY`, `OPENAI_COMPATIBLE_BASE_URL`, `OPENWIKI_MODEL_ID` |

base URL과 자격 증명은 셸 환경 변수로 두거나 `~/.openwiki/.env`에 저장한다. 원하는 provider나 모델이 없으면 PR을 열어 달라고 README가 요청한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README에는 성능 수치, 벤치마크, 사용자 사례가 없다. 도구 저장소의 README이므로 설치와 사용법, 설정 옵션만 담고 있다. 문서 자동화의 효과를 정량으로 주장하는 대목도 없다.

같은 도구의 근거 주장은 LangChain 공식 출시 블로그가 담당한다. 그 글은 에이전트가 저장소를 이해할수록 코드 변경이 정확해지고 피할 수 있는 실수가 줄어든다는 정성적 논거를 제시하며, 여기에도 수치는 없다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **raw가 README 하나라 내부 구현 세부는 확인 불가.** 문서 생성 파이프라인의 단계 구성, 저장소를 읽는 범위, 변경 검출 알고리즘, 생성 문서의 형식은 README에 없다.
- **라이선스 조항 부재.** README 본문에 라이선스 절이 없다. frontmatter의 MIT 기록은 저장소 메타데이터에서 온 값이다.
- **갱신 주기와 트리거 미기재.** CI 예시가 어떤 조건으로 실행되는지 README는 밝히지 않는다. 예시 파일 자체는 raw에 포함돼 있지 않다.
- **문서 정확성 검증 장치 부재.** 생성물이 코드와 맞는지 재는 절차가 README에 없다. 자동으로 열린 PR을 사람이 검토하는 흐름을 전제한다.
- **LLM 호출 비용.** 저장소를 읽어 문서를 만들고 반복 갱신하는 구조라 provider 호출 비용이 따른다. README는 비용을 언급하지 않는다.
- **좁은 PR 정책.** 기여자는 `CONTRIBUTING.md`를 먼저 읽어야 하며, PR은 한 번에 한 변경으로 좁게 유지해야 한다. 관련 없는 변경을 묶은 PR은 분리 요청과 함께 닫힐 수 있다.

## 6. 관련 연구 (Related Work)

- **LangChain 공식 출시 블로그** ([[applications/sproul-2026-introducing-openwiki-an-open-source]]): 같은 도구의 설계 의도와 배경을 밝힌 1차 자료다. DeepAgents 기반이라는 사실, git diff를 이용한 증분 갱신, 하루 한 번 실행하는 GitHub Action 예시, 첫 릴리스를 코드베이스로 한정했다는 서술이 README가 아니라 이 글에 있다.
- **한국어 소개 기사** ([[applications/9bow-2026-openwiki-coding-agent-documentation]]): 같은 도구를 한국어로 정리한 2차 자료다.
- **Karpathy LLM Wiki 패턴** ([[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]], [[applications/kmyu-2026-llm-wiki-pattern-synthesis]]): 출시 블로그가 DeepWiki, AutoWiki와 함께 영감으로 인용한 계보다.
- **코드베이스를 그래프로 바꾸는 계열**: [[applications/colbymchenry-codegraph]], [[applications/lum1104-understand-anything]], [[applications/safishamsi-graphify]], [[applications/wlsdks-ontology-atlas]]가 같은 문제를 그래프 산출물로 푼다.
- **문서 생성 자동화의 상위 계열**: [[agents/stanford-oval-storm]]이 에이전트 대화로 장문 문서를 생성한다.

## 7. 용어집 (Glossary)

- **inference provider**: 모델 추론을 제공하는 서비스 사업자를 뜻한다. OpenWiki는 provider와 API 키, 모델 ID를 조합해 호출 대상을 정한다.
- **AGENTS.md와 CLAUDE.md**: 코딩 에이전트가 저장소에 진입할 때 읽는 지시 문서다. OpenWiki가 위키 참조 지시를 여기에 덧붙인다.
- **LangSmith 트레이싱 프로젝트**: LangChain의 실행 관측 서비스에서 실행 기록을 모아 두는 단위다. OpenWiki는 "openwiki"라는 이름의 프로젝트로 기록한다.
- **openai-compatible provider**: OpenAI 형태의 chat-completions 엔드포인트를 base URL로 지정해 붙이는 provider 옵션이다. LiteLLM 같은 게이트웨이를 통해 여러 상위 provider에 하나의 API 형태로 접근한다.
- **`-p` 또는 `--print` 모드**: 한 번 실행하고 최종 assistant 출력만 찍은 뒤 종료하는 비대화형 실행 방식이다.
