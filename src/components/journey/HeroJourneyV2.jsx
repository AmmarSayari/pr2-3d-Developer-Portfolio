/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

import { styles } from "../../styles";
import ProfileImageV2 from "../ui/ProfileImageV2";
import Tech from "../Tech";

const HeroJourneyV2 = ({ onTravel }) => {
  return (
    <section
      className="journey-hero-v2"
      aria-labelledby="journey-hero-heading"
    >
      <div className="journey-hero-v2__layout">
        <div className="journey-hero-v2__rail" aria-hidden="true" />

        <div className="journey-hero-v2__copy">
          <p className="journey-hero-v2__station">
            Destination 01 · Home orbit
          </p>
          <h1
            id="journey-hero-heading"
            className={`${styles.heroHeadText} journey-hero-v2__heading`}
          >
            Ammar <span>Al-sayari</span>
          </h1>
          <p className={`${styles.heroSubText} journey-hero-v2__intro`}>
            Full-stack developer, passionate about transforming ideas into real
            products.
          </p>
          <p className="journey-hero-v2__degree">
            Bachelor&apos;s degree in Information Technology · KAU
          </p>

          <div className="journey-hero-v2__tech">
            <span>Tech</span>
            <div aria-hidden="true" />
            <Tech />
          </div>

          <div className="journey-hero-v2__actions">
            <button
              type="button"
              className="journey-v2__primary-action"
              onClick={() => onTravel("about")}
            >
              Travel to About
              <span aria-hidden="true">→</span>
            </button>
            <button
              type="button"
              className="journey-v2__secondary-action"
              onClick={() => onTravel("contact")}
            >
              Contact me
            </button>
          </div>
        </div>

        <ProfileImageV2 />
      </div>

      <button
        type="button"
        className="journey-hero-v2__next-signal"
        onClick={() => onTravel("about")}
      >
        <span>Next destination</span>
        <span className="journey-hero-v2__signal-track" aria-hidden="true">
          <motion.span
            animate={{ y: [0, 19, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </span>
        <strong>About</strong>
      </button>
    </section>
  );
};

export default HeroJourneyV2;
