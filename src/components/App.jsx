import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmationDelete from './ConfirmationDelete';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [cardDeleteId, setCardDeleteId] = React.useState('');
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsCardDeletePopupOpen(false);
  };

  //запрашиваем данные с сервера для ползователя и для отрисовки карточек
  React.useEffect(() => {
    api
      .getInfoUser()
      .then((data) => {
        setCurentUser(data);
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
  //обработчик клика по картинке в карте
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }
  //обработкик клика по лайку
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //обработка клика по кнопке удаления карточки
  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then(() => {
        setCards(cards.filter((item) => item._id !== id));
        closeAllPopups();
        setCardDeleteId('');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //обработка кнопки Сохранить в форме редоктирования профиля
  function handleUpdateUser(userDate) {
    api
      .setUserData(userDate)
      .then((data) => {
        setCurentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //обработка кнопки Сохранить в форме редоктирования аватара
  function handleUpdateAvatar(url) {
    api
      .setAvatar(url)
      .then((data) => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //обработка кнопки Сохранить в форме добавления места
  function handleAddPlaceSubmit(dataCard) {
    api
      .setNewCadr(dataCard)
      .then((data) => {
        closeAllPopups();
        setCards([data, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={() => {
            setIsEditProfilePopupOpen(true);
          }}
          onAddPlace={() => {
            setIsAddPlacePopupOpen(true);
          }}
          onEditAvatar={() => {
            setIsEditAvatarPopupOpen(true);
          }}
          onConfirmationDelete={(id) => {
            setCardDeleteId(id);
            setIsCardDeletePopupOpen(true);
          }}
          onCardClick={handleCardClick}
          onClickLike={handleCardLike}
          onClickButtonDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ConfirmationDelete
          isOpen={isCardDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          cardId={cardDeleteId}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
