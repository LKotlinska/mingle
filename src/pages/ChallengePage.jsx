import { useState } from "react";
import { Link } from "react-router-dom";
import "./ChallengePage.css";
import BackLink from "../components/BackLink";
import challange from "../data/challange.json";
import challengeImage from "../assets/images/challanges-pic.svg";

export default function ChallengePage() {
  const [selectedChallenges, setSelectedChallenges] = useState([]);

  const pickThreeRandomChallenges = () => {
    const items = [...challange.data];

    for (let i = items.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    return items.slice(0, 3);
  };

  const showThreeChallenges = () => {
    setSelectedChallenges(pickThreeRandomChallenges());
  };

  return (
    <main className="challenge-page">
      <BackLink to="/student" />
      <h1>Ge förslag på tre utmaningar</h1>

      <img className="challenge-image" src={challengeImage} alt="Utmaningar" />

      <ul className="challenge-list">
        {selectedChallenges.map((item) => (
          <li key={item} className="challenge-item">
            {item}
          </li>
        ))}
      </ul>

      <button
        className="btnSubmit btnUndo"
        type="button"
        onClick={showThreeChallenges}
      >
        {selectedChallenges.length === 0 ? "Utmaningar" : (<>Nya utmaningar <span className="material-symbols-outlined">autorenew</span></>)}
      </button>
    </main>
  );
}
