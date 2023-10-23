import { motion } from "framer-motion";

import { styles } from "../styles";

import ProfileImage from "./ui/ProfileImage";
import Tech from "./Tech";

import React, { useState, useEffect } from 'react';

const Hero = () => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className={`relative w-full h-screen mx-auto `}>
        <div className={`${styles.paddingX} 
          absolute inset-0 top-[120px] max-w-7xl mx-auto
          flex flex-col sm:flex-row items-start gap-5
        `}>
          

            <div className="justify-center items-center mt-5 hidden sm:flex">              
              <div
                  className="w-2 sm:h-80 h-40 rounded "
                  style={{
                    background: 'linear-gradient(to bottom, #1EBBD7, transparent)',
                  }}
                />
            </div>
            <div className="flex flex-col">
              <div>
                <h1 className={`${styles.heroHeadText} text-white`}>
                  Hi, I'm &nbsp;
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#1EBBD7] to-[#0077B6]">
                    Ammar
                  </span>
                </h1>
                <p className={`${styles.heroSubText}
                  mt-2 text-white-100
                `}>
                  Full-stack developer with expertise in devoloping 
                  <br className="sm:block hidden"/> 
                  web applications and back-end systems.  
                </p>
              </div>

              <div className="flex flex-row h-[160px] max-w-[600px]  justify-center items-center mt-5">
                <h1 className={`${styles.heroSubText} text-white ml-6 hidden sm:block`}>
                  Tech
                </h1>
                <div
                  className="hidden sm:block w-2 sm:h-40 h-20 rounded mt-10 ml-3 "
                  style={{
                    background: 'linear-gradient(to bottom, #1EBBD7, transparent)',
                  }}
                />
                <Tech  />
              </div>

            </div>

            <ProfileImage />
          
        </div>
      
          
      <div className="absolute xs:bottom-10 bottom-32
          w-full flex justify-center items-center"
      >
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl 
              border-4 border-secondary flex justify-center items-start p-2 "
          >
            <motion.div 
              animate={{
                y: [0, 24, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop'
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero