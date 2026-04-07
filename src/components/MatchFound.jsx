import MatchCard from "./match/MatchCard";
import { Link } from "react-router-dom";
import "../pages/StudentList.css";
import "./MatchFound.css";

export default function MatchFound({ companies }) {
    const [best, ...rest] = companies;

    return(
        <section className="matchSection">
            <h1>
                Det är en <span className="uppercase">match</span>!
            </h1>
            <div className="matchContainer">
                <div className="cards">
                    <img src="/doodlez/doodle-left.png" alt="" className="doodle doodle--topleft" />
                    <img src="/doodlez/doodle-right.png" alt="" className="doodle doodle--bottomright" />
                    <img src="/doodlez/stars.png" alt="" className="doodle doodle--stars-left" />
                    <img src="/doodlez/stars.png" alt="" className="doodle doodle--stars-right" />
                    <MatchCard
                        fileName={"foretag"}
                        cardFor={"företag"}
                    />
                    <MatchCard
                        fileName={"kandidat"}
                        cardFor={"kandidat"}
                    />
                </div>
                <h2 className="bestMatch">
                    {best.company.name}
                </h2>
            </div>

              
            <div className="student-list-page">
                <div className="student-grid">
                <p className="intro">More matches</p>
                    {rest.map(({ company }) => (
                        <div key={company._id} className="student-card">
                            <div className="student-card-blob" />
                            <div className="student-card-content company-card-content">
                                <div className="student-card-text">
                                    <h3 className="student-name">{company.name}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="matchBtnContainer">
            <Link to="/match">
                <button className='btnSubmit btnUndo' type="button">
                    Ny match
                    <span class="material-symbols-outlined">
                    autorenew
                    </span>
                </button>
            </Link>
            </div>
        </section>
    )
}