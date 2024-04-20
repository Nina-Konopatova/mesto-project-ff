
export const openModal = (popup) => {
    popup.classList.toggle("popup_is-opened");
    popup.classList.add('popup_is-animated'); 
    document.addEventListener("keydown", closePopupEsc);
    popup.addEventListener("click", closeOverlay);
    document.addEventListener("click", closeCross);    
  };
  
export function closeModal(popup){ 
    popup.classList.remove('popup_is-opened');
   document.removeEventListener('keydown', closePopupEsc);
}; 

const closePopupEsc = (evt) => {
    if (evt.key === "Escape") {
      const activePopup = document.querySelector(".popup_is-opened");
      closeModal(activePopup);
    }
  };
  
  const closeOverlay = (evt) => {
    if (evt.currentTarget === evt.target) {
      closeModal(evt.target);
    }
  };
  
  const closeCross = (evt) => {
    if (evt.target.classList.contains("popup__close")) {
      const activePopup = document.querySelector(".popup_is-opened");
      closeModal(activePopup);
    }
  };
  

  



   
   
    
