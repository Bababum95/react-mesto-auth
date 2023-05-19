import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { checkToken, authorize, register } from '../utils/auth'
import ProtectedRouteElement from './ProtectedRoute.js';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login.js';
import Register from './Register.js';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Preloader from './Preloader.js';

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(null);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [info, setInfo] = useState(null);
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState(null)
  const [currentUser, setCurrentUser] = useState({
    avatar: null,
    name: null,
    about: null
  });
  const handleTokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token).then((res) => {
        setLoggedIn(true);
        setEmail(res.data.email)
        navigate("/", { replace: true })
      }).catch(console.error);
    } else {
      setLoggedIn(false);
    }
  };
  const handleLogin = (e, formValue) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    authorize(formValue)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        setEmail(formValue.email)
        navigate('/', { replace: true });
      }).catch((err) => {
        setInfo('Что-то пошло не так!Попробуйте ещё раз.')
        console.log(`Ошибка: ${err}`)
      })
  };
  const handleRegister = (e, formValue) => {
    e.preventDefault();
    register(formValue)
      .then(() => {
        setInfo('Вы успешно зарегистрировались!')
        navigate('/login', { replace: true });
      })
      .catch((err) => {
        setInfo('Что-то пошло не так!Попробуйте ещё раз.')
        console.log(err)
      })
  }
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setInfo(null)
    setSelectedCard({})
  };

  useEffect(() => {
    handleTokenCheck();
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData)
        setCards(initialCards)
      })
      .catch(console.error)
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.togleLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(console.error)
  };

  function handleUpdateUser(formData) {
    setIsLoading(true)
    api.editUserInfo(formData)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  };
  function handleUpdateAvatar(avatar) {
    setIsLoading(true)
    api.changeAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  };
  function handleAddPlaceSubmit(formData) {
    setIsLoading(true)
    api.addCard(formData)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  };
  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
      })
      .catch(console.error)
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} email={email} />
      {loggedIn === null ? (
        <Preloader />
      ) : (
        <Routes>
          <Route path="/" element={
            <ProtectedRouteElement
              element={Main}
              loggedIn={loggedIn}
              onEditProfile={() => setEditProfilePopupOpen(true)}
              onAddPlace={() => setAddPlacePopupOpen(true)}
              onEditAvatar={() => setEditAvatarPopupOpen(true)}
              onCardClick={setSelectedCard}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />} />
          <Route path="/register" element={<Register handleRegister={handleRegister} />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        </Routes >
      )}
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading} />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading} />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlaceSubmit={handleAddPlaceSubmit}
        isLoading={isLoading} />
      <PopupWithForm name="confirmation" title="Вы уверены?" button="Да">
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip title={info} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
};
export default App;