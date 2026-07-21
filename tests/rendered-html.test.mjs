import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();

  assert.match(html, developmentPreviewMeta);
  assert.match(html, /Эрнест — Android Developer/);
  assert.match(html, /Jetpack Compose/);
  assert.match(html, /https:\/\/github\.com\/MrSSStrange/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/ernest-muzafarov-919a323a2/);
  assert.doesNotMatch(html, /@gmail\.|formsubmit|mailto:/i);
  assert.doesNotMatch(html, /<form\b/i);
  assert.doesNotMatch(html, /Макет формы работает/);
  assert.doesNotMatch(html, /Frontend Developer/);
});
