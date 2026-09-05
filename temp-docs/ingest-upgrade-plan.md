# Wiki 품질 개선 계획 (ingest, 스킬, 재작성)

작성일: 2026-09-05. 이 문서는 wiki 품질 개선 작업의 진단 결과와 단계별 계획, 진행 현황을 기록한다. 각 항목의 체크박스를 작업 완료 시점에 갱신한다.

## 1. 문제 정의

사용자가 제기한 품질 문제는 세 가지다.

1. 영어 자료를 정리한 wiki의 톤이 직역한 느낌이고 설명이 어색하다.
2. 설명이 짧고 상세하지 못해 wiki만 보고 핵심을 이해하기 어렵다.
3. 줄글 위주라 가독성이 떨어진다.

## 2. 원인 진단

저장소 전수 조사로 원인을 확정했다. 원문(raw)의 문제가 아니라 파이프라인과 규칙의 문제다.

### 2-1. 직역투 느낌의 실체

고전적 번역투 마커(문두 접속사, 콜론 헤딩, 피동 남용)는 이미 통제되어 있었다. 실제 신호는 다음 세 가지다.

| 신호 | 실측 | 위치 |
|---|---|---|
| 중간점(·) 남용 | 본문 기준 1,801회, 76개 전 페이지 | 열거를 · 체인으로 문장에 압축하는 습관 |
| em dash(—) 남용 | 본문 기준 702회, 76개 전 페이지 | 문장 연결과 부연에 관행적으로 사용 |
| 영문 병기 헤딩과 IMRaD 골격 | `## 요약 (Summary)` 형식 전 페이지 | CLAUDE.md가 병기를 권장하고 영어 논문 구조를 그대로 옮긴 고정 헤딩 8종을 템플릿으로 강제 |

### 2-2. 짧고 상세하지 못한 원인

출력 길이를 제한하는 규정은 어디에도 없었다. 원인은 네 가지가 겹쳤다.

- 논문 추출이 첫 15페이지, 12,000자에서 끊겨 실험 세부와 ablation이 LLM에 아예 안 들어온다 (정보 기근).
- sources에서 wiki로 갈 때 오히려 더 압축된다. 76건 중 69건에서 wiki가 sources보다 얇고, 압축비 중앙값은 1.26배다.
- sources에는 213/216건이 갖고 있던 용어집 섹션이 wiki 템플릿에 자리가 없어 76건 중 1건만 남았다.
- humanize 자동 윤문(strict)이 변경률 20~35%를 강제하고 삭제 우선 처방을 써서 저장할 때마다 본문이 깎였다.

### 2-3. 줄글 가독성의 원인

- humanize의 AI 티 분류(taxonomy C-2, C-3, C-9, C-10, J-1, J-3)가 불릿, 헤딩, 볼드, 대시를 전부 AI 티로 규정하고 산문으로 녹이라고 처방한다. wiki 전용 면제가 없었다.
- korean-style-rewriter의 `preserve_formatting` 기본값이 false(삭제)다.
- CLAUDE.md 문체 가이드가 "열거는 산문 흐름으로 녹인다"고 지시했다.
- wiki 본문 템플릿에 표와 불릿 예시가 아예 없었다. 결과적으로 76개 중 45개 페이지에 표가 0개다.

### 2-4. 결정적 발견

참고 톤으로 지정된 wikidocs 페이지(366369 등)는 이미 수집된 `raw/articles/jo-2026-*-vla-primer` 시리즈의 원문이다. 원문은 교재식 한국어 27,000자인데 현행 파이프라인이 3,548자 압축 줄글로 만들었다. 목표 스타일의 정답지가 저장소 안에 있는 셈이다.

### 2-5. 부수 발견

- frontmatter 비대: `figures:` 리스트를 curated 여부와 무관하게 전수 복제해 파일의 최대 85%가 frontmatter인 페이지가 다수다.
- index.md 항목 비대: 한 줄 요약이 평균 669자, 최대 1,503자로 두 번째 wiki가 되어 있다.

## 3. 확정된 방향

| 결정 사항 | 내용 |
|---|---|
| 종결어미 | 하다체 유지, 전개만 교재식으로 (짧은 문단, 개념 먼저, "정리하면" 요약, 질문형 도입 허용) |
| humanize | wiki와 sources는 자동 윤문에서 제외. 생성 시점 문체 가이드와 lint로 대체 |
| 논문 추출 상한 | 12,000자에서 40,000자로 상향 (30페이지) |
| 재작성 방식 | 파일럿 3편 작성 후 사용자 리뷰, 승인 후 나머지 배치 진행 |
| 금지 기호 | 중간점(·)과 em dash(—)를 제목과 본문에서 전면 금지 |
| 헤딩 | 영문 병기 폐지, 한글 단독 헤딩 |
| 상세도 | wiki는 sources의 압축본이 아니라 교재식 재구성본. sources보다 얇아지지 않는 것을 기본으로 |

## 4. 단계별 작업 계획과 진행 현황

### Phase 0. 계획 문서

- [x] temp-docs/ingest-upgrade-plan.md 작성 (이 문서)

### Phase 1. 문체와 규칙 정비

- [x] CLAUDE.md: wiki 산문 문체 가이드를 wiki 교재 문체 가이드로 교체
- [x] CLAUDE.md: 헤딩 영문 병기 폐지 (언어 정책 절 수정)
- [x] CLAUDE.md: wiki 본문 템플릿을 교재식 골격으로 개편 (핵심 용어 섹션 복원, 표와 불릿 예시 포함)
- [x] CLAUDE.md: 상세도 원칙 신설 (sources보다 얇아지지 않기, 유형별 분량 목표)
- [x] CLAUDE.md: papers Step 2 추출 스니펫 40,000자, 30페이지로 상향 (books도 동일 상향)
- [x] CLAUDE.md: Step 4 figures 복제 규칙을 curated만 복제로 변경
- [x] CLAUDE.md: index.md 항목 분량 규칙 신설 (1~2문장, 200자 이내)
- [x] write-wiki 스킬: 새 템플릿, 문체 규칙, 분량 가이드, 체크리스트, before/after 예시 반영 (v2.0.0)
- [x] humanize-reminder.sh 훅: wiki, sources 경로의 자동 윤문 강제 해제, 새 가이드 리마인더로 교체
- [x] humanize-korean 스킬: wiki, sources 자동 적용 제외 명시
- [x] 프로젝트 메모리(feedback_humanize_all_text.md) 정책 갱신
- [x] scripts/lint_style.py 신설 (중간점, em dash, 병기 헤딩, "-고," 밀도, 표 부재 검사)
- [x] lint-terms-reminder.sh 훅에 lint_style 연결

### Phase 2. ingest 개선

- [x] ingest-paper 스킬: 추출 상한 40,000자, 30페이지 반영
- [x] sources Step 3 지침 보강 (실험 수치, ablation, 한계 세부 보존 명시)
- [x] 신규 sources에도 중간점, em dash 금지 적용 명시

### Phase 3. 파일럿 재작성 (3편)

- [x] jo-2026-rt-1-vla-primer (한국어 원문 기반): raw 교재식 구조 복원. 본문 3,548자에서 8,017자로, 표 4개, lint 0건
- [x] brohan-2022-rt-1-robotics-transformer-for-real-world (영어 논문 기반): 40k 재추출로 Table 3과 Table 13 정확 수치를 sources에 보강한 뒤 wiki 재작성. 본문 3,754자에서 7,900자 수준으로, 표 7개, frontmatter는 275줄에서 curated 3개로 축소
- [x] hku-mars-fast-lio (repo 기반): 본문 1,405자에서 3,788자로, 표 4개, lint 0건
- [x] 파일럿 3편 lint 통과 확인 (lint_style, lint_terms 모두 0건)
- [x] index.md 파일럿 3편 항목 200자 이내로 축소
- [x] 사용자 리뷰 1차 완료 (2026-09-05, 문체 register 조정 피드백 수령)

### Phase 3-2. 라운드 2, 기술문서체 전환 (사용자 파일럿 리뷰 반영)

사용자 피드백 요지: 교재식 구조는 유지하되 서술을 칼럼, 블로그, 강의록체가 아니라 표준 기술문서체로 쓴다. 자문자답과 화자 개입 금지, 극적 동사와 특정 어휘 금지, 용어 단일 표기와 번역어 병기, 접속 표현 명시와 두괄식, 수치 한국식 단위와 단위 표기.

확정 결정 (2026-09-05):

| 쟁점 | 결정 |
|---|---|
| 용어 경계 | 개념어만 번역 전환. demonstration은 시연 데이터, instruction은 지시문. imitation learning 같은 기법명은 원어 유지 |
| 요약 문단 | 유지하되 "정리하면" 같은 담화 표지 없이 평서문으로 |
| 게이트 | 파일럿 재리뷰 후 배치 |

작업 항목:

- [x] CLAUDE.md 문체 가이드 2차 개정 (자문자답 금지, 화자 개입 금지, 극적 동사 치환표, 어휘 치환표, 두괄식과 접속 명시, 수치 표기, 용어 단일 표기와 병기 규칙)
- [x] CLAUDE.md 언어 정책 절에 번역어 병기 규칙 반영
- [x] glossary-physical-ai.md 개정 (demonstration을 시연 데이터로, instruction 행 신설, 표기 원칙에 병기 규칙)
- [x] lint_terms.py에 라틴 괄호 병기 마스킹 추가
- [x] write-wiki 스킬 v2.1 (병기 규칙, 예시 3쌍 교체, 자체 검토 체크리스트 13항목)
- [x] lint_style.py 확장 (자문자답 error, 화자 개입 error, 금지 어휘 warning, k 표기 warning, 병기 괄호 마스킹)
- [x] 파일럿 3편 기술문서체로 재작성 (본문 7,852 / 7,712 / 3,905자, lint 0건, 금지 어휘 잔존 0건)
- [x] sources/brohan-2022-rt-1 잔여 위반 정리 (단위 표기, 실+명사 조어, k 표기)
- [x] index.md 파일럿 항목 재점검
- [x] 사용자 재리뷰 (2026-09-05 Phase 4 착수 지시로 승인 처리)

### Phase 4. 배치 재작성 (나머지 73편)

대상은 `wiki/physical-ai/` 76편 중 파일럿 3편을 제외한 73편이다. 배치가 큰 항목은 5~6편 단위 하위 배치로 나누고, 하위 배치 하나를 완료할 때마다 계획서를 갱신하고 커밋과 푸시를 수행한다. 각 페이지는 subagent 하나가 전담하며 sources와 raw를 다시 읽어 교재식으로 재구성한다.

착수 시점 계량 기준선 (2026-09-05): 76개 파일, lint_style error 1,440건, warning 246건, 위반 파일 73개.

#### 배치 0. 사전 정비

- [x] raw_path 절대경로 정리 (wiki 66개, sources 67개 등 211개 파일의 맥 절대경로를 저장소 상대경로로 통일, 427개 raw_path 실존 검증 완료)

#### 배치 1. VLA primer 시리즈 (jo-2026 계열 8편)

- [x] 1a: jo-2026-act, jo-2026-rt-2, jo-2026-openvla, jo-2026-smolvla (본문 5,651→14,103 / 4,686→10,957 / 6,313→14,117 / 6,542→15,427자, 표 0개→11/5/7/15개, frontmatter figures를 curated만 남겨 축소, lint 0건)
- [ ] 1b: jo-2026-groot-n1, jo-2026-groot-n1-5, jo-2026-pi-0-6, jo-2026-wall-oss

#### 배치 2. RT, OpenVLA, π 계열 (20편)

- [ ] 2a RT와 OXE, ACT: brohan-2023-rt-2, open-x-embodiment-2023, kim-2024-openvla, zhao-2023-act, shukor-2025-smolvla
- [ ] 2b π 논문: black-2024-pi0, black-2025-pi05, ai-2026-pi07, amin-2025-pistar06, physical-intelligence-openpi
- [ ] 2c Physical Intelligence 공식 article 4편
- [ ] 2d WALL-OSS 3편, Helix 2편, gen-1.5 1편

#### 배치 3. NVIDIA GR00T, Cosmos, RoboCasa (13편)

- [ ] 3a GR00T: nvidia-2025-gr00t-n1, gr00t-n1-5, nvidia-isaac-gr00t, nvlabs-gr00t-wholebodycontrol, nvidia-2025-accelerate
- [ ] 3b Cosmos와 GEAR: nvidia-2025-cosmos, luo-2025-sonic, nvlabs-2026-gear-sonic-project-page, 9bow-2026-physics-aware
- [ ] 3c RoboCasa: nasiriany-2024-robocasa, nasiriany-2026-robocasa365, robocasa-2026-project-page, robocasa-robocasa

#### 배치 4. survey (9편)

- [ ] 4a: xu-2025-anatomy, kawaharazuka-2025, sa-2026, cui-2025-openhelix, zhang-2026-survey-of-physical-ai
- [ ] 4b: li-2025-world-survey, hou-2026-world-model, liu-2025-generative-physical-ai, zhang-2024-vln

#### 배치 5. SLAM, Nav2, repo (14편)

- [ ] 5a FAST-LIO 5편: xu-2020, xu-2021, airlab-2024, irasc-2024, taeyoung-2022
- [ ] 5b Nav2 4편: nav2-2026-official-documentation, lionhong-2023, yhoons-2024, ros-navigation-navigation2
- [ ] 5c repo와 awesome 5편: huggingface-lerobot, bytedance-gr-1, keon-awesome, natnew-awesome, openhelix-robot-awesome

#### 배치 6. 기타 article과 논문 (9편)

- [ ] 6a article 5편: engiuniverse 2편, learnopencv-2025, kim-2026-rfm part-1, part-2
- [ ] 6b 논문 4편: lu-2026-aspire, reuss-2026, wu-2023-unleashing, zhai-2025-igniting

#### 용어집 갱신 대기 (배치 진행 중 누적, 사용자 승인 필요)

subagent가 재작성 중 발견한 표기 불일치와 미등재 용어다. 승인 시 `wiki/overviews/glossary-physical-ai.md`에 반영한다.

| 항목 | 현황 | 제안 |
|---|---|---|
| `latent` 행 예문 자기모순 | 예문 "latent는 관측되지 않는 내부 표현 공간"의 "관측"이 같은 용어집 `observation` 행의 금지 표기라 lint_terms 경고를 유발한다 | 예문을 "latent는 겉으로 드러나지 않는 모델 내부의 표현 공간을 가리킨다"로 교체 (버그 수정) |
| temporal ensembling | 미등재. 저장소에 Temporal Ensembling 24회, temporal ensemble 14회, temporal ensembling 5회, Temporal ensemble 1회로 4종 혼재 | 원어 canonical `temporal ensembling`으로 고정 |
| compounding error | 미등재. 21회 사용, 표기는 이미 일관 | 원어 canonical로 등재 |
| open-loop / closed-loop | 미등재. closed-loop 52회, open-loop 28회, 번역어 "폐루프" 6회 혼재 | 원어 canonical, "폐루프"와 "개루프"를 금지 표기로 |
| asynchronous inference | 미등재. shukor-2025-smolvla는 원어, cui-2025-openhelix는 "비동기 추론"으로 갈림 | 원어 canonical, "비동기 추론"을 금지 표기로 |
| emergent capability | 미등재 | 원어 canonical (원문의 "창발 능력" 병기는 wiki에서 쓰지 않음) |
| layer skipping | 미등재. SmolVLA 계열 2개 파일에서 사용 | 원어 canonical |
| skill distribution | 미등재 | 원어 canonical (선택) |
| visual token reduction | 미등재 | 원어 canonical (선택) |

#### 마무리 항목

- [ ] 얇은 논문 sources 재추출 보강 (12k 상한 피해: xu-2020, xu-2021, nasiriany-2024-robocasa, brohan-2023-rt-2)
- [ ] index.md physical-ai 항목 전체 축소 (1~2문장, 200자 이내)
- [ ] wiki/overviews/physical-ai-overview.md 정합 갱신

### Phase 5. 검증과 마무리

- [ ] 개선 전후 계량 대비 기록 (중간점 1,801에서 0, em dash 702에서 0, 표 0개 페이지 45에서 소수, wiki가 sources보다 얇은 69건에서 0건 목표)
- [ ] lint_terms.py와 lint_style.py 전체 통과
- [ ] 자동 메모리에 새 문체 정책 기록
- [ ] 후속 과제 기록 (llms, agents 등 다른 카테고리 확산)

## 5. 후속 과제 (이번 범위 밖)

- llms, agents, database 등 다른 카테고리 페이지에 같은 기준 적용
- 기존 sources 전체의 문체 소급 정비 (이번에는 physical-ai 재작성에 필요한 것만)
- overview 페이지 전반의 study_path 연계 점검
