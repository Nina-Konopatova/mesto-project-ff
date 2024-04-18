import './pages/index.css'; //  импорт главного файла стилей
import {initialCards} from './cards';
import {createCard, cardLike, cardDelete} from './components/card';
import {openModal, closeModal,  closePopupEsc, closePopupByOverlay} from './components/modal';
import {validationConfigurate, enableValidation, clearValidation} from './components/validation.js';

enableValidation(validationConfigurate);


const cardList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const formElement = document.forms["edit-profile"];

// Кнопка закрытия попапа 

const popupProfileClose = document.querySelector('.popup_type_edit .popup__close');
const popupNewCardClose = document.querySelector('.popup_type_new-card .popup__close');
const popupImageClose = document.querySelector('.popup_type_image .popup__close');
const popupAvatarClose = document.querySelector('.popup_type_edit_avatar .popup__close'); 

// Закрытие попапа изменения аватара
popupAvatarClose.addEventListener('click', function() {
  closeModal(editAvatarPopup)
})

 // Закрытие карточки по клику о человеке
 popupProfileClose.addEventListener('click', function() {
    closeModal(popupProfileEdit)
});

// Закрытие  карточки по клику о месте
popupNewCardClose.addEventListener('click', function() {
    closeModal(popupImageAdd)
});  

// Закрытие  карточки по клику о картинке
popupImageClose.addEventListener('click', function() {
    closeModal(popupImage)
});

function cardOpen (evt) {    
    popupImage.querySelector('.popup__image').src = evt.target.src; 
    popupImage.querySelector('.popup__image').alt = 'Альтернативный текст';   
    openModal(popupImage);
};


popups.forEach((popup) => { 
    popup.addEventListener('click',  closePopupByOverlay)});
    

/* прописываем каждый из попапов */
/* для увеличения картинки */
const popupImage = document.querySelector('.popup_type_image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupImageImage = popupImage.querySelector('.popup__image');
const popupSizeImage = popupImage.querySelector('.popup__card-image');

/* для карточки с картинкой  */
const formElementNewPlace = document.querySelector('.popup__form[name="new-place"]');
const imageName = document.querySelector('.place-name');
const imageLink = document.querySelector('.link');
const imageNameInput = document.querySelector('.popup__input_type_card-name');
const imageLinkInput = document.querySelector('.popup__input_type_url');
const placesList = document.querySelector(".places__list");


function createNewCard (evt) {
    evt.preventDefault();
    const item = {
                name: evt.target['place-name'].value,
                link: evt.target['link'].value
            };
    cardList.prepend(createCard(item, cardDelete, cardLike, cardOpen));
    evt.target.reset(); 
    closeModal(popupImageAdd);
}

formElementNewPlace.addEventListener('submit', createNewCard);

const popupImageAdd = document.querySelector('.popup_type_new-card');
const popupImageAddButton = document.querySelector('.profile__add-button');
popupImageAddButton.addEventListener('click', () => {
      openModal(popupImageAdd)
 }); 



/* для изменения профиля человека */
const formElementEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector('.popup__input_type_description');

function editProfile (evt) {
    evt.preventDefault();
    
    const item = {
                name: evt.target['name'].value,
                description: evt.target['description'].value
            };
            
const setProfile = (name, description) => {
    profileName.textContent = name;
    profileDescription.textContent = description;      
  };

  setProfile(nameInput.value, jobInput.value);
  formElementEditProfile.reset(); 
    closeModal(popupProfileEdit);
}

formElementEditProfile.addEventListener('submit', editProfile);

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupProfileEditButtonOpen = document.querySelector('.profile__edit-button');
popupProfileEditButtonOpen.addEventListener('click', () =>{ 
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;         
    
     openModal(popupProfileEdit)
});


 initialCards.forEach(element => {
    const card = createCard(element, cardDelete, cardLike, cardOpen);
    cardList.append(card);
});

  
  
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
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
}

//слушатель клика по кнопке сохранения формы редактирования профиля
formElement.addEventListener("submit", handleEditProfileFormSubmit);


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
// ____________________________________________________________________





  
  // Функция для проверки данных
  
  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  // Функция для отправки запроса
  function request(url, options) {
    return fetch(url, options).then(checkResponse);
  }
  
  // Загрузка карточек с сервера
  
  const getInitialCards = () => {
    return request(`https://mesto.nomoreparties.co/v1/wff-cohort-11/cards`, {
      headers: {
        authorization: "f91368f7-b8d5-4cc8-bfff-403a2f130a2e",
        "Content-Type": "application/json"
      }
    })
  };
  

  // Загрузка информации о пользователе с сервера
  
    
  const getUserInfo = () => {
    return request(`https://mesto.nomoreparties.co/v1/wff-cohort-11/users/me`, {
      headers: {
        authorization: "f91368f7-b8d5-4cc8-bfff-403a2f130a2e",
        "Content-Type": "application/json"
      }
    })  
  };


  // Отправка запроса на изменение информации пользователя
  
  const updateUserInfo = (name, about) => {
    return request(`https://mesto.nomoreparties.co/v1/wff-cohort-11/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "f91368f7-b8d5-4cc8-bfff-403a2f130a2e",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, about }),
    })
  };
  
  // Отправка новой карточки на сервер
  
  const postCard = (name, link) => {
    return request(`https://mesto.nomoreparties.co/v1/wff-cohort-11/cards`, {
      method: "POST",
      headers: {
        authorization: "f91368f7-b8d5-4cc8-bfff-403a2f130a2e",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, link }),
    })
  };
  
  // // Запрос на удаление карточки
  
  
   const cardDel = (id) => {
    return request(`https://mesto.nomoreparties.co/v1/wff-cohort-11/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: "f91368f7-b8d5-4cc8-bfff-403a2f130a2e",
        "Content-Type": "application/json"
      },
    })
  };

  
  // Отправка запроса на изменения аватара
  
  const updateAvatar = (imageInput) => {
    return request(`https://mesto.nomoreparties.co/v1/wff-cohort-11/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: "f91368f7-b8d5-4cc8-bfff-403a2f130a2e",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ avatar: imageInput.value }),
    })
  };
  
  //Отправка запроса на добавления лайка
  const addLikeCard = (id) => {
    return request(`https://mesto.nomoreparties.co/v1/wff-cohort-11/cards/likes/${id}`, {
      method: "PUT",
      headers: {
        authorization: "f91368f7-b8d5-4cc8-bfff-403a2f130a2e",
        "Content-Type": "application/json"
      },
    })
  };
  
  //Отправка запроса на удаление лайка
  const deleteLikeCard = (id) => {
    return request(`https://mesto.nomoreparties.co/v1/wff-cohort-11/cards/likes/${id}`, {
      method: "DELETE",
      headers: {
        authorization: "f91368f7-b8d5-4cc8-bfff-403a2f130a2e",
        "Content-Type": "application/json"
      },
    })
  };
  // _______________________________________________________________________________________
