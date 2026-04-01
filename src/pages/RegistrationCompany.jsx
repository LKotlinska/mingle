import React from "react";
import { Link } from "react-router-dom";
import "./RegistrationCompany.css";
import RegisterCompany from "../components/RegisterCompany";

export default function RegistrationPage() {
  return (
    <>
      <Link to="/company">← Hem</Link>
      <main className="registrationPage">
        <div className="registrationSection">
          <h1 className="formHeading">Registrera ditt företag</h1>
          <RegisterCompany/>
        </div>
      </main>
    </>
  );
}
