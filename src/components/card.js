import { openImagePopup } from './modal.js'
import { deleteCard } from './api.js';

//шаблон карточки
const cardTemplate = document.querySelector('.cards-grid__template').content;

//функционал лайка
function toggleLike(evt) {
    evt.target.classList.toggle('cards-grid__like_active');
}

//удаление карточки
function removeCard(evt) {
    evt.target.closest('.cards-grid__item').remove();
}

//создание карточек
export function createCard(name, link, cardId, ownerId) {
    const cardElement = cardTemplate.querySelector('.cards-grid__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.cards-grid__image');
    const cardDeleteButton = cardElement.querySelector('.cards-grid__delete-card');
    cardElement.querySelector('.cards-grid__title').textContent = name;
    cardImage.setAttribute('src', link);
    cardImage.setAttribute('alt', name);
    if (cardId === ownerId) {
        console.log(cardId);
        cardDeleteButton.style.display = 'block';
    }

    //открытие попапа с фотографией
    cardImage.addEventListener('click', () => {
        openImagePopup(link, name);
    })

    //лайк
    cardElement.querySelector('.cards-grid__like').addEventListener('click', toggleLike);

    //удаление карточки
    cardDeleteButton.addEventListener('click', () => {
        deleteCard(cardId);
    });

    return cardElement;
}

