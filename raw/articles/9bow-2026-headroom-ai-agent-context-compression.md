---
title: "headroom: AI 에이전트 컨텍스트 압축 도구"
type: article
year: 2026
category: agents
raw_path: raw/articles/9bow-2026-headroom-ai-agent-context-compression.md
raw_filename: "9bow-2026-headroom-ai-agent-context-compression.md"
source_collection: external
author: "9bow (박정환)"
url: "https://discuss.pytorch.kr/t/headroom-ai-llm-95/10936"
publisher: "PyTorch KR (discuss.pytorch.kr)"
tags:
  - headroom
  - context-compression
  - token-reduction
  - ai-agents
  - korean
  - community
---

> 이 파일은 rule #1 예외(사용자가 명시적으로 지정한 자료 수집)에 따라 `WebFetch`로 취득한 본문 추출본이다. 원문은 위 `url` 참조.

# headroom: AI 에이전트 컨텍스트 압축 도구

**작성:** 9bow (박정환) · **게시:** 2026-06-29 · **분류:** 읽을거리&정보공유 · PyTorch KR

## Overview

headroom은 AI 에이전트가 처리하는 입력 데이터를 LLM에 전달하기 전에 압축하는 계층이다. 저자들은 "같은 답을 유지하면서 토큰만 줄이는 것"을 목표로 하며, 실제 워크로드에서 60~95% 토큰 감소를 보고한다.

## Key Features

- **ContentRouter 기반 압축:** JSON, 코드, 산문 등 입력 유형을 자동 감지해 적절한 압축기 선택
- **Local-first 설계:** 데이터를 외부로 전송하지 않고 로컬 처리
- **다중 배포 모드:** 라이브러리, proxy, MCP 서버, 래퍼

## Real-world Results

| 워크로드 | 압축 전 | 압축 후 | 절감률 |
|---|---:|---:|---:|
| 코드 검색 (100건) | 17,765 | 1,408 | 92% |
| SRE 장애 디버깅 | 65,694 | 5,118 | 92% |
| GitHub 이슈 분류 | 54,174 | 14,761 | 73% |

정확도는 GSM8K 벤치마크에서 기준선과 동일하게 유지되었다.

## Installation

```bash
pip install "headroom-ai[all]"   # Python
npm install headroom-ai          # Node/TypeScript
```

## License

Apache 2.0 (개인·상업 사용 가능)

**Resources:** Official Docs (headroom-docs.vercel.app/docs) · GitHub (github.com/headroomlabs-ai/headroom)
