import skills from '../data/skills.json'
import traits from '../data/traits.json'
import Badge from '../components/Badge'
import { useForm } from 'react-hook-form';

export default function RegisterPage() {

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
            <h2>Registrera dig</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="code">
                    Ange din kod*
                </label>
                <input 
                    type="text" 
                    name="code" 
                    id="code"
                    {...register('code')}
                />
                <label htmlFor="name">Företag*</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    {...register('name')}
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