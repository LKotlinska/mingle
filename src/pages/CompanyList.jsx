import React from "react";
import { Link } from "react-router-dom";

export default function CompanyList() {
  return (
    <main>
      <h1>Företagslista</h1>
      <p>Här kommer listan med företag att visas.</p>
      <Link to="/student">← Hem</Link>
    </main>
  );
}
