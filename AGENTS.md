# AI Wiki에서 Codex로 작업하기

작업을 시작할 때 저장소 루트의 [CLAUDE.md](CLAUDE.md)를 끝까지 읽고 적용한다. 두 도구가 공유하는 위키 운영 규칙, 자료 유형별 수집 절차, 스키마와 작성 기준이 이 파일에 있다. [.claude/memory/MEMORY.md](.claude/memory/MEMORY.md)가 가리키는 작업 지침도 따른다.

- 위키 질문에는 `wiki/`와 `sources/`를 먼저 읽고, 필요하면 `raw/`의 원문을 확인한다. 사용자가 특정 자료 수집을 요청한 경우에만 해당 원본을 가져온다. 기사는 `scripts/fetch_article.py`를 사용한다. GitHub README는 지정한 저장소에서 원문을 가져온다.
- 커밋과 푸시는 각각 사용자가 명시적으로 요청할 때만 실행한다. `rm -rf`, 강제 푸시, `git reset --hard`는 사용하지 않는다. 윤문도 명시적으로 요청할 때만 실행한다.
- Claude 스킬과 명령의 `Read`, `Glob`, `Grep`, `Bash`는 Codex의 파일 읽기, 파일 찾기, 내용 검색, 셸 실행에 대응한다. 파일 편집에는 `apply_patch`를 사용한다. 각 역할과 명령이 지정한 파일 및 도구 범위를 지킨다.
- `$ARGUMENTS`는 사용자가 스킬 이름 뒤에 준 입력이다. `${CLAUDE_SKILL_DIR}`는 해당 `SKILL.md`가 있는 디렉터리로 해석한다. 스킬이 `Agent`나 `Task`로 역할을 호출하도록 지시하면 같은 이름으로 등록된 Codex 서브에이전트에 입력과 출력 경로를 전달한다. 모델 선택은 세션 설정을 따른다.
- 위키 저장 훅이 꺼져 있거나 셸로 편집했다면 변경한 파일에 `python3 scripts/lint_terms.py <파일>`과 `python3 scripts/lint_style.py <파일>`을 실행한다. `glossary-*.md`에는 문체 검사만 적용한다. 작성 완료 시에는 `write-wiki` 스킬의 검증 절차를 따른다.
