import React from "react";
import { Link } from "react-router-dom";
import BackLink from "../components/BackLink";

export default function CompanyList() {
  return (
    <main>
      <BackLink to="/" />
      <h1 className="title-pill">Företagslista</h1>
      <p>Här kommer listan med företag att visas.</p>
    </main>
  );
}
