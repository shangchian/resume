import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
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
}

test("server-renders the resume builder shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /資料驅動履歷工具/);
  assert.match(html, /Flutter App \/ REST 後端 \/ 全端工程師/);
  assert.match(html, /凡立橙股份有限公司/);
  assert.match(html, /銳宇能源股份有限公司/);
  assert.match(html, /哈瑪星科技股份有限公司/);
  assert.match(html, /圓展科技股份有限公司/);
  assert.match(html, /高琪系統整合有限公司/);
  assert.match(html, /成功大學資訊工程系/);
  assert.match(html, /華碩電腦股份有限公司/);
  assert.match(html, /芯鼎科技股份有限公司/);
  assert.match(html, /作品集佐證|精選作品/);
  assert.match(html, /Bitbucket Pipeline CI\/CD/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});
