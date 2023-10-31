import React from "react";
import {Tilt} from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects, projects2 } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import ProjectCard2 from "./ui/ProjectCard2";


const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>
          My Projects
        </p>
        <h2 className={styles.sectionHeadText}>
          Projects.
        </h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn( "", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px]
           max-w-3xl leading-[30px]"
        >
          I have worked on a variety of projects, 
          ranging from Web Development, App Development, to back-end development. 
          i use React, Node, Nextjs, TypeScript, Java, MySql, Strip, etc.
          It reflects my
          ability to solve complex problems, work with different technologies, 
          frameworks, libraries
          , and manage projects effectively.

          Below are a few of my projects.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects2.map((project2, index) => (
          <ProjectCard2 
            key={`project-${index}`}
            index={index}
            {...project2}
          />
        ))}        

      </div>

    </>
  )
}

export default SectionWrapper(Works, "Projects");