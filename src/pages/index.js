import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Section from "../components/Section.js";
import UserInfo from "../components/Userinfo.js";
import Constants from "../utils/constants.js";
import "../pages/index.css";
import Api from "../components/Api.js";

const constants = new Constants();
const settings = constants.getSettings();

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f8087b3e-aa9a-4812-a9d1-34487ec72ba2",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo(".profile__title", ".profile__description");

// api

let cardSection;
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    console.log("API Response - userData:", userData);
    console.log("API Response - cards:", cards);
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });

    const profileImage = document.querySelector(".profile__image");
    if (userData.avatar) {
      profileImage.src = userData.avatar;
    }

    cardSection = new Section(
      {
        items: cards,
        renderer: (item) => {
          console.log("Rendering card item:", item);
          const card = createCard(item);
          console.log("Card created, adding to section:", card);
          cardSection.addItem(card);
        },
      },
      ".cards__list"
    );

    console.log("CardSection created, rendering items");
    cardSection.renderItems();
  })
  .catch((err) => console.error("Error in Promise.all:", err));
// DOM elements
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

// form validation
const editFormValidator = new FormValidator(settings, profileEditForm);
const addCardFormValidator = new FormValidator(settings, addCardFormElement);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// popup
const newCardPopup = new PopupWithForm("#add-card-modal", (inputValues) => {
  api
    .addCard({
      name: inputValues.title,
      link: inputValues.url,
    })
    .then((cardData) => {
      const card = createCard(cardData);
      cardSection.addItem(card);
      addCardFormValidator.disableButton();
      newCardPopup.close();
    })
    .catch((err) => console.error(err));
});

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (inputValues) => {
    api
      .setUserInfo({
        name: inputValues.title,
        about: inputValues.description,
      })
      .then((res) => {
        userInfo.setUserInfo({
          name: inputValues.title,
          description: inputValues.description,
        });
        profileEditPopup.close();
      })
      .catch((err) => console.error(err));
  }
);

const imagePopup = new PopupWithImage("#preview-image-modal");

let cardToDelete = null; //trying to use this to clear card

const deleteCardPopup = new PopupWithForm(
  "#delete-card-modal",
  (inputValues) => {
    if (!cardToDelete) return;

    api
      .deleteCard(cardToDelete.getId())
      .then(() => {
        cardToDelete.deleteCard();
        deleteCardPopup.close();
        cardToDelete = null;
      })
      .catch((err) => console.error(err));
  }
);
deleteCardPopup.setEventListeners();

function handleDeleteClick(card) {
  cardToDelete = card;
  deleteCardPopup.open();
}

// event listeners
profileEditPopup.setEventListeners();
newCardPopup.setEventListeners();
imagePopup.setEventListeners();

// functions
function handleImageClick(data) {
  imagePopup.open(data);
}

function handleLikeClick(card) {
  const cardId = card.getId();
  const isLiked = card.isLiked();

  if (isLiked) {
    api
      .deleteCardLike(cardId)
      .then((updatedCard) => {
        card.setLikeStatus(updatedCard.isLiked);
      })
      .catch((err) => console.error(err));
  } else {
    api
      .addCardLike(cardId)
      .then((updatedCard) => {
        card.setLikeStatus(updatedCard.isLiked);
      })
      .catch((err) => console.error(err));
  }
}

function handleDeleteClick(card) {
  deleteCardPopup.open(card);
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleLikeClick,
    handleDeleteClick
  );
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
