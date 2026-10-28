import memeem865 from "../../assets/memeem-865.png";
import { usePortfolioLocaleV1 } from "../../i18n/PortfolioLocaleProviderV1";
import "./ProfileImageV2.css";

// Original portrait and orbit geometry; only the accessible name is localized.
const ProfileImageLocalizedV1 = () => {
  const { t } = usePortfolioLocaleV1();
  return (
    <div className="profile-orbit-v2">
      <div className="profile-orbit-v2__glow" aria-hidden="true" />
      <div className="profile-orbit-v2__ring profile-orbit-v2__ring--wide" aria-hidden="true"><span /></div>
      <div className="profile-orbit-v2__ring profile-orbit-v2__ring--tall" aria-hidden="true"><span /></div>
      <span className="profile-orbit-v2__star profile-orbit-v2__star--one" aria-hidden="true" />
      <span className="profile-orbit-v2__star profile-orbit-v2__star--two" aria-hidden="true" />
      <span className="profile-orbit-v2__star profile-orbit-v2__star--three" aria-hidden="true" />
      <div className="profile-orbit-v2__frame">
        <div className="profile-orbit-v2__lens">
          <img src={memeem865} alt={t("name.full")} className="profile-orbit-v2__image" />
          <div className="profile-orbit-v2__glass" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default ProfileImageLocalizedV1;
