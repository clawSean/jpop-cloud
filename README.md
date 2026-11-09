# jpop.cloud

Jared Pearson's public workshop: Lobster Chat, Sean, AI coworkers, useful tools, games, trip companions, and experiments.

## Local preview

```bash
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173/`.

For the dedicated Inbox Island host layout:

```bash
(cd inbox-island && python3 -m http.server 4174)
node tests/inbox-island-browser-smoke.mjs
```

## Live comparison routes

- `/` — current production homepage
- `https://media.jpop.cloud/` — manifest-driven media room for individually
  shareable songs, video, images, and posters, with related assets grouped into
  collections (source lives under `/media/`)
- `https://schwifty.jpop.cloud/` — the canonical Get Schwifty portal into Nick and Morty’s credited, interactive agent universe (source lives under `/nick-and-morty/`)
- `/alive/` — experimental Workshop Pulse, constellation, and project quick looks
- `/compare/` — same-origin, side-by-side desktop comparison; full-screen links on mobile
- `/mailreef/` — public OAuth homepage, privacy policy, and terms for the private read-only Gmail screening assistant

The comparison routes are `noindex` and do not replace the canonical homepage.

## Deployment

- Domain: `jpop.cloud` and `www.jpop.cloud`
- Canonical source: this repository
- Public root: `/srv/websites/jpop.cloud`
- Edge: Caddy on the retained VPS

Every production change must be committed before deployment and verified over HTTPS afterward.
Mac-to-VPS syncs must not preserve local ownership or directory modes; use
`--no-owner --no-group --no-perms`, then normalize the deployed tree to
`caddy:caddy`, directories `0755`, and files `0644` before public proof.

## Adding media

The Mac is the canonical home for full-resolution generated media. The public
site never reads from the Mac at request time: `scripts/build-media-room.mjs`
copies only explicitly allowlisted sources into a compact `.media-build/`
bundle. Images become AVIF, WAV/FLAC audio becomes AAC, and video remains MP4;
private/inbound source directories are denied by the publisher.

### Inclusion policy

The catalog is **quality-gated, not approval-gated**. Publish public-safe work
when it is presentation-ready, independently useful, and worth showing; JPop's
explicit positive review is welcome input, not a prerequisite. The quality bar
is intentional/coherent output, clean enough execution for the medium, working
playback or display, and no obvious generation failure. Meaningful variants may
share a collection, but redundant outputs, failed experiments, model debris,
private/inbound material, and pieces that only become useful inside a composite
stay out.

1. Add one independently useful source to `scripts/media-room-catalog.json`.
   Use a `repo`, `workspace`, or `openclawMedia` source root, a public output
   path, and one of `copy`, `image-avif`, or `audio-aac`. Do not publish a
   composite contact sheet when its component assets are the useful unit.
2. Add related item slugs to a collection. Leave unrelated assets stand-alone.
   The first collection is previewed in the hero, but every preview tile still
   opens its own asset.
3. Build the public derivatives and generated manifest:

   ```bash
   node scripts/build-media-room.mjs
   ```

4. Serve the exact deploy bundle and run both checks:

   ```bash
   node tests/media-check.mjs
   (cd .media-build && python3 -m http.server 4174)
   SITE_ORIGIN=http://127.0.0.1:4174 MEDIA_PATH=/ node tests/media-browser-smoke.mjs
   ```

5. Commit the catalog, generated `media/library.json`, code, and tests. The
   large derivatives stay out of Git; deploy `.media-build/` to
   `/srv/websites/media.jpop.cloud/`, then normalize ownership and modes.

Directly serving files from ClawPop is intentionally unsupported: sleep,
FileVault, home-network outages, upstream bandwidth, and privacy boundaries
would all become production dependencies. If the public derivative library
eventually outgrows the VPS, move the same build bundle to object storage/CDN
rather than tunneling public requests into the Mac.

## Checks

```bash
node tests/motion-phase1-check.mjs
node tests/nick-and-morty-check.mjs
node tests/inbox-island-check.mjs
node tests/mailreef-check.mjs
node tests/media-check.mjs
node tests/browser-smoke.mjs
node tests/inbox-island-browser-smoke.mjs
node tests/media-browser-smoke.mjs
```

The browser smoke expects a local server at `http://127.0.0.1:4173`. Override it
with `SITE_ORIGIN`; set `CHROME_PATH` if Chrome or Chromium is not in a standard
location. For public split-host proof, use `SITE_ORIGIN=https://schwifty.jpop.cloud`,
`HOMAGE_PATH=/`, and `HOME_ORIGIN=https://jpop.cloud`.
