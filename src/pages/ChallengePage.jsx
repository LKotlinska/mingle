import { useState } from "react";
import "./ChallengePage.css";
import BackLink from "../components/BackLink";
import challange from "../data/challange.json";
import challengeImage from "../assets/images/challanges-pic.png";

export default function ChallengePage() {
  const [selectedChallenges, setSelectedChallenges] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const pickThreeRandomChallenges = () => {
    const items = [...challange.data];

    for (let i = items.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    return items.slice(0, 3);
  };

  const showThreeChallenges = () => {
    if (isRefreshing) {
      return;
    }

    setIsRefreshing(true);

    window.setTimeout(() => {
      setSelectedChallenges(pickThreeRandomChallenges());
      setIsRefreshing(false);
    }, 1500);
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
        disabled={isRefreshing}
        onClick={showThreeChallenges}
      >
        {selectedChallenges.length === 0 ? (
          "Utmaningar"
        ) : (
          <>
            Nya utmaningar
            <span
              className={`material-symbols-outlined refresh-icon ${
                isRefreshing ? "refresh-icon--spinning" : ""
              }`}
              aria-hidden="true"
            >
              autorenew
            </span>
          </>
        )}
      </button>
    </main>
  );
}
