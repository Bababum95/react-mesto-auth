import { NavLink, useNavigate } from 'react-router-dom';
import FormAuth from './FormAuth';
import { register } from '../utils/auth'

function Register({ setInfo }) {
    const navigate = useNavigate();
    const handleSubmit = (e, formValue) => {
        e.preventDefault();
        register(formValue)
            .then((response) => {
                try {
                    if (response.status === 200) {
                        setInfo('Вы успешно зарегистрировались!')
                        navigate('/login', { replace: true });
                    } else {
                        setInfo('Что-то пошло не так!Попробуйте ещё раз.')
                    }
                } catch(err) {
                    console.log(err)
                }
            })
    }
    return (
        <FormAuth title='Регистрация' buttonName='Зарегистрироваться' handleSubmit={handleSubmit} >
            <NavLink className='auth__link' to='/login'>Уже зарегистрированы? Войти</NavLink>
        </FormAuth>
    );
}

export default Register;