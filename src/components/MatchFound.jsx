import MatchCard from "./match/MatchCard";

export default function MatchFound({ companies }) {
    return(
        <section>
            <h1>
                Det är en match!
            </h1>
            <div className="matchContainer">
                <div className="cards">
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
                    {companies[0].company.name}
                </h2>
            </div>
        </section>
    )
}