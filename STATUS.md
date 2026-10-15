# Status

Updated: 2026-10-14T22:20:00-07:00 by Sean

- Phase: operational
- Started: 2026-09-17
- Canonical source: `/Users/Sean/projects/jp0p/jpop-cloud`
- Current: reviewed Living Workshop motion/UI pass live at `https://jpop.cloud`; `www` redirects permanently to the apex. The homepage has eight workshop doors, including **Get Schwifty** at canonical `https://schwifty.jpop.cloud/`; the misspelled `shwifty.jpop.cloud` host and legacy `/nick-and-morty/` route redirect permanently. The experience combines a recognizable character-faithful portrait atlas, show-faithful animated portal, Portal Mutation title treatment, eight-entity Interdimensional Cable map, Build/Test/Guard/Recover/Review traces, semantic fallback, and matching homepage/share art.
- Deployment: VPS static root `/srv/websites/jpop.cloud` behind Caddy
- Inbox Island product page source is live from `inbox-island/` at the
  dedicated `https://inboxisland.jpop.cloud` route. It truthfully presents the
  private-pilot state and local-first privacy boundary; public source/release
  links remain placeholders in copy until those artifacts exist. Production
  and committed source hashes match for the homepage and privacy policy.
- Known gaps: exact public LinkedIn URL and exact Clawdia showcase-repository URL remain unconfirmed
- Proof: title-treatment PR #14 merged as `25fdf15`; the two changed production hashes match merged source. Canonical HTTPS returns 200 with the Creepster font request and fresh CSS cache key; production browser proof passes at exact 320/390/768/1440px with eight visible character channels, five workflow controls, accessible state, zero horizontal overflow, browser exceptions, or failed resources. Rollback: `/root/rollbacks/jpop-before-schwifty-portal-mutation-20261015T052003Z.tar.gz` (SHA-256 `82f355301b9c6714a4e5261d6ad1c8613da08fbbfa0246df17eb41611c1716c0`). The misspelled host, legacy route, and old social-card filenames retain their permanent redirects.
