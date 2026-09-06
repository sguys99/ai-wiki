---
title: "DESIGN.md: A format specification for describing a visual identity to coding agents"
type: repo
year: 2026
category: agents
raw_path: raw/repos/google-labs-code-design-md.md
raw_filename: "google-labs-code-design-md.md"
source_collection: external
org: "google-labs-code"
repo: "design.md"
url: "https://github.com/google-labs-code/design.md"
license: "Apache-2.0"
tags: [design-system, design-tokens, coding-agent, context-engineering, spec, cli, tailwind, dtcg, portable-context]
---

## 한 줄 요약 (One-line Summary)

Google Labs가 만든 **DESIGN.md** — 디자인 시스템(색·타이포·간격·컴포넌트)을 코딩 에이전트에게 "지속 가능하고 구조화된 맥락"으로 넘기는 포맷 스펙 겸 CLI(`@google/design.md`)다. YAML front matter(기계용 토큰)와 Markdown 본문(사람용 설계 근거)을 한 파일에 합쳤고, **토큰이 아니라 산문(prose)이 스펙의 핵심**이라는 철학을 깔고 있다.

## 1. 자료 정보 (Document Information)

- **저장소**: [google-labs-code/design.md](https://github.com/google-labs-code/design.md) (Apache-2.0, 2026-04 생성)
- **홈페이지**: Google Stitch 문서 내 DESIGN.md specification
- **상태**: 포맷 버전 `alpha` — 스펙·토큰 스키마·CLI 모두 활발히 개발 중
- **패키지**: `@google/design.md` (npm), 정본 스펙은 repo 내 `docs/spec.md`
- **구성**: `docs/spec.md`(스펙), `PHILOSOPHY.md`(철학), `examples/`(atmospheric-glass·paws-and-paths·totality-festival 3종 예시), `packages/cli/`(TypeScript·Bun 기반 CLI)

## 2. 주요 기여 (Key Contributions)

1. **portable 디자인 컨텍스트 포맷**: 단일 `.md` 파일 하나로 디자인 시스템을 표현해, 에이전트가 생성마다 일관된 UI를 만들도록 맥락을 이어준다. MCP나 Skill 없이 파일째 로드하는 방식이다.
2. **토큰 + 산문 이중 레이어**: YAML 토큰은 정규값(normative)이고, 산문은 "왜 그 값인가"와 적용 방식을 서술한다. 둘 중 산문이 우선한다.
3. **CLI 4개 명령**: `lint`(9개 규칙으로 구조 검증) · `diff`(버전 간 토큰/회귀 비교) · `export`(Tailwind v3/v4·W3C DTCG로 변환) · `spec`(스펙을 프롬프트 주입용으로 출력).
4. **상호운용성(interoperability)**: W3C Design Token Format에서 영감을 받았다. Tailwind v3 config(JSON)·Tailwind v4 `@theme`(CSS)·DTCG `tokens.json` 세 포맷으로 export한다.
5. **확장 가능 스키마**: 표준화가 유용한 최소 카테고리(colors·typography·spacing·rounded·components)만 고정하고, motion·iconography·elevation 같은 나머지는 사용자가 자유롭게 키를 더하도록 열어뒀다. 커스텀 키는 린터가 조용히 통과시킨다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 파일 구조 (2 레이어)

1. **YAML front matter** — 파일 상단 `---` 펜스 안의 기계 판독 토큰.
2. **Markdown body** — `##` 섹션으로 조직된 사람 판독 설계 근거.

### 토큰 스키마

```yaml
version: <string>        # optional, 현재 "alpha"
name: <string>
description: <string>    # optional
colors: { <token>: <Color> }
typography: { <token>: <Typography> }
rounded: { <scale>: <Dimension> }
spacing: { <scale>: <Dimension | number> }
components:
  <component>: { <token>: <string | token reference> }
```

- **Color**: 모든 CSS 색(`#1A1C1E`, `oklch(...)`, named 등)
- **Dimension**: 숫자+단위(`48px`, `-0.02em`)
- **Token Reference**: `{path.to.token}` (예: `{colors.primary}`)
- **Typography**: `fontFamily`·`fontSize`·`fontWeight`·`lineHeight`·`letterSpacing`·`fontFeature`·`fontVariation` 객체
- **Component 속성**: `backgroundColor`·`textColor`·`typography`·`rounded`·`padding`·`size`·`height`·`width`. hover·active 등 변형은 별도 컴포넌트 엔트리(`button-primary-hover`)로 표현.

### 섹션 순서 (canonical order, 생략 가능하되 순서는 고정)

Overview → Colors → Typography → Layout → Elevation & Depth → Shapes → Components → Do's and Don'ts

### Unknown content 처리 규칙

미지의 섹션 헤딩·색 토큰·타이포 토큰은 **보존/수용**, 미지의 컴포넌트 속성은 경고와 함께 수용, **중복 섹션 헤딩만 에러**로 파일 거부.

### 철학 (PHILOSOPHY.md 핵심)

- **"생성된 디자인의 품질은 값의 정밀도보다 의도가 얼마나 명확히 서술됐는가에 더 좌우된다."**
- **산문이 스펙의 초점**: 토큰 값은 렌더링 지시가 아니라 맥락(context)이다. 스펙이 토큰 요구사항을 강제하지 않는 건, 기존 언어·도구가 수십 년간 쌓은 작업을 다시 만들지 않겠다는 태도다.
- **구체적 레퍼런스 > 형용사 나열**: "1970년대 명문대 대학원 강의 유인물"이라는 한 문장이 열두 개 수치값보다 많은 정보를 담는다. 형용사("modern, clean, trustworthy")는 영역(region)을 가리키고 구체적 레퍼런스는 점(point)을 찍기 때문에, 뻔한(generic) 출력을 피한다.
- **Negative constraints는 공짜로 따라온다**: 충분히 구체적인 레퍼런스는 "무엇이 아닌지"까지 저절로 담는다(강의 유인물은 발광이나 그라데이션을 쓰지 않는다). 개(dog)라고 이름 붙이면 "야옹 하지 않는다"가 따라오는 식이다. 강한 레퍼런스에 의도된 do/don't 목록을 더한 지점이 sweet spot이다.
- **포맷은 스펙이 아니라 사용자를 통해 성장**: motion·iconography·elevation처럼 유연성이 필요한 카테고리는 열어뒀다. 한 팀의 motion 토큰은 CSS easing이지만 다른 팀은 오디오 버퍼 블록 단위일 수 있고, 이런 차이를 스펙 변경 없이 커스텀 키로 정의한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크는 repo 자체엔 없음(포맷 스펙 + 도구). 대신:

- **린터 9규칙**: `broken-ref`(error) · `missing-primary`(warn) · `contrast-ratio`(WCAG AA 4.5:1 미만, warn) · `orphaned-tokens`(warn) · `token-summary`(info) · `missing-sections`(info) · `missing-typography`(warn) · `section-order`(warn) · `unknown-key`(오타 의심 키, warn).
- **exit code 규약**: `lint`은 에러 있으면 1. `diff`는 회귀(after에 에러/경고 증가) 시 1. `export`는 성공 0 / 잘못된 format·emitter 에러 1 / 입력 못 읽음 2.
- **프로그램 API**: `import { lint } from '@google/design.md/linter'` → `report.findings`·`report.summary`·`report.designSystem`.
- **실전 검증**: 별도 자료 [[agents/hall-2026-atlassians-design-md-is-here]]에서 Atlassian이 ADS로 production 검증을 했다. DESIGN.md는 컨텍스트를 ~30% 점유하면서 토큰은 MCP의 2배를 태우는 트레이드오프가 실측됐다(파일째 일괄 로드의 대가다).

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **alpha 상태**: 포맷·스키마·CLI 모두 변경 예상. 프로덕션 의존은 위험.
- **일괄 로드 비용**: 파일 전체를 컨텍스트에 넣는 탓에 큰 디자인 시스템일수록 토큰 비용이 올라간다(Atlassian 실측으로 MCP 대비 2배). 부분만 참조하는 선택적 로딩 메커니즘이 없다.
- **Windows 마찰**: `.md` bin 이름이 Windows의 Markdown 파일 연결과 충돌해 `designmd` 별칭이 필요하다. `npm error ENOVERSIONS`는 대개 registry 미설정 문제다.
- **정본 spec은 repo 밖 링크에 의존**(`docs/spec.md` + Stitch 홈페이지)하고, 스펙 표면도 아직 유동적이다.
- **VRP 제외**: Google OSS 취약점 보상 프로그램 대상 아님(보안 성숙도 미보장 신호).

## 6. 관련 연구 (Related Work)

- **W3C Design Token Format (DTCG)**: 토큰 표현의 상위 표준. DESIGN.md는 여기서 영감받고 export 타깃으로 지원.
- **Tailwind v3/v4**: export 대상. v4는 CSS 변수 네임스페이스(`--color-*`·`--font-*`·`--radius-*` 등) 기반 `@theme` 블록.
- **[[agents/hall-2026-atlassians-design-md-is-here]]**: 이 포맷의 실전 검증 현장 보고(Atlassian). No context·MCP·Skill·DESIGN.md 4방식 비교.
- **[[agents/anthropic-2025-effective-context-engineering-for-ai]]**: DESIGN.md의 "산문=고신호 토큰" 철학이 context engineering 원칙과 직결.
- **[[agents/hada-2026-agent-skills]] / [[agents/osmani-2026-agent-skills]]**: portable 컨텍스트 전달 수단으로 Skill과 DESIGN.md는 경쟁·보완 관계.

## 7. 용어집 (Glossary)

- **DESIGN.md**: 디자인 시스템을 코딩 에이전트용 맥락으로 기술하는 단일 파일 포맷.
- **Token (design token)**: 색·크기·타이포 등 재사용 가능한 디자인 값. YAML front matter에 정의.
- **Token reference**: `{colors.primary}` 형태로 다른 토큰을 가리키는 참조.
- **Prose (산문)**: 토큰의 "왜/어떻게"를 서술하는 Markdown 본문. DESIGN.md 스펙의 실제 초점.
- **Negative constraint**: "하지 말 것"(don't). 구체적 레퍼런스가 자동으로 내포하는 제약.
- **DTCG**: W3C Design Tokens Community Group의 토큰 포맷 표준.
- **normative value**: 규범값 — 토큰은 정규값이나, 렌더 지시가 아닌 맥락으로 취급.
