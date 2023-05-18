import Popup from "./Popup";
import success from '../images/Union.svg'
import failure from '../images/unionX.svg'

function InfoTooltip({ title, onClose }) {
    return (
        <Popup name='info' onClose={onClose} isOpen={title} container='container'>
            {title === 'Вы успешно зарегистрировались!' ? (
                <img className='popup__info-image' src={success} alt="success" />
            ) : (
                <img className='popup__info-image' src={failure} alt="failure" />
            )}
            <p className="popup__info">{title}</p>
        </Popup>
    );
}

export default InfoTooltip;