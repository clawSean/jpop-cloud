# jpop.cloud

Jared Pearson's public workshop: Lobster Chat, Sean, AI coworkers, useful tools, games, trip companions, and experiments.

## Local preview

```bash
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173/`.

## Live comparison routes

- `/` — current production homepage
- `/nick-and-morty/` — an affectionate, credited tour of Nick and Morty’s agent universe
- `/alive/` — experimental Workshop Pulse, constellation, and project quick looks
- `/compare/` — same-origin, side-by-side desktop comparison; full-screen links on mobile

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

## Checks

```bash
node tests/motion-phase1-check.mjs
node tests/nick-and-morty-check.mjs
node tests/browser-smoke.mjs
```

The browser smoke expects a local server at `http://127.0.0.1:4173`. Override it
with `SITE_ORIGIN`; set `CHROME_PATH` if Chrome or Chromium is not in a standard
location.
