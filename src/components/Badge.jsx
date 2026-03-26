import './Badge.css'

export default function Badge({ name, fieldName, register }){
    return (
        <>
            <input
                type="checkbox"
                className="badge-checkbox"
                id={name}
                value={name}
                {...(register ? register(fieldName) : { name })} // Connects input to the form
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