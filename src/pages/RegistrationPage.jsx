import React from "react";
import { Link } from "react-router-dom";
import "./RegistrationPage.css";

export default function RegistrationPage() {
  return (
    <main className="registrationPage">
      <h1>Registrera ditt deltagande</h1>

      <Link to="/student">← Hem</Link>
    </main>
  );
}
