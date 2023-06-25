import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';

function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }
  function handleDeleteClick(cardId) {
    api
      .deleteLike(cardId)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <li className="card" key={card._id}>
      <img
        src={card.link}
        alt={card.name}
        className="card__mask-card"
        onClick={handleClick}
      />
      <h2 className="card__mesto">{card.name}</h2>
      <div className="card__likesAndNumber">
        <button type="button" className="card__like"></button>
        <p className="card__numberOfLike">{card.likes.length}</p>
      </div>
      {card.owner._id === currentUser._id && (
        <button
          type="button"
          className="card__del-card"
          onClick={handleDeleteClick}
        ></button>
      )}
    </li>
  );
}

export default Card;
