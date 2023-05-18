import { NavLink, useNavigate } from 'react-router-dom';
import FormAuth from './FormAuth';
import { register } from '../utils/auth'

function Register() {
    const navigate = useNavigate();
    const handleSubmit = (e, formValue) => {
        e.preventDefault();
        register(formValue).then((res) => {
            navigate('/login', { replace: true });
        })
    }
    return (
        <FormAuth title='Регистрация' buttonName='Зарегистрироваться' handleSubmit={handleSubmit} >
            <NavLink className='auth__link' to='/login'>Уже зарегистрированы? Войти</NavLink>
        </FormAuth>
    );
}

export default Register;