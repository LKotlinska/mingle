import React from "react";
import { Link } from "react-router-dom";

export default function StudentPage() {
  return (
    <div>
      <h1>Välkommen, student</h1>
      <p>
        Registera dit deltagande <Link to="/">här</Link>
      </p>
      <Link to="/">Tillbaka</Link>
    </div>
  );
}
