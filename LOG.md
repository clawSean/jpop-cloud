# Log

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
