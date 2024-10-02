// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 
// @todo: DOM узлы
const cardList =  document.querySelector('.places__list');
// @todo: Функция создания карточки
function addCard (card,deleteCardFunction) {

    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); 
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.src = card.link;
    cardImage.alt = card.alt;
    cardImage.loading = "lazy";
    cardTitle.textContent = card.name;

    
    cardElement.querySelector('.card__delete-button').addEventListener('click', evt =>{
        const placesItem=evt.target.closest('.places__item');
        deleteCardFunction(placesItem);
    });

    return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(placesItem) {
    
    placesItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach( initialCard => {
    cardList.append(addCard(initialCard,deleteCard));
    })
    


