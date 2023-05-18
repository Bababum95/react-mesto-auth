import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({cardData, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = cardData.owner._id === currentUser._id;
    const isLiked = cardData.likes.some(i => i._id === currentUser._id);

    return (
        <article className="card">
            {isOwn && <button onClick={() => onCardDelete(cardData._id)} className="card__delete"></button>}
            <img className="card__image" src={cardData.link} alt={cardData.name} onClick={() => onCardClick(cardData)}/>
            <div className="card__info">
                <h2 className="card__name-place">{cardData.name}</h2>
                <button type="button" data-like={cardData.likes.length}
                className={`card__like ${isLiked && 'card__like_active'}`}
                onClick={() => onCardLike(cardData)}></button>
            </div>
        </article>
    );
}

export default Card;