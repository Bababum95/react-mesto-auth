import Popup from "./Popup";

function ImagePopup({ card, onClose }) {
    return (
        <Popup name='foolscreen-card' isOpen={card.name} onClose={onClose} container='card'>
            <img className="popup__card-image" src={card.link} alt={card.name} />
            <h2 className="popup__card-title">{card.name}</h2>
        </Popup>
    );
}

export default ImagePopup;