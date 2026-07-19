---
title: "PaperBanana — Automated Academic Illustration for AI Scientists"
type: repo
year: 2026
category: agents
raw_path: raw/repos/llmsresearch-paperbanana.md
raw_filename: "llmsresearch-paperbanana.md"
source_collection: external
org: "llmsresearch"
repo: "paperbanana"
url: "https://github.com/llmsresearch/paperbanana"
license: "MIT"
tags: [multi-agent, vlm, image-generation, academic-diagram, matplotlib, mcp-server, agentic-pipeline, vlm-as-judge]
---

## 한 줄 요약 (One-line Summary)

논문 속 방법론 설명을 7개 전문화 에이전트가 이어받아 출판 품질의 다이어그램과 통계 플롯으로 완성해주는 오픈소스 프레임워크.

## 1. 자료 정보 (Document Information)

PaperBanana는 arXiv:2601.23265 논문 "PaperBanana: Automating Academic Illustration for AI Scientists"(Zhu, Meng, Song, Wei, Li, Pfister, Yoon 저, 2026)를 커뮤니티가 재구현한 비공식 오픈소스 프로젝트다. Google Research나 원저자와는 무관하다. 논문 공개본을 보고 독자적으로 구현했다고 README에서 명시한다. MIT 라이선스로 배포되고 Python 3.10 이상을 요구한다. PyPI 패키지(`pip install paperbanana`)와 소스 설치, Docker 이미지를 모두 지원한다.

## 2. 주요 기여 (Key Contributions)

가장 눈에 띄는 부분은 텍스트 방법론 설명 하나만 주면 다이어그램 생성부터 비평·수정까지 알아서 돌아가는 파이프라인 구조다. 여기에 OpenAI(GPT-5.2 + GPT-Image-1.5), Azure OpenAI/Foundry, Google Gemini, Atlas Cloud까지 provider를 자유롭게 바꿔 끼워 비용과 품질을 상황에 맞게 조절한다.

CLI 하나로 끝나는 게 아니라 Python API, MCP 서버, Claude Code 스킬(`/generate-diagram`, `/generate-plot`, `/evaluate-diagram`)까지 같이 제공해 IDE 워크플로우에 바로 얹도록 만든 것도 특징이다. 여러 장의 그림이 필요한 논문을 위해 YAML/JSON 매니페스트 기반 배치 생성, 여러 패널을 하나로 합치는 composite 기능, 논문 전체를 파싱해 figure 패키지를 통째로 뽑아주는 `orchestrate` 명령까지 갖췄다. matplotlib 코드를 VLM이 직접 생성하는 방식의 통계 플롯 기능은 이미지 생성 provider 없이도 동작해 비용 부담이 적다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

파이프라인은 크게 두 단계로 나뉜다. 먼저 선택적으로 실행되는 Phase 0(입력 최적화, `--optimize`)에서 Input Optimizer가 두 개의 VLM 호출을 병렬로 돌린다. 하나는 원문 방법론 텍스트를 컴포넌트·흐름·그룹·입출력 단위로 구조화하는 Context Enricher, 다른 하나는 애매한 caption을 명확한 시각 스펙으로 다듬는 Caption Sharpener다.

Phase 1(Linear Planning)에서는 Retriever가 에이전트/추론, 비전/지각, 생성/학습, 과학/응용 네 영역에 걸친 13개의 검증된 참조 다이어그램 중 가장 관련 있는 예시를 골라온다. 이어 Planner가 in-context learning으로 목표 다이어그램의 상세 텍스트 설명을 생성하고 Stylist가 NeurIPS 스타일 가이드라인(색상 팔레트·레이아웃·타이포그래피)에 맞춰 다듬는다.

Phase 2(Iterative Refinement)는 Visualizer가 설명을 이미지로 렌더링하면 Critic이 원본 컨텍스트와 대조해 문제점을 지적하고 수정된 설명을 내놓는 식으로 반복된다. 기본은 3회 반복이지만 `--auto` 플래그를 주면 Critic이 만족할 때까지(안전장치로 `--max-iterations` 상한) 계속 돌 수 있다. venue 스타일 팩(neurips, icml, acl, ieee 기본 제공, 사용자 정의 팩도 `~/.config/paperbanana/venues/`에 추가 가능)으로 학회별 그림 스타일을 통일할 수 있다. `polish` 명령은 기존에 만들어둔 그림을 스타일 가이드에 맞춰 최대 10개의 개선안을 제안하고 직접 적용해준다.

VLM과 이미지 생성 provider는 각각 독립적으로 지정할 수 있다. 기본값은 VLM에 OpenAI `gpt-5.2`, 이미지 생성에 `gpt-image-1.5`이고 Atlas Cloud(`deepseek-ai/DeepSeek-V3-0324` 등 300개 이상 모델 풀), Google Gemini(`gemini-2.5-flash`, 이미지당 $0.134), OpenRouter까지 폭넓게 지원한다. Azure OpenAI나 Gemini 호환 게이트웨이는 base URL만 바꿔주면 자동으로 인식된다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README 자체는 정량적 벤치마크 수치를 담고 있지 않다. 다만 `evaluate` 명령으로 VLM-as-a-Judge 방식의 비교 평가 기능을 제공한다. 생성된 다이어그램을 사람이 만든 참조 다이어그램과 견준다. 채점은 원 논문의 계층적 집계 방식을 따라 Faithfulness·Readability를 1차 지표로, Conciseness·Aesthetics를 2차 지표로 매긴다. 평가용 참조 데이터셋인 PaperBananaBench(~254MB)는 GitHub 릴리스 미러로 배포되고 SHA256 체크섬으로 무결성을 검증한다. 원 데이터셋 저자의 2026-03-22 개정본을 그대로 추적한다고 밝힌다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

README에 명시된 한계나 로드맵 섹션은 없다. 다만 구조적으로 몇 가지 제약이 읽힌다. `polish` 명령은 이미지 편집을 지원하는 provider(Google Gemini 이미지 모델)가 필요해 모든 provider 조합에서 쓸 수 있는 기능은 아니다. 이 프로젝트는 원 논문의 비공식 재구현임을 여러 차례 강조한다. 원 시스템과 세부 동작이 다를 수 있으니 사용자가 이를 감안해야 한다.

## 6. 관련 연구 (Related Work)

원 논문은 arXiv:2601.23265 "PaperBanana: Automating Academic Illustration for AI Scientists"(Zhu et al., 2026)이다. 평가용 참조 데이터셋 PaperBananaBench은 Hugging Face(`dwzhu/PaperBananaBench`)에 별도로 공개되어 있다.

## 7. 용어집 (Glossary)

- **VLM (Vision-Language Model)**: 이미지와 텍스트를 함께 이해·생성하는 멀티모달 모델. 이 프로젝트에서는 플래닝·비평·플롯 코드 생성에 쓰인다.
- **VLM-as-a-Judge**: VLM을 평가자로 활용해 생성물의 품질을 채점하는 방식.
- **Venue style pack**: NeurIPS·ICML·ACL·IEEE 등 학회별 그림 스타일 가이드를 묶은 디렉터리 단위 설정.
- **Composite figure**: 여러 개별 패널 이미지를 `(a)`, `(b)`, `(c)` 라벨과 함께 하나의 그림으로 합친 것.
- **Orchestrate**: 논문 전체를 파싱해 여러 방법론 다이어그램과 플롯을 한 번에 계획·생성하는 명령.
