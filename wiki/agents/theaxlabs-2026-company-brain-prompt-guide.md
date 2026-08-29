---
title: "컴퍼니 브레인 만드는 법 — 바로 복사해 쓰는 프롬프트 6종"
type: article
year: 2026
category: agents
source: theaxlabs-2026-company-brain-prompt-guide.md
raw_path: raw/articles/theaxlabs-2026-company-brain-prompt-guide.md
raw_filename: "theaxlabs-2026-company-brain-prompt-guide.md"
source_collection: external
author: "AX LABS"
url: "https://theaxlabs.com/blog/company-brain-prompt-guide"
publisher: "AX LABS"
publication_date: "2026-08-27"
tags: [company-brain, context-engineering, agents-md, agent-memory, knowledge-management, prompt-library, worker-spec, review-gate]
figures:
  - id: fig01
    file: assets/theaxlabs-2026-company-brain-prompt-guide/fig01.png
    raw: raw/articles/theaxlabs-2026-company-brain-prompt-guide-figures/fig01.png
    caption: "히어로 이미지 — 구슬이 한 점으로 모였다 퍼지는 추상 조형"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/theaxlabs-2026-company-brain-prompt-guide/page-full.png
    raw: raw/articles/theaxlabs-2026-company-brain-prompt-guide-figures/page-full.png
    caption: "전체 페이지 스크린샷 (상단 6,000px 절단)"
    strategy: screenshot
    curated: false
  - id: fig03
    file: assets/theaxlabs-2026-company-brain-prompt-guide/crop01.png
    raw: raw/articles/theaxlabs-2026-company-brain-prompt-guide-figures/crop01.png
    caption: "히어로 이미지 크롭"
    strategy: crop
    curated: false
  - id: fig04
    file: assets/theaxlabs-2026-company-brain-prompt-guide/crop02.png
    raw: raw/articles/theaxlabs-2026-company-brain-prompt-guide-figures/crop02.png
    caption: "히어로 이미지 크롭 (중복)"
    strategy: crop
    curated: false
  - id: fig05
    file: assets/theaxlabs-2026-company-brain-prompt-guide/crop03.png
    raw: raw/articles/theaxlabs-2026-company-brain-prompt-guide-figures/crop03.png
    caption: "관련 글 카드 썸네일 — 장식용 조형"
    strategy: crop
    curated: false
  - id: fig06
    file: assets/theaxlabs-2026-company-brain-prompt-guide/crop04.png
    raw: raw/articles/theaxlabs-2026-company-brain-prompt-guide-figures/crop04.png
    caption: "관련 글 카드 썸네일 — 장식용 조형"
    strategy: crop
    curated: false
  - id: fig07
    file: assets/theaxlabs-2026-company-brain-prompt-guide/crop05.png
    raw: raw/articles/theaxlabs-2026-company-brain-prompt-guide-figures/crop05.png
    caption: "관련 글 카드 썸네일 — 장식용 조형"
    strategy: crop
    curated: false
---

## 요약 (Summary)

회사에서 가장 똑똑한 AI는 보통 한 사람 밑에서 일한다. 누군가는 회사 전략을 이해한 채팅을 갖고 있고, 누군가는 대표가 원하는 제안서 문장을 정확히 아는 세션을 갖고 있다. 그 학습은 전부 채팅 안에서 끝난다. AX LABS가 2026년 8월에 쓴 이 글은 그 학습을 밖으로 꺼내는 절차를 다룬다. 도구 이야기가 아니라 프롬프트 이야기이고, 지도 파일 한 장과 라우팅 표 하나, 그리고 복사해 쓰는 프롬프트 여섯 개가 전부다.

축이 되는 판단은 짧다. 교정은 결과물보다 비싸다. 결과물은 한 번 쓰이고 끝나지만 교정은 규칙이 될 수 있는데, 실무는 결과물만 저장하고 교정은 버린다. 그래서 회사는 매일 AI를 가르치면서 아무것도 기억하지 못한다.

## 주요 기여 (Key Contributions)

- 쓸 만한 브레인을 기억·판단·역량·학습 네 층으로 가르고, 각 층이 빠졌을 때 실제로 벌어지는 증상을 대응시켰다.
- 에이전트가 가장 먼저 읽을 "회사 지도" 파일 템플릿을 전문으로 공개했다.
- 교정이 드러낸 결함 유형을 저장 위치로 보내는 라우팅 표 6행을 정의했다.
- 채굴·지도·교정·워커·심사·헬스체크 여섯 자리의 프롬프트를 그대로 복사해 쓸 수 있는 형태로 적었다.
- 모든 교정을 저장해 정책 파일이 부풀어 오르는 반대 방향의 실패를 3회 규칙으로 막았다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 브레인은 검색창이 아니다

사내 지식 프로젝트의 통상 경로는 회의록·전략 덱·고객 통화를 전부 모으고 그 위에 검색창을 얹은 다음 브레인이라 부르는 것이다. 저자의 진단은 한 줄이다. 정보는 늘었고 판단은 그대로다.

| 층 | 무엇을 담는가 | 없으면 생기는 일 |
|---|---|---|
| 기억 | 지금 유효한 사실·결정·이력 | 낡은 사실을 확신에 차서 말한다 |
| 판단 | 좋은 결과를 규정하는 규칙과 기준 | 매번 다른 기준으로 만든다 |
| 역량 | 다시 실행할 수 있는 스킬과 워커 | 사람마다 절차를 새로 발명한다 |
| 학습 | 검토를 통과한 교정 | 같은 실수를 조직 전체가 반복한다 |

대부분의 조직은 첫 층만 만들고 브레인이라 부른다. 결과를 실제로 바꾸는 것은 나머지 세 층이다.

### 컨텍스트를 늘리면 판단이 나빠진다

회사 자료를 전부 프롬프트에 밀어 넣으면 낡은 캠페인이 현재 포지셔닝과 같은 무게로 경쟁하고, 흘러가는 회의 메모가 승인된 결정과 같은 줄에 선다. 이력이 정책처럼 보이기 시작한다. 해법은 매 프롬프트에 기억을 더 넣는 것이 아니라 더 나은 내비게이션이다. 지도만 상시로 두고 나머지는 작업이 필요로 할 때 열게 한다. 콘텐츠 에이전트는 포지셔닝과 승인 문구와 톤을 열고, 개발 에이전트는 아키텍처 결정과 보안 정책을 연다. 같은 브레인을 쓰지만 회사 전체를 매 대화에 끌고 들어오지는 않는다.

context engineering은 유한한 attention budget에 넣을 토큰을 고르는 설계를 말한다. 이 글의 기여는 그 선택을 모델 쪽 기법이 아니라 폴더 구조와 운영 규칙으로 옮겨 놓은 데 있다.

### 지도 파일

템플릿은 다섯 부분이다. 우리가 하는 일을 다섯 줄 이내로, 지금 중요한 것 세 가지, 진실의 순서, 어디를 볼 것인가, 그리고 규칙이다. 폴더는 `decisions/`·`people/`·`projects/`·`policies/`·`skills/`·`workers/`·`learnings.md` 일곱 자리로 잡는다.

규칙 절의 다섯 문장이 이 템플릿의 실질이다.

- 승인된 최신 정보를 쓴다
- 두 출처가 충돌하면 "진실의 순서"를 따른다
- 답이 없으면 없다고 말하고, 무엇을 못 찾았는지 함께 적는다
- 추측을 회사 지식으로 승격하지 않는다
- 확정일이 6개월 지난 항목은 인용 전에 "확인 필요"로 표시한다

### 여섯 개의 프롬프트

| # | 자리 | 하는 일 | 설계의 급소 |
|---|---|---|---|
| 1 | 채굴 | 지난 30일 채팅에서 교정·반복 설명·좋았던 요청문·매번 붙여 넣은 자료를 뽑는다 | 네 번째 항목이 곧 브레인에 없는 것의 목록이다 |
| 2 | 지도 | 반복 업무 하나를 기준으로 지도 파일 초안을 만든다 | 에이전트가 되물을 질문 5개를 마지막에 뽑게 한다 |
| 3 | 교정 | 결과물이 아니라 원인을 고친다 | 원인을 6종 중 하나로 특정하고, 스스로 반박해 살아남는지 본다 |
| 4 | 워커 | 반복 업무를 다음 사람이 재실행할 명세로 바꾼다 | 중단 조건 최소 3가지와 실패 신호를 강제한다 |
| 5 | 심사 | 회사 기본값으로 승격할지 반대편에서 검토한다 | 옹호를 금지하고 다른 팀 상황 두 개로 검증한다 |
| 6 | 헬스체크 | 주 1회 브레인의 구멍을 찾는다 | 아무도 열지 않은 파일을 찾아 지운다 |

프롬프트 1의 출력 규칙이 눈에 띈다. 요약하지 말고 사용자가 쓴 문장을 그대로 인용할 것, 확실하지 않으면 "확인 필요"로 표시하고 추측으로 채우지 말 것, 취향인지 회사 규칙인지 애매하면 둘 다 적고 판단은 사람에게 넘길 것. 환각을 막는 장치가 프롬프트 안에 직접 들어가 있다.

프롬프트 4의 금지 목록도 실무적이다. "적절히", "필요시", "잘" 같은 판단 유예 표현을 쓰지 못하게 하고, 중단 조건이 없는 명세를 명세로 인정하지 않는다. 중단 조건이 없는 워커는 워커가 아니라 자동화된 사고이며, 실패 신호를 적어 두지 않으면 잘못된 결과가 조용히 몇 주를 돌아간다.

### 교정 라우팅 표

프롬프트 3이 참조하는 표다.

| 교정이 드러낸 것 | 저장 위치 | 형태 |
|---|---|---|
| 빠졌거나 낡은 사실 | 회사 지식 | 확정일과 출처가 붙은 한 줄 |
| 새로 내린 전략적 선택 | 결정 기록 | 무엇을 대체하는지 명시 |
| 반복되는 선호 | 정책 | 항상 적용되는 규칙 문장 |
| 효과가 검증된 기법 | 스킬 | 언제 쓰는지 + 절차 |
| 반복되는 절차 | 워커 | 입력·단계·출력·중단 조건 |
| 위험한 행동 | 기계적 차단 | 프롬프트가 아니라 권한과 게이트 |

마지막 행이 실무에서 가장 자주 틀리는 자리다. 돈이 나가거나 회사 밖으로 나가는 행동을 문장으로 막으면 안 된다. "함부로 보내지 마세요"는 정책이 아니라 희망이다. 발송·결제·삭제는 권한과 승인 단계로 막고, 프롬프트에는 그 게이트가 있다는 사실만 적는다. 가드레일을 프롬프트 층이 아니라 권한 층에 두라는 주문이다.

### 3회 규칙

교정이 중요하다는 말을 들은 팀은 모든 교정을 저장하기 시작한다. 석 달 뒤 정책 파일은 200줄이 되고 그중 절반은 한 사람의 그날 기분이다. 기준은 이렇다. 1회면 고치고 버린다. 2회면 메모만 남기고 아직 승격하지 않는다. 서로 다른 사람에게서 서로 다른 건으로 세 번째 나올 때 정책으로 올린다.

"서로 다른 사람"이 핵심이다. 한 사람이 세 번 같은 말을 한 것은 회사 규칙이 아니라 그 사람의 취향이고, 취향을 정책으로 올리면 나머지 팀은 그 규칙을 우회하는 방법을 배우게 된다. 저장할 때 붙이는 메타는 확정일·소유자·무엇을 대체했는가 셋이며, 이 셋이 없는 문장은 시간이 지나면 유령 권위가 된다.

### 어디에 두는가

파일로 시작하는 것이 맞다. 지도 파일 하나와 폴더 여섯 개면 첫 버전으로 충분하다. 코딩 에이전트를 쓴다면 진입점은 이미 표준이 있어서, 2026년 8월 기준 Codex·Cursor·Copilot·Gemini CLI 등 대부분의 CLI가 Linux Foundation 산하 Agentic AI Foundation이 관리하는 `AGENTS.md`를 읽는다. Claude Code는 여전히 `CLAUDE.md`를 먼저 읽으므로 첫 줄에 `@AGENTS.md` 한 줄을 넣어 둘을 잇는 방식이 흔히 쓰인다.

승격 게이트는 새로 살 필요가 없다는 지적도 붙는다. 브레인을 레포 안 파일로 두면 승격은 풀 리퀘스트가 되고, 검토는 코드 리뷰가 되고, 이력은 커밋 로그가 된다.

## 결과 (Results)

정량 실험은 없다. 대신 운영 지표를 하나 제안하는데, 관리 지표는 파일 개수가 아니라 충돌 개수여야 한다는 것이다. 파일이 늘어도 충돌이 없으면 건강하고, 파일이 적어도 충돌이 잦으면 이미 망가진 상태다.

브레인이 망가지는 방식은 넷으로 정리된다.

- 아카이브화 — 있는 자료를 다 넣는다. 검색은 되는데 판단이 나빠진다. 브레인은 도서관이 아니라 편집된 기준이다.
- 유령 권위 — 확정일과 소유자가 없는 문장이 정책 행세를 한다.
- 랩탑 감금 — 한 사람의 폴더에서 시작한 브레인이 그 폴더에 남는다. 두 번째 사람이 합류하는 순간 사본이 갈라지고, 회사 브레인은 다시 개인 브레인 다섯 개가 된다.
- 검토 없는 자동 승격 — 에이전트가 스스로 학습을 저장한다. 처음 몇 주는 마법 같고, 그다음에는 아무도 틀린 문장이 언제 들어왔는지 모른다.

착수는 일주일 단위로 제시한다. 설명하기 지친 업무를 하나 고르고, 팀원 각자가 프롬프트 1을 돌린 결과를 한 문서에 모으고, 프롬프트 2로 지도 초안을 만들되 유지할 수 없는 칸은 비워 두고, 그 업무를 실제로 한 번 돌리며 교정마다 프롬프트 3으로 원인에 되돌리고, 금요일에 프롬프트 6을 돌린다. 한 달짜리 설계를 하지 말라는 것이 마지막 당부다. 아름다운 아카이브 하나보다 매주 반복되던 실수 하나를 없애는 작은 브레인이 낫다는 이유에서다.

## 한계 (Limitations)

근거가 저자의 현장 경험이라 4층 구조나 3회 규칙 같은 수치에 실측이 붙어 있지 않다. 출발점이 된 J.B.의 원글은 X 계정 링크로만 걸려 있어 원 주장과 확장분을 가르기 어렵다. 글 말미가 자사 방법론과 HQ 제품으로 이어지는 마케팅 동선이라, 프레임과 홍보를 갈라 읽을 필요도 있다. 프롬프트 6종이 모두 사람이 손으로 붙여 넣는 형태라는 점, 그리고 폴더 구조가 수십 명 규모에서 어떻게 버티는지를 다루지 않은 점은 열려 있는 자리다.

## 관련 페이지 (Related Pages)

- [[agents/anthropic-2025-effective-context-engineering-for-ai]] — 컨텍스트를 늘릴수록 판단이 나빠진다는 이 글의 전제를 attention budget·context rot로 정식화한 원류
- [[overviews/gbrain-ecosystem-overview]] — markdown 파일로 조직 지식을 쌓아 에이전트 메모리로 쓰는 계열. 이쪽은 제품, 이 글은 운영 규칙에 무게를 둔다
- [[agents/google-labs-code-design-md]] — 도메인 지식을 단일 `.md`로 코딩 에이전트에 넘기는 포맷. 지도 파일과 같은 발상을 디자인 시스템에 적용했다
- [[agents/agentskills-io-2026-agent-skills-overview]] — `AGENTS.md` 계열 진입점 표준이 40여 클라이언트로 퍼진 경위
- [[agents/microsoft-skillopt]] — 승격 전 게이트를 두는 구조가 같다. 이 글은 사람이, SkillOpt은 held-out validation이 게이트를 지킨다
- [[agents/osmani-2026-agent-skills]] — 워커 명세의 중단 조건·실패 신호 요구와 같은 자리를 non-negotiable verification으로 부른다
- [[agents/cemri-2025-why-do-multi-agent-llm-systems]] — 프롬프트 5가 막으려는 자기 승격 실패가 MAST의 Task Verification 카테고리와 겹친다
- [[agents/runkle-2026-the-art-of-loop-engineering]] — 주간 헬스체크는 loop 3·4의 자기개선 루프에 해당한다
