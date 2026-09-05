---
title: "Computer Memory vs GBrain"
type: article
year: 2026
category: applications
raw_path: raw/articles/gajjar-2026-gbrain-vs-computer-memory.md
raw_filename: "gajjar-2026-gbrain-vs-computer-memory.md"
source_collection: external
author: "Arth Gajjar"
url: "https://devrev.ai/blog/gbrain-individuals-computer-memory-enterprises"
publisher: "DevRev Blog"
publication_date: "2026-05-08"
tags: [gbrain, agent-memory, enterprise, devrev, computer-memory, airsync, karpathy-llm-wiki, salesforce, jira, zendesk, slack]
---

## 한 줄 요약 (One-line Summary)

DevRev의 Tech Lead **Arth Gajjar**가 *"AI agent는 매 세션마다 zero에서 시작한다"*는 문제 의식 아래, Garry Tan의 개인용 **GBrain**(Postgres + pgvector, git markdown, dream cycle)과 DevRev의 엔터프라이즈용 **Computer Memory**(50+ 시스템 two-way sync, AirSync, SOC 2 권한)를 대비시키며 *"compounding memory가 단순 retrieve memory를 이긴다"*는 공통 원리를 도출한다.

## 1. 자료 정보 (Document Information)

- **저자**: Arth Gajjar (Tech Lead @ DevRev)
- **매체**: DevRev Blog (devrev.ai/blog)
- **URL**: <https://devrev.ai/blog/gbrain-individuals-computer-memory-enterprises>
- **게시 / 갱신**: Updated 2026-05-08
- **분량**: 짧은 비교 에세이 (~5개 섹션)
- **외부 관점**: DevRev가 자사 제품(Computer Memory + AirSync)을 GBrain과 비교 포지셔닝하는 마케팅 친화 글 — 단, GBrain 묘사는 정확하다 (다른 자료의 BrainBench·아키텍처 기술과 일치).

## 2. 주요 기여 (Key Contributions)

1. **"Every AI agent starts from zero"** 문제 정의 — 매 세션 context 부재 → 비즈니스에 critical한 디테일(account renewal, revenue blocker)을 모름.
2. **GBrain 요점 정리** — Tan이 2026년 4월에 open-source. 마크다운/people/calendar를 인덱싱. 인용 수치 **17,888 pages · 4,383 contacts · 723 companies, milliseconds로 검색**.
3. **GBrain 아키텍처 핵심 한 줄** — *"compiled truth on top (rewritten as evidence changes), append-only timeline below (preserving the proof trail)"* + "dream cycle" 야간 enrichment.
4. **개인 ↔ 엔터프라이즈 격차의 세 가지 명시** —
   1. **Shared, not personal**: Computer Memory는 조직 전체에서 compound → cross-team 가시성.
   2. **Two-way sync, not manual ingestion**: AirSync로 50+ 시스템(Salesforce, Jira, Zendesk, Slack)과 양방향 실시간 동기화.
   3. **Enterprise-grade permissions**: SOC 2 compliant access control vs flat-file access.
5. **공통 thesis 정식화** — *"Memory that compounds beats memory that just retrieves"* — GBrain은 개인에서, Computer Memory는 엔터프라이즈에서 같은 원리를 검증.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

- 논문이나 코드가 아닌 **비교 에세이** 형식. 새 알고리즘 없음.
- GBrain 묘사는 README의 사실(Postgres + pgvector, hybrid search, dream cycle)을 충실히 인용.
- DevRev Computer Memory에 대해서는 **AirSync**가 50+ 시스템과 양방향 sync한다는 점만 명시되고 내부 retrieval 구조(예: graph가 있는지, embedding model 등)는 비공개.
- 권한 모델 차이: GBrain은 git markdown / flat-file 권한 → 다중 운영자 격리가 design center가 아님 ↔ Computer Memory는 enterprise SSO + SOC 2 compliance를 전제로 한 권한.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 글에는 정량 벤치마크가 없다. 인용된 정량 수치는:

- GBrain 운영 사례: 17,888 pages · 4,383 contacts · 723 companies (Tan의 personal brain).
- AirSync 커넥터 수: 50+ 시스템 (Salesforce, Jira, Zendesk, Slack 명시).
- 규제 표준: SOC 2.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 글이 짧고 마케팅 톤이 섞여 있어 **Computer Memory의 내부 retrieval 아키텍처는 비공개**. GBrain 만큼 디테일 검증이 어려움.
- "GBrain은 manual ingestion"이라는 묘사는 부분적 — `mantena-2026-hermes-gbrain-setup-vps` 가이드는 Hermes가 자동으로 brain page를 쓰고 cron이 sync하는 흐름을 보여 주므로, 정확히는 *"first-class enterprise connector가 부재"* 정도가 맞다.
- 멀티테넌트·권한·SOC 2가 진짜 필요한 조직과 *plain text ownership + 개인 brain*이 필요한 운영자는 거의 다른 사용자 군이므로 비교 자체가 zero-sum이 아님 — 글이 이 점을 충분히 강조하지 않음.

## 6. 관련 연구 (Related Work)

- [[applications/garrytan-gbrain]] — 본 글이 묘사하는 GBrain의 1차 소스.
- [[applications/vectorize-2026-gbrain-review-honest-assessment]] — GBrain의 single-operator 한계와 "no multi-tenant readiness 1/5"가 본 글의 비교 프레임을 뒷받침.
- [[applications/mantena-2026-hermes-gbrain-setup-vps]] — Hermes + GBrain으로 ingestion을 자동화해서 "manual ingestion" 묘사의 한계를 보여 줌.
- Karpathy LLM Wiki 패턴 — 본 글은 직접 호명하지 않지만 GBrain·본 ai-wiki가 공유하는 thesis.

## 7. 용어집 (Glossary)

- **AirSync**: DevRev의 양방향 sync 엔진. 50+ SaaS와 real-time 양방향 동기화.
- **Computer Memory** (DevRev): GBrain의 엔터프라이즈 대응품으로 포지셔닝되는 DevRev 제품. 조직 전체에서 compound + SOC 2.
- **Compiled truth + append-only timeline**: GBrain page schema. 상단=현재 진실, 하단=증거 ledger.
- **Dream cycle**: GBrain의 야간 자동 enrichment + citation fixer.
- **SOC 2**: System and Organization Controls 2 — SaaS 보안 통제 표준.
