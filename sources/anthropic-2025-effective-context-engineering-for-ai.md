---
title: "Effective Context Engineering for AI Agents"
type: article
year: 2025
category: agents
raw_path: raw/articles/anthropic-2025-effective-context-engineering-for-ai.md
raw_filename: "anthropic-2025-effective-context-engineering-for-ai.md"
source_collection: external
author: "Prithvi Rajasekaran, Ethan Dixon, Carly Ryan, Jeremy Hadfield (Anthropic Applied AI)"
url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
publisher: "Anthropic Engineering"
tags: [context-engineering, agents, prompt-engineering, compaction, memory, sub-agents, claude-code]
figures:
  - id: fig01
    file: assets/anthropic-2025-effective-context-engineering-for-ai/fig01.png
    raw: raw/articles/anthropic-2025-effective-context-engineering-for-ai-figures/fig01.png
    caption: "prompt engineering과 context engineering의 대비. 단일 턴 질의는 system prompt와 user message만 담고, 에이전트는 후보 컨텍스트에서 매 턴 큐레이션해 context window를 다시 채운다"
    strategy: manual
    curated: true
  - id: fig02
    file: assets/anthropic-2025-effective-context-engineering-for-ai/fig02.png
    raw: raw/articles/anthropic-2025-effective-context-engineering-for-ai-figures/fig02.png
    caption: "system prompt의 고도 보정 스펙트럼. too specific 극단의 if-else 하드코딩과 too vague 극단의 막연한 지시 사이에 just right 구간이 있다"
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

context engineering을 prompt engineering의 다음 단계로 정의하고, 유한한 attention budget 안에서 원하는 결과를 낼 확률을 높이는 high-signal 토큰의 최소 집합을 찾는 원칙과, long-horizon 작업을 위한 세 가지 기법(compaction, structured note-taking, 서브에이전트 구조)을 정리한 Anthropic Applied AI 팀의 실무 가이드.

## 1. 자료 정보 (Document Information)

- **제목**: Effective Context Engineering for AI Agents
- **저자**: Prithvi Rajasekaran, Ethan Dixon, Carly Ryan, Jeremy Hadfield (Anthropic Applied AI 팀), 기여: Rafi Ayub, Hannah Moran, Cal Rueb, Connor Jennings
- **발행**: Anthropic Engineering 블로그, 2025-09-29
- **유형**: article (엔지니어링 실무 가이드)
- **원문 URL**: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

## 2. 주요 기여 (Key Contributions)

- **용어 정립**: prompt engineering은 프롬프트(특히 system prompt)를 잘 쓰고 조직하는 방법이고, **context engineering**은 추론 과정에서 context window에 들어갈 토큰 전체(system instruction, tools, MCP, external data, message history)를 큐레이션하고 유지하는 전략이라고 구분한다. context engineering을 prompt engineering의 자연스러운 확장으로 본다.
- **문제 재정의**: 언어 모델로 만드는 일이 "프롬프트에 쓸 적절한 표현 찾기"에서 "어떤 컨텍스트 구성이 원하는 모델 행동을 낼 확률이 가장 높은가"라는 더 넓은 질문으로 옮겨갔다고 진단한다. 저자들은 이 태도를 *thinking in context*라 부르며, 특정 시점에 모델이 쥔 전체 상태와 그 상태가 낼 수 있는 행동을 함께 고려하는 것이라고 설명한다.
- **핵심 원칙**: LLM의 attention budget은 유한하므로, 좋은 context engineering은 원하는 결과의 확률을 최대화하는 high-signal 토큰의 **최소 집합**을 찾는 일이다.
- **context rot 개념**: context window의 토큰 수가 늘수록 recall 정확도가 떨어진다. Transformer의 구조적 제약(n개 토큰의 n제곱 pairwise 관계)과 짧은 시퀀스 위주의 학습 분포에서 비롯되며, 급격한 절벽이 아니라 완만한 performance gradient로 나타난다.
- **long-horizon 3대 기법**: compaction, structured note-taking, 멀티에이전트 구조를 context pollution 대응책으로 제시하고 각각의 적합한 상황을 정리한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### context와 context engineering의 정의

- **context**: 언어 모델에서 샘플링할 때 포함되는 토큰의 집합이다. engineering 문제는 LLM의 내재적 제약에 맞서 그 토큰들의 효용을 최적화해 원하는 결과를 일관되게 얻어내는 일이다.
- prompt engineering이 초기에 작업의 대부분을 차지한 이유를 저자들은 사용 사례 구성에서 찾는다. 일상 대화를 뺀 나머지 사용 사례가 대부분 one-shot 분류나 텍스트 생성이라, 프롬프트 한 번을 잘 쓰는 것이 곧 성능이었다.
- 여러 턴에 걸쳐 긴 시간 동안 동작하는 에이전트로 넘어가면 관리 대상이 프롬프트에서 컨텍스트 상태 전체로 넓어진다. loop 안에서 실행되는 에이전트는 다음 추론 턴에 관련될 수 있는 데이터를 계속 만들어내고, 이 정보를 주기적으로 정제해야 한다. context engineering은 그 계속 늘어나는 후보 정보 가운데 한정된 context window에 넣을 것을 고르는 일이다.

### attention 희소성의 세 원인

needle-in-a-haystack 계열 벤치마킹 연구가 context rot를 드러냈다. 모델마다 성능 저하가 완만한 정도의 차이는 있지만 이 특성은 모든 모델에서 나타난다. 따라서 컨텍스트는 한계 효용이 체감하는 유한 자원으로 다뤄야 한다. 작업 기억 용량이 제한된 인간처럼, LLM도 대량의 컨텍스트를 파싱할 때 끌어다 쓰는 attention budget을 갖는다. 새 토큰이 들어올 때마다 이 예산이 얼마씩 줄어든다.

| 원인 | 내용 | 결과 |
|---|---|---|
| Transformer 구조 | 모든 토큰이 컨텍스트 전체의 다른 모든 토큰을 참조할 수 있어 n개 토큰에 n제곱 pairwise 관계가 생긴다 | 컨텍스트가 길어질수록 이 관계를 잡아내는 능력이 얇게 늘어나고, 컨텍스트 크기와 attention 집중 사이에 긴장이 생긴다 |
| 학습 분포의 편향 | 학습 데이터에서 짧은 시퀀스가 긴 시퀀스보다 흔하다 | 컨텍스트 전역 의존 관계를 다뤄 본 경험이 적고, 그 용도에 특화된 파라미터도 적다 |
| position encoding interpolation | 긴 시퀀스를 원래 학습한 짧은 컨텍스트에 맞춰 적응시켜 처리하게 하는 기법 | 긴 시퀀스를 다룰 수 있게 되는 대신 토큰 위치 이해가 일부 저하된다 |

세 요인이 합쳐져 나타나는 결과는 급격한 절벽이 아니라 performance gradient다. 즉 모델은 긴 컨텍스트에서도 높은 능력을 유지하지만, 짧은 컨텍스트에서의 성능에 비해 정보 검색과 long-range reasoning의 정밀도가 낮아질 수 있다.

### context의 구성 요소별 지침

**System prompt**는 매우 명확하고 단순하며 직접적인 언어로, 에이전트에게 *right altitude*(적정 고도)에 맞춰 생각을 제시해야 한다. right altitude는 두 가지 흔한 실패 사이의 Goldilocks zone이다.

| 극단 | 증상 | 대가 |
|---|---|---|
| too specific | 정확한 에이전트 행동을 끌어내려고 복잡하고 취약한 로직을 프롬프트에 하드코딩한다 | 취약성이 생기고 시간이 갈수록 유지 비용이 커진다 |
| too vague | 막연한 상위 수준 지침만 주어 원하는 출력의 구체적 신호를 주지 못하거나, 공유 맥락을 잘못 가정한다 | 모델이 무엇을 해야 하는지 정하지 못한다 |
| just right | 행동을 효과적으로 이끌 만큼 구체적이면서, 강한 heuristic을 줄 만큼 유연하다 | 두 실패의 균형점 |

- **섹션 구분 권장**: `<background_information>`, `<instructions>`, `## Tool guidance`, `## Output description` 같은 구획을 XML 태그나 Markdown 헤더로 나눌 것을 권한다. 다만 모델 능력이 올라갈수록 프롬프트 포맷 자체의 중요성은 낮아지고 있다고 덧붙인다.
- **minimal의 뜻**: 구조를 어떻게 잡든 목표는 기대 행동을 온전히 규정하는 최소 정보량이다. minimal이 짧다는 뜻은 아니며, 에이전트가 원하는 행동을 지키도록 충분한 정보를 앞서 줘야 한다.
- **권장 튜닝 절차**: 가장 좋은 모델에 minimal 프롬프트를 먼저 걸어 과제 성능을 확인하고, 초기 테스트에서 발견한 실패 유형을 근거로 명확한 지시와 예시를 더해 성능을 올린다.

**Tools**는 에이전트가 환경과 상호작용하며 새 컨텍스트를 끌어오는 수단이다. tool이 에이전트와 정보 및 행동 공간 사이의 계약을 정의하므로, 토큰 효율적인 정보를 돌려주는 쪽과 효율적인 에이전트 행동을 유도하는 쪽 양면에서 효율을 촉진해야 한다.

| 요건 | 내용 |
|---|---|
| self-contained | 잘 설계된 코드베이스의 함수처럼 독립적으로 성립한다 |
| 에러에 강함 | 실패 상황에서도 견고하게 동작한다 |
| 용도가 명확함 | 어떤 상황에 쓰라는 것인지 오해 없이 드러난다 |
| 파라미터 품질 | 입력 파라미터도 서술적이고 모호하지 않으며, 모델이 원래 잘하는 방식에 맞춘다 |
| 기능 중복 최소 | tool 사이 기능이 겹치지 않는다 |

저자들이 자주 본 실패 유형 가운데 하나는 너무 많은 기능을 담아 부풀거나 어느 tool을 쓸지 판단이 모호해지는 tool set이다. 사람 엔지니어조차 주어진 상황에서 어느 tool을 써야 한다고 단정하지 못하면, 에이전트가 더 잘하기를 기대할 수 없다. 최소 실행 가능한 tool 집합을 큐레이션하면 긴 상호작용에서 컨텍스트를 유지하고 솎아내는 일도 더 안정된다. tool 설계의 세부는 Anthropic의 다른 글 "Writing tools for AI agents – with AI agents"가 다룬다.

**Examples(few-shot prompting)**는 계속 강하게 권하는 관행이다. 다만 팀들이 특정 과제에서 모델이 따라야 할 규칙을 모두 적으려고 edge case 목록을 프롬프트에 몰아 넣는 경우가 많은데, 저자들은 이 방식을 권하지 않는다. 대신 에이전트의 기대 행동을 효과적으로 보여 주는 다양한 canonical 예시 집합을 큐레이션한다. LLM에게 예시는 천 마디 말에 해당하는 "그림"이다.

구성 요소 전반에 걸친 지침은 하나로 모인다. 신중하게 고르고, 컨텍스트를 informative yet tight, 곧 정보는 충분하되 군더더기 없이 유지한다.

### context retrieval: pre-inference에서 just-in-time으로

- 에이전트의 단순 정의: LLM이 loop 안에서 자율적으로 tool을 사용하는 것. 저자들은 고객과 일하며 업계가 이 단순한 패러다임으로 수렴하는 것을 봤다고 적는다. 기반 모델이 강해질수록 에이전트 자율성 수준도 확장되며, 더 똑똑한 모델은 미묘한 문제 공간을 스스로 탐색하고 오류에서 회복한다.
- 많은 AI 네이티브 애플리케이션이 지금은 embedding 기반의 pre-inference 시점 retrieval로 에이전트가 추론할 컨텍스트를 미리 올린다. 업계가 더 agentic한 접근으로 옮겨가면서, 이 retrieval 시스템에 "just in time" 컨텍스트 전략을 덧붙이는 팀이 늘고 있다.

| 구분 | pre-inference retrieval | just-in-time |
|---|---|---|
| 로딩 시점 | 추론 전에 관련 데이터를 미리 처리한다 | 런타임에 tool로 동적으로 불러온다 |
| 보유 대상 | 처리된 데이터 본문 | 가벼운 식별자(file path, stored query, web link) |
| 대표 수단 | embedding 색인 | 파일 시스템 탐색, Bash 명령 |
| 약점 | 색인이 낡거나 컨텍스트가 부풀 수 있다 | 런타임 탐색이 pre-computed 조회보다 느리다 |

Claude Code가 대용량 데이터베이스 분석에서 이 방식을 쓴다. 모델이 목표를 좁힌 쿼리를 작성하고 결과를 저장한 다음, `head`와 `tail` 같은 Bash 명령으로 대량 데이터를 분석한다. 전체 데이터 객체를 컨텍스트에 올리는 일이 한 번도 없다. 저자들은 이 방식이 인간 인지를 닮았다고 본다. 사람은 정보 전체를 암기하지 않고 파일 시스템, 받은 편지함, 북마크 같은 외부 조직화와 색인 체계를 만들어 필요할 때 꺼내 쓴다.

식별자의 metadata 자체도 행동을 효율적으로 정제하는 수단이 된다. 명시적으로 주어졌든 직관적으로 읽히든 마찬가지다. 파일 시스템에서 동작하는 에이전트에게 `tests` 폴더의 `test_utils.py`는 `src/core_logic/`에 있는 같은 이름 파일과 다른 용도를 뜻한다.

| metadata 신호 | 읽히는 뜻 |
|---|---|
| 폴더 계층 | 파일이 놓인 자리로 용도를 구분한다 |
| naming convention | 이름이 목적을 암시한다 |
| 파일 크기 | 복잡도를 시사한다 |
| timestamp | 관련성의 대리 지표가 된다 |

에이전트가 데이터를 스스로 탐색해 가져오게 하면 **progressive disclosure**도 가능해진다. 탐색을 통해 관련 컨텍스트를 점진적으로 발견하는 방식이다. 각 상호작용이 다음 결정에 쓰일 컨텍스트를 낳고, 에이전트는 이해를 층층이 쌓아 올린다. 이때 working memory에는 꼭 필요한 것만 남기고 지속성이 더 필요한 부분은 note-taking 전략에 맡긴다. 이렇게 스스로 관리하는 context window는 에이전트가 방대하지만 관련 없을 수 있는 정보에 잠기는 대신 관련 부분집합에 집중하게 한다.

트레이드오프도 있다. 런타임 탐색은 pre-computed 데이터 조회보다 느리다. 게다가 LLM이 자기 정보 지형을 효과적으로 탐색할 올바른 tool과 heuristic을 갖추도록 의견 있고 신중한 엔지니어링이 필요하다. 적절한 안내가 없으면 에이전트는 tool을 잘못 써서, dead-end를 쫓아서, 또는 핵심 정보를 식별하지 못해서 컨텍스트를 낭비한다.

**hybrid 전략**: 어떤 환경에서는 가장 효과적인 에이전트가 hybrid 전략을 쓸 수도 있다고 본다. 속도를 위해 일부 데이터를 미리 가져오고, 그 외에는 에이전트 판단에 맡겨 자율 탐색을 이어가는 방식이다. 자율성의 적정 수준을 정하는 경계는 과제에 따라 달라진다. Claude Code가 이 hybrid 모델을 쓴다. CLAUDE.md 파일은 앞단에서 그대로 컨텍스트에 넣고, `glob`과 `grep` 같은 primitive로 환경을 탐색해 파일을 just-in-time으로 가져온다. 이 구성은 낡은 색인과 복잡한 syntax tree의 문제를 효과적으로 우회한다. 저자들은 hybrid 전략이 법률이나 금융 업무처럼 내용 변화가 덜한 맥락에 더 맞을 수 있다고 본다. 모델 능력이 나아질수록 agentic 설계는 똑똑한 모델이 똑똑하게 행동하도록 맡기고 사람의 큐레이션을 점차 줄이는 방향으로 갈 것이라 전망한다. 분야의 변화 속도가 빠른 만큼 "do the simplest thing that works"가 계속 최선의 조언으로 남을 것이라고 정리한다.

### long-horizon 작업 3대 기법

long-horizon 작업은 행동 시퀀스의 토큰 수가 LLM의 context window를 초과하는 동안 에이전트가 일관성과 컨텍스트, 목표 지향 행동을 유지해야 하는 작업이다. 대규모 코드베이스 마이그레이션이나 포괄적 리서치 프로젝트처럼 수십 분에서 여러 시간의 연속 작업이 걸리는 과제에는 context window 크기 한계를 우회하는 전용 기법이 필요하다.

더 큰 context window를 기다리는 것도 방법처럼 보인다. 그러나 저자들은 가까운 미래에는 크기와 무관하게 모든 context window가 context pollution과 정보 관련성 문제의 대상이 될 가능성이 높다고 본다. 적어도 가장 강한 에이전트 성능을 원하는 상황에서는 그렇다.

- **Compaction**: context window 한계에 다가가는 대화의 내용을 요약하고, 그 요약으로 새 context window를 다시 시작하는 관행이다. 장기 일관성을 끌어올리는 첫 번째 수단으로 쓰인다. 핵심은 context window의 내용을 충실도 높게 압축해 성능 저하를 최소화한 상태로 에이전트가 이어가게 하는 것이다. Claude Code는 message history를 모델에 넘겨 가장 중요한 세부를 요약하고 압축한다. 모델은 아키텍처 결정, 미해결 버그, 구현 세부를 보존하고 중복 tool 출력이나 메시지는 버린다. 그다음 압축된 컨텍스트에 가장 최근 접근한 파일 5개를 더해 이어간다. 사용자는 context window 한계를 걱정하지 않고 연속성을 얻는다.
  - compaction의 기술은 무엇을 남기고 무엇을 버리는 선택에 있다. 지나치게 공격적인 compaction은 미묘하지만 결정적인 컨텍스트, 곧 나중에야 중요성이 드러나는 정보를 잃게 만들 수 있다.
  - 구현 권장 절차는 복잡한 에이전트 trajectory로 프롬프트를 신중히 튜닝하는 것이다. 먼저 recall을 최대화해 compaction 프롬프트가 trajectory의 모든 관련 정보를 잡게 하고, 그다음 불필요한 내용을 걷어내며 precision을 반복 개선한다.
  - 걷어내기 쉬운 불필요 내용의 예가 tool 호출과 결과를 지우는 것이다. message history 깊은 곳에서 이미 호출된 tool의 raw 결과를 에이전트가 다시 볼 필요는 없다. 가장 안전하고 손이 덜 가는 compaction 형태 가운데 하나가 tool result clearing이며, 최근 Claude Developer Platform 기능으로 출시됐다.
- **Structured note-taking (agentic memory)**: 에이전트가 context window 밖 메모리에 노트를 주기적으로 기록하고, 나중에 그 노트를 context window로 다시 끌어오는 기법이다. 오버헤드가 적은 지속 메모리를 제공한다. Claude Code가 to-do list를 만드는 것이나 커스텀 에이전트가 NOTES.md를 유지하는 것이 그 예다. 이 단순한 패턴으로 에이전트는 복잡한 작업의 진행을 추적하고, 수십 번의 tool call을 거치며 잃어버릴 결정적 컨텍스트와 의존 관계를 유지한다.
  - Claude가 Pokémon을 플레이한 사례가 코딩이 아닌 영역에서 메모리가 능력을 바꾸는 방식을 보여준다. 에이전트는 수천 번의 게임 스텝에 걸쳐 정확한 집계를 유지한다. 원문이 든 예시는 "지난 1,234 스텝 동안 Route 1에서 Pokémon을 훈련시켰고 Pikachu는 목표 10레벨 가운데 8레벨을 얻었다"는 형태의 목표 추적이다.
  - 주목할 점은 메모리 구조에 대한 어떤 프롬프트도 없이 이 행동이 나타났다는 것이다. 에이전트는 탐색한 지역의 지도를 스스로 만들고, 어떤 핵심 성취를 열었는지 기억하며, 상대에 따라 어느 공격이 잘 통하는지 배우는 데 도움이 되는 전투 전략 노트를 유지한다.
  - context reset 이후 에이전트는 자기 노트를 읽고 여러 시간에 걸친 훈련 시퀀스나 던전 탐색을 이어간다. 요약 단계를 넘나드는 이 일관성이 모든 정보를 LLM의 context window에만 두고서는 불가능한 long-horizon 전략을 가능하게 한다.
  - Sonnet 4.5 출시의 일부로 Claude Developer Platform에 memory tool을 public beta로 공개했다. 파일 기반 시스템으로 context window 밖에 정보를 저장하고 참조하기 쉽게 만드는 tool이다. 이를 통해 에이전트는 시간이 지나며 지식 베이스를 쌓고, 세션을 넘겨 프로젝트 상태를 유지하며, 모든 것을 컨텍스트에 두지 않고도 이전 작업을 참조한다.
- **서브에이전트 구조**: 컨텍스트 한계를 우회하는 또 하나의 방법이다. 하나의 에이전트가 프로젝트 전체의 상태를 유지하려 애쓰는 대신, 전문화된 서브에이전트가 깨끗한 context window로 집중된 작업을 처리한다. 메인 에이전트는 상위 수준 계획으로 조율하고, 서브에이전트는 깊은 기술 작업을 수행하거나 tool로 관련 정보를 찾는다. 각 서브에이전트는 수만 토큰 이상을 쓰며 폭넓게 탐색할 수 있지만, 돌려주는 것은 응축해 정제한 요약뿐이며 그 크기는 보통 1,000에서 2,000 토큰이다.
  - 이 방식은 관심사의 명확한 분리를 이룬다. 상세한 검색 컨텍스트는 서브에이전트 안에 격리되고, lead agent는 결과를 종합하고 분석하는 데 집중한다. Anthropic의 다른 글 "How we built our multi-agent research system"이 다룬 이 패턴은 복잡한 리서치 과제에서 single-agent 시스템 대비 상당한 개선을 보였다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크 논문이 아니라 실무 가이드다. 정성적 근거로 다음을 인용한다.

- needle-in-a-haystack 계열 벤치마킹 연구가 context rot, 곧 토큰 증가에 따른 recall 감소를 드러냈고, 저하 정도의 차이는 있으나 모든 모델에서 관찰된다.
- 멀티에이전트 리서치 시스템이 복잡한 리서치 과제에서 single-agent 대비 상당한 개선을 보였다("How we built our multi-agent research system" 참조).

세 기법의 적합 상황은 다음과 같이 정리된다.

| 기법 | 적합 상황 |
|---|---|
| Compaction | 잦은 주고받기가 필요한 작업에서 대화 흐름을 유지한다 |
| Note-taking | 명확한 milestone이 있는 반복적 개발에서 강점을 보인다 |
| 멀티에이전트 구조 | 병렬 탐색이 이득을 내는 복잡한 리서치와 분석을 다룬다 |

선택은 과제 특성에 따른다. 모델이 계속 나아져도 확장된 상호작용에서 일관성을 유지하는 문제는 더 효과적인 에이전트를 만드는 일의 중심에 남을 것이라고 저자들은 본다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- context window가 커져도 가까운 미래에는 크기와 무관하게 context pollution과 정보 관련성 문제가 남을 가능성이 높다. 적어도 가장 강한 에이전트 성능을 원하는 상황에서는 더 큰 window를 기다리는 것만으로 해법이 되지 못한다.
- just-in-time 탐색은 pre-computed 조회보다 느리다. 또한 tool과 heuristic을 제대로 갖추지 못하면 에이전트가 tool 오용, dead-end 추적, 핵심 정보 식별 실패로 컨텍스트를 낭비한다.
- compaction이 지나치면 나중에야 중요성이 드러나는 미묘하지만 결정적인 맥락을 잃을 수 있다.
- 정량 근거가 없다. 세 기법의 효과는 사례 서술과 다른 글의 참조로 제시되며, 이 글 안에 측정값은 없다.
- 모델이 강해질수록 prescriptive engineering의 필요는 줄고 에이전트 자율성은 커진다. 그래도 컨텍스트를 귀하고 유한한 자원으로 다루는 원칙은 신뢰할 수 있는 에이전트를 만드는 일의 중심에 계속 남는다.

## 6. 관련 연구 (Related Work)

- Anthropic 자체 글: "Building effective AI agents"(워크플로 대 에이전트 구분), "Writing tools for AI agents – with AI agents"(tool 설계), "How we built our multi-agent research system"(서브에이전트 구조 근거).
- Claude Developer Platform: memory tool(Sonnet 4.5 public beta), tool result clearing, memory와 context management cookbook.
- 본 wiki 내: harness 및 loop engineering 계열(Team Attention, Addy Osmani), Agent Skills 계열, Claude Code 운영 가이드(Arpan Patel) 등과 직접 맞닿는다.

## 7. 용어집 (Glossary)

- **Context engineering**: 추론 중 context window에 들어갈 토큰 전체를 큐레이션하고 유지하는 전략. prompt engineering의 확장.
- **Thinking in context**: 특정 시점에 모델이 쥔 전체 상태와 그 상태가 낼 수 있는 행동을 함께 고려하는 사고 방식.
- **Attention budget**: LLM이 대량 컨텍스트를 파싱할 때 끌어다 쓰는 유한한 주의 자원. 토큰이 추가될 때마다 소모된다.
- **Context rot**: 토큰 수가 늘수록 컨텍스트 내 정보 recall 정확도가 떨어지는 현상.
- **Right altitude**: system prompt가 지향할 적정 고도. 취약한 하드코딩과 지나친 막연함 사이의 Goldilocks zone.
- **Just-in-time context**: 데이터를 미리 로드하지 않고 가벼운 식별자만 두었다가 런타임에 tool로 동적으로 불러오는 전략.
- **Compaction**: window 한계 근처 대화를 요약해 새 context window로 재출발하는 기법.
- **Tool result clearing**: message history 깊은 곳의 tool 호출과 결과를 지우는 경량 compaction. Claude Developer Platform 기능.
- **Structured note-taking (agentic memory)**: 컨텍스트 밖 메모리에 노트를 기록하고 재로드하는 지속 메모리 기법.
- **Position encoding interpolation**: 긴 시퀀스를 원래 학습한 짧은 컨텍스트에 맞춰 적응시키는 기법. 토큰 위치 이해가 일부 저하된다.

## 8. 그림 후보 (Figure Candidates)

원문에 도식이 없어 자동 추출(Step 2.5)은 건너뛰고, 사용자가 원문 다이어그램 2장을 직접 캡처해 저장했다(`strategy: manual`).

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | prompt engineering과 context engineering의 대비. 단일 턴 질의는 system prompt와 user message만 담고, 에이전트는 후보 컨텍스트에서 매 턴 큐레이션해 context window를 다시 채운다 | manual | ★ wiki 채택 (요약, concept) |
| fig02 | system prompt의 고도 보정 스펙트럼. too specific 극단의 if-else 하드코딩과 too vague 극단의 막연한 지시 사이에 just right 구간이 있다 | manual | ★ wiki 채택 (method) |
