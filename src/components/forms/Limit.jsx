import './Limit.css'
export default function Limit({number}) {
    return (
        <p className="limit-selected">
            Välj upp till {number} favoriter
        </p>
    )
}