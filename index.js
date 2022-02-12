const editPopup = document.querySelector('.popup_type_edit');
const popupToggle = document.querySelectorAll('.popup__toggle');
const editButton = document.querySelector('.profile__edit-button');
const submitButton = document.querySelector('.popup__button');
const formPopup = document.querySelector('.popup__form');
const cardsContainer = document.querySelector('.cards-grid__list');
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');

//открытие форм
function popupOpen (popup) {
    popup.classList.add('popup_opened');
}

editButton.addEventListener('click',() => popupOpen(editPopup));
addButton.addEventListener('click', () => popupOpen(addPopup));

//закрытие окон по крестику
popupToggle.forEach(toggle =>
    toggle.addEventListener('click', evt => 
    evt.target.parentElement.parentElement.classList.remove('popup_opened'))
);

//открытие попапа с фотографией
function openImagePopup (imageLink, header) {
    imagePopup.querySelector('.popup__image').setAttribute('src',imageLink);
    imagePopup.querySelector('.popup__image').setAttribute('alt',header);
    imagePopup.querySelector('.popup__image-capture').textContent = header;
    popupOpen(imagePopup);
}

//поля формы заполнены по умолчанию
const nameInput = editPopup.querySelector('#name');
const bioInput = editPopup.querySelector('#bio');

const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');

nameInput.value = profileName.textContent;
bioInput.value = profileBio.textContent;

//редактирование информации профиля
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileBio.textContent = bioInput.value;
    editPopup.classList.remove('popup_opened');
}

formPopup.addEventListener('submit', formSubmitHandler);

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
function addInitialCard (name, link) {
    const cardTemplate = document.querySelector('.cards-grid__template').content;
    const cardElement = cardTemplate.querySelector('.cards-grid__item').cloneNode(true);
    cardElement.querySelector('.cards-grid__title').textContent = name;
    cardElement.querySelector('.cards-grid__image').setAttribute('src',link);
    cardElement.querySelector('.cards-grid__image').setAttribute('alt',name);

    //открытие попапа с фотографией
    cardElement.querySelector('.cards-grid__image').addEventListener('click', () => {
        openImagePopup(link,name);
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
initialCards.forEach (item => addInitialCard(item.name,item.link));

//добавление новой карточки через форму
addPopup.addEventListener('submit', (evt, nameSubmit, linkSubmit) => {
    evt.preventDefault();
    nameSubmit = addPopup.querySelector('#place');
    linkSubmit = addPopup.querySelector('#link');
    addInitialCard(nameSubmit.value, linkSubmit.value);
    addPopup.classList.remove('popup_opened');
})