import skills from '../data/skills.json'
import traits from '../data/traits.json'
import Badge from './Badge'
import { useForm } from 'react-hook-form';

export default function RegisterForm() {

    const { handleSubmit, register, reset } = useForm();
    const onSubmit = data => {
        fetch('/api/register', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(() => reset()) // Clears form fields after fetch
    }

    return (
        <section>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="code">
                    Ange din kod*
                </label>
                <input 
                    type="text" 
                    name="code" 
                    id="code"
                    minLength={4}
                    maxLength={4}
                    {...register('code', { required: true })}
                />
                <label htmlFor="name">Företag*</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    maxLength={25}
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
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}