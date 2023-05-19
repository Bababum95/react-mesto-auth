import { useEffect } from 'react'
import { useForm } from '../hooks/useForm'
import PopupWithForm from './PopupWithForm'

const clearValue = {
    name: '',
    link: ''
}

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit, isLoading }) {
    const {values, handleChange, setValues} = useForm(clearValue);
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlaceSubmit(values)
    }
    useEffect(() => {
        setValues(clearValue)
      }, [isOpen]);

    return (
        <PopupWithForm name="new-place" title="Новое место" button="Сохранить"
        isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading} >
            <div className="popup__wraper">
                <input type="text" name="name" required className="popup__item popup__name"
                    placeholder="Название" minLength="2" maxLength="30" value={values.name}
                    onChange={handleChange} />
                <span className="popup__item-error name-error"></span>
            </div>
            <div className="popup__wraper">
                <input type="url" name="link" required className="popup__item popup__link"
                    placeholder="Ссылка на картинку" value={values.link}
                    onChange={handleChange} />
                <span className="popup__item-error link-error"></span>
            </div>
        </PopupWithForm>
    );
}

export default AddPlacePopup;