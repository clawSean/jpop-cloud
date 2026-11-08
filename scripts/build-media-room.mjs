import { createHash } from "node:crypto";
import {
  chmodSync,
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { homedir, tmpdir } from "node:os";
import { basename, dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");
const mediaRoot = join(repoRoot, "media");
const buildRoot = join(repoRoot, ".media-build");
const cacheRoot = join(repoRoot, ".media-cache");
const catalogPath = join(scriptDir, "media-room-catalog.json");
const manifestPath = join(mediaRoot, "library.json");
const receiptPath = join(repoRoot, ".media-build-receipt.json");
const roots = {
  repo: repoRoot,
  workspace: resolve(process.env.JPOP_WORKSPACE_ROOT || join(homedir(), ".openclaw/workspace")),
  openclawMedia: resolve(process.env.JPOP_OPENCLAW_MEDIA_ROOT || join(homedir(), ".openclaw/media")),
};
const forbiddenSegments = new Set([
  "browser",
  "file-transfer",
  "inbound",
  "medical",
  "private",
  "relationships",
  "remote-cache",
  "screenshots",
  "shopping",
  "voice-notes",
]);

const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));

const fail = (message) => { throw new Error(message); };
const isInside = (parent, child) => child === parent || child.startsWith(`${parent}${sep}`);
const escapeXml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&apos;");
const sha256 = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");

const cachedDerivative = (item, source, destination, variant, producer) => {
  mkdirSync(cacheRoot, { recursive: true });
  const key = createHash("sha256")
    .update(sha256(source))
    .update(item.transform)
    .update(variant)
    .digest("hex");
  const cachePath = join(cacheRoot, `${key}${extname(destination)}`);
  if (existsSync(cachePath)) {
    copyFileSync(cachePath, destination);
    return;
  }
  producer();
  chmodSync(destination, 0o644);
  copyFileSync(destination, cachePath);
  chmodSync(cachePath, 0o644);
};

const run = (command, args) => {
  const result = spawnSync(command, args, { encoding: "utf8" });
  if (result.status !== 0) {
    fail(`${command} ${args.join(" ")} failed (${result.status}): ${result.stderr || result.stdout}`);
  }
};

const sourcePath = (source) => {
  const root = roots[source.root];
  if (!root) fail(`Unknown source root: ${source.root}`);
  const path = resolve(root, source.path);
  if (!isInside(root, path)) fail(`Source escapes ${source.root}: ${source.path}`);
  const segments = relative(root, path).split(sep).map((part) => part.toLowerCase());
  const blocked = segments.find((segment) => forbiddenSegments.has(segment));
  if (blocked) fail(`Refusing private source segment "${blocked}": ${source.path}`);
  if (!existsSync(path) || !statSync(path).isFile()) fail(`Missing source: ${path}`);
  return path;
};

const outputPath = (output) => {
  const path = resolve(buildRoot, output);
  if (!isInside(buildRoot, path)) fail(`Output escapes build root: ${output}`);
  mkdirSync(dirname(path), { recursive: true });
  return path;
};

const wrapTitle = (title, width = 18) => {
  const words = title.split(/\s+/u);
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > width && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
};

const writeAudioCover = (item, path) => {
  const lines = wrapTitle(item.title);
  const accent = item.cover?.accent || "#c8ff45";
  const label = item.cover?.label || "AUDIO / JPOP MEDIA ROOM";
  const title = lines.map((line, index) => (
    `<text x="84" y="${420 + (index * 116)}" fill="#f7f2e8" font-family="Arial Black, Arial, sans-serif" font-size="104" font-weight="900" letter-spacing="-5">${escapeXml(line)}</text>`
  )).join("\n  ");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
  <defs>
    <radialGradient id="g" cx="75%" cy="18%" r="88%"><stop offset="0" stop-color="${accent}" stop-opacity=".38"/><stop offset=".48" stop-color="#17131f"/><stop offset="1" stop-color="#09080d"/></radialGradient>
    <filter id="n"><feTurbulence baseFrequency=".62" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 .12 0"/></filter>
  </defs>
  <rect width="1200" height="1200" fill="url(#g)"/>
  <rect width="1200" height="1200" filter="url(#n)" opacity=".32"/>
  <circle cx="920" cy="248" r="174" fill="none" stroke="${accent}" stroke-width="3" opacity=".75"/>
  <circle cx="920" cy="248" r="114" fill="none" stroke="${accent}" stroke-width="16" opacity=".23"/>
  <path d="M872 158 L1012 248 L872 338 Z" fill="${accent}"/>
  <text x="84" y="112" fill="${accent}" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="27" font-weight="700" letter-spacing="3">${escapeXml(label)}</text>
  ${title}
  <line x1="84" y1="1004" x2="1116" y2="1004" stroke="#ffffff" stroke-opacity=".2"/>
  <text x="84" y="1082" fill="#9d96a7" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="27" letter-spacing="2">JPOP.CLOUD / MEDIA ROOM</text>
  <text x="1116" y="1082" text-anchor="end" fill="${accent}" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="27">PLAY ↗</text>
</svg>\n`;
  writeFileSync(path, svg);
};

const makeVideoPoster = (source, destination) => {
  const posterTmp = mkdtempSync(join(tmpdir(), "jpop-media-poster-"));
  try {
    run("/usr/bin/qlmanage", ["-t", "-s", "1200", "-o", posterTmp, source]);
    const png = readdirSync(posterTmp).find((name) => extname(name).toLowerCase() === ".png");
    if (!png) fail(`qlmanage did not create a poster for ${source}`);
    run("/usr/bin/sips", ["-s", "format", "avif", "-s", "formatOptions", "72", "-Z", "1600", join(posterTmp, png), "--out", destination]);
  } finally {
    rmSync(posterTmp, { recursive: true, force: true });
  }
};

if (basename(buildRoot) !== ".media-build" || dirname(buildRoot) !== repoRoot) {
  fail(`Refusing unexpected build root: ${buildRoot}`);
}
rmSync(buildRoot, { recursive: true, force: true });
mkdirSync(buildRoot, { recursive: true });
cpSync(mediaRoot, buildRoot, {
  recursive: true,
  filter: (source) => {
    const rel = relative(mediaRoot, source);
    return rel !== "library.json" && rel !== "library" && !rel.startsWith(`library${sep}`);
  },
});

const publicItems = [];
const receipt = [];
for (const item of catalog.items) {
  const source = sourcePath(item.source);
  const destination = outputPath(item.output);
  if (item.transform === "copy") {
    copyFileSync(source, destination);
  } else if (item.transform === "image-avif") {
    cachedDerivative(item, source, destination, "avif-72-max1600-v1", () => {
      run("/usr/bin/sips", ["-s", "format", "avif", "-s", "formatOptions", "72", "-Z", "1600", source, "--out", destination]);
    });
  } else if (item.transform === "audio-aac") {
    const bitrate = String(item.audioBitrate || 160000);
    cachedDerivative(item, source, destination, `aac-${bitrate}-q127-v1`, () => {
      run("/usr/bin/afconvert", [source, destination, "-f", "adts", "-d", "aac", "-b", bitrate, "-q", "127"]);
    });
  } else {
    fail(`Unsupported transform for ${item.slug}: ${item.transform}`);
  }
  chmodSync(destination, 0o644);

  const publicItem = Object.fromEntries(Object.entries(item).filter(([key]) => ![
    "audioBitrate", "cover", "output", "source", "transform",
  ].includes(key)));
  publicItem.src = item.output;
  publicItem.bytes = statSync(destination).size;

  if (item.kind === "audio") {
    const coverRelative = `library/covers/${item.slug}.svg`;
    const cover = outputPath(coverRelative);
    writeAudioCover(item, cover);
    chmodSync(cover, 0o644);
    publicItem.poster = coverRelative;
    publicItem.thumbnail = coverRelative;
  } else if (item.kind === "video") {
    const posterRelative = `library/covers/${item.slug}.avif`;
    const poster = outputPath(posterRelative);
    cachedDerivative(item, source, poster, "video-poster-avif-72-max1600-v1", () => makeVideoPoster(source, poster));
    chmodSync(poster, 0o644);
    publicItem.poster = posterRelative;
    publicItem.thumbnail = posterRelative;
  } else if (!publicItem.thumbnail) {
    publicItem.thumbnail = item.output;
  }

  publicItems.push(publicItem);
  receipt.push({
    slug: item.slug,
    source: `${item.source.root}:${item.source.path}`,
    sourceSha256: sha256(source),
    output: item.output,
    outputBytes: publicItem.bytes,
    outputSha256: sha256(destination),
  });
}

const itemSlugs = new Set(publicItems.map((item) => item.slug));
if (itemSlugs.size !== publicItems.length) fail("Duplicate media item slugs");
for (const collection of catalog.collections) {
  if (!collection.itemSlugs.length) fail(`Empty collection: ${collection.slug}`);
  for (const slug of collection.itemSlugs) {
    if (!itemSlugs.has(slug)) fail(`${collection.slug} references missing item: ${slug}`);
  }
}

const manifest = { version: 3, collections: catalog.collections, items: publicItems };
const manifestJson = `${JSON.stringify(manifest, null, 2)}\n`;
writeFileSync(manifestPath, manifestJson);
writeFileSync(join(buildRoot, "library.json"), manifestJson);
writeFileSync(receiptPath, `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  itemCount: publicItems.length,
  publicBytes: receipt.reduce((sum, item) => sum + item.outputBytes, 0),
  files: receipt,
}, null, 2)}\n`);

console.log(`Media Room build: ${publicItems.length} items / ${receipt.reduce((sum, item) => sum + item.outputBytes, 0)} public bytes`);
console.log(`Deploy root: ${buildRoot}`);
