import React from "react";
import { Link } from "react-router-dom";
import "./Match.css";
import BackLink from "../components/BackLink";

export default function Match() {
  return (
    <main className="match-page">
      <BackLink to="/student" />
      <h1 className="title-pill">MATCH</h1>
      <p>Här kommer matchningsflödet för studenter och företag.</p>
    </main>
  );
}
