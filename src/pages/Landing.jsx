import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <h1>YRGO x LIA</h1>
      <p>Upplev LIA-event som</p>
      <ul>
        <li>
          <Link to="/student">Student</Link>
        </li>
        <li>
          <Link to="/company">Företag</Link>
        </li>
      </ul>
    </div>
  );
}
