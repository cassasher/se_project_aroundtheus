import Popup from "./Popup.js";

//extend popup - get all of popup + new code
export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._card);
    });
  }

  open(card) {
    this._card = card;
    super.open();
  }
}
