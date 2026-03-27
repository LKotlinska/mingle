import skills from '../data/skills.json'
import traits from '../data/traits.json'
import Badge from './Badge'

export default function CompanyFields({ company, register }) {

    return (
        <>
            <label htmlFor="name">Företag*</label>
            <input
                type="text"
                name="name"
                id="name"
                maxLength={25}
                defaultValue={company.name}
                {...register('name', { required: true })}
            />
            <fieldset>
                <legend>
                    Vad söker du för egenskaper hos praktikant?
                </legend>
                <div>
                    Kryssa i top 5
                </div>
                    {traits.data.map(trait => (
                        <Badge
                            name={trait}
                            key={trait}
                            fieldName="traits"
                            register={register}
                        />
                    ))}
            </fieldset>
            <fieldset>
                <legend>
                    Vad söker du för skills hos praktikant?
                </legend>
                <div>
                    Kryssa i top 5
                </div>
                    {skills.data.map(skill => (
                        <Badge
                            name={skill}
                            key={skill}
                            fieldName="skills"
                            register={register}
                        />
                    ))}
            </fieldset>
        </>
    )
}
