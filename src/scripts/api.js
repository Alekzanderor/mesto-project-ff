export {
  getUser,
  getCards,
  updateUser,
  postCard,
  toggleLike,
  deleteCard,
  updateAvatar,
};

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-26",
  headers: {
    authorization: "2a320ddc-d2b3-4e8a-b7e5-1e313423461f",
    "Content-Type": "application/json",
  },
};

//инфа о юзере
function getUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
}

//Загружаем карточки с сервера
function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
}

function updateUser(userName, userAbout) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout,
    }),
  }).then(handleResponse);
}

function postCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(handleResponse);
}

function handleResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

function toggleLike(cardID, isLiked) {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: config.headers,
  }).then(handleResponse);
}

const deleteCard = (cardID) => {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

const updateAvatar = (imgLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: imgLink,
    }),
  }).then(handleResponse);
};
