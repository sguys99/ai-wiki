---
title: "revfactory/varco-platform"
type: repo
year: 2026
category: agents
raw_path: raw/repos/revfactory-varco-platform.md
raw_filename: "revfactory-varco-platform.md"
source_collection: external
org: "revfactory"
repo: "varco-platform"
url: "https://github.com/revfactory/varco-platform"
license: "unspecified"
tags: [claude-code, agent-workflow, game-development, subagent, skills, multi-agent, varco]
figures:
  - id: fig01
    label: showreel hero
    kind: figure
    file: assets/revfactory-varco-platform/fig01.gif
    raw: https://raw.githubusercontent.com/revfactory/varco-platform/main/docs/media/showreel-hero.gif
    caption: "아이디어 한 줄이 에이전트 15개를 거쳐 게임이 되는 과정을 요약한 쇼릴 GIF"
    strategy: manual
    curated: false
  - id: fig02
    label: varco apis
    kind: figure
    file: assets/revfactory-varco-platform/fig02.gif
    raw: https://raw.githubusercontent.com/revfactory/varco-platform/main/docs/media/varco-apis.gif
    caption: "OPENAPI_KEY 하나로 Sound, 3D, SyncFace, Voice, Translate 등 VARCO 서비스에 연결되는 모습 (애니메이션 GIF)"
    strategy: manual
    curated: false
  - id: fig03
    label: manual cover
    kind: figure
    file: assets/revfactory-varco-platform/fig03.png
    raw: https://raw.githubusercontent.com/revfactory/varco-platform/main/docs/media/manual-cover.png
    caption: "VARCO API Platform 한국어 레퍼런스 매뉴얼 표지"
    strategy: manual
    curated: false
  - id: fig04
    label: process poster
    kind: figure
    file: assets/revfactory-varco-platform/fig04.jpg
    raw: https://raw.githubusercontent.com/revfactory/varco-platform/main/VARCO-Game-Studio-Process-poster.jpg
    caption: "기획, 명세, 제작, 개발, 출시 5단계 카드와 단계별 에이전트 약칭, 컨셉 승인과 크레딧 승인 두 번의 사람 확인을 표시한 전체 흐름도"
    strategy: manual
    curated: true
  - id: fig05
    label: phase team
    kind: figure
    file: assets/revfactory-varco-platform/fig05.gif
    raw: https://raw.githubusercontent.com/revfactory/varco-platform/main/docs/media/phase-team.gif
    caption: "게임 디렉터를 중심으로 에이전트 15개가 단계별 궤도에 배치되는 장면 (애니메이션 GIF)"
    strategy: manual
    curated: false
  - id: fig06
    label: phase plan
    kind: figure
    file: assets/revfactory-varco-platform/fig06.gif
    raw: https://raw.githubusercontent.com/revfactory/varco-platform/main/docs/media/phase-plan.gif
    caption: "기획 카드 사이로 메시지가 오가며 밸런스 수치가 수정되고 동결되는 장면 (애니메이션 GIF)"
    strategy: manual
    curated: false
  - id: fig07
    label: phase spec
    kind: figure
    file: assets/revfactory-varco-platform/fig07.gif
    raw: https://raw.githubusercontent.com/revfactory/varco-platform/main/docs/media/phase-spec.gif
    caption: "크레딧 견적이 올라가고 승인 도장이 찍히는 명세 단계 장면 (애니메이션 GIF)"
    strategy: manual
    curated: false
  - id: fig08
    label: phase make
    kind: figure
    file: assets/revfactory-varco-platform/fig08.gif
    raw: https://raw.githubusercontent.com/revfactory/varco-platform/main/docs/media/phase-make.gif
    caption: "효과음 파형, 립싱크 얼굴, 3D 메시, 번역이 동시에 진행되는 제작 단계 장면 (애니메이션 GIF)"
    strategy: manual
    curated: false
  - id: fig09
    label: phase build
    kind: figure
    file: assets/revfactory-varco-platform/fig09.gif
    raw: https://raw.githubusercontent.com/revfactory/varco-platform/main/docs/media/phase-build.gif
    caption: "게임 서버가 에셋을 불러오고 QA가 점수 버그를 잡아 수정하는 개발 단계 장면 (애니메이션 GIF)"
    strategy: manual
    curated: false
  - id: fig10
    label: phase ship
    kind: figure
    file: assets/revfactory-varco-platform/fig10.gif
    raw: https://raw.githubusercontent.com/revfactory/varco-platform/main/docs/media/phase-ship.gif
    caption: "출시 기준 여섯 줄이 체크되고 GO가 표시되는 출시 단계 장면 (애니메이션 GIF)"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

`revfactory/varco-platform`은 NC AI의 VARCO API 플랫폼으로 게임을 기획부터 QA와 출시 판정까지 만드는 Claude Code harness "VARCO Game Studio"를 담은 저장소다. 에이전트 15개와 스킬 17개가 다섯 단계로 나뉘어 일하고, 단계마다 실행 방식(지속형 협업, 서브에이전트, Workflow 스크립트, 엔지니어와 QA 한 쌍, 병렬 검사)을 다르게 골랐으며, 유료 API 크레딧을 지키기 위한 승인, 예산 차단, 호출 장부 장치를 공용 클라이언트에 모았다.

## 1. 자료 정보 (Document Information)

- **저장소**: `revfactory/varco-platform` (https://github.com/revfactory/varco-platform)
- **라이선스**: 저장소에 라이선스 파일이 없다 (GitHub API 기준 미지정). README의 "권리 안내" 절은 VARCO 문서 원문 저작권이 NC AI에 있고 이 저장소가 NC AI의 공식 저장소가 아니라고 밝힌다
- **생성 시점**: 2026년 9월 27일 (GitHub 저장소 생성일). README의 레퍼런스 매뉴얼은 2026년 9월 28일 기준이다
- **자료 형태**: GitHub README 전문. harness 파일(`.claude/agents/`, `.claude/skills/`)의 본문이 아니라 사용 안내 문서다
- **본문 언어**: 한국어

README가 소개하는 저장소 구성물은 다섯 가지다.

| 항목 | 위치 | 설명 |
|---|---|---|
| 게임 제작 harness | `.claude/agents/`, `.claude/skills/` | Claude Code 에이전트 15개와 스킬 17개. 게임 아이디어 한 줄로 기획, 에셋 제작, 프로토타입 개발, QA, 출시 판정까지 진행한다 |
| VARCO 레퍼런스 매뉴얼 | `VARCO-API-Reference-Manual-ko.pdf` | api.varco.ai 공개 문서를 모은 한국어 PDF, 141쪽 |
| VARCO 플랫폼 소개 영상 | `VARCO-Platform-Intro.mp4` | VARCO API 서비스를 소개하는 47초 모션그래픽 |
| harness 쇼릴 | `VARCO-Game-Studio-Showreel.mp4` | harness로 게임이 만들어지는 과정을 담은 1분 모션그래픽, 사운드트랙 포함 |
| 제작 과정 영상 | `VARCO-Game-Studio-Process.mp4` | 코인 러너가 준비부터 출시 판정까지 가는 과정을 해설 자막과 함께 따라가는 2분 모션그래픽 |

README 배지는 Claude Code Harness v2, Agents 15, Skills 17, Phases 5를 표기한다. 에이전트 15개는 README 팀 구성 표의 행 수와 일치하고, 스킬 17개도 스킬 표에 이름이 실린 수(조율 1, 공용 1, 기획 6, 제작 6, 개발과 QA 3)와 일치한다.

## 2. 주요 기여 (Key Contributions)

- **특정 상용 API 플랫폼에 맞춘 게임 제작 harness.** 범용 게임 스튜디오 템플릿과 달리 VARCO의 Sound, Voice, SyncFace, 3D, Translate 같은 생성 API 호출을 에셋 제작 단계의 실제 작업 단위로 삼는다.
- **단계마다 실행 방식을 다르게 고른다.** 기획은 이름 붙은 에이전트끼리 메시지를 주고받는 지속형 협업, 에셋 명세는 서브에이전트 한 명과 사용자 승인, 에셋 제작은 Workflow 스크립트, 개발은 엔지니어와 QA 한 쌍, 출시 준비는 네 가지 검사의 병렬 실행과 디렉터 판정으로 나눈다. README는 선택마다 이유를 표로 밝힌다.
- **모델을 위상이 아니라 업무 성격으로 배정한다.** 아이디어 구체화와 전체 통합에는 fable, 설계와 코드와 교차 검증에는 opus, 절차가 정해진 제작과 검사에는 sonnet을 쓴다.
- **크레딧을 지키는 장치를 공용 클라이언트에 모은다.** 사용자 승인, 예산 초과 호출 차단, 동시 호출 시 잠금으로 크레딧 선예약, 모든 호출을 기록하는 장부, 드라이런, 인증 실패나 크레딧 부족 시 즉시 중단, 단가 미공개 API의 별도 승인이 모두 `varco_client.py` 하나를 거친다.
- **사람 확인을 두 지점으로 제한한다.** 컨셉 승인과 크레딧 승인 두 번만 멈추고 나머지는 에이전트가 진행한다.
- **산출물 계약서 한 곳에서 에이전트 간 파일 형식을 정한다.** `.claude/skills/varco-game-studio/references/contracts.md`가 에이전트끼리 주고받는 파일의 위치와 형식을 정의한다.
- **harness 자체를 설명하는 영상을 코드로 만든다.** 쇼릴과 제작 과정 영상을 HTML 캔버스와 numpy 합성으로 렌더링하고 재현 절차를 공개한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 VARCO API 플랫폼

VARCO API 플랫폼은 NC AI가 운영하는 AI API 서비스다. 한 번 연동하면 텍스트, 이미지, 오디오, 3D를 다루는 AI 기능을 같은 방식으로 호출할 수 있고, 호출 내역과 크레딧 사용량은 워크스페이스에서 함께 관리한다.

| 분류 | 서비스 | 기능 |
|---|---|---|
| Game AI | Sound | 텍스트로 효과음과 환경음 생성(Text to Sound), 변형(Variation), 끊김 없는 루프(Looping), 모노에서 스테레오 변환, 사람 목소리를 몬스터 음색으로 변환(Conversion), 잡음 제거(Enhance) |
| Game AI | 3D | 이미지 한 장으로 3D 메시와 텍스처 생성(Image to 3D, GLB) |
| Game AI | SyncFace | 음성으로 입 모양과 표정 블렌드셰이프 애니메이션 생성(Voice-to-Face) |
| Media AI | Voice | 빠른 TTS(Lite), 감정 연기 TTS(Standard), 목소리만 바꾸는 음성 변환(Voice Conversion, Acting) |
| Media AI | Translate | 용어집을 반영한 게임 채팅과 콘텐츠 번역(10개 언어) |
| Visual AI | Art Fashion | 배경 합성, 시점 변경, 업스케일, 지우기, 인페인트, 텍스처와 그래픽 합성, 가상 착장, 헤드스왑 |
| Content Biz AI | Chatbot | FAQ와 RAG 기반 상담 챗봇, 지식 관리 도구 |
| Content Protection AI | Gentle Words | 채팅과 게시글의 스팸, 금칙어 필터링 |
| Integrations | 플러그인 | VARCO Sound Unity 플러그인(효과음, 루프, 크리처, 음악, 음성을 에디터 안에서 생성) |

시작 절차는 다섯 단계다.

1. api.varco.ai에 구글 계정으로 가입한다. 가입하면 개인 워크스페이스가 생성된다.
2. 여럿이 함께 쓰려면 공용 워크스페이스를 만들고 멤버를 초대한다.
3. 사이드바의 API 키 메뉴에서 키를 발급한다.
4. 워크스페이스 오너가 크레딧을 구매한다. 호출마다 크레딧이 차감된다.
5. 요청 헤더에 `OPENAPI_KEY`를 넣어 호출한다 (예: `https://openapi.ai.nc.com/sound/varco/v1/api/text2sound`에 `prompt`와 `num_sample`을 JSON으로 보낸다).

과금은 사용량 기반 크레딧 방식이며 공식 가격표는 2026년 9월 기준 "공개 예정"이다.

### 3.2 레퍼런스 매뉴얼

저장소에 포함된 한국어 레퍼런스 매뉴얼은 141쪽이며 2026년 9월 28일 기준이다.

| 구성 | 내용 |
|---|---|
| 제1부 도큐먼트 25편 | 시작하기, Game AI, Media AI, Visual AI, Content Biz AI, Content Protection AI, Integrations |
| 제2부 API 레퍼런스 28편 | 엔드포인트, 요청 파라미터, 응답 형식, 예제 코드 |
| 부속 자료 | 이미지 77장과 오디오 샘플 16개 |
| 용량 | 11MB |

README는 이 매뉴얼이 공개 문서를 엮은 참고용 사본이며 NC AI의 공식 문서가 아니라고 명시하고, 최신 명세는 공식 API Reference 페이지에서 확인하라고 안내한다.

### 3.3 진행 흐름과 단계별 실행 방식

게임 아이디어 한 줄을 받으면 에이전트 15개가 다섯 단계로 게임을 만든다. 결과물은 기획 문서, VARCO로 만든 효과음과 대사 음성과 얼굴 애니메이션과 3D 모델과 번역 문자열, 플레이할 수 있는 웹 또는 Unity 프로토타입, QA 보고서, 출시 판정서다.

README의 mermaid 흐름도는 아이디어 한 줄에서 출발해 01 기획(게임 디렉터와 시스템, 시나리오, 레벨, UI/UX, 밸런스), 02 에셋 명세(매니페스트와 크레딧 견적), 사용자 크레딧 승인, 03 에셋 제작(사운드, 보이스, 비주얼, 현지화에서 에셋 QA로, 고칠 수 있는 실패만 1회 재작업), 04 개발(게임플레이 엔지니어와 게임 QA의 양방향), 05 출시 준비(에셋 감사, 회귀 테스트, 밸런스 대조, 스토어 이미지), 디렉터 Go / No-Go 순으로 이어진다.

| 단계 | 실행 방식 | README가 밝힌 선택 이유 |
|---|---|---|
| 01 기획 | 이름 붙인 에이전트들이 메시지를 주고받는 지속형 협업 | 시스템, 시나리오, 레벨, UI 문서가 서로 맞물려 여러 번 조율해야 한다 |
| 02 에셋 명세 | 서브에이전트 한 명과 사용자 승인 | 매니페스트 한 개면 충분하고, 비용이 드는 단계라 사람이 승인해야 한다 |
| 03 에셋 제작 | Workflow 스크립트 | 만들 에셋 목록과 검증, 재작업 규칙을 코드로 정할 수 있다 |
| 04 개발 | 엔지니어와 QA 한 쌍 | 모듈을 끝낼 때마다 바로 검사하고 버그를 주고받는다 |
| 05 출시 준비 | 검사 네 가지를 병렬로 실행한 뒤 디렉터가 판정 | 서로 독립인 검사를 동시에 실행하고, 판정은 한 사람이 기준표로 내린다 |

제작 과정 영상 포스터(fig04)는 같은 흐름을 단계별 실행 방식 표기와 함께 보여 준다. 기획은 SendMessage 6명, 명세는 Agent 1명, 제작은 Workflow(제작에서 검증), 개발은 지속형 한 쌍, 출시는 Agent 4개 병렬 후 디렉터로 표기된다.

단계별 GIF 설명은 다음과 같다.

| 단계 | 장면 설명 |
|---|---|
| 팀 | 게임 디렉터를 중심으로 다섯 단계 에이전트 15개 |
| 01 기획 | 밸런스 분석가와 시스템 기획자가 수치를 조율하고, 디렉터가 불일치를 해결한 뒤 동결 |
| 02 명세 | 에셋 매니페스트와 크레딧 견적, 사용자 승인 |
| 03 제작 | 효과음, 대사 음성과 립싱크, 3D 모델, 번역을 병렬로 만들고 에셋마다 QA |
| 04 개발 | 에셋을 불러와 실행하고, QA가 버그를 잡으면 엔지니어가 고친 뒤 재검사 |
| 05 출시 | 기준 여섯 가지를 모두 통과하면 GO |

### 3.4 팀 구성과 모델 배정

모델은 에이전트의 위상이 아니라 업무 성격으로 고른다. 막연한 아이디어를 구체화하고 전체를 통합하는 일에는 fable, 설계와 코드와 교차 검증에는 opus, 절차가 정해진 제작과 검사에는 sonnet을 쓴다.

| 단계 | 에이전트 | 모델 | 역할 |
|---|---|---|---|
| 기획 | `game-director` | fable | 컨셉 구체화, 기획 문서 통합 리뷰, GDD, 출시 판정 |
| 기획 | `systems-designer` | opus | 코어 루프와 시스템 규칙, 밸런스 CSV와 스키마 |
| 기획 | `narrative-designer` | opus | 세계관, 캐릭터, 대사 스크립트, 용어집 |
| 기획 | `level-designer` | opus | 레벨 배치와 난이도 흐름, 사운드 구역, 필요한 프랍 |
| 기획 | `ux-designer` | sonnet | 화면 흐름, HUD, UI 문자열 |
| 기획, 출시 | `balance-analyst` | opus | 몬테카를로 시뮬레이션으로 수치 검증, 구현 수치 대조 |
| 명세 | `asset-producer` | sonnet | 에셋 매니페스트, VARCO API 호출 순서, 크레딧 견적 |
| 제작 | `sound-designer` | sonnet | 효과음, 환경음 루프, 크리처 음성 |
| 제작 | `voice-director` | sonnet | 화자 캐스팅, 대사 음성, 얼굴 애니메이션 |
| 제작 | `visual-artist` | sonnet | 3D 모델, 이미지 편집 |
| 제작 | `localization-specialist` | sonnet | 대사와 UI 번역, 용어집과 자리표시자 보호 |
| 제작, 출시 | `asset-qa` | sonnet | 에셋 측정과 검증, 출시 전 전수 감사 |
| 개발 | `gameplay-engineer` | opus | 웹(Phaser 3, three.js) 또는 Unity 6 프로토타입 |
| 개발, 출시 | `game-qa` | opus | 테스트 계획, 모듈별 검사, 버그 리포트, 회귀 테스트 |
| 출시 | `marketing-artist` | sonnet | 스토어 키 아트와 캡슐 이미지, 스토어 설명 |

모델별 개수는 fable 1개, opus 6개(`systems-designer`, `narrative-designer`, `level-designer`, `balance-analyst`, `gameplay-engineer`, `game-qa`), sonnet 8개다. 세 에이전트(`balance-analyst`, `asset-qa`, `game-qa`)는 두 단계에 걸쳐 참여한다.

### 3.5 스킬 구성

| 묶음 | 스킬 |
|---|---|
| 조율 | `varco-game-studio` (전체 흐름을 조율하는 오케스트레이터) |
| 공용 | `varco-api` (VARCO API 명세 정리본과 공용 클라이언트 `varco_client.py`) |
| 기획 | `game-concept`, `game-systems-design`, `game-narrative`, `level-design`, `game-ux-design`, `balance-simulation` |
| 제작 | `asset-manifest`, `varco-sound-production`, `varco-voice-production`, `varco-visual-production`, `varco-localization`, `marketing-kit` |
| 개발과 QA | `game-prototype-dev`, `asset-qa-check`, `game-qa-testing` |

에이전트끼리 주고받는 파일의 위치와 형식은 산출물 계약서(`.claude/skills/varco-game-studio/references/contracts.md`) 한 곳에서 정한다.

### 3.6 크레딧을 지키는 장치

| 장치 | 동작 |
|---|---|
| 크레딧 승인 | 에셋을 만들기 전에 견적을 보여 주고 반드시 사용자 승인을 받는다 |
| 예산 차단 | 모든 VARCO 호출은 공용 클라이언트를 거친다. 승인한 예산을 넘는 호출은 보내지 않고, 여러 에이전트가 동시에 호출해도 잠금으로 크레딧을 먼저 예약하므로 예산을 넘지 않는다 |
| 호출 장부 | 모든 호출(드라이런 포함)이 `varco_ledger.jsonl`에 한 줄씩 남는다 |
| 드라이런 | 키가 없거나 원하지 않으면 실제로 호출하지 않고 요청 명세와 견적만 만든다 |
| 즉시 중단 | 인증 실패나 크레딧 부족이 한 번이라도 나오면 아직 시작하지 않은 에셋은 호출하지 않는다 |
| 단가 미공개 API | 번역, Voice-to-Face, 음성 변환 Acting은 단가가 공개되지 않아 따로 승인받아야 호출한다. 승인하지 않으면 연기 변환은 일반 TTS로 대체하고 얼굴 애니메이션은 뺀다 |

### 3.7 사용 절차

준비물은 다음과 같다.

| 필요한 것 | 용도 |
|---|---|
| Claude Code | harness 실행 |
| Python 3 (3.10 이상 권장), `numpy`, `Pillow`, `requests` | 공용 클라이언트와 검사 스크립트 |
| `ffmpeg`, `ffprobe` | 오디오 후처리와 측정 |
| VARCO `OPENAPI_KEY` (선택) | 실제 에셋 생성. 없으면 드라이런으로 진행한다 |
| Unity 6 (선택) | Unity 프로토타입. 기본값은 웹이다 |
| Playwright MCP (선택) | 웹 프로토타입을 브라우저로 직접 플레이하며 QA |

설치는 저장소 clone, `pip install numpy pillow requests`, 선택적으로 `.env`에 `OPENAPI_KEY` 기록(`.env`는 `.gitignore`에 포함), `claude` 실행 순이다. harness 파일을 방금 추가하거나 수정한 세션에서는 에이전트가 아직 등록되지 않았을 수 있어 Claude Code를 새로 시작해야 `.claude/agents/`의 에이전트 15개를 불러온다.

Claude Code에 만들고 싶은 게임을 말하면 `varco-game-studio` 스킬이 호출된다. README 예시 요청은 "무너지는 금고에서 코인을 모아 탈출하는 2분짜리 웹게임 만들어줘"와 "Unity로 VARCO 사운드가 들어간 탑다운 슈터 프로토타입 만들어줘. 번역은 영어와 일본어."다.

진행 중 멈춰서 묻는 지점은 두 곳이다.

1. **컨셉 승인**: 디렉터가 쓴 컨셉의 핵심 결정 세 가지를 보여 주고 방향을 확인한다.
2. **크레딧 승인**: 에셋 목록과 견적(우선순위별 합계, 단가 미공개 호출 수, 수동 제작 에셋)을 보여 주고 전체 승인, P0만 승인, 드라이런 가운데 고르게 한다.

결과는 두 폴더로 나뉜다. `games/{slug}/`는 확정본으로 `docs/`(컨셉, GDD, 시스템, 시나리오, 레벨, UX, 밸런스 보고서), `data/`(밸런스 CSV, 캐릭터와 대사와 UI 문자열, 용어집, `strings/{lang}.json`), `assets/`, `manifest.json`(승인된 에셋 목록과 제작 상태), `web/` 또는 `unity/`, `qa/`, `marketing/`, `RELEASE_REPORT.md`(출시 판정서)를 담는다. `_workspace/{slug}/`는 작업 기록으로 초안, 에이전트 간 산출물, 크레딧 장부, 동결 해시를 담는다.

### 3.8 후속 요청의 부분 재실행

| 요청 예 | 다시 실행하는 범위 |
|---|---|
| "밸런스 수정해줘, 적이 너무 세" | 시스템 기획과 밸런스 분석, 데이터 재반영, 구현 수치 대조 |
| "대사 음성만 다시 뽑아줘" | 3단계를 해당 에셋만 |
| "일본어 현지화 추가해줘" | 에셋 명세에 현지화 추가, 크레딧 승인, 3단계 |
| "드라이런 말고 실제로 생성해줘" | 키 확인, 크레딧 승인, 3단계 전체 |
| "버그 고쳐줘", "QA 다시 돌려줘" | 4단계 엔지니어와 QA 한 쌍 |
| "스토어 이미지 다시 만들어줘" | 마케팅 아티스트만 |
| "출시 판정 다시" | 5단계 |

### 3.9 공용 클라이언트 단독 사용

게임 전체가 아니라 VARCO API 호출 한두 번만 필요하면 `.claude/skills/varco-api/scripts/varco_client.py`를 직접 쓸 수 있다.

| 하위 명령 | 기능 |
|---|---|
| `catalog` | 사용할 수 있는 API 목록과 추정 단가 |
| `validate` | 호출 전 파라미터 검사(필수값, 허용값, 글자와 바이트 한도)와 추정 크레딧 |
| `call ... --dry-run` | 호출하지 않고 요청 명세만 저장 |
| `call ... --budget 500` | 실제 호출. 장부 기준 누적 500 크레딧을 넘으면 호출하지 않는다 |
| `ledger` | 장부 요약 |

API는 `sound.text2sound`, `sound.variation`처럼 서비스와 기능을 점으로 이은 이름으로 지정하고, `--param`, `--file`, `--out`, `--ledger` 옵션을 받는다.

### 3.10 쇼릴과 제작 과정 영상

맨 위 쇼릴은 harness가 게임을 만드는 과정을 1분으로 옮긴 모션그래픽이며, 소재는 harness를 시험할 때 실제로 만든 "코인 러너"의 대사와 데이터다.

| 항목 | 1분 쇼릴 | 2분 제작 과정 영상 |
|---|---|---|
| 사양 | 1920×1080, 60fps, 60초, 48kHz 스테레오 | 1920×1080, 60fps, 120초, 48kHz 스테레오 |
| 화면 | HTML 캔버스 한 장에 모든 요소를 코드로 그림. 모든 장면이 시간만 받아 그리는 순수 함수라 어느 프레임이든 똑같이 다시 그릴 수 있고, 엔딩 몽타주는 앞 장면을 다시 불러 쓴다 | 같은 엔진. 화면 아래 자막 30줄이 장면마다 누가 무엇을 하는지 설명한다 |
| 소리 | 120 BPM, A 단조 음악과 효과음 27종을 numpy로 합성. 화면과 소리가 같은 큐 시트 `timeline.json`을 읽어 한 박자 안에서 맞물린다 | 쇼릴의 합성기를 고쳐 장면마다 악기 편성을 `timeline.json`에서 읽는다. 장면 길이를 바꾸면 음악과 효과음이 새 시간표를 따른다 |
| 재현 | `_workspace/showreel/`에서 `build_timeline.py`, `audio/synth.py`, `render.py` | `_workspace/process/`에서 같은 순서, `render.py`에 브라우저 10개 병렬 렌더링 인자 |

제작 과정 영상은 쇼릴보다 자세히 준비 단계(리더가 실행 설정 `run_meta.json`을 정함), 두 번의 사람 확인, 공유 작업 목록과 기획 동결과 승격, 매니페스트 검사 스크립트, 에셋 QA의 재작업, 엔지니어와 QA의 계획 문서, 결과 폴더와 후속 요청을 보여 준다. 재렌더링에는 Playwright(Python)와 Chrome이 필요하다.

### 3.11 저장소 구조

| 경로 | 내용 |
|---|---|
| `.claude/agents/` | 에이전트 정의 15개 |
| `.claude/skills/` | 스킬 17개 (스크립트와 참조 문서 포함) |
| `CLAUDE.md` | harness 호출 조건과 변경 이력 |
| `docs/media/` | README용 GIF와 이미지 |
| `_workspace/link-check/` | VARCO 문서 수집 작업 파일 |
| `_workspace/book/` | 레퍼런스 매뉴얼 제작 파일 |
| `_workspace/animation/` | 플랫폼 소개 영상 제작 파일 |
| `_workspace/showreel/`, `_workspace/process/` | 쇼릴과 제작 과정 영상 제작 파일 |
| `_workspace/harness-build/` | harness 시험 표본과 검증 스크립트 |
| `_workspace/readme-media/` | README GIF 생성 스크립트 |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README는 정량 벤치마크를 제시하지 않는다. 검증 범위에 관해 밝힌 내용은 다음과 같다.

- 실제 VARCO 서버로 전체 흐름을 실행해 보지는 않았다.
- 공용 클라이언트는 로컬 모의 서버로 실제 호출 경로(응답 저장, 3D 결과 조회, 오류 분류, 동시 호출 예산)를 검증했다.
- 에이전트는 드라이런으로 시험했다.
- harness 시험 중 "코인 러너"라는 게임을 실제로 만들었고, 그 대사와 데이터가 쇼릴 소재가 되었다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **크레딧 단가는 추정치다.** 공식 가격표가 공개되지 않아 각 문서에 주석으로 숨겨진 가격표에서 단가를 가져왔다. 번역, Voice-to-Face, 음성 변환 Acting은 단가를 몰라 견적 합계에 들어가지 않는다.
- **VARCO에 없는 기능이 있다.** 텍스트로 이미지를 만드는 API와 음악을 만드는 REST API가 없다. 3D 원본 이미지는 사용자가 주거나 다른 이미지 생성 도구로 만들고, 배경음악은 Unity 플러그인에서 사람이 만드는 수동 에셋으로 분류한다.
- **실제 서버 기반 end-to-end 검증이 없다.** 처음 실제 키로 실행할 때 결과를 함께 확인하라고 README가 권고한다.
- **Unity WebGL 빌드**가 필요하면 Unity Hub에서 WebGL 빌드 모듈을 따로 설치해야 한다.
- **라이선스가 명시되지 않았다.** 매뉴얼과 VARCO 문서 원문 저작권은 NC AI에 있고, 영상과 매뉴얼의 Pretendard 글꼴만 SIL Open Font License를 따른다고 밝힌다.
- **새 세션 필요.** harness 파일을 추가한 세션에서는 에이전트가 등록되지 않을 수 있다.

## 6. 관련 연구 (Related Work)

- [[agents/donchitos-claude-code-game-studios]]: Claude Code에 게임 스튜디오 조직을 입히는 범용 템플릿. 3계층 에이전트 49개와 협업 프로토콜 중심이며, varco-platform은 에이전트 수를 15개로 줄이고 특정 생성 API의 크레딧 통제에 집중한다
- [[overviews/agent-harness-engineering-overview]]: harness 설계 일반론
- [[overviews/agent-skills-overview]]: 스킬 패키지 형식
- [[agents/9bow-2026-gstack-claude-code-virtual-team]]: Claude Code 위에 역할별 가상 팀을 구성하는 다른 사례

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| VARCO API 플랫폼 | NC AI가 운영하는 AI API 서비스. Sound, 3D, SyncFace, Voice, Translate, Art Fashion, Chatbot, Gentle Words를 `OPENAPI_KEY` 하나로 호출한다 |
| VARCO Game Studio | 이 저장소의 게임 제작 harness 이름. 에이전트 15개, 스킬 17개, 5단계 |
| 크레딧 | VARCO 호출마다 차감되는 사용량 기반 과금 단위. 워크스페이스 오너가 구매한다 |
| 공용 클라이언트 (`varco_client.py`) | 모든 VARCO 호출이 거치는 스크립트. 파라미터 검사, 예산 차단, 장부 기록, 드라이런을 담당한다 |
| 호출 장부 (`varco_ledger.jsonl`) | 드라이런을 포함한 모든 호출을 한 줄씩 기록하는 JSONL 파일 |
| 드라이런 | 실제로 호출하지 않고 요청 명세와 견적만 만드는 실행 모드 |
| 에셋 매니페스트 | 만들 에셋 목록, 호출 순서, 크레딧 견적을 담은 명세. 승인 후 `manifest.json`이 된다 |
| 산출물 계약서 (`contracts.md`) | 에이전트끼리 주고받는 파일의 위치와 형식을 정한 단일 문서 |
| 기획 동결 | 기획 단계 문서를 확정하고 해시를 남겨 이후 단계의 기준으로 삼는 처리 |
| Go / No-Go | 출시 준비 단계에서 게임 디렉터가 기준 여섯 가지로 내리는 출시 판정 |

## 8. 그림 후보 (Figure Candidates)

repo 유형이므로 자동 추출은 하지 않았고, README 본문이 참조하는 이미지의 GitHub URL을 후보로 기록했다. 배지는 도식이 아니라 제외했다. GIF는 대부분 3MB에서 7MB 크기의 애니메이션이라 정지 화면으로 내용이 드러나지 않아, 흐름 전체를 한 장에 담은 포스터만 wiki에 넣었다.

| id | 원본 경로 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | `docs/media/showreel-hero.gif` | "쇼릴 요약 GIF" | manual | (보류, 7MB 애니메이션) |
| fig02 | `docs/media/varco-apis.gif` | "OPENAPI_KEY 하나로 VARCO 서비스에 연결되는 모습" | manual | (보류, 첫 프레임에 서비스 목록이 없음) |
| fig03 | `docs/media/manual-cover.png` | "레퍼런스 매뉴얼 표지" | manual | (보류, 도식 아님) |
| fig04 | `VARCO-Game-Studio-Process-poster.jpg` | "5단계 카드와 단계별 에이전트, 두 번의 사람 확인" | manual | ★ wiki 확정 (architecture) |
| fig05 | `docs/media/phase-team.gif` | "에이전트 15개가 궤도에 배치되는 장면" | manual | (보류, 애니메이션) |
| fig06 | `docs/media/phase-plan.gif` | "기획 단계 수치 조율과 동결" | manual | (보류, 애니메이션) |
| fig07 | `docs/media/phase-spec.gif` | "크레딧 견적과 승인" | manual | (보류, 애니메이션) |
| fig08 | `docs/media/phase-make.gif` | "에셋 병렬 제작과 QA" | manual | (보류, 애니메이션) |
| fig09 | `docs/media/phase-build.gif` | "개발 단계 버그 수정과 재검사" | manual | (보류, 애니메이션) |
| fig10 | `docs/media/phase-ship.gif` | "출시 기준 체크와 GO" | manual | (보류, 애니메이션) |
