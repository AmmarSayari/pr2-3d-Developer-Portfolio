/* eslint-disable react-refresh/only-export-components */
import { projects2 } from "../../constants";
import { SectionWrapper } from "../../hoc";
import ProjectPartCardIvoryV2 from "./ProjectPartCardIvoryV2";
import "./WorksIvoryCommandV2.css";

const WorksIvoryCommandV2 = () => {
  return (
    <div className="projects-ivory-v2">
      <header className="projects-ivory-v2__section-heading">
        <div>
          <p>Selected work</p>
          <h2>Projects.</h2>
        </div>

        <p className="projects-ivory-v2__section-intro">
          I have worked on a variety of projects, ranging from Web Development,
          App Development, to back-end development. I use React, Node, Nextjs,
          TypeScript, Java, MySql, Stripe, and more. This work reflects my
          ability to solve complex problems, work with different technologies,
          frameworks, and libraries, and manage projects effectively.
        </p>
      </header>

      <div className="projects-ivory-v2__projects">
        {projects2.map((project) => (
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

            <div className="projects-ivory-v2__parts">
              {/*
                The first V2 pass also supplied a decorative partIndex prop.
              */}
              {project.apps.map((app) => (
                <ProjectPartCardIvoryV2
                  app={app}
                  key={`${project.name}-${app.name}`}
                  projectName={project.name}
                />
              ))}
            </div>

            <footer className="projects-ivory-v2__project-footer">
              <div className="projects-ivory-v2__achievement">
                <span>Achievement</span>
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
