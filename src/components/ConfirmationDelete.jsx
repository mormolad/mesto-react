import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmationDelete({ isOpen, onClose, onCardDelete, cardId }) {
  //обработчик кнопки Удалить в форме
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onCardDelete(cardId);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete"
      buttonText="Удалить?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default ConfirmationDelete;
