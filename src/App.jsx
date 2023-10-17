import { BrowserRouter } from "react-router-dom";

import { 
  About, 
  Contact, 
  Feedbacks,
  Hero,
  Navbar,
  Works,
  Education,
  StarsCanvas,
  Tech,
  Internship
} from './components';


const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Education />
        {/* <Tech /> */}
        <Works />
        {/*<Feedbacks /> */}
        <Internship />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App
