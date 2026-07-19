---
title: "Cutting LLM Token Costs with rtk, headroom, and caveman"
type: article
year: 2026
category: agents
source: yongkyun-2026-cutting-llm-token-costs-with.md
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

## 요약 (Summary)

headroom·rtk·caveman은 각각 60~90%대 토큰 절감을 내세우는 오픈소스 도구다. 저자 Yongkyun은 이 수치를 자신의 실제 Claude Code 세션(614M 토큰, $926 지출) 위에서 재생해 봤고 세 도구를 합쳐도 청구액의 3.7%밖에 줄지 않았다는 결과를 얻었다. 벤치마크가 거짓말을 하는 건 아니다. 다만 단일 페이로드를 분모로 삼은 수치와 세션 전체 청구액을 분모로 삼은 수치 사이에 간극이 있을 뿐이다.

![[assets/yongkyun-2026-cutting-llm-token-costs-with/fig01.png]]
*Figure 1: 에이전트 한 턴에서 토큰이 흐르는 세 지점 — input, output, tool output (Yongkyun 2026)*

에이전트 한 턴은 토큰을 세 곳으로 옮긴다. 모델이 읽는 input, 모델이 만드는 output, 도구 호출이 실행돼 돌아오는 tool output. 세 도구는 이 중 하나씩만 건드린다. headroom은 input(정확히는 프록시를 거치는 tool-result), rtk는 tool output(셸 명령 결과), caveman은 output(모델 산문)을 대상으로 한다.

## 주요 기여 (Key Contributions)

이 글의 축은 단일 페이로드 마이크로벤치마크와 실제 세션 재생(replay)을 나란히 놓은 데 있다. 전자는 각 도구가 설계된 콘텐츠(중복 grep 덤프, 반복 JSON, 장황한 산문)에서 얼마나 잘 작동하는지 보여주고 후자는 그 페이로드가 실제 트래픽에서 차지하는 비중이 얼마나 작은지 드러낸다.

절감을 세 겹으로 나눈 분해도 눈에 띈다. 분모 문제, 워크로드 불일치, 가격 구조 차이. 이 세 겹을 짚어야 "왜 60~90%가 3.7%로 쪼그라드는가"에 구체적인 답이 나온다. 보안 리스크도 "정직한 코드일 때"와 "릴리스가 손상됐을 때"로 나눠 따로 평가한다. 정직한 코드 기준으로는 신뢰 위치가 낮은 순서(rtk < caveman < headroom)와 릴리스가 손상됐을 때 위험도 순서가 정확히 일치한다는 점이 이 글의 결론 중 하나다.

## 방법론 및 아키텍처 (Methodology and Architecture)

**headroom**은 `ANTHROPIC_BASE_URL`을 가리키거나 `headroom wrap claude`로 실행하는 API 프록시다. 핵심 개념은 live zone이다. 요청은 두 부분으로 나뉜다. 마지막 캐시 마커까지는 이미 provider의 KV-cache에 저장돼 있고 가장 최근 사용자 메시지와 그 도구 결과만 아직 캐시되지 않았다. headroom이 손댈 수 있는 곳은 이 uncached tail뿐이다.

![[assets/yongkyun-2026-cutting-llm-token-costs-with/fig02.png]]
*Figure 2: headroom의 live zone 아키텍처 — 캐시된 prefix는 그대로 두고 uncached tail만 압축한다 (Yongkyun 2026)*

live zone 안에서는 라우터가 콘텐츠 블록을 유형별로 나눠 전문 압축기로 보낸다. 소스 코드는 AST 기반 CodeAware, JSON 배열은 SmartCrusher, 검색 결과·빌드 로그·git diff·HTML은 각각 별도 압축기, 나머지 평문은 학습된 Kompress가 맡는다. grep 결과 압축은 각 행을 점수화(쿼리 일치 +0.3, 오류 패턴 +0.5~0.3, 키워드 +0.4)해 상위 서브셋만 남기되 파일별 첫 매치·마지막 매치는 항상 보존하고 지운 행은 `[... and N more matches in file]` 마커로 표시한다. 압축이 정보를 지나치게 지웠을 때는 CCR(Compress-Cache-Retrieve)이 복구를 맡는다. 압축 전 원본을 콘텐츠 해시로 5분간 로컬 캐시해두고 모델이 `headroom_retrieve` 도구로 되불러올 수 있다.

**rtk**는 셸 명령이 실행되기 전에 가로챈다. `PreToolUse` 훅이 `git status`를 `rtk git status`로 바꿔치기하고 `std::process::Command`로 실제 바이너리를 셸을 거치지 않고 직접 실행한 뒤 출력을 필터링한다. `ls` 필터가 대표적인 예로, 긴 디렉토리 목록을 디렉토리 우선·사람이 읽기 쉬운 크기 단위·파일 개수 요약 형태로 압축한다. 파싱에 실패하면 원본 출력을 그대로 반환하는 폴백이 안전장치 전부다. 한계도 명확하다. Claude Code의 기본 Read·Grep·Glob 호출은 Bash 훅을 거치지 않으므로 rtk는 에이전트가 셸에서 직접 실행한 명령에만 작동한다.

**caveman**은 런타임에 페이로드를 변환하지 않는다. `SessionStart` 훅이 규칙집을 첫 턴 전에 숨겨진 시스템 컨텍스트로 심고 `UserPromptSubmit` 훅이 매 메시지마다 짧은 리마인더를 재주입한다. 규칙집은 관사·채우기 표현·인사말·회피 어법을 지우고 조각 문장을 허용하되 기술 용어·코드 블록·파일 경로·API 이름·오류 문자열은 그대로 둔다. 보안 경고·되돌릴 수 없는 작업 확인·순서가 있는 다단계 절차는 이 압축 규칙보다 우선한다. caveman이 내세우는 평균 65% 절감은 장황한 기본값 대비 수치라 "Answer concisely." 같은 평범한 baseline과 비교하면 정직한 수치는 중간값 50%로 내려간다.

측정은 두 단계로 이뤄졌다. VS Code 1.99·llama.cpp b9692·uv 0.11.21·ollama 0.30.10 네 저장소에서 캡처한 grep·git diff·ls 페이로드에 각 도구를 직접 돌려 최적 조건의 절감률을 구했고 `~/.claude/projects` 아래 2,182개 세션 중 500개(614M 토큰, $926.31 기준선 지출)를 표본으로 뽑아 실제 세션을 재생했다. headroom은 압축기가 순수 함수라 기록된 모든 tool-result에 직접 재실행했고 rtk는 자체 공개 절감률을 기록된 셸 출력 크기에 적용해 추정했으며 caveman은 재생이 불가능한 특성(생성 중 압축이라 완성된 텍스트에 재적용 불가) 탓에 산문 토큰에 중간값 50%를 곱해 추정했다.

## 결과 (Results)

도구별 직접 측정(최적 조건)에서는 headroom이 grep·diff에서 10~99% 편차에 중간값 54%, rtk가 grep ~99%·git diff 33~50%·ls 40~60%, caveman이 산문 10건 평가 중간값 50%(최저 0.4%)를 기록했다.

![[assets/yongkyun-2026-cutting-llm-token-costs-with/fig03.jpg]]
*Figure 3: headroom의 grep·diff 압축률 분포 (10%~99%) (Yongkyun 2026)*

![[assets/yongkyun-2026-cutting-llm-token-costs-with/fig04.jpg]]
*Figure 4: rtk의 명령별 토큰 절감률 — grep ~99%, git diff 33~50% (Yongkyun 2026)*

![[assets/yongkyun-2026-cutting-llm-token-costs-with/fig05.png]]
*Figure 5: caveman 산문 평가 10건 결과 — 중간값 50%, 최저 0.4% (Yongkyun 2026)*

500개 세션 재생 결과다.

| 도구 | 첫 턴 절감 | 전체 세션 절감 | USD 절감 | 비중 |
|---|---:|---:|---:|---:|
| headroom | 1.5M 토큰 | 41.3M 토큰 | $2.07 | 2.8% |
| rtk | 400k 토큰 | 4.5M 토큰 | $0.23 | 0.5% |
| caveman | 300k 토큰 | 3.8M 토큰 | $0.19 | 0.4% |
| 합계 | 2.2M 토큰 | 49.6M 토큰 | $3.7 | 3.7% |

![[assets/yongkyun-2026-cutting-llm-token-costs-with/fig06.jpg]]
*Figure 6: 500개 세션 재생 결과 — 첫 턴 절감, 전체 세션 절감, USD 절감 비교 (Yongkyun 2026)*

첫 턴 절감이 전체 세션 절감으로 이어질 때 약 26~27배가 곱해진다. 같은 압축 페이로드가 매 턴 `cache_read` 요율로 재전송되기 때문이다. 다만 500개 세션 중 compaction은 단 2건만 관찰됐으니 이 배수는 상한선에 가깝다. rtk는 tool-output 토큰의 22%에만 접근했고 나머지 78%는 Read 도구 등 Bash 훅을 우회하는 기본 도구를 통해 흘렀다. 이 78%는 대부분 파일 read라 grep 덤프 같은 근사 중복이 없어 rtk의 필터 방식으로는 손실 없이 줄이기 어렵다.

![[assets/yongkyun-2026-cutting-llm-token-costs-with/fig07.png]]
*Figure 7: 토큰 감소가 청구액 감소로 이어지지 않는 세 겹의 간극 — 분모, 워크로드, 가격 책정 (Yongkyun 2026)*

간극은 세 겹으로 쌓인다. 맨 아래 겹은 분모다. headroom이 92% 절감을 말할 때 분모는 17,765토큰짜리 단일 페이로드이지만 세션 전체 청구액을 분모로 두면 같은 절감분이 2.8%가 된다. 그 위에 워크로드 불일치가 놓인다. headroom의 벤치마크 표는 Elasticsearch 스타일 합성 JSON에서 나온 수치라 SmartCrusher가 80~95%까지 줄이는 최적 조건인데 저자의 실제 워크로드에서는 페이로드의 45%에서만 활성화됐고 중간값은 25%에 그쳤다. 마지막은 가격 책정이다. Opus 4.8 기준 fresh input $5/M, cache write $6.25/M, output $25/M, cache read $0.50/M인데 $926 지출의 42%는 cache_create, 29%는 output이 차지한다. 세 도구 어느 것도 이 두 스트림을 건드리지 않는다. headroom·rtk의 절감은 가장 싼 cache_read에 몰리고 caveman만 유일하게 가장 비싼 output을 줄인다.

## 한계와 보안 리스크 (Limitations and Security Risks)

3.7%라는 숫자는 저자 개인의 워크로드에서 나온 결과라 셸·grep 사용이 많거나 반복 구조 tool-result가 많은 워크로드에서는 다르게 나올 수 있다. rtk와 caveman은 과거 로그에 그대로 재실행할 수 없어 추정치라는 한계도 저자가 직접 밝힌다.

보안은 "정직한 코드"와 "손상된 릴리스"로 나눠 평가한다. 정직한 코드 기준으로는 rtk(로컬·좁은 범위)와 caveman(대부분 로컬 훅, `/caveman-compress`만 API 전송)이 상대적으로 안전하고 headroom이 API 키를 포함한 전체 프롬프트·응답을 보는 최대 신뢰 지점이다. 릴리스가 손상되는 경우로 가면 이 순위가 그대로 위험도로 뒤집힌다. 저자는 2024 XZ Utils 백도어, 2025 Shai-Hulud 웜, 2026 axios 침해 사례를 들어 세 도구 모두 젊은 오픈소스 프로젝트로서 공급망 공격에 노출될 수 있다고 지적한다. headroom이 손상되면 API 키·프롬프트·응답이 그대로 유출될 수 있다. rtk는 셸 훅을 통해 임의 명령 실행으로 이어질 수 있다(`headroom wrap claude`가 자동으로 rtk를 내려받아 사용자가 버전을 직접 고르지 않을 수도 있다). caveman은 매 메시지마다 Node 훅이 실행돼 손상 시 프롬프트 전송마다 코드 실행이 이뤄진다.

## 관련 페이지 (Related Pages)

- [[overviews/headroom-context-compression-overview|Headroom — 에이전트 컨텍스트 압축 개괄]] — headroom을 벤더·커뮤니티 소개글 다섯 개 관점에서 다룬 overview. 이 글은 그 "60~95% 절감" 주장에 대한 저자 자신의 실측 반론이다.
- [[agents/headroomlabs-ai-headroom|Headroom (repo)]] — headroom 정본 저장소 페이지. Figure 3의 grep·diff 압축률이 여기서 인용된 벤치마크와 같은 계열이다.
- [[agents/9bow-2026-headroom-ai-agent-context-compression|headroom 한국어 소개 (9bow)]] · [[agents/subratpati-2026-building-cost-efficient-agents-with|Cost-Efficient Agents (Subrat Pati)]] — headroom을 정확도·비용 관점에서 소개한 글. 이 글의 실측 결과와 대조해서 읽으면 좋다.
