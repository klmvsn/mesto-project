import { createCard, setLikesCounter } from "./card.js";

const config = {
    baseURL: 'https://mesto.nomoreparties.co/v1/plus-cohort-9',
    headers: {
        authorization: '74c00ac7-1a8f-4bac-9e3c-4553885ebfeb',
        'Content-Type': 'application/json'
    }
}

const userName = document.querySelector('.profile__name');
const userBio = document.querySelector('.profile__bio');
const userAvatar = document.querySelector('.profile__avatar');

const cardsContainer = document.querySelector('.cards-grid__list');

let user;


//обработка запросов
function processRequest(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
}

function printError(err) {
    console.log(`Ошибка: ${err}`);
}

function renderUserData(data) {
    userName.textContent = data.name;
    userBio.textContent = data.about;
    userAvatar.src = data.avatar;
}

//запросы
export const getUserData = () => {
    return fetch(`${config.baseURL}/users/me`, {
        headers: config.headers
    })
        .then(processRequest)
        .then(res => {
            renderUserData(res);
            user = res;
        })
        .catch(printError);
};

export const getCards = () => {
    return fetch(`${config.baseURL}/cards`, {
        headers: config.headers
    })
        .then(processRequest)
        .then(res => {
            res.forEach(card => {
                cardsContainer.append(createCard(card, user._id));
            })
        })
        .catch(printError)
};

export const patchProfileData = (name, bio) => {
    return fetch(`${config.baseURL}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: bio
        })
    })
        .then(processRequest)
        .then(res => {
            renderUserData(res);
        })
        .catch(printError)
};

export const patchAvatar = (link) => {
    return fetch(`${config.baseURL}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    })
        .then(processRequest)
        .then(res => {
            renderUserData(res);
        })
        .catch(printError)
}

export const postCard = (name, link) => {
    return fetch(`${config.baseURL}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(processRequest)
        .then(card => {
            cardsContainer.prepend(createCard(card, user._id));
        })
        .catch(printError)
}

export const deleteCard = (id) => {
    return fetch(`${config.baseURL}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(processRequest)
        .catch(printError);
}

export const putLike = (cardId, likes, likesCounter) => {
    return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
        body: JSON.stringify({
            likes: likes
        })
    })
        .then(processRequest)
        .then(res => {
            setLikesCounter(likesCounter, res.likes);
        })
        .catch(printError)
}

export const deleteLike = (cardId, likesCounter) => {
    return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(processRequest)
        .then(res => {
            setLikesCounter(likesCounter, res.likes);
        })
        .catch(printError)
}

export function renderLoading(isLoading, button) {
    if (isLoading) {
        button.textContent = 'Сохранение...';
        button.disabled = true;
    }
    else {
        if (button.classList.contains('popup__button_create')) {
            button.textContent = 'Создать';
        }
        else {
            button.textContent = 'Сохранить';
        }
        button.disabled = false;
    }
}