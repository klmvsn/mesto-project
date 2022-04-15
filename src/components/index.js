import '../pages/index.css';

import { createCard, initialCards } from './card.js';
import { editPopup, addPopup, closePopup, openPopup, editProfileInfo, resetInput, fillCurrentInputs } from './modal.js';
import { hideAllErrors } from './validate.js';

//кнопки
const popupToggles = document.querySelectorAll('.popup__toggle');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//содержимое форм и попапов
const formPopup = document.querySelector('.popup__form');

const nameSubmit = addPopup.querySelector('#place');
const linkSubmit = addPopup.querySelector('#link');

//поля карточек
const cardsContainer = document.querySelector('.cards-grid__list');

//функционал попапа редактирования профиля
editButton.addEventListener('click', () => {
    fillCurrentInputs();
    openPopup(editPopup);
});

//открытие попапа добавления карточки
addButton.addEventListener('click', () => {
    openPopup(addPopup);
    resetInput();
});

//закрытие попапа по крестику
popupToggles.forEach(toggle =>
    toggle.addEventListener('click', evt => {
        evt.target.closest('.popup').classList.remove('popup_opened');
        hideAllErrors(evt.target.closest('.popup'));
    })
);

//сохранение информации из попапа редактирования
formPopup.addEventListener('submit', editProfileInfo);

//добавление карточек из initialcards
initialCards.forEach(item => cardsContainer.append(createCard(item.name, item.link)));

//добавление новой карточки через форму
addPopup.addEventListener('submit', evt => {
    evt.preventDefault();
    cardsContainer.prepend(createCard(nameSubmit.value, linkSubmit.value));
    closePopup(addPopup);
    resetInput();
})


