---
title: "더 이상 Claude를 프롬프팅하지 않습니다 — 하지만 프롬프트는 여전히 중요합니다"
type: article
year: 2026
category: agents
raw_path: raw/articles/kang-2026-no-longer-prompting-claude.md
raw_filename: "kang-2026-no-longer-prompting-claude.md"
source_collection: external
author: "Sujin Kang (강수진)"
url: "https://www.linkedin.com/posts/sujin-prompt-engineer_promptengineering-loopengineering-contextengineering-activity-7479012981381689344-bFDu"
publisher: "LinkedIn"
fetched_at: "2026-09-10T07:02:04+0900"
extractor_tier: "chrome"
tags: [prompt-engineering, context-engineering, harness-engineering, loop-engineering, claude-code, boris-cherny, addy-osmani, mitchell-hashimoto, paradigm-shift]
figures:
  - id: fig01
    file: assets/kang-2026-no-longer-prompting-claude/page-full.png
    raw: raw/articles/kang-2026-no-longer-prompting-claude-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

> **수집 메모 (재수집 2026-09-10)**: 이 파일은 2026-09-10 사용자 지시에 따라 `scripts/fetch_article.py`(chrome tier)로 **원문 전문을 다시 수집한 것**이다. 이전 판은 `WebFetch`가 돌려준 요약본이라 원문 전문이 아니었고, CLAUDE.md의 "raw는 원본 그대로의 불변 아카이브" 전제와 어긋났다. 본문은 원문 그대로이며 요약, 번역, 윤문하지 않았다. 이전 판은 git 이력에 남아 있다.

---

🟣 더 이상 Claude를 프롬프팅하지 않습니다 >> 하지만 프롬프트는 여전히 중요합니다. Claude Code를 이끄는 Anthropic의 Boris Cherny가 한 말입니다. 이제 자신의 일은 프롬프트를 쓰는 게 아니라, Claude를 프롬프팅하는 루프를 설계하는 것이라고합니다. 2026년 6월, 이 발언은 "Loop Engineering"이라는 이름을 얻으며 하나의 담론이 되었습니다. ➰ Prompt → Context → Harness → Loop 약 4년에 걸쳐 최적화 단위가 이동해온 흐름입니다. 1️⃣ Prompt Engineering 한 번의 지시문을 최적화. "무엇을 말할 것인가" 2️⃣ Context Engineering 2025년 Anthropic이 개념 정리. 프롬프트 밖의 모든 토큰 구성을 최적화 3️⃣ Harness Engineering 2026년 2월 HashiCorp 공동창업자 Mitchell Hashimoto가 제안. 도구·제약·검증 게이트 등 모델 바깥의 실행 환경을 설계."Agent = Model + Harness" 4️⃣ Loop Engineering 2026년 6월 7일 Google Chrome의 Addy Osmani가 명명. 하네스를 타이머 위에 올리고, 서브에이전트를 생성하고, 스스로에게 일을 공급하는 오케스트레이션 계층. 단계가 올라갈수록(단어 → 맥락 → 환경 → 시스템) 사람이 설계하는 단위는 커지고 건별 개입은 줄어듭니다. ✅ 루프의 5가지 구성 요소 (+n) *Osmani가 정리한 요소를 요약했습니다. Claude Code와 Codex 모두 이미 갖춘 요소들입니다. • Automations -스케줄/이벤트 트리거 (/loop, cron, hooks, GitHub Actions) • Worktrees - 병렬 에이전트의 작업 격리 • Skills - 재사용 가능한 능력 패키징 • Sub-agents - 큰 목표의 분해·위임 • Connectors - 외부 시스템 연결 (MCP) • +External State - 실행 간 기억을 유지하는 외부 상태 OpenAI는 이미 내부에서 이슈 트리아지, CI 실패 요약, 버그 헌팅에 루프를 상시 가동중이라고 했습니다. 그런데 이 개념을 말한 Osmani 자신이 가장 회의적입니다. ⚠️ 루프 엔지니어링의 3가지 리스크 1️⃣ 검증 부채 에이전트는 증거 없이 "완료"라고 주장한다. 2️⃣ 이해 부채 내가 쓰지 않은 코드가, 내 이해 속도보다 빠르게 쌓인다. 3️⃣ 인지적 저항 루프가 주는 결과를 판단 없이 수용하게 되는 상태 같은 루프를 두 사람이 돌려도 정반대의 결과가 나옵니다. ✅ 그래서 프롬프트 엔지니어링은 죽었나? 전혀 그렇지 않습니다. 루프는 프롬프트로 만들어집니다. 루프 안의 엉성한 프롬프트는, 엉성한 결과물을 더 빠르게 찍어낼 뿐입니다. 하위 계층(프롬프트와 컨텍스트)은 사라지지 않고 루프가 그 위에 구조를 추가하는 것입니다. ✔️ 바뀐 것은 프롬프트의 형태와 수명입니다. 사람이 매 턴 타이핑하는 1회성 지시문였다면 이제는 시스템에 내장되는 프롬프트로 레버리지가 변했습니다. "어떻게 말할 것인가"에서 "내가 없는 동안 (내가 작업을 보지 않는 동안) 에이전트가 무엇이 말하게 할 것인가"를 작업합니다. 루프에서는 프롬프트를 잘못 쓰면 오류가 증폭되는 구조가 됩니다. 루프를 자동으로 구축하되 직접 프롬프트는 여전히 유효하며 시스템을 설계하는 균형의 문제입니다. [#promptengineering](https://www.linkedin.com/signup/cold-join?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Ffeed%2Fhashtag%2Fpromptengineering&trk=public_post-text)[#loopengineering](https://www.linkedin.com/signup/cold-join?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Ffeed%2Fhashtag%2Floopengineering&trk=public_post-text)[#contextengineering](https://www.linkedin.com/signup/cold-join?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Ffeed%2Fhashtag%2Fcontextengineering&trk=public_post-text)[#AIagents](https://www.linkedin.com/signup/cold-join?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Ffeed%2Fhashtag%2Faiagents&trk=public_post-text)[#claudecode](https://www.linkedin.com/signup/cold-join?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Ffeed%2Fhashtag%2Fclaudecode&trk=public_post-text)[#LLM](https://www.linkedin.com/signup/cold-join?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Ffeed%2Fhashtag%2Fllm&trk=public_post-text)[#prompting](https://www.linkedin.com/signup/cold-join?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Ffeed%2Fhashtag%2Fprompting&trk=public_post-text)
