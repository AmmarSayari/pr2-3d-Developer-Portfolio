import React from "react";

import { technologies } from "../constants";


const Tech = () => {
  return (
    
     <div className='flex flex-row flex-wrap justify-center gap-5'>
      {technologies.map((technology) => (
        <div className='
        w-10 h-10 
        bg-white bg-opacity-30 
        backdrop-blur-10
        rounded-full
        ' 
        key={technology.name}>
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
            }}
          >
              <img src={technology.icon} alt={technology.name} style={{ width: '90%', height: '90%' }} />
          </div>
        </div>
      ))}
   </div>
  );
}

export default Tech