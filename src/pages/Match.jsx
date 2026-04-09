import "./Match.css";
import BackLink from "../components/BackLink";
import MatchingForm from "../components/MatchingForm";
import MatchFound from "../components/MatchFound";
import { useState } from "react";
import leftBow from "../assets/images/leftbow.png";
import rightBow from "../assets/images/rightbow.png";

export default function Match() {

  const [ matchedCompanies, setMatchedCompanies ] = useState(null)

  return (
    <>
    <BackLink to="/student" />
      { !matchedCompanies && 
        <main className="registrationPage">
          <div className="registrationSection">
            <img className="regBow regBowLeft" src={leftBow} alt="" />
            <img className="regBow regBowRight" src={rightBow} alt="" />
            <MatchingForm
              onMatch={setMatchedCompanies}
            />
          </div>
        </main>
      }
           
    { matchedCompanies && 
      <MatchFound
        companies={matchedCompanies}
        onMatch={setMatchedCompanies}
      />
    }
    </>
  );
}
