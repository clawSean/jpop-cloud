# Status

Updated: 2026-10-22T14:32:00-07:00 by Sean

- Phase: operational
- Started: 2026-09-17
- Canonical source: `/Users/Sean/projects/jp0p/jpop-cloud`
- Current: reviewed Living Workshop motion/UI pass live at `https://jpop.cloud`; `www` redirects permanently to the apex. The homepage exposes **Get Schwifty** immediately in primary navigation and again through its full-width portal door and command palette, all targeting canonical `https://schwifty.jpop.cloud/`; the misspelled `shwifty.jpop.cloud` host and legacy `/nick-and-morty/` route redirect permanently. The experience combines a recognizable character-faithful portrait atlas, show-faithful animated portal, Portal Mutation title treatment with polished phone-scale geometry, eight-entity Interdimensional Cable map, explicit tap-to-explore guidance with a delayed Nick discovery pulse, Build/Test/Guard/Recover/Review traces, semantic and reduced-motion fallbacks, and matching homepage/share art.
- Deployment: VPS static root `/srv/websites/jpop.cloud` behind Caddy
- Inbox Island's public source/support links, final effective privacy policy,
  Limited Use statement, revocation/security channels, and honest 0.4.9
  candidate/Store-verification status are live at
  `https://inboxisland.jpop.cloud`. Production matches committed source byte
  for byte and passes phone/desktop browser proof.
- Mailreef OAuth publication pages are prepared under `/mailreef/`: homepage,
  privacy policy, and terms accurately document the private read-only Gmail
  screening boundary. Deployment and public proof are pending.
- Known gaps: exact public LinkedIn URL and exact Clawdia showcase-repository URL remain unconfirmed
- Proof: homepage-discovery PR #22 merged as `4a6251a`. Source, VPS, and public SHA-256 match for HTML `8deaf1975126d056925db3d5b7419a216d4286d68144988b3fdb0b13f12658c8`. Production browser proof passes at exact 320/390/768/1440px with the new primary-navigation route, existing full portal door, mobile menu, discovery cue, character/workflow controls, reduced-motion path, zero browser exceptions, and zero failed resources. Inbox Island production hashes match source for `index.html` (`7a96bb117a79a06649e4c411f71991194acd6921120d4519b2cb7107b942ffca`), `privacy/index.html` (`7849765e372423d74c26d36a3e03eed7457ee22f487fee91bdf3c3887604a7ba`), and `styles.css` (`32e0bb4a19be3f7081700898d7bf900aebdb6da78aaebf80de4d5cc54ef99a07`); its public browser smoke passes at 390/1440px with no failed resources or browser exceptions. Inbox Island rollback: `/root/rollbacks/inboxisland-before-publication-20261022T1430PDT.tar.gz` (SHA-256 `85e5dfba9c16583a28c2a7632227d6df9b94dae4ce1c9b6682ea3f0e49def1d0`). The misspelled host, legacy route, and old social-card filenames retain their permanent redirects.
