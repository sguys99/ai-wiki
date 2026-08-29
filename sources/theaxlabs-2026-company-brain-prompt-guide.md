---
title: "컴퍼니 브레인 만드는 법 — 바로 복사해 쓰는 프롬프트 6종"
type: article
year: 2026
category: agents
raw_path: raw/articles/theaxlabs-2026-company-brain-prompt-guide.md
raw_filename: "theaxlabs-2026-company-brain-prompt-guide.md"
source_collection: external
author: "AX LABS"
url: "https://theaxlabs.com/blog/company-brain-prompt-guide"
publisher: "AX LABS"
publication_date: "2026-08-27"
extractor_tier: "chrome"
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

## 한 줄 요약 (One-line Summary)

개인 채팅 안에 갇힌 교정을 회사 자산으로 옮기는 절차를, 지도 파일 템플릿·교정 라우팅 표·복사해 쓰는 프롬프트 6종으로 구체화한 한국어 실무 가이드다.

## 1. 자료 정보 (Document Information)

- 저자: AX LABS (한국 AI 전환 컨설팅사)
- 발행: 2026-08-27, 읽는 시간 12분, 블로그 카테고리 "에이전트 제품 설계"
- 원문: <https://theaxlabs.com/blog/company-brain-prompt-guide>
- 출발점이 된 글: J.B.(@VibeMarketer_), "How to Build a Company Brain That Gets Smarter Every Week" (2026년 8월). 원글을 그대로 옮긴 번역이 아니라 프롬프트 전문과 라우팅 표를 자체 작성해 붙인 확장판이다.
- 성격: 도구 소개가 아니라 프롬프트와 운영 규칙 중심의 실행 가이드. 벤치마크나 정량 실험은 없다.

## 2. 주요 기여 (Key Contributions)

글이 세우는 문제의식은 한 문장이다. 회사는 매일 AI를 가르치는데 회사는 아무것도 기억하지 못한다. 영업 리드가 반론을 설명하고 대표가 같은 문장을 다섯 번째 고쳐 써도, 그 학습은 각자의 채팅 로그에 묻힌다. 저자는 그 결과를 "조용한 분기(fork)"라 부른다. 한 에이전트는 지난 분기 캠페인을 현재로 알고, 다른 에이전트는 승인된 적 없는 선호를 규칙으로 따르며, 세 번째만 결과가 좋은데 그 이유는 그 사람이 마법의 프롬프트를 알고 있어서다.

여기서 나오는 판단이 이 자료의 축이다. **교정은 결과물보다 비싸다.** 결과물은 한 번 쓰이고 끝나지만 교정은 규칙이 될 수 있는데, 실무는 결과물만 저장하고 교정은 버린다.

구체적으로 남긴 것은 네 가지다.

- 쓸 만한 브레인의 4층 구조와, 각 층이 없을 때 실제로 벌어지는 일의 대응표
- 에이전트가 가장 먼저 읽을 "회사 지도" 파일 템플릿 전문
- 교정이 드러낸 결함 유형을 저장 위치로 보내는 라우팅 표 6행
- 채굴·지도·교정·워커·심사·헬스체크 여섯 자리에 넣는 프롬프트 전문

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 브레인은 검색창이 아니다

사내 지식 프로젝트의 통상 경로는 자료를 전부 모으고 그 위에 검색창을 얹는 것이다. 저자의 진단은 짧다. 정보는 늘었고 판단은 그대로다. 쓸 만한 브레인에는 네 층이 있어야 한다.

| 층 | 무엇을 담는가 | 없으면 생기는 일 |
|---|---|---|
| 기억 | 지금 유효한 사실·결정·이력 | 낡은 사실을 확신에 차서 말한다 |
| 판단 | 좋은 결과를 규정하는 규칙과 기준 | 매번 다른 기준으로 만든다 |
| 역량 | 다시 실행할 수 있는 스킬과 워커 | 사람마다 절차를 새로 발명한다 |
| 학습 | 검토를 통과한 교정 | 같은 실수를 조직 전체가 반복한다 |

대부분의 조직은 첫 층만 만들고 브레인이라 부른다는 것이 지적이다.

### 컨텍스트를 늘리면 판단이 나빠진다

지도를 먼저 주는 이유를 저자는 컨텍스트 오염으로 설명한다. 회사 자료를 전부 프롬프트에 밀어 넣으면 낡은 캠페인이 현재 포지셔닝과 같은 무게로 경쟁하고, 흘러가는 회의 메모가 승인된 결정과 같은 줄에 선다. 이력이 정책처럼 보이기 시작한다. 해법은 매 프롬프트에 기억을 더 넣는 것이 아니라 더 나은 내비게이션이다. 지도만 상시로 두고 나머지는 작업이 필요로 할 때 열게 한다 — 콘텐츠 에이전트는 포지셔닝과 톤을, 개발 에이전트는 아키텍처 결정과 보안 정책을 연다. 이 대목이 context engineering 논의와 직접 맞물린다. context engineering은 유한한 attention budget에 무엇을 넣을지 고르는 설계를 말하는데, 이 글은 그 선택을 지도 파일 한 장과 폴더 여섯 개라는 조직 운영 형태로 옮긴다.

### 지도 파일

에이전트가 처음 읽는 파일은 회사 전체가 아니라 회사 지도여야 한다. 템플릿은 다섯 부분이다. 우리가 하는 일(다섯 줄 이내), 지금 중요한 것(우선순위 3), 진실의 순서(충돌 시 어느 시스템이 이기는지), 어디를 볼 것인가(`decisions/`·`people/`·`projects/`·`policies/`·`skills/`·`workers/`·`learnings.md`), 그리고 규칙이다.

규칙 절에 들어가는 다섯 문장이 이 템플릿의 실질이다. 승인된 최신 정보를 쓸 것, 충돌하면 진실의 순서를 따를 것, 답이 없으면 없다고 말하고 무엇을 못 찾았는지 함께 적을 것, 추측을 회사 지식으로 승격하지 말 것, 확정일이 6개월 지난 항목은 인용 전에 "확인 필요"로 표시할 것.

### 여섯 개의 프롬프트

| # | 자리 | 하는 일 | 설계의 급소 |
|---|---|---|---|
| 1 | 채굴 | 지난 30일 채팅에서 교정·반복 설명·좋았던 요청문·매번 붙여 넣은 자료를 뽑는다 | 네 번째 항목 — 매번 붙여 넣어야 했던 자료가 곧 브레인에 없는 것의 목록이다 |
| 2 | 지도 | 반복 업무 하나를 기준으로 지도 파일 초안을 만든다 | 마지막 줄에서 에이전트가 되물을 질문 5개를 뽑게 한다. 못 물어본 것이 지도의 첫 구멍이다 |
| 3 | 교정 | 결과물이 아니라 원인을 고친다 | 원인을 6종 중 하나로 특정하고, 라우팅 표에서 저장 위치를 하나 고르고, 스스로 반박해 살아남는지 본다 |
| 4 | 워커 | 반복 업무를 다음 사람이 재실행할 명세로 바꾼다 | 중단 조건 최소 3가지와 실패 신호를 강제하고 "적절히·필요시·잘"을 금지한다 |
| 5 | 심사 | 회사 기본값으로 승격할지 반대편에서 검토한다 | 옹호를 금지하고, 다른 팀 상황 두 개를 만들어 취향인지 규칙인지 검증한다 |
| 6 | 헬스체크 | 주 1회 브레인의 구멍을 찾는다 | 다섯째 항목 — 아무도 열지 않은 파일을 찾아 지운다 |

프롬프트 1에서 요구하는 출력 규칙이 특징적이다. 요약하지 말고 사용자가 쓴 문장을 그대로 인용할 것, 확실하지 않으면 "확인 필요"로 표시하고 추측으로 채우지 말 것, 취향인지 회사 규칙인지 애매하면 둘 다 적고 판단은 사람에게 넘길 것. 환각을 막는 장치를 프롬프트 안에 직접 박아 둔 형태다.

### 교정 라우팅 표

프롬프트 3이 참조하는 표다. 교정이 드러낸 결함 유형을 저장 위치와 저장 형태로 보낸다.

| 교정이 드러낸 것 | 저장 위치 | 형태 |
|---|---|---|
| 빠졌거나 낡은 사실 | 회사 지식 | 확정일과 출처가 붙은 한 줄 |
| 새로 내린 전략적 선택 | 결정 기록 | 무엇을 대체하는지 명시 |
| 반복되는 선호 | 정책 | 항상 적용되는 규칙 문장 |
| 효과가 검증된 기법 | 스킬 | 언제 쓰는지 + 절차 |
| 반복되는 절차 | 워커 | 입력·단계·출력·중단 조건 |
| 위험한 행동 | 기계적 차단 | 프롬프트가 아니라 권한과 게이트 |

마지막 행이 실무에서 가장 자주 틀리는 자리라고 짚는다. 돈이 나가거나 회사 밖으로 나가는 행동은 문장으로 막으면 안 된다. "함부로 보내지 마세요"는 정책이 아니라 희망이며, 발송·결제·삭제는 권한과 승인 단계로 막고 프롬프트에는 그 게이트가 있다는 사실만 적는다. 가드레일을 프롬프트 층이 아니라 권한 층에 두라는 주문이다.

### 3회 규칙

교정이 중요하다는 말을 들은 팀이 반대 방향으로 실패하는 것을 막는 장치다. 모든 교정을 저장하면 석 달 뒤 정책 파일이 200줄이 되고 절반은 한 사람의 그날 기분이다. 기준은 1회면 고치고 버리고, 2회면 메모만 남기고, 서로 다른 사람에게서 서로 다른 건으로 세 번째 나올 때 정책으로 올린다. "서로 다른 사람"이 핵심인데, 한 사람이 세 번 같은 말을 한 것은 회사 규칙이 아니라 그 사람의 취향이고, 취향을 정책으로 올리면 나머지 팀은 그 규칙을 우회하는 방법을 배우게 된다.

저장할 때 붙이는 메타는 셋이다. 확정일, 소유자, 무엇을 대체했는가. 이 셋이 없는 문장은 시간이 지나면 유령 권위가 된다.

### 어디에 두는가

파일로 시작하는 것이 맞다는 입장이다. 지도 파일 하나와 폴더 여섯 개면 첫 버전으로 충분하다. 코딩 에이전트를 쓴다면 진입점은 이미 표준이 있어서, 2026년 8월 기준 Codex·Cursor·Copilot·Gemini CLI 등 대부분의 CLI가 Linux Foundation 산하 Agentic AI Foundation이 관리하는 `AGENTS.md`를 읽는다. Claude Code는 여전히 `CLAUDE.md`를 먼저 읽으므로 첫 줄에 `@AGENTS.md`를 넣어 둘을 잇는 방식이 흔히 쓰인다.

승격 게이트를 새로 살 필요가 없다는 지적도 있다. 브레인을 레포 안 파일로 두면 승격은 풀 리퀘스트가 되고 검토는 코드 리뷰가 되며 이력은 커밋 로그가 된다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 결과는 없다. 실무 가이드라서 실험도 측정도 제시하지 않는다. 대신 운영 지표 하나를 제안하는데, 관리 지표는 파일 개수가 아니라 충돌 개수여야 한다는 것이다. 파일이 늘어도 충돌이 없으면 건강하고 파일이 적어도 충돌이 잦으면 이미 망가진 상태로 본다.

브레인이 망가지는 방식은 네 가지로 정리한다.

- 아카이브화 — 있는 자료를 다 넣으면 검색은 되는데 판단이 나빠진다. 브레인은 도서관이 아니라 편집된 기준이다.
- 유령 권위 — 확정일과 소유자가 없는 문장이 정책 행세를 한다.
- 랩탑 감금 — 한 사람의 폴더에서 시작한 브레인이 그 폴더에 남는다. 두 번째 사람이 합류하는 순간 사본이 갈라지고 회사 브레인은 다시 개인 브레인 다섯 개가 된다.
- 검토 없는 자동 승격 — 에이전트가 스스로 학습을 저장한다. 처음 몇 주는 마법 같고 그다음에는 아무도 틀린 문장이 언제 들어왔는지 모른다.

착수 절차는 일주일 단위로 제시한다. 팀이 설명하기 지친 업무를 하나 고르고, 팀원 각자에게 프롬프트 1을 돌려 결과를 한 문서에 모으고, 프롬프트 2로 지도 초안을 만들되 유지할 수 없는 칸은 비워 두고, 그 업무를 실제로 한 번 돌리며 교정마다 프롬프트 3으로 원인에 되돌리고, 금요일에 프롬프트 6을 돌린다. 한 달짜리 설계를 하지 말라는 것이 마지막 당부다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 근거가 저자의 현장 경험이다. 4층 구조·3회 규칙·중단 조건 3개 같은 수치에 실측이나 사례 데이터가 붙어 있지 않다.
- 출발점이 된 J.B.의 원글이 X 계정 링크로만 걸려 있어 원 주장과 이 글의 확장분을 가르기 어렵다.
- 글 말미가 자사 방법론(AX Ops)과 HQ 제품으로 이어지는 마케팅 동선이다. 도구가 브레인을 만들어 주지 않는다고 선을 긋긴 하지만, 자료를 읽을 때 프레임과 홍보를 갈라 볼 필요가 있다.
- 프롬프트 6종은 모두 사람이 직접 붙여 넣는 형태다. 이 절차를 스킬이나 훅으로 자동화하는 경로는 다루지 않는다.
- 지도 파일이 커진 뒤의 운영은 열려 있다. 폴더 여섯 개 구조가 수십 명 규모에서 어떻게 버티는지, 진실의 순서를 누가 갱신하는지에 대한 답이 없다.

## 6. 관련 연구 (Related Work)

- 컨텍스트 오염과 내비게이션 우선 원칙은 [[agents/anthropic-2025-effective-context-engineering-for-ai]]가 말하는 attention budget·context rot 논의의 조직 운영판이다.
- `AGENTS.md`·`CLAUDE.md` 진입점 논의는 [[agents/agentskills-io-2026-agent-skills-overview]]와 [[agents/google-labs-code-design-md]]의 portable context 파일 계보와 이어진다.
- 조직 지식을 markdown 파일로 쌓아 에이전트 메모리로 쓰는 노선은 [[overviews/gbrain-ecosystem-overview]]가 다루는 계열과 같은 문제를 푼다. 다만 이 글은 제품이 아니라 운영 규칙에 무게를 둔다.
- 교정을 저장 위치로 보내고 승격 전에 심사하는 구조는 [[agents/microsoft-skillopt]]의 held-out validation gate와 목적이 같다. 한쪽은 옵티마이저가, 다른 쪽은 사람이 게이트를 지킨다.
- 워커 명세의 중단 조건·실패 신호 요구는 [[agents/osmani-2026-agent-skills]]의 non-negotiable verification, [[agents/runkle-2026-the-art-of-loop-engineering]]의 verification loop와 같은 자리를 노린다.
- 프롬프트 5가 막으려는 "에이전트가 자기 교정을 자기가 저장하는" 실패는 [[agents/cemri-2025-why-do-multi-agent-llm-systems]]의 Task Verification 카테고리와 겹친다.

## 7. 용어집 (Glossary)

이 자료 고유의 표현만 정리한다. 도메인 공통 용어는 [[overviews/glossary-agents]]를 따른다.

| 용어 | 뜻 |
|---|---|
| 컴퍼니 브레인 | 개인 채팅에 갇힌 학습을 조직 자산으로 옮겨 담은 층. 기억·판단·역량·학습 네 층으로 구성된다 |
| 지도 파일 | 에이전트가 가장 먼저 읽는 파일. 회사 전체가 아니라 "여기가 어디이고 다음에 어디를 열지"만 담는다 |
| 진실의 순서 | 두 출처가 충돌할 때 어느 시스템의 값을 채택할지 미리 정해 둔 우선순위 |
| 교정 라우팅 표 | 교정이 드러낸 결함 유형을 저장 위치(지식·결정·정책·스킬·워커·기계적 차단)로 보내는 대응표 |
| 워커 | 반복 업무를 다음 사람이 그대로 재실행할 수 있게 적은 명세. 입력·참조·단계·출력·중단 조건·승인·실패 신호를 갖춘다 |
| 3회 규칙 | 서로 다른 사람에게서 서로 다른 건으로 세 번 나온 교정만 정책으로 승격하는 기준 |
| 유령 권위 | 확정일과 소유자가 없는데도 정책처럼 따르게 된 문장 |
| 조용한 분기(fork) | 같은 회사 안에서 에이전트마다 서로 다른 회사 사실을 들고 갈라지는 상태 |

용어집 추가 후보는 없다. 위 표현은 전부 이 자료 고유의 조어라 도메인 용어집에 올릴 성격이 아니다.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 히어로 이미지 — 구슬이 한 점으로 모였다 퍼지는 추상 조형 | fetched | 제외 (장식용, 정보 없음) |
| fig02 | 전체 페이지 스크린샷 | screenshot | 제외 (아카이브용) |
| fig03~fig04 | 히어로 이미지 크롭 (서로 중복) | crop | 제외 |
| fig05~fig07 | 관련 글 카드 썸네일 | crop | 제외 |

이 글에는 설명용 도식이 없다. 이미지는 히어로 조형과 관련 글 썸네일뿐이고, 정보를 담은 요소는 전부 HTML 표(4층 표·교정 라우팅 표)로 되어 있어 본문 표로 옮기는 편이 낫다. 따라서 wiki 임베드 대상은 없고 후보 전부 `curated: false`로 남긴다.
