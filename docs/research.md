# Sera / on-chain FX research and editorial decisions

Reviewed 2026-09-18. Official documentation is the primary source for product claims, not an independent verification of production behavior. Recheck before each event. This is a community-made introduction, not an official product announcement.

## What the film explains

FX is exchanging currencies. Stablecoins are tokens designed to track an underlying currency; they are not identical to bank deposits and the peg is not guaranteed. On-chain finance uses smart contracts for financial operations and verifiable records. It does not mean every system component runs on a blockchain.

Sera is a stablecoin FX exchange. Its central limit order book matches orders off-chain, with smart contracts holding vault balances and settling matched trades on Ethereum. That is the core distinction the film illustrates. API access supports integration discussions. A currency corridor is the pair of currencies a business needs to exchange.

## Evidence / wording map

| Topic                     | Primary evidence                                                                                      | Editorial decision                                                                                                                                                                                                             |
| ------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Product and architecture  | https://docs.sera.cx/                                                                                 | “Stablecoin FX”, off-chain matching, on-chain settlement. Do not turn sub-second matching into a settlement guarantee.                                                                                                         |
| Current versus planned    | https://docs.sera.cx/protocol/swap/ and https://docs.sera.cx/protocol/roadmap/                        | Current CLOB + settlement. FCICAMM, ERC-1155 positions and later lending/derivatives are roadmap. Omit from short film.                                                                                                        |
| Custody                   | https://docs.sera.cx/non-custodial/                                                                   | Funds are in smart contracts rather than the matching engine. Do not imply absence of contract, issuer or operational risk. Emergency withdrawals have protocol conditions/delays.                                             |
| Fees and network          | https://docs.sera.cx/fees/                                                                            | No “free”, “zero fee”, fixed spread or fixed settlement time claims. Network and market conditions matter.                                                                                                                     |
| Market availability       | https://docs.sera.cx/currency-pairs/                                                                  | The current mainnet page lists verified mainnet tokens; separate testnet pages list test tokens. Live deployment token/market APIs are authoritative. Diagram currencies are illustrative, not confirmed production corridors. |
| Contact                   | https://docs.sera.cx/faq/                                                                             | Official community: https://t.me/seraprotocol. Temporary general contact, not a named sales representative.                                                                                                                    |
| Brand                     | https://www.sera.cx/brand                                                                             | Official white wordmark; IBM Plex Sans. Official green #00D26A and mint #59E39A. Custom dark background #062C21 follows the user's brief.                                                                                      |
| Broader payment context   | https://www.bis.org/cpmi/publ/d220.pdf                                                                | Stablecoin arrangements may address some frictions but introduce risks and do not automatically improve cross-border payments. Conversion and cash-out remain separate.                                                        |
| Atomic settlement context | https://www.bis.org/publications/aer-2023/blueprint-future-monetary-system-improving-old-enabling-new | Programmability can coordinate exchange legs. Do not equate atomic execution with risk-free money or universal legal finality.                                                                                                 |

## Claims intentionally excluded

No unverified 120+ production currency claim, APY, volume, “best rate”, “no risk”, regulatory approval, universal access, guaranteed bank payout, fee saving percentage or bank-account opening claim. Do not conflate the consumer `sera.money` product, agent tooling and the core protocol. Marketing pages and technical docs have different levels of specificity; the current-deployment section wins for architecture.

## Token2049 edit (30 seconds, 1920×1080, 30 fps)

Re-edited 2026-09-19 for brief booth and standing-reception introductions. This replaces the 52-second version, rather than speeding up its text.

| Time  | Message                                   | User-provided screenshot               |
| ----- | ----------------------------------------- | -------------------------------------- |
| 00–04 | Stablecoin FX, with settlement on-chain   | 3.jpg: English wallet overview         |
| 04–10 | Exchange currency stablecoins             | 0.jpg: Japanese USDT / JPYC swap form  |
| 10–17 | See a completed swap and transaction link | 1.jpg: Japanese swap receipt           |
| 17–23 | Off-chain matching / Ethereum settlement  | 2.jpg: Japanese transaction history    |
| 23–30 | Telegram conversation                     | Stationary QR to the introduction page |

English headlines explain the Japanese UI without altering the supplied screenshots. Screens are recorded examples, not a live quote or proof of present market availability. The history includes a failed transaction; no universal-success claim is made. No image is presented as footage of an interaction we performed.

All six supplied screenshots were reviewed. 4.jpg (position form with insufficient funds) and 5.jpg (cashback offers) are retained as source material but excluded from the short FX introduction. Their presence does not establish lending, yield or cashback promises in this film.

The film has no voiceover or music, so the story works in a noisy venue. The final QR remains steady for seven seconds and points to the landing page so future contact changes do not invalidate printed copies. English WebVTT and page copy are updated alongside the film.

## Reference implementations and tooling

Reviewed https://www.remotion.dev/, https://www.remotion.dev/docs/player, https://www.reactvideoeditor.com/remotion-templates and https://github.com/reactvideoeditor/remotion-templates. Animation is original frame-based React/SVG, not copied template code. Official Sera wordmark attribution is preserved in `public/brand/README.md`.

Claude integration follows https://code.claude.com/docs/en/github-actions (`anthropics/claude-code-action@v1`). It requires a separately installed GitHub App and a repository secret. No credential is embedded.
