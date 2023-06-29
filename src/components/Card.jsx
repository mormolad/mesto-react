import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onClickLike, onClickDelete }) {
  //обработка клика по картинке карты
  function handleClick() {
    onCardClick(card);
  }
  // обработчик кнопки удаления карты
  function handleDeleteClick() {
    onClickDelete(card._id);
  }
  // обработчик лайка
  function handleLikeClick() {
    onClickLike(card);
  }

  // подписываемся на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__like-button ${
    card.likes.some((i) => i._id === currentUser._id) &&
    'card__like_state_active'
  }`;

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
        <button
          type="button"
          className={`card__like ${cardLikeButtonClassName}`}
          onClick={handleLikeClick}
        ></button>
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
