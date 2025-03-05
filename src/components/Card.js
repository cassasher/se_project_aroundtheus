export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._imageClick = handleImageClick;
    this._id = this._id;
    this.isLiked = this.isLiked;
    this.handleLikeClick = handleImageClick;
    this._handleDeleteClick = handleDeleteCard;
  }

  _getTemplate() {
    const template = document.querySelector(this._cardSelector);

    const cardElement = template.content.querySelector(".card").cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    // Get elements from card
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__name");

    // Add event listeners
    // we can use if/then statements for api integration to use
    // both api and local
    this._likeButton.addEventListener("click", () => {
      if (this._handleLikeClick) {
        this._handleLikeClick(this);
      } else {
        this._handleLikeButton(); // this is original (before api)
      }
    });

    this._deleteButton.addEventListener("click", () => {
      if (this._handleDeleteClick) {
        this._handleDeleteClick(this);
      } else {
        this._handleDeleteCard(); // original
      }
    });

    this._cardImage.addEventListener("click", () => {
      this._imageClick({
        name: this._name,
        link: this._link,
      });
    });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  getView() {
    console.log("getView called");
    this._cardElement = this._getTemplate();

    if (!this._cardElement) {
      console.error("No card element created!");
      return null;
    }

    const cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__name");

    console.log("Setting card content:", {
      link: this._link,
      name: this._name,
    });

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
