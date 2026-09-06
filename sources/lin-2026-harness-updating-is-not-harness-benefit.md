---
title: "Harness Updating Is Not Harness Benefit: Disentangling Evolution Capabilities in Self-Evolving LLM Agents"
type: paper
year: 2026
category: agents
raw_path: raw/papers/lin-2026-harness-updating-is-not-harness-benefit.pdf
raw_filename: "lin-2026-harness-updating-is-not-harness-benefit.pdf"
source_collection: external
tags: [harness-evolution, self-evolving-agents, agent-capabilities, skill-following, instruction-following, long-horizon, SWE-bench, MCP-Atlas, SkillsBench, claude-opus, qwen3, gpt-oss]
authors: "Minhua Lin, Juncheng Wu, Zijun Wang, Zhan Shi, Yisi Sang, Bing He, Zewen Liu, Tianxin Wei, Zongyu Wu, Zhiwei Zhang, Dakuo Wang, Xiang Zhang, Benoit Dumoulin, Cihang Xie, Yuyin Zhou, Suhang Wang, Hanqing Lu"
arxiv_id: "2605.30621"
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/lin-2026-harness-updating-is-not-harness-benefit/fig01.png
    raw: raw/papers/lin-2026-harness-updating-is-not-harness-benefit-figures/fig01.png
    caption: "harness self-evolution의 전체 구조. frozen LLM을 memory, tools, prompts, skills로 이루어진 harness가 감싸고, 실행 경험을 진단한 evolver model이 그 harness를 갱신하는 순환이다"
    page: 1
    bbox_norm: [0.5299, 0.254, 0.8702, 0.3988]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/lin-2026-harness-updating-is-not-harness-benefit/fig02.png
    raw: raw/papers/lin-2026-harness-updating-is-not-harness-benefit-figures/fig02.png
    caption: "두 발견의 요약도. 왼쪽은 harness-updating이 base capability와 무관하게 평평하다는 산점도이고, 오른쪽은 harness-benefit이 mid-tier에서 최대가 되는 비단조 곡선과 weak-tier의 두 실패 모드를 함께 보여준다"
    page: 2
    bbox_norm: [0.128, 0.077, 0.872, 0.2529]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/lin-2026-harness-updating-is-not-harness-benefit/fig03.png
    raw: raw/papers/lin-2026-harness-updating-is-not-harness-benefit-figures/fig03.png
    caption: "evolver 7종의 harness-updating 값. 벤치마크 3종별로 anchor agent 3개 위 평균 gain을 막대로 그렸고, 최고와 최저 evolver가 벤치마크마다 바뀐다"
    page: 5
    bbox_norm: [0.109, 0.077, 0.891, 0.2564]
    strategy: caption-region
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/lin-2026-harness-updating-is-not-harness-benefit/fig04.png
    raw: raw/papers/lin-2026-harness-updating-is-not-harness-benefit-figures/fig04.png
    caption: "flink-query task에서 evolver만 바꿔 비교한 결과. skill이 없으면 0.67점이고, Qwen3.5-9B가 쓴 skill과 Opus 4.6이 쓴 skill은 절차 순서가 같아 둘 다 1.0점을 만든다"
    page: 6
    bbox_norm: [0.109, 0.077, 0.8909, 0.3375]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/lin-2026-harness-updating-is-not-harness-benefit/fig05.png
    raw: raw/papers/lin-2026-harness-updating-is-not-harness-benefit-figures/fig05.png
    caption: "MCP-Atlas의 evolution 이후 pass rate 분포. anchor agent 3개마다 evolver 7종의 점수를 점으로, no-evolution 기준선을 검은 막대로 표시했다"
    page: 6
    bbox_norm: [0.1186, 0.4098, 0.4847, 0.6277]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/lin-2026-harness-updating-is-not-harness-benefit/fig06.png
    raw: raw/papers/lin-2026-harness-updating-is-not-harness-benefit-figures/fig06.png
    caption: "SWE-bench Verified의 base pass rate 대비 harness-benefit 곡선. 크롭 위쪽에 벤치마크 3종의 base와 gain 표가 함께 담겼고, base 20.7%인 Qwen3-235B에서 19.3%p로 정점을 찍는다"
    page: 7
    bbox_norm: [0.1148, 0.1462, 0.4862, 0.4993]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/lin-2026-harness-updating-is-not-harness-benefit/fig07.png
    raw: raw/papers/lin-2026-harness-updating-is-not-harness-benefit-figures/fig07.png
    caption: "Qwen3-32B의 두 실패 모드. 왼쪽 threejs는 multi-key load action이 형식 검사에 막혀 skill 본문이 컨텍스트에 진입하지 못한 사례이고, 오른쪽 pg-essay-to-audiobook은 skill을 읽고도 대체 경로를 건너뛴 사례다"
    page: 8
    bbox_norm: [0.109, 0.077, 0.8909, 0.3317]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/lin-2026-harness-updating-is-not-harness-benefit/fig08.png
    raw: raw/papers/lin-2026-harness-updating-is-not-harness-benefit-figures/fig08.png
    caption: "SWE-bench Verified와 SkillsBench의 evolution 이후 pass rate 분포. agent 안쪽 변동폭이 agent 사이 격차보다 작다는 패턴이 두 벤치마크에서도 유지된다"
    page: 15
    bbox_norm: [0.1388, 0.0709, 0.8611, 0.3036]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/lin-2026-harness-updating-is-not-harness-benefit/fig09.png
    raw: raw/papers/lin-2026-harness-updating-is-not-harness-benefit-figures/fig09.png
    caption: "MCP-Atlas와 SkillsBench에서 base pass rate 대비 harness-benefit. MCP는 완만한 비단조 곡선이고, SkillsBench는 base가 낮은 구간에서 변동이 크다"
    page: 17
    bbox_norm: [0.0993, 0.0706, 0.899, 0.3449]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/lin-2026-harness-updating-is-not-harness-benefit/tab01.png
    raw: raw/papers/lin-2026-harness-updating-is-not-harness-benefit-figures/tab01.png
    caption: "base pass rate와 harness-benefit 표의 캡션 영역만 잡힌 크롭. 표 본문은 fig06 크롭에 함께 들어가 있다"
    page: 7
    bbox_norm: [0.109, 0.1063, 0.4958, 0.1485]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/lin-2026-harness-updating-is-not-harness-benefit/tab02.png
    raw: raw/papers/lin-2026-harness-updating-is-not-harness-benefit-figures/tab02.png
    caption: "SkillsBench의 모델별 activation, adherence, outcome 지표. SLR, HFR, LPR 세 열을 base capability 순으로 정렬했다"
    page: 7
    bbox_norm: [0.5523, 0.1888, 0.8391, 0.2998]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/lin-2026-harness-updating-is-not-harness-benefit/tab03.png
    raw: raw/papers/lin-2026-harness-updating-is-not-harness-benefit-figures/tab03.png
    caption: "weak, mid, strong 대표 모델 3개의 trajectory 구간별 adherence 점수와 load에서 final까지의 drift"
    page: 8
    bbox_norm: [0.5065, 0.4789, 0.885, 0.5849]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/lin-2026-harness-updating-is-not-harness-benefit/tab04.png
    raw: raw/papers/lin-2026-harness-updating-is-not-harness-benefit-figures/tab04.png
    caption: "벤치마크 3종의 통계. task 개수, 도메인 수, task마다 agent에 주어지는 정적 자원을 정리했다"
    page: 13
    bbox_norm: [0.1897, 0.1178, 0.8103, 0.217]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/lin-2026-harness-updating-is-not-harness-benefit/tab05.png
    raw: raw/papers/lin-2026-harness-updating-is-not-harness-benefit-figures/tab05.png
    caption: "evolver 쪽 전체 행렬. anchor agent 3개와 evolver 7종의 모든 조합 pass rate와 그에 대응하는 harness-updating 값을 담았다"
    page: 14
    bbox_norm: [0.5042, 0.1888, 0.8911, 0.528]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/lin-2026-harness-updating-is-not-harness-benefit/tab06.png
    raw: raw/papers/lin-2026-harness-updating-is-not-harness-benefit-figures/tab06.png
    caption: "벤치마크별 극단 조합 비교. 가장 약한 anchor agent에 최선 evolver를, 가장 강한 anchor agent에 최악 evolver를 붙였을 때의 점수 차이다"
    page: 15
    bbox_norm: [0.2549, 0.4215, 0.7413, 0.5579]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/lin-2026-harness-updating-is-not-harness-benefit/tab07.png
    raw: raw/papers/lin-2026-harness-updating-is-not-harness-benefit-figures/tab07.png
    caption: "agent 쪽 전체 행렬. 모델 6종이 anchor evolver 3개 아래에서 낸 pass rate와 그로부터 계산한 harness-benefit 값이다"
    page: 16
    bbox_norm: [0.1125, 0.1468, 0.8911, 0.3637]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/lin-2026-harness-updating-is-not-harness-benefit/tab08.png
    raw: raw/papers/lin-2026-harness-updating-is-not-harness-benefit-figures/tab08.png
    caption: "SWE-bench Verified용 task-solving agent 시스템 프롬프트 전문. 828바이트 절차 안내다"
    page: 18
    bbox_norm: [0.0916, 0.0, 0.5126, 0.0922]
    strategy: column-band
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/lin-2026-harness-updating-is-not-harness-benefit/tab09.png
    raw: raw/papers/lin-2026-harness-updating-is-not-harness-benefit-figures/tab09.png
    caption: "MCP-Atlas용 task-solving agent 시스템 프롬프트 전문. 1,309바이트 API agent 안내다"
    page: 19
    bbox_norm: [0.0916, 0.0, 0.5126, 0.0968]
    strategy: column-band
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/lin-2026-harness-updating-is-not-harness-benefit/tab10.png
    raw: raw/papers/lin-2026-harness-updating-is-not-harness-benefit-figures/tab10.png
    caption: "모든 evolver가 공유하는 고정 시스템 프롬프트. 편집 가능한 artifact 디렉토리와 갱신 원칙을 담았다"
    page: 20
    bbox_norm: [0.0916, 0.0, 0.9078, 0.2559]
    strategy: column-band
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/lin-2026-harness-updating-is-not-harness-benefit/tab11.png
    raw: raw/papers/lin-2026-harness-updating-is-not-harness-benefit-figures/tab11.png
    caption: "evolver에 매 cycle 전달되는 사용자 메시지 템플릿. 작업 범위 권한 블록과 실행 증거 payload로 구성된다"
    page: 21
    bbox_norm: [0.0916, 0.0, 0.9078, 0.3161]
    strategy: column-band
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/lin-2026-harness-updating-is-not-harness-benefit/tab12.png
    raw: raw/papers/lin-2026-harness-updating-is-not-harness-benefit-figures/tab12.png
    caption: "HFR 파이프라인 1단계 rubric 추출 프롬프트. SKILL.md 본문에서 명령형 지시 3개에서 8개를 JSON으로 뽑아 고정한다"
    page: 22
    bbox_norm: [0.2112, 0.0, 0.7883, 0.1784]
    strategy: column-band
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/lin-2026-harness-updating-is-not-harness-benefit/tab13.png
    raw: raw/papers/lin-2026-harness-updating-is-not-harness-benefit-figures/tab13.png
    caption: "HFR 파이프라인 2단계 trajectory 판정 프롬프트. 여섯 가지 verdict와 위반 시점 기록 필드를 정의한다"
    page: 23
    bbox_norm: [0.1946, 0.0, 0.8049, 0.0971]
    strategy: column-band
    curated: false
  - id: tab14
    label: Table 14
    kind: table
    file: assets/lin-2026-harness-updating-is-not-harness-benefit/tab14.png
    raw: raw/papers/lin-2026-harness-updating-is-not-harness-benefit-figures/tab14.png
    caption: "구간별 adherence 판정 프롬프트. trajectory를 다섯 구간으로 나눠 각각 0에서 1 사이 점수를 매긴다"
    page: 24
    bbox_norm: [0.0916, 0.0, 0.5126, 0.1768]
    strategy: column-band
    curated: false
---

## 한 줄 요약 (One-line Summary)

Self-evolving LLM agent의 효과를 evolver의 **harness-updating 능력**과 agent의 **harness-benefit 능력** 두 capability로 분해하고, 7개 LLM과 3개 agentic benchmark(SWE-bench Verified, MCP-Atlas, SkillsBench)로 측정한 controlled analysis다. 핵심 결론은 두 가지다. 첫째, **harness-updating은 base capability와 flat**하다. Qwen3.5-9B 같은 9B 오픈모델 evolver도 Claude Opus 4.6과 procedurally isomorphic한 skill을 작성하고 동등한 gain을 만든다. 둘째, **harness-benefit은 base capability에 non-monotonic**하다. mid-tier(GPT-OSS-120B 등)가 가장 많이 얻고, weak-tier는 harness activation failure와 harness adherence failure 두 실패 모드 때문에 거의 얻지 못한다. 따라서 capability budget을 evolver가 아니라 task-solving agent에 투자하고, harness 호출과 long-horizon instruction following을 agent training의 first-class target으로 삼아야 한다.

## 1. 자료 정보 (Document Information)

- **저자**: Minhua Lin¹*, Juncheng Wu²*(공동 1저자), Zijun Wang², Zhan Shi³, Yisi Sang³, Bing He³, Zewen Liu⁴, Tianxin Wei⁵, Zongyu Wu¹, Zhiwei Zhang¹, Dakuo Wang⁶, Xiang Zhang¹, Benoit Dumoulin³, Cihang Xie², Yuyin Zhou², Suhang Wang¹, Hanqing Lu³
  - ¹Penn State University, ²UC Santa Cruz, ³Amazon, ⁴Emory University, ⁵UIUC, ⁶Northeastern University
  - 교신 이메일: `{mfl5681, szw494}@psu.edu`, `{jwu418}@ucsc.edu`, `{luhanqin}@amazon.com`
- **arXiv**: 2605.30621v1, 2026-05-28, cs.AI. 총 24페이지 구성은 본문 8페이지(1절 서론에서 5절 결론까지), 9페이지 Limitations와 Ethics Statement, 9페이지에서 11페이지 참고문헌, 12페이지에서 24페이지 부록 A에서 E다.
- **벤치마크 3개**: SWE-bench Verified, MCP-Atlas, SkillsBench
- **모델 7개**: Claude Opus 4.6, Claude Sonnet 4.6, Claude Haiku 4.5, Qwen3-235B-A22B, Qwen3-32B, Qwen3.5-9B, GPT-OSS-120B
- **모델 역할 비대칭**: agent 쪽 분석은 6개 모델(Qwen3.5-9B 제외), evolver 쪽 분석은 7개 모델 전부를 쓴다. Qwen3.5-9B는 "훨씬 작은 오픈모델도 유용한 harness update를 만드는가"를 확인하려고 evolver 쪽에만 추가했다.
- **공개**: abstract에 "Our source code is publicly available at here."라고 적혀 있으나 추출 텍스트에는 구체 URL이 남지 않는다.
- **집필 보조 명시**(부록 E): 문법과 표현 교정, 캡션과 레이아웃 조정에 OpenAI GPT-5.5를 사용했고, 연구 아이디어와 실험 설계, 구현, 데이터 분석에는 관여하지 않았다고 밝혔다.

## 2. 주요 기여 (Key Contributions)

1. **Harness self-evolution을 두 evaluation capability로 분해**. 기존 end-to-end 점수(post-evolution pass rate)는 (a) agent의 base capability, (b) evolver의 **harness-updating capability**(execution evidence로부터 유용한 harness update를 만드는 능력), (c) agent의 **harness-benefit capability**(updated harness로부터 이득을 얻는 능력)를 하나로 섞는다. 이 세 요소를 분리하는 metric을 형식적으로 정의했다.
2. **Controlled grid 실험**. 7개 LLM과 3개 benchmark에서 agent와 evolver를 독립적으로 변화시켜 pairwise evolution gain $\Delta(f,e) = J_X(f, H^{(f,e)}_T) - M_{\text{base}}(f)$를 측정한다. anchor agent set $F^\star$ = {Opus 4.6, Sonnet 4.6, Qwen3-235B}로 evolver 쪽을, anchor evolver set $E^\star$ = 같은 세 모델로 agent 쪽을 분석한다.
3. **Finding 1: Harness-updating is flat in base capability**. evolver 사이 $\Delta_{\text{update}}$ spread는 어느 벤치마크에서도 최대 3.1%p다. SWE에서 Qwen3-235B가 8.2%p로 1위지만 MCP에서는 0.6%p로 최하위이고, SkillsBench에서는 Qwen3.5-9B(3.8%p)가 Opus 4.6(2.3%p)과 Qwen3-235B(1.5%p)를 모두 넘어선다. evolver 사이에 dominant model이 없다.
4. **Case study: 9B evolver가 Opus와 procedurally isomorphic한 skill을 작성**. SkillsBench의 `flink-query` task에서 evolver 없이는 agent가 FINISH-event filter를 누락해 0.67점을 받았고, Qwen3.5-9B가 만든 skill과 Opus 4.6이 만든 skill을 각각 주입하면 둘 다 1.0점이 된다. 두 skill은 길이(약 3,300자 대 약 3,800자)와 구현 표현만 다르고 다섯 단계 절차가 동일하다.
5. **Finding 2: Harness-benefit is non-monotonic in base capability**. SWE에서 Qwen3-235B가 +19.3%p로 정점이고 더 강한 Opus 4.6은 +2.6%p에 머문다. MCP에서는 GPT-OSS-120B가 +7.0%p로 정점이고 양 끝이 작다. 약한 쪽(Qwen3-32B)은 headroom이 가장 큼에도 거의 얻지 못하므로 ceiling effect로는 설명되지 않는다.
6. **Weak-tier의 두 failure mode 진단**(SkillsBench, Table 2).
   - **Harness activation failure**: 약한 모델은 skill을 working context로 가져오지 못한다. Skill-Load Rate(SLR)은 Qwen3-32B 0.251, GPT-OSS-120B 0.446이고 강한 세 모델은 0.957에서 0.961 구간이다. `threejs` 사례에서 Qwen3-32B는 `analysis`, `plan`, `load_skill`을 한 JSON에 묶은 multi-key action을 냈고, SkillsBench의 format gate는 단일 키 action만 받으므로 parser error가 나서 skill 본문이 컨텍스트에 끝까지 진입하지 못했다.
   - **Harness adherence failure**: skill이 로드되어도 따르지 못한다. Harness-Following Rate(HFR)은 Qwen3-32B 0.142, Opus 4.6 0.757이다. Qwen3-235B는 SLR이 0.961로 Opus와 사실상 같지만 HFR은 0.350에 그쳐 activation과 adherence가 별개 capability임을 명확히 분리한다. `pg-essay-to-audiobook` 사례에서 Qwen3-32B는 skill 본문을 읽고도 절차 안내가 아니라 완성된 스크립트로 오해했고, 첫 시도(`python3 audiobook_script.py`)가 실패한 뒤 대체 경로를 시도하지 않고 종료했다.
7. **Long-horizon adherence drift 정량화**(Table 3, phase-adherence judge). trajectory를 다섯 구간으로 나눠 구간별 adherence를 0에서 1 사이 점수로 매기고, 대표 세 구간을 보고한다. load에서 final까지의 drift는 Qwen3-32B가 0.52에서 0.13으로 -0.39, GPT-OSS-120B가 0.67에서 0.43으로 -0.24, Opus 4.6이 0.89에서 0.80으로 -0.09다. 약한 모델은 load 시점에 잘못 읽는 것이 아니라 trajectory가 진행될수록 adherence가 점진적으로 하락한다.
8. **세 design takeaway**.
   - capability budget을 evolver가 아니라 task-solving agent에 투자하라. evolver 사이 gap은 최대 3.1%p인 반면 agent base capability 차이는 MCP에서 36.0%p(Opus 4.6 대 Qwen3-235B)에 달한다.
   - harness 호출(invocation)을 first-class learned skill로 agent training에 포함하라. Qwen3-32B의 25.1% load rate와 strong-tier의 약 96% 사이 격차가 병목이다.
   - long-horizon instruction following을 두 번째 training target으로 삼아라. drift -0.39 대 -0.09로 약 4배 차이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 Harness self-evolution 형식화

Agent를 $A_t = (f, H_t)$로 정의한다. $f$는 frozen LLM backbone이고 $H_t$는 evolution step $t$의 외부 harness state(prompts, skills, memories, tools)다. $f$는 학습되지 않고 $H_t$의 editable 부분만 업데이트되며, tool interface와 execution policy 같은 구성 요소는 고정된다.

**Evolver** $e$는 이전 harness $H_{t-1}$과 execution evidence $D_t$로부터 update를 제안한다.

$$\Delta H_t = e(H_{t-1}, D_t), \quad H_t = \text{Apply}(H_{t-1}, \Delta H_t)$$

여기서 $\text{Apply}$는 $\Delta H_t$를 $H_{t-1}$에 반영하는 commit 연산이다.

**Evolution protocol**은 iterative solve-evolve loop다.

1. step $t$에 task batch $X_t$를 받는다.
2. agent $A_{t-1}$이 각 task $x$를 해결해 $(\tau_{t,x}, y_{t,x}) = \text{Solve}(A_{t-1}, x)$를 낸다. $\tau$는 execution trajectory, $y$는 최종 출력이다.
3. execution evidence $D_t = \{(x, \tau_{t,x}, y_{t,x}) : x \in X_t\}$를 수집한다.
4. evolver가 $H_t$를 생성한다.
5. $T$ step 반복해 final harness $H_T$를 산출한다.

### 3.2 세 가지 capability metric

- **Base capability** $M_{\text{base}}(f) = J_X(f, H_0)$. initial harness에서의 task-solving 성능이며, $J_X(f, H)$는 agent $(f, H)$의 task set $X$ 위 성능을 재는 채점 함수다.
- **Pairwise evolution gain** $\Delta(f,e) = J_X(f, H^{(f,e)}_T) - M_{\text{base}}(f)$
- **Harness-updating capability** $\Delta_{\text{update}}(e) = \frac{1}{|F^\star|}\sum_{f \in F^\star} \Delta(f,e)$. anchor agent set 위 mean gain이다.
- **Harness-benefit capability** $\Delta_{\text{benefit}}(f) = \max_{e \in E^\star} \Delta(f,e)$. anchor evolver set 위 max gain이므로 best-case 추정이다.

두 metric의 집계 방식이 다르다는 점이 중요하다. updating은 평균이라 evolver 하나가 특정 agent에서만 잘 작동하면 값이 희석되고, benefit은 최댓값이라 agent가 최선의 evolver와 짝지었을 때의 상한을 잰다.

### 3.3 채점 함수와 in-situ evaluation

세 metric 모두 pass rate를 채점 함수 $J_X$로 쓰며, 벤치마크별로 표준 채점 절차를 그대로 따른다.

| 벤치마크 | task별 점수 | 집계 방식 |
|---|---|---|
| SWE-bench Verified | fail-to-pass와 pass-to-pass 테스트 스위트를 모두 통과하면 1, 아니면 0 | task 평균이 표준 pass rate |
| MCP-Atlas | 최종 답이 만족한 reference claim 비율로 0에서 1 사이 점수 | 이진화한 strict pass rate와 연속 claim-fulfillment 평균을 함께 보고 |
| SkillsBench | task별 이진 점수를 5회 시행 평균 | task와 시행 전체 평균을 주 지표로 보고 (TerminalBench 관례) |

in-situ evaluation은 evolution을 구동하는 task stream $X = \bigcup_{t=1}^{T} X_t$를 평가 집합으로도 쓰는 설정이다. step $t$의 각 task $x$는 시도 시점의 harness $H_{t-1}$ 아래에서 채점되고, 그 점수는 $(\tau_{t,x}, y_{t,x})$가 $D_t$에 들어가 $H_t$를 만들기 전에 확정된다. 따라서 개별 task의 점수는 자기 자신이 만들어낸 harness update에 영향받지 않는다.

### 3.4 Implementation 고정

공정 비교를 위해 backbone 외 모든 요소를 고정한다.

| 항목 | 설정 |
|---|---|
| Prompt template | 모든 agent와 evolver 페어 공통 (Tab. 8에서 11) |
| Trajectory window | 모든 페어 동일 |
| 초기 harness $H_0$ | 벤치마크별 동일 |
| Task stream $X$ | 페어 사이 동일 |
| Evolution budget $\beta$, per-task turn limit | 동일 |
| Variable | LLM backbone만 |

**Editable harness scope**는 벤치마크별로 다르다.

| 벤치마크 | 편집 허용 | 읽기 전용 |
|---|---|---|
| SWE-bench Verified | `skills/` | `tools/`, 평가 파일 |
| SkillsBench | `skills/` | `tools/`, 평가 파일 |
| MCP-Atlas | `skills/`, `prompts/system.md`, `memory/`(append-only JSONL) | `tools/`, 평가 파일 |

이 권한은 매 cycle evolver에게 전달되고, evolver의 시스템 프롬프트 자체는 벤치마크와 backbone에 걸쳐 고정된다.

**Task-solving agent 프롬프트**는 벤치마크마다 하나씩만 쓴다. SWE-bench Verified는 828바이트 절차 안내로 GitHub issue 패치에 범위를 한정하고 최소한의 집중된 수정을 권한다. MCP-Atlas는 1,309바이트 API agent 안내로 tool call로만 task를 해결하고 사용자에게 되묻지 않도록 지시한다. SkillsBench는 원 논문 설정을 따라 task-solving agent에 **시스템 프롬프트를 주지 않는다**.

SkillsBench 설정에는 원 벤치마크와의 차이가 하나 더 있다. 원 벤치마크는 큐레이션된 skill을 함께 배포하지만, 이 논문의 no-evolution baseline은 **빈 skill set에서 시작**하고 evolved 조건은 앞선 in-situ task에서 evolver가 만든 skill만 사용한다. 따라서 SkillsBench의 base pass rate가 다른 두 벤치마크보다 낮게 나온다.

### 3.5 HFR 판정 파이프라인

SkillsBench의 adherence를 재기 위한 2단계 LLM judge다. 판정 모델은 **Claude Sonnet 4.6**이고, 모든 trajectory는 모델 계열 토큰(Claude, Opus, Sonnet, Haiku, Qwen, GPT-OSS)을 `<MODEL>`로 치환한 blinded 상태로 입력된다.

**Stage 1: Locked Rubric Extraction**(Tab. 12). SKILL.md 본문에서 명령형이나 규범형 문장이 직접 함의하는 절차 지시만 추출해 JSON rubric으로 고정한다. 조언, 근거 설명, 예시, 동기 부여 문장은 지시로 뽑지 않고, 목표 개수는 3개에서 8개다.

```json
{
  "skill_id": "<skill folder name>",
  "instructions": [
    {"id": "step_1", "source_span": "<exact quote, max 250 chars>", "text": "<imperative paraphrase>",
     "type": "required|conditional|optional", "trigger": null,
     "success_criteria": "...", "violation_criteria": "..."}
  ]
}
```

**Stage 2: Per-cell Adherence + Phase Classification**(Tab. 13). rubric을 blinded trajectory에 적용해 지시별 verdict를 낸다.

| verdict | 뜻 |
|---|---|
| `FOLLOWED` | success_criteria를 명시적으로 만족했다. turn 인덱스와 action 인용을 함께 낸다 |
| `VIOLATED_COMMISSION` | 지시를 직접 거스르는 action을 했다 |
| `VIOLATED_OMISSION` | required이거나 조건이 발생했고 실행할 시간이 있었는데 하지 않았다 |
| `REQUIRED_BUT_UNOBSERVED` | required지만 trajectory가 너무 일찍 끝나 관찰할 수 없었다 |
| `NOT_APPLICABLE` | conditional인데 조건이 발생하지 않았거나 optional을 선택하지 않았다 |
| `INSUFFICIENT_EVIDENCE` | trajectory가 모호해 판정할 수 없다 |

위반 verdict에는 `violation_earliest_possible_turn`, `violation_confirmed_turn`, `violation_type`(commission, omission, premature_stop, wrong_strategy)을 함께 기록한다.

HFR 자체의 정의는 skill-loaded trajectory 수 $N^{\text{load}}_f$ 대비 판정에서 skill을 따랐다고 본 trajectory 수 $N^{\text{follow}}_f$의 비율이다.

$$\text{HFR}(f) = \frac{N^{\text{follow}}_f}{N^{\text{load}}_f}$$

**Phase-Adherence Judge**(Tab. 14)는 HFR judge와 별도 호출이며 같은 rubric과 blinded trajectory를 입력받는다. trajectory를 turn 위치 기준 다섯 구간으로 나눈다.

| 구간 | 정의 |
|---|---|
| `skill_loaded` | turn 1 |
| `first_action` | 그 다음 첫 action turn |
| `midpoint` | 전체 turn의 가운데 50% |
| `pre_final` | 마지막 turn을 뺀 뒤쪽 25% |
| `final_validation` | 마지막 turn |

각 구간에서 그 구간에 유효한 rubric 지시를 얼마나 따랐는지 0에서 1 사이 점수를 매긴다. 1.0은 관찰 가능한 모든 유효 지시를 따랐다는 뜻이다. Table 3은 이 다섯 구간 중 harness loaded, mid turn, final turn 세 개를 대표로 보고한다.

### 3.6 SLR과 LPR

Skill-Load Rate(SLR)은 agent의 trajectory 중 skill을 하나 이상 능동적으로 컨텍스트에 로드한 trajectory 비율이다. format gate를 통과하는 유효한 단일 키 load action이 있어야 카운트되므로, `threejs` 사례처럼 다른 키와 함께 묶인 load 요청은 로드로 세지 않는다.

Loaded-Pass Rate(LPR)은 그 모델의 skill-loaded trajectory 중 통과한 비율이다. activation을 통과한 뒤 실제 결과까지 이어졌는지를 본다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 데이터셋 통계 (Table 4)

| Substrate | $N_b$ | #Domains | 제공 리소스 |
|---|---|---|---|
| SWE-bench Verified | 500 | 12 repositories | Codebase snapshot, issue description, hidden test suite |
| MCP-Atlas | 500 | 36 MCP servers | 220 tools(서버 사이 공유), task마다 3개에서 6개 tool call 필요 |
| SkillsBench | 86 | 11 task domains | Workspace files, deterministic verifier |

SWE-bench Verified는 실제 GitHub issue에서 뽑은 사람 검증 부분집합 500 task 전량을 쓰고, 채점은 issue에 딸린 hidden test suite 통과 여부다. MCP-Atlas는 저자가 공개한 500 task 부분집합을 쓰며 실제 Model Context Protocol 서버 위 multi-server tool use를 다룬다. SkillsBench는 소프트웨어, 데이터 분석, 문서 처리, 오디오 합성 등 11개 도메인 86 task로 구성되고 task마다 결정적 verifier가 붙는다.

### 4.2 Harness-updating $\Delta_{\text{update}}$ (Figure 3)

| Evolver | SWE | MCP | SB |
|---|---|---|---|
| Opus 4.6 | 7.4 | **3.6** | 2.3 |
| Sonnet 4.6 | 7.4 | 2.6 | 1.2 |
| Haiku 4.5 | 8.0 | 2.3 | 2.7 |
| Qwen3-235B | **8.2** | 0.6 | 1.5 |
| Qwen3-32B | 7.8 | 2.3 | 0.7 |
| Qwen3.5-9B | 6.8 | 1.0 | **3.8** |
| GPT-OSS-120B | 5.9 | 1.9 | 1.5 |
| **spread (max − min)** | **2.3** | **3.0** | **3.1** |

단위는 %p이며 anchor agent 3개 위 평균이다. 어느 벤치마크에서도 dominant evolver가 없고 최대 spread는 SkillsBench의 3.1%p다. Qwen3-235B는 SWE 1위(8.2%p)이면서 MCP 최하위(0.6%p)로 순위가 뒤바뀐다. 가장 작은 모델인 Qwen3.5-9B가 SkillsBench 1위(3.8%p)라서 model scale이 harness-updating을 예측하지 못한다.

### 4.3 Evolver 쪽 전체 행렬 (Table 5)

각 셀은 anchor agent와 evolver 조합의 pass rate(%)이고 `NONE`은 no-evolution baseline이다.

| Evolver | Opus 4.6 | Sonnet 4.6 | Qwen3-235B | $\Delta_{\text{update}}$ |
|---|---|---|---|---|
| **SWE** `NONE` | 74.2 | 73.2 | 20.7 | 기준 |
| Opus 4.6 | 76.4 | 76.0 | 38.0 | 7.4 |
| Sonnet 4.6 | 76.8 | 75.6 | 37.8 | 7.4 |
| Haiku 4.5 | 77.8 | 74.8 | 39.4 | 8.0 |
| Qwen3-235B | 76.6 | 76.0 | 40.0 | **8.2** |
| Qwen3-32B | 76.2 | 75.4 | 39.8 | 7.8 |
| Qwen3.5-9B | 76.4 | 73.2 | 38.8 | 6.8 |
| GPT-OSS-120B | 75.2 | 75.6 | 35.0 | 5.9 |
| **MCP** `NONE` | 61.0 | 54.0 | 25.0 | 기준 |
| Opus 4.6 | 64.4 | 57.2 | 29.3 | **3.6** |
| Sonnet 4.6 | 64.6 | 57.0 | 26.1 | 2.6 |
| Haiku 4.5 | 64.4 | 58.2 | 24.2 | 2.3 |
| Qwen3-235B | 61.6 | 55.8 | 24.3 | 0.6 |
| Qwen3-32B | 63.8 | 57.4 | 25.7 | 2.3 |
| Qwen3.5-9B | 62.6 | 55.6 | 24.9 | 1.0 |
| GPT-OSS-120B | 62.6 | 55.6 | 27.6 | 1.9 |
| **SB** `NONE` | 25.6 | 24.4 | 4.7 | 기준 |
| Opus 4.6 | 30.2 | 27.9 | 3.5 | 2.3 |
| Sonnet 4.6 | 29.1 | 25.6 | 3.5 | 1.2 |
| Haiku 4.5 | 31.4 | 25.6 | 5.8 | 2.7 |
| Qwen3-235B | 31.4 | 22.1 | 5.8 | 1.5 |
| Qwen3-32B | 30.2 | 22.1 | 4.6 | 0.7 |
| Qwen3.5-9B | 26.7 | 31.4 | 8.1 | **3.8** |
| GPT-OSS-120B | 31.4 | 22.1 | 5.8 | 1.5 |

이 행렬에서 논문이 본문에 서술하지 않은 패턴이 하나 보인다. 63개 셀(벤치마크 3개 × agent 3개 × evolver 7개) 중 9개가 no-evolution baseline보다 낮다. SWE에서는 하락 셀이 없고 Sonnet 4.6 agent에 Qwen3.5-9B evolver를 붙인 조합만 73.2로 동률이다. MCP의 하락 3건은 모두 Qwen3-235B agent에서 나오고(Haiku 24.2, Qwen3-235B 24.3, Qwen3.5-9B 24.9 대 baseline 25.0), SkillsBench의 하락 6건은 Sonnet 4.6 agent 3건(모두 22.1 대 24.4)과 Qwen3-235B agent 3건(3.5, 3.5, 4.6 대 4.7)이다. harness evolution이 항상 개선을 보장하지는 않으며, base가 낮은 SkillsBench에서 회귀가 가장 잦다.

### 4.4 Within-agent spread 대 between-agent gap (Figures 5, 8, Table 6)

| 벤치마크 | within-agent spread (최대) | 해당 agent | Opus 4.6 대 Qwen3-235B base gap | 논문이 명시한 배수 |
|---|---|---|---|---|
| SWE | 5.0%p | Qwen3-235B | 53.5%p | 11배 |
| MCP | 5.1%p | Qwen3-235B | 36.0%p | 명시 없음 |
| SB | 9.3%p | Sonnet 4.6 (22.1%에서 31.4%) | 20.9%p | 2.2배 |

evolver를 7개 바꿔도 한 agent 안에서의 변동폭은 agent 사이 base capability 차이보다 훨씬 작다. SkillsBench가 세 벤치마크 중 가장 좁지만 부등호 방향은 유지된다.

극단 조합 비교(Table 6)는 이 결론을 더 강하게 만든다. 각 벤치마크에서 가장 약한 anchor agent에 그 agent의 최선 evolver를 붙이고, 가장 강한 anchor agent에 그 agent의 최악 evolver를 붙여 비교한다.

| 항목 | SWE | MCP | SB |
|---|---|---|---|
| 약한 anchor agent $W$ | Qwen3-235B | Qwen3-235B | Qwen3-235B |
| $W$의 최선 evolver | Qwen3-235B | Opus 4.6 | Qwen3.5-9B |
| $W$의 점수 | 40.0 | 29.3 | 8.1 |
| 강한 anchor agent $S$ | Opus 4.6 | Opus 4.6 | Opus 4.6 |
| $S$의 최악 evolver | GPT-OSS-120B | Qwen3-235B | Qwen3.5-9B |
| $S$의 점수 | 75.2 | 61.6 | 26.7 |
| **gap** | **35.2%p** | **32.3%p** | **18.6%p** |

강한 agent에 불리한 조건에서도 18.6%p에서 35.2%p 우위가 유지된다. SkillsBench에서는 Qwen3.5-9B가 양쪽에 동시에 등장하는데, Qwen3-235B에게는 최선 evolver이고 Opus 4.6에게는 최악 evolver이기 때문이다. post-evolution 성능은 evolver 정체성보다 task-solving agent에 지배된다.

### 4.5 Harness-benefit $\Delta_{\text{benefit}}$ (Table 1)

| Model | SWE Base | SWE Δ | MCP Base | MCP Δ | SB Base | SB Δ |
|---|---|---|---|---|---|---|
| Qwen3-32B | 3.6 | 4.4 | 3.6 | 1.0 | 0.0 | 5.8 |
| Qwen3-235B | 20.7 | **19.3** | 25.0 | 4.3 | 4.7 | 1.1 |
| GPT-OSS-120B | 26.2 | 15.8 | 28.0 | **7.0** | 0.0 | 7.0 |
| Haiku 4.5 | 66.0 | 2.4 | 42.4 | 3.6 | 5.8 | **15.1** |
| Sonnet 4.6 | 73.2 | 2.8 | 54.0 | 3.2 | 24.4 | 3.5 |
| Opus 4.6 | 74.2 | 2.6 | 61.0 | 3.6 | 25.6 | 5.8 |

SWE에서는 Qwen3-235B가 +19.3%p로 정점이고, MCP에서는 GPT-OSS-120B가 +7.0%p로 정점이며, SkillsBench에서는 Haiku 4.5가 +15.1%p(base 5.8%에서 20.9%로)로 정점이다. strong-tier의 작은 gain은 초기 harness에서 이미 많은 task를 푸는 ceiling effect와 부합하지만, weak-tier의 작은 gain은 별개의 병목이다.

세 벤치마크 사이 패턴 강도는 다르다. SWE와 MCP가 비단조 패턴의 가장 뚜렷한 증거를 제공하고, SkillsBench는 base가 낮은 구간에서 변동이 크다. SkillsBench에서 Qwen3-32B와 GPT-OSS-120B의 base가 0.0%, Qwen3-235B가 4.7%, Haiku 4.5가 5.8%인데, base가 비슷한데도 Haiku 4.5는 15.1%p를 얻고 Qwen3-235B는 1.1%p만 얻는다.

### 4.6 Agent 쪽 전체 행렬 (Table 7)

각 셀은 task-solving 모델이 해당 evolver 아래에서 낸 pass rate(%)다.

| 벤치마크 | Evolver | Qwen3-32B | Qwen3-235B | GPT-OSS-120B | Haiku 4.5 | Sonnet 4.6 | Opus 4.6 |
|---|---|---|---|---|---|---|---|
| SWE | `NONE` | 3.6 | 20.7 | 26.2 | 66.0 | 73.2 | 74.2 |
| SWE | Opus 4.6 | 8.0 | 38.0 | 37.2 | 65.0 | 76.0 | 76.4 |
| SWE | Sonnet 4.6 | 7.6 | 37.8 | 37.6 | 68.4 | 75.6 | 76.8 |
| SWE | Qwen3-235B | 8.0 | 40.0 | 42.0 | 65.4 | 76.0 | 76.6 |
| SWE | $\Delta_{\text{benefit}}$ | 4.4 | **19.3** | 15.8 | 2.4 | 2.8 | 2.6 |
| MCP | `NONE` | 3.6 | 25.0 | 28.0 | 42.4 | 54.0 | 61.0 |
| MCP | Opus 4.6 | 4.6 | 29.3 | 35.0 | 46.0 | 57.2 | 64.4 |
| MCP | Sonnet 4.6 | 4.0 | 26.1 | 32.0 | 42.8 | 57.0 | 64.6 |
| MCP | Qwen3-235B | 2.8 | 24.3 | 29.1 | 41.0 | 55.8 | 61.6 |
| MCP | $\Delta_{\text{benefit}}$ | 1.0 | 4.3 | **7.0** | 3.6 | 3.2 | 3.6 |
| SB | `NONE` | 0.0 | 4.7 | 0.0 | 5.8 | 24.4 | 25.6 |
| SB | Opus 4.6 | 3.5 | 3.5 | 7.0 | 20.9 | 27.9 | 30.2 |
| SB | Sonnet 4.6 | 3.5 | 3.5 | 4.6 | 18.6 | 25.6 | 29.1 |
| SB | Qwen3-235B | 5.8 | 5.8 | 7.0 | 15.1 | 22.1 | 31.4 |
| SB | $\Delta_{\text{benefit}}$ | 5.8 | 1.1 | **7.0** | **15.1** | 3.5 | 5.8 |

여기서도 회귀 셀이 관찰된다. 54개 셀(벤치마크 3개 × 모델 6개 × anchor evolver 3개) 중 8개가 baseline 아래로 내려간다. SWE에서 Haiku 4.5는 Opus 4.6 evolver 아래 65.0, Qwen3-235B evolver 아래 65.4로 baseline 66.0을 밑돈다. MCP에서 Qwen3-235B evolver는 Qwen3-32B(2.8 대 3.6), Qwen3-235B(24.3 대 25.0), Haiku 4.5(41.0 대 42.4) 세 agent를 모두 후퇴시킨다. SkillsBench에서는 Qwen3-235B agent가 Opus와 Sonnet evolver 아래 3.5로 baseline 4.7보다 낮고, Sonnet 4.6 agent가 Qwen3-235B evolver 아래 22.1로 baseline 24.4보다 낮다. $\Delta_{\text{benefit}}$이 max 집계라서 이 하락은 최종 표에 드러나지 않는다.

### 4.7 Activation, adherence, outcome (Table 2, SkillsBench)

| Model | SLR (activate) | HFR (follow) | LPR (loaded-pass) |
|---|---|---|---|
| Qwen3-32B | 0.251 | 0.142 | 0.023 |
| GPT-OSS-120B | 0.446 | 0.442 | 0.040 |
| Haiku 4.5 | 0.794 | 0.600 | 0.099 |
| Qwen3-235B | **0.961** | 0.350 | 0.022 |
| Sonnet 4.6 | 0.959 | 0.730 | 0.145 |
| Opus 4.6 | 0.957 | **0.757** | **0.177** |

행 순서는 SkillsBench base capability 순이다. 강한 세 모델의 SLR은 0.957에서 0.961 구간이고 GPT-OSS-120B는 0.446, Qwen3-32B는 0.251로 내려간다. Qwen3-235B가 두 capability의 분리를 가장 선명하게 보여준다. SLR은 0.961로 Opus 4.6과 사실상 같은데 HFR은 0.350, LPR은 0.022로 Opus의 0.177 대비 8분의 1 수준이다. harness를 로드하는 것만으로는 이득을 얻기에 충분하지 않다.

### 4.8 구간별 adherence drift (Table 3)

| Phase | Qwen3-32B (weak) | GPT-OSS-120B (mid) | Opus 4.6 (strong) |
|---|---|---|---|
| Harness loaded | 0.52 | 0.67 | **0.89** |
| Mid turn | 0.22 | 0.48 | 0.79 |
| Final turn | 0.13 | 0.43 | 0.80 |
| **drift (load → final)** | **−0.39** | **−0.24** | **−0.09** |

weak-tier는 trajectory 후반으로 갈수록 adherence가 크게 하락하고 그 폭이 strong-tier의 약 4배다. Opus 4.6은 mid turn에서 0.79로 잠시 내려간 뒤 final turn에서 0.80으로 회복해 사실상 평평하다. 이 등급화된 drift는 문제가 load 시점의 오독이 아니라 long-horizon instruction following이라는 진단을 뒷받침한다.

### 4.9 사례 분석 (Figures 4, 7)

**flink-query (SkillsBench, evolver 비교)**. task는 SUBMIT 이벤트로 job stage를 식별하는 Flink job을 10분 gap session window로 구현하고 FINISHED job마다 (jobId, max-task-count)를 출력하는 것이며, 재제출은 별도로 센다. agent backbone은 Opus 4.6으로 고정하고 evolver 조건만 세 가지로 바꾼다.

- evolver 없음: agent가 SUBMIT 이벤트 필터(`event_type == 0`)와 타임스탬프 변환(마이크로초에서 밀리초)은 했지만 FINISH 이벤트 필터(`et == 4`)를 누락했고, `jobInput` 파라미터를 읽고도 파이프라인에 연결하지 않아 미완료 job의 카운트가 출력에 섞였다. 0.67점이다.
- Qwen3.5-9B가 만든 skill(약 3,300자): jobID로 키를 잡은 10분 gap session window, SUBMIT(`et == 0`)과 FINISH(`et == 4`)로 완료 job 판별, task index와 무관하게 SUBMIT을 개별 집계, (jobId, count) 출력, 수집하고 정렬한 뒤 세션으로 분할해 최댓값을 취하는 배치 방식.
- Opus 4.6이 만든 skill(약 3,800자): jobId로 키를 잡은 10분(600,000밀리초) gap, SUBMIT과 FINISH 판별, 재시도 여부와 무관하게 SUBMIT을 개별 집계, 괄호와 쉼표를 붙이고 공백을 넣지 않은 (jobId,count) 형식, 마지막 SUBMIT 후 10분 event-time timer를 쓰는 `KeyedProcessFunction`.

두 skill 모두 1.0점을 만든다. 부록 C.2는 두 skill이 SUBMIT 필터, FINISH 필터, SUBMIT 개별 집계, (jobId, count) 출력, 10분 session window 적용이라는 **같은 다섯 단계**를 담고 있으며 차이는 세션화 구현 표현뿐이라고 정리한다.

**threejs (SkillsBench, harness activation failure)**. task는 Three.js 파일의 `createScene()`을 파싱해 3D 객체의 부품 단위 구조를 뽑고 부품별 OBJ 파일을 내보내는 것이며, `threejs` skill이 카탈로그에 등재되어 있다.

- Qwen3-235B: turn 0에 `{"load_skill":"threejs"}`를 단일 키로 냈고 turn 1에 skill 본문(mesh baking, part partitioning, per-link OBJ export, URDF articulation 워크플로)이 로드되어 1.0점을 받았다.
- Qwen3-32B: `{"analysis":"...the threejs skill contains workflows for parsing Three.js scenes...", "plan":"1. Load the threejs skill...", "load_skill":"threejs"}`처럼 세 키를 묶은 composite action을 냈다. SkillsBench format gate는 단일 키 action만 받으므로 이를 malformed로 거부했고, skill 본문이 컨텍스트에 끝까지 들어가지 못한 채 agent는 절차 안내 없이 진행해 0.0점을 받았다.

부록 D.1은 이 실패가 action-protocol 계층에 있다고 정리한다. agent는 어떤 skill을 로드해야 하는지 알았지만 그 의도를 runner가 기대하는 형식으로 번역하지 못했다.

**pg-essay-to-audiobook (SkillsBench, harness adherence failure)**. task는 Paul Graham 에세이 두 편을 TTS 오디오북 MP3로 변환하는 것이다. skill 본문은 paulgraham.com 수집과 MP3 합성 요건, 그리고 kokoro, edge-tts, pyttsx3, espeak, gTTS 순서의 TTS fallback chain을 절차 안내로 제시한다. 채점 기준은 `audiobook.mp3`가 존재하고 크기가 0이 아니며 유효한 재생 길이를 갖는 것이다. 두 agent 모두 이 skill을 로드했다.

- Qwen3-32B(0.0점): T0에 `{'load_skill':'pg-essay-audiobook'}`으로 로드에 성공했고, T1에 본문을 완성된 스크립트로 오독해 `python3 audiobook_script.py`를 실행하다 `FileNotFoundError`를 만났다. T2에서 T7까지 externally-managed 환경에서 pip install 시도를 반복해 실패했고, T8에 `which espeak`이 성공했음에도 본문의 fallback chain을 건너뛰었다. T10에 유효한 산출물 없이 `task_complete=true`와 "No TTS tools available"을 내며 종료했다.
- GPT-OSS-120B(1.0점): T0에서 T11까지는 skill 본문 없이 자체 TTS 스크립트를 작성했다. T12에 `{"load_skill":"pg-essay-to-audiobook"}`을 내 본문을 컨텍스트에 넣고 T13에 절차 안내로 읽었다. T16에 fallback chain의 첫 항목인 pyttsx3를 시도했고, T17에 espeak와 ffmpeg를 설치했으며, T19에 subprocess와 espeak 조합으로 전환해 본문의 chain을 따랐다. T21에 깨진 paulgraham URL을 고치고 T23에 `audiobook.mp3`를 써서 채점을 통과했다.

부록 D.1이 정리하는 공통 패턴은 Qwen3-32B의 결함이 task 이해에 있지 않다는 것이다. `threejs`에서는 올바른 skill을 골랐고 `pg-essay-to-audiobook`에서는 skill의 첫 단계를 따랐다. 문제는 protocol 수준과 절차 실행 수준이며, weak-tier 모델은 harness를 읽지 못하는 것이 아니라 harness 아래에서 동작하지 못한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자가 6절 Limitations에서 명시한 한계는 두 가지다.

- **Parametric fine-tuning, RL, hybrid adaptation은 평가 범위 밖**이다. 이 연구는 모델 가중치를 고정하고 외부 harness artifact 갱신만으로 적응하는 설정을 다루므로, 가중치 업데이트와 harness 업데이트를 결합한 방법의 capability 분해는 후속 과제다.
- **Model set은 representative이지만 exhaustive하지 않다**. 오픈소스와 클로즈드소스를 여러 capability tier에 걸쳐 포함했으나, model family, scale, training recipe, deployment cost를 더 넓게 훑는 grid가 있어야 두 capability의 변화를 더 분명히 알 수 있다.

7절 Ethics Statement는 배포 관점의 위험을 별도로 짚는다. 갱신된 harness는 이후 task에 계속 남기 때문에 잘못된 교훈, 안전하지 않은 tool use 규칙, 편향된 지시, 민감 정보가 harness에 기록되어 재사용될 수 있다. 이 연구의 평가 환경에서는 harness update를 로그로 남기고 evolver가 평가 스크립트와 모델 가중치를 수정하지 못하도록 제약했지만, 저자들은 이런 통제가 실제 배포의 안전을 보장하지는 않는다고 밝힌다. 실제 시스템은 프라이버시, 데이터 보관 동의, update 되돌리기, 감사 가능성, 사람의 감독을 설계 요건으로 다뤄야 한다는 것이 결론이다.

논문이 한계로 분류하지는 않았지만 결과 해석 범위를 좌우하는 설정상 제약이 하나 더 있다. **harness representation이 고정**되어 있다는 점이다. SWE-bench Verified와 SkillsBench는 `skills/`만, MCP-Atlas는 `skills/`와 `prompts/system.md`, `memory/`만 편집 가능하며 `tools/`는 전 벤치마크에서 읽기 전용이다(부록 B.4). 따라서 tool 자체를 진화시키는 setting에서 두 capability가 같은 패턴을 보일지는 이 실험이 답하지 않는다.

수집 과정에서 확인한 추가 후속 방향은 다음과 같다.

- activation과 adherence 격차를 줄이는 **agent post-training recipe**. skill invocation을 reward로 쓰거나 long-horizon instruction following을 RL target으로 삼는 방향이다.
- weak-tier를 evolver로 배치할 가치가 있는지. 9B 모델이 procedurally isomorphic한 skill을 만든다면 추론 비용 절감용 evolver로 쓸 수 있다.
- evolver와 agent의 **role-specific training** 분리 가능성. agent는 harness-benefit에, evolver는 harness-updating에 각각 최적화하는 구성이다.
- 회귀 셀(4.3절, 4.6절)의 원인 분석. harness update가 baseline보다 낮은 점수를 만드는 조건을 특징화하는 작업은 논문이 다루지 않았다.

## 6. 관련 연구 (Related Work)

부록 A가 2절 Related Work의 전체 버전을 담고 있다.

### 6.1 Harness engineering, harness가 담는 것

frozen backbone을 둘러싸고 reasoning, tool use, memory access, skill invocation, 환경 상호작용을 형성하는 외부 층을 agent harness라 부르며, 선행 연구는 그 artifact 종류별로 나뉜다.

| artifact | 역할 | 대표 연구 |
|---|---|---|
| Prompts | 상시 행동 규칙, task policy, 추론 절차를 자연어로 인코딩 | Zhou et al. 2022, Yao et al. 2022(ReAct), Yang et al. 2024b(SWE-agent), Pan et al. 2026 |
| Tools | 외부 서비스를 노출하고 action schema, 호출 형식, 검증 규칙을 규정 | Hou et al. 2025, Qin et al. 2024, Liu et al. 2025, Lin et al. 2025, 2026a |
| Memory | 과거 observation, 사실, task 결과, 재사용 가능한 전략을 저장 | Ouyang et al. 2025, Xu et al. 2026, Fang et al. 2026(LightMem) |
| Skills | 재사용 절차를 호출 가능한 모듈이나 task별 안내 artifact로 패키징 | Li et al. 2026b(SkillsBench), Liu et al. 2026 |
| Code | harness 자체를 tool, validator, orchestration logic, prompt 조립을 구현하는 실행 소스로 취급 | Ning et al. 2026, Lee et al. 2026(Meta-harness) |

이들은 harness를 수동적 컨텍스트가 아니라 편집 가능한 agent state로 확립했다. 본 논문은 새 harness representation을 제안하지 않고 harness를 갱신하고 그 갱신에서 이득을 얻는 모델 capability를 분석하는 쪽으로 초점을 옮긴다.

### 6.2 Self-evolution of LLM agents, harness가 어떻게 갱신되는가

초기 시스템은 task 시도 수준에서 작동한다. Reflexion(Shinn et al. 2023)은 앞선 시도의 언어적 자기 반성을 저장하고, Self-Refine(Madaan et al. 2023)은 자기 피드백으로 출력을 반복 개선하며, ExpeL(Zhao et al. 2024)은 학습 trajectory에서 재사용 가능한 자연어 통찰을 추출한다. 이 방법들은 언어 피드백이 이후 행동을 개선한다는 것을 보였지만, 남는 artifact가 구조화된 다중 구성 harness state가 아니라 단일 텍스트 반성이나 교훈이라는 한계가 있다.

이후 방법들은 지속적 harness 구성 요소 자체를 self-evolution 단위로 삼는다.

| 수준 | 대표 방법 | 내용 |
|---|---|---|
| Prompt | PromptWizard(Agarwal et al. 2024), ACE(Zhang et al. 2025b), GEPA(Agrawal et al. 2026) | 피드백 기반 비판과 합성으로 프롬프트를 정제하고, contextual playbook을 생성과 반성과 큐레이션으로 진화시키며, trajectory 수준 반성으로 프롬프트를 진화시킨다 |
| Memory | EvolveR(Wu et al. 2025), MemEvolve(Zhang et al. 2025a), MemMA(Lin et al. 2026c), Evo-memory(Wei et al. 2025) | 오프라인 전략 distillation과 온라인 retrieval을 연결하고, 메모리 시스템의 meta-evolution을 다루며, 구성과 retrieval과 피드백 기반 수리로 long-horizon 메모리를 개선한다 |
| Skill과 workflow | Voyager(Wang et al. 2023), AWM(Wang et al. 2024), SkillRL(Xia et al. 2026), EvoSkill(Alzubi et al. 2026), AutoSkill(Yang et al. 2026) | 실행 가능한 스킬을 축적하고, 성공 trajectory에서 워크플로를 유도하며, 강화학습으로 스킬 라이브러리를 재귀 확장하고, agent 경험에서 스킬을 자동 발견한다 |
| Tool | Chen et al. 2025, Li et al. 2026a(Yunjue Agent) | agent가 tool과 tool use 지식을 합성하고 수정하고 축적한다 |
| Unified | Zhou et al. 2026 | LLM agent의 externalization을 통합적으로 다룬다 |

저자가 강조하는 본 논문의 보완점은 평가 방식이다. 기존 평가는 하나의 update 절차, 하나의 agent, 하나의 벤치마크에 대한 end-to-end gain을 보고하므로(Li et al. 2026b, Jiang et al. 2026, Wei et al. 2025) base capability와 harness-updating과 harness-benefit 세 원천을 뒤섞는다. 본 논문은 agent와 evolver를 독립적으로 변화시켜 두 capability를 따로 측정하고, 어느 쪽이 base capability를 그대로 따라가는지 검증한다.

### 6.3 벤치마크

- SWE-bench Verified (Jimenez et al. 2024)
- MCP-Atlas (Bandi et al. 2026)
- SkillsBench (Li et al. 2026b)
- TerminalBench (Merrill et al. 2026). SkillsBench의 5회 시행 평균 관례를 여기서 따왔다.
- SEA-Eval (Jiang et al. 2026). self-evolving agent를 episodic 평가 너머로 평가하려는 벤치마크다.
- EngiBench (Zhou et al. 2025)

### 6.4 사용된 모델 카드와 리포트

- Claude Opus 4.6 system card (Anthropic 2026a)
- Claude Sonnet 4.6 system card (Anthropic 2026b)
- Claude Haiku 4.5 system card (Anthropic 2025)
- Qwen3 technical report (Yang et al. 2025)
- Qwen3.5 (Qwen 2026)
- GPT-OSS model card (Agarwal et al. 2025, arXiv 2508.10925)

## 7. 용어집 (Glossary)

- **Harness self-evolution**: 모델 weight를 고정한 채 execution evidence(trajectory, output, feedback)에 따라 harness만 반복 갱신하는 setting.
- **Evolver**: 이전 harness $H_{t-1}$과 evidence $D_t$로부터 update $\Delta H_t$를 만드는 절차. 본 논문에서는 LLM agent로 instantiate한다.
- **Base capability** $M_{\text{base}}$: initial harness $H_0$ 아래에서의 task-solving 성능. 같은 모델이 self-evolution 없이 얻는 baseline pass rate다.
- **Harness-updating capability** $\Delta_{\text{update}}(e)$: evolver $e$가 anchor agent set $F^\star$ 위에서 만들어내는 mean pairwise gain. 이 evolver가 얼마나 유용한 update를 만드는지를 잰다.
- **Harness-benefit capability** $\Delta_{\text{benefit}}(f)$: agent $f$가 anchor evolver set $E^\star$ 위에서 얻는 max pairwise gain. 이 agent가 최선의 evolver와 짝지을 때 harness로 얼마나 이득을 보는지를 잰다.
- **Pairwise evolution gain** $\Delta(f, e)$: 특정 agent와 evolver 페어의 evolution 결과 pass rate에서 그 agent의 base를 뺀 값.
- **Skill-Load Rate (SLR)**: agent의 trajectory 중 skill을 하나 이상 유효하게 컨텍스트로 로드한 비율. activation 측정 metric이다.
- **Harness-Following Rate (HFR)**: skill-loaded trajectory 중 LLM judge가 로드된 skill의 안내를 따랐다고 판정한 비율. adherence 측정 metric이다.
- **Loaded-Pass Rate (LPR)**: skill-loaded trajectory의 pass rate. activation 이후의 결과를 본다.
- **Harness activation failure**: agent가 관련 harness artifact를 working context로 가져오지 못하는 실패 모드. `threejs` 사례처럼 multi-key 형식으로 load action을 내면 format gate가 거부해 skill 본문이 컨텍스트에 진입하지 못한다. action-protocol 계층의 실패다.
- **Harness adherence failure**: harness가 로드되었음에도 그 안내를 따르지 못하는 실패 모드. `pg-essay-to-audiobook` 사례처럼 절차 안내를 완성된 스크립트로 오해하고 첫 시도 실패 후 fallback chain을 건너뛰는 형태다. 절차 실행 계층의 실패다.
- **Procedurally isomorphic**: 두 skill이 표현(길이, 구현 디테일)은 달라도 단계 순서와 조건과 의도가 동일한 상태. Qwen3.5-9B와 Opus 4.6 evolver가 만든 `flink-query` skill 사이 관계다.
- **In-situ evaluation**: task $x \in X_t$가 evidence $D_t$에 들어가기 전 harness $H_{t-1}$ 아래에서 채점되는 평가 setting. 자기 자신이 만든 harness update로 점수가 오염되지 않는다.
- **Anchor set**: capability metric을 계산할 때 다른 한쪽을 고정하는 reference 모델 집합. 본 논문에서는 $F^\star = E^\star = $ {Opus 4.6, Sonnet 4.6, Qwen3-235B}다.
- **Tier**: base capability 기준의 거친 분류. 논문이 Table 3에서 명시한 대표 모델은 weak-tier가 Qwen3-32B, mid-tier가 GPT-OSS-120B, strong-tier가 Opus 4.6이고, 본문은 Sonnet 4.6도 strong-tier 예시로 든다. 나머지 모델의 tier 배정은 논문에 없다.
- **Drift (load → final)**: phase-adherence judge가 측정한 harness loaded 구간 점수에서 final turn 구간 점수를 뺀 값. weak-tier에서 −0.39, strong-tier에서 −0.09다.
- **Claim-fulfillment score**: MCP-Atlas의 채점 단위. 최종 답이 만족한 reference claim 비율로 0에서 1 사이 값을 낸다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | "harness self-evolution 전체 구조" | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 2 | "두 발견 요약도, flat과 non-monotonic" | caption-region | ★ wiki 권장 (findings) |
| fig03 | 5 | "evolver 7종의 harness-updating 막대그래프" | caption-region | 본문 표로 재현 (4.2절) |
| fig04 | 6 | "flink-query에서 evolver 3조건 비교" | caption-region | ★ wiki 권장 (case study) |
| fig05 | 6 | "MCP-Atlas evolution 이후 pass rate 분포" | caption-region | 본문 표로 재현 (4.4절) |
| fig06 | 7 | "SWE base pass rate 대비 harness-benefit 곡선" | caption-region | ★ wiki 권장 (result) |
| fig07 | 8 | "Qwen3-32B의 두 실패 모드 trajectory" | caption-region | ★ wiki 권장 (diagnosis) |
| fig08 | 15 | "SWE와 SB의 evolution 이후 pass rate 분포" | caption-region | 본문 표로 재현 (4.4절) |
| fig09 | 17 | "MCP와 SB의 base 대비 harness-benefit" | caption-region | 본문 표로 재현 (4.5절) |
| tab01 | 7 | "base와 harness-benefit 표 캡션만 잡힌 크롭" | table-region | 크롭 불완전, 본문 표로 재현 (4.5절) |
| tab02 | 7 | "SkillsBench의 SLR, HFR, LPR 지표" | table-region | 본문 표로 재현 (4.7절) |
| tab03 | 8 | "구간별 adherence 점수와 drift" | table-region | 본문 표로 재현 (4.8절) |
| tab04 | 13 | "벤치마크 3종 통계" | table-region | 본문 표로 재현 (4.1절) |
| tab05 | 14 | "evolver 쪽 전체 행렬" | table-region | 본문 표로 재현 (4.3절) |
| tab06 | 15 | "극단 agent와 evolver 조합 비교" | table-region | 본문 표로 재현 (4.4절) |
| tab07 | 16 | "agent 쪽 전체 행렬" | table-region | 본문 표로 재현 (4.6절) |
| tab08 | 18 | "SWE용 agent 시스템 프롬프트" | column-band | (프롬프트 전문, 임베드 불필요) |
| tab09 | 19 | "MCP용 agent 시스템 프롬프트" | column-band | (프롬프트 전문, 임베드 불필요) |
| tab10 | 20 | "evolver 고정 시스템 프롬프트" | column-band | (프롬프트 전문, 임베드 불필요) |
| tab11 | 21 | "evolver cycle별 사용자 메시지 템플릿" | column-band | (프롬프트 전문, 임베드 불필요) |
| tab12 | 22 | "HFR 1단계 rubric 추출 프롬프트" | column-band | (프롬프트 전문, 3.5절에 요약) |
| tab13 | 23 | "HFR 2단계 trajectory 판정 프롬프트" | column-band | (프롬프트 전문, 3.5절에 요약) |
| tab14 | 24 | "구간별 adherence 판정 프롬프트" | column-band | (프롬프트 전문, 3.5절에 요약) |

수치 표 크롭(tab02에서 tab07)은 이미지 대신 본문 마크다운 표로 재현했다. tab01은 캡션 영역만 잡혀 표 본문이 빠졌고, 해당 수치는 fig06 크롭과 4.5절 표에 들어 있다. tab08에서 tab14는 프롬프트 전문이라 wiki 임베드 대상이 아니며 요지만 3.4절과 3.5절에 옮겼다.
