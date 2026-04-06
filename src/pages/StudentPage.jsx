import React from "react";
import { Link } from "react-router-dom";
import "./StudentPage.css";
import BackLink from "../components/BackLink";
import regIcon from "../assets/images/reg-icon.png";
import matchIcon from "../assets/images/match-icon.png";
import challengeIcon from "../assets/images/challange-icon.png";
import companyListIcon from "../assets/images/Company-List-icon.png";
import starsIcon from "../assets/images/stars.png";
import snakeIcon from "../assets/images/snake42.png";
import snakeBottomIcon from "../assets/images/snake41.png";
import curlIcon from "../assets/images/curl41.png";

export default function StudentPage() {
  return (
    <main className="studentPage">
      <BackLink to="/" />
      <div className="student-decor">
        <img className="student-decor-stars" src={starsIcon} alt="" />
        <img className="student-decor-snake" src={snakeIcon} alt="" />
      </div>
      <ul className="student-grid">
        <li className="student-card">
          <Link className="student-card-link" to="/match">
            <img className="student-card-icon" src={matchIcon} alt="" />
            <span>Matcha</span>
          </Link>
        </li>
        <li className="student-card">
          <Link className="student-card-link" to="/utmaningar">
            <img className="student-card-icon" src={challengeIcon} alt="" />
            <span>Utmaningar</span>
          </Link>
        </li>
        <li className="student-card">
          <Link className="student-card-link" to="/company-list">
            <img className="student-card-icon" src={companyListIcon} alt="" />
            <span>Företags lista</span>
          </Link>
        </li>
        <li className="student-card">
          <Link className="student-card-link" to="/student/registrering">
            <img className="student-card-icon" src={regIcon} alt="" />
            <span>Anmäl dig</span>
          </Link>
        </li>
      </ul>
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
