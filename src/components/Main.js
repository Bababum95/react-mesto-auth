import React from 'react'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main>
      <section className="profile">
        <div className="profile__card">
          <div className="profile__avatar" onClick={onEditAvatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="profile__edit" onClick={onEditProfile}></button>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add" onClick={onAddPlace}></button>
      </section>
      <section className="grid-zona">
        {cards.map((card) => 
          <Card key={card._id}
          cardData={card}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete} />
        )}
      </section>
    </main>
  );
}

export default Main;