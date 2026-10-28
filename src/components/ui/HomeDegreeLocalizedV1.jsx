import universityLogo from "../../assets/kau.png";
import { usePortfolioLocaleV1 } from "../../i18n/PortfolioLocaleProviderV1";
import "./HomeDegreeInlineV1.css";

const HomeDegreeLocalizedV1 = () => {
  const { t } = usePortfolioLocaleV1();
  return (
    <div className="home-degree-inline-v1">
      <img src={universityLogo} alt="" width="36" height="44" />
      <p>
        <span className="home-degree-inline-v1__degree">{t("home.degree")}</span>
        <span className="home-degree-inline-v1__university">{t("home.university")}</span>
      </p>
    </div>
  );
};

export default HomeDegreeLocalizedV1;
