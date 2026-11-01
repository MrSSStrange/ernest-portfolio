import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { readGlb } from '../scripts/inspect-model.mjs';

test('The original extracted licensed GLB remains intact, with its geometry groups', () => {
  const report = JSON.parse(fs.readFileSync('docs/model-preparation.json'));
  const file = fs.readFileSync(report.output);
  assert.equal(crypto.createHash('sha256').update(file).digest('hex'), report.outputSha256);
  const { json } = readGlb(report.output);
  assert.deepEqual(json.materials.map(m => m.name), ['Head', 'Lights', 'Face']);
  assert.equal(json.meshes[0].primitives.reduce((n, p) => n + json.accessors[p.indices].count / 3, 0), 13612);
  assert.ok(file.length < 350000);
  assert.match(json.asset.copyright, /Mechamaner.V.*CC BY 4.0/);
  assert.equal(report.geometryByteIdentical, true);
});

test('Exported accessors exactly match their original source bytes when original archive is present', { skip: !fs.existsSync('assets/source/optimus/source/Tesla optimus.glb') }, () => {
  const source = readGlb('assets/source/optimus/source/Tesla optimus.glb');
  const output = readGlb('public/models/optimus-head.glb');
  const primitives = source.json.meshes[0].primitives.filter(p => ['Head', 'Lights', 'Face'].includes(source.json.materials[p.material].name));
  const raw = (model, index) => { const a = model.json.accessors[index], v = model.json.bufferViews[a.bufferView]; return model.binary.subarray(v.byteOffset ?? 0, (v.byteOffset ?? 0) + v.byteLength); };
  primitives.forEach((p, i) => {
    const next = output.json.meshes[0].primitives[i];
    assert.ok(raw(source, p.indices).equals(raw(output, next.indices)));
    for (const key of Object.keys(p.attributes)) assert.ok(raw(source, p.attributes[key]).equals(raw(output, next.attributes[key])));
  });
});
