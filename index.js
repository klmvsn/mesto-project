const editPopup = document.querySelector('.popup_type_edit');
const popupToggles = document.querySelectorAll('.popup__toggle');
const editButton = document.querySelector('.profile__edit-button');
const submitButton = document.querySelector('.popup__button');
const formPopup = document.querySelector('.popup__form');
const cardsContainer = document.querySelector('.cards-grid__list');
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');

//открытие попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

editButton.addEventListener('click', () => openPopup(editPopup));
addButton.addEventListener('click', () => openPopup(addPopup));

//закрытие попапа по крестику
popupToggles.forEach(toggle =>
    toggle.addEventListener('click', evt =>
        evt.target.closest('.popup').classList.remove('popup_opened'))
);

//закрытие попапа после нажатия Submit или Enter
function closePopup(popupName) {
    popupName.classList.remove('popup_opened');
}

//открытие попапа с фотографией
function openImagePopup(imageLink, header) {
    const popupImage = imagePopup.querySelector('.popup__image');
    popupImage.setAttribute('src', imageLink);
    popupImage.setAttribute('alt', header);
    imagePopup.querySelector('.popup__image-capture').textContent = header;
    openPopup(imagePopup);
}

//поля формы редактирования заполнены по умолчанию
const nameInput = editPopup.querySelector('#name');
const bioInput = editPopup.querySelector('#bio');

const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');

nameInput.value = profileName.textContent;
bioInput.value = profileBio.textContent;

//редактирование информации профиля
function editProfileInfo(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileBio.textContent = bioInput.value;
    closePopup(editPopup);
}

formPopup.addEventListener('submit', editProfileInfo);

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

//добавление карточек
function addInitialCard(name, link) {
    const cardTemplate = document.querySelector('.cards-grid__template').content;
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
    cardsContainer.prepend(cardElement);
}

//добавление карточек из initialcards
initialCards.forEach(item => addInitialCard(item.name, item.link));

//добавление новой карточки через форму
addPopup.addEventListener('submit', (evt, nameSubmit, linkSubmit) => {
    evt.preventDefault();
    nameSubmit = addPopup.querySelector('#place');
    linkSubmit = addPopup.querySelector('#link');
    addInitialCard(nameSubmit.value, linkSubmit.value);
    closePopup(addPopup);
})