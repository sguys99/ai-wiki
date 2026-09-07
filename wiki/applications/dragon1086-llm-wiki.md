---
title: "LLM Wiki: Karpathy LLM Knowledge Base 패턴의 한국어 레퍼런스 구현"
type: repo
year: 2026
category: applications
raw_path: raw/repos/dragon1086-llm-wiki.md
raw_filename: "dragon1086-llm-wiki.md"
source: dragon1086-llm-wiki.md
source_collection: external
org: "dragon1086"
repo: "llm-wiki"
url: "https://github.com/dragon1086/llm-wiki"
license: "(미명시)"
tags:
  - llm-wiki
  - karpathy-pattern
  - obsidian
  - claude-code
  - claude-cli
  - agents-md
  - knowledge-base
  - ingest-query-lint
  - wikilink
  - mermaid
  - marp
  - matplotlib
  - discord-bot
  - launchd
  - macos
  - korean
---

## 요약

`dragon1086/llm-wiki`는 Andrej Karpathy의 LLM Knowledge Base 패턴을 한국어로 구현한 명령줄 저장소다. 사람이 하는 일은 자료를 `raw/` 폴더에 저장하는 것과 질문하는 것 두 가지이고, 자료를 읽어 페이지로 정리하고 페이지 사이를 연결하는 일은 Claude Code CLI가 맡는다. 저장 공간은 Obsidian vault다. vault는 Obsidian이 하나의 wiki로 인식하는 폴더를 뜻하며, 사람과 도구가 같은 마크다운 파일을 함께 읽고 쓴다.

이 저장소를 특징짓는 것은 명령 표면이 좁다는 점이다. `ingest`가 자료를 페이지로 바꾸고, `query`가 wiki를 탐색해 답을 만들고, `lint`가 링크와 색인의 건강을 점검한다. 여기에 `watch`가 폴더 감시를 상시화하고 `discord`가 같은 기능을 채팅 명령으로 노출한다. 세 개의 핵심 동사와 세 개의 보조 명령으로 지식 베이스 운영 전체를 덮는 구성이다.

README는 코드 사용법만 담지 않는다. 어떤 자료를 넣어야 하고 어떤 자료를 넣지 말아야 하는지, 얼마나 자주 점검해야 하는지 같은 운영 규범을 별도 절로 두었다. 도구를 제공하는 문서와 운영 습관을 규정하는 문서가 한 파일 안에 함께 있다.

| 항목 | 값 |
|---|---|
| 저장소 | `dragon1086/llm-wiki` |
| 유형 | repo (README 기준) |
| 언어 | 한국어 |
| 라이선스 | README에 표기 없음 |
| 필요 조건 | Python 3.10 이상, Claude Code CLI, Obsidian |
| 저장 위치 | Obsidian vault (`config.yaml`의 `vault_path`가 지정) |
| CLI 명령 | `ingest`, `query`, `lint`, `watch`, `status`, `discord` |
| 출력 포맷 | 텍스트, Marp 슬라이드, Mermaid 다이어그램, matplotlib 차트 |
| 완료 상태 | README의 Phase 표 6단계 전부 완료 |

## 배경

지식 베이스가 실패하는 지점은 대개 자료를 모으는 단계가 아니라 모은 자료를 다시 꺼내는 단계다. 클리핑한 글과 내려받은 논문이 폴더에 쌓이지만, 필요한 순간에 어디에 무엇이 있는지 찾지 못하면 자료는 없는 것과 같다.

Karpathy의 LLM Knowledge Base 패턴은 이 지점을 자동화 대상으로 삼는다. 사람이 원자료를 폴더에 넣으면 LLM이 읽어 정리된 페이지를 만들고, 이후의 질문은 그 정리본 위에서 답한다. 이 저장소의 README가 내세우는 구도도 같다. 사람은 자료를 넣고 질문만 하며 나머지는 AI가 쓴다.

README는 첫 부분과 끝의 참고 절에서 Karpathy의 원문 gist를 [https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) 주소로 링크한다. 이 저장소가 자신을 그 패턴의 구현체로 명시적으로 규정한 근거다.

구현의 선택지는 두 갈림길에서 갈린다. 하나는 저장을 어디에 둘 것인가이고 다른 하나는 LLM을 어떻게 호출할 것인가다. 이 저장소는 저장을 Obsidian vault로, 호출을 Claude Code CLI로 정했다. 앞의 선택은 결과물을 평범한 마크다운 파일로 남겨 Obsidian의 Graph View와 검색을 그대로 쓰게 하고, 뒤의 선택은 별도의 API 키 관리 없이 사용자가 이미 갖춘 실행 환경을 재사용한다.

### README가 약속하는 세 단계

README의 "이게 뭔가요?" 절은 웹 아티클, 논문, 메모를 `raw/` 폴더에 넣었을 때 벌어지는 일을 세 단계로 적는다.

| 순서 | 주체 | 결과 |
|---|---|---|
| 1 | Claude | 자료를 자동으로 읽고 개념 정리, 인물과 도구 페이지, 요약을 Obsidian vault에 생성한다 |
| 2 | Obsidian | 생성된 페이지를 지식 그래프로 시각화한다 |
| 3 | 사용자와 Claude | 자연어로 질문하면 wiki를 탐색해 답하고 슬라이드와 차트를 함께 만든다 |

세 단계가 각각 다른 도구에 배정되어 있다는 점이 이 설계의 성격을 보여준다. 생성은 LLM이, 시각화는 Obsidian이, 질의는 둘의 조합이 담당한다. 어느 단계도 자체 구현으로 대체하지 않고 이미 있는 도구를 이어 붙였다.

### 자료 범위에 관한 고지

우리가 보유한 원본은 이 저장소의 README 한 편이다. 2026-06-17 커밋 `0507ad0`이 `raw/repos/` 아래의 전체 클론을 README 스텁으로 경량화하면서 `AGENTS.md`, `config.yaml`, `requirements.txt`와 `scripts/` 하위 코드가 함께 빠졌다.

따라서 이 페이지는 README 본문이 명시한 내용만 근거로 삼는다. 함수명, 파일 줄 수, 프롬프트 구조, 응답 파싱 방식, 페이지 frontmatter 스키마 같은 내부 구현 세부는 현재 자료로 확인할 수 없으므로 서술하지 않는다.

## 핵심 개념

**vault**는 Obsidian이 하나의 wiki로 인식하는 폴더다. 이 저장소는 시스템 코드와 자료를 다른 위치에 두고 `config.yaml`의 `vault_path` 값으로 vault를 가리킨다.

**wikilink**는 `[[slug]]` 형태로 쓰는 Obsidian의 페이지 간 링크다. 사람에게는 클릭 가능한 연결이고, Obsidian에게는 Graph View에 그릴 간선이며, 이 저장소의 검색 단계에게는 이웃 페이지를 찾아가는 경로다. 하나의 표기가 세 가지 역할을 겸한다.

**slug**는 페이지를 가리키는 짧은 식별자다. 검색의 첫 단계가 질문의 키워드를 이 이름과 비교하기 때문에, slug 작명이 검색 품질에 직접 영향을 준다.

**ingest**는 `raw/`의 마크다운을 읽어 wiki 페이지로 컴파일하는 단계다. 원자료 한 편에서 여러 페이지가 나온다.

**query**는 자연어 질문으로 wiki를 탐색해 답을 만드는 단계다. 답의 형식은 플래그로 고른다.

**finding**은 query가 만든 답변 가운데 재사용 가치가 있는 것을 `wiki/findings/`에 남긴 페이지다. 저장된 답변은 다음 질문의 탐색 대상이 되므로, 질문을 던질수록 wiki가 두꺼워진다.

**토큰 예산**은 query가 컨텍스트에 담을 수 있는 분량의 상한이다. 컨텍스트는 모델이 한 번에 참고하는 입력 전체를 가리킨다. 이 저장소는 예산을 18,000자로 두고, 그 안에 들어갈 페이지를 골라 담는다.

**BFS 1홉 확장**은 검색 시드로 뽑은 페이지의 wikilink를 한 단계만 따라가 이웃 페이지를 컨텍스트에 추가하는 방식이다. 이름만 비슷한 페이지가 아니라 실제로 연결된 페이지를 끌어오는 것이 목적이다.

**Graph View**는 Obsidian이 vault의 페이지를 점으로, wikilink를 선으로 그려 보여주는 화면이다. 이 저장소가 페이지 사이를 wikilink로 연결하는 이유 가운데 하나가 이 화면에서 지식의 형태를 눈으로 확인하기 위해서다.

**Marp**는 마크다운을 슬라이드로 렌더링하는 도구다. `--slides` 출력이 만드는 파일을 Obsidian의 Marp Slides 플러그인이 그대로 미리 보여준다.

**Mermaid**는 텍스트로 다이어그램을 정의하는 표기법이다. 코드 블록 안에 관계나 흐름을 문장으로 적으면 렌더링 단계에서 그림이 된다. `--diagram` 출력이 이 형식을 쓴다.

**last30days**는 Reddit, X/Twitter, Hacker News의 최근 30일 트렌드를 모아 오는 외부 스킬이다. 이 저장소는 자체 수집기를 만들지 않고 이 스킬의 결과물을 소스로 받는다.

## 방법

### 파이프라인 5단계

README는 자료 투입에서 답변 파일링까지를 다섯 단계로 나눈다.

| 단계 | 내용 |
|---|---|
| 소스 투입 | Web Clipper, 복사 붙여넣기, last30days 트렌드 수집으로 `raw/`에 마크다운을 저장한다 |
| AI 컴파일 | Claude가 소스를 읽고 개념, 인물, 요약 페이지를 자동 생성하고 `[[wikilink]]`로 연결한다 |
| Obsidian | Graph View로 지식 그래프를 탐색하고 Marp 슬라이드를 미리 본다 |
| Query | 자연어 질문을 받아 wiki를 탐색하고 마크다운, 슬라이드, 차트로 출력한다 |
| Findings | 가치 있는 답변을 `wiki/findings/`에 자동 파일링한다 |

앞의 두 단계가 자료를 지식으로 바꾸는 방향이고 뒤의 두 단계가 지식을 다시 꺼내는 방향이다. 마지막 Findings 단계가 꺼낸 결과를 다시 저장 쪽으로 되돌려 순환을 닫는다.

### 설치와 초기 설정

설치는 세 단계로 이뤄진다.

첫째, 저장소를 클론하고 가상환경을 만든 뒤 `pip install -r requirements.txt`로 의존성을 설치한다. `chmod +x wiki`로 실행 권한을 준 다음 `python3 scripts/setup.py`가 vault 경로 설정과 디렉토리 생성을 처리한다. `alias wiki="/path/to/llm-wiki/wiki"`를 셸 설정에 추가하면 어느 디렉토리에서든 `wiki` 명령으로 부를 수 있다.

둘째, `bash scripts/setup_vault.sh`로 vault 디렉토리를 초기화하고 Obsidian에서 Open folder as vault를 눌러 `obsidian-vault/llm-wiki/`를 연다. `config.yaml`의 `vault_path` 값이 그 경로를 가리켜야 한다.

셋째, 아무 마크다운 파일이나 `raw/`에 넣고 `./wiki ingest`를 실행한 뒤 `./wiki status`로 결과를 확인한다.

`scripts/setup.py`와 `scripts/setup_vault.sh`가 모두 디렉토리 생성을 언급하므로 두 스크립트의 역할이 겹쳐 보인다. README는 둘의 경계를 구분해 설명하지 않는다.

### 명령 표면

| 명령 | 형태 | 동작 |
|---|---|---|
| ingest | `./wiki ingest` | `raw/`의 미처리 파일을 전부 처리한다 (기본값) |
| ingest | `./wiki ingest raw/article.md` | 지정한 단일 파일만 처리한다 |
| watch | `./wiki watch` | `raw/`를 감시해 새 파일이 생기면 자동으로 ingest한다 |
| query | `./wiki query "질문"` | wiki를 탐색해 텍스트로 답한다 |
| lint | `./wiki lint` | dead link, orphan, index 불일치를 탐지한다 |
| lint | `./wiki lint --fix` | 자동 수정 가능한 항목을 수정한다 |
| lint | `./wiki lint --deep` | LLM으로 페이지 사이의 모순을 탐지한다 (느림) |
| status | `./wiki status` | wiki 현황을 요약한다 |
| discord | `./wiki discord` | Discord 봇을 실행한다 |

`ingest`가 인자 없이도 동작한다는 점이 이 설계의 기본값 선택을 보여준다. 사용자가 파일을 하나씩 지정하지 않아도 폴더 전체가 처리 대상이 된다.

### 세 동사의 역할 분담

명령이 여섯 개지만 실제 기능은 세 동사로 수렴한다. 나머지 셋은 그 동사를 다른 방식으로 부르는 통로다.

| 구분 | 명령 | 역할 |
|---|---|---|
| 핵심 동사 | `ingest` | 자료를 페이지로 바꾼다 (쓰기) |
| 핵심 동사 | `query` | 페이지에서 답을 만든다 (읽기) |
| 핵심 동사 | `lint` | 페이지 사이의 정합성을 점검한다 (검사) |
| 실행 통로 | `watch` | `ingest`를 사람 개입 없이 반복 실행한다 |
| 실행 통로 | `discord` | 세 동사를 채팅 명령으로 노출한다 |
| 상태 조회 | `status` | 현재 wiki의 현황을 요약한다 |

쓰기, 읽기, 검사가 각각 하나씩 배정된 구성이다. 지식 베이스에서 자주 문제가 되는 것이 세 번째인데, 자동 생성이 반복될수록 존재하지 않는 페이지를 가리키는 링크와 아무도 참조하지 않는 페이지가 쌓이기 때문이다. `lint`를 별도 동사로 승격한 것이 이 구조의 판단이다.

### lint가 점검하는 세 가지

기본 `lint`가 보는 항목은 셋이다.

| 항목 | 뜻 | 왜 생기는가 |
|---|---|---|
| dead link | `[[slug]]`가 가리키는 페이지가 실제로 없는 상태 | LLM이 아직 만들지 않은 페이지를 미리 링크했거나, 페이지 이름이 바뀐 뒤 링크가 따라오지 않았다 |
| orphan | 어느 페이지에서도 참조되지 않는 페이지 | 생성은 되었지만 다른 페이지가 링크를 걸어 주지 않아 그래프에서 고립되었다 |
| index 불일치 | 실제 파일 목록과 색인 내용이 어긋난 상태 | 파일은 있는데 색인에 없거나, 색인에는 있는데 파일이 없다 |

세 항목 모두 자동 생성이 반복될 때 조용히 누적된다는 공통점이 있다. 어느 것도 실행을 실패시키지 않으므로 사람이 알아차리기 어렵고, 그래서 주기적인 점검 명령이 필요하다.

`--fix`는 자동 수정 가능한 항목만 고친다. 어디까지가 자동 수정 범위인지는 README에 명시되어 있지 않다. `--deep`은 여기에 LLM 호출을 더해 페이지 사이의 내용 모순을 찾는데, 링크 구조가 아니라 서술의 충돌을 보는 검사라 성격이 다르고 실행이 느리다.

### 소스 투입 경로

| 경로 | 방식 | 특징 |
|---|---|---|
| Obsidian Web Clipper | 브라우저 확장이 웹 페이지를 `raw/`에 저장 | Vault를 `llm-wiki`로, Default location을 `raw/`로 설정하면 클리핑이 곧바로 처리 대상이 된다 |
| 복사 붙여넣기 | 사람이 직접 마크다운 파일을 만든다 | 메모와 논문 정리 같은 자체 생산 자료 |
| last30days 수집 | 외부 스킬이 모은 트렌드를 스크립트로 인제스트 | Reddit, X/Twitter, Hacker News의 최근 30일 자료 |

세 경로 모두 도착점이 `raw/` 폴더의 마크다운 파일 하나로 같다. 투입 방식이 달라도 이후 파이프라인은 동일하게 동작한다.

### 페이지 유형

원자료 한 편을 ingest하면 세 종류의 페이지가 만들어지고, query가 네 번째 종류를 더한다.

| 디렉토리 | 내용 | 생성 시점 |
|---|---|---|
| `wiki/summaries/` | 소스 요약 | ingest |
| `wiki/concepts/` | 소스에서 언급된 개념 아티클 | ingest |
| `wiki/entities/` | 인물, 도구, 조직 | ingest |
| `wiki/findings/` | query에서 파생된 답변 | query |

요약과 개념과 인물을 분리한 구분이 이 구조의 핵심이다. 요약은 원자료 한 편에 묶이지만 개념과 인물은 여러 자료에 걸쳐 축적되므로, 같은 개념을 다루는 자료가 늘어날수록 개념 페이지가 두꺼워진다.

### 출력 포맷 분기

`query`는 하나의 명령이지만 플래그로 결과 형식을 바꾼다.

| 플래그 | 산출 | 활용 |
|---|---|---|
| 없음 (기본) | 텍스트 마크다운 | 일반 답변 |
| `--slides` | Marp 슬라이드 | Obsidian의 Marp Slides 플러그인으로 바로 미리 본다 |
| `--diagram` | Mermaid 다이어그램 | 관계도, 흐름도 |
| `--chart` | matplotlib PNG | 분포와 수치 시각화 |
| `--archive` | 결과를 wiki에 자동 편입 | 다른 플래그와 함께 쓴다 |

`--archive`는 다른 세 플래그와 성격이 다르다. 형식이 아니라 저장 여부를 정하기 때문이다. README의 예시 `./wiki query "설계 정리해줘" --diagram --archive`처럼 조합해서 쓴다.

### 지식이 순환하는 구조

`--archive`와 Findings 단계가 이 시스템의 순환 고리를 만든다. 일반적인 질의응답은 답이 나오면 그것으로 끝나지만, 여기서는 답이 wiki의 새 페이지가 된다.

| 시점 | 상태 |
|---|---|
| 질문 이전 | wiki에는 ingest가 만든 요약, 개념, 인물 페이지만 있다 |
| 질문 직후 | 답변이 `wiki/findings/`에 페이지로 저장된다 |
| 다음 질문 | 저장된 finding도 탐색 대상이 되어 컨텍스트에 들어올 수 있다 |

원자료에는 없던 정보가 wiki에 추가된다는 점이 핵심이다. 여러 자료를 가로질러 종합한 답변은 어느 한 원자료에도 들어 있지 않기 때문에, 그 답변을 저장하지 않으면 다음에 같은 질문을 할 때 처음부터 다시 만들어야 한다.

운영 규범 절이 자료를 넣은 직후 바로 질문하라고 권하는 이유도 여기에 있다. 새 자료가 들어온 직후의 질문이 새 페이지와 기존 페이지를 함께 탐색하게 만들고, 그 결과가 finding으로 남으면 두 자료를 잇는 연결이 wiki 안에 명시적으로 기록된다.

### 검색 단계의 개선

초기 구현의 검색은 질문의 키워드를 slug 이름하고만 비교했다. 이 방식은 단어가 겹칠 때만 동작한다. README가 든 사례가 정확히 그 실패다. `"트랜스포머 어텐션"`이라는 질문과 `attention-is-all-you-need`라는 slug는 사람이 보기에 같은 주제지만, 문자열로는 겹치는 단어가 없어 매칭되지 않았다.

개선안은 이름 비교에 그래프 탐색을 결합한 3단계다.

| 단계 | 처리 | 산출 |
|---|---|---|
| 1. 키워드 매칭 | slug 이름 기준으로 후보를 고른다 | 시드 10개 |
| 2. BFS 1홉 확장 | 시드 페이지의 `[[wikilink]]`를 따라 이웃을 추가한다 | 시드와 1홉 이웃 |
| 3. 연결도 정렬 | wikilink가 많은 허브 페이지를 우선한다 | 토큰 예산 18,000자 안의 컨텍스트 |

1단계는 기존 방식을 그대로 두되 최종 답이 아니라 출발점으로 강등한다. 2단계가 이름은 안 겹치지만 연결은 되어 있는 페이지를 끌어온다. 앞의 사례에서 `attention-is-all-you-need`가 어떤 개념 페이지와 wikilink로 이어져 있다면, 그 개념 페이지가 시드로 뽑히는 순간 논문 페이지도 함께 들어온다. 3단계는 확장 결과가 예산을 넘칠 때 무엇을 남길지 정한다. 연결이 많은 페이지가 그 주제의 중심일 가능성이 높다는 가정이다.

개선 효과는 wiki 규모에 따라 다르다는 점이 함께 명시되어 있다.

| wiki 규모 | 체감 |
|---|---|
| 약 50페이지 이하 | slug 매칭의 한계가 거의 드러나지 않음 |
| 50페이지에서 150페이지 | query miss가 가끔 발생 |
| 150페이지 초과 | BFS 개선 효과가 뚜렷 |

페이지가 적으면 어떤 검색을 써도 대부분 맞으므로 개선이 눈에 띄지 않는다. 반대로 규모가 커지면 이름 매칭만으로는 놓치는 페이지가 누적된다. 즉 이 개선은 wiki가 자라야 값어치가 생기는 종류의 투자다.

### 트렌드 자동 수집

last30days 스킬이 Reddit, X/Twitter, Hacker News의 최근 30일 트렌드를 모은다. 실행 위치가 둘로 나뉜다.

| 위치 | 명령 | 역할 |
|---|---|---|
| Claude Code 세션 | `/last30days LLM 최신 트렌드 --deep` | 트렌드 수집 |
| 터미널 | `bash scripts/ingest_trends.sh` | vault로 인제스트 |
| 터미널 | `bash scripts/ingest_trends.sh --all` | 오늘 생성된 결과 전체 처리 |
| 터미널 | `bash scripts/ingest_trends.sh --copy-only` | 복사만 수행 |

README는 여기에 품질 경고를 붙인다. last30days 결과를 그대로 넣지 말고 핵심 3개에서 5개 항목만 남겨 정리한 뒤 인제스트하라는 것이다. 자동 수집기가 붙어 있어도 투입 판단은 사람이 한다는 원칙이 이 한 줄에 담겨 있다.

### Obsidian 플러그인 통합

| 플러그인 | 용도 | 설치 |
|---|---|---|
| Web Clipper | 웹 페이지를 `raw/`에 저장 | Chrome, Firefox 브라우저 확장 |
| Marp Slides | `--slides` 결과 미리보기 | Community Plugins에서 검색 |

두 플러그인이 파이프라인의 양쪽 끝을 맡는다. Web Clipper가 입구에서 자료를 받고, Marp Slides가 출구에서 결과를 보여준다.

### Discord 봇

같은 기능을 터미널 밖에서 부를 수 있도록 Discord 봇이 붙어 있다.

| 명령 | 설명 |
|---|---|
| `!query <질문>` | wiki를 탐색해 답한다 |
| `!query <질문> --diagram` | Mermaid 다이어그램을 만든다 |
| `!query <질문> --chart` | 차트 PNG 이미지를 전송한다 |
| `!query <질문> --archive` | 결과를 wiki에 자동 편입한다 |
| `!ingest` | `raw/`의 미처리 파일을 전부 ingest한다 |
| `!status` | wiki 현황을 요약한다 |

설정은 세 단계다. Discord Developer Portal에서 봇을 만들고, Bot Token을 `cp .env.example .env` 후 `.env`의 `DISCORD_TOKEN`에 저장하고, OAuth2의 bot scope로 Send Messages와 Attach Files 권한을 주어 서버에 초대한다. 실행은 `./wiki discord`다. 특정 채널에서만 동작하게 하려면 `.env`에 `DISCORD_CHANNEL_IDS`를 추가한다.

CLI 명령이 그대로 채팅 명령으로 대응되고 플래그 표기도 유지된다. 두 인터페이스를 따로 배울 필요가 없는 설계다.

### 상시 실행 설정

macOS의 launchd로 두 가지를 상시화한다. launchd는 macOS가 로그인 시점에 프로그램을 띄우고 종료를 감시하는 관리자다.

| 대상 | 등록 방법 | 해제 | 로그 |
|---|---|---|---|
| Discord 봇 | `~/Library/LaunchAgents/com.llmwiki.discord.plist`를 직접 작성한 뒤 `launchctl load` | `launchctl unload` | `/tmp/llm-wiki-discord.log` |
| `raw/` 감시 | `bash scripts/setup_launchd.sh` | `bash scripts/setup_launchd.sh --remove` | `/tmp/llm-wiki-watch.log` |

두 경로의 자동화 수준이 다르다. `raw/` 감시는 스크립트 한 줄로 끝나지만 Discord 봇은 사용자가 plist를 직접 작성해야 한다. README가 제시한 plist는 `ProgramArguments`에 저장소의 `wiki` 실행 파일과 `discord` 인자를 넣고, `WorkingDirectory`에 저장소 경로를 지정하며, `EnvironmentVariables`에 `DISCORD_TOKEN`을 넣는다. `RunAtLoad`와 `KeepAlive`가 모두 true이고 표준 출력과 표준 오류를 같은 로그 파일로 보낸다.

`KeepAlive: true` 때문에 봇이 예기치 않게 종료되어도 자동으로 다시 시작된다고 README가 설명한다.

두 경로가 만드는 결과는 성격이 다르다. `raw/` 감시는 사람이 파일을 저장하는 행위를 방아쇠로 삼아 자료 처리를 시작하고, Discord 봇은 채팅 메시지를 방아쇠로 삼아 같은 처리를 시작한다. 어느 쪽이든 사람이 명령을 확인하는 단계 없이 파일 생성과 LLM 호출이 이어진다는 점은 같다.

### 운영 규범

README는 명령 사용법과 별개로 운영 기준을 문서화했다. 기준선은 많이 넣는 것이 아니라 잘 넣는 것이 목적이라는 문장이다.

소스 품질 기준은 두 목록으로 제시된다.

- **넣어야 할 것**: 논문, 공식 문서, 심층 분석, 반복해서 참조하는 자료
- **넣지 말아야 할 것**: 단순 뉴스, 요약만 있는 슬라이드, 언젠간 읽겠지 하고 미뤄 둔 자료

핵심 습관은 세 가지다.

| 습관 | 주기 | 목적 |
|---|---|---|
| 자료를 넣은 직후 바로 query | 매번 | 방금 읽은 자료의 핵심을 기존 지식과 비교한다 |
| `./wiki lint --fix` 실행 | 2주에 한 번 | 링크와 색인의 어긋남을 정리한다 |
| 도메인 3개에 집중 | 상시 | 넓게 벌리지 않고 깊게 쌓는다 |

첫 번째 습관이 특히 이 시스템의 구조와 맞물린다. 자료를 넣은 직후에 던지는 질문은 새 페이지와 기존 페이지를 함께 탐색하게 만들고, 그 답변이 `--archive`로 finding에 저장되면 다음 질문의 재료가 된다.

## 결과

### 완료 상태

README의 Phase 표는 여섯 단계를 모두 완료로 표시한다.

| Phase | 내용 | 상태 |
|---|---|---|
| 1 | 디렉토리 구조, AGENTS.md, vault 네임스페이스 | 완료 |
| 2 | Ingest 파이프라인 | 완료 |
| 3 | Query 엔진 (텍스트, 슬라이드, 다이어그램, 차트) | 완료 |
| 4 | Lint (dead link, orphan, 모순 탐지) | 완료 |
| 5 | CLI, 설정, 플러그인 가이드 | 완료 |
| 6 | BFS 컨텍스트 확장과 토큰 예산 | 완료 |

Phase 1이 구조와 규칙을 세우고 2와 3이 입출력을 만들고 4가 건강 점검을 붙인 뒤, 5가 사용성을 마감하고 6이 검색 품질을 다시 손보는 순서다. 마지막 단계가 앞서 만든 기능의 개선이라는 점에서, 이 저장소가 기능 추가보다 검색 품질을 우선했음을 알 수 있다.

### 개선 로드맵

검색 개선은 두 버전으로 나뉘어 기록되어 있고 둘 다 완료 상태다.

| 버전 | 내용 | 상태 |
|---|---|---|
| v1 | BFS 1홉 확장, 연결도 정렬, 토큰 예산 | 완료 |
| v2 | full-text 본문 스캔으로 slug 매칭 교체 (slug 3배, 본문 빈도 1배) | 완료 |

v1이 그래프 구조를 이용해 이름 매칭의 빈틈을 메웠다면, v2는 매칭 대상 자체를 slug 이름에서 본문으로 넓혔다. 가중치를 slug 3배와 본문 빈도 1배로 둔 것은 slug 일치를 더 강한 신호로 보되 본문에만 나오는 단어도 무시하지 않겠다는 절충이다.

### 수치 요약

| 항목 | 값 |
|---|---|
| CLI 명령 | 6종 (`ingest`, `query`, `watch`, `lint`, `status`, `discord`) |
| Discord 명령 | 3종 (`!query`, `!ingest`, `!status`) |
| 출력 포맷 | 4종 (텍스트, Marp, Mermaid, matplotlib) |
| wiki 페이지 유형 | 4종 (`summaries`, `concepts`, `entities`, `findings`) |
| lint 검사 | 기본 3종에 `--deep` 모순 탐지 1종 |
| 검색 시드 수 | 10개 |
| 토큰 예산 | 18,000자 |
| 트렌드 수집 범위 | 최근 30일, 3개 플랫폼 |
| 권장 트렌드 인제스트 항목 | 3개에서 5개 |
| 권장 lint 주기 | 2주에 한 번 |
| 권장 집중 도메인 수 | 3개 |

### 측정치의 부재

정량 지표는 README에 없다. 처리 시간, 토큰 사용량, 검색 정확도 같은 값이 제시되지 않으므로 BFS 개선이 얼마나 효과가 있었는지는 수치로 확인할 수 없다.

대신 규모별 체감 품질 표가 정성 기준의 역할을 한다. 이 표는 벤치마크가 아니라 사용자가 자기 wiki의 상태를 스스로 가늠하도록 만든 안내에 가깝다.

### 완료 표기가 뜻하는 것과 뜻하지 않는 것

Phase 여섯 단계와 로드맵 두 버전이 모두 완료로 적혀 있지만, 이 표기가 확인해 주는 범위는 제한적이다.

| 표기가 뜻하는 것 | 표기가 뜻하지 않는 것 |
|---|---|
| 해당 기능이 구현되었다고 저자가 선언했다 | 기능이 어느 규모에서 어느 정확도로 동작하는지 |
| 개발 순서가 구조, 입출력, 점검, 사용성, 검색 개선 순이었다 | 각 단계에 얼마나 걸렸고 무엇이 어려웠는지 |
| 검색 개선이 마지막 두 단계를 차지했다 | 개선 전후의 검색 실패율이 얼마나 달라졌는지 |

우리 자료가 README 한 편이라는 사정이 여기에 겹친다. 완료 표기의 근거가 되는 코드가 저장소에 없으므로, 이 페이지는 기능이 존재한다는 주장을 그대로 옮길 수 있을 뿐 검증할 수는 없다.

### 같은 패턴을 다룬 다른 자료와의 위치

우리 wiki가 보유한 Karpathy 패턴 관련 자료를 자료 유형과 언어로 늘어놓으면 이 저장소의 자리가 드러난다.

| 페이지 | 자료 유형 | 언어 | 성격 |
|---|---|---|---|
| 본 자료 | repo | 한국어 | 명령줄 도구의 사용법과 운영 규범 |
| [[applications/agricidaniel-claude-obsidian]] | repo | 영어 | Claude Code 통합 형태의 구현 |
| [[applications/joonan30-llm-wiki-labs]] | repo | 한국어 | 실제 운영 기록을 정리한 케이스 스터디 |
| [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]] | article | 영어 | 패턴 자체를 설명하는 입문 가이드 |
| [[applications/kmyu-2026-llm-wiki-pattern-synthesis]] | article | 한국어 | 여러 구현을 묶은 자체 종합 정리 |

같은 패턴이라도 자료가 답하는 질문이 다르다. 입문 가이드는 패턴이 무엇인지, 구현 저장소는 어떻게 쓰는지, 케이스 스터디는 실제로 써 보면 어떤지에 답한다. 본 자료는 두 번째 자리에 있으면서 운영 규범 절을 통해 세 번째 질문에도 부분적으로 답한다.

## 한계

1. **자료 범위의 제약**. 우리가 보유한 원본은 README 한 편이다. 커밋 `0507ad0`이 전체 클론을 스텁으로 경량화하면서 `AGENTS.md`, `config.yaml`, `requirements.txt`, `scripts/` 하위 코드가 사라졌다. 그래서 프롬프트 구조, 응답 파싱 방식, 페이지 frontmatter 스키마, slug 생성 규칙, 코드 규모 같은 내부 구현 세부는 확인할 수 없다.

2. **라이선스 미표기**. README 본문 어디에도 라이선스 안내가 없다. fork, 인용, 재배포 전에 저자 의사를 확인해야 한다. 우리 wiki가 기록한 형제 구현들이 대부분 라이선스를 명시한 것과 대비된다.

3. **Claude Code CLI 의존**. 필요 조건에 Claude Code CLI가 들어 있어 인증과 요금이 사용자에게 전가된다. 자체 API 키 관리를 없앤 대가로 실행 환경 요구가 커졌다.

4. **자동 실행 경로의 권한 노출**. `./wiki watch`와 launchd 등록은 사람의 확인 없이 파일 생성과 LLM 호출이 이어지는 경로다. README는 이 경로의 sandbox 가드나 권한 검토 절차를 다루지 않는다. Discord 봇 plist는 `EnvironmentVariables`에 `DISCORD_TOKEN`을 평문으로 넣도록 안내하므로, plist 파일 자체가 자격 증명 보관 위치가 된다.

5. **검색 정밀도의 원리적 한계**. 개선 후에도 검색은 slug 이름 매칭, wikilink 1홉 확장, 본문 빈도 세 가지에 기댄다. 임베딩이나 의미 유사도를 쓰지 않으므로 표현이 다른 동의어 질문은 여전히 놓칠 수 있다. README가 든 예시 자체가 이 취약점을 보여주는 사례다.

6. **컨텍스트 예산의 상한**. 토큰 예산 18,000자 안에서만 페이지를 담는다. wiki가 커질수록 담기지 못하는 페이지의 비율이 늘어나며, 무엇을 버릴지는 연결도 정렬 하나로 정해진다. 연결이 적지만 질문에 정확히 맞는 페이지가 밀려날 여지가 남는다.

7. **모순 탐지의 비용**. `--deep`은 LLM 호출이라 느리다고 README가 직접 적는다. 어느 규모까지 실용적인지, 얼마나 자주 실행해야 하는지는 제시되지 않는다.

8. **macOS 종속**. 상시 실행 안내가 launchd와 plist 한정이다. Linux의 systemd나 Windows의 작업 스케줄러 대응 안내가 없다.

9. **품질 관리를 사람 규범에 위임**. 소스 품질 기준과 핵심 습관은 자동 검사가 아니라 문서상의 권고다. last30days 결과를 3개에서 5개로 추리라는 지침도 사람이 매번 수행해야 한다. `lint --fix`의 자동 수정 범위 역시 자동 수정 가능한 항목이라고만 되어 있어 경계가 불분명하다.

10. **규모 기준의 내적 불일치**. BFS 절은 wiki가 50페이지를 넘어갈수록 효과가 체감된다고 적지만, 바로 아래 표는 50페이지에서 150페이지 구간을 query miss가 가끔 발생하는 구간으로, 150페이지 초과를 개선 효과가 뚜렷한 구간으로 나눈다. 두 서술의 기준선이 어긋난다.

11. **부트스트랩 절차의 중복**. `scripts/setup.py`와 `scripts/setup_vault.sh`가 모두 디렉토리 생성을 언급하지만 역할 구분이 문서화되어 있지 않다. 처음 설치하는 사용자가 어느 쪽을 먼저 실행해야 하는지 판단할 근거가 README에 없다.

12. **검색 개선의 효과가 검증되지 않음**. v1과 v2가 모두 완료로 표시되어 있지만 개선 전후를 비교한 수치가 없다. v2가 도입한 slug 3배와 본문 빈도 1배라는 가중치가 어떤 근거로 정해졌는지도 제시되지 않는다. 검색 품질을 두 단계에 걸쳐 손봤음에도 그 결과를 측정할 방법이 저장소 안에 없다는 점이, 앞서 언급한 정량 지표 부재의 가장 구체적인 사례다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| vault | Obsidian이 하나의 wiki로 인식하는 폴더. `config.yaml`의 `vault_path`가 가리킨다 |
| wikilink | `[[slug]]` 형태의 페이지 간 링크. Graph View의 간선이자 검색 확장의 경로다 |
| ingest | `raw/`의 마크다운을 읽어 wiki 페이지로 컴파일하는 단계 |
| query | 자연어 질문으로 wiki를 탐색해 답을 만드는 단계. 출력 형식을 플래그로 고른다 |
| finding | query 답변을 `wiki/findings/`에 파일링한 페이지. 다음 query가 탐색 대상으로 흡수한다 |
| BFS 1홉 확장 | 검색 시드 페이지의 wikilink를 한 단계만 따라가 이웃을 컨텍스트에 넣는 방식 |
| 토큰 예산 | query 컨텍스트에 담을 수 있는 분량 상한. 이 저장소는 18,000자로 둔다 |

## 관련 페이지

- [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]]: 같은 Karpathy 패턴을 다룬 영문 입문 가이드. 본 자료가 패턴의 한국어 구현이라면 그 자료는 패턴 자체의 설명이다.
- [[applications/agricidaniel-claude-obsidian]]: 같은 패턴을 Claude Code 통합 형태로 구현한 영문 저장소. 본 자료가 셸에서 부르는 CLI라면 그 자료는 Claude Code 안에서 동작한다.
- [[applications/joonan30-llm-wiki-labs]]: 같은 패턴을 한국어로 운영한 실측 케이스 스터디. 본 자료가 도구와 사용법의 명세라면 그 자료는 운영 기록이다.
- [[applications/kmyu-2026-llm-wiki-pattern-synthesis]]: Karpathy 패턴을 한국어로 종합 정리한 자체 페이지.
- [[applications/kmyu-2026-akb-llmwiki-gbrain-comparison]]: 여러 지식 베이스 구현체를 비교한 자체 보고서. 본 자료가 llmwiki 계열의 사례로 들어간다.
- [[applications/lum1104-understand-anything]]: 자료를 읽어 정리물을 만드는 인접 저장소.
- [[applications/safishamsi-graphify]]: 입력을 지식 그래프로 바꾸는 접근. wiki 페이지 대신 그래프를 산출물로 두는 대비 사례다.
- [[applications/colbymchenry-codegraph]]: 코드베이스를 그래프로 분석하는 저장소. 대상이 문서가 아니라 코드라는 점이 다르다.
