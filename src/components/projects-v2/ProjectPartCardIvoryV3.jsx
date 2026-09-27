/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "./ProjectPartCardIvoryV3.css";

const AUTO_ADVANCE_MS = 5000;

const ProjectPartCardIvoryV3 = ({ app, projectName }) => {
  const screenshots = (app.images || [])
    .map((imageEntry) => imageEntry.image)
    .filter(Boolean);
  const cardRef = useRef(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [direction, setDirection] = useState("forward");
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(
    () => document.visibilityState === "visible",
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const hasMultipleImages = screenshots.length > 1;
  const activeImage = screenshots[activeImageIndex];

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
      isHovered ||
      isFocused ||
      prefersReducedMotion
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      setDirection("forward");
      setActiveImageIndex((index) => (index + 1) % screenshots.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timer);
  }, [
    activeImageIndex,
    hasMultipleImages,
    isVisible,
    isPageVisible,
    isHovered,
    isFocused,
    prefersReducedMotion,
    screenshots.length,
  ]);

  const changeImage = (step) => {
    if (!hasMultipleImages) return;
    setDirection(step > 0 ? "forward" : "backward");
    setActiveImageIndex(
      (index) => (index + step + screenshots.length) % screenshots.length,
    );
  };

  return (
    <article
      ref={cardRef}
      className="projects-ivory-v2__part"
      onFocus={() => setIsFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsFocused(false);
        }
      }}
    >
      <header className="projects-ivory-v2__part-header">
        <div>
          <h4>{app.name}</h4>
        </div>
      </header>

      <div
        className="projects-ivory-v2__media"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {activeImage ? (
          <img
            key={`${app.name}-${activeImageIndex}`}
            className={`projects-ivory-v3__image--${direction}`}
            src={activeImage}
            alt={`${projectName} - ${app.name} screenshot ${activeImageIndex + 1}`}
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

export default ProjectPartCardIvoryV3;
