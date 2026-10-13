# Status

- Phase: operational
- Started: 2026-09-17
- Canonical source: `/Users/Sean/projects/jp0p/jpop-cloud`
- Current: reviewed Living Workshop motion/UI pass live at `https://jpop.cloud`; `www` redirects permanently to the apex. The homepage now has eight workshop doors, including the credited Nick & Morty homage at `https://jpop.cloud/nick-and-morty/`. The dedicated route introduces Nick, Morty, Summer, Beth, Jerry, Mr. Meeseeks, Birdperson, and the Citadel, explains the trust/lifecycle/recovery ideas behind the joke, and links directly to Nick and Morty's official site and GitHub.
- Deployment: VPS static root `/srv/websites/jpop.cloud` behind Caddy
- Inbox Island product page source is live from `inbox-island/` at the
  dedicated `https://inboxisland.jpop.cloud` route. It truthfully presents the
  private-pilot state and local-first privacy boundary; public source/release
  links remain placeholders in copy until those artifacts exist. Production
  and committed source hashes match for the homepage and privacy policy.
- Known gaps: exact public LinkedIn URL and exact Clawdia showcase-repository URL remain unconfirmed
- Proof: Nick & Morty source merged as `80ca121`; nine deployed hashes match source. Public HTTPS, official outbound links, OG image, sitemap, mobile menu, portal state, homepage eight-door geometry, reduced motion, and exact 390/768/1440px browser proof pass with zero horizontal overflow, browser exceptions, or failed resources. Rollback: `/root/rollbacks/jpop-before-nick-morty-20261013T181542Z.tar.gz` (SHA-256 `81f15acecf0d9c19a2ecc5d011720fe1a6e3d35ada0af63abf51951b655ded30`).
