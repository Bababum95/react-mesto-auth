import { useRef, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'

function EditProfilePopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    const avatarInput = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarInput.current.value
        });
    }
    useEffect(() => {
        avatarInput.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm name="change-avatar" title="Обновить аватар" button="Сохранить"
            isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading} >
            <div className="popup__wraper">
                <input type="url" name="avatar" required className="popup__item popup__link"
                    placeholder="Ссылка на картинку"
                    defaultValue=""
                    ref={avatarInput}
                />
                <span className="popup__item-error avatar-error"></span>
            </div>
        </PopupWithForm>
    );
}

export default EditProfilePopup;