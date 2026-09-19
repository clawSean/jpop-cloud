import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const root = new URL("../", import.meta.url);
const html = readFileSync(new URL("alive/index.html", root), "utf8");
const js = readFileSync(new URL("alive/site.js", root), "utf8");
const css = readFileSync(new URL("alive/styles.css", root), "utf8");

assert.equal((html.match(/<a class="project/g) || []).length, 4, "project cards remain direct-link fallbacks");
for (const project of ["chat", "sean", "games", "edge"]) {
  assert.match(html, new RegExp(`data-project="${project}"`), `${project} quick look exists`);
  assert.match(html, new RegExp(`data-project-media="${project}"`), `${project} transition source exists`);
}
assert.match(html, /<dialog class="drawer"[^>]+aria-modal="true"/, "quick look uses a semantic dialog");
assert.match(js, /startViewTransition/, "View Transitions enhancement exists");
assert.match(js, /showModal/, "native dialog path exists");
assert.match(js, /is-fallback-open/, "dialog fallback path exists");
assert.match(js, /event\.preventDefault\(\)/, "JS intercepts links only for enhancement");
assert.match(css, /view-transition-name/, "object-preserving transition styling exists");
assert.match(css, /prefers-reduced-motion:reduce/, "reduced-motion rules exist");
assert.match(css, /drawer\.is-fallback-open/, "static dialog fallback styling exists");

console.log("JPop motion phase 1 checks: PASS");
