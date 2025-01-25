import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/section.js";
import UserInfo from "../components/userinfo.js";
import Constants from "../utils/constants.js";
import "../pages/index.css";

const constants = new Constants();
const initialCards = constants.getInitialCards();
const settings = constants.getSettings();

const cardData = initialCards[0];

// DOM

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseBtn = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addCardModal = document.querySelector("#add-card-modal");
const addModalCloseBtn = addCardModal.querySelector(".modal__close");
const addNewCardBtn = document.querySelector(".profile__add-button");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const profileEditForm = profileEditModal.querySelector(".modal__form");

const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const previewImageModal = document.querySelector("#preview-image-modal");
const previewCardImage = document.querySelector(
  "#preview-image-modal .modal__image"
);
const previewDescription = document.querySelector(
  "#preview-image-modal .modal__description"
);
const previewCloseButton = document.querySelector(
  "#preview-image-modal .modal__close"
);

const editFormValidator = new FormValidator(settings, profileEditForm);
const addCardFormValidator = new FormValidator(settings, addCardFormElement);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const newCardPopup = new PopupWithForm("#add-card-modal", (inputValues) => {
  const card = createCard({
    name: inputValues.title,
    link: inputValues.url,
  });
  cardSection.addItem(card);
});

const userInfo = new UserInfo(".profile__title", ".profile__description");

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (inputValues) => {
    userInfo.setUserInfo({
      name: inputValues.title,
      description: inputValues.description,
    });
  }
);

const imagePopup = new PopupWithImage("#preview-image-modal");

profileEditPopup.setEventListeners();
newCardPopup.setEventListeners();
imagePopup.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardSection.addItem(card);
    },
  },
  ".cards__list"
);

// Functions

function handleImageClick(data) {
  imagePopup.open(data);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

profileEditBtn.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
  profileEditPopup.open();
});

addNewCardBtn.addEventListener("click", () => {
  newCardPopup.open();
});

cardSection.renderItems();
