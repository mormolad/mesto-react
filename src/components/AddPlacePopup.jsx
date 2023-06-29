import PopupWithForm from './PopupWithForm';
import React from 'react';

function AddPlacePopup({ isOpen, onClose, onAddCard }) {
  //name & link for api
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  //очищаем поля формы при открытии попап
  React.useEffect(() => {
    if (!isOpen) return;
    setName('');
    setLink('');
  }, [isOpen]);

  // обработка названия рартинки
  function handleChangeName(e) {
    setName(e.target.value);
  }
  // обработака поля ссылки на картинку
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddCard({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
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
            onChange={handleChangeName}
            value={name ?? ''}
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
            onChange={handleChangeLink}
            value={link ?? ''}
            required
          />
          <span className="popup__message-error"></span>
        </div>
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
