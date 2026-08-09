// dates.mjs — wiki 페이지의 git "추가일"(최초 커밋일)을 배치로 수집.
//
// 홈 카드 정렬·NEW 뱃지의 최신 신호. 카탈로그(index.md) 순서는 관련 주제 옆에 끼워넣기
// 때문에 시간순이 아니므로, 정확한 "언제 추가됐나"는 git 이력에서만 얻는다.
//
// 주의: CI(actions/checkout)는 기본 shallow(depth 1)라 이력이 없다 → deploy.yml 에
// fetch-depth: 0 필요. 이력이 없으면 map 이 비어 호출측이 now 로 폴백한다.

import { spawnSync } from 'node:child_process';

const isWikiMd = (p) => p.startsWith('wiki/') && p.endsWith('.md');

// git log(--name-status) 출력을 파싱해 Map(현재 relPath → 최초 add ISO date) 반환.
// 커스텀 포맷 '@<ISO>' 줄이 커밋 경계, 그 아래 status 줄이 그 커밋의 변경.
//   'A\t<path>'            → 파일 추가
//   'R###\t<old>\t<new>'   → 재분류/이동(rename). --diff-filter=A 는 이걸 놓쳐
//                            새 경로가 now-fallback 되므로 여기서 명시적으로 승계한다.
// 커밋은 최신순이라 oldest→newest 로 뒤집어 순회하며 "최초 add일"을 채택하고,
// rename 시 옛 경로의 add일을 새 경로로 물려준다.
export function parseAddedLog(stdout) {
  const commits = [];
  let cur = null;
  for (const line of stdout.split('\n')) {
    if (line.startsWith('@')) {
      cur = { date: line.slice(1).trim(), ops: [] };
      commits.push(cur);
    } else if (cur && line) {
      const parts = line.split('\t');
      const status = parts[0];
      if (status === 'A' && isWikiMd(parts[1] || '')) {
        cur.ops.push({ t: 'A', path: parts[1] });
      } else if (status[0] === 'R' && isWikiMd(parts[2] || '')) {
        cur.ops.push({ t: 'R', old: parts[1], neo: parts[2] });
      }
    }
  }

  const map = new Map();
  for (let i = commits.length - 1; i >= 0; i--) {
    const { date, ops } = commits[i];
    for (const op of ops) {
      if (op.t === 'A') {
        if (!map.has(op.path)) map.set(op.path, date);
      } else {
        map.set(op.neo, map.get(op.old) || date); // 원래 add일 승계
        map.delete(op.old);
      }
    }
  }
  return map;
}

// root 저장소에서 wiki/**/*.md 의 추가일 Map(relPath → ISO)을 얻는다. 실패 시 빈 Map.
// --diff-filter=AR + --name-status 로 add 와 rename 을 함께 읽어, 재분류로 경로가 바뀐
// 파일도 최초 add일을 유지한다(그렇지 않으면 호출측에서 now 로 폴백돼 "최근 추가" 최상단에 뜬다).
export function addedDates(root) {
  const res = spawnSync(
    'git',
    ['log', '--diff-filter=AR', '-M', '--name-status', '--format=@%aI', '--', 'wiki'],
    { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
  );
  if (res.status !== 0 || !res.stdout) return new Map();
  return parseAddedLog(res.stdout);
}

// ── self-check: `node lib/dates.mjs --check` ──────────────────────────────────
if (process.argv[1] && process.argv[1].endsWith('dates.mjs') && process.argv.includes('--check')) {
  const assert = (await import('node:assert/strict')).default;
  const sample = [
    // 최신 커밋: old-paper 를 database→etc 로 재분류(rename) + new-overview 추가
    '@2026-07-05T10:00:00+09:00',
    'A\twiki/overviews/new-overview.md',
    'R099\twiki/database/old-paper.md\twiki/etc/old-paper.md',
    '',
    // 옛 커밋: old-paper 최초 add, README(=wiki 밖)는 무시
    '@2026-01-01T09:00:00+09:00',
    'A\twiki/database/old-paper.md',
    'A\tREADME.md',
  ].join('\n');
  const m = parseAddedLog(sample);
  assert.equal(m.get('wiki/overviews/new-overview.md'), '2026-07-05T10:00:00+09:00');
  // 재분류돼도 최초 add일(2026-01-01)을 새 경로가 승계한다
  assert.equal(m.get('wiki/etc/old-paper.md'), '2026-01-01T09:00:00+09:00');
  assert.equal(m.has('wiki/database/old-paper.md'), false); // 옛 경로는 제거
  assert.equal(m.has('README.md'), false);                  // wiki 밖 → 무시
  assert.equal(m.size, 2);
  console.log('dates.mjs self-check ✓');
}
