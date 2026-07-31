import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// About destination is preserved but temporarily disabled:
// import About from "../About";
// Legacy Contact section preserved before the Signal Console V2 replacement:
// import Contact from "../Contact";
import ContactSignalConsoleV2 from "../contact-v2/ContactSignalConsoleV2";
import EducationV2 from "../EducationV2";
import ExperienceOrbitalV2 from "../experience-v2/ExperienceOrbitalV2";
import Hero from "../Hero";
// Legacy Projects section preserved before the Ivory Command V2 replacement:
// import Works from "../Works";
import WorksIvoryCommandV2 from "../projects-v2/WorksIvoryCommandV2";

// Journey-specific Hero experiment preserved but disabled:
// import HeroJourneyV2 from "./HeroJourneyV2";
// Redesigned identity/actions experiment preserved but disabled:
// import JourneyNavbarV2 from "./JourneyNavbarV2";
// Classic navbar preserved as the fallback before the Portfolio 26-8 Docking Rail:
// import JourneyNavbarClassicV2 from "./JourneyNavbarClassicV2";
import JourneyNavbarDockingRailV2 from "./JourneyNavbarDockingRailV2";
// Cyan square-particle canvas experiment preserved but disabled:
// import SpaceJourneyCanvasV2 from "./SpaceJourneyCanvasV2";
// Forward-moving neutral canvas experiment preserved but disabled:
// import SpaceJourneyCanvasNeutralV2 from "./SpaceJourneyCanvasNeutralV2";
// Extra-distant starfield experiment preserved but disabled:
// import SpaceJourneyCanvasDistantV2 from "./SpaceJourneyCanvasDistantV2";
// Rotation-only balanced starfield experiment preserved but disabled:
// import SpaceJourneyCanvasBalancedV2 from "./SpaceJourneyCanvasBalancedV2";
// Point-only flight starfield preserved but disabled:
// import SpaceJourneyCanvasFlightV2 from "./SpaceJourneyCanvasFlightV2";
// Ivory-only light-speed treatment preserved but disabled:
// import SpaceJourneyCanvasLightSpeedV2 from "./SpaceJourneyCanvasLightSpeedV2";
// Static Polar Prism flight treatment preserved but disabled:
// import SpaceJourneyCanvasPolarPrismV2 from "./SpaceJourneyCanvasPolarPrismV2";
// Finite rotating cruise experiment preserved but disabled:
// import SpaceJourneyCanvasCruiseV2 from "./SpaceJourneyCanvasCruiseV2";
// Oversized deep-loop experiment preserved but disabled:
// import SpaceJourneyCanvasDeepLoopV2 from "./SpaceJourneyCanvasDeepLoopV2";
// Cream/white legacy-behavior adaptation preserved but disabled:
// import SpaceJourneyCanvasLegacyBlendV2 from "./SpaceJourneyCanvasLegacyBlendV2";
// Original stars plus Polar Prism travel preserved but disabled:
// import SpaceJourneyCanvasOriginalV2 from "./SpaceJourneyCanvasOriginalV2";
// Direct legacy StarsCanvas wrapper preserved but disabled:
// import SpaceJourneyCanvasOriginalWarpV2 from "./SpaceJourneyCanvasOriginalWarpV2";
import SpaceJourneyCanvasCopiedWarpV2 from "./SpaceJourneyCanvasCopiedWarpV2";

import "./PortfolioJourneyV2.css";
import "./PortfolioJourneyNeutralV2.css";
import "./PortfolioJourneyTuningV2.css";
import "./PortfolioJourneyFlightV2.css";
import "./PortfolioJourneyPolarPrismV2.css";
import "./PortfolioJourneyNavigationCorrectionV2.css";
import "./PortfolioJourneyOriginalStarsV2.css";
import "./PortfolioJourneyBlackNavbarV2.css";

const DESTINATIONS = [
  {
    id: "hero",
    label: "Home",
    station: "Home orbit",
  },
  /*
  About destination preserved but temporarily disabled:
  {
    id: "about",
    label: "About",
    station: "Personal signal",
  },
  */
  {
    id: "education",
    label: "Education",
    station: "Eclipse station",
  },
  {
    id: "experience",
    label: "Experience",
    station: "IEI work orbit",
  },
  {
    id: "projects",
    label: "Projects",
    station: "Project systems",
  },
  {
    id: "contact",
    label: "Contact",
    station: "Signal console",
  },
];

const getDestinationFromHash = () => {
  const hash = window.location.hash.replace("#", "").toLowerCase();
  return DESTINATIONS.some((destination) => destination.id === hash)
    ? hash
    : "hero";
};

const PortfolioJourneyV2 = () => {
  const prefersReducedMotion = useReducedMotion();
  const initialDestination = useMemo(getDestinationFromHash, []);
  const [activeDestinationId, setActiveDestinationId] =
    useState(initialDestination);
  const [targetDestinationId, setTargetDestinationId] = useState(null);
  const [isTraveling, setIsTraveling] = useState(false);
  const [travelDirection, setTravelDirection] = useState(1);

  const activeDestinationRef = useRef(initialDestination);
  const isTravelingRef = useRef(false);
  const travelTimerRef = useRef();
  const scrollPositionsRef = useRef({});

  const activeDestination = DESTINATIONS.find(
    (destination) => destination.id === activeDestinationId,
  );
  const targetDestination = DESTINATIONS.find(
    (destination) => destination.id === targetDestinationId,
  );

  const travelTo = useCallback(
    (destinationId, options = {}) => {
      const destinationIndex = DESTINATIONS.findIndex(
        (destination) => destination.id === destinationId,
      );
      const activeIndex = DESTINATIONS.findIndex(
        (destination) => destination.id === activeDestinationRef.current,
      );

      if (
        destinationIndex === -1 ||
        destinationId === activeDestinationRef.current ||
        isTravelingRef.current
      ) {
        return;
      }

      scrollPositionsRef.current[activeDestinationRef.current] = window.scrollY;
      isTravelingRef.current = true;
      setIsTraveling(true);
      setTargetDestinationId(destinationId);
      setTravelDirection(destinationIndex >= activeIndex ? 1 : -1);

      const compactScreen = window.matchMedia("(max-width: 639px)").matches;
      const duration = prefersReducedMotion ? 0 : compactScreen ? 620 : 920;

      window.clearTimeout(travelTimerRef.current);
      travelTimerRef.current = window.setTimeout(() => {
        activeDestinationRef.current = destinationId;
        setActiveDestinationId(destinationId);

        if (options.historyMode !== "none") {
          window.history.pushState(
            { destination: destinationId },
            "",
            `#${destinationId}`,
          );
        }

        window.requestAnimationFrame(() => {
          const previousScrollBehavior =
            document.documentElement.style.scrollBehavior;
          document.documentElement.style.scrollBehavior = "auto";
          window.scrollTo(0, scrollPositionsRef.current[destinationId] || 0);

          window.requestAnimationFrame(() => {
            document.documentElement.style.scrollBehavior =
              previousScrollBehavior;
            isTravelingRef.current = false;
            setIsTraveling(false);
            setTargetDestinationId(null);
          });
        });
      }, duration);
    },
    [prefersReducedMotion],
  );

  useEffect(() => {
    const currentHash = `#${initialDestination}`;
    if (window.location.hash.toLowerCase() !== currentHash) {
      window.history.replaceState(
        { destination: initialDestination },
        "",
        currentHash,
      );
    } else {
      window.history.replaceState(
        { destination: initialDestination },
        "",
        window.location.href,
      );
    }

    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousRestoration;
    };
  }, [initialDestination]);

  useEffect(() => {
    const handlePopState = () => {
      const destinationId = getDestinationFromHash();

      if (isTravelingRef.current) {
        window.clearTimeout(travelTimerRef.current);
        isTravelingRef.current = false;
        activeDestinationRef.current = destinationId;
        setActiveDestinationId(destinationId);
        setTargetDestinationId(null);
        setIsTraveling(false);
        window.scrollTo(0, scrollPositionsRef.current[destinationId] || 0);
        return;
      }

      travelTo(destinationId, { historyMode: "none" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [travelTo]);

  useEffect(() => {
    if (!isTraveling) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isTraveling]);

  useEffect(
    () => () => {
      window.clearTimeout(travelTimerRef.current);
    },
    [],
  );

  const renderDestination = () => {
    switch (activeDestinationId) {
      /*
      About render preserved but temporarily disabled:
      case "about":
        return <About />;
      */
      case "education":
        return <EducationV2 />;
      case "experience":
        return <ExperienceOrbitalV2 />;
      case "projects":
        // Legacy Projects render preserved: return <Works />;
        return <WorksIvoryCommandV2 />;
      case "contact":
        // Legacy Contact render preserved: return <Contact />;
        return <ContactSignalConsoleV2 />;
      case "hero":
      default:
        return <Hero />;
    }
  };

  // Legacy chapter-control calculations preserved for the disabled footer:
  // const activeIndex = DESTINATIONS.findIndex(
  //   (destination) => destination.id === activeDestinationId,
  // );
  // const previousDestination = DESTINATIONS[activeIndex - 1];
  // const nextDestination = DESTINATIONS[activeIndex + 1];

  const handleChapterNavigation = (event) => {
    const destinationLink = event.target.closest?.('a[href^="#"]');
    const destinationId = destinationLink
      ?.getAttribute("href")
      ?.replace("#", "")
      .toLowerCase();

    if (DESTINATIONS.some((destination) => destination.id === destinationId)) {
      event.preventDefault();
      travelTo(destinationId);
    }
  };

  return (
    <div
      className="portfolio-journey-v2"
      data-destination={activeDestinationId}
    >
      <SpaceJourneyCanvasCopiedWarpV2
        direction={travelDirection}
        isTraveling={isTraveling}
        reducedMotion={prefersReducedMotion}
      />

      <div className="portfolio-journey-v2__space-wash" aria-hidden="true" />

      <JourneyNavbarDockingRailV2
        activeDestination={activeDestination}
        destinations={DESTINATIONS}
        isTraveling={isTraveling}
        onTravel={travelTo}
        targetDestination={targetDestination}
      />

      <main
        className={`portfolio-journey-v2__content ${
          isTraveling ? "is-departing" : ""
        }`}
        aria-label={`${activeDestination.label} destination`}
        onClick={handleChapterNavigation}
      >
        <div className="portfolio-journey-v2__chapter">
          {renderDestination()}
        </div>

        {/*
          {activeDestinationId !== "hero" && (
          <footer className="journey-v2__chapter-controls">
            {previousDestination ? (
              <button
                type="button"
                className="journey-v2__secondary-action"
                onClick={() => travelTo(previousDestination.id)}
              >
                <span aria-hidden="true">←</span>
                {previousDestination.label}
              </button>
            ) : (
              <span />
            )}

            <div>
              <small>Current destination</small>
              <strong>{activeDestination.label}</strong>
            </div>

            <button
              type="button"
              className="journey-v2__primary-action"
              onClick={() =>
                travelTo(nextDestination?.id || DESTINATIONS[0].id)
              }
            >
              {nextDestination
                ? `Travel to ${nextDestination.label}`
                : "Return to Home"}
              <span aria-hidden="true">→</span>
            </button>
          </footer>
          )}
        */}
      </main>

      <div
        className={`journey-transition-v2 ${
          isTraveling ? "is-visible" : ""
        }`}
        aria-hidden={!isTraveling}
      >
        <div className="journey-transition-v2__tunnel" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        {/*
          Previous plain travel label preserved but disabled:
          <p>Traveling to</p>
          <h2>{targetDestination?.label}</h2>
          <span>{targetDestination?.station}</span>
        */}
        <div className="journey-transition-v2__orbital-seal">
          <span className="journey-transition-v2__orbital-ring" />
          <span className="journey-transition-v2__orbital-ring journey-transition-v2__orbital-ring--secondary" />
          <span className="journey-transition-v2__orbital-dot" />
          <div className="journey-transition-v2__orbital-copy">
            <p>Traveling to</p>
            <h2>{targetDestination?.label}</h2>
            <span className="journey-transition-v2__orbital-station">
              {targetDestination?.station}
            </span>
          </div>
        </div>
      </div>

      <p className="journey-v2__live-region" aria-live="polite">
        {isTraveling && targetDestination
          ? `Traveling to ${targetDestination.label}`
          : `Docked at ${activeDestination.label}`}
      </p>
    </div>
  );
};

export default PortfolioJourneyV2;
