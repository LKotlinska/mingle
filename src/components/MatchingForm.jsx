
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import traits from '../data/traits.json'
import skills from '../data/skills.json'
import Badge from './forms/Badge';
import Limit from './forms/Limit';
import EmploymentField from './forms/EmploymentField';
import SearchField from './SearchField';


export default function MatchingForm( { onMatch } ) {

    const [traitSearch, setTraitSearch] = useState('');
    const [skillSearch, setSkillSearch] = useState('');

    const { handleSubmit, register, formState: { errors }, watch } = useForm();
    const selectedTraits = watch('traits', []);

    const filteredTraits = traits.data.filter(t => t.toLowerCase().includes(traitSearch.toLowerCase()));
    const filteredSkills = skills.data.filter(s => s.toLowerCase().includes(skillSearch.toLowerCase()));

    const onSubmit = async data => {
        const res = await fetch('/api/match', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const result = await res.json();
        // Set matched companies so Match.jsx can receive them
        onMatch(result)
    }
    return(
        <section>
            <h1 className="formHeading">Hitta din match</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <EmploymentField
                    formLabel={"Vilken utbildning går du?"}
                    register={register}
                    errors={errors}
                    required={true}
                />
                <fieldset className='formGroup'>
                    <legend className='formLabel'>
                        Välj dina egenskaper *
                    </legend>
                    <div className='searchGrid'>
                        <Limit number={5}/>
                        <SearchField
                            value={traitSearch}
                            onChange={e => setTraitSearch(e.target.value)}
                            placeholder="Sök egenskaper..."
                            ariaLabel="Sök egenskaper"
                        />
                    </div>
                    <div className='badges'>
                        {filteredTraits.map(trait => (
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
                        Välj dina skills *
                    </legend>
                    <div className='searchSkills'>
                        <SearchField
                            value={skillSearch}
                            onChange={e => setSkillSearch(e.target.value)}
                            placeholder="Sök skills..."
                            ariaLabel="Sök skills"
                        />
                    </div>
                    <div className='badges'>
                        {filteredSkills.map(skill => (
                            <Badge
                                name={skill}
                                key={skill}
                                fieldName="skills"
                                register={register}
                            />
                        ))}
                    </div>
                </fieldset>
                <div className='formButtonContainer'>
                    <div></div>
                    <button className="btnSubmit" type="submit">Matcha</button>
                </div>
            </form>
        </section>
    )
}