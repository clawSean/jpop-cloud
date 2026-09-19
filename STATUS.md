# Status

- Phase: operational
- Started: 2026-09-17
- Canonical source: `/Users/Sean/projects/jp0p/jpop-cloud`
- Current: mobile-polished midnight workshop live at `https://jpop.cloud`; `www` redirects permanently to the apex
- Candidate: interactive workshop experiment live at `https://jpop.cloud/alive/` with a desktop split view at `https://jpop.cloud/compare/`; both routes are intentionally `noindex`
- Deployment: VPS static root `/srv/websites/jpop.cloud` behind Caddy
- Known gaps: exact public LinkedIn URL and exact Clawdia showcase-repository URL remain unconfirmed
- Proof: production HTTPS/assets return 200; local/live hashes match; root remains unchanged; desktop split view and iPhone experiment renders reviewed; constellation state, accessible quick-look dialog, mobile comparison routing, and zero horizontal drift exercised successfully
- Local candidate (not deployed): Alive project cards now preserve direct-link
  fallbacks while opening an accessible Quick Look dialog, with View Transition
  object names when supported, a static fallback when not, and reduced-motion
  rules. Changes are isolated to `alive/` plus `tests/`.
- Local checks: `node --check alive/site.js`,
  `node tests/motion-phase1-check.mjs`, and `git diff --check`.
