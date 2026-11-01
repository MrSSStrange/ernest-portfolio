import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { readGlb } from '../scripts/inspect-model.mjs';

test('Refined render asset retains every original control point and its bounds after runtime decoding', async () => {
  await MeshoptDecoder.ready;
  const source = readGlb('public/models/optimus-head.glb');
  const report = JSON.parse(fs.readFileSync('docs/model-compression.json'));
  const refined = readGlb(report.output);
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(report.output)).digest('hex'), report.sha256);
  assert.ok(refined.bytes < 1900000);
  assert.equal(refined.json.meshes[0].primitives.reduce((n, p) => n + refined.json.accessors[p.indices].count / 3, 0), 122508);
  for (let i = 0; i < source.json.meshes[0].primitives.length; i++) {
    const originalAccessor = source.json.accessors[source.json.meshes[0].primitives[i].attributes.POSITION];
    const originalView = source.json.bufferViews[originalAccessor.bufferView];
    const nextAccessor = refined.json.accessors[refined.json.meshes[0].primitives[i].attributes.POSITION];
    const nextView = refined.json.bufferViews[nextAccessor.bufferView], ext = nextView.extensions.EXT_meshopt_compression;
    const decoded = new Uint8Array(nextView.byteLength);
    MeshoptDecoder.decodeGltfBuffer(decoded, ext.count, ext.byteStride, refined.binary.subarray(ext.byteOffset, ext.byteOffset + ext.byteLength), ext.mode, ext.filter);
    assert.ok(source.binary.subarray(originalView.byteOffset, originalView.byteOffset + originalView.byteLength).equals(Buffer.from(decoded.subarray(0, originalView.byteLength))));
    assert.deepEqual(nextAccessor.min, originalAccessor.min);
    assert.deepEqual(nextAccessor.max, originalAccessor.max);
  }
});
