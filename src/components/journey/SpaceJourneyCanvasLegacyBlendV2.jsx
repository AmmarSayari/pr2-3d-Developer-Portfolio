/* eslint-disable react/prop-types */
import SpaceJourneyCanvasBalancedV2 from "./SpaceJourneyCanvasBalancedV2";
import SpaceJourneyCanvasPolarPrismV2 from "./SpaceJourneyCanvasPolarPrismV2";

const SpaceJourneyCanvasLegacyBlendV2 = ({
  direction,
  isTraveling,
  reducedMotion,
}) => (
  <>
    <SpaceJourneyCanvasBalancedV2
      direction={direction}
      isTraveling={isTraveling}
      reducedMotion={reducedMotion}
    />

    {isTraveling && !reducedMotion && (
      <SpaceJourneyCanvasPolarPrismV2
        direction={direction}
        isTraveling={isTraveling}
        reducedMotion={reducedMotion}
      />
    )}
  </>
);

export default SpaceJourneyCanvasLegacyBlendV2;
