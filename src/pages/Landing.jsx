import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import yrgoIcon from "../assets/images/Y.png";
import xIcon from "../assets/images/X.png";
import liaIcon from "../assets/images/LIA.png";
import landpagePic from "../assets/images/landpagePic.png";

export default function Landing() {
  return (
    <div className="landing-container">
      <div className="cloud-overlay"></div>

      <div className="header-logos">
        <img src={yrgoIcon} alt="YRGO" className="logo" />
        <img src={xIcon} alt="x" className="logo logo--x" />
        <img src={liaIcon} alt="LIA" className="logo" />
      </div>

      <img
        src={landpagePic}
        alt="Landningsbild"
        className="landing-main-image"
      />

      <div className="landing-content">
        <h1>Upplev LIA-event som:</h1>

        <div className="buttons-container">
          <Link to="/foretag" className="btn btn-red">
            Företag
          </Link>
          <Link to="/student" className="btn btn-navy">
            Student
          </Link>
        </div>
      </div>
    </div>
  );
}
