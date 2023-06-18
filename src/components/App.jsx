import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
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

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  return (
    <div className="page">
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

      <PopupWithForm title="Вы уверены?" name="delete" buttonText="Удалить?">
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
    </div>
  );
}

export default App;
