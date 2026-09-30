---
title: "revfactory/varco-platform"
type: repo
year: 2026
category: agents
raw_path: raw/repos/revfactory-varco-platform.md
raw_filename: "revfactory-varco-platform.md"
source_collection: external
source: revfactory-varco-platform.md
org: "revfactory"
repo: "varco-platform"
url: "https://github.com/revfactory/varco-platform"
license: "unspecified"
tags: [claude-code, agent-workflow, game-development, subagent, skills, multi-agent, varco]
figures:
  - id: fig04
    label: process poster
    kind: figure
    file: assets/revfactory-varco-platform/fig04.jpg
    raw: https://raw.githubusercontent.com/revfactory/varco-platform/main/VARCO-Game-Studio-Process-poster.jpg
    caption: "기획, 명세, 제작, 개발, 출시 5단계 카드와 단계별 에이전트 약칭, 컨셉 승인과 크레딧 승인 두 번의 사람 확인을 표시한 전체 흐름도"
    strategy: manual
    curated: true
---

## 요약

`revfactory/varco-platform`은 NC AI의 VARCO API 플랫폼으로 게임을 만드는 Claude Code harness "VARCO Game Studio"를 담은 저장소다. harness는 모델을 감싸 도구, 검증, 상태를 제공하는 실행 환경을 말한다. 이 저장소의 harness는 게임 아이디어 한 줄을 받아 기획, 에셋 명세, 에셋 제작, 개발, 출시 준비의 다섯 단계를 거쳐 기획 문서, 효과음과 대사 음성과 3D 모델 같은 에셋, 플레이 가능한 웹 또는 Unity 프로토타입, QA 보고서, 출시 판정서를 만든다.

구성은 에이전트 15개와 스킬 17개다. 스킬은 특정 작업 절차를 담아 에이전트에 결합하는 지침 패키지를 뜻한다. 저장소에는 harness 외에도 VARCO 공개 문서를 모은 141쪽 한국어 레퍼런스 매뉴얼, 플랫폼 소개 영상, harness 작업 과정을 보여 주는 1분 쇼릴과 2분 제작 과정 영상이 함께 들어 있다.

이 harness의 특징은 두 가지다. 첫째, 단계마다 작업 성격에 맞춰 실행 방식을 다르게 골랐다. 둘째, 호출마다 비용이 드는 유료 API를 쓰기 때문에 크레딧 승인, 예산 차단, 호출 장부, 드라이런 같은 비용 통제 장치를 공용 클라이언트 한 곳에 모았다. 범용 게임 스튜디오 템플릿이 조직 구조와 협업 규율에 집중하는 것과 달리, 이 저장소는 특정 생성 API를 안전하게 소비하는 파이프라인에 초점을 둔다.

## 배경

### 생성 API를 게임 에셋 제작에 쓰는 문제

게임 하나에는 효과음, 환경음, 대사 음성, 얼굴 애니메이션, 3D 모델, 번역 문자열 같은 이질적인 에셋이 필요하다. VARCO API 플랫폼은 이런 에셋을 만드는 생성 기능을 `OPENAPI_KEY` 하나로 같은 방식으로 호출하게 해 준다. 따라서 에이전트가 기획 문서에서 필요한 에셋을 뽑아 API를 직접 호출하면 에셋 제작 단계를 자동화할 수 있다.

반면 호출마다 크레딧이 차감되므로 에이전트가 무분별하게 호출하면 비용이 통제되지 않는다. 여러 에이전트가 병렬로 호출하면 예산 초과를 사전에 막기도 어렵다. 게다가 README 작성 시점(2026년 9월)에 공식 가격표는 "공개 예정" 상태였다. 즉 비용을 정확히 알 수 없는 API를 여러 에이전트가 동시에 호출하는 상황이다. 이 저장소의 크레딧 보호 장치는 이 문제에 대한 대응이다.

### 저장소 성격

저장소는 2026년 9월 27일에 생성되었고, 레퍼런스 매뉴얼은 2026년 9월 28일 기준이다. README는 한국어로 작성되었으며 이 저장소가 NC AI의 공식 저장소가 아니라고 밝힌다. 라이선스 파일은 없고, 매뉴얼과 VARCO 문서 원문의 저작권은 NC AI에 있다.

| 항목 | 위치 | 설명 |
|---|---|---|
| 게임 제작 harness | `.claude/agents/`, `.claude/skills/` | 에이전트 15개와 스킬 17개 |
| VARCO 레퍼런스 매뉴얼 | `VARCO-API-Reference-Manual-ko.pdf` | api.varco.ai 공개 문서를 모은 한국어 PDF, 141쪽 |
| 플랫폼 소개 영상 | `VARCO-Platform-Intro.mp4` | VARCO API 서비스를 소개하는 47초 모션그래픽 |
| harness 쇼릴 | `VARCO-Game-Studio-Showreel.mp4` | 게임이 만들어지는 과정을 담은 1분 모션그래픽 |
| 제작 과정 영상 | `VARCO-Game-Studio-Process.mp4` | 코인 러너가 준비부터 출시 판정까지 가는 과정을 해설 자막과 함께 보여 주는 2분 모션그래픽 |

README 배지가 표기한 에이전트 15개와 스킬 17개는 본문 표에 이름이 실린 개수와 정확히 일치한다. `.claude/agents/` 폴더에도 에이전트 정의 파일 15개가 있다.

## 핵심 개념

서브에이전트는 상위 에이전트가 위임한 작업을 격리된 컨텍스트에서 수행하는 에이전트다. 이 harness의 에셋 명세 단계는 서브에이전트 한 명이 매니페스트를 작성하는 방식으로 실행된다.

매니페스트는 패키지나 산출물에 무엇이 들었는지를 적은 목록 파일이다. 이 harness에서 에셋 매니페스트는 만들 에셋 목록, VARCO API 호출 순서, 크레딧 견적을 담고, 사용자 승인을 거쳐 `games/{slug}/manifest.json`이 되어 제작 상태까지 추적한다.

드라이런은 실제 API를 호출하지 않고 요청 명세와 견적만 만드는 실행 모드다. VARCO 키가 없거나 비용을 쓰고 싶지 않은 사용자도 드라이런으로 전체 흐름을 시험할 수 있다.

크레딧은 VARCO 호출마다 차감되는 사용량 기반 과금 단위다. 워크스페이스 오너가 구매하며, harness는 에셋을 만들기 전 크레딧 견적을 사용자에게 보여 주고 승인을 받는다.

기획 동결은 기획 단계 문서를 확정하고 해시를 남겨 이후 단계의 기준으로 삼는 처리다. 동결 해시는 작업 기록 폴더 `_workspace/{slug}/`에 저장된다. 기획이 동결된 뒤에는 에셋 명세와 제작이 그 문서를 근거로 진행된다.

## VARCO API 플랫폼

### 제공 서비스

VARCO API 플랫폼은 텍스트, 이미지, 오디오, 3D를 다루는 AI 기능을 한 번의 연동으로 호출하게 해 주는 NC AI의 서비스다. 호출 내역과 크레딧 사용량은 워크스페이스 단위로 관리한다.

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

harness가 에셋 제작에 쓰는 서비스는 이 중 Sound, Voice, SyncFace, 3D, Translate다. 예를 들어 사운드 디자이너 에이전트는 Sound로 효과음과 환경음 루프를 만들고, 보이스 디렉터 에이전트는 Voice로 대사 음성을 만든 뒤 SyncFace로 얼굴 애니메이션을 붙인다.

### 가입과 호출 절차

VARCO를 쓰려면 다섯 단계를 거친다.

1. api.varco.ai에 구글 계정으로 가입한다. 가입하면 개인 워크스페이스가 생성된다.
2. 여럿이 함께 쓰려면 공용 워크스페이스를 만들고 멤버를 초대한다.
3. 사이드바의 API 키 메뉴에서 키를 발급한다.
4. 워크스페이스 오너가 크레딧을 구매한다. 호출마다 크레딧이 차감된다.
5. 요청 헤더에 `OPENAPI_KEY`를 넣어 호출한다.

README의 호출 예시는 `https://openapi.ai.nc.com/sound/varco/v1/api/text2sound`에 `{"prompt": "비 내리는 숲속 환경음", "num_sample": 2}`를 JSON으로 보내는 요청이다. README는 API 키를 코드나 문서에 적지 말고, 유출이 의심되면 즉시 폐기하고 새로 발급하라고 경고한다.

### 레퍼런스 매뉴얼

저장소에 포함된 한국어 레퍼런스 매뉴얼은 api.varco.ai의 공개 문서를 엮은 141쪽 PDF이며 용량은 11MB다.

| 구성 | 내용 |
|---|---|
| 제1부 도큐먼트 25편 | 시작하기, Game AI, Media AI, Visual AI, Content Biz AI, Content Protection AI, Integrations |
| 제2부 API 레퍼런스 28편 | 엔드포인트, 요청 파라미터, 응답 형식, 예제 코드 |
| 부속 자료 | 이미지 77장과 오디오 샘플 16개 |

README는 이 매뉴얼이 참고용 사본이며 NC AI가 발행한 공식 문서가 아니라고 명시한다. 따라서 엔드포인트와 파라미터의 최신 명세는 공식 API Reference 페이지에서 확인해야 한다. 매뉴얼 제작 파일은 `_workspace/book/`, 문서 수집 작업 파일은 `_workspace/link-check/`에 있다.

## 방법

### 전체 흐름

harness는 게임 아이디어 한 줄에서 시작해 다섯 단계를 차례로 거치고, 마지막에 게임 디렉터가 Go 또는 No-Go를 판정한다. 흐름 중간에 사람에게 묻는 지점은 두 곳(컨셉 승인, 크레딧 승인)뿐이다.

![[assets/revfactory-varco-platform/fig04.jpg]]
*Figure: 5단계 카드와 단계별 에이전트, 두 번의 사람 확인을 표시한 전체 흐름도 (revfactory 2026, 제작 과정 영상 포스터)*

그림의 원 안 약칭은 각 단계에 참여하는 에이전트다. 기획에는 LVL, UX, BAL, DIR, SYS, NAR 6개가, 명세에는 AST 1개가, 제작에는 L10N, AQA, SND, VOX, VIS 5개가, 개발에는 ENG, GQA 2개가, 출시에는 MKT, DIR, AQA, GQA, BAL 5개가 표시된다. 출시 단계의 점선 원은 앞 단계 담당이 다시 참여한다는 뜻이다.

README의 mermaid 흐름도는 같은 과정을 다음 순서로 그린다.

1. 아이디어 한 줄
2. 01 기획: 게임 디렉터와 시스템, 시나리오, 레벨, UI/UX, 밸런스 담당의 지속형 협업
3. 02 에셋 명세: 매니페스트와 크레딧 견적
4. 사용자 크레딧 승인
5. 03 에셋 제작: 사운드, 보이스, 비주얼, 현지화 제작 후 에셋 QA. 고칠 수 있는 실패만 1회 재작업
6. 04 개발: 게임플레이 엔지니어와 게임 QA가 양방향으로 주고받음
7. 05 출시 준비: 에셋 감사, 회귀 테스트, 밸런스 대조, 스토어 이미지
8. 디렉터 Go / No-Go

### 단계별 실행 방식

이 harness의 설계에서 가장 두드러진 부분은 단계마다 실행 방식을 다르게 선택했다는 점이다. README는 선택마다 이유를 밝힌다.

| 단계 | 실행 방식 | 선택 이유 | 포스터 표기 |
|---|---|---|---|
| 01 기획 | 이름 붙인 에이전트들이 메시지를 주고받는 지속형 협업 | 시스템, 시나리오, 레벨, UI 문서가 서로 맞물려 여러 번 조율해야 한다 | SendMessage, 6명 |
| 02 에셋 명세 | 서브에이전트 한 명과 사용자 승인 | 매니페스트 한 개면 충분하고, 비용이 드는 단계라 사람이 승인해야 한다 | Agent, 1명 |
| 03 에셋 제작 | Workflow 스크립트 | 만들 에셋 목록과 검증, 재작업 규칙을 코드로 정할 수 있다 | Workflow, 제작에서 검증 |
| 04 개발 | 엔지니어와 QA 한 쌍 | 모듈을 끝낼 때마다 바로 검사하고 버그를 주고받는다 | 지속형 한 쌍 |
| 05 출시 준비 | 검사 네 가지를 병렬로 실행한 뒤 디렉터가 판정 | 서로 독립인 검사를 동시에 실행하고, 판정은 한 사람이 기준표로 내린다 | Agent 4개, 디렉터 |

선택 기준은 작업 간 의존 구조로 읽을 수 있다. 기획 문서처럼 서로 맞물리는 산출물은 반복 조율이 필요하므로 에이전트 사이의 메시지 교환을 허용한다. 에셋 제작처럼 목록과 규칙이 사전에 확정되는 작업은 Workflow 스크립트로 결정론적으로 실행한다. 출시 검사처럼 서로 독립인 작업은 병렬로 실행하고 판정만 한 명에게 모은다.

에셋 제작 단계의 재작업 규칙도 코드로 제한된다. 에셋 QA에서 실패한 에셋 중 고칠 수 있는 실패만 1회 재작업하므로, 제작과 검증이 무한히 반복되지 않는다.

### 단계별 장면

README는 각 단계의 모습을 GIF로 보여 준다. 아래 표는 GIF 설명에 드러난 단계별 담당과 작업이다.

| 단계 | 장면 |
|---|---|
| 팀 | 게임 디렉터를 중심으로 다섯 단계 에이전트 15개가 배치된다 |
| 01 기획 | 밸런스 분석가와 시스템 기획자가 수치를 조율하고, 디렉터가 불일치를 해결한 뒤 동결한다 |
| 02 명세 | 에셋 매니페스트와 크레딧 견적을 만들고 사용자 승인을 받는다 |
| 03 제작 | 효과음, 대사 음성과 립싱크, 3D 모델, 번역을 병렬로 만들고 에셋마다 QA한다 |
| 04 개발 | 에셋을 불러와 실행하고, QA가 버그를 잡으면 엔지니어가 고친 뒤 재검사한다 |
| 05 출시 | 기준 여섯 가지를 모두 통과하면 GO를 표시한다 |

### 팀 구성과 모델 배정

에이전트 15개의 모델은 에이전트의 위상이 아니라 업무 성격으로 배정된다. 막연한 아이디어를 구체화하고 전체를 통합하는 일에는 fable, 설계와 코드와 교차 검증에는 opus, 절차가 정해진 제작과 검사에는 sonnet을 쓴다.

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

모델별로 세면 fable 1개, opus 6개, sonnet 8개다. fable은 컨셉 구체화와 최종 판정을 맡는 게임 디렉터 하나에만 배정된다. opus는 기획 설계, 밸런스 시뮬레이션, 코드 작성, 게임 QA처럼 판단과 교차 검증이 필요한 역할에 배정된다. sonnet은 매니페스트 작성, 에셋 제작, 에셋 측정처럼 절차가 정해진 역할에 배정된다.

세 에이전트는 두 단계에 걸쳐 참여한다. `balance-analyst`는 기획 단계에서 수치를 검증하고 출시 단계에서 구현 수치를 대조한다. `asset-qa`는 제작 단계에서 에셋마다 검증하고 출시 단계에서 전수 감사를 한다. `game-qa`는 개발 단계에서 모듈별 검사를 하고 출시 단계에서 회귀 테스트를 한다. 즉 출시 준비의 병렬 검사 네 가지(에셋 감사, 회귀 테스트, 밸런스 대조, 스토어 이미지)는 앞 단계 담당자와 마케팅 아티스트가 나눠 맡는다.

### 스킬 구성

스킬 17개는 다섯 묶음으로 나뉜다.

| 묶음 | 스킬 | 개수 |
|---|---|---|
| 조율 | `varco-game-studio` (전체 흐름을 조율하는 오케스트레이터) | 1 |
| 공용 | `varco-api` (VARCO API 명세 정리본과 공용 클라이언트 `varco_client.py`) | 1 |
| 기획 | `game-concept`, `game-systems-design`, `game-narrative`, `level-design`, `game-ux-design`, `balance-simulation` | 6 |
| 제작 | `asset-manifest`, `varco-sound-production`, `varco-voice-production`, `varco-visual-production`, `varco-localization`, `marketing-kit` | 6 |
| 개발과 QA | `game-prototype-dev`, `asset-qa-check`, `game-qa-testing` | 3 |

진입점은 `varco-game-studio` 하나다. 사용자가 만들고 싶은 게임을 말하면 이 스킬이 호출되어 단계 진행을 조율한다. `varco-api`는 VARCO 명세 정리본과 공용 클라이언트를 함께 담아, 모든 제작 스킬이 같은 호출 경로를 쓰도록 만든다.

에이전트끼리 주고받는 파일의 위치와 형식은 산출물 계약서(`.claude/skills/varco-game-studio/references/contracts.md`) 한 곳에서 정한다. 계약서를 한 파일로 모으면 에이전트 정의마다 형식을 따로 적을 필요가 없고, 형식을 바꿀 때도 한 곳만 고치면 된다.

### 크레딧 보호 장치

크레딧 보호 장치는 모두 공용 클라이언트 `varco_client.py`를 거치도록 설계되었다. 에이전트가 VARCO를 직접 호출하지 않고 이 클라이언트만 쓰기 때문에 예산과 기록을 한 곳에서 통제할 수 있다.

| 장치 | 동작 |
|---|---|
| 크레딧 승인 | 에셋을 만들기 전에 견적을 보여 주고 반드시 사용자 승인을 받는다 |
| 예산 차단 | 승인한 예산을 넘는 호출은 보내지 않는다. 여러 에이전트가 동시에 호출해도 잠금으로 크레딧을 먼저 예약하므로 예산을 넘지 않는다 |
| 호출 장부 | 드라이런을 포함한 모든 호출이 `varco_ledger.jsonl`에 한 줄씩 남는다 |
| 드라이런 | 키가 없거나 원하지 않으면 실제로 호출하지 않고 요청 명세와 견적만 만든다 |
| 즉시 중단 | 인증 실패나 크레딧 부족이 한 번이라도 나오면 아직 시작하지 않은 에셋은 호출하지 않는다 |
| 단가 미공개 API | 번역, Voice-to-Face, 음성 변환 Acting은 단가가 공개되지 않아 따로 승인받아야 호출한다 |

단가 미공개 API에는 대체 경로가 있다. 사용자가 별도 승인을 하지 않으면 연기 변환(Acting)은 일반 TTS로 대체하고 얼굴 애니메이션은 빼고 진행한다. 따라서 승인 여부와 관계없이 게임 제작 흐름은 끝까지 이어진다.

예산 차단의 잠금 기반 선예약은 병렬 제작 단계에서 특히 중요하다. 03 에셋 제작 단계에서는 사운드, 보이스, 비주얼, 현지화 담당이 동시에 호출하므로, 각 호출이 끝난 뒤 사용량을 합산하는 방식으로는 초과를 막을 수 없다. 호출 전에 크레딧을 예약하면 동시 호출 중에도 누적 사용량이 승인 예산을 넘지 않는다.

## 사용 흐름

### 준비물과 설치

| 필요한 것 | 용도 |
|---|---|
| Claude Code | harness 실행 |
| Python 3 (3.10 이상 권장), `numpy`, `Pillow`, `requests` | 공용 클라이언트와 검사 스크립트 |
| `ffmpeg`, `ffprobe` | 오디오 후처리와 측정 |
| VARCO `OPENAPI_KEY` (선택) | 실제 에셋 생성. 없으면 드라이런으로 진행한다 |
| Unity 6 (선택) | Unity 프로토타입. 기본값은 웹이다 |
| Playwright MCP (선택) | 웹 프로토타입을 브라우저로 직접 플레이하며 QA |

설치는 네 단계다.

1. `git clone https://github.com/revfactory/varco-platform.git`으로 저장소를 받는다.
2. `pip install numpy pillow requests`로 의존성을 설치한다.
3. 선택적으로 `.env` 파일에 `OPENAPI_KEY=발급받은_키`를 기록한다. `.env`는 `.gitignore`에 포함되어 커밋되지 않는다.
4. `claude`로 Claude Code를 실행한다.

harness 파일을 방금 추가하거나 수정한 세션에서는 에이전트가 아직 등록되지 않았을 수 있다. 이 경우 Claude Code를 새로 시작해야 `.claude/agents/`의 에이전트 15개를 불러온다.

### 게임 제작 요청과 두 번의 확인

Claude Code에 만들고 싶은 게임을 자연어로 말하면 `varco-game-studio` 스킬이 호출된다. README가 든 예시 요청은 두 가지다.

- "무너지는 금고에서 코인을 모아 탈출하는 2분짜리 웹게임 만들어줘"
- "Unity로 VARCO 사운드가 들어간 탑다운 슈터 프로토타입 만들어줘. 번역은 영어와 일본어."

진행 중 사람에게 묻는 지점은 두 곳이다.

| 확인 | 시점 | 보여 주는 내용 | 사용자 선택 |
|---|---|---|---|
| 컨셉 승인 | 기획 단계 | 디렉터가 쓴 컨셉의 핵심 결정 세 가지 | 방향 확인 |
| 크레딧 승인 | 에셋 명세 이후 | 에셋 목록과 견적(우선순위별 합계, 단가 미공개 호출 수, 수동 제작 에셋) | 전체 승인, P0만 승인, 드라이런 |

컨셉 승인은 방향을 정하는 지점이고 크레딧 승인은 비용을 쓰는 지점이다. 제작 과정 영상의 자막도 "중간에 두 번 멈추고 사람에게 묻습니다. 방향을 정할 때와 크레딧을 쓸 때입니다."라고 설명한다. 크레딧 승인에서 "P0만 승인"을 고르면 우선순위가 가장 높은 에셋만 만들어 비용을 줄일 수 있다.

### 결과 폴더

결과는 확정본과 작업 기록 두 폴더로 나뉜다.

| 폴더 | 성격 | 내용 |
|---|---|---|
| `games/{slug}/docs/` | 확정본 | 컨셉, GDD, 시스템, 시나리오, 레벨, UX, 밸런스 보고서 |
| `games/{slug}/data/` | 확정본 | 밸런스 CSV, 캐릭터와 대사와 UI 문자열, 용어집, `strings/{lang}.json` |
| `games/{slug}/assets/` | 확정본 | 효과음, 환경음, 대사 음성, 얼굴 애니메이션, 3D 모델, 이미지 |
| `games/{slug}/manifest.json` | 확정본 | 승인된 에셋 목록과 제작 상태 |
| `games/{slug}/web/` 또는 `unity/` | 확정본 | 프로토타입 |
| `games/{slug}/qa/` | 확정본 | 테스트 계획, 버그 리포트, 보고서, 스크린샷 |
| `games/{slug}/marketing/` | 확정본 | 스토어 이미지 |
| `games/{slug}/RELEASE_REPORT.md` | 확정본 | 출시 판정서 |
| `_workspace/{slug}/` | 작업 기록 | 초안, 에이전트 간 산출물, 크레딧 장부, 동결 해시 |

`games/`는 다음 단계와 사람이 보는 결과이고, `_workspace/`는 과정의 흔적이다. 이 분리 덕분에 사람은 확정본만 검토하면 되고, 문제가 생기면 작업 기록에서 원인을 추적할 수 있다.

### 후속 요청의 부분 재실행

이미 진행한 게임은 요청 내용에 따라 필요한 단계만 다시 실행한다.

| 요청 예 | 다시 실행하는 범위 |
|---|---|
| "밸런스 수정해줘, 적이 너무 세" | 시스템 기획과 밸런스 분석, 데이터 재반영, 구현 수치 대조 |
| "대사 음성만 다시 뽑아줘" | 3단계를 해당 에셋만 |
| "일본어 현지화 추가해줘" | 에셋 명세에 현지화 추가, 크레딧 승인, 3단계 |
| "드라이런 말고 실제로 생성해줘" | 키 확인, 크레딧 승인, 3단계 전체 |
| "버그 고쳐줘", "QA 다시 돌려줘" | 4단계 엔지니어와 QA 한 쌍 |
| "스토어 이미지 다시 만들어줘" | 마케팅 아티스트만 |
| "출시 판정 다시" | 5단계 |

비용이 새로 발생하는 요청(현지화 추가, 실제 생성 전환)은 반드시 크레딧 승인을 다시 거친다. 반면 비용이 들지 않는 요청(버그 수정, 출시 판정)은 해당 단계만 바로 실행한다. 드라이런으로 먼저 전체 흐름을 확인한 뒤 실제 생성으로 전환하는 사용 방식도 이 표에서 지원된다.

### 공용 클라이언트 단독 사용

게임 전체가 아니라 VARCO API 호출 한두 번만 필요하면 공용 클라이언트를 직접 쓸 수 있다. 경로는 `.claude/skills/varco-api/scripts/varco_client.py`다.

| 하위 명령 | 기능 | README 예시 |
|---|---|---|
| `catalog` | 사용할 수 있는 API 목록과 추정 단가 | `python3 $C catalog` |
| `validate` | 호출 전 파라미터 검사(필수값, 허용값, 글자와 바이트 한도)와 추정 크레딧 | `validate sound.text2sound --param prompt="heavy door creaking" --param num_sample=3` |
| `call --dry-run` | 호출하지 않고 요청 명세만 저장 | `call sound.text2sound --param prompt="coin pickup chime" --out out/coin.wav --ledger out/ledger.jsonl --dry-run` |
| `call --budget` | 실제 호출. 장부 기준 누적 예산을 넘으면 호출하지 않는다 | `call sound.variation --file source=out/coin_01.wav --param num_sample=4 --budget 500` |
| `ledger` | 장부 요약 | `ledger --ledger out/ledger.jsonl` |

API는 `sound.text2sound`, `sound.variation`처럼 서비스 이름과 기능 이름을 점으로 이은 식별자로 지정한다. `--budget 500` 예시는 장부에 기록된 누적 사용량이 500 크레딧을 넘으면 호출을 보내지 않는다는 뜻이다. 즉 harness 내부의 예산 차단 장치를 단독 사용에서도 그대로 쓸 수 있다.

## 쇼릴과 제작 과정 영상

저장소는 harness의 작업 과정을 보여 주는 영상 두 편을 코드로 만들어 함께 공개한다. 소재는 harness를 시험할 때 실제로 만든 "코인 러너"의 대사와 데이터다.

| 항목 | 1분 쇼릴 | 2분 제작 과정 영상 |
|---|---|---|
| 사양 | 1920×1080, 60fps, 60초, 48kHz 스테레오 | 1920×1080, 60fps, 120초, 48kHz 스테레오 |
| 화면 | HTML 캔버스 한 장에 모든 요소를 코드로 그린다 | 같은 엔진에 화면 아래 자막 30줄을 더한다 |
| 소리 | 120 BPM, A 단조 음악과 효과음 27종을 numpy로 합성한다 | 쇼릴의 합성기를 고쳐 장면마다 악기 편성을 `timeline.json`에서 읽는다 |
| 성격 | 다섯 단계를 빠르게 훑는다 | 단계 안에서 일이 넘어가는 순서를 따라간다 |
| 작업 폴더 | `_workspace/showreel/` | `_workspace/process/` |

쇼릴의 모든 장면은 시간만 받아 그리는 순수 함수로 작성되었다. 따라서 어느 프레임이든 똑같이 다시 그릴 수 있고, 엔딩 몽타주는 앞 장면을 그대로 다시 불러 쓴다. 화면과 소리는 같은 큐 시트 `timeline.json`을 읽기 때문에 한 박자 안에서 맞물린다.

제작 과정 영상은 쇼릴에서 생략한 장면을 추가로 보여 준다.

- 리더가 실행 설정(`run_meta.json`)을 정하는 준비 단계
- 사람에게 묻는 두 번의 확인(컨셉 승인, 크레딧 승인)
- 공유 작업 목록과 기획 동결, 승격
- 매니페스트 검사 스크립트
- 에셋 QA의 재작업
- 엔지니어와 QA의 계획 문서
- 결과 폴더와 후속 요청

재렌더링 절차는 두 영상이 같다. 작업 폴더에서 `build_timeline.py`로 큐 시트를 만들고, `audio/synth.py`로 사운드트랙을 합성한 뒤, `render.py`로 영상을 렌더링한다. 제작 과정 영상은 `render.py`에 브라우저 10개로 나눠 렌더링하는 인자를 준다. 장면 길이를 바꾸고 다시 실행하면 음악과 효과음이 새 시간표를 따라간다. 재렌더링에는 Playwright(Python)와 Chrome이 필요하다.

## 저장소 구조

| 경로 | 내용 |
|---|---|
| `.claude/agents/` | 에이전트 정의 15개 |
| `.claude/skills/` | 스킬 17개 (스크립트와 참조 문서 포함) |
| `CLAUDE.md` | harness 호출 조건과 변경 이력 |
| `docs/media/` | README용 GIF와 이미지 |
| `VARCO-API-Reference-Manual-ko.pdf` | 레퍼런스 매뉴얼 |
| `VARCO-*.mp4` | 소개 영상, 쇼릴, 제작 과정 영상 (각각 포스터 이미지 포함) |
| `_workspace/link-check/` | VARCO 문서 수집 작업 파일 |
| `_workspace/book/` | 레퍼런스 매뉴얼 제작 파일 |
| `_workspace/animation/` | 플랫폼 소개 영상 제작 파일 |
| `_workspace/showreel/`, `_workspace/process/` | 쇼릴과 제작 과정 영상 제작 파일 |
| `_workspace/harness-build/` | harness 시험 표본과 검증 스크립트 |
| `_workspace/readme-media/` | README GIF 생성 스크립트 |

`_workspace/`에는 게임 결과물의 작업 기록뿐 아니라 저장소 자체를 만든 과정(문서 수집, 매뉴얼 제작, 영상 제작, harness 검증)의 파일도 함께 들어 있다.

## 결과

README는 정량 벤치마크를 제시하지 않는다. 대신 검증 범위를 명시한다.

| 대상 | 검증 방법 | 검증한 내용 |
|---|---|---|
| 공용 클라이언트 | 로컬 모의 서버 | 응답 저장, 3D 결과 조회, 오류 분류, 동시 호출 예산 |
| 에이전트 | 드라이런 | 실제 호출 없이 전체 흐름 |
| 전체 흐름 | 실제 VARCO 서버 | 실행하지 않음 |

harness 시험 중 "코인 러너"라는 게임을 실제로 만들었고, 그 대사와 데이터가 쇼릴과 제작 과정 영상의 소재가 되었다. 다만 코인 러너가 실제 VARCO 호출로 만든 에셋을 썼는지는 README에서 확인되지 않는다. README는 처음 실제 키로 실행할 때 결과를 함께 확인하라고 권고한다.

## 한계

README의 "알아 두실 점" 절과 권리 안내에서 밝힌 한계는 다음과 같다.

- **크레딧 단가는 추정치다.** 공식 가격표가 공개되지 않아 각 문서에 주석으로 숨겨진 가격표에서 단가를 가져왔다. 번역, Voice-to-Face, 음성 변환 Acting은 단가를 몰라 견적 합계에 들어가지 않는다. 따라서 크레딧 승인 단계의 견적은 실제 청구액과 다를 수 있다.
- **VARCO에 없는 기능이 있다.** 텍스트로 이미지를 만드는 API와 음악을 만드는 REST API가 없다. 3D 모델의 원본 이미지는 사용자가 주거나 다른 이미지 생성 도구로 만들어야 하고, 배경음악은 Unity 플러그인에서 사람이 만드는 수동 에셋으로 분류된다.
- **실제 서버 기반 end-to-end 검증이 없다.** 공용 클라이언트는 모의 서버로, 에이전트는 드라이런으로만 시험했다.
- **Unity WebGL 빌드**가 필요하면 Unity Hub에서 WebGL 빌드 모듈을 따로 설치해야 한다.
- **라이선스가 명시되지 않았다.** 매뉴얼과 `.claude/skills/varco-api/references/`, `_workspace/link-check/`의 문서 원문 저작권은 NC AI에 있다. 영상과 매뉴얼에 쓴 Pretendard 글꼴만 SIL Open Font License를 따른다고 밝힌다.
- **세션 재시작 필요.** harness 파일을 추가하거나 수정한 세션에서는 에이전트가 등록되지 않을 수 있다.

## 다른 게임 harness와의 비교

같은 wiki의 [[agents/donchitos-claude-code-game-studios]]도 Claude Code 위에 게임 개발 조직을 구성한다. 두 저장소는 목표가 겹치지만 설계 초점이 다르다.

| 항목 | Claude Code Game Studios | VARCO Game Studio |
|---|---|---|
| 에이전트 수 | 49개 (README 배지 기준) | 15개 |
| 조직 원리 | director, department lead, specialist 3계층 | 5단계 파이프라인과 단계별 실행 방식 |
| 모델 배정 | 계층별 (director는 Opus) | 업무 성격별 (구체화와 통합은 fable) |
| 사람 개입 | 모든 에이전트가 질문, 선택지, 승인의 협업 프로토콜 | 컨셉 승인과 크레딧 승인 두 번 |
| 외부 API | 특정 API에 의존하지 않음 | VARCO 생성 API로 에셋 제작 |
| 비용 통제 | 해당 없음 | 공용 클라이언트의 예산 차단, 장부, 드라이런 |
| 라이선스 | MIT | 미지정 |

Claude Code Game Studios가 사람의 결정을 모든 단계에 두어 규율을 얻는다면, VARCO Game Studio는 사람의 결정을 방향과 비용 두 지점에 모으고 나머지를 자동으로 진행한다. 대신 비용이 드는 외부 호출을 공용 클라이언트 하나로 통제해 자동 진행의 위험을 줄인다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| VARCO API 플랫폼 | NC AI가 운영하는 AI API 서비스. Sound, 3D, SyncFace, Voice, Translate 등을 `OPENAPI_KEY` 하나로 호출한다 |
| 공용 클라이언트 (`varco_client.py`) | 모든 VARCO 호출이 거치는 스크립트. 파라미터 검사, 예산 차단, 장부 기록, 드라이런을 담당한다 |
| 호출 장부 (`varco_ledger.jsonl`) | 드라이런을 포함한 모든 호출을 한 줄씩 기록하는 JSONL 파일 |
| 에셋 매니페스트 | 만들 에셋 목록, 호출 순서, 크레딧 견적을 담은 명세. 승인 후 `manifest.json`이 된다 |
| 산출물 계약서 (`contracts.md`) | 에이전트끼리 주고받는 파일의 위치와 형식을 정한 단일 문서 |
| Go / No-Go | 출시 준비 단계에서 게임 디렉터가 기준 여섯 가지로 내리는 출시 판정 |

## 관련 페이지

- [[agents/donchitos-claude-code-game-studios]]: Claude Code에 게임 스튜디오 조직을 입히는 범용 템플릿. 3계층 조직과 협업 프로토콜 중심이라 비교 대상이 된다
- [[overviews/agent-harness-engineering-overview]]: harness 설계 일반론
- [[overviews/agent-skills-overview]]: 스킬 패키지 형식과 에이전트 결합 방식
- [[agents/9bow-2026-gstack-claude-code-virtual-team]]: Claude Code 위에 역할별 가상 팀을 구성하는 다른 사례
