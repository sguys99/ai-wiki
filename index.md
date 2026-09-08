# AI Wiki Index

이 파일은 `wiki/` 안의 모든 페이지를 카탈로그화한 색인이다. 자료가 추가될 때마다 해당 카테고리 섹션에 한 줄씩 추가한다.

> **참조 규칙**: 모든 응답은 `sources/`와 `wiki/`에 실재하는 자료만 인용한다. 자세한 운영 규칙은 [`CLAUDE.md`](./CLAUDE.md)의 **The Four Rules**를 참고한다.

**카탈로그 한 줄 형식 (Entry format):**

```
- [[category/stem|표시 이름]] — 한 줄 설명 (year, type)
```

예: `- [[llms/vaswani-2017-attention-is-all-you-need|Attention Is All You Need]] — Transformer 아키텍처 (2017, paper)`

---

## Database (database)

Vector DB, RAG 인프라, embedding store (pgvector, Qdrant, Weaviate 등).

- [[database/edge-2024-from-local-to-global|GraphRAG: From Local to Global]]: Microsoft의 GraphRAG 원논문. entity와 relationship으로 KG를 짓고 Leiden community 요약을 map-reduce로 합쳐 전역 답변을 낸다 (2024, paper)
- [[database/microsoft-graphrag|microsoft/graphrag (repo)]]: GraphRAG 원논문의 공개 구현체. README는 알고리즘을 문서 사이트로 위임하고 인덱싱 비용 경고와 prompt tuning 권고를 전면에 둔다. 공식 지원 제품은 아니다 (2024, repo)
- [[database/dsba-2025-graphrag-paper-review|GraphRAG Paper Review (DSBA, 김도윤)]]: GraphRAG 원논문을 다룬 한국어 발표 리뷰. 배경 개념을 먼저 세우고, 논문과 공식 코드가 어긋나는 세 지점과 평가 설계 비판을 발표자 견해로 남긴다 (2025, article)
- [[database/guo-2025-lightrag-simple-and-fast|LightRAG]]: entity와 relation을 key-value로 색인하고 질의에서 구체와 추상 키워드를 함께 뽑는 dual-level retrieval로, community 처리 없이 검색 토큰을 61만에서 100 미만으로 줄였다 (2025, paper)
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation|LeanRAG]]: 계층 KG의 상위 노드 사이에 relation을 만들어 semantic island를 없애고, seed 노드의 LCA 경로만 모아 retrieval 토큰을 46% 줄인 AAAI-26 논문 (2026, paper)
- [[database/guo-2025-rag-anything-all-in-one-rag|RAG-Anything]]: 이미지와 표와 수식을 텍스트와 같은 등급으로 다루는 multimodal RAG. dual-graph 구축과 cross-modal hybrid retrieval로 DocBench 63.4%를 기록했다 (2025, paper)
- [[database/hkuds-rag-anything|HKUDS/RAG-Anything (repo)]]: LightRAG 위에 세운 all-in-one multimodal RAG 저장소. MinerU와 Docling과 PaddleOCR로 문서를 파싱해 이미지와 표와 수식을 knowledge graph 인덱스에 함께 올린다 (2025, repo)
- [[database/9bow-2026-rag-anything-multimodal-rag-framework|RAG-Anything 한국어 소개글]]: PyTorchKR 9bow가 쓴 소개글. 소개 순서와 강조점, 설치 예제, 글 안의 수치 불일치를 정리한다 (2026, article)
- [[database/dsba-2026-paper-review-graph-based-rag|Graph-based RAG (LightRAG, LeanRAG)]]: DSBA 김도윤의 후속 세미나. graph 기반 RAG의 retrieval 패턴과 연구 흐름을 구획하고 LightRAG와 LeanRAG를 비교한다 (2026, video)
- [[database/vectifyai-pageindex|VectifyAI/PageIndex (repo)]]: PageIndex의 자체 호스팅용 공개 코드. PDF와 Markdown을 목차 트리로 만드는 CLI를 제공한다. README는 이 경로가 standard PDF parsing만 쓴다고 밝힌다 (2025, repo)
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval|Direct Corpus Interaction (DCI)]]: 임베딩과 인덱스 없이 agent가 grep과 bash로 원본 corpus를 직접 뒤지는 패러다임. 같은 backbone 대비 11.0%p 향상 (2026, paper)
- [[database/shanbhogue-2026-gemini-embedding-2-native-multimodal|Gemini Embedding 2]]: Gemini를 bidirectional attention으로 fine-tuning한 Google의 native multimodal 임베더. 텍스트와 이미지와 비디오가 한 공간에 들어간다 (2026)
- [[database/zhang-2026-your-embedding-model-is-smarter|SMART]]: 학습이 끝난 single-vector 임베더가 버리던 hidden state에 MaxSim late interaction을 더해 추가 학습 없이 multi-vector 검색 성능을 얻는다 (2026, paper)
- [[database/geeksforgeeks-2026-vectorless-rag-pageindex|Vectorless RAG: PageIndex 튜토리얼]]: PageIndex 클라우드 API와 LangChain과 Gemini로 PDF를 색인하고 질의하는 코드 10단계 입문 튜토리얼. 벤치마크 수치는 없다 (2026, article)
- [[database/zhang-2025-pageindex-vectorless-reasoning-rag|PageIndex 소개글]]: PageIndex 팀이 직접 쓴 글. vector 검색의 다섯 가지 한계를 규정하고 문서 목차를 트리로 만들어 컨텍스트에 두는 대안을 제시한다. 정량 벤치마크는 없다 (2025, article)
- [[database/sguys99-langchain-study-vectorless-rag|sguys99/langchain-study vectorless-rag]]: 기성 솔루션 없이 pymupdf4llm 파싱으로 DocumentTree를 직접 만드는 한글 학습용 구현. langgraph 에이전트가 네 단계로 트리를 내려간다 (2026, repo)
- [[database/lumer-2025-rethinking-retrieval-from-traditional-retrieval|Rethinking Retrieval (PwC)]]: SEC filing 1,200건과 150문항으로 vector 기반 agentic RAG와 hierarchical node-based RAG를 비교한 금융 실험 (2025)
- [[database/gutierrez-2025-from-rag-to-memory-non|HippoRAG 2: From RAG to Memory]]: KG에 passage 노드를 더하고 쿼리를 triple에 이어, 사실 기억과 sense-making과 associativity 세 메모리 과제를 동시에 개선한 논문 (2025, paper)
- [[database/kalane-2026-pageindex-threw-out-vector-databases|PageIndex 외부 리뷰]]: 출시 반년 뒤의 실무자 리뷰. vector RAG 실패 유형과 trade-off를 정리한다. 제목의 정확도는 PageIndex가 아니라 Mafin 2.5의 공급자 발표치다 (2026, article)
- [[database/athina-ai-rag-cookbooks|Athina AI RAG Cookbooks]]: RAG 기법 13종(advanced 8, agentic 5)을 Colab 노트북 한 개씩으로 정리한 학습용 카탈로그. 13종 전부가 LangChain과 Athina AI 평가를 공통으로 쓴다 (2024, repo)
- [[database/nirdiamant-rag-techniques|Advanced RAG Techniques (NirDiamant)]]: RAG 기법 노트북 42개를 10개 카테고리로 배열한 학습용 저장소. HyPE와 평가 4종 포함. README는 custom non-commercial license만 밝힌다 (2024, repo)
- [[database/zandieh-2025-turboquant-online-vector-quantization-with|TurboQuant]]: 무작위 회전으로 좌표 분포를 고정한 뒤 좌표별 Lloyd-Max 양자화만 적용해 학습 없이 MSE 최적에 도달하는 data-oblivious 벡터 양자화 (2025, paper)
- [[database/ryancodrai-turbovec|turbovec (repo)]]: TurboQuant 알고리즘을 Rust 코어와 Python 바인딩으로 구현한 OSS 벡터 인덱스. 학습 없는 data-oblivious 양자화로 2비트에서 약 16배 압축하고 SIMD 커널로 ARM에서 FAISS를 앞선다 (2026, repo)
- [[database/9bow-2026-turbovec-turboquant-rust-vector-index|turbovec 한국어 소개글]]: turbovec의 압축률과 속도 수치를 정리한 PyTorchKR 글. 원 저장소 및 논문과 대조해 어긋나는 값을 표로 기록했다 (2026, article)
- [[database/startrail-org-pixelrag|PixelRAG (repo)]]: 문서를 파싱하지 않고 스크린샷으로 렌더링해 이미지 자체를 검색하는 visual RAG. 위키피디아 828만 페이지 인덱스를 키 없이 쓰는 API와 Claude Code 플러그인 pixelbrowse를 함께 공개한다 (2026, repo, Apache-2.0)

## LLMs (llms)

모델 아키텍처, pre-training, fine-tuning, foundation model 논문.

- [[llms/lipman-2022-flow-matching-for-generative-modeling|Flow Matching]] — continuous normalizing flow를 시뮬레이션 없이 학습하는 방법. 목표 vector field에 신경망을 회귀시키고 conditional 구성으로 tractable하게 만든다(FM=CFM gradient 동일). diffusion을 특수 사례로 포함하며 optimal transport 경로를 쓰면 직선 경로로 더 빠른 학습·생성과 더 나은 FID를 얻는다. 이후 GR00T N1 등 로봇 policy action head의 기반 (2022, paper)
- [[llms/rombach-2022-high-resolution-image-synthesis-with-latent|LDM (Latent Diffusion, Stable Diffusion 원형)]] — diffusion을 pixel space가 아니라 미리 학습해 둔 autoencoder의 저차원 latent space에서 돌려 품질은 지키면서 학습·추론 비용을 크게 줄인 모델. 학습을 perceptual compression(autoencoder)과 semantic compression(diffusion) 두 단계로 나눈 뒤 cross-attention conditioning으로 text·layout까지 하나의 틀에서 다룬다. class-conditional ImageNet에서 LDM-4-G가 FID 3.60(400M)으로 ADM-G(4.59, 608M)를 앞서고 MS-COCO text-to-image는 FID 12.63(1.45B). 이후 Stable Diffusion으로 이어진 표준 틀이며 DiT가 이 UNet backbone을 Transformer로 교체한다. Fig 1·2·3·7·Table 3 임베드 (2022, paper)
- [[llms/peebles-2022-scalable-diffusion-models-with-transformers|DiT (Diffusion Transformers)]] — diffusion model의 U-Net backbone을 순수 Transformer로 교체. latent를 patch token으로 바꿔 처리하고, Gflops↔FID 상관 −0.93의 scaling 성질을 보여 ImageNet 256×256에서 FID 2.27 SOTA 달성. adaLN-Zero conditioning이 핵심. 이후 Stable Diffusion 3·Sora의 backbone 계보 (2022, paper)
- [[llms/mentzer-2023-finite-scalar-quantization-vq-vae-made|FSQ (VQ-VAE Made Simple)]] — VQ-VAE의 vector quantization을 각 latent 차원을 소수의 고정값으로 반올림하는 finite scalar quantization으로 대체. 보조 손실·codebook 관리 없이 사용률 100%에 이르고 MaskGIT·UViM에서 VQ와 대등 (2023, paper)
- [[llms/shumailov-2024-ununlearning-unlearning-is-not-sufficient|UnUnlearning]] — ICL 때문에 unlearning(exact 포함)만으로는 LLM 콘텐츠 규제가 불충분하다는 점을 짚은 논문 (2024, paper)
- [[llms/cai-2026-vlm3-vision-language-models|VLM3 (Native 3D Learners)]] — Qwen3-VL-4B와 SFT 위에 focal length 통일, 픽셀 reference, data mixture 세 가지만 더해 네 개의 3D 비전 task에서 SOTA를 잡은 네이티브 학습 (2026, paper)
- [[llms/9bow-2026-gpt-5-6-sol-terra-luna|OpenAI GPT-5.6 Sol·Terra·Luna 프리뷰 (9bow)]] — PyTorch Korea 9bow가 옮긴 OpenAI GPT-5.6 프리뷰 소식. 숫자=세대·천체 이름=능력 티어의 새 네이밍으로 Sol(플래그십)·Terra(균형)·Luna(경량) 3종을 가르고, 가격·Terminal-Bench 수치와 함께 미국 정부 협의형 계층 안전 스택·단계적 배포에 절반의 비중을 둔 2차 소식 글 (2026, article)
- [[llms/panfilov-2026-stealing-reasoning-traces-from-proprietary|Stealing Reasoning Traces from Proprietary LLM APIs]] — provider가 암호화해 클라이언트로 돌려주는 chain-of-thought 블록이 세션·사용자·모델을 넘어 호환된다는 점을 악용해, 강한 모델의 encrypted reasoning trace를 약한 형제 모델에 주입해 평문으로 받아낸다. distillation·secret 추출(315,320 trace에서 API 키·PII 복원)·jailbreak·prompt injection 네 벡터를 Anthropic·OpenAI·Google에 실증한 보안 논문 (2026, paper)
- [[llms/chen-2025-eagle-25-boosting-long-context-post-training|Eagle 2.5]] — NVIDIA Eagle 계열의 long-context VLM. 압축 모듈을 붙이는 대신 텍스트를 먼저 확보하고 남은 예산으로만 시각 입력을 깎는 information-first sampling(IAP·ADS), 32K→64K→128K progressive post-training, chapter 기반 story-level 주석을 넣은 Eagle-Video-110K 셋으로 512프레임 Video-MME 72.4를 낸다. GPT-4o(71.9)를 넘고 프레임을 늘릴수록 성능이 계속 오른다. GR00T N1.5의 VLM backbone (2025, paper)
- [[llms/nvlabs-eagle|NVlabs/EAGLE (repo)]] — Eagle 계열 네 세대(Eagle · Eagle 2 · Eagle 2.5 · LocateAnything)의 공식 저장소이자 model zoo. Eagle 2→GR00T N1, Eagle 2.5→N1.5, native resolution 변형→N1.6으로 이어지는 VLA backbone 채택 이력을 날짜로 기록하며, N1.7에서 Cosmos-Reason2-2B로 교체되며 계보가 끊긴다. 코드 Apache-2.0, 가중치는 비상업 research preview (2026, repo)

## Physical AI (physical-ai)

VLA, world model, robot learning, sim2real 등 물리 세계와 상호작용하는 방법.

- [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x|Open X-Embodiment / RT-X 프로젝트 페이지]]: 로봇 데이터셋 60종을 한 형식으로 합친 데이터셋과 그 위에서 다시 학습한 RT-1-X, RT-2-X를 소개하는 공식 사이트 (2023, article)
- [[physical-ai/lu-2026-aspire-agentic-skills-discovery-for|ASPIRE (NVIDIA GEAR)]]: 로봇 policy를 신경망 가중치가 아니라 코딩 에이전트가 고쳐 쓰는 Python 프로그램으로 두는 지속학습 시스템. 검증된 수정을 skill library에 쌓아 재사용한다 (2026, paper)
- [[physical-ai/li-2026-roboclaw-an-agentic-framework-for|RoboClaw (AgiBot)]]: 데이터 수집과 policy 학습과 과제 실행을 하나의 VLM 컨트롤러 아래로 합친 agentic 프레임워크. forward 동작에 inverse 복구 동작을 짝지어 사람 없이 환경을 리셋한다 (2026, paper)
- [[physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics|VLA for Robotics, Full-Stack Review (Survey)]]: 400편 넘게 인용한 VLA 종합 서베이. 아키텍처와 로봇 플랫폼, 데이터 수집, 평가를 함께 놓는다 (2025, paper)
- [[physical-ai/xu-2025-an-anatomy-of-vision-language-action-models|An Anatomy of VLA Models (Survey)]]: 285편을 인용한 VLA 서베이. perception, brain, action 3모듈로 해부하고 도전 과제 분석을 본문 절반에 둔다 (2025, paper)
- [[physical-ai/hou-2026-world-model-for-robot-learning|World Model for Robot Learning (Survey)]]: NTU MARS 주도 9개 기관의 world model 서베이. policy 결합 방식 5분류로 문헌을 가르고 실행 가능한 미래 예측을 병목으로 진단한다 (2026, paper)
- [[physical-ai/li-2025-a-comprehensive-survey-on-world|A Comprehensive Survey on World Models for Embodied AI]]: 로보틱스, 자율주행, 범용 비디오 세 분야의 world model을 공통 분류 기준으로 정리한 17페이지 서베이 (2025, paper)
- [[physical-ai/luo-2025-sonic-supersizing-motion-tracking|SONIC (NVIDIA GEAR)]]: motion tracking을 humanoid 제어의 기본 과제로 놓고 파라미터 42M, 모션 1억 프레임으로 키운 whole-body control foundation model (2025, paper)
- [[physical-ai/nvlabs-gr00t-wholebodycontrol|GR00T-WholeBodyControl (repo)]]: SONIC의 공식 구현. Isaac Lab 학습 코드, Jetson Orin용 C++/TensorRT 배포 스택, Unitree G1 체크포인트 2종이 한 저장소에 있다 (2026, repo)
- [[physical-ai/nvlabs-2026-gear-sonic-project-page|GEAR-SONIC 프로젝트 페이지]]: SONIC 공식 데모 사이트. 텍스트는 abstract뿐이고 실질 내용은 영상이라, 수치로는 판단하기 어려운 동작 품질을 육안으로 확인하는 용도다 (2026, article)
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation|GR00T N1 (NVIDIA)]]: humanoid dual-system VLA foundation model. VLM이 10Hz로 해석하고 DiT가 120Hz로 action을 내며, 데이터를 data pyramid로 쌓는다 (2025, paper)
- [[physical-ai/jo-2026-groot-n1-vla-primer|03-13. Groot N1 (모두의 로보틱스 - VLA 입문)]]: GR00T N1 논문의 한국어 입문 해설. dual-system 구조와 flow matching, data pyramid를 차례로 풀어 원 논문 앞에 두는 진입로다 (2026, article)
- [[physical-ai/jo-2026-groot-n1-5-vla-primer|03-14. Groot N1.5 (모두의 로보틱스 - VLA 입문)]]: GR00T N1.5의 한국어 입문 해설. N1 구조는 그대로 두고 FLARE 손실과 DreamGen 합성 데이터라는 변경점만 좁혀 읽는다 (2026, article)
- [[physical-ai/nvidia-2025-gr00t-n1-5-an-improved-open|GR00T N1.5 (NVIDIA GEAR Lab)]]: N1의 골격을 두고 네 군데만 손본 후속 버전의 공식 프로젝트 페이지. VLM 고정과 FLARE 손실, DreamGen 합성 데이터가 변경점이다 (2025, article)
- [[physical-ai/nvidia-isaac-gr00t|Isaac GR00T (N1.7, repo)]]: GR00T 계열 VLA의 공식 구현이자 N1.7 GA 배포처. backbone을 Cosmos-Reason2-2B로 바꾸고 relative EEF action space로 사람 영상까지 pre-training에 썼다 (2026, repo)
- [[physical-ai/nvidia-2025-accelerate-generalist-humanoid-robot-development|Isaac GR00T N1 릴리스 공지 (NVIDIA)]]: GR00T N1 공개 당일의 NVIDIA 기술 블로그. 논문에 없는 GPU 사양과 다섯 단계 절차가 실무 진입점이다 (2025, article)
- [[physical-ai/figure-ai-2025-helix-a-vision-language-action|Helix (Figure AI)]]: humanoid 상체를 자연어로 제어하는 dual-system VLA의 공식 발표문. 7B VLM과 80M Transformer를 함께 학습해 200Hz로 35-DoF를 낸다 (2025, article)
- [[physical-ai/9bow-2025-helix-generalist-humanoid-vla|Helix 한국어 소개 (9bow)]]: PyTorch 한국 사용자 모임이 Helix 발표를 옮긴 글. 원문에서 iframe에 가려 수집되지 않는 System 1과 System 2 구조도가 여기에는 실려 있다 (2025, article)
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web|RT-2 (Google DeepMind)]]: VLA라는 범주를 세운 논문. action을 텍스트 토큰으로 적어 웹 VQA와 함께 fine-tune하면 VLM을 그대로 policy로 쓸 수 있다 (2023, paper)
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model|OpenVLA (Stanford, Berkeley, TRI)]]: RT-2 계보의 첫 오픈소스 generalist VLA. 97만 개 시연 데이터로 fine-tune해 55B RT-2-X를 앞선다 (2024, paper)
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model|π0 (Physical Intelligence)]]: PaliGemma에 action expert를 붙인 3.3B VLA. action을 이산 토큰 대신 flow matching으로 내어 50Hz 제어가 된다 (2024, paper)
- [[physical-ai/shukor-2025-smolvla-a-vision-language-action-model|SmolVLA (Hugging Face)]]: π0의 구도를 450M으로 줄이고 커뮤니티 공개 데이터로 학습한 VLA. GPU 한 장 학습과 asynchronous inference로 배포 비용을 겨냥한다 (2025, paper)
- [[physical-ai/physical-intelligence-2024-our-first-generalist-policy|π0: Our First Generalist Policy (블로그)]]: π0 논문과 같은 날 나온 공식 발표문. zero-shot 과제별 점수와 무편집 데모 영상을 싣는다 (2024, article)
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with|π0.5 (Physical Intelligence)]]: π0의 후속. 규모가 아니라 학습 데이터 구성을 바꿔, 여러 원천을 한 mixture에 넣는 co-training으로 처음 보는 가정집에서 동작한다 (2025, paper)
- [[physical-ai/physical-intelligence-2025-a-vla-with-open-world|π0.5: a VLA with Open-World Generalization (블로그)]]: π0.5 논문과 같은 날 나온 공식 발표문. 논문이 그래프로만 준 언어 ablation 수치를 값으로 적는다 (2025, article)
- [[physical-ai/amin-2025-pistar06-a-vla-that-learns|π*0.6 / RECAP (Physical Intelligence)]]: 배치된 로봇의 experience와 전문가 개입을 강화학습 신호로 바꿔 학습에 반영하는 VLA. 학습 레시피 이름은 RECAP이다 (2025, paper)
- [[physical-ai/physical-intelligence-2025-a-vla-that-learns-from|π*0.6: a VLA that Learns from Experience (블로그)]]: π*0.6 논문과 같은 날 나온 공식 발표문. 논문에 없는 배치 현장의 실행 시간과 규모를 적는다 (2025, article)
- [[physical-ai/ai-2026-pi07-a-steerable-generalist-robotic|π0.7 (Physical Intelligence)]]: prompt에 episode의 속도와 품질, 실수 여부를 적어 걸러낼 데이터까지 학습에 쓰는 5B VLA. 조합적 일반화를 보인다 (2026, paper)
- [[physical-ai/physical-intelligence-2026-a-steerable-model-with-emergent|π0.7: a Steerable Model with Emergent Capabilities (블로그)]]: π0.7 논문과 같은 날 나온 공식 발표문. 영상 시연과 회사가 강조한 메시지를 담는다 (2026, article)
- [[physical-ai/physical-intelligence-openpi|openpi (Physical Intelligence, repo)]]: π0 계열의 공식 구현. Apache-2.0으로 base와 플랫폼별 checkpoint를 열고, RTX 4090 한 장에서 LoRA fine-tuning이 된다 (2025, repo)
- [[physical-ai/generalist-ai-2026-gen-1-5-embodied-foundation|GEN-1.5 (Generalist AI, 블로그)]]: 시연 하나를 context window에 넣는 것만으로 새 조작 과제를 하는 로봇 foundation model 발표문. 설계 없이 나타난 능력이라고 본다 (2026, article)
- [[physical-ai/zhang-2024-vision-and-language-navigation-today|Vision-and-Language Navigation Today and Tomorrow (Survey)]]: LAW framework로 VLN 연구를 top-down 정리한 서베이. 벤치마크 24종 분류표를 싣는다 (2024, paper)
- [[physical-ai/sa-2026-vision-language-action-models-for|VLA for Bimanual Manipulation (Survey)]]: VLA 문헌 200편 이상을 양팔 manipulation 렌즈로 정리한 서베이. 성패를 가르는 변수는 두 팔의 결합도라고 본다 (2026, paper)
- [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world|RT-1 (Robotics Transformer)]]: 13만 개 시연 데이터로 학습한 35M Transformer 조작 policy. 대규모 데이터와 실시간 제어를 함께 실증한 VLA 계보의 출발점 (2022, paper)
- [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation|ALOHA + ACT (Learning Fine-Grained Bimanual Manipulation)]]: 저가 양팔 teleoperation 장치와 action chunking 알고리즘 ACT를 낸 논문 (2023, paper)
- [[physical-ai/jo-2026-rt-1-vla-primer|03-03. RT-1 (모두의 로보틱스 - VLA 입문)]]: RT-1 논문의 한국어 입문 해설. 기초 개념부터 아키텍처, 결과, ablation까지 순서대로 설명한다. 원 논문 페이지를 읽기 전 입문용으로 권장 (2026, article)
- [[physical-ai/jo-2026-rt-2-vla-primer|03-04. RT-2 (모두의 로보틱스 - VLA 입문)]]: RT-2 논문의 한국어 입문 해설(03-04편). action을 언어처럼 다루는 발상부터 일반화 결과와 ablation까지 짚는다. 원 논문 페이지를 읽기 전 입문용 (2026, article)
- [[physical-ai/jo-2026-act-vla-primer|03-05. ACT (모두의 로보틱스 - VLA 입문)]]: ACT 논문의 한국어 입문 해설(03-05편). action chunking, temporal ensembling, CVAE 세 장치를 차례로 풀이한다. 원 논문 페이지를 읽기 전 입문용 (2026, article)
- [[physical-ai/jo-2026-openvla-vla-primer|03-06. OpenVLA (모두의 로보틱스 - VLA 입문)]]: OpenVLA 논문의 한국어 입문 해설(03-06편). RT-2가 연 방향을 7B 오픈소스로 다시 구현한 과정을 따라간다. 원 논문 페이지를 읽기 전 입문용 (2026, article)
- [[physical-ai/jo-2026-pi-0-6-vla-primer|03-09. Pi-0.6 (모두의 로보틱스 - VLA 입문)]]: π*0.6 논문의 한국어 입문 해설. 강화학습 기초부터 RECAP 수식 유도까지 단계별로 설명하므로 원 논문 페이지를 읽기 전 입문용으로 권장 (2026, article)
- [[physical-ai/jo-2026-smolvla-vla-primer|03-10. SmolVLA (모두의 로보틱스 - VLA 입문)]]: SmolVLA 논문의 한국어 입문 해설. 설계 선택 하나를 설명한 직후 근거가 되는 ablation 표를 붙이는 편집이 특징이다 (2026, article)
- [[physical-ai/kim-2026-silicon-valley-rfm-part-1|실리콘밸리 RFM 기술 및 현황 1편 (Kim & Kim)]]: RFM 스타트업이 학습 전 과정을 직접 수행하는 이유를 현지 시각에서 정리한 LinkedIn 연재 1편. 논문 자료를 보완하는 산업 구조 레퍼런스 (2026, article)
- [[physical-ai/kim-2026-silicon-valley-rfm-part-2|실리콘밸리 RFM 기술 및 현황 2편 (Kim & Kim)]]: VLM에서 VLA로 이어지는 개념을 LLM 원리에서 풀어낸 LinkedIn 연재 2편. Single Model과 Dual System 두 구조를 대비한다 (2026, article)
- [[physical-ai/engiuniverse-2025-14-key-physical-ai-papers|Physical AI 핵심 논문 14편 리뷰 (엥지유니버스)]]: RT-1 이후 3년의 VLA 연구를 네 단계로 배열한 한국어 27분 총결산 영상. 성능 비교가 아니라 계보를 훑는 지도로 쓴다 (2025, video)
- [[physical-ai/learnopencv-2025-vision-language-action-models-vla|VLA & Policies for Robots (LearnOpenCV)]]: RT-2부터 Gemini Robotics까지 아홉 모델을 계보순으로 소개하고 네 모델은 실행 코드까지 붙인 튜토리얼 (2025, article)
- [[physical-ai/engiuniverse-2025-rt1-rt2-robotics-transformer-review|구글 RT-1, RT-2 핵심 논문 리뷰 (엥지유니버스)]]: RT-1과 RT-2 두 논문의 아키텍처를 텐서 크기를 대입해 대조한 한국어 20분 영상. 벤치마크 수치는 다루지 않는다 (2025, video)
- [[physical-ai/natnew-awesome-physical-ai|Awesome Physical AI (natnew, repo)]]: Physical AI 도구, 데이터, 논문, 규제 문서 353개를 14개 카테고리로 모은 큐레이션 색인. 개별 자료로 가는 지도로 쓰며 라이선스는 MIT다 (2026, repo)
- [[physical-ai/keon-awesome-physical-ai|Awesome Physical AI (keon)]]: Physical AI 논문과 리소스 485개를 16개 섹션으로 배열한 CC0 큐레이션 목록. 논문을 한 카테고리에만 넣는 규칙이라 방법 계보가 배치로 드러난다 (2026, repo)
- [[physical-ai/acensia-long-horizon-papers|long-horizon-papers (acensia, repo)]]: long-horizon 논문 52편을 LLM agent, VLM planning, VLA manipulation으로 나눈 큐레이션 저장소. VLA는 실패를 막는 네 전략과 recovery까지 다섯 폴더로 배열한다 (2026, repo)
- [[physical-ai/liu-2025-generative-physical-ai-in-vision|Generative Physical AI in Vision: A Survey]]: 생성 모델이 물리 법칙을 지키게 만드는 연구를 physics-aware generation이라는 이름으로 묶은 서베이 (2025, paper)
- [[physical-ai/9bow-2026-physics-aware-generation-world-simulator|물리를 이해하는 생성 모델과 월드 시뮬레이터 (9bow)]]: 위 Liu 2025 서베이를 한글로 풀어 쓴 PyTorch KR 해설. 논문 페이지로 넘어가기 전 진입로로 쓴다 (2026, article)
- [[physical-ai/zhang-2026-a-survey-of-physical-ai|A Survey of Physical AI (ChatGPT → World Models → Embodied Agents)]]: LLM의 world knowledge에서 출발해 여섯 층 로드맵으로 문헌을 재배치한 preprint 서베이 (2026, paper)
- [[physical-ai/reuss-2026-pretrained-to-imagine-fine-tuned|Pretrained to Imagine, Fine-Tuned to Act: The Rise of World-Action Models]]: 대규모 video pre-training에서 출발하는 policy 계열 지형도 (2026, article)
- [[physical-ai/9bow-2026-world-action-model-rise|World Action Model의 부상 (9bow)]]: Reuss 2026 지형도의 PyTorch KR 한국어판. 용어 풀이 상자와 원문 도식 23장을 함께 싣는다 (2026, article)
- [[physical-ai/huggingface-lerobot|LeRobot (Hugging Face, repo)]]: 하드웨어 제어부터 데이터 수집, policy 학습, 평가까지 담은 PyTorch 로봇 학습 프레임워크. policy 22종이 같은 데이터 형식과 CLI 위에서 동작하며 라이선스는 Apache-2.0이다 (2026, repo)
- [[physical-ai/noietch-eva-client|EVA-Client (repo)]]: 실제 로봇의 배포와 평가와 데이터 수집을 브라우저 콘솔 하나로 합친 Apache-2.0 스택. 설정 파일 하나로 transport와 policy backend와 추론 전략을 조합한다 (2026, repo)
- [[physical-ai/nasiriany-2024-robocasa-large-scale-simulation-of-everyday|RoboCasa (UT Austin, NVIDIA, RSS 2024)]]: 주방 장면 120개와 과제 100종을 담은 로봇 시뮬레이션 프레임워크. 시뮬레이션 데이터로 실제 로봇 성능을 올렸다 (2024, paper)
- [[physical-ai/nasiriany-2026-robocasa365-a-large-scale-simulation-framework|RoboCasa365 (UT Austin, NVIDIA, ICLR 2026)]]: 과제 365종과 2,200시간 데이터로 VLA 4종을 같은 조건에서 비교한 후속 벤치마크 (2026, paper)
- [[physical-ai/robocasa-robocasa|robocasa (repo)]]: RoboCasa와 RoboCasa365 공식 구현으로 코드는 MIT, asset은 CC BY 4.0이다. 설치와 첫 실행까지만 담고 과제 목록과 학습 절차는 문서 사이트로 넘긴다 (2026, repo)
- [[physical-ai/robocasa-2026-robocasa365-project-page|RoboCasa 프로젝트 페이지 (robocasa.ai)]]: 논문 두 편과 코드, 문서, leaderboard 링크를 한 페이지에 모은 공식 홈. 프로젝트 현황을 확인하는 진입로로 쓴다 (2026, article)
- [[physical-ai/wang-2026-chain-of-interaction-benchmark-coin|COIN (BIGAI, USTC)]]: 환경을 직접 건드려 정보를 얻고 계획을 고치는 interactive reasoning을 재는 manipulation 벤치마크. 과제 90개에서 사람은 40%, 최고 모델은 3.26%에 그친다 (2026, paper)
- [[physical-ai/liu-2026-libero-recover-beyond-task-success-towards|LIBERO-Recover (DUT, Beta Infinity)]]: VLA와 WAM이 실제 실행에서 낸 실패 2,117건을 네 단계 난이도로 정리한 복구 벤치마크. LIBERO에서 90%대를 내던 모델 6종이 여기서는 5.8%에서 34.0%에 그친다 (2026, paper)
- [[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial|FAST-LIO (HKU MaRS)]]: LiDAR와 IMU를 iterated EKF로 융합하는 LiDAR-inertial odometry. Kalman gain 역행렬을 상태 차원으로 옮겨 실시간으로 동작한다 (2020, paper)
- [[physical-ai/hku-mars-fast-lio|FAST_LIO (hku-mars, repo)]]: FAST-LIO 계열 공식 구현. direct 방식과 ikd-Tree 기반 LiDAR-inertial odometry의 ROS 패키지, GPL-2.0 (2020, repo)
- [[physical-ai/taeyoung-2022-fast-lio-paper-review|FAST-LIO 리뷰 (Taeyoung's Blog)]]: FAST-LIO 논문의 수식 전개를 단계별로 풀어 쓴 한국어 리뷰. iterated error state Kalman filter의 update 절차를 논문 절과 짝지어 해설한다 (2022, article)
- [[physical-ai/airlab-2024-fast-lio-a-fast-robust|FAST-LIO 발표 영상 (AIRLab)]]: FAST-LIO를 12분에 훑는 한국어 세미나 발표. SLAM 구도에서 LiDAR-inertial odometry의 자리를 잡아 주는 수식 없는 입문 자료 (2024, video)
- [[physical-ai/irasc-2024-faster-lio-lightweight-tightly-coupled|Faster-LIO 발표 영상 (iRASC Lab)]]: FAST-LIO2의 ikd-Tree를 해시 기반 voxel 구조 iVox로 바꾼 Faster-LIO의 한국어 해설. 원 논문 PDF가 없어 유일한 근거다 (2024, video)
- [[physical-ai/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry|FAST-LIO2 (HKU MaRS)]]: feature 추출을 없앤 direct 방식과 증분 k-d tree인 ikd-Tree를 결합한 LiDAR-inertial odometry. 최대 100Hz로 동작한다 (2021, paper)
- [[physical-ai/yhoons-2024-ros2-nav2-intro|[ROS2] Nav2란? (yhoons)]]: Nav2 입문 한국어 블로그. 핵심 개념 다섯 가지와 서버 구성을 한 화면 분량으로 정리한 첫 진입 자료 (2024, article)
- [[physical-ai/lionhong-2023-nav2-core-concepts|Nav2 주요 개념 정리 (lionhong)]]: 공식 Navigation Concepts 문서를 한국어로 재구성한 개념 해설. ROS 2 기반 개념부터 Behavior Tree와 costmap까지 쌓아 올린다 (2023, article)
- [[physical-ai/nav2-2026-official-documentation|Nav2 공식 문서 랜딩 (docs.nav2.org)]]: Nav2 공식 문서 rolling 버전 랜딩 페이지. 프로젝트 자기 정의와 제공 기능, ROS 2 배포판별 지원 상태를 담은 1차 출처 (2026, article)
- [[physical-ai/ros-navigation-navigation2|navigation2 (ros-navigation)]]: Nav2 공식 소스 저장소 README. 40개 가까운 nav2_* 패키지의 빌드 상태 표와 인용 논문 5편의 학술 계보가 실질 내용이다 (2018, repo)
- [[physical-ai/iovino-2024-comparison-between-behavior-trees-and|Behavior Tree와 FSM 비교 (ABB, ETH, KTH)]]: mobile manipulation 과제에서 두 policy 표현을 모듈성, 반응성, 가독성으로 비교한 논문. 로봇 동작은 같지만 과제가 커질수록 BT의 편집 비용이 낮다 (2024, paper)
- [[physical-ai/suzuki-2026-from-dialogue-to-execution-mixture-of-agents|MoA 대리 응답과 BT 실행 (Waseda, NII)]]: LLM planner의 확인 질문을 세 expert agent가 겹치지 않게 나눠 답하고 남은 것만 사람이 답하는 대화형 계획. 결과 Behavior Tree의 action node마다 imitation learning policy를 묶어 실제 로봇에서 실행한다 (2026, paper)
- [[physical-ai/choi-2026-reactree-hierarchical-llm-agent-trees|ReAcTree (ETRI, UST)]]: subgoal을 맡은 LLM agent들을 Behavior Tree식 control flow로 엮은 트리를 실행 중에 키우는 task planning 방법. WAH-NL에서 Qwen 2.5 72B 기준 goal 성공률이 31%에서 61%로 올랐다 (2026, paper)
- [[physical-ai/ao-2024-llm-as-bt-planner-leveraging-llms-for-behavior|LLM-as-BT-Planner (TUM MIRMI, MBZUAI)]]: LLM이 로봇 조립 계획을 실행 가능한 Behavior Tree로 직접 생성하는 프레임워크. in-context learning 방법 네 가지를 비교해 human-in-the-loop이 17개 중 16개로 앞섰다 (2024, paper)
- [[physical-ai/zhai-2025-igniting-vlms-toward-the-embodied|WALL-OSS (X Square Robot)]]: Self-Attention은 공유하고 FFN만 vision-language용과 action용으로 나눈 embodied foundation model. 커리큘럼은 두 단계다 (2025, paper)
- [[physical-ai/x-square-robot-2026-wall-oss-05-technical-report|Wall-OSS-0.5 기술 보고서]]: VLA pre-training 체크포인트를 초기값이 아니라 policy 그대로 실제 로봇에서 평가한 4B 오픈소스 VLA (2026, paper)
- [[physical-ai/x-square-robot-wall-x|wall-x (X-Square-Robot)]]: WALL 계열 모델의 학습과 추론 코드 저장소(Apache-2.0). 데이터 준비부터 fine-tuning, 서빙, 평가까지의 경로를 담는다 (2025, repo)
- [[physical-ai/x2robot-2025-wall-oss-project-page|WALL-OSS 프로젝트 페이지 (x2robot.com)]]: WALL-OSS 논문의 공식 프로젝트 페이지. 새 주장이나 수치는 없고 평가 과제의 실행 장면을 영상으로 보여 주는 데 값이 있다 (2025, article)
- [[physical-ai/jo-2026-wall-oss-vla-primer|03-11. WALL-OSS (모두의 로보틱스)]]: WALL-OSS 논문의 한국어 입문 해설. 논문 여러 절에 흩어진 손실 함수를 학습 단계 순서로 재배열해 기호를 하나씩 풀이한다 (2026, article)
- [[physical-ai/cui-2025-openhelix-a-short-survey-empirical|OpenHelix (Westlake Univ)]]: dual-system VLA의 짧은 서베이와 설계 요소별 ablation, 오픈소스 모델을 묶은 기술 보고서. dual-system에 판정 기준을 세웠다 (2025, paper)
- [[physical-ai/openhelix-robot-awesome-dual-system-vla|Awesome-Dual-System-VLA (repo)]]: OpenHelix 저자들이 논문의 서베이 절을 옮겨 갱신하는 awesome 리스트. 배제 목록을 나란히 둬 판정 기준을 함께 보여 준다 (2025, repo)
- [[physical-ai/peng-2026-cortex-a-bidirectionally-aligned-embodied|Cortex (Shanghai AI Lab)]]: 상위 VLM의 계획을 32개 canonical skill primitive와 도달 가능성 제약으로 묶어 하위 VLA가 그대로 실행하게 만든 dual-system VLA. 14단계 화학 실험을 zero-shot으로 완수한다 (2026, paper)
- [[physical-ai/peng-2026-cortex-project-page|Cortex 프로젝트 페이지]]: Cortex 논문의 공식 프로젝트 페이지. 방법을 네 장의 카드로 압축하고, 논문에 없는 RMBench 7과제 평균과 경계 추론 히트맵을 싣는다 (2026, article)
- [[physical-ai/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied|HiVLA (HKU, Shanghai AI Lab)]]: VLM이 낸 subtask 문장과 bounding box로 계획과 제어를 분리하고, DiT 안에서 global과 국소와 언어를 순서대로 주입하는 계층형 manipulation 시스템 (2026, paper)
- [[physical-ai/yang-2026-hivla-project-page|HiVLA 프로젝트 페이지]]: HiVLA 논문의 공식 프로젝트 페이지. 초록과 도식 두 장, RoboTwin 결과 표만 싣고 시연 영상은 없다 (2026, article)
- [[physical-ai/cai-2026-tau0-vla-a-hierarchical-robot-foundation|τ0-VLA (Shanghai Innovation Institute, Agibot Finch)]]: 상위 subtask 선택을 test-time computation 문제로 바꾼 hierarchical VLA. world model이 후보의 결과 이미지를 그리고 value model이 채점해 beam search로 고른다 (2026, paper)
- [[physical-ai/sii-research-2026-tau0-vla-project-page|τ0-VLA 프로젝트 페이지]]: τ0-VLA 논문의 공식 프로젝트 페이지. rollout 영상 일곱 편과 고해상도 구조도를 싣고, 논문에 없는 execution memory 단독 개선 폭 11.0%p를 밝힌다 (2026, article)
- [[physical-ai/nvidia-2025-cosmos-world-foundation-model-platform|Cosmos World Foundation Model Platform (NVIDIA)]]: 영상 curation과 토크나이저, WFM 8종을 함께 공개한 NVIDIA의 world model 플랫폼 논문 (2025, paper)
- [[physical-ai/wu-2023-unleashing-large-scale-video-generative|GR-1 (ByteDance Research)]]: 사람 영상에서 미래 프레임 예측을 배운 뒤 로봇 데이터로 학습한 manipulation policy. video generative pre-training의 출발점 (2023, paper)
- [[physical-ai/bytedance-gr-1|GR-1 (bytedance, repo)]]: GR-1 논문의 공식 코드 저장소(Apache-2.0). CALVIN 평가 경로와 가중치만 공개하고 pre-training과 fine-tuning 코드는 없다 (2024, repo)

## Agents (agents)

Agentic 시스템, tool use, planning, LangGraph 등.

- [[agents/anthropic-2025-equipping-agents-for-the-real|Equipping Agents with Agent Skills (Anthropic)]]: SKILL.md 폴더 포맷과 progressive disclosure 3레벨 로딩으로 에이전트에 절차 지식과 조직 맥락을 장착하는 설계 해설 (2025, article)
- [[agents/agentskills-agentskills|Agent Skills (repo)]]: Agent Skills 포맷의 벤더 중립 오픈 표준 저장소. `SKILL.md` 폴더 규격과 discovery, activation, execution 3단계를 정의한다 (2026, repo)
- [[agents/agentskills-io-2026-agent-skills-overview|Agent Skills Overview (agentskills.io)]]: 오픈 표준 공식 사이트 홈. progressive disclosure 3단계와 42개 클라이언트 Client Showcase로 채택 폭을 보인다 (2026, article)
- [[agents/garrytan-gstack|gstack (repo)]]: Garry Tan의 Claude Code 스킬 팩. 역할별 슬래시 명령어로 개발을 스프린트 사이클로 구조화한다 (2026, repo)
- [[agents/9bow-2026-gstack-claude-code-virtual-team|gstack 명령어 카탈로그 (9bow)]]: PyTorch KR이 gstack의 슬래시 명령어를 스프린트 사이클에 맞춰 5개 그룹으로 정리한 한국어 카탈로그. 설치 3종과 텔레메트리 범위까지 담았다 (2026, article)
- [[agents/gpters-2026-yc-ai-agent-guide-gstack|Y Combinator의 AI 에이전트 사용법 완벽 정리 (GPTers)]]: gstack 9개 슬래시 명령어의 사용법 가이드. 브라우저 QA 데몬의 콜드 스타트 3~5초, 이후 호출 100~200ms 수치를 담았다 (2026, article)
- [[agents/hada-2026-gstack-virtual-engineering-team|gstack으로 만드는 가상 엔지니어링 팀 (GeekNews)]]: gstack의 스프린트 사이클과 명령어 구조, 대상 사용자 세 부류를 정리한 커뮤니티 소개 글. 독자 댓글 4건을 함께 싣는다 (2026, article)
- [[agents/mattpocock-skills|Skills For Real Engineers (repo)]]: Matt Pocock이 매일 쓰는 코딩 에이전트 스킬 25개. 인터뷰, 스펙, TDD, 디버깅, 리뷰를 작은 단위로 쪼개고 사람만 부르는 스킬과 모델도 부르는 스킬로 나눈다. MIT (2026, repo)
- [[agents/shao-2024-assisting-in-writing-wikipedia-like-articles|STORM]]: 주제 이름만 받아 관점 발견과 시뮬레이션 대화로 pre-writing을 자동화하는 Wikipedia 글 생성 시스템. FreshWiki 데이터셋과 outline 평가 지표를 함께 제안한다 (2024, paper)
- [[agents/qiao-2026-memory-intelligence-agent|Memory Intelligence Agent (MIA)]]: Manager, Planner, Executor 3-agent 메모리 프레임워크. trajectory를 압축 workflow와 Planner 가중치로 나눠 담고 추론 중에도 계속 학습한다 (2026, paper)
- [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering (이호연)]]: 프롬프트에서 작업 환경 설계로의 전환을 구조, 맥락, 계획, 실행, 검증, 개선 여섯 단계로 정리한 Claude Code 기준 슬라이드 deck (2026, article)
- [[agents/dennis-2026-compiling-agentic-workflows-into-llm|Compiling Agentic Workflows into LLM Weights]]: 절차를 가중치에 컴파일한 8B 모델이 frontier in-context 대비 품질 87~98%, 비용 128~462배 절감을 달성 (2026, paper)
- [[agents/lin-2026-harness-updating-is-not-harness-benefit|Harness Updating Is Not Harness Benefit]]: harness 자기진화를 evolver의 갱신 능력과 agent의 수혜 능력으로 분해해 LLM 7종과 벤치마크 3종으로 측정한다 (2026, paper)
- [[agents/zou-2026-task-focused-memorization-multimodal-agents|TaskMem]]: multimodal agent가 무엇을 기억할지를 강화학습으로 배우게 만든 프레임워크. 2,048 파라미터 adapter만 갱신해 task별 초점을 얻는다 (2026, paper)
- [[agents/patel-2026-beyond-the-prompt-claude-code|Beyond the Prompt: Claude Code (Arpan Patel)]]: `.claude/` 설정 계층부터 스킬, 서브에이전트, 플러그인, MCP, 슬래시 커맨드, Obsidian 3계층 메모리까지 다룬 운용 가이드 (2026, article)
- [[agents/osmani-2026-loop-engineering|Loop Engineering (Addy Osmani)]]: 에이전트를 프롬프팅하는 루프 자체를 설계 대상으로 삼는 전환을 명명하고, automations, worktrees, 스킬, 커넥터, 서브에이전트 5+1 요소와 3대 한계를 짚는다 (2026, article)
- [[agents/osmani-2026-agent-skills|Agent Skills (Addy Osmani)]]: 에이전트가 기본값으로 건너뛰는 spec, test, review, verification을 checkpoint 있는 워크플로로 강제하는 스킬. 다섯 설계 원칙과 6단계 SDLC를 제시한다 (2026, article)
- [[agents/trq212-2026-a-field-guide-to-fable|A Field Guide to Fable (trq212)]]: 지도와 영토의 차이를 unknown으로 정의하고, 구현 전과 중과 후에 걸쳐 발굴하는 8가지 패턴을 프롬프트 예시와 함께 정리한 실전 가이드 (2026, article)
- [[agents/anthropic-2025-effective-context-engineering-for-ai|Effective Context Engineering for AI Agents (Anthropic)]]: attention budget의 high-signal 토큰 최소 집합 원칙과 long-horizon 3기법 (2025, article)
- [[agents/hall-2026-atlassians-design-md-is-here|Atlassian's DESIGN.md 실전 검증 (Hall)]]: Google의 DESIGN.md를 ADS production에서 MCP와 스킬과 비교 실측했다. 토큰이 MCP의 약 1.9배로 나와 이식 용도에 한정해 유용하다고 본다 (2026, article)
- [[agents/google-labs-code-design-md|code design.md (repo)]]: 디자인 시스템을 코딩 에이전트에게 넘기는 Google Labs 포맷 규격. YAML 토큰과 Markdown 산문 두 층, lint/diff/export/spec CLI, 린터 9규칙 (2026, repo)
- [[agents/hada-2026-agent-skills|Agent Skills (GeekNews)]]: Osmani 원문을 GeekNews가 요약하고 댓글 토론을 붙인 짝 자료. 스킬 20개, MIT 라이선스, 이식 경로 같은 정량 스펙에 규칙 우회와 컨텍스트 오염 회의론을 더한다 (2026, article)
- [[agents/lee-jeongmin-2026-loop-engineering-claude-code|Loop Engineering과 RLM (Jeongmin Lee)]]: RLM 구조로 Claude Code dynamic workflow의 설계 의도를 해설한 한국어 LinkedIn 포스트 (2026, article)
- [[agents/kang-2026-no-longer-prompting-claude|더 이상 Claude를 프롬프팅하지 않습니다 (Sujin Kang)]]: 최적화 단위가 prompt, context, harness, loop로 옮겨온 4단계 타임라인 (2026, article)
- [[agents/zhang-2026-recursive-language-models|Recursive Language Models]]: prompt를 REPL 변수로 offload하고 코드로 재귀 sub-LM을 호출하는 추론 패러다임 (2026, paper)
- [[agents/bytebytego-2026-how-openai-built-its-data|How OpenAI Built Its Data Agent (ByteByteGo)]]: 1.5 exabyte 규모 사내 data agent를 GPT-5.5 단일 모델과 여섯 개 context layer로 운영한 사례 (2026, article)
- [[agents/bai-2026-how-do-ai-agents-spend|How Do AI Agents Spend Your Money?]]: SWE-bench Verified 500문제를 8개 모델로 4회씩 실행한 trajectory 분석. 비용은 input 토큰에서 나오고 토큰을 더 써도 정확도는 오르지 않는다 (2026, paper)
- [[agents/runkle-2026-the-art-of-loop-engineering|The Art of Loop Engineering (Sydney Runkle)]]: agent, verification, event driven, hill climbing 네 겹 루프 스택을 LangChain 도구에 매핑한 글 (2026, article)
- [[agents/seans-ai-stories-2026-agent-harness-loop-engineering|Agent Harness and Loop Engineering (Sean's AI Stories)]]: harness를 마구에 비유해 memory 3종, end-loop guardrail, LLMOps를 잇는 입문 강의 (2026, video)
- [[agents/cemri-2025-why-do-multi-agent-llm-systems|Why Do Multi-Agent LLM Systems Fail? (MAST)]]: 7개 MAS의 1,642개 trace를 Grounded Theory로 분석해 14개 실패 모드와 3개 카테고리로 정리한 첫 MAS 실패 분류체계 (2025, paper)
- [[agents/microsoft-skillopt|SkillOpt (repo)]]: agent skill 문서를 학습 대상 파라미터로 삼아 딥러닝 옵티마이저의 규율로 훈련하는 Microsoft 프레임워크. 가중치를 고정한 채 `best_skill.md` 한 장만 배포한다 (2026, repo)
- [[agents/yang-2026-skillopt-executive-strategy-for|SkillOpt]]: skill 문서를 external state로 두고 edit budget과 held-out gate로 훈련하는 text-space optimizer. 52개 셀 전부 best 또는 tied-best (2026, paper)
- [[agents/rodrigues-2026-mcp-server-architecture-patterns|MCP Server Architecture Patterns]]: MCP 서버 15개를 코딩해 패턴 5종과 anti-pattern 4종을 정리한 산업 경험 논문. tool 10~15개가 Haiku급 정확도 예산이다 (2026, paper)
- [[agents/headroomlabs-ai-headroom|Headroom (repo)]]: 에이전트가 읽는 tool 출력과 로그, RAG 청크를 LLM 도달 전에 압축해 토큰을 60~95% 줄인다는 context compression layer. library, proxy, wrap 세 형태로 도입한다 (2026, repo)
- [[agents/tosea-2026-how-to-use-headroom-context|How to Use Headroom (Tosea.ai)]]: Headroom을 붙이는 다섯 방식과 선택 규칙, 도입하지 말아야 할 조건, 네이티브 compaction과의 스코프 차이를 정리한 실무 가이드 (2026, article)
- [[agents/subratpati-2026-building-cost-efficient-agents-with|Building Cost-Efficient Agents with Headroom (Subrat Pati)]]: Headroom의 토큰 40~90% 절감을 유저당 하루 지출액으로 환산한 비용 관점 소개글 (2026, article)
- [[agents/nedai-2026-headroom-token-compression-guide|Headroom 토큰 절감 사용법 (Nedai)]]: Headroom을 터미널 래핑, 로컬 proxy, MCP 등록으로 연동하는 절차와 Windows 인코딩 대응을 정리한 한국어 how-to (2026, article)
- [[agents/9bow-2026-headroom-ai-agent-context-compression|headroom: AI 에이전트 컨텍스트 압축 도구 (9bow)]]: PyTorch KR 한국어 소개글. ContentRouter 압축, local-first, 배포 4형태와 절감 실측표를 전한다 (2026, article)
- [[agents/google-2026-the-new-sdlc-with-vibe|The New SDLC With Vibe Coding (Google)]]: vibe coding에서 agentic engineering까지의 스펙트럼과 Agent = Model + Harness 방정식으로 SDLC 재편을 정리했다 (2026, report)
- [[agents/ai-boost-awesome-harness-engineering|Awesome Harness Engineering (repo)]]: harness를 모델과 분리된 공학 분야로 규정하고 자료 385개를 12개 design primitive와 참고 구현, 보안, 평가, 운영으로 분류한 awesome-list (2026, repo)
- [[agents/luis-carrijo-2026-claude-code-team-just-dropped|Claude Code loop engineering 강좌 (Luis Carrijo)]]: harness 프롬프트 조립, permissions, 스킬, auto mode, dynamic workflow를 데모로 훑는 1시간 강좌 (2026, video)
- [[agents/walkinglabs-learn-harness-engineering|Learn Harness Engineering (repo)]]: harness를 Instructions, State, Verification, Scope, Lifecycle 다섯 하위 시스템으로 나눠 가르치는 프로젝트 기반 코스 (2025, repo)
- [[agents/movez-2026-loop-engineering-for-trading-agents|Loop Engineering for Trading Agents (Movez)]]: 리서치, 전략, 실행 세 루프를 12단계로 엮는 자동 트레이딩 데스크 로드맵. 거래 감사, 페이퍼 런, alerts-only 세 게이트 (2026, article)
- [[agents/patel-2026-i-taught-myself-claude-code|I taught myself Claude Code from scratch (Manthan Patel)]]: Claude Code 독학 자료 21개를 영상, repo, 책, 논문, 커뮤니티로 묶은 큐레이션. 링크가 전부 단축 URL이다 (2026, article)
- [[agents/thariq-2026-know-your-unknowns|Know your unknowns (Thariq)]]: unknown unknowns를 값싸게 발견하는 11개 기법을 구현 전, 중, 후로 나눠 HTML 데모로 시연한 companion 페이지 (2026, article)
- [[agents/stanford-oval-storm|STORM (repo)]]: 주제 하나로 Wikipedia 스타일 글을 쓰는 STORM과 사람이 담론에 참여하는 Co-STORM의 공식 구현체. 설치, 설정, 실행 API를 다룬다 (2024, repo)
- [[agents/zhao-2026-generative-skill-composition-for-llm|Generative Skill Composition for LLM Agents]]: skill 종류와 개수와 순서를 닫힌 어휘 시퀀스로 함께 예측하는 SkillComposer. pass rate 23.1%p 상승 (2026, paper)
- [[agents/madslorentzen-ai-job-search|MadsLorentzen/ai-job-search (repo)]]: Claude Code 기반 구직 지원 프레임워크. drafter-reviewer 2단계로 LaTeX CV를 쓰고 PDF 컴파일과 ATS 텍스트 레이어까지 검증한다 (2026, repo)
- [[agents/stablyai-orca|Orca (repo)]]: 여러 CLI 코딩 에이전트를 각자 독립된 git worktree에서 병렬 실행하고 한 곳에서 추적하는 stablyai의 데스크톱 오케스트레이터. 지원 에이전트 29종 명시, MIT (2026, repo)
- [[agents/donchitos-claude-code-game-studios|Claude Code Game Studios (repo)]]: Claude Code 세션에 게임 스튜디오 조직을 입히는 MIT 템플릿. 에이전트 3계층과 슬래시 커맨드, 훅, 경로 기반 규칙으로 품질 게이트를 건다 (2026, repo)
- [[agents/llmsresearch-paperbanana|PaperBanana (repo)]]: 방법론 텍스트를 받아 7개 에이전트가 다이어그램과 통계 플롯을 만드는 프레임워크. CLI, Python API, MCP 서버, Claude Code 스킬을 제공한다 (2026, repo)
- [[agents/imbad0202-academic-research-skills|Academic Research Skills (repo)]]: Claude Code 스킬 4종으로 논문 연구부터 심사까지 잇는 파이프라인. 환각 인용을 막는 3단 검증 인프라와 건너뛸 수 없는 무결성 게이트가 핵심이다 (2026, repo)
- [[agents/yongkyun-2026-cutting-llm-token-costs-with|Cutting LLM Token Costs (Yongkyun)]]: headroom, rtk, caveman의 60~90% 절감 주장을 저자 본인 세션 6억 1,400만 토큰에 재생해 지출 3.7%만 줄었음을 보인 실측 리포트 (2026, article)
- [[agents/rasmussen-2025-zep-a-temporal-knowledge-graph|Zep: A Temporal Knowledge Graph]]: 시간 정보를 가진 knowledge graph로 에이전트 메모리를 구현한 논문. DMR 94.8%, LongMemEval에서 latency 약 90% 절감 (2025, paper)
- [[agents/getzep-graphiti|Graphiti (repo)]]: Zep 상용 서비스의 코어를 공개한 temporal context graph 엔진. 사실마다 유효 기간을 붙여 증분 갱신하고 hybrid retrieval로 질의한다 (2025, repo)
- [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments|CUA-Gym]]: 격리된 두 코딩 에이전트가 지시문과 환경과 reward를 함께 만드는 computer-use agent RLVR 데이터 합성 파이프라인. 검증 튜플 32,112개 (2026, paper)
- [[agents/xlang-ai-cua-gym|CUA-Gym (repo)]]: task 생성부터 적대적 co-generation 루프, 다수결 필터, mock 웹 앱 환경 층까지 담은 공식 구현. 웹 task를 쓰려면 mock을 직접 배포해야 한다 (2026, repo)
- [[agents/xlangai-cua-gym-dataset|CUA-Gym Dataset (repo)]]: computer-use agent RLVR task 집합의 Hugging Face 배포판. parquet 메타데이터와 실행 아카이브 2층 구조, 공개분 10,910 task (2026, repo)
- [[agents/theaxlabs-2026-company-brain-prompt-guide|컴퍼니 브레인 만드는 법 (AX LABS)]]: 개인 채팅에 갇힌 AI 교정을 조직 자산으로 옮기는 절차. 지도 파일 템플릿, 교정 라우팅 표, 프롬프트 6종 전문 (2026, article)
- [[agents/zhou-2026-are-we-ready-for-an|Are We Ready For An Agent-Native Memory System?]]: 에이전트 메모리를 표현, 추출, retrieval, 유지 네 모듈로 분해해 12개 시스템을 통합 벤치마크한 연구 (2026, paper)
- [[agents/lee-2026-the-agent-loop-a-survey|The Agent Loop: A Survey]]: 분석 단위를 모델에서 agent loop로 옮긴 서베이. 루프 모양, mechanics, trained loop, 스킬, harness를 묶고 통제 실험 4건으로 반증을 실측한다 (2026, paper)
- [[agents/he-2026-agent-lightning-v1-0-towards-harnessed|Agent Lightning v1.0]]: 배포용 harness가 agent loop를 쥔 채 RL을 수행할 때 생기는 retokenization, advantage, loss 정규화, 스케줄링 문제를 정리한 프레임워크 논문 (2026, paper)
- [[agents/block-buzz|Buzz (repo)]]: 사람과 에이전트가 같은 채널의 멤버가 되고 대화, 패치, 승인이 Nostr relay의 서명 이벤트 하나로 쌓이는 Block의 self-host 워크스페이스 (2026, repo)
- [[agents/browser-use-browser-use|browser-use (repo)]]: LLM이 Chrome DevTools Protocol로 Chromium을 직접 제어해 웹 과제를 수행하는 MIT 라이선스 Python 패키지. CLI 스킬과 라이브러리 두 경로를 제공한다 (2026, repo)
- [[agents/browser-use-browsercode|BrowserCode (repo)]]: OpenCode fork에 브라우저 도구 `browser_execute(code)` 하나만 더한 코딩 에이전트. CDP로 에이전트가 쓴 JavaScript를 직접 실행한다 (2026, repo)
- [[agents/magnitudedev-magnitude|Magnitude (repo)]]: 하드웨어를 프로파일링해 맞는 로컬 모델을 추천, 다운로드, 튜닝, 실행하고 Claude Code 등 harness 9종에 loopback API로 연결하는 오픈소스 추론 서버. Apache-2.0 (2026, repo)

## Evaluations (evaluations)

평가 프레임워크(RAGAS, Braintrust), benchmark.

- [[evaluations/marker-inc-korea-autorag|Marker-Inc-Korea/AutoRAG (repo)]] — RAG 파이프라인의 노드별 모듈 조합을 그리드 서치로 자동 평가·비교해 최적 파이프라인을 골라주는 RAG AutoML 프레임워크. Node Line→Node→Module 3계층 YAML 추상화, 한국어 BM25 토크나이저 기본 제공 (2024, repo)
- [[evaluations/kim-2026-ai-prd-eval-plan|AI PRD는 무엇이 달라야 하는가 (article)]] — 확률적 AI 기능은 행동이 아니라 "합격선"을 명세해야 한다는 AI PRD 작성론. Eval Plan(스프레드시트 Eval 셋 + 규칙기반·LLM-as-a-Judge·사람 3층 피라미드 + 회귀 테스트)을 문서의 심장으로, 8대 필수 항목과 가격 모델까지 하나의 정합 시스템으로 (2026, article)
- [[evaluations/xie-2024-osworld-benchmarking-multimodal-agents-for|OSWorld]] — 가상 머신 위 실제 Ubuntu에 369개 컴퓨터 조작 task를 얹고 task마다 채점 스크립트를 붙인 computer-use agent 벤치마크. 사람 72.36%에 최고 모델 12.24%로 격차를 드러냈고 실패의 75%가 GUI grounding이었다 (2024, paper)
- [[evaluations/xlang-ai-osworld|xlang-ai/OSWorld (repo)]] — OSWorld 공식 구현체. `desktop_env` 패키지가 VMware·Docker·AWS 등 provider를 추상화한다. 2025년 OSWorld-Verified가 채점 결함을 고치고 평가를 1시간 안으로 병렬화했다 (2024, repo)
- [[evaluations/bandi-2026-mcp-atlas-a-large-scale-benchmark-for|MCP-Atlas]] — 목이 아닌 실제 운영 MCP 서버 36개·도구 220개 위에서 1,000개 task로 tool use를 재는 벤치마크. trajectory 일치 대신 원자 단위 claim으로 채점했더니 20개 프런티어 모델 실패의 63.3%가 도구 호출이 아니라 조기 종료·잘못된 합성 같은 인지 단계에서 나왔다 (2026, paper)

## Applications (applications)

RAG 응용, 도메인 적용 사례, 제품 패턴.

- [[applications/garrytan-gbrain|garrytan/gbrain (repo)]]: Garry Tan이 MIT로 공개한 에이전트 메모리. git markdown을 원본으로 두고 hybrid retrieval, LLM 호출 없는 typed edge graph, 답을 합성하는 brain layer를 결합한다 (2026, repo)
- [[applications/garrytan-gbrain-tutorials|garrytan/gbrain tutorials]]: 저장소 docs/tutorials의 실전 셋업 4편. 개인 brain, 회사 brain, skillopt, 코딩 에이전트 연결을 소요 시간과 비용 예산까지 절차로 정리한다 (2026, repo)
- [[applications/xguru-2026-gbrain-open-source-personal-knowledge|GBrain 오픈소스 개인 지식 베이스 (GeekNews)]]: xguru의 한국어 소개글. v0.2.0 기준 핵심 기능 5개와 기술 스택, 변경점 3개를 담은 버전 스냅샷 (2026, article)
- [[applications/tilnote-2026-gbrain-repository-core-summary|GBrain 저장소 핵심 정리 (tilnote)]]: thin harness, fat skills와 contract-first 두 원칙으로 저장소를 읽고 v0.3.0에서 v0.9.1까지 버전 진화를 정리한 한국어 요약 (2026, article)
- [[applications/gajjar-2026-gbrain-vs-computer-memory|GBrain vs DevRev Computer Memory]]: DevRev 소속 저자가 개인용 GBrain과 조직용 Computer Memory의 설계 차이 세 가지를 대비한 에세이. 인용한 GBrain 운영 규모는 저장소 README 현재 값과 다르다
- [[applications/vectorize-2026-gbrain-review-honest-assessment|GBrain Honest Assessment (Vectorize)]]: Vectorize.io가 GBrain을 10개 항목으로 채점한 리뷰. 강약점을 각 6가지로 나누고 단일 운영자 범위를 넘으면 맞지 않는다고 본다 (2026, article)
- [[applications/mantena-2026-hermes-gbrain-setup-vps|Hermes + GBrain on AWS EC2 (Mantena)]]: AWS EC2 VPS에 GBrain을 설치하고 Hermes에게 ingest를 위임하는 4부 가이드. X Basic tier와 ngrok 없이 likes까지 모은다 (2026, article)
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained|GBrain Explained (TechWealth Hub)]]: 공개 직후 올라온 5분 45초 3자 해설. 3-layer 구조와 brain agent loop, verification runbook을 압축한다 (2026, video)
- [[applications/liu-2026-rag-llm-wiki-or-gbrain|RAG, LLM Wiki, or GBrain? (Liu)]]: 에이전트가 하는 일이 retrieve인지 compile인지 act인지로 RAG, LLM Wiki, fat skills를 가르는 결정 프레임워크 에세이 (2026, article)
- [[applications/safishamsi-graphify|safishamsi/graphify (repo)]]: 임의의 폴더를 읽어 지식 그래프로 만드는 Claude Code 스킬. 원본 직접 읽기 대비 질의당 토큰 71.5배 절감을 보고하고, 엣지마다 발견과 추측을 라벨로 구분한다 (2026, repo)
- [[applications/graphify-labs-graphify|graphify (Graphify-Labs)]]: Claude Code에서 /graphify 한 줄로 임의 폴더를 knowledge graph로 바꾸는 스킬이자 CLI. README 본문은 safishamsi/graphify 스냅샷과 글자 단위로 같다 (2026, repo)
- [[applications/shamsi-2026-graphify-knowledge-graphs-for-ai|Graphify 공식 제품 페이지]]: 코드와 문서, 논문, 다이어그램을 임베딩 없이 하나의 지식 그래프로 묶는 오픈소스 스킬. 제품이 스스로 제시한 71.5배 토큰 감축 수치와 그 근거를 정리했다 (2026, article)
- [[applications/todaycode-2026-graphify-llm-token-reduction-wiki|Graphify 한국어 해설 (오늘코드todaycode)]]: legalize-kr 법령 데이터 시연과 9단계 파이프라인, tree-sitter, Leiden 해설. 71.5배와 657배 두 토큰 절감 수치의 측정 조건을 구분해 정리했다
- [[applications/colbymchenry-codegraph|colbymchenry/codegraph (repo)]]: tree-sitter로 20개 이상 언어를 파싱해 로컬 SQLite 그래프로 만들고 MCP로 8종 코딩 에이전트에 노출하는 도구. LLM 없이 정적 추출만 쓰고 파일 감시자로 인덱스를 상시 동기화한다
- [[applications/dnotitia-akb|dnotitia/AKB (repo)]]: MCP로 노출되는 에이전트용 조직 메모리 저장소. Git bare repo와 PostgreSQL 위에 hybrid retrieval을 올리고 PostgreSQL ACL로 vault를 격리한다. LongMemEval-S R@5 98.4% (2026, repo)
- [[applications/dnotitia-2026-akb-product-introduction|AKB 제품 소개 슬라이드 (Dnotitia)]]: AKB와 Collector, Gardener 3종을 23장 슬라이드로 소개한다. 다중 경로 탐색과 9개 vault 운영, 21일 무인 운영 실측, XDR 적용 구상을 담는다 (2026, report)
- [[applications/wlsdks-ontology-atlas|wlsdks/ontology-atlas (repo)]]: 코드베이스 ontology를 저장소 Markdown 폴더 하나로 유지하는 로컬 워크벤치. 다섯 kind와 typed 관계로 폴더를 계산 가능하게 만들고, 사람은 git diff로 에이전트는 MCP로 같은 그래프를 다룬다
- [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy|LLM Wiki 입문 튜토리얼 (Data Science Dojo)]]: Karpathy의 LLM Wiki 패턴을 코딩 없이 25~35분에 따라 하는 6단계 절차로 풀어쓴 입문 가이드. 컴파일과 유지보수 프롬프트를 원문 그대로 싣는다
- [[applications/kmyu-2026-llm-wiki-pattern-synthesis|Karpathy LLM Wiki 패턴 한국어 종합 정리]]: Karpathy의 LLM Wiki Gist와 한국어 커뮤니티 논의를 11개 절로 합성한 기술 리포트. 여섯 가지 비판과 한국어 운영 아홉 항목을 함께 정리한다
- [[applications/pandey-2026-rag-is-no-longer-just|RAG is no longer just vector search + LLM (Pandey, LinkedIn)]]: production RAG를 Hybrid, GraphRAG, Agentic, Corrective, Multimodal 다섯 가지로 나눈 포스트
- [[applications/lum1104-understand-anything|Lum1104/Understand-Anything (repo)]]: 코드베이스나 Karpathy 패턴 wiki를 knowledge graph로 바꿔 대화형 대시보드로 탐색하게 하는 MIT 플러그인. tree-sitter가 구조를, LLM이 의미를 맡는다
- [[applications/langchain-ai-openwiki|langchain-ai/openwiki (repo)]]: 코드베이스 문서를 만들고 갱신하는 LangChain의 CLI. 저장소를 읽어 openwiki/ 디렉토리에 문서를 만든 뒤 AGENTS.md와 CLAUDE.md에 참조를 덧붙여 코딩 에이전트가 찾아 쓰게 한다
- [[applications/sproul-2026-introducing-openwiki-an-open-source|OpenWiki 출시 소개 (LangChain)]]: 제작사가 직접 밝힌 문제 의식과 설계 판단. 지시 파일에는 위키 참조만 두고, GitHub Action이 git diff로 문서를 갱신한다 (2026, article)
- [[applications/9bow-2026-openwiki-coding-agent-documentation|OpenWiki 한국어 소개 (9bow, PyTorchKR)]]: PyTorch Korea 9bow가 OpenWiki의 문제의식과 에이전트 연동, 실행 모드, CI 연동을 코드 예제와 함께 소개한 커뮤니티 글 (2026, article)
- [[applications/kmyu-2026-akb-llmwiki-gbrain-comparison|AKB, llmwiki, GBrain 비교 (kmyu)]]: 세 agent memory 접근을 6개 항목 5점 척도로 비교하고, AKB를 조직용 memory operating platform으로 올리는 3단계 로드맵을 제안한 2026-04-18 전략 보고서
- [[applications/agricidaniel-claude-obsidian|AgriciDaniel/claude-obsidian (repo)]]: Karpathy LLM Wiki 패턴을 Claude Code 스킬 15개와 사전 설정 Obsidian vault로 구현한 MIT 저장소. advisory lock과 hybrid retrieval을 포함한다
- [[applications/joonan30-llm-wiki-labs|joonan30/llm-wiki-labs (repo)]]: Joonan Lab이 연구실 위키 시스템(LLM-Wiki)의 구축과 운영을 인터랙티브 페이지로 공개한 저장소. 31일 케이스 스터디를 담은 lab 1편이 단일 HTML로 배포된다 (2026, repo)
- [[applications/dragon1086-llm-wiki|dragon1086/llm-wiki (repo)]]: Karpathy LLM Knowledge Base 패턴을 Claude Code CLI와 Obsidian vault로 구현한 한국어 저장소. ingest, query, lint에 watch 감시, Discord 봇, BFS 검색을 더했다
- [[applications/alex-xu-2026-rag-vs-graph-rag-vs|RAG vs Graph RAG vs Agentic RAG (Alex Xu, LinkedIn)]]: Standard, Graph, Agentic RAG를 각각 3~4단계 파이프라인으로 비교한 LinkedIn 카드. 첨부 비교도가 본문보다 상세하다
- [[applications/patel-2026-production-ai-app-seven-layers|Production AI 앱의 7개 레이어 (Manthan Patel, LinkedIn)]]: 실제 Next.js 앱의 파일 트리를 7개 레이어로 해부하고 `.claude/`를 일곱 번째 레이어로 세운 짧은 게시글 (2026, article)
- [[applications/shubhamsaboo-awesome-llm-apps|Awesome LLM Apps (Shubhamsaboo, repo)]]: 15개 카테고리 아래 107건의 실행 가능한 LLM 앱 템플릿을 담은 Apache-2.0 쿡북 저장소. 링크 모음이 아니라 full source code가 든 자족형 디렉토리다 (2026, repo)
- [[applications/zhulinsen-daily-stock-analysis|ZhuLinsen/daily_stock_analysis (repo)]]: A주, 홍콩, 미국, 일본, 한국, 대만 6개 시장 종목을 매일 분석해 매수와 관망과 매도 대시보드를 만들고 6개 채널로 전송하는 MIT 오픈소스
- [[applications/cheahjs-free-llm-api-resources|cheahjs/free-llm-api-resources (repo)]]: 무료 한도나 체험 크레딧으로 쓸 수 있는 LLM API 프로바이더 26곳을 요청 한도, 토큰 한도, 이용 조건, 제공 모델까지 정리한 큐레이션 저장소 (2026, repo)

## Etc (etc)

미분류, 횡단(cross-cutting) 주제.

- [[etc/rahman-2026-a-practical-guide-to-becoming|AI-Native Engineer 실전 가이드 (Shah Rahman, ByteByteGo)]] — Meta Ads ML 총괄 Shah Rahman의 에세이. 엔지니어가 오케스트레이터로 정체성을 옮길 때 필요한 4 Core Practices와 ADLC 운영 프레임 (2026, article)
- [[etc/google-okf|Open Knowledge Format (OKF)]] — 데이터·시스템을 둘러싼 지식을 YAML frontmatter markdown으로 표현하는 Google의 벤더 중립 포맷(SPEC v0.2, Apache-2.0). 에이전트가 계속 고쳐 쓰는 코퍼스를 전제로 출처(`sources` + 신뢰도 신호)·신뢰(`generated`·`verified`에서 유도하는 trust tier)·수명주기(`status`·`stale_after`)를 frontmatter 1급 항목으로 올렸고, 수치를 계산하는 승인된 방법을 실어 실행 결과를 결정적 코드로 검사하는 Attested Computation 타입을 새로 뒀다. 신뢰 점수는 저장하지 않고 신호만 남긴다. 포맷 자체가 기여이고 생산(BigQuery+Gemini reference agent)·소비(자기완결 HTML visualizer)는 PoC. 이 ai-wiki와 같은 계보 (2026, repo)

## Overviews (overviews)

다수 자료를 합성한 페이지 — 지식이 복리로 쌓이는 곳.

- [[overviews/agent-skills-overview|Agent Skills — 설계 원전·오픈 표준·생태계]] — Anthropic 발표글(왜·어떻게, 도식 6종)·agentskills 저장소(규격)·agentskills.io(40여 클라이언트 채택)를 세 축으로 겹쳐, `SKILL.md` 폴더 + progressive disclosure + cross-vendor 표준화를 한 장으로 정리하고 Skills vs MCP 경계까지 그은 개괄 (2026, overview)
- [[overviews/lightrag-family-graph-rag-overview|Graph-based RAG 계열 — GraphRAG 트렁크 (LightRAG · LeanRAG · RAG-Anything)]] — GraphRAG를 트렁크로 두고 LightRAG, LeanRAG, RAG-Anything 분기와 한국어 자료를 한데 모은 graph RAG 계보 overview (2026, overview)
- [[overviews/gbrain-ecosystem-overview|GBrain 생태계]] — Garry Tan이 공개한 GBrain을 축으로 repo와 리뷰, 튜토리얼, 영상, 결정 프레임을 합성한 생태계 overview (2026, overview)
- [[overviews/agent-harness-engineering-overview|Agent Harness Engineering — Skills · Loops · Verification]] — Osmani의 Agent Skills·Loop Engineering, 이호연의 Harness Engineering, Patel의 실전 가이드를 한 지도로 묶고, Lin et al.의 controlled grid 실증으로 "harness는 frontier 모델에서 가장 크게 회수된다"는 경계까지 그은 개괄. trq212의 Fable 가이드를 "하네스 앞단 — 사람의 unknown" 입력단으로 덧대 7개 자료로 확장 (2026, overview)
- [[overviews/headroom-context-compression-overview|Headroom — 에이전트 컨텍스트 압축 개괄]] — 정본 저장소와 소개글 넷(Tosea·Subrat Pati·Nedai·9bow)을 한 장의 지도로 묶어, 같은 도구를 구조·선택 규칙·비용·Cursor 실전·정확도 다섯 렌즈로 정리하고 합의 벤치마크와 "쓰지 말아야 할 때"까지 그은 개괄 (2026, overview)
- [[overviews/design-md-overview|DESIGN.md — 포맷 정의부터 production 트레이드오프까지]] — Google Labs 정본 저장소와 Atlassian production 검증 두 자료를 한 장으로 겹쳐, 포맷이 약속하는 것(산문 중심·이식성)과 현장에서 깨지는 지점(일괄 로드로 토큰 2배·재생성 유도)을 나란히 놓고 "기존 시스템 있으면 MCP·Skill, 없으면 DESIGN.md"라는 결정 가이드를 그은 개괄 (2026, overview)
- [[overviews/loop-engineering-cross-domain-overview|Loop Engineering — 코딩과 트레이딩을 관통하는 도메인 이식]] — loop engineering 클러스터가 거의 전부 코딩 에이전트를 다루는 가운데, Movez의 트레이딩 데스크 글을 처음으로 코딩 밖 도메인 이식 사례로 나란히 놓아 "도메인 불변의 뼈대(탐색→결정→실행→기록→개선)"와 "코딩 특유의 살"을 가른 개괄. verifier gate를 두 도메인을 관통하는 심장으로 세우고, Movez는 데모·Lin은 실증이라는 경계까지 그었다 (2026, overview)
- [[overviews/gstack-ai-software-factory-overview|gstack — 1인 개발자를 위한 AI 소프트웨어 팩토리]] — Garry Tan의 gstack 저장소와 세 한국어 자료(GeekNews·PyTorch KR·GPTERS)를 묶어, 역할 기반 계획·실제 브라우저 QA·배포/보안/회고 자동화 세 축으로 정리하고 자기 보고 수치의 한계까지 짚은 개괄 (2026, overview)
- [[overviews/prompt-to-loop-engineering-evolution-overview|Prompt → Context → Harness → Loop Engineering — 4단계 진화]] — 에이전트 최적화의 무게중심이 단일 지시→문맥 토큰→실행 환경→오케스트레이션 루프로 한 칸씩 밀려온 4단계를 관통하는 최상위 진입 지도. 앞 두 단계(Prompt·Context)는 배경으로 압축하고 Harness·Loop를 심화한 뒤 각각 자매 overview로 하향 라우팅. verification distance·progressive disclosure·compounding 세 원리가 단계를 넘어 반복됨을 실로 꿰고, "사다리를 오를수록 frontier 모델 의존이 커진다"는 Lin의 경계까지 그었다 (2026, overview)
- [[overviews/physical-ai-overview|Physical AI 카테고리 지도와 학습 경로]]: physical-ai 76편을 프로젝트 단위 클러스터로 묶은 허브. 학습 경로 세 트랙(VLA 계보, world model, 고전 스택)과 각 겹의 역할을 정리한다 (2026, overview)
- [[overviews/glossary-physical-ai|용어집 — Physical AI]] — policy·observation·trajectory 등 physical-ai 전문 용어의 canonical 표기를 정한 SSOT. 원어 유지 + 첫 등장 서술형 풀이 원칙과 lint 금지 표기 목록을 담는다 (2026, overview)
- [[overviews/glossary-agents|용어집 — Agents]] — tool use·harness·오케스트레이션 등 agentic 시스템 용어의 canonical 표기 SSOT. 정착 음차(프롬프트·컨텍스트·메모리)와 원어 유지 개념어를 가른다 (2026, overview)
- [[overviews/glossary-llms|용어집 — LLMs]] — pre-training·fine-tuning·임베딩 등 모델 학습 일반 용어의 canonical 표기 SSOT. 전 카테고리에 적용된다 (2026, overview)
