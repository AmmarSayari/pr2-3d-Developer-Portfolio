/* eslint-disable react-refresh/only-export-components */
import { motion } from "framer-motion";
import { usePortfolioLocaleV1 } from "../i18n/PortfolioLocaleProviderV1";

import { kaubul } from "../assets";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

import "./EducationV2.css";

const EducationLocalizedV1 = () => {
  const { t, isArabic } = usePortfolioLocaleV1();
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>{t("education.title")}</h2>
      </motion.div>

      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="education-v2"
      >
        <article className="education-v2__strip">
          <div className="education-v2__copy">
            <h3 className="education-v2__degree">
              {t("education.degree")}
            </h3>
            <p className="education-v2__meta">
              {isArabic ? <>{t("home.university")} · <bdi dir="ltr">2024</bdi> · المعدل <bdi dir="ltr">4.04 / 5</bdi></> : t("education.meta")}
            </p>
            <p className="education-v2__overview">
              {t("education.overview")}
            </p>

            <div className="education-v2__topics" aria-label={t("education.areas")}>
              <span>{t("education.software")}</span>
              <span>{t("education.database")}</span>
              <span>{t("education.network")}</span>
            </div>
          </div>

          <div className="education-v2__campus">
            <div className="education-v2__orbit" aria-hidden="true" />
            <div className="education-v2__eclipse" aria-hidden="true" />
            <img src={kaubul} alt={t("home.university")} />
          </div>
        </article>

        <aside className="education-v2__internship">
          <div className="education-v2__internship-title">
            <h3>{t("education.internship")}</h3>
            <span>UCIC</span>
          </div>

          <div className="education-v2__internship-copy">
            <p className="education-v2__company">
              <bdi dir="ltr">{t("education.company")}</bdi>
            </p>
            <p>
              {t("education.training")}
            </p>
            <a href="mailto:info@unitedcement.com.sa" dir="ltr">
              info@unitedcement.com.sa
            </a>
          </div>
        </aside>
      </motion.div>
    </>
  );
};

export default SectionWrapper(EducationLocalizedV1, "education");
