const config = {
    baseURL: 'https://mesto.nomoreparties.co/v1/plus-cohort-9',
    headers: {
        authorization: '74c00ac7-1a8f-4bac-9e3c-4553885ebfeb',
        'Content-Type': 'application/json'
    }
}

//обработка запросов
export function processRequest(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
}

export function printError(err) {
    console.log(`Ошибка: ${err}`);
}

//запросы
export const getUserData = () => {
    return fetch(`${config.baseURL}/users/me`, {
        headers: config.headers
    })
        .then(processRequest)
};

export const getCards = () => {
    return fetch(`${config.baseURL}/cards`, {
        headers: config.headers
    })
        .then(processRequest)
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
};

export const patchAvatar = (link) => {
    return fetch(`${config.baseURL}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    })
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
}

export const deleteCard = (id) => {
    return fetch(`${config.baseURL}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
}

export const putLike = (cardId, likes) => {
    return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
        body: JSON.stringify({
            likes: likes
        })
    })
}

export const deleteLike = (cardId) => {
    return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
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