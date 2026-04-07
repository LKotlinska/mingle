import React from "react";
import { Link } from "react-router-dom";
import "./RegistrationStudent.css";
import RegisterStudent from "../components/RegisterStudent";
import BackLink from "../components/BackLink";
import leftBow from "../assets/images/leftbow.png";
import rightBow from "../assets/images/rightbow.png";

export default function RegistrationStudent() {
  return (
    <main className="registrationPage">
      <BackLink to="/student" />
      <section className="regForm">
        <img className="regBow regBowLeft" src={leftBow} alt="" />
        <img className="regBow regBowRight" src={rightBow} alt="" />
        <h1 className="title">Registrera dig</h1>
        <RegisterStudent />
      </section>
    </main>
  );
}
