---
title: "The Instagram agent skill (Jakeschincariol/instagram-agent-skill)"
type: repo
year: 2026
category: agents
source: jakeschincariol-instagram-agent-skill.md
raw_path: raw/repos/jakeschincariol-instagram-agent-skill.md
raw_filename: "jakeschincariol-instagram-agent-skill.md"
source_collection: external
org: "Jakeschincariol"
repo: "instagram-agent-skill"
url: "https://github.com/Jakeschincariol/instagram-agent-skill"
license: "MIT"
tags: [agent-skills, claude-code, skill-md, instagram, content-marketing, humanizer, social-media]
---

## 요약

`instagram-agent-skill`은 Instagram 계정 운영에 필요한 글쓰기 작업을 Claude 스킬 13개로 나눈 MIT 라이선스 저장소다. 스킬은 특정 작업 절차를 담아 에이전트에 결합하는 지침 패키지를 뜻한다. 이 저장소의 스킬은 Reel 대본, 캡션, carousel, Stories, 남의 게시물 댓글, 내 게시물 답글, DM, 주간 계획, 바이럴 조사, 프로필 채점, 성과 감사, 긴 자료 재활용, AI 문체 제거를 하나씩 맡는다.

이 저장소의 특징은 두 가지다. 첫째, hook 점수, 대본 길이, 캡션 잘림, AI 문체 흔적, 바이럴 순위를 LLM의 감으로 판단하지 않고 의존성 없는 로컬 Python 도구 5종으로 실제로 잰다. 둘째, 어떤 스킬도 Instagram에 게시하지 않는다. 모든 스킬은 복사 가능한 블록을 내놓고 사용자의 "yes"를 기다린다. README는 이를 "These skills write. You post."라는 한 문장으로 요약한다.

저장소는 Jake Schincariol이 2026-09-13에 공개했고, 2026-11-15 수집 시점 star는 6,549개다. 회원가입, API key, 외부 서비스 연결이 필요 없으며 같은 구조를 LinkedIn에 적용한 형제 저장소 linkedin-agent-skill이 있다. 이 페이지는 README, 사용자 프로필 템플릿 `voice.md`, plugin 매니페스트, 스킬 정의 13개를 근거로 하며, 아래에서 용도, 특징, 사용법 순으로 정리한다.

## 배경

### 범용 글쓰기 모델이 Instagram에서 실패하는 지점

저장소는 범용 LLM 초안이 Instagram에서 통하지 않는 이유를 플랫폼 제약에서 찾는다. 캡션은 피드에서 약 125자만 보이고, Reel 대본은 사용자가 카메라 앞에서 소리 내어 말해야 하며, 화면 텍스트는 UI가 덮는 영역을 피해야 한다. 따라서 문장이 길거나 글말처럼 들리면 촬영 단계에서 바로 드러난다.

또 다른 문제는 AI 문체다. 캡션은 짧아서 상투어 한 줄이 전체에서 차지하는 비중이 에세이보다 크다. `/ig-human` 스킬 문서는 이 위험을 "탐지기가 게시물을 걸러내는 것"이 아니라 "사람이 브랜드처럼 읽히는 글을 넘겨 버리는 것"으로 설명한다.

### 자동화가 금지된 플랫폼

Instagram은 이용약관으로 브라우저 자동화나 서드파티 도구를 통한 자동 게시, 자동 댓글, 자동 팔로우, 자동 DM을 금지하고 위반 계정의 활동을 차단한다. 공식 Content Publishing API는 Professional 계정용으로 존재하지만 Meta 개발자 앱, 연결된 Page, 장기 토큰, 앱 심사가 필요해 스킬이 대신 마련해 줄 수 없다. 저자는 이 제약을 사후에 붙인 한계가 아니라 설계의 출발점으로 삼았다. 그래서 승인 게이트는 설정 옵션이 아니라 기능 부재로 구현되어 있다.

## 핵심 개념

hook은 Reel의 첫 1~3초에 나오는 첫 문장으로, 시청자가 영상을 계속 볼지를 결정하는 구간이다. 이 저장소는 hook을 말하는 문장과 화면에 띄우는 문장으로 나눠 따로 쓰고, `hooks.json`에 정리된 26개 공식 중 하나에 대응시킨다. 이 페이지에서 hook은 Claude Code의 훅(이벤트 시점 실행 코드)과 무관한 Instagram 용어다.

outlier multiple은 게시물 조회수를 그 계정 최근 게시물 조회수의 중앙값으로 나눈 값이다. 팔로워 200만 계정의 40만 조회는 평범한 하루이고 팔로워 4,000 계정의 40만 조회는 복제할 만한 무언가를 찾은 결과라는 관점을 수치로 옮긴 것이다. `/ig-viral`과 `/ig-audit`이 모두 조회수 대신 이 값으로 순위를 매긴다.

humanizer는 AI가 쓴 초안에서 기계 문체의 흔적을 지우고 남은 텍스트가 얼마나 사람이 쓴 것처럼 보이는지 채점하는 후처리 도구다. 보이지 않는 Unicode 문자, em dash 같은 타이포그래피, 상투어 사전 적중을 자동으로 고치고, 문장 구조 징후는 표시만 해서 사람이 고치게 한다.

swipe file은 니치에서 잘 되는 hook과 그 출처를 모은 참고 파일이다. `/ig-viral`이 `~/.claude/instagram/swipe.md`로 작성하고 `/ig-reel`과 `/ig-plan`이 읽는다. 사용자의 실제 시장 증거가 스킬에 내장된 기본값보다 우선하게 만드는 장치다.

`voice.md`는 사용자의 말투, 대상 청중, 입장, 사용 가능한 실제 수치를 담은 프로필 파일이다. 모든 스킬이 작업 전에 이 파일을 읽는다.

## 용도

### 누구를 위한 도구인가

이 저장소는 Instagram으로 고객을 모으는 1인 사업자와 소규모 크리에이터를 염두에 둔다. 스킬 문서의 예시가 모두 프리랜서와 에이전시 업무(제안서 작성 시간 단축, 계약서 지급 조항, 디스커버리 콜 폐지)에서 나오고, `voice.md`가 "What I sell"과 키워드 CTA를 필수 항목으로 묻는 것도 같은 맥락이다. 즉 목표는 단순한 팔로워 증가가 아니라 콘텐츠 → 댓글 → DM → 판매로 이어지는 흐름이다.

### 상황별 사용 스킬

| 이런 상황에서 | 쓰는 스킬 | 얻는 것 |
|---|---|---|
| 촬영할 아이디어는 있는데 첫 문장이 없다 | `/ig-reel` | 점수가 붙은 hook 3개, 대본, 화면 텍스트, 시간표 |
| 무엇을 만들어야 할지 근거가 없다 | `/ig-viral` | 니치의 outlier Reel 순위, 공식 분류, swipe file |
| Reel이나 사진은 준비됐고 설명 글이 필요하다 | `/ig-caption` | 피드 125자 미리보기와 lint 결과가 붙은 캡션 |
| 단계형이나 목록형 아이디어가 있다 | `/ig-carousel` | 표지, 슬라이드 문구, 1080x1350 이미지 |
| 오늘 Stories에 올릴 게 없다, 게시물 없이 판매하고 싶다 | `/ig-story` | 프레임 시퀀스, 스티커 배치, DM 유입 흐름 |
| 프로필 방문자가 팔로우하지 않는다 | `/ig-profile` | 100점 채점표와 감점 순 재작성안 |
| 이번 주 무엇을 언제 올릴지 정해야 한다 | `/ig-plan` | 요일별 계획과 교류 대상 10개 |
| 초안이 ChatGPT 같다 | `/ig-human` | 정제된 텍스트와 5개 검사 점수 |
| 다른 계정 게시물에 댓글을 달고 싶다 | `/ig-comment` | 서로 다른 유형의 댓글 2개와 추천 |
| 내 게시물 댓글이 많이 쌓였다 | `/ig-reply` | 분류별 답글, Reel로 답할 질문 표시 |
| 특정인에게 DM을 보내야 한다 | `/ig-dm` | 메시지, 글자 수, 후속 2회와 발송일 |
| 유튜브 영상, 팟캐스트, 뉴스레터가 있다 | `/ig-repurpose` | 추출 목록과 일주일치 게시물 배치 |
| 무엇이 통했고 무엇을 그만둬야 할지 모르겠다 | `/ig-audit` | outlier 순위, 패턴, STOP과 DO MORE |

### 업무 단계별 분류

13개 스킬은 계정 운영의 다섯 단계로 묶을 수 있다.

| 단계 | 스킬 | 실행 주기 (스킬 문서 기준) |
|---|---|---|
| 조사 | `/ig-viral`, `/ig-audit` | `/ig-viral`은 월 1회 (공식은 한 계절 간다) |
| 기획 | `/ig-plan`, `/ig-repurpose` | `/ig-plan`은 주 1회, 같은 요일 |
| 제작 | `/ig-reel`, `/ig-caption`, `/ig-carousel`, `/ig-story` | 게시물마다, Stories는 매일 |
| 소통 | `/ig-comment`, `/ig-reply`, `/ig-dm` | 매일 20분 교류, 게시 후 첫 1시간 답글 |
| 점검과 후처리 | `/ig-profile`, `/ig-human` | `/ig-human`은 모든 출력 직전 |

## 특징

### 측정 도구를 실제로 실행한다

SKILL.md마다 "Use them. Do not eyeball the hook and do not guess at the length."처럼 도구 실행을 의무로 적는다. 도구 5종은 의존성과 네트워크 없이 사용자 컴퓨터에서 실행되고 아무것도 업로드하지 않는다.

| 도구 | 위치 | 하는 일 |
|---|---|---|
| `hookscore.py` | `ig-reel/` | hook 후보를 5개 속성(SPECIFICITY, STAKES, ADDRESS, FRONTLOAD 등)으로 채점해 순위를 매기고 치명적 결함(dealbreaker)을 표시 |
| `beats.py` | `ig-reel/` | 대본 줄마다 말하는 시간을 추정해 timecode로 쌓고, 3초 넘는 hook, 4초 넘는 beat, 구체성 없는 연속 beat, loop 부재를 경고 |
| `caption.py` | `ig-caption/` | 피드에 보이는 125자를 상자로 그리고 길이, 첫 줄 잘림, 구체성, 해시태그, 요청 개수, 검색어를 검사 |
| `humanize.py`와 `detect.py` | `ig-human/` | 세 단계 정제(보이지 않는 문자, 타이포그래피, 상투어)와 5개 검사 채점 |
| `swipe.py` | `ig-viral/` | outlier multiple 계산, hook 공식 분류, 상위와 하위 1/3 비교 |

데이터 파일도 함께 들어 있다. `hooks.json`은 26개 hook 공식마다 템플릿, 채운 예문, 화면용 문장, 용도, 망치는 방식, match regex를 담는다. `slop.json`은 상투어 154개와 대체어, 보이지 않는 문자 18종, 타이포그래피 치환 11종, 구조적 징후 16종을 담고, `rubric.json`은 프로필 12항목 100점 기준을 담는다. 세 파일 모두 사용자가 편집하도록 만든 것이다.

### 모든 출력이 humanizer를 거친다

`/ig-reel`의 5단계, `/ig-caption`의 3단계, `/ig-comment`, `/ig-reply`, `/ig-dm`, `/ig-profile`, `/ig-carousel`의 출력 규칙이 모두 `/ig-human` 실행을 요구한다. README는 humanizer를 "나머지 스킬을 쓸 만하게 만드는 이유"라고 소개한다.

humanizer가 자동으로 고치는 대상과 표시만 하는 대상은 다음과 같이 나뉜다.

| 구분 | 대상 | 이유 |
|---|---|---|
| 자동 수정 | zero-width space와 joiner, soft hyphen, BOM, Unicode tag 문자, 비분리 공백 등 보이지 않는 문자 | 키보드로는 만들어지지 않고 복사 붙여넣기에도 남는 기계적 흔적 |
| 자동 수정 | em dash를 쉼표로, en dash를 하이픈으로, 둥근 따옴표를 곧은 따옴표로, 말줄임표를 점 세 개로 | 타이포그래피가 지나치게 완벽한 글의 특징 |
| 자동 수정 | delve, leverage, robust, seamless와 "stop scrolling", "follow for more", "the algorithm loves" 같은 Instagram 상투어 | 대체어로 바꾸거나 삭제하며 대소문자와 URL은 보존 |
| 표시만 | "It's not just X, it's Y", 3항 나열, "The result?" 같은 한 단어 질문, 영상 도입부, 이모지 불릿, 해시태그 벽, 반사적 팔로우 유도 | 문장 구조를 바꾸려면 판단이 필요하고 regex로 고치면 문장이 망가진다 |

채점은 BURSTINESS(문장 길이 변화), SPECIFICITY(구체 표지), SLOP DENSITY(상투어 밀도), FINGERPRINT(보이지 않는 문자와 em dash), VOICE(축약형, 인칭, 구조 징후) 5개 검사로 이뤄진다. 종합 점수는 평균에 60%, 가장 낮은 검사에 40% 가중치를 주는데, 신호 하나만으로도 기계 문체가 드러나기 때문이다. PASS는 종합 70 이상이면서 모든 검사가 55 이상이어야 한다.

### 사용자 증거가 기본값보다 우선한다

스킬들은 `~/.claude/instagram/` 아래 파일을 통해 서로 연결된다. 이 구조 덕분에 한 번 조사하거나 감사한 결과가 다음 제작에 자동으로 반영된다.

| 파일 | 쓰는 스킬 | 읽는 스킬 | 역할 |
|---|---|---|---|
| `voice.md` | 사용자 또는 Claude | 전 스킬 | 말투, 청중, 입장, 실제 수치 |
| `swipe.md` | `/ig-viral` | `/ig-reel`, `/ig-plan` | 니치에서 통하는 공식 |
| `log.md` | `/ig-reel`, `/ig-comment` | `/ig-audit`, `/ig-plan` | 게시 이력과 사용한 공식, 이번 주 댓글 대상 |
| `plan.md` | `/ig-plan` | 다른 스킬 | 주간 계획 |

`/ig-audit` 문서는 이 원칙을 "모든 Instagram 가이드의 규칙은 이 팩의 것을 포함해 사전 가정일 뿐이고, 사용자의 최근 30개 게시물이 증거다"라고 적는다. 감사 결론은 `/ig-plan`과 `/ig-viral`로 넘어가 다음 주 계획과 swipe file 필터에 쓰인다.

### 승인 게이트와 약관 준수

모든 스킬의 마지막 규칙은 "Nothing is posted"다. 스킬별로 금지 사항을 명시한다.

- `/ig-viral`: 사용자를 대신해 로그인하거나 비밀번호를 묻지 않는다. 계정 10개, 계정당 Reel 12개 정도를 사람 속도로 읽을 뿐 crawler나 스크래핑 서비스, 백그라운드 반복을 쓰지 않는다. 영상이 아니라 공식을 베끼고 모든 행에 출처 계정을 기록한다.
- `/ig-comment`: 자동 게시와 자동 댓글을 하지 않고, 피드를 브라우저 도구로 수집하지 않는다.
- `/ig-dm`: 상호작용하지 않은 사람에게 예약 발송하는 도구를 쓰지 않는다. 예외는 Instagram 공식 도구나 승인된 파트너를 통한 키워드 자동 답장이며, 이는 상대가 먼저 댓글을 단 뒤에만 작동한다.

날조 금지도 공통 규칙이다. 사용자가 주지 않은 수치, 고객, 성과는 자리표시로라도 만들지 않고 `{{your number}}`를 남긴 채 표시한다.

### 정직한 한계 공개

README의 마지막 두 절은 저자가 직접 측정한 결과와 주의 사항을 숨기지 않고 적는다. hook 점수기가 승자를 고르지 못한다는 결과, 검출 점수가 상용 탐지기가 아니라는 점, 해시태그 상한을 처음에 틀렸다는 점까지 포함한다. 이 내용은 아래 결과와 한계 절에서 다룬다.

## 사용법

### 설치

설치 방법은 네 가지다.

| 방식 | 명령 또는 절차 | 적용 범위 |
|---|---|---|
| Claude에 맡기기 | 저장소 URL과 "Install this skill, then confirm /ig-reel works."를 Claude에 붙여 넣는다 | Claude가 판단 |
| 수동 복사 | `git clone https://github.com/Jakeschincariol/instagram-agent-skill.git` 후 `cp -r instagram-agent-skill/skills/ig-* ~/.claude/skills/` | 전역 |
| plugin | `/plugin marketplace add Jakeschincariol/instagram-agent-skill` 후 `/plugin install instagram-agent` | 전역 |
| 프로젝트 로컬 | 같은 폴더를 저장소의 `.claude/skills/`에 복사 | 해당 프로젝트 |

Claude Code가 없다면 `SKILL.md` 하나를 채팅 맨 위에 붙여 넣어 모드처럼 쓸 수 있다. 다만 이 방식에서는 Python 도구 5종을 쓸 수 없고, 저자는 그 도구가 `/ig-reel`과 `/ig-human`의 핵심이라고 적는다.

### 첫 설정: voice.md

설치 직후 할 일은 `templates/voice.md`를 `~/.claude/instagram/voice.md`로 복사해 채우는 것이다. 저자는 10분을 들이라고 권하며, 손으로 채우는 대신 본인 Reel이나 캡션 3개를 Claude에 주고 "write my voice.md from these"라고 요청하는 편이 더 낫다고 적는다. 파일이 없으면 `/ig-reel`이 먼저 본인 Reel 3개를 요구해 파일을 만든다.

| 절 | 채울 내용 |
|---|---|
| Who I am | 이름, 핸들, 하는 일 한 문장, 대상 청중(구체적으로, 예: "$2,000 미만을 받는 사진가"), 판매 상품 |
| What I sound like | 가장 나다운 Reel이나 캡션 3개, 카메라 앞 성격, 쓰는 말과 절대 안 쓰는 말, 욕설과 이모지 정책, 얼굴 노출, 말하기 속도(wpm, `beats.py --wpm`이 사용, 보통 150~200) |
| My positions | 청중 일부가 동의하지 않을 입장 3~5개. 좋은 Reel의 원천 |
| Off limits | 다루지 않는 주제, 공개할 수 없는 고객과 수치, 규제나 NDA로 못 하는 주장 |
| Proof I can use | 이름을 걸 수 있는 실제 수치, 성과, 이야기. 비어 있으면 모든 초안에 `{{your number}}`가 들어간다 |
| The ask | 키워드 CTA(공백 없는 한 단어), 키워드로 보낼 것, 링크 목적지 |

### 기본 워크플로

스킬 문서들이 서로를 호출하도록 적혀 있어 실제 사용은 아래 순서로 이어진다.

1. **조사** (월 1회): `/ig-viral`로 경쟁 계정 6~12개를 열람하고 swipe file을 만든다. 게시 이력이 있으면 `/ig-audit`도 실행한다.
2. **계획** (주 1회): `/ig-plan`이 `voice.md`, `swipe.md`, `log.md`를 읽고 요일별 계획을 낸다. 긴 원자료가 있으면 `/ig-repurpose`로 일주일치를 뽑는다.
3. **제작**: 계획의 각 슬롯에 대해 "write Tuesday"라고 말하면 `/ig-reel` 또는 `/ig-carousel`이 초안을 쓰고, 이어서 `/ig-caption`이 캡션을 쓴다. 각 산출물은 `/ig-human`을 거친다.
4. **게시**: 사용자가 복사해 직접 올린다. "yes"를 하면 `log.md`에 기록된다.
5. **소통**: 게시 전 20분 동안 `/ig-comment`로 교류 대상 10개에 댓글을 달고, 게시 후 첫 1시간에 `/ig-reply`로 답글을 단다. 키워드 댓글과 story 응답에는 `/ig-dm`으로 답한다.
6. **점검**: 몇 주 뒤 `/ig-audit`으로 결과를 보고, 조회는 있는데 팔로우가 없으면 `/ig-profile`로 넘어간다.

### Reel 제작 예시

`/ig-reel we cut proposal time from 5 hours to 20 minutes with one template`처럼 아이디어 한 줄로 호출한다. 아이디어가 얇으면 스킬은 내용을 부풀리지 않고 "무슨 일이 누구에게 일어났고 무엇을 잃거나 얻었는가"를 한 번에 묻는다.

스킬은 공식 3개로 hook 후보를 쓰고 `hookscore.py`로 채점한다. 예시 출력에서 #5 Time Collapse("Proposals used to take me five hours. Twenty minutes now.")는 86점 STRONG, #1 Cost Confession은 71점, #9 The Steal은 54점 OK를 받았고, 스킬은 비율이 믿을 만하고 화면에서 한눈에 읽히며 숫자가 사용자 본인 것이라는 이유로 #5를 고른다. 최고점이 50 미만이면 편집으로는 해결되지 않으므로 hook을 다시 찾는다.

대본은 아래 구조로 쓴다. 권장 길이는 15~45초이고, 7초 미만은 반복 재생 수만 부풀린다.

| 구간 | 이름 | 내용 |
|---|---|---|
| 0:00~0:02 | HOOK | 주장. 첫 프레임에 움직임 |
| 0:02~0:07 | THE STAKE | 시청자에게 왜 중요한지 한 줄 |
| 0:07~ | THE BODY | beat당 아이디어 하나, beat마다 화면 전환 |
| 마지막 3초 | THE PAYOFF | hook이 약속한 것을 전달하고 요청 하나 |
| 마지막 줄 | THE LOOP | hook의 단어 하나를 반복 |

`beats.py script.txt --target 30`의 예시 출력은 73단어를 165wpm 기준 약 26.6초로 추정하고, 두 번째 beat가 14.6초로 4초를 넘는다고 경고한다. 마지막 beat가 hook의 "$18,000"을 반복하므로 loop는 확인되고, 목표보다 3.5초 짧다는 점도 알려 준다. 저자는 이 경우 대개 짧게 찍는 편이 옳다고 적는다.

화면 텍스트는 대본과 별도로 쓴다. 카드당 6단어 이하로 쓰고, hook 카드는 1프레임부터 띄우며, 1080x1920 프레임에서 y=230 위, y=1440 아래, 오른쪽 230픽셀을 비운다. 그 영역은 캡션, 액션 레일, 오디오 띠가 덮는다. 마지막에 hook 공식과 점수, 길이, 화면 카드 수, humanizer 결과를 담은 `REEL READY` 영수증이 출력된다.

### 캡션 작성 예시

`/ig-caption`은 먼저 캡션의 역할을 정한다. Reel이 이미 강한 hook을 가졌으면 Job A로 쓰고, 사진이나 carousel처럼 캡션이 곧 콘텐츠이면 Job B로 쓴다.

| 역할 | 첫 줄 | 본문 |
|---|---|---|
| Job A | 요청을 담백하게. 영상과 경쟁하지 않는다 | 요청을 납득시키는 맥락과 검색어 |
| Job B | hook. 짧고 구체적이며 문장 중간이 아니라 궁금증이 남는 지점에서 끊는다 | 2~6개 짧은 문단 |

이후 `python3 caption.py caption.txt --keywords "client contracts,freelance pricing"`으로 lint한다. 예시 출력은 첫 줄이 133자라 125자에서 문장 중간에 잘린다고 WARN을, 검색어 두 개 중 "client contracts"가 빠졌다고 WARN을 낸다. FAIL은 모두 고치고 WARN은 고칠지 말지를 사용자에게 소리 내어 설명하게 되어 있다.

캡션 규칙의 근거는 플랫폼 변화다. Instagram은 2025-12-18 해시태그를 게시물당 30개에서 5개로 제한했고, Adam Mosseri는 그보다 앞선 2025-02에 해시태그가 도달 수단이 아니라 라벨이라고 말했다. 따라서 linter는 해시태그 6개 이상을 실패로 처리하고, `#viral`, `#fyp` 같은 의미 없는 태그를 지우게 한다. 대신 Instagram 검색이 캡션 본문을 읽으므로 찾히고 싶은 구절을 사람이 입력할 법한 형태로 본문 문장 안에 넣는다. 캡션 안 URL은 클릭되지 않으므로 금지하고, 키워드 요청은 `Comment CONTRACT`처럼 공백과 이모지 없는 한 단어로 쓴다.

### humanizer 단독 사용

`/ig-human`은 Instagram 밖의 글에도 쓸 수 있는 단독 도구다. 실행 순서는 다음과 같다.

```bash
python3 humanize.py draft.txt -o clean.txt --report   # 정제하고 바뀐 곳을 모두 보여 준다
python3 detect.py draft.txt clean.txt                 # 전후 점수 비교
```

1. `humanize.py`로 자동 정제한다.
2. 리포트에 표시된 구조 징후 줄을 사람이(또는 Claude가) 의미를 유지하며 다시 쓴다.
3. `detect.py`로 전후를 비교한다.
4. PASS가 아니면 출력이 지목한 가장 낮은 검사를 고치고 반복한다. 2회는 정상이고, 5회가 필요하면 초안을 새로 쓰는 편이 낫다.
5. 점수만이 아니라 정제된 텍스트와 점수를 함께 보여 준다.

저장소의 예시에서 최대한 나쁘게 쓴 캡션은 BURSTINESS 78.4, SPECIFICITY 53.6, SLOP DENSITY 0.0(100단어당 상투어 23개), FINGERPRINT 68.7, VOICE 70.0으로 종합 32.5점 FLAGGED였다. 구조 징후를 고치지 않고 `humanize.py`만 적용해도 79.7점 PASS로 47.2점 올랐다.

### 바이럴 조사 예시

`/ig-viral`은 먼저 대상 계정을 고른다. 같은 니치에서 조금 앞선 직접 경쟁 계정 4개, 니치는 다르지만 청중이 같은 인접 계정 4개, 형식만 참고할 대형 계정 2~4개로 구성하고, 사용자의 Saved 컬렉션도 함께 본다. 계정 규모는 사용자의 약 10배 이내로 제한한다. 200만 팔로워에서 통하는 공식은 200만 팔로워이기 때문에 통하는 경우가 많기 때문이다.

열람은 세션이 가진 브라우저 도구로 사용자가 지켜보는 가운데 진행한다. Reel마다 계정, 팔로워, 최근 12개 Reel의 중앙 조회수, 이 Reel의 조회수, hook 원문(문법 오류 포함), 화면 텍스트, 길이, CTA를 기록한다. 가장 중요한 값은 중앙값이며, 중앙값이 없으면 순위가 다시 팔로워 수에 좌우된다. 수집한 값을 TSV로 만들어 실행한다.

```bash
python3 swipe.py captured.tsv --out ~/.claude/instagram/swipe.md
```

결과 보고는 세 가지로 제한한다. 상위 1/3에서 과대 대표된 공식과 개수, 상위와 하위의 구조적 차이(hook 길이, 시각적 payoff, 첫 프레임 움직임, 요청 위치), 분류되지 않은 hook 목록이다. 분류되지 않은 행은 잡음이거나 아직 `hooks.json`에 없는 새 공식이므로 사람이 직접 읽는다. 표본 크기와 신뢰도도 함께 적는다. 6개 계정의 Reel 40개는 주장을 뒷받침하지만 12개는 그렇지 않다. 마지막으로 상위 공식 3개를 사용자 본인의 이야기와 숫자로 다시 써서 `/ig-reel`에 넘긴다.

Instagram에서 데이터가 부족하면 조회수와 자막이 로그인 없이 공개된 YouTube Shorts를 보조 코퍼스로 쓴다. `yt-dlp`로 채널 Shorts 조회수와 자동 자막을 받고, 3.0초 이전에 나온 단어를 hook으로 잡는다.

### 소통 스킬 사용 요령

`/ig-comment`는 게시물 텍스트나 스크린숏을 붙여 넣으면 9가지 유형 중 서로 다른 유형의 댓글 2개를 제시하고 어느 쪽을 올릴지 추천한다.

| # | 유형 | 쓰는 경우 |
|---|---|---|
| 1 | Add a datum | 게시물 주장을 숫자로 뒷받침할 수 있을 때 |
| 2 | Add the missing case | 맞지만 빠진 조건이 있을 때 |
| 3 | Respectful disagree | 진심으로 틀렸다고 볼 때. 동의점부터 말한다 |
| 4 | Extend one line | 한 줄이 특히 좋을 때 |
| 5 | Ask the real question | 어려운 부분을 건너뛰었을 때 |
| 6 | The receipt | 같은 일을 해 본 경험이 있을 때 |
| 7 | The correction | 사실 오류가 있을 때 |
| 8 | The reframe | 사실은 맞고 관점이 다를 때 |
| 9 | The one-liner | 존재감만 남기고 싶을 때. 10단어 미만 |

댓글은 1~3문장이며 "Great post", "Love this"로 시작하거나 영상을 다시 요약하거나 자기 상품을 홍보하지 않는다. 일일 교류 라운드에서는 게시물 5~10개를 한 번에 붙여 넣는 배치 모드를 쓴다.

`/ig-reply`는 댓글을 KEYWORD, LEAD, SUBSTANCE, QUESTION, SUPPORT, NOISE 여섯 분류로 나누고 개수를 먼저 보고한 뒤 그 순서로 답한다. 많은 사람이 가질 법한 질문은 답글 대신 Reel로 답하도록 표시하는데, Instagram이 원 댓글을 새 영상에 스티커로 붙이고 질문자에게 알림을 보내기 때문이다. 비판자에게는 맞는 부분을 먼저 인정하고, 악성 댓글에는 답하지 않는다.

`/ig-dm`은 대상, 계기, 원하는 결과를 한 번에 묻고 계기가 없으면 메시지도 없다고 답한다. 키워드 전달 DM은 "{이름}, here it is: {자료}. {사용법 한 줄} {네 단어로 답할 질문}" 형식으로 자료를 조건 없이 첫 메시지에 보낸다. 후속 메시지는 +4일(새 정보 추가)과 +10일(마무리 선언) 두 번만 보낸다.

### 기획과 점검 스킬 사용 요령

`/ig-plan`은 주 4~5회 게시를 권하며 그중 3회 이상을 Reel로 채운다. Reel이 비팔로워에게 안정적으로 도달하는 유일한 형식이기 때문이다.

| 유형 | 빈도 | 역할 |
|---|---|---|
| Proof | 주 1회 | 숫자가 있는 실제 사건. Reel |
| Teach | 주 1~2회 | 오늘 바로 해 볼 수 있는 것 하나. Reel 또는 carousel |
| Opinion | 주 1회 | 팔로워를 잃을 수도 있는 입장. Reel |
| Story | 격주 1회 | 대가가 있는 장면. Reel |
| Offer | 격주 1회 | 파는 것을 사과 없이 말한다. carousel 또는 Stories |

각 슬롯에는 주제가 아니라 이번 주 실제 사건에서 나온 각도를 적는다. 스킬 문서의 표현으로 "AI"는 계획이 아니고 "초안에 em dash가 있어서 놓친 제안서"는 Reel이다. 게시 시각은 소비자 청중이면 이른 저녁, 비즈니스 청중이면 이른 아침이지만, 문서는 시각보다 첫 2초가 훨씬 중요하다고 강조한다.

`/ig-profile`은 이름 필드, 핸들, bio, 링크, 하이라이트 이름, 고정 게시물, 첫 9개 그리드 표지를 붙여 넣거나 스크린숏으로 주면 12항목 100점으로 채점한다. 첫 채점은 대개 30~40점대이며, 이후 감점이 큰 순서로 이름 필드(검색 대상인 30자, `{Name} | {검색되는 말}` 형식), bio 첫 줄, 고정 게시물 3개, 하이라이트, 링크, 그리드 표지를 고친다.

`/ig-audit`은 insights 스크린숏이나 게시물별 조회수를 받아 outlier multiple과 sends per reach로 순위를 낸다. 3초 잔존율(hold at 3s)이 상위와 하위에서 다르면 원인은 hook뿐이라고 판정하고, 요일과 시간은 다른 요인이 아무것도 설명하지 못할 때만 마지막에 본다. 비팔로워 도달은 높은데 도달당 팔로우가 낮으면 hook이 아니라 프로필 문제로 보고 `/ig-profile`로 넘긴다.

## 결과

### hook 점수기 검증

저자는 hook 점수기를 "느낌상 맞다"는 주장으로 공개하지 않기 위해 직접 검증했다. 코퍼스는 5개 채널에서 성과 상위 8개와 하위 8개 Shorts를 골라 자동 자막의 첫 3초를 뽑은 실제 hook 74개이며, 조회수 범위는 931~550,000회다. Instagram은 남의 계정에 로그인하지 않고는 조회수를 수집할 수 없고 스크래핑은 저장소가 금지하는 약관 위반이므로 YouTube Shorts를 썼다. 저자는 hook 문법이 같다고 보지만 이를 실제 한계로 명시한다.

| 검증 항목 | 결과 | 해석 |
|---|---|---|
| 나쁜 hook 검출 | 의도적으로 나쁘게 쓴 hook 10개 대비 AUC 0.83. 10개 중 9개가 실제 코퍼스 중앙값보다 낮다 | 인사, 도입부, 구체성 없는 hook은 잘 걸러낸다 |
| 같은 제작자의 히트와 실패 구분 | AUC 0.56 (0.50이 무작위) | 승자는 고르지 못한다 |
| 개별 검사 기여 | SPECIFICITY만 두 집단 중앙값이 60점 차이. STAKES와 ADDRESS는 중앙값이 같다 | 이 코퍼스에서 두 검사는 의미 있는 차이를 측정하지 못했다 |
| hook 공식 분류율 | 저자 템플릿 기반 regex는 8%, 실제 발화 기반으로 다시 쓴 regex는 49% | 나머지 51%는 분류를 보류하며, 공식이 없는 팟캐스트 클립이 많아 타당한 동작이다 |

AUC는 무작위로 고른 좋은 사례가 나쁜 사례보다 높은 점수를 받을 확률로 읽을 수 있다. 따라서 0.83은 명백히 나쁜 hook을 걸러내는 데 쓸 만하다는 뜻이고, 0.56은 괜찮은 hook 두 개 중 어느 쪽이 퍼질지는 거의 예측하지 못한다는 뜻이다. 저자는 어느 쪽이 퍼질지는 얼굴, 편집, 오디오, Instagram이 누구에게 보여 주는지가 결정하므로 텍스트를 읽는 도구로는 알 수 없다고 설명한다.

검증은 버그도 찾아냈다. 공식 분류기의 regex가 저자 템플릿에 맞춰 쓰여 실제 hook을 거의 잡지 못했고, 반복해서 나타나던 Contrarian Flip, The Statistic, The Reveal, Someone Else's Result, The Superlative 5개 공식이 새로 추가됐다. 또 SPECIFICITY가 숫자 문자만 세어 "zero dollars"나 "three marketing books"를 구체성 없음으로 판정하던 문제를 고쳤다. 말로 하는 hook은 숫자를 글자로 말하기 때문이다.

결론적으로 저자가 권하는 사용법은 촬영 전에 명백히 약한 hook을 버리는 용도로 점수기를 쓰고, 그다음은 본인의 retention 그래프를 믿는 것이다. 측정 스크립트는 `yt-dlp`에 의존해 저장소에 포함하지 않았고 방법은 `/ig-viral`에 적었다. 더 크거나 깨끗한 코퍼스로 다른 결과가 나오면 알려 달라고 요청한다.

### 도구별 예시 출력 요약

| 도구 | README 예시 |
|---|---|
| `hookscore.py` | "Nobody tells you that your first 30 reels are supposed to f..." 85.6 STRONG, "I lost $18,000 because of one missing contract." 81.4 STRONG, "Stop scrolling if you want to grow..." 54.4 OK(dealbreaker: "stop scrolling"으로 시작), "Hey guys, today I wanted to talk..." 9.6 WEAK(dealbreaker: 인사) |
| `beats.py` | 73단어, 약 26.6초, 14.6초 beat 경고, loop 확인, 목표 대비 3.5초 부족 |
| `caption.py` | 389/2,200자 PASS, 첫 줄 133자 WARN, 구체성 PASS, 해시태그 3개 PASS, 요청 하나 PASS, 검색어 1/2 WARN |
| `detect.py` | 32.5 FLAGGED에서 79.7 PASS로 47.2점 상승 |
| `swipe.py` | 60.0배(18만 조회), 37.5배(41.2만 조회), 1.3배(120만 조회) 순. 조회수가 가장 큰 Reel이 가장 아래에 온다 |

`swipe.py` 예시는 이 저장소의 관점을 가장 직접적으로 보여 준다. 120만 조회 Reel은 그 계정 평소의 1.3배에 불과해 아무것도 가르쳐 주지 않고, 공식도 분류되지 않는다("in this video I am going to show you..."). 반면 18만 조회 Reel은 계정 평소의 60배이며 The Steal 공식으로 분류된다.

## 한계

저장소 README의 "fine print" 절과 스킬 문서가 적은 한계는 다음과 같다.

- **게시 기능 없음**: 공식 Content Publishing API는 개발자 앱, 연결된 Page, 장기 토큰, 앱 심사가 필요해 스킬로 제공할 수 없다. 그 밖의 자동화는 약관 위반이다. 모든 게시, 댓글, DM은 사용자가 직접 한다.
- **검출 점수는 로컬 휴리스틱**: 5개 검사는 공개 탐지기가 쓰는 신호를 본뜬 것일 뿐 GPTZero, Originality, Copyleaks, Winston, Turnitin을 호출하지 않으며 그 판정을 약속하지 않는다. 저자는 "탐지 불가"를 판다는 사람은 다른 것을 파는 것이라고 적는다.
- **보이지 않는 문자 제거의 범위**: 생성 텍스트에 남아 복사 붙여넣기를 거쳐도 살아남는 zero-width와 format 문자만 지운다. 암호학적 watermark 방식을 무력화한다는 주장이 아니다.
- **hook 점수기의 예측력**: 승자 구분 AUC는 0.56이고, 검증 코퍼스가 Instagram Reel이 아니라 YouTube Shorts 74개다. STAKES와 ADDRESS 검사는 이 코퍼스에서 변별력이 없었다.
- **플랫폼 수치의 노후화**: 해시태그 상한이 저장소 작성 중 30개에서 5개로 바뀌었고 linter에 옛 값이 남아 있다가 사실 확인 후 수정됐다. 저자는 저장소 내용이 Instagram의 현재 동작과 다르면 Instagram이 옳다고 적는다.
- **바이럴 조사의 수작업 비용**: `/ig-viral`은 자동 수집을 금지하므로 계정 10개, Reel 120개 안팎을 사용자가 지켜보며 읽어야 하고, 중앙값은 최근 12개를 눈으로 보고 정한다.
- **Claude Code 외 환경의 기능 축소**: `SKILL.md`를 채팅에 붙여 넣는 방식에서는 Python 도구를 쓸 수 없다.
- **영어 전제**: 상투어 사전, 구조 징후, 축약형 기반 VOICE 검사가 모두 영어 문장을 전제로 한다. 수집한 자료에는 다른 언어 지원에 대한 언급이 없다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| hook | Reel의 첫 1~3초 문장. 말하는 문장과 화면 문장을 따로 쓰고 `hooks.json`의 26개 공식에 대응시킨다 |
| outlier multiple | 게시물 조회수를 그 계정 최근 중앙값으로 나눈 값. 3배 초과를 신호, 1.5배 미만을 평소로 본다 |
| swipe file | 니치에서 잘 되는 hook과 출처를 모은 `swipe.md`. `/ig-reel`과 `/ig-plan`의 기본값보다 우선한다 |
| humanizer | 보이지 않는 문자, em dash, 상투어를 자동 제거하고 구조 징후를 표시한 뒤 5개 검사로 채점하는 후처리 |
| voice.md | 말투, 청중, 입장, 실제 수치를 담은 사용자 프로필. 전 스킬이 읽는다 |
| 승인 게이트 | 스킬은 쓰고 사람이 게시한다는 원칙. 모든 출력이 복사 블록과 "yes" 확인으로 끝난다 |

## 관련 페이지

- [[agents/agentskills-agentskills]]: 이 저장소의 스킬이 따르는 `SKILL.md` 형식 명세
- [[agents/mattpocock-skills]]: 같은 형식으로 소프트웨어 개발 과정을 작은 스킬로 나눈 저장소. 이 페이지의 저장소는 같은 접근을 Instagram 마케팅에 적용했다
- [[agents/osmani-2026-agent-skills]]: 에이전트 스킬 설계 원리 해설
