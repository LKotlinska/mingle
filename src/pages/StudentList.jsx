import React from "react";
import { Link } from "react-router-dom";
import BackLink from "../components/BackLink";
import "./StudentList.css";

export default function StudentList() {
  return (
    <main>
      <BackLink to="/company" />

      <h1>Studentlista</h1>
      <p>Här kan ni visa alla studenter.</p>
    </main>
  );
}
