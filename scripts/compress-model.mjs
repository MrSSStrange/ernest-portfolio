import fs from 'node:fs';
import crypto from 'node:crypto';
import { MeshoptEncoder } from 'meshoptimizer';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { readGlb } from './inspect-model.mjs';

const input = 'outputs/optimus-head-surface.glb';
const output = 'public/models/optimus-head-smooth-v2.glb';
const { json, binary, bytes } = readGlb(input);
await Promise.all([MeshoptEncoder.ready, MeshoptDecoder.ready]);
const chunks = []; let offset = 0;
const dimensions = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 };
for (let i = 0; i < json.bufferViews.length; i++) {
  const view = json.bufferViews[i];
  const accessor = json.accessors.find(a => a.bufferView === i);
  const stride = dimensions[accessor.type] * (accessor.componentType === 5123 ? 2 : 4);
  const mode = view.target === 34963 ? 'INDICES' : 'ATTRIBUTES';
  const data = binary.subarray(view.byteOffset ?? 0, (view.byteOffset ?? 0) + view.byteLength);
  const encoded = MeshoptEncoder.encodeGltfBuffer(data, accessor.count, stride, mode, 0);
  const check = new Uint8Array(view.byteLength);
  MeshoptDecoder.decodeGltfBuffer(check, accessor.count, stride, encoded, mode, 'NONE');
  if (!data.equals(Buffer.from(check))) throw new Error(`Lossless runtime decode check failed: ${i}`);
  const pad = (4 - offset % 4) % 4;
  if (pad) { chunks.push(Buffer.alloc(pad)); offset += pad; }
  view.buffer = 1;
  view.extensions = { EXT_meshopt_compression: { buffer: 0, byteOffset: offset, byteLength: encoded.length, byteStride: stride, count: accessor.count, mode, filter: 'NONE' } };
  chunks.push(Buffer.from(encoded)); offset += encoded.length;
}
json.buffers = [{ byteLength: offset }, { byteLength: binary.length, extensions: { EXT_meshopt_compression: { fallback: true } } }];
json.extensionsUsed = [...new Set([...(json.extensionsUsed ?? []), 'EXT_meshopt_compression'])];
json.extensionsRequired = [...new Set([...(json.extensionsRequired ?? []), 'EXT_meshopt_compression'])];
json.extras.changes += ' Lossless meshopt compression; decoded buffers verified against the uncompressed surface using the runtime decoder.';
const rawJSON = Buffer.from(JSON.stringify(json)), rawBIN = Buffer.concat(chunks);
const j = Buffer.concat([rawJSON, Buffer.alloc((4 - rawJSON.length % 4) % 4, 32)]), b = Buffer.concat([rawBIN, Buffer.alloc((4 - rawBIN.length % 4) % 4)]);
const h = Buffer.alloc(12), jh = Buffer.alloc(8), bh = Buffer.alloc(8);
h.write('glTF'); h.writeUInt32LE(2, 4); h.writeUInt32LE(28 + j.length + b.length, 8); jh.writeUInt32LE(j.length); jh.writeUInt32LE(0x4e4f534a, 4); bh.writeUInt32LE(b.length); bh.writeUInt32LE(0x004e4942, 4);
const file = Buffer.concat([h, jh, j, bh, b]); fs.writeFileSync(output, file);
const report = { input, output, uncompressedBytes: bytes, bytes: file.length, reductionPercent: +(100 * (1 - file.length / bytes)).toFixed(1), losslessDecodeVerified: true, sha256: crypto.createHash('sha256').update(file).digest('hex') };
fs.writeFileSync('docs/model-compression.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
