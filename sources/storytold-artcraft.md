---
title: "ArtCraft (storytold/artcraft, GitHub repo)"
type: repo
year: 2026
category: applications
raw_path: raw/repos/storytold-artcraft.md
raw_filename: "storytold-artcraft.md"
source_collection: external
org: "storytold"
repo: "artcraft"
url: "https://github.com/storytold/artcraft"
license: "MIT OR Apache-2.0"
tags: [creative-tools, image-generation, video-generation, 3d-generation, gaussian-splatting, rust]
---

## 한 줄 요약 (One-line Summary)

ArtCraft는 "The IDE for artists"를 표방하는 오픈소스 데스크톱 앱으로, 2D 캔버스와 3D 장면 도구로 구도, 캐릭터 포즈, 카메라를 먼저 잡은 뒤 원하는 이미지, 영상, 3D, 음악 생성 모델을 골라 결과를 얻게 해 프롬프트 작성을 시각적 "crafting"으로 바꾸려는 Rust 기반 프로젝트다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저장소 | github.com/storytold/artcraft (기본 브랜치 main) |
| 라이선스 | MIT 또는 Apache-2.0 이중 라이선스 중 선택. 제3자 자료 고지는 NOTICE 파일 |
| 주 언어 | Rust |
| 생성 / 마지막 push | 2022-03-31 / 2026-10-18 |
| stars | 33,007 (수집 시점 2026-10-19) |
| topics | 3d-graphics, ai, aivideo, filmmaking, imagegeneration |
| 수집 범위 | README.md, ROADMAP.md 전문 |
| 저장소 구성 | `crates/`, `artcraft-native/`, `frontend/`, `_database/`, `_docs/`(artcraft_omni_api.md, dev_setup.md), `script/`, `AGENTS.md`, `CLAUDE.md` 등 |
| 배포 | getartcraft.com의 Windows, macOS 안정 릴리스, GitHub releases 최신 빌드, Linux는 소스 빌드 |

저장소 description은 "ArtCraft is an intentional crafting engine for artists, designers, and filmmakers"다. README 첫머리에는 2분 분량 데모 영상(YouTube)이 연결되어 있다.

## 2. 주요 기여 (Key Contributions)

- **생성 전 장면 구성**: 생성 모델을 부르기 전에 2D 레이어 합성, 3D 장면 배치, 캐릭터 포즈, 카메라 위치를 먼저 정해 구도와 정체성을 통제한다.
- **모델 선택형 IDE**: 이미지, 영상, 음악과 효과음, 3D mesh, world(Gaussian splat) 생성 모델 62종을 한 앱 안에서 고른다.
- **외부 provider 연동**: Grok, Midjourney, Sora, World Labs를 별도 provider로 연결한다.
- **반복 가능한 결과**: README는 프롬프트만으로 얻는 결과 대신 시각 도구로 "precise, repeatable results"를 얻는 것을 목표로 적는다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 고급 crafting 기능 (Show, Don't Tell)

| 기능 | 설명 |
|---|---|
| Image to Location | 가상 배우를 일관된 환경에 배치하고 같은 방 안에서 여러 shot을 계획한다 |
| 3D Image Compositing | 배경, 전경, 소품을 3D 공간에 층으로 쌓아 깊이가 있는 구도를 만든다 |
| 2D Image Compositing | 이미지 레이어, 배경 제거, 드로잉 도구로 장면을 구성한다 |
| Image to 3D Mesh | 이미지를 3D 객체로 바꿔 위치, 회전, 프레이밍을 정밀하게 조정한다 |
| Character Posing | 최종 shot을 생성하기 전에 캐릭터 포즈와 카메라를 정한다 |
| Scene Blocking with Kitbashing | 3D asset kit을 조합해 카메라 각도, 물체 배치, 깊이를 통제한다 |
| Character Identity Transfer | 포즈를 잡은 마네킹으로 캐릭터의 위치와 포즈를 유도한다 |
| Background Removal | 피사체를 분리해 2D와 3D 장면의 소품, 레이어, 배경으로 쓴다 |
| Mixed Asset Crafting | 이미지 오려내기, world, 3D mesh를 한 장면에 결합한다 |

README는 scene blocking, canvas editing, scene relighting 미리보기를 추가할 예정이라고 적는다.

### 3.2 빠른 프롬프트 기능 (Quick and Easy Prompting)

| 기능 | 설명 |
|---|---|
| Text to Image | 여러 이미지 모델에서 텍스트 프롬프트로 아이디어를 탐색한다 |
| Prompted Image Editing | Nano Banana Pro, GPT Image 같은 모델에 변경 내용을 말로 지시한다 |
| Canvas Image Editing | 드로잉, mask, inpainting으로 이미지가 바뀔 위치를 지정한다 |
| Image to Video | 원하는 영상 모델과 생성 설정으로 이미지를 움직이게 만든다 |

작업 흐름은 프롬프트로 빠르게 아이디어를 탐색한 뒤 캔버스와 장면 도구로 다듬는 순서다. image inpainting과 image ingredients 미리보기는 추가 예정이다.

### 3.3 provider와 모델 카탈로그

| provider | 모델과 워크플로 |
|---|---|
| ArtCraft | 이미지, 영상, 음악과 효과음, 3D mesh, world. 62종 카탈로그 |
| Grok | Grok Imagine, Grok Video |
| Midjourney | Midjourney 이미지 생성 |
| Sora | Sora 1, Sora 2, GPT Image 1 |
| World Labs | Marble world 생성 (Gaussian splat) |

ArtCraft provider의 62종 카탈로그는 다음과 같다 (†는 현재 비활성, ‡는 제한 모델로 데스크톱 앱에서 사용 불가).

| 분류 | 개수 | 계열과 모델 |
|---|---|---|
| Images | 16 | Nano Banana(Nano Banana, 2, Pro), GPT Image(1.5, 2, 2.5 Flare, 2.5 Sunburst), FLUX(1 dev, 1 schnell, 1.1 pro, 1.1 pro ultra), Seedream(4, 4.5, 5 Lite, 5.0 Pro, 5.0 Pro Ultra) |
| Video | 25 | Seedance(1.0 Lite †, 1.5 Pro, 2.0), Kling(1.6 Pro, 2.1 Pro †, 2.1 Master †, 2.5 Turbo Pro, 2.6 Pro, 3.0 Pro †, 3.0 Standard †), Veo(2 †, 3 †, 3 Fast, 3.1, 3.1 Fast, 3.1 Lite), Sora(2 †, 2 Pro †), Vidu(Q3, Q3 Turbo), MiniMax(H3, H3 Turbo ‡, H3 Ultra ‡), Flux(3, 3 Draft) |
| Music and sound | 5 | Suno(Music, Remix, Sounds, Sample), Seed Audio 1.0 |
| 3D meshes | 11 | Hunyuan 3D(2.0, 2.1, 3, 3 Sketch, 3.1 Pro, 3.1 Rapid, 3.1 Part, 3.1 Smart Topology), Tripo3D H3.1, Meshy 6, Rodin 2.5 Fast |
| Worlds and Gaussian splats | 5 | Marble(1.0, 1.0 Draft, 1.1, 1.1 Plus), TripoSplat |

카탈로그 주석은 이 목록이 `artcraft-services` 저장소의 `omni_gen` 설정(image_models.rs, video_models.rs, audio_models.rs, mesh_models.rs, splat_models.rs)에서 GenerationProvider::Artcraft 매핑만 옮긴 것이라고 밝힌다. 영상 25종 중 비활성(†)은 11종, 제한(‡)은 2종이다.

추가 provider 연동 계획으로 Kling, Google, Runway, Luma가 있고, OpenArt와 Freepik 같은 aggregator의 기존 구독을 지원하는 방안에도 관심을 표명한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README에 성능 수치나 벤치마크는 없다. 규모를 나타내는 정보는 모델 62종(이미지 16, 영상 25, 음악과 효과음 5, 3D mesh 11, world 5), 외부 provider 4곳, GitHub star 33,007개다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

ROADMAP.md는 2026년 목표를 네 영역으로 정리한다.

| 영역 | 목표 |
|---|---|
| Product | 모델 aggregation 웹사이트보다 더 유용해지기(1순위 목표), 장면과 영상을 점토처럼 빚고 정밀하게 연출하는 "tangible" 컴퓨팅 표면, 모든 모델과 provider 추가, scene relighting과 캐릭터 및 소품 reposing 같은 목적 특화 이미지 모델 개발 |
| Studio | 자체 콘텐츠 스튜디오 구축, 단편 다수와 연말까지 장편 AI 영화 1편 이상 제작(극장 배급과 소셜 미디어 콘텐츠), 페스티벌과 경연, 오프라인 모임과 상영회 |
| Architecture | ArtCraft 호스팅 서비스 의존 제거, Rust 비중 확대와 속도 개선, 코드 정리와 테스트, CI |
| Community | 부정적 분위기와 anti-AI 낙인이 없는 영화인과 아티스트 커뮤니티 |

"Loftier Goals"로는 open model, open platform, open hardware를 갖춘 "Open OpenAI / Google / Anthropic"을 만들겠다는 목표를 적는다.

README와 로드맵에서 확인되는 한계는 다음과 같다.

- 현재 아키텍처가 ArtCraft 호스팅 서비스에 의존한다. 로드맵이 이 의존 제거를 목표로 둔다.
- 카탈로그의 다수 영상 모델이 비활성이거나 제한 상태다.
- 안정 릴리스는 Windows와 macOS만 제공하고 Linux는 소스 빌드가 필요하다.
- 여러 기능 미리보기(scene blocking, canvas editing, relighting, inpainting)가 아직 준비 중이다.

## 6. 관련 연구 (Related Work)

- **Crafting Apps (getartcraft.com/apps)**: 같은 팀이 만드는 13종 오픈소스 Rust 창작 앱 계열로, CLI, JSON 제어 채널, MCP 서버로 에이전트가 조작할 수 있게 설계되어 있다.
- **artcraft-services**: 카탈로그 주석이 가리키는 서비스 측 저장소로, 모델 설정이 이곳에 있다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| crafting | README가 프롬프트 작성과 대비해 쓰는 말로, 시각 도구로 장면을 직접 구성해 반복 가능한 결과를 얻는 작업 방식 |
| Scene Blocking | 촬영 전 배우, 소품, 카메라 위치를 미리 정하는 영화 연출 용어. ArtCraft에서는 3D 장면 배치 기능 |
| Kitbashing | 기존 3D asset kit의 부품을 조합해 새 장면이나 모델을 만드는 기법 |
| Character Identity Transfer | 포즈를 잡은 마네킹을 가이드로 삼아 특정 캐릭터의 위치와 포즈를 생성 결과에 옮기는 기능 |
| Gaussian splat | 장면을 다수의 3D Gaussian으로 표현하는 3D 표현 방식. ArtCraft의 world 생성 결과 형식 |
| omni_gen | 서비스 측 저장소에서 이미지, 영상, 오디오, mesh, splat 모델을 정의하는 설정 모듈 |
