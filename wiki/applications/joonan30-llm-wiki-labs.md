---
title: "LLM-Wiki Labs: 31일 Joonan Lab 운영 실측 케이스 스터디"
type: repo
year: 2026
category: applications
raw_path: raw/repos/joonan30-llm-wiki-labs.md
raw_filename: "joonan30-llm-wiki-labs.md"
source: joonan30-llm-wiki-labs.md
source_collection: external
org: "joonan30"
repo: "llm-wiki-labs"
url: "https://github.com/joonan30/llm-wiki-labs"
license: "MIT"
authors: "Joon-Yong An (안준용)"
institution: "Joonan Lab, Korea University"
publication_date: "2026-05-08"
live_url: "https://joonan30.github.io/llm-wiki-labs/"
tags: [llm-wiki, karpathy-pattern, case-study, ai-native-research, single-pi-lab, agents-md, claude-code, codex-cli, notion-mcp, slack-mcp, gmail-mcp, role-based-onboarding, compounding-wiki, agenda-backlog, paper-monitor, korean]
---

## 요약 (Summary)

**Joonan Lab(고려대 안준용 교수)**의 1인 PI 연구실이 *Karpathy LLM Wiki 패턴*을 한국어로 옮기고 31일(2026-04-08 → 05-08) 굴린 실측 케이스 스터디를 단일 HTML 인터랙티브 페이지로 풀어쓴 자료. **MIT 라이선스 repo**, Live는 https://joonan30.github.io/llm-wiki-labs/. 첫 번째 lab "Evolution"이 9 sections와 4-audience lens(학부생/대학원생/연구원/PI)로 같은 페이지를 독자별로 다르게 읽게 설계돼 있다. *"gist 한 줄 + 나도 이거 세팅해줘"* 한 마디로 셋업이 끝나고, 31일 뒤 **3,955 wiki 페이지 · 567줄 AGENTS.md · 5개 자동 루프 · 5개 외부 시스템(Notion·Slack·Gmail·Grants·AI Agents) 통합**이 자리 잡은 PI 연구실 운영의 정량 기록이다. [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]]가 단일 사용자 25~35분 영어권 진입 가이드라면 본 자료는 *31일 PI 연구실 성숙*의 한국어판, [[applications/kmyu-2026-llm-wiki-pattern-synthesis]]가 *패턴 비판적 종합*이라면 본 자료는 *운영 실측 사례*다.

## 주요 기여 (Key Contributions)

1. **"나도 이거 세팅해줘" 3-step 진입 패턴** — gist 링크 채팅창에 붙이고 한 마디면 끝. 코딩 0줄·터미널 0줄로 5분 안에 셋업. ChatGPT 사용자는 Codex 앱, Claude 사용자는 Claude 앱 "Code" 탭에서 새 폴더(`llm-wiki`)를 선택한다.

2. **셋업 직후 첫 한 시간 가이드** — 5개 핵심 공포(ingest가 뭔지, 첫 PDF 1편, 서지 프로그램 폴더 통째로, 마크다운이 뭔지, "allow" 안전성)를 선제 제거. *코딩 비전공 연구자의 진입 마찰을 카톡 설명 가능한 수준까지 낮춘 패턴*.

3. **31일 5 단계 진화 모델** — *덤프(4일) → 분류(12일) → 규칙화(1일) → 일일 운영(6일) → 분석(1일)*. AGENTS.md 0→488줄을 단 1일 커밋에 박은 **04-29 분기점**이 시스템 성숙 신호.

4. **AGENTS.md Trellis 거버넌스** — 567줄 단일 매뉴얼을 Claude(대화형)와 Codex CLI(배치)가 공유. 6대 핵심 룰(부트스트랩 체크리스트 · 인제스트 워크플로 · 노션 3종 앵커 · 언어 정책 · 프라이버시 가드레일 · 단일 매핑 소스). 본 ai-wiki의 [`CLAUDE.md`](../../CLAUDE.md)와 정확히 같은 *"단일 운영 매뉴얼"* 패턴.

5. **5개 자동 루프(Compounding Flow)** — Paper Monitor(매일) → Ingest(매일) → Notion 포스팅(매일) → Audit·정리(주간) → Question→Backlog(분기점). *한 루프가 멈춰도 다른 루프는 돈다*는 독립성이 단일 장애점을 없앤다.

6. **분석 백로그 6-row 해부** — Goal/Input/Output/Template/Done/Prompt 6칸으로 위키 노트를 *서브에이전트에 그대로 던질 수 있는 분석 단위*로 굳힌다. *"이해한다"/"검토한다" 같은 모호 동사 금지, Done은 측정 가능*.

7. **3-Tier 에코시스템(Core 3 + Operations 7 + External 5)** — Karpathy 3폴더(`papers/sources/wiki/`) 옆에 한 달 사이 7폴더(`agenda·interactives·slides·peer-review·note-meeting·scripts·logs`)가 붙고, MCP로 외부 5(Notion·Slack·Gmail·Grants·AI Agents)와 묶인다.

8. **4역할 30일 플레이북 + 5 워크플로우** — 학부생/대학원생/연구원/PI 각자의 첫 30일 일정과 *"학생 6명 주간 피드백 5분"·"미팅 자료 30분"·"manuscript 검토"·"새 협력자 30분 합류"·"학부생 일일 보고"* 같은 채팅창 한 줄짜리 일상.

9. **"옮길 수 있는" 8 원칙** — 단일 운영 매뉴얼 · 단일 매핑 소스 · 메모리 누적 가드레일 · 덤프→분류→운영→분석 4단계 · 출력 경로 사전 지정 · 노트 끝에 다음 작업 박기 · 웹 검색 차단의 가치(unknown은 컬럼에) · 일일 모니터의 누적 가치(1,101줄 스크립트가 30일 누적되면 분야 동향 데이터셋).

## 방법론 및 아키텍처 (Methodology and Architecture)

### Compounding Flow — 어제 위에 오늘이 쌓인다

매일 도는 5개 독립 루프(Paper Monitor · Ingest · Notion 포스팅 · Audit · Question→Backlog)가 서로 *출력 → 입력*으로 맞물려 31일 뒤 위키가 *"읽는 저장소"에서 "굴리는 시스템"*으로 옮겨간다. 한 루프가 멈춰도 다른 루프는 도는 독립성이 단일 장애점을 없앤다.

### AGENTS.md Trellis — 21일치 머릿속 룰이 단 1일 커밋으로

```
04-08 첫 커밋    ────  0줄
04-09 덤프 끝   ────  0줄
04-29 규칙화   ████ 488줄  ← 21일치 머릿속 룰이 한 번에 글로
05-08 현재      █████ 567줄
```

> **PI 모니터 시그널**: 800줄·1000줄로 가면 분야별 분기 단계 — sub-AGENTS.md 분리 타이밍.

### External 5 (MCP 통합 토폴로지)

```
llm-wiki (로컬)
    ├─→ Notion (5 DB · 3-앵커 표준: 📚 참고 논문 / 📅 미팅 노트 / 🗂 리소스)
    ├─→ Slack MCP (#lab-papers, #lab-collab 자동 포스트)
    ├─→ Gmail MCP (공동연구자 메일 초안)
    ├─→ Grants 매핑 (notion-grant-mapping.md — 단일 소스)
    └─→ AI Agents (Claude 대화형 + Codex CLI 배치, AGENTS.md 공유)
```

### 분석 백로그 6-row 템플릿

| 칸 | 내용 | 가드레일 |
|---|---|---|
| Goal | 한 문장 · 동사 박힌 결과물 | "이해한다"/"검토한다" 금지 |
| Input | 근거 노트 절대경로 리스트 | 웹 검색 차단, 잡지식 빈칸 금지 |
| Output | 생성될 파일 경로 사전 지정 | 사후 정리 비용 제거 |
| Template | TSV 첫 줄 박기 | 컬럼 = 분석 변수 사전 |
| Done | 3~5개 명시적 종료 조건 | 누가 봐도 같게 판정 |
| Prompt | 5칸을 한 문단으로 압축 | 다른 프로젝트에서 재사용 |

## 결과 (Results)

| 지표 | 31일 누적치 |
|---|---|
| 위키 노트 | **3,955** 페이지 / 38 카테고리 |
| sources 마크다운 | 3,369 |
| 원본 PDF | 3,398 |
| AGENTS.md | **567줄** (04-29 한 커밋에 488줄 일괄) |
| paper_monitor.py | **1,101줄** (일일 자동 실행) |
| 일일 모니터 리포트 | 13개 |
| 병렬 프로젝트 | 5개 (PROJECT-α/β/γ/δ/ε) |
| 그랜트 매핑 | 4개 (GRANT-A/B/C/D) |
| External MCP 통합 | 5 시스템 |
| Phase 5 분석 산출 | 32 질문 + 7 P0 백로그 + 4 분석 스펙 + 4 TSV 템플릿 (단 하루) |

*Phase 1 덤프(4일) → Phase 2 분류(12일) → Phase 3 규칙화(1일) → Phase 4 운영(6일) → Phase 5 분석(1일)*. 21일치 머릿속 룰이 단 1일 커밋으로 박힌 04-29가 성숙기 진입 분기점이고, 그 뒤 9일 만에 *읽는 위키 → 굴리는 위키* 전환이 일어났다.

## 한계 (Limitations)

- **케이스 N=1, 도메인 익명화**: 단일 PI 연구실(생물학·신경과학) 31일치 자기 기록이고 PROJECT/GRANT 이름이 가려져 있어 외부 검증자가 도메인 일반화를 시뮬레이션하기 어렵다. *§07 "Adapt" 8 원칙*으로 도메인 비종속성을 주장하지만 입증은 후속 사례 몫이다.
- **AGENTS.md 분기 기준 미정의**: PI 플레이북이 *"800줄·1000줄 가면 적신호, sub-AGENTS.md 분리"*를 명시하지만 분기 기준(도메인 수 / 학생 수 / 외부 시스템 수)은 미공개. 현실에서 가장 어려운 결정이 여전히 PI 직관에 맡겨져 있다.
- **paper_monitor.py 1,101줄 내부 미공개**: 30일 누적이 분야 동향 데이터셋이 된다는 주장은 매력적이지만 *입력 소스·신호 추출 로직*을 본 인터랙티브가 공개하지 않아 재현이 막힌다.
- **Phase 5 1일 산출의 reproducibility**: 위키 3,955페이지를 32 질문·7 P0 백로그로 압축한 *스캐닝 전략·프롬프트*가 빠져 있어 다른 연구실이 같은 일을 *해본 적 없는 시점*에 시도하기 어렵다.
- **외부 협력자 합류 비용**: W4 워크플로우는 30분 합류를 약속하지만 567줄 AGENTS.md를 새 협력자가 읽지 않은 채 시작할 때 누적되는 룰 위반 격차의 처리가 비어 있다.

## 관련 페이지 (Related Pages)

- [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]] — Karpathy LLM Wiki Gist의 영어권 25~35분 입문 가이드. *진입 25분 ↔ 본 자료의 31일 성숙*으로 양 끝을 잇는다.
- [[applications/kmyu-2026-llm-wiki-pattern-synthesis]] — 본 ai-wiki 소유자의 LLM Wiki 패턴 한국어 종합 정리. *~100 sources 천장* 논의가 본 자료의 3,955페이지 운영과 흥미로운 대비.
- [[applications/agricidaniel-claude-obsidian]] — Karpathy 패턴을 Claude Code 스킬 15개 + Obsidian vault + hybrid retrieval로 구현한 reference. *15 skills + retrieval ↔ 567줄 AGENTS.md + 5 외부 시스템*의 구조 대 운영 대비.
- [[applications/kmyu-2026-akb-llmwiki-gbrain-comparison]] — AKB·llmwiki·GBrain 6축 5점 척도 비교. 본 자료가 "llmwiki"의 31일 실증 사례.
- [[applications/dnotitia-akb]] — Dnotitia MCP-first agent knowledge base. *MCP 통합 5개*의 제품화 사상.
- [[applications/lum1104-understand-anything]] — 임의 코드베이스를 7단계 파이프라인으로 분석. *논문 코퍼스 진화 ↔ 코드 코퍼스 분석*의 도메인 대비.
- [`CLAUDE.md`](../../CLAUDE.md) — 본 ai-wiki repo의 운영 매뉴얼. Joonan Lab의 *AGENTS.md 단일 매뉴얼 패턴*과 정확히 같은 사상.
