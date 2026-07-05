---
title: "GBrain 저장소 핵심 정리: 아키텍처, 기능, 보안, 운영 흐름"
type: article
year: 2026
category: applications
raw_path: raw/articles/tilnote-2026-gbrain-repository-core-summary.md
raw_filename: "tilnote-2026-gbrain-repository-core-summary.md"
source_collection: external
author: "tilnote"
url: "https://tilnote.io/pages/69dc560edf448d30aa397f00"
publisher: "tilnote.io"
tags: [gbrain, architecture, contract-first, operations, security, versioning, korean-community]
---

## 한 줄 요약 (One-line Summary)

GBrain 저장소를 "얇은 실행기·두꺼운 스킬"과 "operations.ts 단일 진실 공급원(계약 우선)"이라는 두 설계 축으로 읽어낸 한국어권 정리. 특히 v0.3→v0.9의 **버전별 진화 궤적**을 하나의 스토리로 꿰어, 다른 요약에 없는 "이 시스템이 어떤 순서로 자랐는가"를 보여준다.

## 1. 자료 정보 (Document Information)

- tilnote.io 페이지, 작성자 tilnote, 2026-04-13.
- garrytan/gbrain를 아키텍처·기능·보안·운영·버전 다섯 축으로 분해한 secondary 요약.

## 2. 주요 기여 (Key Contributions)

1. **설계 철학을 두 축으로 요약**: "thin harness, fat skills" + `operations.ts` 계약 우선(single source of truth).
2. **버전 진화 궤적 제시**: v0.3.0(계약 우선) → v0.4.0(운영 기능) → v0.8.0(음성) → v0.9.0(운영 도구) → v0.9.1+(보안·성능). gbrain 자료 중 드물게 시간축 서사를 담음.
3. **보안·안정성 항목을 실전 문제 목록으로 정리**: 검색 제한·경로 검증·XSS·비밀 스캔·동시성 잠금·PGLite 파일 잠금.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

- **설계 축**: thin harness / fat skills, `operations.ts`를 단일 진실 공급원으로 삼는 contract-first.
- **주요 기능**: CLI·MCP 양쪽 일관 처리 / Git(텍스트)+클라우드(대용량) 혼합 저장 / 발행(민감정보 제거·암호화·self-contained HTML) / 음성 워크플로(통화 인증·끊김 방지·후처리) / 운영 도구(check-backlinks·lint·report).
- **운영 원칙**: 백링크 강제로 양방향 연결, 주제 중심 파일링, 모든 사실에 출처 표기.
- **보안·안정성**: 검색 제한, 경로 검증, XSS 방어, 비밀 스캔, 동시성 잠금, PGLite 파일 잠금.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- 벤치마크 없음(구조 정리 글). 기여는 정성적 — 버전 진화 서사와 보안 항목 체크리스트.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 버전 번호(v0.3~v0.9)는 정리 시점 기준으로, README 최신(v0.36.x)과 큰 격차 — 초기 아키텍처 스냅샷으로 읽어야 한다.
- 수치·벤치마크가 없어 정량 근거는 [[applications/garrytan-gbrain]]·[[applications/vectorize-2026-gbrain-review-honest-assessment]]로 보완 필요.

## 6. 관련 연구 (Related Work)

- [[applications/garrytan-gbrain]] — 원 저장소 README(최신 아키텍처·벤치마크).
- [[applications/xguru-2026-gbrain-open-source-personal-knowledge]] — 같은 저장소의 다른 한국어권 소개.
- [[overviews/gbrain-ecosystem-overview]] — gbrain 생태계 상위 지도.

## 7. 용어집 (Glossary)

- **계약 우선(contract-first)**: 작업 정의(`operations.ts`)를 먼저 못박고 CLI·MCP 등 표면을 거기서 파생시키는 설계.
- **thin harness, fat skills**: 실행기는 얇게, 행동 로직은 교체 가능한 스킬(markdown)에 두는 원칙.
- **self-contained HTML**: 외부 의존 없이 단일 파일로 열람 가능하게 만든 발행 산출물.
