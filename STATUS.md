# Status

Updated: 2026-10-13T19:07:00-07:00 by Sean

- Phase: operational
- Started: 2026-09-17
- Canonical source: `/Users/Sean/projects/jp0p/jpop-cloud`
- Current: reviewed Living Workshop motion/UI pass live at `https://jpop.cloud`; `www` redirects permanently to the apex. The homepage has eight workshop doors, including the credited Nick & Morty homage at `https://jpop.cloud/nick-and-morty/`. Its interactive second pass is live with an eight-entity Interdimensional Cable map, recognizable character-faithful portrait atlas, Build/Test/Guard/Recover/Review traces, semantic fallback, and matching social art.
- Candidate: make `https://shwifty.jpop.cloud/` canonical as **Get Shwifty**, redirect the legacy route, and carry a show-faithful green portal through the cast map, closing ensemble art, homepage door, and social card. Local deterministic and real-browser proof passes at 320/390/768/1440px; production deployment is the next step.
- Deployment: VPS static root `/srv/websites/jpop.cloud` behind Caddy
- Inbox Island product page source is live from `inbox-island/` at the
  dedicated `https://inboxisland.jpop.cloud` route. It truthfully presents the
  private-pilot state and local-first privacy boundary; public source/release
  links remain placeholders in copy until those artifacts exist. Production
  and committed source hashes match for the homepage and privacy policy.
- Known gaps: exact public LinkedIn URL and exact Clawdia showcase-repository URL remain unconfirmed
- Proof: character-likeness source PR #7 merged as `81fc025`; all five deployed runtime hashes match. Public HTTPS returns 200 for the page, 234,017-byte AVIF atlas, and 468,547-byte PNG social card; retired v1 image URLs return 404. Production browser proof passes at exact 320/390/768/1440px with eight visible character channels, five workflow controls, accessible state, zero horizontal overflow, browser exceptions, or failed resources. Rollback: `/root/rollbacks/jpop-before-nm-likeness-20261014T002755Z.tar.gz` (SHA-256 `48d8e730620acf590f80bf1b42e40d72a58f2ca8f4e338c0c4f46820ed4c64ec`).
