import { openImagePopup } from './modal.js'
import { deleteCard, putLike, deleteLike, processRequest, printError } from './api.js';

export const cardsContainer = document.querySelector('.cards-grid__list');

//шаблон карточки
const cardTemplate = document.querySelector('.cards-grid__template').content;


//счетчик лайка
export function setLikesCounter(likesCounter, likes) {
    likesCounter.textContent = likes.length;
}

//переключение лайка
function toggleLike(evt, likesCounter, likes) {
    evt.target.classList.toggle('cards-grid__like_active');
    setLikesCounter(likesCounter, likes)
}

//функционал лайка
function getLikeState(evt, cardId, likes) {
    if (evt.target.classList.contains('cards-grid__like_active')) {
        return deleteLike(cardId);
    }
    return putLike(cardId, likes);
}

function setLike(evt, cardId, likes, likesCounter) {
    getLikeState(evt, cardId, likes)
        .then(processRequest)
        .then(res => toggleLike(evt, likesCounter, res.likes))
        .catch(printError);
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
        setLike(evt, cardData._id, cardData.likes, likesCounter);
    });

    //удаление карточки
    cardDeleteButton.addEventListener('click', (evt) => {
        deleteCard(cardData._id)
            .then(processRequest)
            .then(() => removeCard(evt))
            .catch(printError);
    });

    return cardElement;
}

