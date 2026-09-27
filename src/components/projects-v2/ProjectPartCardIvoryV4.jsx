/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "./ProjectPartCardIvoryV3.css";
import "./ProjectPartCardIvoryV4.css";

const AUTO_ADVANCE_MS = 3000;

const ProjectPartCardIvoryV4 = ({ app, projectName }) => {
  const screenshots = (app.images || []).filter((imageEntry) => imageEntry.image);
  const cardRef = useRef(null);
  const progressRef = useRef(null);
  const elapsedMsRef = useRef(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [direction, setDirection] = useState("forward");
  const [isVisible, setIsVisible] = useState(false);
  const [isMediaHovered, setIsMediaHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(
    () => document.visibilityState === "visible",
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const hasMultipleImages = screenshots.length > 1;
  const activeScreenshot = screenshots[activeImageIndex];
  const activeImage = activeScreenshot?.image;

  useEffect(() => {
    if (!hasMultipleImages || !cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [hasMultipleImages]);

  useEffect(() => {
    const updatePageVisibility = () =>
      setIsPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", updatePageVisibility);
    return () =>
      document.removeEventListener("visibilitychange", updatePageVisibility);
  }, []);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () =>
      setPrefersReducedMotion(motionPreference.matches);
    motionPreference.addEventListener("change", updateMotionPreference);
    return () =>
      motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (
      !hasMultipleImages ||
      !isVisible ||
      !isPageVisible ||
      isMediaHovered ||
      isFocused ||
      prefersReducedMotion
    ) {
      return;
    }

    let frameId;
    let previousTime;
    const updateProgress = (now) => {
      if (previousTime !== undefined) {
        elapsedMsRef.current += Math.min(now - previousTime, 100);
      }
      previousTime = now;

      const ratio = Math.min(elapsedMsRef.current / AUTO_ADVANCE_MS, 1);
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${ratio})`;
      }

      if (ratio >= 1) {
        elapsedMsRef.current = 0;
        if (progressRef.current) {
          progressRef.current.style.transform = "scaleX(0)";
        }
        setDirection("forward");
        setActiveImageIndex((index) => (index + 1) % screenshots.length);
        return;
      }

      frameId = window.requestAnimationFrame(updateProgress);
    };

    frameId = window.requestAnimationFrame(updateProgress);
    return () => window.cancelAnimationFrame(frameId);
  }, [
    activeImageIndex,
    hasMultipleImages,
    isVisible,
    isPageVisible,
    isMediaHovered,
    isFocused,
    prefersReducedMotion,
    screenshots.length,
  ]);

  const changeImage = (step) => {
    if (!hasMultipleImages) return;
    elapsedMsRef.current = 0;
    if (progressRef.current) {
      progressRef.current.style.transform = "scaleX(0)";
    }
    setDirection(step > 0 ? "forward" : "backward");
    setActiveImageIndex(
      (index) => (index + step + screenshots.length) % screenshots.length,
    );
  };

  return (
    <article
      ref={cardRef}
      className={`projects-ivory-v2__part${!app.source_code_link && !app.live_preview_link ? " projects-ivory-v4__part--no-links" : ""}`}
      onFocus={() => setIsFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsFocused(false);
        }
      }}
    >
      <header
        className={`projects-ivory-v2__part-header${app.status_label ? " projects-ivory-v4__part-header--status" : ""}`}
      >
        <div>
          <h4>{app.name}</h4>
        </div>
        {app.status_label && (
          <span className="projects-ivory-v4__status">{app.status_label}</span>
        )}
      </header>

      {app.summary && (
        <p className="projects-ivory-v4__summary">{app.summary}</p>
      )}

      <div
        className={`projects-ivory-v2__media${app.media_layout === "portrait" ? " projects-ivory-v4__media--portrait" : ""}`}
        onMouseEnter={() => setIsMediaHovered(true)}
        onMouseLeave={() => setIsMediaHovered(false)}
      >
        {activeImage ? (
          <img
            key={`${app.name}-${activeImageIndex}`}
            className={`projects-ivory-v3__image--${direction}`}
            src={activeImage}
            alt={
              activeScreenshot.alt ||
              `${projectName} - ${app.name} screenshot ${activeImageIndex + 1}`
            }
          />
        ) : (
          <div className="projects-ivory-v2__media-empty">
            Screenshot coming later
          </div>
        )}
        <span className="projects-ivory-v2__media-eclipse" aria-hidden="true" />
        {hasMultipleImages && (
          <span className="projects-ivory-v4__progress" aria-hidden="true">
            <span ref={progressRef} />
          </span>
        )}
      </div>

      <div className="projects-ivory-v2__carousel">
        {hasMultipleImages ? (
          <div className="projects-ivory-v2__carousel-controls projects-ivory-v3__carousel-controls">
            <button
              type="button"
              onClick={() => changeImage(-1)}
              aria-label={`Show previous ${app.name} screenshot`}
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => changeImage(1)}
              aria-label={`Show next ${app.name} screenshot`}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        ) : (
          <span className="projects-ivory-v2__carousel-static">
            Image preview
          </span>
        )}

        {activeScreenshot?.caption && (
          <span className="projects-ivory-v4__caption">
            {activeScreenshot.caption}
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

      {(app.source_code_link || app.live_preview_link) && (
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
      )}
    </article>
  );
};

export default ProjectPartCardIvoryV4;
