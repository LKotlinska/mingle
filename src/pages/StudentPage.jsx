import React from "react";
import { Link } from "react-router-dom";

export default function StudentPage() {
  return (
    <div>
      <h1>Välkommen, student</h1>
      <ul>
        <li>
          Registera ditt deltagande <Link to="/">här</Link>
        </li>
        <li>
          <Link to="/match">Match</Link>
        </li>
        <li>
          <Link to="/utmaningar">Utmaningar</Link>
        </li>
        <li>
          <Link to="/company-list">Företags lista</Link>
        </li>
      </ul>

      <Link to="/">Tillbaka till förstasidan</Link>
    </div>
  );
}
