import "./pages/index.css"; // добавляем импорт главного файла стилей
import initialCards from "./scripts/cards.js";
import {
  handleCardLike,
  createCard,
  handleDeleteCard
} from "./scripts/card.js";
import { openPopup } from "./scripts/modal.js";
import {
  handleCardZoom,
  handleNewPlaceFormSubmit,
  handleFormSubmit,
  handleAvatarSubmit,
  profileForm,
  newPlaceForm,
  newAvatarForm,
  setProfileFormValues,
  resetNewFormValues,
  resetNewAvatarFormValues,
  profileTitle,
  profileJobDescription,
  profileImage
} from "./scripts/forms.js";
import{
  enableValidation,
   clearValidation   
} from "./scripts/validation.js";
import {getUser,getCards} from "./scripts/api.js";

export {cardList};

const cardList = document.querySelector(".places__list");

const allPopups = document.querySelectorAll(".popup");

allPopups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

const profileEditButtonPopup = document.querySelector(".profile__edit-button");
const profileAddButtonPopup = document.querySelector(".profile__add-button");
const profileEditAvatar = document.querySelector(".profile__image");
const profileEditPopup = document.querySelector(".popup_type_edit");
const profileAddPopup = document.querySelector(".popup_type_new-card");
const profileEditAvatarPopup = document.querySelector(".popup_type_avatar");

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(config); 


profileEditButtonPopup.addEventListener("click", function () {
  openPopup(profileEditPopup);
  setProfileFormValues();
  clearValidation(profileForm,config); 
});

profileAddButtonPopup.addEventListener("click", function () {
  openPopup(profileAddPopup);
  resetNewFormValues();
  clearValidation(newPlaceForm,config);
});

profileEditAvatar.addEventListener("click", function () {
  openPopup(profileEditAvatarPopup);
  resetNewAvatarFormValues();
  clearValidation(newAvatarForm,config); 
  
});


profileForm.addEventListener("submit", handleFormSubmit);
newPlaceForm.addEventListener("submit", handleNewPlaceFormSubmit);

newAvatarForm.addEventListener("submit", handleAvatarSubmit);



Promise.all([getUser(), getCards()])
  .then(([userData, cardsData]) => {
    // Загрузка инфы о пользователе с сервера
    profileTitle.textContent = userData.name;
    profileJobDescription.textContent = userData.about;
    //profileImage.src = userData.avatar;
    profileImage.style = `background-image: url(${userData.avatar})`;    

    // Загрузка карточек с сервера
    cardsData.forEach((card) => {
      cardList.append(createCard(card,userData._id,handleCardZoom,handleDeleteCard,handleCardLike));      
    })

  
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });  

  
  
