# turbovec: TurboQuant 알고리즘을 Rust로 구현한 학습이 필요 없는 벡터 인덱스

- **작성자:** 9bow (박정환) — PyTorch Korea User Group 운영자
- **작성일:** 2026-05-21 21:30
- **출처:** https://discuss.pytorch.kr/t/turbovec-turboquant-rust/10295
- **원본 저장소:** https://github.com/RyanCodrai/turbovec

---

## turbovec 소개

turbovec는 Google Research가 ICLR 2026에서 공개한 TurboQuant 알고리즘을 Rust로 구현한 벡터 인덱스 라이브러리입니다. 핵심은 "1,000만 건 규모의 임베딩을 float32로 저장하면 31GB가 필요하지만, turbovec은 같은 데이터를 4GB에 담으면서 FAISS보다 빠르게 검색한다"는 것입니다.

기존 FAISS의 PQ(Product Quantization)와 달리, TurboQuant는 데이터에 무관한(data-oblivious) 양자화 방식을 사용합니다. 무작위 직교 회전을 통해 회전된 좌표의 분포를 사전에 알려진 Beta 분포로 만들어, 코드북 학습 없이 최적 버킷을 미리 계산할 수 있습니다.

라이선스는 MIT License이며, PyPI와 crates.io로 배포됩니다. LangChain, LlamaIndex, Haystack, Agno 네 가지 RAG 프레임워크용 드롭인 어댑터를 제공하며, 순수 로컬로 동작합니다.

---

## 압축률과 메모리 효과

OpenAI 임베딩 기준(d=1536):
- **2비트 양자화:** 6,144바이트가 384바이트로 약 16배 압축
- **4비트 양자화:** 768바이트가 되어 약 8배 압축
- **10M 코퍼스:** float32는 약 31GB, 2비트 양자화는 4GB 수준

양자화 시 벡터당 길이 재정규화 스칼라를 저장하여, 내적 추정기가 편향 없이 동작합니다.

---

## 검색 속도와 회복률

벤치마크(100K 벡터, 1K 쿼리, k=64):

**회복률(recall):**
- OpenAI d=1536/d=3072: TurboQuant이 R@1 기준 FAISS 대비 0.4~3.4점 우위
- GloVe d=200: 저차원에서는 4비트에서 0.3점 앞서고 2비트에서는 1.2점 뒤짐

**속도:**
- ARM(M3 Max): FAISS FastScan 대비 12~20% 빠름
- x86(Xeon): 4비트 설정에서 1~6% 우위

---

## 핵심 알고리즘 흐름

1. **정규화:** 벡터 길이를 float으로 저장, 본체는 단위 방향으로 처리
2. **무작위 직교 회전:** 모든 벡터에 동일한 무작위 직교 행렬 적용
3. **Lloyd-Max 스칼라 양자화:** 데이터를 보지 않고 버킷 경계와 중심값 계산
4. **비트 패킹:** 각 좌표를 비트 단위로 패킹
5. **길이 재정규화 점수:** 인코딩 시 계산한 스칼라를 검색 커널에서 곱함

---

## Python API 사용 예시

```python
import numpy as np
from turbovec import TurboQuantIndex, IdMapIndex

# 기본 인덱스
index = TurboQuantIndex(dim=1536, bit_width=4)
index.add(vectors)
scores, indices = index.search(query, k=10)

# 외부 ID 보존
idmap = IdMapIndex(dim=1536, bit_width=4)
idmap.add_with_ids(vectors, np.array([1001, 1002, 1003], dtype=np.uint64))
idmap.remove(1002)

# 필터링된 검색
scores, ids = idmap.search(query, k=10, allowlist=allowed)
```

---

## Rust 사용 예시

```rust
use turbovec::{TurboQuantIndex, IdMapIndex};

let mut index = TurboQuantIndex::new(1536, 4);
index.add(&vectors);
let results = index.search(&queries, 10);
index.write("index.tv").unwrap();

let mut id_index = IdMapIndex::new(1536, 4);
id_index.add_with_ids(&vectors, &[1001, 1002, 1003]);
id_index.remove(1002);
```

---

## 라이선스

MIT License로 공개. 상업적 활용·수정·재배포 자유로우며, 라이선스 파일과 저작권 고지 유지 필요.
