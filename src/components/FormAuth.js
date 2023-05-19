import { useForm } from '../hooks/useForm'

function FormAuth({ title, buttonName, handleSubmit, children }) {
    const {values, handleChange} = useForm({
        email: '',
        password: ''
    })
    return (
        <div className="auth">
            <h2 className="auth__title">{title}</h2>
            <form className="auth__form" onSubmit={(e) => handleSubmit(e, values)} >
                <input className="auth__input" placeholder="Email" type="email" name='email'
                    value={values.email} onChange={handleChange} />
                <input className="auth__input" placeholder="Пароль" type="password" name='password'
                    value={values.password} onChange={handleChange} />
                <button className="auth__button">{buttonName}</button>
                {children}
            </form>
        </div>
    );
}

export default FormAuth;