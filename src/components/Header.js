import { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ loggedIn, setLoggedIn, email }) {
  const navigate = useNavigate();
  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false)
    navigate('/login', { replace: true });
  }
  const [isMenuOpen, setMenuOpen] = useState(false)
  return (
    <header className="header">
      <div className="header__wraper">
        <img src={logo} className="header__logo" alt="логотип место россия" />
        {loggedIn === null && <div className='header__placeholder' />}
        <Routes>
          <Route path="/" element={
            loggedIn && (<button
              className={`header__button-menu ${isMenuOpen ? 'header__button-menu_active' : ''}`}
              onClick={() => setMenuOpen(!isMenuOpen)} />)} />
          <Route path="/register" element={<Link className="header__link" to="/login">Войти</Link>} />
          <Route path="/login" element={<Link className="header__link" to="/register">Регистрация</Link>} />
        </Routes>
      </div>
      {loggedIn && (
        <div className={`header__menu ${isMenuOpen ? 'header__menu_open' : ''}`}>
          <p className="header__user">{email}</p>
          <button className="header__logout" onClick={signOut}>
            Выйти
          </button>
        </div>
      )}
    </header >
  );
}


export default Header;
