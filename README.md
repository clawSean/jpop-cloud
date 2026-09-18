# jpop.cloud

Jared Pearson's public workshop: Lobster Chat, Sean, AI coworkers, useful tools, games, trip companions, and experiments.

## Local preview

```bash
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173/`.

## Live comparison routes

- `/` — current production homepage
- `/alive/` — experimental Workshop Pulse, constellation, and project quick looks
- `/compare/` — same-origin, side-by-side desktop comparison; full-screen links on mobile

The comparison routes are `noindex` and do not replace the canonical homepage.

## Deployment

- Domain: `jpop.cloud` and `www.jpop.cloud`
- Canonical source: this repository
- Public root: `/srv/websites/jpop.cloud`
- Edge: Caddy on the retained VPS

Every production change must be committed before deployment and verified over HTTPS afterward.
