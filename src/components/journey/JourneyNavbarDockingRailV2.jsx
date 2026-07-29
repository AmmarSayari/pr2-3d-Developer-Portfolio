import JourneyNavbarClassicV2 from "./JourneyNavbarClassicV2";
import "./PortfolioJourneyDockingNavbarV2.css";

/**
 * Portfolio 26-8 Docking Rail.
 *
 * The legacy/classic journey navbar stays untouched. This component gives that
 * same content and behavior a floating glass rail presentation, while keeping
 * the Travel Station owned by the classic component exactly as it is.
 */
const JourneyNavbarDockingRailV2 = (props) => (
  <div className="journey-docking-navbar-v2">
    <JourneyNavbarClassicV2 {...props} />
  </div>
);

export default JourneyNavbarDockingRailV2;
