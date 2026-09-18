import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { DURATION, FPS, scenes } from "./content";
import "./video.css";

export const Corridor = ({ step = 0 }: { step?: number }) => {
  const frame = useCurrentFrame();
  return (
    <div className="corridor">
      <svg viewBox="0 0 540 500" aria-hidden="true">
        <defs>
          <radialGradient id="field">
            <stop stopColor="#1b7a3f" stopOpacity=".7" />
            <stop offset="1" stopColor="#082e24" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="270" cy="250" r="246" fill="url(#field)" />
        {[110, 175, 235].map((r) => (
          <circle
            key={r}
            cx="270"
            cy="250"
            r={r}
            fill="none"
            stroke="#59e39a"
            strokeOpacity=".17"
          />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = (i * Math.PI) / 3;
          const x = 270 + 210 * Math.cos(a);
          const y = 250 + 210 * Math.sin(a);
          const p = (frame / 100 + i / 6) % 1;
          return (
            <g key={i}>
              <path
                d={`M270 250 L${x} ${y}`}
                stroke="#59e39a"
                strokeOpacity=".4"
                strokeDasharray="3 7"
              />
              <circle
                cx={270 + (x - 270) * p}
                cy={250 + (y - 250) * p}
                r="4"
                fill="#59e39a"
              />
              <circle cx={x} cy={y} r="34" fill="#0b3d2d" stroke="#3d8064" />
              <text
                x={x}
                y={y + 6}
                textAnchor="middle"
                fill="#d9f7e6"
                fontSize="18"
                fontFamily="IBM Plex Sans"
              >
                {["USD", "EUR", "SGD", "JPY", "GBP", "BRL"][i]}
              </text>
            </g>
          );
        })}
        <circle cx="270" cy="250" r="72" fill="#00d26a" />
        <text
          x="270"
          y="262"
          textAnchor="middle"
          fill="#06271c"
          fontSize="42"
          fontWeight="600"
          fontFamily="IBM Plex Sans"
        >
          sera
        </text>
      </svg>
      <div className="diagram-tag">
        {step === 0
          ? "A world of currencies"
          : "Stablecoin FX · Illustrative corridors"}
      </div>
    </div>
  );
};

const SceneVisual = ({ index }: { index: number }) => {
  const frame = useCurrentFrame();
  const reveal = (delay: number) =>
    interpolate(frame, [delay, delay + 24], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  if (index === 1)
    return (
      <div className="visual-stack swap-visual">
        <div className="token-panel" style={{ opacity: reveal(10) }}>
          <span>Dollar stablecoin</span>
          <strong>USD</strong>
          <small>Currency A</small>
        </div>
        <div className="exchange-arrow" style={{ opacity: reveal(35) }}>
          ⇅ <span>FX exchange</span>
        </div>
        <div className="token-panel" style={{ opacity: reveal(65) }}>
          <span>Euro stablecoin</span>
          <strong>EUR</strong>
          <small>Currency B</small>
        </div>
        <p>Illustrative currency exchange</p>
      </div>
    );
  if (index === 2)
    return (
      <div className="visual-stack architecture">
        <div style={{ opacity: reveal(10) }}>
          <span>Off-chain</span>
          <strong>Order matching</strong>
          <small>Buy orders ⇄ Sell orders</small>
        </div>
        <div className="architecture-link" style={{ opacity: reveal(60) }}>
          ↓ <span>Signed instructions</span>
        </div>
        <div className="settlement-panel" style={{ opacity: reveal(100) }}>
          <span>Ethereum</span>
          <strong>Smart contracts</strong>
          <small>Vault balances · Trade settlement</small>
        </div>
      </div>
    );
  if (index === 3)
    return (
      <div className="visual-stack benefits">
        {[
          ["{ }", "Programmatic access", "Connect your application"],
          ["↗", "Verifiable settlement", "Follow the on-chain record"],
          ["◇", "Smart-contract custody", "Separate from order matching"],
        ].map(([icon, title, body], i) => (
          <div
            key={title}
            style={{
              opacity: reveal(i * 28),
              transform: `translateX(${(1 - reveal(i * 28)) * 25}px)`,
            }}
          >
            <b>{icon}</b>
            <section>
              <strong>{title}</strong>
              <span>{body}</span>
            </section>
          </div>
        ))}
      </div>
    );
  return <Corridor step={index} />;
};

const Scene = ({ index, assetBase }: { index: number; assetBase?: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = scenes[index];
  const enter = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 28,
  });
  const opacity = interpolate(
    frame,
    [0, 12, s.seconds * fps - 10, s.seconds * fps],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <AbsoluteFill className="scene" style={{ opacity }}>
      <div
        className="scene-copy"
        style={{ transform: `translateY(${(1 - enter) * 22}px)` }}
      >
        <div className="scene-label">{s.label}</div>
        <h1>{s.title}</h1>
        <p>{s.body}</p>
        {index === 2 && (
          <div className="flow">
            <span>Quote</span>
            <b>→</b>
            <span>Sign</span>
            <b>→</b>
            <span>Settle</span>
          </div>
        )}
        {index === 4 && (
          <div className="flow">
            <span>Issuers</span>
            <span>PSPs</span>
            <span>Neobanks</span>
          </div>
        )}
      </div>
      {index === 5 ? (
        <div className="video-qr">
          <Img
            src={
              assetBase
                ? `${assetBase}share-qr.svg`
                : staticFile("share-qr.svg")
            }
          />
          <strong>Watch. Share. Connect.</strong>
          <span>mashharuki.github.io/sera-remotion-app</span>
        </div>
      ) : (
        <SceneVisual index={index} />
      )}
      <div className="caption">{s.caption}</div>
    </AbsoluteFill>
  );
};

export const SeraFilm = ({ assetBase }: { assetBase?: string }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill className="film">
      <div className="film-grid" />
      <header className="film-header">
        <Img
          src={
            assetBase
              ? `${assetBase}brand/sera-wordmark-white.svg`
              : staticFile("brand/sera-wordmark-white.svg")
          }
        />
        <span>Bringing FX on-chain</span>
      </header>
      {scenes.map((s, i) => (
        <Sequence
          key={s.start}
          from={s.start * FPS}
          durationInFrames={s.seconds * FPS}
        >
          <Scene index={i} assetBase={assetBase} />
        </Sequence>
      ))}
      <footer className="film-footer">
        <span>Stablecoin FX. Real-world conversations.</span>
        <span>
          {String(Math.min(52, Math.floor(frame / FPS))).padStart(2, "0")} / 52s
        </span>
      </footer>
      <div
        className="film-progress"
        style={{ width: `${(100 * frame) / (DURATION - 1)}%` }}
      />
    </AbsoluteFill>
  );
};
