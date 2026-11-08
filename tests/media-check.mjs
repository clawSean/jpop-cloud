import { existsSync, readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const root = new URL("../", import.meta.url);
const html = readFileSync(new URL("media/index.html", root), "utf8");
const css = readFileSync(new URL("media/styles.css", root), "utf8");
const js = readFileSync(new URL("media/app.js", root), "utf8");
const homepage = readFileSync(new URL("index.html", root), "utf8");
const homepageJs = readFileSync(new URL("site.js", root), "utf8");
const sitemap = readFileSync(new URL("sitemap.xml", root), "utf8");
const library = JSON.parse(readFileSync(new URL("media/library.json", root), "utf8"));

assert.match(html, /<link rel="canonical" href="https:\/\/media\.jpop\.cloud\/">/, "media canonical URL is exact");
assert.match(html, /Songs, clips, posters, images/, "the page states the broad media promise");
assert.match(html, /data-filter="audio"/, "music filter is present");
assert.match(html, /data-filter="video"/, "video filter is present");
assert.match(html, /data-filter="image"/, "image filter is present");
assert.match(html, /data-filter="poster"/, "poster filter is present");
assert.match(html, /<dialog class="media-dialog"/, "media uses a native dialog viewer");
assert.match(html, /<noscript>/, "media remains reachable without JavaScript");
assert.match(css, /prefers-reduced-motion: reduce/, "reduced motion is respected");
assert.match(css, /min-width: 320px/, "the page declares its narrow viewport floor");
assert.match(js, /document\.createElement\("audio"\)/, "audio playback is prepared");
assert.match(js, /document\.createElement\("video"\)/, "video playback is prepared");
assert.match(js, /history\.replaceState/, "deep-linkable media is prepared");
assert.match(js, /navigator\.share/, "native asset sharing is prepared");
assert.match(html, /data-dialog-share/, "every asset has an explicit share action");

assert.equal(library.version, 2, "collection-aware library schema version is explicit");
assert.ok(Array.isArray(library.collections) && library.collections.length >= 1, "library has a real collection");
assert.ok(Array.isArray(library.items) && library.items.length === 8, "launch collection has eight atomic assets");
assert.equal(new Set(library.items.map((item) => item.slug)).size, library.items.length, "media slugs are unique");
assert.doesNotMatch(JSON.stringify(library), /get-schwifty-og|jpop-workshop-og/, "composite promo banners are not library items");
const itemSlugs = new Set(library.items.map((item) => item.slug));
for (const collection of library.collections) {
  assert.equal(typeof collection.slug, "string", "collection has a slug");
  assert.equal(typeof collection.title, "string", "collection has a title");
  assert.ok(Array.isArray(collection.itemSlugs) && collection.itemSlugs.length, `${collection.slug} lists its assets`);
  assert.ok(collection.itemSlugs.every((slug) => itemSlugs.has(slug)), `${collection.slug} only references real assets`);
}
for (const item of library.items) {
  assert.ok(["audio", "video", "image", "poster"].includes(item.kind), `${item.slug} has a supported kind`);
  for (const field of ["slug", "title", "date", "description", "src", "alt", "credit"]) {
    assert.equal(typeof item[field], "string", `${item.slug} has ${field}`);
    assert.ok(item[field].trim(), `${item.slug} ${field} is non-empty`);
  }
  assert.match(item.date, /^\d{4}-\d{2}-\d{2}$/u, `${item.slug} date is ISO-formatted`);
  assert.match(item.src, /^assets\/collections\//u, `${item.slug} is a first-party atomic asset`);
  assert.ok(existsSync(new URL(`media/${item.src}`, root)), `${item.slug} source file exists`);
  assert.ok(library.collections.some((collection) => collection.slug === item.collection), `${item.slug} belongs to a real collection`);
}

assert.match(homepage, /href="https:\/\/media\.jpop\.cloud\/">Media ↗<\/a>/, "homepage navigation exposes Media");
assert.match(homepageJs, /name: "Media Room"/, "command palette exposes Media Room");
assert.match(sitemap, /https:\/\/media\.jpop\.cloud\//, "sitemap exposes the media host");

console.log("JPop Media Room static checks: PASS");
