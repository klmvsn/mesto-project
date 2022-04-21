import { createCard } from "./card.js";

const token = '74c00ac7-1a8f-4bac-9e3c-4553885ebfeb';
const server = 'https://mesto.nomoreparties.co/v1/plus-cohort-9';

const userName = document.querySelector('.profile__name');
const userBio = document.querySelector('.profile__bio');
const userAvatar = document.querySelector('.profile__avatar');
let userId;

const cardsContainer = document.querySelector('.cards-grid__list');

//запросы
function getUserData() {
    return fetch(`${server}/users/me`, {
        headers: {
            authorization: token,
        }
    })
}

function getCards() {
    return fetch(`${server}/cards`, {
        headers: {
            authorization: token,
        }
    })
}

function patchProfileData(name, bio) {
    return fetch(`${server}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: bio
          })
    })
}

function postCard(name, link) {
    return fetch(`${server}/cards`, {
        method: 'POST',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
}

export function deleteCard(id) {
    return fetch(`${server}/cards/${id}`,{
        method: 'DELETE',
        headers: {
            authorization: token
        }
    })
}

//обработка запросов
function processRequest (res) {
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

export function processUserData() {
    getUserData()
        .then(processRequest)
        .then(res => {
            renderUserData(res);
            userId = res._id;
        })
        .catch(printError);
}

export function updateUserData(name, bio) {
    patchProfileData(name, bio)
        .then(processRequest)
        .then(res => {
            renderUserData(res);
        })
        .catch(printError)
}

export function processCards() {
    getCards()
        .then(processRequest)
        .then(res => {
            res.forEach(card => {
                cardsContainer.append(createCard(card.name, card.link, card.owner._id, userId));
            })
        })
        .catch(printError)
}

export function addNewCard(name, link) {
    postCard(name, link)
        .then(processRequest)
        .then(res => {
            cardsContainer.append(createCard(res.name, res.link, res.owner._id));
        })
        .catch(printError)
}


//TO DO:
// 1) При патче профиля продумать обработку ошибки в функции в modal