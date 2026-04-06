import React from "react";
import { Link } from "react-router-dom";
import "./RegistrationStudent.css";
import RegisterStudent from "../components/RegisterStudent";
import BackLink from "../components/BackLink";

export default function RegistrationStudent() {
  return (
    <main className="registrationPage">
      <BackLink to="/student" />
      <section className="regForm">
        <h1 className="title">Registrera dig</h1>
        <RegisterStudent />
      </section>
    </main>
  );
}
