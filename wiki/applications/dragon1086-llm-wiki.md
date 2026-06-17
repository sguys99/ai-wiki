---
title: "LLM Wiki — Karpathy LLM Knowledge Base 패턴의 한국어 레퍼런스 구현"
type: repo
year: 2026
category: applications
raw_path: raw/repos/dragon1086-llm-wiki.md
raw_filename: "dragon1086-llm-wiki.md"
source: dragon1086-llm-wiki.md
source_collection: external
org: "dragon1086"
repo: "llm-wiki"
url: "https://github.com/dragon1086/llm-wiki"
license: "(미명시)"
tags:
  - llm-wiki
  - karpathy-pattern
  - obsidian
  - claude-code
  - claude-cli
  - agents-md
  - knowledge-base
  - ingest-query-lint
  - wikilink
  - mermaid
  - marp
  - matplotlib
  - watchdog
  - launchd
  - macos
  - korean
---

# LLM Wiki (dragon1086) — Karpathy 패턴을 claude CLI subprocess + launchd로 묶은 한국어 미니멀 레퍼런스

## 요약 (Summary)

`dragon1086/llm-wiki`는 Andrej Karpathy의 [LLM Knowledge Base 패턴](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)을 **Claude Code CLI subprocess 호출**로 돌리는 한국어 미니멀 레퍼런스 구현체다. `raw/`에 마크다운을 떨어뜨리면 `python scripts/wiki.py ingest --all` 한 줄이 `summaries/·entities/·concepts/` 페이지를 자동 생성하고 교차참조까지 거는데, `query`는 wiki를 탐색·합성해 텍스트·Marp 슬라이드·Mermaid 다이어그램·matplotlib 차트 중 하나를 골라 `output/`에 떨군다. `lint`는 dead wikilinks·orphans·index drift를 잡고, `watch` + macOS `launchd`로 24/7 백그라운드 자동 ingest까지 엮었다. **5개 Python 스크립트 1,228줄 + 2개 셋업 셸 178줄**로 짠 자족형 시스템.

- **저자**: `dragon1086` (GitHub)
- **라이선스**: 명시 안 됨 (LICENSE 부재 — 사용·인용 전 저자 문의 필요)
- **저장소**: [`dragon1086/llm-wiki`](https://github.com/dragon1086/llm-wiki) (branch `main`)
- **언어**: 한국어 (README·AGENTS.md·프롬프트·CLI 메시지 전부)
- **Phase 완성도**: Foundation·Ingest·Query·Lint·CLI 5단계 모두 ✅
- **의존성**: Python 3.10+, `claude` CLI, Obsidian / PyPI는 `pyyaml`·`click`·`matplotlib`·`watchdog` 4개

## 시스템 코드 ↔ Vault 분리 (Architecture)

이 구현이 가장 먼저 내린 디자인 결정은 **시스템 코드와 데이터 디렉토리의 물리적 분리**다.

```
llm-wiki/                       ← git repo (시스템 코드, ~1.5K LOC)
├── AGENTS.md                   ← LLM 운영 규칙 (system prompt 원천)
├── config.yaml                 ← vault_path 1줄
└── scripts/
    ├── wiki.py                 ← CLI 엔트리(click)
    ├── ingest.py / query.py / lint.py / utils.py
    └── setup_vault.sh / setup_launchd.sh

obsidian-vault/llm-wiki/        ← Obsidian Vault (데이터, git 추적 안 함)
├── raw/                        ← Web Clipper / 수동 .md 투하 지점
├── wiki/{summaries, entities, concepts, findings}/
│             + index.md + log.md + lint_ignore.txt
└── output/                     ← Marp 슬라이드 / Mermaid / matplotlib PNG
```

- 시스템 코드는 git으로 버전관리하고, vault는 사용자별 로컬 자료를 그대로 둔다.
- `config.yaml`의 `vault_path: ...` 한 줄만 다르게 두면 **같은 시스템 코드가 여러 vault**를 운영한다.
- `setup_vault.sh`는 vault 디렉토리·index.md·log.md·lint_ignore.txt 시드 파일까지 자동 생성한다.

## 핵심 기여 (Key Contributions)

1. **`claude --dangerously-skip-permissions -p <prompt>` subprocess 호출이 백본** — 자체 API 키 없이 **로컬 Claude Code 인증**을 빌려 쓴다. `utils.call_claude()`는 `Popen` + `communicate(timeout=300)` + 명시적 `kill()` + `communicate()` 패턴으로 **고아 프로세스·좀비를 막는다**. `--debug`는 raw 응답을 `/tmp/llm-wiki-debug.txt`에 저장해 디버깅에 쓴다.

2. **응답 파싱은 정규식 3종 sentinel로 명시화** — `===FILE: <path>===<content>===END===`, `===INDEX_UPDATE: <section> | <slug> | <desc>===`, `===LOG: <msg>===` 세 안전 토큰. LLM 응답 첫 글자를 `=`로 못박았고, 파싱이 실패하면 응답 첫 500자를 에러에 포함시켜 디버깅을 돕는다.

3. **4종 페이지 타입 + frontmatter 스키마**(AGENTS.md §"Page Types & Frontmatter") — `summary`(소스 1:1), `concept`(다소스 종합 + `confidence: high|medium|low` 자기보고), `entity`(`entity_type: person|org|tool|dataset|paper|other`), `finding`(query 파생 synthesis). 소스 1개당 통상 10–20개 페이지 갱신을 SLA로 명시한다.

4. **4가지 출력 포맷을 단일 `query` 명령에 분기** — `--text|--slides|--diagram|--chart` 플래그로 통일.
   - `--slides`: `.marp.md` + `marp: true` frontmatter → Obsidian의 Marp Slides 플러그인으로 바로 미리보기
   - `--diagram`: ```` ```mermaid ```` 코드블록 → flowchart/sequence/ER 자율 선택
   - `--chart`: LLM이 matplotlib Python 코드를 만들면 `subprocess`로 돌려 PNG로 저장. `plt.savefig({png_path})`는 마지막 줄에 박고 `plt.show()`는 금지

5. **`lint` 4-검사 + `--fix` 자동 수리** — dead wikilinks / orphans / index drift(양방향) / contradictions(`--deep`, claude로 페이지 모순 탐지). `--fix`는 dangling index 항목만 자동으로 지우고(파일 부재 dead link 수정은 사람 검토 영역으로 분리), `lint_ignore.txt`에 메타 슬러그 예외를 등록한다.

6. **`watch` + `setup_launchd.sh`로 macOS 24/7 자동 ingest** — `watchdog.Observer`가 `raw/` 신규 `.md`를 감지하면 1초 기다린 뒤 `run_ingest`를 자동 호출한다. `com.llmwiki.watch` launchd 라벨로 `~/Library/LaunchAgents/`에 plist를 등록해 로그인 시 자동 시작·비정상 종료 시 자동 재시작이 동작한다(`KeepAlive: true`, `ThrottleInterval: 10`). **Obsidian Web Clipper로 raw/에 저장하는 순간 wiki가 갱신되는 무마찰 워크플로우**가 여기서 자리잡는다.

7. **Finding 재파일링으로 지식 복리** — query 답변이 재사용 가치가 있다고 LLM이 판단하면 `===FINDING:===` sentinel로 표시되고, 오케스트레이터는 `wiki/findings/<slug>.md`에 frontmatter + 임베드(`![[output/<png>]]` 또는 `[[<md>]]`)로 저장한다. 다음 query가 이를 컨텍스트로 흡수하므로, 시간이 갈수록 답이 정밀해진다.

## 비교 포인트 (Comparison with Sibling Implementations)

| 항목 | dragon1086/llm-wiki | [[applications/agricidaniel-claude-obsidian]] | [[applications/joonan30-llm-wiki-labs]] |
|---|---|---|---|
| 형태 | Python CLI + claude subprocess | Claude Code 플러그인 + 15개 스킬 | 31일 운영 실측 케이스 스터디 (HTML) |
| 언어 | 한국어 | 영어 | 한국어 |
| 라이선스 | **미명시** | MIT | MIT |
| 자동화 | watchdog + launchd 24/7 | per-file advisory lock + hybrid retrieval | paper monitor·노션 포스팅 자동 루프 5개 |
| 운영 단위 | 1인 | 1인 | 1인 PI 연구실 |
| 산출 포맷 | text·marp·mermaid·chart | wiki 페이지 + 매뉴얼 query | 4-audience 렌즈 인터랙티브 HTML |
| 본 ai-wiki와 유사도 | 가장 가까운 형제(3-tier raw/sources/wiki + category + index.md) | 패턴은 같지만 plugin 형식이라 결이 다름 | 같은 한국어 + 운영 단계 실증 |

## 한계 (Limitations)

1. **라이선스 미명시** — LICENSE 파일·README·AGENTS.md 어디에도 라이선스 정보가 없다. fork·인용·재배포 전에 저자 의사를 확인해야 한다. 형제 자료들이 모두 MIT를 명시한 점과 대조된다.
2. **`--dangerously-skip-permissions`로 권한 우회** — watch + launchd 백그라운드에서 의도치 않은 파일 쓰기 가능성이 있다. 별도 sandbox 가드가 없다.
3. **slug 매칭이 word-intersection naive** — `collect_wiki_context`는 질문 단어 ↔ slug 단어 교집합 크기만 본다. embedding·동의어·의미 유사도를 쓰지 않아 정밀도 한계가 뚜렷하다.
4. **모순 탐지가 단일 컨텍스트** — `check_contradictions`가 최대 30 페이지 × 2,000자를 한 프롬프트에 넣어 silent truncate 위험을 안는다. 대규모 vault에서는 못 잡고 넘어갈 수 있다.
5. **정규식 sentinel의 brittleness** — LLM이 다른 형식으로 답하면 `RuntimeError`로 즉시 멈춘다. structured output(JSON mode)을 쓰지 않는다.
6. **macOS 종속** — `setup_launchd.sh`는 Apple plist 한정이다. Linux(systemd) / Windows 등가 스크립트가 없다.
7. **Phase 5에서 마감** — README에는 다음 phase(hot cache·retrieval embedding·multi-user) 계획이 보이지 않는다. 미니멀 레퍼런스 자리를 자처한 모양새.

## 관련 페이지 (Related Pages)

- [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]] — Karpathy 패턴의 영문 입문 가이드. 본 자료가 그 패턴의 한국어 코드 구현이라면 이쪽은 6단계 워크플로우로 풀어 쓴 설명.
- [[applications/agricidaniel-claude-obsidian]] — 같은 패턴을 Claude Code 플러그인 + 15개 스킬로 정착시킨 영문 reference. 본 자료가 Python CLI라면 이쪽은 Claude Code 네이티브 통합.
- [[applications/joonan30-llm-wiki-labs]] — 한국어 단일 PI 연구실의 31일 운영 케이스 스터디. 본 자료가 명세형 코드라면 이쪽은 운영 단계의 실측치(AGENTS.md 0 → 488줄, paper monitor 자동 루프 등).
- [[applications/kmyu-2026-llm-wiki-pattern-synthesis]] — 본 ai-wiki 소유자의 Karpathy 패턴 한국어 종합 정리. 본 자료를 한 줄로 흡수할 수 있는 메타 정리.
- [[applications/kmyu-2026-akb-llmwiki-gbrain-comparison]] — AKB·llmwiki·GBrain 6축 5점 척도 비교 보고서. 본 자료의 "llmwiki" 진영 대표 사례.
- [[applications/lum1104-understand-anything]] / [[applications/safishamsi-graphify]] / [[applications/colbymchenry-codegraph]] — 인접 코드베이스 분석·KG 자동화 OSS군. wiki 관점과 KG 관점의 대비.
