---
title: "MadsLorentzen/ai-job-search"
type: repo
year: 2026
category: agents
raw_path: raw/repos/madslorentzen-ai-job-search.md
raw_filename: "madslorentzen-ai-job-search.md"
source_collection: external
source: madslorentzen-ai-job-search.md
org: "MadsLorentzen"
repo: "ai-job-search"
url: "https://github.com/MadsLorentzen/ai-job-search"
license: "MIT"
tags: [claude-code, agent-workflow, drafter-reviewer, job-search, cv-generation, latex, skills, subagent]
---

## 요약 (Summary)

`MadsLorentzen/ai-job-search`는 Claude Code 위에 지은 구직 자동화 프레임워크다. `/setup`으로 프로필을 채우면 `/scrape`가 여러 구직 포털에서 공고를 모으고 `/apply`가 drafter-reviewer 2단계 에이전트 구조로 LaTeX CV와 커버레터를 작성한 뒤 PDF를 직접 렌더링해 검증까지 마친다. 저자 Mads Lorentzen은 지구물리학 전공자로, 2025년 말 실직 후 이 프레임워크로 직접 구직해 69건 지원·20건 1차 면접·1건 계약 성사를 거쳐 2026년 6월 AI 엔지니어로 입사한 뒤 코드를 공개했다.

## 주요 기여 (Key Contributions)

- 코어 워크플로우는 언어·국가에 독립적이다. 자기 프로필링, fit 평가, drafter-reviewer 지원 파이프라인은 언어·국가에 무관하게 동작한다. 구직 포털 검색 스킬만 덴마크 시장(Jobindex, Jobnet, Akademikernes Jobbank 등)에 맞춰져 있고 `/add-portal` 커맨드로 다른 나라 포털로 교체하는 패턴을 제공한다.
- drafter-reviewer 2단계 에이전트 구조를 둔다. 초안 작성 에이전트가 CV·커버레터를 쓰면, 새 컨텍스트로 스폰된 두 번째 에이전트가 회사를 리서치하고 초안을 비평한다. 그 피드백으로 다시 수정하는 구조라 키워드 누락이나 밋밋한 문장을 한 번 걸러낸다.
- PDF 컴파일-검증 루프를 돈다. LaTeX 이력서 템플릿은 `.tex`에서는 멀쩡해 보여도 PDF로 뽑으면 직함이 다음 페이지로 넘어가거나 커버레터가 2페이지로 밀리는 문제가 흔하다. `/apply`는 lualatex(CV)·xelatex(커버레터)로 실제 컴파일한 뒤 렌더링된 페이지를 읽고 `\needspace`, `\enlargethispage` 같은 조정을 반복해 CV 2페이지·커버레터 1페이지를 맞춘다.
- ATS 검증은 PDF 텍스트 레이어를 기준으로 삼는다. `pdftotext`로 컴파일된 CV의 텍스트를 추출해 연락처가 리터럴 텍스트로 들어 있는지, 글리프가 깨지지 않았는지, 읽기 순서가 맞는지 확인하고 공고 키워드 커버리지까지 점수화한다. 프로필이 실제로 뒷받침하지 않는 키워드는 채워 넣지 않고 격차로 남겨 둔다.
- CV 컷팅은 연관성으로 가중한다. CV가 2페이지를 넘기면 오래된 항목부터 기계적으로 자르지 않는다. 각 항목을 대상 공고와의 연관성, 문서 내 고유성, 커버레터가 그 항목에 의존하는지로 점수화해 총점이 가장 낮은 줄부터 제거한다.
- 확장 커맨드는 9개다. `/interview`(단계별 면접 준비팩 + 모의 면접), `/outcome`(결과 기록·아카이브), `/notion-sync`(Notion MCP로 읽기 전용 파이프라인 뷰 발행), `/rank`(스크랩 결과 배치 스코어링), `/expand`(공개 소스 스캔으로 프로필 보강), `/upskill`(스킬 격차 히트맵 + 학습 계획), `/html-report`(오프라인 HTML 대시보드), `/add-template`(커스텀 LaTeX 템플릿 등록), `/add-portal`(신규 구직 포털 스킬 생성).

## 방법론 및 아키텍처 (Methodology and Architecture)

전체 흐름은 `/setup → /scrape → /apply`로 이어진다. `/setup`은 `documents/` 폴더(CV PDF, LinkedIn export, 졸업장, 추천서, 과거 지원 기록)를 읽는 경로, CV 한 장을 붙여넣는 경로, 인터뷰로 처음부터 채우는 경로 세 가지를 자동 감지해 제시하며 문서 폴더 모드는 재실행해도 안전하게 누적된다.

`/scrape`는 여러 구직 포털을 검색해 중복을 제거하고 fit 순으로 정렬해 보여준다. 결과가 너무 많으면 `/rank`가 병렬 에이전트로 각 공고를 가져와 fit 프레임워크의 다섯 평가축으로 배치 스코어링하고 필수 조건(deal-breaker)에 걸리면 거부권을 행사하며 마감이 임박한 공고엔 긴급 표시를, 이미 마감된 공고엔 만료 표시를 붙인다.

`/apply`는 8단계로 구성된다. 공고를 파싱해 프로필과 대비한 fit을 평가한 뒤 LaTeX CV·커버레터 초안을 쓴다. 이어 리뷰어 에이전트를 스폰해 회사를 리서치하고 초안을 비평하게 한 다음 그 피드백으로 수정한다. 마지막으로 PDF를 컴파일해 시각 검사와 ATS 텍스트 레이어 검증을 거친 뒤 체크리스트와 함께 최종 결과를 제시한다. 리뷰어 에이전트는 초안을 다시 읽지 않고 인라인으로 전달받으며 검증 체크리스트도 워크플로우 끝에서 한 번만 돌려 토큰을 아낀다. 대신 PDF 렌더링·레이아웃 반복 단계가 그만큼의 토큰을 다시 소비한다고 README는 밝힌다.

구직 포털 공고는 신뢰할 수 없는 입력으로 다룬다. 워크플로우는 공고 본문에 박힌 지시를 따르지 않고 본문 속 링크도 fetch하지 않는다. 다만 이 방어는 명령어 수준이지 샌드박스가 아니므로, 낯선 구직 게시판에서는 가져온 내용과 작성된 결과를 보내기 전에 훑어보라고 권한다.

`.agents/skills/`에는 덴마크 4개 포털(Jobbank, Jobdanmark, Jobindex, Jobnet) CLI 스킬과 함께, 국가에 무관하게 바로 쓸 수 있는 `linkedin-search`(LinkedIn 공개 `jobs-guest` 엔드포인트, 런타임 의존성 0, 위치를 명시적 플래그로 받음, 개인 사용 전용)와 `freehire-search`(freehire.dev 공개 REST API, 지역·국가·원격 필터, 자체 호스팅 가능한 MIT 백엔드)가 들어 있다. `/add-portal`은 새 포털의 검색 URL 패턴·결과 구조·robots.txt를 조사해 같은 구조의 CLI 스킬을 스캐폴딩하고 실제 쿼리로 테스트한 뒤 등록한다.

## 결과 (Results)

저자 본인의 실사용 결과가 벤치마크를 대신한다. 69건 맞춤 지원, 20건 1차 면접, 1건 계약 성사(2026년 6월 AI 엔지니어로 입사). CI는 LaTeX smoke 컴파일, 스킬 lint, CLI 타입체크를 돌린다.

## 한계 (Limitations)

- 포털 스킬이 덴마크에 특화돼 있다. 코어 워크플로우는 언어·국가 무관이지만 기본 제공 포털 4개는 덴마크 시장 전용이며 다른 나라는 `/add-portal`로 직접 스킬을 만들어야 한다.
- LaTeX에 의존한다. CV·커버레터가 LaTeX 기반이라 lualatex·xelatex를 갖춘 배포판 설치가 필수이며 미니멀 TeX 배포판은 추가 패키지 설치가 필요하다.
- 에이전틱 방어가 명령어 수준이다. prompt injection 방어가 지시 레벨에 머물러 있어 완전한 샌드박스는 아니다.
- LinkedIn 스킬에 ToS 리스크가 있다. `linkedin-search`는 LinkedIn 이용약관상 자동화 접근이 금지돼 있어 개인 사용과 저볼륨 사용을 전제로만 제공한다.

## 관련 페이지 (Related Pages)

- [[agents/ai-boost-awesome-harness-engineering|Awesome Harness Engineering]] — CLAUDE.md, 커맨드, 스킬로 구성된 이 저장소의 구조 자체가 harness engineering의 실사례에 해당한다
- [[agents/garrytan-gstack|gstack: AI-Powered Software Factory]] — Claude Code 슬래시 커맨드·스킬 팩으로 도메인 워크플로우 전체를 자동화하는 동일 패턴의 다른 사례
- [[agents/luis-carrijo-2026-claude-code-team-just-dropped|Claude Code team just dropped a free course]] — 이 저장소가 사용하는 Claude Code의 skills·permissions·subagent 스폰 메커니즘을 설명하는 강좌
