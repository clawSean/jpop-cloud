import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
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

const origin = process.env.SITE_ORIGIN || "http://127.0.0.1:4173";
const mediaPath = process.env.MEDIA_PATH || "/media/";
const proofDir = mkdtempSync(join(tmpdir(), "jpop-media-room-proof-"));
const keepProof = process.env.KEEP_BROWSER_PROOF === "1";
const library = JSON.parse(readFileSync(new URL("../media/library.json", import.meta.url), "utf8"));
const expectedItemCount = library.items.length;
const expectedPreviewCount = library.collections[0].itemSlugs.length;
const expectedCollectionCount = library.collections.length;
const expectedAudioCount = library.items.filter((item) => item.kind === "audio").length;
const expectedAudioCollections = new Set(library.items.filter((item) => item.kind === "audio").map((item) => item.collection)).size;

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
  const page = await fetch(`http://127.0.0.1:${freePort}/json/new?about:blank`, { method: "PUT" })
    .then((response) => response.json());
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
    pending.set(id, { reject, resolve, method });
    socket.send(JSON.stringify({ id, method, params }));
  });
  const waitFor = (method) => new Promise((resolve) => {
    const listeners = waiters.get(method) || [];
    listeners.push(resolve);
    waiters.set(method, listeners);
  });
  const evaluate = async (expression) => {
    const result = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
    return result.result.value;
  };
  const navigate = async (url) => {
    const loaded = waitFor("Page.loadEventFired");
    await send("Page.navigate", { url });
    await loaded;
    await evaluate(`(async () => {
      for (let attempt = 0; attempt < 80; attempt += 1) {
        if (document.querySelectorAll(".media-card").length === ${expectedItemCount} && document.querySelectorAll(".preview-asset").length === ${expectedPreviewCount}) return true;
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      throw new Error("media library did not render");
    })()`);
    await evaluate(`(async () => {
      await document.fonts.ready;
      await Promise.all([...document.querySelectorAll(".preview-assets img")].map((image) => image.complete
        ? Promise.resolve()
        : new Promise((resolve, reject) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", reject, { once: true });
        })));
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      return true;
    })()`);
  };

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");

  for (const [width, height, label] of [
    [390, 844, "mobile"],
    [320, 700, "narrow-mobile"],
    [768, 1024, "tablet"],
    [1440, 1000, "desktop"],
  ]) {
    await send("Emulation.setDeviceMetricsOverride", {
      width, height, deviceScaleFactor: 1, mobile: width <= 480, screenWidth: width, screenHeight: height,
    });
    await send("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-reduced-motion", value: label === "tablet" ? "reduce" : "no-preference" }],
    });
    await navigate(`${origin}${mediaPath}`);
    const metrics = await evaluate(`(() => ({
      title: document.title,
      heading: document.querySelector("h1")?.textContent.replace(/\\s+/g, " ").trim(),
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      innerWidth: window.innerWidth,
      outerWidth: window.outerWidth,
      visualViewportWidth: window.visualViewport?.width,
      viewportMeta: document.querySelector('meta[name="viewport"]')?.content,
      visualViewportScale: window.visualViewport?.scale,
      h1FontSize: getComputedStyle(document.querySelector("h1")).fontSize,
      cardCount: document.querySelectorAll(".media-card").length,
      filterCount: document.querySelectorAll("[data-filter]").length,
      previewCount: document.querySelectorAll(".preview-asset").length,
      collectionCount: document.querySelectorAll(".collection-shelf").length,
      maxCardDelay: Math.max(...[...document.querySelectorAll(".media-card")].map((card) => parseFloat(getComputedStyle(card).animationDelay) || 0)),
      featured: document.querySelector("[data-featured-title]")?.textContent,
      backHref: document.querySelector(".workshop-link")?.href,
      overflowers: [...document.querySelectorAll("body *")].map((node) => {
        const rect = node.getBoundingClientRect();
        return { tag: node.tagName, className: node.className || "", left: Math.round(rect.left), right: Math.round(rect.right) };
      }).filter((item) => item.right > (window.visualViewport?.width || window.innerWidth) + 1 || item.left < -1).slice(0, 20),
      wideContent: [...document.querySelectorAll("body *")].map((node) => ({
        tag: node.tagName, className: node.className || "", scrollWidth: node.scrollWidth, clientWidth: node.clientWidth
      })).filter((item) => item.scrollWidth > item.clientWidth + 1).slice(0, 20)
    }))()`);
    assert.equal(metrics.innerWidth, width, `${label} viewport is exact: ${JSON.stringify(metrics)}`);
    assert.ok(metrics.scrollWidth <= width, `${label} has no document overflow: ${JSON.stringify(metrics.overflowers)}`);
    assert.ok(metrics.bodyScrollWidth <= width, `${label} has no body overflow: ${JSON.stringify(metrics.overflowers)}`);
    assert.equal(metrics.heading, "Sound.Vision.Everything else.", `${label} keeps the media-room promise`);
    assert.equal(metrics.cardCount, expectedItemCount, `${label} renders every atomic asset`);
    assert.equal(metrics.filterCount, 5, `${label} renders every filter`);
    assert.equal(metrics.previewCount, expectedPreviewCount, `${label} exposes every asset from the featured collection preview`);
    assert.equal(metrics.collectionCount, expectedCollectionCount, `${label} renders every collection`);
    assert.ok(metrics.maxCardDelay <= 0.56, `${label} caps the card reveal stagger: ${metrics.maxCardDelay}s`);
    assert.equal(metrics.featured, "Get Schwifty Cast", `${label} renders the featured collection`);
    assert.equal(metrics.backHref, "https://jpop.cloud/", `${label} links back to the workshop`);

    const musicShelf = await evaluate(`(() => {
      document.querySelector('[data-filter="audio"]').click();
      return {
        active: document.querySelector('[data-filter="audio"]').getAttribute("aria-pressed"),
        empty: !document.querySelector("[data-empty-state]").hidden,
        gridHidden: document.querySelector("[data-media-grid]").hidden,
        status: document.querySelector("[data-result-status]").textContent
      };
    })()`);
    assert.deepEqual(musicShelf, {
      active: "true", empty: false, gridHidden: false,
      status: `Showing ${expectedAudioCount} audio assets in ${expectedAudioCollections} collections.`,
    }, `${label} music shelf exposes every published audio asset`);

    const dialogState = await evaluate(`(() => {
      document.querySelector('[data-filter="all"]').click();
      const trigger = document.querySelector('.media-card [data-open="get-schwifty-rick"]');
      trigger.click();
      return {
        open: document.querySelector("[data-media-dialog]").open,
        title: document.querySelector("[data-dialog-title]").textContent,
        image: Boolean(document.querySelector("[data-dialog-player] img")),
        shareAction: Boolean(document.querySelector("[data-dialog-share]")),
        download: document.querySelector("[data-dialog-source]").hasAttribute("download"),
        hash: location.hash
      };
    })()`);
    assert.deepEqual(dialogState, {
      open: true, title: "Rick", image: true, shareAction: true, download: true, hash: "#get-schwifty-rick",
    }, `${label} opens a shareable, downloadable, deep-linkable asset viewer`);
    await evaluate(`document.querySelector("[data-dialog-close]").click()`);

    const playbackState = await evaluate(`(async () => {
      document.querySelector('[data-open="fault-line"]').click();
      const audio = document.querySelector("[data-dialog-player] audio");
      const audioReady = Boolean(audio?.controls && audio.src.endsWith("/library/audio/fault-line.aac"));
      document.querySelector("[data-dialog-close]").click();
      document.querySelector('[data-open="white-fire-trailer"]').click();
      const video = document.querySelector("[data-dialog-player] video");
      const videoReady = Boolean(video?.controls && video.playsInline && video.src.endsWith("/library/video/white-fire-trailer.mp4"));
      document.querySelector("[data-dialog-close]").click();
      return { audioReady, videoReady };
    })()`);
    assert.deepEqual(playbackState, { audioReady: true, videoReady: true }, `${label} prepares native audio and video playback`);

    if (keepProof) {
      const capture = await send("Page.captureScreenshot", { format: "png", fromSurface: true });
      writeFileSync(join(proofDir, `media-${label}.png`), Buffer.from(capture.data, "base64"));
      await evaluate(`document.querySelector("#library").scrollIntoView()`);
      await new Promise((resolve) => setTimeout(resolve, 700));
      const libraryCapture = await send("Page.captureScreenshot", { format: "png", fromSurface: true });
      writeFileSync(join(proofDir, `media-${label}-library.png`), Buffer.from(libraryCapture.data, "base64"));
    }
  }

  assert.deepEqual(exceptions, [], `no browser exceptions: ${exceptions.join(", ")}`);
  assert.deepEqual(loadFailures.filter((failure) => !/ERR_ABORTED/u.test(failure)), [],
    `no failed resources: ${loadFailures.join(", ")}`);
  console.log("JPop Media Room browser smoke: PASS (320, 390, 768, 1440)");
  if (keepProof) console.log(`Proof screenshots: ${proofDir}`);
} finally {
  socket?.close();
  if (browser.exitCode === null) browser.kill("SIGTERM");
  if (!keepProof) rmSync(proofDir, { recursive: true, force: true, maxRetries: 5 });
}
