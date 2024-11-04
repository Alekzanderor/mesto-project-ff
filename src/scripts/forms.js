//окно редактирования профиля

const profileTitle = document.querySelector(".profile__title");
const profileJobDescription = document.querySelector(".profile__description");

const profileForm = document.forms["edit-profile"];

const profileFormName = profileForm.name;
const profileFormJobDescription = profileForm.description;

function setFormValues() {
  profileFormName.value = profileTitle.textContent;
  profileFormJobDescription.value = profileJobDescription.textContent;
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = profileFormName.value;
  profileJobDescription.textContent = profileFormJobDescription.value;

  closePopup(evt);
}

// окно добавления карточки

const newPlaceForm = document.forms["new-place"];

const newPlaceFormName = newPlaceForm["place-name"];
const newPlaceFormLink = newPlaceForm["link"];
const newPlaceFormAlt = newPlaceForm["place-name"];

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();

  const name = newPlaceFormName.value;
  const link = newPlaceFormLink.value;
  const alt = newPlaceFormAlt.value;
  const newCard = { name, link, alt };

  cardList.prepend(addCard(newCard));

  closePopup(evt);
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

export {
  handleCardZoom,
  handleNewPlaceFormSubmit,
  handleFormSubmit,
  setFormValues,
  profileForm,
  newPlaceForm,
};
import { closePopup, openPopup } from "./modal.js";
import { cardList, addCard } from "./card";
