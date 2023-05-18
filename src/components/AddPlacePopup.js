import { useState, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'

const clearValue = {
    name: '',
    link: ''
}

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
    const [card, setCard] = useState(clearValue)
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlaceSubmit(card)
        setCard(clearValue)
    }
    useEffect(() => {
        setCard(clearValue)
      }, [isOpen]);

    return (
        <PopupWithForm name="new-place" title="Новое место" button="Сохранить"
        isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <div className="popup__wraper">
                <input type="text" name="name" required className="popup__item popup__name"
                    placeholder="Название" minLength="2" maxLength="30" value={card.name}
                    onChange={e => setCard(prev => ({
                        ...prev, name: e.target.value
                    }))} />
                <span className="popup__item-error name-error"></span>
            </div>
            <div className="popup__wraper">
                <input type="url" name="link" required className="popup__item popup__link"
                    placeholder="Ссылка на картинку" value={card.link}
                    onChange={e => setCard(prev => ({
                        ...prev, link: e.target.value
                    }))} />
                <span className="popup__item-error link-error"></span>
            </div>
        </PopupWithForm>
    );
}

export default AddPlacePopup;