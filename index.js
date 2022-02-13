//попапы
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');

//кнопки
const popupToggles = document.querySelectorAll('.popup__toggle');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const submitButton = document.querySelector('.popup__button');

//содержимое форм и попапов
const formPopup = document.querySelector('.popup__form');
const popupInputs = addPopup.querySelectorAll('.popup__form-item');
const nameInput = editPopup.querySelector('#name');
const bioInput = editPopup.querySelector('#bio');
const nameSubmit = addPopup.querySelector('#place');
const linkSubmit = addPopup.querySelector('#link');
const popupImage = imagePopup.querySelector('.popup__image');
const imageCapture = imagePopup.querySelector('.popup__image-capture');

//поля профиля
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');

//поля карточек
const cardTemplate = document.querySelector('.cards-grid__template').content;
const cardsContainer = document.querySelector('.cards-grid__list');

//карточки
const initialCards = [
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

//открытие попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

//закрытие попапа по крестику
popupToggles.forEach(toggle =>
    toggle.addEventListener('click', evt => {
        evt.target.closest('.popup').classList.remove('popup_opened');
    })
);

//закрытие попапа после нажатия Submit или Enter
function closePopup(popupName) {
    popupName.classList.remove('popup_opened');
}

//очищение полей для дальнейшего нового ввода
function resetInput () {
    popupInputs.forEach(item => item.value = '');
}

//функционал попапа редактирования профиля
editButton.addEventListener('click', () => {
    openPopup(editPopup);
    //поля формы редактирования заполнены по умолчанию
    nameInput.value = profileName.textContent;
    bioInput.value = profileBio.textContent;
});

//открытие попапа добавления карточки
addButton.addEventListener('click', () => openPopup(addPopup));

//функционал попапа с фотографией
function openImagePopup(imageLink, header) {
    popupImage.setAttribute('src', imageLink);
    popupImage.setAttribute('alt', header);
    imageCapture.textContent = header;
    openPopup(imagePopup);
}

//редактирование информации профиля
function editProfileInfo(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileBio.textContent = bioInput.value;
    closePopup(editPopup);
}

//созранение информации из попапа редактирования
formPopup.addEventListener('submit', editProfileInfo);

//создание карточек
function createCard(name, link) {
    const cardElement = cardTemplate.querySelector('.cards-grid__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.cards-grid__image');
    cardElement.querySelector('.cards-grid__title').textContent = name;
    cardImage.setAttribute('src', link);
    cardImage.setAttribute('alt', name);

    //открытие попапа с фотографией
    cardImage.addEventListener('click', () => {
        openImagePopup(link, name);
    })
    //функционал лайка
    cardElement.querySelector('.cards-grid__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('cards-grid__like_active');
    })
    //удаление карточки
    cardElement.querySelector('.cards-grid__delete-card').addEventListener('click', function (evt) {
        evt.target.closest('.cards-grid__item').remove();
    })

    return cardElement;
}

//добавление карточек из initialcards
initialCards.forEach(item => cardsContainer.append(createCard(item.name, item.link)));

//добавление новой карточки через форму
addPopup.addEventListener('submit', evt => {
    evt.preventDefault();
    cardsContainer.prepend(createCard(nameSubmit.value, linkSubmit.value));
    closePopup(addPopup);
    resetInput();
})