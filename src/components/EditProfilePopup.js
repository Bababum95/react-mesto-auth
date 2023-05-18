import { useState, useContext, useEffect } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm'

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [userInfo, setuserInfo] = useState({
    name: currentUser.name,
    about: currentUser.about
  })
  useEffect(() => {
    setuserInfo({
      name: currentUser.name,
      about: currentUser.about
    })
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(userInfo);
  } 

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" button="Сохранить"
      isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <div className="popup__wraper">
        <input type="text" name="name" value={userInfo.name || ''}
          required className="popup__item popup__name"
          minLength="2" maxLength="40" placeholder="Имя"
          onChange={e => setuserInfo(prev => ({
            ...prev, name: e.target.value
          }))} />
        <span className="popup__item-error name-error"></span>
      </div>
      <div className="popup__wraper">
        <input type="text" name="about" value={userInfo.about || ''}
          required className="popup__item popup__about"
          minLength="2" maxLength="200" placeholder="О себе"
          onChange={e => setuserInfo(prev => ({
            ...prev, about: e.target.value
          }))} />
        <span className="popup__item-error about-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;