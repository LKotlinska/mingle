import './Badge.css'

export default function Badge({ name, fieldName, register, disabled }){
    return (
        <>
            <input
                type="checkbox"
                className="badge-checkbox"
                id={name}
                value={name}
                disabled={disabled}
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