---
title: "LLM Wiki — Karpathy LLM Knowledge Base 패턴의 한국어 레퍼런스 구현"
type: repo
year: 2026
category: applications
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/repos/dragon1086-llm-wiki
raw_filename: "dragon1086-llm-wiki/"
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
  - watchdog
  - launchd
  - macos
  - korean
---

## 한 줄 요약 (One-line Summary)

**Andrej Karpathy의 LLM Knowledge Base 패턴**(`gist/karpathy/442a6bf5...`)을 **Claude Code CLI**를 워크호스로 삼아 **Obsidian Vault 위에서 자동 컴파일·운영**하는 한국어 레퍼런스 구현체. `raw/` 디렉토리에 마크다운 소스를 떨어뜨리면 `python scripts/wiki.py ingest --all` 한 줄로 `summaries/·entities/·concepts/` 페이지를 만들고 교차참조하며, `query`는 wiki를 탐색·합성해서 텍스트·Marp 슬라이드·Mermaid 다이어그램·matplotlib 차트 중 선택된 출력 형식으로 `output/`에 떨어뜨린다. `lint`는 dead wikilinks·orphans·index drift를 잡아내고, `watch`는 `watchdog` + macOS `launchd`로 백그라운드에서 raw/ 폴더를 감시한다. 5개 Python 스크립트(1,228줄) + 2개 셋업 스크립트로 짜여진 **미니멀 시스템 코드 + Obsidian Vault(데이터 분리)** 구조다.

## 1. 자료 정보 (Document Information)

- **Repo**: `dragon1086/llm-wiki` (https://github.com/dragon1086/llm-wiki, branch `main`)
- **라이선스**: 명시 안 됨 (LICENSE 파일 없음, README에도 미언급) — 사용·인용 전 저자 문의 권장
- **시스템 구성**: 시스템 코드(이 repo, ~1.5K 라인)와 **데이터(Obsidian Vault `obsidian-vault/llm-wiki/`)** 가 물리적으로 분리됨. `config.yaml`의 `vault_path` 한 줄로 vault 위치 지정
- **언어**: 한국어 (README·AGENTS.md 본문, 프롬프트, 로그·CLI 메시지 전부 한국어)
- **출처 헌사**: README가 Karpathy의 원문 gist를 명시적으로 인용 — "Andrej Karpathy의 LLM Knowledge Base 패턴 구현체"
- **의존성**: Python 3.10+, `claude` CLI(Claude Code), Obsidian. PyPI는 `pyyaml`, `click`, `matplotlib`, `watchdog` 4개뿐
- **Phase 상태표**(README §"Phase 현황"): Foundation·Ingest·Query·Lint·CLI **5단계 전부 ✅ 완료**로 표기. 단일 PI·1인 운영을 노린 폐쇄 완성형 시스템임을 자처
- **자료 유형**: type = `repo` — README + AGENTS.md + 5개 핵심 스크립트(`wiki.py`/`ingest.py`/`query.py`/`lint.py`/`utils.py`) + 2개 셋업 스크립트(`setup_vault.sh`/`setup_launchd.sh`)
- **이미지**: 원본 repo에 png·svg·gif **0개** — figures 키 생략(시스템 다이어그램이나 스크린샷 없이 텍스트만으로 운영 규칙을 명세함)

> **이 자료가 ai-wiki에 들어오는 이유**: [[applications/agricidaniel-claude-obsidian]](Karpathy 패턴 영문 plugin형), [[applications/joonan30-llm-wiki-labs]](인터랙티브 31일 운영 케이스 스터디), [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]](영문 입문 가이드)에 이어, 본 자료는 한국어 토대의 **claude CLI subprocess 호출 기반 미니멀 레퍼런스 구현**이다. 우리 ai-wiki repo의 운영 방식(3-tier raw/sources/wiki + 카테고리 분류 + index.md)과 가장 가까운 형제 패턴이며, **Vault와 시스템 코드를 분리**해 두고 **launchd로 24/7 자동 감시**를 묶었다는 차이가 직접 비교 포인트.

## 2. 주요 기여 (Key Contributions)

1. **`config.yaml` 한 줄 + setup_vault.sh 한 번**으로 부트스트랩 — `vault_path: /Users/<your-name>/path/to/obsidian-vault/llm-wiki` 한 줄만 채우면 `setup_vault.sh`가 `wiki/{concepts, entities, summaries, findings}`·`output/`·`raw/`을 만들고 `index.md`(타입드 frontmatter: `total_pages: 0`·`total_summaries: 0`·…)과 `log.md`·`lint_ignore.txt` 4개 시드 파일을 깔아준다. 코드 0줄로 vault가 가동 상태가 된다.

2. **`claude --dangerously-skip-permissions -p <prompt>` subprocess 호출이 백본** — 자체 LLM API 키 관리 없이 사용자의 **로컬 Claude Code 인증**을 그대로 빌려 쓴다. `utils.call_claude()`(scripts/utils.py:172)는 `subprocess.Popen` + `communicate(timeout=300)` + 명시적 `kill()`/`communicate()`로 **고아 프로세스·좀비를 차단**한다. `--debug` 플래그를 켜면 raw 응답을 `/tmp/llm-wiki-debug.txt`에 저장해 프롬프트를 디버깅한다.

3. **응답 파싱은 정규식 3종으로 명시화** — Claude 응답을 `===FILE: <path>===<content>===END===`, `===INDEX_UPDATE: <section> | <slug> | <desc>===`, `===LOG: <msg>===` 세 가지 안전 sentinel로 묶고(`scripts/ingest.py:83`), LLM 응답 첫 글자를 `=`로 못박는 `프롬프트 최우선 규칙`으로 잡설을 막는다. 파싱 실패 시(`FILE 블록 0개`) `RuntimeError`를 던지며, 응답 첫 500자 미리보기를 에러에 포함해 디버깅을 돕는다.

4. **4종 페이지 타입 + frontmatter 스키마 명세**(AGENTS.md §"Page Types & Frontmatter") —
   - **`summary`**: 소스 1개당 1개. `topics·entities·concepts` 배열 + `source_file: raw/<파일명>` + `date_ingested` 4-key.
   - **`concept`**: 여러 소스를 종합한 개념 아티클. `aliases·related·sources` 배열 + `confidence: high|medium|low` 자기보고 신뢰도.
   - **`entity`**: 인물·조직·도구·데이터셋·논문 등 고유명사. `entity_type: person|org|tool|dataset|paper|other` 분류.
   - **`finding`**: Query 결과에서 파생된 synthesis. `query·output_files` 키로 출력 산출물과 묶임.
   소스 1개당 통상 **10–20개 페이지 갱신**을 명시적 SLA로 둔다(AGENTS.md §"Ingest Protocol" 끝줄).

5. **4가지 출력 포맷 분기를 `--text|--slides|--diagram|--chart` 플래그로 통일**(scripts/query.py:59) —
   - `--text` (기본): `output/<slug>.md` 일반 마크다운
   - `--slides`: `output/<slug>.marp.md` — Marp frontmatter(`marp: true`) 자동 포함, Obsidian의 **Marp Slides** 커뮤니티 플러그인으로 즉시 미리보기
   - `--diagram`: `output/<slug>.md` 안에 ```` ```mermaid ```` 코드블록 — flowchart/sequence/ER 등을 LLM이 자율 선택
   - `--chart`: LLM이 **matplotlib Python 코드를 생성**(`output/<slug>.py`) → 그 코드를 `subprocess`로 돌려 PNG 산출(`scripts/query.py:208 execute_chart`). `plt.savefig('{png_path}')`를 마지막 줄에 박고 `plt.show()`는 금지해 백그라운드에서 안전하게 돌린다
   파일 안에 결과만 떨어뜨리는 게 아니라 **Finding 페이지**(`wiki/findings/<slug>.md`)에 `![[output/<png>]]` 또는 `[[<md>]]`로 임베드 — 답변을 wiki에 재파일링해 다음 query가 컨텍스트로 흡수한다.

6. **`lint` 4-검사 + `--fix` 자동 수리**(scripts/lint.py:240 `run_lint`) —
   - **Dead wikilinks** — `[[slug]]`가 실제 파일 없는 경우 (`scripts/lint.py:70`)
   - **Orphan pages** — index.md 포함 어디서도 참조되지 않는 페이지
   - **Index drift** — wiki 파일 ↔ index.md 불일치 양방향(누락·dangling)
   - **Contradictions** (`--deep`): Claude를 호출해 페이지 간 모순 LLM 탐지(최대 30 페이지 × 2,000자 truncate)
   `lint --fix`는 dangling index 항목만 자동으로 지운다(파일 생성·dead link 수정은 사람 검토 영역으로 분리). `lint_ignore.txt`에 `wikilink·slug·파일명` 같은 메타 슬러그 예외 등록 가능.

7. **`watch` + `setup_launchd.sh`로 macOS 24/7 자동 ingest** — `watchdog.Observer`가 `raw/` 디렉토리의 `.md` 신규 생성을 감지하면 **1초 대기**(파일 쓰기 완료 보장) 후 `run_ingest`를 자동 호출한다(`scripts/wiki.py:115`). 이를 `com.llmwiki.watch` launchd 라벨로 `~/Library/LaunchAgents/`에 plist 등록 → 로그인할 때마다 백그라운드 자동 시작·비정상 종료 시 자동 재시작(`KeepAlive: true`, `ThrottleInterval: 10`). **Obsidian Web Clipper로 raw/에 .md를 저장하는 순간 wiki가 갱신**되는 zero-friction 워크플로우가 완성된다.

8. **Obsidian Web Clipper + Marp for Obsidian 통합 가이드** — README §"Obsidian 플러그인 설치"가 (a) Web Clipper의 **Default location: `raw/`** 설정 + 권장 Template(`---\nsource: "{{url}}"\ndate: "{{date}}"\n---\n\n# {{title}}\n\n{{content}}`)과 (b) Marp Slides 커뮤니티 플러그인(`.marp.md` 자동 인식)을 한 페이지에 묶었다. 시스템 외부 도구 통합까지 한국어 가이드.

9. **`log.md` 단일 append-only 운영 로그** — 모든 변경(`INGEST·QUERY·LINT·BOOTSTRAP·MANUAL`) 5종 타입을 `[YYYY-MM-DD HH:MM] [TYPE] message` 한 줄로 append. `wiki status` 명령은 카테고리별 페이지 카운트(`summaries/concepts/entities/findings`)와 **최근 로그 5건**을 출력 — wiki 건강 상태를 30초 안에 파악한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 디렉토리 분리: 시스템 코드 ↔ Vault(데이터)

```
llm-wiki/                       ← git repo (시스템 코드, ~1.5K LOC)
├── AGENTS.md                   ← LLM 운영 규칙 (system prompt 원천)
├── config.yaml                 ← vault_path 1줄
├── requirements.txt            ← pyyaml, click, matplotlib, watchdog
└── scripts/
    ├── wiki.py                 ← CLI 엔트리(click) — ingest/query/watch/lint/status/list-raw
    ├── ingest.py               ← raw/ → wiki 컴파일 + 응답 파싱 + 파일 쓰기
    ├── query.py                ← wiki 탐색 + claude 호출 + output/findings 파일링
    ├── lint.py                 ← dead/orphans/drift/contradictions
    ├── utils.py                ← config/slug/log/index/claude CLI 공통 헬퍼
    ├── setup_vault.sh          ← vault 디렉토리 시드 + index.md/log.md/lint_ignore.txt 초기화
    └── setup_launchd.sh        ← macOS launchd plist 등록·해제

obsidian-vault/llm-wiki/        ← Obsidian Vault (데이터, git 추적 안 함)
├── raw/                        ← Web Clipper/수동 .md 투하 지점
├── wiki/
│   ├── index.md                ← LLM이 카운터·섹션 자동 유지
│   ├── log.md                  ← append-only 운영 로그
│   ├── lint_ignore.txt         ← lint 예외 slug
│   ├── concepts/               ← 개념 페이지 (kebab-case)
│   ├── entities/               ← 인물·조직·도구 페이지
│   ├── summaries/              ← 소스별 요약 (raw/와 1:1)
│   └── findings/               ← query 파생 synthesis
└── output/                     ← Marp 슬라이드, 다이어그램, 차트 PNG
```

분리의 핵심은 (i) **시스템 코드는 git으로 버전관리**하면서 (ii) **vault는 사용자별 로컬 자료**를 그대로 두고 (iii) `config.yaml`만 다르게 두면 같은 시스템 코드가 여러 vault를 운영하도록 만든 데 있다.

### 3.2 Ingest 파이프라인 (raw → wiki)

`run_ingest(source_file)`(scripts/ingest.py:148)의 6-step 흐름:

1. **소스 로드**: `raw/<file>.md` 전문 + `AGENTS.md` 전문(=LLM system prompt) + `list_wiki_pages()`로 현재 vault의 모든 slug 목록(중복 방지용) 수집
2. **프롬프트 합성**(`build_ingest_prompt`): 4-block 구조 — `## 출력 형식 (최우선 규칙)` + `## Wiki 스키마 (AGENTS.md)` + `## 현재 Wiki 상태` + `## 처리할 소스`. 첫 글자를 `=`로 못박아 LLM의 잡설을 봉쇄
3. **claude CLI 호출**: `call_claude(prompt, timeout=300)` — `subprocess.Popen` + `communicate(timeout)` 패턴. timeout 시 `proc.kill() + communicate()`로 좀비 회수
4. **응답 파싱**(`parse_claude_output`, scripts/ingest.py:93): `===FILE:===…===END===` 정규식으로 페이지 N개 추출, `===INDEX_UPDATE:===` 로 카테고리·slug·desc 추출, `===LOG:===` 로 로그 메시지 추출
5. **파일 쓰기**(`write_pages`): vault 경로 기준 `mkdir -p parents` + `write_text(encoding="utf-8")`. 기존 파일이면 `updated`, 없으면 `created` 카운터 증가
6. **Index/Log 갱신**(`update_index` + `append_log`): index.md의 해당 섹션 헤더(`## Summaries`/`## Concepts`/`## Entities`/`## Findings`) 다음 줄에 `- [[slug]] — <desc>` 삽입(중복 방지), frontmatter의 `total_summaries`·`total_concepts`·… 카운터를 정규식으로 +1, `updated:` 날짜를 오늘로 갱신

### 3.3 Query 파이프라인 (wiki → output)

`run_query(question, output_format)`(scripts/query.py:233):

1. **slug 키워드 매칭**(`collect_wiki_context`, scripts/query.py:27) — 질문에서 단어를 뽑고 각 slug를 `[-_]`로 split해 **단어 교집합 크기로 점수**를 매겨, 상위 15 페이지를 고른다. naive하지만 의존성 없이 돌아간다
2. **컨텍스트 조립**: `index.md` 전문 + 선택된 페이지 전문을 `---` 구분자로 concat
3. **프롬프트 합성**: `## 출력 형식` + `AGENTS.md` + `## Wiki 컨텍스트` + `## 질문` + `오늘 날짜`
4. **출력 분기**(`_OUTPUT_FORMAT_INSTRUCTIONS`, scripts/query.py:59) — text/slides/diagram/chart 4종. chart의 경우 `plt.savefig('{png_path}')` 절대경로를 프롬프트에 박아 LLM이 정확한 경로로 저장하게 함
5. **응답 파싱**: ingest와 동일한 `===FILE:===…===END===` 패턴 + `===FINDING: <slug> | <query> | <desc>===` (선택)
6. **chart 모드 후처리**(`execute_chart`, scripts/query.py:208): `subprocess.Popen([sys.executable, py_path])` + `communicate(timeout=60)` + `Path(png_path).exists()` 검사. PNG 미생성 시 명시적 에러
7. **Finding 파일링**(`write_finding`, scripts/query.py:178): 답변이 재사용 가치 있으면 `wiki/findings/<slug>.md`에 frontmatter(`type: finding · query · date · output_files`) + 본문(`![[<png>]]` 또는 `[[<md>]]` 임베드) 저장 → 다음 query 컨텍스트에 흡수

### 3.4 Lint 4-검사

| 검사 | 구현 위치 | 알고리즘 |
|---|---|---|
| **dead_links** | `scripts/lint.py:70 check_dead_links` | 모든 페이지의 `[[slug]]` 추출 → 실제 파일 집합과 차집합. `lint_ignore.txt`의 메타-slug는 제외 |
| **orphans** | `scripts/lint.py:96 check_orphans` | 전체 slug - 참조된 slug(index.md 참조 포함) |
| **index_drift** | `scripts/lint.py:117 check_index_drift` | 파일 집합 ↔ index slug 집합 양방향 차집합 |
| **contradictions** (`--deep`) | `scripts/lint.py:182 check_contradictions` | 최대 30 페이지 × 2,000자 truncate를 한 프롬프트에 넣고 claude에게 모순 점검 위임 |

`--fix`는 dangling index 항목만 자동으로 지운다(파일 부재 dead link는 사람 결정 영역이라 분리). `_FILE_SLUG_RE`(scripts/lint.py:39)가 `.png`/`/` 같은 파일·경로 임베드를 wikilink 검사에서 자동 제외.

### 3.5 `[[wikilink]]` slug 규칙

- **`slugify(text)`**(scripts/utils.py:45): `lower().strip()` → 영문자·숫자·공백·`-` 외 모두 제거 → 공백·`_` → `-` → 연속 `-` → 단일 `-` → 좌우 `-` 제거
- 예시: `andrej-karpathy`, `attention-mechanism`, `transformer-architecture`
- 한글 slug는 `\w`에 한글이 포함되어 보존되지만, kebab-case 권장은 영문(README §"Cross-reference Convention")

### 3.6 macOS launchd 자동 시작

`setup_launchd.sh`가 `~/Library/LaunchAgents/com.llmwiki.watch.plist`를 생성:

- `ProgramArguments`: `.venv/bin/python scripts/wiki.py watch`
- `RunAtLoad: true` (로그인 시 시작)
- `KeepAlive: true` (비정상 종료 자동 재시작)
- `ThrottleInterval: 10` (재시작 쿨다운 10초)
- StdOut/StdErr → `/tmp/llm-wiki-watch.log` / `/tmp/llm-wiki-watch-error.log`

`--remove`로 깨끗하게 해제. `launchctl list | grep llmwiki`로 상태 확인.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- **시스템 코드 LOC**: 5 Python 스크립트 1,228줄 + 2 셋업 셸 178줄 + 2 마크다운(README·AGENTS) 459줄 = **총 1,865 라인**
- **PyPI 의존성**: 4개(`pyyaml`, `click`, `matplotlib`, `watchdog`)
- **Phase 완성도**: README §"Phase 현황" 5단계(Foundation/Ingest/Query/Lint/CLI) **전부 ✅** — 추가 phase 계획이 보이지 않음(완성형 미니멀 레퍼런스로 봉인)
- **한 소스당 영향 페이지**(SLA): AGENTS.md §"Ingest Protocol" 끝줄에 **"통상 10–20개 페이지(summaries 1 + entities N + concepts M)"** 명시
- **lint 검사 4종 + LLM 추가 1종**: dead_links / orphans / missing_from_index / dangling_in_index / contradictions(`--deep`)
- **출력 포맷**: 텍스트 .md / Marp .marp.md / Mermaid .md / matplotlib .py+.png — **4종**
- **CLI 명령**: `ingest` / `query` / `watch` / `lint` / `status` / `list-raw` — **6종**
- **벤치마크 부재**: 처리 시간·token 사용량·정확도 등 정량 벤치마크는 README에 안 보임. 운영 실측치 없는 **명세형 레퍼런스 구현** 위치

## 5. 한계와 향후 과제 (Limitations and Future Work)

1. **라이선스 미명시** — LICENSE 파일 없음, README/AGENTS.md에도 라이선스 키 없음. fork·인용·재배포 시 저자(`dragon1086`) 의사 확인 필요. 본 ai-wiki repo의 `repos` 유형 frontmatter `license` 키를 채우는 데 가장 큰 빈칸이다 — Karpathy 패턴 후속 자료(`agricidaniel-claude-obsidian`, `joonan30-llm-wiki-labs` 모두 MIT)와 대조됨
2. **자체 LLM API 호출 안 함, claude CLI 의존** — `claude --dangerously-skip-permissions -p <prompt>` 호출에 의존하므로 (a) **Claude Code 인증·요금**이 사용자에게 전가됨, (b) `--dangerously-skip-permissions` 플래그가 권한 확인을 우회해서 watch + launchd 백그라운드에서 의도치 않은 파일 쓰기 가능성 — 별도 sandbox 가드 필요
3. **slug 매칭이 word-intersection naive 알고리즘** — `collect_wiki_context`(scripts/query.py:27)가 질문 단어 ↔ slug 단어 교집합 크기만 본다. 동의어·의미 유사도·embedding 미사용. 정밀도 한계가 분명
4. **모순 탐지가 30 페이지 × 2,000자 단일 컨텍스트** — `check_contradictions`(scripts/lint.py:182)가 모든 페이지를 한 프롬프트에 넣어 token 한계 도달 시 silent truncate. 대규모 vault에서는 탐지 누락 가능. 페어와이즈 점검·embedding 클러스터 등 다단계 비교는 부재
5. **plain text 정규식 파싱의 brittleness** — `===FILE: <path>===` sentinel은 LLM이 다른 형식으로 답하면 `RuntimeError`로 즉시 실패. AGENTS.md를 system prompt로 박아 형식을 강제하지만, 모델 업데이트나 한국어 출력 편향에 따라 깨질 위험. structured output(JSON mode) 미사용
6. **macOS 종속(launchd)** — `setup_launchd.sh`는 Apple plist를 직접 생성. Linux(systemd) / Windows(Task Scheduler) 동등 스크립트 없음. README §"watch" 본문도 launchd 한정
7. **Web Clipper Template이 frontmatter 4-key뿐** — `source/date/title/content`만 채워 ingest 시 LLM이 `topics·entities·concepts` 배열을 추론해야 하는 부담 그대로. Web Clipper 단계에서 더 풍부한 메타 수집(태그·도메인·언어 등) 미설계
8. **재사용 finding의 검색 가능성 미명세** — `wiki/findings/<slug>.md`에 답을 파일링하지만, 다음 query가 이를 자동으로 우선 참조하도록 가중치를 주는 로직은 없음 — slug word-match에 의존
9. **Phase 5(CLI)에서 마감** — 향후 phase(예: hot cache, retrieval embedding, multi-user permissions)가 README에 보이지 않음. **봉인된 미니멀 레퍼런스** 위치를 자청

## 6. 관련 연구 (Related Work)

- **Karpathy LLM Knowledge Base 패턴** (gist/karpathy/442a6bf5...) — 본 자료의 출발점. README 첫 줄과 끝줄 "참고" 섹션에서 명시 인용. ai-wiki repo의 [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]](영문 입문 가이드)와 직접 연결
- **[[applications/agricidaniel-claude-obsidian]]** — 같은 Karpathy 패턴을 Claude Code **plugin/skill 형태**로 구현. 본 자료가 Python CLI + claude subprocess라면, 그쪽은 Claude Code 네이티브 통합. **MIT 라이선스 명시**가 본 자료와의 큰 차이
- **[[applications/joonan30-llm-wiki-labs]]** — 한국어 단일 PI 연구실에서 같은 패턴을 **31일 운영한 실측 케이스 스터디**. AGENTS.md 0줄 → 488줄, paper monitor 자동 루프 등 본 자료가 명세하지 않은 운영 단계의 실증
- **[[applications/kmyu-2026-llm-wiki-pattern-synthesis]]** / **[[applications/kmyu-2026-akb-llmwiki-gbrain-comparison]]** — 본 ai-wiki repo의 자체 합성 페이지. 다양한 LLM-wiki 구현체(LLM Wiki / Dnotitia AKB / Garry Tan GBrain)의 패턴 비교에 본 자료를 한 줄로 흡수 가능
- **Obsidian Web Clipper** (`obsidian.md/clipper`) — 웹 → vault 캡처를 standard input으로 쓴다. 본 자료의 "raw/에 떨어지면 자동 ingest" 워크플로우의 시작점
- **Marp for Obsidian** — `.marp.md` 슬라이드 렌더링. `--slides` 출력의 자연스러운 viewer
- **watchdog 라이브러리** — `Observer.schedule(handler, raw, recursive=False)` 패턴. `recursive=False`로 raw/ 직계 .md만 감시(서브폴더 무시) — 의도된 단순화
- **macOS launchd** — `RunAtLoad` + `KeepAlive` + `ThrottleInterval`을 묶은 plist. 같은 컨셉을 Linux로 옮기려면 systemd `--user` unit에 `Restart=on-failure`로 매핑

## 7. 용어집 (Glossary)

- **Karpathy LLM Knowledge Base 패턴**: Andrej Karpathy가 gist로 공개한 "LLM이 raw 자료를 읽고 wiki를 자동 컴파일하는" 운영 패턴
- **AGENTS.md**: 시스템 운영 규칙을 명세한 마크다운. LLM 호출 시 system prompt로 통째로 들어감 (`utils.read_agents_md()`)
- **vault (Obsidian)**: Obsidian이 "한 폴더 = 한 wiki"로 인식하는 데이터 디렉토리. `config.yaml`의 `vault_path`가 가리키는 대상
- **wikilink (`[[slug]]`)**: Obsidian 네이티브 페이지 간 링크 문법. graph view에 자동 시각화됨
- **slug**: kebab-case 페이지 식별자(`utils.slugify()`). 영문 소문자·숫자·`-`만. 한글은 보존되지만 권장은 영문
- **frontmatter**: 마크다운 파일 상단 `---`로 감싼 YAML 블록. `type/source/date_ingested/topics/...` 등 메타데이터
- **ingest**: raw → wiki 컴파일. 소스 1개당 summary 1 + entity N + concept M 페이지 갱신
- **query**: 질문 → wiki 탐색 + 합성 + output 저장 + findings 파일링
- **lint**: dead_links/orphans/index_drift/contradictions 점검. `--fix`는 dangling index만 자동 수리
- **watch**: `watchdog.Observer`로 `raw/` 신규 .md 감지 → 자동 ingest
- **launchd**: macOS 시스템·사용자 데몬 관리자. `~/Library/LaunchAgents/<label>.plist`로 등록
- **Web Clipper**: Obsidian 공식 브라우저 확장. URL → vault `raw/`에 `.md` 저장
- **Marp**: 마크다운 → 슬라이드 렌더링 도구. `marp: true` frontmatter로 활성화
- **Mermaid**: 텍스트로 다이어그램(flowchart/sequence/ER 등) 정의하는 DSL. ```` ```mermaid ```` 코드블록으로 임베드
- **Finding**: query 응답을 wiki에 재파일링한 페이지(`wiki/findings/<slug>.md`). 다음 query 컨텍스트에 흡수되어 지식 복리화
- **upsert (in ingest)**: 기존 페이지가 있으면 `sources[]` 배열에 새 소스 추가하고 보강, 없으면 신규 생성
