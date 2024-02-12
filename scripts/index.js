const cardList = document.querySelector('.places__list');

function addCard(data, onDelete) {
    
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = data.link;
    cardElement.querySelector('.card__title').textContent  = data.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
        onDelete(cardElement);
    });

    return cardElement;    
}

const cardDelete = item => {
    item.remove();
} 

initialCards.forEach(element => {
    const card = addCard(element, cardDelete);
    cardList.append(card);
});




// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
