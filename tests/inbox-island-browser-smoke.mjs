import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";
import { strict as assert } from "node:assert";

const chrome = process.env.CHROME_PATH || [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  join(homedir(), "Applications/Google Chrome.app/Contents/MacOS/Google Chrome"),
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find(existsSync);
if (!chrome) throw new Error("Chrome/Chromium not found. Set CHROME_PATH.");
const origin = process.env.SITE_ORIGIN || "http://127.0.0.1:4174";
const proofDir = mkdtempSync(join(tmpdir(), "inbox-island-site-proof-"));
const keepProof = process.env.KEEP_BROWSER_PROOF === "1";

const freePort = await new Promise((resolve, reject) => {
  const server = createServer();
  server.once("error", reject);
  server.listen(0, "127.0.0.1", () => {
    const { port } = server.address();
    server.close(() => resolve(port));
  });
});

const browser = spawn(chrome, [
  "--headless=new",
  "--disable-background-networking",
  "--hide-scrollbars",
  `--remote-debugging-port=${freePort}`,
  `--user-data-dir=${join(proofDir, "profile")}`,
  "about:blank",
], { stdio: "ignore" });

async function waitForJson(url) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("Chrome DevTools did not become ready");
}

let socket;
try {
  await waitForJson(`http://127.0.0.1:${freePort}/json/version`);
  const page = await fetch(`http://127.0.0.1:${freePort}/json/new?about:blank`, {
    method: "PUT",
  }).then((response) => response.json());
  socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  let commandId = 0;
  const pending = new Map();
  const waiters = new Map();
  const exceptions = [];
  const loadFailures = [];
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id) {
      const task = pending.get(message.id);
      if (!task) return;
      pending.delete(message.id);
      if (message.error) task.reject(new Error(message.error.message));
      else task.resolve(message.result);
      return;
    }
    if (message.method === "Runtime.exceptionThrown") exceptions.push(message.params.exceptionDetails.text);
    if (message.method === "Network.loadingFailed") loadFailures.push(message.params.errorText);
    const listeners = waiters.get(message.method);
    if (!listeners) return;
    waiters.delete(message.method);
    listeners.forEach((resolve) => resolve(message.params));
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++commandId;
    pending.set(id, { reject, resolve });
    socket.send(JSON.stringify({ id, method, params }));
  });
  const waitFor = (method) => new Promise((resolve) => {
    const listeners = waiters.get(method) || [];
    listeners.push(resolve);
    waiters.set(method, listeners);
  });
  const evaluate = async (expression) => {
    const result = await send("Runtime.evaluate", { expression, returnByValue: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
    return result.result.value;
  };
  const navigate = async (url) => {
    const loaded = waitFor("Page.loadEventFired");
    await send("Page.navigate", { url });
    await loaded;
  };

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");
  for (const [width, height, label] of [[390, 844, "mobile"], [1440, 1000, "desktop"]]) {
    await send("Emulation.setDeviceMetricsOverride", {
      width, height, deviceScaleFactor: 1, mobile: width <= 480,
    });
    for (const [route, kind] of [["/", "home"], ["/privacy/", "privacy"]]) {
      await navigate(`${origin}${route}`);
      const metrics = await evaluate(`(() => ({
        title: document.title,
        heading: document.querySelector("h1")?.textContent.replace(/\\s+/g, " ").trim(),
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        sourceLinks: [...document.querySelectorAll("a")].filter((node) => node.href === "https://github.com/clawSean/inbox-island").length,
        supportLinks: [...document.querySelectorAll("a")].filter((node) => node.href === "https://github.com/clawSean/inbox-island/issues").length,
        background: getComputedStyle(document.body).backgroundColor,
        stylesheet: [...document.styleSheets].map((sheet) => sheet.href).filter(Boolean),
        draft: document.body.textContent.includes("DRAFT FOR PRIVATE PILOT"),
        effective: document.body.textContent.includes("EFFECTIVE OCTOBER 22, 2026")
      }))()`);
      assert.equal(metrics.innerWidth, width, `${kind} ${label} viewport is exact`);
      assert.ok(metrics.scrollWidth <= width, `${kind} ${label} has no horizontal overflow`);
      assert.equal(metrics.background, "rgb(244, 240, 223)", `${kind} ${label} uses Inbox Island styling`);
      assert.ok(metrics.stylesheet.some((href) => href === `${origin}/styles.css`),
        `${kind} ${label} loads the canonical stylesheet`);
      assert.ok(metrics.sourceLinks >= 1, `${kind} ${label} links public source`);
      assert.equal(metrics.draft, false, `${kind} ${label} has no draft policy language`);
      if (kind === "home") assert.match(metrics.heading, /Find the mail that matters/u);
      else {
        assert.equal(metrics.heading, "Your mail is not our business.");
        assert.equal(metrics.effective, true);
        assert.ok(metrics.supportLinks >= 1, `${kind} ${label} links support`);
      }
      if (keepProof) {
        const capture = await send("Page.captureScreenshot", { format: "png", fromSurface: true });
        writeFileSync(join(proofDir, `${kind}-${label}.png`), Buffer.from(capture.data, "base64"));
      }
    }
  }
  assert.deepEqual(exceptions, [], `no browser exceptions: ${exceptions.join(", ")}`);
  assert.deepEqual(loadFailures.filter((failure) => !/ERR_ABORTED/u.test(failure)), [],
    `no failed resources: ${loadFailures.join(", ")}`);
  console.log("Inbox Island browser smoke: PASS (390, 1440; product + privacy)");
  if (keepProof) console.log(`Proof screenshots: ${proofDir}`);
} finally {
  socket?.close();
  if (browser.exitCode === null) browser.kill("SIGTERM");
  if (!keepProof) rmSync(proofDir, { recursive: true, force: true, maxRetries: 5 });
}
