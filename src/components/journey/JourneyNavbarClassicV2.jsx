/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { styles } from "../../styles";
import { linkedin, whatsapplogo } from "../../assets";
import logoA1 from "../../assets/logoA1.png";
import cv from "../../assets/pdffile/AmmarSayariResume26-2.pdf";
import TravelStationSpacecraftIconV2 from "./TravelStationSpacecraftIconV2";

const JourneyNavbarClassicV2 = ({
  activeDestination,
  destinations,
  isTraveling,
  onTravel,
  targetDestination,
}) => {
  const [mobileActionsOpen, setMobileActionsOpen] = useState(false);
  const [stationOpen, setStationOpen] = useState(false);

  useEffect(() => {
    if (!stationOpen && !mobileActionsOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileActionsOpen(false);
        setStationOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [mobileActionsOpen, stationOpen]);

  useEffect(() => {
    setMobileActionsOpen(false);
    setStationOpen(false);
  }, [activeDestination.id]);

  const handleDestination = (destinationId) => {
    setMobileActionsOpen(false);
    setStationOpen(false);
    onTravel(destinationId);
  };

  const openMobileAction = (url) => {
    setMobileActionsOpen(false);
    window.open(url, "_blank");
  };

  const visibleDestination = targetDestination || activeDestination;

  return (
    <>
      <nav
        className={`${styles.paddingX} journey-topbar-v2 ${
          mobileActionsOpen ? "is-mobile-open" : ""
        }
          w-full flex items-center py-5 fixed
          top-0 z-[50] bg-primary`}
      >
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
          <div className="journey-topbar-v2__desktop-content flex flex-row gap-6">
            <button
              type="button"
              className="flex items-center gap-2 bg-transparent border-0"
              onClick={() => handleDestination("hero")}
              disabled={isTraveling}
              aria-label="Travel to Hero"
            >
              <img
                src={logoA1}
                alt="logo"
                className="w-12 h-12 object-contain rounded-full"
              />
              <p className="text-white text-[18px] font-bold cursor-pointer flex">
                Ammar &nbsp;
                <span className="sm:block hidden">Al-sayari</span>
              </p>
            </button>

            <button
              type="button"
              onClick={() => window.open(cv, "_blank")}
              className="btnIcon1 w-[45px] h-[45px] rounded-xl"
              aria-label="Open resume PDF"
            >
              <p className="text-white text-[14px] font-bold">CV</p>
            </button>
            <button
              type="button"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/amar9dev/",
                  "_blank",
                )
              }
              className="btnIcon1 w-[45px] h-[45px] rounded-xl"
              aria-label="Open LinkedIn profile"
            >
              <img
                src={linkedin}
                alt="linkedIn"
                className="w-[70%] h-[70%]"
              />
            </button>
            <button
              type="button"
              onClick={() =>
                window.open("https://wa.me/966504704030", "_blank")
              }
              className="btnIcon1 w-[45px] h-[45px] rounded-xl"
              aria-label="Open WhatsApp conversation"
            >
              <img
                src={whatsapplogo}
                alt="whatsapplogo"
                className="w-[70%] h-[70%]"
              />
            </button>
          </div>

          <div className="journey-topbar-v2__mobile-shell">
            <button
              type="button"
              className="journey-topbar-v2__mobile-toggle"
              onClick={() => setMobileActionsOpen((currentValue) => !currentValue)}
              aria-expanded={mobileActionsOpen}
              aria-controls="journey-mobile-profile-actions"
              aria-label={
                mobileActionsOpen
                  ? "Close profile and social links"
                  : "Open profile and social links"
              }
            >
              <img src={logoA1} alt="" />
              <span>
                Ammar <small>Al-sayari</small>
              </span>
              <b aria-hidden="true">{mobileActionsOpen ? "×" : "+"}</b>
            </button>

            <div
              id="journey-mobile-profile-actions"
              className={`journey-topbar-v2__mobile-actions ${
                mobileActionsOpen ? "is-open" : ""
              }`}
              hidden={!mobileActionsOpen}
            >
              <button
                type="button"
                onClick={() => handleDestination("hero")}
                disabled={isTraveling}
              >
                <span className="journey-topbar-v2__mobile-action-mark">
                  {activeDestination.id === "hero" ? "●" : "→"}
                </span>
                <span>Hero</span>
              </button>

              <button
                type="button"
                onClick={() => openMobileAction(cv)}
              >
                <span className="journey-topbar-v2__mobile-action-mark">CV</span>
                <span>Resume</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  openMobileAction(
                    "https://www.linkedin.com/in/amar9dev/",
                  )
                }
              >
                <img src={linkedin} alt="" />
                <span>LinkedIn</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  openMobileAction("https://wa.me/966504704030")
                }
              >
                <img src={whatsapplogo} alt="" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <nav
        className="journey-station-v2 journey-station-v2--desktop"
        aria-label="Portfolio destinations"
      >
        <div className="journey-station-v2__heading">
          {/* Legacy Travel Station orbit icon preserved: <span className="journey-station-v2__orbit-icon" aria-hidden="true" /> */}
          <TravelStationSpacecraftIconV2 />
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
          {/* Legacy Travel Station orbit icon preserved: <span className="journey-station-v2__orbit-icon" aria-hidden="true" /> */}
          <TravelStationSpacecraftIconV2 />
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
              {/* Legacy Travel Station orbit icon preserved: <span className="journey-station-v2__orbit-icon" aria-hidden="true" /> */}
              <TravelStationSpacecraftIconV2 />
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

export default JourneyNavbarClassicV2;
