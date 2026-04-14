import InlineError from "./InlineError";

export default function EmploymentField({ formLabel, register, errors, required }) {

    return(
        <fieldset className='formGroup'>
            <legend className='formLabel'>
                {formLabel} {required && '*'} 
            </legend>
            <div className='checkboxGroup'>
                <input
                    type="checkbox"
                    id="webbutvecklare"
                    className={errors.employment ? "errorBorder" : ""}
                    value="webbutvecklare"
                    {...register('employment', { required: true })}
                />
                <label className="employName" htmlFor='webbutvecklare'>
                    Webbutvecklare
                </label>
            </div>

            <div className='checkboxGroup'>
                <input
                    type="checkbox"
                    id="digitaldesigner"
                    className={errors.employment ? "errorBorder" : ""}
                    value="digitaldesigner"
                    {...register('employment', { required: true })}
                />
                <label className="employName" htmlFor='digitaldesigner'>
                    Digital Designer
                </label>
            </div>
            { errors.employment && <InlineError error='Minst en roll måste väljas'/>}
        </fieldset>
    )
}