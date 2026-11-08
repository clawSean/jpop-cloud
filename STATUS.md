# Status

Updated: 2026-11-07T16:26:40-08:00 by Sean
working: Sean · 2026-11-07T16:26:40-08:00 · launch `media.jpop.cloud`

- Phase: operational
- Started: 2026-09-17
- Canonical source: `/Users/Sean/projects/jp0p/jpop-cloud`
- Current: reviewed Living Workshop motion/UI pass live at `https://jpop.cloud`; `www` redirects permanently to the apex. The homepage exposes **Get Schwifty** immediately in primary navigation and again through its full-width portal door and command palette, all targeting canonical `https://schwifty.jpop.cloud/`; the misspelled `shwifty.jpop.cloud` host and legacy `/nick-and-morty/` route redirect permanently. The experience combines a recognizable character-faithful portrait atlas, show-faithful animated portal, Portal Mutation title treatment with polished phone-scale geometry, eight-entity Interdimensional Cable map, explicit tap-to-explore guidance with a delayed Nick discovery pulse, Build/Test/Guard/Recover/Review traces, semantic and reduced-motion fallbacks, and matching homepage/share art.
- Deployment: VPS static root `/srv/websites/jpop.cloud` behind Caddy
- In progress: a dedicated, data-driven media room at `media.jpop.cloud` for
  songs, videos, images, and posters, with the smallest possible discovery
  addition to the existing homepage.
- Inbox Island's Chrome-first `0.5.0` review-candidate homepage, effective
  November 3 privacy policy, public source/support links, Limited Use statement,
  revocation/security channels, and exact remaining Google/Store review gates
  are live at `https://inboxisland.jpop.cloud`. Production matches committed
  source byte for byte and passes phone/desktop browser proof.
- Mailreef's OAuth homepage, privacy policy, and terms are live under
  `https://jpop.cloud/mailreef/`. All three return HTTPS 200, render cleanly in
  managed Chrome at phone width with zero page errors, and match committed
  source byte for byte.
- Known gaps: exact public LinkedIn URL and exact Clawdia showcase-repository URL remain unconfirmed
- Proof: homepage-discovery PR #22 merged as `4a6251a`. Source, VPS, and public SHA-256 match for HTML `8deaf1975126d056925db3d5b7419a216d4286d68144988b3fdb0b13f12658c8`. Production browser proof passes at exact 320/390/768/1440px with the new primary-navigation route, existing full portal door, mobile menu, discovery cue, character/workflow controls, reduced-motion path, zero browser exceptions, and zero failed resources. Inbox Island source commit `b81d59f` matches VPS/public for `index.html` (`5eacc80599f65974a23734103891d36bb3f921fe1dbbda6f09eced8bedae8329`), `privacy/index.html` (`de648167f5a0155384deda74b26e96f7a0952592ebee14fdbc878ba52fadedfe`), and `styles.css` (`32e0bb4a19be3f7081700898d7bf900aebdb6da78aaebf80de4d5cc54ef99a07`); its public browser smoke passes at 390/1440px with no failed resources or browser exceptions. Inbox Island rollback: `/root/rollbacks/inboxisland-before-0.5.0-site-20261104T050955Z.tar.gz` (SHA-256 `422b3905d7d0248b9f8b54c3bd1a2ea74354472cbd435630f6ac0bf68f3f82cd`). Mailreef source/VPS SHA-256 matches for homepage `499bca014625d6970ec3480f00aa3eea93873969c8fe4ad5ed7c2f82f0df61f5`, privacy `3d19dfd95f3319d6666a821c9e8da9e92f3013fb30777504fe36bc3840c13ff9`, and terms `b8f8e50524d8ca3e871be4feee5eb2ad4a464c10a1fb8d7577d69c0d5b3d67ad`. The misspelled host, legacy route, and old social-card filenames retain their permanent redirects.
