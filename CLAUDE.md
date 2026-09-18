# Sera event introduction

Build a concise English introduction for stablecoin issuers, PSPs, neobanks and similar fintechs. The outcome is a qualified Telegram introduction, not a trading signup.

- Read `docs/research.md` before changing factual claims. Do not invent rates, currencies available in production, partnerships, performance, revenue, APY, compliance, or guarantees. Distinguish off-chain matching from Ethereum settlement. Lending, FCICAMM, position NFTs and derivatives are roadmap, not demonstrated live functionality.
- `src/content.ts` owns scene timing/copy and the canonical URL/Telegram destination. Keep the last scene, VTT, QR and duration synchronized.
- Official brand assets are in `public/brand`. Dark green is intentional; use IBM Plex Sans with Sera green/mint. Keep text readable without sound.
- `src/Composition.tsx` is shared between Remotion rendering and the browser Player. Animation must depend on Remotion frames, not wall time or CSS animation.
- `npm run dev` runs the page; `npm run studio` opens Remotion. `npm run render` writes the downloadable MP4; `npm run build` builds Pages.
- Before finishing: `npm run check`, `npm test`, `npm run render:still`. Review screenshots at 390px and desktop. Render MP4 when motion or timing changes.
- Work on a branch and open a PR. Never auto-merge, change credentials, or weaken workflow permissions. Review factual changes against cited sources.
- Use `@claude` (not `@ClaudeCode`) in GitHub issues/comments after the app and secret are configured.
- Never collect contact details in this public repository. `docs/event-playbook.md` is the event operator guide.
