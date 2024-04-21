import './pages/index.css'; //  импорт главного файла стилей
import {initialCards} from './cards';
import {createCard, onDelete, onLike} from './components/card';
import {openModal, closeModal,  closePopupEsc, closePopupByOverlay} from './components/modal';
import {enableValidation, clearValidation} from './components/validation.js';
import {getInitialCards, getUserInfo, updateUserInfo, postCard, cardDel, updateAvatar} from './components//api.js';


const validationConfigurate = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",   
  };


enableValidation(validationConfigurate);


const cardList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');

//____________________________________________________________________________


// информация о пользователе
let userId = "";

function showUserInfo(userData) {
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImg.setAttribute("style", `background-image:url(${userData.avatar})`);
  userId = userData._id;
}

// Вывод карточeк на страницу

function showCard(card, onDelete, onLike, onCard, userId) {
  const cardElement = createCard(
    card,
    onDelete,
    onLike,
    onCard,
    userId
  );
  cardList.append(cardElement);
}


// Промис получения информации о пользователе и карточках

Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    showUserInfo(user);
    cards.forEach((card) => {
      showCard(card, onDelete, onLike, onCard, userId);
    });
  })
  .catch((err) => {
    console.log("Произошла ошибка при получении данных:", err);
  });

//_________________________________________________________________________________


/* для изменения профиля человека */
// кнопки
const buttonEditProfile = document.querySelector(".profile__edit-button");
// попап профиль
const popupEditProfile = document.querySelector(".popup_type_edit");
const formElement = document.forms["edit-profile"];
const nameInput = formElement.elements["name"];
const jobInput = formElement.elements["description"];

const profileName  = document.querySelector(".profile__title");
const profileDescription  = document.querySelector(".profile__description");

// открытие попапа редактирование информации о пользователе

buttonEditProfile.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEditProfile);
});

// функция для изменения   профиля, отправки на сервер
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  formElement.querySelector(".popup__button").textContent = "Сохранение...";
  const newName = nameInput.value;
  const newJob = jobInput.value;
  updateUserInfo(newName, newJob)
    .then((userData) => {
      showUserInfo(userData);
      closeModal(popupProfileEdit);
    })
    .catch((err) => {
      console.log(`Произошла ошибка при отправке информации на сервер: ${err}`);
    })
    .finally(() => {
      formElement.querySelector(".popup__button").textContent = "Сохранить";
    });
    closeModal(popupEditProfile)
}

//слушатель клика по кнопке сохранения формы редактирования профиля
formElement.addEventListener("submit", handleEditProfileFormSubmit);


// _____________________________________________________________
// для изменения карточек
// кнопка
const popupImageAddButton = document.querySelector(".profile__add-button");
// попап карточка
const popupOpenCard = document.querySelector(".popup_type_image");
const popupCardImage = document.querySelector(".popup__image");
const cardName = document.querySelector(".popup__caption");

// попап добавления карточки
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupAddCardForm = document.forms["new-place"];
const popupAddCardNameInput = popupAddCardForm.elements["place-name"];
const popupAddCardLinkInput = popupAddCardForm.elements["link"];

// Открытие попапа добавления карточки

popupImageAddButton.addEventListener("click", () => {  
  // clearValidation(popupAddCardForm, validationConfigurate);
  openModal(popupAddCard);
});

// Обработчик отправки на сервер формы добавления карточки

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  popupAddCardForm.querySelector(".popup__button").textContent =
    "Сохранение...";
  const nameValue = popupAddCardNameInput.value;
  const linkValue = popupAddCardLinkInput.value;
  postCard(nameValue, linkValue)
    .then((card) => {
      const addCard = createCard (
        card,
        onDelete,
        onLike,
        onCard,
        userId
      );
      cardList.prepend(addCard);
      popupAddCardForm.reset();
      closeModal(popupAddCard);
    })
    .catch((err) => {
      console.log(`Произошла ошибка при отправке информации на сервер: ${err}`);
    })
    .finally(() => {
      popupAddCardForm.querySelector(".popup__button").textContent =
        "Сохранить";
    });
}

//слушатель клика по кнопке сохранения формы добавления карточки
popupAddCardForm.addEventListener("submit", handleAddCardFormSubmit);

// Функция попапа карточка

function onCard(evt) {
  popupCardImage.src = evt.target.src;
  popupCardImage.alt = evt.target.alt;
  cardName.textContent = evt.target.alt;

  openModal(popupOpenCard);
}

// __________________________________________________________-

// попап аватар

const editAvatarPopup = document.querySelector(".popup_type_edit_avatar");
const popupEditAvatarForm = document.forms["new-avatar"];
const popupEditAvatarLinkInput = popupEditAvatarForm.elements["link"];

const profileImg = document.querySelector(".profile__image");
const profileEditButton = document.querySelector(".profile__image_button");

//открытие попапа изменения аватара
profileEditButton.addEventListener("click", function () {
  openModal(editAvatarPopup);
});

//Функция для изменения аватара
function updateAvatarImg(evt) {
  evt.preventDefault();
  evt.submitter.textContent =
    "Сохранение...";
  updateAvatar(popupEditAvatarLinkInput)
    .then((res) => {
      profileImg.setAttribute("style", `background-image:url(${res.avatar})`);
    })
    .catch((err) => {
      console.log(`Произошла ошибка при отправке информации на сервер: ${err}`);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
    closeModal(editAvatarPopup)
}

//слушатель клика по кнопке сохранения формы редактирования профиля
popupEditAvatarForm.addEventListener("submit", updateAvatarImg);