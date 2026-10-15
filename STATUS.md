# Status

Updated: 2026-10-14T20:52:00-07:00 by Sean

- Phase: operational
- Started: 2026-09-17
- Canonical source: `/Users/Sean/projects/jp0p/jpop-cloud`
- Current: reviewed Living Workshop motion/UI pass live at `https://jpop.cloud`; `www` redirects permanently to the apex. The homepage has eight workshop doors, including **Get Schwifty** at canonical `https://schwifty.jpop.cloud/`; the misspelled `shwifty.jpop.cloud` host and legacy `/nick-and-morty/` route redirect permanently. The experience combines a recognizable character-faithful portrait atlas, show-faithful animated portal, eight-entity Interdimensional Cable map, Build/Test/Guard/Recover/Review traces, semantic fallback, and matching homepage/share art.
- Deployment: VPS static root `/srv/websites/jpop.cloud` behind Caddy
- Inbox Island product page source is live from `inbox-island/` at the
  dedicated `https://inboxisland.jpop.cloud` route. It truthfully presents the
  private-pilot state and local-first privacy boundary; public source/release
  links remain placeholders in copy until those artifacts exist. Production
  and committed source hashes match for the homepage and privacy policy.
- Known gaps: exact public LinkedIn URL and exact Clawdia showcase-repository URL remain unconfirmed
- Proof: canonical-spelling PR #12 merged as `c29f0f0`; all seven deployed runtime hashes match. Canonical HTTPS and the 207,958-byte share card return 200; the misspelled host, legacy route, and old social-card filenames return permanent redirects to the corrected locations. Production browser proof passes at exact 320/390/768/1440px with eight visible character channels, five workflow controls, accessible state, zero horizontal overflow, browser exceptions, or failed resources. Rollback: `/root/rollbacks/jpop-before-get-schwifty-spelling-20261015T035034Z.tar.gz` (SHA-256 `2baccfb203bfe653eaa753be96c298ca4bc31d4b63ab381e33916d9b808f502a`); prior misspelled assets remain recoverable under `/root/rollbacks/retired-shwifty-spelling-20261015T035034Z/`.
