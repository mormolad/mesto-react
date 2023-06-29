import React from 'react';

import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onConfirmationDelete,
  onCardClick,
  onClickLike,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section
        className="profile"
        title="коротко о пользователе: аватарка, имя, род деятельности"
      >
        <div className="profile__block-with-avatar">
          <div
            className="profile__overlay"
            id="profile__edit-avatar"
            onClick={onEditAvatar}
          ></div>
          <img
            src={currentUser.avatar}
            alt="фото пользователя"
            className="profile__avatar"
          />
        </div>
        <div className="profile__edit">
          <div className="profile__info">
            <h1
              className="profile__username"
              id="profile__username"
              title="Имя пользователя"
            >
              {currentUser.name}
            </h1>
            <p
              className="profile__employment"
              id="profile__employment"
              title="род деятельности"
            >
              {currentUser.about}
            </p>
          </div>
          <button
            type="button"
            title="кнопка редактирования профиля"
            className="profile__edit-button"
            id="profile__edit-button"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          type="button"
          className="profile__add-button"
          id="profile__add-button"
          title="кнопка добавления мест"
          onClick={onAddPlace}
        ></button>
      </section>
      <section>
        <ul className="cards">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onClickLike={onClickLike}
              onClickDelete={onConfirmationDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
