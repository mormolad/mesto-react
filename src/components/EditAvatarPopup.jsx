import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function EditAvatarPopup(isOpen, onClose, onUpdateAvatar) {
  const currentUser = React.useContext(CurrentUserContext);
  const [avatarURL, setAvatarURL] = React.useState('');
  const inputRef = React.useRef('');
  //обработчик кнопки Сохранить в форме
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateAvatar({
      avatar: avatarURL,
    });
  }

  // обработака поля адрес аватара
  function handleChangeAvatarURL(e) {
    setAvatarURL(inputRef.current.value);
  }

  return (
    <PopupWithForm
      title="Обновть аватар?"
      name="add-new-avatar"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <div className="popup__form-section">
          <input
            ref={inputRef}
            type="url"
            className="popup__field"
            id="input-url-new-avatar"
            name="inputURLAvatar"
            placeholder="URL картинки"
            onChange={handleChangeAvatarURL}
            required
          />
          <span className="popup__message-error"></span>
        </div>
      </>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
