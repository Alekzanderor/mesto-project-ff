// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 
// @todo: DOM узлы
const cardList =  document.querySelector('.places__list');
// @todo: Функция создания карточки
function addCard (card,deleteCardFunction) {

    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); 

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.alt;
    cardElement.querySelector('.card__image').loading = "lazy";
    cardElement.querySelector('.card__title').textContent = card.name;

    
    cardElement.querySelector('.card__delete-button').addEventListener('click', evt =>{
        deleteCardFunction(evt);
    });

    return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(evt) {
    const placesItem = evt.target.closest('.places__item');
    console.log('Мы вызвали удаление элемента');
    
    placesItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach( initialCard => {
    cardList.append(addCard(initialCard,deleteCard));
    })
    


