import React from "react";
import BackLink from "../components/BackLink";
import "./RegistrationCompany.css";
import RegisterCompany from "../components/RegisterCompany";

export default function RegistrationPage() {
  return (
    <>
      <BackLink to="/foretag" />
      <main className="registrationPage">
        <div className="registrationSection">
          <h1 className="formHeading">Registrera ditt företag</h1>
          <RegisterCompany/>
        </div>
      </main>
    </>
  );
}
