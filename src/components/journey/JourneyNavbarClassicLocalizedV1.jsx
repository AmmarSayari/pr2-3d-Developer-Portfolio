/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { usePortfolioLocaleV1 } from "../../i18n/PortfolioLocaleProviderV1";
import LanguageSwitchV1 from "../../i18n/LanguageSwitchV1";

import { styles } from "../../styles";
import { linkedin, whatsapplogo } from "../../assets";
import logoA1 from "../../assets/logoA1.png";
import cv from "../../assets/pdffile/AmmarSayariResume26-8.pdf";
import TravelStationSpacecraftIconV2 from "./TravelStationSpacecraftIconV2";

const JourneyNavbarClassicLocalizedV1 = ({
  activeDestination,
  destinations,
  isTraveling,
  onTravel,
  targetDestination,
}) => {
  const { t, isArabic } = usePortfolioLocaleV1();
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
              aria-label={t("nav.travelHome")}
            >
              <img
                src={logoA1}
                alt=""
                className="w-12 h-12 object-contain rounded-full"
              />
              <p className="text-white text-[18px] font-bold cursor-pointer flex">
                {t("name.first")} &nbsp;
                <span className="sm:block hidden">{t("name.last")}</span>
              </p>
            </button>

            <button
              type="button"
              onClick={() => window.open(cv, "_blank")}
              className="btnIcon1 w-[45px] h-[45px] rounded-xl"
              aria-label={t("nav.resumeOpen")}
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
              aria-label={t("nav.linkedinOpen")}
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
              aria-label={t("nav.whatsappOpen")}
            >
              <img
                src={whatsapplogo}
                alt="whatsapplogo"
                className="w-[70%] h-[70%]"
              />
            </button>
            <LanguageSwitchV1 disabled={isTraveling} />
          </div>

          <div className="journey-topbar-v2__mobile-shell">
            <div className="portfolio-mobile-top-controls-v1">
            <button
              type="button"
              className="journey-topbar-v2__mobile-toggle"
              onClick={() => setMobileActionsOpen((currentValue) => !currentValue)}
              aria-expanded={mobileActionsOpen}
              aria-controls="journey-mobile-profile-actions"
              aria-label={
                mobileActionsOpen
                  ? t("nav.profileClose")
                  : t("nav.profileOpen")
              }
            >
              <img src={logoA1} alt="" />
              <span>
                {t("name.first")} <small>{t("name.last")}</small>
              </span>
              <b aria-hidden="true">{mobileActionsOpen ? "×" : "+"}</b>
            </button>
            <LanguageSwitchV1 disabled={isTraveling} />
            </div>

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
                  {activeDestination.id === "hero" ? "●" : isArabic ? "←" : "→"}
                </span>
                <span>{t("nav.home")}</span>
              </button>

              <button
                type="button"
                onClick={() => openMobileAction(cv)}
              >
                <span className="journey-topbar-v2__mobile-action-mark">CV</span>
                <span>{t("nav.resume")}</span>
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
                <span>{t("nav.whatsapp")}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <nav
        className="journey-station-v2 journey-station-v2--desktop"
        aria-label={t("nav.destinations")}
      >
        <div className="journey-station-v2__heading">
          {/* Legacy Travel Station orbit icon preserved: <span className="journey-station-v2__orbit-icon" aria-hidden="true" /> */}
          <TravelStationSpacecraftIconV2 />
          <span>{t("nav.station")}</span>
          <span className="journey-station-v2__location">
            {isTraveling
              ? t("nav.traveling", { destination: visibleDestination.label })
              : t("nav.docked", { destination: activeDestination.label })}
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
            <small>{t("nav.current")}</small>
            {activeDestination.label}
          </span>
        </span>
        <span className="journey-station-v2__mobile-open">
          {t("nav.station")}
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
          aria-label={t("nav.stationClose")}
        />

        <nav
          id="journey-mobile-station"
          className="journey-station-v2__mobile-sheet"
          aria-label={t("nav.choose")}
        >
          <div className="journey-station-v2__mobile-sheet-heading">
            <div>
              {/* Legacy Travel Station orbit icon preserved: <span className="journey-station-v2__orbit-icon" aria-hidden="true" /> */}
              <TravelStationSpacecraftIconV2 />
              <span>
                <small>{t("nav.navigation")}</small>
                {t("nav.station")}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setStationOpen(false)}
              aria-label={t("nav.stationClose")}
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
                  <span className="journey-station-v2__mobile-number" dir="ltr">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <strong>{destination.label}</strong>
                  </span>
                  <span aria-hidden="true">{isActive ? "●" : isArabic ? "←" : "→"}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
};

export default JourneyNavbarClassicLocalizedV1;
