import React from "react";

import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

import { SectionWrapper } from "../hoc";

import { kaubul } from "../assets";

import CoursesCard from "./ui/CoursesCard";
import  SmallCard  from "../components/ui/SmallCard";
import { relaventCourses } from "../constants";


const Education = () => {
    return (
      <>
          <motion.div variants={textVariant()} className="flex flex-col sm:flex-row">
            <div className="flex-col sm:mr-[30px] md:mr-[100px] lg:mr-[200px]">
              <p className={styles.sectionSubText}>
                King Abdulaziz University, 2023
              </p>
              <h2 className={styles.sectionHeadText}>
                Education.
              </h2>
              <SmallCard />
            </div>
            <div className="max-w-[400px] min-w-[300px]  ">
                <img src={kaubul} alt="Kau" className="object-cover justify-center rounded-xl" />
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
                As part of the Information Technology program at King 
                Abdulaziz University, I gained a comprehensive 
                understanding of various aspects within the field of IT, 
                focusing on three core categories: networking, database 
                management, and software engineering. 
            </div>

            <div>
              <h3 className="text-white text-[25px] font-bold mt-6">
                Relavent Courses:
              </h3>
              <div className="mt-3 flex flex-wrap gap-2 sm:gap-6 ">
                {relaventCourses.map((relaventCourse, index) => (
                  <CoursesCard 
                    key={relaventCourse.title}
                    index={index}
                    {...relaventCourse}
                  />
                  ))}
              </div>
            </div>
          </motion.div>
  
      </>
    )
  }
  
  export default SectionWrapper(Education, "")