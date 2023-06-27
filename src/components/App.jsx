import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CollectionCardsContext } from '../contexts/CollectionCardsContext';
import React from 'react';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState([
    false,
  ]);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState([false]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState([
    false,
  ]);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState([false]);
  const [selectedCard, setSelectedCard] = React.useState([]);
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  };
  const [currentUser, setCurentUser] = React.useState([]);
  const [collectionCards, setCollectionCards] = React.useState([]);
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
        setCollectionCards(data);
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
        setCollectionCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //обработка клика по кнопке удаления карточки
  function handleCardDelete({ _id }) {
    api
      .deleteCard(_id)
      .then(() => {
        console.log(collectionCards);
        setCollectionCards(collectionCards.filter((item) => item._id !== _id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CollectionCardsContext.Provider value={collectionCards}>
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
            onCardClick={handleCardClick}
            onClickLike={handleCardLike}
            onClickDelete={handleCardDelete}
          />
          <Footer />
          <PopupWithForm
            title="Редактировать профиль"
            name="edit-user"
            buttonText="Сохранить"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          >
            <>
              <div className="popup__form-section">
                <input
                  type="text"
                  className="popup__field"
                  id="input-user-name"
                  name="inputUserName"
                  minLength="2"
                  maxLength="40"
                  placeholder="Имя автора"
                  required
                />
                <span className="popup__message-error"></span>
              </div>
              <div className="popup__form-section">
                <input
                  type="text"
                  className="popup__field"
                  id="input-user-employment"
                  name="inputUserEmployment"
                  minLength="2"
                  maxLength="200"
                  placeholder="Род деятельности"
                  required
                />
                <span className="popup__message-error"></span>
              </div>
            </>
          </PopupWithForm>
          <PopupWithForm
            title="Новое место"
            name="add-card"
            buttonText="Сохранить"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          >
            <>
              <div className="popup__form-section">
                <input
                  type="text"
                  className="popup__field"
                  id="input-place-name"
                  name="inputPlaceName"
                  placeholder="Название нового места"
                  minLength="2"
                  maxLength="30"
                  required
                />
                <span className="popup__message-error"></span>
              </div>
              <div className="popup__form-section">
                <input
                  type="url"
                  className="popup__field"
                  id="input-url-image-place"
                  name="inputURLImage"
                  placeholder="URL картинки"
                  required
                />
                <span className="popup__message-error"></span>
              </div>
            </>
          </PopupWithForm>
          <PopupWithForm
            title="Обновть аватар?"
            name="add-new-avatar"
            buttonText="Сохранить"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
          >
            <>
              <div className="popup__form-section">
                <input
                  type="url"
                  className="popup__field"
                  id="input-url-new-avatar"
                  name="inputURLAvatar"
                  placeholder="URL картинки"
                  required
                />
                <span className="popup__message-error"></span>
              </div>
            </>
          </PopupWithForm>
          <PopupWithForm
            title="Вы уверены?"
            name="delete"
            buttonText="Удалить?"
          >
            <>
              <div className="popup__form-section">
                <input
                  type="url"
                  className="popup__field"
                  id="input-url-new-avatar"
                  name="inputURLAvatar"
                  placeholder="URL картинки"
                  required
                />
                <span className="popup__message-error"></span>
              </div>
            </>
          </PopupWithForm>
          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
        </CollectionCardsContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
