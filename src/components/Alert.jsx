import './Alert.css'
export default function Alert({alert}) {
    return(
        <p className="alert">
            <span className="material-symbols-outlined alertSymbol" aria-hidden="true">check_circle</span>
            {alert}
        </p>
    )
}