import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root = 'dist';
const pages = ['', 'journal/ai-agent', 'journal/robot-perception', 'journal/optimus-evolution', 'credits', 'model-review'];
for (const page of pages) {
  const html = fs.readFileSync(path.join(root,page,'index.html'),'utf8');
  assert.match(html, /<link rel="canonical" href="https:\/\/ernestmuzafarov\.tech\//);
  assert.match(html, /property="og:title"/);
  for (const [,src] of html.matchAll(/(?:src|href)="(\/(?:assets|favicon)[^"]*)"/g)) {
    assert.ok(fs.existsSync(path.join(root,src.split('?')[0])), `Missing asset: ${src}`);
  }
}
for (const file of ['404.html','sitemap.xml','robots.txt','.nojekyll','CNAME','video/robotics-loop.mp4','models/optimus-head-smooth-v2.glb','images/ernest-logo.png','images/ernest-portrait-small.png','images/projects/supportdesk.jpg','images/projects/appointments.jpg']) assert.ok(fs.existsSync(path.join(root,file)), `Missing release file: ${file}`);
assert.equal(fs.readFileSync('dist/CNAME','utf8').trim(),'ernestmuzafarov.tech');
assert.match(fs.readFileSync('dist/404.html','utf8'),/name="robots" content="noindex"/);
assert.ok(fs.statSync('dist/video/robotics-loop.mp4').size > 1000000);
console.log('Release verified: routes, metadata, model, video, identity and project covers.');
