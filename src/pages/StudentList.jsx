import React from "react";
import { Link } from "react-router-dom";

export default function StudentList() {
  return (
    <main style={{ padding: "24px" }}>
      <Link
        to="/company"
        style={{
          fontSize: "36px",
          fontWeight: "bold",
          color: "var(--yrgo-blue)",
          textDecoration: "none",
        }}
      >
        ←{" "}
      </Link>

      <h1 style={{ marginTop: "12px" }}>Studentlista</h1>
      <p>Här kan ni visa alla studenter.</p>
    </main>
  );
}
