import Popup from "./Popup";

function PopupWithForm({ name, title, isOpen, onClose, button, children, onSubmit, isLoading }) {
    return (
        <Popup name={name} isOpen={isOpen} onClose={onClose} container='container'>
            <h2 className="popup__title">{title}</h2>
            <form name={name} className="popup__form" onSubmit={onSubmit}>
                {children}
                <button type="submit" className={`popup__save ${isLoading && 'loading'}`}>
                    {isLoading? 'Сохранение' : button}
                </button>
            </form>
        </Popup>
    );
}

export default PopupWithForm;