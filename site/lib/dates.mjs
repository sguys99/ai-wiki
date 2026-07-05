// dates.mjs — wiki 페이지의 git "추가일"(최초 커밋일)을 배치로 수집.
//
// 홈 카드 정렬·NEW 뱃지의 최신 신호. 카탈로그(index.md) 순서는 관련 주제 옆에 끼워넣기
// 때문에 시간순이 아니므로, 정확한 "언제 추가됐나"는 git 이력에서만 얻는다.
//
// 주의: CI(actions/checkout)는 기본 shallow(depth 1)라 이력이 없다 → deploy.yml 에
// fetch-depth: 0 필요. 이력이 없으면 map 이 비어 호출측이 now 로 폴백한다.

import { spawnSync } from 'node:child_process';

// git log 출력(최신 커밋 우선)을 파싱해 Map(relPath → ISO date) 반환.
// 커스텀 포맷 '@<ISO>' 줄이 커밋 경계, 그 아래 파일 경로 줄들이 그 커밋에서 add 된 파일.
// 각 파일이 "처음 등장"(=가장 최근 add)한 날짜를 채택한다.
export function parseAddedLog(stdout) {
  const map = new Map();
  let date = null;
  for (const line of stdout.split('\n')) {
    if (line.startsWith('@')) {
      date = line.slice(1).trim();
    } else if (line.startsWith('wiki/') && line.endsWith('.md')) {
      if (date && !map.has(line)) map.set(line, date);
    }
  }
  return map;
}

// root 저장소에서 wiki/**/*.md 의 추가일 Map(relPath → ISO)을 얻는다. 실패 시 빈 Map.
export function addedDates(root) {
  const res = spawnSync(
    'git',
    ['log', '--diff-filter=A', '--format=@%aI', '--name-only', '--', 'wiki'],
    { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
  );
  if (res.status !== 0 || !res.stdout) return new Map();
  return parseAddedLog(res.stdout);
}

// ── self-check: `node lib/dates.mjs --check` ──────────────────────────────────
if (process.argv[1] && process.argv[1].endsWith('dates.mjs') && process.argv.includes('--check')) {
  const assert = (await import('node:assert/strict')).default;
  const sample = [
    '@2026-07-05T10:00:00+09:00',
    'wiki/overviews/new-overview.md',
    'wiki/database/new-paper.md',
    '',
    '@2026-01-01T09:00:00+09:00',
    'wiki/database/old-paper.md',
    'wiki/database/new-paper.md', // 오래된 커밋에도 등장하지만 최신이 우선 → 무시
    'README.md',                  // wiki 밖 → 무시
  ].join('\n');
  const m = parseAddedLog(sample);
  assert.equal(m.get('wiki/overviews/new-overview.md'), '2026-07-05T10:00:00+09:00');
  assert.equal(m.get('wiki/database/new-paper.md'), '2026-07-05T10:00:00+09:00'); // 최신 add 채택
  assert.equal(m.get('wiki/database/old-paper.md'), '2026-01-01T09:00:00+09:00');
  assert.equal(m.has('README.md'), false);
  assert.equal(m.size, 3);
  console.log('dates.mjs self-check ✓');
}
