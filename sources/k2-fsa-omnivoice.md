---
title: "OmniVoice: Towards Omnilingual Zero-Shot Text-to-Speech with Diffusion Language Models"
type: repo
year: 2026
category: llms
raw_path: raw/repos/k2-fsa-omnivoice.md
raw_filename: "k2-fsa-omnivoice.md"
source_collection: external
org: "k2-fsa"
repo: "OmniVoice"
url: "https://github.com/k2-fsa/OmniVoice"
license: "Apache-2.0"
tags: [tts, voice-cloning, voice-design, diffusion, zero-shot, multilingual, k2-fsa, flashinfer]
figures:
  - id: fig01
    label: OmniVoice logo
    kind: figure
    file: assets/k2-fsa-omnivoice/fig01.png
    raw: https://zhu-han.github.io/omnivoice/pics/omnivoice.jpg
    caption: "README 상단의 OmniVoice 로고 (장식용)"
    strategy: manual
    curated: false
  - id: fig02
    label: Wechat Group QR
    kind: figure
    file: assets/k2-fsa-omnivoice/fig02.png
    raw: https://k2-fsa.org/zh-CN/assets/pic/wechat_group.jpg
    caption: "위챗 그룹 참여용 QR 코드"
    strategy: manual
    curated: false
  - id: fig03
    label: Wechat Official Account QR
    kind: figure
    file: assets/k2-fsa-omnivoice/fig03.png
    raw: https://k2-fsa.org/zh-CN/assets/pic/wechat_account.jpg
    caption: "위챗 공식 계정 팔로우용 QR 코드"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

k2-fsa/OmniVoice는 600개 이상 언어를 지원하는 zero-shot text-to-speech(TTS) 모델로, diffusion language model 스타일 아키텍처로 voice cloning과 voice design을 수행하며 RTF 0.025(실시간 대비 40배 속도)의 추론 속도를 낸다.

## 1. 자료 정보 (Document Information)

- 저장소: <https://github.com/k2-fsa/OmniVoice> (org k2-fsa, repo OmniVoice)
- 수집 범위: 루트 `README.md` 전문 (2026-09-14 수집). `docs/`, `examples/` 하위 문서와 arXiv 논문 본문(2604.00688)은 수집하지 않았다.
- 라이선스: GitHub API 조회 결과 Apache-2.0. README 본문에는 별도 License 절이 없다.
- 관련 기술 보고서: arXiv 2604.00688 (Zhu et al., 2026). 이 wiki에는 별도 paper 자료로 수집돼 있지 않다.
- k2-fsa는 Kaldi 계열 음성 인식 툴킷(k2, icefall, sherpa)을 개발해 온 조직이며, OmniVoice는 이 조직이 낸 TTS 모델이다.
- 배포처: HuggingFace 모델(`k2-fsa/OmniVoice`)과 Space, GitHub.io 데모 페이지, Google Colab 노트북.

## 2. 주요 기여 (Key Contributions)

1. 600개 이상 언어를 지원하는 zero-shot TTS 모델을 공개했다. README는 이를 "zero-shot TTS 모델 중 가장 넓은 언어 커버리지"라고 적는다.
2. diffusion language model 스타일의 새 아키텍처를 제안했다. README는 이 구조가 "clean, streamlined, and scalable"하며 품질과 속도를 동시에 달성한다고 적는다.
3. 하나의 `generate()` API로 voice cloning, voice design, auto voice 세 가지 생성 모드를 지원한다. 세 모드는 CLI 도구에서도 동일하게 제공된다.
4. 비언어적 표현과 발음 교정을 인라인 텍스트 태그로 제어하는 기능을 넣었다. `[laughter]` 같은 non-verbal 태그, 중국어 pinyin 성조 숫자, 영어 CMU 발음사전 표기를 지원한다.
5. FlashInfer 커널 적용으로 추론 속도를 2~2.9배 무손실로 높였다. sequence packing, 융합 RMSNorm/RoPE/GEMM 커널, 선택적 CUDA graph를 적용한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 아키텍처 개요

README는 OmniVoice를 "diffusion language model-style architecture"로 부른다. 세부 구조(레이어 수, 파라미터 수, 학습 데이터)는 README에 없고 arXiv 2604.00688 논문 본문에 있을 것으로 추정되나 이번 수집 범위 밖이다. README에서 확인 가능한 아키텍처 관련 단서는 다음과 같다.

- 출력은 24kHz 샘플링레이트의 오디오(`np.ndarray`, shape `(T,)`)다.
- 생성은 `num_step`으로 조절하는 diffusion step을 반복하는 과정이며, 기본값 32에서 16으로 줄이면 더 빠르게 추론할 수 있다.
- 추론 시 classifier-free guidance(CFG)로 보이는 cond/uncond 쌍 연산이 있다. FlashInfer 절이 "sequence packing for the CFG cond/uncond pair"라고 언급한다.
- ASR(Whisper)을 보조 모듈로 내장해 `ref_text`를 생략하면 자동으로 참조 오디오를 전사한다.

### 3.2 세 가지 생성 모드

| 모드 | 입력 | 설명 |
|---|---|---|
| Voice Cloning | `ref_audio`(3~10초 권장) + `ref_text`(생략 가능, Whisper 자동 전사) | 참조 음성의 화자를 zero-shot으로 복제한다. README는 "가장 안정적인 모드"라고 적는다 |
| Voice Design | `instruct` 문자열 (예: `"female, low pitch, british accent"`) | 화자를 직접 묘사해 음성을 생성한다. 참조 오디오가 필요 없다 |
| Auto Voice | 없음 (text만) | 모델이 화자를 자동으로 선택한다 |

Voice Cloning의 참조 음성을 반복 사용할 때는 `model.create_voice_clone_prompt()`로 한 번 인코딩한 뒤 `.save()`로 저장하고, 다음 세션에서 `VoiceClonePrompt.load()`로 불러와 오디오 로딩과 자동 전사 과정을 건너뛸 수 있다.

Voice Design이 지원하는 speaker attribute는 다음과 같다.

| 속성 | 값 범위 |
|---|---|
| gender | male, female |
| age | child ~ elderly |
| pitch | very low ~ very high |
| style | whisper |
| English accent | American, British 등 |
| Chinese dialect | 四川话, 陕西话 등 |

속성은 쉼표로 구분해 자유롭게 조합한다. README는 Voice Design이 중국어와 영어 데이터로만 학습돼 다른 언어에서는 일반화되지만 저자원 언어나 edge case에서 불안정할 수 있다고 명시한다.

### 3.3 생성 파라미터

세 모드는 모두 `model.generate()`를 공유하며 다음 키워드 인자로 세부를 제어한다.

| 파라미터 | 뜻 |
|---|---|
| `num_step` | diffusion step 수(기본 32, 16으로 줄이면 더 빠름) |
| `speed` | 속도 배율 (1.0보다 크면 빠르게, 작으면 느리게) |
| `duration` | 출력 길이를 초 단위로 고정 (지정 시 `speed`보다 우선) |
| `normalize_text` | 아라비아 숫자를 단어로 정규화 (opt-in, `omnivoice[tn]` extra 필요) |

`normalize_text=True`는 중국어와 영어는 WeTextProcessing, 그 외 언어의 정수는 `num2words`로 처리하며, `[laughter]`나 pinyin 성조 표기 같은 인라인 제어 문법은 그대로 보존한다. macOS(Apple Silicon)에서는 `pynini`에 wheel이 없어 `conda install -c conda-forge pynini`로 먼저 설치해야 한다.

### 3.4 비언어적 표현과 발음 제어

텍스트에 인라인 태그를 삽입해 표현을 제어한다.

| 종류 | 문법 | 예 |
|---|---|---|
| non-verbal 태그 | `[태그명]` | `[laughter]`, `[sigh]`, `[confirmation-en]`, `[question-en/ah/oh/ei/yi]`, `[surprise-ah/oh/wa/yo]`, `[dissatisfaction-hnn]` |
| 중국어 발음 교정 | 한자 뒤에 pinyin + 성조 숫자 | "打ZHE2出售" |
| 영어 발음 교정 | 대문자 CMU 발음사전 표기를 대괄호로 | `[B EY1 S]` (bass를 악기로 발음) vs `[B AE1 S]` (bass를 물고기로 발음) |

### 3.5 설치와 실행 환경

설치는 pip 또는 uv 중 하나를 고른다. pip 경로는 PyTorch를 먼저 설치(NVIDIA GPU, Apple Silicon, Intel Arc XPU 세 가지로 안내)한 뒤 `pip install omnivoice`(PyPI), `pip install git+...`(GitHub 최신), 또는 `pip install -e .`(개발용 editable) 중 하나로 OmniVoice를 설치한다. uv 경로는 `git clone` 후 `uv sync`다.

Intel Arc GPU(XPU) 지원 세부:

- `flash_attn`은 XPU에서 지원되지 않아 자동으로 SDPA로 폴백한다.
- packed sequence 학습(`flex_attention`)은 부분 지원이며 단일 GPU SDPA 학습은 동작한다.
- Arc A310(Alchemist, 4GB)과 Arc Pro B50(Battlemage, 16GB)에서 테스트했다.

### 3.6 CLI 도구 세 가지

| 명령 | 역할 | 소스 |
|---|---|---|
| `omnivoice-demo` | Gradio 웹 데모 | `omnivoice/cli/demo.py` |
| `omnivoice-infer` | 단건 추론 | `omnivoice/cli/infer.py` |
| `omnivoice-infer-batch` | 다중 GPU 배치 추론 | `omnivoice/cli/infer_batch.py` |

`omnivoice-infer-batch`는 JSONL 형식의 test list를 입력받는다. 각 줄은 `id`, `text`(필수), `ref_audio`, `ref_text`(voice cloning용), `instruct`(voice design용), `language_id`, `duration`, `speed`(옵션) 필드를 가진 JSON 객체다. 참조 오디오나 instruct가 없으면 무작위 음성으로 생성한다. `duration`과 `speed`가 함께 주어지면 `speed`는 무시된다.

### 3.7 FlashInfer 가속

[FlashInfer](https://github.com/flashinfer-ai/flashinfer) 커널로 NVIDIA GPU 추론을 2~2.9배 무손실로 가속한다. 적용 기법은 CFG cond/uncond 쌍의 sequence packing, 융합 RMSNorm/RoPE/GEMM 커널, 선택적 CUDA graph다. 설치는 `flashinfer-python`과 CUDA 버전에 맞는 `flashinfer-jit-cache`를 pip로 받는다. batch inference CLI에는 `--enable_flashinfer true` 플래그를, Python API에는 `apply_flashinfer(model)` 또는 CUDA graph를 함께 쓰는 `apply_flashinfer(model, enable_cuda_graph=True)`를 쓴다. README는 CUDA graph를 batch=1(저지연) 시나리오에 권장하고, batch 4 이상에서는 일반 FlashInfer 경로가 이미 가장 빠르다고 적는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

FlashInfer 가속 벤치마크(seed-tts zh testset, 2,020개 샘플, 3.3시간 분량 오디오, voice cloning, 단일 H100, fp16, `num_step=32`, `omnivoice-infer-batch`가 보고하는 평균 RTF, 출력은 ASR로 무손실 검증):

| batch size | baseline RTF | FlashInfer RTF | speedup |
|---|---|---|---|
| 1 | 0.0899 | 0.0430 | 2.1x |
| 1 + CUDA graph | 없음 | 0.0367 | 2.4x |
| 2 | 0.0480 | 0.0245 | 2.0x |
| 4 | 0.0331 | 0.0152 | 2.2x |
| 8 | 0.0298 | 0.0115 | 2.6x |

RTF(real-time factor)는 오디오 1초를 생성하는 데 걸리는 처리 시간(초)이다. 값이 작을수록 빠르며 1보다 작으면 실시간보다 빠르다는 뜻이다. batch 8에서 FlashInfer는 0.0115로 가장 낮은 RTF(약 87배속)를 기록했다.

README 상단은 별도로 "RTF as low as 0.025 (40x faster than real-time)"이라는 수치를 적는데, 이 값이 어떤 batch size와 하드웨어 조건에서 나왔는지는 FlashInfer 벤치마크 표와 별도로 명시돼 있지 않다.

정확도나 자연스러움을 재는 음성 품질 지표(WER, MOS, speaker similarity 등)는 README에 없다. 이런 지표는 arXiv 2604.00688 논문 본문에 있을 것으로 추정된다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자가 README에 명시한 제약:

- Voice Design은 중국어와 영어 데이터로만 학습됐다. 다른 언어로 일반화되지만 저자원 언어나 edge case에서는 불안정한 결과를 낼 수 있다.
- 참조 오디오와 목표 발화가 다른 언어인 cross-lingual voice cloning에서는 생성 음성이 참조 오디오 언어의 억양을 갖게 된다.
- 아라비아 숫자는 자릿수별로 읽히는 문제가 있어 `normalize_text=True` 옵션(opt-in, 추가 의존성 필요)으로 보완해야 한다.
- HuggingFace 접속이 원활하지 않은 환경에서는 `HF_ENDPOINT` 환경변수로 미러를 지정해야 한다.
- 사용 disclaimer: 무단 voice cloning, 사칭, 사기 등 불법적이거나 비윤리적인 사용을 금지한다고 명시하며, 오용에 대한 책임은 개발자에게 없다고 적는다.

README로 확인할 수 없는 것:

- 아키텍처의 파라미터 수, 레이어 구성, 학습 데이터 규모와 출처는 README에 없다.
- 정량 품질 지표(WER, MOS, speaker similarity 등)가 없다. arXiv 논문 본문 확인이 필요하다.
- Training & Evaluation 절은 `examples/` 디렉터리로만 안내하며, 학습 레시피나 데이터 준비 세부는 README에 없다.
- 다국어 목록 600개 이상의 전체 목록은 `docs/languages.md`로 위임돼 있어 이번 수집 범위에는 없다.

## 6. 관련 연구 (Related Work)

README Citation 절:

| bibtex key | 제목 | 발표 형태 | 저자 수 | 1저자 |
|---|---|---|---|---|
| zhu2026omnivoice | OmniVoice: Towards Omnilingual Zero-Shot Text-to-Speech with Diffusion Language Models | arXiv 2604.00688 (2026) | 10 | Han Zhu |

저자 목록은 Han Zhu, Lingxuan Ye, Wei Kang, Zengwei Yao, Liyong Guo, Fangjun Kuang, Zhifeng Han, Weiji Zhuang, Long Lin, Daniel Povey다. Daniel Povey는 Kaldi와 k2 프로젝트의 창시자 중 한 명으로, k2-fsa 조직의 다른 음성 인식 도구(icefall, sherpa)와의 계보를 시사한다.

README가 명시적으로 인용하거나 의존을 언급한 외부 프로젝트:

| 프로젝트 | 역할 |
|---|---|
| Whisper | ref_text 자동 전사(ASR) |
| WeTextProcessing | 중국어/영어 숫자 정규화 |
| num2words | 그 외 언어의 정수 정규화 |
| FlashInfer | 추론 가속 커널 |
| CMU Pronouncing Dictionary | 영어 발음 교정 표기 체계 |

이 wiki에 현재 k2-fsa 조직의 다른 저장소나 arXiv 2604.00688 논문 자료는 없다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| diffusion language model-style architecture | OmniVoice가 자칭하는 아키텍처 이름. diffusion 기반 생성 과정을 언어 모델과 유사한 방식으로 구조화한 것으로 보이나, README는 구체적 정의를 논문(arXiv 2604.00688)으로 넘긴다 |
| voice cloning | 짧은 참조 오디오로 화자의 목소리를 zero-shot 복제하는 생성 모드 |
| voice design | 참조 오디오 없이 gender, age, pitch 등 speaker attribute 문자열로 화자를 지정하는 생성 모드 |
| RTF (real-time factor) | 오디오 1초를 만드는 데 걸리는 처리 시간(초). 1보다 작으면 실시간보다 빠르다 |
| num_step | 생성 시 반복하는 diffusion step 수. 값이 작을수록 빠르지만 품질과 trade-off 관계일 수 있다 |
| VoiceClonePrompt | 참조 오디오를 한 번 인코딩해 저장, 재사용할 수 있게 만든 객체 |

## 8. 그림 후보 (Figure Candidates)

repo 유형이라 이미지를 자동으로 내려받지 않는다. README에 등장하는 이미지 3개는 모두 외부 호스팅 URL(GitHub 저장소 내부 경로가 아님)이며, 아키텍처 도식이나 벤치마크 그래프가 아니라 로고와 QR 코드다. 세 항목 모두 `curated: false`로 남긴다.

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | README 상단의 OmniVoice 로고 (장식용) | manual | (장식용, 불필요) |
| fig02 | 위챗 그룹 참여용 QR 코드 | manual | (불필요, 정보성 도식 아님) |
| fig03 | 위챗 공식 계정 팔로우용 QR 코드 | manual | (불필요, 정보성 도식 아님) |
