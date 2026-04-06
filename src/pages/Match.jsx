import React from "react";
import { Link } from "react-router-dom";
import "./Match.css";
import BackLink from "../components/BackLink";
import MatchingForm from "../components/MatchingForm";

export default function Match() {
  return (
      <main className="registrationPage">
        <div className="registrationSection">
          <h1 className="formHeading">Hitta din match</h1>
           <MatchingForm/>
        </div>
      </main>
  );
}
