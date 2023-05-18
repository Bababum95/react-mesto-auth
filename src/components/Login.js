import FormAuth from './FormAuth';

const Login = ({handleLogin}) => {
    return (
        <FormAuth title='Вход' buttonName='Войти' handleSubmit={handleLogin} />
    );
}

export default Login;