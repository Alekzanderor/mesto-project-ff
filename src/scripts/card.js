// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 
// @todo: DOM узлы
const cardList =  document.querySelector('.places__list');
// @todo: Функция создания карточки

function addCard (card) {

    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); 
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.src = card.link;
    cardImage.alt = card.alt||'Не задано';
    cardImage.loading = "lazy";
    cardTitle.textContent = card.name;

    return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(placesItem) {
    
    placesItem.remove();
}

// @todo: Вывести карточки на страницу
function loadStarterCards (initialCards) {
initialCards.forEach( initialCard => {
    cardList.append(addCard(initialCard));
    });
}


    //Лайк карточки
function cardLike(likeButton){
    likeButton.classList.toggle('card__like-button_is-active');
  }
  
  function handleCardLike (evt){
    const clickedElement=evt.target;
    if(clickedElement.classList.contains('card__like-button')){  
    cardLike(clickedElement);
    }
  }
  

export {handleCardLike,cardLike,deleteCard,addCard,loadStarterCards,cardList}