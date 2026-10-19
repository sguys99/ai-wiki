---
title: "ArtCraft와 Crafting Apps: 아티스트용 AI 생성 IDE와 오픈소스 Rust 창작 앱 13종"
type: repo
year: 2026
category: applications
source: storytold-artcraft.md
sources:
  - storytold-artcraft.md
  - getartcraft-2026-crafting-apps-open-source-creative.md
raw_path: raw/repos/storytold-artcraft.md
raw_filename: "storytold-artcraft.md"
source_collection: external
org: "storytold"
repo: "artcraft"
url: "https://github.com/storytold/artcraft"
license: "MIT OR Apache-2.0"
tags: [creative-tools, image-generation, video-generation, 3d-generation, gaussian-splatting, rust, mcp, agent-ready]
figures:
  - id: ca-fig14
    file: assets/storytold-artcraft/ca-fig14.webp
    raw: raw/articles/getartcraft-2026-crafting-apps-open-source-creative-figures/fig14.webp
    caption: "PhotoCraft가 호쿠사이의 The Great Wave 이미지에 Curves 조정 레이어와 문자 레이어를 얹어 편집하는 화면. 오른쪽에 Properties 패널과 Layers 패널이 있다"
    strategy: fetched
    from_source: getartcraft-2026-crafting-apps-open-source-creative
    curated: true
  - id: ca-fig16
    file: assets/storytold-artcraft/ca-fig16.webp
    raw: raw/articles/getartcraft-2026-crafting-apps-open-source-creative-figures/fig16.webp
    caption: "FilmCraft 화면. video scope, 영화 Charade(1963)를 재생하는 program monitor, 다중 트랙 타임라인으로 구성된다"
    strategy: fetched
    from_source: getartcraft-2026-crafting-apps-open-source-creative
    curated: true
  - id: ca-fig21
    file: assets/storytold-artcraft/ca-fig21.webp
    raw: raw/articles/getartcraft-2026-crafting-apps-open-source-creative-figures/fig21.webp
    caption: "FigCraft가 Ridgeline 등산 앱의 휴대폰 화면 3개를 편집하는 화면. 선택한 카드 인스턴스의 auto layout 트리, Fill과 Hug 크기 설정, Theme variable mode가 보인다"
    strategy: fetched
    from_source: getartcraft-2026-crafting-apps-open-source-creative
    curated: true
---

## 요약

ArtCraft는 storytold 조직이 공개한 오픈소스 데스크톱 앱으로, README는 스스로를 "The IDE for artists"라고 소개한다. 핵심 발상은 생성 모델을 부르기 전에 장면을 먼저 만드는 것이다. 사용자는 2D 캔버스에서 이미지 레이어를 합성하고, 3D 공간에 배경과 소품과 캐릭터를 배치하고, 카메라 위치와 포즈를 정한 뒤 원하는 모델을 골라 최종 이미지나 영상을 생성한다. README는 이 방식을 프롬프트 작성(prompting)과 대비해 "crafting"이라고 부른다.

ArtCraft 한 앱 안에서 고를 수 있는 생성 모델은 62종이다. 이미지 16종, 영상 25종, 음악과 효과음 5종, 3D mesh 11종, world와 Gaussian splat 5종으로 나뉘고, Grok, Midjourney, Sora, World Labs는 별도 provider로 연결된다. 저장소는 Rust가 주 언어이며 MIT와 Apache-2.0 중 하나를 고르는 이중 라이선스를 쓴다. 수집 시점(2026-10-19) 기준 GitHub star는 33,007개다.

같은 팀은 Crafting Apps라는 별도 계열도 공개했다. 이미지 편집, 벡터 일러스트, 영상 편집, CAD, 스프레드시트 등 전문가용 창작 도구 13종을 Rust로 처음부터 다시 만든 오픈소스 앱 묶음이다. 모든 앱이 CLI, JSON 제어 채널, MCP 서버로 외부에서 구동되도록 설계되어 AI 에이전트가 직접 조작할 수 있다는 점이 특징이다.

이 페이지는 두 자료를 합쳐 정리한다.

| 자료 | 유형 | 다루는 범위 |
|---|---|---|
| storytold/artcraft README와 ROADMAP.md | repo | AI 이미지와 영상 생성 IDE의 기능, 모델 카탈로그, 2026년 로드맵 |
| getartcraft.com/apps (Crafting Apps 소개 페이지) | article | 13종 창작 앱 라인업, 공통 원칙 6개, 배포 방식 |

## 배경

### 프롬프트만으로는 구도를 통제하기 어렵다

생성 모델에 텍스트 프롬프트만 넣으면 결과가 매번 달라지고, 인물의 위치, 카메라 각도, 같은 캐릭터의 정체성을 원하는 대로 고정하기 어렵다. ArtCraft README는 이 문제를 "Artists need control over composition, character identity, and camera placement"라는 문장으로 요약한다. 즉 아티스트에게 필요한 것은 더 긴 프롬프트가 아니라 구도, 캐릭터 정체성, 카메라 배치를 직접 다루는 도구라는 주장이다.

이 관점은 영화 제작 현장의 관행과 닮았다. 촬영 전에 배우와 소품과 카메라 위치를 미리 정하는 scene blocking처럼, ArtCraft는 생성 전에 장면을 먼저 짜도록 한다. README의 표어 "Build the scene before you generate it"이 이 설계를 그대로 드러낸다.

### 모델 aggregation 사이트와의 경쟁

ROADMAP.md는 2026년 1순위 목표를 "모델 aggregation 웹사이트보다 더 좋고 유용해지는 것"으로 적는다. 여러 생성 모델을 한곳에 모아 주는 웹 서비스가 이미 있으므로, ArtCraft는 모델 목록 자체보다 모델을 다루는 작업 환경(IDE)으로 차별화하려 한다. 로드맵이 "모든 모델과 provider를 ArtCraft에 넣어 각자의 crafting IDE를 만들게 하겠다"고 밝히는 것도 같은 맥락이다.

### 데스크톱 창작 도구를 다시 만드는 이유

Crafting Apps 페이지는 다른 문제를 겨냥한다. 이미지 편집기, 영상 편집기, 문서 작성기 같은 전문 도구를 오픈소스로, 네이티브로, 로컬 실행으로, 그리고 에이전트가 조작할 수 있는 형태로 다시 만드는 것이다. 페이지는 이 원칙들을 "Built the hard way"라는 문구로 묶고, 모든 앱이 Rust로 처음부터 작성되어 같은 규칙을 따른다고 적는다.

## 핵심 개념

crafting은 ArtCraft README가 프롬프트 작성과 대비해 쓰는 말로, 시각 도구로 장면을 직접 구성해 정밀하고 반복 가능한 결과를 얻는 작업 방식을 뜻한다. 프롬프트는 아이디어 탐색의 출발점이고, 결과를 다듬는 일은 캔버스와 3D 장면 도구가 맡는다.

provider는 생성 모델을 실제로 서비스하는 외부 공급자를 말한다. ArtCraft에서는 자체 provider인 ArtCraft와 Grok, Midjourney, Sora, World Labs가 나란히 놓인다.

Gaussian splat은 장면을 다수의 3D Gaussian으로 표현하는 3D 표현 방식이다. ArtCraft의 world 생성 모델(World Labs Marble, TripoSplat)이 이 형식으로 결과를 낸다.

Kitbashing은 기존 3D asset kit의 부품을 조합해 새 장면을 만드는 기법이다. ArtCraft는 이 기법으로 카메라 각도, 물체 배치, 깊이를 통제하는 scene blocking을 지원한다.

MCP는 모델이 외부 도구와 데이터 원천에 표준화된 방식으로 접근하게 하는 프로토콜이다. Crafting Apps는 각 앱을 MCP 서버로 노출해 AI 에이전트가 앱을 직접 조작할 수 있게 한다.

## ArtCraft의 작업 방식

### 생성 전 장면 구성

README의 "Show, Don't Tell" 절은 생성 전에 장면을 짜는 기능 9개를 소개한다. 기능은 크게 세 묶음으로 나눌 수 있다.

| 묶음 | 기능 | 설명 |
|---|---|---|
| 공간과 장면 | Image to Location | 가상 배우를 일관된 환경에 배치하고 같은 방 안에서 여러 shot을 계획한다 |
| 공간과 장면 | Scene Blocking with Kitbashing | 3D asset kit을 조합해 카메라 각도, 물체 배치, 깊이를 통제한다 |
| 합성 | 3D Image Compositing | 배경, 전경, 소품을 3D 공간에 층으로 쌓아 깊이가 있는 구도를 만든다 |
| 합성 | 2D Image Compositing | 이미지 레이어, 배경 제거, 드로잉 도구로 장면을 구성한다 |
| 합성 | Mixed Asset Crafting | 이미지 오려내기, world, 3D mesh를 한 장면에 결합한다 |
| 합성 | Background Removal | 피사체를 분리해 2D와 3D 장면의 소품, 레이어, 배경으로 쓴다 |
| 객체와 캐릭터 | Image to 3D Mesh | 이미지를 3D 객체로 바꿔 위치, 회전, 프레이밍을 정밀하게 조정한다 |
| 객체와 캐릭터 | Character Posing | 최종 shot을 생성하기 전에 캐릭터 포즈와 카메라를 정한다 |
| 객체와 캐릭터 | Character Identity Transfer | 포즈를 잡은 마네킹으로 캐릭터의 위치와 포즈를 유도한다 |

이 기능들은 서로 이어지는 흐름을 이룬다. 예를 들어 사용자는 참고 이미지로 Image to Location을 실행해 촬영 공간을 만들고, Image to 3D Mesh로 소품을 3D 객체로 바꿔 배치한 뒤, 마네킹 포즈와 카메라를 정하고, Character Identity Transfer로 원하는 캐릭터를 그 자리에 생성할 수 있다. 같은 공간에서 카메라만 바꾸면 여러 shot을 일관되게 얻는다.

README는 scene blocking, canvas editing, scene relighting 미리보기를 추가할 예정이라고 적는다.

### 프롬프트 기반 빠른 탐색

장면 구성 기능과 별개로 프롬프트에서 바로 시작하는 기능 4개가 있다.

| 기능 | 설명 |
|---|---|
| Text to Image | 여러 이미지 모델에서 텍스트 프롬프트로 아이디어를 탐색한다 |
| Prompted Image Editing | Nano Banana Pro, GPT Image 같은 모델에 변경 내용을 말로 지시한다 |
| Canvas Image Editing | 드로잉, mask, inpainting으로 이미지가 바뀔 위치를 지정한다 |
| Image to Video | 원하는 영상 모델과 생성 설정으로 이미지를 움직이게 만든다 |

README가 제시하는 순서는 프롬프트로 빠르게 아이디어를 탐색한 뒤 캔버스와 장면 도구로 다듬는 것이다. 따라서 프롬프트 기능은 장면 구성 기능을 대체하지 않고 그 앞 단계를 맡는다. image inpainting과 image ingredients 미리보기는 추가 예정이다.

### provider 구성

| provider | 모델과 워크플로 |
|---|---|
| ArtCraft | 이미지, 영상, 음악과 효과음, 3D mesh, world. 62종 카탈로그 |
| Grok | Grok Imagine, Grok Video |
| Midjourney | Midjourney 이미지 생성 |
| Sora | Sora 1, Sora 2, GPT Image 1 |
| World Labs | Marble world 생성 (Gaussian splat) |

추가 연동 계획으로 Kling, Google, Runway, Luma가 있다. README는 OpenArt와 Freepik 같은 aggregator의 기존 구독을 ArtCraft 안에서 쓰게 하는 방안에도 관심을 표명한다.

### 모델 카탈로그 62종

ArtCraft provider가 제공하는 모델은 다섯 분류로 나뉜다. 표의 †는 현재 비활성, ‡는 제한 모델로 데스크톱 앱에서 쓸 수 없음을 뜻한다.

| 분류 | 개수 | 계열과 모델 |
|---|---|---|
| Images | 16 | Nano Banana(Nano Banana, 2, Pro), GPT Image(1.5, 2, 2.5 Flare, 2.5 Sunburst), FLUX(1 dev, 1 schnell, 1.1 pro, 1.1 pro ultra), Seedream(4, 4.5, 5 Lite, 5.0 Pro, 5.0 Pro Ultra) |
| Video | 25 | Seedance(1.0 Lite †, 1.5 Pro, 2.0), Kling(1.6 Pro, 2.1 Pro †, 2.1 Master †, 2.5 Turbo Pro, 2.6 Pro, 3.0 Pro †, 3.0 Standard †), Veo(2 †, 3 †, 3 Fast, 3.1, 3.1 Fast, 3.1 Lite), Sora(2 †, 2 Pro †), Vidu(Q3, Q3 Turbo), MiniMax(H3, H3 Turbo ‡, H3 Ultra ‡), Flux(3, 3 Draft) |
| Music and sound | 5 | Suno(Music, Remix, Sounds, Sample), Seed Audio 1.0 |
| 3D meshes | 11 | Hunyuan 3D(2.0, 2.1, 3, 3 Sketch, 3.1 Pro, 3.1 Rapid, 3.1 Part, 3.1 Smart Topology), Tripo3D H3.1, Meshy 6, Rodin 2.5 Fast |
| Worlds and Gaussian splats | 5 | Marble(1.0, 1.0 Draft, 1.1, 1.1 Plus), TripoSplat |

영상 모델 25종 가운데 11종이 비활성이고 2종이 제한 상태다. 즉 데스크톱 앱에서 바로 쓸 수 있는 영상 모델은 12종이다. 카탈로그 주석은 이 목록이 서비스 측 저장소 `artcraft-services`의 `omni_gen` 설정(image_models.rs, video_models.rs, audio_models.rs, mesh_models.rs, splat_models.rs)에서 GenerationProvider::Artcraft 매핑만 옮긴 것이라고 밝힌다. 따라서 모델 목록은 클라이언트 코드가 아니라 서비스 측 설정이 정한다.

3D mesh 11종 중 8종이 Hunyuan 3D 계열이라는 점도 눈에 띈다. 이미지를 3D 객체로 바꾸는 Image to 3D Mesh 기능이 이 계열에 크게 의존한다고 볼 수 있다.

### 배포와 저장소 구성

| 경로 | 내용 |
|---|---|
| getartcraft.com | Windows와 macOS 안정 릴리스 |
| GitHub releases | 최신 빌드 |
| 소스 빌드 (`_docs/dev_setup.md`) | Linux 포함 |

저장소 최상위에는 Rust workspace(`Cargo.toml`, `crates/`), 네이티브 앱(`artcraft-native/`), `frontend/`, `_database/`, 개발 문서(`_docs/`의 artcraft_omni_api.md, dev_setup.md), 데스크톱 빌드 스크립트(`script/`)가 있다. `AGENTS.md`와 `CLAUDE.md`도 함께 있어 코딩 에이전트와 함께 개발하는 저장소임을 알 수 있다.

## Crafting Apps 라인업

### 13종 앱

Crafting Apps 페이지는 13종 앱을 번호 순으로 소개한다. 모든 카드에 "Installers ready" 표시가 있다.

| 번호 | 앱 | 분야 | 상태 | 브라우저 실행 |
|---|---|---|---|---|
| 01 | PhotoCraft | 이미지 편집 | Early alpha | 지원 |
| 02 | VectorCraft | 벡터 일러스트 | In development | 지원 |
| 03 | FilmCraft | 영상 편집 | In development | 미지원 |
| 04 | LightCraft | 사진 라이브러리와 raw 현상 | In development | 지원 |
| 05 | PdfCraft | PDF 읽기, 정리, 합치기, 분할, 보안 | Early alpha | 지원 |
| 06 | EffectCraft | 모션 그래픽과 시각 효과 | In development | 지원 |
| 07 | DesignCraft | 페이지 레이아웃과 출판 | In development | 지원 |
| 08 | FigCraft | 인터페이스 디자인과 프로토타이핑 | Early alpha | 지원 |
| 09 | WordCraft | 문서 작성 | In development | 지원 |
| 10 | SoundCraft | 디지털 오디오 워크스테이션 | In development | 지원 |
| 11 | DeckCraft | 프레젠테이션 | In development | 지원 |
| 12 | CADCraft | 설계와 제도 | In development | 지원 |
| 13 | GridCraft | 스프레드시트와 데이터 분석 | In development | 지원 |

13종 모두 macOS, Windows, Linux 데스크톱 설치기가 있다. 성숙도는 Early alpha 3종(PhotoCraft, PdfCraft, FigCraft), In development 10종이다. 브라우저 실행을 지원하지 않는 앱은 FilmCraft 하나다.

![[assets/storytold-artcraft/ca-fig14.webp]]
*Figure 1: PhotoCraft가 The Great Wave 이미지에 Curves 조정 레이어와 문자 레이어를 얹어 편집하는 화면 (getartcraft.com/apps)*

PhotoCraft 페이지 문구는 "The open-source image editor you already know how to use"다. 화면에는 왼쪽 도구 막대, 오른쪽 Properties 패널의 Curves 곡선, Layers 패널의 조정 레이어(Curves, Vibrance)와 문자 레이어, Drop Shadow 효과가 보인다. 즉 이미지 편집 전문가에게 익숙한 레이어 기반 편집 구조를 그대로 따른다.

![[assets/storytold-artcraft/ca-fig16.webp]]
*Figure 2: FilmCraft의 video scope, program monitor, 다중 트랙 타임라인 (getartcraft.com/apps)*

FilmCraft는 "Professional, open-source video editing, rebuilt from scratch in Rust"로 소개된다. 13종 중 유일하게 WebAssembly 빌드가 없는 앱이다.

![[assets/storytold-artcraft/ca-fig21.webp]]
*Figure 3: FigCraft에서 auto layout과 Theme variable mode를 쓰는 휴대폰 앱 화면 편집 (getartcraft.com/apps)*

FigCraft 화면은 휴대폰 화면 3개(Light 2개, Dark 1개)를 캔버스에 놓고, 선택한 카드 인스턴스의 auto layout 트리와 Fill, Hug 크기 설정, Theme variable mode를 보여 준다. 인터페이스 디자인 도구에서 쓰는 컴포넌트와 변수 개념을 지원한다는 뜻이다.

### 공통 원칙 6개

| 번호 | 원칙 | 내용 |
|---|---|---|
| 01 | Open source | 모든 코드를 GitHub에 permissive license로 공개한다. 읽고, fork하고, 그 위에 만들 수 있다 |
| 02 | Native, not wrapped | 순수 Rust를 macOS, Windows, Linux용 실제 데스크톱 앱으로 컴파일한다. Electron도 web view도 쓰지 않는다 |
| 03 | Familiar from day one | 현업 전문가가 이미 아는 레이아웃, 도구, 단축키를 따른다 |
| 04 | Your files, your machine | 모든 처리가 사용자의 파일 위에서 로컬로 실행되고 클라우드 왕복이 없다 |
| 05 | Agent-ready | 모든 앱을 CLI, JSON 제어 채널, MCP 서버로 구동할 수 있다 |
| 06 | Also in your browser | 12종 앱이 WebAssembly로도 컴파일되어 브라우저 탭에서 실행된다 |

여섯 원칙 가운데 AI 관점에서 가장 중요한 것은 5번 Agent-ready다. 사람이 쓰는 GUI 앱을 그대로 두고, 같은 앱을 CLI와 JSON 제어 채널과 MCP 서버로도 열어 두면 에이전트가 이미지 보정, 문서 작성, 스프레드시트 작업을 앱 기능으로 직접 실행할 수 있다. 반면 페이지는 명령 체계나 프로토콜 세부를 공개하지 않으므로, 실제로 어느 범위까지 조작할 수 있는지는 앱별 저장소를 확인해야 한다.

3번 원칙과 4번 원칙도 에이전트 활용과 관련된다. 익숙한 UI는 사람이 에이전트의 작업 결과를 같은 앱에서 바로 검토하게 하고, 로컬 실행은 작업 파일이 외부로 나가지 않게 한다.

### 배포 방식

- **ArtCraft Launcher**: 페이지가 권장하는 설치 경로다. 13종 앱을 모두 설치하고 최신 상태로 유지한다. 페이지의 내려받기 버튼은 craft-launcher v0.3.2의 Linux x86_64 Flatpak 패키지를 가리킨다.
- **앱별 설치기**: 각 앱 상세 페이지에서 macOS, Windows, Linux 설치기를 따로 받을 수 있다.
- **커뮤니티**: 다음에 다시 만들 앱 요청, 초기 빌드 테스트, 개발 동향 공유를 ArtCraft Discord에서 진행한다. 페이지는 "More crafts on the way"라고 적어 라인업이 늘어날 예정임을 밝힌다.

## 두 제품의 관계

ArtCraft와 Crafting Apps는 같은 팀이 만들지만 목적이 다르다. Crafting Apps 페이지 바닥글은 ArtCraft를 "controllable AI image and video를 위한 오픈소스 스튜디오"로 소개하고, Crafting Apps는 그와 별개인 일반 창작 도구 계열로 다룬다.

| 비교 기준 | ArtCraft | Crafting Apps |
|---|---|---|
| 목적 | AI 이미지와 영상 생성을 위한 IDE | 전문 창작 도구의 오픈소스 재구현 |
| 생성 모델 | 62종 카탈로그와 외부 provider 4곳 | 페이지에 언급 없음 |
| AI와의 관계 | 사람이 생성 모델을 정밀하게 다루는 도구 | AI 에이전트가 앱을 조작하는 대상 |
| 실행 위치 | 데스크톱 앱, 현재 ArtCraft 호스팅 서비스에 의존 | 로컬 실행, 클라우드 왕복 없음 |
| 플랫폼 | Windows, macOS 안정 릴리스, Linux 소스 빌드 | macOS, Windows, Linux, 12종은 브라우저 |
| 구현 언어 | Rust 중심 (로드맵상 Rust 비중 확대 중) | 순수 Rust |
| 라이선스 | MIT 또는 Apache-2.0 | permissive license (앱별 저장소) |

두 제품이 AI를 대하는 방향이 반대라는 점이 핵심 차이다. ArtCraft는 사람이 AI 생성 모델을 통제하도록 돕고, Crafting Apps는 AI 에이전트가 사람의 도구를 쓰도록 문을 연다. 두 방향 모두 "AI에 맡기되 결과를 정밀하게 통제한다"는 같은 목표를 공유한다.

## 로드맵

ROADMAP.md는 ArtCraft의 2026년 목표를 네 영역으로 정리한다.

| 영역 | 목표 |
|---|---|
| Product | 모델 aggregation 웹사이트보다 더 유용해지기(1순위), 장면과 영상을 점토처럼 빚고 정밀하게 연출하는 "tangible" 컴퓨팅 표면, 모든 모델과 provider 추가, scene relighting과 캐릭터 및 소품 reposing 같은 목적 특화 이미지 모델 개발 |
| Studio | 자체 콘텐츠 스튜디오 구축, 단편 다수와 연말까지 장편 AI 영화 1편 이상 제작(극장 배급과 소셜 미디어 콘텐츠), 페스티벌과 경연, 오프라인 모임과 상영회 |
| Architecture | ArtCraft 호스팅 서비스 의존 제거, Rust 비중 확대와 속도 개선, 코드 정리와 테스트, CI |
| Community | 부정적 분위기와 anti-AI 낙인이 없는 영화인과 아티스트 커뮤니티 |

Studio 영역은 팀이 도구 제작사이면서 동시에 콘텐츠 제작자라는 점을 보여 준다. 로드맵은 "We are creators, and we want to employ more creators!"라고 적어 자체 영화 제작으로 도구를 검증하려는 의도를 밝힌다.

"Loftier Goals"로는 open model, open platform, open hardware를 갖춘 "Open OpenAI / Google / Anthropic"을 만들겠다는 장기 목표를 적는다.

## 한계

두 자료 모두 제품 소개 문서라 성능 수치나 비교 실험이 없다. 확인할 수 있는 한계는 다음과 같다.

- **호스팅 서비스 의존**: ArtCraft는 현재 ArtCraft 호스팅 서비스에 의존하며, 로드맵이 이 의존 제거를 목표로 둔다. 모델 카탈로그도 서비스 측 저장소 설정이 정한다.
- **비활성 모델**: 영상 모델 25종 중 13종이 비활성이거나 제한 상태다.
- **플랫폼 편차**: ArtCraft 안정 릴리스는 Windows와 macOS만 제공하고 Linux는 소스 빌드가 필요하다. 반대로 Crafting Apps 페이지의 launcher 직접 내려받기는 Linux Flatpak 하나뿐이다.
- **준비 중인 기능**: ArtCraft의 scene blocking, canvas editing, relighting, inpainting 미리보기가 아직 준비 중이다.
- **초기 단계**: Crafting Apps 13종은 모두 Early alpha 또는 In development 단계라 실무 대체 수준을 판단할 근거가 없다.
- **에이전트 인터페이스 세부 부재**: Agent-ready 원칙은 CLI, JSON 제어 채널, MCP 서버를 언급할 뿐 명령 범위와 프로토콜 세부를 공개하지 않는다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| crafting | 프롬프트 작성과 대비되는 말로, 시각 도구로 장면을 직접 구성해 반복 가능한 결과를 얻는 작업 방식 |
| Scene Blocking | 촬영 전 배우, 소품, 카메라 위치를 미리 정하는 연출 용어. ArtCraft에서는 3D 장면 배치 기능 |
| Character Identity Transfer | 포즈를 잡은 마네킹을 가이드로 특정 캐릭터의 위치와 포즈를 생성 결과에 옮기는 기능 |
| Gaussian splat | 장면을 다수의 3D Gaussian으로 표현하는 방식. ArtCraft의 world 생성 결과 형식 |
| Agent-ready | 앱을 CLI, JSON 제어 채널, MCP 서버로 외부에서 구동할 수 있게 설계했다는 Crafting Apps 원칙 |
| ArtCraft Launcher | Crafting Apps 13종을 설치하고 갱신하는 통합 설치기 |

## 관련 페이지

- [[applications/debpalash-voicestudio]]: 같은 local-first 데스크톱 창작 앱이 MCP 서버로 기능을 에이전트에 노출하는 사례. VoiceStudio는 speech, Crafting Apps는 이미지와 문서와 CAD 등을 노출한다
- [[agents/rodrigues-2026-mcp-server-architecture-patterns]]: MCP 서버 설계 패턴. Crafting Apps의 Agent-ready 원칙을 구현할 때 참고할 구조
- [[overviews/design-md-overview]]: 에이전트에 UI 디자인 규격을 전달하는 방식의 비교. FigCraft처럼 에이전트가 조작할 수 있는 디자인 도구와 맞물린다
