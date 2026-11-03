import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const home = await readFile(new URL("mailreef/index.html", root), "utf8");
const privacy = await readFile(new URL("mailreef/privacy/index.html", root), "utf8");
const terms = await readFile(new URL("mailreef/terms/index.html", root), "utf8");

assert.match(home, /https:\/\/jpop\.cloud\/mailreef\//);
assert.match(home, /gmail\.readonly/);
assert.match(home, /\/mailreef\/privacy\//);
assert.match(home, /\/mailreef\/terms\//);
assert.match(home, /cannot send, reply, forward, delete, archive, label, modify, or mark mail read/i);

assert.match(privacy, /Effective November 2, 2026/);
assert.match(privacy, /Google API Services User Data Policy/);
assert.match(privacy, /Limited Use/);
assert.match(privacy, /configured AI model provider/);
assert.match(privacy, /does not read attachments/);
assert.match(privacy, /https:\/\/myaccount\.google\.com\/connections/);

assert.match(terms, /Effective November 2, 2026/);
assert.match(terms, /private personal-use tool/);
assert.match(terms, /informational and may be incomplete or incorrect/);
assert.match(terms, /https:\/\/myaccount\.google\.com\/connections/);

for (const [name, html] of [["home", home], ["privacy", privacy], ["terms", terms]]) {
  assert.doesNotMatch(html, /client_secret|refresh_token|authorization code/i, `${name} leaks credential language`);
  assert.match(html, /<meta name="viewport"/i, `${name} lacks mobile viewport`);
}

console.log("Mailreef publication contract passed.");
