# Status

Updated: 2026-10-13T13:01:03-07:00 by Sean

- Phase: operational
- Started: 2026-09-17
- Canonical source: `/Users/Sean/projects/jp0p/jpop-cloud`
- Current: reviewed Living Workshop motion/UI pass live at `https://jpop.cloud`; `www` redirects permanently to the apex. The homepage has eight workshop doors, including the credited Nick & Morty homage at `https://jpop.cloud/nick-and-morty/`. Its interactive second pass is live with an eight-entity Interdimensional Cable map, original portrait atlas, Build/Test/Guard/Recover/Review traces, semantic fallback, and upgraded social art.
- Deployment: VPS static root `/srv/websites/jpop.cloud` behind Caddy
- Inbox Island product page source is live from `inbox-island/` at the
  dedicated `https://inboxisland.jpop.cloud` route. It truthfully presents the
  private-pilot state and local-first privacy boundary; public source/release
  links remain placeholders in copy until those artifacts exist. Production
  and committed source hashes match for the homepage and privacy policy.
- Known gaps: exact public LinkedIn URL and exact Clawdia showcase-repository URL remain unconfirmed
- Proof: interactive-pass source merged as `876e0e4`; all six deployed runtime hashes match. Public HTTPS returns 200 for the page, 357,208-byte WebP atlas, and 162,886-byte PNG social card. Production browser proof passes at exact 320/390/768/1440px with eight visible character channels, five workflow controls, accessible state, zero horizontal overflow, browser exceptions, or failed resources. Rollback: `/root/rollbacks/jpop-before-nm-cable-20261013T200007Z.tar.gz` (SHA-256 `4d26020bc7bce2768b483bbf7079f5a02607f8f7b31896f404323a8930c88c24`).
