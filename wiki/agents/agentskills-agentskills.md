---
title: "Agent Skills (agentskills/agentskills)"
type: repo
year: 2026
category: agents
source: agentskills-agentskills.md
raw_path: raw/repos/agentskills-agentskills.md
raw_filename: "agentskills-agentskills.md"
source_collection: external
org: "agentskills"
repo: "agentskills"
url: "https://github.com/agentskills/agentskills"
license: "Apache-2.0 (code) / CC-BY-4.0 (docs)"
tags: [agent-skills, open-standard, skill-md, progressive-disclosure, specification, ecosystem]
---

## 요약 (Summary)

`agentskills/agentskills`는 Agent Skills 포맷을 벤더 중립 오픈 표준으로 관리하는 저장소다. Anthropic이 시작했지만 여기서는 특정 제품이 아니라 생태계 공통 규격으로 다룬다. 스킬의 최소 규격(`SKILL.md` 폴더)과 progressive disclosure 3단계(discovery → activation → execution)를 정하고, 코드는 Apache-2.0로, 문서는 CC-BY-4.0으로 배포한다. 코드보다는 문서가 중심이고, 실제 열람은 사이트 [[agents/agentskills-io-2026-agent-skills-overview|agentskills.io]]에서 이뤄진다.

## 주요 기여 (Key Contributions)

- **포맷을 Anthropic 밖으로** — "released as an open standard"로 벤더 종속을 끊고 커뮤니티 규격으로 선언.
- **최소 규격 명문화** — 스킬 = `SKILL.md`(필수, `name`·`description` 최소)를 품은 폴더. scripts/references/assets는 선택.
- **3단계 로딩** — discovery(이름·설명만) → activation(본문 로드) → execution(코드·참조 로드).
- **기여 거버넌스** — `CONTRIBUTING.md`·GitHub·Discord로 외부 기여를 수용.

## 표준 폴더 레이아웃 (Layout)

```
my-skill/
├── SKILL.md          # 필수: 메타데이터 + 지시문
├── scripts/          # 선택: 실행 코드
├── references/       # 선택: 문서
├── assets/           # 선택: 템플릿·리소스
└── ...
```

가치는 세 가지로 압축된다 — domain expertise(전문 지식), repeatable workflows(반복 워크플로), 그리고 한 번 만들어 여러 에이전트에서 다시 쓰는 cross-product reuse. full instructions는 태스크가 실제로 부를 때만 로드되니, 스킬을 잔뜩 쥐고 있어도 컨텍스트 부담은 크지 않다.

## 한계 (Limitations)

초기 오픈 표준인 만큼 버전과 거버넌스가 아직 계속 바뀐다. 실제 예시 스킬도 이 저장소가 아니라 별도 저장소(`anthropics/skills`)에 따로 있다. 벤치마크는 없어서, 성과는 채택된 폭으로 가늠하는 수밖에 없다.

## 관련 페이지 (Related Pages)

- [[agents/anthropic-2025-equipping-agents-for-the-real]] — 포맷 설계 근거와 도식 원전
- [[agents/agentskills-io-2026-agent-skills-overview]] — 이 저장소 문서가 렌더된 공식 사이트 + 클라이언트 쇼케이스
