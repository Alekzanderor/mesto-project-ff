// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы

// @todo: Функция создания карточки

function createCard(card, userId, handleZoom, handleDelete, handleLike) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikes = cardElement.querySelector(".card__like-counter");

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  const likes = card.likes;

  cardImage.src = card.link;
  cardImage.alt = card.alt || "Не задано";
  cardImage.loading = "lazy";
  cardTitle.textContent = card.name;

  cardLikes.textContent = likes.length;

  checkIsCardLiked(card, cardLikeButton, userId);

  cardImage.addEventListener("click", handleZoom);
  cardLikeButton.addEventListener("click", () =>
    handleLike(cardLikeButton, cardLikes, card._id)
  );
  isCardOwned(card, userId)
    ? cardDeleteButton.addEventListener("click", () =>
        handleDelete(cardElement, card._id)
      )
    : cardDeleteButton.remove();

  return cardElement;
}

// @todo: Функция удаления карточки в бруазере
function discardCard(cardElement) {
  cardElement.remove();
}
function handleDeleteCard(cardElement, cardId) {
  deleteCard(cardId)
    .then(() => discardCard(cardElement))
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

function isCardOwned(card, userId) {
  const owner = card.owner;
  if (owner._id == userId) {
    return true;
  } else {
    return false;
  }
}

function checkIsCardLiked(card, likeButton, userId) {
  if (card.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
}

//Лайк карточки
function handleCardLike(likeButton, likesCounter, cardId) {
  toggleLike(
    cardId,
    likeButton.classList.contains("card__like-button_is-active")
  )
    .then((res) => {
      likesCounter.textContent = res.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

export {
  handleCardLike,
  handleDeleteCard,
  deleteCard,
  createCard,
};

import { toggleLike, deleteCard } from "./api.js";
