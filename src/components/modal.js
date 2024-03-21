
// Функция для открытия попапа

export function openModal(popup){ 
    popup.classList.add('popup_is-opened'); 
    popup.classList.add('popup_is-animated'); 
    document.addEventListener('keydown', closePopupEsc);         
};

export function closeModal(popup){ 
    popup.classList.remove('popup_is-opened');
   document.removeEventListener('keydown', closePopupEsc);
}; 

/* открытие и закрытие попапов */
export function closePopupEsc(event) { 
    if (event.key === 'Escape') { 
        const activePopup = document.querySelector('.popup_is-opened'); 
        closeModal(activePopup); 
    } 
};
export function closePopupByOverlay(evt) { 
    if(evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')){  
            closeModal(evt.currentTarget)  
        } 
};
   




   
   
    
