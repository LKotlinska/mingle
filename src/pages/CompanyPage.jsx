import React from "react";
import "./StudentPage.css";
import "./CompanyPage.css";
import PageCardGrid from "../components/PageCardGrid";
import regIcon from "../assets/images/reg-icon.png";
import companyListIcon from "../assets/images/Company-List-icon.png";
import starsIcon from "../assets/images/stars.png";
import snakeIcon from "../assets/images/snake42.png";
import snakeBottomIcon from "../assets/images/snake41.png";
import curlIcon from "../assets/images/curl41.png";
import BackLink from "../components/BackLink";

const companyCards = [
  {
    to: "/foretag/registrering",
    icon: regIcon,
    label: "Registrera ditt företag",
  },
  { to: "/student-list", icon: companyListIcon, label: "Studentlista" },
];

export default function CompanyPage() {
  return (
    <main className="studentPage companyPage">
      <BackLink to="/" />
      <div className="student-decor">
        <img className="student-decor-stars" src={starsIcon} alt="" />
        <img className="student-decor-snake" src={snakeIcon} alt="" />
      </div>

      <PageCardGrid items={companyCards} />

      <div className="student-decor-bottom">
        <img
          className="student-decor-snake-bottom"
          src={snakeBottomIcon}
          alt=""
        />
        <img className="student-decor-curl" src={curlIcon} alt="" />
      </div>
    </main>
  );
}
