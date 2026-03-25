import React from "react";
import { Link } from "react-router-dom";
import "./RegistrationPage.css";

export default function RegistrationPage() {
  return (
    <div className="registrationPage">
      <h1>Registrera ditt deltagande</h1>
      <ul>
        <li>
          <Link to="/student">Till studentsidan</Link>
        </li>
      </ul>
    </div>
  );
}
