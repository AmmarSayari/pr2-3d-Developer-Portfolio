/* eslint-disable react/prop-types */
import { usePortfolioLocaleV1 } from "./PortfolioLocaleProviderV1";

const LanguageSwitchV1 = ({ disabled = false }) => {
  const { isArabic, toggleLocale, t } = usePortfolioLocaleV1();
  return (
    <button
      type="button"
      className="portfolio-language-switch-v1"
      onClick={toggleLocale}
      disabled={disabled}
      aria-label={t("language.switch")}
      title={t("language.switch")}
    >
      <span lang={isArabic ? "en" : "ar"} dir={isArabic ? "ltr" : "rtl"}>
        {isArabic ? "EN" : "عربي"}
      </span>
    </button>
  );
};

export default LanguageSwitchV1;
