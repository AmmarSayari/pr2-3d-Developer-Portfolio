import { motion } from "framer-motion";

import { kaubul } from "../assets";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

import "./EducationV2.css";

const EducationV2 = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Education.</h2>
      </motion.div>

      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="education-v2"
      >
        <article className="education-v2__strip">
          <div className="education-v2__copy">
            <h3 className="education-v2__degree">
              B.Sc. Information Technology
            </h3>
            <p className="education-v2__meta">
              King Abdulaziz University · 2024 · GPA 4.04 / 5
            </p>
            <p className="education-v2__overview">
              Built a strong foundation in software engineering, database
              management, and network administration—connecting application
              development with the data and infrastructure that support it.
            </p>

            <div className="education-v2__topics" aria-label="Core study areas">
              <span>Software engineering</span>
              <span>Database management</span>
              <span>Network administration</span>
            </div>
          </div>

          <div className="education-v2__campus">
            <div className="education-v2__orbit" aria-hidden="true" />
            <div className="education-v2__eclipse" aria-hidden="true" />
            <img src={kaubul} alt="King Abdulaziz University" />
          </div>
        </article>

        <aside className="education-v2__internship">
          <div className="education-v2__internship-title">
            <h3>IT Internship</h3>
            <span>UCIC</span>
          </div>

          <div className="education-v2__internship-copy">
            <p className="education-v2__company">
              United Cement Industrial Company
            </p>
            <p>
              Windows Server administration, MySQL tasks, network
              troubleshooting, and technical support in a professional
              environment.
            </p>
            <a href="mailto:info@unitedcement.com.sa">
              info@unitedcement.com.sa
            </a>
          </div>
        </aside>
      </motion.div>
    </>
  );
};

export default SectionWrapper(EducationV2, "education");
