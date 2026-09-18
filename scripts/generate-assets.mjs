import QRCode from "qrcode";
import { writeFile } from "node:fs/promises";
import { scenes, site } from "../src/content.ts";
const url = site.url;
await writeFile(
  new URL("../public/share-qr.svg", import.meta.url),
  await QRCode.toString(url, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 4,
    width: 640,
    color: { dark: "#062c21", light: "#ffffff" },
  }),
);
const stamp = (s) =>
  `00:${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}.000`;
await writeFile(
  new URL("../public/sera-overview.vtt", import.meta.url),
  "WEBVTT\n\n" +
    scenes
      .map(
        (s) =>
          `${stamp(s.start)} --> ${stamp(s.start + s.seconds)}\n${s.title.replaceAll("\n", " ")}\n${s.body.replaceAll("\n", " ")}\n${s.caption}\n`,
      )
      .join("\n"),
);

await QRCode.toFile(
  new URL("../public/share-qr.png", import.meta.url).pathname,
  site.url,
  {
    width: 800,
    margin: 4,
    errorCorrectionLevel: "M",
    color: { dark: "#062c21", light: "#ffffff" },
  },
);
