/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import {
  linkedin,
  whatsapplogo,
} from "../../assets";
import logoA1 from "../../assets/logoA1.png";
import cv from "../../assets/pdffile/AmmarSayariResume26-2.pdf";

const JourneyNavbarV2 = ({
  activeDestination,
  destinations,
  isTraveling,
  onTravel,
  targetDestination,
}) => {
  const [stationOpen, setStationOpen] = useState(false);

  useEffect(() => {
    if (!stationOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setStationOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [stationOpen]);

  useEffect(() => {
    setStationOpen(false);
  }, [activeDestination.id]);

  const handleDestination = (destinationId) => {
    setStationOpen(false);
    onTravel(destinationId);
  };

  const visibleDestination = targetDestination || activeDestination;

  return (
    <>
      <header className="journey-navbar-v2">
        <button
          type="button"
          className="journey-navbar-v2__identity"
          onClick={() => handleDestination("hero")}
          disabled={isTraveling}
          aria-label="Travel to Hero"
        >
          <span className="journey-navbar-v2__logo-orbit" aria-hidden="true">
            <img src={logoA1} alt="" />
          </span>
          <span className="journey-navbar-v2__name">
            Ammar <span>Al-sayari</span>
          </span>
        </button>

        <div
          className="journey-navbar-v2__actions"
          aria-label="Profile links"
        >
          <a
            href={cv}
            target="_blank"
            rel="noreferrer"
            className="journey-navbar-v2__action journey-navbar-v2__action--cv"
            aria-label="Open resume PDF"
          >
            CV
          </a>
          <a
            href="https://www.linkedin.com/in/amar9dev/"
            target="_blank"
            rel="noreferrer"
            className="journey-navbar-v2__action"
            aria-label="Open LinkedIn profile"
          >
            <img src={linkedin} alt="" />
          </a>
          <a
            href="https://wa.me/966504704030"
            target="_blank"
            rel="noreferrer"
            className="journey-navbar-v2__action"
            aria-label="Open WhatsApp conversation"
          >
            <img src={whatsapplogo} alt="" />
          </a>
        </div>
      </header>

      <nav
        className="journey-station-v2 journey-station-v2--desktop"
        aria-label="Portfolio destinations"
      >
        <div className="journey-station-v2__heading">
          <span className="journey-station-v2__orbit-icon" aria-hidden="true" />
          <span>Travel station</span>
          <span className="journey-station-v2__location">
            {isTraveling
              ? `Traveling to ${visibleDestination.label}`
              : `Docked at ${activeDestination.label}`}
          </span>
        </div>

        <div className="journey-station-v2__route">
          {destinations.map((destination, index) => {
            const isActive = destination.id === activeDestination.id;
            const isTarget = destination.id === targetDestination?.id;

            return (
              <div
                className="journey-station-v2__route-part"
                key={destination.id}
              >
                <button
                  type="button"
                  className={`journey-station-v2__stop ${
                    isActive ? "is-active" : ""
                  } ${isTarget ? "is-target" : ""}`}
                  onClick={() => handleDestination(destination.id)}
                  disabled={isTraveling || isActive}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span
                    className="journey-station-v2__stop-dot"
                    aria-hidden="true"
                  />
                  <span>{destination.label}</span>
                </button>

                {index < destinations.length - 1 && (
                  <span
                    className="journey-station-v2__route-line"
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>
      </nav>

      <button
        type="button"
        className="journey-station-v2__mobile-trigger"
        onClick={() => setStationOpen(true)}
        disabled={isTraveling}
        aria-expanded={stationOpen}
        aria-controls="journey-mobile-station"
      >
        <span className="journey-station-v2__mobile-location">
          <span className="journey-station-v2__orbit-icon" aria-hidden="true" />
          <span>
            <small>Current destination</small>
            {activeDestination.label}
          </span>
        </span>
        <span className="journey-station-v2__mobile-open">
          Travel station
          <span aria-hidden="true">↑</span>
        </span>
      </button>

      <div
        className={`journey-station-v2__mobile-layer ${
          stationOpen ? "is-open" : ""
        }`}
        aria-hidden={!stationOpen}
      >
        <button
          type="button"
          className="journey-station-v2__backdrop"
          onClick={() => setStationOpen(false)}
          aria-label="Close travel station"
        />

        <nav
          id="journey-mobile-station"
          className="journey-station-v2__mobile-sheet"
          aria-label="Choose a portfolio destination"
        >
          <div className="journey-station-v2__mobile-sheet-heading">
            <div>
              <span className="journey-station-v2__orbit-icon" aria-hidden="true" />
              <span>
                <small>Navigation</small>
                Travel station
              </span>
            </div>
            <button
              type="button"
              onClick={() => setStationOpen(false)}
              aria-label="Close travel station"
            >
              ×
            </button>
          </div>

          <div className="journey-station-v2__mobile-route">
            {destinations.map((destination, index) => {
              const isActive = destination.id === activeDestination.id;

              return (
                <button
                  type="button"
                  key={destination.id}
                  className={`journey-station-v2__mobile-stop ${
                    isActive ? "is-active" : ""
                  }`}
                  onClick={() => handleDestination(destination.id)}
                  disabled={isTraveling || isActive}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="journey-station-v2__mobile-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <strong>{destination.label}</strong>
                    <small>{destination.station}</small>
                  </span>
                  <span aria-hidden="true">{isActive ? "●" : "→"}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
};

export default JourneyNavbarV2;
