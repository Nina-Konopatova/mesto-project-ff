import './pages/index.css'; // добавьте импорт главного файла стилей

import {initialCards} from './cards';

const cardList = document.querySelector('.places__list');

function addCard(data, onDelete) {

    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = data.link;
    cardElement.querySelector('.card__title').textContent  = data.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', onDelete);
    cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-button_is-active');
    });    
    return cardElement;    
}

function cardDelete(evt) {
    evt.target.closest(".card").remove();
  } 

initialCards.forEach(element => {
    const card = addCard(element, cardDelete);
    cardList.append(card);
});

/* открытие и закрытие попапов */
function closePopupEsc(event) {
    if (event.key === 'Escape') {
          const activePopup = document.querySelector('.popup_is-opened');
          closeModal(activePopup);
    }
}

function closeModal(event){
    event.classList.remove('popup_is-opened')
};

const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('popup_is-opened')){
            closeModal(evt.target)
        }
        if(evt.target.classList.contains('popup__close')){
            closeModal(evt.target)
        }
    })  
})

// Кнопка закрытия попапа 
const popupClose = document.querySelector('.popup__close');

// Закрытие карточки по клику о человеке
popupClose.addEventListener('click', function() {
    closeModal(popupProfileEdit)
});

// Закрытие  карточки по клику о месте
/*popupСlose.addEventListener('click', function() {
    closeModal(popupImageAdd)
});  



/* прописываем каждый из попапов */

/* скрипт для формы всего */
const formElement = document.querySelector('.popup__form');

/* для увеличения картинки */
const popupImage = document.querySelector('.popup_type_image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupImageImage = popupImage.querySelector('.popup__image');
const popupSizeImage = popupImage.querySelector('.popup__card-image')
/* popupImageImage.addEventListener('click', () => {
    openModal(popupImage)
}) */




/* для карточки с картинкой  */

const imageName = document.querySelector('.place-name');
const imageLink = document.querySelector('.link');
const imageNameInput = document.querySelector('.popup__input_type_card-name');
const imageLinkInput = document.querySelector('.popup__input_type_url');

const popupImageAdd = document.querySelector('.popup_type_new-card');
const popupImageAddButton = document.querySelector('.profile__add-button');
popupImageAddButton.addEventListener('click', () => {
    openModal(popupImageAdd)
}) 



/* для изменения профиля человека */
/* const profileImage = document.querySelector('.profile__image'); */
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector('.popup__input_type_description');
/* const profileSaveButton = document.querySelector('.popup__button');
profileSaveButton.addEventListener('click')
 */
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupProfileEditButtonOpen = document.querySelector('.profile__edit-button');
popupProfileEditButtonOpen.addEventListener('click', () =>{
    openModal(popupProfileEdit)
})


// Функция для открытия попапа
function openModal(event){
    event.classList.add('popup_is-opened');
    event.classList.add('popup_is-animated');
    document.addEventListener('keydown', closePopupEsc);
};


const setProfile = (name, description) => {
    profileName.textContent = name;
    profileDescription.textContent = description;
  };

const setCard = (name, link) => {
    imageName.textContent = name;
    imageLink.textContent = link;
    setCard(imageNameInput.value, imageLinkInput.value);
  };


const formNewPlaceSubmit = (evt) => {
    evt.preventDefault();
    
    const item = {
        name: evt.target['place-name'].value,
        link: evt.target['link'].value
    };
    cardList.prepend(addCard(item, cardDelete));
    evt.target.reset(); 
    setCard(imageNameInput.value, imageLinkInput.value);  

    closeModal(popupImageAdd);
    
} 






function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    setProfile(nameInput.value, descriptionInput.value);
    
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);



