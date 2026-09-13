---
title: "OmniVoice: Towards Omnilingual Zero-Shot Text-to-Speech with Diffusion Language Models"
type: repo
year: 2026
category: llms
raw_path: raw/repos/k2-fsa-omnivoice.md
raw_filename: "k2-fsa-omnivoice.md"
source_collection: external
source: k2-fsa-omnivoice.md
org: "k2-fsa"
repo: "OmniVoice"
url: "https://github.com/k2-fsa/OmniVoice"
license: "Apache-2.0"
tags: [tts, voice-cloning, voice-design, diffusion, zero-shot, multilingual, k2-fsa, flashinfer]
---

## 요약

k2-fsa/OmniVoice는 600개 이상 언어를 지원하는 zero-shot text-to-speech(TTS) 모델이다. zero-shot TTS는 화자별로 별도 학습 없이 짧은 참조 음성만으로 그 화자의 목소리를 재현하는 방식을 뜻한다. OmniVoice는 diffusion language model 스타일의 새 아키텍처로 이 문제를 풀며, voice cloning(음성 복제)과 voice design(음성 설계) 두 생성 방식을 하나의 API로 제공한다.

이 저장소가 눈에 띄는 지점은 언어 커버리지와 속도 두 가지다. README는 600개 이상 언어 지원을 "zero-shot TTS 모델 중 가장 넓은 커버리지"라고 적고, 추론 속도는 RTF(real-time factor, 오디오 1초를 만드는 데 걸리는 처리 시간) 0.025로 실시간 대비 40배 빠르다고 적는다. 여기에 비언어적 표현(웃음소리 등)과 발음 교정을 텍스트에 인라인으로 삽입하는 세밀한 제어 기능, FlashInfer 커널을 적용한 2~2.9배 무손실 가속까지 갖췄다.

개발 조직 k2-fsa는 Kaldi 계열 음성 인식 툴킷인 k2, icefall, sherpa를 만들어 온 곳이다. OmniVoice의 저자 목록에는 Kaldi와 k2 프로젝트를 만든 Daniel Povey가 포함돼 있어, 이 모델이 음성 인식 도구 계보 위에서 나온 TTS 프로젝트임을 알 수 있다.

## 배경

TTS 연구는 최근 두 방향으로 발전해 왔다. 하나는 화자마다 모델을 새로 학습하지 않고 짧은 예시 음성만으로 목소리를 복제하는 zero-shot voice cloning이고, 다른 하나는 diffusion 기반 생성 모델을 오디오나 스펙트로그램 생성에 적용하는 흐름이다. diffusion model은 노이즈에서 시작해 여러 단계를 거쳐 점진적으로 목표 데이터를 복원하는 생성 방식으로, 원래 이미지 생성에서 널리 쓰였다. 이 wiki의 [[llms/rombach-2022-high-resolution-image-synthesis-with-latent]](Latent Diffusion)와 [[llms/peebles-2022-scalable-diffusion-models-with-transformers]](DiT)가 이 계열의 대표 이미지 생성 모델이다.

OmniVoice는 이 두 흐름을 언어 커버리지 문제와 결합한다. 기존 zero-shot TTS 모델 다수는 영어와 중국어를 비롯한 주요 언어 위주로 학습돼 있어, 저자원 언어로 갈수록 품질이 떨어지거나 아예 지원하지 않는 경우가 많다. OmniVoice는 600개 이상 언어를 지원한다고 명시해 이 격차를 언어 수 측면에서 크게 줄이려 한다.

README는 아키텍처를 "diffusion language model-style architecture"라고만 소개하고, 레이어 구성이나 파라미터 규모 같은 세부는 arXiv 2604.00688 논문 본문으로 넘긴다. 이 페이지는 README에 명시된 범위, 즉 사용법과 생성 모드, 성능 수치, 설치 방법을 다룬다. 아키텍처 내부 구조가 궁금하다면 원 논문을 확인해야 한다.

## 핵심 개념

diffusion step은 diffusion model이 노이즈에서 목표 오디오를 만들어내기까지 반복하는 갱신 횟수를 뜻한다. OmniVoice는 이 값을 `num_step`이라는 인자로 노출하며, 기본값은 32이고 16으로 줄이면 계산량이 줄어 더 빠르게 추론할 수 있다. 일반적으로 diffusion 계열 모델에서 step 수를 줄이면 속도와 품질이 trade-off 관계에 놓이는데, README는 OmniVoice가 이 trade-off에서 얼마나 품질을 유지하는지 구체적 수치로는 밝히지 않는다.

CFG(classifier-free guidance)는 diffusion model이 조건(이 경우 텍스트와 화자 정보)을 얼마나 강하게 따를지 조절하기 위해, 조건이 있는 예측과 조건이 없는 예측을 함께 계산해 결합하는 기법이다. README는 FlashInfer 가속을 설명하면서 "CFG cond/uncond pair"라는 표현으로 이 계산 구조를 언급한다. 즉 OmniVoice는 한 번의 생성마다 조건부와 무조건부 예측을 한 쌍으로 계산하고, FlashInfer는 이 쌍을 하나의 시퀀스로 묶어 처리량을 높인다.

RTF는 오디오 1초를 생성하는 데 걸리는 처리 시간(초)이다. RTF가 1보다 작으면 실시간보다 빠르게 생성한다는 뜻이고, 값이 작을수록 빠르다. OmniVoice의 FlashInfer 벤치마크에서 가장 낮은 RTF는 batch size 8에서 0.0115로, 오디오 1초를 만드는 데 약 11.5밀리초가 걸린다는 의미이며 약 87배속에 해당한다.

세 가지 생성 모드는 참조 정보의 유무로 구분된다. voice cloning은 참조 오디오와 그 전사문을 입력받아 해당 화자의 목소리를 재현하고, voice design은 참조 오디오 없이 성별, 나이, 억양 같은 speaker attribute를 텍스트로 지정해 화자를 만들어내며, auto voice는 아무 참조 정보 없이 모델이 화자를 자동으로 고른다. 세 모드는 동일한 `model.generate()` 함수를 공유하고 입력 인자만 다르다.

non-verbal 태그는 `[laughter]`처럼 대괄호로 감싼 인라인 지시어로, 웃음소리나 한숨 같은 비언어적 소리를 텍스트 흐름 안에 직접 삽입하는 문법이다. 발음 교정도 비슷한 인라인 방식을 쓰는데, 중국어는 한자 뒤에 pinyin과 성조 숫자를 붙이고 영어는 CMU 발음사전 표기를 대문자 대괄호로 감싼다.

## 방법

### 세 가지 생성 모드

| 모드 | 입력 | 특징 |
|---|---|---|
| Voice Cloning | `ref_audio`(3~10초 권장) + `ref_text`(생략 가능) | 가장 안정적인 모드. `ref_text`를 생략하면 Whisper ASR이 자동으로 전사한다 |
| Voice Design | `instruct` 문자열 | 참조 오디오 없이 성별, 나이, 음높이 등으로 화자를 지정한다. 중국어와 영어 데이터로만 학습됐다 |
| Auto Voice | 없음 | 모델이 화자를 자동으로 선택한다 |

Voice Cloning에서는 참조 오디오를 매번 새로 처리하는 대신, `model.create_voice_clone_prompt()`로 한 번만 인코딩해 `VoiceClonePrompt` 객체로 저장하고 이후 세션에서 `.load()`로 불러와 재사용할 수 있다. 이렇게 하면 오디오 로딩과 자동 전사 과정을 매번 반복하지 않아도 된다.

Voice Design이 지원하는 speaker attribute는 다음과 같다. 속성은 쉼표로 구분해 자유롭게 조합할 수 있다.

| 속성 | 값 범위 |
|---|---|
| gender | male, female |
| age | child부터 elderly까지 |
| pitch | very low부터 very high까지 |
| style | whisper |
| English accent | American, British 등 |
| Chinese dialect | 四川话, 陕西话 등 |

README는 Voice Design이 Voice Cloning보다 덜 안정적이라고 명시한다. 학습 데이터가 중국어와 영어에 한정돼 있어, 다른 언어로도 일반화되기는 하지만 저자원 언어나 경계 사례에서는 결과가 불안정할 수 있다.

### cross-lingual voice cloning의 억양

참조 오디오와 목표 발화가 서로 다른 언어인 경우를 cross-lingual voice cloning이라 부른다. 이 경우 생성된 음성은 참조 오디오가 속한 언어의 억양을 갖게 된다고 README는 명시한다. 표준 발음이 필요하다면 참조 오디오를 목표 발화와 같은 언어로 준비하는 편이 안전하다.

### 생성 파라미터

세 모드는 모두 `model.generate()`를 공유하며, 다음 키워드 인자로 생성 결과를 세부 조정한다.

| 파라미터 | 뜻 |
|---|---|
| `num_step` | diffusion step 수(기본 32, 16으로 줄이면 더 빠르다) |
| `speed` | 속도 배율(1.0보다 크면 빠르게, 작으면 느리게) |
| `duration` | 출력 길이를 초 단위로 고정(지정 시 `speed`보다 우선) |
| `normalize_text` | 아라비아 숫자를 단어로 정규화(opt-in, 추가 의존성 필요) |

`normalize_text=True`를 켜면 아라비아 숫자를 자릿수별로 읽는 대신 단어로 바꿔 읽는다. 예를 들어 "I have 2345 apples."는 자릿수별로 끊어 읽히지 않고 "two thousand three hundred forty-five"처럼 자연스럽게 읽힌다. 중국어와 영어는 WeTextProcessing으로, 그 외 언어의 정수는 num2words로 처리하며, `[laughter]`나 pinyin 성조 표기 같은 인라인 제어 문법은 정규화 과정에서 그대로 보존된다. 이 기능은 `pip install "omnivoice[tn]"`로 추가 의존성을 설치해야 활성화되고, macOS(Apple Silicon)에서는 `pynini` 패키지에 wheel이 없어 `conda install -c conda-forge pynini`로 먼저 설치해야 한다.

### 비언어적 표현과 발음 제어

인라인 태그와 표기법으로 세 가지를 제어한다.

| 종류 | 문법 | 예 |
|---|---|---|
| non-verbal 태그 | 대괄호로 감싼 태그명 | `[laughter]`, `[sigh]`, `[confirmation-en]`, `[question-en/ah/oh/ei/yi]`, `[surprise-ah/oh/wa/yo]`, `[dissatisfaction-hnn]` |
| 중국어 발음 교정 | 한자 뒤에 pinyin과 성조 숫자 | "打ZHE2出售"에서 打의 발음을 zhe 4성이 아닌 zhe 2성으로 교정 |
| 영어 발음 교정 | 대문자 CMU 발음사전 표기를 대괄호로 | `[B EY1 S]`는 악기 bass, `[B AE1 S]`는 물고기 bass로 서로 다르게 발음시킨다 |

영어 발음 교정 예시는 이 표기법의 필요성을 잘 보여준다. "bass"라는 철자는 악기(베이스, 발음 `beɪs`)와 물고기(발음 `bæs`)로 나뉘는데, 표준 텍스트만으로는 모델이 어느 발음인지 구분할 수 없다. CMU 발음사전 표기를 명시하면 이 모호성을 해소할 수 있다.

### 설치와 실행 환경

설치는 pip 또는 uv 중 하나를 고른다. pip 경로는 PyTorch를 먼저 설치한 뒤 OmniVoice 패키지를 설치하는 두 단계로 진행된다.

| 하드웨어 | PyTorch 설치 방법 |
|---|---|
| NVIDIA GPU | CUDA 버전에 맞는 PyTorch 빌드 지정 설치 |
| Apple Silicon | 표준 PyTorch 설치(`device_map="mps"` 사용) |
| Intel Arc GPU(XPU) | Intel wheel index에서 XPU 지원 빌드 설치 |

Intel Arc GPU는 `flash_attn`을 지원하지 않아 자동으로 SDPA(scaled dot-product attention)로 전환되고, packed sequence 학습(`flex_attention`)은 부분 지원에 그치며 단일 GPU SDPA 학습만 동작이 확인됐다. README는 Arc A310(4GB)과 Arc Pro B50(16GB) 두 모델에서 테스트했다고 적는다.

OmniVoice 패키지 자체는 PyPI에서 `pip install omnivoice`로, GitHub 최신 소스에서 `pip install git+https://github.com/k2-fsa/OmniVoice.git`로, 개발용으로는 클론 후 `pip install -e .`로 설치한다. uv를 쓰는 경우 클론 후 `uv sync`만으로 의존성을 맞춘다.

### 명령줄 도구

세 CLI 진입점이 Python API의 모든 기능을 명령줄 인자로 제공한다.

| 명령 | 역할 |
|---|---|
| `omnivoice-demo` | Gradio 기반 웹 데모 UI |
| `omnivoice-infer` | 단건 추론 |
| `omnivoice-infer-batch` | 다중 GPU 배치 추론 |

`omnivoice-infer-batch`는 대규모 TTS 작업을 위한 도구로, JSONL 형식의 test list를 입력받는다. 각 줄은 `id`와 `text`(필수), `ref_audio`와 `ref_text`(voice cloning용), `instruct`(voice design용), `language_id`, `duration`, `speed`(옵션) 필드를 담은 JSON 객체다. 참조 오디오나 instruct가 모두 없으면 무작위 화자로 생성하고, `duration`과 `speed`가 함께 주어지면 `duration`이 우선해 `speed`는 무시된다.

### FlashInfer 가속

[FlashInfer](https://github.com/flashinfer-ai/flashinfer)는 NVIDIA GPU 추론용 커널 라이브러리다. OmniVoice는 이를 적용해 추론을 2~2.9배 무손실로 가속하며, 적용 기법은 세 가지다.

- CFG cond/uncond 쌍을 하나의 sequence로 묶는 sequence packing
- RMSNorm, RoPE, GEMM을 하나로 합친 융합 커널
- 선택적으로 켤 수 있는 CUDA graph

설치는 CUDA 버전에 맞는 `flashinfer-python`과 `flashinfer-jit-cache` 패키지를 pip로 받는다. 배치 추론 CLI에서는 `--enable_flashinfer true` 플래그로, Python API에서는 `apply_flashinfer(model)` 함수 호출로 적용한다. CUDA graph까지 함께 켜려면 `apply_flashinfer(model, enable_cuda_graph=True)`를 쓴다. README는 CUDA graph를 batch size 1(저지연 단일 스트림) 시나리오에 권장하고, batch size 4 이상에서는 CUDA graph 없이도 일반 FlashInfer 경로가 이미 가장 빠른 구성이라고 적는다. 이는 CUDA graph의 이점이 커널 실행 오버헤드가 지배적인 소규모 배치에서 두드러지고, 배치가 커지면 그 이점이 상대적으로 작아지기 때문이다.

## 결과

FlashInfer 가속 벤치마크는 seed-tts zh testset(2,020개 샘플, 3.3시간 분량 오디오)을 대상으로 voice cloning 모드에서 측정됐다. 단일 H100 GPU, fp16, `num_step=32` 조건이며 출력은 ASR로 원본과 대조해 무손실임을 확인했다.

| batch size | baseline RTF | FlashInfer RTF | speedup |
|---|---|---|---|
| 1 | 0.0899 | 0.0430 | 2.1x |
| 1 + CUDA graph | 없음 | 0.0367 | 2.4x |
| 2 | 0.0480 | 0.0245 | 2.0x |
| 4 | 0.0331 | 0.0152 | 2.2x |
| 8 | 0.0298 | 0.0115 | 2.6x |

표에서 두 가지 경향이 보인다. 첫째, batch size가 커질수록 baseline과 FlashInfer 모두 RTF가 낮아진다. baseline은 batch 1의 0.0899에서 batch 8의 0.0298로, FlashInfer는 0.0430에서 0.0115로 각각 낮아졌다. 둘째, FlashInfer의 speedup 자체도 batch size가 커질수록 커져 batch 1의 2.1배에서 batch 8의 2.6배까지 올라간다. 이는 배치가 커질수록 sequence packing과 융합 커널의 효율이 함께 높아짐을 시사한다.

README 상단에는 이 벤치마크 표와 별도로 "RTF as low as 0.025(실시간 대비 40배 속도)"라는 수치가 나온다. 다만 이 값이 어떤 batch size와 하드웨어 조건에서 측정됐는지는 벤치마크 표에 명시된 조건과 별도로 밝혀져 있지 않아, 두 수치를 그대로 비교하기는 어렵다.

정확도나 자연스러움을 측정하는 음성 품질 지표, 예컨대 단어 오류율(WER), 평균 의견 점수(MOS), 화자 유사도 같은 수치는 README에 없다. 이런 지표는 arXiv 2604.00688 논문 본문에 있을 것으로 추정되지만 이번 수집 범위 밖이다.

## 한계

저자가 README에 명시한 제약은 다음과 같다.

- Voice Design은 중국어와 영어 데이터로만 학습돼, 다른 언어로 일반화되기는 하지만 저자원 언어나 경계 사례에서는 결과가 불안정할 수 있다.
- cross-lingual voice cloning에서는 생성 음성이 참조 오디오 언어의 억양을 갖게 된다.
- 아라비아 숫자는 자릿수별로 읽히는 문제가 있어, 이를 해결하려면 opt-in 옵션인 `normalize_text=True`와 추가 의존성 설치가 필요하다.
- HuggingFace 접속이 원활하지 않은 환경에서는 `HF_ENDPOINT` 환경변수로 미러를 지정해야 한다.
- 사용 disclaimer는 무단 voice cloning, 사칭, 사기 등 불법적이거나 비윤리적인 사용을 금지한다고 명시하며, 오용에 대한 책임은 개발자에게 없다고 적는다.

README만으로 확인할 수 없는 부분도 있다. 아키텍처의 파라미터 수, 레이어 구성, 학습 데이터의 규모와 출처는 README에 없다. 단어 오류율이나 화자 유사도 같은 정량 품질 지표도 없어, 이런 세부는 원 논문(arXiv 2604.00688)을 직접 확인해야 한다. Training & Evaluation 절 역시 `examples/` 디렉터리로 안내할 뿐 학습 레시피나 데이터 준비 과정을 README 안에 담고 있지 않다. 600개 이상이라는 지원 언어의 전체 목록도 `docs/languages.md`로 위임돼 있어 이번 수집 범위에는 포함되지 않았다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| zero-shot TTS | 화자별 재학습 없이 짧은 참조 음성만으로 그 화자의 목소리를 재현하는 text-to-speech 방식 |
| diffusion language model-style architecture | OmniVoice가 자칭하는 아키텍처 이름. diffusion 기반 생성 과정을 언어 모델과 유사하게 구조화한 것으로, 구체적 정의는 원 논문에 있다 |
| RTF(real-time factor) | 오디오 1초를 생성하는 데 걸리는 처리 시간(초). 1보다 작으면 실시간보다 빠르다 |
| num_step | 생성 시 반복하는 diffusion step 수. 값이 작을수록 빠르지만 품질과 trade-off 관계일 수 있다 |
| VoiceClonePrompt | 참조 오디오를 한 번 인코딩해 저장하고 재사용할 수 있게 만든 객체 |
| CFG(classifier-free guidance) | 조건부 예측과 무조건부 예측을 함께 계산해 결합함으로써 생성 결과가 조건을 얼마나 강하게 따를지 조절하는 기법 |

## 관련 페이지

- [[llms/rombach-2022-high-resolution-image-synthesis-with-latent]]: latent 공간에서 diffusion을 학습하는 이미지 생성 모델. OmniVoice가 속한 diffusion 계열의 대표 사례
- [[llms/peebles-2022-scalable-diffusion-models-with-transformers]]: U-Net 대신 Transformer를 diffusion backbone으로 쓴 DiT. OmniVoice의 "diffusion language model-style" 표현과 함께 diffusion과 언어 모델 아키텍처의 접점을 보여준다
- [[llms/nvlabs-eagle]]: 같은 저장소 유형(공식 모델 배포 repo)의 다른 사례로, model zoo와 채택 이력을 정리하는 방식을 비교해 볼 수 있다
- [[overviews/glossary-llms]]: pre-training, fine-tuning 등 이 페이지가 전제하는 모델 학습 일반 용어의 canonical 표기
