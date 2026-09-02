---
title: "BrowserCode (browser-use) — The browser-native agent"
type: repo
year: 2026
category: agents
source: browser-use-browsercode.md
raw_path: raw/repos/browser-use-browsercode.md
raw_filename: "browser-use-browsercode.md"
source_collection: external
org: "browser-use"
repo: "browsercode"
url: "https://github.com/browser-use/browsercode"
license: "MIT"
tags: [browser-agent, coding-agent, cdp, opencode-fork, browser-harness, tui, cloud-browser, bu-bench, repo, oss]
figures:
  - id: fig01
    label: "Best BrowserCode models on BU Bench"
    kind: figure
    file: assets/browser-use-browsercode/fig01.png
    raw: https://raw.githubusercontent.com/browser-use/browsercode/main/static/browsercode_best_models_light.png
    caption: "BU Bench에서 BrowserCode와 가장 잘 맞은 모델 셋의 5축 비교"
    strategy: manual
    curated: true
  - id: fig02
    label: "Performance of LLMs with BrowserCode on BU Bench V1"
    kind: figure
    file: assets/browser-use-browsercode/fig02.png
    raw: https://raw.githubusercontent.com/browser-use/browsercode/main/static/browser_harness_by_model_light.png
    caption: "BU Bench V1에서 모델 18종의 BrowserCode 점수와 단가"
    strategy: manual
    curated: true
---

## 요약 (Summary)

BrowserCode는 browser-use가 [OpenCode](https://github.com/anomalyco/opencode)를 fork해 만든 코딩 에이전트다. 클릭·입력·스크롤을 각각 도구로 노출하는 대신 `browser_execute(code)` 하나만 두고, 에이전트가 그때그때 JavaScript를 짜서 Chrome DevTools Protocol로 브라우저를 직접 몬다. harness는 모델을 감싸 도구·검증·상태를 제공하는 실행 환경인데, BrowserCode의 harness는 그 표면적을 극단적으로 줄인 쪽에 서 있다. MIT 라이선스, TypeScript, `bcode` CLI 하나로 TUI와 headless 실행을 모두 처리한다.

설계 근거는 README의 철학 절 한 문장에 압축돼 있다 — 브라우저를 다루는 능력과 코드를 쓰는 능력은 깊이 연결돼 있다. 그래서 브라우저 조작을 아예 코드 작성 문제로 바꿔놓고 나머지는 모델의 코딩 능력에 맡긴다.

## 주요 기여 (Key Contributions)

1. **단일 primitive.** 아키텍처 절이 명시하는 핵심 도구는 `browser_execute(code)` 하나뿐이다. "Minimal abstractions. Maximal power to the agent"가 그 방침이다.
2. **세션이 호출 사이에 살아 있다.** 한 번에 완결된 스크립트를 짤 필요가 없어서 페이지를 열고, DOM을 들여다보고, 셀렉터를 고쳐가며 여러 번에 나눠 접근한다. 반환값은 로그·값·스크린샷 세 가지다.
3. **스크립트 재사용.** 에이전트가 쓴 브라우저 스크립트가 `.bcode/agent-workspace/`에 남아 다음 실행에서 다시 쓰인다. 사이트마다 런타임에 적응하되 그 결과가 휘발되지 않는다.
4. **브라우저 연결을 에이전트가 고른다.** 사용자가 방식을 지정하지 않는다. "지금 열린 amazon.com 탭에 붙어라", "새 프로필을 만들어 localhost:3000을 QA하고 PR을 올려라", "원격 브라우저를 열어라"라고 프롬프트로 말하면 에이전트가 그 경로를 잡는다.
5. **모델 커버리지를 상류에서 상속.** API 키로 닿는 모든 모델에 더해 OpenCode가 지원하는 provider 전부를 쓴다. TUI의 `/connect` 또는 환경 변수로 붙인다.
6. **클라우드 브라우저 무료 티어.** Browser Use Cloud가 동시 3세션 제한으로 브라우저를 무제한 제공하며 stealth·captcha 해결·프록시를 얹는다. `BROWSER_USE_API_KEY`만 있으면 되고, 가입 자체를 에이전트에게 맡길 수도 있다고 적혀 있다.

## 방법론 및 아키텍처 (Methodology and Architecture)

구조는 OpenCode fork에 [Browser Harness](https://github.com/browser-use/browser-harness)의 TypeScript 포팅본을 vendoring하고 도구 하나를 더한 형태다. 그 도구가 하는 일은 README에 네 줄로 적혀 있다.

```text
browser_execute(code)
  -> runs JavaScript in-process
  -> talks to Chrome through the DevTools Protocol
  -> keeps the browser session alive across calls
  -> returns logs, values, and screenshots to the agent
```

CDP를 제약 없이 쓴다는 점이 이 저장소를 다른 브라우저 에이전트와 가르는 지점이다. accessibility tree나 set-of-mark로 화면을 정형화해 모델에 먹이는 계열은 화면 좌표를 맞히는 grounding 문제를 안고 간다. grounding은 모델 출력을 외부 근거나 실제 화면에 붙들어 매는 일을 말하는데, [[evaluations/xie-2024-osworld-benchmarking-multimodal-agents-for]]는 OSWorld 실패의 75% 이상이 여기서 났다고 보고했다. BrowserCode는 좌표 대신 브라우저의 프로그래밍 인터페이스를 그대로 열어 그 층을 건너뛴다.

실행 경로는 둘이다. `bcode`가 TUI를 띄우고 `bcode run "..."`이 headless로 돈다. 호스팅 실행은 Browser Use Cloud의 `POST /api/v4/runs`로 넘긴다. 소스에서 돌릴 때 경로가 `packages/opencode`인 데서 fork 관계가 그대로 드러난다.

설치는 `curl -fsSL https://bcode.sh/install | bash` 한 줄이다.

## 결과 (Results)

README는 BU Bench라는 자체 벤치마크 결과로 모델 셋을 추천한다. 최고 성능은 `claude-opus-4-8`, 최고 open-weight는 `kimi-k3`, 가성비는 reasoning effort를 `xhigh`로 올린 `gpt-5.6-luna`다.

![[assets/browser-use-browsercode/fig01.png]]
*Figure 1: BU Bench 추천 모델 셋을 score·speed·price·가중치 공개 여부·구독 허용 다섯 축으로 비교한 레이더 (browser-use README)*

| 모델 | Score | Speed (task/hr) | Price (1달러당 task) | 가중치 | 구독 |
|---|---|---|---|---|---|
| Opus 4.8 (best performance) | 89.5% | 25.8 | 1.1 | closed | Claude Code 구독 차단 |
| Kimi K3 (best open-weight) | 86.0% | 6.3 | 1.3 | open | Kimi Coding 구독 허용 |
| Luna xhigh (best value) | 82.0% | 25.6 | 26.6 | closed | Codex 구독 허용 |

Luna의 가성비는 달러당 처리 task 수에서 나온다. 26.6 대 1.1이면 Opus의 24배이고, score 차이 7.5%p를 감수할 만한지가 선택의 기준이 된다. Kimi K3는 점수는 높은 편인데 시간당 6.3 task로 다른 둘의 4분의 1 속도다.

![[assets/browser-use-browsercode/fig02.png]]
*Figure 2: BU Bench V1에서 모델 18종의 점수. 막대 안 기호는 입력 토큰 백만당 단가, 파란 점선 테두리는 open-weight (browser-use README)*

| 모델 | Score | 단가 | open-weight |
|---|---|---|---|
| claude opus-4-8 | 89.5% | `$$$` | |
| claude fable-5 | 87.0% | `$$$` | |
| claude opus-5 | 87.0% | `$$$` | |
| grok 4.5 | 86.3% | `$$` | |
| kimi k3 | 86.0% | `$$$` | ● |
| glm 5.2 | 84.0% | `$$` | ● |
| gpt 5.6-sol | 84.0% | `$$$` | |
| gemini 3.1-pro | 82.4% | `$$` | |
| gpt-5.6-luna (xhigh) | 82.0% | `$$` | |
| gpt 5.5 | 80.0% | `$$$` | |
| gemini 3.6-flash | 79.0% | `$$` | |
| qwen 3.8max | 79.0% | `$$` | ● |
| deepseek v4-flash-0731 | 76.0% | `$` | ● |
| minimax m3 | 74.0% | `$` | ● |
| gpt-5.6-luna (default) | 72.4% | `$$` | |
| gpt 5.6-terra | 72.0% | `$$` | |
| gemini 3-flash | 66.2% | `$` | |
| gemini 3.5-flash-lite | 61.0% | `$` | |

같은 벤더의 기존 스택과 견줘 볼 여지도 있다. [[agents/browser-use-browser-use]] 저장소의 BU Bench V1 차트는 Browser Use Cloud v4 + Opus 4.8을 85.0%, OSS 라이브러리 최고를 claude opus-4-7의 74.0%로 적는다. BrowserCode 차트에서 같은 Opus 4.8이 89.5%다. 두 차트가 같은 시점의 같은 실행에서 나왔다는 보장은 없고 어느 쪽도 실행 로그를 공개하지 않으므로 4.5%p라는 차이를 그대로 받아들일 근거는 약하다. 다만 벤더가 자기 제품 라인 안에서 새 harness를 더 높은 자리에 놓았다는 사실은 읽힌다.

단가 기호는 `$`가 백만 토큰당 1달러 미만, `$$`가 1~3달러, `$$$`가 3달러 이상이다. 상위 일곱 모델이 89.5%에서 84.0% 사이에 몰려 있어 격차가 크지 않고, open-weight 다섯 종이 86.0%부터 74.0%까지 그 사이에 섞여 든다. 같은 `gpt-5.6-luna`가 reasoning effort만 default에서 xhigh로 바뀌며 72.4%에서 82.0%로 오르는 것도 눈에 띈다. harness가 같아도 추론 예산이 결과를 10%p 가까이 움직인다는 뜻이다.

## 한계 (Limitations)

- BU Bench는 browser-use가 만든 벤치마크이고 우위 주장의 근거도 여기뿐이다. OSWorld나 WebArena 점수가 없어 다른 계열과 직접 비교가 안 되고, task 구성·채점 방식·V1이라는 버전 표기의 의미도 저장소 안에서는 설명되지 않는다.
- "붙여본 모든 브라우저 에이전트를 능가한다"는 문장에 비교 대상도 상대 점수도 붙어 있지 않다. 차트 두 장은 모델별 비교일 뿐 harness끼리의 비교가 아니다.
- 제약 없는 CDP는 에이전트가 짠 JavaScript를 사용자의 실제 브라우저 세션에서 그대로 돌린다는 뜻이다. "현재 탭에 붙어라"는 사용법은 로그인된 세션 전체를 모델에 노출하는데 README에 가드레일 논의가 없다. 가드레일은 에이전트의 행동 범위를 제한하는 안전 장치를 말한다.
- 설치가 `curl | bash`이고 텔레메트리가 기본 활성이다. 후자는 `DO_NOT_TRACK=1`로 끈다.
- 저장소가 직접 밝히듯 대부분의 기여는 browser-harness나 opencode 상류로 가야 한다. OpenCode 팀과 무관하다고 못 박아 두었으니 fork 유지보수 부담은 이 저장소가 진다.

## 관련 페이지 (Related Pages)

- [[agents/browser-use-browser-use]] — 같은 조직의 Python 라이브러리. 브라우저를 CDP로 몬다는 뿌리는 같지만 그쪽은 고정된 agent loop의 기성품이고 이쪽은 코딩 에이전트에 도구 하나를 더한 형태다. BU Bench V1을 공유해 같은 축에서 비교된다
- [[evaluations/xie-2024-osworld-benchmarking-multimodal-agents-for]] — 실제 OS 위에서 computer-use agent를 재는 벤치마크. grounding이 병목이라는 결과가 BrowserCode의 "좌표 대신 코드" 선택과 맞닿는다
- [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]] — 같은 문제를 학습 데이터 쪽에서 다룬 연구. BrowserCode가 추론 시점의 harness로 푼다면 CUA-Gym은 환경과 task를 합성해 RLVR로 푼다
- [[evaluations/xlang-ai-osworld]] — OSWorld의 공식 구현체. 외부 벤치마크로 BrowserCode를 재보려 할 때의 출발점
- [[agents/stablyai-orca]] — OpenCode를 포함한 CLI 코딩 에이전트를 worktree 단위로 병렬 관리하는 오케스트레이터. 같은 상류를 반대편에서 다루는 사례
- [[overviews/glossary-agents]] — harness·가드레일·grounding 등 이 페이지의 용어 표기 기준
