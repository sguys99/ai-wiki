---
title: "LLM-Wiki Labs — Joonan Lab 인터랙티브 모음"
type: repo
year: 2026
category: applications
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/repos/joonan30-llm-wiki-labs
raw_filename: "joonan30-llm-wiki-labs/"
source_collection: external
org: "joonan30"
repo: "llm-wiki-labs"
url: "https://github.com/joonan30/llm-wiki-labs"
license: "MIT"
authors: "Joon-Yong An (안준용)"
institution: "Joonan Lab · Korea University"
publication_date: "2026-05-08"
live_url: "https://joonan30.github.io/llm-wiki-labs/"
tags: [llm-wiki, karpathy-pattern, case-study, ai-native-research, single-pi-lab, agents-md, claude-code, codex-cli, notion-mcp, slack-mcp, gmail-mcp, role-based-onboarding, compounding-wiki, agenda-backlog, paper-monitor, korean]
---

## 한 줄 요약 (One-line Summary)

**Joonan Lab(고려대 안준용 교수)**이 자기 연구실에서 31일(2026-04-08 → 05-08) 동안 굴린 **AI Native LLM Wiki 시스템**의 진화 과정을 단일 HTML 인터랙티브 페이지로 풀어쓴 케이스 스터디 모음. *gist 한 줄 + "나도 이거 세팅해줘"* 한 마디로 셋업이 끝나고, 31일 뒤엔 3,955개 wiki 페이지·567줄 AGENTS.md·5개 자동 루프·5개 외부 시스템(Notion·Slack·Gmail·Grants·Agents) 통합이 자리잡는다는 1인 PI 연구실의 실측 기록이다. 학부생·대학원생·연구원·PI 네 역할의 렌즈로 같은 페이지를 다르게 읽도록 설계한 인터랙티브 자료다. **MIT 라이선스**, 외부 의존성은 Google Fonts 한 줄뿐인 정적 호스팅 친화 구조.

## 1. 자료 정보 (Document Information)

- **Repo**: `joonan30/llm-wiki-labs` (https://github.com/joonan30/llm-wiki-labs)
- **Live**: https://joonan30.github.io/llm-wiki-labs/
- **저자**: 안준용 (Joon-Yong An, Joonan Lab · Korea University)
- **공개 시점**: 2026-05-08
- **라이선스**: MIT (fork·remix 자유)
- **구조**: `index.html`(Labs 인덱스, ~268줄) + `evolution/index.html`(첫 번째 lab, 4,355줄)
- **디자인 토대**: OKLCH 5색 팔레트(테라코타/모스/사프란/멀버리/버디그리스)에 Newsreader(display)·IBM Plex Sans(body)·JetBrains Mono(code) 3-font 시스템을 얹었다. ConardLi의 garden-skills/web-design-engineer 디자인 철학(AI 클리셰 회피·의도된 타이포 대비·미세 인터랙션)을 인용한다.
- **첫 번째 lab**: **Evolution — 한 달간 자란 LLM-Wiki**. 31일 케이스 스터디에 "처음 한 시간 가이드", 실제 워크플로우 5개가 붙는다. 4-audience lens(학부생/대학원생/연구원/PI), 9 sections.
- **관찰 데이터 출처**: 자기 연구실의 git log · AGENTS.md · agenda/ 폴더 · scripts/. **프로젝트 이름은 익명화 처리**(PROJECT-α/β/γ/δ/ε, GRANT-A/B/C/D)되어 있다.

> **이 자료가 ai-wiki에 들어오는 이유**: 본 ai-wiki repo의 운영 방식과 정확히 같은 패턴(Karpathy LLM Wiki + 한국어 + 3-tier raw/sources/wiki) 위에서 **단일 PI 연구실 운영 + 다중 에이전트 거버넌스 + 외부 시스템 통합** 측면을 실측치와 함께 인터랙티브로 풀어쓴 자료다. [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]]가 영어권 입문 가이드라면, 본 자료는 한국어 PI 연구실의 **31일 운영 실측 기록**이다.

## 2. 주요 기여 (Key Contributions)

1. **"나도 이거 세팅해줘" 3-step 진입 패턴** — *gist 링크 한 줄(`gist.github.com/joonan30/cbce305684d079dbe9a3fbaefe4e3959`) 복사 → Claude/Codex 채팅창에 붙임 → "나도 이거 세팅해줘" 한 마디*. ChatGPT 사용자는 Codex 앱, Claude 사용자는 Claude 앱의 "Code" 탭에서 새 폴더(`llm-wiki`)를 고른다. 코딩 0줄·터미널 0줄로 5분 안에 셋업이 끝난다. *연구자 진입 장벽을 카톡으로 설명 가능한 수준까지 낮춘 패턴이다*.

2. **"진짜 처음 보는 다섯 가지" — 셋업 직후 첫 한 시간 가이드** — (i) **ingest**가 뭔지: "PDF 한 편 → sources/ 요약 + wiki/ 노트 자동 변환". (ii) 처음엔 **PDF 1편**으로 작게: 채팅창에 PDF 드래그 + "이 PDF ingest해줘" → 5분이면 첫 결과. (iii) **서지 프로그램 폴더 통째로**: Zotero/EndNote/Mendeley 폴더 위치를 한 번만 등록(폴더 경로 모르면 "내 컴퓨터에서 Zotero PDF 폴더 위치 찾아줘"로 AI에게 위임) → 신규 PDF만 자동 ingest. (iv) **마크다운이 뭔지**: `#`·`*`·`-`·`[[link]]`만 알면 충분하고, `.md`는 메모장으로도 열리는 평범한 텍스트다. (v) **"allow"가 뭐고 컴퓨터 안 망가지나**: 폴더 안에서만 작동하는 안전장치라 거절도 된다. auto mode(Claude Shift+Tab, Codex --yes)는 익숙해진 뒤 켜면 된다. *코딩 비전공 연구자의 핵심 공포 다섯 개를 선제 제거한다*.

3. **31일 5 단계 진화 모델 — "덤프 → 분류 → 규칙화 → 일일 운영 → 분석"** —
   - **Phase 1 덤프 (04-08 → 04-12, 4일)**: 약 3,500개 파일 일괄 투입. `papers/sources/wiki` 3폴더에 Karpathy 패턴 적용. AGENTS.md 0줄, 룰은 머릿속에만 있다.
   - **Phase 2 분류 (04-14 → 04-26, 12일)**: 카테고리 세분화 — neuroscience → brain-development/brain-atlas/synapse-circuit에 mouse-line/history를 신설. `wiki/overviews/`가 통합 viewpoint 거점으로 자란다. broken wikilinks 추적도 시작한다.
   - **Phase 3 규칙화 (04-29, 단 1일)**: `git commit "Consolidate agent docs"` 한 번으로 AGENTS.md 0 → **488줄**이 된다. 21일간 머릿속으로 굴리던 룰을 한 번에 글로 박은 분기점이다. 이날부터 Claude·Codex가 같은 룰로 움직인다.
   - **Phase 4 일일 운영 (05-02 → 05-07)**: `paper_monitor.py` 1,101줄이 매일 돌고 13개 일자별 리포트(`logs/monitor-YYYY-MM-DD.md`)가 쌓인다. 노션 포스팅 배치(12편/16페이지)도 가동한다.
   - **Phase 5 분석 단계 (05-08)**: 하루 만에 위키 전체를 스캐닝해서 **research-question-scouting.md 32개 질문**, **execution-backlog.md 7개 P0 백로그**, **4 프로젝트 분석 스펙 + TSV 템플릿**을 한꺼번에 뽑았다. *"읽는 위키"에서 "굴리는 위키"로 넘어가는 지점*.

4. **AGENTS.md Trellis — 단일 운영 매뉴얼 거버넌스 모델** — 567줄 AGENTS.md 1개를 Claude(대화형)와 Codex CLI(배치 자동화) **두 에이전트가 공유**한다. 6대 핵심 룰:
   - **에이전트 부트스트랩 체크리스트** — 새 세션마다 4단계 강제(AGENTS.md 재독 → 매핑 문서 재독 → 이전 세션 메모리 신뢰 금지 → 표준 앵커 매핑 확인).
   - **노트 인제스트 워크플로** — 로컬 파일만, 웹 검색은 명시 요청 시에만. PDF → sources/ → wiki/ → 노션 포스팅 순서.
   - **노션 페이지 배치 규칙** — 모든 활성 프로젝트 DB는 동일한 3종 앵커(📚 참고 논문 / 📅 미팅 노트 / 🗂 리소스)를 둔다. 외부 페이퍼는 첫 번째 앵커 하위에만 들어간다.
   - **언어 정책** — 노션 코멘트는 한국어 기본. 영어는 외부 협력자가 있을 때만 쓰되 사용자 확인을 거친다. 영-한 중복 금지.
   - **프라이버시 가드레일** — 로컬 경로(`/Users/...`, `~/Dropbox/...`)는 노션 본문에 절대 쓰지 않는다. 노션=공유 공간, 위키=로컬 절대경로 OK.
   - **단일 매핑 소스** — 활성 프로젝트 ↔ DB ↔ 앵커 ID 매핑은 `agenda/notion-grant-mapping.md` 1파일에서만. 모든 에이전트가 매 세션 첫 작업 전 재독한다.

5. **5개 자동 루프 — 위키를 "회전하는 시스템"으로** —
   - **Paper Monitor (매일)**: RSS·DB → `paper_monitor.py` → `logs/monitor-YYYY-MM-DD.md` → Downloads/ 신규 PDF. 13개 누적.
   - **Ingest (매일)**: PDF → sources/ 요약 → wiki/<category>/ 페이지 → index.md 갱신. 일 10~30 신규 노트.
   - **Notion 포스팅 (매일)**: wiki 노트 → 프로젝트 식별 → 📚 앵커 하위 → 페이지 ID 기록. 배치당 5~20 자식 페이지.
   - **Audit·정리 (주간)**: 중복 stem 감지 → broken wikilinks 추적 → logs/ 블로커 기록.
   - **Question → Backlog (분기점)**: 위키 전체 스캐닝 → P0/P1/P2 질문 → Done + TSV + Prompt. 분기점당 1~7 분석 스펙.

   *한 루프가 멈춰도 다른 루프는 돈다*는 **독립성**이 핵심 설계다.

6. **분석 백로그 6-row 해부** — 위키 노트를 분석 단위로 굳히는 6칸 템플릿:
   - **Goal**: 한 문장, 동사 박힌 결과물(`cohort × layer matrix를 만든다`). *"이해한다"/"검토한다" 금지*.
   - **Input**: 근거 노트의 절대경로 리스트(`agenda/<project>/spec.md`, `wiki/projects/X.md`). 웹 검색 차단, 잡지식 빈칸 금지.
   - **Output**: 생성될 파일의 경로까지 미리 지정(`agenda/<p>/2026-05-08-template.tsv`).
   - **Template**: TSV 첫 줄 박기(`cohort\tcase_count\tsex\t...`). 컬럼 = 분석 변수 사전, 없는 데이터는 `unknown` 컬럼에.
   - **Done**: 3~5개 명시적 종료 조건. 누가 봐도 같게 판정한다. *"완료한 듯하다"가 사라진다*.
   - **Prompt**: Claude/Codex에 그대로 붙일 프롬프트. 위 5칸을 한 문단으로 압축. 재사용 가능.

7. **3-Tier 에코시스템(Core 3 + Operations 7 + External 5)** —
   - **Core 3 (Karpathy 패턴)**: `papers/` 3,398 PDF · `sources/` 3,369 마크다운 · `wiki/` 3,955 페이지 / 38 카테고리.
   - **Operations 7 (한 달 사이 신설)**: `agenda/`(분석 스펙) · `interactives/`(13개 인터랙티브) · `slides/`(강의·발표) · `peer-review/`(저널 리뷰) · `note-meeting/`(미팅 기록) · `scripts/`(자동화) · `logs/`(audit 기록).
   - **External 5 (MCP 연결)**: **Notion**(5 프로젝트 DB, 3-앵커 표준) · **Slack MCP**(채널 자동 포스트) · **Gmail MCP**(메일 초안) · **Grants**(가명 4건 GRANT-A/B/C/D, 단일 매핑 파일) · **AI Agents**(Claude 대화형 + Codex CLI 배치, AGENTS.md 567줄 공유).

8. **4역할 30일 플레이북** — 같은 위키를 누가 어떻게 쓰는가:
   - **학부 연구생 (Onboarding)**: Day 1 AGENTS.md "Agent Startup Checklist" 한 섹션만 → Day 2~3 첫 ingest 1편 → Week 2 overviews/ 정독 → Week 3 첫 백로그 6행 클로즈 → Week 4 미팅 노트 1개 작성.
   - **대학원생 (Daily Ops)**: Daily 09:00 paper_monitor + ingest 1~3편 → Daily 14:00 백로그 30분 → Daily 17:00 노션 포스팅 → Weekly 금 새 백로그 6행 → Weekly 일 미팅 노트 초안.
   - **연구원 (Coordination)**: Daily broken-wikilinks 모니터 → Weekly 월 AGENTS.md PR → Weekly 화 노션 3-앵커 점검 → Weekly 수 학생 백로그 PR-style 리뷰 → Monthly notion-grant-mapping 갱신 → Quarterly sub-AGENTS.md 분기 검토.
   - **PI (Oversight)**: Weekly 5분 — *주간 새 백로그 수 / 클로즈된 P0 수 / 누적 TSV 수* 세 숫자만 → Bi-weekly research-question-scouting 직접 1회 → Monthly 분석 산출물 → 페이퍼/그랜트 환산율 점검.

9. **5개 실제 워크플로우 — 채팅창 한 줄짜리 일상** —
   - **W1 PI 월요일 아침**(학생 6명 주간 피드백): *"지난주 이후 노션의 학생 주간 노트랑 그 사이 위키에 새로 쌓인 노트 같이 보고, 학생별 1페이지 피드백 초안 써줘"* → 학생 6명 × 1페이지 draft. 미팅 5분 전 코멘트만 손보면 끝.
   - **W2 대학원생 미팅 전날**(공동연구자 미팅 자료): *"위키에서 X 주제 노트 5개 추려서 미팅용 1페이지 요약 만들어줘. 노션에 내일 미팅 페이지 만들어서 거기 넣고, Gmail로 공동연구자한테 메일 초안까지"* → 노션 페이지 + 메일 초안 + 첨부 한 묶음.
   - **W3 대학원생 manuscript 검토**: *"이 챕터 읽고, 위키의 최신 노트랑 비교해서 인용 누락·결과 충돌·반영 필요한 부분 찾아줘. 트랙 체인지로 표시해주고"* → docx + 인용 누락 리스트 + 수정 권고.
   - **W4 연구원 협업 시작**(새 협력자 온보딩): *"PROJECT-α 관련 위키 노트 전부 노션 협업자용 페이지로 옮겨주고, #lab-collab 채널에 페이지 링크랑 한 단락 요약 같이 올려줘"* → 노션 페이지 + Slack 공지 + 30분 합류.
   - **W5 학부생 매일 저녁**(사수 일일 보고): *"오늘 ingest한 페이퍼 5편 한 줄씩 요약해서 Slack DM으로 사수한테 보내줘"* → DM 5줄 + 위키 백링크.

10. **"옮길 수 있는" 8 원칙** — 생물학·신경과학에 묶이지 않고 *1인 연구자 + 다중 AI 에이전트* 환경이면 어떤 분야에도 통하는 적응 원칙: (1) 단일 운영 매뉴얼, (2) 단일 매핑 소스, (3) 메모리 누적 가드레일(같은 교정 두 번 시키지 않기), (4) **덤프 → 분류 → 운영 → 분석** 4단계(처음부터 분석 시스템 만들려 하지 말 것), (5) 출력 경로 사전 지정, (6) 노트 끝에 다음 작업 박기, (7) 웹 검색 차단의 가치(unknown은 prose 아닌 컬럼에), (8) 일일 모니터의 누적 가치(1,101줄 스크립트가 30일 쌓이면 분야 동향 데이터셋이 된다).

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 진입 패턴 (3-Step Quickstart)

```
Step 01: ChatGPT 쓰면 Codex 앱, Claude 쓰면 Claude 앱
Step 02: llm-wiki 폴더 새로 생성 → 앱에서 선택
Step 03: gist 링크 채팅창에 붙임 + "나도 이거 세팅해줘"
```

> **핵심**: 폴더 경로를 외울 필요가 없다(`내 컴퓨터에서 Zotero PDF 폴더 위치 찾아줘`로 AI에 위임). 첫 며칠은 매번 allow를 수동 클릭하고, 익숙해진 뒤 auto mode를 토글한다.

### 위키 노트 구조 (마크다운 예시)

```markdown
---
title: 신규 위험 유전자 12개 동정 (논문 제목)
authors: First-Author, J. et al.
year: 2024
journal: Nature
category: disease-genetics
tags: [single-cell, mouse, brain]
---

## Summary
- 154개 trio에서 de novo variant 분석
- LoF burden이 affected proband에서 1.4배 증가
- 12개 신규 위험 유전자 동정

## Key methods
- whole genome sequencing (parent-child trio)
- protein-truncating + missense damaging 분리 분석

## Related
- [[overviews/disease-genetics]]
- [[concepts/de-novo-mutations]]
- [[methods/trio-wgs]]
```

### Compounding Flow — 오늘은 어제 위에 쌓인다

매일 도는 5 루프가 서로 **출력 → 입력**으로 맞물려서 31일이 지나면 위키가 *"읽는 저장소"에서 "굴리는 시스템"으로* 옮겨간다. 한 루프가 멈춰도 다른 루프는 돈다는 **독립성**으로 단일 장애점이 사라진다.

### 거버넌스 Trellis 차트 (AGENTS.md 줄 수 시계열)

```
04-08 첫 커밋    ────  0줄
04-09 덤프 끝   ────  0줄
04-29 규칙화   ████ 488줄  ← 21일치 머릿속 룰이 한 번에 글로
05-08 현재      █████ 567줄
```

> **PI 모니터 시그널**: 매뉴얼이 800줄·1000줄로 가면 좋은 신호가 아니다. 룰이 분야별로 갈라지는 단계이자 sub-AGENTS.md를 분리할 타이밍이다.

### 외부 통합 (External 5)

```
llm-wiki (로컬)
    ├─→ Notion (5 DB · 3-앵커 표준: 📚 참고 논문 / 📅 미팅 노트 / 🗂 리소스)
    ├─→ Slack MCP (#lab-papers, #lab-collab 자동 포스트)
    ├─→ Gmail MCP (공동연구자 메일 초안)
    ├─→ Grants 매핑 (notion-grant-mapping.md — 단일 소스)
    └─→ AI Agents (Claude 대화형 + Codex CLI 배치, AGENTS.md 공유)
```

### 디자인 시스템

OKLCH 5색 팔레트(테라코타 p1 / 모스 p2 / 사프란 p3 / 멀버리 p4 / 버디그리스 p5)에 3-font 시스템(Newsreader / IBM Plex Sans / JetBrains Mono)을 얹었다. **AI 클리셰(보라-핑크-블루 그라데이션)를 피하고**, 의도된 타이포 대비와 미세 인터랙션을 둔다. 단일 HTML 파일, 외부 의존성은 Google Fonts 한 줄.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 31일 누적 실측치

| 지표 | 수치 | 비고 |
|---|---|---|
| 관찰 기간 | 31일 | 2026-04-08 → 2026-05-08 |
| 위키 노트 | **3,955** 페이지 | 38 카테고리 |
| sources 마크다운 | 3,369 | LLM 요약 |
| 원본 PDF | 3,398 | papers/ |
| AGENTS.md | **567줄** | 04-29 한 커밋에 488줄 일괄 |
| paper_monitor.py | **1,101줄** | 일일 자동 실행 |
| 일일 모니터 리포트 | 13개 | logs/monitor-YYYY-MM-DD.md |
| 병렬 프로젝트 | 5개 | PROJECT-α/β/γ/δ/ε |
| 그랜트 매핑 | 4개 | GRANT-A/B/C/D |
| External MCP 통합 | 5 시스템 | Notion·Slack·Gmail·Grants·Agents |
| Phase 5 분석 산출 | 32질문 + 7 P0 백로그 + 4 분석 스펙 + 4 TSV 템플릿 | **단 하루**(05-08) |

### Phase별 시간 분포

- **Phase 1 덤프**: 4일 (04-08 → 04-12) — 3,500파일 일괄 투입
- **Phase 2 분류**: 12일 (04-14 → 04-26) — 카테고리 세분화
- **Phase 3 규칙화**: **1일** (04-29) — AGENTS.md 0→488줄 단일 커밋
- **Phase 4 일일 운영**: 6일 (05-02 → 05-07) — paper_monitor 가동
- **Phase 5 분석**: **1일** (05-08) — 4 프로젝트 동시 분석 가능 상태

> **시사점**: 21일치 "머릿속 룰"이 단 1일의 커밋으로 "글로 박힌 매뉴얼"이 되는 분기가 성숙기 진입 신호다. 그 뒤 9일 만에 *읽는 위키 → 굴리는 위키*로 옮겨간다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 본 자료가 명시한/암시한 한계

- **케이스 N=1**: 단일 PI 연구실(생물학·신경과학) 31일치 자기 기록이다. 통계적 일반화는 아니지만, §07 "Adapt"에서 8 원칙으로 도메인 비종속성을 주장한다.
- **프로젝트 이름 익명화** (PROJECT-α/β/γ/δ/ε, GRANT-A/B/C/D)로 실제 도메인과 주제가 비공개다. 외부 검증자가 backlog 6-row 같은 패턴이 본인 분야에서 통할지 시뮬레이션할 수가 없다.
- **AGENTS.md 567줄의 임계점**: PI 플레이북에 *"800줄·1000줄 가면 적신호, sub-AGENTS.md 분리"*가 명시되어 있지만, **분기 기준과 도메인 쪼개기 방법론은 미정의** 상태다. 현실에서 분기 시점·기준이 가장 어려운 결정이다.
- **Notion 3-앵커 표준**(📚/📅/🗂)은 도메인 무관 추상화를 주장하지만, 실험과학·인문학·산업R&D 같은 비-인지/생물 도메인에서 그대로 작동할지는 별도 사례가 필요하다.
- **Slack/Gmail MCP**는 *"한 마디면 된다"*는 워크플로우 위주 설명이다. 실패 모드(잘못된 채널 포스트, 잘못된 수신자 메일 발송) 가드레일은 공개되어 있지 않다.
- **paper_monitor.py 1,101줄 스크립트의 가치는 30일 누적**으로 증명되지만, *그 스크립트가 무엇을 입력으로 받고 어떤 신호로 신규 후보를 추리는가*는 본 인터랙티브에서 공개하지 않는다(repo `scripts/`는 비공개).
- **단일 HTML 파일 + Google Fonts 의존**: 정적 호스팅에 잘 맞지만, 인터랙티브 그래프(phase rail, trellis bar, loop orbit)가 JS 없이는 동작하지 않는다. 인쇄·오프라인·AI 크롤러 친화성은 떨어진다.

### 후속이 풀어야 할 질문

- **8 원칙의 도메인 이식성** — 생물의학 외 분야(소프트웨어 엔지니어링, 사회과학, 인문학)에서 *덤프 → 분류 → 규칙화 → 운영 → 분석* 4단계와 단일 AGENTS.md 거버넌스가 그대로 통할지.
- **AGENTS.md 분기 임계 정량화** — 567 → 800 → 1000줄 사이 어디서, 무엇을 기준으로(도메인 카테고리 수 / 학생 수 / 외부 시스템 수) sub-AGENTS.md를 분리할지의 룰.
- **"단일 매핑 소스" 동시성** — 학생 5명이 동시에 `notion-grant-mapping.md`를 수정할 때의 conflict 해결 protocol.
- **Phase 5 1일 산출의 reproducibility** — 위키 3,955페이지 → 32질문 → 7 P0 백로그 변환이 어떤 프롬프트·스캐닝 전략으로 가능했는지가 공개되지 않았다.
- **외부 협력자 합류 비용** — W4 워크플로우는 "30분 합류"를 주장하지만, AGENTS.md 567줄을 새 협력자가 안 읽고 시작하면 룰 위반이 쌓인다. 그 격차를 어떻게 처리할지가 남는다.

## 6. 관련 연구 (Related Work)

### 본 ai-wiki 내 관련 페이지

- **[[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]]** — Karpathy LLM Wiki Gist(2026-04-04)의 영어권 25~35분 입문 튜토리얼. *6-step 워크플로우 + 3 verbatim 프롬프트*. 본 자료가 **PI 연구실 31일 운영 실측**이라면, 그쪽은 **단일 사용자 25~35분 진입**이다. 함께 읽으면 *진입 → 31일 성숙*의 양 끝이 이어진다.
- **[[applications/kmyu-2026-llm-wiki-pattern-synthesis]]** — 본 ai-wiki 소유자 kmyu99의 Karpathy LLM Wiki 패턴 한국어 종합 정리. *~100 sources 수백 page까지 OK, 이상은 qmd/BM25+벡터+rerank 필요*의 천장 논의가 본 자료의 3,955 페이지 운영과 흥미롭게 대비된다.
- **[[applications/agricidaniel-claude-obsidian]]** — Karpathy LLM Wiki 패턴을 Claude Code 스킬 15개와 Obsidian 볼트로 정착시킨 reference 구현체. Compound Vault refoundation(per-file advisory lock + BM25·contextual-prefix·cosine rerank). 본 자료가 *AGENTS.md 단일 매뉴얼 + 5 외부 시스템*의 운영 측면이라면, 그쪽은 *15 skills + hybrid retrieval*의 구조 측면이다.
- **[[applications/kmyu-2026-akb-llmwiki-gbrain-comparison]]** — AKB·llmwiki·GBrain 6축 5점 척도 비교. 본 자료가 "llmwiki"의 31일 실증 사례에 해당한다.
- **[[applications/dnotitia-akb]]** — Dnotitia의 MCP-first agent knowledge base(Git bare repo + Postgres + vector store). 본 자료의 *MCP를 통한 External 5 통합*과 같은 사상의 제품화 버전이다.
- **[[applications/lum1104-understand-anything]]** — 임의 코드베이스 7단계 분석 → knowledge graph + 가이드 투어. 본 자료의 *논문 코퍼스 31일 진화 → 분석 백로그*에 대응되는 *코드 코퍼스* 버전이다.

### 본 자료가 인용/언급한 외부 참조

- **Karpathy LLM-wiki 패턴** (Phase 1 "Karpathy LLM-wiki 패턴 적용"으로 명시). 본 ai-wiki의 CLAUDE.md도 같은 [Karpathy gist](https://gist.github.com/karpathy/1dd0294ef9567971c1e4348a90d69285)를 patterns 출처로 명시한다.
- **ConardLi의 garden-skills / web-design-engineer** (README.md 디자인 영감으로 명시) — *AI 클리셰 회피, 의도된 타이포 대비, 미세 인터랙션*.
- **OKLCH 색공간** — *지각적으로 균등*하다고 명시한다. 보라-핑크-블루 그라데이션을 회피한다.
- **Newsreader / IBM Plex Sans / JetBrains Mono** — Google Fonts 3-font 시스템.
- **gist `cbce305684d079dbe9a3fbaefe4e3959`** — 본 자료의 "나도 이거 세팅해줘" 엔트리 포인트(채팅창 한 줄에 붙이는 셋업 스펙).

## 7. 용어집 (Glossary)

- **AGENTS.md**: 폴더 루트에 두는 단일 운영 매뉴얼. Claude·Codex 등 모든 에이전트가 매 세션 첫 작업 전 재독한다. 본 자료에서 567줄. 본 ai-wiki의 CLAUDE.md와 동치다.
- **ingest**: PDF/문서를 시스템 안으로 가져와 `sources/` 요약과 `wiki/` 노트로 자동 변환하는 과정. *"논문 정리하다"*의 위키 용어다.
- **3-앵커**: 모든 Notion 프로젝트 DB가 갖춰야 하는 표준 자식 페이지 — 📚 참고 논문 / 📅 미팅 노트 / 🗂 리소스.
- **백로그 6-row**: 분석 단위를 굳히는 6칸 템플릿(Goal/Input/Output/Template/Done/Prompt). 한 번 작성하면 서브에이전트에 그대로 던질 수 있는 형태다.
- **Assignable Agent Prompt**: 백로그 Prompt 칸. 다른 프로젝트에서도 변수만 바꿔 재사용한다.
- **paper_monitor**: 1,101줄 일일 스크립트. RSS·DB → `logs/monitor-YYYY-MM-DD.md` 산출. 30일 누적이 분야 동향 데이터셋이 된다.
- **notion-grant-mapping.md**: 프로젝트 ↔ DB ↔ 앵커 ID 매핑의 *단일 소스*. 모든 에이전트 세션의 첫 재독 대상이다.
- **auto mode**: Claude Code의 Shift+Tab 토글 / Codex CLI의 --yes. 매번 allow를 누르지 않고 그 세션 동안 자동 수락한다.
- **Compounding Flow**: 5 루프가 어제 위에 오늘이 쌓이는 구조. 한 루프가 멈춰도 다른 루프는 돈다.
- **Phase 1~5**: 덤프 → 분류 → 규칙화 → 일일 운영 → 분석. 31일을 5분기로 자른 진화 모델이다.
- **4 audience lens**: 같은 페이지를 학부생/대학원생/연구원/PI로 다르게 읽기. role-bar sticky UI로 토글한다.
