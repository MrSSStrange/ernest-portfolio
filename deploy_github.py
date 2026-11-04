"""Publish dist to the existing gh-pages history without changing the source index."""
from pathlib import Path
import argparse
import json
import os
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parent


def git(*args, env=None, cwd=ROOT, input=None):
    result = subprocess.run(['git', *args], cwd=cwd, env=env, input=input,
                            text=True, stdout=subprocess.PIPE, check=True)
    return result.stdout.strip()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--skip-build', action='store_true', help='Use an already verified, current dist build.')
    args = parser.parse_args()
    if git('status', '--porcelain', '--untracked-files=no'):
        raise SystemExit('Commit the source changes before deploying.')
    if not args.skip_build:
        subprocess.run([sys.executable, str(ROOT / 'build.py')], cwd=ROOT, check=True)
        if git('status', '--porcelain', '--untracked-files=no'):
            raise SystemExit('The build changed tracked output. Commit it before deploying.')
    dist = ROOT / 'dist'
    for name in ['index.html', 'Ernest-Muzafarov-CV.pdf', 'CNAME', '.nojekyll']:
        if not (dist / name).is_file():
            raise SystemExit('Missing deployment file: ' + name)
    git('fetch', 'origin', 'gh-pages')
    parent = git('rev-parse', 'refs/remotes/origin/gh-pages')
    source = git('rev-parse', 'HEAD')
    git_dir = git('rev-parse', '--absolute-git-dir')
    with tempfile.TemporaryDirectory(prefix='ernest-pages-') as temp_dir:
        env = dict(os.environ, GIT_INDEX_FILE=str(Path(temp_dir) / 'index'))
        git('read-tree', '--empty', env=env)
        git('--git-dir=' + git_dir, '--work-tree=' + str(dist), 'add', '--all', '--force', '--', '.', cwd=dist, env=env)
        tree = git('write-tree', env=env)
        if tree == git('rev-parse', parent + '^{tree}'):
            print(json.dumps({'status': 'unchanged', 'commit': parent, 'source': source}))
            return
        commit = git('commit-tree', tree, '-p', parent, input='Deploy GSAP portfolio from ' + source[:12] + '\n', env=env)
    git('-c', 'credential.helper=', '-c', 'credential.helper=!gh auth git-credential',
        'push', 'origin', commit + ':refs/heads/gh-pages')
    print(json.dumps({'status': 'pushed', 'commit': commit, 'source': source,
                      'url': 'https://ernestmuzafarov.tech/'}))


if __name__ == '__main__':
    main()
