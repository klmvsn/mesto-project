import { openImagePopup } from './modal.js'
import { deleteCard, putLike, deleteLike } from './api.js';

//шаблон карточки
const cardTemplate = document.querySelector('.cards-grid__template').content;


//функционал лайка
function toggleLike(evt, cardId, likes, likesCounter) {
    evt.target.classList.toggle('cards-grid__like_active');
    if (evt.target.classList.contains('cards-grid__like_active')) {
        putLike(cardId, likes, likesCounter);
    }
    else {
        deleteLike(cardId, likesCounter);
    }
}

//счетчик лайка
export function setLikesCounter(likesCounter, likes) {
    likesCounter.textContent = likes.length;
}

//удаление карточки
function removeCard(evt) {
    evt.target.closest('.cards-grid__item').remove();
}

//создание карточек
export function createCard(cardData, userId) {
    const cardElement = cardTemplate.querySelector('.cards-grid__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.cards-grid__image');
    const cardDeleteButton = cardElement.querySelector('.cards-grid__delete-card');
    const like = cardElement.querySelector('.cards-grid__like');
    const likesCounter = cardElement.querySelector('.cards-grid__like-counter');
    cardElement.querySelector('.cards-grid__title').textContent = cardData.name;
    cardImage.setAttribute('src', cardData.link);
    cardImage.setAttribute('alt', cardData.name);

    //уставновка начального состояния и значения лайка
    if (cardData.likes.find(user => {
        return user._id === userId
    })) {
        like.classList.add('cards-grid__like_active');
    }
    setLikesCounter(likesCounter, cardData.likes);
    if (cardData.owner._id === userId) {
        cardDeleteButton.style.display = 'block';
    }

    //открытие попапа с фотографией
    cardImage.addEventListener('click', () => {
        openImagePopup(cardData.link, cardData.name);
    })

    //нажатие лайка
    like.addEventListener('click', (evt) => {
        toggleLike(evt, cardData._id, cardData.likes, likesCounter);
    });

    //удаление карточки
    cardDeleteButton.addEventListener('click', (evt) => {
        deleteCard(cardData._id);
        removeCard(evt);
    });

    return cardElement;
}

