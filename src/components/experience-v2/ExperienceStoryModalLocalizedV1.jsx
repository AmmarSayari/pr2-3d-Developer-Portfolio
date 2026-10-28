import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePortfolioLocaleV1 } from "../../i18n/PortfolioLocaleProviderV1";
import LanguageSwitchV1 from "../../i18n/LanguageSwitchV1";

import SharpGlassPanelV2 from "../ui/SharpGlassPanelV2";

const ExperienceStoryModalLocalizedV1 = ({ onClose, story }) => {
  const { t, isArabic } = usePortfolioLocaleV1();
  const [archiveOpen, setArchiveOpen] = useState(false);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const availableExtras = story.extraMedia.filter((item) => item.src);
  const hasPlannedExtras = story.plannedExtraMedia > 0;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusableElements = dialogRef.current.querySelectorAll(
        'button:not(:disabled), video[controls], [href], [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements.length) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const closeFromBackdrop = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="experience-orbital-v2__modal portfolio-localized-modal-v1"
      dir={isArabic ? "rtl" : "ltr"}
      onMouseDown={closeFromBackdrop}
      role="presentation"
    >
      <SharpGlassPanelV2
        as="article"
        ref={dialogRef}
        className="experience-orbital-v2__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`experience-story-${story.id}`}
      >
        <header className="experience-orbital-v2__dialog-header">
          <div>
            <p>{story.eyebrow}</p>
            <h3 id={`experience-story-${story.id}`}>{story.title}</h3>
          </div>

          <div className="portfolio-modal-actions-v1">
            <LanguageSwitchV1 />
          <button
            ref={closeButtonRef}
            type="button"
            className="experience-orbital-v2__close"
            onClick={onClose}
            aria-label={t("experience.closeStory", { title: story.title })}
          >
            <span>{t("experience.close")}</span>
            <b aria-hidden="true">×</b>
          </button>
          </div>
        </header>

        <div className="experience-orbital-v2__dialog-layout">
          <div className="experience-orbital-v2__media">
            {story.mainVideo.src ? (
              <video
                controls
                playsInline
                preload="metadata"
                poster={story.mainVideo.poster || undefined}
                aria-label={story.mainVideo.label}
              >
                <source src={story.mainVideo.src} />
                {t("experience.videoUnsupported")}
              </video>
            ) : (
              <div className="experience-orbital-v2__media-placeholder">
                <span aria-hidden="true">▶</span>
                <strong>{story.mainVideo.label}</strong>
                <small>{t("experience.mediaPlaceholder")}</small>
              </div>
            )}

            <span
              className="experience-orbital-v2__media-eclipse"
              aria-hidden="true"
            />
          </div>

          <div className="experience-orbital-v2__story-copy">
            <section>
              <p>{t("experience.context")}</p>
              <span>{story.introduction}</span>
            </section>

            <section>
              <p>{t("experience.contribution")}</p>
              <span>{story.contribution}</span>
            </section>

            <section>
              <p>{t("experience.media")}</p>
              <span>{story.mediaPlan}</span>
            </section>
          </div>
        </div>

        {hasPlannedExtras && (
          <div className="experience-orbital-v2__archive">
            <button
              type="button"
              onClick={() => setArchiveOpen((currentValue) => !currentValue)}
              aria-expanded={archiveOpen}
            >
              <span>
                {archiveOpen ? t("experience.hideExtras") : t("experience.showExtras")}
              </span>
              <b aria-hidden="true">{archiveOpen ? "↑" : "+"}</b>
            </button>

            <div
              className={`experience-orbital-v2__archive-grid ${
                archiveOpen ? "is-open" : ""
              }`}
            >
              {availableExtras.length > 0
                ? availableExtras.map((item, index) => (
                    <figure key={`${story.id}-${index}`}>
                      {item.type === "video" ? (
                        <video
                          controls
                          playsInline
                          preload="metadata"
                          poster={item.poster || undefined}
                          aria-label={item.label}
                        >
                          <source src={item.src} />
                        </video>
                      ) : (
                        <img src={item.src} alt={item.alt || item.label} />
                      )}
                      <figcaption>{item.label}</figcaption>
                    </figure>
                  ))
                : Array.from(
                    { length: story.plannedExtraMedia },
                    (_, index) => (
                      <div
                        className="experience-orbital-v2__archive-placeholder"
                        key={`${story.id}-planned-${index + 1}`}
                      >
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <p>{t("experience.extraSlot")}</p>
                      </div>
                    ),
                  )}
            </div>
          </div>
        )}
      </SharpGlassPanelV2>
    </div>,
    document.body,
  );
};

export default ExperienceStoryModalLocalizedV1;
