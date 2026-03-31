import skills from '../../data/skills.json'
import traits from '../../data/traits.json'
import './CompanyFields.css'
import Badge from './Badge'
import Limit from './Limit'

export default function CompanyFields({ company, register, traits: selectedTraits = [], skills: selectedSkills = [] }) {

    return (
        <>
            <div className='formGroup'>
                <label htmlFor="name" className='formLabel'>Företag*</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    minLength={1}
                    maxLength={25}
                    placeholder='t.ex. Microsoft'
                    defaultValue={company.name}
                    {...register('name', { required: true })}
                />
            </div>

            <fieldset className='formGroup'>
                <legend className='formLabel'>
                    Vilka roller söker ni?*
                </legend>
                <div className='checkboxGroup'>
                    <input
                        type="checkbox"
                        id="webbutvecklare"
                        value="webbutvecklare"
                        {...register('employment', { required: true })}
                    />
                    <label htmlFor='webbutvecklare'>
                        Webbutvecklare
                    </label>
                </div>

                <div className='checkboxGroup'>
                    <input
                        type="checkbox"
                        id="digitaldesigner"
                        value="digitaldesigner"
                        {...register('employment', { required: true })}
                    />
                    <label htmlFor='digitaldesigner'>
                        Digital Designer
                    </label>
                </div>
            </fieldset>

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
                <Limit number={5}/>
                <div className='badges'>
                    {skills.data.map(skill => (
                        <Badge
                            name={skill}
                            key={skill}
                            fieldName="skills"
                            register={register}
                            disabled={selectedSkills.length >= 5 && !selectedSkills.includes(skill)}
                        />
                    ))}
                </div>
            </fieldset>
        </>
    )
}
