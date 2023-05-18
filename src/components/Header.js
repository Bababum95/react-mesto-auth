import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg';


function Header({ loggedIn, setLoggedIn, email }) {
  const navigate = useNavigate();
  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false)
    navigate('/login', {replace: true});
  }
  const [isMenuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header__wraper">
        <img src={logo} className="header__logo" alt="логотип место россия" />
        {loggedIn ? (
          <button
            className={`header__button-menu ${isMenuOpen ? 'header__button-menu_active' : ''}`}
            onClick={() => setMenuOpen(!isMenuOpen)} />
        ) :
          (
            <>
              <NavLink to="/login" className={({ isActive }) => `${isActive ? "header__link_hiden" : "header__link"}`}>Войти</NavLink>
              <NavLink to="/register" className={({ isActive }) => `${isActive ? "header__link_hiden" : "header__link"}`}>Регистрация</NavLink>
            </>
          )}
      </div>
      {loggedIn && (
        <div className={`header__menu ${isMenuOpen ? 'header__menu_open' : ''}`}>
          <p className="header__user">{email}</p>
          <button onClick={signOut} className="header__logout">Выйти</button>
        </div>
      )}
    </header>
  );
}

export default Header;
