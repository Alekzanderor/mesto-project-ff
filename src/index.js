import './pages/index.css'; // добавляем импорт главного файла стилей 
import initialCards from './scripts/cards.js';
import {handleCardLike,deleteCard,addCard,loadStarterCards,cardList} from './scripts/card.js';
import {openPopup} from './scripts/modal.js';
import {handleCardZoom,handleNewPlaceFormSubmit,handleFormSubmit,profileForm,newPlaceForm} from './scripts/forms.js';


loadStarterCards(initialCards);

const allPopups = document.querySelectorAll('.popup');

allPopups.forEach( popup => {
      popup.classList.add('popup_is-animated');
      });

    
const profileEditButtonPopup = document.querySelector('.profile__edit-button');
const profileAddButtonPopup = document.querySelector('.profile__add-button');
const profileEditPopup = document.querySelector('.popup_type_edit'); 
const profileAddPopup = document.querySelector('.popup_type_new-card');


profileEditButtonPopup.addEventListener('click', function () {
  openPopup(profileEditPopup);
}); 

profileAddButtonPopup.addEventListener('click', function () {
    openPopup(profileAddPopup);
  }); 



cardList.addEventListener('click', evt =>{
          if(evt.target.classList.contains('card__delete-button')){
    const placesItem=evt.target.closest('.places__item');
    deleteCard(placesItem);}
});

cardList.addEventListener('click', handleCardLike);
cardList.addEventListener('click', handleCardZoom);


profileForm.addEventListener('submit', handleFormSubmit); 
newPlaceForm.addEventListener('submit', handleNewPlaceFormSubmit);


