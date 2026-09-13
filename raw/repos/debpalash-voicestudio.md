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
---

> 수집 메모: 사용자의 명시적 URL 지시에 따라 `raw.githubusercontent.com/debpalash/VoiceStudio/main/README.md` 를 그대로 받아 저장했다 (CLAUDE.md rule #1 의 자료 수집 예외). README 는 제품 개요와 엔진 표, API 요약을 담고 있으나 아키텍처 세부, 엔진 채택 기준, MCP 와 speech platform 프로토콜, 원격 worker 와 인증 경계, 성능 튜닝은 같은 저장소의 `docs/` 에 흩어져 있어, 문서 페이지 29 편과 `AGENTS.md`, `LICENSE-NOTICE.md` 를 원문 그대로 아래 부록에 이어 붙였다. 본문은 요약, 번역, 윤문하지 않았다. 수집 시각 2026-09-14. 저장소 생성 2026-04-09, 최종 push 2026-09-11, star 26,641, fork 3,286, 최신 릴리스 v0.5.2 (2026-09-10), 홈페이지 voicestudio.sh, 이전 이름 OmniVoice-Studio.

---

<div align="center">

  <h3>NOTE: Electron Rewrite Ongoing: Please dont't create desktop app related issues and pr</h3>
 
  <p><img src="docs/logo.png" alt="VoiceStudio logo" width="120" height="120" /></p>
  <h1>VoiceStudio</h1>
  <p>
    <a href="https://trendshift.io/repositories/28176?utm_source=repository-badge&amp;utm_medium=badge&amp;utm_campaign=badge-repository-28176" target="_blank" rel="noopener noreferrer"><img src="https://trendshift.io/api/badge/repositories/28176" alt="VoiceStudio ranking on Trendshift" width="220" height="48" /></a>
  </p>
  <p><sub>Previously OmniVoice-Studio</sub></p>
  <h3>Clone voices, dub video, dictate, and produce long-form audio on your own hardware.</h3>
  <p>16 TTS engines · 11 ASR engines · 646-language catalogue · macOS, Windows, Linux, and Docker</p>
  <p>No account, API key, subscription, or usage meter for the local workflow.</p>

  <p>
    <a href="#install">Install</a> ·
    <a href="#features">Features</a> ·
    <a href="#comparison">Compare</a> ·
    <a href="#requirements">Requirements</a> ·
    <a href="#hardware-recommendations">Hardware</a> ·
    <a href="#engines">Engines</a> ·
    <a href="#architecture">Architecture</a> ·
    <a href="#api">API</a> ·
    <a href="#documentation">Docs</a> ·
    <a href="#faq">FAQ</a> ·
    <a href="README_CN.md"><strong>简体中文</strong></a>
  </p>

  <p>
    <a href="https://github.com/debpalash/VoiceStudio/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/debpalash/VoiceStudio/ci.yml?branch=main&style=flat-square&label=CI" alt="CI status" /></a>
    <a href="https://github.com/debpalash/VoiceStudio/stargazers"><img src="https://img.shields.io/github/stars/debpalash/VoiceStudio?style=flat-square&color=f59e0b" alt="GitHub stars" /></a>
    <a href="https://github.com/debpalash/VoiceStudio/releases"><img src="https://img.shields.io/github/downloads/debpalash/VoiceStudio/total?style=flat-square&color=8b5cf6&label=downloads" alt="Total downloads" /></a>
    <a href="https://github.com/debpalash/VoiceStudio/releases/latest"><img src="https://img.shields.io/github/v/release/debpalash/VoiceStudio?style=flat-square&color=10b981" alt="Latest release" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-AGPL--3.0-blue?style=flat-square" alt="AGPL-3.0 license" /></a>
    <a href="https://discord.gg/bzQavDfVV9"><img src="https://img.shields.io/badge/Discord-Community-5865F2?style=flat-square&logo=discord&logoColor=white" alt="Discord community" /></a>
  </p>

  <p>
    <a href="https://github.com/debpalash/VoiceStudio/releases/latest"><img src="https://img.shields.io/badge/Download-macOS_·_Windows_·_Linux-10b981?style=for-the-badge" alt="Download VoiceStudio" /></a>
  </p>
</div>

<div align="center">
  <img src="docs/media/0.5.0/quick-switch.gif" alt="Switching TTS engines from the VoiceStudio status bar" width="100%" />
</div>

> [!WARNING]
> **Active beta.** Use the [latest release](https://github.com/debpalash/VoiceStudio/releases/latest) for stable work. `main` contains the newest fixes and may change between releases. Report problems through [GitHub Issues](https://github.com/debpalash/VoiceStudio/issues).

## At a glance

| | VoiceStudio |
|---|---|
| **Workflows** | Voice cloning and design, video dubbing, dictation, stories, audiobooks, batch generation |
| **Language catalogue** | 646 TTS languages; actual coverage and quality depend on the selected engine |
| **Engines** | 16 TTS · 11 ASR · switch in Model Catalogue or with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>E</kbd> |
| **Platforms** | macOS 13.3+ on Apple Silicon · Windows 10/11 x64 · Linux x86_64 with glibc 2.39+ |
| **Compute** | CUDA · Apple Silicon MPS/MLX · ROCm on Linux · CPU · optional remote workers |
| **Interfaces** | Desktop app · local REST/SSE/WebSocket API · OpenAI-compatible audio API · MCP Server |
| **Storage** | Voices, projects, settings, and outputs stay on the machine by default |
| **License** | AGPL-3.0 application; downloaded models keep their upstream terms |

The Voice workspace starts with three tabs: **From audio** for cloning, **By design** for creating a voice, and **Convert** for speech-to-speech conversion. Each tab displays its own workflow, with Synthesize Audio or Convert pinned below the scrolling form. The top-bar **Engines** panel combines engine selection, loaded models, and unload/flush controls; <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>E</kbd> opens it. The searchable language picker shares Dubbing’s flags and language list layout, selects one output language, and retains Auto and the full cloning catalogue. Language options flow into multiple columns when space allows. Expand **Workspaces** in the sidebar to reveal navigation labels; Escape collapses it.

Dubbing starts with file upload or URL import and nearby language choices. Its **Projects** panel lists previous dubs so they can be reopened by clicking anywhere on a card; action buttons operate independently. Advanced import options include captions and optional YouTube sign-in. Dubbing places playback controls over the video with background blur and combines the waveform and timed transcript in one compact editing surface. Drag the zoomed waveform left or right to pan; click to seek. Translation language and ISO-code controls stay synchronized; Auto clears any previous language code and dialect. Transcript items group editable text, timing and status, and voice controls into three readable rows that wrap with the panel width. Output Options stays compact with the active settings shown in its summary; expand it to change output, timing, or voice matching. Transcript, glossary, and paste controls share a toolbar above the segment editor. Project details, workflow steps, and Generate/Verify/Export actions use an unfilled header.

The Audiobook Script editor fills the available workspace beneath its markup toolbar; Voices and Book settings stay in their own tabs.

Output settings use aligned rows; review status appears before the collapsible transcript and glossary. Glossary terms have labelled entry fields and an explicit edit action. Launchpad arranges recent files and saved voices side by side when space allows, with responsive card grids and visible Open actions.

The casting board shows icon-based voice cards and searchable selectors for each speaker. Drag a card onto a speaker or choose a voice from that speaker’s menu.

<a id="install"></a>

## Install

Download a package from the [latest release](https://github.com/debpalash/VoiceStudio/releases/latest), then follow the platform guide.

| Platform | Package | Guide |
|---|---|---|
| macOS 13.3+ | Apple Silicon DMG | [Install on macOS](docs/install/macos.md) |
| Windows 10/11 | x64 MSI; choose the current-user build when listed to install without admin access | [Install on Windows](docs/install/windows.md#install-pre-built-msi) |
| Linux | AppImage, x86_64 with glibc 2.39+ | [Install on Linux](docs/install/linux.md) |
| Docker | Linux/AMD64 images; CUDA, ROCm, CPU, and worker-only GPU profiles | [Run with Docker](docs/install/docker.md) |

First launch creates a managed Python environment and downloads the default model. Later launches reuse both.

> [!NOTE]
> On macOS, first launch needs a one-time right-click, then **Open** approval. Intel Macs cannot run the local Python backend; use a [remote backend](docs/install/macos.md) instead.

### Quick Docker run

The published images are **`linux/amd64` only**. On Apple Silicon, use the
[native macOS app](docs/install/macos.md) for GPU acceleration. ARM64 hosts
should read the [architecture requirements](docs/install/docker.md#architecture)
before pulling an image.

```bash
docker run -d -p 127.0.0.1:3900:3900 -v omnivoice-data:/app/omnivoice_data --name voicestudio palashdeb/omnivoice-studio:stable
```

### First voice

1. Launch VoiceStudio and open **Voice Cloning**.
2. Add a clean voice sample. Three seconds works; 5 to 15 seconds usually gives a better prompt.
3. Enter text, choose a language, then select **Generate**.

> [!TIP]
> **Try without installing:** Run VoiceStudio in the cloud via the [Google Colab notebook](https://colab.research.google.com/github/debpalash/VoiceStudio/blob/main/notebooks/OmniVoice_Studio_Colab.ipynb). Explore audio quality comparisons in [benchmarks](docs/benchmarks.md) and prompt design tips in [expressive speech](docs/expressive-speech.md).

### Audio samples

Listen to sample outputs produced locally with VoiceStudio:

| Workflow | Prompt / Reference Audio | Generated Audio |
|---|---|---|
| **Voice Cloning** | [demo_voice.wav](backend/assets/samples/demo_voice.wav) | [demo_clone_output.wav](backend/assets/samples/demo_clone_output.wav) |
| **Voice Design** (US News Anchor) | *"Clear, authoritative American broadcast tone"* | [demo_voice_design_us_news_anchor.wav](backend/assets/samples/voice_design/demo_voice_design_us_news_anchor.wav) |
| **Voice Design** (UK Audiobook) | *"Warm, expressive British storytelling voice"* | [demo_voice_design_audiobook_uk_narrator.wav](backend/assets/samples/voice_design/demo_voice_design_audiobook_uk_narrator.wav) |
| **Video Dubbing** (Multilingual) | [source.src.wav](backend/assets/samples/demo/dubbing/source.src.wav) | [Spanish](backend/assets/samples/demo/dubbing/dubbed_es.src.wav) · [French](backend/assets/samples/demo/dubbing/dubbed_fr.src.wav) · [Japanese](backend/assets/samples/demo/dubbing/dubbed_ja.src.wav) · [Chinese](backend/assets/samples/demo/dubbing/dubbed_zh.src.wav) |

### Run from source

Install the [development prerequisites](.github/CONTRIBUTING.md#development-setup) (Node 20+/Bun and Python 3.11+), then:

```bash
git clone https://github.com/debpalash/VoiceStudio.git
cd VoiceStudio
bun install
bun run desktop
```

The desktop launcher configures Python dependencies on first run via `uv` automatically. Use `bun run dev` for the browser UI. See [Contributing](.github/CONTRIBUTING.md) for services, tests, and platform packages.

### If setup fails

- Run **Settings → About → Run self-check** or `uv run python backend/main.py --diagnose --deep`.
- Check [install troubleshooting](docs/install/troubleshooting.md).
- Save a scrubbed diagnostic bundle from the app when opening an issue.
- For slow generation, compare [measured benchmarks](docs/benchmarks.md) and [performance settings](docs/performance.md).

<a id="features"></a>

## Features

| Area | Included |
|---|---|
| **Voice Cloning** | Zero-shot synthesis from a short reference clip ([guide](docs/engines/README.md)) |
| **Voice Design** | Create a voice from age, accent, pitch, style, and delivery instructions ([expressive speech](docs/expressive-speech.md)) |
| **Video Dubbing** | Transcribe, translate, preserve speakers, synthesize, and export video; compact translation settings include track selection, and completed dubs flag timing issues for review ([export guide](docs/dubbing/export.md)) |
| **Stories and audiobooks** | Multi-voice scripts · EPUB/PDF import · chapter rendering · `.m4b` export |
| **[Dictation Widget](docs/features/dictation.md)** | System-wide shortcut, live transcription, optional local-LLM cleanup |
| **Vocal Isolation** | Demucs speech/background separation |
| **Speaker Diarization** | Pyannote and WhisperX speaker assignment ([guide](docs/features/diarization.md)) |
| **Batch Queue** | Queue large sets of audio and video jobs with per-job progress, or watch a local folder for new videos |
| **Model Catalogue** | Install, remove, select, and route TTS, ASR, and LLM models ([catalogue](docs/engines/README.md)) |
| **Remote Model Downloads** | Install models on enrolled remote workers with live progress ([guide](docs/downloading-models.md)) |
| **GPU Auto-Detect** | CUDA, MPS, ROCm, and CPU routing with per-engine checks ([performance](docs/performance.md)) |
| **AI Watermark** | AudioSeal embedding and detection |
| **MCP Server** | Synthesis and transcription tools for MCP clients ([guide](docs/mcp.md)) |
| **Diagnostics** | Self-checks, error journal, logs, and scrubbed support bundles ([troubleshooting](docs/install/troubleshooting.md)) |
| **Local-first** | Core creation stays local; network-backed features are explicit opt-ins |
| **Extensible** | Registry-based TTS, ASR, and plugin interfaces ([acceptance](docs/engine-acceptance.md)) |

<table>
<tr>
  <td width="50%"><img src="docs/media/0.5.0/catalogue.png" alt="VoiceStudio Model Catalogue" width="100%" /></td>
  <td width="50%"><img src="docs/media/0.5.0/gallery-save.png" alt="Saving a gallery voice as a local profile" width="100%" /></td>
</tr>
<tr>
  <td align="center"><sub>Model Catalogue: engine, device, and install state</sub></td>
  <td align="center"><sub>Gallery: save a shared voice as a local profile</sub></td>
</tr>
</table>

<a id="comparison"></a>

## Comparison

VoiceStudio trades managed cloud compute for local control. This is the practical difference:

| | **VoiceStudio** | **Typical hosted voice service** |
|---|---|---|
| **Best fit** | Private, offline, self-hosted, or high-volume work | Fast setup without local model management |
| **Data path** | Local by default; remote features are opt-in | Audio and text are processed by the provider |
| **Cost model** | Free software; you supply the hardware | Subscription, credits, or metered API use |
| **Setup** | Install the app and model weights | Create an account and use the web app or API |
| **Performance** | Depends on your engine and hardware | Provider manages compute and scaling |
| **Offline use** | Yes, after required models are installed | Usually requires a network connection |
| **Customization** | Source, engines, models, API, and routing are open | Limited to provider options |
| **Maintenance** | You manage updates, disk, and compute | Provider manages infrastructure |

<a id="requirements"></a>

## Requirements

Requirements vary by engine. These values cover the default local workflow.

| | **Minimum** | **Recommended** |
|---|---|---|
| **OS** | Windows 10 x64 · macOS 13.3 Apple Silicon · Linux x86_64 with glibc 2.39+ | Current supported OS release |
| **RAM** | 8 GB | 16 GB+ |
| **Disk** | 10 GB free | 20 GB+ SSD |
| **GPU** | Optional; CPU mode is supported | NVIDIA CUDA or Apple Silicon |
| **VRAM** | 4 GB when using a GPU | 8 GB+; large optional engines need more |
| **Python from source** | 3.11+ | 3.11 or 3.12 |

ROCm is Linux-only and opt-in. Windows AMD/Ryzen AI uses CPU. Systems with limited VRAM offload work to CPU when required. See [performance](docs/performance.md), [benchmarks](docs/benchmarks.md), and [engine disk usage](docs/engines/disk-usage.md).

<a id="hardware-recommendations"></a>

### Recommended stack by hardware

| Hardware | Recommended TTS | Recommended ASR | Why |
|---|---|---|---|
| **Apple Silicon (M1–M4)** | [MLX-Audio](docs/engines/mlx-audio.md) · [OmniVoice](docs/engines/omnivoice.md) (MPS) | [MLX Whisper](docs/engines/mlx-whisper.md) · [Parakeet MLX](docs/engines/parakeet-mlx.md) | Native unified memory, lowest latency on macOS |
| **NVIDIA GPU (8 GB+ VRAM)** | [OmniVoice](docs/engines/omnivoice.md) · [CosyVoice 3](docs/engines/cosyvoice.md) | [WhisperX](docs/engines/whisperx.md) | High-fidelity zero-shot cloning, word timestamps, diarization |
| **Low VRAM / CPU-only** | [PocketTTS](docs/engines/pockettts.md) · [Sherpa-ONNX](docs/engines/sherpa-onnx.md) · [KittenTTS](docs/engines/kittentts.md) | [Moonshine](docs/engines/moonshine.md) · [Faster-Whisper](docs/engines/faster-whisper.md) (`int8`) | Low memory footprint, optimized CPU inference |

<a id="engines"></a>

## Engines

Engine support is capability-specific. Check cloning, language, platform, memory, and license before choosing one. Full setup guides: [docs/engines](docs/engines/README.md).

<a id="tts-engines"></a>

### Text to speech

| Engine | Languages | Clone | Instruct | Linux | macOS ARM | Windows | License |
|---|:---:|:---:|:---:|:---:|:---:|:---:|---|
| [**VoiceStudio** (default, powered by k2-fsa/OmniVoice)](docs/engines/omnivoice.md) | 600+ | Yes | Yes | CUDA/CPU | MPS | CUDA/CPU | [AGPL-3.0](LICENSE) app · [Apache-2.0 code, CC-BY-NC weights](https://huggingface.co/k2-fsa/OmniVoice#license)³ |
| [**CosyVoice 3**](docs/engines/cosyvoice.md) | 9 + 18 dialects | Yes | Yes | CUDA/CPU | CPU | CUDA/CPU | Apache-2.0 |
| [**GPT-SoVITS**](docs/engines/gpt-sovits.md) | 5 | Yes | No | CUDA/CPU | No | CUDA/CPU | MIT |
| [**VoxCPM2**](docs/engines/voxcpm2.md) | 30 | Yes | Yes | CUDA/CPU | MPS | CUDA/CPU | Apache-2.0 |
| [**MOSS-TTS-Nano**](docs/engines/moss-tts-nano.md) | 20 | Yes | No | CUDA/CPU | CPU | CUDA/CPU | Apache-2.0 |
| [**KittenTTS**](docs/engines/kittentts.md) | English | No | No | CPU | CPU | CPU | MIT |
| [**MLX-Audio**](docs/engines/mlx-audio.md) | Model-dependent | Varies | Varies | No | MLX | No | Varies |
| [**Sherpa-ONNX**](docs/engines/sherpa-onnx.md) | 20+ | No | No | CUDA/CPU | CPU | CUDA/CPU | Apache-2.0 |
| [**IndexTTS 2.5** ⚡](docs/engines/indextts.md) | ZH · EN · JA · ES · AR | Yes | No | CUDA/CPU | CPU | CUDA/CPU | Bilibili model license¹ |
| [**OmniVoice GGUF** ⚡](docs/engines/omnivoice-gguf.md) | 600+ | Yes | Yes | CUDA/CPU | MPS/CPU | CUDA/CPU | [AGPL-3.0](LICENSE) app · [review the derivative model terms](https://huggingface.co/Serveurperso/OmniVoice-GGUF#license)³ |
| [**OmniVoice (subprocess; opt-in off MPS)** ⚡](docs/engines/omnivoice-subprocess.md) | 600+ | Yes | Yes | CUDA/CPU | MPS via default OmniVoice | CUDA/CPU | [AGPL-3.0](LICENSE) app · [Apache-2.0 code, CC-BY-NC weights](https://huggingface.co/k2-fsa/OmniVoice#license)³ |
| [**PocketTTS** ⚡](docs/engines/pockettts.md) | EN · FR · DE · PT · IT · ES | Yes | No | CPU | CPU | CPU | CC-BY-4.0, gated² |
| [**Supertonic 3** ⚡](docs/engines/supertonic3.md) | 31 | No | No | CPU | CPU | CPU | OpenRAIL-M |
| [**MOSS-TTS-v1.5** ⚡](docs/engines/moss-tts-v15.md) | 31 | Yes | No | CUDA/CPU | CPU | CUDA/CPU | Apache-2.0 |
| [**dots.tts** ⚡](docs/engines/dots-tts.md) | 24 | Yes | No | CUDA/CPU | CPU | No | Apache-2.0 |
| [**Confucius4-TTS** ⚡](docs/engines/confucius4-tts.md) | 14 | Yes | No | CUDA/CPU | CPU | CUDA/CPU | Apache-2.0 |

⚡ Installed or registered on demand.

¹ IndexTTS 2.5 requires a separate written Bilibili license above 100 million monthly active users or RMB 1 billion annual revenue. Review the [model license](https://huggingface.co/IndexTeam/IndexTTS-2.5/blob/main/LICENSE).

² PocketTTS shows its gated-access and CC-BY-4.0 terms before first use.

³ The OmniVoice snapshot also includes an audio tokenizer under separate [Boson Higgs Audio 2 and Meta Llama community terms](https://huggingface.co/k2-fsa/OmniVoice/blob/main/audio_tokenizer/LICENSE). VoiceStudio's application license does not replace model or tokenizer terms.

Clone-less engines cannot preserve a reference speaker in dubbing or pinned-voice batch jobs. VoiceStudio rejects those jobs instead of silently changing engines. Heavy engines have separate memory and platform limits; check their engine guide first.

<a id="asr-engines"></a>

### Speech to text

| Engine | ID | Languages | Best fit |
|---|---|:---:|---|
| [**WhisperX** (default)](docs/engines/whisperx.md) | `whisperx` | ~100 | Dubbing, subtitles, word-level timing |
| [**Faster-Whisper**](docs/engines/faster-whisper.md) | `faster-whisper` | ~100 | General cross-platform transcription |
| [**Faster-Whisper (isolated)**](docs/engines/faster-whisper-isolated.md) | `faster-whisper-isolated` | ~100 | Crash-isolated batch transcription |
| [**MLX Whisper**](docs/engines/mlx-whisper.md) | `mlx-whisper` | ~100 | Apple Silicon |
| [**PyTorch Whisper**](docs/engines/pytorch-whisper.md) | `pytorch-whisper` | ~100 | CUDA, MPS, and CPU fallback |
| [**Parakeet TDT**](docs/engines/nemo-parakeet.md) | `nemo-parakeet` | English + 25 EU | Fast CPU/CUDA transcription |
| [**Parakeet TDT v3 (MLX)**](docs/engines/parakeet-mlx.md) | `parakeet-mlx` | 25 EU | Apple Silicon dictation and word timestamps |
| [**Moonshine**](docs/engines/moonshine.md) | `moonshine` | English | Low-power, low-latency ONNX |
| [**FunASR**](docs/engines/funasr.md) | `funasr` | 50+ | VAD and inline diarization |
| [**sherpa-onnx** (live dictation)](docs/engines/sherpa-onnx-asr.md) | `sherpa-onnx-asr` | Model-dependent | Streaming CPU dictation |
| [**OpenAI-compatible** ⚠️ configured server](docs/engines/openai-compatible-asr.md) | `openai-compat-asr` | Server-dependent | Local gigastt/Qwen3-ASR or a remote endpoint; audio goes only to that server |

WhisperX and Faster-Whisper retry with `int8` when efficient `float16` is unavailable. Pin `ASR_COMPUTE_TYPE=int8` or `float32` only if automatic selection still fails.

<a id="architecture"></a>

## Architecture

```text
Tauri v2 desktop shell (Rust)
        │ IPC
React + Vite UI
        │ HTTP · SSE · WebSocket on localhost:3900
FastAPI backend
        ├── TTS / ASR engine registries
        ├── dubbing / audio / long-form pipelines
        ├── OpenAI-compatible API and MCP server
        └── SQLite + Alembic → omnivoice_data/
```

| Layer | Path | Responsibility |
|---|---|---|
| Desktop shell | `frontend/src-tauri/` | Window lifecycle, tray, shortcuts, updater, sidecar bootstrap |
| Frontend | `frontend/src/` | React UI, Zustand state, API and event clients, i18n |
| API | `backend/api/` | REST routes, schemas, auth boundaries, streaming |
| Core services | `backend/services/` | Generation, dubbing, audio processing, persistence |
| Engines | `backend/engines/` | Isolated and optional engine adapters |
| Worker system | `backend/worker/` | Authenticated remote compute and job transport |
| Data | `omnivoice_data/` | Projects, voices, settings, logs, and SQLite state |
| Delivery | `scripts/`, `deploy/`, `.github/workflows/` | Development, packaging, containers, releases, CI |

### Network boundary

- The desktop talks to a loopback-only backend on `localhost:3900`.
- Loopback API calls need no server key. Remote access requires a share PIN or API key.
- Remote workers and OpenAI-compatible ASR are opt-in. Loopback ASR may use HTTP and keeps audio on the machine; non-loopback endpoints require HTTPS, and redirects are not followed.
- Analytics is off until consent. If enabled, it sends allowlisted, content-free usage metadata. It never sends text, audio, file names, or projects.

<a id="api"></a>

## Local speech platform and OpenAI-compatible API

Point an OpenAI-compatible audio client at the local backend:

```diff
- base_url="https://api.openai.com/v1"
+ base_url="http://localhost:3900/v1"
```

| Endpoint | Purpose |
|---|---|
| `POST /v1/audio/speech` | TTS to `mp3`, `opus`, `aac`, `flac`, `wav`, or `pcm`; select a profile with `voice` and an engine with `model` |
| `POST /v1/audio/transcriptions` | STT to `json`, `text`, `verbose_json`, `srt`, or `vtt` |
| `WS /v1/audio/transcriptions/stream` | Live PCM/WebM transcription with partial, utterance, and session-final events |
| `GET /.well-known/voicestudio-speech` | Discover HTTP, WebSocket, MCP, and native dictation-control transports |
| `GET /v1/audio/voices` | List local voice profiles and engines |

```python
from openai import OpenAI

client = OpenAI(base_url="http://localhost:3900/v1", api_key="local")

with client.audio.speech.with_streaming_response.create(
    model="tts-1",
    voice="<profile-id>",
    input="Made on my own hardware.",
    response_format="wav",
) as response:
    response.stream_to_file("speech.wav")
```

```bash
# Quick test via cURL
curl http://localhost:3900/v1/audio/speech \
  -H "Content-Type: application/json" \
  -d '{"model": "tts-1", "input": "Made on my own hardware.", "voice": "default", "response_format": "wav"}' \
  --output speech.wav
```

The bundled Rust control sidecar lets Herdr, coding agents, VS Code, desktop apps,
and TUIs trigger the system-wide dictation flow or reuse its native text
insertion. See the [speech platform guide](docs/speech-platform.md). The full API
reference is in **Settings → OpenAPI Reference**. For LAN, Tailscale, or proxy
access, read [API authentication](docs/api-auth.md) before exposing the backend.

### Agent skills

Install the VoiceStudio skills for Claude Code, Codex, Cursor, and other [skills.sh](https://skills.sh)-compatible agents:

```bash
npx skills add debpalash/VoiceStudio
```

- `omnivoice`: synthesize speech and transcribe audio through local VoiceStudio.
- `oss-maintainer`: the repository's open-source maintenance workflow.

### Model Context Protocol (MCP)

VoiceStudio mounts an MCP server at `http://localhost:3900/mcp` for Claude Desktop, Cursor, and AI agents:

```json
{
  "mcpServers": {
    "voicestudio": {
      "url": "http://localhost:3900/mcp"
    }
  }
}
```

For clients requiring stdio transport, use the bundled local shim (`docs/mcp.json`):

```json
{
  "mcpServers": {
    "voicestudio": {
      "command": "python",
      "args": ["-m", "backend.mcp_shim"],
      "cwd": "/path/to/VoiceStudio"
    }
  }
}
```

See the [MCP guide](docs/mcp.md) for tools (`generate_speech`, `clone_voice`, `transcribe`), file streaming modes, and client bindings.

### Google Colab

[![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/debpalash/VoiceStudio/blob/main/notebooks/OmniVoice_Studio_Colab.ipynb)

The [notebook](notebooks/OmniVoice_Studio_Colab.ipynb) runs the app and web UI on a Colab GPU. Colab is remote compute, so uploaded audio and project data do not remain local to your machine.

<a id="documentation"></a>

## Documentation

| Need | Read |
|---|---|
| Install | [macOS](docs/install/macos.md) · [Windows](docs/install/windows.md) · [Linux](docs/install/linux.md) · [Docker](docs/install/docker.md) |
| Fix setup | [Troubleshooting](docs/install/troubleshooting.md) · [model downloads](docs/downloading-models.md) · [Hugging Face token](docs/setup/huggingface-token.md) |
| Choose an engine | [Engine guides](docs/engines/README.md) · [benchmarks](docs/benchmarks.md) · [expressive speech](docs/expressive-speech.md) |
| Tune hardware | [Performance](docs/performance.md) · [remote workers](docs/remote-workers.md) |
| Build integrations | [Speech platform](docs/speech-platform.md) · [Private production API](docs/production-private-api.md) · [API auth](docs/api-auth.md) · [MCP](docs/mcp.md) · [examples](examples/README.md) |
| Build VoiceStudio | [Contributing](.github/CONTRIBUTING.md) · [engine acceptance](docs/engine-acceptance.md) |
| Track changes | [Changelog](CHANGELOG.md) · [roadmap](docs/ROADMAP.md) · [latest release](https://github.com/debpalash/VoiceStudio/releases/latest) |
| Remove everything | [Uninstall guide](docs/install/uninstall.md) |

<a id="faq"></a>

## FAQ

<details>
<summary><strong>Does it work on Apple Silicon and Intel Macs?</strong></summary>

Apple Silicon is supported with MPS and MLX options. Intel Macs cannot run the local backend because current PyTorch wheels are unavailable; they can connect to a remote backend. See [macOS installation](docs/install/macos.md).
</details>

<details>
<summary><strong>How much VRAM do I need?</strong></summary>

A GPU is optional. Use 4 GB VRAM as the minimum for accelerated work and 8 GB+ for the default multi-stage workflow. Large optional engines can require 12 to 16 GB or more. Check the [benchmarks](docs/benchmarks.md) and engine guide.
</details>

<details>
<summary><strong>Why does a longer reference clip not always improve the clone?</strong></summary>

Cloning is zero-shot: the clip is a prompt, not training data. Use 5 to 15 seconds of one speaker, close to the microphone, without music, noise, or reverb. Match the tone and pace you want in the output. For training, see [data preparation](docs/data_preparation.md) and [training](docs/training.md).
</details>

<details>
<summary><strong>Can I use generated audio commercially?</strong></summary>

VoiceStudio's application license does not restrict generated audio, but it does not grant rights under a model's separate terms. The default OmniVoice repository labels its pretrained weights CC-BY-NC and includes a tokenizer under separate community terms. Review the selected model terms before commercial use.
</details>

<details>
<summary><strong>Does VoiceStudio collect data?</strong></summary>

Not unless you opt in. Analytics is off by default and skipping consent keeps it off. When enabled, the app sends allowlisted, content-free usage metadata. Text, audio, file names, voices, and projects are excluded. Change this at **Settings → Privacy**.
</details>

<details>
<summary><strong>How do I remove VoiceStudio and its data?</strong></summary>

Use `scripts/uninstall.sh` on macOS/Linux or `scripts\uninstall.ps1` on Windows. Both show a dry run before deletion. See the [uninstall guide](docs/install/uninstall.md) for every path.
</details>

## Community and contributing

- [GitHub Issues](https://github.com/debpalash/VoiceStudio/issues) for reproducible bugs and feature requests.
- [Discord](https://discord.gg/bzQavDfVV9) for setup help and project discussion.
- [Good first issues](https://github.com/debpalash/VoiceStudio/labels/good%20first%20issue) for a scoped starting point.
- [Contributing guide](.github/CONTRIBUTING.md) for setup, tests, and pull requests.

<p align="center">
  <a href="https://star-history.com/#debpalash/VoiceStudio&Date">
    <img src="https://api.star-history.com/svg?repos=debpalash/VoiceStudio&type=Date" alt="Star History Chart" width="100%" />
  </a>
</p>

## Support development

VoiceStudio is free and has no paid tier. Donations fund development and infrastructure.

[Ko-fi](https://ko-fi.com/debpalash) · [PayPal](https://paypal.me/palashCoder) · [Sponsorship details](SPONSORS.md)

## Responsible use and safety

VoiceStudio enables zero-shot voice cloning and speech generation on personal hardware. Please use it responsibly:
- **Consent:** Only clone or synthesize voices with explicit permission from the speaker.
- **Audio provenance:** VoiceStudio integrates [AudioSeal](https://github.com/facebookresearch/audioseal) imperceptible watermarking by default to detect and identify synthetic speech without altering sound quality.
- **Local privacy:** For the default local workflow, audio recordings, transcripts, voices, and projects remain strictly on your local disk; data leaves your device only when you explicitly configure remote workers or external ASR endpoints.

## License

VoiceStudio is licensed under [AGPL-3.0](LICENSE). You may run it, modify it, and use it internally. The application license itself does not restrict selling generated audio, but downloaded model and tokenizer terms may. If you modify VoiceStudio and provide that modified version as a network service, AGPL requires you to offer the corresponding source under the same license. A commercial license for VoiceStudio-owned code is available for proprietary embedding; it does not relicense third-party models. Contact **VoiceStudio@palash.dev**. See [LICENSE-NOTICE.md](LICENSE-NOTICE.md) for the plain-language scope.

Optional engines and downloaded models retain their own licenses. The bundled `omnivoice/` Python code is Apache-2.0 upstream; the default downloaded weights and audio tokenizer use separate terms.

## Acknowledgments

VoiceStudio builds on [OmniVoice](https://github.com/k2-fsa/OmniVoice), [WhisperX](https://github.com/m-bain/whisperX), [Demucs](https://github.com/facebookresearch/demucs), [Pyannote](https://github.com/pyannote/pyannote-audio), [CTranslate2](https://github.com/OpenNMT/CTranslate2), [AudioSeal](https://github.com/facebookresearch/audioseal), [Tauri](https://tauri.app), [Supertonic](https://huggingface.co/Supertone/supertonic-3), [Sherpa-ONNX](https://github.com/k2-fsa/sherpa-onnx), [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS), and [PocketTTS](https://kyutai.org).

<div align="center">
  <strong><a href="https://github.com/debpalash/VoiceStudio/releases/latest">Download VoiceStudio</a></strong> ·
  <a href="https://github.com/debpalash/VoiceStudio">Star the project</a> ·
  <a href="https://discord.gg/bzQavDfVV9">Join Discord</a>
</div>

---

# 부록: 저장소 문서 페이지 원문 (docs/ 및 루트 문서)

---

## `docs/STRUCTURE.md`

# Project Structure

Every folder has a single job. Every file at the root earns its place.

## Layout

```
VoiceStudio/
│
├── README.md / README_CN.md     ⟵ user-facing overview (English / Chinese)
├── CHANGELOG.md                 ⟵ release history; release.yml extracts the tag's section verbatim
├── CLAUDE.md / AGENTS.md        ⟵ the working contract for AI agents — keep the two in sync
├── LICENSE, LICENSE-NOTICE.md, SPONSORS.md
│
├── pyproject.toml               ⟵ Python project manifest (+ pytest / lint config)
├── uv.lock                      ⟵ Python lockfile
├── package.json                 ⟵ monorepo manifest (Bun workspaces + Turborepo)
├── bun.lock                     ⟵ JS lockfile — repo-root, covers frontend/ too
├── turbo.json                   ⟵ turborepo pipeline
│
├── .coderabbit.yaml             ⟵ CodeRabbit PR review config (fed CLAUDE.md)
├── greptile.json                ⟵ Greptile PR review config (fed CLAUDE.md)
├── skills-lock.json             ⟵ pins the sources + hashes of .agents/skills/
├── .gitleaks.toml               ⟵ secret-scan config
├── .gitmodules                  ⟵ omnivoice-gallery submodule
├── .python-version
├── .dockerignore                ⟵ Docker build context filter
├── backend.spec                 ⟵ pyinstaller spec (stays at root by pyinstaller convention)
├── alembic.ini                  ⟵ DB migration config (stays at root by alembic convention)
│
├── .gitignore                   ⟵ a repo-local .env stays ignored, but user config is NOT
│                                   kept here: the durable env file is ~/.config/omnivoice/env
│                                   (backend/core/user_env.py), written by the Settings panel
│
├── backend/                     ⟵ FastAPI server
│   ├── main.py                  the one entry point; its boot order is load-bearing —
│   │                            read the comments before reordering anything
│   ├── api/routers/             39 routers, auto-included; thin HTTP/WS surface
│   │   └── setup/               first-run wizard, model download
│   ├── core/                    config, db, job queue, event bus, auth/CSRF, path security,
│   │                            opt-in analytics, version, diagnostics
│   ├── services/                78 modules of business logic — TTS, dubbing pipeline,
│   │                            audio DSP, GPU gateway, engine routing, model lifecycle
│   ├── engines/                 per-engine adapters: indextts, supertonic3, confucius4,
│   │                            dots_tts, moss_tts_v15, pockettts, audiocpp,
│   │                            omnivoice_gguf, omnivoice_subprocess, _asr_sidecar, _echo,
│   │                            voxcpm2_subprocess, moss_tts_nano_subprocess, cosyvoice_subprocess
│   ├── worker/                  remote / distributed workers — scheduler, pool, routing,
│   │                            breaker, capacity, plus protocol/ and inbound/
│   ├── mcp_shim/                MCP server entry point (docs/mcp.md)
│   ├── speech_client/           speech sidecar client entry point
│   ├── schemas/                 pydantic request/response shapes
│   ├── migrations/versions/     alembic revisions — every schema change goes through here
│   ├── plugins/                 plugin drop-in point (see services/plugin_sdk.py)
│   ├── hooks/                   pyinstaller runtime hooks
│   ├── config/models.yaml       model catalogue
│   └── tests/                   the isolated pytest session — see "Where tests live"
│
├── frontend/                    ⟵ React 19 + Vite + Tauri desktop
│   ├── package.json             THE app version — every other version file mirrors it
│   ├── src/
│   │   ├── pages/               one file per top-level view
│   │   ├── components/          reusable UI (+ audiobook/ clone/ dub/ gallery/ settings/ …)
│   │   ├── ui/, lib/            shared primitives and helpers
│   │   ├── api/                 typed API clients, one per router group
│   │   ├── store/               Zustand slices (+ persisted-state migrations)
│   │   ├── hooks/               custom React hooks
│   │   ├── i18n/locales/        the ONLY home for user-facing strings
│   │   ├── config/, data/, assets/, utils/
│   │   └── test/                vitest setup + visual-test helpers
│   ├── e2e/, e2e-perf/, e2e-prod/   Playwright suites: functional, perf, packaged bundle
│   ├── src-tauri/               Rust desktop shell — backend spawn/bootstrap, updater
│   │   │                        channel, dictation shortcut, crash/reset/uninstall
│   │   ├── capabilities/, icons/, wix/, debian/, appimage/   packaging inputs
│   │   └── tests/
│   └── public/
│
├── omnivoice/                   ⟵ the underlying TTS model package
│   ├── models/
│   ├── cli/                     CLI entry points (omnivoice-infer, etc.)
│   ├── data/                    data utilities used by the model
│   ├── eval/                    evaluation scripts
│   ├── scripts/                 one-off utilities that ship with the package
│   ├── training/
│   └── utils/
│
├── tests/                       ⟵ the main pytest session (testpaths in pyproject.toml)
│   ├── conftest.py              hermetic OMNIVOICE_DATA_DIR — never touches real app state
│   ├── backend/, scripts/       mirrors of the source trees they cover
│   ├── smoke/                   fast end-to-end checks (own CI job, HF_HUB_OFFLINE=1)
│   ├── evals/                   quality evals (evals.yml)
│   ├── probe/, fixtures/
│   └── frontend/                Node-based frontend tests (legacy; vitest is the default)
│
├── scripts/                     ⟵ dev / build / release scripts (shell, python, mjs)
│   ├── install.sh / install.ps1 universal installers
│   ├── desktop-*.mjs            dev, prod and fresh desktop launchers
│   ├── smoke-test.sh            end-to-end validation
│   ├── check-docs-drift.py      the docs-drift.yml checker (docs/features.yaml is canonical)
│   └── build-omnivoice-tts.sh   builds the bin/ sidecars
│
├── bin/                         ⟵ prebuilt omnivoice-tts sidecars, one per platform
│
├── .agents/skills/              ⟵ canonical skill copies (vite, fastapi-python), pinned by
│                                   skills-lock.json — followed by path, never symlinked
├── skills/                      ⟵ skills this repo publishes (omnivoice, oss-maintainer)
│
├── infra/                       ⟵ edge/deploy workers (not the Docker deploy path)
│   └── install-redirect/        voicestudio.sh/install — UA-sniffing installer worker
│
├── deploy/                      ⟵ Docker deployment configs
│   ├── Dockerfile               CUDA by default; CI builds the ROCm variant from the same
│   │                            file via BASE_IMAGE / GPU_FLAVOR overrides
│   ├── docker-compose.yml       one-click local deployment
│   ├── torch-constraints.txt    pinned torch resolution for the image
│   └── dockerhub-overview.md    synced to the Docker Hub overview page at release
│
├── docs/                        ⟵ developer docs, screenshots, branding
│   ├── ROADMAP.md               where this project is going
│   ├── STRUCTURE.md             you are here
│   ├── RELEASING.md             the release checklist — every deployment channel
│   ├── features.yaml            canonical feature inventory (drives docs-drift.yml)
│   ├── adr/                     architecture decision records
│   ├── agents/                  agent-facing docs (issue tracker, triage labels, domain)
│   ├── engines/, dubbing/, install/, setup/, migration/, features/, playbooks/, specs/
│   ├── media/, screenshot-*.png, preview.png, logo.*
│   └── languages.md, training.md, data_preparation.md, evaluation.md, voice-design.md
│
├── examples/                    ⟵ runnable demos + sample inputs (agentic/, speech-platform/)
│
├── notebooks/                   ⟵ OmniVoice_Studio_Colab.ipynb
│
├── omnivoice-gallery/           ⟵ git submodule — the published voice gallery
│
├── omnivoice_data/              ⟵ Docker bind-mount target (gitignored)
│                                   DB + HF cache live here when running via compose
│
├── .github/workflows/           ⟵ ci, docker, release, security, docs-drift, evals,
│                                   install-smoke, build-omnivoice-tts
└── .git/
```

## Rules of the root

1. **Nothing at the root is a runtime artifact.** Outputs, temp files, local DBs, crash logs — all go to `~/Library/Application Support/OmniVoice/` (or the OS equivalent), *never* into the repo. The one exception is `omnivoice_data/`, which exists as a bind-mount anchor for Docker.

2. **No ad-hoc scripts at the root.** One-off debug scripts live in `scripts/`. Tests live in one of the three homes below, never at the root.

3. **Each subdirectory owns one concern.** If you can't describe what goes in a directory in one sentence, it's wrong.

4. **Every package has a manifest.** `backend/`, `frontend/`, `omnivoice/` each have their own deps declared via `pyproject.toml` / `package.json` — they are independently testable. The JS lockfile is the **repo-root** `bun.lock` (Bun workspace), and `deploy/Dockerfile` installs from it with `--frozen-lockfile`.

## Where tests live

Three homes, each with its own runner. CI runs all three inside the single `test` job in
`ci.yml`, as separate steps. The split is deliberate, not drift:

| Home | Runner | Why it's separate |
|---|---|---|
| `tests/` | `pytest tests/` — the `testpaths` default | The main suite. Its `conftest.py` points `OMNIVOICE_DATA_DIR` at a throwaway dir so a run can never touch the developer's real app state (#878). |
| `backend/tests/` | `pytest backend/tests/` — its own pytest session (the `Run pytest (backend/tests, isolated)` step) | Runs as an isolated session against `backend/`'s bare imports. Its `conftest.py` sets the same hermetic data dir; **never** reintroduce module-level `sys.modules` stubs there — they leak process-wide at collection time and poison mixed runs. |
| `frontend/src/**/*.test.{js,jsx,ts,tsx}` | `bun run test` (vitest, jsdom) | Co-located with the component under test. `frontend/e2e*/` hold the Playwright suites; `tests/frontend/` is the older `node:test` set. |

## What lives where

| Kind of thing | Goes in |
|---|---|
| User-facing product code | `backend/`, `frontend/` |
| The TTS model (independent of the studio) | `omnivoice/` |
| A new TTS/ASR engine adapter | `backend/engines/<engine>/` |
| Everything executable but not user-facing | `scripts/` |
| Prebuilt platform sidecars | `bin/` |
| Python tests | `tests/` (or `backend/tests/` when the isolated session is required) |
| Frontend unit tests | next to the component, as `*.test.jsx` |
| Developer + user docs (Markdown) | `docs/` |
| Architecture decision records (ADRs) | `docs/adr/` |
| Agent-facing docs | `docs/agents/` |
| Runnable demos and sample data | `examples/` |
| Runtime data (never committed) | `~/Library/Application Support/OmniVoice/` on Mac |

## What *doesn't* live at the root anymore

Removed in the cleanup pass:

| File | Why it was there | Where it went |
|---|---|---|
| `test_crash.py`, `test_server.py`, `test_whisper.py`, `test_mock.py`, `test_pyannote.py` | One-off debug scripts from an April 14 crash investigation. Imported symbols that no longer exist after the router refactor. | Deleted (already gitignored, referenced dead code). |
| `benchmark.py` | Another stale debug script; imported `backend.main._get_db` which no longer exists. | Deleted. |
| `output.wav`, `test.wav` | Runtime artifacts. | Deleted / moved out. |
| `crash_log.txt` | Runtime log. Now written to `$DATA_DIR/crash_log.txt`. | Deleted. |
| `omnivoice.zip` (148 MB) | Offline reference archive of the project itself. | Moved out of the repo to `../omnivoice.zip.bak`. |
| `data/` | Only contained `.DS_Store`. | Deleted. |
| `legacy_gradio/` | The pre-React Gradio UI. Kept for historical reference. | Archived to `research/legacy_gradio/`, then removed in the 2026-07-12 cleanup (git history). |
| Scattered `.DS_Store` files | macOS Finder droppings. | Deleted from every non-ignored directory. |

Removed in the 2026-07-12 cleanup pass (all preserved in git history):

| Dir | Why it was there | Where it went |
|---|---|---|
| `.planning/` (74 files) | GSD-era planning archive: phases, quick plans, issue clusters. The GSD workflow was retired 2026-07-08. | Deleted; the four load-bearing decision docs moved to `docs/adr/`. |
| `specs/` | spec-kit specs for features 001–007 — all shipped. | Deleted; `docs/specs/` is the current home. |
| `design/` | ASCII mockups of the pre-React target UX, superseded by the shipped app. | Deleted. |
| `research/` | Archived legacy Gradio UI + April-2026 competitor notes. | Deleted. |
| `.agents/` | Rules for a third-party agent tool no longer in use. | Deleted — then reintroduced with a different job: `.agents/skills/` now holds the canonical skill copies pinned by `skills-lock.json`. |

## Scaling path (proposed, not yet executed)

The current flat layout works fine for the current size. If the project grows to include additional apps (a mobile companion, a plugin SDK, multiple backends), migrate to a Turborepo-style monorepo:

```
VoiceStudio/
├── apps/
│   ├── api/                 ← was backend/
│   ├── web/                 ← was frontend/
│   └── desktop/             ← could extract src-tauri/ here later
├── packages/
│   ├── omnivoice-model/     ← was omnivoice/
│   └── tts-adapters/        ← new; the pluggable TTS interface from ROADMAP phase 3
├── config/
│   ├── docker/
│   └── pyinstaller/
├── tests/
└── docs/
```

**Do not execute this migration without a dedicated PR.** It breaks:
- `pyproject.toml` `[tool.hatch.build.targets.{sdist,wheel}]` paths
- `package.json` workspaces and scripts
- `turbo.json`, `Dockerfile`, `docker-compose.yml` paths
- `backend.spec` (`['backend/main.py']`, `pathex=['.']`)
- `frontend/src-tauri/tauri.*.conf.json` sidecar paths
- every import that reads `from backend.main import …` (tests, scripts)
- `frontend/package.json` as the version source of truth, and the mirrors that track it

Migrate when adding the second `apps/*` or the second `packages/*`. Not before.

## Conventions

- **Filenames:** snake_case for Python, kebab-case or PascalCase for JS/TS components, lowercase for Markdown.
- **Tests mirror source paths** where a mirror exists: `tests/backend/` mirrors `api/ core/ engines/ services/`, so `backend/services/ffmpeg_utils.py` → `tests/backend/services/test_ffmpeg_utils.py`. Everything else stays flat — `tests/backend/test_*.py` for backend-wide cases, `tests/test_*.py` for cross-cutting ones. A React component's test sits next to the component.
- **One-off scripts** go into `scripts/` with a descriptive name, not `test_*.py` at the root.
- **New top-level directories** require a PR that updates *this file*.

---

## `docs/engines/README.md`

# Engine guides

One page per engine: what it's for, what it needs, how to enable it, and its
quirks. Select engines in **Model Catalogue** (or quick-switch with
<kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>E</kbd>), or pin one with
`OMNIVOICE_TTS_BACKEND` / `OMNIVOICE_ASR_BACKEND`.

When an engine reports itself unavailable, expand its row's **Why?** panel and
use **Learn more** to jump straight to that engine's page here. The row's own
message stays deliberately generic — an availability probe can carry local
paths or credentials, so it is never shown verbatim — and the page below is
where the actual requirements and setup steps live.

The compute device (CUDA/ROCm/MPS/CPU) is auto-detected; pin it under
**Settings → Performance & Device** (or `OMNIVOICE_DEVICE`) if auto-detect
picks wrong — see [performance](../performance.md).

Measured speed/VRAM numbers live in [benchmarks](../benchmarks.md); what each
engine can do expressively in [expressive-speech](../expressive-speech.md);
sidecar disk footprints in [disk-usage](disk-usage.md); the bar a new engine
must clear in [engine-acceptance](../engine-acceptance.md).

New to VoiceStudio? Install the app first — [macOS](../install/macos.md)
(first launch needs the one-time right-click → **Open** Gatekeeper
approval), [Windows](../install/windows.md), [Linux](../install/linux.md),
[Docker](../install/docker.md).

## Text-to-speech

| Engine | Guide | Runs on | Cloning | Enabled by |
|---|---|---|---|---|
| VoiceStudio (OmniVoice) — **default** | [omnivoice](omnivoice.md) | CUDA · MPS · CPU | ✅ | installed by default |
| VoxCPM2 | [voxcpm2](voxcpm2.md) | CUDA · MPS · CPU | ✅ + voice design | `pip install "voxcpm>=2.0.3"` |
| MOSS-TTS-Nano | [moss-tts-nano](moss-tts-nano.md) | CUDA · CPU | ✅ (ref only) | clone + `uv pip install -e .` |
| KittenTTS | [kittentts](kittentts.md) | CPU | — (8 preset voices) | `pip install kittentts` |
| MLX-Audio (Kokoro, CSM, Dia, …) | [mlx-audio](mlx-audio.md) | Apple Silicon | model-dependent | `pip install mlx-audio` |
| CosyVoice 3 | [cosyvoice](cosyvoice.md) | CUDA · CPU | ✅ | clone + requirements |
| GPT-SoVITS | [gpt-sovits](gpt-sovits.md) | external server | ✅ | its own API server |
| Sherpa-ONNX | [sherpa-onnx](sherpa-onnx.md) | CUDA · CPU | — | `pip install sherpa-onnx` + model dir |
| IndexTTS 2.5 | [indextts](indextts.md) | CUDA · CPU | ✅ + emotion | one-click sidecar install |
| OmniVoice GGUF | [omnivoice-gguf](omnivoice-gguf.md) | CUDA · MPS · CPU | ✅ | bundled binary |
| Supertonic-3 | [supertonic3](supertonic3.md) | CPU | — (7 preset voices) | `uv sync --extra supertonic` + license |
| MOSS-TTS-v1.5 (8B) | [moss-tts-v15](moss-tts-v15.md) | CUDA · CPU | ✅ | clone + env var |
| dots.tts (2B) | [dots-tts](dots-tts.md) | CUDA · CPU (not Windows) | ✅ | clone + env var |
| OmniVoice (subprocess) | [omnivoice-subprocess](omnivoice-subprocess.md) | CUDA · MPS · CPU | ✅ | opt-in pick off MPS; automatic via default OmniVoice on MPS |
| PocketTTS (Kyutai) | [pockettts](pockettts.md) | CPU (not Intel Mac) | ✅ | `uv sync --extra pockettts` + license |
| Confucius4-TTS | [confucius4-tts](confucius4-tts.md) | CUDA · CPU | ✅ | clone + env var |
| audio.cpp (Breeze-TTS-2) | [audio-cpp](audio-cpp.md) | CPU + Vulkan/Metal/CUDA/HIP/ROCm where compiled | ✅ + voice design | prebuilt binary + env var (weights research/non-commercial) |

## Speech-to-text

| Engine | Guide | Runs on | Best at | Enabled by |
|---|---|---|---|---|
| WhisperX | [whisperx](whisperx.md) | CUDA · CPU | dubbing (word timestamps + diarization) | installed by default |
| Faster-Whisper | [faster-whisper](faster-whisper.md) | CUDA · CPU | general transcription | installed by default |
| Faster-Whisper (isolated) | [faster-whisper-isolated](faster-whisper-isolated.md) | CUDA · CPU | unattended batches | opt-in pick |
| MLX Whisper | [mlx-whisper](mlx-whisper.md) | Apple Silicon | Mac default | `pip install mlx-whisper` |
| PyTorch Whisper | [pytorch-whisper](pytorch-whisper.md) | CUDA · MPS · CPU | ROCm hosts | installed by default |
| Parakeet TDT (NeMo) | [nemo-parakeet](nemo-parakeet.md) | CUDA · CPU | 25 languages, fast CPU | separate venv (never the app's) |
| Parakeet TDT (MLX) | [parakeet-mlx](parakeet-mlx.md) | Apple Silicon | dictation, 25 EU languages | default on mac-ARM source installs |
| Moonshine | [moonshine](moonshine.md) | CPU | edge/low-power, no timestamps | `pip install` (see guide) |
| FunASR (SenseVoice) | [funasr](funasr.md) | CUDA · CPU | 50+ languages, inline diarization | `pip install funasr` |
| Sherpa-ONNX dictation | [sherpa-onnx-asr](sherpa-onnx-asr.md) | CPU | live streaming dictation | curated model download |
| OpenAI-compatible (local or remote) | [openai-compatible-asr](openai-compatible-asr.md) | network | a configured endpoint; loopback stays local | Model Catalogue |

Speaker diarization is not an engine registry of its own — the dub pipeline
uses pyannote (HF-gated; see [diarization](../features/diarization.md)) and
FunASR can diarize inline with its `cam++` speaker model.

---

## `docs/engines/omnivoice.md`

# VoiceStudio — OmniVoice Engine (default)

OmniVoice (k2-fsa/OmniVoice) is VoiceStudio's default TTS engine — the one a
fresh install uses without any configuration. It does zero-shot voice cloning
across 600+ languages and outputs 24 kHz mono audio. Voice cloning, dubbing,
and dictation all run on it out of the box.

## When to pick it

- You want cloning plus the broadest language coverage (see
  [languages.md](../languages.md)).
- You have a GPU (CUDA, AMD ROCm on Linux, or Apple Silicon MPS) with
  ~6 GB VRAM or more.
- You just installed VoiceStudio — it's already selected.

For low-VRAM or CPU-only machines, the
[OmniVoice GGUF](omnivoice-gguf.md) variant runs the same model through a
quantized native binary with a much smaller memory footprint.

## Requirements

- Runs on CUDA, AMD ROCm (Linux), MPS (Apple Silicon), or CPU — auto-detected.
- Recommended VRAM floor: **6 GB** on a dedicated GPU. This is the only
  engine with a measured floor: on 4 GB cards (GTX 1650 Ti, Quadro P2000 —
  issues [#1226](https://github.com/debpalash/VoiceStudio/issues/1226) /
  [#1222](https://github.com/debpalash/VoiceStudio/issues/1222)) the driver
  pages to system RAM and a render that should take seconds runs for minutes
  until the compute budget kills it. The UI warns before you wait; nothing
  hard-blocks, since short inputs can still fit. A CUDA or ROCm card below the
  floor is also budgeted as the CPU-class hardware it performs like — the longer
  `OMNIVOICE_CPU_GENERATE_TIMEOUT_S` (600 s), not the accelerated 300 s
  ([#1804](https://github.com/debpalash/VoiceStudio/issues/1804)). Apple Silicon
  is excluded: unified memory has no dedicated pool to compare against.
- No extra install — the model ships with the app and downloads its weights
  on first use (see [downloading-models.md](../downloading-models.md)).

## Selecting the engine

OmniVoice is the default, so normally there is nothing to do. If you switched
away and want it back:

- **Model Catalogue**, or
- set `OMNIVOICE_TTS_BACKEND=omnivoice`.

The env var overrides the persisted UI choice.

## Behaviour notes

- Weights load lazily on first use and are shared with the rest of the app
  (dubbing, dictation) — the model is never double-loaded.
- On CUDA and ROCm the model runs fp16 with `torch.compile`; PyTorch exposes
  ROCm/HIP devices through its `cuda` API, while VoiceStudio's engine matrix
  reports the hardware as ROCm. A speech recognizer is co-loaded for the
  cloning path.
- Output is 24 kHz mono; the shared mastering chain (highpass + compressor)
  is tuned for this rate and applied automatically.
- Cloning takes a short reference clip (`ref_audio`); 3–10 seconds is the
  sweet spot. A transcript of the clip improves conditioning — if the profile
  has none, VoiceStudio transcribes the clip automatically on first use and
  saves the result to the profile. A clip with a supplied transcript is limited
  to 20 seconds so the two stay aligned; trim both to the same passage. Without
  a transcript, VoiceStudio can search up to 75 seconds in five contiguous,
  bounded transcription passes and selects the passage with detected speech.
  Longer clips must be trimmed first. If no spoken words are detected, trim to
  a clear 3–10 second passage or provide its matching transcript.
- Encoded voice references persist on disk (`prompt_cache/` in the app data
  dir), so the first generation with a known voice after a restart skips the
  re-encode and any transcription pass. Set `OMNIVOICE_PROMPT_DISK_CACHE=0`
  to keep the cache in memory only.
- Style attributes (`instruct`) and a reference clip can be **combined**:
  when they agree, the instruct stabilizes cloning for the attributes it
  names (upstream documents dialect cloning as the canonical case — dialect
  reference + matching dialect instruct). When they conflict, the reference
  audio wins.
- Inline pronunciation control: Chinese via pinyin with tone numbers
  (`打ZHE2出售`), English via bracketed CMU phonemes (`[B EY1 S]`). Non-verbal
  tags like `[laughter]` are covered in
  [expressive-speech.md](../expressive-speech.md).
- Voice design works from attributes (gender, age, pitch, whisper, English
  accents, Chinese dialects) via the Design tab — no reference audio needed.
- Optional FlashInfer acceleration on CUDA: set `OMNIVOICE_FLASHINFER=1`
  (or `=graph` for CUDA-graph capture, best for one render at a time) after
  installing the `flashinfer-python` package — see
  [performance.md](../performance.md). Off by default; if the package is
  missing or a kernel fails, the app logs why and continues on the standard
  path.

## Known limits

- Voice design understands only the fixed attribute vocabulary — free-form
  design *prose* is mapped onto those attributes, and wording outside them
  is ignored. Design is trained on English and Chinese and can be unstable
  in low-resource languages; for description-driven design in other cases
  try [VoxCPM2](voxcpm2.md).
- Below the 6 GB VRAM floor on a CUDA or ROCm card, expect very slow renders;
  they get the longer CPU compute-time budget rather than the accelerated one,
  but can still time out. Prefer [OmniVoice GGUF](omnivoice-gguf.md) or a CPU
  engine such as [PocketTTS](pockettts.md).

## Troubleshooting

- "Too heavy for the available compute" on a small GPU: see the VRAM floor
  above — switch to OmniVoice GGUF or close other GPU apps.
- First generation is slow: the first call downloads multi-GB weights. To
  keep the first render quick, install the model ahead of time from
  **Model Catalogue (TTS tab → the engine's Weights)** — a long first generate is almost always the
  download, not a hang.
- General install issues: [install/troubleshooting.md](../install/troubleshooting.md).

See also: [benchmarks.md](../benchmarks.md),
[performance.md](../performance.md),
[expressive-speech.md](../expressive-speech.md),
[disk usage](disk-usage.md).

A timed-out subprocess is killed and given a bounded wait to exit before the
request returns, so retrying cannot reuse its closing process. Timeout cleanup
remains tied to the original child and cannot kill a replacement sidecar.
If that wait cannot confirm exit, VoiceStudio retains the process for cleanup
and blocks another attempt until it can be reaped, rather than starting a second
engine alongside it. A later retry or shutdown retries the bounded cleanup.

---

## `docs/engines/omnivoice-gguf.md`

# VoiceStudio — OmniVoice GGUF Engine

OmniVoice GGUF runs the same OmniVoice model as the [default
engine](omnivoice.md), but through a bundled native binary
(`bin/omnivoice-tts-<platform>`) loading quantized GGUF weights. It is
hardware-adaptive: a probe picks the quantization that fits your machine, so
small GPUs and CPU-only hosts get a working OmniVoice instead of a paging,
timing-out one.

## When to pick it

- Your GPU is below the default engine's 6 GB VRAM floor.
- CPU-only machines that still want OmniVoice's voice and language coverage.
- You want generation isolated in a separate process (a crash or leak never
  takes the app down — each generation spawns the binary fresh).

## Quantization selection

Weights come from the `Serveurperso/OmniVoice-GGUF` HuggingFace repo, pinned
to an exact revision. The hardware probe selects:

| Hardware | Quant | Approx. VRAM use |
| --- | --- | --- |
| 12 GB+ VRAM | BF16 | ~1.6 GB (quality-first) |
| 4–12 GB VRAM | Q8_0 | ~945 MB (recommended balance) |
| 1–4 GB VRAM | Q4_K_M | ~659 MB (minimal footprint) |
| CPU-only | Q4_K_M | RAM-bound, latency-tolerable |

You can override the selection from Settings; overrides are allow-listed
against the same table (an F32 reference quant, ~3.2 GB, is override-only).

## Setup

Nothing to install: installer and CI builds bundle the binary for your
platform. Select the engine via **Model Catalogue** (TTS tab → **Use**) or
`OMNIVOICE_TTS_BACKEND=omnivoice-gguf`. The quant weights download on first
use (see [downloading-models.md](../downloading-models.md)) — install them
ahead of time from **Model Catalogue (TTS tab → the engine's Weights)** if you want the first
generation to be quick; a long first render is the download, not a hang.

**Source checkouts:** the repo ships zero-byte placeholders in `bin/` — real
binaries come from CI or the installer. The engine detects a placeholder and
reports unavailable with instructions
([#1172](https://github.com/debpalash/VoiceStudio/issues/1172)) instead of
failing at spawn time; build one with
`scripts/build-omnivoice-tts.sh --platform <slug>` or use the default
in-process engine.

**Linux ARM64 (Asahi Apple Silicon):** the `linux-aarch64` binary prefers
GGML's Vulkan backend when built on a host with `glslc` and the Khronos
SPIRV headers installed (Arch: `pacman -S shaderc spirv-headers`; Debian:
`apt install glslc libvulkan-dev spirv-headers`), so Apple GPUs accelerate
generation through the open-source Honeykrisp driver. Without those deps the
build falls back to CPU. Expect roughly 2–4x slower generation than macOS
Metal while upstream Mesa and llama.cpp Vulkan optimizations mature; still
well ahead of CPU-only.

## Integrity and self-healing

Before reporting ready, the engine:

- verifies the binary against the SHA-256 manifest (`bin/checksums.sha256`);
- detects macOS Gatekeeper quarantine and prints the exact
  `xattr -cr '/Applications/VoiceStudio.app'` fix;
- restores a missing execute bit (a git clone or zip extract on POSIX can
  drop `+x`, which used to surface as a permission error mislabeled as
  out-of-memory — [#437](https://github.com/debpalash/VoiceStudio/issues/437)).
  The chmod runs only after the SHA check confirms it's the right file.

## Behaviour notes

- Output is 24 kHz mono — same model, same rate as in-process OmniVoice.
- Cloning from a reference clip (with optional transcript) and style
  instructions are supported; no voice design.
- Same multilingual surface as OmniVoice ([languages.md](../languages.md)).
- Because generation runs in another process, the app's own GPU counters
  don't see its allocations — diagnostics label it accordingly.

| Variable | Default | Meaning |
| --- | --- | --- |
| `OMNIVOICE_GGUF_GENERATE_TIMEOUT_S` | (generous built-in) | Per-generation timeout for the spawned binary |

## Troubleshooting

- "GGUF binary missing": this build doesn't bundle the runtime for your
  platform — use the default engine.
- Checksum mismatch or quarantine messages: follow the printed fix, or
  reinstall.
- Other issues: [install/troubleshooting.md](../install/troubleshooting.md).

See also: [benchmarks.md](../benchmarks.md),
[performance.md](../performance.md), [disk usage](disk-usage.md).

---

## `docs/engines/whisperx.md`

# VoiceStudio — WhisperX Engine

WhisperX is the default ASR engine on CUDA and plain-CPU hosts: faster-whisper
(CTranslate2) transcription plus a **wav2vec2 forced-alignment** pass that
snaps word boundaries to ±10–30 ms (Whisper's own timestamps are ±100–300 ms).
That word timing is what dubbing lip-sync depends on, which is why auto-detect
prefers it wherever CTranslate2 can use the GPU.

## Selecting it

- **Model Catalogue**, ASR tab → **Use** on the WhisperX row, or
- pin it with `OMNIVOICE_ASR_BACKEND=whisperx` (the env var always wins over
  the Settings pick; with neither set, auto-detect chooses per-hardware).

## Best at

- **Dubbing** — the forced alignment is the accuracy tier lip-sync needs.
- **Batch transcription** with word-level subtitles.
- Multi-speaker work: it pairs with pyannote speaker diarization — see
  [diarization](../features/diarization.md).

## Platform support

| Host | What happens |
| --- | --- |
| NVIDIA CUDA | GPU, float16 (degrades automatically, see below) |
| CPU (any OS) | int8 — works, but slow for large-v3 |
| Apple Silicon | CPU only — CTranslate2 has no Metal build, so auto-detect prefers [mlx-whisper](mlx-whisper.md) there ([#1127](https://github.com/debpalash/VoiceStudio/issues/1127)) |
| AMD ROCm | CPU only — CTranslate2 has no HIP build, so auto-detect prefers [pytorch-whisper](pytorch-whisper.md) there ([#1529](https://github.com/debpalash/VoiceStudio/issues/1529)) |

## Model selection

- `ASR_MODEL_WHISPERX` — default `large-v3`. Accepts the usual size aliases
  (`tiny` … `large-v3`, `distil-large-v3`) or a full HF repo id. Weights
  download on first load — see [downloading-models](../downloading-models.md).
- `OMNIVOICE_ALIGN_DEVICE` — force the wav2vec2 aligner's device. Aligners
  exist for ~20 major languages; other languages keep Whisper's native word
  timestamps instead of failing.

## VRAM preflight and degradation

Loading fp16 large-v3 onto a nearly-full 8 GB card dies as a *native* CUDA
abort — no Python exception, the whole backend goes down
([#723](https://github.com/debpalash/VoiceStudio/issues/723)). So before every
load the engine checks free VRAM against per-compute-type budgets
(float16 5.0 GB, int8_float16 3.5 GB, int8 3.0 GB, scaled down for smaller
models) and degrades the compute type — or falls to CPU int8 — instead of
starting a load that would kill the process. Disable with
`OMNIVOICE_ASR_VRAM_PREFLIGHT=0`.

Two more fallback chains run at load time:

- GPUs without efficient fp16 (older Maxwell/Pascal, GTX 16xx) raise a
  compute-type error — the engine retries int8_float16, then int8
  ([#551](https://github.com/debpalash/VoiceStudio/issues/551)).
- A genuine CUDA OOM retries on CPU int8, so dubbing still completes
  (slower, same model and accuracy).

## Quirks

- **cuDNN 8 required on CUDA.** CTranslate2 links cuDNN 8; if it's missing the
  process fast-fails with no traceback, so the engine is reported unavailable
  up front and selection falls through to pytorch-whisper, which uses torch's
  own cuDNN 9 ([#1371](https://github.com/debpalash/VoiceStudio/issues/1371)).
- On some hardened Linux kernels CTranslate2's native library is rejected with
  "cannot enable executable stack" — reported as unavailable, not a crash
  ([#692](https://github.com/debpalash/VoiceStudio/issues/692)).
- A partially-installed environment (interrupted sync, antivirus quarantine)
  can break WhisperX's deep import chain (whisperx → pyannote →
  lightning_fabric). The engine is then reported unavailable with a repair
  hint — reinstall, or `uv sync --reinstall` on a source checkout
  ([#1185](https://github.com/debpalash/VoiceStudio/issues/1185)).
- Audio is decoded through VoiceStudio's validated ffmpeg, not a bare `ffmpeg`
  PATH lookup ([#479](https://github.com/debpalash/VoiceStudio/issues/479)).
- Transcribes are time-bounded: each dub chunk by
  `OMNIVOICE_TRANSCRIBE_CHUNK_TIMEOUT_S` (default 120 s), whole files by
  `OMNIVOICE_ASR_TRANSCRIBE_TIMEOUT_S` (default 300 s). Raise them for very
  long files on slow hardware.

Speed comparisons across engines live in [performance](../performance.md).

---

## `docs/engines/disk-usage.md`

# Engine venvs & disk usage

The Model Catalogue now exposes a structured disk breakdown before install:
model-weight download, package download, unique installed bytes, potentially
shared bytes, temporary free-space requirement, destination volume, and the
estimate confidence. Missing package or deduplication measurements are shown as
unknown rather than zero. Opening an installed engine's disk details measures
its model, environment, shared cache, and app-owned total separately. These
values come from `config/models.yaml` and the sidecar installer specification;
the UI does not maintain its own size table.

Most engines run in-process in VoiceStudio's main environment. A few
(**IndexTTS2**, **MOSS-TTS-v1.5**, **dots.tts**, and any engine whose
dependencies conflict with the parent's `torch`/`transformers` pins) run in a
**dedicated sidecar venv** so their pins can't break the rest of the app. Those
sidecars are where disk adds up — this page explains why, and how the on-disk
cost is kept down.

## Why a sidecar needs its own venv

IndexTTS2 pins `transformers<5`, but VoiceStudio requires `transformers>=5.3`.
You can't have both in one environment, so IndexTTS2 gets its own venv created
on first use (`uv venv` + `uv pip install`, see
`backend/engines/indextts/bootstrap.py`). The cost is a second copy of the
heavy ML stack — most of which is **torch + the bundled CUDA libraries**.

## How big is "a second torch"?

Measured (2026-06):

| Platform | torch CUDA wheel | + bundled CUDA libs |
|---|---|---|
| Linux (cu128) | ~0.83 GiB | several GiB of `nvidia-*` packages on top |
| Windows (cu128) | ~3.2 GiB (DLLs bundled in the wheel) | — |

So a sidecar that pins a **different** torch version than the parent is a
multi-GB add. A sidecar that pins the **same** torch + CUDA build shares almost
all of it (see below).

## uv dedupes identical wheels — for free, with one condition

uv installs packages by linking from a global wheel cache into each venv's
`site-packages`. The link mode:

- **macOS + Linux** — `clone` (copy-on-write reflink). N venvs that install the
  same wheel share the bytes until one is modified — effectively one copy on
  disk.
- **Windows** — `hardlink`. Same effect on a single volume.

**The one condition:** the cache and the venv must be on the **same
filesystem**. If `UV_CACHE_DIR` lives on a different drive than the engine
venvs, uv falls back to a full **copy** (no dedup, slower). Keep them together.

Dedup is **per identical wheel**. `torch==2.6.0+cu124` and `torch==2.8.0+cu128`
are different wheels → **zero** sharing → a full extra multi-GB copy. The single
biggest disk decision for a sidecar is therefore: **pin the same torch build as
the parent whenever the engine allows it.** When it doesn't (IndexTTS2's
`transformers<5` forces an older torch line), the second copy is the
unavoidable price of isolation — not a bug.

The opt-in #498 engines illustrate both sides: **dots.tts** pins
`torch==2.8.0` — the **same** build the parent constrains to — so it shares
almost all of torch with the main venv and only its `transformers==4.57` +
model deps are new. **MOSS-TTS-v1.5** pins `torch==2.9.1+cu128`, a **different**
build, so it pays a full extra multi-GB torch copy on CUDA hosts (the price of
running an 8B model whose stack pins `transformers==5.0`).

> On Linux, the `nvidia-*` CUDA packages are separate wheels, so even across
> *different* torch versions any `nvidia-*` whose pinned version happens to
> match is still shared. On Windows the CUDA DLLs live inside the one torch
> wheel, so nothing is shared across torch versions.

## Practical guidance

- Keep `UV_CACHE_DIR` and the engine venvs on one filesystem (the default —
  both under your home dir — already satisfies this). **The app enforces this
  automatically**: when the app env or the engine venvs live on a different
  volume than uv's default cache (D:-drive install, portable mode), every
  managed `uv` invocation gets `UV_CACHE_DIR` pointed at a cache next to the
  venvs (`<env root>/uv-cache`, `<data dir>/engines/.uv-cache`). An explicit
  `UV_CACHE_DIR` you set yourself always wins.
- On Linux ext4 (no reflink), `export UV_LINK_MODE=hardlink` guarantees dedup
  on any single filesystem; the default `clone` only dedupes on
  reflink-capable filesystems (XFS-with-reflink, btrfs, APFS).
- Reclaiming space: deleting a sidecar venv (`backend/engines/<id>/.venv/`)
  frees its unique files; shared cache bytes stay until `uv cache prune`.
- Forward-looking: PyTorch's experimental **wheel variants** (shipped in 2.8)
  will eventually let `uv install torch` auto-pick the right CUDA build, and
  uv already exposes `--torch-backend=auto`.

---

## `docs/engine-acceptance.md`

# Adding a TTS or ASR engine

VoiceStudio ships a lot of engines. That breadth is only an asset while every one
of them still works on every platform — otherwise it is a pile of support
queues, and the project's actual promise (*a first run that works*) is what pays
for it.

So new engines are **hired for a job**, not added to a list.

## The job map

Every engine in the tree owns at least one job. A job has exactly one holder.

| Job | Held by |
| --- | --- |
| Best zero-shot clone quality | `omnivoice` |
| Widest language coverage | `omnivoice` |
| Crash isolation for the default model | `omnivoice-subprocess` |
| Fastest CPU render / lowest latency | *open — see #1306* |
| Best Chinese/Japanese expressiveness | `cosyvoice`, `indextts2` |
| CPU-realtime English, tiny footprint | `kittentts`, `supertonic3` |
| Bilingual reference-free voice design and direction | `audiocpp` |
| Best transcription accuracy | `whisperx`, `faster-whisper` |
| Fastest Apple-Silicon transcription | `parakeet-mlx`, `mlx-whisper` |
| Crash isolation for transcription | `faster-whisper-isolated` |

A proposal must either **take a job from its current holder** (with numbers) or
**claim a job nothing covers**. "It benchmarks well" is not a job.

## The bar

A new engine is accepted when all of these hold. Miss one and the answer is no —
which is a property of the bar, not a judgement of the contributor.

1. **A job, named.** Which row above it takes or adds, and why the incumbent
   does not cover it. Latency, language, hardware envelope or quality tier —
   something a user would choose it *for*.
2. **Licence clean for commercial use.** Model weights *and* code. No
   research-only weights or ambiguous provenance. The single approved
   exception is `audiocpp` with Breeze-TTS-2 research/non-commercial weights,
   approved by the owner on 2026-09-08 for its requested bilingual voice-design
   and direction workflow. It remains opt-in and discloses the restriction
   before selection and download; `@debpalash` is its named steward.
3. **Every platform, or explicitly opt-in.** macOS (Apple Silicon and Intel),
   Windows, Linux. A CPU path is required — an engine that only runs on one
   accelerator is fine, but it must degrade rather than break, and a
   platform-only engine goes behind an opt-in (see CLAUDE.md's parity rule).
4. **Fits the existing adapter.** `TTSBackend` / `SubprocessBackend` with no
   changes to core pipelines. A dependency profile that conflicts with ours
   means a sidecar (`SubprocessBackend`), which is a solved shape — see
   `docs/engines/omnivoice-subprocess.md`.
5. **A CI smoke test in the same PR.** It does not need a GPU: stub the sidecar,
   assert the adapter contract. An integration with no test is an integration
   nobody will notice breaking.
6. **A named steward.** The proposer commits to being the point of contact for
   that engine's issues for 12 months. No steward, no merge — this is the
   difference between breadth and debt.
7. **Demand evidence.** A real request, a real workflow, a real user. Ideally
   someone already working around its absence.

## Deprecation

Breadth is only worth carrying while it is alive. An engine is archived when,
for two consecutive releases, it has **no steward** and **no passing smoke
test**. Archiving is not a judgement either — it is how the remaining engines
stay trustworthy.

## If it doesn't clear the bar

The adapter interface is public. An engine can live out-of-tree, be installed
alongside, and be selected by id — you do not need our merge to use your engine,
and we would rather link a good external engine than carry a half-maintained
internal one.

---

## `docs/expressive-speech.md`

# Expressive speech: breaths, laughter, and style

How to direct a performance — laughter, sighs, pauses, whispering, emotion,
and the community favorite: *"how do I make it take a sharp audible breath,
like a person running out of breath?"* Some of this is supported today
(engine-dependent), some is spec'd but not shipped yet. This page tells you
exactly which is which, so you don't burn an evening on tags an engine
ignores.

## The short version

| You want | Do this | Works on |
|---|---|---|
| A pause | Type `[pause]`, `[pause 500ms]`, or `[pause 1.5s]` in the text | Every engine |
| Laughter or a sigh | ⊕ Insert → `[laughter]` / `[sigh]` | Default engine (VoiceStudio) |
| An audible breath **on demand** | `[breath]` in the text | CosyVoice 3 only (opt-in) — see [Breaths](#breaths-specifically) |
| Whispering | Style → `whisper` (the voice-design/style field) | Default engine |
| Emotion ("excited", "sad", graded intensity) | IndexTTS2's emotion controls — Audiobook tab's Production Overrides, or the `/ws/tts` API — or CosyVoice 3 instruct | Opt-in engines only |
| The same take again | Pin the seed / lock the profile | Default engine |

## Recovering an interrupted audiobook

Switching away from the Audiobook tab explicitly interrupts synthesis at a chapter boundary. The Audiobook recovery card lets you resume with its cached chapters, and **Open chapter cache** reveals the chapter audio cache.

## Why bracket tags work at all (and when they don't)

Everything you type in the text box reaches the active engine **verbatim** —
the pipeline goes out of its way not to break tags:

- Tilde-separated integer, signed, and decimal ranges get a spoken separator in
  English, Korean, Japanese, and Chinese; malformed chains and product codes
  are left unchanged.
- The text-normalization pass (numbers, abbreviations) skips every `[…]` span
  (`backend/services/text_normalization.py`).
- The long-text chunker never cuts inside a bracket tag
  (`backend/services/chunked_tts.py`, `_BRACKET_TAG_RE`).

The flip side is just as important: **unrecognized tags are not stripped.**
An engine that doesn't know a tag receives it as literal text and will try to
speak it. Pasting an ElevenLabs script full of `[excited]` / `[whispers]`
degrades output on every engine we ship — those tags are on the roadmap (see
[What's coming](#whats-coming)), not in the engines. Use only the tags listed
for your engine below.

## What each engine can do today

### Every engine

- **`[pause Nms]` markers** — `[pause]` (350 ms default), `[pause 500ms]`,
  `[pause 1s]`, up to 10 s. Rendered as real stitched silence, so it works
  identically on all engines.
- **Punctuation** — ellipses, dashes, exclamation marks, and short fragments
  genuinely shape pacing and intonation. Cheap, underrated.
- **The reference clip is a performance direction.** Zero-shot cloning mirrors
  the *delivery* of the reference, not just the timbre — a flat reference
  clones flat, an animated one clones animated (see the tip in
  [generation-parameters.md](generation-parameters.md)). This is the most
  reliable expressive control in the app.
- **Pronunciation overrides** — `[[Nuh-VAD-uh]]` inline, or the pronunciation
  dictionary. Not expression, but often what a "it says this weirdly" problem
  actually needs.

### Default engine (VoiceStudio)

**Non-verbal tags.** The bundled model natively tokenizes 13 reaction tags
(`omnivoice/models/omnivoice.py`, `_NONVERBAL_PATTERN`) — the ⊕ Insert button
at the corner of the Script box lists them all:

`[laughter]` `[sigh]` `[confirmation-en]` `[question-en]` `[question-ah]`
`[question-oh]` `[question-ei]` `[question-yi]` `[surprise-ah]`
`[surprise-oh]` `[surprise-wa]` `[surprise-yo]` `[dissatisfaction-hnn]`

Honest expectations: `[laughter]` and `[sigh]` are the broadly useful ones;
most of the interjection variants (`-ah`, `-yi`, `-hnn`) are tuned for
Mandarin-flavored speech. How convincingly a tag renders varies with the
voice — a tag that lands great on one reference clip can come out subdued on
another. There is **no intensity control**, and **no `[breath]` tag** in this
set.

**Whispering.** `whisper` is the one delivery style the instruct validator
accepts (the taxonomy is Gender / Age / Pitch / Style / Accent / Dialect —
see [voice-design.md](voice-design.md)). `[happy]` / `[sad]`-style emotion
direction is **not** something the base model takes.

**Sampling knobs + seed.** The Voice workspace **and the Audiobook tab** each
carry a Production Overrides panel exposing the sampling surface (defaults in
parentheses; details in [generation-parameters.md](generation-parameters.md)):

- `position_temperature` (5.0) and `class_temperature` (0.0) — 0 is greedy;
  higher is more random, which means more expressive variation *and* more
  artifacts.
- `num_step` — the Voice page defaults to 16 (fast); Audiobook renders default
  to 32 (cleaner), overridable in the Audiobook panel. Fewer steps = rougher,
  occasionally more "human-sounding" edges.
- **Seed** — unpinned by default, so every render differs. The history rail
  shows the seed each take used; "Keep this seed" (Design tab) or locking a
  profile from history pins reference + seed, making the voice
  bit-reproducible. The Audiobook panel also takes a book-level seed directly.
- `postprocess_output` (on) — removes long silences from the output. Turn it
  off when the silence *is* the performance.

The Audiobook panel adds two longform-only controls on top of that surface:
IndexTTS2 emotion (see below), and **Vary repeated lines** — a cache opt-out
that gives every identical line its own take instead of replaying one recording
(off by default, so books stay byte-reproducible unless you ask for variety).

**Longform-only tags.** Audiobook and Stories additionally parse SSML-lite —
`[slow]…[/slow]`, `[fast]…[/fast]`, `[emphasis]…[/emphasis]`, `[spell]` —
plus `[voice:NAME]` for multi-voice scripts
(`backend/services/longform_parser.py`). These are not parsed on the Voice
page.

### CosyVoice 3 (opt-in)

The most direct paralinguistic control in the app, if you're willing to
install it. CosyVoice 3 honors, inline in the text:

- `[breath]` — an audible breath, exactly where you put it
- `[laughter]`
- `<strong>word</strong>` — emphasis

plus **natural-language instruct** ("speak with a Sichuan accent", "sound
exhausted") — the backend appends the model's required `<|endofprompt|>`
terminator for you (`backend/services/tts_backend.py`,
`CosyVoiceBackend`). One catch: the Studio style field whitelists instruct to
the default engine's taxonomy, so free-text instruct currently needs the API
(`POST /generate` with an `instruct` form field, or `/ws/tts`).

Setup: clone + install [CosyVoice](https://github.com/FunAudioLLM/CosyVoice)
(non-trivial: `git clone --recursive`, its requirements, SoX), then set
`OMNIVOICE_COSYVOICE_MODEL` to the model directory and select it in
Model Catalogue. CUDA or CPU; MPS is unverified upstream.

### VoxCPM2 (opt-in)

VoxCPM2's native convention is an instruct prefix inside the text itself:
`(speaking fast, out of breath) I can't stop now.` The app maps the
`instruct` field onto that prefix (`backend/services/tts_backend.py`,
`VoxCPM2Backend.generate`), and because the convention is literally in-text,
typing the parenthetical at the start of your text works too. Treat it as
guidance, not a guarantee — adherence varies by voice and language.

### IndexTTS2 (opt-in)

The only engine with **graded** emotion control: an 8-value emotion vector
(happy, angry, sad, afraid, disgusted, melancholic, surprised, calm), an
emotion *reference clip* whose delivery is mimicked (with a blend strength),
or a natural-language emotion description. The **Audiobook tab's Production
Overrides** expose the natural-language path — an *Emotion description* field
plus an *Emotion strength* slider (`emo_alpha`), shown only when IndexTTS2 is
the active engine so there are no dead controls. The full surface (the 8-float
`emo_vector`, an `emo_audio` reference clip) is on the streaming WebSocket API
(`/ws/tts` — `emo_vector`, `emo_audio`, `emo_alpha`, `emo_text` fields;
`backend/api/routers/tts_stream.py`). The single-shot Voice page does not carry
emotion controls yet.

## Breaths, specifically

The honest answer to *"how do I invoke a sharp inhale on demand?"*:

**On the default engine — you can't yet, not directly.** There is no
`[breath]` or `[inhale]` token in its tag set; `[sigh]` is the nearest
neighbor and it's an exhale. An engine-agnostic breath/reaction tag layer is
spec'd ([specs/01-expressive-tts.md](specs/01-expressive-tts.md)) but not
shipped — see below.

**The direct route: CosyVoice 3.** Its `[breath]` tag puts an audible breath
exactly where you type it. If on-demand breaths matter to your work, this is
the supported path today.

**The coax-it recipe (default engine).** Breaths *can* be elicited — this is
exactly what v0.3.9 was doing by accident. Roughly in order of effectiveness:

1. **Put the breathing in the reference clip.** Record 8–15 s of yourself (or
   your speaker) genuinely winded — audible inhales between phrases. The
   clone mirrors the delivery. This alone gets most of the way there.
2. **Write for it.** Short gasping fragments with pauses:
   `I can't… [pause 300ms] I can't keep… [pause 200ms] keep running.`
3. **Turn off `postprocess_output`** (Production Overrides — Voice tab *or*
   Audiobook tab) so the silences — where breath artifacts live — aren't
   trimmed away.
4. **Add randomness, then farm takes.** Raise `class_temperature` to 0.3–0.7
   (default is 0, fully greedy) and regenerate a few times — the seed is
   unpinned, so each take differs. Both controls live in the same Production
   Overrides panel, so this whole recipe now works for an audiobook chapter
   (audition it with the per-chapter Preview button), not just a single Voice
   render. In a book, the **Vary repeated lines** toggle farms takes across
   repeated lines automatically.
5. **Keep the winner.** When a take breathes right, its seed is on the
   history entry — lock the profile from there (or set the Audiobook panel's
   book-level seed) and every future generation uses the same reference + seed.

Tradeoffs, stated plainly: temperature cuts both ways (the same randomness
that produces a great gasp produces slurred words and timbre drift), takes
are non-repeatable until you pin the seed, and postprocess-off keeps *all*
long silences, wanted or not. This is a workaround, not a feature — which is
why the feature is spec'd.

## Why v0.3.9-style random breaths faded

Users of v0.3.9 remember outputs that would spontaneously breathe, gasp, and
rustle — and noticed v0.3.15+ is smooth. Those breaths were never a feature:
they were uncontrolled sampling variance (unpinned seed + the default
`position_temperature` of 5.0) surviving an output chain that was, at the
time, less tidy. Then the chain got deliberately cleaner:

- **v0.3.12** — the mastering pre-stage was cut down to highpass + compressor
  after a field report of hidden echo; every generation had been getting a
  small room reverb baked in, which made outputs sound roomier and
  breathier (#986).
- **Silence post-processing** (`postprocess_output`, default on) removes long
  silences — the gaps where stray breath noise lived.
- **v0.3.16** — VoxCPM2 reference clips get edge-silence trimming before
  conditioning, and outputs get a trailing-silence trim (#1055), so that
  engine stopped inheriting dead air and its artifacts.

Net effect: the default output is now clean by design, and expressiveness is
becoming something you *ask for* (tags, instruct, the recipe above) rather
than something that happens to you.

## What's coming

[Spec 01 — Expressive TTS](specs/01-expressive-tts.md) defines the plan: one
engine-agnostic tag surface (`[excited]`, `[whispers]`, reaction tags like
`[breath]`) that lowers to whatever the active engine can really do and
**visibly degrades** where it can't, plus an Expression panel (emotion
dropdown + intensity + emotion-reference clip) everywhere in the UI. The
pronunciation phases have shipped (dictionary + `[[…]]` overrides), and the
Audiobook tab now carries a first Expression surface — IndexTTS2 emotion
description + strength, engine-gated. Still spec'd, not shipped: the
engine-agnostic inline emotion/reaction tag grammar, the emotion-reference
clip picker, and the Expression panel on the single-shot Voice page. No
promised date — when each lands, this page gets updated in the same PR.

---

## `docs/voice-design.md`

# Voice Design

Voice Design mode lets you describe the desired speaker through speaker attributes (`instruct` parameter) — no reference audio needed. The model
generates a matching voice on the fly.

## Quick Example

```python
import torch
from omnivoice import OmniVoice

model = OmniVoice.from_pretrained(
    "k2-fsa/OmniVoice",
    device_map="cuda:0",
    dtype=torch.float16
)

audio = model.generate(
    text="This is a test for voice design.",
    instruct="female, young adult, high pitch, british accent",
)
```

## How It Works

The `instruct` parameter accepts a comma-separated string of speaker attributes.
Each attribute belongs to a **category** (gender, age, pitch, style, accent,
or dialect). Within a category, only one attribute may be selected at a time.
Attributes from different categories can be freely combined.

The model auto-detects the language of the instruct text and normalises it
internally — you can write in English, Chinese, or a mix of both.

## Supported Attributes

### Gender

| English | Chinese |
|---------|---------|
| male | 男 |
| female | 女 |

### Age

| English | Chinese |
|---------|---------|
| child | 儿童 |
| teenager | 少年 |
| young adult | 青年 |
| middle-aged | 中年 |
| elderly | 老年 |

### Pitch

| English | Chinese |
|---------|---------|
| very low pitch | 极低音调 |
| low pitch | 低音调 |
| moderate pitch | 中音调 |
| high pitch | 高音调 |
| very high pitch | 极高音调 |

### Style

| English | Chinese |
|---------|---------|
| whisper | 耳语 |

> `whisper` is the only delivery style the base model accepts — emotion tags like `[happy]`/`[sad]` are not part of this taxonomy. For everything expressive (breaths, laughter, pauses, emotion, and which engines support what), see [expressive-speech.md](expressive-speech.md).

### English Accent

Only effective when the synthesis text is in English.

| Accent |
|--------|
| american accent |
| british accent |
| australian accent |
| canadian accent |
| indian accent |
| chinese accent |
| korean accent |
| japanese accent |
| portuguese accent |
| russian accent |

### Chinese Dialect

Only effective when the synthesis text is in Chinese.

| Dialect |
|---------|
| 河南话 |
| 陕西话 |
| 四川话 |
| 贵州话 |
| 云南话 |
| 桂林话 |
| 济南话 |
| 石家庄话 |
| 甘肃话 |
| 宁夏话 |
| 青岛话 |
| 东北话 |

## Writing Instruct Strings

Separate attributes with commas (half-width `,` for English, full-width `，`
for Chinese — the model auto-fixes mismatches).

```
# English
"female, young adult, high pitch, british accent"

# Chinese
"女，青年，高音调，四川话"

# Mixed (auto-normalised)
"female, young adult, 四川话"
```

### Tips

- **Combine freely** across categories: `"male, elderly, low pitch, whisper"`.
- **Leave it to the model**: omit attributes you don't care about — the model
  fills in the rest. For example `"female"` alone is valid.
- **Case-insensitive**: `"Male"`, `"MALE"`, and `"male"` are all accepted, the code will normalize them to lower case.

- **Accent vs Dialect**: English accents are only applied to English speech, Chinese dialects are only applied to Chinese speech.

Gallery previews reject silent output and near-pure tonal buzz. The quality
check measures short audio frames rather than the whole clip, so longer or
softly voiced speech is not rejected merely for having low spectral flatness.

---

## `docs/generation-parameters.md`

# Generation Parameters

Parameters can be passed as keyword arguments to `model.generate(...)` or via the `OmniVoiceGenerationConfig` dataclass. See below for the full list and which category each belongs to.

```python
# 1) Direct keyword arguments
audio = model.generate(text="Hello world", num_step=32, guidance_scale=2.0)

# 2) Via OmniVoiceGenerationConfig dataclass
from omnivoice import OmniVoiceGenerationConfig

config = OmniVoiceGenerationConfig(num_step=32, guidance_scale=2.0)
audio = model.generate(text="Hello world", generation_config=config)
```

## Decoding

| Parameter | Type | Default | Description |
|---|---|---|---|
| `num_step` | int | 32 | Number of iterative unmasking steps. Higher values improve quality but slow down generation. Use 16 for faster inference. |
| `denoise` | bool | True | Prepend the `<|denoise|>` token to the input, which signals the model to produce cleaner speech. |
| `guidance_scale` | float | 2.0 | Classifier-free guidance scale.|
| `t_shift` | float | 0.1 | Time-step shift for the noise schedule. Smaller values emphasise earlier steps in decoding. |

## Sampling

| Parameter | Type | Default | Description |
|---|---|---|---|
| `position_temperature` | float | 5.0 | Temperature for mask-position selection. 0 = greedy (deterministic). Higher values increase randomness. |
| `class_temperature` | float | 0.0 | Temperature for token sampling at each step. 0 = greedy (deterministic). Higher values increase randomness. |
| `layer_penalty_factor` | float | 5.0 | Penalty applied to deeper codebook layers, encouraging earlier (lower) layers to unmask first. |

> Using temperature (and seed pinning) to elicit expressive delivery — breaths, laughter, sighs — is covered in [expressive-speech.md](expressive-speech.md), including the tradeoffs.

## Duration & Speed

These accept a single value applied to all items, or a per-item list (useful in batch mode):

```python
# Fixed 10-second output
audio = model.generate(text="Hello, this is a test of duration control", duration=10.0)

# Faster speech (1.2x faster than estimated)
audio = model.generate(text="Hello, this is a test of duration control", speed=1.2)
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `duration` | float or list[float \| None] | None | Fixed output duration in seconds. Overrides `speed` when set. |
| `speed` | float or list[float \| None] | None | Speed factor. Values > 1.0 produce shorter audio (faster); values < 1.0 produce longer audio (slower). Ignored when `duration` is set. Defaults to 1.0 when both are None. |

Priority: `duration` > `speed`.

## Pre/Post Processing

| Parameter | Type | Default | Description |
|---|---|---|---|
| `preprocess_prompt` | bool | True | Whether to apply preprocessing to the voice-clone prompt audio (remove long silences in reference audio, add punctuation in the end of reference text). |
| `postprocess_output` | bool | True | Apply post-processing to generated audio (remove long silences). |

> **Note — quiet recordings are safe.** Silence removal is adaptive: if trimming at the standard threshold would consume a quiet-but-real recording, progressively gentler thresholds are tried and, as a last resort, trimming is skipped — a quiet clip clones instead of erroring. Only a clip with genuinely no audio (empty or fully silent) is rejected, with guidance to re-record closer to the microphone.
>
> **Tip — reference-clip quality transfers.** Zero-shot cloning mirrors the acoustics of the reference clip, not just the voice: a clip recorded in an echoey room clones echoey. Record dry and close-mic for clean output. No effect preset adds reverb unless you choose one that declares it (Cinematic, Warm).

For an in-app recording, choose the microphone and Auto, Mono, or Stereo in the Voice panel. While recording, the input meter confirms whether VoiceStudio is receiving a usable signal; monitoring is visual and never plays the microphone through the speakers.

## Long-Form Generation

To support stable long-form speech generation with low VRAM consumption, the text is automatically split into smaller segments when the estimated duration of the generated speech exceeds `audio_chunk_duration`, with each segment producing approximately `audio_chunk_duration` seconds of audio. This approach allows the model to accept arbitrarily long text and generate arbitrarily long speech with near-constant VRAM consumption.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `audio_chunk_duration` | float | 15.0 | Target chunk duration (seconds) when splitting long text. |
| `audio_chunk_threshold` | float | 30.0 | Estimated audio duration (seconds) above which chunking is activated. |

---

## `docs/features/dictation.md`

# Dictation

VoiceStudio dictation records from the system-wide shortcut, transcribes
locally, and—where the desktop permits it—inserts the result into the app where
the shortcut was pressed. The pill never needs keyboard focus.

The same flow is available to other applications through the bundled Rust
control sidecar. Herdr actions, editor extensions, agent hooks, and scripts can
start or stop VoiceStudio's capture over loopback HTTP/JSON-RPC or stream their
own microphone audio to the versioned WebSocket API. See the
[local speech platform](../speech-platform.md) for the protocol and examples.

## Use it

1. Install a dictation model from the Model Catalogue, then pick it in **Settings → Voice** or from the top-bar Engines menu (**Transcription → Sherpa-ONNX dictation → Dictation model**). The same choice is what the Sherpa-ONNX engine loads for dubbing and batch transcription.
2. Set the shortcut and hold/toggle behavior in **Settings → Hotkey**.
3. Put the cursor in a text field, press the shortcut, speak, then release or
   press again.

The **Transcriptions** page offers the same recorder as one contextual
**Start dictation** action: it appears in the empty state before the first
transcript and moves to the page header once history exists. A desktop start
wakes the recorder window before dispatch, so a hidden WebView cannot silently
miss the request. The in-app action confirms listener receipt, then resolves
only after microphone startup is accepted. Disabled, rejected, timed-out, or
failed starts are reported back on the page.

Whisper Tiny is the recommended default on macOS, Windows, and Linux. It
auto-detects more than 90 languages. Parakeet TDT v3 remains available for its
25 supported European languages, but it is not selected automatically.

The pill reports **Inserted** only after native delivery succeeds. **Copied**
means automatic insertion was unavailable and the complete final transcript is
ready for a normal paste. VoiceStudio retries a speech-level empty Sherpa decode
only through another ASR model whose weights are already installed; when that
fallback confirms the audio contains words, the silent model is demoted. This
recovery never starts a download.

## Destination and clipboard safety

The desktop captures the target at shortcut-down and carries its session ID
through partial, utterance, and summary messages. A late result from an older
session cannot use a newer session's target. macOS, Windows, and X11 validate
and reactivate the captured process/window before insertion. Wayland does not
expose a portable target identity or arbitrary foreign-window activation, so
the safe default leaves the transcript copied instead of guessing which app
should receive it. The GTK pill remains non-focusable.

For paste delivery, VoiceStudio snapshots text, HTML (with its plain-text
alternative), image, or file-list clipboard content, stages the transcript,
and restores the snapshot after the target consumes it.
Streaming segments share a generation-tracked lease: a stale restore cannot
win over a newer segment, and VoiceStudio never overwrites clipboard content
you copied during transcription. Unsupported clipboard formats cannot be
round-tripped; in that case the transcript remains on the clipboard instead of
attempting a lossy restore.

## Platform behavior

| Platform | Automatic insertion |
| --- | --- |
| macOS | Reactivates the captured application and sends Command-V. Without Accessibility permission, the result stays copied. |
| Windows | Validates the captured window and process, requests foreground activation, then sends Ctrl-V. If Windows denies activation, the result stays copied. |
| Linux X11 | Reactivates the captured X11 window through EWMH, verifies it, then sends Ctrl-V. |
| Wayland | Leaves the complete transcript copied because a portable captured-window identity is unavailable. |
| Browser mode | Copies the transcript; browsers cannot target another desktop app. |

Advanced Wayland users can set `VOICESTUDIO_WAYLAND_UNTARGETED_INSERT=1` to
insert into whichever client owns keyboard focus when transcription finishes.
wlroots compositors use `wtype`; KDE Plasma and GNOME can use clipboard paste
through `dotool` or `ydotool`. Helpers run with host loader variables from an
AppImage, have a bounded timeout, and never retry after one may have emitted
partial input. This opt-in cannot promise the shortcut-down target if focus
changes. `dotool` needs direct write access to `/dev/uinput`; `ydotool` 1.0+
needs a running `ydotoold` with that access and a user-readable socket.
VoiceStudio checks these prerequisites before selection. Tray-started Wayland
dictation always stays copy-only.

### Transcriptions model setup

Transcriptions checks the active dictation model before enabling **Start dictation**. If weights are missing, the page lists every dictation model, grouped by the trade-off you are choosing between — best accuracy (offline, transcribes after you stop) versus lowest latency (streaming, live text while you speak) — with languages and download size on each row, so you install the one that fits your work rather than only the recommended default. A model already on disk can be switched to without a download. The chosen model's name, download size, and installation progress are shown. Downloads require an explicit click. Failed downloads can be retried, and model state refreshes when returning from Settings. Once installation is verified, Start dictation becomes available; recording never starts automatically. Existing transcription history remains accessible during setup.

### Floating recording controls

The recording bubble includes **Pause / Resume**, **Stop**, and **Close**. Pause disables microphone tracks, stops sending new audio, and freezes the elapsed recording timer while preserving the session. Resume continues the same session. Stop (or the recording shortcut) finishes and transcribes, including when paused. Close cancels pending recording/transcription and releases the microphone; text already delivered to another app cannot be retracted. Pausing is manual, not triggered by silence or desktop inactivity.

The Transcriptions page displays the effective recording shortcut and the platform paste shortcut. The floating bubble places its live transcript below the controls in a multiline preview, so controls cannot squeeze the text into a few characters.

---

## `docs/features/diarization.md`

# VoiceStudio — Speaker Diarization

Diarization splits a single audio stream into per-speaker tracks: who said
what, and when. VoiceStudio uses **pyannote** + **WhisperX** under the hood —
the same stack the original WhisperX paper used.

## What diarization buys you

- Multi-speaker dubbing: each detected speaker gets its own voice clone in
  the target language.
- Subtitle styling: speaker labels (`SPEAKER_00:`, `SPEAKER_01:`, …) on the
  exported SRT/VTT files.
- Audio editing: per-speaker tracks in the timeline view.

## License acceptance flow

The diarization model — `pyannote/speaker-diarization-3.1` — is **gated** on
HuggingFace. A valid HF token alone is not enough: you also need to accept
the model's license once.

1. Get a HF token if you don't have one — see
   [docs/setup/huggingface-token.md](../setup/huggingface-token.md).
2. Set the token via **Settings → API Keys** (or any of the other supported
   paths).
3. While signed in to HuggingFace with the same account, visit:
   - https://huggingface.co/pyannote/speaker-diarization-3.1 → **"Agree and
     access repository"**.
   - https://huggingface.co/pyannote/segmentation-3.0 → same.
4. Restart the dub job. The first run downloads ~600 MB of model weights.

If you skip the license acceptance, the HF API returns `401 Unauthorized` for
the download — the same error class the in-app **"Open docs for this error"**
button deeplinks to.

## Fallback behaviour

When diarization is unavailable (no HF token, license not accepted, model
download failed mid-run), VoiceStudio's dub pipeline falls back to a
**silence-gap heuristic** that splits speakers on long quiet stretches.
You'll see a warning toast and the `dub_core.py` reason string surfaces in
the job log:

- `"diarization_skipped:no_token"` — no token resolved from the cascade.
- `"diarization_skipped:401"` — token present but unauthorised on the gated
  model (license not accepted).
- `"diarization_skipped:network"` — model download interrupted.

The heuristic is not as accurate as pyannote — speakers with similar pitch
or rapid turn-taking conversation get merged — but it lets the dub finish
end-to-end instead of erroring.

## HF token requirement

Diarization is the one VoiceStudio feature where a HF token is **required**, not
just recommended. See
[docs/setup/huggingface-token.md](../setup/huggingface-token.md) for the
three-source cascade and how the in-app **Settings → API Keys** panel works.

## Troubleshooting

- HF 401 → see [troubleshooting.md#2-hf-401--pyannote-license-not-accepted](../install/troubleshooting.md).
- Model download stuck → check `~/.cache/huggingface/hub/models--pyannote--*`
  size grows during the dub; if it stalls at 0 bytes, your token isn't being
  read — confirm in **Settings → API Keys** that the active source has a
  green checkmark.

---

## `docs/dubbing/translation-engines.md`

# Translation engines (Dub tab)

VoiceStudio dubs in two steps: **transcribe → translate → speak**. The *translate*
step is pluggable — pick the engine in the Dub tab's **Engine** dropdown. Two
engines are **built in** and always available offline; the rest need a small
optional Python package.

| Engine | Category | Needs a package? | Key needed? |
|--------|----------|------------------|-------------|
| **Argos** (Local, Fast) | offline | `argostranslate` (bundled) | no |
| **NLLB-200** (Local, Heavy) | offline | none (uses core `transformers`) | no |
| Google Translate (Free) | online | `deep_translator` | no |
| DeepL | online | `deep_translator` | yes (`DEEPL_API_KEY`) |
| Microsoft Translator | online | `deep_translator` | yes (`MICROSOFT_API_KEY`) |
| MyMemory | online | `deep_translator` | no |
| LLM (OpenAI-compatible) | llm | `openai` | usually yes |

If you pick an engine whose package isn't importable yet, the Engine label shows
a **highlighted Install affordance**, and — if you try to translate anyway — the
backend returns a single, actionable error telling you exactly what to install
(the install command is single-sourced, so the button and the error never
disagree).

## Bring your own translation (Paste Translation)

You don't have to use any of these engines. If you already translated the
transcript somewhere else — ChatGPT, DeepL's website, a human translator — click
**Paste Translation** above the segment table and paste the result. It maps onto
the segments you already have: **no re-transcription, no timing loss**, and the
original transcript (`text_original`) is left alone so a later *Translate All*
still works from the source text.

Three input shapes are auto-detected:

| Shape | Looks like | Mapped by |
|-------|-----------|-----------|
| **Timestamped** | a full `.srt` / `.vtt` | time overlap with your segments |
| **Numbered lines** | `1. …` / `2) …` / `[3] …` | the line number (falls back to order if a model renumbers) |
| **Plain lines** | one translated line per segment | position; blank lines are separators, never empty translations |

You can also drop (or pick) a `.srt`/`.vtt` file straight into the dialog.

Nothing is applied until you confirm: the dialog previews every row as
before → after, flags rows nothing matched, and counts how many pasted lines
went unused. **Apply** is disabled only when *nothing* matched, unmatched rows
are left exactly as they were, and the whole paste is a single undo step. The
rows you changed are marked stale for regeneration automatically, so a
**Regen N changed** pass re-speaks just those lines.

This writes only the **currently selected** target language, so you can paste a
different external translation per language tab without disturbing the others.

## Installing optional translation engines (from-source vs packaged build)

How you add an engine depends on **how you installed VoiceStudio**.

### From-source / dev install (one-click)

If you cloned the repo and run VoiceStudio from source (`uv sync` + the dev
launcher) or via Docker, the app can install engines for you:

1. In the Dub tab, open the translation settings and pick the engine you want
   (e.g. **Google Translate**) from the **Engine** dropdown.
2. A highlighted **Install** button appears next to the *Engine* label. Click it.
3. VoiceStudio runs the install into the **same** Python environment the backend
   is using (`uv pip install <package> --python <backend-interpreter>`), then
   re-probes. When it reports *"restart the backend to load it"*, restart so the
   freshly-installed module is importable.

You can also install by hand into the backend venv:

```
uv pip install deep_translator   # Google / DeepL / Microsoft / MyMemory
uv pip install argostranslate    # Argos (already bundled; rarely needed)
uv pip install openai            # LLM (OpenAI-compatible) provider
```

Then restart the backend.

### Packaged / installer build (read-only — use the popover)

The signed desktop installers (`.dmg`, `.msi`, AppImage, `.deb`) ship a
**read-only, code-signed Python environment**. Installing extra packages into it
would break the signature, so **in-app install is intentionally disabled** on
these builds. Selecting an uninstalled engine there shows a highlighted button
that opens a small popover with everything you need:

- **The exact command** to run (with a copy-to-clipboard button) if you *do*
  have a from-source checkout somewhere and want the online engines there.
- **Switch to Argos (bundled, offline)** — one click. Argos and NLLB are always
  importable in every build, so this is the guaranteed escape hatch: you can
  keep dubbing immediately, fully offline, no install required.
- A link back to this page.

**Recommendation for packaged builds:** just use **Argos** (fast, offline) or
**NLLB-200** (heavier, higher quality, offline). They need nothing installed and
never leave your machine. Reach for the online engines only from a from-source
install where you can add their package.

## Translation quality: Fast, Autofit, Cinematic

The **Quality** control in the Dub tab (and Settings → Translation) picks how the
translation is produced:

- **Fast** — a direct one-shot translation from the selected engine (Argos, NLLB,
  Google, …). No LLM, no timing awareness.
- **Cinematic** — an LLM refines the literal translation (reflect → adapt) for
  natural, in-context phrasing.
- **Autofit** — Cinematic **plus** a strict fit-to-time pass: the LLM rewrites
  each line so its target-language reading time fits **within** the segment's
  slot (never overruns it). This keeps the video timing intact and avoids the
  stressed audio time-stretch you get when a translation is too long for its
  slot. Fit is per-language pronunciation-speed aware.

Cinematic and Autofit **require an LLM** (below). If none is configured, they
fall back to Fast with a notice.

## Two-stage quality on the LLM engine (auto-glossary + reflect pass)

When the **LLM (OpenAI-compatible)** engine is the active translator, two extra
quality stages run by default. Both have checkboxes next to the Quality control
in the Dub tab's translation settings (they only appear for the LLM engine —
MT engines can't run either stage):

- **Auto glossary** — before the per-segment translation, ONE extra LLM pass
  reads the whole transcript and extracts a short theme summary plus a
  source → target terminology map. That brief rides every segment's translation
  prompt, so character names, places, and recurring domain terms come out the
  same in segment 3 and segment 300. It's merged with your manual glossary —
  **your entries always win** on a clashing term. The result is cached with the
  dub project per target language, so re-translating an unchanged transcript
  costs zero extra calls; editing segments re-extracts.
- **Reflect pass** — after each segment's direct translation, the LLM critiques
  the draft for wordiness and stiff/unnatural register, then rewrites it as
  natural spoken dialogue. **This uses 3 LLM calls per segment instead of 1** —
  turn it off for long videos on slow or metered providers. If any refinement
  step fails or times out, the direct translation is kept silently; refinement
  can never fail a segment.
### Fit prediction (all quality levels)

Every translation additionally gets a **pre-synthesis fit check** — no LLM
needed. For each segment, VoiceStudio predicts how long the translated line will
take to speak (self-calibrating to your voice/engine from segments already
generated in the job, with a per-language rate table as the cold-start
fallback) and compares it against the slot plus the silence it can borrow
before the next line. Segments the Smart Fit caps can only absorb with an
audible speed-up get a **Tight fit** badge; segments no fitting can save get a
**Won't fit +Ns** badge — so you can shorten the text *before* burning GPU
time on a line that would end up trimmed. Badges are informational only:
generation is never blocked.

**Suggest shorter lines** (checkbox under Quality, off by default) goes one
step further: for every "Won't fit" segment it asks the configured LLM for a
meaning-preserving shorter rewrite and offers it on the row as a one-click
**Use shorter rewrite** suggestion. It never rewrites anything automatically,
and with no LLM configured (or on any LLM error) it simply does nothing.

## LLM Providers (for Cinematic / Autofit)

**Settings → System → LLM Providers** is the one place to set up the LLM. Pick a
provider, paste its API key, choose a model, **Test** it, and "use for
translation." Supported: OpenAI, OpenRouter, OrcaRouter, Groq, Cerebras, Google AI (Gemini),
Mistral, Cohere, NVIDIA, GitHub Models, Cloudflare, Hugging Face, SambaNova,
SiliconFlow, **local Ollama / LM Studio** (offline, no key), and a **Custom**
OpenAI-compatible endpoint.

Keys entered here are stored **encrypted** on your machine and never returned to
the UI. For a fully offline setup, pick **Ollama** (`ollama pull llama3.1`) or
**LM Studio** — nothing leaves the machine. Power users can still override any
provider via environment variables (e.g. `GROQ_API_KEY`, or the legacy
`TRANSLATE_BASE_URL` / `TRANSLATE_API_KEY` / `TRANSLATE_MODEL`, which map to the
**Custom** provider).

OrcaRouter can be configured without the UI with `ORCAROUTER_API_KEY`, and its
defaults can be overridden with `ORCAROUTER_BASE_URL` and `ORCAROUTER_MODEL`.

### Pinning the active provider with `LLM_DEFAULT_PROVIDER`

By default the LLM used for Cinematic/Autofit is the one you mark "use for
translation" in **Settings → LLM Providers**. To force a specific provider
regardless of that stored selection — handy for headless/CI/Docker runs or a
shared machine — set the `LLM_DEFAULT_PROVIDER` environment variable to a
provider id before launching the backend:

```
LLM_DEFAULT_PROVIDER=groq        # or openai, openrouter, orcarouter, cerebras, ollama, custom, …
```

Resolution order for the active provider is: `LLM_DEFAULT_PROVIDER` (env) →
your saved selection → the first provider that has a key → none. The id must be
one VoiceStudio knows (the ids shown in **Settings → LLM Providers**); an unknown
value is ignored and resolution falls through to your saved selection. While
this env var is set it wins over the in-app picker, so if the UI selection
appears to have "no effect," check whether `LLM_DEFAULT_PROVIDER` is exported.

## LLM Skills (per-feature routing)

**Settings → System → LLM Skills** lists every LLM-powered feature — Cinematic &
Autofit translation, speech-rate slot fitting, glossary auto-extract, direction
parsing, and dictation cleanup — and lets you toggle each one or route it to a
specific provider instead of the global active one. That way sensitive work
(e.g. dictation cleanup) can stay on a local Ollama/LM Studio model while
heavier jobs use a remote provider. A disabled skill degrades exactly like
having no LLM configured: Cinematic/Autofit falls back to Fast, dictation
cleanup passes the raw transcript through, direction parsing uses the keyword
heuristic. Everything defaults to enabled + "use active provider", so existing
setups behave unchanged.

## API keys (online MT engines)

The non-LLM online engines need a key, set as an environment variable before
launching the backend (or in **Settings → Credentials**):

- **DeepL:** `DEEPL_API_KEY` (optionally `DEEPL_BASE_URL` for a self-hosted /
  pro endpoint).
- **Microsoft Translator:** `MICROSOFT_API_KEY` (optionally `MICROSOFT_BASE_URL`).

## Editing workspace

After transcription, drag the divider between the video/timeline and transcript
columns to give either side more room. The divider also works from the keyboard:
focus it, use Left/Right Arrow in 5% steps, or Home/End for the minimum/maximum.
VoiceStudio remembers the split on this device. Narrow workspaces stack the two
panels instead so neither editor becomes unusably small.

## Troubleshooting

- **"The 'google' translation engine needs the optional deep_translator Python
  package…"** — the package isn't installed. On a from-source install, click the
  Install button (or run the command above) and restart. On a packaged build,
  switch to Argos/NLLB via the popover.
- **Install button does nothing / says "disabled in packaged builds"** — you're
  on a signed installer build (expected). Use Argos/NLLB, or add the package in a
  from-source checkout.
- **Installed it but still "needs install"** — restart the backend so Python
  picks up the newly-installed module.

---

## `docs/dubbing/export.md`

# Exporting dubbed video

Video exports can contain both the source audio and one or more dubbed tracks.
VoiceStudio marks the selected dubbed language as the default so ordinary video
players and messaging apps play the dub immediately. Choose **Original** in the
Default Track control when the source audio should play first instead.

## Hardsub captions

Turning on **Burn subtitles into picture (hardsub)** re-encodes the video with
captions rendered into the frames. Two caption styles are available:

- **Line** (default) — static line subtitles, unchanged from previous releases.
- **Karaoke (word highlight)** — each word fills with the highlight colour in
  sequence across the line. Word timings recorded at transcription time drive
  the sweep when they still spell the burned text; otherwise (older jobs, or
  translated tracks) the timing is spread evenly across each line. Karaoke is
  not available together with the dual-layout (translation + original) style —
  switching dual on falls back to the line burn.

Smart Fit exports burn captions after the video retime, so both styles follow
the fitted timeline. The karaoke script can also be downloaded on its own from
`GET /dub/ass/{job_id}` as an `.ass` sidecar.

---

## `docs/persona-format.md`

# Portable personas — the `.ovsvoice` format

A **`.ovsvoice`** file is a portable voice persona: a single ZIP that packages a
voice profile's identity, an optional reference clip, a consent attestation, an
SPDX license tag, and a **watermarked preview**. You can export one from any
voice and import it back into another VoiceStudio install — fully local, no
account, no upload to anyone.

It supersedes the older `.omnivoice` share bundle. VoiceStudio still imports
`.omnivoice` files (they just carry no consent / license / preview).

## Export

**Voices → open a voice → Export persona.**

- The **"Include voice clip"** checkbox controls privacy:
  - **On (default):** the bundle carries your raw reference/locked audio, so the
    imported persona clones with full fidelity.
  - **Off:** a **preview-only** bundle — only the watermarked preview travels, no
    raw recording of your voice leaves the machine. The imported persona is still
    usable (the preview becomes its reference clip).
- A short **preview** is always generated and, when AudioSeal is installed,
  **watermarked** so the audio can be attributed back to VoiceStudio. Behaviour is
  identical on macOS, Windows, and Linux; without AudioSeal the preview is still
  written, just flagged un-watermarked.
- The file downloads as `<voice name>.ovsvoice`.

## Import

**Voices → My Imports → the package button (next to Upload).** Pick a
`.ovsvoice` (or legacy `.omnivoice`) file; the persona appears in your voice
list.

### Consent & verification

A persona's **verified-own-voice** status can't be forged by hand-editing the
bundle. On import, VoiceStudio marks a persona verified **only** when all three
hold: a real consent recording is present (above the minimum length), the
consent statement text is non-empty, and a `consent.json` attestation is
included. Otherwise it imports **unverified** — still usable for local
synthesis; verification is only required for agentic features and community
sharing, never for plain local generation. You can always re-attest locally
afterwards.

## What's inside (`.ovsvoice` = ZIP)

| Member | Purpose | Presence |
|--------|---------|----------|
| `manifest.json` | format + schema version, persona identity, engine/design params, license, tags, preview metadata | required |
| `metadata.json` | legacy-shaped copy so older VoiceStudio can still read the ref audio | always written |
| `preview.wav` | watermarked preview (24 kHz mono) | required |
| `consent.json` | attestation: method, statement text, verified flag, timestamp | optional |
| `ref_audio.*` / `locked_audio.*` | the reference / locked clip | omitted when "Include voice clip" is off |
| `consent_audio.*` | the recorded consent statement | optional |

The manifest's `license.spdx` is validated against an allowlist (plus
`LicenseRef-` custom ids); anything unrecognised normalises to
`LicenseRef-VoiceStudio-Personal`. The license is **metadata only** — VoiceStudio
does not enforce it.

## Privacy & local-first

Export and import are **100% local** — building a bundle reads your local
database and files and writes a ZIP on the same machine; importing reads a local
file. No network call is made on any export/import/inspect path, and the feature
works fully offline. (The only adjacent network use is AudioSeal's optional
one-time model download for watermarking, which degrades to a no-op offline.)

---

## `docs/speech-platform.md`

# Local speech platform

VoiceStudio is both a desktop dictation app and a headless local speech
service. The desktop remains one app: its bundled Rust control sidecar owns
microphone activation, focused-target capture, clipboard safety, and native
insertion; the Python backend keeps ASR models warm and exposes the audio data
plane.

This split lets an integration choose how much it owns:

```text
Herdr / terminal / desktop app ── start, stop, toggle ──> Rust control :3902
                                                          │
                                                          ├─ captures target
                                                          ├─ opens VoiceStudio mic
                                                          └─ inserts final text

VS Code / custom GUI / remote mic ── PCM or WebM ───────> WS/HTTP :3900
                                                          │
                                                          └─ partial/final text
                          reserve target / insert final ─> Rust control :3902

Claude Code / Codex / Pi / agents ── MCP HTTP/stdio ───> MCP :3900
```

The Rust sidecar is part of the VoiceStudio process, not a second application.
It starts with the desktop app and binds only to `127.0.0.1`.

## Discover capabilities

Desktop/native discovery:

```bash
curl http://127.0.0.1:3902/.well-known/voicestudio-speech
```

Engine/data-plane discovery:

```bash
curl http://127.0.0.1:3900/.well-known/voicestudio-speech
```

Both return `voicestudio.speech.v1`. The desktop document includes absolute
control, batch, streaming, output-session, and MCP endpoints. The backend
document uses relative URLs so it also works behind Tailscale or a reverse
proxy; it advertises native control only when launched by the desktop app.

## Use VoiceStudio capture from any app

These calls use VoiceStudio's existing microphone, model selection, pill,
refinement, and session-bound insertion. The app under the cursor remains the
destination.

```bash
curl -X POST http://127.0.0.1:3902/v1/dictation/start
curl -X POST http://127.0.0.1:3902/v1/dictation/stop
curl -X POST http://127.0.0.1:3902/v1/dictation/toggle
```

JSON-RPC clients use the same actions:

```json
{"jsonrpc":"2.0","id":1,"method":"dictation.toggle"}
```

Send that object to `POST http://127.0.0.1:3902/rpc`. The installed
VoiceStudio executable also accepts `--dictate-start`, `--dictate-stop`, and
`--dictate-toggle`; the single-instance bridge forwards them to the running
app without opening the Studio window.

The dependency-free Python bridge is convenient for hooks and TUIs:

```bash
python -m backend.speech_client status
python -m backend.speech_client toggle
python -m backend.speech_client transcribe recording.wav
python -m backend.speech_client transcribe recording.wav --insert
```

`--insert` captures the focused destination before transcription starts and
uses the same clipboard-preserving native delivery as the global shortcut.

## Bring your own capture interface

An editor extension or GUI can own the microphone and consume live text.
Connect to:

```text
ws://127.0.0.1:3900/v1/audio/transcriptions/stream
```

Send binary WebM/Opus frames by default. For raw signed 16-bit mono PCM, use
`?pcm=1&sr=16000`. Finish without closing the socket by sending:

```json
{"type":"input_audio.end"}
```

Every response carries `protocol` and `session_id`:

```json
{"type":"session.started","protocol":"voicestudio.speech.v1","session_id":"..."}
{"type":"partial","text":"hello wor...","session_id":"..."}
{"type":"final","final_kind":"summary","text":"Hello world.","session_id":"..."}
```

Streaming Sherpa models can also emit `final_kind: "utterance"` before the
authoritative whole-session `summary`. Existing `/ws/transcribe` clients keep
their unchanged legacy frames and `EOF` control.

To reuse native insertion with a custom capture client:

1. `POST /v1/output/sessions` on port 3902 before opening the microphone.
2. Stream audio and receive the final text on port 3900.
3. `POST /v1/output/sessions/{id}/insert` with `{"text":"..."}`.
4. If capture is cancelled, `DELETE /v1/output/sessions/{id}`.

Only one output session can own a focused destination at a time. Stale IDs are
rejected instead of inserting into a newer target.

## Batch and agent protocols

| Transport | Endpoint | Use |
|---|---|---|
| OpenAI-compatible HTTP | `POST :3900/v1/audio/transcriptions` | Files, scripts, existing SDKs |
| WebSocket | `:3900/v1/audio/transcriptions/stream` | Partial and final live text |
| MCP Streamable HTTP | `POST :3900/mcp` | Modern agent clients |
| MCP stdio | `python -m backend.mcp_shim` | Claude Code, Codex, and stdio-only clients |
| JSON-RPC | `POST :3902/rpc` | Native dictation control |
| Native CLI | VoiceStudio `--dictate-*` flags | Hooks and plugin actions |

## Integration map

| Interface | Recommended connection |
|---|---|
| Any desktop text field | Existing global shortcut or Rust `dictation.toggle` |
| Herdr | Merge [the example command bindings](../examples/speech-platform/herdr-config.toml) into Herdr's config; detached commands call the Rust API while the pane stays focused |
| Pi, Claude Code, Codex, Antigravity CLI | Dictate into the focused prompt through Rust; add MCP when the agent also needs file transcription or speech tools |
| VS Code | Call Rust HTTP from the extension host for app-wide dictation, or stream editor-owned mic audio over the versioned WebSocket |
| TUI or shell script | `python -m backend.speech_client` or HTTP/JSON-RPC |
| Browser/WebView UI | Stream audio to the Python data plane; browser pages cannot silently call native control |
| Remote microphone + local/remote GPU | Capture at the client edge and use the authenticated WebSocket/OpenAI endpoint |

Loopback clients need no credential. Remote native WebSocket clients can send
the configured bearer key. Browser clients should exchange that key for a
short-lived session, mint a path-bound ticket at `/api/auth/ws-ticket`, and
connect with `?ws_ticket=...`; see [API authentication](api-auth.md).
Keep remote endpoints restricted to a trusted network; an API key authenticates
a client but does not provide network isolation. Beyond a fully trusted LAN,
use HTTPS/WSS and never send bearer credentials or ticket exchanges over
plaintext HTTP/WebSocket.

## Security and privacy

- The native control sidecar binds only to IPv4 loopback and rejects untrusted
  browser `Origin` headers, blocking ordinary websites from turning on the mic.
- Native control never accepts audio and is never exposed through Network
  Sharing. Remote ASR stays on the existing API-key boundary.
- Microphones stay at the interface edge. A remote GPU backend never assumes
  it owns the user's input device.
- No protocol adds a required network call, account, analytics event, or cloud
  provider.

## Research basis

The design survey covered five pages of GitHub's
[`speech-to-text` topic](https://github.com/topics/speech-to-text):
[1](https://github.com/topics/speech-to-text?page=1),
[2](https://github.com/topics/speech-to-text?page=2),
[3](https://github.com/topics/speech-to-text?page=3),
[4](https://github.com/topics/speech-to-text?page=4), and
[5](https://github.com/topics/speech-to-text?page=5).

The platform keeps the strongest reusable ideas without copying their UI
boundaries:

| Source | Adopted idea |
|---|---|
| [Handy](https://github.com/cjpais/Handy) | Cross-platform offline dictation, external toggle control, VAD-oriented capture |
| [WhisperLiveKit](https://github.com/QuentinFuxa/WhisperLiveKit) | Live local transcription and compatibility-oriented serving |
| [RealtimeSTT](https://github.com/KoljaB/RealtimeSTT) | Low-latency partials, endpointing, and warm recognizers |
| [sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx) | Portable CPU streaming models and WebSocket-friendly audio framing |
| [FunASR](https://github.com/modelscope/FunASR) | OpenAI-compatible and MCP-facing serving |
| [Vexa](https://github.com/Vexa-ai/vexa) | WebSocket transcripts plus agent access |
| [Voquill](https://github.com/voquill/voquill) | Provider independence, refinement, and personal-vocabulary direction |
| [Muesli](https://github.com/Muesli-HQ/muesli) | Machine-readable CLI contracts and session-safe automation |
| [Herdr](https://github.com/motionharvest/herdr) | One local control surface behind CLI, socket, hooks, and plugin integrations |

The differentiator is the connection layer: one bundled app offers native
capture/output control and a protocol-neutral ASR service, so every interface
does not rebuild model loading, desktop permissions, and insertion safety.

---

## `docs/agentic-voice.md`

# Agentic voice: VoiceStudio as a TTS/STT provider

VoiceStudio exposes a **local speech platform**—OpenAI-compatible batch audio,
a versioned transcription WebSocket, native dictation control, and MCP—so any agent framework that
speaks to OpenAI's audio endpoints can use your local VoiceStudio for speech —
in your own cloned voice, with nothing leaving your machine. You bring the
agent runtime; VoiceStudio is the voice.

For dictating directly into Claude Code, Codex, Pi, Antigravity CLI, Herdr, or
another focused prompt, use the [Rust control sidecar](speech-platform.md).

This is "agentic v1": VoiceStudio is a provider, not the orchestrator. You wire
your own agent (a support line, a desk assistant, a Discord persona) and point
its TTS/STT at VoiceStudio.

> **Scope.** This page covers VoiceStudio-as-provider. Outbound phone calls are a
> separate, deferred milestone (they need a paid carrier — there is no
> fully-local path to the PSTN) and ship only behind explicit consent
> guardrails. See the roadmap in `docs/competitive-analysis.md` (§R1).

## The endpoints

VoiceStudio's service root is `http://localhost:3900` (or your
[remote backend URL](remote-gpu.md)). OpenAI-compatible clients use
`http://localhost:3900/v1` as their base URL, while discovery stays at the
service root: `http://localhost:3900/.well-known/voicestudio-speech`.

| OpenAI route | VoiceStudio support |
|---|---|
| `POST /v1/audio/speech` | TTS. `model` = engine id, `voice` = a voice-profile id (your clone) or preset, `response_format` incl. `pcm` and `wav`, `speed`. Default output is 24 kHz. |
| `POST /v1/audio/transcriptions` | STT (Whisper-family). |
| `WS /v1/audio/transcriptions/stream` | Live partial/final STT from PCM or WebM. |
| `GET /.well-known/voicestudio-speech` | Machine-readable transport discovery. |
| `GET /v1/audio/voices` | list available voices (VoiceStudio extension). |

A contract test (`tests/test_agentic_provider_contract.py`) pins this request
shape in CI, so the recipes below won't silently break.

## pipecat (recommended)

[pipecat](https://github.com/pipecat-ai/pipecat) (BSD-2) runs as a Python
library inside your own process — no extra server. Point its OpenAI TTS/STT
services at VoiceStudio:

```python
from pipecat.services.openai.tts import OpenAITTSService
from pipecat.services.openai.stt import OpenAISTTService

tts = OpenAITTSService(
    base_url="http://localhost:3900/v1",
    api_key="not-needed-locally",        # any string; VoiceStudio ignores it unless OMNIVOICE_API_KEY is set
    voice="<your-voice-profile-id>",     # from GET /v1/audio/voices, or "default"
    model="omnivoice",                   # or any installed engine id
    sample_rate=24000,                   # matches VoiceStudio's default output
)

stt = OpenAISTTService(
    base_url="http://localhost:3900/v1",
    api_key="not-needed-locally",
)
```

Drop those into any pipecat pipeline (VAD, turn-taking, and LLM stay local
too). A minimal runnable example is in
[`examples/agentic/pipecat_minimal.py`](../examples/agentic/pipecat_minimal.py).

## LiveKit Agents

[LiveKit Agents](https://github.com/livekit/agents) (Apache-2.0) needs a
LiveKit media server alongside, but its OpenAI plugin takes the same
`base_url`:

```python
from livekit.plugins import openai

tts = openai.TTS(base_url="http://localhost:3900/v1", api_key="x", voice="<profile-id>")
stt = openai.STT(base_url="http://localhost:3900/v1", api_key="x")
```

Choose LiveKit over pipecat only when you need its WebRTC/SIP scale; for a
single local agent, pipecat is lighter.

## Remote backend

Running VoiceStudio on a [remote GPU box](remote-gpu.md)? Append `/v1` to that
backend's service-root URL for the OpenAI client's `base_url`, and pass its
`OMNIVOICE_API_KEY` as the `api_key` — the same bearer the rest of the app uses.
Keep the unmodified service root for `/.well-known/voicestudio-speech`
discovery, and keep the backend on your tailnet, not the open internet.

## Use your own voice responsibly

When an agent speaks in a cloned voice, prefer a profile you've marked
**verified own voice** (Settings → a voice profile → Voice ownership). That
consent lock is what gates the heavier agentic features as they land, and
it's the honest default for "an AI is speaking as me."

---

## `docs/mcp.md`

# MCP server — let agents speak in your voice

VoiceStudio ships an [MCP](https://modelcontextprotocol.io/) server so AI agents
(Claude Code, Cursor, …) can synthesize speech, clone voices, transcribe audio,
and list your voices — locally, in a voice you choose per agent. The server is
**mounted on the running backend** at `/mcp`, so there's nothing extra to
start once VoiceStudio is open.

## Tools

| Tool | What it does |
|---|---|
| `generate_speech` | text → WAV. Uses the agent's bound voice unless a `profile_id` is passed. Returns base64 by default, or a URL + file in [files mode](#output-mode-and-file-inputs). |
| `clone_voice` | reference audio (base64, or a `ref_audio_path` under the base path) → new voice profile. Returns a `profile_id` for use with `generate_speech`. |
| `transcribe` | audio (base64, or an `audio_path` under the base path) → text (646 languages). |
| `list_voices` / `list_personalities` / `list_languages` | enumerate what's available. |
| `check_health` | backend status + active GPU device. |

## Output mode and file inputs

An LLM agent pays for every byte it receives in context, and a WAV as base64
is a lot of bytes — a short clip already brushes per-result limits, a
paragraph of narration blows them. Two environment variables move the audio
out of the conversation and onto disk, where an agent can hand it to a player
or another tool by path:

| Variable | Values | Effect |
|---|---|---|
| `OMNIVOICE_MCP_OUTPUT_MODE` | `resources` (default) · `files` · `both` | `resources` returns `wav_base64` inline (the original contract). `files` returns `audio_url` (the render served at `/audio/<audio_id>.wav`, which the backend keeps anyway) and, when a base path is set, `output_path` — the WAV written into that directory. `both` returns everything. |
| `OMNIVOICE_MCP_TIMEOUT_S` | seconds (default: follows the backend) | How long a tool waits on the backend. Unset, each tool waits as long as the backend itself would, plus 30 s, and never less than 120 s. `transcribe` follows `OMNIVOICE_ASR_TRANSCRIBE_TIMEOUT_S` (300 s by default, queue time included). `generate_speech` follows the backend's queue wait (`OMNIVOICE_GPU_QUEUE_TIMEOUT_S`, 1,800 s by default) plus the larger of `OMNIVOICE_GENERATE_TIMEOUT_S` and `OMNIVOICE_CPU_GENERATE_TIMEOUT_S`, plus 1 s per 40 characters past 1,200. The agent then gets the backend's own timeout error instead of an empty one. Set this to use one fixed wait for every tool. On a machine that hasn't downloaded the OmniVoice model yet, the first `generate_speech` also downloads it (about 2.3 GB) inside the backend's budget: install the model first (first-run setup, or Model Catalogue) or raise `OMNIVOICE_GENERATE_TIMEOUT_S` before the first call. |
| `OMNIVOICE_MCP_BASE_PATH` | a directory | The **security boundary** for file-shaped traffic. `transcribe(audio_path=…)` and `clone_voice(ref_audio_path=…)` read only from inside it (relative paths resolve against it, absolute paths must already lie within it, symlinks are resolved before the check), and files mode writes only into it. With no base path configured, path arguments are refused with a reason. |

Input files are opened through confined, no-follow descriptors after path
validation, so replacing a checked file or parent directory cannot redirect a
read outside the base path.

Set them on the **backend's** environment for the mounted `/mcp` endpoint
(the launcher, a service file, Docker `-e`), or on the server entry's `env`
when running `python -m backend.mcp_server` standalone. The base path must be
visible to both the backend and the agent. If they run in different containers
or filesystem namespaces, mount one shared directory at the same path in both;
`output_path` is reported in the backend's namespace. The agent's working
directory is suitable only when that shared mount exists. With this setup,
`OMNIVOICE_MCP_OUTPUT_MODE=files` keeps every render out of agent context while
still returning a path the agent can use.

## Connecting

### Streamable HTTP (modern clients)

Point your client at the mounted endpoint:

```
http://localhost:3900/mcp
```

To bind this agent to a specific voice, send an
`X-VoiceStudio-Client-Id` header (e.g. `claude-code`). See
[per-agent voices](#per-agent-voices).

**Agents in Docker or on another machine:** the MCP SDK rejects non-localhost
Host headers by default (DNS-rebinding guard). Set
`OMNIVOICE_MCP_ALLOWED_HOSTS` to a comma-separated list of host patterns the
agent connects from (e.g. `host.containers.internal:*,192.168.1.50:*`).
Keep this on a trusted LAN or behind TLS (Tailscale Serve, a reverse proxy
with HTTPS) — the MCP transport is not authenticated, so don't expose it on
the open internet.

### stdio (clients that only speak stdio)

Use the bundled shim — it proxies stdio ↔ the mounted HTTP endpoint. Drop
this into your client's MCP config (`docs/mcp.json` is a template):

```json
{
  "mcpServers": {
    "omnivoice": {
      "command": "python",
      "args": ["-m", "backend.mcp_shim"],
      "cwd": "/path/to/VoiceStudio",
      "env": { "OMNIVOICE_PORT": "3900", "OMNIVOICE_CLIENT_ID": "claude-code" }
    }
  }
}
```

The shim forwards `OMNIVOICE_CLIENT_ID` as the `X-VoiceStudio-Client-Id` header,
so the per-agent voice binding works the same as the HTTP path. It waits for
the backend to be up, relays JSON-RPC, and exits cleanly when the client
closes.

## Per-agent voices

Each agent identifies itself with a **client id**. Bind a client id to a voice
profile so different agents speak differently — "Claude Code in Morgan, Cursor
in Scarlett". Voice resolution precedence on every `generate_speech` call:

1. an explicit `profile_id` argument, else
2. the calling agent's binding, else
3. the global default voice, else
4. VoiceStudio's default voice.

Manage bindings over the loopback REST API (the Settings UI uses these):

```bash
# list
curl localhost:3900/api/mcp/bindings
# bind claude-code → a voice profile
curl -X PUT localhost:3900/api/mcp/bindings \
  -H 'Content-Type: application/json' \
  -d '{"client_id":"claude-code","label":"Claude Code","profile_id":"<voice-profile-id>"}'
# remove
curl -X DELETE localhost:3900/api/mcp/bindings/claude-code
```

Prefer a [consent-verified](../docs/competitive-analysis.md) voice profile for
any agent that speaks as you.

## Disabling

Set `OMNIVOICE_MCP_DISABLE=1` to skip mounting `/mcp` entirely.

---

## `docs/api-auth.md`

# Authenticating the local API

For an application backend consuming a pinned, private VoiceStudio deployment,
start with the [production private API pattern](production-private-api.md).

VoiceStudio's backend is **loopback-only and unauthenticated by default** — a
script running on the same machine as `http://localhost:3900` needs no key, no
PIN, no header. Everything on this page only matters once you reach the backend
from **another device** (a phone on your LAN, a laptop over Tailscale, a client
behind a reverse proxy).

There are two independent gates, both **inert until you turn them on**, plus one
env var that exempts trusted callers:

| Gate | Turn on with | Guards | Applies to |
|---|---|---|---|
| **Share PIN** | the in-app Network share toggle | casual LAN-share guests, one session | non-loopback **HTTP** |
| **API key** | `OMNIVOICE_API_KEY` env var on the backend | direct clients and first-party session bootstrap | non-loopback **HTTP + WebSocket** |
| **Trusted networks** | `OMNIVOICE_TRUSTED_NETWORKS` env var | *exempts* the two gates above | non-loopback **consumption** routes only |

Loopback traffic (`127.0.0.1`, `::1`, `localhost`) is **never** gated — local
tools keep working unchanged whichever gate is set.

> VoiceStudio separates **consumption** (TTS, dictation, voices) from
> **administration** (`/system/*`, `/api/settings/*` — RCE-class). The PIN and
> trusted networks are *consumption* credentials; the **admin surface is only
> ever reached from loopback or with the API key**. Host-path capabilities stay
> desktop-only even with a key (see [Admin routes](#admin-routes-and-server-mode)).

> Both gates can be active at once. The PIN and the API key are independent; when
> both are set, each is checked on the paths it covers. Session exchange validates
> the master key before the PIN gate so the UI can bootstrap safely; ordinary HTTP
> requests still require the PIN afterward, and the UI prompts for it next.

---

## Share PIN

The PIN is the lightweight, in-app path: flip on **Network** sharing (footer
**Local** pill → **Network**, or **Settings → Sharing & Remote Access**) and the
app generates a fresh **6-digit PIN** for that session. It is regenerated every
time you enable sharing and is **never written to disk**. See
[docs/sharing.md](sharing.md) for the UI walkthrough.

While a PIN is set, every **non-loopback HTTP request** to an API route must
present it. Supply it any one of three ways:

| Where | How |
|---|---|
| Header | `X-OmniVoice-Pin: <pin>` |
| Query param | `?pin=<pin>` |
| Cookie | `ov_pin=<pin>` — the backend sets this automatically after the first valid PIN, so browser sessions only prove it once |

```bash
# From another device on the LAN — with the PIN
curl http://<host>:3900/v1/audio/voices \
  -H "X-OmniVoice-Pin: 123456"
```

A missing or wrong PIN returns:

```
HTTP/1.1 401 Unauthorized
{"detail": "PIN required"}
```

Notes on the PIN gate (`NetworkAccessMiddleware`, `backend/main.py`):

- It covers **HTTP only** — it does **not** gate WebSockets. The dictation
  WebSocket has its own guard (see below), and the PIN does **not** authorize
  it; use the API key or a trusted network for remote dictation.
- The SPA shell (`/`, `/index.html`, `/favicon*`, `/assets/*`, `/health`) is
  always served un-PIN'd so the PIN-prompt UI can load.
- It is a **consumption** credential: a valid PIN never unlocks the admin surface
  (it is 6 digits, brute-forceable). Admin needs loopback or the API key.
- It is completely inert when no PIN is set (the default, and every Docker
  deploy).

---

## API key

The API key is the backend's durable root credential for a GPU box, Docker
container, or reverse-proxied host. Direct API clients may send it on each
request. The first-party browser/Tauri UI instead exchanges it once for a
short-lived administrator session and never stores the master. Set it on the
**backend** process:

```bash
# Generate a strong key and start the backend with it
export OMNIVOICE_API_KEY="$(python -c 'import secrets; print(secrets.token_urlsafe(24))')"
uv run uvicorn backend.main:app --host 0.0.0.0 --port 3900
# Docker: pass -e OMNIVOICE_API_KEY=…
```

While `OMNIVOICE_API_KEY` is set, every **non-loopback HTTP and WebSocket**
request must present an accepted credential. SPA shell paths remain public;
`POST /api/auth/session` passes through the middleware only so its route can
validate the master and perform the one-time exchange. Direct-client
compatibility accepts:

| Where | How |
|---|---|
| Header | `Authorization: Bearer <key>` — **preferred** for scripts and SDKs |
| Legacy cookie | `ov_key=<key>` — accepted only for compatibility and migrated by the first-party UI; the backend no longer creates it |
| Legacy query param | `?api_key=<key>` — compatibility only. **A key in a URL leaks into proxy/access logs and browser history** |

```bash
# Prefer an encrypted transport (Tailscale Serve / TLS) for a real key; plain
# http:// on an untrusted network exposes the Bearer token on the wire.
curl https://gpu-box:3900/v1/audio/speech \
  -H "Authorization: Bearer $OMNIVOICE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"tts-1","voice":"alloy","input":"Hello from a keyed backend.","response_format":"wav"}' \
  --output speech.wav
```

```python
# The OpenAI SDK sends the key as a Bearer token automatically
from openai import OpenAI

client = OpenAI(
    base_url="https://gpu-box:3900/v1",
    api_key="<your OMNIVOICE_API_KEY>",   # must match OMNIVOICE_API_KEY on the backend
)                                          # (any string works ONLY when no key is set — the loopback default)
audio = client.audio.speech.create(
    model="tts-1", voice="alloy", input="Hello from a keyed backend.",
)
audio.stream_to_file("speech.wav")
```

A missing or wrong key returns:

```
HTTP/1.1 401 Unauthorized
{"detail": "API key required"}
```

On a **WebSocket**, a missing or wrong key rejects the handshake with close
code **1008** (policy violation) instead of a JSON body.

Notes on the API-key gate (`BearerKeyMiddleware`, `backend/main.py`):

- The key is compared in **constant time** and is **never logged**.
- The backend never copies the master into a response cookie. Browser clients
  receive only `ov_session`, an opaque, HttpOnly, SameSite=Strict credential.
- The SPA shell paths bypass the gate on **HTTP** so a remote UI can load and
  show what's wrong; WebSockets have no such exemption.
- **Plain HTTP is sniffable** — a Bearer key over `http://` on a hostile
  network can be read off the wire. Use Tailscale (WireGuard) or TLS for
  anything beyond a fully trusted LAN. See
  [docs/remote-gpu.md](remote-gpu.md) for the full remote-backend setup.

### First-party administrator sessions

The bundled UI uses a narrower protocol:

1. `POST /api/auth/session` receives the master in an `Authorization` header
   exactly once and selects `{"transport":"cookie"}` for exact same-origin
   browsers or `{"transport":"bearer"}` for Tauri/cross-origin clients.
2. Cookie transport returns `204` and sets `ov_session` as HttpOnly,
   SameSite=Strict, path `/`, with an eight-hour maximum lifetime. Bearer
   transport returns an opaque `ovs_admin_session_…` value which the UI keeps
   in **sessionStorage only**, bound to the exact backend base URL. Bearer JSON
   responses include both `expires_at` and a bounded `expires_in`; the UI uses
   the relative lifetime when available so clock skew between a remote GPU host
   and the browser cannot reject a valid session. `expires_at` remains for
   backward compatibility with older clients and servers.
3. `DELETE /api/auth/session` revokes the session. Removing or rotating
   `OMNIVOICE_API_KEY`, backend restart, explicit logout, and the eight-hour
   deadline also invalidate it.

The master is never written to localStorage/sessionStorage, never returned by
the backend, and never placed in a WebSocket URL. Legacy `ov_api_key` browser
storage is deleted before migration waits on the network. All auth responses,
including errors, carry `Cache-Control: no-store`.

Failed session exchanges are limited per client to ten attempts in a rolling
60-second window and then return `429` with `Retry-After`. A correct master key
is always evaluated and clears the failure window, so an attacker cannot lock
an operator out by deliberately exhausting the limit.

Cookie-authenticated mutations require both an exact allowed `Origin` and
`X-VoiceStudio-CSRF: 1`. Side-effectful GET actions additionally require the
browser's `Sec-Fetch-Site: same-origin`. Bearer/header clients are not subject
to the ambient-cookie CSRF check.

---

## Dictation WebSocket

The live-dictation stream at **`ws://<host>:3900/ws/transcribe`** carries its
own inline guard (`backend/api/routers/capture_ws.py`) *in addition to* the
API-key middleware. A non-loopback client reaches it only if it is **either**:

- on a [trusted network](#trusted-networks) (`is_local_host` passes), **or**
- presenting a direct-client **API key** in `Authorization`, or through a
  legacy `ov_key`/`?api_key=` transport.

```
ws://gpu-box:3900/ws/transcribe?api_key=<key>
```

That URL form is retained for non-browser compatibility only. The first-party
UI never constructs it. A bearer administrator session first calls
`POST /api/auth/ws-ticket` and puts only the returned `ws_ticket` in the URL.
Tickets are scoped to one of `/ws/transcribe`, `/ws/events` or `/ws/tts` (the
live dub preview stream), expire after 30 seconds,
return the same bounded `expires_in`/`expires_at` pair, and are consumed
atomically at most once. Same-origin UI WebSockets use the
HttpOnly session cookie and must pass exact `Origin` validation; `null`, missing,
and lookalike origins are rejected.

The **share PIN does not authorize dictation** — the PIN gate is HTTP-only, and
the dictation guard checks only the API key (or trusted-network membership). A
LAN guest who has only entered a PIN can use the HTTP API but **not** live
dictation. When neither the API key nor a trusted network applies, the handshake
is closed with code **1008** and reason `loopback origin required`.

---

## Trusted networks

`OMNIVOICE_TRUSTED_NETWORKS` is a comma-separated list of **CIDR ranges** whose
clients are treated as loopback-trusted by the **consumption** gates — so a
reverse proxy or a trusted LAN/Tailnet can reach the API **without a PIN or key**
(useful when a proxy strips the `Authorization` header).

```bash
export OMNIVOICE_TRUSTED_NETWORKS="192.168.1.0/24,10.0.0.0/8"
```

What it exempts vs. what it does not:

- **Exempts** (via `is_local_host`, `backend/api/dependencies.py`): the share
  PIN gate, the API-key gate, and the dictation WebSocket guard. Clients in a
  listed range need no PIN or key for these **consumption** routes.
- **Never exempts admin.** `/system/*` and `/api/settings/*` are the RCE-class
  admin surface; trusted-network membership is a *consumption* exemption and
  does not reach them — even under `OMNIVOICE_SERVER_MODE=1`. See
  [Admin routes](#admin-routes-and-server-mode).

Details: malformed CIDR entries are silently ignored (a bad entry never wedges
the gate); IPv4-mapped IPv6 addresses (`::ffff:192.168.1.5`) from dual-stack
proxies are unwrapped so they match IPv4 CIDRs; the value is read at request
time, so in production **restart the backend** to apply a change. Default empty
— no change to the strict loopback default.

---

## Admin routes and server mode

Admin routes — `/system/*` (including `set-env`, **RCE-class**),
`/api/settings/*`, engine selection/install/uninstall, media tools, MCP
bindings, pronunciation settings, and remote-worker management — sit on a
stricter gate (`require_admin`, `backend/api/dependencies.py`) than consumption.
On the desktop build they are **true-loopback-only**: no PIN, key, or trusted
network reaches them from another machine.

In **server mode** (`OMNIVOICE_SERVER_MODE=1`, the Docker image) the loopback
origin is unenforceable — NAT rewrites the source and even a
`-p 127.0.0.1:3900:3900` mapping looks non-loopback — so the true-loopback
requirement is dropped (issue #261, else the operator is 403'd out of their own
`/system/*`). It is replaced by a **credential rule**, not removed:

- **No credential configured** (neither API key nor share PIN) → read-only
  admin discovery remains available for the bare Docker bootstrap flow, but
  `POST`/`PUT`/`PATCH`/`DELETE` requests are denied. Side-effectful GET actions
  are denied too: engine health may start a sidecar, deep diagnostics may load
  a model, and LLM provider discovery makes a request with the saved provider
  credential. Set `OMNIVOICE_API_KEY` before changing settings or triggering
  those actions remotely.
- **An API key is configured** → admin requires that **API key** (direct-client
  `Authorization` / legacy query or cookie), a valid short-lived administrator
  session, or genuine loopback. The **6-digit share PIN does not gate admin**
  (it is brute-forceable), and trusted-network membership never does either. A
  **PIN-only** server-mode deployment therefore keeps admin routes loopback-only;
  remote admin starts from the long API key.

Managed sidecar installation remains true-loopback-only even with an API key.
Its installer fetches mutable source and creates an editable environment, so it
must be run directly on that machine until the source supply chain is pinned.

Host paths are never selected through HTTP. The native Tauri process validates
model-cache and export destinations plus custom FFmpeg/FFprobe binaries, writes
a private one-shot capability, and only that opaque authorization reaches the
backend. `/export` therefore accepts an `authorization` token, never a
`destination_path`; revealing an arbitrary exported path runs in the native
process, while the HTTP fallback is limited to the server-owned data root.
`/system/set-env` does not accept executable-path keys at all. Server mode and
an API key do not weaken that native boundary.

This is the fix for a real escalation (#1213): before it, server mode made the
admin gate a no-op, so with an API key set *and* a trusted CIDR configured, a LAN
client in that CIDR could `POST /system/set-env` — RCE-class — with **no
credential at all**, because the API-key middleware waved it through as
`is_local_host`. Now the admin gate is independent of the consumption exemptions.

---

## Browsers from another origin (CORS)

Everything above gates *authentication*. A **browser** frontend served from a
different origin than the backend hits a separate wall first: CORS. The
backend's allow-list defaults to loopback + Tauri origins only
(`http://localhost:<ui-port>`, `http://127.0.0.1:<ui-port>`,
`tauri://localhost`, `http://tauri.localhost`), so opening a dev/source UI via
a LAN IP (e.g. `http://192.168.1.159:3901` talking to `…:3900`) blocks every
request with *"Missing Header: Access-Control-Allow-Origin"* — regardless of
`OMNIVOICE_SERVER_MODE` or `OMNIVOICE_TRUSTED_NETWORKS`, neither of which
touches CORS (#1348).

Add the exact origin the browser shows in its address bar:

```bash
export OMNIVOICE_ALLOWED_ORIGINS="http://192.168.1.159:3901,http://localhost:3901,http://127.0.0.1:3901,tauri://localhost,http://tauri.localhost"
```

Each entry must be a bare origin — `scheme://host:port`, exactly what the
browser sends in its `Origin` header — with no path and no trailing slash
(`http://192.168.1.159:3901/` would never match). The variable **replaces**
the default list, so restate the loopback/Tauri origins alongside your own. (The in-app LAN share and Tailscale flows in
[docs/sharing.md](sharing.md) don't need this — they serve UI and API from the
same origin.) If you only moved the Vite dev server's port, set
`OMNIVOICE_UI_PORT` instead and the default list follows it.

CORS wraps both authentication gates: credentialless browser preflights are
answered before PIN/API-key enforcement, and gate-generated `401` responses
retain CORS headers so the UI can read the actual failure and prompt for the
right credential.

TLS-terminating proxies must establish the effective scheme at the ASGI server
boundary. Uvicorn's proxy-header handling trusts loopback by default, which
covers Tailscale Serve; a custom proxy on another address must be listed with
`--forwarded-allow-ips=<proxy-ip>` (and proxy headers must remain enabled).
VoiceStudio deliberately does not trust a raw `X-Forwarded-Proto` header inside
the application: once Uvicorn accepts a trusted proxy, the resolved ASGI scheme
drives exact-Origin checks and the session cookie's `Secure` attribute.
For a public path prefix such as `/studio`, either strip that prefix before
forwarding or configure the ASGI `root_path` to the same value. WebSocket ticket
validation removes only that trusted, configured prefix; it never accepts an
arbitrary path merely because it ends in `/ws/events`, `/ws/transcribe` or
`/ws/tts`.

## Status codes

| Code | Meaning | What to do |
|---|---|---|
| **401** | Consumption auth failed — `{"detail": "PIN required"}` or `{"detail": "API key required"}`. | Supply the PIN / key (header, cookie, or query param above). A WebSocket surfaces this as close code **1008**. |
| **403** | Authorization failed: loopback/native access was required, cookie Origin/CSRF validation failed, a server-mode mutation lacked an admin credential, or a native path capability was invalid/expired. | A PIN cannot grant admin or filesystem access. Re-authenticate the UI; scripts should use the API-key header; run native operations from the desktop app. The admin gate names the key only when one can satisfy it: server mode with `OMNIVOICE_API_KEY` configured answers `{"detail": "loopback origin or admin API key required"}` (the bundled UI routes it to the API-key login form); PIN-only/no-key server mode and the desktop build answer `{"detail": "loopback origin required"}` (only loopback can satisfy the gate). |
| **429** | A failed administrator-session exchange exceeded its per-client limit, the GPU pool is saturated, or a model download is rate-limited. Ships with `Retry-After`; workload throttles also carry `X-VoiceStudio-Retryable: true`. | Back off for `Retry-After` seconds. For authentication, verify the master before retrying; a correct master is never locked out. |

---

## See also

- [docs/remote-gpu.md](remote-gpu.md) — end-to-end remote-backend setup over
  Tailscale, with the API key.
- [docs/sharing.md](sharing.md) — the in-app LAN share + PIN flow.
- [docs/agentic-voice.md](agentic-voice.md) — pointing OpenAI-compatible agent
  frameworks at VoiceStudio.
- [docs/mcp.md](mcp.md) — the MCP server for AI agents.

---

## `docs/sharing.md`

# Sharing & Remote Access

VoiceStudio runs **local-only by default** — the backend binds to `127.0.0.1` and nothing is reachable from other machines. When you want to use the *same running instance* (same loaded model, same projects and jobs) from another device, you have two opt-in paths. Neither restarts the backend or interrupts work in progress.

## LAN sharing (same Wi-Fi / Ethernet)

For another device on the same network — e.g. opening the web UI on your phone or a second laptop.

1. In the footer, click the **Local** pill → confirm **Network**.
2. A panel appears listing every reachable address of this machine (`http://<ip>:<port>`), each with:
   - a **QR code** — scan it from a phone/tablet to open the UI pre-authenticated,
   - **copy** and **open-in-browser** buttons,
   - the **access PIN**.
3. On the other device, scan the QR (or open the URL and enter the PIN when prompted).
4. Click **Stop sharing** (or flip back to **Local**) to close the network socket again.

You can also drive this from **Settings → Sharing & Remote Access**.

Desktop installers include the web interface used by the LAN address; another
device does not need VoiceStudio installed and the host does not need a source
checkout or a separate frontend development server.

### How the PIN works
- A fresh 6-digit PIN is generated each time you enable sharing; it is never written to disk.
- The QR encodes the PIN (`…/?pin=######`) so scanning connects in one step. Typing the bare URL instead prompts for the PIN.
- Requests from other devices must present the PIN (sent automatically once entered/scanned); requests from this machine never need it.

### Security model
- **Loopback-only is the default on every launch** — you must explicitly enable sharing each session; it never auto-exposes.
- When sharing is off, **nothing is bound** to the network interface (the port is closed, not merely firewalled).
- The control surface and all `/system/*` endpoints are **loopback-only** — a device on the LAN cannot enable sharing, read the PIN, or change settings, even while sharing is on.
- The LAN path is plain **HTTP**. For encryption / access from outside your LAN, use Tailscale (below).

## Tailscale (private remote access, from anywhere)

If you have [Tailscale](https://tailscale.com/download) installed and signed in, you can reach VoiceStudio from any of your devices over your private tailnet — identity-gated, with **no open ports and no PIN** (Tailscale handles identity, and the WireGuard tunnel encrypts the transport).

1. **Settings → Sharing & Remote Access → Tailscale.**
2. If Tailscale isn't detected, an **Install Tailscale** link is shown.
3. Otherwise, **Enable** publishes this backend over your tailnet via `tailscale serve`. The panel shows your `<machine>.<tailnet>` URL with copy / open / QR.
   - By default this serves over **HTTP** on the tailnet (`tailscale serve --http=80`) — which works on any tailnet, because the WireGuard tunnel already encrypts the traffic. No certificate needed.
   - If your tailnet has **HTTPS Certificates** enabled (admin console → DNS → *HTTPS Certificates*), it serves over **HTTPS** instead and you get an `https://…ts.net` URL. (Forcing HTTPS without that feature is what produces the `error enabling https feature: 404` — so we detect it and fall back to HTTP automatically.)
4. Open that URL from any device signed in to the same tailnet. **Disable** runs `tailscale serve reset`.

Tailscale proxies the loopback backend directly, so — like LAN sharing — it never restarts the backend or drops the loaded model.

## Notes
- Both paths leave the running model and in-flight jobs **completely untouched**.
- Server deployments (docker, `OMNIVOICE_BIND_HOST=0.0.0.0`) manage their own networking; the in-app toggle is for the desktop app and is unaffected by these flows.

---

## `docs/remote-gpu.md`

# Remote GPU backend

Run the VoiceStudio backend on one machine (a GPU box, a home server) and drive
it from the desktop app or a browser on another — over your tailnet, with the
inference staying on the powerful machine.

> Calling the API from your own scripts rather than the desktop app? See
> [docs/api-auth.md](api-auth.md) for a consumer-focused reference of every auth
> gate (share PIN, API key, dictation WebSocket, trusted networks) with the exact
> headers, params, and `401`/`403`/`429` meanings.

> Want to keep working *here* and only send individual jobs to another GPU? That
> is a different feature — see [docs/remote-workers.md](remote-workers.md). This
> page moves the whole backend (and your projects with it) to the other machine;
> remote workers keep everything local and farm out single tasks. Both are
> supported, and setting one up does not affect the other.

This is opt-in and off by default: with no API key set, the backend stays
loopback-only exactly as before.

## The shape

```
┌──────────────┐     tailnet (WireGuard)      ┌─────────────────────┐
│ laptop        │  ws/https to MagicDNS URL   │ gpu-box              │
│ VoiceStudio UI  │ ──────────────────────────▶ │ VoiceStudio backend    │
│ (thin client) │  short-lived session/ticket │ OMNIVOICE_API_KEY set │
└──────────────┘                              └─────────────────────┘
```

The desktop app *is* the thin client — there is no separate binary. You enter a
**Backend URL** and an **API key** in Settings. The key is exchanged once for a
short-lived session; ordinary HTTP requests use that session and WebSockets use
path-bound, single-use tickets. The master is never stored or put in a URL.

## 1. On the GPU box: run the backend with a key

Generate a key and start the backend with it set:

```bash
export OMNIVOICE_API_KEY="$(python -c 'import secrets; print(secrets.token_urlsafe(24))')"
export OMNIVOICE_SERVER_MODE=1          # headless: relaxes the loopback admin gate
uv run uvicorn backend.main:app --host 0.0.0.0 --port 3900
```

The Docker image is the same idea — pass `-e OMNIVOICE_API_KEY=…`.

If a **browser** will load the UI from a different origin than the backend
(e.g. a Vite dev server on `:3901` opened via the box's LAN IP), you also need
the backend's CORS allow-list to include that origin — see
[Browsers from another origin (CORS)](api-auth.md#browsers-from-another-origin-cors);
neither server mode nor trusted networks covers CORS.

When `OMNIVOICE_API_KEY` is set, every non-loopback request needs an accepted
credential. Scripts should use `Authorization: Bearer <key>`. Legacy
`?api_key=` and `ov_key` transports remain accepted for compatibility, but the
backend no longer creates a master-key cookie and the bundled UI uses only
short-lived sessions. Loopback traffic on the box itself remains ungated.

## 2. Reach it over Tailscale

Install [Tailscale](https://tailscale.com/) on both machines (its client is
BSD-3 open source; self-host the control plane with
[headscale](https://github.com/juanfont/headscale) if you want a fully open
stack). Then the box is reachable at its MagicDNS name:

```
http://gpu-box.your-tailnet.ts.net:3900
```

For TLS (recommended — see the warning below), put the port behind
**Tailscale Serve** on the box:

```bash
tailscale serve 3900
# now reachable at https://gpu-box.your-tailnet.ts.net
```

Serve terminates on the node and forwards from `127.0.0.1`, so to the backend
the request looks like loopback — which is why the **API key is still
required** in that path (the bearer gate doesn't rely on the source address
for non-local exposure; set the key and it always applies to keyed clients).
Uvicorn trusts proxy headers from loopback by default, so Serve's forwarded
HTTPS scheme becomes the authoritative ASGI scheme and browser session cookies
receive `Secure`. For a non-loopback reverse proxy, explicitly configure
Uvicorn's `--forwarded-allow-ips=<proxy-ip>`; the application never trusts an
arbitrary `X-Forwarded-Proto` header itself.

> **Do not use `tailscale funnel`** (public-internet exposure) for this. Even
> with a key, a voice-cloning backend should not be on the open internet.

## 3. In the app: point at the remote

Settings → Sharing → **Remote backend**:

- **Backend URL**: the MagicDNS URL from step 2 (with `:3900` if you didn't
  use Serve, or no port if you did).
- **API key**: the value of `OMNIVOICE_API_KEY` from step 1.
- **Test connection** hits the auth-exempt `{url}/health` with no credential,
  then exchanges the entered key for a session if health succeeds.
- **Save & reload** stores only the URL and restarts the UI against the remote.
  The key input is cleared after its single exchange. The URL must be a full
  `http://` or `https://` URL
  (`gpu-box:3900` alone is rejected), and saving a URL that hasn't passed
  **Test connection** asks for confirmation first — a wrong base would leave
  the app unable to reach any backend until you change it back here.

Leave the URL empty to go back to the local backend.

### From a browser (no desktop app)

You can also drive the remote from a plain browser — open the URL with the key
in the **fragment** once:

```
https://gpu-box.your-tailnet.ts.net/#api_key=<key>
```

Use the fragment (`#`, not `?`) deliberately: fragments are never sent to the
server, so the key stays out of the GPU box's and any reverse proxy's request
logs. The fragment is scrubbed synchronously, then the key is exchanged once
for an eight-hour maximum session; the master is not stored. If
your key contains `+`, `&`, `#`, or `=`, URL-encode it (e.g. `#api_key=a%2Bb`);
keys from `secrets.token_urlsafe` (above) need no encoding.
Thereafter the UI loads normally with the short-lived session. Cross-origin
bearer sessions are tab-scoped; closing the tab requires re-entry. If a request
401s again (expired/wrong/rotated key), you're prompted to re-enter it. The
same gate shows a LAN-share **PIN** prompt instead when network sharing — not a
remote key — is what's gating access.

## Security notes

- **Plain HTTP is sniffable.** A bearer key over `http://` on a hostile
  network can be read off the wire. Use Tailscale (WireGuard-encrypted) or
  Tailscale Serve (TLS) for anything beyond a fully trusted LAN.
- The first-party UI never persists `OMNIVOICE_API_KEY`, never creates a URL
  containing it, and never puts its administrator session in a WebSocket URL.
  WebSocket tickets expire after 30 seconds and work once for one path.
- The API key and the LAN-share **PIN** are independent: the PIN guards a
  casual share session, the key is the durable remote credential. Either can
  be active; both are checked when set.
- Admin routes (`/system/*`, `/api/settings/*`) stay loopback-gated unless
  `OMNIVOICE_SERVER_MODE=1` is set on the box; in server mode the **API key** is
  the access control for those too (the short share PIN is consumption-only and
  does not gate admin) — see the credential rule below.
- **Trust a LAN or reverse proxy with `OMNIVOICE_TRUSTED_NETWORKS`.** If you run
  VoiceStudio behind a reverse proxy (nginx, Caddy, NPM) or only expose it on a
  trusted LAN/Tailnet, set `OMNIVOICE_TRUSTED_NETWORKS` to a comma-separated list
  of CIDRs (e.g. `192.168.1.0/24,10.0.0.0/8`); clients from those networks are
  then treated as trusted by the **consumption** gates (share PIN, API key,
  dictation WebSocket) and need no key/PIN. **Admin routes** (`/system/*`,
  `/api/settings/*`) stay true-loopback-only — use `OMNIVOICE_SERVER_MODE=1` for
  headless admin. It's the granular alternative to
  `OMNIVOICE_SERVER_MODE=1` (which trusts *all* non-loopback sources) and
  sidesteps a proxy that strips the `Authorization` header. Default empty — no
  change to the strict loopback default. **Trusted-network membership is a
  *consumption* exemption only — it never unlocks admin by itself, even in
  server mode (#1213).** When combined with `OMNIVOICE_SERVER_MODE=1`, a
  trusted-network client that presents no credential still gets `403` on the
  admin routes (unless no credential is configured at all, the bare-Docker #261
  flow, where admin is open); if a credential is set, only the **API key** — not
  the share PIN — reaches admin. See [`api-auth.md`](api-auth.md) for the full
  two-tier model.
- The key is compared in constant time and never logged.

---

## `docs/remote-workers.md`

# Remote GPU workers

Run VoiceStudio on this machine, but hand individual jobs to GPUs on your other
machines. Results come back here.

This is **opt-in and off by default**. Until you turn it on and approve a
worker, nothing leaves your computer, no port is opened, and the app behaves
exactly as it did before.

Worker management is an admin surface. In Docker/server mode, viewing status
works during bare bootstrap, but joining, enabling, approving, issuing keys,
disconnecting, or removing machines remotely requires `OMNIVOICE_API_KEY`.
The share PIN and trusted-network exemptions authorize playback, not worker
administration.

> **Not the same as [Remote backend](remote-gpu.md).** That points this app at
> a backend running somewhere else, so the whole app — your projects, your
> voices, your history — lives on that machine. This keeps everything here and
> only sends out individual tasks. Both still work; pick whichever matches what
> you want.

---

## What you need

* VoiceStudio builds with a compatible worker protocol on both machines. The
  durable-enrollment v2 boundary requires updating both sides; the app refuses
  an unsafe pairing with an update instruction before any task runs.
* The worker machine must be able to **reach** this one over the network. Same
  LAN is enough at home; across networks, a VPN such as
  [Tailscale](https://tailscale.com/) is the reliable answer. The worker dials
  out to the control plane, so the *worker* never needs a public address or a
  forwarded port — but this machine does need to be reachable.
* The engine you want to use must be installed on the worker. A worker reports
  what it actually has, and the scheduler only sends it work it can run.

## Setting it up

**1. On this machine (the one you work on):**

Settings → System → Remote workers → turn on **Use remote workers**.

The panel shows the address workers should connect to, and a **Generate token**
button.

For a Docker Compose Studio, start it with the host address workers can reach;
Compose publishes the TLS worker port (`7443`) separately from the loopback-only
web UI:

```bash
OMNIVOICE_WORKER_ENDPOINT_HOST=192.168.1.20 \
OMNIVOICE_WORKER_PUBLISH_HOST=0.0.0.0 docker compose \
  -f deploy/docker-compose.yml --profile gpu up -d
```

Use the host's LAN or private-overlay address, not the container's bridge IP.
The worker port is published on loopback by default; setting
`OMNIVOICE_WORKER_PUBLISH_HOST=0.0.0.0` is the explicit opt-in that makes it
reachable from the LAN. Keep the default when a host-side tunnel or proxy
provides reachability. Until remote workers are enabled in VoiceStudio, the
container has no process listening on the published control-plane port.

**2. Generate a join code.**

The panel shows it as text **and as a QR code**, with a countdown. Copy it, or
scan the QR with your phone if the worker machine is across the room. It is
shown once, works once, and expires after 15 minutes — only its hash is stored
here, so it cannot be shown again. If you lose it, generate another.

**3. On the worker machine:**

Settings → System → Remote workers → **Lend this machine's GPU** → paste the
join code → **Join**. Nothing has to be restarted, and no environment variables
are involved.

The worker generates its own key pair on first run, presents the code once to
enroll, and proves possession of that key on every later connection. The code
is spent at that point and never used again. The control plane's address comes
with it and is remembered, so the machine reconnects on its own after a
restart; the same panel's switch stops and resumes that without asking for
another code.

Headless machines still take the environment route:

```bash
OMNIVOICE_WORKER_TOKEN='ovw_…' OMNIVOICE_WORKER_MODE=1 \
  uv run uvicorn backend.main:app --host 127.0.0.1 --port 3900
```

Run that command from the repository root. Uvicorn hosts the application
lifespan that owns the worker agent; binding it to loopback means no Studio UI
is exposed, and no browser interaction is required.

For a worker-only NVIDIA Docker container, use the included Compose profile:

```bash
OMNIVOICE_WORKER_TOKEN='ovw_…' docker compose \
  -f deploy/docker-compose.yml --profile worker-gpu up -d
```

Use `worker-rocm` instead for AMD GPUs. Neither profile publishes an HTTP
port. The control-plane address inside the join code must be reachable from
the container, so use its LAN or private-overlay address rather than
`127.0.0.1`. Worker identity, pinned certificate, and endpoint persist in the
profile's data volume. After the first successful enrollment, restarts ignore
that same now-spent environment token and reconnect by proving possession of
the identity key. Replacing it with a fresh join code can move a non-revoked
worker to another control plane. A revoked identity remains revoked; start
with a fresh worker data volume to generate a new identity.

The container reports healthy only after the control plane accepts its initial
registration. A missing, malformed, expired, or rejected join code leaves the
worker service running for diagnosis but unhealthy; inspect its logs, correct
the token, and recreate the container.

`OMNIVOICE_WORKER_MODE` wins over the in-app switch when it is set, so a
deployment that pins worker mode cannot be turned off from the UI — the panel
says so instead of showing a switch that springs back.

**4. Approve the worker.**

It appears in the list on this machine. Approving it is what allows your audio,
reference voices, and text to be sent there — consent is recorded per worker,
because agreeing to use your own desktop is not agreeing to use whatever gets
added later.

## Sharing one GPU machine with other people

The setup above has the GPU machine dial this app. That is the default and the
right choice for a machine only you use — but it connects to exactly one app.
Pointing it somewhere else means editing its settings and restarting, which
disconnects whoever had it.

If more than one person needs the same GPU box, turn it around: let the box
**accept connections** instead.

**On the GPU machine:** Settings → System → Remote workers → **Accept
connections**. It listens on `127.0.0.1:7444` to begin with, which only that
machine can reach — set **Reachable from** to your network address to let other
machines in.

Then **Add a person** for each panel that should have access. You get a
connection string:

```
ovnode://ovnode_xxxxxxxx@192.168.0.110:7444?fingerprint=<64-hex-digits>
```

Copy it once — it is not shown again. Give a separate one to each person.

**On each person's machine:** Settings → System → Remote workers → **Connect to
a GPU machine**, paste the string. That is the whole flow: no shell access to
the GPU box, no restart, and everyone stays connected at the same time. If two
people send work at once, the second job waits for a free slot rather than
failing.

**Removing someone** revokes only their connection string. Everyone else keeps
working, which is why each person gets their own.

**Who is using it** is on the GPU machine, under Accept connections: every
panel currently attached, where it connected from, how many jobs it has run,
and a **Disconnect** button.

**Disconnect and Remove do different things.** Disconnect ends the session now
and keeps that person out for a minute — use it to get someone off the card
immediately. Their app reconnects by itself after that, because their
connection string is still valid. To stop someone for good, remove their
connection string instead.

> **Keep the connection string private.** It contains the API key and the GPU
> machine's certificate fingerprint. VoiceStudio checks that fingerprint before
> sending credentials, audio, or jobs; a mismatch fails closed. Every inbound
> connection uses TLS with no plaintext fallback. The design is recorded in
> [the decision record](adr/inbound-node-mode.md).

## What you can change

| Control | What it does |
|---|---|
| Enable / disable | Stop sending new work without removing the worker |
| Preferred | Prefer this worker when several can run a task |
| Resume | Clear a paused worker after you've fixed it |
| Remove | Revoke its key — it cannot reconnect without a new token |

That is the whole surface, deliberately. **Preferred** pins new work to that
worker; if it is asleep, VoiceStudio names that worker instead of silently
sending the job elsewhere. There are no routing weights or per-model
concurrency settings: concurrency is measured from free VRAM at runtime because
a configured value silently corrupts output on compiled models and crashes
small cards.

## What runs remotely

**Speech synthesis, audiobook chapters, and dub segment synthesis.** Audiobooks
are dispatched one chapter at a time. A dub sends all fresh segments as one
coarse task and receives their WAVs in one result bundle; fitting, assembly and
RVC still run on this machine. If a remote multi-unit render fails, its local
fallback is reported once. ASR, diarization and translation also remain local. Dictation always
runs here, deliberately and permanently, because there latency *is* the
feature. The remaining operations are being ported one at a time.

### Voice identity parity

For TTS, the worker receives the complete local rendering contract: the voice
profile's reference audio and transcript, its pinned seed, model quality
controls, text chunking/crossfade settings, and output effect preset. The
worker runs the same native or generic rendering pipeline as local
`/generate`; selecting a gallery voice therefore does not turn it into a new
random voice merely because it was rendered on another GPU.

The picker knows this. It resolves against the surface you are on, so a chosen
worker reads **Local** on a tab whose work has no remote path yet and names the
reason, instead of showing a green dot next to a GPU that receives nothing. The
same choice is in the status bar at the bottom of the window — the **Compute**
control, which also carries the master switch and can mint a join code without
opening Settings. It appears only once you have opted in or enrolled a machine.
The Dictation surface states that it always uses this machine without showing
the generic "not ported yet" notice.

For protocol development, a task can also be placed by hand with
`POST /workers/tasks` — a **development-only** endpoint. It is admin-gated,
sits behind the same opt-in as everything else here, takes a mandatory
deadline, submits one task and waits for it. On desktop that means loopback;
in server mode a remote caller needs `OMNIVOICE_API_KEY`. It is not a stable
API and goes away once generation routes itself.

## How work is placed

A task goes to a worker that is connected, approved, enabled, has the engine,
has a free slot, and is not paused. An explicitly preferred worker is a hard
choice. Without one, VoiceStudio chooses the least-busy eligible worker and
breaks ties in favour of a worker that already has the model loaded — a warm
model is seconds away where a cold one can be minutes.
Model identities are stable scheduling keys; the worker reports a separate
human-readable model name, so label changes do not split capacity or history.

If every capable worker is busy, the task waits. If **no** worker can run it at
all, it fails immediately and says so, rather than waiting for something that
will never happen.

## When things go wrong

**A worker disconnects mid-task.** Nothing is failed straight away. It has a
grace window to come back, and if it returns carrying a finished result, that
result is used — the task is never run twice just because a network blip
happened. Only when the window expires is the task retried elsewhere.

Each attempt retains the deadline budget granted at dispatch, including after a
worker disconnect or control-plane restart; changed worker availability cannot
shorten an in-flight attempt’s execution allowance.

**A worker fails repeatedly.** After three consecutive failures that are
actually its fault, it is paused for a minute, then automatically given one
task to prove itself. Repeated trips back off further, up to thirty minutes.
Being busy, being asked for an engine it doesn't have, or losing its network
connection are *not* counted against it.

Long-running work sends explicit keepalive frames. They let a slow render live
past the two-minute progress lease, but cannot extend it beyond the current
phase budget when the worker is genuinely stuck.

The row tells you what happened in words — "Paused after 3 failures … retrying
in 45s" — and **Resume** clears it immediately when you've fixed the machine.

**You quit the app mid-task.** Remote work keeps running on the worker. On next
launch VoiceStudio recovers those tasks and reconciles with each worker about
what is genuinely still in flight.

**Version or feature mismatch.** Release numbers alone do not prove that a
worker understands every additive command. Registration negotiates an explicit
protocol range and declares named features for task inputs, progress leases,
remote model downloads, and the voice-identity render pipeline. Durable
enrollment changed the handshake from protocol v1 to v2, so that boundary is
intentionally incompatible in either direction. A worker outside the supported
protocol range, or one missing a required feature, is refused with
`UPGRADE_REQUIRED` and an update instruction before any task runs. It can never
silently render without reference audio, substitute a different voice, or leave
a download stuck at 0%.

Every remote failure includes a concrete next step. Capacity, missing models,
expired leases or sessions, authentication, rejected inputs, and result upload
failures are shown as named errors with advice to retry, reconnect, install the
model, free resources, or re-enroll as appropriate; they do not reach the UI
with a blank hint.

## Security

The guarantees below describe the **default** setup, where the GPU machine
dials this app. "Accept connections" mode trades several of them away
deliberately — see the warning in
[Sharing one GPU machine](#sharing-one-gpu-machine-with-other-people) and
[the decision record](adr/inbound-node-mode.md). In that mode there is no
encryption and no server verification; the connection string is the whole of
admission, and it is only as private as the network it crosses. Everything else
below still holds: identity is still a key the GPU machine never sends,
revoking still survives a restart, and engines are still named from a fixed
registry.

* **All traffic is TLS.** There is no way to disable verification.
* This machine generates its own certificate. The enrollment token carries that
  certificate's fingerprint, and the worker pins it — so a machine on the same
  café Wi-Fi cannot impersonate your control plane.
* **A worker's identity is a key it generates and never sends.** The worker ID
  is a display name, not a credential; knowing it gets an attacker nothing.
* **Removing a worker revokes its key**, and that survives restarting the app.
* Idle worker sessions use TLS keepalives, so NAT mappings stay open without
  the control plane mistaking its own keepalive interval for abusive traffic.
* Tasks name engines from a fixed registry, never file paths — a path here
  would be remote code execution on every worker.

**What a worker can see:** to synthesise your text it has to receive that text,
and to clone a voice it has to receive the reference audio. There is no way
around that. Only add machines you control, which is why approval is per
worker and never implicit.

## Turning it off

Settings → System → Remote workers → toggle off, or the **Compute** control in
the status bar at the bottom of the window. The listening socket closes and the
background loops stop. Your enrolled workers and their settings are kept, so
turning it back on does not mean setting everything up again.

On a machine that is lending its GPU, the switch in **Lend this machine's GPU**
stops it taking work. The enrollment survives, so turning it back on needs no
new code.

## Environment variables

| Variable | Purpose |
|---|---|
| `OMNIVOICE_REMOTE_WORKERS` | `1`/`0` — enable without the UI (headless, Docker) |
| `OMNIVOICE_WORKER_PORT` | Control-plane port (default `7443`) |
| `OMNIVOICE_WORKER_ENDPOINT_HOST` | Override the address shown to workers |
| `OMNIVOICE_WORKER_PUBLISH_HOST` | Compose-only host address for publishing the control-plane port (default `127.0.0.1`; set `0.0.0.0` to opt into LAN reachability) |
| `OMNIVOICE_INBOUND_NODE` | `1`/`0` — accept connections from other panels |
| `OMNIVOICE_INBOUND_BIND` | Address to accept them on (default `127.0.0.1`) |
| `OMNIVOICE_INBOUND_PORT` | Port to accept them on (default `7444`) |
| `OMNIVOICE_ENGINE_IDLE_UNLOAD_SECONDS` | How long a model may sit unused before its VRAM is handed back (default `600`, minimum `5`) |
| `OMNIVOICE_IDLE_SWEEP_SECONDS` | How often that check runs (default `60`, minimum `1`) |
| `OMNIVOICE_WORKER_MODE` | `1` on the worker machine — overrides the in-app switch |
| `OMNIVOICE_WORKER_TOKEN` | Join code, consumed on first successful enrollment; a persisted container value is ignored on later restarts |
| `OMNIVOICE_WORKER_ENDPOINT` | Control plane to dial when no code is being redeemed; normally remembered from the code |

`OMNIVOICE_ENGINE_IDLE_UNLOAD_SECONDS` and `OMNIVOICE_IDLE_SWEEP_SECONDS` exist
so the ten-minute unload can be watched in a minute while testing — set them
together, since shortening only the threshold still means waiting a full sweep
interval to see it fire. Values that are unparseable or below the floor are
ignored with a warning rather than honoured: a zero threshold would unload a
model the instant it went idle and reload it for the next request.

### Two idle timers, not one

A worker node runs the full app, so two independent reapers can release the
same model and they are configured separately:

| Timer | Default | Set with |
|---|---|---|
| Engine registry — drops the cached engine instance and, for VoiceStudio, the shared model with it | 600 s | `OMNIVOICE_ENGINE_IDLE_UNLOAD_SECONDS` |
| In-process model reaper — the backstop, also releases the dictation ASR and the watermark models | 900 s | `OMNIVOICE_IDLE_TIMEOUT` (or Settings) |

In practice the first one gets there first and the second finds nothing to do.
Shortening only `OMNIVOICE_ENGINE_IDLE_UNLOAD_SECONDS` is the right move when
testing; the backstop is not worth touching.

Only one VoiceStudio instance can accept remote workers on a given port. If
another instance already owns the configured port, the app continues running
with remote workers unavailable and shows the conflict in Settings. Close the
other instance, or give this one a different `OMNIVOICE_WORKER_PORT` and
restart it.

State lives under your data directory in `workers/`: the certificate and key,
the worker's own key, and received artifacts.

## Contributor acceptance check

After changing remote-worker routing or transport, run the non-destructive
hardware acceptance script from the repository root:

```bash
scripts/verify-remote-worker.sh \
  --worker-id '<worker-id>' \
  --ssh-target '<user@worker-host>'
```

`WORKER_ID`, `WORKER_SSH_TARGET`, `WORKER_START_COMMAND`, `VOICESTUDIO_API`,
and `WORKER_CONTROL_PORT` are equivalent environment variables. Pass
`--worker-start-command` (or its environment equivalent) when the worker does
not use the headless command documented above; it is printed only in the manual
worker-loss procedure. The worker id is optional only when exactly one worker
is connected. The script requires an SSH target so it can verify the worker's
OS and NVIDIA GPU before accepting any result.

The check never deletes model caches or user data. It selects an engine the
worker itself reports as absent for the missing-model check. Operations that
would disrupt the machine or network, including airplane mode, simultaneous
downloads, and stopping a worker during an audiobook, are printed as exact
`MANUAL` steps and are never reported as passed automatically. A failed
precondition or automated check exits non-zero.

---

## `docs/adr/inbound-node-mode.md`

# Inbound node mode: the panel dials the GPU machine

**Status:** accepted
**Date:** 2026-08-11

## Context

Remote workers connect *outbound*: the node dials the control plane, presents a
single-use enrollment token, pins the control plane's certificate on first use,
and proves possession of an Ed25519 key on every reconnect. That is the right
default. It works behind NAT with no open ports, it is what a hosted fleet
needs (`remote/goal_v2.md` B2), and its security posture is strong.

It is also structurally **1:1**. A worker process holds exactly one endpoint,
one pinned certificate and one worker id (`backend/worker/agent.py`). So when a
second person wants to use the same GPU box, the only route is:

1. get shell access to the machine — someone else's machine;
2. mint an enrollment token on *their* panel;
3. edit the start script to point at their address;
4. restart, which **disconnects whoever was using it**.

Sharing a GPU therefore requires root on it and evicts the incumbent. For a
household or a small team with one 4090, that is the difference between a
feature and a thing nobody uses. No amount of polish on the outbound flow fixes
it, because the constraint is the shape of the connection, not the UI.

## Decision

Add an **inbound** mode, alongside outbound, in which the node listens and any
panel holding an API key connects to it. Outbound remains the default and is
unchanged.

Specifics:

- **New gRPC service `NodeService`, hosted by the node** — `Attach`,
  `FetchResult`, `PushInput` — mirroring `WorkerService`. **Transport roles
  invert; message roles do not.** The node still sends `WorkerMessage`
  (heartbeats, capabilities, progress, results) and the panel still sends
  `ServerMessage` (assignments, cancels, acks), so every state machine on both
  sides is untouched. `Register` folds into the stream as the first exchange,
  reusing `RegisterRequest`/`RegisterResponse` verbatim rather than defining
  parallel messages.
- **Per-panel API keys, not one node key.** Stored as SHA-256 hashes with a
  constant-time compare; the plaintext exists once, in the issuing response.
- **Failed-auth throttle**, per source address, so one stale bookmark cannot
  lock out a different panel.
- **Concurrent panels are allowed.** Two panels may each believe they hold the
  node's free slot and both dispatch; the worker's `WORKER_AT_CAPACITY` reject
  is authoritative (`goal_v2.md` B5.5) and the loser retries. Contention
  degrades to a queue, not to corruption. Serialising panels instead would
  recreate the eviction problem in a nicer wrapper.
- **Ed25519 identity is retained.** The API key admits a *panel to the node*;
  the node still proves itself to the panel with its keypair. The key is
  admission, never identity.
- **A visible connection log with a kick action** replaces per-job approval.
- **Default bind `127.0.0.1`.** Listening on other interfaces is a separate,
  explicit setting, and the bound address is shown in the UI.
- **Off by default.** Enabling it is the consent surface.

## Transport security

Inbound connections always use TLS. The node creates a persistent self-signed
certificate, and each connection string carries its SHA-256 fingerprint. The
panel performs a discovery handshake only to retrieve the leaf certificate,
verifies the fingerprint before sending credentials or user data, and then
opens gRPC with that pinned certificate as its sole trust root. Certificate and
hostname verification therefore remain mandatory without requiring a public
certificate authority or a separate manual pinning step.

There is no plaintext fallback. The listener cannot open any port, including a
non-loopback port, without TLS credentials. A fingerprint mismatch fails closed
before the API key, reference audio, jobs, or rendered audio are sent.

The API key remains admission rather than identity: the connection string is a
private bearer credential, while the certificate authenticates the GPU machine.
The certificate persists across restarts. Replacing it invalidates old
connection strings, which must be reissued with the new fingerprint.

This mode remains for locally owned hardware, not the hosted fleet.
`goal_v2.md` B2 and B5.2 require hosted workers to dial out with no inbound
ports; nothing here relaxes that, and the hosted platform must not inherit this
path. See "Amendment" below.

## Amendment to goal_v2.md B5.2

B5.2 reads "Workers connect outbound; the control plane never dials in", and
B2 promises "no static IP, no inbound ports". Those remain true **for the
hosted fleet**, which is what they were written about. They are now scoped
statements rather than global ones: the OSS desktop product also supports an
inbound mode for locally-owned hardware, with pinned TLS as documented above.
The conformance fixtures for the Go control plane must cover
`WorkerService` only.

## Alternatives rejected

- **Multi-endpoint dial-out** (the node dials N control planes). Preserves the
  outbound principle and solves nothing: the second user still needs SSH access
  to add their endpoint and still needs a token from their own panel. The
  complexity being removed is "you need shell access to someone else's GPU
  box", and this keeps all of it.
- **One shared node key.** Cheaper, and revoking it kicks everyone and forces a
  re-paste on every machine — so in practice nobody revokes, and the credential
  outlives the reason it was issued. A shared key also leaves no record of who
  used it, which makes the connection log much less useful.
- **Per-job approval prompts.** Makes a shared GPU unusable and trains people
  to click yes. Visibility plus a kick button is the better trade.
- **Reusing `WorkerService` with the panel as gRPC client.** Does not work: the
  gRPC client sends the request-stream type, so the panel would be sending
  `WorkerMessage`. Mirroring the service is what keeps the message roles — and
  therefore every state machine — unchanged.

---

## `docs/production-private-api.md`

# Production private API service

For a private application backend calling VoiceStudio, run the versioned Docker
image as an internal service. Do not expose port 3900 directly to the public
internet.

## Recommended baseline

```yaml
services:
  voicestudio:
    image: ghcr.io/debpalash/omnivoice-studio:0.5.2
    restart: unless-stopped
    environment:
      OMNIVOICE_API_KEY: ${OMNIVOICE_API_KEY:?set a long random key}
      OMNIVOICE_BIND_HOST: 0.0.0.0
      OMNIVOICE_DATA_DIR: /app/omnivoice_data
    ports:
      - "127.0.0.1:3900:3900"
    volumes:
      - voicestudio-data:/app/omnivoice_data
      - voicestudio-models:/app/omnivoice_data/huggingface
    healthcheck:
      test: ["CMD", "curl", "-fsS", "http://localhost:3900/health"]
      interval: 30s
      timeout: 5s
      retries: 5
      start_period: 120s

volumes:
  voicestudio-data:
  voicestudio-models:
```

Generate `OMNIVOICE_API_KEY` with a password manager or
`python3 -c 'import secrets; print(secrets.token_urlsafe(32))'`. Keep it in the
deployment platform's secret store, not in the Compose file or source control.
Send it from InterviewAce as `Authorization: Bearer <key>`.

`OMNIVOICE_BIND_HOST=0.0.0.0` is required inside the container; the host-side
`127.0.0.1` port binding still prevents LAN or public access.
`OMNIVOICE_DATA_DIR=/app/omnivoice_data` keeps application state on the named
volume across container recreation.

Pin an exact release tag. `:latest` and `:main` are rolling previews;
`:stable` moves whenever a stable release is published. AMD hosts use the
matching `:0.5.2-rocm` image and the device mapping documented in
[Docker installation](install/docker.md#pull-and-run-amd-gpu--rocm).

## Network boundary

Prefer a private container network with no published VoiceStudio port when the
calling backend runs in the same Compose or Kubernetes deployment. Otherwise,
keep the published port on `127.0.0.1` when a reverse proxy runs on the same
host. For cross-host access through Tailscale or another encrypted overlay,
publish port 3900 only on the host's private-overlay address, or attach both
services to a private container network, and restrict it with the host firewall.
Plain HTTP is appropriate only across loopback or an isolated container
network; a Bearer key must not cross a host or network in plaintext. The
six-digit share PIN is intended for casual LAN access; use the API key for an
application service.

If a reverse proxy is used:

- forward the `Authorization` header;
- disable response buffering for streaming generation;
- set its read timeout above VoiceStudio's generation timeout;
- discard client-supplied `Forwarded` and `X-Forwarded-*` headers, then set
  forwarding headers from the proxy's observed connection;
- configure VoiceStudio/Uvicorn to trust forwarding headers only from that
  proxy's exact address. Never make authorization decisions from an untrusted
  forwarded address: a same-host proxy otherwise lets a remote caller appear
  loopback-local and bypass the key gate;
- set `OMNIVOICE_ALLOWED_ORIGINS` only when a browser on another origin must
  call VoiceStudio directly.

For example, if the proxy has the fixed container address `172.30.0.2`, add
this to VoiceStudio's environment:

```yaml
FORWARDED_ALLOW_IPS: 172.30.0.2
```

Assign that address with a Compose network `ipam` block or the equivalent
orchestrator network policy. `FORWARDED_ALLOW_IPS=*`, a subnet, and a mutable
service-name lookup are not equivalent to trusting the proxy's exact address.
Configure the proxy itself to clear inbound `Forwarded`, `X-Forwarded-For`,
`X-Forwarded-Host`, and `X-Forwarded-Proto` before setting fresh values. Without
both halves, keep proxy-header trust disabled; a spoofed forwarded loopback
address can otherwise receive loopback privileges.

InterviewAce's browser should normally call the InterviewAce backend, which
then calls VoiceStudio. This keeps the VoiceStudio credential and API surface
out of the customer browser.

## Validate the integration

After selecting and installing an engine, exercise both OpenAI-compatible
paths through the same authenticated network route InterviewAce will use:

```bash
curl https://voicestudio.internal/v1/audio/speech \
  -H "Authorization: Bearer $OMNIVOICE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"<resolved-tts-engine-id>","voice":"alloy","input":"Production check.","response_format":"wav"}' \
  --output check.wav

curl https://voicestudio.internal/v1/audio/transcriptions \
  -H "Authorization: Bearer $OMNIVOICE_API_KEY" \
  -F "file=@check.wav" \
  -F "model=<resolved-asr-engine-id>"
```

Use the actual selected engine id instead of an alias when validating routing.
More SDK and authentication examples are in [API authentication](api-auth.md).

## Operations

- Persist both `/app/omnivoice_data` and the Hugging Face cache. Back up the
  data volume; treat the model cache as replaceable unless download time is
  operationally significant.
- Before admitting traffic, list the selected engine's checkpoint with
  `GET /models`, pre-fetch its `repo_id` with authenticated
  `POST /models/install`, and wait for `/setup/download-stream` to finish.
  Lazy first-request downloads can exceed an otherwise healthy request
  timeout. Then warm the engine with a representative request. `/engines`
  reports availability and the resolved execution device; `/health` proves
  service readiness.
- Keep request concurrency bounded. A capacity response is a backpressure
  signal; honor `Retry-After` instead of starting parallel retries.
- Drain callers, recreate the container with a newly pinned tag, run the engine
  checks, then restore traffic. Do not update model/runtime dependencies inside
  a running production container.
- For a failed benchmark or production request, capture `/system/info`, the
  selected `/engines` entry, response routing headers, container logs, and a
  diagnostic bundle before restarting.

Rotate the root key as a coordinated deployment: drain requests, update the
secret store, recreate VoiceStudio with the new key, update InterviewAce's
secret, validate an authenticated request through InterviewAce, then restore
traffic. The service accepts one configured root key, so changing only one side
temporarily produces `401 Unauthorized`.

The API key also authorizes server-mode administration. If the calling
application should have consumption access only, use a separate VoiceStudio
instance or a route-aware reverse proxy with a default-deny allowlist limited
to the required speech routes. L3/L4 network policy alone cannot distinguish
generation from administration. The current API key is a root credential, not
a per-route service token. Full credential, session, WebSocket,
trusted-network, admin-route, and CORS behavior is in
[API authentication](api-auth.md).

## Engine and model obligations

Deploying VoiceStudio does not settle the licenses of optional engines or model
weights. Record the exact engine, model revision, and accepted terms alongside
the deployment, and review generated-output restrictions for that combination.
See [Engine licences](engines/index.md) before enabling an engine.

---

## `docs/performance.md`

# Performance guide

Where the time goes when VoiceStudio feels slow, what you can tune, and what you
should leave alone. Everything here applies to the current release; numbers
marked "measured" come from `scripts/bench_pipeline.py` on a 16 GB Apple
Silicon M2 — your hardware will differ, but the *ratios* hold.

## First: the classic causes of "it got slow"

Before touching any knob, check these — they account for most slowness reports:

1. **A voice profile with an empty Transcript field.** Cloning needs the
   reference clip's transcript. If the profile doesn't have one, the app runs a
   full Whisper transcription of the clip — and before v0.3.15 it did that on
   **every single generate** (the "TTS got much slower after updating, CPU
   pegged at 100%" regression, #1032). Since v0.3.15 the auto-transcription
   runs once and is saved onto the profile, but a profile that still has an
   empty transcript (e.g. imported or hand-edited data) keeps paying an ASR
   pass per generation. **Fix:** open the voice's editor and check the
   Transcript box — if it's empty, type or paste what the reference clip says
   (or just generate once on v0.3.15+ and confirm the box filled itself in).
2. **The first generation after a (re)start is always the slowest.** Model
   weights load lazily (~8 s), CUDA builds torch.compile kernels, Apple Silicon
   warms Metal kernels. Judge speed from the *second* generation onward.
3. **Memory pressure.** On a 16 GB unified-memory machine, a browser with 40
   tabs next to a dub means the OS pages the model in and out — or kills the
   backend outright ("Can't reach the local backend"). Check Settings →
   Models for what's resident, and Settings → Performance for free RAM. See
   [Flush caches / Unload resident model](#flush-caches--unload-resident-model)
   for freeing memory without a restart.
4. **You're generating on CPU without realizing it.** A driver update, a
   CUDA/torch mismatch, or simply running on hardware with no supported GPU
   path silently drops you to CPU — everything works, just several times
   slower. Three places tell you the truth:
   - **Settings → Performance → Device & compute** shows the live compute
     device (`cuda` / `mps` / `cpu`), a "GPU active" badge, and RAM/VRAM
     readouts.
   - **Settings → About → Run self-check** (the `/system/diagnose` endpoint)
     warns explicitly: *"cpu (no GPU acceleration detected)"* with a hint
     about drivers.
   - **Model Catalogue** shows a routing badge per engine — "GPU active",
     "CPU fallback", or "CPU" — with the *reason* shown as small text under
     the badge (full text on hover).
   Note: **GPU acceleration on Windows is NVIDIA/CUDA-only** — AMD and Intel
   GPUs run CPU-only there (see [Windows install notes](install/windows.md)).
5. **You aborted a dub earlier (fixed in v0.3.23).** Dubbing moves the TTS
   model to CPU to free VRAM for the ASR model, then moves it back when the
   transcription finishes. Before v0.3.23 that move-back only ran on the fully
   successful path, so cancelling a dub, hitting a dub error, or closing the
   tab mid-transcription left the TTS model stranded on CPU — and **every**
   later generation ran there, 10-50x slower with the CPU pegged, until the
   ~15-minute idle unload happened to fire. Restarting the backend cleared it,
   which made it look random or time-of-day related (#1191). Since v0.3.23 the
   move-back runs on every exit path, *and* each generation verifies the model
   is on the expected device and moves it back itself — so no future code path
   can strand it again. If you are on an older build, restart the backend.

## What a generation actually spends time on

For a cloned voice, one generation is: encode the reference clip (~0.4 s,
measured; cached after the first use for the voices you reuse — a dub's
per-line clips are each used once, so there's nothing for a cache to save
there) → synthesize (the bulk; scales with output length) → post-process
(mastering, watermark; fractions of a second). Long texts are split into
chunks synthesized sequentially — time scales roughly linearly with text
length.

For a dub, the stages are: audio extraction + vocal separation (one-time,
minutes for long videos) → transcription (on the best accelerator available —
Apple Silicon uses MLX since v0.3.21, NVIDIA uses CUDA; CPU-only installs fall
back to the processor) → translation (parallel, 6 concurrent requests for LLM
providers) → per-segment synthesis (sequential, the bulk of the time) →
mixing and export (mostly stream-copied, fast).

## Knobs you can actually turn

All of these are environment variables read by the backend at start. Set them
in `~/.config/omnivoice/env` (created by the installer) or your shell profile.
None of them are required — the defaults are chosen for the common case.

| Variable | Default | What it does |
|---|---|---|
| `OMNIVOICE_DEVICE` | `auto` | Pin the compute device (`cuda` / `rocm` / `xpu` / `mps` / `cpu`) instead of auto-detect. Same control lives in **Settings → Performance & Device** (the env var wins over the UI pick). Honored only for devices the host actually has — a family that isn't detected is noted and ignored, never obeyed blindly. Applies at the next backend start. |
| `OMNIVOICE_FLASHINFER` | `0` | CUDA-only accelerated decoding for the default engine via [FlashInfer](https://github.com/flashinfer-ai/flashinfer) kernels (packed CFG attention, fused RMSNorm/RoPE/GEMM) — ~2x on upstream's benchmarks. `1` enables it; `graph` also captures CUDA graphs (best when you render one thing at a time). Requires installing the optional `flashinfer-python` package into the backend environment first (`uv pip install flashinfer-python flashinfer-jit-cache --extra-index-url https://flashinfer.ai/whl/cu128/`, matching your CUDA build). Replaces `torch.compile` for that session, pins inference to a single GPU thread (the FlashInfer attention plan is per-generation state), and keeps fused copies of the attention/MLP weights resident (~roughly half the LLM's weight size extra VRAM) — leave it off on tight-VRAM cards. If the package is missing or a FlashInfer/CUDA-graph kernel fails at runtime, the app logs the reason and falls back to the standard path; failures outside those kernels (e.g. a genuine out-of-memory) surface normally. |
| `OMNIVOICE_PROMPT_DISK_CACHE` | `1` | Persist encoded voice-clone references (`prompt_cache/` in the app data dir, ~10 KB per voice, 32 newest kept) so the first generation with a known voice after a restart skips the reference re-encode and any auto-transcription. Set `0` to keep the cache in memory only. |
| `OMNIVOICE_IDLE_TIMEOUT_S` | `900` | Seconds of idle before the TTS model unloads to free memory. Raise it (e.g. `3600`) if you generate in bursts and dislike the ~8 s reload; lower it on tight-memory machines. |
| `OMNIVOICE_SIDECAR_IDLE_TIMEOUT_S` | `300` | Same idea for sidecar engines (IndexTTS 2.5 etc.). |
| `OMNIVOICE_LLM_CONCURRENCY` | `6` | Parallel LLM translation calls during a dub. Raise for a fast API endpoint, lower if your provider rate-limits. |
| `OMNIVOICE_GPU_WORKERS` | auto | Concurrent generations on the GPU. Auto-sized from free VRAM (1 worker per 5 GB, max 4); MPS and CPU always get 1. **Do not raise this on ≤10 GB cards or Apple Silicon** — two concurrent jobs over-committing VRAM is exactly the crash class (#567) the auto-sizing exists to prevent. |
| `OMNIVOICE_CPU_POOL` | `min(8, cores)` | Thread pool for CPU-side work (translation dispatch, audio I/O). |
| `OMNIVOICE_SINGLE_ENGINE_RESIDENT` | `1` | Keep only one TTS engine in memory at a time. Set `0` on 32 GB+ machines to keep several engines warm across switches. |
| `OMNIVOICE_UNIFIED_OFFLOAD_HEADROOM_GB` | `6` | On unified memory (Apple Silicon): if free RAM is below this when a dub needs the transcription model, the TTS model is fully released first (it reloads on the next generation). Raise to be more aggressive about freeing, lower on 32 GB+ machines to avoid the reload. |
| `OMNIVOICE_INDEXTTS_FP16` | `1` | IndexTTS half-precision. Leave on. |
| `OMNIVOICE_ASR_VRAM_PREFLIGHT` | `1` | Downgrade transcription precision instead of crashing when VRAM is short (CUDA). Leave on. |
| `OMNIVOICE_GENERATE_TIMEOUT_S` | `300` | Abandon a generation after this many seconds **of actual compute** on an accelerated (GPU-family) host — the clock starts when a worker picks the job up, never while it waits in line. It's a floor, not a ceiling: the budget grows with the text (+1 s per 40 characters past the first 1200), so long inputs rarely need this raised. A **CUDA or ROCm** GPU with less dedicated VRAM than the engine declares it needs is the exception — it pages to system RAM and renders slower than the same machine's CPU, so it floors at `OMNIVOICE_CPU_GENERATE_TIMEOUT_S` below instead. Apple Silicon (MPS) is not included: its reported VRAM is a heuristic over a *unified* memory pool, not a dedicated one, so there is no comparable floor to measure it against. Setting **this** var explicitly turns that off — an explicit value here is the base on every device, under-provisioned or not, so lowering it to fail fast still works. Also settable from **Settings → Performance & Device → Compute-time budget** (persists to `prefs.json`; takes effect on the next backend restart, same as `OMNIVOICE_DEVICE` above). |
| `OMNIVOICE_CPU_GENERATE_TIMEOUT_S` | `600` | Same budget, for hosts that render on the CPU — correct CPU synthesis legitimately takes longer than the accelerated floor, so it gets its own, higher one. It is also the floor a CUDA/ROCm GPU below the engine's declared VRAM floor gets, since that is the performance class it actually falls into. An explicit value here always governs CPU-family generation, independent of `OMNIVOICE_GENERATE_TIMEOUT_S` above — that var only doubles as a CPU floor when *this* one is left unset (a legacy shortcut: setting only `OMNIVOICE_GENERATE_TIMEOUT_S` lowers the watchdog everywhere with one var). Also settable from **Settings → Performance & Device**, which flags a row an external env var is already shadowing instead of claiming a save will apply. |
| `OMNIVOICE_ENGINE_IMPORT_PROBE_TIMEOUT_S` | `60` | How long to wait while checking that a sidecar engine's virtualenv can import the engine. Only affects how quickly a *broken* venv is ruled out — a probe that runs out of time is treated as "unproven", and the venv is used anyway, so a slow machine is never told its engine is missing. Per-engine override: `OMNIVOICE_INDEXTTS_IMPORT_PROBE_TIMEOUT_S` (and the same shape for `CONFUCIUS4`, `DOTS_TTS`, `MOSS_TTS_V15`). |
| `OMNIVOICE_GPU_QUEUE_TIMEOUT_S` | `1800` | How long a job may sit in the GPU queue before it's reported as a saturated pool (a retryable condition — nothing ran). Waiting is normal on 1-worker machines; lower this only if you'd rather fail fast than queue. |

**torch.compile** is probe-based, not platform-based: it's attempted only
where the runtime check says it can work (a CUDA device with Triton importable
and a supported GPU architecture) and skipped automatically everywhere else —
MPS, CPU, and the typical Windows install (Triton ships no Windows wheel).
The one user-facing control is Settings → Performance → "Disable
torch.compile" (shown on Windows), for the rare setup where a partial Triton
install makes the probe pass but the compile attempt itself crash — see
[Windows install notes](install/windows.md).

## Warnings before a slow generation

The 300 s budget used to be discovered the hard way: you pressed Generate,
waited out the whole budget, and were then told the job was too heavy. Two
checks now run **before** the request leaves the app, at the one call every
synthesis path shares (Generate, voice previews, the compare modal, the stories
editor, profile previews, and streaming).

| Situation | What you see |
| --- | --- |
| The engine declares a VRAM floor above what this GPU has, or routing fell back to CPU | The routing caveat, naming your card, the engine's floor, and the ways around it. A CUDA/ROCm card below the floor is also *budgeted* as the CPU-class hardware it performs like — it gets the larger CPU/accelerated base unless `OMNIVOICE_GENERATE_TIMEOUT_S` is explicitly set |
| The host synthesizes on the CPU **and** the text is over 1200 characters | A heads-up that this generation may exceed the time budget |
| The host synthesizes on Apple Silicon (MPS) **and** the text is over 1200 characters | The same heads-up — MPS gets the accelerated-host budget (`OMNIVOICE_GENERATE_TIMEOUT_S`), which a long render can still legitimately exceed |

**Why 1200 characters:** it is the same figure the budget itself uses. The first
1200 characters get the flat base budget, and only past that does the budget
start growing (+1 s per 40 characters). Below the threshold you are inside a
budget the backend already considers generous, so ordinary sentences on a CPU
laptop stay quiet.

**Which base applies:**

| Host | Base budget |
| --- | --- |
| Renders on the CPU | `OMNIVOICE_CPU_GENERATE_TIMEOUT_S` |
| CUDA/ROCm GPU below the engine's declared VRAM floor, when `OMNIVOICE_GENERATE_TIMEOUT_S` is not explicitly set | `OMNIVOICE_CPU_GENERATE_TIMEOUT_S` (whichever of the two is larger) |
| Any other accelerated host, MPS included | `OMNIVOICE_GENERATE_TIMEOUT_S` |

Both rows above can be overridden, and the two vars are independent:

- An explicit `OMNIVOICE_CPU_GENERATE_TIMEOUT_S` always governs CPU-family
  generation, even when the accelerated var is also set.
- An explicit `OMNIVOICE_GENERATE_TIMEOUT_S` is used verbatim on every
  accelerated host — **including** an under-provisioned one, which then keeps
  the value you chose rather than being floored. That is deliberate: it is what
  lets you lower the watchdog to fail fast everywhere with one setting.

Both warnings are **advisory** — nothing is blocked. A driver can page to system
RAM, and a short input fits where a long one does not, so the engine still runs
if you want it to. Each fires **once per engine per session**, keyed on the
reason, so a genuinely different problem still gets through but the same
sentence is not repeated on every synthesis. Switching engines re-arms it.

If you are already on a CPU-tuned engine (OmniVoice GGUF, Supertonic-3) the
warning drops the "try a CPU-tuned engine" suggestion — it would be advice to
switch to what you are already using.

## Flush caches / Unload resident model

This is the feature the VRAM-starved timeout error ("TTS generate ran for more
than 300s … Flush caches / Unload the resident model") points at. It frees
RAM/VRAM **without restarting the app**, and it never loses data — an
unloaded model simply reloads lazily (~8 s) on the next generation.

One thing Flush **can't** free: the job that just timed out. An abandoned
generation cannot be killed from Python — its thread runs to completion and
holds its VRAM until it does, so a Flush (or a retry) issued seconds after a
timeout is competing with a job that is still on the device. Wait for it to
drain, or restart the backend, and then Flush.

**Where it lives:**

- **Top toolbar → Flush** (the button next to the model-status badge). The
  dropdown lists every model currently in memory — the TTS model, its
  co-loaded ASR, the diarization pipeline, and any resident engines or
  sidecars — with its device and VRAM use, and a per-model **Unload** button
  where unloading is possible (WhisperX is released together with the TTS
  model, so it has no button of its own). An engine left resident after you
  switched away from it is marked *"not active — safe to unload"*. Below the
  list are the two bulk actions:
  - **Flush caches** — runs a multi-pass garbage collection and releases the
    accelerator's cached memory (CUDA/MPS/XPU `empty_cache`). Models stay
    loaded, so there's no reload cost; this recovers cache/fragmentation
    memory only.
  - **Unload all + flush** — the above **plus** fully unloads the resident
    TTS model. Frees the most memory; the next generation pays the ~8 s
    reload.
- the engine's **Weights** list in **Model Catalogue** — rows whose weights are resident right now show an
  "In memory" badge with the same per-model **Unload** button.

**From a script** (the local API on port 3900), the same operations:

```bash
curl -X POST "http://127.0.0.1:3900/system/flush-memory"                    # flush caches
curl -X POST "http://127.0.0.1:3900/system/flush-memory?unload_model=true"  # + unload TTS model
curl "http://127.0.0.1:3900/model/loaded"                                   # what's resident
# unload one model — ids: tts | diarization | sidecar:<id> | sidecars
curl -X POST "http://127.0.0.1:3900/model/unload/tts"
```

**When to use it:**

- **After a VRAM-starved 503 timeout** — a resident model and your generate
  were contending for GPU memory. Unload all + flush, then retry.
- **Before a dub on a tight-memory machine** — transcription needs room the
  resident TTS model is holding (on Apple Silicon the app does this
  automatically, see `OMNIVOICE_UNIFIED_OFFLOAD_HEADROOM_GB` above).
- **After switching engines** — with `OMNIVOICE_SINGLE_ENGINE_RESIDENT=0`,
  or for sidecar engines, the previous engine can stay in memory; the
  dropdown shows it and marks it safe to unload.
- **Mid batch-run on a small GPU** — an occasional
  `POST /system/flush-memory` between jobs keeps cache growth from
  starving later generations.

**When it won't help:** many generate errors are *not* memory problems, and
their messages say so explicitly ("the Flush button won't help here") —
missing env vars, network failures during a model download, a broken native
component. Believe the message; Flush only fixes memory contention. Also
note the app already frees memory on its own when idle
(`OMNIVOICE_IDLE_TIMEOUT_S`) — Flush is for when you need the memory *now*,
between jobs.

If the timeout error keeps recurring even right after an unload, see
[troubleshooting §14](install/troubleshooting.md#14-cant-reach-the-local-backend-during-generation--transcription--dubbing)
— the same starvation class has more remedies there (smaller ASR model,
CPU ASR, the crash-isolated ASR engine).

## Platform notes

- **Apple Silicon**: everything runs on the GPU via MPS/MLX. One generation at
  a time by design — unified memory means TTS and ASR compete for the same
  RAM, and the app actively unloads one to make room for the other on 16 GB
  machines. More RAM directly improves dub throughput (fewer unload/reload
  cycles).
- **NVIDIA**: fp16 + torch.compile on by default. ≥16 GB VRAM parallelizes up
  to 3-4 concurrent generations (API/batch workloads); ≤10 GB deliberately
  serializes.
- **CPU-only**: expect ~2x slower than MPS, more against CUDA. Prefer the
  smaller/faster engines (see Model Catalogue) and short reference clips.

## Measuring instead of guessing

`scripts/bench_pipeline.py` (repo checkouts) profiles each stage one at a
time, memory-safely — it refuses to start a stage without enough free RAM,
and unloads models between stages:

```bash
# stop the app first — a running backend holds a model and skews numbers
uv run python scripts/bench_pipeline.py            # everything
uv run python scripts/bench_pipeline.py tts clone  # just these stages
```

If you report a performance issue, pasting its table (plus your platform and
RAM/VRAM) turns a guessing game into a bisect.

Measured results per engine/device — and how to contribute yours — live in
[benchmarks.md](benchmarks.md).

## Performance budgets

CI guards the hot paths above against regressions — not with wall-clock
budgets (CI hardware varies too much for a stable "≤5 % slower" threshold),
but with **operation-count budgets** in
`tests/test_perf_operation_budgets.py`, which fail on *any* regression:

- **Streaming TTS (`/ws/tts`)**: exactly one engine `generate` per sentence
  chunk, and exactly one text-normalization pass per request (never one per
  sentence).
- **Dub re-mix**: a fit-only re-mix (`regen_only=[]`) of cached segments
  makes **zero** TTS calls. The zero-decode / zero-rewrite budget activates
  with the natural-rate cached fast path (each cache is then decoded exactly
  once, by the final assembly).
- **Batch dubbing (native batches)**: N renderable segments at batch width W
  cost exactly ⌈N/W⌉ `generate_batch` calls and zero per-segment `generate`
  calls when native batching is enabled.

Updating a budget is a deliberate act: if a change legitimately adds an
operation to a guarded path, change the expected count in the same PR with a
comment justifying the new floor. Never loosen a budget just to make CI pass
— that is the regression the budget exists to catch.

## Batch and streaming behavior

 Batch dubbing renders several segments in one native forward pass when the
selected engine supports it. The width is derived from the host rather than
fixed, because a wider forward pass needs proportionally more device memory:
CPU hosts and cards with less than ~2 GB of headroom above the engine's
single-job requirement stay at one segment, and the width steps up to 2, 4,
and 8 as headroom allows. `OMNIVOICE_DUB_BATCH_WIDTH` overrides it (1 disables
batching, 16 is the ceiling). Engines without native batching inherit a
compatibility fallback that preserves the one-segment behavior.

Streaming clients also receive measured latency in the `/ws/tts` terminal
 `done` frame: `ttfa_ms` is request-to-first-audio, `gen_time_s` is the
end-to-end wall clock including delivery, and `rtf` is *synthesis* time
divided by generated-audio duration — measured around the render calls only,
so a slow client cannot inflate it. The backend log records the same values, so a slow first chunk is
 distinguishable from a fast first chunk followed by a long render.

## Things that look like knobs but aren't

- **Deleting and re-adding a voice** doesn't speed anything up; the reference
  encode is cached per file for voices you reuse. (A dub's per-line reference
  clips are the deliberate exception — each is a distinct clip used once, so
  there's nothing for a cache to save.)
- **Killing the backend between generations** makes everything slower — you
  pay the model load every time. The idle timeout already frees memory when
  it's genuinely idle.
- **`OMNIVOICE_PRELOAD_TTS_ASR`** exists for a legacy in-process Whisper
  fallback; enabling it costs memory on every start and speeds up nothing on
  a default install.

---

## `docs/benchmarks.md`

# Benchmarks

Measured numbers per engine and device — how long a generation actually
takes on real hardware. Every number here is produced by the in-repo
harness, on named hardware, at a named version; nothing is estimated.

## How numbers are measured

```bash
# stop the app first — a running backend holds a model and skews numbers
uv run python scripts/bench_pipeline.py            # everything
uv run python scripts/bench_pipeline.py tts        # just the TTS stage
```

`scripts/bench_pipeline.py` profiles each pipeline stage one at a time,
memory-safely: it refuses to start a stage without enough free RAM and
unloads models between stages. See [performance.md](performance.md) for
what each stage spends its time on.

The `tts` stage emits the two values this table collects:

- **RTF** (real-time factor) — seconds of compute per second of generated
  audio, printed next to each warm measurement. RTF < 1 means faster than
  real time. Use the **short line (warm)** RTF for the table.
- **Peak VRAM** — printed on CUDA only. MPS is unified memory and CPU has
  no VRAM; subprocess-isolated engines allocate outside the harness's view
  (it prints `n/a` for them). Leave the column blank in all those cases.

## Results

No verified rows yet — this table fills from maintainer runs and community
submissions.

| Engine | Device | RTF (warm) | Peak VRAM (GB) | App version | Source |
|---|---|---|---|---|---|
| _none yet — contribute yours below_ | | | | | |

Column meanings: **Engine** — the TTS engine the harness resolved (printed
at stage start). **Device** — one string naming what ran the model, e.g.
`RTX 3060 12 GB`, `Apple M2 Pro`, `Ryzen 7 5800X (CPU)`. **RTF (warm)** —
the short-line warm RTF from the harness. **Peak VRAM** — the harness's
CUDA peak, blank on MPS/CPU. **App version** — from `Settings → About`.
**Source** — a link to the PR that added the row.

## Contributing a row

1. Run the harness on an otherwise-idle machine (app stopped) and copy its
   summary table.
2. Open a PR adding one row using the column meanings above, and paste the
   raw harness output into the PR description — that PR link becomes the
   row's **Source**.
3. One row per engine+device pair; a newer app version replaces the old row.

Numbers from different machines aren't directly comparable — that's fine.
The point is honest expectations ("this engine on this class of GPU ≈ this
fast"), not a leaderboard.

---

## `docs/evaluation.md`

# Evaluation

Evaluate VoiceStudio models with standard TTS metrics: WER (intelligibility), SIM-o (speaker similarity), and UTMOS (naturalness).

## Supported Test Sets

| Test Set | Languages | WER Module | Metrics |
|---|---|---|---|
| **LibriSpeech-PC** | English | HuBERT WER | WER + Speaker Sim + MOS |
| **Seed-TTS (en)** | English | Whisper WER | WER + MOS |
| **Seed-TTS (zh)** | Chinese | Paraformer WER | WER + MOS |
| **FLEURS** | 102 languages | Omnilingual-ASR WER | WER (per-language + macro-avg) |
| **MiniMax Multilingual** | 24 languages | Whisper + Paraformer | WER + MOS |

## Prerequisites

```bash
pip install omnivoice[eval]
# or
uv sync --extra eval
```


## Quick Start

```bash
cd examples
bash run_eval.sh
# run_eval.sh will
# (1) download all required test sets and test models;
# (2) inference and evaluation for each test set.
```

## Metrics Explained

### WER (Word Error Rate)
Measures how intelligible the generated speech is by transcribing it with an ASR model and comparing to the reference text. Lower is better. Note that some languages actually use CER (Character Error Rate).

- **LibriSpeech-PC**: HuBERT-based ASR
- **Seed-TTS**: Whisper (en) or Paraformer (zh)
- **MiniMax**: Whisper for non-Chinese, Paraformer for Chinese
- **FLEURS**: Omnilingual-ASR multilingual model

### Speaker Similarity
Cosine similarity between speaker embeddings (ECAPA-TDNN + WavLM) of the reference and generated audio. Higher is better.

### UTMOS (Predicted MOS)
Neural network that predicts Mean Opinion Score from audio. Higher is better.

---

## `docs/training.md`

# Training

## Training Config

All training is controlled by a JSON training config file and a JSON data config file. 

See [examples/config/](../examples/config/) for ready-to-use configs.

Training config file on Emilia is: [examples/config/train_config_emilia.json](../examples/config/train_config_emilia.json)

Data config file for Emilia is: [examples/config/data_config_emilia.json](../examples/config/data_config_emilia.json)


Key fields in training config file:

| Field | Description | Default |
|---|---|---|
| `llm_name_or_path` | local LLM path or huggingface id | Qwen/Qwen3-0.6B |
| `steps` | Total training steps | 300,000 |
| `learning_rate` | Peak learning rate | 1e-4 |
| `batch_tokens` | Tokens per batch on each GPU | 8192 |

`output_dir` and `data_config` are passed via command line (see below).

## Launching Training

```bash
accelerate launch \
    --gpu_ids "0,1,2,3,4,5,6,7" \
    --num_processes 8 \
    -m omnivoice.cli.train \
    --train_config config/train_config_emilia.json \
    --data_config config/data_config_emilia.json \
    --output_dir exp/omnivoice_emilia
```

## Resuming Training

Set `resume_from_checkpoint` in your training config to resume from an existing checkpoint:

```json
{
    "resume_from_checkpoint": "exp/omnivoice/checkpoint-100000"
}
```

## Initializing from a Pretrained Model

To start training from a pretrained VoiceStudio checkpoint (for fine-tuning):

```json
{
    "init_from_checkpoint": "exp/omnivoice/checkpoint-100000"
}
```

## Monitoring

Training logs to TensorBoard:
```bash
tensorboard --logdir exp/omnivoice_emilia/tensorboard
```

---

## `docs/data_preparation.md`

# Data Preparation

VoiceStudio trains on a custom WebDataset format where audio data is packed into **tar shards** with paired **JSONL metadata** files. Each tar shard contains hundreds to thousands of samples (as `.npy` audio token arrays), drastically reducing disk I/O during training. The separated jsonl file allows for easier modification of metadata. This document explains the data format in detail and walks through the preparation pipeline.


## 1. Input Format

Prepare a JSONL file where each line is a JSON object:

```jsonl
{"id": "sample_001", "audio_path": "/data/audio/001.wav", "text": "Hello world", "language_id": "en"}
{"id": "sample_002", "audio_path": "/data/audio/002.wav", "text": "你好世界", "language_id": "zh"}
```

Fields:
- `id` — unique sample identifier (used to match samples across shards and label files)
- `audio_path` — absolute path to the audio file (wav/flac/mp3, will be resampled to 24 kHz)
- `text` — transcript text
- `language_id` — (optional) language code, used for multilingual training, can be omitted


## 2. Processing

The tokenization script `extract_audio_tokens.py` converts audio into 8-layer discrete tokens and packs them into WebDataset shards.

```bash
export CUDA_VISIBLE_DEVICES="0,1,2,4"  # GPUs used for token extraction
python -m omnivoice.scripts.extract_audio_tokens \
    --input_jsonl data.jsonl \
    --tar_output_pattern output/audios/shard-%06d.tar \
    --jsonl_output_pattern output/txts/shard-%06d.jsonl \
    --tokenizer_path eustlb/higgs-audio-v2-tokenizer \
    --nj_per_gpu 3 \
    --shuffle True
```

What it does:
1. Reads your JSONL manifest
2. Encodes each audio file into discrete tokens using audio tokenizer
3. Packs tokens into WebDataset tar shards with paired jsonl metadata files
4. Generates a `data.lst` manifest file

<details>
<summary><strong>Alternative:</strong> WebDataset Input (if you already have raw-audio tar shards)</summary>

Pass the `data.lst` manifest instead of `--input_jsonl`:

```bash
export CUDA_VISIBLE_DEVICES="0,1,2,4"  # GPUs used for token extraction
python -m omnivoice.scripts.extract_audio_tokens \
    --input_manifest existing_data/data.lst \
    --tar_output_pattern output/audios/shard-%06d.tar \
    --jsonl_output_pattern output/txts/shard-%06d.jsonl \
    --tokenizer_path eustlb/higgs-audio-v2-tokenizer \
    --nj_per_gpu 3 \
    --shuffle True
```

The existing_data/data.lst is generated with:
```bash
python -m omnivoice.scripts.jsonl_to_webdataset \
    --input data.jsonl \
    --output data/shards \
    --sr 24000 \
    --shard-size 1000
```

This resamples audio to the target sample rate and packs FLAC files into tar shards with paired jsonl metadata files.

</details>



### Explanation of the script's options:

| Option | Default | Description |
|---|---|---|
| `--input_manifest` | None | Path to input dataset manifest (`data.lst`), mutually exclusive with `--input_jsonl` |
| `--input_jsonl` | None | Path to raw JSONL file, mutually exclusive with `--input_manifest` |
| `--tar_output_pattern` | (required) | Tar shard output pattern, e.g. `output/audios/shard-%06d.tar` |
| `--jsonl_output_pattern` | (required) | JSONL shard output pattern, e.g. `output/txts/shard-%06d.jsonl` |
| `--tokenizer_path` | `eustlb/higgs-audio-v2-tokenizer` | HuggingFace tokenizer path or local path |
| `--nj_per_gpu` | 3 | Worker processes per GPU |
| `--loader_workers` | 24 | DataLoader workers for streaming `IterableDataset` |
| `--shuffle` | True | Shuffle samples before sharding |
| `--shuffle-seed` | 42 | Random seed for shuffling |
| `--samples_per_shard` | 1000 | Max samples per tar shard |
| `--min_num_shards` | 32 | Minimum number of output shards (ensures shard count >= num\_gpu × num\_workers) |
| `--min_length` | 0.0 | Skip audio shorter than this (seconds) |
| `--max_length` | inf | Skip audio longer than this (seconds) |
| `--skip_errors` | False | Continue on processing errors instead of aborting |
| `--num_machines` | 1 | Total number of machines for distributed runs |
| `--machine_index` | 0 | Zero-based machine index for distributed preprocessing |


### Output Structure

Output structure with the following output patterns

```bash
--tar_output_pattern output/audios/shard-%06d.tar \
--jsonl_output_pattern output/txts/shard-%06d.jsonl
```

will be:

```
output/
├── audios/                    # WebDataset tar shards (audio tokens)
│   ├── shard-000000.tar       # Each tar packs ~1000 samples
│   ├── shard-000001.tar
│   └── ...
├── txts/                      # Per-shard companion JSONL labels
│   ├── shard-000000.jsonl     # One JSON line per sample in the corresponding tar
│   ├── shard-000001.jsonl
│   └── ...
├── data.lst                   # Manifest linking tar ↔ jsonl shards
└── errors.jsonl               # Samples that failed processing (if any)
```

`data.lst` and `errors.jsonl` are written to the **parent directory** of `audios/` and `txts/`.


### The `data.lst` manifest

Each line in `data.lst` describes one shard:

```
/path/to/shard-000000.tar /path/to/shard-000000.jsonl 1000 3600.500
/path/to/shard-000001.tar /path/to/shard-000001.jsonl 800 2880.200
```

Format: `<tar_path> <jsonl_path> <num_samples> <total_duration_seconds>`

- Paths are **absolute**
- `.tar` file contains the audio tokens.
- `.jsonl` file contains the metadata in the original provided JSONL file, allows easier access and modification of metadata without decompressing the tar file.
- This manifest is what the training data config references.

### Inside a tar shard

Each `.tar` file packs **many samples** (default 1000 per shard) into a single archive. This is the key advantage of WebDataset: instead of reading thousands of tiny files, the dataloader reads sequentially from a few large tars, drastically reducing disk I/O pressure.

Each sample in the tar is a pair of files with matching keys:

```
shard-000000.tar:
  sample_001.npy    # Audio tokens: numpy array, shape [8, T], dtype int16
  sample_002.npy
  ...
  sample_1000.npy
```

## 3. Data Config for Training

After creating WebDataset shards, write a data config JSON that references them:

```json
{
    "train": [
        {
            "language_id": "en",
            "manifest_path": ["data/custom/tokens/train/data.lst"],
            "repeat": 1
        }
    ],
    "dev": [
        {
            "language_id": "en",
            "manifest_path": ["data/custom/tokens/dev/data.lst"],
            "repeat": 1
        }
    ]
}
```
- `manifest_path` — list of `data.lst` files (one per shard directory)
- `repeat` — how many times to repeat this dataset per epoch (useful for balancing languages)
- `language_id` is not used, just for a better data organization.

See [examples/config/](../examples/config/) for ready-to-use data config files.

> See [docs/data_preparation_advanced.md](../docs/data_preparation_advanced.md) for denoising and noise augmentation.

---

## `AGENTS.md`

# Agent Rules — VoiceStudio

Binding for every AI agent (Claude, Codex, Cursor, review bots, …). CLAUDE.md is the full constitution; this is the operating contract. When they conflict, CLAUDE.md wins.

## Token economy (owner directive, 2026-07-20; tightened 2026-07-28)
- **Default to the shortest response that fully answers.** Outlines and tables over prose; no preamble, no recap of what you just did, no re-explaining a fix the diff already shows. Applies to every response, not just status updates.
- Lead with the outcome. No narration, no restating diffs, no filler praise, no plans you're about to execute anyway.
- Status updates: one line. Final reports: only what changes the reader's next action.
- Don't re-derive what CI, linters, or review bots already computed — read their output first (`gh pr checks`, bot comments via `gh api .../pulls/N/comments`).
- Mechanical rules live in deterministic tests, never in agent effort: changelog style (`tests/test_changelog_style.py`), locale parity (`tests/test_locale_parity.py`), version lockstep (`tests/test_app_version.py`), CJK (`tests/test_no_hardcoded_cjk.py`).
- Run targeted tests while iterating; full suites only before landing.
- Tests and CI simulate CI honestly: `HF_HUB_OFFLINE=1` + empty `HF_HUB_CACHE` — a populated dev cache masks real failures.

## Cross-platform parity: behaviour, not performance
- The parity rule covers user-visible BEHAVIOUR. Hardware acceleration varies by host by design (CUDA/MPS/DirectML, Triton availability, `torch.compile`); skipping an optimization where it physically cannot work is not a parity violation.
- Do not "fix" a parity finding by disabling a working optimization everywhere. That trades a real regression for a semantic one.
- A feature the user can see and use on one OS but not another IS a violation. Judge by what the user can do, not by how fast it runs.

## Merge protocol (hard rules)
1. Never merge without review. Harvest CodeRabbit + Greptile comments first; never merge with an unread Critical/P1.
2. Never accept a PR as-is: fix findings ON the PR branch pre-merge (maintainer commits fine; credit contributors in CHANGELOG). No merge-then-fix, no comment-and-walk-away.
3. Merge current `main` into stale branches before judging their CI — PR-green under an old workflow ≠ main-green.
4. Gate: "Tests (backend + frontend)" green + MERGEABLE.
5. After EVERY merge: watch `main`'s own post-merge runs to green (`gh run list --branch main`). Red main = drop everything and fix.

## Change rules (see CLAUDE.md for full text)
- Root-cause the class, not the instance; fail-before/pass-after regression test; smallest correct change.
- Default behavior identical on macOS/Windows/Linux; platform-only features go behind explicit opt-in. Divergent default = P0.
- Local-first: no new required network calls; any HF download gated on installed-ness or explicit user action; all synthetic audio through the `mark_synthetic` chokepoint.
- Every user-facing string via i18n, present in ALL 21 `frontend/src/i18n/locales/*.json` with real translations.
- Docs-sync in the same PR. CHANGELOG Unreleased: quiet one-liners ending `(#N)` + `— thanks @user!` for community work, under a short `**Highlights**` list.
- Versioning: `frontend/package.json` is the single source of truth; never bump without the owner asking.
- `frontend/package.json` dep changes require regenerating root `bun.lock` (Docker runs `--frozen-lockfile`).
- Issues: absorb or decline — never defer to a future version. Check the open-PR queue before implementing community-reported fixes.

## Shared select controls

- Use `frontend/src/components/SearchableSelect.jsx` for all new or redesigned select boxes. Reuse `VoiceSelector` for voice choices. Do not introduce native `<select>` controls.
- Provide a localized `ariaLabel`; use `menuPortal` inside scrolling or clipping containers. Preserve keyboard selection and disabled states.

## Agent skills

Project development skills are pinned in `skills-lock.json` and installed under
`.agents/skills/`: Vite and FastAPI.
Repository rules and tracker mappings override generic skill guidance.

### Issue tracker

GitHub Issues on `debpalash/VoiceStudio`, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical roles, each label string equal to its name. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.

---

## `LICENSE-NOTICE.md`

# VoiceStudio — License Notice

## Abbreviation

AGPL-3.0-only

## Notice

Copyright 2024-present Palash Debnath and VoiceStudio contributors.

VoiceStudio is **free and open-source software, licensed under the GNU
Affero General Public License, Version 3 (AGPL-3.0)**. You are free to use,
copy, modify, and redistribute it. That **includes commercial and internal
business use** of the application itself. Model weights, tokenizers, and other
third-party assets retain their own terms; this application license does not
grant or summarize rights under those separate terms.

Because this is the **Affero** GPL, one additional obligation applies: if you
modify VoiceStudio and make that modified version available to others over
a network, you must also offer those users the complete corresponding source
code of your modified version under these same AGPL-3.0 terms. See the full
text in [`LICENSE`](LICENSE).

A **commercial license is available** for organizations that want to embed
VoiceStudio in a closed-source or proprietary product or service without
the AGPL-3.0 copyleft obligations. Pricing tiers are coming soon; for inquiries
contact `VoiceStudio@palash.dev`.

(This Notice is a plain-language summary; the binding terms are the full GNU
AGPL-3.0 text in [`LICENSE`](LICENSE).)

### Scope

These terms cover the VoiceStudio application — the Tauri desktop shell
(`frontend/src-tauri/`), the React frontend (`frontend/src/`), the FastAPI
backend (`backend/`), and supporting build / packaging scripts (`scripts/`,
`Dockerfile`, `docker-compose.yml`, `.github/`).

The bundled `omnivoice/` Python package — the underlying TTS model by Han Zhu —
is **separately licensed under Apache License 2.0** by its upstream authors and
is not relicensed here. Apache License 2.0 is compatible with, and may be
combined under, the GNU AGPL-3.0. See `pyproject.toml`.

Downloaded model weights are not relicensed by VoiceStudio. The default
`k2-fsa/OmniVoice` model card identifies its code as Apache-2.0 and pretrained
weights as CC-BY-NC. Its `audio_tokenizer/LICENSE` contains separate Boson
Higgs Audio 2 and Meta Llama community terms. A commercial license for
VoiceStudio-owned code does not replace any of those terms.

Third-party dependencies retain their own licenses. See `Cargo.lock`,
`bun.lock`, and `uv.lock` for the resolved set.

### Reference

The full canonical text of the GNU Affero General Public License, Version 3 is
reproduced verbatim in [`LICENSE`](LICENSE). The authoritative copy lives at
<https://www.gnu.org/licenses/agpl-3.0.txt>.

> **Why this notice is a separate file:** `LICENSE` must contain the verbatim
> AGPL-3.0 text and nothing else, so GitHub's license detection (and the
> corporate license scanners that gate adoption) can identify it as
> `AGPL-3.0-only` rather than falling back to "Other" / `NOASSERTION`.
