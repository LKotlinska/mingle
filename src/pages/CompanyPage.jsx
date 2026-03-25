import React from "react";
import { Link } from "react-router-dom";
import "./CompanyPage.modul.css";

export default function CompanyPage() {
  return (
    <div className="companyPage">
      <h1>Company-sida</h1>
      <p>Välkommen, företag!</p>
      <Link to="/student">Tillbaka till studentsidan</Link>
    </div>
  );
}
