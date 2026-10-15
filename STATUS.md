# Status

Updated: 2026-10-15T09:30:50-07:00 by Sean

- Phase: operational
- Started: 2026-09-17
- Canonical source: `/Users/Sean/projects/jp0p/jpop-cloud`
- Current: reviewed Living Workshop motion/UI pass live at `https://jpop.cloud`; `www` redirects permanently to the apex. The homepage has eight workshop doors, including **Get Schwifty** at canonical `https://schwifty.jpop.cloud/`; the misspelled `shwifty.jpop.cloud` host and legacy `/nick-and-morty/` route redirect permanently. The experience combines a recognizable character-faithful portrait atlas, show-faithful animated portal, Portal Mutation title treatment with polished phone-scale geometry, eight-entity Interdimensional Cable map, explicit tap-to-explore guidance with a delayed Nick discovery pulse, Build/Test/Guard/Recover/Review traces, semantic and reduced-motion fallbacks, and matching homepage/share art.
- Deployment: VPS static root `/srv/websites/jpop.cloud` behind Caddy
- Inbox Island product page source is live from `inbox-island/` at the
  dedicated `https://inboxisland.jpop.cloud` route. It truthfully presents the
  private-pilot state and local-first privacy boundary; public source/release
  links remain placeholders in copy until those artifacts exist. Production
  and committed source hashes match for the homepage and privacy policy.
- Known gaps: exact public LinkedIn URL and exact Clawdia showcase-repository URL remain unconfirmed
- Proof: mobile-title polish PR #20 merged as `a79f1b5`. Source, VPS, and public SHA-256 match for HTML `08937f03a5176fdc03ab0f8852a0513429c2f1b39049602e61f423bd79a7250e` and CSS `fa033857cf46646a790f1b90402670962b05541e72e39f96fd1260ae1215371c`. At 390px the hero now has exact 20px gutters, a 79.95px title, an 80.9% longest-line occupancy, and no horizontal overflow. Production browser proof passes at exact 320/390/768/1440px with the discovery cue, character/workflow controls, reduced-motion path, menu, zero browser exceptions, and zero failed resources. Latest rollback: `/root/rollbacks/jpop-before-schwifty-mobile-title-polish-20261015T162924Z.tar.gz` (SHA-256 `0050edf929c3bad87d99e4142c41b9b65a3f1ae2b5588d9793550f00c67d03e3`). The misspelled host, legacy route, and old social-card filenames retain their permanent redirects.
