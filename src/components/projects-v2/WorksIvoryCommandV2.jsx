/* eslint-disable react-refresh/only-export-components */
import { projects2 } from "../../constants";
import { SectionWrapper } from "../../hoc";
// ProjectPartCardIvoryV2 remains available as the original static carousel.
// import ProjectPartCardIvoryV2 from "./ProjectPartCardIvoryV2";
// ProjectPartCardIvoryV3 remains available without the timed progress bar.
// import ProjectPartCardIvoryV3 from "./ProjectPartCardIvoryV3";
import ProjectPartCardIvoryV4 from "./ProjectPartCardIvoryV4";
import SawlahShowcaseV1 from "./SawlahShowcaseV1";
import legacyPortfolioProjectV2 from "./legacyPortfolioProjectV2";
// The previous four full Sawlah cards remain in sawlahProjectV2.
// import sawlahProjectV2 from "./sawlahProjectV2";
import sawlahProjectV3 from "./sawlahProjectV3";
import ballotProjectV1 from "./ballotProjectV1";
import "./WorksIvoryCommandV2.css";

// Keep the original project records intact and add new work separately.
const activeProjects = [sawlahProjectV3, ballotProjectV1, legacyPortfolioProjectV2, ...projects2];

const WorksIvoryCommandV2 = () => {
  return (
    <div className="projects-ivory-v2">
      <header className="projects-ivory-v2__section-heading">
        <div>
          <p>Selected work</p>
          <h2>Projects.</h2>
        </div>

        {/*
          Previous intro preserved:
          I have worked on a variety of projects, ranging from Web Development,
          App Development, to back-end development. I use React, Node, Nextjs,
          TypeScript, Java, MySql, Stripe, and more. This work reflects my
          ability to solve complex problems, work with different technologies,
          frameworks, and libraries, and manage projects effectively.
        */}
        <p className="projects-ivory-v2__section-intro">
          A selection of projects I&apos;ve built across web, mobile, and
          interactive experiences, each exploring a different idea or challenge.
        </p>
      </header>

      <div className="projects-ivory-v2__projects">
        {activeProjects.map((project) => (
          <article
            className="projects-ivory-v2__project"
            key={project.name}
          >
            <header className="projects-ivory-v2__project-heading">
              {/*
                Decorative project index from the first V2 pass preserved:
                <span className="projects-ivory-v2__project-index">
                  {String(projectIndex + 1).padStart(2, "0")}
                </span>
              */}

              <div>
                {/*
                  First V2 label preserved but disabled: <p>Project system</p>
                */}
                <h3>{project.name}</h3>
                <p className="projects-ivory-v2__project-description">
                  {project.description}
                </p>
              </div>

              {/*
                First V2 project-part count preserved but disabled:
                <span className="projects-ivory-v2__part-count">
                  {String(project.apps.length).padStart(2, "0")} project parts
                </span>
              */}
            </header>

            {project.layout === "sawlah-showcase-v1" ? (
              <SawlahShowcaseV1 project={project} />
            ) : (
              <div className="projects-ivory-v2__parts">
                {/*
                  The first V2 pass also supplied a decorative partIndex prop.
                */}
                {project.apps.map((app) => (
                  <ProjectPartCardIvoryV4
                    app={app}
                    key={`${project.name}-${app.name}`}
                    projectName={project.name}
                  />
                ))}
              </div>
            )}

            <footer className="projects-ivory-v2__project-footer">
              <div className="projects-ivory-v2__achievement">
                <span>{project.achievement_label || "Achievement"}</span>
                <p>{project.achievements}</p>
              </div>

              {/*
                The detail-page system is intentionally not active yet.
                When its separate content pages are approved, this button will
                open /?project=<slug> in a new browser tab.
              */}
              <button
                type="button"
                className="projects-ivory-v2__details"
                disabled
                title="The separate project details page will be connected later"
              >
                More project details
                <span aria-hidden="true">↗</span>
              </button>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(WorksIvoryCommandV2, "Projects");
