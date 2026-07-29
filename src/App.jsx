import { BrowserRouter } from "react-router-dom";

/*
Legacy Portfolio 26-8 section imports preserved for rollback:
import {
  About,
  Contact,
  Hero,
  Navbar,
  Works,
  StarsCanvas,
} from "./components";
import EducationV2 from "./components/EducationV2";
*/

import PortfolioJourneyV2 from "./components/journey/PortfolioJourneyV2";

const App = () => {
  return (
    <BrowserRouter>
      <PortfolioJourneyV2 />

      {/*
      Legacy Portfolio 26-8 layout preserved for rollback:
      <div className="relative z-0 bg-primary">
        <div >
          <Navbar />
          <div className="relative">
            <Hero />
          </div>
        </div>
        <About />
        Legacy education section:
        <Education />
        <EducationV2 />
        <Works />
        Legacy internship section:
        <Internship />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
      */}
    </BrowserRouter>
  );
};

export default App;
