import { settings, controlButtonState } from "./validate.js";
import { cardsContainer, createCard } from "./card.js";
import { patchProfileData, patchAvatar, postCard, renderLoading, processRequest, printError } from "./api.js";

//попапы
export const popups = document.querySelectorAll('.popup');
export const editPopup = document.querySelector('.popup_type_edit');
export const addPopup = document.querySelector('.popup_type_add');
export const avatarPopup = document.querySelector('.popup_type_avatar-edit');
const imagePopup = document.querySelector('.popup_type_image');

//кнопки сохранить/создать
const editPopupButton = editPopup.querySelector('.popup__button');
const addPopupButton = addPopup.querySelector('.popup__button');
const avatarPopupButton = avatarPopup.querySelector('.popup__button');

//элемены попапа с картинкой
const popupImage = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__image-caption');

//поля профиля
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const nameInput = editPopup.querySelector('#name');
const bioInput = editPopup.querySelector('#bio');

//поле аватара
const avatarLink = avatarPopup.querySelector('#avatar-link');
const userAvatar = document.querySelector('.profile__avatar');

let user;

//поля добавления карточки
const nameSubmit = addPopup.querySelector('#place');
const linkSubmit = addPopup.querySelector('#link');

//закрытие попапа 
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

//закрытие по Esc
function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

//открытие попапа и закрытие при нажатии Esc
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

//функционал попапа с фотографией
export function openImagePopup(imageLink, header) {
    popupImage.setAttribute('src', imageLink);
    popupImage.setAttribute('alt', header);
    imageCaption.textContent = header;
    openPopup(imagePopup);
}

export function renderUserData(data) {
    user = data;
    profileName.textContent = data.name;
    profileBio.textContent = data.about;
    userAvatar.src = data.avatar;
}

//редактирование информации профиля
export function editProfileInfo(evt) {
    evt.preventDefault();
    renderLoading(true, editPopupButton);
    patchProfileData(nameInput.value, bioInput.value)
        .then(processRequest)
        .then(res => {
            renderUserData(res);
            closePopup(editPopup);
            
        })
        .catch(printError)
        .finally(() => renderLoading(false, editPopupButton));
}

//редактирование автара
export function editAvatar(evt) {
    evt.preventDefault();
    renderLoading(true, avatarPopupButton);
    patchAvatar(avatarLink.value)
        .then(processRequest)
        .then(res => {
            renderUserData(res);
            closePopup(avatarPopup);
        })
        .catch(printError)
        .finally(() => renderLoading(false, avatarPopupButton));
}

//создание новой карточки
export function renderNewCard(evt) {
    evt.preventDefault();
    renderLoading(true, addPopupButton);
    postCard(nameSubmit.value, linkSubmit.value)
        .then(processRequest)
        .then(card => {
            cardsContainer.prepend(createCard(card, user._id));
            closePopup(addPopup);
        })
        .catch(printError)
        .finally(() => renderLoading(false, addPopupButton));
}

//настройка кнопки
function setButtonState(form) {
    const submitButton = form.querySelector(settings.submitButtonSelector);
    const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
    controlButtonState(submitButton, inputList, settings);
}

//очищение полей для дальнейшего нового ввода
export function resetInput(form) {
    form.reset();
    setButtonState(form);
}

//поля формы редактирования заполнены по умолчанию
export function fillCurrentInputs(form) {
    nameInput.value = profileName.textContent;
    bioInput.value = profileBio.textContent;
    setButtonState(form);
};