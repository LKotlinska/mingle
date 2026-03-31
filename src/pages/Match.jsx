import React from "react";
import { Link } from "react-router-dom";
import "./Match.css";

export default function Match() {
  return (
    <main className="match-page">
      <h1 className="title-pill">MATCH</h1>
      <p>Här kommer matchningsflödet för studenter och företag.</p>
      <Link to="/student">← Hem</Link>
    </main>
  );
}
