import React from "react";

import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

import { SectionWrapper } from "../hoc";

import  ServiceCard  from "../components/ui/ServiceCard";

const Internship = () => {
  return (
    <>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>
            UCIC (UNITED CEMENT INDUSTRIAL COMPANY) 
          </p>
          <h2 className={styles.sectionHeadText}>
            INTERNSHIP
          </h2>

        </motion.div>

        <motion.p
          variants={fadeIn("","", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          FOCUS AREAS: Networking, Database Management, Technical Support
          Configured and managed network devices, resolving connectivity issues.
          Gained hands-on experience in Windows Server administration.
          Developed proficiency in MySQL for effective database management.
          Provided technical support for software and hardware troubleshooting.
          Contact: Email: info@unitedcement.com.sa

        </motion.p>
    </>
  )
}

export default SectionWrapper(Internship, "")