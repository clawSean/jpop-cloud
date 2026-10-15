# Log

## 2026-10-13 — Nick & Morty homage

### Canonical Get Schwifty spelling correction (2026-10-14)

- Corrected the public title, homepage/search copy, canonical URL, metadata,
  sitemap, CSS class naming, test expectations, and both share-card assets from
  **Get Shwifty** to the canon spelling **Get Schwifty**.
- Merged source PR #12 as `c29f0f0`, deployed the seven exact-hash runtime
  files, and moved the canonical host to `https://schwifty.jpop.cloud/`.
  `shwifty.jpop.cloud`, `/nick-and-morty/`, and the old share-card paths now
  redirect permanently to corrected canonical locations.
- Public browser proof passes at 320/390/768/1440px with zero overflow,
  exceptions, or failed resources. Preserved rollback archive
  `/root/rollbacks/jpop-before-get-schwifty-spelling-20261015T035034Z.tar.gz`
  (SHA-256
  `2baccfb203bfe653eaa753be96c298ca4bc31d4b63ab381e33916d9b808f502a`)
  plus the prior assets under
  `/root/rollbacks/retired-shwifty-spelling-20261015T035034Z/`.

### Get Shwifty canonical portal pass

- Prepared `https://shwifty.jpop.cloud/` as the canonical URL and retitled the
  experience **Get Shwifty**, while keeping the existing source route available
  for a permanent production redirect.
- Built a code-native show-faithful portal from an irregular luminous lime rim,
  yellow-green vortex core, moving whorls, flecks, spatter, and reduced-motion
  fallback. Carried the portal through the cast map, closing ensemble art,
  homepage workshop door, and 1200×630 share card.
- Preserved all eight character channels, five workflow traces, explicit Nick
  credit, and privacy boundary. Local deterministic and browser checks pass at
  320, 390, 768, and 1440px with zero overflow, exceptions, or failed assets.
- Merged source PR #9 as `093d652` and the canonical-host return-link repair in
  PR #10 as `73ffc7a`. Added the `shwifty.jpop.cloud` Caddy route, permanently
  redirected the legacy page route, and used the existing wildcard DNS without
  a provider change. All eight runtime hashes match source; public browser proof
  passes at 320/390/768/1440px. Rollback:
  `/root/rollbacks/jpop-before-get-shwifty-20261014T020813Z.tar.gz` (SHA-256
  `d0ff4dd5b765090323974ddf659884052b5548353c268ecc2713bd7b8d574815`).

### Character-likeness pass

- Replaced the generic sci-fi stand-ins with immediately recognizable Rick,
  Morty, Summer, Beth, Jerry, Mr. Meeseeks, Birdperson, and Citadel designs in
  an original rendered treatment, preserving the existing 4×2 sprite geometry.
- Published a 234KB transparent AVIF atlas and matching 1200×630 social card,
  bumped the page asset cache key, and retired the obsolete v1 images to
  recoverable VPS storage.
- Merged source PR #7 as `81fc025`, preserved rollback archive
  `/root/rollbacks/jpop-before-nm-likeness-20261014T002755Z.tar.gz` (SHA-256
  `48d8e730620acf590f80bf1b42e40d72a58f2ca8f4e338c0c4f46820ed4c64ec`),
  and matched all five production hashes to source without changing Caddy or
  DNS. Public proof passed again at 320, 390, 768, and 1440px.

### Interactive ensemble pass

- Rebuilt the hero around an Interdimensional Cable system map with all eight
  credited entities visible at once, hover/focus/tap dossiers, direct casefile
  links, and Build/Test/Guard/Recover/Review workflow traces.
- Replaced the typographic placeholders with an original eight-character
  retro-future portrait atlas and matching social card while preserving the
  explicit fan-homage and Nick-ownership boundaries.
- Added a semantic relationship-map fallback, 44px interaction targets,
  reduced-motion handling, a sub-500KB published atlas, and exact browser proof
  at 320, 390, 768, and 1440px with no overflow, exceptions, or failed assets.
- Merged source PR #5 as `876e0e4`, preserved rollback archive
  `/root/rollbacks/jpop-before-nm-cable-20261013T200007Z.tar.gz` (SHA-256
  `4d26020bc7bce2768b483bbf7079f5a02607f8f7b31896f404323a8930c88c24`),
  and deployed the six exact-hash runtime files with normalized
  `caddy:caddy` / `0644` ownership and modes. Public 320/390/768/1440px proof
  passed again without changing Caddy or DNS.

- Added a dedicated `/nick-and-morty/` page as an explicitly credited,
  independent homage to Nick's character-driven agent ecosystem.
- Covered Nick, Morty, Summer, Beth, Jerry, Mr. Meeseeks, Birdperson, and the
  Citadel while keeping private host, credential, and network details out.
- Added a responsive eighth homepage workshop door, command-palette result,
  sitemap entry, 1200×630 share card, reduced-motion support, no-JavaScript
  content fallback, and local/public browser checks.
- Merged PR #3 as `80ca121`, preserved rollback archive
  `/root/rollbacks/jpop-before-nick-morty-20261013T181542Z.tar.gz` (SHA-256
  `81f15acecf0d9c19a2ecc5d011720fe1a6e3d35ada0af63abf51951b655ded30`),
  and deployed nine exact-hash files without a Caddy change.
- Public proof passed at 390, 768, and 1440px with zero horizontal overflow,
  browser exceptions, or failed resources. The first asset request exposed an
  rsync-preserved `0700` directory; corrected it to `caddy:caddy` / `0755`,
  re-proved the new OG image plus existing assets, and documented the safer
  no-owner/no-group/no-perms deployment rule in the repo README.

## 2026-09-21 — Motion candidate promoted to production

- JPop approved the fully reviewed candidate for production.
- Merged PR #2 as canonical commit `8fa64d9` and deployed `index.html`,
  `styles.css`, and `site.js` to `/srv/websites/jpop.cloud`.
- Preserved rollback archive
  `home-before-motion-20260922-004839.tar.gz` before replacing production.
- Normalized deployed ownership/modes to `caddy:caddy` / `0644`; production
  hashes match merged source.
- Verified all filters, the Edge Tools Quick Look and focus return, progress-map
  state, zero overflow at 390/768/1280/1440px, and zero browser errors.
- Retired the now-redundant `/alive-motion-phase1/` route to recoverable VPS
  storage at `.retired/alive-motion-phase1-20260922-005148` after production
  proof; the canonical root remains the only current version.

## 2026-09-21 — Animated filters and workshop map

- Preserved commit `8bee6aa` as the exact rollback point JPop approved.
- Added animated Play, Travel, Tools, and Lab filtering without changing the
  seven-door content or direct-link/Quick Look behavior.
- Added accessible live result counts and removed filtered cards from keyboard
  navigation while hidden.
- Added a compact progress rail for Proudest, Workshop, and About on viewports
  wide enough to give it dedicated edge space; smaller screens keep the clean
  page without an overlay.
- Fixed the delegated FLIP transition during review, then verified every filter,
  progress state, Quick Look focus restoration, zero overflow at 390/768/1280/
  1440px, no browser errors, and the reduced-motion fallback.
- Published only to the noindex candidate route; production remains unchanged.

## 2026-09-21 — Motion and hierarchy refinement

- Preserved the hero-orbit composition while adding slow counter-rotation and
  restrained signal-dot breathing, with a static reduced-motion path.
- Removed Euro Summer from the workshop and command palette.
- Promoted Edge Tools to a featured wide door with stronger product/QA/ops copy
  and more expressive grid motion.
- Kept existing icon interactions and added a secondary `Live preview` hover,
  focus, and touch cue for the two preview-capable workshop doors.
- Rebalanced the seven-door desktop grid to avoid empty columns after removal.
- Published only to the noindex candidate route; production remains unchanged.
- Verified 390, 768, and 1280px layouts, zero page overflow, orbit animation,
  Edge Tools Quick Look, no browser errors, and reduced-motion coverage.

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
# 2026-09-21 — Consolidate oversized section gaps

- Replaced the desktop hero's unbounded full-viewport stage with a bounded responsive height while preserving its composition and orbit.
- Removed stacked bottom/top padding between the GitHub crew and Proudest sections.
- Left the already-compact mobile rhythm unchanged.
- Verified the live noindex candidate at desktop and 390px with zero horizontal overflow.
- Production remains untouched.

## Hero title alignment follow-up

- Removed vertical centering from the desktop hero so the kicker and title stay
  anchored directly beneath the fixed navigation on tall screens.
- Preserved the mobile hero override, orbit composition, and lower section rhythm.
# 2026-10-12 — Inbox Island product page

- Added a dedicated responsive product page and draft pilot privacy policy for
  `inboxisland.jpop.cloud`.
- Kept the page honest about the restricted `gmail.readonly` grant, local-only
  processing, no Inbox Island server, memory-only tokens, bounded sync, and
  pre-publication status. No source, release, or install link was invented.
- Verified both routes through a local static server. Arc headless screenshot
  mode did not complete, so visual browser proof remains pending.
- Published committed source `905961a` to `/srv/websites/inboxisland.jpop.cloud`,
  added the dedicated Caddy route, validated and reloaded Caddy, obtained TLS,
  and verified public HTTPS `200` plus exact source/live hashes for `/` and
  `/privacy/`. Existing sites were not modified.
