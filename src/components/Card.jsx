import React from 'react';

function Card(card) {
  console.log(card.data);
  return (
    <li className="card" key={card.data._id}>
      <img
        src={card.data.link}
        alt={card.data.name}
        className="card__mask-card"
      />
      <h2 className="card__mesto">{card.data.name}</h2>
      <div className="card__likesAndNumber">
        <button type="button" className="card__like"></button>
        <p className="card__numberOfLike">{card.data.likes.length}</p>
      </div>
      <button type="button" className="card__del-card"></button>
    </li>
  );
}

export default Card;
