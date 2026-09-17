# jpop.cloud

Jared Pearson's public portfolio and professional front door.

## Local preview

```bash
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173/`.

## Deployment

- Domain: `jpop.cloud` and `www.jpop.cloud`
- Canonical source: this repository
- Public root: `/srv/websites/jpop.cloud`
- Edge: Caddy on the retained VPS

Every production change must be committed before deployment and verified over HTTPS afterward.
