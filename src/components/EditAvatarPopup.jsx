import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = React.useContext(CurrentUserContext);
  const inputRef = React.useRef('');

  //обработчик кнопки Сохранить в форме
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputRef.current.value);
    currentUser.avatar = inputRef.current.value;
  }

  React.useEffect(() => {
    if (!isOpen) return;
    inputRef.current.value = '';
  }, [isOpen]);

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
            required
          />
          <span className="popup__message-error"></span>
        </div>
      </>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
