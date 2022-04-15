import { hideAllErrors, validation } from "./validate.js";

//попапы
export const editPopup = document.querySelector('.popup_type_edit');
export const addPopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');

//элемены попапа с картинкой
const popupImage = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__image-caption');

//поля формы
const popupInputs = addPopup.querySelectorAll('.popup__form-item');

//поля профиля
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const nameInput = editPopup.querySelector('#name');
const bioInput = editPopup.querySelector('#bio');

//закрытие попапа 
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', closeOnOverlay);
    document.removeEventListener('keydown', closeByEsc);
    hideAllErrors(popup);
}

//закрытие по Esc
function closeByEsc (evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
        closePopup(openedPopup);
    }
}

//закрытие по оверлею
function closeOnOverlay (evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
    }
}

//открытие попапа и закрытие при нажатии на оверлей или Esc
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closeOnOverlay);
    document.addEventListener('keydown', closeByEsc);
    validation();
}

//функционал попапа с фотографией
export function openImagePopup(imageLink, header) {
    popupImage.setAttribute('src', imageLink);
    popupImage.setAttribute('alt', header);
    imageCaption.textContent = header;
    openPopup(imagePopup);
}

//обработка данный из input
function setNewFields () {
    profileName.textContent = nameInput.value;
    profileBio.textContent = bioInput.value;
}

//редактирование информации профиля
export function editProfileInfo(evt) {
    evt.preventDefault();
    setNewFields();
    closePopup(editPopup, evt);
}

//очищение полей для дальнейшего нового ввода
export function resetInput() {
    popupInputs.forEach(item => item.value = '');
}

//поля формы редактирования заполнены по умолчанию
export function fillCurrentInputs () {
    nameInput.value = profileName.textContent;
    bioInput.value = profileBio.textContent;
};