import '../pages/index.css';

import { createCard, initialCards } from './card.js';
import { popups, editPopup, addPopup, closePopup, openPopup, editProfileInfo, resetInput, fillCurrentInputs } from './modal.js';
import { hideAllErrors, settings, enableValidation } from './validate.js';

//кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//формы попапов
const editForm = editPopup.querySelector('.popup__form');
const addForm = addPopup.querySelector('.popup__form')

//поля добавления карточки
const nameSubmit = addPopup.querySelector('#place');
const linkSubmit = addPopup.querySelector('#link');

//поля карточек
const cardsContainer = document.querySelector('.cards-grid__list');

popups.forEach(popup => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened') ||
            evt.target.classList.contains('popup__toggle'))
            closePopup(popup);
    })
})

//функционал попапа редактирования профиля
editButton.addEventListener('click', () => {
    fillCurrentInputs(editPopup);
    hideAllErrors(editPopup, settings);
    openPopup(editPopup);
});

//сохранение информации из попапа редактирования
editForm.addEventListener('submit', editProfileInfo);

//открытие попапа добавления карточки
addButton.addEventListener('click', () => {
    resetInput(addForm);
    hideAllErrors(addPopup, settings);
    openPopup(addPopup);
});

//добавление новой карточки через форму
addPopup.addEventListener('submit', evt => {
    evt.preventDefault();
    cardsContainer.prepend(createCard(nameSubmit.value, linkSubmit.value));
    closePopup(addPopup);
})

//добавление карточек из initialcards
initialCards.forEach(item => cardsContainer.append(createCard(item.name, item.link)));

//валидация
enableValidation(settings);

