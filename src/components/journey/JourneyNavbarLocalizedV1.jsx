import JourneyNavbarClassicLocalizedV1 from "./JourneyNavbarClassicLocalizedV1";
import "./PortfolioJourneyDockingNavbarV2.css";

// Reuse the Docking Rail presentation without changing the preserved English navbar.
const JourneyNavbarLocalizedV1 = (props) => (
  <div className="journey-docking-navbar-v2">
    <JourneyNavbarClassicLocalizedV1 {...props} />
  </div>
);

export default JourneyNavbarLocalizedV1;
