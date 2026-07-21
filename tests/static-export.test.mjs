import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

test("publishes the Android portfolio as a complete static export", async () => {
  const html = await readFile(path.join(projectRoot, "index.html"), "utf8");

  assert.match(html, /<title>Эрнест — Android Developer<\/title>/);
  assert.match(html, /Jetpack Compose/);
  assert.doesNotMatch(html, /Frontend Developer/);

  const assetPaths = new Set(
    [...html.matchAll(/(?:src|href)="(\/_next\/[^"?#]+)["?#]/g)].map(
      ([, assetPath]) => assetPath,
    ),
  );

  assert.ok(assetPaths.size > 0, "static HTML must reference Next.js assets");

  for (const assetPath of assetPaths) {
    await access(path.join(projectRoot, assetPath.slice(1)));
  }

  assert.equal(
    (await readFile(path.join(projectRoot, "CNAME"), "utf8")).trim(),
    "ernestmuzafarov.tech",
  );
});
