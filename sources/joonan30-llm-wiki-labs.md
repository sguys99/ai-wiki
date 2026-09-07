---
title: "LLM-Wiki Labs: Joonan Lab 인터랙티브 모음"
type: repo
year: 2026
category: applications
raw_path: raw/repos/joonan30-llm-wiki-labs.md
raw_filename: "joonan30-llm-wiki-labs.md"
source_collection: external
org: "joonan30"
repo: "llm-wiki-labs"
url: "https://github.com/joonan30/llm-wiki-labs"
license: "MIT"
authors: "Joon-Yong An (안준용)"
institution: "Joonan Lab, Korea University"
live_url: "https://joonan30.github.io/llm-wiki-labs/"
tags: [llm-wiki, case-study, ai-native-research, interactive-page, static-site, role-based-reading, design-system, korean]
---

## 한 줄 요약 (One-line Summary)

Joonan Lab이 자기 연구실의 AI Native 연구 시스템(LLM-Wiki)을 어떻게 만들고 운영하는지를 인터랙티브 웹 페이지로 공개하는 GitHub 저장소다. 현재 수록된 lab은 `Evolution` 한 편(2026-05-08)이며, README는 그 내용을 31일간의 LLM-Wiki 진화 케이스 스터디와 처음 한 시간 가이드, 실제 워크플로 5개로 소개한다. 학부생부터 PI까지 네 역할의 렌즈로 같은 콘텐츠를 다르게 읽도록 설계했고, 각 lab은 단일 HTML 파일이라 외부 의존성이 Google Fonts 한 줄뿐이다. MIT 라이선스로 공개되어 fork와 remix가 자유롭다.

> **수집 범위 주의**: `raw/repos/joonan30-llm-wiki-labs.md`는 README 본문만 담은 스텁이다. lab 실물에 해당하는 `evolution/` 디렉토리의 HTML은 이 저장소에 없다. 따라서 아래 서술은 README가 직접 적은 문장에만 근거하며, 31일 케이스 스터디 안의 실측치, 워크플로 5개의 구체 내용, 처음 한 시간 가이드의 항목은 확인할 수 없다.

## 1. 자료 정보 (Document Information)

- **Repo**: `joonan30/llm-wiki-labs` (https://github.com/joonan30/llm-wiki-labs)
- **Live**: https://joonan30.github.io/llm-wiki-labs/ (github.io 도메인의 정적 배포)
- **저자**: Joon-Yong An (안준용), Korea University
- **연구실**: Joonan Lab
- **라이선스**: MIT. README는 "fork와 remix 자유"라고 덧붙인다
- **수집 원본**: README 본문 약 40줄 (`raw/repos/joonan30-llm-wiki-labs.md`, 약 2KB)
- **수록 lab**: 1편

| # | Title | Date | README가 적은 설명 |
|---|---|---|---|
| 01 | Evolution (`evolution/`) | 2026-05-08 | 31일간의 LLM-Wiki 진화 케이스 스터디, 처음 한 시간 가이드, 실제 워크플로 5개 |

> **이 자료가 ai-wiki에 들어오는 이유**: 연구실 단위로 LLM Wiki 형태의 지식 베이스를 세우고 운영한 경험을 한국어로 공개한 사례이기 때문이다. 본 ai-wiki가 다루는 같은 주제군의 다른 자료들이 도구와 구조를 설명하는 쪽이라면, 이 저장소는 그 결과물을 어떻게 읽히게 만들 것인가라는 전달 형식을 다룬다.

## 2. 주요 기여 (Key Contributions)

1. **연구실 운영 방식의 인터랙티브 공개**. README가 저장소의 목적을 "연구실의 AI 위키 시스템(LLM-Wiki)을 어떻게 만들고 운영하는지를 인터랙티브 페이지로 보여주는 모음"으로 규정한다. 산출물이 문서가 아니라 브라우저에서 읽는 페이지다.

2. **네 역할 렌즈 설계**. 같은 콘텐츠를 학부생부터 PI까지 네 역할이 다르게 읽도록 설계했다고 밝힌다. 이름이 적힌 역할은 양 끝의 학부생과 PI 둘뿐이고 중간 두 역할은 README에 없다.

3. **단일 HTML 파일 배포 모델**. 각 lab은 단일 HTML 파일이고 외부 의존성은 Google Fonts 한 줄뿐이며, 그래서 어떤 정적 호스팅에서도 그대로 작동한다고 주장한다. 빌드 도구와 서버 런타임이 필요 없다.

4. **디자인 시스템의 명문화**. OKLCH 5색 팔레트와 3종 폰트 조합을 README에 직접 고정하고, 참고한 디자인 철학의 출처까지 링크로 남겼다.

5. **번호가 매겨진 lab 목록**. Labs 표가 `#` 열을 두고 `01`부터 시작한다. 편 단위로 추가하는 모음집 구조를 전제한 표기다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 저장소 구성

README가 드러내는 구조는 최상위 인덱스와 lab별 디렉토리 두 층이다. Labs 표의 링크가 `evolution/`이라는 상대 경로를 가리키므로 lab 하나가 디렉토리 하나에 대응한다.

| 층 | 역할 |
|---|---|
| 저장소 최상위 | Labs 목록을 담은 인덱스. 각 lab 디렉토리로 링크한다 |
| `evolution/` | lab 01의 실물 페이지가 들어 있는 디렉토리 |

### 배포와 로컬 실행

배포본은 github.io 도메인에서 열린다. 로컬에서는 저장소를 받아 정적 서버를 띄우는 것으로 끝난다.

```bash
git clone https://github.com/joonan30/llm-wiki-labs.git
cd llm-wiki-labs
python3 -m http.server 8000
# open http://localhost:8000/
```

의존성 설치 단계가 없다는 점이 이 세 줄의 핵심이다.

### 디자인 시스템

README는 색, 타이포그래피, 영향을 받은 출처를 각각 한 항목씩 적는다.

| 구분 | 내용 |
|---|---|
| Color | OKLCH 5색 팔레트 (테라코타, 모스, 사프란, 멀버리, 버디그리스) |
| Typography | Newsreader (display), IBM Plex Sans (body), JetBrains Mono (code) |
| Inspired by | ConardLi의 `garden-skills` 저장소에 있는 web-design-engineer 디자인 철학 |

인용한 디자인 철학의 요지로는 AI 클리셰 회피, 의도된 타이포 대비, 미세 인터랙션 세 가지가 적혀 있다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README에는 성능 수치, 벤치마크 결과, 사용자 통계가 없다. 확인 가능한 정량 정보는 구성에 관한 것뿐이다.

| 항목 | 값 | 근거 |
|---|---|---|
| 수록 lab 수 | 1편 | Labs 표에 `01` 한 행 |
| lab 01 공개 날짜 | 2026-05-08 | Labs 표 Date 열 |
| lab 01의 구성 요소 | 3종 (케이스 스터디, 처음 한 시간 가이드, 워크플로 5개) | Labs 표 Description 열 |
| 케이스 스터디 관찰 기간 | 31일 | Labs 표 Description 열 |
| 역할 렌즈 수 | 4 | "학부생부터 PI까지 4역할 렌즈" |
| lab 하나당 파일 수 | 1 (단일 HTML) | "각 lab은 단일 HTML 파일로" |
| 외부 의존성 | 1 (Google Fonts) | "외부 의존성은 Google Fonts 한 줄뿐" |
| 색 팔레트 크기 | 5색 | Design 절 |
| 폰트 수 | 3종 | Design 절 |

31일이라는 숫자와 워크플로 5개라는 숫자는 lab 본문의 내용을 요약한 표현이므로, README 밖의 근거로는 검증되지 않는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 수집 범위에서 오는 한계

- **raw가 README 스텁이라 내부 구현 세부는 확인 불가**하다. lab 실물인 `evolution/index.html`이 남아 있지 않아 31일 케이스 스터디의 단계 구분과 실측치, 처음 한 시간 가이드의 항목, 워크플로 5개의 내용을 인용할 수 없다. 다룰 수 있는 범위는 목적과 배포 방식과 디자인 규격까지다.
- **네 역할 가운데 두 역할의 이름을 알 수 없다.** README는 양 끝만 적었다.
- **케이스 스터디의 관찰 시작일이 없다.** 31일이라는 기간과 2026-05-08이라는 공개 날짜만 있어서 관찰 구간을 특정할 수 없다.

### 자료 자체의 한계

- **수록 lab이 1편뿐**이다. Labs 표가 번호를 매긴 확장 구조를 전제하지만 현재는 첫 편만 있어, 모음집이라는 형식이 유지될지는 후속 공개에 달려 있다.
- **케이스 스터디가 단일 연구실의 자기 기록**이다. README가 연구실 하나의 시스템을 보여주는 자료라고 스스로 규정하므로 표본 수는 1이다. 다른 연구실이 같은 결과를 얻는다는 근거는 README 범위 안에 없다.
- **인터랙티브 페이지 형식의 대가**가 있다. 단일 HTML은 배포에 유리하지만 문단 단위 인용과 외부 참조에는 마크다운보다 불리하다. 이 저장소를 ai-wiki로 가져올 때 본문이 남지 않은 것이 그 사례다.
- **재현 절차가 없다.** README는 무엇을 만들었는지 소개하지만, 케이스 스터디를 어떤 방법으로 관찰하고 기록했는지는 적지 않는다.

### 후속이 풀어야 할 질문

- lab 본문을 마크다운 등 인용 가능한 형식으로도 함께 제공할 것인가.
- 네 역할 렌즈가 실제로 독자별 이해도를 갈랐는지에 대한 사후 확인이 있는가.
- 두 번째 lab이 추가될 때 인덱스와 디자인 시스템이 어떻게 확장되는가.

## 6. 관련 연구 (Related Work)

### 본 ai-wiki 내 관련 페이지

- **[[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]]**: LLM Wiki 패턴의 영어권 입문 튜토리얼. 개인 사용자의 시작 절차를 다루는 쪽이다.
- **[[applications/kmyu-2026-llm-wiki-pattern-synthesis]]**: 본 ai-wiki 소유자의 LLM Wiki 패턴 한국어 종합. 패턴의 구조와 규모 한계를 논한다.
- **[[applications/dragon1086-llm-wiki]]**: 같은 LLM Wiki 계열의 다른 한국어 구현 사례.
- **[[applications/agricidaniel-claude-obsidian]]**: LLM Wiki 형태의 지식 베이스를 Claude Code 스킬과 Obsidian vault로 구현한 사례. 공개 대상이 구현 구조다.
- **[[applications/kmyu-2026-akb-llmwiki-gbrain-comparison]]**: 지식 베이스 세 종의 비교 페이지.
- **[[applications/lum1104-understand-anything]]**: 코드베이스를 분석해 지식 그래프와 가이드 투어를 만드는 도구. 산출물을 사람이 읽는 형태로 내놓는 점이 겹친다.

### README가 직접 인용한 외부 참조

- **ConardLi, `garden-skills` (web-design-engineer)**: 디자인 영감의 출처로 링크와 함께 명시된다. 요지는 AI 클리셰 회피, 의도된 타이포 대비, 미세 인터랙션이다.
- **OKLCH 색 공간**: 5색 팔레트의 표현 방식으로 명시된다. README는 색 이름만 적고 좌표값은 적지 않는다.
- **Newsreader, IBM Plex Sans, JetBrains Mono**: Google Fonts로 불러오는 3종 폰트다.

## 7. 용어집 (Glossary)

- **LLM-Wiki**: README가 연구실의 AI 위키 시스템을 부르는 이름이다. 이 저장소는 그 시스템 자체가 아니라 그것을 소개하는 페이지 모음이다.
- **lab**: 이 저장소에서 인터랙티브 페이지 한 편을 세는 단위다. 디렉토리 하나에 단일 HTML 파일 하나가 대응한다.
- **Evolution**: lab 01의 이름. 31일간의 LLM-Wiki 진화 케이스 스터디를 담는다고 README가 적는다.
- **4역할 렌즈**: 같은 페이지를 네 역할이 다르게 읽도록 설계한 장치다. README에 이름이 적힌 역할은 학부생과 PI 둘이다.
- **AI 클리셰 회피**: 인용한 디자인 철학의 항목 가운데 하나로, 생성형 도구로 만든 페이지에서 반복적으로 나타나는 시각적 인상을 피한다는 뜻이다.
- **단일 HTML 배포**: 빌드 산출물이나 런타임 없이 HTML 파일 하나를 그대로 정적 호스팅에 올리는 방식이다.
