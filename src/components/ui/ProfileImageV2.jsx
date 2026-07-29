import memeem865 from "../../assets/memeem-865.png";

import "./ProfileImageV2.css";

const ProfileImageV2 = () => {
  return (
    <div className="profile-orbit-v2">
      <div className="profile-orbit-v2__glow" aria-hidden="true" />

      <div
        className="profile-orbit-v2__ring profile-orbit-v2__ring--wide"
        aria-hidden="true"
      >
        <span />
      </div>
      <div
        className="profile-orbit-v2__ring profile-orbit-v2__ring--tall"
        aria-hidden="true"
      >
        <span />
      </div>

      <span
        className="profile-orbit-v2__star profile-orbit-v2__star--one"
        aria-hidden="true"
      />
      <span
        className="profile-orbit-v2__star profile-orbit-v2__star--two"
        aria-hidden="true"
      />
      <span
        className="profile-orbit-v2__star profile-orbit-v2__star--three"
        aria-hidden="true"
      />

      <div className="profile-orbit-v2__frame">
        <div className="profile-orbit-v2__lens">
          <img
            src={memeem865}
            alt="Ammar Al-sayari"
            className="profile-orbit-v2__image"
          />
          <div className="profile-orbit-v2__glass" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default ProfileImageV2;
