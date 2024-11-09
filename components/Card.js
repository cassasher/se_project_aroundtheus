export default class Card {
  constructor({ name, link }, cardSelector, openPopup) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__name");

    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  // _handleImageClick() {
  //   openPopup(this._previewImageModal);
  //   this._previewCardImage.src = this._link;
  //   this._previewCardImage.alt = this._name;
  //   this._previewDescription.textContent = this._name;
  // }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleImageClick() {
    const previewImageModal = document.querySelector("#preview-image-modal");
    const previewCardImage = document.querySelector(
      "#preview-image-modal .modal__image"
    );
    const previewDescription = document.querySelector(
      "#preview-image-modal .modal__description"
    );

    previewCardImage.src = this._link;
    previewCardImage.alt = this._name;
    previewDescription.textContent = this._name;
    this._openPopup(previewImageModal);
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);

    const cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__name");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
