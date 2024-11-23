export { getUser, getCards, updateUser,postCard, toggleLike, deleteCard, updateAvatar };

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-26',
    headers: {
      authorization: '2a320ddc-d2b3-4e8a-b7e5-1e313423461f',
      'Content-Type': 'application/json'
    }
  }

/*const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');*/

//инфа о юзере
function getUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    
  })//.then((res) => res.json())
  .then((res) => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });

  //.then((result) => {
  /*
      profileTitle.textContent=result.name;
      profileDescription.textContent=result.about;
      profileImage.src=result.avatar;*/
  //})
}

//Загружаем карточки с сервера
function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
  /*.then((result) => {
        //console.log(result);
        console.log('123');
      });*/
}

function updateUser(userName,userAbout) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,    
    body: JSON.stringify({
      name: userName,
      about: userAbout
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function postCard (name,link,alt)  {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name,
         link,
        alt
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
  
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

 /*function toggleLike  (cardID) {
   
      /*return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
        method: 'DELETE',
        headers: config.headers
      })*/
      //.then(res => checkResponse(res))
    //} else {
     /* return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
        method: 'PUT',
        headers: config.headers
      })*/
      //.then(res => checkResponse(res))
      
   // }
  //};

  
   function toggleLike  (cardID, isLiked) {
    if (isLiked) {
      return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
        method: 'DELETE',
        headers: config.headers
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
    
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
      //.then(res => checkResponse(res))
    } else {
      return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
        method: 'PUT',
        headers: config.headers
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
    
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
      //.then(res => checkResponse(res))
      
    }
  };
  
  const deleteCard = (cardID) => {
    return fetch(`${config.baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      headers: config.headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
  
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
    //.then(res => checkResponse(res))
  };

  const updateAvatar = (imgLink)  => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: imgLink
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
  
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
    //.then(res => checkResponse(res))
  };