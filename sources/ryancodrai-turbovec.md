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
    raw: https://raw.githubusercontent.com/RyanCodrai/turbovec/main/docs/recall_d1536.svg
    caption: "OpenAI d=1536에서 k를 1부터 64까지 늘렸을 때의 recall@1@k 곡선, TurboQuant 2비트와 4비트를 FAISS 2비트와 4비트와 함께 그린 그래프"
    strategy: manual
    curated: true
  - id: fig02
    file: assets/ryancodrai-turbovec/compression.svg
    raw: https://raw.githubusercontent.com/RyanCodrai/turbovec/main/docs/compression.svg
    caption: "10만 개 벡터를 담은 인덱스 크기를 GloVe d=200, OpenAI d=1536, OpenAI d=3072 세 데이터셋에서 FP32와 4비트와 2비트로 비교한 막대 그래프"
    strategy: manual
    curated: true
  - id: fig03
    file: assets/ryancodrai-turbovec/arm_speed_mt.svg
    raw: https://raw.githubusercontent.com/RyanCodrai/turbovec/main/docs/arm_speed_mt.svg
    caption: "Apple M3 Max 멀티스레드 검색에서 쿼리당 지연을 TurboQuant과 FAISS로 비교한 막대 그래프, d와 비트 폭 네 가지 설정"
    strategy: manual
    curated: true
  - id: fig04
    file: assets/ryancodrai-turbovec/x86_speed_mt.svg
    raw: https://raw.githubusercontent.com/RyanCodrai/turbovec/main/docs/x86_speed_mt.svg
    caption: "x86 Xeon Sapphire Rapids 멀티스레드 검색 속도를 FAISS와 비교한 그래프, README 본문의 x86 절에 배치"
    strategy: manual
    curated: false
  - id: fig05
    file: assets/ryancodrai-turbovec/recall_glove.svg
    raw: https://raw.githubusercontent.com/RyanCodrai/turbovec/main/docs/recall_glove.svg
    caption: "GloVe d=200 저차원 영역의 recall 비교 그래프, README recall 절의 첫 번째 도식"
    strategy: manual
    curated: false
  - id: fig06
    file: assets/ryancodrai-turbovec/recall_d3072.svg
    raw: https://raw.githubusercontent.com/RyanCodrai/turbovec/main/docs/recall_d3072.svg
    caption: "OpenAI d=3072의 recall 비교 그래프, README recall 절의 세 번째 도식"
    strategy: manual
    curated: false
  - id: fig07
    file: assets/ryancodrai-turbovec/header.png
    raw: https://raw.githubusercontent.com/RyanCodrai/turbovec/main/docs/header.png
    caption: "저장소 최상단 헤더 배너, 대체 텍스트는 벡터 검색을 위한 Google TurboQuant을 표방한다"
    strategy: manual
    curated: false
  - id: fig08
    file: assets/ryancodrai-turbovec/arm_speed_st.svg
    raw: https://raw.githubusercontent.com/RyanCodrai/turbovec/main/docs/arm_speed_st.svg
    caption: "Apple M3 Max 싱글스레드 검색 속도 그래프, README ARM 절의 첫 번째 도식"
    strategy: manual
    curated: false
  - id: fig09
    file: assets/ryancodrai-turbovec/x86_speed_st.svg
    raw: https://raw.githubusercontent.com/RyanCodrai/turbovec/main/docs/x86_speed_st.svg
    caption: "x86 Xeon Sapphire Rapids 싱글스레드 검색 속도 그래프, README x86 절의 첫 번째 도식"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

turbovec은 Google Research의 TurboQuant 알고리즘(arXiv 2504.19874, ICLR 2026)을 Rust 코어와 Python 바인딩으로 구현한 벡터 인덱스다. TurboQuant은 별도 학습 단계가 없는 data-oblivious 양자화로, 무작위 직교 회전을 걸어 좌표 분포를 미리 알려진 형태로 만든 뒤 수학으로 정한 버킷에 값을 담는다. README가 앞세우는 수치는 1,000만 건 문서 코퍼스가 float32로 31GB인데 turbovec은 4GB에 담고 FAISS보다 빠르게 검색한다는 것이다. 손으로 짠 SIMD 커널이 ARM에서 FAISS IndexPQFastScan을 10%에서 19% 앞서고, x86에서는 4비트 설정을 이기며 2비트에서는 몇 퍼센트 뒤진다. 인덱스 타입은 `TurboQuantIndex`와 `IdMapIndex` 두 가지이고, 검색 시점 allowlist 필터와 RAG 프레임워크 어댑터 4종을 제공한다.

## 1. 자료 정보 (Document Information)

- **저장소**: RyanCodrai/turbovec, https://github.com/RyanCodrai/turbovec
- **언어**: Rust 코어와 Python 바인딩. Python 휠은 maturin으로 빌드한다
- **배포**: PyPI `turbovec`, crates.io `turbovec` (README 상단 배지로 확인)
- **라이선스**: frontmatter는 MIT로 기록한다. README 본문에는 라이선스 조항이 없고 `LICENSE` 파일로 가는 shields.io 배지만 있어, 현재 raw만으로는 검증할 수 없다
- **구현 대상**: TurboQuant (arXiv 2504.19874, ICLR 2026). 원 논문은 [[database/zandieh-2025-turboquant-online-vector-quantization-with]]에 정리되어 있다
- **저장소 위상**: README는 turbovec을 Google Research 알고리즘 위에 세운 구현이라고만 밝히고, 공식 구현체나 reference 구현체를 자처하지 않는다. 오히려 recall 절의 baseline 주석에서 저차원 임베딩 수치가 "다른 커뮤니티 reference 구현들"과 비슷하다고 적어, 스스로를 여러 커뮤니티 구현 가운데 하나로 놓는다
- **raw 상태**: 커밋 `0507ad0`(2026-06-17)이 전체 클론 180개 파일을 README 하나로 교체했다. `CHANGELOG.md`, `LICENSE`, `Cargo.toml`, `docs/api.md`, `docs/integrations/*.md`, `turbovec/src/*.rs`, `turbovec/tests/*.rs`, `benchmarks/results/*.json`이 모두 사라졌다. 이 문서는 남은 README에 실재하는 문장만 근거로 삼는다
- **title 표기**: frontmatter `title`의 `turbovec: Google TurboQuant for vector search (Rust + Python)` 조합 표기는 유지하기로 이전에 판정했고, 이번 재작성에서 재검토를 종결했다

## 2. 주요 기여 (Key Contributions)

README가 앞세우는 네 가지는 다음과 같다.

1. **온라인 ingest**: 벡터를 add하면 곧바로 색인된다. train 단계도, 파라미터 튜닝도, 코퍼스가 커질 때의 재빌드도 없다.
2. **빠른 SIMD 검색**: 손으로 짠 NEON(ARM)과 AVX-512BW(x86) 커널이 FAISS IndexPQFastScan을 ARM에서 10%에서 19% 앞선다. x86에서는 4비트 설정을 이기고 2비트에서 몇 퍼센트 뒤진다.
3. **검색 시점 필터**: `search()`에 id allowlist나 슬롯 비트마스크를 넘기면 커널이 직접 그것을 지킨다. 허용 집합에서 최대 `k`개를 항상 얻으며, over-fetch도 없고 선택적 필터에서 recall이 깎이지도 않는다.
4. **순수 로컬**: 관리형 서비스가 없고 데이터가 기기나 VPC 밖으로 나가지 않는다. OSS 임베딩 모델과 묶으면 완전히 격리된 RAG 스택을 만들 수 있다.

여기에 README 본문이 설명하는 알고리즘 확장 두 가지가 더해진다. 하나는 좌표별 보정 TQ+이고, 다른 하나는 RaBitQ에서 가져온 길이 재정규화 점수다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 알고리즘 6단계

README "How it works"의 출발점은 각 벡터를 고차원 초구 위의 방향으로 보는 관점이다. 무작위 회전을 걸고 나면 좌표 분포가 입력 데이터와 무관하게 알려진 형태가 된다는 점이 핵심 통찰이다.

1. **정규화**: 각 벡터에서 길이(norm)를 float 하나로 떼어낸다. 남은 본체는 초구 위 단위 방향이 된다.
2. **무작위 회전**: 모든 벡터에 같은 무작위 직교 행렬을 곱한다. 회전 뒤에는 각 좌표가 독립적으로 Beta 분포를 따르고, 고차원에서 N(0, 1/d)로 수렴한다. 입력이 무엇이든 성립하며, 회전이 좌표 분포를 예측 가능하게 만든다.
3. **좌표별 보정 TQ+**: 2단계의 Beta는 점근 분포라서 유한 차원에서는 개별 좌표가 정준 형태에서 벗어난다. 저비트 설정과 워드벡터형 임베딩에서 특히 그렇다. TQ+는 첫 add 때 좌표마다 shift와 scale 두 스칼라를 적합해, 각 좌표의 경험적 5%와 95% 분위수를 정준 Beta 주변분포에 대응시킨다. 그러면 Lloyd-Max 코드북이 원래 설계 대상이던 목표 분포를 상대로 양자화하게 된다. 보정값은 첫 add 이후 고정되고 뒤이은 add에서 재사용되므로 재학습도, 재빌드도, 별도 train 단계도 없다. recall 이득은 가장 많이 어긋나는 셀에서 R@1 기준 최대 +1.4%p이며, GloVe 2비트가 그 예다.
4. **Lloyd-Max 스칼라 양자화**: 분포를 알고 있으므로 각 좌표를 어떻게 버킷에 담을지 미리 계산할 수 있다. 2비트는 4개 버킷, 4비트는 16개 버킷이다. Lloyd-Max 알고리즘이 평균제곱오차를 최소화하는 경계와 중심값을 찾는데, 이 값들은 데이터가 아니라 수식에서 한 번 계산된다.
5. **비트 패킹**: 좌표는 이제 작은 정수다. 2비트면 0에서 3, 4비트면 0에서 15다. 이것을 바이트에 빽빽하게 채운다. 1536차원 벡터는 FP32일 때 6,144바이트에서 2비트일 때 384바이트가 되며, 16배 압축이다.
6. **길이 재정규화 점수**: 스칼라 양자화는 내적을 체계적으로 과소추정한다. 복원된 단위 방향이 원본보다 조금 짧기 때문이다. 인코딩 시점에 회전된 단위 벡터와 그 자신의 중심값 복원 사이의 내적을 구하고, `||v|| / ⟨u, x̂⟩`을 압축 벡터 옆에 저장한다. 검색 커널이 후보 점수에 이 스칼라를 곱한 뒤 힙에 넣으므로, 내적 추정기가 하향 편향 상태에서 무편향으로 바뀐다. 검색 시점 비용은 0이고 추가 저장도 없다. recall 이득은 양자화 수축이 가장 큰 저비트 폭에서 가장 크게 나타난다.

인코딩 비용은 벡터당 `d`차원 내적 한 번이 추가되는 정도다. d=1536에서 100만 개 벡터를 인코딩할 때 1초 미만이 더 든다. ingest 시점에 한 번 치르는 비용이지 쿼리 시점 비용이 아니다.

### 검색 경로

검색은 데이터베이스 벡터를 하나씩 복원하지 않는다. 쿼리만 같은 회전 도메인으로 한 번 옮긴 뒤 코드북 값을 상대로 직접 점수를 매긴다. 점수 커널은 SIMD intrinsic을 쓰며, ARM은 NEON, 최신 x86은 AVX-512BW를 쓰고 AVX2 폴백이 있다. 처리량을 위해 nibble 단위로 쪼갠 룩업테이블을 사용한다.

Lloyd-Max 코드북의 왜곡은 정보이론 하한, 즉 Shannon 왜곡률 한계의 2.7배 이내에 든다. 길이 재정규화 단계는 Lloyd-Max 코드북이 내적 추정기 자체에 남기는 잔여 편향을 제거한다.

### 필터 검색

필터는 SIMD 커널 안에서 32개 벡터 블록 단위로 적용된다. 허용된 슬롯이 하나도 없는 블록은 LUT 조회나 점수 계산 전에 건너뛴다. 점수를 매긴 블록 안에서 허용되지 않은 개별 슬롯은 힙 삽입 시점에 버린다. 그래서 선택적 allowlist, 즉 인덱스의 작은 일부만 허용하는 경우에는 SIMD 비용을 대부분 치르지 않는다. 비용을 다 치르고 결과를 나중에 버리는 방식이 아니다.

출력 길이는 `min(k, len(allowed))`다. allowlist가 `k`보다 작으면 패딩된 대체값이 아니라 정확히 `len(allowed)`개를 받는다. README의 하이브리드 예제는 1단계에서 SQL 같은 외부 시스템이 후보 id를 좁히고, 2단계에서 그 후보 집합 안에서 dense reranking을 하는 흐름이다.

### 공개 API

| 항목 | `TurboQuantIndex` | `IdMapIndex` |
|---|---|---|
| 생성 | `TurboQuantIndex(dim=1536, bit_width=4)` | `IdMapIndex(dim=1536, bit_width=4)` |
| 추가 | `add(vectors)` | `add_with_ids(vectors, ids)` (ids는 uint64 배열) |
| 검색 반환 | `scores, indices` | `scores, ids` (사용자가 준 uint64 외부 id) |
| 삭제 | README에 예시 없음 | `remove(1002)`, id 기준 O(1) |
| 파일 확장자 | `.tv` | `.tvim` |

Rust 쪽은 `TurboQuantIndex::new(1536, 4)`와 `IdMapIndex::new(1536, 4)`로 같은 구조를 제공하며, `add`, `search`, `write`, `load`가 대응한다. 전체 레퍼런스는 저장소의 `docs/api.md`가 담당한다고 README가 안내한다.

### 프레임워크 어댑터

README는 각 프레임워크의 in-tree 참조 벡터 저장소나 문서 저장소를 그대로 대체하는 드롭인 교체라고 설명한다. 공개 surface, 영속화 의미, retriever와 파이프라인 배선이 모두 같아서 import만 바꾸면 된다.

| 프레임워크 | 설치 extra | 대체 대상 |
|---|---|---|
| LangChain | `turbovec[langchain]` | `langchain_core.vectorstores.InMemoryVectorStore` |
| LlamaIndex | `turbovec[llama-index]` | `llama_index.core.vector_stores.SimpleVectorStore` |
| Haystack | `turbovec[haystack]` | `haystack.document_stores.in_memory.InMemoryDocumentStore` |
| Agno | `turbovec[agno]` | `agno.vectordb.lancedb.LanceDb` |

네 개 가운데 셋은 인메모리 저장소를 대체하지만 Agno만 LanceDb를 대체한다.

### 빌드와 타깃

Python 휠은 `pip install maturin` 뒤 `turbovec-python` 디렉토리에서 `maturin build --release`로 만들고 `target/wheels/*.whl`을 설치한다. Rust는 `cargo build --release`다.

x86_64 빌드는 전부 `.cargo/config.toml`을 통해 `x86-64-v3`를 타깃으로 삼는다. AVX2 기준선이며 2013년 Haswell 이후 CPU가 해당한다. AVX2 폴백 커널을 실행할 수 있는 CPU라면 크레이트 전체를 실행할 수 있고, AVX-512 커널은 `is_x86_feature_detected!`로 런타임에 판별해 지원 하드웨어에서만 활성화된다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 실험 조건

비교 대상은 FAISS `IndexPQ`(LUT256, nbits=8, float32 LUT)이고, 논문 4.4절의 baseline이다. 벡터 10만 개에 k=64이며, FAISS PQ의 하위 양자화기 개수는 TurboQuant의 비트율에 맞췄다. 2비트에서 m=d/4, 4비트에서 m=d/2다. 속도 벤치마크는 벡터 10만 개, 쿼리 1,000개, k=64, 5회 실행의 중앙값이다.

README는 이 baseline 선택 이유를 따로 적는다. FAISS `IndexPQ`가 대부분의 사용자가 먼저 찾는 프로덕션급 PQ 기본값이라서다. 이것은 TurboQuant 논문이 쓴 자체 u8-LUT PQ보다 강한 baseline인데, FAISS는 점수 계산 시점에 더 높은 정밀도의 LUT를 쓰고 코드북 학습에 k-means++를 쓰기 때문이다.

### recall

| 데이터셋 | 2비트 R@1 | 4비트 R@1 | 수렴 |
|---|---|---|---|
| OpenAI d=1536, d=3072 | FAISS 대비 0.2점에서 1.9점 우위 | 같은 범위의 우위 | k=8에서 양쪽 1.0, k=4에서 이미 0.997 이상 |
| GloVe d=200 | 0.1점 이내로 사실상 동률 | FAISS 대비 0.9점 우위 | k가 16 부근이면 양쪽이 FAISS를 바짝 따라감 |

GloVe d=200은 어려운 영역이다. 차원이 낮으면 점근 Beta 가정이 느슨해지기 때문이다. README는 이 저차원 격차를 base 알고리즘이 남기는 것으로 보고, TQ+ 보정이 그 격차를 메운다고 적는다. 또한 저차원 임베딩에서 다른 커뮤니티 reference 구현들과 비슷한 수치를 얻었다고 밝히며 `turboquant-py`의 d=384 결과를 예로 든다. OpenAI d=1536과 d=3072에서는 논문의 TurboQuant 수치를 재현했다고 적는다.

`recall_d1536.svg` 도식의 부제는 이 지표를 recall@1@k로 정의한다. 진짜 top-1 결과가 반환된 top-k 안에 얼마나 자주 들어오는지를 재는 값이다. 세로축 범위는 0.85에서 1.00이고 가로축 k는 1, 2, 4, 8, 16, 32, 64다.

### 압축

`compression.svg`가 벡터 10만 개 기준 인덱스 크기를 MB 단위로 보여준다.

| 데이터셋 | FP32 | 4비트 | 2비트 |
|---|---|---|---|
| GloVe d=200 | 76 | 10 | 5 |
| OpenAI d=1536 | 586 | 74 | 37 |
| OpenAI d=3072 | 1,172 | 147 | 74 |

세 데이터셋 모두 2비트에서 약 16배, 4비트에서 약 8배로 줄어든다. 도식의 부제도 2비트가 FP32보다 약 16배 작으면서 recall이 비슷하다고 적는다. README 첫 문장의 1,000만 건 코퍼스 31GB에서 4GB라는 수치가 같은 비율이다.

### 검색 속도

ARM은 Apple M3 Max, x86은 Intel Xeon Platinum 8481C(Sapphire Rapids) 8 vCPU다. ARM에서는 모든 설정에서 FAISS FastScan을 10%에서 19% 앞선다.

`arm_speed_mt.svg`가 담은 멀티스레드 쿼리당 지연은 다음과 같다.

| 설정 | TurboQuant | FAISS | 지연 감소 |
|---|---|---|---|
| d=1536, 2비트 | 0.103ms | 0.115ms | 10.4% |
| d=1536, 4비트 | 0.185ms | 0.220ms | 15.9% |
| d=3072, 2비트 | 0.201ms | 0.224ms | 10.3% |
| d=3072, 4비트 | 0.375ms | 0.448ms | 16.3% |

x86에서는 4비트 설정을 최대 약 5% 앞서고 d=3072 멀티스레드는 동률이다. 2비트에서는 완만하게 뒤지는데, d=1536 싱글스레드가 약 8%로 가장 크고 나머지는 몇 퍼센트 이내다. README는 그 원인을 짧은 2비트 누산 루프에서 FAISS의 AVX-512 VBMI 경로가 우위를 갖는 것으로 설명한다.

### 벤치마크 재현

데이터셋은 `benchmarks/download_data.py`로 받는다. `all`, `glove`(GloVe d=200), `openai-1536`(OpenAI DBpedia d=1536), `openai-3072`(OpenAI DBpedia d=3072)를 지정한다. 각 벤치마크는 `benchmarks/suite/`의 독립 스크립트이고 개별 실행이 가능하다. 결과는 `benchmarks/results/`에 JSON으로 저장되며 `benchmarks/create_diagrams.py`가 차트를 다시 만든다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **저차원 recall**: GloVe d=200에서 2비트는 FAISS와 0.1점 이내 동률에 머문다. 점근 Beta 가정이 저차원에서 느슨해지는 것이 원인이며, TQ+가 이 격차를 좁히는 장치다.
- **x86 2비트 속도**: 2비트 설정에서 FAISS에 뒤지고, d=1536 싱글스레드에서 약 8%로 가장 크다. 누산 루프가 짧아 AVX-512 VBMI 경로의 우위를 상쇄하지 못한다.
- **라이선스 검증 불가**: README 본문에 라이선스 조항이 없다. 상단 배지가 `LICENSE` 파일을 가리키지만 그 파일은 raw에 남아 있지 않다. frontmatter의 MIT 표기는 유지하되 저장소의 `LICENSE`를 직접 확인해야 한다.
- **API 세부 부재**: 파일 포맷 헤더 구조, 삭제 시맨틱, 차원 지연 확정 같은 세부는 `docs/api.md`가 담당한다고 README가 안내하지만 그 문서는 raw에 없다. 저장소 원문을 봐야 한다.
- **어댑터 제약 미확인**: 프레임워크별 어댑터의 지원 범위와 제약은 `docs/integrations/*.md`에 있고 역시 raw에 없다.
- **자료 내적 모순 두 건**: References 절은 RaBitQ의 길이 재정규화 보정을 "step 5"에서 차용했다고 적는데, "How it works"에서 5단계는 비트 패킹이고 길이 재정규화는 6단계다. 또한 상단 요약은 x86 2비트 열세를 "몇 퍼센트"로 적지만 x86 절은 d=1536 싱글스레드에서 약 8%라고 적는다.

## 6. 관련 연구 (Related Work)

README의 References 절은 세 항목을 든다.

| 자료 | 관계 |
|---|---|
| TurboQuant (arXiv 2504.19874, ICLR 2026) | 이 저장소가 구현하는 원 알고리즘 |
| RaBitQ (arXiv 2405.12497, SIGMOD 2024) | 벡터별 길이 재정규화 보정의 출처 |
| FAISS FastScan | x86 SIMD 커널이 pack 레이아웃, nibble LUT 점수 계산, u16 누산 전략을 차용한 대상이자 속도 비교 baseline |

본 wiki에서는 다음 페이지와 이어진다.

- [[database/zandieh-2025-turboquant-online-vector-quantization-with]]: 원 알고리즘 논문 페이지.
- [[database/9bow-2026-turbovec-turboquant-rust-vector-index]]: 이 저장소를 다룬 한국어 소개글.
- [[database/zhang-2026-your-embedding-model-is-smarter]]: 임베딩 표현을 다시 쓰는 반대 방향의 접근.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]], [[database/vectifyai-pageindex]]: 임베딩과 인덱스 자체를 쓰지 않는 vectorless 계열.

## 7. 용어집 (Glossary)

- **TurboQuant**: 무작위 직교 회전으로 좌표 분포를 알려진 형태로 만든 뒤 스칼라 양자화하는 알고리즘. 데이터 학습 없이 Shannon 하한에 근접한다.
- **data-oblivious**: 입력 데이터를 보고 코드북을 학습하지 않는 성질. 회전이 분포를 강제하므로 버킷을 수식으로 미리 정한다.
- **TQ+**: 좌표마다 shift와 scale을 적합해 유한 차원에서 생기는 Beta 분포 이탈을 보정하는 단계. 첫 add에서 한 번 적합하고 이후 고정한다.
- **길이 재정규화 점수**: 압축 벡터마다 `||v|| / ⟨u, x̂⟩`을 저장해 두고 검색 커널이 점수에 곱하는 보정. 내적 추정기의 하향 편향을 없앤다.
- **allowlist**: 검색 시점에 넘기는 허용 id 집합. 커널이 32개 벡터 블록 단위로 이를 지키며 출력 길이는 `min(k, len(allowed))`다.
- **nibble-split LUT**: 4비트 단위로 나눈 룩업테이블 점수 계산 방식. SIMD 처리량을 높인다.
- **recall@1@k**: 진짜 top-1 결과가 반환된 top-k 안에 들어오는 비율. 저장소 차트의 세로축 지표다.
- **maturin**: Rust 코드를 Python 휠로 빌드하는 도구. turbovec의 Python 바인딩 빌드에 쓴다.

## 8. 그림 후보 (Figure Candidates)

저장소 `docs/`의 차트는 SVG이고 헤더만 PNG다. repos 규칙상 별도 `-figures/` 디렉토리를 만들지 않고 GitHub URL을 `raw` 필드에 기록한다. 브랜치는 README의 `LICENSE` 배지 링크가 가리키는 `main`이다.

세 개는 큐레이션 시점에 `wiki/assets/ryancodrai-turbovec/`로 복사되어 로컬에 남아 있고, 그 셋의 캡션은 SVG 안의 제목, 부제, 축 라벨, 데이터 라벨을 직접 읽어서 썼다. 나머지 여섯은 원격 호스트에만 있어 열어볼 수 없으므로, 캡션은 README의 이미지 대체 텍스트와 배치 위치와 주변 문장만으로 작성했다.

| id | file | 근거 | strategy | 추천 |
|---|---|---|---|---|
| fig01 | docs/recall_d1536.svg | 로컬 사본 판독 | manual | ★ wiki 권장 (result) |
| fig02 | docs/compression.svg | 로컬 사본 판독 | manual | ★ wiki 권장 (핵심 셀링포인트) |
| fig03 | docs/arm_speed_mt.svg | 로컬 사본 판독 | manual | ★ wiki 권장 (result) |
| fig04 | docs/x86_speed_mt.svg | README 마크업만 | manual | (선택) |
| fig05 | docs/recall_glove.svg | README 마크업만 | manual | (선택, 한계 예시) |
| fig06 | docs/recall_d3072.svg | README 마크업만 | manual | (선택) |
| fig07 | docs/header.png | README 마크업만 | manual | (장식용) |
| fig08 | docs/arm_speed_st.svg | README 마크업만 | manual | (선택) |
| fig09 | docs/x86_speed_st.svg | README 마크업만 | manual | (선택) |

fig03은 로컬 사본에서 수치를 읽어 결과 절의 마크다운 표로도 옮겼다. 표가 검색 가능하다는 이점과 도식의 직관을 함께 살리려고 표와 임베드를 둘 다 두었다. fig08과 fig09는 README가 참조하지만 이전 후보 목록에서 빠져 있던 싱글스레드 차트이며, 이번에 후보로 추가했다.
