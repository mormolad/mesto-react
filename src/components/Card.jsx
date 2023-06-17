import React from 'react';

function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }

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
      <button type="button" className="card__del-card"></button>
    </li>
  );
}

export default Card;
