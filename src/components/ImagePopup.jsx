import React from 'react';

function ImagePopup({ card, isOpen, onClose }) {
  //стейт переменные для очистки попапа при закрытии
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  //установка слушателя для закрытия попапа по кнопке esc и последущее его удаление при закрытии, управление контентом попапа
  React.useEffect(() => {
    if (!isOpen) {
      setName('');
      setLink('');
      return;
    }
    function clickEsc(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    setName(card.name);
    setLink(card.link);
    document.addEventListener('keydown', clickEsc);
    return () => document.removeEventListener('keydown', clickEsc);
  }, [isOpen, onClose, card]);

  //закрыть попап при клике по оверлею
  function clickOverley(evt) {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  }

  return (
    <>
      <div
        className={`popup popup_image ${
          isOpen === true ? 'popup_enable' : ' '
        }`}
        id="popup-image"
        onClick={clickOverley}
      >
        <div
          className="popup__content-image"
          id="popup-image__content"
          title="фотография с маста"
        >
          <img
            src={link}
            alt={name}
            className="popup__image-popup"
            id="popup-image__image-popup"
          />
          <h3 className="popup__title-image" id="popup-image__title">
            {name}
          </h3>
          <button
            type="button"
            title="закрыть картинку"
            className="popup__close-popup"
            id="popup-image__close-popup"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </>
  );
}

export default ImagePopup;
