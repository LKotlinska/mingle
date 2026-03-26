import './Badge.css'
export default function Badge({ name }){
    return (
        <>
            <input 
                type="checkbox" 
                className="badge-checkbox"
                name={name} 
                id={name}
            />
            <label 
            htmlFor={name}
            className="badge"
            >
                {name}
            </label>
        </>
    )
}