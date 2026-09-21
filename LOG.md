# Log

## 2026-09-21

- Rejected the first motion candidate because it replaced the production page's
  content architecture with an experiment that narrated its own changes.
- Rebuilt the candidate from the production homepage and preserved the visual
  GitHub crew, Proudest section, full eight-door workshop, About section, and
  existing navigation.
- Switched the flagship order to Sean first and Lobster Chat second.
- Added progressive-enhancement Quick Looks only to Sean, Lobster Chat, Claw
  Four, and Edge Tools. Links remain ordinary destinations without JavaScript;
  supported browsers upgrade them to semantic dialogs with View Transitions.
- Verified the candidate at 390px and 1440px, including dialog geometry,
  backdrop/button/Escape closing, focus restoration, zero page-level horizontal
  drift, reduced-motion rules, and absence of experiment/devlog copy.

## 2026-09-17

- Created the canonical project and first responsive single-page portfolio.
- Added selected work for Edge Tools, Lobster Chat, and the Sean/Clawdia agent system.
- Added privacy-specific Lobster Chat copy, product-method framing, background, credentials, and public evidence links.
- Kept unresolved LinkedIn and Clawdia showcase-repository URLs out of the live page rather than inventing destinations.
- Published `clawSean/jpop-cloud`, deployed committed static files to the VPS,
  replaced the old Sean redirect with a static Caddy route, and made `www` a
  permanent canonical redirect.
- Preserved a timestamped VPS rollback copy, validated and reloaded Caddy, then
  verified live HTTPS, content/assets, local/live hashes, desktop rendering, and
  true 390px mobile rendering without horizontal overflow.
- Ran a final Fable 5.1 review and tightened privacy wording, role framing,
  navigation labels, contrast, heading semantics, public evidence links, and
  mobile-menu keyboard behavior. Redeployed the reviewed version with a second
  rollback copy and repeated live hash/content/mobile proof.
- Ran a second bounded Fable 5.1 review for the friends, family, and employer
  audience. Accepted the faster two-line hero, earlier Edge context,
  plain-language privacy descriptions, clearer method navigation, and a less
  repetitive About section. Rejected unconfirmed contact links and unnecessary
  stock-style personalization.
- Rejected the warm-editorial portfolio direction after JPop correctly called it
  an application instead of an invitation. Researched adventurous independent
  portfolio and product sites, then rebuilt the page as a midnight workshop.
- Made Lobster Chat and Sean the two primary doors, added a visual GitHub crew
  rail, surfaced eight live hosted experiences, and added project filters plus
  an optional all-destinations palette.
- Used two bounded Fable 5.1 passes for creative direction and hostile review.
  Restored exact privacy boundaries, removed unsupported hype, corrected
  credentials, raised small type, fixed contrast and filter semantics, removed
  fragile scroll reveals, and replaced the beige-era favicon/social card.
- Deployed an obscure temporary preview, normalized Caddy ownership/modes, and
  verified desktop and iPhone rendering, zero horizontal overflow, lazy image
  loading, mobile menu state/scroll lock, filters, and palette results before
  allowing the redesign onto the root domain.
- Published the reviewed source, preserved a timestamped production rollback,
  deployed the root site, removed the retired beige social card, normalized
  ownership/modes, and matched production hashes to source. Root, assets, and
  canonical `www` redirect returned 200; production interactions passed again.
- Ran three independent Fable 5.1 mobile reviews covering art direction,
  product hierarchy, and copy. Applied their shared recommendations: faster
  hero pacing, visual-first flagship cards, clearer calls to action, tighter
  mobile spacing, shorter project doors, readable privacy details, unclipped
  filters, plainer About copy, touch feedback, and touch-safe command search.
- Preserved the requested top-of-page GitHub rail and visible privacy promises
  despite reviewer suggestions to move or collapse them. Deployed with rollback
  archive `mobile-polish-20260918T055436Z.tar.gz`, normalized `caddy:caddy / 0644`,
  matched source/production hashes, and re-proved mobile and desktop rendering,
  menu/scroll lock, filters, 13 palette destinations, zero scrollable horizontal
  drift, and public 200 responses.
- Built an isolated `alive` candidate rather than replacing the homepage. It adds
  a cached public-work pulse, a tappable project constellation, screenshot-backed
  quick-look drawers, and a stable same-origin comparison route. Both experiment
  routes are `noindex`; the mobile comparison intentionally opens each version
  full-screen instead of rendering unusably narrow paired frames.
- Published `/alive/` and `/compare/` without touching the root homepage. Normalized
  production ownership and modes, verified public `200` responses and source/live
  hashes, exercised the constellation and quick-look dialog, and reviewed desktop
  side-by-side plus iPhone layouts with no horizontal drift.
