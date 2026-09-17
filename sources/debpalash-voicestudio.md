---
title: "VoiceStudio: the open-source, fully-local ElevenLabs alternative"
type: repo
year: 2026
category: applications
raw_path: raw/repos/debpalash-voicestudio.md
raw_filename: "debpalash-voicestudio.md"
source_collection: external
org: "debpalash"
repo: "VoiceStudio"
url: "https://github.com/debpalash/VoiceStudio"
license: "AGPL-3.0"
tags: [text-to-speech, speech-to-text, voice-cloning, voice-design, dubbing, dictation, local-first, mcp, openai-compatible-api, tauri, fastapi, remote-workers, audio-watermark, elevenlabs-alternative]
figures:
  - id: fig01
    label: Model Catalogue screenshot
    kind: figure
    file: assets/debpalash-voicestudio/fig01.png
    raw: https://raw.githubusercontent.com/debpalash/VoiceStudio/main/docs/media/0.5.0/catalogue.png
    caption: "Model Catalogue의 엔진 호환 매트릭스. TTS 엔진 16종마다 상태(available, unavailable), GPU 호환(CUDA, MPS, CPU), 격리 방식(in-process, subprocess), 설치와 재점검 동작을 한 화면에 보여준다"
    strategy: manual
    curated: true
  - id: fig02
    label: Gallery screenshot
    kind: figure
    file: assets/debpalash-voicestudio/fig02.png
    raw: https://raw.githubusercontent.com/debpalash/VoiceStudio/main/docs/media/0.5.0/gallery-save.png
    caption: "Voice Gallery의 archetype 카드. 성별, 연령, 음높이, 영어 accent 속성으로 설계된 voice를 미리 듣고 로컬 profile로 저장한다"
    strategy: manual
    curated: true
  - id: fig03
    label: Dubbing workspace screenshot
    kind: figure
    file: assets/debpalash-voicestudio/fig03.png
    raw: https://raw.githubusercontent.com/debpalash/VoiceStudio/main/docs/screenshot-dub.png
    caption: "Dubbing 워크스페이스. 상단에 Upload, Prepare, Transcribe, Edit, Generate, Export 6단계가 있고, 왼쪽에 영상과 waveform, 번역 engine과 quality 선택, 오른쪽에 segment별 원문과 번역문, 화자, voice 열이 있다 (OmniVoice-Studio 시절 v0.3.9 화면)"
    strategy: manual
    curated: true
  - id: fig04
    label: Quick-switch GIF
    kind: figure
    file: assets/debpalash-voicestudio/fig04.gif
    raw: https://raw.githubusercontent.com/debpalash/VoiceStudio/main/docs/media/0.5.0/quick-switch.gif
    caption: "상태바에서 TTS 엔진을 전환하는 애니메이션 (2.3MB)"
    strategy: manual
    curated: false
  - id: fig05
    label: Star History Chart
    kind: figure
    file: assets/debpalash-voicestudio/fig05.svg
    raw: https://api.star-history.com/svg?repos=debpalash/VoiceStudio&type=Date
    caption: "2026년 5월부터 9월까지 star 2만 5천 개를 넘어선 성장 곡선"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

VoiceStudio는 zero-shot voice cloning, voice design, 영상 dubbing, 받아쓰기(dictation), 오디오북 제작을 계정이나 API 키 없이 사용자 기기에서 실행하는 AGPL-3.0 데스크톱 앱이자 로컬 speech 서비스다. TTS 엔진 16종과 ASR 엔진 11종을 registry로 묶고, OpenAI 호환 audio API, 버전이 붙은 WebSocket, Rust control sidecar, MCP 서버를 같은 backend에서 노출해 에이전트와 편집기가 사용자의 voice를 그대로 쓰게 한다.

## 1. 자료 정보 (Document Information)

- URL: https://github.com/debpalash/VoiceStudio
- 조직과 저장소: debpalash / VoiceStudio. 이전 이름은 OmniVoice-Studio이며 Docker 이미지 이름(`palashdeb/omnivoice-studio`, `ghcr.io/debpalash/omnivoice-studio`)과 환경 변수 접두어(`OMNIVOICE_*`), 데이터 폴더(`omnivoice_data/`)에 옛 이름이 남아 있다
- 라이선스: 애플리케이션은 AGPL-3.0-only. 번들된 `omnivoice/` Python 패키지(TTS 모델, Han Zhu 작성)는 상류의 Apache-2.0 그대로이고, 기본 모델 `k2-fsa/OmniVoice`의 pre-training 가중치는 CC-BY-NC, 그 audio tokenizer는 Boson Higgs Audio 2와 Meta Llama community 조건이 따로 붙는다. 저장소는 앱 라이선스가 모델과 tokenizer 조건을 대체하지 않는다고 세 곳(README 엔진 표 각주, FAQ, LICENSE-NOTICE)에서 반복한다. 독점 임베딩용 상용 라이선스는 VoiceStudio 소유 코드에만 제공한다
- 주 언어: Python. frontend는 React 19와 Vite, 데스크톱 shell은 Tauri v2(Rust), 패키지 관리는 Bun과 uv
- 저장소 생성 2026-04-09, 최종 push 2026-09-11, star 26,641, fork 3,286, 최신 릴리스 v0.5.2 (2026-09-10). 홈페이지 voicestudio.sh, 커뮤니티 Discord (수집 시점 GitHub API 기준)
- GitHub topics: ai, audiobook, cuda, dubbing, elevenlabs-alternative, huggingface, local-first, mlx, speech-to-text, tauri, text-to-speech, transcription, translate, tts, voice-ai, voice-cloning, voice-generation, workflow
- README 머리에 두 가지 경고가 있다. "Electron 재작성이 진행 중이니 데스크톱 앱 관련 issue와 PR을 만들지 말라"는 공지와, "active beta라서 안정 작업에는 최신 릴리스를 쓰고 `main`은 릴리스 사이에 바뀔 수 있다"는 경고다
- 저장소 문서는 README(영어, 중국어 간체) 외에 `docs/` 아래 120편 가까운 Markdown이 있다. 엔진별 가이드 28편, 설치 가이드 6편, ADR 5편, 기능 스펙과 계획 문서 30편 이상(longform 스펙 14편은 각 7만 자에서 12만 자), 경쟁 분석 11만 자, 로드맵 7만 5천 자가 포함된다
- 자료의 성격: README 전문과 `docs/` 중 아키텍처, 엔진, 프로토콜, 보안, 성능, 학습에 관한 29편, 그리고 루트의 `AGENTS.md`와 `LICENSE-NOTICE.md`를 원문으로 보관한 스텁이다. 소스 코드 클론이 아니므로 router 39개나 service 78개의 실제 구현은 확인할 수 없고, 문서가 인용하는 경로(`backend/services/tts_backend.py`, `backend/api/routers/tts_stream.py`, `omnivoice/models/omnivoice.py` 등)만 알 수 있다

## 2. 주요 기여 (Key Contributions)

1. **계정과 사용량 계량이 없는 local-first voice studio.** local-first는 데이터 원본을 사용자 디스크에 두고 서버 없이 실행되는 설계다. VoiceStudio는 voice cloning, voice design, 영상 dubbing, 받아쓰기, 이야기와 오디오북, batch 생성 6종 워크플로를 한 앱에 담고, voice와 프로젝트와 설정과 출력물을 기본값으로 기기 안에만 둔다. README의 비교표는 hosted 서비스 대비 차이를 "관리형 클라우드 컴퓨트를 로컬 제어와 맞바꾼다"로 요약한다.

2. **capability별로 기술된 엔진 registry.** TTS 엔진 16종과 ASR 엔진 11종을 언어 수, cloning 가능 여부, instruct 지원, 플랫폼별 컴퓨트 경로, 라이선스로 표기한 표를 두고, Model Catalogue나 <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>E</kbd>로 전환한다. cloning이 안 되는 엔진으로 dubbing이나 voice 고정 batch를 시키면 조용히 엔진을 바꾸지 않고 작업을 거부한다.

3. **엔진 채택 기준 "job map".** `docs/engine-acceptance.md`는 새 엔진을 "목록에 추가"가 아니라 "직무에 채용"한다고 규정한다. 직무 하나에 보유자는 하나이고, 제안은 현 보유자에게서 직무를 가져오거나(수치 필요) 아무도 맡지 않은 직무를 주장해야 한다. 7개 조건(직무, 상업 사용 가능한 라이선스, 전 플랫폼 또는 명시적 opt-in, 기존 adapter 적합, 같은 PR의 CI smoke test, 12개월 steward, 수요 증거)을 전부 만족해야 하고, steward도 통과하는 smoke test도 없는 상태가 두 릴리스 연속이면 archive한다.

4. **하나의 backend에서 나오는 로컬 speech platform.** 포트 3900의 FastAPI backend가 OpenAI 호환 `/v1/audio/*` HTTP, `voicestudio.speech.v1` WebSocket, MCP Streamable HTTP를 내고, 포트 3902의 Rust control sidecar가 마이크 활성화, 대상 창 포착, 클립보드 보존, native 삽입을 맡는다. 편집기, TUI, 에이전트가 모델 로딩과 데스크톱 권한과 삽입 안전성을 각자 다시 만들지 않게 한다는 것이 설계 취지다.

5. **소비와 관리를 나눈 2단 네트워크 경계.** loopback은 절대 gate하지 않고, 다른 기기에서 오는 요청은 share PIN(6자리, 세션마다 재생성, 디스크 미기록), API key(`OMNIVOICE_API_KEY`), trusted networks(CIDR 목록) 세 gate로 막는다. PIN과 trusted network는 소비(TTS, dictation, voices) 자격이고, `/system/*`와 `/api/settings/*` 같은 관리 표면은 loopback이나 API key로만 닿는다. 이 분리는 실제 권한 상승(#1213)을 고친 결과다.

6. **두 가지 모양의 원격 컴퓨트.** remote backend는 앱 전체(프로젝트, voice, 이력)를 GPU 머신으로 옮기고 데스크톱을 thin client로 쓴다. remote workers는 모든 것을 이 머신에 두고 개별 task만 다른 GPU에 보낸다. worker는 outbound로 control plane에 dial하는 것이 기본이고, 한 GPU 머신을 여러 사람이 쓰기 위한 inbound node mode가 ADR로 추가됐다.

7. **책임 있는 사용을 위한 기본값.** AudioSeal watermark를 기본으로 심어 합성 음성을 식별하게 하고, 모든 합성 오디오는 `mark_synthetic` chokepoint를 지나야 한다. voice profile에 "verified own voice" consent 잠금을 두어 에이전트가 사용자 voice로 말하는 기능을 gate하고, `.ovsvoice` persona 포맷은 consent 증명과 SPDX 라이선스 태그와 watermark된 preview를 함께 싣는다.

8. **운영 규율을 결정론적 테스트로 옮긴 개발 계약.** `AGENTS.md`는 cross-platform parity(사용자가 보고 쓸 수 있는 동작은 세 OS에서 같아야 하고, 성능 최적화의 유무는 parity 위반이 아니다), 리뷰 없는 merge 금지, 새 필수 네트워크 호출 금지, 21개 locale 전부에 번역 문자열 존재, 같은 PR에서 문서 동기화를 요구한다. CHANGELOG 형식, locale parity, 버전 lockstep, CJK 하드코딩 금지는 에이전트 판단이 아니라 테스트가 검사한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 4계층 아키텍처

README의 아키텍처 도식은 네 계층이다. Tauri v2 데스크톱 shell(Rust)이 IPC로 React + Vite UI를 감싸고, UI는 `localhost:3900`의 FastAPI backend에 HTTP, SSE, WebSocket으로 말한다. backend 아래에 TTS와 ASR 엔진 registry, dubbing과 audio와 long-form 파이프라인, OpenAI 호환 API와 MCP 서버, SQLite + Alembic이 있고 상태는 `omnivoice_data/`에 쌓인다.

| 계층 | 경로 | 책임 |
|---|---|---|
| Desktop shell | `frontend/src-tauri/` | 창 수명, tray, 단축키, updater, sidecar bootstrap |
| Frontend | `frontend/src/` | React UI, Zustand 상태, API와 이벤트 클라이언트, i18n |
| API | `backend/api/` | REST 라우트, 스키마, 인증 경계, 스트리밍 |
| Core services | `backend/services/` | 생성, dubbing, 오디오 처리, 영속화 |
| Engines | `backend/engines/` | 격리된 옵션 엔진 adapter |
| Worker system | `backend/worker/` | 인증된 원격 컴퓨트와 job 전송 |
| Data | `omnivoice_data/` | 프로젝트, voice, 설정, 로그, SQLite 상태 |
| Delivery | `scripts/`, `deploy/`, `.github/workflows/` | 개발, 패키징, 컨테이너, 릴리스, CI |

### 3.2 저장소 구조

`docs/STRUCTURE.md`는 "모든 폴더는 하나의 일만 하고, 루트의 모든 파일은 자리를 증명해야 한다"를 원칙으로 세운다.

| 디렉토리 | 내용 |
|---|---|
| `backend/main.py` | 유일한 진입점. boot 순서가 동작에 영향을 주므로 주석을 읽기 전에 재배열하지 말라고 적었다 |
| `backend/api/routers/` | 39개 router, 자동 포함. `setup/`에 first-run wizard와 모델 다운로드 |
| `backend/core/` | config, db, job queue, event bus, auth/CSRF, path 보안, opt-in analytics, 버전, 진단 |
| `backend/services/` | 78개 모듈. TTS, dubbing 파이프라인, audio DSP, GPU gateway, 엔진 routing, 모델 수명 |
| `backend/engines/` | 엔진별 adapter. indextts, supertonic3, confucius4, dots_tts, moss_tts_v15, pockettts, audiocpp, omnivoice_gguf, omnivoice_subprocess, _asr_sidecar, _echo, voxcpm2_subprocess, moss_tts_nano_subprocess, cosyvoice_subprocess |
| `backend/worker/` | 원격 분산 worker. scheduler, pool, routing, breaker, capacity, `protocol/`, `inbound/` |
| `backend/mcp_shim/`, `backend/speech_client/` | MCP stdio 진입점, speech sidecar 클라이언트 |
| `backend/migrations/versions/` | Alembic revision. 모든 스키마 변경이 여기를 지난다 |
| `backend/plugins/`, `backend/config/models.yaml` | 플러그인 drop-in 지점, 모델 카탈로그 |
| `frontend/src/` | `pages/`(상위 뷰마다 파일 하나), `components/`, `api/`(router 그룹별 typed client), `store/`(Zustand slice와 영속 상태 migration), `i18n/locales/`(사용자 문자열의 유일한 집) |
| `frontend/src-tauri/` | Rust shell. backend spawn과 bootstrap, updater 채널, 받아쓰기 단축키, crash/reset/uninstall |
| `omnivoice/` | 기반 TTS 모델 패키지. `models/`, `cli/`(omnivoice-infer 등), `data/`, `eval/`, `training/` |
| `tests/`, `backend/tests/`, `frontend/src/**/*.test.*` | 세 곳의 테스트 집. CI의 한 `test` job이 세 단계로 전부 실행한다 |
| `bin/` | 플랫폼별 prebuilt `omnivoice-tts` sidecar. 소스 체크아웃에는 0바이트 placeholder만 있다 |
| `skills/`, `.agents/skills/` | 이 저장소가 발행하는 스킬(omnivoice, oss-maintainer), `skills-lock.json`으로 고정한 canonical 스킬 사본(vite, fastapi-python) |
| `deploy/` | Dockerfile(CUDA 기본, ROCm은 BASE_IMAGE와 GPU_FLAVOR override로 같은 파일에서 빌드), docker-compose.yml, torch-constraints.txt |
| `omnivoice-gallery/` | 공개 voice gallery git submodule |

테스트 세 집이 분리된 이유도 문서에 있다. `tests/`의 `conftest.py`는 `OMNIVOICE_DATA_DIR`를 일회용 디렉토리로 돌려 실행이 개발자의 실제 앱 상태를 건드리지 못하게 한다(#878). `backend/tests/`는 `backend/`의 bare import에 대한 격리 세션이고, 모듈 수준 `sys.modules` stub은 수집 시점에 프로세스 전체로 새어 나가므로 다시 넣지 말라고 적었다. CI는 `HF_HUB_OFFLINE=1`과 빈 `HF_HUB_CACHE`로 실행해 채워진 개발 캐시가 실제 실패를 가리지 않게 한다.

### 3.3 워크플로 6종과 기능 표

README의 Features 표를 옮기면 다음과 같다.

| 영역 | 포함 내용 |
|---|---|
| Voice Cloning | 짧은 reference clip에서 zero-shot 합성 |
| Voice Design | 연령, accent, 음높이, 스타일, 전달 방식 지시로 voice 생성 |
| Video Dubbing | 전사, 번역, 화자 보존, 합성, 영상 export. 번역 설정에 track 선택이 있고 완료된 dub는 timing 문제를 검토용으로 표시한다 |
| Stories and audiobooks | multi-voice 스크립트, EPUB/PDF import, 챕터 렌더링, `.m4b` export |
| Dictation Widget | 시스템 전역 단축키, 실시간 전사, 옵션으로 local LLM 정리 |
| Vocal Isolation | Demucs로 음성과 배경 분리 |
| Speaker Diarization | Pyannote와 WhisperX 화자 배정 |
| Batch Queue | 대량 audio와 video job을 job별 진행률과 함께 queue에 넣거나, 로컬 폴더를 감시해 새 영상을 처리 |
| Model Catalogue | TTS, ASR, LLM 모델 설치, 제거, 선택, routing |
| Remote Model Downloads | 등록된 원격 worker에 모델을 설치하고 진행률을 실시간 표시 |
| GPU Auto-Detect | CUDA, MPS, ROCm, CPU routing과 엔진별 점검 |
| AI Watermark | AudioSeal 삽입과 검출 |
| MCP Server | MCP 클라이언트용 합성과 전사 도구 |
| Diagnostics | self-check, 오류 journal, 로그, 개인정보를 지운 support bundle |
| Local-first | 핵심 제작은 로컬, 네트워크 기능은 명시적 opt-in |
| Extensible | registry 기반 TTS, ASR, 플러그인 인터페이스 |

Voice 워크스페이스는 From audio(cloning), By design(voice 생성), Convert(speech-to-speech 변환) 세 탭으로 시작한다. Launchpad는 최근 파일과 저장된 voice를 나란히 배치하고, casting board는 voice 카드를 화자에 드래그하거나 메뉴에서 고르게 한다.

### 3.4 TTS 엔진 16종

| 엔진 | 언어 | Clone | Instruct | Linux | macOS ARM | Windows | 라이선스 |
|---|---|---|---|---|---|---|---|
| VoiceStudio 기본 (k2-fsa/OmniVoice) | 600+ | Yes | Yes | CUDA/CPU | MPS | CUDA/CPU | 앱 AGPL-3.0, 코드 Apache-2.0, 가중치 CC-BY-NC |
| CosyVoice 3 | 9 + 방언 18 | Yes | Yes | CUDA/CPU | CPU | CUDA/CPU | Apache-2.0 |
| GPT-SoVITS | 5 | Yes | No | CUDA/CPU | No | CUDA/CPU | MIT |
| VoxCPM2 | 30 | Yes | Yes | CUDA/CPU | MPS | CUDA/CPU | Apache-2.0 |
| MOSS-TTS-Nano | 20 | Yes | No | CUDA/CPU | CPU | CUDA/CPU | Apache-2.0 |
| KittenTTS | 영어 | No | No | CPU | CPU | CPU | MIT |
| MLX-Audio | 모델 의존 | 다름 | 다름 | No | MLX | No | 다름 |
| Sherpa-ONNX | 20+ | No | No | CUDA/CPU | CPU | CUDA/CPU | Apache-2.0 |
| IndexTTS 2.5 (on-demand) | ZH, EN, JA, ES, AR | Yes | No | CUDA/CPU | CPU | CUDA/CPU | Bilibili 모델 라이선스 |
| OmniVoice GGUF (on-demand) | 600+ | Yes | Yes | CUDA/CPU | MPS/CPU | CUDA/CPU | 앱 AGPL-3.0, 파생 모델 조건 확인 |
| OmniVoice subprocess (on-demand) | 600+ | Yes | Yes | CUDA/CPU | MPS(기본 OmniVoice 경유) | CUDA/CPU | 기본 엔진과 동일 |
| PocketTTS (on-demand) | EN, FR, DE, PT, IT, ES | Yes | No | CPU | CPU | CPU | CC-BY-4.0, gated |
| Supertonic 3 (on-demand) | 31 | No | No | CPU | CPU | CPU | OpenRAIL-M |
| MOSS-TTS-v1.5 (on-demand) | 31 | Yes | No | CUDA/CPU | CPU | CUDA/CPU | Apache-2.0 |
| dots.tts (on-demand) | 24 | Yes | No | CUDA/CPU | CPU | No | Apache-2.0 |
| Confucius4-TTS (on-demand) | 14 | Yes | No | CUDA/CPU | CPU | CUDA/CPU | Apache-2.0 |

on-demand 엔진은 필요 시 설치 또는 등록된다. IndexTTS 2.5는 월간 활성 사용자 1억 명 또는 연 매출 10억 위안을 넘으면 Bilibili의 별도 서면 라이선스가 필요하고, PocketTTS는 첫 사용 전에 gated access와 CC-BY-4.0 조건을 표시한다. `docs/engines/README.md`의 표에는 README 표에 없는 audio.cpp(Breeze-TTS-2, research/non-commercial 가중치, CPU + Vulkan/Metal/CUDA/HIP/ROCm)도 있다.

### 3.5 ASR 엔진 11종

| 엔진 | ID | 언어 | 적합 용도 |
|---|---|---|---|
| WhisperX (기본) | `whisperx` | ~100 | dubbing, 자막, 단어 단위 timing |
| Faster-Whisper | `faster-whisper` | ~100 | 일반 cross-platform 전사 |
| Faster-Whisper (isolated) | `faster-whisper-isolated` | ~100 | crash 격리 batch 전사 |
| MLX Whisper | `mlx-whisper` | ~100 | Apple Silicon |
| PyTorch Whisper | `pytorch-whisper` | ~100 | CUDA, MPS, CPU fallback. ROCm 호스트 |
| Parakeet TDT | `nemo-parakeet` | 영어 + 유럽 25 | 빠른 CPU/CUDA 전사. 앱 venv가 아닌 별도 venv |
| Parakeet TDT v3 (MLX) | `parakeet-mlx` | 유럽 25 | Apple Silicon 받아쓰기와 단어 timestamp |
| Moonshine | `moonshine` | 영어 | 저전력 저지연 ONNX, timestamp 없음 |
| FunASR | `funasr` | 50+ | VAD와 inline diarization(`cam++`) |
| sherpa-onnx | `sherpa-onnx-asr` | 모델 의존 | 스트리밍 CPU 받아쓰기 |
| OpenAI 호환 서버 | `openai-compat-asr` | 서버 의존 | 로컬 gigastt/Qwen3-ASR 또는 원격 endpoint. 오디오는 그 서버로만 간다 |

WhisperX와 Faster-Whisper는 효율적인 `float16`이 없으면 `int8`로 재시도한다. diarization은 별도 registry가 아니라 dub 파이프라인이 pyannote를 쓰는 형태다.

### 3.6 하드웨어별 권장 스택

| 하드웨어 | 권장 TTS | 권장 ASR | 이유 |
|---|---|---|---|
| Apple Silicon (M1~M4) | MLX-Audio, OmniVoice (MPS) | MLX Whisper, Parakeet MLX | 통합 메모리, macOS 최저 지연 |
| NVIDIA GPU (VRAM 8GB+) | OmniVoice, CosyVoice 3 | WhisperX | 고품질 zero-shot cloning, 단어 timestamp, diarization |
| 저VRAM 또는 CPU 전용 | PocketTTS, Sherpa-ONNX, KittenTTS | Moonshine, Faster-Whisper (`int8`) | 낮은 메모리, CPU 추론 최적화 |

요구 사양은 최소 RAM 8GB, 디스크 10GB, GPU 옵션(VRAM 4GB), 권장 RAM 16GB+, SSD 20GB+, VRAM 8GB+다. ROCm은 Linux 전용 opt-in이고 Windows의 AMD와 Ryzen AI는 CPU로 실행된다. Intel Mac은 현재 PyTorch wheel이 없어 로컬 backend를 실행할 수 없고 remote backend에만 연결할 수 있다. Docker 이미지는 `linux/amd64` 전용이다.

### 3.7 기본 엔진 OmniVoice의 동작

OmniVoice(k2-fsa)는 600개 이상 언어의 zero-shot voice cloning을 하고 24kHz mono를 출력한다. zero-shot cloning은 reference clip을 학습 데이터가 아니라 프롬프트로 쓰는 방식이며, 그래서 클립을 길게 준다고 clone이 늘 좋아지지는 않는다.

- 컴퓨트: CUDA, ROCm(Linux), MPS, CPU 자동 감지. CUDA와 ROCm에서는 fp16과 `torch.compile`로 실행한다
- VRAM floor 6GB. 측정된 floor를 가진 유일한 엔진이다. 4GB 카드(GTX 1650 Ti, Quadro P2000, #1226과 #1222)에서는 드라이버가 시스템 RAM으로 paging해 몇 초짜리 렌더가 몇 분을 끌다 compute budget에 걸려 종료된다. UI가 기다리기 전에 경고하되 짧은 입력은 들어갈 수 있으므로 hard-block하지 않는다. floor 아래의 CUDA/ROCm 카드는 CPU급 하드웨어로 budget을 잡아 600초를 준다(#1804). Apple Silicon은 통합 메모리라 비교할 전용 pool이 없어 제외한다
- reference clip은 3~10초가 적정이다. transcript가 있으면 conditioning이 좋아지며, profile에 transcript가 없으면 첫 사용 시 자동 전사해 profile에 저장한다. transcript를 준 clip은 정렬을 위해 20초로 제한하고, transcript가 없으면 최대 75초를 5회의 연속 전사 pass로 탐색해 발화가 검출된 구간을 고른다
- 인코딩된 voice reference는 앱 데이터 디렉토리의 `prompt_cache/`에 디스크 영속화된다(voice당 약 10KB, 최신 32개 유지). 재시작 후 첫 생성이 재인코딩과 전사를 건너뛴다. `OMNIVOICE_PROMPT_DISK_CACHE=0`이면 메모리에만 둔다
- `instruct` 스타일 속성과 reference clip은 결합할 수 있다. 둘이 일치하면 instruct가 그 속성의 cloning을 안정시키고(상류 문서는 방언 reference + 같은 방언 instruct를 canonical 사례로 든다), 충돌하면 reference audio가 이긴다
- 발음 제어: 중국어는 성조 번호가 붙은 병음(`打ZHE2出售`), 영어는 대괄호 CMU 음소(`[B EY1 S]`)
- CUDA 옵션 가속: `OMNIVOICE_FLASHINFER=1`(또는 `graph`로 CUDA graph 캡처)은 `flashinfer-python` 설치 후 packed CFG attention, fused RMSNorm/RoPE/GEMM으로 상류 벤치마크 기준 약 2배를 낸다. 그 세션에서 `torch.compile`을 대체하고 추론을 단일 GPU thread에 고정하며 fused 가중치 사본을 상주시켜(LLM 가중치의 약 절반만큼 VRAM 추가) 좁은 VRAM에서는 끄라고 안내한다. 패키지가 없거나 kernel이 실패하면 표준 경로로 fallback한다
- 가중치는 첫 사용 시 lazy load(약 8초)하고 dubbing과 받아쓰기가 같은 모델을 공유해 이중 로드하지 않는다. 출력에는 highpass와 compressor로 이루어진 공용 mastering chain이 자동 적용된다

**OmniVoice GGUF**는 같은 모델을 번들 native 바이너리(`bin/omnivoice-tts-<platform>`)와 양자화된 GGUF 가중치로 실행한다. 양자화는 가중치를 낮은 비트 수로 줄여 모델을 압축하는 기법이다. 하드웨어 probe가 quant를 고른다.

| 하드웨어 | Quant | 대략 VRAM |
|---|---|---|
| VRAM 12GB+ | BF16 | 약 1.6GB (품질 우선) |
| VRAM 4~12GB | Q8_0 | 약 945MB (권장 균형) |
| VRAM 1~4GB | Q4_K_M | 약 659MB (최소 footprint) |
| CPU 전용 | Q4_K_M | RAM 한도, 지연 허용 |

F32 참조 quant(약 3.2GB)는 override 전용이다. 가중치는 `Serveurperso/OmniVoice-GGUF` HuggingFace repo의 고정 revision에서 받는다. 생성마다 바이너리를 새로 spawn하므로 crash나 leak이 앱을 죽이지 않고, 준비 전 SHA-256 manifest 검증, macOS Gatekeeper quarantine 감지(`xattr -cr` 안내), 실행 비트 복원(#437)을 한다. voice design은 지원하지 않는다. Linux ARM64(Asahi)에서는 `glslc`와 SPIRV 헤더가 있으면 GGML Vulkan backend를 우선해 Honeykrisp 드라이버로 Apple GPU를 쓰며 macOS Metal보다 약 2~4배 느리다.

**OmniVoice subprocess**는 기본 모델의 crash 격리를 맡고 timeout 시 kill 가능하다. timeout된 subprocess는 kill 후 종료를 유한 시간 기다리고, 종료를 확인하지 못하면 두 번째 엔진을 나란히 띄우는 대신 reap될 때까지 재시도를 막는다.

### 3.8 엔진 채택 기준 job map

| 직무 | 보유 엔진 |
|---|---|
| 최고 zero-shot clone 품질 | `omnivoice` |
| 최대 언어 범위 | `omnivoice` |
| 기본 모델의 crash 격리 | `omnivoice-subprocess` |
| 가장 빠른 CPU 렌더와 최저 지연 | 공석 (#1306) |
| 최고 중국어와 일본어 표현력 | `cosyvoice`, `indextts2` |
| CPU 실시간 영어, 최소 footprint | `kittentts`, `supertonic3` |
| reference 없는 이중 언어 voice design과 연출 | `audiocpp` |
| 최고 전사 정확도 | `whisperx`, `faster-whisper` |
| 가장 빠른 Apple Silicon 전사 | `parakeet-mlx`, `mlx-whisper` |
| 전사의 crash 격리 | `faster-whisper-isolated` |

"벤치마크가 좋다"는 직무가 아니다. 라이선스 조건의 유일한 승인 예외는 `audiocpp`의 Breeze-TTS-2 research/non-commercial 가중치이며 2026-09-08 소유자가 승인했고 선택과 다운로드 전에 제한을 고지한다. adapter는 `TTSBackend` 또는 `SubprocessBackend`이며 의존성이 충돌하면 sidecar가 정답이다. 기준을 넘지 못한 엔진은 adapter 인터페이스가 공개이므로 tree 밖에서 id로 선택될 수 있다.

### 3.9 sidecar venv와 디스크

IndexTTS2는 `transformers<5`를 고정하고 VoiceStudio는 `transformers>=5.3`을 요구하므로 한 환경에 공존할 수 없다. 그래서 IndexTTS2, MOSS-TTS-v1.5, dots.tts처럼 부모의 `torch`/`transformers` 고정과 충돌하는 엔진은 첫 사용 시 `uv venv`와 `uv pip install`로 전용 venv를 만든다. 비용은 무거운 ML 스택의 두 번째 사본이며 대부분 torch와 번들 CUDA 라이브러리다.

| 플랫폼 | torch CUDA wheel | 번들 CUDA 라이브러리 |
|---|---|---|
| Linux (cu128) | 약 0.83GiB | `nvidia-*` 패키지 수 GiB 추가 |
| Windows (cu128) | 약 3.2GiB (DLL이 wheel에 포함) | 없음 |

uv는 전역 wheel cache에서 venv로 link해 설치하므로(macOS와 Linux는 reflink `clone`, Windows는 `hardlink`) 같은 wheel은 바이트를 공유한다. 조건은 cache와 venv가 같은 파일시스템에 있어야 한다는 것이고, 앱은 다른 볼륨에 설치되면 `UV_CACHE_DIR`를 venv 옆으로 자동 지정한다. dedup은 동일 wheel 단위라 `torch==2.6.0+cu124`와 `torch==2.8.0+cu128`은 공유가 0이다. dots.tts는 부모와 같은 `torch==2.8.0`을 고정해 거의 전부 공유하고, MOSS-TTS-v1.5는 `torch==2.9.1+cu128`을 고정해 CUDA 호스트에서 수 GB의 torch 사본을 추가로 낸다. Model Catalogue는 설치 전에 모델 가중치 다운로드, 패키지 다운로드, 고유 설치 바이트, 공유 가능 바이트, 임시 여유 공간, 대상 볼륨, 추정 신뢰도를 구조화해 보여준다.

### 3.10 표현 제어와 생성 파라미터

`docs/expressive-speech.md`는 어느 태그가 어느 엔진에서 실제로 동작하는지를 표로 정리한다.

| 원하는 것 | 방법 | 동작 엔진 |
|---|---|---|
| 쉼 | 텍스트에 `[pause]`, `[pause 500ms]`, `[pause 1.5s]` | 모든 엔진 (기본 350ms, 최대 10초, 실제 무음을 이어 붙인다) |
| 웃음이나 한숨 | Insert 버튼으로 `[laughter]`, `[sigh]` | 기본 엔진 |
| 요청 시점의 들숨 | 텍스트에 `[breath]` | CosyVoice 3 전용 |
| 속삭임 | 스타일 필드 `whisper` | 기본 엔진 |
| 감정 ("excited", "sad", 강도 조절) | IndexTTS2 emotion 제어 또는 CosyVoice 3 instruct | opt-in 엔진 전용 |
| 같은 take 재현 | seed 고정 또는 profile 잠금 | 기본 엔진 |

텍스트 박스의 내용은 엔진에 그대로 도달한다. 정규화 pass는 `[…]` 구간을 건너뛰고 long-text chunker는 대괄호 태그 안을 자르지 않는다. 반대로 인식되지 않는 태그도 제거되지 않으므로 ElevenLabs 스크립트의 `[excited]`나 `[whispers]`를 붙여 넣으면 모든 엔진에서 출력이 나빠진다.

기본 엔진은 13개 non-verbal 태그를 native로 토큰화한다(`[laughter]`, `[sigh]`, `[confirmation-en]`, `[question-en]`, `[question-ah]`, `[question-oh]`, `[question-ei]`, `[question-yi]`, `[surprise-ah]`, `[surprise-oh]`, `[surprise-wa]`, `[surprise-yo]`, `[dissatisfaction-hnn]`). 널리 쓸 만한 것은 `[laughter]`와 `[sigh]`이고 나머지 감탄사 변형은 Mandarin 억양에 맞춰져 있다. 강도 제어와 `[breath]` 태그는 없다. Audiobook과 Stories는 추가로 SSML-lite(`[slow]…[/slow]`, `[fast]…[/fast]`, `[emphasis]…[/emphasis]`, `[spell]`)와 multi-voice용 `[voice:NAME]`을 파싱한다. 발음 override는 `[[Nuh-VAD-uh]]` inline 표기나 발음 사전으로 한다.

CosyVoice 3는 `[breath]`, `[laughter]`, `<strong>word</strong>`와 자연어 instruct("speak with a Sichuan accent")를 받고 backend가 `<|endofprompt|>` 종결자를 붙인다. 단 Studio 스타일 필드는 기본 엔진의 어휘로 instruct를 whitelist하므로 자유 텍스트 instruct는 API(`POST /generate`의 `instruct`, `/ws/tts`)로만 가능하다. VoxCPM2는 텍스트 앞 괄호 접두어(`(speaking fast, out of breath) I can't stop now.`)가 native 규약이다. IndexTTS2는 8값 emotion 벡터(happy, angry, sad, afraid, disgusted, melancholic, surprised, calm), emotion reference clip과 혼합 강도, 자연어 emotion 서술을 받는 유일한 graded 감정 제어 엔진이며 전체 표면은 `/ws/tts`의 `emo_vector`, `emo_audio`, `emo_alpha`, `emo_text` 필드에 있다.

기본 엔진의 들숨을 유도하는 우회 레시피도 문서에 있다. reference clip에 숨소리를 넣고, 짧은 헐떡이는 조각과 `[pause]`로 쓰고, `postprocess_output`을 끄고, `class_temperature`를 0.3~0.7로 올려 여러 take를 만든 뒤, 마음에 드는 take의 seed를 고정한다. v0.3.9의 무작위 숨소리는 기능이 아니라 unpinned seed와 `position_temperature` 5.0의 샘플링 분산이 덜 정돈된 출력 chain을 통과한 결과였으며, v0.3.12의 mastering 축소(#986), 무음 후처리, v0.3.16의 VoxCPM2 가장자리 무음 trim(#1055)이 출력을 의도적으로 깨끗하게 만들었다고 설명한다.

`model.generate(...)`의 파라미터는 다음과 같다.

| 구분 | 파라미터 | 기본값 | 의미 |
|---|---|---|---|
| 디코딩 | `num_step` | 32 | 반복 unmasking 단계 수. Voice 페이지는 16, Audiobook은 32 |
| 디코딩 | `denoise` | True | `<|denoise|>` 토큰을 앞에 붙여 깨끗한 발화를 유도 |
| 디코딩 | `guidance_scale` | 2.0 | classifier-free guidance 배율 |
| 디코딩 | `t_shift` | 0.1 | noise schedule의 time-step shift |
| 샘플링 | `position_temperature` | 5.0 | mask 위치 선택 temperature. 0은 greedy |
| 샘플링 | `class_temperature` | 0.0 | 단계별 토큰 샘플링 temperature. 0은 greedy |
| 샘플링 | `layer_penalty_factor` | 5.0 | 깊은 codebook layer에 penalty를 주어 낮은 layer부터 unmask |
| 길이 | `duration`, `speed` | None | 고정 출력 길이(초) 또는 속도 배율. `duration`이 우선 |
| 전후처리 | `preprocess_prompt`, `postprocess_output` | True | reference의 긴 무음 제거와 문장부호 보정, 출력의 긴 무음 제거 |
| long-form | `audio_chunk_duration`, `audio_chunk_threshold` | 15.0, 30.0 | 추정 길이가 30초를 넘으면 15초 단위로 텍스트를 나눠 VRAM을 거의 일정하게 유지 |

무음 제거는 적응형이다. 표준 threshold로 자르면 조용하지만 실제인 녹음이 사라질 때 점점 완화된 threshold를 시도하고 마지막에는 trim을 건너뛴다. 완전 무음 클립만 거부한다.

### 3.11 Voice design 속성 어휘

voice design은 reference audio 없이 `instruct` 문자열의 화자 속성으로 voice를 만든다. 범주마다 하나만 고르고 범주끼리는 자유롭게 조합한다.

| 범주 | 값 |
|---|---|
| 성별 | male, female |
| 연령 | child, teenager, young adult, middle-aged, elderly |
| 음높이 | very low, low, moderate, high, very high pitch |
| 스타일 | whisper (기본 모델이 받는 유일한 전달 스타일) |
| 영어 accent (영어 텍스트에만) | american, british, australian, canadian, indian, chinese, korean, japanese, portuguese, russian |
| 중국어 방언 (중국어 텍스트에만) | 河南话, 陕西话, 四川话, 贵州话, 云南话, 桂林话, 济南话, 石家庄话, 甘肃话, 宁夏话, 青岛话, 东北话 |

영어와 중국어와 혼합 표기를 모두 받아 내부에서 정규화하고, 대소문자를 가리지 않으며, 생략한 속성은 모델이 채운다. 자유 서술형 prose는 이 속성으로 매핑되고 어휘 밖 표현은 무시된다. Gallery preview는 무음 출력과 순수 tonal buzz를 거부하되 짧은 frame 단위로 측정해 조용한 발화가 spectral flatness 때문에 거부되지 않게 한다.

### 3.12 Dubbing 파이프라인

dubbing은 transcribe, translate, speak 세 단계다. 성능 문서의 stage 설명은 더 세밀하다. 오디오 추출과 vocal 분리(긴 영상은 몇 분), 전사(Apple Silicon은 v0.3.21부터 MLX, NVIDIA는 CUDA), 번역(LLM provider에 6개 동시 요청), segment별 합성(순차, 시간의 대부분), mix와 export(대부분 stream copy)다.

번역 engine은 pluggable하다.

| Engine | 범주 | 패키지 | 키 |
|---|---|---|---|
| Argos (Local, Fast) | offline | `argostranslate` (번들) | 불필요 |
| NLLB-200 (Local, Heavy) | offline | 없음 (core `transformers`) | 불필요 |
| Google Translate (Free) | online | `deep_translator` | 불필요 |
| DeepL | online | `deep_translator` | `DEEPL_API_KEY` |
| Microsoft Translator | online | `deep_translator` | `MICROSOFT_API_KEY` |
| MyMemory | online | `deep_translator` | 불필요 |
| LLM (OpenAI 호환) | llm | `openai` | 대개 필요 |

서명된 설치본(`.dmg`, `.msi`, AppImage, `.deb`)은 읽기 전용 code-signed Python 환경을 싣기 때문에 앱 내 설치가 꺼져 있고, 설치 안 된 engine을 고르면 설치 명령 복사와 "Argos로 전환" 버튼이 있는 popover를 띄운다. 소스 설치와 Docker는 backend와 같은 인터프리터에 `uv pip install`로 한 번에 설치한다.

Quality는 Fast(engine 일회 번역), Cinematic(LLM이 reflect와 adapt로 자연스럽게 다듬음), Autofit(Cinematic에 더해 각 줄의 target 언어 낭독 시간이 slot 안에 들어가도록 재작성)이다. LLM engine이 활성일 때 두 단계가 기본으로 더 실행된다. Auto glossary는 전체 transcript를 한 번 읽어 주제 요약과 source-target 용어 대응을 뽑아 모든 segment 프롬프트에 실어 3번 segment와 300번 segment의 이름과 용어를 같게 하며, 수동 glossary가 충돌 시 항상 이긴다. Reflect pass는 segment마다 초안을 비평하고 다시 쓰므로 segment당 LLM 호출이 1회에서 3회가 되고, 실패하면 직접 번역을 조용히 유지한다.

모든 quality 수준에서 pre-synthesis fit check가 LLM 없이 실행된다. 이미 생성된 segment로 voice와 engine의 발화 속도를 자체 보정하고(cold start는 언어별 rate 표) slot과 다음 줄 전까지 빌릴 수 있는 무음을 비교해 "Tight fit"과 "Won't fit +Ns" badge를 붙인다. badge는 정보용이고 생성을 막지 않는다. "Suggest shorter lines"를 켜면 Won't fit segment마다 LLM에 의미 보존 단축 rewrite를 요청해 one-click 제안으로 보여준다.

Paste Translation은 다른 곳(ChatGPT, DeepL 웹, 사람 번역가)에서 번역한 결과를 재전사 없이 segment에 매핑한다. timestamped(`.srt`/`.vtt`, 시간 겹침으로 매핑), numbered lines(번호로 매핑), plain lines(위치로 매핑) 세 형태를 자동 감지하고, 적용 전 before/after 미리보기를 보여주며, 전체 paste가 undo 한 단계다. 바뀐 행은 자동으로 stale로 표시되어 "Regen N changed"가 그 줄만 다시 말한다.

LLM provider는 Settings의 한 곳에서 관리한다. OpenAI, OpenRouter, OrcaRouter, Groq, Cerebras, Google AI, Mistral, Cohere, NVIDIA, GitHub Models, Cloudflare, Hugging Face, SambaNova, SiliconFlow, 로컬 Ollama와 LM Studio, Custom OpenAI 호환 endpoint를 지원하고 키는 암호화 저장되며 UI로 돌려주지 않는다. `LLM_DEFAULT_PROVIDER`로 고정할 수 있고 해석 순서는 env, 저장된 선택, 키가 있는 첫 provider, 없음이다. LLM Skills 설정은 Cinematic과 Autofit, slot fitting, glossary 추출, direction 파싱, 받아쓰기 정리 각각을 끄거나 특정 provider로 routing해 민감한 작업은 로컬 모델에 두게 한다.

export는 source 오디오와 하나 이상의 dub track을 담고 선택한 dub 언어를 기본 track으로 표시한다. hardsub은 Line(정적)과 Karaoke(단어별 하이라이트, 전사 시 기록한 단어 timing 사용) 두 스타일이 있고 Smart Fit은 영상 retime 후에 자막을 굽는다. karaoke 스크립트는 `GET /dub/ass/{job_id}`로 `.ass` sidecar를 따로 받을 수 있다.

diarization은 `pyannote/speaker-diarization-3.1`이 HuggingFace에서 gated라 HF 토큰과 라이선스 동의(`speaker-diarization-3.1`, `segmentation-3.0` 두 repo)가 필요하고 첫 실행에 약 600MB를 받는다. 실패하면 긴 무음으로 화자를 나누는 silence-gap heuristic으로 fallback하고 이유를 `diarization_skipped:no_token`, `diarization_skipped:401`, `diarization_skipped:network`로 job 로그에 남긴다. heuristic은 음높이가 비슷하거나 빠르게 교대하는 화자를 합친다.

### 3.13 받아쓰기와 native 삽입

받아쓰기는 시스템 전역 단축키로 녹음해 로컬 전사하고, 데스크톱이 허용하면 단축키를 누른 앱에 결과를 삽입한다. pill은 키보드 focus를 갖지 않는다. macOS, Windows, Linux 모두 Whisper Tiny가 권장 기본이며 90개 이상 언어를 자동 감지한다. Parakeet TDT v3는 유럽 25개 언어용으로 남아 있으나 자동 선택되지 않는다.

| 플랫폼 | 자동 삽입 |
|---|---|
| macOS | 포착한 앱을 재활성화하고 Command-V. Accessibility 권한이 없으면 복사 상태로 남는다 |
| Windows | 포착한 창과 프로세스를 검증하고 foreground 활성화 후 Ctrl-V. 거부되면 복사 상태 |
| Linux X11 | EWMH로 X11 창을 재활성화하고 검증 후 Ctrl-V |
| Wayland | 이식 가능한 창 identity가 없어 전체 transcript를 복사만 한다. `VOICESTUDIO_WAYLAND_UNTARGETED_INSERT=1`로 `wtype`, `dotool`, `ydotool` 경유 삽입을 opt-in |
| 브라우저 모드 | 복사만. 브라우저는 다른 데스크톱 앱을 대상으로 삼을 수 없다 |

데스크톱은 shortcut-down 시점에 대상을 포착하고 세션 ID를 partial, utterance, summary 메시지에 실어 옛 세션의 늦은 결과가 새 세션의 대상에 들어가지 못하게 한다. paste 전달은 텍스트, HTML, 이미지, 파일 목록 클립보드 내용을 스냅샷하고 transcript를 올린 뒤 복원하며, 전사 중 사용자가 복사한 내용은 덮어쓰지 않는다. 빈 Sherpa decode는 이미 설치된 다른 ASR 가중치로만 재시도하고 그 fallback이 단어를 확인하면 무음 모델을 강등한다. 이 복구는 다운로드를 시작하지 않는다.

### 3.14 로컬 speech platform

`docs/speech-platform.md`는 VoiceStudio를 데스크톱 받아쓰기 앱이자 headless 로컬 speech 서비스로 정의한다. 번들된 Rust control sidecar(포트 3902, IPv4 loopback에만 bind)가 마이크 활성화, focus 대상 포착, 클립보드 안전, native 삽입을 소유하고 Python backend(포트 3900)가 ASR 모델을 warm 상태로 유지하며 audio data plane을 노출한다. 두 포트 모두 `/.well-known/voicestudio-speech`에서 `voicestudio.speech.v1` 문서를 돌려준다. 데스크톱 문서는 절대 URL, backend 문서는 상대 URL이라 Tailscale이나 reverse proxy 뒤에서도 동작한다.

| 전송 | Endpoint | 용도 |
|---|---|---|
| OpenAI 호환 HTTP | `POST :3900/v1/audio/transcriptions` | 파일, 스크립트, 기존 SDK |
| WebSocket | `:3900/v1/audio/transcriptions/stream` | partial과 final 실시간 텍스트 |
| MCP Streamable HTTP | `POST :3900/mcp` | 현대 에이전트 클라이언트 |
| MCP stdio | `python -m backend.mcp_shim` | Claude Code, Codex, stdio 전용 클라이언트 |
| JSON-RPC | `POST :3902/rpc` | native 받아쓰기 제어 (`dictation.toggle`) |
| Native CLI | VoiceStudio `--dictate-start`, `--dictate-stop`, `--dictate-toggle` | 훅과 플러그인 동작. single-instance bridge가 실행 중인 앱에 전달 |

편집기가 마이크를 직접 소유하는 경우 `ws://127.0.0.1:3900/v1/audio/transcriptions/stream`에 WebM/Opus 프레임(또는 `?pcm=1&sr=16000`으로 16-bit mono PCM)을 보내고 `{"type":"input_audio.end"}`로 마친다. 응답은 `session.started`, `partial`, `final`(`final_kind`가 `summary` 또는 스트리밍 Sherpa의 `utterance`)이며 모두 `protocol`과 `session_id`를 싣는다. native 삽입을 재사용하려면 3902에서 `POST /v1/output/sessions`로 대상을 예약하고, 3900에서 final 텍스트를 받은 뒤, `POST /v1/output/sessions/{id}/insert`로 넣는다. output session은 한 번에 하나만 focus 대상을 소유하고 stale ID는 거부된다. 의존성 없는 Python bridge(`python -m backend.speech_client status|toggle|transcribe file --insert`)도 있다.

설계 조사는 GitHub `speech-to-text` topic 5페이지를 훑어 9개 프로젝트에서 채택한 아이디어를 표로 남겼다. Handy(offline 받아쓰기, 외부 toggle), WhisperLiveKit(live 로컬 전사), RealtimeSTT(저지연 partial, endpointing), sherpa-onnx(CPU 스트리밍 모델), FunASR(OpenAI 호환과 MCP serving), Vexa(WebSocket transcript와 에이전트 접근), Voquill(provider 독립, 개인 어휘), Muesli(기계 판독 CLI 계약), Herdr(CLI, socket, 훅, 플러그인 뒤의 단일 로컬 제어 표면)다. 차별점은 연결 층이며, native 캡처와 출력 제어와 프로토콜 중립 ASR 서비스를 한 앱이 제공하므로 인터페이스마다 모델 로딩과 권한과 삽입 안전을 다시 만들지 않는다.

### 3.15 OpenAI 호환 API와 에이전트 프레임워크

OpenAI 호환 클라이언트는 `base_url`을 `http://localhost:3900/v1`로 바꾸면 된다.

| Endpoint | 목적 |
|---|---|
| `POST /v1/audio/speech` | TTS. `mp3`, `opus`, `aac`, `flac`, `wav`, `pcm`. `voice`로 profile, `model`로 엔진 선택. 기본 출력 24kHz |
| `POST /v1/audio/transcriptions` | STT. `json`, `text`, `verbose_json`, `srt`, `vtt` |
| `WS /v1/audio/transcriptions/stream` | PCM/WebM 실시간 전사. partial, utterance, session-final 이벤트 |
| `GET /.well-known/voicestudio-speech` | HTTP, WebSocket, MCP, native 제어 전송 발견 |
| `GET /v1/audio/voices` | 로컬 voice profile과 엔진 목록 (VoiceStudio 확장) |

`docs/agentic-voice.md`는 이를 "agentic v1"이라 부른다. VoiceStudio는 provider이고 orchestrator가 아니며, 사용자가 pipecat(BSD-2, 같은 프로세스 안의 Python 라이브러리)이나 LiveKit Agents(Apache-2.0, LiveKit 미디어 서버 필요)의 OpenAI TTS/STT 서비스에 `base_url`과 voice profile id와 `sample_rate=24000`을 주어 연결한다. 단일 로컬 에이전트에는 pipecat이 가볍다. 요청 형태는 `tests/test_agentic_provider_contract.py` 계약 테스트가 CI에서 고정한다. 발신 전화는 유료 carrier가 필요해 PSTN까지 완전 로컬 경로가 없으므로 별도 milestone으로 미뤘고 명시적 consent guardrail 뒤에서만 나온다.

### 3.16 MCP 서버

MCP 서버는 실행 중인 backend의 `/mcp`에 mount되므로 따로 띄울 것이 없다.

| Tool | 기능 |
|---|---|
| `generate_speech` | 텍스트를 WAV로. `profile_id`가 없으면 에이전트에 bind된 voice 사용 |
| `clone_voice` | reference audio(base64 또는 base path 아래 `ref_audio_path`)로 새 voice profile 생성 |
| `transcribe` | 오디오(base64 또는 `audio_path`)를 텍스트로. 646개 언어 |
| `list_voices`, `list_personalities`, `list_languages` | 목록 조회 |
| `check_health` | backend 상태와 활성 GPU |

LLM 에이전트는 컨텍스트로 받는 모든 바이트에 비용을 내므로 base64 WAV는 짧은 클립도 결과 한도에 닿는다. `OMNIVOICE_MCP_OUTPUT_MODE`는 `resources`(기본, `wav_base64` inline), `files`(`/audio/<id>.wav` URL과 base path 아래 `output_path`), `both`를 고른다. `OMNIVOICE_MCP_BASE_PATH`는 파일 형태 트래픽의 보안 경계로, 입력 파일은 이 아래에서만 읽고(상대 경로는 여기에 해석, 절대 경로는 안에 있어야 하고, symlink는 검사 전에 해석) files 모드는 여기에만 쓴다. 경로 검증 후 confined no-follow descriptor로 열어 검사 뒤 파일이 바뀌어도 밖으로 나가지 못한다. base path가 없으면 경로 인자를 이유와 함께 거부한다. `OMNIVOICE_MCP_TIMEOUT_S`가 없으면 각 tool은 backend 자체 timeout에 30초를 더한 값(최소 120초)을 기다리고, `generate_speech`는 GPU queue 대기(`OMNIVOICE_GPU_QUEUE_TIMEOUT_S`, 기본 1,800초)에 생성 budget과 1,200자 초과분 40자당 1초를 더한다. 모델을 아직 받지 않은 머신에서는 첫 `generate_speech`가 약 2.3GB 다운로드도 그 budget 안에서 한다.

에이전트마다 client id로 voice를 bind할 수 있다. `generate_speech`의 voice 해석 순서는 명시적 `profile_id`, 호출 에이전트의 binding, 전역 기본 voice, VoiceStudio 기본 voice다. binding은 loopback REST `GET/PUT/DELETE /api/mcp/bindings`로 관리한다. Streamable HTTP는 `X-VoiceStudio-Client-Id` 헤더로, stdio shim은 `OMNIVOICE_CLIENT_ID` env로 id를 전달한다. Docker나 다른 머신의 에이전트는 MCP SDK의 DNS-rebinding guard 때문에 `OMNIVOICE_MCP_ALLOWED_HOSTS`에 host 패턴을 적어야 하며, MCP 전송은 인증되지 않으므로 신뢰 LAN이나 TLS 뒤에만 두라고 경고한다. `OMNIVOICE_MCP_DISABLE=1`이면 mount하지 않는다.

에이전트 스킬은 `npx skills add debpalash/VoiceStudio`로 설치한다. `omnivoice` 스킬은 로컬 VoiceStudio로 합성과 전사를 하고, `oss-maintainer` 스킬은 저장소의 오픈소스 유지 관리 워크플로를 담는다.

### 3.17 네트워크 경계와 인증

backend는 기본적으로 loopback 전용이고 인증이 없다. 같은 머신의 스크립트는 키도 PIN도 헤더도 필요 없다. 다른 기기에서 닿을 때만 세 gate가 의미를 갖는다.

| Gate | 켜는 방법 | 보호 대상 | 적용 범위 |
|---|---|---|---|
| Share PIN | 앱 내 Network share 토글 | 일회 세션의 LAN 손님 | 비loopback HTTP |
| API key | backend의 `OMNIVOICE_API_KEY` | 직접 클라이언트와 first-party 세션 bootstrap | 비loopback HTTP + WebSocket |
| Trusted networks | `OMNIVOICE_TRUSTED_NETWORKS` (CIDR 목록) | 위 두 gate를 면제 | 비loopback 소비 라우트만 |

PIN은 sharing을 켤 때마다 새 6자리로 생성되고 디스크에 쓰지 않으며, `X-OmniVoice-Pin` 헤더, `?pin=` 질의(query) 파라미터, `ov_pin` 쿠키로 낸다. PIN gate는 HTTP만 다루고 WebSocket을 gate하지 않으므로 받아쓰기 WebSocket은 API key나 trusted network가 필요하다. PIN은 6자리라 brute-force 가능하므로 관리 표면을 열지 못한다. API key는 `Authorization: Bearer`가 권장이고 legacy `ov_key` 쿠키와 `?api_key=`는 호환용이며 URL의 키는 proxy 로그와 브라우저 이력에 샌다. 키는 constant time으로 비교되고 로그에 남지 않는다.

first-party UI는 master key를 `POST /api/auth/session`에 한 번만 보내 8시간 한도의 세션(`ov_session` HttpOnly SameSite=Strict 쿠키 또는 sessionStorage의 bearer)으로 바꾸고 master를 저장하지 않는다. 실패한 세션 교환은 클라이언트당 60초에 10회로 제한되어 `429`와 `Retry-After`를 받으나 올바른 master는 항상 평가되어 잠금이 불가능하다. 쿠키 인증 mutation은 정확한 `Origin`과 `X-VoiceStudio-CSRF: 1`이 필요하다. WebSocket은 `POST /api/auth/ws-ticket`이 발급하는 path-bound 30초 일회용 ticket을 URL에 넣는다.

관리 라우트(`/system/*`의 `set-env` 포함, `/api/settings/*`, 엔진 설치와 제거, 미디어 도구, MCP binding, 원격 worker 관리)는 데스크톱에서 true-loopback 전용이다. 서버 모드(`OMNIVOICE_SERVER_MODE=1`, Docker 이미지)는 NAT 때문에 loopback 판정이 불가능하므로(#261) 자격 규칙으로 대체한다. 자격이 하나도 없으면 읽기 전용 discovery만 허용하고 mutation과 부작용 있는 GET을 거부하며, API key가 있으면 그 키나 관리자 세션이나 진짜 loopback이 필요하고, PIN과 trusted network는 절대 관리 표면에 닿지 않는다. 이 독립성은 #1213을 고친 결과다. 이전에는 API key와 trusted CIDR이 함께 설정된 서버 모드에서 그 CIDR의 LAN 클라이언트가 자격 없이 `POST /system/set-env`를 호출할 수 있었다. 관리형 sidecar 설치는 API key가 있어도 true-loopback 전용이다. 호스트 경로는 HTTP로 선택되지 않고 native Tauri 프로세스가 검증해 일회용 capability를 발급하며, `/export`는 `destination_path`가 아니라 `authorization` 토큰만 받는다.

CORS는 인증과 별개의 벽이다. allow-list 기본값은 loopback과 Tauri origin뿐이라 LAN IP로 연 dev UI는 `OMNIVOICE_ALLOWED_ORIGINS`에 정확한 origin을 적어야 하며(#1348) 이 값은 기본 목록을 대체한다. 상태 코드는 `401`(소비 인증 실패, WebSocket은 close 1008), `403`(loopback이나 native 접근 필요, CSRF 실패, 서버 모드 mutation에 관리 자격 없음), `429`(세션 교환 한도, GPU pool 포화, 모델 다운로드 rate limit)다.

앱 내 sharing은 두 경로다. LAN sharing은 footer의 Local pill을 Network로 바꾸면 모든 도달 가능한 주소를 QR(PIN 포함)과 함께 보여주고 끄면 socket을 닫는다. Tailscale은 `tailscale serve`로 tailnet에 publish하고 HTTPS 인증서가 켜진 tailnet에서만 HTTPS를 쓴다. 두 경로 모두 backend를 재시작하거나 로드된 모델을 내리지 않는다.

### 3.18 원격 컴퓨트 두 종류

| 구분 | Remote backend | Remote workers |
|---|---|---|
| 무엇이 옮겨가는가 | 앱 전체(프로젝트, voice, 이력)가 GPU 머신으로 | 개별 task만. 나머지는 이 머신에 |
| 클라이언트 | 데스크톱 앱이 thin client. Backend URL과 API key 입력 | 이 머신의 앱이 control plane |
| 네트워크 | tailnet 권장. `tailscale serve`로 TLS. `tailscale funnel` 금지 | worker가 outbound로 dial. worker는 공개 주소가 필요 없고 이 머신만 도달 가능하면 된다 |
| 자격 | `OMNIVOICE_API_KEY` bearer. 브라우저는 URL fragment `#api_key=`로 한 번 전달 | 15분 유효, 한 번만 보이는 join code(해시만 저장). worker는 Ed25519 keypair를 만들어 이후 소유 증명 |

remote workers는 opt-in이고 기본 off다. Settings에서 켜고 join code를 텍스트와 QR로 발급해 worker 머신의 "Lend this machine's GPU"에 붙여 넣는다. headless worker는 `OMNIVOICE_WORKER_TOKEN`과 `OMNIVOICE_WORKER_MODE=1`로 `uvicorn backend.main:app --host 127.0.0.1 --port 3900`을 실행하고, NVIDIA Docker는 `--profile worker-gpu`(AMD는 `worker-rocm`)를 쓴다. 승인은 worker별로 기록되며 승인해야 오디오와 reference voice와 텍스트가 그 머신으로 간다.

원격에서 실행되는 것은 speech 합성, 오디오북 챕터(한 챕터씩), dub segment 합성(모든 fresh segment를 하나의 coarse task로 보내 WAV bundle로 수신)이다. fitting, assembly, RVC, ASR, diarization, 번역은 로컬에 남고 받아쓰기는 지연 자체가 기능이라 영구히 로컬이다. worker는 voice profile의 reference audio와 transcript, 고정 seed, 품질 제어, chunking과 crossfade 설정, 효과 preset까지 완전한 렌더링 계약을 받으므로 gallery voice가 다른 GPU에서 렌더된다고 다른 voice가 되지 않는다.

task 배치 규칙은 연결되어 있고 승인되고 활성이며 엔진을 갖고 free slot이 있고 pause되지 않은 worker다. Preferred worker는 hard choice라 잠들어 있으면 다른 곳에 조용히 보내지 않고 그 worker 이름을 댄다. 없으면 가장 한가한 worker를 고르되 모델을 이미 로드한 worker를 우선한다. routing weight나 모델별 동시성 설정은 없고 동시성은 free VRAM에서 실시간 측정한다. 설정값은 compiled 모델의 출력을 조용히 손상시키고 작은 카드를 crash시키기 때문이다.

실패 처리는 다음과 같다. task 중 worker가 끊기면 grace window 동안 기다리고 완료 결과를 들고 돌아오면 그 결과를 쓴다. worker 잘못인 연속 실패 3회면 1분 pause 후 task 하나로 검증하고 반복되면 최대 30분까지 backoff한다. 바쁨, 없는 엔진 요청, 네트워크 유실은 실패로 세지 않는다. 앱을 종료해도 원격 작업은 계속되고 다음 실행 시 복구한다. 등록은 프로토콜 범위와 named feature(task 입력, progress lease, 원격 모델 다운로드, voice-identity 렌더 파이프라인)를 협상하고, durable enrollment가 handshake를 v1에서 v2로 바꿔 그 경계는 양방향으로 비호환이며 범위 밖 worker는 `UPGRADE_REQUIRED`로 거부된다.

보안은 모든 트래픽 TLS(끌 수 없음), control plane의 자체 인증서 fingerprint를 enrollment token에 실어 worker가 pin, worker identity는 절대 보내지 않는 키, 제거 시 키 폐기(재시작 후에도 유지), task는 파일 경로가 아니라 고정 registry의 엔진 이름만 지정(경로는 모든 worker에서 원격 코드 실행이 된다)이다.

inbound node mode(ADR 2026-08-11 accepted)는 outbound의 구조적 1:1 한계를 푼다. worker 프로세스는 endpoint 하나, pinned 인증서 하나, worker id 하나를 갖기 때문에 두 번째 사람이 같은 GPU를 쓰려면 그 머신의 shell 접근으로 시작 스크립트를 고치고 재시작해 기존 사용자를 끊어야 했다. inbound 모드에서는 GPU 머신이 `127.0.0.1:7444`에서 listen하고 API key를 가진 panel이 연결한다. 전송 역할은 뒤집히지만 메시지 역할은 그대로라(`NodeService`가 `WorkerService`를 mirror하고 node는 여전히 `WorkerMessage`, panel은 `ServerMessage`를 보낸다) 양쪽 상태 기계가 바뀌지 않는다. panel마다 별도 API key(SHA-256 해시 저장, constant-time 비교), 출발 주소별 실패 인증 throttle, 동시 panel 허용(둘이 같은 slot을 잡으면 worker의 `WORKER_AT_CAPACITY` 거부가 권위이고 진 쪽이 재시도), 연결 로그와 kick 버튼, 기본 bind loopback, 기본 off다. 연결 문자열 `ovnode://ovnode_xxx@host:7444?fingerprint=<64-hex>`는 self-signed 인증서의 SHA-256 fingerprint를 싣고 panel은 discovery handshake로 leaf 인증서를 받아 fingerprint를 검증한 뒤에야 자격과 데이터를 보낸다. 거부된 대안은 multi-endpoint dial-out(여전히 SSH 필요), 공유 node key(폐기하면 전원이 끊겨 아무도 폐기하지 않음), job별 승인 prompt(사람이 yes만 누르게 훈련됨), `WorkerService` 재사용(gRPC 클라이언트가 request-stream 타입을 보내 panel이 `WorkerMessage`를 보내게 됨)이다.

worker node에는 idle timer가 두 개다. 엔진 registry의 `OMNIVOICE_ENGINE_IDLE_UNLOAD_SECONDS`(600초)가 캐시된 엔진 인스턴스를 내리고, in-process 모델 reaper `OMNIVOICE_IDLE_TIMEOUT`(900초)이 받아쓰기 ASR과 watermark 모델까지 내리는 backstop이다.

### 3.19 사설 production API 배포

`docs/production-private-api.md`는 InterviewAce라는 호출 backend를 예로 든 Compose baseline을 제시한다. `ghcr.io/debpalash/omnivoice-studio:0.5.2`처럼 정확한 태그를 고정하고(`:latest`와 `:main`은 rolling preview, `:stable`은 안정 릴리스마다 이동), `OMNIVOICE_API_KEY`는 secret store에 두며, `OMNIVOICE_BIND_HOST=0.0.0.0`을 컨테이너 안에서 쓰되 호스트 바인딩은 `127.0.0.1:3900:3900`으로 LAN을 막고, `/app/omnivoice_data`와 HuggingFace 캐시를 named volume에 영속화한다. healthcheck는 `/health`, `start_period` 120초다.

reverse proxy 규칙은 `Authorization` 전달, 스트리밍 생성을 위한 응답 buffering 해제, 생성 timeout보다 긴 read timeout, 클라이언트가 보낸 `Forwarded`와 `X-Forwarded-*` 폐기 후 재설정, `FORWARDED_ALLOW_IPS`를 proxy의 정확한 주소로만 신뢰(`*`나 subnet은 동등하지 않다)다. 운영은 트래픽 admit 전에 `GET /models`로 checkpoint를 확인하고 `POST /models/install`로 미리 받아 `/setup/download-stream` 완료를 기다린 뒤 warm 요청을 보내고, 용량 응답의 `Retry-After`를 존중하며, 키 회전은 drain, secret 갱신, 컨테이너 재생성, 호출자 갱신, 검증, 복구 순서다. API key는 서버 모드 관리 권한도 주는 root 자격이므로 호출 앱에 소비 권한만 주려면 별도 인스턴스나 route-aware proxy의 default-deny allowlist가 필요하다. L3/L4 네트워크 정책만으로는 생성과 관리를 구분할 수 없다.

### 3.20 성능 튜닝

느려지는 고전적 원인 다섯 가지를 먼저 든다. 첫째, transcript가 빈 voice profile. v0.3.15 전에는 매 생성마다 Whisper 전사를 실행했고(#1032) 이후에는 한 번 실행해 profile에 저장하지만 여전히 빈 profile은 생성마다 ASR을 낸다. 둘째, 재시작 후 첫 생성은 항상 가장 느리다(가중치 lazy load 약 8초, CUDA torch.compile kernel, Metal warm-up). 셋째, 메모리 압박으로 OS가 모델을 page in/out하거나 backend를 죽인다. 넷째, 모르는 사이 CPU에서 생성한다. Settings의 Device & compute, self-check(`/system/diagnose`), Model Catalogue의 routing badge 세 곳이 사실을 알려준다. Windows GPU 가속은 NVIDIA/CUDA 전용이다. 다섯째, v0.3.23 전에 dub를 중단하면 VRAM을 비우려 CPU로 옮긴 TTS 모델이 돌아오지 않아 이후 모든 생성이 10~50배 느렸다(#1191). 이제 모든 exit path에서 복귀하고 생성마다 device를 검증한다.

cloned voice의 한 생성은 reference 인코딩(약 0.4초, 재사용 voice는 캐시), 합성(출력 길이에 비례), 후처리(mastering, watermark, 1초 미만)다.

| 변수 | 기본 | 역할 |
|---|---|---|
| `OMNIVOICE_DEVICE` | `auto` | `cuda`/`rocm`/`xpu`/`mps`/`cpu` 고정. 호스트에 없는 family는 무시 |
| `OMNIVOICE_IDLE_TIMEOUT_S` | 900 | TTS 모델 unload까지 idle 초 |
| `OMNIVOICE_SIDECAR_IDLE_TIMEOUT_S` | 300 | sidecar 엔진 동일 |
| `OMNIVOICE_LLM_CONCURRENCY` | 6 | dub 번역 병렬 LLM 호출 |
| `OMNIVOICE_GPU_WORKERS` | auto | 동시 GPU 생성 수. free VRAM 5GB당 1, 최대 4. MPS와 CPU는 항상 1. 10GB 이하 카드와 Apple Silicon에서 올리면 crash class(#567) |
| `OMNIVOICE_CPU_POOL` | `min(8, cores)` | CPU 측 thread pool |
| `OMNIVOICE_SINGLE_ENGINE_RESIDENT` | 1 | TTS 엔진 하나만 상주. 32GB+ 머신은 0 |
| `OMNIVOICE_UNIFIED_OFFLOAD_HEADROOM_GB` | 6 | Apple Silicon에서 dub가 전사 모델을 필요로 할 때 free RAM이 이 값 미만이면 TTS 모델을 완전히 해제 |
| `OMNIVOICE_ASR_VRAM_PREFLIGHT` | 1 | VRAM 부족 시 crash 대신 전사 정밀도 강등 |
| `OMNIVOICE_GENERATE_TIMEOUT_S` | 300 | 가속 호스트의 실제 compute 시간 budget. 1,200자 초과분 40자당 1초 증가. floor 아래 CUDA/ROCm은 CPU budget으로 |
| `OMNIVOICE_CPU_GENERATE_TIMEOUT_S` | 600 | CPU 호스트 budget |
| `OMNIVOICE_GPU_QUEUE_TIMEOUT_S` | 1800 | GPU queue 대기 한도. 초과는 "pool 포화" retryable 조건 |
| `OMNIVOICE_DUB_BATCH_WIDTH` | 호스트 유도 | batch dubbing의 segment 폭. 1이면 비활성, 최대 16 |

`torch.compile`은 플랫폼이 아니라 probe 기반이다. Triton을 import할 수 있는 지원 아키텍처의 CUDA에서만 시도하고 MPS, CPU, 일반 Windows(Triton에 Windows wheel이 없음)에서는 건너뛴다. 느린 생성 전 두 가지 advisory 경고가 요청이 앱을 떠나기 전에 뜬다. 엔진의 VRAM floor가 GPU를 넘거나 CPU로 fallback한 경우, 그리고 CPU나 MPS 호스트에서 텍스트가 1,200자를 넘는 경우다. 경고는 엔진과 이유당 세션에 한 번만 나온다.

Flush caches와 Unload는 재시작 없이 RAM/VRAM을 비운다. Flush caches는 다중 pass GC와 accelerator `empty_cache`로 모델은 유지하고 조각 메모리만 회수하며, Unload all + flush는 TTS 모델까지 내려 다음 생성이 약 8초 reload를 낸다. 스크립트는 `POST /system/flush-memory[?unload_model=true]`, `GET /model/loaded`, `POST /model/unload/{tts|diarization|sidecar:<id>|sidecars}`를 쓴다. 방금 timeout된 job은 Python에서 kill할 수 없어 thread가 끝날 때까지 VRAM을 쥐므로 Flush가 도움이 안 되는 경우로 명시한다.

batch dubbing은 엔진이 지원하면 여러 segment를 한 번의 native forward pass로 렌더한다. 폭은 headroom에서 유도되며 CPU와 단일 job 요구량 위 약 2GB 미만 headroom은 1, 여유에 따라 2, 4, 8로 올라간다. `/ws/tts`의 종료 `done` 프레임은 `ttfa_ms`(요청에서 첫 오디오까지), `gen_time_s`(전달 포함 wall clock), `rtf`(합성 시간을 생성 오디오 길이로 나눈 값, 렌더 호출 주변만 측정해 느린 클라이언트가 부풀리지 못함)를 싣는다.

CI는 wall-clock 대신 operation-count budget(`tests/test_perf_operation_budgets.py`)으로 hot path의 회귀를 막는다. 스트리밍 TTS는 문장 chunk당 정확히 1회 `generate`와 요청당 1회 정규화, fit-only re-mix는 TTS 호출 0회, native batch dubbing은 segment N개와 폭 W에서 정확히 ⌈N/W⌉회 `generate_batch`와 0회 segment별 `generate`다. budget 갱신은 같은 PR에서 새 floor를 정당화하는 주석과 함께 해야 한다.

### 3.21 이식 가능한 persona `.ovsvoice`

`.ovsvoice`는 voice profile의 identity, 옵션 reference clip, consent 증명, SPDX 라이선스 태그, watermark된 preview를 하나의 ZIP에 담는다. 옛 `.omnivoice` share bundle을 대체하되 import는 계속 지원한다. export 시 "Include voice clip"을 끄면 raw 녹음은 나가지 않고 watermark된 preview만 travel하며 import된 persona는 preview를 reference clip으로 쓴다. import 시 verified-own-voice는 최소 길이 이상의 consent 녹음, 비어 있지 않은 consent 문장, `consent.json` 증명 세 조건이 모두 있을 때만 표시되고, 아니면 unverified로 들어와 로컬 합성에는 쓸 수 있으나 agentic 기능과 커뮤니티 공유에는 verification이 필요하다. `manifest.json`의 `license.spdx`는 allowlist(+`LicenseRef-`)로 검증되고 미인식 값은 `LicenseRef-VoiceStudio-Personal`로 정규화되며, 라이선스는 메타데이터일 뿐 VoiceStudio가 강제하지 않는다. export와 import는 네트워크 호출이 없다.

### 3.22 학습, 데이터, 평가

`omnivoice/` 패키지는 학습 경로도 제공한다. 데이터는 WebDataset tar shard(오디오 토큰 `.npy`, shape `[8, T]`, int16)와 짝 JSONL 메타데이터로 준비한다. `extract_audio_tokens.py`가 JSONL manifest(`id`, `audio_path`, `text`, 옵션 `language_id`)를 읽어 `eustlb/higgs-audio-v2-tokenizer`로 8-layer 이산 토큰을 뽑고 shard당 기본 1,000개 샘플로 묶어 `data.lst`(`<tar> <jsonl> <num_samples> <duration>`)를 만든다. 학습 config의 핵심 필드는 `llm_name_or_path`(기본 Qwen/Qwen3-0.6B), `steps`(30만), `learning_rate`(1e-4), `batch_tokens`(GPU당 8,192)이며 `accelerate launch -m omnivoice.cli.train`으로 8 GPU를 쓰는 예시가 있다. `resume_from_checkpoint`와 `init_from_checkpoint`(fine-tuning 시작점)를 구분한다. fine-tuning은 pre-training된 모델을 특정 데이터로 더 학습시키는 단계다.

| 평가 세트 | 언어 | WER 모듈 | 지표 |
|---|---|---|---|
| LibriSpeech-PC | 영어 | HuBERT WER | WER + Speaker Sim + MOS |
| Seed-TTS (en) | 영어 | Whisper WER | WER + MOS |
| Seed-TTS (zh) | 중국어 | Paraformer WER | WER + MOS |
| FLEURS | 102개 언어 | Omnilingual-ASR WER | WER (언어별 + macro 평균) |
| MiniMax Multilingual | 24개 언어 | Whisper + Paraformer | WER + MOS |

지표는 WER(생성 음성을 ASR로 전사해 참조와 비교, 일부 언어는 CER), 화자 유사도(ECAPA-TDNN + WavLM 임베딩의 cosine similarity), UTMOS(MOS를 예측하는 신경망)다.

### 3.23 개발 계약과 에이전트 규칙

`AGENTS.md`는 CLAUDE.md를 헌법으로, 자신을 운영 계약으로 두고 충돌 시 CLAUDE.md가 이긴다고 적는다. 주요 규칙은 다음과 같다.

- 응답은 완전히 답하는 가장 짧은 형태로 하고, CI와 linter와 리뷰 봇이 이미 계산한 것을 다시 유도하지 않는다
- 기계적 규칙은 결정론적 테스트에 둔다. changelog 형식(`tests/test_changelog_style.py`), locale parity(`tests/test_locale_parity.py`), 버전 lockstep(`tests/test_app_version.py`), CJK 하드코딩 금지(`tests/test_no_hardcoded_cjk.py`)
- cross-platform parity는 동작 기준이다. 하드웨어 가속의 유무는 위반이 아니고, 한 OS에서만 보이는 기능은 위반이며, 최적화를 모든 곳에서 끄는 식의 "수정"은 금지다. 기본 동작이 OS마다 다르면 P0
- merge 규칙: 리뷰 없이 merge 금지, CodeRabbit과 Greptile 코멘트 수확 후 Critical/P1을 읽지 않은 채 merge 금지, PR을 as-is로 받지 않고 branch에서 고쳐 merge, stale branch는 `main`을 먼저 merge, "Tests (backend + frontend)" green + MERGEABLE이 gate, merge 후 `main`의 post-merge run을 green까지 지켜본다
- local-first: 새 필수 네트워크 호출 금지, HF 다운로드는 설치 여부나 명시적 사용자 동작으로 gate, 모든 합성 오디오는 `mark_synthetic` chokepoint를 지난다
- 사용자 문자열은 i18n을 거쳐 21개 locale 전부에 실제 번역으로 존재해야 한다
- 버전은 `frontend/package.json`이 단일 진실이고 소유자 요청 없이 올리지 않는다. 의존성 변경은 루트 `bun.lock` 재생성이 필요하다(Docker가 `--frozen-lockfile`)
- issue는 흡수하거나 거절하고 미래 버전으로 미루지 않는다
- 새 select box는 `SearchableSelect.jsx`를 쓰고 native `<select>`를 도입하지 않는다

### 3.24 설치와 실행

| 플랫폼 | 패키지 |
|---|---|
| macOS 13.3+ | Apple Silicon DMG. 첫 실행에 우클릭 후 Open 승인 |
| Windows 10/11 | x64 MSI. current-user build는 관리자 권한 없이 설치 |
| Linux | AppImage, x86_64, glibc 2.39+ |
| Docker | Linux/AMD64. CUDA, ROCm, CPU, worker-only GPU profile |

첫 실행은 관리형 Python 환경을 만들고 기본 모델을 받으며 이후 실행은 둘 다 재사용한다. Docker는 `docker run -d -p 127.0.0.1:3900:3900 -v omnivoice-data:/app/omnivoice_data palashdeb/omnivoice-studio:stable` 한 줄이다. 소스 실행은 Node 20+/Bun과 Python 3.11+에서 `bun install`과 `bun run desktop`이며 launcher가 `uv`로 Python 의존성을 자동 구성하고 `bun run dev`는 브라우저 UI다. 설치 실패 시 Settings의 self-check나 `uv run python backend/main.py --diagnose --deep`을 쓴다. Google Colab notebook으로 설치 없이 시도할 수 있으나 Colab은 원격 컴퓨트라 데이터가 로컬에 남지 않는다. 첫 voice는 Voice Cloning에서 3초(권장 5~15초)의 깨끗한 샘플과 텍스트와 언어를 주고 Generate를 누르면 된다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- **공식 벤치마크 표는 비어 있다.** `docs/benchmarks.md`는 in-repo harness `scripts/bench_pipeline.py`가 named 하드웨어와 named 버전에서 측정한 수치만 싣고 추정치는 넣지 않는다고 규정한다. 수집하는 값은 RTF(생성 오디오 1초당 compute 초, 1 미만이면 실시간보다 빠름, warm short line 기준)와 CUDA peak VRAM이다. 수집 시점의 표는 "No verified rows yet"이며 maintainer와 커뮤니티 PR로 채운다. 다른 머신의 수치는 직접 비교할 수 없고 leaderboard가 아니라 "이 엔진이 이 급의 GPU에서 대략 이만큼"의 정직한 기대치가 목적이라고 적었다.
- **성능 문서의 측정치** (16GB Apple Silicon M2, 비율만 유효): reference 인코딩 약 0.4초, 모델 lazy load 약 8초, CPU 전용은 MPS보다 약 2배 느리고 CUDA 대비는 더 느리다. NVIDIA는 VRAM 16GB 이상에서 3~4개 동시 생성을 병렬화하고 10GB 이하는 직렬화한다.
- **엔진 수치**: OmniVoice VRAM floor 6GB. GGUF quant는 BF16 약 1.6GB, Q8_0 약 945MB, Q4_K_M 약 659MB, F32 약 3.2GB. WhisperX의 wav2vec2 forced alignment는 단어 경계를 ±10~30ms로 맞추고 Whisper 자체 timestamp는 ±100~300ms다. WhisperX VRAM preflight budget은 float16 5.0GB, int8_float16 3.5GB, int8 3.0GB(작은 모델은 축소). 원격 MCP 첫 호출의 모델 다운로드는 약 2.3GB. diarization 가중치 약 600MB.
- **디스크**: torch cu128 wheel은 Linux 약 0.83GiB(+`nvidia-*` 수 GiB), Windows 약 3.2GiB. prompt cache는 voice당 약 10KB.
- **언어 카탈로그**: 646개 언어, 학습 데이터 총 58만 1천 시간. `docs/languages.md`가 언어별 ID, ISO 639-3, 시간을 표로 싣는다(예: Assamese 270.85시간, Afrikaans 4.4시간).
- **채택**: 2026-04-09 생성 후 5개월에 star 26,641, fork 3,286. README의 Trendshift 배지와 star history 차트가 이를 보여준다.
- **hosted 서비스와의 정성 비교** (README):

| 항목 | VoiceStudio | 일반 hosted voice 서비스 |
|---|---|---|
| 적합 | 사설, 오프라인, self-host, 대량 작업 | 로컬 모델 관리 없는 빠른 시작 |
| 데이터 경로 | 기본 로컬, 원격은 opt-in | 오디오와 텍스트를 provider가 처리 |
| 비용 | 무료 소프트웨어, 하드웨어는 사용자 부담 | 구독, credit, 계량 API |
| 오프라인 | 필요한 모델 설치 후 가능 | 대개 네트워크 필요 |
| 커스터마이즈 | 소스, 엔진, 모델, API, routing 개방 | provider 옵션으로 제한 |
| 유지 관리 | 사용자가 갱신, 디스크, 컴퓨트 관리 | provider가 인프라 관리 |

- **샘플 출력**: README는 voice cloning(`demo_voice.wav`와 `demo_clone_output.wav`), voice design(US 뉴스 앵커, UK 오디오북 내레이터), 4개 언어 dubbing(스페인어, 프랑스어, 일본어, 중국어) 샘플 파일을 `backend/assets/samples/`에 둔다. 수치 평가는 없다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **베타와 재작성 중.** README가 active beta를 경고하고 Electron 재작성이 진행 중이라 데스크톱 앱 issue와 PR을 받지 않는다. Tauri 기반 아키텍처 설명은 재작성 후 바뀔 수 있다.
- **플랫폼 공백.** Intel Mac은 로컬 backend 불가(remote backend만), Windows AMD와 Intel GPU는 CPU, ROCm은 Linux 전용, Docker는 `linux/amd64`만, Wayland 받아쓰기는 기본 복사 전용이다. `torch.compile`은 일반 Windows에서 건너뛴다.
- **라이선스 층위.** 앱은 AGPL-3.0이지만 기본 가중치가 CC-BY-NC라 상업 사용은 선택한 모델 조건을 따로 검토해야 한다. IndexTTS의 Bilibili 조건, PocketTTS의 gated 접근, `audiocpp`의 research 전용 가중치가 개별 예외다. AGPL은 수정본을 네트워크 서비스로 제공할 때 소스 공개를 요구한다.
- **검증된 벤치마크 없음.** RTF와 VRAM 표는 비어 있고 TTS 품질 평가(WER, SIM-o, UTMOS) 결과도 문서에 없다. 엔진 비교표의 "품질"은 job map의 정성 배정이다.
- **표현 제어의 미완.** 기본 엔진에 `[breath]`와 강도 제어가 없고 `[happy]` 같은 감정 태그를 받지 않으며 ElevenLabs 태그를 붙이면 출력이 나빠진다. 엔진 중립 태그 문법, emotion reference clip picker, Voice 페이지의 Expression panel은 spec만 있고 출시 전이며 날짜 약속이 없다. 자유 텍스트 instruct는 UI가 아니라 API로만 가능하다.
- **voice design의 고정 어휘.** 어휘 밖 서술은 무시되고 영어와 중국어로 학습되어 저자원 언어에서 불안정하다.
- **메모리 제약.** 6GB VRAM floor 아래 카드는 paging으로 매우 느리고, timeout된 생성은 Python에서 kill할 수 없어 끝날 때까지 VRAM을 쥔다. Apple Silicon은 한 번에 한 생성이다.
- **원격 worker의 부분 이식.** TTS, 오디오북 챕터, dub segment만 원격이고 ASR, diarization, 번역은 로컬이며 나머지는 하나씩 이식 중이다. `POST /workers/tasks`는 개발 전용이고 사라질 API다. inbound 모드는 연결 문자열이 admission 전체이고 그 비밀성은 네트워크에 달려 있다.
- **인증 모델의 거칠기.** API key는 route별 서비스 토큰이 아니라 root 자격이라 소비 전용 접근을 주려면 별도 인스턴스나 proxy allowlist가 필요하다. MCP 전송은 인증되지 않는다.
- **dubbing 비용.** Cinematic과 Autofit은 LLM이 필요하고 reflect pass는 segment당 3회 호출이라 긴 영상에서 느린 provider에는 끄라고 권한다. diarization은 HF gated 라이선스가 필요하고 fallback heuristic은 비슷한 화자를 합친다.
- **공석 직무.** "가장 빠른 CPU 렌더와 최저 지연"은 job map에서 공석(#1306)이다.
- **발신 전화 보류.** PSTN은 유료 carrier 없이 완전 로컬 경로가 없어 미뤄졌다.
- **자료의 한계.** README와 docs 원문뿐이라 router와 service 구현, adapter 인터페이스의 정확한 시그니처, 테스트 통과율은 확인할 수 없다. 스크린샷 일부(fig03)는 OmniVoice-Studio v0.3.9 시절 화면이라 현재 UI와 다를 수 있다.

## 6. 관련 연구 (Related Work)

- **상류 구성 요소** (README Acknowledgments): OmniVoice(k2-fsa), WhisperX(m-bain), Demucs(facebookresearch), Pyannote, CTranslate2(OpenNMT), AudioSeal(facebookresearch), Tauri, Supertonic(Supertone), Sherpa-ONNX(k2-fsa), GPT-SoVITS(RVC-Boss), PocketTTS(Kyutai). 번역은 Argos Translate, NLLB-200, deep_translator.
- **speech platform 설계 조사의 참조 프로젝트**: Handy, WhisperLiveKit, RealtimeSTT, sherpa-onnx, FunASR, Vexa, Voquill, Muesli, Herdr.
- **에이전트 프레임워크 연동**: pipecat, LiveKit Agents. 스킬 배포는 skills.sh 호환 `npx skills add`.
- **wiki 내부 관련 페이지**: [[applications/colbymchenry-codegraph]]는 같은 local-first + MCP 서버 패턴으로 코딩 에이전트에 로컬 자원을 노출하는 도구다. [[agents/rodrigues-2026-mcp-server-architecture-patterns]]는 MCP 서버 설계 패턴을 다루며 VoiceStudio의 output mode와 base path 경계가 그 사례다. [[agents/mattpocock-skills]]는 VoiceStudio가 스킬 배포에 쓰는 skills.sh 생태계다. [[applications/cheahjs-free-llm-api-resources]]는 hosted TTS와 Whisper API의 무료 quota를 정리해 로컬 실행의 대안 비용을 보여준다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| zero-shot voice cloning | reference clip을 학습 데이터가 아니라 프롬프트로 써서 추가 학습 없이 그 목소리로 합성하는 방식. clip은 timbre뿐 아니라 전달 방식도 옮긴다 |
| voice design | reference audio 없이 성별, 연령, 음높이, 스타일, accent, 방언 속성 문자열(`instruct`)로 voice를 만드는 모드 |
| RTF (real-time factor) | 생성 오디오 1초당 소요된 compute 초. 1 미만이면 실시간보다 빠르다 |
| forced alignment | ASR 전사 뒤 wav2vec2로 단어 경계를 오디오에 다시 맞춰 timestamp 정밀도를 ±10~30ms로 올리는 pass. WhisperX가 dubbing lip-sync에 쓴다 |
| diarization | 한 오디오 stream을 화자별 track으로 나누는 처리. pyannote + WhisperX 조합 |
| sidecar venv | 부모 앱의 `torch`/`transformers` 고정과 충돌하는 엔진을 위해 첫 사용 시 만드는 전용 가상환경. `SubprocessBackend` adapter로 격리 실행 |
| GGUF | llama.cpp 계열의 양자화 가중치 파일 포맷. OmniVoice GGUF 엔진이 native 바이너리로 로드한다 |
| control sidecar | 데스크톱 앱에 번들된 Rust 프로세스(포트 3902). 마이크 활성화, 대상 창 포착, 클립보드 보존, native 삽입을 담당 |
| remote backend / remote workers | 전자는 앱 전체를 GPU 머신으로 옮기고 데스크톱을 thin client로 쓰는 방식, 후자는 앱은 로컬에 두고 개별 task만 다른 GPU에 보내는 방식 |
| inbound node mode | GPU 머신이 listen하고 API key를 가진 panel이 연결하는 remote worker 변형. 한 GPU를 여러 사람이 shell 접근 없이 나눠 쓰기 위한 것 |
| share PIN | LAN sharing을 켤 때마다 생성되는 6자리 소비 자격. HTTP만 gate하고 관리 표면과 WebSocket은 열지 못한다 |
| trusted networks | `OMNIVOICE_TRUSTED_NETWORKS`의 CIDR 목록. 그 안의 클라이언트는 소비 gate를 면제받지만 관리 표면은 열리지 않는다 |
| job map | 엔진 채택 기준. 각 직무의 보유 엔진을 하나로 두고, 새 엔진은 직무를 빼앗거나 공석을 채워야 한다 |
| mark_synthetic | 모든 합성 오디오가 지나야 하는 단일 chokepoint. AudioSeal watermark를 여기서 심는다 |
| .ovsvoice | voice identity, 옵션 reference clip, consent 증명, SPDX 라이선스, watermark된 preview를 담은 ZIP persona 포맷 |
| Autofit | dubbing 번역 quality의 하나. LLM이 각 줄을 segment slot의 낭독 시간 안에 들어가도록 재작성한다 |
| reflect pass | LLM 번역 engine에서 segment마다 초안을 비평하고 자연스러운 구어로 다시 쓰는 추가 단계. segment당 호출이 3회가 된다 |
| Model Catalogue | TTS, ASR, LLM 모델을 설치, 제거, 선택, routing하는 앱 내 화면. 엔진 호환 매트릭스와 디스크 내역을 보여준다 |

## 8. 그림 후보 (Figure Candidates)

repo 유형이므로 자동 추출은 하지 않았고, README 본문이 참조하는 이미지와 `docs/`의 스크린샷 중 도식 성격이 있는 것을 GitHub URL로 기록했다. 로고, 배지, 다운로드 버튼 이미지는 도식이 아니라 제외했다. README의 아키텍처 도식은 텍스트 블록이라 본문에 코드로 옮긴다.

| id | 원본 경로 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | `docs/media/0.5.0/catalogue.png` | "Model Catalogue의 엔진 호환 매트릭스" | manual | ★ wiki 확정 (엔진 registry의 실물) |
| fig02 | `docs/media/0.5.0/gallery-save.png` | "Voice Gallery의 archetype 카드" | manual | ★ wiki 확정 (voice design 속성이 카드로 보임) |
| fig03 | `docs/screenshot-dub.png` | "Dubbing 워크스페이스 6단계" | manual | ★ wiki 확정 (dubbing 파이프라인, 단 v0.3.9 화면) |
| fig04 | `docs/media/0.5.0/quick-switch.gif` | "상태바 엔진 전환 애니메이션" | manual | 제외 (2.3MB GIF, catalogue 스크린샷과 정보 중복) |
| fig05 | star-history.com SVG | "star 성장 곡선" | manual | 제외 (수치는 본문에 있음) |
