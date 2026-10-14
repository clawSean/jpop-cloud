# Status

Updated: 2026-10-13T19:09:00-07:00 by Sean

- Phase: operational
- Started: 2026-09-17
- Canonical source: `/Users/Sean/projects/jp0p/jpop-cloud`
- Current: reviewed Living Workshop motion/UI pass live at `https://jpop.cloud`; `www` redirects permanently to the apex. The homepage has eight workshop doors, including **Get Shwifty** at canonical `https://shwifty.jpop.cloud/`; the legacy `/nick-and-morty/` route redirects permanently. The experience combines a recognizable character-faithful portrait atlas, show-faithful animated portal, eight-entity Interdimensional Cable map, Build/Test/Guard/Recover/Review traces, semantic fallback, and matching homepage/share art.
- Deployment: VPS static root `/srv/websites/jpop.cloud` behind Caddy
- Inbox Island product page source is live from `inbox-island/` at the
  dedicated `https://inboxisland.jpop.cloud` route. It truthfully presents the
  private-pilot state and local-first privacy boundary; public source/release
  links remain placeholders in copy until those artifacts exist. Production
  and committed source hashes match for the homepage and privacy policy.
- Known gaps: exact public LinkedIn URL and exact Clawdia showcase-repository URL remain unconfirmed
- Proof: Get Shwifty source PR #9 merged as `093d652`; canonical-host link fix PR #10 merged as `73ffc7a`. All eight deployed runtime hashes match. Canonical HTTPS and the 206,598-byte share card return 200, the legacy route returns 301 to the canonical host, and superseded social assets return 404 after recoverable retirement. Production browser proof passes at exact 320/390/768/1440px with eight visible character channels, five workflow controls, accessible state, zero horizontal overflow, browser exceptions, or failed resources. Rollback: `/root/rollbacks/jpop-before-get-shwifty-20261014T020813Z.tar.gz` (SHA-256 `d0ff4dd5b765090323974ddf659884052b5548353c268ecc2713bd7b8d574815`).
