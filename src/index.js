import './pages/index.css'; //  импорт главного файла стилей
import {initialCards} from './cards';
import {Card} from './components/card.js';
import {Modal} from './components/modal.js';


const cardList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');

// Кнопка закрытия попапа 

const popupProfileClose = document.querySelector('.popup_type_edit .popup__close');
const popupNewCardClose = document.querySelector('.popup_type_new-card .popup__close');
const popupImageClose = document.querySelector('.popup_type_image .popup__close');

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

function createNewCard (evt) {
    evt.preventDefault();
    const item = {
                name: evt.target['place-name'].value,
                link: evt.target['link'].value
            };
    cardList.prepend(creteCard(item, cardDelete, cardLike, cardOpen));
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
 })



