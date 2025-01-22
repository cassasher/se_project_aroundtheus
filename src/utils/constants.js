export default class Constants {
  constructor() {
    this.initialCards = [
      {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
      },
      {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
      },
      {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
      },
      {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
      },
      {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
      },
      {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
      },
    ];

    this.settings = {
      formSelector: ".modal__form",
      inputSelector: ".modal__input",
      submitButtonSelector: ".modal__button",
      inactiveButtonClass: "modal__button_disabled",
      inputErrorClass: "modal__input_type_error",
      errorClass: "modal__error_visible",
    };
  }

  getInitialCards() {
    return this.initialCards;
  }

  getSettings() {
    return this.settings;
  }
}
