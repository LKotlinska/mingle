import React from "react";
import { Link } from "react-router-dom";
import "./RegistrationStudent.css";
import RegisterStudent from "../components/RegisterStudent";

export default function RegistrationStudent() {
  return (
    <main className="registrationPage">
      <h1>Registrera ditt deltagande</h1>
      <RegisterStudent />
      <Link to="/student">← Hem</Link>
    </main>
  );
}
