import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { DURATION, DURATION_SECONDS, FPS, scenes, site } from "./content";
import "./video.css";

const asset = (path: string, base?: string) =>
  base ? `${base}${path}` : staticFile(path);

const Scene = ({ index, assetBase }: { index: number; assetBase?: string }) => {
  const frame = useCurrentFrame();
  const s = scenes[index];
  const isClosing = s.screenshot === null;
  const enter = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const drift = interpolate(frame, [0, s.seconds * FPS - 1], [1.035, 1], {
    extrapolateRight: "clamp",
  });
  const calloutEnter = interpolate(frame, [10, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Keep the CTA and QR steady for the entire final scene.
  const motion = isClosing ? 1 : enter;
  return (
    <AbsoluteFill
      className={`scene ${isClosing ? "closing" : "product-scene"}`}
    >
      <div
        className="scene-copy"
        style={{
          opacity: motion,
          transform: `translateY(${(1 - motion) * 16}px)`,
        }}
      >
        <div className="scene-label">{s.label}</div>
        <h1>{s.title}</h1>
        <p>{s.body}</p>
        {s.flowStep !== null && (
          <div className="journey-steps" aria-label="Product walkthrough">
            {["Deposit", "Position", "Cashback"].map((step, stepIndex) => (
              <div
                className={s.flowStep === stepIndex + 1 ? "active" : ""}
                key={step}
              >
                <b>0{stepIndex + 1}</b>
                <span>{step}</span>
              </div>
            ))}
          </div>
        )}
        {s.screenshot === 2 && (
          <div className="architecture-label">
            <span>Off-chain matching</span>
            <b>↓</b>
            <span>Ethereum settlement</span>
          </div>
        )}
        {isClosing && (
          <div className="audience-label">
            Issuers · Payment providers · Neobanks
          </div>
        )}
      </div>
      {isClosing ? (
        <div className="video-qr">
          <Img
            src={asset("share-qr.svg", assetBase)}
            alt="QR to the Sera introduction page"
          />
          <strong>Watch. Share. Connect.</strong>
          <span>{site.url.replace("https://", "").replace(/\/$/, "")}</span>
        </div>
      ) : (
        <div className="product-visual" style={{ opacity: enter }}>
          <div className="screen-heading">
            <span className="screen-dot" />
            {s.screenLabel}
            <small>Sera app</small>
          </div>
          <div className="screen-frame">
            <Img
              src={asset(`screen_shot/${s.screenshot}.jpg`, assetBase)}
              alt={s.screenLabel}
              style={{ transform: `scale(${drift})` }}
            />
            {s.callout && (
              <div
                className="screen-callout"
                style={{
                  opacity: calloutEnter,
                  transform: `translateY(${(1 - calloutEnter) * 12}px)`,
                }}
              >
                <span>IN THIS STEP</span>
                <strong>{s.callout}</strong>
              </div>
            )}
          </div>
          <div className="screen-note">
            Recorded app screen · {s.language} interface
          </div>
        </div>
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
          src={asset("brand/sera-wordmark-white.svg", assetBase)}
          alt="Sera"
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
        <span>Token2049 · Start a conversation with Sera</span>
        <span>
          {String(Math.floor(frame / FPS)).padStart(2, "0")} /{" "}
          {DURATION_SECONDS}s
        </span>
      </footer>
      <div
        className="film-progress"
        style={{ width: `${(100 * frame) / (DURATION - 1)}%` }}
      />
    </AbsoluteFill>
  );
};
