const enableValidation = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__form-item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__form-item_type_error',
    errorClass: 'popup__form-item-error_type_active'
});

//показать ошибки
function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(enableValidation.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(enableValidation.errorClass);
}

//скрыть ошибки
function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(enableValidation.inputErrorClass);
    errorElement.classList.remove(enableValidation.errorClass);
    errorElement.textContent = '';
}

//скрыть все ошибки перед закрытием попапа
export function hideAllErrors(popup) {
    const formElement = popup.querySelector(enableValidation.formSelector);
    const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
    inputList.forEach(inputElement => hideInputError(formElement, inputElement));
}

//проверка поля на наличие ошибок 
function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}

//проверка формы на наличие ошибок
function isValid(inputList) {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    })
}

//переключение кнопки
function controlButtonState(submitButton, inputList) {
    if (isValid(inputList)) {
        submitButton.classList.add(enableValidation.inactiveButtonClass);
        submitButton.setAttribute('disabled', '');
    }
    else {
        submitButton.classList.remove(enableValidation.inactiveButtonClass);
        submitButton.removeAttribute('disabled');
    }
}

//отслеживание изменения состояний
function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
    const submitButton = formElement.querySelector(enableValidation.submitButtonSelector);
    controlButtonState(submitButton, inputList);
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            controlButtonState(submitButton, inputList);
        });
    });
}

export function validation() {
    const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));
    formList.forEach(formElement => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    })
}



