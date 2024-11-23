//окно редактирования профиля

const profileTitle = document.querySelector(".profile__title");
//const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const profileJobDescription = document.querySelector(".profile__description");

const profileForm = document.forms["edit-profile"];

const profileFormName = profileForm.name;
const profileFormJobDescription = profileForm.description;
const profileFormSubmitButton = profileForm.querySelector(".popup__button");

const formNewCard = document.querySelector(".popup_type_new-card");
const formNewCardForm = formNewCard.querySelector(".popup__form");
const formNewCardSubmitButton = formNewCardForm.querySelector(".popup__button");

function setFormValues() {
  /*Promise.resolve(getUser()).then((userData) => {
    profileFormName.value = userData.name;
    profileFormJobDescription.value = userData.about;
  });*/
  getUser()
  .then((userData) => {
    profileFormName.value = userData.name;
    profileFormJobDescription.value = userData.about;
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); ;
}

function resetFormValues() {
  formNewCardForm.reset();
}

function handleFormSubmit(evt) {
  evt.preventDefault();  
  renderLoading(true, profileForm);
  updateUser(profileFormName.value, profileFormJobDescription.value)
    .then(() =>getUser())
    .then((userData)=>{
      profileTitle.textContent = userData.name;
      profileJobDescription.textContent = userData.about;
    })
    .then(setFormValues())    
    .then(renderLoading(false, profileForm))
    .then(closePopup(evt))
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    }); 
    
  }
  
// окно добавления карточки

const newPlaceForm = document.forms["new-place"];

const newPlaceFormName = newPlaceForm["place-name"];
const newPlaceFormLink = newPlaceForm["link"];
const newPlaceFormAlt = newPlaceForm["place-name"];

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, newPlaceForm);
  const name = newPlaceFormName.value;
  const link = newPlaceFormLink.value;
  const alt = newPlaceFormAlt.value;  

  postCard(name, link, alt)  
  .then((card)=>cardList.prepend(addCard(card)))
  .then(renderLoading(false, newPlaceForm))
  .then(closePopup(evt))
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); 
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
const formNewAvatarSubmitButton = newAvatarForm.querySelector(".popup__button");




function avatarSubmit() {
  renderLoading(true, newAvatarForm);
  const link = formNewAvatarLink.value;
  updateAvatar(link)
  .then(  profileImage.style = `background-image: url(${link})`)
  .then(renderLoading(false, newAvatarForm))
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); 
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  avatarSubmit();  
  closePopup(evt)
}

function renderLoading(isLoading, form) {
  const formButton = form.querySelector(".popup__button");

  if (isLoading) {
    console.log("Сохранение...")
    formButton.textContent = "Сохранение...";
  } else {
    console.log("Сохранение завершено!")
    formButton.textContent = "Сохранить";
  }
}

export {
  handleCardZoom,
  handleNewPlaceFormSubmit,
  handleFormSubmit,
  handleAvatarSubmit,
  setFormValues,
  resetFormValues,
  profileForm,
  newPlaceForm,
  newAvatarForm,
  profileTitle,
  profileJobDescription as profileDescription,
  profileImage
};
import { closePopup, openPopup } from "./modal.js";
import { cardList, addCard,getLikes,isCardLiked } from "./card";
import { getUser, updateUser, postCard, getCards, updateAvatar } from "./api";
