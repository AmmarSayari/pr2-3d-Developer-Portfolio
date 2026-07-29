/* eslint-disable react/prop-types */
import { useState } from "react";

const ProjectPartCardIvoryV2 = ({ app, projectName }) => {
  const screenshots = (app.images || [])
    .map((imageEntry) => imageEntry.image)
    .filter(Boolean);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const hasMultipleImages = screenshots.length > 1;
  const activeImage = screenshots[activeImageIndex];

  const changeImage = (direction) => {
    if (!hasMultipleImages) {
      return;
    }

    setActiveImageIndex(
      (currentIndex) =>
        (currentIndex + direction + screenshots.length) % screenshots.length,
    );
  };

  return (
    <article className="projects-ivory-v2__part">
      {/*
        First V2 card-top stripes preserved but disabled:
        <span className="projects-ivory-v2__part-stripes" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      */}

      <header className="projects-ivory-v2__part-header">
        <div>
          {/*
            First V2 label preserved but disabled: <p>Project part</p>
          */}
          <h4>{app.name}</h4>
        </div>
        {/*
          First V2 decorative part index preserved:
          <span>{String(partIndex + 1).padStart(2, "0")}</span>
        */}
      </header>

      <div className="projects-ivory-v2__media">
        {activeImage ? (
          <img
            key={`${app.name}-${activeImageIndex}`}
            src={activeImage}
            alt={`${projectName} - ${app.name} screenshot ${
              activeImageIndex + 1
            }`}
          />
        ) : (
          <div className="projects-ivory-v2__media-empty">
            Screenshot coming later
          </div>
        )}

        <span className="projects-ivory-v2__media-eclipse" aria-hidden="true" />
      </div>

      <div className="projects-ivory-v2__carousel">
        {hasMultipleImages ? (
          <div className="projects-ivory-v2__carousel-controls">
            <button
              type="button"
              onClick={() => changeImage(-1)}
              aria-label={`Show previous ${app.name} screenshot`}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => changeImage(1)}
              aria-label={`Show next ${app.name} screenshot`}
            >
              Next
            </button>
          </div>
        ) : (
          <span className="projects-ivory-v2__carousel-static">
            Image preview
          </span>
        )}

        <span>
          {String(activeImageIndex + 1).padStart(2, "0")} /{" "}
          {String(Math.max(screenshots.length, 1)).padStart(2, "0")}
        </span>
      </div>

      <div className="projects-ivory-v2__stack">
        <p>Technology stack</p>
        <div>
          {app.technologies.map((technology) => (
            <span key={technology.techName}>
              <span aria-hidden="true">&gt;</span>
              {technology.techName}
            </span>
          ))}
        </div>
      </div>

      <footer className="projects-ivory-v2__part-links">
        {app.source_code_link && (
          <a
            href={app.source_code_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
            <span aria-hidden="true">↗</span>
          </a>
        )}

        {app.live_preview_link && (
          <a
            href={app.live_preview_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live website
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </footer>
    </article>
  );
};

export default ProjectPartCardIvoryV2;
