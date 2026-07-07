---
title: "Agent Skills (agentskills/agentskills)"
type: repo
year: 2026
category: agents
raw_path: /home/sguys99/project/ai-wiki/raw/repos/agentskills-agentskills.md
raw_filename: "agentskills-agentskills.md"
source_collection: external
org: "agentskills"
repo: "agentskills"
url: "https://github.com/agentskills/agentskills"
license: "Apache-2.0 (code) / CC-BY-4.0 (docs)"
tags: [agent-skills, open-standard, skill-md, progressive-disclosure, specification, ecosystem]
---

## 한 줄 요약 (One-line Summary)

Anthropic이 만든 Agent Skills 포맷을 벤더 중립 오픈 표준으로 풀어 쓴 저장소다. `SKILL.md` 폴더 규격과 progressive disclosure 3단계(discovery → activation → execution)를 정해두고, 스펙은 커뮤니티 기여로 이어간다.

## 1. 자료 정보 (Document Information)

- **저장소**: `agentskills/agentskills` (GitHub).
- **라이선스**: 코드 Apache-2.0, 문서 CC-BY-4.0.
- **성격**: 코드보다 문서에 무게가 실린 저장소 — 포맷 스펙·기여 가이드·클라이언트 쇼케이스로 오픈 표준을 관리한다. 실제 문서 사이트는 [[agents/agentskills-io-2026-agent-skills-overview|agentskills.io]].

## 2. 주요 기여 (Key Contributions)

1. **포맷을 Anthropic 밖으로** — "originally developed by Anthropic, released as an open standard"로, 특정 벤더 제품이 아니라 생태계 공통 규격임을 선언.
2. **최소 규격 명문화** — 스킬 = `SKILL.md`(필수, `name`·`description` 최소) 하나를 품은 폴더. scripts/references/assets는 선택.
3. **3단계 로딩(progressive disclosure)** — discovery(이름·설명만) → activation(본문 로드) → execution(코드 실행/참조 로드)로 컨텍스트 발자국을 줄인다.
4. **기여 채널** — `CONTRIBUTING.md`, GitHub, Discord로 외부 기여를 받는 거버넌스.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

표준 폴더 레이아웃:

```
my-skill/
├── SKILL.md          # 필수: 메타데이터 + 지시문
├── scripts/          # 선택: 실행 코드
├── references/       # 선택: 문서
├── assets/           # 선택: 템플릿·리소스
└── ...
```

- **세 가지 가치**로 정리: domain expertise(전문 지식), repeatable workflows(반복 워크플로), cross-product reuse(한 번 만들어 여러 에이전트에서 재사용).
- **로딩 3단계**: full instructions는 태스크가 부를 때만 로드한다 → 스킬을 많이 "손에 쥐고도" 컨텍스트 부담이 작다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

벤치마크는 없다(스펙 저장소). 성과 지표는 채택 폭인데, 여러 AI 도구·에이전트 클라이언트가 이 포맷을 지원한다고 밝히며 Client Showcase로 연결한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **스펙 성숙도**: 초기 오픈 표준 단계 — 버전·거버넌스가 계속 진화 중.
- **레퍼런스 스킬**: 실제 예시는 별도 저장소(`anthropics/skills`)로 분리.

## 6. 관련 연구 (Related Work)

- [[agents/anthropic-2025-equipping-agents-for-the-real|Anthropic 발표글]] — 이 포맷의 설계 근거·도식 원전.
- [[agents/agentskills-io-2026-agent-skills-overview|agentskills.io]] — 같은 내용의 공식 문서 사이트(클라이언트 쇼케이스 포함).

## 7. 용어집 (Glossary)

- **Discovery / Activation / Execution**: progressive disclosure 3단계.
- **Open standard**: 특정 벤더에 종속되지 않고 커뮤니티가 함께 다듬는 규격.
