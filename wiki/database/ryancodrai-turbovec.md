---
title: "turbovec: Google TurboQuant for vector search (Rust + Python)"
type: repo
year: 2026
category: database
source: ryancodrai-turbovec.md
raw_path: raw/repos/ryancodrai-turbovec.md
raw_filename: "ryancodrai-turbovec.md"
source_collection: external
org: "RyanCodrai"
repo: "turbovec"
url: "https://github.com/RyanCodrai/turbovec"
license: "MIT"
tags: [turbovec, turboquant, vector-quantization, faiss, vector-index, rust, python, simd, rag, data-oblivious, repo]
figures:
  - id: fig01
    file: assets/ryancodrai-turbovec/recall_d1536.svg
    raw: raw/repos/ryancodrai-turbovec/docs/recall_d1536.svg
    caption: "회복률 비교 — TurboQuant vs FAISS IndexPQ, OpenAI d=1536"
    strategy: manual
    curated: true
  - id: fig02
    file: assets/ryancodrai-turbovec/compression.svg
    raw: raw/repos/ryancodrai-turbovec/docs/compression.svg
    caption: "압축률 — float32 대비 2/4비트 양자화 크기"
    strategy: manual
    curated: true
  - id: fig03
    file: assets/ryancodrai-turbovec/arm_speed_mt.svg
    raw: raw/repos/ryancodrai-turbovec/docs/arm_speed_mt.svg
    caption: "ARM(M3 Max) 멀티스레드 검색 속도 — FAISS FastScan 대비"
    strategy: manual
    curated: true
  - id: fig04
    file: assets/ryancodrai-turbovec/x86_speed_mt.svg
    raw: raw/repos/ryancodrai-turbovec/docs/x86_speed_mt.svg
    caption: "x86 멀티스레드 검색 속도"
    strategy: manual
    curated: false
  - id: fig05
    file: assets/ryancodrai-turbovec/recall_glove.svg
    raw: raw/repos/ryancodrai-turbovec/docs/recall_glove.svg
    caption: "회복률 — GloVe d=200 (저차원 약세)"
    strategy: manual
    curated: false
  - id: fig06
    file: assets/ryancodrai-turbovec/recall_d3072.svg
    raw: raw/repos/ryancodrai-turbovec/docs/recall_d3072.svg
    caption: "회복률 — OpenAI d=3072"
    strategy: manual
    curated: false
  - id: fig07
    file: assets/ryancodrai-turbovec/header.png
    raw: raw/repos/ryancodrai-turbovec/docs/header.png
    caption: "프로젝트 헤더 배너"
    strategy: manual
    curated: false
---

## 요약 (Summary)

turbovec은 Ryan Codrai가 만든 OSS 벡터 인덱스로, Google Research의 **TurboQuant**(arXiv 2504.19874, ICLR 2026)을 Rust 코어와 Python 바인딩으로 구현했다. 내세우는 한 문장은 분명하다. "10M 문서 코퍼스가 float32로는 31GB지만 turbovec은 4GB에 담고, 그러면서 FAISS보다 빨리 검색한다."

비결은 TurboQuant의 **data-oblivious 양자화**다. FAISS의 PQ는 데이터에서 코드북을 학습하지만, TurboQuant은 무작위 직교 회전으로 좌표 분포를 미리 알려진 Beta 분포로 강제한다. 분포를 알면 버킷을 수학으로 미리 정할 수 있으니 코드북 학습도, 별도 train 단계도 필요 없다. add하면 곧 색인되는 온라인 ingest가 가능하고, 코퍼스가 커져도 재빌드가 없다.

속도는 손으로 짠 SIMD 커널이 책임진다. ARM은 NEON, x86은 AVX-512BW(미지원 CPU는 AVX2 폴백)로, FAISS IndexPQFastScan을 ARM에서 12~20% 앞서고 x86에서는 동등하거나 앞선다. 버전은 Python 0.7.0 / Rust crate 0.8.0(2026-05-30), 라이선스는 MIT다.

## 주요 기여 (Key Contributions)

- **TurboQuant의 프로덕션급 Rust 구현** — train 단계·파라미터 튜닝·재빌드 없는 온라인 ingest.
- **FAISS보다 빠른 SIMD 커널** — ARM NEON / x86 AVX-512BW(+AVX2 폴백), nibble-split LUT. x86 커널은 FAISS FastScan의 pack 레이아웃·u16 누산 전략을 차용했다.
- **검색 시점 필터링** — `IdMapIndex.search(allowlist=...)` 또는 `TurboQuantIndex.search(mask=...)`. 32-벡터 블록 단위로 커널 안에서 필터를 적용해, 허용 슬롯이 없는 블록은 LUT 조회 전에 건너뛴다. 선택적 필터에서도 over-fetch나 recall 손실 없이 `min(k, len(allowed))`개를 보장한다.
- **두 인덱스 타입** — 위치 기반 `TurboQuantIndex`(O(1) `swap_remove`)와 안정 외부 u64 ID를 얹은 `IdMapIndex`(O(1) `remove`, FAISS `IndexIDMap2` 대응).
- **TQ+ 좌표별 보정(논문 외 자체 확장)** — 유한 차원에서 좌표가 Beta 정준 분포를 벗어나는 문제를, 첫 add 때 좌표마다 shift·scale를 적합해 잡는다. 이후 고정·재사용하며, 가장 많이 어긋나는 셀에서 R@1을 최대 +1.4pp 끌어올린다.
- **길이 재정규화 점수(RaBitQ에서 차용)** — 인코딩 때 `||v|| / ⟨u, x̂⟩`을 저장해 검색 커널이 점수에 곱한다. 양자화가 만드는 내적 하향 편향을 검색 비용 0·추가 저장 0으로 제거한다.
- **RAG 프레임워크 드롭인 어댑터 4종** — LangChain·LlamaIndex·Haystack·Agno의 인메모리 store를 같은 인터페이스로 대체한다(내부적으로 모두 `IdMapIndex` 사용).
- **순수 로컬** — 관리형 서비스도, 외부 전송도 없다. OSS 임베딩 모델과 묶으면 완전 air-gapped RAG가 된다.

## 방법론 및 아키텍처 (Methodology and Architecture)

README의 "How it works" 6단계가 전부를 설명한다.

1. **정규화** — 각 벡터의 norm을 float 하나로 떼어내, 본체를 초구 위 단위 방향으로 만든다.
2. **무작위 회전** — 모든 벡터에 같은 무작위 직교 행렬을 곱한다. 회전 뒤에는 입력이 무엇이든 각 좌표가 Beta 분포(고차원에서 N(0, 1/d)에 수렴)를 따른다.
3. **TQ+ 좌표별 보정** — Beta는 점근 분포라 차원이 유한하거나 저비트·워드벡터형 임베딩에서는 좌표가 어긋난다. 첫 add 때 각 좌표의 5/95% 분위수를 정준 Beta에 맞추는 shift·scale를 적합하고, 그 뒤로는 고정한다.
4. **Lloyd-Max 스칼라 양자화** — 분포를 아니까 버킷 경계·중심을 데이터 없이 미리 계산한다(2비트 4버킷, 4비트 16버킷, MSE 최소).
5. **비트 패킹** — 좌표를 작은 정수로 만들어 바이트에 빽빽이 채운다. d=1536이 6,144바이트에서 384바이트로, 16배 줄어든다.
6. **길이 재정규화 점수** — 양자화는 내적을 체계적으로 깎으므로, 벡터별 보정 스칼라를 검색 커널에서 곱해 무편향으로 되돌린다.

![[assets/ryancodrai-turbovec/compression.svg]]
*Figure: 압축률 — float32 대비 2/4비트 양자화 (turbovec docs/compression.svg)*

검색은 DB 벡터를 일일이 복원하지 않는다. 쿼리만 같은 회전 도메인으로 옮긴 뒤 코드북 값에 직접 점수를 매긴다. 파일 포맷은 두 가지로, `.tv`(9바이트 헤더 + packed codes + norms)와 `.tvim`("TVIM" 매직 + core payload + slot→id 테이블)이다. 로드 시 id→slot 역맵을 메모리에서 다시 만들고, 중복 id는 손상으로 거부한다.

## 결과 (Results)

비교 기준은 FAISS `IndexPQ`(LUT256, nbits=8, float32 LUT)로, 논문 4.4절 기준선보다 강한 프로덕션급 baseline이다. 조건은 100K 벡터·k=64이며 속도는 1K 쿼리·5회 중앙값이다.

- **회복률** — OpenAI d=1536·d=3072에서 2·4비트 모두 R@1 기준 FAISS 대비 0.4~3.4점 우위, k=4에서 양쪽 1.0으로 수렴한다. GloVe d=200은 어려운 영역이라 4비트 +0.3점, 2비트 −1.2점이고 k≈16에서 FAISS에 근접한다.
- **압축** — d=1536에서 2비트 16배, 4비트 8배. 10M 코퍼스 31GB → 4GB.
- **속도(ARM, M3 Max)** — 전 설정에서 FAISS FastScan보다 12~20% 빠르다.
- **속도(x86, Xeon Sapphire Rapids, 8 vCPU)** — 4비트 전 설정 1~6% 우위, 2비트 ST는 FAISS ±1%. 2비트 MT(d=1536·d=3072)만 2~4% 뒤지는데, 누산 루프가 짧아 unrolling 이득이 AVX-512 VBMI 경로를 못 따라가는 구간이다.
- **이론 한계** — Lloyd-Max 코드북 왜곡은 정보이론 하한(Shannon 왜곡-율)의 약 2.7배 이내이고, 길이 재정규화가 남은 편향을 없앤다.

![[assets/ryancodrai-turbovec/recall_d1536.svg]]
*Figure: 회복률 d=1536 — TurboQuant vs FAISS IndexPQ (turbovec docs/recall_d1536.svg)*

![[assets/ryancodrai-turbovec/arm_speed_mt.svg]]
*Figure: ARM(M3 Max) 멀티스레드 검색 속도 — FAISS FastScan 대비 (turbovec docs/arm_speed_mt.svg)*

## 한계 (Limitations)

- **MMR 미지원** — 어댑터의 `max_marginal_relevance_search`는 `NotImplementedError`다. MMR은 후보의 full-precision 임베딩이 필요한데, turbovec은 양자화 뒤 원본을 버린다. 필요하면 원본 임베딩 저장소를 따로 둬야 한다.
- **임베딩 비복원** — 검색은 text·metadata만 돌려주고 원본 임베딩은 복구할 수 없다.
- **저차원 회복률** — GloVe d=200 2비트에서 FAISS에 뒤진다. Beta 점근 가정의 본질적 한계다.
- **metadata 제약** — JSON 직렬화 가능한 값만 저장된다(커스텀 객체·set 등은 저장 시 실패).
- **품질 이력** — 0.7.0/0.8.0은 audit 기반 정정 릴리스로, 14개 활성 버그를 고쳤다(NaN/Inf 입력이 인덱스를 조용히 오염시키던 문제, AVX-512/AVX2 미지원 x86에서 빈 top-k를 반환하던 폴백 누락 등). on-disk 포맷은 `.tv`/`.tvim` v3로 그대로다.

## 관련 페이지 (Related Pages)

- [[database/9bow-2026-turbovec-turboquant-rust-vector-index]] — 이 저장소를 다룬 PyTorchKR 한국어 소개글(9bow, 2026-05-21).
- [[database/shanbhogue-2026-gemini-embedding-2-native-multimodal]] · [[database/zhang-2026-your-embedding-model-is-smarter]] — turbovec이 인덱싱할 임베딩을 만드는 쪽. turbovec은 임베딩 모델과 무관하게 어떤 벡터든 받는다.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] · [[database/vectifyai-pageindex]] — embedding/index 자체를 버리는 vectorless 진영. dense ANN을 극한까지 압축하는 turbovec과 대척점에 있어 비교 가치가 크다.
- **원 논문 TurboQuant**(arXiv 2504.19874) — `raw/papers/zandieh-2025-turboquant-online-vector-quantization-with.pdf`에 PDF가 보관되어 있으나 아직 wiki 페이지는 없다.
