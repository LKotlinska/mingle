import React from "react";
import { Link } from "react-router-dom";
import "./StudentPage.css";
import registerIcon from "../assets/images/registrera-icom.png";
import matchIcon from "../assets/images/match-icon.png";
import challengeIcon from "../assets/images/challange-icon.png";
import companyListIcon from "../assets/images/Company-List-icon.png";

export default function StudentPage() {
  return (
    <main className="studentPage">
      <h1 className="title-pill">Välkommen, student</h1>
      <ul className="student-grid">
        <li className="student-card">
          <Link className="student-card-link" to="/registrering">
            <img className="student-card-icon" src={registerIcon} alt="" />
            <span>Registera ditt deltagande här</span>
          </Link>
        </li>
        <li className="student-card">
          <Link className="student-card-link" to="/match">
            <img className="student-card-icon" src={matchIcon} alt="" />
            <span>Match</span>
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
      </ul>

      <Link to="/">← Tillbaka till förstasidan</Link>
    </main>
  );
}
