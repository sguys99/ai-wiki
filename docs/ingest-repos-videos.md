# Repos와 Videos 수집 절차 (Step 1 ~ 2.5)

전용 스킬이 없는 두 유형의 수집 절차. CLAUDE.md에서 분리 (2026-11).

## Repos

**Step 1** — 사용자가 org/repo를 지정하면, 에이전트가 `WebFetch`로 README를 취득해 `raw/repos/{stem}.md`로 저장한다 (rule #1 예외: 사용자가 명시적으로 자료 수집을 지시한 경우에 한함).

- 취득 URL: `https://raw.githubusercontent.com/{org}/{repo}/main/README.md` (없으면 `/master/` 시도)
- 서브디렉토리 경우: `https://raw.githubusercontent.com/{org}/{repo}/main/{path}/README.md`

저장 형식:

```markdown
---
title: "..."
type: repo
year: YYYY
category: ...
raw_path: raw/repos/{stem}.md
raw_filename: "{stem}.md"
source_collection: external
org: "..."
repo: "..."
url: "https://github.com/{org}/{repo}"
license: "..."
tags: []
---

{README.md 전문}
```

**Step 2** — 저장된 `raw/repos/{stem}.md`를 그대로 LLM 입력으로 사용한다 (articles와 동일).

**Step 2.5 (이미지)** — repo 내 이미지는 자동 fetch하지 않는다. README 본문에 등장하는 이미지의 GitHub URL을 `figures:` frontmatter의 `raw` 필드에 기록하고 `strategy: manual`로 표기. 사용자가 필요한 이미지를 `wiki/assets/{stem}/`에 수동 저장.

**비고**: `license` 키 작성 필수. 사용/인용 시 라이선스 조건 준수.

## Videos

**Step 1** — youtube transcript(자막)를 사용자가 직접 `raw/videos/{stem}.md`로 저장한다. `yt-dlp` 등 **로컬 도구**로 자막을 받는 것은 허용된다 (네트워크 fetch는 사용자가 수동 수행). 채널·URL·duration 등 메타데이터는 frontmatter에 기록한다.

**Step 2** — transcript 본문을 그대로 LLM 입력으로 사용한다.

**Step 2.5 (키프레임 캡처)** — 슬라이드·차트가 등장하는 timestamp를 사용자가 transcript에서 지정 → `ffmpeg`로 프레임 1장씩 캡처해 `raw/videos/{stem}-figures/`에 저장.

> **환경**: 시스템에 `ffmpeg`가 필요하다 (`brew install ffmpeg` — 한 번만). 영상 파일(.mp4 등)은 `raw/videos/{stem}.mp4` 또는 사용자가 알려주는 외부 경로 사용 가능.

```bash
STEM="3blue1brown-2024-but-what-is-gpt"
VIDEO="/path/to/${STEM}.mp4"     # 또는 raw/videos/${STEM}.mp4
OUT="raw/videos/${STEM}-figures"
mkdir -p "$OUT"

# 사용자가 transcript에서 지정한 timestamp들로 캡처 (예: 03:12, 07:45, 12:30)
for TS in 03:12 07:45 12:30; do
  CLEAN=$(echo "$TS" | tr -d ':')
  ffmpeg -nostdin -hide_banner -loglevel error \
    -ss "$TS" -i "$VIDEO" -frames:v 1 -y "$OUT/frame-${CLEAN}.png"
done
```

자동 키프레임 검출(`-vf "select=eq(pict_type,I)"`)은 슬라이드 전환과 무관한 I-frame을 너무 많이 잡아 노이즈가 큼 → **수동 timestamp 권장**. sources의 `figures:` frontmatter에는 `strategy: keyframe`, `page` 대신 `timestamp` 키로 표기 (예: `timestamp: "03:12"`).
