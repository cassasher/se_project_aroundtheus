//info within {} is 'plucking' inputErrorClass off of options
function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector("#" + inputEl.id + "-error");
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
  console.log(inputEl.id);
}

//can also use template literals -- `#${inputEl.id}-error`
function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector("#" + inputEl.id + "-error");
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

// use ! to say if not true
function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  let foundInvalid = false;

  inputEls.forEach((inputEls) => {
    if (!inputEls.validity.valid) {
      foundInvalid = true;
    }
  });

  if (foundInvalid) {
    submitButton.classList.add(inactiveButtonClass);
    return (submitButton.disabled = true);
  }
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function setEventListeners(formEl, options) {
  const { inputSelector, submitButtonSelector } = options; //syntactic sugar - making things easier (object destructoring)
  const inputEls = [...formEl.querySelectorAll(inputSelector)]; //instead of searching all of the forms, we can search just in formEl
  const submitButton = formEl.querySelector(".modal__button");

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

//calling enableValidation
function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)]; // going through all forms
  formEls.forEach((formEl) => {
    // finding them
    formEl.addEventListener("submit", (e) => {
      // setting listener as failsafe
      e.preventDefault();
    });

    // then calling this function, which does most of the work
    setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
