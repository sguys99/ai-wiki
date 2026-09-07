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
    caption: "에이전트 한 턴의 토큰 흐름과 세 도구가 각각 담당하는 스트림"
    strategy: manual
    curated: true
  - id: fig02
    file: assets/yongkyun-2026-cutting-llm-token-costs-with/fig02.png
    raw: raw/articles/yongkyun-2026-cutting-llm-token-costs-with-figures/fig02.png
    caption: "headroom 프록시가 요청 본문에서 live zone만 압축하고 cached prefix는 그대로 두는 구조"
    strategy: manual
    curated: true
  - id: fig03
    file: assets/yongkyun-2026-cutting-llm-token-costs-with/fig03.jpg
    raw: raw/articles/yongkyun-2026-cutting-llm-token-costs-with-figures/fig03.jpg
    caption: "headroom의 저장소별 grep과 git diff 절감률 표 (grep 10~99%)"
    strategy: manual
    curated: true
  - id: fig04
    file: assets/yongkyun-2026-cutting-llm-token-costs-with/fig04.jpg
    raw: raw/articles/yongkyun-2026-cutting-llm-token-costs-with-figures/fig04.jpg
    caption: "rtk의 저장소별 명령 절감률 표 (grep, git diff, ls, git log)"
    strategy: manual
    curated: true
  - id: fig05
    file: assets/yongkyun-2026-cutting-llm-token-costs-with/fig05.png
    raw: raw/articles/yongkyun-2026-cutting-llm-token-costs-with-figures/fig05.png
    caption: "caveman 산문 평가 프롬프트 10건의 절감률 표 (88%에서 0.4%까지)"
    strategy: manual
    curated: true
  - id: fig06
    file: assets/yongkyun-2026-cutting-llm-token-costs-with/fig06.jpg
    raw: raw/articles/yongkyun-2026-cutting-llm-token-costs-with-figures/fig06.jpg
    caption: "500개 세션 재생 결과 표 (첫 턴 절감, 전체 세션 절감, USD, 지출 비중, 측정 방식)"
    strategy: manual
    curated: true
  - id: fig07
    file: assets/yongkyun-2026-cutting-llm-token-costs-with/fig07.png
    raw: raw/articles/yongkyun-2026-cutting-llm-token-costs-with-figures/fig07.png
    caption: "같은 1만 6천 토큰 절감이 분모에 따라 92%와 2.8%로 갈리는 구조"
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

headroom, rtk, caveman 세 오픈소스가 60~90% 토큰 절감을 보고하지만, 저자 본인의 실제 Claude Code 세션(6억 1,400만 토큰, 기준선 지출 $926.31) 위에서 재생하면 세 도구를 합쳐 $34.12, 즉 지출의 3.7%만 줄었다는 실측 리포트다. 저자는 공개 수치가 과장은 아니라고 명시하며, 분모와 워크로드와 가격 책정이라는 세 계층이 "토큰 감소"와 "청구액 감소" 사이를 어떻게 벌리는지 분해한다.

## 1. 자료 정보 (Document Information)

- **제목**: Cutting LLM Token Costs with rtk, headroom, and caveman
- **부제**: Design · Internals, the limited savings measured on real workloads, and security risks <!-- lint-style: ignore --> (원문 부제 표기 그대로)
- **저자**: Yongkyun
- **게시**: Code Pointer (Substack), 2026-06-18
- **유형**: article (실측 벤치마크 겸 비판적 리뷰)
- **원문 URL**: https://codepointer.substack.com/p/cutting-llm-token-costs-with-rtk
- **대상 저장소**: [rtk](https://github.com/rtk-ai/rtk), [headroom](https://github.com/chopratejas/headroom), [caveman](https://github.com/JuliusBrussee/caveman)

## 2. 주요 기여 (Key Contributions)

에이전트 한 턴이 토큰을 옮기는 지점을 세 곳으로 나눈 프레임이 이 글의 출발점이다. 모델이 읽는 input(시스템 프롬프트, 사용자 메시지, 이전 tool result), 모델이 만드는 output(산문과 tool call), tool call이 실행돼 다음 input으로 되돌아오는 tool output이다. headroom, rtk, caveman은 각기 이 세 스트림 중 하나만 건드린다.

가장 큰 기여는 단일 페이로드 마이크로벤치마크와 실제 세션 재생(replay)을 나란히 놓고 비교한 데 있다. 마이크로벤치마크는 각 도구가 설계된 콘텐츠(중복 grep 덤프, 반복 JSON, 장황한 산문)에서 얼마나 잘 작동하는지 보여주고, 세션 재생은 그 페이로드가 실제 트래픽에서 차지하는 비중이 얼마나 작은지를 드러낸다. 두 수치를 같이 봐야 공개된 "60~90% 절감"이 왜 청구서에서 체감되지 않는지 설명된다.

여기에 절감을 세 계층으로 분해한 분석이 더해진다. 분모 문제(단일 페이로드 대비인지 전체 세션 대비인지), 워크로드 불일치(벤치마크가 실제 트래픽 구성을 대표하는지), 가격 책정(어떤 토큰 종류에 절감이 떨어지는지)이다. 저자는 세 계층 중 워크로드 불일치가 가장 큰 간극이라고 짚는다.

보안 리스크도 "코드가 정직할 때"와 "릴리스가 손상됐을 때"로 나눠 따로 평가한다. 세 도구 모두 local-first 설계라 오늘 시점 노출은 제한적이지만, 요구하는 신뢰가 큰 순서와 손상 시 피해가 큰 순서가 같다는 점을 지적한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

**headroom, 콘텐츠 유형별 프록시 압축**

headroom은 `ANTHROPIC_BASE_URL`을 가리키거나 `headroom wrap claude`로 실행하는 API 프록시로, 에이전트와 provider 사이에서 모든 바이트를 본다. 설계의 중심은 live zone이다. 요청은 두 부분으로 나뉜다. 마지막 캐시 마커까지는 이미 provider의 KV-cache에 저장돼 있고, 가장 최근 사용자 메시지와 그 tool result만 아직 캐시되지 않았다. headroom이 다시 쓸 수 있는 것은 이 uncached tail뿐이다. 경계를 이렇게 나눠야 cached prefix가 그대로 적중하고, 캐시를 깨뜨려 절감분보다 큰 비용을 내는 상황을 피한다.

live zone 안에서는 라우터가 콘텐츠 블록(tool result 하나 또는 메시지 일부)을 유형별로 나눠 전문 압축기로 보낸다. 라우터가 인식하는 유형은 7종이며, 소스 코드는 AST 기반 CodeAware, JSON 배열은 SmartCrusher, 검색 결과와 빌드 출력과 git diff와 HTML은 각각 별도 압축기, 나머지 평문은 학습된 Kompress가 맡는다. headroom은 더 빠른 Rust 프록시도 함께 제공한다. Rust 프록시는 JSON, 빌드 출력, 검색 결과, git diff 4종만 네이티브로 압축하고 나머지는 그대로 통과시킨다.

검색 결과 압축이 대표적인 예다. grep이나 ripgrep 덤프는 `file:line:content` 행 수백 개로 도착하고 상당수가 같은 매치를 조금씩 다른 위치에서 반복한다. 여기서 압축은 행을 지우는 일이므로 압축기는 어떤 행을 남길지만 정하면 된다. 각 행을 점수화해 상위 서브셋만 남기는데, 활성 쿼리나 호출자가 지정한 키워드에 걸리면 점수가 오르고 오류처럼 보이면 더 오른다. 실제 가중치는 쿼리 일치 +0.3, 키워드 +0.4, 오류 패턴 +0.5에서 시작해 단계마다 0.1씩 감소하는 값이다. 오류 부스트는 error, warning, 일반 중요도 세 패턴을 순서대로 검사하고 첫 일치에서 멈추므로 한 행이 두 번 가산되지 않는다.

점수는 순위를 정할 뿐이고 몇 개를 남길지는 별도 판단이다. 압축기는 고정 top-N을 쓰지 않고 덤프가 담은 실제로 구별되는 매치 수를 세어 그만큼 남긴다. 항목이 8개 이하면 그대로 전부 남기고, SimHash로 근사 중복을 묶은 뒤 고유 항목이 3개 이하면 그 수만 남기며, 그 밖에는 고유 bigram 커버리지 곡선에서 Kneedle로 knee를 찾아 새 단어가 더 들어오지 않는 지점까지만 매치를 추가한다. 파일별 첫 매치와 마지막 매치는 항상 보존해 검색이 훑은 범위 전체가 보이게 하고, 지운 행은 `[... and N more matches in file]` 마커로 몇 개가 잘렸는지 알린다.

압축이 필요한 정보까지 지웠을 때를 대비해 CCR(Compress-Cache-Retrieve) 복구 경로를 둔다. 압축 전 원본을 콘텐츠 해시로 로컬 캐시하고 `headroom_retrieve` 도구를 주입해 모델이 필요할 때 되불러올 수 있게 한다. 원본 보관 기간은 5분이고, 그 이후 요청하면 retrieve는 빈 결과를 반환하므로 모델은 압축본을 그대로 쓰거나 검색을 다시 실행한다. 압축본과 마커는 어느 경우에도 대화에 남아 있다.

headroom은 rtk도 함께 관리한다. `headroom wrap claude`는 rtk 바이너리를 내려받아 Claude Code 훅으로 등록하므로, 프록시가 통신 구간의 요청을 압축하는 동안 rtk가 CLI 쪽 셸 출력을 줄인다. 두 도구가 서로 다른 스트림에 작용하므로 한 명령으로 양쪽 절감이 함께 켜진다.

**rtk, 셸 출력을 줄이는 래퍼**

rtk는 셸 명령이 실행되기 전에 가로챈다. `PreToolUse` 훅이 `git status`를 `rtk git status`로 바꿔 쓰고 모델은 원래 명령을 실행한 것으로 안다. 바꿔 쓴 경로에서 rtk는 `std::process::Command`로 실제 바이너리를 인자를 분리해 셸을 거치지 않고 직접 실행한 뒤 출력을 필터링한다. 필터는 필요한 필드만 남기고 관련 행을 묶고 반복 행을 지우며, 긴 출력은 복구 방법을 알리는 힌트와 함께 잘라낸다.

`ls` 필터가 명확한 예다. 긴 디렉토리 목록을 개수 요약이 붙은 압축 트리로 접는다. 원본 `ls -la`는 항목마다 mode, owner, group, 바이트 크기, 날짜를 한 행씩 출력하는데, `rtk ls`는 에이전트가 거의 쓰지 않는 열을 지우고 디렉토리를 슬래시와 함께 먼저 나열하며 파일 크기를 사람이 읽는 단위로 바꾸고 마지막에 한 줄 요약을 붙인다. `-a`를 주지 않으면 `.git`이나 `target` 같은 잡음 디렉토리도 걸러낸다.

안전 설계는 폴백 하나로 요약된다. 필터가 출력을 파싱하지 못하면 원본 명령 출력을 그대로 통과시킨다. 잘린 diff에는 `[full diff: rtk git diff --no-compact]` 힌트를 남겨 에이전트가 지워진 행을 되찾게 한다. rtk는 필터 방법을 아는 명령에서만 데이터를 지우고 그 밖에는 원시 출력을 그대로 보낸다. 한계도 하나 있다. Claude Code의 기본 Read, Grep, Glob 호출은 Bash 훅을 거치지 않으므로 rtk는 에이전트가 셸에서 실행한 것에만 작동한다.

**caveman, 프롬프트 주입으로 모델 발화를 줄이는 훅**

caveman은 런타임에 페이로드를 변환하지 않는다. 대신 두 개의 훅으로 프롬프트를 주입해 에이전트의 행동 자체를 다시 쓴다. `SessionStart` 훅이 `SKILL.md` 규칙집을 읽어 활성 강도에 맞게 걸러낸 뒤 첫 턴 전에 숨겨진 시스템 컨텍스트로 붙여 넣는다. 플러그인으로 설치하면 `SKILL.md`를 플러그인 루트에서 찾고, 단독 설치에서는 파일이 없어 하드코딩된 규칙으로 폴백한다.

두 번째 훅은 메시지를 보낼 때마다 발생하는 `UserPromptSubmit` 이벤트에서 같은 규칙을 다시 주입한다. 첫 주입이 항상 남아 있지는 않기 때문이다. 대화가 길어지면 Claude Code가 오래된 컨텍스트를 compaction으로 접고 다른 플러그인이 자기 텍스트를 더하는데, 둘 중 하나만으로도 원래 규칙이 컨텍스트 밖으로 밀려나고 그러면 모델은 장황한 기본 문체로 되돌아간다. 재주입분은 전체 규칙집이 아니라 한 줄 알림 수준으로 작게 유지하고, 전체 규칙은 세션 시작 주입이 계속 담당한다.

규칙집은 관사, 채우기 표현, 인사말, 회피 어법을 지우고 조각 문장을 허용하며 짧은 동의어를 선호한다("extensive"가 아니라 "big"). 기술 용어, 코드 블록, 파일 경로, API 이름, 오류 문자열은 정확히 그대로 둔다. 강도는 lite(전체 문장을 유지하고 채우기만 제거), full(기본값), ultra(config나 req처럼 산문 단어를 축약하고 인과를 화살표로 표시하되 실제 코드 심볼은 건드리지 않음)로 나뉘고, 더 큰 절감을 위해 고전 중국어로 압축하는 wenyan 단계도 있다. 보안 경고, 되돌릴 수 없는 작업 확인, 순서가 있는 다단계 절차에서는 압축 문체를 끄고 전체 문장으로 쓴다. 이 규칙이 위의 모든 압축 규칙보다 우선하므로 단어 하나가 실제 피해를 낳을 자리에서는 간결함이 이기지 않는다.

caveman은 output 토큰만 줄이고 thinking 토큰은 건드리지 않는다. 프로젝트는 이를 "Brain still big. Mouth small."로 요약한다. 공개된 평균 65% 절감은 장황한 "helpful assistant" 기본값 대비 수치라 어떤 terse 지시를 줘도 나올 절감분이 섞여 있다. "Answer concisely." 같은 평범한 baseline 대비로 재면 절감폭이 더 낮아지고, 저자의 마이크로벤치마크에서는 중간값 50%가 나왔다.

**측정 설계**

저자는 각 변환을 살아 있는 에이전트를 통해서가 아니라 직접 측정했다. 실행 중에는 설정 사이의 토큰 차이가 대부분 턴 수에서 나오고 턴 수는 실행마다 달라져 압축기가 실제로 한 일을 가리기 때문이다. 고정 페이로드에서는 결과가 결정적이다.

페이로드는 고정된 오픈소스 체크아웃 4개(VS Code 1.99, llama.cpp b9692, uv 0.11.21, ollama 0.30.10)에서 캡처했다. 각 저장소에서 고빈도 심볼을 하나씩 grep해 거의 같은 매치 행이 수천 개 나오게 만들었고(VS Code는 `registerSingleton`, llama.cpp는 `ggml_tensor`, uv는 모든 `pub fn`, ollama는 모든 `func`), git diff는 대표 하위 디렉토리에 대한 실제 릴리스 구간을 하나씩 잡았다(VS Code 챗 브라우저 코드 1.98에서 1.99, llama.cpp `ggml/src` b9500에서 b9692, uv `uv-resolver` crate 0.10에서 0.11.21, ollama `server/` v0.30.0에서 v0.30.10). rtk는 여기에 큰 디렉토리 대상 `ls -la`와 `git log --stat -50`을 더해 저장소마다 네 명령을 실행했다. 각 도구는 자기가 담당하는 스트림에서만 실행했다. headroom은 tool result input에서, rtk는 셸 출력에서, caveman은 모델 산문에서다.

caveman은 자체 산문 평가 프롬프트 10건에서 측정했다. 각 프롬프트의 답변을 스킬 없이 `Answer concisely.` 시스템 프롬프트만 준 답변과 비교했다. caveman의 자체 평가도 장황한 기본값이 아니라 이 terse 대조군을 쓰므로, 측정값은 짧게 답하라고 요청하는 것 위에 스킬이 더하는 몫만 반영한다.

두 번째 실험은 실제 트래픽 재생이다. 트래픽은 저자 본인의 Claude Code 이력(`~/.claude/projects`)으로 13개 프로젝트 디렉토리에 걸친 2,182개 세션이며, 한 프로젝트가 지배하지 않도록 디렉토리별로 층화해 500개를 표본으로 뽑았다. 빈 세션과 이상치 1건은 제외했다. 500개 세션은 합쳐서 6억 1,400만 토큰 코퍼스이고 기준선 지출은 $926.31이며, 각 도구의 반사실(counterfactual)을 턴 단위로 다시 계산했다.

| 도구 | 재생 방식 | 근거 |
|---|---|---|
| headroom | 직접 측정 | 압축기가 페이로드의 순수 함수라 기록된 모든 tool result에 실제 압축기를 실행 |
| rtk | 추정 | 자체 공개 명령별 절감률(명령에 따라 60~99%)을 매칭될 셸 출력의 실제 토큰 크기에 적용 |
| caveman | 추정 | 생성 중 문장을 줄이는 프롬프트라 완성된 텍스트에 재실행 불가. 스킬과 같은 방식으로 코드 블록을 제외한 산문 토큰에 중간값 약 50%를 곱함 |

caveman 추정은 실제 답변도 벤치마크와 같은 비율로 짧아진다고 가정하므로 세 도구 중 가장 느슨한 추정이다.

두 토큰 열을 읽을 때 유의할 점이 하나 있다. 모든 모델 턴은 컨텍스트 전체를 더 싼 `cache_read` 요율로 다시 보내므로, tool result 하나는 세션이 끝날 때까지 이후 모든 턴에서 다시 청구된다. 첫 턴 열은 페이로드가 처음 등장할 때 압축기가 지운 양이고, 전체 세션 열은 이후 재전송되는 매 턴까지 합친 양이다. 한 번 압축하면 절감이 여러 번 쌓인다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

**최적 조건의 도구별 직접 측정**

headroom은 grep 덤프와 diff에서 저장소별로 크게 갈렸다. grep은 매치 행이 반복적일 때 99%까지 줄지만 이미 서로 구별되는 매치가 오면 10%까지 내려간다. grep과 diff를 합친 중간값은 54%다.

| 저장소 | grep | git diff |
|---|---:|---:|
| VS Code | 10% | 52% |
| llama.cpp | 99% | 55% |
| uv | 81% | 49% |
| ollama | 97% | 43% |

rtk는 grep에서 가장 크게 줄인다. 매칭 행을 전부 반환하지 않고 묶은 개수를 돌려주기 때문이다. VS Code `src/`에 `rg registerSingleton`을 실행한 경우 69만 4천 토큰이 2,400 토큰으로 줄었다. 거의 같은 매치 행이 잘 접히므로 grep은 모든 저장소에서 99% 근처를 유지한다. ollama가 git diff의 예외로, v0.30.0에서 v0.30.10 사이 `server/` 변경이 작고 코드 밀도가 높아 33%만 줄었다.

| 저장소 | grep | git diff | ls | git log |
|---|---:|---:|---:|---:|
| VS Code | 99.7% | 96% | 85% | 31% |
| llama.cpp | 99.3% | 97% | 72% | 52% |
| uv | 98.0% | 95% | 81% | 58% |
| ollama | 97.5% | 33% | 71% | 39% |

caveman은 산문 평가 10건에서 88%에서 0.4%까지 퍼졌고 중간값은 50%였다. 가장 작게 줄어든 항목은 Node 프로세스 메모리 누수 질문으로, 답변이 이미 간결해 0.4%에 그쳤다.

| 프롬프트 | 절감 |
|---|---:|
| Explain database connection pooling | 88% |
| What's the point of a debouncer on a search input | 68% |
| Why am I getting CORS errors in the browser console | 58% |
| When should I use a queue vs a topic in messaging | 56% |
| Why does my React component re-render on every parent update | 55% |
| How does git rebase differ from git merge | 46% |
| How does a hash table handle collisions | 38% |
| What does the SQL EXPLAIN command tell me | 30% |
| What's the difference between TCP and UDP | 22% |
| How do I fix a memory leak in a long-running Node process | 0.4% |

세 도구 모두 자기를 위해 만들어진 콘텐츠에서는 공개된 절감률에 도달한다. 다만 이 수치는 이상적 입력에서 스트림 하나만 따로 잰 값이다.

**500개 세션 재생 결과**

| 도구 | 첫 턴 절감 | 전체 세션 절감 | USD | 지출 비중 | 방식 |
|---|---:|---:|---:|---:|---|
| headroom | 150만 1천 토큰 | 4,130만 토큰 | $25.61 | 2.8% | 직접 측정 |
| rtk | 28만 2천 토큰 | 840만 토큰 | $4.94 | 0.5% | 추정 |
| caveman | 11만 토큰 | 225만 토큰 | $3.58 | 0.4% | 추정 |
| 합계 | 원문 미표기 | 원문 미표기 | $34.12 | 3.7% | 미표기 |

마이크로벤치마크가 보여주지 못하는 결과가 두 가지다. 첫째는 수명 증폭이다. headroom의 첫 턴 150만 1천 토큰이 전체 세션에서는 4,130만 토큰으로 약 27배가 되고, 세 도구 평균은 약 26배다. 같은 압축 페이로드가 매 턴 `cache_read` 요율로 재전송되기 때문이다. 다만 이 배수에는 단서가 붙는다. Claude Code는 컨텍스트가 차면 세션을 compaction하며 오래된 tool result를 지우는데, 500개 세션 전체에서 compaction 이벤트는 2건만 나타났다. 배수는 페이로드가 실제보다 오래 살아남는다고 가정한 상한이며, 실제 compaction이 일어나면 절감폭은 더 줄어든다.

둘째는 rtk가 tool output 토큰의 22%에만 닿는다는 점이다. 나머지 78%는 셸 훅을 우회하는 기본 도구로 흘렀고 거의 전부가 Read 도구다. 우회 경로를 `rtk grep`이나 `rtk cat`으로 바꿔도 이 코퍼스에서 회수되는 양은 적다. 우회 스트림의 78%가 파일 read인데, 파일 read에는 grep 덤프를 99% 접게 해주는 근사 중복 행이 없다. rtk의 파일 필터는 반복 행 제거와 절단만 하고, 절단은 에이전트가 요청한 내용을 지운다. 그다음으로 큰 우회 스트림인 WebSearch, WebFetch, 서브에이전트 결과에는 rtk 필터가 아예 없다. rtk의 공개 파일 read 규칙을 기록된 Read 크기에 적용하면 현실적 경우 약 $5가 더해져 rtk 절감이 지출의 약 1%로 두 배가 되고, read가 grep 덤프만큼 잘 압축된다고 가정한 낙관적 상한에서는 약 $25가 된다.

**토큰 감소와 청구액 감소를 가르는 세 계층**

headroom은 60~95% 토큰 감소를, rtk는 인식하는 명령당 60~99%를, caveman은 산문 절반을 공개 수치로 내세운다. 재생에서 나온 값은 각각 지출의 2.8%, 0.5%, 0.4%다. 저자는 공개 수치 중 과장된 것은 없다고 명시한다. 각각이 서로 다른 워크로드에서 서로 다른 것을 재고 있고, 그 사이에 세 계층이 놓여 있다.

첫째 계층은 분모다. headroom README 표의 합성 코드 검색 페이로드 하나를 92% 압축하면 약 1만 6천 토큰이 지워진다. headroom은 이 1만 6천을 그 단일 페이로드 크기 17,765토큰으로 나눠 92%를 얻는다. 재생은 같은 1만 6천을 수백 턴에 걸치고 캐시와 output 비용이 지배하는 세션 청구액 전체로 나누므로 2.8%가 된다. 나머지 두 도구도 같은 좁은 분모를 쓴다. rtk는 인식한 셸 명령 하나로 나누고 caveman은 답변 하나의 산문으로 나눈다.

둘째 계층은 워크로드이고 세 계층 중 간극이 가장 크다. headroom의 압축률은 페이로드 유형에 좌우된다. 가장 강한 전략은 중복 행을 지우는 방식이라 JSON 배열이나 검색 덤프처럼 구조화되고 반복적인 데이터에서만 효과가 난다. headroom의 벤치마크 표는 전량 그 유형이며 실제 트래픽에서 캡처한 것이 아니라 합성 생성물이다. "Code search (100 results) = 17,765 tokens" 행은 Elasticsearch 스타일 JSON 레코드 100개를 뽑아내는 생성기에서 나오는데, 이는 SmartCrusher가 80~95%까지 줄이는 바로 그 중복 덤프다. 저자 본인의 워크로드에서는 headroom이 페이로드의 45%에서만 활성화됐고 중간값 절감은 25%였다. 대부분이 중복이 적은 평문과 소스 코드였기 때문이며, 고압축 전략은 2,781건의 활성화 중 46건에서만 발동했다. rtk와 caveman도 같은 방식으로 공개 워크로드를 비껴간다. rtk의 60~99%는 grep 결과나 디렉토리 목록 같은 중복 덤프를 가정하지만 tool output 토큰의 78%는 셸 훅에 닿지 않고, 닿는 것 중에도 몇 줄뿐인 출력이 많다. caveman의 50%는 턴이 대부분 산문이라고 가정하지만 실제 답변에는 스킬이 제외하는 코드 블록과 줄일 여지가 적은 짧은 답이 섞인다.

셋째 계층은 가격 책정이고 headroom의 수치가 빠뜨린 부분이다. 토큰은 균일하게 청구되지 않는다. Opus 4.8 요율에서 fresh input은 100만 토큰당 $5, cache write는 $6.25, output은 $25, cache read는 $0.50이다. 표본의 $926 지출은 대부분 `cache_create`(42%)와 output(29%)이며 세 도구 어느 것도 이 두 스트림을 바꾸지 않는다. headroom과 rtk의 절감은 대부분 `cache_read`에 떨어진다. 둘 다 컨텍스트에 들어가 이후 매 턴 `cache_read` 요율로 재전송되는 tool result 페이로드를 압축하기 때문이다. 첫 등장은 cache write로 한 번 청구되지만 그 뒤의 많은 재읽기가 비용의 대부분을 차지하므로, 두 도구가 지우는 것은 대부분 청구서에서 가장 싼 토큰인 `cache_read`이고 그 요율은 fresh input의 10분의 1이다. caveman만 예외로, 모델이 쓰는 동안 output을 줄이며 output은 100만 토큰당 $25로 가장 비싼 토큰이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자가 직접 밝히는 한계가 세 가지다. 첫째, rtk와 caveman은 과거 로그에 그대로 재실행할 수 없어 추정치다. 둘째, 3.7%는 저자 개인의 Claude Code 이력에서 나온 값이라 보편적인 수치가 아니다. 셸과 grep 사용이 많으면 rtk에게 줄일 것이 늘고 반복 구조 tool result가 많으면 headroom에게 줄일 것이 늘어난다. 셋째, 26배에서 27배에 이르는 수명 배수는 500개 세션 중 compaction이 2건만 관찰된 상황의 상한이며 실제 compaction이 잦으면 절감이 낮아진다. 저자는 이 방향의 오차가 "절감분은 작은 조각"이라는 결론을 오히려 강화한다고 덧붙인다.

보안은 "코드가 정직할 때"와 "릴리스가 손상됐을 때"라는 별개의 두 질문으로 나눠 다룬다. 정직한 코드 기준으로는 요구하는 신뢰가 낮은 쪽부터 rtk, caveman, headroom 순이다. rtk는 로컬이고 범위가 좁다. 명령 stdout을 필터링하고 실제 바이너리를 인자를 분리해 실행하므로 셸 주입 표면이 없으며, opt-in 텔레메트리 외에는 네트워크 호출 없이 토큰 메트릭을 로컬에 저장한다. 여기서 실제 위험은 데이터 유출이 아니라 정확성이다. 중요한 경고 행 하나를 필터가 지우면 에이전트에게 불완전한 그림이 남고, 복구는 `--no-compact`로 다시 실행하는지에 달린다.

caveman은 대부분 로컬 훅이고 경계를 넘는 곳이 한 군데다. 기본 모드는 프롬프트만 주입하고, `/caveman-compress` 워크플로만 파일 내용을 Anthropic API로 보내 다시 쓴다. 이 경로의 방어는 잘 갖춰져 있다. `.env*`, `*.pem`, `*.key`, `.ssh`나 `.aws`나 `.kube` 아래의 모든 것 같은 민감 경로를 거부하고 파일 크기 상한을 둔다. 모드 훅은 플래그 파일을 `O_NOFOLLOW`와 원자적 임시파일 rename으로 써서 symlink 덮어쓰기 공격을 막는다. 남는 위험은 압축이 곧 모델이 컨텍스트를 다시 쓰는 일이라는 점이다. CLAUDE.md를 잘못 다시 쓰면 이후 모든 세션이 조용히 오염된다.

headroom은 최대 신뢰 지점을 차지한다. 프록시로서 전체 프롬프트, 전체 응답, API 키가 담긴 `Authorization` 헤더를 본다. 키는 그대로 전달하고 자체 내부 헤더는 전달 전에 제거하며 로그에서 키를 마스킹한다. 다만 CCR 캐시가 비압축 원본을 잠시 로컬 SQLite에 쓰므로 민감한 출력의 스냅샷이 디스크에 남는다.

세 도구가 공유하는 위험은 데이터가 기기를 떠나는 것이 아니다. 기본이 local-first라서다. 공유 위험은 조용한 손실 압축이 에이전트에게 부분적인 그림만 주는 것이다. caveman은 모델이 스스로 압축하기를 신뢰하고, rtk는 원시 폴백이 붙은 허용 목록을 신뢰하며, headroom은 전문 압축기를 신뢰하되 지워진 바이트를 되불러올 수 있는 유일한 도구다.

릴리스가 손상되는 경우로 가면 앞의 신뢰 순위가 그대로 피해 순위가 된다. 세 프로젝트 모두 젊어서 최근 공급망 공격과 같은 방식으로 이후 릴리스가 손상될 수 있다. 2024 XZ Utils 백도어는 2년에 걸쳐 maintainer 권한을 얻은 기여자가 공개 소스에는 없던 백도어를 릴리스 tarball에 넣은 사례였다. 2025 Shai-Hulud 웜과 2026 axios 침해는 더 빠른 경로를 택해 maintainer의 퍼블리시 계정을 탈취하고 오염된 버전을 수 시간 동안 게시했다. 어느 쪽이든 읽은 코드가 항상 실행되는 코드는 아니다. 따라서 local-first는 오늘의 코드가 가진 성질일 뿐 보장이 아니며, 악성 버전은 한 줄로 네트워크 호출을 더할 수 있고 위에서 정리한 데이터 노출 범위가 그대로 공격 수단이 된다.

노출이 가장 큰 쪽은 headroom이다. 손상된 프록시는 전체 프롬프트와 응답과 API 키를 보므로 한 번의 나쁜 릴리스로 키를 훔치거나 비공개 코드를 복사하거나 응답을 편집해 에이전트를 유도할 수 있다. rtk는 손상된 릴리스가 곧 임의 명령 실행이 된다. 셸 훅에서 동작하므로 명령을 바꾸거나 추가 명령을 실행하거나 그 출력을 기기 밖으로 보낼 수 있고, 사용자가 직접 설치하지 않았을 수도 있다. `headroom wrap claude`가 rtk 바이너리를 대신 내려받으므로 오염된 rtk가 사용자가 버전을 고르지 않은 채 headroom을 통해 도달할 수 있다. caveman은 세션 시작과 모든 메시지에서 Node 훅을 실행하므로, 악성 훅은 프롬프트를 보낼 때마다 코드 실행이 된다. 기본 모드는 로컬에 머물지만 compress 워크플로는 이미 API를 호출하고 있어 나쁜 버전이 전송 범위를 넓히거나 민감 파일 필터를 제거할 수 있다.

저자는 마지막으로 판단 기준을 제시한다. 세 도구를 더하기 전에 작은 절감이 세 도구 모두에 그만한 접근과 신뢰를 주는 값을 하는지 스스로 정해야 한다는 것이다.

## 6. 관련 연구 (Related Work)

이 글은 rtk, headroom, caveman의 GitHub 저장소와 저자 본인의 Claude Code 세션 로그(`~/.claude/projects`)를 1차 자료로 삼는다. 비용 환산에는 Opus 4.8의 공개 요율(fresh input, cache write, output, cache read)을 사용했다. 벤치마크 대조 대상은 headroom README의 벤치마크 표와 caveman의 자체 산문 평가 세트다. 공급망 침해 사례로 2024 XZ Utils 백도어, 2025 Shai-Hulud 웜, 2026 axios 침해를 인용한다.

## 7. 용어집 (Glossary)

- **live zone**: headroom이 압축할 수 있는 유일한 영역으로, 마지막 캐시 마커 이후 아직 캐시되지 않은 요청 꼬리 부분
- **CCR (Compress-Cache-Retrieve)**: 압축 전 원본을 콘텐츠 해시로 5분간 임시 캐시해두고 필요 시 `headroom_retrieve` 도구로 복원하는 가역 압축 경로
- **cache_read / cache_create**: prompt caching에서 이미 캐시된 prefix를 재사용할 때(cache_read)와 새로 캐시를 생성할 때(cache_create) 각각 다른 요율로 청구되는 토큰 종류
- **PreToolUse / SessionStart / UserPromptSubmit**: Claude Code 훅 이벤트. rtk는 PreToolUse로 셸 명령을 가로채고 caveman은 SessionStart와 UserPromptSubmit으로 규칙을 주입한다
- **SimHash**: 근사 중복 문자열을 빠르게 묶는 해시 기법. headroom이 grep 결과에서 사실상 같은 매치를 하나로 세는 데 사용
- **Kneedle**: 곡선에서 증가가 꺾이는 knee 지점을 찾는 알고리즘. headroom이 고유 bigram 커버리지 곡선에 적용해 남길 매치 수를 정한다
- **SmartCrusher**: headroom의 JSON 배열 전용 압축기. 반복 구조 레코드에서 80~95%까지 줄인다
- **wenyan**: caveman이 제공하는 최고 압축 강도 단계로, 고전 중국어 수준까지 문장을 축약
- **반사실(counterfactual)**: 어떤 도구를 켰다면 청구액이 얼마였을지를 기록된 로그에서 다시 계산한 값

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 에이전트 한 턴의 토큰 흐름과 세 도구가 각각 담당하는 스트림 | manual | ★ wiki 권장 (핵심 프레임) |
| fig02 | headroom 프록시가 요청 본문에서 live zone만 압축하고 cached prefix는 그대로 두는 구조 | manual | ★ wiki 권장 (architecture) |
| fig03 | headroom의 저장소별 grep과 git diff 절감률 표 (grep 10~99%) | manual | ★ wiki 권장 (result) |
| fig04 | rtk의 저장소별 명령 절감률 표 (grep, git diff, ls, git log) | manual | ★ wiki 권장 (result) |
| fig05 | caveman 산문 평가 프롬프트 10건의 절감률 표 (88%에서 0.4%까지) | manual | ★ wiki 권장 (result) |
| fig06 | 500개 세션 재생 결과 표 (첫 턴 절감, 전체 세션 절감, USD, 지출 비중, 측정 방식) | manual | ★ wiki 권장 (핵심 결과) |
| fig07 | 같은 1만 6천 토큰 절감이 분모에 따라 92%와 2.8%로 갈리는 구조 | manual | ★ wiki 권장 (핵심 결론) |
