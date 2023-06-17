import React from 'react';
import api from '../utils/api';
import Card from './Card';
function Main({ onEditProfile, onAddPlace, onEditAvatar }) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInfoUser()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .getCard()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            src={userAvatar}
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
              {userName}
            </h1>
            <p
              className="profile__employment"
              id="profile__employment"
              title="род деятельности"
            >
              {userDescription}
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
            <Card data={card} key={card._id} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
