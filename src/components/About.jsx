import React from "react";

import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import  {Tilt}  from "react-tilt";
import { SectionWrapper } from "../hoc";



const ServiceCard = (
  { index, title, icon}
) => {
  return (
    <Tilt className="xs:w-[250px] w-full" >
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450
          }}
          className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px]
            flex justify-evenly items-center flex-col
          "
        >
          <img 
            src={icon}
            alt={title}
            className="w-16 h-16 object-contain"
          />
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  )
}

const About = () => {
  return (
    <>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>
            introduction
          </p>
          <h2 className={styles.sectionHeadText}>
            Overview.
          </h2>

        </motion.div>

        <motion.p
          variants={fadeIn("","", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          I'm skilled software developer, holding a Bachelor's 
          degree in Information Technology from King 
          Abdulaziz University. My experience includes
          creating engaging web solutions using a
          comprehensive stack, including JavaScript, 
          React, Redux, Node.js, ShadcnUI, PrismaDB, 
          and MySQL, alongside the development of Java 
          and PHP applications. Let's collaborate and 
          bring your ideas to life!
        </motion.p>

        <div className="mt-20 flex flex-wrap gap-10">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title}
              index={index}
              {...service}
            />
          ))}

        </div>
    </>
  )
}

export default SectionWrapper(About, "about")