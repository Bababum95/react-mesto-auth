function Popup({name, isOpen, onClose, container, children}) {
    return (
        <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`} onClick={onClose}>
            <div className={`popup__${container}`} onClick={e => e.stopPropagation()} >
                <button type="button" className="popup__close" onClick={onClose}></button>
                    {children}
            </div>
        </div>
    );
}

export default Popup;