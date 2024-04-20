import { cardDel, addLikeCard, deleteLikeCard } from "./api";


const cardTemplate = document.querySelector("#card-template").content;


// создание карточки

export function createCard (cards, onDelete, onLike, onCard, userId) {

        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);       
 
        const cardImage = cardElement.querySelector(".card__image");
        const cardTitle = cardElement.querySelector(".card__title");

        const cardDeleteButton = cardElement.querySelector(".card__delete-button");
        const buttonLike = cardElement.querySelector(".card__like-button");
        const cardLikeNumber = cardElement.querySelector(".card__like-number");
        
        cardImage.src = cards.link;
        cardImage.alt = cards.name;
        cardTitle.textContent = cards.name;
        cardLikeNumber.textContent = cards.likes.length;

        // Скрытие кнопки удаления карточки если пользователь не является владельцем

        if (userId !== cards.owner._id) {
            cardDeleteButton.style.display = "none";
        } else {
            cardDeleteButton.style.display = "block";
        }

          // Проверка наличия лайка пользователя в массиве likes

        const myLike = cards.likes.some((like) => like._id === userId);
        if (myLike) {
            buttonLike.classList.add("card__like-button_is-active");
        }

        cardDeleteButton.addEventListener("click", () =>
            onDelete(cardElement, cards._id)
        );
        buttonLike.addEventListener("click", () =>
            onLike(buttonLike, cardLikeNumber, cards._id)
        );
        cardImage.addEventListener("click", onCard);

        return cardElement;       
    };

// Функция удаления карточки

export function onDelete(cardElement, cardId) {
    cardDel(cardId)
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => {
        console.log("Произошла ошибка отправки запроса:", err);
      });
  }
  
  // Функция подсчета лайков
export function onLike(buttonLike, cardLikeNumber, id) {
    if (buttonLike.classList.contains("card__like-button_is-active")) {
      deleteLikeCard(id)
        .then((res) => {
          buttonLike.classList.toggle("card__like-button_is-active");
          cardLikeNumber.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log("Произошла ошибка отправки запроса:", err);
        });
    } else {
      addLikeCard(id)
        .then((res) => {
          buttonLike.classList.toggle("card__like-button_is-active");
          cardLikeNumber.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log("Произошла ошибка отправки запроса:", err);
        });
    }
  }
  



