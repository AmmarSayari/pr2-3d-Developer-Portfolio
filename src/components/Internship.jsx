import React from "react";

import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

import { SectionWrapper } from "../hoc";

import { internPic } from "../assets";

import CoursesCard from "./ui/CoursesCard";
import { internAreas } from "../constants";


const Internship = () => {
    return (
      <>
          <motion.div variants={textVariant()} className="flex flex-col sm:flex-row">
            <div className="flex-col sm:mr-[30px] md:mr-[100px] lg:mr-[200px]">
              <p className={styles.sectionSubText}>
                UCIC (UNITED CEMENT INDUSTRIAL COMPANY) 
              </p>
              <h2 className={styles.sectionHeadText}>
                INTERNSHIP
              </h2>
            </div>
            <div className="max-w-[400px] min-w-[300px]  ">
                <img src={internPic} alt="ucic" className="object-cover justify-center rounded-xl" />
            </div>
  
          </motion.div>
           
          <motion.div
            variants={fadeIn("","", 0.1, 1)}
            className="mt-6 text-secondary text-[17px] max-w-3xl leading-[30px]"
          >
            <h3 className="text-white text-[25px] font-bold mb-3">
              Overview.
            </h3>
            <div>
            Gained hands-on experience in Windows Server administration.
            Developed proficiency in MySQL for effective database management.
            Provided technical support for software and hardware troubleshooting. 
            <br/>
            Contact: info@unitedcement.com.sa
            </div>

            <div>
              <h3 className="text-white text-[25px] font-bold mt-6">
                Focus areas:
              </h3>
              <div className="mt-3 flex flex-wrap gap-2 sm:gap-6 ">
                {internAreas.map((internArea, index) => (
                  <CoursesCard 
                    key={internArea.title}
                    index={index}
                    {...internArea}
                  />
                  ))}
              </div>
            </div>
          </motion.div>
  
      </>
    )
  }
  
  export default SectionWrapper(Internship, "internship")