---
title: "Headroom — 에이전트 컨텍스트 압축 개괄 (repo + 4 소개글)"
type: overview
year: 2026
category: overviews
source_collection: synthesis
sources:
  - headroomlabs-ai-headroom.md
  - tosea-2026-how-to-use-headroom-context.md
  - subratpati-2026-building-cost-efficient-agents-with.md
  - nedai-2026-headroom-token-compression-guide.md
  - 9bow-2026-headroom-ai-agent-context-compression.md
tags: [headroom, context-compression, token-reduction, ai-agents, proxy, mcp, ccr, cache-alignment, smartcrusher, cross-agent-memory, cost-optimization, local-first, cursor, claude-code, overview, synthesis]
---

## 요약 (Summary)

**Headroom**은 AI 에이전트가 읽는 모든 것(tool 출력·로그·RAG 청크·파일·대화 이력)을 LLM에 닿기 전에 압축해 토큰을 60~95% 줄이는 context compression layer다. 검색 품질을 손보는 대신, 이미 만들어진 컨텍스트를 줄이는 쪽에서 context window 예산 문제를 푼다.

이 overview는 wiki에 실재하는 5개 자료 — 정본 저장소 하나와 이를 각기 다른 각도에서 소개한 글 넷 — 을 한 장의 지도로 묶는다. 다섯 자료는 같은 도구를 다른 렌즈로 본다. 구조(repo), 선택 규칙(Tosea), 비용(Subrat Pati), Cursor 실전(Nedai), 정확도 보존(9bow)이 그 렌즈다.

| 자료 | 렌즈 | 이 자료만 주는 것 |
|---|---|---|
| [[agents/headroomlabs-ai-headroom|Headroom (repo)]] | 구조·전체 | 아키텍처·lifecycle·프로바이더·출력 토큰 절감·한계 전수 |
| [[agents/tosea-2026-how-to-use-headroom-context|How to Use Headroom (Tosea)]] | 선택 규칙 | 다섯 방식의 **언제 쓰고 언제 쓰지 마나**, 네이티브 compaction 비교표 |
| [[agents/subratpati-2026-building-cost-efficient-agents-with|Cost-Efficient Agents (Subrat Pati)]] | 비용 | 압축률을 **달러**로 환산 (45K 토큰 세션 = 유저당 하루 $11.25) |
| [[agents/nedai-2026-headroom-token-compression-guide|Headroom 사용법 (Nedai)]] | Cursor 실전 | Cursor Base URL 교체 절차 + Windows 한글 `PYTHONUTF8=1` 트러블슈팅 |
| [[agents/9bow-2026-headroom-ai-agent-context-compression|headroom 한국어 소개 (9bow)]] | 정확도 | GSM8K 압축 후에도 기준선 동일 — "토큰만 줄지 답은 안 나빠진다" |

## 하나의 그림: 어떻게 동작하나 (How It Works)

에이전트가 만든 컨텍스트는 LLM 제공자로 가기 전 단일 lifecycle을 통과한다.

```
Input → CacheAligner → ContentRouter → {SmartCrusher | CodeCompressor | Kompress-v2} → CCR → LLM
                                                                              ↑
                                                        원본을 로컬 캐시, 필요 시 headroom_retrieve로 되불러옴
```

- **CacheAligner** — timestamp·UUID 같은 동적 콘텐츠로 흔들리는 prefix를 안정화해 KV 캐시 hit을 살린다. "압축이 캐시를 깨서 손해 보는" 함정을 피하는 게 핵심이다 (Subrat Pati가 토큰 낭비 3원인 중 하나로 지목).
- **ContentRouter** — JSON은 `SmartCrusher`, 코드는 AST 기반 `CodeCompressor`, 산문은 학습된 `Kompress-v2-base`로 콘텐츠 유형에 따라 분기한다 (9bow가 세 축의 하나로 요약).
- **CCR (Compress-Cache-Retrieve)** — 손실 압축에서 사라진 맥락을 retrieval로 되살리는 가역 압축. 네이티브 compaction과 갈리는 Headroom의 시그니처 차별점이다.

## 다섯 붙이는 법과 선택 규칙 (Five Modes)

| 방식 | 언제 | 출처 강조 |
|---|---|---|
| **Library** | 커스텀 에이전트·LangChain·RAG를 직접 짤 때, 최대 제어 | Tosea, Subrat Pati |
| **Proxy** | 코드 변경 0, **테스트 출발점으로 가장 쉬움**. Cursor는 이 방식 | Tosea, Nedai |
| **Coding agent wrap** | `headroom wrap claude` — Claude Code·Codex·Aider 등 | Nedai(명령어), repo |
| **MCP server** | 모델이 작업 중 능동적으로 컨텍스트를 관리 | Tosea, Nedai |
| **Cross-agent memory** | 여러 에이전트가 같은 컨텍스트를 재발견하지 않게 | Tosea, repo |

> **Cursor 주의**: `wrap`이 아니라 proxy로 붙는다 (Base URL을 `http://localhost:8787`로 교체). 이 절차는 Nedai가 가장 구체적으로 남겼다.

## 합의된 수치 (Consensus Benchmarks)

네 소개글이 모두 저장소의 같은 표를 인용한다. 독립 재현이 아니라 유지보수자 자체 수치임에 유의한다 (Tosea·9bow 모두 "직접 `headroom stats`로 측정하라"고 단서를 달았다).

| 워크로드 | Before | After | 절감 |
|---|---:|---:|---:|
| Code search (100 results) | 17,765 | 1,408 | 92% |
| SRE incident debugging | 65,694 | 5,118 | 92% |
| GitHub issue triage | 54,174 | 14,761 | 73% |
| Codebase exploration | 78,502 | 41,254 | 47% |

**정확도 보존** (N=100): GSM8K 0.870→0.870, TruthfulQA 0.530→0.560, SQuAD v2·BFCL 97%. 반복·저엔트로피 콘텐츠는 크게 줄지만, 대부분 고유 신호인 codebase exploration은 덜 줄어든다.

## 언제 쓰지 말아야 하나 (When NOT to Use)

Tosea와 저장소가 공통으로 자인하는 반례가 있다. 가끔만 쓰거나, 프롬프트가 짧거나, 단일 제공자 네이티브 compaction으로 충분하거나, 로컬 프로세스를 못 돌리는 sandbox거나, 매번 전체 원문이 필요하면 얻는 게 적다. 고위험 워크플로는 압축이 모델이 보는 내용을 바꿀 수 있으니 품질 검증이 필수다.

## 읽는 순서 (Reading Path)

1. 개념·비용 감이 필요하면 → **Subrat Pati** (왜 필요한가를 달러로)
2. 실제로 붙이려면 → **Tosea** (어느 방식을, 언제) → Cursor라면 **Nedai**
3. 내부가 궁금하면 → **repo** (아키텍처·한계 전수)
4. "정확도가 정말 유지되나" 의심되면 → **9bow** (GSM8K 근거)

## 관련 페이지 (Related Pages)

- [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering]] — Headroom은 여기서 말하는 harness 계층(Prompt→Context→Harness)의 실물 인프라다. 컨텍스트를 압축·정렬로 다룬다.
- [[agents/osmani-2026-loop-engineering|Loop Engineering]] — 에이전트 운영 루프의 토큰 비용을 깎는 계층으로서의 Headroom.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval|Direct Corpus Interaction]] — 토큰 절약을 검색 쪽에서 푸는 반대편 접근. 압축(Headroom) ↔ vectorless retrieval의 대칭.
- [[overviews/agent-harness-engineering-overview|Agent Harness Engineering 개괄]] — Headroom이 인프라로 들어맞는 상위 프레임.

