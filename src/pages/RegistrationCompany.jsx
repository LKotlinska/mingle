import React from "react";
import BackLink from "../components/BackLink";
import "./RegistrationCompany.css";
import RegisterCompany from "../components/RegisterCompany";
import leftBow from "../assets/images/leftbow.png";
import rightBow from "../assets/images/rightbow.png";

export default function RegistrationPage() {
  return (
    <>
      <BackLink to="/foretag" />
      <main className="registrationPage">
        <div className="registrationSection">
          <img className="regBow regBowLeft" src={leftBow} alt="" />
          <img className="regBow regBowRight" src={rightBow} alt="" />
          <h1 className="formHeading">Registrera ditt företag</h1>
          <RegisterCompany/>
        </div>
      </main>
    </>
  );
}
