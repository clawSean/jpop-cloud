import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const home = readFileSync(new URL("inbox-island/index.html", root), "utf8");
const policy = readFileSync(new URL("inbox-island/privacy/index.html", root), "utf8");
const css = readFileSync(new URL("inbox-island/styles.css", root), "utf8");
const source = "https://github.com/clawSean/inbox-island";

assert.match(home, /0\.4\.9 candidate/u, "homepage labels the current candidate");
assert.match(home, new RegExp(source.replaceAll("/", "\\/"), "u"), "homepage links public source");
assert.match(home, /Google's restricted <code>gmail\.readonly<\/code>/u, "homepage names the restricted scope");
assert.match(home, /Gmail remains the source of truth/u, "advisory boundary remains visible");
assert.match(home, /restricted-scope verification is not promised by Halloween/u, "deadline claim stays honest");
assert.doesNotMatch(home, /Public source[^<]+planned/u, "source is no longer described as planned");

assert.match(policy, /EFFECTIVE OCTOBER 22, 2026/u, "policy has an effective date");
assert.doesNotMatch(policy, /DRAFT FOR PRIVATE PILOT|publication draft/iu, "policy is no longer a draft");
assert.match(policy, /short-lived OAuth access token/u, "token handling is disclosed");
assert.match(policy, /sender and recipient addresses, subjects, timestamps, labels/u, "mail data is disclosed");
assert.match(policy, /does not download attachment content/u, "attachment boundary is explicit");
assert.match(policy, /at most 45 minutes/u, "token retention is bounded");
assert.match(policy, /including the Limited Use requirements/u, "Limited Use statement is present");
assert.match(policy, /security\/advisories\/new/u, "private vulnerability reporting is linked");
assert.match(policy, /myaccount\.google\.com\/connections/u, "Google revocation control is linked");
assert.match(css, /\.policy-page/u, "policy layout is styled");
assert.match(css, /prefers-reduced-motion: reduce/u, "reduced-motion behavior remains");

console.log("Inbox Island publication checks: PASS");
