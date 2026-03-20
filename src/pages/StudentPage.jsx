import React from "react";
import { Link } from "react-router-dom";

export default function StudentPage() {
  return (
    <div>
      <h1>Student-sida</h1>
      <p>Välkommen, student!</p>
      <Link to="/">Tillbaka</Link>
    </div>
  );
}
