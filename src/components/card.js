export const Card = [
  // создание карточки
  function creteCard(data, onDelete, onLike, onCard) {

        const cardTemplate = document.querySelector('#card-template').content;
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
        
        cardElement.querySelector('.card__delete-button').addEventListener('click', onDelete);
        cardElement.querySelector('.card__like-button').addEventListener('click', onLike);
        cardElement.querySelector('.card__image').addEventListener('click', onCard);
        cardElement.querySelector('.card__image').src = data.link; 
        cardElement.querySelector('.card__image').alt = data.name;    
        cardElement.querySelector('.card__title').textContent  = data.name;
            
        return cardElement;    
    },

    function cardLike (evt) {
        evt.target.classList.toggle('card__like-button_is-active');
    },

    function cardDelete(evt) {
        evt.target.closest(".card").remove();
    },

    function cardOpen (evt) {    
        popupImage.querySelector('.popup__image').src = evt.target.src;    
        openModal(popupImage);
    },


    initialCards.forEach(element => {
        const card = creteCard(element, cardDelete, cardLike, cardOpen);
        cardList.append(card);
    })

];