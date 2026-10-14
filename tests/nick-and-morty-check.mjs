import { readFileSync, statSync } from "node:fs";
import { strict as assert } from "node:assert";

const root = new URL("../", import.meta.url);
const html = readFileSync(new URL("nick-and-morty/index.html", root), "utf8");
const css = readFileSync(new URL("nick-and-morty/styles.css", root), "utf8");
const js = readFileSync(new URL("nick-and-morty/site.js", root), "utf8");
const home = readFileSync(new URL("index.html", root), "utf8");
const sitemap = readFileSync(new URL("sitemap.xml", root), "utf8");
const atlas = new URL("assets/nick-morty-cast-atlas-v2.avif", root);
const ogCard = new URL("assets/nick-and-morty-og-v2.png", root);

for (const character of ["Nick", "Morty", "Summer", "Beth", "Jerry", "Mr. Meeseeks", "Birdperson", "Citadel"]) {
  assert.match(html, new RegExp(character.replace(".", "\\.")), `${character} is represented`);
}

assert.match(html, /https:\/\/nicknmorty\.ai/g, "official site is linked");
assert.match(html, /https:\/\/github\.com\/nicknmorty/g, "official GitHub is linked");
assert.match(html, /This is our love letter[\s\S]+The work is theirs/, "authorship credit is explicit");
assert.match(html, /independent, affectionate homage/i, "fan-homage boundary is explicit");
assert.match(html, /<main id="main">/, "page has a main landmark");
assert.equal((html.match(/data-entity="/g) || []).length, 8, "interactive cable includes all eight entity channels");
assert.equal((html.match(/data-flow="/g) || []).length, 5, "workflow dial includes five execution traces");
assert.match(html, /Interdimensional Cable map/, "ensemble visual is labeled as a system map");
assert.match(html, /Read the conceptual relationship map/, "relationship map has a semantic text fallback");
assert.match(html, /aria-live="polite"/, "cable interaction has accessible status output");
assert.match(css, /prefers-reduced-motion: reduce/, "reduced-motion path exists");
assert.match(js, /IntersectionObserver/, "progressive reveal enhancement exists");
assert.match(js, /tuneChannel/, "character channels update the dossier");
assert.match(js, /activeFlow/, "workflow controls expose the active trace");
assert.match(html, /nick-morty-cast-atlas-v2\.avif/, "generated cast atlas is preloaded and consumed");
assert.ok(statSync(atlas).size <= 500_000, "published cast atlas stays under 500 KB");
assert.ok(statSync(ogCard).size <= 500_000, "social card stays under 500 KB");
assert.match(home, /href="\/nick-and-morty\/"/, "homepage links to the homage");
assert.match(sitemap, /https:\/\/jpop\.cloud\/nick-and-morty\//, "sitemap includes the homage");

console.log("Nick & Morty homage checks: PASS");
