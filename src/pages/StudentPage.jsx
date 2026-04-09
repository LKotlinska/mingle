import React from "react";
import "./StudentPage.css";
import BackLink from "../components/BackLink";
import PageCardGrid from "../components/PageCardGrid";
import regIcon from "../assets/images/reg-icon.png";
import matchIcon from "../assets/images/match-icon.png";
import challengeIcon from "../assets/images/challange-icon.png";
import companyListIcon from "../assets/images/Company-List-icon.png";
import starsIcon from "../assets/images/stars.png";
import snakeIcon from "../assets/images/snake42.png";
import snakeBottomIcon from "../assets/images/snake41.png";
import curlIcon from "../assets/images/curl41.png";

const studentCards = [
  { to: "/match", icon: matchIcon, label: "Matcha" },
  { to: "/utmaningar", icon: challengeIcon, label: "Utmaningar" },
  { to: "/foretag-list", icon: companyListIcon, label: "Företags lista" },
  { to: "/student/registrering", icon: regIcon, label: "Anmäl dig" },
];

export default function StudentPage() {
  return (
    <main className="studentPage">
      <BackLink to="/" />
      <div className="student-decor">
        <img className="student-decor-stars" src={starsIcon} alt="" />
        <img className="student-decor-snake" src={snakeIcon} alt="" />
      </div>
      <PageCardGrid items={studentCards} />
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
