import { createRoot } from "react-dom/client";
import { useEffect, useRef, useState } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { SeraFilm } from "./Composition";
import { DURATION, FPS, scenes, site, sources } from "./content";
import "./index.css";

const base = import.meta.env.BASE_URL;
function App() {
  const player = useRef<PlayerRef>(null);
  const [copied, setCopied] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const [booth, setBooth] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const p = player.current;
    if (!p) return;
    const update = ({ detail }: { detail: { frame: number } }) =>
      setChapter(
        Math.max(
          0,
          scenes.findLastIndex((s) => detail.frame >= s.start * FPS),
        ),
      );
    p.addEventListener("frameupdate", update);
    return () => p.removeEventListener("frameupdate", update);
  }, []);
  const play = () => {
    player.current?.play();
    document.getElementById("film")?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.url);
      setCopied(true);
    } catch {
      setMessage(`Copy this link: ${site.url}`);
    }
  };
  return (
    <div className={booth ? "app booth" : "app"}>
      <header className="nav">
        <a href="#" aria-label="Sera home">
          <img src={`${base}brand/sera-wordmark-white.svg`} alt="Sera" />
        </a>
        <nav>
          <a href="#how-it-works">How it works</a>
          <a href="#connect">
            Let’s connect <span>↗</span>
          </a>
        </nav>
      </header>
      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="intro">
              <span /> A new connection for global money
            </div>
            <h1>
              Money moves.
              <br />
              Currencies differ.
            </h1>
            <p>
              Meet Sera. Stablecoin foreign exchange,
              <br className="desktop-break" /> with settlement on-chain.
            </p>
            <div className="hero-actions">
              <button className="primary" onClick={play}>
                <span className="play-symbol">▶</span> Watch the story{" "}
                <small>52 sec</small>
              </button>
              <a className="text-link" href="#connect">
                Build with Sera ↗
              </a>
            </div>
            <div className="audience">
              For stablecoin issuers, payment providers & neobanks
            </div>
          </div>
          <div
            className="hero-art"
            aria-label="Illustration of currencies connected through Sera"
          >
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="art-core">
              sera<span>FX on-chain</span>
            </div>
            <span className="currency usd">
              $ <small>USD</small>
            </span>
            <span className="currency eur">
              € <small>EUR</small>
            </span>
            <span className="currency jpy">
              ¥ <small>JPY</small>
            </span>
            <span className="currency sgd">
              S$ <small>SGD</small>
            </span>
            <div className="art-note">
              <span /> Different currencies. Connected.
            </div>
          </div>
        </section>
        <section className="film-section" id="film">
          <div className="section-heading">
            <div>
              <span className="status-dot" /> The Sera story{" "}
              <small>Sound optional. Everything is on screen.</small>
            </div>
            <button
              className="quiet"
              onClick={() => {
                setBooth(!booth);
                setTimeout(() => player.current?.play(), 0);
              }}
            >
              {booth ? "Exit booth mode" : "Booth mode ↗"}
            </button>
          </div>
          <div className="player-wrap">
            <Player
              ref={player}
              component={SeraFilm}
              inputProps={{ assetBase: base }}
              initialFrame={30}
              durationInFrames={DURATION}
              compositionWidth={1920}
              compositionHeight={1080}
              fps={FPS}
              controls
              loop={booth}
              style={{ width: "100%" }}
              acknowledgeRemotionLicense
            />
          </div>
          <div className="chapters">
            {scenes.map((s, i) => (
              <button
                key={s.start}
                className={chapter === i ? "selected" : ""}
                onClick={() => {
                  setChapter(i);
                  player.current?.seekTo(s.start * FPS);
                  player.current?.play();
                }}
              >
                <small>00:{String(s.start).padStart(2, "0")}</small>
                {s.label}
              </button>
            ))}
          </div>
          <div className="film-links">
            <a href={`${base}sera-overview.mp4`} download>
              Download film ↙
            </a>
            <a href={`${base}sera-overview.vtt`} download>
              English captions ↙
            </a>
            <button onClick={() => dialog.current?.showModal()}>
              Share this story ↗
            </button>
          </div>
        </section>
        <section className="explanation" id="how-it-works">
          <div>
            <span className="section-kicker">The idea is simple.</span>
            <h2>
              A currency exchange.
              <br />
              Built for stablecoins.
            </h2>
            <p>
              A stablecoin is a token designed to track a currency’s value. FX
              exchanges one currency for another. Sera brings the two together.
            </p>
            <a
              className="text-link"
              href="https://docs.sera.cx/"
              target="_blank"
              rel="noreferrer"
            >
              Explore the protocol ↗
            </a>
          </div>
          <ol className="steps">
            <li>
              <span>01</span>
              <div>
                <h3>Get a quote</h3>
                <p>Find a route between supported stablecoins.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Authorize the exchange</h3>
                <p>Sign the trade. Sera matches orders off-chain.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Settle on Ethereum</h3>
                <p>Smart contracts execute the exchange on-chain.</p>
              </div>
            </li>
          </ol>
        </section>
        <section className="use-cases">
          <div className="section-heading">
            <h2>Where does your money go next?</h2>
            <span>Let’s find your corridor.</span>
          </div>
          <div className="use-case-grid">
            {[
              [
                "Stablecoin issuers",
                "Connect your currency.",
                "Explore liquidity and exchange routes for your stablecoin.",
              ],
              [
                "Payment providers",
                "Make conversion part of the flow.",
                "Discuss FX conversion within cross-border payment experiences.",
              ],
              [
                "Neobanks & fintechs",
                "Think in more than one currency.",
                "Explore stablecoin treasury and multi-currency integrations.",
              ],
            ].map(([tag, title, body]) => (
              <article key={tag}>
                <span>{tag}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="connect" id="connect">
          <div>
            <div className="section-kicker">
              A short conversation can go a long way.
            </div>
            <h2>
              Your corridor.
              <br />
              Our next conversation.
            </h2>
            <p>
              Tell us what you’re building, where money needs to go,
              <br className="desktop-break" /> and which currencies matter.
            </p>
            <a
              className="primary"
              href={site.telegram}
              target="_blank"
              rel="noreferrer"
            >
              {site.telegramLabel} <span>↗</span>
            </a>
            <small>{site.telegramNote}</small>
          </div>
          <div className="qr-panel">
            <img
              src={`${base}share-qr.svg`}
              alt="QR code to this Sera introduction page"
            />
            <strong>Take the conversation with you.</strong>
            <span>Scan to watch & connect</span>
            <button onClick={copy}>
              {copied ? "Link copied ✓" : "Copy page link"}
            </button>
            <a href={`${base}share-qr.svg`} download="sera-qr.svg">
              Download QR
            </a>
          </div>
        </section>
        <details className="notes">
          <summary>Sources & product notes</summary>
          <p>
            This community-made introduction uses Sera’s official documentation,
            reviewed {site.reviewed}. Current scope: off-chain order matching
            and Ethereum settlement. Examples are illustrative, not live quotes
            or guaranteed market coverage. Liquidity, fees, eligibility and
            availability vary. Stablecoins and smart contracts carry risks. Bank
            payouts, lending and derivatives are not represented here as live
            Sera features.
          </p>
          <ul>
            {sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.title} ↗
                </a>
              </li>
            ))}
          </ul>
        </details>
      </main>
      <footer className="footer">
        <img src={`${base}brand/sera-wordmark-white.svg`} alt="Sera" />
        <span>A community-made introduction to Sera Protocol.</span>
        <a href="https://www.sera.cx/" target="_blank" rel="noreferrer">
          sera.cx ↗
        </a>
      </footer>
      <dialog
        ref={dialog}
        className="share-modal"
        aria-label="Share Sera"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <button
          autoFocus
          className="modal-close"
          onClick={() => dialog.current?.close()}
        >
          Close ×
        </button>
        <h2>One scan. A new connection.</h2>
        <img
          src={`${base}share-qr.svg`}
          alt="Scan to open the Sera introduction"
        />
        <p>{site.url}</p>
        <button className="primary" onClick={copy}>
          {copied ? "Copied ✓" : "Copy link"}
        </button>
      </dialog>
      <span className={message ? "copy-message" : "sr-only"} role="status">
        {copied ? "Page link copied" : message}
      </span>
    </div>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
