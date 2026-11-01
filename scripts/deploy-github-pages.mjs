import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const repository = 'https://github.com/MrSSStrange/ernest-portfolio.git';
const branch = 'gh-pages';
const run = (args, cwd = root, capture = false) => {
  const result = spawnSync(args[0], args.slice(1), { cwd, encoding: 'utf8', stdio: capture ? 'pipe' : 'inherit' });
  if (result.status !== 0) throw new Error(`${args[0]} ${args[1]} failed (${result.status})${capture ? `: ${result.stderr}` : ''}`);
  return (result.stdout ?? '').trim();
};
const origin = run(['git', 'remote', 'get-url', 'origin'], root, true);
if (!/^https:\/\/github\.com\/MrSSStrange\/ernest-portfolio(?:\.git)?$|^git@github\.com:MrSSStrange\/ernest-portfolio(?:\.git)?$/.test(origin)) throw new Error('Run from the ernest-portfolio checkout with its original GitHub origin.');
if (run(['git', 'status', '--porcelain'], root, true)) throw new Error('Commit the source changes before publishing.');
if (!process.argv.includes('--skip-build')) { run(['npm', 'test']); run(['npm', 'run', 'build']); }
const dist = join(root, 'dist');
if (!existsSync(join(dist, 'index.html'))) throw new Error('Build output is missing.');
const sourceCommit = run(['git', 'rev-parse', 'HEAD'], root, true);
const staging = mkdtempSync(join(tmpdir(), 'ernest-pages-'));
try {
  const remote = run(['git', 'ls-remote', '--heads', repository, branch], root, true);
  if (remote) run(['git', 'clone', '--depth', '1', '--single-branch', '--branch', branch, repository, staging]);
  else { run(['git', 'init', '--initial-branch', branch, staging]); run(['git', 'remote', 'add', 'origin', repository], staging); }
  for (const name of readdirSync(staging)) if (name !== '.git') rmSync(join(staging, name), { recursive: true, force: true });
  cpSync(dist, staging, { recursive: true });
  if (!existsSync(join(staging, 'index.html'))) throw new Error('Release root is missing index.html.');
  writeFileSync(join(staging, '.nojekyll'), '');
  writeFileSync(join(staging, 'CNAME'), 'ernestmuzafarov.tech\n');
  writeFileSync(join(staging, 'release.json'), JSON.stringify({ sourceCommit, repository: 'MrSSStrange/ernest-portfolio', builtAt: new Date().toISOString() }, null, 2)+'\n');
  const authorName = run(['git', 'config', 'user.name'], root, true);
  const authorEmail = run(['git', 'config', 'user.email'], root, true);
  run(['git', 'config', 'user.name', authorName], staging);
  run(['git', 'config', 'user.email', authorEmail], staging);
  run(['git', 'add', '--all'], staging);
  run(['git', 'commit', '-m', `Deploy Ernest Lab ${sourceCommit.slice(0, 12)}`], staging);
  const releaseCommit = run(['git', 'rev-parse', 'HEAD'], staging, true);
  run(['git', 'push', 'origin', `HEAD:${branch}`], staging);
  console.log(JSON.stringify({ sourceCommit, releaseCommit, branch, url: 'https://ernestmuzafarov.tech/' }));
} finally { rmSync(staging, { recursive: true, force: true }); }
