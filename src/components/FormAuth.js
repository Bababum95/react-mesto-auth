import { useState } from 'react'

function FormAuth({ title, buttonName, handleSubmit, children }) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    return (
        <div className="auth">
            <h2 className="auth__title">{title}</h2>
            <form className="auth__form" onSubmit={(e) => handleSubmit(e, formValue)} >
                <input className="auth__input" placeholder="Email" type="email" name='email'
                    value={formValue.email} onChange={handleChange} />
                <input className="auth__input" placeholder="Пароль" type="password" name='password'
                    value={formValue.password} onChange={handleChange} />
                <button className="auth__button">{buttonName}</button>
                {children}
            </form>
        </div>
    );
}

export default FormAuth;