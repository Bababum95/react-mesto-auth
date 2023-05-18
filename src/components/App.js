import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { checkToken, authorize } from '../utils/auth'
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

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState(null)
  const [currentUser, setCurrentUser] = useState({
    avatar: null,
    name: null,
    about: null
  });
  const handleTokenCheck = () => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      checkToken(token).then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.data.email)
          navigate("/", { replace: true })
        }
      });
    }
  };
  const handleLogin = (e, formValue) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    authorize(formValue)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          setEmail(formValue.email)
          navigate('/', { replace: true });
        }
      })
      .catch(err => console.log(err));
  };
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setSelectedCard({})
  };
  useEffect(() => {
    handleTokenCheck();
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData)
        setCards(initialCards)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.togleLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  };
  function handleUpdateUser(formData) {
    api.editUserInfo(formData)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  };
  function handleUpdateAvatar(avatar) {
    api.changeAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  };
  function handleAddPlaceSubmit(formData) {
    api.addCard(formData)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  };
  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} email={email} />
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
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      </Routes >
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlaceSubmit={handleAddPlaceSubmit} />
      <PopupWithForm name="confirmation" title="Вы уверены?" button="Да">
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
};
export default App;