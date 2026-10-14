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
  "/usr/bin/chromium-browser"
].find(existsSync);
if (!chrome) throw new Error("Chrome/Chromium not found. Set CHROME_PATH to run browser smoke tests.");
const origin = process.env.SITE_ORIGIN || "http://127.0.0.1:4173";
const homagePath = process.env.HOMAGE_PATH || "/nick-and-morty/";
const homepageOrigin = process.env.HOME_ORIGIN || origin;
const proofDir = mkdtempSync(join(tmpdir(), "jpop-nick-morty-browser-"));
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
  "--disable-gpu",
  "--hide-scrollbars",
  "--disable-dev-shm-usage",
  `--remote-debugging-port=${freePort}`,
  `--user-data-dir=${join(proofDir, "profile")}`,
  "about:blank"
], { stdio: "ignore" });

const waitForJson = async (url) => {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return await response.json();
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Chrome DevTools did not become ready at ${url}`);
};

let socket;
try {
  await waitForJson(`http://127.0.0.1:${freePort}/json/version`);
  const page = await fetch(`http://127.0.0.1:${freePort}/json/new?about:blank`, { method: "PUT" }).then((response) => response.json());
  socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  let commandId = 0;
  const pending = new Map();
  const eventWaiters = new Map();
  const exceptions = [];
  const loadFailures = [];

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id) {
      const waiter = pending.get(message.id);
      if (!waiter) return;
      pending.delete(message.id);
      if (message.error) waiter.reject(new Error(`${waiter.method}: ${message.error.message}`));
      else waiter.resolve(message.result);
      return;
    }
    if (message.method === "Runtime.exceptionThrown") exceptions.push(message.params.exceptionDetails.text);
    if (message.method === "Network.loadingFailed") loadFailures.push(message.params.errorText);
    const waiters = eventWaiters.get(message.method);
    if (!waiters?.length) return;
    eventWaiters.delete(message.method);
    waiters.forEach((resolve) => resolve(message.params));
  });

  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++commandId;
    pending.set(id, { method, resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
  const waitForEvent = (method) => new Promise((resolve) => {
    const waiters = eventWaiters.get(method) || [];
    waiters.push(resolve);
    eventWaiters.set(method, waiters);
  });
  const evaluate = async (expression) => {
    const result = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
    return result.result.value;
  };
  const navigate = async (url) => {
    const loaded = waitForEvent("Page.loadEventFired");
    await send("Page.navigate", { url });
    await loaded;
    await evaluate(`(async () => {
      await document.fonts.ready;
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      return true;
    })()`);
  };
  const setViewport = (width, height) => send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width <= 480,
    screenWidth: width,
    screenHeight: height
  });
  const metrics = () => evaluate(`(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    headingRight: Math.round(document.querySelector("h1").getBoundingClientRect().right),
    links: document.querySelectorAll("a[href]").length,
    characters: [...document.querySelectorAll(".cast-card h3")].map((item) => item.textContent.trim()),
    channelCount: document.querySelectorAll("[data-entity]").length,
    flowCount: document.querySelectorAll("[data-flow]").length,
    smallestChannelTarget: Math.round(Math.min(...[...document.querySelectorAll("[data-entity]")].map((item) => Math.min(item.getBoundingClientRect().width, item.getBoundingClientRect().height)))),
    doorCount: document.querySelectorAll(".door").length,
    heroTitle: document.querySelector("h1").textContent.replace(/\s+/g, " ").trim(),
    portalCount: document.querySelectorAll(".portal-vortex").length,
    overflowers: [...document.querySelectorAll("body *")].map((item) => {
      const rect = item.getBoundingClientRect();
      return { tag: item.tagName, className: item.className || "", left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) };
    }).filter((item) => item.right > window.innerWidth + 1 || item.left < -1).slice(0, 12)
  }))()`);
  const screenshot = async (name) => {
    const { cssContentSize } = await send("Page.getLayoutMetrics");
    const result = await send("Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: cssContentSize.width, height: cssContentSize.height, scale: 1 }
    });
    writeFileSync(join(proofDir, `${name}.png`), Buffer.from(result.data, "base64"));
  };
  const screenshotViewport = async (name) => {
    const result = await send("Page.captureScreenshot", { format: "png", fromSurface: true });
    writeFileSync(join(proofDir, `${name}.png`), Buffer.from(result.data, "base64"));
  };

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");

  for (const [width, height, name] of [[320, 700, "narrow-mobile"], [390, 844, "mobile"], [768, 1024, "tablet"], [1440, 1000, "desktop"]]) {
    await setViewport(width, height);
    await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
    await navigate(`${origin}${homagePath}`);
    const pageMetrics = await metrics();
    assert.equal(pageMetrics.innerWidth, width, `${name} viewport is exact`);
    assert.ok(pageMetrics.scrollWidth <= width, `${name} has no document overflow (${pageMetrics.scrollWidth}/${width}): ${JSON.stringify(pageMetrics.overflowers)}`);
    assert.ok(pageMetrics.bodyScrollWidth <= width, `${name} body has no overflow (${pageMetrics.bodyScrollWidth}/${width}): ${JSON.stringify(pageMetrics.overflowers)}`);
    assert.ok(pageMetrics.headingRight <= width, `${name} hero heading stays in viewport`);
    assert.ok(pageMetrics.links >= 10, `${name} keeps the page navigable`);
    assert.equal(pageMetrics.heroTitle, "Get Shwifty", `${name} keeps the canonical title`);
    assert.equal(pageMetrics.portalCount, 1, `${name} renders one portal in the cast map`);
    assert.deepEqual(pageMetrics.characters, ["Summer", "Beth", "Jerry", "Mr. Meeseeks", "Birdperson", "Morty, again"]);
    assert.equal(pageMetrics.channelCount, 8, `${name} keeps all eight character channels visible`);
    assert.equal(pageMetrics.flowCount, 5, `${name} keeps all five workflow controls`);
    assert.ok(pageMetrics.smallestChannelTarget >= 44, `${name} character targets remain touch-sized (${pageMetrics.smallestChannelTarget}px)`);
    await screenshot(`nick-and-morty-${name}`);

    if (width <= 390) {
      const menu = await evaluate(`(() => {
        document.querySelector("[data-menu-button]").click();
        return {
          expanded: document.querySelector("[data-menu-button]").getAttribute("aria-expanded"),
          open: document.querySelector("[data-nav-links]").classList.contains("is-open"),
          locked: document.body.classList.contains("menu-open")
        };
      })()`);
      assert.deepEqual(menu, { expanded: "true", open: true, locked: true }, "mobile menu opens accessibly");
    }

    const cable = await evaluate(`(() => {
      const beth = document.querySelector('[data-entity="beth"]');
      beth.focus();
      beth.click();
      const recover = document.querySelector('[data-flow="recover"]');
      recover.click();
      return {
        entity: document.querySelector("[data-cable]").dataset.activeEntity,
        dossier: document.querySelector("[data-channel-name]").textContent,
        focused: document.activeElement === beth,
        current: beth.getAttribute("aria-current"),
        flow: document.querySelector("[data-cable]").dataset.activeFlow,
        pressed: recover.getAttribute("aria-pressed"),
        status: document.querySelector("[data-flow-status]").textContent.includes("Beth")
      };
    })()`);
    assert.deepEqual(cable, { entity: "beth", dossier: "Beth", focused: true, current: "true", flow: "recover", pressed: "true", status: true }, `${name} cable interactions report character and workflow state`);

    await setViewport(width, height);
    await navigate(`${homepageOrigin}/#workshop`);
    const homeMetrics = await metrics();
    assert.equal(homeMetrics.doorCount, 8, `${name} homepage includes eight doors`);
    assert.ok(homeMetrics.scrollWidth <= width, `${name} homepage has no overflow (${homeMetrics.scrollWidth}/${width})`);
    if (width === 390 || width === 1440) {
      await evaluate(`(async () => {
        document.querySelector(".door-morty").scrollIntoView({ block: "center" });
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        return true;
      })()`);
      await screenshotViewport(`homepage-nick-and-morty-door-${name}`);
    }
  }

  assert.deepEqual(exceptions, [], `no browser exceptions: ${exceptions.join(", ")}`);
  assert.deepEqual(loadFailures.filter((failure) => !/ERR_ABORTED/.test(failure)), [], `no failed resources: ${loadFailures.join(", ")}`);
  console.log(`Nick & Morty browser smoke: PASS (320, 390, 768, 1440)`);
  if (keepProof) console.log(`Proof screenshots: ${proofDir}`);
} finally {
  socket?.close();
  if (browser.exitCode === null) {
    browser.kill("SIGTERM");
    await Promise.race([
      new Promise((resolve) => browser.once("exit", resolve)),
      new Promise((resolve) => setTimeout(resolve, 1500))
    ]);
  }
  if (browser.exitCode === null) browser.kill("SIGKILL");
  if (!keepProof) rmSync(proofDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}
