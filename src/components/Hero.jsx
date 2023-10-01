import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto `}>
        <div className={`${styles.paddingX} 
          absolute inset-0 top-[120px] max-w-7xl mx-auto
          flex flex-row items-start gap-5
        `}>
          <div className="flex flex-col justify-center items-center mt-5">
              <div
                className="w-1 sm:h-80 h-40 rounded"
                style={{
                  background: 'linear-gradient(to bottom, #1EBBD7, transparent)',
                }}
              />
          </div>
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
              I develop web applications 
              <br className="sm:block hidden"/> 
              and websites
            </p>
          </div>
        </div>
      
      <ComputersCanvas />
      
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