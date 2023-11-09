import { BrowserRouter } from "react-router-dom";

import { 
  About, 
  Contact, 
  Hero,
  Navbar,
  Works,
  Education,
  StarsCanvas,
  Internship
} from './components';


const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div >
          <Navbar />
          <div className="relative">
            <Hero />    
          </div>
        </div>
        <About />
        <Education />
        <Works />
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
