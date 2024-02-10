// @todo: Темплейт карточки

const cardList = document.querySelector('.places__list');

function addCard(nameValue, linkValue) {
    const cardTemplate = document.querySelector('#card-template'). content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = linkValue;
    cardElement.querySelector('.card__title').textContent  = nameValue;
    cardElement.querySelector('.card__delete-button').addEventListener('click', function () {
        cardElement.remove();
    });

    cardList.append(cardElement);
}

initialCards.forEach(element => {
    addCard(element.name, element.link);
});

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
