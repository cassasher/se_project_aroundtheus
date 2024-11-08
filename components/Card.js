export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    // Fixed method name spelling
    // Store card elements
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__name");

    // Add event listeners
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton(); // Fixed: add () to call the method
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(); // Fixed method name
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(); // Added image click handler
    });
  }

  _handleDeleteCard() {
    // Fixed method name
    this._cardElement.remove(); // Fixed: add () to call the method
    this._cardElement = null;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active"); // Fixed space in class name
  }

  _handleImageClick() {
    // Add your image preview logic here
    openPopup(previewImageModal);
    previewCardImage.src = this._link;
    previewCardImage.alt = this._name;
    previewDescription.textContent = this._name;
  }

  getView() {
    // Get template
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content // Fixed: content comes before querySelector(".card")
      .cloneNode(true);

    // Set card content
    const cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__name");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    // Set event listeners
    this._setEventListeners();

    // Return the card
    return this._cardElement;
  }
}
