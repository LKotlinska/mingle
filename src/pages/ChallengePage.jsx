import React from "react";
import { Link } from "react-router-dom";
import "./ChallengePage.css";

export default function ChallengePage() {
  return (
    <main className="challenge-page">
      <h1>UTMANINGAR</h1>
      <p>Här kommer listan med utmaningar.</p>
      <Link to="/student">← Hem</Link>
    </main>
  );
}
