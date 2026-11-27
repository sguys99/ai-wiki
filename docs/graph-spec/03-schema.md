# 03. graph.json 스키마

작성일 2026-11-17. `docs/graph-design-plan.md` Phase 2의 "`graph.json` 스키마 변경안 확정" 산출물이다. 이 문서가 `graph.json` 과 부속 파일(`graph/paths.json`, `graph/3d/layout.json`)의 필드 이름, 형, 순서, 검증 규칙의 정본이다. 배치 계산 방법은 04, 라이브러리는 05, 추가 기능의 화면은 06이 정한다.

## 0. 결정 요약

| 번호 | 항목 | 결정 |
|---|---|---|
| S1 | 새 노드 필드 | `year`(정수), `type`(문자열), `tags`(문자열 배열, frontmatter 순서), `added`(`"YYYY-MM-DD"`), `xy`(정수 두 개 배열). 기존 `id`, `stem`, `title`, `category`, `domain`, `degree` 는 이름과 뜻을 그대로 둔다. Phase 7 정리에서 `domain` 을 뺐다 (3.2절) |
| S2 | 좌표 | **04 안을 따른다.** 가로 배치 한 벌을 정수로 굽고 세로 화면은 런타임에 x, y를 맞바꾼다. 05의 두 벌(`xy`, `xyp`, 소수 1자리)은 버린다. 필드 이름은 `xy: [x, y]` |
| S3 | 엣지 | `edges` 객체 배열을 버리고 `links`: 노드 배열 인덱스의 평면 정수 배열 `[s0, t0, s1, t1, …]` 로 싣는다. gzip 14.7KB 절약. 홈 히어로와 `graph-core.js` 두 곳을 Phase 3에서 함께 고친다 (9절 D1, 2026-11-17 승인) |
| S4 | 태그 | 노드마다 문자열 배열. 최상위 태그 사전과 인덱스는 원본은 12KB 작지만 gzip이 1.8KB 커서 쓰지 않는다 |
| S5 | in, out degree | 싣지 않는다. 방향 `links` 에서 런타임에 센다 (2,600쌍 한 번). 실으면 gzip +1.3KB |
| S6 | 최상위 | `version: 2`, `recentSince`, `recentMode`, `recentDays` (06 9.1절). Phase 7 정리에서 `recentDays` 를 뺐다 (3.1절). 배치 메타(월드 크기, 앵커)는 싣지 않는다. 런타임이 쓰는 값은 모두 노드 좌표에서 구한다 |
| S7 | 직렬화 | 들여쓰기 없이 쓴다. 노드 배열 순서는 지금 `buildGraph` 순서 그대로 둔다 |
| S8 | 파일 분리 | 하나의 `graph.json` 을 홈과 그래프 페이지가 함께 받는다. 새 파일(37,944B gzip)이 지금 배포 파일(41,072B gzip)보다 작아 홈 비용이 오히려 준다. 홈 전용 경량 파일은 개선 제안 C1로 둔다 |
| S9 | 부속 파일 | `graph/paths.json` 은 06 9.2절 형태에 `version` 을 더한다. `graph/3d/layout.json` 의 노드 순서는 `graph.json` 의 `nodes` 배열 순서와 같다 |

## 1. 실측

스크립트는 스크래치 디렉토리의 `layout-bench/schema03.mjs` 다. 사이트 빌드 모듈(`loadContent`, `addedDates`, `buildGraph`, `config.mjs`)을 그대로 불러 현재 작업 트리(2026-11-17)로 계산했다. 좌표는 04 2절 규칙(id 정렬 사본, 시드 7, 360 tick, collide `1.4r + 3.5`, 정수 반올림)을 d3-force 3.0.0으로 돌려 얻었다. gzip은 Node `zlib` level 9다.

| 항목 | 값 |
|---|---|
| 노드, 엣지 | 344, 2,600 |
| 고유 태그 | 1,023. 노드당 최대 22개, 0개인 노드 0, 합계 2,573 |
| `year` | 344개 모두 frontmatter 숫자, null 0 |
| `type` | article 114, paper 110, repo 93, overview 14, video 10, report 3 |
| `added` | 344개 모두 `YYYY-MM-DD` |
| 최근 집합 | 14일 안 13개, `recentMode` `days`, `recentSince` `2026-11-07`, 날짜 비교로 센 수 13 |
| 좌표 외곽 | x -663 ~ 634, y -437 ~ 422 (1,297 × 859 world) |
| 정수 좌표 world 겹친 쌍 (반지름 `r` 기준) | 0 |
| 배치 시간 | 286ms |
| 제목 최대 길이 | 163자 |
| id 글자 | 모두 `[a-z0-9/-]`, 모두 `category + '/' + stem` |

### 1.1 후보별 크기

기준값은 계획서가 적은 배포 파일 `dist/graph.json` (2026-11-14 빌드, 342노드) 482,615B, gzip 41,072B다. 아래 A는 같은 형태를 지금 작업 트리(344노드)로 다시 만든 값이다.

| 후보 | 원본 | gzip | D 대비 gzip |
|---|---|---|---|
| A 현재 형태, 들여쓰기 2 (지금 배포 방식) | 483,902 | 40,852 | -11,791 |
| B 현재 형태, 들여쓰기 없음 | 396,335 | 39,416 | -13,227 |
| C 새 필드, 태그 문자열, 엣지 객체, 들여쓰기 2 | 592,513 | 55,658 | +3,015 |
| D 새 필드, 태그 문자열, 엣지 객체, 들여쓰기 없음 | 457,005 | 52,643 | 0 |
| E D + 태그 사전과 인덱스 | 444,998 | 54,458 | +1,815 |
| **F D + 엣지 인덱스 평면 배열 (채택)** | **158,199** | **37,944** | **-14,699** |
| G D + 엣지 인덱스 쌍 배열 `[[s, t], …]` | 163,399 | 38,532 | -14,111 |
| H 태그 사전 + 엣지 평면 | 146,192 | 39,535 | -13,108 |
| I D 에서 `stem` 제거 | 440,928 | 50,721 | -1,922 |
| J 홈 전용 최소 (`id`, `domain`, `degree` + 엣지 평면) | 48,516 | 13,070 | -39,573 |
| K 홈 전용 최소 (같은 노드 필드 + 엣지 객체) | 347,322 | 26,707 | -25,936 |

필드를 B에 하나씩 더한 비용 (엣지 객체, 들여쓰기 없음):

| 필드 | 원본 | gzip |
|---|---|---|
| `year` | +4,128 | +269 |
| `type` | +5,340 | +372 |
| `tags` | +38,548 | +9,055 |
| `added` | +7,224 | +1,021 |
| `xy` | +5,355 | +2,468 |
| (참고) `in`, `out` 정수 둘 | +5,313 | +1,264 |
| (참고) 최상위 `version`, `recent*` | 무시할 만함 | |

읽는 법:

- 들여쓰기 제거는 원본 18%를 줄이지만 gzip은 3.5%만 준다. 반복되는 공백은 gzip이 이미 잘 줄인다.
- 크기를 지배하는 것은 엣지다. 엣지 객체 2,600개가 `"source":"physical-ai/…","target":"…"` 로 id를 두 번씩 적는다. 인덱스로 바꾸면 원본 65%, gzip 28%가 준다.
- 태그 사전은 원본을 줄이지만 gzip을 늘린다. 같은 문자열 반복은 gzip이 사전보다 잘 압축하고, 인덱스 숫자는 노드마다 달라 압축이 안 된다.
- 평면 배열과 쌍 배열의 차이는 gzip 588B다. 평면 배열이 작고 읽기도 `for (i = 0; i < L.length; i += 2)` 한 줄이다.

### 1.2 홈 비용

홈 히어로 `constellation.js` 는 `graph.json` 전체를 받는다 (`templates.mjs` 203행 `data-graph`, `constellation.js` 20행). 홈 방문자가 내는 비용:

| 안 | 홈이 받는 gzip | 지금 배포 대비 |
|---|---|---|
| 지금 (A) | 40,852 | 0 |
| 새 필드 + 엣지 객체 유지 (D) | 52,643 | +11,791 (+29%) |
| **새 필드 + 엣지 인덱스 (F, 채택)** | **37,944** | **-2,908 (-7%)** |
| 홈 전용 파일 분리 (J) + 그래프 페이지 F | 13,070 | -27,782 (-68%) |

## 2. 현재 스키마 (version 1, 이름 없음)

출처는 `site/lib/graph.mjs` 의 `buildGraph` 와 `site/build.mjs` 105 ~ 107행 (`JSON.stringify({ nodes, edges }, null, 2)`).

| 위치 | 필드 | 형 | 예 | 출처 | 소비자 |
|---|---|---|---|---|---|
| 최상위 | `nodes` | 배열 | | `pages.values()` 순서 | 홈 히어로, `graph-explorer.js` |
| 최상위 | `edges` | `{ source, target }` 배열, 방향, 중복 제거, 자기참조 제외 | `{"source":"agents/a","target":"overviews/b"}` | 본문 `[[…]]` 해석 | 홈 히어로 (`index[edges[e].source]`), `graph-core.js` `buildAdjacency` |
| 노드 | `id` | 문자열 `category/stem` | `"physical-ai/3587jjh-huro"` | `page.id` | 둘 다 |
| 노드 | `stem` | 문자열 | `"3587jjh-huro"` | `page.stem` | 탐색기 검색 |
| 노드 | `title` | 문자열 | `"HuRo (3587jjh/HuRo, GitHub repo)"` | `page.title` | 탐색기 |
| 노드 | `category` | 문자열 | `"physical-ai"` | `page.category` | 탐색기 |
| 노드 | `domain` | `"core"` 또는 `"physical"` | `"physical"` | `domainOf(category)` | 홈 히어로 (`GC.isPhysical`), 탐색기 |
| 노드 | `degree` | 정수, 무방향 고유 이웃 수 | `6` | `buildGraph` | 홈 히어로 (반지름, 허브 판정), 탐색기 |

빌드 안에서 `graph.edges` 객체 배열은 직렬화와 별개로 계속 쓰인다 (`build.mjs` 116행 인접 맵, 193, 267행 통계, `site/lib/nav.mjs` 18행). 이 문서는 **파일 형태만** 바꾸고 메모리 안의 `buildGraph` 반환값은 그대로 둔다.

## 3. 새 스키마 (version 2)

### 3.1 최상위

| 필드 | 형 | 예 | 출처 | 소비자 | 필수 |
|---|---|---|---|---|---|
| `version` | 정수 `2` | `2` | 상수 | 탐색기 (없거나 2가 아니면 목록 판 유지) | 필수 |
| `recentSince` | `"YYYY-MM-DD"` 또는 `null` | `"2026-11-07"` | 3.4절 계산 | 탐색기 최근 강조 (06 2절) | 필수 (값은 null 가능) |
| `recentMode` | `"days"` 또는 `"count"` | `"days"` | 3.4절 | V12 점검과 탐색기 디버그 훅뿐이다. 범례 문구는 서버가 `recentInfo()` 로 렌더한다 (Phase 7 확인) | 필수 |
| ~~`recentDays`~~ | 정수 | `14` | `config.mjs` `RECENT_DAYS` | 없음. 범례 문구는 서버가 `recentInfo()` 로 렌더한다 | Phase 7 정리에서 뺐다 (2026-11-27) |
| `nodes` | 배열 | | 3.2절 | 홈 히어로, 탐색기, 3D 페이지 | 필수 |
| `links` | 정수 배열, 길이 짝수 | `[12, 40, 12, 7, …]` | 3.3절 | 홈 히어로, 탐색기, 3D 페이지 | 필수 |

`edges` 키는 없앤다. 같은 이름에 다른 형을 담지 않는 것이 캐시된 옛 스크립트에 안전하다 (5.3절).

### 3.2 노드

| 필드 | 형 | 예 | 출처 | 소비자 | 필수 |
|---|---|---|---|---|---|
| `id` | 문자열 `category/stem`, `[a-z0-9/-]` | `"physical-ai/ai-2026-pi07-a-steerable-generalist-robotic"` | `page.id` | 탐색기, 3D 페이지. 딥링크 `#node=`, `paths.json` 참조. 홈 히어로는 읽지 않는다 (Phase 7 확인) | 필수, 고유 |
| `stem` | 문자열 | `"ai-2026-pi07-a-steerable-generalist-robotic"` | `page.stem` | 검색 stem 일치 (02 7.2절) | 필수 |
| `title` | 문자열, 비어 있지 않음 | `"π0.7: a Steerable Generalist Robotic Foundation Model with Emergent Capabilities"` | `page.title` | 패널, 툴팁, 라벨, 검색 | 필수 |
| `category` | 카테고리 8개 중 하나 | `"physical-ai"` | `page.category` | 색 (홈 히어로 포함, Phase 7), 앵커, 범례 필터 | 필수 |
| ~~`domain`~~ | `"core"` 또는 `"physical"` | `"physical"` | `domainOf(category)` | 없음. 홈 히어로가 Phase 7 부터 `category` 색을 쓴다 | Phase 7 정리에서 뺐다 (2026-11-27) |
| `degree` | 정수 ≥ 0, 무방향 고유 이웃 수 | `16` | `buildGraph` | 반지름, 라벨 하한, 정렬 | 필수 |
| `year` | 정수 또는 `null` | `2026` | frontmatter `year` 를 `parseInt` | 패널 메타, 툴팁 | 필수 (값은 null 가능) |
| `type` | `paper`, `repo`, `article`, `report`, `video`, `book`, `lecture`, `overview` 중 하나 또는 `null` | `"paper"` | frontmatter `type` (`content.mjs` 76행) | 유형 필터, 패널 메타 | 필수 (값은 null 가능) |
| `tags` | 문자열 배열, frontmatter 순서 그대로 | `["physical-ai","vla","world-model","manipulation"]` | frontmatter `tags` (`content.mjs` 78행) | 태그 필터, 패널, 궤도 정렬의 첫 하위 태그 (04 4.2절) | 필수 (빈 배열 가능) |
| `added` | `"YYYY-MM-DD"` | `"2026-09-04"` | `page.added.slice(0, 10)` (git 최초 추가일, 작성자 시간대 날짜) | 최근 강조, 패널 | 필수 |
| `xy` | 정수 두 개 배열 `[x, y]`, 가로 배치 world 좌표 | `[-434, -35]` | 04 3.3절 배치 모듈 | 탐색기 home 좌표 | 필수 |

- `tags` 의 순서는 의미가 있다. 04 2.2절이 physical-ai 하위 앵커를 첫 태그로 고르고, 04 4.2절이 궤도 묶음을 첫 하위 태그로 짓는다. 빌드는 정렬하지 않는다.
- `year`, `type` 은 지금 344개 모두 값이 있다. frontmatter가 빠지면 `null` 로 싣고 빌드가 경고한다 (7절). 탐색기는 `null` 을 메타 줄에서 생략한다.
- `xy` 를 `x`, `y` 두 필드로 두지 않는 이유: 시안 F의 런타임 노드는 `n.x`, `n.y` 를 전환 중 현재 위치로 쓴다 (04 6.4절 `setTargets`). 같은 이름이면 구운 home 좌표가 첫 프레임에 덮인다. 크기 차이는 노드당 1B다.
- 노드 반지름 `r` 은 싣지 않는다. 04 2.1절 식 `min(20, 2 + 1.6√degree)` 를 런타임이 계산한다.

### 3.3 링크

- `links` 는 방향 엣지를 `[source 인덱스, target 인덱스]` 순으로 이어 붙인 평면 배열이다. 인덱스는 같은 파일 `nodes` 배열의 위치다.
- 순서는 `buildGraph` 의 엣지 순서(페이지 순회, 본문 링크 등장 순) 그대로다. 중복 없음, 자기참조 없음은 지금과 같다.
- 서로 링크한 쌍은 두 번 나온다 (`a→b`, `b→a`). 04 2.1절 force 입력과 06의 들어옴, 나감 계산이 방향을 쓴다.
- 소비자는 아래 한 가지 형태로 읽는다.

  ```js
  var L = graph.links || [];
  for (var i = 0; i + 1 < L.length; i += 2) { var s = L[i], t = L[i + 1]; … }
  ```

### 3.4 최근 집합

06 2.1절, 9.1절을 그대로 따르고 경계 규칙만 더한다.

1. 노드의 `added` 를 내림차순으로 정렬한다.
2. 빌드 시각에서 `RECENT_DAYS`(14)일 안인 노드 수를 ISO 시각(`page.added`)으로 센다. 홈 NEW 뱃지와 같은 계산이다 (`content.mjs` 343 ~ 347행).
3. 그 수가 `RECENT_COUNT`(6) 이상이면 `recentMode = "days"`, 그 집합에서 가장 이른 노드의 날짜가 `recentSince`. 아니면 `"count"`, 최신 6번째 노드의 날짜가 `recentSince`.
4. 브라우저는 `node.added >= recentSince` 로 판정한다. 날짜 단위 비교라 경계 날짜에 추가된 노드는 모두 들어온다. 홈 NEW 뱃지보다 몇 개 많을 수 있다 (지금은 둘 다 13).
5. 가드: 판정에 걸리는 노드가 노드 수의 50%를 넘으면 git 이력이 없는 빌드로 보고 `recentSince = null` (06 9.1절).

### 3.5 직렬화

- `JSON.stringify(obj)` (들여쓰기 없음). 필드 순서는 3.1절, 3.2절 표 순서다. 같은 입력과 같은 빌드 날짜면 같은 바이트가 나온다 (`generated` 같은 시각 필드를 두지 않는다).
- 직렬화는 `graph.mjs` 의 새 함수 하나(`toGraphJson(graph, pages, layout, recent)`)가 맡는다. `build.mjs` 는 그 결과를 쓰기만 한다.

## 4. 충돌 판정

### 4.1 좌표 한 벌 (04) 대 두 벌 (05)

| 기준 | 04: 가로 한 벌 정수, 런타임 전치 | 05: `xy`, `xyp` 소수 1자리 |
|---|---|---|
| 크기 | gzip +2,468B (1절) | 좌표만 gzip 3,725B (05 2절). 전체 파일 기준은 미측정이나 두 벌이라 한 벌보다 크다 |
| 빌드 시간 | 약 0.3초 | 약 0.6초 (05 2절) |
| 정밀도 | 정수 반올림 뒤 world 겹친 쌍 0 (04 1.6절, 이 문서 1절에서 다시 확인) | 소수 1자리 |
| 세로 화면 성운 방향 | 전치라 거리가 보존되고 1.4절, 1.5절 지표가 그대로 성립 (04 3.4절) | 세로 앵커로 따로 계산. 시안 F와 같은 그림 |
| 회전 | 전치만 하면 되므로 회전 시 바꾸기가 싸다 (04 3.4절) | 두 벌을 바꾸면 노드가 전혀 다른 자리로 간다 |

04 안을 채택한다. 05가 소수 1자리를 둔 근거는 "정수면 k 6.00에서 1단위가 6px이라 collide 결과가 흐트러질 수 있다" 는 추정이었고, 04가 정수 반올림 뒤 겹친 쌍 0을 쟀다. 배치 담당 문서도 04다. 05 2절과 4절을 이 결정에 맞춰 고쳤다 (개정 기록).

### 4.2 엣지 표현

| 안 | gzip | 홈 히어로 | 결정 |
|---|---|---|---|
| 객체 배열 유지 | 52,643 | 코드 변경 없음 | 홈 비용 +29% |
| 인덱스 쌍 배열 | 38,532 | 변경 필요 | |
| **인덱스 평면 배열** | **37,944** | 변경 필요 (5.2절, 약 10줄) | 채택 |

홈 히어로는 계획서 3절 제약상 깨뜨리면 안 되지만, 엣지 객체를 유지하면 모든 홈 방문자가 11.8KB를 더 받는다. 고칠 곳은 두 함수(`constellation.js` `runHero` 의 엣지 루프, `graph-core.js` `buildAdjacency`)뿐이고 Phase 3 "홈 히어로 동작 확인" 항목이 바로 그 확인이다. 사용자 승인이 필요한 변경이라 D1로 올렸고, 2026-11-17 사용자가 (a)로 승인했다 (9절).

### 4.3 태그

| 안 | 원본 | gzip | 런타임 |
|---|---|---|---|
| **노드마다 문자열 배열** | 158,199 | 37,944 | 그대로 쓴다 |
| 최상위 `tags` 사전 + 노드 인덱스 | 146,192 | 39,535 | 사전을 한 번 풀어야 한다 |

전송 크기는 gzip이 정하므로 문자열 배열이 낫다. 사전이 주는 원본 12KB 절약은 `JSON.parse` 시간에서만 이득인데 158KB 파싱은 문제 되는 크기가 아니다 (미측정).

### 4.4 in, out degree

06 3절 약한 연결 리포트는 빌드에서만 들어옴, 나감을 쓴다 (`graph.json` 불필요, 06 3.3절). 패널의 "들어옴 n, 나감 m" (01 I4) 이나 06 E3 렌즈가 필요하면 탐색기가 `links` 를 한 번 훑어 센다. 실으면 gzip +1.3KB이고 같은 정보를 두 번 싣게 된다. 싣지 않는다.

### 4.5 배치 메타

04가 런타임에 쓰는 배치 값을 확인했다.

| 런타임 값 | 출처 | 싣는가 |
|---|---|---|
| home 좌표 | 노드 `xy` | 싣는다 |
| 노드 반지름 | `degree` 로 계산 (04 2.1절) | 아니다 |
| 세로 화면 home | `xy` 전치 (04 3.4절) | 아니다 |
| 성운 중심과 외곽 상자 `CAT_INFO` | home 좌표의 카테고리별 중앙값, 최소 최대 (04 5.2절) | 아니다 |
| 화면 맞춤 외곽 | home 좌표와 반지름 (04 7.1절) | 아니다 |
| 카테고리 앵커, 하위 오프셋, force 상수 | 빌드 배치에만 쓴다. 시안 F 런타임에서도 배치 계산(443 ~ 495행) 밖에서는 `ANCHOR`, `SUB` 를 읽지 않는다 | 아니다 |
| 궤도 배치 | 고를 때마다 런타임 계산 (04 4절) | 아니다 |

모두 노드 좌표에서 구하므로 최상위 배치 메타를 두지 않는다.

### 4.6 파일 분리

새 `graph.json` 하나가 지금 배포 파일보다 작으므로 분리하지 않는다 (1.2절). 분리하면 홈이 25KB를 더 아끼지만 빌드 산출물과 경로가 하나 늘고 계획서 3절 "홈 히어로가 `graph-core.js` 와 `graph.json` 을 함께 쓴다" 는 구조가 바뀐다. 개선 제안 C1로 둔다.

## 5. 하위 호환

### 5.1 홈 히어로가 읽는 것 (코드 확인)

`site/assets/js/constellation.js` 와 `graph-core.js` 를 읽었다.

| 읽는 것 | 위치 | 새 스키마에서 |
|---|---|---|
| `graph.nodes` | `constellation.js` 31행 | 그대로 |
| `n.id` | 35행 (`index[n.id] = i`) | 그대로 |
| `n.degree` | 42행 (최대값), 54행 (반지름) | 그대로 |
| `n.domain` | 55행 `GC.isPhysical(n)` → `graph-core.js` 45행 | 그대로 |
| 노드 배열 순서 `i` | 46 ~ 53행. golden-angle 자리, 위상, 속도를 인덱스로 정한다 | **순서를 바꾸면 홈 그림이 바뀐다.** 5.4절 |
| `graph.edges[e].source`, `.target` | 32행, 80 ~ 81행 | **바뀐다.** 5.2절 |
| 그 밖의 필드 | 읽지 않는다 | `stem`, `title`, `category`, `year`, `type`, `tags`, `added`, `xy`, 최상위 새 키는 무시된다 |

노드 필드 추가는 영향이 없다. 영향은 엣지 표현 하나다.

위 표는 Phase 3 시점 기록이다. Phase 7 현재 히어로는 `n.id`, `n.domain` 을 읽지 않고 노드 배열 순서, `degree`, `category`, `links` 만 읽는다. 소비자별 필드 목록은 `site/lib/graph.mjs` 머리 주석에 둔다.

### 5.2 Phase 3에서 고칠 소비자 코드

| 파일 | 지금 | 바꿀 것 |
|---|---|---|
| `constellation.js` `runHero` | `var edges = graph.edges \|\| []` 와 `index[edges[e].source]` | `var L = graph.links \|\| []`, 루프 `i += 2` 에서 `P[L[i]]`, `P[L[i + 1]]`. `index` 맵은 필요 없어진다 |
| `graph-core.js` `buildAdjacency(nodes, edges)` | `edges[i].source` 를 `index` 로 푼다 | `buildAdjacency(nodes, links)` 로 받아 인덱스를 바로 쓴다. 반환 형태 `{ index, neighbors }` 는 그대로 |
| `graph-explorer.js` | `graph.edges` (149행) | Phase 4에서 재작성하므로 Phase 3에서는 그대로 둔다. Phase 3과 4 사이 배포가 있으면 지금 `/graph/` 가 엣지 없이 그려진다 (8절 순서 주의) |
| `site/lib/graph.mjs` 머리 주석 | version 1 스키마 | 새 스키마와 소비자로 갱신 (계획서 Phase 7 항목을 Phase 3으로 당긴다). Phase 7 정리 뒤 다시 갱신했다 (2026-11-27) |
| `docs/graph-mockups/build-data.mjs` | `edges` 객체, `generated` | 고치지 않는다. 시안은 Phase 1 산출물이고 자기 스냅샷 형태를 쓴다 |

### 5.3 캐시된 옛 파일과 옛 스크립트

배포 직후 한쪽만 새것일 수 있다.

| 조합 | 결과 |
|---|---|
| 옛 `constellation.js` + 새 `graph.json` | `graph.edges` 가 없어 `[]`. 노드만 그리고 엣지는 없다. 예외 없음 (`index[...]` 를 부르지 않는다) |
| 새 `constellation.js` + 옛 `graph.json` | `graph.links` 가 없어 `[]`. 노드만 그린다 |
| 새 탐색기 + 옛 `graph.json` | `version !== 2` 라 목록 판에 남는다 (02 10절 "좌표 필드 없음" 과 같은 경로) |

`edges` 이름에 인덱스를 담았다면 옛 스크립트가 `index[3]` 처럼 엉뚱한 값을 찾다가 조용히 엣지를 버렸을 것이다. 이름을 바꿔 두 쪽 모두 "없음" 으로 떨어지게 한다.

### 5.4 노드 배열 순서

- `nodes` 배열 순서는 `buildGraph` 가 `pages.values()` 를 도는 순서 그대로 둔다. 새 필드를 붙일 때 정렬하지 않는다. 04 2.1절도 배치 계산에만 id 정렬 사본을 쓴다.
- `links` 인덱스와 `graph/3d/layout.json` 이 이 순서에 묶인다. 같은 빌드가 세 값을 함께 만든다.
- 그 순서는 `content.mjs` 의 `readdir(wikiDir, { recursive: true })` 결과 순서다 (43행). 지금 `dist/graph.json` 은 id 사전순이 아니고 카테고리가 physical-ai, overviews, llms, evaluations, etc, database, applications, agents 순으로 나온다. 로컬(macOS)과 CI(ubuntu)의 순서가 같은지는 확인하지 않았다. 다르면 홈 히어로 그림이 환경마다 다를 뿐 기능 문제는 없다 (개선 제안 C3).

## 6. 부속 파일

### 6.1 `graph/paths.json`

06 4.6절, 9.2절 형태에 `version` 을 더해 확정한다. 경로는 `dist/graph/paths.json`, 사이트 주소는 `href('/graph/paths.json')`.

| 위치 | 필드 | 형 | 예 | 필수 |
|---|---|---|---|---|
| 최상위 | `version` | 정수 `1` | `1` | 필수 |
| 최상위 | `paths` | 배열, 카탈로그(index.md) 순서 | | 필수 |
| 경로 | `id` | overview 노드 id | `"overviews/physical-ai-overview"` | 필수 |
| 경로 | `title` | 카탈로그 표시 이름(`page.display`) | `"Physical AI 카테고리 지도와 학습 경로"` | 필수 |
| 경로 | `steps` | 배열, 미해석 단계 제외 | | 필수 (빈 경로는 싣지 않는다) |
| 단계 | `n` | 정수, 원래 단계 번호 (1부터, 빠진 번호 가능) | `1` | 필수 |
| 단계 | `id` | 단계 노드 id | `"physical-ai/…"` | 필수 |
| 단계 | `note` | 문자열, 빈 문자열 가능 | | 필수 |
| 단계 | `prereq` | 같은 경로 단계 번호 `n` 의 배열, 빈 배열 가능 | `[1, 3]` | 필수 |

노드 정보(제목, 카테고리, 좌표)는 싣지 않는다. 탐색기가 이미 받은 `graph.json` 에서 id로 찾는다. 들여쓰기 없이 쓴다. 크기는 06 1.6절 추정 gzip 약 7KB이고 실제 파일은 Phase 5에서 잰다.

### 6.2 `graph/3d/layout.json`

경로 `dist/graph/3d/layout.json`.

| 필드 | 형 | 뜻 |
|---|---|---|
| `version` | 정수 `1` | |
| `n` | 정수 | 노드 수. `graph.json` 의 `nodes.length` 와 같아야 한다 |
| `xyz` | 정수 배열, 길이 `3n` | `[x0, y0, z0, x1, …]` |

**노드 순서 규칙: `xyz` 의 i번째 세 값은 같은 빌드 `graph.json` 의 `nodes[i]` 다 (id 정렬 순서가 아니다).** 3D 페이지는 `n !== nodes.length` 면 대체 문구로 떨어진다. 정수 좌표 344개 평면 배열은 원본 약 3.7KB, gzip 약 1.5KB다 (1절 스크립트에서 2D 좌표에 z 0을 붙여 잰 자리표시 값. 실제 3D 좌표 크기는 Phase 5에서 잰다).

## 7. 검증 규칙

Phase 3 "graph.mjs 자체 점검" 은 `site/lib/graph.mjs` 에 `checkGraphJson(json, { paths, layout3d })` 하나를 두고 문제 목록을 돌려준다. `build.mjs` 가 `graph.json` 을 쓴 직후 부르고, 다른 빌드 점검처럼 `STRICT` 이면 실패, 아니면 경고한다. 같은 함수를 `node lib/graph.mjs --check ../dist/graph.json` 으로도 돌린다 (`dates.mjs --check` 와 같은 방식). 아래에서 "실패" 는 STRICT 실패, "경고" 는 로그만이다.

| 번호 | 불변식 | 위반 시 |
|---|---|---|
| V1 | `version === 2`, `nodes` 와 `links` 가 배열 | 실패 |
| V2 | 노드 수 = wiki 페이지 수 (`pages.size`). 지금 344. 300 미만이면 비정상 | 실패 |
| V3 | `id` 고유, `id === category + '/' + stem`, `id` 가 `[a-z0-9/-]` 만 | 실패 (마지막 조건은 경고. 02 8.4절이 인코딩으로 처리한다) |
| V4 | 노드 필드 열 개가 모두 있고 3.2절 형과 맞다 (Phase 7 정리 전에는 `domain` 포함 열한 개와 `domain === domainOf(category)`) | 실패 |
| V5 | `category` 가 8개 목록 안, `type` 이 8개 목록 안이거나 `null` | 실패. `year`, `type` 이 `null` 이면 그 수만 경고 |
| V6 | `added` 가 `^\d{4}-\d{2}-\d{2}$` | 실패 |
| V7 | `links.length` 가 짝수, 모든 값이 `0 ≤ i < nodes.length` 정수, 쌍마다 `s !== t`, 같은 쌍 중복 없음 | 실패 |
| V8 | 쌍 수 = 메모리 `graph.edges.length` (지금 2,600) | 실패 |
| V9 | `links` 로 다시 센 무방향 고유 이웃 수가 모든 노드의 `degree` 와 같다 | 실패 |
| V10 | `xy` 가 유한한 정수 두 개. 외곽 가로가 600 ~ 3,000 world (04 3.3절) | 실패 |
| V11 | world 겹친 쌍 0 (반지름 `min(20, 2 + 1.6√degree)` 의 합보다 가까운 쌍) | 실패 |
| V12 | `recentSince` 가 `null` 이거나 `YYYY-MM-DD`. null이 아니면 판정되는 노드가 1개 이상, 50% 이하. `recentMode` 가 두 값 중 하나 | 실패. `null` 이면 06 9.1절 경고 로그 |
| V13 | 앵커 표(04 2.2절)에 없는 카테고리가 있음 | 경고 |
| V14 | `paths.json`: 경로 id와 단계 id가 모두 노드에 있고, 경로 안 `n` 중복 없음, `prereq` 가 같은 경로의 더 작은 `n` 만 가리킨다 | 실패 |
| V15 | `layout.json`: `n === nodes.length`, `xyz.length === 3n`, 모두 유한한 정수 | 실패 |
| V16 | 고립 노드(`degree` 0) 수, 들어옴 0 수, 나감 0 수, `graph.json` 원본과 gzip 바이트 | 로그만 (06 9.4절) |

V9은 `degree` 와 `links` 가 서로 다른 계산에서 나와 어긋나는 회귀를 잡는다. V11은 04의 겹침 점검을 그대로 옮긴 것이다.

## 8. Phase 3 작업 순서와 바꿀 파일

| 순서 | 일 | 파일 |
|---|---|---|
| 1 | d3 네 패키지를 정확한 버전으로 `devDependencies` 에 추가 (05 4절 A-1) | `site/package.json`, `site/package-lock.json` |
| 2 | 배치 모듈. id 정렬 사본, 04 2절 force, 정수 반올림, `Map(id → [x, y])` 반환 | 새 `site/lib/graph-layout.mjs` |
| 3 | `toGraphJson` 과 `checkGraphJson`, 최근 집합 계산, 머리 주석 갱신, `--check` 진입 | `site/lib/graph.mjs` |
| 4 | `buildGraph` 직후 배치 호출, `graph.json` 을 `toGraphJson` 으로 들여쓰기 없이 쓰기, 점검 호출, 로그 `[graph] layout NNNms`, `[graph] graph.json NNNB (gzip NNNB)` | `site/build.mjs` |
| 5 | 홈 히어로 엣지 루프와 `buildAdjacency` 를 `links` 로 (5.2절) | `site/assets/js/constellation.js`, `site/assets/js/graph-core.js` |
| 6 | 지금 `/graph/` 탐색기가 Phase 4 전에 배포될 경우를 막는다: `graph-explorer.js` 149, 157행에서 `graph.links` 를 쓰도록 두 줄 고친다. Phase 4가 같은 배포에 들어가면 생략 | `site/assets/js/graph-explorer.js` |
| 7 | `npm run build:strict` 통과, 홈 히어로를 라이트와 다크에서 눈으로 확인 (엣지가 그려지는가), `dist/graph.json` 크기 기록 | |

`paths.json` 과 `layout.json` 은 Phase 5의 해당 기능과 함께 만들고 V14, V15를 그때 켠다.

## 9. 확정된 결정 (2026-11-17 사용자 승인)

처음에는 사용자 결정이 필요한 미결 사항으로 적었다. 2026-11-17 사용자가 모두 추천안대로 확정했다.

| 번호 | 질문 | 선택지 | 추천과 결정 |
|---|---|---|---|
| D1 | 엣지를 인덱스 배열로 바꾸며 홈 히어로 코드를 고칠 것인가 | (a) `links` 평면 인덱스로 바꾸고 `constellation.js`, `graph-core.js` 를 Phase 3에서 고친다. 홈 gzip 37.9KB (지금보다 -2.9KB). (b) `edges` 객체를 유지해 홈 코드를 건드리지 않는다. 홈 gzip 52.6KB (+11.8KB) | 추천 **(a)**. 고칠 곳이 두 함수이고, 모든 홈 방문자의 전송량이 늘지 않고 준다. **결정: (a). `links` 인덱스 배열로 바꾸고 홈 히어로의 두 함수(`constellation.js` `runHero` 의 엣지 루프, `graph-core.js` `buildAdjacency`)를 Phase 3에서 고친다** |
| D2 | `year`, `type` 이 없는 페이지를 STRICT 실패로 볼 것인가 | (a) 경고만 하고 `null` 로 싣는다. (b) STRICT 실패 | 추천 **(a)**. CLAUDE.md 공통 키 검사는 lint 스크립트의 몫이고, 그래프 빌드가 막힐 이유가 아니다. 지금은 0건이다. **결정: (a) 경고만 하고 `null`** |

## 10. 개선 제안

이 절은 확정된 설계가 아니다. Phase 4, 5 구현 때 비용이 적은 것부터 골라 넣는다.

| 번호 | 제안 | 효과 | 비용 |
|---|---|---|---|
| C1 | **홈 전용 경량 파일.** `dist/graph-hero.json` 에 노드마다 `category`(Phase 7 전에는 `domain`), `degree` 와 `links` 만 싣는다. `links` 가 인덱스이면 히어로는 `id` 를 쓰지 않는다. 1절 J(`id` 포함)가 gzip 13,070B라 그보다 작다 | 홈 전송량 37.9KB에서 13KB 미만으로. 홈은 사이트 첫 화면이다 | 빌드 10줄, 히어로 `data-graph` 경로 하나. 계획서 3절 제약 문구를 바꾼다 |
| C2 | **`stem` 제거.** `id.slice(id.indexOf('/') + 1)` 로 구한다 | gzip -1.9KB (1절 I) | 검색 코드 한 줄. 이번에는 기존 필드를 남겨 소비자 변경을 줄였다 |
| C3 | **노드 순서를 id 사전순으로 고정.** `buildGraph` 가 노드를 정렬한다 | 파일시스템마다 홈 그림이 같아지고, 페이지 추가 때 `links` 인덱스 변화가 국소화된다 | 한 줄. 홈 히어로 그림이 한 번 바뀐다 |
| C4 | **빌드 두 번 좌표 비교.** Phase 6에 "같은 커밋으로 두 번 빌드한 `graph.json` 의 `xy` 가 같다" (05 개선 제안과 같다) | 배치 결정성 회귀를 값싸게 잡는다 | 스크립트 몇 줄 |
| C5 | **요청 주소에 버전 꼬리표.** 템플릿이 `graph.json?v=<빌드 해시 8자>` 로 요청한다 | 5.3절 옛 파일 조합이 생기지 않는다 | 템플릿 한 줄. GitHub Pages 캐시 시간(미확인)에 따라 효과가 다르다 |

## 11. 확인하지 못한 것

- 사이트 실제 빌드로 만든 `graph.json` 의 크기. 1절은 같은 모듈을 스크래치에서 불러 만든 값이다. Phase 3에서 `dist/` 로 다시 잰다.
- `JSON.parse` 시간 (158KB). 재지 않았다.
- CI(ubuntu)의 `readdir` 순서가 로컬과 같은지 (5.4절).
- `paths.json` 과 3D `layout.json` 의 실제 크기 (6절은 추정과 자리표시 값).
- GitHub Pages가 `graph.json` 에 주는 캐시 시간. 5.3절 옛 파일 조합이 얼마나 오래 생길 수 있는지 모른다.

## 개정 기록

| 날짜 | 고친 곳 | 내용 |
|---|---|---|
| 2026-11-17 | 0절 S3, 4.2절, 9절, 10절 | 사용자 승인으로 D1, D2를 추천안대로 확정하고 9절 제목을 "확정된 결정" 으로 바꿨다. 10절이 확정 설계가 아님을 적었다 |
| 2026-11-27 | 0절 S1, S6, 3.1절, 3.2절, 5.1절, 5.2절, 10절 C1 | Phase 7 `graph.mjs` 머리 주석 갱신과 함께 코드와 대조했다. `domain`, `recentDays` 제거를 결정 요약에 적고, `recentMode`, `id`, `category` 의 소비자를 지금 코드대로 고쳤다 |
