import React from "react";
import { Link } from "react-router-dom";
import "./CompanyPage.css";

export default function CompanyPage() {
  return (
    <main className="companyPage">
      <h1>Company-sida</h1>
      <p>Välkommen, företag!</p>
      <Link to="/register">Registrera ditt företag</Link>
      <Link to="/">Tillbaka</Link>
    </div>
  )
}
