import fs from 'node:fs';
import crypto from 'node:crypto';
import { readGlb, worldNodes } from './inspect-model.mjs';

const source = 'assets/source/optimus/source/Tesla optimus.glb';
const output = 'public/models/optimus-head.glb';
const { json: original, binary, bytes } = readGlb(source);
if (original.nodes.length !== 1 || original.meshes.length !== 1 || original.skins?.length || original.textures?.length) throw new Error('Source layout changed. Inspect before exporting.');
const names = ['Head', 'Lights', 'Face'];
const selected = original.meshes[0].primitives.filter(p => names.includes(original.materials[p.material].name));
if (selected.length !== 3) throw new Error('Expected three original head/neck material groups.');
// Select existing material groups, including the continuous neck/shoulder base in Head.
// This neither remeshes nor cuts triangles. Every selected vertex/normal/index is copied byte for byte.
const materialIds = [...new Set(selected.map(p => p.material))];
const accessorIds = [...new Set(selected.flatMap(p => [...Object.values(p.attributes), p.indices]))];
const viewIds = [...new Set(accessorIds.map(i => original.accessors[i].bufferView))];
const accessorMap = new Map(accessorIds.map((id, i) => [id, i]));
const viewMap = new Map(viewIds.map((id, i) => [id, i]));
const segments = [];
let position = 0;
const bufferViews = viewIds.map(id => {
  const view = original.bufferViews[id];
  const padding = (4 - position % 4) % 4;
  if (padding) { segments.push(Buffer.alloc(padding)); position += padding; }
  const bytes = binary.subarray(view.byteOffset ?? 0, (view.byteOffset ?? 0) + view.byteLength);
  const packed = { ...view, buffer: 0, byteOffset: position };
  segments.push(bytes); position += bytes.length;
  return packed;
});
const json = {
  asset: { version: '2.0', generator: 'Ernest Lab: lossless extraction of original material groups', copyright: 'Tesla optimus by Mechamaner.V / CC BY 4.0' },
  scene: 0, scenes: [{ name: 'Optimus head and neck', nodes: [0] }],
  nodes: [{ ...original.nodes[0], name: 'Optimus_Head_Neck', mesh: 0 }],
  meshes: [{ name: 'Original_Head_Lights_Face', primitives: selected.map(p => ({ ...p, material: materialIds.indexOf(p.material), attributes: Object.fromEntries(Object.entries(p.attributes).map(([k, v]) => [k, accessorMap.get(v)])), indices: accessorMap.get(p.indices) })) }],
  materials: materialIds.map(id => original.materials[id]),
  accessors: accessorIds.map(id => ({ ...original.accessors[id], bufferView: viewMap.get(original.accessors[id].bufferView) })),
  bufferViews, buffers: [{ byteLength: position }],
  extensionsUsed: original.extensionsUsed,
  extras: { author: 'Mechamaner.V', source: 'https://sketchfab.com/3d-models/tesla-optimus-2fab5d31927f43729a99a6e8eaf1c7f5', license: 'https://creativecommons.org/licenses/by/4.0/', changes: 'Extracted the existing Head, Lights and Face material groups. No vertex, normal, UV or triangle changes. Studio material tuning is applied at runtime.' },
};
const jsonRaw = Buffer.from(JSON.stringify(json));
const jsonPadded = Buffer.concat([jsonRaw, Buffer.alloc((4 - jsonRaw.length % 4) % 4, 0x20)]);
const binRaw = Buffer.concat(segments);
const binPadded = Buffer.concat([binRaw, Buffer.alloc((4 - binRaw.length % 4) % 4)]);
const header = Buffer.alloc(12); header.write('glTF'); header.writeUInt32LE(2, 4); header.writeUInt32LE(28 + jsonPadded.length + binPadded.length, 8);
const jsonHeader = Buffer.alloc(8); jsonHeader.writeUInt32LE(jsonPadded.length); jsonHeader.writeUInt32LE(0x4e4f534a, 4);
const binHeader = Buffer.alloc(8); binHeader.writeUInt32LE(binPadded.length); binHeader.writeUInt32LE(0x004e4942, 4);
const packed = Buffer.concat([header, jsonHeader, jsonPadded, binHeader, binPadded]);
fs.writeFileSync(output, packed);
const check = readGlb(output);
for (let i = 0; i < viewIds.length; i++) {
  const old = original.bufferViews[viewIds[i]], next = check.json.bufferViews[i];
  if (!binary.subarray(old.byteOffset ?? 0, (old.byteOffset ?? 0) + old.byteLength).equals(check.binary.subarray(next.byteOffset, next.byteOffset + next.byteLength))) throw new Error('Lossless geometry check failed');
}
const report = { source, output, originalBytes: bytes, outputBytes: packed.length, reductionPercent: +(100 * (1 - packed.length / bytes)).toFixed(1), sourceSha256: crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex'), outputSha256: crypto.createHash('sha256').update(packed).digest('hex'), triangles: check.json.meshes[0].primitives.reduce((sum, p) => sum + check.json.accessors[p.indices].count / 3, 0), materials: check.json.materials.map(m => m.name), textureCount: 0, geometryByteIdentical: true, bounds: worldNodes(check.json).map(({ min, max }) => ({ min, max })) };
fs.writeFileSync('docs/model-preparation.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
