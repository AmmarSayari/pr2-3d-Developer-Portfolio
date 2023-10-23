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
        <div >
          <Navbar />
          <div className="relative z-0">
            <Hero />
            <StarsCanvas />
            
          </div>
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
