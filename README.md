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
- `https://media.jpop.cloud/` — manifest-driven media room for songs, video,
  images, and posters (source lives under `/media/`)
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

1. Put the web-ready file in `media/uploads/` (or use a durable HTTPS source).
2. Add one item to `media/library.json` with a unique `slug`, `title`, `kind`,
   `date`, `description`, `src`, and accessible `alt` text. Supported kinds are
   `audio`, `video`, `image`, and `poster`.
3. For audio and video, add a `poster` or `thumbnail` so the shelf looks good
   before playback. Set `featured: true` on at most one item.
4. Run `node tests/media-check.mjs` and `node tests/media-browser-smoke.mjs`
   against a local server before deploying the `media/` directory.

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
