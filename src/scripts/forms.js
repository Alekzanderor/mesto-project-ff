//окно редактирования профиля

const profileTitle = document.querySelector(".profile__title");
//const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const profileJobDescription = document.querySelector(".profile__description");

const profileForm = document.forms["edit-profile"];

const profileFormName = profileForm.name;
const profileFormJobDescription = profileForm.description;

const formNewCard = document.querySelector(".popup_type_new-card");
const formNewCardForm = formNewCard.querySelector(".popup__form");

function setProfileFormValues() {
    profileFormName.value = profileTitle.textContent;
    profileFormJobDescription.value = profileJobDescription.textContent; 
}

function resetNewFormValues() {
  formNewCardForm.reset();
}

function resetNewAvatarFormValues() {
  newAvatarForm.reset();
}

function handleFormSubmit(evt) {
  evt.preventDefault();  
  renderLoading(true, profileForm);
  updateUser(profileFormName.value, profileFormJobDescription.value)
    .then((userData)=>{
      profileTitle.textContent = userData.name;
      profileJobDescription.textContent = userData.about;
      closePopup(evt)
    })  
    .catch((err) =>console.log(err) )// выводим ошибку в консоль
    .finally(()=>renderLoading(false, profileForm))  
  }
  
// окно добавления карточки

const newPlaceForm = document.forms["new-place"];

const newPlaceFormName = newPlaceForm["place-name"];
const newPlaceFormLink = newPlaceForm["link"];

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, newPlaceForm);
  const name = newPlaceFormName.value;
  const link = newPlaceFormLink.value;

  postCard(name, link)  
  .then((card)=>{
    cardList.prepend(createCard(card,card.owner._id,handleCardZoom,handleDeleteCard,handleCardLike))
    closePopup(evt)})
  .catch((err) => console.log(err))// выводим ошибку в консоль
  .finally(()=>renderLoading(false, newPlaceForm))  
}

//Просмотр картинки

const imagePopup = document.querySelector(".popup_type_image");
const image = imagePopup.querySelector(".popup__image");
const text = imagePopup.querySelector(".popup__caption");

function cardZoom(zoomedCard) {
  const parent = zoomedCard.parentElement;
  const zoomedCardText = parent.querySelector(".card__title").textContent;
  const zoomedCardLink = zoomedCard.src;
  const zoomedCardAlt = zoomedCard.alt;

  image.src = zoomedCardLink;
  image.alt = zoomedCardAlt;

  text.textContent = zoomedCardText;
  openPopup(imagePopup);
}

function handleCardZoom(evt) {
  const clickedElement = evt.target;
  if (clickedElement.classList.contains("card__image")) {
    cardZoom(clickedElement);
  }
}

const newAvatarForm = document.forms["update-avatar"];
const formNewAvatarLink = newAvatarForm.querySelector(".popup__input_type_url");

function avatarSubmit() {
  renderLoading(true, newAvatarForm);
  const link = formNewAvatarLink.value;
  updateAvatar(link)
  .then((res) => profileImage.style = `background-image: url(${res.avatar})`)  
  .catch((err) => console.log(err)) // выводим ошибку в консоль
  .finally(()=>renderLoading(false, newAvatarForm))   
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  avatarSubmit();  
  closePopup(evt)
}

function renderLoading(isLoading, form) {
  const formButton = form.querySelector(".popup__button");

  if (isLoading) {
    formButton.textContent = "Сохранение...";
  } else {
    formButton.textContent = "Сохранить";
  }
}

export {
  handleCardZoom,
  handleNewPlaceFormSubmit,
  handleFormSubmit,
  handleAvatarSubmit,
  setProfileFormValues,
  resetNewFormValues,
  resetNewAvatarFormValues,
  profileForm,
  newPlaceForm,
  newAvatarForm,
  profileTitle,
  profileJobDescription,
  profileImage
};
import { closePopup, openPopup } from "./modal.js";
import { createCard,handleDeleteCard,handleCardLike } from "./card";
import { updateUser, postCard, updateAvatar } from "./api";

import {cardList} from "../index.js"
