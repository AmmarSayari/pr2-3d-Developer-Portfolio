/* eslint-disable react/prop-types */
import StarsCanvas from "../canvas/Stars";
import SpaceJourneyCanvasPolarPrismV2 from "./SpaceJourneyCanvasPolarPrismV2";

const SpaceJourneyCanvasOriginalV2 = ({
  direction,
  isTraveling,
  reducedMotion,
}) => (
  <>
    <div className="journey-original-stars-v2" aria-hidden="true">
      <StarsCanvas />
    </div>

    {isTraveling && !reducedMotion && (
      <SpaceJourneyCanvasPolarPrismV2
        direction={direction}
        isTraveling={isTraveling}
        reducedMotion={reducedMotion}
      />
    )}
  </>
);

export default SpaceJourneyCanvasOriginalV2;
