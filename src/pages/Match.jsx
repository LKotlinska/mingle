import "./Match.css";
import BackLink from "../components/BackLink";
import MatchingForm from "../components/MatchingForm";
import MatchFound from "../components/MatchFound";
import { useState } from "react";

export default function Match() {

  const [ matchedCompanies, setMatchedCompanies ] = useState(null)

  return (
    <>
    <BackLink to="/student" />
      { !matchedCompanies && 
        <main className="registrationPage">
          <div className="registrationSection">
            <MatchingForm
              onMatch={setMatchedCompanies}
            />
          </div>
        </main>
      }
           
    { matchedCompanies && 
      <MatchFound
        companies={matchedCompanies}
      />
    }
    </>
  );
}
