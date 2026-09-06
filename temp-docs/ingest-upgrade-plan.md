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
- [x] 1b: jo-2026-groot-n1, jo-2026-groot-n1-5, jo-2026-pi-0-6, jo-2026-wall-oss (본문 7,736→11,953 / 8,161→14,595 / 4,337→11,233 / 4,214→11,832자, 표 0개→11/11/5/9개, lint 0건). 부수 수정: sources/jo-2026-pi-0-6이 원문 결론 절을 "제목만 있고 본문이 비어 있다"고 잘못 기록한 것을 raw 대조로 바로잡음

#### 배치 2. RT, OpenVLA, π 계열 (20편)

- [x] 2a RT와 OXE, ACT: brohan-2023-rt-2, open-x-embodiment-2023, kim-2024-openvla, zhao-2023-act, shukor-2025-smolvla (본문 7,135→15,580 / 4,577→8,877 / 9,055→20,934 / 7,492→17,628 / 8,963→18,008자, 표 0~1개→8/5/14/12/15개, sources 문체 정비 동반, lint 0건). brohan-2023-rt-2는 PDF 40k 재추출로 sources를 8,948→15,086자로 보강해 "얇은 논문 sources" 항목을 함께 해소했다
- [x] 2b π 논문: black-2024-pi0, black-2025-pi05, ai-2026-pi07, amin-2025-pistar06, physical-intelligence-openpi (본문 10,213→18,502 / 10,088→16,685 / 8,409→20,267 / 9,517→16,391 / 5,345→10,580자, 표 0~2개→9/9/12/9/6개, sources 문체 정비 동반, lint 0건). 부수 수정: openpi에서 근거 없는 수치(off-board 지연 13ms)를 π0 논문 페이지와 대조해 삭제, π0.5에서 원문이 쓰지 않는 embodied VQA 표현을 원문 서술로 환원, 캡션 안 π*0.6의 별표가 italic 마커를 조기에 닫는 문제를 이스케이프로 처리
- [x] 2c Physical Intelligence 공식 article 4편 (본문 4,116→10,290 / 4,131→9,520 / 3,425→9,728 / 2,959→8,989자, 표 0~2개→8/6/5/5개, sources 문체 정비 동반, lint 0건). 각 편에 `## 논문 페이지와의 역할 분담` 절을 두어 블로그는 발표 맥락과 시연을, 논문 페이지는 아키텍처와 실험 세부를 담당하도록 경계를 명시했다
- [x] 2d WALL-OSS 3편, Helix 2편, gen-1.5 1편 (본문 10,483→24,539 / 3,699→8,795 / 2,564→8,317 / 5,999→10,679 / 1,872→5,935 / 5,887→11,912자, 표 0~1개→14/6/4/5/4/4개, sources 문체 정비 동반, lint 0건). 배치 2 전체(20편) 완료

#### 배치 3. NVIDIA GR00T, Cosmos, RoboCasa (13편)

- [x] 3a GR00T: nvidia-2025-gr00t-n1, gr00t-n1-5, nvidia-isaac-gr00t, nvlabs-gr00t-wholebodycontrol, nvidia-2025-accelerate (본문 8,202→17,832 / 8,708→13,127 / 7,322→15,248 / 3,960→9,808 / 4,424→10,071자, 표 0~6개→11/10/10/6/11개, sources 문체 정비 동반, lint 0건). accelerate 페이지는 기존에 이미지 임베드로만 있던 벤치마크 3종을 본문 표로 복원했다
- [x] 3b Cosmos와 GEAR: nvidia-2025-cosmos, luo-2025-sonic, nvlabs-2026-gear-sonic-project-page, 9bow-2026-physics-aware (본문 9,791→23,948 / 7,059→20,481 / 1,637→5,818 / 3,018→14,765자, 표 0~2개→17/15/4/11개, sources 문체 정비 동반, lint 0건). Cosmos는 frontmatter 564줄에서 124줄로 축소해 저장소 최악의 비대 사례를 해소했다
- [x] 3c RoboCasa: nasiriany-2024-robocasa, nasiriany-2026-robocasa365, robocasa-2026-project-page, robocasa-robocasa (본문 7,598→20,384 / 8,027→18,456 / 2,506→6,625 / 3,838→7,216자, 표 0~1개→12/12/5/5개, sources 문체 정비 동반, lint 0건). nasiriany-2024-robocasa는 PDF 40k 재추출로 sources를 7,162→17,027자로 보강해 "얇은 논문 sources" 항목을 함께 해소했다. 배치 3 전체(13편) 완료

#### 배치 4. survey (9편)

- [x] 4a: xu-2025-anatomy, kawaharazuka-2025, sa-2026, cui-2025-openhelix, zhang-2026-survey-of-physical-ai (본문 8,672→29,241 / 8,121→24,903 / 11,120→27,212 / 10,630→21,516 / 5,625→22,906자, 표 0~46행→128/128/111/88/74행, sources 문체 정비 동반, lint 0건). zhang-2026은 sources의 절반 수준이던 압축을 해소했고, 중간점 정리 규모가 컸다 (kawaharazuka 183개, zhang 149개, sa-2026 81개)
- [x] 4b: li-2025-world-survey, hou-2026-world-model, liu-2025-generative-physical-ai, zhang-2024-vln (본문 7,364→30,137 / 13,344→42,610 / 9,885→31,533 / 4,465→28,393자, 표 행 0~27개→182/207/136/113개, sources 문체 정비 동반, lint 0건). 배치 3b에서 생겼던 역할 분담 역전(해설 14,765자 대 원 서베이 9,885자)을 1차 출처를 31,533자로 보강해 해소했다. zhang-2024는 sources의 3분의 1이던 압축을 해소했다. 배치 4 전체(9편) 완료

#### 배치 5. SLAM, Nav2, repo (14편)

- [x] 5a FAST-LIO 5편: xu-2020, xu-2021, airlab-2024, irasc-2024, taeyoung-2022 (본문 3,963→17,561 / 4,723→21,733 / 1,785→7,990 / 2,037→10,562 / 2,155→11,535자, 표 행 0개→79/108/41/32/63개, sources 문체 정비 동반, lint 0건). xu-2020(6,018→11,913자)과 xu-2021(6,971→14,705자) sources를 재추출 보강해 "얇은 논문 sources" 항목을 모두 해소했다. xu-2021의 frontmatter 비중은 66%에서 10%로 떨어졌다
- [x] 5b Nav2 4편: nav2-2026-official-documentation, lionhong-2023, yhoons-2024, ros-navigation-navigation2 (본문 2,069→9,096 / 3,753→15,757 / 2,244→8,928 / 2,482→9,322자, 표 행 0~11개→61/61/38/72개, sources 문체 정비 동반, lint 0건). 네 편이 같은 스택을 다뤄 공식 문서를 1차 출처로 두고 해설 2편은 개념과 입문, 저장소는 빌드와 패키지로 역할을 나눴다
- [x] 5c repo와 awesome 5편: huggingface-lerobot, bytedance-gr-1, keon-awesome, natnew-awesome, openhelix-robot-awesome (본문 5,415→10,876 / 2,322→7,089 / 5,522→15,225 / 4,691→10,872 / 4,080→11,657자, 표 행 0~18개→61/44/134/82/65개, sources 문체 정비 동반, lint 0건). awesome 리스트 3편은 중간점 체인으로 압축돼 있던 목록을 표로 옮겨 keon 120개, natnew 39개 중간점이 자연히 소거됐다. 배치 5 전체(14편) 완료

#### 배치 6. 기타 article과 논문 (9편)

- [x] 6a article과 video 5편: engiuniverse 2편, learnopencv-2025, kim-2026-rfm part-1, part-2 (본문 7,141→16,798 / 3,806→9,995 / 11,165→23,377 / 2,626→9,488 / 5,183→13,510자, 표 행 0~18개→64/47/91/58/66개, sources 문체 정비 동반, lint 0건)
- [x] 6b 논문 4편: lu-2026-aspire, reuss-2026, wu-2023-unleashing, zhai-2025-igniting (본문 10,137→21,470 / 9,820→29,865 / 5,982→18,014 / 7,712→21,151자, 표 행 0~8개→119/78/104/77개, sources 문체 정비 동반, lint 0건). **배치 6 전체(9편) 완료. Phase 4 재작성 73편 전량 완료.** 이 시점에 physical-ai wiki 76편과 대응 sources 76편이 모두 lint_style error 0건, lint_terms 경고 0건이다 (착수 시점 wiki error 1,440건 / 위반 파일 73개, sources error 1,567건 / 위반 파일 75개)

#### 용어집 2차 갱신 대기 (배치 3~4 누적, 마무리 단계에 일괄 반영)

배치 진행 중 발견한 미등재 용어와 표기 흔들림이다. **배치마다 등재하면 완료분을 되돌아가 고쳐야 해서 rework가 커진다.** 마무리 단계에서 한 번에 등재하고 저장소 전체를 한 번 훑는 편이 낫다고 판단해 대기시킨다. 그때까지 subagent에게는 "원어 단일 표기" 지시만 전달한다.

저장소 실측 (2026-09-06, 재작성 완료 후 physical-ai wiki + overviews + 대응 sources 범위):

| 용어 | 원어 | 번역어 | 판단 |
|---|---|---|---|
| humanoid | 213회 | 휴머노이드 95회 | **결정 필요.** 통제 태그 어휘는 `humanoid`이나 음차 "휴머노이드"도 한국어에서 표준에 가깝다. glossary-llms가 benchmark를 벤치마크(음차 정착)로 정한 선례가 있어 어느 쪽으로도 갈 수 있다. 등재 시 95건 정리 필요 |
| post-training | 194회 | 사후학습 1회 | 사실상 일관. glossary-llms에 pre-training과 fine-tuning은 있으나 post-training이 없다. 등재만 하면 됨 |
| throughput | 66회 | 처리량 30회 | 실제 흔들림. 등재 시 30건 정리 필요 |
| task progress | 62회 | 과제 진행도 1회 | 거의 일관. π 계열 평가 지표로 성공률과 구분되는 개념이라 등재 가치 있음 |
| occupancy | 55회 | 0회 | 이미 일관. 등재만 |
| embodied VQA | 51회 | 체화 VQA 1회 | 거의 일관 |
| physical prompt | 40회 | 1회 | 거의 일관 |
| Gaussian Splatting | 33회 | 2회 | 거의 일관 |
| kinematic planner | 24회 | 0회 | 이미 일관 |
| loco-manipulation | 20회 | 0회 | 이미 일관 |
| world simulator | 17회 | 월드 시뮬레이터 5회 | 흔들림. 5건 모두 9bow 한 stem에 몰려 정리 비용 낮음 |
| language coaching | 14회 | 0회 | 이미 일관 |
| pseudo-action | 9회 | 가짜 action 2회 | 반쪽 번역 2건 정리 필요 |
| reference lookahead | 6회 | 0회 | 이미 일관 |
| steerability | 4회 | 조종 가능성 5회 | 흔들림. 원어와 번역어가 비슷한 빈도 |
| dual-process theory | 4회 | 이중 처리 이론 4회 | 흔들림 |
| domain shift | 3회 | 0회 | 이미 일관 |

정리 비용이 큰 것은 `humanoid`(95건)와 `throughput`(30건) 둘뿐이고 나머지 15종은 등재만 하면 된다. `humanoid`는 canonical을 원어로 할지 음차로 할지가 정책 판단이라 사용자 결정이 필요하다.

그 밖의 후보(kinematic planner, loco-manipulation, humanoid 표기 고정, Gaussian Splatting, Material Point Method, score distillation sampling, physics-aware generation, language coaching, open-world generalization, post-training, dual-process theory, latent goal, coupling tightness, takt time, MEM, reference lookahead, data pyramid 후속분)는 아래 표에 누적해 둔다.

#### 용어집 1차 갱신 (2026-09-05 사용자 승인, 반영 완료)

subagent가 배치 1 재작성 중 발견한 표기 불일치와 미등재 용어다. 17건 전부 `wiki/overviews/glossary-physical-ai.md`에 반영해 등재 용어가 80개에서 97개, 금지 표기가 103종에서 132종이 됐다. 신규 금지 표기로 기존 파일에서 새로 잡힌 위반은 각 배치가 그 stem을 재작성할 때 함께 해소한다.

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
| weight drift | 미등재. 원문이 "가중치 편향"과 "가중치 표류"를 한 글 안에서 혼용 | 원어 canonical, 두 번역어를 금지 표기로 |
| embodied VQA | 미등재. WALL-OSS, π0.5, GR00T 계열에 반복 등장 | 원어 canonical, "체화 VQA"를 금지 표기로 |
| flow matching | 미등재. π 계열과 GR00T 계열이 공유하는 핵심 개념 | 원어 canonical, "흐름 정합"을 금지 표기로 |
| DiT | 미등재. 여러 페이지에서 이미 원어 사용 | 원어 canonical |
| data pyramid | 미등재. GR00T 계열 고유 명명 | 원어 canonical, "데이터 피라미드"를 금지 표기로 |
| steerability | 미등재. π0.7 논문 제목 용어이자 π 계열 전반에 재등장 (배치 2b 발견) | 원어 canonical, "조종 가능성", "제어 가능성"을 금지 표기로 |
| throughput | 미등재. π*0.6과 π0.7 공통 지표 (배치 2b 발견) | 원어 canonical, "처리량"을 금지 표기로 |
| task progress | 미등재. π 계열 평가 지표 표준. 이진 성공률이 아닌 부분 점수 (배치 2b 발견) | 원어 canonical, "과제 진행도"를 금지 표기로 |
| language coaching | 미등재. π0.7 논문과 발표 글이 공유하는 기법명 (배치 2c 발견) | 원어 canonical, "언어 코칭"을 금지 표기로 |
| long-horizon | **2026-09-06 등재 완료.** 원어 81회 대 번역어 51회(장기 과제 40, 장기 지평 9, 롱 호라이즌 2)로 갈려 있었다 | 원어 canonical로 등재하고 완료분 28건을 치환했다. 미완료 stem 12건은 해당 배치가 처리한다 |
| world simulator | 미등재. world model, world foundation model 행과 짝을 이룰 항목 (배치 3b 발견) | 원어 canonical, "월드 시뮬레이터", "세계 시뮬레이터"를 금지 표기로 |
| physics-aware generation (PAG) | 미등재. Liu 2025 서베이의 조직 개념, 최소 2페이지 공유 (배치 3b 발견) | 원어 canonical, "물리 인지 생성"을 금지 표기로 |
| Gaussian Splatting / Material Point Method / score distillation sampling | 미등재 (배치 3b 발견) | 원어 canonical, "가우시안 스플래팅", "물질점 방법", "점수 증류 샘플링"을 금지 표기로 |
| kinematic planner / loco-manipulation | 미등재. 저장소 내 원어 각 9회, 번역어 0회 (배치 3b 발견) | 원어 canonical |
| humanoid 표기 고정 | 원어 69회 대 "휴머노이드" 62회로 갈림. 통제 태그 어휘는 `humanoid` (배치 3b 발견) | 원어 canonical, "휴머노이드"를 금지 표기로 |
| pseudo-action | 미등재. Inverse Dynamics Model 행 설명에만 등장한다. GR00T N1과 DreamGen 계열에서 반복 (배치 3a 발견) | 원어 canonical, "가짜 action", "의사 행동"을 금지 표기로 |
| reference lookahead | 미등재. SONIC 계열 (배치 3a 발견) | 원어 canonical. 컨트롤러에 미리 제시하는 참조 모션의 길이이며 지연 측정치가 아니라는 점을 비고에 명시 |
| physical prompt / test-time training | 미등재. GEN-1.5 계열 (배치 2d 발견) | 원어 canonical, "물리 프롬프트", "테스트 시점 학습"을 금지 표기로 |
| open-world generalization | 미등재 (배치 2b 발견) | 원어 canonical, "개방형 일반화", "오픈월드 일반화"를 금지 표기로 |
| post-training | glossary-llms에 pre-training과 fine-tuning은 있으나 post-training이 없다 (배치 2b 발견) | glossary-llms에 원어 canonical로 등재, "사후학습", "후속학습"을 금지 표기로 |
| advantage / advantage conditioning | 미등재. π0.6 계열 | 원어 canonical, "어드밴티지 조건화"를 금지 표기로 |
| sparse reward / policy extraction / regularized RL | 미등재 | 원어 canonical, "희소 보상", "정책 추출", "정규화된 강화학습"을 금지 표기로 |
| static router | 미등재 | 원어 canonical, "정적 라우터"를 금지 표기로 |

#### 잔여 정비 항목 (배치와 함께 처리)

- [x] 배치 1 완료분 8편의 sources 문체 정비 (중간점 233개, em dash 117개, 금지 어휘 71건 제거, 구조와 figures 항목 100% 보존)
- [x] 파일럿 3편 sources 정비 (jo-2026-rt-1 51건, hku-mars-fast-lio 26건 치환. 헤딩 개수와 figures 항목 수 보존 확인)
- [x] `page-full.png` 임베드 정리 완료 (physical-ai 8편 전부). 전체 페이지 캡처는 도식이 아니라 레이아웃 기록이므로 curated에서 제외하고, 대신 이미지를 판독해 본문 내용을 회수하는 방식으로 처리했다
- [x] sources frontmatter figure caption 정비 (Phase 5-2에서 완료, 2026-09-06)
- [x] frontmatter 금지 기호 일괄 판단 (Phase 5-3에서 완료, 2026-09-06. authors와 author는 쉼표 전환으로 사용자 결정)
  - `title`: 원어 제목 그대로인 것은 CLAUDE.md 불변 항목(인용)이라 손대지 않는다. "LeRobot — State-of-the-art..."처럼 우리가 이름과 설명을 이어 붙인 조합만 정리 대상 후보
  - `authors`, `author`: 저자명 구분자 용도의 중간점. 쉼표 전환 여부 결정 필요
  - `license`: "MIT (code) / CC BY 4.0 (assets·datasets)" 같은 조합. 우리 문장이므로 정리 대상
- [x] CLAUDE.md 분량 목표를 산문 기준으로 개정 (2026-09-06). 총 글자 수 기준이던 목표(논문 6,000~12,000자 등)와 "표를 적극 쓰라"는 지시가 서로 당겨 subagent마다 초과를 보고하고 산문 압축에 시간을 썼다. 완료분 실측 결과 본문의 20~30%가 표 마크업이고 산문 중앙값은 논문 13,500자, article 8,643자, repo 7,668자다. 목표를 산문 기준(논문 8,000~16,000자, article 5,000~12,000자, repo 4,000~8,000자)으로 바꾸고 1차 게이트 우선을 명시했다
- [x] `wiki/assets` 자산 무결성 재조사 (2026-09-06 정정). 1차 조사에서 41건을 고아 자산으로 봤으나 `{stem}-figures/`만 탐색한 스캔의 오류였다. frontmatter의 `raw:` 필드를 정본으로 다시 조사하니 41건은 모두 정상 패턴이다 (repo 페이지의 GitHub 원격 URL 참조는 CLAUDE.md의 in-place 규약, `scripts/build_loop_diagrams.py`가 생성한 SVG는 raw 원본이 없는 것이 정상, legacy 아카이브 참조 20건은 2026-08 정밀 크롭 전환의 산물). **physical-ai 범위의 curated 자산 무결성 문제는 0건이다.** 특히 reuss-2026의 kr* 6건은 다른 stem(`9bow-2026-world-action-model-rise-figures`)의 아카이브를 재사용한 정상 참조이며 raw 파일이 모두 존재한다. 배치 6b subagent가 이 전제 오류를 잡아냈다
- [x] `lionhong-2023`의 `page-full.png` raw 부재 (Phase 5-4에서 조사 결과 전제 오류로 판명, 2026-09-06. raw 실파일 존재, wiki/assets 사본 없음, 이미 정상 상태)
- [x] `sa-2026`의 raw fig09/fig10 동일 파일 문제 (Phase 5-4에서 raw 재크롭으로 해소, 2026-09-06 사용자 결정)
- [x] `lint_terms.py` 부분 문자열 오탐 (Phase 5-5에서 완료, 2026-09-06. 예외 목록 상수 방식 구현, `계보상`만 등재. `미접지`와 `재관측`은 파생형이라 제외)
- [x] figure 크롭 품질 재검토 (Phase 5-4에서 physical-ai 범위 완료, 2026-09-06). xu-2025-anatomy fig07 재크롭, sa-2026 15건 판정 후 curated 4건 재크롭. physical-ai 밖 잔여 약 23건은 후속 과제 범위
- [x] sources `## 8. 그림 후보` 표와 `curated` 플래그의 관계 확인 (2026-09-06). 전수 조사에서 33개 파일 83건이 어긋나 정합 작업 대상으로 보였으나, CLAUDE.md를 재확인한 결과 **표의 `추천` 열은 Step 3의 LLM 추천 기록이고 `curated`는 Step 3.5의 사용자 결정이라 역할이 다르다.** 둘이 어긋나는 것이 정상이므로 정합 작업 대상이 아니다. 브리프에도 "표의 추천 열은 건드리지 말 것"으로 정정했다. 다만 표 아래 산문이 현재 큐레이션과 정면으로 모순되는 경우(예: curated인데 "임베드하지 않는다"가 남음)는 해당 문장만 고친다
- [x] sources `## 8. 그림 후보` 표의 id 정합 (Phase 5-4에서 완료, 2026-09-06. luo-2025-sonic 표를 현행 21개 id로 재작성, lint 0건)

#### 마무리 항목

- [x] sources 문체 정비 범위 확정 (2026-09-05 사용자 결정): 별도 배치를 두지 않고 각 배치 subagent가 wiki를 쓰면서 같은 stem의 sources도 함께 정리한다. 브리프 §2-B에 반영. sources의 번호 붙은 영문 병기 헤딩은 기존 규약대로 유지한다
- [x] 얇은 논문 sources 재추출 보강 완료. brohan-2023-rt-2(8,948→15,086자, 배치 2a), nasiriany-2024-robocasa(7,162→17,027자, 배치 3c), xu-2020(6,018→11,913자, 배치 5a), xu-2021(6,971→14,705자, 배치 5a). 모두 해당 wiki 재작성과 같은 작업에서 처리해 이미 쓴 페이지를 다시 손대는 일을 피했다. 해당 배치가 그 stem을 재작성할 때 함께 처리한다
- [x] index.md physical-ai 항목 전체 축소 (76개 항목 50,342자 → 14,161자, 72% 축소. 평균 661자 → 185자, 200자 초과 72개 → 0개, 구분자 `]] — ` 73개를 `]]: `로 교체, 중간점과 em dash 0건). 파일 전체는 93,564자 → 57,383자. physical-ai 절의 lint_style 위반 0건. 잔여 250건은 전부 다른 카테고리 절로 후속 과제 범위다. 부수 처리: 표시 이름(별칭)의 금지 기호 5건 정리(링크 해석에 무관), liu-2025 항목의 `lint-terms: ignore` 주석 제거(주석이 붙은 원인이던 표현이 새 설명에 없어 불필요), LeRobot policy 종수를 wiki 값 22종으로 정정
- [x] wiki/overviews/physical-ai-overview.md 정합 갱신 (본문 14,673→23,773자, 표 행 50→93개, 중간점 140개와 em dash 38개 전량 제거, lint 0건). **커버리지 43편 → 76편(100%)**. 누락 33편을 무작정 나열하지 않고 서사 구조 안에 배치했고, 계열이 겹치는 자료는 역할 대응표로 묶었다 (π 계열 세대별, GR00T 세대별, 한국어 primer 9편 매핑, 서베이 10편 렌즈 비교). study_path 11개 항목과 prereq 10개는 유지하고 본문 `## 학습 경로` A 트랙을 frontmatter와 11단계로 1:1 맞췄다. 부수 수정: index.md의 overview 항목이 "65개"로 낡고 854자였던 것을 173자로 축소하며 76편으로 갱신

#### Phase 4 완료 계량 (2026-09-06)

`wiki/physical-ai/` 76편 기준. 착수 시점 값은 이 문서 2절의 전수 조사 결과다.

| 지표 | 착수 | 완료 |
|---|---|---|
| lint_style error | 1,440건 | 0건 |
| lint_terms 경고 | 246건 | 0건 |
| 위반 파일 | 73개 / 76 | 0개 |
| 중간점(본문) | 1,801개 | 12개 (전부 수식의 곱셈 기호) |
| em dash(본문) | 702개 | 0개 |
| 표 0개 페이지 | 45개 | 0개 |
| wiki가 sources보다 얇은 페이지 | 69개 | 1개 (아래 설명) |
| 본문 중앙값 | 5,625자 | 14,194자 |
| frontmatter 100줄 초과 | 20개 | 7개 (전부 비중 14~23%, curated figure가 많은 경우) |

대응 sources 76편도 lint_style error 1,567건에서 0건, 위반 파일 75개에서 0개가 됐다.

잔여 3건은 모두 정상 상태로 확인했다.

- **중간점 12개**: `τ·A_t`, `πθ(a | o, ℓ̂) · πθ(ℓ̂ | o, ℓ)` 처럼 수식의 곱셈 연산자다. 나열 기호가 아니며 lint도 코드 구간으로 마스킹해 통과시킨다.
- **sources보다 얇은 1건**: 파일럿 `brohan-2022-rt-1`(wiki 9,602자 대 sources 9,778자, 차이 176자). sources가 `## 8. 그림 후보` 표를 갖고 wiki는 규약상 갖지 않아 생긴 차이다. 대조 결과 sources에만 있는 실질 내용은 없다(TokenLearner 81에서 8, 9x9x512 feature map 등 모두 wiki에 있다). 수치를 맞추려 페이지를 늘리지 않았다.
- **frontmatter 100줄 초과 7편**: curated figure가 9~11개인 페이지들이다. 착수 시점 최악이 66%(xu-2021)였으나 지금은 전부 14~23%로 본문 대비 정상 비율이다.

### Phase 5. 검증과 마무리

2026-09-06 착수. 원래 체크리스트 4개에 더해, 계획서가 "마무리 단계 일괄 처리"로 미뤄둔 용어집 2차 갱신과 잔여 정비 미완료 항목을 이 Phase의 범위로 편입한다. 사용자 결정 3건 확정 (2026-09-06): humanoid는 원어 canonical로 등재하고 "휴머노이드" 95건을 치환한다, frontmatter의 authors 저자 구분자 중간점은 쉼표로 전환한다, sa-2026 fig09/fig10은 raw를 재크롭해 wiki/assets 사본과 일치시킨다.

- [x] 5-1. 용어집 2차 갱신 일괄 반영 (2026-09-06). glossary-physical-ai 신규 27개 등재(99→126개, 금지 표기 135→162종), glossary-llms에 post-training 등재(35→36개). 번역어 158건을 47개 파일에서 치환 (휴머노이드 94, 처리량 29, 물리 인지 생성 11, 제어와 조종 가능성 13, 이중 처리 이론 4 등). physical-ai 범위 lint_terms 0건, lint_style error 0건 복원. 주요 판단: 서베이 4편의 "제어 가능성"은 steerability가 아니라 controllability(생성된 미래가 명령 action을 따르는 정도)로 확인돼 별도 행으로 등재하고 구분을 비고에 명시했다. "가짜 action" 2건은 pseudo-action이 아니라 DiT 입력 noise라 문장을 다듬어 해소했다. 오탐 위험이 확실한 6개 용어(occupancy, kinematic planner 등)는 금지 표기 없이 지침만 등재했다. 잔여: pseudo action 하이픈 표기 흔들림 19건과 타 카테고리 "사후학습" 3건은 5-9 후속 과제로 기록한다
- [x] 5-2. sources frontmatter figure caption 정비 (2026-09-06). physical-ai sources 77편의 figure 항목 828개 전수 조사, 정비 대상 131건(영어 원문 52, 중간점 25, em dash 77, 중복 제거)을 12개 파일에서 133건 재작성했다. wiki 측 308개 항목은 Phase 4 재작성 때 이미 정비돼 있어 sources만 미정비 상태였고, 통일 방향은 품질이 높은 wiki 캡션을 sources로 가져오는 쪽(28건)과 신규 작성(105건)으로 처리했다. YAML 파싱 440개 파일 전체 통과, diff는 caption 줄 133건에 국한, lint 회귀 0건. 캡션 안의 영어 인용문(도식에 찍힌 지시문 원문)과 article 자료의 원문 도식 번호 접두사는 보존했다. 부수 발견: `sources/9bow-2026-world-action-model-rise.md`는 wiki 페이지가 없는 77번째 physical-ai source라 Phase 4 범위(대응 sources 76편)에서 빠져 본문에 error 5건과 warning 3건이 남아 있다. 5-7에서 정비한다
- [x] 5-3. frontmatter 금지 기호 정리 (2026-09-06). sources와 wiki 전체 frontmatter 전수 조사 후 98개 파일에서 123건 정리 (title 74, authors 22, papers_reviewed 20, license 8, author 2, institution 2, reviews_paper 2). title은 raw 원본 대조로 인용과 조합을 판정해 원문 제목 인용 23건(12개 stem)은 보존했고 조합 51건만 정리했다 (repo 이름과 GitHub 설명 조합 17건, 논문 제목 콜론을 em dash로 바꿨던 것 3건 되돌림, 원 제목에 우리 설명을 붙인 것 11건, overview와 glossary 등 자작 페이지 12건). YAML 파싱 98개 파일 통과, 변경은 frontmatter에 국한, lint 회귀 0건. 남긴 것: raw/ 내 frontmatter는 불변 규약대로 보존, 타 카테고리(physical-ai 외) sources와 wiki의 figures caption 532건은 이번 범위(physical-ai) 밖이라 5-9 후속 과제로 기록, ryancodrai-turbovec title은 근거가 약한 조합 판정이라 재검토 대상으로 표시
- [x] 5-4. figure 자산 정합 (2026-09-06). 4건 처리: (1) lionhong-2023은 전제가 사실과 달랐다. raw 실파일이 존재하고 wiki/assets에는 사본이 없으며 curated: false로 이미 원칙에 맞는 상태다. 전 저장소 감사에서 raw 실파일이 없는 figures.json 항목 0건을 확인했다. (2) sa-2026 fig09/fig10을 사용자 결정대로 raw 기준 재크롭했다 (page 13 전면 캡처 중복이던 것을 각각 Fig. 4와 Fig. 5 영역으로, 캡션 전문 포함). curated인 fig02와 fig11도 전면 캡처였던 것을 도식 영역으로 재크롭하고 wiki/assets를 raw 사본으로 갱신했다. 나머지 11건은 curated가 아닌 아카이브 후보(오탐 5건, 중복 3건, 표 2건 포함)라 판정표만 남겼다. (3) xu-2025-anatomy fig07은 상단 수식 조각 오검출이 원인으로, 도식 영역만 재크롭해 area_frac을 0.135에서 0.028로 줄였다 (curated 아님, 본문 텍스트 혼입 해소). (4) luo-2025-sonic sources의 그림 후보 표를 옛 번호(fig01~14 page-region)에서 현행 id 체계(fig01~08, figs1~5, tab01~04, tabs1~4)로 재작성하고 큐레이션 서술을 현행(6건)에 맞췄다. 주의: extract_figures.py --force는 디렉토리 전체를 재검출해 레거시 id 대응을 깨므로 쓰지 않고 검출기 좌표 재사용 방식으로 외과 재크롭했다. 무결성: 대상 77개 파일 중 11개만 변경, 나머지 md5 동일, figures.json과 YAML 유효, 임베드 깨짐 0건, lint 0건. subagent가 범위 밖 발견으로 보고한 yang-2026-skillopt와 reuss-2026 kr* 2건은 오케스트레이터 재검증 결과 모두 오판이다 (frontmatter raw: 필드가 legacy/ 경로와 9bow 아카이브를 정확히 가리키고 실파일 전부 존재. 250행에 기록된 것과 동일한 스캔 전제 오류)
- [x] 5-5. lint_terms.py 부분 문자열 오탐 개선 (2026-09-06). `SUBSTRING_EXCEPTIONS` 상수(금지 표기 → 예외 단어 목록)와 매치 위치 되감기 비교 로직을 추가했다. 예외에 걸린 매치는 건너뛰고 같은 줄의 진짜 위반은 계속 찾도록 해 "계보상 + 누적보상" 혼재 줄에서도 위반을 놓치지 않는다. 방어 코드가 실행 시작 시 죽은 항목(금지 표기를 품지 않는 예외)과 자기동일 항목(검사 무력화)을 경고 후 제외한다. 등재는 순수 오탐인 `계보상`(계보+상) 1종만 했다. 계획서가 후보로 꼽았던 `미접지`(未+접지)와 `재관측`(再+관측)은 금지 표기에 접두사가 붙은 파생형이라 스코프 안이었다면 진짜 위반이므로 예외로 넣지 않았다 (subagent 형태소 분석, 오케스트레이터 확정. 현재 두 건 모두 카테고리 스코핑으로 경고 밖이라 경고 수 불변). 검증: 저장소 전체 수정 전후 출력 동일(438개 파일, 경고 117건), 기능 테스트 통과, physical-ai 범위 0건 유지
- [ ] 5-6. 개선 전후 계량 대비 기록 (중간점 1,801에서 0, em dash 702에서 0, 표 0개 페이지 45에서 0, wiki가 sources보다 얇은 69건에서 1건 등 최종 재실측)
- [ ] 5-7. lint_terms.py와 lint_style.py 전체 통과 확인 (physical-ai 범위 0건, 타 카테고리 잔여 건수를 후속 과제 기초선으로 기록)
- [ ] 5-8. 자동 메모리에 새 문체 정책 기록
- [ ] 5-9. 후속 과제 기록 (llms, agents 등 다른 카테고리 확산)

## 5. 후속 과제 (이번 범위 밖)

- llms, agents, database 등 다른 카테고리 페이지에 같은 기준 적용
- 기존 sources 전체의 문체 소급 정비 (이번에는 physical-ai 재작성에 필요한 것만)
- overview 페이지 전반의 study_path 연계 점검
