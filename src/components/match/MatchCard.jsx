import './MatchCard.css'
export default function MatchCard({ fileName, cardFor }) {
    return(
        <figure className="matchCard">
            <img src={`./images/${fileName}.png`} alt={`Profile image for ${cardFor}`}/>
            <figcaption className='cardCaption'>{cardFor}</figcaption>
        </figure>
    )
}