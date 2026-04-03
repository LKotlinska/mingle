import skills from '../../data/skills.json'
import traits from '../../data/traits.json'
import './CompanyFields.css'
import Badge from './Badge'
import Limit from './Limit'
import InlineError from './InlineError'
import EmploymentField from './EmploymentField'

export default function CompanyFields({
    errors = {},
    company,
    register,
    watch
 }) {

    const selectedTraits = watch('traits', []);

    return (
        <>
            <div className='formGroup'>
                <label 
                    htmlFor="name" 
                    className='formLabel'>
                    Företag*
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className={errors.name ? "errorBorder" : ""}
                    minLength={1}
                    maxLength={25}
                    placeholder='t.ex. Microsoft'
                    defaultValue={company.name}
                    {...register('name', {
                        required: 'Företagsnamn krävs',
                        pattern: {
                            value: /^[a-zA-ZåäöÅÄÖ0-9\s.,\-&'()!]+$/,
                            message: 'Ogiltiga tecken i företagsnamn'
                        }
                    })}
                />
                { errors.name && <InlineError error={errors.name.message}/>}

            </div>

            <EmploymentField
                formLabel={"Vilka roller söker ni?"}
                register={register}
                errors={errors}
                required={true}
            />

            <fieldset className='formGroup'>
                <legend className='formLabel'>
                    Vilka egenskaper är viktiga för er hos en praktikant?
                </legend>
                <Limit number={5}/>
                <div className='badges'>
                    {traits.data.map(trait => (
                        <Badge
                            name={trait}
                            key={trait}
                            fieldName="traits"
                            register={register}
                            disabled={selectedTraits.length >= 5 && !selectedTraits.includes(trait)}
                        />
                    ))}
                </div>
            </fieldset>
            <fieldset className='formGroup'>
                <legend className='formLabel'>
                    Vilka skills letar ni efter hos praktikanten?
                </legend>
                <div className='badges'>
                    {skills.data.map(skill => (
                        <Badge
                            name={skill}
                            key={skill}
                            fieldName="skills"
                            register={register}
                        />
                    ))}
                </div>
            </fieldset>
        </>
    )
}
