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
                minLength={1}
                maxLength={25}
                defaultValue={company.name}
                {...register('name', { required: true })}
            />
            <fieldset>
                <legend>
                    Vem söker ert företag?*
                </legend>
                <input
                    type="checkbox"
                    id="webbutvecklare"
                    value="webbutvecklare"
                    {...register('employment', { required: true })}
                />
                <label htmlFor='webbutvecklare'>
                    Webbutvecklare
                </label>
                <input
                    type="checkbox"
                    id="digitaldesigner"
                    value="digitaldesigner"
                    {...register('employment', { required: true })}
                />
                <label htmlFor='digitaldesigner'>
                    Digital Designer
                </label>
            </fieldset>
            <fieldset>
                <legend>
                    Vilka egenskaper är viktiga för er hos en praktikant?
                </legend>
                <div>
                   Välj upp till 5 favoriter
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
                    Vilka skills letar ni efter hos praktikanten?
                </legend>
                <div>
                    Välj upp till 5 favoriter
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
