import { useContext, useEffect } from 'react'
import { useForm } from '../hooks/useForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm'

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const {values, handleChange, setValues} = useForm({
    name: currentUser.name,
    about: currentUser.about
  });
  useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about
    })
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  } 

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" button="Сохранить"
      isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading} >
      <div className="popup__wraper">
        <input type="text" name="name" value={values.name || ''}
          required className="popup__item popup__name"
          minLength="2" maxLength="40" placeholder="Имя"
          onChange={handleChange} />
        <span className="popup__item-error name-error"></span>
      </div>
      <div className="popup__wraper">
        <input type="text" name="about" value={values.about || ''}
          required className="popup__item popup__about"
          minLength="2" maxLength="200" placeholder="О себе"
          onChange={handleChange} />
        <span className="popup__item-error about-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;