---
title: "BrowserCode (browser-use): The browser-native agent"
type: repo
year: 2026
category: agents
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
    caption: "BU Bench에서 BrowserCode와 가장 잘 맞은 모델 순위"
    strategy: manual
    curated: true
  - id: fig02
    label: "Performance of LLMs with BrowserCode on BU Bench V1"
    kind: figure
    file: assets/browser-use-browsercode/fig02.png
    raw: https://raw.githubusercontent.com/browser-use/browsercode/main/static/browser_harness_by_model_light.png
    caption: "BU Bench V1에서 모델별 BrowserCode 성능"
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

browser-use가 OpenCode를 fork해 만든 코딩 에이전트. 브라우저 조작을 도구 API 여러 개로 감싸는 대신 `browser_execute(code)` 하나만 두고 에이전트가 JavaScript를 써서 Chrome DevTools Protocol로 직접 브라우저를 몬다. MIT.

## 1. 자료 정보 (Document Information)

- **Org / Repo**: `browser-use/browsercode`
- **저장소 설명**: "The browser-native agent framework"
- **License**: MIT
- **설치**: `curl -fsSL https://bcode.sh/install | bash` → CLI 이름 `bcode`
- **상위 프로젝트**: [anomalyco/opencode](https://github.com/anomalyco/opencode) fork + [browser-use/browser-harness](https://github.com/browser-use/browser-harness)의 TypeScript 포팅본을 vendoring
- **호스팅 실행**: Browser Use Cloud `POST https://api.browser-use.com/api/v4/runs`
- **GitHub 저장소 메타데이터 (2026-09-02 조회)**: TypeScript, 2026-04-21 생성, 최근 푸시 2026-08-30

README는 배지·데모 영상 자리와 벤치마크 차트 이미지 두 장을 빼면 분량이 짧다. 실행 방법과 설계 철학, 아키텍처 한 문단이 전부다.

## 2. 주요 기여 (Key Contributions)

1. **브라우저 조작을 코드 작성 문제로 환원.** README의 표현대로 "browser interaction을 coding problem으로 바꿨다". 클릭·입력·스크롤을 각각 도구로 노출하는 대신 에이전트가 그때그때 JavaScript를 짜서 실행한다.
2. **`browser_execute(code)` 단일 primitive.** 아키텍처 절이 명시하는 핵심 도구는 이것 하나다. 최소한의 추상화만 두고 나머지 권한은 모델에게 넘긴다는 방침("Minimal abstractions. Maximal power to the agent").
3. **스크립트 재사용.** 에이전트가 쓴 브라우저 스크립트를 `.bcode/agent-workspace/`에 남겨 다음 실행에서 다시 쓴다. 사이트마다 런타임에 적응하되 적응 결과가 휘발되지 않는다.
4. **브라우저 연결을 에이전트에게 맡김.** 사용자가 연결 방식을 고르지 않는다. 프롬프트로 "지금 열린 amazon.com 탭에 붙어라", "새 프로필을 만들어 localhost:3000을 QA해라", "원격 브라우저를 열어라"라고 말하면 에이전트가 알아서 그 경로를 잡는다.
5. **OpenCode 생태계의 모델 커버리지 상속.** API 키로 닿는 모든 모델에 더해 OpenCode가 지원하는 provider 전부를 그대로 쓴다. TUI의 `/connect` 또는 환경 변수로 붙인다.
6. **클라우드 브라우저 무료 티어.** Browser Use Cloud가 동시 3세션 제한으로 브라우저를 무제한 제공하고 stealth·captcha 해결·프록시를 얹는다. `BROWSER_USE_API_KEY`만 있으면 되고, 가입 자체를 에이전트가 자율로 처리하게 시킬 수도 있다고 적혀 있다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

BrowserCode는 OpenCode fork에 Browser Harness의 TypeScript 포팅본을 넣고 도구 하나를 더한 구조다. 그 도구가 하는 일은 README에 네 줄로 요약돼 있다.

```text
browser_execute(code)
  -> runs JavaScript in-process
  -> talks to Chrome through the DevTools Protocol
  -> keeps the browser session alive across calls
  -> returns logs, values, and screenshots to the agent
```

세 번째 줄이 설계의 무게중심이다. 호출 사이에 브라우저 세션이 살아 있으니 에이전트는 한 번에 완결된 스크립트를 짤 필요가 없다. 페이지를 열고, DOM을 들여다보고, 셀렉터를 고쳐가며 여러 번에 나눠 접근한다. 반환값도 로그와 값과 스크린샷 세 가지라 코드 실행 결과와 화면을 함께 본다.

CDP를 제약 없이("unconstrained") 쓴다는 점이 이 저장소가 스스로를 다른 브라우저 에이전트와 가르는 지점이다. accessibility tree나 set-of-mark처럼 화면을 정형화해 모델에 먹이는 계열과 달리, BrowserCode는 브라우저의 프로그래밍 인터페이스를 그대로 열어두고 모델의 코드 작성 능력에 기댄다. README의 철학 절이 "browser ability와 code-writing ability는 깊이 연결돼 있다"고 적은 것이 이 선택의 근거다.

TUI는 `bcode`, headless 실행은 `bcode run "..."`로 나뉜다. 소스에서 돌릴 때는 bun을 쓴다(`bun run --cwd packages/opencode dev`) — 패키지 경로가 `packages/opencode`인 데서 fork 관계가 드러난다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README는 BU Bench라는 자체 벤치마크 결과를 근거로 모델 셋을 추천한다. 최고 성능은 `claude-opus-4-8`, 최고 open-weight는 `kimi-k3`, 가성비는 reasoning effort를 `xhigh`로 올린 `gpt-5.6-luna`다.

수치는 본문 텍스트가 아니라 차트 이미지 두 장에만 들어 있다. 첫 장은 추천 모델 셋을 score·speed·price·가중치 공개 여부·구독 허용 다섯 축의 레이더로 비교한다.

| 모델 | Score | Speed (task/hr) | Price (1달러당 task) | 가중치 | 구독 |
|---|---|---|---|---|---|
| Opus 4.8 (best performance) | 89.5% | 25.8 | 1.1 | closed | Claude Code 구독 차단 |
| Kimi K3 (best open-weight) | 86.0% | 6.3 | 1.3 | open | Kimi Coding 구독 허용 |
| Luna xhigh (best value) | 82.0% | 25.6 | 26.6 | closed | Codex 구독 허용 |

Luna의 가성비는 달러당 처리 task 수에서 나온다. 26.6 대 1.1이면 Opus의 24배고, score 차이 7.5%p를 감수할 만한지가 선택의 기준이 된다. Kimi K3는 점수는 높지만 시간당 6.3 task로 다른 둘의 4분의 1 속도다.

두 번째 차트는 18개 모델을 score 순으로 세우고 입력 토큰 백만당 단가(`$` 1달러 미만, `$$` 1~3달러, `$$$` 3달러 이상)와 open-weight 여부를 함께 표시한다.

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

상위권은 89.5%에서 84.0% 사이에 일곱 모델이 몰려 있어 격차가 크지 않다. open-weight 다섯 종이 86.0%부터 74.0%까지 분포하며 상위권에 섞여 든다. 같은 `gpt-5.6-luna`가 reasoning effort만 default에서 xhigh로 바뀌며 72.4%에서 82.0%로 오르는 것도 눈에 띈다 — harness가 같아도 추론 예산이 결과를 10%p 가까이 움직인다.

별도 주장으로 "우리가 붙여본 모든 브라우저 에이전트를 능가한다"고 적었지만 비교 대상 목록도 상대 점수도 README에 없다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **자체 평가만 있다.** BU Bench는 browser-use가 만든 벤치마크이고 우위 주장의 근거도 여기뿐이다. OSWorld나 WebArena 같은 외부 벤치마크 점수는 README에 없어 다른 계열과 직접 비교가 안 된다. 벤치마크의 task 구성·채점 방식·V1이라는 버전 표기의 의미도 저장소 안에서는 설명되지 않는다.
- **비교 주장에 근거가 없다.** 다른 브라우저 에이전트를 전부 능가한다는 문장이 있지만 어떤 에이전트를 어떤 조건에서 붙였는지가 빠져 있다. 차트 두 장은 모델별 비교일 뿐 harness끼리의 비교가 아니다.
- **제약 없는 CDP의 보안 함의.** 에이전트가 짠 JavaScript가 사용자의 실제 브라우저 세션에서 그대로 돈다. "현재 탭에 붙어라"는 사용법은 로그인된 세션 전체를 모델에 노출한다는 뜻이기도 한데 README에 가드레일 논의가 없다.
- **설치가 `curl | bash`.** 원라인 설치 스크립트를 검증 없이 실행하는 방식이다.
- **텔레메트리 기본 활성.** 익명 사용 트레이스를 보내며 `DO_NOT_TRACK=1`로 끈다.
- **상류 프로젝트 의존.** 저장소가 직접 밝히듯 대부분의 기여는 browser-harness나 opencode로 가야 한다. OpenCode 팀과는 무관하다고 못 박아 두었는데, fork인 만큼 상류 변화에 따라오는 유지보수 부담이 남는다.

## 6. 관련 연구 (Related Work)

- [[agents/browser-use-browser-use]] — 같은 조직의 Python 라이브러리. 같은 BU Bench V1 위에서 Cloud v4 + Opus 4.8이 85.0%, OSS 최고가 74.0%로 적혀 있어 BrowserCode의 89.5%와 나란히 놓인다.
- [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]] — computer-use agent를 RLVR로 훈련시키기 위한 환경·task 합성. BrowserCode가 추론 시점의 harness로 문제를 푼다면 CUA-Gym은 학습 데이터 쪽에서 같은 문제를 다룬다.
- [[evaluations/xie-2024-osworld-benchmarking-multimodal-agents-for]] — 실제 OS 위에서 computer-use agent를 재는 벤치마크. 실패의 대부분이 화면 좌표를 못 맞히는 grounding이었다는 결과는 BrowserCode가 좌표 대신 코드를 택한 배경과 맞닿는다.
- [[agents/stablyai-orca]] — CLI 코딩 에이전트를 worktree 단위로 병렬 관리하는 오케스트레이터. OpenCode를 붙는 대상으로 다루는 반대편 사례다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| CDP (Chrome DevTools Protocol) | Chrome을 외부에서 조작·계측하는 프로토콜. BrowserCode는 이걸 감싸지 않고 그대로 쓴다 |
| `browser_execute(code)` | BrowserCode가 더한 단 하나의 브라우저 도구. JavaScript를 받아 실행하고 로그·값·스크린샷을 돌려준다 |
| Browser Harness | browser-use의 브라우저 자동화 라이브러리. TypeScript 포팅본이 이 저장소에 vendoring돼 있다 |
| BU Bench | browser-use의 자체 브라우저 에이전트 벤치마크. README의 모델 추천 근거 |
| `.bcode/agent-workspace/` | 에이전트가 쓴 재사용 가능한 브라우저 스크립트가 쌓이는 디렉토리 |
| bcode | CLI 실행 파일 이름. 인자 없이 TUI, `bcode run "..."`로 headless |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | "BU Bench에서 BrowserCode와 가장 잘 맞은 모델 순위" | manual | ★ wiki 권장 (result) |
| fig02 | "BU Bench V1에서 모델별 BrowserCode 성능" | manual | ★ wiki 권장 (result) |

repos는 이미지를 자동으로 받아오지 않으므로 두 장 모두 사용자 확인을 거쳐 `raw` 필드의 URL에서 받아 `wiki/assets/browser-use-browsercode/`에 저장했다. README에서 정량 정보를 담은 도식은 이 둘뿐이라 wiki 본문에 임베드했다. 배너 SVG와 푸터 webp는 장식이라 후보에서 뺐다.
