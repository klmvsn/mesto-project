export const settings = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__form-item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__form-item_type_error',
    errorClass: 'popup__form-item-error_type_active'
});

//показать ошибки
function showInputError(formElement, inputElement, errorMessage, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
}

//скрыть ошибки
function hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
}

//скрыть все ошибки перед закрытием попапа
export function hideAllErrors(popup, settings) {
    const formElement = popup.querySelector(settings.formSelector);
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    inputList.forEach(inputElement => hideInputError(formElement, inputElement, settings));
}

//проверка поля на наличие ошибок 
function checkInputValidity(formElement, inputElement, settings) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
}

//проверка формы на наличие ошибок
function isValid(inputList) {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    })
}

//переключение кнопки
export function controlButtonState(submitButton, inputList, settings) {
    if (isValid(inputList)) {
        submitButton.classList.add(settings.inactiveButtonClass);
        submitButton.setAttribute('disabled', '');
    }
    else {
        submitButton.classList.remove(settings.inactiveButtonClass);
        submitButton.removeAttribute('disabled');
    }
}

//отслеживание изменения состояний
function setEventListeners(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const submitButton = formElement.querySelector(settings.submitButtonSelector);
    controlButtonState(submitButton, inputList, settings);
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, settings);
            controlButtonState(submitButton, inputList, settings);
        });
    });
}

export function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach(formElement => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, settings);
    })
}
