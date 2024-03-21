  // создание карточки
export  function createCard(data, onDelete, onLike, onCard) {

        const cardTemplate = document.querySelector('#card-template').content;
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
        
        cardElement.querySelector('.card__delete-button').addEventListener('click', onDelete);
        cardElement.querySelector('.card__like-button').addEventListener('click', onLike);
        cardElement.querySelector('.card__image').addEventListener('click', onCard);
        cardElement.querySelector('.card__image').src = data.link; 
        cardElement.querySelector('.card__image').alt = data.name;    
        cardElement.querySelector('.card__title').textContent  = data.name;
            
        return cardElement;    
    };

export function cardLike (evt) {
        evt.target.classList.toggle('card__like-button_is-active');
    };

export function cardDelete(evt) {
        evt.target.closest(".card").remove();
    };





