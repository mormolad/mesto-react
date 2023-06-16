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
      />
      <Footer />
      <PopupWithForm
        title="Редактировать профиль"
        name="edit-user"
        isOpen={isEditProfilePopupOpen}
        closeAllPopups={() => {
          setIsEditProfilePopupOpen(false);
        }}
        children={
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
        }
      />
      <PopupWithForm
        title="Новое место"
        name="add-card"
        isOpen={isAddPlacePopupOpen}
        closeAllPopups={() => {
          setIsAddPlacePopupOpen(false);
        }}
        children={
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
        }
      />
      <PopupWithForm
        title="Обновть аватар?"
        name="add-new-avatar"
        isOpen={isEditAvatarPopupOpen}
        closeAllPopups={() => {
          setIsEditAvatarPopupOpen(false);
        }}
        children={
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
        }
      />

      <PopupWithForm
        title="Вы уверены?"
        name="delete"
        children={
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
        }
      />
      <ImagePopup />
    </div>
  );
}

export default App;
