# Status

Updated: 2026-10-14T23:16:01-07:00 by Sean

- Phase: operational
- Started: 2026-09-17
- Canonical source: `/Users/Sean/projects/jp0p/jpop-cloud`
- Current: reviewed Living Workshop motion/UI pass live at `https://jpop.cloud`; `www` redirects permanently to the apex. The homepage has eight workshop doors, including **Get Schwifty** at canonical `https://schwifty.jpop.cloud/`; the misspelled `shwifty.jpop.cloud` host and legacy `/nick-and-morty/` route redirect permanently. The experience combines a recognizable character-faithful portrait atlas, show-faithful animated portal, Portal Mutation title treatment, eight-entity Interdimensional Cable map, explicit tap-to-explore guidance with a delayed Nick discovery pulse, Build/Test/Guard/Recover/Review traces, semantic and reduced-motion fallbacks, and matching homepage/share art.
- Deployment: VPS static root `/srv/websites/jpop.cloud` behind Caddy
- Inbox Island product page source is live from `inbox-island/` at the
  dedicated `https://inboxisland.jpop.cloud` route. It truthfully presents the
  private-pilot state and local-first privacy boundary; public source/release
  links remain placeholders in copy until those artifacts exist. Production
  and committed source hashes match for the homepage and privacy policy.
- Known gaps: exact public LinkedIn URL and exact Clawdia showcase-repository URL remain unconfirmed
- Proof: interaction-cue PR #18 merged as `fc91be5`. Source, VPS, and public SHA-256 match for HTML `9de1e437d56c78e5e02e02d56473179f89eec920931e4b54ae15c09bf53a7955`, CSS `ac504170a58bdb1e8311eb59aef257ffc8f61f62abc74f0330b2a31b96841262`, and JS `cfb61da4980a8983d0fb21ef1edf3672ae6fe479410c5a3b70097b841d55ba4c`. Production browser proof passes at exact 320/390/768/1440px with the immediate hint, three-second pulse, first-interaction dismissal, reduced-motion protection, eight character channels, five workflow controls, accessible state, zero horizontal overflow, browser exceptions, or failed resources. Latest rollback: `/root/rollbacks/jpop-before-schwifty-cable-discovery-20261015T061453Z.tar.gz` (SHA-256 `ae27f7fee7cb0b8ba7268764b8d6b4e928ef0e540ed1167527b552102903e99c`). The misspelled host, legacy route, and old social-card filenames retain their permanent redirects.
