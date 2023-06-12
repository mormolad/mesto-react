import React from 'react';

function ImagePopup() {
  return (
    <>
      <div className="popup popup_image" id="popup-image">
        <div
          className="popup__content-image"
          id="popup-image__content"
          title="фотография с маста"
        >
          <img
            scr=""
            alt=""
            className="popup__image-popup"
            id="popup-image__image-popup"
          />
          <h3 className="popup__title-image" id="popup-image__title">
            -
          </h3>
          <button
            type="button"
            title="закрыть картинку"
            className="popup__close-popup"
            id="popup-image__close-popup"
          ></button>
        </div>
      </div>
    </>
  );
}

export default ImagePopup;
