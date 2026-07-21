import { access, copyFile, cp, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const exportRoot = path.join(projectRoot, "out");

await access(path.join(exportRoot, "index.html"));

const generatedDirectories = ["_next", "_not-found"];
const generatedFiles = [
  ".nojekyll",
  "404.html",
  "CNAME",
  "__next.__PAGE__.txt",
  "__next._full.txt",
  "__next._head.txt",
  "__next._index.txt",
  "__next._tree.txt",
  "_not-found.html",
  "_not-found.txt",
  "favicon.svg",
  "file.svg",
  "globe.svg",
  "index.html",
  "index.txt",
  "window.svg",
];

for (const directory of generatedDirectories) {
  const destination = path.join(projectRoot, directory);
  await rm(destination, { recursive: true, force: true });
  await cp(path.join(exportRoot, directory), destination, { recursive: true });
}

const exportEntries = new Set(await readdir(exportRoot));

for (const file of generatedFiles) {
  if (!exportEntries.has(file)) {
    throw new Error(`Static export is missing ${file}`);
  }

  await copyFile(path.join(exportRoot, file), path.join(projectRoot, file));
}

console.log("GitHub Pages export synchronized with the project root.");
