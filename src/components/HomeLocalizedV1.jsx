import { styles } from "../styles";
import { StarsCanvas } from "../components";
import ProfileImageLocalizedV1 from "./ui/ProfileImageLocalizedV1";
import Tech from "./Tech";
import HomeDegreeLocalizedV1 from "./ui/HomeDegreeLocalizedV1";
import { usePortfolioLocaleV1 } from "../i18n/PortfolioLocaleProviderV1";
import "./HomeProjectsV2.css";

// Inline university credential. HomeProjectsV3 and earlier versions remain intact.
const HomeLocalizedV1 = () => {
  const { t } = usePortfolioLocaleV1();
  return (
    <section className="home-projects-v2 relative w-full h-screen mx-auto">
      <StarsCanvas />
      <div
        className={`home-projects-v2__layout ${styles.paddingX} absolute inset-0 max-w-7xl mx-auto
          flex flex-col sm:flex-row items-center justify-center gap-5`}
      >
        <div className="hidden sm:flex">
          <div
            className="w-2 sm:h-[400px] rounded"
            style={{
              background: "linear-gradient(to bottom, #1EBBD7, transparent)",
            }}
          />
        </div>

        <div className="flex flex-col">
          <div className="max-w-[700px]">
            <p className={`${styles.heroSubText} text-white-100`}>
              {t("home.intro")}
            </p>
            <HomeDegreeLocalizedV1 />
          </div>

          <div className="localized-home-v1__tech-row flex flex-row h-[160px] max-w-[600px] justify-center items-center mt-5">
            <h1 className={`${styles.heroSubText} text-white ml-6 localized-home-v1__tech-label hidden sm:block`}>
              {t("home.tech")}
            </h1>
            <div
              className="localized-home-v1__tech-divider hidden sm:block w-2 sm:h-40 h-20 rounded mt-10 ml-3"
              style={{
                background: "linear-gradient(to bottom, #1EBBD7, transparent)",
              }}
            />
            <Tech />
          </div>

          <div className="home-projects-v2__actions mt-9 mx-auto">
            <a
              href="#projects"
              className="home-projects-v2__projects buttonCustom1 inline-block"
            >
              {t("nav.projects")}
            </a>
            <a href="#contact" className="buttonCustom1 inline-block">
              {t("home.contact")}
            </a>
          </div>
        </div>

        <ProfileImageLocalizedV1 />
      </div>
    </section>
  );
};

export default HomeLocalizedV1;
