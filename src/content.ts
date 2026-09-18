export const site = {
  url: "https://mashharuki.github.io/sera-remotion-app/",
  telegram: "https://t.me/seraprotocol",
  telegramLabel: "Open Sera community",
  telegramNote: "Official community. Ask for a team introduction.",
  reviewed: "2026-09-18",
};

export const FPS = 30;
export const scenes = [
  {
    start: 0,
    seconds: 8,
    label: "The opportunity",
    title: "Money moves.\nCurrencies differ.",
    body: "Your customers cross borders.\nTheir payments need to cross currencies.",
    caption: "A global payment needs more than a dollar token.",
  },
  {
    start: 8,
    seconds: 9,
    label: "FX, explained",
    title: "Different currencies.\nOne on-chain exchange.",
    body: "FX means exchanging one currency for another.\nOn-chain FX does it with stablecoins.",
    caption: "Stablecoins are tokens designed to track a currency’s value.",
  },
  {
    start: 17,
    seconds: 10,
    label: "Meet Sera",
    title: "Match off-chain.\nSettle on-chain.",
    body: "Sera matches stablecoin orders off-chain.\nTrades settle through Ethereum smart contracts.",
    caption: "An exchange for stablecoins. A settlement layer to build on.",
  },
  {
    start: 27,
    seconds: 8,
    label: "Why it matters",
    title: "Build around\nbetter money movement.",
    body: "Programmatic access. Verifiable settlement.\nFunds held in smart contracts, not by the matching engine.",
    caption:
      "Availability, liquidity and costs depend on the market and network.",
  },
  {
    start: 35,
    seconds: 8,
    label: "Built for a conversation",
    title: "Your next corridor\ncould start here.",
    body: "Stablecoin issuer? Payment provider? Neobank?\nLet’s explore the currencies your customers need.",
    caption: "Discuss liquidity, FX conversion and settlement integration.",
  },
  {
    start: 43,
    seconds: 9,
    label: "Let’s connect",
    title: "Which currencies\nare you connecting?",
    body: "Meet Sera on Telegram.\nBring your corridor. Start a conversation.",
    caption: "Scan to watch again and open the Sera community.",
  },
] as const;
export const DURATION = 52 * FPS;
export const sources = [
  { title: "Sera overview & architecture", url: "https://docs.sera.cx/" },
  {
    title: "Current deployment & roadmap",
    url: "https://docs.sera.cx/protocol/swap/",
  },
  { title: "Non-custodial design", url: "https://docs.sera.cx/non-custodial/" },
  { title: "Official contact", url: "https://docs.sera.cx/faq/" },
  { title: "Sera brand kit", url: "https://www.sera.cx/brand" },
  {
    title: "BIS: stablecoins in cross-border payments",
    url: "https://www.bis.org/cpmi/publ/d220.pdf",
  },
];
