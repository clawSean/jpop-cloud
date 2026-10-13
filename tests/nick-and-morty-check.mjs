import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const root = new URL("../", import.meta.url);
const html = readFileSync(new URL("nick-and-morty/index.html", root), "utf8");
const css = readFileSync(new URL("nick-and-morty/styles.css", root), "utf8");
const js = readFileSync(new URL("nick-and-morty/site.js", root), "utf8");
const home = readFileSync(new URL("index.html", root), "utf8");
const sitemap = readFileSync(new URL("sitemap.xml", root), "utf8");

for (const character of ["Nick", "Morty", "Summer", "Beth", "Jerry", "Mr. Meeseeks", "Birdperson", "Citadel"]) {
  assert.match(html, new RegExp(character.replace(".", "\\.")), `${character} is represented`);
}

assert.match(html, /https:\/\/nicknmorty\.ai/g, "official site is linked");
assert.match(html, /https:\/\/github\.com\/nicknmorty/g, "official GitHub is linked");
assert.match(html, /This is our love letter[\s\S]+The work is theirs/, "authorship credit is explicit");
assert.match(html, /independent, affectionate homage/i, "fan-homage boundary is explicit");
assert.match(html, /<main id="main">/, "page has a main landmark");
assert.match(html, /aria-live="polite"/, "portal interaction has an accessible status");
assert.match(css, /prefers-reduced-motion: reduce/, "reduced-motion path exists");
assert.match(js, /IntersectionObserver/, "progressive reveal enhancement exists");
assert.match(js, /aria-pressed/, "portal interaction exposes state");
assert.match(home, /href="\/nick-and-morty\/"/, "homepage links to the homage");
assert.match(sitemap, /https:\/\/jpop\.cloud\/nick-and-morty\//, "sitemap includes the homage");

console.log("Nick & Morty homage checks: PASS");
