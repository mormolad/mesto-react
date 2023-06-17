import React from 'react';

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <>
      <div
        className={`popup popup_image ${
          isOpen === true ? 'popup_enable' : ' '
        }`}
        id="popup-image"
      >
        <div
          className="popup__content-image"
          id="popup-image__content"
          title="фотография с маста"
        >
          <img
            src={card.link}
            alt={card.name}
            className="popup__image-popup"
            id="popup-image__image-popup"
          />
          <h3 className="popup__title-image" id="popup-image__title">
            {card.name}
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
