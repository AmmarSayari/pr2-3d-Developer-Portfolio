import React from "react";

import { motion } from "framer-motion";
import { styles } from "../styles";
import { relaventCourses } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

import { SectionWrapper } from "../hoc";
import  ServiceCard  from "../components/ui/ServiceCard";

import kau from "../assets/kau.png";

const Education = () => {
    return (
      <>
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>
              King Abdulaziz University, 2023
            </p>
            <h2 className={styles.sectionHeadText}>
              Education.
            </h2>
  
          </motion.div>
  
          <motion.div
            variants={fadeIn("","", 0.1, 1)}
            className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
          >
            BACHELOR OF SCIENCE FROM THE FACULTY OF COMPUTING
            AND INFORMATION TECH IN INFORMATION TECHNOLOGY
            <div>
                GPA 4.04
            </div>
            <div className="w-[290px] rounded-full overflow-hidden">
                <img src={kau} alt="Ammar's Picture" className="w-full h-full" />
            </div>
          </motion.div>
          {/*
          <div className="mt-20 flex flex-wrap gap-10">
            {relaventCourses.map((relaventCourse, index) => (
              <ServiceCard 
                key={relaventCourse.title}
                index={index}
                {...relaventCourse}
              />
            ))}
  
          </div>
           */}
          <motion.div
            variants={fadeIn("","", 0.1, 1)}
            className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
          >
            <div>
                As part of the Information Technology program at King 
                Abdulaziz University, I gained a comprehensive 
                understanding of various aspects within the field of IT, 
                focusing on three core categories: networking, database 
                management, and software engineering. Throughout the 
                program, I delved into a diverse range of subjects that 
                have equipped me with a strong foundation in these areas.
            </div>
            <div>
                Java: The main language of instruction, I honed my 
                programming skills using Java. Through Java, I 
                comprehensively learned about data structures, algorithms, 
                and object-oriented principles.
            </div>
          </motion.div>
  
      </>
    )
  }
  
  export default SectionWrapper(Education, "")