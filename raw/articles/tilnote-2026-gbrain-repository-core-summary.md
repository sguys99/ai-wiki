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

# GBrain 저장소 핵심 정리: 아키텍처, 기능, 보안, 운영 흐름

> tilnote.io 페이지. 작성자 tilnote, 2026-04-13. WebFetch 수집(2026-07-05).

GBrain은 개인 지식 저장소로서 "얇은 실행기, 두꺼운 스킬(thin harness, fat skills)"이라는 핵심 방향을 추구하며, `operations.ts`를 단일 진실 공급원(single source of truth)으로 삼는 계약 우선(contract-first) 설계를 채택했다.

## 주요 기능

- CLI와 MCP 양쪽에서 일관된 작업 처리
- 파일 저장: Git(텍스트)과 클라우드(대용량) 혼합 운영
- 발행 기능: 민감정보 제거·암호화·자체 포함형(self-contained) HTML 변환
- 음성 워크플로: 통화 인증, 끊김 방지, 후처리 포함
- 운영 도구: check-backlinks, lint, report 등 정기 점검

## 운영 원칙

- 백링크 강제로 양방향 연결 관리
- 주제 중심 파일링
- 모든 사실에 출처 표기

## 보안 및 안정성

검색 제한, 경로 검증, XSS 방어, 비밀(secret) 스캔, 동시성 잠금, PGLite 파일 잠금 등 실전적 문제 해결에 중점.

## 버전 진화

v0.3.0(계약 우선 아키텍처) → v0.4.0(운영 기반 기능) → v0.8.0(음성 레시피) → v0.9.0(운영 도구 강화) → v0.9.1+(보안·성능 다듬기).
