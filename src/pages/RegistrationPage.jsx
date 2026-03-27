import React from "react";
import { Link } from "react-router-dom";
import "./RegistrationPage.css";
import RegisterForm from "../components/RegisterForm";

export default function RegistrationPage() {
  return (
    <main className="registrationPage">
      <h1>Registrera ditt deltagande</h1>
      <RegisterForm/>
      <Link to="/student">← Hem</Link>
    </main>
  );
}
