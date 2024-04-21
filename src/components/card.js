import { cardDel, addLikeCard, deleteLikeCard } from "./api";


const cardTemplate = document.querySelector("#card-template").content;


// создание карточки

export function createCard(card, onDelete, onLike, onCard, userId) {

        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);       
 
        const cardImage = cardElement.querySelector(".card__image");
        const cardTitle = cardElement.querySelector(".card__title");

        const cardDeleteButton = cardElement.querySelector(".card__delete-button");
        const buttonLike = cardElement.querySelector(".card__like-button");
        const cardLikeNumber = cardElement.querySelector(".card__like-number");
        
        cardImage.src = card.link;
        cardImage.alt = card.name;
        cardTitle.textContent = card.name;
        cardLikeNumber.textContent = card.likes.length;

        // Скрытие кнопки удаления карточки если пользователь не является владельцем

        if (userId !== card.owner._id) {
            cardDeleteButton.style.display = "none";
        } else {
            cardDeleteButton.style.display = "block";
            cardDeleteButton.addEventListener("click", () =>
            onDelete(cardElement, card._id)
          );
        }

          // Проверка наличия лайка пользователя в массиве likes

        const myLike = card.likes.some((like) => like._id === userId);
        if (myLike) {
            buttonLike.classList.add("card__like-button_is-active");
        }
        buttonLike.addEventListener("click", () =>
            onLike(buttonLike, cardLikeNumber, card._id)
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
    const likeMethod = buttonLike.classList.contains("card__like-button_is-active") ? 
    deleteLikeCard : addLikeCard;
    likeMethod(id) 
        .then((res) => {
           buttonLike.classList.toggle("card__like-button_is-active"); 
           cardLikeNumber.textContent = res.likes.length;
        })
    .catch(err => console.log(err));
  }
  



