import { styles } from "../styles";
import { StarsCanvas } from "../components";
import ProfileImageV2 from "./ui/ProfileImageV2";
import Tech from "./Tech";
import HomeDegreeInlineV1 from "./ui/HomeDegreeInlineV1";
import "./HomeProjectsV2.css";

// Inline university credential. HomeProjectsV3 and earlier versions remain intact.
const HomeProjectsV4 = () => {
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
              Software developer, passionate about transforming ideas into real products
            </p>
            <HomeDegreeInlineV1 />
          </div>

          <div className="flex flex-row h-[160px] max-w-[600px] justify-center items-center mt-5">
            <h1 className={`${styles.heroSubText} text-white ml-6 hidden sm:block`}>
              Tech
            </h1>
            <div
              className="hidden sm:block w-2 sm:h-40 h-20 rounded mt-10 ml-3"
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
              Projects
            </a>
            <a href="#contact" className="buttonCustom1 inline-block">
              Contact me
            </a>
          </div>
        </div>

        <ProfileImageV2 />
      </div>
    </section>
  );
};

export default HomeProjectsV4;
