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
    seconds: 4,
    label: "Meet Sera",
    title: "Different currencies.\nOne Sera.",
    body: "Stablecoin FX, with settlement on-chain.",
    caption: "For issuers, payment providers and neobanks.",
    screenshot: 3,
    screenLabel: "Your multi-currency wallet",
  },
  {
    start: 4,
    seconds: 6,
    label: "Swap",
    title: "Swap across\ncurrencies.",
    body: "Exchange one currency’s stablecoin for another.",
    caption: "Choose the tokens you want to exchange.",
    screenshot: 0,
    screenLabel: "Choose a pair · USDT → JPYC",
  },
  {
    start: 10,
    seconds: 7,
    label: "Confirm",
    title: "See your\nswap complete.",
    body: "A clear result, with a transaction link.",
    caption:
      "Recorded app example · Displayed amounts are not a current quote.",
    screenshot: 1,
    screenLabel: "Swap confirmation",
  },
  {
    start: 17,
    seconds: 6,
    label: "Verify",
    title: "Match off-chain.\nSettle on-chain.",
    body: "Sera matches orders. Ethereum settles trades.",
    caption: "Review transaction status and follow the on-chain record.",
    screenshot: 2,
    screenLabel: "Transaction history",
  },
  {
    start: 23,
    seconds: 7,
    label: "Let’s connect",
    title: "Your currencies.\nLet’s connect.",
    body: "Meet Sera on Telegram.",
    caption: "Scan to watch again and start a conversation.",
    screenshot: null,
    screenLabel: "",
  },
] as const;
export const DURATION_SECONDS = scenes.reduce(
  (total, scene) => total + scene.seconds,
  0,
);
export const DURATION = DURATION_SECONDS * FPS;
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
