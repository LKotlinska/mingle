import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <h1>Välj användartyp</h1>
      <ul>
        <li>
          <Link to="/student">Student</Link>
        </li>
        <li>
          <Link to="/company">Company</Link>
        </li>
      </ul>
    </div>
  );
}
