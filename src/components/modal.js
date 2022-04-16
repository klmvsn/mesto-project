
import { settings, controlButtonState } from "./validate.js";

//попапы
export const popups = document.querySelectorAll('.popup');
export const editPopup = document.querySelector('.popup_type_edit');
export const addPopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');

//элемены попапа с картинкой
const popupImage = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__image-caption');

//поля профиля
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const nameInput = editPopup.querySelector('#name');
const bioInput = editPopup.querySelector('#bio');

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

//обработка данных из input
function setProfileData() {
    profileName.textContent = nameInput.value;
    profileBio.textContent = bioInput.value;
}

//редактирование информации профиля
export function editProfileInfo(evt) {
    evt.preventDefault();
    setProfileData();
    closePopup(editPopup);
}

//настройка кнопки
function setButtonState(form) {
    const submitButton = form.querySelector(settings.submitButtonSelector);
    const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
    controlButtonState(submitButton, inputList, settings)
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