/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import StarsCanvasLegacyCopyV2 from "./StarsCanvasLegacyCopyV2";
import SpaceJourneyCanvasWhiteWarpV2 from "./SpaceJourneyCanvasWhiteWarpV2";

const useCompactCanvas = () => {
  const [isCompact, setIsCompact] = useState(() =>
    window.matchMedia("(max-width: 639px)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const handleChange = (event) => setIsCompact(event.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isCompact;
};

const SpaceJourneyCanvasCopiedWarpV2 = ({
  direction,
  isTraveling,
  reducedMotion,
}) => {
  const isCompact = useCompactCanvas();

  return (
    <>
      {!isTraveling && (
        <div className="journey-original-stars-v2" aria-hidden="true">
          <StarsCanvasLegacyCopyV2 />
        </div>
      )}

      {isTraveling && !reducedMotion && (
        <SpaceJourneyCanvasWhiteWarpV2
          direction={direction}
          isCompact={isCompact}
        />
      )}
    </>
  );
};

export default SpaceJourneyCanvasCopiedWarpV2;
