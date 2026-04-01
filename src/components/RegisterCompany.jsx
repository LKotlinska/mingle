import './RegisterCompany.css'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import CompanyFields from './forms/CompanyFields';
import InlineError from './forms/InlineError';

export default function RegisterCompany() {

    // - register: connects inputs to the form
    // - watch: reads the live value of a field
    const { handleSubmit, register, reset, watch, formState: { errors } } = useForm();

    const [ verified, setVerified ] = useState(false);
    const [ company, setCompany ] = useState(null);
    const [ error, setError ] = useState("");

    // Watches the 'code' input live so verifyCompany can use its current value
    const code = watch('code', '');
    const traits = watch('traits', []);
    const skills = watch('skills', []);

    const onSubmit = data => {
        fetch('/api/register', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(() => {
            // ----------------- SUCCESS MESSAGE HERE
            setVerified(false)
            setCompany(null)
        })
    }

    const verifyCompany = async () => {
        setError("")
        const res = await fetch(`/api/register/${code}`);
        if (!res.ok) {
            const { error } = await res.json()
            setCompany(null)
            setVerified(false)
            setError(error)
            // ----------------- ERROR MESSAGE HERE
            return;
        }

        const company = await res.json();
        setCompany(company)
        setVerified(true)
        // Populates the form with the company's existing data.
        // RHF uses these values to pre-check the matching badge checkboxes
        // against the traits/skills arrays provided here.
        reset({ code, name: company.name, employment: company.employment, traits: company.traits, skills: company.skills })
    }

    return (
        <section>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='formGroup'>
                    <label htmlFor="code" className='formLabel'>
                        Ange din företagskod*
                    </label>
                    <div className='inputGrid'>
                        <input
                            type="text"
                            name="code"
                            id="code"
                            className={(error || errors.code) ? "errorBorder" : ""}
                            placeholder='t.ex. c0de12'
                            minLength={1}
                            maxLength={10}
                            {...register('code', {
                            required: 'Företagskod krävs',
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/,
                                message: 'Koden får bara innehålla bokstäver och siffror'
                            }
                        })}
                        />
                        <button type="button" onClick={verifyCompany}>Verifiera</button>
                    </div>
                    { (error || errors.code) && <InlineError error={error || errors.code?.message}/>}
                </div>

                { verified &&
                    <>
                        <CompanyFields
                            company={company}
                            register={register} // Passed down so CompanyFields uses the same form instance
                            traits={traits}
                            skills={skills}
                            error={error}
                            errors={errors}
                        /> 
                        <button className='btnSubmit' type="submit">Spara</button>
                    </>
                }

            </form>
        </section>
    )
}
