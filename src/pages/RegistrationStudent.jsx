import React from "react";
import { Link } from "react-router-dom";
import "./RegistrationStudent.css";
import RegisterStudent from "../components/RegisterStudent";
import BackLink from "../components/BackLink";

export default function RegistrationStudent() {
  return (
    <main className="registrationPage">
      <BackLink to="/student" />
      <h1>Registrera ditt deltagande</h1>
      <RegisterStudent />
    </main>
  );
}
