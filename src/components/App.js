import '../index.css';
import Header from './header.js';
import Main from './main.js';
import Footer from './footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={() => {
          document
            .querySelector('#popup-edit-user')
            .classList.add('popup_enable');
        }}
        onAddPlace={() => {
          document
            .querySelector('#popup-add-card')
            .classList.add('popup_enable');
        }}
        onEditAvatar={() => {
          document
            .querySelector('#popup-add-new-avatar')
            .classList.add('popup_enable');
        }}
      />
      <Footer />
      <PopupWithForm
        title="Редактировать профиль"
        name="edit-user"
        children={
          <>
            <div className="popup__form-section">
              <input
                type="text"
                className="popup__field"
                id="input-user-name"
                name="inputUserName"
                minlength="2"
                maxlength="40"
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
                minlength="2"
                maxlength="200"
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
        children={
          <>
            <div className="popup__form-section">
              <input
                type="text"
                className="popup__field"
                id="input-place-name"
                name="inputPlaceName"
                placeholder="Название нового места"
                minlength="2"
                maxlength="30"
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

      <template id="card-item">
        <li className="card">
          <img src="#" alt="" className="card__mask-card" />
          <h2 className="card__mesto">-</h2>
          <div className="card__likesAndNumber">
            <button type="button" className="card__like"></button>
            <p className="card__numberOfLike"></p>
          </div>
          <button type="button" className="card__del-card"></button>
        </li>
      </template>
    </div>
  );
}

export default App;
