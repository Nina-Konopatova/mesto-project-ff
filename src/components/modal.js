
export const Card = [
    /* открытие и закрытие попапов */
    function closePopupEsc(event) {
        if (event.key === 'Escape') {
            const activePopup = document.querySelector('.popup_is-opened');
            closeModal(activePopup);
        }
    },

    function closeModal(event){
    
        event.classList.remove('popup_is-opened')
    },

    popups.forEach((popup) => { 
        popup.addEventListener('click',  closePopupByOverlay)}),
        function closePopupByOverlay(evt) {
        if(evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')){ 
                closeModal(evt.currentTarget) 
            }
    },

    // Закрытие карточки по клику о человеке
    popupProfileClose.addEventListener('click', function() {
        closeModal(popupProfileEdit)
    }),

    // Закрытие  карточки по клику о месте
    popupNewCardClose.addEventListener('click', function() {
        closeModal(popupImageAdd)
    }),  

    // Закрытие  карточки по клику о картинке
    popupImageClose.addEventListener('click', function() {
        closeModal(popupImage)
    }),

    // Функция для открытия попапа
    function openModal(popup){
        popup.classList.add('popup_is-opened');
        popup.classList.add('popup_is-animated');
        document.addEventListener('keydown', closePopupEsc);        
    }
];