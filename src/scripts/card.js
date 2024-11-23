// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardList = document.querySelector(".places__list");
// @todo: Функция создания карточки

function addCard(card) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = card.link;
  cardImage.alt = card.alt || "Не задано";
  cardImage.loading = "lazy";
  cardTitle.textContent = card.name;
  cardLikeButton.id = card._id;

  return cardElement;
}

// @todo: Функция удаления карточки в бруазере
function discardCard(placesItem) {
  placesItem.remove();
}

function handleDeleteCard(placesItem) {
  const likeButton = placesItem.querySelector(".card__like-button");
  const cardId = likeButton.id;
  Promise.all([getUser(), getCards()])
    .then(([userData, cardsData]) => {
      if (cardIsOwned(getCurrentCard(cardsData, cardId), userData._id)) {
        deleteCard(cardId);
        discardCard(placesItem);
      }
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

function getCurrentCard(cards, cardId) {
  const card = cards.find((currentCard) => {
    return currentCard._id == cardId;
  });

  return card;
}

function cardIsOwned(card, userId) {
  const owner = card.owner;
  if (owner._id == userId) {
    return true;
  } else {
    return false;
  }
}

function getLikes(card, cardElement) {
  const likes = card.likes;
  const cardLikes = cardElement.querySelector(".card__like-counter");
  cardLikes.textContent = likes.length;
}

function updateLikes(card, likeButton, addition) {
  const likes = card.likes;
  const cardLikesElement = likeButton.nextElementSibling;
  cardLikesElement.textContent = likes.length + addition;
}

function isCardLiked(card, likeButton, userId) {
  card.likes.forEach((like) => {
    if (like._id == userId) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });
}

function isLiked(cards, likeButton, userId) {
  const cardId = likeButton.id;
  const card = cards.find((currentCard) => {
    return currentCard._id == cardId;
  });

  const likeIds = [];
  card.likes.forEach((like) => {
    likeIds.push(like._id);
  });
  if (likeIds.includes(userId)) {
    likeButton.classList.remove("card__like-button_is-active");
    updateLikes(card, likeButton, -1);
    return true;
  } else {
    likeButton.classList.add("card__like-button_is-active");
    updateLikes(card, likeButton, 1);
    return false;
  }
}

//Лайк карточки
function cardLike(likeButton) {
  const place = likeButton.parentElement.parentElement.parentElement;

  const deleteButton = place.querySelector(".card__delete-button");

  Promise.all([getUser(), getCards()])
    .then(([userData, cardsData]) => {
      toggleLike(likeButton.id, isLiked(cardsData, likeButton, userData._id));
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

function handleCardLike(evt) {
  const clickedElement = evt.target;
  if (clickedElement.classList.contains("card__like-button")) {
    cardLike(clickedElement);
  }
}

export {
  handleCardLike,
  cardLike,
  deleteCard,
  addCard,
  cardList,
  getLikes,
  isCardLiked,
  isLiked,
  handleDeleteCard,
};

import {
  getUser,
  getCards,
  updateUser,
  toggleLike,
  deleteCard,
} from "./api.js";
