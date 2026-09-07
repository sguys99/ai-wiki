---
title: "DESIGN.md: A format specification for describing a visual identity to coding agents"
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

## 요약

DESIGN.md는 디자인 시스템을 코딩 에이전트에게 넘기기 위한 파일 포맷 규격이며, Google Labs가 Apache-2.0으로 공개했다. 색과 타이포그래피, 간격, 컴포넌트를 파일 하나에 적어 두면 에이전트가 그 파일을 읽고 같은 디자인 언어로 UI를 만든다.

파일은 두 층으로 나뉜다. 위쪽 YAML front matter에는 기계가 읽는 값이 들어가고, 아래쪽 Markdown 본문에는 사람이 읽는 설계 근거가 들어간다. 저장소에 함께 실린 PHILOSOPHY.md는 이 둘 중 아래쪽, 즉 산문(prose)이 스펙의 초점이라고 명시한다.

규격만 정의하고 끝내지 않고 `@google/design.md`라는 CLI도 함께 제공한다. 파일을 검증하는 `lint`, 두 버전을 비교하는 `diff`, Tailwind와 DTCG로 변환하는 `export`, 스펙 자체를 출력하는 `spec` 네 명령으로 구성된다. 포맷 버전은 `alpha`이고, README는 스펙과 스키마, CLI가 모두 개발 중이므로 변경을 예상해야 한다고 적는다.

이 페이지는 저장소 본체의 규격과 사용법을 다룬다. 이 포맷을 실제 제품 환경에서 검증한 결과는 [[agents/hall-2026-atlassians-design-md-is-here]]가 담당한다.

DESIGN.md가 담는 디자인 값을 원어로는 design token이라 부르고, 이 페이지는 이를 줄여 토큰으로 적는다. 언어 모델이 소비하는 단위를 뜻할 때만 컨텍스트 토큰이라고 구분해 적는다.

## 배경

이 포맷이 겨냥하는 문제는 생성과 생성 사이의 디자인 일관성이다. PHILOSOPHY.md는 스펙의 목적을 두 가지로 적는다. 생성과 생성 사이에 디자인을 일관되게 유지하는 것, 그리고 창작 탐색의 영역을 제공하는 것이다. README는 같은 목적을 에이전트에게 디자인 시스템에 대한 "지속적이고 구조화된 이해"를 준다는 표현으로 옮긴다.

지속성(persistent)이라는 단어가 문제의 성격을 짚는다. 에이전트가 화면을 여러 번 만들 때 디자인 언어가 매 회차에 다시 필요하다면, 그 언어는 세션 밖에 파일로 남아 있어야 한다. DESIGN.md는 그 파일의 형식을 정하는 규격이다.

여기서 이 저장소가 선택하지 않은 길도 분명하다. 새로운 렌더링 언어를 만들거나 토큰 표준을 다시 세우지 않는다. PHILOSOPHY.md는 스펙이 토큰 요구사항을 받거나 권장하지 않는 이유로 "앞선 언어와 도구가 수십 년간 쌓은 작업을 다시 만들지 않기 위해"라고 적는다. 따라서 DESIGN.md가 하려는 일은 값의 표준화가 아니라 의도의 전달이다.

## 핵심 개념

**design token**은 색이나 크기, 타이포그래피처럼 재사용 가능한 디자인 값에 이름을 붙인 것이다. `primary: "#1A1C1E"`처럼 이름과 값을 짝지어 두면 이후에는 값이 아니라 이름으로 가리킬 수 있다.

**token reference**는 `{colors.primary}`처럼 다른 토큰을 가리키는 표기다. 버튼의 배경색을 직접 hex로 쓰는 대신 팔레트의 이름을 참조해 두면, 팔레트를 고칠 때 버튼이 함께 따라온다.

**산문(prose)**은 YAML 아래에 오는 Markdown 본문을 뜻한다. 같은 값이 왜 그 값인지, 어디에 쓰고 어디에는 쓰지 않는지를 문장으로 적는 자리다. PHILOSOPHY.md가 스펙에서 가장 중요한 부분으로 규정하는 층이 여기다.

**normative value**는 스펙이 규정하는 기준값을 뜻한다. README는 YAML의 토큰을 normative value로 부르고, 산문은 그 값을 어떻게 적용하는지의 컨텍스트를 제공한다고 설명한다.

**negative constraint**는 "하지 말 것"에 해당하는 제약이다. PHILOSOPHY.md의 핵심 주장 하나가 구체적인 레퍼런스를 적으면 이 제약이 자동으로 따라온다는 것이다.

**consumer**는 DESIGN.md 파일을 읽어 처리하는 쪽을 뜻한다. 린터와 변환기, 그리고 에이전트가 모두 consumer다. 스펙이 미지 내용 처리 규칙으로 규정하는 대상이 이 consumer의 동작이다.

## 파일 구조

### 두 레이어

DESIGN.md 파일은 두 층으로 구성되고, 각 층의 독자가 다르다.

| 레이어 | 위치 | 독자 | 역할 |
|---|---|---|---|
| YAML front matter | 파일 상단 `---` 펜스 안 | 기계 | 토큰을 정의한다. README가 normative value로 규정하는 층 |
| Markdown body | 펜스 아래 `##` 섹션 | 사람 | 설계 근거를 서술한다. 토큰을 어떻게 적용하는지의 컨텍스트 |

README의 예시 파일을 보면 두 층이 어떻게 맞물리는지 드러난다.

```md
---
name: Heritage
colors:
  primary: "#1A1C1E"
  secondary: "#6C7278"
  tertiary: "#B8422E"
  neutral: "#F7F5F2"
typography:
  h1:
    fontFamily: Public Sans
    fontSize: 3rem
  body-md:
    fontFamily: Public Sans
    fontSize: 1rem
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 0.75rem
rounded:
  sm: 4px
  md: 8px
spacing:
  sm: 8px
  md: 16px
---

## Overview

Architectural Minimalism meets Journalistic Gravitas.

## Colors

- **Primary (#1A1C1E):** Deep ink for headlines and core text.
- **Secondary (#6C7278):** Sophisticated slate for borders, captions, metadata.
- **Tertiary (#B8422E):** "Boston Clay" - the sole driver for interaction.
- **Neutral (#F7F5F2):** Warm limestone foundation, softer than pure white.
```

YAML만 보면 `tertiary`는 벽돌색 하나에 불과하다. 산문이 붙으면 그 색이 "Boston Clay"라는 이름을 갖고 상호작용에만 쓰이는 유일한 색이라는 사실이 함께 전달된다. README는 이 파일을 읽은 에이전트가 Public Sans로 조판한 짙은 잉크색 헤드라인, 따뜻한 석회석 배경, Boston Clay 색 행동 유도 버튼을 갖춘 UI를 만들어 낸다고 설명한다.

### 토큰 스키마

최상위 키는 아래 형태를 따른다.

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

표준화된 카테고리는 `name`과 함께 colors, typography, spacing, rounded, components 다섯 가지다. `version`과 `description`은 선택이다. 이 다섯 가지 밖의 키는 스펙이 정의하지 않지만 금지하지도 않는다.

### 토큰 타입

값에 쓸 수 있는 타입은 네 가지다.

| 타입 | 형식 | 예시 |
|---|---|---|
| Color | 모든 CSS 색 표기(hex, `rgb()`, `oklch()`, named 등) | `"#1A1C1E"`, `"oklch(62% 0.18 250)"` |
| Dimension | 숫자와 단위(`px`, `em`, `rem`) | `48px`, `-0.02em` |
| Token Reference | `{path.to.token}` | `{colors.primary}` |
| Typography | 속성을 담은 객체 | 아래 표 참고 |

Color 타입이 CSS 색 표기를 그대로 받는다는 점은 앞서 말한 설계 태도와 이어진다. 색 표현 방식을 새로 정의하지 않고 CSS가 이미 정한 것을 쓴다.

Typography 객체가 받는 속성은 7종이다.

| 속성 | 지정 대상 |
|---|---|
| `fontFamily` | 서체 |
| `fontSize` | 글자 크기 |
| `fontWeight` | 굵기 |
| `lineHeight` | 행간 |
| `letterSpacing` | 자간 |
| `fontFeature` | OpenType feature |
| `fontVariation` | variable font의 변화 설정 |

### 섹션 순서

Markdown 본문의 섹션은 `##` 헤딩으로 쓴다. 섹션은 생략할 수 있지만, 파일에 존재하는 섹션은 아래 순서를 지켜야 한다. 일부 섹션은 별칭(alias)으로도 쓸 수 있다.

| 순서 | 섹션 | 별칭 |
|---|---|---|
| 1 | Overview | Brand & Style |
| 2 | Colors | 없음 |
| 3 | Typography | 없음 |
| 4 | Layout | Layout & Spacing |
| 5 | Elevation & Depth | Elevation |
| 6 | Shapes | 없음 |
| 7 | Components | 없음 |
| 8 | Do's and Don'ts | 없음 |

순서를 벗어나면 린터가 `section-order` 경고를 낸다. 다만 경고이므로 파일이 거부되지는 않는다.

### 컴포넌트 토큰

컴포넌트는 이름 하나를 하위 속성 묶음에 대응시키는 구조다. 배경색과 글자색을 팔레트에서 참조해 오는 방식이 전형적인 사용법이다.

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

허용 속성은 8종이다.

| 속성 | 지정 대상 |
|---|---|
| `backgroundColor` | 배경색 |
| `textColor` | 글자색 |
| `typography` | 적용할 타이포그래피 토큰 |
| `rounded` | 모서리 곡률 |
| `padding` | 내부 여백 |
| `size` | 크기 |
| `height` | 높이 |
| `width` | 너비 |

hover와 active, pressed 같은 변형(variant)을 위한 별도 문법은 없다. 위 예시의 `button-primary-hover`처럼 이름이 연관된 별개 컴포넌트 엔트리로 표현한다. 즉 상태는 중첩 구조가 아니라 이름 규칙으로 다룬다.

### 미지 내용 처리

스펙은 처음 보는 키와 섹션을 만났을 때 consumer가 어떻게 행동해야 하는지를 표로 규정한다. 대부분 수용하는 쪽으로 기울어 있고, 파일을 거부하는 경우는 하나뿐이다.

| 상황 | consumer 동작 |
|---|---|
| 미지의 섹션 헤딩 | 보존한다. 에러로 만들지 않는다 |
| 미지의 색 토큰 이름 | 값이 유효하면 수용한다 |
| 미지의 타이포그래피 토큰 이름 | 유효한 타이포그래피로 수용한다 |
| 미지의 컴포넌트 속성 | 경고와 함께 수용한다 |
| 중복 섹션 헤딩 | 에러. 파일을 거부한다 |

거부 사유가 중복 섹션 헤딩 하나로 좁혀진 이유는 구조상 명확하다. 같은 이름의 섹션이 둘이면 어느 쪽이 그 섹션의 내용인지 결정할 수 없다. 반면 처음 보는 색 이름은 값만 유효하면 해석에 모호함이 없다.

## 설계 철학

PHILOSOPHY.md는 핵심 명제를 한 문장으로 제시한다. "생성된 디자인의 품질은 값의 정밀도보다 의도가 얼마나 명확히 서술됐는지에 더 좌우된다."

### 산문 우선

문서는 산문을 "디자인이 사는 자리"로 부르고, 문서의 나머지 전부는 산문을 뒷받침하기 위해 존재한다고 적는다. 토큰 값은 렌더링 지시가 아니라 산문 안에서 참조되는 레퍼런스에 머문다.

PHILOSOPHY.md가 든 색 섹션 예시는 이 구조를 잘 보여준다. YAML은 색 네 개를 정의하고, 산문은 각 색에 금지 조건을 붙인다.

```
colors:
  paper: '#F4F0E4'
  ink: '#1E1A14'
  vermilion: '#C3402A'
  rule-gray: '#B8B0A2'
```

| 토큰 | 산문이 덧붙이는 규정 |
|---|---|
| `paper` | 캔버스. 따뜻해진 복사용지 색이며 순백은 절대 아니다 |
| `ink` | 흑연에 가까운 따뜻한 검정. 모든 타이포그래피와 괘선, 도식 선을 담당하며 순검정은 절대 아니다 |
| `vermilion` | 유일한 강조색. 도식과 차트 주석 안에만 나타나며 타이포그래피와 페이지 번호, 어떤 종류의 메타데이터에도 쓰지 않는다 |
| `rule-gray` | 본문 안 머리카락 굵기 괘선(차트 기준선, 표 구분선) 전용. 페이지 테두리 장식으로는 쓰지 않는다 |

같은 정보를 YAML만으로 표현할 방법은 없다. "순백은 아니다"라거나 "페이지 번호에는 쓰지 않는다"는 조건은 값이 아니라 문장이기 때문이다.

README와 PHILOSOPHY.md의 표현에는 강조점 차이가 있다. README는 토큰을 normative value로 부르고 산문을 그 적용 컨텍스트로 설명한다. PHILOSOPHY.md는 토큰 값 자체를 컨텍스트로 규정하고 산문을 스펙에서 가장 중요한 부분으로 적는다. 두 문서가 공통으로 말하는 것은 산문이 스펙의 초점이라는 점이다.

### 구체적 레퍼런스

PHILOSOPHY.md는 형용사를 나열하는 방식과 구체적인 대상을 지목하는 방식을 대비시킨다.

| 서술 방식 | 예시 | 모델이 받는 정보 |
|---|---|---|
| 형용사 나열 | "Modern, clean, trustworthy, premium" | 그 단어들이 서술하는 영역(region). 모델은 영역의 중심에 있는 무언가를 만들고 결과는 대개 generic하다 |
| 구체적 레퍼런스 | "오래되고 잘 확립된 대학의 전통을 따른 1970년대 대학원 강의 유인물" | 영역이 아니라 점(point). 잉크 한 색, 넉넉한 여백, 읽기 크기의 serif, 장식의 부재까지 완결된 세계 |

문서는 이 한 문장이 수치 열두 개보다 유용한 정보를 담는다고 본다. 값 자체가 아니라 값의 근거를 담기 때문이다.

문서가 예시로 제시한 Overview 섹션은 문체까지 구체적이다. 대학원 수준 컴퓨터과학 강의 유인물이고, 독자는 세미나 시작 때 배포된 인쇄물을 읽는 대학원생과 연구 엔지니어이며, 유인물은 "간결하고 정보 밀도가 높으며 첫인상에는 당당하게 무관심하다"고 적는다. 독자는 자기가 왜 여기 있는지 이미 알고 있으므로 유인물의 임무는 유혹이 아니라 일이라는 문장이 뒤따른다.

### negative constraint

레퍼런스가 명확하면 제약이 따라온다는 것이 이 절의 주장이다. 모델은 강의 유인물이 무엇인지 알고 무엇이 아닌지도 안다. 유인물은 발광하지 않고 그라데이션을 쓰지 않는다. 문서는 이를 개(dog)의 비유로 설명한다. 개라고 이름 붙이는 순간 개가 야옹하지 않는다는 사실이 함께 전달된다.

그렇다고 don't 목록이 무용하다는 뜻은 아니다. 문서는 의도적으로 작성한 don't 목록은 유용하다고 적고, 장황하게 늘어지는 목록은 서술이 너무 모호해 제약을 담아내지 못했다는 신호로 본다. 강한 레퍼런스와 의도적인 do/don't 목록이 함께 작동하는 지점을 sweet spot이라고 부른다.

PHILOSOPHY.md가 실은 Do's and Don'ts 예시는 12개 항목이다. 성격별로 묶으면 아래와 같다.

| 성격 | 항목 |
|---|---|
| 레이아웃 금지 | 제목 페이지에 hero 구간을 넣지 않는다. 실제 유인물의 제목 페이지는 잡지 표지가 아니라 본문의 첫 페이지다 |
| 문체 금지 | 큰 제목 아래 이탤릭 리드문을 두지 않는다. 그것은 Substack의 어법이다 |
| 장식 금지 | 여백에 코너 장식, 챕터 표시, 추상 글리프를 넣지 않는다 |
| 색 사용 금지 | 페이지 번호나 다른 메타데이터에 색을 넣지 않는다. vermilion은 도식 안에만 산다 |
| 서체 금지 | display 계열 serif를 쓰지 않는다. 한 가족을 적당한 네 가지 크기로만 쓴다 |
| 굵기 금지 | Bold를 쓰지 않는다. 어디에도 |
| 서체 역할 금지 | monospace 메타데이터 외의 역할에 sans-serif를 쓰지 않는다 |
| 효과 금지 | 다크 모드, 그라데이션, 발광, 유리 표면, 드롭 섀도, 둥근 모서리를 도입하지 않는다 |
| 매체 지침 | 유인물을 인쇄물로 다룬다. 화면은 바탕재이고 디자인은 지면이다 |
| 강조색 지침 | vermilion을 도식 안에 둔다. 밖에서의 희소함이 안에서의 존재를 의미 있게 만든다 |
| 크기 지침 | 작은 크기 차이를 신뢰한다. 섹션 제목은 본문의 다섯 배가 아니라 약 1.9배다 |
| 여백 지침 | 페이지에 눈에 보이는 여백을 남긴다. 3분의 2 지점에서 끝나는 페이지는 덜 채운 것이 아니라 올바른 것이다 |

목록의 항목들이 값이 아니라 판단 기준이라는 점을 눈여겨볼 만하다. "Bold를 쓰지 않는다"는 어떤 토큰 값으로도 표현할 수 없다.

### 열린 카테고리

스펙은 모든 DESIGN.md가 공유하는 구조적 최소치만 정의하고 그 밖은 사용자가 정의하게 남긴다. 포맷은 어떤 키, 어떤 섹션, 어떤 구조든 받아들인다.

| 구분 | 카테고리 |
|---|---|
| 스펙이 표준화한 것(일관성이 도움이 되는 자리) | colors, typography, spacing, rounded, components |
| 스펙이 열어둔 것(유연성이 더 도움이 되는 자리) | motion, iconography, elevation, text casing, paragraph measure |

문서가 든 근거는 motion의 사례다. 어느 팀의 motion 토큰은 CSS 애니메이션 커브이고 다른 팀은 버퍼 블록 단위로 재는 오디오 도메인 시간 상수다. 올바른 형태가 시스템마다 다르므로 스펙이 하나로 정하면 오히려 방해가 된다.

실제 작성 예시는 커스텀 키와 산문이 같은 방식으로 맞물린다는 것을 보여준다.

```
motion:
  feedback: 120ms
  content: 250ms
  easing: 'cubic-bezier(0.2, 0, 0, 1)'
```

산문 쪽에는 전환이 빠르고 기계적이며 아무것도 튀거나 넘치거나 머물지 않는다고 적는다. 상태 변화가 문이 닫히는 느낌이 아니라 전등 스위치 느낌이어야 한다는 비유가 붙는다. 적용 규칙은 상호작용 피드백에 `{motion.feedback}`, 콘텐츠 전환에 `{motion.content}`, 둘 다 같은 easing이고, UI의 어떤 요소도 300ms를 넘겨 애니메이션하지 않으며, `prefers-reduced-motion`을 존중해 모든 지속 시간을 0ms로 접는다는 내용이다.

여기서 스펙 변경은 한 줄도 필요하지 않았다. 린터가 값을 수용하고 에이전트는 산문을 읽는다. 토큰이 지시가 아니라 컨텍스트이기 때문에 가능한 확장이다.

## CLI 사용법

### 명령 4종

`@google/design.md` 패키지가 제공하는 명령은 네 개다. 모든 명령은 파일 경로 또는 stdin을 뜻하는 `-`를 받고, 출력은 기본적으로 JSON이다.

| 명령 | 하는 일 | 필수 인자 |
|---|---|---|
| `lint` | DESIGN.md의 구조적 정확성을 검증한다 | `file` |
| `diff` | 두 DESIGN.md를 비교해 토큰 수준 변화를 보고한다 | `before`, `after` |
| `export` | 토큰을 다른 포맷으로 내보낸다 | `file`, `--format` |
| `spec` | 포맷 스펙을 출력한다 | 없음 |

### lint

`lint`는 스펙 준수 여부와 깨진 token reference, WCAG 대비율을 검사하고 결과를 구조화된 JSON으로 낸다. 에이전트가 그 JSON을 읽고 후속 행동을 결정할 수 있게 하려는 설계다.

```bash
npx @google/design.md lint DESIGN.md
cat DESIGN.md | npx @google/design.md lint -
```

출력은 finding 배열과 요약으로 구성된다. finding은 `severity`, `path`, `message` 세 키를 갖고, `summary`는 `errors`와 `warnings`, `info` 개수를 담는다.

```json
{
  "findings": [
    {
      "severity": "warning",
      "path": "components.button-primary",
      "message": "textColor (#ffffff) on backgroundColor (#1A1C1E) has contrast ratio 15.42:1 - passes WCAG AA."
    }
  ],
  "summary": { "errors": 0, "warnings": 1, "info": 1 }
}
```

### diff

`diff`는 디자인 시스템의 두 버전을 비교해 토큰 수준 변화와 산문의 회귀를 감지한다.

```bash
npx @google/design.md diff DESIGN.md DESIGN-v2.md
```

출력은 `tokens` 아래 섹션별로 `added`와 `removed`, `modified` 목록을 두고 최상위에 `regression` 불리언을 둔다.

```json
{
  "tokens": {
    "colors": { "added": ["accent"], "removed": [], "modified": ["tertiary"] },
    "typography": { "added": [], "removed": [], "modified": [] }
  },
  "regression": false
}
```

회귀의 판정 기준은 after 파일에 에러나 경고가 더 많은지 여부다. 즉 값이 바뀌었다는 사실 자체가 아니라 린트 상태가 나빠졌는지를 본다.

### export

`export`는 토큰을 다른 도구가 읽을 수 있는 포맷으로 변환한다. 받는 `--format` 값은 4개이고 실제 출력 대상은 3종이다.

| `--format` 값 | 출력 | 설명 |
|---|---|---|
| `json-tailwind` | JSON | Tailwind v3 `theme.extend` config 객체 |
| `css-tailwind` | CSS | CSS 커스텀 속성을 담은 Tailwind v4 `@theme { ... }` 블록 |
| `tailwind` | JSON | `json-tailwind`의 하위 호환 별칭 |
| `dtcg` | JSON | W3C Design Tokens Format Module |

```bash
npx @google/design.md export --format json-tailwind DESIGN.md > tailwind.theme.json
npx @google/design.md export --format css-tailwind DESIGN.md > theme.css
npx @google/design.md export --format dtcg DESIGN.md > tokens.json
```

Tailwind v4 출력이 쓰는 CSS 변수 네임스페이스는 8종이다.

| 네임스페이스 | 대응 카테고리 |
|---|---|
| `--color-*` | 색 |
| `--font-*` | 서체 |
| `--text-*` | 글자 크기 |
| `--leading-*` | 행간 |
| `--tracking-*` | 자간 |
| `--font-weight-*` | 굵기 |
| `--radius-*` | 모서리 곡률 |
| `--spacing-*` | 간격 |

DESIGN.md의 토큰은 W3C Design Token Format에서 영감을 받았고, `dtcg` 출력이 그 표준의 tokens.json 형태다. 따라서 DESIGN.md를 원본으로 두고 기존 디자인 토큰 파이프라인에 연결하는 사용이 가능하다.

### spec

`spec`은 포맷 스펙 자체를 출력한다. 용도는 에이전트 프롬프트에 스펙 컨텍스트를 주입하는 것이다.

| 옵션 | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `--rules` | boolean | `false` | 활성 린팅 규칙 표를 뒤에 붙인다 |
| `--rules-only` | boolean | `false` | 린팅 규칙 표만 출력한다 |
| `--format` | `markdown` 또는 `json` | `markdown` | 출력 포맷 |

```bash
npx @google/design.md spec
npx @google/design.md spec --rules
npx @google/design.md spec --rules-only --format json
```

이 명령의 존재가 시사하는 바가 있다. DESIGN.md 파일 자체도 컨텍스트지만, 그 파일을 읽는 방법을 담은 스펙 역시 컨텍스트로 주입해야 하는 대상이라는 것이다.

### exit code 규약

CI에 연결할 때 필요한 규약은 명령마다 다르다.

| 명령 | exit 0 | exit 1 | exit 2 |
|---|---|---|---|
| `lint` | 에러가 없을 때 | 에러가 발견됐을 때 | 없음 |
| `diff` | 회귀가 없을 때 | 회귀 감지 시 | 없음 |
| `export` | 변환 성공. 원본의 lint finding 유무와 무관하다 | 잘못된 `--format` 또는 emitter 에러 | 입력 파일을 읽을 수 없을 때 |

`export`의 exit 0이 lint finding과 무관하다는 점은 README가 명시한다. finding으로 게이트를 걸려면 `lint`를 따로 실행해야 한다. 즉 변환과 검증의 책임이 분리돼 있다.

### 프로그램 API

린터는 CLI 외에 라이브러리로도 제공된다. 자체 도구에 검증을 넣을 때 쓰는 경로다.

```typescript
import { lint } from '@google/design.md/linter';

const report = lint(markdownString);

console.log(report.findings);       // Finding[]
console.log(report.summary);        // { errors, warnings, info }
console.log(report.designSystem);   // Parsed DesignSystemState
```

`report.designSystem`이 파싱된 상태 객체를 그대로 돌려준다는 점이 유용하다. 검증 결과만이 아니라 파싱 결과 자체를 재사용할 수 있다.

## 린터 규칙

린터는 파싱된 DESIGN.md에 9개 규칙을 실행하고, 각 규칙은 고정된 심각도로 finding을 낸다.

| 규칙 | 심각도 | 검사 내용 |
|---|---|---|
| `broken-ref` | error | 정의된 토큰으로 해소되지 않는 token reference |
| `missing-primary` | warning | 색은 정의됐으나 `primary` 색이 없다. 에이전트가 하나를 자동 생성한다 |
| `contrast-ratio` | warning | 컴포넌트의 `backgroundColor`와 `textColor` 조합이 WCAG AA 최소치 4.5:1 미만 |
| `orphaned-tokens` | warning | 정의됐으나 어떤 컴포넌트도 참조하지 않는 색 토큰 |
| `token-summary` | info | 섹션별로 토큰이 몇 개 정의됐는지 요약 |
| `missing-sections` | info | 다른 토큰이 있는데 선택 섹션(spacing, rounded)이 빠져 있다 |
| `missing-typography` | warning | 색은 정의됐으나 타이포그래피 토큰이 없다. 에이전트가 기본 폰트를 쓴다 |
| `section-order` | warning | 섹션이 스펙의 canonical 순서를 벗어났다 |
| `unknown-key` | warning | 최상위 YAML 키가 알려진 스키마 키의 오타처럼 보인다. 커스텀 확장 키는 조용히 통과한다 |

심각도 배분에 일관된 원칙이 있다. error는 `broken-ref` 하나뿐이고, 이는 참조가 해소되지 않으면 값을 결정할 수 없어서다. 나머지는 에이전트가 기본값으로 메울 수 있는 항목이라 warning이나 info에 머문다. `missing-primary`와 `missing-typography`의 설명에 "에이전트가 자동 생성한다", "기본 폰트를 쓴다"가 붙어 있는 것이 그 근거다.

`unknown-key`의 처리는 열린 스키마와 오타 검출을 어떻게 함께 만족시키는지 보여준다. `colours:`처럼 알려진 키의 오타로 보이면 경고하고, 스펙 밖의 커스텀 확장 키는 조용히 통과시킨다.

## 설치와 플랫폼 대응

README는 설치 절에 Windows 관련 문제 해결을 별도로 실었다. 자주 발생하는 마찰이라는 뜻이다.

| 상황 | 대응 |
|---|---|
| 일반 설치 | `npm install @google/design.md` |
| PowerShell 등이 `@`를 특수문자로 처리 | 패키지 이름을 인용부호로 감싼다: `npm install "@google/design.md"` |
| Windows에서 `npx @google/design.md`가 출력이 없거나 Markdown 편집기를 열어버림 | `design.md` bin 이름의 `.md` 접미사가 Windows의 Markdown 파일 연결과 명령 해소 단계에서 충돌한다. 점 없는 별칭을 쓴다: `npx -p @google/design.md designmd lint DESIGN.md` |
| `package.json` 스크립트에서 직접 호출 | `design.md` 대신 `designmd` 별칭을 쓴다 |
| `npm error ENOVERSIONS` | 대개 npm이 공개 registry를 조회하지 않는 문제다. `npm config get registry`가 `https://registry.npmjs.org/`인지 확인하고, 캐시된 404가 남았으면 `npm cache clean --force` 후 재시도한다 |

`designmd` shim은 `design.md`와 같은 entrypoint로 해소되며 모든 플랫폼에서 동일하게 동작한다. 따라서 크로스 플랫폼 스크립트에서는 처음부터 `designmd` 쪽을 쓰는 편이 안전하다.

## 한계

**alpha 상태다.** README의 Status 절은 스펙과 토큰 스키마, CLI가 모두 활발히 개발 중이며 포맷이 성숙하는 과정에서 변경을 예상해야 한다고 적는다. 프로덕션 의존은 이르다.

**파일 전체를 한 번에 올리는 구조가 비용을 만든다.** 부분만 참조하는 선택적 로딩 메커니즘이 스펙에 없으므로 디자인 시스템이 커지면 컨텍스트 토큰 비용도 함께 커진다. [[agents/hall-2026-atlassians-design-md-is-here]]가 보고한 Atlassian 실측에서는 DESIGN.md가 디자인 시스템 컨텍스트를 약 30%만 확보하면서(MCP는 약 80%) 평균 컨텍스트 토큰은 MCP의 약 2배를 소비했다. 이 수치는 이 저장소가 제시한 것이 아니라 그 자료의 실측이다.

**정본 스펙이 이 자료 범위 밖에 있다.** README는 자기 내용이 요약본(condensed reference)이라고 밝히고 정본은 저장소의 `docs/spec.md`라고 안내한다. 이 raw 스냅샷에는 `README.md`와 `PHILOSOPHY.md`만 들어 있어 스펙 전문은 확인할 수 없다.

**린터가 검사하는 것은 산문이 아니다.** 9규칙이 잡는 대상은 구조와 참조 해소, 대비율이다. 산문의 구체성이나 품질은 자동 검사 대상이 아니다. 스펙이 산문을 가장 중요하다고 규정하는 것과 대비되는 지점이며, PHILOSOPHY.md가 말한 "장황한 don't 목록은 서술이 모호했다는 신호"도 사람이 읽어야 판정할 수 있다.

**취약점 보상 프로그램 대상이 아니다.** Disclaimer 절이 이 프로젝트가 Google Open Source Software Vulnerability Rewards Program 대상이 아니라고 밝힌다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| design token | 색이나 크기, 타이포그래피처럼 재사용 가능한 디자인 값에 이름을 붙인 것. YAML front matter에 정의한다 |
| token reference | `{colors.primary}` 형태로 다른 토큰을 가리키는 표기 |
| 산문(prose) | 토큰의 이유와 적용 방식을 서술하는 Markdown 본문. PHILOSOPHY.md가 스펙에서 가장 중요한 부분으로 규정한다 |
| normative value | 스펙이 규정하는 기준값. README가 YAML의 토큰을 이렇게 부른다 |
| negative constraint | 하지 말 것에 해당하는 제약. 구체적인 레퍼런스가 자동으로 내포한다 |
| consumer | DESIGN.md 파일을 읽어 처리하는 쪽(린터, 변환기, 에이전트). 미지 내용 처리 규칙이 이 동작을 규정한다 |

## 관련 페이지

- [[agents/hall-2026-atlassians-design-md-is-here]]: Atlassian이 자사 디자인 시스템으로 이 포맷을 production 검증한 현장 보고. 컨텍스트 미제공과 MCP, Skill, DESIGN.md 네 방식의 비교 수치와 업계 반응은 그 페이지가 담당하고, 이 페이지는 저장소 본체의 규격과 CLI 사용법을 담당한다.
- [[agents/anthropic-2025-effective-context-engineering-for-ai]]: 산문을 고신호 컨텍스트로 취급하는 DESIGN.md의 태도가 context engineering 원칙과 이어진다.
- [[agents/hada-2026-agent-skills]]: 스킬 포맷의 국내 소개. portable 컨텍스트 전달 수단으로서 DESIGN.md와 비교 대상이다.
- [[agents/osmani-2026-agent-skills]]: 스킬의 구조와 progressive disclosure 설계. 필요한 시점에만 정보를 노출하는 방식이라 파일째 일괄 로드하는 DESIGN.md와 대비된다.
