import '../pages/index.css';

import { popups, editPopup, addPopup, avatarPopup, closePopup, 
    openPopup, editProfileInfo, resetInput, fillCurrentInputs, 
    editAvatar, renderNewCard } from './modal.js';
import { hideAllErrors, settings, enableValidation } from './validate.js';
import { getUserData, getCards } from './api.js';

//кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__avatar');

//формы попапов
const editForm = editPopup.querySelector('.popup__form');
const addForm = addPopup.querySelector('.popup__form');
const avatarForm = avatarPopup.querySelector('.popup__form');


//закрытие попапов
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
addPopup.addEventListener('submit', renderNewCard);

//форма редактирования аватара
avatarEditButton.addEventListener('click', () => {
    resetInput(avatarForm);
    hideAllErrors(avatarPopup,settings);
    openPopup(avatarPopup);
})

//изменение аватара
avatarForm.addEventListener('submit', editAvatar);

//валидация
enableValidation(settings);

//загрузка данных профиля и карточек
getUserData();
getCards();
