import "./pages/index.css"; // добавляем импорт главного файла стилей
import initialCards from "./scripts/cards.js";
import {
  handleCardLike,
  deleteCard,
  addCard,
  cardList,
  getLikes,
  isCardLiked,
  isLiked,
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
  setFormValues,
  resetFormValues,
  profileTitle,
  profileDescription,
  profileImage
} from "./scripts/forms.js";
import{
  enableValidation,
   clearValidation   
} from "./scripts/validation.js";
import {getUser,getCards,updateUser} from "./scripts/api.js";

// @todo: Вывести карточки на страницу
/*
function loadStarterCards(initialCards) {
  initialCards.forEach((initialCard) => {
    cardList.append(addCard(initialCard));
  });
}

loadStarterCards(initialCards);*/

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

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 


profileEditButtonPopup.addEventListener("click", function () {
  openPopup(profileEditPopup);
  setFormValues();
  clearValidation(profileEditPopup); 
});

profileAddButtonPopup.addEventListener("click", function () {
  openPopup(profileAddPopup);
  resetFormValues();
  clearValidation(profileAddPopup);
});

profileEditAvatar.addEventListener("click", function () {
  openPopup(profileEditAvatarPopup);
  resetFormValues();
  clearValidation(profileEditAvatarPopup); 
});

cardList.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card__delete-button")) {
    const placesItem = evt.target.closest(".places__item");
    handleDeleteCard(placesItem);
  }
});

cardList.addEventListener("click", handleCardLike);
cardList.addEventListener("click", handleCardZoom);

profileForm.addEventListener("submit", handleFormSubmit);
newPlaceForm.addEventListener("submit", handleNewPlaceFormSubmit);

newAvatarForm.addEventListener("submit", handleAvatarSubmit);



Promise.all([getUser(), getCards()])
  .then(([userData, cardsData]) => {
    // Загрузка инфы о пользователе с сервера
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    //profileImage.src = userData.avatar;
    profileImage.style = `background-image: url(${userData.avatar})`;    


    // Загрузка карточек с сервера
    cardsData.forEach((card) => {
      cardList.append(addCard(card));
      const likeButton = cardList.lastChild.querySelector('.card__like-button')
      getLikes(card,cardList.lastChild);
      isCardLiked(card,likeButton,userData._id);      
    })

  
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });  

  
  
