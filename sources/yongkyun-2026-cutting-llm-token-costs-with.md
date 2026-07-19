---
title: "Cutting LLM Token Costs with rtk, headroom, and caveman"
type: article
year: 2026
category: agents
raw_path: raw/articles/yongkyun-2026-cutting-llm-token-costs-with.md
raw_filename: "yongkyun-2026-cutting-llm-token-costs-with.md"
source_collection: external
author: "Yongkyun"
url: "https://codepointer.substack.com/p/cutting-llm-token-costs-with-rtk"
publisher: "Code Pointer (Substack)"
tags: [token-compression, headroom, rtk, caveman, context-engineering, cost-optimization, claude-code, prompt-caching]
figures:
  - id: fig01
    file: assets/yongkyun-2026-cutting-llm-token-costs-with/fig01.png
    raw: raw/articles/yongkyun-2026-cutting-llm-token-costs-with-figures/fig01.png
    caption: "에이전트 턴에서 토큰이 흐르는 세 지점 — input, output, tool output"
    strategy: manual
    curated: true
  - id: fig02
    file: assets/yongkyun-2026-cutting-llm-token-costs-with/fig02.png
    raw: raw/articles/yongkyun-2026-cutting-llm-token-costs-with-figures/fig02.png
    caption: "headroom의 live zone 아키텍처 — 캐시된 prefix와 압축 대상인 uncached tail의 경계"
    strategy: manual
    curated: true
  - id: fig03
    file: assets/yongkyun-2026-cutting-llm-token-costs-with/fig03.jpg
    raw: raw/articles/yongkyun-2026-cutting-llm-token-costs-with-figures/fig03.jpg
    caption: "headroom의 grep·diff 압축률 분포 (10%~99%)"
    strategy: manual
    curated: true
  - id: fig04
    file: assets/yongkyun-2026-cutting-llm-token-costs-with/fig04.jpg
    raw: raw/articles/yongkyun-2026-cutting-llm-token-costs-with-figures/fig04.jpg
    caption: "rtk의 명령별 토큰 절감률 (grep ~99%, git diff 33~50%)"
    strategy: manual
    curated: true
  - id: fig05
    file: assets/yongkyun-2026-cutting-llm-token-costs-with/fig05.png
    raw: raw/articles/yongkyun-2026-cutting-llm-token-costs-with-figures/fig05.png
    caption: "caveman 산문 평가 10건 결과 (중간값 50%, 최저 0.4%)"
    strategy: manual
    curated: true
  - id: fig06
    file: assets/yongkyun-2026-cutting-llm-token-costs-with/fig06.jpg
    raw: raw/articles/yongkyun-2026-cutting-llm-token-costs-with-figures/fig06.jpg
    caption: "500개 세션 재생 결과 — 첫 턴 절감, 전체 세션 절감, USD 절감 비교"
    strategy: manual
    curated: true
  - id: fig07
    file: assets/yongkyun-2026-cutting-llm-token-costs-with/fig07.png
    raw: raw/articles/yongkyun-2026-cutting-llm-token-costs-with-figures/fig07.png
    caption: "토큰 감소가 청구액 감소로 이어지지 않는 세 겹의 간극 — 분모, 워크로드, 가격 책정"
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

headroom·rtk·caveman 세 오픈소스가 각각 60~90%대 토큰 절감을 내세우지만 저자 본인의 실제 Claude Code 세션(614M 토큰, $926 지출) 위에서 재생해보면 세 도구를 합쳐도 청구액의 3.7%밖에 줄지 않았다는 실측 리포트. 벤치마크 수치가 거짓은 아니되, 합성 데이터·좁은 분모·프롬프트 캐싱 요금 구조라는 세 겹의 간극이 "토큰 감소"와 "청구액 감소" 사이를 어떻게 벌리는지 분해한다.

## 1. 자료 정보 (Document Information)

- **제목**: Cutting LLM Token Costs with rtk, headroom, and caveman
- **저자**: Yongkyun
- **게시**: Code Pointer (Substack), 2026-06-18
- **유형**: article (실측 벤치마크 겸 비판적 리뷰)
- **원문 URL**: https://codepointer.substack.com/p/cutting-llm-token-costs-with-rtk
- **관련 저장소**: [rtk](https://github.com/rtk-ai/rtk), [headroom](https://github.com/chopratejas/headroom), [caveman](https://github.com/JuliusBrussee/caveman)

## 2. 주요 기여 (Key Contributions)

에이전트 한 턴이 토큰을 옮기는 지점을 세 곳으로 나눈 프레임이 이 글의 축이다. 모델이 읽는 input(시스템 프롬프트, 사용자 메시지, 이전 도구 결과), 모델이 만드는 output(산문과 도구 호출), 도구 호출이 실행돼 다음 input으로 되돌아오는 tool output이다. headroom·rtk·caveman은 각기 이 세 스트림 중 하나만 건드린다.

이 글의 가장 큰 기여는 단일 페이로드 마이크로벤치마크와 실제 세션 재생(replay)을 나란히 놓고 비교한 데 있다. 마이크로벤치마크는 각 도구가 설계된 콘텐츠(중복 grep 덤프, 반복 JSON, 장황한 산문)에서 얼마나 잘 작동하는지 보여주고 세션 재생은 그 페이로드가 실제 트래픽에서 차지하는 비중이 얼마나 작은지를 드러낸다. 두 수치를 같이 봐야 벤더가 내세우는 "60~90% 절감"이 왜 청구서에서는 체감되지 않는지 설명된다.

여기에 절감을 세 겹으로 분해한 분석이 더해진다. 분모 문제(단일 페이로드 대비인지 전체 세션 대비인지), 워크로드 불일치(벤치마크가 실제 트래픽 구성을 대표하는지), 가격 구조(어떤 토큰 종류에 절감이 떨어지는지) 세 축이다. 이 분해 덕분에 "왜 60~90%가 3.7%로 쪼그라드는가"가 막연한 인상이 아니라 각 단계별로 짚을 수 있는 원인이 된다.

보안 리스크도 "정직한 코드일 때"와 "릴리스가 손상됐을 때"로 나눠 따로 평가한다. 세 도구 모두 로컬 우선(local-first) 설계라 오늘 시점 노출은 제한적이지만 신뢰 위치(trust position)로 보면 headroom이 가장 넓은 접근 권한(전체 프롬프트·응답·API 키)을 쥔다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

**headroom — 콘텐츠 유형별 프록시 압축**

headroom은 `ANTHROPIC_BASE_URL`을 가리키거나 `headroom wrap claude`로 실행하는 API 프록시다. 핵심 개념은 live zone이다. 요청은 두 부분으로 나뉜다. 마지막 캐시 마커까지는 이미 provider의 KV-cache에 저장돼 있고 가장 최근 사용자 메시지와 그 도구 결과만 아직 캐시되지 않았다. headroom이 손댈 수 있는 건 이 uncached tail뿐이다. 이렇게 경계를 나눠야 캐시된 prefix가 그대로 유지되면서 캐시를 깨뜨려 오히려 손해 보는 상황을 피한다.

live zone 안에서는 라우터가 콘텐츠 블록을 유형별로 나눠 전문 압축기로 보낸다. 소스 코드는 AST 기반 CodeAware, JSON 배열은 SmartCrusher, 검색 결과·빌드 로그·git diff·HTML은 각각 별도 압축기, 나머지 평문은 학습된 Kompress가 맡는다. grep 결과 압축을 예로 들면, 각 행을 점수화해(쿼리 일치 +0.3, 오류 패턴 +0.5~0.3, 키워드 +0.4) 상위 서브셋만 남기되, 파일별 첫 매치와 마지막 매치는 항상 보존하고 지운 행은 `[... and N more matches in file]` 마커로 표시한다. 몇 개를 남길지는 고정 top-N이 아니라 SimHash로 근사 중복을 묶은 뒤 고유 매치 수를 세어 정한다.

압축이 정보를 지나치게 지웠을 때를 대비해 CCR(Compress-Cache-Retrieve)이라는 복구 경로도 둔다. 압축 전 원본을 콘텐츠 해시로 5분간 로컬 캐시하고 모델이 필요하면 `headroom_retrieve` 도구를 호출해 되불러올 수 있다.

**rtk — 셸 출력을 줄이는 래퍼**

rtk는 셸 명령이 실행되기 전에 가로챈다. `PreToolUse` 훅이 `git status`를 `rtk git status`로 바꿔치기하고 모델은 원래 명령을 실행한 것으로 안다. rtk는 `std::process::Command`로 실제 바이너리를 셸을 거치지 않고 직접 실행한 뒤 출력을 필터링한다. `ls` 필터가 대표적인데 긴 디렉토리 목록을 트리 형태의 요약(디렉토리 우선, 사람이 읽기 쉬운 크기 단위, 마지막에 파일·디렉토리 개수 요약)으로 압축한다.

안전장치는 단순하다. 파싱에 실패하면 원본 출력을 그대로 반환한다. 잘린 diff에는 `[full diff: rtk git diff --no-compact]` 같은 복구 힌트를 남긴다. rtk가 아는 명령이 아니면 그냥 원시 출력을 통과시킨다. 다만 한계도 명확하다. Claude Code의 기본 Read·Grep·Glob 호출은 Bash 훅을 거치지 않으므로, rtk는 에이전트가 셸에서 직접 실행한 명령에만 작동한다.

**caveman — 프롬프트 주입으로 모델 발화를 줄이는 훅**

caveman은 런타임에 페이로드를 변환하지 않는다. 대신 두 개의 훅으로 프롬프트를 주입해 모델의 발화 습관 자체를 바꾼다. `SessionStart` 훅이 `SKILL.md` 규칙집을 읽어 첫 턴 전에 숨겨진 시스템 컨텍스트로 심고 `UserPromptSubmit` 훅이 매 메시지마다 짧은 리마인더를 다시 주입한다. 후자가 필요한 이유는 대화가 길어지면 Claude Code의 compaction이나 다른 플러그인이 첫 주입분을 컨텍스트 밖으로 밀어낼 수 있기 때문이다.

규칙집은 관사·채우기 표현·인사말·회피 어법을 지우고 조각 문장을 허용하지만 기술 용어·코드 블록·파일 경로·API 이름·오류 문자열은 그대로 둔다. 강도는 lite(채우기만 제거)·full(기본값)·ultra(인라인 표현까지 축약, 화살표로 인과관계 표시)로 나뉘고 고전 중국어 수준까지 압축하는 wenyan 단계도 있다. 보안 경고·되돌릴 수 없는 작업 확인·순서가 있는 다단계 절차는 이 압축 규칙보다 우선해 전체 문장으로 쓴다.

caveman은 출력 토큰만 줄이고 thinking 토큰은 건드리지 않는다. 프로젝트가 내세우는 평균 65% 절감은 장황한 "helpful assistant" 기본값 대비 수치라 어떤 terse 지시를 줘도 나올 절감분이 섞여 있다. "Answer concisely." 같은 평범한 baseline 대비로 측정하면 그 절반 수준인 중간값 50%가 정직한 수치다.

**측정 방법론**

저자는 두 단계로 측정했다. 우선 VS Code 1.99·llama.cpp b9692·uv 0.11.21·ollama 0.30.10 네 저장소에서 캡처한 grep·git diff·ls·git log 페이로드에 각 도구를 직접 돌려 최적 조건에서 나오는 절감률을 구했다. 이어 `~/.claude/projects` 아래 2,182개 세션 중 500개(총 614M 토큰, $926.31 기준선 지출)를 표본으로 뽑아 실제 세션을 재생했다. headroom은 압축기가 순수 함수이므로 기록된 모든 tool-result에 직접 재실행했고 rtk는 자체 공개 절감률을 기록된 셸 출력 크기에 적용해 추정했으며 caveman은 재생이 불가능한 특성상(생성 중 압축이라 완성된 텍스트에 재적용 불가) 산문 토큰에 중간값 50%를 곱해 추정했다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

**도구별 직접 측정(최적 조건)**

- headroom: grep·diff에서 10~99% 편차, 중간값 54%
- rtk: grep ~99%, git diff 33~50%, ls 40~60%
- caveman: 산문 10건 평가 중간값 50%, 최저 0.4%(이미 짧은 답변)

**500개 세션 재생 결과**

| 도구 | 첫 턴 절감 | 전체 세션 절감 | USD 절감 | 비중 |
|---|---:|---:|---:|---:|
| headroom | 1.5M 토큰 | 41.3M 토큰 | $2.07 | 2.8% |
| rtk | 400k 토큰 | 4.5M 토큰 | $0.23 | 0.5% |
| caveman | 300k 토큰 | 3.8M 토큰 | $0.19 | 0.4% |
| 합계 | 2.2M 토큰 | 49.6M 토큰 | $3.7 | 3.7% |

첫 턴 절감이 전체 세션 절감으로 이어질 때 약 26~27배 곱해진다. 같은 압축 페이로드가 매 턴 `cache_read` 요율로 재전송되기 때문이다. 다만 이 배수는 세션 중 compaction이 거의 일어나지 않았다는(500개 중 단 2건) 전제 위의 상한선이므로, 실제 compaction이 잦으면 절감폭은 더 줄어든다.

rtk는 tool-output 토큰의 22%에만 접근했고 나머지 78%는 Read 도구 등 Bash 훅을 우회하는 기본 도구로 흘렀다. 이 78%는 대부분 파일 read라서 grep 덤프 같은 근사 중복이 없어 rtk의 필터 방식으로는 손실 없이 줄이기 어렵다.

**세 겹의 간극**

첫 번째 간극은 분모다. headroom이 92% 절감을 말할 때 그 분모는 17,765토큰짜리 단일 페이로드다. 세션 전체 청구액을 분모로 두면 같은 절감분이 2.8%로 줄어든다.

다음은 워크로드다. headroom의 벤치마크 표는 Elasticsearch 스타일 합성 JSON에서 나온 수치라 SmartCrusher가 80~95%까지 줄이는 최적 조건이다. 저자의 실제 워크로드에서는 페이로드의 45%에서만 활성화됐고 중간값은 25%에 그쳤다.

마지막은 가격 책정이다. Opus 4.8 기준 fresh input $5/M, cache write $6.25/M, output $25/M, cache read $0.50/M. $926 지출의 42%는 cache_create, 29%는 output인데 세 도구 어느 것도 이 두 스트림을 건드리지 않는다. headroom·rtk의 절감은 가장 싼 cache_read에 몰리고 caveman만 유일하게 가장 비싼 output을 줄인다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

이 리포트는 스스로 몇 가지 한계를 밝힌다. rtk와 caveman은 과거 로그에 그대로 재실행할 수 없어 추정치다. 3.7%라는 숫자도 저자 개인의 워크로드에서 나온 것이라 셸·grep 사용이 많거나 반복 구조 tool-result가 많은 다른 워크로드에서는 다르게 나올 수 있다. 저자가 이 두 가지를 직접 언급한다. compaction 배수(26~27배)도 500세션 중 2건의 compaction만 관찰된 상황의 상한선이라는 단서가 붙는다.

보안 측면에서는 "정직한 코드"와 "손상된 릴리스"를 나눠 평가했다. 정직한 코드 기준으로는 rtk(로컬·좁은 범위)와 caveman(대부분 로컬 훅, `/caveman-compress`만 API 전송)이 상대적으로 안전하고 headroom이 API 키를 포함한 전체 프롬프트·응답을 보는 최대 신뢰 지점이다. 릴리스가 손상되는 경우로 가면 이 순위가 그대로 위험도로 뒤집힌다. 저자는 2024 XZ Utils 백도어, 2025 Shai-Hulud 웜, 2026 axios 침해 사례를 들어 세 도구 모두 젊은 오픈소스 프로젝트로서 공급망 공격에 노출될 수 있다고 지적한다. headroom은 손상되면 API 키·프롬프트·응답이 그대로 유출될 수 있다. rtk는 셸 훅으로 임의 명령이 실행될 수 있으며 `headroom wrap claude`가 자동으로 rtk를 내려받는 경로라 사용자가 버전을 직접 고르지 않았을 수도 있다. caveman은 매 메시지마다 Node 훅이 실행되므로 손상 시 프롬프트 전송마다 코드 실행이 이뤄진다.

## 6. 관련 연구 (Related Work)

이 글은 rtk·headroom·caveman의 GitHub 리포지토리와 저자 본인의 Claude Code 세션 로그(`~/.claude/projects`)를 1차 자료로 삼는다. 벤치마크 대조군으로 Opus 4.8의 공개 요율(fresh input/cache write/output/cache read)을 사용했다. 공급망 침해 사례로 2024 XZ Utils 백도어, 2025 Shai-Hulud 웜, 2026 axios 침해를 인용한다.

## 7. 용어집 (Glossary)

- **live zone**: headroom이 압축할 수 있는 유일한 영역으로, 마지막 캐시 마커 이후 아직 캐시되지 않은 요청 꼬리 부분
- **CCR (Compress-Cache-Retrieve)**: 압축 전 원본을 콘텐츠 해시로 임시 캐시해두고 필요 시 `headroom_retrieve` 도구로 복원하는 가역 압축 경로
- **cache_read / cache_create**: prompt caching에서 이미 캐시된 프리픽스를 재사용할 때(cache_read)와 새로 캐시를 생성할 때(cache_create) 각각 다른 요율로 청구되는 토큰 종류
- **PreToolUse / SessionStart / UserPromptSubmit**: Claude Code 훅 이벤트. rtk는 PreToolUse로 셸 명령을 가로채고 caveman은 SessionStart와 UserPromptSubmit으로 규칙을 주입한다
- **SimHash**: 근사 중복 문자열을 빠르게 그룹화하는 해시 기법. headroom이 grep 결과에서 사실상 같은 매치를 묶어 세는 데 사용
- **wenyan**: caveman이 제공하는 최고 압축 강도 단계로, 고전 중국어 수준까지 문장을 축약

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 에이전트 턴에서 토큰이 흐르는 세 지점 | manual | ★ wiki 권장 (핵심 프레임) |
| fig02 | headroom live zone 아키텍처 | manual | ★ wiki 권장 (architecture) |
| fig03 | headroom grep·diff 압축률 분포 | manual | ★ wiki 권장 (result) |
| fig04 | rtk 명령별 절감률 | manual | ★ wiki 권장 (result) |
| fig05 | caveman 산문 평가 10건 결과 | manual | ★ wiki 권장 (result) |
| fig06 | 500세션 재생 결과표 | manual | ★ wiki 권장 (핵심 결과) |
| fig07 | 토큰↔청구액 간극 3단 분해도 | manual | ★ wiki 권장 (핵심 결론) |
