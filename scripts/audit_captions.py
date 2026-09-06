#!/usr/bin/env python3
"""figures caption 정비 대상 계량.

sources/ 와 wiki/ 의 frontmatter figures[].caption 을 검사한다.
  - banned  : 중간점(·) 또는 em dash(—) 포함
  - english : 한글이 한 글자도 없음
  - dup     : 같은 파일 안에서 같은 caption 이 2회 이상
"""
import re, sys, pathlib, collections

ROOT = pathlib.Path(__file__).resolve().parent.parent
HANGUL = re.compile(r"[가-힣]")
CAP = re.compile(r'^\s+caption:\s*(.*)$')


def captions(path):
    lines = path.read_text(encoding="utf-8").splitlines()
    if not lines or lines[0].strip() != "---":
        return []
    out = []
    for i, line in enumerate(lines[1:], start=2):
        if line.strip() == "---":
            break
        m = CAP.match(line)
        if m:
            out.append((i, m.group(1).strip().strip('"').strip("'")))
    return out


def audit(paths):
    rows = []
    for p in paths:
        caps = captions(p)
        counts = collections.Counter(c for _, c in caps)
        for ln, c in caps:
            kinds = []
            if "·" in c or "—" in c:
                kinds.append("banned")
            if not HANGUL.search(c):
                kinds.append("english")
            if counts[c] > 1:
                kinds.append("dup")
            if kinds:
                rows.append((p, ln, ",".join(kinds), c))
    return rows


def main():
    args = sys.argv[1:]
    if args and args[0] != "--all":
        paths = [pathlib.Path(a) for a in args]
    else:
        paths = sorted(ROOT.glob("sources/*.md")) + sorted(ROOT.glob("wiki/**/*.md"))
    rows = audit(paths)
    tally = collections.Counter()
    for p, ln, kinds, c in rows:
        for k in kinds.split(","):
            tally[k] += 1
        if len(args) and args[0] != "--all":
            print(f"{p}:{ln}: [{kinds}] {c[:100]}")
    print(f"caption 정비 대상 {len(rows)}건 "
          f"(금지 기호 {tally['banned']}, 영어 전용 {tally['english']}, 중복 {tally['dup']})")


if __name__ == "__main__":
    main()
