import React from "react";
import { Link } from "react-router-dom";
import "./StudentPage.css";
import "./CompanyPage.css";
import regIcon from "../assets/images/reg-icon.png";
import companyListIcon from "../assets/images/Company-List-icon.png";
import starsIcon from "../assets/images/stars.png";
import snakeIcon from "../assets/images/snake42.png";
import snakeBottomIcon from "../assets/images/snake41.png";
import curlIcon from "../assets/images/curl41.png";

export default function CompanyPage() {
  return (
    <main className="studentPage companyPage">
      <Link
        to="/"
        style={{
          fontSize: "36px",
          fontWeight: "bold",
          color: "var(--yrgo-blue)",
        }}
      >
        ←{" "}
      </Link>
      <div className="student-decor">
        <img className="student-decor-stars" src={starsIcon} alt="" />
        <img className="student-decor-snake" src={snakeIcon} alt="" />
      </div>

      <ul className="student-grid">
        <li className="student-card">
          <Link className="student-card-link" to="/register">
            <img className="student-card-icon" src={regIcon} alt="" />
            <span>Registrera ditt företag</span>
          </Link>
        </li>
        <li className="student-card">
          <Link className="student-card-link" to="/student">
            <img className="student-card-icon" src={companyListIcon} alt="" />
            <span>Studentlista</span>
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
