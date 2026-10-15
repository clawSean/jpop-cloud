# Status

Updated: 2026-10-15T11:01:13-07:00 by Sean

- Phase: operational
- Started: 2026-09-17
- Canonical source: `/Users/Sean/projects/jp0p/jpop-cloud`
- Current: reviewed Living Workshop motion/UI pass live at `https://jpop.cloud`; `www` redirects permanently to the apex. The homepage exposes **Get Schwifty** immediately in primary navigation and again through its full-width portal door and command palette, all targeting canonical `https://schwifty.jpop.cloud/`; the misspelled `shwifty.jpop.cloud` host and legacy `/nick-and-morty/` route redirect permanently. The experience combines a recognizable character-faithful portrait atlas, show-faithful animated portal, Portal Mutation title treatment with polished phone-scale geometry, eight-entity Interdimensional Cable map, explicit tap-to-explore guidance with a delayed Nick discovery pulse, Build/Test/Guard/Recover/Review traces, semantic and reduced-motion fallbacks, and matching homepage/share art.
- Deployment: VPS static root `/srv/websites/jpop.cloud` behind Caddy
- Inbox Island product page source is live from `inbox-island/` at the
  dedicated `https://inboxisland.jpop.cloud` route. It truthfully presents the
  private-pilot state and local-first privacy boundary; public source/release
  links remain placeholders in copy until those artifacts exist. Production
  and committed source hashes match for the homepage and privacy policy.
- Known gaps: exact public LinkedIn URL and exact Clawdia showcase-repository URL remain unconfirmed
- Proof: homepage-discovery PR #22 merged as `4a6251a`. Source, VPS, and public SHA-256 match for HTML `8deaf1975126d056925db3d5b7419a216d4286d68144988b3fdb0b13f12658c8`. Production browser proof passes at exact 320/390/768/1440px with the new primary-navigation route, existing full portal door, mobile menu, discovery cue, character/workflow controls, reduced-motion path, zero browser exceptions, and zero failed resources. Latest rollback: `/root/rollbacks/jpop-before-schwifty-nav-20261015T180017Z.tar.gz` (SHA-256 `590067fdc028c9f0e6f47ed1e9f358c6f1bdee438e0a5ac9dc64bed482ef21ed`). The misspelled host, legacy route, and old social-card filenames retain their permanent redirects.
