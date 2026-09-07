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

Google Labs가 공개한 **DESIGN.md**는 디자인 시스템(색, 타이포그래피, 간격, 컴포넌트)을 코딩 에이전트에게 "지속적이고 구조화된 이해"로 넘기는 포맷 스펙이자 CLI(`@google/design.md`)다. 파일 하나에 YAML front matter(기계 판독 design token)와 Markdown 본문(사람 판독 설계 근거)을 합쳤고, PHILOSOPHY.md는 "스펙의 초점은 토큰이 아니라 산문(prose)"이라고 명시한다.

## 1. 자료 정보 (Document Information)

- **저장소**: [google-labs-code/design.md](https://github.com/google-labs-code/design.md), Apache-2.0
- **패키지**: `@google/design.md` (npm)
- **포맷 버전**: `alpha`. README의 Status 절은 스펙, 토큰 스키마, CLI가 모두 활발히 개발 중이며 포맷 변경을 예상해야 한다고 적는다.
- **정본 스펙 위치**: 저장소 안 `docs/spec.md`. README에 실린 것은 그 요약본(condensed reference)이라고 README가 직접 밝힌다.
- **이 raw 스냅샷의 범위**: `README.md`와 `PHILOSOPHY.md` 두 파일 전문. `docs/spec.md` 원문은 포함되지 않았다.

## 2. 주요 기여 (Key Contributions)

| 기여 | 내용 |
|---|---|
| portable 디자인 컨텍스트 포맷 | 단일 `.md` 파일로 디자인 시스템을 표현해, 에이전트가 생성을 반복해도 같은 디자인 언어를 유지하게 한다 |
| 토큰과 산문 이중 레이어 | YAML 토큰이 값을 정하고 Markdown 산문이 그 값의 이유와 적용 방식을 서술한다 |
| CLI 4개 명령 | `lint`(구조 검증), `diff`(버전 간 변화와 회귀 비교), `export`(Tailwind와 DTCG 변환), `spec`(스펙 출력) |
| 상호운용성 | W3C Design Token Format에서 영감을 받고, Tailwind v3 config와 Tailwind v4 `@theme`, DTCG `tokens.json`으로 변환한다 |
| 확장 가능한 최소 스키마 | 표준화가 유용한 카테고리만 고정하고 나머지는 사용자가 커스텀 키로 정의하게 열어뒀다 |

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 파일 구조 두 레이어

| 레이어 | 위치 | 대상 | 역할 |
|---|---|---|---|
| YAML front matter | 파일 상단 `---` 펜스 안 | 기계 판독 | 토큰 정의. README는 이를 normative value로 규정한다 |
| Markdown body | 펜스 아래 `##` 섹션 | 사람 판독 | 설계 근거. 토큰을 어떻게 적용하는지의 컨텍스트를 제공한다 |

README와 PHILOSOPHY.md의 표현에는 강조점 차이가 있다. README는 토큰을 normative value로 부르고 산문을 그 적용 컨텍스트로 설명한다. 반면 PHILOSOPHY.md는 토큰 값 자체를 렌더링 지시가 아닌 컨텍스트로 규정하고 산문을 "스펙에서 가장 중요한 부분"이라고 적는다. 두 문서가 공통으로 말하는 것은 산문이 스펙의 초점이라는 점이다.

### 토큰 스키마

```yaml
version: <string>          # optional, current: "alpha"
name: <string>
description: <string>      # optional
colors:
  <token-name>: <Color>
typography:
  <token-name>: <Typography>
rounded:
  <scale-level>: <Dimension>
spacing:
  <scale-level>: <Dimension | number>
components:
  <component-name>:
    <token-name>: <string | token reference>
```

표준화된 최상위 카테고리는 `name`과 함께 colors, typography, spacing, rounded, components 다섯 가지다.

### 토큰 타입 4종

| 타입 | 형식 | 예시 |
|---|---|---|
| Color | 모든 CSS 색 표기(hex, `rgb()`, `oklch()`, named 등) | `"#1A1C1E"`, `"oklch(62% 0.18 250)"` |
| Dimension | 숫자와 단위(`px`, `em`, `rem`) | `48px`, `-0.02em` |
| Token Reference | `{path.to.token}` | `{colors.primary}` |
| Typography | 객체 | 아래 속성 표 참고 |

Typography 객체가 받는 속성은 7종이다: `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`, `fontFeature`, `fontVariation`.

### 섹션 순서 8단계

섹션은 `##` 헤딩으로 쓴다. 생략은 되지만 존재하는 섹션은 아래 순서를 지켜야 한다.

| 순서 | 섹션 | 별칭(alias) |
|---|---|---|
| 1 | Overview | Brand & Style |
| 2 | Colors | 없음 |
| 3 | Typography | 없음 |
| 4 | Layout | Layout & Spacing |
| 5 | Elevation & Depth | Elevation |
| 6 | Shapes | 없음 |
| 7 | Components | 없음 |
| 8 | Do's and Don'ts | 없음 |

### 컴포넌트 토큰

컴포넌트는 이름 하나를 하위 토큰 속성 묶음에 대응시킨다.

```yaml
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.sm}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.tertiary-container}"
```

허용 속성은 8종이다: `backgroundColor`, `textColor`, `typography`, `rounded`, `padding`, `size`, `height`, `width`. hover, active, pressed 같은 변형(variant)은 별도 컴포넌트 엔트리로 표현하고 이름을 연관되게 짓는다.

### 미지 내용 처리 규칙

| 상황 | 소비자(consumer) 동작 |
|---|---|
| 미지의 섹션 헤딩 | 보존한다. 에러로 만들지 않는다 |
| 미지의 색 토큰 이름 | 값이 유효하면 수용한다 |
| 미지의 타이포그래피 토큰 이름 | 유효한 타이포그래피로 수용한다 |
| 미지의 컴포넌트 속성 | 경고와 함께 수용한다 |
| 중복 섹션 헤딩 | 에러. 파일을 거부한다 |

### 설계 철학

PHILOSOPHY.md의 핵심 명제는 한 문장으로 제시된다. "생성된 디자인의 품질은 값의 정밀도보다 의도가 얼마나 명확히 서술됐는지에 더 좌우된다."

- **산문이 스펙의 초점**: 토큰 값은 산문 안에서 참조되는 레퍼런스 역할에 머문다. 스펙이 토큰 요구사항을 받거나 권장하지 않는 이유로 문서는 "앞선 언어와 도구가 수십 년간 쌓은 작업을 다시 만들지 않기 위해"라고 적는다.
- **구체적 레퍼런스가 형용사 목록보다 많이 전달한다**: "오래되고 잘 확립된 대학의 전통을 따른 1970년대 대학원 강의 유인물"이라는 한 문장은 잉크 한 색, 넉넉한 여백, 읽기 크기의 serif, 장식의 부재까지 완결된 세계를 불러온다. 문서는 이 한 문장이 수치 열두 개보다 유용한 정보를 담는다고 본다. "Modern, clean, trustworthy, premium"처럼 형용사를 나열하면 모델은 그 단어들이 서술하는 영역의 중심에 있는 무언가를 만들고, 결과는 대개 generic하다. 형용사는 영역(region)을 서술하고 구체적 레퍼런스는 점(point)을 서술한다.
- **negative constraint는 공짜로 따라온다**: 레퍼런스가 명확하면 제약이 자동으로 딸려온다. 모델은 강의 유인물이 무엇인지 알고 무엇이 아닌지도 안다. 유인물은 발광하지 않고 그라데이션을 쓰지 않는다. 개(dog)라고 이름 붙이는 순간 개가 야옹하지 않는다는 사실이 함께 전달되는 것과 같다. 다만 의도적으로 작성한 don't 목록은 유용하고, 장황하게 늘어지는 목록은 서술이 너무 모호해 제약을 담아내지 못했다는 신호로 본다. 강한 레퍼런스와 의도적인 do/don't 목록이 함께 작동하는 지점이 sweet spot이다.
- **포맷은 스펙이 아니라 사용자를 통해 성장한다**: 스펙은 모든 DESIGN.md가 공유하는 구조적 최소치만 정의하고, 그 밖은 사용자가 정의한다. 포맷은 어떤 키, 어떤 섹션, 어떤 구조든 받아들인다.

문서가 유연성 쪽에 열어둔 카테고리는 5종으로 명시된다: motion, iconography, elevation, text casing, paragraph measure. 예로 한 팀의 motion 토큰은 CSS 애니메이션 커브이고 다른 팀은 버퍼 블록 단위로 재는 오디오 도메인 시간 상수다. 스펙을 고치지 않고 커스텀 키로 정의할 수 있으며, 린터가 값을 수용하고 에이전트는 산문을 읽는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크는 저장소 자체에 없다. 포맷 스펙과 도구이기 때문이다. 대신 검증 가능한 규격이 문서화돼 있다.

### CLI 명령 4종

모든 명령은 파일 경로 또는 stdin을 뜻하는 `-`를 받고, 출력은 기본적으로 JSON이다.

| 명령 | 하는 일 | 주요 인자 |
|---|---|---|
| `lint` | DESIGN.md의 구조적 정확성을 검증한다 | `file`(필수 위치 인자), `--format json` |
| `diff` | 두 DESIGN.md를 비교해 토큰 수준 변화를 보고한다 | `before`, `after`(둘 다 필수 위치 인자), `--format json` |
| `export` | 토큰을 다른 포맷으로 내보낸다 | `file`(필수), `--format`(필수) |
| `spec` | 포맷 스펙을 출력한다. 에이전트 프롬프트에 스펙 컨텍스트를 주입할 때 쓴다 | `--rules`, `--rules-only`, `--format markdown\|json` |

`spec` 명령의 옵션은 세 가지다. `--rules`(기본 `false`)는 활성 린팅 규칙 표를 뒤에 붙이고, `--rules-only`(기본 `false`)는 규칙 표만 출력하며, `--format`은 `markdown`(기본)과 `json` 중 하나다.

`lint` 출력은 finding 배열과 요약으로 구성된다. README 예시의 finding은 `severity`, `path`, `message` 세 키를 갖고, `summary`는 `errors`, `warnings`, `info` 개수를 담는다. `diff` 출력은 `tokens` 아래 섹션별로 `added`, `removed`, `modified` 목록을 두고 최상위에 `regression` 불리언을 둔다.

### 린터 9규칙

린터는 파싱된 DESIGN.md에 9개 규칙을 실행하고, 각 규칙은 고정된 심각도로 finding을 낸다.

| 규칙 | 심각도 | 검사 내용 |
|---|---|---|
| `broken-ref` | error | 정의된 토큰으로 해소되지 않는 토큰 참조 |
| `missing-primary` | warning | 색은 정의됐으나 `primary` 색이 없다. 에이전트가 하나를 자동 생성한다 |
| `contrast-ratio` | warning | 컴포넌트의 `backgroundColor`와 `textColor` 조합이 WCAG AA 최소치 4.5:1 미만 |
| `orphaned-tokens` | warning | 정의됐으나 어떤 컴포넌트도 참조하지 않는 색 토큰 |
| `token-summary` | info | 섹션별로 토큰이 몇 개 정의됐는지 요약 |
| `missing-sections` | info | 다른 토큰이 있는데 선택 섹션(spacing, rounded)이 빠져 있다 |
| `missing-typography` | warning | 색은 정의됐으나 타이포그래피 토큰이 없다. 에이전트가 기본 폰트를 쓴다 |
| `section-order` | warning | 섹션이 스펙의 canonical 순서를 벗어났다 |
| `unknown-key` | warning | 최상위 YAML 키가 알려진 스키마 키의 오타처럼 보인다(`colours:`가 `colors:`인 경우). 커스텀 확장 키는 조용히 통과한다 |

### exit code 규약

| 명령 | exit 0 | exit 1 | exit 2 |
|---|---|---|---|
| `lint` | 에러가 없을 때 | 에러가 발견됐을 때 | 없음 |
| `diff` | 회귀가 없을 때 | 회귀 감지 시(after 파일에 에러나 경고가 더 많음) | 없음 |
| `export` | 변환 성공. 원본의 lint finding 유무와 무관하다 | 잘못된 `--format` 또는 emitter 에러 | 입력 파일을 읽을 수 없을 때 |

`export`의 exit 0이 lint finding과 무관하다는 점은 README가 명시한다. finding으로 게이트를 걸려면 `lint`를 따로 실행해야 한다.

### 상호운용성

`export`가 받는 `--format` 값은 4개이고 실제 출력 대상은 3종이다.

| `--format` 값 | 출력 | 설명 |
|---|---|---|
| `json-tailwind` | JSON | Tailwind v3 `theme.extend` config 객체 |
| `css-tailwind` | CSS | CSS 커스텀 속성을 담은 Tailwind v4 `@theme { ... }` 블록 |
| `tailwind` | JSON | `json-tailwind`의 하위 호환 별칭 |
| `dtcg` | JSON | W3C Design Tokens Format Module |

Tailwind v4 출력이 쓰는 CSS 변수 네임스페이스는 8종이다: `--color-*`, `--font-*`, `--text-*`, `--leading-*`, `--tracking-*`, `--font-weight-*`, `--radius-*`, `--spacing-*`.

### 프로그램 API

린터는 라이브러리로도 제공된다.

```typescript
import { lint } from '@google/design.md/linter';

const report = lint(markdownString);

console.log(report.findings);       // Finding[]
console.log(report.summary);        // { errors, warnings, info }
console.log(report.designSystem);   // Parsed DesignSystemState
```

### 설치와 플랫폼 문제

| 상황 | 대응 |
|---|---|
| 일반 설치 | `npm install @google/design.md` |
| PowerShell 등에서 `@`를 특수문자로 처리 | 패키지 이름을 인용부호로 감싼다: `npm install "@google/design.md"` |
| Windows에서 `npx @google/design.md`가 출력이 없거나 편집기를 열어버림 | `design.md` bin 이름의 `.md` 접미사가 Windows의 Markdown 파일 연결과 명령 해소 단계에서 충돌한다. 점 없는 별칭을 쓴다: `npx -p @google/design.md designmd lint DESIGN.md` |
| `package.json` 스크립트에서 직접 호출 | `design.md` 대신 `designmd` 별칭을 쓴다 |
| `npm error ENOVERSIONS` | 대개 npm이 공개 registry를 조회하지 않는 문제다. `npm config get registry`가 `https://registry.npmjs.org/`인지 확인하고, 캐시된 404가 남았으면 `npm cache clean --force` 후 재시도한다 |

`designmd` shim은 같은 entrypoint로 해소되며 모든 플랫폼에서 동일하게 동작한다.

### 외부 실전 검증

저장소 밖 자료 [[agents/hall-2026-atlassians-design-md-is-here]]가 Atlassian Design System을 소재로 production 검증 결과를 보고한다. 그 자료의 실측에서 DESIGN.md는 디자인 시스템 컨텍스트를 약 30%만 확보하면서(MCP는 약 80%) 평균 컨텍스트 토큰은 MCP의 약 2배를 소비했다. 파일 전체를 한 번에 올리는 구조의 대가다. 이 수치는 이 저장소가 제시한 것이 아니므로 귀속을 분리해 둔다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **alpha 상태**: README가 스펙, 토큰 스키마, CLI 모두 활발히 개발 중이며 포맷 변경을 예상해야 한다고 명시한다. 프로덕션 의존은 이르다.
- **일괄 로드 비용**: 파일 전체를 컨텍스트에 올리는 구조라 디자인 시스템이 커지면 컨텍스트 토큰 비용도 함께 커진다. 부분만 참조하는 선택적 로딩 메커니즘이 스펙에 없다.
- **정본 스펙이 raw 스냅샷 밖에 있다**: README는 요약본이며 정본은 저장소의 `docs/spec.md`다. 이 자료만으로는 스펙 전문을 확인할 수 없다.
- **Windows 마찰**: `.md` bin 이름 충돌과 registry 오설정 두 가지가 README에 별도 문제 해결 절로 들어가 있을 만큼 자주 발생한다.
- **취약점 보상 프로그램 제외**: Disclaimer 절이 이 프로젝트가 Google Open Source Software Vulnerability Rewards Program 대상이 아니라고 밝힌다.
- **검증 범위의 한계**: 린터가 잡는 것은 구조와 참조 해소, 대비율이다. 산문의 품질이나 구체성은 자동 검사 대상이 아니며, 스펙이 산문을 가장 중요하다고 규정하는 것과 대비된다.

## 6. 관련 연구 (Related Work)

- **W3C Design Token Format**: 토큰 표현의 상위 표준. DESIGN.md 토큰이 여기서 영감을 받았고 `dtcg` export 대상이다.
- **Tailwind v3와 v4**: export 대상. v4는 CSS 변수 네임스페이스 기반 `@theme` 블록을 쓴다.
- **[[agents/hall-2026-atlassians-design-md-is-here]]**: 이 포맷의 production 검증 현장 보고. 컨텍스트 미제공, MCP, Skill, DESIGN.md 네 방식을 토큰과 시간, turn으로 비교한다.
- **[[agents/anthropic-2025-effective-context-engineering-for-ai]]**: 산문을 고신호 컨텍스트로 취급하는 DESIGN.md의 태도가 context engineering 원칙과 이어진다.
- **[[agents/hada-2026-agent-skills]]와 [[agents/osmani-2026-agent-skills]]**: portable 컨텍스트 전달 수단으로서 스킬과 DESIGN.md는 경쟁하면서 보완한다.

## 7. 용어집 (Glossary)

- **DESIGN.md**: 디자인 시스템을 코딩 에이전트용 컨텍스트로 기술하는 단일 파일 포맷.
- **design token**: 색, 크기, 타이포그래피처럼 재사용 가능한 디자인 값에 이름을 붙인 것. YAML front matter에 정의한다.
- **token reference**: `{colors.primary}` 형태로 다른 토큰을 가리키는 참조.
- **prose(산문)**: 토큰의 이유와 적용 방식을 서술하는 Markdown 본문. PHILOSOPHY.md가 스펙에서 가장 중요한 부분으로 규정한다.
- **negative constraint**: 하지 말 것에 해당하는 제약. 구체적인 레퍼런스가 자동으로 내포한다.
- **normative value**: 스펙이 규정하는 기준값. README가 토큰을 이렇게 부른다.
- **DTCG**: W3C Design Tokens Community Group이 정한 토큰 포맷 표준.
- **consumer**: DESIGN.md 파일을 읽어 처리하는 쪽(린터, 에이전트, 변환기). 미지 내용 처리 규칙이 이 동작을 규정한다.
