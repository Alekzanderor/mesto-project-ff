let validationConfig = {};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  const regexp = /[^a-zа-яё\-\ ]/gi;
  inputElement.setCustomValidity("");
  if (!inputElement.validity.valid) {
    if (formElement)
      showInputError(formElement, inputElement, inputElement.validationMessage);
  } else if (regexp.test(inputElement.value) && inputElement.type != "url") {
    inputElement.setCustomValidity(
      "Поле может содержать латинские и кириллические буквы, знаки дефиса и пробелы"
    );
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      //console.log(inputElement.validity.customError);
      //console.log(inputElement.validity.valid);

      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation(config) {
  validationConfig = config;

  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  });
}

function clearValidation(profilePopup) {
  const formElement = profilePopup.querySelector(validationConfig.formSelector);
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  inputList.forEach((inputElement) => {
    inputElement.setCustomValidity("");
    hideInputError(formElement, inputElement);
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    toggleButtonState(inputList, buttonElement);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

export { enableValidation, clearValidation };
