import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const root = new URL("../", import.meta.url);
const html = readFileSync(new URL("index.html", root), "utf8");
const js = readFileSync(new URL("site.js", root), "utf8");
const css = readFileSync(new URL("styles.css", root), "utf8");

assert.match(html, /The crew, on GitHub/, "GitHub crew remains visible");
assert.match(html, /The two I’m<br>proudest of/, "Proudest section remains visible");
assert.match(html, /Roam the workshop/, "full workshop remains visible");
assert.equal((html.match(/class="door /g) || []).length, 8, "all eight workshop doors remain");
assert.ok(html.indexOf("data-project-title=\"sean\"") < html.indexOf("data-project-title=\"chat\""), "Sean leads the flagship pair");
for (const project of ["chat", "sean", "games", "edge"]) {
  assert.match(html, new RegExp(`data-project="${project}"`), `${project} quick look exists`);
  assert.match(html, new RegExp(`data-project-media="${project}"`), `${project} transition source exists`);
}
assert.match(html, /<dialog class="quick-dialog"[^>]+aria-modal="true"/, "quick look uses a semantic dialog");
assert.doesNotMatch(html, /ALIVE EXPERIMENT|NOW WITH A PULSE|EXPERIMENTAL ROUTE|Better alive\?/, "experiment narration is gone");
assert.match(js, /startViewTransition/, "View Transitions enhancement exists");
assert.match(js, /showModal/, "native dialog path exists");
assert.match(js, /event\.preventDefault\(\)/, "JS intercepts links only for enhancement");
assert.match(css, /view-transition-name/, "object-preserving transition styling exists");
assert.match(css, /prefers-reduced-motion:reduce/, "reduced-motion rules exist");

console.log("JPop restrained motion phase 1 checks: PASS");
