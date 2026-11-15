---
title: "The Instagram agent skill (Jakeschincariol/instagram-agent-skill)"
type: repo
year: 2026
category: agents
raw_path: raw/repos/jakeschincariol-instagram-agent-skill.md
raw_filename: "jakeschincariol-instagram-agent-skill.md"
source_collection: external
org: "Jakeschincariol"
repo: "instagram-agent-skill"
url: "https://github.com/Jakeschincariol/instagram-agent-skill"
license: "MIT"
tags: [agent-skills, claude-code, skill-md, instagram, content-marketing, humanizer, social-media]
---

## 한 줄 요약 (One-line Summary)

Instagram 계정 운영에 필요한 글쓰기 작업(Reel 대본, 캡션, carousel, Stories, 댓글, 답글, DM, 주간 계획, 성과 감사, 바이럴 조사, 프로필 점검)을 Claude 스킬 13개로 나누고, 그중 hook 점수기, 대본 타이밍, 캡션 linter, humanizer, swipe file 순위화를 로컬 Python 도구 5종으로 실제 실행하게 한 MIT 라이선스 스킬 묶음이다. 모든 스킬은 게시하지 않고 복사 가능한 블록만 내놓는 승인 게이트를 설계 원칙으로 삼는다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저장소 | Jakeschincariol/instagram-agent-skill |
| 저자 | Jake Schincariol (opusjake.ai) |
| 라이선스 | MIT |
| 생성과 최종 push | 2026-09-13 (수집 커밋 d03c56b) |
| star | 6,549 (2026-11-15 수집 시점) |
| plugin 이름 | `instagram-agent` (version 1.0.0) |
| 형제 저장소 | linkedin-agent-skill (같은 구조를 LinkedIn에 적용) |
| 수집 범위 | README, `templates/voice.md`, `.claude-plugin/plugin.json`, `skills/ig-*/SKILL.md` 13개. Python 도구와 JSON 데이터 파일 본문은 수집하지 않았다 |

스킬은 특정 작업 절차를 담아 에이전트에 결합하는 지침 패키지다. 이 저장소의 스킬은 모두 `SKILL.md` 하나에 frontmatter(`name`, `description`)와 본문 절차를 담는 Agent Skills 형식을 따르고, 일부 스킬 폴더에는 실행 가능한 Python 스크립트와 JSON 데이터가 함께 들어 있다.

## 2. 주요 기여 (Key Contributions)

- **플랫폼 운영 전 과정의 스킬 분해**: 기획(`/ig-plan`, `/ig-viral`), 제작(`/ig-reel`, `/ig-caption`, `/ig-carousel`, `/ig-story`, `/ig-repurpose`), 소통(`/ig-comment`, `/ig-reply`, `/ig-dm`), 점검(`/ig-profile`, `/ig-audit`), 후처리(`/ig-human`)를 13개 슬래시 커맨드로 나눴다.
- **"말로 판단하지 말고 도구로 재라"는 원칙**: hook 점수, 대본 길이, 캡션 잘림, AI 문체 흔적, 바이럴 순위를 LLM의 눈대중이 아니라 의존성 없는 로컬 Python 스크립트로 측정한다. SKILL.md마다 "Do not eyeball this"를 반복한다.
- **humanizer를 파이프라인 공통 후처리로 배치**: 대본, 캡션, 댓글, 답글, DM, 프로필 문구 모두 사용자에게 보여 주기 전에 `/ig-human`을 거친다. README는 humanizer가 "나머지 스킬을 쓸 만하게 만드는 이유"라고 적는다.
- **승인 게이트를 설계로 고정**: Instagram 이용약관이 자동 게시, 자동 댓글, 자동 팔로우, 자동 DM을 금지하므로 스킬은 게시 기능을 아예 갖지 않는다. 모든 출력은 복사 가능한 블록과 "yes" 확인으로 끝난다.
- **스스로 측정한 한계의 공개**: hook 점수기를 실제 hook 74개로 검증해 "나쁜 hook은 잘 걸러내지만(AUC 0.83) 같은 제작자의 히트와 실패는 구분하지 못한다(AUC 0.56)"는 결과를 README에 그대로 적었다.
- **사용자 증거 우선 구조**: `/ig-viral`이 만든 swipe file과 `/ig-audit`의 결론이 `/ig-reel`, `/ig-plan`의 기본값보다 우선하도록 파일(`~/.claude/instagram/*.md`)로 스킬을 연결했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 설치와 실행 환경

설치 경로는 네 가지다.

| 방식 | 절차 |
|---|---|
| Claude에 위임 | 저장소 URL과 "Install this skill, then confirm /ig-reel works."를 붙여 넣는다 |
| 수동 복사 (전역) | `git clone` 후 `cp -r instagram-agent-skill/skills/ig-* ~/.claude/skills/` |
| plugin | `/plugin marketplace add Jakeschincariol/instagram-agent-skill` 후 `/plugin install instagram-agent` |
| 프로젝트 로컬 | 같은 폴더를 저장소의 `.claude/skills/`에 복사 |

Claude Code가 없으면 `SKILL.md` 하나를 채팅 맨 위에 붙여 넣어 모드처럼 쓸 수 있다. 다만 이 경우 Python 도구 5종을 잃는데, 저자는 그것이 `/ig-reel`과 `/ig-human`의 핵심이라고 적는다. 회원가입, API key, 외부 연결은 필요 없다.

### 3.2 공유 상태 파일

스킬들은 `~/.claude/instagram/` 아래 파일로 상태를 주고받는다.

| 파일 | 작성 스킬 | 읽는 스킬 | 내용 |
|---|---|---|---|
| `voice.md` | 사용자 (또는 Claude가 본인 Reel 3개로 생성) | 전 스킬 | 이름, 대상 청중, 판매 상품, 말투, 쓰는 말과 안 쓰는 말, 욕설과 이모지 정책, 말하기 속도(wpm), 입장 3~5개, 금지 주제, 사용 가능한 실제 수치, 키워드 CTA |
| `swipe.md` | `/ig-viral` | `/ig-reel`, `/ig-plan` | 니치에서 통하는 hook 공식과 outlier 순위 |
| `log.md` | `/ig-reel`("yes" 시), `/ig-comment` | `/ig-audit`, `/ig-plan` | 게시일, 사용한 hook 공식, 첫 줄, 이번 주 댓글 단 계정 |
| `plan.md` | `/ig-plan` | 다른 스킬 | 주간 계획 |

`voice.md`는 다른 플랫폼보다 Instagram에서 더 중요하다고 강조한다. 대본은 소리 내어 말해야 하므로 "본인이 절대 하지 않을 문장은 초안이 아니라 재촬영"이기 때문이다. `voice.md`의 "Proof I can use" 칸이 비어 있으면 모든 초안에 `{{your number}}` 자리표시가 들어간다.

### 3.3 스킬 13개

| 커맨드 | 역할 | 주요 산출물 |
|---|---|---|
| `/ig-reel` | 아이디어 하나를 Reel 대본으로 | hook 후보 3개(점수 포함), 대본, 화면 텍스트, 시간표 |
| `/ig-viral` | 니치의 잘 되는 Reel 조사 | outlier multiple 순위, hook 공식 분류, swipe file |
| `/ig-caption` | 캡션 작성과 lint | 피드 125자 미리보기, PASS/WARN/FAIL 리포트 |
| `/ig-carousel` | 넘겨 보는 게시물 | 표지, 슬라이드별 문구, 1080x1350 파일 |
| `/ig-story` | 하루치 Stories 시퀀스 | 프레임별 화면과 대사, 스티커 배치, DM 유입 흐름 |
| `/ig-profile` | 프로필 100점 채점 | 12항목 점수표, 감점 순 재작성 |
| `/ig-plan` | 주간 계획 | 요일별 게시 유형, 형식, hook 공식, 교류 대상 10개 |
| `/ig-human` | humanizer | 정제된 텍스트와 5개 검사 점수 |
| `/ig-comment` | 남의 게시물에 댓글 | 9가지 유형 중 다른 유형 2개 후보 |
| `/ig-reply` | 내 게시물 댓글 관리 | 6개 분류별 답글 |
| `/ig-dm` | DM 작성 | 키워드 전달, 첫 메시지, 협업 제안, 후속 2회 |
| `/ig-repurpose` | 긴 자료를 일주일치 게시물로 | 추출 목록, 형식 배정, 주간 배치 |
| `/ig-audit` | 기존 게시물 사후 분석 | outlier 순위, 패턴, STOP과 DO MORE |

### 3.4 `/ig-reel`: Reel 대본

hook은 Reel의 첫 1~3초에 나오는 첫 문장으로, 시청자가 계속 볼지를 결정하는 구간이다. `/ig-reel`은 아래 구조를 기본으로 삼는다.

| 구간 | 이름 | 내용 |
|---|---|---|
| 0:00~0:02 | HOOK | 주장. 말하는 문장과 화면 문장을 따로 쓴다. 첫 프레임에 움직임 |
| 0:02~0:07 | THE STAKE | 시청자에게 왜 중요한지 한 줄 |
| 0:07~ | THE BODY | beat당 아이디어 하나, beat마다 화면 전환 |
| 마지막 3초 | THE PAYOFF | hook이 약속한 것을 전달하고 요청 하나 |
| 마지막 줄 | THE LOOP | hook의 단어 하나를 반복해 재생이 자연스럽게 이어지게 한다 |

길이는 15~45초를 권장한다. Reel은 3분까지 가능하지만 거의 쓸 일이 없고, 7초 미만은 반복 재생 수만 부풀린다.

작업 순서는 7단계다.

1. `hooks.json`의 26개 공식 중 맞는 공식 3개를 골라 말하는 문장과 화면 문장을 쓴다 (한 공식의 변형 3개가 아니라 서로 다른 공식).
2. `hookscore.py`로 채점한다. 최고점이 50 미만이면 hook이 아직 없다는 뜻이다.
3. 이긴 hook으로 대본을 쓴다. 축약형, 짧은 줄, 연습이 필요 없는 문장.
4. `beats.py script.txt --target {길이}`로 시간을 잰다. 3초 넘는 hook, 4초 넘는 beat, 구체성 없는 연속 beat, loop 부재를 모두 고친다.
5. `/ig-human`으로 정제한다.
6. 대본, 시간 포함 화면 텍스트 목록, `REEL READY` 영수증을 출력한다.
7. 게시하지 않는다. "yes"를 받으면 `log.md`에 날짜, hook 공식, 첫 줄을 남긴다.

화면 텍스트 규칙도 별도로 둔다.

- 카드당 6단어 이하
- hook 카드는 1프레임부터 노출
- 1080x1920 프레임 기준 y=230 위, y=1440 아래, 오른쪽 230픽셀에는 아무것도 두지 않는다 (캡션, 액션 레일, 오디오 띠가 덮는다)
- 본문 구간은 자막을 입힌다 (대부분 음소거로 먼저 본다)

그 밖의 규칙은 Reel 하나에 아이디어 하나, 형용사보다 숫자("$4,200"), 인사와 "in this video" 같은 도입 삭제, 요청은 하나, 수치 날조 금지다.

### 3.5 `/ig-viral`: 바이럴 조사와 swipe file

outlier multiple은 Reel 조회수를 그 계정 최근 Reel 조회수의 중앙값으로 나눈 값이다. 팔로워 200만 계정의 40만 조회는 평범한 날이고 팔로워 4,000 계정의 40만 조회는 무언가를 찾은 것이라는 관점이다. 3배 초과를 신호로, 1.5배 미만을 평소 수준으로 본다. 대상 계정은 사용자 규모의 약 10배 이내로 고른다.

| 단계 | 내용 |
|---|---|
| 1. 계정 선정 | 직접 경쟁 4개, 인접 니치(같은 청중) 4개, 형식 참고용 대형 계정 2~4개. 사용자의 Saved 컬렉션도 함께 본다 |
| 2. 열람 | 세션이 가진 브라우저 도구로 사람 속도로 계정 10개, 계정당 Reel 12개 정도를 읽는다. 계정, 팔로워, 중앙값, 조회수, hook 원문, 화면 텍스트, 길이, CTA를 기록한다 |
| 3. 순위화 | TSV(`account followers median views hook`)를 `swipe.py`에 넣는다. outlier multiple 계산, hook 공식 분류, `hookscore.py` 채점, 상위 1/3과 하위 1/3의 차이 출력 |
| 4. 해석 | 상위 1/3에서 과대 대표된 공식(개수 포함), 구조적 공통점, 분류되지 않은 hook을 보고하고 표본 크기와 신뢰도를 적는다 |
| 5. 실행안 | 상위 공식 3개를 사용자 본인의 이야기와 수치로 다시 써서 `/ig-reel`에 넘긴다 |

절대 규칙은 세 가지다. 사용자를 대신해 로그인하거나 비밀번호를 묻지 않는다. 대량 자동 수집(crawler, 스크래핑 서비스, 백그라운드 반복)은 하지 않는다. 영상이 아니라 공식을 베끼고 출처 계정을 모두 기록한다. Instagram이 충분한 데이터를 주지 않으면 조회수와 자막이 공개된 YouTube Shorts를 `yt-dlp`로 보조 코퍼스로 쓰고, 자동 자막에서 3.0초 미만 단어를 hook으로 잡는다.

### 3.6 `/ig-caption`: 캡션 linter

캡션은 피드에서 약 125자만 보이고 나머지는 "... more" 뒤에 숨는다. `caption.py`는 이 구간을 상자로 그려 보여 주고 다음 항목을 검사한다: 길이(2,200자 상한), 첫 줄이 125자에서 잘리는지, 보이는 구간의 구체성(숫자나 이름), 해시태그 수, 요청 개수, 지정 검색어 포함 여부, 이모지 밀도(100자당 4개 초과 경고).

먼저 캡션의 역할을 정한다.

| 역할 | 상황 | 첫 줄 |
|---|---|---|
| Job A | Reel이 이미 hook을 가짐 | 요청을 담백하게. 영상과 경쟁하지 않는다 |
| Job B | 사진, carousel처럼 캡션이 곧 콘텐츠 | hook. 짧고 구체적이며 절 중간이 아니라 절벽에서 끊는다 |

해시태그는 2025-12-18부터 게시물당 5개 상한이다 (이전 30개). Adam Mosseri가 2025-02에 해시태그는 도달 수단이 아니라 라벨이라고 말한 점도 인용한다. `#viral`, `#fyp` 같은 태그는 삭제한다. 검색어는 해시태그보다 중요하며 사람이 입력할 만한 구절로 본문 문장 안에 넣는다. 그 밖에 캡션 안 링크 금지(클릭되지 않음), 키워드 요청은 공백과 이모지 없는 한 단어(`Comment CONTRACT`), 대체 텍스트 작성을 규칙으로 둔다.

### 3.7 `/ig-human`: humanizer

humanizer는 AI가 쓴 초안에서 기계 문체 흔적을 지우는 후처리 도구다. `humanize.py`와 `detect.py`가 공용 데이터 `slop.json`(상투어 154개와 대체어, 보이지 않는 문자 18종, 타이포그래피 치환 11종, 구조적 징후 16종)을 읽는다. 각 목록의 마지막 블록은 Instagram 전용이며 사용자가 편집하도록 만든 파일이다.

자동으로 고치는 것:

| 대상 | 처리 |
|---|---|
| 보이지 않는 문자 | zero-width space와 joiner, word joiner, soft hyphen, BOM, Unicode tag 문자, 비분리 공백 등을 삭제. 이름 없는 Unicode format 문자도 삭제 |
| 타이포그래피 | em dash를 쉼표로, en dash를 하이픈으로, 둥근 따옴표를 곧은 따옴표로, 말줄임표를 점 세 개로, 불릿 문자를 하이픈으로. 그 뒤 남는 중복 구두점 정리 |
| 상투어 | delve, leverage, robust, seamless, crucial, "in today's fast-paced world"와 Instagram 블록("stop scrolling", "follow for more", "the algorithm loves", "run don't walk")을 평이한 말로 바꾸거나 삭제. 대소문자 보존, URL 유지 |

표시만 하고 고치지 않는 것은 문장 구조를 바꿔야 하는 징후다: "It's not just X, it's Y", 3항 나열, 한 단어 수사 의문문("The result?"), 영상 도입부, 이모지 불릿 목록, 대문자 단어 3개 연속, 해시태그 벽, 반사적 팔로우 유도. 이 줄은 사람이 직접 고친다.

`detect.py`의 5개 검사(0~100, 높을수록 사람 같음):

| 검사 | 측정 대상 | 기계 같은 모습 |
|---|---|---|
| BURSTINESS | 문장 길이 변화 | 모든 문장 길이가 같다 |
| SPECIFICITY | 100단어당 숫자, 이름, 구체 표지 | 추상 명사, 수치 없음 |
| SLOP DENSITY | 100단어당 상투어 적중 | 상투 어휘 |
| FINGERPRINT | 1,000자당 보이지 않는 문자, em dash, 둥근 따옴표 | 타이포그래피가 완벽하다 |
| VOICE | 축약형, 인칭, 구조적 징후 | 축약형 없음, 연출된 반전 |

종합 점수는 평균 60%와 최저 검사 40%를 가중한다. PASS 조건은 종합 70 이상이면서 모든 검사 55 이상이다. 최악으로 쓴 캡션은 32.5점(FLAGGED)에서 `humanize.py` 적용 후 79.7점(PASS, +47.2)이 됐다. 2회 반복은 정상이고 5회가 필요하면 초안 자체를 바꾸라고 안내한다.

### 3.8 나머지 제작 스킬

**`/ig-carousel`**: 순서가 있고 다시 읽어야 하는 아이디어(단계, 프레임워크, 전후 비교, 저장할 목록)에 쓴다. 6~10장(상한 20장, 5장 미만은 넘기기가 시작되지 않음). 구조는 표지(6단어 이하) → stake(두 번째 표지 역할) → 슬라이드당 아이디어 하나(헤드라인 3~7단어, 본문 25단어 이하) → 요약 슬라이드(스크린숏용) → CTA. 슬라이드 번호 표기, 모든 슬라이드에 핸들, 1080x1350 HTML을 Chrome headless로 인쇄, 글자 32px 이상, 바깥 120픽셀 여백을 규칙으로 둔다. Instagram은 참여하지 않은 사람에게 carousel을 뒷 슬라이드부터 다시 보여 줄 수 있으므로 2번 슬라이드도 단독으로 성립해야 한다.

**`/ig-story`**: Stories는 도달이 아니라 깊이를 위한 표면이다. 하루 3~7프레임, 요청은 7번이 아니라 4번 프레임에 둔다. 스티커별 용도를 구분한다.

| 스티커 | 용도 |
|---|---|
| Poll | 가장 싼 탭, 응답량 확보 |
| Question box | 청중의 실제 표현 수집. hook 공식 #16의 재료 |
| Quiz | 흔한 오해 교정 |
| Slider | 가벼운 분위기 확인 |
| Link | bio 외 유일한 클릭 표면 |
| Countdown | 출시, 라이브, 마감 |
| Add yours | 팔로워 밖 도달 (가끔) |

DM 유입 흐름은 문제를 말하는 story → poll이나 question box로 "나도 그렇다" 응답 → 응답자에게 개별 답장 순서다. 원칙은 "상대가 먼저 행동하고 그다음 답한다"이다.

**`/ig-repurpose`**: 긴 자료 하나에서 게시물 4~6개를 뽑는다. 요약하지 않고 단독으로 서는 요소(주장, 숫자, 이야기, 메커니즘, 실수, 인용 가능한 문장)를 개수와 함께 먼저 나열한다. 4개 미만이면 자료가 얇다고 말한다. 주장, 실수, 이야기는 Reel로, 메커니즘과 번호 목록은 carousel로, 인용 문장은 story 프레임으로 보낸다. 같은 hook 형태를 반복하지 않고, 본인 영상이 있으면 실제 영상을 쓰며, 한 번에 하나씩 초안을 쓴다.

### 3.9 소통 스킬

**`/ig-comment`**: 9가지 댓글 유형(데이터 추가, 빠진 경우 추가, 정중한 반대, 한 줄 확장, 진짜 질문, 경험담, 정정, 재구성, 한 줄 농담)에서 게시물 성격에 맞는 서로 다른 유형 2개를 제시하고 하나를 추천한다. 1~3문장, "Great post" 같은 시작 금지, 이모지 단독 금지, 피칭 금지. 배치 모드는 게시물 5~10개에 하나씩 댓글을 달고 `log.md`에 이번 주 대상 계정을 기록한다.

**`/ig-reply`**: 댓글을 6개로 분류하고 그 순서로 답한다.

| 분류 | 대응 |
|---|---|
| KEYWORD | 약속한 것을 보낸다 |
| LEAD | 공개 답변으로 충분히 답하고 마지막 한 문장으로 도움 제안 |
| SUBSTANCE | 스레드에서 가장 긴 답글 |
| QUESTION | 많은 사람이 가진 질문이면 답글 대신 Reel로 답한다 (hook 공식 #16) |
| SUPPORT | 좋아요와 3~8단어 |
| NOISE | 무응답 또는 한 줄 |

비판자에게는 맞는 부분을 먼저 인정하고 입장을 유지하며, 악성 댓글에는 답하지 않는다 (답글이 곧 도달이므로).

**`/ig-dm`**: 쓸 가치가 있는 DM은 세 종류다: 손을 든 사람에게 답장(키워드 댓글, poll 응답 등, 전체의 90%), 수 주간 댓글로 교류한 상대에게 첫 접근, 협업이나 브랜드 제안. 콜드 DM은 같은 시간에 할 수 있는 가장 수익이 낮은 일이라고 먼저 말한다. 키워드 전달은 조건 없이 첫 메시지에 바로 보낸다. 첫 메시지는 2~4문장, 링크와 캘린더 금지. 협업 제안은 4줄(관찰, 아이디어, 상대 이득, 요청). 후속은 +4일(새 정보 추가)과 +10일(마무리) 두 번뿐이다.

### 3.10 기획과 점검 스킬

**`/ig-plan`**: 주 4~5회 게시, 그중 3회 이상 Reel(비팔로워에게 안정적으로 도달하는 유일한 형식). 유형 배분은 Proof 주 1회, Teach 주 1~2회, Opinion 주 1회, Story 격주 1회, Offer 격주 1회이며 같은 유형을 연달아 두지 않는다. 각 슬롯에 주제가 아니라 이번 주 실제 사건에서 나온 각도와 hook 공식 번호를 붙인다. 게시 시각보다 첫 2초가 훨씬 중요하다고 명시한다. 매일 20분 교류 목록은 도달 5, 동료 3, 구매 후보 2개로 구성한다.

**`/ig-profile`**: 프로필은 진열장이 아니라 Reel 하나를 보고 넘어온 사람이 약 3초 안에 판단하는 결정 화면이다. `rubric.json`의 12항목 100점으로 채점하며 첫 채점은 대개 30~40점대다. 감점 순으로 이름 필드(30자, 검색 대상, `{Name} | {검색되는 말}` 형식 3안), bio 첫 줄, 고정 게시물 3개(증거, 상품 설명, 자기소개), 하이라이트 4~6개(Pricing, Results 등 구매자 질문), 링크 1개, 그리드 표지를 고친다. 재채점 결과를 과장하지 않는다.

**`/ig-audit`**: 조회수 대신 아래 지표로 순위를 낸다.

| 지표 | 계산 | 의미 |
|---|---|---|
| Outlier multiple | 조회수 / 계정 중앙값 | 진짜 히트인지 평소인지 |
| Non-follower reach | 비팔로워 도달 비율 | 퍼져 나갔는지 |
| Hold at 3s | 3초 시점 잔존 / 시작 | hook의 성적 |
| Average watch time | insights 값 | 중간부가 통했는지 |
| Sends per reach | 공유 / 도달 | 가장 강한 신호 |
| Follows per reach | 팔로우 / 도달 | 프로필 전환 |

조회는 높은데 팔로우가 없으면 hook이 아니라 프로필 문제이고, 조회가 없으면 hook 문제라고 구분한다. 요일과 시간은 마지막에만 본다. 표본 6개로는 패턴을 말하지 않는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 hook 점수기 검증

코퍼스는 실제 짧은 영상 hook 74개다. 5개 채널 각각에서 성과 상위 8개와 하위 8개 Shorts의 자동 자막 첫 3초를 썼고 조회수는 931~550,000회다. Instagram은 로그인 없이 조회수를 수집할 수 없고 스크래핑은 약관 위반이라 YouTube Shorts를 썼다고 밝힌다.

| 결과 | 수치 | 해석 |
|---|---|---|
| 나쁜 hook 검출 | 의도적으로 나쁘게 쓴 hook 10개 대비 AUC 0.83, 10개 중 9개가 실제 코퍼스 중앙값 미만 | 인사, 도입부, 구체성 없는 hook은 잘 잡는다 |
| 같은 제작자의 히트와 실패 구분 | AUC 0.56 (0.50이 동전 던지기) | 승자를 고르지 못한다 |
| 개별 검사 | SPECIFICITY만 중앙값 60점 차이로 구분. STAKES와 ADDRESS는 두 집단 중앙값이 동일 | 이 코퍼스에서 두 검사는 아무것도 측정하지 못했다 |
| 공식 분류기 | 저자 템플릿 기반 regex는 실제 hook의 8%만 분류, 실제 발화 기반으로 다시 써서 49% | 나머지 51%는 분류를 보류한다 (공식 없는 팟캐스트 클립이 많음) |

검증 과정에서 공식 5개(Contrarian Flip, The Statistic, The Reveal, Someone Else's Result, The Superlative)를 추가했고, SPECIFICITY가 숫자 문자만 세던 버그("zero dollars"를 구체성 없음으로 판정)를 고쳤다. 저자가 권하는 사용법은 "명백히 약한 hook을 촬영 전에 버리고, 그다음은 본인의 retention 그래프를 믿으라"이다. 측정 스크립트는 `yt-dlp` 의존 때문에 저장소에 없고 방법만 `/ig-viral`에 적혀 있다.

### 4.2 도구 출력 예시

| 도구 | 예시 결과 |
|---|---|
| `hookscore.py` | "Nobody tells you that your first 30 reels..." 85.6 STRONG, "Hey guys, today I wanted to talk about..." 9.6 WEAK (dealbreaker: 인사) |
| `beats.py` | 73단어, 165wpm 기준 약 26.6초. 14.6초짜리 beat 경고, hook 단어 "$18,000" 반복으로 loop 확인, 목표 대비 3.5초 부족 |
| `caption.py` | 첫 줄 133자로 125자에서 잘림(WARN), 검색어 2개 중 1개 누락(WARN) |
| `detect.py` | 32.5 FLAGGED → 79.7 PASS (+47.2) |
| `swipe.py` | 팔로워 규모가 작은 계정의 60.0배 hook이 120만 조회지만 1.3배인 hook보다 위에 온다 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **게시 불가**: Instagram Content Publishing API는 Meta 개발자 앱, 연결된 Page, 장기 토큰, 앱 심사가 필요해 스킬로 제공할 수 없다. 브라우저 자동화나 서드파티 도구는 약관 위반이다. 예외는 댓글 후에만 작동하는 공식 키워드 자동 DM이다.
- **검출 점수는 로컬 휴리스틱**: GPTZero, Originality, Copyleaks, Winston, Turnitin을 호출하지 않으며 그 판정을 보장하지 않는다. "탐지 불가"를 약속하지 않는다.
- **보이지 않는 문자 제거의 범위**: 복사 붙여넣기에도 남는 zero-width와 format 문자만 지운다. 암호학적 watermark를 무력화한다는 주장이 아니다.
- **hook 점수기는 승자를 예측하지 못한다** (AUC 0.56). 코퍼스가 Instagram Reel이 아니라 YouTube Shorts다.
- **플랫폼 수치의 노후화**: 해시태그 상한이 저장소 작성 중 30개에서 5개로 바뀌었고 linter에 옛 값이 남아 있다가 확인 후 수정됐다. Instagram 실제 동작과 다르면 Instagram이 옳다고 적는다.
- **날조 금지**: 사용자가 주지 않은 수치, 고객, 성과는 만들지 않고 `{{your number}}`로 남긴다.
- **영어 전용**: 상투어 사전, 구조 징후, 축약형 기반 VOICE 검사가 모두 영어 기준이다 (raw에 다른 언어 지원 언급 없음).

## 6. 관련 연구 (Related Work)

- [[agents/agentskills-agentskills]]: 이 저장소가 따르는 `SKILL.md` 형식의 명세
- [[agents/mattpocock-skills]]: 같은 형식으로 소프트웨어 개발 과정을 작은 스킬로 나눈 저장소. 이 저장소는 같은 접근을 마케팅 업무에 적용했다
- [[agents/osmani-2026-agent-skills]]: 에이전트 스킬 설계 원리 해설
- 형제 저장소 linkedin-agent-skill (wiki 미수록)

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| hook | Reel의 첫 1~3초 문장. 말하는 문장과 화면 문장을 따로 쓴다 |
| hook 공식 | `hooks.json`의 26개 템플릿(Nobody Tells You, Time Collapse, The Steal 등). 템플릿, 예문, 화면 문장, 용도, 실패 방식, match regex를 가진다 |
| outlier multiple | 게시물 조회수를 그 계정 최근 중앙값으로 나눈 값. 3배 초과를 신호로 본다 |
| swipe file | 니치에서 잘 되는 hook과 출처를 모은 참고 파일 (`swipe.md`) |
| beat sheet | 대본 줄마다 말하는 시간을 추정해 쌓은 시간표 |
| humanizer | AI 초안에서 보이지 않는 문자, em dash, 상투어를 제거하고 사람다움을 채점하는 후처리 |
| slop | AI 글에 흔한 상투 어휘 (`slop.json`) |
| voice.md | 사용자의 말투, 청중, 입장, 실제 수치를 담은 프로필. 전 스킬이 읽는다 |
| Job A / Job B | 캡션 역할 구분. A는 영상이 hook을 가진 경우, B는 캡션이 곧 콘텐츠인 경우 |
| 승인 게이트 | 스킬은 쓰고 사람이 게시한다는 원칙. 모든 출력이 복사 블록과 "yes" 확인으로 끝난다 |
