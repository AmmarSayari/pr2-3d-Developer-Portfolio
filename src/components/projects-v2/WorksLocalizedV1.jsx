/* eslint-disable react-refresh/only-export-components */
import { useMemo } from "react";
import { SectionWrapper } from "../../hoc";
import { usePortfolioLocaleV1 } from "../../i18n/PortfolioLocaleProviderV1";
import { getLocalizedProjectsV1 } from "../../i18n/localizedContentV1";
import ProjectPartCardLocalizedV1 from "./ProjectPartCardLocalizedV1";
import SawlahShowcaseLocalizedV1 from "./SawlahShowcaseLocalizedV1";
import "./WorksIvoryCommandV2.css";

const WorksLocalizedV1 = () => {
  const { locale, isArabic, t } = usePortfolioLocaleV1();
  const projects = useMemo(() => getLocalizedProjectsV1(locale), [locale]);
  return (
    <div className="projects-ivory-v2">
      <header className="projects-ivory-v2__section-heading">
        <div><p>{t("projects.eyebrow")}</p><h2>{t("projects.title")}</h2></div>
      </header>
      <div className="projects-ivory-v2__projects">
        {projects.map((project) => (
          <article className="projects-ivory-v2__project" key={project.localizationKey}>
            <header className="projects-ivory-v2__project-heading">
              <div>
                <h3><bdi>{project.name}</bdi></h3>
                <p className="projects-ivory-v2__project-description">{project.description}</p>
              </div>
            </header>
            {project.layout === "sawlah-showcase-v1" ? (
              <SawlahShowcaseLocalizedV1 project={project} />
            ) : (
              <div className="projects-ivory-v2__parts">
                {project.apps.map((app, index) => (
                  <ProjectPartCardLocalizedV1 app={app} projectName={project.name} key={`${project.localizationKey}-${index}`} />
                ))}
              </div>
            )}
            <footer className="projects-ivory-v2__project-footer">
              <div className="projects-ivory-v2__achievement">
                <span>{project.achievement_label || t("projects.achievement")}</span>
                <p>{project.achievements}</p>
              </div>
              <button type="button" className="projects-ivory-v2__details" disabled title={t("projects.detailsLater")}>
                {t("projects.details")}<span aria-hidden="true">{isArabic ? "↖" : "↗"}</span>
              </button>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(WorksLocalizedV1, "Projects");
