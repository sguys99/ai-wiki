---
title: "graphify (Graphify-Labs) — Any input → knowledge graph + /graphify skill"
type: repo
year: 2026
category: applications
raw_path: raw/repos/graphify-labs-graphify.md
raw_filename: "graphify-labs-graphify.md"
source_collection: external
org: "Graphify-Labs"
repo: "graphify"
url: "https://github.com/Graphify-Labs/graphify"
license: "MIT"
tags: [knowledge-graph, code-knowledge-graph, agent-skill, claude-code, mcp, tree-sitter, leiden, graphrag, repo, oss, yc-s26]
---

## 한 줄 요약 (One-line Summary)

`safishamsi/graphify`가 `Graphify-Labs/graphify`로 조직 이전하고 v0.9.15(2026-07-13)까지 업데이트된 공식판. 핵심 아키텍처(3-pass pipeline, tree-sitter AST, Leiden community detection)는 그대로다. 대신 README를 손봐 설치·사용법을 한결 단순하게 정리했다. 아키텍처 세부는 → [[applications/safishamsi-graphify]].

## 1. 자료 정보 (Document Information)

- **Org / Repo**: `Graphify-Labs/graphify`
- **이전 위치**: `safishamsi/graphify` (개인 계정 → 조직 이전)
- **버전**: v0.9.15 (2026-07-13 릴리스). 기존 스냅샷은 v0.8.28 (2026-06-01)
- **PyPI**: `graphifyy` (double-y, Python ≥ 3.10) — CLI는 `graphify`
- **License**: MIT
- **Stars**: 85.1k (2026-07-14 기준)
- **공식 웹사이트**: `www.graphify.com` (조직 이전 이후 취득)
- **Commits**: 1,093 (총 누적)
- **CHANGELOG**: v0.1.x (2026-04-03–05)까지만 기록되어 있음. v0.2.x 이후는 GitHub Releases 참조 필요
- **비고**: v0.9.15 README의 CI 배지가 여전히 `safishamsi/graphify`를 참조 — org 이전 후 일부 미업데이트 상태

## 2. 주요 기여 (Key Contributions)

아래는 v0.8.28 이후 변경이 확인된 사항만 기술한다. 기존과 동일한 핵심 기능(3-pass 파이프라인, confidence 등급, PR triage, MCP stdio 서버 등)은 → [[applications/safishamsi-graphify]] §2 참조.

1. **조직 이전 및 공식화**: `Graphify-Labs` GitHub 조직으로 이전하고 `www.graphify.com` 도메인을 취득했다. Y Combinator S26 이후 회사 단위 제품으로 자리 잡았다.
2. **README 단순화**: v0.8.x 당시의 33개 언어, 32개 모듈, PR triage, cross-repo graph 등 복잡한 CLI 옵션 대신, 핵심 사용 흐름(`/graphify .`)과 4가지 파일 유형(Code/Docs/Papers/Images) 중심으로 정리해 실사용 진입 장벽을 낮춘 셈이다.
3. **지원 언어 테이블 재정비**: Python, TypeScript, JavaScript, Go, Rust, Java, C, C++, Ruby, C#, Kotlin, Scala, PHP — README 기준으로 13개 언어다(v0.8.x README에서는 33개 언어 기재).
4. **기술 스택 표기 업데이트**: `NetworkX + Leiden (graspologic) + tree-sitter + Claude + vis.js`. graspologic을 Leiden 라이브러리로 명시했다.
5. **Karpathy 프레이밍 유지**: "Andrej Karpathy keeps a `/raw` folder — graphify is the answer to that problem" 서술이 v0.9.15에서도 그대로 간다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

아키텍처에는 변경이 없다. `detect() → extract() → build_graph() → cluster() → analyze() → report() → export()` 7단계 파이프라인 그대로다. 세부 모듈 설명, confidence 등급 rubric, extraction 출력 스키마는 → [[applications/safishamsi-graphify]] §3 참조.

출력 디렉토리 구조 (v0.9.15 README 기준):

```
graphify-out/
├── graph.html       interactive graph (click, search, filter by community)
├── obsidian/        Obsidian vault export
├── wiki/            Wikipedia-style articles (--wiki)
├── GRAPH_REPORT.md  god nodes, surprising connections, suggested questions
├── graph.json       persistent graph (query weeks later)
└── cache/           SHA256 cache (changed files only)
```

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

v0.9.15 README에도 동일 벤치마크 유지 (worked/ 디렉토리에서 재현 가능):

| Corpus | 파일 수 | 절감 |
|---|---:|---|
| Karpathy repos + 5 papers + 4 images | 52 | **71.5×** |
| graphify source + Transformer paper | 4 | **5.4×** |
| httpx (synthetic Python library) | 6 | ~1× |

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **CHANGELOG 공백**: v0.1.8(2026-04-05) → v0.9.15(2026-07-13) 사이 약 3개월의 변경 이력이 CHANGELOG에 빠져 있다. v0.2.x부터의 신규 기능은 GitHub Releases에서 따로 확인해야 한다.
- **org 이전 후 README 미정비**: CI 배지·manual install curl URL이 아직 `safishamsi/graphify`를 가리킨다.
- v0.8.x에서 확인된 한계(ghost node, HTML 5,000 노드 한계, Ollama VRAM 조정 등)는 → [[applications/safishamsi-graphify]] §5 참조.

## 6. 관련 연구 (Related Work)

- [[applications/safishamsi-graphify]] — 동일 프로젝트 v0.8.28 스냅샷. 3-pass 파이프라인·32 모듈·CLI 전체 문서화. 이 항목과 교차 참조.
- [[applications/garrytan-gbrain]] — 개인 knowledge brain vs. 코드/corpus KG builder 비교
- [[applications/liu-2026-rag-llm-wiki-or-gbrain]] — graphify가 retrieve+compile 축으로 분류되는 배경
- [[database/guo-2025-lightrag-simple-and-fast]] — graph-based RAG 계열 선행 연구
- [[overviews/lightrag-family-graph-rag-overview]] — graph RAG 계열 overview

## 7. 용어집 (Glossary)

변경/추가 용어만 기재. 나머지는 → [[applications/safishamsi-graphify]] §7 참조.

- **Graphify-Labs**: graphify 공식 GitHub 조직. `safishamsi` 개인 계정에서 이전. 공식 도메인 `www.graphify.com`.
- **graspologic**: Leiden community detection 라이브러리. v0.9.15 README에서 기술 스택에 명시.
