---
title: "DESIGN.md — A format specification for describing a visual identity to coding agents"
type: repo
year: 2026
category: agents
raw_path: raw/repos/google-labs-code-design-md.md
raw_filename: "google-labs-code-design-md.md"
source: google-labs-code-design-md.md
source_collection: external
org: "google-labs-code"
repo: "design.md"
url: "https://github.com/google-labs-code/design.md"
license: "Apache-2.0"
tags: [design-system, design-tokens, coding-agent, context-engineering, spec, cli, tailwind, dtcg, portable-context]
---

# DESIGN.md (google-labs-code)

## 요약 (Summary)

Google Labs의 **DESIGN.md**는 디자인 시스템을 코딩 에이전트에게 넘기는 포맷 스펙이자 CLI(`@google/design.md`)다. `.md` 파일 하나에 **YAML front matter(기계용 디자인 토큰)** 와 **Markdown 본문(사람용 설계 근거)** 을 함께 담아, 에이전트가 생성을 반복해도 일관된 UI를 내도록 맥락을 유지시킨다. 핵심 철학은 한 문장이다 — **"토큰이 아니라 산문(prose)이 스펙의 초점"**. 토큰은 렌더링 지시가 아니라 맥락일 뿐이며, 디자인의 성패는 값의 정밀도가 아니라 의도를 얼마나 구체적으로 서술했느냐에 달렸다고 본다. 현재 버전은 `alpha`.

## 주요 기여 (Key Contributions)

- **portable 디자인 컨텍스트**: MCP·Skill 없이 파일째 로드하는 단일 `.md` 포맷. 에이전트는 생성할 때마다 같은 디자인 언어를 유지한다.
- **토큰 + 산문 이중 레이어**: YAML 토큰이 정규값(normative)을 정하고, 산문이 "왜 이 값인가·어떻게 적용하나"를 담는다. 우선순위는 산문 쪽이다.
- **CLI 4개 명령**: `lint`(9규칙 구조 검증) · `diff`(버전 간 토큰/회귀 비교) · `export`(Tailwind v3/v4·W3C DTCG 변환) · `spec`(스펙을 프롬프트 주입용으로 출력).
- **상호운용성**: W3C Design Token Format에서 영감. `json-tailwind`(v3 config) · `css-tailwind`(v4 `@theme`) · `dtcg`(W3C tokens.json)로 export.
- **개방형 스키마**: colors·typography·spacing·rounded·components만 표준화하고, motion·iconography·elevation 등은 커스텀 키로 자유롭게 확장. 린터는 커스텀 키를 조용히 통과시킨다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 파일 구조 — 2 레이어

1. **YAML front matter**: 상단 `---` 펜스 안 기계 판독 토큰.
2. **Markdown body**: `##` 섹션으로 나뉜 사람 판독 설계 근거.

### 토큰 스키마

```yaml
name: Heritage
colors:
  primary: "#1A1C1E"      # 헤드라인·본문 잉크
  secondary: "#6C7278"    # 보더·캡션·메타데이터
  tertiary: "#B8422E"     # "Boston Clay" — 상호작용 전용
  neutral: "#F7F5F2"      # 따뜻한 석회석 배경
typography:
  h1: { fontFamily: Public Sans, fontSize: 3rem }
  body-md: { fontFamily: Public Sans, fontSize: 1rem }
rounded: { sm: 4px, md: 8px }
spacing: { sm: 8px, md: 16px }
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"   # 토큰 참조
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.sm}"
    padding: 12px
```

- **Token Reference**: `{path.to.token}` 로 다른 토큰을 가리킨다.
- **Component 속성**: `backgroundColor`·`textColor`·`typography`·`rounded`·`padding`·`size`·`height`·`width`. hover·active 같은 변형은 별도 엔트리(`button-primary-hover`)로 둔다.
- **섹션 순서(고정)**: Overview → Colors → Typography → Layout → Elevation & Depth → Shapes → Components → Do's and Don'ts. 생략은 되지만 순서는 지켜야 한다.
- **Unknown content**: 미지의 섹션·색·타이포 토큰은 보존/수용, 미지 컴포넌트 속성은 경고 후 수용. **중복 섹션 헤딩만 에러**로 파일을 거부한다.

### 린터 9규칙

| 규칙 | 심각도 | 검사 내용 |
|---|---|---|
| `broken-ref` | error | 해소 안 되는 토큰 참조 |
| `missing-primary` | warning | primary 색 없음 (에이전트가 자동 생성) |
| `contrast-ratio` | warning | 컴포넌트 배경/글자 대비 WCAG AA(4.5:1) 미만 |
| `orphaned-tokens` | warning | 정의됐으나 어디서도 참조 안 된 색 |
| `token-summary` | info | 섹션별 토큰 수 요약 |
| `missing-sections` | info | spacing·rounded 등 선택 섹션 부재 |
| `missing-typography` | warning | 타이포 토큰 없음 (기본 폰트 사용) |
| `section-order` | warning | canonical 순서 위반 |
| `unknown-key` | warning | 오타 의심 최상위 키(`colours:`→`colors:`) |

### 설계 철학 (PHILOSOPHY.md)

- **구체적 레퍼런스 > 형용사**: "1970년대 명문대 대학원 강의 유인물"이라는 한 문장이 수치 열두 개보다 많은 정보를 담는다. 형용사("modern, clean, premium")가 영역을 가리키는 데 그친다면 구체적 레퍼런스는 점 하나를 정확히 찍고, 덕분에 generic한 출력을 피한다.
- **Negative constraints는 공짜로 온다**: 레퍼런스가 충분히 구체적이면 "무엇이 아닌지"까지 저절로 딸려온다. 강의 유인물은 발광하거나 그라데이션을 쓰지 않는다 — 굳이 적지 않아도 그렇다. 개를 지목하는 순간 "야옹하지 않는다"가 따라오는 것과 같다. 강한 레퍼런스에 의도된 do/don't 목록을 더한 지점이 sweet spot이다.
- **토큰은 맥락이지 지시가 아니다**: 스펙은 토큰 요구사항을 강제하지 않는다. 기존 언어와 도구가 수십 년간 쌓아온 작업을 굳이 다시 만들지 않겠다는 것이다.
- **포맷은 사용자를 통해 성장한다**: motion 토큰이 어느 팀에는 CSS easing이고 어느 팀에는 오디오 버퍼 블록일 수 있다. 그런 차이는 스펙을 고치지 않고 커스텀 키로 정의하면 되고, 린터가 받아주며 에이전트가 산문을 읽어낸다.

## 결과 (Results)

- **exit code 규약**: `lint`은 에러 시 1, `diff`는 회귀(after에 에러/경고 증가) 시 1, `export`는 성공 0 / format·emitter 에러 1 / 입력 못 읽음 2.
- **프로그램 API**: `import { lint } from '@google/design.md/linter'` → `report.findings`·`report.summary`·`report.designSystem`.
- **예시 3종**: `examples/`에 atmospheric-glass·paws-and-paths·totality-festival 이 각각 DESIGN.md·design_tokens.json·tailwind.config.js 세트로 제공된다.
- **Windows 주의**: `.md` bin 이름이 Markdown 파일 연결과 충돌 → `designmd` 별칭 사용. `ENOVERSIONS` 에러는 대개 npm registry 미설정.

## 한계 (Limitations)

- **alpha**: 포맷·스키마·CLI 모두 변경 예상. 프로덕션 의존은 이르다.
- **일괄 로드 비용**: 파일 전체를 컨텍스트에 넣는 구조라 디자인 시스템이 크면 토큰 비용도 커진다. [[agents/hall-2026-atlassians-design-md-is-here]]의 Atlassian 실측에서는 컨텍스트를 ~30% 점유했고 토큰은 MCP의 2배였다. 부분 로딩 메커니즘은 아직 없다.
- **정본 스펙이 repo 밖 링크에 의존**(`docs/spec.md` + Stitch 홈페이지) — 표면이 유동적.
- **Google OSS 취약점 보상(VRP) 대상 아님** — 보안 성숙도 미보장 신호.

## 관련 페이지 (Related Pages)

- [[agents/hall-2026-atlassians-design-md-is-here]] — 이 포맷을 Atlassian이 ADS로 production 검증한 현장 보고. No context·MCP·Skill·DESIGN.md 4방식을 토큰·시간·turn으로 비교. **정본(이 repo) ↔ 실전 검증** 짝.
- [[agents/anthropic-2025-effective-context-engineering-for-ai]] — "산문=고신호 토큰"이라는 DESIGN.md 철학이 context engineering 원칙과 곧바로 이어진다.
- [[agents/hada-2026-agent-skills]] · [[agents/osmani-2026-agent-skills]] — portable 컨텍스트 전달 수단으로서 Skill과 DESIGN.md는 경쟁·보완 관계.
