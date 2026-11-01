import fs from 'node:fs';
import { Matrix4, Vector3, Quaternion, Box3 } from 'three';

export function readGlb(file) {
  const data = fs.readFileSync(file);
  if (data.toString('ascii', 0, 4) !== 'glTF' || data.readUInt32LE(4) !== 2) throw new Error('Expected glTF 2.0 GLB');
  let json, binary;
  for (let pos = 12; pos < data.length;) {
    const length = data.readUInt32LE(pos);
    const type = data.readUInt32LE(pos + 4);
    const chunk = data.subarray(pos + 8, pos + 8 + length);
    if (type === 0x4e4f534a) json = JSON.parse(chunk.toString('utf8'));
    if (type === 0x004e4942) binary = chunk;
    pos += length + 8;
  }
  if (!json || !binary) throw new Error('Missing JSON/BIN chunk');
  return { json, binary, bytes: data.length };
}

export function worldNodes(json) {
  const parents = new Map();
  json.nodes.forEach((n, i) => n.children?.forEach(child => parents.set(child, i)));
  const cache = new Map();
  const matrix = i => {
    if (cache.has(i)) return cache.get(i);
    const n = json.nodes[i];
    const local = n.matrix ? new Matrix4().fromArray(n.matrix) : new Matrix4().compose(new Vector3(...(n.translation ?? [0, 0, 0])), new Quaternion(...(n.rotation ?? [0, 0, 0, 1])), new Vector3(...(n.scale ?? [1, 1, 1])));
    const world = parents.has(i) ? matrix(parents.get(i)).clone().multiply(local) : local;
    cache.set(i, world);
    return world;
  };
  return json.nodes.map((n, i) => {
    const box = new Box3();
    const mesh = json.meshes?.[n.mesh];
    let triangles = 0;
    mesh?.primitives.forEach(p => {
      const acc = json.accessors[p.attributes.POSITION];
      box.union(new Box3(new Vector3(...acc.min), new Vector3(...acc.max)).applyMatrix4(matrix(i)));
      triangles += (p.indices === undefined ? acc.count : json.accessors[p.indices].count) / 3;
    });
    return { index: i, name: n.name, mesh: n.mesh, children: n.children, triangles, min: box.isEmpty() ? undefined : box.min.toArray(), max: box.isEmpty() ? undefined : box.max.toArray(), matrix: matrix(i).toArray() };
  });
}

if (process.argv[1]?.endsWith('inspect-model.mjs')) {
  const file = process.argv[2] ?? 'assets/source/optimus/source/Tesla optimus.glb';
  const { json, bytes } = readGlb(file);
  console.log(JSON.stringify({ file, bytes, generator: json.asset, scenes: json.scenes, materials: json.materials, meshes: json.meshes?.map((m, i) => ({ index: i, name: m.name, primitives: m.primitives.map(p => ({ material: p.material, vertices: json.accessors[p.attributes.POSITION].count, triangles: (p.indices === undefined ? json.accessors[p.attributes.POSITION].count : json.accessors[p.indices].count) / 3, attributes: Object.keys(p.attributes) })) })), nodes: worldNodes(json), skins: json.skins?.length ?? 0, animations: json.animations?.length ?? 0, textures: json.textures?.length ?? 0 }, null, 2));
}
