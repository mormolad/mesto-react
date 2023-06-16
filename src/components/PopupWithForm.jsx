import React from 'react';

function PopupWithForm({ title, name, isOpen, closeAllPopups, children }) {
  return (
    <div
      className={`popup popup_${name} ${
        isOpen === true ? 'popup_enable' : ' '
      }`}
      id={`popup-${name}`}
      title="модальное окно редактирования"
    >
      <form
        className={`popup__content popup__content_${name}`}
        name="form-popup"
        id={`content-popup-${name}`}
        noValidate
      >
        <h3 className="popup__title" id={`title-popup-${name}`}>
          {title}
        </h3>
        {children}
        <button
          type="submit"
          title="сохранить информацию"
          className="popup__submit"
          id="button-submit-popup-edit-user"
        >
          Сохранить
        </button>
        <button
          type="button"
          title="закрыть модальное окно"
          className="popup__close-popup"
          id="button-close-popup-edit-user"
          onClick={closeAllPopups}
        ></button>
      </form>
    </div>
  );
}

export default PopupWithForm;
