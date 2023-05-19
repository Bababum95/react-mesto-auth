import { NavLink } from 'react-router-dom';
import FormAuth from './FormAuth';

function Register({ handleRegister }) {
    return (
        <FormAuth title='Регистрация' buttonName='Зарегистрироваться' handleSubmit={handleRegister} >
            <NavLink className='auth__link' to='/login'>Уже зарегистрированы? Войти</NavLink>
        </FormAuth>
    );
}

export default Register;