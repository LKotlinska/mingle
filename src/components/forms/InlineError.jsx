import './InlineError.css'

export default function InlineError({error}) {
    return(
        <p className="fieldError">
            <span className="material-symbols-outlined errorSymbol" aria-hidden="true">error</span>
            {error}
        </p>
    )
}