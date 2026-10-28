import universityLogo from "../../assets/kau.png";
import "./HomeDegreeInlineV1.css";

const HomeDegreeInlineV1 = () => (
  <div className="home-degree-inline-v1">
    <img src={universityLogo} alt="" width="36" height="44" />
    <p>
      <span className="home-degree-inline-v1__degree">
        Bachelor&apos;s in Information Technology
      </span>
      <span className="home-degree-inline-v1__university">
        King Abdulaziz University
      </span>
    </p>
  </div>
);

export default HomeDegreeInlineV1;
