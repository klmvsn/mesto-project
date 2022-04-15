import {openImagePopup} from './modal.js'

//шаблон карточки
const cardTemplate = document.querySelector('.cards-grid__template').content;

//карточки по умолчанию
export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//функционал лайка
function toggleLike (evt) {
    evt.target.classList.toggle('cards-grid__like_active');
}

 //удаление карточки
function removeCard (evt) {
    evt.target.closest('.cards-grid__item').remove();
}

//создание карточек
export function createCard(name, link) {
    const cardElement = cardTemplate.querySelector('.cards-grid__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.cards-grid__image');
    cardElement.querySelector('.cards-grid__title').textContent = name;
    cardImage.setAttribute('src', link);
    cardImage.setAttribute('alt', name);

    //открытие попапа с фотографией
    cardImage.addEventListener('click', () => {
        openImagePopup(link, name);
    })

    //лайк
    cardElement.querySelector('.cards-grid__like').addEventListener('click', toggleLike);

    //удаление карточки
    cardElement.querySelector('.cards-grid__delete-card').addEventListener('click', removeCard);
    
    return cardElement;
}

