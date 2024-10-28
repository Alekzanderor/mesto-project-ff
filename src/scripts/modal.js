    //Открытие и закрытие попапов
    
    let buttonPopupClose ;
    
    //обработка открытий и закрытий
    function stopBubble (evt){
      evt.stopPropagation();
    }
    
    function openPopup(popupElement) {
      popupElement.classList.add('popup_is-opened');
      buttonPopupClose=popupElement.querySelector('.popup__close');
      buttonPopupClose.addEventListener('click', closePopup );
      document.addEventListener('keydown', escKeyHandler);
      popupElement.addEventListener('click',closePopup);
      popupElement.querySelector('.popup__content').addEventListener('click', stopBubble);
      if(popupElement.classList.contains('popup_type_edit')){
        setFormValues();
    }
    }

    
    function closePopup(evt) {  

    
        if(evt.type==='click'){
        if (evt.target.classList.contains('popup__close')){
          stopBubble(evt);      
        }}
    
        const popup = document.querySelector('.popup_is-opened');
        popup.classList.remove('popup_is-opened');
        buttonPopupClose.removeEventListener('click', closePopup );
        document.removeEventListener('keydown', escKeyHandler );
        popup.querySelector('.popup__content').removeEventListener('click', stopBubble);
        
        if(popup.classList.contains('popup_type_new-card')){
        popup.querySelector('.popup__form').reset();}
     
      }
    
      function escKeyHandler(evt){
        
        const openedPopup = document.querySelector('.popup_is-opened');
        
        if (evt.key==='Escape'&&openedPopup!=null){      
          closePopup(openedPopup);
      }}

      export {closePopup,escKeyHandler,openPopup}
      import { setFormValues } from './forms.js';