import fs from 'node:fs';
import crypto from 'node:crypto';
import { readGlb } from './inspect-model.mjs';

// Refine the licensed source's curved patches. All original control vertices stay fixed.
// Phong interpolation fills between those points; no robot parts are created or replaced.
const source = 'public/models/optimus-head.glb';
const output = 'outputs/optimus-head-surface.glb';
fs.mkdirSync('outputs', { recursive: true });
const { json: original, binary } = readGlb(source);
const divisions = 3;
const json = structuredClone(original);
json.accessors = []; json.bufferViews = [];
const chunks = []; let offset = 0;
const components = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 };
const get = index => {
  const a = original.accessors[index], v = original.bufferViews[a.bufferView];
  const T = { 5126: Float32Array, 5123: Uint16Array, 5125: Uint32Array }[a.componentType];
  return Array.from(new T(binary.buffer, binary.byteOffset + (v.byteOffset ?? 0) + (a.byteOffset ?? 0), a.count * components[a.type]));
};
const push = (values, type, index = false) => {
  const T = index ? (values.some(x => x > 65535) ? Uint32Array : Uint16Array) : Float32Array;
  const data = Buffer.from(new T(values).buffer), pad = (4 - offset % 4) % 4;
  if (pad) { chunks.push(Buffer.alloc(pad)); offset += pad; }
  const viewIndex = json.bufferViews.push({ buffer: 0, byteOffset: offset, byteLength: data.length, target: index ? 34963 : 34962 }) - 1;
  chunks.push(data); offset += data.length;
  const item = { bufferView: viewIndex, componentType: index ? (T === Uint32Array ? 5125 : 5123) : 5126, count: values.length / components[type], type };
  if (type === 'VEC3' && !index) { item.min = [0, 1, 2].map(d => Math.min(...values.filter((_, i) => i % 3 === d))); item.max = [0, 1, 2].map(d => Math.max(...values.filter((_, i) => i % 3 === d))); }
  return json.accessors.push(item) - 1;
};
const summary = [];
json.meshes[0].primitives = original.meshes[0].primitives.map((primitive, materialIndex) => {
  const positions = get(primitive.attributes.POSITION), normals = get(primitive.attributes.NORMAL), uv = get(primitive.attributes.TEXCOORD_0), indices = get(primitive.indices);
  const outP = [...positions], outN = [...normals], outUV = [...uv], outI = [], cache = new Map();
  const limits = original.accessors[primitive.attributes.POSITION];
  let maxDeviation = 0;
  for (let triangle = 0; triangle < indices.length; triangle += 3) {
    const ids = indices.slice(triangle, triangle + 3);
    const points = ids.map(id => positions.slice(id * 3, id * 3 + 3));
    const ns = ids.map(id => normals.slice(id * 3, id * 3 + 3));
    const smooth = Math.min(...[0, 1, 2].map(k => ns[k].reduce((s, v, d) => s + v * ns[(k + 1) % 3][d], 0))) > 0.65;
    const vertex = (i, j) => {
      const weights = [divisions - i - j, i, j];
      const originalVertex = weights.findIndex(w => w === divisions);
      if (originalVertex >= 0) return ids[originalVertex];
      const edge = weights.map((w, k) => [ids[k], w]).filter(([, w]) => w > 0).sort((a, b) => a[0] - b[0]);
      const key = edge.length === 2 ? edge.map(v => v.join(':')).join('|') : `${triangle}:${i}:${j}`;
      if (cache.has(key)) return cache.get(key);
      const b = weights.map(w => w / divisions);
      const linear = [0, 1, 2].map(d => points.reduce((s, p, k) => s + p[d] * b[k], 0));
      const curved = [0, 1, 2].map(d => points.reduce((s, p, k) => {
        const projection = ns[k].reduce((sum, n, axis) => sum + (linear[axis] - p[axis]) * n, 0);
        return s + (linear[d] - ns[k][d] * projection) * b[k];
      }, 0));
      const point = linear.map((v, d) => Math.max(limits.min[d], Math.min(limits.max[d], v + (smooth ? 0.9 : 0) * (curved[d] - v))));
      maxDeviation = Math.max(maxDeviation, Math.hypot(...point.map((v, d) => v - linear[d])));
      const normal = [0, 1, 2].map(d => ns.reduce((s, n, k) => s + n[d] * b[k], 0));
      const length = Math.hypot(...normal) || 1;
      const id = outP.length / 3; outP.push(...point); outN.push(...normal.map(v => v / length));
      outUV.push(...[0, 1].map(d => ids.reduce((s, sourceId, k) => s + uv[sourceId * 2 + d] * b[k], 0)));
      cache.set(key, id); return id;
    };
    for (let i = 0; i < divisions; i++) for (let j = 0; j < divisions - i; j++) {
      outI.push(vertex(i, j), vertex(i + 1, j), vertex(i, j + 1));
      if (i + j < divisions - 1) outI.push(vertex(i + 1, j), vertex(i + 1, j + 1), vertex(i, j + 1));
    }
  }
  summary.push({ material: original.materials[materialIndex].name, originalVertices: positions.length / 3, outputVertices: outP.length / 3, triangles: outI.length / 3, maxInterpolationOffset: maxDeviation, originalControlVerticesUnchanged: outP.slice(0, positions.length).every((v, i) => v === positions[i]) });
  return { ...primitive, attributes: { POSITION: push(outP, 'VEC3'), NORMAL: push(outN, 'VEC3'), TEXCOORD_0: push(outUV, 'VEC2') }, indices: push(outI, 'SCALAR', true) };
});
json.asset.generator = 'Ernest Lab: Phong surface refinement of the licensed Optimus asset';
json.extras.changes += ' Curved patches subdivided 3x with Phong interpolation for close-up rendering. All original control vertices and original bounds are retained.';
json.buffers = [{ byteLength: offset }];
const rawJSON = Buffer.from(JSON.stringify(json)), rawBIN = Buffer.concat(chunks);
const j = Buffer.concat([rawJSON, Buffer.alloc((4 - rawJSON.length % 4) % 4, 32)]), b = Buffer.concat([rawBIN, Buffer.alloc((4 - rawBIN.length % 4) % 4)]);
const header = Buffer.alloc(12), jh = Buffer.alloc(8), bh = Buffer.alloc(8);
header.write('glTF'); header.writeUInt32LE(2, 4); header.writeUInt32LE(28 + j.length + b.length, 8);
jh.writeUInt32LE(j.length); jh.writeUInt32LE(0x4e4f534a, 4); bh.writeUInt32LE(b.length); bh.writeUInt32LE(0x004e4942, 4);
const file = Buffer.concat([header, jh, j, bh, b]); fs.writeFileSync(output, file);
const report = { source, output, bytes: file.length, triangles: summary.reduce((s, p) => s + p.triangles, 0), divisions, originalControlVerticesUnchanged: summary.every(p => p.originalControlVerticesUnchanged), originalBoundsRetained: true, sha256: crypto.createHash('sha256').update(file).digest('hex'), primitives: summary };
fs.writeFileSync('docs/model-smoothing.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
