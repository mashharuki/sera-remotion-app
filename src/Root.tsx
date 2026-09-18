import { Composition } from "remotion";
import { SeraFilm } from "./Composition";
import { DURATION, FPS } from "./content";
export const RemotionRoot = () => (
  <Composition
    id="SeraOverview"
    component={SeraFilm}
    durationInFrames={DURATION}
    fps={FPS}
    width={1920}
    height={1080}
  />
);
