---
title: "turbovec: Google TurboQuant for vector search (Rust + Python)"
type: repo
year: 2026
category: database
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
    caption: "회복률 비교 — TurboQuant vs FAISS IndexPQ, OpenAI d=1536 (2/4비트, k별)"
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
    caption: "x86(Xeon Sapphire Rapids) 멀티스레드 검색 속도 — FAISS 대비"
    strategy: manual
    curated: false
  - id: fig05
    file: assets/ryancodrai-turbovec/recall_glove.svg
    raw: raw/repos/ryancodrai-turbovec/docs/recall_glove.svg
    caption: "회복률 비교 — GloVe d=200(저차원, 어려운 영역)"
    strategy: manual
    curated: false
  - id: fig06
    file: assets/ryancodrai-turbovec/recall_d3072.svg
    raw: raw/repos/ryancodrai-turbovec/docs/recall_d3072.svg
    caption: "회복률 비교 — OpenAI d=3072"
    strategy: manual
    curated: false
  - id: fig07
    file: assets/ryancodrai-turbovec/header.png
    raw: raw/repos/ryancodrai-turbovec/docs/header.png
    caption: "프로젝트 헤더 배너"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

Ryan Codrai의 OSS 벡터 인덱스로, Google Research의 **TurboQuant**(arXiv 2504.19874, ICLR 2026)을 Rust 코어 + Python 바인딩으로 구현했다. TurboQuant은 코드북 학습도, 별도 train 단계도 없는 **data-oblivious 양자화**로, Shannon 왜곡-율 하한에 근접한다(Lloyd-Max 코드북이 하한의 약 2.7배 이내). 표어는 "10M 문서 코퍼스가 float32로는 31GB지만 turbovec은 4GB에 담고 FAISS보다 빨리 검색한다". 손으로 짠 SIMD 커널(ARM NEON, x86 AVX-512BW + AVX2 폴백)이 FAISS IndexPQFastScan을 ARM에서 12~20% 앞서고 x86에서는 동등하거나 앞선다. 두 인덱스 타입(`TurboQuantIndex` 위치 기반, `IdMapIndex` 안정 외부 ID)과 검색 시점 필터링(allowlist/mask)을 제공하며, LangChain·LlamaIndex·Haystack·Agno 드롭인 어댑터까지 갖췄다. 논문에 없는 자체 확장으로 **TQ+**(좌표별 보정)를 추가했다. 버전: Python 0.7.0 / Rust crate 0.8.0(2026-05-30), MIT.

## 1. 자료 정보 (Document Information)

- **저장소**: RyanCodrai/turbovec — https://github.com/RyanCodrai/turbovec
- **언어**: Rust(코어) + Python(maturin 바인딩); x86 빌드는 `x86-64-v3`(AVX2 기준, Haswell 2013+) 타깃
- **배포**: PyPI `turbovec`, crates.io `turbovec` (두 버전은 독립적으로 매김)
- **라이선스**: MIT (Copyright © 2026 Ryan Codrai)
- **현재 버전**: turbovec 0.7.0(Python) / 0.8.0(Rust crate), 2026-05-30
- **구현 대상**: TurboQuant (arXiv 2504.19874, ICLR 2026) — 본 ai-wiki `raw/papers/zandieh-2025-turboquant-...pdf`에 원본 보관
- **워크스페이스 구성**: `turbovec/`(Rust 코어), `turbovec-python/`(PyO3 바인딩), `benchmarks/`, `docs/`(api·integrations·차트 SVG)

## 2. 주요 기여 (Key Contributions)

1. **TurboQuant의 프로덕션급 Rust 구현**: 온라인 ingest(add하면 곧 색인, train 단계·파라미터 튜닝·재빌드 없음). 코퍼스가 커져도 재학습이 필요 없다.
2. **FAISS보다 빠른 SIMD 커널**: ARM NEON / x86 AVX-512BW(미지원 시 AVX2 폴백). nibble-split LUT로 처리량 최적화. FAISS FastScan의 pack 레이아웃·u16 누산 전략을 x86 커널에 차용.
3. **검색 시점 필터링(hybrid retrieval)**: `IdMapIndex.search(allowlist=...)` 또는 `TurboQuantIndex.search(mask=...)`. 32-벡터 블록 단위로 SIMD 커널 안에서 필터를 적용해, 허용 슬롯이 없는 블록은 LUT 조회 전에 short-circuit. 선택적 필터에서도 over-fetch나 recall 손실 없이 `min(k, len(allowed))`개를 보장.
4. **두 인덱스 타입**: `TurboQuantIndex`(위치 기반, O(1) `swap_remove`) / `IdMapIndex`(해시테이블 기반 안정 u64 외부 ID, O(1) `remove`). FAISS의 `IndexIDMap2`에 대응.
5. **TQ+ 좌표별 보정(논문 외 확장)**: 유한 차원에서 좌표가 Beta 정준 분포에서 어긋나는 문제를, 첫 add 때 좌표마다 shift·scale 두 스칼라를 적합해 보정한다(이후 고정·재사용, 재학습 없음). 가장 많이 어긋나는 셀에서 R@1 최대 +1.4pp.
6. **길이 재정규화 점수(RaBitQ 차용)**: 인코딩 때 `||v|| / ⟨u, x̂⟩`을 벡터마다 저장해, 검색 커널이 후보 점수에 곱한다. 내적 추정기의 하향 편향을 검색 시점 비용 0·추가 저장 0으로 제거.
7. **RAG 프레임워크 드롭인 어댑터 4종**: LangChain `InMemoryVectorStore`, LlamaIndex `SimpleVectorStore`, Haystack `InMemoryDocumentStore`, Agno `LanceDb`를 같은 공개 surface·영속화 의미로 대체. 모두 내부적으로 `IdMapIndex` 사용.
8. **순수 로컬**: 관리형 서비스·외부 전송 없음. OSS 임베딩 모델과 묶으면 완전 air-gapped RAG 가능.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

README "How it works"의 6단계가 핵심이다.

1. **정규화**: 각 벡터의 norm을 float 하나로 떼어내, 본체를 초구 위 단위 방향으로 만든다.
2. **무작위 회전**: 모든 벡터에 같은 무작위 직교 행렬을 곱한다. 회전 뒤 각 좌표는 입력과 무관하게 Beta 분포(고차원에서 N(0, 1/d) 수렴)를 따른다.
3. **TQ+ 좌표별 보정**: Beta는 점근 분포라 유한 차원·저비트·워드벡터형 임베딩에서 좌표가 어긋난다. 첫 add 때 각 좌표의 경험적 5/95% 분위수를 정준 Beta 주변분포에 맞추는 shift·scale를 적합하고, 이후 고정한다.
4. **Lloyd-Max 스칼라 양자화**: 분포가 알려져 있으므로 버킷 경계·중심을 데이터 없이 미리 계산(2비트 4버킷, 4비트 16버킷, MSE 최소).
5. **비트 패킹**: 좌표를 작은 정수로 만들어 바이트에 빽빽이 채운다. d=1536이 6,144B(FP32)→384B(2비트), 16배.
6. **길이 재정규화 점수**: 양자화는 내적을 체계적으로 과소추정하므로, 벡터별 보정 스칼라를 검색 커널에서 곱해 무편향으로 만든다.

**검색**: DB 벡터를 복원하지 않고 쿼리만 같은 회전 도메인으로 옮긴 뒤 코드북 값에 직접 점수를 매긴다. nibble-split LUT + SIMD intrinsics로 처리량을 끌어올린다.

**파일 포맷**: `.tv`(TurboQuantIndex — 9바이트 헤더 + packed codes + norms), `.tvim`(IdMapIndex — "TVIM" 매직 + core payload + slot→id 테이블). 로드 시 id→slot 역맵을 메모리에서 재구성하고 중복 id는 손상으로 거부. 마이너 버전 간 포맷 안정, 깨지는 변경은 버전 바이트/헤더 길이로 표시.

**lazy dim**: `dim`을 생략하면 첫 add에서 차원이 잠긴다(헤더 `dim=0`이 미확정 lazy 인덱스를 의미, `n_vectors=0`일 때만 유효).

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

비교 기준은 FAISS `IndexPQ`(LUT256, nbits=8, float32 LUT) — 논문 4.4절 기준선보다 강한 프로덕션급 baseline이다. 조건은 100K 벡터·k=64, 속도는 1K 쿼리·5회 중앙값.

- **회복률**: OpenAI d=1536·d=3072에서 2·4비트 모두 R@1 기준 FAISS 대비 0.4~3.4점 우위, k=4에서 양쪽 1.0 수렴. GloVe d=200(저차원, Beta 가정이 느슨한 영역)은 4비트 +0.3점·2비트 −1.2점이며 k≈16에서 FAISS에 근접.
- **압축**: d=1536에서 2비트 16배·4비트 8배. 10M 코퍼스 31GB→4GB.
- **속도(ARM, M3 Max)**: 모든 설정에서 FAISS FastScan 대비 12~20% 빠름.
- **속도(x86, Xeon Platinum 8481C / Sapphire Rapids, 8 vCPU)**: 4비트 전 설정 1~6% 우위, 2비트 ST는 FAISS ±1%. 2비트 MT(d=1536·d=3072)만 FAISS에 2~4% 뒤짐(누산 루프가 짧아 unrolling 이득이 AVX-512 VBMI 경로를 못 따라감).
- **이론 한계**: Lloyd-Max 코드북 왜곡은 정보이론 하한(Shannon 왜곡-율)의 약 2.7배 이내, 길이 재정규화가 잔여 편향 제거.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **MMR 미지원**: 어댑터의 `max_marginal_relevance_search`는 `NotImplementedError`. MMR은 후보의 full-precision 임베딩이 필요한데 turbovec은 양자화 후 원본을 버린다. 필요하면 원본 임베딩 저장소를 병행해야 한다.
- **임베딩 비복원**: 검색은 `Document`(text·metadata)만 돌려주고 원본 임베딩은 복구 불가.
- **저차원 회복률**: GloVe d=200 2비트에서 FAISS에 뒤짐(Beta 점근 가정의 본질적 한계).
- **JSON 직렬화 metadata만**: 커스텀 객체·set 등은 저장 시 실패(in-tree 참조 store와 동일 제약).
- **품질 이력**: 0.7.0/0.8.0은 audit 기반 정정 릴리스로, 14개 활성 버그 수정(예: NaN/Inf 입력이 인덱스를 조용히 오염시키던 문제, AVX-512/AVX2 미지원 x86에서 빈 top-k 반환하던 폴백 누락, v2 로드 후 add 시 오인코딩 등). on-disk 포맷은 `.tv`/`.tvim` v3로 변경 없음.

## 6. 관련 연구 (Related Work)

- **TurboQuant: Online Vector Quantization with Near-optimal Distortion Rate** (arXiv 2504.19874, ICLR 2026) — 이 저장소가 구현하는 원 알고리즘.
- **RaBitQ** (SIGMOD 2024, arXiv 2405.12497) — 벡터별 길이 재정규화 보정(6단계)의 출처.
- **FAISS FastScan** — x86 SIMD 커널의 pack 레이아웃·nibble-LUT 점수·u16 누산 전략 차용 대상이자 속도·회복률 비교 기준선.
- [[database/9bow-2026-turbovec-turboquant-rust-vector-index]] — 이 저장소를 다룬 PyTorchKR 한국어 소개글.
- 본 ai-wiki의 벡터 검색 계열: 임베딩 모델 [[database/shanbhogue-2026-gemini-embedding-2-native-multimodal]] · [[database/zhang-2026-your-embedding-model-is-smarter]], 그리고 embedding/index 자체를 버리는 반대 진영 [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]]·[[database/vectifyai-pageindex]].

## 7. 용어집 (Glossary)

- **TurboQuant**: 무작위 직교 회전 + 스칼라 양자화로 데이터 학습 없이 Shannon 하한에 근접하게 압축하는 양자화 알고리즘.
- **data-oblivious**: 입력 데이터로 코드북을 학습하지 않음. 회전으로 분포를 강제해 버킷을 수학적으로 미리 정함.
- **TQ+**: turbovec의 자체 확장. 좌표별 shift·scale 보정으로 유한 차원에서 Beta 분포 이탈을 교정(첫 add 때 1회, 이후 고정).
- **`TurboQuantIndex` / `IdMapIndex`**: 위치 기반 인덱스 / 안정 외부 u64 ID 래퍼(FAISS `IndexIDMap2` 대응).
- **allowlist / mask**: 검색 시점 필터. 허용된 집합에서만 top-k를 채워 over-fetch·recall 손실을 피함.
- **nibble-split LUT**: 4비트(nibble) 단위로 쪼갠 룩업테이블 점수 계산. SIMD 처리량 최적화.
- **swap_remove**: Rust `Vec::swap_remove`와 동일 의미. 마지막 원소를 삭제 슬롯으로 옮김(순서 비보존, O(1)).
- **maturin / PyO3**: Rust 코드를 Python 휠로 빌드·바인딩하는 도구.

## 8. 그림 후보 (Figure Candidates)

저장소 `docs/`의 차트는 SVG다(Obsidian 임베드 가능). repos 규칙상 별도 `-figures/`를 만들지 않고 in-place 참조하며, 큐레이션 확정 시 `wiki/assets/ryancodrai-turbovec/`로 cp 한다.

| id | file | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | docs/recall_d1536.svg | 회복률 d=1536 (TurboQuant vs FAISS) | manual | ★ wiki 권장 (result) |
| fig02 | docs/compression.svg | 압축률 (float32 대비 2/4비트) | manual | ★ wiki 권장 (핵심 셀링포인트) |
| fig03 | docs/arm_speed_mt.svg | ARM 멀티스레드 속도 | manual | ★ wiki 권장 (result) |
| fig04 | docs/x86_speed_mt.svg | x86 멀티스레드 속도 | manual | (선택) |
| fig05 | docs/recall_glove.svg | 회복률 GloVe d=200 (저차원 약세) | manual | (선택, 한계 예시) |
| fig06 | docs/recall_d3072.svg | 회복률 d=3072 | manual | (선택) |
| fig07 | docs/header.png | 프로젝트 헤더 배너 | manual | (장식용) |
