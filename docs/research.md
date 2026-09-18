# Sera / on-chain FX research and editorial decisions

Reviewed 2026-09-18. Official documentation is the primary source for product claims, not an independent verification of production behavior. Recheck before each event. This is a community-made introduction, not an official product announcement.

## What the film explains

FX is exchanging currencies. Stablecoins are tokens designed to track an underlying currency; they are not identical to bank deposits and the peg is not guaranteed. On-chain finance uses smart contracts for financial operations and verifiable records. It does not mean every system component runs on a blockchain.

Sera is a stablecoin FX exchange. Its central limit order book matches orders off-chain, with smart contracts holding vault balances and settling matched trades on Ethereum. That is the core distinction the film illustrates. API access supports integration discussions. A currency corridor is the pair of currencies a business needs to exchange.

## Evidence / wording map

| Topic                     | Primary evidence                                                                                      | Editorial decision                                                                                                                                                                 |
| ------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Product and architecture  | https://docs.sera.cx/                                                                                 | “Stablecoin FX”, off-chain matching, on-chain settlement. Do not turn sub-second matching into a settlement guarantee.                                                             |
| Current versus planned    | https://docs.sera.cx/protocol/swap/ and https://docs.sera.cx/protocol/roadmap/                        | Current CLOB + settlement. FCICAMM, ERC-1155 positions and later lending/derivatives are roadmap. Omit from short film.                                                            |
| Custody                   | https://docs.sera.cx/non-custodial/                                                                   | Funds are in smart contracts rather than the matching engine. Do not imply absence of contract, issuer or operational risk. Emergency withdrawals have protocol conditions/delays. |
| Fees and network          | https://docs.sera.cx/fees/                                                                            | No “free”, “zero fee”, fixed spread or fixed settlement time claims. Network and market conditions matter.                                                                         |
| Market availability       | https://docs.sera.cx/currency-pairs/                                                                  | The current mainnet page lists verified mainnet tokens; separate testnet pages list test tokens. Live deployment token/market APIs are authoritative. Diagram currencies are illustrative, not confirmed production corridors.          |
| Contact                   | https://docs.sera.cx/faq/                                                                             | Official community: https://t.me/seraprotocol. Temporary general contact, not a named sales representative.                                                                        |
| Brand                     | https://www.sera.cx/brand                                                                             | Official white wordmark; IBM Plex Sans. Official green #00D26A and mint #59E39A. Custom dark background #062C21 follows the user's brief.                                          |
| Broader payment context   | https://www.bis.org/cpmi/publ/d220.pdf                                                                | Stablecoin arrangements may address some frictions but introduce risks and do not automatically improve cross-border payments. Conversion and cash-out remain separate.            |
| Atomic settlement context | https://www.bis.org/publications/aer-2023/blueprint-future-monetary-system-improving-old-enabling-new | Programmability can coordinate exchange legs. Do not equate atomic execution with risk-free money or universal legal finality.                                                     |

## Claims intentionally excluded

No unverified 120+ production currency claim, APY, volume, “best rate”, “no risk”, regulatory approval, universal access, guaranteed bank payout, fee saving percentage or bank-account opening claim. Do not conflate the consumer `sera.money` product, agent tooling and the core protocol. Marketing pages and technical docs have different levels of specificity; the current-deployment section wins for architecture.

## Storyboard (52 seconds, 1920×1080, 30 fps)

| Time  | Message                                       | Visual / conversion goal                                                 |
| ----- | --------------------------------------------- | ------------------------------------------------------------------------ |
| 00–08 | Money crosses borders and currencies          | Currency orbit introduces the problem without statistics                 |
| 08–17 | FX with stablecoins                           | Plain-language definition, silent-readable text                          |
| 17–27 | Match off-chain; settle on-chain              | Quote → sign → settle                                                    |
| 27–35 | Programmatic access and verifiable settlement | Concrete integration value; qualification on market/network availability |
| 35–43 | Issuers, PSPs and neobanks                    | Recognize the relevant audience; ask about their corridor                |
| 43–52 | Start a conversation                          | QR to canonical landing page, then Telegram                              |

The video intentionally has no voiceover or music: noisy event halls, immediate playback, no language/audio dependency. All story text is on screen; downloadable WebVTT and HTML explanation provide alternatives. The QR points to the page, not Telegram, so a later contact change does not invalidate printed materials.

## Reference implementations and tooling

Reviewed https://www.remotion.dev/, https://www.remotion.dev/docs/player, https://www.reactvideoeditor.com/remotion-templates and https://github.com/reactvideoeditor/remotion-templates. Animation is original frame-based React/SVG, not copied template code. Official Sera wordmark attribution is preserved in `public/brand/README.md`.

Claude integration follows https://code.claude.com/docs/en/github-actions (`anthropics/claude-code-action@v1`). It requires a separately installed GitHub App and a repository secret. No credential is embedded.
