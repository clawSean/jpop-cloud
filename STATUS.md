# Status

Updated: 2026-11-07T17:09:44-08:00 by Sean

- Phase: operational
- Started: 2026-09-17
- Canonical source: `/Users/Sean/projects/jp0p/jpop-cloud`
- Current: reviewed Living Workshop motion/UI pass live at `https://jpop.cloud`; `www` redirects permanently to the apex. The homepage exposes **Get Schwifty** immediately in primary navigation and again through its full-width portal door and command palette, all targeting canonical `https://schwifty.jpop.cloud/`; the misspelled `shwifty.jpop.cloud` host and legacy `/nick-and-morty/` route redirect permanently. The experience combines a recognizable character-faithful portrait atlas, show-faithful animated portal, Portal Mutation title treatment with polished phone-scale geometry, eight-entity Interdimensional Cable map, explicit tap-to-explore guidance with a delayed Nick discovery pulse, Build/Test/Guard/Recover/Review traces, semantic and reduced-motion fallbacks, and matching homepage/share art.
- Deployment: VPS static roots `/srv/websites/jpop.cloud` and
  `/srv/websites/media.jpop.cloud` behind Caddy
- `https://media.jpop.cloud/` is live as a dedicated, data-driven media room for
  songs, videos, images, and posters. Its launch shelf now uses eight individual
  transparent Get Schwifty assets rather than composite promo banners, with the
  related pieces grouped as one collection while each retains its own viewer,
  deep link, native share action, and download. The collection-aware manifest,
  format filters, honest empty states, audio/video player support, 1200×630
  share card, and documented atomic-upload workflow prepare the same room for
  future formats. The existing homepage keeps only its primary-nav route and
  command-palette entry, preserving its architecture and eight-door grid.
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
- Media proof: launch PR #24 merged as `42fe828`; deterministic visual-proof
  follow-up PR #25 merged as `318ae88`. Source/VPS/public SHA-256 matches for
  HTML `9a435fb20b44b8a5fda8c3c573c1e8d96a82a1dc9a01f69cf0194ba5330672cd`,
  CSS `6c040de5cd3ee184c786177046ba602fbc0c1fd98e8b14b69249c5236a053e77`,
  JavaScript `275c0cdad35b24c879faeabd14169bfe6a4ed1f19f7d05b40262f843f913e0a4`,
  manifest `dd1b12e44ab3db6d7a59d7d1a7d85b58c4edd2fcef57f789e277c711aa651593`,
  and share card `6ac89dcbc5292fe6d33cfcaacf7d5f6779ee899e9bd20699f0fd7287b33e7bdf`.
  Public Chrome proof passes at 320/390/768/1440px with filters, empty state,
  modal/deep-link behavior, featured artwork painted before capture, zero
  overflow, zero browser exceptions, and zero failed resources. Rollbacks:
  `/root/rollbacks/media-before-launch-20261108T003842Z/` and
  `/root/rollbacks/jpop-before-media-nav-20261108T003842Z.tar.gz` (SHA-256
  `e31d05d445d19e3a499dc591755357c685316bb2f26c2bad67e3bb2d31e859b2`).
  Atomic-library correction PR #27 merged as `b1594da`; source, VPS, and public
  SHA-256 match for HTML
  `bb56204cf6008f42e83fa59a0503c997670119d8ba1af615bf35fa86d6769f9f`,
  CSS `030a52129db44e39ff518c444f70b9d7bd9e4e9d57a7d1e6f6a2c26a816e4580`,
  JavaScript
  `f7f4372088bb28ed9105c4ca1b0948088de45ae87f6d03d59143e791484fce12`,
  manifest
  `93a875a4bef9cd2597fe4d837d1d6ee19b4c54344d966a118a0e455ec3cd527d`,
  and all eight transparent PNG assets. Public Chrome proof passes again at
  320/390/768/1440px with eight independent asset tiles, one collection,
  native share/download controls, deep links, zero overflow, zero browser
  exceptions, and zero failed resources. Rollback:
  `/root/rollbacks/media-before-atomic-assets-20261108T010823Z.tar.gz`
  (SHA-256
  `1431fc278c4334826bf4836ba64937062490d09bd248debd4e5ab7cb19ce1d5b`).
